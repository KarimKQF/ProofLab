/**
 * Dictionnaire des notions : recherche insensible aux accents, filtre par domaine, fiche
 * complète (définition, compléments, notions préalables, usages dans le jeu).
 */
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DICO, DICO_BY_ID, DOMAIN_LABEL, DOMAIN_ORDER, searchDico, type DicoDomain, type ResolvedEntry } from '@/content/dictionnaire';
import { Card, cx, PageHeader } from '@/components/ui';
import { MathText } from '@/components/Math';
import { EntryView, TermChip } from '@/components/glossary/EntryView';

/** Notions préalables, de proche en proche (parcours en largeur, sans répétition). */
function learningPath(entry: ResolvedEntry): string[] {
  const out: string[] = [];
  const seen = new Set<string>([entry.id]);
  let frontier = entry.prerequisites ?? [];
  while (frontier.length) {
    const next: string[] = [];
    for (const id of frontier) {
      if (seen.has(id)) continue;
      seen.add(id);
      out.push(id);
      next.push(...(DICO_BY_ID.get(id)?.prerequisites ?? []));
    }
    frontier = next;
  }
  return out.reverse();
}

export function DictionaryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState<DicoDomain | 'tout'>('tout');
  const entry = id ? DICO_BY_ID.get(id) : undefined;

  useEffect(() => {
    if (entry) document.getElementById('fiche')?.scrollIntoView?.({ block: 'start' });
  }, [entry]);

  const list = useMemo(() => {
    const found = searchDico(query);
    return domain === 'tout' ? found : found.filter((e) => e.domain === domain);
  }, [query, domain]);

  const grouped = useMemo(() => {
    if (query.trim()) return [{ domain: null as DicoDomain | null, items: list }];
    return DOMAIN_ORDER.filter((d) => domain === 'tout' || d === domain).map((d) => ({
      domain: d as DicoDomain | null,
      items: list.filter((e) => e.domain === d).sort((a, b) => a.term.localeCompare(b.term, 'fr')),
    }));
  }, [list, query, domain]);

  const path = entry ? learningPath(entry) : [];

  return (
    <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-7" data-glossary-page>
      <PageHeader eyebrow="Référence" title="Dictionnaire">
        {DICO.length} notions, méthodes et résultats. Dans les énoncés du jeu, chaque notion soulignée en pointillé ouvre sa fiche ; ici, on les parcourt toutes.
      </PageHeader>

      <div className="grid gap-5 lg:grid-cols-[minmax(260px,340px)_minmax(0,1fr)]">
        <div className="space-y-3 lg:sticky lg:top-4 lg:self-start">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Chercher une notion…"
            aria-label="Chercher dans le dictionnaire"
            className="w-full rounded-md border border-line bg-surface px-3 py-2 text-[14px] outline-none focus:border-accent"
          />
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Domaine">
            {(['tout', ...DOMAIN_ORDER] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDomain(d)}
                aria-pressed={domain === d}
                data-domaine={d}
                className={cx(
                  'rounded-md border px-2 py-0.5 text-[12px] transition-colors cursor-pointer',
                  domain === d ? 'border-accent bg-accent text-[var(--bg)]' : 'border-line hover:border-line-strong',
                )}
              >
                {d === 'tout' ? 'Tout' : DOMAIN_LABEL[d]}
              </button>
            ))}
          </div>
          <Card className="max-h-[60vh] overflow-auto p-2 lg:max-h-[calc(100vh-14rem)]">
            {list.length === 0 && <p className="p-2 text-[13px] text-text-2">Aucune notion ne correspond.</p>}
            {grouped.map((g) =>
              g.items.length === 0 ? null : (
                <div key={g.domain ?? 'resultats-recherche'} className="mb-2">
                  {g.domain && <div className="px-2 pb-1 pt-2 font-mono text-[10.5px] uppercase tracking-wider text-text-3">{DOMAIN_LABEL[g.domain]}</div>}
                  <ul>
                    {g.items.map((e) => (
                      <li key={e.id}>
                        <Link
                          to={`/dictionnaire/${e.id}`}
                          className={cx('block rounded px-2 py-1 text-[13.5px] hover:bg-surface-2', e.id === id && 'bg-surface-2 text-accent')}
                          data-entree={e.id}
                        >
                          <MathText text={e.term} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </Card>
        </div>

        <div id="fiche" className="min-w-0">
          {entry ? (
            <Card className="p-5 md:p-6">
              <EntryView entry={entry} />
              {path.length > 0 && (
                <section className="mt-5 border-t border-line pt-4">
                  <h3 className="mb-2 font-mono text-[10.5px] uppercase tracking-wider text-text-3">Chemin pour y arriver</h3>
                  <ol className="flex flex-wrap items-center gap-1.5" data-testid="chemin">
                    {path.map((p) => (
                      <li key={p} className="flex items-center gap-1.5">
                        <TermChip id={p} />
                        <span aria-hidden className="text-text-3">→</span>
                      </li>
                    ))}
                    <li className="rounded-full border border-accent px-2.5 py-0.5 text-[12.5px] text-accent">
                      <MathText text={entry.term} />
                    </li>
                  </ol>
                </section>
              )}
            </Card>
          ) : id ? (
            <Card className="p-5">
              <p className="text-[14px]">Cette notion n’existe pas dans le dictionnaire.</p>
              <button type="button" className="mt-2 text-[13px] text-accent hover:underline cursor-pointer" onClick={() => navigate('/dictionnaire')}>
                Revenir au dictionnaire
              </button>
            </Card>
          ) : (
            <Card className="p-5 md:p-6 text-[14px] text-text-2 space-y-2">
              <p>Choisis une notion à gauche, ou clique un mot souligné en pointillé dans un énoncé du jeu.</p>
              <p>Chaque fiche donne une définition précise, puis des compléments : ce qu’il faut retenir, un exemple, un contre-exemple, un piège, et souvent la façon de le démontrer. Les notions préalables mènent, de proche en proche, aux bases.</p>
              <p>Les fiches « Résultats du jeu » reprennent l’énoncé et les hypothèses de chacun des 45 résultats ; « Logique et méthodes de preuve » sert de guide pour les démonstrations.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
