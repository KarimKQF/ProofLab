import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { CONCEPTS } from '@/content';
import { AUX_TOOLS, THEOREM_CATALOG } from '@/content/catalog';
import { GalerkinLab } from '@/labs/galerkin/GalerkinLab';
import { GALERKIN_STEPS } from '@/labs/galerkin/steps';
import { useGame } from '@/storage/store';
import { assertNoPhysics, validateProof } from '../content/validate';

const allowed = new Set<string>([...THEOREM_CATALOG.map((e) => e.id), ...Object.keys(AUX_TOOLS)]);
const knownConcepts = new Set(CONCEPTS.map((c) => c.id));

/** Vocabulaire proscrit, avec de vraies frontières de mot Unicode (indépendant du validateur). */
const FORBIDDEN =
  /(?<![\p{L}\p{N}_])(?:énergies?|énergétiques?|chaleur|températures?|diffusions?|flux|vitesses?|particules?|fluides?|masses? de dirac|dissipation|terme source)(?![\p{L}\p{N}_])/iu;

function stepTexts(): string[] {
  return GALERKIN_STEPS.flatMap((s) => [
    s.title,
    s.claim,
    s.vizTitle,
    ...s.spec.nodes.flatMap((n) => [n.text, n.masked ?? '', n.check?.prompt ?? '']),
    ...s.spec.justifications.map((j) => j.label),
    ...s.spec.traps.flatMap((tr) => [tr.message, tr.counterexample ?? '']),
    ...s.spec.removable.flatMap((r) => [r.label, r.explanation, r.counterexample]),
  ]);
}

const renderLab = () =>
  render(
    <MemoryRouter>
      <GalerkinLab />
    </MemoryRouter>,
  );

describe('Laboratoire E — les dix preuves', () => {
  it('dix étapes, de clés etape-1 à etape-10', () => {
    expect(GALERKIN_STEPS.map((s) => s.key)).toEqual(Array.from({ length: 10 }, (_, i) => `etape-${i + 1}`));
  });

  for (const step of GALERKIN_STEPS) {
    it(`étape ${step.n} — ${step.title}`, () => {
      validateProof(step.spec, { allowed, knownConcepts, where: `galerkin.${step.key}` });
      const { nodes, goal, traps, rules, justifications } = step.spec;
      expect(nodes.length).toBeGreaterThanOrEqual(3);
      expect(nodes.length).toBeLessThanOrEqual(6);
      // Seul le but déverrouille, et il porte la clé de l'étape.
      expect(nodes.find((x) => x.id === goal)?.unlocks).toEqual([step.key]);
      expect(nodes.filter((x) => x.unlocks).map((x) => x.id)).toEqual([goal]);
      // Au moins un piège réel, et une justification séduisante qui n'appartient à aucune règle.
      expect(traps.some((tr) => tr.verdict === 'incorrect' && tr.counterexample)).toBe(true);
      const used = new Set(rules.map((r) => r.by));
      expect(justifications.some((j) => !used.has(j.id) && traps.some((tr) => tr.by === j.id))).toBe(true);
    });
  }

  it('vocabulaire strictement mathématique', () => {
    for (const s of stepTexts()) {
      assertNoPhysics(s, 'galerkin');
      expect(FORBIDDEN.test(s), s).toBe(false);
      expect(s).not.toMatch(/équation de la chaleur/i);
    }
  });
});

describe('Laboratoire E — rendu', () => {
  beforeEach(() => {
    act(() => useGame.getState().reset());
  });

  it('exploration, frise et première étape ouverte ; les suivantes verrouillées', () => {
    renderLab();
    expect(screen.getByRole('heading', { level: 1, name: 'Méthode de Galerkin' })).toBeInTheDocument();
    const frise = screen.getByRole('navigation', { name: /Progression des dix étapes/ });
    expect(within(frise).getAllByRole('button')).toHaveLength(10);
    expect(screen.getByRole('combobox', { name: /Donnée initiale/ })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /Second membre/ })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: /Dimension n/ })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: /Instant t/ })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Approximation de Galerkin/ })).toBeInTheDocument();
    // Parabole : référence tronquée, donc numérique ; rien n'est encore démontré.
    expect(screen.getAllByText(/tronquée/).length).toBeGreaterThan(0);
    expect(screen.getByText(/Rien n’est encore démontré/)).toBeInTheDocument();
    expect(screen.getByText('Écart avec le polycopié')).toBeInTheDocument();
    // La preuve de l'étape 1 est jouable.
    expect(screen.getByText('Hypothèses et données')).toBeInTheDocument();
    for (let k = 1; k <= 10; k++) expect(screen.getByTestId(`viz-${k}`)).toHaveAttribute('data-state', 'verrouillee');
    fireEvent.click(screen.getByTestId('frise-2'));
    expect(screen.getByTestId('etape-verrouillee')).toBeInTheDocument();
  });

  it('une étape résolue ouvre la suivante et déverrouille sa visualisation', () => {
    renderLab();
    act(() => useGame.getState().unlockLabKeys('galerkin', ['etape-1']));
    expect(screen.getByTestId('viz-1')).toHaveAttribute('data-state', 'debloquee');
    expect(screen.getByTestId('viz-2')).toHaveAttribute('data-state', 'verrouillee');
    expect(screen.getByText(/Étape démontrée/)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('frise-2'));
    expect(screen.queryByTestId('etape-verrouillee')).toBeNull();
    fireEvent.click(screen.getByTestId('frise-3'));
    expect(screen.getByTestId('etape-verrouillee')).toBeInTheDocument();
  });

  it('tout démontré : dix visualisations, statuts exact et numérique, vocabulaire', () => {
    act(() => useGame.getState().unlockLabKeys('galerkin', GALERKIN_STEPS.map((s) => s.key)));
    renderLab();
    for (let k = 1; k <= 10; k++) expect(screen.getByTestId(`viz-${k}`)).toHaveAttribute('data-state', 'debloquee');
    expect(screen.getByText('Théorème démontré')).toBeInTheDocument();
    expect(screen.getByText(/Inégalité vérifiée aux 31 instants/)).toBeInTheDocument();

    // u₀ = φ₁, f = 0 : u_n est exactement la solution, et la forme du polycopié est violée.
    fireEvent.change(screen.getByRole('combobox', { name: /Donnée initiale/ }), { target: { value: 'mode1' } });
    expect(screen.getAllByText(/solution exacte/).length).toBeGreaterThan(0);
    expect(screen.getByText(/l’inégalité du polycopié est violée/)).toBeInTheDocument();

    fireEvent.change(screen.getByRole('combobox', { name: /Donnée initiale/ }), { target: { value: 'constante' } });
    fireEvent.change(screen.getByRole('slider', { name: /Dimension n/ }), { target: { value: '40' } });
    fireEvent.change(screen.getByRole('slider', { name: /Instant t/ }), { target: { value: '0' } });
    fireEvent.change(screen.getByRole('combobox', { name: /Second membre/ }), { target: { value: 'oscillant' } });
    expect(screen.getByText(/Inégalité vérifiée aux 31 instants/)).toBeInTheDocument();

    const text = document.body.textContent ?? '';
    expect(FORBIDDEN.test(text)).toBe(false);
    expect(text).not.toMatch(/équation de la chaleur/i);
  });
});
