/**
 * Planche 74 — Lemme de Poincaré, homotopie et périodes.
 * Un domaine étoilé se contracte vers son centre par H_t(x) = t x : ses formes fermées sont
 * exactes. Sur le tore, la courbe (m tours en θ₁, n tours en θ₂) a pour périodes
 * ∫dθ₁ = 2πm et ∫dθ₂ = 2πn : deux cycles indépendants.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, Curve, Dot, f2, Plot, Poly, Slider } from '../kit2d';
import { ParamSurface, Polyline3, Scene3D } from '../kit3d';
import { linspace, TAU } from '../math';

const R = 1;
const r = 0.42;
const torus = (u: number, v: number): [number, number, number] => [(R + r * Math.cos(v)) * Math.cos(u), (R + r * Math.cos(v)) * Math.sin(u), r * Math.sin(v)];
const star = (a: number) => 1 + 0.35 * Math.cos(4 * a);

export default function P74() {
  const [t, setT] = useState(1);
  const [m, setM] = useState(1);
  const [n, setN] = useState(0);
  const shape = linspace(0, TAU, 160).map((a) => [t * star(a) * Math.cos(a), t * star(a) * Math.sin(a)] as [number, number]);
  const contract = (
    <div>
      <Plot xDomain={[-1.5, 1.5]} yDomain={[-1.5, 1.5]} width={280} height={280} grid={false} ariaLabel="Contracter vers un point">
        <Curve points={linspace(0, TAU, 160).map((a) => [star(a) * Math.cos(a), star(a) * Math.sin(a)] as [number, number])} color={C.faint} width={1.2} dash="4 3" />
        <Poly points={shape} fill={C.blue} opacity={0.2} stroke={C.blue} width={1.6} />
        <Dot x={0} y={0} color={C.orange} r={5} />
      </Plot>
      <Caption>{String.raw`$H_t(x)=tx$ : le domaine étoilé se contracte vers son centre.`}</Caption>
    </div>
  );
  const N = 400;
  const cyc = Array.from({ length: N + 1 }, (_, k) => {
    const s = (TAU * k) / N;
    return torus(m * s, n * s + 0.2);
  });
  const trivial = m === 0 && n === 0;
  const tor = (
    <Scene3D label="Cycles du tore" camera={[2, -2.6, 2.4]} height={280}>
      <ParamSurface f={torus} u={[0, TAU, 64]} v={[0, TAU, 32]} color="#4a86d0" opacity={0.35} deps={[]} />
      {!trivial && <Polyline3 points={cyc} color="#d8743a" width={2.4} />}
    </Scene3D>
  );
  return (
    <PlateScene
      n={74}
      panels={[
        { title: 'Contracter vers un point', render: () => contract },
        { title: 'Deux cycles indépendants du tore', render: () => tor },
      ]}
      identity={String.raw`$F_1^*-F_0^*=dK+Kd$ (homotopie) ; $\ \displaystyle\int_{\mathbb T^2}d\theta_1\wedge d\theta_2=(2\pi)^2$, périodes $\Big(\oint d\theta_1,\oint d\theta_2\Big)=(2\pi m,2\pi n)$.`}
      controls={
        <>
          <Slider label="Paramètre t de l’homotopie" value={t} min={0} max={1} step={0.01} onChange={setT} format={(v) => f2(v)} />
          <Slider label="Tours m en θ₁" value={m} min={-2} max={3} step={1} onChange={setM} format={(v) => String(v)} />
          <Slider label="Tours n en θ₂" value={n} min={-2} max={3} step={1} onChange={setN} format={(v) => String(v)} />
        </>
      }
      observations={[
        { id: 'contraction', text: String.raw`Amène $t$ à $0$ : le domaine se réduit à un point ; toute forme fermée y est exacte.`, done: t < 0.02 },
        { id: 'meridien', text: String.raw`Le cycle $(0,1)$ fait le tour du tube : périodes $(0,2\pi)$.`, done: m === 0 && n === 1 },
        { id: 'mixte', text: String.raw`Un cycle $(m,n)$ a pour périodes $(2\pi m,2\pi n)$ : les deux nombres sont indépendants.`, done: m !== 0 && n !== 0 },
      ]}
      readings={[
        { label: String.raw`Périodes $(\oint d\theta_1,\oint d\theta_2)$`, value: `(${2 * m}π ; ${2 * n}π)`, status: 'exact' },
        { label: String.raw`$\int_{\mathbb T^2}d\theta_1\wedge d\theta_2$`, value: f2(TAU * TAU, 4), status: 'exact' },
      ]}
    />
  );
}
