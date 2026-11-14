/**
 * Planche 85 — Réduction symplectique de Marsden-Weinstein.
 * ℂ² avec la phase commune e^{iψ}·(z₁, z₂), moment J = −‖z‖²/2. Fixer J = −r²/2 impose
 * ‖z‖ = r (une sphère S³ de rayon r). On identifie chaque cercle de phase à un point :
 * π(z) = ½(2 z̄₁z₂, |z₁|² − |z₂|²) envoie le niveau sur la sphère réduite de rayon r²/2.
 * Ici z = r(cos(θ/2), e^{iφ} sin(θ/2))·e^{iψ} : π(z) = (r²/2)(sin θ cos φ, sin θ sin φ, cos θ),
 * indépendant de la phase ψ.
 */
import { useMemo, useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, ClippedCurve, Dot, f2, Label, Plot, Segment, Slider } from '../kit2d';
import { Globe, Point3, Polyline3, Scene3D } from '../kit3d';
import { linspace, sph, TAU } from '../math';

/** Point de S³_r de paramètres (θ, φ, ψ), projeté stéréographiquement depuis (0, 0, 0, r). */
function project(r: number, th: number, ph: number, psi: number): [number, number, number] {
  const a = Math.cos(th / 2) * Math.cos(psi);
  const b = Math.cos(th / 2) * Math.sin(psi);
  const c = Math.sin(th / 2) * Math.cos(psi + ph);
  const d = Math.sin(th / 2) * Math.sin(psi + ph);
  const den = Math.max(1e-6, 1 - d);
  return [(r * a) / den, (r * b) / den, (r * c) / den];
}

const REF = { th: 1.8, ph: 4.6 };

export default function P85() {
  const [r, setR] = useState(1);
  const [th, setTh] = useState(1.5);
  const [ph, setPh] = useState(3.4);
  const [psi, setPsi] = useState(0.8);
  const fiber = useMemo(() => linspace(0, TAU, 200).map((s) => project(r, th, ph, s)).filter((p) => Math.hypot(...p) < 8 * r), [r, th, ph]);
  const ref = useMemo(() => linspace(0, TAU, 200).map((s) => project(r, REF.th, REF.ph, s)), [r]);
  const z1 = r * Math.cos(th / 2);
  const z2 = r * Math.sin(th / 2);
  const level = (
    <div>
      <Plot xDomain={[-0.15, 1.7]} yDomain={[-0.15, 1.7]} width={240} height={240} grid={false} ariaLabel="Fixer le moment">
        <Segment a={[0, 0]} b={[1.65, 0]} color={C.muted} width={1} />
        <Segment a={[0, 0]} b={[0, 1.65]} color={C.muted} width={1} />
        <ClippedCurve points={linspace(0, Math.PI / 2, 60).map((t) => [r * Math.cos(t), r * Math.sin(t)])} domain={[-0.15, 1.7, -0.15, 1.7]} color={C.teal} width={2.6} />
        <Dot x={z1} y={z2} color={C.orange} r={5} />
        <Label x={1.6} y={0.08} text="|z₁|" color={C.muted} size={12} anchor="end" />
        <Label x={0.06} y={1.6} text="|z₂|" color={C.muted} size={12} />
        <Label x={r * Math.cos(0.9)} y={r * Math.sin(0.9)} text="‖z‖ = r" color={C.teal} size={12} dx={6} dy={-4} />
      </Plot>
      <Caption>Coupe en modules du niveau : un quart de cercle de rayon r.</Caption>
    </div>
  );
  const fibers = (
    <Scene3D label="Identifier chaque fibre" camera={[3.6, -3.9, 2.6]} height={260}>
      <Polyline3 points={ref} color="#1a9e96" width={2} />
      {fiber.length > 1 && <Polyline3 points={fiber} color="#d8743a" width={2.4} />}
      <Point3 p={project(r, th, ph, psi)} color="#e3b341" size={0.08} />
    </Scene3D>
  );
  const R2 = (r * r) / 2;
  const reduced = (
    <Scene3D label="Espace réduit" camera={[2.1, -2.3, 1.5]} height={260}>
      <Globe r={R2} />
      <Point3 p={sph(th, ph).map((x) => R2 * x)} color="#d8743a" size={0.07} />
      <Point3 p={sph(REF.th, REF.ph).map((x) => R2 * x)} color="#1a9e96" size={0.07} />
    </Scene3D>
  );
  const pz = sph(th, ph).map((x) => R2 * x);
  return (
    <PlateScene
      n={85}
      panels={[
        { title: 'Fixer le moment', render: () => level },
        { title: 'Identifier chaque fibre', render: () => fibers },
        { title: 'Espace réduit', render: () => reduced },
      ]}
      identity={String.raw`$M_\mu=J^{-1}(\mu)/G_\mu$, $\qquad\pi_\mu^*\omega_\mu=\iota_\mu^*\omega$`}
      controls={
        <>
          <Slider label="Niveau : r = ‖z‖" value={r} min={0.5} max={1.5} step={0.01} onChange={setR} format={(v) => f2(v)} />
          <Slider label="Point réduit : colatitude θ" value={th} min={0.05} max={3.09} step={0.01} onChange={setTh} format={(v) => `${Math.round((v * 180) / Math.PI)}°`} />
          <Slider label="Point réduit : longitude φ" value={ph} min={0} max={6.28} step={0.01} onChange={setPh} format={(v) => `${Math.round((v * 180) / Math.PI)}°`} />
          <Slider label="Phase ψ (le long de la fibre)" value={psi} min={0} max={6.28} step={0.01} onChange={setPsi} format={(v) => `${Math.round((v * 180) / Math.PI)}°`} />
        </>
      }
      observations={[
        { id: 'phase', text: 'Tourne la phase ψ : le point doré parcourt sa fibre, mais le point réduit sur la sphère ne bouge pas.', done: Math.abs(psi - 0.8) > 1.5 },
        { id: 'fibre', text: 'Déplace le point réduit : sa fibre (orange) change, toujours enlacée avec la fibre verte ; un point de S² = un cercle du niveau.', done: Math.abs(th - 1.5) > 0.6 || Math.abs(ph - 3.4) > 1 },
        { id: 'niveau', text: String.raw`Change $r$ : le niveau $\|z\|=r$ grandit, et la sphère réduite a pour rayon $r^2/2$.`, done: Math.abs(r - 1) > 0.3 },
      ]}
      readings={[
        { label: String.raw`$J=-\|z\|^2/2$`, value: f2(-R2, 4), status: 'exact' },
        { label: String.raw`$(|z_1|,|z_2|)$`, value: `(${f2(z1, 3)} ; ${f2(z2, 3)})`, status: 'exact' },
        { label: String.raw`Point réduit $\pi(z)$ (ne dépend pas de $\psi$)`, value: `(${pz.map((x) => f2(x, 3)).join(' ; ')})`, status: 'exact' },
      ]}
      note="Fibres vues par projection stéréographique de la sphère S³ de rayon r ; les morceaux très éloignés ne sont pas tracés."
    />
  );
}
