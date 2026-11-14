/**
 * Studio « modes de convergence » du laboratoire C : une suite (uₙ), un rang n animable,
 * un point x₀ ; vues graphe, cascade 3D (n en profondeur), coupes (à x fixé, et quantités
 * exactes en fonction de n), tableau des quatre modes, surface uₙ(x, y). Toutes les vues
 * lisent le même état ; aucune n'écrit dans la progression.
 */
import { lazy, useEffect, useMemo, useState } from 'react';
import { Button, cx } from '@/components/ui';
import { MODE_EXAMPLES, MODE_LABEL, SIN_SIN_NORM_SQ, sinSin, type ModeExample, type ModeId } from '@/core/visual-reasoning/convergence-modes';
import { sampleGrid } from '@/core/visual-reasoning/sections';
import { fmt } from '@/core/visual-reasoning/types';
import { MathViewStudio, type StudioView } from '@/components/math-visualizations/MathViewStudio';
import { Scene3DGate } from '@/components/math-visualizations/Scene3DGate';
import { useGame } from '@/storage/store';
import { Claim, Curve, Dot, fr, MathText, Plot, Segment, Slider, sample } from '@/labs/kit';
import { LevelMap } from '../sobolev/SobolevViews';

const Cascade3D = lazy(() => import('./Cascade3D'));
const SinSin3D = lazy(() => import('./SinSin3D'));

const MODES: ModeId[] = ['pp', 'mesure', 'forte', 'faible'];
const N_MAX = 64;

function SeriesPlot({ title, values, color, yMax, ariaLabel }: { title: string; values: number[]; color: string; yMax?: number; ariaLabel: string }) {
  const hi = yMax ?? Math.max(1e-9, ...values.map((v) => Math.abs(v)));
  const lo = Math.min(0, ...values);
  return (
    <figure>
      <figcaption className="mb-0.5 text-[12.5px]">
        <MathText text={title} />
      </figcaption>
      <Plot xDomain={[0, values.length + 1]} yDomain={[lo - 0.08 * (hi - lo || 1), hi * 1.1 || 1]} height={210} ariaLabel={ariaLabel}>
        {values.map((v, i) => (
          <Dot key={i} x={i + 1} y={Math.max(lo, Math.min(hi * 1.1, v))} r={2.6} color={color} />
        ))}
      </Plot>
    </figure>
  );
}

