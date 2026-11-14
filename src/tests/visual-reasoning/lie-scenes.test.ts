/**
 * Laboratoire G : noyau numérique et modèles des six scènes. Les valeurs de référence
 * sont exactes (formes closes) ; tolérance 1e−9 sauf mention contraire.
 */
import { describe, expect, it } from 'vitest';
import {
  bracketNumeric,
  det,
  expm,
  eye,
  hat,
  liftRotationPath,
  matDist,
  matScale,
  matVec,
  qFromAxisAngle,
  qneg,
  quatOfRotation,
  rank,
  rodrigues,
  rotationAngle,
  rotationAxis,
  rotationOfQuat,
  schemeStep,
  shoelace,
  trace,
  vdist,
  type Quat,
} from '@/core/visual-reasoning/lie-core';
import { commutatorPoint, commutatorScene, FIELD_PAIRS, pairById } from '@/core/visual-reasoning/lie-commutator';
import { EXP_PRESETS, expScene, rodriguesScene } from '@/core/visual-reasoning/lie-exponential';
import { boundaryCrossings, coverScene, wrapAngle } from '@/core/visual-reasoning/lie-cover';
import { conjugationRank, conjugationScene, dimSO, sphereScene, SLOPES, torusOrbit, torusScene } from '@/core/visual-reasoning/lie-orbits';
import { energy, symplecticScene } from '@/core/visual-reasoning/lie-symplectic';

const EPS = 1e-9;
const measure = (r: { measures: { id: string; numeric?: number; value: string; status: string }[] }, id: string) => {
  const m = r.measures.find((x) => x.id === id);
  if (!m) throw new Error(`Mesure absente : ${id}`);
  return m;
};

describe('noyau numérique', () => {
  it('exponentielle : rotation, nilpotent, formule de Jacobi', () => {
    const J = [
      [0, -1],
      [1, 0],
    ];
    const t = 0.83;
    expect(matDist(expm(matScale(J, t)), [[Math.cos(t), -Math.sin(t)], [Math.sin(t), Math.cos(t)]])).toBeLessThan(EPS);
    expect(matDist(expm([[0, 2.5], [0, 0]]), [[1, 2.5], [0, 1]])).toBeLessThan(EPS);
    const X = [
      [0.3, -1.2, 0.5],
      [0.8, -0.1, 0.4],
      [-0.6, 0.9, 0.2],
    ];
    expect(Math.abs(det(expm(X)) - Math.exp(trace(X)))).toBeLessThan(EPS);
  });

  it('Rodrigues coïncide avec la série ; angle et axe relus', () => {
    const u = [1, 2, 3].map((v) => v / Math.sqrt(14));
    for (const th of [0.4, 1.9, 2.8]) {
      const R = rodrigues(u, th);
      expect(matDist(R, expm(matScale(hat(u), th)))).toBeLessThan(EPS);
      expect(Math.abs(rotationAngle(R) - th)).toBeLessThan(1e-7);
      expect(vdist(rotationAxis(R)!, u)).toBeLessThan(1e-7);
    }
  });

  it('quaternions : p(q) = p(−q), antécédent au signe près, relèvement de 2π et 4π', () => {
    const q = qFromAxisAngle([0.3, -0.5, 0.8], 2.2);
    expect(matDist(rotationOfQuat(q), rotationOfQuat(qneg(q)))).toBeLessThan(EPS);
    const back = quatOfRotation(rotationOfQuat(q));
    expect(Math.min(vdist(back, q), vdist(back, qneg(q)))).toBeLessThan(EPS);
    const gamma = (t: number) => rodrigues([0, 0, 1], t);
    const one = liftRotationPath(gamma, 2 * Math.PI);
    const two = liftRotationPath(gamma, 4 * Math.PI);
    expect(vdist(one[one.length - 1]!, [-1, 0, 0, 0])).toBeLessThan(1e-9);
    expect(vdist(two[two.length - 1]!, [1, 0, 0, 0])).toBeLessThan(1e-9);
    // Continuité du relevé : pas de saut d'un antécédent à l'autre.
    for (let k = 1; k < one.length; k++) expect(vdist(one[k] as Quat, one[k - 1] as Quat)).toBeLessThan(0.02);
  });

  it('schémas sur l’oscillateur : matrices et déterminants', () => {
    const f = (q: number) => -q;
    const h = 0.5;
    const cols = (id: 'euler' | 'symplectique' | 'verlet') => [schemeStep(id, h, [1, 0], f), schemeStep(id, h, [0, 1], f)];
    const m = (id: 'euler' | 'symplectique' | 'verlet') => {
      const [c1, c2] = cols(id);
      return [
        [c1![0]!, c2![0]!],
        [c1![1]!, c2![1]!],
      ];
    };
    expect(Math.abs(det(m('euler')) - 1.25)).toBeLessThan(EPS);
    expect(matDist(m('symplectique'), [[0.75, 0.5], [-0.5, 1]])).toBeLessThan(EPS);
    expect(Math.abs(det(m('verlet')) - 1)).toBeLessThan(EPS);
  });

  it('aire, rang, crochet numérique', () => {
    expect(shoelace([[0, 0], [1, 0], [1, 1], [0, 1]])).toBeCloseTo(1, 12);
    expect(rank([[1, 2, 3], [2, 4, 6], [0, 1, 0]])).toBe(2);
    expect(rank([[0, 0], [0, 0]])).toBe(0);
    for (const pair of FIELD_PAIRS) {
      for (const p of [pair.p0, [0.3, -0.7]]) expect(vdist(bracketNumeric(pair.X, pair.Y, p), pair.bracket(p))).toBeLessThan(1e-6);
    }
  });
});

