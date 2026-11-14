/**
 * Scène « Riesz et Lax–Milgram » en dimension 2 ou 3.
 *
 * Produit scalaire ⟨x, y⟩_G = xᵀGy (G symétrique définie positive), forme linéaire
 * ℓ(x) = cᵀx, forme bilinéaire a(x, y) = xᵀAy. Les hypothèses sont décidées exactement
 * (arithmétique rationnelle, critère de Sylvester) ; les constantes optimales α et M sont
 * des valeurs numériques (valeurs propres), signalées comme telles.
 */
import * as Q from '@/core/math/rational';
import { isCoercive, isPositiveDefinite, solve, type Matrix } from '@/core/math/matrix';
import { cholesky, dot, inverse, matMul, matVec, norm, orthogonalUnit, scale, symEigenvalues, symPart, transpose, type Mat, type Vec } from './linalg';
import { fmt, vecTex, type ConclusionLine, type EquationLine, type HypothesisLine, type Measure, type SceneReadout } from './types';

/** Écriture décimale exacte d'un réglage (pas de 0,05 ou 0,25) en rationnel. */
export const exactQ = (v: number): Q.Rational => Q.parseRational(String(Math.round(v * 1e6) / 1e6)) ?? Q.ZERO;
export const toQMatrix = (m: Mat): Matrix => m.map((r) => r.map(exactQ));
export const toQVector = (v: Vec): Q.Rational[] => v.map(exactQ);

export interface RieszState {
  g: Mat;
  a: Mat;
  c: Vec;
  /** Vecteur de test v (mesures ℓ(v), ⟨v, w⟩_G, a(u, v)). */
  v: Vec;
}

export interface RieszExact {
  /** G symétrique définie positive (Sylvester, exact). */
  spd: boolean;
  /** Mineurs principaux dominants de G, exacts. */
  minors: Q.Rational[];
  /** Partie symétrique de A définie positive : a coercive (exact). */
  coercive: boolean;
  /** A symétrique (exact). */
  symmetric: boolean;
  /** Vecteur de Riesz w = G⁻¹c, exact (null si G singulière). */
  w: Q.Rational[] | null;
  /** Solution de Aᵀu = c, exacte (null si A est singulière). */
  u: Q.Rational[] | null;
  /** det A, exact. */
  detA: Q.Rational;
}

function detQ(m: Matrix): Q.Rational {
  if (m.length === 1) return m[0]![0]!;
  if (m.length === 2) return Q.sub(Q.mul(m[0]![0]!, m[1]![1]!), Q.mul(m[0]![1]!, m[1]![0]!));
  let s = Q.ZERO;
  for (let j = 0; j < m.length; j++) {
    const minor = m.slice(1).map((r) => r.filter((_, k) => k !== j));
    const term = Q.mul(m[0]![j]!, detQ(minor));
    s = j % 2 === 0 ? Q.add(s, term) : Q.sub(s, term);
  }
  return s;
}

export const leadingMinors = (m: Matrix): Q.Rational[] => m.map((_, k) => detQ(m.slice(0, k + 1).map((r) => r.slice(0, k + 1))));

export function rieszExact(s: RieszState): RieszExact {
  const g = toQMatrix(s.g);
  const a = toQMatrix(s.a);
  const c = toQVector(s.c);
  const at = a[0]!.map((_, j) => a.map((r) => r[j]!));
  return {
    spd: isPositiveDefinite(g),
    minors: leadingMinors(g),
    coercive: isCoercive(a),
    symmetric: a.every((r, i) => r.every((x, j) => Q.eq(x, a[j]![i]!))),
    w: solve(g, c),
    u: solve(at, c),
    detA: detQ(a),
  };
}

export interface RieszDerived {
  w: Vec | null;
  u: Vec | null;
  /** ‖ℓ‖_{G'} = ‖w‖_G = √(cᵀG⁻¹c). */
  dualNorm: number;
  /** Plus grande constante α (numérique) ; ≤ 0 si a n'est pas coercive. */
  alpha: number;
  /** Plus petite constante de continuité M (numérique). */
  M: number;
  /** Point de tangence de l'hyperplan {ℓ = ‖ℓ‖} avec la boule unité de G : w/‖w‖_G. */
  tangency: Vec | null;
}

