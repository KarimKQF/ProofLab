/**
 * Laboratoire G, scène « Intégration symplectique » (résultat 45, planches 63, 66 et 89).
 *
 * H(q, p) = p²/2 + V(q) : oscillateur (V = q²/2) ou pendule (V = −cos q). Le flot exact
 * (forme close pour l'oscillateur, Runge–Kutta fin pour le pendule) est comparé à Euler
 * explicite, Euler symplectique et Störmer–Verlet : trajectoire, image d'un petit disque
 * de conditions initiales (aire par la formule du lacet), déterminant d'un pas, dérive de H.
 */
import { det, jacobian, rk4, schemeStep, shoelace, type SchemeId, type Vec } from './lie-core';
import { fmt, type SceneReadout } from './types';

export type SystemId = 'oscillateur' | 'pendule';
export type TrackId = SchemeId | 'exact';

export const SCHEMES: { id: SchemeId; label: string; color: string }[] = [
  { id: 'euler', label: 'Euler explicite', color: '#d55181' },
  { id: 'symplectique', label: 'Euler symplectique', color: '#199e70' },
  { id: 'verlet', label: 'Störmer–Verlet', color: '#3987e5' },
];

export const SYSTEMS: Record<SystemId, { label: string; force: (q: number) => number; V: (q: number) => number; dforce: (q: number) => number; domain: [number, number, number, number] }> = {
  oscillateur: { label: String.raw`Oscillateur $H=\frac12(q^2+p^2)$`, force: (q) => -q, V: (q) => (q * q) / 2, dforce: () => -1, domain: [-3, 3, -2.4, 2.4] },
  pendule: { label: String.raw`Pendule $H=\frac12p^2-\cos q$`, force: (q) => -Math.sin(q), V: (q) => -Math.cos(q), dforce: (q) => -Math.cos(q), domain: [-4.2, 4.2, -3, 3] },
};

export interface SymplecticState {
  system: SystemId;
  h: number;
  N: number;
  z0: Vec;
  r: number;
}

export interface Track {
  id: TrackId;
  points: Vec[];
  /** Indice du premier point sorti du cadre (|z| > 60), sinon null. */
  escapedAt: number | null;
  disc: Vec[];
  areaRatio: number;
  detStep: number;
  drift: number;
}

export interface SymplecticData {
  readout: SceneReadout;
  tracks: Track[];
  levels: Vec[][];
  initialDisc: Vec[];
}

const LIMIT = 60;

export function energy(system: SystemId, [q, p]: Vec): number {
  return (p! * p!) / 2 + SYSTEMS[system].V(q!);
}

/** Flot exact (oscillateur) ou de référence (pendule, Runge–Kutta, 16 sous-pas par pas). */
function exactStep(system: SystemId, h: number, z: Vec): Vec {
  if (system === 'oscillateur') {
    const [q, p] = z as [number, number];
    return [q * Math.cos(h) + p * Math.sin(h), -q * Math.sin(h) + p * Math.cos(h)];
  }
  const f = SYSTEMS.pendule.force;
  return rk4(([q, p]) => [p!, f(q!)], z, h, 16);
}

function stepper(system: SystemId, id: TrackId, h: number): (z: Vec) => Vec {
  const f = SYSTEMS[system].force;
  return id === 'exact' ? (z) => exactStep(system, h, z) : (z) => schemeStep(id, h, z, f);
}

function run(system: SystemId, id: TrackId, s: SymplecticState, initialDisc: Vec[]): Track {
  const step = stepper(system, id, s.h);
  const points: Vec[] = [s.z0];
  let escapedAt: number | null = null;
  let z = s.z0;
  const H0 = energy(system, s.z0);
  let drift = 0;
  for (let n = 1; n <= s.N; n++) {
    z = step(z);
    points.push(z);
    if (escapedAt === null && Math.hypot(z[0]!, z[1]!) > LIMIT) escapedAt = n;
    const e = energy(system, z);
    if (Number.isFinite(e)) drift = Math.max(drift, Math.abs(e - H0));
    else drift = Infinity;
  }
  const disc = initialDisc.map((w) => {
    let x = w;
    for (let n = 0; n < s.N; n++) x = step(x);
    return x;
  });
  const areaRatio = shoelace(disc) / shoelace(initialDisc);
  const detStep = det(jacobian(step, s.z0, 1e-6));
  return { id, points, escapedAt, disc, areaRatio, detStep, drift };
}

/** Courbes de niveau de H, par branches p = ±√(2(E − V(q))). */
function levelCurves(system: SystemId): Vec[][] {
  const sys = SYSTEMS[system];
  const [q0, q1] = sys.domain;
  const levels = system === 'oscillateur' ? [0.125, 0.5, 1.125, 2, 2.6] : [-0.75, -0.3, 0.3, 1, 1.6, 2.4];
  const curves: Vec[][] = [];
  for (const E of levels) {
    for (const sign of [1, -1]) {
      let cur: Vec[] = [];
      for (let k = 0; k <= 400; k++) {
        const q = q0 + ((q1 - q0) * k) / 400;
        const rad = 2 * (E - sys.V(q));
        if (rad >= 0) cur.push([q, sign * Math.sqrt(rad)]);
        else if (cur.length) {
          curves.push(cur);
          cur = [];
        }
      }
      if (cur.length) curves.push(cur);
    }
  }
  return curves;
}

const big = (v: number): string => (!Number.isFinite(v) ? 'débordement' : Math.abs(v) >= 1e6 ? `≈ 10^${Math.round(Math.log10(Math.abs(v)))}` : fmt(v, 6));

