/**
 * Fonctions de deux variables sur Ω = ]0,1[², pour le laboratoire Sobolev et trace, et
 * approximation de Galerkin en dimension spatiale 2. Chaque propriété annoncée (appartenance
 * à H¹, H², valeur de la trace, norme du gradient) est justifiée analytiquement dans `why`.
 */
import type { ScalarField } from './sections';

export type Side = 'bas' | 'droite' | 'haut' | 'gauche';

export const SIDES: { id: Side; label: string; param: (s: number) => [number, number] }[] = [
  { id: 'bas', label: 'y = 0', param: (s) => [s, 0] },
  { id: 'droite', label: 'x = 1', param: (s) => [1, s] },
  { id: 'haut', label: 'y = 1', param: (s) => [s, 1] },
  { id: 'gauche', label: 'x = 0', param: (s) => [0, s] },
];

export interface SobolevExample {
  id: string;
  label: string;
  u: ScalarField;
  /** Gradient classique, là où u est dérivable ; null hors de ce domaine. */
  grad: (x: number, y: number) => [number, number] | null;
  /** Trace exacte sur chaque côté, comme fonction du paramètre s ∈ [0, 1]. */
  trace: Record<Side, (s: number) => number>;
  traceTex: Record<Side, string>;
  inH1: true;
  inH2: boolean;
  inH10: boolean;
  bounded: boolean;
  /** ‖∇u‖²_{L²(Ω)}, valeur exacte et sa forme. */
  gradNormSq: { value: number; tex: string };
  /** Justification analytique, indépendante de la figure. */
  why: string;
  /** Hauteur d'affichage maximale (la fonction peut être non bornée). */
  displayCap?: number;
}

const PI = Math.PI;
const s1 = (x: number) => Math.sin(PI * x);

export const SOBOLEV_EXAMPLES: SobolevExample[] = [
  {
    id: 'bulle',
    label: String.raw`u(x,y)=x(1-x)\,y(1-y)`,
    u: (x, y) => x * (1 - x) * y * (1 - y),
    grad: (x, y) => [(1 - 2 * x) * y * (1 - y), x * (1 - x) * (1 - 2 * y)],
    trace: { bas: () => 0, droite: () => 0, haut: () => 0, gauche: () => 0 },
    traceTex: { bas: '0', droite: '0', haut: '0', gauche: '0' },
    inH1: true,
    inH2: true,
    inH10: true,
    bounded: true,
    gradNormSq: { value: 1 / 45, tex: String.raw`2\cdot\tfrac13\cdot\tfrac1{30}=\tfrac1{45}` },
    why: String.raw`Polynôme : $u\in C^\infty(\overline\Omega)$, donc $u\in H^2(\Omega)$. Il s'annule sur $\partial\Omega$, d'où $\gamma u=0$ et $u\in H^1_0(\Omega)$. $\|\partial_xu\|^2=\int_0^1(1-2x)^2dx\int_0^1y^2(1-y)^2dy=\tfrac13\cdot\tfrac1{30}$, de même pour $\partial_y u$.`,
  },
  {
    id: 'produit',
    label: String.raw`u(x,y)=xy`,
    u: (x, y) => x * y,
    grad: (x, y) => [y, x],
    trace: { bas: () => 0, droite: (s) => s, haut: (s) => s, gauche: () => 0 },
    traceTex: { bas: '0', droite: 'y', haut: 'x', gauche: '0' },
    inH1: true,
    inH2: true,
    inH10: false,
    bounded: true,
    gradNormSq: { value: 2 / 3, tex: String.raw`\int_\Omega(y^2+x^2)=\tfrac23` },
    why: String.raw`Polynôme, donc $u\in H^2(\Omega)$. Sa trace vaut $y$ sur $\{x=1\}$ et $x$ sur $\{y=1\}$ : elle n'est pas nulle, donc $u\notin H^1_0(\Omega)=\ker\gamma$.`,
  },
  {
    id: 'mode',
    label: String.raw`u(x,y)=\sin(\pi x)\,e^{y}`,
    u: (x, y) => s1(x) * Math.exp(y),
    grad: (x, y) => [PI * Math.cos(PI * x) * Math.exp(y), s1(x) * Math.exp(y)],
    trace: { bas: (s) => s1(s), droite: () => 0, haut: (s) => Math.E * s1(s), gauche: () => 0 },
    traceTex: { bas: String.raw`\sin(\pi x)`, droite: '0', haut: String.raw`e\,\sin(\pi x)`, gauche: '0' },
    inH1: true,
    inH2: true,
    inH10: false,
    bounded: true,
    gradNormSq: { value: ((PI * PI + 1) / 2) * ((Math.E ** 2 - 1) / 2), tex: String.raw`\tfrac{\pi^2+1}{2}\cdot\tfrac{e^2-1}{2}` },
    why: String.raw`$u\in C^\infty(\overline\Omega)$. $\|\nabla u\|^2=\int_0^1(\pi^2\cos^2(\pi x)+\sin^2(\pi x))dx\int_0^1e^{2y}dy=\tfrac{\pi^2+1}{2}\cdot\tfrac{e^2-1}{2}$.`,
  },
  {
    id: 'singuliere',
    label: String.raw`u=\big(1+\log\tfrac{1}{2r}\big)^{1/4}\ \text{si }r<\tfrac12,\ 1\ \text{sinon}`,
    u: (x, y) => {
      const r = Math.hypot(x - 0.5, y - 0.5);
      return r >= 0.5 ? 1 : (1 + Math.log(1 / (2 * r))) ** 0.25;
    },
    grad: (x, y) => {
      const dx = x - 0.5;
      const dy = y - 0.5;
      const r = Math.hypot(dx, dy);
      if (r === 0) return null;
      if (r > 0.5) return [0, 0];
      const s = 1 + Math.log(1 / (2 * r));
      const dr = -0.25 * s ** -0.75 / r;
      return [(dr * dx) / r, (dr * dy) / r];
    },
    trace: { bas: () => 1, droite: () => 1, haut: () => 1, gauche: () => 1 },
    traceTex: { bas: '1', droite: '1', haut: '1', gauche: '1' },
    inH1: true,
    inH2: false,
    inH10: false,
    bounded: false,
    gradNormSq: { value: PI / 4, tex: String.raw`2\pi\int_0^{1/2}\frac{s^{-3/2}}{16\,r^2}\,r\,dr=\tfrac{\pi}{8}\int_1^\infty s^{-3/2}ds=\tfrac\pi4` },
    why: String.raw`Avec $r=|(x,y)-(\tfrac12,\tfrac12)|$ et $s=1+\log\frac1{2r}$ : $|\nabla u|=\tfrac14 s^{-3/4}/r$ pour $r<\tfrac12$, et $\int_\Omega|\nabla u|^2=2\pi\int_0^{1/2}\tfrac{s^{-3/2}}{16r}dr=\tfrac\pi8\int_1^\infty s^{-3/2}ds=\tfrac\pi4<\infty$ (changement $ds=-dr/r$). Donc $u\in H^1(\Omega)$, bien que $u$ ne soit pas bornée au centre : en dimension 2, $H^1$ ne s'injecte pas dans $L^\infty$. Sa trace vaut $1$ sur tout le bord. $u\notin H^2$ : sinon $u$ serait continue (injection $H^2(\Omega)\hookrightarrow C(\overline\Omega)$ en dimension 2).`,
    displayCap: 1.6,
  },
];

