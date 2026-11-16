/**
 * Mode « Trouver l'erreur » : chaque démonstration fautive ne contient qu'une erreur, à
 * l'endroit désigné. Le moteur de preuve valide toutes les autres lignes ; l'interface
 * accepte la bonne étape et la bonne nature, et enregistre une erreur manquée.
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { CONCEPTS, EXERCISES, THEOREM_CATALOG } from '@/content';
import { allowedTheorems } from '@/content/catalog';
import { isGiven } from '@/core/proof-engine/engine';
import { FLAW_KINDS, huntCandidates, refusedLines, selectHuntItems } from '@/core/error-hunt/hunt';
import { huntItems } from '@/core/error-hunt/items';
import { ErrorHuntPage } from '@/pages/ErrorHuntPage';
import { GlossaryProvider } from '@/components/glossary/GlossaryProvider';
import { emptySave } from '@/storage/save';
import { useGame } from '@/storage/store';
import { assertMixedText } from '../content/validate';

const known = new Set(CONCEPTS.map((c) => c.id));

beforeEach(() => {
  useGame.setState({ save: { ...emptySave(0), settings: { ...emptySave(0).settings, unlockAll: true } }, ready: true });
});

describe('Trouver l’erreur — construction', () => {
  const all = EXERCISES.flatMap((e) => huntCandidates(e));

  it('le moteur refuse exactement les lignes désignées, et valide toutes les autres', () => {
    expect(all.length).toBeGreaterThan(400);
    for (const item of all) {
      const e = EXERCISES.find((x) => x.id === item.exerciseId)!;
      const allowed = allowedTheorems(e.theoremId, item.spec.purpose, e.prerequisites);
      expect(refusedLines(item.spec, item.lines, allowed), item.id).toEqual(item.faulty);
    }
  });

  it('chaque ligne cite des données ou des lignes antérieures, et la conclusion vient en dernier', () => {
    for (const item of all) {
      item.lines.forEach((l, k) => {
        for (const p of l.premises) {
          const n = item.spec.nodes.find((x) => x.id === p)!;
          const ok = (isGiven(n) && !n.local) || item.lines.slice(0, k).some((x) => x.node === p);
          expect(ok, `${item.id} : ${p} à la ligne ${k + 1}`).toBe(true);
        }
      });
      expect(item.lines[item.lines.length - 1]!.node, item.id).toBe(item.spec.goal);
    }
  });

  it('les explications sont du LaTeX valide et les concepts existent', () => {
    for (const item of all) {
      expect(known.has(item.concept), `${item.id} : concept ${item.concept}`).toBe(true);
      assertMixedText(item.explanation, item.id);
      if (item.counterexample) assertMixedText(item.counterexample, item.id);
    }
  });

  it('la sélection couvre les 45 résultats et les quatre natures, sans doublon', () => {
    const sel = selectHuntItems(EXERCISES);
    expect(new Set(sel.map((i) => i.id)).size).toBe(sel.length);
    expect(new Set(sel.map((i) => i.theoremId)).size).toBe(THEOREM_CATALOG.length);
    for (const k of FLAW_KINDS) expect(sel.some((i) => i.kind === k), k).toBe(true);
  });
});

function openItem(id: string) {
  render(
    <MemoryRouter initialEntries={[`/trouver-erreur/${encodeURIComponent(id)}`]}>
      <GlossaryProvider>
        <Routes>
          <Route path="/trouver-erreur/:id" element={<ErrorHuntPage />} />
        </Routes>
      </GlossaryProvider>
    </MemoryRouter>,
  );
}

describe('Trouver l’erreur — interface', () => {
  const item = huntItems().find((i) => i.kind === 'justification-invalide' && i.lines.length > 4)!;

  it('une étape correcte désignée est refusée et compte comme une erreur manquée', () => {
    openItem(item.id);
    const wrong = item.lines.findIndex((_, i) => !item.faulty.includes(i));
    fireEvent.click(document.querySelector(`[data-ligne="${wrong}"]`)!);
    fireEvent.click(document.querySelector(`[data-nature="${item.kind}"]`)!);
    fireEvent.click(screen.getByTestId('valider-erreur'));
    expect(screen.getByTestId('retour-erreur').textContent).toMatch(/est correcte/);
    const save = useGame.getState().save;
    expect(save.errorHunt[item.id]?.found).toBe(false);
    expect(save.errorLog.at(-1)).toMatchObject({ source: 'trouver-erreur', ref: item.id, concept: item.concept, kind: item.kind });
    expect(save.conceptErrors[item.concept]?.count).toBe(1);
    // Une erreur manquée n'entre pas dans la progression des exercices.
    expect(save.exercises).toEqual({});
  });

  it('la bonne étape et la bonne nature : trouvée du premier coup, avec l’explication', () => {
    openItem(item.id);
    fireEvent.click(document.querySelector(`[data-ligne="${item.faulty[0]}"]`)!);
    const otherKind = FLAW_KINDS.find((k) => k !== item.kind)!;
    fireEvent.click(document.querySelector(`[data-nature="${otherKind}"]`)!);
    fireEvent.click(screen.getByTestId('valider-erreur'));
    expect(screen.getByTestId('retour-erreur').textContent).toMatch(/bien l’étape fautive/);
    fireEvent.click(document.querySelector(`[data-nature="${item.kind}"]`)!);
    fireEvent.click(screen.getByTestId('valider-erreur'));
    expect(screen.getByTestId('explication-erreur').textContent).toMatch(/Trouvée/);
    expect(document.querySelector(`[data-ligne="${item.faulty[0]}"]`)!.getAttribute('data-fautive')).toBe('oui');
    const rec = useGame.getState().save.errorHunt[item.id]!;
    expect(rec.found).toBe(true);
    expect(rec.firstTry).toBe(false);
    expect(useGame.getState().save.errorLog).toEqual([]);
  });
});
