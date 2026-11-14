/**
 * Maîtrise par théorème. Calcul explicite, sans tirage ni pénalité de pause :
 *
 *   autonomie d'un exercice    = 1 sans indice, 0,7 avec orientation, 0,4 avec structure,
 *                                0,15 avec déblocage ; 0 si non résolu ou solution consultée
 *   rétention                  = 1 tant que l'échéance n'est pas passée, puis diminue
 *                                jusqu'à un plancher de 0,5 selon le retard relatif
 *   maîtrise du théorème       = Σ poids(niveau) × autonomie × rétention
 *   poids                      = facile 0,20 ; intermédiaire 0,35 ; difficile 0,45
 *
 * « Maîtrisé » exige en plus que le niveau difficile ait été résolu sans indice de
 * structure ou de déblocage : une réussite très aidée n'est pas une preuve autonome.
 */
import { DAY, isDue, type SrsCard } from './srs';
import type { Level } from '@/content/schema';
import { ancestors, CATALOG_BY_ID, THEOREM_CATALOG } from '@/content/catalog';

export interface ExerciseProgress {
  attempts: number;
  solved: boolean;
  /** Plus faible niveau d'indice parmi les résolutions réussies ; null si jamais résolu. */
  bestHintLevel: number | null;
  /** Niveau d'indice de la dernière tentative. */
  lastHintLevel: number;
  lastAttemptAt: number | null;
  srs: SrsCard | null;
  solutionViewed: boolean;
  variantSolved: boolean;
  errors: Record<string, number>;
}

export const emptyExerciseProgress = (): ExerciseProgress => ({
  attempts: 0,
  solved: false,
  bestHintLevel: null,
  lastHintLevel: 0,
  lastAttemptAt: null,
  srs: null,
  solutionViewed: false,
  variantSolved: false,
  errors: {},
});

export const AUTONOMY = [1, 0.7, 0.4, 0.15] as const;
export const LEVEL_WEIGHT: Record<Level, number> = { facile: 0.2, intermediaire: 0.35, difficile: 0.45 };

export function autonomyOf(p: ExerciseProgress | undefined): number {
  if (!p || !p.solved || p.bestHintLevel === null) return 0;
  if (p.solutionViewed && p.bestHintLevel > 0) return 0;
  return AUTONOMY[Math.min(p.bestHintLevel, 3)] ?? 0;
}

export function retention(card: SrsCard | null, now: number): number {
  if (!card || !isDue(card, now)) return 1;
  const overdue = (now - card.due) / DAY;
  return Math.max(0.5, 1 - 0.25 * (overdue / Math.max(card.intervalDays, 1)));
}

export interface TheoremMastery {
  value: number;
  status: 'nouveau' | 'en-cours' | 'maitrise' | 'fragile';
  solved: number;
  nextReview: number | null;
  lastReview: number | null;
  attempts: number;
  helpLevel: number | null;
  errors: number;
}

const LEVELS: Level[] = ['facile', 'intermediaire', 'difficile'];
export const exerciseId = (theoremId: string, level: Level): string => `${theoremId}.${level}`;

export function theoremMastery(
  theoremId: string,
  progress: Record<string, ExerciseProgress>,
  now: number,
): TheoremMastery {
  let value = 0;
  let solved = 0;
  let attempts = 0;
  let errors = 0;
  let nextReview: number | null = null;
  let lastReview: number | null = null;
  let helpLevel: number | null = null;
  for (const level of LEVELS) {
    const p = progress[exerciseId(theoremId, level)];
    if (!p) continue;
    value += LEVEL_WEIGHT[level] * autonomyOf(p) * retention(p.srs, now);
    if (p.solved) solved += 1;
    attempts += p.attempts;
    errors += Object.values(p.errors).reduce((s, n) => s + n, 0);
    if (p.srs) {
      nextReview = nextReview === null ? p.srs.due : Math.min(nextReview, p.srs.due);
      lastReview = lastReview === null ? p.srs.lastReview : Math.max(lastReview, p.srs.lastReview);
    }
    if (p.bestHintLevel !== null) helpLevel = helpLevel === null ? p.bestHintLevel : Math.max(helpLevel, p.bestHintLevel);
  }
  const hard = progress[exerciseId(theoremId, 'difficile')];
  const autonomousHard = Boolean(hard?.solved && hard.bestHintLevel !== null && hard.bestHintLevel <= 1);
  let status: TheoremMastery['status'] = 'nouveau';
  if (attempts > 0) status = 'en-cours';
  if (value >= 0.8 && autonomousHard) status = 'maitrise';
  else if (attempts > 0 && errors >= 3 && value < 0.5) status = 'fragile';
  return { value, status, solved, nextReview, lastReview, attempts, helpLevel, errors };
}

