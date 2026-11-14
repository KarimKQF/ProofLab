/**
 * Tests mathématiques bloquants : chaque assertion vérifie une propriété exacte, ou
 * documente pourquoi un calcul numérique n'est qu'un contrôle de cohérence.
 */
import { describe, expect, it } from 'vitest';
import * as Q from '@/core/math/rational';
import { expressionsEquivalent, parseExpression, polyDiff, polyEqual, polyVar, fnEqual } from '@/core/math/symbolic';
import {
  characteristic,
  contains,
  minimizationReport,
  orthogonalProjectorExact,
  project,
  projectHalfPlaneExact,
  qdot,
  qsub,
  type ConvexFamily,
  type Vec2,
} from '@/core/math/projection';
import { fromIntegers, identity, isCoercive, isCoerciveWith, isPositiveDefinite, isPositiveSemiDefinite, isSymmetric, matMul, matScale, matSub, solve, transpose, det } from '@/core/math/matrix';
import { coercivityConstant, continuityConstant, innerG, laxMilgramSolution, rieszVector, dot2, matVec2, normG, dualNorm, type M2, type V2 } from '@/core/math/forms';
import { SEQUENCE_EXAMPLES } from '@/core/math/sequences';
import { COMPACTNESS_FAMILIES } from '@/core/math/compactness';
import {
  aPrioriEstimate,
  coefficient,
  collect,
  differenceSq,
  dtTerm,
  dxxTerm,
  exactOrder,
  FORCINGS,
  INITIAL_DATA,
  integralNormVSq,
  lambda,
  negate,
  normSq,
  phi,
  simpson,
  type SpectralTerm,
} from '@/core/math/galerkin';
import { evaluateCheck, type ClosedCheck } from '@/core/math/closed-checks';
import { PRESETS } from '@/labs/riesz/RieszLab';

const q = (n: number, d = 1) => Q.rat(n, d);

describe('Arithmétique exacte', () => {
  it('réduit et compare exactement', () => {
    expect(Q.eq(Q.add(q(1, 3), q(1, 6)), q(1, 2))).toBe(true);
    expect(Q.eq(q(1, 3), Q.parseRational('0.3333333333333333')!)).toBe(false);
  });

  it('lit des décimaux comme des rationnels exacts', () => {
    expect(Q.eq(Q.parseRational('0,25')!, q(1, 4))).toBe(true);
    expect(Q.parseRational('abc')).toBeNull();
  });
});

describe('Une proximité numérique n’établit pas une identité', () => {
  const rational: ClosedCheck = { kind: 'rational', prompt: 'x', expected: '1/3' };

  it('refuse une valeur numériquement proche', () => {
    const r = evaluateCheck(rational, { kind: 'rational', value: '0.3333333333' });
    expect(r.status).toBe('incorrect');
    expect(r.message).toMatch(/proche/);
  });

  it('accepte la valeur exacte sous une autre écriture', () => {
    expect(evaluateCheck(rational, { kind: 'rational', value: '2/6' }).status).toBe('valide');
  });

  it('distingue deux expressions presque égales', () => {
    expect(expressionsEquivalent('x^2 + 1/1000000000000', 'x^2', ['x'])).toBe(false);
    expect(expressionsEquivalent('(x+1)^2', 'x^2+2x+1', ['x'])).toBe(true);
    expect(expressionsEquivalent('x(1-x)', 'x-x^2', ['x'])).toBe(true);
  });

  it('compare des fractions rationnelles par produit en croix', () => {
    expect(expressionsEquivalent('(x^2-1)/(x-1)', 'x+1', ['x'])).toBe(true);
    expect(fnEqual(parseExpression('1/(x+1)', ['x']), parseExpression('1/x', ['x']))).toBe(false);
  });

  it('refuse les variables inattendues sans lever d’exception', () => {
    const check: ClosedCheck = { kind: 'expr-equiv', prompt: 'p', expected: 'x', vars: ['x'] };
    expect(evaluateCheck(check, { kind: 'expr-equiv', value: 'y' }).status).toBe('illisible');
  });

  it('dérive formellement', () => {
    const x = polyVar('x');
    const p = parseExpression('x^3', ['x']).num;
    expect(polyEqual(polyDiff(polyDiff(p, 'x'), 'x'), parseExpression('6x', ['x']).num)).toBe(true);
    expect(polyEqual(polyDiff(x, 'x'), parseExpression('1', ['x']).num)).toBe(true);
  });
});

