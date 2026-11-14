/**
 * Parcours « Géométrie de Lie » : recalcul indépendant de toutes les valeurs numériques.
 *
 * Le validateur de contenu contrôle la structure des démonstrations, pas l'arithmétique des
 * énoncés. Ce fichier recalcule chaque contrôle fermé des modules Lie (nœuds masqués,
 * variantes, contre-exemples) par une méthode distincte de celle du texte : flots intégrés
 * par Runge–Kutta, crochets par jacobiennes numériques, exponentielles par série, relèvement
 * de chemin pas à pas dans S³, schémas itérés, rangs par élimination de Gauss.
 * Tout contrôle fermé d'un module Lie doit avoir son recalcul : sinon le test échoue.
 * Une seconde série vérifie des affirmations du texte qui ne portent pas de contrôle.
 */
import { describe, expect, it } from 'vitest';
import { THEOREM_MODULES } from '@/content';
import { THEOREM_CATALOG } from '@/content/catalog';
import type { ClosedCheckData } from '@/content/schema';
import { parseRational, toNumber } from '@/core/math/rational';

type Vec = number[];
type Mat = number[][];
type Field = (p: Vec) => Vec;
type Scalar = (p: Vec) => number;

const TOL = 1e-7;

/* ───────────────────── Outils numériques indépendants ───────────────────── */

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(20261114);
const samples = (n: number, dim: number, scale = 2): Vec[] =>
  Array.from({ length: n }, () => Array.from({ length: dim }, () => (rnd() * 2 - 1) * scale));

const add = (a: Vec, b: Vec, s = 1): Vec => a.map((v, i) => v + s * b[i]);
const dot = (a: Vec, b: Vec): number => a.reduce((s, v, i) => s + v * b[i], 0);
const dist = (a: Vec, b: Vec): number => Math.hypot(...a.map((v, i) => v - b[i]));
const matVec = (A: Mat, v: Vec): Vec => A.map((r) => dot(r, v));
const mm = (A: Mat, B: Mat): Mat => A.map((r) => B[0].map((_, j) => r.reduce((s, a, k) => s + a * B[k][j], 0)));
const mlin = (A: Mat, B: Mat, s = 1): Mat => A.map((r, i) => r.map((a, j) => a + s * B[i][j]));
const mscale = (A: Mat, s: number): Mat => A.map((r) => r.map((a) => a * s));
const transpose = (A: Mat): Mat => A[0].map((_, j) => A.map((r) => r[j]));
const eye = (n: number): Mat => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
const trace = (A: Mat): number => A.reduce((s, r, i) => s + r[i], 0);
const comm = (A: Mat, B: Mat): Mat => mlin(mm(A, B), mm(B, A), -1);
const mdist = (A: Mat, B: Mat): number => dist(A.flat(), B.flat());
const hat = (w: Vec): Mat => [
  [0, -w[2], w[1]],
  [w[2], 0, -w[0]],
  [-w[1], w[0], 0],
];
const cross = (a: Vec, b: Vec): Vec => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
/** Base canonique E_ij de M_n, aplatie ligne par ligne. */
const basisMn = (n: number): Mat[] =>
  Array.from({ length: n * n }, (_, k) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i * n + j === k ? 1 : 0))));

/** Rang par élimination de Gauss avec pivot partiel. */
function rank(M: Mat, tol = 1e-9): number {
  const A = M.map((r) => r.slice());
  const rows = A.length;
  const cols = A[0].length;
  let r = 0;
  for (let c = 0; c < cols && r < rows; c++) {
    let piv = r;
    for (let i = r + 1; i < rows; i++) if (Math.abs(A[i][c]) > Math.abs(A[piv][c])) piv = i;
    if (Math.abs(A[piv][c]) < tol) continue;
    [A[r], A[piv]] = [A[piv], A[r]];
    for (let i = r + 1; i < rows; i++) {
      const f = A[i][c] / A[r][c];
      for (let j = c; j < cols; j++) A[i][j] -= f * A[r][j];
    }
    r++;
  }
  return r;
}

/** Dimension du noyau d'une application linéaire, connue par les images d'une base. */
const kernelDim = (images: Vec[]): number => images.length - rank(images);

/** Déterminant par élimination de Gauss. */
function det(M: Mat): number {
  const A = M.map((r) => r.slice());
  const n = A.length;
  let d = 1;
  for (let c = 0; c < n; c++) {
    let piv = c;
    for (let i = c + 1; i < n; i++) if (Math.abs(A[i][c]) > Math.abs(A[piv][c])) piv = i;
    if (Math.abs(A[piv][c]) < 1e-14) return 0;
    if (piv !== c) {
      [A[c], A[piv]] = [A[piv], A[c]];
      d = -d;
    }
    d *= A[c][c];
    for (let i = c + 1; i < n; i++) {
      const f = A[i][c] / A[c][c];
      for (let j = c; j < n; j++) A[i][j] -= f * A[c][j];
    }
  }
  return d;
}

