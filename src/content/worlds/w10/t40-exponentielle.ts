/**
 * Résultat 40 — Sous-groupes à un paramètre et exponentielle (cours de géométrie de Lie,
 * § 28–29, p. PDF 109–112). Cas matriciel : exp(A) = Σ A^k/k!, exp((s+t)X) = exp(sX)exp(tX),
 * e^{A+B} = e^A e^B si [A,B] = 0 (faux en général), det e^A = e^{tr A} ; l'exponentielle
 * est un difféomorphisme local en 0, ni injective ni surjective en général.
 */
import { t, rubric, lie, FROM_LIE, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'exponentielle.facile',
  theoremId: 'exponentielle',
  level: 'facile',
  title: t`L'exponentielle de $\mathfrak{so}(2)$ : les rotations`,
  statement: t`Soit $J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$. Montrer que $e^{tJ}=\begin{pmatrix}\cos t&-\sin t\\ \sin t&\cos t\end{pmatrix}$, que $t\mapsto e^{tJ}$ est un sous-groupe à un paramètre de $SO(2)$ de vecteur tangent $J$, et calculer $e^{\frac\pi2J}$.`,
  source: lie(114, 'SO(2) en détail, calcul de l’exponentielle, § 30.3'),
  prerequisites: [],
  concepts: ['lie-algebre-tangente', 'lie-exp-globale', 'calcul-exact'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-J', kind: 'hypothese', text: t`$J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$, et $e^{A}=\sum_{k\ge0}\frac{A^k}{k!}$.` },
      { id: 'carre', kind: 'egalite', text: t`$J^2=-I$, donc $J^{2k}=(-1)^kI$ et $J^{2k+1}=(-1)^kJ$.` },
      { id: 'serie', kind: 'egalite', text: t`$e^{tJ}=\Big(\sum_k\frac{(-1)^kt^{2k}}{(2k)!}\Big)I+\Big(\sum_k\frac{(-1)^kt^{2k+1}}{(2k+1)!}\Big)J=\cos t\,I+\sin t\,J$.` },
      { id: 'groupe', kind: 'egalite', text: t`$e^{(s+t)J}=e^{sJ}e^{tJ}$ et $\frac{d}{dt}\big|_{t=0}e^{tJ}=J$.` },
      { id: 'so2', kind: 'consequence', text: t`$e^{tJ}\in SO(2)$ pour tout $t$ : c'est le sous-groupe à un paramètre engendré par $J$.` },
      {
        id: 'valeur',
        kind: 'egalite',
        text: t`$e^{\frac\pi2J}=J$.`,
        masked: t`Coefficients de $e^{\frac\pi2J}$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Coefficients de $e^{\frac\pi2J}$, ligne par ligne`, expected: ['0', '-1', '1', '0'], labels: ['a11', 'a12', 'a21', 'a22'] },
      },
      { id: 'fin', kind: 'conclusion', text: t`$e^{tJ}$ est la rotation d'angle $t$ ; $t\mapsto e^{tJ}$ est le sous-groupe à un paramètre de vecteur tangent $J$, et $e^{\frac\pi2J}=J$.` },
      { id: 'x-coef', kind: 'egalite', distractor: true, text: t`$e^{tJ}=\begin{pmatrix}e^{0}&e^{-t}\\e^{t}&e^{0}\end{pmatrix}$ (exponentielle coefficient par coefficient).` },
      { id: 'x-inj', kind: 'consequence', distractor: true, text: t`$t\mapsto e^{tJ}$ est injective sur $\mathbb R$.` },
    ],
    justifications: [
      { id: 'j-carre', label: 'Produit matriciel, puis récurrence.' },
      { id: 'j-serie', label: 'Séparer termes pairs et impairs de la série, absolument convergente.' },
      { id: 'j-groupe', label: t`Formules d'addition de $\cos$ et $\sin$, ou commutation de $sJ$ et $tJ$ ; dérivation terme à terme.` },
      { id: 'j-so2', label: t`$\det e^{tJ}=\cos^2t+\sin^2t=1$ et les colonnes sont orthonormées.` },
      { id: 'j-eval', label: t`$\cos\frac\pi2=0$, $\sin\frac\pi2=1$.` },
      { id: 'j-unicite', label: 'Unicité du sous-groupe à un paramètre de vecteur tangent donné.', theorem: 'exponentielle' },
      { id: 'j-coef', label: 'L’exponentielle d’une matrice s’obtient coefficient par coefficient.' },
    ],
    rules: [
      { from: ['h-J'], to: 'carre', by: 'j-carre' },
      { from: ['carre', 'h-J'], to: 'serie', by: 'j-serie' },
      { from: ['serie'], to: 'groupe', by: 'j-groupe' },
      { from: ['serie'], to: 'so2', by: 'j-so2' },
      { from: ['serie'], to: 'valeur', by: 'j-eval' },
      { from: ['groupe', 'so2', 'valeur'], to: 'fin', by: 'j-unicite' },
    ],
    traps: [
      {
        conclusion: 'x-coef',
        verdict: 'incorrect',
        concept: 'calcul-exact',
        message: 'L’exponentielle de matrice est une série de puissances de la matrice, pas l’exponentielle des coefficients.',
        counterexample: t`En $t=\pi$, la série donne $e^{\pi J}=-I$, alors que la formule proposée a des coefficients positifs.`,
      },
      {
        conclusion: 'x-coef',
        by: 'j-coef',
        verdict: 'incorrect',
        concept: 'calcul-exact',
        message: 'Faux en dehors des matrices diagonales.',
      },
      {
        conclusion: 'x-inj',
        verdict: 'incorrect',
        concept: 'lie-exp-globale',
        message: 'L’exponentielle n’est injective que près de 0.',
        counterexample: t`$e^{2\pi J}=I=e^{0}$.`,
      },
    ],
    removable: [],
  },
  solution: t`$J^2=-I$, donc $J^{2k}=(-1)^kI$ et $J^{2k+1}=(-1)^kJ$. En séparant termes pairs et impairs de la série (absolument convergente) :
$$e^{tJ}=\cos t\,I+\sin t\,J=\begin{pmatrix}\cos t&-\sin t\\ \sin t&\cos t\end{pmatrix}.$$
C'est une rotation : $\det=1$, colonnes orthonormées. Les formules d'addition donnent $e^{(s+t)J}=e^{sJ}e^{tJ}$, et la dérivée en $0$ vaut $J$ : c'est le sous-groupe à un paramètre de vecteur tangent $J$. Enfin $e^{\frac\pi2J}=J$. L'application $t\mapsto e^{tJ}$ n'est pas injective : $e^{2\pi J}=I$.`,
  steps: [t`$J^2=-I$.`, 'Séparation de la série.', 'Propriété de groupe et vecteur tangent.', t`Évaluation en $\frac\pi2$.`],
  commonErrors: [
    { id: 'e-coef', description: 'Exponentier les coefficients.', concept: 'calcul-exact' },
    { id: 'e-inj', description: 'Croire l’exponentielle injective.', concept: 'lie-exp-globale' },
  ],
  hints: [t`Calcule $J^2$.`, 'Sépare la série en termes pairs et impairs : quelles séries reconnais-tu ?', t`Pour le sous-groupe, utilise les formules d'addition ; évalue enfin en $t=\frac\pi2$.`],
  rubric: rubric({
    hypotheses: 'La convergence absolue de la série est mentionnée.',
    methode: 'Calcul des puissances, puis séparation pair/impair.',
    validite: t`$e^{tJ}=\cos t\,I+\sin t\,J$ est exact.`,
    justifications: 'La propriété de groupe et le vecteur tangent sont vérifiés.',
    conclusion: t`Rotation d'angle $t$ et valeur en $\frac\pi2$ conclues.`,
  }),
  variant: {
    statement: t`Pour $N=\begin{pmatrix}0&1\\0&0\end{pmatrix}$, calculer $e^{tN}$ et vérifier que $t\mapsto e^{tN}$ est un sous-groupe à un paramètre de $SL(2,\mathbb R)$.`,
    solution: t`$N^2=0$, donc $e^{tN}=I+tN=\begin{pmatrix}1&t\\0&1\end{pmatrix}$, de déterminant $1$, et $e^{(s+t)N}=I+(s+t)N=(I+sN)(I+tN)$ puisque $N^2=0$.`,
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h-N', kind: 'hypothese', text: t`$N=\begin{pmatrix}0&1\\0&0\end{pmatrix}$.` },
        { id: 'nil', kind: 'egalite', text: t`$N^2=0$.` },
        { id: 'exp', kind: 'egalite', text: t`$e^{tN}=I+tN$.` },
        { id: 'fin', kind: 'conclusion', text: t`$e^{tN}=\begin{pmatrix}1&t\\0&1\end{pmatrix}$ est un sous-groupe à un paramètre de $SL(2,\mathbb R)$.` },
        { id: 'x-exp', kind: 'egalite', distractor: true, text: t`$e^{tN}=\begin{pmatrix}1&e^t\\0&1\end{pmatrix}$.` },
      ],
      justifications: [
        { id: 'j-nil', label: 'Produit matriciel.' },
        { id: 'j-serie', label: 'La série s’arrête au terme de degré 1.' },
        { id: 'j-groupe', label: t`$(I+sN)(I+tN)=I+(s+t)N$ et $\det(I+tN)=1$.` },
      ],
      rules: [
        { from: ['h-N'], to: 'nil', by: 'j-nil' },
        { from: ['nil'], to: 'exp', by: 'j-serie' },
        { from: ['exp', 'nil'], to: 'fin', by: 'j-groupe' },
      ],
      traps: [
        {
          conclusion: 'x-exp',
          verdict: 'incorrect',
          concept: 'calcul-exact',
          message: 'La série de puissances s’arrête : aucun terme exponentiel n’apparaît.',
          counterexample: t`En $t=0$, la formule proposée donne $\begin{pmatrix}1&1\\0&1\end{pmatrix}\neq I$.`,
        },
      ],
      removable: [],
    },
  },
  verification: FROM_LIE,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'exponentielle.intermediaire',
  theoremId: 'exponentielle',
  level: 'intermediaire',
  title: t`$e^{A+B}$, $e^Ae^B$ et la commutation`,
  statement: t`Montrer que si $[A,B]=0$, alors $e^{A+B}=e^Ae^B$. Pour $A=\begin{pmatrix}0&1\\0&0\end{pmatrix}$ et $B=\begin{pmatrix}0&0\\1&0\end{pmatrix}$, calculer $[A,B]$, $e^Ae^B$ et $e^{A+B}$, et constater que l'égalité tombe.`,
  source: lie(112, 'La somme ne devient pas toujours un produit, § 29.2'),
  prerequisites: [],
  concepts: ['lie-exp-somme', 'calcul-exact', 'quantificateurs'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-comm', kind: 'hypothese', text: t`Cas général : $A,B\in M_n(\mathbb R)$ avec $AB=BA$.` },
      { id: 'binome', kind: 'egalite', text: t`$(A+B)^m=\sum_{k=0}^m\binom mkA^kB^{m-k}$.` },
      { id: 'produit', kind: 'egalite', text: t`$e^{A+B}=\sum_m\sum_{k}\frac{A^k}{k!}\frac{B^{m-k}}{(m-k)!}=e^Ae^B$.` },
      { id: 'h-ex', kind: 'hypothese', text: t`Exemple : $A=\begin{pmatrix}0&1\\0&0\end{pmatrix}$, $B=\begin{pmatrix}0&0\\1&0\end{pmatrix}$.` },
      { id: 'crochet', kind: 'egalite', text: t`$[A,B]=\operatorname{diag}(1,-1)\neq 0$.` },
      {
        id: 'eaeb',
        kind: 'egalite',
        text: t`$e^A=I+A$, $e^B=I+B$, et $e^Ae^B=\begin{pmatrix}2&1\\1&1\end{pmatrix}$.`,
        masked: t`Coefficients de $e^Ae^B$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Coefficients de $e^Ae^B$, ligne par ligne`, expected: ['2', '1', '1', '1'], labels: ['a11', 'a12', 'a21', 'a22'] },
      },
      { id: 'eapb', kind: 'egalite', text: t`$S=A+B$ vérifie $S^2=I$, donc $e^{S}=\cosh 1\,I+\sinh 1\,S=\begin{pmatrix}\cosh1&\sinh1\\ \sinh1&\cosh1\end{pmatrix}$.` },
      { id: 'diff', kind: 'consequence', text: t`$e^{A+B}\neq e^Ae^B$, puisque $\cosh 1\neq 2$.` },
      { id: 'fin', kind: 'conclusion', text: t`La commutation suffit à $e^{A+B}=e^Ae^B$ ; sans elle, l'égalité est fausse en général, comme le montre cet exemple.` },
      { id: 'x-toujours', kind: 'egalite', distractor: true, text: t`$e^{A+B}=e^Ae^B$ pour toutes matrices $A,B$.` },
      { id: 'x-ordre', kind: 'egalite', distractor: true, after: ['eaeb'], text: t`$e^Ae^B=e^Be^A$ pour les matrices de l'exemple.` },
    ],
    justifications: [
      { id: 'j-binome', label: 'Formule du binôme, valable car A et B commutent.' },
      { id: 'j-cauchy', label: 'Produit de Cauchy de deux séries absolument convergentes.' },
      { id: 'j-crochet', label: t`$AB=\operatorname{diag}(1,0)$ et $BA=\operatorname{diag}(0,1)$.` },
      { id: 'j-nil', label: t`$A^2=B^2=0$, donc les séries s'arrêtent ; produit matriciel.` },
      { id: 'j-cosh', label: t`$S^{2k}=I$, $S^{2k+1}=S$ : séparation de la série en termes pairs et impairs.` },
      { id: 'j-compare', label: t`Comparaison des coefficients $(1,1)$ : $\cosh 1<2$.` },
      { id: 'j-syn', label: 'Réunion du cas commutatif et du contre-exemple.' },
    ],
    rules: [
      { from: ['h-comm'], to: 'binome', by: 'j-binome' },
      { from: ['binome'], to: 'produit', by: 'j-cauchy' },
      { from: ['h-ex'], to: 'crochet', by: 'j-crochet' },
      { from: ['h-ex'], to: 'eaeb', by: 'j-nil' },
      { from: ['h-ex'], to: 'eapb', by: 'j-cosh' },
      { from: ['eaeb', 'eapb'], to: 'diff', by: 'j-compare' },
      { from: ['produit', 'crochet', 'diff'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-toujours',
        verdict: 'incorrect',
        concept: 'lie-exp-somme',
        message: 'La formule exige la commutation : la somme ne devient pas un produit en général.',
        counterexample: t`Pour les matrices de l'exemple, le coefficient $(1,1)$ vaut $2$ dans $e^Ae^B$ et $\cosh1$ dans $e^{A+B}$.`,
      },
      {
        conclusion: 'x-ordre',
        verdict: 'incorrect',
        concept: 'lie-exp-somme',
        message: 'Le produit des exponentielles dépend de l’ordre quand les matrices ne commutent pas.',
        counterexample: t`$e^Be^A=\begin{pmatrix}1&1\\1&2\end{pmatrix}\neq\begin{pmatrix}2&1\\1&1\end{pmatrix}=e^Ae^B$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-comm',
        label: 'Ne plus supposer que A et B commutent',
        necessary: true,
        explanation: 'La formule du binôme ne s’applique plus : (A + B)² = A² + AB + BA + B² ≠ A² + 2AB + B².',
        counterexample: t`L'exemple de l'exercice : $e^{A+B}\neq e^Ae^B$.`,
      },
    ],
  },
  solution: t`**Cas commutatif.** Si $AB=BA$, le binôme donne $(A+B)^m=\sum_k\binom mkA^kB^{m-k}$, et le produit de Cauchy des deux séries absolument convergentes donne $e^{A+B}=e^Ae^B$.

**Contre-exemple.** $AB=\operatorname{diag}(1,0)$, $BA=\operatorname{diag}(0,1)$, donc $[A,B]=\operatorname{diag}(1,-1)\neq 0$. Comme $A^2=B^2=0$ : $e^A=I+A$, $e^B=I+B$, $e^Ae^B=\begin{pmatrix}2&1\\1&1\end{pmatrix}$. Pour $S=A+B$, $S^2=I$, d'où $e^S=\cosh1\,I+\sinh1\,S$. Le coefficient $(1,1)$ vaut $\cosh 1\approx1{,}54\neq 2$ : $e^{A+B}\neq e^Ae^B$. D'ailleurs $e^Be^A=\begin{pmatrix}1&1\\1&2\end{pmatrix}$ diffère encore.`,
  steps: ['Binôme et produit de Cauchy dans le cas commutatif.', 'Crochet de l’exemple.', 'Calcul de e^Ae^B.', 'Calcul de e^{A+B} et comparaison.'],
  commonErrors: [
    { id: 'e-toujours', description: 'Appliquer e^{A+B} = e^Ae^B sans commutation.', concept: 'lie-exp-somme' },
    { id: 'e-ordre', description: 'Oublier que e^Ae^B dépend de l’ordre.', concept: 'lie-exp-somme' },
  ],
  hints: ['Où la commutation intervient-elle dans le développement de (A + B)^m ?', t`Pour l'exemple, remarque $A^2=B^2=0$ et $(A+B)^2=I$.`, 'Compare un seul coefficient : cela suffit à montrer que deux matrices diffèrent.'],
  rubric: rubric({
    hypotheses: 'La commutation est utilisée exactement là où le binôme intervient.',
    methode: 'Preuve dans le cas commutatif, contre-exemple sinon.',
    validite: 'Les trois exponentielles sont calculées exactement.',
    justifications: 'La convergence absolue justifie le produit de Cauchy.',
    conclusion: 'L’implication et l’échec de la réciproque sont conclus.',
  }),
  variant: {
    statement: t`Montrer que $e^{sX}e^{tX}=e^{(s+t)X}$ pour toute matrice $X$, et en déduire que $e^X$ est inversible d'inverse $e^{-X}$.`,
    solution: t`$sX$ et $tX$ commutent, donc $e^{sX}e^{tX}=e^{(s+t)X}$. Avec $s=1$, $t=-1$ : $e^Xe^{-X}=e^0=I$.`,
  },
  verification: FROM_LIE,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'exponentielle.difficile',
  theoremId: 'exponentielle',
  level: 'difficile',
  title: t`$\det e^X=e^{\operatorname{tr}X}$, et une matrice de $SL(2,\mathbb R)$ hors de l'image`,
  statement: t`Montrer que $\det e^X=e^{\operatorname{tr}X}$, donc que $\exp$ envoie $\mathfrak{sl}(n,\mathbb R)$ dans $SL(n,\mathbb R)$. Montrer ensuite que $\operatorname{tr}e^X\ge-2$ pour tout $X\in\mathfrak{sl}(2,\mathbb R)$, et en déduire que $M=\operatorname{diag}(-2,-\tfrac12)\in SL(2,\mathbb R)$ n'est l'exponentielle d'aucun élément de $\mathfrak{sl}(2,\mathbb R)$.`,
  source: lie(111, 'Application exponentielle, proposition 29.2'),
  prerequisites: [],
  concepts: ['lie-exp-globale', 'quantificateurs', 'calcul-exact'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-X', kind: 'hypothese', text: t`$X\in M_n(\mathbb R)$ et $f(t)=\det e^{tX}$.` },
      { id: 'jacobi', kind: 'egalite', text: t`$f'(t)=f(t)\operatorname{tr}\big(e^{-tX}Xe^{tX}\big)=f(t)\operatorname{tr}X$.` },
      { id: 'det', kind: 'egalite', text: t`$f(t)=e^{t\operatorname{tr}X}$, donc $\det e^X=e^{\operatorname{tr}X}$.` },
      { id: 'sl', kind: 'consequence', text: t`$\exp(\mathfrak{sl}(n,\mathbb R))\subset SL(n,\mathbb R)$.` },
      { id: 'h-sl2', kind: 'hypothese', text: t`$X\in\mathfrak{sl}(2,\mathbb R)$ : $\operatorname{tr}X=0$, et l'on pose $\delta=-\det X$.` },
      { id: 'cayley', kind: 'egalite', text: t`$X^2=\delta I$ (Cayley–Hamilton).` },
      { id: 'trace-exp', kind: 'egalite', text: t`$\operatorname{tr}e^X=2\cosh\sqrt\delta$ si $\delta>0$, $2$ si $\delta=0$, $2\cos\sqrt{-\delta}$ si $\delta<0$ ; dans tous les cas $\operatorname{tr}e^X\ge-2$.` },
      {
        id: 'trM',
        kind: 'egalite',
        text: t`$\operatorname{tr}M=-\tfrac52<-2$ et $\det M=1$.`,
        masked: t`Valeur de $\operatorname{tr}M$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\operatorname{tr}M$ pour $M=\operatorname{diag}(-2,-\tfrac12)$`, expected: '-5/2' },
      },
      { id: 'fin', kind: 'conclusion', text: t`$\det e^X=e^{\operatorname{tr}X}$, $\exp(\mathfrak{sl}(2,\mathbb R))\subset SL(2,\mathbb R)$, mais $M\in SL(2,\mathbb R)$ n'est pas une exponentielle : $\exp$ n'est pas surjective.` },
      { id: 'x-surj', kind: 'consequence', distractor: true, text: t`$\exp:\mathfrak{sl}(2,\mathbb R)\to SL(2,\mathbb R)$ est surjective, puisque c'est un difféomorphisme local en $0$.` },
      { id: 'x-det-trace', kind: 'egalite', distractor: true, text: t`$\det e^X=\operatorname{tr}e^X$.` },
    ],
    justifications: [
      { id: 'j-jacobi', label: t`Formule de Jacobi et $\frac{d}{dt}e^{tX}=e^{tX}X$ ; la trace est invariante par conjugaison.`, theorem: 'formule-jacobi' },
      { id: 'j-edo', label: t`$f'=f\operatorname{tr}X$, $f(0)=1$ : unicité de la solution de cette équation linéaire.` },
      { id: 'j-sl', label: t`$\operatorname{tr}X=0$ donne $\det e^X=1$.` },
      { id: 'j-cayley', label: t`$X^2-(\operatorname{tr}X)X+(\det X)I=0$ avec $\operatorname{tr}X=0$.` },
      { id: 'j-trace-exp', label: t`Séparer la série selon le signe de $\delta$ : $e^X=c\,I+s\,X$ avec $c=\cosh\sqrt\delta$, $1$ ou $\cos\sqrt{-\delta}$, et $\operatorname{tr}X=0$.` },
      { id: 'j-trM', label: t`$-2-\tfrac12$ et $(-2)(-\tfrac12)=1$.` },
      { id: 'j-syn', label: t`Si $M=e^X$ avec $X\in\mathfrak{sl}(2)$, alors $\operatorname{tr}M\ge-2$ : contradiction.` },
      { id: 'j-local', label: 'Un difféomorphisme local est surjectif.' },
    ],
    rules: [
      { from: ['h-X'], to: 'jacobi', by: 'j-jacobi' },
      { from: ['jacobi'], to: 'det', by: 'j-edo' },
      { from: ['det'], to: 'sl', by: 'j-sl' },
      { from: ['h-sl2'], to: 'cayley', by: 'j-cayley' },
      { from: ['cayley', 'h-sl2'], to: 'trace-exp', by: 'j-trace-exp' },
      { from: ['h-sl2'], to: 'trM', by: 'j-trM' },
      { from: ['sl', 'trace-exp', 'trM'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-surj',
        verdict: 'incorrect',
        concept: 'lie-exp-globale',
        message: 'Un difféomorphisme local en 0 n’est pas surjectif : l’exponentielle de sl(2, ℝ) manque des éléments de SL(2, ℝ).',
        counterexample: t`$M=\operatorname{diag}(-2,-\tfrac12)$ a une trace $-\tfrac52<-2$.`,
      },
      {
        conclusion: 'x-surj',
        by: 'j-local',
        verdict: 'incorrect',
        concept: 'lie-exp-globale',
        message: 'Cette règle est fausse : un difféomorphisme local n’est surjectif ni injectif en général.',
      },
      {
        conclusion: 'x-det-trace',
        verdict: 'incorrect',
        concept: 'calcul-exact',
        message: 'La formule correcte relie le déterminant de l’exponentielle à l’exponentielle de la trace.',
        counterexample: t`Pour $X=0$ : $\det e^0=1$ et $\operatorname{tr}e^0=2$.`,
      },
    ],
    removable: [],
  },
  solution: t`**Déterminant.** Pour $f(t)=\det e^{tX}$, la formule de Jacobi et $\frac{d}{dt}e^{tX}=e^{tX}X$ donnent $f'(t)=f(t)\operatorname{tr}(e^{-tX}Xe^{tX})=f(t)\operatorname{tr}X$, avec $f(0)=1$ ; donc $f(t)=e^{t\operatorname{tr}X}$ et $\det e^X=e^{\operatorname{tr}X}$. En particulier $\exp(\mathfrak{sl}(n))\subset SL(n)$.

**Trace en dimension 2.** Si $\operatorname{tr}X=0$, Cayley–Hamilton donne $X^2=\delta I$ avec $\delta=-\det X$. Selon le signe de $\delta$, $e^X=\cosh\sqrt\delta\,I+\frac{\sinh\sqrt\delta}{\sqrt\delta}X$, $I+X$, ou $\cos\sqrt{-\delta}\,I+\frac{\sin\sqrt{-\delta}}{\sqrt{-\delta}}X$ ; comme $\operatorname{tr}X=0$, $\operatorname{tr}e^X$ vaut $2\cosh\sqrt\delta\ge 2$, $2$, ou $2\cos\sqrt{-\delta}\ge-2$.

**Conclusion.** $M=\operatorname{diag}(-2,-\frac12)$ est dans $SL(2,\mathbb R)$ mais $\operatorname{tr}M=-\frac52<-2$ : $M$ n'est l'exponentielle d'aucun $X\in\mathfrak{sl}(2,\mathbb R)$.`,
  steps: ['Équation différentielle vérifiée par det e^{tX}.', 'Cayley–Hamilton en dimension 2.', 'Minoration de tr e^X.', 'Contradiction pour M.'],
  commonErrors: [
    { id: 'e-surj', description: 'Croire l’exponentielle surjective parce qu’elle est un difféomorphisme local.', concept: 'lie-exp-globale' },
    { id: 'e-det', description: 'Confondre det e^X et tr e^X.', concept: 'calcul-exact' },
  ],
  hints: [t`Dérive $t\mapsto\det e^{tX}$ avec la formule de Jacobi : quelle équation obtiens-tu ?`, t`En dimension 2 et pour une trace nulle, $X^2$ est un multiple de $I$.`, t`Calcule $\operatorname{tr}e^X$ dans chacun des trois cas de signe de $\delta$, puis compare à $\operatorname{tr}M$.`],
  rubric: rubric({
    hypotheses: 'tr X = 0 et Cayley–Hamilton sont utilisés au bon moment.',
    methode: 'Équation différentielle pour le déterminant, puis invariant de trace.',
    validite: 'Les trois cas de signe sont traités.',
    justifications: 'L’argument d’obstruction (tr ≥ −2) est complet.',
    conclusion: 'La non-surjectivité est conclue sur M.',
  }),
  variant: {
    statement: t`Montrer que $\exp:\mathfrak{so}(n)\to SO(n)$ est bien à valeurs dans $SO(n)$.`,
    solution: t`Si $X^{\mathsf T}=-X$, $(e^X)^{\mathsf T}e^X=e^{X^{\mathsf T}}e^X=e^{-X}e^X=I$ ($-X$ et $X$ commutent), et $\det e^X=e^{\operatorname{tr}X}=e^0=1$.`,
  },
  verification: COMPLEMENT,
};

const mod: TheoremModule = {
  theorem: {
    id: 'exponentielle',
    spaces: [t`$G$ groupe de Lie d'algèbre $\mathfrak g$ ; cas matriciel $G\subset GL(n)$.`],
    hypotheses: [{ id: 'lie', text: t`$G$ est un groupe de Lie, $X\in\mathfrak g=T_eG$.` }],
    statement: t`Pour tout $X\in\mathfrak g$, il existe un unique sous-groupe à un paramètre $\gamma_X$ avec $\gamma_X'(0)=X$ ; on pose $\exp X=\gamma_X(1)$. Alors $\exp(0)=e$, $(d\exp)_0=\mathrm{Id}$, $\exp((s+t)X)=\exp(sX)\exp(tX)$, et $\exp$ est un difféomorphisme d'un voisinage de $0$ sur un voisinage de $e$. Dans le cas matriciel, $\exp A=\sum_k A^k/k!$, $e^{A+B}=e^Ae^B$ si $[A,B]=0$, et $\det e^A=e^{\operatorname{tr}A}$.`,
    conclusions: {
      existence: 'Un sous-groupe à un paramètre par vecteur tangent.',
      unicite: 'Ce sous-groupe est unique.',
      autre: 'L’exponentielle n’est ni injective ni surjective en général.',
    },
    sourceProof: 'idee',
    proofOutline: [
      t`$\gamma_X$ est la courbe intégrale issue de $e$ du champ invariant à gauche $X^L$ ; l'invariance à gauche la rend définie sur $\mathbb R$ et donne la propriété de groupe.`,
      t`Dans le cas matriciel, $t\mapsto e^{tA}$ vérifie $\gamma'=\gamma A$, $\gamma(0)=I$ : c'est $\gamma_A$.`,
      t`$(d\exp)_0=\mathrm{Id}$ et le théorème d'inversion locale donnent le difféomorphisme local.`,
    ],
    warnings: [
      'e^{A+B} = e^Ae^B est garanti par la commutation, faux en général.',
      'L’exponentielle n’est pas injective (e^{2πJ} = I) ni surjective (SL(2, ℝ)).',
      'L’exponentielle de matrice n’est pas l’exponentielle des coefficients.',
    ],
    usefulFor: 'Passer d’un générateur infinitésimal à une transformation finie : rotations, symétries d’équations, flots invariants.',
    verification: FROM_LIE,
  },
  definitions: [
    { id: 'def-sous-groupe-un-parametre', term: 'Sous-groupe à un paramètre', statement: t`Un morphisme lisse $\gamma:(\mathbb R,+)\to G$, $\gamma(t+s)=\gamma(t)\gamma(s)$.`, source: lie(109, 'Définition 28.1') },
    { id: 'def-exponentielle', term: 'Application exponentielle', statement: t`$\exp X=\gamma_X(1)$ ; pour un groupe matriciel, $\exp A=\sum_{k\ge0}A^k/k!$.`, source: lie(111, 'Définition 29.1') },
  ],
  concepts: [],
  counterexamples: [
    {
      id: 'ce-exp-somme',
      theoremId: 'exponentielle',
      title: 'La somme ne devient pas un produit',
      claim: t`Pour toutes matrices $A,B$, $e^{A+B}=e^Ae^B$.`,
      correctStatement: t`Si $[A,B]=0$, alors $e^{A+B}=e^Ae^B$ ; sans commutation, c'est faux en général.`,
      task: t`Pour $A=\begin{pmatrix}0&1\\0&0\end{pmatrix}$ et $B=\begin{pmatrix}0&0\\1&0\end{pmatrix}$, donner le coefficient $(1,1)$ de $e^Ae^B$.`,
      check: { kind: 'rational', prompt: t`Coefficient $(1,1)$ de $e^Ae^B$`, expected: '2' },
      explanation: t`$e^Ae^B=\begin{pmatrix}2&1\\1&1\end{pmatrix}$ alors que le coefficient $(1,1)$ de $e^{A+B}$ vaut $\cosh 1\neq 2$.`,
      concept: 'lie-exp-somme',
      source: lie(112, '§ 29.2'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default mod;
