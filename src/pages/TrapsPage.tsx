/**
 * Bilan des pièges : les erreurs commises (preuves, « Trouver l'erreur », contre-exemples),
 * regroupées par nature et par concept, avec pour chaque concept de quoi le travailler :
 * le rappel, les pièges précis rencontrés, les fiches du dictionnaire, des exercices ciblés.
 */
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CONCEPT_BY_ID, COUNTEREXAMPLE_BY_ID, EXERCISES, EXERCISE_BY_ID } from '@/content';
import { CONCEPT_NOTIONS } from '@/content/dictionnaire/concepts-notions';
import { DICO_BY_ID } from '@/content/dictionnaire';
import { CIRCULAR_MESSAGE } from '@/core/proof-engine/engine';
import { isUnlocked } from '@/core/progression/mastery';
import { practiceFor, RECENT_DAYS, trapReport, type ConceptReport } from '@/core/progression/traps';
import { FLAW_LABEL } from '@/core/error-hunt/hunt';
import { huntItem, huntItemsForConcept } from '@/core/error-hunt/items';
import { ERROR_KINDS, type ErrorEvent, type ErrorKind } from '@/storage/save';
import { Button, Card, formatDate, LinkButton, PageHeader, SectionTitle } from '@/components/ui';
import { MathText } from '@/components/Math';
import { TermChip } from '@/components/glossary/EntryView';
import { useGame } from '@/storage/store';

const KIND_LABEL: Record<ErrorKind, string> = { ...FLAW_LABEL, autre: 'Contre-exemple manqué' };

