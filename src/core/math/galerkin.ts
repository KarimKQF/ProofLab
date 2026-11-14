/**
 * Laboratoire E : ∂ₜu − ∂ₓₓu = f sur ]0,1[, conditions de Dirichlet.
 * Base φ_k(x) = √2 sin(kπx), λ_k = (kπ)². V_n = Vect(φ_1, …, φ_n).
 * Le système de Galerkin se résout exactement : c_k' + λ_k c_k = f_k, c_k(0) = b_k.
 *
 * Trois niveaux d'information à ne pas confondre :
 *  - exact : formules fermées de c_k(t) ;
 *  - numérique : somme tronquée et quadrature, avec un reste explicite ;
 *  - démontré : ce que le joueur établit dans les dix étapes de preuve.
 */
export const lambda = (k: number): number => (k * Math.PI) ** 2;
export const phi = (k: number, x: number): number => Math.SQRT2 * Math.sin(k * Math.PI * x);

export interface InitialData {
  id: string;
  label: string;
  /** Coefficient b_k = (u₀, φ_k)_{L²}. */
  coefficient: (k: number) => number;
  /** ‖u₀‖²_{L²}, valeur exacte. */
  normSq: number;
  /** Valeur en x de u₀, pour le tracé. */
  evaluate: (x: number) => number;
  /** Nombre fini de modes non nuls, si c'est le cas. */
  modes?: number;
  /** Majorant de Σ_{k>K} b_k². */
  tailBound: (K: number) => number;
}

const PI = Math.PI;

export const INITIAL_DATA: InitialData[] = [
  {
    id: 'parabole',
    label: String.raw`u_0(x)=x(1-x)`,
    coefficient: (k) => (k % 2 === 1 ? (4 * Math.SQRT2) / (k * PI) ** 3 : 0),
    normSq: 1 / 30,
    evaluate: (x) => x * (1 - x),
    tailBound: (K) => 32 / (5 * PI ** 6 * K ** 5),
  },
  {
    id: 'mode1',
    label: String.raw`u_0=\varphi_1`,
    coefficient: (k) => (k === 1 ? 1 : 0),
    normSq: 1,
    evaluate: (x) => phi(1, x),
    modes: 1,
    tailBound: () => 0,
  },
  {
    id: 'modes',
    label: String.raw`u_0=\varphi_1+\tfrac12\varphi_3`,
    coefficient: (k) => (k === 1 ? 1 : k === 3 ? 1 / 2 : 0),
    normSq: 5 / 4,
    evaluate: (x) => phi(1, x) + 0.5 * phi(3, x),
    modes: 3,
    tailBound: () => 0,
  },
  {
    id: 'constante',
    label: String.raw`u_0=1\ (\text{dans }L^2\setminus H^1_0)`,
    coefficient: (k) => (k % 2 === 1 ? (2 * Math.SQRT2) / (k * PI) : 0),
    normSq: 1,
    evaluate: () => 1,
    // Σ_{k>K, k impair} 1/k² ≤ 1/(K+1)² + 1/(2(K+1)) ≤ 1/K.
    tailBound: (K) => 8 / (PI * PI * K),
  },
];

export interface Forcing {
  id: string;
  label: string;
  /** Coefficient f_k(t) = ⟨f(t), φ_k⟩. */
  coefficient: (k: number, t: number) => number;
  /** Solution de la partie non homogène : ∫₀ᵗ e^{−λ_k(t−s)} f_k(s) ds, exacte. */
  duhamel: (k: number, t: number) => number;
  /** ‖f(t)‖²_{V'} = Σ f_k(t)²/λ_k. */
  dualNormSq: (t: number) => number;
  /** Nombre fini de modes non nuls, si c'est le cas. */
  modes?: number;
  /** Valeur en x, t pour le tracé. */
  evaluate: (t: number, x: number) => number;
}

export const FORCINGS: Forcing[] = [
  {
    id: 'nul',
    label: String.raw`f=0`,
    coefficient: () => 0,
    duhamel: () => 0,
    dualNormSq: () => 0,
    modes: 0,
    evaluate: () => 0,
  },
  {
    id: 'stationnaire',
    label: String.raw`f=\varphi_1`,
    coefficient: (k) => (k === 1 ? 1 : 0),
    duhamel: (k, t) => (k === 1 ? (1 - Math.exp(-lambda(1) * t)) / lambda(1) : 0),
    dualNormSq: () => 1 / lambda(1),
    modes: 1,
    evaluate: (_t, x) => phi(1, x),
  },
  {
    id: 'oscillant',
    label: String.raw`f=\cos(2\pi t)\,\varphi_2`,
    coefficient: (k, t) => (k === 2 ? Math.cos(2 * PI * t) : 0),
    duhamel: (k, t) => {
      if (k !== 2) return 0;
      const l = lambda(2);
      const w = 2 * PI;
      return (l * Math.cos(w * t) + w * Math.sin(w * t) - l * Math.exp(-l * t)) / (l * l + w * w);
    },
    dualNormSq: (t) => Math.cos(2 * PI * t) ** 2 / lambda(2),
    modes: 2,
    evaluate: (t, x) => Math.cos(2 * PI * t) * phi(2, x),
  },
];

/** Coefficient c_k(t), exact. */
export function coefficient(k: number, t: number, init: InitialData, f: Forcing): number {
  return Math.exp(-lambda(k) * t) * init.coefficient(k) + f.duhamel(k, t);
}

/** Valeur de l'approximation de Galerkin u_n(t, x). */
export function galerkin(n: number, t: number, x: number, init: InitialData, f: Forcing): number {
  let s = 0;
  for (let k = 1; k <= n; k++) s += coefficient(k, t, init, f) * phi(k, x);
  return s;
}

