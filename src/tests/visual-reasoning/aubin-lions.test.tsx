/**
 * Aubin–Lions : trois situations distinctes quand une hypothèse manque, normes exactes des
 * nouvelles familles contrôlées par quadrature, translations en temps, interface du studio.
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { AL_FAMILIES, classify, NOT_GUARANTEED_FAMILIES, pairFor, spatialNormSq, timeTranslationSq, type HypothesisId } from '@/core/visual-reasoning/aubin-lions-scene';
import { AubinLionsStudio } from '@/labs/visual-scenes/aubin-lions/AubinLionsStudio';
import { emptySave } from '@/storage/save';
import { useGame } from '@/storage/store';

const byId = (id: string) => AL_FAMILIES.find((f) => f.id === id)!;

function simpson(f: (t: number) => number, a: number, b: number, m = 400): number {
  const h = (b - a) / m;
  let s = 0;
  for (let i = 0; i <= m; i++) s += (i === 0 || i === m ? 1 : i % 2 ? 4 : 2) * f(a + i * h);
  return (s * h) / 3;
}

describe('Trois situations quand une hypothèse manque', () => {
  it('classification : garantie, fausse, vraie mais non garantie', () => {
    expect(classify(byId('amortie-temps')).verdict).toBe('garantie');
    expect(classify(byId('oscillation-temps')).verdict).toBe('fausse');
    expect(classify(byId('temps-lente')).verdict).toBe('non-garantie');
    expect(classify(byId('translation-amortie')).missing).toEqual(['compacite']);
  });

  for (const h of ['spatial', 'temporal', 'compacite'] as HypothesisId[]) {
    it(`retirer « ${h} » : un contre-exemple (conclusion fausse) et un exemple (vraie, non garantie)`, () => {
      const { fausse, nonGarantie } = pairFor(h);
      expect(classify(fausse).missing).toEqual([h]);
      expect(classify(nonGarantie).missing).toEqual([h]);
      expect(fausse.strong).toBe(false);
      expect(nonGarantie.strong).toBe(true);
      // Contre-exemple : norme constante ; exemple : norme → 0.
      expect(fausse.normL2L2(64)).toBeCloseTo(fausse.normL2L2(1), 12);
      expect(nonGarantie.normL2L2(64)).toBeLessThan(nonGarantie.normL2L2(1) / 30);
    });
  }
});

describe('Normes exactes des familles « non garanties », contrôlées par quadrature', () => {
  for (const f of NOT_GUARANTEED_FAMILIES) {
    it(`${f.id} : ‖uₙ‖²_{L²(H)} = ∫ ‖uₙ(t)‖² dt`, () => {
      for (const n of [1, 3, 7]) {
        const [a, b] = f.tRange;
        const q = simpson((t) => spatialNormSq(f, n, t, 2000), a, b, 400);
        expect(Math.abs(q - f.normL2L2(n)) / f.normL2L2(n)).toBeLessThan(1e-3);
      }
    });
  }

  it('espace-lente : ‖∂ₓuₙ‖²_{L²(L²)} = nπ³ (différences centrées)', () => {
    const f = byId('espace-lente');
    for (const n of [2, 5]) {
      const h = 1e-5;
      const dx = (t: number, x: number) => (f.u(n, t, x + h) - f.u(n, t, x - h)) / (2 * h);
      const inner = simpson((x) => dx(0, x) ** 2, 0, 1, 2000);
      expect(Math.abs(2 * Math.PI * inner - f.spatial.value(n)) / f.spatial.value(n)).toBeLessThan(1e-4);
    }
  });

  it('temps-lente : ‖∂ₜuₙ‖²_{L²(H⁻¹)} = n/π, avec ‖φ₁‖²_{H⁻¹} = 1/π²', () => {
    const f = byId('temps-lente');
    for (const n of [2, 6]) {
      const h = 1e-5;
      const a = (t: number) => Math.sin(n * t) / Math.sqrt(n);
      const da = (t: number) => (a(t + h) - a(t - h)) / (2 * h);
      const q = simpson((t) => da(t) ** 2, 0, 2 * Math.PI, 4000) / Math.PI ** 2;
      expect(Math.abs(q - f.temporal.value(n)) / f.temporal.value(n)).toBeLessThan(1e-4);
    }
  });
});

describe('Translations en temps', () => {
  it('oscillation en temps : pas d’équicontinuité (reste ≥ c pour n grand) ; amortie : → 0', () => {
    const osc = byId('oscillation-temps');
    const amo = byId('amortie-temps');
    const tau = 0.5;
    const oscVals = [8, 16, 32].map((n) => timeTranslationSq(osc, n, tau, 400, 60));
    for (const v of oscVals) expect(v).toBeGreaterThan(1);
    const amoVals = [8, 16, 32].map((n) => timeTranslationSq(amo, n, tau, 400, 60));
    expect(amoVals[2]!).toBeLessThan(amoVals[0]!);
    expect(amoVals[2]!).toBeLessThan(0.05);
  });

  it('famille stationnaire : translation nulle', () => {
    expect(timeTranslationSq(byId('oscillation-espace'), 5, 0.7)).toBeCloseTo(0, 12);
  });
});

describe('Studio Aubin–Lions (interface)', () => {
  beforeEach(() => {
    useGame.setState({ save: emptySave(0), ready: true });
    localStorage.clear();
  });

  it('retirer la borne temporelle : contre-exemple et exemple non garanti côte à côte, sans écriture', () => {
    render(
      <MemoryRouter>
        <AubinLionsStudio />
      </MemoryRouter>,
    );
    const before = JSON.stringify(useGame.getState().save);
    expect(screen.getByTestId('al-diagram').getAttribute('data-case')).toBe('garantie');
    fireEvent.click(document.querySelector('[data-remove="temporal"]')!);
    expect(screen.getByTestId('al-diagram').getAttribute('data-case')).toBe('fausse');
    const studio = document.querySelector('[data-studio="aubin-lions"]') as HTMLElement;
    fireEvent.click(within(studio).getByRole('button', { name: 'Avec / sans hypothèse' }));
    expect(document.querySelector('[data-al-card="fausse"]')!.getAttribute('data-case')).toBe('fausse');
    expect(document.querySelector('[data-al-card="non-garantie"]')!.getAttribute('data-case')).toBe('non-garantie');
    expect(document.querySelector('[data-al-card="non-garantie"]')!.textContent).toMatch(/non garantie/);
    expect(JSON.stringify(useGame.getState().save)).toBe(before);
  });
});
