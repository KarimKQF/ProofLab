import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { COMPACTNESS_FAMILIES } from '@/core/math/compactness';
import { CompaciteLab } from '@/labs/compacite/CompaciteLab';
import { FAMILY_META, ingredientsOf, theoremApplies, type IngredientId } from '@/labs/compacite/familles';
import { assertNoPhysics } from '../content/validate';

beforeAll(() => {
  // jsdom n'a pas de contexte 2D : le Heatmap du kit s'arrête alors sans dessiner.
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => null);
});

const renderLab = () =>
  render(
    <MemoryRouter>
      <CompaciteLab />
    </MemoryRouter>,
  );

const LABELS: Record<IngredientId, RegExp> = { compacite: /Compacité spatiale/, espace: /Borne en espace/, temps: /Borne en temps/ };
const box = (id: IngredientId) => screen.getByRole('checkbox', { name: LABELS[id] });
const row = (id: IngredientId) => box(id).closest('label')!;
const familyButton = (id: string) => {
  const m = FAMILY_META[id]!;
  return screen.getByRole('button', { name: `${m.name} : ${m.spoken}` });
};

describe('Laboratoire D — Rellich et Aubin–Lions', () => {
  it('chaque famille a ses métadonnées locales', () => {
    for (const f of COMPACTNESS_FAMILIES) expect(FAMILY_META[f.id], f.id).toBeDefined();
  });

  it('affiche la famille choisie : carte, coupe et normes en forme fermée', async () => {
    const user = userEvent.setup();
    const { container } = renderLab();
    expect(screen.getByRole('heading', { level: 1, name: 'Rellich et Aubin–Lions' })).toBeInTheDocument();
    expect(familyButton(COMPACTNESS_FAMILIES[0]!.id)).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('img', { name: /^Carte de uₙ\(t, x\) pour n = 1 / })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /^Coupe de uₙ à t fixé/ })).toBeInTheDocument();

    // oscillation-espace, n = 1 : ‖uₙ‖² = π³ dans L²(H¹₀), ∂ₜuₙ = 0, ‖uₙ‖² = π dans L²(L²).
    const table = screen.getByRole('table');
    expect(table.querySelectorAll('tbody tr')).toHaveLength(3);
    expect(table).toHaveTextContent(/Formule exacte.*Formule exacte.*Formule exacte/);
    expect(table).toHaveTextContent('31,006');
    expect(table).toHaveTextContent('3,142');

    fireEvent.change(screen.getByRole('slider', { name: /Indice n/ }), { target: { value: '7' } });
    expect(table).toHaveTextContent(/1\s?519,308/); // 49π³
    expect(screen.getByRole('img', { name: /^Carte de uₙ\(t, x\) pour n = 7 / })).toBeInTheDocument();

    // Famille sans temps : une courbe, sans carte ; fenêtre qui suit le support.
    await user.click(familyButton('translation'));
    expect(screen.queryByRole('img', { name: /^Carte de uₙ/ })).toBeNull();
    expect(screen.getByRole('img', { name: /^Graphe de uₙ pour n = 7/ })).toBeInTheDocument();
    expect(table).toHaveTextContent('0,6667'); // 2/3

    expect(container.querySelector('.katex-error')).toBeNull();
    assertNoPhysics(container.textContent ?? '', 'laboratoire D');
  });

  it('identification exacte : ingrédients colorés, puis démonstration et statut du théorème', async () => {
    const user = userEvent.setup();
    const { container } = renderLab();
    await user.click(box('compacite'));
    await user.click(box('temps'));
    await user.click(screen.getByRole('button', { name: /Valider/ }));

    expect(screen.getByText(/Identification exacte/)).toBeInTheDocument();
    expect(row('compacite')).toHaveAttribute('data-statut', 'verifie');
    expect(row('temps')).toHaveAttribute('data-statut', 'verifie');
    expect(row('espace')).toHaveAttribute('data-statut', 'manquant');
    expect(row('compacite').getAttribute('style')).toContain('var(--st-hyp)');
    expect(row('espace').getAttribute('style')).toContain('var(--st-miss)');
    expect(box('espace')).toBeDisabled();

    await user.click(screen.getByRole('button', { name: 'Non' }));
    expect(screen.getByText(/Réponse exacte/)).toBeInTheDocument();
    const verdict = container.querySelector('[data-verdict]');
    expect(verdict).toHaveAttribute('data-verdict', 'non-invocable');
    expect(verdict).toHaveTextContent(/Aubin–Lions ne peut plus être invoqué/);
    expect(verdict).toHaveTextContent(/suffisantes, non nécessaires/);
    expect(document.body).toHaveTextContent(/aucune sous-suite ne converge fortement/); // démonstration des données
    expect(container.querySelector('.katex-error')).toBeNull();
  });

  it('identification inexacte : erreurs signalées, couleurs exactes', async () => {
    const user = userEvent.setup();
    renderLab();
    for (const id of ['compacite', 'espace', 'temps'] as const) await user.click(box(id));
    await user.click(screen.getByRole('button', { name: /Valider/ }));
    expect(screen.getByText(/Identification inexacte/)).toBeInTheDocument();
    expect(screen.getByText(/1 ingrédient mal classé/)).toBeInTheDocument();
    expect(screen.getByText(/Coché à tort/)).toBeInTheDocument();
    expect(row('espace')).toHaveAttribute('data-statut', 'manquant');

    await user.click(screen.getByRole('button', { name: 'Oui' }));
    expect(screen.getByText(/Réponse inexacte/)).toBeInTheDocument();
  });

  it('pour chaque famille, la bonne identification et la bonne réponse sont reconnues', async () => {
    const user = userEvent.setup();
    const { container } = renderLab();
    for (const f of COMPACTNESS_FAMILIES) {
      await user.click(familyButton(f.id));
      // Changer de famille remet le jeu à zéro.
      expect(box('compacite'), f.id).toBeEnabled();
      expect(box('compacite'), f.id).not.toBeChecked();
      for (const g of ingredientsOf(f)) if (g.holds) await user.click(box(g.id));
      await user.click(screen.getByRole('button', { name: /Valider/ }));
      expect(screen.getByText(/Identification exacte/), f.id).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: f.strong ? 'Oui' : 'Non' }));
      expect(screen.getByText(/Réponse exacte/), f.id).toBeInTheDocument();
      expect(container.querySelector('[data-verdict]'), f.id).toHaveAttribute('data-verdict', theoremApplies(f) ? 'applicable' : 'non-invocable');
      if (f.id === 'amortie-espace') expect(screen.getByText(/Seulement faible dans/)).toBeInTheDocument();
      expect(container.querySelector('.katex-error'), f.id).toBeNull();
    }
  });
});
