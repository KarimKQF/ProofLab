/**
 * Scène « Exponentielle » : A ∈ gl(2) (préréglages ou coefficients libres), temps s ;
 * orbites t ↦ e^{tA}v, image du cercle unité par e^{sA}, courbe s ↦ tr e^{sA} et seuil −2.
 */
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui';
import { MathViewStudio, type StudioView } from '@/components/math-visualizations/MathViewStudio';
import { EXP_PRESETS, expScene } from '@/core/visual-reasoning/lie-exponential';
import { fmt, type SceneExplanations } from '@/core/visual-reasoning/types';
import type { Mat } from '@/core/visual-reasoning/lie-core';
import { Curve, Dot, MathText, Panel, Plot, Segment, Slider } from '../../kit';
import { clipRuns, LIE_COLORS, readoutViews, RelatedPanel } from '../common';

const EXPLANATIONS: SceneExplanations = {
  why: 'Un sous-groupe à un paramètre est une courbe s ↦ e^{sA} de GL(2) ; il agit sur le plan, et chaque point décrit une orbite. Le cercle unité et son image montrent l’effet de e^{sA} sur les aires : det e^{sA} = e^{s tr A}.',
  proofLink: 'Les identités affichées sont démontrées dans les exercices du résultat 40 : e^{tJ} est la rotation d’angle t, e^{A+B} = e^Ae^B si [A,B] = 0, det e^X = e^{tr X} et tr e^X ≥ −2 sur sl(2).',
  generalize: 'Pour un groupe de Lie G quelconque, exp envoie 𝔤 dans G ; c’est un difféomorphisme local en 0, mais pas toujours surjectif : diag(−2, −1/2) ∈ SL(2) n’est l’exponentielle d’aucun élément de sl(2).',
};

const clampView = 3.2;
const VIEW: [number, number, number, number] = [-clampView, clampView, -clampView, clampView];

