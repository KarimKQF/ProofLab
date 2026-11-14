/**
 * Atlas visuel de géométrie de Lie : 90 planches reproduites en image, avec leurs textes
 * cités (question, « Lire le dessin », « D'où vient la formule ? », « À vérifier »), la
 * référence au cours, et les liens vers les résultats du jeu et les scènes du laboratoire G.
 */
import { THEOREM_CATALOG, type CatalogEntry } from '@/content/catalog';
import { ATLAS_DATA } from './atlas-lie.data';
import type { AtlasPart, AtlasPlate } from './types';

export type { AtlasData, AtlasPart, AtlasPlate } from './types';

export const ATLAS_SOURCE = ATLAS_DATA.source;
export const ATLAS_PARTS: AtlasPart[] = ATLAS_DATA.parts;
export const ATLAS_PLATES: AtlasPlate[] = ATLAS_DATA.plates;

/** Décalage entre pages imprimées et pages PDF du cours de géométrie de Lie. */
export const LIE_COURSE_OFFSET = 20;

export const plateById = (n: number): AtlasPlate | undefined => ATLAS_PLATES.find((p) => p.n === n);
export const partOf = (plate: AtlasPlate): AtlasPart | undefined => ATLAS_PARTS.find((p) => p.roman === plate.part);

/** Chemin de l'image d'une planche (pleine ou vignette), relatif à la base de l'application. */
export function plateImage(n: number, size: 'full' | 'mini' = 'full'): string {
  const file = `planche-${String(n).padStart(2, '0')}.webp`;
  return `${import.meta.env.BASE_URL}atlas-lie/${size === 'mini' ? 'mini/' : ''}${file}`;
}

/** Résultats du jeu qui renvoient à la planche (champ `atlas` du catalogue). */
export const theoremsForPlate = (n: number): CatalogEntry[] => THEOREM_CATALOG.filter((e) => e.atlas?.includes(n));

/** Scènes du laboratoire G. */
export const LIE_SCENES = [
  { id: 'commutateur', label: 'Commutateur de flots' },
  { id: 'exponentielle', label: 'Exponentielle' },
  { id: 'rodrigues', label: 'Rodrigues' },
  { id: 'revetement', label: 'Revêtement SU(2) → SO(3)' },
  { id: 'orbites', label: 'Orbites' },
  { id: 'symplectique', label: 'Intégration symplectique' },
] as const;
export type LieSceneId = (typeof LIE_SCENES)[number]['id'];

/** Planches illustrées par une scène du laboratoire G. */
export const SCENE_PLATES: Record<LieSceneId, number[]> = {
  commutateur: [7, 8],
  exponentielle: [32, 33, 34, 40],
  rodrigues: [35],
  revetement: [36],
  orbites: [1, 24, 25, 26],
  symplectique: [63, 66, 89],
};

/** Scène du laboratoire G associée à un résultat du parcours Lie. */
export const SCENE_FOR_THEOREM: Record<string, LieSceneId> = {
  'crochet-lie': 'commutateur',
  'orbite-stabilisateur': 'orbites',
  exponentielle: 'exponentielle',
  rodrigues: 'rodrigues',
  'revetement-su2': 'revetement',
  'flot-hamiltonien': 'symplectique',
};

export const sceneForPlate = (n: number): LieSceneId | undefined =>
  (Object.keys(SCENE_PLATES) as LieSceneId[]).find((s) => SCENE_PLATES[s].includes(n));

/** Recherche plein texte, insensible à la casse et aux accents. */
const fold = (s: string): string =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

export function searchPlates(query: string, plates: AtlasPlate[] = ATLAS_PLATES): AtlasPlate[] {
  const words = fold(query).split(/\s+/).filter(Boolean);
  if (!words.length) return plates;
  return plates.filter((p) => {
    const hay = fold([p.title, p.question, p.lecture, p.origine, p.verifier.question, p.partTitle, `planche ${p.n}`].join(' '));
    return words.every((w) => hay.includes(w));
  });
}
