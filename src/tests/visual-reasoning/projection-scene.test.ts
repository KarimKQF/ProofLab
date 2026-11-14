/**
 * Moteur de raisonnement visuel — scène « projection ».
 * Les valeurs de référence sont exactes (rationnels) ou justifiées par une formule fermée ;
 * les tolérances flottantes sont indiquées à chaque comparaison.
 */
import { describe, expect, it } from 'vitest';
import * as Q from '@/core/math/rational';
import { CONCEPTS } from '@/content';
import { AUX_TOOLS, THEOREM_CATALOG } from '@/content/catalog';
import { dist, dot, norm, sub, type Vec } from '@/core/visual-reasoning/linalg';
import {
  ballLadder,
  buildConvex,
  characteristic,
  comparisons,
  contains,
  defaultFamilyParams,
  familyKey,
  isAffine,
  pointFromParams,
  pointParams,
  project,
  projectionReadout,
  projectionVisibility,
  projectLineExact,
  projectPlaneExact,
  qCharacteristic,
  radialFrame,
  sectionFrame,
  sectionOf,
  theoremAnimation,
  toPlane,
  fromPlane,
  visibleMeasures,
  type ConvexKind,
  type ConvexSet,
} from '@/core/visual-reasoning/projection-scene';
import { checkScenario, lastReachable, STAGE_NOTICE, stageStatuses } from '@/core/visual-reasoning/proof-stages';
import { PROJECTION_THEOREM_STAGES, projectionTheoremProof } from '@/content/visual-proofs/projection-theorem';
import { FAMILY_IDS, familyDraftKey, familyProof, migrateFamilyKeys } from '@/labs/projection/proofs';
import { canonicalGraph, validateProof } from '../content/validate';

/** Tolérance des comparaisons en virgule flottante (opérations en nombre borné, valeurs d'ordre 1 à 10). */
const EPS = 1e-9;
const keysOf = (...k: string[]) => new Set(k);
const NO_KEYS = keysOf();

