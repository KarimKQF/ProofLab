/**
 * Scène « Sobolev et traces » : traces exactes, invariance par ajout d'un élément de H¹₀,
 * gradient, normes, cohérence entre surface, coupes et courbes de niveau.
 */
import { describe, expect, it } from 'vitest';
import { contour, sampleGrid, sliceAtX, sliceAtY, gridX, gridY } from '@/core/visual-reasoning/sections';
import { SOBOLEV_EXAMPLES } from '@/core/visual-reasoning/surfaces';
import {
  BUBBLE_GRAD_SQ,
  boundaryPoint,
  boundaryValues,
  bubble,
  derivativeError,
  field,
  gradNormSqNumeric,
  sobolevReadout,
  traceProfile,
  type SobolevState,
} from '@/core/visual-reasoning/sobolev-scene';

const st = (exampleId: string, t = 0, extra: Partial<SobolevState> = {}): SobolevState => ({ exampleId, t, x0: 0.3, y0: 0.6, h: 1e-3, ...extra });

describe('Traces sur le bord du carré', () => {
  it('parcours du bord dans le sens direct : coins aux abscisses 0, 1, 2, 3, 4', () => {
    expect(boundaryPoint(0).xy).toEqual([0, 0]);
    expect(boundaryPoint(1).xy).toEqual([1, 0]);
    expect(boundaryPoint(2).xy).toEqual([1, 1]);
    expect(boundaryPoint(3).xy).toEqual([0, 1]);
    expect(boundaryPoint(4).xy).toEqual([0, 0]);
  });

  for (const e of SOBOLEV_EXAMPLES) {
    it(`${e.id} : la formule de la trace coïncide avec la restriction de u au bord (u continue jusqu’au bord)`, () => {
      const prof = traceProfile(st(e.id), 200);
      const vals = boundaryValues(st(e.id), 200);
      prof.forEach((p, i) => expect(Math.abs(p.value - vals[i]!)).toBeLessThan(1e-12));
    });

    it(`${e.id} : ajouter t·u₀ (u₀ ∈ H¹₀) ne change pas la trace`, () => {
      const base = boundaryValues(st(e.id, 0), 120);
      for (const t of [-1, 0.35, 1]) {
        const vals = boundaryValues(st(e.id, t), 120);
        vals.forEach((v, i) => expect(Math.abs(v - base[i]!)).toBeLessThan(1e-12));
      }
      // … alors que la fonction change à l'intérieur.
      expect(field(st(e.id, 1))(0.5, 0.25)).not.toBe(field(st(e.id, 0))(0.5, 0.25));
    });

    it(`${e.id} : H¹₀ si et seulement si la trace est nulle sur les quatre côtés`, () => {
      const zero = Object.values(e.traceTex).every((s) => s === '0');
      expect(e.inH10).toBe(zero);
    });
  }

  it('u₀ = 16x(1−x)y(1−y) vaut 1 au centre et 0 sur le bord', () => {
    expect(bubble(0.5, 0.5)).toBe(1);
    for (const s of [0, 0.3, 1]) for (const [x, y] of [[s, 0], [s, 1], [0, s], [1, s]]) expect(bubble(x!, y!)).toBe(0);
  });
});

