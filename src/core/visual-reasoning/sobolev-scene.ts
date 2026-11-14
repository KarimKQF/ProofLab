/**
 * Scène « Sobolev et traces » sur Ω = ]0,1[² (ouvert borné lipschitzien).
 *
 * Une fonction u de la bibliothèque (surfaces.ts), éventuellement perturbée par t·u₀ avec
 * u₀ = 16x(1−x)y(1−y) ∈ H¹₀(Ω) : la trace ne change pas, ce qui rend visible l'inclusion
 * H¹₀ ⊂ ker γ. Toutes les vues (surface, niveaux, coupes, traces, formules) dérivent du
 * même état (exemple, t, x₀, y₀).
 */
import { SIDES, SOBOLEV_EXAMPLES, type Side, type SobolevExample } from './surfaces';
import type { ScalarField } from './sections';
import { fmt } from './types';
import type { ConclusionLine, EquationLine, HypothesisLine, Measure, SceneReadout } from './types';

/** u₀ = 16x(1−x)y(1−y) : maximum 1 au centre, nulle sur ∂Ω, dans H¹₀(Ω). */
export const bubble: ScalarField = (x, y) => 16 * x * (1 - x) * y * (1 - y);
const bubbleGrad = (x: number, y: number): [number, number] => [16 * (1 - 2 * x) * y * (1 - y), 16 * x * (1 - x) * (1 - 2 * y)];

export interface SobolevState {
  exampleId: string;
  /** Coefficient de la perturbation t·u₀ ∈ H¹₀. */
  t: number;
  x0: number;
  y0: number;
  /** Pas des différences centrées. */
  h: number;
}

export const exampleById = (id: string): SobolevExample => SOBOLEV_EXAMPLES.find((e) => e.id === id) ?? SOBOLEV_EXAMPLES[0]!;

export function field(s: SobolevState): ScalarField {
  const e = exampleById(s.exampleId);
  return s.t === 0 ? e.u : (x, y) => e.u(x, y) + s.t * bubble(x, y);
}

export function gradient(s: SobolevState, x: number, y: number): [number, number] | null {
  const g = exampleById(s.exampleId).grad(x, y);
  if (!g) return null;
  const b = bubbleGrad(x, y);
  return [g[0] + s.t * b[0], g[1] + s.t * b[1]];
}

/**
 * Trace sur ∂Ω parcourue dans le sens direct, paramétrée par l'abscisse curviligne
 * σ ∈ [0, 4] : bas (x = σ), droite (y = σ − 1), haut (x = 3 − σ), gauche (y = 4 − σ).
 */
export function boundaryPoint(sigma: number): { side: Side; xy: [number, number]; s: number } {
  const k = Math.min(3, Math.floor(sigma));
  const r = sigma - k;
  if (k === 0) return { side: 'bas', xy: [r, 0], s: r };
  if (k === 1) return { side: 'droite', xy: [1, r], s: r };
  if (k === 2) return { side: 'haut', xy: [1 - r, 1], s: 1 - r };
  return { side: 'gauche', xy: [0, 1 - r], s: 1 - r };
}

/** γu le long du bord : formule exacte de la trace (indépendante de t, car γu₀ = 0). */
export function traceProfile(s: SobolevState, samples = 400): { sigma: number; value: number; side: Side }[] {
  const e = exampleById(s.exampleId);
  return Array.from({ length: samples + 1 }, (_, i) => {
    const sigma = (4 * i) / samples;
    const b = boundaryPoint(sigma);
    return { sigma, value: e.trace[b.side](b.s), side: b.side };
  });
}

/** Valeur de u (perturbée) évaluée sur le bord : coïncide avec la trace exacte (fonctions continues jusqu'au bord). */
export function boundaryValues(s: SobolevState, samples = 400): number[] {
  const u = field(s);
  return Array.from({ length: samples + 1 }, (_, i) => {
    const b = boundaryPoint((4 * i) / samples);
    return u(b.xy[0], b.xy[1]);
  });
}

/** Différences centrées le long de y = y₀ : écart maximal au gradient exact (statut numérique). */
export function derivativeError(s: SobolevState, samples = 60): { xs: number[]; exact: number[]; approx: number[]; maxError: number } {
  const u = field(s);
  const xs: number[] = [];
  const exact: number[] = [];
  const approx: number[] = [];
  let maxError = 0;
  for (let i = 1; i < samples; i++) {
    const x = i / samples;
    const g = gradient(s, x, s.y0);
    if (!g) continue;
    const a = (u(x + s.h, s.y0) - u(x - s.h, s.y0)) / (2 * s.h);
    xs.push(x);
    exact.push(g[0]);
    approx.push(a);
    if (Number.isFinite(a) && Number.isFinite(g[0])) maxError = Math.max(maxError, Math.abs(a - g[0]));
  }
  return { xs, exact, approx, maxError };
}

/**
 * ‖∇u‖²_{L²} par la règle du point milieu sur une grille n × n, avec le gradient exact.
 * Valeur numérique : pour l'exemple singulier, la convergence est lente (singularité).
 */
