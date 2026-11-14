/**
 * Planche 75 — Produit L², adjoint et formes harmoniques.
 * Sur S¹, α = f dθ avec f = a + b cos θ + c sin 2θ. dα = 0 (degré maximal), δα = −f′, et
 * ⟨Δ_Hα, α⟩ = ‖dα‖² + ‖δα‖² = ∫f′² = π(b² + 4c²) : α est harmonique ssi f est constante.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, ClippedCurve, f2, Plot, Slider } from '../kit2d';
import { linspace, simpson, TAU } from '../math';

export default function P75() {
  const [a, setA] = useState(0.4);
  const [b, setB] = useState(0.6);
  const [c, setC] = useState(0.2);
  const f = (t: number) => a + b * Math.cos(t) + c * Math.sin(2 * t);
  const fp = (t: number) => -b * Math.sin(t) + 2 * c * Math.cos(2 * t);
  const fpp = (t: number) => -b * Math.cos(t) - 4 * c * Math.sin(2 * t);
  const ts = linspace(0, TAU, 240);
  const D: [number, number, number, number] = [0, TAU, -2, 2];
  const plot = (
    <div>
      <Plot xDomain={[0, TAU]} yDomain={[-2, 2]} width={320} height={260} ariaLabel="Forme et codifférentielle sur le cercle">
        <ClippedCurve points={ts.map((t) => [t, f(t)])} domain={D} color={C.teal} width={2.4} />
        <ClippedCurve points={ts.map((t) => [t, -fp(t)])} domain={D} color={C.orange} width={2} dash="6 4" />
      </Plot>
      <Caption>{String.raw`Vert : $f$, avec $\alpha=f\,d\theta$. Orange : $\delta\alpha=-f'$.`}</Caption>
    </div>
  );
  const norm2 = simpson((t) => fp(t) ** 2, 0, TAU, 400);
  const lap = simpson((t) => -fpp(t) * f(t), 0, TAU, 400);
  const bars = (
    <div>
      <svg viewBox="0 0 300 230" className="w-full" role="img" aria-label="Deux contributions positives">
        <line x1={20} x2={290} y1={200} y2={200} stroke="var(--line-strong)" />
        {[
          ['‖dα‖²', 0, '#1a9e96'],
          ['‖δα‖²', norm2, '#d8743a'],
          ['⟨Δα, α⟩', lap, '#8a6fd6'],
        ].map(([lab, v, col], i) => {
          // Échelle fixe : la plus grande valeur possible ici est 5π ≈ 15,7.
          const h = Math.max(0, (Number(v) / 16) * 175);
          return (
            <g key={String(lab)}>
              <rect x={30 + i * 90} y={200 - h} width={60} height={h} fill={String(col)} fillOpacity={0.5} stroke={String(col)} />
              <text x={60 + i * 90} y={220} textAnchor="middle" fontSize={12} fill="var(--text)">{String(lab)}</text>
              <text x={60 + i * 90} y={194 - h} textAnchor="middle" fontSize={11} fill="var(--text-2)">{f2(Number(v), 3)}</text>
            </g>
          );
        })}
      </svg>
      <Caption>{String.raw`Les deux termes positifs s'ajoutent : $\langle\Delta_H\alpha,\alpha\rangle=\|d\alpha\|^2+\|\delta\alpha\|^2$.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={75}
      panels={[
        { title: 'Forme et codifférentielle sur S¹', render: () => plot },
        { title: 'Deux contributions positives', render: () => bars },
      ]}
      identity={String.raw`$\langle\Delta_H\alpha,\alpha\rangle_{L^2}=\|d\alpha\|^2_{L^2}+\|\delta\alpha\|^2_{L^2}$ ; ici $\|\delta\alpha\|^2=\pi(b^2+4c^2)$.`}
      controls={
        <>
          <Slider label="a (constante)" value={a} min={-1} max={1} step={0.01} onChange={setA} format={(v) => f2(v)} />
          <Slider label="b (cos θ)" value={b} min={-1} max={1} step={0.01} onChange={setB} format={(v) => f2(v)} />
          <Slider label="c (sin 2θ)" value={c} min={-1} max={1} step={0.01} onChange={setC} format={(v) => f2(v)} />
        </>
      }
      observations={[
        { id: 'harmonique', text: String.raw`Annule $b$ et $c$ : $\delta\alpha=0$, la forme $a\,d\theta$ est harmonique.`, done: Math.abs(b) < 0.01 && Math.abs(c) < 0.01 },
        { id: 'mode2', text: String.raw`Le mode $\sin2\theta$ pèse quatre fois plus que $\cos\theta$ : $\|\delta\alpha\|^2=\pi(b^2+4c^2)$.`, done: Math.abs(c) > 0.7 },
        { id: 'constante', text: String.raw`La constante $a$ ne change pas $\langle\Delta\alpha,\alpha\rangle$.`, done: Math.abs(a - 0.4) > 0.5 },
      ]}
      readings={[
        { label: String.raw`$\|\delta\alpha\|^2$ (intégrale)`, value: f2(norm2, 5), status: 'numerique' },
        { label: String.raw`$\pi(b^2+4c^2)$`, value: f2(Math.PI * (b * b + 4 * c * c), 5), status: 'exact' },
        { label: String.raw`$\langle\Delta_H\alpha,\alpha\rangle$`, value: f2(lap, 5), status: 'numerique' },
      ]}
    />
  );
}