describe('Laboratoire A — projection', () => {
  const pts: [number, number, number, number][] = [
    [-2, 1, 3, 1],
    [7, 3, -1, 2],
    [0, 1, 5, 4],
    [3, 5, 2, 7],
  ];

  it('le projeté sur un demi-plan satisfait exactement l’inégalité caractéristique', () => {
    // K = {z : ⟨n, z⟩ ≤ c}, n = (1, 2), c = 1.
    const n = { x: q(1), y: q(2) };
    const c = q(1);
    for (const [a, b, u, v] of pts) {
      const x = { x: q(a, b), y: q(u, v) };
      const p = projectHalfPlaneExact(n, c, x);
      expect(Q.cmp(qdot(n, p), c)).toBeLessThanOrEqual(0);
      // Points de K testés, construits exactement sur et sous la frontière.
      const samples = [
        { x: Q.sub(c, Q.mul(q(2), q(3))), y: q(3) },
        { x: q(-4), y: q(1) },
        { x: q(1), y: q(0) },
      ];
      for (const z of samples) {
        expect(Q.cmp(qdot(n, z), c)).toBeLessThanOrEqual(0);
        const value = qdot(qsub(x, p), qsub(z, p));
        expect(Q.isPos(value)).toBe(false);
      }
    }
  });

  it('la projection orthogonale est idempotente et symétrique, exactement', () => {
    const dirs = [
      { x: q(1), y: q(2) },
      { x: q(-3, 2), y: q(5) },
      { x: q(7), y: q(0) },
    ];
    for (const d of dirs) {
      const P = orthogonalProjectorExact(d);
      const PP = matMul(P, P);
      for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) expect(Q.eq(PP[i]![j]!, P[i]![j]!)).toBe(true);
      expect(isSymmetric(P)).toBe(true);
    }
  });

  it('les formules fermées projettent dans K et minimisent la distance (contrôle numérique)', () => {
    const families: ConvexFamily[] = [
      { kind: 'demi-plan', n: { x: 1, y: -1 }, c: 0.5 },
      { kind: 'rectangle', x0: -1, x1: 2, y0: -3, y1: 0.5 },
      { kind: 'disque', center: { x: 1, y: 1 }, r: 2 },
      { kind: 'sous-espace', d: { x: 2, y: 1 } },
    ];
    const grid: Vec2[] = [];
    for (let x = -5; x <= 5; x += 0.5) for (let y = -5; y <= 5; y += 0.5) grid.push({ x, y });
    for (const K of families) {
      for (const x of grid.filter((_, i) => i % 7 === 0)) {
        const p = project(K, x);
        expect(contains(K, p, 1e-7)).toBe(true);
        for (const z of grid.filter((g) => contains(K, g))) {
          expect(characteristic(x, p, z)).toBeLessThanOrEqual(1e-7);
        }
      }
    }
  });

  it('un disque ouvert n’a pas de projeté hors de lui', () => {
    const r = minimizationReport({ kind: 'disque-ouvert', center: { x: 0, y: 0 }, r: 1 }, { x: 2, y: 0 });
    expect(r.attained).toBe(false);
    expect(r.infimum).toBeCloseTo(1, 12);
  });

  it('un cercle perd l’unicité en son centre', () => {
    const r = minimizationReport({ kind: 'cercle', center: { x: 0, y: 0 }, r: 1 }, { x: 0, y: 0 });
    expect(r.unique).toBe(false);
  });
});