export function TrapsPage() {
  const conceptErrors = useGame((s) => s.save.conceptErrors);
  const log = useGame((s) => s.save.errorLog);
  const exercises = useGame((s) => s.save.exercises);
  const unlockAll = useGame((s) => s.save.settings.unlockAll);
  const now = useGame((s) => s.now);
  const report = useMemo(() => trapReport(conceptErrors, log, now()), [conceptErrors, log, now]);
  const open = (theoremId: string) => isUnlocked(theoremId, exercises, unlockAll);
  const maxKind = Math.max(1, ...ERROR_KINDS.map((k) => report.byKind[k]));

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-10 py-9">
      <PageHeader eyebrow={<><Link to="/tableau" className="hover:text-text-2">Tableau de bord</Link> · Progression</>} title="Bilan des pièges">
        Les erreurs commises en construisant une preuve, manquées dans « Trouver l’erreur » ou dans les contre-exemples, regroupées par concept. Pour chacun : le rappel, les pièges précis rencontrés, les fiches à relire et des exercices pour s’entraîner.
      </PageHeader>

      {report.total === 0 ? (
        <Card className="p-5" data-testid="bilan-vide">
          <p className="text-[14px] text-text-2">
            Aucune erreur enregistrée pour l’instant. Les pièges où tu tombes en construisant une preuve, et les erreurs que tu manques dans « Trouver l’erreur », apparaîtront ici avec de quoi les travailler.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <LinkButton to="/carte" variant="primary">Ouvrir la carte</LinkButton>
            <LinkButton to="/trouver-erreur">Trouver l’erreur</LinkButton>
          </div>
        </Card>
      ) : (
        <>
          <dl className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Stat k="Erreurs enregistrées" v={String(report.total)} />
            <Stat k={`Ces ${RECENT_DAYS} derniers jours`} v={String(report.recent)} />
            <Stat k="Concepts concernés" v={String(report.concepts.length)} />
            <Stat k="À travailler d’abord" v={report.concepts[0] ? '' : '—'} sub={report.concepts[0] ? <MathText text={CONCEPT_BY_ID.get(report.concepts[0].concept)?.label ?? report.concepts[0].concept} /> : undefined} />
          </dl>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0 space-y-4" data-testid="bilan-concepts">
              {report.concepts.map((c) => (
                <ConceptCard key={c.concept} report={c} open={open} />
              ))}
            </div>

            <div className="space-y-5">
              <Card className="p-5">
                <SectionTitle className="mb-1">Par nature d’erreur</SectionTitle>
                <p className="mb-3 text-[12.5px] text-text-3">Erreurs du journal détaillé, par nature.</p>
                <ul className="space-y-2.5" data-testid="bilan-natures">
                  {ERROR_KINDS.map((k) => {
                    const n = report.byKind[k];
                    return (
                      <li key={k} title={`${KIND_LABEL[k]} : ${n}`}>
                        <div className="mb-1 flex justify-between gap-2 text-[13px]">
                          <span>{KIND_LABEL[k]}</span>
                          <span className="tabular text-text-2">{n}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-surface-3" aria-hidden>
                          {n > 0 && <div className="h-1.5 rounded-full" style={{ width: `${(100 * n) / maxKind}%`, background: 'var(--accent)' }} />}
                        </div>
                      </li>
                    );
                  })}
                </ul>
                {report.beforeLog > 0 && (
                  <p className="mt-3 text-[12px] text-text-3">
                    {report.beforeLog} erreur{report.beforeLog > 1 ? 's' : ''} plus ancienne{report.beforeLog > 1 ? 's' : ''} ne {report.beforeLog > 1 ? 'sont comptées' : 'est comptée'} que par concept : le détail par nature et par étape commence au 16 novembre 2026.
                  </p>
                )}
              </Card>
              <Card className="p-5">
                <SectionTitle className="mb-2">Pour aller plus loin</SectionTitle>
                <ul className="space-y-1.5 text-[13.5px]">
                  <li><Link className="hover:underline" to="/revision">Révisions : exercices et notions à revoir</Link></li>
                  <li><Link className="hover:underline" to="/trouver-erreur">Trouver l’erreur dans une démonstration</Link></li>
                  <li><Link className="hover:underline" to="/contre-exemples">Contre-exemples</Link></li>
                </ul>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ConceptCard({ report, open }: { report: ConceptReport; open: (theoremId: string) => boolean }) {
  const concept = CONCEPT_BY_ID.get(report.concept);
  const progress = useGame((s) => s.save.exercises);
  const huntRecords = useGame((s) => s.save.errorHunt);
  const deck = useGame((s) => s.save.notions);
  const addNotion = useGame((s) => s.addNotion);
  const notions = (CONCEPT_NOTIONS[report.concept] ?? []).filter((id) => DICO_BY_ID.has(id));
  const missing = notions.filter((id) => !deck[id]);
  const practice = useMemo(() => practiceFor(report.concept, EXERCISES, progress, open, 3), [report.concept, progress]); // eslint-disable-line react-hooks/exhaustive-deps
  const hunts = useMemo(
    () => huntItemsForConcept(report.concept).filter((i) => open(i.theoremId) && !huntRecords[i.id]?.found).slice(0, 2),
    [report.concept, huntRecords], // eslint-disable-line react-hooks/exhaustive-deps
  );
  const traps = distinctEvents(report.events).slice(0, 3);

  return (
    <Card className="p-5" data-concept={report.concept}>
      <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-serif text-[19px]"><MathText text={concept?.label ?? report.concept} /></h2>
        <span className="font-mono text-[12px] text-text-3 tabular">
          {report.count} erreur{report.count > 1 ? 's' : ''}
          {report.recent > 0 && <> · {report.recent} récente{report.recent > 1 ? 's' : ''}</>} · dernière le {formatDate(report.lastAt)}
        </span>
      </div>
      {concept && <p className="text-[14px] text-text-2"><MathText text={concept.reminder} terms /></p>}

      {traps.length > 0 && (
        <section className="mt-3">
          <h3 className="mb-1.5 font-mono text-[10.5px] uppercase tracking-wider text-text-3">Pièges rencontrés</h3>
          <ul className="space-y-2">
            {traps.map((e) => (
              <TrapEvent key={`${e.ref}-${e.node ?? ''}-${e.at}`} event={e} />
            ))}
          </ul>
        </section>
      )}

      {notions.length > 0 && (
        <section className="mt-3">
          <h3 className="mb-1.5 font-mono text-[10.5px] uppercase tracking-wider text-text-3">Fiches à relire</h3>
          <div className="flex flex-wrap items-center gap-1.5">
            {notions.map((id) => (
              <TermChip key={id} id={id} track={DICO_BY_ID.get(id)?.track} />
            ))}
            {missing.length > 0 ? (
              <Button variant="ghost" className="text-[12.5px]" onClick={() => missing.forEach((id) => addNotion(id, 'manuelle'))} data-testid="reviser-notions">
                Ajouter à mes révisions
              </Button>
            ) : (
              <span className="text-[12px] text-text-3">Dans tes révisions.</span>
            )}
          </div>
        </section>
      )}

      {(practice.length > 0 || hunts.length > 0) && (
        <section className="mt-3">
          <h3 className="mb-1.5 font-mono text-[10.5px] uppercase tracking-wider text-text-3">S’entraîner</h3>
          <ul className="space-y-1 text-[13.5px]">
            {practice.map((e) => (
              <li key={e.id}>
                <Link className="hover:underline" to={`/preuve/${e.id}`}>
                  <MathText text={e.title} />
                </Link>
                <span className="text-[12px] text-text-3"> · {progress[e.id]?.solved ? 'à refaire' : 'exercice'}</span>
              </li>
            ))}
            {hunts.map((i) => (
              <li key={i.id}>
                <Link className="hover:underline" to={`/trouver-erreur/${encodeURIComponent(i.id)}`}>
                  <MathText text={EXERCISE_BY_ID.get(i.exerciseId)?.title ?? i.exerciseId} />
                  {i.variant ? ' (variante)' : ''}
                </Link>
                <span className="text-[12px] text-text-3"> · trouver l’erreur : {FLAW_LABEL[i.kind].toLowerCase()}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Card>
  );
}

/** Une erreur par exercice et par étape, la plus récente. */
function distinctEvents(events: ErrorEvent[]): ErrorEvent[] {
  const seen = new Set<string>();
  return events.filter((e) => {
    const key = `${e.source}|${e.ref}|${e.node ?? ''}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function TrapEvent({ event }: { event: ErrorEvent }) {
  const described = describe(event);
  if (!described) return null;
  return (
    <li className="rounded-md border border-line px-3 py-2 text-[13.5px]">
      <div className="mb-0.5 font-mono text-[11px] text-text-3">
        {KIND_LABEL[event.kind]} · {formatDate(event.at)} ·{' '}
        {described.link ? (
          <Link className="hover:underline" to={described.link}>
            <MathText text={described.where} />
          </Link>
        ) : (
          <MathText text={described.where} />
        )}
      </div>
      {described.message && <MathText text={described.message} terms />}
    </li>
  );
}

function describe(e: ErrorEvent): { where: string; message?: string; link?: string } | null {
  if (e.source === 'trouver-erreur') {
    const item = huntItem(e.ref);
    if (!item) return null;
    return {
      where: `Trouver l’erreur · ${EXERCISE_BY_ID.get(item.exerciseId)?.title ?? item.exerciseId}`,
      message: item.explanation,
      link: `/trouver-erreur/${encodeURIComponent(item.id)}`,
    };
  }
  if (e.source === 'contre-exemple') {
    const task = COUNTEREXAMPLE_BY_ID.get(e.ref.replace(/^contre-exemple:/, ''));
    if (!task) return null;
    return { where: `Contre-exemple · ${task.title}`, message: task.correctStatement, link: `/contre-exemples/${task.id}` };
  }
  const ex = EXERCISE_BY_ID.get(e.ref);
  if (!ex) return null;
  const spec = [ex.proof, ex.variant.proof].find((s) => s?.nodes.some((n) => n.id === e.node));
  const trap = spec?.traps.find((t) => t.conclusion === e.node && t.concept === e.concept) ?? spec?.traps.find((t) => t.conclusion === e.node);
  let message = trap?.message;
  if (!message && e.concept === 'circularite') message = CIRCULAR_MESSAGE;
  if (!message && e.concept === 'utilisation-prematuree') message = 'Un résultat a été invoqué alors que sa démonstration repose sur ce que l’on cherchait à établir.';
  return { where: ex.title, message, link: `/preuve/${ex.id}` };
}

function Stat({ k, v, sub }: { k: string; v: string; sub?: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-4">
      <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-3">{k}</dt>
      {v && <dd className="mt-1 font-serif text-3xl tabular">{v}</dd>}
      {sub && <dd className="mt-1 text-[14px]">{sub}</dd>}
    </div>
  );
}
