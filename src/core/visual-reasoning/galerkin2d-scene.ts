/**
 * Galerkin en dimension spatiale 2 : ∂ₜu − Δu = 0 sur ]0,1[², u = 0 au bord,
 * u(0) = u₀ = x(1−x)y(1−y). Base de Dirichlet φ_{k,l} = 2 sin(kπx) sin(lπy), valeurs propres
 * λ = π²(k² + l²), rangées par ordre croissant. Dans cette base propre, le système de
 * Galerkin est diagonal : uₙ(t) = Σ_{m≤n} e^{−λ_m t} b_m φ_m = Pₙ u(t), exactement.
 *
 * Écarts : par Parseval, ‖u(t) − uₙ(t)‖² = Σ_{m>n} e^{−2λ_m t} b_m². En t = 0, la somme
 * est exacte : ‖u₀‖² − Σ_{m≤n} b_m², avec ‖u₀‖² = 1/900. Pour t > 0, on somme jusqu'à
 * N = 225 modes et on majore rigoureusement le reste par e^{−2λ_{N+1}t}·(‖u₀‖² − Σ_{m≤N} b_m²).
 */
import { BUBBLE_NORM_SQ, bubbleCoefficient, galerkin2D, modesByEigenvalue, phi2, type Mode2D } from './surfaces';
import type { ScalarField } from './sections';

export const MODES_2D: Mode2D[] = modesByEigenvalue(15);
export const N_REF = MODES_2D.length;

export const coefficient2D = (m: Mode2D, t: number): number => Math.exp(-m.lambda * t) * bubbleCoefficient(m);

export const partialSum2D = (n: number, t: number): ScalarField => galerkin2D(MODES_2D, n, t);

/** Terme individuel c_m(t) φ_m. */
export const term2D = (index: number, t: number): ScalarField => {
  const m = MODES_2D[index]!;
  const c = coefficient2D(m, t);
  return (x, y) => c * phi2(m, x, y);
};

/** ‖uₙ(t)‖² = Σ_{m≤n} c_m(t)² (Parseval, exacte). */
export function normSq2D(n: number, t: number): number {
  let s = 0;
  for (let i = 0; i < Math.min(n, N_REF); i++) s += coefficient2D(MODES_2D[i]!, t) ** 2;
  return s;
}

/** ‖u₀ − Pₙu₀‖² = 1/900 − Σ_{m≤n} b_m² : formule exacte (Parseval), sans troncature. */
export const gapSqAt0 = (n: number): number => Math.max(0, BUBBLE_NORM_SQ - normSq2D(n, 0));

/** ‖u(t) − uₙ(t)‖² : somme jusqu'à N, plus un majorant rigoureux du reste. */
export function gapSq2D(n: number, t: number): { value: number; remainderBound: number } {
  let s = 0;
  for (let i = n; i < N_REF; i++) s += coefficient2D(MODES_2D[i]!, t) ** 2;
  const tailAt0 = gapSqAt0(N_REF);
  const lambdaNext = Math.PI ** 2 * (16 * 16 + 1);
  return { value: s, remainderBound: Math.exp(-2 * lambdaNext * t) * tailAt0 };
}

/** Indice (rang) des modes de coefficient non nul parmi les n premiers : k et l impairs. */
export const activeModes = (n: number): number => MODES_2D.slice(0, n).filter((m) => bubbleCoefficient(m) !== 0).length;
