import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DEFINITIONS, THEOREMS, CATALOG_BY_ID, WORLDS } from '@/content';
import { Card, PageHeader, pdfRef, SectionTitle } from '@/components/ui';
import { MathText, Prose } from '@/components/Math';
import { TermScope } from '@/components/glossary/context';
import { trackOfTheorem } from '@/content/dictionnaire';
import { THEOREM_MODULES } from '@/content';

/** Parcours de chaque définition du carnet (celui du résultat qui l'introduit). */
const DEF_TRACK = new Map(THEOREM_MODULES.flatMap((m) => m.definitions.map((d) => [d.id, trackOfTheorem(m.theorem.id)] as const)));
import { useGame } from '@/storage/store';
import { isUnlocked } from '@/core/progression/mastery';
import { toRoman } from './MapPage';

const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export function NotebookPage() {
  const exercises = useGame((s) => s.save.exercises);
  const unlockAll = useGame((s) => s.save.settings.unlockAll);
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<'theoremes' | 'definitions'>('theoremes');

  const q = normalize(query.trim());
  const theorems = useMemo(
    () => THEOREMS.filter((t) => !q || normalize(`${CATALOG_BY_ID.get(t.id)?.name ?? ''} ${t.statement}`).includes(q)),
    [q],
  );
  const definitions = useMemo(
    () => DEFINITIONS.filter((d) => !q || normalize(`${d.term} ${d.statement}`).includes(q)),
    [q],
  );

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-9">
      <PageHeader eyebrow="Référence" title="Carnet">
        Énoncés exacts, hypothèses et définitions. Un résultat verrouillé reste listé, mais son énoncé n’apparaît qu’une fois ouvert.
      </PageHeader>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex gap-1" role="tablist" aria-label="Rubriques">
          <button type="button" role="tab" aria-selected={tab === 'theoremes'} onClick={() => setTab('theoremes')} className={`rounded-md px-3 py-1.5 text-sm cursor-pointer ${tab === 'theoremes' ? 'bg-surface-3' : 'text-text-2 hover:bg-surface-2'}`}>Théorèmes</button>
          <button type="button" role="tab" aria-selected={tab === 'definitions'} onClick={() => setTab('definitions')} className={`rounded-md px-3 py-1.5 text-sm cursor-pointer ${tab === 'definitions' ? 'bg-surface-3' : 'text-text-2 hover:bg-surface-2'}`}>Définitions</button>
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher…"
          aria-label="Rechercher dans le carnet"
          className="flex-1 min-w-48 rounded-md border border-line-strong bg-surface-2 px-3 py-1.5 text-sm"
        />
      </div>

      {tab === 'theoremes' ? (
        <ul className="space-y-3">
          {theorems.map((t) => {
            const e = CATALOG_BY_ID.get(t.id)!;
            const open = isUnlocked(t.id, exercises, unlockAll);
            const w = WORLDS.find((x) => x.n === e.world)!;
            return (
              <li key={t.id}>
                <TermScope track={w.track}>
                <Card className="p-4">
                  <div className="flex flex-wrap justify-between gap-2 mb-1">
                    <Link to={`/theoreme/${t.id}`} className="font-serif text-[17px] hover:underline">
                      {e.n}. <MathText text={e.name} />
                    </Link>
                    <span className="font-mono text-[11px] text-text-3">Monde {toRoman(w.n)} · {pdfRef(e.pdfPage, e.doc ?? 'polycopie')}</span>
                  </div>
                  {open ? (
                    <>
                      <ul className="text-[13.5px] text-text-2 space-y-0.5 mb-1.5">
                        {t.hypotheses.map((h) => (
                          <li key={h.id}><MathText text={h.text} terms={{ exclude: [`resultat-${t.id}`] }} /></li>
                        ))}
                      </ul>
                      <Prose text={t.statement} className="text-[14.5px]" terms={{ exclude: [`resultat-${t.id}`] }} />
                    </>
                  ) : (
                    <p className="text-sm text-text-3">Énoncé masqué : ce résultat n’est pas encore ouvert.</p>
                  )}
                </Card>
                </TermScope>
              </li>
            );
          })}
        </ul>
      ) : (
        <Card className="p-5">
          <SectionTitle className="mb-3">Définitions ({definitions.length})</SectionTitle>
          <dl className="space-y-3">
            {definitions.map((d) => (
              <TermScope key={d.id} track={DEF_TRACK.get(d.id)}>
              <div>
                <dt className="font-medium"><MathText text={d.term} /></dt>
                <dd className="text-[14.5px] text-text-2">
                  <MathText text={d.statement} terms />
                  {d.source.doc !== 'complement' && <span className="ml-1.5 font-mono text-[11px] text-text-3">{pdfRef(d.source.pdfPage, d.source.doc)}</span>}
                </dd>
              </div>
              </TermScope>
            ))}
          </dl>
        </Card>
      )}
      {tab === 'theoremes' && theorems.length === 0 && <p className="text-text-2">Aucun résultat ne correspond.</p>}
    </div>
  );
}
