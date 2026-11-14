/**
 * Planche 40 — Formule de Baker–Campbell–Hausdorff.
 * Dans SE(2), X = avancer (translation ∂x), Y = tourner (rotation). « Avancer puis tourner »
 * et « tourner puis avancer » mènent à deux poses différentes. log(e^{εX}e^{εY}) = ε(X + Y)
 * + ε²/2 [X, Y] + O(ε³), avec [X, Y] = −∂y. Exponentielle et logarithme exacts de SE(2).
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, Curve, f2, Plot, Poly, Slider } from '../kit2d';

type Pose = { a: number; x: number; y: number };
const compose = (g: Pose, h: Pose): Pose => ({ a: g.a + h.a, x: g.x + Math.cos(g.a) * h.x - Math.sin(g.a) * h.y, y: g.y + Math.sin(g.a) * h.x + Math.cos(g.a) * h.y });
function exp(w: number, vx: number, vy: number): Pose {
  if (Math.abs(w) < 1e-12) return { a: 0, x: vx, y: vy };
  const s = Math.sin(w) / w;
  const c = (1 - Math.cos(w)) / w;
  return { a: w, x: s * vx - c * vy, y: c * vx + s * vy };
}
function log(g: Pose): [number, number, number] {
  const w = g.a;
  if (Math.abs(w) < 1e-12) return [0, g.x, g.y];
  const s = Math.sin(w) / w;
  const c = (1 - Math.cos(w)) / w;
  const d = s * s + c * c;
  return [w, (s * g.x + c * g.y) / d, (-c * g.x + s * g.y) / d];
}
const BODY: [number, number][] = [[-0.08, -0.1], [0.16, 0], [-0.08, 0.1]];
const place = (g: Pose): [number, number][] => BODY.map(([x, y]) => [g.x + Math.cos(g.a) * x - Math.sin(g.a) * y, g.y + Math.sin(g.a) * x + Math.cos(g.a) * y]);

export default function P40() {
  const [eps, setEps] = useState(0.8);
  const eX = exp(0, eps, 0);
  const eY = exp(eps, 0, 0);
  const XY = compose(eX, eY);
  const YX = compose(eY, eX);
  const L = log(XY);
  const pred: [number, number, number] = [eps, eps, (-eps * eps) / 2];
  const err = Math.hypot(...L.map((x, i) => x - pred[i]!));
  const orders = (
    <div>
      <Plot xDomain={[-0.2, 1.3]} yDomain={[-0.5, 1]} width={300} height={300} grid ariaLabel="Deux ordres dans SE(2)">
        <Poly points={place({ a: 0, x: 0, y: 0 })} fill={C.muted} opacity={0.3} stroke={C.muted} />
        <Curve points={[[0, 0], [XY.x, XY.y]]} color={C.orange} width={1.6} dash="4 3" />
        <Curve points={[[0, 0], [YX.x, YX.y]]} color={C.teal} width={1.6} dash="4 3" />
        <Poly points={place(XY)} fill={C.orange} opacity={0.35} stroke={C.orange} width={1.8} />
        <Poly points={place(YX)} fill={C.teal} opacity={0.35} stroke={C.teal} width={1.8} />
      </Plot>
      <Caption>{String.raw`Orange : $e^{\varepsilon X}e^{\varepsilon Y}$ (avancer puis tourner). Vert : $e^{\varepsilon Y}e^{\varepsilon X}$ (tourner puis avancer).`}</Caption>
    </div>
  );
  const algebra = (
    <div>
      <Plot xDomain={[-0.1, 1.3]} yDomain={[-0.8, 0.4]} width={300} height={258} grid ariaLabel="Correction dans le logarithme">
        <Arrow a={[0, 0]} b={[eps, 0]} color={C.blue} width={2.2} />
        <Arrow a={[eps, 0]} b={[eps, (-eps * eps) / 2]} color={C.orange} width={2.2} />
        <Arrow a={[0, 0]} b={[L[1], L[2]]} color={C.teal} width={2.6} />
      </Plot>
      <Caption>{String.raw`Composantes de translation : bleu $\varepsilon(X+Y)$, orange $\frac{\varepsilon^2}{2}[X,Y]$, vert le logarithme exact.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={40}
      panels={[
        { title: 'Suivre deux ordres dans SE(2)', render: () => orders },
        { title: 'Correction dans le logarithme', render: () => algebra },
      ]}
      identity={String.raw`$\log(e^{\varepsilon X}e^{\varepsilon Y})=\varepsilon(X+Y)+\dfrac{\varepsilon^2}{2}[X,Y]+O(\varepsilon^3)$ ; ici $[X,Y]=-\partial_y$.`}
      controls={<Slider label="ε" value={eps} min={0.02} max={1.2} step={0.01} onChange={setEps} format={(x) => f2(x)} />}
      observations={[
        { id: 'ordre', text: 'Les deux ordres mènent à deux poses différentes : avancer et tourner ne commutent pas.', done: eps > 0.5 },
        { id: 'correction', text: String.raw`Le logarithme exact s'écarte de $\varepsilon(X+Y)$ de presque $\frac{\varepsilon^2}2[X,Y]$.`, done: eps > 0.3 && eps < 0.7 },
        { id: 'petit', text: String.raw`Réduis $\varepsilon$ : l'erreur restante décroît comme $\varepsilon^3$.`, done: eps < 0.1 },
      ]}
      readings={[
        { label: String.raw`$\log(e^{\varepsilon X}e^{\varepsilon Y})=(\omega,v_x,v_y)$`, value: `(${L.map((x) => f2(x, 4)).join(' ; ')})`, status: 'exact' },
        { label: String.raw`$\varepsilon(X+Y)+\frac{\varepsilon^2}2[X,Y]$`, value: `(${pred.map((x) => f2(x, 4)).join(' ; ')})`, status: 'exact' },
        { label: String.raw`Erreur et erreur $/\varepsilon^3$`, value: `${f2(err, 6)} ; ${f2(err / eps ** 3, 4)}`, status: 'exact' },
      ]}
    />
  );
}
