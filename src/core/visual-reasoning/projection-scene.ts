/**
 * Scène « projection sur un convexe fermé », en dimension 2 ou 3.
 * Toutes les projections sont des formules fermées valables sur le domaine indiqué ;
 * l'inégalité caractéristique n'est jamais « démontrée » par la scène : seuls des points
 * z en nombre fini y sont évalués, ce que la lecture signale explicitement.
 */
import * as Q from '@/core/math/rational';
import type { Rational } from '@/core/math/rational';
import { add, cross, dist, dot, lerp, norm, orthogonalUnit, scale, sub, type Vec } from './linalg';
import { fmt, vecTex, type SceneReadout, type HypothesisLine, type ConclusionLine, type Measure, type EquationLine } from './types';

export type ConvexSet =
  /** {z ∈ ℝ² : ⟨n, z⟩ ≤ c}, n ≠ 0 */
  | { kind: 'demi-plan'; n: Vec; c: number }
  /** Disque fermé de ℝ². */
  | { kind: 'disque'; center: Vec; r: number }
  /** Rectangle fermé [lo₁, hi₁] × [lo₂, hi₂]. */
  | { kind: 'rectangle'; lo: Vec; hi: Vec }
  /** Droite vectorielle ℝd de ℝ², d ≠ 0. */
  | { kind: 'sous-espace'; d: Vec }
  /** Boule fermée de ℝ³. */
  | { kind: 'boule'; center: Vec; r: number }
  /** Plan affine {z ∈ ℝ³ : ⟨n, z⟩ = c}, n ≠ 0. */
  | { kind: 'plan'; n: Vec; c: number }
  /** Droite affine a + ℝd de ℝ³, d ≠ 0. */
  | { kind: 'droite-affine'; a: Vec; d: Vec };

export type ConvexKind = ConvexSet['kind'];

export const KIND_DIM: Record<ConvexKind, 2 | 3> = {
  'demi-plan': 2,
  disque: 2,
  rectangle: 2,
  'sous-espace': 2,
  boule: 3,
  plan: 3,
  'droite-affine': 3,
};

export const KIND_LABEL: Record<ConvexKind, string> = {
  'demi-plan': 'Demi-plan fermé',
  disque: 'Disque fermé',
  rectangle: 'Rectangle fermé',
  'sous-espace': 'Sous-espace (droite vectorielle)',
  boule: 'Boule fermée de $\\mathbb R^3$',
  plan: 'Plan de $\\mathbb R^3$',
  'droite-affine': 'Sous-espace affine de $\\mathbb R^3$',
};

/** Le convexe est-il un sous-espace affine ? Alors l'inégalité caractéristique est une égalité. */
export const isAffine = (K: ConvexSet): boolean => K.kind === 'sous-espace' || K.kind === 'plan' || K.kind === 'droite-affine';

/**
 * Projection sur la boule fermée B(a, r) : même formule en toute dimension, et dans tout
 * espace de Hilbert. C'est ce qui rend l'échelle ℝ → ℝ² → ℝ³ → H honnête pour une boule.
 */
export function projectBall(center: Vec, r: number, x: Vec): Vec {
  const v = sub(x, center);
  const d = norm(v);
  return d <= r ? [...x] : add(center, scale(r / d, v));
}

export function project(K: ConvexSet, x: Vec): Vec {
  switch (K.kind) {
    case 'demi-plan': {
      const e = dot(K.n, x) - K.c;
      return e <= 0 ? [...x] : sub(x, scale(e / dot(K.n, K.n), K.n));
    }
    case 'disque':
    case 'boule':
      return projectBall(K.center, K.r, x);
    case 'rectangle':
      return x.map((v, i) => Math.min(K.hi[i]!, Math.max(K.lo[i]!, v)));
    case 'sous-espace':
      return scale(dot(x, K.d) / dot(K.d, K.d), K.d);
    case 'plan':
      return sub(x, scale((dot(K.n, x) - K.c) / dot(K.n, K.n), K.n));
    case 'droite-affine':
      return add(K.a, scale(dot(sub(x, K.a), K.d) / dot(K.d, K.d), K.d));
  }
}

