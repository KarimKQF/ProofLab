/**
 * État global de la partie (Zustand), persisté dans IndexedDB à chaque changement.
 */
import { create } from 'zustand';
import {
  emptySave,
  ERROR_LOG_MAX,
  importSave,
  loadSave,
  persistSave,
  type Draft,
  type ErrorEvent,
  type ErrorKind,
  type ExamRecord,
  type NotionOrigin,
  type SaveData,
  type Settings,
} from './save';
import { emptyExerciseProgress } from '@/core/progression/mastery';
import { newCard, qualityOf, reviewCard, shiftDueDates, type AttemptOutcome } from '@/core/progression/srs';
import { addNotions, removeNotion, reviewNotion } from '@/core/progression/notions';
import { notionsOfConcept } from '@/content/dictionnaire/concepts-notions';

/** Précisions sur une erreur, pour le journal du bilan des pièges. */
export interface ErrorDetail {
  source?: ErrorEvent['source'];
  node?: string;
  kind?: ErrorKind;
}

export interface HuntOutcome {
  /** Étape fautive trouvée par le joueur (sans l'afficher). */
  found: boolean;
  /** Étape et nature trouvées du premier coup. */
  firstTry: boolean;
  /** Erreur manquée : une étape correcte désignée, ou la réponse affichée. */
  missed: boolean;
  concept: string;
  kind: ErrorKind;
  exerciseId: string;
}

/** Enregistre une erreur : compteur du concept, journal, et notions à revoir. */
function withError(s: SaveData, concept: string, ref: string, exerciseRef: string, detail: ErrorDetail, now: number): SaveData {
  const c = s.conceptErrors[concept] ?? { count: 0, lastAt: now, exercises: [] };
  const event: ErrorEvent = {
    at: now,
    concept,
    source: detail.source ?? 'preuve',
    ref,
    kind: detail.kind ?? 'autre',
    ...(detail.node ? { node: detail.node } : {}),
  };
  return {
    ...s,
    conceptErrors: {
      ...s.conceptErrors,
      [concept]: {
        count: c.count + 1,
        lastAt: now,
        exercises: c.exercises.includes(exerciseRef) ? c.exercises : [...c.exercises, exerciseRef],
      },
    },
    errorLog: [...s.errorLog, event].slice(-ERROR_LOG_MAX),
    notions: addNotions(s.notions, notionsOfConcept(concept), 'piege', now),
  };
}

interface GameState {
  ready: boolean;
  save: SaveData;
  now: () => number;

  hydrate: () => Promise<void>;
  setSettings: (patch: Partial<Settings>) => void;
  setPaused: (paused: boolean) => void;

  recordAttempt: (exerciseId: string, outcome: AttemptOutcome, opts?: { variant?: boolean }) => void;
  recordConceptError: (concept: string, exerciseId: string, detail?: ErrorDetail) => void;
  recordHunt: (itemId: string, outcome: HuntOutcome) => void;
  addNotion: (id: string, origin: NotionOrigin) => void;
  removeNotion: (id: string) => void;
  reviewNotion: (id: string, q: number) => void;
  markSolutionViewed: (exerciseId: string) => void;
  setDraft: (key: string, draft: Draft | null) => void;
  setLastVisited: (path: string) => void;
  unlockLabKeys: (labId: string, keys: string[]) => void;
  saveFreeProof: (exerciseId: string, text: string, selfEval?: Record<string, number> | null) => void;
  recordCounterexample: (id: string, solved: boolean) => void;
  recordExam: (rec: ExamRecord) => void;

  importFrom: (text: string) => { ok: boolean; error?: string };
  reset: () => void;
}

/*
 * Écritures sérialisées : chaque écriture attend la précédente, et l'écriture différée
 * enregistre l'état COURANT au moment où elle part, jamais un instantané ancien. Une
 * sauvegarde importée ne peut donc plus être écrasée par une écriture programmée avant elle.
 */
let timer: ReturnType<typeof setTimeout> | null = null;
let chain: Promise<void> = Promise.resolve();

function write(save: SaveData): Promise<void> {
  chain = chain.then(() => persistSave(save));
  return chain;
}

function cancelScheduled(): void {
  if (timer) clearTimeout(timer);
  timer = null;
}

function schedulePersist(): void {
  cancelScheduled();
  timer = setTimeout(() => {
    timer = null;
    void write(useGame.getState().save);
  }, 150);
}

/** Force l'écriture immédiate de l'état courant (fermeture de page, tests). */
export function flushPersist(): Promise<void> {
  cancelScheduled();
  return write(useGame.getState().save);
}

