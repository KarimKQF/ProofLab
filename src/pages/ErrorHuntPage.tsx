/**
 * Mode « Trouver l'erreur » : une démonstration complète, dont une étape est fautive.
 * Le joueur désigne l'étape, puis la nature de l'erreur. Les démonstrations sont construites
 * à partir des exercices du jeu ; le moteur confirme que seule l'étape désignée est fautive.
 */
import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CATALOG_BY_ID, EXERCISE_BY_ID, THEOREM_CATALOG, WORLDS } from '@/content';
import { LEVEL_LABEL } from '@/content/schema';
import { trackOfTheorem } from '@/content/dictionnaire';
import { isGiven } from '@/core/proof-engine/engine';
import { isUnlocked } from '@/core/progression/mastery';
import { FLAW_HELP, FLAW_KINDS, FLAW_LABEL, type FlawKind, type HuntItem } from '@/core/error-hunt/hunt';
import { huntItem, huntItems } from '@/core/error-hunt/items';
import { blockSentence, inferKind } from '@/components/proof/blocks/model';
import { TermScope } from '@/components/glossary/context';
import { Button, Card, cx, LinkButton, PageHeader, SectionTitle } from '@/components/ui';
import { MathText, Prose } from '@/components/Math';
import { useGame } from '@/storage/store';
import { toRoman } from './MapPage';

export function ErrorHuntPage() {
  const { id } = useParams();
  if (id) {
    const item = huntItem(id);
    if (item) return <HuntRun key={item.id} item={item} />;
  }
  return <HuntList />;
}

const huntPath = (id: string) => `/trouver-erreur/${encodeURIComponent(id)}`;

function useOpen() {
  const exercises = useGame((s) => s.save.exercises);
  const unlockAll = useGame((s) => s.save.settings.unlockAll);
  return (theoremId: string) => isUnlocked(theoremId, exercises, unlockAll);
}

/** Prochaine démonstration fautive à faire : d'abord dans le même résultat, puis dans les suivants. */
function useNext(current?: HuntItem) {
  const records = useGame((s) => s.save.errorHunt);
  const open = useOpen();
  return () => {
    const items = huntItems().filter((i) => open(i.theoremId) && i.id !== current?.id);
    const todo = items.filter((i) => !records[i.id]?.found);
    const same = todo.find((i) => i.theoremId === current?.theoremId);
    return same ?? todo[0] ?? items[0];
  };
}

