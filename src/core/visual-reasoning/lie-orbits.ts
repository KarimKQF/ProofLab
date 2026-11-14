/**
 * Laboratoire G, scène « Orbites et stabilisateurs » (résultat 38, planches 24 à 26).
 *
 * Trois actions. Les dimensions sont calculées par le rang de l'action infinitésimale
 * ξ ↦ ξ·x (dimension de l'orbite) et par son noyau (dimension du stabilisateur) :
 *  - SO(3) sur la sphère S² : orbite S², stabilisateur SO(2) ;
 *  - GL(2) par conjugaison sur A = diag(λ₁, λ₂) : en coordonnées (a − m, (b + c)/2, (b − c)/2)
 *    l'orbite est l'hyperboloïde (a − m)² + y² − z² = δ², m = (λ₁ + λ₂)/2, δ = (λ₁ − λ₂)/2 ;
 *    pour λ₁ = λ₂ elle se réduit à un point, et le cône limite contient l'orbite du bloc de Jordan ;
 *  - ℝ sur le tore par t·(θ₁, θ₂) = (θ₁ + t, θ₂ + αt) : orbite fermée si α ∈ ℚ, dense sinon.
 */
import { expm, eye, matBracket, matMul, rank, rodrigues, unit, vcross, type Mat, type Vec } from './lie-core';
import { fmt, vecTex, type SceneReadout } from './types';

const basis = (n: number): Mat[] =>
  Array.from({ length: n * n }, (_, k) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i * n + j === k ? 1 : 0))));
/** dim 𝔰𝔬(n) : noyau de A ↦ A + Aᵀ. */
export const dimSO = (n: number): number => n * n - rank(basis(n).map((E) => E.map((r, i) => r.map((v, j) => v + E[j]![i]!)).flat()));

/* ───────────── SO(3) sur S² ───────────── */

export function spherePoint(theta: number, phi: number): Vec {
  return [Math.sin(theta) * Math.cos(phi), Math.sin(theta) * Math.sin(phi), Math.cos(theta)];
}

export interface SphereData {
  readout: SceneReadout;
  p: Vec;
  stabilizerCircle: Vec[];
  latitude: Vec[];
  meridianLike: Vec[];
  q0: Vec;
}

export function sphereScene(theta: number, phi: number): SphereData {
  const p = spherePoint(theta, phi);
  const images = [0, 1, 2].map((i) => vcross(eye(3)[i]!, p));
  const orbitDim = rank(images);
  const stabDim = 3 - orbitDim;
  const g = dimSO(3);
  const perp = unit(Math.abs(p[2]!) < 0.9 ? vcross(p, [0, 0, 1]) : vcross(p, [1, 0, 0]));
  const q0 = rodrigues(perp, (55 * Math.PI) / 180).map((r) => r.reduce((s, a, j) => s + a * p[j]!, 0));
  const circle = (axis: Vec, x: Vec) => Array.from({ length: 97 }, (_, k) => rodrigues(axis, (2 * Math.PI * k) / 96).map((r) => r.reduce((s, a, j) => s + a * x[j]!, 0)));
  const readout: SceneReadout = {
    measures: [
      { id: 'p', label: '$x$', value: `$${vecTex(p, 3)}$`, status: 'exact' },
      { id: 'dimG', label: String.raw`$\dim SO(3)=\dim\mathfrak{so}(3)$`, value: String(g), numeric: g, status: 'exact' },
      { id: 'dimOrbit', label: String.raw`Rang de $\xi\mapsto\xi\times x$ : $\dim(G\cdot x)$`, value: String(orbitDim), numeric: orbitDim, status: 'exact' },
      { id: 'dimStab', label: String.raw`Noyau : $\dim G_x$`, value: String(stabDim), numeric: stabDim, status: 'exact' },
    ],
    equations: [
      { id: 'formule', tex: String.raw`$\dim(G\cdot x)=\dim G-\dim G_x$ : $${orbitDim}=${g}-${stabDim}$.`, status: 'exact' },
      { id: 'stab', tex: String.raw`$G_x=\{R\in SO(3):Rx=x\}$ : les rotations d'axe $x$, un cercle $SO(2)$ ; $G/G_x\simeq S^2$.`, status: 'exact' },
      { id: 'infinitesimal', tex: String.raw`Action infinitésimale : $\widehat\xi\,x=\xi\times x$, de noyau $\mathbb Rx$.`, status: 'exact' },
    ],
    hypotheses: [
      { id: 'lie', label: 'G groupe de Lie agissant de façon lisse', state: 'satisfaite' },
      { id: 'compact', label: 'G compact (orbite plongée et fermée)', state: 'satisfaite' },
    ],
    conclusions: [{ id: 'orbite', label: String.raw`$G\cdot x=S^2\simeq SO(3)/SO(2)$`, state: 'illustrative', detail: 'Deux sous-groupes à un paramètre donnent deux directions indépendantes en x : l’orbite est de dimension 2.' }],
  };
  return { readout, p, stabilizerCircle: circle(p, q0), latitude: circle([0, 0, 1], p), meridianLike: circle([1, 0, 0], p), q0 };
}