export function symplecticScene(s: SymplecticState): SymplecticData {
  const initialDisc = Array.from({ length: 128 }, (_, k) => [s.z0[0]! + s.r * Math.cos((2 * Math.PI * k) / 128), s.z0[1]! + s.r * Math.sin((2 * Math.PI * k) / 128)]);
  const ids: TrackId[] = ['exact', 'euler', 'symplectique', 'verlet'];
  const tracks = ids.map((id) => run(s.system, id, s, initialDisc));
  const t = (id: TrackId) => tracks.find((x) => x.id === id)!;
  const osc = s.system === 'oscillateur';
  const h2 = s.h * s.h;
  const detLabel = (id: SchemeId) =>
    osc
      ? { value: fmt(id === 'euler' ? 1 + h2 : 1, 6), status: 'exact' as const }
      : { value: fmt(t(id).detStep, 6), status: 'numerique' as const, method: 'Jacobienne du pas en z₀ par différences centrées.' };
  const measures: SceneReadout['measures'] = [
    { id: 'H0', label: String.raw`$H(z_0)$`, value: fmt(energy(s.system, s.z0), 5), status: 'exact' },
    {
      id: 'area-exact',
      label: 'Flot exact : aire après N pas / aire initiale',
      value: fmt(t('exact').areaRatio, 6),
      numeric: t('exact').areaRatio,
      status: 'numerique',
      method: osc ? 'Rotation exacte ; formule du lacet sur 128 points.' : 'Flot de référence : Runge–Kutta 4, 16 sous-pas par pas ; formule du lacet sur 128 points (l’écart à 1 mesure l’erreur du contour polygonal).',
    },
  ];
  for (const sc of SCHEMES) {
    const tr = t(sc.id);
    const d = detLabel(sc.id);
    measures.push(
      { id: `det-${sc.id}`, label: `${sc.label} : déterminant d’un pas en $z_0$`, value: d.value, status: d.status, method: 'method' in d ? d.method : undefined },
      { id: `area-${sc.id}`, label: `${sc.label} : rapport des aires après N pas`, value: big(tr.areaRatio), numeric: tr.areaRatio, status: 'numerique', method: 'Image d’un polygone à 128 sommets ; formule du lacet.' },
      { id: `drift-${sc.id}`, label: `${sc.label} : $\\max_{n\\le N}|H(z_n)-H(z_0)|$`, value: big(tr.drift), numeric: tr.drift, status: 'numerique', method: tr.escapedAt ? `La trajectoire sort du cadre au pas ${tr.escapedAt}.` : 'Évaluation de H le long de la trajectoire.' },
    );
  }
  const stable = s.h < 2;
  const readout: SceneReadout = {
    measures,
    equations: [
      { id: 'champ', tex: String.raw`$\iota_{X_H}(dq\wedge dp)=dH$ : $q'=\partial_pH=p$, $\ p'=-\partial_qH=${osc ? '-q' : '-\\sin q'}$.`, status: 'exact' },
      { id: 'schemas', tex: String.raw`Euler : $(q,p)\mapsto(q+hp,\ p+hf(q))$ ; symplectique : $p_1=p+hf(q)$, $q_1=q+hp_1$ ; Verlet : demi-pas en $p$, pas en $q$, demi-pas en $p$.`, status: 'exact' },
      {
        id: 'det',
        tex: osc
          ? String.raw`Oscillateur : $\det A_E=1+h^2=${fmt(1 + h2, 4).replace(',', '{,}')}$, $\det A_S=1$ ; pour $h<2$, les valeurs propres de $A_S$ sont de module $1$.`
          : String.raw`Pendule : la jacobienne d'Euler explicite en $(q,p)$ vaut $\begin{pmatrix}1&h\\-h\cos q&1\end{pmatrix}$, de déterminant $1+h^2\cos q$ ; les deux autres schémas composent des cisaillements de déterminant $1$.`,
        status: 'exact',
        note: 'Exercice 45, difficile ; planche 66.',
      },
    ],
    hypotheses: [
      { id: 'separable', label: String.raw`$H=\frac12p^2+V(q)$ séparable`, state: 'satisfaite' },
      { id: 'pas', label: String.raw`$h<2$ (stabilité linéaire des schémas symplectiques)`, state: stable ? 'satisfaite' : 'absente', detail: stable ? undefined : 'Au-delà, A_S a une valeur propre de module > 1 : l’aire reste conservée, mais les itérés ne sont plus bornés.' },
    ],
    conclusions: [
      { id: 'liouville', label: 'Le flot exact préserve l’aire (Liouville)', state: 'illustrative', detail: `Rapport mesuré : ${fmt(t('exact').areaRatio, 6)}.` },
      { id: 'sympl', label: 'Euler symplectique et Verlet préservent l’aire à chaque pas', state: 'illustrative', detail: `Rapports mesurés : ${big(t('symplectique').areaRatio)} et ${big(t('verlet').areaRatio)}.` },
      {
        id: 'euler',
        label: 'Euler explicite ne préserve pas l’aire',
        state: 'illustrative',
        detail: osc ? `Facteur (1 + h²)^N = ${big((1 + h2) ** s.N)} ; mesuré : ${big(t('euler').areaRatio)}.` : 'Le déterminant 1 + h² cos q dilate près du fond du puits et contracte près du sommet.',
      },
      { id: 'H', label: 'Aucun schéma ne conserve H exactement', state: 'illustrative', detail: 'Les schémas symplectiques gardent une dérive bornée sur ces exemples ; Euler explicite dérive.' },
    ],
  };
  return { readout, tracks, levels: levelCurves(s.system), initialDisc };
}