/** Quand u₀ et f ont un nombre fini de modes, la solution de Galerkin est exacte pour n assez grand. */
export function exactOrder(init: InitialData, f: Forcing): number | null {
  if (init.modes === undefined || f.modes === undefined) return null;
  return Math.max(init.modes, f.modes);
}

/** Rang de troncature de la solution de référence. */
export const REFERENCE_ORDER = 800;

/** ‖u_n(t) − u(t)‖²_{L²} = Σ_{k>n} c_k(t)², par Parseval, tronquée à REFERENCE_ORDER. */
export function differenceSq(n: number, t: number, init: InitialData, f: Forcing): number {
  let s = 0;
  for (let k = n + 1; k <= REFERENCE_ORDER; k++) s += coefficient(k, t, init, f) ** 2;
  return s;
}

/** ‖u_n(t)‖²_{L²}. */
export function normSq(n: number, t: number, init: InitialData, f: Forcing): number {
  let s = 0;
  for (let k = 1; k <= n; k++) s += coefficient(k, t, init, f) ** 2;
  return s;
}

/** Quadrature de Simpson sur [0, t]. */
export function simpson(g: (s: number) => number, t: number, m = 400): number {
  if (t <= 0) return 0;
  const h = t / m;
  let s = g(0) + g(t);
  for (let i = 1; i < m; i++) s += (i % 2 === 0 ? 2 : 4) * g(i * h);
  return (s * h) / 3;
}

/**
 * ∫₀ᵗ ‖u_n(s)‖²_V ds = Σ_k λ_k ∫₀ᵗ c_k(s)² ds.
 * Pour un mode sans second membre, c_k(s) = e^{−λ_k s} b_k et l'intégrale vaut exactement
 * b_k² (1 − e^{−2λ_k t}) / 2 : la quadrature, imprécise pour λ_k grand, n'est employée
 * que pour les quelques modes forcés, où λ_k est petit et la fonction régulière.
 */
export function integralNormVSq(n: number, t: number, init: InitialData, f: Forcing): number {
  let total = 0;
  for (let k = 1; k <= n; k++) {
    const forced = f.modes === undefined || k <= f.modes;
    if (!forced) {
      const b = init.coefficient(k);
      total += (b * b * (1 - Math.exp(-2 * lambda(k) * t))) / 2;
    } else {
      total += simpson((s) => lambda(k) * coefficient(k, s, init, f) ** 2, t, 2000);
    }
  }
  return total;
}

/**
 * Estimation a priori correcte : pour tout t,
 *   ‖u_n(t)‖²_H + ∫₀ᵗ ‖u_n‖²_V ≤ ‖P_n u₀‖²_H + ∫₀ᵗ ‖f‖²_{V'}.
 * Elle remplace l'énoncé du polycopié, faux sous la forme
 *   sup_t ‖u‖²_H + ∫₀ᵀ ‖u‖²_V ≤ ‖u₀‖²_H + ‖f‖²_{L²(V')}.
 */
export interface EstimateReport {
  left: number;
  right: number;
  holds: boolean;
}

export function aPrioriEstimate(n: number, t: number, init: InitialData, f: Forcing): EstimateReport {
  const left = normSq(n, t, init, f) + integralNormVSq(n, t, init, f);
  let projected = 0;
  for (let k = 1; k <= n; k++) projected += init.coefficient(k) ** 2;
  const right = projected + simpson(f.dualNormSq, t);
  return { left, right, holds: left <= right * (1 + 1e-6) + 1e-9 };
}

// ─────── Vérification symbolique exacte des solutions de référence (tests) ───────

/**
 * Terme c · π^p · e^{−(kπ)²·t·a} · sin(kπx) : a = 1 pour la partie transitoire, 0 pour
 * la partie stationnaire. Les coefficients sont rationnels ; π reste un symbole.
 */
export interface SpectralTerm {
  coef: [bigint, bigint];
  piPower: number;
  k: number;
  transient: boolean;
}

function reduce([n, d]: [bigint, bigint]): [bigint, bigint] {
  const g = (a: bigint, b: bigint): bigint => (b === 0n ? (a < 0n ? -a : a) : g(b, a % b));
  const h = g(n, d) || 1n;
  return d < 0n ? [-n / h, -d / h] : [n / h, d / h];
}

/** ∂ₜ d'un terme. */
export function dtTerm(s: SpectralTerm): SpectralTerm | null {
  if (!s.transient) return null;
  return { coef: reduce([-s.coef[0] * BigInt(s.k * s.k), s.coef[1]]), piPower: s.piPower + 2, k: s.k, transient: true };
}

/** ∂ₓₓ d'un terme. */
export function dxxTerm(s: SpectralTerm): SpectralTerm {
  return { coef: reduce([-s.coef[0] * BigInt(s.k * s.k), s.coef[1]]), piPower: s.piPower + 2, k: s.k, transient: s.transient };
}

/** Somme de termes, regroupés ; deux expressions sont égales si leurs formes réduites coïncident. */
export function collect(terms: (SpectralTerm | null)[]): SpectralTerm[] {
  const map = new Map<string, SpectralTerm>();
  for (const t of terms) {
    if (!t) continue;
    const key = `${t.piPower}|${t.k}|${t.transient}`;
    const prev = map.get(key);
    if (!prev) map.set(key, { ...t, coef: reduce(t.coef) });
    else {
      map.set(key, {
        ...prev,
        coef: reduce([prev.coef[0] * t.coef[1] + t.coef[0] * prev.coef[1], prev.coef[1] * t.coef[1]]),
      });
    }
  }
  return [...map.values()].filter((t) => t.coef[0] !== 0n);
}

/** Opposé d'un terme. */
export const negate = (t: SpectralTerm): SpectralTerm => ({ ...t, coef: [-t.coef[0], t.coef[1]] });
