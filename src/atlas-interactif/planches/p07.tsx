/**
 * Planche 7 — Champs, courbes intégrales et flots.
 * Rotation uniforme X = (−y, x) : Φ_t = R_t et Φ_{s+t} = Φ_s ∘ Φ_t. Descente de
 * V = (x² + 2,16 y²)/2 : X = −grad V, Φ_t(x, y) = (x e^{−t}, y e^{−2,16 t}), V décroît.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arc, Arrow, C, Caption, Circle, Curve, Dot, DraggablePoint, Field, f2, Plot, Slider } from '../kit2d';
import { PlayButton, usePlayer } from '../hooks';
import { linspace, rot } from '../math';

const K = 2.16;
const V = (x: number, y: number) => (x * x + K * y * y) / 2;
const flowV = ([x, y]: [number, number], t: number): [number, number] => [x * Math.exp(-t), y * Math.exp(-K * t)];

export default function P07() {
  const [p, setP] = useState<[number, number]>([1.2, 0.3]);
  const [t, setT] = useState(1.2);
  const [s, setS] = useState(0.8);
  const [q, setQ] = useState<[number, number]>([1.6, 1.1]);
  const [tv, setTv] = useState(0.6);
  const player = usePlayer(5000, (k) => setTv(3 * k));
  const r = Math.hypot(p[0], p[1]);
  const a0 = Math.atan2(p[1], p[0]);
  const pt = rot(t, p);
  const pts = rot(s, pt);

  const rotation = (
    <div>
      <Plot xDomain={[-2, 2]} yDomain={[-2, 2]} width={360} height={360} grid={false} ariaLabel="Flot d'une rotation uniforme">
        <Field F={([x, y]) => [-y, x]} domain={[-2, 2, -2, 2]} color={C.teal} n={9} opacity={0.35} />
        <Circle c={[0, 0]} r={r} color={C.faint} width={1.2} />
        <Arc c={[0, 0]} r={r} a0={a0} a1={a0 + t} color={C.orange} width={3} arrow />
        <Arc c={[0, 0]} r={r * 0.92} a0={a0 + t} a1={a0 + t + s} color={C.violet} width={2.4} arrow />
        <Dot x={pt[0]} y={pt[1]} color={C.orange} label="Φₜ(p)" r={4} />
        <Dot x={pts[0]} y={pts[1]} color={C.violet} label="Φₛ(Φₜ(p))" r={4} dy={18} />
        <DraggablePoint x={p[0]} y={p[1]} onChange={(x, y) => setP([x, y])} name="Point p" color={C.ink} label="p" bounds={[-1.9, 1.9, -1.9, 1.9]} step={0.05} r={6} />
      </Plot>
      <Caption>{String.raw`$\Phi_t(p)=R_tp$ : un point tourne d'un angle $t$.`}</Caption>
    </div>
  );

  const traj = linspace(0, 4, 160).map((tt) => flowV(q, tt));
  const cur = flowV(q, tv);
  const descent = (
    <div>
      <Plot xDomain={[-2.2, 2.2]} yDomain={[-1.6, 1.6]} width={380} height={276} grid={false} ariaLabel="Courbes intégrales de moins le gradient de V">
        {[0.15, 0.6, 1.3, 2.3].map((c) => (
          <Curve key={c} points={linspace(0, 2 * Math.PI, 96).map((u) => [Math.sqrt(2 * c) * Math.cos(u), Math.sqrt((2 * c) / K) * Math.sin(u)] as [number, number])} color={C.faint} width={1} />
        ))}
        {[[-1.9, 1.2], [1.9, -1.1], [-1.6, -1.3], [2, 0.9]].map((s0, i) => (
          <Curve key={i} points={linspace(0, 4, 100).map((tt) => flowV(s0 as [number, number], tt))} color={C.teal} width={1.3} />
        ))}
        <Curve points={traj} color={C.orange} width={2.4} />
        <Arrow a={cur} b={[cur[0] - 0.35 * cur[0], cur[1] - 0.35 * K * cur[1]]} color={C.orange} width={2} />
        <Dot x={cur[0]} y={cur[1]} color={C.orange} r={5} />
        <DraggablePoint x={q[0]} y={q[1]} onChange={(x, y) => setQ([x, y])} name="Point de départ" color={C.ink} label="q" bounds={[-2.1, 2.1, -1.5, 1.5]} step={0.05} r={6} />
      </Plot>
      <Caption>Niveaux de V = (x² + 2,16 y²)/2 ; les courbes intégrales les traversent vers le centre.</Caption>
    </div>
  );

  return (
    <PlateScene
      n={7}
      panels={[
        { title: 'Rotation uniforme', render: () => rotation },
        { title: 'Descente de potentiel', render: () => descent },
      ]}
      identity={String.raw`$\dfrac{d}{dt}\Phi_t(p)=X(\Phi_t(p))$, $\ \Phi_0=\mathrm{Id}$, $\ \Phi_{t+s}=\Phi_t\circ\Phi_s$ ; pour $X=-\nabla V$ : $\dfrac{d}{dt}V(\Phi_t(p))=-|\nabla V|^2$.`}
      controls={
        <>
          <Slider label="Temps t (rotation)" value={t} min={0} max={6.28} step={0.01} onChange={setT} format={(x) => f2(x)} />
          <Slider label="Temps s ajouté (rotation)" value={s} min={0} max={3.14} step={0.01} onChange={setS} format={(x) => f2(x)} />
          <Slider
            label="Temps (descente)"
            value={tv}
            min={0}
            max={3}
            step={0.01}
            onChange={(x) => {
              player.stop();
              setTv(x);
            }}
            format={(x) => f2(x)}
          />
          <PlayButton player={player} label="Suivre la courbe intégrale" />
        </>
      }
      observations={[
        { id: 'groupe', text: String.raw`Avec $t$ puis $s$, on arrive au même point qu'avec $t+s$ : $\Phi_s\circ\Phi_t=\Phi_{t+s}$.`, done: t > 0.3 && s > 0.3 },
        { id: 'tour', text: String.raw`Pour $t=2\pi$, la rotation ramène $p$ à lui-même.`, done: Math.abs(t - 2 * Math.PI) < 0.03 },
        { id: 'descente', text: 'Suis la courbe intégrale : V décroît et le point tend vers le minimum.', done: tv > 2.5 },
      ]}
      readings={[
        { label: String.raw`$|\Phi_s(\Phi_t(p))-\Phi_{t+s}(p)|$`, value: f2(Math.hypot(pts[0] - rot(t + s, p)[0], pts[1] - rot(t + s, p)[1]), 6), status: 'exact' },
        { label: String.raw`$V(q)$ puis $V(\Phi_t(q))$`, value: `${f2(V(q[0], q[1]), 3)} → ${f2(V(cur[0], cur[1]), 3)}`, status: 'exact' },
      ]}
    />
  );
}
