/**
 * Démonstrations de résultats (laboratoire de démonstration) : même validation que les
 * preuves des exercices (but dérivable, distracteurs non dérivables et expliqués, hypothèses
 * nécessaires réellement nécessaires, aucun résultat indisponible), et couverture : chacun
 * des 45 résultats a au moins une démonstration jouable.
 */
import { describe, expect, it } from 'vitest';
import { CONCEPTS, DEMONSTRATIONS, EXERCISES } from '@/content';
import { allowedTheorems, AUX_TOOLS, CATALOG_BY_ID, THEOREM_CATALOG } from '@/content/catalog';
import { DemonstrationSchema } from '@/content/schema';
import { assertMixedText, validateProof } from './validate';

const known = new Set(CONCEPTS.map((c) => c.id));

describe('Démonstrations de résultats', () => {
  for (const d of DEMONSTRATIONS) {
    it(d.id, () => {
      const parsed = DemonstrationSchema.safeParse(d);
      expect(parsed.success, parsed.success ? '' : parsed.error.message).toBe(true);
      expect(d.id).toBe(`${d.theoremId}.demonstration`);
      expect(CATALOG_BY_ID.has(d.theoremId), `${d.id} : résultat inconnu`).toBe(true);
      expect(d.proof.purpose).toBe('demonstration');
      if (d.scope === 'partie') expect(d.scopeNote, `${d.id} : portée à préciser`).toBeTruthy();
      for (const x of [d.title, d.statement, d.solution, d.source.label, ...d.plan, ...(d.scopeNote ? [d.scopeNote] : [])]) assertMixedText(x, d.id);
      for (const p of d.prerequisites) expect(CATALOG_BY_ID.has(p) || p in AUX_TOOLS, `${d.id} : prérequis inconnu ${p}`).toBe(true);
      const cat = CATALOG_BY_ID.get(d.theoremId)!;
      expect(d.source.doc, `${d.id} : document source`).toBe(cat.doc === 'cours-lie' ? 'cours-lie' : 'polycopie');
      if (d.source.doc === 'polycopie') expect(d.source.pdfPage!).toBeGreaterThanOrEqual(5);
      if (d.source.doc === 'polycopie') expect(d.source.pdfPage!).toBeLessThanOrEqual(46);
      if (d.source.doc === 'cours-lie') expect(d.source.pdfPage!).toBeGreaterThanOrEqual(21);
      if (d.source.doc === 'cours-lie') expect(d.source.pdfPage!).toBeLessThanOrEqual(275);
      // Aucun calcul fermé : une démonstration se joue sur des règles, pas sur des valeurs.
      expect(d.proof.nodes.some((n) => n.check), `${d.id} : calcul fermé inattendu`).toBe(false);
      validateProof(d.proof, { allowed: allowedTheorems(d.theoremId, 'demonstration', d.prerequisites), where: d.id, knownConcepts: known });
      // Le résultat lui-même n'est jamais invocable : un piège l'explique quand il est proposé.
      const self = d.proof.justifications.filter((j) => j.theorem === d.theoremId);
      for (const j of self) expect(d.proof.traps.some((tr) => tr.by === j.id && tr.concept === 'circularite'), `${d.id} : ${j.id}`).toBe(true);
    });
  }

  it('une démonstration au plus par résultat', () => {
    const ids = DEMONSTRATIONS.map((d) => d.theoremId);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('chacun des 45 résultats a au moins une démonstration jouable', () => {
    const covered = new Set([
      ...EXERCISES.filter((e) => e.proof.purpose === 'demonstration' || e.variant.proof?.purpose === 'demonstration').map((e) => e.theoremId),
      ...DEMONSTRATIONS.map((d) => d.theoremId),
    ]);
    expect(THEOREM_CATALOG.filter((c) => !covered.has(c.id)).map((c) => c.id)).toEqual([]);
  });
});
