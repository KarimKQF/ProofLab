/**
 * Résultat 35 — Théorème du niveau régulier (cours de géométrie de Lie, § 8.6, p. PDF 50 ;
 * espaces tangents § 4.5, p. PDF 33 ; sous-variétés § 17, p. PDF 77).
 * Le cours énonce le théorème et renvoie au théorème des fonctions implicites : les
 * exercices travaillent l'application (vérifier la régularité, calculer l'espace tangent)
 * et ce qui se passe en un point critique.
 */
import { t, rubric, lie, FROM_LIE, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'niveau-regulier.facile',
  theoremId: 'niveau-regulier',
  level: 'facile',
  title: t`La sphère $S^2$ et son plan tangent`,
  statement: t`Soit $F:\mathbb R^3\to\mathbb R$, $F(x)=\|x\|^2$, et $S^2=F^{-1}(1)$. Montrer que $S^2$ est une sous-variété de $\mathbb R^3$ dont on donnera la dimension, établir $T_pS^2=p^\perp$, puis décider si $v=(1,2,3)$ est tangent à $S^2$ en $p=(0,0,1)$.`,
  source: lie(33, 'Calcul détaillé de $T_pS^2$, § 4.5'),
  prerequisites: [],
  concepts: ['lie-niveau-regulier', 'lie-espace-tangent', 'hypotheses-theoreme'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-F', kind: 'hypothese', text: t`$F:\mathbb R^3\to\mathbb R$, $F(x)=x_1^2+x_2^2+x_3^2$, est lisse.` },
      { id: 'h-c', kind: 'hypothese', text: t`On étudie le niveau $c=1$ : $S^2=F^{-1}(1)$.` },
      { id: 'dF', kind: 'egalite', text: t`$dF_p(v)=2\langle p,v\rangle$ pour tous $p,v\in\mathbb R^3$.` },
      { id: 'p-nonnul', kind: 'consequence', text: t`Tout $p\in S^2$ vérifie $p\neq 0$.` },
      { id: 'surj', kind: 'consequence', text: t`Pour tout $p\in S^2$, la forme linéaire $dF_p$ est surjective sur $\mathbb R$.` },
      {
        id: 'thm',
        kind: 'application-theoreme',
        text: t`$S^2$ est une sous-variété plongée de $\mathbb R^3$, de dimension $3-1=2$.`,
        masked: t`$S^2$ est une sous-variété plongée de $\mathbb R^3$, de dimension à déterminer.`,
        check: { kind: 'rational', prompt: t`Dimension de la sous-variété $S^2$`, expected: '2' },
      },
      { id: 'tangent', kind: 'egalite', text: t`$T_pS^2=\operatorname{Ker}dF_p=p^\perp$ pour tout $p\in S^2$.` },
      {
        id: 'calc',
        kind: 'egalite',
        text: t`Pour $p=(0,0,1)$ et $v=(1,2,3)$ : $dF_p(v)=6\neq 0$, donc $v\notin T_pS^2$.`,
        masked: t`Valeur de $dF_p(v)$ pour $p=(0,0,1)$ et $v=(1,2,3)$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $dF_p(v)$ pour $p=(0,0,1)$, $v=(1,2,3)$`, expected: '6' },
      },
      { id: 'fin', kind: 'conclusion', text: t`$S^2$ est une sous-variété de dimension $2$, $T_pS^2=p^\perp$, et $(1,2,3)$ n'est pas tangent à $S^2$ en $(0,0,1)$.` },
      { id: 'x-affine', kind: 'egalite', distractor: true, text: t`$T_pS^2=\{p+v : \langle p,v\rangle=0\}$.` },
      { id: 'x-un-point', kind: 'consequence', distractor: true, text: t`Il suffit que $dF_p$ soit surjective en un point $p$ de $S^2$ pour appliquer le théorème.` },
    ],
    justifications: [
      { id: 'j-diff', label: t`Dérivée en $s=0$ de $s\mapsto\|p+sv\|^2=\|p\|^2+2s\langle p,v\rangle+s^2\|v\|^2$.` },
      { id: 'j-norme', label: t`$\|p\|^2=1$ entraîne $p\neq 0$.` },
      { id: 'j-surj', label: t`$dF_p(p)=2\|p\|^2=2\neq 0$ : une forme linéaire non nulle sur $\mathbb R^3$ est surjective sur $\mathbb R$.` },
      { id: 'j-thm', label: 'Théorème du niveau régulier, la surjectivité étant vérifiée en tout point du niveau.', theorem: 'niveau-regulier' },
      { id: 'j-tangent', label: t`Second volet du théorème : $T_pF^{-1}(c)=\operatorname{Ker}dF_p$.`, theorem: 'niveau-regulier' },
      { id: 'j-calc', label: t`Évaluer $2\langle p,v\rangle$.` },
      { id: 'j-syn', label: 'Réunion des trois résultats.' },
      { id: 'j-ferme', label: t`Une partie fermée de $\mathbb R^3$ est une sous-variété.` },
    ],
    rules: [
      { from: ['h-F'], to: 'dF', by: 'j-diff' },
      { from: ['h-c'], to: 'p-nonnul', by: 'j-norme' },
      { from: ['dF', 'p-nonnul'], to: 'surj', by: 'j-surj' },
      { from: ['h-F', 'h-c', 'surj'], to: 'thm', by: 'j-thm' },
      { from: ['thm', 'dF'], to: 'tangent', by: 'j-tangent' },
      { from: ['dF'], to: 'calc', by: 'j-calc' },
      { from: ['thm', 'tangent', 'calc'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-affine',
        verdict: 'incorrect',
        concept: 'lie-espace-tangent',
        message: 'C’est le plan affine tangent, translaté en p. L’espace tangent est un sous-espace vectoriel : il contient 0.',
        counterexample: t`Pour $p=(0,0,1)$, $0=p+(-p)$ avec $\langle p,-p\rangle=-1\neq 0$ : $0$ n'appartient pas à l'ensemble proposé.`,
      },
      {
        conclusion: 'x-un-point',
        verdict: 'incorrect',
        concept: 'lie-niveau-regulier',
        message: 'La surjectivité doit être vérifiée en tout point du niveau ; un seul point critique peut détruire la structure de sous-variété.',
        counterexample: t`Pour $G(x,y,z)=x^2+y^2-z^2$, $dG$ est surjective en $(1,0,1)$, mais $G^{-1}(0)$, le cône, n'est pas une sous-variété au voisinage de $0$.`,
      },
      {
        conclusion: 'thm',
        by: 'j-ferme',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: 'Être fermé ne donne aucune structure de sous-variété.',
        counterexample: t`Le cône $\{x^2+y^2=z^2\}$ est fermé dans $\mathbb R^3$ et n'est pas une sous-variété au voisinage de son sommet.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-c',
        label: t`Remplacer le niveau $c=1$ par un niveau quelconque`,
        necessary: true,
        explanation: t`Au niveau $c=0$, le seul point du niveau est $0$, où $dF_0=0$ : le théorème ne s'applique plus.`,
        counterexample: t`$F^{-1}(0)=\{0\}$ est réduit à un point : ce n'est pas une sous-variété de dimension $2$.`,
      },
    ],
  },
  solution: t`**Différentielle.** Pour $p,v\in\mathbb R^3$, $\|p+sv\|^2=\|p\|^2+2s\langle p,v\rangle+s^2\|v\|^2$, donc $dF_p(v)=2\langle p,v\rangle$.

**Régularité du niveau.** Si $p\in S^2$, alors $\|p\|=1$, donc $p\neq 0$ et $dF_p(p)=2\neq 0$ : la forme linéaire $dF_p$ est non nulle, donc surjective sur $\mathbb R$. Le niveau $1$ est régulier.

**Conclusion du théorème.** $S^2$ est une sous-variété plongée de dimension $3-1=2$, et $T_pS^2=\operatorname{Ker}dF_p=\{v:\langle p,v\rangle=0\}=p^\perp$.

**Test.** Pour $p=(0,0,1)$ et $v=(1,2,3)$, $dF_p(v)=2\cdot 3=6\neq 0$ : $v$ n'est pas tangent.`,
  steps: [
    t`Calculer $dF_p(v)=2\langle p,v\rangle$.`,
    t`Vérifier la surjectivité de $dF_p$ en tout point de $S^2$.`,
    t`Appliquer le théorème : dimension $2$ et $T_pS^2=\operatorname{Ker}dF_p=p^\perp$.`,
    t`Tester $v=(1,2,3)$ en $p=(0,0,1)$.`,
  ],
  commonErrors: [
    { id: 'e-affine', description: t`Confondre $T_pS^2$ avec le plan affine tangent $p+p^\perp$.`, concept: 'lie-espace-tangent' },
    { id: 'e-un-point', description: 'Vérifier la surjectivité en un seul point du niveau.', concept: 'lie-niveau-regulier' },
  ],
  hints: [
    t`Quelle est la différentielle de $x\mapsto\|x\|^2$ ? Écris $\|p+sv\|^2$ et dérive en $s=0$.`,
    t`Pour la surjectivité d'une forme linéaire à valeurs dans $\mathbb R$, il suffit de trouver un vecteur où elle ne s'annule pas : essaie $v=p$.`,
    t`Le théorème donne $T_pS^2=\operatorname{Ker}dF_p$ ; un vecteur est tangent si et seulement si $\langle p,v\rangle=0$.`,
  ],
  rubric: rubric({
    hypotheses: t`La surjectivité de $dF_p$ est vérifiée en tout point de $S^2$, avec $p\neq 0$.`,
    methode: 'Le théorème du niveau régulier est appliqué après le calcul de la différentielle.',
    validite: t`$dF_p(v)=2\langle p,v\rangle$ et la dimension $3-1$ sont exacts.`,
    justifications: 'L’espace tangent est identifié comme noyau, sous-espace vectoriel.',
    conclusion: t`$\dim S^2=2$, $T_pS^2=p^\perp$, et le test sur $v$ est conclu.`,
  }),
  variant: {
    statement: t`Montrer que le cercle $S^1=\{(x,y):x^2+y^2=1\}$ est une sous-variété de $\mathbb R^2$ de dimension $1$, et que $T_pS^1=p^\perp$.`,
    solution: t`Avec $F(x,y)=x^2+y^2$, $dF_p(v)=2\langle p,v\rangle$. Sur $S^1$, $p\neq 0$ et $dF_p(p)=2\neq 0$ : la forme est surjective. Le niveau $1$ est régulier, donc $S^1$ est une sous-variété de dimension $2-1=1$, et $T_pS^1=\operatorname{Ker}dF_p=p^\perp$, la droite engendrée par $(-p_2,p_1)$.`,
    closedChecks: [{ kind: 'rational', prompt: t`Dimension de $S^1$`, expected: '1' }],
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h-F', kind: 'hypothese', text: t`$F(x,y)=x^2+y^2$ est lisse sur $\mathbb R^2$ ; $S^1=F^{-1}(1)$.` },
        { id: 'dF', kind: 'egalite', text: t`$dF_p(v)=2\langle p,v\rangle$.` },
        { id: 'surj', kind: 'consequence', text: t`Pour $p\in S^1$, $dF_p(p)=2\neq 0$ : $dF_p$ est surjective.` },
        {
          id: 'thm',
          kind: 'application-theoreme',
          text: t`$S^1$ est une sous-variété de dimension $1$, et $T_pS^1=\operatorname{Ker}dF_p=p^\perp$.`,
          masked: t`$S^1$ est une sous-variété de dimension à déterminer, et $T_pS^1=\operatorname{Ker}dF_p$.`,
          check: { kind: 'rational', prompt: t`Dimension de $S^1$`, expected: '1' },
        },
        { id: 'fin', kind: 'conclusion', text: t`$S^1$ est une sous-variété de dimension $1$ et $T_pS^1=p^\perp$.` },
        { id: 'x-dim2', kind: 'consequence', distractor: true, text: t`$S^1$ est de dimension $2$, comme l'espace ambiant.` },
      ],
      justifications: [
        { id: 'j-diff', label: t`Dérivée de $s\mapsto\|p+sv\|^2$ en $s=0$.` },
        { id: 'j-surj', label: 'Une forme linéaire non nulle est surjective sur ℝ.' },
        { id: 'j-thm', label: 'Théorème du niveau régulier.', theorem: 'niveau-regulier' },
        { id: 'j-syn', label: 'Conclusion.' },
      ],
      rules: [
        { from: ['h-F'], to: 'dF', by: 'j-diff' },
        { from: ['dF'], to: 'surj', by: 'j-surj' },
        { from: ['h-F', 'surj'], to: 'thm', by: 'j-thm' },
        { from: ['thm'], to: 'fin', by: 'j-syn' },
      ],
      traps: [
        {
          conclusion: 'x-dim2',
          verdict: 'incorrect',
          concept: 'lie-niveau-regulier',
          message: t`Un niveau régulier de $F:\mathbb R^m\to\mathbb R^n$ est de dimension $m-n$, ici $2-1=1$.`,
          counterexample: t`Le cercle est paramétré localement par l'angle seul.`,
        },
      ],
      removable: [],
    },
  },
  verification: FROM_LIE,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'niveau-regulier.intermediaire',
  theoremId: 'niveau-regulier',
  level: 'intermediaire',
  title: t`$SL(2,\mathbb R)$ comme niveau régulier du déterminant`,
  statement: t`On identifie $M_2(\mathbb R)$ à $\mathbb R^4$ et l'on pose $SL(2,\mathbb R)=\det^{-1}(1)$. Montrer que c'est une sous-variété de dimension $3$ et que $T_ISL(2,\mathbb R)=\{X:\operatorname{tr}X=0\}$. Calculer $d(\det)_I(H)$ pour $H=\begin{pmatrix}2&5\\7&3\end{pmatrix}$.`,
  source: lie(102, 'Groupe spécial linéaire, § 25.1.2'),
  prerequisites: [],
  concepts: ['lie-niveau-regulier', 'lie-espace-tangent', 'lie-algebre-tangente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-det', kind: 'hypothese', text: t`$\det:M_2(\mathbb R)\simeq\mathbb R^4\to\mathbb R$ est polynomiale, donc lisse.` },
      { id: 'h-c', kind: 'hypothese', text: t`On étudie le niveau $1$ : $SL(2,\mathbb R)=\det^{-1}(1)$.` },
      { id: 'jacobi', kind: 'egalite', text: t`Pour $A$ inversible : $d(\det)_A(H)=\det(A)\operatorname{tr}(A^{-1}H)$.` },
      { id: 'inv', kind: 'consequence', text: t`Tout $A\in SL(2,\mathbb R)$ est inversible.` },
      { id: 'surj', kind: 'consequence', text: t`Pour $A\in SL(2,\mathbb R)$ : $d(\det)_A(A)=2\det A=2\neq 0$, donc $d(\det)_A$ est surjective.` },
      {
        id: 'thm',
        kind: 'application-theoreme',
        text: t`$SL(2,\mathbb R)$ est une sous-variété de $M_2(\mathbb R)$ de dimension $4-1=3$.`,
        masked: t`$SL(2,\mathbb R)$ est une sous-variété de $M_2(\mathbb R)$, de dimension à déterminer.`,
        check: { kind: 'rational', prompt: t`Dimension de $SL(2,\mathbb R)$`, expected: '3' },
      },
      { id: 'tangent', kind: 'egalite', text: t`$T_ISL(2,\mathbb R)=\operatorname{Ker}d(\det)_I=\{X:\operatorname{tr}X=0\}$.` },
      {
        id: 'calc',
        kind: 'egalite',
        text: t`$d(\det)_I(H)=\operatorname{tr}H=5$ pour $H=\begin{pmatrix}2&5\\7&3\end{pmatrix}$.`,
        masked: t`Valeur de $d(\det)_I(H)$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $d(\det)_I(H)$ pour $H=\begin{pmatrix}2&5\\7&3\end{pmatrix}$`, expected: '5' },
      },
      { id: 'fin', kind: 'conclusion', text: t`$SL(2,\mathbb R)$ est une sous-variété de dimension $3$, d'espace tangent en $I$ les matrices de trace nulle ; $H$ n'y est pas tangente.` },
      { id: 'x-sub-global', kind: 'consequence', distractor: true, text: t`$\det$ est une submersion sur tout $M_2(\mathbb R)$.` },
      { id: 'x-affine', kind: 'egalite', distractor: true, text: t`$T_ISL(2,\mathbb R)=\{I+X:\operatorname{tr}X=0\}$.` },
    ],
    justifications: [
      { id: 'j-jacobi', label: 'Formule de Jacobi pour la différentielle du déterminant.', theorem: 'formule-jacobi' },
      { id: 'j-inv', label: t`$\det A=1\neq 0$.` },
      { id: 'j-surj', label: t`$\operatorname{tr}(A^{-1}A)=\operatorname{tr}I_2=2$ ; une forme linéaire non nulle est surjective sur $\mathbb R$.` },
      { id: 'j-thm', label: 'Théorème du niveau régulier.', theorem: 'niveau-regulier' },
      { id: 'j-tangent', label: t`Second volet du théorème, en $A=I$ : $d(\det)_I=\operatorname{tr}$.`, theorem: 'niveau-regulier' },
      { id: 'j-calc', label: t`$\operatorname{tr}H=2+3$.` },
      { id: 'j-syn', label: 'Réunion des résultats.' },
      { id: 'j-polynome', label: 'Une application polynomiale est une submersion.' },
    ],
    rules: [
      { from: ['h-det'], to: 'jacobi', by: 'j-jacobi' },
      { from: ['h-c'], to: 'inv', by: 'j-inv' },
      { from: ['jacobi', 'inv'], to: 'surj', by: 'j-surj' },
      { from: ['h-det', 'h-c', 'surj'], to: 'thm', by: 'j-thm' },
      { from: ['thm', 'jacobi'], to: 'tangent', by: 'j-tangent' },
      { from: ['jacobi'], to: 'calc', by: 'j-calc' },
      { from: ['thm', 'tangent', 'calc'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-sub-global',
        verdict: 'incorrect',
        concept: 'lie-niveau-regulier',
        message: 'La différentielle du déterminant s’annule en certaines matrices non inversibles : la surjectivité n’a lieu que sur le niveau étudié.',
        counterexample: t`En $A=0$, $\det(sH)=s^2\det H$ : $d(\det)_0=0$.`,
      },
      {
        conclusion: 'x-affine',
        verdict: 'incorrect',
        concept: 'lie-espace-tangent',
        message: 'L’espace tangent est un sous-espace vectoriel ; le translaté par I est l’espace affine tangent.',
        counterexample: t`$0$ est de trace nulle, mais $I+0=I$ n'est pas l'élément nul : l'ensemble proposé ne contient pas $0$.`,
      },
      {
        conclusion: 'surj',
        by: 'j-polynome',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: 'Être polynomiale ne rend pas une application submersive.',
        counterexample: t`$x\mapsto x^2$ est polynomiale et sa dérivée s'annule en $0$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-c',
        label: t`Remplacer le niveau $1$ par le niveau $0$`,
        necessary: true,
        explanation: t`Le niveau $0$ contient la matrice nulle, où $d(\det)_0=0$ : la surjectivité tombe.`,
        counterexample: t`$\det^{-1}(0)$, l'ensemble des matrices de rang au plus $1$, est un cône de sommet $0$ ; il n'est pas une sous-variété au voisinage de $0$.`,
      },
    ],
  },
  solution: t`**Différentielle.** Par la formule de Jacobi, pour $A$ inversible, $d(\det)_A(H)=\det(A)\operatorname{tr}(A^{-1}H)$.

**Régularité.** Sur $SL(2,\mathbb R)$, $\det A=1$, donc $A$ est inversible et $d(\det)_A(A)=\operatorname{tr}(I_2)=2\neq 0$ : la forme $d(\det)_A$ est surjective. Le niveau $1$ est régulier.

**Conclusion.** $SL(2,\mathbb R)$ est une sous-variété de $M_2(\mathbb R)\simeq\mathbb R^4$, de dimension $4-1=3$. En $A=I$, $d(\det)_I(H)=\operatorname{tr}H$, d'où $T_ISL(2,\mathbb R)=\{X:\operatorname{tr}X=0\}=\mathfrak{sl}(2,\mathbb R)$.

**Test.** $\operatorname{tr}H=5\neq 0$ : $H$ n'est pas tangente en $I$.`,
  steps: [
    'Différentielle du déterminant par la formule de Jacobi.',
    t`Surjectivité en tout point du niveau $1$.`,
    t`Dimension $4-1=3$ et espace tangent $\operatorname{Ker}\operatorname{tr}$.`,
    t`Calcul de $\operatorname{tr}H$.`,
  ],
  commonErrors: [
    { id: 'e-global', description: 'Affirmer que le déterminant est une submersion partout.', concept: 'lie-niveau-regulier' },
    { id: 'e-affine', description: 'Décrire l’espace tangent comme un translaté de I.', concept: 'lie-espace-tangent' },
  ],
  hints: [
    t`Quelle est la différentielle de $\det$ en une matrice inversible ? Pense à la formule de Jacobi.`,
    t`Pour vérifier la surjectivité en $A\in SL(2,\mathbb R)$, évalue la différentielle en la direction $H=A$.`,
    t`En $A=I$, la différentielle est la trace : l'espace tangent est son noyau.`,
  ],
  rubric: rubric({
    hypotheses: 'La surjectivité est vérifiée en tout point du niveau 1, pas ailleurs.',
    methode: 'Formule de Jacobi, puis théorème du niveau régulier.',
    validite: 'Les calculs de trace et de dimension sont exacts.',
    justifications: 'L’espace tangent en I est identifié au noyau de la trace.',
    conclusion: t`Dimension $3$ et $T_I=\mathfrak{sl}(2,\mathbb R)$ sont conclus, ainsi que le test sur $H$.`,
  }),
  variant: {
    statement: t`Montrer que $\{(x,y,z):x^2+y^2-z^2=1\}$ (hyperboloïde à une nappe) est une sous-variété de dimension $2$ de $\mathbb R^3$, et donner son espace tangent en $(1,0,0)$.`,
    solution: t`Avec $G(x,y,z)=x^2+y^2-z^2$, $dG_p(v)=2(xv_1+yv_2-zv_3)$, qui ne s'annule identiquement qu'en $p=0$. Or $0$ n'est pas sur le niveau $1$ : le niveau est régulier, de dimension $3-1=2$. En $(1,0,0)$, $dG(v)=2v_1$, donc $T=\{v_1=0\}=\operatorname{Vect}(e_2,e_3)$.`,
  },
  verification: FROM_LIE,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'niveau-regulier.difficile',
  theoremId: 'niveau-regulier',
  level: 'difficile',
  title: t`Le cône : régulier hors du sommet, singulier au sommet`,
  statement: t`Soit $F(x,y,z)=x^2+y^2-z^2$ et $C=F^{-1}(0)$. Montrer que $C\setminus\{0\}$ est une sous-variété de dimension $2$ de $\mathbb R^3\setminus\{0\}$, puis que $C$ n'est pas une sous-variété au voisinage de $0$, en utilisant les courbes $\gamma_\theta(s)=s(\cos\theta,\sin\theta,1)$.`,
  source: lie(78, 'Exemple : un cylindre et un cône, § 17.3'),
  prerequisites: [],
  concepts: ['lie-niveau-regulier', 'lie-espace-tangent', 'quantificateurs'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-F', kind: 'hypothese', text: t`$F(x,y,z)=x^2+y^2-z^2$ est lisse sur $\mathbb R^3$, et $C=F^{-1}(0)$.` },
      { id: 'dF', kind: 'egalite', text: t`$dF_p(v)=2(p_1v_1+p_2v_2-p_3v_3)$.` },
      { id: 'crit', kind: 'consequence', text: t`$dF_p=0$ si et seulement si $p=0$.` },
      { id: 'reg', kind: 'consequence', text: t`Sur l'ouvert $\mathbb R^3\setminus\{0\}$, le niveau $0$ de $F$ est régulier.` },
      { id: 'thm', kind: 'application-theoreme', text: t`$C\setminus\{0\}$ est une sous-variété de dimension $2$ de $\mathbb R^3\setminus\{0\}$.` },
      { id: 'h-abs', kind: 'hypothese', local: true, text: t`Supposons que $C$ soit une sous-variété au voisinage de $0$.` },
      { id: 'dim2', kind: 'consequence', text: t`Sa dimension en $0$ vaudrait alors $2$.` },
      { id: 'courbes', kind: 'consequence', text: t`Pour tout $\theta$, $\gamma_\theta(s)=s(\cos\theta,\sin\theta,1)$ est lisse, tracée dans $C$, avec $\gamma_\theta(0)=0$ et $\gamma_\theta'(0)=(\cos\theta,\sin\theta,1)$.` },
      { id: 'tang', kind: 'inclusion', text: t`Les vecteurs $(\cos\theta,\sin\theta,1)$ appartiendraient tous à $T_0C$.` },
      {
        id: 'det',
        kind: 'egalite',
        text: t`Pour $\theta=0,\tfrac\pi2,\pi$ : $\det\big((1,0,1),(0,1,1),(-1,0,1)\big)=2\neq 0$ ; ces trois vecteurs sont linéairement indépendants.`,
        masked: t`Déterminant des vecteurs dérivés pour $\theta=0,\tfrac\pi2,\pi$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\det\big((1,0,1),(0,1,1),(-1,0,1)\big)$`, expected: '2' },
      },
      { id: 'contra', kind: 'contradiction', text: t`$T_0C$ contiendrait trois vecteurs indépendants, alors que $\dim T_0C=2$.` },
      { id: 'fin', kind: 'conclusion', text: t`$C\setminus\{0\}$ est une sous-variété de dimension $2$, mais $C$ n'est pas une sous-variété au voisinage de $0$.` },
      { id: 'x-niveau', kind: 'consequence', distractor: true, text: t`$C$ est une sous-variété, puisque c'est un niveau de la fonction lisse $F$.` },
      { id: 'x-ker', kind: 'egalite', distractor: true, after: ['crit'], text: t`$T_0C=\operatorname{Ker}dF_0=\mathbb R^3$.` },
    ],
    justifications: [
      { id: 'j-diff', label: 'Dérivées partielles de F.' },
      { id: 'j-zero', label: t`Les trois composantes $2p_1,2p_2,-2p_3$ de $\nabla F$ s'annulent ensemble seulement en $0$.` },
      { id: 'j-reg', label: t`$F$ restreinte à l'ouvert $\mathbb R^3\setminus\{0\}$ a une différentielle non nulle, donc surjective, en tout point de son niveau $0$.` },
      { id: 'j-thm', label: 'Théorème du niveau régulier.', theorem: 'niveau-regulier' },
      { id: 'j-dimloc', label: t`La dimension d'une sous-variété est localement constante, et elle vaut $2$ aux points de $C\setminus\{0\}$ voisins de $0$.` },
      { id: 'j-courbes', label: t`$F(\gamma_\theta(s))=s^2(\cos^2\theta+\sin^2\theta-1)=0$.` },
      { id: 'j-def-courbes', label: 'Définition de l’espace tangent par les vecteurs dérivés en 0 des courbes tracées sur la sous-variété.' },
      { id: 'j-det', label: 'Développement du déterminant.' },
      { id: 'j-contra', label: 'Un espace de dimension 2 ne contient pas trois vecteurs indépendants.' },
      { id: 'j-syn', label: 'Réunion : régularité hors du sommet, contradiction au sommet.' },
      { id: 'j-niveau', label: 'Tout niveau d’une fonction lisse est une sous-variété.' },
    ],
    rules: [
      { from: ['h-F'], to: 'dF', by: 'j-diff' },
      { from: ['dF'], to: 'crit', by: 'j-zero' },
      { from: ['h-F', 'crit'], to: 'reg', by: 'j-reg' },
      { from: ['reg'], to: 'thm', by: 'j-thm' },
      { from: ['thm', 'h-abs'], to: 'dim2', by: 'j-dimloc' },
      { from: ['h-F'], to: 'courbes', by: 'j-courbes' },
      { from: ['courbes', 'h-abs'], to: 'tang', by: 'j-def-courbes' },
      { from: ['courbes'], to: 'det', by: 'j-det' },
      { from: ['dim2', 'tang', 'det'], to: 'contra', by: 'j-contra' },
      { from: ['thm', 'contra'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-niveau',
        verdict: 'incorrect',
        concept: 'lie-niveau-regulier',
        message: 'Un niveau n’est une sous-variété que s’il est régulier, ce qui échoue ici au sommet.',
        counterexample: t`$dF_0=0$ et $0\in C$.`,
      },
      {
        conclusion: 'x-niveau',
        by: 'j-niveau',
        verdict: 'incorrect',
        concept: 'lie-niveau-regulier',
        message: 'Cette affirmation est fausse : tout fermé de ℝⁿ est le niveau 0 d’une fonction lisse.',
        counterexample: t`Le cône $C$ lui-même, et plus généralement tout fermé de $\mathbb R^n$, est le niveau $0$ d'une fonction lisse.`,
      },
      {
        conclusion: 'x-ker',
        verdict: 'incorrect',
        concept: 'lie-espace-tangent',
        message: t`La formule $T_p=\operatorname{Ker}dF_p$ n'est valable qu'aux points réguliers ; en $0$, $dF_0=0$ et elle ne dit rien.`,
        counterexample: t`Si $C$ était une sous-variété de dimension $2$ en $0$, son espace tangent serait de dimension $2$, pas $3$.`,
      },
    ],
    removable: [],
  },
  solution: t`**Hors du sommet.** $dF_p(v)=2(p_1v_1+p_2v_2-p_3v_3)$ ne s'annule identiquement qu'en $p=0$. Sur l'ouvert $\mathbb R^3\setminus\{0\}$, le niveau $0$ est donc régulier, et $C\setminus\{0\}$ est une sous-variété de dimension $3-1=2$.

**Au sommet, par l'absurde.** Si $C$ était une sous-variété au voisinage de $0$, sa dimension serait localement constante, égale à $2$. Pour tout $\theta$, $\gamma_\theta(s)=s(\cos\theta,\sin\theta,1)$ est tracée dans $C$ car $F(\gamma_\theta(s))=s^2(\cos^2\theta+\sin^2\theta-1)=0$, et $\gamma_\theta'(0)=(\cos\theta,\sin\theta,1)\in T_0C$. Pour $\theta=0,\tfrac\pi2,\pi$, ces vecteurs dérivés ont pour déterminant
$$\det\begin{pmatrix}1&0&1\\0&1&1\\-1&0&1\end{pmatrix}=1\cdot 1+1\cdot 1=2\neq 0 :$$
elles sont indépendantes, ce qui est impossible dans un plan. Donc $C$ n'est pas une sous-variété au voisinage de $0$.`,
  steps: [
    'Points critiques de F : seulement l’origine.',
    t`Théorème du niveau régulier sur $\mathbb R^3\setminus\{0\}$.`,
    'Par l’absurde : dimension 2 au sommet.',
    'Trois vecteurs dérivés de courbes tracées sur le cône, indépendantes : contradiction.',
  ],
  commonErrors: [
    { id: 'e-niveau', description: 'Croire que tout niveau d’une fonction lisse est une sous-variété.', concept: 'lie-niveau-regulier' },
    { id: 'e-ker', description: t`Utiliser $T_p=\operatorname{Ker}dF_p$ en un point critique.`, concept: 'lie-espace-tangent' },
  ],
  hints: [
    t`Où la différentielle de $F$ s'annule-t-elle ? Le théorème s'applique-t-il sur un ouvert qui évite ce point ?`,
    t`Si $C$ était une sous-variété en $0$, quelle serait sa dimension, et que contiendrait $T_0C$ ?`,
    t`Les droites $s\mapsto s(\cos\theta,\sin\theta,1)$ sont tracées sur le cône : prends trois valeurs de $\theta$ et calcule un déterminant.`,
  ],
  rubric: rubric({
    hypotheses: 'Le seul point critique est identifié, et le théorème est appliqué sur un ouvert qui l’évite.',
    methode: 'Raisonnement par l’absurde au sommet, par les vecteurs dérivés de courbes.',
    validite: 'Le déterminant est calculé exactement.',
    justifications: 'La dimension au sommet est justifiée par la constance locale de la dimension.',
    conclusion: 'Les deux volets (régularité hors du sommet, singularité au sommet) sont conclus.',
  }),
  variant: {
    statement: t`Montrer que $\{(x,y):xy=0\}$ n'est pas une sous-variété de $\mathbb R^2$ au voisinage de $0$, mais que privé de l'origine il est une sous-variété de dimension $1$.`,
    solution: t`$F(x,y)=xy$ a pour différentielle $(y,x)$, nulle seulement en $0$ : hors de l'origine, le niveau $0$ est régulier, de dimension $1$. En $0$, les courbes $s\mapsto(s,0)$ et $s\mapsto(0,s)$ sont tracées sur l'ensemble et leurs vecteurs dérivés $(1,0)$ et $(0,1)$ sont indépendantes : une sous-variété de dimension $1$ ne peut les contenir toutes deux dans son espace tangent.`,
  },
  verification: COMPLEMENT,
};

const mod: TheoremModule = {
  theorem: {
    id: 'niveau-regulier',
    spaces: [t`$M^m$, $N^n$ variétés lisses, $F:M\to N$ lisse, $q\in N$.`],
    hypotheses: [
      { id: 'lisse', text: t`$F$ est lisse.` },
      {
        id: 'surj',
        text: t`$dF_p:T_pM\to T_qN$ est surjective pour tout $p\in F^{-1}(q)$.`,
        whenRemoved: t`Pour $F(x,y,z)=x^2+y^2-z^2$ et $q=0$, $dF_0=0$ : le niveau est un cône, qui n'est pas une sous-variété au voisinage de son sommet.`,
      },
    ],
    statement: t`Si $dF_p$ est surjective pour tout $p\in F^{-1}(q)$, alors $F^{-1}(q)$ est une sous-variété plongée de $M$, de dimension $m-n$, et $T_pF^{-1}(q)=\operatorname{Ker}dF_p$ pour tout $p\in F^{-1}(q)$.`,
    conclusions: {
      existence: t`Une structure de sous-variété plongée sur $F^{-1}(q)$.`,
      autre: t`Dimension $m-n$ et espace tangent $T_pF^{-1}(q)=\operatorname{Ker}dF_p$.`,
    },
    sourceProof: 'idee',
    proofOutline: [
      t`Près de $p$, choisir des cartes ; la surjectivité de $dF_p$ permet, par le théorème des fonctions implicites, d'écrire $F^{-1}(q)$ comme un graphe au-dessus de $m-n$ coordonnées.`,
      t`Ces graphes fournissent des cartes adaptées : $F^{-1}(q)$ est une sous-variété plongée de dimension $m-n$.`,
      t`Toute courbe tracée dans le niveau vérifie $F(\gamma(s))=q$, donc $dF_p(\gamma'(0))=0$ : $T_pF^{-1}(q)\subset\operatorname{Ker}dF_p$, et l'égalité vient des dimensions.`,
    ],
    warnings: [
      'La surjectivité doit être vérifiée en tout point du niveau, pas seulement en un point.',
      t`La condition est suffisante, non nécessaire : $\{y^2=0\}$ est la droite $\{y=0\}$, une sous-variété, bien que $d(y^2)=0$ sur ce niveau.`,
      'L’espace tangent est un sous-espace vectoriel, le noyau de la différentielle ; il ne contient pas le point p translaté.',
    ],
    usefulFor: 'Reconnaître les sphères, les groupes classiques O(n), SL(n) comme sous-variétés, et calculer leurs espaces tangents.',
    verification: FROM_LIE,
  },
  definitions: [
    { id: 'def-submersion', term: 'Submersion', statement: t`$F:M\to N$ lisse est une submersion en $p$ si $dF_p:T_pM\to T_{F(p)}N$ est surjective.`, source: lie(50, 'Définition 8.6') },
    { id: 'def-niveau-regulier', term: 'Niveau régulier', statement: t`$q\in N$ est une valeur régulière de $F$ si $dF_p$ est surjective pour tout $p\in F^{-1}(q)$.`, source: lie(50, 'Théorème 8.9') },
    { id: 'def-espace-tangent-courbes', term: 'Espace tangent (par les courbes)', statement: t`$T_pM$ est l'ensemble des vecteurs dérivés $\gamma'(0)$ des courbes lisses $\gamma$ tracées dans $M$ avec $\gamma(0)=p$.`, source: lie(32, 'Définition par courbes, § 4.2') },
  ],
  concepts: [],
  counterexamples: [
    {
      id: 'ce-niveau-non-regulier',
      theoremId: 'niveau-regulier',
      title: 'Un niveau qui n’est pas une sous-variété',
      claim: t`Pour toute application lisse $F:\mathbb R^3\to\mathbb R$ et tout $c$, l'ensemble $F^{-1}(c)$ est une sous-variété de $\mathbb R^3$.`,
      correctStatement: t`Si $dF_p\neq 0$ pour tout $p\in F^{-1}(c)$, alors $F^{-1}(c)$ est une sous-variété de dimension $2$.`,
      task: 'Parmi ces niveaux, lequel n’est pas une sous-variété au voisinage de l’un de ses points ?',
      check: {
        kind: 'choice',
        prompt: 'Niveau qui n’est pas une sous-variété',
        options: [t`$\{x^2+y^2+z^2=1\}$`, t`$\{x^2+y^2-z^2=0\}$`, t`$\{z=0\}$`, t`$\{x^2+y^2-z^2=1\}$`],
        correct: [1],
        explanation: t`Le cône $\{x^2+y^2=z^2\}$ contient trois droites de directions indépendantes passant par $0$ : il ne peut avoir de plan tangent en son sommet, où $dF_0=0$.`,
      },
      explanation: t`Le cône est le niveau $0$ de $F=x^2+y^2-z^2$, dont la différentielle s'annule au sommet ; les vecteurs dérivés en $0$ des droites tracées sur le cône engendrent $\mathbb R^3$.`,
      concept: 'lie-niveau-regulier',
      source: lie(78, '§ 17.3'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default mod;
