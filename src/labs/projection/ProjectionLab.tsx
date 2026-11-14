/**
 * Laboratoire A : projection sur un convexe fermé, dans le plan et dans l'espace.
 *
 * Un seul état mathématique (convexe, x, points z) alimente toutes les vues du studio :
 * géométrie 2D ou 3D, coupe plane, équations et mesures, hypothèses, démonstration animée,
 * comparaison avec / sans hypothèse, passage de ℝ à H. La scène n'affiche que ce qui a été
 * démontré dans le moteur de preuve, sauf en exploration libre explicite. Aucune
 * manipulation visuelle n'écrit dans la progression.
 */
import { lazy, useEffect, useMemo, useState } from 'react';
import { Button, cx, StatusLegend } from '@/components/ui';
import { minimizationReport, type Non_Hypothesis } from '@/core/math/projection';
import {
  buildConvex,
  contains,
  defaultFamilyParams,
  defaultPointParams,
  familyKey,
  familyParams,
  KIND_DIM,
  KIND_LABEL,
  pointFromParams,
  pointParams,
  project,
  projectionReadout,
  projectionVisibility,
  sectionFrame,
  sectionOf,
  theoremAnimation,
  toPlane,
  visibleEquations,
  visibleMeasures,
  type ConvexKind,
} from '@/core/visual-reasoning/projection-scene';
import type { Vec } from '@/core/visual-reasoning/linalg';
import { stageStatuses } from '@/core/visual-reasoning/proof-stages';
import type { SceneExplanations } from '@/core/visual-reasoning/types';
import { PROJECTION_THEOREM_LAB, PROJECTION_THEOREM_STAGES, projectionTheoremProof } from '@/content/visual-proofs/projection-theorem';
import { MathViewStudio, type StudioView } from '@/components/math-visualizations/MathViewStudio';
import { EquationsPanel, HypothesesPanel, MeasuresPanel, ProofAnimator } from '@/components/math-visualizations/panels';
import { Scene3DGate } from '@/components/math-visualizations/Scene3DGate';
import { useGame } from '@/storage/store';
import { Claim, fr, LabProof, LabShell, MathText, Panel, Plot, Slider, useLabKeys } from '../kit';
import { H2, Region2D, Scene2D, X2, Y2, type WithoutSet2D } from '../visual-scenes/projection/Scene2D';
import { ProjectionSection, SectionPlot, sectionWindow } from '../visual-scenes/projection/SectionView';
import { TheoremCaption, TheoremOverlay } from '../visual-scenes/projection/TheoremFigure';
import { ComparePanel } from '../visual-scenes/projection/ComparePanel';
import { DimensionLadder } from '../visual-scenes/projection/DimensionLadder';
import { FAMILY_IDS, familyProof, migrateFamilyKeys, type FamilyId } from './proofs';

const Scene3D = lazy(() => import('../visual-scenes/projection/Scene3D'));

const LAB = 'projection';
type Mode = 'convexe' | 'non-ferme' | 'non-convexe';

/** Les figures reçoivent plus de largeur que les panneaux de texte. */
const STUDIO_WEIGHTS: Record<string, number> = { geometrie: 1.6, coupe: 1.3, demonstration: 1.5, 'avec-sans': 1.6, dimensions: 1.3 };

const FAMILIES_2D = FAMILY_IDS.filter((f) => KIND_DIM[f] === 2);
const FAMILIES_3D = FAMILY_IDS.filter((f) => KIND_DIM[f] === 3);

const EXPLANATIONS = (dim: 2 | 3): SceneExplanations => ({
  why:
    dim === 2
      ? 'Le plan euclidien est le plus simple des espaces de Hilbert : distance, angle et projection s’y voient directement. La figure montre un exemple ; les formules de la vue Équations sont exactes pour tout point x.'
      : 'Dans ℝ³, la vue 3D montre la position relative de K, de x et de son projeté ; la coupe plane passant par x, P_Kx et z₁ est une vue 2D exacte (l’intersection de K avec ce plan est calculée en formule fermée), où l’inégalité caractéristique se lit directement : K reste sous l’horizontale passant par P_Kx.',
  proofLink:
    'Chaque élément de la figure correspond à un nœud du graphe de preuve : la fermeture démontrée trace le bord en trait plein, le théorème invoqué fait apparaître P_Kx, l’inégalité caractéristique fait apparaître les vecteurs. La vue Démonstration rejoue les huit étapes de la preuve du théorème ; une étape n’y est marquée établie que si le moteur de preuve l’a validée.',
  generalize:
    'Le même énoncé vaut dans tout espace de Hilbert réel : la démonstration utilise la complétude et l’identité du parallélogramme, jamais la compacité. Pour une boule, la formule de projection est la même en toute dimension (vue « De ℝ à H ») ; pour un convexe quelconque de dimension infinie, aucune figure n’est fidèle.',
});

