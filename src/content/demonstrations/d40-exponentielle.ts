/**
 * Démonstration du résultat 40 dans le cas matriciel : t ↦ e^{tA} est l'unique sous-groupe
 * à un paramètre de vecteur tangent A, et det e^A = e^{tr A}. Le cas d'un groupe de Lie
 * abstrait (champ invariant à gauche, difféomorphisme local) est décrit dans la fiche.
 */
import { t, COMPLEMENT } from '@/content/authoring';
import type { Demonstration } from '@/content/schema';

const demonstration: Demonstration = {
  id: 'exponentielle.demonstration',
  theoremId: 'exponentielle',
  title: 'L’exponentielle de matrices, sous-groupe à un paramètre',
  statement: t`Soit $A\in M_n(\mathbb R)$ et $e^{tA}=\sum_{k\ge 0}\frac{t^kA^k}{k!}$. Démontrer que $t\mapsto e^{tA}$ est l'unique sous-groupe à un paramètre de $GL(n,\mathbb R)$ de vecteur tangent $A$ en $0$, c'est-à-dire $e^{(s+t)A}=e^{sA}e^{tA}$, et que $\det e^{A}=e^{\operatorname{tr}A}$.`,
  scope: 'partie',
  scopeNote: t`Le cas matriciel. Pour un groupe de Lie quelconque, $\exp X$ se définit par la courbe intégrale du champ invariant à gauche ; le difféomorphisme local près de $0$ vient de $(d\exp)_0=\mathrm{Id}$ et de l'inversion locale.`,
  source: { doc: 'cours-lie', pdfPage: 111, label: '§ 28–29 : sous-groupes à un paramètre et exponentielle (cas matriciel)' },
  prerequisites: ['theoreme-cauchy-lipschitz', 'formule-jacobi'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-A', kind: 'hypothese', text: t`$A\in M_n(\mathbb R)$ et $e^{tA}=\sum_{k\ge 0}\frac{t^kA^k}{k!}$.` },

      { id: 'cv', kind: 'consequence', text: t`La série converge pour tout $t$ ; $t\mapsto e^{tA}$ est dérivable, de dérivée $Ae^{tA}=e^{tA}A$.` },
      { id: 'edo', kind: 'egalite', text: t`$\gamma(t)=e^{tA}$ vérifie $\gamma'=\gamma A$ et $\gamma(0)=I$.` },
      { id: 'sg-edo', kind: 'egalite', text: t`Tout sous-groupe à un paramètre $\gamma$ avec $\gamma'(0)=A$ vérifie $\gamma'=\gamma A$ et $\gamma(0)=I$.` },
      { id: 'unique', kind: 'consequence', text: t`$t\mapsto e^{tA}$ est la seule solution de $\gamma'=\gamma A$, $\gamma(0)=I$ ; en particulier le seul candidat parmi les sous-groupes à un paramètre de vecteur tangent $A$.` },
      { id: 's-soit', kind: 'definition', local: true, text: t`Soit $s\in\mathbb R$ fixé.` },
      { id: 's-deux', kind: 'egalite', text: t`$t\mapsto e^{(s+t)A}$ et $t\mapsto e^{sA}e^{tA}$ vérifient toutes deux $\gamma'=\gamma A$, et valent $e^{sA}$ en $t=0$.` },
      { id: 'groupe', kind: 'egalite', text: t`$e^{(s+t)A}=e^{sA}e^{tA}$ pour tous $s,t\in\mathbb R$.` },
      { id: 'inverse', kind: 'consequence', text: t`$e^{tA}$ est inversible, d'inverse $e^{-tA}$ : $t\mapsto e^{tA}$ est un sous-groupe à un paramètre de $GL(n,\mathbb R)$, de vecteur tangent $A$.` },
      { id: 'det-edo', kind: 'egalite', text: t`$\delta(t)=\det e^{tA}$ vérifie $\delta'(t)=\operatorname{tr}(A)\,\delta(t)$ et $\delta(0)=1$.` },
      { id: 'det', kind: 'egalite', text: t`$\det e^{A}=e^{\operatorname{tr}A}$.` },

      { id: 'fin', kind: 'conclusion', text: t`$t\mapsto e^{tA}$ est l'unique sous-groupe à un paramètre de $GL(n,\mathbb R)$ de vecteur tangent $A$, et $\det e^{A}=e^{\operatorname{tr}A}$.` },

      { id: 'x-somme', kind: 'egalite', distractor: true, after: ['groupe'], text: t`$e^{A+B}=e^{A}e^{B}$ pour toutes matrices $A,B\in M_n(\mathbb R)$.` },
      { id: 'x-surj', kind: 'consequence', distractor: true, after: ['det'], text: t`L'exponentielle $M_n(\mathbb R)\to GL(n,\mathbb R)$ est surjective.` },
    ],
    justifications: [
      { id: 'j-serie', label: t`$\|t^kA^k/k!\|\le|t|^k\|A\|^k/k!$ : convergence normale sur tout compact en $t$, puis dérivation terme à terme d'une série entière.` },
      { id: 'j-direct', label: 'Lecture directe de la dérivée et de la valeur en 0.' },
      { id: 'j-deriv-sg', label: t`Dériver $\gamma(t+s)=\gamma(t)\gamma(s)$ par rapport à $s$ en $s=0$.` },
      { id: 'j-cl', label: 'Théorème de Cauchy–Lipschitz : unicité de la solution d’un problème de Cauchy linéaire.', theorem: 'theoreme-cauchy-lipschitz' },
      { id: 'j-deux', label: t`Dérivation en $t$ : $\frac{d}{dt}e^{(s+t)A}=e^{(s+t)A}A$ et $\frac{d}{dt}\big(e^{sA}e^{tA}\big)=e^{sA}e^{tA}A$.` },
      { id: 'j-cl-groupe', label: 'Unicité de Cauchy–Lipschitz : deux solutions de même valeur initiale coïncident.', theorem: 'theoreme-cauchy-lipschitz' },
      { id: 'j-moins', label: t`Le cas $s=-t$ donne $e^{-tA}e^{tA}=e^{0}=I$.` },
      { id: 'j-jacobi', label: t`Formule de Jacobi : $\frac{d}{dt}\det\gamma=\det\gamma\cdot\operatorname{tr}(\gamma^{-1}\gamma')$, avec $\gamma^{-1}\gamma'=A$.`, theorem: 'formule-jacobi' },
      { id: 'j-scalaire', label: t`L'équation scalaire $\delta'=\operatorname{tr}(A)\delta$, $\delta(0)=1$ a pour solution $\delta(t)=e^{t\operatorname{tr}A}$ ; prendre $t=1$.` },
      { id: 'j-syn', label: 'Réunion des résultats établis.' },
      // Justifications séduisantes mais fausses.
      { id: 'j-somme-produit', label: 'L’exponentielle transforme toujours les sommes en produits.' },
      { id: 'j-thm', label: 'Sous-groupes à un paramètre et exponentielle.', theorem: 'exponentielle' },
    ],
    rules: [
      { from: ['h-A'], to: 'cv', by: 'j-serie' },
      { from: ['cv'], to: 'edo', by: 'j-direct' },
      { from: [], to: 'sg-edo', by: 'j-deriv-sg' },
      { from: ['edo', 'sg-edo'], to: 'unique', by: 'j-cl' },
      { from: ['s-soit', 'cv'], to: 's-deux', by: 'j-deux' },
      { from: ['s-deux'], to: 'groupe', by: 'j-cl-groupe' },
      { from: ['groupe', 'edo'], to: 'inverse', by: 'j-moins' },
      { from: ['inverse', 'cv'], to: 'det-edo', by: 'j-jacobi' },
      { from: ['det-edo'], to: 'det', by: 'j-scalaire' },
      { from: ['unique', 'inverse', 'det'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-somme',
        verdict: 'incorrect',
        concept: 'lie-exp-somme',
        message: t`Vrai si $AB=BA$, faux en général : le développement à l'ordre 2 fait apparaître $\frac12[A,B]$.`,
        counterexample: t`$A=\begin{pmatrix}0&1\\0&0\end{pmatrix}$, $B=\begin{pmatrix}0&0\\1&0\end{pmatrix}$ : $e^Ae^B=\begin{pmatrix}2&1\\1&1\end{pmatrix}$, alors que $e^{A+B}=\begin{pmatrix}\cosh 1&\sinh 1\\\sinh 1&\cosh 1\end{pmatrix}$.`,
      },
      {
        conclusion: 'x-surj',
        verdict: 'incorrect',
        concept: 'lie-exp-globale',
        message: t`L'image de l'exponentielle est formée de matrices de déterminant $e^{\operatorname{tr}A}>0$ : aucune matrice de déterminant négatif n'est atteinte.`,
        counterexample: t`$\operatorname{diag}(-1,1)\in GL(2,\mathbb R)$ n'est l'exponentielle d'aucune matrice réelle, puisque $\det e^{A}=e^{\operatorname{tr}A}>0$.`,
      },
      {
        conclusion: 'groupe',
        by: 'j-somme-produit',
        verdict: 'incorrect',
        concept: 'lie-exp-somme',
        message: t`C'est faux en général. Ici $sA$ et $tA$ commutent, mais c'est précisément ce qu'il faut exploiter : l'unicité de Cauchy–Lipschitz le fait.`,
      },
      {
        conclusion: 'fin',
        by: 'j-thm',
        verdict: 'incorrect',
        concept: 'circularite',
        message: 'C’est le résultat à démontrer : l’invoquer rend la preuve circulaire.',
      },
    ],
    removable: [],
  },
  plan: [
    t`Convergence et dérivée de la série : $\gamma(t)=e^{tA}$ vérifie $\gamma'=\gamma A$, $\gamma(0)=I$.`,
    t`Tout sous-groupe à un paramètre de vecteur tangent $A$ vérifie la même équation : unicité par Cauchy–Lipschitz.`,
    t`Propriété de groupe : comparer $e^{(s+t)A}$ et $e^{sA}e^{tA}$ par unicité.`,
    t`Déterminant : formule de Jacobi, puis équation scalaire.`,
  ],
  solution: t`La série converge normalement sur tout compact en $t$ et se dérive terme à terme : $\gamma(t)=e^{tA}$ vérifie $\gamma'=\gamma A=A\gamma$ et $\gamma(0)=I$. Un sous-groupe à un paramètre $\gamma$ avec $\gamma'(0)=A$ vérifie, en dérivant $\gamma(t+s)=\gamma(t)\gamma(s)$ en $s=0$, la même équation $\gamma'=\gamma A$, $\gamma(0)=I$ : par Cauchy–Lipschitz, $\gamma(t)=e^{tA}$.

Pour $s$ fixé, $t\mapsto e^{(s+t)A}$ et $t\mapsto e^{sA}e^{tA}$ vérifient $\gamma'=\gamma A$ et valent $e^{sA}$ en $0$ : elles coïncident. Avec $s=-t$, $e^{-tA}e^{tA}=I$, donc $e^{tA}\in GL(n,\mathbb R)$.

Enfin $\delta(t)=\det e^{tA}$ vérifie, par la formule de Jacobi, $\delta'=\delta\operatorname{tr}(e^{-tA}Ae^{tA})=\operatorname{tr}(A)\,\delta$, $\delta(0)=1$, d'où $\delta(t)=e^{t\operatorname{tr}A}$ et $\det e^A=e^{\operatorname{tr}A}$.`,
  verification: { ...COMPLEMENT, notes: 'Cas matriciel du plan du cours, détaillé pour ProofLab.' },
};

export default demonstration;
