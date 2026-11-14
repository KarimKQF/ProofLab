import { describe, expect, it } from 'vitest';
import { CONCEPTS, THEOREM_MODULES } from '@/content';
import { CATALOG_BY_ID } from '@/content/catalog';
import { TheoremSchema, DefinitionSchema, CounterexampleTaskSchema, ConceptSchema } from '@/content/schema';
import { LEVELS } from '@/content/schema';
import { assertMixedText, validateExercise } from './validate';
import { evaluateCheck, referenceAnswer, type ClosedCheck } from '@/core/math/closed-checks';

const known = new Set(CONCEPTS.map((c) => c.id));

for (const mod of THEOREM_MODULES) {
  const id = mod.theorem.id;
  describe(`Contenu — ${id}`, () => {
    it('fiche du théorème', () => {
      const parsed = TheoremSchema.safeParse(mod.theorem);
      expect(parsed.success, parsed.success ? '' : parsed.error.message).toBe(true);
      expect(CATALOG_BY_ID.has(id), `${id} absent du catalogue`).toBe(true);
      const th = mod.theorem;
      const c = th.conclusions;
      const texts = [
        ...th.spaces,
        th.statement,
        ...th.proofOutline,
        ...th.warnings,
        th.usefulFor,
        ...th.hypotheses.map((h) => h.text),
        ...th.hypotheses.flatMap((h) => (h.whenRemoved ? [h.whenRemoved] : [])),
        ...[c.existence, c.unicite, c.regularite, c.stabilite, c.autre].filter((x): x is string => Boolean(x)),
      ];
      for (const x of texts) assertMixedText(x, `${id}.fiche`);
      expect(new Set(th.hypotheses.map((h) => h.id)).size, 'hypothèses dupliquées').toBe(th.hypotheses.length);
    });

    it('trois exercices, un par niveau', () => {
      expect(mod.exercises.map((e) => e.level)).toEqual([...LEVELS]);
      for (const e of mod.exercises) expect(e.theoremId).toBe(id);
    });

    for (const ex of mod.exercises) {
      it(`exercice ${ex.level}`, () => validateExercise(ex, { knownConcepts: known }));
    }

    it('définitions, concepts et contre-exemples', () => {
      for (const d of mod.definitions) {
        DefinitionSchema.parse(d);
        assertMixedText(d.term, `${d.id}.terme`);
        assertMixedText(d.statement, `${d.id}.enonce`);
      }
      for (const c of mod.concepts) {
        ConceptSchema.parse(c);
        assertMixedText(c.reminder, `${c.id}.rappel`);
      }
      for (const ce of mod.counterexamples) {
        CounterexampleTaskSchema.parse(ce);
        expect(known.has(ce.concept), `${ce.id} : concept inconnu ${ce.concept}`).toBe(true);
        for (const x of [ce.title, ce.claim, ce.correctStatement, ce.task, ce.explanation]) assertMixedText(x, ce.id);
        assertMixedText(ce.check.prompt, `${ce.id}.check`);
        const ref = referenceAnswer(ce.check as ClosedCheck);
        if (ref) expect(evaluateCheck(ce.check as ClosedCheck, ref).status).toBe('valide');
      }
    });
  });
}