const STEP_LABELS: { key: string; label: string }[] = [
  { key: 'K-nonvide', label: 'Non-vacuité' },
  { key: 'K-ferme', label: 'Fermeture : le bord passe en trait plein' },
  { key: 'K-convexe', label: 'Convexité' },
  { key: 'projection-point', label: 'Existence et unicité : $P_Kx$ apparaît' },
  { key: 'inegalite-caracteristique', label: 'Inégalité caractéristique : les vecteurs apparaissent' },
];

export function ProjectionLab() {
  const keys = useLabKeys(LAB);
  const theoremKeys = useLabKeys(PROJECTION_THEOREM_LAB);
  const unlock = useGame((s) => s.unlockLabKeys);
  const theme = useGame((s) => s.save.settings.theme);

  const [family, setFamily] = useState<FamilyId>('demi-plan');
  const [params, setParams] = useState<Record<FamilyId, number[]>>(() => Object.fromEntries(FAMILY_IDS.map((f) => [f, defaultFamilyParams(f)])) as Record<FamilyId, number[]>);
  const [x2, setX2] = useState<Vec>([4, 2.2]);
  const [x3, setX3] = useState<Vec>([2.6, 1.8, 2.2]);
  const [zs2, setZs2] = useState<Vec[]>([
    [-1.5, 0.5],
    [-3, -2],
    [1.5, -2.5],
  ]);
  const [zParams, setZParams] = useState<Record<FamilyId, number[][]>>(() => Object.fromEntries(FAMILY_IDS.map((f) => [f, defaultPointParams(f)])) as Record<FamilyId, number[][]>);
  const [zCount, setZCount] = useState(1);
  const [mode, setMode] = useState<Mode>('convexe');
  const [nonConvex, setNonConvex] = useState<'cercle' | 'deux-disques'>('cercle');
  const [free, setFree] = useState(false);
  const [stage, setStage] = useState(0);
  const [animMode, setAnimMode] = useState<'preuve' | 'exploration'>('preuve');
  const [proofTab, setProofTab] = useState<'famille' | 'theoreme'>('famille');
  const [hideViz, setHideViz] = useState(false);

  // Sauvegardes de la version 1 : clés recalculées à partir des brouillons de preuve.
  useEffect(() => {
    const save = useGame.getState().save;
    const missing = migrateFamilyKeys(LAB, save.drafts, new Set(save.labs[LAB] ?? []));
    if (missing.length) unlock(LAB, missing);
  }, [unlock]);

  const dim = KIND_DIM[family];
  const K = useMemo(() => buildConvex(family, params[family]), [family, params]);
  const x = dim === 2 ? x2 : x3;
  const zs = useMemo<Vec[]>(
    () =>
      dim === 2
        ? zs2.slice(0, zCount).map((z) => (contains(K, z) ? z : project(K, z)))
        : zParams[family].slice(0, zCount).map((q) => pointFromParams(K, q)),
    [dim, zs2, zCount, K, zParams, family],
  );

  const readout = useMemo(() => projectionReadout({ K, x, zs }, keys), [K, x, zs, keys]);
  const p = readout.derived.p;
  const vis = projectionVisibility(family, keys, free);
  const measures = visibleMeasures(readout.measures, vis);
  const equations = visibleEquations(readout.equations, vis);
  const stageViews = stageStatuses(PROJECTION_THEOREM_STAGES, theoremKeys);
  const anim = useMemo(() => theoremAnimation(K, x, dim === 2 ? zs : zs.slice(0, 1)), [K, x, zs, dim]);
  const spec = useMemo(() => familyProof(family), [family]);

  // Coupe plane (ℝ³) : plan passant par P_Kx et contenant x et z₁.
  const section = useMemo(() => {
    if (dim !== 3) return null;
    const frame = sectionFrame(x, p, zs[0] ?? p);
    return { frame, shape: sectionOf(K, frame), x2: toPlane(frame, x), p2: toPlane(frame, p), z2: zs[0] ? toPlane(frame, zs[0]) : null };
  }, [dim, x, p, zs, K]);

  const nonHyp: Non_Hypothesis =
    mode === 'non-ferme'
      ? { kind: 'disque-ouvert', center: { x: 0, y: 0 }, r: 2 }
      : nonConvex === 'cercle'
        ? { kind: 'cercle', center: { x: 0, y: 0 }, r: 2 }
        : { kind: 'deux-disques', c1: { x: -3, y: 0 }, c2: { x: 3, y: 0 }, r: 1.4 };
  const report = minimizationReport(nonHyp, { x: x2[0]!, y: x2[1]! }, 0.04);
  const without: WithoutSet2D | null =
    dim === 2 && mode !== 'convexe'
      ? nonHyp.kind === 'deux-disques'
        ? { kind: 'deux-disques', c1: [nonHyp.c1.x, nonHyp.c1.y], c2: [nonHyp.c2.x, nonHyp.c2.y], r: nonHyp.r }
        : { kind: nonHyp.kind, center: [nonHyp.center.x, nonHyp.center.y], r: nonHyp.r }
      : null;

  const chooseFamily = (f: FamilyId) => {
    setFamily(f);
    setMode('convexe');
  };
  const setParam = (i: number, v: number) => setParams((all) => ({ ...all, [family]: all[family].map((w, k) => (k === i ? v : w)) }));
  const setZ2 = (i: number, v: Vec) => setZs2((all) => all.map((z, k) => (k === i ? v : z)));
  const setZParam = (i: number, j: number, v: number) =>
    setZParams((all) => ({ ...all, [family]: all[family].map((q, k) => (k === i ? q.map((w, l) => (l === j ? v : w)) : q)) }));

  const geometry =
    dim === 2 ? (
      <div>
        <Scene2D K={K} vis={vis} x={x2} p={p} zs={zs} onX={setX2} onZ={setZ2} without={without} minimizers={report.minimizers.map((m) => [m.x, m.y])} />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <StatusLegend />
          <p className="text-[12px] text-text-3">Flèches du clavier sur un point pour le déplacer ; Maj pour aller plus vite.</p>
        </div>
      </div>
    ) : (
      <Scene3DGate
        fallback={section && <ProjectionSection shape={section.shape} closed={vis.closed} x2={section.x2} p2={section.p2} z2={section.z2} showPoint={vis.point} showVectors={vis.vectors} />}
      >
        <Scene3D K={K} vis={vis} x={x3} p={p} zs={zs} theme={theme} />
      </Scene3DGate>
    );

  const theoremFigure = (() => {
    if (dim === 2) {
      return (
        <Plot xDomain={X2} yDomain={Y2} height={H2} ariaLabel="Figure de l’étape courante de la démonstration">
          <Region2D K={K} closed />
          <TheoremOverlay stage={stage} anim={anim} x={x} to2={(v) => [v[0]!, v[1]!]} />
        </Plot>
      );
    }
    const to2 = (v: Vec) => toPlane(anim.frame, v);
    const pts = [x, anim.p, ...anim.sequence, ...(anim.ghost ? [anim.ghost.q] : []), ...anim.zs].map(to2);
    return (
      <SectionPlot shape={sectionOf(K, anim.frame)} closed win={sectionWindow(pts)} ariaLabel="Figure de l’étape courante, dans le plan de coupe">
        <TheoremOverlay stage={stage} anim={anim} x={x} to2={to2} />
      </SectionPlot>
    );
  })();

  const views: StudioView[] = [
    { id: 'geometrie', title: dim === 2 ? 'Géométrie (plan)' : 'Géométrie (espace)', render: () => geometry },
    ...(section
      ? [
          {
            id: 'coupe',
            title: 'Coupe plane',
            render: () => <ProjectionSection shape={section.shape} closed={vis.closed} x2={section.x2} p2={section.p2} z2={section.z2} showPoint={vis.point} showVectors={vis.vectors} />,
          },
        ]
      : []),
    {
      id: 'equations',
      title: 'Équations et mesures',
      render: () => (
        <div className="space-y-4">
          <EquationsPanel equations={equations} />
          <div className="border-t border-line pt-3">
            <MeasuresPanel measures={measures} />
            {!vis.point && <p className="mt-1.5 text-text-3 text-[12.5px]">Le projeté n’est pas encore garanti : démontre les hypothèses.</p>}
            {vis.point && !vis.vectors && <p className="mt-1.5 text-text-3 text-[12.5px]">L’inégalité caractéristique reste à établir.</p>}
          </div>
        </div>
      ),
    },
    { id: 'hypotheses', title: 'Hypothèses', render: () => <HypothesesPanel hypotheses={readout.hypotheses} conclusions={readout.conclusions} /> },
    {
      id: 'demonstration',
      title: 'Démonstration',
      render: () => (
        <div className="space-y-3">
          <ProofAnimator stages={stageViews} index={stage} onIndex={setStage} mode={animMode} onMode={setAnimMode} />
          {theoremFigure}
          <TheoremCaption stage={stage} anim={anim} />
        </div>
      ),
    },
    { id: 'avec-sans', title: 'Avec / sans hypothèse', render: () => <ComparePanel dim={dim} x={x} onX={dim === 2 ? setX2 : setX3} /> },
    { id: 'dimensions', title: 'De ℝ à H', render: () => <DimensionLadder /> },
  ];

  return (
    <LabShell
      eyebrow="A"
      title="Projection sur un convexe fermé"
      intro="Un point n’apparaît que si les hypothèses qui en garantissent l’existence ont été démontrées. Passe du plan à l’espace, compare avec et sans hypothèse, et rejoue la démonstration du théorème étape par étape."
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[13px] text-text-2">
              Dimension <span className="font-mono">{dim}</span> · <MathText text={KIND_LABEL[family]} />
            </p>
            <label className="flex items-center gap-2 text-[12.5px] text-text-2 cursor-pointer">
              <input type="checkbox" checked={hideViz} onChange={(e) => setHideViz(e.target.checked)} />
              Masquer les visualisations (refaire la preuve sans aide visuelle)
            </label>
          </div>
          {hideViz ? (
            <Panel>
              <p className="text-[13.5px] text-text-2" data-testid="viz-hidden">Visualisations masquées. Les preuves ci-dessous restent entièrement jouables.</p>
            </Panel>
          ) : (
            <MathViewStudio id="projection" views={views} initial={['geometrie', 'equations']} explanations={EXPLANATIONS(dim)} weights={STUDIO_WEIGHTS} />
          )}
        </div>

        <div className="space-y-4">
          <Panel title="Convexe étudié">
            <p className="mb-1 text-[12px] text-text-3">Dans le plan</p>
            <div className="flex flex-wrap gap-1.5 mb-2" role="group" aria-label="Familles de convexes du plan">
              {FAMILIES_2D.map((f) => (
                <FamilyButton key={f} id={f} active={family === f && mode === 'convexe'} onClick={() => chooseFamily(f)} />
              ))}
            </div>
            <p className="mb-1 text-[12px] text-text-3">Dans l’espace</p>
            <div className="flex flex-wrap gap-1.5 mb-3" role="group" aria-label="Familles de convexes de l’espace">
              {FAMILIES_3D.map((f) => (
                <FamilyButton key={f} id={f} active={family === f} onClick={() => chooseFamily(f)} />
              ))}
            </div>
            <div className="space-y-2">
              {familyParams(family).map((s, i) => (
                <Slider key={`${family}-${s.id}`} label={s.label} value={params[family][i]!} min={s.min} max={s.max} step={s.step} onChange={(v) => setParam(i, v)} format={(v) => fr(v, 2)} />
              ))}
            </div>
          </Panel>

          <Panel title="Points">
            {dim === 3 && (
              <fieldset className="space-y-1.5 mb-3" aria-label="Point x à projeter, coordonnées">
                <legend className="text-[12.5px] text-text-2 mb-1">Point x à projeter</legend>
                {[0, 1, 2].map((i) => (
                  <Slider key={i} label={`x${'₁₂₃'[i]}`} value={x3[i]!} min={-4} max={4} step={0.05} onChange={(v) => setX3((old) => old.map((w, k) => (k === i ? v : w)))} format={(v) => fr(v, 2)} />
                ))}
              </fieldset>
            )}
            {dim === 3 &&
              zs.map((_, i) => (
                <fieldset key={`${family}-z${i}`} className="space-y-1.5 mb-3" aria-label={`Point z${i + 1} de K, coordonnées intrinsèques`}>
                  <legend className="text-[12.5px] text-text-2 mb-1">Point z{i + 1} de K (appartient à K par construction)</legend>
                  {pointParams(family).map((s, j) => (
                    <Slider key={s.id} label={s.label} value={zParams[family][i]![j]!} min={s.min} max={s.max} step={s.step} onChange={(v) => setZParam(i, j, v)} format={(v) => fr(v, 2)} />
                  ))}
                </fieldset>
              ))}
            {dim === 2 && <p className="text-[12.5px] text-text-3 mb-2">Déplace x et les points z sur la figure (pointeur ou flèches du clavier). Un point z placé hors de K est ramené sur K.</p>}
            <div className="flex flex-wrap gap-1.5">
              <Button className="px-2 py-1 text-[12.5px]" disabled={zCount >= 3} onClick={() => setZCount((c) => Math.min(3, c + 1))}>
                Ajouter un point z
              </Button>
              <Button className="px-2 py-1 text-[12.5px]" variant="ghost" disabled={zCount <= 1} onClick={() => setZCount((c) => Math.max(1, c - 1))}>
                Retirer un point z
              </Button>
            </div>
            <p className="mt-2 text-[12px] text-text-3">Des points z en nombre fini ne démontrent jamais un énoncé « pour tout z de K ».</p>
          </Panel>

          {dim === 2 ? (
            <Panel title="Retirer une hypothèse">
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Hypothèse retirée">
                <Button variant={mode === 'convexe' ? 'primary' : 'outline'} aria-pressed={mode === 'convexe'} onClick={() => setMode('convexe')}>Aucune</Button>
                <Button variant={mode === 'non-ferme' ? 'primary' : 'outline'} aria-pressed={mode === 'non-ferme'} onClick={() => setMode('non-ferme')}>Fermeture</Button>
                <Button variant={mode === 'non-convexe' ? 'primary' : 'outline'} aria-pressed={mode === 'non-convexe'} onClick={() => setMode('non-convexe')}>Convexité</Button>
              </div>
              {mode === 'non-ferme' && (
                <div className="mt-3 text-[13.5px] space-y-1.5 anim-rise">
                  <p>Ensemble : disque ouvert de rayon 2. Il est convexe et non vide, mais pas fermé.</p>
                  <p><span className="text-text-3">Infimum de la distance : </span><span className="tabular">{fr(report.infimum)}</span></p>
                  <p className={report.attained ? 'text-hyp' : 'text-miss'}>{report.attained ? 'x est dans le disque : la distance nulle est atteinte en x.' : 'L’infimum n’est atteint en aucun point : le projeté n’existe pas.'}</p>
                  <Claim status="exact">Si ‖x‖ ≥ 2, la distance à tout point du disque ouvert dépasse strictement ‖x‖ − 2.</Claim>
                  <Button variant="ghost" className="px-0" onClick={() => setX2([4, 1.5])}>Placer x hors du disque</Button>
                </div>
              )}
              {mode === 'non-convexe' && (
                <div className="mt-3 text-[13.5px] space-y-1.5 anim-rise">
                  <div className="flex gap-1.5" role="group" aria-label="Ensemble non convexe">
                    <Button variant={nonConvex === 'cercle' ? 'primary' : 'ghost'} aria-pressed={nonConvex === 'cercle'} onClick={() => setNonConvex('cercle')}>Cercle</Button>
                    <Button variant={nonConvex === 'deux-disques' ? 'primary' : 'ghost'} aria-pressed={nonConvex === 'deux-disques'} onClick={() => setNonConvex('deux-disques')}>Deux disques</Button>
                  </div>
                  <p className={report.unique ? 'text-text-2' : 'text-miss'}>
                    {report.unique ? 'Ici le point le plus proche est unique : c’est un cas particulier.' : 'Plusieurs points réalisent la distance minimale : l’unicité est perdue.'}
                  </p>
                  <p><span className="text-text-3">Distance minimale : </span><span className="tabular">{fr(report.infimum)}</span></p>
                  <Claim status="exact">Formule fermée de la distance à l’ensemble.</Claim>
                  <Button variant="ghost" className="px-0" onClick={() => setX2([0, nonConvex === 'cercle' ? 0 : 1.2])}>
                    {nonConvex === 'cercle' ? 'Placer x au centre' : 'Placer x sur la médiatrice'}
                  </Button>
                </div>
              )}
            </Panel>
          ) : (
            <Panel title="Retirer une hypothèse">
              <p className="text-[13px] text-text-2">En dimension 3, ouvre la vue « Avec / sans hypothèse » : boule ouverte (sans fermeture) et sphère (sans convexité), comparées à la boule fermée pour le même point x.</p>
            </Panel>
          )}

          <Panel title="Ce que la preuve a débloqué">
            <ul className="text-[13.5px] space-y-1" data-testid="unlocked">
              {STEP_LABELS.map((s) => {
                const on = keys.has(familyKey(family, s.key));
                return (
                  <li key={s.key} style={{ color: on ? 'var(--st-proved)' : free ? 'var(--text-2)' : 'var(--text-3)' }} data-step={s.key} data-on={on}>
                    <span aria-hidden>{on ? '✓' : free ? '◌' : '·'}</span> <MathText text={s.label} />
                  </li>
                );
              })}
            </ul>
            <p className="mt-1.5 text-[12px] text-text-3">Propre à la famille courante : démontrer pour une famille ne débloque rien pour une autre.</p>
            <label className="flex items-start gap-2 text-[12.5px] text-text-3 mt-2.5 cursor-pointer">
              <input type="checkbox" className="mt-0.5" checked={free} onChange={(e) => setFree(e.target.checked)} />
              Exploration libre : tout afficher sans démontrer. Rien de ce qui est alors affiché n’est établi par toi.
            </label>
          </Panel>
        </div>
      </div>

      <section className="mt-5">
        <div className="mb-3 flex flex-wrap items-center gap-1.5" role="group" aria-label="Preuve affichée">
          <Button variant={proofTab === 'famille' ? 'primary' : 'outline'} aria-pressed={proofTab === 'famille'} onClick={() => setProofTab('famille')}>
            Preuve guidée de la famille
          </Button>
          <Button variant={proofTab === 'theoreme' ? 'primary' : 'outline'} aria-pressed={proofTab === 'theoreme'} onClick={() => setProofTab('theoreme')}>
            Démonstration du théorème
          </Button>
        </div>
        {proofTab === 'famille' ? (
          <>
            <h2 className="font-serif text-xl mb-1">Preuve guidée</h2>
            <p className="text-sm text-text-2 mb-3">
              Convexe courant : <MathText text={KIND_LABEL[family]} />. Chaque propriété établie modifie la scène ci-dessus.
            </p>
            <LabProof key={family} labId={LAB} specKey={family} spec={spec} />
          </>
        ) : (
          <>
            <h2 className="font-serif text-xl mb-1">Démonstration du théorème de projection</h2>
            <p className="text-sm text-text-2 mb-3">
              Chaque nœud établi ici débloque l’étape correspondante de la vue « Démonstration » (mode Preuve). Section 1.1 du polycopié.
            </p>
            <LabProof labId={PROJECTION_THEOREM_LAB} specKey="theoreme" spec={projectionTheoremProof} />
          </>
        )}
      </section>
    </LabShell>
  );
}

function FamilyButton({ id, active, onClick }: { id: ConvexKind; active: boolean; onClick: () => void }) {
  return (
    <Button variant={active ? 'primary' : 'outline'} aria-pressed={active} onClick={onClick} data-family={id} className={cx('text-[13px]')}>
      <MathText text={KIND_LABEL[id]} />
    </Button>
  );
}
