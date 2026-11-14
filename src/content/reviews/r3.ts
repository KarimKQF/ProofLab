import type { ReviewEntry } from '@/content';

/**
 * Relecture mathématique indépendante R3 : Banach–Alaoglu, extraction réflexive,
 * adjoint, alternative de Fredholm, théorème spectral compact auto-adjoint.
 * Rapport détaillé : docs/notes/relecture-r3.md.
 */
const entries: ReviewEntry[] = [
  { id: 'banach-alaoglu', status: 'relu' },
  { id: 'banach-alaoglu.facile', status: 'relu' },
  { id: 'banach-alaoglu.intermediaire', status: 'relu' },
  { id: 'banach-alaoglu.difficile', status: 'relu' },

  { id: 'extraction-reflexive', status: 'relu' },
  { id: 'extraction-reflexive.facile', status: 'relu' },
  { id: 'extraction-reflexive.intermediaire', status: 'relu' },
  { id: 'extraction-reflexive.difficile', status: 'relu' },

  { id: 'adjoint', status: 'relu' },
  { id: 'adjoint.facile', status: 'relu' },
  { id: 'adjoint.intermediaire', status: 'relu' },
  { id: 'adjoint.difficile', status: 'relu' },

  { id: 'fredholm', status: 'relu' },
  { id: 'fredholm.facile', status: 'relu' },
  { id: 'fredholm.intermediaire', status: 'relu' },
  { id: 'fredholm.difficile', status: 'relu' },

  { id: 'spectral-compact', status: 'relu' },
  { id: 'spectral-compact.facile', status: 'relu' },
  { id: 'spectral-compact.intermediaire', status: 'relu' },
  { id: 'spectral-compact.difficile', status: 'relu' },
];

export default entries;
