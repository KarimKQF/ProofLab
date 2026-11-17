import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { OperatorAtlasPage } from '@/pages/OperatorAtlasPage';
import { OperatorCoursePage } from '@/pages/OperatorCoursePage';
import { AtlasPage } from '@/pages/AtlasPage';
import { compactTailNorm, localizedResidual, domainMembership, dirichletTail, resolventNorm } from '@/components/operator-atlas/scenes';

function at(path: string) {
  return render(<MemoryRouter initialEntries={[path]}><Routes>
    <Route path="/atlas" element={<AtlasPage />} />
    <Route path="/atlas/operateurs/:plateId" element={<OperatorAtlasPage />} />
    <Route path="/operateurs" element={<OperatorCoursePage />} />
    <Route path="/operateurs/:lessonId" element={<OperatorCoursePage />} />
  </Routes></MemoryRouter>);
}

describe('Calculs des planches opérateurs', () => {
  it('recalcule la résolvante et la queue compacte', () => {
    expect(resolventNorm(1, 1)).toBe(1);
    expect(resolventNorm(1, 0)).toBe(Infinity);
    expect(resolventNorm(0, 1)).toBeCloseTo(1 / Math.sqrt(2));
    expect(compactTailNorm(9)).toBe(0.1);
    expect(compactTailNorm(1000, true)).toBe(1);
  });
  it('intègre indépendamment le résidu y compris aux bords', () => {
    for (const center of [0, 0.05, 0.5, 0.9, 1]) {
      const epsilon = 0.15, left = Math.max(0, center - epsilon), right = Math.min(1, center + epsilon);
      let sum = 0;
      for (let i = 0; i < 10000; i++) sum += (left + (i + 0.5) / 10000 * (right - left) - center) ** 2 / 10000;
      expect(localizedResidual(center, epsilon)).toBeCloseTo(Math.sqrt(sum), 7);
      expect(localizedResidual(center, epsilon)).toBeLessThanOrEqual(epsilon);
    }
  });
  it('respecte les frontières strictes des domaines et les normes des modes omis', () => {
    expect(domainMembership(0.5)).toEqual({ hilbert: false, form: false, operator: false });
    expect(domainMembership(1)).toEqual({ hilbert: true, form: false, operator: false });
    expect(domainMembership(1.5)).toEqual({ hilbert: true, form: true, operator: false });
    expect(dirichletTail(2, 0, 1)).toBe(0.5);
    expect(dirichletTail(2, 9, 2)).toBe(1);
    expect(dirichletTail(2, 9, 3)).toBe(0);
  });
});

describe('Parcours pédagogique opérateurs', () => {
  it('trouve les nouvelles planches dans la recherche de l’atlas', () => {
    at('/atlas');
    expect(document.querySelectorAll('[data-operator-plate]')).toHaveLength(12);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'spectre continu' } });
    expect(document.querySelectorAll('[data-operator-plate]')).toHaveLength(1);
    fireEvent.click(document.querySelector('[data-operator-plate]')!);
    expect(screen.getByRole('heading', { name: 'Un spectre continu sans vecteurs propres' })).toBeInTheDocument();
  });
  it('change le rang, compare l’identité, puis révèle une explication', () => {
    at('/atlas/operateurs/compacite-fredholm');
    fireEvent.change(screen.getByRole('slider', { name: /Rang de troncature/ }), { target: { value: 9 } });
    expect(screen.getByTestId('operator-scene-result')).toHaveTextContent('1/10');
    fireEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByTestId('operator-scene-result')).toHaveTextContent('L’identité n’est pas compacte');
    fireEvent.click(screen.getByRole('button', { name: 'Voir l’explication' }));
    expect(screen.getByRole('button', { name: 'Masquer l’explication' })).toHaveAttribute('aria-expanded', 'true');
  });
  it('le quiz corrige une erreur et permet une nouvelle réponse', () => {
    at('/operateurs/norme-operateur');
    const question = screen.getByRole('group', { name: 'Question 1' });
    const options = within(question).getAllByRole('radio');
    fireEvent.click(options[0]!);
    fireEvent.click(within(question).getByRole('button'));
    expect(within(question).getByRole('status')).toHaveTextContent('Cette réponse ne convient pas');
    fireEvent.click(options[1]!);
    expect(within(question).queryByRole('status')).toBeNull();
    fireEvent.click(within(question).getByRole('button'));
    expect(within(question).getByRole('status')).toHaveTextContent('Réponse correcte');
    fireEvent.click(screen.getByRole('link', { name: 'Leçon suivante →' }));
    expect(screen.queryByRole('status')).toBeNull();
  });
  it('montre le résultat nul pour une fonction orthogonale au noyau intégral', () => {
    at('/atlas/operateurs/operateurs-integraux');
    fireEvent.change(screen.getByRole('combobox', { name: 'Fonction u' }), { target: { value: 'orthogonal' } });
    expect(screen.getByTestId('operator-scene-result')).toHaveTextContent('Kₐu(x) = 0 x');
  });
});
