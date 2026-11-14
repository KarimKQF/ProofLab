/**
 * Planche 43 — Symétries des équations différentielles ordinaires.
 * u′ = u/2 (autonome) : la translatée u(x − ε) d'une solution est solution, le résidu est nul.
 * u′ = x u (non autonome) : la translatée de C e^{x²/2} a pour résidu −ε u_ε ≠ 0.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, Choice, ClippedCurve, f2, Plot, Segment, Slider } from '../kit2d';
import { linspace } from '../math';

type Eq = 'auto' | 'non';
const DOM: [number, number, number, number] = [-1.6, 2.4, 0, 2.2];

export default function P43() {
  const [eq, setEq] = useState<Eq>('auto');
  const [Cc, setCc] = useState(0.8);
  const [eps, setEps] = useState(0.7);
  const f = (x: number, u: number) => (eq === 'auto' ? u / 2 : x * u);
  const sol = (x: number) => (eq === 'auto' ? Cc * Math.exp(x / 2) : Cc * Math.exp((x * x) / 2));
  const sold = (x: number) => (eq === 'auto' ? sol(x) / 2 : x * sol(x));
  const tr = (x: number) => sol(x - eps);
  const trd = (x: number) => sold(x - eps);
  const xs = linspace(DOM[0], DOM[1], 200);
  const resid = Math.max(...xs.map((x) => Math.abs(trd(x) - f(x, tr(x)))).filter((v) => Number.isFinite(v) && v < 1e6));
  const solutions = (
    <div>
      <Plot xDomain={[DOM[0], DOM[1]]} yDomain={[DOM[2], DOM[3]]} width={330} height={250} ariaLabel="Une solution et sa translatée">
        <ClippedCurve points={xs.map((x) => [x, sol(x)])} domain={DOM} color={C.teal} width={2.4} />
        <ClippedCurve points={xs.map((x) => [x, tr(x)])} domain={DOM} color={C.orange} width={2.4} />
        <Arrow a={[0, sol(0)]} b={[eps, sol(0)]} color={C.violet} width={2} />
      </Plot>
      <Caption>{String.raw`Vert : $u$. Orange : $u_\varepsilon(x)=u(x-\varepsilon)$.`}</Caption>
    </div>
  );
  const field = (
    <div>
      <Plot xDomain={[DOM[0], DOM[1]]} yDomain={[DOM[2], DOM[3]]} width={330} height={250} ariaLabel="Champ des pentes et générateur">
        {linspace(-1.4, 2.2, 9).flatMap((x) =>
          linspace(0.2, 2, 7).map((u) => {
            const s = f(x, u);
            const l = 0.16 / Math.hypot(1, s);
            return <Segment key={`${x}${u}`} a={[x - l, u - l * s]} b={[x + l, u + l * s]} color={C.faint} width={1.2} />;
          }),
        )}
        {linspace(0.4, 1.8, 3).map((u) => (
          <Arrow key={u} a={[-1.2, u]} b={[-0.5, u]} color={C.teal} width={1.6} />
        ))}
      </Plot>
      <Caption>{eq === 'auto' ? String.raw`Les pentes ne dépendent que de $u$ : elles sont invariantes par $X=\partial_x$.` : String.raw`Les pentes dépendent de $x$ : $X=\partial_x$ ne les conserve pas.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={43}
      panels={[
        { title: 'Une solution et sa translatée', render: () => solutions },
        { title: 'Le générateur dans le plan (x, u)', render: () => field },
      ]}
      identity={String.raw`$u'=f(u)\ \Rightarrow\ u_\varepsilon(x)=u(x-\varepsilon)$ est solution ; générateur $X=\partial_x$.`}
      controls={
        <>
          <Choice
            name="Équation"
            value={eq}
            onChange={setEq}
            options={[
              { id: 'auto', label: String.raw`$u'=u/2$` },
              { id: 'non', label: String.raw`$u'=x\,u$` },
            ]}
          />
          <Slider label="Constante C de la solution" value={Cc} min={0.2} max={1.4} step={0.01} onChange={setCc} format={(x) => f2(x)} />
          <Slider label="Translation ε" value={eps} min={-1.5} max={1.5} step={0.01} onChange={setEps} format={(x) => f2(x)} />
        </>
      }
      observations={[
        { id: 'auto', text: String.raw`Pour $u'=u/2$, la translatée reste solution : le résidu est nul.`, done: eq === 'auto' && Math.abs(eps) > 0.3 },
        { id: 'non', text: String.raw`Pour $u'=xu$, la translatée n'est plus solution : le résidu vaut $-\varepsilon u_\varepsilon$.`, done: eq === 'non' && Math.abs(eps) > 0.3 },
        { id: 'zero', text: String.raw`Pour $\varepsilon=0$, rien ne change : l'identité est dans le groupe.`, done: Math.abs(eps) < 0.005 },
      ]}
      readings={[{ label: String.raw`$\max|u_\varepsilon'-f(x,u_\varepsilon)|$ sur la fenêtre`, value: f2(resid, 6), status: 'exact' }]}
    />
  );
}
