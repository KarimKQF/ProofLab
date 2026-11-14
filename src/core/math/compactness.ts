/**
 * Familles du laboratoire D (Rellich, Aubin–Lions). Ω = ]0,1[ et T = 2π, sauf mention.
 * Avec φ_k = √2 sin(kπx) : ‖φ_k‖²_{L²} = 1, ‖φ_k‖²_{H¹₀} = (kπ)², ‖φ_k‖²_{H⁻¹} = 1/(kπ)²,
 * où H¹₀ est muni de ‖∂ₓ·‖_{L²} et H⁻¹ de la norme duale.
 * Toutes les normes ci-dessous sont des formes fermées vérifiées dans les tests.
 */

export type BoundStatus = { holds: boolean; formula: string; value: (n: number) => number };

export interface CompactnessFamily {
  id: string;
  label: string;
  note: string;
  /** Espace de travail effectif (toutes les familles ne sont pas spatio-temporelles). */
  setting: string;
  /** Domaine d'affichage : t en abscisse, x en ordonnée. */
  xRange: [number, number];
  tRange: [number, number];
  u: (n: number, t: number, x: number) => number;
  /** sup_n ‖uₙ‖² dans L²(0,T ; H¹₀) (ou H¹(ℝ) pour la translation). */
  spatial: BoundStatus;
  /** sup_n ‖∂ₜuₙ‖² dans L²(0,T ; H⁻¹). */
  temporal: BoundStatus;
  /** ‖uₙ‖² dans L²(0,T ; L²), qui décide la convergence forte vers 0. */
  normL2L2: (n: number) => number;
  /** L'injection spatiale utilisée est-elle compacte ? */
  compactEmbedding: boolean;
  strong: boolean;
  /** Démonstration de la conclusion, ou de son échec. */
  proof: string;
  missing: 'spatial' | 'temporal' | 'compacite' | null;
}

const PI = Math.PI;
const T = 2 * PI;
const phi1 = (x: number) => Math.SQRT2 * Math.sin(PI * x);
const hat = (y: number) => Math.max(0, 1 - Math.abs(y));

