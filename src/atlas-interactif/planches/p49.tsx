/**
 * Planche 49 — Advection et caractéristiques.
 * u_t + c u_x = 0 : u(x, t) = u₀(x − ct), constante le long des droites x − ct = constante.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, ClippedCurve, Dot, f2, Plot, Slider } from '../kit2d';
import { linspace } from '../math';

const u0 = (x: number) => Math.exp(-2 * x * x);

export default function P49() {
  const [c, setC] = useState(1);
  const [t, setT] = useState(1.2);
  const [x0, setX0] = useState(0.2);
  const xs = linspace(-3, 4, 300);
  const D1: [number, number, number, number] = [-1.5, 3.5, 0, 2];
  const chars = (
    <div>
      <Plot xDomain={[-1.5, 3.5]} yDomain={[0, 2]} width={330} height={264} ariaLabel="Droites caractéristiques">
        {[-1, -0.5, 0, 0.5, 1, 1.5].map((a) => (
          <ClippedCurve key={a} points={[[a, 0], [a + 2 * c, 2]]} domain={D1} color={C.faint} width={1.2} />
        ))}
        <ClippedCurve points={[[x0, 0], [x0 + 2 * c, 2]]} domain={D1} color={C.orange} width={2.4} />
        <Dot x={x0 + c * t} y={t} color={C.orange} r={5} />
      </Plot>
      <Caption>{String.raw`Plan $(x,t)$ : les droites $x-ct=x_0$.`}</Caption>
    </div>
  );
  const D2: [number, number, number, number] = [-3, 4, -0.05, 1.2];
  const shape = (
    <div>
      <Plot xDomain={[-3, 4]} yDomain={[-0.05, 1.2]} width={330} height={264} ariaLabel="La forme se translate">
        <ClippedCurve points={xs.map((x) => [x, u0(x)])} domain={D2} color={C.teal} width={2} dash="5 4" />
        <ClippedCurve points={xs.map((x) => [x, u0(x - c * t)])} domain={D2} color={C.orange} width={2.6} />
        <Dot x={x0 + c * t} y={u0(x0)} color={C.orange} r={5} />
        <Dot x={x0} y={u0(x0)} color={C.teal} r={4} />
      </Plot>
      <Caption>{String.raw`Pointillé : $u_0$. Orange : $u(\cdot,t)=u_0(\cdot-ct)$ ; le point suit sa caractéristique.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={49}
      panels={[
        { title: 'Sur une droite, x − ct est constant', render: () => chars },
        { title: 'La forme se translate', render: () => shape },
      ]}
      identity={String.raw`$u_t+c\,u_x=0\ \Rightarrow\ u(x,t)=u_0(x-ct)$.`}
      controls={
        <>
          <Slider label="Célérité c" value={c} min={-1} max={1.6} step={0.01} onChange={setC} format={(v) => f2(v)} />
          <Slider label="Temps t" value={t} min={0} max={2} step={0.01} onChange={setT} format={(v) => f2(v)} />
          <Slider label="Pied x₀ de la caractéristique" value={x0} min={-1} max={1.5} step={0.01} onChange={setX0} format={(v) => f2(v)} />
        </>
      }
      observations={[
        { id: 'constante', text: 'Le point garde la même hauteur en suivant sa caractéristique.', done: t > 1.5 },
        { id: 'inverse', text: 'Avec c < 0, la forme part vers la gauche.', done: c < -0.3 },
        { id: 'arret', text: 'Avec c = 0, les caractéristiques sont verticales : rien ne bouge.', done: Math.abs(c) < 0.01 },
      ]}
      readings={[
        { label: String.raw`$u(x_0+ct,t)$ et $u_0(x_0)$`, value: `${f2(u0(x0 + c * t - c * t), 5)} ; ${f2(u0(x0), 5)}`, status: 'exact' },
        { label: 'Déplacement de la forme', value: f2(c * t, 3), status: 'exact' },
      ]}
    />
  );
}
