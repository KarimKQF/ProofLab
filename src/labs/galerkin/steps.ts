/**
 * Laboratoire E : les dix étapes de la méthode de Galerkin pour le problème
 * parabolique de Dirichlet ∂ₜu − ∂ₓₓu = f sur ]0,T[ × ]0,1[.
 *
 * Chaque étape est un graphe de preuve compact (six nœuds au plus) : au moins un
 * piège réel et une justification séduisante mais fausse. Le but de l'étape k porte
 * la clé « etape-k », qui ouvre l'étape suivante et déverrouille une visualisation.
 *
 * L'estimation a priori est énoncée sous sa forme correcte, pour chaque t : la forme
 * du polycopié (sup et intégrale sur [0,T] sans facteur 2) est fausse telle quelle.
 */
import { t } from '@/content/authoring';
import type { ProofSpec } from '@/content/schema';

export interface GalerkinStep {
  /** Numéro de l'étape, de 1 à 10. */
  n: number;
  /** Clé de déverrouillage portée par le but de la preuve. */
  key: string;
  title: string;
  /** Ce qu'il faut démontrer (texte mixte). */
  claim: string;
  /** Visualisation déverrouillée (texte mixte). */
  vizTitle: string;
  spec: ProofSpec;
}

/* ───────────── 1. Formulation faible ───────────── */

const ETAPE_1: ProofSpec = {
  purpose: 'demonstration',
  goal: 'fin',
  nodes: [
    { id: 'h-sol', kind: 'hypothese', text: t`$u\in C^1\big([0,T];C^2([0,1])\big)$ et $f$ continue vérifient $\partial_tu-\partial_{xx}u=f$ sur $]0,T[\times]0,1[$, avec $u(t,0)=u(t,1)=0$.` },
    { id: 'd-v', kind: 'definition', local: true, text: t`Soient $t\in]0,T[$ et $v\in V=H^1_0(]0,1[)$ ; en particulier $v(0)=v(1)=0$.` },
    { id: 'e-mult', kind: 'egalite', text: t`$\int_0^1\partial_tu(t)\,v\,dx-\int_0^1\partial_{xx}u(t)\,v\,dx=\int_0^1f(t)\,v\,dx$.` },
    { id: 'e-ipp', kind: 'egalite', text: t`$-\int_0^1\partial_{xx}u(t)\,v\,dx=\int_0^1\partial_xu(t)\,v'\,dx$.` },
    { id: 'fin', kind: 'conclusion', unlocks: ['etape-1'], text: t`Pour tout $v\in V$ et tout $t\in]0,T[$ : $\langle\partial_tu(t),v\rangle_{V',V}+\int_0^1\partial_xu(t)\,v'\,dx=\langle f(t),v\rangle_{V',V}$.` },
    { id: 'x-signe', kind: 'egalite', distractor: true, text: t`$-\int_0^1\partial_{xx}u(t)\,v\,dx=-\int_0^1\partial_xu(t)\,v'\,dx$.` },
  ],
  justifications: [
    { id: 'j-mult', label: t`Multiplier l'équation par $v$ et intégrer sur $]0,1[$ : chaque terme est intégrable.` },
    { id: 'j-ipp', label: t`Intégration par parties sur $[0,1]$ ; le terme de bord $\big[\partial_xu(t)\,v\big]_0^1$ est nul car $v(0)=v(1)=0$.` },
    { id: 'j-dual', label: t`Pour $h\in H$ et $v\in V$, $\langle h,v\rangle_{V',V}=(h,v)_H$ : les intégrales contre $v$ sont des crochets de dualité.` },
    { id: 'j-bord-u', label: t`Intégration par parties ; le terme de bord est nul car $u(t,0)=u(t,1)=0$.` },
  ],
  rules: [
    { from: ['h-sol', 'd-v'], to: 'e-mult', by: 'j-mult' },
    { from: ['h-sol', 'd-v'], to: 'e-ipp', by: 'j-ipp' },
    { from: ['e-mult', 'e-ipp'], to: 'fin', by: 'j-dual' },
  ],
  traps: [
    {
      conclusion: 'e-ipp',
      by: 'j-bord-u',
      verdict: 'incorrect',
      concept: 'hypotheses-theoreme',
      message: t`Le terme de bord est $\big[\partial_xu(t)\,v\big]_0^1$ : il fait intervenir $\partial_xu$, qui ne s'annule pas au bord en général. C'est la condition $v(0)=v(1)=0$, imposée par le choix de $V$, qui l'annule.`,
      counterexample: t`$u=\sin(\pi x)$ s'annule en $0$ et en $1$ ; pour $v=1$, le terme de bord vaut $\big[\pi\cos(\pi x)\big]_0^1=-2\pi\neq0$.`,
    },
    {
      conclusion: 'x-signe',
      verdict: 'incorrect',
      concept: 'calcul-exact',
      message: t`Erreur de signe : l'intégration par parties donne $-\int_0^1w''v=\int_0^1w'v'-\big[w'v\big]_0^1$.`,
      counterexample: t`Pour $u=v=\varphi_1$ : $-\int_0^1\varphi_1''\varphi_1=\pi^2$, alors que $-\int_0^1\varphi_1'\varphi_1'=-\pi^2$.`,
    },
  ],
  removable: [
    {
      hypothesis: 'd-v',
      label: t`Prendre $v\in H^1(]0,1[)$ sans condition au bord`,
      necessary: true,
      explanation: t`Le terme de bord ne disparaît plus : l'identité n'est plus une conséquence de l'équation.`,
      counterexample: t`$u=\sin(\pi x)$, indépendante de $t$, résout le problème avec $f=\pi^2\sin(\pi x)$. Pour $v=1$ : $\int_0^1\partial_tu\,v+\int_0^1\partial_xu\,v'=0$, alors que $\int_0^1f\,v=2\pi$.`,
    },
  ],
};

/* ───────────── 2. Espaces ───────────── */

