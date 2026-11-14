/**
 * Laboratoire G (interface) : scène choisie par l'adresse, valeurs de référence affichées,
 * replis sans WebGL, verdict du revêtement, tableau des aires, aucune écriture dans la
 * progression.
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { GroupesLieLab } from '@/labs/groupes-lie/GroupesLieLab';
import { emptySave } from '@/storage/save';
import { useGame } from '@/storage/store';

const renderLab = (scene?: string) =>
  render(
    <MemoryRouter initialEntries={[scene ? `/labo/groupes-lie?scene=${scene}` : '/labo/groupes-lie']}>
      <GroupesLieLab />
    </MemoryRouter>,
  );
const studio = (id: string) => document.querySelector(`[data-studio="${id}"]`) as HTMLElement;
const measure = (id: string) => document.querySelector(`[data-measure="${id}"]`) as HTMLElement;

beforeEach(() => {
  useGame.setState({ save: emptySave(0), ready: true });
  localStorage.clear();
});

describe('Laboratoire G — Groupes de Lie', () => {
  it('commutateur par défaut : C_{1/2}(1,2) = (1 ; 2,25), reste nul, six onglets', () => {
    renderLab();
    expect(screen.getByRole('heading', { level: 1, name: 'Groupes de Lie' })).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(6);
    expect(screen.getByRole('tab', { name: 'Commutateur de flots' })).toHaveAttribute('aria-selected', 'true');
    expect(measure('end').textContent).toMatch(/2,25/);
    expect(measure('err').textContent).toMatch(/0 \(à l’arrondi près\)/);
  });

  it('couple non linéaire : flot numérique signalé, tableau des restes de rapport proche de 8', () => {
    renderLab('commutateur');
    fireEvent.click(document.querySelector('[data-pair="non-lineaire"]')!);
    expect(measure('end').getAttribute('data-status')).toBe('numerique');
    fireEvent.click(within(studio('lie-commutateur')).getByRole('button', { name: 'Ordre du reste' }));
    const rows = screen.getByTestId('ordre').querySelectorAll('tbody tr');
    expect(rows).toHaveLength(4);
    const ratio = Number(rows[0]!.querySelectorAll('td')[2]!.textContent!.replace(',', '.'));
    expect(ratio).toBeGreaterThan(6);
    expect(ratio).toBeLessThan(10);
  });

  it('exponentielle : la spirale sort de SL(2) ; les onglets suivent l’adresse', () => {
    renderLab('exponentielle');
    expect(screen.getByRole('tab', { name: 'Exponentielle' })).toHaveAttribute('aria-selected', 'true');
    fireEvent.click(document.querySelector('[data-preset="spirale"]')!);
    fireEvent.click(within(studio('lie-exponentielle')).getByRole('button', { name: 'Hypothèses' }));
    expect(document.querySelector('[data-hypothesis="sl2"]')!.getAttribute('data-state')).toBe('absente');
    expect(document.querySelector('[data-conclusion="det1"]')!.getAttribute('data-state')).toBe('non-garantie');
  });

  it('Rodrigues sans WebGL : la projection plane remplace la vue 3D', () => {
    renderLab('rodrigues');
    expect(screen.getAllByTestId('webgl-fallback').length).toBeGreaterThan(0);
    expect(measure('Rv').textContent).toMatch(/0.*1.*0/);
  });

  it('revêtement : un tour finit en −1, deux tours en 1', () => {
    renderLab('revetement');
    // L'animation en cours ne doit pas écraser une action manuelle.
    fireEvent.click(screen.getByTestId('lire-lacet'));
    fireEvent.click(screen.getByRole('button', { name: 'Aller au bout' }));
    expect(screen.getByTestId('verdict-revetement').textContent).toMatch(/aboutit en −1/);
    fireEvent.click(document.querySelector('[data-turns="2"]')!);
    fireEvent.click(screen.getByRole('button', { name: 'Aller au bout' }));
    expect(screen.getByTestId('verdict-revetement').textContent).toMatch(/revient en 1/);
  });

  it('orbites : dimensions de l’orbite et du stabilisateur pour chaque action', () => {
    renderLab('orbites');
    expect(measure('dimOrbit').textContent).toMatch(/2/);
    expect(measure('dimStab').textContent).toMatch(/1/);
    fireEvent.click(document.querySelector('[data-action="conjugaison"]')!);
    expect(measure('dimStab').textContent).toMatch(/2/);
    fireEvent.click(screen.getByRole('button', { name: 'Égaliser λ₂ = λ₁' }));
    expect(measure('dimOrbit').textContent).toMatch(/0/);
    expect(measure('jordan').textContent).toMatch(/2/);
    fireEvent.click(document.querySelector('[data-action="tore"]')!);
    fireEvent.click(document.querySelector('[data-slope="demi"]')!);
    expect(measure('periode').textContent).toMatch(/2π·2/);
  });

  it('intégration symplectique : aires 1 pour les schémas symplectiques, (1 + h²)^N pour Euler explicite', () => {
    renderLab('symplectique');
    const row = (id: string) => screen.getByTestId('tableau-aires').querySelector(`[data-row="${id}"]`)!.querySelectorAll('td');
    expect(row('symplectique')[2]!.textContent).toBe('1');
    expect(row('verlet')[2]!.textContent).toBe('1');
    expect(Number(row('euler')[2]!.textContent!.replace(/\s/g, '').replace(',', '.'))).toBeCloseTo(1.25 ** 24, 1);
  });

  it('aucune manipulation n’écrit dans la progression', () => {
    renderLab();
    const before = JSON.stringify(useGame.getState().save);
    fireEvent.click(document.querySelector('[data-pair="lineaires"]')!);
    fireEvent.change(screen.getByRole('slider', { name: /Temps t/ }), { target: { value: '0.9' } });
    for (const name of ['Exponentielle', 'Rodrigues', 'Revêtement SU(2) → SO(3)', 'Orbites', 'Intégration symplectique']) fireEvent.click(screen.getByRole('tab', { name }));
    expect(JSON.stringify(useGame.getState().save)).toBe(before);
  });
});
