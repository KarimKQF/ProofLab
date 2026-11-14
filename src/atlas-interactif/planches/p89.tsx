/**
 * Planche 89 — Pendule, niveaux réguliers et séparatrice.
 * H(q, p) = p²/2 − cos q sur le cylindre (q ∈ [−π, π], bords identifiés). Niveaux H < 1 :
 * libration ; H = 1 : séparatrice, qui passe par le point singulier (π, 0) ; H > 1 : rotation.
 * Périodes : libration T = 4K(k) avec k² = (1 + H)/2 ; rotation T = 2kK(k) avec k² = 2/(1 + H),
 * K l'intégrale elliptique complète (calculée par moyenne arithmético-géométrique).
 */
import { useMemo, useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, ClippedCurve, Dot, DraggablePoint, f2, Label, Plot, Segment } from '../kit2d';
import { PlayButton, usePlayer } from '../hooks';
import { linspace } from '../math';

const PI = Math.PI;
const DOM: [number, number, number, number] = [-PI, PI, -2.75, 2.75];
const energy = (q: number, p: number) => (p * p) / 2 - Math.cos(q);

function agm(a0: number, b0: number): number {
  let a = a0;
  let b = b0;
  for (let i = 0; i < 60 && Math.abs(a - b) > 1e-15 * a; i++) {
    const m = (a + b) / 2;
    b = Math.sqrt(a * b);
    a = m;
  }
  return a;
}
const ellK = (k: number) => PI / (2 * agm(1, Math.sqrt(Math.max(0, 1 - k * k))));

function period(H: number): number {
  if (H <= -1) return 2 * PI;
  if (Math.abs(H - 1) < 1e-9) return Infinity;
  if (H < 1) return 4 * ellK(Math.sqrt((1 + H) / 2));
  const k = Math.sqrt(2 / (1 + H));
  return 2 * k * ellK(k);
}

/** Morceaux de la courbe de niveau H (fermée pour H < 1, deux branches sinon). */
function level(H: number, branch?: 1 | -1): [number, number][][] {
  if (H <= -1) return [];
  if (H < 1) {
    const qm = Math.acos(-H);
    const up = linspace(-PI / 2, PI / 2, 120).map((s) => {
      const q = qm * Math.sin(s);
      return [q, Math.sqrt(Math.max(0, 2 * (H + Math.cos(q))))] as [number, number];
    });
    return [[...up, ...up.slice().reverse().map(([q, p]) => [q, -p] as [number, number])]];
  }
  const half = (s: 1 | -1) => linspace(-PI, PI, 240).map((q) => [q, s * Math.sqrt(Math.max(0, 2 * (H + Math.cos(q))))] as [number, number]);
  return branch ? [half(branch)] : [half(1), half(-1)];
}

/** Trajectoire RK4 de q′ = p, p′ = −sin q, avec q ramené dans [−π, π[ (morceaux séparés aux bords). */
function trajectory(q0: number, p0: number, duration: number, dt = 0.02) {
  const n = Math.ceil(duration / dt);
  const raw: [number, number][] = [[q0, p0]];
  let q = q0;
  let p = p0;
  for (let i = 0; i < n; i++) {
    const k1q = p;
    const k1p = -Math.sin(q);
    const k2q = p + (dt / 2) * k1p;
    const k2p = -Math.sin(q + (dt / 2) * k1q);
    const k3q = p + (dt / 2) * k2p;
    const k3p = -Math.sin(q + (dt / 2) * k2q);
    const k4q = p + dt * k3p;
    const k4p = -Math.sin(q + dt * k3q);
    q += (dt / 6) * (k1q + 2 * k2q + 2 * k3q + k4q);
    p += (dt / 6) * (k1p + 2 * k2p + 2 * k3p + k4p);
    raw.push([q, p]);
  }
  return raw;
}
const wrap = (q: number) => q - 2 * PI * Math.floor((q + PI) / (2 * PI));

