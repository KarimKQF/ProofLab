/**
 * Planche 17 — Métrique et distance riemanniennes.
 * Un même vecteur a deux longueurs pour g₁ = I et g₂ = diag(a, 1) ; sur le cercle, la
 * distance intrinsèque (arc) dépasse la corde, sauf à la limite.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arc, Arrow, C, Caption, Circle, Curve, DragOnCurve, DraggablePoint, f2, Plot, Segment, Slider } from '../kit2d';
import { linspace, TAU } from '../math';

export default function P17() {
  const [a, setA] = useState(4);
  const [v, setV] = useState<[number, number]>([0.6, 0.5]);
  const [p, setP] = useState(0.4);
  const [q, setQ] = useState(2.3);
  const n1 = Math.hypot(v[0], v[1]);
  const n2 = Math.sqrt(a * v[0] * v[0] + v[1] * v[1]);
  let d = Math.abs(q - p) % TAU;
  if (d > Math.PI) d = TAU - d;
  const chord = 2 * Math.sin(d / 2);
  // Arc le plus court de p à q.
  let from = p;
  let to = q;
  const raw = ((q - p) % TAU + TAU) % TAU;
  if (raw > Math.PI) {
    from = q;
    to = q + (TAU - raw);
  } else to = p + raw;

  const norms = (
    <div>
      <Plot xDomain={[-1.5, 1.5]} yDomain={[-1.5, 1.5]} width={320} height={320} grid={false} ariaLabel="Deux normes dans un plan tangent">
        <Circle c={[0, 0]} r={1} color={C.teal} width={2.2} />
        <Curve points={linspace(0, TAU, 120).map((t) => [Math.cos(t) / Math.sqrt(a), Math.sin(t)] as [number, number])} color={C.orange} width={2.2} />
        <Arrow a={[0, 0]} b={v} color={C.violet} width={2.4} />
        <DraggablePoint x={v[0]} y={v[1]} onChange={(x, y) => setV([x, y])} name="Vecteur v" color={C.violet} label="v" bounds={[-1.4, 1.4, -1.4, 1.4]} step={0.05} r={6} />
      </Plot>
      <Caption>{String.raw`Vert : $v_x^2+v_y^2=1$. Orange : $a\,v_x^2+v_y^2=1$.`}</Caption>
    </div>
  );

  const arc = (
    <div>
      <Plot xDomain={[-1.4, 1.4]} yDomain={[-1.4, 1.4]} width={320} height={320} grid={false} ariaLabel="Arc et corde sur le cercle">
        <Circle c={[0, 0]} r={1} color={C.faint} width={1.4} />
        <Arc c={[0, 0]} r={1} a0={from} a1={to} color={C.teal} width={3.4} />
        <Segment a={[Math.cos(p), Math.sin(p)]} b={[Math.cos(q), Math.sin(q)]} color={C.orange} width={2} dash="6 4" />
        <DragOnCurve curve={(s) => [Math.cos(s), Math.sin(s)]} s={p} range={[0, TAU]} onChange={setP} name="Premier point" color={C.ink} r={5} />
        <DragOnCurve curve={(s) => [Math.cos(s), Math.sin(s)]} s={q} range={[0, TAU]} onChange={setQ} name="Second point" color={C.ink} r={5} />
      </Plot>
      <Caption>Vert : l’arc le plus court, mesuré le long du cercle. Orange : la corde, mesurée dans le plan.</Caption>
    </div>
  );

  return (
    <PlateScene
      n={17}
      panels={[
        { title: 'Deux normes dans un plan tangent', render: () => norms },
        { title: 'Longueur intrinsèque sur le cercle', render: () => arc },
      ]}
      identity={String.raw`$L_g(\gamma)=\displaystyle\int\sqrt{g_{\gamma(t)}(\gamma'(t),\gamma'(t))}\,dt$, $\quad d_g(p,q)=\inf_\gamma L_g(\gamma)$.`}
      controls={<Slider label="Coefficient a de la seconde métrique" value={a} min={0.25} max={6} step={0.05} onChange={setA} format={(x) => f2(x)} />}
      observations={[
        { id: 'deux', text: 'Un même vecteur a deux longueurs : sa norme dépend de la métrique choisie.', done: Math.abs(n1 - n2) > 0.3 },
        { id: 'antipodes', text: String.raw`Place les deux points aux antipodes : l'arc vaut $\pi$, la corde $2$.`, done: Math.abs(d - Math.PI) < 0.03 },
        { id: 'proches', text: 'Rapproche les deux points : arc et corde deviennent indiscernables.', done: d > 1e-6 && d < 0.08 },
      ]}
      readings={[
        { label: String.raw`$|v|_{g_1}$ et $|v|_{g_2}$`, value: `${f2(n1, 3)} ; ${f2(n2, 3)}`, status: 'exact' },
        { label: 'Arc (distance intrinsèque)', value: f2(d, 4), status: 'exact' },
        { label: 'Corde', value: f2(chord, 4), status: 'exact' },
      ]}
    />
  );
}
