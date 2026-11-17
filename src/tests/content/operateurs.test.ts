import { describe, expect, it } from 'vitest';
import { OPERATOR_LESSONS, OPERATOR_LESSON_BY_ID } from '@/content/operateurs';
import { CATALOG_BY_ID } from '@/content/catalog';
import { OPERATOR_PLATES, OPERATOR_PLATE_BY_ID } from '@/components/operator-atlas/data';
import { OPERATOR_SCENE_IDS } from '@/components/operator-atlas/scenes';
import { assertMixedText } from './validate';

function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

describe('Cours opérateurs et spectre', () => {
  it('relie chaque leçon, source, question et figure à un objet existant', () => {
    expect(OPERATOR_LESSONS).toHaveLength(13);
    expect(OPERATOR_LESSON_BY_ID.size).toBe(OPERATOR_LESSONS.length);
    const seen = new Set<string>();
    for (const lesson of OPERATOR_LESSONS) {
      for (const id of lesson.prerequisites) expect(seen.has(id), `${lesson.id}: prérequis antérieur ${id}`).toBe(true);
      seen.add(lesson.id);
      expect(OPERATOR_PLATE_BY_ID.has(lesson.atlasId), lesson.id).toBe(true);
      lesson.theoremIds.forEach((id) => expect(CATALOG_BY_ID.has(id), id).toBe(true));
      expect(lesson.proof.steps.length).toBeGreaterThanOrEqual(4);
      expect(lesson.proof.scopeNote.length).toBeGreaterThan(20);
      expect(lesson.sources.length).toBeGreaterThan(0);
      for (const source of lesson.sources) {
        if (source.kind !== 'complement') expect(source.pdfPages.length).toBeGreaterThan(0);
        for (const page of source.pdfPages) {
          expect(page).toBeGreaterThan(0);
          expect(page).toBeLessThanOrEqual(source.kind === 'cours-analyse' ? 165 : 46);
        }
      }
      expect(lesson.questions.length).toBeGreaterThanOrEqual(2);
      expect(new Set(lesson.questions.map((q) => q.id)).size).toBe(lesson.questions.length);
      for (const q of lesson.questions) {
        expect(Number.isInteger(q.correctIndex)).toBe(true);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(q.options.length);
        q.options.forEach((option) => expect(option.feedback.length).toBeGreaterThan(10));
      }
    }
  });

  for (const lesson of OPERATOR_LESSONS) it(`compile le français mathématique et les formules : ${lesson.id}`, () => {
    strings(lesson).forEach((text) => assertMixedText(text, lesson.id));
  });

  it('signale la construction générale comme un plan comportant des étapes admises', () => {
    const proof = OPERATOR_LESSON_BY_ID.get('spectral-general')!.proof;
    expect(proof.scope).toBe('theorem-roadmap');
    expect(proof.scopeNote).toMatch(/ne constitue pas une démonstration complète/);
    expect(proof.steps.join(' ')).toMatch(/admis/);
  });
});

describe('Atlas opérateurs : renvois et formules', () => {
  it('toutes les planches ont une scène et un cours accessibles', () => {
    expect(OPERATOR_PLATES).toHaveLength(12);
    expect(new Set(OPERATOR_PLATES.map((p) => p.id)).size).toBe(12);
    expect([...OPERATOR_SCENE_IDS].sort()).toEqual(OPERATOR_PLATES.map((p) => p.id).sort());
    for (const plate of OPERATOR_PLATES) {
      expect(OPERATOR_LESSON_BY_ID.has(plate.lessonId), plate.id).toBe(true);
      for (const id of plate.theoremIds) expect(CATALOG_BY_ID.has(id), id).toBe(true);
      expect(plate.limit.length).toBeGreaterThan(50);
      strings(plate).forEach((text) => assertMixedText(text, plate.id));
    }
  });
});
