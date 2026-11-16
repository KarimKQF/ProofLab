/**
 * Bilan des pièges : où l'on se trompe, de quelle façon, et sur quoi s'entraîner.
 *
 * Sources : les compteurs par concept (depuis le début de la partie) et le journal
 * détaillé des erreurs (nature, exercice, étape), tenu depuis le 16 novembre 2026.
 * Ordre des concepts : les plus fréquents récemment d'abord, puis les plus fréquents.
 */
import type { Exercise } from '@/content/schema';
import { DAY } from './srs';
import type { ExerciseProgress } from './mastery';
import { ERROR_KINDS, type ErrorEvent, type ErrorKind, type SaveData } from '@/storage/save';

/** Fenêtre de « récent » : deux semaines. */
export const RECENT_DAYS = 14;

export interface ConceptReport {
  concept: string;
  count: number;
  recent: number;
  lastAt: number;
  /** Erreurs détaillées, les plus récentes d'abord. */
  events: ErrorEvent[];
}

export interface TrapReport {
  total: number;
  recent: number;
  byKind: Record<ErrorKind, number>;
  concepts: ConceptReport[];
  /** Erreurs comptées avant la tenue du journal (sans nature ni étape). */
  beforeLog: number;
}

export function trapReport(conceptErrors: SaveData['conceptErrors'], log: readonly ErrorEvent[], now: number): TrapReport {
  const since = now - RECENT_DAYS * DAY;
  const byKind = Object.fromEntries(ERROR_KINDS.map((k) => [k, 0])) as Record<ErrorKind, number>;
  for (const e of log) byKind[e.kind] += 1;
  const total = Object.values(conceptErrors).reduce((s, c) => s + c.count, 0);
  const concepts = Object.entries(conceptErrors)
    .map(([concept, c]) => {
      const events = log.filter((e) => e.concept === concept).sort((a, b) => b.at - a.at);
      return { concept, count: c.count, lastAt: c.lastAt, recent: events.filter((e) => e.at >= since).length, events };
    })
    .sort((a, b) => b.recent - a.recent || b.count - a.count || b.lastAt - a.lastAt);
  return {
    total,
    recent: log.filter((e) => e.at >= since).length,
    byKind,
    concepts,
    beforeLog: Math.max(0, total - log.length),
  };
}

/** Le concept d'erreur est-il travaillé par cet exercice (pièges ou erreurs fréquentes) ? */
export function exerciseTrains(e: Exercise, concept: string): boolean {
  const specs = [e.proof, e.variant.proof].filter(Boolean);
  return specs.some((s) => s!.traps.some((t) => t.concept === concept)) || e.commonErrors.some((c) => c.concept === concept);
}

/**
 * Exercices pour s'entraîner sur un concept : accessibles, non encore réussis d'abord,
 * puis ceux où l'erreur a déjà été commise (à refaire), enfin les autres.
 */
export function practiceFor(
  concept: string,
  exercises: readonly Exercise[],
  progress: Record<string, ExerciseProgress>,
  open: (theoremId: string) => boolean,
  limit = 3,
): Exercise[] {
  const rank = (e: Exercise) => {
    const p = progress[e.id];
    if (!p?.solved) return 0;
    if ((p.errors[concept] ?? 0) > 0) return 1;
    return 2;
  };
  return exercises
    .filter((e) => open(e.theoremId) && exerciseTrains(e, concept))
    .map((e, i) => ({ e, r: rank(e), i }))
    .sort((a, b) => a.r - b.r || a.i - b.i)
    .slice(0, limit)
    .map((x) => x.e);
}