export function contains(K: ConvexSet, z: Vec, eps = 1e-9): boolean {
  switch (K.kind) {
    case 'demi-plan':
      return dot(K.n, z) <= K.c + eps;
    case 'disque':
    case 'boule':
      return dist(z, K.center) <= K.r + eps;
    case 'rectangle':
      return z.every((v, i) => v >= K.lo[i]! - eps && v <= K.hi[i]! + eps);
    default:
      return dist(project(K, z), z) <= eps * Math.max(1, norm(z));
  }
}

/** ⟨x − p, z − p⟩. */
export const characteristic = (x: Vec, p: Vec, z: Vec): number => dot(sub(x, p), sub(z, p));

/** Formule fermée de P_K, en LaTeX, pour la famille. */
export function projectionFormula(K: ConvexSet): string {
  switch (K.kind) {
    case 'demi-plan':
      return String.raw`P_Kx=x-\frac{(\langle n,x\rangle-c)^+}{\|n\|^2}\,n`;
    case 'disque':
    case 'boule':
      return String.raw`P_Kx=\begin{cases}x&\text{si }\|x-a\|\le r\\ a+r\,\dfrac{x-a}{\|x-a\|}&\text{sinon}\end{cases}`;
    case 'rectangle':
      return String.raw`(P_Kx)_i=\min\big(\beta_i,\max(\alpha_i,x_i)\big)`;
    case 'sous-espace':
      return String.raw`P_Kx=\frac{\langle x,d\rangle}{\|d\|^2}\,d`;
    case 'plan':
      return String.raw`P_Kx=x-\frac{\langle n,x\rangle-c}{\|n\|^2}\,n`;
    case 'droite-affine':
      return String.raw`P_Kx=a+\frac{\langle x-a,d\rangle}{\|d\|^2}\,d`;
  }
}

export interface ProjectionState {
  K: ConvexSet;
  x: Vec;
  /** Points de comparaison, ramenés dans K s'ils en sortent. */
  zs: Vec[];
}

/** Clés de déverrouillage produites par la preuve guidée de la famille (moteur de preuve). */
export interface ProofKeys {
  has(key: string): boolean;
}

/** Les clés de preuve sont propres à chaque famille : démontrer pour le demi-plan ne dit rien du disque. */
export const familyKey = (kind: ConvexKind, key: string): string => `${kind}:${key}`;

export interface ProjectionDerived {
  p: Vec;
  zs: Vec[];
  distance: number;
  inner: number[];
  inside: boolean;
}

export function deriveProjection(s: ProjectionState): ProjectionDerived {
  const p = project(s.K, s.x);
  const zs = s.zs.map((z) => (contains(s.K, z) ? z : project(s.K, z)));
  return { p, zs, distance: dist(s.x, p), inner: zs.map((z) => characteristic(s.x, p, z)), inside: contains(s.K, s.x) };
}

