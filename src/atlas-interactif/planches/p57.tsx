/**
 * Planche 57 — Étoile de Hodge, codifférentielle et laplacien de Hodge.
 * Dans le plan orienté : ⋆dx = dy, ⋆dy = −dx ; α = a dx + b dy, ⋆α = −b dx + a dy et
 * α ∧ ⋆α = (a² + b²) dx∧dy. Sur le cercle : ⟨df, g dθ⟩ = ⟨f, δ(g dθ)⟩ avec δ(g dθ) = −g′.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, DraggablePoint, f2, Plot, Poly, Slider } from '../kit2d';
import { simpson } from '../math';

export default function P57() {
  const [al, setAl] = useState<[number, number]>([1, 0.4]);
  const [a, setA] = useState(0.6);
  const [b, setB] = useState(0.5);
  const star: [number, number] = [-al[1], al[0]];
  const wedge = al[0] * star[1] - al[1] * star[0];
  const plane = (
    <div>
      <Plot xDomain={[-1.6, 1.6]} yDomain={[-1.6, 1.6]} width={300} height={300} ariaLabel="Étoile de Hodge dans le plan">
        <Poly points={[[0, 0], al, [al[0] + star[0], al[1] + star[1]], star]} fill={C.violet} opacity={0.15} stroke={C.violet} width={1} />
        <Arrow a={[0, 0]} b={al} color={C.teal} width={2.6} />
        <Arrow a={[0, 0]} b={star} color={C.orange} width={2.6} />
        <DraggablePoint x={al[0]} y={al[1]} onChange={(x, y) => setAl([x, y])} name="Forme α = a dx + b dy" color={C.teal} label="α" bounds={[-1.5, 1.5, -1.5, 1.5]} step={0.05} r={6} />
      </Plot>
      <Caption>{String.raw`Vert : $\alpha$. Orange : $\star\alpha$, tourné d'un quart de tour. Violet : l'aire $\alpha\wedge\star\alpha$.`}</Caption>
    </div>
  );
  // Sur le cercle : f = cos θ + a sin 2θ, g = sin θ + b cos 3θ.
  const f = (t: number) => Math.cos(t) + a * Math.sin(2 * t);
  const fp = (t: number) => -Math.sin(t) + 2 * a * Math.cos(2 * t);
  const g = (t: number) => Math.sin(t) + b * Math.cos(3 * t);
  const gp = (t: number) => Math.cos(t) - 3 * b * Math.sin(3 * t);
  const lhs = simpson((t) => fp(t) * g(t), 0, 2 * Math.PI, 400);
  const rhs = simpson((t) => f(t) * -gp(t), 0, 2 * Math.PI, 400);
  const adj = (
    <div>
      <svg viewBox="0 0 300 160" className="w-full" role="img" aria-label="d et sa codifférentielle">
        <rect x={20} y={50} width={90} height={44} rx={6} fill="#1a9e96" fillOpacity={0.12} stroke="#1a9e96" />
        <text x={65} y={77} textAnchor="middle" fontSize={15} fill="var(--text)">Ωᵏ</text>
        <rect x={190} y={50} width={90} height={44} rx={6} fill="#d8743a" fillOpacity={0.12} stroke="#d8743a" />
        <text x={235} y={77} textAnchor="middle" fontSize={15} fill="var(--text)">Ωᵏ⁺¹</text>
        <line x1={112} y1={64} x2={186} y2={64} stroke="var(--text-3)" strokeWidth={1.6} markerEnd="url(#f57)" />
        <text x={149} y={56} textAnchor="middle" fontSize={13} fill="var(--text-2)" fontStyle="italic">d</text>
        <path d="M 188 102 Q 150 140 112 102" fill="none" stroke="#8a6fd6" strokeWidth={1.6} markerEnd="url(#f57)" />
        <text x={150} y={150} textAnchor="middle" fontSize={13} fill="#8a6fd6" fontStyle="italic">δ = d*</text>
        <defs>
          <marker id="f57" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="var(--text-3)" />
          </marker>
        </defs>
      </svg>
      <Caption>{String.raw`Sur le cercle, $\langle df,\,g\,d\theta\rangle=\langle f,\,\delta(g\,d\theta)\rangle$ avec $\delta(g\,d\theta)=-g'$.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={57}
      panels={[
        { title: 'Étoile de Hodge dans le plan orienté', render: () => plane },
        { title: 'Deux opérateurs adjoints', render: () => adj },
      ]}
      identity={String.raw`$\alpha\wedge\star\beta=\langle\alpha,\beta\rangle_g\,\mathrm{vol}_g$, $\quad\Delta_H=d\delta+\delta d$ ; dans le plan : $\star dx=dy$, $\star dy=-dx$.`}
      controls={
        <>
          <Slider label="f = cos θ + a sin 2θ : a" value={a} min={-1} max={1} step={0.01} onChange={setA} format={(v) => f2(v)} />
          <Slider label="g = sin θ + b cos 3θ : b" value={b} min={-1} max={1} step={0.01} onChange={setB} format={(v) => f2(v)} />
        </>
      }
      observations={[
        { id: 'quart', text: String.raw`Déplace $\alpha$ : $\star\alpha$ reste à angle droit, de même norme ; l'aire violette vaut $\|\alpha\|^2$.`, done: Math.abs(al[0] - 1) > 0.5 || Math.abs(al[1] - 0.4) > 0.5 },
        { id: 'adjoint', text: String.raw`Change $f$ et $g$ : les deux produits scalaires restent égaux, $\delta$ est l'adjoint de $d$.`, done: Math.abs(a - 0.6) > 0.4 || Math.abs(b - 0.5) > 0.4 },
        { id: 'nul', text: String.raw`Amène $\alpha$ à $0$ : l'aire $\alpha\wedge\star\alpha$ s'annule, et seulement alors.`, done: Math.hypot(...al) < 0.05 },
      ]}
      readings={[
        { label: String.raw`$\alpha\wedge\star\alpha$ (coefficient de $dx\wedge dy$)`, value: f2(wedge, 4), status: 'exact' },
        { label: String.raw`$\|\alpha\|^2=a^2+b^2$`, value: f2(al[0] ** 2 + al[1] ** 2, 4), status: 'exact' },
        { label: String.raw`$\langle df,g\,d\theta\rangle$ et $\langle f,-g'\rangle$`, value: `${f2(lhs, 6)} ; ${f2(rhs, 6)}`, status: 'numerique' },
      ]}
    />
  );
}