const ETAPE_2: ProofSpec = {
  purpose: 'demonstration',
  goal: 'fin',
  nodes: [
    { id: 'h-hilb', kind: 'hypothese', text: t`$V=H^1_0(]0,1[)$, muni de $(u,v)_V=\int_0^1u'v'$, et $H=L^2(]0,1[)$ sont des espaces de Hilbert ; $H$ est identifié à son dual par Riesz.` },
    { id: 'h-poinc', kind: 'hypothese', text: t`Inégalité de Poincaré : $\|v\|_H\le\pi^{-1}\|v\|_V$ pour tout $v\in V$.` },
    { id: 'h-dense', kind: 'hypothese', text: t`$V$ est dense dans $H$.` },
    { id: 'i-HV', kind: 'inclusion', text: t`$h\mapsto(h,\cdot)_H$ est une injection continue de $H$ dans $V'$, de norme au plus $\pi^{-1}$.` },
    { id: 'fin', kind: 'conclusion', unlocks: ['etape-2'], text: t`$V\hookrightarrow H\hookrightarrow V'$, injections continues, et $\langle h,v\rangle_{V',V}=(h,v)_H$ pour tous $h\in H$, $v\in V$.` },
    { id: 'x-tout', kind: 'consequence', distractor: true, text: t`On peut en outre identifier $V$ à $V'$ par Riesz, de sorte que $V=H=V'$.` },
  ],
  justifications: [
    { id: 'j-HV', label: t`Continuité : $|(h,v)_H|\le\|h\|_H\|v\|_H\le\pi^{-1}\|h\|_H\|v\|_V$. Injectivité : si $(h,v)_H=0$ pour tout $v\in V$, alors $h=0$ par densité.` },
    { id: 'j-triplet', label: t`Composition des deux injections ; on identifie $h\in H$ à la forme $(h,\cdot)_H$ restreinte à $V$.` },
    { id: 'j-riesz-H', label: t`Riesz dans $H$ : une forme nulle est représentée par le vecteur nul.`, theorem: 'riesz' },
  ],
  rules: [
    { from: ['h-hilb', 'h-poinc', 'h-dense'], to: 'i-HV', by: 'j-HV' },
    { from: ['h-poinc', 'i-HV'], to: 'fin', by: 'j-triplet' },
  ],
  traps: [
    {
      conclusion: 'i-HV',
      by: 'j-riesz-H',
      verdict: 'incorrect',
      concept: 'densite-fermeture',
      message: t`La forme $(h,\cdot)_H$ n'est testée que sur $V$, pas sur $H$ tout entier : Riesz dans $H$ ne s'applique pas tel quel. Ce qui donne $h=0$, c'est la densité de $V$ dans $H$.`,
      counterexample: t`Si l'on ne testait que sur $\mathrm{Vect}(\varphi_1)$, non dense, $h=\varphi_2\neq0$ vérifierait $(h,v)_H=0$ pour tout $v$ de ce sous-espace.`,
    },
    {
      conclusion: 'x-tout',
      verdict: 'incorrect',
      concept: 'dual-identification',
      message: t`Une seule identification est permise, celle de $H$ à son dual : c'est elle qui définit l'injection $H\hookrightarrow V'$. L'isomorphisme de Riesz de $V$ sur $V'$ est alors $-\partial_{xx}$, et non l'identité.`,
      counterexample: t`$(\varphi_1,v)_V=\pi^2(\varphi_1,v)_H$ pour tout $v\in V$ : l'isomorphisme de Riesz de $V$ envoie $\varphi_1$ sur $\pi^2\varphi_1\neq\varphi_1$.`,
    },
  ],
  removable: [
    {
      hypothesis: 'h-dense',
      label: t`Ne plus disposer de la densité de $V$ dans $H$`,
      necessary: true,
      explanation: t`L'application $h\mapsto(h,\cdot)_H$ cesse d'être injective : $H$ ne s'identifie plus à une partie de $V'$.`,
      counterexample: t`Avec $\mathrm{Vect}(\varphi_1)$ à la place de $V$ : $h=\varphi_2\neq0$ et $(h,v)_H=0$ pour tout $v\in\mathrm{Vect}(\varphi_1)$.`,
    },
  ],
};

/* ───────────── 3. Système de Galerkin ───────────── */

const ETAPE_3: ProofSpec = {
  purpose: 'demonstration',
  goal: 'fin',
  nodes: [
    { id: 'd-gal', kind: 'definition', text: t`$V_n=\mathrm{Vect}(\varphi_1,\dots,\varphi_n)$. On cherche $u_n=\sum_{k=1}^nc_k(t)\varphi_k$ tel que $(u_n',v)_H+(u_n,v)_V=\langle f,v\rangle_{V',V}$ pour tout $v\in V_n$, p.p. sur $]0,T[$, et $u_n(0)=P_nu_0$.` },
    { id: 'h-phi', kind: 'hypothese', text: t`$(\varphi_k)_{k\ge1}$ est une base hilbertienne de $H$, $\varphi_k\in V$ et $-\varphi_k''=\lambda_k\varphi_k$, avec $\lambda_k=(k\pi)^2$.` },
    {
      id: 'e-V',
      kind: 'egalite',
      text: t`$(\varphi_j,\varphi_k)_V=\lambda_j\delta_{jk}$.`,
      masked: t`$(\varphi_j,\varphi_k)_V$ : à calculer, en commençant par $\|\varphi_2\|_V^2$.`,
      check: { kind: 'rational', prompt: t`Valeur exacte de $\|\varphi_2\|_V^2/\pi^2$`, expected: '4' },
    },
    { id: 'e-sys', kind: 'egalite', text: t`Pour $1\le j\le n$ : $c_j'+\lambda_jc_j=f_j$ p.p., avec $f_j=\langle f,\varphi_j\rangle_{V',V}$, et $c_j(0)=b_j=(u_0,\varphi_j)_H$.` },
    { id: 'fin', kind: 'conclusion', unlocks: ['etape-3'], text: t`$u_n$ résout le problème approché si et seulement si ses coefficients résolvent le système diagonal $c_j'+\lambda_jc_j=f_j$, $c_j(0)=b_j$, $1\le j\le n$.` },
    { id: 'x-diag', kind: 'consequence', distractor: true, text: t`Dans toute base de $V_n$ orthonormée pour $(\cdot,\cdot)_H$, le système obtenu est diagonal.` },
  ],
  justifications: [
    { id: 'j-ipp-propre', label: t`Intégration par parties (terme de bord nul car $\varphi_j(0)=\varphi_j(1)=0$), puis $-\varphi_k''=\lambda_k\varphi_k$ et l'orthonormalité dans $H$.` },
    { id: 'j-test', label: t`Tester par $v=\varphi_j$, $1\le j\le n$ : $(u_n',\varphi_j)_H=c_j'$ par orthonormalité, et $P_nu_0=\sum_{k\le n}(u_0,\varphi_k)_H\varphi_k$.` },
    { id: 'j-lin', label: t`Réciproquement, l'équation est linéaire en $v$ : il suffit de la vérifier sur la base $(\varphi_j)_{j\le n}$ de $V_n$.` },
    { id: 'j-ortho-H', label: t`Les $\varphi_k$ sont orthonormées dans $H$, donc orthogonales pour $(\cdot,\cdot)_V$.` },
  ],
  rules: [
    { from: ['h-phi'], to: 'e-V', by: 'j-ipp-propre' },
    { from: ['d-gal', 'h-phi', 'e-V'], to: 'e-sys', by: 'j-test' },
    { from: ['e-sys', 'd-gal'], to: 'fin', by: 'j-lin' },
  ],
  traps: [
    {
      conclusion: 'e-V',
      by: 'j-ortho-H',
      verdict: 'incorrect',
      concept: 'hypotheses-theoreme',
      message: t`L'orthogonalité dans $H$ n'entraîne pas l'orthogonalité dans $V$ : c'est la relation $-\varphi_k''=\lambda_k\varphi_k$ qui la donne.`,
      counterexample: t`$w_\pm=(\varphi_1\pm\varphi_2)/\sqrt2$ sont orthonormées dans $H$, et $(w_+,w_-)_V=\tfrac12(\lambda_1-\lambda_2)=-\tfrac32\pi^2\neq0$.`,
    },
    {
      conclusion: 'x-diag',
      verdict: 'incorrect',
      concept: 'hypotheses-theoreme',
      message: t`La matrice de $(\cdot,\cdot)_V$ n'est diagonale que dans une base orthogonale pour $(\cdot,\cdot)_V$ : c'est le cas de la base spectrale, pas d'une base $H$-orthonormée quelconque.`,
      counterexample: t`Dans la base $w_\pm=(\varphi_1\pm\varphi_2)/\sqrt2$ de $V_2$, la matrice de $(\cdot,\cdot)_V$ vaut $\frac{\pi^2}2\begin{pmatrix}5&-3\\-3&5\end{pmatrix}$ : le système est couplé.`,
    },
  ],
  removable: [
    {
      hypothesis: 'e-V',
      label: t`Ne plus disposer de l'orthogonalité des $\varphi_k$ dans $V$`,
      necessary: true,
      explanation: t`Le système reste linéaire mais devient couplé : la résolution mode par mode, et les formules fermées de l'étape suivante, disparaissent.`,
      counterexample: t`Dans la base $w_\pm=(\varphi_1\pm\varphi_2)/\sqrt2$ : $\mathbf c'+\frac{\pi^2}2\begin{pmatrix}5&-3\\-3&5\end{pmatrix}\mathbf c=\mathbf F$.`,
    },
  ],
};