/** Lecture complète : la source unique des vues figure, équations, hypothèses, démonstration. */
export function projectionReadout(s: ProjectionState, keys: ProofKeys): SceneReadout & { derived: ProjectionDerived } {
  const d = deriveProjection(s);
  const k = s.K.kind;
  const proven = (key: string) => keys.has(familyKey(k, key));
  const affine = isAffine(s.K);

  const measures: Measure[] = [
    { id: 'p', label: String.raw`$P_Kx$`, value: `$${vecTex(d.p)}$`, status: 'exact', method: 'Formule fermée évaluée en virgule flottante.' },
    { id: 'dist', label: String.raw`$\|x-P_Kx\|$`, value: fmt(d.distance), numeric: d.distance, status: 'exact' },
    ...d.zs.flatMap((z, i) => [
      { id: `dz${i}`, label: String.raw`$\|x-z_${i + 1}\|$`, value: fmt(dist(s.x, z)), numeric: dist(s.x, z), status: 'exact' as const },
      {
        id: `ip${i}`,
        label: String.raw`$\langle x-P_Kx,\,z_${i + 1}-P_Kx\rangle$`,
        value: fmt(d.inner[i]!),
        numeric: d.inner[i]!,
        status: 'exact' as const,
      },
    ]),
  ];

  const equations: EquationLine[] = [
    { id: 'formule', tex: `$$${projectionFormula(s.K)}$$`, status: 'exact', note: 'Formule fermée, valable pour tout x de l’espace ambiant.' },
    { id: 'valeur', tex: String.raw`Pour $x=${vecTex(s.x)}$ : $P_Kx=${vecTex(d.p)}$, $\|x-P_Kx\|=${fmt(d.distance)}$.`, status: 'exact' },
    affine
      ? {
          id: 'carac',
          tex: String.raw`$K$ est un sous-espace affine : $\langle x-P_Kx,\,z-P_Kx\rangle=0$ pour tout $z\in K$.`,
          status: 'exact',
          note: String.raw`Égalité : $z-P_Kx$ et son opposé sont deux vecteurs directeurs de $K$.`,
        }
      : {
          id: 'carac',
          tex: String.raw`$\langle x-P_Kx,\,z-P_Kx\rangle\le 0$ pour tout $z\in K$.`,
          status: proven('inegalite-caracteristique') ? 'exact' : 'illustratif',
          note: proven('inegalite-caracteristique')
            ? 'Démontrée dans la preuve guidée.'
            : `Évaluée ici en ${d.zs.length} point${d.zs.length > 1 ? 's' : ''} seulement : cela ne démontre pas le « pour tout ».`,
        },
  ];

  const hyp = (id: string, label: string, key: string): HypothesisLine => ({
    id,
    label,
    state: proven(key) ? 'demontree' : 'satisfaite',
    detail: proven(key) ? 'Établie dans la preuve guidée de cette famille.' : 'Vraie pour cet ensemble, par sa définition ; pas encore démontrée par toi.',
  });
  const hypotheses: HypothesisLine[] = [
    { id: 'hilbert', label: String.raw`$\mathbb R^${KIND_DIM[k]}$ euclidien est un espace de Hilbert`, state: 'satisfaite' },
    hyp('nonvide', String.raw`$K\neq\emptyset$`, 'K-nonvide'),
    hyp('ferme', String.raw`$K$ fermé`, 'K-ferme'),
    hyp('convexe', String.raw`$K$ convexe`, 'K-convexe'),
  ];

  const establishedPoint = proven('projection-point');
  const conclusions: ConclusionLine[] = [
    {
      id: 'existence',
      label: String.raw`Existence et unicité de $P_Kx$`,
      state: establishedPoint ? 'etablie' : 'illustrative',
      detail: establishedPoint ? 'Le théorème a été invoqué après avoir établi ses hypothèses.' : 'Le point est calculé, mais le théorème n’a pas encore été invoqué.',
    },
    {
      id: 'carac',
      label: affine ? String.raw`Orthogonalité $x-P_Kx\perp K-P_Kx$` : 'Inégalité caractéristique',
      state: proven('inegalite-caracteristique') ? 'etablie' : 'illustrative',
      detail: proven('inegalite-caracteristique') ? undefined : 'Vérifiée numériquement en quelques points : ce n’est pas une démonstration.',
    },
  ];

  return { measures, equations, hypotheses, conclusions, derived: d };
}

// ───────────── Démonstration animée : objets géométriques de chaque étape ─────────────

/**
 * Suite minimisante explicite pour une boule ou un disque, x hors de K :
 * p_n = a + r(1 − 1/(n+1))·R(θ_n)u, avec u = (x−a)/‖x−a‖ et θ_n = (−1)ⁿ/(n+1).
 * Elle reste dans K, ‖x − p_n‖ → d = ‖x − a‖ − r, et elle oscille de part et d'autre de P_Kx.
 */
export function minimizingSequence(center: Vec, r: number, x: Vec, count: number): Vec[] {
  const v = sub(x, center);
  const len = norm(v);
  if (len <= r) return Array.from({ length: count }, () => [...x]);
  const u = scale(1 / len, v);
  // Une direction unitaire orthogonale à u, dans le plan de la figure.
  const w = orthogonalUnit(u);
  return Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    const theta = (n % 2 === 0 ? 1 : -1) / (n + 1);
    const rho = r * (1 - 1 / (n + 1));
    return add(center, add(scale(rho * Math.cos(theta), u), scale(rho * Math.sin(theta), w)));
  });
}

