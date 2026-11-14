/**
 * Planche 37 — SE(2), SE(3) et mouvements rigides.
 * Poses (R, t) composées par (R, t)(S, a) = (RS, t + Ra). Un mouvement hélicoïdal : rotation
 * d'angle θ autour de l'axe z et translation hθ/(2π) le long de cet axe.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, f2, Plot, Poly, Slider } from '../kit2d';
import { Arrow3, Point3, Polyline3, Scene3D, Segment3 } from '../kit3d';
import { TAU } from '../math';

type Pose = { a: number; x: number; y: number };
const compose = (g: Pose, h: Pose): Pose => ({ a: g.a + h.a, x: g.x + Math.cos(g.a) * h.x - Math.sin(g.a) * h.y, y: g.y + Math.sin(g.a) * h.x + Math.cos(g.a) * h.y });
const BODY: [number, number][] = [[-0.2, -0.25], [0.4, 0], [-0.2, 0.25]];
const place = (g: Pose): [number, number][] => BODY.map(([x, y]) => [g.x + Math.cos(g.a) * x - Math.sin(g.a) * y, g.y + Math.sin(g.a) * x + Math.cos(g.a) * y]);

export default function P37() {
  const [a, setA] = useState(0.6);
  const [tx, setTx] = useState(1.2);
  const [b, setB] = useState(0.5);
  const [sx, setSx] = useState(0.9);
  const [pitch, setPitch] = useState(1);
  const [th, setTh] = useState(4);
  const g: Pose = { a, x: tx, y: 0.3 };
  const h: Pose = { a: b, x: sx, y: 0.2 };
  const gh = compose(g, h);
  const poses = (
    <div>
      <Plot xDomain={[-0.8, 3.2]} yDomain={[-0.8, 3.2]} width={300} height={300} grid ariaLabel="Composition de deux poses">
        <Poly points={place({ a: 0, x: 0, y: 0 })} fill={C.muted} opacity={0.2} stroke={C.muted} />
        <Poly points={place(g)} fill={C.blue} opacity={0.3} stroke={C.blue} />
        <Poly points={place(gh)} fill={C.teal} opacity={0.3} stroke={C.teal} width={2} />
        <Arrow a={[0, 0]} b={[g.x, g.y]} color={C.orange} width={1.8} />
        <Arrow a={[g.x, g.y]} b={[gh.x, gh.y]} color={C.violet} width={1.8} />
      </Plot>
      <Caption>{String.raw`Gris : $e$. Bleu : $g=(R,t)$. Vert : $gh=(RS,\,t+Ra)$ ; la translation $a$ est lue dans le repère de $g$.`}</Caption>
    </div>
  );
  const helix = Array.from({ length: 241 }, (_, k) => {
    const t = (th * k) / 240;
    return [Math.cos(t), Math.sin(t), (pitch * t) / TAU - 1] as [number, number, number];
  });
  const end = helix[helix.length - 1]!;
  const screw = (
    <Scene3D label="Mouvement hélicoïdal" camera={[3.2, -3.2, 2]} height={300} showAxes axes={1.6} axisLabels={['x', 'y', 'z']}>
      <Segment3 a={[0, 0, -1.4]} b={[0, 0, 1.8]} color="#d8743a" width={1.6} />
      <Polyline3 points={helix} color="#1a9e96" width={2.2} />
      <Point3 p={end} color="#1a9e96" size={0.07} />
      <Arrow3 a={end} b={[end[0] - 0.5 * Math.sin(th), end[1] + 0.5 * Math.cos(th), end[2]]} color="#8a6fd6" />
    </Scene3D>
  );
  return (
    <PlateScene
      n={37}
      panels={[
        { title: 'Deux poses dans SE(2)', render: () => poses },
        { title: 'Exemple de mouvement hélicoïdal', render: () => screw },
      ]}
      identity={String.raw`$(R,t)(S,a)=(RS,\ t+Ra)$, $\quad\exp(\widehat\xi)=\big(e^{\widehat\omega},\ V(\omega)v\big)$ pour $\xi=(\omega,v)$.`}
      controls={
        <>
          <Slider label="g : angle" value={a} min={-3.14} max={3.14} step={0.01} onChange={setA} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider label="g : translation x" value={tx} min={0} max={2} step={0.01} onChange={setTx} format={(x) => f2(x)} />
          <Slider label="h : angle" value={b} min={-3.14} max={3.14} step={0.01} onChange={setB} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider label="h : translation x" value={sx} min={0} max={2} step={0.01} onChange={setSx} format={(x) => f2(x)} />
          <Slider label="Pas de l’hélice h" value={pitch} min={-1.5} max={1.5} step={0.01} onChange={setPitch} format={(x) => f2(x)} />
          <Slider label="Angle parcouru θ" value={th} min={0} max={12.5} step={0.01} onChange={setTh} format={(x) => `${f2(x / Math.PI, 2)}π`} />
        </>
      }
      observations={[
        { id: 'repere', text: String.raw`Tourne $g$ : la translation de $h$ tourne avec lui, car elle est lue dans le repère de $g$.`, done: Math.abs(a - 0.6) > 0.8 },
        { id: 'pas-nul', text: 'Pas nul : le mouvement hélicoïdal devient une rotation pure.', done: Math.abs(pitch) < 0.01 },
        { id: 'tour', text: String.raw`Un tour complet monte exactement d'un pas $h$.`, done: Math.abs(th - TAU) < 0.05 },
      ]}
      readings={[
        { label: String.raw`$gh$ : angle, position`, value: `${f2(gh.a, 3)} ; (${f2(gh.x, 3)} ; ${f2(gh.y, 3)})`, status: 'exact' },
        { label: 'Hauteur gagnée par l’hélice', value: f2((pitch * th) / TAU, 4), status: 'exact' },
      ]}
    />
  );
}
