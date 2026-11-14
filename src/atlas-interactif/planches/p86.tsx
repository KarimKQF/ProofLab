/**
 * Planche 86 — Orbites coadjointes et forme KKS.
 * so(3)* ≅ ℝ³ : l'action coadjointe de SO(3) est la rotation, ses orbites sont les sphères
 * centrées et l'origine. Sur la sphère de rayon r passant par ν, les vecteurs tangents
 * u = ξ×ν et v = η×ν vérifient ω_ν(u, v) = ν·(ξ×η) = ν·(u×v)/r², soit l'aire orientée
 * divisée par r.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { f2, Slider } from '../kit2d';
import { Arrow3, Globe, Patch3, Point3, Polyline3, Scene3D } from '../kit3d';
import { linspace, sph, TAU, vcross, vdot } from '../math';

/** Rotation d'angle γ autour de l'axe x. */
const rx = (g: number, [x, y, z]: readonly number[]): [number, number, number] => [x!, Math.cos(g) * y! - Math.sin(g) * z!, Math.sin(g) * y! + Math.cos(g) * z!];

export default function P86() {
  const [r, setR] = useState(1);
  const [gamma, setGamma] = useState(0.5);
  const [alpha, setAlpha] = useState(1.2);
  const [beta, setBeta] = useState(1.4);
  const nu = rx(gamma, [0, 0, r]);
  // ξ et η sont repérés par rapport à ν : α (resp. β) est leur écart angulaire à ν.
  const xi = rx(gamma, sph(alpha, 0));
  const eta = rx(gamma, sph(beta, 1.9));
  const u = vcross(xi, nu);
  const v = vcross(eta, nu);
  const omega = vdot(nu, vcross(xi, eta));
  const areaOverR = vdot(nu, vcross(u, v)) / (r * r);
  const area = Math.hypot(...vcross(u, v));
  const orbit = linspace(0, TAU, 120).map((g) => rx(g, [0, 0, r]));
  const orbits = (
    <Scene3D label="Orbites de SO(3) dans le dual" camera={[3.6, -3.9, 2.4]} height={300}>
      {[0.5, 1, 1.5].filter((s) => Math.abs(s - r) > 0.08).map((s) => (
        <Globe key={s} r={s} color="#4a86d0" opacity={0.08} lines={false} />
      ))}
      <Globe r={r} color="#1a9e96" opacity={0.25} />
      <Polyline3 points={orbit} color="#8a6fd6" width={1.4} />
      <Point3 p={[0, 0, 0]} color="#d8743a" size={0.07} />
      <Point3 p={nu} color="#e3b341" size={0.08} />
    </Scene3D>
  );
  const kks = (
    <Scene3D label="Aire symplectique sur une orbite" camera={[2.9, -3.2, 2.2]} height={300}>
      <Globe r={r} />
      <Patch3 c={nu.map((x, i) => x + (u[i]! + v[i]!) / 2)} a={u} b={v} s={0.5} color="#d8743a" opacity={0.35} />
      <Arrow3 a={nu} b={nu.map((x, i) => x + u[i]!)} color="#1a9e96" />
      <Arrow3 a={nu} b={nu.map((x, i) => x + v[i]!)} color="#d8743a" />
      <Point3 p={nu} color="#e3b341" size={0.07} />
    </Scene3D>
  );
  return (
    <PlateScene
      n={86}
      panels={[
        { title: 'Orbites de SO(3) dans le dual', render: () => orbits },
        { title: 'Aire symplectique sur une orbite', render: () => kks },
      ]}
      identity={String.raw`$\omega_\nu(\mathrm{ad}^*_\xi\nu,\mathrm{ad}^*_\eta\nu)=\langle\nu,[\xi,\eta]\rangle$ ; ici $\omega_\nu(u,v)=\nu\cdot(\xi\times\eta)=\dfrac{\nu\cdot(u\times v)}{\|\nu\|^2}$.`}
      controls={
        <>
          <Slider label="Rayon r = ‖ν‖" value={r} min={0.4} max={1.6} step={0.01} onChange={setR} format={(x) => f2(x)} />
          <Slider label="Rotation γ appliquée à ν" value={gamma} min={0} max={6.28} step={0.01} onChange={setGamma} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider label="Écart de ξ à ν" value={alpha} min={0} max={3.14} step={0.01} onChange={setAlpha} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider label="Écart de η à ν" value={beta} min={0} max={3.14} step={0.01} onChange={setBeta} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
        </>
      }
      observations={[
        { id: 'orbite', text: 'Tourne ν avec γ : il reste sur sa sphère ; l’orbite coadjointe de ν est la sphère de rayon ‖ν‖.', done: Math.abs(gamma - 0.5) > 1 },
        { id: 'kks', text: String.raw`Change $\xi$ ou $\eta$ : $\omega_\nu(u,v)$ suit l'aire orientée du parallélogramme, divisée par $\|\nu\|$.`, done: Math.abs(alpha - 1.2) > 0.5 || Math.abs(beta - 1.4) > 0.5 },
        { id: 'rayon', text: String.raw`Agrandis $r$ : $u$ et $v$ s'allongent (aire multipliée par $r^2$) mais $\omega_\nu$ ne croît que comme $r$.`, done: Math.abs(r - 1) > 0.4 },
        { id: 'stab', text: String.raw`Prends $\xi$ parallèle à $\nu$ : $u=\xi\times\nu=0$, les rotations qui fixent $\nu$ ne comptent pas.`, done: alpha < 0.03 || alpha > 3.11 },
      ]}
      readings={[
        { label: String.raw`$\|\nu\|$`, value: f2(Math.hypot(...nu), 4), status: 'exact' },
        { label: String.raw`$\omega_\nu(u,v)=\nu\cdot(\xi\times\eta)$`, value: f2(omega, 4), status: 'exact' },
        { label: String.raw`Aire orientée $/\,r$ $=\nu\cdot(u\times v)/r^2$`, value: `${f2(areaOverR, 4)} (aire ${f2(area, 4)})`, status: 'exact' },
      ]}
    />
  );
}
