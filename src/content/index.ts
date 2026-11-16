/**
 * Point d'entrée du contenu : assemble les modules de théorèmes et construit les index.
 * Ajouter un résultat revient à ajouter un fichier `worlds/wN/tNN-<id>.ts` ; aucune
 * autre modification n'est nécessaire.
 */
import type { Concept, CounterexampleTask, Definition, Demonstration, Exercise, Level, TheoremContent } from './schema';
import { SHARED_CONCEPTS } from './concepts';
import { CATALOG_BY_ID, THEOREM_CATALOG, WORLDS } from './catalog';
import type { CatalogEntry } from './catalog';
import type { TheoremModule } from './worlds/types';

const found = import.meta.glob<{ default: TheoremModule }>('./worlds/*/t*.ts', { eager: true });

/** Modules complets uniquement : un fichier en cours de rédaction, sans export par défaut, est ignoré. */
export const INCOMPLETE_MODULES: string[] = Object.entries(found)
  .filter(([, m]) => !m.default?.theorem)
  .map(([path]) => path);

export const THEOREM_MODULES: TheoremModule[] = Object.values(found)
  .map((m) => m.default)
  .filter((m): m is TheoremModule => Boolean(m?.theorem))
  .sort((a, b) => (CATALOG_BY_ID.get(a.theorem.id)?.n ?? 0) - (CATALOG_BY_ID.get(b.theorem.id)?.n ?? 0));

/**
 * Relecture mathématique indépendante : chaque relecteur consigne ses conclusions dans
 * `reviews/<relecteur>.ts`. « relu » fait passer le statut à `relecture-ia` ; « doute »
 * laisse le statut automatique et affiche la réserve à l'utilisateur.
 */
export interface ReviewEntry {
  /** Identifiant d'un théorème (`riesz`) ou d'un exercice (`riesz.facile`). */
  id: string;
  status: 'relu' | 'doute';
  notes?: string;
}

const reviewFiles = import.meta.glob<{ default: ReviewEntry[] }>('./reviews/*.ts', { eager: true });
export const REVIEWS = new Map(
  Object.values(reviewFiles)
    .flatMap((f) => f.default ?? [])
    .map((r) => [r.id, r] as const),
);

function reviewed<T extends { verification: Exercise['verification'] }>(id: string, item: T): T {
  const r = REVIEWS.get(id);
  if (!r) return item;
  const note = r.notes ? (r.status === 'doute' ? `Réserve de relecture : ${r.notes}` : r.notes) : undefined;
  return {
    ...item,
    verification: {
      ...item.verification,
      review: r.status === 'relu' ? 'relecture-ia' : item.verification.review,
      notes: [item.verification.notes, note].filter(Boolean).join(' ') || undefined,
    },
  };
}

export const THEOREMS: TheoremContent[] = THEOREM_MODULES.map((m) => reviewed(m.theorem.id, m.theorem));
export const EXERCISES: Exercise[] = THEOREM_MODULES.flatMap((m) => m.exercises.map((e) => reviewed(e.id, e)));
export const DEFINITIONS: Definition[] = THEOREM_MODULES.flatMap((m) => m.definitions);
export const COUNTEREXAMPLES: CounterexampleTask[] = THEOREM_MODULES.flatMap((m) => m.counterexamples);
export const CONCEPTS: Concept[] = [...SHARED_CONCEPTS, ...THEOREM_MODULES.flatMap((m) => m.concepts)];

/** Démonstrations de résultats (laboratoire de démonstration) : un fichier `demonstrations/dNN-<id>.ts` par résultat. */
const demoFiles = import.meta.glob<{ default: Demonstration }>('./demonstrations/d*.ts', { eager: true });
export const DEMONSTRATIONS: Demonstration[] = Object.values(demoFiles)
  .map((m) => m.default)
  .filter((d): d is Demonstration => Boolean(d?.proof))
  .map((d) => reviewed(d.id, d))
  .sort((a, b) => (CATALOG_BY_ID.get(a.theoremId)?.n ?? 0) - (CATALOG_BY_ID.get(b.theoremId)?.n ?? 0));
export const DEMONSTRATION_BY_THEOREM = new Map(DEMONSTRATIONS.map((d) => [d.theoremId, d]));

export const THEOREM_BY_ID = new Map(THEOREMS.map((t) => [t.id, t]));
export const EXERCISE_BY_ID = new Map(EXERCISES.map((e) => [e.id, e]));
export const CONCEPT_BY_ID = new Map(CONCEPTS.map((c) => [c.id, c]));
export const COUNTEREXAMPLE_BY_ID = new Map(COUNTEREXAMPLES.map((c) => [c.id, c]));

export function exercisesOf(theoremId: string): Exercise[] {
  return EXERCISES.filter((e) => e.theoremId === theoremId);
}

export function exerciseAt(theoremId: string, level: Level): Exercise | undefined {
  return EXERCISE_BY_ID.get(`${theoremId}.${level}`);
}

export function catalogOf(theoremId: string): CatalogEntry {
  const entry = CATALOG_BY_ID.get(theoremId);
  if (!entry) throw new Error(`Théorème inconnu : ${theoremId}`);
  return entry;
}

export { THEOREM_CATALOG, WORLDS, CATALOG_BY_ID };
