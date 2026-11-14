import type { ReviewEntry } from '@/content';

// Relecture indépendante r1 : résultats 1 à 8 (projection à distributions).
// Corrections consignées dans docs/notes/relecture-r1.md.
const entries: ReviewEntry[] = [
  { id: 'projection', status: 'relu' },
  { id: 'projection.facile', status: 'relu' },
  { id: 'projection.intermediaire', status: 'relu' },
  { id: 'projection.difficile', status: 'relu' },

  { id: 'riesz', status: 'relu' },
  { id: 'riesz.facile', status: 'relu' },
  { id: 'riesz.intermediaire', status: 'relu' },
  { id: 'riesz.difficile', status: 'relu' },

  { id: 'hahn-banach', status: 'relu' },
  { id: 'hahn-banach.facile', status: 'relu' },
  { id: 'hahn-banach.intermediaire', status: 'relu' },
  { id: 'hahn-banach.difficile', status: 'relu' },

  { id: 'stampacchia', status: 'relu' },
  { id: 'stampacchia.facile', status: 'relu' },
  { id: 'stampacchia.intermediaire', status: 'relu' },
  { id: 'stampacchia.difficile', status: 'relu' },

  { id: 'banach-steinhaus', status: 'relu' },
  { id: 'banach-steinhaus.facile', status: 'relu' },
  { id: 'banach-steinhaus.intermediaire', status: 'relu' },
  { id: 'banach-steinhaus.difficile', status: 'relu' },

  { id: 'application-ouverte', status: 'relu' },
  { id: 'application-ouverte.facile', status: 'relu' },
  { id: 'application-ouverte.intermediaire', status: 'relu' },
  { id: 'application-ouverte.difficile', status: 'relu' },

  { id: 'graphe-ferme', status: 'relu' },
  { id: 'graphe-ferme.facile', status: 'relu' },
  { id: 'graphe-ferme.intermediaire', status: 'relu' },
  { id: 'graphe-ferme.difficile', status: 'relu' },

  { id: 'distributions', status: 'relu' },
  { id: 'distributions.facile', status: 'relu' },
  { id: 'distributions.intermediaire', status: 'relu' },
  { id: 'distributions.difficile', status: 'relu' },
];

export default entries;
