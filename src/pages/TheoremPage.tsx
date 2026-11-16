import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CATALOG_BY_ID, DEMONSTRATION_BY_THEOREM, THEOREM_BY_ID, exercisesOf, WORLDS } from '@/content';
import { LEVEL_LABEL } from '@/content/schema';
import { AUX_TOOLS, theoremLabel } from '@/content/catalog';
import { Button, Card, LinkButton, PageHeader, ProgressBar, SectionTitle, formatDate, pdfRef, REVIEW_LABEL, VERIFICATION_LABEL } from '@/components/ui';
import { MathText, Prose } from '@/components/Math';
import { TermScope } from '@/components/glossary/context';
import { useGame } from '@/storage/store';
import { autonomyOf, isUnlocked, theoremMastery } from '@/core/progression/mastery';
import { toRoman } from './MapPage';
import { plateById, plateImage, SCENE_FOR_THEOREM } from '@/content/atlas';
import { NotFoundPage } from './NotFoundPage';

const CONCLUSIONS = [
  ['existence', 'Existence'],
  ['unicite', 'Unicité'],
  ['regularite', 'Régularité'],
  ['stabilite', 'Stabilité'],
  ['autre', 'Autre'],
] as const;

export function TheoremPage() {
  const { id = '' } = useParams();
  const entry = CATALOG_BY_ID.get(id);
  const content = THEOREM_BY_ID.get(id);
  const exercises = useGame((s) => s.save.exercises);
  const drafts = useGame((s) => s.save.drafts);
  const unlockAll = useGame((s) => s.save.settings.unlockAll);
  const now = useGame((s) => s.now);
  const [openHyp, setOpenHyp] = useState<string | null>(null);
  const [showOutline, setShowOutline] = useState(false);

  if (!entry) return <NotFoundPage />;
  const world = WORLDS.find((w) => w.n === entry.world)!;
  const unlocked = isUnlocked(id, exercises, unlockAll);
  const mastery = theoremMastery(id, exercises, now());
  const items = exercisesOf(id);

  const self = { exclude: [`resultat-${id}`] };
  return (
    <TermScope track={world.track}>
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-9">
      <PageHeader
        eyebrow={
          <>
            <Link to="/carte" className="hover:text-text-2">Carte</Link> · Monde {toRoman(world.n)} · {world.title} · Résultat {entry.n}
          </>
        }
        title={<MathText text={entry.name} />}
      >
        <MathText text={entry.use} />
      </PageHeader>

      {!unlocked && (
        <Card className="p-4 mb-5">
          <p className="text-sm">
            <span className="text-miss font-medium">Résultat verrouillé. </span>
            Il s’ouvre lorsque ces résultats ont au moins un exercice validé :{' '}
            {entry.requires.map((r, i) => (
              <span key={r}>
                {i > 0 && ', '}
                <Link className="underline" to={`/theoreme/${r}`}>
                  <MathText text={theoremLabel(r)} />
                </Link>
              </span>
            ))}
            . La fiche reste consultable, et le mode libre ouvre tout sans condition.
          </p>
        </Card>
      )}

      {!content ? (
        <Card className="p-5">
          <p className="text-text-2">La fiche de ce résultat n’est pas encore rédigée.</p>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-[minmax(0,1fr)_280px] gap-5">
          <div className="space-y-5 min-w-0">
            <Card className="p-5">
              <SectionTitle className="mb-2">Espaces et objets</SectionTitle>
              <ul className="space-y-1 text-[14.5px]">
                {content.spaces.map((s, i) => (
                  <li key={i}>
                    <MathText text={s} terms={self} />
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-5">
              <SectionTitle className="mb-2">Hypothèses</SectionTitle>
              <ul className="space-y-1.5 text-[14.5px]">
                {content.hypotheses.map((h) => (
                  <li key={h.id}>
                    <div className="flex items-start justify-between gap-3">
                      <span>
                        <span className="text-hyp mr-1.5" aria-hidden>◆</span>
                        <MathText text={h.text} terms={self} />
                      </span>
                      {h.whenRemoved && (
                        <button
                          type="button"
                          className="shrink-0 text-xs text-text-3 hover:text-text-2 underline cursor-pointer"
                          aria-expanded={openHyp === h.id}
                          onClick={() => setOpenHyp(openHyp === h.id ? null : h.id)}
                        >
                          Et sans elle ?
                        </button>
                      )}
                    </div>
                    {openHyp === h.id && h.whenRemoved && (
                      <div className="mt-1.5 ml-5 rounded border border-line p-2.5 text-[13.5px] anim-rise" style={{ borderLeft: '3px solid var(--st-miss)' }}>
                        <MathText text={h.whenRemoved} terms={self} />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-5">
              <SectionTitle className="mb-2">Énoncé</SectionTitle>
              <Prose text={content.statement} className="font-serif text-[16.5px] leading-relaxed" terms={self} />
              <dl className="mt-3 grid gap-x-4 gap-y-1.5 sm:grid-cols-[auto_1fr] text-[13.5px]">
                {CONCLUSIONS.map(([k, label]) =>
                  content.conclusions[k] ? (
                    <div key={k} className="contents">
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-text-3 pt-0.5">{label}</dt>
                      <dd>
                        <MathText text={content.conclusions[k]!} terms={self} />
                      </dd>
                    </div>
                  ) : null,
                )}
              </dl>
            </Card>

            <Card className="p-5">
              <SectionTitle className="mb-3">Démontrer</SectionTitle>
              {items.length === 0 ? (
                <p className="text-text-2 text-sm">Les exercices de ce résultat ne sont pas encore rédigés.</p>
              ) : (
                <ul className="space-y-2">
                  {items.map((e) => {
                    const p = exercises[e.id];
                    const hasDraft = Boolean(drafts[e.id]) && !p?.solved;
                    return (
                      <li key={e.id} className="rounded-md border border-line p-3">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="font-mono text-[11px] text-text-3">{LEVEL_LABEL[e.level]}</span>
                          <span className="font-mono text-[11px]" style={{ color: p?.solved ? 'var(--st-hyp)' : 'var(--text-3)' }}>
                            {p?.solved ? (p.bestHintLevel === 0 ? 'Validé sans indice' : `Validé avec ${p.bestHintLevel} indice${(p.bestHintLevel ?? 0) > 1 ? 's' : ''}`) : p ? 'Tenté' : 'À faire'}
                          </span>
                        </div>
                        <div className="font-medium mt-0.5 mb-1"><MathText text={e.title} /></div>
                        <p className="text-[13.5px] text-text-2 mb-2.5 line-clamp-3">
                          <MathText text={e.statement} terms={self} />
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <LinkButton to={`/preuve/${e.id}`} variant="primary">
                            {hasDraft ? 'Reprendre la preuve' : 'Construire la preuve'}
                          </LinkButton>
                          <LinkButton to={`/preuve-libre/${e.id}`}>Preuve libre</LinkButton>
                          {e.proof.purpose === 'demonstration' && <LinkButton to={`/labo/demonstration?exercice=${e.id}`}>Laboratoire de démonstration</LinkButton>}
                          {p?.solved && e.variant.proof && <LinkButton to={`/preuve/${e.id}?variante=1`}>Variante</LinkButton>}
                        </div>
                      </li>
                    );
                  })}
                  {DEMONSTRATION_BY_THEOREM.has(id) && (
                    <li className="rounded-md border border-line p-3" data-testid="demonstration-resultat">
                      <span className="font-mono text-[11px] text-text-3">
                        {DEMONSTRATION_BY_THEOREM.get(id)!.scope === 'complete' ? 'Démonstration du résultat' : 'Étape clé de la démonstration'}
                      </span>
                      <div className="font-medium mt-0.5 mb-1"><MathText text={DEMONSTRATION_BY_THEOREM.get(id)!.title} /></div>
                      <p className="text-[13.5px] text-text-2 mb-2.5">
                        Les exercices ci-dessus appliquent le résultat ; sa démonstration se construit dans le laboratoire, de la preuve modèle à la page blanche.
                      </p>
                      <LinkButton to={`/labo/demonstration?resultat=${id}`}>Laboratoire de démonstration</LinkButton>
                    </li>
                  )}
                </ul>
              )}
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between mb-2">
                <SectionTitle>Plan de la démonstration</SectionTitle>
                <Button variant="ghost" onClick={() => setShowOutline((v) => !v)} aria-expanded={showOutline}>
                  {showOutline ? 'Masquer' : 'Afficher'}
                </Button>
              </div>
              {showOutline && (
                <ol className="list-decimal pl-5 space-y-1 text-[14px] anim-rise">
                  {content.proofOutline.map((s, i) => (
                    <li key={i}>
                      <MathText text={s} terms={self} />
                    </li>
                  ))}
                </ol>
              )}
              {!showOutline && <p className="text-sm text-text-3">Masqué pour ne pas remplacer ta propre construction.</p>}
            </Card>

            {content.warnings.length > 0 && (
              <Card className="p-5">
                <SectionTitle className="mb-2">Points de vigilance</SectionTitle>
                <ul className="space-y-1.5 text-[14px]">
                  {content.warnings.map((w, i) => (
                    <li key={i}>
                      <span className="text-miss mr-1.5" aria-hidden>△</span>
                      <MathText text={w} terms={self} />
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            <Card className="p-5">
              <SectionTitle className="mb-2">Pourquoi utile aux EDP</SectionTitle>
              <p className="text-[14.5px]">
                <MathText text={content.usefulFor} terms={self} />
              </p>
            </Card>
          </div>

          <aside className="space-y-4">
            <Card className="p-4">
              <SectionTitle className="mb-2">Maîtrise</SectionTitle>
              <ProgressBar value={mastery.value} label="Maîtrise du résultat" />
              <dl className="mt-3 text-[13px] space-y-1">
                <Row k="Validés" v={`${mastery.solved} / 3`} />
                <Row k="Tentatives" v={String(mastery.attempts)} />
                <Row k="Dernière révision" v={formatDate(mastery.lastReview)} />
                <Row k="Prochaine révision" v={formatDate(mastery.nextReview)} />
                <Row
                  k="Autonomie"
                  v={
                    items.length
                      ? `${Math.round((items.reduce((s, e) => s + autonomyOf(exercises[e.id]), 0) / items.length) * 100)} %`
                      : '—'
                  }
                />
              </dl>
            </Card>
            {entry.lab && (
              <Card className="p-4">
                <SectionTitle className="mb-2">Laboratoire</SectionTitle>
                <p className="text-[13px] text-text-2 mb-2.5">Observer le résultat sur des objets manipulables.</p>
                <LinkButton to={`/labo/${entry.lab}${SCENE_FOR_THEOREM[id] ? `?scene=${SCENE_FOR_THEOREM[id]}` : ''}`} className="w-full">Ouvrir le laboratoire</LinkButton>
              </Card>
            )}
            {(entry.atlas?.length ?? 0) > 0 && (
              <Card className="p-4" data-testid="atlas-planches">
                <SectionTitle className="mb-2">Atlas visuel</SectionTitle>
                <ul className="grid grid-cols-2 gap-2">
                  {entry.atlas!.map((n) => {
                    const p = plateById(n);
                    return p ? (
                      <li key={n}>
                        <Link to={`/atlas/${n}`} className="block rounded border border-line hover:border-line-strong overflow-hidden">
                          <img src={plateImage(n, 'mini')} alt="" loading="lazy" className="w-full aspect-[1.414] object-cover bg-white" />
                          <span className="block px-1.5 py-1 text-[11.5px] leading-tight">
                            <span className="font-mono text-text-3">Planche {n}</span> · {p.title}
                          </span>
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              </Card>
            )}
            <Card className="p-4">
              <SectionTitle className="mb-2">Dépend de</SectionTitle>
              <ul className="text-[13px] space-y-1">
                {entry.requires.map((r) => (
                  <li key={r}>
                    <Link className="hover:underline" to={`/theoreme/${r}`}>
                      <MathText text={theoremLabel(r)} />
                    </Link>
                  </li>
                ))}
                {(entry.tools ?? []).map((tool) => (
                  <li key={tool} className="text-text-3">
                    <MathText text={AUX_TOOLS[tool] ?? tool} /> <span className="text-[11px]">(admis)</span>
                  </li>
                ))}
                {entry.requires.length === 0 && (entry.tools ?? []).length === 0 && <li className="text-text-3">Aucun prérequis du parcours.</li>}
              </ul>
            </Card>
            <Card className="p-4">
              <SectionTitle className="mb-2">Source et vérification</SectionTitle>
              <p className="text-[13px] text-text-2">
                {entry.doc === 'cours-lie' ? 'Cours de géométrie de Lie' : 'Polycopié'}, section {entry.section}, {pdfRef(entry.pdfPage, entry.doc ?? 'polycopie')}.
              </p>
              <p className="text-[13px] mt-1.5">{VERIFICATION_LABEL[content.verification.origin]}.</p>
              <p className="text-[13px] text-text-2 mt-1">{REVIEW_LABEL[content.verification.review]}.</p>
              {content.verification.notes && <p className="text-[12.5px] text-text-3 mt-1"><MathText text={content.verification.notes} /></p>}
            </Card>
          </aside>
        </div>
      )}
    </div>
    </TermScope>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-2">
      <dt className="text-text-3">{k}</dt>
      <dd className="tabular">{v}</dd>
    </div>
  );
}
