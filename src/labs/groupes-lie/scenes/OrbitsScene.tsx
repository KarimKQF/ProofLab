/**
 * Scène « Orbites et stabilisateurs » : trois actions (SO(3) sur S², GL(2) par conjugaison,
 * ℝ sur le tore). Les dimensions sont calculées par le rang de l'action infinitésimale.
 */
import { lazy, useMemo, useState } from 'react';
import { Button } from '@/components/ui';
import { MathViewStudio, type StudioView } from '@/components/math-visualizations/MathViewStudio';
import { Scene3DGate } from '@/components/math-visualizations/Scene3DGate';
import { conjugationScene, sphereScene, SLOPES, TORUS_TARGET, torusScene } from '@/core/visual-reasoning/lie-orbits';
import { fmt, type SceneExplanations } from '@/core/visual-reasoning/types';
import { Curve, Dot, MathText, Panel, Plot, Segment, Slider } from '../../kit';
import { LIE_COLORS, readoutViews, RelatedPanel } from '../common';

const SphereOrbit3D = lazy(() => import('../../visual-scenes/lie/Orbits3D').then((m) => ({ default: m.SphereOrbit3D })));
const ConjugationOrbit3D = lazy(() => import('../../visual-scenes/lie/Orbits3D').then((m) => ({ default: m.ConjugationOrbit3D })));

type Action = 'sphere' | 'conjugaison' | 'tore';

const EXPLANATIONS: SceneExplanations = {
  why: 'L’orbite d’un point est l’ensemble de ses images ; son espace tangent est engendré par les vecteurs ξ·x de l’action infinitésimale. Le rang de ξ ↦ ξ·x donne la dimension de l’orbite, son noyau celle du stabilisateur.',
  proofLink: 'La bijection G/G_x → G·x et la formule dim(G·x) = dim G − dim G_x sont démontrées au résultat 38 ; l’exercice difficile traite la conjugaison sur diag(1, 2).',
  generalize: 'Pour une action propre (par exemple d’un groupe compact), les orbites sont des sous-variétés plongées fermées. Le flot irrationnel sur le tore montre qu’une orbite peut n’être qu’une sous-variété immergée, dense.',
};

const TAU = 2 * Math.PI;

