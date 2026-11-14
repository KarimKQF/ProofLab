/**
 * Planches interactives de l'atlas (jsdom, sans WebGL) : chaque planche enregistrée se rend,
 * expose ses panneaux, ses réglages et au moins deux observations ; ses curseurs poussés
 * aux deux bornes ne produisent ni erreur ni coordonnée « NaN » ; rien n'est écrit dans
 * la progression.
 */
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { INTERACTIVE_PLATES, interactiveLoader } from '@/atlas-interactif/registry';
import { emptySave } from '@/storage/save';
import { useGame } from '@/storage/store';

beforeEach(() => {
  useGame.setState({ save: emptySave(0), ready: true });
  localStorage.clear();
});

describe('Planches interactives de l’atlas', () => {
  it('des planches sont enregistrées, numérotées dans 1–90', () => {
    expect(INTERACTIVE_PLATES.length).toBeGreaterThan(0);
    for (const n of INTERACTIVE_PLATES) {
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(90);
    }
  });

  it.each(INTERACTIVE_PLATES)('planche %i : rendu, réglages, observations, aucune écriture', async (n) => {
    const mod = await interactiveLoader(n)!();
    const Plate = mod.default;
    const before = JSON.stringify(useGame.getState().save);
    const { container, unmount } = render(
      <MemoryRouter>
        <Plate />
      </MemoryRouter>,
    );
    const scene = container.querySelector(`[data-plate-scene="${n}"]`) as HTMLElement | null;
    expect(scene).not.toBeNull();
    expect(scene!.querySelectorAll('[data-panel]').length).toBeGreaterThanOrEqual(1);
    expect(scene!.querySelectorAll('[data-observation]').length).toBeGreaterThanOrEqual(2);
    expect(scene!.querySelectorAll('input, button, [role="slider"], [role="radio"]').length).toBeGreaterThan(0);
    expect(scene!.innerHTML).not.toMatch(/NaN|Infinity/);

    for (const input of Array.from(scene!.querySelectorAll<HTMLInputElement>('input[type=range]'))) {
      fireEvent.change(input, { target: { value: input.max } });
      expect(scene!.innerHTML, `curseur « ${input.closest('label')?.textContent ?? ''} » au maximum`).not.toMatch(/NaN|Infinity/);
      fireEvent.change(input, { target: { value: input.min } });
      expect(scene!.innerHTML, `curseur « ${input.closest('label')?.textContent ?? ''} » au minimum`).not.toMatch(/NaN|Infinity/);
    }
    for (const radio of Array.from(scene!.querySelectorAll<HTMLElement>('[role="radio"]'))) {
      fireEvent.click(radio);
      expect(scene!.innerHTML, `choix « ${radio.textContent ?? ''} »`).not.toMatch(/NaN|Infinity/);
    }
    expect(JSON.stringify(useGame.getState().save)).toBe(before);
    unmount();
  });
});
