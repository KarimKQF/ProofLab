/**
 * Algèbre linéaire en dimension 2 ou 3, en virgule flottante, pour les scènes.
 * Les propriétés présentées comme des hypothèses (définie positivité, coercivité)
 * sont décidées exactement par `core/math/matrix.ts` ; ce module sert au tracé.
 */
export type Vec = number[];
export type Mat = number[][];

export const dot = (a: readonly number[], b: readonly number[]): number => a.reduce((s, v, i) => s + v * b[i]!, 0);
export const add = (a: Vec, b: Vec): Vec => a.map((v, i) => v + b[i]!);
export const sub = (a: Vec, b: Vec): Vec => a.map((v, i) => v - b[i]!);
export const scale = (c: number, a: Vec): Vec => a.map((v) => c * v);
export const norm = (a: Vec): number => Math.sqrt(dot(a, a));
export const dist = (a: Vec, b: Vec): number => norm(sub(a, b));
export const lerp = (a: Vec, b: Vec, t: number): Vec => a.map((v, i) => v + t * (b[i]! - v));
export const cross = (a: Vec, b: Vec): Vec => [a[1]! * b[2]! - a[2]! * b[1]!, a[2]! * b[0]! - a[0]! * b[2]!, a[0]! * b[1]! - a[1]! * b[0]!];

/** Vecteur unitaire orthogonal à u (u unitaire, dimension 2 ou 3). */
export function orthogonalUnit(u: Vec): Vec {
  if (u.length === 2) return [-u[1]!, u[0]!];
  const e = Math.abs(u[2]!) < 0.9 ? [0, 0, 1] : [1, 0, 0];
  const w = sub(e, scale(dot(e, u), u));
  return scale(1 / norm(w), w);
}

export const matVec = (m: Mat, v: Vec): Vec => m.map((row) => dot(row, v));
export const transpose = (m: Mat): Mat => m[0]!.map((_, j) => m.map((r) => r[j]!));
export const matMul = (a: Mat, b: Mat): Mat => a.map((row) => b[0]!.map((_, j) => row.reduce((s, v, k) => s + v * b[k]![j]!, 0)));

export function det(m: Mat): number {
  if (m.length === 2) return m[0]![0]! * m[1]![1]! - m[0]![1]! * m[1]![0]!;
  const [a, b, c] = m as [number[], number[], number[]];
  return a[0]! * (b[1]! * c[2]! - b[2]! * c[1]!) - a[1]! * (b[0]! * c[2]! - b[2]! * c[0]!) + a[2]! * (b[0]! * c[1]! - b[1]! * c[0]!);
}

/** Inverse par cofacteurs (dimension 2 ou 3) ; null si la matrice est singulière. */
export function inverse(m: Mat): Mat | null {
  const d = det(m);
  if (Math.abs(d) < 1e-14) return null;
  if (m.length === 2) {
    return [
      [m[1]![1]! / d, -m[0]![1]! / d],
      [-m[1]![0]! / d, m[0]![0]! / d],
    ];
  }
  const c = (i: number, j: number) => {
    const rows = [0, 1, 2].filter((r) => r !== i);
    const cols = [0, 1, 2].filter((k) => k !== j);
    const minor = rows[0]! !== undefined ? m[rows[0]!]![cols[0]!]! * m[rows[1]!]![cols[1]!]! - m[rows[0]!]![cols[1]!]! * m[rows[1]!]![cols[0]!]! : 0;
    return ((i + j) % 2 === 0 ? 1 : -1) * minor;
  };
  return [0, 1, 2].map((i) => [0, 1, 2].map((j) => c(j, i) / d));
}

/** Factorisation de Cholesky G = L Lᵀ (L triangulaire inférieure) ; null si G n'est pas définie positive. */
export function cholesky(g: Mat): Mat | null {
  const n = g.length;
  const l: Mat = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let s = g[i]![j]!;
      for (let k = 0; k < j; k++) s -= l[i]![k]! * l[j]![k]!;
      if (i === j) {
        if (s <= 1e-14) return null;
        l[i]![i] = Math.sqrt(s);
      } else l[i]![j] = s / l[j]![j]!;
    }
  }
  return l;
}

/** Valeurs propres d'une matrice symétrique (méthode de Jacobi), par ordre croissant. */
export function symEigenvalues(sym: Mat, sweeps = 60): number[] {
  const n = sym.length;
  const a = sym.map((r) => [...r]);
  for (let s = 0; s < sweeps; s++) {
    let off = 0;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += a[p]![q]! ** 2;
    if (off < 1e-24) break;
    for (let p = 0; p < n; p++) {
      for (let q = p + 1; q < n; q++) {
        const apq = a[p]![q]!;
        if (Math.abs(apq) < 1e-300) continue;
        const theta = (a[q]![q]! - a[p]![p]!) / (2 * apq);
        const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
        const c = 1 / Math.sqrt(t * t + 1);
        const sn = t * c;
        for (let k = 0; k < n; k++) {
          const akp = a[k]![p]!;
          const akq = a[k]![q]!;
          a[k]![p] = c * akp - sn * akq;
          a[k]![q] = sn * akp + c * akq;
        }
        for (let k = 0; k < n; k++) {
          const apk = a[p]![k]!;
          const aqk = a[q]![k]!;
          a[p]![k] = c * apk - sn * aqk;
          a[q]![k] = sn * apk + c * aqk;
        }
      }
    }
  }
  return a.map((r, i) => r[i]!).sort((x, y) => x - y);
}

export const symPart = (a: Mat): Mat => a.map((row, i) => row.map((v, j) => (v + a[j]![i]!) / 2));

/**
 * Plus petite constante α telle que xᵀAx ≥ α xᵀGx : plus petite valeur propre de
 * L⁻¹ S L⁻ᵀ, où G = LLᵀ et S est la partie symétrique de A.
 */
export function coercivityConstant(a: Mat, g: Mat): number {
  const l = cholesky(g);
  if (!l) return Number.NaN;
  const li = inverse(l)!;
  const m = matMul(matMul(li, symPart(a)), transpose(li));
  return symEigenvalues(symPart(m))[0]!;
}