describe('scène commutateur', () => {
  it('cisaillement : C_{1/2}(1,2) = (1, 9/4), reste nul', () => {
    const d = commutatorScene({ pairId: 'cisaillement', p: [1, 2], t: 0.5 });
    expect(vdist(d.end, [1, 2.25])).toBeLessThan(EPS);
    expect(d.remainderZero).toBe(true);
    expect(d.exactFlows).toBe(true);
    expect(d.legs).toHaveLength(4);
    expect(vdist(d.legs[3]![d.legs[3]!.length - 1]!, d.end)).toBeLessThan(EPS);
  });

  it('champs linéaires : C_t(1,0) = (1 − t², t³), reste d’ordre 3', () => {
    const pair = pairById('lineaires');
    for (const t of [0.2, 0.5, 1.1]) expect(vdist(commutatorPoint(pair, [1, 0], t), [1 - t * t, t ** 3])).toBeLessThan(EPS);
    const d = commutatorScene({ pairId: 'lineaires', p: [1, 0], t: 0.5 });
    expect(d.orders[0]!.ratio!).toBeCloseTo(8, 6);
  });

  it('rotations et homothéties : les flots commutent', () => {
    const d = commutatorScene({ pairId: 'commutants', p: [1, 0.5], t: 0.9 });
    expect(vdist(d.end, [1, 0.5])).toBeLessThan(EPS);
    expect(d.readout.conclusions.find((c) => c.id === 'commutation')!.label).toContain('commutent');
  });

  it('champ non linéaire : flot numérique, reste d’ordre 3', () => {
    const d = commutatorScene({ pairId: 'non-lineaire', p: [0.5, 0.3], t: 0.4 });
    expect(d.exactFlows).toBe(false);
    expect(measure(d.readout, 'end').status).toBe('numerique');
    expect(d.orders[0]!.ratio!).toBeGreaterThan(6);
    expect(d.orders[0]!.ratio!).toBeLessThan(10);
  });
});