/** Exponentielle de matrice : mise à l'échelle, série de Taylor, élévations au carré. */
function expm(A: Mat): Mat {
  const norm = Math.max(...A.map((r) => r.reduce((s, a) => s + Math.abs(a), 0)));
  let k = 0;
  while (norm / 2 ** k > 0.25) k++;
  const B = mscale(A, 1 / 2 ** k);
  let term = eye(A.length);
  let sum = eye(A.length);
  for (let n = 1; n <= 24; n++) {
    term = mscale(mm(term, B), 1 / n);
    sum = mlin(sum, term);
  }
  for (let i = 0; i < k; i++) sum = mm(sum, sum);
  return sum;
}

/** Dérivée partielle centrée. */
function partial(f: Scalar, p: Vec, i: number, h = 1e-5): number {
  const a = p.slice();
  a[i] += h;
  const b = p.slice();
  b[i] -= h;
  return (f(a) - f(b)) / (2 * h);
}
const grad = (f: Scalar, p: Vec): Vec => p.map((_, i) => partial(f, p, i));
/** Jacobienne J[i][j] = ∂F_i/∂x_j. */
const jacobian = (F: Field, p: Vec): Mat => F(p).map((_, i) => p.map((__, j) => partial((x) => F(x)[i], p, j)));
/** Crochet du cours : [X,Y] = Y′X − X′Y, c'est-à-dire [X,Y](f) = X(Yf) − Y(Xf). */
const bracket = (X: Field, Y: Field, p: Vec): Vec => add(matVec(jacobian(Y, p), X(p)), matVec(jacobian(X, p), Y(p)), -1);
/** Dérivation d'une fonction le long d'un champ : X(f)(p) = df_p(X(p)). */
const derive = (X: Field, f: Scalar, p: Vec): number => dot(grad(f, p), X(p));

/** Flot (ou solution d'EDO autonome) par Runge–Kutta d'ordre 4. */
function flow(F: Field, p: Vec, t: number, steps = 400): Vec {
  const h = t / steps;
  let y = p.slice();
  for (let s = 0; s < steps; s++) {
    const k1 = F(y);
    const k2 = F(add(y, k1, h / 2));
    const k3 = F(add(y, k2, h / 2));
    const k4 = F(add(y, k3, h));
    y = y.map((v, i) => v + (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
  }
  return y;
}
/** C_t = Φ^Y_{−t} ∘ Φ^X_{−t} ∘ Φ^Y_t ∘ Φ^X_t : Φ^X_t s'applique en premier. */
const commutator = (X: Field, Y: Field, p: Vec, t: number): Vec => flow(Y, flow(X, flow(Y, flow(X, p, t), t), -t), -t);

/** Quaternions (w, x, y, z), produit de Hamilton. */
const qmul = (a: Vec, b: Vec): Vec => [
  a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
  a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
  a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
  a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0],
];
const qconj = (q: Vec): Vec => [q[0], -q[1], -q[2], -q[3]];
/** Matrice de v ↦ q v q⁻¹ (q unitaire), colonne par colonne. */
function rotationOf(q: Vec): Mat {
  const cols = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ].map((e) => qmul(qmul(q, [0, ...e]), qconj(q)).slice(1));
  return transpose(cols);
}
/** Un antécédent, défini au signe près, d'une rotation (méthode de Shepperd). */
function quatOf(R: Mat): Vec {
  const t = trace(R);
  const cands = [t, R[0][0], R[1][1], R[2][2]];
  const i = cands.indexOf(Math.max(...cands));
  if (i === 0) {
    const s = 2 * Math.sqrt(1 + t);
    return [s / 4, (R[2][1] - R[1][2]) / s, (R[0][2] - R[2][0]) / s, (R[1][0] - R[0][1]) / s];
  }
  if (i === 1) {
    const s = 2 * Math.sqrt(1 + R[0][0] - R[1][1] - R[2][2]);
    return [(R[2][1] - R[1][2]) / s, s / 4, (R[0][1] + R[1][0]) / s, (R[0][2] + R[2][0]) / s];
  }
  if (i === 2) {
    const s = 2 * Math.sqrt(1 + R[1][1] - R[0][0] - R[2][2]);
    return [(R[0][2] - R[2][0]) / s, (R[0][1] + R[1][0]) / s, s / 4, (R[1][2] + R[2][1]) / s];
  }
  const s = 2 * Math.sqrt(1 + R[2][2] - R[0][0] - R[1][1]);
  return [(R[1][0] - R[0][1]) / s, (R[0][2] + R[2][0]) / s, (R[1][2] + R[2][1]) / s, s / 4];
}
/** Relèvement pas à pas dans S³, issu de 1, d'un chemin de rotations issu de I. */
function liftPath(gamma: (t: number) => Mat, T: number, steps = 4000): Vec {
  let q = [1, 0, 0, 0];
  for (let s = 1; s <= steps; s++) {
    const c = quatOf(gamma((s / steps) * T));
    q = dot(c, q) >= 0 ? c : c.map((v) => -v);
  }
  return q;
}
const rotZ = (t: number): Mat => expm(mscale(hat([0, 0, 1]), t));