function HuntList() {
  const records = useGame((s) => s.save.errorHunt);
  const open = useOpen();
  const navigate = useNavigate();
  const next = useNext();
  const [filter, setFilter] = useState<'tout' | 'analyse' | 'lie'>('tout');
  const items = huntItems();
  const byTheorem = useMemo(() => {
    const m = new Map<string, HuntItem[]>();
    for (const i of items) m.set(i.theoremId, [...(m.get(i.theoremId) ?? []), i]);
    return m;
  }, [items]);
  const found = items.filter((i) => records[i.id]?.found).length;
  const firstTry = items.filter((i) => records[i.id]?.firstTry).length;
  const anyOpen = THEOREM_CATALOG.some((c) => open(c.id));

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-9">
      <PageHeader eyebrow="Mode 6" title="Trouver l’erreur">
        Une démonstration complète t’est proposée, mais une étape est fautive. Désigne-la, puis dis ce qui ne va pas : une affirmation fausse, une justification qui ne permet pas de conclure, une hypothèse jamais vérifiée, ou un résultat invoqué alors qu’il dépend de ce qu’on démontre. Chaque démonstration reprend un exercice du jeu ; le moteur de preuve confirme que seule l’étape désignée est fautive.
      </PageHeader>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <Button
          variant="primary"
          disabled={!anyOpen}
          onClick={() => {
            const n = next();
            if (n) navigate(huntPath(n.id));
          }}
          data-testid="erreur-suivante-liste"
        >
          Une démonstration à corriger
        </Button>
        <span className="text-[13px] text-text-2 tabular" data-testid="erreurs-trouvees">
          {found} / {items.length} erreurs trouvées · {firstTry} du premier coup
        </span>
        <span className="flex gap-1.5" role="group" aria-label="Parcours">
          {(
            [
              ['tout', 'Tout'],
              ['analyse', 'Analyse et EDP'],
              ['lie', 'Géométrie de Lie'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
              className={cx('rounded-md border px-2.5 py-1 text-[12.5px] cursor-pointer', filter === id ? 'border-accent bg-accent text-[var(--bg)]' : 'border-line hover:border-line-strong')}
            >
              {label}
            </button>
          ))}
        </span>
      </div>
      <p className="mb-5 text-[13px] text-text-3">
        Chaque démonstration fautive contient la preuve complète d’un exercice : mieux vaut l’avoir résolu d’abord. Les résultats encore verrouillés sur la carte le sont aussi ici.
      </p>

      <div className="space-y-5">
        {WORLDS.filter((w) => filter === 'tout' || w.track === filter).map((w) => {
          const entries = THEOREM_CATALOG.filter((c) => c.world === w.n && byTheorem.has(c.id));
          if (!entries.length) return null;
          return (
            <section key={w.id}>
              <h2 className="mb-2 font-mono text-[11px] uppercase tracking-wider text-text-3">
                Monde {toRoman(w.n)} · {w.title}
              </h2>
              <ul className="grid gap-2 md:grid-cols-2">
                {entries.map((c) => {
                  const list = byTheorem.get(c.id)!;
                  const done = list.filter((i) => records[i.id]?.found).length;
                  const unlocked = open(c.id);
                  const first = list.find((i) => !records[i.id]?.found) ?? list[0]!;
                  return (
                    <li key={c.id}>
                      {unlocked ? (
                        <Link to={huntPath(first.id)} className="flex h-full items-center justify-between gap-3 rounded-lg border border-line bg-surface px-3.5 py-2.5 hover:border-line-strong" data-hunt-theorem={c.id}>
                          <span className="min-w-0">
                            <span className="font-mono text-[11px] text-text-3">{c.n}. </span>
                            <MathText text={c.name} />
                          </span>
                          <span className="shrink-0 font-mono text-[11.5px] tabular" style={{ color: done === list.length ? 'var(--st-hyp)' : 'var(--text-3)' }}>
                            {done} / {list.length}
                          </span>
                        </Link>
                      ) : (
                        <div className="flex h-full items-center justify-between gap-3 rounded-lg border border-dashed border-line px-3.5 py-2.5 text-text-3" title="Résultat encore verrouillé sur la carte">
                          <span className="min-w-0">
                            <span className="font-mono text-[11px]">{c.n}. </span>
                            <MathText text={c.name} />
                          </span>
                          <span className="shrink-0 font-mono text-[11px]">verrouillé</span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

type Phase = { status: 'choix' } | { status: 'mauvaise-ligne'; line: number } | { status: 'mauvaise-nature'; nature: FlawKind } | { status: 'trouve' } | { status: 'montre' };

function HuntRun({ item }: { item: HuntItem }) {
  const exercise = EXERCISE_BY_ID.get(item.exerciseId)!;
  const cat = CATALOG_BY_ID.get(item.theoremId)!;
  const track = trackOfTheorem(item.theoremId);
  const record = useGame((s) => s.recordHunt);
  const past = useGame((s) => s.save.errorHunt[item.id]);
  const navigate = useNavigate();
  const next = useNext(item);
  const [line, setLine] = useState<number | null>(null);
  const [nature, setNature] = useState<FlawKind | null>(null);
  const [phase, setPhase] = useState<Phase>({ status: 'choix' });
  const [tries, setTries] = useState(0);
  const [missed, setMissed] = useState(false);
  const done = phase.status === 'trouve' || phase.status === 'montre';

  const spec = item.spec;
  const text = (id: string) => spec.nodes.find((n) => n.id === id)?.text ?? id;
  const givens = spec.nodes.filter((n) => isGiven(n) && !n.local);
  const refs = useMemo(() => {
    const m = new Map<string, string>();
    givens.forEach((n, i) => m.set(n.id, `H${i + 1}`));
    item.lines.forEach((l, i) => m.set(l.node, `(${i + 1})`));
    return m;
  }, [item]); // eslint-disable-line react-hooks/exhaustive-deps
  const ref = (id: string) => refs.get(id) ?? '?';
  const sentences = useMemo(
    () =>
      item.lines.map((l) =>
        blockSentence(
          spec,
          { key: l.node, kind: l.intro ? 'intro' : inferKind(spec, l.node, l.justification), node: l.node, premises: l.premises, justification: l.justification },
          text,
          ref,
        ),
      ),
    [item], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const finish = (outcome: { found: boolean; firstTry: boolean; missed: boolean }) =>
    record(item.id, { ...outcome, concept: item.concept, kind: item.kind, exerciseId: item.exerciseId });

  const validate = () => {
    if (line === null || nature === null || done) return;
    const lineOk = item.faulty.includes(line);
    if (!lineOk) {
      setTries((t) => t + 1);
      setPhase({ status: 'mauvaise-ligne', line });
      if (!missed) {
        setMissed(true);
        finish({ found: false, firstTry: false, missed: true });
      }
      return;
    }
    if (nature !== item.kind) {
      setTries((t) => t + 1);
      setPhase({ status: 'mauvaise-nature', nature });
      return;
    }
    setPhase({ status: 'trouve' });
    finish({ found: true, firstTry: tries === 0, missed: false });
  };

  const reveal = () => {
    setPhase({ status: 'montre' });
    setLine(item.faulty[0]!);
    setNature(item.kind);
    if (!missed) finish({ found: false, firstTry: false, missed: true });
  };

  const goNext = () => {
    const n = next();
    if (n) navigate(huntPath(n.id));
  };

  const correctJustification = item.correction?.justification ? spec.justifications.find((j) => j.id === item.correction!.justification)?.label : undefined;
  const missingNode = item.correction?.missing;

  return (
    <TermScope track={track}>
      <div className="max-w-4xl mx-auto px-5 md:px-10 py-8">
        <PageHeader eyebrow={<><Link to="/trouver-erreur" className="hover:text-text-2">Trouver l’erreur</Link> · Résultat {cat.n}</>} title={<MathText text={exercise.title} />}>
          <span className="text-[13px]">
            <Link to={`/theoreme/${cat.id}`} className="hover:underline"><MathText text={cat.name} /></Link> · {LEVEL_LABEL[exercise.level]}
            {item.variant ? ' · variante' : ''}
          </span>
        </PageHeader>

        <Card className="mb-4 p-4">
          <SectionTitle className="mb-1.5">Énoncé</SectionTitle>
          <Prose text={item.statement} className="font-serif text-[16px] leading-relaxed" terms />
          {givens.length > 0 && (
            <>
              <SectionTitle className="mb-1 mt-3">Données</SectionTitle>
              <ul className="space-y-0.5 text-[13.5px]">
                {givens.map((n) => (
                  <li key={n.id} className="flex gap-2">
                    <span className="shrink-0 font-mono text-[12px] text-text-3">{ref(n.id)}</span>
                    <span className="min-w-0"><MathText text={n.text} terms /></span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Card>

        <Card className="mb-4 p-4">
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
            <SectionTitle>Démonstration proposée</SectionTitle>
            <span className="text-[12px] text-text-3">{done ? 'L’étape fautive est signalée en rouge.' : 'Clique sur l’étape fautive.'}</span>
          </div>
          <ol className="space-y-1" role="radiogroup" aria-label="Étapes de la démonstration" data-testid="lignes-demonstration">
            {item.lines.map((l, i) => {
              const selected = line === i;
              const faulty = done && item.faulty.includes(i);
              const wrong = phase.status === 'mauvaise-ligne' && phase.line === i;
              return (
                <li key={`${l.node}-${i}`}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    disabled={done}
                    onClick={() => {
                      setLine(i);
                      if (phase.status === 'mauvaise-ligne') setPhase({ status: 'choix' });
                    }}
                    className={cx(
                      'flex w-full gap-2 rounded-md border px-2.5 py-1.5 text-left text-[14px] transition-colors',
                      done ? 'cursor-default' : 'cursor-pointer hover:border-line-strong',
                      faulty ? 'border-invalid bg-[color-mix(in_srgb,var(--st-invalid)_10%,transparent)]' : wrong ? 'border-miss' : selected ? 'border-accent' : 'border-transparent',
                    )}
                    data-ligne={i}
                    data-fautive={faulty ? 'oui' : undefined}
                  >
                    <span className="w-8 shrink-0 pt-0.5 font-mono text-[12px] text-text-3">({i + 1})</span>
                    <Prose text={sentences[i]!} className="min-w-0" />
                  </button>
                </li>
              );
            })}
          </ol>
        </Card>

        {!done && (
          <Card className="mb-4 p-4">
            <SectionTitle className="mb-2">Nature de l’erreur</SectionTitle>
            <div className="grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Nature de l’erreur">
              {FLAW_KINDS.map((k) => (
                <button
                  key={k}
                  type="button"
                  role="radio"
                  aria-checked={nature === k}
                  onClick={() => {
                    setNature(k);
                    if (phase.status === 'mauvaise-nature') setPhase({ status: 'choix' });
                  }}
                  className={cx('rounded-md border px-3 py-2 text-left cursor-pointer', nature === k ? 'border-accent' : 'border-line hover:border-line-strong')}
                  data-nature={k}
                >
                  <span className="block text-[14px] font-medium">{FLAW_LABEL[k]}</span>
                  <span className="block text-[12.5px] text-text-3">{FLAW_HELP[k]}</span>
                </button>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button variant="primary" onClick={validate} disabled={line === null || nature === null} data-testid="valider-erreur">
                Valider
              </Button>
              {tries > 0 && (
                <Button variant="ghost" onClick={reveal} data-testid="montrer-erreur">
                  Montrer l’erreur
                </Button>
              )}
              {line === null && <span className="text-[12.5px] text-text-3">Choisis d’abord une étape.</span>}
            </div>
            {phase.status === 'mauvaise-ligne' && (
              <p className="mt-2 text-[13.5px] text-miss" role="status" data-testid="retour-erreur">
                L’étape ({phase.line + 1}) est correcte : elle découle de ce qu’elle cite par une règle explicite. Cherche ailleurs.
              </p>
            )}
            {phase.status === 'mauvaise-nature' && (
              <p className="mt-2 text-[13.5px] text-miss" role="status" data-testid="retour-erreur">
                C’est bien l’étape fautive, mais l’erreur n’est pas de cette nature. Relis ce qu’elle affirme, ce qu’elle cite et ce qu’elle invoque.
              </p>
            )}
          </Card>
        )}

        {done && (
          <Card className="mb-4 p-4 anim-rise" data-testid="explication-erreur">
            <p className="mb-2 text-[14px]">
              {phase.status === 'trouve' ? (
                <span className="font-semibold text-proved">{tries === 0 ? 'Trouvée du premier coup. ' : 'Trouvée. '}</span>
              ) : (
                <span className="font-semibold text-miss">Voici l’erreur. </span>
              )}
              Étape ({item.faulty[0]! + 1}) · {FLAW_LABEL[item.kind]}
              {item.faulty.length > 1 && (
                <span className="text-text-2"> ; les étapes {item.faulty.slice(1).map((i) => `(${i + 1})`).join(', ')} utilisent la même propriété.</span>
              )}
            </p>
            <Prose text={item.explanation} className="text-[14.5px]" terms />
            {item.counterexample && (
              <p className="mt-2 text-[14px]">
                <span className="font-mono text-[11px] text-text-3">Contre-exemple : </span>
                <MathText text={item.counterexample} terms />
              </p>
            )}
            {correctJustification && (
              <p className="mt-2 text-[14px]">
                <span className="font-mono text-[11px] text-text-3">Justification qui convient : </span>
                <MathText text={correctJustification} terms />
              </p>
            )}
            {missingNode && (
              <p className="mt-2 text-[14px]">
                <span className="font-mono text-[11px] text-text-3">Il fallait d’abord établir : </span>
                <MathText text={text(missingNode)} terms />
              </p>
            )}
            {item.kind === 'affirmation-fausse' && (
              <p className="mt-2 text-[13px] text-text-2">La démonstration correcte n’a pas besoin de cette affirmation : sans elle, la conclusion reste établie.</p>
            )}
          </Card>
        )}

        <div className="flex flex-wrap gap-2">
          {done && (
            <Button variant="primary" onClick={goNext} data-testid="erreur-suivante">
              Démonstration suivante
            </Button>
          )}
          <LinkButton to={`/preuve/${item.exerciseId}${item.variant ? '?variante=1' : ''}`} variant="ghost">
            Faire l’exercice
          </LinkButton>
          <LinkButton to="/trouver-erreur" variant="ghost">
            Tous les résultats
          </LinkButton>
        </div>
        {past?.found && !done && <p className="mt-3 text-xs text-text-3">Déjà trouvée par le passé.</p>}
      </div>
    </TermScope>
  );
}
