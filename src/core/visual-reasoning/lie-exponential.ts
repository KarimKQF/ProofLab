/**
 * Laboratoire G, scènes « Exponentielle » (résultat 40, planches 32, 33, 34, 40) et
 * « Rodrigues » (résultat 41, planche 35).
 *
 * Exponentielle : A ∈ gl(2), s ↦ e^{sA} sous-groupe à un paramètre ; orbites t ↦ e^{tA}v,
 * image du cercle unité, identité det e^{sA} = e^{s tr A}, minoration tr e^X ≥ −2 sur sl(2),
 * et l'écart e^Ae^B ≠ e^{A+B} quand [A,B] ≠ 0.
 * Rodrigues : exp(θû) par la série et par la formule fermée, vérifications d'orthogonalité,
 * angle et axe relus sur la matrice, orbite circulaire d'un vecteur.
 */
import {
  det,
  expm,
  eye,
  hat,
  matBracket,
  matDist,
  matLin,
  matMul,
  matScale,
  matVec,
  rodrigues,
  rotationAngle,
  rotationAxis,
  shoelace,
  trace,
  transpose,
  unit,
  vdist,
  type Mat,
  type Vec,
} from './lie-core';
import { fmt, vecTex, type SceneReadout } from './types';

const texNum = (v: number, d = 3) => fmt(v, d).replace(',', '{,}');
export const matTex = (A: Mat, d = 3): string => String.raw`\begin{pmatrix}${A.map((r) => r.map((v) => texNum(v, d)).join('&')).join(String.raw`\\`)}\end{pmatrix}`;

/* ───────────────────────── Exponentielle dans GL(2) ───────────────────────── */

export interface MatrixPreset {
  id: string;
  label: string;
  A: Mat;
  note: string;
}

export const EXP_PRESETS: MatrixPreset[] = [
  { id: 'rotation', label: 'Rotation $J$', A: [[0, -1], [1, 0]], note: String.raw`$e^{sJ}$ est la rotation d'angle $s$ : sous-groupe $SO(2)$, orbites circulaires (exercice 40, facile).` },
  { id: 'cisaillement', label: 'Cisaillement $N$', A: [[0, 1], [0, 0]], note: String.raw`$N^2=0$, donc $e^{sN}=I+sN$ : orbites rectilignes, $\operatorname{tr}e^{sN}=2$.` },
  { id: 'hyperbolique', label: String.raw`$\operatorname{diag}(1,-1)$`, A: [[1, 0], [0, -1]], note: String.raw`$e^{sA}=\operatorname{diag}(e^s,e^{-s})$ : orbites hyperboliques, $\operatorname{tr}e^{sA}=2\cosh s\ge2$.` },
  { id: 'spirale', label: 'Spirale', A: [[-0.15, -1], [1, -0.15]], note: String.raw`$\operatorname{tr}A=-0{,}3\neq0$ : $\det e^{sA}=e^{-0{,}3s}$, le sous-groupe sort de $SL(2)$.` },
];

export interface ExpState {
  A: Mat;
  s: number;
}

export interface ExpData {
  readout: SceneReadout;
  E: Mat;
  orbits: Vec[][];
  circleImage: Vec[];
  traceCurve: [number, number][];
  inSl2: boolean;
  kind: 'elliptique' | 'parabolique' | 'hyperbolique' | 'hors-sl2';
}

/** Orbite t ↦ e^{tA}v sur [−T, T], par itération de e^{dt·A} (n pas de chaque côté). */
function orbit(A: Mat, v: Vec, T: number, n = 90): Vec[] {
  const fwd = expm(matScale(A, T / n));
  const bwd = expm(matScale(A, -T / n));
  const out: Vec[] = [v];
  let a = v;
  let b = v;
  const back: Vec[] = [];
  for (let k = 0; k < n; k++) {
    a = matVec(fwd, a);
    b = matVec(bwd, b);
    out.push(a);
    back.push(b);
  }
  return [...back.reverse(), ...out];
}

