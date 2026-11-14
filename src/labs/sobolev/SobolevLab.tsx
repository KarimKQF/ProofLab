/**
 * Laboratoire F : Sobolev et traces sur Ω = ]0,1[².
 *
 * Une fonction u (bulle de H¹₀, polynôme de trace non nulle, fonction régulière, exemple
 * singulier de H¹ non borné), éventuellement perturbée par t·u₀ ∈ H¹₀ : surface, niveaux,
 * coupes, dérivées, traces sur les quatre côtés et formules dérivent d'un seul état.
 * Chaque appartenance (H¹, H², H¹₀) est justifiée analytiquement, jamais par la figure.
 */
import { lazy, useMemo, useState } from 'react';
import { Button } from '@/components/ui';
import { sampleGrid } from '@/core/visual-reasoning/sections';
import { SOBOLEV_EXAMPLES, type Side } from '@/core/visual-reasoning/surfaces';
import { exampleById, field, gradient, sobolevReadout, type SobolevState } from '@/core/visual-reasoning/sobolev-scene';
import type { SceneExplanations } from '@/core/visual-reasoning/types';
import { MathViewStudio, type StudioView } from '@/components/math-visualizations/MathViewStudio';
import { EquationsPanel, HypothesesPanel, MeasuresPanel } from '@/components/math-visualizations/panels';
import { Scene3DGate } from '@/components/math-visualizations/Scene3DGate';
import { LinkButton } from '@/components/ui';
import { fr, LabShell, MathText, Panel, Slider } from '../kit';
import { CompareTable, CutsView, LevelMap, TraceView } from '../visual-scenes/sobolev/SobolevViews';

const Sobolev3D = lazy(() => import('../visual-scenes/sobolev/Sobolev3D'));

const EXPLANATIONS: SceneExplanations = {
  why: 'Une fonction de deux variables se lit de trois façons équivalentes : sa surface, ses courbes de niveau, ses coupes. Les trois vues sont produites par la même grille ; la trace se lit sur le bord de la surface, côté par côté.',
  proofLink:
    'Le théorème de trace (section 3.6) se démontre en aplatissant localement le bord, en prouvant l’estimation sur un demi-espace, puis en recollant par une partition de l’unité. Ce laboratoire ne le démontre pas : il montre ce que l’énoncé affirme sur des exemples dont chaque propriété est justifiée analytiquement. Pour le démontrer, ouvre la fiche du théorème de trace.',
  generalize:
    'Pour tout ouvert borné lipschitzien de ℝᵈ, γ : H¹(Ω) → H^{1/2}(∂Ω) est continue et surjective, de noyau H¹₀(Ω). En dimension d ≥ 2, une fonction de H¹ n’a pas de valeur ponctuelle bien définie (exemple singulier) : la trace n’est pas une évaluation point par point, c’est le prolongement continu de la restriction.',
};

const STUDIO_WEIGHTS: Record<string, number> = { surface: 1.5, niveaux: 1.3, coupes: 1.4, traces: 1.4 };

