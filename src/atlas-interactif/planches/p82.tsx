/**
 * Planche 82 — Irréductibilité, moyenne de Haar et lemme de Schur.
 * À gauche : le groupe cyclique C_n agit sur ℝ³ par ρ(g) = P R(2πk/n) P⁻¹, avec P un
 * cisaillement de paramètre s. Le plan W = {z = 0} est stable ; la normale e₃ du produit
 * initial ne l'est pas dès que s ≠ 0, mais la droite engendrée par (s, 0, 1), orthogonale à W
 * pour le produit moyen, est fixe. À droite : moyenner les produits scalaires transformés
 * ⟨ρ(g)v, ρ(g)w⟩₀ sur C_n agissant par rotations donne un produit invariant (un cercle si n ≥ 3).
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, Curve, f2, Plot, Slider } from '../kit2d';
import { Arrow3, Patch3, Scene3D, Segment3 } from '../kit3d';
import { linspace, TAU } from '../math';

type M2 = [number, number, number];

/** Forme quadratique 2×2 symétrique [a, b, d] ↔ [[a, b], [b, d]]. */
function rotForm([a, b, d]: M2, t: number): M2 {
  // Rᵀ Q R avec R la rotation d'angle t.
  const c = Math.cos(t);
  const s = Math.sin(t);
  const a2 = c * c * a + 2 * c * s * b + s * s * d;
  const d2 = s * s * a - 2 * c * s * b + c * c * d;
  const b2 = -c * s * a + (c * c - s * s) * b + c * s * d;
  return [a2, b2, d2];
}

/** Ellipse {v : vᵀQv = 1}, tracée à partir des valeurs et vecteurs propres de Q. */
function ellipse([a, b, d]: M2): [number, number][] {
  const tr = a + d;
  const disc = Math.sqrt(((a - d) / 2) ** 2 + b * b);
  const l1 = tr / 2 + disc;
  const l2 = tr / 2 - disc;
  const phi = 0.5 * Math.atan2(2 * b, a - d);
  return linspace(0, TAU, 120).map((t) => {
    const x = Math.cos(t) / Math.sqrt(l1);
    const y = Math.sin(t) / Math.sqrt(l2);
    return [Math.cos(phi) * x - Math.sin(phi) * y, Math.sin(phi) * x + Math.cos(phi) * y];
  });
}

