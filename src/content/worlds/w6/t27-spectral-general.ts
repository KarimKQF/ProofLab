/**
 * Résultat 27 — Théorème spectral général et calcul fonctionnel (polycopié, section 6.5).
 * La démonstration est admise au polycopié : les exercices travaillent ce qui est
 * réellement démontrable (cas diagonal, domaine de A^{1/2}, comparaison de deux spectres).
 */
import { t, rubric, poly, complement, FROM_POLY, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'spectral-general.facile',
  theoremId: 'spectral-general',
  level: 'facile',
  title: t`Calcul fonctionnel d'un opérateur diagonal sur $\ell^2$`,
  statement: t`Soit $H=\ell^2(\mathbb N^*)$ complexe, $(e_n)_{n\ge1}$ sa base canonique, $(\lambda_n)_{n\ge1}$ une suite réelle et $A$ l'opérateur diagonal défini par $D(A)=\{u\in H:\sum_n\lambda_n^2|u_n|^2<\infty\}$, $(Au)_n=\lambda_nu_n$. Pour $B\subset\mathbb R$ borélien, on pose $E(B)u=\sum_{n:\lambda_n\in B}u_ne_n$.

Établir la définition exacte de $f(A)$ pour $f:\mathbb R\to\mathbb C$ borélienne : montrer que $E$ est une mesure spectrale représentant $A$, que $D(f(A))=\{u\in H:\sum_n|f(\lambda_n)|^2|u_n|^2<\infty\}$, que $(f(A)u)_n=f(\lambda_n)u_n$, puis que $D(f(A))=H$ si et seulement si la suite $(f(\lambda_n))_n$ est bornée, avec alors $\|f(A)\|=\sup_n|f(\lambda_n)|$.`,
  source: poly(43, 'Exercice 27, facile (p. PDF 43) ; section 6.5 (p. PDF 25)'),
  prerequisites: [],
  concepts: ['spectral-general-calcul-fonctionnel', 'domaine-operateur', 'hypotheses-theoreme', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-cadre', kind: 'hypothese', text: t`$H=\ell^2(\mathbb N^*)$ est complexe, de produit scalaire $\langle u,v\rangle=\sum_nu_n\overline{v_n}$, $(e_n)$ est sa base canonique, et $f:\mathbb R\to\mathbb C$ est borélienne.` },
      { id: 'h-reels', kind: 'hypothese', text: t`La suite $(\lambda_n)_{n\ge1}$ est réelle.` },
      { id: 'd-A', kind: 'definition', text: t`$D(A)=\{u\in H:\sum_n\lambda_n^2|u_n|^2<\infty\}$ et $(Au)_n=\lambda_nu_n$ pour $u\in D(A)$.` },
      { id: 'd-E', kind: 'definition', text: t`Pour $B\subset\mathbb R$ borélien : $E(B)u=\sum_{n:\lambda_n\in B}u_ne_n$.` },
      { id: 'd-fA', kind: 'definition', text: t`Calcul fonctionnel associé à $E$ : pour $f$ borélienne, $D(f(A))=\{u\in H:\int_{\mathbb R}|f|^2\,d\mu_u<\infty\}$ où $\mu_u(B)=\|E(B)u\|^2$, et $\langle f(A)u,v\rangle=\int_{\mathbb R}f\,d\mu_{u,v}$ pour $u\in D(f(A))$, $v\in H$, où $\mu_{u,v}(B)=\langle E(B)u,v\rangle$.` },

      { id: 'E-proj', kind: 'consequence', text: t`Chaque $E(B)$ est une projection orthogonale, $E(\emptyset)=0$, $E(\mathbb R)=I$, $E(B\cap C)=E(B)E(C)$, et $E$ est fortement $\sigma$-additive : $E$ est une mesure spectrale.` },
      { id: 'mu-val', kind: 'egalite', text: t`Pour tout $u\in H$ et tout borélien $B$ : $\mu_u(B)=\sum_{n:\lambda_n\in B}|u_n|^2$.` },
      { id: 'int-val', kind: 'egalite', text: t`Pour tout $u\in H$ : $\int_{\mathbb R}|f|^2\,d\mu_u=\sum_n|f(\lambda_n)|^2|u_n|^2$.` },
      { id: 'dom-val', kind: 'egalite', text: t`$D(f(A))=\{u\in H:\sum_n|f(\lambda_n)|^2|u_n|^2<\infty\}$.` },
      { id: 'mu-croise', kind: 'egalite', text: t`Pour tout $u\in H$, $k\ge1$ et $B$ borélien : $\mu_{u,e_k}(B)=\mathbb 1_B(\lambda_k)\,u_k$.` },
      { id: 'action', kind: 'egalite', text: t`Pour $u\in D(f(A))$ et $k\ge1$ : $(f(A)u)_k=f(\lambda_k)\,u_k$.` },
      { id: 'repr-A', kind: 'egalite', text: t`$E$ représente $A$ : pour $f(\lambda)=\lambda$, les deux formules redonnent le domaine et l'action de $A$.` },
      { id: 'borne', kind: 'inegalite', text: t`Si $C=\sup_n|f(\lambda_n)|<\infty$, alors $D(f(A))=H$ et $\|f(A)\|=C$.` },
      { id: 'temoin', kind: 'consequence', text: t`Si $(f(\lambda_n))_n$ n'est pas bornée, il existe $u\in H$ tel que $u\notin D(f(A))$.` },
      {
        id: 'exemple',
        kind: 'egalite',
        text: t`Pour $\lambda_n=n$ et $f(\lambda)=\dfrac1{1+|\lambda|}$ : $\|f(A)\|=\dfrac12$.`,
        masked: t`Pour $\lambda_n=n$ et $f(\lambda)=\dfrac1{1+|\lambda|}$ : valeur de $\|f(A)\|$ à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\|f(A)\|$ pour $\lambda_n=n$ et $f(\lambda)=1/(1+|\lambda|)$`, expected: '1/2' },
      },
      { id: 'fin', kind: 'conclusion', text: t`$E$ est une mesure spectrale représentant $A$ ; $D(f(A))$ et $f(A)$ sont identifiés coordonnée par coordonnée, et $D(f(A))=H$ si et seulement si $(f(\lambda_n))_n$ est bornée.` },

      // Propositions plausibles mais fausses.
      { id: 'x-dom-tout', kind: 'egalite', distractor: true, after: ['dom-val'], text: t`Pour toute $f$ continue sur $\mathbb R$ : $D(f(A))=H$.` },
      { id: 'x-compo', kind: 'egalite', distractor: true, after: ['mu-croise'], text: t`Pour $u\in D(f(A))$ et $k\ge1$ : $(f(A)u)_k=f(\lambda_ku_k)$.` },
      { id: 'x-norme-R', kind: 'inegalite', distractor: true, after: ['borne'], text: t`Si $f$ est bornée sur $\mathbb R$, alors $\|f(A)\|=\sup_{\mathbb R}|f|$.` },
    ],
    justifications: [
      { id: 'j-diagonale', label: t`Sur la base canonique, $E(B)e_k=\mathbb 1_B(\lambda_k)e_k$ : les coefficients diagonaux valent $0$ ou $1$ ; la $\sigma$-additivité forte vient de la convergence de $\sum_n|u_n|^2$.` },
      { id: 'j-parseval', label: t`Identité de Parseval appliquée à $E(B)u$ dans la base canonique.` },
      { id: 'j-tonelli', label: t`$\mu_u$ est la somme des mesures $|u_n|^2\,\delta_{\lambda_n}$ ; pour une fonction positive, on intervertit série et intégrale.`, theorem: 'tonelli' },
      { id: 'j-domaine', label: t`Formule du domaine de $f(A)$, appliquée à la mesure $\mu_u$ calculée.`, theorem: 'spectral-general' },
      { id: 'j-croise', label: t`Linéarité et orthonormalité : $\langle E(B)u,e_k\rangle=\sum_{n:\lambda_n\in B}u_n\langle e_n,e_k\rangle$.` },
      { id: 'j-action', label: t`$\mu_{u,e_k}=u_k\,\delta_{\lambda_k}$, donc $\int f\,d\mu_{u,e_k}=f(\lambda_k)u_k$.` },
      { id: 'j-id', label: t`Cas $f(\lambda)=\lambda$ des formules de domaine et d'action, comparé à la définition de $A$.` },
      { id: 'j-sup', label: t`Majoration $\sum_n|f(\lambda_n)|^2|u_n|^2\le C^2\|u\|^2$, puis test sur $e_n$ pour la borne inférieure.` },
      { id: 'j-extraction', label: t`Choisir $n_k$ strictement croissante avec $|f(\lambda_{n_k})|\ge k$ et poser $u_{n_k}=1/k$, les autres coordonnées étant nulles.` },
      { id: 'j-borne-ex', label: t`Formule de la norme appliquée à la suite $\big(1/(1+n)\big)_{n\ge1}$.` },
      { id: 'j-syn', label: 'Réunion des propriétés établies.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-continu-borne', label: t`Une fonction continue sur $\mathbb R$ est bornée sur le spectre de $A$, donc le domaine de $f(A)$ vaut $H$.` },
      { id: 'j-compo', label: t`Par composition : $f(A)u=f(Au)$.` },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['h-cadre', 'h-reels', 'd-E'], to: 'E-proj', by: 'j-diagonale' },
      { from: ['h-cadre', 'd-E'], to: 'mu-val', by: 'j-parseval' },
      { from: ['mu-val', 'h-cadre'], to: 'int-val', by: 'j-tonelli' },
      { from: ['d-fA', 'int-val'], to: 'dom-val', by: 'j-domaine' },
      { from: ['h-cadre', 'd-E'], to: 'mu-croise', by: 'j-croise' },
      { from: ['d-fA', 'mu-croise'], to: 'action', by: 'j-action' },
      { from: ['dom-val', 'action', 'd-A'], to: 'repr-A', by: 'j-id' },
      { from: ['dom-val', 'action'], to: 'borne', by: 'j-sup' },
      { from: ['dom-val'], to: 'temoin', by: 'j-extraction' },
      { from: ['borne'], to: 'exemple', by: 'j-borne-ex' },
      { from: ['E-proj', 'repr-A', 'dom-val', 'action', 'borne', 'temoin', 'exemple'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-dom-tout',
        verdict: 'incorrect',
        concept: 'spectral-general-calcul-fonctionnel',
        message: t`La continuité de $f$ ne contrôle pas sa croissance sur un spectre non borné : le domaine impose la sommabilité de $|f(\lambda_n)|^2|u_n|^2$.`,
        counterexample: t`$\lambda_n=n$, $f(\lambda)=\lambda$, $u_n=1/n$ : $u\in H$, mais $\sum_n|f(\lambda_n)|^2|u_n|^2=\sum_n1=+\infty$.`,
      },
      {
        conclusion: 'dom-val',
        by: 'j-continu-borne',
        verdict: 'incorrect',
        concept: 'spectral-general-calcul-fonctionnel',
        message: t`Une fonction continue n'est pas bornée sur un spectre non borné, et la formule du domaine ne dépend pas de la continuité de $f$.`,
        counterexample: t`$\lambda_n=n$ et $f(\lambda)=\lambda$ : $f$ est continue et $\sup_n|f(\lambda_n)|=+\infty$.`,
      },
      {
        conclusion: 'x-compo',
        verdict: 'incorrect',
        concept: 'spectral-general-calcul-fonctionnel',
        message: t`$f(A)$ multiplie la coordonnée par $f(\lambda_k)$ : on n'applique pas $f$ au produit $\lambda_ku_k$.`,
        counterexample: t`$f(\lambda)=\lambda^2$, $\lambda_k=2$, $u_k=3$ : $f(\lambda_k)u_k=12$, alors que $f(\lambda_ku_k)=36$.`,
      },
      {
        conclusion: 'action',
        by: 'j-compo',
        verdict: 'incorrect',
        concept: 'spectral-general-calcul-fonctionnel',
        message: t`$f(A)$ n'est pas la composée $f\circ A$, et $f(Au)$ n'a pas de sens : $f$ est une fonction de $\mathbb R$ dans $\mathbb C$, tandis que $Au$ est un vecteur de $H$.`,
      },
      {
        conclusion: 'x-norme-R',
        verdict: 'incorrect',
        concept: 'spectral-general-calcul-fonctionnel',
        message: t`Seules les valeurs de $f$ aux points $\lambda_n$ interviennent : le supremum est pris sur la suite, non sur $\mathbb R$.`,
        counterexample: t`$\lambda_n=0$ pour tout $n$ et $f(\lambda)=\lambda^2/(1+\lambda^2)$ : $f(A)=0$, alors que $\sup_{\mathbb R}|f|=1$.`,
      },
      {
        conclusion: 'int-val',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`Cette égalité repose sur une interversion : il faut dire pourquoi l'intégrale contre $\mu_u$ est une somme.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-reels',
        label: t`Ne plus supposer $(\lambda_n)$ réelle`,
        necessary: true,
        explanation: t`Sans valeurs réelles, $E$ ne couvre plus tout l'espace : $E(\mathbb R)\neq I$, et $A$ n'est plus auto-adjoint.`,
        counterexample: t`Si $\lambda_1=\mathrm i$, alors $E(\mathbb R)e_1=0\neq e_1$, et $A$ admet la valeur propre non réelle $\mathrm i$, ce qui exclut l'auto-adjonction.`,
      },
    ],
  },
  closedChecks: [
    {
      kind: 'rational-vector',
      prompt: t`Pour $\lambda_n=n$, $f(\lambda)=\lambda^2+1$ et $u=e_1+2e_2$ : coordonnées $(f(A)u)_1$ et $(f(A)u)_2$`,
      expected: ['2', '10'],
      labels: ['(f(A)u)₁', '(f(A)u)₂'],
    },
  ],
  solution: t`**Mesure spectrale.** Sur la base canonique, $E(B)e_k=\mathbb 1_B(\lambda_k)e_k$ : chaque $E(B)$ est diagonal à coefficients dans $\{0,1\}$, donc une projection orthogonale. On a $E(\emptyset)=0$, $E(B\cap C)=E(B)E(C)$, et $E(\mathbb R)=I$ parce que tous les $\lambda_n$ sont réels. Si $B=\bigsqcup_jB_j$, alors $\big\|E(B)u-\sum_{j\le J}E(B_j)u\big\|^2=\sum_{n:\lambda_n\in B\setminus\bigcup_{j\le J}B_j}|u_n|^2\to0$ quand $J\to\infty$ : $E$ est fortement $\sigma$-additive.

**Domaine.** Par Parseval, $\mu_u(B)=\|E(B)u\|^2=\sum_{n:\lambda_n\in B}|u_n|^2$, c'est-à-dire $\mu_u=\sum_n|u_n|^2\,\delta_{\lambda_n}$. Pour la fonction positive $|f|^2$, l'interversion série-intégrale donne $\int_{\mathbb R}|f|^2\,d\mu_u=\sum_n|f(\lambda_n)|^2|u_n|^2$, d'où $D(f(A))=\{u\in H:\sum_n|f(\lambda_n)|^2|u_n|^2<\infty\}$.

**Action.** $\mu_{u,e_k}(B)=\langle E(B)u,e_k\rangle=\mathbb 1_B(\lambda_k)u_k$, donc $\mu_{u,e_k}=u_k\,\delta_{\lambda_k}$ et $(f(A)u)_k=\langle f(A)u,e_k\rangle=\int f\,d\mu_{u,e_k}=f(\lambda_k)u_k$. En prenant $f(\lambda)=\lambda$, on retrouve $D(A)$ et $A$ : $E$ représente bien $A$. L'unicité de la mesure spectrale, qui ne figure pas au polycopié, n'est pas utilisée : on définit ici $f(A)=\int f\,dE$ pour cette $E$.

**Domaine total.** Si $C=\sup_n|f(\lambda_n)|<\infty$, alors $\sum_n|f(\lambda_n)|^2|u_n|^2\le C^2\|u\|^2$, donc $D(f(A))=H$ et $\|f(A)\|\le C$ ; comme $\|f(A)e_n\|=|f(\lambda_n)|$, on a $\|f(A)\|=C$. Si $(f(\lambda_n))_n$ n'est pas bornée, on choisit $n_k$ strictement croissante avec $|f(\lambda_{n_k})|\ge k$ et on pose $u_{n_k}=1/k$, $u_n=0$ sinon : $u\in H$ car $\sum_k1/k^2<\infty$, et $\sum_n|f(\lambda_n)|^2|u_n|^2\ge\sum_k1=+\infty$, donc $u\notin D(f(A))$.

**Exemple.** Pour $\lambda_n=n$ et $f(\lambda)=1/(1+|\lambda|)$, on obtient $\|f(A)\|=\sup_n1/(1+n)=1/2$.`,
  steps: [
    t`Vérifier que $E$ est une mesure spectrale, en utilisant que les $\lambda_n$ sont réels.`,
    t`Calculer $\mu_u$, puis $\int|f|^2\,d\mu_u$, pour obtenir le domaine.`,
    t`Identifier l'action à l'aide des mesures croisées $\mu_{u,e_k}$.`,
    t`Retrouver $A$ pour $f(\lambda)=\lambda$.`,
    t`Caractériser les $f$ pour lesquelles $D(f(A))=H$, et calculer la norme.`,
  ],
  commonErrors: [
    { id: 'e-dom-tout', description: t`Écrire $D(f(A))=H$ pour toute fonction continue, oubliant la croissance sur un spectre non borné.`, concept: 'spectral-general-calcul-fonctionnel' },
    { id: 'e-compo', description: t`Confondre $f(A)$ et la composition avec $f$ : remplacer $f(\lambda_k)u_k$ par $f(\lambda_ku_k)$.`, concept: 'spectral-general-calcul-fonctionnel' },
    { id: 'e-sup-R', description: t`Identifier $\|f(A)\|$ à $\sup_{\mathbb R}|f|$ au lieu de $\sup_n|f(\lambda_n)|$.`, concept: 'spectral-general-calcul-fonctionnel' },
  ],
  hints: [
    t`Commence par calculer $E(B)e_k$ : tout le reste se lit dans cette formule. Que vaut alors $\mu_u$ ?`,
    t`Procède en trois temps : la mesure $\mu_u$ et l'intégrale de $|f|^2$ donnent le domaine ; les mesures $\mu_{u,e_k}$ donnent l'action ; le test sur $e_n$ donne la norme.`,
    t`$\mu_u=\sum_n|u_n|^2\delta_{\lambda_n}$ et $\mu_{u,e_k}=u_k\delta_{\lambda_k}$. Pour le témoin hors du domaine : extrais $n_k$ avec $|f(\lambda_{n_k})|\ge k$ et pose $u_{n_k}=1/k$.`,
  ],
  rubric: rubric({
    hypotheses: t`Le caractère réel de $(\lambda_n)$ est utilisé pour $E(\mathbb R)=I$, et $f$ est borélienne.`,
    methode: 'Le domaine et l’action sont obtenus par les mesures $\\mu_u$ et $\\mu_{u,e_k}$.',
    validite: t`Le domaine exact $\sum_n|f(\lambda_n)|^2|u_n|^2<\infty$ est établi, sans oublier le carré.`,
    justifications: 'La caractérisation du domaine total est démontrée dans les deux sens.',
    conclusion: t`$D(f(A))$, $f(A)$ et $\|f(A)\|$ sont obtenus.`,
  }),
  variant: {
    statement: t`Soit $H=\ell^2(\mathbb N^*)$ complexe, $A$ l'opérateur diagonal borné de coefficients $\lambda_n=1/n$, et $f=\mathbb 1_{]1/3,+\infty[}$. Déterminer $f(A)$ et montrer que c'est le projecteur orthogonal sur $\mathrm{Vect}(e_1,e_2)$, de rang $2$.`,
    solution: t`La fonction $f$ est borélienne bornée, donc $D(f(A))=H$. Comme $1/n>1/3$ si et seulement si $n\le2$, on a $f(\lambda_1)=f(\lambda_2)=1$ et $f(\lambda_n)=0$ pour $n\ge3$ (notamment $\lambda_3=1/3$ n'appartient pas à l'intervalle ouvert). Ainsi $f(A)u=u_1e_1+u_2e_2$ : les coefficients diagonaux valent $0$ ou $1$, donc $f(A)$ est une projection orthogonale, d'image $\mathrm{Vect}(e_1,e_2)$. C'est la projection spectrale $E(]1/3,+\infty[)$ : le calcul fonctionnel borélien inclut des fonctions discontinues, ce qu'exige la construction des projections spectrales.`,
    closedChecks: [{ kind: 'rational', prompt: t`Rang de $f(A)$`, expected: '2' }],
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h-cadre', kind: 'hypothese', text: t`$H=\ell^2(\mathbb N^*)$, $(e_n)$ base canonique, $\lambda_n=1/n$.` },
        { id: 'd-f', kind: 'definition', text: t`$f=\mathbb 1_{]1/3,+\infty[}$ : fonction borélienne bornée.` },
        { id: 'h-cf', kind: 'hypothese', text: t`Calcul fonctionnel diagonal (exercice) : $D(f(A))=\{u:\sum_n|f(\lambda_n)|^2|u_n|^2<\infty\}$ et $(f(A)u)_n=f(\lambda_n)u_n$.` },

        { id: 'f-val', kind: 'egalite', text: t`$f(\lambda_1)=f(\lambda_2)=1$ et $f(\lambda_n)=0$ pour $n\ge3$.` },
        { id: 'dom', kind: 'egalite', text: t`$D(f(A))=H$.` },
        { id: 'act', kind: 'egalite', text: t`Pour tout $u\in H$ : $f(A)u=u_1e_1+u_2e_2$.` },
        { id: 'idem', kind: 'egalite', text: t`$f(A)^2=f(A)=f(A)^*$.` },
        { id: 'proj', kind: 'consequence', text: t`$f(A)$ est le projecteur orthogonal sur $\mathrm{Vect}(e_1,e_2)$.` },
        {
          id: 'rang',
          kind: 'egalite',
          text: t`Le rang de $f(A)$ vaut $2$.`,
          masked: t`Rang de $f(A)$ : à déterminer.`,
          check: { kind: 'rational', prompt: t`Rang de $f(A)$`, expected: '2' },
        },
        { id: 'fin', kind: 'conclusion', text: t`$f(A)=E(]1/3,+\infty[)$ est le projecteur orthogonal sur $\mathrm{Vect}(e_1,e_2)$, de rang $2$.` },

        { id: 'x-noncont', kind: 'consequence', distractor: true, after: ['d-f'], text: t`Comme $f$ n'est pas continue, $f(A)$ n'est pas défini.` },
      ],
      justifications: [
        { id: 'j-val', label: t`Comparaison : $1/n>1/3$ si et seulement si $n\le2$.` },
        { id: 'j-dom', label: t`La suite $(f(\lambda_n))_n$ est bornée.` },
        { id: 'j-act', label: 'Formule de l’action, coordonnée par coordonnée.' },
        { id: 'j-idem', label: t`Les coefficients diagonaux valent $0$ ou $1$.` },
        { id: 'j-proj', label: 'Une projection orthogonale est déterminée par son image.' },
        { id: 'j-rang', label: t`Dimension de l'image $\mathrm{Vect}(e_1,e_2)$.` },
        { id: 'j-syn', label: 'Réunion des propriétés établies.' },
        { id: 'j-noncont', label: 'Le calcul fonctionnel n’est défini que pour des fonctions continues.' },
        { id: 'j-ouvert', label: t`$\lambda_3=1/3$ appartient à $]1/3,+\infty[$.` },
      ],
      rules: [
        { from: ['d-f', 'h-cadre'], to: 'f-val', by: 'j-val' },
        { from: ['h-cf', 'f-val'], to: 'dom', by: 'j-dom' },
        { from: ['h-cf', 'f-val'], to: 'act', by: 'j-act' },
        { from: ['act'], to: 'idem', by: 'j-idem' },
        { from: ['idem', 'act'], to: 'proj', by: 'j-proj' },
        { from: ['proj'], to: 'rang', by: 'j-rang' },
        { from: ['dom', 'proj', 'rang'], to: 'fin', by: 'j-syn' },
      ],
      traps: [
        {
          conclusion: 'x-noncont',
          verdict: 'incorrect',
          concept: 'spectral-general-calcul-fonctionnel',
          message: t`Le théorème porte sur les fonctions boréliennes : les indicatrices d'intervalles sont précisément ce qui produit les projections spectrales.`,
          counterexample: t`Ici, $f(A)$ est bien défini : c'est $E(]1/3,+\infty[)$.`,
        },
        {
          conclusion: 'f-val',
          by: 'j-ouvert',
          verdict: 'incorrect',
          concept: 'calcul-exact',
          message: t`L'intervalle $]1/3,+\infty[$ est ouvert en $1/3$ : on a $f(\lambda_3)=f(1/3)=0$.`,
        },
      ],
      removable: [],
    },
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'spectral-general.intermediaire',
  theoremId: 'spectral-general',
  level: 'intermediaire',
  title: t`Domaine de $A^{1/2}$ pour un opérateur diagonal positif`,
  statement: t`Soit $H$ un espace de Hilbert complexe séparable de dimension infinie, $(e_n)_{n\ge1}$ une base hilbertienne, $(\lambda_n)_{n\ge1}\subset[0,+\infty[$, et $A$ défini par $D(A)=\{u\in H:\sum_n\lambda_n^2|u_n|^2<\infty\}$, $Au=\sum_n\lambda_nu_ne_n$, où $u_n=\langle u,e_n\rangle$.

Caractériser $D(A^{1/2})$ et expliciter $A^{1/2}$. Montrer que $D(A)\subset D(A^{1/2})$, l'inclusion étant stricte si la suite $(\lambda_n)$ n'est pas bornée, et que $(A^{1/2})^2=A$, domaines inclus.`,
  source: poly(43, 'Exercice 27, intermédiaire (p. PDF 43)'),
  prerequisites: [],
  concepts: ['spectral-general-calcul-fonctionnel', 'domaine-operateur', 'hypotheses-theoreme', 'calcul-exact', 'densite-fermeture'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-base', kind: 'hypothese', text: t`$H$ est un Hilbert complexe séparable, $(e_n)$ une base hilbertienne ; pour $u\in H$, on note $u_n=\langle u,e_n\rangle$, de sorte que $\|u\|^2=\sum_n|u_n|^2$.` },
      { id: 'h-pos', kind: 'hypothese', text: t`$\lambda_n\ge0$ pour tout $n$.` },
      { id: 'd-A', kind: 'definition', text: t`$D(A)=\{u\in H:\sum_n\lambda_n^2|u_n|^2<\infty\}$ et $Au=\sum_n\lambda_nu_ne_n$.` },
      { id: 'd-f', kind: 'definition', text: t`$f(\lambda)=\sqrt{\max(\lambda,0)}$, fonction continue donc borélienne, et $A^{1/2}:=f(A)$.` },
      { id: 'h-cf', kind: 'hypothese', text: t`Calcul fonctionnel diagonal (exercice facile, via l'isométrie $u\mapsto(u_n)_n$ de $H$ sur $\ell^2$) : pour $f$ borélienne, $D(f(A))=\{u\in H:\sum_n|f(\lambda_n)|^2|u_n|^2<\infty\}$ et $f(A)u=\sum_nf(\lambda_n)u_ne_n$.` },

      { id: 'f-carre', kind: 'egalite', text: t`Pour tout $n$ : $|f(\lambda_n)|^2=\lambda_n$.` },
      { id: 'dom', kind: 'egalite', text: t`$D(A^{1/2})=\{u\in H:\sum_n\lambda_n|u_n|^2<\infty\}$.` },
      { id: 'action', kind: 'egalite', text: t`Pour $u\in D(A^{1/2})$ : $A^{1/2}u=\sum_n\sqrt{\lambda_n}\,u_ne_n$ et $\|A^{1/2}u\|^2=\sum_n\lambda_n|u_n|^2$.` },
      { id: 'young', kind: 'inegalite', text: t`Pour tout $\lambda\ge0$ : $\lambda\le\frac12\big(1+\lambda^2\big)$.` },
      { id: 'incl', kind: 'inclusion', text: t`$D(A)\subset D(A^{1/2})$.` },
      { id: 'ps', kind: 'egalite', text: t`Pour $u\in D(A)$ : $\|A^{1/2}u\|^2=\langle Au,u\rangle$.` },
      { id: 'temoin', kind: 'consequence', text: t`Si $(\lambda_n)$ n'est pas bornée, il existe $u\in D(A^{1/2})$ tel que $u\notin D(A)$.` },
      { id: 'strict', kind: 'inclusion', text: t`Si $(\lambda_n)$ n'est pas bornée, $D(A)\subsetneq D(A^{1/2})$.` },
      { id: 'carre', kind: 'egalite', text: t`$(A^{1/2})^2=A$, domaines inclus.` },
      {
        id: 'ex',
        kind: 'egalite',
        text: t`Pour $\lambda_n=4^n$ et $u_n=3^{-n}$ : $\|A^{1/2}u\|^2=\dfrac45$.`,
        masked: t`Pour $\lambda_n=4^n$ et $u_n=3^{-n}$ : valeur de $\|A^{1/2}u\|^2$ à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\|A^{1/2}u\|^2=\sum_{n\ge1}\lambda_n|u_n|^2$`, expected: '4/5' },
      },
      { id: 'fin', kind: 'conclusion', text: t`$D(A^{1/2})=\{u\in H:\sum_n\lambda_n|u_n|^2<\infty\}$, avec $D(A)\subset D(A^{1/2})$, stricte si $(\lambda_n)$ n'est pas bornée, et $(A^{1/2})^2=A$.` },

      { id: 'x-domA', kind: 'egalite', distractor: true, after: ['incl'], text: t`$D(A^{1/2})=D(A)$.` },
      { id: 'x-demi', kind: 'egalite', distractor: true, after: ['f-carre'], text: t`$D(A^{1/2})=\{u\in H:\sum_n\sqrt{\lambda_n}\,|u_n|^2<\infty\}$.` },
      { id: 'x-norme', kind: 'egalite', distractor: true, after: ['ps'], text: t`Pour $u\in D(A)$ : $\|A^{1/2}u\|^2=\|Au\|$.` },
    ],
    justifications: [
      { id: 'j-carre-rac', label: t`$\lambda_n\ge0$, donc $f(\lambda_n)^2=\lambda_n$.` },
      { id: 'j-dom', label: t`Formule du domaine de $f(A)$ pour $f(\lambda)=\sqrt{\lambda}$ sur $[0,+\infty[$.`, theorem: 'spectral-general' },
      { id: 'j-action-norme', label: 'Formule de l’action du calcul fonctionnel et identité de Parseval.' },
      { id: 'j-young', label: t`Conséquence de $(\lambda-1)^2\ge0$.` },
      { id: 'j-somme', label: t`Majoration $\sum_n\lambda_n|u_n|^2\le\frac12\|u\|^2+\frac12\sum_n\lambda_n^2|u_n|^2$, finie pour $u\in D(A)$.` },
      { id: 'j-parseval', label: t`Parseval : $\langle Au,u\rangle=\sum_n\lambda_nu_n\overline{u_n}$.` },
      { id: 'j-temoin', label: t`Extraire $n_k$ strictement croissante avec $\lambda_{n_k}\ge k^2$, et poser $u=\sum_k\big(k\sqrt{\lambda_{n_k}}\big)^{-1}e_{n_k}$.` },
      { id: 'j-strict', label: 'Un élément de la différence rend l’inclusion stricte.' },
      { id: 'j-compo', label: t`$u\in D\big((A^{1/2})^2\big)$ équivaut à $\sum_n\lambda_n|u_n|^2<\infty$ et $\sum_n\lambda_n^2|u_n|^2<\infty$ : on applique l'inclusion précédente.` },
      { id: 'j-geom', label: t`Somme d'une série géométrique de raison $4/9$ ; les conditions d'appartenance sont vérifiées.` },
      { id: 'j-syn', label: 'Réunion des propriétés établies.' },
      // Séduisantes, insuffisantes ou fausses.
      { id: 'j-module', label: t`Le domaine ne dépend que de $|f|$ : on peut remplacer $|f|^2$ par $|f|$ dans le critère de domaine.` },
      { id: 'j-dense-incl', label: t`$D(A)$ est dense dans $H$, donc contenu dans $D(A^{1/2})$.` },
      { id: 'j-carre-domaine', label: 'L’égalité de deux expressions suffit, sans contrôle des domaines.' },
    ],
    rules: [
      { from: ['h-pos', 'd-f'], to: 'f-carre', by: 'j-carre-rac' },
      { from: ['h-cf', 'f-carre'], to: 'dom', by: 'j-dom' },
      { from: ['h-cf', 'f-carre', 'h-base'], to: 'action', by: 'j-action-norme' },
      { from: [], to: 'young', by: 'j-young' },
      { from: ['dom', 'd-A', 'young', 'h-base'], to: 'incl', by: 'j-somme' },
      { from: ['action', 'd-A', 'incl', 'h-base'], to: 'ps', by: 'j-parseval' },
      { from: ['dom', 'd-A', 'h-pos'], to: 'temoin', by: 'j-temoin' },
      { from: ['incl', 'temoin'], to: 'strict', by: 'j-strict' },
      { from: ['dom', 'action', 'incl', 'd-A'], to: 'carre', by: 'j-compo' },
      { from: ['dom', 'action'], to: 'ex', by: 'j-geom' },
      { from: ['dom', 'action', 'incl', 'ps', 'strict', 'carre', 'ex'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-domA',
        verdict: 'incorrect',
        concept: 'domaine-operateur',
        message: t`Le domaine de $A^{1/2}$ est en général plus grand que celui de $A$ : les conditions portent sur des poids différents.`,
        counterexample: t`$\lambda_n=n^2$, $u_n=1/n^2$ : $\sum_n\lambda_n|u_n|^2=\sum_n1/n^2<\infty$, mais $\sum_n\lambda_n^2|u_n|^2=\sum_n1=+\infty$.`,
      },
      {
        conclusion: 'x-demi',
        verdict: 'incorrect',
        concept: 'spectral-general-calcul-fonctionnel',
        message: t`Le critère porte sur $|f|^2$, et $|f(\lambda_n)|^2=\lambda_n$ pour $f(\lambda)=\sqrt\lambda$ : le poids est $\lambda_n$, pas $\sqrt{\lambda_n}$.`,
        counterexample: t`$\lambda_n=n^4$, $u_n=1/n^2$ : $\sum_n\sqrt{\lambda_n}\,|u_n|^2=\sum_n1/n^2<\infty$, mais $\sum_n\lambda_n|u_n|^2=\sum_n1=+\infty$.`,
      },
      {
        conclusion: 'x-norme',
        verdict: 'incorrect',
        concept: 'calcul-exact',
        message: t`L'identité correcte est $\|A^{1/2}u\|^2=\langle Au,u\rangle$, qui n'est pas $\|Au\|$.`,
        counterexample: t`$A=4I$, $u=3e_1$ : $\|A^{1/2}u\|^2=36$ et $\|Au\|=12$.`,
      },
      {
        conclusion: 'dom',
        by: 'j-module',
        verdict: 'incorrect',
        concept: 'spectral-general-calcul-fonctionnel',
        message: t`Le carré fait partie du critère : remplacer $|f|^2$ par $|f|$ change l'ensemble obtenu.`,
        counterexample: t`$\lambda_n=n^4$, $u_n=1/n^2$ : $u$ vérifie le critère avec $|f|$, mais pas le critère exact avec $|f|^2=\lambda_n$.`,
      },
      {
        conclusion: 'incl',
        by: 'j-dense-incl',
        verdict: 'a-justifier',
        concept: 'densite-fermeture',
        message: t`La densité de $D(A)$ dans $H$ ne dit rien de l'appartenance à $D(A^{1/2})$ : cette inclusion se démontre en comparant les poids $\lambda_n$ et $\lambda_n^2$.`,
      },
      {
        conclusion: 'carre',
        by: 'j-carre-domaine',
        verdict: 'a-justifier',
        concept: 'domaine-operateur',
        message: t`L'égalité sur une formule ne suffit pas : il faut aussi établir $D\big((A^{1/2})^2\big)=D(A)$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-pos',
        label: t`Ne plus supposer $\lambda_n\ge0$`,
        necessary: true,
        explanation: t`Une valeur négative rend impossible une racine carrée auto-adjointe : l'exercice perd son objet.`,
        counterexample: t`Si $\lambda_1=-1$ et s'il existait $B=B^*$ avec $B^2=A$, on aurait $\|Be_1\|^2=\langle B^2e_1,e_1\rangle=-1$, ce qui est impossible.`,
      },
    ],
  },
  solution: t`**Domaine.** On note $f(\lambda)=\sqrt{\max(\lambda,0)}$. Comme $\lambda_n\ge0$, on a $f(\lambda_n)^2=\lambda_n$, et le calcul fonctionnel diagonal donne
$$D(A^{1/2})=\Big\{u\in H:\sum_n\lambda_n|u_n|^2<\infty\Big\},\qquad A^{1/2}u=\sum_n\sqrt{\lambda_n}\,u_ne_n,\qquad \|A^{1/2}u\|^2=\sum_n\lambda_n|u_n|^2.$$

**Inclusion.** De $(\lambda-1)^2\ge0$ on déduit $\lambda\le\frac12(1+\lambda^2)$ pour $\lambda\ge0$, donc pour $u\in D(A)$ : $\sum_n\lambda_n|u_n|^2\le\frac12\|u\|^2+\frac12\sum_n\lambda_n^2|u_n|^2<\infty$. Ainsi $D(A)\subset D(A^{1/2})$, et $\|A^{1/2}u\|^2=\sum_n\lambda_n|u_n|^2=\langle Au,u\rangle$ par Parseval.

**Stricte si non bornée.** Choisissons $n_k$ strictement croissante avec $\lambda_{n_k}\ge k^2$ (la suite étant non bornée) et posons $u=\sum_kc_ke_{n_k}$, $c_k=\big(k\sqrt{\lambda_{n_k}}\big)^{-1}$. Alors $\sum_kc_k^2\le\sum_k1/k^4<\infty$, $\sum_k\lambda_{n_k}c_k^2=\sum_k1/k^2<\infty$, mais $\sum_k\lambda_{n_k}^2c_k^2=\sum_k\lambda_{n_k}/k^2\ge\sum_k1=+\infty$ : $u\in D(A^{1/2})\setminus D(A)$.

**Racine carrée.** $u\in D\big((A^{1/2})^2\big)$ signifie $u\in D(A^{1/2})$ et $A^{1/2}u\in D(A^{1/2})$, c'est-à-dire $\sum_n\lambda_n|u_n|^2<\infty$ et $\sum_n\lambda_n^2|u_n|^2<\infty$ ; d'après l'inclusion, c'est équivalent à $u\in D(A)$, et $(A^{1/2})^2u=\sum_n\lambda_nu_ne_n=Au$.

**Exemple.** Pour $\lambda_n=4^n$ et $u_n=3^{-n}$ : $\|u\|^2=\sum_n9^{-n}<\infty$, $\|A^{1/2}u\|^2=\sum_{n\ge1}(4/9)^n=4/5$, et $\sum_n\lambda_n^2u_n^2=\sum_n(16/9)^n=+\infty$ : $u\in D(A^{1/2})\setminus D(A)$.`,
  steps: [
    t`Appliquer la formule du domaine à $f(\lambda)=\sqrt{\lambda}$.`,
    t`Établir $D(A)\subset D(A^{1/2})$ par $\lambda\le\frac12(1+\lambda^2)$.`,
    t`Construire un témoin de stricte inclusion lorsque $(\lambda_n)$ n'est pas bornée.`,
    t`Vérifier $(A^{1/2})^2=A$ en contrôlant les domaines.`,
    'Calculer un exemple explicite.',
  ],
  commonErrors: [
    { id: 'e-poids', description: t`Écrire le poids $\sqrt{\lambda_n}$ dans le critère du domaine au lieu de $\lambda_n$.`, concept: 'spectral-general-calcul-fonctionnel' },
    { id: 'e-dom-egal', description: t`Affirmer $D(A^{1/2})=D(A)$.`, concept: 'domaine-operateur' },
    { id: 'e-racine-domaine', description: t`Vérifier seulement l'égalité de formules dans $(A^{1/2})^2=A$, sans les domaines.`, concept: 'domaine-operateur' },
  ],
  hints: [
    t`La formule du domaine fait intervenir $|f|^2$. Que vaut $|f(\lambda_n)|^2$ pour la racine carrée ?`,
    t`Pour l'inclusion, compare $\lambda$ et $\lambda^2$ sur $[0,+\infty[$ ; pour la stricte inclusion, fabrique un $u$ porté par une sous-suite où $\lambda_{n_k}$ est grand.`,
    t`$\lambda\le\frac12(1+\lambda^2)$. Pour le témoin, $u=\sum_kc_ke_{n_k}$ avec $c_k=(k\sqrt{\lambda_{n_k}})^{-1}$ et $\lambda_{n_k}\ge k^2$.`,
  ],
  rubric: rubric({
    hypotheses: t`$\lambda_n\ge0$ est utilisée pour $f(\lambda_n)^2=\lambda_n$.`,
    methode: 'Le domaine provient de la formule du calcul fonctionnel.',
    validite: 'L’inclusion et le témoin de stricte inclusion sont exacts.',
    justifications: 'Le contrôle des domaines figure dans l’identité de racine carrée.',
    conclusion: t`$D(A^{1/2})$ et $A^{1/2}$ sont identifiés.`,
  }),
  variant: {
    statement: t`Dans le cadre de l'exercice, pour $\lambda_n=9^n$ et $u_n=6^{-n}$, montrer que $u\in D(A^{1/2})\setminus D(A)$ et calculer $\|A^{1/2}u\|^2$.`,
    solution: t`$\sum_n|u_n|^2=\sum_n36^{-n}<\infty$, donc $u\in H$. $\|A^{1/2}u\|^2=\sum_{n\ge1}9^n36^{-n}=\sum_{n\ge1}(1/4)^n=\dfrac13$, donc $u\in D(A^{1/2})$. En revanche, $\sum_{n\ge1}\lambda_n^2|u_n|^2=\sum_{n\ge1}81^n36^{-n}=\sum_{n\ge1}(9/4)^n=+\infty$, donc $u\notin D(A)$.`,
    closedChecks: [{ kind: 'rational', prompt: t`Valeur de $\|A^{1/2}u\|^2$`, expected: '1/3' }],
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'spectral-general.difficile',
  theoremId: 'spectral-general',
  level: 'difficile',
  title: t`Spectre continu d'une multiplication, spectre discret d'une résolvante compacte`,
  statement: t`Soit $H=L^2(]0,1[)$ complexe et $M\in\mathcal L(H)$ défini par $(Mu)(x)=xu(x)$, borné et auto-adjoint. Soit $K$ un espace de Hilbert complexe séparable de dimension infinie et $A:D(A)\subset K\to K$ auto-adjoint, positif, tel que $T=(I+A)^{-1}$ soit compact.

On dit que $z$ appartient au spectre continu de $M$ lorsque $zI-M$ est injectif, d'image dense et non surjectif.

Montrer : (1) $\sigma(M)=[0,1]$, $M$ n'a aucune valeur propre, tout point de $\sigma(M)$ est dans le spectre continu, et $E_M(\{z\})=0$ pour tout réel $z$, où $E_M(B)u=\mathbb 1_Bu$ ; (2) $\sigma(A)$ est constitué d'une suite de valeurs propres de multiplicité finie, tendant vers $+\infty$, sans point d'accumulation ; (3) la résolvante $R(2,M)$ n'est pas compacte.`,
  source: poly(43, 'Exercice 27, difficile (p. PDF 43) ; sections 6.2, 6.4 et 6.5 (p. PDF 23–25)'),
  prerequisites: ['spectral-compact'],
  concepts: ['spectral-general-spectre-ponctuel', 'compact-continue', 'hypotheses-theoreme', 'spectral-general-calcul-fonctionnel', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'vecteurs-propres', label: 'Non-compacité par absence de vecteur propre' },
      { id: 'suite-orthonormee', label: 'Non-compacité par une suite orthonormée' },
    ],
    nodes: [
      { id: 'h-M', kind: 'hypothese', text: t`$H=L^2(]0,1[)$ complexe ; $(Mu)(x)=xu(x)$ pour $u\in H=D(M)$ ; $M$ est borné et auto-adjoint.` },
      { id: 'h-A', kind: 'hypothese', text: t`$K$ est un espace de Hilbert complexe séparable et $A:D(A)\subset K\to K$ est auto-adjoint, avec $\langle Au,u\rangle\ge0$ pour tout $u\in D(A)$.` },
      { id: 'h-compact', kind: 'hypothese', text: t`$T=(I+A)^{-1}$ est compact sur $K$.` },
      { id: 'h-dim', kind: 'hypothese', text: t`$K$ est de dimension infinie.` },
      { id: 'd-Em', kind: 'definition', text: t`$E_M(B)u=\mathbb 1_Bu$ pour $B\subset\mathbb R$ borélien et $u\in H$.` },

      { id: 'm-hors', kind: 'consequence', text: t`Pour $z\in\mathbb C\setminus[0,1]$ : $z\in\rho(M)$, $R(z,M)$ est la multiplication par $x\mapsto1/(z-x)$, et $\|R(z,M)\|\le1/\mathrm{dist}(z,[0,1])$.` },
      { id: 'm-in', kind: 'inegalite', text: t`Pour $z\in[0,1]$ : avec $J_n=\,]0,1[\,\cap\,]z-1/n,z+1/n[$ et $u_n=|J_n|^{-1/2}\mathbb 1_{J_n}$, on a $\|u_n\|=1$ et $\|(zI-M)u_n\|\le1/n$.` },
      { id: 'm-spec', kind: 'egalite', text: t`$\sigma(M)=[0,1]$.` },
      { id: 'm-vp', kind: 'consequence', text: t`$M$ n'a aucune valeur propre.` },
      { id: 'm-nonsurj', kind: 'consequence', text: t`Pour $z\in[0,1]$ : la fonction constante $1$ n'appartient pas à $\mathrm{Im}(zI-M)$.` },
      { id: 'm-continu', kind: 'consequence', text: t`Pour tout $z\in[0,1]$ : $zI-M$ est injectif, d'image dense et non surjectif ; tout le spectre de $M$ est donc continu.` },
      { id: 'm-E', kind: 'egalite', text: t`$E_M$ est une mesure spectrale représentant $M$, $\mu_u(B)=\int_{B\cap]0,1[}|u|^2\,dx$, et $E_M(\{z\})=0$ pour tout $z\in\mathbb R$.` },

      { id: 'a-T', kind: 'consequence', text: t`$T$ est compact, auto-adjoint, injectif, et $0\le\langle Tf,f\rangle\le\|f\|^2$ pour tout $f\in K$.` },
      { id: 'a-base', kind: 'application-theoreme', text: t`Il existe une base hilbertienne $(\varphi_k)_{k\ge1}$ de $K$ avec $T\varphi_k=\tau_k\varphi_k$, $\tau_k\in\,]0,1]$, $\tau_k\to0$, chaque valeur propre étant de multiplicité finie.` },
      { id: 'a-vp', kind: 'egalite', text: t`$\varphi_k\in D(A)$, $A\varphi_k=\lambda_k\varphi_k$ avec $\lambda_k=\tau_k^{-1}-1\ge0$, $\lambda_k\to+\infty$, et $A$ est diagonal dans la base $(\varphi_k)$.` },
      { id: 'a-spec', kind: 'egalite', text: t`$\sigma(A)=\{\lambda_k:k\ge1\}$, partie fermée de $\mathbb R$ sans point d'accumulation, chaque $\lambda_k$ étant une valeur propre de multiplicité finie.` },
      { id: 'a-E', kind: 'egalite', text: t`$E_A(B)=\sum_{k:\lambda_k\in B}\langle\,\cdot\,,\varphi_k\rangle\varphi_k$ est une mesure spectrale représentant $A$, et $E_A(\{\lambda\})\ne0$ si et seulement si $\lambda\in\sigma(A)$.` },

      { id: 'r2', kind: 'consequence', text: t`$2\in\rho(M)$, et $R(2,M)$ est la multiplication par $g(x)=1/(2-x)$, avec $\frac12\le g\le1$ sur $]0,1[$.` },
      { id: 'pc-vp', kind: 'consequence', text: t`$R(2,M)$ n'a aucune valeur propre.` },
      { id: 'pc-suite', kind: 'inegalite', text: t`Pour $e_k(x)=\sqrt2\sin(k\pi x)$ : $e_k\rightharpoonup0$ faiblement dans $H$, alors que $\|R(2,M)e_k\|\ge\frac12$ pour tout $k$.` },
      { id: 'nc', kind: 'consequence', text: t`$R(2,M)$ n'est pas compact.` },
      { id: 'fin', kind: 'conclusion', text: t`$\sigma(M)=[0,1]$ est purement continu, sans valeur propre et sans point chargé par $E_M$ ; $\sigma(A)$ est purement discret, et la résolvante $R(2,M)$ n'est pas compacte.` },

      { id: 'x-spec-vide', kind: 'egalite', distractor: true, after: ['m-vp'], text: t`Comme $M$ n'a aucune valeur propre, $\sigma(M)=\emptyset$.` },
      { id: 'x-base-M', kind: 'consequence', distractor: true, after: ['m-vp'], text: t`$M$ étant auto-adjoint, $H$ admet une base hilbertienne formée de vecteurs propres de $M$.` },
      { id: 'x-compact-borne', kind: 'consequence', distractor: true, after: ['r2'], text: t`$R(2,M)$ est compact, puisque c'est un opérateur borné de $H$ dans $H$.` },
    ],
    justifications: [
      { id: 'j-mult-inv', label: t`Pour $z\notin[0,1]$, $x\mapsto1/(z-x)$ est bornée sur $]0,1[$ ; la multiplication par cette fonction inverse $zI-M$.` },
      { id: 'j-suite', label: t`$J_n$ est un intervalle non vide, $|z-x|\le1/n$ sur $J_n$, et $\|\mathbb 1_{J_n}\|^2=|J_n|$.` },
      { id: 'j-borne-inf-spec', label: t`Si $z\in\rho(M)$, alors $1=\|u_n\|\le\|R(z,M)\|\,\|(zI-M)u_n\|\to0$ : absurde pour $z\in[0,1]$.` },
      { id: 'j-negl', label: t`$(z-x)u(x)=0$ p.p. entraîne $u=0$ p.p., car $\{z\}$ est négligeable.` },
      { id: 'j-non-L2', label: t`L'équation $(z-x)u(x)=1$ impose $u(x)=1/(z-x)$ p.p., et $\int_0^1|z-x|^{-2}\,dx=+\infty$.` },
      { id: 'j-continu', label: t`Si $v\perp\mathrm{Im}(zI-M)$, alors $(zI-M)v=0$, car $M=M^*$ et $z$ est réel ; l'injectivité donne $v=0$, et le défaut de surjectivité est acquis.` },
      { id: 'j-Em', label: t`$E_M(B)$ est la multiplication par $\mathbb 1_B$, $\langle E_M(B)u,v\rangle=\int_Bu\bar v$, et $\{z\}$ est négligeable.` },
      { id: 'j-T', label: t`Si $f=(I+A)u$ : $\langle Tf,f\rangle=\|u\|^2+\langle Au,u\rangle\ge0$ et $\|f\|^2\ge\|u\|^2$ ; injectif comme inverse, auto-adjoint car $A$ l'est.` },
      { id: 'j-sc', label: 'Théorème spectral pour les opérateurs compacts auto-adjoints, appliqué à l’opérateur injectif et positif $T$.', theorem: 'spectral-compact' },
      { id: 'j-inv-vp', label: t`$\varphi_k=\tau_k^{-1}T\varphi_k\in\mathrm{Im}\,T=D(A)$ et $(I+A)\varphi_k=\tau_k^{-1}\varphi_k$ ; on décompose $f=(I+A)u$ sur la base.` },
      { id: 'j-diag-res', label: t`Si $z\notin\{\lambda_k\}$, alors $\delta=\inf_k|z-\lambda_k|>0$ puisque $\lambda_k\to+\infty$, et $\sum_k(z-\lambda_k)^{-1}\langle\,\cdot\,,\varphi_k\rangle\varphi_k$ est un inverse borné de $zI-A$.` },
      { id: 'j-EA', label: t`Calcul diagonal dans la base $(\varphi_k)$, comme dans le cas d'une suite de $\ell^2$.` },
      { id: 'j-r2', label: t`Cas particulier $z=2\notin[0,1]$ ; $g$ est croissante sur $]0,1[$.` },
      { id: 'j-g-inj', label: t`$g$ est injective : $(g(x)-\mu)u(x)=0$ p.p. impose $u=0$ p.p.` },
      { id: 'j-ortho-faible', label: t`Une suite orthonormée tend faiblement vers $0$ ; $g\ge\frac12$ donne $\|ge_k\|\ge\frac12\|e_k\|$.` },
      { id: 'j-sc-M', label: t`Si $R(2,M)$, auto-adjoint, était compact, le théorème spectral compact fournirait un vecteur propre.`, theorem: 'spectral-compact' },
      { id: 'j-compact-faible', label: 'Un opérateur compact envoie toute suite faiblement nulle sur une suite fortement nulle.' },
      { id: 'j-syn', label: 'Réunion des propriétés établies.' },
      // Séduisantes, insuffisantes ou fausses.
      { id: 'j-spec-vp', label: 'Le spectre d’un opérateur auto-adjoint est l’adhérence de l’ensemble de ses valeurs propres.' },
      { id: 'j-borne-compact', label: 'Un opérateur borné envoie la boule unité sur une partie relativement compacte.' },
      { id: 'j-sc-general', label: 'Le théorème spectral général fournit, pour tout opérateur auto-adjoint, une base hilbertienne de vecteurs propres.', theorem: 'spectral-general' },
    ],
    rules: [
      { from: ['h-M'], to: 'm-hors', by: 'j-mult-inv' },
      { from: ['h-M'], to: 'm-in', by: 'j-suite' },
      { from: ['m-hors', 'm-in'], to: 'm-spec', by: 'j-borne-inf-spec' },
      { from: ['h-M'], to: 'm-vp', by: 'j-negl' },
      { from: ['h-M'], to: 'm-nonsurj', by: 'j-non-L2' },
      { from: ['m-vp', 'm-nonsurj', 'm-spec', 'h-M'], to: 'm-continu', by: 'j-continu' },
      { from: ['d-Em', 'h-M'], to: 'm-E', by: 'j-Em' },

      { from: ['h-A', 'h-compact'], to: 'a-T', by: 'j-T' },
      { from: ['a-T', 'h-dim'], to: 'a-base', by: 'j-sc' },
      { from: ['a-base', 'h-A'], to: 'a-vp', by: 'j-inv-vp' },
      { from: ['a-vp', 'a-base'], to: 'a-spec', by: 'j-diag-res' },
      { from: ['a-vp', 'a-spec'], to: 'a-E', by: 'j-EA' },

      { from: ['m-hors'], to: 'r2', by: 'j-r2' },
      { from: ['r2'], to: 'pc-vp', by: 'j-g-inj', path: 'vecteurs-propres' },
      { from: ['r2'], to: 'pc-suite', by: 'j-ortho-faible', path: 'suite-orthonormee' },
      { from: ['pc-vp', 'h-M'], to: 'nc', by: 'j-sc-M', path: 'vecteurs-propres' },
      { from: ['pc-suite'], to: 'nc', by: 'j-compact-faible', path: 'suite-orthonormee' },

      { from: ['m-spec', 'm-continu', 'm-E', 'a-spec', 'a-E', 'nc'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-spec-vide',
        verdict: 'incorrect',
        concept: 'spectral-general-spectre-ponctuel',
        message: t`L'absence de valeur propre dit que $zI-M$ est injectif, non qu'il est bijectif d'inverse borné. Le spectre peut être non vide sans contenir aucune valeur propre.`,
        counterexample: t`Pour $z=\frac12$ : $zI-M$ est injectif, mais la fonction $1$ n'appartient pas à son image, donc $\frac12\in\sigma(M)$.`,
      },
      {
        conclusion: 'x-base-M',
        verdict: 'incorrect',
        concept: 'spectral-general-spectre-ponctuel',
        message: t`La base de vecteurs propres provient du théorème spectral compact : elle exige la compacité. Ici, $M$ n'a aucune valeur propre, donc aucun vecteur propre.`,
        counterexample: t`Si $Mu=zu$ dans $H$, alors $(x-z)u(x)=0$ p.p., donc $u=0$.`,
      },
      {
        conclusion: 'x-compact-borne',
        verdict: 'incorrect',
        concept: 'compact-continue',
        message: t`En dimension infinie, borné n'implique pas compact : une suite orthonormée met en défaut toute extraction convergente.`,
        counterexample: t`$e_k(x)=\sqrt2\sin(k\pi x)$ : $e_k\rightharpoonup0$, mais $\|R(2,M)e_k\|\ge\frac12$ pour tout $k$.`,
      },
      {
        conclusion: 'm-spec',
        by: 'j-spec-vp',
        verdict: 'incorrect',
        concept: 'spectral-general-spectre-ponctuel',
        message: t`Cette description vaut lorsqu'il existe une base hilbertienne de vecteurs propres, par exemple pour une résolvante compacte, mais pas en général. Pour $M$, l'ensemble des valeurs propres est vide alors que $\sigma(M)=[0,1]$.`,
        counterexample: t`$M$ elle-même : aucune valeur propre, spectre égal à $[0,1]$.`,
      },
      {
        conclusion: 'nc',
        by: 'j-borne-compact',
        verdict: 'incorrect',
        concept: 'compact-continue',
        message: t`Cet argument prouverait la compacité de $R(2,M)$, et il est faux en dimension infinie.`,
      },
      {
        conclusion: 'a-base',
        by: 'j-sc-general',
        verdict: 'incorrect',
        concept: 'spectral-general-spectre-ponctuel',
        message: t`Le théorème spectral général fournit une mesure spectrale, pas une base de vecteurs propres : c'est la compacité de $T$ qui donne une telle base.`,
        counterexample: t`$M$ est auto-adjoint, et n'a aucun vecteur propre.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-compact',
        label: t`Retirer la compacité de $T$`,
        necessary: true,
        explanation: t`Sans compacité, le théorème spectral compact ne s'applique plus : le spectre peut ne pas être discret.`,
        counterexample: t`$A=M$ sur $L^2(]0,1[)$ est auto-adjoint positif, $T=(I+M)^{-1}$ est la multiplication par $1/(1+x)$, non compacte, et $\sigma(M)=[0,1]$ ne contient aucune valeur propre.`,
      },
      {
        hypothesis: 'h-dim',
        label: t`Autoriser $K$ de dimension finie`,
        necessary: true,
        explanation: t`En dimension finie, la suite $(\lambda_k)$ est finie : la divergence vers $+\infty$ n'a pas lieu.`,
        counterexample: t`$K=\mathbb C^2$, $A=I$ : $T=\frac12I$ est compact, et $\sigma(A)=\{1\}$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Valeur de $\|R(3/2,M)\|=\sup_{x\in]0,1[}\dfrac1{|3/2-x|}$`, expected: '2' }],
  solution: t`**(1) La multiplication $M$.** Pour $z\notin[0,1]$, $x\mapsto1/(z-x)$ est bornée sur $]0,1[$, et la multiplication par cette fonction est l'inverse borné de $zI-M$ : $z\in\rho(M)$, avec $\|R(z,M)\|\le1/\mathrm{dist}(z,[0,1])$. Pour $z\in[0,1]$, posons $J_n=\,]0,1[\,\cap\,]z-1/n,z+1/n[$ et $u_n=|J_n|^{-1/2}\mathbb 1_{J_n}$ : $\|u_n\|=1$ et $\|(zI-M)u_n\|\le1/n$. Si $z$ était dans $\rho(M)$, on aurait $1\le\|R(z,M)\|/n\to0$, ce qui est absurde. Donc $\sigma(M)=[0,1]$.

Si $(z-x)u(x)=0$ p.p., alors $u=0$ p.p. car $\{z\}$ est négligeable : $M$ n'a aucune valeur propre. Pour $z\in[0,1]$, l'orthogonal de $\mathrm{Im}(zI-M)$ est $\ker(zI-M)=\{0\}$, car $M=M^*$ et $z$ est réel : l'image est dense. Elle est stricte, car $(z-x)u(x)=1$ impose $u=1/(z-x)$ p.p., et $\int_0^1|z-x|^{-2}dx=+\infty$. Tout point de $[0,1]$ est donc dans le spectre continu.

La famille $E_M(B)u=\mathbb 1_Bu$ est une mesure spectrale, et $\langle Mu,v\rangle=\int x\,u\bar v=\int_{\mathbb R}\lambda\,d\langle E_M(\lambda)u,v\rangle$ : elle représente $M$. On a $\mu_u(B)=\int_{B\cap]0,1[}|u|^2dx$, et $E_M(\{z\})=0$ pour tout réel $z$.

**(2) La résolvante compacte.** Pour $f=(I+A)u$, $\langle Tf,f\rangle=\|u\|^2+\langle Au,u\rangle\ge0$ et $\|f\|^2=\|u\|^2+2\langle Au,u\rangle+\|Au\|^2\ge\|u\|^2$ : $T$ est compact, auto-adjoint, injectif, et $0\le T\le I$. Le théorème spectral compact, avec $\dim K=\infty$, donne une base hilbertienne $(\varphi_k)$ et $T\varphi_k=\tau_k\varphi_k$, $\tau_k\in\,]0,1]$, de multiplicités finies, $\tau_k\to0$. Alors $\varphi_k=\tau_k^{-1}T\varphi_k\in D(A)$, $A\varphi_k=\lambda_k\varphi_k$, $\lambda_k=\tau_k^{-1}-1\to+\infty$ ; et pour $u=Tf$, $u_k=\tau_kf_k$, donc $D(A)=\{u:\sum_k(1+\lambda_k)^2|u_k|^2<\infty\}$ et $Au=\sum_k\lambda_ku_k\varphi_k$.

Si $z\notin\{\lambda_k\}$, alors $\delta=\inf_k|z-\lambda_k|>0$, et $\sum_k(z-\lambda_k)^{-1}\langle\cdot,\varphi_k\rangle\varphi_k$ est l'inverse borné de $zI-A$. Donc $\sigma(A)=\{\lambda_k\}$, partie fermée sans point d'accumulation, chaque point étant valeur propre de multiplicité finie. La mesure spectrale $E_A(B)=\sum_{\lambda_k\in B}\langle\cdot,\varphi_k\rangle\varphi_k$ est ici discrète.

**(3) Résolvante de $M$.** $R(2,M)$ est la multiplication par $g(x)=1/(2-x)$, $\frac12\le g\le1$. *Par vecteurs propres* : si $R(2,M)$ était compact, le théorème spectral compact fournirait un vecteur propre ; or $g$ injective interdit tout vecteur propre. *Par suite orthonormée* : $e_k=\sqrt2\sin(k\pi\cdot)$ vérifie $e_k\rightharpoonup0$, alors que $\|ge_k\|\ge\frac12$, ce qui contredirait la compacité.

**Conclusion.** Un opérateur auto-adjoint à résolvante compacte a un spectre purement discret, réduit à une suite de valeurs propres, et une mesure spectrale portée par ces points. La multiplication $M$ a au contraire un spectre continu, sans aucun point chargé : sa résolvante n'est pas compacte.`,
  steps: [
    t`Calculer $\sigma(M)$ : inverse explicite hors de $[0,1]$, suite approchée sur $[0,1]$.`,
    t`Montrer que $M$ n'a pas de valeur propre, et que tout le spectre est continu.`,
    t`Identifier la mesure spectrale de $M$ et l'absence d'atome.`,
    t`Pour $A$ : appliquer le théorème spectral compact à $T$, en déduire les valeurs propres et $\sigma(A)$.`,
    t`Comparer : la résolvante $R(2,M)$ n'est pas compacte.`,
  ],
  commonErrors: [
    { id: 'e-spec-vp', description: 'Confondre spectre et ensemble des valeurs propres.', concept: 'spectral-general-spectre-ponctuel' },
    { id: 'e-autoadjoint-base', description: 'Déduire de l’auto-adjonction l’existence d’une base de vecteurs propres.', concept: 'spectral-general-spectre-ponctuel' },
    { id: 'e-borne-compact', description: 'Affirmer qu’un opérateur borné est compact.', concept: 'compact-continue' },
  ],
  hints: [
    t`Pour $M$ : où $zI-M$ cesse-t-il d'être inversible, et que se passe-t-il pour $z\in[0,1]$ avec des fonctions concentrées près de $z$ ? Pour $A$ : quel opérateur compact est naturellement associé à $A$ ?`,
    t`Sépare les deux études. Pour $M$ : spectre, absence de valeurs propres, caractère continu. Pour $A$ : théorème spectral compact appliqué à $T$. La comparaison porte ensuite sur la compacité de $R(2,M)$.`,
    t`Sur $[0,1]$ : $u_n=|J_n|^{-1/2}\mathbb 1_{J_n}$, avec $J_n$ un intervalle autour de $z$. Pour $A$ : $\lambda_k=\tau_k^{-1}-1$. Pour la non-compacité : $e_k=\sqrt2\sin(k\pi\cdot)$ ou absence de vecteur propre.`,
  ],
  rubric: rubric({
    hypotheses: 'La compacité de $T$ et la dimension infinie sont utilisées explicitement.',
    methode: 'Le spectre de $M$ est calculé par inverse explicite et suite approchée ; celui de $A$ par le théorème spectral compact.',
    validite: 'Aucune confusion entre spectre, valeurs propres et mesure spectrale.',
    justifications: t`La non-compacité de $R(2,M)$ est démontrée, et non affirmée.`,
    conclusion: 'Les deux types de spectre sont comparés de façon précise.',
  }),
  variant: {
    statement: t`Soit $N$ la multiplication par $x^2$ sur $L^2(]0,1[)$, et soit $A=-\dfrac{d^2}{dx^2}$ sur $D(A)=H^2(]0,1[)\cap H^1_0(]0,1[)$. Montrer que $\sigma(N)=[0,1]$ sans valeur propre et que $\sigma(A)=\{k^2\pi^2:k\ge1\}$, purement discret. Calculer $\|R(2,N)\|$.`,
    solution: t`La fonction $m(x)=x^2$ est continue, strictement croissante et d'image $]0,1[$ sur $]0,1[$. Comme dans l'exercice, $zI-N$ a un inverse borné de multiplication par $1/(z-m)$ si $z\notin[0,1]$, de norme $\sup_x1/|z-m(x)|$ ; pour $z\in[0,1]$, une suite concentrée autour du point où $m=z$ fournit une suite approchée, donc $\sigma(N)=[0,1]$ ; et $(z-m)u=0$ p.p. impose $u=0$ p.p. Ainsi $N$ n'a pas de valeur propre et $\|R(2,N)\|=\sup_{]0,1[}1/(2-x^2)=1$.

D'après le polycopié (résolvante compacte du laplacien de Dirichlet, p. PDF 24), $(I+A)^{-1}$ est compact ; les fonctions propres sont $\sqrt2\sin(k\pi x)$ et les valeurs propres $k^2\pi^2$. La méthode de l'exercice donne $\sigma(A)=\{k^2\pi^2:k\ge1\}$, purement discret.`,
    closedChecks: [{ kind: 'rational', prompt: t`Valeur de $\|R(2,N)\|$`, expected: '1' }],
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT27: TheoremModule = {
  theorem: {
    id: 'spectral-general',
    spaces: [
      t`$H$ : espace de Hilbert, de norme $\|\cdot\|_H$ issue du produit scalaire $\langle\cdot,\cdot\rangle$.`,
      t`$A:D(A)\subset H\to H$ : opérateur auto-adjoint, densément défini, de domaine $D(A)$ ; $A=A^*$, domaines inclus.`,
      t`$E$ : mesure à valeurs projections sur les boréliens de $\mathbb R$ ; $\mu_u(B)=\|E(B)u\|^2_H$ est une mesure positive finie sur $\mathbb R$.`,
      t`$f:\mathbb R\to\mathbb C$ : fonction borélienne.`,
    ],
    hypotheses: [
      {
        id: 'h-autoadjoint',
        text: t`$A$ est auto-adjoint, densément défini.`,
        whenRemoved: t`La matrice $\begin{pmatrix}0&1\\0&0\end{pmatrix}$ sur $\mathbb C^2$ n'est pas diagonalisable : elle n'admet aucune écriture $\sum_j\lambda_jP_j$ avec des projecteurs orthogonaux $P_j$ et des réels $\lambda_j$.`,
      },
      { id: 'h-borelienne', text: t`$f$ est borélienne, pour que les intégrales contre $E$ et $\mu_u$ aient un sens.` },
    ],
    statement: t`Si $A$ est auto-adjoint sur $H$, il existe une mesure spectrale à valeurs projections $E$ telle que
$$A=\int_{\mathbb R}\lambda\,dE(\lambda),\qquad f(A)=\int_{\mathbb R}f(\lambda)\,dE(\lambda).$$
Pour $f$ borélienne, $D(f(A))=\{u:\int|f(\lambda)|^2\,d\mu_u(\lambda)<\infty\}$, où $\mu_u(B)=\|E(B)u\|_H^2$.`,
    conclusions: {
      existence: t`Existence d'une mesure spectrale $E$ à valeurs projections représentant $A$.`,
      autre: t`Calcul fonctionnel borélien : définition de $f(A)$ et de son domaine, sans hypothèse de compacité.`,
    },
    sourceProof: 'admise',
    proofOutline: [
      t`En dimension finie, $A=Q\,\mathrm{diag}(\lambda_j)\,Q^*$ et $f(A)=Q\,\mathrm{diag}(f(\lambda_j))\,Q^*$.`,
      t`Une mesure spectrale généralise ce mécanisme aux spectres non discrets : $E(B)$ joue le rôle de la somme des projecteurs propres associés aux $\lambda_j\in B$.`,
      t`Le polycopié annonce : « Nous avons étudié ses conséquences et sa représentation, pas la construction intégrale complète du théorème » (p. PDF 25). Le théorème reste admis ici.`,
    ],
    warnings: [
      t`Le spectre d'un opérateur auto-adjoint n'est pas fait que de valeurs propres : la multiplication par $x$ sur $L^2(]0,1[)$ n'en a aucune, et son spectre vaut $[0,1]$.`,
      t`$f(A)$ n'est pas défini sur tout $H$ en général : le domaine dépend de la croissance de $f$ sur le spectre.`,
      t`Le théorème fournit une mesure spectrale, pas une base hilbertienne de vecteurs propres : une telle base provient, sous hypothèse de compacité, du théorème spectral compact.`,
    ],
    usefulFor: t`Définir puissances fractionnaires, $e^{-tA}$, projections spectrales, et traiter les opérateurs dont le spectre n'est pas purement ponctuel.`,
    verification: { ...FROM_POLY, notes: 'Énoncé repris du polycopié (p. PDF 25) ; démonstration admise, comme au polycopié.' },
  },
  definitions: [
    {
      id: 'spectral-general-mesure-spectrale',
      term: 'Mesure spectrale à valeurs projections',
      statement: t`Application $E$ des boréliens de $\mathbb R$ dans les projections orthogonales de $H$ telle que $E(\emptyset)=0$, $E(\mathbb R)=I$, $E(B\cap C)=E(B)E(C)$ et, si $B=\bigsqcup_jB_j$, $E(B)u=\sum_jE(B_j)u$ pour tout $u\in H$.`,
      source: complement('Définition classique de la notion employée en section 6.5 (p. PDF 25), non détaillée au polycopié'),
    },
    {
      id: 'spectral-general-mu-u',
      term: t`Mesure $\mu_u$`,
      statement: t`Pour $u\in H$ : $\mu_u(B)=\|E(B)u\|^2$. C'est une mesure positive finie sur $\mathbb R$, de mesure totale $\|u\|^2$.`,
      source: poly(25, 'Section 6.5'),
    },
    {
      id: 'spectral-general-calcul-f',
      term: 'Calcul fonctionnel borélien',
      statement: t`Pour $f:\mathbb R\to\mathbb C$ borélienne : $f(A)=\int_{\mathbb R}f(\lambda)\,dE(\lambda)$, de domaine $D(f(A))=\{u:\int|f|^2\,d\mu_u<\infty\}$.`,
      source: poly(25, 'Section 6.5'),
    },
    {
      id: 'spectral-general-spectre-continu',
      term: 'Spectre continu',
      statement: t`Ensemble des $z\in\sigma(M)$ tels que $zI-M$ soit injectif, d'image dense et non surjectif.`,
      source: complement('Définition classique, utilisée pour l’exercice 27 difficile (p. PDF 43)'),
    },
  ],
  concepts: [
    {
      id: 'spectral-general-calcul-fonctionnel',
      label: 'Calcul fonctionnel borélien',
      reminder: t`$f(A)$ agit, sur un opérateur diagonal, en multipliant par $f(\lambda_n)$ ; son domaine est la sommabilité de $|f(\lambda_n)|^2|u_n|^2$ et dépend donc de la croissance de $f$ sur le spectre.`,
    },
    {
      id: 'spectral-general-spectre-ponctuel',
      label: 'Spectre et valeurs propres',
      reminder: t`Le spectre peut être non vide sans contenir de valeur propre : l'inversibilité de $zI-A$ ne se réduit pas à l'injectivité.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-spectral-general-domaine',
      theoremId: 'spectral-general',
      title: 'Domaine et fonction continue',
      claim: t`Pour tout opérateur auto-adjoint $A$ et toute fonction $f$ continue sur $\mathbb R$, $D(f(A))=H$.`,
      correctStatement: t`$D(f(A))=\{u:\int|f|^2\,d\mu_u<\infty\}$ dépend de la croissance de $f$ sur le spectre : $D(f(A))=H$ n'a lieu que si $f$ est essentiellement bornée relativement à $E$.`,
      task: t`Soit $A$ diagonal sur $\ell^2$, avec $\lambda_n=n$, $f(\lambda)=\lambda$ et $u_n=1/n$. Calcule la valeur commune des termes $|f(\lambda_n)|^2|u_n|^2$.`,
      check: { kind: 'rational', prompt: t`Valeur commune de $|f(\lambda_n)|^2|u_n|^2$`, expected: '1' },
      explanation: t`Chaque terme vaut $n^2\cdot n^{-2}=1$, de sorte que $\sum_n|f(\lambda_n)|^2|u_n|^2=+\infty$, alors que $\sum_n|u_n|^2=\sum_nn^{-2}<\infty$. Donc $u\in H$ et $u\notin D(f(A))$.`,
      concept: 'spectral-general-calcul-fonctionnel',
      source: poly(25, 'Section 6.5 (formule du domaine)'),
    },
    {
      id: 'ce-spectral-general-valeur-propre',
      theoremId: 'spectral-general',
      title: 'Spectre sans valeur propre',
      claim: t`Tout point du spectre d'un opérateur borné auto-adjoint est une valeur propre.`,
      correctStatement: t`Le spectre peut contenir des points qui ne sont pas valeurs propres : la multiplication par $x$ sur $L^2(]0,1[)$ a pour spectre $[0,1]$ et n'a aucune valeur propre.`,
      task: t`Pour $M$, multiplication par $x$ sur $L^2(]0,1[)$, $z=\frac12$ et $u_n=\sqrt n\,\mathbb 1_{]1/2,\,1/2+1/n[}$ (pour $n\ge2$), calcule $\|(zI-M)u_2\|^2$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\|(zI-M)u_2\|^2$`, expected: '1/12' },
      explanation: t`$\|u_n\|^2=n\cdot\frac1n=1$, et $\|(zI-M)u_n\|^2=n\int_0^{1/n}s^2\,ds=\frac1{3n^2}$. Pour $n=2$ : $\frac1{12}$. Le quotient $\|(zI-M)u_n\|/\|u_n\|$ tend vers $0$, donc $z$ appartient au spectre, sans être valeur propre puisque $(z-x)u(x)=0$ p.p. impose $u=0$ p.p.`,
      concept: 'spectral-general-spectre-ponctuel',
      source: complement('Calcul sur la multiplication par $x$, exercice 27 difficile (p. PDF 43)'),
    },
    {
      id: 'ce-spectral-general-resolvante',
      theoremId: 'spectral-general',
      title: 'Résolvante non compacte',
      claim: t`La résolvante d'un opérateur auto-adjoint est toujours compacte.`,
      correctStatement: t`La compacité de la résolvante est une hypothèse supplémentaire : elle force un spectre purement discret, ce qui est faux pour la multiplication par $x$.`,
      task: t`Pour $M$, multiplication par $x$ sur $L^2(]0,1[)$, $R(2,M)$ est la multiplication par $g(x)=\dfrac1{2-x}$. Calcule $\min_{[0,1]}g$.`,
      check: { kind: 'rational', prompt: t`Minimum de $g$ sur $[0,1]$`, expected: '1/2' },
      explanation: t`Comme $g$ est croissante, $\min_{[0,1]}g=g(0)=\frac12$. Pour la suite orthonormée $e_k(x)=\sqrt2\sin(k\pi x)$, on a $e_k\rightharpoonup0$ et $\|R(2,M)e_k\|\ge\frac12$ : $R(2,M)$ n'est pas compact.`,
      concept: 'compact-continue',
      source: complement('Exercice 27 difficile (p. PDF 43)'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT27;
