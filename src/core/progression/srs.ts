/**
 * Répétition espacée et maîtrise.
 *
 * Algorithme : SM-2 (Woźniak, 1990), appliqué à chaque exercice. La qualité q ∈ {0,…,5}
 * n'est pas déclarée par le joueur : elle est déduite de ce qui s'est passé.
 *
 *   q = 5  résolu sans indice ni étape refusée
 *   q = 4  résolu sans indice, avec des étapes refusées ; ou avec un indice d'orientation seul
 *   q = 3  résolu avec un indice d'orientation et des refus, ou avec un indice de structure
 *   q = 2  résolu avec un indice de déblocage : n'est PAS compté comme réussite autonome
 *   q = 1  solution consultée, ou résolution non aboutie malgré des étapes valides
 *   q = 0  aucune étape valide
 *
 * Pour q < 3, SM-2 repart de zéro : une réussite très aidée n'allonge pas l'intervalle.
 * Aucune pression artificielle : pas de série à entretenir, et une pause décale toutes
 * les échéances sans pénalité (voir `shiftDueDates`).
 */
export const DAY = 24 * 3600 * 1000;

export interface SrsCard {
  easiness: number;
  repetitions: number;
  intervalDays: number;
  due: number;
  lastReview: number;
}

export interface AttemptOutcome {
  solved: boolean;
  /** Niveau d'indice le plus élevé consulté (0 à 3). */
  maxHintLevel: number;
  /** Nombre d'étapes refusées (incorrectes ou à justifier) pendant la tentative. */
  refusedSteps: number;
  /** Nombre d'étapes validées. */
  validSteps: number;
  solutionViewed: boolean;
}

export function qualityOf(o: AttemptOutcome): number {
  if (o.solutionViewed) return 1;
  if (!o.solved) return o.validSteps > 0 ? 1 : 0;
  switch (o.maxHintLevel) {
    case 0:
      return o.refusedSteps === 0 ? 5 : 4;
    case 1:
      return o.refusedSteps === 0 ? 4 : 3;
    case 2:
      return 3;
    default:
      return 2;
  }
}

export const newCard = (now: number): SrsCard => ({
  easiness: 2.5,
  repetitions: 0,
  intervalDays: 0,
  due: now,
  lastReview: now,
});

/** Mise à jour SM-2 d'une carte. */
export function reviewCard(card: SrsCard, q: number, now: number): SrsCard {
  let { easiness, repetitions, intervalDays } = card;
  if (q < 3) {
    repetitions = 0;
    intervalDays = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 6;
    else intervalDays = Math.round(intervalDays * easiness);
  }
  easiness = Math.max(1.3, easiness + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  return { easiness, repetitions, intervalDays, due: now + intervalDays * DAY, lastReview: now };
}

/** Une pause décale toutes les échéances de sa durée : rien n'est perdu. */
export function shiftDueDates<T extends { srs: SrsCard | null }>(items: Record<string, T>, delta: number): Record<string, T> {
  return Object.fromEntries(
    Object.entries(items).map(([k, v]) => [k, v.srs ? { ...v, srs: { ...v.srs, due: v.srs.due + delta } } : v]),
  );
}

export const isDue = (card: SrsCard, now: number): boolean => card.due <= now;