export const useGame = create<GameState>((set, get) => {
  const update = (fn: (s: SaveData) => SaveData) => {
    const next = fn(get().save);
    if (next === get().save) return;
    set({ save: next });
    schedulePersist();
  };

  return {
    ready: false,
    save: emptySave(0),
    now: () => Date.now(),

    hydrate: async () => {
      const loaded = await loadSave(Date.now());
      set({ save: loaded, ready: true });
    },

    setSettings: (patch) => update((s) => ({ ...s, settings: { ...s.settings, ...patch } })),

    setPaused: (paused) => {
      const now = get().now();
      update((s) => {
        if (paused) {
          if (s.settings.pausedSince !== null) return s;
          return { ...s, settings: { ...s.settings, pausedSince: now } };
        }
        if (s.settings.pausedSince === null) return s;
        const delta = now - s.settings.pausedSince;
        return {
          ...s,
          exercises: shiftDueDates(s.exercises, delta),
          notions: shiftDueDates(s.notions, delta),
          settings: { ...s.settings, pausedSince: null },
        };
      });
    },

    recordAttempt: (exerciseId, outcome, opts) => {
      const now = get().now();
      update((s) => {
        const prev = s.exercises[exerciseId] ?? emptyExerciseProgress();
        const q = qualityOf(outcome);
        const card = reviewCard(prev.srs ?? newCard(now), q, now);
        const best =
          outcome.solved && !outcome.solutionViewed
            ? prev.bestHintLevel === null
              ? outcome.maxHintLevel
              : Math.min(prev.bestHintLevel, outcome.maxHintLevel)
            : prev.bestHintLevel;
        return {
          ...s,
          exercises: {
            ...s.exercises,
            [exerciseId]: {
              ...prev,
              attempts: prev.attempts + 1,
              solved: prev.solved || (outcome.solved && !outcome.solutionViewed),
              bestHintLevel: best,
              lastHintLevel: outcome.maxHintLevel,
              lastAttemptAt: now,
              srs: card,
              solutionViewed: prev.solutionViewed || outcome.solutionViewed,
              variantSolved: prev.variantSolved || Boolean(opts?.variant && outcome.solved),
            },
          },
        };
      });
    },

    recordConceptError: (concept, exerciseId, detail = {}) => {
      const now = get().now();
      update((s) => {
        const next = withError(s, concept, exerciseId, exerciseId, detail, now);
        const prev = s.exercises[exerciseId] ?? emptyExerciseProgress();
        return {
          ...next,
          exercises: {
            ...s.exercises,
            [exerciseId]: { ...prev, errors: { ...prev.errors, [concept]: (prev.errors[concept] ?? 0) + 1 } },
          },
        };
      });
    },

    // « Trouver l'erreur » : une erreur manquée compte comme une erreur sur son concept,
    // sans toucher à la progression des exercices.
    recordHunt: (itemId, outcome) => {
      const now = get().now();
      update((s) => {
        const prev = s.errorHunt[itemId] ?? { attempts: 0, found: false, firstTry: false, lastAt: now };
        const base: SaveData = {
          ...s,
          errorHunt: {
            ...s.errorHunt,
            [itemId]: {
              attempts: prev.attempts + 1,
              found: prev.found || outcome.found,
              firstTry: prev.firstTry || outcome.firstTry,
              lastAt: now,
            },
          },
        };
        return outcome.missed
          ? withError(base, outcome.concept, itemId, outcome.exerciseId, { source: 'trouver-erreur', kind: outcome.kind }, now)
          : base;
      });
    },

    addNotion: (id, origin) => {
      const now = get().now();
      update((s) => {
        const notions = addNotions(s.notions, [id], origin, now);
        return notions === s.notions ? s : { ...s, notions };
      });
    },

    removeNotion: (id) =>
      update((s) => {
        const notions = removeNotion(s.notions, id);
        return notions === s.notions ? s : { ...s, notions };
      }),

    reviewNotion: (id, q) => {
      const now = get().now();
      update((s) => {
        const card = s.notions[id];
        if (!card) return s;
        return { ...s, notions: { ...s.notions, [id]: reviewNotion(card, q, now) } };
      });
    },

    markSolutionViewed: (exerciseId) =>
      update((s) => {
        const prev = s.exercises[exerciseId] ?? emptyExerciseProgress();
        return { ...s, exercises: { ...s.exercises, [exerciseId]: { ...prev, solutionViewed: true } } };
      }),

    setDraft: (key, draft) =>
      update((s) => {
        const drafts = { ...s.drafts };
        if (draft) drafts[key] = draft;
        else delete drafts[key];
        return { ...s, drafts };
      }),

    setLastVisited: (path) => update((s) => (s.lastVisited === path ? s : { ...s, lastVisited: path })),

    unlockLabKeys: (labId, keys) =>
      update((s) => {
        const known = new Set(s.labs[labId] ?? []);
        const before = known.size;
        for (const k of keys) known.add(k);
        return known.size === before ? s : { ...s, labs: { ...s.labs, [labId]: [...known] } };
      }),

    saveFreeProof: (exerciseId, text, selfEval) => {
      const now = get().now();
      update((s) => ({
        ...s,
        freeProofs: {
          ...s.freeProofs,
          [exerciseId]: {
            text,
            updatedAt: now,
            selfEval: selfEval === undefined ? (s.freeProofs[exerciseId]?.selfEval ?? null) : selfEval,
          },
        },
      }));
    },

    recordCounterexample: (id, solved) => {
      const now = get().now();
      update((s) => {
        const c = s.counterexamples[id] ?? { attempts: 0, solved: false, lastAt: now };
        return {
          ...s,
          counterexamples: { ...s.counterexamples, [id]: { attempts: c.attempts + 1, solved: c.solved || solved, lastAt: now } },
        };
      });
    },

    // Un même examen peut être réenregistré (auto-évaluation d'une rédaction après coup).
    recordExam: (rec) => update((s) => ({ ...s, exams: [...s.exams.filter((e) => e.id !== rec.id), rec] })),

    importFrom: (text) => {
      const result = importSave(text);
      if (!result.ok) return { ok: false, error: result.error };
      cancelScheduled();
      set({ save: result.save });
      void write(result.save);
      return { ok: true };
    },

    reset: () => {
      const next = emptySave(get().now());
      cancelScheduled();
      set({ save: next });
      void write(next);
    },
  };
});

export const selectSettings = (s: GameState) => s.save.settings;
