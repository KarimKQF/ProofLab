/**
 * Planche 54 — Solutions invariantes et limites du calcul de symétrie.
 * X = x∂x + 2u∂u (dilatation). Pour u = x², Q = η − ξu_x = 2u − 2x² = 0 : l'orbite d'un point du
 * graphe reste dans le graphe. Pour u = x² + 0,3, Q = 0,6 ≠ 0 : l'orbite le quitte.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, ClippedCurve, DragOnCurve, f2, Plot, Slider } from '../kit2d';
import { linspace } from '../math';

const D: [number, number, number, number] = [-1.8, 1.8, -0.2, 3];

function Panel({ shift, x0, eps, onX }: { shift: number; x0: number; eps: number; onX: (v: number) => void }) {
  const g = (x: number) => x * x + shift;
  const xs = linspace(-1.8, 1.8, 200);
  const orbit = linspace(-Math.abs(eps), Math.abs(eps), 60).map((e) => [x0 * Math.exp(e), g(x0) * Math.exp(2 * e)] as [number, number]);
  const X: [number, number] = [x0, 2 * g(x0)];
  const k = 0.5 / Math.hypot(...X);
  return (
    <Plot xDomain={[-1.8, 1.8]} yDomain={[-0.2, 3]} width={320} height={284} ariaLabel={shift === 0 ? 'Orbite contenue dans le graphe' : 'Orbite qui quitte le graphe'}>
      <ClippedCurve points={xs.map((x) => [x, g(x)])} domain={D} color={C.teal} width={2.4} />
      <ClippedCurve points={orbit} domain={D} color={C.violet} width={2} dash="5 3" />
      <Arrow a={[x0, g(x0)]} b={[x0 + k * X[0], g(x0) + k * X[1]]} color={shift === 0 ? C.teal : C.orange} width={2.4} />
      <DragOnCurve curve={(s) => [s, g(s)]} s={x0} range={[-1.4, 1.4]} onChange={onX} name="Point du graphe" color={C.ink} r={5} />
    </Plot>
  );
}

export default function P54() {
  const [x0, setX0] = useState(0.8);
  const [eps, setEps] = useState(0.5);
  const Q = (shift: number) => 2 * (x0 * x0 + shift) - x0 * 2 * x0;
  return (
    <PlateScene
      n={54}
      panels={[
        { title: 'Orbite contenue dans le graphe', render: () => <div><Panel shift={0} x0={x0} eps={eps} onX={setX0} /><Caption>{String.raw`$u=x^2$ : $Q=0$, l'orbite (violet) glisse sur le graphe.`}</Caption></div> },
        { title: 'Orbite qui quitte le graphe', render: () => <div><Panel shift={0.3} x0={x0} eps={eps} onX={setX0} /><Caption>{String.raw`$u=x^2+0{,}3$ : $Q=0{,}6$, l'orbite quitte le graphe.`}</Caption></div> },
      ]}
      identity={String.raw`$Q=\eta-\sum_i\xi^iu_i=0$ sur le graphe $\Leftrightarrow$ solution invariante ; ici $X=x\,\partial_x+2u\,\partial_u$, $Q=2u-x\,u_x$.`}
      controls={<Slider label="Paramètre ε de l’orbite (±ε)" value={eps} min={0} max={1} step={0.01} onChange={setEps} format={(v) => f2(v)} />}
      observations={[
        { id: 'contenue', text: 'À gauche, l’orbite du point reste dans le graphe, quel que soit le point choisi.', done: Math.abs(x0 - 0.8) > 0.5 && eps > 0.3 },
        { id: 'quitte', text: 'À droite, la même dilatation fait sortir le point du graphe.', done: eps > 0.6 },
        { id: 'origine', text: 'À l’origine, le générateur s’annule à gauche : le point est fixe.', done: Math.abs(x0) < 0.03 },
      ]}
      readings={[
        { label: String.raw`$Q$ pour $u=x^2$`, value: f2(Q(0), 6), status: 'exact' },
        { label: String.raw`$Q$ pour $u=x^2+0{,}3$`, value: f2(Q(0.3), 6), status: 'exact' },
      ]}
    />
  );
}
