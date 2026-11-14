import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { THEOREM_CATALOG, WORLDS, CATALOG_BY_ID } from '@/content';
import { TRACKS } from '@/content/catalog';
import { cx, PageHeader, ProgressBar, SectionTitle } from '@/components/ui';
import { MathText } from '@/components/Math';
import { useGame } from '@/storage/store';
import { isUnlocked, theoremMastery, type TheoremMastery } from '@/core/progression/mastery';

const GLYPH: Record<TheoremMastery['status'] | 'verrouille', { glyph: string; label: string; color: string }> = {
  verrouille: { glyph: '⊘', label: 'Verrouillé', color: 'var(--text-3)' },
  nouveau: { glyph: '○', label: 'Accessible', color: 'var(--st-access)' },
  'en-cours': { glyph: '◐', label: 'En cours', color: 'var(--st-proved)' },
  maitrise: { glyph: '●', label: 'Maîtrisé', color: 'var(--st-hyp)' },
  fragile: { glyph: '△', label: 'Fragile', color: 'var(--st-miss)' },
};

export function MapPage() {
  const exercises = useGame((s) => s.save.exercises);
  const unlockAll = useGame((s) => s.save.settings.unlockAll);
  const now = useGame((s) => s.now);

  const [focus, setFocus] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const chips = useRef(new Map<string, HTMLAnchorElement>());
  const [lines, setLines] = useState<{ key: string; d: string; met: boolean }[]>([]);

  const state = useMemo(() => {
    const n = now();
    return new Map(
      THEOREM_CATALOG.map((t) => {
        const unlocked = isUnlocked(t.id, exercises, unlockAll);
        const mastery = theoremMastery(t.id, exercises, n);
        return [t.id, { unlocked, mastery }] as const;
      }),
    );
  }, [exercises, unlockAll, now]);

  // Le lien de dépendance n'est tracé que pour le résultat ciblé : la carte reste lisible.
  useLayoutEffect(() => {
    const host = root.current;
    if (!host || !focus) {
      setLines([]);
      return;
    }
    const entry = CATALOG_BY_ID.get(focus)!;
    const box = host.getBoundingClientRect();
    const target = chips.current.get(focus)!.getBoundingClientRect();
    const next = entry.requires.flatMap((r) => {
      const el = chips.current.get(r);
      if (!el) return [];
      const a = el.getBoundingClientRect();
      const x1 = a.left + a.width / 2 - box.left;
      const y1 = a.top + a.height / 2 - box.top;
      const x2 = target.left + target.width / 2 - box.left;
      const y2 = target.top + target.height / 2 - box.top;
      const my = (y1 + y2) / 2;
      const met = (state.get(r)?.mastery.solved ?? 0) > 0;
      return [{ key: r, d: `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`, met }];
    });
    setLines(next);
  }, [focus, state]);

  const focusEntry = focus ? CATALOG_BY_ID.get(focus) : undefined;
  const focusState = focus ? state.get(focus) : undefined;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-9">
      <PageHeader eyebrow="Parcours" title="Carte de la théorie">
        Chaque résultat s’ouvre lorsque les résultats dont dépend sa démonstration ont été travaillés. Survole ou parcours au
        clavier un résultat pour voir ses dépendances.
      </PageHeader>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_288px] gap-7">
        <div ref={root} className="relative">
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" aria-hidden>
            {lines.map((l) => (
              <path key={l.key} d={l.d} fill="none" stroke={l.met ? 'var(--st-hyp)' : 'var(--st-miss)'} strokeWidth={1.5} strokeDasharray={l.met ? undefined : '5 4'} />
            ))}
          </svg>
          <ol className="space-y-5">
            {WORLDS.map((w, wi) => {
              const items = THEOREM_CATALOG.filter((t) => t.world === w.n);
              const track = TRACKS.find((tr) => tr.id === w.track)!;
              const firstOfTrack = wi === 0 || WORLDS[wi - 1]!.track !== w.track;
              return (
                <li key={w.id} className="space-y-3">
                  {firstOfTrack && (
                    <div className="pt-2" data-track={track.id}>
                      <h2 className="font-serif text-2xl">Parcours : {track.title}</h2>
                      <p className="text-[13px] text-text-3">{track.subtitle}</p>
                    </div>
                  )}
                <div className="rounded-lg border border-line bg-surface p-4">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="font-mono text-xs text-text-3 whitespace-nowrap">Monde {toRoman(w.n)}</span>
                    <h2 className="font-serif text-lg leading-tight">{w.title}</h2>
                    <span className="hidden md:inline text-[13px] text-text-3 truncate">{w.subtitle}</span>
                  </div>
                  <ul className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
                    {items.map((t) => {
                      const s = state.get(t.id)!;
                      const key = !s.unlocked ? 'verrouille' : s.mastery.status;
                      const g = GLYPH[key];
                      return (
                        <li key={t.id}>
                          <Link
                            to={`/theoreme/${t.id}`}
                            ref={(el) => {
                              if (el) chips.current.set(t.id, el);
                              else chips.current.delete(t.id);
                            }}
                            onMouseEnter={() => setFocus(t.id)}
                            onMouseLeave={() => setFocus(null)}
                            onFocus={() => setFocus(t.id)}
                            onBlur={() => setFocus(null)}
                            className={cx(
                              'block rounded-md border border-line p-2.5 hover:border-line-strong transition-colors h-full',
                              !s.unlocked && 'opacity-70',
                            )}
                            data-theorem={t.id}
                            data-status={key}
                          >
                            <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                              <span className="text-text-3 tabular">{t.n}</span>
                              <span style={{ color: g.color }}>
                                <span aria-hidden>{g.glyph}</span> {g.label}
                              </span>
                            </div>
                            <div className="text-[13.5px] leading-tight min-h-[2.4em]">
                              <MathText text={t.name} />
                            </div>
                            <div className="mt-2">
                              <ProgressBar value={s.mastery.value} label={`Maîtrise : ${t.name}`} color={g.color} />
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                </li>
              );
            })}
          </ol>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-6 rounded-lg border border-line bg-surface p-4 min-h-44">
            {focusEntry && focusState ? (
              <div className="anim-rise">
                <SectionTitle className="mb-1">Résultat {focusEntry.n}</SectionTitle>
                <div className="font-serif text-lg leading-tight mb-2">
                  <MathText text={focusEntry.name} />
                </div>
                <p className="text-[13px] text-text-2 mb-3">
                  <MathText text={focusEntry.use} />
                </p>
                <SectionTitle className="mb-1">Dépend de</SectionTitle>
                {focusEntry.requires.length === 0 ? (
                  <p className="text-[13px] text-text-2">Aucun résultat du parcours.</p>
                ) : (
                  <ul className="text-[13px] space-y-0.5">
                    {focusEntry.requires.map((r) => {
                      const met = (state.get(r)?.mastery.solved ?? 0) > 0;
                      return (
                        <li key={r} style={{ color: met ? 'var(--st-hyp)' : 'var(--st-miss)' }}>
                          {met ? '◆' : '◇'} <MathText text={CATALOG_BY_ID.get(r)!.name} />
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ) : (
              <div className="text-[13px] text-text-2 space-y-3">
                <SectionTitle>Lecture de la carte</SectionTitle>
                <ul className="space-y-1">
                  {(Object.keys(GLYPH) as (keyof typeof GLYPH)[]).map((k) => (
                    <li key={k} style={{ color: GLYPH[k].color }}>
                      <span aria-hidden>{GLYPH[k].glyph}</span> {GLYPH[k].label}
                    </li>
                  ))}
                </ul>
                <Link to="/libre" className="block underline hover:text-text">
                  Tout ouvrir sans verrou : mode libre
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export function toRoman(n: number): string {
  if (!Number.isInteger(n) || n <= 0 || n >= 4000) return String(n);
  const table: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
    [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let out = '';
  let r = n;
  for (const [v, sym] of table) {
    while (r >= v) {
      out += sym;
      r -= v;
    }
  }
  return out;
}
