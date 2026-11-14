/**
 * Scène « Riesz et Lax–Milgram » : valeurs de référence exactes, propriétés géométriques
 * (tangence, ellipsoïde unité, changement de base) et distinction des trois situations
 * sans coercivité. Tolérance flottante : 1e−9 sauf mention contraire.
 */
import { describe, expect, it } from 'vitest';
import * as Q from '@/core/math/rational';
import { dot, matVec, norm, type Mat, type Vec } from '@/core/visual-reasoning/linalg';
import {
  alphaOptimal,
  choleskyMorph,
  continuityOptimal,
  deriveRiesz,
  innerG,
  leadingMinors,
  PRESETS_3D,
  quadraticLevel,
  quadraticNature,
  rieszExact,
  rieszReadout,
  rieszSection,
  toQMatrix,
  unitBallMatrix,
  unitEllipse,
} from '@/core/visual-reasoning/riesz-scene';
import { PRESETS } from '@/labs/riesz/RieszLab';

const EPS = 1e-9;
const NONE = { g: false, l: false, m: false, alpha: false };
const ALL = { g: true, l: true, m: true, alpha: true };
const preset = (id: string) => {
  const p = PRESETS.find((x) => x.id === id)!;
  return { g: p.g.map((r) => [...r]), a: p.a.map((r) => [...r]), c: [...p.c], v: [2, 1] };
};

describe('Vecteur de Riesz et norme duale (valeurs exactes)', () => {
  it('G = [[2, 1/2], [1/2, 1]], c = (1, 2) : w = G⁻¹c = (0, 2), ‖ℓ‖ = 2', () => {
    const s = preset('g-oblique');
    const ex = rieszExact(s);
    expect(ex.spd).toBe(true);
    expect(ex.minors.map(Q.toString)).toEqual(['2', '7/4']);
    expect(ex.w!.map(Q.toString)).toEqual(['0', '2']);
    const d = deriveRiesz(s, ex);
    expect(d.dualNorm).toBeCloseTo(2, 12);
    // ℓ(x) = ⟨x, w⟩_G pour plusieurs x (identité, vraie pour tout x car Gw = c).
    for (const x of [[1, 0], [0, 1], [-3, 2.5], [0.7, -1.1]]) expect(Math.abs(dot(s.c, x) - innerG(s.g, x, d.w!))).toBeLessThan(EPS);
  });

  it('tangence : w/‖w‖_G est sur la boule unité de G, ℓ y vaut ‖ℓ‖ et ne le dépasse nulle part sur l’ellipse', () => {
    const s = preset('g-oblique');
    const d = deriveRiesz(s);
    const t = d.tangency!;
    expect(Math.abs(innerG(s.g, t, t) - 1)).toBeLessThan(EPS);
    expect(Math.abs(dot(s.c, t) - d.dualNorm)).toBeLessThan(EPS);
    const sup = Math.max(...unitEllipse(s.g, 3600).map((x) => dot(s.c, x)));
    expect(sup).toBeLessThanOrEqual(d.dualNorm + EPS);
    // Échantillonnage fin : l'écart au maximum est de l'ordre du pas angulaire au carré.
    expect(d.dualNorm - sup).toBeLessThan(1e-5);
  });

  it('mineurs dominants exacts en dimension 3', () => {
    const g = PRESETS_3D.find((p) => p.id === 'oblique-3')!.g;
    // Δ₂ = 2·1 − 1/4 = 7/4 ; Δ₃ = 2(1·3/2 − 1/16) − 1/2(1/2·3/2 − 0) + 0 = 23/8 − 3/8 = 5/2.
    expect(leadingMinors(toQMatrix(g)).map(Q.toString)).toEqual(['2', '7/4', '5/2']);
  });
});

describe('Ellipsoïde unité, changement de base, coupe', () => {
  it('x = L⁻ᵀu, |u| = 1 ⟹ xᵀGx = 1 (préréglage oblique de ℝ³)', () => {
    const g = PRESETS_3D.find((p) => p.id === 'oblique-3')!.g;
    const m = unitBallMatrix(g)!;
    for (const u of [[1, 0, 0], [0, 1, 0], [0, 0, 1], [0.6, 0.8, 0], [1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)]]) {
      const x = matVec(m, u);
      expect(Math.abs(innerG(g, x, x) - 1)).toBeLessThan(EPS);
    }
  });

  it('x ↦ Lᵀx envoie l’ellipse unité de G sur le cercle unité ; t = 0 est l’identité', () => {
    const g = preset('g-oblique').g;
    const lt = choleskyMorph(g, 1)!;
    for (const x of unitEllipse(g, 24)) expect(Math.abs(norm(matVec(lt, x)) - 1)).toBeLessThan(EPS);
    expect(choleskyMorph(g, 0)).toEqual([
      [1, 0],
      [0, 1],
    ]);
  });

  it('coupe par un plan contenant w : w₂ est le vecteur de Riesz de la restriction (G₂w₂ = c₂)', () => {
    const p = PRESETS_3D.find((x) => x.id === 'oblique-3')!;
    const d = deriveRiesz({ g: p.g, a: p.a, c: p.c, v: [1, 0, 0] });
    const sec = rieszSection(p.g, p.c, d.w!)!;
    const gw = matVec(sec.g2, sec.w2);
    expect(Math.abs(gw[0]! - sec.c2[0]!)).toBeLessThan(EPS);
    expect(Math.abs(gw[1]! - sec.c2[1]!)).toBeLessThan(EPS);
    // La norme G de w se conserve dans la coupe.
    expect(Math.abs(Math.sqrt(innerG(sec.g2, sec.w2, sec.w2)) - d.dualNorm)).toBeLessThan(EPS);
  });
});