/** Crochet de Poisson sur ℝ^{2n}, coordonnées (q_1..q_n, p_1..p_n). */
function poisson(f: Scalar, g: Scalar, z: Vec): number {
  const n = z.length / 2;
  let s = 0;
  for (let i = 0; i < n; i++) s += partial(f, z, i) * partial(g, z, n + i) - partial(f, z, n + i) * partial(g, z, i);
  return s;
}
/** Matrice d'une application linéaire de ℝ², par les images de la base. */
function matrixOf(step: (v: Vec) => Vec): Mat {
  return transpose([step([1, 0]), step([0, 1])]);
}
const eulerExplicit = (h: number) => ([q, p]: Vec): Vec => [q + h * p, p - h * q];
const eulerSymplectic = (h: number) => ([q, p]: Vec): Vec => {
  const p1 = p - h * q;
  return [q + h * p1, p1];
};
const stormerVerlet = (h: number) => ([q, p]: Vec): Vec => {
  const pm = p - (h / 2) * q;
  const q1 = q + h * pm;
  return [q1, pm - (h / 2) * q1];
};
/** Modules des valeurs propres d'une matrice 2 × 2. */
function eigenModuli(A: Mat): Vec {
  const t = trace(A);
  const d = det(A);
  const disc = t * t - 4 * d;
  if (disc < 0) return [Math.sqrt(d), Math.sqrt(d)];
  return [Math.abs((t + Math.sqrt(disc)) / 2), Math.abs((t - Math.sqrt(disc)) / 2)];
}

/* ───────────────────── Recalculs, contrôle par contrôle ───────────────────── */

const sphere: Scalar = ([x, y, z]) => x * x + y * y + z * z;
const cone: Scalar = ([x, y, z]) => x * x + y * y - z * z;
const det2 = ([a, b, c, d]: Vec): number => a * d - b * c;
const onUnitSphere = (dim: number): Vec[] =>
  samples(12, dim).map((p) => {
    const n = Math.hypot(...p);
    return p.map((v) => v / n);
  });
/** Dimension d'un niveau, par le rang de la différentielle en des points du niveau. */
function levelDim(F: Scalar, points: Vec[]): number {
  const ranks = new Set(points.map((p) => rank([grad(F, p)])));
  expect(ranks.size).toBe(1);
  return points[0].length - [...ranks][0];
}

const dx: Field = () => [1, 0];
const xdy: Field = ([x]) => [0, x];
const A_up = [
  [0, 1],
  [0, 0],
];
const B_low = [
  [0, 0],
  [1, 0],
];
const linear = (A: Mat): Field => (p) => matVec(A, p);
const alphaFacile = (p: Vec, v: Vec): number => v[2] - p[1] * v[0]; // α = dz − y dx
const frobX: Field = () => [0, 1, 0]; // ∂y
const frobY: Field = ([, y]) => [1, 0, y]; // ∂x + y∂z
/** Dimension de SO(n) = dimension de 𝔰𝔬(n) = noyau de A ↦ A + Aᵀ. */
const dimSO = (n: number): number => kernelDim(basisMn(n).map((E) => mlin(E, transpose(E)).flat()));
const J2 = [
  [0, -1],
  [1, 0],
];
const qPi4 = [Math.cos(Math.PI / 4), 0, 0, Math.sin(Math.PI / 4)];
/** Générateur de x̃ = e^{2ε}x, ũ = e^{−ε}u, par dérivation en ε = 0. */
const scaling = (eps: number, [x, u]: Vec): Vec => [Math.exp(2 * eps) * x, Math.exp(-eps) * u];
const generator: Field = (p) => grad((e) => scaling(e[0], p)[0], [0]).concat(grad((e) => scaling(e[0], p)[1], [0]));
const Lharm = ([q, v]: Vec): number => 0.5 * v * v - 0.5 * q * q;
const H1 = ([q, p]: Vec): number => 0.5 * (q * q + p * p);
const J4: Scalar = ([q1, q2, p1, p2]) => q1 * p2 - q2 * p1;
const H4: Scalar = ([q1, q2, p1, p2]) => 0.5 * (p1 * p1 + p2 * p2 + q1 * q1 + q2 * q2);

