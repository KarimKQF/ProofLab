/**
 * Aubin–Lions : V ↪↪ H ↪ V′ (ici V = H¹₀(Ω), H = L²(Ω), V′ = H⁻¹(Ω), Ω = ]0,1[, T = 2π).
 * Si (uₙ) est bornée dans L²(0,T ; V) et (u′ₙ) bornée dans L²(0,T ; V′), alors (uₙ) est
 * relativement compacte dans L²(0,T ; H).
 *
 * Trois situations sont toujours distinguées quand une hypothèse manque :
 *  (1) le théorème n'est pas applicable (toujours le cas) ;
 *  (2) la conclusion est fausse pour un contre-exemple explicite ;
 *  (3) la conclusion reste vraie pour un autre exemple, mais n'est plus garantie.
 */
import { COMPACTNESS_FAMILIES, type CompactnessFamily } from '@/core/math/compactness';

const PI = Math.PI;
const phi1 = (x: number) => Math.SQRT2 * Math.sin(PI * x);
const hat = (y: number) => Math.max(0, 1 - Math.abs(y));

/** Exemples du cas (3) : une hypothèse manque, la conclusion reste vraie (calcul direct). */
export const NOT_GUARANTEED_FAMILIES: CompactnessFamily[] = [
  {
    id: 'espace-lente',
    label: String.raw`u_n(t,x)=n^{-1/2}\sin(n\pi x)`,
    note: 'Borne spatiale perdue, mais amplitude décroissante.',
    setting: String.raw`\Omega=]0,1[,\ T=2\pi`,
    xRange: [0, 1],
    tRange: [0, 2 * PI],
    u: (n, _t, x) => Math.sin(n * PI * x) / Math.sqrt(n),
    spatial: { holds: false, formula: String.raw`\|u_n\|^2_{L^2(H^1_0)}=2\pi\cdot\frac1n\cdot\frac{(n\pi)^2}2=n\pi^3`, value: (n) => n * PI ** 3 },
    temporal: { holds: true, formula: String.raw`\partial_t u_n=0`, value: () => 0 },
    normL2L2: (n) => PI / n,
    compactEmbedding: true,
    strong: true,
    missing: 'spatial',
    proof: String.raw`$\|u_n\|^2_{L^2(L^2)}=2\pi\cdot\frac1{2n}=\frac\pi n\to0$ : la suite converge fortement vers $0$, bien que la borne dans $L^2(0,T;H^1_0)$ soit perdue ($n\pi^3\to\infty$). Le théorème ne s'applique pas ; la conclusion vient d'un calcul direct.`,
  },
  {
    id: 'temps-lente',
    label: String.raw`u_n(t,x)=n^{-1/2}\sin(nt)\,\varphi_1(x)`,
    note: 'Borne temporelle perdue, mais amplitude décroissante.',
    setting: String.raw`\Omega=]0,1[,\ T=2\pi`,
    xRange: [0, 1],
    tRange: [0, 2 * PI],
    u: (n, t, x) => (Math.sin(n * t) * phi1(x)) / Math.sqrt(n),
    spatial: { holds: true, formula: String.raw`\|u_n\|^2_{L^2(H^1_0)}=\frac1n\cdot\pi\cdot\pi^2=\frac{\pi^3}n`, value: (n) => PI ** 3 / n },
    temporal: { holds: false, formula: String.raw`\|\partial_tu_n\|^2_{L^2(H^{-1})}=n\cdot\pi\cdot\frac1{\pi^2}=\frac n\pi`, value: (n) => n / PI },
    normL2L2: (n) => PI / n,
    compactEmbedding: true,
    strong: true,
    missing: 'temporal',
    proof: String.raw`$\|u_n\|^2_{L^2(L^2)}=\frac1n\int_0^{2\pi}\sin^2(nt)\,dt=\frac\pi n\to0$, alors que $\|\partial_tu_n\|^2_{L^2(H^{-1})}=\frac n\pi\to\infty$. Conclusion vraie, mais non garantie par le théorème.`,
  },
  {
    id: 'translation-amortie',
    label: String.raw`u_n(x)=\tfrac1n\varphi(x-n)\ \text{sur }\mathbb R`,
    note: 'Injection non compacte, mais amplitude décroissante.',
    setting: String.raw`\Omega=\mathbb R,\ \varphi(y)=\max(0,1-|y|)`,
    xRange: [-1, 13],
    tRange: [0, 1],
    u: (n, _t, x) => hat(x - n) / n,
    spatial: { holds: true, formula: String.raw`\|u_n\|^2_{H^1(\mathbb R)}=\frac{8}{3n^2}`, value: (n) => 8 / (3 * n * n) },
    temporal: { holds: true, formula: String.raw`\partial_t u_n=0`, value: () => 0 },
    normL2L2: (n) => 2 / (3 * n * n),
    compactEmbedding: false,
    strong: true,
    missing: 'compacite',
    proof: String.raw`$\|u_n\|^2_{L^2(\mathbb R)}=\frac2{3n^2}\to0$ : convergence forte, alors que l'injection $H^1(\mathbb R)\hookrightarrow L^2(\mathbb R)$ n'est pas compacte. Hypothèse absente, conclusion vraie mais non garantie.`,
  },
];