/* ───────────── 4. Existence en dimension finie ───────────── */

const ETAPE_4: ProofSpec = {
  purpose: 'demonstration',
  goal: 'fin',
  nodes: [
    { id: 'h-f', kind: 'hypothese', text: t`$f\in L^2(0,T;V')$ ; donc $f_j=\langle f,\varphi_j\rangle_{V',V}\in L^2(0,T)\subset L^1(0,T)$.` },
    { id: 'd-cj', kind: 'definition', text: t`Une solution est une fonction $c_j$ absolument continue sur $[0,T]$ telle que $c_j'+\lambda_jc_j=f_j$ p.p. et $c_j(0)=b_j$.` },
    { id: 'e-fac', kind: 'egalite', text: t`$c_j$ est solution si et seulement si $g_j=e^{\lambda_jt}c_j$ est absolument continue, avec $g_j'=e^{\lambda_jt}f_j$ p.p. et $g_j(0)=b_j$.` },
    { id: 'e-form', kind: 'egalite', text: t`Toute solution vérifie $c_j(t)=e^{-\lambda_jt}b_j+\int_0^te^{-\lambda_j(t-s)}f_j(s)\,ds$.` },
    { id: 'fin', kind: 'conclusion', unlocks: ['etape-4'], text: t`Le système admet une unique solution sur $[0,T]$ tout entier, donnée par cette formule.` },
    { id: 'x-c1', kind: 'consequence', distractor: true, text: t`La solution $c_j$ est de classe $C^1$ sur $[0,T]$.` },
  ],
  justifications: [
    { id: 'j-facteur', label: t`Multiplier par $e^{\lambda_jt}$ : le produit d'une fonction absolument continue et d'une fonction de classe $C^1$ est absolument continu, et la règle de Leibniz vaut p.p.` },
    { id: 'j-primitive', label: t`Une fonction absolument continue est l'intégrale de sa dérivée : $g_j(t)=g_j(0)+\int_0^tg_j'$.`, theorem: 'theoreme-fondamental' },
    { id: 'j-reciproque', label: t`Réciproquement, pour $f_j\in L^1(0,T)$, $t\mapsto\int_0^te^{\lambda_js}f_j(s)\,ds$ est absolument continue, de dérivée $e^{\lambda_jt}f_j$ p.p. ; le système est linéaire, aucune explosion n'est possible.` },
    { id: 'j-cl', label: t`Théorème de Cauchy–Lipschitz classique : second membre continu, solution de classe $C^1$.`, theorem: 'theoreme-cauchy-lipschitz' },
    { id: 'j-cantor', label: t`Une fonction dérivable presque partout est l'intégrale de sa dérivée.` },
  ],
  rules: [
    { from: ['d-cj'], to: 'e-fac', by: 'j-facteur' },
    { from: ['e-fac', 'h-f'], to: 'e-form', by: 'j-primitive' },
    { from: ['e-form', 'h-f'], to: 'fin', by: 'j-reciproque' },
  ],
  traps: [
    {
      conclusion: 'fin',
      by: 'j-cl',
      verdict: 'incorrect',
      concept: 'hypotheses-theoreme',
      message: t`La version classique suppose le second membre continu en $t$. Ici $f_j$ est seulement dans $L^2(0,T)$ : il faut la version absolument continue, et la solution n'est pas dérivable partout en général.`,
      counterexample: t`Pour $f=t^{-1/4}\varphi_1\in L^2(0,T;V')$, on a $f_1(t)=t^{-1/4}$, qui n'est pas continue en $0$.`,
    },
    {
      conclusion: 'e-form',
      by: 'j-cantor',
      verdict: 'incorrect',
      concept: 'hypotheses-theoreme',
      message: t`Faux sans absolue continuité : une fonction peut être dérivable presque partout, de dérivée nulle, sans être constante.`,
      counterexample: t`L'escalier de Cantor $C$ est continu, dérivable p.p. de dérivée nulle, et $C(1)=1\neq C(0)+\int_0^1C'=0$.`,
    },
    {
      conclusion: 'x-c1',
      verdict: 'incorrect',
      concept: 'hypotheses-theoreme',
      message: t`$c_j'=f_j-\lambda_jc_j$ n'est pas plus régulière que $f_j$, qui est seulement dans $L^2(0,T)$.`,
      counterexample: t`$f_1(t)=t^{-1/4}$ : $c_1'(t)=t^{-1/4}-\lambda_1c_1(t)\to+\infty$ quand $t\to0^+$, car $c_1$ est bornée.`,
    },
  ],
  removable: [
    {
      hypothesis: 'd-cj',
      label: t`Renoncer à l'absolue continuité de $c_j$`,
      necessary: true,
      explanation: t`L'unicité est perdue : une fonction dérivable presque partout n'est pas déterminée par sa dérivée et sa valeur initiale.`,
      counterexample: t`Avec l'escalier de Cantor $C$, $c(t)=e^{-\lambda_jt}C(t/T)$ vérifie $c'+\lambda_jc=0$ p.p. et $c(0)=0$, sans être nulle.`,
    },
  ],
};

