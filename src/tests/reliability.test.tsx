/**
 * Non-régression des défauts de fiabilité signalés le 13 novembre 2026 :
 *  1. rouvrir une preuve validée ne doit pas créer de réussite supplémentaire ;
 *  2. les indices consultés survivent au rechargement ;
 *  3. une écriture différée ne peut pas écraser une sauvegarde importée ;
 *  4. une rédaction libre ne perd pas ses derniers caractères à la sortie.
 */
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EXERCISE_BY_ID } from '@/content';
import { allowedTheorems } from '@/content/catalog';
import { useProofSession } from '@/components/proof/useProofSession';
import { emptySave, exportSave, loadSave } from '@/storage/save';
import { flushPersist, useGame } from '@/storage/store';
import { FreeProofPage } from '@/pages/FreeProofPage';
import { canonicalGraph } from './content/validate';

const ex = EXERCISE_BY_ID.get('projection.facile')!;
const spec = ex.proof;
const allowed = allowedTheorems(ex.theoremId, spec.purpose, ex.prerequisites);
const checks = spec.nodes.filter((n) => n.check).map((n) => n.id);
const full = canonicalGraph(spec);
const last = full.placed[full.placed.length - 1]!;
const DRAFT = 'projection.facile';

function withDraft(graph = full, extra: Partial<{ hints: number }> = {}) {
  const save = emptySave(0);
  save.drafts[DRAFT] = { graph, passedChecks: checks, hints: extra.hints ?? 0, refused: 0, updatedAt: 1 };
  useGame.setState({ save, ready: true });
}

beforeEach(() => {
  useGame.setState({ save: emptySave(0), ready: true });
  localStorage.clear();
});

describe('Une réussite par tentative, jamais davantage', () => {
  it('rouvrir une preuve déjà validée ne déclenche aucune réussite', () => {
    withDraft();
    const onGoal = vi.fn();
    const { result } = renderHook(() =>
      useProofSession({ spec, allowed, draftKey: DRAFT, errorKey: null, onGoalReached: onGoal }),
    );
    expect(result.current.analysis.goalReached).toBe(true);
    expect(result.current.alreadySolvedAtOpen).toBe(true);
    // Revérifier la dernière étape d'une preuve déjà comptée ne recompte rien.
    act(() => result.current.verify(last, full.steps[last]!.premises, full.steps[last]!.justification));
    expect(onGoal).not.toHaveBeenCalled();
  });

  it('la vérification qui atteint le but compte une fois ; retirer puis rétablir une hypothèse ne recompte pas', () => {
    const partial = { placed: full.placed.slice(0, -1), steps: { ...full.steps } };
    delete partial.steps[last];
    withDraft(partial);
    const onGoal = vi.fn();
    const { result } = renderHook(() =>
      useProofSession({ spec, allowed, draftKey: DRAFT, errorKey: null, onGoalReached: onGoal }),
    );
    expect(result.current.analysis.goalReached).toBe(false);
    act(() => result.current.verify(last, full.steps[last]!.premises, full.steps[last]!.justification));
    expect(onGoal).toHaveBeenCalledTimes(1);
    act(() => result.current.toggleRemoved('ferme'));
    expect(result.current.analysis.goalReached).toBe(false);
    act(() => result.current.toggleRemoved('ferme'));
    expect(result.current.analysis.goalReached).toBe(true);
    act(() => result.current.verify(last, full.steps[last]!.premises, full.steps[last]!.justification));
    expect(onGoal).toHaveBeenCalledTimes(1);
  });

  it('une nouvelle tentative explicite peut, elle, être comptée', () => {
    withDraft();
    const onGoal = vi.fn();
    const { result } = renderHook(() =>
      useProofSession({ spec, allowed, draftKey: DRAFT, errorKey: null, onGoalReached: onGoal }),
    );
    act(() => result.current.restart());
    expect(useGame.getState().save.drafts[DRAFT]).toBeUndefined();
    for (const id of checks) act(() => result.current.passCheck(id));
    for (const id of full.placed) {
      act(() => result.current.verify(id, full.steps[id]!.premises, full.steps[id]!.justification));
    }
    expect(onGoal).toHaveBeenCalledTimes(1);
  });
});

describe('Indices conservés', () => {
  it('un indice consulté est sauvegardé aussitôt, même sans étape posée', () => {
    const { result } = renderHook(() => useProofSession({ spec, allowed, draftKey: DRAFT, errorKey: null }));
    act(() => result.current.setHintLevel(2));
    expect(useGame.getState().save.drafts[DRAFT]?.hints).toBe(2);
  });

  it('effacer le graphe ne fait pas oublier les indices de la tentative', () => {
    withDraft(full, { hints: 2 });
    const partial = { placed: full.placed.slice(0, 3), steps: full.steps };
    withDraft(partial, { hints: 2 });
    const { result } = renderHook(() => useProofSession({ spec, allowed, draftKey: DRAFT, errorKey: null }));
    act(() => result.current.reset());
    expect(useGame.getState().save.drafts[DRAFT]?.hints).toBe(2);
    expect(useGame.getState().save.drafts[DRAFT]?.graph.placed).toEqual([]);
  });
});

describe('Sauvegarde', () => {
  it('une écriture différée n’écrase pas une sauvegarde importée', async () => {
    const store = useGame.getState();
    store.recordConceptError('quantificateurs', 'projection.facile'); // programme une écriture différée
    const imported = emptySave(42);
    imported.exercises['riesz.facile'] = {
      attempts: 3,
      solved: true,
      bestHintLevel: 0,
      lastHintLevel: 0,
      lastAttemptAt: 42,
      srs: null,
      solutionViewed: false,
      variantSolved: false,
      errors: {},
    };
    expect(useGame.getState().importFrom(exportSave(imported)).ok).toBe(true);
    await new Promise((r) => setTimeout(r, 300)); // au-delà du délai de l'écriture différée
    await flushPersist();
    const reloaded = await loadSave(0);
    expect(reloaded.exercises['riesz.facile']?.attempts).toBe(3);
    expect(reloaded.conceptErrors.quantificateurs).toBeUndefined();
  });
});

describe('Rédaction libre', () => {
  it('une sortie immédiate ne perd aucun caractère', () => {
    const view = render(
      <MemoryRouter initialEntries={['/preuve-libre/projection.facile']}>
        <Routes>
          <Route path="/preuve-libre/:id" element={<FreeProofPage />} />
        </Routes>
      </MemoryRouter>,
    );
    const area = screen.getByLabelText(/Ta démonstration/);
    fireEvent.change(area, { target: { value: 'Par hypothèse, K est fermé.' } });
    fireEvent.change(area, { target: { value: 'Par hypothèse, K est fermé. Donc P' } });
    view.unmount(); // avant la fin de l'anti-rebond
    expect(useGame.getState().save.freeProofs['projection.facile']?.text).toBe('Par hypothèse, K est fermé. Donc P');
  });

  it('la copie de secours locale est relue si elle est plus récente', () => {
    localStorage.setItem('prooflab:preuve-libre:projection.facile', JSON.stringify({ text: 'Texte récupéré', at: Date.now() }));
    render(
      <MemoryRouter initialEntries={['/preuve-libre/projection.facile']}>
        <Routes>
          <Route path="/preuve-libre/:id" element={<FreeProofPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect((screen.getByLabelText(/Ta démonstration/) as HTMLTextAreaElement).value).toBe('Texte récupéré');
  });
});
