import { describe, expect, it } from 'vitest';
import { DAY, newCard, qualityOf, reviewCard, shiftDueDates } from '@/core/progression/srs';
import { autonomyOf, buildReviewQueue, emptyExerciseProgress, isUnlocked, retention, theoremMastery, type ExerciseProgress } from '@/core/progression/mastery';
import { emptySave, exportSave, importSave } from '@/storage/save';

const solved = (hint: number, refused = 0) => ({ solved: true, maxHintLevel: hint, refusedSteps: refused, validSteps: 5, solutionViewed: false });

describe('SM-2', () => {
  it('déduit la qualité de la tentative, sans déclaration du joueur', () => {
    expect(qualityOf(solved(0))).toBe(5);
    expect(qualityOf(solved(0, 2))).toBe(4);
    expect(qualityOf(solved(2))).toBe(3);
    expect(qualityOf(solved(3))).toBe(2);
    expect(qualityOf({ ...solved(0), solutionViewed: true })).toBe(1);
    expect(qualityOf({ solved: false, maxHintLevel: 0, refusedSteps: 0, validSteps: 0, solutionViewed: false })).toBe(0);
  });

  it('une réussite très aidée n’allonge pas l’intervalle', () => {
    const now = 0;
    let card = reviewCard(newCard(now), qualityOf(solved(0)), now);
    card = reviewCard(card, qualityOf(solved(0)), now);
    expect(card.intervalDays).toBe(6);
    const helped = reviewCard(card, qualityOf(solved(3)), now);
    expect(helped.intervalDays).toBe(1);
    expect(helped.repetitions).toBe(0);
  });

  it('les intervalles suivent 1, 6, puis ×EF', () => {
    let card = newCard(0);
    const intervals: number[] = [];
    for (let i = 0; i < 4; i++) {
      card = reviewCard(card, 5, 0);
      intervals.push(card.intervalDays);
    }
    expect(intervals.slice(0, 2)).toEqual([1, 6]);
    expect(intervals[2]).toBeGreaterThan(6);
    expect(card.easiness).toBeGreaterThanOrEqual(2.5);
  });

  it('une pause décale toutes les échéances, sans pénalité', () => {
    const p: ExerciseProgress = { ...emptyExerciseProgress(), srs: { ...newCard(0), due: 10 * DAY } };
    const shifted = shiftDueDates({ a: p }, 3 * DAY);
    expect(shifted.a!.srs!.due).toBe(13 * DAY);
  });
});

describe('Maîtrise et déverrouillage', () => {
  it('l’autonomie dépend de l’aide reçue', () => {
    expect(autonomyOf({ ...emptyExerciseProgress(), solved: true, bestHintLevel: 0 })).toBe(1);
    expect(autonomyOf({ ...emptyExerciseProgress(), solved: true, bestHintLevel: 3 })).toBeCloseTo(0.15);
    expect(autonomyOf(emptyExerciseProgress())).toBe(0);
  });

  it('la rétention ne descend jamais sous 0,5', () => {
    const card = { ...newCard(0), intervalDays: 1, due: 0 };
    expect(retention(card, 0)).toBe(1);
    expect(retention(card, 1000 * DAY)).toBe(0.5);
  });

  it('« maîtrisé » exige le niveau difficile obtenu de façon autonome', () => {
    const now = 0;
    const card = { ...newCard(now), due: 10 * DAY };
    const ok = { ...emptyExerciseProgress(), solved: true, bestHintLevel: 0, attempts: 1, srs: card };
    const helped = { ...ok, bestHintLevel: 3 };
    const all = { 'projection.facile': ok, 'projection.intermediaire': ok, 'projection.difficile': ok };
    expect(theoremMastery('projection', all, now).status).toBe('maitrise');
    expect(theoremMastery('projection', { ...all, 'projection.difficile': helped }, now).status).not.toBe('maitrise');
  });

  it('un résultat s’ouvre quand ses prérequis ont un exercice résolu', () => {
    expect(isUnlocked('projection', {}, false)).toBe(true);
    expect(isUnlocked('riesz', {}, false)).toBe(false);
    expect(isUnlocked('riesz', { 'projection.facile': { ...emptyExerciseProgress(), solved: true } }, false)).toBe(true);
    expect(isUnlocked('galerkin', {}, true)).toBe(true);
  });

  it('la révision propose une réutilisation dans un autre résultat lorsqu’elle existe', () => {
    const due = { ...emptyExerciseProgress(), solved: true, bestHintLevel: 0, srs: { ...newCard(0), due: 0 } };
    const meta = new Map([
      ['riesz.facile', { theoremId: 'riesz', hasVariantProof: true, usesTheorems: [] as string[] }],
      ['lax-milgram.facile', { theoremId: 'lax-milgram', hasVariantProof: false, usesTheorems: ['riesz'] }],
    ]);
    const q = buildReviewQueue({ 'riesz.facile': due }, meta, DAY);
    expect(q[0]?.kind).toBe('reutilisation');
    expect(q[0]?.exerciseId).toBe('lax-milgram.facile');
  });
});

describe('Sauvegarde', () => {
  it('l’export se réimporte à l’identique', () => {
    const save = emptySave(123);
    save.exercises['projection.facile'] = { ...emptyExerciseProgress(), solved: true, bestHintLevel: 1, attempts: 2 };
    const r = importSave(exportSave(save));
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.save).toEqual(save);
  });

  it('refuse un fichier malformé avec un message explicite', () => {
    expect(importSave('pas du json').ok).toBe(false);
    const r = importSave(JSON.stringify({ schemaVersion: 1, settings: {} }));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/Format de sauvegarde non reconnu/);
  });
});