/* ───────────── GL(2) par conjugaison ───────────── */

/** Coordonnées d'affichage (a − m, (b + c)/2, (b − c)/2) d'une matrice M = [[a, b], [c, d]]. */
export const conjCoords = (M: Mat, m: number): Vec => [M[0]![0]! - m, (M[0]![1]! + M[1]![0]!) / 2, (M[0]![1]! - M[1]![0]!) / 2];

export interface ConjugationData {
  readout: SceneReadout;
  m: number;
  delta: number;
  /** Grille de la surface (lignes × colonnes de points 3D). */
  surface: Vec[][];
  pointA: Vec;
  jordan: Vec | null;
  samples: Vec[];
}

/** Rang de l'action infinitésimale ξ ↦ [ξ, A] sur 𝔤𝔩(2). */
export const conjugationRank = (A: Mat): number => rank(basis(2).map((E) => matBracket(E, A).flat()));

export function conjugationScene(l1: number, l2: number): ConjugationData {
  const A = [
    [l1, 0],
    [0, l2],
  ];
  const m = (l1 + l2) / 2;
  const delta = (l1 - l2) / 2;
  const r = conjugationRank(A);
  const J = [
    [m, 1],
    [0, m],
  ];
  const rJ = conjugationRank(J);
  const equal = Math.abs(delta) < 1e-9;
  const surface: Vec[][] = [];
  if (!equal) {
    const W = Math.asinh(1.5 / Math.abs(delta));
    for (let i = 0; i <= 24; i++) {
      const w = -W + (2 * W * i) / 24;
      surface.push(Array.from({ length: 49 }, (_, k) => {
        const ph = (2 * Math.PI * k) / 48;
        return [Math.abs(delta) * Math.cosh(w) * Math.cos(ph), Math.abs(delta) * Math.cosh(w) * Math.sin(ph), Math.abs(delta) * Math.sinh(w)];
      }));
    }
  } else {
    for (let i = 0; i <= 24; i++) {
      const z = -1.5 + (3 * i) / 24;
      surface.push(Array.from({ length: 49 }, (_, k) => {
        const ph = (2 * Math.PI * k) / 48;
        return [Math.abs(z) * Math.cos(ph), Math.abs(z) * Math.sin(ph), z];
      }));
    }
  }
  // Éléments P A P⁻¹ pour P = exp(ξ), ξ petit (déterministe) : ils doivent vérifier l'équation de l'orbite.
  const samples: Vec[] = [];
  let maxResidual = 0;
  for (let k = 0; k < 40; k++) {
    const xi = [
      [0.6 * Math.sin(1.3 * k), 0.7 * Math.cos(0.7 * k + 1)],
      [0.7 * Math.sin(0.9 * k + 2), 0.5 * Math.cos(1.1 * k)],
    ];
    // Un P sur deux est de déterminant négatif (S = diag(1, −1)) : GL(2) a deux composantes.
    const S = k % 2 ? [[1, 0], [0, -1]] : eye(2);
    const P = matMul(S, expm(xi));
    const Pinv = matMul(expm(xi.map((row) => row.map((v) => -v))), S);
    const M = matMul(matMul(P, equal ? J : A), Pinv);
    const c = conjCoords(M, m);
    samples.push(c);
    maxResidual = Math.max(maxResidual, Math.abs(c[0]! ** 2 + c[1]! ** 2 - c[2]! ** 2 - delta * delta));
  }
  const readout: SceneReadout = {
    measures: [
      { id: 'trdet', label: String.raw`$(\operatorname{tr}A,\det A)$`, value: `(${fmt(l1 + l2, 3)} ; ${fmt(l1 * l2, 3)})`, status: 'exact' },
      { id: 'dimOrbit', label: String.raw`Rang de $\xi\mapsto[\xi,A]$ : $\dim(G\cdot A)$`, value: String(r), numeric: r, status: 'exact' },
      { id: 'dimStab', label: String.raw`$\dim G_A=4-\text{rang}$`, value: String(4 - r), numeric: 4 - r, status: 'exact' },
      ...(equal
        ? [{ id: 'jordan', label: String.raw`Bloc de Jordan $\begin{pmatrix}m&1\\0&m\end{pmatrix}$ : dimension de son orbite`, value: String(rJ), numeric: rJ, status: 'exact' as const }]
        : []),
      { id: 'residu', label: String.raw`Écart maximal de $PAP^{-1}$ à l'équation de l'orbite`, value: fmt(maxResidual, 12), numeric: maxResidual, status: 'numerique', method: '40 matrices P = exp(ξ), conjugués calculés en virgule flottante.' },
    ],
    equations: [
      { id: 'invariants', tex: String.raw`$\operatorname{tr}$ et $\det$ sont invariants par conjugaison ; avec $y=\frac{b+c}2$, $z=\frac{b-c}2$ : $(a-m)^2+y^2-z^2=\delta^2$, $m=${fmt(m, 3).replace(',', '{,}')}$, $\delta=${fmt(delta, 3).replace(',', '{,}')}$.`, status: 'exact' },
      {
        id: 'stab',
        tex: equal
          ? String.raw`$\lambda_1=\lambda_2$ : $A=mI$ commute à tout, $G_A=GL(2)$, l'orbite est le point $\{mI\}$. Le cône $(a-m)^2+y^2=z^2$ est la réunion de ce point et de l'orbite du bloc de Jordan (dimension $2$).`
          : String.raw`$\lambda_1\neq\lambda_2$ : $G_A$ est le groupe des matrices diagonales inversibles, de dimension $2$ ; l'orbite est un hyperboloïde à une nappe, de dimension $4-2=2$.`,
        status: 'exact',
        note: 'Exercice 38, difficile.',
      },
    ],
    hypotheses: [{ id: 'lie', label: 'G = GL(2) agit de façon lisse par P·M = PMP⁻¹', state: 'satisfaite' }],
    conclusions: [
      { id: 'formule', label: String.raw`$\dim(G\cdot A)=\dim G-\dim G_A$`, state: 'illustrative', detail: `${r} = 4 − ${4 - r}.` },
      ...(equal ? [{ id: 'cone', label: 'Le cône n’est pas une orbite, ni une sous-variété en son sommet', state: 'illustrative' as const, detail: 'Comparer avec le cône du résultat 35 (exercice difficile).' }] : []),
    ],
  };
  return { readout, m, delta, surface, pointA: [delta, 0, 0], jordan: equal ? conjCoords(J, m) : null, samples };
}