/* ───────────── 5. Estimations uniformes ───────────── */

const ETAPE_5: ProofSpec = {
  purpose: 'demonstration',
  goal: 'fin',
  nodes: [
    { id: 'h-gal', kind: 'hypothese', text: t`Pour tout $v\in V_n$ et p.p. $t$ : $(u_n',v)_H+(u_n,v)_V=\langle f,v\rangle_{V',V}$, et $u_n(0)=P_nu_0$.` },
    { id: 'h-spec', kind: 'hypothese', text: t`$P_n$ est la projection orthogonale de $H$ sur $V_n$, et $\|v\|_V^2=\sum_{k\ge1}\lambda_k(v,\varphi_k)_H^2$ pour tout $v\in V$.` },
    { id: 'i-int', kind: 'inegalite', text: t`Pour tout $t\in[0,T]$ : $\|u_n(t)\|_H^2+\int_0^t\|u_n\|_V^2\le\|P_nu_0\|_H^2+\int_0^t\|f\|_{V'}^2$.` },
    { id: 'i-der', kind: 'inegalite', text: t`$\|u_n'(t)\|_{V'}\le\|f(t)\|_{V'}+\|u_n(t)\|_V$ p.p.` },
    { id: 'fin', kind: 'conclusion', unlocks: ['etape-5'], text: t`$(u_n)$ est bornée dans $L^\infty(0,T;H)$ et dans $L^2(0,T;V)$, et $(u_n')$ dans $L^2(0,T;V')$, indépendamment de $n$.` },
    { id: 'x-poly', kind: 'inegalite', distractor: true, text: t`$\sup_{t\in[0,T]}\|u_n(t)\|_H^2+\int_0^T\|u_n\|_V^2\le\|u_0\|_H^2+\|f\|_{L^2(0,T;V')}^2$.` },
  ],
  justifications: [
    { id: 'j-test-un', label: t`Tester par $v=u_n(t)\in V_n$ : $\frac12\frac{d}{dt}\|u_n\|_H^2+\|u_n\|_V^2=\langle f,u_n\rangle\le\frac12\|f\|_{V'}^2+\frac12\|u_n\|_V^2$, puis intégrer sur $[0,t]$.`, theorem: 'young' },
    { id: 'j-Pn', label: t`Pour $v\in V$ : $\langle u_n',v\rangle=(u_n',P_nv)_H$ car $u_n'\in V_n$ ; tester par $P_nv\in V_n$, puis utiliser $\|P_nv\|_V\le\|v\|_V$, qui découle de la formule de $\|\cdot\|_V$.` },
    { id: 'j-unif', label: t`$\|P_nu_0\|_H\le\|u_0\|_H$, les majorants ne dépendent pas de $n$, et $\|u_n'\|_{V'}^2\le2\|f\|_{V'}^2+2\|u_n\|_V^2$.` },
    { id: 'j-Pn-gen', label: t`Toute projection orthogonale de $H$ sur un sous-espace de dimension finie de $V$ vérifie $\|Pv\|_V\le\|v\|_V$.` },
  ],
  rules: [
    { from: ['h-gal'], to: 'i-int', by: 'j-test-un' },
    { from: ['h-gal', 'h-spec'], to: 'i-der', by: 'j-Pn' },
    { from: ['i-int', 'i-der', 'h-spec'], to: 'fin', by: 'j-unif' },
  ],
  traps: [
    {
      conclusion: 'i-der',
      by: 'j-Pn-gen',
      verdict: 'incorrect',
      concept: 'hypotheses-theoreme',
      message: t`C'est le choix spectral qui donne $\|P_nv\|_V\le\|v\|_V$ ; pour une projection orthogonale dans $H$ quelconque, c'est faux.`,
      counterexample: t`$W=\mathrm{Vect}(\varphi_1+\varphi_2)$ et $v=\varphi_1$ : $P_Wv=\tfrac12(\varphi_1+\varphi_2)$ et $\|P_Wv\|_V^2=\tfrac54\pi^2>\pi^2=\|v\|_V^2$.`,
    },
    {
      conclusion: 'x-poly',
      verdict: 'incorrect',
      concept: 'quantificateurs',
      message: t`C'est la forme écrite dans le polycopié, fausse telle quelle : l'estimation vaut pour chaque $t$, et le supremum et l'intégrale ne sont pas atteints au même instant. On obtient seulement la même inégalité avec un facteur $2$ au second membre.`,
      counterexample: t`$f=0$, $u_0=\varphi_1$, $n\ge1$ : $u_n(t)=e^{-\pi^2t}\varphi_1$ ; le membre de gauche vaut $1+\tfrac12(1-e^{-2\pi^2T})>1$, celui de droite vaut $1$.`,
    },
  ],
  removable: [
    {
      hypothesis: 'h-spec',
      label: t`Remplacer la base spectrale par une base quelconque de $V$`,
      necessary: true,
      explanation: t`L'inégalité $\|P_nv\|_V\le\|v\|_V$ peut tomber, et avec elle la borne de $u_n'$ dans $L^2(0,T;V')$, à moins de contrôler $\|P_n\|_{\mathcal L(V)}$ uniformément en $n$.`,
      counterexample: t`Projection orthogonale de $H$ sur $\mathrm{Vect}(\varphi_1+\varphi_2)$ : elle envoie $\varphi_1$ sur $\tfrac12(\varphi_1+\varphi_2)$, de norme $\tfrac{\sqrt5}{2}\pi>\pi=\|\varphi_1\|_V$ dans $V$.`,
    },
  ],
};

/* ───────────── 6. Extraction faible ───────────── */