const RECOMPUTED: Record<string, () => Vec> = {
  /* ── 35 · niveau régulier ── */
  'niveau-regulier.facile#thm': () => [levelDim(sphere, onUnitSphere(3))],
  'niveau-regulier.facile#calc': () => [dot(grad(sphere, [0, 0, 1]), [1, 2, 3])],
  'niveau-regulier.facile#variant#thm': () => [levelDim(([x, y]) => x * x + y * y, onUnitSphere(2))],
  'niveau-regulier.facile#variant-closed#0': () => [levelDim(([x, y]) => x * x + y * y, onUnitSphere(2))],
  'niveau-regulier.intermediaire#thm': () => {
    const sl2 = samples(12, 4)
      .filter((m) => det2(m) > 0.1)
      .map((m) => m.map((v) => v / Math.sqrt(det2(m))));
    for (const m of sl2) expect(Math.abs(det2(m) - 1)).toBeLessThan(TOL);
    return [levelDim(det2, sl2)];
  },
  'niveau-regulier.intermediaire#calc': () => {
    const H = [2, 5, 7, 3];
    return [partial((e) => det2(add([1, 0, 0, 1], H, e[0])), [0], 0)];
  },
  'niveau-regulier.difficile#det': () => {
    const gammaPrime = (th: number): Vec => {
      const g = (s: number): Vec => [s * Math.cos(th), s * Math.sin(th), s];
      for (const s of [-1, 0.3, 2]) expect(Math.abs(cone(g(s)))).toBeLessThan(TOL);
      return [0, 1, 2].map((i) => partial((e) => g(e[0])[i], [0], 0));
    };
    return [det([gammaPrime(0), gammaPrime(Math.PI / 2), gammaPrime(Math.PI)])];
  },
  'ce-niveau-non-regulier#ce': () => {
    // Niveau régulier ⇒ sous-variété. Seul le cône contient un point critique de F
    // (son sommet) ; qu'il n'est pas une sous-variété est établi par le déterminant 2 ci-dessus.
    const options: { F: Scalar; c: number; critical: Vec[] }[] = [
      { F: sphere, c: 1, critical: [[0, 0, 0]] },
      { F: cone, c: 0, critical: [[0, 0, 0]] },
      { F: ([, , z]) => z, c: 0, critical: [] },
      { F: cone, c: 1, critical: [[0, 0, 0]] },
    ];
    for (const o of options) {
      for (const p of o.critical) expect(Math.hypot(...grad(o.F, p))).toBeLessThan(TOL);
      for (const p of samples(20, 3)) expect(Math.hypot(...grad(o.F, p))).toBeGreaterThan(1e-3);
    }
    return options.flatMap((o, i) => (o.critical.some((p) => Math.abs(o.F(p) - o.c) < TOL) ? [i] : []));
  },

  /* ── 36 · crochet de Lie ── */
  'crochet-lie.facile#crochet': () => {
    const values = samples(5, 2).map((p) => bracket(dx, xdy, p));
    for (const v of values) expect(dist(v, values[0])).toBeLessThan(TOL);
    return values[0];
  },
  'crochet-lie.facile#num': () => commutator(dx, xdy, [1, 2], 0.5),
  'crochet-lie.intermediaire#matrice': () => {
    const C = mlin(mm(B_low, A_up), mm(A_up, B_low), -1);
    for (const p of samples(5, 2)) expect(dist(bracket(linear(A_up), linear(B_low), p), matVec(C, p))).toBeLessThan(TOL);
    return C.flat();
  },
  'crochet-lie.intermediaire#compo': () => commutator(linear(A_up), linear(B_low), [1, 0], 0.5),
  'ce-crochet-orthogonaux#ce': () => {
    for (const p of samples(5, 2)) expect(dot(dx(p), xdy(p))).toBe(0);
    return [commutator(dx, xdy, [0, 0], 1)[1]];
  },

  /* ── 37 · Frobenius ── */
  'frobenius.facile#crochet': () => {
    const values = samples(5, 3).map((p) => bracket(frobX, frobY, p));
    for (const v of values) expect(dist(v, values[0])).toBeLessThan(TOL);
    return values[0];
  },
  'frobenius.facile#sort': () => {
    const values = samples(5, 3).map((p) => alphaFacile(p, bracket(frobX, frobY, p)));
    for (const v of values) expect(Math.abs(v - values[0])).toBeLessThan(TOL);
    return [values[0]];
  },
  'frobenius.difficile#crochet': () => {
    const X: Field = ([, y]) => [1, 0, y];
    const Y: Field = ([x]) => [0, 1, x];
    const values = samples(5, 3).map((p) => bracket(X, Y, p));
    for (const v of values) expect(dist(v, values[0])).toBeLessThan(TOL);
    return values[0];
  },
  'frobenius.difficile#contraste': () => [alphaFacile([0.4, -1.3, 2], bracket(frobX, frobY, [0.4, -1.3, 2]))],
  'ce-frobenius-contact#ce': () => {
    const alpha = (p: Vec, v: Vec): number => v[2] - p[0] * v[1]; // dz − x dy
    const X: Field = () => [1, 0, 0];
    const Y: Field = ([x]) => [0, 1, x];
    const values = samples(5, 3).map((p) => alpha(p, bracket(X, Y, p)));
    for (const v of values) expect(Math.abs(v - values[0])).toBeLessThan(TOL);
    return [values[0]];
  },

  /* ── 38 · orbites et stabilisateurs ── */
  'orbite-stabilisateur.facile#dims': () => {
    const orbitDim = rank([0, 1, 2].map((i) => matVec(hat(eye(3)[i]), [0, 0, 1])));
    expect(dimSO(3) - dimSO(2)).toBe(orbitDim);
    return [dimSO(3) - dimSO(2)];
  },
  'orbite-stabilisateur.difficile#dim-stab': () => {
    const A = [
      [1, 0],
      [0, 2],
    ];
    return [kernelDim(basisMn(2).map((E) => comm(E, A).flat()))];
  },
  'orbite-stabilisateur.difficile#test': () => {
    const A = [
      [1, 0],
      [0, 2],
    ];
    const P = [
      [1, 1],
      [0, 1],
    ];
    const Pinv = [
      [1, -1],
      [0, 1],
    ];
    expect(mdist(mm(P, Pinv), eye(2))).toBeLessThan(TOL);
    const M = mm(mm(P, A), Pinv);
    expect(
      mdist(M, [
        [1, 1],
        [0, 2],
      ]),
    ).toBeLessThan(TOL);
    return [trace(M), det(M)];
  },
  'ce-orbite-groupe#ce': () => [kernelDim([0, 1, 2].map((i) => matVec(hat(eye(3)[i]), [0, 0, 1])))],

  /* ── 39 · algèbres de Lie matricielles ── */
  'algebre-lie-matricielle.facile#base': () => {
    for (let k = 0; k < 5; k++) {
      const [a, b] = samples(2, 3);
      const C = comm(hat(a), hat(b));
      expect(mdist(C, mscale(transpose(C), -1))).toBeLessThan(TOL);
    }
    return [dimSO(3)];
  },
  'algebre-lie-matricielle.intermediaire#dim': () => [kernelDim(basisMn(3).map((E) => [trace(E)]))],
  'algebre-lie-matricielle.intermediaire#exemple': () =>
    comm(
      [
        [1, 2],
        [0, 3],
      ],
      [
        [0, 1],
        [4, 0],
      ],
    ).flat(),
  'algebre-lie-matricielle.difficile#crochet': () => {
    const C = comm(
      [
        [1, 0],
        [0, -1],
      ],
      [
        [0, 1],
        [1, 0],
      ],
    );
    expect(mdist(C, transpose(C))).toBeGreaterThan(1);
    return C.flat();
  },
  'ce-algebre-sym#ce': () => [
    comm(
      [
        [1, 0],
        [0, -1],
      ],
      [
        [0, 1],
        [1, 0],
      ],
    )[0][1],
  ],

  /* ── 40 · exponentielle ── */
  'exponentielle.facile#valeur': () => expm(mscale(J2, Math.PI / 2)).flat(),
  'exponentielle.intermediaire#eaeb': () => {
    expect(Math.abs(expm(mlin(A_up, B_low))[0][0] - Math.cosh(1))).toBeLessThan(TOL);
    return mm(expm(A_up), expm(B_low)).flat();
  },
  'exponentielle.difficile#trM': () => {
    const M = [
      [-2, 0],
      [0, -0.5],
    ];
    expect(Math.abs(det(M) - 1)).toBeLessThan(TOL);
    return [trace(M)];
  },
  'ce-exp-somme#ce': () => [mm(expm(A_up), expm(B_low))[0][0]],

  /* ── 41 · Rodrigues ── */
  'rodrigues.facile#valeur': () => expm(mscale(hat([0, 0, 1]), Math.PI / 2)).flat(),
  'rodrigues.intermediaire#base': () => {
    const [e1, e2] = eye(3);
    expect(mdist(comm(hat(e1), hat(e2)), hat(cross(e1, e2)))).toBeLessThan(TOL);
    return cross(e1, e2);
  },
  'rodrigues.difficile#application': () => {
    const u = [1, 1, 1].map((v) => v / Math.sqrt(3));
    return matVec(expm(mscale(hat(u), (2 * Math.PI) / 3)), [1, 0, 0]);
  },
  'ce-rodrigues-ordre1#ce': () => [expm(mscale(hat([0, 0, 1]), Math.PI))[0][0]],

  /* ── 42 · revêtement SU(2) → SO(3) ── */
  'revetement-su2.facile#angle': () => {
    const R = rotationOf(qPi4);
    expect(dist(matVec(R, [0, 0, 1]), [0, 0, 1])).toBeLessThan(TOL);
    expect(dist(matVec(R, [1, 0, 0]), [0, 1, 0])).toBeLessThan(TOL);
    expect(mdist(rotationOf(qPi4.map((v) => -v)), R)).toBeLessThan(TOL);
    return [(Math.acos((trace(R) - 1) / 2) * 180) / Math.PI];
  },
  'revetement-su2.difficile#extremite': () => [liftPath(rotZ, 2 * Math.PI)[0]],
  'revetement-su2.difficile#double': () => [liftPath(rotZ, 4 * Math.PI)[0]],
  'ce-su2-injectif#ce': () => {
    const R = rotationOf(qPi4);
    const c = quatOf(R);
    const other = dot(c, qPi4) < 0 ? c : c.map((v) => -v);
    expect(dist(other, qPi4)).toBeGreaterThan(1);
    expect(mdist(rotationOf(other), R)).toBeLessThan(TOL);
    return [Math.SQRT2 * other[0]];
  },

  /* ── 43 · symétries d'EDO ── */
  'symetries-edo.facile#valeur': () => generator([1, 3]),
  'symetries-edo.facile#invariant': () => samples(8, 2).map((p) => derive(generator, ([x, u]) => x * u * u, p)),
  'symetries-edo.intermediaire#cauchy': () => {
    const [u1, w1] = flow(([u, w]) => [w, (w * w) / u], [2, 6], 1, 2000);
    expect(Math.abs(w1 / u1 - 3)).toBeLessThan(TOL);
    return [Math.log(u1 / 2)];
  },
  'symetries-edo.difficile#exemple': () => {
    // u′ = 1 + u/x depuis u(1) = 0 ; le long de la solution, ds/dr avec r = u/x, s = ln x.
    const field: Field = ([x, u]) => [1, 1 + u / x];
    const [x1, u1] = flow(field, [1, 0], 0.5, 2000);
    const [x2, u2] = flow(field, [1, 0], 2, 4000);
    expect(Math.abs(u2 - x2 * Math.log(x2))).toBeLessThan(TOL);
    return [(Math.log(x2) - Math.log(x1)) / (u2 / x2 - u1 / x1)];
  },
  'ce-symetrie-translation#ce': () => {
    const v = (x: number): number => x - 1;
    return [partial((e) => v(e[0]), [2], 0) - v(2) / 2];
  },

  /* ── 44 · Noether ── */
  'noether.facile#exemple': () => [partial((e) => 0.5 * 1.7 * 1.7 - (3 + e[0]) ** 2, [0], 0)],
  'noether.intermediaire#valeur': () => {
    const I = ([q, v]: Vec): number => partial((w) => Lharm([q, w[0]]), [v], 0) * v - Lharm([q, v]);
    const later = flow(([q, v]) => [v, -q], [1, 2], 2.3, 2000);
    expect(Math.abs(I(later) - I([1, 2]))).toBeLessThan(TOL);
    return [I([1, 2])];
  },
  'noether.difficile#valeur': () => {
    const I = ([q1, q2, v1, v2]: Vec): number => q1 * v2 - q2 * v1;
    const radial: Field = ([q1, q2, v1, v2]) => {
      const f = 1 + q1 * q1 + q2 * q2; // V(r) = r²/2 + r⁴/4, −∇V = −q(1 + |q|²)
      return [v1, v2, -q1 * f, -q2 * f];
    };
    const z0 = [1, 0, 0, 3];
    expect(Math.abs(I(flow(radial, z0, 1.5, 4000)) - I(z0))).toBeLessThan(TOL);
    return [I(z0)];
  },
  'ce-noether-equation#ce': () => {
    const L = (v: number): number => 0.5 * v * v;
    const ratios = [0.7, -1.9, 2.4].map((v) => L(3 * v) / L(v));
    for (const r of ratios) expect(Math.abs(r - ratios[0])).toBeLessThan(TOL);
    return [ratios[0]];
  },

  /* ── 45 · flot hamiltonien ── */
  'flot-hamiltonien.facile#valeur': () => {
    // ι_X ω = dH avec ω(a, b) = aᵀΩb, Ω = [[0,1],[−1,0]] : Ωᵀ X = ∇H, résolu par Cramer.
    const g = grad(H1, [1, 2]);
    const M = transpose([
      [0, 1],
      [-1, 0],
    ]);
    const D = det(M);
    return [det([
      [g[0], M[0][1]],
      [g[1], M[1][1]],
    ]) / D, det([
      [M[0][0], g[0]],
      [M[1][0], g[1]],
    ]) / D];
  },
  'flot-hamiltonien.intermediaire#canonique': () => {
    const values = samples(4, 4).map((z) => poisson(([q1]) => q1, ([, , p1]) => p1, z));
    for (const v of values) expect(Math.abs(v - values[0])).toBeLessThan(TOL);
    return [values[0]];
  },
  'flot-hamiltonien.intermediaire#crochet': () => samples(8, 4).map((z) => poisson(J4, H4, z)),
  'flot-hamiltonien.difficile#detE': () => [det(matrixOf(eulerExplicit(0.5)))],
  'flot-hamiltonien.difficile#deux-pas': () => {
    const step = eulerExplicit(0.5);
    const ratios = samples(4, 2).map((z) => {
      const z2 = step(step(z));
      return dot(z2, z2) / dot(z, z);
    });
    for (const r of ratios) expect(Math.abs(r - ratios[0])).toBeLessThan(TOL);
    return [ratios[0]];
  },
  'ce-euler-symplectique#ce': () => [det(matrixOf(eulerExplicit(0.5)))],
};