/** Identité du parallélogramme, membre de droite : 2‖x−p_n‖² + 2‖x−p_m‖² − 4‖x−(p_n+p_m)/2‖². */
export function parallelogramGap(x: Vec, pn: Vec, pm: Vec): { lhs: number; rhs: number; boundWithD: (d: number) => number } {
  const mid = scale(0.5, add(pn, pm));
  const lhs = dist(pn, pm) ** 2;
  const rhs = 2 * dist(x, pn) ** 2 + 2 * dist(x, pm) ** 2 - 4 * dist(x, mid) ** 2;
  return { lhs, rhs, boundWithD: (d) => 2 * dist(x, pn) ** 2 + 2 * dist(x, pm) ** 2 - 4 * d * d };
}

// ───────────── Comparaisons « avec / sans hypothèse » ─────────────

export interface Comparison {
  id: string;
  title: string;
  hypothesis: string;
  withSet: ConvexSet;
  /** Ensemble sans l'hypothèse, décrit analytiquement. */
  without: { kind: 'disque-ouvert' | 'cercle' | 'boule-ouverte' | 'sphere'; center: Vec; r: number };
  /** Conclusion sans l'hypothèse, au point x donné. */
  verdict: (x: Vec) => { attained: boolean; unique: boolean; infimum: number; minimizers: Vec[]; text: string };
}

function sphereVerdict(center: Vec, r: number, open: boolean) {
  return (x: Vec) => {
    const v = sub(x, center);
    const d = norm(v);
    if (open) {
      if (d < r) return { attained: true, unique: true, infimum: 0, minimizers: [x], text: 'x est dans l’ensemble : il est son propre point le plus proche.' };
      return {
        attained: false,
        unique: false,
        infimum: d - r,
        minimizers: [],
        text: `L’infimum ${fmt(d - r)} n’est atteint en aucun point : pour z dans l’ensemble, ‖x − z‖ ≥ ‖x − a‖ − ‖z − a‖ > ‖x − a‖ − r.`,
      };
    }
    if (d < 1e-6) return { attained: true, unique: false, infimum: r, minimizers: [], text: 'Au centre, tous les points de la sphère sont à distance r : l’unicité est perdue.' };
    return { attained: true, unique: true, infimum: Math.abs(d - r), minimizers: [add(center, scale(r / d, v))], text: 'Hors du centre, le point le plus proche existe et est unique : un cas particulier, non une garantie.' };
  };
}

export function comparisons(dim: 2 | 3): Comparison[] {
  const c = dim === 2 ? [0, 0] : [0, 0, 0];
  const ball: ConvexSet = dim === 2 ? { kind: 'disque', center: c, r: 2 } : { kind: 'boule', center: c, r: 2 };
  return [
    {
      id: 'fermeture',
      title: 'Fermeture',
      hypothesis: String.raw`$K$ fermé`,
      withSet: ball,
      without: { kind: dim === 2 ? 'disque-ouvert' : 'boule-ouverte', center: c, r: 2 },
      verdict: sphereVerdict(c, 2, true),
    },
    {
      id: 'convexite',
      title: 'Convexité',
      hypothesis: String.raw`$K$ convexe`,
      withSet: ball,
      without: { kind: dim === 2 ? 'cercle' : 'sphere', center: c, r: 2 },
      verdict: sphereVerdict(c, 2, false),
    },
  ];
}

// ───────────── Paramètres des familles et des points de K ─────────────

export interface ParamSpec {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
}

