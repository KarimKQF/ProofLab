/**
 * Planche 59 — Euler–Lagrange pour les champs.
 * Fonctionnelle de Dirichlet D(u) = ½∫|∇u|² sur [0, 1]², variation η = sin πx sin πy nulle au
 * bord. D(u + εη) − D(u) = ε∫∇u·∇η + ε²/2 ∫|∇η|² ; le terme linéaire −∫Δu η est nul
 * exactement quand u est harmonique.
 */
import { useMemo, useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, Choice, ClippedCurve, Dot, f2, Plot, Slider } from '../kit2d';
import { ParamSurface, Polyline3, Scene3D } from '../kit3d';
import { linspace, simpson } from '../math';

const U = {
  harm: { label: String.raw`$u=x^2-y^2$ (harmonique)`, f: (x: number, y: number) => x * x - y * y, ux: (x: number) => 2 * x, uy: (_: number, y: number) => -2 * y },
  non: { label: String.raw`$u=x^2+y^2$ ($\Delta u=4$)`, f: (x: number, y: number) => x * x + y * y, ux: (x: number) => 2 * x, uy: (_: number, y: number) => 2 * y },
};
const eta = (x: number, y: number) => Math.sin(Math.PI * x) * Math.sin(Math.PI * y);
const ex = (x: number, y: number) => Math.PI * Math.cos(Math.PI * x) * Math.sin(Math.PI * y);
const ey = (x: number, y: number) => Math.PI * Math.sin(Math.PI * x) * Math.cos(Math.PI * y);
const int2 = (g: (x: number, y: number) => number) => simpson((x) => simpson((y) => g(x, y), 0, 1, 40), 0, 1, 40);

export default function P59() {
  const [which, setWhich] = useState<'harm' | 'non'>('harm');
  const [eps, setEps] = useState(0.3);
  const u = U[which];
  const lin = useMemo(() => int2((x, y) => u.ux(x) * ex(x, y) + u.uy(x, y) * ey(x, y)), [u]);
  const quad = useMemo(() => 0.5 * int2((x, y) => ex(x, y) ** 2 + ey(x, y) ** 2), []);
  const delta = (e: number) => e * lin + e * e * quad;
  const boundary = [
    ...linspace(0, 1, 20).map((s) => [s, 0, u.f(s, 0)]),
    ...linspace(0, 1, 20).map((s) => [1, s, u.f(1, s)]),
    ...linspace(1, 0, 20).map((s) => [s, 1, u.f(s, 1)]),
    ...linspace(1, 0, 20).map((s) => [0, s, u.f(0, s)]),
  ];
  const surf = (
    <Scene3D label="Le champ varié, bord fixé" camera={[2.8, -2.6, 2.4]} height={320}>
      <ParamSurface f={(x, y) => [2 * x - 1, 2 * y - 1, 1.2 * (u.f(x, y) + eps * eta(x, y)) - 0.6]} u={[0, 1, 30]} v={[0, 1, 30]} color="#46b8b0" opacity={0.9} deps={[which, eps]} />
      <Polyline3 points={boundary.map(([x, y, z]) => [2 * x! - 1, 2 * y! - 1, 1.2 * z! - 0.6])} color="#d8743a" width={2.4} />
    </Scene3D>
  );
  const es = linspace(-1, 1, 100);
  const vals = es.map(delta);
  const top = Math.max(1, ...vals);
  const bot = Math.min(-0.3, ...vals);
  const D: [number, number, number, number] = [-1, 1, bot, top];
  const curve = (
    <div>
      <Plot xDomain={[-1, 1]} yDomain={[bot, top]} width={320} height={260} ariaLabel="Variation de la fonctionnelle de Dirichlet">
        <ClippedCurve points={es.map((e, i) => [e, vals[i]!])} domain={D} color={C.teal} width={2.4} />
        <ClippedCurve points={[[-1, -lin], [1, lin]]} domain={D} color={C.orange} width={1.4} dash="5 4" />
        <Dot x={eps} y={delta(eps)} color={C.orange} r={5} />
      </Plot>
      <Caption>{String.raw`$D(u+\varepsilon\eta)-D(u)$ ; pointillé : tangente en $0$, de pente $\int\nabla u\cdot\nabla\eta=-\int\Delta u\,\eta$.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={59}
      panels={[
        { title: 'Un champ sur un domaine, une bosse de variation', render: () => surf },
        { title: 'Variation de la fonctionnelle', render: () => curve },
      ]}
      identity={String.raw`$\dfrac{\partial L}{\partial u}-\sum_i\partial_i\Big(\dfrac{\partial L}{\partial(\partial_iu)}\Big)=0$ ; pour $L=\tfrac12|\nabla u|^2$ : $\Delta u=0$.`}
      controls={
        <>
          <Choice name="Champ u" value={which} onChange={setWhich} options={(Object.keys(U) as ('harm' | 'non')[]).map((k) => ({ id: k, label: U[k].label }))} />
          <Slider label="ε (hauteur de la bosse)" value={eps} min={-1} max={1} step={0.01} onChange={setEps} format={(v) => f2(v)} />
        </>
      }
      observations={[
        { id: 'harmonique', text: 'Pour u harmonique, la pente en 0 est nulle : u est critique pour toute variation intérieure.', done: which === 'harm' && Math.abs(eps) > 0.5 },
        { id: 'non', text: String.raw`Pour $u=x^2+y^2$, la pente vaut $-4\int\eta=-16/\pi^2$ : $u$ n'est pas critique.`, done: which === 'non' },
        { id: 'bord', text: 'Le bord orange reste fixé quelle que soit la bosse.', done: Math.abs(eps) > 0.8 },
      ]}
      readings={[
        { label: String.raw`$\int\nabla u\cdot\nabla\eta$ (pente en $0$)`, value: f2(lin, 5), status: 'numerique' },
        { label: String.raw`$-16/\pi^2$ (attendu pour $u=x^2+y^2$)`, value: f2(-16 / Math.PI ** 2, 5), status: 'exact' },
        { label: String.raw`$\tfrac12\int|\nabla\eta|^2=\pi^2/4$`, value: `${f2(quad, 5)} ; ${f2(Math.PI ** 2 / 4, 5)}`, status: 'numerique' },
      ]}
      note="Intégrales doubles par la méthode de Simpson (40 × 40)."
    />
  );
}