/** Générateur pseudo-aléatoire déterministe (congruentiel), pour des échantillons reproductibles. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

const q = (n: number, d = 1) => Q.rat(n, d);

describe('Projections exactes (arithmétique rationnelle)', () => {
  it('plan de ℝ³ : ⟨n, P_Kx⟩ = c, x − P_Kx colinéaire à n, inégalité caractéristique égale à 0', () => {
    // n = (1, 2, 2), c = 3, x = (4, −1, 5) : ⟨n, x⟩ = 12, t = (12 − 3)/9 = 1, P_Kx = (3, −3, 3).
    const n = [q(1), q(2), q(2)];
    const x = [q(4), q(-1), q(5)];
    const p = projectPlaneExact(n, q(3), x);
    expect(p.map((v) => Q.toString(v))).toEqual(['3', '-3', '3']);
    const np = p.reduce((s, v, i) => Q.add(s, Q.mul(v, n[i]!)), Q.ZERO);
    expect(Q.eq(np, q(3))).toBe(true);
    // z = (1, 0, 1) ∈ K (1 + 0 + 2 = 3) : ⟨x − p, z − p⟩ = 0 exactement.
    expect(Q.eq(qCharacteristic(x, p, [q(1), q(0), q(1)]), Q.ZERO)).toBe(true);
    // La formule flottante coïncide.
    const pf = project({ kind: 'plan', n: [1, 2, 2], c: 3 }, [4, -1, 5]);
    expect(dist(pf, [3, -3, 3])).toBeLessThan(EPS);
  });

  it('droite affine a + ℝd : P_Kx = a + ⟨x − a, d⟩/‖d‖² d', () => {
    // a = (1, 0, 0), d = (1, 1, 0), x = (3, 1, 2) : ⟨x − a, d⟩ = 3, ‖d‖² = 2, P_Kx = (5/2, 3/2, 0).
    const p = projectLineExact([q(1), q(0), q(0)], [q(1), q(1), q(0)], [q(3), q(1), q(2)]);
    expect(p.map((v) => Q.toString(v))).toEqual(['5/2', '3/2', '0']);
    const pf = project({ kind: 'droite-affine', a: [1, 0, 0], d: [1, 1, 0] }, [3, 1, 2]);
    expect(dist(pf, [2.5, 1.5, 0])).toBeLessThan(EPS);
  });

  it('boule, disque, demi-plan, rectangle : formules fermées', () => {
    // ‖(0, 3, 4)‖ = 5 : P_Kx = (2/5)(0, 3, 4) = (0, 6/5, 8/5).
    expect(dist(project({ kind: 'boule', center: [0, 0, 0], r: 2 }, [0, 3, 4]), [0, 1.2, 1.6])).toBeLessThan(EPS);
    expect(project({ kind: 'boule', center: [0, 0, 0], r: 2 }, [1, 1, 1])).toEqual([1, 1, 1]);
    // x − a = (3, 4), ‖x − a‖ = 5 : P_Kx = (1, 1) + (3/5, 4/5).
    expect(dist(project({ kind: 'disque', center: [1, 1], r: 1 }, [4, 5]), [1.6, 1.8])).toBeLessThan(EPS);
    // Demi-plan x₂ ≤ 1 : la projection de (2, 3) est (2, 1).
    const hp = project({ kind: 'demi-plan', n: [0, 1], c: 1 }, [2, 3]);
    expect(dist(hp, [2, 1])).toBeLessThan(EPS);
    expect(project({ kind: 'rectangle', lo: [-1, -1], hi: [1, 2] }, [3, -4])).toEqual([1, -1]);
  });
});

describe('Inégalité caractéristique sur toutes les familles (échantillon)', () => {
  const r = rng(7);
  for (const kind of FAMILY_IDS) {
    it(`${kind} : ⟨x − P_Kx, z − P_Kx⟩ ≤ 0 pour 200 couples (x, z), égalité si K est affine`, () => {
      const K = buildConvex(kind, defaultFamilyParams(kind));
      const n = kind === 'boule' || kind === 'plan' || kind === 'droite-affine' ? 3 : 2;
      for (let i = 0; i < 200; i++) {
        const x = Array.from({ length: n }, () => (r() - 0.5) * 10);
        const z0 = Array.from({ length: n }, () => (r() - 0.5) * 10);
        const z = contains(K, z0) ? z0 : project(K, z0);
        const p = project(K, x);
        expect(contains(K, p, 1e-9)).toBe(true);
        const ip = characteristic(x, p, z);
        expect(ip).toBeLessThanOrEqual(1e-8);
        if (isAffine(K)) expect(Math.abs(ip)).toBeLessThan(1e-8);
        // P_Kx minimise bien la distance parmi ces points.
        expect(dist(x, p)).toBeLessThanOrEqual(dist(x, z) + 1e-9);
      }
    });
  }
});

describe('Paramétrage intrinsèque des points de K (ℝ³)', () => {
  const r = rng(11);
  for (const kind of ['boule', 'plan', 'droite-affine'] as ConvexKind[]) {
    it(`${kind} : tout point paramétré appartient à K`, () => {
      const K = buildConvex(kind, defaultFamilyParams(kind));
      const specs = pointParams(kind);
      for (let i = 0; i < 100; i++) {
        const params = specs.map((s) => s.min + r() * (s.max - s.min));
        expect(contains(K, pointFromParams(K, params), 1e-9)).toBe(true);
      }
    });
  }
});

describe('Coupe plane passant par x, P_Kx et z', () => {
  const families3: ConvexSet[] = [
    { kind: 'boule', center: [0.5, -0.2, 0.1], r: 1.5 },
    { kind: 'plan', n: [0.3, -0.4, 0.866], c: 0.7 },
    { kind: 'droite-affine', a: [0, 0, 0.5], d: [0.6, 0.8, 0] },
  ];
  const x: Vec = [2.6, 1.8, 2.2];

  for (const K of families3) {
    it(`${K.kind} : repère orthonormé, x en (0, d), z dans le demi-plan inférieur, K ∩ plan exact`, () => {
      const p = project(K, x);
      const z = K.kind === 'boule' ? pointFromParams(K, [0.7, 3.6, 1.1]) : pointFromParams(K, [-1.6, 1.2]);
      const f = sectionFrame(x, p, z);
      expect(Math.abs(norm(f.e1) - 1)).toBeLessThan(EPS);
      expect(Math.abs(norm(f.e2) - 1)).toBeLessThan(EPS);
      expect(Math.abs(dot(f.e1, f.e2))).toBeLessThan(EPS);
      const [xs, xt] = toPlane(f, x);
      expect(Math.abs(xs)).toBeLessThan(EPS);
      expect(Math.abs(xt - dist(x, p))).toBeLessThan(EPS);
      // z est dans le plan de coupe, sous l'horizontale passant par P_Kx.
      expect(dist(fromPlane(f, toPlane(f, z)), z)).toBeLessThan(1e-8);
      expect(toPlane(f, z)[1]).toBeLessThanOrEqual(1e-9);
      const shape = sectionOf(K, f);
      if (K.kind === 'boule') {
        expect(shape.kind).toBe('disque');
        if (shape.kind === 'disque') {
          // P_Kx est sur le cercle de coupe (x hors de la boule).
          expect(Math.abs(Math.hypot(shape.center[0], shape.center[1]) - shape.r)).toBeLessThan(1e-8);
        }
      } else {
        // Plan ou droite : la coupe est la droite horizontale passant par P_Kx (orthogonale à x − P_Kx).
        expect(shape.kind).toBe('droite');
        if (shape.kind === 'droite') {
          expect(Math.abs(shape.dir[1])).toBeLessThan(1e-8);
          expect(Math.abs(shape.point[1])).toBeLessThan(1e-8);
        }
      }
    });
  }

  it('coupe radiale d’une boule : fidèle, x sur l’axe vertical', () => {
    const f = radialFrame([0, 0, 0], [1, 2, 2]);
    expect(toPlane(f, [1, 2, 2])).toEqual([expect.closeTo(0, 9), expect.closeTo(3, 9)]);
  });
});

describe('Visibilité pilotée par la preuve, propre à chaque famille', () => {
  it('sans clé, rien de ce qui dépend du théorème ne s’affiche', () => {
    const vis = projectionVisibility('disque', NO_KEYS, false);
    expect(vis).toEqual({ closed: false, point: false, vectors: false });
  });

  it('démontrer pour le demi-plan ne débloque rien pour le disque (défaut de la version 1 corrigé)', () => {
    const keys = keysOf(familyKey('demi-plan', 'K-ferme'), familyKey('demi-plan', 'projection-point'));
    expect(projectionVisibility('demi-plan', keys, false).point).toBe(true);
    expect(projectionVisibility('disque', keys, false)).toEqual({ closed: false, point: false, vectors: false });
    // Les clés non préfixées de la version 1 ne débloquent plus rien.
    expect(projectionVisibility('disque', keysOf('K-ferme', 'projection-point'), false).point).toBe(false);
  });

  it('exploration libre : tout s’affiche, mais les conclusions restent illustratives', () => {
    const vis = projectionVisibility('boule', NO_KEYS, true);
    expect(vis).toEqual({ closed: true, point: true, vectors: true });
    const K = buildConvex('boule', [1.8]);
    const ro = projectionReadout({ K, x: [3, 0, 0], zs: [[0, 0, 0]] }, NO_KEYS);
    expect(ro.conclusions.every((c) => c.state === 'illustrative')).toBe(true);
  });

  it('mesures masquées tant que le projeté n’est pas garanti', () => {
    const K = buildConvex('disque', [2]);
    const ro = projectionReadout({ K, x: [4, 0], zs: [[0, 1]] }, NO_KEYS);
    const none = visibleMeasures(ro.measures, { closed: false, point: false, vectors: false });
    expect(none.map((m) => m.id)).toEqual(['dz0']);
    const point = visibleMeasures(ro.measures, { closed: true, point: true, vectors: false });
    expect(point.map((m) => m.id)).toEqual(['p', 'dist', 'dz0']);
  });
});

describe('Lecture de la scène : une seule source pour toutes les vues', () => {
  it('l’inégalité caractéristique est illustrative tant qu’elle n’est pas démontrée', () => {
    const K = buildConvex('disque', [2]);
    const s = { K, x: [4, 0], zs: [[0, 1], [-1, 0]] };
    const before = projectionReadout(s, NO_KEYS);
    const carac = before.equations.find((e) => e.id === 'carac')!;
    expect(carac.status).toBe('illustratif');
    expect(carac.note).toMatch(/ne démontre pas le « pour tout »/);
    expect(before.hypotheses.find((h) => h.id === 'ferme')!.state).toBe('satisfaite');
    const after = projectionReadout(s, keysOf(familyKey('disque', 'inegalite-caracteristique'), familyKey('disque', 'K-ferme'), familyKey('disque', 'projection-point')));
    expect(after.equations.find((e) => e.id === 'carac')!.status).toBe('exact');
    expect(after.hypotheses.find((h) => h.id === 'ferme')!.state).toBe('demontree');
    expect(after.conclusions.find((c) => c.id === 'existence')!.state).toBe('etablie');
    // Les valeurs sont les mêmes avant et après : seule l'interprétation change.
    expect(after.derived).toEqual(before.derived);
    expect(before.derived.distance).toBeCloseTo(2, 12);
  });

  it('sous-espace affine : égalité, statut exact', () => {
    const K = buildConvex('plan', defaultFamilyParams('plan'));
    const ro = projectionReadout({ K, x: [1, 2, 3], zs: [pointFromParams(K, [1, 1])] }, NO_KEYS);
    expect(ro.equations.find((e) => e.id === 'carac')!.status).toBe('exact');
    expect(Math.abs(ro.derived.inner[0]!)).toBeLessThan(1e-9);
  });
});

describe('Démonstration animée : objets de chaque étape', () => {
  it('suite minimisante dans K, distances vers d, estimation de Cauchy, second minimiseur impossible', () => {
    const K = buildConvex('disque', [2]);
    const x = [4, 2.2];
    const a = theoremAnimation(K, x, [[-1.5, 0.5]]);
    expect(a.inside).toBe(false);
    expect(a.d).toBeCloseTo(Math.hypot(4, 2.2) - 2, 12);
    for (const pn of a.sequence) expect(contains(K, pn, 1e-9)).toBe(true);
    // ‖x − pₙ‖ ≥ d et tend vers d : l'écart au huitième terme est inférieur à celui du premier.
    for (const v of a.distances) expect(v).toBeGreaterThanOrEqual(a.d - 1e-12);
    expect(a.distances[7]! - a.d).toBeLessThan(a.distances[0]! - a.d);
    for (const pr of a.pairs) {
      expect(contains(K, pr.mid, 1e-9)).toBe(true);
      expect(pr.gap).toBeLessThanOrEqual(pr.bound + 1e-9);
    }
    // Milieu de [p, q] : ‖x − m‖² = d² − ¼‖p − q‖² < d², donc q ∉ K.
    const g = a.ghost!;
    expect(Math.abs(dist(x, g.q) - a.d)).toBeLessThan(1e-9);
    expect(Math.abs(g.distM ** 2 - (a.d ** 2 - dist(a.p, g.q) ** 2 / 4))).toBeLessThan(1e-9);
    expect(g.distM).toBeLessThan(a.d);
    expect(contains(K, g.q)).toBe(false);
    for (const v of a.inner) expect(v).toBeLessThanOrEqual(1e-12);
  });

  it('ℝ³ avec un seul point z : tous les objets restent dans le plan de la figure', () => {
    const K = buildConvex('boule', [1.8]);
    const x = [2.6, 1.8, 2.2];
    const a = theoremAnimation(K, x, [pointFromParams(K, [0.7, 3.6, 1.1])]);
    const inPlane = (v: Vec) => dist(fromPlane(a.frame, toPlane(a.frame, v)), v) < 1e-8;
    for (const v of [x, a.p, ...a.sequence, a.convex.u, a.convex.v, ...a.closure.seq, a.ghost!.q, a.ghost!.m]) expect(inPlane(v)).toBe(true);
    for (const v of a.sequence) expect(contains(K, v, 1e-9)).toBe(true);
    expect(contains(K, a.convex.v, 1e-9)).toBe(true);
  });

  it('x dans K : animation dégénérée signalée (d = 0)', () => {
    const a = theoremAnimation(buildConvex('disque', [2]), [0.5, 0.5], [[0, 0]]);
    expect(a.inside).toBe(true);
    expect(a.ghost).toBeNull();
  });
});

describe('Scénario de démonstration : lié au moteur de preuve, sans seconde source de vérité', () => {
  const allowed = new Set<string>([...THEOREM_CATALOG.map((e) => e.id), ...Object.keys(AUX_TOOLS)]);
  const knownConcepts = new Set(CONCEPTS.map((c) => c.id));

  it('graphe du théorème valide, huit étapes cohérentes avec ses nœuds et ses clés', () => {
    validateProof(projectionTheoremProof, { allowed, knownConcepts, where: 'projection-theoreme' });
    expect(PROJECTION_THEOREM_STAGES).toHaveLength(8);
    expect(PROJECTION_THEOREM_STAGES.map((s) => s.title)).toEqual([
      'L’ensemble est défini',
      'Convexité',
      'Fermeture',
      'Suite minimisante',
      'Convergence',
      'Le minimiseur apparaît',
      'Unicité',
      'Inégalité caractéristique',
    ]);
    expect(checkScenario(projectionTheoremProof, PROJECTION_THEOREM_STAGES)).toEqual([]);
  });

  it('statuts : hypothèses données, étapes établies seulement par les clés du moteur', () => {
    const none = stageStatuses(PROJECTION_THEOREM_STAGES, NO_KEYS);
    expect(none.map((s) => s.status)).toEqual(['hypothese', 'hypothese', 'hypothese', 'illustration', 'illustration', 'illustration', 'illustration', 'illustration']);
    expect(lastReachable(none)).toBe(2);
    const some = stageStatuses(PROJECTION_THEOREM_STAGES, keysOf('vp-suite', 'vp-cauchy'));
    expect(lastReachable(some)).toBe(4);
    // Une clé « en avance » ne rend pas accessibles les étapes intermédiaires.
    expect(lastReachable(stageStatuses(PROJECTION_THEOREM_STAGES, keysOf('vp-carac')))).toBe(2);
    expect(STAGE_NOTICE.illustration).toBe('Illustration disponible — preuve non encore établie.');
  });

  it('la dérivation canonique du théorème produit exactement les clés des étapes', () => {
    const graph = canonicalGraph(projectionTheoremProof);
    expect(graph.placed).toContain('fin');
  });
});

describe('Preuves guidées par famille (ℝ² et ℝ³)', () => {
  const allowed = new Set<string>([...THEOREM_CATALOG.map((e) => e.id), ...Object.keys(AUX_TOOLS)]);
  const knownConcepts = new Set(CONCEPTS.map((c) => c.id));
  for (const id of FAMILY_IDS) {
    it(`${id} : graphe valide, clés préfixées par la famille`, () => {
      const spec = familyProof(id);
      validateProof(spec, { allowed, knownConcepts, where: `projection.${id}` });
      const keys = spec.nodes.flatMap((n) => n.unlocks ?? []);
      expect(keys.length).toBeGreaterThanOrEqual(6);
      for (const k of keys) expect(k.startsWith(`${id}:`)).toBe(true);
    });
  }

  it('migration de la version 1 : les clés sont recalculées à partir des brouillons, famille par famille', () => {
    const spec = familyProof('disque');
    const drafts = { [familyDraftKey('projection', 'disque')]: { graph: canonicalGraph(spec), passedChecks: [] } };
    const missing = migrateFamilyKeys('projection', drafts, keysOf('K-ferme'));
    expect(missing).toContain('disque:projection-point');
    expect(missing.every((k) => k.startsWith('disque:'))).toBe(true);
    expect(migrateFamilyKeys('projection', {}, NO_KEYS)).toEqual([]);
  });
});

describe('Avec / sans hypothèse, et de ℝ à H', () => {
  it('sans fermeture : infimum non atteint hors de la boule ouverte ; sans convexité : unicité perdue au centre', () => {
    for (const dim of [2, 3] as const) {
      const [fermeture, convexite] = comparisons(dim);
      const x = dim === 2 ? [3, 4] : [0, 3, 4];
      const v = fermeture!.verdict(x);
      expect(v.attained).toBe(false);
      expect(v.infimum).toBeCloseTo(3, 12);
      const c = convexite!.verdict(dim === 2 ? [0, 0] : [0, 0, 0]);
      expect(c.attained).toBe(true);
      expect(c.unique).toBe(false);
    }
  });

  it('même boule, même formule en dimension 1, 2 et 3', () => {
    for (const s of ballLadder()) {
      expect(norm(s.p)).toBeCloseTo(2, 12);
      // x − P_Kx est colinéaire à x : P_Kx = 2x/‖x‖.
      const k = 2 / norm(s.x);
      expect(dist(s.p, s.x.map((v) => k * v))).toBeLessThan(EPS);
      expect(s.distance).toBeCloseTo(norm(s.x) - 2, 12);
      expect(norm(sub(s.x, s.p))).toBeCloseTo(s.distance, 12);
    }
  });
});