export function expScene(st: ExpState): ExpData {
  const { A, s } = st;
  const E = expm(matScale(A, s));
  const trA = trace(A);
  const detA = det(A);
  const inSl2 = Math.abs(trA) < 1e-12;
  const kind = !inSl2 ? 'hors-sl2' : detA > 1e-12 ? 'elliptique' : detA < -1e-12 ? 'hyperbolique' : 'parabolique';
  const detE = det(E);
  const expTr = Math.exp(s * trA);
  const circle = Array.from({ length: 96 }, (_, k) => [Math.cos((2 * Math.PI * k) / 96), Math.sin((2 * Math.PI * k) / 96)]);
  const circleImage = circle.map((v) => matVec(E, v));
  const areaRatio = shoelace(circleImage) / shoelace(circle);
  const starts = Array.from({ length: 8 }, (_, k) => [Math.cos((2 * Math.PI * k) / 8 + 0.2), Math.sin((2 * Math.PI * k) / 8 + 0.2)]);
  const orbits = starts.map((v) => orbit(A, v, 3));
  const traceCurve: [number, number][] = Array.from({ length: 161 }, (_, k) => {
    const x = -4 + k * 0.05;
    return [x, trace(expm(matScale(A, x)))];
  });
  const minTrace = Math.min(...traceCurve.map((p) => p[1]));

  const A0 = [
    [0, 1],
    [0, 0],
  ];
  const B0 = [
    [0, 0],
    [1, 0],
  ];
  const prod = matMul(expm(A0), expm(B0));
  const sum = expm(matLin(A0, B0));

  const KIND_LABEL = { elliptique: 'elliptique', parabolique: 'parabolique', hyperbolique: 'hyperbolique', 'hors-sl2': 'hors de sl(2)' } as const;
  const readout: SceneReadout = {
    measures: [
      { id: 'E', label: String.raw`$e^{sA}$`, value: `$${matTex(E)}$`, status: 'numerique', method: 'Série de Taylor (24 termes) après mise à l’échelle, puis élévations au carré.' },
      { id: 'det', label: String.raw`$\det e^{sA}$`, value: fmt(detE, 6), numeric: detE, status: 'numerique', method: 'Déterminant de la matrice calculée.' },
      { id: 'exptr', label: String.raw`$e^{s\operatorname{tr}A}$`, value: fmt(expTr, 6), numeric: expTr, status: 'exact' },
      { id: 'area', label: 'Aire de l’image du disque / aire du disque', value: fmt(areaRatio, 5), numeric: areaRatio, status: 'numerique', method: 'Formule du lacet sur un polygone à 96 sommets (l’écart à det e^{sA} est dû à la discrétisation du cercle).' },
      { id: 'tr', label: String.raw`$\operatorname{tr}e^{sA}$`, value: fmt(trace(E), 5), numeric: trace(E), status: 'numerique', method: 'Trace de la matrice calculée.' },
      { id: 'mintr', label: String.raw`$\min_{|s|\le4}\operatorname{tr}e^{sA}$`, value: fmt(minTrace, 4), numeric: minTrace, status: 'numerique', method: '161 valeurs de s, pas 0,05.' },
      { id: 'kind', label: 'Type de A', value: KIND_LABEL[kind], status: 'exact' },
    ],
    equations: [
      { id: 'serie', tex: String.raw`$e^{sA}=\sum_{k\ge0}\frac{(sA)^k}{k!}$, $\ e^{(s+t)A}=e^{sA}e^{tA}$ : $s\mapsto e^{sA}$ est un sous-groupe à un paramètre, de vecteur tangent $A$.`, status: 'exact' },
      { id: 'det', tex: String.raw`$\det e^{sA}=e^{s\operatorname{tr}A}$ (formule de Jacobi) ; ici $\operatorname{tr}A=${texNum(trA)}$, $\det A=${texNum(detA)}$.`, status: 'exact' },
      {
        id: 'sl2',
        tex: inSl2
          ? String.raw`$A\in\mathfrak{sl}(2)$ : $e^{sA}\in SL(2)$ et $\operatorname{tr}e^{sA}\ge-2$ ; $M=\operatorname{diag}(-2,-\tfrac12)$, de trace $-\tfrac52$, n'est l'exponentielle d'aucun élément de $\mathfrak{sl}(2)$.`
          : String.raw`$A\notin\mathfrak{sl}(2)$ : $\det e^{sA}=e^{s\operatorname{tr}A}\neq1$ pour $s\neq0$.`,
        status: 'exact',
        note: 'Exercice 40, difficile.',
      },
      {
        id: 'bch',
        tex: String.raw`Pour $A_0=\begin{pmatrix}0&1\\0&0\end{pmatrix}$, $B_0=\begin{pmatrix}0&0\\1&0\end{pmatrix}$ : $[A_0,B_0]=${matTex(matBracket(A0, B0), 0)}\neq0$, $e^{A_0}e^{B_0}=${matTex(prod, 0)}$ mais $e^{A_0+B_0}=\begin{pmatrix}\cosh1&\sinh1\\\sinh1&\cosh1\end{pmatrix}$.`,
        status: 'exact',
        note: `Écart calculé : ${fmt(matDist(prod, sum), 4)} (exercice 40, intermédiaire ; planche 40, Baker–Campbell–Hausdorff).`,
      },
    ],
    hypotheses: [
      { id: 'sl2', label: String.raw`$\operatorname{tr}A=0$, c'est-à-dire $A\in\mathfrak{sl}(2)$`, state: inSl2 ? 'satisfaite' : 'absente' },
      { id: 'commute', label: String.raw`$[A,B]=0$ pour écrire $e^{A+B}=e^Ae^B$`, state: 'supposee', detail: 'Hypothèse du résultat 40 ; l’exemple A₀, B₀ montre qu’elle ne peut pas être retirée.' },
    ],
    conclusions: [
      { id: 'groupe', label: String.raw`$s\mapsto e^{sA}$ est un morphisme $(\mathbb R,+)\to GL(2)$`, state: 'illustrative', detail: `Vérifié ici : ‖e^{sA}e^{-sA} − I‖ = ${fmt(matDist(matMul(E, expm(matScale(A, -s))), eye(2)), 12)}.` },
      { id: 'det1', label: String.raw`$e^{sA}\in SL(2)$`, state: inSl2 ? 'illustrative' : 'non-garantie', detail: inSl2 ? undefined : `det e^{sA} = ${fmt(detE, 4)}.` },
      { id: 'trace', label: String.raw`$\operatorname{tr}e^{sA}\ge-2$`, state: inSl2 ? 'illustrative' : 'non-garantie', detail: inSl2 ? 'Sur sl(2), tr e^X vaut 2 cos √det X, 2 ou 2 cosh √(−det X).' : `Hors de sl(2), la minoration peut tomber : minimum observé ${fmt(minTrace, 3)}.` },
    ],
  };
  return { readout, E, orbits, circleImage, traceCurve, inSl2, kind };
}

