/**
 * Scène « Commutateur de flots » : déplace p, règle t, observe le chemin X, Y, −X, −Y et
 * l'écart C_t(p) − p comparé à t²[X,Y]_p ; tableau des restes quand t est divisé par 2.
 */
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui';
import { MathViewStudio, type StudioView } from '@/components/math-visualizations/MathViewStudio';
import { commutatorScene, FIELD_PAIRS, pairById } from '@/core/visual-reasoning/lie-commutator';
import { fmt } from '@/core/visual-reasoning/types';
import type { SceneExplanations } from '@/core/visual-reasoning/types';
import { Claim, Curve, Dot, DraggablePoint, MathText, Panel, Plot, Segment, Slider } from '../../kit';
import { clipRuns, LIE_COLORS, Quiver, readoutViews, RelatedPanel } from '../common';

const EXPLANATIONS: SceneExplanations = {
  why: 'Le crochet mesure le défaut de fermeture du chemin « X pendant t, Y pendant t, X à rebours, Y à rebours ». Le dessin montre ce défaut ; les mesures le comparent à t²[X,Y]_p.',
  proofLink: 'Le développement C_t(p) = p + t²[X,Y]_p + O(t³) est l’exercice difficile du résultat 36 : développements de Taylor à l’ordre 2 des quatre flots, puis lemme de Schwarz. La scène ne le démontre pas.',
  generalize: 'Sur une variété, en coordonnées locales, la même formule vaut ; [X,Y] = 0 équivaut à la commutation des flots (pour des champs complets), et le théorème de Frobenius s’en déduit.',
};

export function CommutatorScene() {
  const [pairId, setPairId] = useState(FIELD_PAIRS[0]!.id);
  const pair = pairById(pairId);
  const [p, setP] = useState(pair.p0);
  const [t, setT] = useState(pair.t0);
  const [showX, setShowX] = useState(true);
  const [showY, setShowY] = useState(true);
  const data = useMemo(() => commutatorScene({ pairId, p, t }), [pairId, p, t]);
  const [x0, x1, y0, y1] = pair.domain;

  const choose = (id: string) => {
    const next = pairById(id);
    setPairId(id);
    setP(next.p0);
    setT(next.t0);
  };

  const legColors = [LIE_COLORS.X, LIE_COLORS.Y, LIE_COLORS.X, LIE_COLORS.Y];
  const figure = (
    <div>
      <Plot xDomain={[x0, x1]} yDomain={[y0, y1]} width={620} height={Math.round((620 * (y1 - y0)) / (x1 - x0))} ariaLabel="Chemin du commutateur de flots dans le plan">
        {showX && <Quiver F={pair.X} domain={pair.domain} color={LIE_COLORS.X} shift={0.3} />}
        {showY && <Quiver F={pair.Y} domain={pair.domain} color={LIE_COLORS.Y} shift={0.7} />}
        {data.legs.flatMap((leg, i) =>
          clipRuns(leg, pair.domain).map((run, k) => <Curve key={`${i}-${k}`} points={run} color={legColors[i]} width={2.6} dash={i >= 2 ? '6 4' : undefined} />),
        )}
        <Segment a={[p[0]!, p[1]!]} b={[data.predicted[0]!, data.predicted[1]!]} color={LIE_COLORS.predicted} width={2} arrow />
        <Dot x={data.predicted[0]!} y={data.predicted[1]!} r={5} color={LIE_COLORS.predicted} label="p + t²[X,Y]" dx={10} dy={16} />
        <Dot x={data.end[0]!} y={data.end[1]!} r={5} color={LIE_COLORS.bracket} label="Cₜ(p)" />
        <DraggablePoint x={p[0]!} y={p[1]!} onChange={(a, b) => setP([a, b])} name="Point p" label="p" bounds={[x0, x1, y0, y1]} step={0.05} />
      </Plot>
      <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-text-3">
        <span><span style={{ color: LIE_COLORS.X }}>━</span> flot de X (pointillé : à rebours)</span>
        <span><span style={{ color: LIE_COLORS.Y }}>━</span> flot de Y</span>
        <span><span style={{ color: LIE_COLORS.predicted }}>➝</span> t²[X,Y]_p</span>
        <Claim status={data.exactFlows ? 'exact' : 'numerique'}>{data.exactFlows ? 'flots en forme close' : 'flot de X intégré par Runge–Kutta'}</Claim>
      </p>
    </div>
  );

  const order = (
    <div className="space-y-2" data-testid="ordre">
      <p className="text-[13px] text-text-2">
        <MathText text={String.raw`Reste $e(t)=|C_t(p)-p-t^2[X,Y]_p|$. Un reste d'ordre $3$ est divisé par $8$ quand $t$ est divisé par $2$.`} />
      </p>
      <table className="w-full text-[13px] tabular">
        <thead>
          <tr className="text-text-3 text-left">
            <th className="font-normal py-1">t</th>
            <th className="font-normal">e(t)</th>
            <th className="font-normal">e(t) / e(t/2)</th>
          </tr>
        </thead>
        <tbody>
          {data.orders.map((o) => (
            <tr key={o.t} className="border-t border-line">
              <td className="py-1">{fmt(o.t, 4)}</td>
              <td>{data.remainderZero ? '0' : o.err.toExponential(3).replace('.', ',')}</td>
              <td>{o.ratio === null ? '—' : fmt(o.ratio, 3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.remainderZero && <p className="text-[12.5px] text-text-3">Pour ce couple, le reste est nul à l’arrondi près : la formule est exacte.</p>}
    </div>
  );

  const views: StudioView[] = [
    { id: 'figure', title: 'Chemin du commutateur', render: () => figure },
    { id: 'ordre', title: 'Ordre du reste', render: () => order },
    ...readoutViews(data.readout),
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0">
        <MathViewStudio id="lie-commutateur" views={views} initial={['figure', 'equations']} explanations={EXPLANATIONS} weights={{ figure: 1.6, equations: 1.1 }} />
      </div>
      <div className="space-y-4">
        <Panel title="Couple de champs">
          <div className="flex flex-col gap-1.5" role="group" aria-label="Couples de champs">
            {FIELD_PAIRS.map((f) => (
              <Button key={f.id} variant={pairId === f.id ? 'primary' : 'outline'} aria-pressed={pairId === f.id} onClick={() => choose(f.id)} data-pair={f.id} className="justify-start text-left text-[13px]">
                <MathText text={f.label} />
              </Button>
            ))}
          </div>
        </Panel>
        <Panel title="Réglages">
          <div className="space-y-2">
            <Slider label="Temps t" value={t} min={0.05} max={1.2} step={0.01} onChange={setT} format={(v) => fmt(v, 2)} />
            <label className="flex items-center gap-2 text-[13px]">
              <input type="checkbox" checked={showX} onChange={(e) => setShowX(e.target.checked)} /> Champ X
            </label>
            <label className="flex items-center gap-2 text-[13px]">
              <input type="checkbox" checked={showY} onChange={(e) => setShowY(e.target.checked)} /> Champ Y
            </label>
            <Button variant="outline" className="w-full text-[13px]" onClick={() => setP(pair.p0)}>Replacer p</Button>
          </div>
        </Panel>
        <RelatedPanel theorems={['crochet-lie', 'frobenius']} plates={[7, 8]} />
      </div>
    </div>
  );
}
