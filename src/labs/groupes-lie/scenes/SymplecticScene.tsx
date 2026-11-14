/**
 * Scène « Intégration symplectique » : plan des phases (q, p), courbes de niveau de H,
 * trajectoires et image d'un disque de conditions initiales par chaque schéma.
 */
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui';
import { MathViewStudio, type StudioView } from '@/components/math-visualizations/MathViewStudio';
import { SCHEMES, SYSTEMS, symplecticScene, type SystemId, type TrackId } from '@/core/visual-reasoning/lie-symplectic';
import { fmt, type SceneExplanations } from '@/core/visual-reasoning/types';
import { Curve, DraggablePoint, MathText, Panel, Plot, Slider } from '../../kit';
import { clipRuns, readoutViews, RelatedPanel } from '../common';

const EXPLANATIONS: SceneExplanations = {
  why: 'Dans le plan des phases, le flot exact déplace un disque de conditions initiales sans changer son aire (Liouville) et le laisse sur les niveaux de H. Chaque schéma fait de même, ou non : l’aire de l’image se mesure.',
  proofLink: 'La préservation de ω par le flot (formule de Cartan) et les déterminants 1 + h² et 1 des deux schémas d’Euler sont démontrés au résultat 45.',
  generalize: 'Un schéma symplectique conserve exactement la forme symplectique, donc les volumes ; il ne conserve pas H, mais, pour h petit, une fonction voisine de H : la dérive reste bornée sur des temps très longs.',
};

const EXACT_COLOR = '#9085e9';

