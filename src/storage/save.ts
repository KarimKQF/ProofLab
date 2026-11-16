/**
 * Format de sauvegarde et persistance IndexedDB. L'export JSON est validé par schéma
 * à l'import : un fichier malformé est refusé sans altérer la progression courante.
 */
import { z } from 'zod';
import { emptyExerciseProgress, type ExerciseProgress } from '@/core/progression/mastery';
import type { PlayerGraph } from '@/core/proof-engine/engine';

export const SCHEMA_VERSION = 1;

const SrsCardSchema = z.object({
  easiness: z.number(),
  repetitions: z.number().int(),
  intervalDays: z.number(),
  due: z.number(),
  lastReview: z.number(),
});

const ExerciseProgressSchema = z.object({
  attempts: z.number().int(),
  solved: z.boolean(),
  bestHintLevel: z.number().int().nullable(),
  lastHintLevel: z.number().int(),
  lastAttemptAt: z.number().nullable(),
  srs: SrsCardSchema.nullable(),
  solutionViewed: z.boolean(),
  variantSolved: z.boolean(),
  errors: z.record(z.number().int()),
});

const GraphSchema = z.object({
  placed: z.array(z.string()),
  steps: z.record(z.object({ premises: z.array(z.string()), justification: z.string().nullable() })),
});

const DraftSchema = z.object({
  graph: GraphSchema,
  passedChecks: z.array(z.string()),
  hints: z.number().int(),
  refused: z.number().int(),
  updatedAt: z.number(),
  /** La solution a été consultée pendant cette tentative (enregistrée une seule fois). */
  viewed: z.boolean().optional(),
});

const SettingsSchema = z.object({
  theme: z.enum(['dark', 'light']),
  reduceMotion: z.boolean(),
  expertBank: z.boolean(),
  unlockAll: z.boolean(),
  pausedSince: z.number().nullable(),
  examMinutes: z.number().int().nullable(),
});

const FreeProofSchema = z.object({
  text: z.string(),
  updatedAt: z.number(),
  selfEval: z.record(z.number()).nullable(),
});

const ExamRecordSchema = z.object({
  id: z.string(),
  at: z.number(),
  items: z.array(
    z.object({
      exerciseId: z.string(),
      kind: z.enum(['variante', 'enonce']),
      validated: z.boolean(),
      score: z.number(),
      byCriterion: z.record(z.number()),
      mode: z.enum(['deterministe', 'pedagogique']),
    }),
  ),
  minutes: z.number().nullable(),
  durationMs: z.number(),
});

/** Nature d'une erreur, pour le bilan des pièges. */
export const ERROR_KINDS = ['affirmation-fausse', 'justification-invalide', 'hypothese-non-verifiee', 'resultat-indisponible', 'autre'] as const;
export type ErrorKind = (typeof ERROR_KINDS)[number];

const ErrorEventSchema = z.object({
  at: z.number(),
  concept: z.string(),
  /** Où l'erreur a eu lieu : preuve d'un exercice, mode « Trouver l'erreur », contre-exemple. */
  source: z.enum(['preuve', 'trouver-erreur', 'contre-exemple']),
  /** Exercice, démonstration fautive ou contre-exemple concerné. */
  ref: z.string(),
  node: z.string().optional(),
  kind: z.enum(ERROR_KINDS),
});

const HuntRecordSchema = z.object({
  attempts: z.number().int(),
  /** L'étape fautive a été trouvée sans l'afficher. */
  found: z.boolean(),
  /** Étape et nature trouvées du premier coup. */
  firstTry: z.boolean(),
  lastAt: z.number(),
});

/** Carte de révision d'une notion du dictionnaire. */
const NotionCardSchema = z.object({
  srs: SrsCardSchema,
  addedAt: z.number(),
  /** consultée dans un énoncé, rencontrée dans une erreur, ajoutée à la main. */
  origin: z.enum(['consultee', 'piege', 'manuelle']),
  /** Nombre d'erreurs rattachées à cette notion : priorité de révision. */
  stumbles: z.number().int(),
  reviews: z.number().int(),
  lapses: z.number().int(),
});

