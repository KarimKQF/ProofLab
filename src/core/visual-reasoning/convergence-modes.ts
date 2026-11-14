/**
 * Modes de convergence sur ]0,1[ : presque partout, en mesure, forte dans L², faible dans L².
 * Chaque verdict est justifié analytiquement (champ `why`) ; chaque quantité affichée
 * (norme, mesure de {|uₙ − u| > ε}, intégrale contre g = 1) est une formule fermée.
 * Les courbes illustrent ; aucune n'est une preuve.
 */
export type ModeId = 'pp' | 'mesure' | 'forte' | 'faible';

export const MODE_LABEL: Record<ModeId, string> = {
  pp: 'presque partout',
  mesure: 'en mesure',
  forte: 'forte dans L²',
  faible: 'faible dans L²',
};

export interface ModeVerdict {
  holds: boolean;
  why: string;
}

export interface ModeExample {
  id: string;
  label: string;
  /** Limite candidate (LaTeX) : limite presque partout ou faible quand elle existe. */
  candidate: string;
  candidateFn: (x: number) => number;
  evaluate: (n: number, x: number) => number;
  /** ‖uₙ − u‖²_{L²(0,1)}, u la limite candidate. */
  distSq: (n: number) => number;
  /** μ{x ∈ ]0,1[ : |uₙ(x) − u(x)| > ε}. */
  measureAbove: (n: number, eps: number) => number;
  /** ∫₀¹ uₙ, intégrale contre la fonction test g = 1. */
  pairing: (n: number) => number;
  /** Valeur maximale de |uₙ| sur ]0,1[ (pour l'échelle des figures). */
  sup: (n: number) => number;
  modes: Record<ModeId, ModeVerdict>;
  /** Remarque (sous-suite, contre-exemple célèbre…). */
  remark?: string;
}

const PI = Math.PI;
const sgn = (n: number) => (n % 2 === 0 ? 1 : -1);

/** n = 2ᵏ + j, 0 ≤ j < 2ᵏ (suite « machine à écrire »). */
export function typewriterIndex(n: number): { k: number; j: number } {
  const k = Math.floor(Math.log2(n));
  return { k, j: n - 2 ** k };
}

