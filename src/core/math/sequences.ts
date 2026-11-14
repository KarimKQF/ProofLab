/**
 * Suites de fonctions du laboratoire C. Toute affirmation de convergence affichée au
 * joueur s'appuie sur un calcul analytique reproduit dans ce fichier ou sur une preuve
 * écrite ; les courbes illustrent, elles ne démontrent rien.
 *
 * Espace : L²(]0,1[), sauf `translation` (L²(ℝ)).
 */
export interface Pairing {
  id: string;
  label: string;
  /** Valeur exacte de ∫ uₙ g ; NaN pour les indices n où la formule fermée n'est pas fournie. */
  value: (n: number) => number;
}

export interface SequenceExample {
  id: string;
  label: string;
  domain: [number, number];
  space: string;
  evaluate: (n: number, x: number) => number;
  /** ‖uₙ‖² en forme fermée. */
  normSq: (n: number) => number;
  /** Limite faible annoncée, en LaTeX. */
  weakLimit: string;
  /** Vraie si la suite converge fortement vers sa limite faible. */
  strong: boolean;
  /** ‖uₙ − u‖² en forme fermée, où u est la limite faible. */
  distanceToLimitSq: (n: number) => number;
  pairings: Pairing[];
  weakProof: string;
  strongProof: string;
}

const PI = Math.PI;
const sign = (n: number): number => (n % 2 === 0 ? 1 : -1);

