/**
 * Panneaux synchronisés : équations, mesures, hypothèses, conclusions, et lecteur de
 * démonstration animée. Ils ne font qu'afficher la lecture d'une scène.
 */
import { useEffect, useState } from 'react';
import { Button, cx } from '@/components/ui';
import { MathText, Prose } from '@/components/Math';
import { Claim } from '@/labs/kit';
import { useGame } from '@/storage/store';
import {
  CONCLUSION_LABEL,
  HYPOTHESIS_LABEL,
  type ConclusionLine,
  type EquationLine,
  type HypothesisLine,
  type HypothesisState,
  type ConclusionState,
  type Measure,
} from '@/core/visual-reasoning/types';
import { STAGE_NOTICE, lastReachable, type StageView } from '@/core/visual-reasoning/proof-stages';

const STATUS_CLAIM = { exact: 'exact', numerique: 'numerique', illustratif: 'illustratif' } as const;

export function EquationsPanel({ equations }: { equations: EquationLine[] }) {
  return (
    <ul className="space-y-2.5" data-testid="equations">
      {equations.map((e) => (
        <li key={e.id} className="text-[14px]" data-equation={e.id} data-status={e.status}>
          <div className="overflow-x-auto overflow-y-hidden">
            <Prose text={e.tex} />
          </div>
          <div className="mt-0.5 flex flex-wrap items-baseline gap-2">
            <Claim status={STATUS_CLAIM[e.status]} />
            {e.note && <MathText className="text-[12px] text-text-3" text={e.note} />}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function MeasuresPanel({ measures }: { measures: Measure[] }) {
  return (
    <dl className="space-y-1.5 text-[13.5px]" data-testid="measures">
      {measures.map((m) => (
        <div key={m.id} data-measure={m.id} data-status={m.status}>
          <div className="flex items-baseline justify-between gap-3">
            <dt>
              <MathText text={m.label} />
              {m.status === 'numerique' && <span className="ml-1.5 font-mono text-[10px] uppercase text-miss">num.</span>}
            </dt>
            <dd className={cx('tabular', m.id.startsWith('ip') && (m.numeric ?? 0) > 1e-9 && 'text-invalid')}>
              <MathText text={m.value} />
            </dd>
          </div>
          {m.status === 'numerique' && m.method && <p className="text-[11.5px] text-text-3">{m.method}</p>}
        </div>
      ))}
    </dl>
  );
}

const HYP_COLOR: Record<HypothesisState, string> = {
  satisfaite: 'var(--st-hyp)',
  demontree: 'var(--st-proved)',
  supposee: 'var(--st-access)',
  'non-verifiee': 'var(--text-3)',
  absente: 'var(--st-miss)',
};

const CONC_COLOR: Record<ConclusionState, string> = {
  etablie: 'var(--st-proved)',
  illustrative: 'var(--text-3)',
  'non-garantie': 'var(--st-miss)',
  fausse: 'var(--st-invalid)',
};

export function HypothesesPanel({ hypotheses, conclusions }: { hypotheses: HypothesisLine[]; conclusions: ConclusionLine[] }) {
  return (
    <div className="space-y-4" data-testid="hypotheses">
      <ul className="space-y-2">
        {hypotheses.map((h) => (
          <li key={h.id} className="rounded-md border border-line p-2.5 text-[13.5px]" style={{ borderLeft: `3px solid ${HYP_COLOR[h.state]}` }} data-hypothesis={h.id} data-state={h.state}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <MathText text={h.label} />
              <span className="font-mono text-[11px]" style={{ color: HYP_COLOR[h.state] }}>
                {HYPOTHESIS_LABEL[h.state]}
              </span>
            </div>
            {h.detail && <p className="text-[12.5px] text-text-3 mt-0.5"><MathText text={h.detail} /></p>}
          </li>
        ))}
      </ul>
      <ul className="space-y-2">
        {conclusions.map((c) => (
          <li key={c.id} className="rounded-md border border-line p-2.5 text-[13.5px]" style={{ borderLeft: `3px solid ${CONC_COLOR[c.state]}` }} data-conclusion={c.id} data-state={c.state}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <MathText text={c.label} />
              <span className="font-mono text-[11px]" style={{ color: CONC_COLOR[c.state] }}>
                {CONCLUSION_LABEL[c.state]}
              </span>
            </div>
            {c.detail && <p className="text-[12.5px] text-text-3 mt-0.5"><MathText text={c.detail} /></p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Lecteur de démonstration : lecture, pause, étape suivante ou précédente, retour au début,
 * vitesse. En mode « preuve », seules les étapes établies dans le moteur de preuve sont
 * accessibles ; en mode « exploration », les autres s'affichent avec un avertissement.
 * Le lecteur ne modifie jamais la progression.
 */
export function ProofAnimator({
  stages,
  index,
  onIndex,
  mode,
  onMode,
}: {
  stages: StageView[];
  index: number;
  onIndex: (i: number) => void;
  mode: 'preuve' | 'exploration';
  onMode: (m: 'preuve' | 'exploration') => void;
}) {
  const reduce = useGame((s) => s.save.settings.reduceMotion);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const limit = mode === 'preuve' ? lastReachable(stages) : stages.length - 1;

  useEffect(() => {
    if (!playing) return;
    if (index >= limit) {
      setPlaying(false);
      return;
    }
    const h = setTimeout(() => onIndex(index + 1), (reduce ? 400 : 1600) / speed);
    return () => clearTimeout(h);
  }, [playing, index, limit, speed, reduce, onIndex]);

  useEffect(() => {
    if (index > limit) onIndex(Math.max(0, limit));
  }, [index, limit, onIndex]);

  const current = stages[index];
  return (
    <div className="space-y-3" data-testid="proof-animator">
      <div className="flex flex-wrap items-center gap-1.5">
        <Button className="px-2 py-1" onClick={() => onIndex(0)} aria-label="Revenir au début">⏮</Button>
        <Button className="px-2 py-1" disabled={index <= 0} onClick={() => onIndex(index - 1)} aria-label="Étape précédente">◀</Button>
        <Button className="px-2 py-1" variant={playing ? 'primary' : 'outline'} onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause' : 'Lecture'}>
          {playing ? '❚❚' : '▶'}
        </Button>
        <Button className="px-2 py-1" disabled={index >= limit} onClick={() => onIndex(index + 1)} aria-label="Étape suivante">▶▶</Button>
        <label className="ml-2 flex items-center gap-1.5 text-[12.5px] text-text-2">
          Vitesse
          <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="rounded border border-line-strong bg-surface-2 px-1.5 py-0.5">
            <option value={0.5}>×0,5</option>
            <option value={1}>×1</option>
            <option value={2}>×2</option>
          </select>
        </label>
        <div className="ml-auto flex gap-1" role="group" aria-label="Mode de lecture">
          <Button className="px-2 py-1 text-[12.5px]" variant={mode === 'preuve' ? 'primary' : 'ghost'} aria-pressed={mode === 'preuve'} onClick={() => onMode('preuve')}>Preuve</Button>
          <Button className="px-2 py-1 text-[12.5px]" variant={mode === 'exploration' ? 'primary' : 'ghost'} aria-pressed={mode === 'exploration'} onClick={() => onMode('exploration')}>Exploration</Button>
        </div>
      </div>
      <ol className="flex flex-wrap gap-1.5" aria-label="Étapes de la démonstration">
        {stages.map((s, i) => {
          const reachable = i <= limit;
          return (
            <li key={s.nodeId}>
              <button
                type="button"
                disabled={!reachable}
                onClick={() => onIndex(i)}
                aria-current={i === index ? 'step' : undefined}
                data-stage={s.nodeId}
                data-status={s.status}
                className={cx(
                  'rounded border px-2 py-1 text-[12px] font-mono cursor-pointer disabled:cursor-not-allowed disabled:opacity-40',
                  i === index ? 'border-accent bg-surface-3 text-text' : 'border-line text-text-2',
                )}
                style={{ borderLeft: `3px solid ${s.status === 'etablie' ? 'var(--st-proved)' : s.status === 'hypothese' ? 'var(--st-access)' : 'var(--text-3)'}` }}
              >
                {i + 1}. {s.title}
              </button>
            </li>
          );
        })}
      </ol>
      {current && (
        <div className="rounded-md border border-line p-3 text-[13.5px]" role="status" data-testid="stage-notice">
          <p className="font-medium">{index + 1}. {current.title}</p>
          <p className="text-text-2 mt-0.5">{current.visual}</p>
          <p className="mt-1.5 text-[12.5px]" style={{ color: current.status === 'illustration' ? 'var(--st-miss)' : current.status === 'etablie' ? 'var(--st-proved)' : 'var(--st-access)' }}>
            {STAGE_NOTICE[current.status]}
          </p>
        </div>
      )}
      {mode === 'preuve' && limit < stages.length - 1 && (
        <p className="text-[12.5px] text-text-3">
          Les étapes suivantes s’ouvrent à mesure que tu les établis dans la démonstration ci-dessous. Le mode Exploration les montre, signalées comme non démontrées.
        </p>
      )}
    </div>
  );
}
