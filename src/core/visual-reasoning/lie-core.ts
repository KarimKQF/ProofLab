/**
 * Laboratoire G — noyau numérique des groupes de Lie : exponentielle de matrice, flots par
 * Runge–Kutta, crochets de champs, rotations (Rodrigues), quaternions et relèvement de
 * chemins, schémas d'intégration pour H = p²/2 + V(q), aire d'un polygone, rang.
 * Fonctions pures, sans dépendance à l'interface ni à la progression.
 */

export type Vec = number[];
export type Mat = number[][];
export type Field = (p: Vec) => Vec;
export type Quat = [number, number, number, number];

/* ───────────── Algèbre linéaire ───────────── */

export const eye = (n: number): Mat => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
export const matVec = (A: Mat, v: Vec): Vec => A.map((r) => r.reduce((s, a, j) => s + a * v[j]!, 0));
export const matMul = (A: Mat, B: Mat): Mat => A.map((r) => B[0]!.map((_, j) => r.reduce((s, a, k) => s + a * B[k]![j]!, 0)));
export const matLin = (A: Mat, B: Mat, s = 1): Mat => A.map((r, i) => r.map((a, j) => a + s * B[i]![j]!));
export const matScale = (A: Mat, s: number): Mat => A.map((r) => r.map((a) => a * s));
export const transpose = (A: Mat): Mat => A[0]!.map((_, j) => A.map((r) => r[j]!));
export const trace = (A: Mat): number => A.reduce((s, r, i) => s + r[i]!, 0);
export const frob = (A: Mat): number => Math.sqrt(A.reduce((s, r) => s + r.reduce((t, a) => t + a * a, 0), 0));
export const matDist = (A: Mat, B: Mat): number => frob(matLin(A, B, -1));
/** Crochet de matrices [A,B] = AB − BA. */
export const matBracket = (A: Mat, B: Mat): Mat => matLin(matMul(A, B), matMul(B, A), -1);
export const vadd = (a: readonly number[], b: readonly number[], s = 1): Vec => a.map((v, i) => v + s * b[i]!);
export const vnorm = (a: readonly number[]): number => Math.hypot(...a);
export const vdist = (a: readonly number[], b: readonly number[]): number => vnorm(vadd(a, b, -1));
export const vdot = (a: readonly number[], b: readonly number[]): number => a.reduce((s, v, i) => s + v * b[i]!, 0);
export const vcross = (a: readonly number[], b: readonly number[]): Vec => [a[1]! * b[2]! - a[2]! * b[1]!, a[2]! * b[0]! - a[0]! * b[2]!, a[0]! * b[1]! - a[1]! * b[0]!];
export const unit = (a: readonly number[]): Vec => {
  const n = vnorm(a);
  return n > 0 ? a.map((v) => v / n) : a.slice();
};

export function det(M: Mat): number {
  const n = M.length;
  if (n === 1) return M[0]![0]!;
  if (n === 2) return M[0]![0]! * M[1]![1]! - M[0]![1]! * M[1]![0]!;
  if (n === 3) {
    const [a, b, c] = M as [Vec, Vec, Vec];
    return a[0]! * (b[1]! * c[2]! - b[2]! * c[1]!) - a[1]! * (b[0]! * c[2]! - b[2]! * c[0]!) + a[2]! * (b[0]! * c[1]! - b[1]! * c[0]!);
  }
  throw new RangeError('Déterminant prévu jusqu’à la dimension 3');
}

/** Rang par élimination de Gauss avec pivot partiel (tolérance relative à la plus grande entrée). */
export function rank(M: Mat, tol = 1e-9): number {
  if (!M.length) return 0;
  const A = M.map((r) => r.slice());
  const rows = A.length;
  const cols = A[0]!.length;
  const big = Math.max(1, ...A.flat().map(Math.abs));
  let r = 0;
  for (let c = 0; c < cols && r < rows; c++) {
    let piv = r;
    for (let i = r + 1; i < rows; i++) if (Math.abs(A[i]![c]!) > Math.abs(A[piv]![c]!)) piv = i;
    if (Math.abs(A[piv]![c]!) < tol * big) continue;
    [A[r], A[piv]] = [A[piv]!, A[r]!];
    for (let i = r + 1; i < rows; i++) {
      const f = A[i]![c]! / A[r]![c]!;
      for (let j = c; j < cols; j++) A[i]![j] -= f * A[r]![j]!;
    }
    r++;
  }
  return r;
}