export default function P89() {
  const [q0, setQ0] = useState(1.2);
  const [p0, setP0] = useState(0);
  const [moved, setMoved] = useState(false);
  const [tau, setTau] = useState(0);
  const H0 = energy(q0, p0);
  const T = period(H0);
  const D = Math.min(Number.isFinite(T) ? T : 30, 30);
  const traj = useMemo(() => trajectory(q0, p0, D), [q0, p0, D]);
  const player = usePlayer(6000, (k) => setTau(k));
  const idx = Math.min(traj.length - 1, Math.round(tau * (traj.length - 1)));
  const [qt, pt] = traj[idx]!;
  const drift = Math.abs(energy(...traj[traj.length - 1]!) - H0);
  const regime = Math.abs(H0 - 1) < 0.01 ? 'séparatrice' : H0 < 1 ? 'libration' : 'rotation';
  const branch: 1 | -1 = p0 >= 0 ? 1 : -1;
  const portrait = (
    <div>
      <Plot xDomain={[-PI, PI]} yDomain={[-2.75, 2.75]} width={640} height={330} ariaLabel="Portrait de phase du pendule">
        {[-0.6, 0, 0.5].flatMap((H) => level(H)).map((pts, i) => (
          <ClippedCurve key={`l${i}`} points={pts} domain={DOM} color={C.teal} width={1.4} />
        ))}
        {level(1).map((pts, i) => (
          <ClippedCurve key={`s${i}`} points={pts} domain={DOM} color={C.orange} width={2.2} />
        ))}
        {level(1.7).map((pts, i) => (
          <ClippedCurve key={`r${i}`} points={pts} domain={DOM} color={C.violet} width={1.4} />
        ))}
        {(H0 < 1 ? level(H0) : level(H0, branch)).map((pts, i) => (
          <ClippedCurve key={`h${i}`} points={pts} domain={DOM} color={C.gold} width={3} />
        ))}
        <Segment a={[-PI, -2.75]} b={[-PI, 2.75]} color={C.faint} width={1} dash="5 4" />
        <Segment a={[PI, -2.75]} b={[PI, 2.75]} color={C.faint} width={1} dash="5 4" />
        <Dot x={PI} y={0} color={C.orange} r={4} />
        <Dot x={-PI} y={0} color={C.orange} r={4} />
        <Label x={0.35} y={0.62} text="Libration" color={C.teal} size={12} />
        <Label x={-2.55} y={1.25} text="Séparatrice" color={C.orange} size={12} />
        <Label x={1.9} y={2.45} text="Rotation" color={C.violet} size={12} />
        <Dot x={wrap(qt)} y={pt} color={C.orange} r={5.5} />
        <DraggablePoint
          x={q0}
          y={p0}
          onChange={(x, y) => {
            player.stop();
            setTau(0);
            setMoved(true);
            setQ0(x);
            setP0(y);
          }}
          name="Point initial"
          color={C.ink}
          step={0.05}
          bounds={[-PI + 0.01, PI - 0.01, -2.6, 2.6]}
          r={6}
        />
      </Plot>
      <Caption>{String.raw`Doré : le niveau du point initial (blanc, à déplacer). Orange plein : la position au temps $t$. Pointillés : les bords $q=\pm\pi$, identifiés.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={89}
      panels={[{ title: 'Niveaux réguliers et séparatrice', render: () => portrait }]}
      identity={String.raw`$H(q,p)=p^2/2-\cos q$, $\qquad H=1$ sur la séparatrice, $\qquad dH=\sin q\,dq+p\,dp$ s'annule en $(\pi,0)$.`}
      controls={
        <>
          <p className="text-[13px] text-text-2">Déplace le point initial (souris ou flèches), puis lance le mouvement.</p>
          <PlayButton player={player} label="Suivre l’orbite" />
        </>
      }
      observations={[
        { id: 'libration', text: 'Place le point près de l’origine : l’angle oscille autour de 0 sans faire le tour (libration).', done: moved && H0 < 0.5 },
        { id: 'rotation', text: String.raw`Place le point au-dessus de la séparatrice : l'angle fait des tours complets ; les bords $q=\pm\pi$ sont identifiés.`, done: H0 > 1.1 },
        { id: 'periode', text: 'Approche la séparatrice par l’intérieur : la période grandit sans borne.', done: H0 > 0.97 && H0 < 1 },
      ]}
      readings={[
        { label: String.raw`$H(q_0,p_0)$`, value: f2(H0, 4), status: 'exact' },
        { label: 'Régime', value: regime, status: 'exact' },
        { label: 'Période (intégrale elliptique)', value: Number.isFinite(T) ? f2(T, 4) : 'infinie', status: 'exact' },
        { label: String.raw`Écart $|H(t)-H_0|$ en fin de trajectoire (RK4)`, value: drift.toExponential(1).replace('.', ','), status: 'numerique' },
      ]}
      note="La trajectoire animée est calculée par Runge-Kutta d’ordre 4 (pas 0,02) sur une période, ou sur 30 unités de temps près de la séparatrice."
    />
  );
}
