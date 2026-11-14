/**
 * Scène « Rodrigues » : axe u, angle θ, vecteur v. Vue 3D (repli : projection sur le plan
 * orthogonal à u), matrice, vérifications d'orthogonalité, angle et axe relus.
 */
import { lazy, useMemo, useState } from 'react';
import { Button } from '@/components/ui';
import { MathViewStudio, type StudioView } from '@/components/math-visualizations/MathViewStudio';
import { Scene3DGate } from '@/components/math-visualizations/Scene3DGate';
import { AXIS_PRESETS, rodriguesScene } from '@/core/visual-reasoning/lie-exponential';
import { unit, vcross, vdot, type Vec } from '@/core/visual-reasoning/lie-core';
import { fmt, type SceneExplanations } from '@/core/visual-reasoning/types';
import { Curve, Dot, MathText, Panel, Plot, Segment, Slider } from '../../kit';
import { LIE_COLORS, readoutViews, RelatedPanel } from '../common';

const Rodrigues3D = lazy(() => import('../../visual-scenes/lie/Rodrigues3D'));

const EXPLANATIONS: SceneExplanations = {
  why: 'Une rotation se lit par son axe u et son angle θ : v décrit un cercle dans un plan orthogonal à u. La matrice affichée est obtenue par la formule de Rodrigues et recoupée par la série de l’exponentielle.',
  proofLink: 'La formule découle de û³ = −û (exercice difficile du résultat 41) ; l’identification [ω̂, η̂] = (ω × η)^ est l’exercice intermédiaire.',
  generalize: 'exp : so(3) → SO(3) est surjective ; elle n’est pas injective (θ et θ + 2π donnent la même rotation), ce que le revêtement SU(2) → SO(3) rend précis.',
};

const VECTORS: { id: string; label: string; v: Vec }[] = [
  { id: 'e1', label: 'v = e₁', v: [1, 0, 0] },
  { id: 'e2', label: 'v = e₂', v: [0, 1, 0] },
  { id: 'mix', label: 'v = (1, 0, 1)', v: [1, 0, 1] },
];

export function RodriguesScene() {
  const [axisId, setAxisId] = useState('diag');
  const [theta, setTheta] = useState((2 * Math.PI) / 3);
  const [vId, setVId] = useState('e1');
  const u = AXIS_PRESETS.find((a) => a.id === axisId)!.u;
  const v = VECTORS.find((x) => x.id === vId)!.v;
  const data = useMemo(() => rodriguesScene({ u, theta, v }), [u, theta, v]);

  // Projection sur le plan orthogonal à u, base orthonormée (e, f).
  const plane = useMemo(() => {
    const n = unit(u);
    const e = unit(Math.abs(n[2]!) < 0.9 ? vcross(n, [0, 0, 1]) : vcross(n, [1, 0, 0]));
    const f = vcross(n, e);
    return (x: Vec): [number, number] => [vdot(x, e), vdot(x, f)];
  }, [u]);
  const fallback = (
    <div>
      <Plot xDomain={[-1.6, 1.6]} yDomain={[-1.6, 1.6]} width={460} height={460} ariaLabel="Projection sur le plan orthogonal à l’axe">
        <Curve points={data.circle.map(plane)} color="var(--text-3)" width={1.2} />
        <Curve points={data.arc.map(plane)} color={LIE_COLORS.Y} width={2.6} />
        <Segment a={[0, 0]} b={plane(v)} color={LIE_COLORS.X} width={2} arrow />
        <Segment a={[0, 0]} b={plane(data.image)} color={LIE_COLORS.Y} width={2} arrow />
        <Dot x={plane(v)[0]} y={plane(v)[1]} r={0} color={LIE_COLORS.X} label="v" />
        <Dot x={plane(data.image)[0]} y={plane(data.image)[1]} r={0} color={LIE_COLORS.Y} label="Rv" />
      </Plot>
      <p className="mt-1 text-[12px] text-text-3">Vue de repli : projection orthogonale sur le plan u⊥ (l’axe pointe vers le lecteur).</p>
    </div>
  );

  const views: StudioView[] = [
    {
      id: 'espace',
      title: 'Rotation dans l’espace',
      render: () => (
        <Scene3DGate fallback={fallback}>
          <Rodrigues3D axis={data.axis} v={v} image={data.image} circle={data.circle} arc={data.arc} frame={data.frame} />
        </Scene3DGate>
      ),
    },
    { id: 'plan', title: 'Plan orthogonal à l’axe', render: () => fallback },
    ...readoutViews(data.readout),
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0">
        <MathViewStudio id="lie-rodrigues" views={views} initial={['espace', 'equations']} explanations={EXPLANATIONS} weights={{ espace: 1.5, equations: 1.1 }} />
      </div>
      <div className="space-y-4">
        <Panel title="Axe u">
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Axes">
            {AXIS_PRESETS.map((a) => (
              <Button key={a.id} variant={axisId === a.id ? 'primary' : 'outline'} aria-pressed={axisId === a.id} onClick={() => setAxisId(a.id)} data-axis={a.id} className="text-[13px]">
                <MathText text={a.label} />
              </Button>
            ))}
          </div>
        </Panel>
        <Panel title="Angle et vecteur">
          <Slider label="θ (degrés)" value={(theta * 180) / Math.PI} min={-360} max={360} step={1} onChange={(d) => setTheta((d * Math.PI) / 180)} format={(d) => `${fmt(d, 0)}°`} />
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Button variant="outline" className="text-[12.5px]" onClick={() => setTheta(Math.PI / 2)}>90°</Button>
            <Button variant="outline" className="text-[12.5px]" onClick={() => setTheta((2 * Math.PI) / 3)}>120°</Button>
            <Button variant="outline" className="text-[12.5px]" onClick={() => setTheta(Math.PI)}>180°</Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Vecteur v">
            {VECTORS.map((x) => (
              <Button key={x.id} variant={vId === x.id ? 'primary' : 'outline'} aria-pressed={vId === x.id} onClick={() => setVId(x.id)} className="text-[12.5px]">
                {x.label}
              </Button>
            ))}
          </div>
        </Panel>
        <RelatedPanel theorems={['rodrigues', 'exponentielle']} plates={[35]} />
      </div>
    </div>
  );
}
