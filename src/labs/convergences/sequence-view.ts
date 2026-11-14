/**
 * Lecture des données de `core/math/sequences` pour l'affichage du laboratoire C :
 * borne du curseur, fenêtres de tracé, séries en fonction de n, valeur de la limite
 * faible. Aucune affirmation nouvelle ici : on évalue les formes fermées fournies.
 */
import type { SequenceExample } from '@/core/math/sequences';

/** Plus grand indice proposé au curseur et sur l'évolution en n. */
export const N_MAX = 60;

export type Point = [number, number];

/**
 * Borne du curseur. Pour la translation, uₙ est portée par [n − 1, n + 1] : elle n'est
 * entièrement visible dans la fenêtre [a, b] que si n + 1 ≤ b.
 */
export function maxIndex(ex: SequenceExample): number {
  return ex.id === 'translation' ? Math.max(1, Math.floor(ex.domain[1]) - 1) : N_MAX;
}

/** Lettre de la suite dans son libellé (u ou v), pour nommer les quantités sans ambiguïté. */
export function sequenceLetter(ex: SequenceExample): string {
  return /^([a-z])_n/.exec(ex.label)?.[1] ?? 'u';
}

/**
 * Valeur d'une limite faible constante écrite en LaTeX : entier (« 0 », « 1 ») ou fraction
 * (« \tfrac12 », « \frac{3}{4} »). Toute autre écriture renvoie null, et la limite n'est
 * alors pas tracée. Les données n'exposent que le LaTeX : on évite d'en recopier la valeur.
 */
export function constantLimitValue(tex: string): number | null {
  const s = tex.replace(/\s+/g, '');
  if (/^\d+$/.test(s)) return Number(s);
  const m = /^\\[dt]?frac(?:(\d)(\d)|\{(\d+)\}\{(\d+)\})$/.exec(s);
  if (!m) return null;
  const den = Number(m[2] ?? m[4]);
  return den === 0 ? null : Number(m[1] ?? m[3]) / den;
}

function padded(lo: number, hi: number): Point {
  const d = hi - lo || 1;
  return [lo - 0.08 * d, hi + 0.08 * d];
}

/** Fenêtre verticale commune à n = 1…nMax, zéro inclus : l'échelle ne bouge pas quand n varie. */
export function valueRange(ex: SequenceExample, nMax: number, limit: number | null, samples = 400): Point {
  let lo = Math.min(0, limit ?? 0);
  let hi = Math.max(0, limit ?? 0);
  const [a, b] = ex.domain;
  for (let n = 1; n <= nMax; n++) {
    for (let i = 0; i <= samples; i++) {
      const v = ex.evaluate(n, a + ((b - a) * i) / samples);
      if (Number.isFinite(v)) {
        lo = Math.min(lo, v);
        hi = Math.max(hi, v);
      }
    }
  }
  return padded(lo, hi);
}

export interface Evolution {
  distance: Point[];
  pairings: { id: string; label: string; points: Point[] }[];
  range: Point;
}

/** Valeurs exactes de ‖uₙ − u‖² et de ∫ uₙ g pour n = 1…nTo (valeurs non finies écartées). */
export function evolution(ex: SequenceExample, nTo = N_MAX): Evolution {
  const ns = Array.from({ length: nTo }, (_, i) => i + 1);
  const series = (f: (n: number) => number): Point[] =>
    ns.map((n): Point => [n, f(n)]).filter(([, v]) => Number.isFinite(v));
  const distance = series(ex.distanceToLimitSq);
  const pairings = ex.pairings.map((p) => ({ id: p.id, label: p.label, points: series(p.value) }));
  const values = [...distance, ...pairings.flatMap((p) => p.points)].map(([, v]) => v);
  return { distance, pairings, range: padded(Math.min(0, ...values), Math.max(0, ...values)) };
}
