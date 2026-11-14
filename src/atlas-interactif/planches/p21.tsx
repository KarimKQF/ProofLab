/**
 * Planche 21 — Sous-variétés, contraintes et multiplicateurs.
 * Sur le cercle : P V = V − (p·V)p ; f linéaire de gradient ∇f : extremum lié quand
 * P∇f = 0, c'est-à-dire ∇f = λ p (df = λ dF). Le cône x² + y² − z² = 0 : ses génératrices
 * passent par le sommet dans trois directions indépendantes, pas de plan tangent.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, Choice, Circle, Curve, DragOnCurve, DraggablePoint, f2, Plot, Slider } from '../kit2d';
import { Arrow3, ParamSurface, Point3, Scene3D } from '../kit3d';
import { linspace, TAU } from '../math';

export default function P21() {
  const [a, setA] = useState(0.9);
  const [V, setV] = useState<[number, number]>([1.25, 1.6]);
  const [gamma, setGamma] = useState(0.5);
  const [show, setShow] = useState<'proj' | 'extremum'>('proj');
  const [k, setK] = useState(3);
  const p: [number, number] = [Math.cos(a), Math.sin(a)];
  const W: [number, number] = [V[0] - p[0], V[1] - p[1]];
  const pw = p[0] * W[0] + p[1] * W[1];
  const PW: [number, number] = [W[0] - pw * p[0], W[1] - pw * p[1]];
  const g: [number, number] = [Math.cos(gamma), Math.sin(gamma)];
  const pg = p[0] * g[0] + p[1] * g[1];
  const Pg: [number, number] = [g[0] - pg * p[0], g[1] - pg * p[1]];
  const tangentNorm = Math.hypot(...Pg);

  const circle = (
    <div>
      <Plot xDomain={[-1.8, 1.8]} yDomain={[-1.8, 1.8]} width={330} height={330} grid={false} ariaLabel="Projection sur le plan tangent du cercle">
        {show === 'extremum' &&
          linspace(-2.4, 2.4, 9).map((c) => (
            <Curve key={c} points={[[c * g[0] - 3 * g[1], c * g[1] + 3 * g[0]], [c * g[0] + 3 * g[1], c * g[1] - 3 * g[0]]]} color={C.faint} width={0.9} />
          ))}
        <Circle c={[0, 0]} r={1} color={C.blue} width={2} />
        {show === 'proj' ? (
          <>
            <Arrow a={p} b={V} color={C.orange} width={2.2} />
            <Arrow a={p} b={[p[0] + PW[0], p[1] + PW[1]]} color={C.teal} width={2.6} />
            <Curve points={[V, [p[0] + PW[0], p[1] + PW[1]]]} color={C.orange} width={1.2} dash="4 3" />
            <DraggablePoint x={V[0]} y={V[1]} onChange={(x, y) => setV([x, y])} name="Extrémité de V" color={C.orange} label="V" bounds={[-1.8, 1.8, -1.8, 1.8]} step={0.05} r={6} />
          </>
        ) : (
          <>
            <Arrow a={p} b={[p[0] + 0.7 * g[0], p[1] + 0.7 * g[1]]} color={C.orange} width={2.4} />
            <Arrow a={p} b={[p[0] + 0.7 * Pg[0], p[1] + 0.7 * Pg[1]]} color={C.teal} width={2.6} />
          </>
        )}
        <DragOnCurve curve={(s) => [Math.cos(s), Math.sin(s)]} s={a} range={[0, TAU]} onChange={setA} name="Point p du cercle" label="p" color={C.ink} r={5} />
      </Plot>
      <Caption>{show === 'proj' ? String.raw`Vert : $P_{T_pS^1}V=V-(p\cdot V)p$.` : String.raw`Orange : $\nabla f$ ; vert : sa projection tangente, nulle à un extremum lié.`}</Caption>
    </div>
  );

  const dirs = Array.from({ length: k }, (_, i) => (TAU * i) / k);
  const cone = (
    <div>
      <Scene3D label="Le cône et son sommet" camera={[3.4, -2.8, 1.8]} height={330}>
        <ParamSurface f={(t, h) => [h * Math.cos(t), h * Math.sin(t), h]} u={[0, TAU, 60]} v={[-1.2, 1.2, 24]} color="#8a6fd6" opacity={0.4} deps={[]} />
        {dirs.map((t) => (
          <Arrow3 key={t} a={[0, 0, 0]} b={[Math.cos(t), Math.sin(t), 1]} color="#1a9e96" />
        ))}
        <Point3 p={[0, 0, 0]} color="#d8743a" size={0.07} />
      </Scene3D>
      <Caption>{String.raw`Vecteurs dérivés en $0$ des génératrices $s\mapsto s(\cos\theta,\sin\theta,1)$.`}</Caption>
    </div>
  );

  const det3 = k >= 3 ? 2 * Math.sin(TAU / k) * (1 - Math.cos(TAU / k)) : 0;
  return (
    <PlateScene
      n={21}
      panels={[
        { title: 'Projection dans le plan tangent', render: () => circle },
        { title: 'Au sommet du cône', render: () => cone },
      ]}
      identity={String.raw`$P_{T_pS^n}V=V-(p\cdot V)\,p$, $\quad df_p=\lambda\,dF_p$ (extremum de $f$ sur $F^{-1}(c)$) ; cône : $x^2+y^2-z^2=0$.`}
      controls={
        <>
          <Choice
            name="Panneau de gauche"
            value={show}
            onChange={setShow}
            options={[
              { id: 'proj', label: 'Projeter V' },
              { id: 'extremum', label: 'Extremum lié de f' },
            ]}
          />
          {show === 'extremum' && <Slider label="Direction de ∇f" value={gamma} min={0} max={TAU} step={0.01} onChange={setGamma} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />}
          <Slider label="Génératrices tracées" value={k} min={1} max={8} step={1} onChange={setK} format={(x) => String(x)} />
        </>
      }
      observations={[
        { id: 'tangent', text: String.raw`Rends $V$ tangent : $p\cdot V$ s'annule et la projection ne change rien.`, done: show === 'proj' && Math.abs(pw) < 0.04 && Math.hypot(...W) > 0.3 },
        { id: 'extremum', text: String.raw`Trouve un extremum de $f$ sur le cercle : $\nabla f=\lambda p$, la projection tangente s'annule.`, done: show === 'extremum' && tangentNorm < 0.03 },
        { id: 'cone', text: 'Trois génératrices du cône ont des directions indépendantes en son sommet : aucun plan ne les contient toutes.', done: k >= 3 },
      ]}
      readings={[
        { label: String.raw`$p\cdot(V-p)$`, value: f2(pw, 4), status: 'exact' },
        { label: String.raw`$|P\nabla f|$ et $\lambda=p\cdot\nabla f$`, value: `${f2(tangentNorm, 4)} ; ${f2(pg, 4)}`, status: 'exact' },
        { label: 'Déterminant de trois génératrices consécutives', value: k >= 3 ? f2(det3, 4) : '—', status: 'exact' },
      ]}
    />
  );
}
