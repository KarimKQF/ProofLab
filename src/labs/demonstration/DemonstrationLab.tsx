/**
 * Laboratoire H — Démonstration. On n'y manipule que les démonstrations des énoncés :
 * choisir un résultat, puis construire sa preuve en blocs logiques, avec le guide de preuve
 * complet (méthode, ce qu'on peut établir maintenant, ce qu'il suffit de montrer, plan).
 * C'est un bac à sable : le brouillon est conservé, mais rien n'entre dans la progression.
 */
import { useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { EXERCISES, THEOREM_CATALOG, WORLDS } from '@/content';
import type { Exercise, ProofSpec } from '@/content/schema';
import { LEVEL_LABEL } from '@/content/schema';
import { allowedTheorems } from '@/content/catalog';
import { trackOfTheorem } from '@/content/dictionnaire';
import { Card, cx, LinkButton, PageHeader, SectionTitle } from '@/components/ui';
import { MathText, Prose } from '@/components/Math';
import { TermScope } from '@/components/glossary/context';
import { ProofWorkspace } from '@/components/proof/ProofWorkspace';
import type { ProofSession } from '@/components/proof/useProofSession';
import { toRoman } from '@/pages/MapPage';

interface DemoItem {
  key: string;
  exercise: Exercise;
  variant: boolean;
  spec: ProofSpec;
  statement: string;
}

/** Toutes les démonstrations jouables : exercices (et variantes) dont le but est l'énoncé. */
export const DEMOS: DemoItem[] = EXERCISES.flatMap((e) => {
  const out: DemoItem[] = [];
  if (e.proof.purpose === 'demonstration') out.push({ key: e.id, exercise: e, variant: false, spec: e.proof, statement: e.statement });
  if (e.variant.proof?.purpose === 'demonstration')
    out.push({ key: `${e.id}:variante`, exercise: e, variant: true, spec: e.variant.proof, statement: e.variant.statement });
  return out;
});

export function DemonstrationLab() {
  const [params, setParams] = useSearchParams();
  const [filter, setFilter] = useState<'tout' | 'analyse' | 'lie'>('tout');
  const requested = params.get('exercice');
  const wantVariant = params.get('variante') === '1';
  const current =
    DEMOS.find((d) => d.exercise.id === requested && d.variant === wantVariant) ?? DEMOS.find((d) => d.exercise.id === requested) ?? null;

  const byTheorem = useMemo(() => {
    const m = new Map<string, DemoItem[]>();
    for (const d of DEMOS) {
      const list = m.get(d.exercise.theoremId) ?? [];
      list.push(d);
      m.set(d.exercise.theoremId, list);
    }
    return m;
  }, []);

  const select = (d: DemoItem) => {
    const next = new URLSearchParams();
    next.set('exercice', d.exercise.id);
    if (d.variant) next.set('variante', '1');
    setParams(next);
    setListOpen(false);
  };

  const withoutDemo = THEOREM_CATALOG.filter((c) => !byTheorem.has(c.id));
  // Une démonstration choisie prend toute la largeur ; la liste se replie au-dessus.
  const [listOpen, setListOpen] = useState(false);
  const showList = !current || listOpen;

  return (
    <div className="max-w-[1500px] mx-auto px-5 md:px-8 py-7">
      <PageHeader eyebrow={<><Link to="/labos" className="hover:text-text-2">Laboratoires</Link> · Laboratoire H</>} title="Démonstration">
        On ne manipule ici que les démonstrations des énoncés. Choisis un résultat, puis écris sa preuve en blocs logiques : « Soit… / Supposons… », implications « si … alors … car … », théorèmes, calculs, contradiction, conclusion. Le guide propose la méthode, ce qu’on peut établir maintenant, ce qu’il suffit de montrer et le plan. Rien n’est enregistré dans ta progression.
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
                            <span className="ml-1 text-[11.5px] text-text-3">
                              · {LEVEL_LABEL[d.exercise.level]}
                              {d.variant ? ' · variante' : ''}
                            </span>
                          </button>
                        </li>
                      )),
                    )}
                  </ul>
                </div>
              );
            })}
          </Card>
          {withoutDemo.length > 0 && (
            <p className="text-[12px] text-text-3">
              {withoutDemo.length} résultat{withoutDemo.length > 1 ? 's' : ''} n’ont pas de démonstration jouable (seulement des applications) : leur preuve est décrite dans leur fiche.
            </p>
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
        <li>Regarde la forme du but dans le guide : implication, existence, unicité, raisonnement par l’absurde…</li>
        <li>Pose les blocs : introduis d’abord les objets (« Soit… ») ou l’hypothèse par l’absurde, puis enchaîne les implications jusqu’à la conclusion.</li>
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

function DemoRun({ item }: { item: DemoItem }) {
  const { exercise, spec, variant } = item;
  const cat = THEOREM_CATALOG.find((c) => c.id === exercise.theoremId)!;
  const track = trackOfTheorem(exercise.theoremId);
  const allowed = useMemo(() => allowedTheorems(exercise.theoremId, spec.purpose, exercise.prerequisites), [exercise, spec]);
  const [attempt, setAttempt] = useState(0);
  const session = useRef<ProofSession | null>(null);

  return (
    <TermScope track={track}>
      <Card className="mb-4 p-4">
        <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2 font-mono text-[11px] text-text-3">
          <span>
            Résultat {cat.n} · <Link to={`/theoreme/${cat.id}`} className="hover:text-text-2 hover:underline"><MathText text={cat.name} /></Link> · {LEVEL_LABEL[exercise.level]}
            {variant ? ' · variante' : ''}
          </span>
          <LinkButton to={`/preuve/${exercise.id}${variant ? '?variante=1' : ''}`} className="text-[12px]">
            Version notée de l’exercice
          </LinkButton>
        </div>
        <h2 className="mb-1.5 font-serif text-[20px]">
          <MathText text={exercise.title} />
        </h2>
        <Prose text={item.statement} className="font-serif text-[16px] leading-relaxed" terms={{ exclude: [`resultat-${exercise.theoremId}`] }} />
      </Card>
      <ProofWorkspace
        key={attempt}
        spec={spec}
        allowed={allowed}
        draftKey={`labo:demonstration:${item.key}`}
        errorKey={null}
        mode="demo"
        guided
        plan={variant ? undefined : exercise.steps}
        track={track}
        onSession={(s) => {
          session.current = s;
        }}
        solvedSlot={
          <Card className="p-4" data-testid="demo-reussie">
            <p className="text-[14px]">
              <span className="font-semibold text-proved">Démonstration complète. </span>
              Chaque bloc repose sur une règle explicite, jusqu’au but. « Lire la démonstration rédigée » la donne en phrases.
            </p>
            <button type="button" className="mt-2 text-[13px] text-text-3 underline hover:text-text-2 cursor-pointer" onClick={() => {
                session.current?.restart();
                setAttempt((a) => a + 1);
              }}
              data-testid="recommencer-demo">
              Recommencer depuis zéro
            </button>
          </Card>
        }
      />
    </TermScope>
  );
}
