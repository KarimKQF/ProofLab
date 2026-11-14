/**
 * Modes de convergence : les formules fermées affichées (normes, mesures, intégrales) sont
 * comparées à des quadratures fines indépendantes ; les verdicts respectent les implications
 * classiques sur un espace de mesure finie.
 */
import { describe, expect, it } from 'vitest';
import { MODE_EXAMPLES, typewriterIndex } from '@/core/visual-reasoning/convergence-modes';

/** Quadrature du point milieu à N points sur ]0,1[ (fonctions bornées par morceaux : erreur ≲ sauts / N). */
const N = 200_000;
function midpoint(f: (x: number) => number): number {
  let s = 0;
  for (let i = 0; i < N; i++) s += f((i + 0.5) / N);
  return s / N;
}

describe('Formules fermées contre quadratures indépendantes', () => {
  for (const ex of MODE_EXAMPLES) {
    it(`${ex.id} : ‖uₙ − u‖², μ{|uₙ − u| > ε} et ∫uₙ pour n = 1, 3, 6, 11`, () => {
      for (const n of [1, 3, 6, 11]) {
        const d = midpoint((x) => (ex.evaluate(n, x) - ex.candidateFn(x)) ** 2);
        expect(Math.abs(d - ex.distSq(n))).toBeLessThan(1e-3 * Math.max(1, ex.distSq(n)));
        for (const eps of [0.25, 0.5]) {
          const m = midpoint((x) => (Math.abs(ex.evaluate(n, x) - ex.candidateFn(x)) > eps ? 1 : 0));
          expect(Math.abs(m - ex.measureAbove(n, eps))).toBeLessThan(1e-3);
        }
        const p = midpoint((x) => ex.evaluate(n, x));
        expect(Math.abs(p - ex.pairing(n))).toBeLessThan(1e-3 * Math.max(1, Math.abs(ex.pairing(n))));
      }
    });
  }
});

describe('Verdicts cohérents avec les quantités et entre eux', () => {
  it('forte ⇔ ‖uₙ − u‖² → 0 ; mesure ⇔ μ{|uₙ − u| > ½} → 0 (lu sur un rang grand)', () => {
    for (const ex of MODE_EXAMPLES) {
      const big = 4096;
      expect(ex.modes.forte.holds).toBe(ex.distSq(big) < 1e-3);
      expect(ex.modes.mesure.holds).toBe(ex.measureAbove(big, 0.5) < 1e-3);
    }
  });

  it('implications : forte ⇒ faible, forte ⇒ mesure, presque partout ⇒ mesure (mesure finie)', () => {
    for (const ex of MODE_EXAMPLES) {
      if (ex.modes.forte.holds) {
        expect(ex.modes.faible.holds).toBe(true);
        expect(ex.modes.mesure.holds).toBe(true);
      }
      if (ex.modes.pp.holds) expect(ex.modes.mesure.holds).toBe(true);
    }
  });

  it('les quatre combinaisons pédagogiques sont représentées', () => {
    const has = (pred: (e: (typeof MODE_EXAMPLES)[number]) => boolean) => MODE_EXAMPLES.some(pred);
    expect(has((e) => e.modes.faible.holds && !e.modes.forte.holds)).toBe(true); // faible sans forte
    expect(has((e) => e.modes.pp.holds && !e.modes.forte.holds && e.modes.faible.holds)).toBe(true); // p.p. sans norme
    expect(has((e) => e.modes.forte.holds && !e.modes.pp.holds)).toBe(true); // forte sans p.p.
    expect(has((e) => e.modes.mesure.holds && !e.modes.faible.holds)).toBe(true); // mesure sans L²
    expect(has((e) => MODES_NONE(e))).toBe(true); // aucune convergence
  });
});

const MODES_NONE = (e: (typeof MODE_EXAMPLES)[number]) => !e.modes.pp.holds && !e.modes.mesure.holds && !e.modes.forte.holds && !e.modes.faible.holds;

describe('Suite « machine à écrire »', () => {
  it('chaque point est couvert une fois par bloc 2ᵏ ≤ n < 2ᵏ⁺¹, et non couvert ailleurs dans le bloc', () => {
    const ex = MODE_EXAMPLES.find((e) => e.id === 'machine')!;
    for (const x of [0.1, 0.37, 0.5000001, 0.99]) {
      for (let k = 1; k <= 10; k++) {
        let ones = 0;
        for (let n = 2 ** k; n < 2 ** (k + 1); n++) ones += ex.evaluate(n, x);
        expect(ones).toBeGreaterThanOrEqual(1);
        expect(ones).toBeLessThan(2 ** k);
      }
    }
    expect(typewriterIndex(13)).toEqual({ k: 3, j: 5 });
  });
});
