/**
 * Résultat 26 — Théorème spectral compact auto-adjoint (polycopié, section 6.4, p. PDF 24).
 * Le polycopié n'en donne qu'une idée de preuve : les exercices démontrent ce qui l'est
 * réellement (multiplicité finie, non-accumulation, base propre d'une résolvante).
 */
import { t, rubric, poly, complement, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'spectral-compact.facile',
  theoremId: 'spectral-compact',
  level: 'facile',
  title: 'Diagonaliser une matrice symétrique réelle',
  statement: t`Dans $\mathbb R^3$ euclidien, soit $A=\begin{pmatrix}-3&0&6\\0&3&6\\6&6&0\end{pmatrix}$. Justifier que $A$ se diagonalise dans une base orthonormée, puis déterminer ses valeurs propres, une telle base, et la matrice diagonale obtenue.`,
  source: poly(42, 'Exercice 26, facile ; énoncé de la section 6.4 (p. PDF 24)'),
  prerequisites: [],
  concepts: ['spectral-compact-orthogonalite', 'spectral-compact-valeur-nulle', 'spectral-compact-diagonale', 'hypotheses-theoreme'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'calcul', label: 'Orthogonalité par calcul direct' },
      { id: 'symetrie', label: 'Orthogonalité par la symétrie' },
    ],
    nodes: [
      { id: 'h-H', kind: 'hypothese', text: t`$H=\mathbb R^3$, muni du produit scalaire euclidien, est un espace de Hilbert séparable.` },
      { id: 'd-A', kind: 'definition', text: t`$A=\begin{pmatrix}-3&0&6\\0&3&6\\6&6&0\end{pmatrix}$.` },

      { id: 'sym', kind: 'consequence', text: t`$A=A^{\mathsf T}$, donc $A=A^*$ pour le produit euclidien.` },
      { id: 'compact', kind: 'consequence', text: t`$A$ est compact.` },
      { id: 'thm', kind: 'application-theoreme', text: t`$\mathbb R^3$ admet une base orthonormée formée de vecteurs propres de $A$.` },
      {
        id: 'chi',
        kind: 'egalite',
        text: t`$\det(xI-A)=x^3-81x$.`,
        masked: t`Polynôme caractéristique de $A$ : à calculer.`,
        check: { kind: 'expr-equiv', prompt: t`Polynôme caractéristique $\det(xI-A)$, en la variable $x$`, expected: 'x^3-81*x', vars: ['x'] },
      },
      {
        id: 'vp',
        kind: 'egalite',
        text: t`Les valeurs propres de $A$ sont $9$, $0$ et $-9$.`,
        masked: t`Valeurs propres de $A$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Valeurs propres de $A$, par ordre décroissant`, expected: ['9', '0', '-9'], labels: ['λ₁', 'λ₂', 'λ₃'] },
      },
      {
        id: 'e1',
        kind: 'egalite',
        text: t`$e_1=\frac13(1,2,2)$ est unitaire et $Ae_1=9e_1$.`,
        masked: t`Vecteur propre unitaire $e_1$ de la plus grande valeur propre : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Vecteur propre unitaire de la plus grande valeur propre, de première coordonnée positive`, expected: ['1/3', '2/3', '2/3'], labels: ['x₁', 'x₂', 'x₃'] },
      },
      {
        id: 'e2',
        kind: 'egalite',
        text: t`$e_2=\frac13(2,-2,1)$ est unitaire et $Ae_2=0$ : $\ker A=\operatorname{Vect}\{e_2\}$.`,
        masked: t`Vecteur propre unitaire $e_2$ de la valeur propre médiane : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Vecteur propre unitaire de la valeur propre médiane, de première coordonnée positive`, expected: ['2/3', '-2/3', '1/3'], labels: ['x₁', 'x₂', 'x₃'] },
      },
      {
        id: 'e3',
        kind: 'egalite',
        text: t`$e_3=\frac13(2,1,-2)$ est unitaire et $Ae_3=-9e_3$.`,
        masked: t`Vecteur propre unitaire $e_3$ de la plus petite valeur propre : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Vecteur propre unitaire de la plus petite valeur propre, de première coordonnée positive`, expected: ['2/3', '1/3', '-2/3'], labels: ['x₁', 'x₂', 'x₃'] },
      },
      { id: 'ortho', kind: 'consequence', text: t`$e_1$, $e_2$ et $e_3$ sont deux à deux orthogonaux.` },
      { id: 'diag', kind: 'egalite', text: t`La matrice $P=(e_1\ e_2\ e_3)$ vérifie $P^{\mathsf T}P=I$ et $P^{\mathsf T}AP=\operatorname{diag}(9,0,-9)$.` },

      { id: 'fin', kind: 'conclusion', text: t`$A$ est diagonalisée dans la base orthonormée $(e_1,e_2,e_3)$ ; le vecteur $e_2$, base du noyau, complète les vecteurs propres de valeurs propres non nulles.` },

      { id: 'x-zero', kind: 'consequence', distractor: true, text: t`$0$ n'est pas valeur propre de $A$, puisque $A\neq 0$.` },
      { id: 'x-diag', kind: 'egalite', distractor: true, text: t`Les valeurs propres de $A$ sont ses coefficients diagonaux $-3$, $3$ et $0$.` },
    ],
    justifications: [
      { id: 'j-sym', label: 'Lecture des coefficients symétriques ; adjoint d’une matrice pour le produit euclidien.' },
      { id: 'j-fini', label: 'En dimension finie, tout opérateur linéaire est compact.' },
      { id: 'j-spectral', label: 'Théorème spectral compact auto-adjoint.', theorem: 'spectral-compact' },
      { id: 'j-det', label: 'Développement du déterminant selon la première ligne.' },
      { id: 'j-racines', label: 'Factorisation du polynôme caractéristique.' },
      { id: 'j-noyau', label: t`Résolution de $(A-\lambda I)x=0$, puis normalisation.` },
      { id: 'j-ps', label: 'Calcul des trois produits scalaires.' },
      { id: 'j-ortho-sym', label: t`Pour $A=A^*$ : $\lambda\langle x,y\rangle=\langle Ax,y\rangle=\langle x,Ay\rangle=\mu\langle x,y\rangle$, avec $\lambda\neq\mu$.` },
      { id: 'j-diag', label: t`Colonnes orthonormées, et $AP=P\operatorname{diag}(9,0,-9)$.` },
      { id: 'j-synthese', label: 'Réunion des résultats établis.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-ortho-toute', label: 'Pour toute matrice réelle, deux vecteurs propres associés à des valeurs propres distinctes sont orthogonaux.' },
      { id: 'j-compact-suffit', label: 'Tout opérateur compact se diagonalise dans une base orthonormée.' },
    ],
    rules: [
      { from: ['d-A'], to: 'sym', by: 'j-sym' },
      { from: ['d-A'], to: 'compact', by: 'j-fini' },
      { from: ['h-H', 'sym', 'compact'], to: 'thm', by: 'j-spectral' },
      { from: ['d-A'], to: 'chi', by: 'j-det' },
      { from: ['chi'], to: 'vp', by: 'j-racines' },
      { from: ['d-A', 'vp'], to: 'e1', by: 'j-noyau' },
      { from: ['d-A', 'vp'], to: 'e2', by: 'j-noyau' },
      { from: ['d-A', 'vp'], to: 'e3', by: 'j-noyau' },
      { from: ['e1', 'e2', 'e3'], to: 'ortho', by: 'j-ps', path: 'calcul' },
      { from: ['e1', 'e2', 'e3', 'sym'], to: 'ortho', by: 'j-ortho-sym', path: 'symetrie' },
      { from: ['ortho', 'e1', 'e2', 'e3'], to: 'diag', by: 'j-diag' },
      { from: ['thm', 'diag'], to: 'fin', by: 'j-synthese' },
    ],
    traps: [
      {
        conclusion: 'x-zero',
        verdict: 'incorrect',
        concept: 'spectral-compact-valeur-nulle',
        message: t`Une matrice non nulle peut avoir un noyau non trivial : $0$ est valeur propre dès que $\det A=0$.`,
        counterexample: t`$A(2,-2,1)^{\mathsf T}=(0,0,0)^{\mathsf T}$.`,
      },
      {
        conclusion: 'x-diag',
        verdict: 'incorrect',
        concept: 'spectral-compact-diagonale',
        message: 'Les coefficients diagonaux ne sont les valeurs propres que pour une matrice diagonale ou triangulaire.',
        counterexample: t`$A(1,2,2)^{\mathsf T}=9\,(1,2,2)^{\mathsf T}$, et $9$ n'est pas un coefficient diagonal de $A$.`,
      },
      {
        conclusion: 'ortho',
        by: 'j-ortho-toute',
        verdict: 'incorrect',
        concept: 'spectral-compact-orthogonalite',
        message: t`L'orthogonalité des vecteurs propres repose sur la symétrie : elle est fausse pour une matrice quelconque.`,
        counterexample: t`$\begin{pmatrix}1&1\\0&2\end{pmatrix}$ a pour vecteurs propres $(1,0)$ et $(1,1)$, associés à $1$ et $2$, non orthogonaux.`,
      },
      {
        conclusion: 'thm',
        by: 'j-compact-suffit',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Le théorème exige $K=K^*$ en plus de la compacité.`,
        counterexample: t`$\begin{pmatrix}0&1\\0&0\end{pmatrix}$, compacte, n'a que $\operatorname{Vect}\{(1,0)\}$ comme espace propre.`,
      },
    ],
    removable: [
      {
        hypothesis: 'sym',
        label: 'Ne plus disposer de la symétrie',
        necessary: true,
        explanation: 'Sans symétrie, le théorème spectral ne s’applique plus, et une base orthonormée de vecteurs propres peut ne pas exister.',
        counterexample: t`Pour $\begin{pmatrix}1&1\\0&2\end{pmatrix}$, les seules directions propres sont $(1,0)$ et $(1,1)$, non orthogonales.`,
      },
    ],
  },
  solution: t`**Justification.** $A$ est symétrique, donc $A=A^*$ pour le produit euclidien, et compacte, car la dimension est finie : le théorème fournit une base orthonormée de vecteurs propres.

**Valeurs propres.** En développant selon la première ligne, $\det(xI-A)=(x+3)\big(x(x-3)-36\big)-36(x-3)=x^3-81x=x(x-9)(x+9)$ : les valeurs propres sont $9$, $0$ et $-9$.

**Vecteurs propres.** On résout $(A-\lambda I)x=0$ et on normalise :
$$e_1=\tfrac13(1,2,2)\ (\lambda=9),\qquad e_2=\tfrac13(2,-2,1)\ (\lambda=0),\qquad e_3=\tfrac13(2,1,-2)\ (\lambda=-9).$$
Ils sont deux à deux orthogonaux, ce que donne aussi la symétrie, puisque les valeurs propres sont distinctes.

**Diagonalisation.** $P=(e_1\ e_2\ e_3)$ vérifie $P^{\mathsf T}P=I$ et $P^{\mathsf T}AP=\operatorname{diag}(9,0,-9)$. Le noyau $\operatorname{Vect}\{e_2\}$ complète les vecteurs propres de valeurs propres non nulles, comme dans l'énoncé du théorème.`,
  steps: [
    'Vérifier les hypothèses du théorème : symétrie et compacité.',
    'Calculer le polynôme caractéristique et ses racines.',
    'Calculer et normaliser un vecteur propre par valeur propre.',
    'Vérifier l’orthogonalité.',
    'Écrire la diagonalisation orthogonale.',
  ],
  commonErrors: [
    { id: 'e-diag', description: 'Lire les valeurs propres sur la diagonale d’une matrice non diagonale.', concept: 'spectral-compact-diagonale' },
    { id: 'e-zero', description: t`Écarter la valeur propre $0$ au motif que $A\neq 0$.`, concept: 'spectral-compact-valeur-nulle' },
    { id: 'e-ortho', description: 'Affirmer l’orthogonalité de vecteurs propres sans invoquer la symétrie ni calculer.', concept: 'spectral-compact-orthogonalite' },
  ],
  hints: [
    'Quelles hypothèses du théorème faut-il vérifier avant tout calcul ?',
    t`Calcule $\det(xI-A)$ : la trace et le déterminant de $A$ donnent un contrôle rapide.`,
    t`$\det(xI-A)=x(x-9)(x+9)$. Pour $\lambda=9$, cherche un vecteur de la forme $(1,2,2)$ ; pense à normaliser.`,
  ],
  rubric: rubric({
    hypotheses: 'La symétrie et la compacité sont vérifiées avant d’invoquer le théorème.',
    methode: 'Polynôme caractéristique, espaces propres, normalisation, matrice de passage.',
    validite: 'Les valeurs propres et les vecteurs propres sont exacts.',
    justifications: 'L’orthogonalité est justifiée par la symétrie ou par le calcul.',
    conclusion: t`La décomposition $P^{\mathsf T}AP=\operatorname{diag}(9,0,-9)$ est obtenue.`,
  }),
  variant: {
    statement: t`Diagonaliser dans une base orthonormée de $\mathbb R^2$ la matrice symétrique $B=\begin{pmatrix}-7&24\\24&7\end{pmatrix}$.`,
    solution: t`On a $\det(xI-B)=x^2-625=(x-25)(x+25)$. Pour $25$ : $f_1=\frac15(3,4)$, car $B(3,4)=(75,100)$. Pour $-25$ : $f_2=\frac15(4,-3)$, car $B(4,-3)=(-100,75)$. Ces vecteurs sont orthonormés, et $P=(f_1\ f_2)$ vérifie $P^{\mathsf T}BP=\operatorname{diag}(25,-25)$.`,
    closedChecks: [
      { kind: 'rational-vector', prompt: t`Valeurs propres de $B$, par ordre décroissant`, expected: ['25', '-25'], labels: ['λ₁', 'λ₂'] },
      { kind: 'rational-vector', prompt: t`Vecteur propre unitaire de $25$, de première coordonnée positive`, expected: ['3/5', '4/5'], labels: ['x₁', 'x₂'] },
    ],
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'spectral-compact.intermediaire',
  theoremId: 'spectral-compact',
  level: 'intermediaire',
  title: 'Multiplicité finie des valeurs propres non nulles',
  statement: t`Soit $H$ un espace de Hilbert réel, $K\in\mathcal L(H)$ compact et $\lambda\neq 0$. Démontrer que $E_\lambda=\ker(K-\lambda I)$ est de dimension finie.`,
  source: poly(42, 'Exercice 26, intermédiaire ; idée de preuve de la section 6.4 (p. PDF 24)'),
  prerequisites: [],
  concepts: ['spectral-compact-valeur-nulle', 'bornee-non-convergente', 'compact-continue', 'utilisation-prematuree', 'calcul-exact'],
  proof: {
    purpose: 'demonstration',
    goal: 'fini',
    paths: [
      { id: 'orthonormale', label: 'Suite orthonormée et compacité' },
      { id: 'riesz', label: 'Boule unité compacte et lemme de Riesz' },
    ],
    nodes: [
      { id: 'h-H', kind: 'hypothese', text: t`$H$ est un espace de Hilbert réel.` },
      { id: 'h-K', kind: 'hypothese', text: t`$K\in\mathcal L(H)$ est compact.` },
      { id: 'h-lambda', kind: 'hypothese', text: t`$\lambda\in\mathbb R$ est non nul.` },
      { id: 'd-E', kind: 'definition', text: t`$E_\lambda=\ker(K-\lambda I)$.` },
      { id: 'abs', kind: 'definition', local: true, text: t`Supposons $\dim E_\lambda=+\infty$.` },

      { id: 'ortho', kind: 'consequence', text: t`Il existe une suite orthonormée $(e_n)_{n\ge1}$ d'éléments de $E_\lambda$.` },
      {
        id: 'ecart',
        kind: 'egalite',
        text: t`Pour $n\neq m$ : $Ke_n-Ke_m=\lambda(e_n-e_m)$, donc $\|Ke_n-Ke_m\|^2=2\lambda^2$.`,
        masked: t`Valeur de $\|Ke_n-Ke_m\|^2$ pour $n\neq m$ : à calculer.`,
        check: { kind: 'expr-equiv', prompt: t`$\|Ke_n-Ke_m\|^2$ en fonction de $\lambda$, notée l`, expected: '2*l^2', vars: ['l'] },
      },
      { id: 'ext', kind: 'consequence', text: t`Une sous-suite de $(Ke_n)$ converge dans $H$.` },
      { id: 'contra', kind: 'contradiction', text: t`Cette sous-suite serait de Cauchy, alors que $\|Ke_n-Ke_m\|=\sqrt2\,|\lambda|>0$ pour $n\neq m$.` },

      { id: 'ferme', kind: 'consequence', text: t`$E_\lambda$ est fermé dans $H$.` },
      { id: 'boule', kind: 'egalite', text: t`La boule unité fermée $B$ de $E_\lambda$ vérifie $B=\lambda^{-1}K(B)$.` },
      { id: 'boule-cpt', kind: 'consequence', text: t`$B$ est compacte.` },

      { id: 'fini', kind: 'conclusion', text: t`$\dim E_\lambda<+\infty$ : toute valeur propre non nulle d'un opérateur compact est de multiplicité finie.` },

      { id: 'x-noyau', kind: 'consequence', distractor: true, text: t`$\ker K$ est, lui aussi, de dimension finie.` },
      { id: 'x-suite', kind: 'consequence', distractor: true, after: ['ortho'], text: t`Toute suite bornée de $H$ admet une sous-suite convergente dans $H$.` },
    ],
    justifications: [
      { id: 'j-gram', label: 'Procédé de Gram–Schmidt dans un sous-espace de dimension infinie.' },
      { id: 'j-pyth', label: t`$Ke_n=\lambda e_n$, puis théorème de Pythagore : $\|e_n-e_m\|^2=2$.` },
      { id: 'j-compact', label: t`Compacité de $K$, appliquée à la suite bornée $(e_n)$.` },
      { id: 'j-cauchy', label: t`Une suite convergente est de Cauchy, et $\lambda\neq 0$.` },
      { id: 'j-absurde', label: 'Raisonnement par l’absurde.' },
      { id: 'j-noyau-ferme', label: t`Noyau de l'opérateur continu $K-\lambda I$.` },
      { id: 'j-boule', label: t`Sur $E_\lambda$, $\lambda^{-1}K$ coïncide avec l'identité.` },
      { id: 'j-cpt', label: t`$B$ est fermée dans $H$ et contenue dans $\lambda^{-1}K(\text{boule unité de }H)$, relativement compacte.` },
      { id: 'j-riesz', label: 'Lemme de Riesz : un espace normé dont la boule unité fermée est compacte est de dimension finie.', theorem: 'lemme-riesz-compacite' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-continue', label: t`$K$ est continu et $(e_n)$ est bornée.` },
      { id: 'j-norme-somme', label: t`$\|Ke_n-Ke_m\|=\|Ke_n\|+\|Ke_m\|$, car $e_n\perp e_m$.` },
      { id: 'j-fredholm', label: 'Alternative de Fredholm.', theorem: 'fredholm' },
    ],
    rules: [
      { from: ['abs', 'h-H'], to: 'ortho', by: 'j-gram', path: 'orthonormale' },
      { from: ['ortho', 'd-E'], to: 'ecart', by: 'j-pyth', path: 'orthonormale' },
      { from: ['ortho', 'h-K'], to: 'ext', by: 'j-compact', path: 'orthonormale' },
      { from: ['ecart', 'ext', 'h-lambda'], to: 'contra', by: 'j-cauchy', path: 'orthonormale' },
      { from: ['contra'], to: 'fini', by: 'j-absurde', path: 'orthonormale' },

      { from: ['h-K', 'd-E'], to: 'ferme', by: 'j-noyau-ferme', path: 'riesz' },
      { from: ['d-E', 'h-lambda'], to: 'boule', by: 'j-boule', path: 'riesz' },
      { from: ['boule', 'h-K', 'ferme'], to: 'boule-cpt', by: 'j-cpt', path: 'riesz' },
      { from: ['boule-cpt'], to: 'fini', by: 'j-riesz', path: 'riesz' },
    ],
    traps: [
      {
        conclusion: 'x-noyau',
        verdict: 'incorrect',
        concept: 'spectral-compact-valeur-nulle',
        message: t`L'argument utilise $\lambda\neq 0$ de façon essentielle : pour $\lambda=0$, $\|Ke_n-Ke_m\|$ est nul.`,
        counterexample: t`Sur $\ell^2$, $Kx=x_1e_1$ est compact, de rang $1$, et $\ker K=\{x:x_1=0\}$ est de dimension infinie.`,
      },
      {
        conclusion: 'x-suite',
        verdict: 'incorrect',
        concept: 'bornee-non-convergente',
        message: 'En dimension infinie, la bornitude ne donne pas d’extraction convergente : c’est la compacité de l’opérateur qui la fournit.',
        counterexample: t`La suite orthonormée $(e_n)$ elle-même : $\|e_n-e_m\|=\sqrt2$ pour $n\neq m$.`,
      },
      {
        conclusion: 'ext',
        by: 'j-continue',
        verdict: 'incorrect',
        concept: 'compact-continue',
        message: 'Un opérateur continu envoie les bornés sur des bornés, non sur des relativement compacts.',
        counterexample: t`$K=I$ sur $\ell^2$ est continu, et $(Ke_n)=(e_n)$ n'a aucune sous-suite convergente.`,
      },
      {
        conclusion: 'ecart',
        by: 'j-norme-somme',
        verdict: 'incorrect',
        concept: 'calcul-exact',
        message: 'Pour des vecteurs orthogonaux, ce sont les carrés des normes qui s’ajoutent (Pythagore), non les normes.',
        counterexample: t`$\|e_1-e_2\|=\sqrt2$, alors que $\|e_1\|+\|e_2\|=2$.`,
      },
      {
        conclusion: 'fini',
        by: 'j-fredholm',
        verdict: 'a-justifier',
        concept: 'utilisation-prematuree',
        message: t`L'alternative contient ce résultat, mais sa finitude du noyau repose sur l'argument de compacité demandé ici : établis-le directement.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-lambda',
        label: t`Autoriser $\lambda=0$`,
        necessary: true,
        explanation: t`Pour $\lambda=0$, les deux arguments s'effondrent : l'écart $\sqrt2|\lambda|$ est nul, et $\lambda^{-1}$ n'existe pas.`,
        counterexample: t`$K=0$ sur un Hilbert de dimension infinie : $\ker K=H$.`,
      },
      {
        hypothesis: 'h-K',
        label: 'Ne plus supposer la compacité',
        necessary: true,
        explanation: 'Aucune extraction n’est plus disponible.',
        counterexample: t`$K=I$ sur $\ell^2$ et $\lambda=1$ : $E_1=\ell^2$.`,
      },
    ],
  },
  solution: t`Soit $E_\lambda=\ker(K-\lambda I)$, avec $\lambda\neq 0$.

**Par une suite orthonormée.** Si $\dim E_\lambda=+\infty$, le procédé de Gram–Schmidt fournit une suite orthonormée $(e_n)$ de $E_\lambda$. Elle est bornée, donc, $K$ étant compact, une sous-suite de $(Ke_n)$ converge. Mais $Ke_n=\lambda e_n$, d'où, pour $n\neq m$, $\|Ke_n-Ke_m\|^2=\lambda^2\|e_n-e_m\|^2=2\lambda^2$ : aucune sous-suite n'est de Cauchy, puisque $\lambda\neq 0$. Contradiction.

**Par le lemme de Riesz.** $E_\lambda$ est fermé, comme noyau d'un opérateur continu. Sur $E_\lambda$, $\lambda^{-1}K$ est l'identité : la boule unité fermée $B$ de $E_\lambda$ vérifie $B=\lambda^{-1}K(B)$, contenue dans un relativement compact, et fermée. Elle est donc compacte, et $E_\lambda$ est de dimension finie.

**Point de vigilance.** L'hypothèse $\lambda\neq 0$ est indispensable : le noyau d'un compact peut être de dimension infinie.`,
  steps: [
    'Supposer la dimension infinie et construire une suite orthonormée dans l’espace propre.',
    'Calculer les écarts entre les images.',
    'Invoquer la compacité pour extraire une sous-suite convergente.',
    t`Conclure à une contradiction grâce à $\lambda\neq 0$.`,
  ],
  commonErrors: [
    { id: 'e-noyau', description: t`Étendre la conclusion à $\lambda=0$.`, concept: 'spectral-compact-valeur-nulle' },
    { id: 'e-continue', description: 'Extraire une sous-suite convergente en n’utilisant que la continuité.', concept: 'compact-continue' },
    { id: 'e-pythagore', description: 'Additionner les normes de vecteurs orthogonaux au lieu de leurs carrés.', concept: 'calcul-exact' },
  ],
  hints: [
    t`Que donnerait une infinité de vecteurs orthonormés dans $E_\lambda$, sachant que $K$ agit sur eux comme $\lambda I$ ?`,
    t`Raisonne par l'absurde : prends $(e_n)$ orthonormée dans $E_\lambda$ et compare la compacité de $K$ avec les écarts $\|Ke_n-Ke_m\|$.`,
    t`$\|Ke_n-Ke_m\|=|\lambda|\,\|e_n-e_m\|=\sqrt2\,|\lambda|$ : où sert l'hypothèse $\lambda\neq 0$ ?`,
  ],
  rubric: rubric({
    hypotheses: t`La compacité de $K$ et $\lambda\neq 0$ sont utilisées explicitement.`,
    methode: 'Raisonnement par l’absurde sur une suite orthonormée, ou lemme de Riesz.',
    validite: 'Le calcul des écarts est exact.',
    justifications: 'L’extraction provient de la compacité, non de la seule continuité.',
    conclusion: t`La finitude de $\dim E_\lambda$ est établie.`,
  }),
  variant: {
    statement: t`Soit $K\in\mathcal L(H)$ compact et auto-adjoint, et $\varepsilon>0$. Démontrer que $K$ n'a qu'un nombre fini de valeurs propres distinctes $\lambda$ telles que $|\lambda|\ge\varepsilon$, et en déduire que les valeurs propres non nulles ne s'accumulent qu'en $0$.`,
    solution: t`Sinon, il existe des valeurs propres $\lambda_n$ deux à deux distinctes avec $|\lambda_n|\ge\varepsilon$, et des vecteurs propres unitaires $e_n$. Comme $K=K^*$, $\lambda_n\langle e_n,e_m\rangle=\langle Ke_n,e_m\rangle=\langle e_n,Ke_m\rangle=\lambda_m\langle e_n,e_m\rangle$, donc $\langle e_n,e_m\rangle=0$ pour $n\neq m$. Alors $\|Ke_n-Ke_m\|^2=\lambda_n^2+\lambda_m^2\ge 2\varepsilon^2$ : aucune sous-suite de $(Ke_n)$ ne converge, ce qui contredit la compacité. Une valeur d'accumulation $\lambda_*\neq 0$ fournirait une infinité de valeurs propres distinctes de module au moins $|\lambda_*|/2$.`,
    proof: {
      purpose: 'demonstration',
      goal: 'fin',
      nodes: [
        { id: 'h-H', kind: 'hypothese', text: t`$H$ est un espace de Hilbert réel.` },
        { id: 'h-K', kind: 'hypothese', text: t`$K\in\mathcal L(H)$ est compact et $K=K^*$.` },
        { id: 'h-eps', kind: 'hypothese', text: t`$\varepsilon>0$ est fixé.` },
        { id: 'abs', kind: 'definition', local: true, text: t`Supposons qu'il existe des valeurs propres $\lambda_n$ de $K$, deux à deux distinctes, avec $|\lambda_n|\ge\varepsilon$ pour tout $n\ge 1$.` },

        { id: 'vect', kind: 'consequence', text: t`Pour chaque $n$, il existe $e_n$ unitaire tel que $Ke_n=\lambda_ne_n$.` },
        { id: 'ortho', kind: 'consequence', text: t`La suite $(e_n)$ est orthonormée.` },
        { id: 'ecart', kind: 'inegalite', text: t`Pour $n\neq m$ : $\|Ke_n-Ke_m\|^2=\lambda_n^2+\lambda_m^2\ge 2\varepsilon^2$.` },
        { id: 'ext', kind: 'consequence', text: t`Une sous-suite de $(Ke_n)$ converge dans $H$.` },
        { id: 'contra', kind: 'contradiction', text: t`Cette sous-suite serait de Cauchy, ce que l'écart $\sqrt2\,\varepsilon$ interdit.` },

        { id: 'fin', kind: 'conclusion', text: t`Seul un nombre fini de valeurs propres distinctes vérifient $|\lambda|\ge\varepsilon$ : les valeurs propres non nulles ne s'accumulent qu'en $0$.` },

        { id: 'x-sans-sym', kind: 'consequence', distractor: true, text: t`Pour $K$ seulement compact, des vecteurs propres associés à des valeurs propres distinctes sont orthogonaux.` },
        { id: 'x-zero', kind: 'consequence', distractor: true, text: t`Les valeurs propres ne peuvent pas non plus s'accumuler en $0$.` },
      ],
      justifications: [
        { id: 'j-choix', label: 'Choix d’un vecteur propre normalisé pour chaque valeur propre.' },
        { id: 'j-sym', label: t`$\lambda_n\langle e_n,e_m\rangle=\langle Ke_n,e_m\rangle=\langle e_n,Ke_m\rangle=\lambda_m\langle e_n,e_m\rangle$, avec $\lambda_n\neq\lambda_m$.` },
        { id: 'j-pyth', label: t`Théorème de Pythagore pour $\lambda_ne_n-\lambda_me_m$.` },
        { id: 'j-compact', label: t`Compacité de $K$, appliquée à la suite bornée $(e_n)$.` },
        { id: 'j-cauchy', label: 'Une suite convergente est de Cauchy.' },
        { id: 'j-absurde', label: 'Raisonnement par l’absurde ; une valeur d’accumulation non nulle donnerait une telle suite.' },
        { id: 'j-continue', label: t`$K$ est continu et $(e_n)$ est bornée.` },
      ],
      rules: [
        { from: ['abs', 'h-H'], to: 'vect', by: 'j-choix' },
        { from: ['vect', 'abs', 'h-K'], to: 'ortho', by: 'j-sym' },
        { from: ['vect', 'ortho', 'abs'], to: 'ecart', by: 'j-pyth' },
        { from: ['vect', 'h-K'], to: 'ext', by: 'j-compact' },
        { from: ['ecart', 'ext', 'h-eps'], to: 'contra', by: 'j-cauchy' },
        { from: ['contra'], to: 'fin', by: 'j-absurde' },
      ],
      traps: [
        {
          conclusion: 'x-sans-sym',
          verdict: 'incorrect',
          concept: 'spectral-compact-orthogonalite',
          message: t`L'orthogonalité utilise $K=K^*$.`,
          counterexample: t`$\begin{pmatrix}1&1\\0&2\end{pmatrix}$, compacte, a pour vecteurs propres $(1,0)$ et $(1,1)$, non orthogonaux.`,
        },
        {
          conclusion: 'x-zero',
          verdict: 'incorrect',
          concept: 'spectral-compact-valeur-nulle',
          message: t`L'argument exige $|\lambda_n|\ge\varepsilon>0$ : rien n'empêche une accumulation en $0$.`,
          counterexample: t`Sur $\ell^2$, $Kx=(x_n/n)_{n\ge1}$ est compact, auto-adjoint, de valeurs propres $1/n\to 0$.`,
        },
        {
          conclusion: 'ext',
          by: 'j-continue',
          verdict: 'incorrect',
          concept: 'compact-continue',
          message: 'La continuité ne fournit pas d’extraction convergente.',
          counterexample: t`$K=I$ sur $\ell^2$ et la suite $(e_n)$.`,
        },
      ],
      removable: [
        {
          hypothesis: 'h-K',
          label: 'Ne plus supposer la compacité ni l’auto-adjonction',
          necessary: true,
          explanation: 'L’orthogonalité et l’extraction disparaissent.',
          counterexample: t`Sur $\ell^2$, $De_n=(1+1/n)e_n$ est borné et auto-adjoint, non compact, et ses valeurs propres s'accumulent en $1$.`,
        },
      ],
    },
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'spectral-compact.difficile',
  theoremId: 'spectral-compact',
  level: 'difficile',
  title: 'Base spectrale de la résolvante de Dirichlet',
  statement: t`Soit $\Omega\subset\mathbb R^d$ un ouvert non vide, borné, lipschitzien, $H=L^2(\Omega)$ réel, $V=H^1_0(\Omega)$ et $a(u,v)=\int_\Omega\nabla u\cdot\nabla v+\int_\Omega uv$. Pour $f\in H$, soit $Tf\in V$ tel que $a(Tf,v)=\langle f,v\rangle_H$ pour tout $v\in V$ : c'est la résolvante $(I+A)^{-1}$ de la réalisation de Dirichlet $A=-\Delta_D$, de domaine $D(A)=\{u\in V:\Delta u\in L^2(\Omega)\}$. Construire une base hilbertienne de $H$ formée de fonctions propres de $T$, et préciser leurs propriétés : appartenance à $V$, équation satisfaite, signe et comportement des valeurs propres, orthogonalité des gradients.`,
  source: poly(43, 'Exercice 26, difficile ; résolvante compacte du Laplacien de Dirichlet, section 6.3 (p. PDF 24)'),
  prerequisites: ['lax-milgram', 'rellich', 'poincare'],
  concepts: ['spectral-compact-resolvante', 'spectral-compact-normes', 'compact-continue', 'hypotheses-theoreme', 'domaine-borne'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-omega', kind: 'hypothese', text: t`$\Omega\subset\mathbb R^d$ est un ouvert non vide, borné, lipschitzien.` },
      { id: 'h-H', kind: 'hypothese', text: t`$H=L^2(\Omega)$, réel, est un espace de Hilbert séparable de dimension infinie, et $V=H^1_0(\Omega)$ y est dense.` },
      { id: 'd-T', kind: 'definition', text: t`$a$ est un produit scalaire symétrique sur $V$, qui y induit la norme de $H^1$ ; pour $f\in H$, $Tf\in V$ vérifie $a(Tf,v)=\langle f,v\rangle_H$ pour tout $v\in V$.` },

      { id: 'T-borne', kind: 'application-theoreme', text: t`$T:H\to V$ est bien défini, linéaire, et $\|Tf\|_{H^1}\le\|f\|_H$.` },
      { id: 'T-compact', kind: 'application-theoreme', text: t`$T$ est compact de $H$ dans $H$.` },
      { id: 'T-sym', kind: 'egalite', text: t`$T$ est auto-adjoint sur $H$.` },
      { id: 'T-pos', kind: 'inegalite', text: t`$\langle Tf,f\rangle_H=\|Tf\|^2_{H^1}\ge 0$ pour tout $f\in H$, et $T$ est injectif.` },
      { id: 'spec', kind: 'application-theoreme', text: t`Il existe une base hilbertienne $(\varphi_k)_{k\ge1}$ de $H$ et des réels $\mu_k\neq 0$ tels que $T\varphi_k=\mu_k\varphi_k$ ; chaque valeur propre est de multiplicité finie, et les $\mu_k$ ne s'accumulent qu'en $0$.` },
      { id: 'mu', kind: 'consequence', text: t`$\mu_k>0$ pour tout $k$, et $\mu_k\to 0$.` },
      { id: 'faible', kind: 'egalite', text: t`$\varphi_k=\mu_k^{-1}T\varphi_k\in V$ et, avec $\lambda_k=\mu_k^{-1}-1$ : $\int_\Omega\nabla\varphi_k\cdot\nabla v=\lambda_k\int_\Omega\varphi_kv$ pour tout $v\in V$ ; en particulier, $-\Delta\varphi_k=\lambda_k\varphi_k$ dans $\mathcal D'(\Omega)$.` },
      { id: 'lambda', kind: 'inegalite', text: t`$\lambda_k\ge C_P^{-2}>0$ pour tout $k$, et $\lambda_k\to+\infty$.` },
      { id: 'grad', kind: 'egalite', text: t`$\int_\Omega\nabla\varphi_j\cdot\nabla\varphi_k=\lambda_j\delta_{jk}$, et $\big(\varphi_k/\sqrt{1+\lambda_k}\big)_{k\ge1}$ est une base hilbertienne de $V$ pour $a$.` },

      { id: 'fin', kind: 'conclusion', text: t`$(\varphi_k)$ est une base hilbertienne de $H$, formée de fonctions de $V$ telles que $-\Delta\varphi_k=\lambda_k\varphi_k$ au sens faible, avec $0<\lambda_k\to+\infty$ et des gradients orthogonaux.` },

      { id: 'x-A-compact', kind: 'consequence', distractor: true, text: t`L'opérateur $A=-\Delta_D$ est compact sur $H$.` },
      { id: 'x-lambda-zero', kind: 'consequence', distractor: true, after: ['mu'], text: t`$\lambda_k\to 0$ quand $k\to+\infty$.` },
    ],
    justifications: [
      { id: 'j-lm', label: t`Lax–Milgram sur $V$ ; on teste avec $v=Tf$, puis Cauchy–Schwarz.`, theorem: 'lax-milgram' },
      { id: 'j-rellich', label: t`Injection compacte $V\hookrightarrow H$, composée avec $T:H\to V$ borné.`, theorem: 'rellich' },
      { id: 'j-sym', label: t`$\langle f,Tg\rangle_H=a(Tf,Tg)=a(Tg,Tf)=\langle g,Tf\rangle_H$, par symétrie de $a$.` },
      { id: 'j-pos', label: t`On teste avec $v=Tf$ ; si $Tf=0$, alors $f$ est orthogonale à un sous-espace dense.` },
      { id: 'j-spectral', label: t`Théorème spectral compact auto-adjoint ; $\ker T=\{0\}$, et la base est infinie car $\dim H=+\infty$.`, theorem: 'spectral-compact' },
      { id: 'j-mu', label: t`$\mu_k=\langle T\varphi_k,\varphi_k\rangle_H=\|T\varphi_k\|^2_{H^1}>0$ ; multiplicités finies et seule accumulation en $0$.` },
      { id: 'j-faible', label: t`$a(\varphi_k,v)=\mu_k^{-1}a(T\varphi_k,v)=\mu_k^{-1}\langle\varphi_k,v\rangle_H$ ; on retranche $\langle\varphi_k,v\rangle_H$, puis on prend $v\in C^\infty_c(\Omega)$.` },
      { id: 'j-lambda', label: t`Inégalité de Poincaré avec $v=\varphi_k$ : $1\le C_P^2\|\nabla\varphi_k\|^2_{L^2}=C_P^2\lambda_k$ ; puis $\lambda_k=\mu_k^{-1}-1$ avec $\mu_k\to 0^+$.`, theorem: 'poincare' },
      { id: 'j-grad', label: t`On prend $v=\varphi_k$ dans la relation de $\varphi_j$ ; si $a(\varphi_k,v)=0$ pour tout $k$, alors $\langle\varphi_k,v\rangle_H=0$ pour tout $k$, donc $v=0$.` },
      { id: 'j-synthese', label: 'Réunion des résultats établis.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-inj-continue', label: t`L'injection $V\hookrightarrow H$ est continue, donc $T:H\to H$ est compact.` },
      { id: 'j-spectral-A', label: t`Théorème spectral compact appliqué directement à $A=-\Delta_D$.`, theorem: 'spectral-compact' },
      { id: 'j-ortho-V', label: t`$(\varphi_k)$ étant orthonormée dans $H$, elle l'est aussi pour $\int_\Omega\nabla u\cdot\nabla v$.` },
    ],
    rules: [
      { from: ['d-T'], to: 'T-borne', by: 'j-lm' },
      { from: ['T-borne', 'h-omega'], to: 'T-compact', by: 'j-rellich' },
      { from: ['d-T'], to: 'T-sym', by: 'j-sym' },
      { from: ['d-T', 'h-H'], to: 'T-pos', by: 'j-pos' },
      { from: ['T-compact', 'T-sym', 'T-pos', 'h-H'], to: 'spec', by: 'j-spectral' },
      { from: ['spec', 'T-pos'], to: 'mu', by: 'j-mu' },
      { from: ['spec', 'mu', 'd-T'], to: 'faible', by: 'j-faible' },
      { from: ['faible', 'mu', 'h-omega'], to: 'lambda', by: 'j-lambda' },
      { from: ['faible', 'spec'], to: 'grad', by: 'j-grad' },
      { from: ['spec', 'faible', 'lambda', 'grad'], to: 'fin', by: 'j-synthese' },
    ],
    traps: [
      {
        conclusion: 'x-A-compact',
        verdict: 'incorrect',
        concept: 'spectral-compact-resolvante',
        message: t`$A$ n'est pas borné : on applique le théorème à sa résolvante compacte, non à $A$.`,
        counterexample: t`Sur $]0,1[$, $\varphi_k=\sqrt2\sin(k\pi x)$ est unitaire et $A\varphi_k=k^2\pi^2\varphi_k$, de norme non bornée.`,
      },
      {
        conclusion: 'x-lambda-zero',
        verdict: 'incorrect',
        concept: 'spectral-compact-resolvante',
        message: t`Ce sont les valeurs propres $\mu_k$ de $T$ qui tendent vers $0$ ; celles de $A$ sont $\lambda_k=\mu_k^{-1}-1\to+\infty$.`,
        counterexample: t`Sur $]0,1[$ : $\lambda_k=k^2\pi^2$ et $\mu_k=1/(1+k^2\pi^2)$.`,
      },
      {
        conclusion: 'T-compact',
        by: 'j-inj-continue',
        verdict: 'incorrect',
        concept: 'compact-continue',
        message: 'La continuité de l’injection ne donne que des bornés : c’est sa compacité (Rellich) qui sert.',
        counterexample: t`Sur $\mathbb R^d$, l'injection $H^1\hookrightarrow L^2$ est continue et non compacte : les translatés $\psi(\cdot-ne_1)$ d'une fonction test non nulle sont bornés dans $H^1$, sans sous-suite convergente dans $L^2$.`,
      },
      {
        conclusion: 'spec',
        by: 'j-spectral-A',
        verdict: 'incorrect',
        concept: 'spectral-compact-resolvante',
        message: t`Le théorème porte sur un opérateur compact ; $A=-\Delta_D$ n'est même pas borné.`,
      },
      {
        conclusion: 'grad',
        by: 'j-ortho-V',
        verdict: 'incorrect',
        concept: 'spectral-compact-normes',
        message: t`L'orthogonalité se transmet aux gradients, pas la normalisation : $\int_\Omega|\nabla\varphi_k|^2=\lambda_k$.`,
        counterexample: t`Sur $]0,1[$, $\varphi_1=\sqrt2\sin(\pi x)$ vérifie $\int_0^1|\varphi_1'|^2=\pi^2\neq 1$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-omega',
        label: 'Ne plus supposer le domaine borné',
        necessary: true,
        explanation: 'Rellich et Poincaré tombent : la résolvante n’est plus compacte.',
        counterexample: t`Sur $\mathbb R^d$, $(I-\Delta)^{-1}$ correspond par transformée de Fourier à la multiplication par $1/(1+|\xi|^2)$ : elle n'a aucune valeur propre, donc aucune base de fonctions propres.`,
      },
      {
        hypothesis: 'T-sym',
        label: t`Ne plus disposer de l'auto-adjonction de $T$`,
        necessary: true,
        explanation: 'Le théorème spectral ne s’applique plus, et les fonctions propres peuvent ne pas être orthogonales.',
        counterexample: t`Pour la forme non symétrique $\int_0^1u'v'+\int_0^1u'v$ sur $H^1_0(]0,1[)$, les fonctions propres $e^{x/2}\sin(k\pi x)$ ne sont pas orthogonales dans $L^2(]0,1[)$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'expr-equiv', prompt: t`$\lambda_k$ en fonction de $\mu_k$, noté m`, expected: '1/m-1', vars: ['m'] }],
  solution: t`**L'opérateur $T$.** La forme $a$ est le produit scalaire de $H^1$ sur $V$, complet ; $v\mapsto\langle f,v\rangle_H$ y est continue. Lax–Milgram définit $T$, linéaire, et le test $v=Tf$ donne $\|Tf\|^2_{H^1}=\langle f,Tf\rangle_H\le\|f\|_H\|Tf\|_{H^1}$, d'où $\|Tf\|_{H^1}\le\|f\|_H$.

**Compacité.** $T$ envoie la boule unité de $H$ dans une partie bornée de $V$, relativement compacte dans $H$ par Rellich : $T$ est compact.

**Auto-adjonction, positivité, injectivité.** $\langle f,Tg\rangle_H=a(Tf,Tg)=a(Tg,Tf)=\langle g,Tf\rangle_H$. Puis $\langle Tf,f\rangle_H=\|Tf\|^2_{H^1}\ge 0$ ; si $Tf=0$, $f$ est orthogonale à $V$, dense, donc $f=0$.

**Base spectrale.** Le théorème donne une base hilbertienne $(\varphi_k)$ de vecteurs propres, $T\varphi_k=\mu_k\varphi_k$, avec $\mu_k\neq 0$ car $\ker T=\{0\}$, et la base est infinie. De plus $\mu_k=\|T\varphi_k\|^2_{H^1}>0$, et, les multiplicités étant finies et l'accumulation n'ayant lieu qu'en $0$, $\mu_k\to 0$.

**Fonctions propres.** $\varphi_k=\mu_k^{-1}T\varphi_k\in V$ et $a(\varphi_k,v)=\mu_k^{-1}\langle\varphi_k,v\rangle_H$ ; avec $\lambda_k=\mu_k^{-1}-1$, on obtient $\int_\Omega\nabla\varphi_k\cdot\nabla v=\lambda_k\int_\Omega\varphi_kv$ pour tout $v\in V$, donc $-\Delta\varphi_k=\lambda_k\varphi_k$ dans $\mathcal D'(\Omega)$. Avec $v=\varphi_k$ et Poincaré : $1=\|\varphi_k\|^2_H\le C_P^2\lambda_k$. Et $\lambda_k\to+\infty$ puisque $\mu_k\to 0^+$.

**Gradients.** $\int_\Omega\nabla\varphi_j\cdot\nabla\varphi_k=\lambda_j\delta_{jk}$ : la famille $\big(\varphi_k/\sqrt{1+\lambda_k}\big)$ est orthonormée pour $a$, et totale dans $V$, car $a(\varphi_k,v)=0$ pour tout $k$ impose $\langle\varphi_k,v\rangle_H=0$ pour tout $k$. C'est la base utilisée dans la méthode de Galerkin.`,
  steps: [
    t`Construire $T$ par Lax–Milgram et l'estimer.`,
    t`Établir la compacité de $T$ par Rellich.`,
    t`Établir l'auto-adjonction, la positivité et l'injectivité de $T$.`,
    'Appliquer le théorème spectral compact et analyser les valeurs propres.',
    t`Traduire en propriétés des fonctions propres de $A$ : équation, signe, limite, gradients.`,
  ],
  commonErrors: [
    { id: 'e-A', description: t`Appliquer le théorème spectral compact à $A=-\Delta_D$ lui-même.`, concept: 'spectral-compact-resolvante' },
    { id: 'e-limite', description: t`Confondre $\mu_k\to 0$ et $\lambda_k\to 0$.`, concept: 'spectral-compact-resolvante' },
    { id: 'e-continue', description: 'Déduire la compacité de la seule continuité de l’injection.', concept: 'compact-continue' },
    { id: 'e-norme', description: t`Croire la base orthonormée pour le produit scalaire des gradients.`, concept: 'spectral-compact-normes' },
  ],
  hints: [
    t`Le théorème s'applique à un opérateur compact auto-adjoint. Lequel, ici, puisque $A$ n'est pas borné ?`,
    t`Vérifie dans l'ordre : $T$ borné de $H$ dans $V$, compact par Rellich, auto-adjoint par symétrie de $a$, positif et injectif. Puis traduis $T\varphi_k=\mu_k\varphi_k$ en une relation sur $a(\varphi_k,v)$.`,
    t`De $a(\varphi_k,v)=\mu_k^{-1}\langle\varphi_k,v\rangle_H$ on tire $\int\nabla\varphi_k\cdot\nabla v=\lambda_k\int\varphi_kv$ avec $\lambda_k=\mu_k^{-1}-1$ ; Poincaré donne $\lambda_k>0$.`,
  ],
  rubric: rubric({
    hypotheses: t`La bornitude de $\Omega$ est utilisée pour Rellich et Poincaré, et la symétrie de $a$ pour l'auto-adjonction.`,
    methode: t`Le théorème est appliqué à la résolvante $T$, puis traduit en propriétés de $A$.`,
    validite: t`Les valeurs propres $\mu_k$ et $\lambda_k$ ne sont pas confondues.`,
    justifications: 'La compacité vient de Rellich, non de la seule continuité.',
    conclusion: 'La base spectrale et les propriétés des fonctions propres sont établies.',
  }),
  variant: {
    statement: t`Sur $\Omega=]0,1[$, montrer que les fonctions propres de $T$ sont, à normalisation près, les $\varphi_k(x)=\sqrt2\sin(k\pi x)$, $k\ge 1$, et calculer les valeurs propres $\lambda_k$ et $\mu_k$. En déduire que $(\varphi_k)$ est une base hilbertienne de $L^2(]0,1[)$.`,
    solution: t`Une fonction propre vérifie $\varphi\in H^1_0(]0,1[)$ et $-\varphi''=\lambda\varphi$ dans $\mathcal D'(]0,1[)$ avec $\lambda>0$ ; elle est donc de classe $C^\infty$, de la forme $\alpha\cos(\sqrt\lambda x)+\beta\sin(\sqrt\lambda x)$. La condition $\varphi(0)=0$ donne $\alpha=0$, et $\varphi(1)=0$ avec $\beta\neq 0$ impose $\sqrt\lambda=k\pi$. Ainsi $\lambda_k=k^2\pi^2$, chaque espace propre est la droite engendrée par $\sin(k\pi x)$, et $\int_0^12\sin^2(k\pi x)\,dx=1$. Enfin $\mu_k=1/(1+k^2\pi^2)$. Comme le théorème fournit une base hilbertienne de fonctions propres et que les $\varphi_k$ sont les seules, à normalisation près, $(\varphi_k)$ est une base hilbertienne de $L^2(]0,1[)$.`,
    closedChecks: [{ kind: 'expr-equiv', prompt: t`$\mu_2$ en fonction de $\pi$, noté p`, expected: '1/(1+4*p^2)', vars: ['p'] }],
  },
  verification: {
    origin: 'complement',
    review: 'machine',
    notes: 'La compacité de la résolvante suit la démonstration du polycopié (p. PDF 24) ; la construction de la base et les propriétés des fonctions propres sont des compléments.',
  },
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT26: TheoremModule = {
  theorem: {
    id: 'spectral-compact',
    spaces: [
      t`$H$ : espace de Hilbert séparable, réel sauf mention (dans le cas complexe, le produit scalaire est linéaire en la première variable).`,
      t`$K\in\mathcal L(H)$ : opérateur linéaire continu, compact et auto-adjoint.`,
      t`Valeur propre $\lambda$ : $\ker(K-\lambda I)\neq\{0\}$ ; sa multiplicité est $\dim\ker(K-\lambda I)$.`,
    ],
    hypotheses: [
      { id: 'h-separable', text: t`$H$ est un espace de Hilbert séparable : ses bases hilbertiennes sont dénombrables.` },
      {
        id: 'h-compact',
        text: t`$K$ est compact.`,
        whenRemoved: t`La multiplication $Mu(x)=xu(x)$ sur $L^2(]0,1[)$ est bornée et auto-adjointe, non compacte, et n'a aucune valeur propre : il n'existe pas de base de vecteurs propres.`,
      },
      {
        id: 'h-auto',
        text: t`$K=K^*$.`,
        whenRemoved: t`La matrice $\begin{pmatrix}0&1\\0&0\end{pmatrix}$, compacte sur $\mathbb R^2$, n'a que $0$ pour valeur propre, d'espace propre $\operatorname{Vect}\{(1,0)\}$ : aucune base de vecteurs propres.`,
      },
    ],
    statement: t`Si $K=K^*$ est compact sur un Hilbert séparable $H$, une base hilbertienne de $H$ est formée de vecteurs propres de $K$ (en complétant par une base de son noyau). Les valeurs propres non nulles sont réelles, de multiplicité finie, et ne s'accumulent qu'en zéro.`,
    conclusions: {
      existence: t`Il existe une base hilbertienne de $H$ formée de vecteurs propres de $K$, complétée par une base de $\ker K$.`,
      autre: t`Les valeurs propres non nulles sont réelles, de multiplicité finie, et ne s'accumulent qu'en $0$.`,
    },
    sourceProof: 'idee',
    proofOutline: [
      t`Pour $K=K^*$, $\|K\|=\sup_{\|u\|=1}|\langle Ku,u\rangle|$, par polarisation.`,
      t`Soit $(u_n)$ unitaire avec $\langle Ku_n,u_n\rangle\to\lambda$, $|\lambda|=\|K\|\neq 0$. Alors $\|Ku_n-\lambda u_n\|^2\le 2\lambda^2-2\lambda\langle Ku_n,u_n\rangle\to 0$ ; par compacité, une sous-suite de $(Ku_n)$ converge, donc $u_n$ converge vers un vecteur propre unitaire $e_1$.`,
      t`L'orthogonal de $e_1$ est invariant par $K$, qui y reste compact auto-adjoint : on itère, avec $|\lambda_{n+1}|=\|K|_{\{e_1,\dots,e_n\}^\perp}\|$.`,
      t`Si la suite est infinie, $|\lambda_n|\to 0$ : sinon $\|Ke_n-Ke_m\|^2=\lambda_n^2+\lambda_m^2$ resterait minoré, contre la compacité.`,
      t`Tout $x$ orthogonal aux $e_n$ vérifie $\|Kx\|\le|\lambda_{n+1}|\|x\|$ pour tout $n$, donc $Kx=0$ : on complète par une base hilbertienne de $\ker K$, dénombrable par séparabilité.`,
      t`Réalité : $\lambda\|u\|^2=\langle Ku,u\rangle=\langle u,Ku\rangle=\bar\lambda\|u\|^2$ ; multiplicité finie et non-accumulation viennent de $\lambda_n\to 0$.`,
    ],
    warnings: [
      t`Le théorème porte sur un opérateur compact : $A=-\Delta_D$, non borné, n'y entre pas directement ; on l'applique à la résolvante $(I+A)^{-1}$.`,
      t`La multiplicité finie concerne les seules valeurs propres non nulles : $\ker K$ peut être de dimension infinie.`,
      t`En dimension infinie, $0$ appartient au spectre d'un compact sans être nécessairement valeur propre.`,
      t`Sans $K=K^*$, ni l'existence de vecteurs propres ni leur orthogonalité ne sont garanties.`,
    ],
    usefulFor: 'Diagonaliser les inverses elliptiques compacts et construire les bases propres du Laplacien utilisées dans Galerkin.',
    verification: {
      origin: 'complement',
      review: 'machine',
      notes: 'Énoncé repris du polycopié (p. PDF 24), qui n’en donne qu’une idée de preuve ; la démonstration de la fiche est rédigée pour ProofLab.',
    },
  },
  definitions: [
    {
      id: 'spectral-compact-valeur-propre',
      term: 'Valeur propre et multiplicité',
      statement: t`$\lambda$ est valeur propre de $K$ si $\ker(K-\lambda I)\neq\{0\}$ ; ses éléments non nuls sont les vecteurs propres, et $\dim\ker(K-\lambda I)$ est la multiplicité de $\lambda$.`,
      source: complement('Vocabulaire employé en section 6.4 du polycopié'),
    },
    {
      id: 'spectral-compact-base-hilbertienne',
      term: 'Base hilbertienne',
      statement: t`Une famille orthonormée $(e_k)$ de $H$ est une base hilbertienne si l'espace qu'elle engendre est dense dans $H$ ; alors $u=\sum_k\langle u,e_k\rangle e_k$ et $\|u\|^2=\sum_k\langle u,e_k\rangle^2$ pour tout $u\in H$.`,
      source: complement('Vocabulaire employé en section 6.4 du polycopié'),
    },
  ],
  concepts: [
    {
      id: 'spectral-compact-valeur-nulle',
      label: 'Valeur propre nulle',
      reminder: t`$0$ peut être valeur propre d'une matrice non nulle, et le noyau d'un compact peut être de dimension infinie : la finitude ne vaut que pour les valeurs propres non nulles.`,
    },
    {
      id: 'spectral-compact-orthogonalite',
      label: 'Orthogonalité des vecteurs propres',
      reminder: t`Des vecteurs propres associés à des valeurs propres distinctes sont orthogonaux lorsque $K=K^*$ ; c'est faux pour un opérateur quelconque.`,
    },
    {
      id: 'spectral-compact-resolvante',
      label: 'Résolvante et opérateur',
      reminder: t`Le théorème s'applique à la résolvante compacte $(I+A)^{-1}$, non à $A$ non borné : $\mu=1/(1+\lambda)$, et $\mu_k\to 0$ équivaut à $\lambda_k\to+\infty$.`,
    },
    {
      id: 'spectral-compact-diagonale',
      label: 'Diagonale et valeurs propres',
      reminder: 'Les coefficients diagonaux d’une matrice ne sont ses valeurs propres que si elle est diagonale ou triangulaire.',
    },
    {
      id: 'spectral-compact-normes',
      label: t`Normes $L^2$ et $H^1$ des fonctions propres`,
      reminder: t`Une base orthonormée de $L^2$ formée de fonctions propres reste orthogonale pour $\int\nabla u\cdot\nabla v$, mais $\int|\nabla\varphi_k|^2=\lambda_k$ : il faut renormaliser.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-spectral-non-symetrique',
      theoremId: 'spectral-compact',
      title: 'Matrice non symétrique',
      claim: 'Toute matrice réelle diagonalisable admet une base orthonormée de vecteurs propres.',
      correctStatement: t`Une base orthonormée de vecteurs propres existe pour $K=K^*$ compact ; la symétrie est indispensable.`,
      task: t`$B=\begin{pmatrix}1&1\\0&2\end{pmatrix}$ a pour valeurs propres $1$ et $2$, de vecteurs propres $(1,0)$ et $(1,1)$. Calcule leur produit scalaire.`,
      check: { kind: 'rational', prompt: t`Valeur de $\langle(1,0),(1,1)\rangle$`, expected: '1' },
      explanation: t`Le produit scalaire vaut $1\neq 0$. Chaque espace propre est une droite : aucune base de vecteurs propres n'est orthogonale.`,
      concept: 'spectral-compact-orthogonalite',
      source: complement('Contre-exemple à l’hypothèse $K=K^*$ de la section 6.4 du polycopié'),
    },
    {
      id: 'ce-spectral-noyau-infini',
      theoremId: 'spectral-compact',
      title: 'Multiplicité de la valeur propre nulle',
      claim: 'Toutes les valeurs propres d’un opérateur compact sont de multiplicité finie.',
      correctStatement: 'Seules les valeurs propres non nulles d’un compact sont de multiplicité finie.',
      task: t`Sur $\ell^2$, soit $Kx=x_1e_1$, compact et auto-adjoint. Donne la valeur propre de $K$ dont l'espace propre est de dimension infinie.`,
      check: { kind: 'rational', prompt: 'Valeur propre de multiplicité infinie', expected: '0' },
      explanation: t`$\ker K=\{x\in\ell^2:x_1=0\}$ est de dimension infinie ; la seule autre valeur propre, $1$, a pour espace propre $\operatorname{Vect}\{e_1\}$.`,
      concept: 'spectral-compact-valeur-nulle',
      source: complement('Illustration de la section 6.4 du polycopié'),
    },
    {
      id: 'ce-spectral-sans-compacite',
      theoremId: 'spectral-compact',
      title: 'Auto-adjoint non compact',
      claim: 'Tout opérateur borné auto-adjoint admet une base hilbertienne de vecteurs propres.',
      correctStatement: 'Le théorème exige la compacité.',
      task: t`Sur $L^2(]0,1[)$, soit $Mu(x)=xu(x)$, borné et auto-adjoint. Combien $M$ a-t-il de valeurs propres ?`,
      check: { kind: 'rational', prompt: t`Nombre de valeurs propres de $M$`, expected: '0' },
      explanation: t`Si $xu(x)=\lambda u(x)$ presque partout, alors $(x-\lambda)u(x)=0$ presque partout, donc $u=0$ : $M$ n'a aucune valeur propre. Il n'est pas compact, puisque son spectre $[0,1]$ n'est pas dénombrable.`,
      concept: 'hypotheses-theoreme',
      source: complement('Contre-exemple à l’hypothèse de compacité de la section 6.4 du polycopié'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT26;