/* ───────────────────────── Rodrigues dans SO(3) ───────────────────────── */

export const AXIS_PRESETS: { id: string; label: string; u: Vec }[] = [
  { id: 'e3', label: '$e_3$', u: [0, 0, 1] },
  { id: 'e1', label: '$e_1$', u: [1, 0, 0] },
  { id: 'diag', label: String.raw`$\tfrac1{\sqrt3}(1,1,1)$`, u: [1, 1, 1] },
  { id: 'oblique', label: String.raw`$\tfrac1{\sqrt{14}}(1,2,3)$`, u: [1, 2, 3] },
];

export interface RodriguesState {
  u: Vec;
  theta: number;
  v: Vec;
}

export interface RodriguesData {
  readout: SceneReadout;
  R: Mat;
  axis: Vec;
  image: Vec;
  circle: Vec[];
  arc: Vec[];
  frame: Vec[];
}

export function rodriguesScene(st: RodriguesState): RodriguesData {
  const u = unit(st.u);
  const R = rodrigues(u, st.theta);
  const Rs = expm(matScale(hat(u), st.theta));
  const orth = matDist(matMul(transpose(R), R), eye(3));
  const dR = det(R);
  const angle = rotationAngle(R);
  const axisRead = rotationAxis(R);
  const image = matVec(R, st.v);
  const circle = Array.from({ length: 97 }, (_, k) => matVec(rodrigues(u, (2 * Math.PI * k) / 96), st.v));
  const n = Math.max(2, Math.ceil(Math.abs(st.theta) / 0.05));
  const arc = Array.from({ length: n + 1 }, (_, k) => matVec(rodrigues(u, (st.theta * k) / n), st.v));
  const frame = [0, 1, 2].map((i) => matVec(R, eye(3)[i]!));
  const wrapped = Math.abs(((st.theta + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI);

  const readout: SceneReadout = {
    measures: [
      { id: 'R', label: String.raw`$R=\exp(\theta\widehat u)$ (Rodrigues)`, value: `$${matTex(R)}$`, status: 'exact' },
      { id: 'serie', label: String.raw`$\|R-\sum_k(\theta\widehat u)^k/k!\|$`, value: fmt(matDist(R, Rs), 12), numeric: matDist(R, Rs), status: 'numerique', method: 'Série de l’exponentielle (24 termes, mise à l’échelle) comparée à la formule fermée.' },
      { id: 'orth', label: String.raw`$\|R^{\mathsf T}R-I\|$`, value: fmt(orth, 12), numeric: orth, status: 'numerique', method: 'Calcul en virgule flottante sur la formule fermée.' },
      { id: 'det', label: String.raw`$\det R$`, value: fmt(dR, 9), numeric: dR, status: 'numerique', method: 'Calcul en virgule flottante.' },
      { id: 'angle', label: String.raw`Angle relu : $\arccos\frac{\operatorname{tr}R-1}2$`, value: `${fmt((angle * 180) / Math.PI, 3)}°`, numeric: angle, status: 'numerique', method: `Attendu : |θ| ramené dans [0, π], soit ${fmt((wrapped * 180) / Math.PI, 3)}°.` },
      { id: 'axis', label: String.raw`Axe relu sur $R-R^{\mathsf T}$`, value: axisRead ? `$${vecTex(axisRead, 3)}$` : 'indéterminé (angle 0 ou π)', status: 'numerique', method: 'Vecteur associé à la partie antisymétrique, normalisé ; il vaut ±u selon le signe de sin θ.' },
      { id: 'Rv', label: '$Rv$', value: `$${vecTex(image, 3)}$`, status: 'exact' },
      { id: 'norm', label: String.raw`$|Rv|-|v|$`, value: fmt(Math.hypot(...image) - Math.hypot(...st.v), 12), status: 'numerique', method: 'Conservation de la norme, à l’arrondi près.' },
    ],
    equations: [
      { id: 'rodrigues', tex: String.raw`$\exp(\theta\widehat u)=I+\sin\theta\,\widehat u+(1-\cos\theta)\,\widehat u^{\,2}$ pour $|u|=1$, car $\widehat u^{\,3}=-\widehat u$.`, status: 'exact' },
      { id: 'hat', tex: String.raw`$\widehat u\,x=u\times x$, $\ [\widehat\omega,\widehat\eta]=\widehat{\omega\times\eta}$ : $(\mathbb R^3,\times)\simeq\mathfrak{so}(3)$.`, status: 'exact' },
      { id: 'u', tex: String.raw`$u=${vecTex(u, 3)}$, $\ \theta=${texNum((st.theta * 180) / Math.PI, 1)}^\circ$.`, status: 'exact' },
    ],
    hypotheses: [{ id: 'unit', label: String.raw`$|u|=1$`, state: 'satisfaite', detail: 'L’axe saisi est normalisé avant le calcul.' }],
    conclusions: [
      { id: 'so3', label: String.raw`$R\in SO(3)$`, state: 'illustrative', detail: `Vérifié à ${fmt(Math.max(orth, Math.abs(dR - 1)), 12)} près.` },
      { id: 'axe', label: String.raw`$Ru=u$ : l'axe est fixe`, state: 'illustrative', detail: `|Ru − u| = ${fmt(vdist(matVec(R, u), u), 12)}.` },
    ],
  };
  return { readout, R, axis: u, image, circle, arc, frame };
}
