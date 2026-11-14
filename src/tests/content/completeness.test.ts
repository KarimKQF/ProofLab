/**
 * Complétude des parcours : un module par résultat du catalogue, trois exercices chacun, identifiants uniques, au moins
 * une variante jouable en examen par résultat. Ce test échoue tant que du contenu manque :
 * il mesure l'état réel du parcours, sans rien supposer.
 */
import { describe, expect, it } from 'vitest';
import { THEOREM_CATALOG } from '@/content/catalog';
import { CONCEPTS, COUNTEREXAMPLES, DEFINITIONS, EXERCISES, INCOMPLETE_MODULES, THEOREM_MODULES } from '@/content';

const dupes = (ids: string[]) => ids.filter((x, i) => ids.indexOf(x) !== i);

describe('Complétude du parcours', () => {
  it('aucun module en cours de rédaction', () => {
    expect(INCOMPLETE_MODULES).toEqual([]);
  });

  it(`les ${THEOREM_CATALOG.length} résultats du catalogue ont leur module`, () => {
    const present = new Set(THEOREM_MODULES.map((m) => m.theorem.id));
    const missing = THEOREM_CATALOG.filter((t) => !present.has(t.id)).map((t) => t.id);
    expect(missing).toEqual([]);
  });

  it('trois exercices par résultat (102 en analyse, 33 en géométrie de Lie)', () => {
    expect(EXERCISES.length).toBe(THEOREM_CATALOG.length * 3);
    expect(THEOREM_CATALOG.filter((t) => t.doc !== 'cours-lie')).toHaveLength(34);
    expect(THEOREM_CATALOG.filter((t) => t.doc === 'cours-lie')).toHaveLength(11);
  });

  it('chaque résultat a au moins une variante jouable en examen', () => {
    for (const m of THEOREM_MODULES) {
      expect(m.exercises.some((e) => e.variant.proof), m.theorem.id).toBe(true);
    }
  });

  it('identifiants uniques dans tout le contenu', () => {
    expect(dupes(EXERCISES.map((e) => e.id))).toEqual([]);
    expect(dupes(CONCEPTS.map((c) => c.id))).toEqual([]);
    expect(dupes(DEFINITIONS.map((d) => d.id))).toEqual([]);
    expect(dupes(COUNTEREXAMPLES.map((c) => c.id))).toEqual([]);
  });
});