const ETAPE_6: ProofSpec = {
  purpose: 'demonstration',
  goal: 'fin',
  nodes: [
    { id: 'h-borne', kind: 'hypothese', text: t`$(u_n)$ est bornée dans $L^2(0,T;V)$ et $(u_n')$ est bornée dans $L^2(0,T;V')$.` },
    { id: 'h-refl', kind: 'hypothese', text: t`$L^2(0,T;V)$ et $L^2(0,T;V')$ sont des espaces de Hilbert, donc réflexifs.` },
    { id: 'a-ext', kind: 'application-theoreme', text: t`Il existe une sous-suite, encore notée $(u_n)$, et $u\in L^2(0,T;V)$, $g\in L^2(0,T;V')$, tels que $u_n\rightharpoonup u$ dans $L^2(0,T;V)$ et $u_n'\rightharpoonup g$ dans $L^2(0,T;V')$.` },
    { id: 'e-lim', kind: 'egalite', text: t`Pour tous $v\in V$ et $\eta\in C^\infty_c(]0,T[)$ : $\int_0^T\langle g,v\rangle_{V',V}\,\eta\,dt=-\int_0^T(u,v)_H\,\eta'\,dt$.` },
    { id: 'fin', kind: 'conclusion', unlocks: ['etape-6'], text: t`$u'=g$ au sens des distributions à valeurs dans $V'$ : $u\in L^2(0,T;V)$ et $u'\in L^2(0,T;V')$.` },
    { id: 'x-fort', kind: 'consequence', distractor: true, text: t`Les bornes seules donnent une sous-suite telle que $u_n\to u$ fortement dans $L^2(0,T;V)$.` },
  ],
  justifications: [
    { id: 'j-refl', label: t`Extraction faible dans un espace réflexif, appliquée successivement aux deux suites bornées.`, theorem: 'extraction-reflexive' },
    { id: 'j-ipp-lim', label: t`Pour $n$ fixé, $\int_0^T\langle u_n',v\rangle\eta=-\int_0^T(u_n,v)_H\eta'$ ; à $v$ et $\eta$ fixés, chaque membre est une forme linéaire continue, sur $L^2(0,T;V')$ et sur $L^2(0,T;V)$.` },
    { id: 'j-def-deriv', label: t`Définition de la dérivée au sens des distributions à valeurs dans $V'$.` },
    { id: 'j-bolzano', label: t`Toute suite bornée admet une sous-suite convergente en norme.` },
  ],
  rules: [
    { from: ['h-borne', 'h-refl'], to: 'a-ext', by: 'j-refl' },
    { from: ['a-ext'], to: 'e-lim', by: 'j-ipp-lim' },
    { from: ['e-lim'], to: 'fin', by: 'j-def-deriv' },
  ],
  traps: [
    {
      conclusion: 'a-ext',
      by: 'j-bolzano',
      verdict: 'incorrect',
      concept: 'bornee-non-convergente',
      message: t`C'est vrai en dimension finie seulement. En dimension infinie, la réflexivité ne donne qu'une limite faible.`,
      counterexample: t`$w_n=\varphi_n/\sqrt{\lambda_nT}$, constante en temps, est orthonormée dans $L^2(0,T;V)$ : $\|w_n-w_m\|=\sqrt2$ pour $n\neq m$, aucune sous-suite ne converge en norme.`,
    },
    {
      conclusion: 'x-fort',
      verdict: 'incorrect',
      concept: 'faible-fort',
      message: t`Les bornes et la réflexivité ne donnent qu'une convergence faible. Dans ce problème linéaire à base spectrale, une convergence forte s'obtient par un autre argument, mais elle ne découle pas des bornes.`,
      counterexample: t`$w_n=\varphi_n/\sqrt{\lambda_nT}$ est bornée dans $L^2(0,T;V)$, $w_n'=0$, $w_n\rightharpoonup0$ et $\|w_n\|_{L^2(0,T;V)}=1$ pour tout $n$.`,
    },
  ],
  removable: [
    {
      hypothesis: 'h-refl',
      label: 'Remplacer les espaces par un espace non réflexif',
      necessary: true,
      explanation: 'Une suite bornée peut n’avoir aucune sous-suite faiblement convergente.',
      counterexample: t`Dans $L^1(0,1)$, $\rho_n=n\mathbb 1_{]0,1/n[}$ est bornée, et aucune sous-suite ne converge faiblement dans $L^1(0,1)$.`,
    },
  ],
};

/* ───────────── 7. Aubin–Lions, si nécessaire ───────────── */

const ETAPE_7: ProofSpec = {
  purpose: 'demonstration',
  goal: 'fin',
  nodes: [
    { id: 'h-comp', kind: 'hypothese', text: t`$V\hookrightarrow H$ est compacte (Rellich–Kondrachov sur l'intervalle borné $]0,1[$) et $H\hookrightarrow V'$ est continue.` },
    { id: 'h-borne', kind: 'hypothese', text: t`$(u_n)$ est bornée dans $L^2(0,T;V)$ et $(u_n')$ dans $L^2(0,T;V')$.` },
    { id: 'a-al', kind: 'application-theoreme', text: t`Une sous-suite de $(u_n)$ converge fortement dans $L^2(0,T;H)$.` },
    { id: 'c-lin', kind: 'consequence', text: t`À $v$ et $\eta$ fixés, chaque terme de la formulation approchée est une forme linéaire continue de $u_n$ ou de $u_n'$ : la convergence faible suffit pour passer à la limite.` },
    { id: 'fin', kind: 'conclusion', unlocks: ['etape-7'], text: t`Les hypothèses d'Aubin–Lions sont satisfaites et donnent la convergence forte dans $L^2(0,T;H)$. Pour ce problème linéaire, elle n'est pas indispensable ; elle peut le devenir devant un terme non linéaire.` },
    { id: 'x-dt', kind: 'consequence', distractor: true, text: t`La compacité de $V\hookrightarrow H$ et la borne dans $L^2(0,T;V)$ suffisent, sans contrôle de $u_n'$.` },
  ],
  justifications: [
    { id: 'j-al', label: t`Lemme d'Aubin–Lions : $V\hookrightarrow H$ compacte, $H\hookrightarrow V'$ continue, bornes dans $L^2(0,T;V)$ et dans $L^2(0,T;V')$.`, theorem: 'aubin-lions' },
    { id: 'j-lin', label: t`Les bornes donnent une limite faible (étape 6), et une forme linéaire continue passe à la limite faible.` },
    { id: 'j-bilan', label: 'Réunion : la convergence forte est disponible, mais l’identification de la limite n’utilise que des formes linéaires continues.' },
    { id: 'j-rellich-t', label: t`Rellich–Kondrachov, appliqué à chaque instant $t$, suffit.`, theorem: 'rellich' },
    { id: 'j-fort-requis', label: 'Tout passage à la limite dans une formulation d’évolution exige une convergence forte.' },
  ],
  rules: [
    { from: ['h-comp', 'h-borne'], to: 'a-al', by: 'j-al' },
    { from: ['h-borne'], to: 'c-lin', by: 'j-lin' },
    { from: ['a-al', 'c-lin'], to: 'fin', by: 'j-bilan' },
  ],
  traps: [
    {
      conclusion: 'a-al',
      by: 'j-rellich-t',
      verdict: 'incorrect',
      concept: 'temps-compacite',
      message: t`La compacité en espace, instant par instant, ne contrôle pas les oscillations en temps, et la sous-suite extraite dépendrait de $t$. Il faut un contrôle en temps : ici, la borne de $u_n'$.`,
      counterexample: t`$w_n(t,x)=\sin(2\pi nt/T)\,\varphi_1(x)$ est bornée dans $L^2(0,T;V)$ et $w_n\rightharpoonup0$, mais $\|w_n\|_{L^2(0,T;H)}^2=T/2$ pour tout $n$.`,
    },
    {
      conclusion: 'c-lin',
      by: 'j-fort-requis',
      verdict: 'incorrect',
      concept: 'faible-fort',
      message: t`Une convergence forte ne sert que pour certains termes non linéaires, comme $g(u_n)$ avec $g$ lipschitzienne (polycopié, 8.7). Ici chaque terme est linéaire et continu : la convergence faible suffit.`,
    },
    {
      conclusion: 'x-dt',
      verdict: 'incorrect',
      concept: 'temps-compacite',
      message: t`Sans contrôle de $u_n'$, rien n'empêche les oscillations en temps.`,
      counterexample: t`$w_n(t,x)=\sin(2\pi nt/T)\,\varphi_1(x)$ : bornée dans $L^2(0,T;V)$, sans sous-suite fortement convergente dans $L^2(0,T;H)$ ; et $\|w_n'\|_{L^2(0,T;V')}\to\infty$.`,
    },
  ],
  removable: [
    {
      hypothesis: 'h-comp',
      label: t`Ne plus disposer de la compacité de $V\hookrightarrow H$`,
      necessary: true,
      explanation: 'Sur un domaine non borné, l’injection n’est plus compacte et Aubin–Lions ne s’applique plus.',
      counterexample: t`Sur $\mathbb R$, $u_n(t,x)=w(x-n)$ avec $w\in C^\infty_c(\mathbb R)$ non nulle : bornée dans $L^2(0,T;H^1(\mathbb R))$, $u_n'=0$, et aucune sous-suite ne converge fortement dans $L^2(0,T;L^2(\mathbb R))$.`,
    },
  ],
};

