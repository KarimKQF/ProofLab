/**
 * Compléments locaux du laboratoire D. Familles, normes et verdicts viennent de
 * `@/core/math/compactness`, réutilisé tel quel ; ce module n'ajoute que l'habillage :
 * nom en clair, espaces de travail, forme fermée (LaTeX) de la norme de la conclusion,
 * que les données ne fournissent qu'en valeur, et ingrédients spécialisés.
 */
import type { CompactnessFamily } from '@/core/math/compactness';

/** Indice maximal du curseur. */
export const N_MAX = 40;

/** Espaces de travail d'une famille (LaTeX, sauf `strongPlain`). */
export interface Spaces {
  X0: string;
  X: string;
  /** Espace de la borne en espace. */
  bound: string;
  /** Espace de la borne en temps. */
  boundDt: string;
  /** Espace de la conclusion forte. */
  strong: string;
  /** Le même, en texte simple pour les lecteurs d'écran (KaTeX y est masqué). */
  strongPlain: string;
}

const INTERVALLE: Spaces = {
  X0: String.raw`H^1_0(\Omega)`,
  X: String.raw`L^2(\Omega)`,
  bound: String.raw`L^2(0,T;H^1_0(\Omega))`,
  boundDt: String.raw`L^2(0,T;H^{-1}(\Omega))`,
  strong: String.raw`L^2(0,T;L^2(\Omega))`,
  strongPlain: 'L²(0, T ; L²(Ω))',
};

const DROITE: Spaces = {
  X0: String.raw`H^1(\mathbb R)`,
  X: String.raw`L^2(\mathbb R)`,
  bound: String.raw`H^1(\mathbb R)`,
  boundDt: String.raw`L^2(0,T;H^{-1}(\mathbb R))`,
  strong: String.raw`L^2(\mathbb R)`,
  strongPlain: 'L²(ℝ)',
};

export interface FamilyMeta {
  /** Nom court, en clair. */
  name: string;
  /** Lecture de la formule, pour les lecteurs d'écran. */
  spoken: string;
  spaces: Spaces;
  /** Famille sans variable de temps (version de Rellich) : une courbe suffit. */
  timeless: boolean;
  /** Objets de la formule à définir (texte mixte). */
  defs?: string;
  /** Forme fermée de la norme de la conclusion, cohérente avec `normL2L2` (LaTeX). */
  normFormula: string;
  /** Comportement dans L²(0,T ; H¹₀) lorsque la convergence est forte dans L²(0,T ; L²). */
  h1?: { weakOnly: boolean; text: string };
}

const PHI1 = String.raw`$\varphi_1(x)=\sqrt2\,\sin(\pi x)$, de norme $1$ dans $L^2(\Omega)$.`;

export const FAMILY_META: Record<string, FamilyMeta> = {
  'oscillation-espace': {
    name: 'Oscillation en espace',
    spoken: 'u indice n de t et x égale sinus de n pi x',
    spaces: INTERVALLE,
    timeless: false,
    normFormula: String.raw`\|u_n\|^2_{L^2(L^2)}=T\int_0^1\sin^2(n\pi x)\,dx=\frac T2=\pi`,
  },
  'oscillation-temps': {
    name: 'Oscillation en temps',
    spoken: 'u indice n de t et x égale sinus de n t, fois phi 1 de x',
    spaces: INTERVALLE,
    timeless: false,
    defs: PHI1,
    normFormula: String.raw`\|u_n\|^2_{L^2(L^2)}=\int_0^{2\pi}\sin^2(nt)\,dt\cdot\|\varphi_1\|^2_{L^2}=\pi`,
  },
  translation: {
    name: 'Translation sur ℝ',
    spoken: 'u indice n de x égale phi de x moins n, sur la droite réelle',
    spaces: DROITE,
    timeless: true,
    normFormula: String.raw`\|u_n\|^2_{L^2(\mathbb R)}=\int_{-1}^{1}(1-|y|)^2\,dy=\tfrac23`,
  },
  'amortie-espace': {
    name: 'Oscillation en espace, facteur 1/n',
    spoken: 'u indice n de t et x égale sinus de n pi x, divisé par n',
    spaces: INTERVALLE,
    timeless: false,
    normFormula: String.raw`\|u_n\|^2_{L^2(L^2)}=\frac{T}{2n^2}=\frac{\pi}{n^2}`,
    h1: {
      weakOnly: true,
      text: String.raw`$\|u_n\|^2_{L^2(0,T;H^1_0(\Omega))}=\pi^3$ pour tout $n$, alors que $u_n\rightharpoonup 0$ dans cet espace : aucune sous-suite n'y converge fortement. La convergence est forte dans $L^2(0,T;L^2(\Omega))$, **seulement faible** dans $L^2(0,T;H^1_0(\Omega))$.`,
    },
  },
  'amortie-temps': {
    name: 'Oscillation en temps, facteur 1/n',
    spoken: 'u indice n de t et x égale sinus de n t, fois phi 1 de x, divisé par n',
    spaces: INTERVALLE,
    timeless: false,
    defs: PHI1,
    normFormula: String.raw`\|u_n\|^2_{L^2(L^2)}=\frac1{n^2}\int_0^{2\pi}\sin^2(nt)\,dt=\frac{\pi}{n^2}`,
    h1: {
      weakOnly: false,
      text: String.raw`$\|u_n\|^2_{L^2(0,T;H^1_0(\Omega))}=\pi^3/n^2\to 0$ : ici la convergence est forte jusque dans $L^2(0,T;H^1_0(\Omega))$, ce que le théorème n'affirme pas en général.`,
    },
  },
  mixte: {
    name: 'Oscillations croisées, facteur 1/n',
    spoken: 'u indice n de t et x égale sinus de n t, fois sinus de n pi x, divisé par n',
    spaces: INTERVALLE,
    timeless: false,
    normFormula: String.raw`\|u_n\|^2_{L^2(L^2)}=\frac1{n^2}\cdot\pi\cdot\frac12=\frac{\pi}{2n^2}`,
    h1: {
      weakOnly: true,
      text: String.raw`$\|u_n\|^2_{L^2(0,T;H^1_0(\Omega))}=\pi^3/2$ pour tout $n$, alors que $u_n\rightharpoonup 0$ dans cet espace : la convergence y est **seulement faible**.`,
    },
  },
};

