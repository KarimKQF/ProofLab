/**
 * Démonstrations fautives jouées dans le mode « Trouver l'erreur », construites une fois
 * à partir du contenu (voir `hunt.ts`).
 */
import { EXERCISES } from '@/content';
import { selectHuntItems, type HuntItem } from './hunt';

let cache: HuntItem[] | null = null;

export function huntItems(): HuntItem[] {
  cache ??= selectHuntItems(EXERCISES);
  return cache;
}

let byId: Map<string, HuntItem> | null = null;

export function huntItem(id: string): HuntItem | undefined {
  byId ??= new Map(huntItems().map((i) => [i.id, i]));
  return byId.get(id);
}

export function huntItemsOf(theoremId: string): HuntItem[] {
  return huntItems().filter((i) => i.theoremId === theoremId);
}

export function huntItemsForConcept(concept: string): HuntItem[] {
  return huntItems().filter((i) => i.concept === concept);
}