/* ───────────── 8. Passage à la limite ───────────── */

const ETAPE_8: ProofSpec = {
  purpose: 'demonstration',
  goal: 'fin',
  nodes: [
    { id: 'h-conv', kind: 'hypothese', text: t`$u_n\rightharpoonup u$ dans $L^2(0,T;V)$ et $u_n'\rightharpoonup u'$ dans $L^2(0,T;V')$ (sous-suite).` },
    { id: 'h-app', kind: 'hypothese', text: t`Pour $k$ fixé, $\eta\in C^\infty_c(]0,T[)$ et tout $n\ge k$ (de sorte que $\varphi_k\in V_n$) : $\int_0^T\big[\langle u_n',\varphi_k\rangle+(u_n,\varphi_k)_V\big]\eta\,dt=\int_0^T\langle f,\varphi_k\rangle\,\eta\,dt$.` },
    { id: 'h-tot', kind: 'hypothese', text: t`$\mathrm{Vect}(\varphi_k)_{k\ge1}$ est dense dans $V$ : $(\varphi_k/\sqrt{\lambda_k})_k$ est une base hilbertienne de $V$.` },
    { id: 'e-lim', kind: 'egalite', text: t`Pour tout $k$ et tout $\eta\in C^\infty_c(]0,T[)$ : $\int_0^T\big[\langle u',\varphi_k\rangle+(u,\varphi_k)_V-\langle f,\varphi_k\rangle\big]\eta\,dt=0$.` },
    { id: 'fin', kind: 'conclusion', unlocks: ['etape-8'], text: t`Pour presque tout $t$ et tout $v\in V$ : $\langle u'(t),v\rangle_{V',V}+(u(t),v)_V=\langle f(t),v\rangle_{V',V}$.` },
    { id: 'x-quad', kind: 'consequence', distractor: true, text: t`La convergence faible seule entraîne $\int_0^T\|u_n\|_V^2\,dt\to\int_0^T\|u\|_V^2\,dt$.` },
  ],
  justifications: [
    { id: 'j-lim', label: t`À $k$ et $\eta$ fixés, $w\mapsto\int_0^T\langle w,\varphi_k\rangle\eta$ et $w\mapsto\int_0^T(w,\varphi_k)_V\eta$ sont des formes linéaires continues sur $L^2(0,T;V')$ et $L^2(0,T;V)$ : on fait $n\to\infty$.` },
    { id: 'j-pp-dense', label: t`Pour chaque $k$, l'égalité vaut hors d'un négligeable $N_k$ (lemme fondamental du calcul des variations) ; hors de $\bigcup_kN_k$, elle vaut pour tout $k$, puis pour tout $v\in V$ par densité et continuité en $v$.` },
    { id: 'j-dense-H', label: t`La densité de $\mathrm{Vect}(\varphi_k)$ dans $H$ suffit pour étendre l'égalité à tout $v$.` },
    { id: 'j-quantif', label: t`Pour chaque $v\in V$, l'égalité vaut hors d'un négligeable dépendant de $v$ : elle vaut donc, hors d'un négligeable, pour tout $v$.` },
  ],
  rules: [
    { from: ['h-conv', 'h-app'], to: 'e-lim', by: 'j-lim' },
    { from: ['e-lim', 'h-tot'], to: 'fin', by: 'j-pp-dense' },
  ],
  traps: [
    {
      conclusion: 'fin',
      by: 'j-dense-H',
      verdict: 'incorrect',
      concept: 'densite-fermeture',
      message: t`$v\mapsto(u(t),v)_V$ n'est pas continue pour la norme de $H$ : il faut la densité dans $V$.`,
      counterexample: t`$W=\{v\in V : v(1/2)=0\}$ est dense dans $H$ ; la forme $v\mapsto v(1/2)$, continue sur $V$, est nulle sur $W$ sans être nulle sur $V$.`,
    },
    {
      conclusion: 'fin',
      by: 'j-quantif',
      verdict: 'incorrect',
      concept: 'quantificateurs',
      message: 'Une réunion non dénombrable d’ensembles négligeables n’est pas négligeable en général : il faut se ramener à une famille dénombrable, puis conclure par densité.',
      counterexample: t`$N_s=\{s\}$ pour $s\in[0,T]$ : chaque $N_s$ est négligeable, et leur réunion est $[0,T]$.`,
    },
    {
      conclusion: 'x-quad',
      verdict: 'incorrect',
      concept: 'nonlinearite-limite-faible',
      message: 'Une expression quadratique ne passe pas à la limite faible.',
      counterexample: t`$w_n=\varphi_n/\sqrt{\lambda_nT}$ : $w_n\rightharpoonup0$ dans $L^2(0,T;V)$, et $\int_0^T\|w_n\|_V^2\,dt=1$ pour tout $n$.`,
    },
  ],
  removable: [
    {
      hypothesis: 'h-tot',
      label: t`Ne plus disposer de la densité de $\mathrm{Vect}(\varphi_k)$ dans $V$`,
      necessary: true,
      explanation: 'L’équation limite n’est alors identifiée que sur l’adhérence de l’espace engendré.',
      counterexample: t`La famille $(\varphi_{2k})_{k\ge1}$ n'est pas totale dans $V$ : $\varphi_1$ lui est orthogonale. Pour $f=0$, la fonction constante en temps $u(t)=\varphi_1$ vérifie l'identité testée par chaque $\varphi_{2k}$ (les deux membres sont nuls), mais pas l'équation testée par $v=\varphi_1$ : $\langle u',\varphi_1\rangle+(u,\varphi_1)_V=\pi^2\neq0$.`,
    },
  ],
};

