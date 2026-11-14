/**
 * Matrices rationnelles exactes. Les hypothèses vérifiées ici (symétrie, caractère
 * défini positif, coercivité avec une constante donnée) sont décidées exactement,
 * par le critère de Sylvester : aucune tolérance numérique n'intervient.
 */
import * as Q from './rational';
import type { Rational } from './rational';

export type Matrix = Rational[][];
export type Vector = Rational[];

export const fromIntegers = (m: (number | bigint)[][]): Matrix => m.map((r) => r.map((v) => Q.rat(v)));

export const dims = (m: Matrix): [number, number] => [m.length, m[0]?.length ?? 0];
export const isSquare = (m: Matrix): boolean => m.every((r) => r.length === m.length);

export function transpose(m: Matrix): Matrix {
  return m[0]!.map((_, j) => m.map((r) => r[j]!));
}

export function matAdd(a: Matrix, b: Matrix): Matrix {
  return a.map((r, i) => r.map((v, j) => Q.add(v, b[i]![j]!)));
}

export function matSub(a: Matrix, b: Matrix): Matrix {
  return a.map((r, i) => r.map((v, j) => Q.sub(v, b[i]![j]!)));
}

export function matScale(c: Rational, a: Matrix): Matrix {
  return a.map((r) => r.map((v) => Q.mul(c, v)));
}

export function matMul(a: Matrix, b: Matrix): Matrix {
  return a.map((r) =>
    b[0]!.map((_, j) => r.reduce((s, v, k) => Q.add(s, Q.mul(v, b[k]![j]!)), Q.ZERO)),
  );
}

export function matVec(a: Matrix, x: Vector): Vector {
  return a.map((r) => r.reduce((s, v, k) => Q.add(s, Q.mul(v, x[k]!)), Q.ZERO));
}

export function dot(x: Vector, y: Vector): Rational {
  return x.reduce((s, v, i) => Q.add(s, Q.mul(v, y[i]!)), Q.ZERO);
}

export function identity(n: number): Matrix {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? Q.ONE : Q.ZERO)),
  );
}

export function isSymmetric(m: Matrix): boolean {
  return isSquare(m) && m.every((r, i) => r.every((v, j) => Q.eq(v, m[j]![i]!)));
}

/** Déterminant exact par élimination de Gauss à pivot non nul. */
export function det(m: Matrix): Rational {
  const a = m.map((r) => [...r]);
  const n = a.length;
  let result = Q.ONE;
  for (let c = 0; c < n; c++) {
    let p = c;
    while (p < n && Q.isZero(a[p]![c]!)) p++;
    if (p === n) return Q.ZERO;
    if (p !== c) {
      [a[p], a[c]] = [a[c]!, a[p]!];
      result = Q.neg(result);
    }
    const pivot = a[c]![c]!;
    result = Q.mul(result, pivot);
    for (let i = c + 1; i < n; i++) {
      const f = Q.div(a[i]![c]!, pivot);
      for (let j = c; j < n; j++) a[i]![j] = Q.sub(a[i]![j]!, Q.mul(f, a[c]![j]!));
    }
  }
  return result;
}

/** Résout Mx = b exactement ; renvoie null si M est singulière. */
export function solve(m: Matrix, b: Vector): Vector | null {
  const n = m.length;
  const a = m.map((r, i) => [...r, b[i]!]);
  for (let c = 0; c < n; c++) {
    let p = c;
    while (p < n && Q.isZero(a[p]![c]!)) p++;
    if (p === n) return null;
    [a[p], a[c]] = [a[c]!, a[p]!];
    const pivot = a[c]![c]!;
    for (let j = c; j <= n; j++) a[c]![j] = Q.div(a[c]![j]!, pivot);
    for (let i = 0; i < n; i++) {
      if (i === c) continue;
      const f = a[i]![c]!;
      for (let j = c; j <= n; j++) a[i]![j] = Q.sub(a[i]![j]!, Q.mul(f, a[c]![j]!));
    }
  }
  return a.map((r) => r[n]!);
}

function submatrix(m: Matrix, keep: number[]): Matrix {
  return keep.map((i) => keep.map((j) => m[i]![j]!));
}

/** Critère de Sylvester : symétrique et tous les mineurs principaux dominants > 0. */
export function isPositiveDefinite(m: Matrix): boolean {
  if (!isSymmetric(m)) return false;
  for (let k = 1; k <= m.length; k++) {
    const keep = Array.from({ length: k }, (_, i) => i);
    if (!Q.isPos(det(submatrix(m, keep)))) return false;
  }
  return true;
}

/** Semi-définie positive : tous les mineurs principaux (pas seulement dominants) ≥ 0. */
export function isPositiveSemiDefinite(m: Matrix): boolean {
  if (!isSymmetric(m)) return false;
  const n = m.length;
  for (let mask = 1; mask < 1 << n; mask++) {
    const keep: number[] = [];
    for (let i = 0; i < n; i++) if (mask & (1 << i)) keep.push(i);
    if (!Q.isNonNeg(det(submatrix(m, keep)))) return false;
  }
  return true;
}

/** Partie symétrique (A + Aᵀ)/2. */
export function symmetricPart(a: Matrix): Matrix {
  return matScale(Q.rat(1, 2), matAdd(a, transpose(a)));
}

/**
 * Coercivité de la forme a(x, y) = xᵀAy pour le produit scalaire ⟨x, y⟩_G = xᵀGy :
 * a(x, x) ≥ α⟨x, x⟩_G pour tout x équivaut à (A + Aᵀ)/2 − αG semi-définie positive.
 * La forme quadratique ne voit que la partie symétrique de A.
 */
export function isCoerciveWith(a: Matrix, alpha: Rational, g: Matrix = identity(a.length)): boolean {
  return isPositiveSemiDefinite(matSub(symmetricPart(a), matScale(alpha, g)));
}

/** Existe-t-il α > 0 tel que a soit α-coercive ? Équivaut à : partie symétrique définie positive. */
export function isCoercive(a: Matrix): boolean {
  return isPositiveDefinite(symmetricPart(a));
}