const FAMILY_PARAMS: Record<ConvexKind, { specs: ParamSpec[]; defaults: number[] }> = {
  'demi-plan': {
    specs: [
      { id: 'theta', label: 'Orientation de la normale', min: 0, max: 6.28, step: 0.01 },
      { id: 'c', label: 'Niveau c', min: -3, max: 3, step: 0.05 },
    ],
    defaults: [0, 1],
  },
  rectangle: {
    specs: [
      { id: 'w', label: 'Demi-largeur', min: 0.2, max: 4.5, step: 0.05 },
      { id: 'h', label: 'Demi-hauteur', min: 0.2, max: 3.5, step: 0.05 },
    ],
    defaults: [2.2, 1.4],
  },
  disque: { specs: [{ id: 'r', label: 'Rayon', min: 0.3, max: 3.8, step: 0.05 }], defaults: [2] },
  'sous-espace': { specs: [{ id: 'angle', label: 'Direction', min: 0, max: 3.14, step: 0.01 }], defaults: [0.5] },
  boule: { specs: [{ id: 'r', label: 'Rayon', min: 0.5, max: 3, step: 0.05 }], defaults: [1.8] },
  plan: {
    specs: [
      { id: 'lon', label: 'Longitude de la normale n', min: 0, max: 6.28, step: 0.01 },
      { id: 'col', label: 'Colatitude de la normale n', min: 0, max: 3.14, step: 0.01 },
      { id: 'c', label: 'Niveau c', min: -2, max: 2, step: 0.05 },
    ],
    defaults: [0.6, 0.5, 0.5],
  },
  'droite-affine': {
    specs: [
      { id: 'lon', label: 'Longitude de la direction d', min: 0, max: 6.28, step: 0.01 },
      { id: 'col', label: 'Colatitude de la direction d', min: 0, max: 3.14, step: 0.01 },
      { id: 'h', label: 'Point a = (0, 0, h)', min: -2, max: 2, step: 0.05 },
    ],
    defaults: [0.4, 1.2, 0.5],
  },
};

export const familyParams = (kind: ConvexKind): ParamSpec[] => FAMILY_PARAMS[kind].specs;
export const defaultFamilyParams = (kind: ConvexKind): number[] => [...FAMILY_PARAMS[kind].defaults];

const sphereDir = (lon: number, col: number): Vec => [Math.sin(col) * Math.cos(lon), Math.sin(col) * Math.sin(lon), Math.cos(col)];

/** Construit le convexe d'une famille à partir de ses paramètres (n et d sont unitaires). */
export function buildConvex(kind: ConvexKind, q: readonly number[]): ConvexSet {
  const v = (i: number) => q[i] ?? FAMILY_PARAMS[kind].defaults[i]!;
  switch (kind) {
    case 'demi-plan':
      return { kind, n: [Math.cos(v(0)), Math.sin(v(0))], c: v(1) };
    case 'rectangle':
      return { kind, lo: [-v(0), -v(1)], hi: [v(0), v(1)] };
    case 'disque':
      return { kind, center: [0, 0], r: v(0) };
    case 'sous-espace':
      return { kind, d: [Math.cos(v(0)), Math.sin(v(0))] };
    case 'boule':
      return { kind, center: [0, 0, 0], r: v(0) };
    case 'plan':
      return { kind, n: sphereDir(v(0), v(1)), c: v(2) };
    case 'droite-affine':
      return { kind, a: [0, 0, v(2)], d: sphereDir(v(0), v(1)) };
  }
}

/** Coordonnées intrinsèques d'un point de K (familles de ℝ³) : le point appartient à K par construction. */
export function pointParams(kind: ConvexKind): ParamSpec[] {
  switch (kind) {
    case 'boule':
      return [
        { id: 'rho', label: 'Rayon relatif ρ', min: 0, max: 1, step: 0.01 },
        { id: 'lon', label: 'Longitude', min: 0, max: 6.28, step: 0.01 },
        { id: 'col', label: 'Colatitude', min: 0, max: 3.14, step: 0.01 },
      ];
    case 'plan':
      return [
        { id: 's', label: 'Coordonnée s dans K', min: -3, max: 3, step: 0.05 },
        { id: 't', label: 'Coordonnée t dans K', min: -3, max: 3, step: 0.05 },
      ];
    case 'droite-affine':
      return [{ id: 'tau', label: 'Paramètre τ, z = a + τd', min: -3, max: 3, step: 0.05 }];
    default:
      return [];
  }
}

export function defaultPointParams(kind: ConvexKind): number[][] {
  switch (kind) {
    case 'boule':
      return [
        [0.7, 3.6, 1.1],
        [0.9, 5.2, 2.2],
        [0.4, 1.4, 0.6],
      ];
    case 'plan':
      return [
        [-1.6, 1.2],
        [1.8, -1.4],
        [0.4, 2.2],
      ];
    case 'droite-affine':
      return [[-1.6], [2.1], [0.7]];
    default:
      return [];
  }
}