describe('Laboratoire B — Riesz et coercivité', () => {
  it('le représentant de Riesz vérifie l’identité, exactement', () => {
    const G = fromIntegers([[2, 1], [1, 3]]);
    const c = [q(5), q(-1)];
    const w = solve(G, c)!;
    // ℓ(v) = cᵀv = ⟨v, w⟩_G pour la base canonique, donc pour tout v par linéarité.
    const Gw = matMul(G, w.map((x) => [x]));
    expect(Q.eq(Gw[0]![0]!, c[0]!)).toBe(true);
    expect(Q.eq(Gw[1]![0]!, c[1]!)).toBe(true);
  });

  it('la version flottante coïncide avec l’identité exacte', () => {
    const G: M2 = [[2, 1], [1, 3]];
    const c: V2 = [5, -1];
    const w = rieszVector(G, c)!;
    for (const v of [[1, 0], [0, 1], [2, -3]] as V2[]) expect(innerG(G, v, w)).toBeCloseTo(dot2(c, v), 12);
  });

  it('Sylvester décide exactement', () => {
    expect(isPositiveDefinite(fromIntegers([[2, 1], [1, 3]]))).toBe(true);
    expect(isPositiveDefinite(fromIntegers([[1, 2], [2, 1]]))).toBe(false);
    expect(isPositiveDefinite(fromIntegers([[1, 1], [1, 1]]))).toBe(false);
    expect(isPositiveSemiDefinite(fromIntegers([[1, 1], [1, 1]]))).toBe(true);
  });

  it('une matrice non symétrique peut être coercive', () => {
    const A = fromIntegers([[2, 1], [-1, 2]]);
    expect(isSymmetric(A)).toBe(false);
    expect(isCoercive(A)).toBe(true);
    expect(isCoerciveWith(A, q(2))).toBe(true);
    expect(isCoerciveWith(A, q(2) as Q.Rational, identity(2))).toBe(true);
    expect(isCoerciveWith(A, q(201, 100))).toBe(false);
  });

  it('une matrice inversible peut ne pas être coercive', () => {
    const A = fromIntegers([[1, 0], [0, -1]]);
    expect(Q.isZero(det(A))).toBe(false);
    expect(isCoercive(A)).toBe(false);
  });

  it('les configurations du laboratoire ont les propriétés annoncées, exactement', () => {
    const exact = (v: number): Q.Rational => Q.parseRational(String(v))!;
    for (const p of PRESETS) {
      const G = p.g.map((r) => r.map(exact));
      const A = p.a.map((r) => r.map(exact));
      expect(isPositiveDefinite(G), p.id).toBe(true);
      if (p.alpha) {
        const alpha = Q.parseRational(p.alpha)!;
        expect(isCoerciveWith(A, alpha, G), `${p.id} : α annoncé`).toBe(true);
        // α annoncé est le meilleur : une constante un peu plus grande échoue.
        expect(isCoerciveWith(A, Q.add(alpha, q(1, 1000)), G), `${p.id} : α optimal`).toBe(false);
      } else {
        expect(isCoercive(A), p.id).toBe(false);
      }
    }
  });

  it('M et α calculés sont compatibles avec les hypothèses (constantes)', () => {
    const G: M2 = [[1, 0], [0, 1]];
    const A: M2 = [[2, 1], [-1, 2]];
    const M = continuityConstant(A, G);
    const alpha = coercivityConstant(A, G);
    expect(alpha).toBeCloseTo(2, 12);
    expect(M).toBeCloseTo(Math.sqrt(5), 12);
    // α ≤ M : conséquence de α‖x‖² ≤ a(x,x) ≤ M‖x‖².
    expect(alpha).toBeLessThanOrEqual(M + 1e-12);
    // Exactement, 5 est une borne de ‖A‖² : 5·I − AᵀA est semi-définie positive.
    const QA = fromIntegers([[2, 1], [-1, 2]]);
    expect(isPositiveSemiDefinite(matSub(matScale(q(5), identity(2)), matMul(transpose(QA), QA)))).toBe(true);
  });

  it('la solution de Lax–Milgram vérifie la formulation et l’estimation', () => {
    const G: M2 = [[1, 0], [0, 1]];
    const A: M2 = [[2, 1], [-1, 2]];
    const c: V2 = [3, -2];
    const u = laxMilgramSolution(A, c)!;
    for (const v of [[1, 0], [0, 1]] as V2[]) expect(dot2(u, matVec2(A, v))).toBeCloseTo(dot2(c, v), 12);
    expect(normG(G, u)).toBeLessThanOrEqual(dualNorm(G, c) / coercivityConstant(A, G) + 1e-12);
  });
});

/** Intégrale numérique d'un contrôle de cohérence : ne prouve rien, détecte les fautes de frappe. */
function quad(f: (x: number) => number, a: number, b: number, m = 40000): number {
  const h = (b - a) / m;
  let s = 0;
  for (let i = 0; i < m; i++) s += f(a + (i + 0.5) * h);
  return s * h;
}

