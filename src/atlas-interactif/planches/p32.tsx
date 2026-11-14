/**
 * Planche 32 — Sous-groupes à un paramètre.
 * g_t = exp(tX) = R_{ωt} dans SO(2) : g_s g_t = g_{s+t}, g₀ = e, g_{−s} = g_s⁻¹. Sur la droite
 * des temps, les incréments s'ajoutent de la même façon.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arc, Arrow, C, Caption, Circle, Dot, f2, Label, Plot, Segment, Slider } from '../kit2d';

export default function P32() {
  const [s, setS] = useState(0.7);
  const [t, setT] = useState(0.9);
  const [w, setW] = useState(1);
  const gs = w * s;
  const gst = w * (s + t);
  const circle = (
    <div>
      <Plot xDomain={[-1.4, 1.4]} yDomain={[-1.4, 1.4]} width={300} height={300} grid={false} ariaLabel="Les temps s'additionnent sur le cercle">
        <Circle c={[0, 0]} r={1} color={C.faint} width={1.4} />
        <Arc c={[0, 0]} r={1} a0={0} a1={gs} color={C.teal} width={3.2} arrow />
        <Arc c={[0, 0]} r={1.08} a0={gs} a1={gst} color={C.orange} width={3.2} arrow />
        <Dot x={1} y={0} color={C.ink} label="e" r={4} dx={8} dy={14} />
        <Dot x={Math.cos(gs)} y={Math.sin(gs)} color={C.teal} label="gₛ" r={4.5} />
        <Dot x={Math.cos(gst)} y={Math.sin(gst)} color={C.orange} label="gₛ₊ₜ" r={4.5} />
      </Plot>
      <Caption>{String.raw`Vert : $g_s$. Orange : on poursuit de $t$, on arrive en $g_{s+t}=g_sg_t$.`}</Caption>
    </div>
  );
  const line = (
    <div>
      <Plot xDomain={[-2.4, 3.4]} yDomain={[-1, 1]} width={320} height={110} grid={false} ariaLabel="Même incrément en temps">
        <Segment a={[-2.3, 0]} b={[3.3, 0]} color={C.faint} width={1.2} />
        <Arrow a={[0, 0.25]} b={[s, 0.25]} color={C.teal} width={2.4} />
        <Arrow a={[s, 0.25]} b={[s + t, 0.25]} color={C.orange} width={2.4} />
        <Dot x={0} y={0} color={C.ink} r={3.5} />
        <Dot x={s} y={0} color={C.teal} r={3.5} />
        <Dot x={s + t} y={0} color={C.orange} r={3.5} />
        <Label x={0} y={-0.55} text="0" color={C.muted} anchor="middle" />
        <Label x={s} y={-0.55} text="s" color={C.teal} anchor="middle" italic />
        <Label x={s + t} y={-0.55} text="s + t" color={C.orange} anchor="middle" italic />
      </Plot>
      <Caption>{String.raw`$t\mapsto g_t$ est un morphisme $(\mathbb R,+)\to G$.`}</Caption>
    </div>
  );
  const err = Math.hypot(Math.cos(gs) * Math.cos(w * t) - Math.sin(gs) * Math.sin(w * t) - Math.cos(gst), Math.sin(gs) * Math.cos(w * t) + Math.cos(gs) * Math.sin(w * t) - Math.sin(gst));
  return (
    <PlateScene
      n={32}
      panels={[
        { title: 'Les temps s’additionnent', render: () => circle },
        { title: 'Même incrément en temps', render: () => line },
      ]}
      identity={String.raw`$g_{s+t}=g_sg_t$, $\quad g_t=\exp(tX)$, $\quad g_0=e$, $\quad g_{-t}=g_t^{-1}$.`}
      controls={
        <>
          <Slider label="Temps s" value={s} min={-2} max={2} step={0.01} onChange={setS} format={(x) => f2(x)} />
          <Slider label="Incrément t" value={t} min={-2} max={2} step={0.01} onChange={setT} format={(x) => f2(x)} />
          <Slider label="Générateur X = ω J : ω" value={w} min={-2} max={2} step={0.01} onChange={setW} format={(x) => f2(x)} />
        </>
      }
      observations={[
        { id: 'somme', text: String.raw`Fais varier $s$ et $t$ : $g_sg_t$ et $g_{s+t}$ sont toujours le même point.`, done: Math.abs(s - 0.7) > 0.5 && Math.abs(t - 0.9) > 0.5 },
        { id: 'inverse', text: String.raw`Choisis $t=-s$ : on revient en $e$, donc $g_{-s}=g_s^{-1}$.`, done: Math.abs(s + t) < 0.02 && Math.abs(s) > 0.2 },
        { id: 'arc-double', text: String.raw`Double $\omega$ : le même temps fait parcourir un arc deux fois plus long.`, done: Math.abs(w) > 1.8 },
      ]}
      readings={[
        { label: String.raw`$|g_sg_t-g_{s+t}|$`, value: f2(err, 12), status: 'exact' },
        { label: String.raw`Angle de $g_{s+t}$`, value: f2(gst, 4), status: 'exact' },
      ]}
    />
  );
}