export const innerG = (g: Mat, x: Vec, y: Vec): number => dot(x, matVec(g, y));
export const normG = (g: Mat, x: Vec): number => Math.sqrt(Math.max(0, innerG(g, x, x)));

/** Plus petite α telle que xᵀAx ≥ α xᵀGx : plus petite valeur propre de L⁻¹ S L⁻ᵀ. */
export function alphaOptimal(a: Mat, g: Mat): number {
  const l = cholesky(g);
  if (!l) return Number.NaN;
  const li = inverse(l)!;
  return symEigenvalues(symPart(matMul(matMul(li, symPart(a)), transpose(li))))[0]!;
}

/** Plus petite M telle que |xᵀAy| ≤ M‖x‖_G‖y‖_G : plus grande valeur singulière de L⁻¹AL⁻ᵀ. */
export function continuityOptimal(a: Mat, g: Mat): number {
  const l = cholesky(g);
  if (!l) return Number.NaN;
  const li = inverse(l)!;
  const b = matMul(matMul(li, a), transpose(li));
  const ev = symEigenvalues(symPart(matMul(transpose(b), b)));
  return Math.sqrt(Math.max(0, ev[ev.length - 1]!));
}

export function deriveRiesz(s: RieszState, ex: RieszExact = rieszExact(s)): RieszDerived {
  const w = ex.spd && ex.w ? ex.w.map(Q.toNumber) : null;
  const u = ex.u ? ex.u.map(Q.toNumber) : null;
  const dualNorm = w ? Math.sqrt(Math.max(0, dot(s.c, w))) : Number.NaN;
  return {
    w,
    u,
    dualNorm,
    alpha: ex.spd ? alphaOptimal(s.a, s.g) : Number.NaN,
    M: ex.spd ? continuityOptimal(s.a, s.g) : Number.NaN,
    tangency: w && dualNorm > 0 ? scale(1 / dualNorm, w) : null,
  };
}

// ───────────── Géométrie ─────────────

/** Ellipse unité {x ∈ ℝ² : xᵀGx = 1}, échantillonnée (formule polaire exacte). */
export function unitEllipse(g: Mat, samples = 240): Vec[] {
  return Array.from({ length: samples + 1 }, (_, i) => {
    const t = (i / samples) * 2 * Math.PI;
    const d = [Math.cos(t), Math.sin(t)];
    return scale(1 / Math.sqrt(innerG(g, d, d)), d);
  });
}

/**
 * Matrice M telle que {Mu : |u| = 1} soit l'ellipsoïde {xᵀGx = 1} : M = L⁻ᵀ où G = LLᵀ.
 * En effet (L⁻ᵀu)ᵀ G (L⁻ᵀu) = uᵀL⁻¹LLᵀL⁻ᵀu = |u|².
 */
export function unitBallMatrix(g: Mat): Mat | null {
  const l = cholesky(g);
  if (!l) return null;
  return transpose(inverse(l)!);
}

/** Droite {x ∈ ℝ² : cᵀx = k} : un point et une direction unitaire. */
export function levelLine(c: Vec, k: number): { point: Vec; dir: Vec } | null {
  const cc = dot(c, c);
  if (cc < 1e-14) return null;
  const n = Math.sqrt(cc);
  return { point: scale(k / cc, c), dir: [-c[1]! / n, c[0]! / n] };
}

/**
 * Courbe de niveau {x ∈ ℝ² : xᵀAx = k} de la forme quadratique (seule la partie symétrique
 * compte). En polaire, r² q(θ) = k avec q(θ) = dᵀSd : r = √(k/q(θ)) là où k/q(θ) > 0.
 * Renvoie des arcs (ellipse, branches d'hyperbole, ou paires de droites selon S).
 */