export function metaOf(f: CompactnessFamily): FamilyMeta {
  const meta = FAMILY_META[f.id];
  if (!meta) throw new Error(`Famille sans métadonnées : ${f.id}`);
  return meta;
}

export type IngredientId = 'compacite' | 'espace' | 'temps';

export interface Ingredient {
  id: IngredientId;
  title: string;
  /** Énoncé spécialisé à la famille (texte mixte), qui ne préjuge pas de sa vérité. */
  statement: string;
  holds: boolean;
}

/** Les trois ingrédients d'Aubin–Lions, vérité décidée par les données. */
export function ingredientsOf(f: CompactnessFamily): Ingredient[] {
  const { spaces: s, timeless } = metaOf(f);
  return [
    {
      id: 'compacite',
      title: 'Compacité spatiale de l’injection',
      statement: String.raw`L’injection $${s.X0}\hookrightarrow ${s.X}$ est compacte.`,
      holds: f.compactEmbedding,
    },
    {
      id: 'espace',
      title: 'Borne en espace',
      statement: String.raw`$\sup_n\|u_n\|_{${s.bound}}<\infty$`,
      holds: f.spatial.holds,
    },
    {
      id: 'temps',
      title: 'Borne en temps',
      statement: String.raw`$\sup_n\|\partial_t u_n\|_{${s.boundDt}}<\infty$` + (timeless ? ' (la famille ne dépend pas de $t$)' : ''),
      holds: f.temporal.holds,
    },
  ];
}

export const theoremApplies = (f: CompactnessFamily): boolean => f.compactEmbedding && f.spatial.holds && f.temporal.holds;

const scaleCache = new Map<string, number>();

/**
 * max sur 1 ≤ n ≤ N_MAX de max |uₙ| sur une grille de la fenêtre : échelle commune à
 * tous les n, pour qu'un facteur 1/n reste visible au lieu d'être renormalisé.
 */
export function uniformScale(f: CompactnessFamily, grid = 129): number {
  const cached = scaleCache.get(f.id);
  if (cached !== undefined) return cached;
  const [t0, t1] = f.tRange;
  const [x0, x1] = f.xRange;
  let m = 0;
  for (let n = 1; n <= N_MAX; n++) {
    for (let i = 0; i < grid; i++) {
      const t = t0 + ((t1 - t0) * i) / (grid - 1);
      for (let j = 0; j < grid; j++) {
        const v = Math.abs(f.u(n, t, x0 + ((x1 - x0) * j) / (grid - 1)));
        if (v > m) m = v;
      }
    }
  }
  const scale = m > 0 ? m : 1;
  scaleCache.set(f.id, scale);
  return scale;
}

/**
 * Fenêtre d'abscisses de la famille sans temps (translation, support [n−1, n+1]) :
 * `xRange`, décalée juste assez pour contenir le support quand il en sort.
 */
export function displayWindow(f: CompactnessFamily, n: number): { a: number; b: number; shift: number } {
  const [a, b] = f.xRange;
  const shift = Math.max(0, n + 1 - b);
  return { a: a + shift, b: b + shift, shift };
}
