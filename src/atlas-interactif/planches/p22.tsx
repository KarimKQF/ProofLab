/**
 * Planche 22 — Espaces projectifs, Stiefel et Grassmanniennes.
 * Une droite de ℝ² a deux vecteurs unitaires ±u : ℝP¹ = S¹/{±1}. Un plan de ℝ³ porte des
 * repères orthonormés (variété de Stiefel) ; tourner le repère dans le plan ne change pas le
 * plan (point de la grassmannienne Gr(2, 3) = St(2, 3)/O(2)).
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, Circle, Dot, f2, Plot, Segment, Slider } from '../kit2d';
import { Arrow3, Patch3, Scene3D } from '../kit3d';
import { mod2pi, sph, vcross, vnorm } from '../math';

export default function P22() {
  const [theta, setTheta] = useState(0.6);
  const [alpha, setAlpha] = useState(0.7);
  const [beta, setBeta] = useState(0.4);
  const [psi, setPsi] = useState(0.3);
  const u: [number, number] = [Math.cos(theta), Math.sin(theta)];

  const line = (
    <div>
      <Plot xDomain={[-1.5, 1.5]} yDomain={[-1.5, 1.5]} width={300} height={300} grid={false} ariaLabel="Droite vectorielle et ses deux vecteurs unitaires">
        <Circle c={[0, 0]} r={1} color={C.faint} width={1.2} />
        <Segment a={[-1.45 * u[0], -1.45 * u[1]]} b={[1.45 * u[0], 1.45 * u[1]]} color={C.teal} width={2.4} />
        <Dot x={u[0]} y={u[1]} color={C.teal} label="u" r={5} />
        <Dot x={-u[0]} y={-u[1]} color={C.orange} label="−u" r={5} />
        <Circle c={[0, 0]} r={0.35} color={C.violet} width={1.2} dash="3 3" />
        <Dot x={0.35 * Math.cos(2 * theta)} y={0.35 * Math.sin(2 * theta)} color={C.violet} r={4} />
      </Plot>
      <Caption>{String.raw`Violet : la droite comme point de $\mathbb RP^1\simeq S^1$, repérée par l'angle $2\theta$.`}</Caption>
    </div>
  );

  const n = sph(alpha, beta);
  const ref = Math.abs(n[2]) < 0.95 ? [0, 0, 1] : [1, 0, 0];
  const aRaw = vcross(n, ref);
  const a = aRaw.map((x) => x / vnorm(aRaw));
  const b = vcross(n, a);
  const e1 = a.map((x, i) => Math.cos(psi) * x + Math.sin(psi) * b[i]!);
  const e2 = a.map((x, i) => -Math.sin(psi) * x + Math.cos(psi) * b[i]!);
  const f1 = a.map((x, i) => Math.cos(psi + 1.1) * x + Math.sin(psi + 1.1) * b[i]!);
  const f2v = a.map((x, i) => 0.6 * (-Math.sin(psi + 1.1) * x + Math.cos(psi + 1.1) * b[i]!) + 0.5 * f1[i]!);
  const plane = (
    <div>
      <Scene3D label="Un plan de ℝ³, un repère orthonormé et une autre base" camera={[2.6, -2.8, 2]} height={300} showAxes axes={1.3}>
        <Patch3 c={[0, 0, 0]} a={a} b={b} s={1.2} color="#4a86d0" opacity={0.2} />
        <Arrow3 a={[0, 0, 0]} b={e1} color="#1a9e96" />
        <Arrow3 a={[0, 0, 0]} b={e2} color="#d8743a" />
        <Arrow3 a={[0, 0, 0]} b={f1.map((x) => 0.8 * x)} color="#8a6fd6" />
        <Arrow3 a={[0, 0, 0]} b={f2v} color="#8a6fd6" />
      </Scene3D>
      <Caption>{String.raw`Vert, orange : un repère orthonormé $(e_1,e_2)$. Violet : une autre base du même plan.`}</Caption>
    </div>
  );

  return (
    <PlateScene
      n={22}
      panels={[
        { title: 'Droite projective', render: () => line },
        { title: 'Repère de Stiefel et plan grassmannien', render: () => plane },
      ]}
      identity={String.raw`$\mathbb RP^{n-1}=S^{n-1}/\{\pm1\}$, $\quad\mathrm{Gr}(k,n)=\mathrm{St}(k,n)/O(k)$, $\quad\dim\mathrm{Gr}(k,n)=k(n-k)$.`}
      controls={
        <>
          <Slider label="Angle θ de la droite" value={theta} min={0} max={6.28} step={0.01} onChange={setTheta} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider label="Plan : colatitude de la normale" value={alpha} min={0.05} max={3.1} step={0.01} onChange={setAlpha} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider label="Plan : longitude de la normale" value={beta} min={0} max={6.28} step={0.01} onChange={setBeta} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider label="Tourner le repère dans le plan" value={psi} min={0} max={6.28} step={0.01} onChange={setPsi} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
        </>
      }
      observations={[
        { id: 'pi', text: String.raw`Tourne la droite d'un demi-tour : $u$ devient $-u$, la droite est la même (le point violet a fait un tour).`, done: Math.abs(mod2pi(theta - 0.6) - Math.PI) < 0.05 },
        { id: 'stiefel', text: 'Tourne le repère dans le plan : le point de Stiefel change, le plan non.', done: Math.abs(psi - 0.3) > 1 },
        { id: 'grass', text: 'Incline le plan : c’est alors le point de la grassmannienne qui bouge.', done: Math.abs(alpha - 0.7) > 0.5 || Math.abs(beta - 0.4) > 0.8 },
      ]}
      readings={[
        { label: String.raw`$u$ et $-u$`, value: `(${f2(u[0], 3)} ; ${f2(u[1], 3)}) et (${f2(-u[0], 3)} ; ${f2(-u[1], 3)})`, status: 'exact' },
        { label: String.raw`Normale du plan $n$`, value: `(${n.map((x) => f2(x, 3)).join(' ; ')})`, status: 'exact' },
        { label: String.raw`$e_1\cdot e_2$, $e_1\cdot n$`, value: `${f2(e1.reduce((s, x, i) => s + x * e2[i]!, 0), 6)} ; ${f2(e1.reduce((s, x, i) => s + x * n[i]!, 0), 6)}`, status: 'exact' },
      ]}
    />
  );
}