export function quadraticLevel(a: Mat, k: number, rMax = 8, samples = 720): Vec[][] {
  const s = symPart(a);
  const arcs: Vec[][] = [];
  let cur: Vec[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = (i / samples) * 2 * Math.PI;
    const d = [Math.cos(t), Math.sin(t)];
    const q = innerG(s, d, d);
    const r2 = q !== 0 ? k / q : Number.POSITIVE_INFINITY;
    if (r2 > 0 && r2 <= rMax * rMax) cur.push(scale(Math.sqrt(r2), d));
    else if (cur.length) {
      arcs.push(cur);
      cur = [];
    }
  }
  if (cur.length) arcs.push(cur);
  return arcs.filter((arc) => arc.length > 1);
}

/** Nature de la forme quadratique x ↦ a(x, x), d'après les valeurs propres de (A + Aᵀ)/2. */
export function quadraticNature(a: Mat): 'definie-positive' | 'definie-negative' | 'indefinie' | 'degeneree' {
  const ev = symEigenvalues(symPart(a));
  const tol = 1e-12;
  if (ev.some((v) => Math.abs(v) < tol)) return 'degeneree';
  if (ev.every((v) => v > 0)) return 'definie-positive';
  if (ev.every((v) => v < 0)) return 'definie-negative';
  return 'indefinie';
}

/** Factorisation G = LLᵀ et interpolation Mₜ = (1 − t)I + tLᵀ : x ↦ Lᵀx envoie la boule de G sur la boule euclidienne. */
export function choleskyMorph(g: Mat, t: number): Mat | null {
  const l = cholesky(g);
  if (!l) return null;
  const lt = transpose(l);
  return lt.map((row, i) => row.map((v, j) => (1 - t) * (i === j ? 1 : 0) + t * v));
}

/**
 * Coupe d'une scène de ℝ³ par le plan vectoriel engendré par w et une direction
 * euclidienne orthogonale : G₂ = BᵀGB, c₂ = Bᵀc, w₂ = Bᵀw. Comme w appartient au plan,
 * w₂ est exactement le vecteur de Riesz de la restriction de ℓ pour G₂ (G₂w₂ = Bᵀ G w = c₂),
 * et la tangence en w/‖w‖_G se voit fidèlement dans la coupe.
 */
export function rieszSection(g: Mat, c: Vec, w: Vec): { g2: Mat; c2: Vec; w2: Vec; basis: [Vec, Vec] } | null {
  const nw = norm(w);
  if (nw < 1e-12) return null;
  const b1 = scale(1 / nw, w);
  const b2 = orthogonalUnit(b1);
  const B = [b1, b2];
  const g2 = B.map((bi) => B.map((bj) => dot(bi, matVec(g, bj))));
  return { g2, c2: B.map((b) => dot(b, c)), w2: [nw, 0], basis: [b1, b2] };
}

// ───────────── Lecture : source unique des vues ─────────────

/** Ce que le joueur a établi dans le panneau des hypothèses (vérifications exactes). */
export interface RieszProgress {
  g: boolean;
  l: boolean;
  m: boolean;
  alpha: boolean;
}

const qText = (r: Q.Rational) => Q.toString(r).replace(/^(-?\d+)\/(\d+)$/, String.raw`\tfrac{$1}{$2}`);
const qVecTex = (v: Q.Rational[]) => `(${v.map(qText).join(',\\ ')})`;

