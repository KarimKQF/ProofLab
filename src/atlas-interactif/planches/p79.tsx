/**
 * Planche 79 — Fibré de Hopf et choix de phase.
 * Un point de S² (colatitude θ, longitude φ) correspond à la droite complexe de
 * (cos θ/2, e^{iφ} sin θ/2) ; sa fibre {e^{iψ}(z₁, z₂)} est un cercle de S³, vu dans ℝ³ par
 * projection stéréographique depuis (0, 0, 0, 1). Deux fibres distinctes sont enlacées :
 * nombre d'enlacement ±1 (intégrale de Gauss).
 */
import { useMemo, useState } from 'react';
import { PlateScene } from '../PlateScene';
import { f2, Slider } from '../kit2d';
import { Globe, Point3, Polyline3, Scene3D } from '../kit3d';
import { sph, TAU } from '../math';

const FAR = 9;

function fiber(theta: number, phi: number, n = 240): number[][] {
  const out: number[][] = [];
  for (let k = 0; k <= n; k++) {
    const psi = (TAU * k) / n;
    const a = Math.cos(theta / 2) * Math.cos(psi);
    const b = Math.cos(theta / 2) * Math.sin(psi);
    const c = Math.sin(theta / 2) * Math.cos(psi + phi);
    const d = Math.sin(theta / 2) * Math.sin(psi + phi);
    const den = Math.max(1e-6, 1 - d);
    out.push([a / den, b / den, c / den]);
  }
  return out;
}

/** Morceaux consécutifs restant dans la boule de rayon R (pas de corde à travers la figure). */
function runs(points: number[][], R: number): number[][][] {
  const out: number[][][] = [];
  let cur: number[][] = [];
  for (const p of points) {
    if (Math.hypot(p[0]!, p[1]!, p[2]!) < R) cur.push(p);
    else if (cur.length) {
      out.push(cur);
      cur = [];
    }
  }
  if (cur.length) out.push(cur);
  return out.filter((r) => r.length > 1);
}

/** Intégrale de Gauss par la règle du point milieu sur deux polygones de 120 côtés. */
function linking(A: number[][], B: number[][], step = 2): number {
  let s = 0;
  for (let i = 0; i + step < A.length; i += step) {
    const a0 = A[i]!;
    const a1 = A[i + step]!;
    const p = [0, 1, 2].map((k) => (a0[k]! + a1[k]!) / 2);
    const dp = [0, 1, 2].map((k) => a1[k]! - a0[k]!);
    for (let j = 0; j + step < B.length; j += step) {
      const b0 = B[j]!;
      const b1 = B[j + step]!;
      const q = [0, 1, 2].map((k) => (b0[k]! + b1[k]!) / 2);
      const dq = [0, 1, 2].map((k) => b1[k]! - b0[k]!);
      const r = [p[0]! - q[0]!, p[1]! - q[1]!, p[2]! - q[2]!];
      const l = Math.hypot(r[0]!, r[1]!, r[2]!);
      const cr = [dp[1]! * dq[2]! - dp[2]! * dq[1]!, dp[2]! * dq[0]! - dp[0]! * dq[2]!, dp[0]! * dq[1]! - dp[1]! * dq[0]!];
      s += (r[0]! * cr[0]! + r[1]! * cr[1]! + r[2]! * cr[2]!) / l ** 3;
    }
  }
  return s / (4 * Math.PI);
}

export default function P79() {
  const [t1, setT1] = useState(1.5);
  const [p1, setP1] = useState(3.4);
  const [t2, setT2] = useState(1.8);
  const [p2, setP2] = useState(4.6);
  const F1 = useMemo(() => fiber(t1, p1), [t1, p1]);
  const F2 = useMemo(() => fiber(t2, p2), [t2, p2]);
  const lk = useMemo(() => linking(F1, F2), [F1, F2]);
  const tooFar = [...F1, ...F2].some((p) => Math.hypot(p[0]!, p[1]!, p[2]!) > FAR);
  const fibers = (
    <Scene3D label="Deux fibres de Hopf dans ℝ³" camera={[4.2, -4.6, 3]} height={320}>
      {runs(F1, FAR).map((r, i) => (
        <Polyline3 key={`a${i}`} points={r} color="#d8743a" width={2.2} />
      ))}
      {runs(F2, FAR).map((r, i) => (
        <Polyline3 key={`b${i}`} points={r} color="#1a9e96" width={2.2} />
      ))}
    </Scene3D>
  );
  const sphere = (
    <Scene3D label="Leurs deux points sur S²" camera={[2.6, -2.6, 1.8]} height={320}>
      <Globe />
      <Point3 p={sph(t1, p1)} color="#d8743a" size={0.08} />
      <Point3 p={sph(t2, p2)} color="#1a9e96" size={0.08} />
    </Scene3D>
  );
  return (
    <PlateScene
      n={79}
      panels={[
        { title: 'Deux fibres après projection de S³', render: () => fibers },
        { title: 'Leurs deux points sur S²', render: () => sphere },
      ]}
      identity={String.raw`$(z_1,z_2)\sim(e^{i\varphi}z_1,e^{i\varphi}z_2)$, $\quad|z_1|^2+|z_2|^2=1$, $\quad S^3/S^1\simeq\mathbb CP^1\simeq S^2$.`}
      controls={
        <>
          <Slider label="Point orange : colatitude" value={t1} min={0.05} max={3.09} step={0.01} onChange={setT1} format={(v) => `${Math.round((v * 180) / Math.PI)}°`} />
          <Slider label="Point orange : longitude" value={p1} min={0} max={6.28} step={0.01} onChange={setP1} format={(v) => `${Math.round((v * 180) / Math.PI)}°`} />
          <Slider label="Point vert : colatitude" value={t2} min={0.05} max={3.09} step={0.01} onChange={setT2} format={(v) => `${Math.round((v * 180) / Math.PI)}°`} />
          <Slider label="Point vert : longitude" value={p2} min={0} max={6.28} step={0.01} onChange={setP2} format={(v) => `${Math.round((v * 180) / Math.PI)}°`} />
        </>
      }
      observations={[
        { id: 'enlace', text: 'Déplace les points : tant qu’ils sont distincts, les deux cercles restent enlacés une fois — on ne peut pas les séparer.', done: Math.abs(Math.abs(lk) - 1) < 0.1 && (Math.abs(t1 - 1.5) > 0.3 || Math.abs(t2 - 1.8) > 0.3) },
        { id: 'phase', text: 'Changer la longitude d’un point fait tourner sa fibre autour de l’axe : un autre choix de phase commune.', done: Math.abs(p1 - 3.4) > 1 || Math.abs(p2 - 4.6) > 1 },
        { id: 'pole', text: 'Approche un point du pôle sud de S² : sa fibre grandit et tend vers l’axe vertical, qui passe par le point à l’infini.', done: tooFar },
      ]}
      readings={[{ label: 'Nombre d’enlacement (intégrale de Gauss)', value: f2(lk, 3), status: 'numerique' }]}
      note={`Intégrale de Gauss par la règle du point milieu sur deux polygones de 120 côtés : la valeur entière ±1 apparaît à quelques millièmes près, moins bien quand les deux points sont très proches ou qu’une fibre part au loin. Les morceaux de fibre au-delà du rayon ${FAR} ne sont pas tracés.`}
    />
  );
}