export function OrbitsScene() {
  const [action, setAction] = useState<Action>('sphere');
  const [theta, setTheta] = useState(0.9);
  const [phi, setPhi] = useState(0.6);
  const [l1, setL1] = useState(1);
  const [l2, setL2] = useState(2);
  const [slope, setSlope] = useState('racine');
  const [T, setT] = useState(60);

  const sphere = useMemo(() => sphereScene(theta, phi), [theta, phi]);
  const conj = useMemo(() => conjugationScene(l1, l2), [l1, l2]);
  const torus = useMemo(() => torusScene(slope, T), [slope, T]);
  const readout = action === 'sphere' ? sphere.readout : action === 'conjugaison' ? conj.readout : torus.readout;
  const degenerate = Math.abs(l1 - l2) < 1e-9;

  const sphereFallback = (
    <Plot xDomain={[-1.3, 1.3]} yDomain={[-1.3, 1.3]} width={420} height={420} ariaLabel="Projection de la sphère sur le plan (x₁, x₃)">
      <Curve points={Array.from({ length: 121 }, (_, i) => [Math.cos((TAU * i) / 120), Math.sin((TAU * i) / 120)] as [number, number])} color="var(--text-3)" width={1.2} />
      <Curve points={sphere.stabilizerCircle.map((q) => [q[0]!, q[2]!] as [number, number])} color={LIE_COLORS.Y} width={2.2} />
      <Curve points={sphere.latitude.map((q) => [q[0]!, q[2]!] as [number, number])} color={LIE_COLORS.X} width={1.6} />
      <Dot x={sphere.p[0]!} y={sphere.p[2]!} color={LIE_COLORS.bracket} label="x" />
    </Plot>
  );

  const torusView = (
    <div>
      <Plot xDomain={[0, TAU]} yDomain={[0, TAU]} width={480} height={480} ariaLabel="Orbite du flot linéaire sur le tore">
        <Segment a={[0, 0]} b={[TAU, 0]} color={LIE_COLORS.orange} width={2} />
        <Segment a={[0, TAU]} b={[TAU, TAU]} color={LIE_COLORS.orange} width={2} />
        <Segment a={[0, 0]} b={[0, TAU]} color={LIE_COLORS.X} width={2} />
        <Segment a={[TAU, 0]} b={[TAU, TAU]} color={LIE_COLORS.X} width={2} />
        {torus.pieces.map((seg, i) => (
          <Segment key={i} a={[seg[0]![0]!, seg[0]![1]!]} b={[seg[1]![0]!, seg[1]![1]!]} color={LIE_COLORS.blue} width={1.4} />
        ))}
        <Dot x={torus.pieces[0]![0]![0]!} y={torus.pieces[0]![0]![1]!} color="var(--text)" label="départ" />
        <Dot x={TORUS_TARGET[0]!} y={TORUS_TARGET[1]!} color={LIE_COLORS.bracket} label="cible" />
      </Plot>
      <p className="mt-1 text-[12px] text-text-3">Carré [0, 2π]² : côtés de même couleur recollés. Orbite tracée sur [0, T].</p>
    </div>
  );

  const figure: StudioView =
    action === 'sphere'
      ? {
          id: 'figure',
          title: 'Orbite et stabilisateur',
          render: () => (
            <div>
              <Scene3DGate fallback={sphereFallback}>
                <SphereOrbit3D p={sphere.p} stabilizerCircle={sphere.stabilizerCircle} latitude={sphere.latitude} meridianLike={sphere.meridianLike} q0={sphere.q0} />
              </Scene3DGate>
              <p className="mt-1 text-[12px] text-text-3">
                <MathText text={String.raw`Rose : $x$ et l'axe de $G_x$. Orange : orbite d'un point $y$ sous $G_x$. Vert, violet : orbites de $x$ sous deux sous-groupes à un paramètre, tangentes à deux directions indépendantes.`} />
              </p>
            </div>
          ),
        }
      : action === 'conjugaison'
        ? {
            id: 'figure',
            title: 'Orbite de conjugaison',
            render: () => (
              <div>
                <Scene3DGate fallback={<p className="text-[13px] text-text-2">Vue 3D indisponible : la lecture des dimensions reste dans « Équations et mesures ».</p>}>
                  <ConjugationOrbit3D surface={conj.surface} pointA={conj.pointA} jordan={conj.jordan} samples={conj.samples} degenerate={degenerate} />
                </Scene3DGate>
                <p className="mt-1 text-[12px] text-text-3">
                  {degenerate
                    ? 'λ₁ = λ₂ : l’orbite de mI est le sommet. Le cône gris est la réunion de ce point et de l’orbite du bloc de Jordan (points verts : conjugués de ce bloc).'
                    : 'Hyperboloïde : l’orbite de A. Points verts : conjugués PAP⁻¹, calculés un par un.'}
                </p>
              </div>
            ),
          }
        : { id: 'figure', title: 'Orbite sur le tore', render: () => torusView };

  const views: StudioView[] = [figure, ...readoutViews(readout)];

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0">
        <MathViewStudio id={`lie-orbites-${action}`} views={views} initial={['figure', 'equations']} explanations={EXPLANATIONS} weights={{ figure: 1.5, equations: 1.1 }} />
      </div>
      <div className="space-y-4">
        <Panel title="Action">
          <div className="flex flex-col gap-1.5" role="group" aria-label="Actions de groupes">
            {(
              [
                ['sphere', 'SO(3) sur la sphère'],
                ['conjugaison', 'GL(2) par conjugaison'],
                ['tore', 'ℝ sur le tore'],
              ] as const
            ).map(([id, label]) => (
              <Button key={id} variant={action === id ? 'primary' : 'outline'} aria-pressed={action === id} onClick={() => setAction(id)} data-action={id} className="justify-start text-[13px]">
                {label}
              </Button>
            ))}
          </div>
        </Panel>
        <Panel title="Réglages">
          {action === 'sphere' && (
            <div className="space-y-2">
              <Slider label="Colatitude de x" value={theta} min={0.05} max={3.09} step={0.01} onChange={setTheta} format={(v) => `${fmt((v * 180) / Math.PI, 0)}°`} />
              <Slider label="Longitude de x" value={phi} min={0} max={6.28} step={0.01} onChange={setPhi} format={(v) => `${fmt((v * 180) / Math.PI, 0)}°`} />
            </div>
          )}
          {action === 'conjugaison' && (
            <div className="space-y-2">
              <Slider label="λ₁" value={l1} min={-2} max={3} step={0.25} onChange={setL1} format={(v) => fmt(v, 2)} />
              <Slider label="λ₂" value={l2} min={-2} max={3} step={0.25} onChange={setL2} format={(v) => fmt(v, 2)} />
              <Button variant="outline" className="w-full text-[13px]" onClick={() => setL2(l1)}>Égaliser λ₂ = λ₁</Button>
            </div>
          )}
          {action === 'tore' && (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Pente">
                {SLOPES.map((s) => (
                  <Button key={s.id} variant={slope === s.id ? 'primary' : 'outline'} aria-pressed={slope === s.id} onClick={() => setSlope(s.id)} data-slope={s.id} className="text-[12.5px]">
                    α = {s.label}
                  </Button>
                ))}
              </div>
              <Slider label="Durée T" value={T} min={5} max={400} step={1} onChange={setT} format={(v) => fmt(v, 0)} />
            </div>
          )}
        </Panel>
        <RelatedPanel theorems={['orbite-stabilisateur', 'niveau-regulier']} plates={action === 'tore' ? [1, 24, 25] : [24, 25, 26]} />
      </div>
    </div>
  );
}