export function rieszReadout(s: RieszState, done: RieszProgress): SceneReadout & { exact: RieszExact; derived: RieszDerived } {
  const ex = rieszExact(s);
  const d = deriveRiesz(s, ex);
  const n = s.g.length;
  const rieszReady = ex.spd && done.g && done.l;
  const lmReady = rieszReady && done.m && done.alpha && ex.coercive;

  const measures: Measure[] = [
    { id: 'minors', label: 'Mineurs dominants de $G$', value: `$${ex.minors.map(qText).join(',\\ ')}$`, status: 'exact' },
    { id: 'lv', label: String.raw`$\ell(v)=c^{\mathsf T}v$`, value: fmt(dot(s.c, s.v)), numeric: dot(s.c, s.v), status: 'exact' },
  ];
  if (d.w) {
    measures.push(
      { id: 'w', label: String.raw`$w=G^{-1}c$`, value: ex.w ? `$${qVecTex(ex.w)}$` : '—', status: 'exact' },
      { id: 'vw', label: String.raw`$\langle v,w\rangle_G$`, value: fmt(innerG(s.g, s.v, d.w)), numeric: innerG(s.g, s.v, d.w), status: 'exact' },
      { id: 'dual', label: String.raw`$\|\ell\|_{G'}=\|w\|_G$`, value: fmt(d.dualNorm, 4), numeric: d.dualNorm, status: 'exact', method: '√(cᵀG⁻¹c), formule fermée' },
    );
  }
  if (ex.spd) {
    measures.push(
      { id: 'alpha', label: String.raw`$\alpha$ optimal`, value: fmt(d.alpha, 4), numeric: d.alpha, status: 'numerique', method: 'Plus petite valeur propre de L⁻¹ S L⁻ᵀ (méthode de Jacobi, précision 1e−12).' },
      { id: 'M', label: String.raw`$M$ optimal`, value: fmt(d.M, 4), numeric: d.M, status: 'numerique', method: 'Plus grande valeur singulière de L⁻¹ A L⁻ᵀ (Jacobi).' },
    );
  }
  if (d.u) {
    const auv = dot(d.u, matVec(s.a, s.v));
    measures.push(
      { id: 'u', label: String.raw`$u$, solution de $A^{\mathsf T}u=c$`, value: ex.u ? `$${qVecTex(ex.u)}$` : '—', status: 'exact' },
      { id: 'auv', label: String.raw`$a(u,v)$`, value: fmt(auv), numeric: auv, status: 'exact' },
    );
    if (ex.spd && ex.coercive) {
      measures.push({ id: 'bound', label: String.raw`$\|u\|_G\le\alpha^{-1}\|\ell\|_{G'}$`, value: `${fmt(normG(s.g, d.u), 4)} ≤ ${fmt(d.dualNorm / d.alpha, 4)}`, status: 'numerique' });
    }
  }

  const R = n === 2 ? String.raw`\mathbb R^2` : String.raw`\mathbb R^3`;
  const equations: EquationLine[] = [
    { id: 'produit', tex: String.raw`$\langle x,y\rangle_G=x^{\mathsf T}Gy$, $\ \|x\|_G=\sqrt{x^{\mathsf T}Gx}$ sur $${R}$.`, status: 'exact' },
    {
      id: 'riesz',
      tex: String.raw`$\ell(x)=c^{\mathsf T}x=\langle x,w\rangle_G$ pour tout $x$ $\iff$ $Gw=c$.`,
      status: 'exact',
      note: 'Identité valable pour tout x : elle se lit sur la formule, pas sur un point.',
    },
    {
      id: 'tangence',
      tex: String.raw`$\max_{\|x\|_G\le 1}\ell(x)=\|w\|_G$, atteint en $x=w/\|w\|_G$ (Cauchy–Schwarz pour $\langle\cdot,\cdot\rangle_G$).`,
      status: 'exact',
      note: 'Sur la figure : l’hyperplan de niveau ‖ℓ‖ touche la boule unité de G exactement en w/‖w‖_G.',
    },
    { id: 'lm', tex: String.raw`$a(u,v)=\ell(v)$ pour tout $v$ $\iff$ $u^{\mathsf T}Av=c^{\mathsf T}v$ pour tout $v$ $\iff$ $A^{\mathsf T}u=c$.`, status: 'exact' },
    {
      id: 'quadratique',
      tex: String.raw`$a(x,x)=x^{\mathsf T}\tfrac{A+A^{\mathsf T}}2x$ : la forme quadratique ne voit que la partie symétrique ; $\ell(tx)=t\,\ell(x)$ mais $a(tx,tx)=t^2a(x,x)$.`,
      status: 'exact',
    },
  ];

  const hypotheses: HypothesisLine[] = [
    {
      id: 'g',
      label: String.raw`$G$ définit un produit scalaire`,
      state: !ex.spd ? 'absente' : done.g ? 'demontree' : 'satisfaite',
      detail: !ex.spd ? 'Un mineur dominant est ≤ 0 (décision exacte) : la boule unité n’est pas bornée.' : done.g ? 'Critère de Sylvester vérifié par toi.' : 'Vrai pour cette matrice (décision exacte), pas encore vérifié par toi.',
    },
    { id: 'l', label: String.raw`$\ell$ continue`, state: done.l ? 'demontree' : 'satisfaite', detail: done.l ? 'Argument de dimension finie posé.' : 'Vrai en dimension finie ; argument à poser.' },
    { id: 'm', label: String.raw`$a$ continue`, state: done.m ? 'demontree' : 'satisfaite' },
    {
      id: 'alpha',
      label: String.raw`$a$ coercive`,
      state: !ex.coercive ? 'absente' : done.alpha ? 'demontree' : 'satisfaite',
      detail: !ex.coercive ? 'La partie symétrique de A n’est pas définie positive (décision exacte).' : undefined,
    },
  ];

  const conclusions: ConclusionLine[] = [
    {
      id: 'riesz',
      label: String.raw`Riesz : $\ell=\langle\cdot,w\rangle_G$ pour un unique $w$`,
      state: !ex.spd ? 'non-garantie' : rieszReady ? 'etablie' : 'illustrative',
      detail: !ex.spd ? 'Sans produit scalaire, le théorème de Riesz ne s’applique pas.' : rieszReady ? undefined : 'w est calculé, mais les hypothèses ne sont pas encore établies par toi.',
    },
    lmConclusion(ex, lmReady),
  ];

  return { measures, equations, hypotheses, conclusions, exact: ex, derived: d };
}

