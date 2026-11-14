/**
 * Planche 26 — Espaces homogènes et quotient.
 * R = Rz(ψ) Ry(θ) Rz(ρ) : le roulis ρ fait tourner Re₁ et Re₂ autour de Re₃ sans changer
 * Re₃. L'application R ↦ Re₃ identifie SO(3)/SO(2) à la sphère S².
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, Circle, Dot, f2, Plot, Slider } from '../kit2d';
import { Arrow3, Globe, Point3, Polyline3, Scene3D } from '../kit3d';
import { matMul, type Mat } from '../math';

const Rz = (a: number): Mat => [
  [Math.cos(a), -Math.sin(a), 0],
  [Math.sin(a), Math.cos(a), 0],
  [0, 0, 1],
];
const Ry = (a: number): Mat => [
  [Math.cos(a), 0, Math.sin(a)],
  [0, 1, 0],
  [-Math.sin(a), 0, Math.cos(a)],
];
const col = (R: Mat, j: number) => [R[0]![j]!, R[1]![j]!, R[2]![j]!];

export default function P26() {
  const [psi, setPsi] = useState(0.6);
  const [th, setTh] = useState(0.8);
  const [rho, setRho] = useState(0.3);
  const R = matMul(matMul(Rz(psi), Ry(th)), Rz(rho));
  const e1 = col(R, 0);
  const e2 = col(R, 1);
  const e3 = col(R, 2);
  const ghost = (r: number) => col(matMul(matMul(Rz(psi), Ry(th)), Rz(r)), 0);

  const frames = (
    <Scene3D label="Repère R et son troisième axe sur la sphère" camera={[2.6, -2.6, 1.8]} height={340}>
      <Globe />
      <Polyline3 points={Array.from({ length: 73 }, (_, k) => ghost((2 * Math.PI * k) / 72))} color="#9aa5b4" width={1.2} />
      <Arrow3 a={[0, 0, 0]} b={e1} color="#1a9e96" />
      <Arrow3 a={[0, 0, 0]} b={e2} color="#8a6fd6" />
      <Arrow3 a={[0, 0, 0]} b={e3} color="#4a86d0" />
      <Point3 p={e3} color="#d8743a" size={0.07} />
    </Scene3D>
  );

  const fiber = (
    <div>
      <Plot xDomain={[-1.4, 1.4]} yDomain={[-1.4, 1.4]} width={300} height={300} grid={false} ariaLabel="La fibre au-dessus du point Re₃">
        <Circle c={[0, 0]} r={1} color={C.faint} width={1.4} />
        <Arrow a={[0, 0]} b={[Math.cos(rho), Math.sin(rho)]} color={C.teal} width={2.4} />
        <Arrow a={[0, 0]} b={[-Math.sin(rho), Math.cos(rho)]} color={C.violet} width={2.4} />
        <Dot x={0} y={0} color={C.orange} label="Re₃" r={4} dx={6} dy={16} />
      </Plot>
      <Caption>{String.raw`Plan tangent en $Re_3$, vu d'en haut : les repères qui ont ce troisième axe forment un cercle $SO(2)$.`}</Caption>
    </div>
  );

  return (
    <PlateScene
      n={26}
      panels={[
        { title: 'Plusieurs repères, même troisième axe', render: () => frames },
        { title: 'Le troisième axe détermine un point', render: () => fiber },
      ]}
      identity={String.raw`$SO(3)\longrightarrow S^2$, $\ R\longmapsto Re_3$, $\quad SO(3)/SO(2)\simeq S^2$ (fibre : les rotations d'axe $e_3$).`}
      controls={
        <>
          <Slider label="Lacet ψ" value={psi} min={0} max={6.28} step={0.01} onChange={setPsi} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider label="Tangage θ" value={th} min={0} max={3.14} step={0.01} onChange={setTh} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider label="Roulis ρ" value={rho} min={0} max={6.28} step={0.01} onChange={setRho} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
        </>
      }
      observations={[
        { id: 'roulis', text: String.raw`Fais varier le roulis : $Re_1$ et $Re_2$ tournent, le point $Re_3$ ne bouge pas.`, done: Math.abs(rho - 0.3) > 1 },
        { id: 'point', text: String.raw`Lacet et tangage déplacent le point $Re_3$ sur la sphère.`, done: Math.abs(psi - 0.6) > 0.8 || Math.abs(th - 0.8) > 0.6 },
        { id: 'pole', text: String.raw`Avec un tangage nul, $Re_3=e_3$ quel que soit le lacet : lacet et roulis tournent autour du même axe.`, done: th < 0.02 },
      ]}
      readings={[
        { label: String.raw`$Re_3$`, value: `(${e3.map((x) => f2(x, 3)).join(' ; ')})`, status: 'exact' },
        { label: String.raw`$Re_1\cdot Re_2$, $\ \det R$`, value: `${f2(e1.reduce((s, x, i) => s + x * e2[i]!, 0), 6)} ; ${f2(e1[0]! * (e2[1]! * e3[2]! - e2[2]! * e3[1]!) - e1[1]! * (e2[0]! * e3[2]! - e2[2]! * e3[0]!) + e1[2]! * (e2[0]! * e3[1]! - e2[1]! * e3[0]!), 6)}`, status: 'exact' },
      ]}
    />
  );
}