export function ModesStudio() {
  const reduce = useGame((s) => s.save.settings.reduceMotion);
  const theme = useGame((s) => s.save.settings.theme);
  const [id, setId] = useState('machine');
  const [n, setN] = useState(5);
  const [x0, setX0] = useState(0.3);
  const [eps, setEps] = useState(0.5);
  const [playing, setPlaying] = useState(false);
  const [mode, setMode] = useState<ModeId>('pp');
  const ex: ModeExample = MODE_EXAMPLES.find((e) => e.id === id)!;

  useEffect(() => {
    if (!playing) return;
    if (n >= N_MAX) {
      setPlaying(false);
      return;
    }
    const h = setTimeout(() => setN((k) => k + 1), reduce ? 120 : 450);
    return () => clearTimeout(h);
  }, [playing, n, reduce]);

  const ks = useMemo(() => Array.from({ length: Math.max(n, 8) }, (_, i) => i + 1), [n]);
  const yHi = Math.max(1.2, Math.min(ex.sup(n), 20) * 1.1);
  const curve = useMemo(() => sample((x) => ex.evaluate(n, x), 0, 1, 800), [ex, n]);
  const sinSinGrid = useMemo(() => sampleGrid(sinSin(Math.min(n, 12)), 61, [0, 1], [0, 1], `sinsin:${Math.min(n, 12)}`), [n]);

  const graph = (
    <div data-testid="modes-graph">
      <Plot xDomain={[0, 1]} yDomain={[-yHi, yHi]} height={320} ariaLabel={`Graphe de u_n pour n = ${n}`}>
        <Curve points={sample(ex.candidateFn, 0, 1, 10)} color="var(--text-3)" dash="5 5" />
        <Curve points={curve.map(([x, y]) => [x, Math.max(-yHi, Math.min(yHi, y))] as [number, number])} color="var(--st-access)" />
        <Segment a={[x0, -yHi]} b={[x0, yHi]} color="var(--st-miss)" dash="3 4" />
        <Dot x={x0} y={Math.max(-yHi, Math.min(yHi, ex.evaluate(n, x0)))} r={4} color="var(--st-miss)" />
      </Plot>
      <p className="mt-1 text-[12.5px] text-text-3">
        Trait : uₙ pour n = {n}. Tirets : limite candidate <MathText text={`$${ex.candidate}$`} />. {ex.sup(n) > 20 ? 'Hauteur tronquée à l’affichage.' : ''}
      </p>
    </div>
  );

  const cuts = (
    <div className="space-y-3" data-testid="modes-cuts">
      <SeriesPlot title={String.raw`Coupe à $x=x_0$ fixé : $k\mapsto u_k(x_0)$ (convergence ponctuelle)`} values={ks.map((k) => ex.evaluate(k, x0))} color="var(--st-miss)" ariaLabel="Valeurs de u_k au point x0" />
      <div className="grid gap-3 @lg:grid-cols-3">
        <SeriesPlot title={String.raw`$\|u_k-u\|^2$ (forte)`} values={ks.map((k) => ex.distSq(k))} color="var(--st-access)" ariaLabel="Distance au carré à la limite candidate" />
        <SeriesPlot title={String.raw`$\mu\{|u_k-u|>\varepsilon\}$ (mesure)`} values={ks.map((k) => ex.measureAbove(k, eps))} color="var(--st-proved)" yMax={1} ariaLabel="Mesure de l’ensemble où l’écart dépasse epsilon" />
        <SeriesPlot title={String.raw`$\int_0^1u_k$ (faible, $g=1$)`} values={ks.map((k) => ex.pairing(k))} color="var(--div-pos)" ariaLabel="Intégrale contre la fonction test 1" />
      </div>
      <Claim status="exact">Chaque point est une formule fermée ; aucune suite finie de points ne démontre une limite.</Claim>
    </div>
  );

  const table = (
    <div className="space-y-3" data-testid="modes-table">
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left text-text-3">
              <th className="font-normal pr-2">Suite</th>
              {MODES.map((m) => (
                <th key={m} className="font-normal pr-2">{MODE_LABEL[m]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MODE_EXAMPLES.map((e) => (
              <tr key={e.id} className={cx(e.id === id && 'bg-surface-3')} data-mode-row={e.id}>
                <td className="pr-2 py-1">
                  <button type="button" className="text-left cursor-pointer underline-offset-2 hover:underline" onClick={() => setId(e.id)}>
                    <MathText text={`$${e.label}$`} />
                  </button>
                </td>
                {MODES.map((m) => (
                  <td key={m} className="pr-2" data-mode={m} data-holds={e.modes[m].holds}>
                    <button type="button" onClick={() => (setId(e.id), setMode(m))} className={cx('font-mono cursor-pointer', e.modes[m].holds ? 'text-hyp' : 'text-miss')} aria-label={`${MODE_LABEL[m]} : ${e.modes[m].holds ? 'oui' : 'non'}, voir la justification`}>
                      {e.modes[m].holds ? 'oui' : 'non'}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="rounded-md border border-line p-3 text-[13.5px]" data-testid="mode-why">
        <p className="mb-1 font-medium">
          <MathText text={`$${ex.label}$`} /> — convergence {MODE_LABEL[mode]} : {ex.modes[mode].holds ? 'oui' : 'non'}
        </p>
        <MathText text={ex.modes[mode].why} />
        {ex.remark && (
          <p className="mt-2 text-text-2">
            <MathText text={ex.remark} />
          </p>
        )}
      </div>
      <Claim status="exact">Verdicts justifiés analytiquement, indépendamment des figures.</Claim>
    </div>
  );

  const views: StudioView[] = [
    { id: 'graphe', title: 'Graphe', render: () => graph },
    {
      id: 'cascade',
      title: 'Cascade (n en profondeur)',
      render: () => (
        <div>
          <Scene3DGate fallback={cuts}>
            <Cascade3D ex={ex} n={Math.min(Math.max(n, 6), 24)} x0={x0} theme={theme} />
          </Scene3DGate>
          <p className="mt-1 text-[12.5px] text-text-3">Chaque courbe est un uₖ (k en profondeur) ; la ligne orange relie les valeurs uₖ(x₀) : c’est la coupe à x fixé. Hauteurs tronquées à l’affichage.</p>
        </div>
      ),
    },
    { id: 'coupes', title: 'Coupes et quantités', render: () => cuts },
    { id: 'tableau', title: 'Quatre modes', render: () => table },
    {
      id: 'surface',
      title: 'Surface uₙ(x, y)',
      render: () => (
        <div data-testid="sinsin">
          <Scene3DGate fallback={<LevelMap grid={sinSinGrid} state={null} grad={null} highlight={null} />}>
            <SinSin3D grid={sinSinGrid} />
          </Scene3DGate>
          <p className="mt-1 text-[12.5px] text-text-2">
            <MathText text={String.raw`$u_n(x,y)=\sin(n\pi x)\sin(n\pi y)$ pour $n=${Math.min(n, 12)}$ : $\|u_n\|^2_{L^2(\Omega)}=\tfrac14=${fmt(SIN_SIN_NORM_SQ)}$ pour tout $n$, et $u_n\rightharpoonup0$ (même argument qu'en dimension 1, sur la base $\sin(k\pi x)\sin(l\pi y)$). Les oscillations se resserrent sans que la norme ne diminue.`} />
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-3" data-testid="modes-studio">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Suite étudiée (modes de convergence)">
          {MODE_EXAMPLES.map((e) => (
            <Button key={e.id} className="px-2 py-1 text-[12.5px]" variant={id === e.id ? 'primary' : 'outline'} aria-pressed={id === e.id} onClick={() => setId(e.id)} data-mode-example={e.id}>
              <MathText text={`$${e.label}$`} />
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-[auto_1fr_1fr_1fr] sm:items-end">
        <Button className="px-2 py-1" onClick={() => (n >= N_MAX ? (setN(1), setPlaying(true)) : setPlaying((p) => !p))} aria-label={playing ? 'Pause' : 'Animer en n'}>
          {playing ? '❚❚' : '▶'}
        </Button>
        <Slider label="Rang n" value={n} min={1} max={N_MAX} step={1} onChange={(v) => setN(Math.round(v))} />
        <Slider label="Point x₀" value={x0} min={0.01} max={0.99} step={0.01} onChange={setX0} format={(v) => fr(v, 2)} />
        <Slider label="Seuil ε (mesure)" value={eps} min={0.05} max={0.95} step={0.05} onChange={setEps} format={(v) => fr(v, 2)} />
      </div>
      <MathViewStudio id="convergences-modes" views={views} initial={['graphe', 'coupes']} weights={{ graphe: 1.2, coupes: 1.3, cascade: 1.4, tableau: 1.3, surface: 1.4 }} />
    </div>
  );
}