/** Gradient approché par différences centrées, à comparer au gradient exact (statut numérique). */
export function finiteDifferenceGradient(u: ScalarField, x: number, y: number, h = 1e-4): [number, number] {
  return [(u(x + h, y) - u(x - h, y)) / (2 * h), (u(x, y + h) - u(x, y - h)) / (2 * h)];
}

// ─────────────── Galerkin sur le carré unité ───────────────

/**
 * Base de Dirichlet du carré : φ_{k,l}(x, y) = 2 sin(kπx) sin(lπy), de norme 1 dans L²(Ω),
 * valeur propre λ_{k,l} = π²(k² + l²). Les modes sont rangés par valeur propre croissante.
 */
export interface Mode2D {
  k: number;
  l: number;
  lambda: number;
}

export function modesByEigenvalue(maxIndex: number): Mode2D[] {
  const out: Mode2D[] = [];
  for (let k = 1; k <= maxIndex; k++) for (let l = 1; l <= maxIndex; l++) out.push({ k, l, lambda: PI * PI * (k * k + l * l) });
  return out.sort((a, b) => a.lambda - b.lambda || a.k - b.k);
}

export const phi2 = (m: Mode2D, x: number, y: number): number => 2 * Math.sin(m.k * PI * x) * Math.sin(m.l * PI * y);

/** Coefficients de u₀ = x(1−x)y(1−y) : b_{k,l} = 32/(π⁶k³l³) pour k, l impairs, 0 sinon. */
export const bubbleCoefficient = (m: Mode2D): number => (m.k % 2 === 1 && m.l % 2 === 1 ? 32 / (PI ** 6 * m.k ** 3 * m.l ** 3) : 0);

/** ‖u₀‖²_{L²(Ω)} = (1/30)² pour u₀ = x(1−x)y(1−y). */
export const BUBBLE_NORM_SQ = 1 / 900;

/** Solution de Galerkin avec f = 0 : u_n(t) = Σ_{m ≤ n} e^{−λ_m t} b_m φ_m (exacte sur V_n). */
export function galerkin2D(modes: readonly Mode2D[], n: number, t: number): ScalarField {
  const used = modes.slice(0, n).map((m) => ({ m, c: Math.exp(-m.lambda * t) * bubbleCoefficient(m) })).filter((e) => e.c !== 0);
  return (x, y) => used.reduce((s, e) => s + e.c * phi2(e.m, x, y), 0);
}

/** ‖u_n(t) − u_N(t)‖²_{L²} = Σ_{n < m ≤ N} c_m(t)² (Parseval), N la référence tronquée. */
export function galerkin2DGapSq(modes: readonly Mode2D[], n: number, N: number, t: number): number {
  let s = 0;
  for (let i = n; i < Math.min(N, modes.length); i++) s += (Math.exp(-modes[i]!.lambda * t) * bubbleCoefficient(modes[i]!)) ** 2;
  return s;
}