/** Nombre maximal d'erreurs conservées dans le journal (les plus récentes). */
export const ERROR_LOG_MAX = 500;

export const SaveSchema = z.object({
  schemaVersion: z.literal(SCHEMA_VERSION),
  createdAt: z.number(),
  settings: SettingsSchema,
  exercises: z.record(ExerciseProgressSchema),
  conceptErrors: z.record(z.object({ count: z.number().int(), lastAt: z.number(), exercises: z.array(z.string()) })),
  drafts: z.record(DraftSchema),
  freeProofs: z.record(FreeProofSchema),
  labs: z.record(z.array(z.string())),
  counterexamples: z.record(z.object({ attempts: z.number().int(), solved: z.boolean(), lastAt: z.number() })),
  exams: z.array(ExamRecordSchema),
  lastVisited: z.string().nullable(),
  // Ajouts du 16 novembre 2026 : absents des sauvegardes plus anciennes, d'où les valeurs par défaut.
  errorHunt: z.record(HuntRecordSchema).default({}),
  errorLog: z.array(ErrorEventSchema).default([]),
  notions: z.record(NotionCardSchema).default({}),
});

export type SaveData = z.infer<typeof SaveSchema>;
export type Settings = SaveData['settings'];
export type Draft = SaveData['drafts'][string];
export type ExamRecord = SaveData['exams'][number];
export type ErrorEvent = SaveData['errorLog'][number];
export type HuntRecord = SaveData['errorHunt'][string];
export type NotionCard = SaveData['notions'][string];
export type NotionOrigin = NotionCard['origin'];

export const defaultSettings = (): Settings => ({
  theme: 'dark',
  reduceMotion: false,
  expertBank: false,
  unlockAll: false,
  pausedSince: null,
  examMinutes: null,
});

export const emptySave = (now: number): SaveData => ({
  schemaVersion: SCHEMA_VERSION,
  createdAt: now,
  settings: defaultSettings(),
  exercises: {},
  conceptErrors: {},
  drafts: {},
  freeProofs: {},
  labs: {},
  counterexamples: {},
  exams: [],
  lastVisited: null,
  errorHunt: {},
  errorLog: [],
  notions: {},
});

export function ensureExercise(save: SaveData, id: string): ExerciseProgress {
  return save.exercises[id] ?? emptyExerciseProgress();
}

export const graphOf = (d: Draft | undefined): PlayerGraph | null =>
  d ? { placed: d.graph.placed, steps: d.graph.steps } : null;

// ───────────────────────── IndexedDB ─────────────────────────

const DB = 'prooflab';
const STORE = 'kv';
const KEY = 'save';

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx<T>(mode: IDBTransactionMode, run: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return open().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const t = db.transaction(STORE, mode);
        const req = run(t.objectStore(STORE));
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
        t.oncomplete = () => db.close();
      }),
  );
}

export async function loadSave(now: number): Promise<SaveData> {
  try {
    const raw = await tx<unknown>('readonly', (s) => s.get(KEY));
    if (raw) {
      const parsed = SaveSchema.safeParse(raw);
      if (parsed.success) return parsed.data;
      console.warn('Sauvegarde locale illisible, nouvelle partie.', parsed.error.message);
    }
  } catch (e) {
    console.warn('IndexedDB indisponible, progression non persistée.', e);
  }
  return emptySave(now);
}

export async function persistSave(save: SaveData): Promise<void> {
  try {
    await tx('readwrite', (s) => s.put(save, KEY));
  } catch (e) {
    console.warn('Échec de la sauvegarde locale.', e);
  }
}

export const exportSave = (save: SaveData): string => JSON.stringify(save, null, 2);

export type ImportResult = { ok: true; save: SaveData } | { ok: false; error: string };

export function importSave(text: string): ImportResult {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return { ok: false, error: 'Ce fichier n’est pas un JSON valide.' };
  }
  const parsed = SaveSchema.safeParse(data);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { ok: false, error: `Format de sauvegarde non reconnu (${first?.path.join('.') || 'racine'} : ${first?.message}).` };
  }
  return { ok: true, save: parsed.data };
}