export function SymplecticScene() {
  const [system, setSystem] = useState<SystemId>('oscillateur');
  const [h, setH] = useState(0.5);
  const [N, setN] = useState(24);
  const [r, setR] = useState(0.25);
  const [z0, setZ0] = useState<number[]>([1, 0]);
  const [shown, setShown] = useState<Record<TrackId, boolean>>({ exact: true, euler: true, symplectique: true, verlet: false });
  const data = useMemo(() => symplecticScene({ system, h, N, z0, r }), [system, h, N, z0, r]);
  const [q0, q1, p0, p1] = SYSTEMS[system].domain;
  const color = (id: TrackId) => (id === 'exact' ? EXACT_COLOR : SCHEMES.find((s) => s.id === id)!.color);
  const label = (id: TrackId) => (id === 'exact' ? (system === 'oscillateur' ? 'Flot exact' : 'Flot de référence') : SCHEMES.find((s) => s.id === id)!.label);

  const phase = (
    <div>
      <Plot xDomain={[q0, q1]} yDomain={[p0, p1]} width={620} height={Math.round((620 * (p1 - p0)) / (q1 - q0))} ariaLabel="Plan des phases (q, p)">
        {data.levels.map((c, i) => (
          <Curve key={`l${i}`} points={c.map((v) => [v[0]!, v[1]!] as [number, number])} color="var(--line-strong)" width={0.9} />
        ))}
        <Curve points={[...data.initialDisc, data.initialDisc[0]!].map((v) => [v[0]!, v[1]!] as [number, number])} color="var(--text-3)" width={1.2} dash="4 3" />
        {data.tracks
          .filter((t) => shown[t.id])
          .map((t) => {
            const end = t.escapedAt ?? t.points.length;
            const domain = SYSTEMS[system].domain;
            return (
              <g key={t.id} data-track={t.id}>
                {clipRuns(t.points.slice(0, end), domain).map((run, k) => (
                  <Curve key={k} points={run} color={color(t.id)} width={1.8} />
                ))}
                {clipRuns([...t.disc, t.disc[0]!], domain).map((run, k) => (
                  <Curve key={`d${k}`} points={run} color={color(t.id)} width={2.2} />
                ))}
              </g>
            );
          })}
        <DraggablePoint x={z0[0]!} y={z0[1]!} onChange={(a, b) => setZ0([a, b])} name="Condition initiale z₀" label="z₀" bounds={[q0, q1, p0, p1]} step={0.05} />
      </Plot>
      <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-text-3">
        {(['exact', ...SCHEMES.map((s) => s.id)] as TrackId[]).map((id) => (
          <span key={id}>
            <span style={{ color: color(id) }}>━</span> {label(id)}
          </span>
        ))}
        <span>Pointillé : disque initial ; contours colorés : son image après N pas.</span>
      </p>
    </div>
  );

  const table = (
    <div className="overflow-x-auto" data-testid="tableau-aires">
      <table className="w-full text-[13px] tabular [&_td]:pr-3 [&_th]:pr-3 [&_td:not(:first-child)]:whitespace-nowrap">
        <thead>
          <tr className="text-left text-text-3">
            <th className="font-normal py-1">Schéma</th>
            <th className="font-normal">det d’un pas</th>
            <th className="font-normal">Aire après N pas</th>
            <th className="font-normal">Dérive max de H</th>
          </tr>
        </thead>
        <tbody>
          {data.tracks.map((t) => (
            <tr key={t.id} className="border-t border-line" data-row={t.id}>
              <td className="py-1" style={{ color: color(t.id) }}>{label(t.id)}</td>
              <td>{fmt(t.detStep, 4)}</td>
              <td>{Number.isFinite(t.areaRatio) ? (Math.abs(t.areaRatio) >= 1e6 ? t.areaRatio.toExponential(2) : fmt(t.areaRatio, 4)) : 'débordement'}</td>
              <td>{Number.isFinite(t.drift) ? (t.drift >= 1e6 ? t.drift.toExponential(2) : fmt(t.drift, 4)) : 'débordement'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-[12px] text-text-3">
        <MathText text={String.raw`Valeurs numériques : jacobienne du pas en $z_0$ par différences centrées, aires par la formule du lacet sur un contour de 128 points. Pour le pendule, l'écart à $1$ du flot de référence mesure l'erreur de ce contour polygonal, non une perte d'aire.`} />
      </p>
    </div>
  );

  const views: StudioView[] = [
    { id: 'phase', title: 'Plan des phases', render: () => phase },
    { id: 'aires', title: 'Aires et dérive', render: () => table },
    ...readoutViews(data.readout),
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0">
        <MathViewStudio id="lie-symplectique" views={views} initial={['phase', 'aires']} explanations={EXPLANATIONS} weights={{ phase: 1.6, aires: 1 }} />
      </div>
      <div className="space-y-4">
        <Panel title="Système">
          <div className="flex flex-col gap-1.5" role="group" aria-label="Systèmes">
            {(Object.keys(SYSTEMS) as SystemId[]).map((id) => (
              <Button
                key={id}
                variant={system === id ? 'primary' : 'outline'}
                aria-pressed={system === id}
                onClick={() => {
                  setSystem(id);
                  setZ0(id === 'oscillateur' ? [1, 0] : [0.6, 0.4]);
                }}
                data-system={id}
                className="justify-start text-left text-[13px]"
              >
                <MathText text={SYSTEMS[id].label} />
              </Button>
            ))}
          </div>
        </Panel>
        <Panel title="Réglages">
          <div className="space-y-2">
            <Slider label="Pas h" value={h} min={0.05} max={2.4} step={0.05} onChange={setH} format={(v) => fmt(v, 2)} />
            <Slider label="Nombre de pas N" value={N} min={1} max={300} step={1} onChange={setN} format={(v) => fmt(v, 0)} />
            <Slider label="Rayon du disque" value={r} min={0.05} max={0.5} step={0.01} onChange={setR} format={(v) => fmt(v, 2)} />
            {(['exact', ...SCHEMES.map((s) => s.id)] as TrackId[]).map((id) => (
              <label key={id} className="flex items-center gap-2 text-[13px]">
                <input type="checkbox" checked={shown[id]} onChange={(e) => setShown((m) => ({ ...m, [id]: e.target.checked }))} data-toggle={id} />
                <span style={{ color: color(id) }}>■</span> {label(id)}
              </label>
            ))}
          </div>
        </Panel>
        <RelatedPanel theorems={['flot-hamiltonien', 'noether']} plates={[63, 66, 89]} />
      </div>
    </div>
  );
}
