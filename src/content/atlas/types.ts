/** Types des données de l'Atlas visuel de géométrie de Lie (générées par scripts/atlas/atlas_build.py). */

export interface AtlasPart {
  /** Numéro romain de la partie (I à XVII). */
  roman: string;
  title: string;
  /** Tronc principal (I à VIII) ou notions avancées (IX à XVII). */
  group: 'tronc' | 'avance';
  /** Chapitres du cours couverts, bornes incluses. */
  chapters: [number, number];
  /** Planches de la partie, bornes incluses. */
  plates: [number, number];
}

export interface AtlasPlate {
  n: number;
  /** Page du PDF de l'atlas. */
  pdfPage: number;
  part: string;
  partTitle: string;
  title: string;
  /** Question d'ouverture de la planche. */
  question: string;
  /** Encadré « Lire le dessin ». */
  lecture: string;
  /** Paragraphe « D'où vient la formule ? ». */
  origine: string;
  verifier: {
    question: string;
    reponse: string;
    /** Boîte de la réponse dans l'image, en fractions de la page : [x0, y0, x1, y1]. */
    box: [number, number, number, number] | null;
  };
  /** Référence au cours (chapitres et pages imprimées). */
  cours: { chapters: [number, number]; pages: [number, number] } | null;
}

export interface AtlasData {
  source: { title: string; author: string; pdfPages: number; plates: number };
  parts: AtlasPart[];
  plates: AtlasPlate[];
}