/** Exponentielle de matrice : mise à l'échelle, série de Taylor (24 termes), élévations au carré. */
export function expm(A: Mat): Mat {
  const n = A.length;
  const norm = Math.max(0, ...A.map((r) => r.reduce((s, a) => s + Math.abs(a), 0)));
  let k = 0;
  while (norm / 2 ** k > 0.25 && k < 60) k++;
  const B = matScale(A, 1 / 2 ** k);
  let term = eye(n);
  let sum = eye(n);
  for (let m = 1; m <= 24; m++) {
    term = matScale(matMul(term, B), 1 / m);
    sum = matLin(sum, term);
  }
  for (let i = 0; i < k; i++) sum = matMul(sum, sum);
  return sum;
}

/* ───────────── Champs, flots, crochets ───────────── */

/** Un pas de Runge–Kutta d'ordre 4. */
function rk4Step(F: Field, y: Vec, h: number): Vec {
  const k1 = F(y);
  const k2 = F(vadd(y, k1, h / 2));
  const k3 = F(vadd(y, k2, h / 2));
  const k4 = F(vadd(y, k3, h));
  return y.map((v, i) => v + (h / 6) * (k1[i]! + 2 * k2[i]! + 2 * k3[i]! + k4[i]!));
}

/** Nombre de pas pour un pas au plus `hMax`. */
export const stepsFor = (t: number, hMax = 0.005): number => Math.max(4, Math.ceil(Math.abs(t) / hMax));

/** Point Φ_t(p) du flot de F, par Runge–Kutta d'ordre 4. */
export function rk4(F: Field, p: Vec, t: number, steps = stepsFor(t)): Vec {
  const h = t / steps;
  let y = p.slice();
  for (let s = 0; s < steps; s++) y = rk4Step(F, y, h);
  return y;
}

/** Jacobienne J[i][j] = ∂F_i/∂x_j par différences centrées. */
export function jacobian(F: Field, p: Vec, h = 1e-6): Mat {
  const cols = p.map((_, j) => {
    const a = p.slice();
    a[j] += h;
    const b = p.slice();
    b[j] -= h;
    const fa = F(a);
    const fb = F(b);
    return fa.map((v, i) => (v - fb[i]!) / (2 * h));
  });
  return transpose(cols);
}

/** Crochet du cours, [X,Y](f) = X(Yf) − Y(Xf), soit [X,Y] = Y′X − X′Y ; jacobiennes numériques. */
export const bracketNumeric = (X: Field, Y: Field, p: Vec): Vec => vadd(matVec(jacobian(Y, p), X(p)), matVec(jacobian(X, p), Y(p)), -1);

/* ───────────── Rotations ───────────── */

export const hat = (w: Vec): Mat => [
  [0, -w[2]!, w[1]!],
  [w[2]!, 0, -w[0]!],
  [-w[1]!, w[0]!, 0],
];
export const vee = (W: Mat): Vec => [W[2]![1]!, W[0]![2]!, W[1]![0]!];

/** Formule de Rodrigues : exp(θû) = I + sin θ û + (1 − cos θ) û², u normalisé. */
export function rodrigues(u: Vec, theta: number): Mat {
  const U = hat(unit(u));
  return matLin(matLin(eye(3), matScale(U, Math.sin(theta))), matScale(matMul(U, U), 1 - Math.cos(theta)));
}

/** Angle d'une rotation, dans [0, π], lu sur la trace. */
export const rotationAngle = (R: Mat): number => Math.acos(Math.min(1, Math.max(-1, (trace(R) - 1) / 2)));

/** Axe d'une rotation d'angle dans ]0, π[, lu sur R − Rᵀ ; null près de 0 ou de π. */
export function rotationAxis(R: Mat): Vec | null {
  const w = vee(matLin(R, transpose(R), -1));
  const n = vnorm(w);
  return n > 1e-9 ? w.map((v) => v / n) : null;
}

/* ───────────── Quaternions ───────────── */

