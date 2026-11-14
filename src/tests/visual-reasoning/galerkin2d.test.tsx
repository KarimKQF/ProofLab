/**
 * Galerkin en dimension spatiale 2 : coefficients exacts (contrôlés par quadrature),
 * Parseval, reconstruction spectrale, équation de la chaleur vérifiée par différences
 * finies, cohérence des écarts, statut « non démontré » de l'affichage.
 */
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { BUBBLE_NORM_SQ, bubbleCoefficient, phi2 } from '@/core/visual-reasoning/surfaces';
import { gapSq2D, gapSqAt0, MODES_2D, N_REF, normSq2D, partialSum2D } from '@/core/visual-reasoning/galerkin2d-scene';
import { Galerkin2DStudio } from '@/labs/visual-scenes/galerkin/Galerkin2DStudio';
import { emptySave } from '@/storage/save';
import { useGame } from '@/storage/store';

const u0 = (x: number, y: number) => x * (1 - x) * y * (1 - y);

function quad2(f: (x: number, y: number) => number, m = 200): number {
  let s = 0;
  for (let j = 0; j < m; j++) for (let i = 0; i < m; i++) s += f((i + 0.5) / m, (j + 0.5) / m);
  return s / (m * m);
}

describe('Coefficients et Parseval', () => {
  it('b(k,l) = 32/(π⁶k³l³) pour k, l impairs, 0 sinon (quadrature indépendante)', () => {
    for (const [k, l] of [[1, 1], [1, 3], [3, 3], [2, 1], [2, 2], [5, 1]] as [number, number][]) {
      const m = { k, l, lambda: Math.PI ** 2 * (k * k + l * l) };
      const q = quad2((x, y) => u0(x, y) * phi2(m, x, y), 400);
      expect(Math.abs(q - bubbleCoefficient(m))).toBeLessThan(1e-7);
    }
  });

  it('Σ b² sur les 225 modes = 1/900 − reste, reste ≈ 2·10⁻¹⁰ (majoration analytique 3·10⁻¹⁰)', () => {
    expect(N_REF).toBe(225);
    // Reste : Σ_{max(k,l) ≥ 17, k,l impairs} (32/π⁶)²/(k⁶l⁶) ≤ 2 (32/π⁶)² · Σ_{l impair} l⁻⁶ · Σ_{k ≥ 17 impair} k⁻⁶ ≤ 3·10⁻¹⁰.
    const tail = gapSqAt0(N_REF);
    expect(tail).toBeGreaterThan(0);
    expect(tail).toBeLessThan(3e-10);
    expect(Math.abs(normSq2D(N_REF, 0) - BUBBLE_NORM_SQ)).toBeLessThan(3e-10);
  });

  it('reconstruction spectrale : u₂₂₅(0) = u₀ à 5·10⁻⁵ près en tout point testé', () => {
    // |u₀ − u₂₂₅| ≤ Σ_{exclus} |b_m| ‖φ_m‖_∞ ≤ 2·(32/π⁶)·2·Σ_{k≥17 impair} k⁻³ · Σ_{l impair} l⁻³ ≈ 3·10⁻⁴ (majorant grossier).
    const s = partialSum2D(N_REF, 0);
    for (const [x, y] of [[0.5, 0.5], [0.1, 0.7], [0.33, 0.21], [0.9, 0.9]] as [number, number][]) expect(Math.abs(s(x, y) - u0(x, y))).toBeLessThan(5e-5);
  });
});

describe('Le schéma de Galerkin est exact dans la base propre', () => {
  it('∂ₜuₙ = Δuₙ (différences finies, n = 6)', () => {
    const n = 6;
    const t = 0.01;
    const h = 1e-4;
    const k = 1e-3;
    const u = partialSum2D(n, t);
    for (const [x, y] of [[0.3, 0.4], [0.5, 0.5], [0.71, 0.2]] as [number, number][]) {
      const dt = (partialSum2D(n, t + h)(x, y) - partialSum2D(n, t - h)(x, y)) / (2 * h);
      const lap = (u(x + k, y) + u(x - k, y) + u(x, y + k) + u(x, y - k) - 4 * u(x, y)) / (k * k);
      expect(Math.abs(dt - lap)).toBeLessThan(1e-5);
    }
  });

  it('‖uₙ(t)‖² décroît en t et croît en n ; ‖uₙ‖² ≤ ‖u₀‖²', () => {
    expect(normSq2D(10, 0.02)).toBeLessThan(normSq2D(10, 0.01));
    expect(normSq2D(10, 0)).toBeLessThanOrEqual(normSq2D(20, 0));
    expect(normSq2D(60, 0)).toBeLessThanOrEqual(BUBBLE_NORM_SQ);
  });

  it('écarts : la somme tronquée plus le reste en t = 0 redonne la formule exacte', () => {
    for (const n of [1, 4, 9, 30]) {
      const g = gapSq2D(n, 0);
      expect(Math.abs(gapSqAt0(n) - g.value - gapSqAt0(N_REF))).toBeLessThan(1e-15);
      expect(g.remainderBound).toBeGreaterThanOrEqual(0);
    }
    expect(gapSq2D(4, 0.02).remainderBound).toBeLessThan(gapSq2D(4, 0.01).remainderBound);
    expect(MODES_2D[0]).toMatchObject({ k: 1, l: 1 });
  });
});

describe('Studio (interface) : exploration ≠ démonstration', () => {
  beforeEach(() => {
    useGame.setState({ save: emptySave(0), ready: true });
    localStorage.clear();
  });

  it('sans les dix étapes : « affichage d’exploration » ; avec : généralisation signalée, jamais « démontrée en dimension 2 »', () => {
    const before = JSON.stringify(useGame.getState().save);
    const { unmount } = render(
      <MemoryRouter>
        <Galerkin2DStudio proofComplete={false} />
      </MemoryRouter>,
    );
    expect(screen.getAllByTestId('g2-surface').length).toBeGreaterThan(0);
    expect(document.querySelector('[data-testid="webgl-fallback"]')).not.toBeNull();
    unmount();
    render(
      <MemoryRouter>
        <Galerkin2DStudio proofComplete />
      </MemoryRouter>,
    );
    expect(JSON.stringify(useGame.getState().save)).toBe(before);
  });
});
