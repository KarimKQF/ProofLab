/**
 * Aides mathématiques des planches interactives : vecteurs, rotations, sphère,
 * échantillonnage. Les outils de groupes de Lie (exponentielle, Rodrigues, quaternions,
 * Runge–Kutta) viennent du noyau du laboratoire G.
 */
export {
  expm,
  hat,
  liftRotationPath,
  matMul,
  matVec,
  qFromAxisAngle,
  qmul,
  rk4,
  rodrigues,
  rotationOfQuat,
  shoelace,
  unit,
  vadd,
  vcross,
  vdist,
  vdot,
  vnorm,
  type Mat,
  type Quat,
  type Vec,
} from '@/core/visual-reasoning/lie-core';

export const TAU = 2 * Math.PI;

export const clamp = (v: number, a: number, b: number): number => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
export const linspace = (a: number, b: number, n: number): number[] => Array.from({ length: n + 1 }, (_, k) => a + ((b - a) * k) / n);
/** Angle ramené dans [0, 2π[. */
export const mod2pi = (a: number): number => ((a % TAU) + TAU) % TAU;

/** Rotation plane d'angle a appliquée à (x, y). */
export const rot = (a: number, [x, y]: readonly number[]): [number, number] => [Math.cos(a) * x! - Math.sin(a) * y!, Math.sin(a) * x! + Math.cos(a) * y!];

/** Point de la sphère unité de colatitude θ et de longitude φ. */
export const sph = (theta: number, phi: number): [number, number, number] => [Math.sin(theta) * Math.cos(phi), Math.sin(theta) * Math.sin(phi), Math.cos(theta)];

/** Rotation de v autour de l'axe unitaire u, d'angle a (formule de Rodrigues appliquée au vecteur). */
export function rotAxis(u: readonly number[], a: number, v: readonly number[]): [number, number, number] {
  const c = Math.cos(a);
  const s = Math.sin(a);
  const d = u[0]! * v[0]! + u[1]! * v[1]! + u[2]! * v[2]!;
  const cr = [u[1]! * v[2]! - u[2]! * v[1]!, u[2]! * v[0]! - u[0]! * v[2]!, u[0]! * v[1]! - u[1]! * v[0]!];
  return [0, 1, 2].map((i) => v[i]! * c + cr[i]! * s + u[i]! * d * (1 - c)) as [number, number, number];
}

/** Grand arc de la sphère unité entre a et b (unitaires), n + 1 points. */
export function greatArc(a: readonly number[], b: readonly number[], n = 48): [number, number, number][] {
  const d = Math.min(1, Math.max(-1, a[0]! * b[0]! + a[1]! * b[1]! + a[2]! * b[2]!));
  const w = Math.acos(d);
  if (w < 1e-9) return [[a[0]!, a[1]!, a[2]!]];
  return Array.from({ length: n + 1 }, (_, k) => {
    const t = k / n;
    const s1 = Math.sin((1 - t) * w) / Math.sin(w);
    const s2 = Math.sin(t * w) / Math.sin(w);
    return [s1 * a[0]! + s2 * b[0]!, s1 * a[1]! + s2 * b[1]!, s1 * a[2]! + s2 * b[2]!];
  });
}

/** Courbe plane échantillonnée t ↦ f(t). */
export const sampleCurve = (f: (t: number) => [number, number], a: number, b: number, n = 240): [number, number][] => Array.from({ length: n + 1 }, (_, k) => f(a + ((b - a) * k) / n));

/** Intégrale de f sur [a, b] par la méthode de Simpson composite (n pair). */
export function simpson(f: (x: number) => number, a: number, b: number, n = 400): number {
  const m = n % 2 ? n + 1 : n;
  const h = (b - a) / m;
  let s = f(a) + f(b);
  for (let k = 1; k < m; k++) s += (k % 2 ? 4 : 2) * f(a + k * h);
  return (s * h) / 3;
}
