/**
 * Planche 42 — Du groupe de Lie au générateur d'une symétrie.
 * Exemple vivant : SO(2) agit sur ℝ² par rotation. Groupe → action g·p → orbite ; algèbre
 * X = ωJ → champ générateur X_M(p) = ωJp → flot exp(tX)·p, avec X_M(p) = d/dt exp(tX)·p en 0.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arc, Arrow, C, Caption, Circle, DraggablePoint, f2, Plot, Slider } from '../kit2d';
import { rot } from '../math';

const BOXES = [
  ['Groupe', 'g ∈ SO(2)'],
  ['Action', 'g · p'],
  ['Orbite', 'G/Gₚ'],
  ['Algèbre', 'X = ωJ'],
  ['Champ générateur', 'X_M(p) = ωJp'],
  ['Flot', 'exp(tX) · p'],
];

export default function P42() {
  const [p, setP] = useState<[number, number]>([1.1, 0.3]);
  const [g, setG] = useState(1);
  const [w, setW] = useState(0.8);
  const [t, setT] = useState(1.2);
  const r = Math.hypot(...p);
  const gp = rot(g, p);
  const XM: [number, number] = [-w * p[1], w * p[0]];
  const flow = rot(w * t, p);
  const h = 1e-4;
  const fd = rot(w * h, p);
  const quotient: [number, number] = [(fd[0] - p[0]) / h, (fd[1] - p[1]) / h];
  const a0 = Math.atan2(p[1], p[0]);
  const diagram = (
    <svg viewBox="0 0 330 150" className="w-full" role="img" aria-label="Du groupe au flot">
      {BOXES.map(([title, sub], i) => {
        const x = 6 + (i % 3) * 110;
        const y = 8 + Math.floor(i / 3) * 74;
        const col = i < 3 ? '#4a86d0' : '#1a9e96';
        return (
          <g key={title}>
            <rect x={x} y={y} width={98} height={52} rx={6} fill={col} fillOpacity={0.12} stroke={col} />
            <text x={x + 49} y={y + 22} textAnchor="middle" fontSize={12} fill="var(--text)">{title}</text>
            <text x={x + 49} y={y + 40} textAnchor="middle" fontSize={10.5} fill="var(--text-2)" fontStyle="italic">{sub}</text>
            {i % 3 < 2 && <line x1={x + 99} y1={y + 26} x2={x + 109} y2={y + 26} stroke="var(--text-3)" strokeWidth={1.4} />}
          </g>
        );
      })}
      <line x1={55} y1={61} x2={55} y2={81} stroke="var(--text-3)" strokeWidth={1.4} />
    </svg>
  );
  const plane = (
    <div>
      <Plot xDomain={[-1.8, 1.8]} yDomain={[-1.8, 1.8]} width={300} height={300} grid={false} ariaLabel="Action de SO(2) sur le plan">
        <Circle c={[0, 0]} r={r} color={C.faint} width={1.4} />
        <Arrow a={[0, 0]} b={gp} color={C.blue} width={1.6} dash="4 3" />
        <Arc c={[0, 0]} r={r} a0={a0} a1={a0 + w * t} color={C.teal} width={3} arrow />
        <Arrow a={p} b={[p[0] + 0.6 * XM[0], p[1] + 0.6 * XM[1]]} color={C.orange} width={2.4} />
        <DraggablePoint x={p[0]} y={p[1]} onChange={(x, y) => setP([x, y])} name="Point p" color={C.ink} label="p" bounds={[-1.7, 1.7, -1.7, 1.7]} step={0.05} r={6} />
      </Plot>
      <Caption>{String.raw`Bleu : $g\cdot p$. Gris : l'orbite. Orange : $X_M(p)$. Vert : le flot $\exp(tX)\cdot p$.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={42}
      panels={[
        { title: 'Du groupe au générateur', render: () => diagram },
        { title: 'Exemple : rotations du plan', render: () => plane },
      ]}
      identity={String.raw`$X_M(p)=\dfrac{d}{dt}\exp(tX)\cdot p\Big|_{t=0}$ ; pour $SO(2)$ sur $\mathbb R^2$ : $X_M(p)=\omega Jp$.`}
      controls={
        <>
          <Slider label="Élément g du groupe (angle)" value={g} min={-3.14} max={3.14} step={0.01} onChange={setG} format={(x) => `${Math.round((x * 180) / Math.PI)}°`} />
          <Slider label="Générateur X = ωJ : ω" value={w} min={-2} max={2} step={0.01} onChange={setW} format={(x) => f2(x)} />
          <Slider label="Temps t du flot" value={t} min={0} max={6.28} step={0.01} onChange={setT} format={(x) => f2(x)} />
        </>
      }
      observations={[
        { id: 'orbite', text: String.raw`Fais varier $g$ : $g\cdot p$ reste sur l'orbite de $p$, le cercle de rayon $|p|$.`, done: Math.abs(g - 1) > 1 },
        { id: 'champ', text: String.raw`Le champ générateur en $p$ est tangent à l'orbite et proportionnel à $\omega$.`, done: Math.abs(w - 0.8) > 0.6 },
        { id: 'origine', text: String.raw`Amène $p$ à l'origine : orbite réduite à un point, champ nul.`, done: r < 0.05 },
      ]}
      readings={[
        { label: String.raw`$X_M(p)=\omega Jp$`, value: `(${f2(XM[0], 4)} ; ${f2(XM[1], 4)})`, status: 'exact' },
        { label: String.raw`Quotient $\frac{\exp(hX)\cdot p-p}{h}$, $h=10^{-4}$`, value: `(${f2(quotient[0], 4)} ; ${f2(quotient[1], 4)})`, status: 'numerique' },
        { label: String.raw`$|\exp(tX)\cdot p|-|p|$`, value: f2(Math.hypot(...flow) - r, 10), status: 'exact' },
      ]}
    />
  );
}