export const MODE_EXAMPLES: ModeExample[] = [
  {
    id: 'sin',
    label: String.raw`u_n(x)=\sin(n\pi x)`,
    candidate: '0',
    candidateFn: () => 0,
    evaluate: (n, x) => Math.sin(n * PI * x),
    distSq: () => 1 / 2,
    measureAbove: (_n, eps) => (eps >= 1 ? 0 : 1 - (2 / PI) * Math.asin(Math.max(0, eps))),
    pairing: (n) => (1 - sgn(n)) / (n * PI),
    sup: () => 1,
    modes: {
      pp: {
        holds: false,
        why: String.raw`Pour $x\in]0,1[$, si $\sin(n\pi x)\to\ell$, alors $\sin((n+2)\pi x)-\sin(n\pi x)=2\cos((n+1)\pi x)\sin(\pi x)\to0$ donne $\cos(n\pi x)\to0$, donc $\ell^2=1$ ; mais $\sin(2n\pi x)=2\sin(n\pi x)\cos(n\pi x)\to0$ est une sous-suite, donc $\ell=0$. Contradiction : aucune limite ponctuelle.`,
      },
      mesure: { holds: false, why: String.raw`$\mu\{|\sin(n\pi x)|>\varepsilon\}=1-\tfrac2\pi\arcsin\varepsilon$ pour tout $n$ (chaque demi-période a la même répartition) : vaut $\tfrac23$ pour $\varepsilon=\tfrac12$, ne tend pas vers $0$.` },
      forte: { holds: false, why: String.raw`$\|u_n\|^2=\tfrac12$ pour tout $n$ ; la seule limite forte possible serait la limite faible $0$.` },
      faible: { holds: true, why: String.raw`Contre $g=\sin(k\pi x)$, l'intégrale est nulle dès que $n\neq k$ ; ces fonctions engendrent un sous-espace dense de $L^2$ et la suite est bornée : $u_n\rightharpoonup0$.` },
    },
  },
  {
    id: 'pic',
    label: String.raw`u_n=\sqrt n\,\mathbb 1_{]0,1/n[}`,
    candidate: '0',
    candidateFn: () => 0,
    evaluate: (n, x) => (x > 0 && x < 1 / n ? Math.sqrt(n) : 0),
    distSq: () => 1,
    measureAbove: (n, eps) => (Math.sqrt(n) > eps ? 1 / n : 0),
    pairing: (n) => 1 / Math.sqrt(n),
    sup: (n) => Math.sqrt(n),
    modes: {
      pp: { holds: true, why: String.raw`Pour $x>0$, $u_n(x)=0$ dès que $n>1/x$.` },
      mesure: { holds: true, why: String.raw`$\mu\{|u_n|>\varepsilon\}\le\tfrac1n\to0$.` },
      forte: { holds: false, why: String.raw`$\|u_n\|^2=n\cdot\tfrac1n=1$ pour tout $n$.` },
      faible: { holds: true, why: String.raw`Suite bornée, et pour $g\in L^2$ : $|\int u_ng|\le\sqrt n\int_0^{1/n}|g|\le\big(\int_0^{1/n}g^2\big)^{1/2}\to0$ (Cauchy–Schwarz).` },
    },
  },
  {
    id: 'pic-n',
    label: String.raw`u_n=n\,\mathbb 1_{]0,1/n[}`,
    candidate: '0',
    candidateFn: () => 0,
    evaluate: (n, x) => (x > 0 && x < 1 / n ? n : 0),
    distSq: (n) => n,
    measureAbove: (n, eps) => (n > eps ? 1 / n : 0),
    pairing: () => 1,
    sup: (n) => n,
    modes: {
      pp: { holds: true, why: String.raw`Pour $x>0$, $u_n(x)=0$ dès que $n>1/x$.` },
      mesure: { holds: true, why: String.raw`$\mu\{|u_n|>\varepsilon\}\le\tfrac1n\to0$ : convergence en mesure sans convergence dans $L^2$.` },
      forte: { holds: false, why: String.raw`$\|u_n\|^2=n\to\infty$.` },
      faible: { holds: false, why: String.raw`Une suite faiblement convergente est bornée (Banach–Steinhaus) ; or $\|u_n\|=\sqrt n\to\infty$. D'ailleurs $\int u_n\cdot1=1$ ne tend pas vers $\int0=0$.` },
    },
  },
  {
    id: 'machine',
    label: String.raw`u_n=\mathbb 1_{[j2^{-k},(j+1)2^{-k}]},\ n=2^k+j`,
    candidate: '0',
    candidateFn: () => 0,
    evaluate: (n, x) => {
      const { k, j } = typewriterIndex(n);
      return x >= j / 2 ** k && x <= (j + 1) / 2 ** k ? 1 : 0;
    },
    distSq: (n) => 2 ** -typewriterIndex(n).k,
    measureAbove: (n, eps) => (eps < 1 ? 2 ** -typewriterIndex(n).k : 0),
    pairing: (n) => 2 ** -typewriterIndex(n).k,
    sup: () => 1,
    modes: {
      pp: { holds: false, why: String.raw`Pour tout $x\in[0,1]$ et tout $k$, il existe $j$ avec $x\in[j2^{-k},(j+1)2^{-k}]$ : $u_n(x)=1$ pour une infinité de $n$, et $u_n(x)=0$ pour une infinité d'autres. Aucun point de convergence.` },
      mesure: { holds: true, why: String.raw`$\mu\{|u_n|>\varepsilon\}=2^{-k}\to0$.` },
      forte: { holds: true, why: String.raw`$\|u_n\|^2=2^{-k}\to0$ : convergence forte sans convergence presque partout.` },
      faible: { holds: true, why: 'La convergence forte entraîne la convergence faible.' },
    },
    remark: String.raw`La sous-suite $u_{2^k}=\mathbb 1_{[0,2^{-k}]}$ converge vers $0$ en tout $x>0$ : de toute suite convergente dans $L^2$, on peut extraire une sous-suite convergente presque partout.`,
  },
  {
    id: 'alterne',
    label: String.raw`u_n=(-1)^n`,
    candidate: String.raw`\text{aucune}`,
    candidateFn: () => 0,
    evaluate: (n) => sgn(n),
    distSq: () => 1,
    measureAbove: (_n, eps) => (eps < 1 ? 1 : 0),
    pairing: (n) => sgn(n),
    sup: () => 1,
    modes: {
      pp: { holds: false, why: String.raw`$u_n(x)$ vaut alternativement $1$ et $-1$ en chaque point.` },
      mesure: { holds: false, why: String.raw`$|u_{n+1}-u_n|=2$ partout : la suite n'est pas de Cauchy en mesure.` },
      forte: { holds: false, why: String.raw`$\|u_{n+1}-u_n\|=2$ : pas de Cauchy dans $L^2$.` },
      faible: { holds: false, why: String.raw`$\int u_n\cdot1=(-1)^n$ n'a pas de limite.` },
    },
  },
  {
    id: 'perturbation',
    label: String.raw`u_n=1+\tfrac1n\sin(n\pi x)`,
    candidate: '1',
    candidateFn: () => 1,
    evaluate: (n, x) => 1 + Math.sin(n * PI * x) / n,
    distSq: (n) => 1 / (2 * n * n),
    measureAbove: (n, eps) => (n * eps >= 1 ? 0 : 1 - (2 / PI) * Math.asin(Math.max(0, n * eps))),
    pairing: (n) => 1 + (1 - sgn(n)) / (n * n * PI),
    sup: (n) => 1 + 1 / n,
    modes: {
      pp: { holds: true, why: String.raw`$|u_n(x)-1|\le\tfrac1n$ pour tout $x$ : convergence uniforme.` },
      mesure: { holds: true, why: String.raw`$\{|u_n-1|>\varepsilon\}=\emptyset$ dès que $n\varepsilon\ge1$.` },
      forte: { holds: true, why: String.raw`$\|u_n-1\|^2=\tfrac1{2n^2}\to0$.` },
      faible: { holds: true, why: 'La convergence forte entraîne la convergence faible.' },
    },
  },
];

/** u_n(x, y) = sin(nπx) sin(nπy) sur ]0,1[² : ‖u_n‖² = 1/4, u_n ⇀ 0, pas de convergence forte. */
export const sinSin = (n: number) => (x: number, y: number) => Math.sin(n * PI * x) * Math.sin(n * PI * y);
export const SIN_SIN_NORM_SQ = 1 / 4;
