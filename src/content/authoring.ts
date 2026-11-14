/**
 * Aides d'écriture du contenu.
 *
 * `t` permet d'écrire du LaTeX sans doubler les antislashs : t`$\|x\|$`.
 * Attention : dans un gabarit, la suite dollar + accolade ouvrante déclenche une
 * interpolation. Écrire $\{…\}$ (antislash avant l'accolade) ou insérer une espace.
 */
import type { Exercise } from './schema';

export const t = String.raw;

export interface RubricText {
  hypotheses: string;
  methode: string;
  validite: string;
  justifications: string;
  conclusion: string;
}

/** Grille à cinq critères, totalisant 100 points. */
export function rubric(text: RubricText, points: [number, number, number, number, number] = [20, 20, 25, 20, 15]): Exercise['rubric'] {
  return [
    { criterion: 'Hypothèses', description: text.hypotheses, points: points[0] },
    { criterion: 'Méthode', description: text.methode, points: points[1] },
    { criterion: 'Validité des étapes', description: text.validite, points: points[2] },
    { criterion: 'Justifications', description: text.justifications, points: points[3] },
    { criterion: 'Conclusion', description: text.conclusion, points: points[4] },
  ];
}

/** Statut de vérification d'une démonstration reprise du polycopié. */
export const FROM_POLY: Exercise['verification'] = { origin: 'polycopie', review: 'machine' };
/** Statut d'un développement rédigé pour ProofLab, absent du polycopié. */
export const COMPLEMENT: Exercise['verification'] = { origin: 'complement', review: 'machine' };

export const poly = (pdfPage: number, label: string): Exercise['source'] => ({ doc: 'polycopie', pdfPage, label });
/** Source dans le cours de géométrie de Lie (« Géométrie différentielle, groupes de Lie, symétries… »), page du PDF. */
export const lie = (pdfPage: number, label: string): Exercise['source'] => ({ doc: 'cours-lie', pdfPage, label });
/** Statut d'une démonstration reprise du cours de géométrie de Lie. */
export const FROM_LIE: Exercise['verification'] = { origin: 'cours-lie', review: 'machine' };
export const complement = (label: string): Exercise['source'] => ({ doc: 'complement', label });
