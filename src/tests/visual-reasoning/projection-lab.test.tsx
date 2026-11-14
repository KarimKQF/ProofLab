/**
 * Laboratoire de projection (interface) : vues synchronisées, révélation pilotée par la
 * preuve, et aucune réussite enregistrée par une manipulation visuelle.
 */
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { ProjectionLab } from '@/labs/projection/ProjectionLab';
import { emptySave } from '@/storage/save';
import { useGame } from '@/storage/store';

const renderLab = () =>
  render(
    <MemoryRouter>
      <ProjectionLab />
    </MemoryRouter>,
  );

/** Tout ce qui constitue la maîtrise et la progression du joueur. */
const progressOf = () => {
  const s = useGame.getState().save;
  return JSON.stringify({ exercises: s.exercises, labs: s.labs, counterexamples: s.counterexamples, exams: s.exams, conceptErrors: s.conceptErrors });
};

const view = (id: string) => document.querySelector(`[data-view="${id}"]`) as HTMLElement;
const toggleView = (title: string) => fireEvent.click(within(document.querySelector('[data-studio="projection"]') as HTMLElement).getByRole('button', { name: title }));

beforeEach(() => {
  useGame.setState({ save: emptySave(0), ready: true });
  localStorage.clear();
});

describe('Studio de projection', () => {
  it('au départ : le projeté n’est pas garanti, rien de ce qui dépend du théorème n’est affiché', () => {
    renderLab();
    expect(screen.getByText(/Le projeté n’est pas encore garanti/)).toBeInTheDocument();
    expect(view('geometrie')).toBeInTheDocument();
    expect(view('equations')).toBeInTheDocument();
    expect(view('geometrie').textContent).not.toContain('PₖX');
    expect(within(view('equations')).queryByText(/Pour \$x=/)).toBeNull();
    // Seule la distance à z est mesurée.
    expect(document.querySelectorAll('[data-measure]')).toHaveLength(1);
  });

  it('une clé démontrée pour le disque fait apparaître le projeté du disque, et seulement du disque', () => {
    act(() => useGame.getState().unlockLabKeys('projection', ['disque:K-ferme', 'disque:projection-point']));
    renderLab();
    // Demi-plan (par défaut) : toujours rien.
    expect(view('geometrie').textContent).not.toContain('PₖX');
    fireEvent.click(document.querySelector('[data-family="disque"]')!);
    expect(view('geometrie').textContent).toContain('PₖX');
    expect(document.querySelector('[data-measure="dist"]')).not.toBeNull();
    // Inégalité caractéristique non démontrée : aucun produit scalaire affiché.
    expect(document.querySelector('[data-measure="ip0"]')).toBeNull();
    expect(screen.getByText('L’inégalité caractéristique reste à établir.')).toBeInTheDocument();
  });

  it('les vues partagent un seul état : déplacer x change les équations et les mesures', () => {
    act(() => useGame.getState().unlockLabKeys('projection', ['disque:K-ferme', 'disque:projection-point']));
    renderLab();
    fireEvent.click(document.querySelector('[data-family="disque"]')!);
    const before = document.querySelector('[data-measure="dist"]')!.textContent;
    const x = screen.getByRole('slider', { name: 'Point x à projeter' });
    fireEvent.keyDown(x, { key: 'ArrowRight', shiftKey: true });
    const after = document.querySelector('[data-measure="dist"]')!.textContent;
    expect(after).not.toBe(before);
  });

  it('passage en dimension 3 : sans WebGL (jsdom), la coupe plane exacte remplace la vue 3D', () => {
    renderLab();
    fireEvent.click(document.querySelector('[data-family="boule"]')!);
    expect(screen.getByTestId('webgl-fallback')).toBeInTheDocument();
    expect(screen.getAllByTestId('section-view').length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: 'Coupe plane' })).toBeInTheDocument();
    // Le point x se règle par ses trois coordonnées.
    expect(screen.getByRole('group', { name: /Point x à projeter/ })).toBeInTheDocument();
  });

  it('démonstration : en mode Preuve, seules les hypothèses sont accessibles ; en Exploration, avertissement explicite', () => {
    renderLab();
    toggleView('Démonstration');
    const demo = view('demonstration');
    const stages = demo.querySelectorAll('[data-stage]');
    expect(stages).toHaveLength(8);
    expect((stages[3] as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(within(demo).getByRole('button', { name: 'Exploration' }));
    fireEvent.click(stages[3]!);
    expect(within(demo).getByTestId('stage-notice').textContent).toContain('Illustration disponible — preuve non encore établie.');
    // Étapes précédente / suivante : réversible.
    fireEvent.click(within(demo).getByRole('button', { name: 'Étape suivante' }));
    expect(stages[4]!.getAttribute('aria-current')).toBe('step');
    fireEvent.click(within(demo).getByRole('button', { name: 'Étape précédente' }));
    expect(stages[3]!.getAttribute('aria-current')).toBe('step');
    expect(demo.querySelector('[data-figure-stage="3"]')).not.toBeNull();
  });

  it('une étape établie dans le moteur de preuve devient accessible en mode Preuve', () => {
    act(() => useGame.getState().unlockLabKeys('projection-theoreme', ['vp-suite']));
    renderLab();
    toggleView('Démonstration');
    const stages = view('demonstration').querySelectorAll('[data-stage]');
    expect(stages[3]!.getAttribute('data-status')).toBe('etablie');
    expect((stages[3] as HTMLButtonElement).disabled).toBe(false);
    expect((stages[4] as HTMLButtonElement).disabled).toBe(true);
  });

  it('manipuler, changer de dimension, rejouer, consulter : aucune réussite enregistrée', () => {
    renderLab();
    const before = progressOf();
    const x = screen.getByRole('slider', { name: 'Point x à projeter' });
    for (let i = 0; i < 5; i++) fireEvent.keyDown(x, { key: 'ArrowLeft' });
    fireEvent.click(screen.getByRole('button', { name: 'Ajouter un point z' }));
    toggleView('Démonstration');
    fireEvent.click(within(view('demonstration')).getByRole('button', { name: 'Exploration' }));
    for (let i = 0; i < 7; i++) fireEvent.click(within(view('demonstration')).getByRole('button', { name: 'Étape suivante' }));
    fireEvent.click(within(view('demonstration')).getByRole('button', { name: 'Revenir au début' }));
    toggleView('Avec / sans hypothèse');
    fireEvent.click(screen.getByRole('button', { name: 'Comparer : K convexe' }));
    fireEvent.click(screen.getByRole('button', { name: 'Généraliser' }));
    fireEvent.click(document.querySelector('[data-family="plan"]')!);
    fireEvent.click(document.querySelector('[data-family="droite-affine"]')!);
    fireEvent.click(screen.getByLabelText(/Exploration libre/));
    fireEvent.click(screen.getByRole('button', { name: 'Démonstration du théorème' }));
    expect(progressOf()).toBe(before);
  });

  it('avec / sans hypothèse : deux panneaux, verdict exact', () => {
    renderLab();
    toggleView('Avec / sans hypothèse');
    const cmp = screen.getByTestId('compare');
    expect(cmp.querySelector('[data-compare="avec"]')).not.toBeNull();
    expect(cmp.querySelector('[data-compare="sans"]')).not.toBeNull();
    expect(cmp.querySelector('[data-verdict]')!.getAttribute('data-verdict')).toBe('non-atteint');
    fireEvent.click(within(cmp).getByRole('button', { name: 'Comparer : K convexe' }));
    fireEvent.click(within(cmp).getByRole('button', { name: 'Placer x au centre' }));
    expect(cmp.querySelector('[data-verdict]')!.getAttribute('data-verdict')).toBe('non-unique');
  });

  it('les explications « Pourquoi », « Lien avec la démonstration », « Généraliser » s’ouvrent', () => {
    renderLab();
    fireEvent.click(screen.getByRole('button', { name: 'Pourquoi cette représentation ?' }));
    expect(screen.getByTestId('explain-why')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Voir le lien avec la démonstration' }));
    expect(screen.getByTestId('explain-proofLink').textContent).toContain('moteur de preuve');
    fireEvent.click(screen.getByRole('button', { name: 'Généraliser' }));
    expect(screen.getByTestId('explain-generalize').textContent).toContain('jamais la compacité');
  });

  it('masquer les visualisations laisse la preuve jouable', () => {
    renderLab();
    fireEvent.click(screen.getByLabelText(/Masquer les visualisations/));
    expect(screen.getByTestId('viz-hidden')).toBeInTheDocument();
    expect(document.querySelector('[data-studio]')).toBeNull();
    expect(screen.getByRole('heading', { name: 'Preuve guidée' })).toBeInTheDocument();
  });
});
