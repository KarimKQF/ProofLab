/**
 * Planche 4 — Vecteurs et espaces tangents.
 * Sphère : plan tangent en p, courbe tracée sur la sphère et son vecteur dérivé v,
 * vecteur w que l'on incline hors du plan. Cercle : p·v = 0.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, Circle, DragOnCurve, DraggablePoint, f2, Plot, Segment, Slider } from '../kit2d';
import { Arrow3, Globe, Patch3, Point3, Polyline3, Scene3D } from '../kit3d';
import { rotAxis, sph, TAU, vcross } from '../math';

export default function P04() {
  const [theta, setTheta] = useState(0.85);
  const [phi, setPhi] = useState(0.5);
  const [psi, setPsi] = useState(0.4);
  const [tau, setTau] = useState(0);
  const [a, setA] = useState(0.7);
  const [u, setU] = useState<[number, number]>([1.25, 1.55]);

  const p = sph(theta, phi);
  const eTh: [number, number, number] = [Math.cos(theta) * Math.cos(phi), Math.cos(theta) * Math.sin(phi), -Math.sin(theta)];
  const ePh: [number, number, number] = [-Math.sin(phi), Math.cos(phi), 0];
  const v = [0, 1, 2].map((i) => Math.cos(psi) * eTh[i]! + Math.sin(psi) * ePh[i]!) as [number, number, number];
  const wt = [0, 1, 2].map((i) => -Math.sin(psi) * eTh[i]! + Math.cos(psi) * ePh[i]!);
  const w = [0, 1, 2].map((i) => Math.cos(tau) * wt[i]! + Math.sin(tau) * p[i]!) as [number, number, number];
  const pw = p[0] * w[0] + p[1] * w[1] + p[2] * w[2];
  // Grand cercle passant par p de direction v : rotation de p autour de p × v.
  const axis = vcross(p, v);
  const curve = Array.from({ length: 121 }, (_, k) => rotAxis(axis, (TAU * k) / 120, p));
  const tip = (q: readonly number[], d: readonly number[], s = 0.7) => q.map((x, i) => x + s * d[i]!);

  const sphere = (
    <div>
      <Scene3D label="Plan tangent à la sphère" camera={[3.2, 2.2, 2.2]} height={360}>
        <Globe />
        <Polyline3 points={curve} color="#1a9e96" width={1.8} />
        <Patch3 c={p} a={eTh} b={ePh} s={0.55} color="#d8743a" opacity={0.25} />
        <Arrow3 a={p} b={tip(p, p, 0.6)} color="#d55181" />
        <Arrow3 a={p} b={tip(p, v)} color="#1a9e96" />
        <Arrow3 a={p} b={tip(p, w)} color="#8a6fd6" />
        <Point3 p={p} color="#e8eaef" size={0.04} />
      </Scene3D>
      <Caption>Vert : courbe tracée sur la sphère et son vecteur dérivé v. Violet : w. Rose : la normale p.</Caption>
    </div>
  );

  const q: [number, number] = [Math.cos(a), Math.sin(a)];
  const dotPU = q[0] * (u[0] - q[0]) + q[1] * (u[1] - q[1]);
  const uv: [number, number] = [u[0] - q[0], u[1] - q[1]];
  const proj: [number, number] = [uv[0] - dotPU * q[0], uv[1] - dotPU * q[1]];
  const circle = (
    <div>
      <Plot xDomain={[-1.8, 1.8]} yDomain={[-1.8, 1.8]} width={360} height={360} grid={false} ariaLabel="Vecteur tangent au cercle">
        <Circle c={[0, 0]} r={1} color={C.blue} width={1.8} />
        <Segment a={[q[0] - 2 * q[1], q[1] + 2 * q[0]]} b={[q[0] + 2 * q[1], q[1] - 2 * q[0]]} color={C.faint} width={1} />
        <Arrow a={[0, 0]} b={q} color={C.orange} width={1.6} />
        <Arrow a={q} b={[q[0] + proj[0], q[1] + proj[1]]} color={C.teal} width={2.4} />
        <Arrow a={q} b={u} color={C.violet} width={1.8} dash="5 3" />
        <DraggablePoint x={u[0]} y={u[1]} onChange={(x, y) => setU([x, y])} name="Extrémité du vecteur u" color={C.violet} label="u" bounds={[-1.8, 1.8, -1.8, 1.8]} step={0.05} r={6} />
        <DragOnCurve curve={(s) => [Math.cos(s), Math.sin(s)]} s={a} range={[0, TAU]} onChange={setA} name="Point p sur le cercle" label="p" color={C.ink} />
      </Plot>
      <Caption>{String.raw`Vert : composante tangente de $u$. La droite grise est $T_pS^1$.`}</Caption>
    </div>
  );

  return (
    <PlateScene
      n={4}
      panels={[
        { title: 'Sur la sphère', render: () => sphere },
        { title: 'Sur le cercle', render: () => circle },
      ]}
      identity={String.raw`$T_pS^2=\{v\in\mathbb R^3:\ p\cdot v=0\}$, $\quad v=\gamma'(0)$ pour une courbe $\gamma$ tracée sur $S^2$ avec $\gamma(0)=p$.`}
      controls={
        <>
          <Slider label="Colatitude de p" value={theta} min={0.1} max={3.04} step={0.01} onChange={setTheta} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider label="Longitude de p" value={phi} min={0} max={TAU} step={0.01} onChange={setPhi} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider label="Direction de la courbe en p" value={psi} min={0} max={TAU} step={0.01} onChange={setPsi} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider label="Incliner w hors du plan tangent" value={tau} min={-1.2} max={1.2} step={0.01} onChange={setTau} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
        </>
      }
      observations={[
        { id: 'courbe', text: String.raw`Tourne la direction de la courbe : son vecteur dérivé reste dans le plan tangent ($p\cdot v=0$).`, done: Math.abs(psi - 0.4) > 0.8 },
        { id: 'sortie', text: String.raw`Incline $w$ : dès que $p\cdot w\neq0$, $w$ sort de $T_pS^2$.`, done: Math.abs(pw) > 0.3 },
        { id: 'cercle', text: String.raw`Sur le cercle, rends $u$ tangent : la composante normale $p\cdot u$ s'annule.`, done: Math.abs(dotPU) < 0.05 && Math.hypot(uv[0], uv[1]) > 0.3 },
      ]}
      readings={[
        { label: String.raw`$p\cdot v$ (sphère)`, value: f2(p[0] * v[0] + p[1] * v[1] + p[2] * v[2], 4), status: 'exact' },
        { label: String.raw`$p\cdot w$ (sphère)`, value: f2(pw, 4), status: 'exact' },
        { label: String.raw`$p\cdot u$ (cercle)`, value: f2(dotPU, 4), status: 'exact' },
      ]}
    />
  );
}
