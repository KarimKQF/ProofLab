/**
 * Planche 13 — Formes différentielles, produit extérieur et pull-back.
 * dx∧dy(v, w) = det(v, w) : aire du parallélogramme, avec un signe qui change quand on
 * échange v et w. Cellule polaire : son aire exacte (r + dr/2) dr dθ tend vers r dr dθ.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arc, Arrow, C, Caption, DraggablePoint, f2, Plot, Poly, Segment, Slider } from '../kit2d';

const DOM: [number, number, number, number] = [-1.7, 1.7, -1.7, 1.7];

export default function P13() {
  const [v, setV] = useState<[number, number]>([1.3, 0.3]);
  const [w, setW] = useState<[number, number]>([0.35, 1.2]);
  const [r, setR] = useState(1.2);
  const [dr, setDr] = useState(0.5);
  const [th, setTh] = useState(0.35);
  const [dth, setDth] = useState(0.6);
  const det = v[0] * w[1] - v[1] * w[0];
  const exact = ((r + dr) ** 2 - r * r) * dth / 2;
  const approx = r * dr * dth;
  const col = det >= 0 ? C.teal : C.orange;

  const area = (
    <div>
      <Plot xDomain={DOM.slice(0, 2) as [number, number]} yDomain={DOM.slice(2) as [number, number]} width={330} height={330} ariaLabel="Aire orientée d'un parallélogramme">
        <Poly points={[[0, 0], v, [v[0] + w[0], v[1] + w[1]], w]} fill={col} opacity={0.3} stroke={col} width={1.6} />
        <Arrow a={[0, 0]} b={v} color={C.blue} width={2.4} />
        <Arrow a={[0, 0]} b={w} color={C.red} width={2.4} />
        <DraggablePoint x={v[0]} y={v[1]} onChange={(x, y) => setV([x, y])} name="Vecteur v" color={C.blue} label="v" bounds={DOM} step={0.05} r={6} />
        <DraggablePoint x={w[0]} y={w[1]} onChange={(x, y) => setW([x, y])} name="Vecteur w" color={C.red} label="w" bounds={DOM} step={0.05} r={6} />
      </Plot>
      <Caption>{det >= 0 ? 'Vert : (v, w) est direct, l’aire est comptée positivement.' : 'Orange : (v, w) est indirect, l’aire est comptée négativement.'}</Caption>
    </div>
  );

  const pt = (rr: number, a: number): [number, number] => [rr * Math.cos(a), rr * Math.sin(a)];
  const n = 30;
  const cellPts: [number, number][] = [
    ...Array.from({ length: n + 1 }, (_, k) => pt(r, th + (dth * k) / n)),
    ...Array.from({ length: n + 1 }, (_, k) => pt(r + dr, th + dth - (dth * k) / n)),
  ];
  const polar = (
    <div>
      <Plot xDomain={[-0.3, 2.9]} yDomain={[-0.3, 2.9]} width={330} height={330} ariaLabel="Cellule polaire">
        <Segment a={[0, 0]} b={pt(2.8, th)} color={C.faint} width={1} />
        <Segment a={[0, 0]} b={pt(2.8, th + dth)} color={C.faint} width={1} />
        <Poly points={cellPts} fill={C.violet} opacity={0.3} stroke={C.violet} width={1.6} />
        <Arc c={[0, 0]} r={0.45} a0={th} a1={th + dth} color={C.teal} width={1.6} arrow />
      </Plot>
      <Caption>{String.raw`Cellule $[r,r+dr]\times[\theta,\theta+d\theta]$ : aire $(r+\tfrac{dr}{2})\,dr\,d\theta$.`}</Caption>
    </div>
  );

  return (
    <PlateScene
      n={13}
      panels={[
        { title: 'Aire avec un signe', render: () => area },
        { title: 'Cellule polaire', render: () => polar },
      ]}
      identity={String.raw`$dx\wedge dy(v,w)=\det(v,w)$, $\quad F^*(dx\wedge dy)=r\,dr\wedge d\theta$ pour $F(r,\theta)=(r\cos\theta,\,r\sin\theta)$.`}
      controls={
        <>
          <Slider label="r" value={r} min={0.2} max={2} step={0.01} onChange={setR} format={(x) => f2(x)} />
          <Slider label="dr" value={dr} min={0.02} max={0.8} step={0.01} onChange={setDr} format={(x) => f2(x)} />
          <Slider label="θ" value={th} min={0} max={1.2} step={0.01} onChange={setTh} format={(x) => f2(x)} />
          <Slider label="dθ" value={dth} min={0.02} max={0.9} step={0.01} onChange={setDth} format={(x) => f2(x)} />
        </>
      }
      observations={[
        { id: 'signe', text: String.raw`Fais passer $w$ de l'autre côté de $v$ : $\det(v,w)$ change de signe.`, done: det < -0.1 },
        { id: 'nul', text: String.raw`Aligne $v$ et $w$ : l'aire orientée s'annule.`, done: Math.abs(det) < 0.03 && Math.hypot(...v) > 0.3 && Math.hypot(...w) > 0.3 },
        { id: 'polaire', text: String.raw`Réduis $dr$ : l'aire de la cellule et $r\,dr\,d\theta$ deviennent indiscernables.`, done: dr <= 0.05 },
      ]}
      readings={[
        { label: String.raw`$dx\wedge dy(v,w)=\det(v,w)$`, value: f2(det, 4), status: 'exact' },
        { label: 'Aire de la cellule', value: f2(exact, 5), status: 'exact' },
        { label: String.raw`$r\,dr\,d\theta$ et rapport`, value: `${f2(approx, 5)} ; ${f2(exact / approx, 4)}`, status: 'exact' },
      ]}
    />
  );
}
