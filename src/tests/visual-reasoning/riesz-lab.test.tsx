/**
 * Laboratoire B (interface) : établir les hypothèses fait passer les conclusions de
 * « illustrative » à « établie » ; ℝ³ sans WebGL affiche la coupe fidèle ; aucune
 * manipulation n'écrit dans la progression.
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { RieszLab } from '@/labs/riesz/RieszLab';
import { emptySave } from '@/storage/save';
import { useGame } from '@/storage/store';

const renderLab = () =>
  render(
    <MemoryRouter>
      <RieszLab />
    </MemoryRouter>,
  );
const studio = () => document.querySelector('[data-studio="riesz"]') as HTMLElement;
const toggleView = (title: string) => fireEvent.click(within(studio()).getByRole('button', { name: title }));
const conclusion = (id: string) => document.querySelector(`[data-conclusion="${id}"]`)!.getAttribute('data-state');

beforeEach(() => {
  useGame.setState({ save: emptySave(0), ready: true });
  localStorage.clear();
});

describe('Laboratoire B — Riesz et Lax–Milgram', () => {
  it('établir G, ℓ, M et α : la conclusion de Lax–Milgram passe d’illustrative à établie', () => {
    renderLab();
    toggleView('Hypothèses');
    fireEvent.click(screen.getByRole('button', { name: 'Produit scalaire oblique' }));
    expect(conclusion('riesz')).toBe('illustrative');
    expect(conclusion('lm')).toBe('illustrative');
    fireEvent.change(screen.getByLabelText('Déterminant de G'), { target: { value: '7/4' } });
    fireEvent.click(screen.getAllByRole('button', { name: 'Vérifier' })[0]!);
    fireEvent.click(screen.getByRole('button', { name: 'Dimension finie : continue' }));
    expect(conclusion('riesz')).toBe('etablie');
    // G = A ici : |a(x, y)| ≤ ‖x‖_G ‖y‖_G, donc M² = 1 convient ; α = 1 aussi.
    fireEvent.change(screen.getByLabelText('Valeur de M au carré'), { target: { value: '1' } });
    fireEvent.click(screen.getAllByRole('button', { name: 'Vérifier' })[1]!);
    fireEvent.change(screen.getByLabelText('Constante alpha'), { target: { value: '1' } });
    fireEvent.click(screen.getAllByRole('button', { name: 'Vérifier' })[2]!);
    expect(conclusion('lm')).toBe('etablie');
    expect(screen.getByTestId('lm-status').textContent).toContain('Hypothèses établies');
  });

  it('une valeur inexacte est refusée', () => {
    renderLab();
    fireEvent.click(screen.getByRole('button', { name: 'Produit scalaire oblique' }));
    fireEvent.change(screen.getByLabelText('Déterminant de G'), { target: { value: '1.74' } });
    fireEvent.click(screen.getAllByRole('button', { name: 'Vérifier' })[0]!);
    expect(screen.getByText('Une valeur saisie n’est pas exacte.')).toBeInTheDocument();
  });

  it('trois situations sans coercivité : inversible (non garantie) et singulière (fausse)', () => {
    renderLab();
    toggleView('Hypothèses');
    fireEvent.click(screen.getByRole('button', { name: 'Inversible, non coercive' }));
    expect(conclusion('lm')).toBe('non-garantie');
    expect(document.querySelector('[data-case="inversible"]')).not.toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Forme dégénérée' }));
    expect(conclusion('lm')).toBe('fausse');
    expect(document.querySelector('[data-case="singuliere"]')).not.toBeNull();
  });

  it('linéaire contre quadratique : homogénéité de degré 1 et 2, nature de la forme', () => {
    renderLab();
    fireEvent.click(screen.getByRole('button', { name: 'Inversible, non coercive' }));
    toggleView('Linéaire / quadratique');
    expect(document.querySelector('[data-nature]')!.getAttribute('data-nature')).toBe('indefinie');
    const rows = screen.getByTestId('homogeneite').querySelectorAll('tbody tr');
    for (const row of rows) {
      const cells = [...row.querySelectorAll('td')].map((c) => c.textContent);
      expect(cells[1]).toBe(cells[2]);
      expect(cells[3]).toBe(cells[4]);
    }
  });

  it('ℝ³ sans WebGL : coupe fidèle par un plan contenant w, deux mineurs à saisir', () => {
    renderLab();
    fireEvent.click(screen.getByRole('button', { name: 'ℝ³' }));
    expect(screen.getAllByTestId('riesz-section').length).toBeGreaterThan(0);
    expect(screen.getByLabelText('Mineur dominant Δ2')).toBeInTheDocument();
    expect(screen.getByLabelText('Mineur dominant Δ3')).toBeInTheDocument();
  });

  it('aucune manipulation n’écrit dans la progression', () => {
    renderLab();
    const before = JSON.stringify(useGame.getState().save);
    fireEvent.click(screen.getByRole('button', { name: 'Forme dégénérée' }));
    toggleView('Changement de base');
    fireEvent.click(screen.getByRole('button', { name: 'ℝ³' }));
    fireEvent.click(screen.getByRole('button', { name: 'ℝ²' }));
    fireEvent.click(screen.getByLabelText(/Exploration libre/));
    fireEvent.click(screen.getByRole('button', { name: 'Généraliser' }));
    expect(JSON.stringify(useGame.getState().save)).toBe(before);
  });
});
