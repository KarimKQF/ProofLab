/** Studio des modes de convergence (laboratoire C) : tableau, justifications, aucune écriture. */
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { ModesStudio } from '@/labs/visual-scenes/convergences/ModesStudio';
import { emptySave } from '@/storage/save';
import { useGame } from '@/storage/store';

beforeEach(() => {
  useGame.setState({ save: emptySave(0), ready: true });
  localStorage.clear();
});

const renderStudio = () =>
  render(
    <MemoryRouter>
      <ModesStudio />
    </MemoryRouter>,
  );

describe('Studio des modes de convergence', () => {
  it('tableau : la machine à écrire converge fortement mais pas presque partout, avec justification', () => {
    renderStudio();
    const studio = document.querySelector('[data-studio="convergences-modes"]') as HTMLElement;
    fireEvent.click(within(studio).getByRole('button', { name: 'Quatre modes' }));
    const row = document.querySelector('[data-mode-row="machine"]')!;
    expect(row.querySelector('[data-mode="forte"]')!.getAttribute('data-holds')).toBe('true');
    expect(row.querySelector('[data-mode="pp"]')!.getAttribute('data-holds')).toBe('false');
    fireEvent.click(within(row as HTMLElement).getByRole('button', { name: /presque partout : non/ }));
    expect(screen.getByTestId('mode-why').textContent).toMatch(/infinité/);
    expect(screen.getByTestId('mode-why').textContent).toMatch(/sous-suite/);
  });

  it('animer en n, déplacer x₀, changer de suite : aucune écriture dans la sauvegarde', () => {
    renderStudio();
    const before = JSON.stringify(useGame.getState().save);
    fireEvent.change(screen.getByRole('slider', { name: /Rang n/ }), { target: { value: '17' } });
    fireEvent.change(screen.getByRole('slider', { name: /Point x₀/ }), { target: { value: '0.71' } });
    fireEvent.click(document.querySelector('[data-mode-example="pic-n"]')!);
    fireEvent.click(screen.getByRole('button', { name: 'Animer en n' }));
    expect(screen.getAllByTestId('modes-cuts').length).toBeGreaterThan(0);
    expect(JSON.stringify(useGame.getState().save)).toBe(before);
  });
});
