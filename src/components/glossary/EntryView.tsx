/**
 * Fiche d'une entrée du dictionnaire, partagée par la bulle de définition (compacte) et la
 * page Dictionnaire (complète). Les notions citées restent cliquables : dans la bulle, elles
 * ouvrent leur propre fiche (avec retour) ; sur la page, elles y mènent.
 */
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { THEOREM_BY_ID } from '@/content';
import { CATALOG_BY_ID, THEOREM_CATALOG } from '@/content/catalog';
import {
  COMPLEMENT_LABEL,
  DICO_BY_ID,
  DOMAIN_LABEL,
  dependentsOf,
  usagesOf,
  type ComplementKind,
  type DicoTrack,
  type ResolvedEntry,
} from '@/content/dictionnaire';
import { MathText, Prose } from '@/components/Math';
import { TermScope } from './context';

const KIND_ORDER: ComplementKind[] = ['retenir', 'intuition', 'exemple', 'contre-exemple', 'attention', 'montrer'];
const KIND_COLOR: Record<ComplementKind, string> = {
  retenir: 'var(--st-proved)',
  intuition: 'var(--st-access)',
  exemple: 'var(--st-hyp)',
  'contre-exemple': 'var(--st-invalid)',
  attention: 'var(--st-miss)',
  montrer: 'var(--accent)',
};

const CONCLUSION_LABEL: Record<string, string> = {
  existence: 'Existence',
  unicite: 'Unicité',
  regularite: 'Régularité',
  stabilite: 'Stabilité',
  autre: 'Autre conclusion',
};

/** Pastille cliquable vers une autre entrée (intitulé de l'entrée, ou `label` court). */
export function TermChip({ id, track, label }: { id: string; track?: DicoTrack; label?: string }) {
  const e = DICO_BY_ID.get(id);
  if (!e) return null;
  return (
    <span
      role="button"
      tabIndex={0}
      data-term={id}
      data-track={track}
      title={label ? `Fiche : ${e.term.replace(/\$/g, '')}` : undefined}
      aria-label={label ? `Fiche du dictionnaire : ${e.term.replace(/\$/g, '')}` : undefined}
      className="inline-flex items-center rounded-full border border-line px-2.5 py-0.5 text-[12.5px] hover:border-accent hover:text-accent cursor-pointer"
    >
      {label ?? <MathText text={e.term} />}
    </span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-3.5">
      <h3 className="mb-1.5 font-mono text-[10.5px] uppercase tracking-wider text-text-3">{title}</h3>
      {children}
    </section>
  );
}

