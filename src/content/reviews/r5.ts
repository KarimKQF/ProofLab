import type { ReviewEntry } from '@/content';

/**
 * Relecture mathématique indépendante R5 : Poincaré–Wirtinger, dualité et interpolation H^s,
 * injections de Sobolev fractionnaires, Aubin–Lions, Lions–Magenes, Grönwall, Browder–Minty.
 * Rapport détaillé : docs/notes/relecture-r5.md.
 */
const entries: ReviewEntry[] = [
  { id: 'poincare-wirtinger', status: 'relu' },
  { id: 'poincare-wirtinger.facile', status: 'relu' },
  { id: 'poincare-wirtinger.intermediaire', status: 'relu' },
  { id: 'poincare-wirtinger.difficile', status: 'relu' },

  { id: 'dualite-interpolation', status: 'relu' },
  { id: 'dualite-interpolation.facile', status: 'relu' },
  { id: 'dualite-interpolation.intermediaire', status: 'relu' },
  { id: 'dualite-interpolation.difficile', status: 'relu' },

  { id: 'injections-fractionnaires', status: 'relu' },
  { id: 'injections-fractionnaires.facile', status: 'relu' },
  { id: 'injections-fractionnaires.intermediaire', status: 'relu' },
  { id: 'injections-fractionnaires.difficile', status: 'relu' },

  { id: 'aubin-lions', status: 'relu' },
  { id: 'aubin-lions.facile', status: 'relu' },
  { id: 'aubin-lions.intermediaire', status: 'relu' },
  { id: 'aubin-lions.difficile', status: 'relu' },

  { id: 'lions-magenes', status: 'relu' },
  { id: 'lions-magenes.facile', status: 'relu' },
  { id: 'lions-magenes.intermediaire', status: 'relu' },
  { id: 'lions-magenes.difficile', status: 'relu' },

  { id: 'gronwall', status: 'relu' },
  { id: 'gronwall.facile', status: 'relu' },
  { id: 'gronwall.intermediaire', status: 'relu' },
  { id: 'gronwall.difficile', status: 'relu' },

  { id: 'browder-minty', status: 'relu' },
  { id: 'browder-minty.facile', status: 'relu' },
  { id: 'browder-minty.intermediaire', status: 'relu' },
  { id: 'browder-minty.difficile', status: 'relu' },
];

export default entries;
