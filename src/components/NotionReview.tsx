/**
 * Révision des notions du dictionnaire : une carte à la fois. On se pose la question, on
 * tente de répondre de mémoire, puis on compare avec la fiche et l'on se note. La question
 * change d'une révision à l'autre (définition, exemple, contre-exemple, piège, méthode).
 */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { COMPLEMENT_LABEL, DICO_BY_ID, type ComplementKind, type ResolvedEntry } from '@/content/dictionnaire';
import { notionQueue, NOTION_GRADES } from '@/core/progression/notions';
import { useGame } from '@/storage/store';
import type { NotionCard } from '@/storage/save';
import { Button, Card, SectionTitle } from '@/components/ui';
import { MathText, Prose } from '@/components/Math';
import { TermScope } from '@/components/glossary/context';

type Facet = 'definition' | Extract<ComplementKind, 'exemple' | 'contre-exemple' | 'attention' | 'montrer'>;

const plain = (s: string) => s.replace(/\$/g, '');

/** Questions possibles pour une notion, selon ce que sa fiche contient. */
export function facetsOf(entry: ResolvedEntry): Facet[] {
  const out: Facet[] = ['definition'];
  for (const k of ['contre-exemple', 'montrer', 'attention', 'exemple'] as const) {
    if (entry.complements.some((c) => c.kind === k)) out.push(k);
  }
  return out;
}

export function promptFor(entry: ResolvedEntry, facet: Facet): string {
  const term = `« ${entry.term} »`;
  switch (facet) {
    case 'definition':
      if (entry.theoremId) return `Énonce le résultat ${term} : hypothèses, puis conclusion.`;
      if (entry.toolId) return `Énonce l’outil ${term} et dis à quoi il sert.`;
      return `Donne la définition de ${term}.`;
    case 'contre-exemple':
      return `Donne un contre-exemple lié à ${term} : ce qui tombe quand une hypothèse manque.`;
    case 'montrer':
      return `Comment montre-t-on ${term} ? Donne la méthode.`;
    case 'attention':
      return `Quel piège faut-il éviter avec ${term} ?`;
    case 'exemple':
      return `Donne un exemple de ${term}.`;
  }
}

function facetOf(entry: ResolvedEntry, card: NotionCard): Facet {
  const facets = facetsOf(entry);
  // Une notion liée à une erreur commence par son piège, quand la fiche en décrit un.
  if (card.origin === 'piege' && card.reviews === 0 && facets.includes('attention')) return 'attention';
  return facets[card.reviews % facets.length]!;
}

export function useNotionQueue(): string[] {
  const deck = useGame((s) => s.save.notions);
  const paused = useGame((s) => s.save.settings.pausedSince !== null);
  const now = useGame((s) => s.now);
  return useMemo(() => (paused ? [] : notionQueue(deck, now(), (id) => DICO_BY_ID.has(id))), [deck, paused, now]);
}

export function NotionReview({ onClose }: { onClose: () => void }) {
  // La séance est fixée au départ : une carte notée ne réapparaît pas pendant la séance.
  const initial = useNotionQueue();
  const [session] = useState(() => initial);
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(false);
  const [done, setDone] = useState(0);
  const deck = useGame((s) => s.save.notions);
  const review = useGame((s) => s.reviewNotion);

  const id = session[index];
  const entry = id ? DICO_BY_ID.get(id) : undefined;
  const card = id ? deck[id] : undefined;

  if (!entry || !card) {
    return (
      <Card className="p-5" data-testid="revision-notions-fin">
        <p className="text-[14px]">
          {done > 0 ? `Séance terminée : ${done} notion${done > 1 ? 's' : ''} revue${done > 1 ? 's' : ''}.` : 'Aucune notion à revoir maintenant.'} Les prochaines échéances suivent l’algorithme SM-2.
        </p>
        <Button className="mt-3" onClick={onClose}>
          Fermer
        </Button>
      </Card>
    );
  }

  const facet = facetOf(entry, card);
  const complement = facet === 'definition' ? undefined : entry.complements.find((c) => c.kind === facet);

  const grade = (q: number) => {
    review(entry.id, q);
    setDone((n) => n + 1);
    setShown(false);
    setIndex((i) => i + 1);
  };

  return (
    <TermScope track={entry.track}>
      <Card className="p-5" data-testid="carte-notion" data-notion={entry.id}>
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2 font-mono text-[11px] text-text-3">
          <span>
            Notion {index + 1} / {session.length}
            {card.stumbles > 0 && ` · liée à ${card.stumbles} erreur${card.stumbles > 1 ? 's' : ''}`}
          </span>
          <button type="button" className="underline hover:text-text-2 cursor-pointer" onClick={onClose}>
            Interrompre
          </button>
        </div>
        <h3 className="font-serif text-[22px]">
          <MathText text={entry.term} />
        </h3>
        <p className="mt-1 text-[15px]" data-testid="question-notion">
          <MathText text={promptFor(entry, facet)} />
        </p>
        {!shown ? (
          <div className="mt-4">
            <p className="mb-2 text-[13px] text-text-3">Réponds de mémoire (à voix haute ou sur papier), puis compare.</p>
            <Button variant="primary" onClick={() => setShown(true)} data-testid="voir-reponse">
              Voir la réponse
            </Button>
          </div>
        ) : (
          <div className="mt-4 anim-rise">
            <div className="rounded-md border border-line bg-surface-2 p-3.5" data-testid="reponse-notion">
              {complement ? (
                <>
                  <SectionTitle className="mb-1">{COMPLEMENT_LABEL[complement.kind]}</SectionTitle>
                  <Prose text={complement.text} className="text-[14.5px]" terms />
                  <details className="mt-2 text-[13.5px]">
                    <summary className="cursor-pointer text-text-3">Rappel de la définition</summary>
                    <Prose text={entry.definition} className="mt-1" terms={{ exclude: [entry.id] }} />
                  </details>
                </>
              ) : (
                <>
                  <SectionTitle className="mb-1">{entry.theoremId ? 'Énoncé' : 'Définition'}</SectionTitle>
                  <Prose text={entry.definition} className="text-[14.5px]" terms={{ exclude: [entry.id] }} />
                </>
              )}
              <p className="mt-2 text-[12.5px]">
                <Link to={`/dictionnaire/${entry.id}`} className="text-accent hover:underline">
                  Fiche complète →
                </Link>
              </p>
            </div>
            <p className="mb-2 mt-3 text-[13px] text-text-2">Ta réponse était-elle juste et complète ?</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="Évaluer ta réponse">
              {NOTION_GRADES.map((g) => (
                <button
                  key={g.q}
                  type="button"
                  onClick={() => grade(g.q)}
                  className="flex flex-col items-start justify-start rounded-md border border-line px-2.5 py-2 text-left hover:border-line-strong cursor-pointer"
                  data-testid={`note-${g.q}`}
                  title={g.help}
                >
                  <span className="block text-[14px] font-medium">{g.label}</span>
                  <span className="block text-[11.5px] text-text-3">{g.help}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </Card>
    </TermScope>
  );
}

/** Fiche brève d'une notion pour la liste des révisions. */
export function notionLabel(id: string): string {
  return plain(DICO_BY_ID.get(id)?.term ?? id);
}
