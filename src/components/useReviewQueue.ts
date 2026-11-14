import { useMemo } from 'react';
import { EXERCISES } from '@/content';
import { buildReviewQueue } from '@/core/progression/mastery';
import { useGame } from '@/storage/store';

/** Métadonnées utiles à l'ordonnancement des révisions, calculées une seule fois. */
const META = new Map(
  EXERCISES.map((e) => [
    e.id,
    {
      theoremId: e.theoremId,
      hasVariantProof: Boolean(e.variant.proof),
      usesTheorems: [...new Set(e.proof.justifications.flatMap((j) => (j.theorem ? [j.theorem] : [])))],
    },
  ]),
);

export function useReviewQueue() {
  const exercises = useGame((s) => s.save.exercises);
  const pausedSince = useGame((s) => s.save.settings.pausedSince);
  const now = useGame((s) => s.now);
  return useMemo(
    () => (pausedSince !== null ? [] : buildReviewQueue(exercises, META, now())),
    [exercises, pausedSince, now],
  );
}