export default function P82() {
  const [n, setN] = useState(4);
  const [k, setK] = useState(1);
  const [sh, setSh] = useState(0);
  const [e, setE] = useState(1.7);
  const [beta, setBeta] = useState(0.4);
  const kk = Math.min(k, n - 1);
  const th = (TAU * kk) / n;
  const ct = Math.cos(th);
  const st = Math.sin(th);
  // ρ(g) = P R P⁻¹ : sur W (z = 0) c'est la rotation R ; e₃ ↦ (s − s cos θ, −s sin θ, 1).
  const w: [number, number, number] = [0.95, 0.35, 0];
  const gw: [number, number, number] = [ct * w[0] - st * w[1], st * w[0] + ct * w[1], 0];
  const e3: [number, number, number] = [0, 0, 1];
  const ge3: [number, number, number] = [sh - sh * ct, -sh * st, 1];
  const nG: [number, number, number] = [sh, 0, 1];
  const tilt = (Math.acos(1 / Math.hypot(...ge3)) * 180) / Math.PI;
  const plane = (
    <Scene3D label="Un sous-espace reste dans lui-même" camera={[2.6, -3.2, 2]} height={300} labels={[
      { id: 'W', p: [1.25, -1.1, 0], text: 'W', color: '#4a86d0' },
      { id: 'Wp', p: [sh * 1.15, 0, 1.3], text: 'W⊥ (produit moyen)', color: '#8a6fd6' },
    ]}>
      <Patch3 c={[0, 0, 0]} a={[1, 0, 0]} b={[0, 1, 0]} s={1.2} color="#4a86d0" opacity={0.18} />
      <Arrow3 a={[0, 0, 0]} b={w} color="#d8743a" />
      <Arrow3 a={[0, 0, 0]} b={gw} color="#e3b341" />
      <Segment3 a={[0, 0, -0.2]} b={[0, 0, 1.3]} color="#7c8696" dashed width={1} />
      <Arrow3 a={[0, 0, 0]} b={e3} color="#9aa5b4" />
      <Arrow3 a={[0, 0, 0]} b={ge3} color="#d55181" />
      <Arrow3 a={[0, 0, 0]} b={nG} color="#8a6fd6" />
    </Scene3D>
  );
  const Q0 = rotForm([1 / (e * e), 0, 1], -beta);
  const forms = Array.from({ length: n }, (_, j) => rotForm(Q0, (TAU * j) / n));
  const avg: M2 = [0, 1, 2].map((i) => forms.reduce((s, f) => s + f[i]!, 0) / n) as M2;
  const disc = Math.sqrt(((avg[0] - avg[2]) / 2) ** 2 + avg[1] ** 2);
  const aniso = Math.sqrt((avg[0] + avg[2] + 2 * disc) / (avg[0] + avg[2] - 2 * disc));
  const average = (
    <div>
      <Plot xDomain={[-2.2, 2.2]} yDomain={[-2.2, 2.2]} width={300} height={300} grid={false} ariaLabel="Moyenner les normes transformées">
        {forms.map((f, j) => (
          <Curve key={j} points={ellipse(f)} color={C.blue} width={1} />
        ))}
        <Curve points={ellipse(avg)} color={C.teal} width={3} />
      </Plot>
      <Caption>{String.raw`Bleu : boules unité des produits $\langle\rho(g)v,\rho(g)v\rangle_0$, $g\in C_n$. Vert : celle du produit moyen.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={82}
      panels={[
        { title: 'Un sous-espace reste dans lui-même', render: () => plane },
        { title: 'Moyenner les normes transformées', render: () => average },
      ]}
      identity={String.raw`$\langle v,w\rangle_G=\displaystyle\int_G\langle\rho(g)v,\rho(g)w\rangle_0\,dg$ ; ici $G=C_n$ et $\int_G\cdot\,dg=\frac1n\sum_{k=0}^{n-1}$.`}
      controls={
        <>
          <Slider label="Ordre n du groupe" value={n} min={2} max={8} step={1} onChange={setN} format={(v) => String(v)} />
          <Slider label="Élément g = rotation d’angle 2πk/n" value={kk} min={0} max={7} step={1} onChange={setK} format={(v) => `k = ${Math.min(v, n - 1)}`} />
          <Slider label="Cisaillement s du produit initial" value={sh} min={0} max={1} step={0.01} onChange={setSh} format={(v) => f2(v)} />
          <Slider label="Allongement de l’ellipse initiale" value={e} min={1} max={2.2} step={0.01} onChange={setE} format={(v) => f2(v)} />
          <Slider label="Orientation de l’ellipse initiale" value={beta} min={0} max={3.14} step={0.01} onChange={setBeta} format={(v) => `${Math.round((v * 180) / Math.PI)}°`} />
        </>
      }
      observations={[
        { id: 'stable', text: String.raw`Change $g$ : l'image $\rho(g)w$ (doré) reste dans le plan $W$.`, done: kk !== 1 },
        { id: 'naif', text: String.raw`Augmente $s$ : la normale $e_3$ du produit initial n'est plus stable, son image (rose) quitte la droite pointillée ; la normale violette, elle, ne bouge pas.`, done: sh > 0.3 && kk !== 0 && tilt > 10 },
        { id: 'moyenne', text: 'Allonge l’ellipse initiale : avec n ≥ 3, la moyenne des ellipses transformées reste un cercle, le produit moyen est invariant.', done: n >= 3 && e > 2 },
        { id: 'deux', text: 'Avec n = 2, la moyenne ne change rien : −I préserve toute ellipse, et chaque droite est stable.', done: n === 2 },
      ]}
      readings={[
        { label: String.raw`Écart angulaire entre $\rho(g)e_3$ et $e_3$`, value: `${f2(tilt, 1)}°`, status: 'exact' },
        { label: String.raw`Écart angulaire pour la normale du produit moyen`, value: '0°', status: 'exact' },
        { label: 'Anisotropie de la moyenne (rapport des axes)', value: f2(aniso, 4), status: 'exact' },
      ]}
      note="À gauche, W⊥ pour le produit moyen est la droite engendrée par (s, 0, 1) : ρ(g) la fixe pour tout g."
    />
  );
}