describe('Laboratoire C — convergences', () => {
  it('chaque formule analytique coïncide avec une quadrature (contrôle de cohérence)', () => {
    for (const ex of SEQUENCE_EXAMPLES) {
      for (const n of [1, 2, 7]) {
        expect(quad((x) => ex.evaluate(n, x) ** 2, ex.domain[0], ex.domain[1]), `${ex.id} norme n=${n}`).toBeCloseTo(ex.normSq(n), 3);
      }
    }
  });

  it('un exemple faible n’est jamais annoncé fort sans que sa distance tende vers 0', () => {
    for (const ex of SEQUENCE_EXAMPLES) {
      const late = ex.distanceToLimitSq(5000);
      if (ex.strong) expect(late, `${ex.id} annoncé fort`).toBeLessThan(1e-3);
      else expect(late, `${ex.id} annoncé non fort`).toBeGreaterThan(1e-2);
      expect(ex.weakProof.length, ex.id).toBeGreaterThan(20);
      expect(ex.strongProof.length, ex.id).toBeGreaterThan(20);
    }
  });

  it('les appariements annoncés tendent vers le produit avec la limite faible', () => {
    const sin = SEQUENCE_EXAMPLES.find((e) => e.id === 'sin')!;
    expect(Math.abs(sin.pairings[0]!.value(100001))).toBeLessThan(1e-4);
    const carre = SEQUENCE_EXAMPLES.find((e) => e.id === 'carre-sin')!;
    expect(carre.pairings[0]!.value(9)).toBeCloseTo(0.5, 12);
    expect(carre.pairings[1]!.value(9)).toBeCloseTo(0.25, 12);
    // u_n² ⇀ 1/2 ≠ 0² : la limite faible ne passe pas dans la non-linéarité.
    expect(carre.weakLimit).not.toBe('0');
  });

  it('les appariements analytiques concordent avec une quadrature', () => {
    const g: Record<string, (x: number) => number> = {
      un: () => 1,
      x: (x) => x,
      sin1: (x) => Math.sin(Math.PI * x),
      bloc: (x) => (x >= 0 && x <= 1 ? 1 : 0),
    };
    for (const ex of SEQUENCE_EXAMPLES) {
      for (const pa of ex.pairings) {
        for (const n of [1, 3, 8]) {
          const v = pa.value(n);
          if (Number.isNaN(v)) continue;
          expect(quad((x) => ex.evaluate(n, x) * g[pa.id]!(x), ex.domain[0], ex.domain[1]), `${ex.id}/${pa.id}/${n}`).toBeCloseTo(v, 3);
        }
      }
    }
  });
});

describe('Laboratoire D — compacité', () => {
  it('toute conclusion forte s’accorde avec les normes en forme fermée', () => {
    for (const f of COMPACTNESS_FAMILIES) {
      const late = f.normL2L2(5000);
      if (f.strong) expect(late, f.id).toBeLessThan(1e-3);
      else expect(late, f.id).toBeGreaterThan(1e-2);
    }
  });

  it('une borne déclarée vraie reste bornée, une borne déclarée fausse diverge', () => {
    for (const f of COMPACTNESS_FAMILIES) {
      const big = 4000;
      if (f.spatial.holds) expect(f.spatial.value(big), `${f.id} spatial`).toBeLessThan(1000);
      else expect(f.spatial.value(big), `${f.id} spatial`).toBeGreaterThan(1e5);
      if (f.temporal.holds) expect(f.temporal.value(big), `${f.id} temporel`).toBeLessThan(1000);
      else expect(f.temporal.value(big), `${f.id} temporel`).toBeGreaterThan(1e5);
    }
  });

  it('une conclusion forte n’est annoncée que si le théorème s’applique ou si le calcul est explicite', () => {
    for (const f of COMPACTNESS_FAMILIES) {
      const theorem = f.compactEmbedding && f.spatial.holds && f.temporal.holds;
      if (theorem) expect(f.strong, `${f.id} : le théorème s'applique`).toBe(true);
      expect(f.missing === null, `${f.id} : hypothèse manquante cohérente`).toBe(theorem);
    }
  });

  it('les normes annoncées coïncident avec une quadrature (contrôle de cohérence)', () => {
    const family = COMPACTNESS_FAMILIES.find((f) => f.id === 'oscillation-temps')!;
    const n = 5;
    const [t0, t1] = family.tRange;
    const value = quad((t) => quad((x) => family.u(n, t, x) ** 2, 0, 1, 200), t0, t1, 800);
    expect(value).toBeCloseTo(family.normL2L2(n), 2);
    const mixte = COMPACTNESS_FAMILIES.find((f) => f.id === 'mixte')!;
    expect(quad((t) => quad((x) => mixte.u(3, t, x) ** 2, 0, 1, 300), 0, 2 * Math.PI, 800)).toBeCloseTo(mixte.normL2L2(3), 2);
  });
});