export function gradNormSqNumeric(s: SobolevState, n = 200): number {
  let sum = 0;
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const g = gradient(s, (i + 0.5) / n, (j + 0.5) / n);
      if (g) sum += g[0] * g[0] + g[1] * g[1];
    }
  }
  return sum / (n * n);
}

/** ‖∇(u + t u₀)‖² exacte = ‖∇u‖² + 2t⟨∇u, ∇u₀⟩ + t²‖∇u₀‖², avec ‖∇u₀‖² = 256·2·(1/3)(1/30) = 256/45. */
export const BUBBLE_GRAD_SQ = 256 / 45;

export function sobolevReadout(s: SobolevState): SceneReadout {
  const e = exampleById(s.exampleId);
  const u = field(s);
  const g = gradient(s, s.x0, s.y0);
  const fd: [number, number] = [(u(s.x0 + s.h, s.y0) - u(s.x0 - s.h, s.y0)) / (2 * s.h), (u(s.x0, s.y0 + s.h) - u(s.x0, s.y0 - s.h)) / (2 * s.h)];
  const measures: Measure[] = [
    { id: 'u', label: String.raw`$u(x_0,y_0)$`, value: fmt(u(s.x0, s.y0), 4), numeric: u(s.x0, s.y0), status: 'exact' },
    {
      id: 'grad',
      label: String.raw`$\nabla u(x_0,y_0)$`,
      value: g ? `(${fmt(g[0], 4)} ; ${fmt(g[1], 4)})` : 'non défini',
      status: 'exact',
      method: 'Gradient classique, formule fermée.',
    },
    {
      id: 'fd',
      label: String.raw`Différences centrées, pas $h$`,
      value: `(${fmt(fd[0], 4)} ; ${fmt(fd[1], 4)})`,
      status: 'numerique',
      method: 'Erreur O(h²) pour u de classe C³ au voisinage du point ; aucune garantie près de la singularité.',
    },
  ];
  if (s.t === 0) {
    measures.push({ id: 'gradsq', label: String.raw`$\|\nabla u\|^2_{L^2(\Omega)}$ (exacte)`, value: `${fmt(e.gradNormSq.value, 4)}`, numeric: e.gradNormSq.value, status: 'exact', method: e.gradNormSq.tex });
    const q = gradNormSqNumeric(s, 120);
    measures.push({
      id: 'gradsq-num',
      label: String.raw`Quadrature (point milieu, $120\times120$)`,
      value: fmt(q, 4),
      numeric: q,
      status: 'numerique',
      method: e.bounded
        ? 'Erreur O(1/n²) pour une fonction régulière.'
        : 'Près de la singularité, la masse manquante est d’ordre 1/√(log n) : la quadrature converge très lentement. La valeur exacte vient de l’analyse.',
    });
  }

  const equations: EquationLine[] = [
    { id: 'fonction', tex: `$${e.label}${s.t !== 0 ? String.raw`\;+\;t\,u_0` : ''}$`, status: 'exact' },
    {
      id: 'trace',
      tex: String.raw`$\gamma:H^1(\Omega)\to H^{1/2}(\partial\Omega)$ linéaire continue surjective, $\ker\gamma=H^1_0(\Omega)$ ; $\gamma u=u_{|\partial\Omega}$ pour $u\in C(\overline\Omega)\cap H^1(\Omega)$.`,
      status: 'exact',
      note: 'Énoncé du polycopié (section 3.6), pour Ω borné lipschitzien.',
    },
    {
      id: 'traces',
      tex: SIDES.map((sd) => `$${sd.label}$ : $\\gamma u=${e.traceTex[sd.id]}$`).join(' ; '),
      status: 'exact',
      note: s.t !== 0 ? 'Inchangées par l’ajout de t·u₀, car γu₀ = 0.' : undefined,
    },
    { id: 'justification', tex: e.why, status: 'exact', note: 'Justification analytique, indépendante de la figure.' },
  ];

  const hypotheses: HypothesisLine[] = [
    { id: 'omega', label: String.raw`$\Omega=]0,1[^2$ borné lipschitzien`, state: 'satisfaite', detail: 'Le carré n’est pas de classe C¹ (coins), mais il est lipschitzien : c’est l’hypothèse du théorème.' },
    { id: 'h1', label: String.raw`$u\in H^1(\Omega)$`, state: 'satisfaite', detail: 'Justifié analytiquement pour cet exemple (voir la vue Équations).' },
  ];

  const inH10 = e.inH10;
  const conclusions: ConclusionLine[] = [
    { id: 'trace', label: String.raw`$\gamma u\in H^{1/2}(\partial\Omega)$, $\|\gamma u\|\le C\|u\|_{H^1}$`, state: 'illustrative', detail: 'Conséquence du théorème de trace, que ce laboratoire ne démontre pas : la figure montre γu, elle ne prouve rien.' },
    {
      id: 'h10',
      label: inH10 ? String.raw`$u\in H^1_0(\Omega)$` : String.raw`$u\notin H^1_0(\Omega)$`,
      state: 'illustrative',
      detail: inH10 ? 'γu = 0 et ker γ = H¹₀.' : 'γu ≠ 0, donc u ∉ ker γ = H¹₀.',
    },
  ];
  return { measures, equations, hypotheses, conclusions };
}
