/**
 * Laboratoire G, scène « Revêtement SU(2) → SO(3) » (résultat 42, planche 36).
 *
 * Le lacet γ(τ) = rotation d'angle τ autour de u, τ ∈ [0, 2πn] (n = 1 ou 2 tours), est
 * relevé dans S³ ≃ SU(2) de deux façons : par la formule q(τ) = cos(τ/2) + u sin(τ/2), et
 * pas à pas (à chaque pas, l'antécédent ±q qui prolonge continûment le précédent). Modèle
 * de la boule : la rotation d'angle β ∈ [−π, π] autour de u est le point βu de la boule de
 * rayon π, les points antipodaux du bord étant identifiés.
 */
import { liftRotationPath, matDist, qFromAxisAngle, qneg, rodrigues, rotationAngle, rotationOfQuat, type Quat, type Vec } from './lie-core';
import { fmt, type SceneReadout } from './types';

export interface CoverState {
  turns: 1 | 2;
  /** Avancement dans [0, 1]. */
  s: number;
  u: Vec;
}

export interface CoverData {
  readout: SceneReadout;
  tau: number;
  /** Relevé par la formule. */
  q: Quat;
  /** Relevé pas à pas (dernier point). */
  qLift: Quat;
  /** Abscisse β(τ) ∈ [−π, π] dans le modèle de la boule, échantillonnée. */
  ballPath: [number, number][];
  crossings: number;
  /** Angle τ/2 du relevé sur le cercle de ℍ engendré par 1 et u. */
  liftAngle: number;
  done: boolean;
}

/** β(τ) ∈ [−π, π[ : angle de la même rotation, ramené. */
export const wrapAngle = (tau: number): number => {
  const r = (((tau + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  return r - Math.PI;
};

/** Nombre de passages par le bord de la boule (τ = π + 2kπ) entre 0 et τ. */
export const boundaryCrossings = (tau: number): number => (tau < Math.PI - 1e-12 ? 0 : Math.floor((tau - Math.PI) / (2 * Math.PI) + 1e-12) + 1);

export function coverScene(st: CoverState): CoverData {
  const T = 2 * Math.PI * st.turns;
  const tau = T * st.s;
  const q = qFromAxisAngle(st.u, tau);
  const steps = Math.max(4, Math.round(720 * st.turns * st.s));
  const path = liftRotationPath((x) => rodrigues(st.u, x), tau, steps);
  const qLift = path[path.length - 1]!;
  const ballPath: [number, number][] = Array.from({ length: 241 }, (_, k) => {
    const x = (tau * k) / 240;
    return [x, wrapAngle(x)];
  });
  const crossings = boundaryCrossings(tau);
  const done = st.s >= 1 - 1e-9;
  const angleR = rotationAngle(rodrigues(st.u, tau));
  const liftGap = Math.min(Math.hypot(...q.map((v, i) => v - qLift[i]!)), 9);
  const endsAt = qLift[0];
  const fiberGap = matDist(rotationOfQuat(q), rotationOfQuat(qneg(q)));

  const verdict =
    st.turns === 1
      ? 'Le relevé issu de 1 aboutit en −1 : ce n’est pas un lacet de S³, donc γ n’est pas contractile dans SO(3).'
      : 'Le relevé issu de 1 revient en 1 : c’est un lacet de S³, simplement connexe ; il se contracte, et son image aussi.';

  const readout: SceneReadout = {
    measures: [
      { id: 'tau', label: String.raw`Angle parcouru $\tau$`, value: `${fmt((tau * 180) / Math.PI, 1)}° = ${fmt(tau / Math.PI, 3)}π`, numeric: tau, status: 'exact' },
      { id: 'angle', label: String.raw`Angle de $\gamma(\tau)$, dans $[0,\pi]$`, value: `${fmt((angleR * 180) / Math.PI, 2)}°`, numeric: angleR, status: 'numerique', method: 'Relu sur la trace de la matrice de rotation.' },
      { id: 'q', label: String.raw`$q(\tau)=\cos\frac\tau2+u\sin\frac\tau2$`, value: `(${q.map((v) => fmt(v, 4)).join(' ; ')})`, status: 'exact' },
      { id: 'lift', label: 'Relevé pas à pas, dernier point', value: `(${qLift.map((v) => fmt(v, 4)).join(' ; ')})`, status: 'numerique', method: `${steps} pas : antécédent de chaque rotation par la méthode de Shepperd, signe choisi par continuité.` },
      { id: 'gap', label: 'Écart entre les deux relevés', value: fmt(liftGap, 10), numeric: liftGap, status: 'numerique', method: 'Norme euclidienne dans ℝ⁴.' },
      { id: 'cross', label: 'Passages par le bord de la boule', value: String(crossings), numeric: crossings, status: 'exact' },
      { id: 'fibre', label: String.raw`$\|p(q)-p(-q)\|$ : la fibre $\{q,-q\}$`, value: fmt(fiberGap, 12), numeric: fiberGap, status: 'numerique', method: 'Matrices de v ↦ qvq⁻¹ et v ↦ (−q)v(−q)⁻¹ calculées séparément.' },
    ],
    equations: [
      { id: 'p', tex: String.raw`$p:S^3\to SO(3)$, $p(q)v=qvq^{-1}$ ; $p(-q)=p(q)$ et $\ker p=\{\pm1\}$ : revêtement à deux feuillets.`, status: 'exact' },
      { id: 'releve', tex: String.raw`$p\big(\cos\frac\tau2+u\sin\frac\tau2\big)=$ rotation d'angle $\tau$ autour de $u$ ; le relevé issu de $1$ est unique.`, status: 'exact' },
      { id: 'pi1', tex: String.raw`Un tour : $q(2\pi)=-1$. Deux tours : $q(4\pi)=1$. Donc $\pi_1(SO(3))\simeq\mathbb Z/2$.`, status: 'exact', note: 'Exercice 42, difficile.' },
    ],
    hypotheses: [
      { id: 'revetement', label: String.raw`$p$ est un revêtement (relèvement unique des chemins)`, state: 'supposee', detail: 'Résultat 42 ; l’unicité justifie de suivre l’antécédent par continuité.' },
      { id: 's3', label: String.raw`$S^3$ est simplement connexe`, state: 'supposee', detail: 'Outil admis du parcours.' },
    ],
    conclusions: [
      {
        id: 'verdict',
        label: done ? verdict : 'Avance jusqu’au bout du lacet pour conclure.',
        state: done ? 'illustrative' : 'non-garantie',
        detail: done ? `Partie réelle du point d’arrivée : ${fmt(endsAt, 6)}. L’argument est la démonstration de l’exercice 42 (difficile).` : undefined,
      },
    ],
  };
  return { readout, tau, q, qLift, ballPath, crossings, liftAngle: tau / 2, done };
}
