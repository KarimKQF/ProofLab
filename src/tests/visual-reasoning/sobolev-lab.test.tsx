/**
 * Laboratoire F (interface) : sans WebGL, la carte des niveaux remplace la surface ;
 * la trace ne change pas quand on ajoute t·u₀ ; aucune écriture dans la progression.
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { SobolevLab } from '@/labs/sobolev/SobolevLab';
import { emptySave } from '@/storage/save';
import { useGame } from '@/storage/store';

const renderLab = () =>
  render(
    <MemoryRouter>
      <SobolevLab />
    </MemoryRouter>,
  );
const studio = () => document.querySelector('[data-studio="sobolev"]') as HTMLElement;
const toggleView = (title: string) => fireEvent.click(within(studio()).getByRole('button', { name: title }));

beforeEach(() => {
  useGame.setState({ save: emptySave(0), ready: true });
  localStorage.clear();
});

describe('Laboratoire F — Sobolev et traces', () => {
  it('surface sans WebGL : carte des niveaux exacte en remplacement, traces affichées', () => {
    renderLab();
    expect(screen.getByRole('heading', { level: 1, name: 'Sobolev et traces' })).toBeInTheDocument();
    expect(screen.getByTestId('webgl-fallback')).toBeInTheDocument();
    expect(screen.getAllByTestId('level-map').length).toBeGreaterThan(0);
    expect(screen.getByTestId('trace-view')).toBeInTheDocument();
  });

  it('ajouter t·u₀ ∈ H¹₀ laisse la trace inchangée (écart maximal 0)', () => {
    renderLab();
    const slider = screen.getByRole('slider', { name: /Ajouter t·u₀/ });
    fireEvent.change(slider, { target: { value: '0.8' } });
    expect(screen.getByTestId('trace-view').textContent).toMatch(/écart maximal 0\./);
  });

  it('exemple singulier : non borné, H¹ sans H², justification analytique et quadrature lente signalée', () => {
    renderLab();
    fireEvent.click(document.querySelector('[data-example="singuliere"]')!);
    toggleView('Équations et mesures');
    expect(document.querySelector('[data-equation="justification"]')!.textContent).toMatch(/H\^1|H1|bornée|continue/);
    expect(document.querySelector('[data-measure="gradsq-num"]')!.getAttribute('data-status')).toBe('numerique');
    expect(document.querySelector('[data-measure="gradsq-num"]')!.textContent).toMatch(/converge très lentement/);
    toggleView('Comparer');
    const row = document.querySelector('[data-testid="sobolev-compare"] [data-example="singuliere"]')!;
    expect(row.textContent).toContain('non');
  });

  it('aucune manipulation n’écrit dans la progression', () => {
    renderLab();
    const before = JSON.stringify(useGame.getState().save);
    fireEvent.click(document.querySelector('[data-example="mode"]')!);
    fireEvent.change(screen.getByRole('slider', { name: /x₀/ }), { target: { value: '0.7' } });
    toggleView('Coupes et dérivées');
    toggleView('Niveaux');
    fireEvent.click(screen.getByRole('button', { name: 'Pourquoi cette représentation ?' }));
    expect(JSON.stringify(useGame.getState().save)).toBe(before);
  });
});
