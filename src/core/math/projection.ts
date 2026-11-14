/**
 * Projections explicites dans le plan, pour le laboratoire A.
 * Les formules fermées sont exactes (à l'arithmétique flottante près) ; la version
 * rationnelle sert aux tests exacts.
 */
import * as Q from './rational';
import type { Rational } from './rational';

export interface Vec2 {
  x: number;
  y: number;
}

export const dot = (a: Vec2, b: Vec2): number => a.x * b.x + a.y * b.y;
export const sub = (a: Vec2, b: Vec2): Vec2 => ({ x: a.x - b.x, y: a.y - b.y });
export const add = (a: Vec2, b: Vec2): Vec2 => ({ x: a.x + b.x, y: a.y + b.y });
export const scale = (c: number, a: Vec2): Vec2 => ({ x: c * a.x, y: c * a.y });
export const norm = (a: Vec2): number => Math.hypot(a.x, a.y);
export const dist = (a: Vec2, b: Vec2): number => norm(sub(a, b));

export type ConvexFamily =
  /** Demi-plan fermé {z : ⟨n, z⟩ ≤ c}, avec n non nul. */
  | { kind: 'demi-plan'; n: Vec2; c: number }
  /** Rectangle fermé [x0, x1] × [y0, y1]. */
  | { kind: 'rectangle'; x0: number; x1: number; y0: number; y1: number }
  /** Disque fermé de centre et de rayon donnés. */
  | { kind: 'disque'; center: Vec2; r: number }
  /** Droite vectorielle engendrée par d, non nul. */
  | { kind: 'sous-espace'; d: Vec2 };

export function contains(K: ConvexFamily, z: Vec2, eps = 1e-9): boolean {
  switch (K.kind) {
    case 'demi-plan':
      return dot(K.n, z) <= K.c + eps;
    case 'rectangle':
      return z.x >= K.x0 - eps && z.x <= K.x1 + eps && z.y >= K.y0 - eps && z.y <= K.y1 + eps;
    case 'disque':
      return dist(z, K.center) <= K.r + eps;
    case 'sous-espace':
      return Math.abs(K.d.x * z.y - K.d.y * z.x) <= eps * Math.max(1, norm(K.d));
  }
}

/** Projection orthogonale P_K x, formule fermée pour chaque famille. */
export function project(K: ConvexFamily, x: Vec2): Vec2 {
  switch (K.kind) {
    case 'demi-plan': {
      const excess = dot(K.n, x) - K.c;
      if (excess <= 0) return x;
      return sub(x, scale(excess / dot(K.n, K.n), K.n));
    }
    case 'rectangle':
      return { x: Math.min(K.x1, Math.max(K.x0, x.x)), y: Math.min(K.y1, Math.max(K.y0, x.y)) };
    case 'disque': {
      const v = sub(x, K.center);
      const d = norm(v);
      return d <= K.r ? x : add(K.center, scale(K.r / d, v));
    }
    case 'sous-espace':
      return scale(dot(x, K.d) / dot(K.d, K.d), K.d);
  }
}

/** Quantité ⟨x − p, z − p⟩, négative ou nulle pour tout z de K lorsque p = P_K x. */
export const characteristic = (x: Vec2, p: Vec2, z: Vec2): number => dot(sub(x, p), sub(z, p));

export type Non_Hypothesis =
  /** Convexe non fermé : disque ouvert ; le point à distance minimale n'existe pas si x est hors du disque fermé. */
  | { kind: 'disque-ouvert'; center: Vec2; r: number }
  /** Fermé non convexe : cercle ; l'unicité échoue au centre. */
  | { kind: 'cercle'; center: Vec2; r: number }
  /** Fermé non convexe : deux disques fermés ; l'unicité échoue sur la médiatrice. */
  | { kind: 'deux-disques'; c1: Vec2; c2: Vec2; r: number };

export interface MinimizationReport {
  /** L'infimum de la distance à x sur l'ensemble. */
  infimum: number;
  /** L'infimum est-il atteint ? */
  attained: boolean;
  /** Le minimiseur est-il unique lorsqu'il existe ? */
  unique: boolean;
  /** Minimiseurs, s'ils sont en nombre fini. */
  minimizers: Vec2[];
}

/** Résultat exact du problème de minimisation pour les ensembles hors hypothèses. */
export function minimizationReport(K: Non_Hypothesis, x: Vec2, eps = 1e-6): MinimizationReport {
  switch (K.kind) {
    case 'disque-ouvert': {
      const d = dist(x, K.center);
      if (d < K.r) return { infimum: 0, attained: true, unique: true, minimizers: [x] };
      return { infimum: d - K.r, attained: false, unique: false, minimizers: [] };
    }
    case 'cercle': {
      const v = sub(x, K.center);
      const d = norm(v);
      if (d < eps) return { infimum: K.r, attained: true, unique: false, minimizers: [] };
      return {
        infimum: Math.abs(d - K.r),
        attained: true,
        unique: true,
        minimizers: [add(K.center, scale(K.r / d, v))],
      };
    }
    case 'deux-disques': {
      const toDisc = (c: Vec2): { value: number; point: Vec2 } => {
        const v = sub(x, c);
        const d = norm(v);
        return d <= K.r ? { value: 0, point: x } : { value: d - K.r, point: add(c, scale(K.r / d, v)) };
      };
      const a = toDisc(K.c1);
      const b = toDisc(K.c2);
      if (Math.abs(a.value - b.value) < eps && a.value > eps) {
        return { infimum: a.value, attained: true, unique: false, minimizers: [a.point, b.point] };
      }
      const best = a.value <= b.value ? a : b;
      return { infimum: best.value, attained: true, unique: true, minimizers: [best.point] };
    }
  }
}

// ──────────────── Version rationnelle exacte (tests) ────────────────

export interface QVec2 {
  x: Rational;
  y: Rational;
}

export const qdot = (a: QVec2, b: QVec2): Rational => Q.add(Q.mul(a.x, b.x), Q.mul(a.y, b.y));
export const qsub = (a: QVec2, b: QVec2): QVec2 => ({ x: Q.sub(a.x, b.x), y: Q.sub(a.y, b.y) });

/** Projection exacte sur le demi-plan {z : ⟨n, z⟩ ≤ c}. */
export function projectHalfPlaneExact(n: QVec2, c: Rational, x: QVec2): QVec2 {
  const excess = Q.sub(qdot(n, x), c);
  if (!Q.isPos(excess)) return x;
  const t = Q.div(excess, qdot(n, n));
  return { x: Q.sub(x.x, Q.mul(t, n.x)), y: Q.sub(x.y, Q.mul(t, n.y)) };
}

/** Matrice exacte de la projection orthogonale sur la droite vectorielle engendrée par d. */
export function orthogonalProjectorExact(d: QVec2): Rational[][] {
  const nn = qdot(d, d);
  return [
    [Q.div(Q.mul(d.x, d.x), nn), Q.div(Q.mul(d.x, d.y), nn)],
    [Q.div(Q.mul(d.y, d.x), nn), Q.div(Q.mul(d.y, d.y), nn)],
  ];
}
