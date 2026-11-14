/**
 * Planche 68 — Équivariance des architectures.
 * Diagramme : x → F(x) → g·F(x) et x → g·x → F(g·x). Pour une application équivariante
 * (F(x) = (1 + ½|x|) x, point par point), les deux trajets donnent la même sortie ; pour
 * F(x) = (1,3x₁ + 0,2, 0,7x₂) ils diffèrent.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, Choice, f2, Plot, Poly, Slider } from '../kit2d';
import { rot } from '../math';

type P = [number, number];
const X: P[] = [[0.9, 0.2], [0.4, 0.9], [0.2, 0.1]];
const FEQ = (p: P): P => {
  const k = 1 + 0.5 * Math.hypot(...p);
  return [k * p[0], k * p[1]];
};
const FNON = ([a, b]: P): P => [1.3 * a + 0.2, 0.7 * b];

export default function P68() {
  const [g, setG] = useState(1.2);
  const [which, setWhich] = useState<'eq' | 'non'>('eq');
  const F = which === 'eq' ? FEQ : FNON;
  const Fx = X.map(F);
  const gFx = Fx.map((p) => rot(g, p));
  const Fgx = X.map((p) => F(rot(g, p)));
  const gap = Math.max(...gFx.map((p, i) => Math.hypot(p[0] - Fgx[i]![0], p[1] - Fgx[i]![1])));
  const diagram = (
    <svg viewBox="0 0 320 180" className="w-full" role="img" aria-label="Deux trajets du diagramme">
      {[
        [10, 20, 'x'],
        [200, 20, 'F(x)'],
        [10, 120, 'g · x'],
        [200, 120, which === 'eq' ? 'F(g·x) = g·F(x)' : 'F(g·x) ≠ g·F(x)'],
      ].map(([x, y, t]) => (
        <g key={String(t)}>
          <rect x={Number(x)} y={Number(y)} width={110} height={40} rx={6} fill="#4a86d0" fillOpacity={0.12} stroke="#4a86d0" />
          <text x={Number(x) + 55} y={Number(y) + 25} textAnchor="middle" fontSize={12} fill="var(--text)" fontStyle="italic">{String(t)}</text>
        </g>
      ))}
      <line x1={122} y1={40} x2={196} y2={40} stroke="var(--text-3)" strokeWidth={1.4} />
      <line x1={122} y1={140} x2={196} y2={140} stroke="var(--text-3)" strokeWidth={1.4} />
      <line x1={65} y1={62} x2={65} y2={116} stroke="var(--text-3)" strokeWidth={1.4} />
      <line x1={255} y1={62} x2={255} y2={116} stroke="var(--text-3)" strokeWidth={1.4} />
      <text x={159} y={34} textAnchor="middle" fontSize={11} fill="var(--text-3)">prédire</text>
      <text x={159} y={134} textAnchor="middle" fontSize={11} fill="var(--text-3)">prédire</text>
      <text x={60} y={92} textAnchor="end" fontSize={11} fill="var(--text-3)">transformer</text>
    </svg>
  );
  const fig = (
    <div>
      <Plot xDomain={[-2, 2.4]} yDomain={[-2, 2.4]} width={300} height={300} ariaLabel="Sorties des deux trajets">
        <Poly points={X} fill={C.teal} opacity={0.3} stroke={C.teal} />
        <Poly points={Fx} stroke={C.orange} width={1.4} dash="4 3" />
        <Poly points={gFx} fill={C.violet} opacity={0.25} stroke={C.violet} width={2} />
        <Poly points={Fgx} stroke={C.red} width={2} dash="6 3" />
      </Plot>
      <Caption>{String.raw`Vert : $x$. Orange : $F(x)$. Violet : $g\cdot F(x)$. Rose pointillé : $F(g\cdot x)$.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={68}
      panels={[
        { title: 'Les deux trajets du diagramme', render: () => diagram },
        { title: 'Sorties comparées', render: () => fig },
      ]}
      identity={String.raw`$F_\theta(\rho_{\mathrm{in}}(g)\,x)=\rho_{\mathrm{out}}(g)\,F_\theta(x)$ pour tout $g$.`}
      controls={
        <>
          <Choice
            name="Modèle F"
            value={which}
            onChange={setWhich}
            options={[
              { id: 'eq', label: String.raw`$F(x)=(1+\tfrac12|x|)\,x$` },
              { id: 'non', label: String.raw`$F(x)=(1{,}3x_1+0{,}2,\ 0{,}7x_2)$` },
            ]}
          />
          <Slider label="Rotation g (angle)" value={g} min={-3.14} max={3.14} step={0.01} onChange={setG} format={(v) => `${Math.round((v * 180) / Math.PI)}°`} />
        </>
      }
      observations={[
        { id: 'eq', text: 'Avec le modèle équivariant, les deux trajets donnent la même sortie pour toute rotation.', done: which === 'eq' && Math.abs(g - 1.2) > 1 },
        { id: 'non', text: 'Avec l’autre modèle, les sorties se séparent : l’équivariance n’est pas garantie.', done: which === 'non' && gap > 0.2 },
        { id: 'identite', text: 'Pour g = identité, les deux trajets coïncident toujours.', done: Math.abs(g) < 0.01 },
      ]}
      readings={[{ label: String.raw`$\max|g\cdot F(x)-F(g\cdot x)|$`, value: f2(gap, 6), status: 'exact' }]}
    />
  );
}
