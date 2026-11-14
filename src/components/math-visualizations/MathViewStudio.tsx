/**
 * Math View Studio : une à trois vues côte à côte, redimensionnables sur ordinateur,
 * chacune agrandissable en plein écran. Toutes les vues reçoivent le même état
 * mathématique de la scène : le studio ne calcule rien lui-même.
 */
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Button, cx, SectionTitle } from '@/components/ui';
import { Prose } from '@/components/Math';
import type { SceneExplanations } from '@/core/visual-reasoning/types';

export interface StudioView {
  id: string;
  title: string;
  render: () => ReactNode;
}

const PREF_KEY = 'prooflab:studio:';

function readPref(id: string): string[] | null {
  try {
    const raw = localStorage.getItem(PREF_KEY + id);
    const v = raw ? (JSON.parse(raw) as unknown) : null;
    return Array.isArray(v) && v.every((x) => typeof x === 'string') ? (v as string[]) : null;
  } catch {
    return null;
  }
}

function writePref(id: string, views: string[]): void {
  try {
    localStorage.setItem(PREF_KEY + id, JSON.stringify(views));
  } catch {
    // Préférence d'affichage seulement : rien d'essentiel n'est perdu.
  }
}

export function MathViewStudio({
  id,
  views,
  initial,
  explanations,
  toolbar,
  weights,
}: {
  /** Identifiant stable, pour mémoriser la disposition choisie (préférence d'affichage, distincte de la progression). */
  id: string;
  views: StudioView[];
  initial: string[];
  explanations?: SceneExplanations;
  toolbar?: ReactNode;
  /** Poids relatifs des largeurs initiales (par exemple, la figure plus large que les équations). */
  weights?: Record<string, number>;
}) {
  const [active, setActive] = useState<string[]>(() => {
    const saved = readPref(id)?.filter((v) => views.some((w) => w.id === v));
    return saved && saved.length ? saved : initial;
  });
  const [widths, setWidths] = useState<number[]>([]);
  const [full, setFull] = useState<string | null>(null);
  const [explain, setExplain] = useState<keyof SceneExplanations | null>(null);
  const container = useRef<HTMLDivElement>(null);

  // Une vue peut disparaître (la coupe plane n'existe qu'en dimension 3) : on retombe alors sur la disposition initiale.
  const available = views.filter((v) => active.includes(v.id));
  const shown = full ? views.filter((v) => v.id === full) : available.length ? available : views.filter((v) => initial.includes(v.id));

  useEffect(() => writePref(id, active), [id, active]);
  // Largeurs initiales proportionnelles aux poids des vues affichées (1 par défaut).
  const shownKey = shown.map((v) => v.id).join('|');
  useEffect(() => {
    const w = shownKey.split('|').map((v) => weights?.[v] ?? 1);
    const total = w.reduce((s, v) => s + v, 0);
    setWidths(w.map((v) => v / total));
  }, [shownKey, weights]);

  const toggle = (v: string) =>
    setActive((a) => {
      if (a.includes(v)) return a.length > 1 ? a.filter((x) => x !== v) : a;
      return a.length >= 3 ? [...a.slice(1), v] : [...a, v];
    });

  // Poignée de redimensionnement entre deux vues (souris ou flèches du clavier).
  const startDrag = useCallback(
    (index: number) => (e: React.PointerEvent) => {
      const box = container.current?.getBoundingClientRect();
      if (!box) return;
      const startX = e.clientX;
      const start = [...widths];
      const move = (ev: PointerEvent) => {
        const delta = (ev.clientX - startX) / box.width;
        const a = Math.max(0.15, start[index]! + delta);
        const b = Math.max(0.15, start[index + 1]! - (a - start[index]!));
        const next = [...start];
        next[index] = start[index]! + start[index + 1]! - b;
        next[index + 1] = b;
        setWidths(next);
      };
      const up = () => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
    },
    [widths],
  );

  const nudge = (index: number, delta: number) =>
    setWidths((w) => {
      const next = [...w];
      const a = Math.min(Math.max(0.15, next[index]! + delta), next[index]! + next[index + 1]! - 0.15);
      next[index + 1] = next[index]! + next[index + 1]! - a;
      next[index] = a;
      return next;
    });

  useEffect(() => {
    if (!full) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setFull(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [full]);

  const explainLabels: Record<keyof SceneExplanations, string> = {
    why: 'Pourquoi cette représentation ?',
    proofLink: 'Voir le lien avec la démonstration',
    generalize: 'Généraliser',
  };

  return (
    <section className={cx('rounded-lg border border-line bg-surface', full && 'fixed inset-0 z-50 overflow-auto rounded-none')} data-studio={id}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-3 py-2">
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Vues affichées">
          <SectionTitle className="mr-1">Vues</SectionTitle>
          {views.map((v) => (
            <button
              key={v.id}
              type="button"
              aria-pressed={active.includes(v.id)}
              onClick={() => toggle(v.id)}
              className={cx(
                'rounded-md border px-2 py-1 text-[12.5px] cursor-pointer transition-colors',
                active.includes(v.id) ? 'border-accent text-text bg-surface-3' : 'border-line text-text-2 hover:bg-surface-2',
              )}
            >
              {v.title}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {toolbar}
          {explanations &&
            (Object.keys(explainLabels) as (keyof SceneExplanations)[]).map((k) => (
              <Button key={k} variant={explain === k ? 'primary' : 'ghost'} className="px-2 py-1 text-[12.5px]" aria-pressed={explain === k} onClick={() => setExplain(explain === k ? null : k)}>
                {explainLabels[k]}
              </Button>
            ))}
          {full ? (
            <Button className="px-2 py-1 text-[12.5px]" onClick={() => setFull(null)}>Quitter le plein écran</Button>
          ) : null}
        </div>
      </div>
      {explanations && explain && (
        <div className="border-b border-line px-4 py-3 text-[14px] anim-rise" role="note" data-testid={`explain-${explain}`}>
          <Prose text={explanations[explain]} />
        </div>
      )}
      <div ref={container} className={cx('flex flex-col gap-3 p-3 lg:flex-row lg:gap-0', full && 'min-h-[calc(100vh-3.5rem)]')}>
        {shown.map((v, i) => (
          <div key={v.id} className="contents">
            <div className="@container min-w-0 lg:px-2" style={{ flexBasis: full ? '100%' : `${(widths[i] ?? 1 / shown.length) * 100}%`, flexGrow: 0, flexShrink: 1 }} data-view={v.id}>
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <SectionTitle>{v.title}</SectionTitle>
                {!full && (
                  <button type="button" className="font-mono text-[11px] text-text-3 hover:text-text-2 underline cursor-pointer" onClick={() => setFull(v.id)} aria-label={`Agrandir la vue ${v.title}`}>
                    Plein écran
                  </button>
                )}
              </div>
              {v.render()}
            </div>
            {!full && i < shown.length - 1 && (
              <div
                role="separator"
                aria-orientation="vertical"
                aria-label="Redimensionner les vues"
                tabIndex={0}
                onPointerDown={startDrag(i)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowLeft') nudge(i, -0.05);
                  if (e.key === 'ArrowRight') nudge(i, 0.05);
                }}
                className="hidden lg:block w-1.5 shrink-0 cursor-col-resize rounded bg-line hover:bg-accent focus-visible:bg-accent"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