/* ───────────── ℝ sur le tore ───────────── */

export const SLOPES: { id: string; label: string; alpha: number; frac: [number, number] | null }[] = [
  { id: 'demi', label: '1/2', alpha: 1 / 2, frac: [1, 2] },
  { id: 'deux-tiers', label: '2/3', alpha: 2 / 3, frac: [2, 3] },
  { id: 'racine', label: '√2 − 1', alpha: Math.SQRT2 - 1, frac: null },
  { id: 'or', label: '(√5 − 1)/2', alpha: (Math.sqrt(5) - 1) / 2, frac: null },
];

const TAU = 2 * Math.PI;
const START: Vec = [0.4, 0.3];
export const TORUS_TARGET: Vec = [Math.PI + 0.55, Math.PI - 0.35];

/** Morceaux de l'orbite sur [0, T], dans le carré [0, 2π[², coupés aux recollements. */
export function torusOrbit(alpha: number, T: number): Vec[][] {
  const pieces: Vec[][] = [];
  let [x, y] = START as [number, number];
  let t = 0;
  while (t < T - 1e-12 && pieces.length < 4000) {
    const tx = (TAU - x) / 1;
    const ty = (TAU - y) / alpha;
    const dt = Math.min(tx, ty, T - t);
    pieces.push([
      [x, y],
      [x + dt, y + alpha * dt],
    ]);
    x += dt;
    y += alpha * dt;
    t += dt;
    if (x >= TAU - 1e-12) x -= TAU;
    if (y >= TAU - 1e-12) y -= TAU;
  }
  return pieces;
}