export function EntryView({ entry, compact = false, track }: { entry: ResolvedEntry; compact?: boolean; track?: DicoTrack }) {
  const usages = useMemo(() => usagesOf(entry.id), [entry.id]);
  const theorem = entry.theoremId ? THEOREM_BY_ID.get(entry.theoremId) : undefined;
  const cat = entry.theoremId ? CATALOG_BY_ID.get(entry.theoremId) : undefined;
  const toolUsers = entry.toolId ? THEOREM_CATALOG.filter((c) => c.tools?.includes(entry.toolId!)) : [];
  const dependents = compact ? [] : dependentsOf(entry.id);
  const shownUsages = compact ? usages.slice(0, 6) : usages;
  const complements = [...entry.complements].sort((a, b) => KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind));
  const scopeTrack = entry.track ?? track;

  return (
    <TermScope track={scopeTrack}>
      <article data-entry={entry.id}>
        <div className="mb-1 flex flex-wrap items-center gap-2 font-mono text-[10.5px] uppercase tracking-wider text-text-3">
          <span>{DOMAIN_LABEL[entry.domain]}</span>
          {entry.track && <span className="rounded border border-line px-1.5 py-px normal-case tracking-normal">{entry.track === 'lie' ? 'Géométrie de Lie' : 'Analyse et EDP'}</span>}
          {cat && <span className="normal-case tracking-normal">Résultat {cat.n}</span>}
        </div>
        <h2 className={compact ? 'font-serif text-[19px] leading-snug' : 'font-serif text-[26px] leading-tight'} id={`entree-${entry.id}`}>
          <MathText text={entry.term} />
        </h2>
        {entry.notation && (
          <p className="mt-1 text-[14px] text-text-2">
            <MathText text={entry.notation} />
          </p>
        )}

        <Section title={theorem ? 'Énoncé' : entry.domain === 'methodes' ? 'Principe' : 'Définition'}>
          <Prose text={entry.definition} terms={{ exclude: [entry.id] }} className="text-[14.5px]" />
        </Section>

        {theorem && (
          <>
            <Section title="Hypothèses">
              <ul className="space-y-1 text-[13.5px]">
                {theorem.hypotheses.map((h) => (
                  <li key={h.id} className="flex gap-2">
                    <span aria-hidden className="text-hyp">•</span>
                    <MathText text={h.text} terms={{ exclude: [entry.id] }} />
                  </li>
                ))}
              </ul>
            </Section>
            {Object.entries(theorem.conclusions).some(([, v]) => v) && (
              <Section title="Ce que le résultat affirme">
                <dl className="space-y-1 text-[13.5px]">
                  {Object.entries(theorem.conclusions)
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                      <div key={k}>
                        <dt className="inline font-semibold">{CONCLUSION_LABEL[k] ?? k} : </dt>
                        <dd className="inline">
                          <MathText text={v!} terms={{ exclude: [entry.id] }} />
                        </dd>
                      </div>
                    ))}
                </dl>
              </Section>
            )}
            <p className="mt-3">
              <Link to={`/theoreme/${theorem.id}`} className="text-[13px] text-accent hover:underline">
                Ouvrir la fiche du résultat {cat?.n} →
              </Link>
            </p>
          </>
        )}

        {complements.length > 0 && (
          <div className="mt-3.5 space-y-2">
            {complements.map((c, i) => (
              <div key={i} className="rounded-md border border-line px-3 py-2" style={{ borderLeft: `3px solid ${KIND_COLOR[c.kind]}` }} data-complement={c.kind}>
                <div className="mb-0.5 font-mono text-[10.5px] uppercase tracking-wider" style={{ color: KIND_COLOR[c.kind] }}>
                  {COMPLEMENT_LABEL[c.kind]}
                </div>
                <Prose text={c.text} terms={{ exclude: [entry.id] }} className="text-[13.5px]" />
              </div>
            ))}
          </div>
        )}

        {(entry.prerequisites?.length ?? 0) > 0 && (
          <Section title="À connaître d’abord">
            <div className="flex flex-wrap gap-1.5">
              {entry.prerequisites!.map((id) => (
                <TermChip key={id} id={id} track={scopeTrack} />
              ))}
            </div>
          </Section>
        )}

        {(entry.related?.length ?? 0) > 0 && (
          <Section title="Voir aussi">
            <div className="flex flex-wrap gap-1.5">
              {entry.related!.map((id) => (
                <TermChip key={id} id={id} track={scopeTrack} />
              ))}
            </div>
          </Section>
        )}

        {toolUsers.length > 0 && (
          <Section title="Outil admis, invoqué par">
            <div className="flex flex-wrap gap-1.5 text-[13px]">
              {toolUsers.map((c) => (
                <Link key={c.id} to={`/theoreme/${c.id}`} className="rounded-full border border-line px-2.5 py-0.5 hover:border-accent hover:text-accent">
                  {c.n}. <MathText text={c.name} />
                </Link>
              ))}
            </div>
          </Section>
        )}

        {shownUsages.length > 0 && (
          <Section title="Dans le jeu">
            <ul className="space-y-0.5 text-[13px]" data-testid="usages">
              {shownUsages.map((u) => {
                const c = CATALOG_BY_ID.get(u.theoremId);
                return (
                  <li key={u.theoremId} className="flex items-baseline justify-between gap-3">
                    <Link to={`/theoreme/${u.theoremId}`} className="hover:text-accent hover:underline">
                      {c?.n}. <MathText text={c?.name ?? u.theoremId} />
                    </Link>
                    <span className="shrink-0 font-mono text-[11px] text-text-3">{u.count} mention{u.count > 1 ? 's' : ''}</span>
                  </li>
                );
              })}
            </ul>
            {compact && usages.length > shownUsages.length && (
              <p className="mt-1 text-[12px] text-text-3">et {usages.length - shownUsages.length} autre{usages.length - shownUsages.length > 1 ? 's' : ''} résultat{usages.length - shownUsages.length > 1 ? 's' : ''}.</p>
            )}
          </Section>
        )}

        {dependents.length > 0 && (
          <Section title="Notions qui s’appuient sur celle-ci">
            <div className="flex flex-wrap gap-1.5">
              {dependents.map((d) => (
                <TermChip key={d.id} id={d.id} track={scopeTrack} />
              ))}
            </div>
          </Section>
        )}
      </article>
    </TermScope>
  );
}
