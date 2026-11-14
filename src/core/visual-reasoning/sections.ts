/**
 * Moteur de coupes, de projections et de courbes de niveau pour une fonction u(x, y).
 * Toutes les vues d'une même surface (3D, niveaux, coupes x = x₀ et y = y₀, formule)
 * sont produites à partir d'une seule grille échantillonnée, donc d'un même état.
 */
export type ScalarField = (x: number, y: number) => number;

export interface Grid {
  nx: number;
  ny: number;
  x: [number, number];
  y: [number, number];
  /** values[j][i] = u(x_i, y_j). */
  values: number[][];
  min: number;
  max: number;
}

export const gridX = (g: Grid, i: number): number => g.x[0] + ((g.x[1] - g.x[0]) * i) / (g.nx - 1);
export const gridY = (g: Grid, j: number): number => g.y[0] + ((g.y[1] - g.y[0]) * j) / (g.ny - 1);

const cache = new Map<string, Grid>();
const CACHE_MAX = 48;

/**
 * Échantillonne u sur une grille régulière. `key` identifie la fonction et ses paramètres :
 * deux appels avec la même clé et la même résolution réutilisent la même grille.
 */
export function sampleGrid(u: ScalarField, n: number, x: [number, number], y: [number, number], key?: string, cap = Infinity): Grid {
  const id = key ? `${key}|${n}|${x}|${y}|${cap}` : null;
  if (id && cache.has(id)) return cache.get(id)!;
  const values: number[][] = [];
  let min = Infinity;
  let max = -Infinity;
  for (let j = 0; j < n; j++) {
    const row: number[] = [];
    const yj = y[0] + ((y[1] - y[0]) * j) / (n - 1);
    for (let i = 0; i < n; i++) {
      const xi = x[0] + ((x[1] - x[0]) * i) / (n - 1);
      let v = u(xi, yj);
      if (!Number.isFinite(v)) v = Math.sign(v || 1) * cap;
      v = Math.max(-cap, Math.min(cap, v));
      row.push(v);
      if (v < min) min = v;
      if (v > max) max = v;
    }
    values.push(row);
  }
  const g: Grid = { nx: n, ny: n, x, y, values, min, max };
  if (id) {
    if (cache.size >= CACHE_MAX) cache.delete(cache.keys().next().value!);
    cache.set(id, g);
  }
  return g;
}

/** Coupe x = x₀ : la fonction y ↦ u(x₀, y), échantillonnée. */
export function sliceAtX(u: ScalarField, x0: number, y: [number, number], n = 200): [number, number][] {
  return Array.from({ length: n + 1 }, (_, k) => {
    const yy = y[0] + ((y[1] - y[0]) * k) / n;
    return [yy, u(x0, yy)] as [number, number];
  });
}

/** Coupe y = y₀ : la fonction x ↦ u(x, y₀), échantillonnée. */
export function sliceAtY(u: ScalarField, y0: number, x: [number, number], n = 200): [number, number][] {
  return Array.from({ length: n + 1 }, (_, k) => {
    const xx = x[0] + ((x[1] - x[0]) * k) / n;
    return [xx, u(xx, y0)] as [number, number];
  });
}

export type Segment = [[number, number], [number, number]];

/**
 * Courbe de niveau u = c par « marching squares », avec interpolation linéaire sur les
 * arêtes. Pour u de classe C², l'écart |u(P) − c| en un point P obtenu est O(h²), h le pas.
 */
export function contour(g: Grid, c: number): Segment[] {
  const segs: Segment[] = [];
  const interp = (x1: number, y1: number, v1: number, x2: number, y2: number, v2: number): [number, number] => {
    const t = v1 === v2 ? 0.5 : (c - v1) / (v2 - v1);
    return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];
  };
  for (let j = 0; j < g.ny - 1; j++) {
    for (let i = 0; i < g.nx - 1; i++) {
      const x0 = gridX(g, i);
      const x1 = gridX(g, i + 1);
      const y0 = gridY(g, j);
      const y1 = gridY(g, j + 1);
      const a = g.values[j]![i]!;
      const b = g.values[j]![i + 1]!;
      const cc = g.values[j + 1]![i + 1]!;
      const d = g.values[j + 1]![i]!;
      const pts: [number, number][] = [];
      if (a < c !== b < c) pts.push(interp(x0, y0, a, x1, y0, b));
      if (b < c !== cc < c) pts.push(interp(x1, y0, b, x1, y1, cc));
      if (cc < c !== d < c) pts.push(interp(x1, y1, cc, x0, y1, d));
      if (d < c !== a < c) pts.push(interp(x0, y1, d, x0, y0, a));
      if (pts.length === 2) segs.push([pts[0]!, pts[1]!]);
      else if (pts.length === 4) {
        segs.push([pts[0]!, pts[1]!]);
        segs.push([pts[2]!, pts[3]!]);
      }
    }
  }
  return segs;
}

/** Niveaux régulièrement espacés entre le minimum et le maximum de la grille. */
export function levels(g: Grid, count: number): number[] {
  if (g.max - g.min < 1e-12) return [];
  return Array.from({ length: count }, (_, k) => g.min + ((g.max - g.min) * (k + 1)) / (count + 1));
}

/**
 * Jeton d'annulation : un calcul lancé pour un ancien paramètre est abandonné dès qu'un
 * nouveau paramètre arrive (changement rapide d'un curseur).
 */
export function createCanceller() {
  let current = 0;
  return {
    next(): number {
      current += 1;
      return current;
    },
    isCurrent(token: number): boolean {
      return token === current;
    },
  };
}