function distToSegment(p: Vec, a: Vec, b: Vec): number {
  const d = [b[0]! - a[0]!, b[1]! - a[1]!];
  const L = d[0]! ** 2 + d[1]! ** 2;
  const u = L > 0 ? Math.max(0, Math.min(1, ((p[0]! - a[0]!) * d[0]! + (p[1]! - a[1]!) * d[1]!) / L)) : 0;
  return Math.hypot(p[0]! - a[0]! - u * d[0]!, p[1]! - a[1]! - u * d[1]!);
}

export interface TorusData {
  readout: SceneReadout;
  pieces: Vec[][];
  minDist: number;
}

export function torusScene(slopeId: string, T: number): TorusData {
  const slope = SLOPES.find((s) => s.id === slopeId) ?? SLOPES[0]!;
  const pieces = torusOrbit(slope.alpha, T);
  const minDist = Math.min(...pieces.map(([a, b]) => distToSegment(TORUS_TARGET, a!, b!)));
  const q = slope.frac?.[1];
  const readout: SceneReadout = {
    measures: [
      { id: 'alpha', label: String.raw`Pente $\alpha$`, value: slope.label, status: 'exact' },
      { id: 'nature', label: 'α rationnel ?', value: slope.frac ? `oui, α = ${slope.frac[0]}/${slope.frac[1]}` : 'non', status: 'exact' },
      { id: 'periode', label: 'Période de l’orbite', value: q ? `2π·${q} ≈ ${fmt(TAU * q, 3)}` : 'aucune (orbite injective)', status: 'exact' },
      { id: 'stab', label: String.raw`Stabilisateur d'un point`, value: q ? `2π·${q}·ℤ (dimension 0)` : '{0}', status: 'exact' },
      { id: 'dist', label: 'Distance de l’orbite sur [0, T] au point cible', value: fmt(minDist, 4), numeric: minDist, status: 'numerique', method: 'Distance aux segments de l’orbite dans le carré [0, 2π[², sans tenir compte du recollement.' },
    ],
    equations: [
      { id: 'action', tex: String.raw`$t\cdot(\theta_1,\theta_2)=(\theta_1+t,\ \theta_2+\alpha t)$ modulo $2\pi$.`, status: 'exact' },
      {
        id: 'cas',
        tex: slope.frac
          ? String.raw`$\alpha=\frac pq$ : l'orbite se referme au temps $2\pi q$ ; elle est fermée, plongée, difféomorphe à $\mathbb R/2\pi q\mathbb Z$.`
          : String.raw`$\alpha\notin\mathbb Q$ : l'orbite est injective et dense (Kronecker) ; image d'une immersion injective qui n'est pas un plongement.`,
        status: 'exact',
      },
    ],
    hypotheses: [{ id: 'action', label: 'Action lisse de (ℝ, +) sur le tore', state: 'satisfaite' }],
    conclusions: [
      {
        id: 'densite',
        label: slope.frac ? 'Orbite fermée' : 'Orbite dense dans le tore',
        state: 'illustrative',
        detail: slope.frac ? `Elle reste à distance ${fmt(minDist, 3)} du point cible.` : 'Sur un temps fini, on ne voit qu’un segment : la densité se démontre, elle ne se lit pas sur la figure.',
      },
    ],
  };
  return { readout, pieces, minDist };
}

