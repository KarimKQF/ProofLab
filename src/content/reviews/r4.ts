import type { ReviewEntry } from '@/content';

/**
 * Relecture mathématique indépendante R4 : théorème spectral général, Hille–Yosida,
 * Lumer–Phillips, représentation des formes fermées, extension de Friedrichs.
 * Rapport détaillé : docs/notes/relecture-r4.md.
 */
const entries: ReviewEntry[] = [
  { id: 'spectral-general', status: 'relu' },
  { id: 'spectral-general.facile', status: 'relu' },
  { id: 'spectral-general.intermediaire', status: 'relu' },
  { id: 'spectral-general.difficile', status: 'relu' },

  { id: 'hille-yosida', status: 'relu' },
  { id: 'hille-yosida.facile', status: 'relu' },
  { id: 'hille-yosida.intermediaire', status: 'relu' },
  { id: 'hille-yosida.difficile', status: 'relu' },

  { id: 'lumer-phillips', status: 'relu' },
  { id: 'lumer-phillips.facile', status: 'relu' },
  { id: 'lumer-phillips.intermediaire', status: 'relu' },
  { id: 'lumer-phillips.difficile', status: 'relu' },

  { id: 'formes-fermees', status: 'relu' },
  { id: 'formes-fermees.facile', status: 'relu' },
  { id: 'formes-fermees.intermediaire', status: 'relu' },
  { id: 'formes-fermees.difficile', status: 'relu' },

  { id: 'friedrichs', status: 'relu' },
  { id: 'friedrichs.facile', status: 'relu' },
  { id: 'friedrichs.intermediaire', status: 'relu' },
  { id: 'friedrichs.difficile', status: 'relu' },
];

export default entries;