export const SEQUENCE_EXAMPLES: SequenceExample[] = [
  {
    id: 'sin',
    label: String.raw`u_n(x)=\sin(n\pi x)`,
    domain: [0, 1],
    space: String.raw`L^2(]0,1[)`,
    evaluate: (n, x) => Math.sin(n * PI * x),
    normSq: () => 1 / 2,
    weakLimit: '0',
    strong: false,
    distanceToLimitSq: () => 1 / 2,
    pairings: [
      { id: 'un', label: String.raw`g=1`, value: (n) => (1 - sign(n)) / (n * PI) },
      { id: 'x', label: String.raw`g=x`, value: (n) => -sign(n) / (n * PI) },
      { id: 'sin1', label: String.raw`g=\sin(\pi x)`, value: (n) => (n === 1 ? 1 / 2 : 0) },
    ],
    weakProof: String.raw`Par densité des polynômes trigonométriques dans $L^2$, il suffit de tester contre $\sin(k\pi x)$ : l'orthogonalité donne une intégrale nulle dès que $n>k$. La suite étant bornée, cela donne $u_n\rightharpoonup 0$.`,
    strongProof: String.raw`$\|u_n\|^2=1/2$ pour tout $n$ : la suite ne tend pas vers $0$ en norme, et $0$ est sa seule limite faible possible.`,
  },
  {
    id: 'pic',
    label: String.raw`u_n=\sqrt n\,\mathbb 1_{]0,1/n[}`,
    domain: [0, 1],
    space: String.raw`L^2(]0,1[)`,
    evaluate: (n, x) => (x > 0 && x < 1 / n ? Math.sqrt(n) : 0),
    normSq: () => 1,
    weakLimit: '0',
    strong: false,
    distanceToLimitSq: () => 1,
    pairings: [
      { id: 'un', label: String.raw`g=1`, value: (n) => 1 / Math.sqrt(n) },
      { id: 'x', label: String.raw`g=x`, value: (n) => 1 / (2 * n ** 1.5) },
      { id: 'sin1', label: String.raw`g=\sin(\pi x)`, value: (n) => (Math.sqrt(n) * (1 - Math.cos(PI / n))) / PI },
    ],
    weakProof: String.raw`Pour $g\in L^2$, Cauchy–Schwarz donne $|\int u_n g|\le\|g\|_{L^2(]0,1/n[)}$, qui tend vers $0$ par convergence dominée.`,
    strongProof: String.raw`$\|u_n\|^2=1$ pour tout $n$ : la limite faible $0$ n'est pas limite forte.`,
  },
  {
    id: 'puissance',
    label: String.raw`u_n(x)=x^n`,
    domain: [0, 1],
    space: String.raw`L^2(]0,1[)`,
    evaluate: (n, x) => x ** n,
    normSq: (n) => 1 / (2 * n + 1),
    weakLimit: '0',
    strong: true,
    distanceToLimitSq: (n) => 1 / (2 * n + 1),
    pairings: [
      { id: 'un', label: String.raw`g=1`, value: (n) => 1 / (n + 1) },
      { id: 'x', label: String.raw`g=x`, value: (n) => 1 / (n + 2) },
    ],
    weakProof: String.raw`La convergence forte entraîne la convergence faible.`,
    strongProof: String.raw`$\|u_n\|^2=\frac1{2n+1}\to 0$. La convergence n'est pas uniforme : $\sup_{]0,1[}|x^n|=1$ pour tout $n$.`,
  },
  {
    id: 'carre-sin',
    label: String.raw`v_n(x)=\sin^2(n\pi x)`,
    domain: [0, 1],
    space: String.raw`L^2(]0,1[)`,
    evaluate: (n, x) => Math.sin(n * PI * x) ** 2,
    normSq: () => 3 / 8,
    weakLimit: String.raw`\tfrac12`,
    strong: false,
    distanceToLimitSq: () => 1 / 8,
    pairings: [
      { id: 'un', label: String.raw`g=1`, value: () => 1 / 2 },
      { id: 'x', label: String.raw`g=x`, value: () => 1 / 4 },
      {
        id: 'sin1',
        label: String.raw`g=\sin(\pi x)`,
        value: (n) => 1 / PI - (1 / ((2 * n + 1) * PI) - 1 / ((2 * n - 1) * PI)) / 2,
      },
    ],
    weakProof: String.raw`$v_n=\frac12-\frac12\cos(2n\pi x)$, et $\cos(2n\pi x)\rightharpoonup 0$ par Riemann–Lebesgue. C'est le phénomène clé : $u_n=\sin(n\pi x)\rightharpoonup 0$, mais $u_n^2\rightharpoonup \tfrac12\ne 0^2$.`,
    strongProof: String.raw`$\|v_n-\tfrac12\|^2=\tfrac14\|\cos(2n\pi x)\|^2=\tfrac18$ pour tout $n$.`,
  },
  {
    id: 'perturbation',
    label: String.raw`u_n(x)=1+\tfrac1n\sin(n\pi x)`,
    domain: [0, 1],
    space: String.raw`L^2(]0,1[)`,
    evaluate: (n, x) => 1 + Math.sin(n * PI * x) / n,
    normSq: (n) => 1 + (2 * (1 - sign(n))) / (n * n * PI) + 1 / (2 * n * n),
    weakLimit: '1',
    strong: true,
    distanceToLimitSq: (n) => 1 / (2 * n * n),
    pairings: [
      { id: 'un', label: String.raw`g=1`, value: (n) => 1 + (1 - sign(n)) / (n * n * PI) },
      { id: 'x', label: String.raw`g=x`, value: (n) => 1 / 2 - sign(n) / (n * n * PI) },
    ],
    weakProof: String.raw`La convergence forte entraîne la convergence faible.`,
    strongProof: String.raw`$\|u_n-1\|^2=\frac1{2n^2}\to 0$.`,
  },
  {
    id: 'translation',
    label: String.raw`u_n(x)=\varphi(x-n),\ \varphi(y)=\max(0,1-|y|)`,
    domain: [-1, 13],
    space: String.raw`L^2(\mathbb R)`,
    evaluate: (n, x) => Math.max(0, 1 - Math.abs(x - n)),
    normSq: () => 2 / 3,
    weakLimit: '0',
    strong: false,
    distanceToLimitSq: () => 2 / 3,
    pairings: [{ id: 'bloc', label: String.raw`g=\mathbb 1_{[0,1]}`, value: (n) => (n >= 2 ? 0 : n === 1 ? 1 / 2 : Number.NaN) }],
    weakProof: String.raw`Pour $g\in L^2(\mathbb R)$ à support compact, le support de $u_n$ finit par être disjoint de celui de $g$ ; le cas général suit par densité, la suite étant bornée.`,
    strongProof: String.raw`$\|u_n\|^2=2/3$ pour tout $n$ : aucune convergence forte vers $0$. Cette suite est bornée dans $H^1(\mathbb R)$ : elle montre que l'injection $H^1(\mathbb R)\hookrightarrow L^2(\mathbb R)$ n'est pas compacte.`,
  },
];
