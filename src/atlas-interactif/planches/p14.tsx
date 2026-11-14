/**
 * Planche 14 — Orientation, bord et forme volume.
 * Bord du disque : n sortante, t tangente, (n, t) direct donne l'orientation induite.
 * Ruban à k demi-tours : on transporte la normale le long de l'âme ; pour k impair (Möbius),
 * elle revient opposée — pas d'orientation globale.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, Choice, Circle, DragOnCurve, f2, Label, Plot, Slider } from '../kit2d';
import { Arrow3, ParamSurface, Polyline3, Scene3D } from '../kit3d';
import { TAU, vcross } from '../math';

const WIDTH = 0.38;
const strip = (k: number) => (u: number, v: number): [number, number, number] => {
  const h = (k * u) / 2;
  return [(1 + v * Math.cos(h)) * Math.cos(u), (1 + v * Math.cos(h)) * Math.sin(u), v * Math.sin(h)];
};
function normalAt(k: number, u: number): [number, number, number] {
  const e = 1e-5;
  const X = strip(k);
  const p = X(u, 0);
  const du = X(u + e, 0).map((x, i) => (x - p[i]!) / e);
  const dv = X(u, e).map((x, i) => (x - p[i]!) / e);
  const n = vcross(du, dv);
  const l = Math.hypot(...n);
  return n.map((x) => x / l) as [number, number, number];
}

export default function P14() {
  const [s, setS] = useState(0.8);
  const [reverse, setReverse] = useState(false);
  const [k, setK] = useState(1);
  const [u, setU] = useState(0);

  const n: [number, number] = [Math.cos(s), Math.sin(s)];
  const t: [number, number] = reverse ? [Math.sin(s), -Math.cos(s)] : [-Math.sin(s), Math.cos(s)];
  const det = n[0] * t[1] - n[1] * t[0];

  const disk = (
    <div>
      <Plot xDomain={[-1.7, 1.7]} yDomain={[-1.7, 1.7]} width={330} height={330} grid={false} ariaLabel="Orientation du bord du disque">
        <Circle c={[0, 0]} r={1} color={C.teal} width={2.2} fill={C.teal} />
        <Arrow a={n} b={[n[0] * 1.55, n[1] * 1.55]} color={C.orange} width={2.4} />
        <Arrow a={n} b={[n[0] + 0.55 * t[0], n[1] + 0.55 * t[1]]} color={C.violet} width={2.4} />
        <Label x={n[0] * 1.6} y={n[1] * 1.6} text="n" color={C.orange} italic />
        <Label x={n[0] + 0.62 * t[0]} y={n[1] + 0.62 * t[1]} text="t" color={C.violet} italic />
        <Label x={0} y={0} text={det > 0 ? '(n, t) directe' : '(n, t) indirecte'} color={det > 0 ? C.teal : C.red} anchor="middle" size={12} />
        <DragOnCurve curve={(a) => [Math.cos(a), Math.sin(a)]} s={s} range={[0, TAU]} onChange={setS} name="Point du bord" color={C.ink} r={5} />
      </Plot>
      <Caption>n sortante, t tangente : le bord est orienté pour que (n, t) soit directe.</Caption>
    </div>
  );

  const X = strip(k);
  const N0 = normalAt(k, 0);
  const Nu = normalAt(k, u);
  const P0 = X(0, 0);
  const Pu = X(u, 0);
  const back = u > TAU - 0.05;
  const angle = (Math.acos(Math.max(-1, Math.min(1, N0[0] * Nu[0] + N0[1] * Nu[1] + N0[2] * Nu[2]))) * 180) / Math.PI;
  const ribbon = (
    <div>
      <Scene3D label="Ruban et transport de la normale" camera={[0.4, -3.2, 2.6]} height={330}>
        <ParamSurface f={X} u={[0, TAU, 120]} v={[-WIDTH, WIDTH, 6]} color="#8a6fd6" opacity={0.7} deps={[k]} />
        <Polyline3 points={Array.from({ length: 121 }, (_, i) => X((TAU * i) / 120, 0))} color="#4a86d0" width={1.6} />
        <Polyline3 points={Array.from({ length: 241 }, (_, i) => X((2 * TAU * i) / 240, WIDTH))} color="#d8743a" width={1.6} />
        <Arrow3 a={P0} b={P0.map((x, i) => x + 0.6 * N0[i]!)} color="#9aa5b4" />
        <Arrow3 a={Pu} b={Pu.map((x, i) => x + 0.6 * Nu[i]!)} color="#1a9e96" />
      </Scene3D>
      <Caption>Gris : la normale de départ. Vert : la normale transportée jusqu’au point courant.</Caption>
    </div>
  );

  return (
    <PlateScene
      n={14}
      panels={[
        { title: 'Orientation du bord du disque', render: () => disk },
        { title: 'Ruban de Möbius', render: () => ribbon },
      ]}
      identity={String.raw`$\mathrm{vol}_g=\sqrt{\det(g_{ij})}\,dx^1\wedge\dots\wedge dx^n$ ; orientation induite sur $\partial M$ : $(n,t_1,\dots,t_{n-1})$ directe.`}
      controls={
        <>
          <Choice
            name="Sens de t"
            value={reverse ? 'r' : 'd'}
            onChange={(v) => setReverse(v === 'r')}
            options={[
              { id: 'd', label: 'Sens trigonométrique' },
              { id: 'r', label: 'Sens horaire' },
            ]}
          />
          <Choice
            name="Nombre de demi-tours du ruban"
            value={k}
            onChange={setK}
            options={[
              { id: 0, label: 'Cylindre (0)' },
              { id: 1, label: 'Möbius (1)' },
              { id: 2, label: 'Deux demi-tours' },
            ]}
          />
          <Slider label="Transport le long de l’âme" value={u} min={0} max={TAU} step={0.01} onChange={setU} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
        </>
      }
      observations={[
        { id: 'indirect', text: 'Renverse t : (n, t) devient indirecte, ce n’est plus l’orientation induite.', done: reverse },
        { id: 'mobius', text: 'Sur le ruban de Möbius, fais un tour complet : la normale revient opposée.', done: k === 1 && back },
        { id: 'cylindre', text: 'Sur le cylindre, le même tour ramène la normale de départ.', done: k === 0 && back },
      ]}
      readings={[
        { label: String.raw`$\det(n,t)$`, value: f2(det, 3), status: 'exact' },
        { label: 'Angle entre la normale transportée et celle de départ', value: `${f2(angle, 1)}°`, status: 'exact' },
        { label: 'Bords du ruban', value: k % 2 ? 'un seul bord' : 'deux bords', status: 'exact' },
      ]}
    />
  );
}