/** Un théorème est accessible lorsque chacun de ses prérequis a au moins un exercice résolu. */
export function isUnlocked(
  theoremId: string,
  progress: Record<string, ExerciseProgress>,
  unlockAll: boolean,
): boolean {
  if (unlockAll) return true;
  const entry = CATALOG_BY_ID.get(theoremId);
  if (!entry) return false;
  return entry.requires.every((r) =>
    LEVELS.some((l) => progress[exerciseId(r, l)]?.solved),
  );
}

export interface ReviewItem {
  exerciseId: string;
  theoremId: string;
  kind: 'revision' | 'variante' | 'reutilisation';
  reason: string;
  overdueDays: number;
}

/**
 * Construit la révision du jour. Les cartes dues d'abord, les plus en retard en tête.
 * Une carte déjà réussie est présentée sous une forme nouvelle lorsque c'est possible,
 * pour ne pas récompenser la mémorisation d'une rédaction.
 */
export function buildReviewQueue(
  progress: Record<string, ExerciseProgress>,
  exerciseMeta: ReadonlyMap<string, { theoremId: string; hasVariantProof: boolean; usesTheorems: string[] }>,
  now: number,
  limit = 12,
): ReviewItem[] {
  const due = Object.entries(progress)
    .filter(([id, p]) => p.srs && isDue(p.srs, now) && exerciseMeta.has(id))
    .map(([id, p]) => ({ id, p, overdue: (now - p.srs!.due) / DAY }))
    .sort((a, b) => b.overdue - a.overdue)
    .slice(0, limit);

  return due.map(({ id, p, overdue }) => {
    const meta = exerciseMeta.get(id)!;
    const reuse = [...exerciseMeta.entries()].find(
      ([otherId, m]) => otherId !== id && m.theoremId !== meta.theoremId && m.usesTheorems.includes(meta.theoremId) && !progress[otherId]?.solved,
    );
    if (p.solved && reuse) {
      return {
        exerciseId: reuse[0],
        theoremId: meta.theoremId,
        kind: 'reutilisation' as const,
        reason: 'Réutiliser le résultat dans un autre contexte.',
        overdueDays: overdue,
      };
    }
    if (p.solved && meta.hasVariantProof) {
      return {
        exerciseId: id,
        theoremId: meta.theoremId,
        kind: 'variante' as const,
        reason: 'Variante de l’énoncé : la rédaction précédente ne suffit pas.',
        overdueDays: overdue,
      };
    }
    return {
      exerciseId: id,
      theoremId: meta.theoremId,
      kind: 'revision' as const,
      reason: p.solved ? 'Reprendre sans indice.' : 'Résolution encore à obtenir.',
      overdueDays: overdue,
    };
  });
}

/** Exercices résolus avec aide, à refaire sans indice. */
export function toRedoWithoutHints(progress: Record<string, ExerciseProgress>): string[] {
  return Object.entries(progress)
    .filter(([, p]) => p.solved && p.bestHintLevel !== null && p.bestHintLevel > 0)
    .map(([id]) => id);
}

export function worldStats(
  world: number,
  progress: Record<string, ExerciseProgress>,
  now: number,
): { total: number; solved: number; mastered: number; meanMastery: number } {
  const entries = THEOREM_CATALOG.filter((t) => t.world === world);
  let solved = 0;
  let mastered = 0;
  let sum = 0;
  for (const e of entries) {
    const m = theoremMastery(e.id, progress, now);
    solved += m.solved;
    if (m.status === 'maitrise') mastered += 1;
    sum += m.value;
  }
  return { total: entries.length * 3, solved, mastered, meanMastery: entries.length ? sum / entries.length : 0 };
}

/** Théorèmes qui dépendent directement d'un résultat (réutilisations possibles). */
export function dependents(theoremId: string): string[] {
  return THEOREM_CATALOG.filter((t) => ancestors(t.id, false).has(theoremId)).map((t) => t.id);
}