export const AL_FAMILIES: CompactnessFamily[] = [...COMPACTNESS_FAMILIES, ...NOT_GUARANTEED_FAMILIES];

export type HypothesisId = 'spatial' | 'temporal' | 'compacite';

export const HYP_LABEL: Record<HypothesisId, string> = {
  spatial: String.raw`$(u_n)$ bornée dans $L^2(0,T;V)$`,
  temporal: String.raw`$(u_n')$ bornée dans $L^2(0,T;V')$`,
  compacite: String.raw`$V\hookrightarrow H$ compacte`,
};

export function hypothesesOf(f: CompactnessFamily): Record<HypothesisId, boolean> {
  return { spatial: f.spatial.holds, temporal: f.temporal.holds, compacite: f.compactEmbedding };
}

export type AlCase = 'garantie' | 'fausse' | 'non-garantie';

/**
 * Classification : le théorème s'applique (conclusion garantie), ou non ; dans ce cas la
 * conclusion est fausse (contre-exemple) ou vraie sans être garantie (calcul direct).
 */
export function classify(f: CompactnessFamily): { applies: boolean; missing: HypothesisId[]; verdict: AlCase } {
  const h = hypothesesOf(f);
  const missing = (Object.keys(h) as HypothesisId[]).filter((k) => !h[k]);
  const applies = missing.length === 0;
  return { applies, missing, verdict: applies ? 'garantie' : f.strong ? 'non-garantie' : 'fausse' };
}

export const CASE_LABEL: Record<AlCase, string> = {
  garantie: 'Conclusion garantie par le théorème',
  fausse: 'Théorème non applicable — conclusion fausse ici',
  'non-garantie': 'Théorème non applicable — conclusion vraie ici, mais non garantie',
};

/** Pour une hypothèse retirée : le contre-exemple (conclusion fausse) et l'exemple (vraie, non garantie). */
export function pairFor(h: HypothesisId): { fausse: CompactnessFamily; nonGarantie: CompactnessFamily } {
  const only = (f: CompactnessFamily) => {
    const c = classify(f);
    return c.missing.length === 1 && c.missing[0] === h;
  };
  return {
    fausse: AL_FAMILIES.find((f) => only(f) && !f.strong)!,
    nonGarantie: AL_FAMILIES.find((f) => only(f) && f.strong)!,
  };
}

// ───────────── Quantités numériques (étiquetées comme telles) ─────────────

/** ‖uₙ(t)‖²_{L²(Ω)} par la règle de Simpson (m intervalles pairs) sur le domaine d'espace. */
export function spatialNormSq(f: CompactnessFamily, n: number, t: number, m = 400): number {
  const [a, b] = f.xRange;
  const h = (b - a) / m;
  let s = 0;
  for (let i = 0; i <= m; i++) {
    const w = i === 0 || i === m ? 1 : i % 2 === 1 ? 4 : 2;
    s += w * f.u(n, t, a + i * h) ** 2;
  }
  return (s * h) / 3;
}

/**
 * Translation en temps : ‖uₙ(· + τ) − uₙ‖²_{L²(0,T−τ;L²(Ω))}, quadrature de Simpson en t et x.
 * Le critère de compacité en temps (Simon) demande que cette quantité tende vers 0 avec τ,
 * uniformément en n.
 */
export function timeTranslationSq(f: CompactnessFamily, n: number, tau: number, mt = 120, mx = 80): number {
  const [t0, t1] = f.tRange;
  const T = t1 - t0 - tau;
  if (T <= 0) return 0;
  const [a, b] = f.xRange;
  const ht = T / mt;
  const hx = (b - a) / mx;
  let s = 0;
  for (let i = 0; i <= mt; i++) {
    const wt = i === 0 || i === mt ? 1 : i % 2 === 1 ? 4 : 2;
    const t = t0 + i * ht;
    let inner = 0;
    for (let j = 0; j <= mx; j++) {
      const wx = j === 0 || j === mx ? 1 : j % 2 === 1 ? 4 : 2;
      const x = a + j * hx;
      inner += wx * (f.u(n, t + tau, x) - f.u(n, t, x)) ** 2;
    }
    s += wt * ((inner * hx) / 3);
  }
  return (s * ht) / 3;
}
