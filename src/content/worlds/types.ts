import type { Concept, CounterexampleTask, Definition, Exercise, TheoremContent } from '@/content/schema';

/**
 * Module de contenu d'un théorème : un fichier `worlds/wN/tNN-<id>.ts` par résultat,
 * découvert automatiquement par `src/content/index.ts`.
 */
export interface TheoremModule {
  theorem: TheoremContent;
  /** Définitions introduites par ce résultat (carnet). */
  definitions: Definition[];
  /** Concepts propres à ce résultat, s'ils manquent à `concepts.ts`. Préfixer l'identifiant. */
  concepts: Concept[];
  /** Tâches du mode Contre-exemples. */
  counterexamples: CounterexampleTask[];
  /** Exactement trois exercices : facile, intermédiaire, difficile. */
  exercises: Exercise[];
}