export function pointFromParams(K: ConvexSet, q: readonly number[]): Vec {
  switch (K.kind) {
    case 'boule':
      return add(K.center, scale((q[0] ?? 0) * K.r, sphereDir(q[1] ?? 0, q[2] ?? 0)));
    case 'plan': {
      const nn = norm(K.n);
      const u = scale(1 / nn, K.n);
      const b1 = orthogonalUnit(u);
      const b2 = cross(u, b1);
      return add(scale(K.c / (nn * nn), K.n), add(scale(q[0] ?? 0, b1), scale(q[1] ?? 0, b2)));
    }
    case 'droite-affine':
      return add(K.a, scale(q[0] ?? 0, K.d));
    default:
      throw new Error('Paramétrage intrinsèque réservé aux familles de ℝ³.');
  }
}

// ───────────── Visibilité pilotée par la preuve ─────────────

export interface ProjectionVisibility {
  /** Fermeture démontrée : bord tracé en trait plein. */
  closed: boolean;
  /** Théorème invoqué : le projeté s'affiche. */
  point: boolean;
  /** Inégalité caractéristique démontrée : les vecteurs s'affichent. */
  vectors: boolean;
}

/**
 * Ce que la scène peut montrer : uniquement ce que la preuve guidée de la famille a établi,
 * sauf en exploration libre déclarée (et alors rien n'est présenté comme établi).
 */
export function projectionVisibility(kind: ConvexKind, keys: ProofKeys, free: boolean): ProjectionVisibility {
  const has = (k: string) => free || keys.has(familyKey(kind, k));
  return { closed: has('K-ferme'), point: has('projection-point'), vectors: has('inegalite-caracteristique') };
}

/** Sans le théorème, aucune mesure qui dépend de P_Kx ; sans l'inégalité, aucun produit scalaire. */
export function visibleMeasures(measures: Measure[], vis: ProjectionVisibility): Measure[] {
  return measures.filter((m) => (m.id.startsWith('dz') ? true : m.id.startsWith('ip') ? vis.point && vis.vectors : vis.point));
}

export function visibleEquations(equations: EquationLine[], vis: ProjectionVisibility): EquationLine[] {
  return equations.filter((e) => e.id !== 'valeur' || vis.point);
}

// ───────────── Coupe plane (familles de ℝ³) ─────────────

export interface PlaneFrame {
  origin: Vec;
  e1: Vec;
  e2: Vec;
}

/**
 * Repère orthonormé du plan affine passant par p et contenant x et z : e₂ suit x − p
 * (vers le haut), e₁ la composante de z − p orthogonale à e₂. Dans ce repère, l'inégalité
 * caractéristique dit exactement que z est dans le demi-plan inférieur.
 */
export function sectionFrame(x: Vec, p: Vec, z: Vec): PlaneFrame {
  const eps = 1e-9;
  const vx = sub(x, p);
  const vz = sub(z, p);
  const nx = norm(vx);
  const nz = norm(vz);
  const e2 = nx > eps ? scale(1 / nx, vx) : nz > eps ? scale(1 / nz, vz) : x.length === 3 ? [0, 0, 1] : [0, 1];
  const w = sub(vz, scale(dot(vz, e2), e2));
  const nw = norm(w);
  const e1 = nw > eps ? scale(1 / nw, w) : orthogonalUnit(e2);
  return { origin: [...p], e1, e2 };
}

/**
 * Plan passant par le centre c et par x (e₂ selon x − c). Pour un ensemble invariant
 * par les rotations de centre c (boule, boule ouverte, sphère), cette coupe est fidèle.
 */
export function radialFrame(center: Vec, x: Vec): PlaneFrame {
  const v = sub(x, center);
  const l = norm(v);
  const e2 = l > 1e-9 ? scale(1 / l, v) : center.length === 3 ? [0, 0, 1] : [0, 1];
  return { origin: [...center], e1: orthogonalUnit(e2), e2 };
}

