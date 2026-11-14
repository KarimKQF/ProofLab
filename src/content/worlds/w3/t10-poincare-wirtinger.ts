/**
 * Résultat 10 — Inégalité de Poincaré–Wirtinger.
 * Polycopié : section 3.3 (énoncé p. PDF 12, démonstration p. PDF 13), problème de Neumann
 * en section 3.5 (p. PDF 14) ; exercices 10 (p. PDF 39–40).
 * La démonstration par l'absurde ne fournit aucune valeur de la constante : aucune n'est annoncée.
 */
import { t, rubric, poly, FROM_POLY, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'poincare-wirtinger.facile',
  theoremId: 'poincare-wirtinger',
  level: 'facile',
  title: t`Moyenne de $u(x)=x$ sur $]0,1[$`,
  statement: t`Soit $\Omega=]0,1[$ et $u(x)=x$. Calculer la moyenne $u_\Omega=\frac1{|\Omega|}\int_\Omega u$. Vérifier que $v=u-u_\Omega$ est de moyenne nulle, puis calculer $\|v\|_{L^2}$ et $\|u'\|_{L^2}$ : qu'en déduit-on pour les constantes admissibles dans l'inégalité de Poincaré–Wirtinger sur $]0,1[$ ?`,
  source: poly(39, 'Exercice 10, facile'),
  prerequisites: [],
  concepts: ['poincare-wirtinger-moyenne-calcul', 'poincare-wirtinger-moyenne-nulle', 'poincare-wirtinger-constante', 'calcul-exact'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'd-u', kind: 'definition', text: t`$\Omega=]0,1[$ et $u(x)=x$ ; $u\in H^1(\Omega)$, de dérivée $u'=1$.` },
      { id: 'd-moy', kind: 'definition', text: t`Pour $w\in L^2(\Omega)$ : $w_\Omega=\frac1{|\Omega|}\int_\Omega w$.` },

      { id: 'mes', kind: 'egalite', text: t`$|\Omega|=1$.` },
      { id: 'int', kind: 'egalite', text: t`$\int_0^1x\,dx=\left[\frac{x^2}2\right]_0^1$.` },
      {
        id: 'moy',
        kind: 'egalite',
        text: t`$u_\Omega=\frac12$.`,
        masked: t`Valeur de $u_\Omega$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $u_\Omega$`, expected: '1/2' },
      },
      { id: 'moy-v', kind: 'egalite', text: t`$v=u-\frac12$ vérifie $v_\Omega=u_\Omega-\frac12=0$.` },
      {
        id: 'norme-v',
        kind: 'egalite',
        text: t`$\|v\|^2_{L^2}=\int_0^1\left(x-\frac12\right)^2dx=\frac1{12}$.`,
        masked: t`Valeur de $\|v\|^2_{L^2}=\int_0^1\left(x-\frac12\right)^2dx$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\int_0^1\left(x-\frac12\right)^2dx$`, expected: '1/12' },
      },
      { id: 'norme-up', kind: 'egalite', text: t`$\|u'\|^2_{L^2}=\int_0^11\,dx=1$.` },
      { id: 'compar', kind: 'egalite', text: t`$\|v\|_{L^2}=\frac1{2\sqrt3}\,\|u'\|_{L^2}$.` },
      { id: 'minor', kind: 'inegalite', text: t`Toute constante $C_\Omega$ admissible sur $]0,1[$ vérifie $C_\Omega\ge\frac1{2\sqrt3}$.` },
      { id: 'fin', kind: 'conclusion', text: t`$u_\Omega=\frac12$ ; $v=u-\frac12$ est de moyenne nulle, $\|v\|^2_{L^2}=\frac1{12}$ et $\|u'\|^2_{L^2}=1$ ; toute constante admissible vérifie $C_\Omega\ge\frac1{2\sqrt3}$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-optimale', kind: 'consequence', distractor: true, after: ['compar'], text: t`$\frac1{2\sqrt3}$ est la meilleure constante de Poincaré–Wirtinger sur $]0,1[$.` },
      { id: 'x-nulle', kind: 'consequence', distractor: true, after: ['moy-v'], text: t`Puisque $v$ est de moyenne nulle, $\|v\|_{L^2}=0$.` },
    ],
    justifications: [
      { id: 'j-mes', label: 'La mesure de Lebesgue d’un intervalle est sa longueur.' },
      { id: 'j-primitive', label: t`$\frac{x^2}2$ est une primitive de $x$.` },
      { id: 'j-moy', label: t`Définition de la moyenne : intégrale divisée par $|\Omega|$.` },
      { id: 'j-lin', label: t`Linéarité de l'intégrale : $(u-c)_\Omega=u_\Omega-c$ pour une constante $c$.` },
      { id: 'j-calc', label: t`Développement $\left(x-\frac12\right)^2=x^2-x+\frac14$ et intégration terme à terme.` },
      { id: 'j-calc-up', label: t`$u'=1$ sur $]0,1[$.` },
      { id: 'j-racine', label: t`Racines carrées : $\sqrt{1/12}=\frac1{2\sqrt3}$.` },
      { id: 'j-minor', label: t`Si $C_\Omega$ est admissible, l'inégalité appliquée à $u$ donne $\|v\|_{L^2}\le C_\Omega\|u'\|_{L^2}$.` },
      { id: 'j-synthese', label: 'Réunion des calculs.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-milieu', label: 'La moyenne d’une fonction sur un intervalle est sa valeur au milieu.' },
      { id: 'j-exemple', label: 'Le quotient obtenu sur un exemple est la meilleure constante.' },
    ],
    rules: [
      { from: ['d-u'], to: 'mes', by: 'j-mes' },
      { from: ['d-u'], to: 'int', by: 'j-primitive' },
      { from: ['d-moy', 'mes', 'int'], to: 'moy', by: 'j-moy' },
      { from: ['moy', 'd-moy'], to: 'moy-v', by: 'j-lin' },
      { from: ['moy'], to: 'norme-v', by: 'j-calc' },
      { from: ['d-u'], to: 'norme-up', by: 'j-calc-up' },
      { from: ['norme-v', 'norme-up'], to: 'compar', by: 'j-racine' },
      { from: ['compar'], to: 'minor', by: 'j-minor' },
      { from: ['moy', 'moy-v', 'norme-v', 'norme-up', 'minor'], to: 'fin', by: 'j-synthese' },
    ],
    traps: [
      {
        conclusion: 'moy',
        by: 'j-milieu',
        verdict: 'incorrect',
        concept: 'poincare-wirtinger-moyenne-calcul',
        message: t`La valeur trouvée est juste ici parce que $u$ est affine, mais la règle est fausse : la moyenne se calcule par l'intégrale.`,
        counterexample: t`Pour $w(x)=x^2$ sur $]0,1[$ : $w_\Omega=\frac13$, alors que $w(\frac12)=\frac14$.`,
      },
      {
        conclusion: 'x-optimale',
        verdict: 'incorrect',
        concept: 'poincare-wirtinger-constante',
        message: 'Un exemple ne fournit qu’une minoration de toute constante admissible : une autre fonction peut donner un quotient plus grand.',
        counterexample: t`$w(x)=\cos(\pi x)$ est de moyenne nulle, avec $\|w\|^2_{L^2}=\frac12$ et $\|w'\|^2_{L^2}=\frac{\pi^2}2$ : son quotient vaut $\frac1\pi>\frac1{2\sqrt3}$, donc $\frac1{2\sqrt3}$ n'est même pas admissible.`,
      },
      {
        conclusion: 'x-nulle',
        verdict: 'incorrect',
        concept: 'poincare-wirtinger-moyenne-nulle',
        message: 'Une fonction de moyenne nulle n’est pas la fonction nulle.',
        counterexample: t`$v(x)=x-\frac12$ est de moyenne nulle et $\|v\|^2_{L^2}=\frac1{12}\neq 0$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'mes',
        label: t`Ne plus disposer de $|\Omega|=1$`,
        necessary: true,
        explanation: t`La moyenne divise l'intégrale par $|\Omega|$ : sans la mesure du domaine, elle ne se calcule pas.`,
        counterexample: t`Sur $]0,2[$, $\int_0^2x\,dx=2$ alors que la moyenne de $x$ vaut $1$ : omettre la division par $|\Omega|$ fausse le résultat.`,
      },
    ],
  },
  solution: t`**Moyenne.** $|\Omega|=1$ et $\int_0^1x\,dx=\frac12$, donc $u_\Omega=\frac12$.

**Fonction de moyenne nulle.** $v=u-\frac12$ vérifie $v_\Omega=u_\Omega-\frac12=0$.

**Normes.** $\|v\|^2_{L^2}=\int_0^1\left(x^2-x+\frac14\right)dx=\frac13-\frac12+\frac14=\frac1{12}$, et $\|u'\|^2_{L^2}=1$. Donc $\|u-u_\Omega\|_{L^2}=\frac1{2\sqrt3}\|u'\|_{L^2}$.

**Conséquence.** Si $C_\Omega$ est une constante admissible sur $]0,1[$, l'inégalité appliquée à $u$ impose $C_\Omega\ge\frac1{2\sqrt3}$. Ce calcul ne donne qu'une minoration : il ne détermine pas la meilleure constante, et $\frac1{2\sqrt3}$ n'est d'ailleurs pas admissible, comme le montre $w(x)=\cos(\pi x)$, de quotient $\frac1\pi>\frac1{2\sqrt3}$.`,
  steps: [
    t`Calculer $|\Omega|$ et $\int_\Omega u$.`,
    t`En déduire $u_\Omega$.`,
    t`Vérifier que $u-u_\Omega$ est de moyenne nulle.`,
    t`Calculer $\|u-u_\Omega\|_{L^2}$ et $\|u'\|_{L^2}$.`,
    'En déduire une minoration de toute constante admissible, sans conclure à l’optimalité.',
  ],
  commonErrors: [
    { id: 'e-milieu', description: 'Remplacer la moyenne par la valeur au milieu de l’intervalle.', concept: 'poincare-wirtinger-moyenne-calcul' },
    { id: 'e-nulle', description: 'Confondre fonction de moyenne nulle et fonction nulle.', concept: 'poincare-wirtinger-moyenne-nulle' },
    { id: 'e-optimale', description: 'Conclure qu’un quotient calculé sur un exemple est la meilleure constante.', concept: 'poincare-wirtinger-constante' },
  ],
  hints: [
    t`La moyenne est une intégrale divisée par la mesure du domaine : que valent ces deux quantités sur $]0,1[$ ?`,
    t`Une fois $u_\Omega$ connu, développe $\left(x-u_\Omega\right)^2$ pour calculer $\|u-u_\Omega\|^2_{L^2}$, et compare à $\|u'\|^2_{L^2}$.`,
    t`$u_\Omega=\frac12$ et $\int_0^1\left(x-\frac12\right)^2dx=\frac13-\frac12+\frac14$ ; une constante admissible doit dominer le quotient obtenu.`,
  ],
  rubric: rubric({
    hypotheses: t`La mesure $|\Omega|=1$ et la définition de la moyenne sont utilisées explicitement.`,
    methode: 'La moyenne, puis les deux normes, sont calculées exactement.',
    validite: t`Les valeurs $\frac12$ et $\frac1{12}$ sont exactes.`,
    justifications: 'Aucune règle fausse (valeur au milieu) n’est invoquée.',
    conclusion: 'La minoration de toute constante admissible est obtenue, sans affirmation d’optimalité.',
  }),
  variant: {
    statement: t`Soit $\Omega=]0,2[$ et $u(x)=x^2$. Calculer $u_\Omega$, puis $\|u-u_\Omega\|^2_{L^2}$ et $\|u'\|^2_{L^2}$.`,
    solution: t`$|\Omega|=2$ et $\int_0^2x^2\,dx=\frac83$, donc $u_\Omega=\frac43$, qui n'est pas la valeur au milieu $u(1)=1$. Ensuite $\|u-u_\Omega\|^2_{L^2}=\int_0^2\left(x^4-\frac83x^2+\frac{16}9\right)dx=\frac{32}5-\frac{64}9+\frac{32}9=\frac{128}{45}$, et $\|u'\|^2_{L^2}=\int_0^24x^2\,dx=\frac{32}3$. Le quotient $\frac{128}{45}\cdot\frac3{32}=\frac4{15}$ minore $C_\Omega^2$ pour toute constante admissible sur $]0,2[$, sans renseigner sur la meilleure constante.`,
    closedChecks: [
      { kind: 'rational', prompt: t`Valeur de $\|u-u_\Omega\|^2_{L^2}/\|u'\|^2_{L^2}$`, expected: '4/15' },
    ],
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'd-u', kind: 'definition', text: t`$\Omega=]0,2[$ et $u(x)=x^2$, de dérivée $u'(x)=2x$.` },
        { id: 'd-moy', kind: 'definition', text: t`Pour $w\in L^2(\Omega)$ : $w_\Omega=\frac1{|\Omega|}\int_\Omega w$.` },
        { id: 'mes', kind: 'egalite', text: t`$|\Omega|=2$.` },
        {
          id: 'int',
          kind: 'egalite',
          text: t`$\int_0^2x^2\,dx=\frac83$.`,
          masked: t`Valeur de $\int_0^2x^2\,dx$ : à calculer.`,
          check: { kind: 'rational', prompt: t`Valeur de $\int_0^2x^2\,dx$`, expected: '8/3' },
        },
        {
          id: 'moy',
          kind: 'egalite',
          text: t`$u_\Omega=\frac43$.`,
          masked: t`Valeur de $u_\Omega$ : à calculer.`,
          check: { kind: 'rational', prompt: t`Valeur de $u_\Omega$`, expected: '4/3' },
        },
        {
          id: 'norme-v',
          kind: 'egalite',
          text: t`$\|u-u_\Omega\|^2_{L^2}=\frac{128}{45}$.`,
          masked: t`Valeur de $\|u-u_\Omega\|^2_{L^2}$ : à calculer.`,
          check: { kind: 'rational', prompt: t`Valeur de $\int_0^2\left(x^2-\frac43\right)^2dx$`, expected: '128/45' },
        },
        {
          id: 'norme-up',
          kind: 'egalite',
          text: t`$\|u'\|^2_{L^2}=\frac{32}3$.`,
          masked: t`Valeur de $\|u'\|^2_{L^2}$ : à calculer.`,
          check: { kind: 'rational', prompt: t`Valeur de $\int_0^24x^2\,dx$`, expected: '32/3' },
        },
        { id: 'fin', kind: 'conclusion', text: t`$u_\Omega=\frac43$, $\|u-u_\Omega\|^2_{L^2}=\frac{128}{45}$ et $\|u'\|^2_{L^2}=\frac{32}3$.` },
        { id: 'x-oubli', kind: 'egalite', distractor: true, after: ['int'], text: t`$u_\Omega=\frac83$.` },
        { id: 'x-milieu', kind: 'egalite', distractor: true, text: t`$u_\Omega=u(1)=1$.` },
      ],
      justifications: [
        { id: 'j-mes', label: 'Longueur de l’intervalle.' },
        { id: 'j-primitive', label: t`$\frac{x^3}3$ est une primitive de $x^2$.` },
        { id: 'j-moy', label: t`Définition de la moyenne : intégrale divisée par $|\Omega|$.` },
        { id: 'j-dev', label: t`Développement $\left(x^2-\frac43\right)^2=x^4-\frac83x^2+\frac{16}9$ et intégration terme à terme.` },
        { id: 'j-derivee', label: t`$|u'(x)|^2=4x^2$, puis intégration.` },
        { id: 'j-synthese', label: 'Réunion des calculs.' },
        { id: 'j-milieu', label: 'La moyenne est la valeur au milieu de l’intervalle.' },
      ],
      rules: [
        { from: ['d-u'], to: 'mes', by: 'j-mes' },
        { from: ['d-u'], to: 'int', by: 'j-primitive' },
        { from: ['d-moy', 'mes', 'int'], to: 'moy', by: 'j-moy' },
        { from: ['d-u', 'moy'], to: 'norme-v', by: 'j-dev' },
        { from: ['d-u'], to: 'norme-up', by: 'j-derivee' },
        { from: ['moy', 'norme-v', 'norme-up'], to: 'fin', by: 'j-synthese' },
      ],
      traps: [
        {
          conclusion: 'x-oubli',
          verdict: 'incorrect',
          concept: 'poincare-wirtinger-moyenne-calcul',
          message: t`La moyenne divise l'intégrale par $|\Omega|=2$.`,
          counterexample: t`Pour $w\equiv 1$ sur $]0,2[$, l'intégrale vaut $2$, alors que la moyenne d'une constante est cette constante, $1$.`,
        },
        {
          conclusion: 'x-milieu',
          verdict: 'incorrect',
          concept: 'poincare-wirtinger-moyenne-calcul',
          message: 'La valeur au milieu ne coïncide avec la moyenne que pour des fonctions particulières, par exemple affines.',
          counterexample: t`Ici $u_\Omega=\frac43\neq 1=u(1)$.`,
        },
      ],
      removable: [
        {
          hypothesis: 'mes',
          label: t`Ne plus disposer de $|\Omega|=2$`,
          necessary: true,
          explanation: 'La moyenne ne se calcule pas sans la mesure du domaine.',
          counterexample: t`Sans division par $|\Omega|$, on trouverait $\frac83$, qui n'est pas la moyenne : la moyenne d'une constante $c$ sur $]0,2[$ vaut $c$, non $2c$.`,
        },
      ],
    },
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'poincare-wirtinger.intermediaire',
  theoremId: 'poincare-wirtinger',
  level: 'intermediaire',
  title: 'Poincaré–Wirtinger par l’absurde',
  statement: t`Soit $\Omega\subset\mathbb R^d$ un ouvert borné, connexe et lipschitzien. Démontrer par l'absurde, à l'aide du théorème de Rellich–Kondrachov, qu'il existe $C_\Omega>0$ tel que $\|u-u_\Omega\|_{L^2}\le C_\Omega\|\nabla u\|_{L^2}$ pour tout $u\in H^1(\Omega)$.`,
  source: poly(13, 'Démonstration, section 3.3 (p. PDF 12–13) ; exercice 10, intermédiaire (p. PDF 39)'),
  prerequisites: [],
  concepts: ['faible-fort', 'poincare-wirtinger-connexite', 'poincare-wirtinger-constantes', 'circularite', 'quantificateurs'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-borne', kind: 'hypothese', text: t`$\Omega\subset\mathbb R^d$ est un ouvert borné.` },
      { id: 'h-connexe', kind: 'hypothese', text: t`$\Omega$ est connexe.` },
      { id: 'h-lip', kind: 'hypothese', text: t`$\Omega$ est lipschitzien.` },
      { id: 'abs', kind: 'hypothese', local: true, text: t`Supposons par l'absurde qu'aucune constante $C_\Omega>0$ ne convienne.` },

      { id: 'neg', kind: 'consequence', text: t`Pour tout $n\ge 1$, il existe $u_n\in H^1(\Omega)$ tel que $\|u_n-(u_n)_\Omega\|_{L^2}>n\,\|\nabla u_n\|_{L^2}$.` },
      { id: 'vn', kind: 'consequence', text: t`$v_n=\frac{u_n-(u_n)_\Omega}{\|u_n-(u_n)_\Omega\|_{L^2}}$ est bien défini, et $(v_n)_\Omega=0$, $\|v_n\|_{L^2}=1$, $\|\nabla v_n\|_{L^2}<\frac1n$ ; en particulier $\|v_n\|^2_{H^1}\le 2$.` },
      { id: 'rellich', kind: 'application-theoreme', text: t`Une sous-suite $(v_{n_k})$ converge fortement dans $L^2(\Omega)$ vers un $v\in L^2(\Omega)$.` },
      { id: 'norme', kind: 'egalite', text: t`$\|v\|_{L^2}=1$.` },
      { id: 'moy', kind: 'egalite', text: t`$v_\Omega=0$.` },
      { id: 'grad', kind: 'egalite', text: t`$\nabla v=0$ dans $\mathcal D'(\Omega)$.` },
      { id: 'nul', kind: 'egalite', text: t`$v=0$ presque partout.` },
      { id: 'contra', kind: 'contradiction', text: t`$\|v\|_{L^2}=1$ et $v=0$ : contradiction.` },
      { id: 'fin', kind: 'conclusion', text: t`Il existe $C_\Omega>0$ tel que $\|u-u_\Omega\|_{L^2}\le C_\Omega\|\nabla u\|_{L^2}$ pour tout $u\in H^1(\Omega)$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-faible', kind: 'consequence', distractor: true, after: ['vn'], text: t`La convergence faible d'une sous-suite de $(v_n)$ dans $L^2(\Omega)$ suffit à garantir $\|v\|_{L^2}=1$.` },
      { id: 'x-h10', kind: 'consequence', distractor: true, text: t`$u_n-(u_n)_\Omega\in H^1_0(\Omega)$, si bien que l'inégalité de Poincaré conclut directement.` },
    ],
    justifications: [
      { id: 'j-negation', label: t`Négation de « il existe $C$ tel que, pour tout $u$, … », appliquée avec $C=n$.` },
      { id: 'j-normalise', label: t`L'inégalité stricte impose $\|u_n-(u_n)_\Omega\|_{L^2}>0$ ; linéarité de la moyenne (définie car $\Omega$ est borné), homogénéité des normes, gradient nul des constantes.` },
      { id: 'j-rellich', label: t`Théorème de Rellich–Kondrachov : l'injection $H^1(\Omega)\hookrightarrow L^2(\Omega)$ est compacte pour $\Omega$ borné lipschitzien.`, theorem: 'rellich' },
      { id: 'j-norme', label: t`Continuité de la norme pour la convergence forte : $\big|\|v_{n_k}\|-\|v\|\big|\le\|v_{n_k}-v\|$.` },
      { id: 'j-moy', label: t`Continuité de la moyenne sur $L^2(\Omega)$ : $|w_\Omega|\le|\Omega|^{-1/2}\|w\|_{L^2}$ par Cauchy–Schwarz.` },
      { id: 'j-grad', label: t`Passage à la limite dans la définition des dérivées distributionnelles : convergence forte de $(v_{n_k})$ dans $L^2$ et $\|\nabla v_{n_k}\|_{L^2}\to 0$.`, theorem: 'distributions' },
      { id: 'j-connexe', label: 'Sur un ouvert connexe, une distribution de gradient nul est une constante ; la moyenne identifie cette constante.' },
      { id: 'j-contra', label: t`Une fonction nulle presque partout a une norme $L^2$ nulle.` },
      { id: 'j-absurde', label: 'Raisonnement par l’absurde.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-faible', label: t`Semi-continuité inférieure de la norme : $\|v\|_{L^2}\le\liminf_k\|v_{n_k}\|_{L^2}=1$, donc $\|v\|_{L^2}=1$.` },
      { id: 'j-grad-nul', label: t`Un gradient nul entraîne directement $v=0$.` },
      { id: 'j-poincare', label: t`Inégalité de Poincaré appliquée à $u-u_\Omega$.`, theorem: 'poincare' },
      { id: 'j-pw', label: 'Inégalité de Poincaré–Wirtinger.', theorem: 'poincare-wirtinger' },
    ],
    rules: [
      { from: ['abs'], to: 'neg', by: 'j-negation' },
      { from: ['neg', 'h-borne'], to: 'vn', by: 'j-normalise' },
      { from: ['vn', 'h-borne', 'h-lip'], to: 'rellich', by: 'j-rellich' },
      { from: ['rellich', 'vn'], to: 'norme', by: 'j-norme' },
      { from: ['rellich', 'vn', 'h-borne'], to: 'moy', by: 'j-moy' },
      { from: ['rellich', 'vn'], to: 'grad', by: 'j-grad' },
      { from: ['grad', 'moy', 'h-connexe'], to: 'nul', by: 'j-connexe' },
      { from: ['norme', 'nul'], to: 'contra', by: 'j-contra' },
      { from: ['contra'], to: 'fin', by: 'j-absurde' },
    ],
    traps: [
      {
        conclusion: 'x-faible',
        verdict: 'incorrect',
        concept: 'faible-fort',
        message: t`Une limite faible ne conserve pas la norme : on obtient seulement $\|v\|_{L^2}\le 1$. C'est la convergence forte fournie par Rellich qui donne $\|v\|_{L^2}=1$.`,
        counterexample: t`Dans $L^2(\mathbb R)$, pour $\chi\in C^\infty_c(\mathbb R)$ non nulle, $\chi(\cdot-n)$ converge faiblement vers $0$, alors que $\|\chi(\cdot-n)\|_{L^2}=\|\chi\|_{L^2}\neq 0$.`,
      },
      {
        conclusion: 'x-h10',
        verdict: 'incorrect',
        concept: 'poincare-wirtinger-constantes',
        message: t`Retirer la moyenne ne fait pas s'annuler la fonction au bord : $u-u_\Omega$ n'appartient pas à $H^1_0(\Omega)$ en général.`,
        counterexample: t`Sur $]0,1[$, $u(x)=x$ donne $u-u_\Omega=x-\frac12$, qui vaut $-\frac12$ en $0$ : cette fonction n'est pas dans $H^1_0(]0,1[)$.`,
      },
      {
        conclusion: 'norme',
        by: 'j-faible',
        verdict: 'incorrect',
        concept: 'faible-fort',
        message: t`La semi-continuité inférieure ne donne que $\|v\|_{L^2}\le 1$ : l'égalité exige la convergence forte.`,
        counterexample: t`$\chi(\cdot-n)\rightharpoonup 0$ dans $L^2(\mathbb R)$, et la limite a une norme nulle, strictement inférieure à $\|\chi\|_{L^2}$.`,
      },
      {
        conclusion: 'nul',
        by: 'j-grad-nul',
        verdict: 'incorrect',
        concept: 'poincare-wirtinger-constantes',
        message: 'Un gradient nul laisse les constantes : il faut la connexité, puis la moyenne nulle.',
        counterexample: t`$v\equiv 1$ a un gradient nul et n'est pas nulle.`,
      },
      {
        conclusion: 'fin',
        by: 'j-poincare',
        verdict: 'incorrect',
        concept: 'poincare-wirtinger-constantes',
        message: t`L'inégalité de Poincaré porte sur $H^1_0(\Omega)$, et $u-u_\Omega$ n'y appartient pas en général ; elle n'est d'ailleurs pas disponible dans cette démonstration.`,
      },
      {
        conclusion: 'fin',
        by: 'j-pw',
        verdict: 'incorrect',
        concept: 'circularite',
        message: 'Invoquer Poincaré–Wirtinger revient à supposer ce qu’il faut démontrer.',
      },
    ],
    removable: [
      {
        hypothesis: 'h-connexe',
        label: t`Ne plus supposer $\Omega$ connexe`,
        necessary: true,
        explanation: 'Sans connexité, un gradient nul n’impose pas une constante unique : la contradiction ne se forme plus, et l’inégalité est fausse.',
        counterexample: t`$\Omega=]0,1[\cup]2,3[$, $u=1$ sur $]0,1[$ et $u=-1$ sur $]2,3[$ : $u_\Omega=0$, $\nabla u=0$ et $\|u-u_\Omega\|_{L^2}=\sqrt2$.`,
      },
      {
        hypothesis: 'h-lip',
        label: t`Ne plus supposer $\Omega$ lipschitzien`,
        necessary: true,
        explanation: 'Rellich–Kondrachov n’est plus disponible, et l’inégalité peut tomber sur un ouvert borné connexe irrégulier.',
        counterexample: t`Peigne de $\mathbb R^2$ : base $]0,1[\times]-1,0[$, couloirs $]a_k,a_k+\delta_k[\times[0,1]$ et pièces $]a_k,a_k+\ell_k[\times]1,1+\ell_k[$, avec $a_k=2^{-k}$, $\ell_k=2^{-k-2}$, $\delta_k=2^{-4k}$. La fonction $u_k$ égale à $1/\ell_k$ sur la $k$-ième pièce, à $y/\ell_k$ dans le $k$-ième couloir et à $0$ ailleurs est dans $H^1$, avec $\|u_k\|_{L^2}\ge 1$, $\|\nabla u_k\|^2_{L^2}=\delta_k/\ell_k^2=2^{4-2k}\to 0$ et $(u_k)_\Omega\to 0$ : aucune constante ne convient.`,
      },
      {
        hypothesis: 'h-borne',
        label: t`Ne plus supposer $\Omega$ borné`,
        necessary: true,
        explanation: 'Sans borne, la moyenne peut ne pas être définie, et Rellich ne s’applique plus.',
        counterexample: t`Sur $\Omega=]0,+\infty[$, $u(x)=\frac1{1+x}$ appartient à $H^1(\Omega)$ sans être intégrable, et $|\Omega|=+\infty$ : la moyenne n'a pas de sens.`,
      },
    ],
  },
  solution: t`**Négation.** Si aucune constante ne convient, pour tout $n\ge 1$ il existe $u_n\in H^1(\Omega)$ tel que $\|u_n-(u_n)_\Omega\|_{L^2}>n\|\nabla u_n\|_{L^2}\ge 0$. On normalise : $v_n=\frac{u_n-(u_n)_\Omega}{\|u_n-(u_n)_\Omega\|_{L^2}}$ vérifie $(v_n)_\Omega=0$, $\|v_n\|_{L^2}=1$ et $\|\nabla v_n\|_{L^2}<\frac1n$, donc $\|v_n\|^2_{H^1}\le 2$.

**Compacité.** $\Omega$ étant borné et lipschitzien, Rellich–Kondrachov fournit une sous-suite $(v_{n_k})$ convergeant fortement dans $L^2(\Omega)$ vers un $v$.

**Passage à la limite.** La convergence forte donne $\|v\|_{L^2}=1$ et, par continuité de la moyenne ($|w_\Omega|\le|\Omega|^{-1/2}\|w\|_{L^2}$), $v_\Omega=0$. Pour $\varphi\in\mathcal D(\Omega)$ : $\int_\Omega v\,\partial_i\varphi=\lim_k\int_\Omega v_{n_k}\partial_i\varphi=-\lim_k\int_\Omega\partial_iv_{n_k}\,\varphi=0$, car $\|\partial_iv_{n_k}\|_{L^2}\to 0$. Donc $\nabla v=0$ dans $\mathcal D'(\Omega)$ ; les gradients convergent ici fortement vers $0$, a fortiori faiblement, comme l'écrit le polycopié.

**Contradiction.** $\Omega$ étant connexe, $v$ est presque partout égale à une constante $c$, et $c=v_\Omega=0$ : donc $v=0$, ce qui contredit $\|v\|_{L^2}=1$.

**Remarques.** La preuve ne fournit aucune valeur de $C_\Omega$. La convergence forte est indispensable : une limite faible ne donnerait que $\|v\|_{L^2}\le 1$. Le fait qu'une distribution de gradient nul sur un ouvert connexe soit constante se démontre par régularisation : $v$ est localement constante, et la connexité recolle les constantes.`,
  steps: [
    'Nier l’énoncé, puis normaliser les contre-exemples.',
    t`Borner la suite dans $H^1(\Omega)$ et extraire par Rellich.`,
    t`Passer à la limite : norme, moyenne, puis gradient au sens des distributions.`,
    t`Utiliser la connexité, puis la moyenne nulle, pour obtenir $v=0$.`,
    'Conclure par contradiction avec la norme unité.',
  ],
  commonErrors: [
    { id: 'e-faible', description: t`Conclure $\|v\|_{L^2}=1$ à partir d'une convergence faible.`, concept: 'faible-fort' },
    { id: 'e-connexe', description: 'Oublier la connexité pour passer de « gradient nul » à « constante ».', concept: 'poincare-wirtinger-connexite' },
    { id: 'e-h10', description: t`Appliquer Poincaré à $u-u_\Omega$, qui n'est pas dans $H^1_0(\Omega)$.`, concept: 'poincare-wirtinger-constantes' },
  ],
  hints: [
    t`Que signifie précisément « aucune constante ne convient » ? Quantifie, puis normalise pour obtenir une suite de norme $L^2$ égale à $1$.`,
    t`La suite normalisée est bornée dans $H^1$ : la compacité de Rellich donne une limite forte dans $L^2$. Examine sa norme, sa moyenne et son gradient.`,
    t`$\nabla v=0$ sur un ouvert connexe donne $v$ constante ; la moyenne nulle force $v=0$, incompatible avec $\|v\|_{L^2}=1$.`,
  ],
  rubric: rubric({
    hypotheses: t`Les trois hypothèses (borné, connexe, lipschitzien) sont mobilisées à l'endroit où elles servent.`,
    methode: 'Négation, normalisation, compacité, passage à la limite, contradiction.',
    validite: 'La convergence forte est utilisée pour la norme et la moyenne ; le gradient est traité au sens des distributions.',
    justifications: 'Rellich est cité avec ses hypothèses ; Poincaré n’est pas invoqué.',
    conclusion: 'L’existence d’une constante est obtenue, sans valeur explicite.',
  }),
  variant: {
    statement: t`Soit $\Omega=]a,b[$ avec $a<b$. Montrer directement, sans compacité, que $\|u-u_\Omega\|_{L^2}\le(b-a)\|u'\|_{L^2}$ pour tout $u\in H^1(]a,b[)$.`,
    solution: t`Tout $u\in H^1(]a,b[)$ admet un représentant continu tel que $u(x)-u(y)=\int_y^xu'$ pour $x,y\in[a,b]$ ; par Cauchy–Schwarz, $|u(x)-u(y)|\le(b-a)^{1/2}\|u'\|_{L^2}$. Comme $u(x)-u_\Omega=\frac1{b-a}\int_a^b\big(u(x)-u(y)\big)\,dy$, on obtient $|u(x)-u_\Omega|\le(b-a)^{1/2}\|u'\|_{L^2}$ pour tout $x$, puis, en intégrant sur $]a,b[$, $\|u-u_\Omega\|^2_{L^2}\le(b-a)^2\|u'\|^2_{L^2}$. La constante $b-a$ est explicite, sans être annoncée comme optimale ; la connexité de l'intervalle intervient dans la formule $u(x)-u(y)=\int_y^xu'$.`,
  },
  verification: FROM_POLY,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'poincare-wirtinger.difficile',
  theoremId: 'poincare-wirtinger',
  level: 'difficile',
  title: 'Problème de Neumann : compatibilité, constantes, moyenne nulle',
  statement: t`Soit $\Omega\subset\mathbb R^d$ un ouvert borné, connexe et lipschitzien, $f\in L^2(\Omega)$ et $a(u,v)=\int_\Omega\nabla u\cdot\nabla v$. Le problème de Neumann $-\Delta u=f$ dans $\Omega$, $\partial_\nu u=0$ sur $\partial\Omega$, s'écrit sous forme faible : trouver $u\in H^1(\Omega)$ tel que $a(u,v)=\int_\Omega fv$ pour tout $v\in H^1(\Omega)$. Montrer que $\int_\Omega f=0$ est nécessaire. Sous cette condition, montrer qu'il existe une unique solution $u_0$ dans $V_0=\{v\in H^1(\Omega) : \int_\Omega v=0\}$, que les solutions dans $H^1(\Omega)$ sont exactement les $u_0+c$, $c\in\mathbb R$, et que $\|\nabla u_0\|_{L^2}\le C_\Omega\|f\|_{L^2}$.`,
  source: poly(14, 'Section 3.5 ; exercice 10, difficile (p. PDF 40)'),
  prerequisites: ['lax-milgram'],
  concepts: ['compatibilite-neumann', 'poincare-wirtinger-constantes', 'poincare-wirtinger-connexite', 'hypotheses-theoreme', 'existence-unicite'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-omega', kind: 'hypothese', text: t`$\Omega\subset\mathbb R^d$ est un ouvert borné et lipschitzien.` },
      { id: 'h-connexe', kind: 'hypothese', text: t`$\Omega$ est connexe.` },
      { id: 'h-f', kind: 'hypothese', text: t`$f\in L^2(\Omega)$.` },
      { id: 'h-comp', kind: 'hypothese', text: t`$\int_\Omega f=0$ (condition de compatibilité).` },
      { id: 'd-a', kind: 'definition', text: t`$a(u,v)=\int_\Omega\nabla u\cdot\nabla v$ ; une solution est un $u\in H^1(\Omega)$ tel que $a(u,v)=\int_\Omega fv$ pour tout $v\in H^1(\Omega)$ ; $V_0=\{v\in H^1(\Omega) : \int_\Omega v=0\}$.` },

      { id: 'nec', kind: 'consequence', text: t`S'il existe une solution $u\in H^1(\Omega)$, alors $\int_\Omega f=0$.` },
      { id: 'cadre', kind: 'consequence', text: t`$V_0$ est un sous-espace fermé de $H^1(\Omega)$, donc un espace de Hilbert, sur lequel $a$ et $v\mapsto\int_\Omega fv$ sont continues.` },
      { id: 'coer', kind: 'inegalite', text: t`Pour tout $v\in V_0$ : $\|v\|_{L^2}\le C_\Omega\|\nabla v\|_{L^2}$, donc $a(v,v)\ge\frac{1}{1+C_\Omega^2}\|v\|^2_{H^1}$.` },
      { id: 'lm', kind: 'application-theoreme', text: t`Il existe un unique $u_0\in V_0$ tel que $a(u_0,v)=\int_\Omega fv$ pour tout $v\in V_0$.` },
      { id: 'ext', kind: 'egalite', text: t`Pour tout $v\in H^1(\Omega)$ : $a(u_0,v)=\int_\Omega fv$ ; $u_0$ est solution.` },
      { id: 'toutes', kind: 'consequence', text: t`Les solutions dans $H^1(\Omega)$ sont exactement les $u_0+c$, $c\in\mathbb R$ ; $u_0$ est la seule de moyenne nulle.` },
      { id: 'est', kind: 'inegalite', text: t`$\|\nabla u_0\|_{L^2}\le C_\Omega\|f\|_{L^2}$.` },
      { id: 'fin', kind: 'conclusion', text: t`La condition $\int_\Omega f=0$ est nécessaire ; sous cette condition, le problème de Neumann admet une unique solution $u_0$ de moyenne nulle, les solutions sont les $u_0+c$, $c\in\mathbb R$, et $\|\nabla u_0\|_{L^2}\le C_\Omega\|f\|_{L^2}$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-unique-H1', kind: 'consequence', distractor: true, after: ['ext'], text: t`Le problème faible admet une unique solution dans $H^1(\Omega)$.` },
      { id: 'x-sans-comp', kind: 'consequence', distractor: true, text: t`Pour tout $f\in L^2(\Omega)$, le problème faible admet une solution dans $H^1(\Omega)$.` },
    ],
    justifications: [
      { id: 'j-test-un', label: t`La constante $1$ appartient à $H^1(\Omega)$ ($\Omega$ borné) et $\nabla 1=0$ : on teste l'équation par $v=1$.` },
      { id: 'j-cadre', label: t`$V_0$ est le noyau de $v\mapsto\int_\Omega v$, continue car $\left|\int_\Omega v\right|\le|\Omega|^{1/2}\|v\|_{L^2}$ ; continuité de $a$ et du second membre par Cauchy–Schwarz.` },
      { id: 'j-pw', label: t`Poincaré–Wirtinger pour $v\in V_0$, où $v_\Omega=0$, puis $\|v\|^2_{H^1}\le(1+C_\Omega^2)\|\nabla v\|^2_{L^2}$.`, theorem: 'poincare-wirtinger' },
      { id: 'j-lm', label: t`Théorème de Lax–Milgram dans le Hilbert $V_0$.`, theorem: 'lax-milgram' },
      { id: 'j-ext', label: t`Décomposition $v=(v-v_\Omega)+v_\Omega$, avec $v-v_\Omega\in V_0$ et $\nabla v_\Omega=0$, équation sur $V_0$, puis condition de compatibilité.` },
      { id: 'j-toutes', label: t`Si $w$ est la différence de deux solutions, le test $v=w$ donne $\nabla w=0$, donc $w$ est constante sur l'ouvert connexe $\Omega$ ; réciproquement, une constante ne change pas $\nabla u$.` },
      { id: 'j-est', label: t`Test par $v=u_0\in V_0$, Cauchy–Schwarz, puis Poincaré–Wirtinger.` },
      { id: 'j-synthese', label: 'Réunion des résultats établis.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-lm-h1', label: t`Lax–Milgram dans $H^1(\Omega)$ tout entier, avec la forme $a$.`, theorem: 'lax-milgram' },
      { id: 'j-ext-sans-comp', label: t`$\nabla(v-v_\Omega)=\nabla v$ : l'équation testée sur $V_0$ vaut donc pour tout $v\in H^1(\Omega)$.` },
      { id: 'j-poincare', label: t`Inégalité de Poincaré pour $v\in V_0$.`, theorem: 'poincare' },
    ],
    rules: [
      { from: ['d-a', 'h-omega'], to: 'nec', by: 'j-test-un' },
      { from: ['d-a', 'h-omega', 'h-f'], to: 'cadre', by: 'j-cadre' },
      { from: ['d-a', 'h-omega', 'h-connexe'], to: 'coer', by: 'j-pw' },
      { from: ['cadre', 'coer'], to: 'lm', by: 'j-lm' },
      { from: ['lm', 'h-comp', 'd-a'], to: 'ext', by: 'j-ext' },
      { from: ['ext', 'd-a', 'h-connexe'], to: 'toutes', by: 'j-toutes' },
      { from: ['lm', 'coer', 'h-f'], to: 'est', by: 'j-est' },
      { from: ['nec', 'toutes', 'est'], to: 'fin', by: 'j-synthese' },
    ],
    traps: [
      {
        conclusion: 'x-unique-H1',
        verdict: 'incorrect',
        concept: 'compatibilite-neumann',
        message: 'Les constantes forment le noyau de la forme : la solution n’est unique qu’à une constante près, ou après normalisation par la moyenne.',
        counterexample: t`Si $u_0$ est solution, $u_0+1$ l'est aussi, car $\nabla(u_0+1)=\nabla u_0$.`,
      },
      {
        conclusion: 'x-sans-comp',
        verdict: 'incorrect',
        concept: 'compatibilite-neumann',
        message: t`Tester par $v=1$ montre que $\int_\Omega f=0$ est nécessaire.`,
        counterexample: t`Pour $f\equiv 1$ : $a(u,1)=0$ pour tout $u$, alors que $\int_\Omega f=|\Omega|\neq 0$.`,
      },
      {
        conclusion: 'lm',
        by: 'j-lm-h1',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Lax–Milgram exige la coercivité sur l'espace où l'on se place ; elle échoue sur $H^1(\Omega)$ à cause des constantes : on travaille dans $V_0$.`,
        counterexample: t`$a(1,1)=0$ avec $1\in H^1(\Omega)$ non nulle.`,
      },
      {
        conclusion: 'ext',
        by: 'j-ext-sans-comp',
        verdict: 'incorrect',
        concept: 'compatibilite-neumann',
        message: t`Le second membre voit la constante retirée : $\int_\Omega f(v-v_\Omega)=\int_\Omega fv-v_\Omega\int_\Omega f$. Sans $\int_\Omega f=0$, le passage échoue.`,
        counterexample: t`Pour $f\equiv 1$ et $v=1$ : $a(u_0,1)=0$, alors que $\int_\Omega f=|\Omega|\neq 0$.`,
      },
      {
        conclusion: 'coer',
        by: 'j-poincare',
        verdict: 'incorrect',
        concept: 'poincare-wirtinger-constantes',
        message: t`Poincaré porte sur $H^1_0(\Omega)$ ; une fonction de $V_0$ n'est pas nulle au bord en général. C'est Poincaré–Wirtinger, grâce à la moyenne nulle, qui s'applique.`,
        counterexample: t`Sur $]0,1[$, $v(x)=x-\frac12\in V_0$ vaut $-\frac12$ en $0$ : $v\notin H^1_0(]0,1[)$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-comp',
        label: t`Ne plus supposer $\int_\Omega f=0$`,
        necessary: true,
        explanation: t`La solution $u_0\in V_0$ existe encore, mais elle ne vérifie plus l'équation pour $v=1$ : le problème de Neumann n'a pas de solution.`,
        counterexample: t`Sur $\Omega=]0,1[$ avec $f=1$, une solution vérifierait $0=a(u,1)=\int_0^1f=1$.`,
      },
      {
        hypothesis: 'h-connexe',
        label: t`Ne plus supposer $\Omega$ connexe`,
        necessary: true,
        explanation: 'Le noyau de la forme contient alors les fonctions localement constantes, et Poincaré–Wirtinger tombe.',
        counterexample: t`$\Omega=]0,1[\cup]2,3[$ : $w=\mathbb 1_{]0,1[}$ vérifie $a(w,v)=0$ pour tout $v$ sans être constante, et $w-w_\Omega$ est de moyenne nulle, non nulle, de gradient nul.`,
      },
    ],
  },
  closedChecks: [
    { kind: 'rational', prompt: t`Pour $\Omega=]0,1[$ et $f(x)=x-\lambda$, valeur de $\lambda$ rendant le problème compatible`, expected: '1/2' },
  ],
  solution: t`**Nécessité.** $\Omega$ étant borné, $1\in H^1(\Omega)$ et $\nabla 1=0$. Si $u$ est solution, le choix $v=1$ donne $0=a(u,1)=\int_\Omega f$.

**Cadre.** $V_0$ est le noyau de $v\mapsto\int_\Omega v$, forme linéaire continue sur $H^1(\Omega)$ puisque $\left|\int_\Omega v\right|\le|\Omega|^{1/2}\|v\|_{L^2}$ : c'est un sous-espace fermé, donc un Hilbert. Pour $v\in V_0$, $v_\Omega=0$, et Poincaré–Wirtinger donne $\|v\|_{L^2}\le C_\Omega\|\nabla v\|_{L^2}$, d'où $a(v,v)\ge\frac1{1+C_\Omega^2}\|v\|^2_{H^1}$. La forme $a$ et le second membre $v\mapsto\int_\Omega fv$ sont continus par Cauchy–Schwarz.

**Existence et unicité dans $V_0$.** Lax–Milgram donne un unique $u_0\in V_0$ tel que $a(u_0,v)=\int_\Omega fv$ pour tout $v\in V_0$.

**Toutes les fonctions tests.** Pour $v\in H^1(\Omega)$, $v-v_\Omega\in V_0$ et $\nabla(v-v_\Omega)=\nabla v$, donc
$$a(u_0,v)=a(u_0,v-v_\Omega)=\int_\Omega f(v-v_\Omega)=\int_\Omega fv-v_\Omega\int_\Omega f=\int_\Omega fv,$$
grâce à la compatibilité : $u_0$ résout le problème faible.

**Rôle des constantes et de la moyenne nulle.** Si $u$ est une autre solution, $w=u-u_0$ vérifie $a(w,v)=0$ pour tout $v$ ; avec $v=w$, $\nabla w=0$, et la connexité donne $w=c$ constante. Réciproquement, $u_0+c$ est solution pour tout $c$. Les constantes forment exactement le noyau de la forme $a$ : c'est pourquoi la coercivité n'a lieu que sur $V_0$, et la normalisation $\int_\Omega u=0$ sélectionne l'unique solution $u_0$.

**Estimation.** Avec $v=u_0$ : $\|\nabla u_0\|^2_{L^2}=\int_\Omega fu_0\le\|f\|_{L^2}\|u_0\|_{L^2}\le C_\Omega\|f\|_{L^2}\|\nabla u_0\|_{L^2}$, d'où $\|\nabla u_0\|_{L^2}\le C_\Omega\|f\|_{L^2}$.`,
  steps: [
    t`Tester par $v=1$ pour obtenir la nécessité de $\int_\Omega f=0$.`,
    t`Établir que $V_0$ est un Hilbert et que $a$ y est continue et coercive (Poincaré–Wirtinger).`,
    t`Appliquer Lax–Milgram dans $V_0$.`,
    t`Étendre l'équation à tout $v\in H^1(\Omega)$ grâce à la compatibilité.`,
    'Décrire toutes les solutions et établir l’estimation.',
  ],
  commonErrors: [
    { id: 'e-coer-H1', description: t`Appliquer Lax–Milgram sur $H^1(\Omega)$, où $a$ n'est pas coercive.`, concept: 'hypotheses-theoreme' },
    { id: 'e-unicite', description: t`Affirmer l'unicité dans $H^1(\Omega)$ sans normalisation.`, concept: 'compatibilite-neumann' },
    { id: 'e-compat', description: t`Oublier la compatibilité en passant de $V_0$ à $H^1(\Omega)$.`, concept: 'compatibilite-neumann' },
  ],
  hints: [
    t`Que se passe-t-il si l'on teste la formulation faible avec la fonction constante $1$ ? Sur quel espace la forme $a$ peut-elle être coercive ?`,
    t`Travaille dans $V_0$ : Poincaré–Wirtinger y donne la coercivité, Lax–Milgram une unique solution. Il reste à tester par un $v\in H^1(\Omega)$ quelconque, décomposé en $(v-v_\Omega)+v_\Omega$.`,
    t`$\int_\Omega f(v-v_\Omega)=\int_\Omega fv-v_\Omega\int_\Omega f$ ; la différence de deux solutions a un gradient nul, donc est constante sur l'ouvert connexe $\Omega$.`,
  ],
  rubric: rubric({
    hypotheses: t`La compatibilité, la connexité et les hypothèses de Poincaré–Wirtinger sont utilisées là où elles interviennent.`,
    methode: t`Lax–Milgram est appliqué dans $V_0$, puis l'équation est étendue à $H^1(\Omega)$.`,
    validite: 'La coercivité est établie sur le bon espace, et l’extension utilise la compatibilité.',
    justifications: 'Le rôle des constantes (noyau) et de la moyenne nulle (normalisation) est démontré.',
    conclusion: 'Nécessité, existence, unicité à constante près et estimation sont obtenues.',
  }),
  variant: {
    statement: t`Sur $\Omega=]0,1[$, soit $f(x)=x-\frac12$. Vérifier la compatibilité, déterminer l'unique solution de moyenne nulle du problème de Neumann $-u''=f$, $u'(0)=u'(1)=0$, et décrire toutes les solutions.`,
    solution: t`$\int_0^1\left(x-\frac12\right)dx=0$ : le problème est compatible. La primitive de $-f$ nulle en $0$ est $u'(x)=\frac x2-\frac{x^2}2$, qui vérifie aussi $u'(1)=0$. Donc $u(x)=\frac{x^2}4-\frac{x^3}6+K$, et $\int_0^1\left(\frac{x^2}4-\frac{x^3}6\right)dx=\frac1{12}-\frac1{24}=\frac1{24}$ impose $K=-\frac1{24}$. L'unique solution de moyenne nulle est $u_0(x)=\frac{x^2}4-\frac{x^3}6-\frac1{24}$, et les solutions sont les $u_0+c$, $c\in\mathbb R$. C'est bien une solution faible : pour $v\in H^1(]0,1[)$, $\int_0^1u_0'v'=\big[u_0'v\big]_0^1-\int_0^1u_0''v=\int_0^1fv$, le crochet étant nul.`,
    closedChecks: [
      { kind: 'expr-equiv', prompt: t`Solution de moyenne nulle $u_0(x)$`, expected: 'x^2/4-x^3/6-1/24', vars: ['x'] },
    ],
  },
  verification: { origin: 'complement', review: 'machine', notes: 'Squelette du polycopié (section 3.5) complété : nécessité de la compatibilité, extension aux fonctions tests de H¹, description de toutes les solutions, estimation.' },
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT10: TheoremModule = {
  theorem: {
    id: 'poincare-wirtinger',
    spaces: [
      t`$\Omega\subset\mathbb R^d$ : ouvert borné, connexe, lipschitzien.`,
      t`$H^1(\Omega)$, muni de la norme usuelle $\|u\|^2_{H^1}=\|u\|^2_{L^2}+\|\nabla u\|^2_{L^2}$.`,
      t`$u_\Omega=\frac1{|\Omega|}\int_\Omega u$ : moyenne de $u$, bien définie car $L^2(\Omega)\subset L^1(\Omega)$ lorsque $|\Omega|<+\infty$.`,
    ],
    hypotheses: [
      {
        id: 'h-borne',
        text: t`$\Omega$ est borné.`,
        whenRemoved: t`Sur $\Omega=]0,+\infty[$, $u(x)=\frac1{1+x}$ appartient à $H^1(\Omega)$ sans être intégrable, et $|\Omega|=+\infty$ : la moyenne n'a pas de sens.`,
      },
      {
        id: 'h-connexe',
        text: t`$\Omega$ est connexe.`,
        whenRemoved: t`Sur $\Omega=]0,1[\cup]2,3[$, $u=1$ sur $]0,1[$ et $u=-1$ sur $]2,3[$ vérifie $u_\Omega=0$, $\nabla u=0$ et $\|u-u_\Omega\|_{L^2}=\sqrt2$ : aucune constante ne convient.`,
      },
      {
        id: 'h-lip',
        text: t`$\Omega$ est lipschitzien.`,
        whenRemoved: t`Sur un peigne borné et connexe de $\mathbb R^2$, à couloirs de plus en plus fins terminés par des pièces, on construit $u_k\in H^1$ avec $\|u_k-(u_k)_\Omega\|_{L^2}\ge\frac12$ pour $k$ grand et $\|\nabla u_k\|_{L^2}\to 0$ : l'inégalité tombe (construction détaillée dans l'exercice intermédiaire).`,
      },
    ],
    statement: t`Si $\Omega$ est borné, connexe et lipschitzien, il existe une constante $C_\Omega>0$ telle que, pour tout $u\in H^1(\Omega)$,
$$\|u-u_\Omega\|_{L^2}\le C_\Omega\|\nabla u\|_{L^2},\qquad u_\Omega=\frac1{|\Omega|}\int_\Omega u.$$`,
    conclusions: {
      existence: t`Il existe une constante $C_\Omega>0$, ne dépendant que de $\Omega$ ; la démonstration, par l'absurde, n'en fournit pas de valeur.`,
      autre: t`Si $u_\Omega=0$, alors $\|u\|_{L^2}\le C_\Omega\|\nabla u\|_{L^2}$ : la forme $\int_\Omega\nabla u\cdot\nabla v$ est coercive sur les fonctions de moyenne nulle.`,
    },
    sourceProof: 'complete',
    proofOutline: [
      t`Par l'absurde : il existe $v_n\in H^1(\Omega)$ avec $(v_n)_\Omega=0$, $\|v_n\|_{L^2}=1$ et $\|\nabla v_n\|_{L^2}\to 0$.`,
      t`La suite est bornée dans $H^1(\Omega)$ ; par Rellich, une sous-suite converge fortement dans $L^2$ vers $v$.`,
      t`Le passage à la limite dans la définition des dérivées distributionnelles donne $\nabla v=0$ dans $\mathcal D'(\Omega)$.`,
      t`La connexité impose que $v$ soit constante presque partout ; sa moyenne étant nulle, $v=0$.`,
      t`La convergence forte et $\|v_n\|_{L^2}=1$ donnent $\|v\|_{L^2}=1$ : contradiction.`,
    ],
    warnings: [
      t`La preuve par compacité ne donne aucune valeur de $C_\Omega$ : aucune constante n'est annoncée comme optimale.`,
      'La connexité est indispensable : sur un ouvert non connexe, les fonctions localement constantes mettent l’inégalité en défaut.',
      t`Ne pas appliquer Poincaré à $u-u_\Omega$ : cette fonction n'appartient pas à $H^1_0(\Omega)$ en général.`,
      t`$\nabla u$ ne distingue pas $u$ de $u+c$ : sans condition au bord, il faut retirer la moyenne.`,
    ],
    usefulFor: t`Fournir la coercivité de $\int_\Omega\nabla u\cdot\nabla v$ sur les fonctions de moyenne nulle : problème de Neumann à moyenne fixée, via Lax–Milgram.`,
    verification: FROM_POLY,
  },
  definitions: [
    {
      id: 'poincare-wirtinger-moyenne',
      term: 'Moyenne sur un ouvert borné',
      statement: t`Pour $\Omega$ borné et $u\in L^2(\Omega)$ : $u_\Omega=\frac1{|\Omega|}\int_\Omega u$.`,
      source: poly(12, 'Section 3.3'),
    },
    {
      id: 'poincare-wirtinger-v0',
      term: t`Espace $V_0$`,
      statement: t`$V_0=\{v\in H^1(\Omega) : \int_\Omega v=0\}$ : fonctions de $H^1(\Omega)$ de moyenne nulle, espace de travail du problème de Neumann.`,
      source: poly(14, 'Section 3.5'),
    },
    {
      id: 'poincare-wirtinger-compatibilite',
      term: 'Condition de compatibilité (Neumann)',
      statement: t`Pour $-\Delta u=f$ avec dérivée normale nulle au bord, la condition $\langle f,1\rangle=0$ est nécessaire lorsque la dualité le permet ; pour $f\in L^2(\Omega)$, elle s'écrit $\int_\Omega f=0$.`,
      source: poly(14, 'Section 3.5'),
    },
  ],
  concepts: [
    {
      id: 'poincare-wirtinger-constantes',
      label: 'Constantes et gradient',
      reminder: t`$\nabla u$ ne distingue pas $u$ et $u+c$ : sans condition au bord, $\|\nabla u\|_{L^2}$ ne contrôle que $u-u_\Omega$, et non $u$.`,
    },
    {
      id: 'poincare-wirtinger-connexite',
      label: 'Connexité',
      reminder: t`Sur un ouvert non connexe, $\nabla u=0$ n'entraîne pas que $u$ soit constante : les fonctions localement constantes échappent à l'inégalité.`,
    },
    {
      id: 'poincare-wirtinger-moyenne-calcul',
      label: 'Calcul d’une moyenne',
      reminder: t`La moyenne divise l'intégrale par $|\Omega|$ ; elle ne coïncide pas, en général, avec la valeur de la fonction au milieu.`,
    },
    {
      id: 'poincare-wirtinger-moyenne-nulle',
      label: 'Moyenne nulle et fonction nulle',
      reminder: 'Une fonction de moyenne nulle n’est pas la fonction nulle ; seule une constante de moyenne nulle est nulle.',
    },
    {
      id: 'poincare-wirtinger-constante',
      label: 'Constante de Poincaré–Wirtinger',
      reminder: t`La démonstration par l'absurde ne fournit pas de valeur de $C_\Omega$ ; un calcul sur une fonction particulière ne donne qu'une minoration de toute constante admissible.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-poincare-wirtinger-non-connexe',
      theoremId: 'poincare-wirtinger',
      title: 'Ouvert non connexe',
      claim: t`L'inégalité de Poincaré–Wirtinger vaut sur tout ouvert borné lipschitzien, connexe ou non.`,
      correctStatement: t`Le théorème suppose $\Omega$ borné, connexe et lipschitzien.`,
      task: t`Sur $\Omega=]0,1[\cup]2,3[$, soit $u=1$ sur $]0,1[$ et $u=-1$ sur $]2,3[$. Calcule $u_\Omega$.`,
      check: { kind: 'rational', prompt: t`Valeur de $u_\Omega$`, expected: '0' },
      explanation: t`$u_\Omega=\frac12(1-1)=0$, $\nabla u=0$ et $\|u-u_\Omega\|_{L^2}=\sqrt2>0$ : aucune constante $C_\Omega$ ne convient.`,
      concept: 'poincare-wirtinger-connexite',
      source: poly(12, 'Section 3.3, hypothèses'),
    },
    {
      id: 'ce-poincare-wirtinger-exemple',
      theoremId: 'poincare-wirtinger',
      title: 'Un exemple ne donne pas la meilleure constante',
      claim: t`Sur $]0,1[$, la meilleure constante de Poincaré–Wirtinger est $\frac1{2\sqrt3}$, valeur du quotient pour $u(x)=x$.`,
      correctStatement: 'Un exemple fournit seulement une minoration de toute constante admissible.',
      task: t`Pour $w(x)=\cos(\pi x)$ sur $]0,1[$, de moyenne nulle, on a $\|w\|^2_{L^2}=\frac12$ et $\|w'\|^2_{L^2}=\frac{\pi^2}2$. Exprime le quotient $\|w\|^2_{L^2}/\|w'\|^2_{L^2}$ en fonction de $p=\pi$.`,
      check: { kind: 'expr-equiv', prompt: t`Quotient en fonction de $p=\pi$`, expected: '1/p^2', vars: ['p'] },
      explanation: t`Le quotient vaut $\frac1{\pi^2}>\frac1{12}$, car $\pi<2\sqrt3$ : la constante $\frac1{2\sqrt3}$ ne convient pas pour $w$, elle n'est donc pas admissible. Ce calcul ne détermine pas pour autant la meilleure constante.`,
      concept: 'poincare-wirtinger-constante',
      source: poly(39, 'Exercice 10, facile'),
    },
    {
      id: 'ce-poincare-wirtinger-compatibilite',
      theoremId: 'poincare-wirtinger',
      title: 'Compatibilité pour le problème de Neumann',
      claim: t`Pour tout $f\in L^2(\Omega)$, le problème de Neumann $-\Delta u=f$, $\partial_\nu u=0$ admet une solution faible dans $H^1(\Omega)$.`,
      correctStatement: t`La condition $\int_\Omega f=0$ est nécessaire ; elle est suffisante lorsque $\Omega$ est borné, connexe et lipschitzien.`,
      task: t`Sur $\Omega=]0,1[$ avec $f\equiv 1$, on teste la formulation faible par $v=1$. Calcule $\int_0^1f\,v$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\int_0^1f\cdot 1$`, expected: '1' },
      explanation: t`Une solution vérifierait $\int_0^1u'\cdot 0=0=\int_0^1f=1$ : contradiction, il n'y a pas de solution.`,
      concept: 'compatibilite-neumann',
      source: poly(14, 'Section 3.5'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT10;