/* ───────────────────── Collecte des contrôles des modules Lie ───────────────────── */

interface Found {
  key: string;
  check: ClosedCheckData;
}

function lieChecks(): Found[] {
  const lie = new Set(THEOREM_CATALOG.filter((e) => e.doc === 'cours-lie').map((e) => e.id));
  const out: Found[] = [];
  for (const m of THEOREM_MODULES) {
    if (!lie.has(m.theorem.id)) continue;
    for (const e of m.exercises) {
      for (const n of e.proof.nodes) if (n.check) out.push({ key: `${e.id}#${n.id}`, check: n.check });
      (e.closedChecks ?? []).forEach((c, i) => out.push({ key: `${e.id}#closed#${i}`, check: c }));
      for (const n of e.variant.proof?.nodes ?? []) if (n.check) out.push({ key: `${e.id}#variant#${n.id}`, check: n.check });
      (e.variant.closedChecks ?? []).forEach((c, i) => out.push({ key: `${e.id}#variant-closed#${i}`, check: c }));
    }
    for (const c of m.counterexamples) out.push({ key: `${c.id}#ce`, check: c.check });
  }
  return out;
}

const num = (s: string): number => {
  const r = parseRational(s);
  if (!r) throw new Error(`Valeur attendue illisible : ${s}`);
  return toNumber(r);
};

