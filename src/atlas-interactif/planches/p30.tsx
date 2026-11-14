/**
 * Planche 30 — Algèbre de Lie et sous-groupes.
 * T_eS¹ est une droite : un vecteur X en e engendre le sous-groupe t ↦ e^{itX}. Dans le tore
 * T², le sous-groupe t ↦ (e^{it}, e^{iαt}) se referme si α est rationnel, est dense sinon.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arc, Arrow, C, Caption, Choice, Circle, Dot, f2, Plot, Segment, Slider } from '../kit2d';
import { ParamSurface, Polyline3, Scene3D } from '../kit3d';
import { TAU } from '../math';

const SLOPES = [
  { id: 'demi', label: '1/2', alpha: 0.5, q: 2 },
  { id: 'deux-tiers', label: '2/3', alpha: 2 / 3, q: 3 },
  { id: 'racine', label: '√2 − 1', alpha: Math.SQRT2 - 1, q: 0 },
  { id: 'or', label: '(√5 − 1)/2', alpha: (Math.sqrt(5) - 1) / 2, q: 0 },
];
const R = 1;
const r = 0.42;
const torus = (u: number, v: number): [number, number, number] => [(R + r * Math.cos(v)) * Math.cos(u), (R + r * Math.cos(v)) * Math.sin(u), r * Math.sin(v)];

export default function P30() {
  const [X, setX] = useState(0.8);
  const [t, setT] = useState(1.2);
  const [slope, setSlope] = useState('racine');
  const [T, setT2] = useState(40);
  const s = SLOPES.find((x) => x.id === slope)!;

  const tangent = (
    <div>
      <Plot xDomain={[-1.5, 1.7]} yDomain={[-1.5, 1.7]} width={280} height={280} grid={false} ariaLabel="Vecteur tangent en l'identité du cercle">
        <Circle c={[0, 0]} r={1} color={C.faint} width={1.4} />
        <Segment a={[1, -1.4]} b={[1, 1.6]} color={C.blue} width={1.2} />
        <Arrow a={[1, 0]} b={[1, X]} color={C.orange} width={2.6} />
        <Arc c={[0, 0]} r={1} a0={0} a1={t * X} color={C.teal} width={3} arrow />
        <Dot x={1} y={0} color={C.ink} label="e" r={4} dx={8} dy={16} />
      </Plot>
      <Caption>{String.raw`Orange : $X\in T_eS^1$ (droite bleue). Vert : $t\mapsto e^{itX}$, de $0$ à $t$.`}</Caption>
    </div>
  );

  const pieces: [number, number][][] = [];
  let x = 0.3;
  let y = 0.2;
  let tt = 0;
  while (tt < T && pieces.length < 3000) {
    const dt = Math.min((TAU - x) / 1, (TAU - y) / s.alpha, T - tt);
    pieces.push([[x, y], [x + dt, y + s.alpha * dt]]);
    x += dt;
    y += s.alpha * dt;
    tt += dt;
    if (x >= TAU - 1e-9) x -= TAU;
    if (y >= TAU - 1e-9) y -= TAU;
  }
  const square = (
    <div>
      <Plot xDomain={[0, TAU]} yDomain={[0, TAU]} width={280} height={280} grid={false} ariaLabel="Une droite du tore">
        {pieces.map(([a, b], i) => (
          <Segment key={i} a={a} b={b} color={C.teal} width={1.2} />
        ))}
        <Segment a={[0, 0]} b={[TAU, 0]} color={C.orange} width={2} />
        <Segment a={[0, TAU]} b={[TAU, TAU]} color={C.orange} width={2} />
        <Segment a={[0, 0]} b={[0, TAU]} color={C.violet} width={2} />
        <Segment a={[TAU, 0]} b={[TAU, TAU]} color={C.violet} width={2} />
      </Plot>
      <Caption>Bords opposés identifiés : la droite de pente α, tracée sur [0, T].</Caption>
    </div>
  );

  const n = Math.min(4000, Math.max(200, Math.round(T * 30)));
  const helix = Array.from({ length: n + 1 }, (_, k) => {
    const u = 0.3 + (T * k) / n;
    return torus(u, 0.2 + s.alpha * (T * k) / n);
  });
  const space = (
    <div>
      <Scene3D label="La même droite sur le tore plongé" camera={[2, -2.6, 2.4]} height={280}>
        <ParamSurface f={torus} u={[0, TAU, 64]} v={[0, TAU, 32]} color="#4a86d0" opacity={0.35} deps={[]} />
        <Polyline3 points={helix} color="#1a9e96" width={1.2} />
      </Scene3D>
      <Caption>Le sous-groupe à un paramètre s’enroule sur le tore.</Caption>
    </div>
  );

  return (
    <PlateScene
      n={30}
      panels={[
        { title: 'Vecteurs tangents en l’identité', render: () => tangent },
        { title: 'Une droite dans le tore', render: () => square },
        { title: 'Sur le tore plongé', render: () => space },
      ]}
      identity={String.raw`$\mathfrak g=T_eG$, $\ [X,Y]=XY-YX$ (cas matriciel) ; $\ t\mapsto(e^{it},e^{i\alpha t})$ : fermé si $\alpha\in\mathbb Q$, dense sinon.`}
      controls={
        <>
          <Slider label="Vecteur X en e" value={X} min={-1.4} max={1.4} step={0.01} onChange={setX} format={(v) => f2(v)} />
          <Slider label="Temps t" value={t} min={0} max={6} step={0.01} onChange={setT} format={(v) => f2(v)} />
          <Choice name="Pente α" value={slope} onChange={setSlope} options={SLOPES.map((x) => ({ id: x.id, label: `α = ${x.label}` }))} />
          <Slider label="Durée T" value={T} min={5} max={300} step={1} onChange={setT2} format={(v) => String(v)} />
        </>
      }
      observations={[
        { id: 'sous-groupe', text: String.raw`Le vecteur $X$ engendre le sous-groupe $e^{itX}$ ; doubler $X$ revient à parcourir deux fois plus vite.`, done: Math.abs(X - 0.8) > 0.4 },
        { id: 'ferme', text: 'Avec une pente rationnelle p/q, la droite se referme : sous-groupe fermé, un cercle.', done: s.q > 0 && T > TAU * s.q },
        { id: 'dense', text: 'Avec une pente irrationnelle et une longue durée, la droite remplit le tore : sous-groupe dense.', done: s.q === 0 && T > 150 },
      ]}
      readings={[
        { label: String.raw`$e^{itX}$`, value: `angle ${f2(((t * X) % TAU + TAU) % TAU, 3)}`, status: 'exact' },
        { label: 'Période de la droite', value: s.q ? `2π·${s.q}` : 'aucune', status: 'exact' },
      ]}
    />
  );
}
