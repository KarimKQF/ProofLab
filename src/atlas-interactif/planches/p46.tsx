/**
 * Planche 46 — Critère infinitésimal et équations déterminantes.
 * F(x, u) = u − x². X₁ = ∂x + 2x∂u : X₁F = 0 partout. X₂ = x∂x + 2u∂u : X₂F = 2F, nul sur
 * F = 0. X₃ = ∂u : X₃F = 1, il quitte le niveau. Les flots exacts le confirment.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, Choice, ClippedCurve, DragOnCurve, f2, Plot, Slider } from '../kit2d';
import { linspace } from '../math';

type G = 'translation' | 'dilatation' | 'vertical';
const field = (g: G, x: number, u: number): [number, number] => (g === 'translation' ? [1, 2 * x] : g === 'dilatation' ? [x, 2 * u] : [0, 1]);
const flow = (g: G, x: number, u: number, t: number): [number, number] =>
  g === 'translation' ? [x + t, u + 2 * x * t + t * t] : g === 'dilatation' ? [x * Math.exp(t), u * Math.exp(2 * t)] : [x, u + t];
const DOM: [number, number, number, number] = [-2, 2, -1, 3];

export default function P46() {
  const [g, setG] = useState<G>('dilatation');
  const [x0, setX0] = useState(0.8);
  const [t, setT] = useState(0.5);
  const u0 = x0 * x0;
  const v = field(g, x0, u0);
  const XF = v[1] - 2 * x0 * v[0];
  const path = linspace(-1, 1, 80).map((s) => flow(g, x0, u0, s * t));
  const end = flow(g, x0, u0, t);
  const Fend = end[1] - end[0] * end[0];
  const xs = linspace(-2, 2, 160);
  const panel = (gg: G, title: string) => (
    <div>
      <Plot xDomain={[-2, 2]} yDomain={[-1, 3]} width={320} height={320} ariaLabel={title}>
        {[-0.8, 0.8, 1.6].map((c) => (
          <ClippedCurve key={c} points={xs.map((x) => [x, x * x + c])} domain={DOM} color={C.faint} width={1} />
        ))}
        <ClippedCurve points={xs.map((x) => [x, x * x])} domain={DOM} color={C.teal} width={2.6} />
        {gg === g && <ClippedCurve points={path} domain={DOM} color={C.violet} width={2} dash="5 3" />}
        {gg === g && <Arrow a={[x0, u0]} b={[x0 + 0.5 * v[0] / Math.hypot(...v), u0 + 0.5 * v[1] / Math.hypot(...v)]} color={XF === 0 || Math.abs(XF) < 1e-12 ? C.teal : C.orange} width={2.6} />}
        {gg === g && <DragOnCurve curve={(s) => [s, s * s]} s={x0} range={[-1.6, 1.6]} onChange={setX0} name="Point du niveau F = 0" color={C.ink} r={5} />}
      </Plot>
    </div>
  );
  const tangent = g !== 'vertical';
  return (
    <PlateScene
      n={46}
      panels={[
        { title: 'Champ tangent au niveau F = 0', render: () => <div>{tangent ? panel(g, 'Champ tangent') : panel('translation', 'Champ tangent')}<Caption>{String.raw`Vert : le niveau $F=u-x^2=0$ ; pointillé violet : la courbe intégrale de $X$.`}</Caption></div> },
        { title: 'Champ qui quitte le niveau', render: () => <div>{!tangent ? panel(g, 'Champ qui quitte') : panel('vertical', 'Champ qui quitte')}<Caption>{String.raw`$X=\partial_u$ : $XF=1\neq0$, la courbe intégrale traverse les niveaux.`}</Caption></div> },
      ]}
      identity={String.raw`$\mathrm{pr}^{(n)}X(F)=0$ sur $F=0$ $\Leftrightarrow$ $X$ est tangent au niveau ; $\ X_1F=0$, $\ X_2F=2F$, $\ X_3F=1$.`}
      controls={
        <>
          <Choice
            name="Générateur X"
            value={g}
            onChange={setG}
            options={[
              { id: 'translation', label: String.raw`$X_1=\partial_x+2x\,\partial_u$` },
              { id: 'dilatation', label: String.raw`$X_2=x\,\partial_x+2u\,\partial_u$` },
              { id: 'vertical', label: String.raw`$X_3=\partial_u$` },
            ]}
          />
          <Slider label="Temps du flot t" value={t} min={0} max={1.2} step={0.01} onChange={setT} format={(x) => f2(x)} />
        </>
      }
      observations={[
        { id: 'tangent', text: String.raw`Avec $X_1$ ou $X_2$, la courbe intégrale reste sur le niveau $F=0$.`, done: tangent && t > 0.4 },
        { id: 'quitte', text: String.raw`Avec $X_3$, elle le quitte : $F$ vaut $t$ au bout du temps $t$.`, done: g === 'vertical' && t > 0.4 },
        { id: 'deplace', text: 'Fais glisser le point le long du niveau : le critère XF = 0 se vérifie partout.', done: Math.abs(x0 - 0.8) > 0.6 },
      ]}
      readings={[
        { label: String.raw`$XF$ au point`, value: f2(XF, 6), status: 'exact' },
        { label: String.raw`$F$ au bout du flot`, value: f2(Fend, 6), status: 'exact' },
      ]}
    />
  );
}