describe('scènes exponentielle et Rodrigues', () => {
  it('rotation : e^{(π/2)J} = J ; det e^{sA} = e^{s tr A}', () => {
    const J = EXP_PRESETS.find((p) => p.id === 'rotation')!.A;
    const d = expScene({ A: J, s: Math.PI / 2 });
    expect(matDist(d.E, J)).toBeLessThan(EPS);
    expect(d.kind).toBe('elliptique');
    for (const p of EXP_PRESETS) {
      const e = expScene({ A: p.A, s: 1.3 });
      expect(Math.abs(measure(e.readout, 'det').numeric! - measure(e.readout, 'exptr').numeric!)).toBeLessThan(1e-9);
    }
  });

  it('sl(2) : trace minorée par −2 ; hors de sl(2), conclusions non garanties', () => {
    for (const id of ['rotation', 'cisaillement', 'hyperbolique']) {
      const e = expScene({ A: EXP_PRESETS.find((p) => p.id === id)!.A, s: 1 });
      expect(e.inSl2).toBe(true);
      expect(Math.min(...e.traceCurve.map((p) => p[1]))).toBeGreaterThanOrEqual(-2 - 1e-9);
    }
    const sp = expScene({ A: EXP_PRESETS.find((p) => p.id === 'spirale')!.A, s: -3 });
    expect(sp.kind).toBe('hors-sl2');
    expect(sp.readout.conclusions.find((c) => c.id === 'det1')!.state).toBe('non-garantie');
    expect(Math.min(...sp.traceCurve.map((p) => p[1]))).toBeLessThan(-2);
  });

  it('Rodrigues : R e₁ = e₂ pour u = (1,1,1)/√3, θ = 2π/3 ; R ∈ SO(3)', () => {
    const d = rodriguesScene({ u: [1, 1, 1], theta: (2 * Math.PI) / 3, v: [1, 0, 0] });
    expect(vdist(d.image, [0, 1, 0])).toBeLessThan(EPS);
    expect(measure(d.readout, 'orth').numeric!).toBeLessThan(1e-12);
    expect(Math.abs(measure(d.readout, 'det').numeric! - 1)).toBeLessThan(1e-12);
    expect(vdist(d.circle[0]!, d.circle[96]!)).toBeLessThan(EPS);
  });
});

describe('scène revêtement', () => {
  it('angle ramené et passages par le bord', () => {
    expect(wrapAngle(0.5)).toBeCloseTo(0.5, 12);
    expect(wrapAngle(Math.PI + 0.25)).toBeCloseTo(-Math.PI + 0.25, 12);
    expect(boundaryCrossings(3)).toBe(0);
    expect(boundaryCrossings(2 * Math.PI)).toBe(1);
    expect(boundaryCrossings(4 * Math.PI)).toBe(2);
  });

  it('un tour finit en −1, deux tours en 1 ; les deux relevés coïncident', () => {
    const one = coverScene({ turns: 1, s: 1, u: [0, 0, 1] });
    expect(one.qLift[0]).toBeCloseTo(-1, 9);
    expect(one.crossings).toBe(1);
    expect(one.readout.conclusions[0]!.label).toContain('n’est pas contractile');
    const two = coverScene({ turns: 2, s: 1, u: [1, 0, 0] });
    expect(two.qLift[0]).toBeCloseTo(1, 9);
    expect(two.crossings).toBe(2);
    expect(measure(two.readout, 'gap').numeric!).toBeLessThan(1e-9);
    expect(measure(two.readout, 'fibre').numeric!).toBeLessThan(1e-12);
    const half = coverScene({ turns: 1, s: 0.5, u: [0, 0, 1] });
    expect(half.readout.conclusions[0]!.state).toBe('non-garantie');
  });
});