export const toPlane = (f: PlaneFrame, y: Vec): [number, number] => {
  const v = sub(y, f.origin);
  return [dot(v, f.e1), dot(v, f.e2)];
};

export const fromPlane = (f: PlaneFrame, st: readonly number[]): Vec => add(f.origin, add(scale(st[0]!, f.e1), scale(st[1]!, f.e2)));

export type SectionShape =
  | { kind: 'disque'; center: [number, number]; r: number }
  | { kind: 'droite'; point: [number, number]; dir: [number, number] }
  | { kind: 'point'; at: [number, number] }
  | { kind: 'tout' }
  | { kind: 'vide' };

/** Intersection exacte de K (famille de ℝ³) avec le plan du repère, en coordonnées du plan. */
export function sectionOf(K: ConvexSet, f: PlaneFrame): SectionShape {
  const tol = 1e-9;
  switch (K.kind) {
    case 'boule': {
      const c2 = toPlane(f, K.center);
      const h = dist(K.center, fromPlane(f, c2));
      if (h > K.r + tol) return { kind: 'vide' };
      return { kind: 'disque', center: c2, r: Math.sqrt(Math.max(0, K.r * K.r - h * h)) };
    }
    case 'plan': {
      const a = dot(K.n, f.e1);
      const b = dot(K.n, f.e2);
      const v0 = dot(K.n, f.origin) - K.c;
      const nn = a * a + b * b;
      if (nn < tol * dot(K.n, K.n)) return Math.abs(v0) < tol ? { kind: 'tout' } : { kind: 'vide' };
      const s = Math.sqrt(nn);
      return { kind: 'droite', point: [(-v0 * a) / nn, (-v0 * b) / nn], dir: [-b / s, a / s] };
    }
    case 'droite-affine': {
      const nu = cross(f.e1, f.e2);
      const dn = dot(K.d, nu);
      if (Math.abs(dn) > 1e-7 * norm(K.d)) {
        const tau = -dot(sub(K.a, f.origin), nu) / dn;
        return { kind: 'point', at: toPlane(f, add(K.a, scale(tau, K.d))) };
      }
      if (Math.abs(dot(sub(K.a, f.origin), nu)) > 1e-7) return { kind: 'vide' };
      const d2: [number, number] = [dot(K.d, f.e1), dot(K.d, f.e2)];
      const l = Math.hypot(d2[0], d2[1]);
      return { kind: 'droite', point: toPlane(f, K.a), dir: [d2[0] / l, d2[1] / l] };
    }
    default:
      return { kind: 'tout' };
  }
}

// ───────────── Données de la démonstration animée ─────────────

export interface TheoremAnimation {
  /** x ∈ K : la distance est nulle et P_Kx = x. */
  inside: boolean;
  d: number;
  p: Vec;
  /** Suite minimisante pₙ = (1 − tₙ)P_Kx + tₙ z, tₙ = 1/(n+1) : dans K par convexité. */
  sequence: Vec[];
  distances: number[];
  /** Estimation de Cauchy : ‖pₙ − pₘ‖² ≤ 2‖x − pₙ‖² + 2‖x − pₘ‖² − 4d². */
  pairs: { n: number; m: number; mid: Vec; gap: number; bound: number }[];
  convex: { u: Vec; v: Vec; mid: Vec };
  closure: { seq: Vec[]; limit: Vec };
  /** Second minimiseur hypothétique q (‖x − q‖ = d) et milieu m, strictement plus proche. */
  ghost: { q: Vec; m: Vec; distM: number } | null;
  zs: Vec[];
  inner: number[];
  frame: PlaneFrame;
}

/**
 * Tous les objets restent dans le plan de `frame` si l'on ne fournit qu'un point z : le
 * second point utilisé est alors le symétrique de z par rapport à la droite (P_Kx, x),
 * pris seulement s'il appartient à K (c'est le cas pour toutes les familles symétriques
 * par rapport à cette droite), sinon P_Kx lui-même.
 */