describe('Gradient et normes', () => {
  it('différences centrées : erreur O(h²) sur les exemples réguliers', () => {
    for (const id of ['bulle', 'produit', 'mode']) {
      const e1 = derivativeError(st(id, 0, { h: 1e-2 })).maxError;
      const e2 = derivativeError(st(id, 0, { h: 5e-3 })).maxError;
      expect(e1).toBeLessThan(5e-3);
      // Divisier h par 2 divise l'erreur par environ 4 (ordre 2), sauf si elle est déjà au niveau des arrondis.
      if (e1 > 1e-10) expect(e2).toBeLessThan(e1 / 3);
    }
  });

  it('‖∇u‖² : quadrature du point milieu proche de la valeur exacte (exemples réguliers)', () => {
    for (const id of ['bulle', 'produit', 'mode']) {
      const e = SOBOLEV_EXAMPLES.find((x) => x.id === id)!;
      expect(Math.abs(gradNormSqNumeric(st(id), 200) - e.gradNormSq.value) / e.gradNormSq.value).toBeLessThan(1e-3);
    }
  });

  it('exemple singulier : ‖∇u‖² = π/4 exactement ; la quadrature converge lentement (singularité)', () => {
    const e = SOBOLEV_EXAMPLES.find((x) => x.id === 'singuliere')!;
    expect(e.gradNormSq.value).toBeCloseTo(Math.PI / 4, 15);
    // La masse manquante près du centre vaut environ (π/4)/√(1 + log(n/2)) : convergence logarithmique.
    const q100 = gradNormSqNumeric(st('singuliere'), 100);
    const q400 = gradNormSqNumeric(st('singuliere'), 400);
    expect(q100).toBeLessThan(q400);
    expect(q400).toBeLessThan(Math.PI / 4);
    const deficit = 1 - q400 / (Math.PI / 4);
    expect(deficit).toBeGreaterThan(0.2);
    expect(deficit).toBeLessThan(0.5);
    // Non borné : u(½ + r, ½) → +∞ quand r → 0.
    expect(e.u(0.5 + 1e-12, 0.5)).toBeGreaterThan(e.u(0.5 + 1e-3, 0.5));
  });

  it('‖∇u₀‖² = 256/45 (quadrature de contrôle)', () => {
    const s = { exampleId: 'bulle', t: 0, x0: 0, y0: 0, h: 0 };
    // ∇(bulle + t u₀) = (1 + 16t) ∇bulle : avec t = 1, ‖∇‖² = 17² / 45.
    const q = gradNormSqNumeric({ ...s, t: 1 }, 200);
    expect(q).toBeCloseTo(289 / 45, 3);
    expect(BUBBLE_GRAD_SQ).toBeCloseTo(256 / 45, 15);
  });
});

describe('Une seule grille pour la surface, les coupes et les niveaux', () => {
  it('les coupes x = xᵢ et y = yⱼ coïncident avec les valeurs de la grille', () => {
    const u = field(st('mode'));
    const g = sampleGrid(u, 33, [0, 1], [0, 1]);
    const i = 10;
    const j = 21;
    const cutX = sliceAtX(u, gridX(g, i), [0, 1], 32);
    const cutY = sliceAtY(u, gridY(g, j), [0, 1], 32);
    expect(Math.abs(cutX[j]![1] - g.values[j]![i]!)).toBeLessThan(1e-12);
    expect(Math.abs(cutY[i]![1] - g.values[j]![i]!)).toBeLessThan(1e-12);
  });

  it('courbes de niveau : exactes pour u = xy (bilinéaire), O(h²) pour la bulle', () => {
    const uxy = field(st('produit'));
    const g = sampleGrid(uxy, 65, [0, 1], [0, 1]);
    for (const c of [0.1, 0.25, 0.6]) {
      const segs = contour(g, c);
      expect(segs.length).toBeGreaterThan(0);
      for (const [a, b] of segs) for (const p of [a, b]) expect(Math.abs(uxy(p[0], p[1]) - c)).toBeLessThan(1e-12);
    }
    const ub = field(st('bulle'));
    const gb = sampleGrid(ub, 65, [0, 1], [0, 1]);
    for (const [a, b] of contour(gb, 0.03)) for (const p of [a, b]) expect(Math.abs(ub(p[0], p[1]) - 0.03)).toBeLessThan(1e-3 / 64);
  });
});

describe('Lecture : rien n’est présenté comme démontré par le laboratoire', () => {
  it('hypothèses satisfaites, conclusions illustratives', () => {
    for (const e of SOBOLEV_EXAMPLES) {
      const r = sobolevReadout(st(e.id));
      expect(r.hypotheses.every((h) => h.state === 'satisfaite')).toBe(true);
      expect(r.conclusions.every((c) => c.state === 'illustrative')).toBe(true);
      expect(r.equations.find((x) => x.id === 'justification')!.tex).toBe(e.why);
    }
  });
});
