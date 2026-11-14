/**
 * Planche 65 — Transformée de Legendre.
 * Pour une pente p, la tangente de pente p à L touche en v(p) avec L′(v) = p ; la hauteur
 * maximale de v ↦ pv − L(v) est H(p). L = v²/2 donne H = p²/2 ; L = v⁴/4 donne H = ¾|p|^{4/3}.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, Choice, ClippedCurve, Dot, f2, Plot, Segment, Slider } from '../kit2d';
import { linspace } from '../math';

const LS = {
  quad: { label: String.raw`$L=\tfrac12v^2$`, L: (v: number) => 0.5 * v * v, vOf: (p: number) => p, H: (p: number) => 0.5 * p * p },
  quart: { label: String.raw`$L=\tfrac14v^4$`, L: (v: number) => 0.25 * v ** 4, vOf: (p: number) => Math.sign(p) * Math.abs(p) ** (1 / 3), H: (p: number) => 0.75 * Math.abs(p) ** (4 / 3) },
  cosh: { label: String.raw`$L=\cosh v-1$`, L: (v: number) => Math.cosh(v) - 1, vOf: (p: number) => Math.asinh(p), H: (p: number) => p * Math.asinh(p) - Math.sqrt(1 + p * p) + 1 },
};
type K = keyof typeof LS;

export default function P65() {
  const [k, setK] = useState<K>('quad');
  const [p, setP] = useState(0.7);
  const l = LS[k];
  const v0 = l.vOf(p);
  const vs = linspace(-1.5, 1.5, 240);
  const D1: [number, number, number, number] = [-1.5, 1.5, -0.3, 1.2];
  const tangent = (
    <div>
      <Plot xDomain={[-1.5, 1.5]} yDomain={[-0.3, 1.2]} width={300} height={250} ariaLabel="Choisir la pente de la tangente">
        <ClippedCurve points={vs.map((v) => [v, l.L(v)])} domain={D1} color={C.teal} width={2.4} />
        <ClippedCurve points={[[-1.5, l.L(v0) + p * (-1.5 - v0)], [1.5, l.L(v0) + p * (1.5 - v0)]]} domain={D1} color={C.orange} width={1.8} />
        <Dot x={v0} y={l.L(v0)} color={C.orange} r={5} />
      </Plot>
      <Caption>{String.raw`La tangente de pente $p=\partial_vL$ touche le graphe en $v(p)$.`}</Caption>
    </div>
  );
  const g = vs.map((v) => [v, p * v - l.L(v)] as [number, number]);
  const D2: [number, number, number, number] = [-1.5, 1.5, -0.6, 0.8];
  const height = (
    <div>
      <Plot xDomain={[-1.5, 1.5]} yDomain={[-0.6, 0.8]} width={300} height={250} ariaLabel="Lire la hauteur au maximum">
        <ClippedCurve points={g} domain={D2} color={C.violet} width={2.4} />
        <Segment a={[v0, -0.6]} b={[v0, l.H(p)]} color={C.orange} width={1.4} dash="4 3" />
        <Dot x={v0} y={l.H(p)} color={C.orange} r={5} />
      </Plot>
      <Caption>{String.raw`$v\mapsto pv-L(v)$ : son maximum vaut $H(p)$, atteint en $v(p)$.`}</Caption>
    </div>
  );
  const gmax = Math.max(...g.map((x) => x[1]));
  return (
    <PlateScene
      n={65}
      panels={[
        { title: 'Choisir la pente de la tangente', render: () => tangent },
        { title: 'Lire la hauteur au maximum', render: () => height },
      ]}
      identity={String.raw`$p=L_v(q,v)$, $\quad H(q,p)=p\cdot v(q,p)-L\big(q,v(q,p)\big)=\max_v\big(p\cdot v-L(q,v)\big)$.`}
      controls={
        <>
          <Choice name="Lagrangien" value={k} onChange={setK} options={(Object.keys(LS) as K[]).map((x) => ({ id: x, label: LS[x].label }))} />
          <Slider label="Pente p" value={p} min={-1.2} max={1.2} step={0.01} onChange={setP} format={(v) => f2(v)} />
        </>
      }
      observations={[
        { id: 'contact', text: 'Fais varier p : le point de contact de la tangente et le maximum de pv − L sont à la même abscisse.', done: Math.abs(p - 0.7) > 0.5 },
        { id: 'quadratique', text: String.raw`Pour $L=\tfrac12v^2$, on lit $H(p)=\tfrac12p^2$ : la même forme.`, done: k === 'quad' && Math.abs(p) > 1 },
        { id: 'autre', text: String.raw`Pour $L=\tfrac14v^4$, $H(p)=\tfrac34|p|^{4/3}$ : la transformée change la forme.`, done: k === 'quart' },
      ]}
      readings={[
        { label: String.raw`$v(p)$ et $L'(v(p))$`, value: `${f2(v0, 4)} ; ${f2(p, 4)}`, status: 'exact' },
        { label: String.raw`$H(p)$, formule et maximum lu`, value: `${f2(l.H(p), 5)} ; ${f2(gmax, 5)}`, status: 'exact' },
      ]}
    />
  );
}
