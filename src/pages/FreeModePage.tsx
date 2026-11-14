/**
 * Mode libre : expérimenter sans verrou ni statistiques. Le bac à sable contrôle la
 * STRUCTURE d'un raisonnement (dépendances, cycles, ancrage dans des hypothèses) ; il
 * ne dit rien de la vérité des assertions, qui sont des textes libres.
 */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { THEOREM_CATALOG, WORLDS, exercisesOf } from '@/content';
import { LEVEL_LABEL } from '@/content/schema';
import { Button, Card, LinkButton, PageHeader, SectionTitle, cx } from '@/components/ui';
import { MathText } from '@/components/Math';
import { findCycles, type PlayerGraph } from '@/core/proof-engine/engine';
import { LAB_LIST } from './LabsPage';
import { toRoman } from './MapPage';

interface SandboxNode {
  id: string;
  text: string;
  given: boolean;
  premises: string[];
  justification: string;
}

export function FreeModePage() {
  const [nodes, setNodes] = useState<SandboxNode[]>([
    { id: 'n1', text: String.raw`$H$ est un espace de Hilbert.`, given: true, premises: [], justification: '' },
  ]);
  const [draft, setDraft] = useState('');
  const [isGiven, setIsGiven] = useState(false);
  const [counter, setCounter] = useState(2);

  const report = useMemo(() => {
    const graph: PlayerGraph = {
      placed: nodes.map((n) => n.id),
      steps: Object.fromEntries(nodes.map((n) => [n.id, { premises: n.premises, justification: n.justification || null }])),
    };
    const cycles = findCycles(graph);
    const inCycle = new Set(cycles.flat());
    const anchored = new Set(nodes.filter((n) => n.given).map((n) => n.id));
    let changed = true;
    while (changed) {
      changed = false;
      for (const n of nodes) {
        if (!n.given && !anchored.has(n.id) && !inCycle.has(n.id) && n.premises.length > 0 && n.justification.trim() && n.premises.every((p) => anchored.has(p))) {
          anchored.add(n.id);
          changed = true;
        }
      }
    }
    return { cycles, anchored, inCycle };
  }, [nodes]);

  const add = () => {
    if (!draft.trim()) return;
    setNodes((ns) => [...ns, { id: `n${counter}`, text: draft.trim(), given: isGiven, premises: [], justification: '' }]);
    setCounter((c) => c + 1);
    setDraft('');
  };

  const update = (id: string, patch: Partial<SandboxNode>) => setNodes((ns) => ns.map((n) => (n.id === id ? { ...n, ...patch } : n)));

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-9">
      <PageHeader eyebrow="Expérimentation" title="Mode libre">
        Tout est ouvert, rien n’est comptabilisé. Essaie un laboratoire, un exercice, ou construis ton propre raisonnement dans le bac à sable.
      </PageHeader>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="p-5">
          <SectionTitle className="mb-2">Bac à sable de raisonnement</SectionTitle>
          <p className="text-[13px] text-text-2 mb-3">
            Pose tes assertions, relie-les. Le contrôle porte seulement sur la <em>structure</em> : absence de cycle, chaque assertion ancrée dans des hypothèses par une justification écrite. Il ne peut en aucun cas valider le contenu mathématique.
          </p>

          <div className="flex flex-wrap gap-2 items-start mb-4">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && add()}
              placeholder="Assertion (texte et $LaTeX$)"
              aria-label="Nouvelle assertion"
              className="flex-1 min-w-56 rounded-md border border-line-strong bg-surface-2 px-3 py-1.5 text-sm"
            />
            <label className="flex items-center gap-1.5 text-[13px] py-1.5">
              <input type="checkbox" checked={isGiven} onChange={(e) => setIsGiven(e.target.checked)} /> Hypothèse
            </label>
            <Button variant="primary" onClick={add}>Ajouter</Button>
          </div>

          <ul className="space-y-2.5">
            {nodes.map((n) => {
              const anchored = report.anchored.has(n.id);
              const cyc = report.inCycle.has(n.id);
              const status = n.given ? 'Hypothèse déclarée' : cyc ? 'Cycle' : anchored ? 'Ancrée' : 'Non ancrée';
              const color = n.given ? 'var(--st-hyp)' : cyc ? 'var(--st-invalid)' : anchored ? 'var(--st-proved)' : 'var(--st-miss)';
              return (
                <li key={n.id} className="rounded-md border border-line p-3" style={{ borderLeft: `3px solid ${color}` }} data-sandbox={n.id}>
                  <div className="flex justify-between gap-2 mb-1">
                    <span className="text-[14px]"><MathText text={n.text} /></span>
                    <span className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-[11px]" style={{ color }}>{status}</span>
                      <button type="button" className="text-xs text-text-3 hover:text-text-2 underline cursor-pointer" onClick={() => setNodes((ns) => ns.filter((x) => x.id !== n.id).map((x) => ({ ...x, premises: x.premises.filter((p) => p !== n.id) })))}>Retirer</button>
                    </span>
                  </div>
                  {!n.given && (
                    <div className="grid sm:grid-cols-2 gap-2 mt-2">
                      <fieldset>
                        <legend className="text-[12px] text-text-3 mb-0.5">Prémisses</legend>
                        <div className="space-y-0.5">
                          {nodes.filter((o) => o.id !== n.id).map((o) => (
                            <label key={o.id} className={cx('flex items-start gap-1.5 text-[12.5px] cursor-pointer')}>
                              <input
                                type="checkbox"
                                className="mt-0.5"
                                checked={n.premises.includes(o.id)}
                                onChange={(e) => update(n.id, { premises: e.target.checked ? [...n.premises, o.id] : n.premises.filter((p) => p !== o.id) })}
                              />
                              <MathText text={o.text} />
                            </label>
                          ))}
                        </div>
                      </fieldset>
                      <label className="text-[12px] text-text-3">
                        Justification
                        <input value={n.justification} onChange={(e) => update(n.id, { justification: e.target.value })} className="mt-0.5 w-full rounded-md border border-line-strong bg-surface-2 px-2 py-1 text-[13px] text-text" />
                      </label>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {report.cycles.length > 0 && (
            <p className="mt-3 text-sm text-invalid" role="status">
              Raisonnement circulaire : une assertion finit par dépendre d’elle-même.
            </p>
          )}
          <p className="mt-3 text-[12.5px] text-text-3">
            « Ancrée » signifie que la structure est complète. Ce n’est ni « Validé » ni une preuve.
          </p>
        </Card>

        <div className="space-y-5">
          <Card className="p-4">
            <SectionTitle className="mb-2">Laboratoires</SectionTitle>
            <ul className="space-y-1.5">
              {LAB_LIST.map((l) => (
                <li key={l.id}>
                  <LinkButton to={`/labo/${l.id}`} variant="ghost" className="w-full justify-start px-1 py-1">
                    {l.tag}. {l.title}
                  </LinkButton>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-4">
            <SectionTitle className="mb-2">Tous les exercices</SectionTitle>
            <div className="max-h-[440px] overflow-auto pr-1 space-y-3">
              {WORLDS.map((w) => (
                <div key={w.id}>
                  <div className="font-mono text-[11px] text-text-3 mb-1">Monde {toRoman(w.n)}</div>
                  <ul className="space-y-1">
                    {THEOREM_CATALOG.filter((t) => t.world === w.n).map((t) => (
                      <li key={t.id} className="text-[13px]">
                        <MathText text={t.name} />{' '}
                        <span className="text-text-3 whitespace-nowrap">
                          {exercisesOf(t.id).map((e, i) => (
                            <span key={e.id}>
                              {i > 0 && ' · '}
                              <Link className="underline hover:text-text" to={`/preuve/${e.id}`}>{LEVEL_LABEL[e.level][0]}</Link>
                            </span>
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
