/**
 * Révision des notions (SM-2), journal des erreurs, bilan des pièges et compatibilité des
 * sauvegardes antérieures au 16 novembre 2026.
 */
import { beforeEach, describe, expect, it } from 'vitest';
import { CONCEPTS, EXERCISES } from '@/content';
import { DICO_BY_ID } from '@/content/dictionnaire';
import { CONCEPT_NOTIONS } from '@/content/dictionnaire/concepts-notions';
import { DAY } from '@/core/progression/srs';
import { addNotions, notionQueue, removeNotion, reviewNotion } from '@/core/progression/notions';
import { practiceFor, trapReport } from '@/core/progression/traps';
import { emptySave, ERROR_LOG_MAX, importSave, SaveSchema } from '@/storage/save';
import { useGame } from '@/storage/store';

const NOW = 1_800_000_000_000;

beforeEach(() => {
  useGame.setState({ save: emptySave(NOW), ready: true, now: () => NOW });
});

describe('Notions à revoir', () => {
  it('une notion consultée se revoit le lendemain, une erreur la rend due aussitôt', () => {
    let deck = addNotions({}, ['continuite'], 'consultee', NOW);
    expect(deck.continuite!.srs.due).toBe(NOW + DAY);
    expect(notionQueue(deck, NOW, () => true)).toEqual([]);
    deck = addNotions(deck, ['continuite'], 'piege', NOW);
    expect(deck.continuite!.stumbles).toBe(1);
    expect(notionQueue(deck, NOW, () => true)).toEqual(['continuite']);
    // Ajouter de nouveau une notion consultée ne change rien.
    expect(addNotions(deck, ['continuite'], 'consultee', NOW)).toBe(deck);
  });

  it('les notions liées aux erreurs passent en premier', () => {
    let deck = addNotions({}, ['compact', 'ferme'], 'manuelle', NOW - 10 * DAY);
    deck = addNotions(deck, ['ferme'], 'piege', NOW);
    deck = addNotions(deck, ['ferme'], 'piege', NOW);
    expect(notionQueue(deck, NOW, () => true)).toEqual(['ferme', 'compact']);
  });

  it('SM-2 : une bonne réponse espace la révision, un oubli la rapproche', () => {
    const deck = addNotions({}, ['dual'], 'manuelle', NOW);
    let card = reviewNotion(deck.dual!, 4, NOW);
    expect(card.srs.due).toBe(NOW + DAY);
    card = reviewNotion(card, 5, NOW + DAY);
    expect(card.srs.intervalDays).toBe(6);
    const lapse = reviewNotion(card, 1, NOW + 7 * DAY);
    expect(lapse.srs.intervalDays).toBe(1);
    expect(lapse.lapses).toBe(1);
    expect(lapse.reviews).toBe(3);
    expect(removeNotion({ dual: card }, 'dual')).toEqual({});
  });

  it('chaque concept d’erreur a ses notions, et chaque notion existe', () => {
    for (const c of CONCEPTS) {
      expect(CONCEPT_NOTIONS[c.id], `concept sans notions : ${c.id}`).toBeDefined();
      for (const id of CONCEPT_NOTIONS[c.id]!) expect(DICO_BY_ID.has(id), `${c.id} → ${id}`).toBe(true);
    }
  });
});

describe('Journal des erreurs et bilan des pièges', () => {
  it('une erreur de preuve est journalisée avec sa nature et fait entrer ses notions en révision', () => {
    useGame.getState().recordConceptError('inegalite-stricte-limite', 'projection.facile', { node: 'x-strict', kind: 'affirmation-fausse' });
    const s = useGame.getState().save;
    expect(s.errorLog).toEqual([
      { at: NOW, concept: 'inegalite-stricte-limite', source: 'preuve', ref: 'projection.facile', node: 'x-strict', kind: 'affirmation-fausse' },
    ]);
    expect(s.exercises['projection.facile']!.errors['inegalite-stricte-limite']).toBe(1);
    for (const id of CONCEPT_NOTIONS['inegalite-stricte-limite']!) expect(s.notions[id]!.origin).toBe('piege');
  });

  it('le journal garde les erreurs les plus récentes', () => {
    for (let i = 0; i < ERROR_LOG_MAX + 5; i++) useGame.getState().recordConceptError('quantificateurs', 'projection.facile');
    const s = useGame.getState().save;
    expect(s.errorLog).toHaveLength(ERROR_LOG_MAX);
    expect(s.conceptErrors.quantificateurs!.count).toBe(ERROR_LOG_MAX + 5);
  });

  it('bilan : récent d’abord, par nature, et les erreurs anciennes comptées à part', () => {
    const conceptErrors = {
      quantificateurs: { count: 5, lastAt: NOW - 30 * DAY, exercises: ['projection.facile'] },
      'faible-fort': { count: 2, lastAt: NOW, exercises: ['riesz.facile'] },
    };
    const log = [
      { at: NOW - DAY, concept: 'faible-fort', source: 'preuve' as const, ref: 'riesz.facile', kind: 'justification-invalide' as const },
      { at: NOW, concept: 'faible-fort', source: 'trouver-erreur' as const, ref: 'x', kind: 'affirmation-fausse' as const },
    ];
    const r = trapReport(conceptErrors, log, NOW);
    expect(r.total).toBe(7);
    expect(r.recent).toBe(2);
    expect(r.beforeLog).toBe(5);
    expect(r.concepts.map((c) => c.concept)).toEqual(['faible-fort', 'quantificateurs']);
    expect(r.byKind['affirmation-fausse']).toBe(1);
    expect(r.byKind['justification-invalide']).toBe(1);
  });

  it('s’entraîner : exercices accessibles qui travaillent le concept, non résolus d’abord', () => {
    const list = practiceFor('inegalite-stricte-limite', EXERCISES, {}, () => true, 3);
    expect(list.length).toBeGreaterThan(0);
    for (const e of list) {
      const specs = [e.proof, e.variant.proof].filter(Boolean);
      const trains = specs.some((s) => s!.traps.some((t) => t.concept === 'inegalite-stricte-limite')) || e.commonErrors.some((c) => c.concept === 'inegalite-stricte-limite');
      expect(trains).toBe(true);
    }
    expect(practiceFor('inegalite-stricte-limite', EXERCISES, {}, () => false, 3)).toEqual([]);
  });
});

describe('Sauvegarde', () => {
  it('une sauvegarde antérieure (sans journal ni notions) reste lisible', () => {
    const old = emptySave(NOW) as Record<string, unknown>;
    delete old.errorHunt;
    delete old.errorLog;
    delete old.notions;
    const parsed = SaveSchema.safeParse(old);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.errorLog).toEqual([]);
      expect(parsed.data.notions).toEqual({});
      expect(parsed.data.errorHunt).toEqual({});
    }
    expect(importSave(JSON.stringify(old)).ok).toBe(true);
  });

  it('une pause décale aussi les révisions de notions', () => {
    useGame.getState().addNotion('dual', 'manuelle');
    useGame.setState({ now: () => NOW });
    useGame.getState().setPaused(true);
    useGame.setState({ now: () => NOW + 3 * DAY });
    useGame.getState().setPaused(false);
    expect(useGame.getState().save.notions.dual!.srs.due).toBe(NOW + 3 * DAY);
  });
});
