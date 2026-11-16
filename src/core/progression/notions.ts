/**
 * Révision des notions du dictionnaire (répétition espacée, SM-2, comme les exercices).
 *
 * Une notion entre dans les révisions quand on l'a consultée en lisant un énoncé, quand
 * une erreur s'y rattache (piège, étape fautive manquée), ou à la main. Ici la qualité est
 * déclarée par le joueur après avoir comparé sa réponse à la fiche : on ne peut pas
 * vérifier automatiquement une définition restituée de mémoire.
 *
 * Priorité : les notions sur lesquelles on a trébuché d'abord (les plus fréquentes en tête),
 * puis les plus en retard.
 */
import { DAY, newCard, reviewCard } from './srs';
import type { NotionCard, NotionOrigin } from '@/storage/save';

export type NotionDeck = Record<string, NotionCard>;

/** Délai avant la première révision : une notion consultée se revoit le lendemain, une erreur tout de suite. */
const FIRST_DELAY: Record<NotionOrigin, number> = { consultee: DAY, piege: 0, manuelle: 0 };

/** Ajoute des notions aux révisions (sans doublon). Une erreur rend la notion due aussitôt. */
export function addNotions(deck: NotionDeck, ids: readonly string[], origin: NotionOrigin, now: number): NotionDeck {
  let next = deck;
  for (const id of ids) {
    const prev = next[id];
    if (prev) {
      if (origin !== 'piege') continue;
      next = {
        ...next,
        [id]: { ...prev, stumbles: prev.stumbles + 1, srs: { ...prev.srs, due: Math.min(prev.srs.due, now) } },
      };
      continue;
    }
    const card = newCard(now);
    next = {
      ...next,
      [id]: {
        srs: { ...card, due: now + FIRST_DELAY[origin] },
        addedAt: now,
        origin,
        stumbles: origin === 'piege' ? 1 : 0,
        reviews: 0,
        lapses: 0,
      },
    };
  }
  return next;
}

export function removeNotion(deck: NotionDeck, id: string): NotionDeck {
  if (!deck[id]) return deck;
  const next = { ...deck };
  delete next[id];
  return next;
}

/** Qualités proposées après lecture de la fiche (échelle SM-2). */
export const NOTION_GRADES = [
  { q: 1, label: 'À revoir', help: 'Je ne m’en souvenais pas, ou mal.' },
  { q: 3, label: 'Difficile', help: 'Retrouvée avec effort, ou incomplète.' },
  { q: 4, label: 'Bien', help: 'Retrouvée correctement.' },
  { q: 5, label: 'Facile', help: 'Retrouvée tout de suite, sans hésitation.' },
] as const;

export function reviewNotion(card: NotionCard, q: number, now: number): NotionCard {
  return {
    ...card,
    srs: reviewCard(card.srs, q, now),
    reviews: card.reviews + 1,
    lapses: card.lapses + (q < 3 ? 1 : 0),
  };
}

/** Notions dues, dans l'ordre de révision. */
export function notionQueue(deck: NotionDeck, now: number, known: (id: string) => boolean, limit = 20): string[] {
  return Object.entries(deck)
    .filter(([id, c]) => known(id) && c.srs.due <= now)
    .sort(([, a], [, b]) => b.stumbles - a.stumbles || a.srs.due - b.srs.due)
    .slice(0, limit)
    .map(([id]) => id);
}
