import type { ReviewEntry } from '@/content';

/**
 * Relecture mathématique indépendante R6 : lemme d'identification de Minty et méthode
 * de Galerkin (monde 8), avec les dix preuves du laboratoire Galerkin.
 * Toutes les entrées sont relues après correction.
 * Rapport détaillé : docs/notes/relecture-r6.md.
 */
const entries: ReviewEntry[] = [
  { id: 'minty', status: 'relu' },
  { id: 'minty.facile', status: 'relu' },
  { id: 'minty.intermediaire', status: 'relu' },
  { id: 'minty.difficile', status: 'relu' },

  { id: 'galerkin', status: 'relu' },
  { id: 'galerkin.facile', status: 'relu' },
  { id: 'galerkin.intermediaire', status: 'relu' },
  { id: 'galerkin.difficile', status: 'relu' },
];

export default entries;