export const COMPACTNESS_FAMILIES: CompactnessFamily[] = [
  {
    id: 'oscillation-espace',
    label: String.raw`u_n(t,x)=\sin(n\pi x)`,
    note: 'Oscillation en espace, sans contrôle du gradient.',
    setting: String.raw`\Omega=]0,1[,\ T=2\pi`,
    xRange: [0, 1],
    tRange: [0, T],
    u: (n, _t, x) => Math.sin(n * PI * x),
    spatial: { holds: false, formula: String.raw`\|u_n\|^2_{L^2(H^1_0)}=T\,\frac{(n\pi)^2}{2}=n^2\pi^3`, value: (n) => n * n * PI ** 3 },
    temporal: { holds: true, formula: String.raw`\partial_t u_n=0`, value: () => 0 },
    normL2L2: () => PI,
    compactEmbedding: true,
    strong: false,
    missing: 'spatial',
    proof: String.raw`$\|u_n\|^2_{L^2(L^2)}=T/2=\pi$ pour tout $n$, et $u_n\rightharpoonup 0$ : aucune sous-suite ne converge fortement. La borne spatiale n'étant pas satisfaite, le théorème ne peut pas être invoqué ; c'est le calcul explicite, non l'échec de l'hypothèse, qui montre qu'ici la conclusion tombe.`,
  },
  {
    id: 'oscillation-temps',
    label: String.raw`u_n(t,x)=\sin(nt)\,\varphi_1(x)`,
    note: 'Oscillation en temps, sans contrôle de la dérivée temporelle.',
    setting: String.raw`\Omega=]0,1[,\ T=2\pi`,
    xRange: [0, 1],
    tRange: [0, T],
    u: (n, t, x) => Math.sin(n * t) * phi1(x),
    spatial: { holds: true, formula: String.raw`\|u_n\|^2_{L^2(H^1_0)}=\pi\cdot\pi^2=\pi^3`, value: () => PI ** 3 },
    temporal: { holds: false, formula: String.raw`\|\partial_t u_n\|^2_{L^2(H^{-1})}=n^2\cdot\pi\cdot\frac1{\pi^2}=\frac{n^2}{\pi}`, value: (n) => (n * n) / PI },
    normL2L2: () => PI,
    compactEmbedding: true,
    strong: false,
    missing: 'temporal',
    proof: String.raw`$\|u_n\|^2_{L^2(L^2)}=\int_0^{2\pi}\sin^2(nt)\,dt=\pi$, alors que $\sin(nt)\rightharpoonup 0$ dans $L^2(0,2\pi)$. La compacité spatiale ne contrôle pas ce qui oscille en temps.`,
  },
  {
    id: 'translation',
    label: String.raw`u_n(x)=\varphi(x-n)\ \text{sur }\mathbb R`,
    note: 'Fonction fixe translatée à l’infini, sur un domaine non borné.',
    setting: String.raw`\Omega=\mathbb R,\ \varphi(y)=\max(0,1-|y|)`,
    xRange: [-1, 13],
    tRange: [0, 1],
    u: (n, _t, x) => hat(x - n),
    spatial: { holds: true, formula: String.raw`\|u_n\|^2_{H^1(\mathbb R)}=\tfrac23+2=\tfrac83`, value: () => 8 / 3 },
    temporal: { holds: true, formula: String.raw`\partial_t u_n=0`, value: () => 0 },
    normL2L2: () => 2 / 3,
    compactEmbedding: false,
    strong: false,
    missing: 'compacite',
    proof: String.raw`Bornée dans $H^1(\mathbb R)$, $u_n\rightharpoonup 0$ dans $L^2(\mathbb R)$ et $\|u_n\|_{L^2}^2=2/3$ : pas de sous-suite fortement convergente. L'injection $H^1(\mathbb R)\hookrightarrow L^2(\mathbb R)$ n'est pas compacte.`,
  },
  {
    id: 'amortie-espace',
    label: String.raw`u_n(t,x)=\tfrac1n\sin(n\pi x)`,
    note: 'Bornée dans H¹₀ ; convergence forte dans L², seulement faible dans H¹₀.',
    setting: String.raw`\Omega=]0,1[,\ T=2\pi`,
    xRange: [0, 1],
    tRange: [0, T],
    u: (n, _t, x) => Math.sin(n * PI * x) / n,
    spatial: { holds: true, formula: String.raw`\|u_n\|^2_{L^2(H^1_0)}=T\,\frac{\pi^2}{2}=\pi^3`, value: () => PI ** 3 },
    temporal: { holds: true, formula: String.raw`\partial_t u_n=0`, value: () => 0 },
    normL2L2: (n) => PI / (n * n),
    compactEmbedding: true,
    strong: true,
    missing: null,
    proof: String.raw`$\|u_n\|^2_{L^2(L^2)}=\pi/n^2\to 0$ : convergence forte dans $L^2(L^2)$. En revanche, $\|u_n\|^2_{L^2(H^1_0)}=\pi^3$ reste constante : la convergence dans $L^2(H^1_0)$ n'est que faible. C'est exactement ce qu'annonce le théorème.`,
  },
  {
    id: 'amortie-temps',
    label: String.raw`u_n(t,x)=\tfrac1n\sin(nt)\,\varphi_1(x)`,
    note: 'La dérivée temporelle reste bornée dans L²(H⁻¹).',
    setting: String.raw`\Omega=]0,1[,\ T=2\pi`,
    xRange: [0, 1],
    tRange: [0, T],
    u: (n, t, x) => (Math.sin(n * t) * phi1(x)) / n,
    spatial: { holds: true, formula: String.raw`\|u_n\|^2_{L^2(H^1_0)}=\frac{\pi^3}{n^2}`, value: (n) => PI ** 3 / (n * n) },
    temporal: { holds: true, formula: String.raw`\|\partial_t u_n\|^2_{L^2(H^{-1})}=\pi\cdot\frac1{\pi^2}=\frac1\pi`, value: () => 1 / PI },
    normL2L2: (n) => PI / (n * n),
    compactEmbedding: true,
    strong: true,
    missing: null,
    proof: String.raw`Les deux bornes valent et l'injection $H^1_0\hookrightarrow L^2$ est compacte : Aubin–Lions s'applique. Directement, $\|u_n\|^2_{L^2(L^2)}=\pi/n^2\to 0$.`,
  },
  {
    id: 'mixte',
    label: String.raw`u_n(t,x)=\tfrac1n\sin(nt)\sin(n\pi x)`,
    note: 'Oscillations croisées : les deux bornes restent vérifiées.',
    setting: String.raw`\Omega=]0,1[,\ T=2\pi`,
    xRange: [0, 1],
    tRange: [0, T],
    u: (n, t, x) => (Math.sin(n * t) * Math.sin(n * PI * x)) / n,
    spatial: { holds: true, formula: String.raw`\|u_n\|^2_{L^2(H^1_0)}=\pi\cdot\frac{(n\pi)^2}{2n^2}=\frac{\pi^3}{2}`, value: () => PI ** 3 / 2 },
    temporal: { holds: true, formula: String.raw`\|\partial_t u_n\|^2_{L^2(H^{-1})}=\pi\cdot\frac1{2(n\pi)^2}=\frac1{2n^2\pi}`, value: (n) => 1 / (2 * n * n * PI) },
    normL2L2: (n) => PI / (2 * n * n),
    compactEmbedding: true,
    strong: true,
    missing: null,
    proof: String.raw`Les deux bornes valent et l'injection est compacte. Directement, $\|u_n\|^2_{L^2(L^2)}=\pi/(2n^2)\to 0$.`,
  },
];
