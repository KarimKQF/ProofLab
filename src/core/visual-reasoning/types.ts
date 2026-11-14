/**
 * Visual Reasoning Engine — types communs.
 *
 * Principe : une scène est un modèle mathématique pur. Ses paramètres (état unique)
 * produisent une « lecture » (mesures, équations, hypothèses, conclusions) que toutes
 * les vues affichent. Aucune vue ne calcule elle-même une quantité mathématique, et
 * aucune manipulation visuelle n'écrit dans la progression du joueur.
 */

/** Statut épistémique de ce qui est affiché. */
export type Epistemic = 'exact' | 'numerique' | 'illustratif';

/**
 * État d'une hypothèse, toujours distingué :
 *  - satisfaite : vraie pour l'exemple affiché, par un calcul ou une vérification directe ;
 *  - demontree : établie par le joueur dans le moteur de preuve ;
 *  - supposee : posée comme hypothèse du théorème général ;
 *  - non-verifiee : ni établie ni vérifiable ici ;
 *  - absente : désactivée, ou fausse pour l'exemple affiché.
 */
export type HypothesisState = 'satisfaite' | 'demontree' | 'supposee' | 'non-verifiee' | 'absente';

/**
 * État d'une conclusion :
 *  - etablie : démontrée (moteur de preuve) ;
 *  - illustrative : visible sur la figure, sans être démontrée ici ;
 *  - non-garantie : le théorème ne s'applique plus, la conclusion peut rester vraie ;
 *  - fausse : réfutée par un contre-exemple justifié analytiquement.
 */
export type ConclusionState = 'etablie' | 'illustrative' | 'non-garantie' | 'fausse';

export interface Measure {
  id: string;
  /** Libellé LaTeX ou texte mixte. */
  label: string;
  value: string;
  numeric?: number;
  status: Epistemic;
  /** Méthode et précision pour une valeur numérique. */
  method?: string;
}

export interface EquationLine {
  id: string;
  /** Texte mixte (français + LaTeX). */
  tex: string;
  status: Epistemic;
  note?: string;
}

export interface HypothesisLine {
  id: string;
  label: string;
  state: HypothesisState;
  detail?: string;
}

export interface ConclusionLine {
  id: string;
  label: string;
  state: ConclusionState;
  detail?: string;
}

/** Tout ce qu'une scène dérive de son état : la source unique de toutes les vues. */
export interface SceneReadout {
  measures: Measure[];
  equations: EquationLine[];
  hypotheses: HypothesisLine[];
  conclusions: ConclusionLine[];
}

/** Explications attachées à une scène (« Pourquoi cette représentation ? », etc.). */
export interface SceneExplanations {
  why: string;
  proofLink: string;
  generalize: string;
}

export const HYPOTHESIS_LABEL: Record<HypothesisState, string> = {
  satisfaite: 'Satisfaite dans cet exemple',
  demontree: 'Démontrée',
  supposee: 'Supposée (hypothèse du théorème)',
  'non-verifiee': 'Non vérifiée',
  absente: 'Absente',
};

export const CONCLUSION_LABEL: Record<ConclusionState, string> = {
  etablie: 'Conclusion établie',
  illustrative: 'Représentée à titre illustratif',
  'non-garantie': 'Plus garantie par ce théorème',
  fausse: 'Fausse dans ce contre-exemple',
};

/** Format décimal français, nombre de chiffres significatifs maîtrisé. */
export function fmt(v: number, digits = 3): string {
  if (!Number.isFinite(v)) return '—';
  // Arrondi d'abord : un résidu d'arrondi comme −1e−16 s'affiche « 0 », jamais « −0 ».
  const f = 10 ** digits;
  const r = Math.round(v * f) / f;
  return (r === 0 ? 0 : r).toLocaleString('fr-FR', { maximumFractionDigits: digits, minimumFractionDigits: 0 });
}

/** Vecteur en LaTeX : (a, b) ou (a, b, c), décimales à la française. */
export function vecTex(v: readonly number[], digits = 2): string {
  return `(${v.map((x) => fmt(x, digits).replace(',', '{,}')).join(',\\ ')})`;
}