describe('Constantes de coercivité et de continuité (numériques, comparées à des valeurs exactes)', () => {
  it('A = [[2, 1], [−1, 2]], G = I : α = 2 (partie symétrique 2I), M = √5 (AᵀA = 5I)', () => {
    const a: Mat = [
      [2, 1],
      [-1, 2],
    ];
    const g: Mat = [
      [1, 0],
      [0, 1],
    ];
    expect(alphaOptimal(a, g)).toBeCloseTo(2, 10);
    expect(continuityOptimal(a, g)).toBeCloseTo(Math.sqrt(5), 10);
  });

  it('nature de la forme quadratique : seule la partie symétrique compte', () => {
    expect(quadraticNature([[2, 1], [-1, 2]])).toBe('definie-positive');
    expect(quadraticNature([[1, 0], [0, -1]])).toBe('indefinie');
    expect(quadraticNature([[1, 1], [1, 1]])).toBe('degeneree');
    // Une matrice antisymétrique pure : a(x, x) = 0 pour tout x.
    expect(quadraticNature([[0, 1], [-1, 0]])).toBe('degeneree');
  });

  it('courbes de niveau de a(x, x) : chaque point vérifie l’équation', () => {
    for (const [a, k] of [
      [[[1, 0], [0, 1]], 1],
      [[[1, 0], [0, -1]], 1],
      [[[1, 0], [0, -1]], -2],
      [[[2, 1], [-1, 2]], 2],
    ] as [Mat, number][]) {
      const arcs = quadraticLevel(a, k);
      expect(arcs.length).toBeGreaterThan(0);
      for (const arc of arcs) for (const x of arc) expect(Math.abs(dot(x, matVec(a, x)) - k)).toBeLessThan(1e-9);
    }
  });
});

describe('Lecture : hypothèses et conclusions, trois situations sans coercivité', () => {
  it('coercive : conclusion illustrative tant que les hypothèses ne sont pas établies, puis établie', () => {
    const s = preset('non-symetrique');
    expect(rieszReadout(s, NONE).conclusions.find((c) => c.id === 'lm')!.state).toBe('illustrative');
    expect(rieszReadout(s, ALL).conclusions.find((c) => c.id === 'lm')!.state).toBe('etablie');
    expect(rieszReadout(s, ALL).hypotheses.every((h) => h.state === 'demontree')).toBe(true);
  });

  it('non coercive et inversible : théorème non applicable, conclusion vraie mais non garantie', () => {
    const r = rieszReadout(preset('inversible-non-coercive'), ALL);
    expect(r.hypotheses.find((h) => h.id === 'alpha')!.state).toBe('absente');
    const lm = r.conclusions.find((c) => c.id === 'lm')!;
    expect(lm.state).toBe('non-garantie');
    expect(lm.detail).toMatch(/suffisante, non nécessaire/);
    expect(r.exact.u!.map(Q.toString)).toEqual(['1', '-1']);
  });

  it('non coercive et singulière : conclusion fausse', () => {
    const r = rieszReadout(preset('singuliere'), ALL);
    expect(r.conclusions.find((c) => c.id === 'lm')!.state).toBe('fausse');
    expect(r.exact.u).toBeNull();
  });

  it('G non définie positive : Riesz ne s’applique pas, l’hypothèse est absente', () => {
    const s = { g: [[1, 2], [2, 1]] as Mat, a: [[1, 0], [0, 1]] as Mat, c: [1, 0] as Vec, v: [1, 1] as Vec };
    const r = rieszReadout(s, ALL);
    expect(r.hypotheses.find((h) => h.id === 'g')!.state).toBe('absente');
    expect(r.conclusions.find((c) => c.id === 'riesz')!.state).toBe('non-garantie');
    expect(r.derived.w).toBeNull();
  });

  it('les préréglages : α exact annoncé ≥ α optimal calculé (cohérence)', () => {
    for (const p of PRESETS.filter((x) => x.alpha)) {
      const a = p.a.map((r) => [...r]);
      const g = p.g.map((r) => [...r]);
      expect(alphaOptimal(a, g)).toBeGreaterThanOrEqual(Number(p.alpha) - 1e-9);
    }
  });
});
