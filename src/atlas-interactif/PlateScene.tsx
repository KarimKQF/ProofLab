/**
 * Mise en page commune d'une planche interactive : les panneaux de la planche (mêmes
 * titres que l'atlas), la bande « Identité », les réglages (« Manipuler ») et les
 * observations guidées (« Observer »), cochées dès que l'état de la figure les réalise.
 * Rien n'est écrit dans la progression : les coches ne vivent que le temps de la visite.
 */
import { useEffect, useState, type ReactNode } from 'react';
import { cx } from '@/components/ui';
import { MathText } from '@/components/Math';
import { Claim } from '@/labs/kit';

export interface PlatePanel {
  title: string;
  render: () => ReactNode;
  /** Occuper toute la largeur de la grille (par exemple une vue 3D sous deux figures 2D). */
  wide?: boolean;
}

export interface Observation {
  id: string;
  /** Texte mixte (français + LaTeX). */
  text: string;
  /** Vrai quand l'état courant de la figure réalise l'observation. */
  done: boolean;
}

export interface Reading {
  /** Libellé mixte. */
  label: string;
  /** Valeur (texte mixte). */
  value: string;
  status: 'exact' | 'numerique' | 'illustratif';
}

export function PlateScene({
  n,
  panels,
  identity,
  controls,
  observations,
  readings = [],
  note,
}: {
  n: number;
  panels: PlatePanel[];
  /** Identité de la planche, en LaTeX (texte mixte). */
  identity?: string;
  controls: ReactNode;
  observations: Observation[];
  readings?: Reading[];
  /** Précision sur ce qui est exact ou seulement illustratif. */
  note?: string;
}) {
  const [seen, setSeen] = useState<ReadonlySet<string>>(() => new Set());
  const doneKey = observations
    .filter((o) => o.done)
    .map((o) => o.id)
    .join('|');
  useEffect(() => {
    if (!doneKey) return;
    setSeen((prev) => {
      const ids = doneKey.split('|').filter((id) => !prev.has(id));
      return ids.length ? new Set([...prev, ...ids]) : prev;
    });
  }, [doneKey]);

  const narrow = panels.filter((p) => !p.wide).length;
  const cols = narrow >= 3 ? 'lg:grid-cols-3' : narrow === 2 ? 'lg:grid-cols-2' : '';
  const achieved = observations.filter((o) => seen.has(o.id) || o.done).length;

  return (
    <section className="space-y-3" data-plate-scene={n}>
      <div className={cx('grid gap-3', cols)}>
        {panels.map((p) => (
          <figure key={p.title} className={cx('min-w-0 rounded-lg border border-line bg-surface p-3', p.wide && 'col-span-full')} data-panel={p.title}>
            <figcaption className="mb-2 text-center text-[13px] font-semibold">
              <MathText text={p.title} />
            </figcaption>
            {p.render()}
          </figure>
        ))}
      </div>

      {identity && (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 rounded-lg border border-line bg-surface-2 px-4 py-2.5" data-identity>
          <span className="font-mono text-[11px] uppercase tracking-wider text-accent">Identité</span>
          <div className="min-w-0 overflow-x-auto text-[15px]">
            <MathText text={identity} />
          </div>
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        <section className="rounded-lg border border-line bg-surface p-4" aria-label="Manipuler">
          <h3 className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-text-3">Manipuler</h3>
          <div className="space-y-2.5">{controls}</div>
        </section>
        <section className="rounded-lg border border-line bg-surface p-4" aria-label="Observer">
          <h3 className="mb-2.5 flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-text-3">
            <span>Observer</span>
            <span className="tabular normal-case tracking-normal">
              {achieved} / {observations.length}
            </span>
          </h3>
          <ul className="space-y-1.5">
            {observations.map((o) => {
              const ok = seen.has(o.id) || o.done;
              return (
                <li key={o.id} className="flex gap-2 text-[13.5px]" data-observation={o.id} data-done={ok}>
                  <span aria-hidden className="mt-px w-4 shrink-0 text-center" style={{ color: ok ? 'var(--st-proved)' : 'var(--text-3)' }}>
                    {ok ? '✓' : '○'}
                  </span>
                  <span className={ok ? '' : 'text-text-2'}>
                    <MathText text={o.text} />
                    <span className="sr-only">{ok ? ' (observé)' : ' (à observer)'}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          {readings.length > 0 && (
            <dl className="mt-3 space-y-1 border-t border-line pt-2.5 text-[13px]" data-readings>
              {readings.map((r) => (
                <div key={r.label} className="flex flex-wrap items-baseline justify-between gap-x-3" data-reading={r.label} data-status={r.status}>
                  <dt className="flex items-baseline gap-1.5">
                    <MathText text={r.label} />
                    {r.status !== 'exact' && <Claim status={r.status} />}
                  </dt>
                  <dd className="tabular">
                    <MathText text={r.value} />
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </section>
      </div>
      {note && (
        <p className="text-[12px] text-text-3">
          <MathText text={note} />
        </p>
      )}
    </section>
  );
}