/* ───────────── 9. Condition initiale ───────────── */

const ETAPE_9: ProofSpec = {
  purpose: 'demonstration',
  goal: 'fin',
  nodes: [
    { id: 'h-lm', kind: 'hypothese', text: t`$u$ vérifie la formulation faible ; par Lions–Magenes, $u\in C([0,T];H)$ et, pour $\eta\in C^1([0,T])$ avec $\eta(T)=0$ : $\int_0^T\langle u',\varphi_k\rangle\eta\,dt=-\int_0^T(u,\varphi_k)_H\eta'\,dt-(u(0),\varphi_k)_H\,\eta(0)$.` },
    { id: 'h-init', kind: 'hypothese', text: t`$u_n(0)=P_nu_0$, $u_n\rightharpoonup u$ dans $L^2(0,T;V)$, et $(\varphi_k)$ est une base hilbertienne de $H$.` },
    { id: 'e-init', kind: 'egalite', text: t`Pour $k$ fixé et $\eta\in C^1([0,T])$ avec $\eta(T)=0$, $\eta(0)=1$ : $-\int_0^T(u,\varphi_k)_H\eta'-(u_0,\varphi_k)_H+\int_0^T(u,\varphi_k)_V\eta=\int_0^T\langle f,\varphi_k\rangle\eta$.` },
    { id: 'e-comp', kind: 'egalite', text: t`$(u(0),\varphi_k)_H=(u_0,\varphi_k)_H$ pour tout $k\ge1$.` },
    { id: 'fin', kind: 'conclusion', unlocks: ['etape-9'], text: t`$u(0)=u_0$ dans $H$.` },
    { id: 'x-trace', kind: 'consequence', distractor: true, text: t`$u_n(0)\to u(0)$ dans $H$, directement parce que $u_n\rightharpoonup u$ dans $L^2(0,T;V)$.` },
  ],
  justifications: [
    { id: 'j-ipp-n', label: t`Intégrer le problème approché contre $\eta\varphi_k$, par parties en temps ; le terme initial vaut $(P_nu_0,\varphi_k)_H=(u_0,\varphi_k)_H$ dès que $n\ge k$ ; puis passer à la limite faible.` },
    { id: 'j-compar', label: t`Tester l'équation limite par $\eta\varphi_k$ et intégrer par parties grâce à Lions–Magenes : même identité avec $(u(0),\varphi_k)_H$ ; soustraire.`, theorem: 'lions-magenes' },
    { id: 'j-base', label: t`Deux éléments de $H$ qui ont les mêmes coefficients sur une base hilbertienne sont égaux.` },
    { id: 'j-cc', label: t`Reprendre les fonctions test $\eta\in C^\infty_c(]0,T[)$ de l'étape précédente.` },
  ],
  rules: [
    { from: ['h-init'], to: 'e-init', by: 'j-ipp-n' },
    { from: ['e-init', 'h-lm'], to: 'e-comp', by: 'j-compar' },
    { from: ['e-comp', 'h-init'], to: 'fin', by: 'j-base' },
  ],
  traps: [
    {
      conclusion: 'e-comp',
      by: 'j-cc',
      verdict: 'incorrect',
      concept: 'valeur-initiale',
      message: t`Avec $\eta(0)=0$, le terme initial disparaît des deux identités : on n'apprend rien sur $u(0)$.`,
      counterexample: t`$f=0$ : $e^{-\pi^2t}\varphi_1$ et $2e^{-\pi^2t}\varphi_1$ vérifient toutes deux l'identité testée contre $\eta\in C^\infty_c(]0,T[)$, avec des valeurs initiales différentes.`,
    },
    {
      conclusion: 'x-trace',
      verdict: 'incorrect',
      concept: 'valeur-initiale',
      message: t`L'évaluation en $t=0$ n'est pas définie sur $L^2(0,T;V)$, et la convergence dans cet espace ne la contrôle pas : c'est le contrôle de la dérivée en temps (Lions–Magenes) qui donne un sens à $u(0)$.`,
      counterexample: t`$w_n(t)=\max(1-nt,0)\,\varphi_1$ tend vers $0$ dans $L^2(0,T;V)$, alors que $w_n(0)=\varphi_1$ pour tout $n$.`,
    },
  ],
  removable: [
    {
      hypothesis: 'h-lm',
      label: 'Ne plus disposer de Lions–Magenes',
      necessary: true,
      explanation: t`On perd l'identité vérifiée par $u$, et avec elle tout sens donné à $u(0)$ : l'appartenance $u\in L^2(0,T;V)$ seule ne définit aucune valeur en $t=0$. C'est le contrôle de $u'$ dans $L^2(0,T;V')$, exploité par Lions–Magenes, qui fournit un représentant continu à valeurs dans $H$ et la formule d'intégration par parties.`,
      counterexample: t`$w(t)=t^{-1/4}\varphi_1$ appartient à $L^2(0,T;V)$, car $\int_0^Tt^{-1/2}\pi^2\,dt<\infty$ ; mais $\|w(t)\|_H=t^{-1/4}$ n'est essentiellement bornée sur aucun intervalle $]0,\delta[$ : aucun représentant de $w$ n'a de limite en $0$, ni dans $H$ ni dans $V'$. Ici $w'\notin L^2(0,T;V')$.`,
    },
  ],
};

/* ───────────── 10. Unicité ───────────── */

