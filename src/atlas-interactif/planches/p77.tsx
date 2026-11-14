/**
 * Planche 77 — Fibré principal, section et transition.
 * P = M × ℝ au-dessus d'un intervalle M, le groupe (ℝ, +) agissant sur les fibres. Deux
 * sections locales s_i (sur U_i) et s_j (sur U_j) diffèrent sur U_i ∩ U_j par la transition
 * g_ij(x) : s_j(x) = s_i(x) + g_ij(x). Chaque section vérifie π ∘ s = id.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, ClippedCurve, f2, Label, Plot, Poly, Segment, Slider } from '../kit2d';
import { linspace } from '../math';

const DOM: [number, number, number, number] = [0, 4, -2.4, 3.4];
const BASE = (x: number) => -1.7 + 0.08 * Math.sin(2 * x);

export default function P77() {
  const [x0, setX0] = useState(1.9);
  const [amp, setAmp] = useState(0.5);
  const [off, setOff] = useState(0.6);
  const si = (x: number) => 0.4 * Math.sin(1.5 * x) + 0.6;
  const g = (x: number) => amp * Math.sin(2 * x) + off;
  const sj = (x: number) => si(x) + g(x);
  const xs = (a: number, b: number) => linspace(a, b, 120);
  const inOverlap = x0 >= 1.4 && x0 <= 2.6;
  const top = x0 <= 2.6 ? si(x0) : sj(x0);
  const fig = (
    <div>
      <Plot xDomain={[0, 4]} yDomain={[-2.4, 3.4]} width={640} height={380} grid={false} ariaLabel="Sections locales et transition">
        <Poly points={[[1.4, -2.3], [2.6, -2.3], [2.6, 3.35], [1.4, 3.35]]} fill={C.violet} opacity={0.07} />
        {linspace(0.2, 3.8, 12).map((x) => (
          <Segment key={x} a={[x, -1.35]} b={[x, 3.3]} color={C.faint} width={1} />
        ))}
        <ClippedCurve points={xs(0, 4).map((x) => [x, BASE(x)])} domain={DOM} color={C.blue} width={2.6} />
        <Segment a={[0, -2.0]} b={[2.6, -2.0]} color={C.teal} width={4} />
        <Segment a={[1.4, -2.2]} b={[4, -2.2]} color={C.orange} width={4} />
        <Label x={0.05} y={-1.9} text="Uᵢ" color={C.teal} size={13} />
        <Label x={3.75} y={-2.1} text="Uⱼ" color={C.orange} size={13} />
        <Label x={3.82} y={-1.55} text="M" color={C.blue} size={14} italic />
        <ClippedCurve points={xs(0, 2.6).map((x) => [x, si(x)])} domain={DOM} color={C.teal} width={2.6} />
        <ClippedCurve points={xs(1.4, 4).map((x) => [x, sj(x)])} domain={DOM} color={C.orange} width={2.6} />
        <Arrow a={[x0, top]} b={[x0, BASE(x0) + 0.08]} color={C.muted} width={1.4} dash="4 3" />
        {inOverlap && <Arrow a={[x0, si(x0)]} b={[x0, sj(x0)]} color={C.violet} width={2.6} />}
      </Plot>
      <Caption>{String.raw`Traits gris : les fibres $\pi^{-1}(x)$. Vert : $s_i$ sur $U_i$. Orange : $s_j$ sur $U_j$. Bande violette : $U_i\cap U_j$, où la flèche violette mesure $g_{ij}(x)$.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={77}
      panels={[{ title: 'Projection, sections locales et transition', render: () => fig }]}
      identity={String.raw`$\pi:P\to M$, $\quad\pi\circ s=\mathrm{id}$, $\quad s_j(x)=s_i(x)\,g_{ij}(x)$ (ici, groupe additif : $s_j=s_i+g_{ij}$).`}
      controls={
        <>
          <Slider label="Point x de la base" value={x0} min={0.1} max={3.9} step={0.01} onChange={setX0} format={(v) => f2(v)} />
          <Slider label="Transition : amplitude" value={amp} min={-0.8} max={0.8} step={0.01} onChange={setAmp} format={(v) => f2(v)} />
          <Slider label="Transition : décalage" value={off} min={-0.6} max={1.2} step={0.01} onChange={setOff} format={(v) => f2(v)} />
        </>
      }
      observations={[
        { id: 'projection', text: String.raw`Déplace $x$ : la projection verticale ramène toujours la section sur $x$, $\pi\circ s=\mathrm{id}$.`, done: Math.abs(x0 - 1.9) > 1.2 },
        { id: 'recouvrement', text: String.raw`Sur le recouvrement, la flèche violette mesure la transition $g_{ij}(x)$ : change sa forme et regarde-la suivre.`, done: inOverlap && Math.abs(amp - 0.5) > 0.3 },
        { id: 'raccord', text: String.raw`Choisis $g_{ij}\equiv0$ : les deux sections se raccordent en une section globale.`, done: Math.abs(amp) < 0.01 && Math.abs(off) < 0.01 },
      ]}
      readings={[{ label: String.raw`$g_{ij}(x)=s_j(x)-s_i(x)$`, value: inOverlap ? f2(g(x0), 4) : 'hors du recouvrement', status: 'exact' }]}
    />
  );
}
