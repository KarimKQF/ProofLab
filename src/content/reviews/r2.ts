import type { ReviewEntry } from '@/content';

/**
 * Relecture mathématique indépendante R2 : modules 9 (Poincaré), 11 (Lax–Milgram),
 * 12 (trace), 13 (Rellich–Kondrachov), 14 (régularité elliptique), 15 (Plancherel)
 * et 16 (Gagliardo). Détail des corrections : docs/notes/relecture-r2.md.
 */
const entries: ReviewEntry[] = [
  { id: 'poincare', status: 'relu' },
  { id: 'poincare.facile', status: 'relu' },
  { id: 'poincare.intermediaire', status: 'relu' },
  { id: 'poincare.difficile', status: 'relu' },

  { id: 'lax-milgram', status: 'relu' },
  { id: 'lax-milgram.facile', status: 'relu' },
  { id: 'lax-milgram.intermediaire', status: 'relu' },
  { id: 'lax-milgram.difficile', status: 'relu' },

  { id: 'trace', status: 'relu' },
  { id: 'trace.facile', status: 'relu' },
  { id: 'trace.intermediaire', status: 'relu' },
  { id: 'trace.difficile', status: 'relu' },

  { id: 'rellich', status: 'relu' },
  { id: 'rellich.facile', status: 'relu' },
  { id: 'rellich.intermediaire', status: 'relu' },
  { id: 'rellich.difficile', status: 'relu' },

  { id: 'regularite-elliptique', status: 'relu' },
  { id: 'regularite-elliptique.facile', status: 'relu' },
  { id: 'regularite-elliptique.intermediaire', status: 'relu' },
  { id: 'regularite-elliptique.difficile', status: 'relu' },

  { id: 'plancherel', status: 'relu' },
  { id: 'plancherel.facile', status: 'relu' },
  { id: 'plancherel.intermediaire', status: 'relu' },
  { id: 'plancherel.difficile', status: 'relu' },

  { id: 'gagliardo', status: 'relu' },
  { id: 'gagliardo.facile', status: 'relu' },
  { id: 'gagliardo.intermediaire', status: 'relu' },
  { id: 'gagliardo.difficile', status: 'relu' },
];

export default entries;
