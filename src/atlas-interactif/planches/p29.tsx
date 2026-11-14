/**
 * Planche 29 — Groupes matriciels et contraintes tangentes.
 * O(2) conserve angles et normes ; SL(2) conserve les aires (le carré unité devient un
 * parallélogramme d'aire 1) ; U(1) conserve le module complexe. En dérivant les contraintes :
 * Xᵀ + X = 0, tr X = 0, X* + X = 0.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arc, Arrow, C, Caption, Check, Circle, DraggablePoint, f2, Plot, Poly, Slider } from '../kit2d';

export default function P29() {
  const [phi, setPhi] = useState(0.6);
  const [refl, setRefl] = useState(false);
  const [a, setA] = useState(1.3);
  const [b, setB] = useState(0.5);
  const [c, setC] = useState(0.2);
  const [th, setTh] = useState(0.8);
  const [z, setZ] = useState<[number, number]>([0.8, 0.3]);

  const Q = refl ? [[Math.cos(phi), Math.sin(phi)], [Math.sin(phi), -Math.cos(phi)]] : [[Math.cos(phi), -Math.sin(phi)], [Math.sin(phi), Math.cos(phi)]];
  const app = (M: number[][], [x, y]: [number, number]): [number, number] => [M[0]![0]! * x + M[0]![1]! * y, M[1]![0]! * x + M[1]![1]! * y];
  const u: [number, number] = [1, 0];
  const v: [number, number] = [0.5, 0.8];
  const Qu = app(Q, u);
  const Qv = app(Q, v);
  const ang = (p: [number, number], q: [number, number]) => Math.acos((p[0] * q[0] + p[1] * q[1]) / (Math.hypot(...p) * Math.hypot(...q)));
  const orth = (
    <div>
      <Plot xDomain={[-1.3, 1.3]} yDomain={[-1.3, 1.3]} width={240} height={240} grid={false} ariaLabel="Groupe orthogonal">
        <Circle c={[0, 0]} r={1} color={C.faint} width={1.2} />
        <Arrow a={[0, 0]} b={u} color={C.muted} width={1.4} dash="4 3" />
        <Arrow a={[0, 0]} b={v} color={C.muted} width={1.4} dash="4 3" />
        <Arrow a={[0, 0]} b={Qu} color={C.teal} width={2.4} />
        <Arrow a={[0, 0]} b={Qv} color={C.blue} width={2.4} />
      </Plot>
      <Caption>{String.raw`$Q^{\mathsf T}Q=I$ : angles et normes conservés.`}</Caption>
    </div>
  );

  const d = (1 + b * c) / a;
  const A = [[a, b], [c, d]];
  const sq: [number, number][] = [[0, 0], [1, 0], [1, 1], [0, 1]];
  const img = sq.map((p) => app(A, p));
  const area = Math.abs(img[1]![0] * img[3]![1] - img[1]![1] * img[3]![0]);
  const sl = (
    <div>
      <Plot xDomain={[-0.6, 2.8]} yDomain={[-0.6, 2.8]} width={240} height={240} grid={false} ariaLabel="Groupe spécial linéaire">
        <Poly points={sq} fill={C.blue} opacity={0.15} stroke={C.blue} />
        <Poly points={img} fill={C.orange} opacity={0.25} stroke={C.orange} width={2} />
      </Plot>
      <Caption>{String.raw`$\det A=1$ : le carré unité devient un parallélogramme d'aire $1$.`}</Caption>
    </div>
  );

  const uz: [number, number] = [Math.cos(th) * z[0] - Math.sin(th) * z[1], Math.sin(th) * z[0] + Math.cos(th) * z[1]];
  const za = Math.atan2(z[1], z[0]);
  const un = (
    <div>
      <Plot xDomain={[-1.3, 1.3]} yDomain={[-1.3, 1.3]} width={240} height={240} grid={false} ariaLabel="Groupe unitaire U(1)">
        <Circle c={[0, 0]} r={Math.hypot(...z)} color={C.faint} width={1.2} />
        <Arrow a={[0, 0]} b={z} color={C.blue} width={2} />
        <Arrow a={[0, 0]} b={uz} color={C.violet} width={2.4} />
        <Arc c={[0, 0]} r={0.3} a0={za} a1={za + th} color={C.violet} width={1.4} arrow />
        <DraggablePoint x={z[0]} y={z[1]} onChange={(x, y) => setZ([x, y])} name="Nombre complexe z" color={C.blue} label="z" bounds={[-1.2, 1.2, -1.2, 1.2]} step={0.05} r={5} />
      </Plot>
      <Caption>{String.raw`$|e^{i\theta}z|=|z|$ : $U(1)=\{u:\bar uu=1\}$.`}</Caption>
    </div>
  );

  return (
    <PlateScene
      n={29}
      panels={[
        { title: 'Orthogonal : angles et norme', render: () => orth },
        { title: 'Spécial linéaire : aire', render: () => sl },
        { title: 'Unitaire : norme complexe', render: () => un },
      ]}
      identity={String.raw`$Q^{\mathsf T}Q=I\Rightarrow X^{\mathsf T}+X=0$, $\quad\det A=1\Rightarrow\operatorname{tr}X=0$, $\quad U^*U=I\Rightarrow X^*+X=0$.`}
      controls={
        <>
          <Slider label="Angle de Q" value={phi} min={-3.14} max={3.14} step={0.01} onChange={setPhi} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Check label="Q est une réflexion (det Q = −1)" checked={refl} onChange={setRefl} />
          <Slider label="A : coefficient a" value={a} min={0.4} max={2.2} step={0.01} onChange={setA} format={(x) => f2(x)} />
          <Slider label="A : coefficient b" value={b} min={-1.5} max={1.5} step={0.01} onChange={setB} format={(x) => f2(x)} />
          <Slider label="A : coefficient c" value={c} min={-1.5} max={1.5} step={0.01} onChange={setC} format={(x) => f2(x)} />
          <Slider label="Angle θ de u = e^{iθ}" value={th} min={-3.14} max={3.14} step={0.01} onChange={setTh} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
        </>
      }
      observations={[
        { id: 'angle', text: 'Tourne ou réfléchis : l’angle entre les deux vecteurs et leurs normes ne changent pas.', done: Math.abs(phi - 0.6) > 0.8 || refl },
        { id: 'aire', text: String.raw`Déforme $A$ : le parallélogramme change de forme, son aire reste $1$.`, done: Math.abs(a - 1.3) > 0.4 || Math.abs(b - 0.5) > 0.5 },
        { id: 'module', text: String.raw`Multiplie $z$ par $e^{i\theta}$ : le module est conservé.`, done: Math.abs(th - 0.8) > 1 },
      ]}
      readings={[
        { label: String.raw`Angles $(u,v)$ et $(Qu,Qv)$`, value: `${f2((ang(u, v) * 180) / Math.PI, 2)}° ; ${f2((ang(Qu, Qv) * 180) / Math.PI, 2)}°`, status: 'exact' },
        { label: String.raw`$\det A$ et aire de l'image`, value: `${f2(a * d - b * c, 6)} ; ${f2(area, 6)}`, status: 'exact' },
        { label: String.raw`$|z|$ et $|e^{i\theta}z|$`, value: `${f2(Math.hypot(...z), 4)} ; ${f2(Math.hypot(...uz), 4)}`, status: 'exact' },
      ]}
    />
  );
}