export function SobolevLab() {
  const [exampleId, setExampleId] = useState('produit');
  const [t, setT] = useState(0);
  const [x0, setX0] = useState(0.3);
  const [y0, setY0] = useState(0.6);
  const [logH, setLogH] = useState(-2);
  const [resolution, setResolution] = useState<32 | 64>(64);
  const [highlight, setHighlight] = useState<Side | null>(null);

  const state: SobolevState = { exampleId, t, x0, y0, h: 10 ** logH };
  const example = exampleById(exampleId);
  const u = useMemo(() => field({ exampleId, t, x0: 0, y0: 0, h: 0 }), [exampleId, t]);
  const cap = example.displayCap ?? Infinity;
  const grid = useMemo(() => sampleGrid(u, resolution + 1, [0, 1], [0, 1], `sobolev:${exampleId}:${t}`, cap), [u, resolution, exampleId, t, cap]);
  const readout = sobolevReadout(state);
  const grad = gradient(state, x0, y0);
  const span = Math.max(Math.abs(grid.min), Math.abs(grid.max)) || 1;
  const scaleZ = 0.7 / span;

  const levelMap = <LevelMap grid={grid} state={state} grad={grad} highlight={highlight} />;
  const views: StudioView[] = [
    {
      id: 'surface',
      title: 'Surface',
      render: () => (
        <div>
          <Scene3DGate fallback={levelMap}>
            <Sobolev3D grid={grid} u={u} trace={example.trace} x0={x0} y0={y0} scaleZ={scaleZ} cap={cap} highlight={highlight} />
          </Scene3DGate>
          <p className="mt-1 text-[12px] text-text-3">
            Échelle verticale ×{fr(scaleZ, 2)} (affichage seulement){Number.isFinite(cap) ? ` ; hauteur tronquée à ${fr(cap, 2)} : la fonction n’est pas bornée au centre` : ''}.
          </p>
        </div>
      ),
    },
    { id: 'niveaux', title: 'Niveaux', render: () => levelMap },
    { id: 'coupes', title: 'Coupes et dérivées', render: () => <CutsView u={u} state={state} cap={Number.isFinite(cap) ? cap : 1e6} /> },
    { id: 'traces', title: 'Traces', render: () => <TraceView state={state} highlight={highlight} onHighlight={setHighlight} /> },
    {
      id: 'equations',
      title: 'Équations et mesures',
      render: () => (
        <div className="space-y-4">
          <EquationsPanel equations={readout.equations} />
          <div className="border-t border-line pt-3">
            <MeasuresPanel measures={readout.measures} />
          </div>
        </div>
      ),
    },
    { id: 'hypotheses', title: 'Hypothèses', render: () => <HypothesesPanel hypotheses={readout.hypotheses} conclusions={readout.conclusions} /> },
    { id: 'comparaison', title: 'Comparer', render: () => <CompareTable current={exampleId} /> },
  ];

  return (
    <LabShell
      eyebrow="F"
      title="Sobolev et traces"
      intro={<MathText text={String.raw`Fonctions de $H^1(\Omega)$ sur $\Omega=]0,1[^2$ : surface, niveaux, coupes, gradient, et trace sur les quatre côtés. Le théorème de trace relie $H^1(\Omega)$ à $H^{1/2}(\partial\Omega)$ ; son noyau est $H^1_0(\Omega)$.`} />}
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          <MathViewStudio id="sobolev" views={views} initial={['surface', 'traces']} explanations={EXPLANATIONS} weights={STUDIO_WEIGHTS} />
        </div>
        <div className="space-y-4">
          <Panel title="Fonction étudiée">
            <div className="flex flex-col gap-1.5" role="group" aria-label="Exemples">
              {SOBOLEV_EXAMPLES.map((e) => (
                <Button key={e.id} variant={exampleId === e.id ? 'primary' : 'outline'} aria-pressed={exampleId === e.id} onClick={() => setExampleId(e.id)} data-example={e.id} className="justify-start text-left text-[13px]">
                  <MathText text={`$${e.label}$`} />
                </Button>
              ))}
            </div>
          </Panel>
          <Panel title="Réglages">
            <div className="space-y-2">
              <Slider label="x₀ (coupe et point)" value={x0} min={0.02} max={0.98} step={0.01} onChange={setX0} format={(v) => fr(v, 2)} />
              <Slider label="y₀ (coupe et point)" value={y0} min={0.02} max={0.98} step={0.01} onChange={setY0} format={(v) => fr(v, 2)} />
              <Slider label="Ajouter t·u₀, u₀ = 16x(1−x)y(1−y) ∈ H¹₀" value={t} min={-1} max={1} step={0.05} onChange={setT} format={(v) => fr(v, 2)} />
              <Slider label="Pas h = 10^k des différences centrées" value={logH} min={-4} max={-1} step={0.5} onChange={setLogH} format={(v) => `10^${fr(v, 1)}`} />
              <label className="flex items-center justify-between gap-2 text-[13px]">
                Résolution de la grille
                <select value={resolution} onChange={(e) => setResolution(Number(e.target.value) as 32 | 64)} className="rounded border border-line-strong bg-surface-2 px-1.5 py-0.5">
                  <option value={32}>32 × 32 (machine modeste)</option>
                  <option value={64}>64 × 64</option>
                </select>
              </label>
            </div>
          </Panel>
          <Panel title="Démontrer">
            <p className="text-[13px] text-text-2 mb-2">Ce laboratoire illustre l’énoncé ; la démonstration se joue dans le moteur de preuve.</p>
            <LinkButton to="/theoreme/trace" className="w-full">Fiche du théorème de trace</LinkButton>
          </Panel>
        </div>
      </div>
    </LabShell>
  );
}
