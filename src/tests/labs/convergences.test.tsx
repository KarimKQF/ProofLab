/**
 * Laboratoire C : rendu, mode déduction, mémorisation locale et cohérence de la limite
 * tracée avec les formes fermées de `core/math/sequences`.
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { markdownToHtml } from '@/components/Math';
import { SEQUENCE_EXAMPLES } from '@/core/math/sequences';
import { ConvergencesLab } from '@/labs/convergences/ConvergencesLab';
import { constantLimitValue, maxIndex } from '@/labs/convergences/sequence-view';
import { emptySave } from '@/storage/save';
import { useGame } from '@/storage/store';
import { assertNoPhysics } from '@/tests/content/validate';

const byId = (id: string) => SEQUENCE_EXAMPLES.find((e) => e.id === id)!;

function renderLab() {
  return render(
    <MemoryRouter>
      <ConvergencesLab />
    </MemoryRouter>,
  );
}

/** Texte produit par le rendu mixte (français et KaTeX), pour le retrouver dans la page. */
function shown(mixed: string): string {
  const el = document.createElement('div');
  el.innerHTML = markdownToHtml(mixed);
  return el.textContent ?? '';
}

const pageText = () => document.body.textContent ?? '';
const deducedKeys = () => useGame.getState().save.labs['convergences'] ?? [];
const YES = 'Oui, convergence forte';
const NO = 'Non, pas de convergence forte';

beforeEach(() => {
  useGame.setState({ save: emptySave(0) });
});

describe('Laboratoire C — affichage', () => {
  it('affiche la suite choisie, son graphe et ses quantités exactes étiquetées', async () => {
    const user = userEvent.setup();
    renderLab();
    expect(screen.getByRole('heading', { level: 1, name: 'Convergences faible et forte' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Oscillation' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('img', { name: /Graphe de la suite « Oscillation »/ })).toBeInTheDocument();

    const sin = byId('sin');
    const table = screen.getByRole('table');
    expect(within(table).getAllByRole('row')).toHaveLength(1 + 2 + sin.pairings.length);
    expect(within(table).getAllByText('Formule exacte')).toHaveLength(2 + sin.pairings.length);
    expect(screen.getAllByText('Illustratif').length).toBeGreaterThanOrEqual(2);

    await user.click(screen.getByRole('button', { name: 'Translation' }));
    const slider = screen.getByRole('slider', { name: /Indice de la suite/ });
    expect(slider).toHaveAttribute('max', String(maxIndex(byId('translation'))));
    fireEvent.change(slider, { target: { value: '12' } });
    expect(screen.getByRole('img', { name: /« Translation » pour n = 12/ })).toBeInTheDocument();
  });
});

describe('Laboratoire C — mode déduction', () => {
  it('révèle les preuves après la réponse et mémorise une déduction correcte', async () => {
    const user = userEvent.setup();
    const sin = byId('sin');
    const { unmount } = renderLab();
    expect(pageText()).not.toContain(shown(sin.strongProof));
    expect(screen.queryByRole('list', { name: /déduites correctement/ })).toBeNull();

    await user.click(screen.getByRole('button', { name: NO }));
    expect(screen.getByRole('status')).toHaveTextContent('Correct.');
    expect(pageText()).toContain(shown(sin.strongProof));
    expect(pageText()).toContain(shown(sin.weakProof));
    expect(deducedKeys()).toContain('deduction:sin');
    expect(within(screen.getByRole('list', { name: /déduites correctement/ })).getByText('Oscillation')).toBeInTheDocument();

    // Mémoire conservée d'une visite à l'autre ; la question est reposée, preuve masquée.
    unmount();
    renderLab();
    expect(within(screen.getByRole('list', { name: /déduites correctement/ })).getByText('Oscillation')).toBeInTheDocument();
    expect(pageText()).not.toContain(shown(sin.strongProof));
  });

  it('révèle aussi la preuve après une réponse fausse, sans la mémoriser ni la laisser changer', async () => {
    const user = userEvent.setup();
    const puissance = byId('puissance');
    renderLab();
    await user.click(screen.getByRole('button', { name: 'Puissance' }));
    expect(pageText()).not.toContain(shown(puissance.strongProof));

    await user.click(screen.getByRole('button', { name: NO }));
    expect(screen.getByRole('status')).toHaveTextContent('Incorrect.');
    expect(pageText()).toContain(shown(puissance.strongProof));
    await user.click(screen.getByRole('button', { name: YES }));
    expect(screen.getByRole('status')).toHaveTextContent('Incorrect.');
    expect(deducedKeys()).not.toContain('deduction:puissance');
  });

  it('pour chaque suite, la convergence forte n’est annoncée qu’avec sa preuve ; LaTeX valide, vocabulaire mathématique', async () => {
    const user = userEvent.setup();
    const { container } = renderLab();
    for (const [i, ex] of SEQUENCE_EXAMPLES.entries()) {
      const choice = within(screen.getByRole('group', { name: 'Choix de la suite' })).getAllByRole('button')[i]!;
      await user.click(choice);
      expect(choice).toHaveAttribute('aria-pressed', 'true');
      expect(pageText(), ex.id).not.toContain(shown(ex.strongProof));

      await user.click(screen.getByRole('button', { name: ex.strong ? YES : NO }));
      expect(screen.getByRole('status')).toHaveTextContent('Correct.');
      expect(pageText(), ex.id).toContain(shown(ex.strongProof));
      expect(pageText(), ex.id).toContain(shown(ex.weakProof));
      expect(container.querySelectorAll('.katex-error'), ex.id).toHaveLength(0);
      assertNoPhysics(pageText(), `laboratoire C, ${ex.id}`);
    }
    expect(deducedKeys()).toHaveLength(SEQUENCE_EXAMPLES.length);
    expect(screen.getByText(/Suites déjà déduites correctement/)).toHaveTextContent(`${SEQUENCE_EXAMPLES.length} sur ${SEQUENCE_EXAMPLES.length}`);
  });

  it('l’encart Non-linéarité renvoie vers la suite correspondante', async () => {
    const user = userEvent.setup();
    renderLab();
    const box = screen.getByRole('region', { name: 'Non-linéarité' });
    expect(box.textContent).toContain(shown(byId('carre-sin').weakProof));

    await user.click(within(box).getByRole('button', { name: /Afficher « Carré du sinus »/ }));
    expect(screen.getByRole('button', { name: 'Carré du sinus' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('region', { name: 'Suite étudiée' })).toHaveFocus();
  });
});

describe('Laboratoire C — cohérence de la limite tracée', () => {
  const quad = (f: (x: number) => number, a: number, b: number, m = 100000) => {
    const h = (b - a) / m;
    let s = 0;
    for (let i = 0; i < m; i++) s += f(a + (i + 0.5) * h);
    return s * h;
  };

  it('la limite tracée est celle des formes fermées : ∫(uₙ − u)² = ‖uₙ − u‖²', () => {
    for (const ex of SEQUENCE_EXAMPLES) {
      const u = constantLimitValue(ex.weakLimit);
      expect(u, `${ex.id} : limite non lue`).not.toBeNull();
      for (const n of [1, 4, 9]) {
        expect(quad((x) => (ex.evaluate(n, x) - u!) ** 2, ex.domain[0], ex.domain[1]), `${ex.id}, n = ${n}`).toBeCloseTo(ex.distanceToLimitSq(n), 3);
      }
    }
  });

  it('la translation reste entière dans la fenêtre de tracé', () => {
    const t = byId('translation');
    expect(maxIndex(t) + 1).toBeLessThanOrEqual(t.domain[1]);
  });
});