export const qmul = (a: Quat, b: Quat): Quat => [
  a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
  a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
  a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
  a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0],
];
export const qconj = (q: Quat): Quat => [q[0], -q[1], -q[2], -q[3]];
export const qneg = (q: Quat): Quat => [-q[0], -q[1], -q[2], -q[3]];
export const qdot = (a: Quat, b: Quat): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];

/** q = cos(θ/2) + u sin(θ/2), u unitaire. */
export function qFromAxisAngle(u: Vec, theta: number): Quat {
  const n = unit(u);
  const s = Math.sin(theta / 2);
  return [Math.cos(theta / 2), n[0]! * s, n[1]! * s, n[2]! * s];
}

/** Matrice de v ↦ q v q⁻¹ (q unitaire), colonne par colonne. */
export function rotationOfQuat(q: Quat): Mat {
  const cols = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ].map((e) => qmul(qmul(q, [0, e[0]!, e[1]!, e[2]!]), qconj(q)).slice(1));
  return transpose(cols);
}

/** Un antécédent de R par p : S³ → SO(3), défini au signe près (méthode de Shepperd). */
export function quatOfRotation(R: Mat): Quat {
  const t = trace(R);
  const r = (i: number, j: number) => R[i]![j]!;
  const cands = [t, r(0, 0), r(1, 1), r(2, 2)];
  const i = cands.indexOf(Math.max(...cands));
  if (i === 0) {
    const s = 2 * Math.sqrt(1 + t);
    return [s / 4, (r(2, 1) - r(1, 2)) / s, (r(0, 2) - r(2, 0)) / s, (r(1, 0) - r(0, 1)) / s];
  }
  if (i === 1) {
    const s = 2 * Math.sqrt(1 + r(0, 0) - r(1, 1) - r(2, 2));
    return [(r(2, 1) - r(1, 2)) / s, s / 4, (r(0, 1) + r(1, 0)) / s, (r(0, 2) + r(2, 0)) / s];
  }
  if (i === 2) {
    const s = 2 * Math.sqrt(1 + r(1, 1) - r(0, 0) - r(2, 2));
    return [(r(0, 2) - r(2, 0)) / s, (r(0, 1) + r(1, 0)) / s, s / 4, (r(1, 2) + r(2, 1)) / s];
  }
  const s = 2 * Math.sqrt(1 + r(2, 2) - r(0, 0) - r(1, 1));
  return [(r(1, 0) - r(0, 1)) / s, (r(0, 2) + r(2, 0)) / s, (r(1, 2) + r(2, 1)) / s, s / 4];
}

/**
 * Relèvement pas à pas dans S³ d'un chemin de rotations γ : [0, T] → SO(3) issu de I :
 * à chaque pas, on choisit parmi les deux antécédents ±q celui qui prolonge continûment
 * le précédent. Renvoie les points du relevé, issu de 1.
 */
export function liftRotationPath(gamma: (t: number) => Mat, T: number, steps = 720): Quat[] {
  const out: Quat[] = [[1, 0, 0, 0]];
  for (let s = 1; s <= steps; s++) {
    const c = quatOfRotation(gamma((s / steps) * T));
    out.push(qdot(c, out[s - 1]!) >= 0 ? c : qneg(c));
  }
  return out;
}

/* ───────────── Systèmes H = p²/2 + V(q) ───────────── */

export type SchemeId = 'euler' | 'symplectique' | 'verlet';

/** Un pas d'un schéma, pour la force f(q) = −V′(q). */
export function schemeStep(scheme: SchemeId, h: number, [q, p]: Vec, force: (q: number) => number): Vec {
  if (scheme === 'euler') return [q! + h * p!, p! + h * force(q!)];
  if (scheme === 'symplectique') {
    const p1 = p! + h * force(q!);
    return [q! + h * p1, p1];
  }
  const ph = p! + (h / 2) * force(q!);
  const q1 = q! + h * ph;
  return [q1, ph + (h / 2) * force(q1)];
}

/** Aire orientée d'un polygone (formule du lacet). */
export function shoelace(poly: Vec[]): number {
  let s = 0;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i]!;
    const b = poly[(i + 1) % poly.length]!;
    s += a[0]! * b[1]! - b[0]! * a[1]!;
  }
  return s / 2;
}