const ETAPE_10: ProofSpec = {
  purpose: 'demonstration',
  goal: 'fin',
  nodes: [
    { id: 'd-w', kind: 'definition', local: true, text: t`Soient $u_1,u_2$ deux solutions faibles, de mêmes données $u_0$ et $f$, et $w=u_1-u_2$.` },
    { id: 'h-lm', kind: 'hypothese', text: t`Lions–Magenes : si $w\in L^2(0,T;V)$ et $w'\in L^2(0,T;V')$, alors $t\mapsto\|w(t)\|_H^2$ est absolument continue et $\frac{d}{dt}\|w\|_H^2=2\langle w',w\rangle_{V',V}$ p.p.` },
    { id: 'e-homog', kind: 'egalite', text: t`$w(0)=0$ et, p.p. $t$, $\langle w'(t),z\rangle_{V',V}+(w(t),z)_V=0$ pour tout $z\in V$.` },
    { id: 'e-int', kind: 'egalite', text: t`Pour tout $t\in[0,T]$ : $\frac12\|w(t)\|_H^2+\int_0^t\|w\|_V^2=\frac12\|w(0)\|_H^2=0$.` },
    { id: 'fin', kind: 'conclusion', unlocks: ['etape-10'], text: t`$w=0$ : la solution faible est unique.` },
    { id: 'x-gal', kind: 'consequence', distractor: true, text: t`Chaque $u_n$ est unique, donc la solution faible l'est aussi.` },
  ],
  justifications: [
    { id: 'j-diff', label: 'Différence des deux formulations faibles : le problème est linéaire, les données s’éliminent.' },
    { id: 'j-test-w', label: t`Tester par $z=w(t)\in V$, appliquer la formule de Lions–Magenes, puis intégrer sur $[0,t]$.`, theorem: 'lions-magenes' },
    { id: 'j-positif', label: t`Deux termes positifs ou nuls de somme nulle sont nuls : $w(t)=0$ pour tout $t$.` },
    { id: 'j-cr-usuel', label: t`Dérivation usuelle : $\frac{d}{dt}\|w\|_H^2=2(w',w)_H$.` },
  ],
  rules: [
    { from: ['d-w'], to: 'e-homog', by: 'j-diff' },
    { from: ['e-homog', 'h-lm'], to: 'e-int', by: 'j-test-w' },
    { from: ['e-int'], to: 'fin', by: 'j-positif' },
  ],
  traps: [
    {
      conclusion: 'e-int',
      by: 'j-cr-usuel',
      verdict: 'incorrect',
      concept: 'dual-identification',
      message: t`$w'(t)$ appartient seulement à $V'$, qui contient strictement $H$ (la distribution de Dirac en $1/2$ y appartient, car $V\hookrightarrow C([0,1])$) : $(w',w)_H$ n'a pas de sens en général, et la règle usuelle suppose $w$ dérivable à valeurs dans $H$. C'est Lions–Magenes qui justifie la formule, avec le crochet $\langle w',w\rangle_{V',V}$.`,
      counterexample: t`$w(t)=\sum_{k\ge1}\frac{\sin(\lambda_kt)}{k\sqrt{\lambda_k}}\varphi_k$ vérifie $\|w(t)\|_V^2=\sum_k\frac{\sin^2(\lambda_kt)}{k^2}\le\frac{\pi^2}6$ et $\|w'(t)\|_{V'}^2=\sum_k\frac{\cos^2(\lambda_kt)}{k^2}\le\frac{\pi^2}6$ ; mais $\sum_k\langle w'(t),\varphi_k\rangle^2=\pi^2\sum_k\cos^2(\lambda_kt)=+\infty$ pour presque tout $t$, le terme général ne tendant vers $0$ que sur un ensemble négligeable (Riemann–Lebesgue). Donc $w'(t)\notin H$ p.p., et $(w'(t),w(t))_H$ n'a pas de sens.`,
    },
    {
      conclusion: 'x-gal',
      verdict: 'incorrect',
      concept: 'existence-unicite',
      message: 'L’unicité des approximations ne passe pas à la limite : des problèmes à solution unique peuvent approcher un problème qui en a plusieurs. Il faut un argument sur le problème limite lui-même.',
      counterexample: t`Pour tout $n$, $y'=2\sqrt{|y|+1/n}$, $y(0)=0$ a une unique solution ; le problème limite $y'=2\sqrt{|y|}$, $y(0)=0$ admet $y=0$ et $y=t^2$.`,
    },
  ],
  removable: [
    {
      hypothesis: 'e-homog',
      label: t`Ne plus disposer de $w(0)=0$ (données initiales distinctes)`,
      necessary: true,
      explanation: t`Le même calcul ne donne que $\|w(t)\|_H\le\|w(0)\|_H$ : une stabilité, pas l'unicité.`,
      counterexample: t`$f=0$ : $e^{-\pi^2t}\varphi_1$ et $2e^{-\pi^2t}\varphi_1$ sont deux solutions faibles, de données initiales $\varphi_1$ et $2\varphi_1$.`,
    },
  ],
};

export const GALERKIN_STEPS: GalerkinStep[] = [
  { n: 1, key: 'etape-1', title: 'Formulation faible', spec: ETAPE_1, claim: t`Une solution régulière vérifie la formulation faible, pour toute fonction test $v\in V$.`, vizTitle: 'Formulation faible et terme de bord' },
  { n: 2, key: 'etape-2', title: 'Espaces', spec: ETAPE_2, claim: t`$V\hookrightarrow H\hookrightarrow V'$ : injections continues, $H$ seul identifié à son dual.`, vizTitle: t`Le triplet $V\hookrightarrow H\hookrightarrow V'$` },
  { n: 3, key: 'etape-3', title: 'Système de Galerkin', spec: ETAPE_3, claim: t`Le problème approché équivaut au système diagonal $c_k'+\lambda_kc_k=f_k$, $c_k(0)=b_k$.`, vizTitle: t`Les fonctions $\varphi_k$ et le système $c_k'+\lambda_kc_k=f_k$` },
  { n: 4, key: 'etape-4', title: 'Existence en dimension finie', spec: ETAPE_4, claim: t`Le système admet une unique solution absolument continue sur $[0,T]$, en formule fermée.`, vizTitle: t`Les courbes $t\mapsto c_k(t)$` },
  { n: 5, key: 'etape-5', title: 'Estimations uniformes', spec: ETAPE_5, claim: t`Bornes indépendantes de $n$ : $u_n$ dans $L^\infty(0,T;H)\cap L^2(0,T;V)$, $u_n'$ dans $L^2(0,T;V')$.`, vizTitle: 'Estimation a priori : vérification numérique' },
  { n: 6, key: 'etape-6', title: 'Extraction faible', spec: ETAPE_6, claim: t`Une sous-suite converge faiblement : $u_n\rightharpoonup u$ dans $L^2(0,T;V)$, $u_n'\rightharpoonup u'$ dans $L^2(0,T;V')$.`, vizTitle: t`Coefficients en $n$ et test contre une fonction fixée` },
  { n: 7, key: 'etape-7', title: 'Aubin–Lions', spec: ETAPE_7, claim: t`Les hypothèses d'Aubin–Lions sont satisfaites ; pour ce problème linéaire, la convergence forte n'est pas indispensable.`, vizTitle: t`L'écart $\|u_n(t)-u(t)\|_H$ en fonction de $n$` },
  { n: 8, key: 'etape-8', title: 'Passage à la limite', spec: ETAPE_8, claim: t`La limite $u$ vérifie la formulation faible, pour presque tout $t$ et tout $v\in V$.`, vizTitle: t`Résidu de la formulation faible sur $V_n$` },
  { n: 9, key: 'etape-9', title: 'Condition initiale', spec: ETAPE_9, claim: t`$u(0)=u_0$ dans $H$.`, vizTitle: t`L'écart $\|P_nu_0-u_0\|_H$ en fonction de $n$` },
  { n: 10, key: 'etape-10', title: 'Unicité', spec: ETAPE_10, claim: 'La solution faible est unique.', vizTitle: 'Bilan final' },
];
