/**
 * Résultat 39 — Algèbre de Lie d'un groupe matriciel (cours de géométrie de Lie, § 25–26,
 * p. PDF 102–105). On dérive les contraintes le long d'une courbe issue de I ; le crochet
 * est le commutateur [A,B] = AB − BA, et l'espace tangent d'un sous-groupe de Lie est une
 * sous-algèbre (théorème 26.4, sens direct).
 */
import { t, rubric, lie, FROM_LIE, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'algebre-lie-matricielle.facile',
  theoremId: 'algebre-lie-matricielle',
  level: 'facile',
  title: t`L'algèbre $\mathfrak{so}(3)$`,
  statement: t`En dérivant la contrainte $Q^{\mathsf T}Q=I$ le long d'une courbe de $SO(3)$ issue de $I$, montrer que $T_ISO(3)=\mathfrak{so}(3)=\{A:A^{\mathsf T}=-A\}$, donner sa dimension et une base, puis vérifier que $\mathfrak{so}(3)$ est stable par $[A,B]=AB-BA$.`,
  source: lie(102, 'Groupes orthogonaux, § 25.1.1, et exercice 25.2'),
  prerequisites: [],
  concepts: ['lie-algebre-tangente', 'lie-espace-tangent', 'calcul-exact'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-courbe', kind: 'hypothese', text: t`$Q(t)$ est une courbe lisse dans $SO(3)$ avec $Q(0)=I$ ; on pose $A=Q'(0)$.` },
      { id: 'h-niveau', kind: 'hypothese', text: t`$O(3)$ est le niveau $I$ de $\phi(Q)=Q^{\mathsf T}Q$, à valeurs dans les matrices symétriques, et ce niveau est régulier.` },
      { id: 'derivee', kind: 'egalite', text: t`$Q'(t)^{\mathsf T}Q(t)+Q(t)^{\mathsf T}Q'(t)=0$, donc $A^{\mathsf T}+A=0$.` },
      { id: 'tangent', kind: 'egalite', text: t`$T_ISO(3)=\operatorname{Ker}d\phi_I=\{A:A^{\mathsf T}+A=0\}=\mathfrak{so}(3)$.` },
      {
        id: 'base',
        kind: 'egalite',
        text: t`Toute $A\in\mathfrak{so}(3)$ s'écrit $\begin{pmatrix}0&-c&b\\c&0&-a\\-b&a&0\end{pmatrix}$ : $\dim\mathfrak{so}(3)=3$.`,
        masked: t`Dimension de $\mathfrak{so}(3)$ : à déterminer.`,
        check: { kind: 'rational', prompt: t`Dimension de $\mathfrak{so}(3)$`, expected: '3' },
      },
      { id: 'stable', kind: 'egalite', text: t`$[A,B]^{\mathsf T}=B^{\mathsf T}A^{\mathsf T}-A^{\mathsf T}B^{\mathsf T}=BA-AB=-[A,B]$.` },
      { id: 'fin', kind: 'conclusion', text: t`$T_ISO(3)=\mathfrak{so}(3)$, de dimension $3$, et c'est une sous-algèbre de Lie de $\mathfrak{gl}(3)$.` },
      { id: 'x-affine', kind: 'egalite', distractor: true, text: t`$T_ISO(3)=\{I+A:A^{\mathsf T}=-A\}$.` },
      { id: 'x-det', kind: 'egalite', distractor: true, text: t`$\mathfrak{so}(3)=\{A\in M_3(\mathbb R):\det A=0\}$.` },
    ],
    justifications: [
      { id: 'j-deriv', label: t`Dériver $Q(t)^{\mathsf T}Q(t)=I$ en $t=0$, avec $Q(0)=I$.` },
      { id: 'j-niveau', label: t`Second volet du théorème du niveau régulier : $T_I=\operatorname{Ker}d\phi_I$ et $d\phi_I(A)=A^{\mathsf T}+A$ ; $SO(3)$ et $O(3)$ coïncident au voisinage de $I$.`, theorem: 'niveau-regulier' },
      { id: 'j-param', label: t`Une matrice antisymétrique $3\times3$ est déterminée par ses trois coefficients au-dessus de la diagonale.` },
      { id: 'j-transpose', label: t`$(AB)^{\mathsf T}=B^{\mathsf T}A^{\mathsf T}$ et $A^{\mathsf T}=-A$, $B^{\mathsf T}=-B$.` },
      { id: 'j-syn', label: 'Réunion des résultats.' },
    ],
    rules: [
      { from: ['h-courbe'], to: 'derivee', by: 'j-deriv' },
      { from: ['h-niveau', 'derivee'], to: 'tangent', by: 'j-niveau' },
      { from: ['tangent'], to: 'base', by: 'j-param' },
      { from: ['tangent'], to: 'stable', by: 'j-transpose' },
      { from: ['tangent', 'base', 'stable'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-affine',
        verdict: 'incorrect',
        concept: 'lie-espace-tangent',
        message: 'L’algèbre de Lie est un sous-espace vectoriel ; I + so(3) est l’espace affine tangent.',
        counterexample: t`$0\in T_ISO(3)$, mais $0=I+A$ exigerait $A=-I$, qui n'est pas antisymétrique.`,
      },
      {
        conclusion: 'x-det',
        verdict: 'incorrect',
        concept: 'lie-algebre-tangente',
        message: 'Une antisymétrique 3×3 est de déterminant nul, mais la réciproque est fausse.',
        counterexample: t`$\operatorname{diag}(1,0,0)$ est de déterminant nul et n'est pas antisymétrique.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-niveau',
        label: 'Ne plus disposer de la régularité du niveau',
        necessary: true,
        explanation: t`La dérivation donne seulement $T_ISO(3)\subset\mathfrak{so}(3)$ ; l'égalité vient de la régularité (ou d'un argument de dimension).`,
        counterexample: t`Pour un niveau non régulier, l'inclusion peut être stricte : la courbe $\{y^2=x^3\}$ a pour seul vecteur dérivé en $0$ le vecteur nul, alors que $\operatorname{Ker}dF_0=\mathbb R^2$ pour $F=y^2-x^3$.`,
      },
    ],
  },
  solution: t`**Dérivation.** De $Q(t)^{\mathsf T}Q(t)=I$ on tire $Q'(t)^{\mathsf T}Q(t)+Q(t)^{\mathsf T}Q'(t)=0$, d'où en $t=0$ : $A^{\mathsf T}+A=0$.

**Égalité.** $O(3)$ est un niveau régulier de $\phi(Q)=Q^{\mathsf T}Q$ (à valeurs symétriques), avec $d\phi_I(A)=A^{\mathsf T}+A$ ; donc $T_IO(3)=\operatorname{Ker}d\phi_I=\mathfrak{so}(3)$, et $SO(3)$ a le même espace tangent en $I$.

**Base.** $A=\begin{pmatrix}0&-c&b\\c&0&-a\\-b&a&0\end{pmatrix}$ : trois paramètres, $\dim\mathfrak{so}(3)=3$.

**Stabilité.** $[A,B]^{\mathsf T}=B^{\mathsf T}A^{\mathsf T}-A^{\mathsf T}B^{\mathsf T}=BA-AB=-[A,B]$.`,
  steps: ['Dériver la contrainte.', 'Égalité par le niveau régulier.', 'Base et dimension.', 'Stabilité par crochet.'],
  commonErrors: [
    { id: 'e-affine', description: 'Décrire l’algèbre comme I + {antisymétriques}.', concept: 'lie-espace-tangent' },
    { id: 'e-inclusion', description: 'Se contenter de l’inclusion T_I ⊂ so(3) sans l’égalité.', concept: 'lie-algebre-tangente' },
  ],
  hints: [
    t`Dérive $Q(t)^{\mathsf T}Q(t)=I$ par la règle du produit, puis pose $t=0$.`,
    'La dérivation ne donne qu’une inclusion : quel théorème donne l’égalité de l’espace tangent avec le noyau ?',
    t`Pour la stabilité, transpose $AB-BA$ en utilisant $A^{\mathsf T}=-A$ et $B^{\mathsf T}=-B$.`,
  ],
  rubric: rubric({
    hypotheses: 'La courbe passe par I et le niveau est régulier.',
    methode: 'Dérivation de la contrainte, puis identification exacte de l’espace tangent.',
    validite: 'Le calcul de la transposée du crochet est correct.',
    justifications: 'L’égalité (pas seulement l’inclusion) est justifiée.',
    conclusion: 'Dimension 3 et stabilité par crochet sont conclues.',
  }),
  variant: {
    statement: t`Montrer que $\mathfrak{so}(2)=\Big\{\begin{pmatrix}0&-\omega\\ \omega&0\end{pmatrix}:\omega\in\mathbb R\Big\}$ et que son crochet est nul.`,
    solution: t`Une antisymétrique $2\times2$ s'écrit $\omega J$ avec $J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ ; $\dim\mathfrak{so}(2)=1$ et $[\omega J,\eta J]=\omega\eta(J^2-J^2)=0$ : l'algèbre est abélienne, comme $SO(2)$.`,
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h-anti', kind: 'hypothese', text: t`$A\in\mathfrak{so}(2)$ si et seulement si $A^{\mathsf T}=-A$.` },
        { id: 'forme', kind: 'egalite', text: t`$A=\omega J$ avec $J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$.` },
        { id: 'crochet', kind: 'egalite', text: t`$[\omega J,\eta J]=0$.` },
        { id: 'fin', kind: 'conclusion', text: t`$\mathfrak{so}(2)=\mathbb RJ$ est abélienne.` },
        { id: 'x-dim2', kind: 'egalite', distractor: true, text: t`$\dim\mathfrak{so}(2)=2$.` },
      ],
      justifications: [
        { id: 'j-forme', label: 'Diagonale nulle et coefficients opposés.' },
        { id: 'j-crochet', label: 'Deux multiples d’une même matrice commutent.' },
        { id: 'j-syn', label: 'Conclusion.' },
      ],
      rules: [
        { from: ['h-anti'], to: 'forme', by: 'j-forme' },
        { from: ['forme'], to: 'crochet', by: 'j-crochet' },
        { from: ['forme', 'crochet'], to: 'fin', by: 'j-syn' },
      ],
      traps: [
        {
          conclusion: 'x-dim2',
          verdict: 'incorrect',
          concept: 'calcul-exact',
          message: 'Une antisymétrique 2×2 n’a qu’un coefficient libre.',
          counterexample: t`$\begin{pmatrix}a&b\\c&d\end{pmatrix}^{\mathsf T}=-\begin{pmatrix}a&b\\c&d\end{pmatrix}$ impose $a=d=0$ et $c=-b$.`,
        },
      ],
      removable: [],
    },
  },
  verification: FROM_LIE,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'algebre-lie-matricielle.intermediaire',
  theoremId: 'algebre-lie-matricielle',
  level: 'intermediaire',
  title: t`$\mathfrak{sl}(n)$ et la formule de Jacobi`,
  statement: t`À l'aide de la formule de Jacobi, montrer que $T_ISL(n,\mathbb R)=\mathfrak{sl}(n,\mathbb R)=\{X:\operatorname{tr}X=0\}$, que $\dim\mathfrak{sl}(3,\mathbb R)=8$, et que $[A,B]\in\mathfrak{sl}(n)$ pour toutes $A,B\in M_n(\mathbb R)$. Vérifier sur $A=\begin{pmatrix}1&2\\0&3\end{pmatrix}$, $B=\begin{pmatrix}0&1\\4&0\end{pmatrix}$.`,
  source: lie(102, 'Groupe spécial linéaire, § 25.1.2'),
  prerequisites: [],
  concepts: ['lie-algebre-tangente', 'calcul-exact', 'quantificateurs'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-courbe', kind: 'hypothese', text: t`$Q(t)$ est une courbe lisse dans $SL(n,\mathbb R)$, $Q(0)=I$, $X=Q'(0)$.` },
      { id: 'jacobi', kind: 'egalite', text: t`$\frac{d}{dt}\det Q(t)=\det Q(t)\,\operatorname{tr}\big(Q(t)^{-1}Q'(t)\big)$.` },
      { id: 'trace', kind: 'egalite', text: t`$0=\frac{d}{dt}\big|_{t=0}\det Q(t)=\operatorname{tr}X$.` },
      { id: 'tangent', kind: 'egalite', text: t`$T_ISL(n,\mathbb R)=\{X:\operatorname{tr}X=0\}$.` },
      {
        id: 'dim',
        kind: 'egalite',
        text: t`$\dim\mathfrak{sl}(3,\mathbb R)=9-1=8$.`,
        masked: t`Dimension de $\mathfrak{sl}(3,\mathbb R)$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Dimension de $\mathfrak{sl}(3,\mathbb R)$`, expected: '8' },
      },
      { id: 'tr-crochet', kind: 'egalite', text: t`$\operatorname{tr}(AB-BA)=\operatorname{tr}(AB)-\operatorname{tr}(BA)=0$ pour toutes $A,B$.` },
      {
        id: 'exemple',
        kind: 'egalite',
        text: t`Pour les matrices données, $[A,B]=\begin{pmatrix}8&-2\\8&-8\end{pmatrix}$, de trace nulle.`,
        masked: t`Coefficients de $[A,B]$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Coefficients de $[A,B]=AB-BA$, ligne par ligne`, expected: ['8', '-2', '8', '-8'], labels: ['c11', 'c12', 'c21', 'c22'] },
      },
      { id: 'fin', kind: 'conclusion', text: t`$\mathfrak{sl}(n,\mathbb R)=\{\operatorname{tr}=0\}$, de dimension $n^2-1$, contient tous les commutateurs : c'est une sous-algèbre, et même un idéal, de $\mathfrak{gl}(n)$.` },
      { id: 'x-tr-produit', kind: 'egalite', distractor: true, text: t`$\operatorname{tr}(AB)=\operatorname{tr}A\,\operatorname{tr}B$.` },
      { id: 'x-sl-commute', kind: 'consequence', distractor: true, text: t`Deux éléments de $\mathfrak{sl}(n)$ commutent, puisque leur commutateur est de trace nulle.` },
    ],
    justifications: [
      { id: 'j-jacobi', label: 'Formule de Jacobi.', theorem: 'formule-jacobi' },
      { id: 'j-t0', label: t`$\det Q(t)=1$ pour tout $t$, et $Q(0)=I$.` },
      { id: 'j-egalite', label: t`Inclusion par la dérivation ; égalité par le niveau régulier de $\det$ en $I$.`, theorem: 'niveau-regulier' },
      { id: 'j-dim', label: t`Une forme linéaire non nulle sur $M_3(\mathbb R)\simeq\mathbb R^9$ a un noyau de dimension $8$.` },
      { id: 'j-tr', label: t`$\operatorname{tr}(AB)=\operatorname{tr}(BA)$.` },
      { id: 'j-calc', label: t`$AB=\begin{pmatrix}8&1\\12&0\end{pmatrix}$, $BA=\begin{pmatrix}0&3\\4&8\end{pmatrix}$.` },
      { id: 'j-syn', label: 'Réunion des résultats.' },
    ],
    rules: [
      { from: ['h-courbe'], to: 'jacobi', by: 'j-jacobi' },
      { from: ['jacobi', 'h-courbe'], to: 'trace', by: 'j-t0' },
      { from: ['trace'], to: 'tangent', by: 'j-egalite' },
      { from: ['tangent'], to: 'dim', by: 'j-dim' },
      { from: ['tangent'], to: 'tr-crochet', by: 'j-tr' },
      { from: ['tr-crochet'], to: 'exemple', by: 'j-calc' },
      { from: ['tangent', 'dim', 'tr-crochet', 'exemple'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-tr-produit',
        verdict: 'incorrect',
        concept: 'calcul-exact',
        message: 'La trace est linéaire, pas multiplicative.',
        counterexample: t`Pour $A=B=\begin{pmatrix}1&0\\0&-1\end{pmatrix}$ : $\operatorname{tr}(AB)=2$ et $\operatorname{tr}A\operatorname{tr}B=0$.`,
      },
      {
        conclusion: 'x-sl-commute',
        verdict: 'incorrect',
        concept: 'quantificateurs',
        message: 'Un commutateur de trace nulle n’est pas nul.',
        counterexample: t`$\begin{pmatrix}0&1\\0&0\end{pmatrix}$ et $\begin{pmatrix}0&0\\1&0\end{pmatrix}$ sont dans $\mathfrak{sl}(2)$ et leur commutateur vaut $\operatorname{diag}(1,-1)\neq 0$.`,
      },
    ],
    removable: [],
  },
  solution: t`**Tangent.** Par la formule de Jacobi, $\frac{d}{dt}\det Q(t)=\det Q(t)\operatorname{tr}(Q(t)^{-1}Q'(t))$. Comme $\det Q(t)=1$, la dérivée est nulle ; en $t=0$, $\operatorname{tr}X=0$. L'égalité $T_ISL(n)=\{\operatorname{tr}=0\}$ vient du niveau régulier ($d(\det)_I=\operatorname{tr}$).

**Dimension.** Le noyau d'une forme linéaire non nulle sur $M_n(\mathbb R)$ est de dimension $n^2-1$ : $8$ pour $n=3$.

**Commutateurs.** $\operatorname{tr}(AB)=\operatorname{tr}(BA)$ donne $\operatorname{tr}[A,B]=0$ pour toutes $A,B$.

**Exemple.** $AB=\begin{pmatrix}8&1\\12&0\end{pmatrix}$, $BA=\begin{pmatrix}0&3\\4&8\end{pmatrix}$, $[A,B]=\begin{pmatrix}8&-2\\8&-8\end{pmatrix}$, de trace nulle.`,
  steps: ['Formule de Jacobi le long d’une courbe de SL(n).', 'Égalité de l’espace tangent.', 'Dimension n² − 1.', 'Trace d’un commutateur.'],
  commonErrors: [
    { id: 'e-produit', description: 'Croire la trace multiplicative.', concept: 'calcul-exact' },
    { id: 'e-commute', description: 'Confondre « commutateur de trace nulle » et « commutateur nul ».', concept: 'quantificateurs' },
  ],
  hints: [
    t`Dérive $\det Q(t)=1$ grâce à la formule de Jacobi.`,
    'Quelle propriété de la trace rend tout commutateur de trace nulle ?',
    t`Pour l'exemple, calcule $AB$ et $BA$ séparément avant de soustraire.`,
  ],
  rubric: rubric({
    hypotheses: 'La courbe reste dans SL(n) et passe par I.',
    methode: 'Formule de Jacobi, puis propriété tr(AB) = tr(BA).',
    validite: 'Le calcul de l’exemple est exact.',
    justifications: 'L’égalité de l’espace tangent est justifiée par le niveau régulier.',
    conclusion: 'sl(n), sa dimension et sa stabilité par crochet sont conclues.',
  }),
  variant: {
    statement: t`Montrer que $\mathfrak u(n)=\{X\in M_n(\mathbb C):X^*=-X\}$ est de dimension réelle $n^2$ et stable par crochet.`,
    solution: t`En dérivant $U^*U=I$ : $X^*+X=0$. Une telle matrice a une diagonale imaginaire pure ($n$ paramètres réels) et des coefficients sous-diagonaux arbitraires ($2\cdot\frac{n(n-1)}2$ paramètres), soit $n^2$. Et $[X,Y]^*=Y^*X^*-X^*Y^*=YX-XY=-[X,Y]$.`,
  },
  verification: FROM_LIE,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'algebre-lie-matricielle.difficile',
  theoremId: 'algebre-lie-matricielle',
  level: 'difficile',
  title: 'Les matrices symétriques ne sont l’algèbre d’aucun sous-groupe',
  statement: t`Soient $A=\begin{pmatrix}1&0\\0&-1\end{pmatrix}$ et $B=\begin{pmatrix}0&1\\1&0\end{pmatrix}$, symétriques. Calculer $[A,B]$ et en déduire que l'espace $\mathrm{Sym}(2)$ des matrices symétriques n'est pas une sous-algèbre de Lie de $\mathfrak{gl}(2)$. Conclure qu'aucun sous-groupe de Lie de $GL(2,\mathbb R)$ n'a $\mathrm{Sym}(2)$ pour espace tangent en $I$.`,
  source: lie(105, 'Sous-groupes de Lie et sous-algèbres, § 26.4'),
  prerequisites: [],
  concepts: ['lie-algebre-tangente', 'hypotheses-theoreme', 'calcul-exact'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-mat', kind: 'hypothese', text: t`$A=\begin{pmatrix}1&0\\0&-1\end{pmatrix}$ et $B=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ sont symétriques.` },
      {
        id: 'crochet',
        kind: 'egalite',
        text: t`$[A,B]=\begin{pmatrix}0&2\\-2&0\end{pmatrix}$.`,
        masked: t`Coefficients de $[A,B]$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Coefficients de $[A,B]=AB-BA$, ligne par ligne`, expected: ['0', '2', '-2', '0'], labels: ['c11', 'c12', 'c21', 'c22'] },
      },
      { id: 'antisym', kind: 'consequence', text: t`$[A,B]$ est antisymétrique non nulle, donc pas symétrique.` },
      { id: 'general', kind: 'egalite', text: t`Pour $S,T$ symétriques, $[S,T]^{\mathsf T}=TS-ST=-[S,T]$ : le crochet de deux symétriques est toujours antisymétrique.` },
      { id: 'non-sous-alg', kind: 'consequence', text: t`$\mathrm{Sym}(2)$ n'est pas stable par crochet : ce n'est pas une sous-algèbre de Lie.` },
      { id: 'h-sg', kind: 'hypothese', local: true, text: t`Supposons qu'un sous-groupe de Lie $H\subset GL(2,\mathbb R)$ vérifie $T_IH=\mathrm{Sym}(2)$.` },
      { id: 'thm', kind: 'application-theoreme', text: t`$T_IH$ serait une sous-algèbre de Lie de $\mathfrak{gl}(2)$.` },
      { id: 'contra', kind: 'contradiction', text: t`$\mathrm{Sym}(2)$ serait stable par crochet : contradiction.` },
      { id: 'fin', kind: 'conclusion', text: t`Aucun sous-groupe de Lie de $GL(2,\mathbb R)$ n'a $\mathrm{Sym}(2)$ pour algèbre de Lie : la stabilité par crochet est une contrainte réelle.` },
      { id: 'x-sous-espace', kind: 'consequence', distractor: true, text: t`Tout sous-espace vectoriel de $\mathfrak{gl}(n)$ est l'algèbre de Lie d'un sous-groupe de Lie.` },
      { id: 'x-exp-sym', kind: 'consequence', distractor: true, text: t`$\exp(\mathrm{Sym}(2))$ est un sous-groupe de $GL(2,\mathbb R)$.` },
    ],
    justifications: [
      { id: 'j-calc', label: t`$AB=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ et $BA=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$.` },
      { id: 'j-lecture', label: 'Lecture des coefficients.' },
      { id: 'j-transpose', label: t`$(ST)^{\mathsf T}=T^{\mathsf T}S^{\mathsf T}=TS$.` },
      { id: 'j-non', label: 'Un crochet de deux éléments sort de l’espace.' },
      { id: 'j-thm', label: 'L’espace tangent en I d’un sous-groupe de Lie est une sous-algèbre (sens direct du théorème 26.4).', theorem: 'algebre-lie-matricielle' },
      { id: 'j-contra', label: 'Incompatibilité avec la non-stabilité établie.' },
      { id: 'j-syn', label: 'Conclusion.' },
    ],
    rules: [
      { from: ['h-mat'], to: 'crochet', by: 'j-calc' },
      { from: ['crochet'], to: 'antisym', by: 'j-lecture' },
      { from: ['h-mat'], to: 'general', by: 'j-transpose' },
      { from: ['antisym', 'general'], to: 'non-sous-alg', by: 'j-non' },
      { from: ['h-sg'], to: 'thm', by: 'j-thm' },
      { from: ['thm', 'non-sous-alg'], to: 'contra', by: 'j-contra' },
      { from: ['contra'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-sous-espace',
        verdict: 'incorrect',
        concept: 'lie-algebre-tangente',
        message: 'Seules les sous-algèbres (sous-espaces stables par crochet) sont des algèbres de sous-groupes de Lie.',
        counterexample: t`$\mathrm{Sym}(2)$ est un sous-espace non stable : $[A,B]=\begin{pmatrix}0&2\\-2&0\end{pmatrix}\notin\mathrm{Sym}(2)$.`,
      },
      {
        conclusion: 'x-exp-sym',
        verdict: 'incorrect',
        concept: 'lie-exp-somme',
        message: 'Les exponentielles de symétriques sont les symétriques définies positives, et un produit de deux d’entre elles n’est pas symétrique en général.',
        counterexample: t`$e^A=\operatorname{diag}(e,e^{-1})$ et $e^B$ sont symétriques, mais $e^Ae^B$ ne l'est pas, puisque $e^A$ et $e^B$ ne commutent pas.`,
      },
    ],
    removable: [],
  },
  solution: t`**Calcul.** $AB=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$, $BA=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$, donc $[A,B]=\begin{pmatrix}0&2\\-2&0\end{pmatrix}$, antisymétrique non nulle.

**En général.** Pour $S,T$ symétriques, $[S,T]^{\mathsf T}=TS-ST=-[S,T]$ : le crochet de deux symétriques est antisymétrique. $\mathrm{Sym}(2)$ n'est donc pas stable par crochet.

**Conséquence.** Si un sous-groupe de Lie $H$ avait $T_IH=\mathrm{Sym}(2)$, ce serait une sous-algèbre de Lie (l'espace tangent d'un sous-groupe de Lie est stable par crochet) : contradiction. Les symétriques définies positives ne forment pas un sous-groupe : le produit de deux d'entre elles n'est pas symétrique en général.`,
  steps: ['Calcul du crochet.', 'Crochet de deux symétriques.', 'Non-stabilité.', 'Contradiction avec le théorème des sous-algèbres.'],
  commonErrors: [
    { id: 'e-sous-espace', description: 'Croire que tout sous-espace de gl(n) est une algèbre de Lie de sous-groupe.', concept: 'lie-algebre-tangente' },
    { id: 'e-exp', description: 'Croire que l’exponentielle d’un sous-espace est un sous-groupe.', concept: 'lie-exp-somme' },
  ],
  hints: [
    t`Calcule $AB$ et $BA$ : que remarques-tu sur leur forme ?`,
    t`Transpose $[S,T]$ pour $S,T$ symétriques.`,
    'Quelle propriété l’espace tangent d’un sous-groupe de Lie doit-il avoir vis-à-vis du crochet ?',
  ],
  rubric: rubric({
    hypotheses: 'La symétrie de A et B est utilisée.',
    methode: 'Calcul, généralisation, puis raisonnement par l’absurde.',
    validite: 'Le crochet est calculé exactement.',
    justifications: 'Le théorème liant sous-groupes et sous-algèbres est invoqué dans le bon sens.',
    conclusion: 'L’absence de sous-groupe d’algèbre Sym(2) est conclue.',
  }),
  variant: {
    statement: t`Montrer que les matrices triangulaires supérieures forment une sous-algèbre de $\mathfrak{gl}(n)$, et identifier un sous-groupe correspondant.`,
    solution: t`Le produit de deux triangulaires supérieures l'est encore, donc leur commutateur aussi : c'est une sous-algèbre. Le groupe des matrices triangulaires supérieures inversibles a pour espace tangent en $I$ cette sous-algèbre.`,
  },
  verification: COMPLEMENT,
};

