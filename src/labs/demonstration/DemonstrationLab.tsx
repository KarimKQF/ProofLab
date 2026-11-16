/**
 * Laboratoire H — Démonstration. On n'y manipule que les démonstrations des énoncés :
 * choisir un résultat, puis construire sa preuve en blocs logiques, avec le guide de preuve
 * complet (méthode, ce qu'on peut établir maintenant, ce qu'il suffit de montrer, plan).
 *
 * Effacement progressif : on lit d'abord la preuve modèle, puis on retrouve ses
 * justifications, puis on reconstruit les étapes effacées, enfin on l'écrit sur une page
 * blanche. C'est un bac à sable : rien n'entre dans la progression.
 */
import { useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { DEMONSTRATIONS, EXERCISES, THEOREM_CATALOG, WORLDS } from '@/content';
import type { ProofSpec, Verification } from '@/content/schema';
import { LEVEL_LABEL } from '@/content/schema';
import { allowedTheorems } from '@/content/catalog';
import { trackOfTheorem } from '@/content/dictionnaire';
import { Button, Card, cx, LinkButton, PageHeader, REVIEW_LABEL, SectionTitle, VERIFICATION_LABEL } from '@/components/ui';
import { MathText, Prose } from '@/components/Math';
import { TermScope } from '@/components/glossary/context';
import { ProofWorkspace } from '@/components/proof/ProofWorkspace';
import type { ProofSession } from '@/components/proof/useProofSession';
import { FADING_LEVELS, FADING_META, fadingSeed, type FadingLevel } from '@/components/proof/blocks/model';
import { useGame } from '@/storage/store';
import { toRoman } from '@/pages/MapPage';

export interface DemoItem {
  key: string;
  theoremId: string;
  title: string;
  statement: string;
  spec: ProofSpec;
  prerequisites: readonly string[];
  /** Niveau de l'exercice, ou « démonstration du résultat ». */
  label: string;
  plan?: readonly string[];
  /** Version notée (exercice) : lien vers l'atelier de preuve. */
  exercisePath?: string;
  /** Démonstration d'une partie du résultat seulement. */
  scopeNote?: string;
  verification?: Verification;
  /** Paramètres d'adresse qui sélectionnent cette démonstration. */
  query: Record<string, string>;
}

/** Toutes les démonstrations jouables : exercices (et variantes) dont le but est l'énoncé, puis démonstrations de résultats. */
export const DEMOS: DemoItem[] = [
  ...EXERCISES.flatMap((e) => {
    const out: DemoItem[] = [];
    if (e.proof.purpose === 'demonstration')
      out.push({
        key: e.id,
        theoremId: e.theoremId,
        title: e.title,
        statement: e.statement,
        spec: e.proof,
        prerequisites: e.prerequisites,
        label: LEVEL_LABEL[e.level],
        plan: e.steps,
        exercisePath: `/preuve/${e.id}`,
        query: { exercice: e.id },
      });
    if (e.variant.proof?.purpose === 'demonstration')
      out.push({
        key: `${e.id}:variante`,
        theoremId: e.theoremId,
        title: e.title,
        statement: e.variant.statement,
        spec: e.variant.proof,
        prerequisites: e.prerequisites,
        label: `${LEVEL_LABEL[e.level]} · variante`,
        exercisePath: `/preuve/${e.id}?variante=1`,
        query: { exercice: e.id, variante: '1' },
      });
    return out;
  }),
  ...DEMONSTRATIONS.map((d) => ({
    key: `demonstration:${d.theoremId}`,
    theoremId: d.theoremId,
    title: d.title,
    statement: d.statement,
    spec: d.proof,
    prerequisites: d.prerequisites,
    label: d.scope === 'complete' ? 'Démonstration du résultat' : 'Étape clé de la démonstration',
    plan: d.plan,
    scopeNote: d.scope === 'partie' ? d.scopeNote : undefined,
    verification: d.verification,
    query: { resultat: d.theoremId },
  })),
];

function findDemo(params: URLSearchParams): DemoItem | null {
  const resultat = params.get('resultat');
  if (resultat) return DEMOS.find((d) => d.query.resultat === resultat) ?? null;
  const ex = params.get('exercice');
  if (!ex) return null;
  const variant = params.get('variante') === '1';
  return DEMOS.find((d) => d.query.exercice === ex && Boolean(d.query.variante) === variant) ?? DEMOS.find((d) => d.query.exercice === ex) ?? null;
}

export function DemonstrationLab() {
  const [params, setParams] = useSearchParams();
  const [filter, setFilter] = useState<'tout' | 'analyse' | 'lie'>('tout');
  const current = findDemo(params);

  const byTheorem = useMemo(() => {
    const m = new Map<string, DemoItem[]>();
    for (const d of DEMOS) m.set(d.theoremId, [...(m.get(d.theoremId) ?? []), d]);
    return m;
  }, []);

  const select = (d: DemoItem) => {
    setParams(new URLSearchParams(d.query));
    setListOpen(false);
  };

  const withoutDemo = THEOREM_CATALOG.filter((c) => !byTheorem.has(c.id));
  // Une démonstration choisie prend toute la largeur ; la liste se replie au-dessus.
  const [listOpen, setListOpen] = useState(false);
  const showList = !current || listOpen;

  return (
    <div className="max-w-[1500px] mx-auto px-5 md:px-8 py-7">
      <PageHeader eyebrow={<><Link to="/labos" className="hover:text-text-2">Laboratoires</Link> · Laboratoire H</>} title="Démonstration">
        On ne manipule ici que les démonstrations des énoncés. Choisis un résultat : on lit d’abord la preuve modèle, puis on retrouve ses justifications, puis on reconstruit les étapes effacées, enfin on l’écrit sur une page blanche, en blocs logiques. Le guide propose la méthode, ce qu’on peut établir maintenant, ce qu’il suffit de montrer et le plan. Rien n’est enregistré dans ta progression.
      </PageHeader>

      {current && (
        <div className="mb-3">
          <button
            type="button"
            onClick={() => setListOpen((v) => !v)}
            aria-expanded={listOpen}
            className="rounded-md border border-line px-3 py-1.5 text-[13px] hover:border-line-strong cursor-pointer"
            data-testid="changer-demo"
          >
            {listOpen ? 'Masquer la liste des démonstrations' : 'Changer de démonstration'}
          </button>
        </div>
      )}

      <div className={cx('grid gap-5', !current && 'lg:grid-cols-[minmax(250px,300px)_minmax(0,1fr)]')}>
        <div className={cx('space-y-3', !showList && 'hidden')}>
          <div className="flex gap-1.5" role="group" aria-label="Parcours">
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
          </div>
          <Card className="max-h-[70vh] overflow-auto p-2" data-testid="liste-demonstrations">
            {WORLDS.filter((w) => filter === 'tout' || w.track === filter).map((w) => {
              const items = THEOREM_CATALOG.filter((c) => c.world === w.n && byTheorem.has(c.id));
              if (!items.length) return null;
              return (
                <div key={w.id} className="mb-2">
                  <div className="px-2 pb-1 pt-2 font-mono text-[10.5px] uppercase tracking-wider text-text-3">
                    Monde {toRoman(w.n)} · {w.title}
                  </div>
                  <ul>
                    {items.map((c) =>
                      byTheorem.get(c.id)!.map((d) => (
                        <li key={d.key}>
                          <button
                            type="button"
                            onClick={() => select(d)}
                            className={cx('w-full rounded px-2 py-1 text-left text-[13px] hover:bg-surface-2 cursor-pointer', current?.key === d.key && 'bg-surface-2 text-accent')}
                            data-demo={d.key}
                          >
                            <span className="font-mono text-[11px] text-text-3">{c.n}.</span> <MathText text={c.name} />
                            <span className="ml-1 text-[11.5px] text-text-3">· {d.label}</span>
                          </button>
                        </li>
                      )),
                    )}
                  </ul>
                </div>
              );
            })}
          </Card>
          {withoutDemo.length > 0 ? (
            <p className="text-[12px] text-text-3">
              {withoutDemo.length} résultat{withoutDemo.length > 1 ? 's' : ''} n’{withoutDemo.length > 1 ? 'ont' : 'a'} pas de démonstration jouable : leur preuve est décrite dans leur fiche.
            </p>
          ) : (
            <p className="text-[12px] text-text-3">Les {THEOREM_CATALOG.length} résultats ont au moins une démonstration jouable.</p>
          )}
        </div>

        <div className="min-w-0">
          {current ? <DemoRun key={current.key} item={current} /> : <Welcome onPick={select} />}
        </div>
      </div>
    </div>
  );
}

function Welcome({ onPick }: { onPick: (d: DemoItem) => void }) {
  // La plus courte des démonstrations (en nombre de règles) pour commencer.
  const first = [...DEMOS].sort((a, b) => a.spec.rules.length - b.spec.rules.length)[0]!;
  return (
    <Card className="p-5 md:p-6 space-y-3 text-[14px]">
      <SectionTitle>Comment ça marche</SectionTitle>
      <ol className="list-decimal space-y-1.5 pl-5">
        <li>Lis l’énoncé : les mots soulignés en pointillé ouvrent leur définition.</li>
        <li>Lis la preuve modèle, bloc par bloc : ce que chaque bloc utilise, ce qui le justifie, ce qu’il établit.</li>
        <li>Retrouve ensuite ses justifications, puis reconstruis les étapes effacées : l’effacement progresse jusqu’à la page blanche.</li>
        <li>Chaque bloc se vérifie : il n’est validé que si une règle explicite relie ses prémisses, sa justification et son affirmation.</li>
        <li>Bloqué ? « Que puis-je établir maintenant ? », « Remonter depuis le but », puis le plan, étape par étape.</li>
      </ol>
      <p>
        <button type="button" onClick={() => onPick(first)} className="text-accent hover:underline cursor-pointer" data-testid="premiere-demo">
          Commencer par une démonstration courte →
        </button>
      </p>
      <p className="text-text-3">{DEMOS.length} démonstrations jouables, dans les deux parcours.</p>
    </Card>
  );
}

const FADING_KEY = (key: string) => `prooflab:effacement:${key}`;

interface FadingState {
  level: FadingLevel;
  reached: FadingLevel[];
}

function readFading(key: string, hasDraft: boolean): FadingState {
  try {
    const raw = localStorage.getItem(FADING_KEY(key));
    if (raw) {
      const v = JSON.parse(raw) as FadingState;
      if (FADING_LEVELS.includes(v.level)) return { level: v.level, reached: v.reached.filter((l) => FADING_LEVELS.includes(l)) };
    }
  } catch {
    /* préférence illisible : valeur par défaut */
  }
  // Une page blanche déjà commencée reste où on l'a laissée ; sinon on part de la preuve modèle.
  return { level: hasDraft ? 'blanche' : 'lire', reached: [] };
}

function writeFading(key: string, state: FadingState) {
  try {
    localStorage.setItem(FADING_KEY(key), JSON.stringify(state));
  } catch {
    /* préférence non conservée */
  }
}

function DemoRun({ item }: { item: DemoItem }) {
  const { spec } = item;
  const cat = THEOREM_CATALOG.find((c) => c.id === item.theoremId)!;
  const track = trackOfTheorem(item.theoremId);
  const allowed = useMemo(() => allowedTheorems(item.theoremId, spec.purpose, item.prerequisites), [item, spec]);
  const draftKey = `labo:demonstration:${item.key}`;
  const hasDraft = useGame((s) => Boolean(s.save.drafts[draftKey]));
  const [fading, setFading] = useState<FadingState>(() => readFading(item.key, hasDraft));
  const [attempt, setAttempt] = useState(0);
  const session = useRef<ProofSession | null>(null);
  const level = fading.level;
  const seed = useMemo(() => (level === 'blanche' ? null : fadingSeed(spec, level)), [spec, level, attempt]); // eslint-disable-line react-hooks/exhaustive-deps

  const update = (next: FadingState) => {
    setFading(next);
    writeFading(item.key, next);
  };
  const choose = (l: FadingLevel) => {
    update({ ...fading, level: l });
    setAttempt((a) => a + 1);
  };
  const markReached = (l: FadingLevel) => {
    if (!fading.reached.includes(l)) update({ ...fading, reached: [...fading.reached, l] });
  };
  const nextLevel = FADING_LEVELS[FADING_LEVELS.indexOf(level) + 1];
  const goNext = () => {
    const reached = fading.reached.includes(level) ? fading.reached : [...fading.reached, level];
    if (nextLevel) {
      update({ level: nextLevel, reached });
      setAttempt((a) => a + 1);
    }
  };
  const restart = () => {
    session.current?.restart();
    setAttempt((a) => a + 1);
  };

  return (
    <TermScope track={track}>
      <Card className="mb-4 p-4">
        <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2 font-mono text-[11px] text-text-3">
          <span>
            Résultat {cat.n} · <Link to={`/theoreme/${cat.id}`} className="hover:text-text-2 hover:underline"><MathText text={cat.name} /></Link> · {item.label}
          </span>
          {item.exercisePath && (
            <LinkButton to={item.exercisePath} className="text-[12px]">
              Version notée de l’exercice
            </LinkButton>
          )}
        </div>
        <h2 className="mb-1.5 font-serif text-[20px]">
          <MathText text={item.title} />
        </h2>
        <Prose text={item.statement} className="font-serif text-[16px] leading-relaxed" terms={{ exclude: [`resultat-${item.theoremId}`] }} />
        {item.scopeNote && (
          <p className="mt-2 text-[13px] text-text-2" data-testid="portee-demo">
            <span className="font-mono text-[11px] text-text-3">Portée : </span>
            <MathText text={item.scopeNote} />
          </p>
        )}
        {item.verification && (
          <p className="mt-2 text-[12px] text-text-3">
            {VERIFICATION_LABEL[item.verification.origin]} · {REVIEW_LABEL[item.verification.review]}
          </p>
        )}
      </Card>

      <div className="mb-3" data-testid="effacement">
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Effacement progressif">
          {FADING_LEVELS.map((l, i) => (
            <button
              key={l}
              type="button"
              role="tab"
              aria-selected={level === l}
              onClick={() => choose(l)}
              className={cx(
                'rounded-md border px-3 py-1.5 text-[13px] cursor-pointer transition-colors',
                level === l ? 'border-accent bg-accent text-[var(--bg)]' : 'border-line hover:border-line-strong',
              )}
              data-effacement={l}
            >
              <span className="font-mono text-[11px] opacity-75">{i + 1}.</span> {FADING_META[l].label}
              {fading.reached.includes(l) && <span aria-label="étape réussie"> ✓</span>}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[13px] text-text-2">{FADING_META[level].help}</p>
      </div>

      <ProofWorkspace
        key={`${level}:${attempt}`}
        spec={spec}
        allowed={allowed}
        draftKey={level === 'blanche' ? draftKey : null}
        errorKey={null}
        mode="demo"
        guided
        plan={item.plan}
        track={track}
        fading={seed && level !== 'blanche' ? { level, seed } : undefined}
        onSession={(s) => {
          session.current = s;
        }}
        onSolved={() => markReached(level)}
        solvedSlot={
          <Card className="p-4" data-testid="demo-reussie">
            {level === 'lire' ? (
              <p className="text-[14px]">
                <span className="font-semibold text-proved">Preuve modèle lue. </span>
                Chaque bloc repose sur une règle explicite, jusqu’au but.
              </p>
            ) : (
              <p className="text-[14px]">
                <span className="font-semibold text-proved">{level === 'blanche' ? 'Démonstration complète. ' : 'Étape réussie. '}</span>
                Chaque bloc repose sur une règle explicite, jusqu’au but. « Lire la démonstration rédigée » la donne en phrases.
              </p>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-3">
              {nextLevel && (
                <Button variant="primary" onClick={goNext} data-testid="etape-suivante">
                  Étape {FADING_LEVELS.indexOf(nextLevel) + 1} : {FADING_META[nextLevel].label.toLowerCase()}
                </Button>
              )}
              {level !== 'lire' && (
                <button type="button" className="text-[13px] text-text-3 underline hover:text-text-2 cursor-pointer" onClick={restart} data-testid="recommencer-demo">
                  {level === 'blanche' ? 'Recommencer depuis zéro' : 'Recommencer cette étape'}
                </button>
              )}
            </div>
          </Card>
        }
      />
    </TermScope>
  );
}