describe('Parcours Lie : recalcul indépendant des contrôles fermés', () => {
  const found = lieChecks();

  it('les onze modules Lie portent des contrôles, et chacun a son recalcul', () => {
    expect(new Set(found.map((f) => f.key.split('.')[0].replace(/#.*$/, ''))).size).toBeGreaterThanOrEqual(11);
    expect(found.map((f) => f.key).sort()).toEqual(Object.keys(RECOMPUTED).sort());
  });

  it.each(found.map((f) => [f.key, f] as const))('%s', (key, f) => {
    const values = RECOMPUTED[key]();
    const c = f.check;
    switch (c.kind) {
      case 'rational':
        expect(values).toHaveLength(1);
        expect(Math.abs(values[0] - num(c.expected))).toBeLessThan(TOL);
        break;
      case 'rational-vector':
        expect(values).toHaveLength(c.expected.length);
        c.expected.forEach((e, i) => expect(Math.abs(values[i] - num(e)), `${key}[${i}]`).toBeLessThan(TOL));
        break;
      case 'expr-equiv':
        expect(c.expected).toBe('0');
        expect(values.length).toBeGreaterThan(3);
        for (const v of values) expect(Math.abs(v)).toBeLessThan(1e-6);
        break;
      case 'choice':
        expect(values).toEqual(c.correct);
        break;
      default:
        throw new Error(`Type de contrôle sans recalcul : ${c.kind}`);
    }
  });
});

/* ───────────────────── Affirmations du texte sans contrôle fermé ───────────────────── */

describe('Parcours Lie : affirmations du texte', () => {
  it('crochet : C_t(p) = p + t²[X,Y]_p + O(t³) pour des champs non linéaires', () => {
    const X: Field = ([x, y]) => [Math.sin(y), x * x];
    const Y: Field = ([x, y]) => [y, Math.cos(x)];
    const p = [0.3, -0.4];
    const br = bracket(X, Y, p);
    const err = (t: number): number => dist(commutator(X, Y, p, t), add(p, br, t * t));
    // Erreur d'ordre 3 : diviser t par 2 divise l'erreur par environ 8.
    const ratio = err(0.02) / err(0.01);
    expect(ratio).toBeGreaterThan(6);
    expect(ratio).toBeLessThan(10);
  });

  it('crochet : C_t(1,0) = (1 − t², t³) pour X = y∂x, Y = x∂y, et [X_A, X_B] = X_{BA−AB}', () => {
    for (const t of [0.1, 0.5, 1.3]) expect(dist(commutator(linear(A_up), linear(B_low), [1, 0], t), [1 - t * t, t ** 3])).toBeLessThan(TOL);
    const [A, B] = [samples(3, 3), samples(3, 3)];
    for (const p of samples(4, 3)) expect(dist(bracket(linear(A), linear(B), p), matVec(mlin(mm(B, A), mm(A, B), -1), p))).toBeLessThan(1e-6);
  });

  it('crochet : variante X = ∂x, Y = e^x∂y, C_t(x,y) = (x, y + t eˣ(eᵗ − 1))', () => {
    const Y: Field = ([x]) => [0, Math.exp(x)];
    for (const t of [0.2, 0.7]) {
      const p = [0.4, -1];
      expect(dist(commutator(dx, Y, p, t), [p[0], p[1] + t * Math.exp(p[0]) * (Math.exp(t) - 1)])).toBeLessThan(1e-6);
    }
  });

  it('Frobenius : les surfaces z = xy + c sont tangentes à Ker(dz − y dx − x dy)', () => {
    const beta = ([x, y]: Vec, v: Vec): number => v[2] - y * v[0] - x * v[1];
    for (const [x, y] of samples(6, 2)) {
      const c = 0.7;
      const surf = ([a, b]: Vec): Vec => [a, b, a * b + c];
      const J = jacobian(surf, [x, y]);
      for (const k of [0, 1]) expect(Math.abs(beta([x, y], J.map((r) => r[k])))).toBeLessThan(TOL);
    }
  });

  it('exponentielle : det eˣ = e^{tr X}, groupe à un paramètre, tr eˣ ≥ −2 sur 𝔰𝔩(2)', () => {
    for (const X of [samples(3, 3), samples(2, 2, 3)]) expect(Math.abs(det(expm(X)) - Math.exp(trace(X)))).toBeLessThan(1e-6);
    const X = samples(3, 3);
    expect(mdist(mm(expm(mscale(X, 0.4)), expm(mscale(X, 0.9))), expm(mscale(X, 1.3)))).toBeLessThan(1e-9);
    let minTrace = Infinity;
    for (const [a, b, c] of samples(400, 3, 4)) {
      const E = expm([
        [a, b],
        [c, -a],
      ]);
      minTrace = Math.min(minTrace, trace(E));
    }
    expect(minTrace).toBeGreaterThanOrEqual(-2 - 1e-9);
  });

  it('Rodrigues : exp(θû) = I + sin θ û + (1 − cos θ) û² et appartient à SO(3)', () => {
    for (const w of samples(5, 3)) {
      const theta = Math.hypot(...w);
      const U = hat(w.map((v) => v / theta));
      const R = expm(mscale(U, theta));
      const closed = mlin(mlin(eye(3), mscale(U, Math.sin(theta))), mscale(mm(U, U), 1 - Math.cos(theta)));
      expect(mdist(R, closed)).toBeLessThan(1e-9);
      expect(mdist(mm(transpose(R), R), eye(3))).toBeLessThan(1e-9);
      expect(Math.abs(det(R) - 1)).toBeLessThan(1e-9);
    }
  });

  it('SU(2) → SO(3) : morphisme, p(−q) = p(q), noyau {±1}', () => {
    const unit = (v: Vec): Vec => v.map((x) => x / Math.hypot(...v));
    for (let k = 0; k < 5; k++) {
      const [a, b] = samples(2, 4).map(unit);
      expect(mdist(rotationOf(qmul(a, b)), mm(rotationOf(a), rotationOf(b)))).toBeLessThan(1e-9);
      expect(mdist(rotationOf(a.map((v) => -v)), rotationOf(a))).toBeLessThan(1e-12);
      expect(mdist(rotationOf(a), eye(3))).toBeGreaterThan(1e-3);
    }
    expect(mdist(rotationOf([-1, 0, 0, 0]), eye(3))).toBeLessThan(1e-12);
  });

  it('symétries d’EDO : u = x ln x résout u′ = 1 + u/x, et r = u/x, s = ln x sont canoniques pour x∂x + u∂u', () => {
    const X: Field = ([x, u]) => [x, u];
    for (const p of samples(5, 2).map(([x, u]) => [Math.abs(x) + 0.5, u])) {
      expect(Math.abs(derive(X, ([x, u]) => u / x, p))).toBeLessThan(1e-6);
      expect(Math.abs(derive(X, ([x]) => Math.log(x), p) - 1)).toBeLessThan(1e-6);
    }
    for (const x of [0.5, 1, 2.5]) expect(Math.abs(partial((e) => e[0] * Math.log(e[0]), [x], 0) - (1 + Math.log(x)))).toBeLessThan(1e-8);
  });

  it('Noether : avec W = q₁², dI/dt = 2q₁q₂ (en (1,1) : 2)', () => {
    const I = ([q1, q2, v1, v2]: Vec): number => q1 * v2 - q2 * v1;
    const field: Field = ([q1, , v1, v2]) => [v1, v2, -2 * q1, 0];
    for (const z of [...samples(4, 4), [1, 1, 0.3, -0.2]]) {
      const rate = (I(flow(field, z, 1e-4, 4)) - I(flow(field, z, -1e-4, 4))) / 2e-4;
      expect(Math.abs(rate - 2 * z[0] * z[1])).toBeLessThan(1e-6);
    }
  });

  it('hamiltonien : flot exact = rotation, schémas symplectiques de déterminant 1, contre-exemple 13/16', () => {
    const XH: Field = ([q, p]) => [p, -q];
    for (const t of [0.7, 2.1]) {
      const z = [0.8, -0.3];
      expect(dist(flow(XH, z, t, 2000), [z[0] * Math.cos(t) + z[1] * Math.sin(t), -z[0] * Math.sin(t) + z[1] * Math.cos(t)])).toBeLessThan(1e-9);
      expect(Math.abs(H1(flow(XH, z, t, 2000)) - H1(z))).toBeLessThan(1e-9);
    }
    for (const h of [0.1, 0.5, 1.5, 1.9]) {
      expect(Math.abs(det(matrixOf(eulerSymplectic(h))) - 1)).toBeLessThan(1e-12);
      expect(Math.abs(det(matrixOf(stormerVerlet(h))) - 1)).toBeLessThan(1e-12);
      expect(Math.abs(det(matrixOf(eulerExplicit(h))) - (1 + h * h))).toBeLessThan(1e-12);
      for (const m of eigenModuli(matrixOf(eulerSymplectic(h)))) expect(Math.abs(m - 1)).toBeLessThan(1e-9);
    }
    expect(Math.max(...eigenModuli(matrixOf(eulerSymplectic(2.5))))).toBeGreaterThan(1);
    const [q1, p1] = eulerSymplectic(0.5)([1, 0]);
    expect(Math.abs(q1 * q1 + p1 * p1 - 13 / 16)).toBeLessThan(1e-12);
  });
});