export function ExponentialScene() {
  const [A, setA] = useState<Mat>(EXP_PRESETS[0]!.A);
  const [presetId, setPresetId] = useState<string | null>(EXP_PRESETS[0]!.id);
  const [s, setS] = useState(1);
  const data = useMemo(() => expScene({ A, s }), [A, s]);
  const preset = EXP_PRESETS.find((p) => p.id === presetId);

  const setEntry = (i: number, j: number, v: number) => {
    setPresetId(null);
    setA((M) => M.map((r, a) => r.map((x, b) => (a === i && b === j ? v : x))));
  };

  const plane = (
    <div>
      <Plot xDomain={[-clampView, clampView]} yDomain={[-clampView, clampView]} width={560} height={560} ariaLabel="Orbites du sous-groupe à un paramètre dans le plan">
        {data.orbits.flatMap((o, k) => clipRuns(o, VIEW).map((run, j) => <Curve key={`${k}-${j}`} points={run} color="var(--text-3)" width={1.1} />))}
        <Curve points={[...Array.from({ length: 97 }, (_, k) => [Math.cos((2 * Math.PI * k) / 96), Math.sin((2 * Math.PI * k) / 96)] as [number, number])]} color={LIE_COLORS.blue} width={1.4} dash="4 3" />
        {clipRuns([...data.circleImage, data.circleImage[0]!], VIEW).map((run, j) => (
          <Curve key={`c${j}`} points={run} color={LIE_COLORS.orange} width={2.4} />
        ))}
        <Segment a={[0, 0]} b={[data.E[0]![0]!, data.E[1]![0]!]} color={LIE_COLORS.X} width={2.2} arrow />
        <Segment a={[0, 0]} b={[data.E[0]![1]!, data.E[1]![1]!]} color={LIE_COLORS.Y} width={2.2} arrow />
        <Dot x={data.E[0]![0]!} y={data.E[1]![0]!} r={0} color={LIE_COLORS.X} label="eˢᴬe₁" />
        <Dot x={data.E[0]![1]!} y={data.E[1]![1]!} r={0} color={LIE_COLORS.Y} label="eˢᴬe₂" />
      </Plot>
      <p className="mt-1 text-[12px] text-text-3">
        <MathText text={String.raw`Gris : orbites $t\mapsto e^{tA}v$, $|t|\le3$. Bleu pointillé : cercle unité. Orange : son image par $e^{sA}$, d'aire $\pi\det e^{sA}$.`} />
      </p>
    </div>
  );

  const tr = data.traceCurve;
  const yMin = Math.min(-2.6, ...tr.map((p) => p[1]).filter((v) => v > -12));
  const yMax = Math.max(3, ...tr.map((p) => p[1]).filter((v) => v < 12));
  const tracePlot = (
    <div>
      <Plot xDomain={[-4, 4]} yDomain={[Math.max(-12, yMin), Math.min(12, yMax)]} width={560} height={320} ariaLabel="Trace de l’exponentielle en fonction de s">
        <Curve points={tr.filter((p) => Math.abs(p[1]) < 12)} color={LIE_COLORS.orange} width={2} />
        <Segment a={[-4, -2]} b={[4, -2]} color={LIE_COLORS.bracket} width={1.4} dash="6 4" />
        <Dot x={s} y={tr.reduce((best, p) => (Math.abs(p[0] - s) < Math.abs(best[0] - s) ? p : best), tr[0]!)[1]} color={LIE_COLORS.orange} label="s" />
      </Plot>
      <p className="mt-1 text-[12px] text-text-3">
        <MathText text={String.raw`Courbe $s\mapsto\operatorname{tr}e^{sA}$ ; pointillé : niveau $-2$. Sur $\mathfrak{sl}(2)$ la courbe reste au-dessus ; $\operatorname{diag}(-2,-\frac12)$, de trace $-\frac52$, est hors d'atteinte.`} />
      </p>
    </div>
  );

  const views: StudioView[] = [
    { id: 'plan', title: 'Orbites et image du cercle', render: () => plane },
    { id: 'trace', title: 'Trace de l’exponentielle', render: () => tracePlot },
    ...readoutViews(data.readout),
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0">
        <MathViewStudio id="lie-exponentielle" views={views} initial={['plan', 'equations']} explanations={EXPLANATIONS} weights={{ plan: 1.4, trace: 1.2, equations: 1.1 }} />
      </div>
      <div className="space-y-4">
        <Panel title="Générateur A">
          <div className="flex flex-col gap-1.5" role="group" aria-label="Générateurs préréglés">
            {EXP_PRESETS.map((p) => (
              <Button
                key={p.id}
                variant={presetId === p.id ? 'primary' : 'outline'}
                aria-pressed={presetId === p.id}
                onClick={() => {
                  setPresetId(p.id);
                  setA(p.A);
                }}
                data-preset={p.id}
                className="justify-start text-left text-[13px]"
              >
                <MathText text={p.label} />
              </Button>
            ))}
          </div>
          {preset && <p className="mt-2 text-[12.5px] text-text-2"><MathText text={preset.note} /></p>}
          <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1">
            {[0, 1].map((i) =>
              [0, 1].map((j) => (
                <Slider key={`${i}${j}`} label={`a${i + 1}${j + 1}`} value={A[i]![j]!} min={-2} max={2} step={0.05} onChange={(v) => setEntry(i, j, v)} format={(v) => fmt(v, 2)} />
              )),
            )}
          </div>
        </Panel>
        <Panel title="Temps">
          <Slider label="s" value={s} min={-4} max={4} step={0.01} onChange={setS} format={(v) => fmt(v, 2)} />
          <div className="mt-2 flex gap-1.5">
            <Button variant="outline" className="text-[12.5px]" onClick={() => setS(Math.PI / 2)}>s = π/2</Button>
            <Button variant="outline" className="text-[12.5px]" onClick={() => setS(Math.PI)}>s = π</Button>
            <Button variant="outline" className="text-[12.5px]" onClick={() => setS(1)}>s = 1</Button>
          </div>
        </Panel>
        <RelatedPanel theorems={['exponentielle', 'algebre-lie-matricielle']} plates={[32, 33, 34, 40]} />
      </div>
    </div>
  );
}
