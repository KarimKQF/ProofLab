/**
 * Résultat 34 — Méthode de Galerkin et passage à la limite (polycopié, bloc 8, p. PDF 31–34).
 * Exercices : annexe B, n° 34 (p. PDF 44).
 * Erreur corrigée : l'estimation a priori des p. PDF 31 et 32 (voir docs/notes/w7-w8.md).
 */
import { t, rubric, poly, FROM_POLY } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

const CORRIGE: Exercise['verification'] = {
  origin: 'polycopie-corrige',
  review: 'machine',
  notes: 'Estimation a priori corrigée : celle des p. PDF 31 et 32 est fausse telle quelle (f = 0, u0 = φ1) ; le facteur 2 est rétabli.',
};

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'galerkin.facile',
  theoremId: 'galerkin',
  level: 'facile',
  title: 'Système de Galerkin du problème parabolique de Dirichlet',
  statement: t`Soit $\Omega$ borné lipschitzien, $T>0$, $V=H^1_0(\Omega)\hookrightarrow H=L^2(\Omega)\hookrightarrow V'$, $u_0\in H$, $f\in L^2(0,T;V')$, et $(\varphi_k)$ une base orthonormée de $H$ de fonctions propres du Laplacien de Dirichlet : $\varphi_k\in V$, $\int_\Omega\nabla\varphi_j\cdot\nabla\varphi_k=\lambda_j\delta_{jk}$, $\lambda_k>0$. Écrire le système de Galerkin sur $V_n=\mathrm{Vect}(\varphi_1,\dots,\varphi_n)$ sous forme d'équations différentielles pour les coefficients, et le résoudre.`,
  source: poly(44, 'Exercice 34, facile (p. PDF 44) ; section 8.2 (p. PDF 31)'),
  prerequisites: [],
  concepts: ['galerkin-projection', 'hypotheses-theoreme', 'valeur-initiale', 'calcul-exact'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-tri', kind: 'hypothese', text: t`$V=H^1_0(\Omega)\hookrightarrow H=L^2(\Omega)\hookrightarrow V'$, $u_0\in H$, $f\in L^2(0,T;V')$.` },
      { id: 'h-base', kind: 'hypothese', text: t`$(\varphi_k)$ est une base orthonormée de $H$, $\varphi_k\in V$, $\int_\Omega\nabla\varphi_j\cdot\nabla\varphi_k=\lambda_j\delta_{jk}$, $\lambda_k>0$.` },
      { id: 'd-gal', kind: 'definition', text: t`On cherche $u_n(t)=\sum_{k=1}^nc_k(t)\varphi_k$ tel que $(u_n',v)_H+\int_\Omega\nabla u_n\cdot\nabla v=\langle f,v\rangle_{V',V}$ pour tout $v\in V_n$, et $u_n(0)=P_nu_0$, où $P_n$ est la projection orthogonale de $H$ sur $V_n$.` },
      { id: 'test', kind: 'consequence', text: t`L'équation pour tout $v\in V_n$ équivaut à l'équation pour $v=\varphi_j$, $1\le j\le n$.` },
      { id: 'mass', kind: 'egalite', text: t`$(u_n',\varphi_j)_H=c_j'$ et $\int_\Omega\nabla u_n\cdot\nabla\varphi_j=\lambda_jc_j$.` },
      { id: 'init', kind: 'egalite', text: t`$c_j(0)=(P_nu_0,\varphi_j)_H=(u_0,\varphi_j)_H$ pour $j\le n$.` },
      { id: 'syst', kind: 'egalite', text: t`$c_j'(t)+\lambda_jc_j(t)=\langle f(t),\varphi_j\rangle_{V',V}$, $c_j(0)=(u_0,\varphi_j)_H$, pour $1\le j\le n$ : $n$ équations découplées.` },
      { id: 'gj', kind: 'consequence', text: t`$g_j(t)=\langle f(t),\varphi_j\rangle_{V',V}$ définit un élément de $L^2(0,T)$.` },
      { id: 'sol', kind: 'egalite', text: t`$c_j(t)=e^{-\lambda_jt}(u_0,\varphi_j)_H+\int_0^te^{-\lambda_j(t-r)}g_j(r)\,dr$ est l'unique solution absolument continue.` },
      { id: 'fin', kind: 'conclusion', text: t`Le système de Galerkin est un système de $n$ équations différentielles linéaires découplées, uniquement soluble : $u_n\in H^1(0,T;V_n)$.` },
      { id: 'x-couple', kind: 'consequence', distractor: true, after: ['mass'], text: t`Chaque $c_j'$ dépend de tous les coefficients $c_1,\dots,c_n$.` },
      { id: 'x-lambda', kind: 'egalite', distractor: true, after: ['mass'], text: t`$c_j'+c_j=\langle f,\varphi_j\rangle_{V',V}$.` },
      { id: 'x-C1', kind: 'consequence', distractor: true, after: ['sol'], text: t`Les coefficients $c_j$ sont de classe $C^1$ sur $[0,T]$.` },
    ],
    justifications: [
      { id: 'j-lin', label: t`Linéarité en $v$ des deux membres, et $(\varphi_1,\dots,\varphi_n)$ base de $V_n$.` },
      { id: 'j-ortho', label: t`Orthonormalité de $(\varphi_k)$ dans $H$ et relation $\int\nabla\varphi_k\cdot\nabla\varphi_j=\lambda_j\delta_{jk}$.` },
      { id: 'j-proj', label: t`$P_nu_0=\sum_{k\le n}(u_0,\varphi_k)_H\varphi_k$.` },
      { id: 'j-assemble', label: t`Report des deux identités dans l'équation testée par $\varphi_j$.` },
      { id: 'j-gj', label: t`$|g_j(t)|\le\|f(t)\|_{V'}\|\varphi_j\|_V$, et $g_j$ est mesurable.` },
      { id: 'j-var', label: t`Variation de la constante : $\big(e^{\lambda_jt}c_j\big)'=e^{\lambda_jt}g_j$ presque partout, puis intégration ; unicité par différence de deux solutions.` },
      { id: 'j-syn', label: 'Réunion des résultats établis.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-cl', label: 'Théorème de Cauchy–Lipschitz classique, le second membre étant continu en temps.', theorem: 'theoreme-cauchy-lipschitz' },
    ],
    rules: [
      { from: ['d-gal'], to: 'test', by: 'j-lin' },
      { from: ['d-gal', 'h-base'], to: 'mass', by: 'j-ortho' },
      { from: ['d-gal', 'h-base'], to: 'init', by: 'j-proj' },
      { from: ['test', 'mass', 'init'], to: 'syst', by: 'j-assemble' },
      { from: ['h-tri', 'h-base'], to: 'gj', by: 'j-gj' },
      { from: ['syst', 'gj'], to: 'sol', by: 'j-var' },
      { from: ['syst', 'sol'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-couple',
        verdict: 'incorrect',
        concept: 'galerkin-projection',
        message: t`Avec la base spectrale, les matrices de masse $(\varphi_k,\varphi_j)_H=\delta_{jk}$ et de rigidité $\lambda_j\delta_{jk}$ sont diagonales : le système est découplé.`,
        counterexample: t`Pour $n=2$ : $c_1'=g_1-\lambda_1c_1$ ne fait pas intervenir $c_2$. Le couplage peut apparaître avec une autre base, par exemple $\psi_1=\varphi_1$, $\psi_2=\varphi_1+\varphi_2$, de matrice de masse $\begin{pmatrix}1&1\\1&2\end{pmatrix}$.`,
      },
      {
        conclusion: 'x-lambda',
        verdict: 'incorrect',
        concept: 'calcul-exact',
        message: t`Le terme $\int\nabla u_n\cdot\nabla\varphi_j$ vaut $\lambda_jc_j$, non $c_j$.`,
        counterexample: t`Sur $]0,\pi[$, $f=0$, $u_0=\varphi_2$, $\lambda_2=4$ : $e^{-t}\varphi_2$ ne vérifie pas l'équation, car $-e^{-t}+4e^{-t}\neq 0$.`,
      },
      {
        conclusion: 'x-C1',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Avec $f\in L^2(0,T;V')$, $c_j'=g_j-\lambda_jc_j$ n'est en général que de carré intégrable : $c_j$ est absolument continue, pas $C^1$ en général.`,
        counterexample: t`$f(t)=\mathbb 1_{]0,T/2[}(t)\,\varphi_1$ : $c_1'$ saute en $t=T/2$.`,
      },
      {
        conclusion: 'sol',
        by: 'j-cl',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Le second membre $g_j$ n'est que dans $L^2(0,T)$ : le théorème classique ne s'applique pas ; la formule de variation de la constante fournit directement la solution absolument continue.`,
        counterexample: t`$g_1=\mathbb 1_{]0,T/2[}$ n'est pas continue.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-base',
        label: 'Retirer la base spectrale',
        necessary: true,
        explanation: t`Avec une base quelconque de $V_n$, on obtient $Mc'+Kc=F$ : le système reste soluble ($M$ inversible) mais en général couplé, et la formule explicite disparaît.`,
        counterexample: t`Base $\psi_1=\varphi_1$, $\psi_2=\varphi_1+\varphi_2$ : matrice de masse $\begin{pmatrix}1&1\\1&2\end{pmatrix}$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Sur $\Omega=]0,\pi[$, avec $\varphi_k=\sqrt{2/\pi}\sin(kx)$ : valeur de $\int_0^\pi|\varphi_2'|^2$`, expected: '4' }],
  solution: t`**Système.** Par linéarité, l'équation sur $V_n$ équivaut à l'équation testée par $\varphi_j$, $1\le j\le n$. Par orthonormalité, $(u_n',\varphi_j)_H=c_j'$, et $\int\nabla u_n\cdot\nabla\varphi_j=\sum_kc_k\lambda_k\delta_{kj}=\lambda_jc_j$. La donnée initiale donne $c_j(0)=(u_0,\varphi_j)_H$. D'où
$$c_j'(t)+\lambda_jc_j(t)=\langle f(t),\varphi_j\rangle_{V',V},\qquad c_j(0)=(u_0,\varphi_j)_H,\qquad 1\le j\le n.$$
**Résolution.** $g_j=\langle f,\varphi_j\rangle\in L^2(0,T)$ ; la variation de la constante donne l'unique solution absolument continue $c_j(t)=e^{-\lambda_jt}(u_0,\varphi_j)_H+\int_0^te^{-\lambda_j(t-r)}g_j(r)\,dr$. Les équations sont découplées parce que la base est spectrale ; $c_j$ n'est pas $C^1$ en général.`,
  steps: [
    t`Réduire l'équation aux tests $v=\varphi_j$.`,
    'Calculer les deux termes par orthonormalité et relation spectrale.',
    'Écrire la condition initiale par la projection.',
    'Résoudre chaque équation scalaire par variation de la constante.',
  ],
  commonErrors: [
    { id: 'e-lambda', description: t`Oublier le facteur $\lambda_j$ dans le terme de rigidité.`, concept: 'calcul-exact' },
    { id: 'e-cl', description: 'Invoquer Cauchy–Lipschitz classique avec un second membre seulement de carré intégrable en temps.', concept: 'hypotheses-theoreme' },
  ],
  hints: [
    t`Par quelles fonctions suffit-il de tester l'équation lorsque $v$ parcourt $V_n$ ?`,
    t`Utilise $(\varphi_k,\varphi_j)_H=\delta_{kj}$ et $\int\nabla\varphi_k\cdot\nabla\varphi_j=\lambda_j\delta_{kj}$ : que deviennent les deux termes ?`,
    t`Tu obtiens $c_j'+\lambda_jc_j=g_j$ : multiplie par $e^{\lambda_jt}$ et intègre.`,
  ],
  rubric: rubric({
    hypotheses: 'Le triplet, la base spectrale et la donnée initiale projetée sont explicités.',
    methode: 'Test par les fonctions de base, puis résolution scalaire.',
    validite: t`Les facteurs $\lambda_j$ et la condition initiale sont corrects.`,
    justifications: 'La régularité en temps des coefficients est correctement décrite.',
    conclusion: 'Le système découplé et sa solution explicite sont obtenus.',
  }),
  variant: {
    statement: t`Même cadre pour $\partial_tu-\Delta u+u=f$. Écrire le système de Galerkin, puis, sur $\Omega=]0,\pi[$ avec $f=0$ et $u_0=\varphi_1$, calculer $c_1(t)e^{2t}$.`,
    solution: t`Le terme supplémentaire donne $(u_n,\varphi_j)_H=c_j$, d'où $c_j'+(\lambda_j+1)c_j=\langle f,\varphi_j\rangle$, $c_j(0)=(u_0,\varphi_j)_H$. Sur $]0,\pi[$, $\lambda_1=1$ ; avec $f=0$ et $u_0=\varphi_1$, $c_1(t)=e^{-2t}$, donc $c_1(t)e^{2t}=1$.`,
    closedChecks: [{ kind: 'rational', prompt: t`Valeur de $c_1(t)e^{2t}$`, expected: '1' }],
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h-base', kind: 'hypothese', text: t`$(\varphi_k)$ base orthonormée de $H$, $\int\nabla\varphi_j\cdot\nabla\varphi_k=\lambda_j\delta_{jk}$ ; sur $]0,\pi[$, $\lambda_1=1$.` },
        { id: 'd-gal', kind: 'definition', text: t`$(u_n',v)_H+\int\nabla u_n\cdot\nabla v+(u_n,v)_H=\langle f,v\rangle$ pour $v\in V_n$, $u_n(0)=P_nu_0$, $u_n=\sum_{k\le n}c_k\varphi_k$.` },
        { id: 'd-data', kind: 'definition', text: t`$f=0$, $u_0=\varphi_1$.` },
        { id: 'syst', kind: 'egalite', text: t`$c_j'+(\lambda_j+1)c_j=\langle f,\varphi_j\rangle$, $c_j(0)=(u_0,\varphi_j)_H$.` },
        { id: 'c1', kind: 'egalite', text: t`$c_1(t)=e^{-2t}$.` },
        {
          id: 'val',
          kind: 'egalite',
          text: t`$c_1(t)e^{2t}=1$.`,
          masked: t`Valeur de $c_1(t)e^{2t}$ : à calculer.`,
          check: { kind: 'rational', prompt: t`Valeur de $c_1(t)e^{2t}$`, expected: '1' },
        },
        { id: 'fin', kind: 'conclusion', text: t`Le système de Galerkin est $c_j'+(\lambda_j+1)c_j=\langle f,\varphi_j\rangle$, et $c_1(t)=e^{-2t}$ pour les données choisies.` },
        { id: 'x-oubli', kind: 'egalite', distractor: true, after: ['syst'], text: t`$c_1(t)=e^{-t}$.` },
      ],
      justifications: [
        { id: 'j-test', label: t`Test par $\varphi_j$, orthonormalité et relation spectrale ; le terme d'ordre zéro donne $c_j$.` },
        { id: 'j-resol', label: t`$c_1'+2c_1=0$ et $c_1(0)=(\varphi_1,\varphi_1)_H=1$.` },
        { id: 'j-calc', label: 'Multiplication par l’exponentielle.' },
        { id: 'j-syn', label: 'Réunion des résultats établis.' },
      ],
      rules: [
        { from: ['d-gal', 'h-base'], to: 'syst', by: 'j-test' },
        { from: ['syst', 'd-data', 'h-base'], to: 'c1', by: 'j-resol' },
        { from: ['c1'], to: 'val', by: 'j-calc' },
        { from: ['syst', 'val'], to: 'fin', by: 'j-syn' },
      ],
      traps: [
        {
          conclusion: 'x-oubli',
          verdict: 'incorrect',
          concept: 'calcul-exact',
          message: t`Le coefficient est $\lambda_1+1=2$ : il ne faut oublier ni la rigidité ni le terme d'ordre zéro.`,
          counterexample: t`$e^{-t}$ vérifie $c'+c=0$, et non $c'+2c=0$.`,
        },
      ],
      removable: [
        {
          hypothesis: 'h-base',
          label: 'Retirer la base spectrale',
          necessary: true,
          explanation: 'Sans relation spectrale, le système est en général couplé et la valeur explicite disparaît.',
          counterexample: t`Base $\psi_1=\varphi_1$, $\psi_2=\varphi_1+\varphi_2$ : matrice de masse non diagonale.`,
        },
      ],
    },
  },
  verification: FROM_POLY,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'galerkin.intermediaire',
  theoremId: 'galerkin',
  level: 'intermediaire',
  title: 'Estimations uniformes et extraction faible',
  statement: t`Dans le cadre du système de Galerkin spectral ($\|v\|_V=\|\nabla v\|_{L^2}$), démontrer que pour tout $t\in[0,T]$, $\|u_n(t)\|_H^2+\int_0^t\|u_n\|_V^2\le\|u_0\|_H^2+\int_0^t\|f\|_{V'}^2$, en déduire $\sup_t\|u_n(t)\|_H^2+\int_0^T\|u_n\|_V^2\le 2\big(\|u_0\|_H^2+\|f\|_{L^2(0,T;V')}^2\big)$, borner $(u_n')$ dans $L^2(0,T;V')$, et extraire une sous-suite faiblement convergente dont on identifie la dérivée.`,
  source: poly(44, 'Exercice 34, intermédiaire (p. PDF 44) ; sections 8.3 et 8.4 (p. PDF 32)'),
  prerequisites: [],
  concepts: ['galerkin-estimation', 'galerkin-projection', 'faible-fort', 'bornee-non-convergente'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-gal', kind: 'hypothese', text: t`$u_n$ résout le système de Galerkin spectral : coefficients absolument continus, $u_n(0)=P_nu_0$, $(u_n',v)_H+\int\nabla u_n\cdot\nabla v=\langle f,v\rangle$ pour $v\in V_n$.` },
      { id: 'h-base', kind: 'hypothese', text: t`$(\varphi_k)$ base orthonormée de $H$, $\int\nabla\varphi_j\cdot\nabla\varphi_k=\lambda_j\delta_{jk}$, et $\|v\|_V^2=\sum_k\lambda_k(v,\varphi_k)_H^2$ pour $v\in V$.` },
      { id: 'ident', kind: 'egalite', text: t`$\frac12\frac{d}{dt}\|u_n\|_H^2+\|u_n\|_V^2=\langle f,u_n\rangle$ presque partout.` },
      { id: 'young', kind: 'inegalite', text: t`$\langle f,u_n\rangle\le\frac12\|f\|_{V'}^2+\frac12\|u_n\|_V^2$.` },
      { id: 'int', kind: 'inegalite', text: t`$\|u_n(t)\|_H^2+\int_0^t\|u_n\|_V^2\le\|P_nu_0\|_H^2+\int_0^t\|f\|_{V'}^2$ pour tout $t\in[0,T]$.` },
      { id: 'pn', kind: 'inegalite', text: t`$\|P_nu_0\|_H\le\|u_0\|_H$ et $\|P_nv\|_V\le\|v\|_V$ pour $v\in V$.` },
      { id: 'est', kind: 'inegalite', text: t`Pour tout $t\in[0,T]$ : $\|u_n(t)\|_H^2+\int_0^t\|u_n\|_V^2\le\|u_0\|_H^2+\int_0^t\|f\|_{V'}^2$.` },
      { id: 'est2', kind: 'inegalite', text: t`$\sup_{t}\|u_n(t)\|_H^2+\int_0^T\|u_n\|_V^2\le 2\big(\|u_0\|_H^2+\|f\|_{L^2(0,T;V')}^2\big)$.` },
      { id: 'dual', kind: 'inegalite', text: t`$\|u_n'(t)\|_{V'}\le\|f(t)\|_{V'}+\|u_n(t)\|_V$ presque partout.` },
      { id: 'deriv', kind: 'consequence', text: t`$\sup_n\|u_n'\|_{L^2(0,T;V')}<\infty$.` },
      { id: 'ext', kind: 'application-theoreme', text: t`Après extraction : $u_n\rightharpoonup u$ dans $L^2(0,T;V)$ et $u_n'\rightharpoonup g$ dans $L^2(0,T;V')$.` },
      { id: 'gu', kind: 'egalite', text: t`$g=u'$ au sens des distributions à valeurs dans $V'$.` },
      { id: 'fin', kind: 'conclusion', text: t`Les estimations uniformes (forme corrigée) sont établies, et une sous-suite converge faiblement, avec $u_n'\rightharpoonup u'$.` },
      { id: 'x-poly', kind: 'inegalite', distractor: true, after: ['est'], text: t`$\sup_{t}\|u_n(t)\|_H^2+\int_0^T\|u_n\|_V^2\le\|u_0\|_H^2+\|f\|_{L^2(0,T;V')}^2$.` },
      { id: 'x-fort', kind: 'consequence', distractor: true, after: ['ext'], text: t`Toute suite bornée de $L^2(0,T;V)$ admet une sous-suite fortement convergente dans $L^2(0,T;V)$.` },
      { id: 'x-proj', kind: 'inegalite', distractor: true, after: ['pn'], text: t`Pour tout sous-espace $W\subset V$ de dimension finie, la projection orthogonale $P_W$ de $H$ sur $W$ vérifie $\|P_Wv\|_V\le\|v\|_V$.` },
    ],
    justifications: [
      { id: 'j-test', label: t`Tester par $v=u_n(t)\in V_n$ : $(u_n',u_n)_H=\frac12\frac{d}{dt}\|u_n\|_H^2$ en dimension finie.` },
      { id: 'j-young', label: t`$\langle f,u_n\rangle\le\|f\|_{V'}\|u_n\|_V$, puis $ab\le\frac{a^2+b^2}2$.`, theorem: 'young' },
      { id: 'j-int', label: t`Absorber $\frac12\|u_n\|_V^2$, multiplier par $2$, intégrer de $0$ à $t$.` },
      { id: 'j-spec', label: t`$P_n$ tronque le développement dans $(\varphi_k)$ : il diminue $\sum_k(v,\varphi_k)^2$ et $\sum_k\lambda_k(v,\varphi_k)^2$.` },
      { id: 'j-report', label: t`Report de $\|P_nu_0\|_H\le\|u_0\|_H$.` },
      { id: 'j-deux', label: t`Pour chaque $t$, $\|u_n(t)\|_H^2$ et $\int_0^T\|u_n\|_V^2$ sont chacun majorés par le second membre pris en $t=T$ ; on additionne.` },
      { id: 'j-dual', label: t`$\langle u_n',v\rangle=(u_n',P_nv)_H=\langle f,P_nv\rangle-\int\nabla u_n\cdot\nabla(P_nv)$, puis $\|P_nv\|_V\le\|v\|_V$.` },
      { id: 'j-carre', label: 'Carré, intégration en temps, et estimation précédente.' },
      { id: 'j-extr', label: t`Extraction faible dans les espaces réflexifs $L^2(0,T;V)$ et $L^2(0,T;V')$.`, theorem: 'extraction-reflexive' },
      { id: 'j-ipp', label: t`$\int_0^T\langle u_n',v\rangle\eta=-\int_0^T(u_n,v)_H\eta'$ pour $v\in V$, $\eta\in C^\infty_c(]0,T[)$, puis passage à la limite faible.` },
      { id: 'j-syn', label: 'Réunion des résultats établis.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-sans-2', label: t`Le $\sup$ en $t$ et l'intégrale sur $[0,T]$ se majorent ensemble par le même second membre, sans facteur.` },
    ],
    rules: [
      { from: ['h-gal'], to: 'ident', by: 'j-test' },
      { from: ['ident'], to: 'young', by: 'j-young' },
      { from: ['ident', 'young'], to: 'int', by: 'j-int' },
      { from: ['h-base'], to: 'pn', by: 'j-spec' },
      { from: ['int', 'pn'], to: 'est', by: 'j-report' },
      { from: ['est'], to: 'est2', by: 'j-deux' },
      { from: ['h-gal', 'pn'], to: 'dual', by: 'j-dual' },
      { from: ['dual', 'est2'], to: 'deriv', by: 'j-carre' },
      { from: ['est2', 'deriv'], to: 'ext', by: 'j-extr' },
      { from: ['ext', 'h-gal'], to: 'gu', by: 'j-ipp' },
      { from: ['est', 'est2', 'deriv', 'gu'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-poly',
        verdict: 'incorrect',
        concept: 'galerkin-estimation',
        message: t`Cette inégalité, écrite au polycopié (p. PDF 31 et 32), est fausse : le $\sup$ et l'intégrale sont majorés séparément par le second membre, et leur somme demande un facteur $2$.`,
        counterexample: t`$f=0$, $u_0=\varphi_1$ : $u_n(t)=e^{-\lambda_1t}\varphi_1$, le membre de gauche vaut $1+\frac{1-e^{-2\lambda_1T}}2>1$, le membre de droite vaut $1$.`,
      },
      {
        conclusion: 'est2',
        by: 'j-sans-2',
        verdict: 'incorrect',
        concept: 'galerkin-estimation',
        message: t`L'inégalité intégrée majore la somme à $t$ fixé ; le $\sup$ du premier terme et l'intégrale jusqu'à $T$ ne sont pas atteints au même instant.`,
        counterexample: t`$f=0$, $u_0=\varphi_1$ : $\sup_t\|u_n\|_H^2=1$ (en $t=0$) et $\int_0^T\|u_n\|_V^2=\frac{1-e^{-2\lambda_1T}}2>0$.`,
      },
      {
        conclusion: 'x-fort',
        verdict: 'incorrect',
        concept: 'bornee-non-convergente',
        message: 'Une borne dans un espace réflexif ne donne qu’une sous-suite faiblement convergente.',
        counterexample: t`$v_n(t)=\sin(nt)\,w$ avec $w\in V$ non nul : bornée dans $L^2(0,T;V)$, $v_n\rightharpoonup 0$, et $\|v_n\|_{L^2(0,T;V)}\not\to 0$.`,
      },
      {
        conclusion: 'x-proj',
        verdict: 'incorrect',
        concept: 'galerkin-projection',
        message: t`La stabilité $\|P_nv\|_V\le\|v\|_V$ est propre au choix spectral ; elle tombe pour un sous-espace quelconque.`,
        counterexample: t`Sur $]0,1[$, $W=\mathrm{Vect}(\varphi_1+\varphi_2)$, $v=\varphi_1$ : $P_Wv=\frac{\varphi_1+\varphi_2}2$ et $\|P_Wv\|_V^2/\|v\|_V^2=\frac{\pi^2+4\pi^2}{4\pi^2}=\frac54$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'pn',
        label: t`Ne plus disposer de la stabilité de $P_n$`,
        necessary: true,
        explanation: t`La borne de $u_n'$ dans $L^2(0,T;V')$ repose sur $\|P_nv\|_V\le\|v\|_V$, et l'estimation sur $\|P_nu_0\|_H\le\|u_0\|_H$.`,
        counterexample: t`Pour un sous-espace non spectral, $\|P_Wv\|_V$ peut dépasser $\|v\|_V$ : rapport $\frac54$ pour $W=\mathrm{Vect}(\varphi_1+\varphi_2)$ et $v=\varphi_1$ sur $]0,1[$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Pour $f=0$, $u_0=\varphi_1$ : limite quand $T\to+\infty$ de $\sup_t\|u(t)\|_H^2+\int_0^T\|u\|_V^2$`, expected: '3/2' }],
  solution: t`**Identité.** Le test $v=u_n(t)$ donne $\frac12\frac{d}{dt}\|u_n\|_H^2+\|u_n\|_V^2=\langle f,u_n\rangle\le\frac12\|f\|_{V'}^2+\frac12\|u_n\|_V^2$.

**Estimation, forme correcte.** Après absorption et intégration, pour tout $t\in[0,T]$ :
$$\|u_n(t)\|_H^2+\int_0^t\|u_n\|_V^2\le\|u_0\|_H^2+\int_0^t\|f\|_{V'}^2,$$
car $\|P_nu_0\|_H\le\|u_0\|_H$. Chacun des deux termes $\sup_t\|u_n(t)\|_H^2$ et $\int_0^T\|u_n\|_V^2$ est majoré par le second membre en $t=T$ ; d'où $\sup_t\|u_n\|_H^2+\int_0^T\|u_n\|_V^2\le 2(\|u_0\|_H^2+\|f\|^2_{L^2(V')})$. **Le facteur 2 est nécessaire** : l'inégalité sans facteur, écrite au polycopié, est fausse ($f=0$, $u_0=\varphi_1$ donne $1+\frac{1-e^{-2\lambda_1T}}2>1$).

**Dérivée.** Pour $v\in V$, $\langle u_n',v\rangle=\langle f,P_nv\rangle-\int\nabla u_n\cdot\nabla P_nv$, et $\|P_nv\|_V\le\|v\|_V$ : $\|u_n'(t)\|_{V'}\le\|f(t)\|_{V'}+\|u_n(t)\|_V$, donc $(u_n')$ est bornée dans $L^2(0,T;V')$.

**Extraction.** Par réflexivité, $u_n\rightharpoonup u$ dans $L^2(0,T;V)$ et $u_n'\rightharpoonup g$ dans $L^2(0,T;V')$ ; l'intégration par parties contre $\eta(t)v$ passe à la limite et donne $g=u'$. Ces convergences sont faibles ; aucune convergence forte n'est affirmée.`,
  steps: [
    t`Tester par $u_n(t)$ et appliquer Young.`,
    t`Intégrer de $0$ à $t$ : estimation pour chaque $t$.`,
    t`Passer au $\sup$ et à $\int_0^T$ séparément : facteur $2$.`,
    t`Borner $u_n'$ par dualité grâce à la projection spectrale.`,
    'Extraire et identifier la dérivée limite.',
  ],
  commonErrors: [
    { id: 'e-sans-2', description: 'Additionner le sup en temps et l’intégrale sur [0,T] sans facteur 2.', concept: 'galerkin-estimation' },
    { id: 'e-proj', description: t`Utiliser $\|P_nv\|_V\le\|v\|_V$ pour une base quelconque.`, concept: 'galerkin-projection' },
    { id: 'e-fort', description: 'Affirmer une convergence forte à partir des seules bornes.', concept: 'bornee-non-convergente' },
  ],
  hints: [
    t`Par quoi tester l'équation pour faire apparaître $\frac{d}{dt}\|u_n\|_H^2$ ?`,
    t`Intègre de $0$ à $t$ et garde le $t$ : l'inégalité vaut pour chaque $t$. Le $\sup$ en $t$ et l'intégrale jusqu'à $T$ sont-ils atteints au même instant ?`,
    t`Pour $u_n'$ : $\langle u_n',v\rangle=(u_n',P_nv)_H$ et l'équation testée par $P_nv\in V_n$.`,
  ],
  rubric: rubric({
    hypotheses: t`Le rôle de la base spectrale ($\|P_nv\|_V\le\|v\|_V$) est explicité.`,
    methode: 'Test par la solution, Young, intégration, dualité, extraction.',
    validite: 'Le facteur 2 est présent dans l’estimation globale.',
    justifications: 'Les convergences obtenues sont faibles, et nommées comme telles.',
    conclusion: t`Bornes uniformes et identification $g=u'$ sont obtenues.`,
  }),
  variant: {
    statement: t`Même question pour $\partial_tu-\Delta u+u=f$.`,
    solution: t`Le test par $u_n$ donne $\frac12\frac{d}{dt}\|u_n\|_H^2+\|u_n\|_V^2+\|u_n\|_H^2=\langle f,u_n\rangle\le\frac12\|f\|_{V'}^2+\frac12\|u_n\|_V^2$, d'où, pour tout $t$, $\|u_n(t)\|_H^2+\int_0^t\big(\|u_n\|_V^2+2\|u_n\|_H^2\big)\le\|u_0\|_H^2+\int_0^t\|f\|_{V'}^2$, et le même facteur $2$ dans l'estimation globale. La borne de $u_n'$ gagne le terme $\|u_n\|_H\le C\|u_n\|_V$.`,
  },
  verification: CORRIGE,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'galerkin.difficile',
  theoremId: 'galerkin',
  level: 'difficile',
  title: t`Passage à la limite dans $\partial_tu-\Delta u+g(u)=f$`,
  statement: t`Soit $g:\mathbb R\to\mathbb R$ $L$-lipschitzienne, croissante, avec $g(0)=0$. Dans le cadre du problème parabolique de Dirichlet ($\Omega$ borné lipschitzien, $u_0\in H$, $f\in L^2(0,T;V')$), construire par Galerkin spectral une solution faible de $\partial_tu-\Delta u+g(u)=f$, $u=0$ au bord, $u(0)=u_0$ : estimations, extraction, convergence forte, passage à la limite dans $g(u_n)$, condition initiale, unicité.`,
  source: poly(44, 'Exercice 34, difficile (p. PDF 44) ; section 8.7 (p. PDF 33)'),
  prerequisites: [],
  concepts: ['nonlinearite-limite-faible', 'temps-compacite', 'galerkin-estimation', 'valeur-initiale'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    paths: [
      { id: 'monotonie', label: t`Unicité par croissance de $g$` },
      { id: 'gronwall', label: t`Unicité par Lipschitz et Grönwall` },
    ],
    nodes: [
      { id: 'h-g', kind: 'hypothese', text: t`$g$ est $L$-lipschitzienne, croissante, et $g(0)=0$.` },
      { id: 'h-data', kind: 'hypothese', text: t`$V=H^1_0(\Omega)\hookrightarrow H=L^2(\Omega)$ compacte (Rellich), $u_0\in H$, $f\in L^2(0,T;V')$, base spectrale $(\varphi_k)$ avec $\|P_nv\|_V\le\|v\|_V$.` },
      { id: 'gal', kind: 'application-theoreme', text: t`Le système de Galerkin avec le terme $(g(u_n),v)_H$ admet une unique solution $u_n$ sur $[0,T]$.` },
      { id: 'sign', kind: 'inegalite', text: t`$(g(u_n),u_n)_H\ge 0$.` },
      { id: 'est', kind: 'inegalite', text: t`Pour tout $t$ : $\|u_n(t)\|_H^2+\int_0^t\|u_n\|_V^2\le\|u_0\|_H^2+\int_0^t\|f\|_{V'}^2$.` },
      { id: 'der', kind: 'consequence', text: t`$\|g(u_n)\|_H\le L\|u_n\|_H$, et $(u_n')$ est bornée dans $L^2(0,T;V')$.` },
      { id: 'ext', kind: 'application-theoreme', text: t`Après extraction : $u_n\rightharpoonup u$ dans $L^2(0,T;V)$ et $u_n'\rightharpoonup u'$ dans $L^2(0,T;V')$.` },
      { id: 'fort', kind: 'application-theoreme', text: t`Quitte à extraire encore : $u_n\to u$ fortement dans $L^2(0,T;H)$.` },
      { id: 'lip', kind: 'inegalite', text: t`$\|g(u_n)-g(u)\|_{L^2(0,T;H)}\le L\|u_n-u\|_{L^2(0,T;H)}\to 0$.` },
      { id: 'lim', kind: 'consequence', text: t`$\langle u',v\rangle+\int\nabla u\cdot\nabla v+(g(u),v)_H=\langle f,v\rangle$ pour tout $v\in V$ et presque tout $t$.` },
      { id: 'init', kind: 'egalite', text: t`$u\in C([0,T];H)$ et $u(0)=u_0$.` },
      { id: 'uniq', kind: 'consequence', text: t`La solution est unique.` },
      { id: 'fin', kind: 'conclusion', text: t`Il existe une unique solution faible $u\in L^2(0,T;V)\cap C([0,T];H)$, $u'\in L^2(0,T;V')$, avec $u(0)=u_0$.` },
      { id: 'x-faible-g', kind: 'consequence', distractor: true, after: ['ext'], text: t`$u_n\rightharpoonup u$ dans $L^2(0,T;V)$ suffit à obtenir $g(u_n)\rightharpoonup g(u)$.` },
      { id: 'x-grad', kind: 'consequence', distractor: true, after: ['lip'], text: t`Le même argument (Aubin–Lions puis Lipschitz) passe à la limite dans un terme $G(\nabla u)$ avec $G$ lipschitzienne.` },
    ],
    justifications: [
      { id: 'j-cara', label: t`Champ des coefficients mesurable en temps, intégrable en temps à $c$ fixé, lipschitzien en $c$ uniformément en $t$ : $|(g(u)-g(w),\varphi_j)_H|\le L\|u-w\|_H$ ; existence et unicité globales.`, theorem: 'theoreme-cauchy-lipschitz' },
      { id: 'j-sign', label: t`$g$ croissante et $g(0)=0$ donnent $g(r)r\ge 0$ pour tout $r$, puis intégration.` },
      { id: 'j-est', label: t`Test par $u_n$, Young, terme $(g(u_n),u_n)_H\ge 0$ abandonné, intégration de $0$ à $t$.` },
      { id: 'j-der', label: t`$|g(r)|\le L|r|$, puis dualité avec $P_nv$, comme dans le cas linéaire, et $\|P_nv\|_H\le C\|v\|_V$.` },
      { id: 'j-extr', label: 'Extraction faible dans des espaces réflexifs, puis identification de la dérivée.', theorem: 'extraction-reflexive' },
      { id: 'j-al', label: t`Aubin–Lions : borne dans $L^2(0,T;V)$, borne de la dérivée dans $L^2(0,T;V')$, injection $V\hookrightarrow H$ compacte.`, theorem: 'aubin-lions' },
      { id: 'j-lip', label: t`$|g(a)-g(b)|\le L|a-b|$ ponctuellement, puis intégration en espace et en temps.` },
      { id: 'j-lim', label: t`Équation testée par $\varphi_k\eta$, $n\ge k$ : convergences faibles pour les termes linéaires, convergence forte pour $g(u_n)$ ; puis densité des $\varphi_k$ dans $V$.` },
      { id: 'j-lm', label: t`Lions–Magenes donne $u\in C([0,T];H)$ ; test par $\eta\in C^1([0,T])$, $\eta(T)=0$, et $(P_nu_0,\varphi_k)_H=(u_0,\varphi_k)_H$ pour $n\ge k$.`, theorem: 'lions-magenes' },
      { id: 'j-mono', label: t`Pour $w=u-v$ : $\frac12\|w(t)\|_H^2+\int_0^t\|w\|_V^2+\int_0^t(g(u)-g(v),w)_H=0$, le dernier terme étant positif par croissance de $g$.`, theorem: 'lions-magenes' },
      { id: 'j-gron', label: t`$\frac12\frac{d}{dt}\|w\|_H^2\le L\|w\|_H^2$ et $w(0)=0$ : Grönwall donne $w=0$.`, theorem: 'gronwall' },
      { id: 'j-syn', label: 'Réunion de l’existence, de la condition initiale et de l’unicité.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-faible', label: t`La convergence faible de $u_n$ dans $L^2(0,T;V)$ suffit, $g$ étant lipschitzienne.` },
      { id: 'j-poly', label: t`Estimation du polycopié : $\sup_t\|u_n\|_H^2+\int_0^T\|u_n\|_V^2\le\|u_0\|_H^2+\|f\|_{L^2(V')}^2$.` },
    ],
    rules: [
      { from: ['h-g', 'h-data'], to: 'gal', by: 'j-cara' },
      { from: ['h-g', 'gal'], to: 'sign', by: 'j-sign' },
      { from: ['gal', 'sign', 'h-data'], to: 'est', by: 'j-est' },
      { from: ['est', 'h-g', 'h-data'], to: 'der', by: 'j-der' },
      { from: ['est', 'der'], to: 'ext', by: 'j-extr' },
      { from: ['est', 'der', 'h-data'], to: 'fort', by: 'j-al' },
      { from: ['fort', 'h-g'], to: 'lip', by: 'j-lip' },
      { from: ['ext', 'lip', 'h-data'], to: 'lim', by: 'j-lim' },
      { from: ['lim', 'ext', 'h-data'], to: 'init', by: 'j-lm' },
      { from: ['lim', 'init', 'h-g'], to: 'uniq', by: 'j-mono', path: 'monotonie' },
      { from: ['lim', 'init', 'h-g'], to: 'uniq', by: 'j-gron', path: 'gronwall' },
      { from: ['lim', 'init', 'uniq'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-faible-g',
        verdict: 'incorrect',
        concept: 'nonlinearite-limite-faible',
        message: t`Une non-linéarité, même lipschitzienne et croissante, ne passe pas à la limite faible : ici, c'est la convergence forte d'Aubin–Lions qui permet de conclure.`,
        counterexample: t`Sur $\Omega=]0,1[$, $\varphi_1=\sqrt2\sin\pi x>0$, $g(r)=\max(r,0)$ et $w_n(t,x)=\sin(2\pi nt/T)\,\varphi_1(x)$ : $w_n\rightharpoonup 0$ dans $L^2(0,T;V)$, mais $g(w_n)=\max(\sin(2\pi nt/T),0)\,\varphi_1\rightharpoonup\frac1\pi\varphi_1\neq g(0)$ dans $L^2(0,T;H)$.`,
      },
      {
        conclusion: 'lip',
        by: 'j-faible',
        verdict: 'incorrect',
        concept: 'nonlinearite-limite-faible',
        message: 'L’inégalité de Lipschitz transporte une convergence forte, jamais une convergence faible.',
        counterexample: t`Sur $]0,1[$, avec $\varphi_1=\sqrt2\sin\pi x>0$ : $w_n(t,x)=\sin(2\pi nt/T)\,\varphi_1(x)\rightharpoonup 0$ dans $L^2(0,T;V)$, et $\max(w_n,0)\rightharpoonup\frac1\pi\varphi_1\neq 0$ dans $L^2(0,T;H)$.`,
      },
      {
        conclusion: 'x-grad',
        verdict: 'incorrect',
        concept: 'faible-fort',
        message: t`Aubin–Lions donne la convergence forte de $u_n$ dans $L^2(0,T;H)$, pas celle des gradients : une non-linéarité en gradient demande un autre argument, par exemple celui de Minty pour un opérateur monotone, avec l'hypothèse du $\limsup$ démontrée d'abord.`,
        counterexample: t`$u_n=\frac{\sin(2\pi nx)}{2\pi n}\to 0$ dans $L^2(]0,1[)$, et pour $G(r)=\max(r,0)$ : $G(u_n')=\max(\cos(2\pi nx),0)\rightharpoonup\frac1\pi\neq G(0)$.`,
      },
      {
        conclusion: 'est',
        by: 'j-poly',
        verdict: 'incorrect',
        concept: 'galerkin-estimation',
        message: t`Cette estimation est fausse telle quelle (facteur $2$ manquant), et elle ne donne pas la borne à $t$ fixé dont on a besoin.`,
        counterexample: t`$g=0$, $f=0$, $u_0=\varphi_1$ : le membre de gauche vaut $1+\frac{1-e^{-2\lambda_1T}}2>1$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'fort',
        label: 'Ne plus disposer de la convergence forte',
        necessary: true,
        explanation: t`Sans convergence forte, la seule convergence faible ne permet plus de passer à la limite dans $g(u_n)$ par cet argument.`,
        counterexample: t`$g(r)=\max(r,0)$ et, sur $]0,1[$ avec $\varphi_1=\sqrt2\sin\pi x>0$, $w_n(t,x)=\sin(2\pi nt/T)\,\varphi_1(x)\rightharpoonup 0$ dans $L^2(0,T;V)$ : $g(w_n)\rightharpoonup\frac1\pi\varphi_1\neq g(0)$ dans $L^2(0,T;H)$.`,
      },
      {
        hypothesis: 'sign',
        label: t`Ne plus disposer de $(g(u_n),u_n)_H\ge 0$`,
        necessary: true,
        explanation: t`Sans ce signe, l'estimation sous cette forme peut tomber ; seule une estimation avec facteur exponentiel subsiste, par Grönwall.`,
        counterexample: t`Sur $]0,2\pi[$, $\lambda_1=\frac14$ ; pour $g(r)=-r$, $f=0$, $u_0=\varphi_1$ : $u(t)=e^{3t/4}\varphi_1$ et $\|u(t)\|_H^2=e^{3t/2}>\|u_0\|_H^2$.`,
      },
    ],
  },
  solution: t`**Galerkin.** Le champ des coefficients est mesurable en temps et lipschitzien en $c$, car $|(g(u)-g(w),\varphi_j)_H|\le L\|u-w\|_H$ : le système admet une unique solution $u_n$.

**Estimations.** $g$ croissante et $g(0)=0$ donnent $g(r)r\ge 0$, donc $(g(u_n),u_n)_H\ge 0$ : le test par $u_n$ fournit la même estimation que dans le cas linéaire, sous sa forme correcte, pour tout $t$ : $\|u_n(t)\|_H^2+\int_0^t\|u_n\|_V^2\le\|u_0\|_H^2+\int_0^t\|f\|_{V'}^2$. Comme $\|g(u_n)\|_H\le L\|u_n\|_H$, la borne de $u_n'$ dans $L^2(0,T;V')$ persiste.

**Convergences.** Extraction faible dans $L^2(0,T;V)$ et $L^2(0,T;V')$, puis Aubin–Lions (avec Rellich) : $u_n\to u$ fortement dans $L^2(0,T;H)$. Par Lipschitz, $g(u_n)\to g(u)$ dans $L^2(0,T;H)$. C'est la convergence forte qui permet ici ce passage à la limite : une non-linéarité ne passe pas, en général, à la limite faible.

**Équation limite et condition initiale.** On teste par $\varphi_k\eta$, on passe à la limite terme à terme, puis on conclut par densité. Lions–Magenes donne $u\in C([0,T];H)$, et le test par $\eta\in C^1([0,T])$, $\eta(T)=0$, identifie $u(0)=u_0$.

**Unicité.** Pour deux solutions, $w=u-v$ vérifie $\frac12\|w(t)\|_H^2+\int_0^t\|w\|_V^2+\int_0^t(g(u)-g(v),w)_H=0$, et le dernier terme est positif : $w=0$. (Variante : Lipschitz et Grönwall.)

**Vigilance.** Pour une non-linéarité en gradient, Aubin–Lions ne suffit pas : il faut d'autres arguments, notamment celui de Minty pour un opérateur monotone.`,
  steps: [
    'Résoudre le système de Galerkin non linéaire.',
    t`Obtenir l'estimation corrigée grâce à $g(r)r\ge 0$, puis la borne de $u_n'$.`,
    'Extraire, puis appliquer Aubin–Lions pour la convergence forte.',
    t`Passer à la limite dans $g(u_n)$ par Lipschitz, puis dans l'équation.`,
    'Identifier la condition initiale et démontrer l’unicité.',
  ],
  commonErrors: [
    { id: 'e-faible', description: t`Passer à la limite dans $g(u_n)$ avec la seule convergence faible.`, concept: 'nonlinearite-limite-faible' },
    { id: 'e-grad', description: 'Traiter une non-linéarité en gradient par Aubin–Lions et Lipschitz.', concept: 'faible-fort' },
    { id: 'e-poly', description: 'Reprendre l’estimation a priori du polycopié sans le facteur 2.', concept: 'galerkin-estimation' },
  ],
  hints: [
    t`Quelles estimations du cas linéaire survivent au terme $g(u_n)$, et grâce à quel signe ?`,
    t`La convergence faible ne suffit pas pour $g(u_n)$ : quel résultat de compacité espace-temps est disponible avec les deux bornes obtenues ?`,
    t`Aubin–Lions donne $u_n\to u$ dans $L^2(0,T;H)$ ; Lipschitz transporte cette convergence à $g(u_n)$. Pour l'unicité, teste par la différence de deux solutions.`,
  ],
  rubric: rubric({
    hypotheses: t`Chaque propriété de $g$ (Lipschitz, croissance, $g(0)=0$) est utilisée à sa place.`,
    methode: 'Galerkin, estimation corrigée, extraction, Aubin–Lions, Lipschitz, Lions–Magenes.',
    validite: t`La convergence forte précède le passage à la limite dans $g(u_n)$.`,
    justifications: 'La compacité est justifiée, et la limite des gradients n’est pas affirmée.',
    conclusion: 'Existence, condition initiale et unicité sont établies.',
  }),
  variant: {
    statement: t`Reprendre la construction avec $g$ seulement $L$-lipschitzienne et $g(0)=0$, sans croissance.`,
    solution: t`On a $(g(u_n),u_n)_H\ge -L\|u_n\|_H^2$, d'où $\frac{d}{dt}\|u_n\|_H^2+\|u_n\|_V^2\le\|f\|_{V'}^2+2L\|u_n\|_H^2$. Grönwall donne $\|u_n(t)\|_H^2+\int_0^t\|u_n\|_V^2\le e^{2Lt}\big(\|u_0\|_H^2+\int_0^t\|f\|_{V'}^2\big)$ : les bornes restent uniformes en $n$. Extraction, Aubin–Lions et Lipschitz s'appliquent sans changement. L'unicité s'obtient par Grönwall : $\frac12\frac{d}{dt}\|w\|_H^2\le L\|w\|_H^2$ avec $w(0)=0$.`,
  },
  verification: CORRIGE,
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT34: TheoremModule = {
  theorem: {
    id: 'galerkin',
    spaces: [
      t`$\Omega\subset\mathbb R^d$ borné lipschitzien, $T>0$ ; $V=H^1_0(\Omega)$, de norme $\|v\|_V=\|\nabla v\|_{L^2}$, $H=L^2(\Omega)$, $V'=H^{-1}(\Omega)$.`,
      t`Triplet $V\hookrightarrow H\hookrightarrow V'$ ; $\langle\cdot,\cdot\rangle_{V',V}$ crochet de dualité.`,
    ],
    hypotheses: [
      { id: 'h-u0', text: t`$u_0\in L^2(\Omega)$.` },
      { id: 'h-f', text: t`$f\in L^2(0,T;H^{-1}(\Omega))$.` },
    ],
    statement: t`Il existe une unique $u\in L^2(0,T;V)$, $u'\in L^2(0,T;V')$, telle que $\langle u'(t),v\rangle_{V',V}+\int_\Omega\nabla u(t)\cdot\nabla v=\langle f(t),v\rangle_{V',V}$ pour tout $v\in V$ et presque tout $t$, et $u(0)=u_0$ dans $H$. De plus $u\in C([0,T];H)$ et, pour tout $t\in[0,T]$,
$$\|u(t)\|_H^2+\int_0^t\|u\|_V^2\le\|u_0\|_H^2+\int_0^t\|f\|_{V'}^2,\quad\text{donc}\quad\sup_{t\in[0,T]}\|u(t)\|_H^2+\int_0^T\|u\|_V^2\le 2\Big(\|u_0\|_H^2+\|f\|^2_{L^2(0,T;V')}\Big).$$`,
    conclusions: {
      existence: t`Limite faible d'approximations de Galerkin spectrales, bornées dans $L^2(0,T;V)$ avec dérivées bornées dans $L^2(0,T;V')$.`,
      unicite: t`Pour $w=u-v$ : $\frac12\|w(t)\|_H^2+\int_0^t\|w\|_V^2=\frac12\|w(0)\|_H^2=0$.`,
      regularite: t`$u\in C([0,T];H)$ par Lions–Magenes.`,
      stabilite: t`Estimation a priori corrigée : facteur $2$ dans la forme globale.`,
    },
    sourceProof: 'complete',
    proofOutline: [
      t`Approximation : $V_n=\mathrm{Vect}(\varphi_1,\dots,\varphi_n)$, base propre du Laplacien de Dirichlet ; $c_j'+\lambda_jc_j=\langle f,\varphi_j\rangle$, $c_j(0)=(u_0,\varphi_j)_H$.`,
      t`Estimations : test par $u_n$ et Young ; pour tout $t$, $\|u_n(t)\|_H^2+\int_0^t\|u_n\|_V^2\le\|u_0\|_H^2+\int_0^t\|f\|_{V'}^2$ ; puis $\|u_n'(t)\|_{V'}\le\|f(t)\|_{V'}+\|u_n(t)\|_V$ grâce à $\|P_nv\|_V\le\|v\|_V$.`,
      t`Extraction faible dans $L^2(0,T;V)$ et $L^2(0,T;V')$ ; identification $u_n'\rightharpoonup u'$. La convergence forte (Aubin–Lions) n'est pas indispensable au problème linéaire.`,
      t`Équation limite : test par $\varphi_k\eta$, passage à la limite par les convergences faibles, densité des $\varphi_k$ dans $V$.`,
      t`Condition initiale : Lions–Magenes, test par $\eta\in C^1([0,T])$ avec $\eta(T)=0$.`,
      'Unicité : test par la différence de deux solutions.',
    ],
    warnings: [
      t`Erreur du polycopié (p. PDF 31 et 32) : $\sup_t\|u\|_H^2+\int_0^T\|u\|_V^2\le\|u_0\|_H^2+\|f\|^2_{L^2(V')}$ est fausse telle quelle ; pour $f=0$ et $u_0=\varphi_1$, le membre de gauche vaut $1+\frac{1-e^{-2\lambda_1T}}2>1$. Il faut le facteur $2$.`,
      'Dans le problème linéaire, les convergences faibles suffisent ; la convergence forte n’y est pas indispensable.',
      t`Pour une non-linéarité $g(u)$, les convergences faibles ne suffisent pas en général ; dans la preuve du polycopié (section 8.7), c'est la compacité d'Aubin–Lions, puis Lipschitz, qui permet le passage à la limite.`,
      t`Pour une non-linéarité en gradient, Aubin–Lions ne suffit pas : il faut d'autres arguments, notamment celui de Minty pour un opérateur monotone, l'hypothèse du $\limsup$ étant démontrée d'abord.`,
    ],
    usefulFor: 'Construire une solution faible d’un problème d’évolution par approximation de dimension finie, estimations uniformes et passage à la limite.',
    verification: CORRIGE,
  },
  definitions: [
    {
      id: 'systeme-galerkin',
      term: 'Système de Galerkin spectral',
      statement: t`$u_n(t)=\sum_{k\le n}c_k(t)\varphi_k$ vérifie $(u_n',v)_H+\int_\Omega\nabla u_n\cdot\nabla v=\langle f,v\rangle_{V',V}$ pour tout $v\in V_n=\mathrm{Vect}(\varphi_1,\dots,\varphi_n)$, et $u_n(0)=P_nu_0$.`,
      source: poly(31, 'Section 8.2'),
    },
  ],
  concepts: [
    {
      id: 'galerkin-estimation',
      label: 'Constante de l’estimation a priori',
      reminder: t`L'inégalité intégrée vaut pour chaque $t$ ; le $\sup$ en $t$ et l'intégrale sur $[0,T]$ se majorent séparément, d'où un facteur $2$ dans la forme globale.`,
    },
    {
      id: 'galerkin-projection',
      label: 'Projection spectrale et norme de V',
      reminder: t`$\|P_nv\|_V\le\|v\|_V$ tient pour la base propre du Laplacien de Dirichlet, pas pour un sous-espace quelconque.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-galerkin-estimation',
      theoremId: 'galerkin',
      title: 'L’estimation a priori sans facteur 2',
      claim: t`$\sup_t\|u(t)\|_H^2+\int_0^T\|u\|_V^2\le\|u_0\|_H^2+\|f\|^2_{L^2(0,T;V')}$ (polycopié, p. PDF 31 et 32).`,
      correctStatement: t`Pour tout $t$ : $\|u(t)\|_H^2+\int_0^t\|u\|_V^2\le\|u_0\|_H^2+\int_0^t\|f\|_{V'}^2$ ; la forme globale porte un facteur $2$.`,
      task: t`Sur $\Omega=]0,\pi[$, $\varphi_1=\sqrt{2/\pi}\sin x$, $\lambda_1=1$, $f=0$, $u_0=\varphi_1$ : calcule la limite, quand $T\to+\infty$, de $\sup_t\|u(t)\|_H^2+\int_0^T\|u\|_V^2$.`,
      check: { kind: 'rational', prompt: 'Valeur de la limite', expected: '3/2' },
      explanation: t`$u(t)=e^{-t}\varphi_1$ : $\sup_t\|u(t)\|_H^2=1$ et $\int_0^T\|u\|_V^2=\int_0^Te^{-2t}\,dt=\frac{1-e^{-2T}}2\to\frac12$. Le membre de gauche tend vers $\frac32$, alors que le membre de droite vaut $\|u_0\|_H^2=1$.`,
      concept: 'galerkin-estimation',
      source: poly(31, 'Section 8.1, estimation a priori (erreur corrigée ; voir aussi p. PDF 32)'),
    },
    {
      id: 'ce-galerkin-gradient',
      theoremId: 'galerkin',
      title: 'Non-linéarité en gradient',
      claim: t`Aubin–Lions et une non-linéarité lipschitzienne $G$ permettent toujours de passer à la limite dans $G(\nabla u_n)$.`,
      correctStatement: t`Aubin–Lions donne la convergence forte de $u_n$, pas celle des gradients : pour $G(\nabla u)$, il faut un autre argument, par exemple celui de Minty lorsque l'opérateur est monotone.`,
      task: t`Sur $]0,1[$, $u_n=\frac{\sin(2\pi nx)}{2\pi n}\to 0$ dans $L^2$ et $G(r)=\min(r^2,1)$, lipschitzienne. Calcule la limite faible constante de $G(u_n')$.`,
      check: { kind: 'rational', prompt: t`Limite faible de $G(u_n')$`, expected: '1/2' },
      explanation: t`$u_n'=\cos(2\pi nx)$, donc $G(u_n')=\cos^2(2\pi nx)=\frac{1+\cos(4\pi nx)}2\rightharpoonup\frac12$, alors que $G(0)=0$ : la limite du terme non linéaire n'est pas $G$ de la limite.`,
      concept: 'nonlinearite-limite-faible',
      source: poly(33, 'Section 8.7, point de vigilance'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT34;