describe('scène orbites', () => {
  it('dimensions : SO(3) sur S²', () => {
    expect(dimSO(3)).toBe(3);
    expect(dimSO(2)).toBe(1);
    const d = sphereScene(1.1, 0.4);
    expect(measure(d.readout, 'dimOrbit').numeric).toBe(2);
    expect(measure(d.readout, 'dimStab').numeric).toBe(1);
    // Le cercle du stabilisateur reste à distance constante de x.
    const dists = d.stabilizerCircle.map((q) => vdist(q, d.p));
    expect(Math.max(...dists) - Math.min(...dists)).toBeLessThan(EPS);
  });

  it('conjugaison : orbite de dimension 2 ou 0, bloc de Jordan, équation de l’orbite', () => {
    expect(conjugationRank([[1, 0], [0, 2]])).toBe(2);
    expect(conjugationRank([[1.5, 0], [0, 1.5]])).toBe(0);
    const d = conjugationScene(1, 2);
    expect(measure(d.readout, 'dimStab').numeric).toBe(2);
    expect(measure(d.readout, 'residu').numeric!).toBeLessThan(1e-9);
    const e = conjugationScene(1.5, 1.5);
    expect(measure(e.readout, 'dimOrbit').numeric).toBe(0);
    expect(measure(e.readout, 'jordan').numeric).toBe(2);
    expect(e.jordan).not.toBeNull();
  });

  it('tore : orbite rationnelle fermée, irrationnelle de plus en plus proche de la cible', () => {
    const pieces = torusOrbit(0.5, 2 * Math.PI * 2);
    const last = pieces[pieces.length - 1]![1]!;
    const first = pieces[0]![0]!;
    const wrap = (v: number) => ((v % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    expect(Math.hypot(wrap(last[0]!) - first[0]!, wrap(last[1]!) - first[1]!)).toBeLessThan(1e-9);
    const irr = SLOPES.find((s) => s.id === 'racine')!.id;
    expect(torusScene(irr, 400).minDist).toBeLessThan(torusScene(irr, 20).minDist);
    const rational = torusScene('demi', 400).minDist;
    expect(rational).toBeCloseTo(torusScene('demi', 4 * Math.PI).minDist, 9);
  });
});

describe('scène intégration symplectique', () => {
  it('oscillateur : rapports d’aires exacts', () => {
    const s = { system: 'oscillateur' as const, h: 0.5, N: 12, z0: [1, 0], r: 0.3 };
    const d = symplecticScene(s);
    const t = (id: string) => d.tracks.find((x) => x.id === id)!;
    expect(t('exact').areaRatio).toBeCloseTo(1, 9);
    expect(t('symplectique').areaRatio).toBeCloseTo(1, 9);
    expect(t('verlet').areaRatio).toBeCloseTo(1, 9);
    expect(t('euler').areaRatio / 1.25 ** 12).toBeCloseTo(1, 9);
    expect(measure(d.readout, 'det-euler').value).toBe('1,25');
    expect(t('exact').drift).toBeLessThan(1e-12);
  });

  it('pendule : schémas symplectiques à aire conservée, Euler explicite non', () => {
    const d = symplecticScene({ system: 'pendule', h: 0.3, N: 20, z0: [0.5, 0.2], r: 0.15 });
    const t = (id: string) => d.tracks.find((x) => x.id === id)!;
    expect(Math.abs(t('verlet').detStep - 1)).toBeLessThan(1e-8);
    expect(Math.abs(t('symplectique').detStep - 1)).toBeLessThan(1e-8);
    expect(Math.abs(t('euler').detStep - (1 + 0.09 * Math.cos(0.5)))).toBeLessThan(1e-8);
    expect(Math.abs(t('verlet').areaRatio - 1)).toBeLessThan(5e-3);
    expect(Math.abs(t('exact').areaRatio - 1)).toBeLessThan(5e-3);
    expect(t('euler').areaRatio).toBeGreaterThan(1.2);
    expect(Math.abs(energy('pendule', [0, 0]) + 1)).toBeLessThan(EPS);
  });

  it('pas trop grand : l’hypothèse h < 2 devient absente', () => {
    const d = symplecticScene({ system: 'oscillateur', h: 2.2, N: 30, z0: [1, 0], r: 0.2 });
    expect(d.readout.hypotheses.find((h) => h.id === 'pas')!.state).toBe('absente');
    expect(d.tracks.find((x) => x.id === 'euler')!.escapedAt).not.toBeNull();
  });
});

describe('sanité', () => {
  it('identité et matrice de rotation de l’axe', () => {
    expect(matDist(expm([[0, 0], [0, 0]]), eye(2))).toBe(0);
    expect(vdist(matVec(rodrigues([0, 0, 1], Math.PI / 2), [1, 0, 0]), [0, 1, 0])).toBeLessThan(EPS);
  });
});