describe('Laboratoire E — Galerkin', () => {
  const zero = FORCINGS.find((f) => f.id === 'nul')!;
  const one = FORCINGS.find((f) => f.id === 'stationnaire')!;
  const mode1 = INITIAL_DATA.find((d) => d.id === 'mode1')!;

  it('u = e^{−λt}φ_k vérifie exactement l’équation, symboliquement', () => {
    for (const k of [1, 2, 7]) {
      const u: SpectralTerm = { coef: [1n, 1n], piPower: 0, k, transient: true };
      const dt = dtTerm(u);
      const dxx = dxxTerm(u);
      expect(collect([dt, negate(dxx)])).toEqual([]);
    }
  });

  it('la partie stationnaire B·φ_k avec B = f/λ_k résout le problème, symboliquement', () => {
    // −∂ₓₓ(B φ_k) = λ_k B φ_k = f φ_k : avec B = 1/(k²π²) (π^{-2}), le coefficient vaut 1.
    for (const k of [1, 3]) {
      const stationary: SpectralTerm = { coef: [1n, BigInt(k * k)], piPower: -2, k, transient: false };
      const minusDxx = negate(dxxTerm(stationary));
      expect(minusDxx.coef[0] * 1n).toBe(minusDxx.coef[1]);
      expect(minusDxx.piPower).toBe(0);
    }
  });

  it('les solutions de référence satisfont les conditions au bord', () => {
    for (const k of [1, 4, 9]) {
      expect(phi(k, 0)).toBe(0);
      expect(Math.abs(phi(k, 1))).toBeLessThan(1e-12);
    }
  });

  it('les coefficients résolvent le système différentiel (contrôle numérique)', () => {
    for (const f of FORCINGS) {
      for (const k of [1, 2, 3]) {
        const t = 0.2;
        const h = 1e-6;
        const c = (s: number) => coefficient(k, s, mode1, f);
        const derivative = (c(t + h) - c(t - h)) / (2 * h);
        expect(derivative + lambda(k) * c(t), `${f.id}, k=${k}`).toBeCloseTo(f.coefficient(k, t), 4);
      }
    }
  });

  it('Parseval : les coefficients de x(1−x) reproduisent sa norme exacte', () => {
    const parabole = INITIAL_DATA.find((d) => d.id === 'parabole')!;
    let s = 0;
    for (let k = 1; k <= 2000; k++) s += parabole.coefficient(k) ** 2;
    expect(s).toBeCloseTo(parabole.normSq, 10);
    expect(parabole.normSq).toBeCloseTo(1 / 30, 15);
  });

  it('les coefficients annoncés de x(1−x) coïncident avec le calcul direct', () => {
    const parabole = INITIAL_DATA.find((d) => d.id === 'parabole')!;
    for (const k of [1, 2, 3, 5]) {
      expect(quad((x) => x * (1 - x) * phi(k, x), 0, 1)).toBeCloseTo(parabole.coefficient(k), 6);
    }
  });

  it('les reste annoncés majorent la somme tronquée', () => {
    for (const d of INITIAL_DATA) {
      for (const K of [5, 20]) {
        let s = 0;
        for (let k = K + 1; k <= 20000; k++) s += d.coefficient(k) ** 2;
        expect(s, `${d.id}, K=${K}`).toBeLessThanOrEqual(d.tailBound(K) + 1e-12);
      }
    }
  });

  it('avec un nombre fini de modes, u_n est la solution exacte dès n = exactOrder', () => {
    const order = exactOrder(mode1, one)!;
    expect(order).toBe(1);
    expect(differenceSq(order, 0.3, mode1, one)).toBe(0);
  });

  it('l’estimation a priori correcte est vérifiée (contrôle numérique)', () => {
    for (const init of INITIAL_DATA) {
      for (const f of FORCINGS) {
        for (const n of [1, 5, 20]) {
          for (const t of [0.05, 0.4, 1]) {
            const r = aPrioriEstimate(n, t, init, f);
            expect(r.holds, `${init.id}/${f.id}/${n}/${t} : ${r.left} ≤ ${r.right}`).toBe(true);
          }
        }
      }
    }
  });

  it('l’estimation écrite telle quelle dans le polycopié est fausse : contre-exemple exact', () => {
    // f = 0, u₀ = φ₁, T > 0 : ‖u(t)‖² = e^{−2λt}, donc sup = 1 et ∫₀ᵀ‖u‖²_V = (1 − e^{−2λT})/2 > 0.
    const T = 1;
    const sup = normSq(1, 0, mode1, zero);
    const integral = integralNormVSq(1, T, mode1, zero);
    expect(sup).toBeCloseTo(1, 12);
    expect(integral).toBeCloseTo((1 - Math.exp(-2 * lambda(1) * T)) / 2, 6);
    const lhs = sup + integral;
    const rhs = mode1.normSq;
    expect(lhs).toBeGreaterThan(rhs + 0.1);
    // Avec la constante 2, l'inégalité redevient vraie.
    expect(lhs).toBeLessThanOrEqual(2 * rhs);
  });

  it('Simpson est exact sur les polynômes de degré 3 (contrôle de l’outil)', () => {
    expect(simpson((s) => s ** 3, 2)).toBeCloseTo(4, 10);
  });
});