/**
 * Trois situations distinctes lorsque la coercivité manque :
 *  - A inversible : la conclusion reste vraie, mais n'est plus garantie par Lax–Milgram ;
 *  - A singulière : la conclusion est fausse (unicité perdue, et existence selon c).
 */
function lmConclusion(ex: RieszExact, ready: boolean): ConclusionLine {
  const label = String.raw`Lax–Milgram : un unique $u$ avec $a(u,v)=\ell(v)$ pour tout $v$`;
  if (!ex.spd) return { id: 'lm', label, state: 'non-garantie', detail: 'Sans produit scalaire, le théorème ne s’applique pas.' };
  if (ex.coercive) return { id: 'lm', label, state: ready ? 'etablie' : 'illustrative', detail: ready ? undefined : 'u est calculé, mais les hypothèses ne sont pas encore établies par toi.' };
  if (!Q.isZero(ex.detA)) {
    return {
      id: 'lm',
      label,
      state: 'non-garantie',
      detail: 'Théorème non applicable (a non coercive). Ici A est inversible : la solution existe et est unique quand même. La coercivité est suffisante, non nécessaire.',
    };
  }
  return {
    id: 'lm',
    label,
    state: 'fausse',
    detail: 'A est singulière : le noyau de Aᵀ est non trivial, l’unicité est perdue ; selon c, il n’y a aucune solution ou une infinité.',
  };
}

// ───────────── Configurations ─────────────

export interface RieszPreset {
  id: string;
  label: string;
  g: Mat;
  a: Mat;
  c: Vec;
}

export const PRESETS_3D: RieszPreset[] = [
  {
    id: 'euclidien-3',
    label: 'Euclidien, a = produit scalaire',
    g: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
    a: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
    c: [1, 1, 1],
  },
  {
    id: 'oblique-3',
    label: 'Produit scalaire oblique, a non symétrique',
    g: [
      [2, 0.5, 0],
      [0.5, 1, 0.25],
      [0, 0.25, 1.5],
    ],
    a: [
      [2, 1, 0],
      [-1, 1, 0.5],
      [0, -0.5, 1.5],
    ],
    c: [1, -1, 1.5],
  },
  {
    id: 'indefinie-3',
    label: 'a indéfinie, inversible',
    g: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
    a: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, -1],
    ],
    c: [1, 0.5, 1],
  },
];

/** Un vecteur, ses coordonnées en LaTeX. */
export const vecLatex = (v: Vec) => vecTex(v);

/** Norme euclidienne (pour les tests et la mise à l'échelle des figures). */
export const euclid = norm;