export function theoremAnimation(K: ConvexSet, x: Vec, zs: Vec[], count = 8): TheoremAnimation {
  const p = project(K, x);
  const d = dist(x, p);
  const zIn = zs.map((z) => (contains(K, z) ? z : project(K, z)));
  const z0 = zIn[0] ?? p;
  const frame0 = sectionFrame(x, p, z0);
  const mirror = (() => {
    const [s, t] = toPlane(frame0, z0);
    return fromPlane(frame0, [-s, t]);
  })();
  const z1 = zIn[1] ?? (contains(K, mirror, 1e-7) ? mirror : p);
  const sequence = Array.from({ length: count }, (_, i) => lerp(p, (i + 1) % 2 === 1 ? z0 : z1, 1 / (i + 2)));
  const distances = sequence.map((q) => dist(x, q));
  const pairs = (
    [
      [1, 2],
      [2, 4],
      [3, 6],
      [5, 8],
    ] as const
  )
    .filter(([, m]) => m <= count)
    .map(([n, m]) => {
      const pn = sequence[n - 1]!;
      const pm = sequence[m - 1]!;
      return { n, m, mid: lerp(pn, pm, 0.5), gap: dist(pn, pm) ** 2, bound: 2 * dist(x, pn) ** 2 + 2 * dist(x, pm) ** 2 - 4 * d * d };
    });
  const frame = frame0;
  let ghost: TheoremAnimation['ghost'] = null;
  if (d > 1e-9) {
    // Corde ‖p − q‖ = 2d sin(φ/2) limitée à min(0,9 d ; 2,4) : q reste près de la figure.
    const phi = 2 * Math.asin(Math.min(0.45, 1.2 / d));
    const q = add(x, scale(d, add(scale(-Math.cos(phi), frame.e2), scale(Math.sin(phi), frame.e1))));
    const m = lerp(p, q, 0.5);
    ghost = { q, m, distM: dist(x, m) };
  }
  return {
    inside: d <= 1e-9,
    d,
    p,
    sequence,
    distances,
    pairs,
    convex: { u: z0, v: z1, mid: lerp(z0, z1, 0.5) },
    closure: { seq: Array.from({ length: count }, (_, i) => lerp(p, z1, 1 / (i + 2))), limit: p },
    ghost,
    zs: zIn,
    inner: zIn.map((z) => characteristic(x, p, z)),
    frame,
  };
}

// ───────────── De ℝ à H : la même boule en dimension croissante ─────────────

export interface LadderStep {
  dim: 1 | 2 | 3;
  x: Vec;
  p: Vec;
  distance: number;
}

export const LADDER_RADIUS = 2;

/** Boule fermée B(0, 2) de ℝ, ℝ², ℝ³ : P_Kx = 2x/‖x‖ hors de la boule, la même formule partout. */
export function ballLadder(): LadderStep[] {
  const xs: Vec[] = [[3.2], [3.2, 1.6], [3.2, 1.6, 1.2]];
  return xs.map((x) => {
    const p = projectBall(x.map(() => 0), LADDER_RADIUS, x);
    return { dim: x.length as 1 | 2 | 3, x, p, distance: dist(x, p) };
  });
}

// ───────────── Versions rationnelles exactes (tests) ─────────────

export type QVec = Rational[];
const qdot = (a: QVec, b: QVec): Rational => a.reduce((s, v, i) => Q.add(s, Q.mul(v, b[i]!)), Q.ZERO);
const qsub = (a: QVec, b: QVec): QVec => a.map((v, i) => Q.sub(v, b[i]!));

/** Projection exacte sur le plan {⟨n, z⟩ = c} de ℝ³. */
export function projectPlaneExact(n: QVec, c: Rational, x: QVec): QVec {
  const t = Q.div(Q.sub(qdot(n, x), c), qdot(n, n));
  return x.map((v, i) => Q.sub(v, Q.mul(t, n[i]!)));
}

/** Projection exacte sur la droite affine a + ℝd. */
export function projectLineExact(a: QVec, d: QVec, x: QVec): QVec {
  const t = Q.div(qdot(qsub(x, a), d), qdot(d, d));
  return a.map((v, i) => Q.add(v, Q.mul(t, d[i]!)));
}

export const qCharacteristic = (x: QVec, p: QVec, z: QVec): Rational => qdot(qsub(x, p), qsub(z, p));
