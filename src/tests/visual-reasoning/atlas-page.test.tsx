/**
 * Pages de l'Atlas visuel : filtres par partie et par groupe, recherche, vue d'une planche
 * avec réponse masquée puis révélée, renvois vers le jeu, navigation entre planches.
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { AtlasPage, PlatePage } from '@/pages/AtlasPage';
import { emptySave } from '@/storage/save';
import { useGame } from '@/storage/store';

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/atlas" element={<AtlasPage />} />
        <Route path="/atlas/:n" element={<PlatePage />} />
      </Routes>
    </MemoryRouter>,
  );
const cards = () => document.querySelectorAll('[data-plate]');

beforeEach(() => {
  useGame.setState({ save: emptySave(0), ready: true });
  localStorage.clear();
});

describe('Atlas visuel — grille', () => {
  it('affiche les 90 planches groupées par partie', () => {
    renderAt('/atlas');
    expect(screen.getByRole('heading', { level: 1, name: 'Atlas visuel' })).toBeInTheDocument();
    expect(cards()).toHaveLength(90);
    expect(screen.getByRole('heading', { level: 2, name: /III · Groupes et algèbres de Lie/ })).toBeInTheDocument();
  });

  it('filtre par partie, par groupe, par texte et par renvoi', () => {
    renderAt('/atlas');
    fireEvent.click(document.querySelector('[data-part="III"]')!);
    expect(cards()).toHaveLength(15);
    fireEvent.click(screen.getByRole('button', { name: 'Notions avancées (IX–XVII)' }));
    expect(cards()).toHaveLength(18);
    fireEvent.click(screen.getByRole('button', { name: 'Toutes les parties' }));
    fireEvent.change(screen.getByRole('searchbox', { name: 'Chercher dans les planches' }), { target: { value: 'rodrigues' } });
    expect([...cards()].map((c) => c.getAttribute('data-plate'))).toEqual(['35']);
    fireEvent.change(screen.getByRole('searchbox', { name: 'Chercher dans les planches' }), { target: { value: '' } });
    fireEvent.click(screen.getByRole('checkbox', { name: /Reliées à un résultat/ }));
    const linked = [...cards()].map((c) => Number(c.getAttribute('data-plate')));
    expect(linked).toContain(8);
    expect(linked).toContain(89);
    expect(linked).not.toContain(73);
  });
});

describe('Atlas visuel — planche', () => {
  it('figure interactive par défaut ; planche originale : réponse masquée puis révélée ; textes cités', () => {
    renderAt('/atlas/31');
    expect(screen.getByRole('heading', { level: 1, name: 'Champs invariants à gauche et à droite' })).toBeInTheDocument();
    expect(document.querySelector('[data-vue="interactive"]')!.getAttribute('aria-selected')).toBe('true');
    expect(screen.queryByTestId('planche-image')).toBeNull();
    fireEvent.click(document.querySelector('[data-vue="original"]')!);
    expect(localStorage.getItem('prooflab:atlas:vue')).toBe('original');
    expect(screen.getByTestId('planche-image')).toBeInTheDocument();
    expect(screen.getByTestId('cache-reponse')).toBeInTheDocument();
    expect(screen.queryByTestId('reponse')).toBeNull();
    fireEvent.click(screen.getByTestId('reveler'));
    expect(screen.getByTestId('reponse').textContent).toMatch(/Oui/);
    expect(screen.queryByTestId('cache-reponse')).toBeNull();
    expect(screen.getByText(/Texte de la planche, cité tel quel/)).toBeInTheDocument();
    expect(screen.getByText(/chapitre 27, p\. 87 à 88 \(PDF 107 à 108\)/)).toBeInTheDocument();
  });

  it('renvois : résultat du jeu et scène du laboratoire G', () => {
    renderAt('/atlas/36');
    const links = screen.getByTestId('liens-jeu');
    expect(links.querySelector('a[href="/theoreme/revetement-su2"]')).not.toBeNull();
    expect(links.querySelector('a[href="/labo/groupes-lie?scene=revetement"]')).not.toBeNull();
  });

  it('navigation : flèche droite vers la planche suivante, bornes de l’atlas', () => {
    renderAt('/atlas/89');
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByRole('heading', { level: 1, name: /De la géométrie à l’analyse/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fin de l’atlas →' })).toBeDisabled();
  });

  it('planche inexistante : page introuvable', () => {
    renderAt('/atlas/91');
    expect(screen.queryByTestId('planche-image')).toBeNull();
  });
});
