/**
 * Planche 88 — Liouville-Arnold et coordonnées action-angle.
 * Avec ω = dI∧dθ, q = √(2I) cos θ et p = √(2I) sin θ, le hamiltonien H = I + εI² donne
 * I′ = 0 et θ′ = −∂H/∂I = −(1 + 2εI) : l'action fixe le cercle, l'angle est affine en t.
 * Pour ε = 0 (H = (q² + p²)/2), la pente vaut −1 pour tous les niveaux.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arc, Arrow, C, Caption, Circle, ClippedCurve, Dot, f2, Label, Plot, Segment, Slider } from '../kit2d';
import { PlayButton, usePlayer } from '../hooks';

const T_END = 3.2;
const STARTS = [0.6, -0.4];

export default function P88() {
  const [I, setI] = useState(1);
  const [t, setT] = useState(0.8);
  const [eps, setEps] = useState(0);
  const player = usePlayer(4000, (k) => setT(T_END * k));
  const w = 1 + 2 * eps * I;
  const rho = Math.sqrt(2 * I);
  const theta = (t0: number, s: number) => t0 - w * s;
  const th = theta(STARTS[0]!, t);
  const thw = Math.atan2(Math.sin(th), Math.cos(th));
  const q = rho * Math.cos(th);
  const p = rho * Math.sin(th);
  const phase = (
    <div>
      <Plot xDomain={[-2.3, 2.3]} yDomain={[-2.3, 2.3]} width={280} height={280} grid={false} ariaLabel="Action : rayon fixé dans le plan des phases">
        {[0.5, 1.5].map((r) => (
          <Circle key={r} c={[0, 0]} r={Math.sqrt(2 * r)} color={C.faint} width={1} />
        ))}
        <Circle c={[0, 0]} r={rho} color={C.teal} width={2.6} />
        <Arc c={[0, 0]} r={rho} a0={-0.9} a1={-1.5} color={C.teal} width={2.6} arrow />
        <Segment a={[0, 0]} b={[q, p]} color={C.orange} width={1.8} />
        <Arc c={[0, 0]} r={0.35} a0={0} a1={thw} color={C.orange} width={1.4} />
        <Dot x={q} y={p} color={C.orange} r={5} />
        <Label x={0.42 * Math.cos(thw / 2)} y={0.42 * Math.sin(thw / 2)} text="θ" color={C.orange} size={13} dx={4} italic />
        <Label x={0} y={-2.15} text="I = (q² + p²)/2" color={C.muted} size={12} anchor="middle" italic />
      </Plot>
      <Caption>{String.raw`Cercle de rayon $\sqrt{2I}$ ; le point $(q,p)$ tourne dans le sens indirect.`}</Caption>
    </div>
  );
  const lo = -w * T_END - 0.8;
  const D: [number, number, number, number] = [0, T_END, lo, 1];
  const lines = (
    <div>
      <Plot xDomain={[0, T_END]} yDomain={[lo, 1]} width={320} height={280} ariaLabel="Angle déplié, affine en t">
        {STARTS.map((t0, i) => (
          <ClippedCurve key={t0} points={[[0, t0], [T_END, theta(t0, T_END)]]} domain={D} color={i === 0 ? C.teal : C.orange} width={2.2} />
        ))}
        <Segment a={[t, lo]} b={[t, 1]} color={C.faint} width={1} dash="4 4" />
        {STARTS.map((t0, i) => (
          <Dot key={t0} x={t} y={theta(t0, t)} color={i === 0 ? C.teal : C.orange} r={4.5} />
        ))}
        <Arrow a={[2.3, theta(STARTS[0]!, 2.3) + 0.55]} b={[2.3, theta(STARTS[0]!, 2.3) + 0.08]} color={C.muted} width={1.2} />
        <Label x={2.3} y={theta(STARTS[0]!, 2.3) + 0.65} text={Math.abs(w - 1) < 1e-9 ? 'θ(t) = θ₀ − t' : `θ(t) = θ₀ − ${f2(w, 2)} t`} color={C.teal} size={12} anchor="middle" italic />
      </Plot>
      <Caption>Angle déplié sur la droite : deux départs sur le même niveau donnent deux droites parallèles.</Caption>
    </div>
  );
  return (
    <PlateScene
      n={88}
      panels={[
        { title: 'Action : rayon fixé dans le plan des phases', render: () => phase },
        { title: 'Angle déplié : affine en t', render: () => lines },
      ]}
      identity={String.raw`$\omega=\sum_i dI_i\wedge d\theta_i$, $\qquad I'=0$, $\qquad\theta'=-\nabla_IH(I)$`}
      controls={
        <>
          <Slider label="Action I" value={I} min={0.1} max={2} step={0.01} onChange={setI} format={(x) => f2(x)} />
          <Slider label="Terme ε de H = I + εI²" value={eps} min={0} max={0.5} step={0.01} onChange={setEps} format={(x) => f2(x)} />
          <Slider
            label="Temps t"
            value={t}
            min={0}
            max={T_END}
            step={0.01}
            onChange={(x) => {
              player.stop();
              setT(x);
            }}
            format={(x) => f2(x)}
          />
          <PlayButton player={player} label="Faire avancer t" />
        </>
      }
      observations={[
        { id: 'rayon', text: String.raw`Change $I$ : le rayon $\sqrt{2I}$ change ; chaque cercle est un niveau de $H$ et $I$ reste constant le long du mouvement.`, done: Math.abs(I - 1) > 0.3 },
        { id: 'affine', text: 'Fais avancer t : θ décroît d’une même quantité à chaque unité de temps ; les deux droites restent parallèles.', done: t > 3 },
        { id: 'pente', text: String.raw`Avec $\varepsilon>0$, la pente dépend du niveau : $\theta'=-(1+2\varepsilon I)$. Change $I$ et regarde la pente.`, done: eps > 0.1 && Math.abs(I - 1) > 0.3 },
      ]}
      readings={[
        { label: String.raw`$I(t)$`, value: f2(I, 3), status: 'exact' },
        { label: String.raw`$\theta'=-\partial H/\partial I$`, value: f2(-w, 4), status: 'exact' },
        { label: String.raw`$(q,p)=\sqrt{2I}\,(\cos\theta,\sin\theta)$`, value: `(${f2(q, 3)} ; ${f2(p, 3)})`, status: 'exact' },
      ]}
    />
  );
}