const mod: TheoremModule = {
  theorem: {
    id: 'algebre-lie-matricielle',
    spaces: [t`$G\subset GL(n,\mathbb R)$ (ou $GL(n,\mathbb C)$) groupe matriciel de Lie, $\mathfrak g=T_IG$.`],
    hypotheses: [
      { id: 'sous-groupe', text: t`$G$ est un sous-groupe de Lie de $GL(n)$.` },
    ],
    statement: t`$\mathfrak g=T_IG=\{Q'(0):Q$ courbe lisse de $G$, $Q(0)=I\}$ est un sous-espace de $M_n$ stable par $[A,B]=AB-BA$, bilinéaire, antisymétrique, vérifiant Jacobi. En dérivant les contraintes : $\mathfrak{so}(n)=\{A^{\mathsf T}=-A\}$ (dimension $\frac{n(n-1)}2$), $\mathfrak{sl}(n)=\{\operatorname{tr}X=0\}$ (dimension $n^2-1$), $\mathfrak u(n)=\{X^*=-X\}$ (dimension réelle $n^2$).`,
    conclusions: {
      autre: 'L’espace tangent d’un sous-groupe de Lie est une sous-algèbre ; réciproquement, toute sous-algèbre intègre un unique sous-groupe immergé connexe (admis).',
    },
    sourceProof: 'idee',
    proofOutline: [
      'Dériver les contraintes globales le long d’une courbe issue de I donne une inclusion ; le niveau régulier donne l’égalité.',
      t`Le champ invariant à gauche associé à $A$ est $Q\mapsto QA$ ; le calcul $[A^L,B^L](Q)=Q(AB-BA)$ identifie le crochet au commutateur.`,
      'Les champs invariants associés à T_IH restent tangents au sous-groupe H : leur crochet aussi.',
    ],
    warnings: [
      'L’algèbre de Lie est un sous-espace vectoriel, pas le translaté I + 𝔤.',
      'Un sous-espace de gl(n) n’est l’algèbre d’un sous-groupe que s’il est stable par crochet.',
      'O(n) et SO(n) ont la même algèbre, car ils coïncident au voisinage de I.',
    ],
    usefulFor: 'Linéariser un groupe de symétries, calculer des générateurs, préparer l’exponentielle.',
    verification: FROM_LIE,
  },
  definitions: [
    { id: 'def-algebre-lie', term: 'Algèbre de Lie d’un groupe', statement: t`$\mathfrak g=T_eG$, munie du crochet des champs invariants à gauche ; pour un groupe matriciel, $[A,B]=AB-BA$.`, source: lie(104, 'Définition 26.1') },
    { id: 'def-sous-algebre', term: 'Sous-algèbre de Lie', statement: t`Un sous-espace $\mathfrak h\subset\mathfrak g$ tel que $X,Y\in\mathfrak h\Rightarrow[X,Y]\in\mathfrak h$.`, source: lie(105, 'Définition 26.3') },
  ],
  concepts: [],
  counterexamples: [
    {
      id: 'ce-algebre-sym',
      theoremId: 'algebre-lie-matricielle',
      title: 'Un sous-espace qui n’est pas une sous-algèbre',
      claim: t`Tout sous-espace vectoriel de $\mathfrak{gl}(2,\mathbb R)$ est stable par crochet.`,
      correctStatement: t`Seules les sous-algèbres sont stables par crochet ; ce sont exactement les algèbres de Lie des sous-groupes de Lie immergés connexes.`,
      task: t`Pour $A=\operatorname{diag}(1,-1)$ et $B=\begin{pmatrix}0&1\\1&0\end{pmatrix}$, symétriques, donner le coefficient $(1,2)$ de $[A,B]$.`,
      check: { kind: 'rational', prompt: t`Coefficient $(1,2)$ de $[A,B]$`, expected: '2' },
      explanation: t`$[A,B]=\begin{pmatrix}0&2\\-2&0\end{pmatrix}$ est antisymétrique non nulle : il sort de l'espace des matrices symétriques.`,
      concept: 'lie-algebre-tangente',
      source: lie(105, '§ 26.4'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default mod;
