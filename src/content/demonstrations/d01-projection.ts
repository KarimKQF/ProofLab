/**
 * Démonstration du résultat 1 — existence et unicité du projeté sur un convexe fermé.
 * Existence par une suite minimisante (plan du polycopié) ; unicité par l'identité du
 * parallélogramme. La caractérisation variationnelle et la non-expansivité, qui en
 * découlent, sont travaillées dans les exercices.
 */
import { t } from '@/content/authoring';
import type { Demonstration } from '@/content/schema';

const demonstration: Demonstration = {
  id: 'projection.demonstration',
  theoremId: 'projection',
  title: 'Existence et unicité du projeté',
  statement: t`Soit $H$ un espace de Hilbert réel, $K\subset H$ une partie non vide, fermée et convexe, et $x\in H$. On note $d=\inf_{z\in K}\|x-z\|$. Démontrer qu'il existe un unique $p\in K$ tel que $\|x-p\|=d$.`,
  scope: 'partie',
  scopeNote: t`Existence et unicité du projeté $P_Kx$. La caractérisation $\langle x-p,z-p\rangle\le 0$ et la non-expansivité de $P_K$, qui en découlent, sont travaillées dans les exercices.`,
  source: { doc: 'polycopie', pdfPage: 5, label: 'Section 1.1 : théorème de projection, démonstration par suite minimisante' },
  prerequisites: ['parallelogramme'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-hilbert', kind: 'hypothese', text: t`$H$ est un espace de Hilbert réel : il est complet pour la norme issue du produit scalaire.` },
      { id: 'h-nonvide', kind: 'hypothese', text: t`$K\neq\emptyset$.` },
      { id: 'h-ferme', kind: 'hypothese', text: t`$K$ est fermé dans $H$.` },
      { id: 'h-convexe', kind: 'hypothese', text: t`$K$ est convexe.` },
      { id: 'd-d', kind: 'definition', text: t`$x\in H$ est fixé et $d=\inf_{z\in K}\|x-z\|$.` },

      { id: 's-mini', kind: 'consequence', text: t`Il existe une suite $(p_n)\subset K$ telle que $\|x-p_n\|\to d$ (suite minimisante).` },
      { id: 's-milieu', kind: 'inegalite', text: t`Pour tous $n,m$ : $\frac{p_n+p_m}2\in K$, donc $\big\|x-\frac{p_n+p_m}2\big\|\ge d$.` },
      { id: 's-para', kind: 'egalite', text: t`$\|p_n-p_m\|^2=2\|x-p_n\|^2+2\|x-p_m\|^2-4\big\|x-\frac{p_n+p_m}2\big\|^2$.` },
      { id: 's-cauchy', kind: 'consequence', text: t`$\|p_n-p_m\|^2\le 2\|x-p_n\|^2+2\|x-p_m\|^2-4d^2\to 0$ : la suite $(p_n)$ est de Cauchy.` },
      { id: 's-cv', kind: 'consequence', text: t`$(p_n)$ converge dans $H$ vers un $p\in H$.` },
      { id: 's-pK', kind: 'inclusion', text: t`$p\in K$.` },
      { id: 's-dist', kind: 'egalite', text: t`$\|x-p\|=d$.` },
      { id: 'existence', kind: 'consequence', text: t`Il existe $p\in K$ tel que $\|x-p\|=d$.` },

      { id: 'u-soit', kind: 'definition', local: true, text: t`Soient $p,q\in K$ tels que $\|x-p\|=\|x-q\|=d$.` },
      { id: 'u-para', kind: 'inegalite', text: t`$\|p-q\|^2=2\|x-p\|^2+2\|x-q\|^2-4\big\|x-\frac{p+q}2\big\|^2\le 2d^2+2d^2-4d^2=0$.` },
      { id: 'unicite', kind: 'consequence', text: t`$p=q$ : le point qui réalise la distance est unique.` },

      { id: 'fin', kind: 'conclusion', text: t`Il existe un unique $p\in K$ tel que $\|x-p\|=d$.` },

      { id: 'x-sous-suite', kind: 'consequence', distractor: true, after: ['s-mini'], text: t`La suite minimisante est bornée : une sous-suite converge en norme, et sa limite réalise $d$.` },
      { id: 'x-milieu', kind: 'inegalite', distractor: true, after: ['s-mini'], text: t`$\big\|x-\frac{p_n+p_m}2\big\|\le d$ pour tous $n,m$.` },
    ],
    justifications: [
      { id: 'j-inf', label: t`Définition de la borne inférieure d'une partie non vide de $[0,+\infty[$ : pour tout $n$, un $p_n\in K$ vérifie $\|x-p_n\|<d+\frac1n$.` },
      { id: 'j-milieu', label: t`Convexité de $K$ (avec $t=\frac12$), puis définition de $d$ comme borne inférieure.` },
      { id: 'j-para', label: t`Identité du parallélogramme, appliquée à $x-p_n$ et $x-p_m$.`, theorem: 'parallelogramme' },
      { id: 'j-cauchy', label: t`Reporter la minoration du milieu, puis utiliser $\|x-p_n\|^2\to d^2$.` },
      { id: 'j-complet', label: 'Dans un espace complet, toute suite de Cauchy converge.' },
      { id: 'j-ferme-seq', label: 'Un fermé contient la limite de toute suite convergente de ses éléments.' },
      { id: 'j-cont-norme', label: t`Continuité de la norme : $\|x-p_n\|\to\|x-p\|$, et unicité de la limite.` },
      { id: 'j-temoin', label: t`Le point $p$ est un témoin.` },
      { id: 'j-para-unicite', label: t`Identité du parallélogramme, et $\frac{p+q}2\in K$ par convexité, donc $\big\|x-\frac{p+q}2\big\|\ge d$.`, theorem: 'parallelogramme' },
      { id: 'j-norme-nulle', label: 'Un vecteur de norme nulle est nul.' },
      { id: 'j-reunion', label: 'Existence et unicité réunies.' },
      // Justifications séduisantes mais fausses.
      { id: 'j-complet-K', label: 'Toute partie d’un espace complet est complète.' },
      { id: 'j-bolzano', label: 'Toute suite bornée admet une sous-suite convergente.' },
      { id: 'j-thm', label: 'Théorème de projection sur un convexe fermé.', theorem: 'projection' },
    ],
    rules: [
      { from: ['h-nonvide', 'd-d'], to: 's-mini', by: 'j-inf' },
      { from: ['s-mini', 'h-convexe', 'd-d'], to: 's-milieu', by: 'j-milieu' },
      { from: ['s-mini'], to: 's-para', by: 'j-para' },
      { from: ['s-para', 's-milieu', 's-mini'], to: 's-cauchy', by: 'j-cauchy' },
      { from: ['s-cauchy', 'h-hilbert'], to: 's-cv', by: 'j-complet' },
      { from: ['s-cv', 'h-ferme'], to: 's-pK', by: 'j-ferme-seq' },
      { from: ['s-cv', 's-mini'], to: 's-dist', by: 'j-cont-norme' },
      { from: ['s-pK', 's-dist'], to: 'existence', by: 'j-temoin' },
      { from: ['u-soit', 'h-convexe', 'd-d'], to: 'u-para', by: 'j-para-unicite' },
      { from: ['u-para'], to: 'unicite', by: 'j-norme-nulle' },
      { from: ['existence', 'unicite'], to: 'fin', by: 'j-reunion' },
    ],
    traps: [
      {
        conclusion: 'x-sous-suite',
        verdict: 'incorrect',
        concept: 'bornee-non-convergente',
        message: t`En dimension infinie, une suite bornée n'a pas toujours de sous-suite convergente en norme. Ici, c'est l'identité du parallélogramme qui donne la convergence de toute la suite minimisante.`,
        counterexample: t`Dans $\ell^2$, la suite $(e_n)$ est bornée et $\|e_n-e_m\|=\sqrt2$ pour $n\neq m$ : aucune sous-suite ne converge.`,
      },
      {
        conclusion: 'x-sous-suite',
        by: 'j-bolzano',
        verdict: 'incorrect',
        concept: 'bornee-non-convergente',
        message: t`Bolzano–Weierstrass ne vaut qu'en dimension finie : dans un Hilbert de dimension infinie, la boule unité n'est pas compacte.`,
      },
      {
        conclusion: 'x-milieu',
        verdict: 'incorrect',
        concept: 'justification-absente',
        message: t`Le milieu appartient à $K$ : sa distance à $x$ est au moins $d$, borne inférieure sur $K$. L'inégalité va dans l'autre sens.`,
        counterexample: t`$K=[0,1]\subset\mathbb R$, $x=2$ : pour $p_n=0$ et $p_m=0$, $|x-\frac{p_n+p_m}2|=2>d=1$.`,
      },
      {
        conclusion: 's-pK',
        by: 'j-complet-K',
        verdict: 'incorrect',
        concept: 'fermeture-espace',
        message: t`Une partie d'un espace complet n'est complète que si elle est fermée : c'est exactement ici que sert la fermeture de $K$.`,
        counterexample: t`$K=\{z\in\mathbb R^2:\|z\|<1\}$ et $x=(2,0)$ : $d=1$, et la suite minimisante $p_n=(1-\frac1n,0)$ converge vers $(1,0)\notin K$.`,
      },
      {
        conclusion: 'fin',
        by: 'j-thm',
        verdict: 'incorrect',
        concept: 'circularite',
        message: 'C’est le résultat à démontrer : l’invoquer rend la preuve circulaire.',
      },
    ],
    removable: [
      {
        hypothesis: 'h-ferme',
        label: t`Ne plus supposer $K$ fermé`,
        necessary: true,
        explanation: 'La limite de la suite minimisante peut sortir de K : la distance n’est plus atteinte.',
        counterexample: t`$K=\{z\in\mathbb R^2:\|z\|<1\}$ et $x=(2,0)$ : $d=1$ n'est atteint en aucun point de $K$.`,
      },
      {
        hypothesis: 'h-convexe',
        label: t`Ne plus supposer $K$ convexe`,
        necessary: true,
        explanation: 'Le milieu de deux points de K peut sortir de K : la suite minimisante n’est plus de Cauchy, et l’unicité peut tomber.',
        counterexample: t`$K=\{(1,0),(-1,0)\}\subset\mathbb R^2$, fermé non convexe, et $x=0$ : deux points réalisent $d=1$.`,
      },
      {
        hypothesis: 'h-hilbert',
        label: t`Ne plus supposer $H$ complet`,
        necessary: true,
        explanation: 'Une suite de Cauchy peut ne pas converger : la distance peut ne pas être atteinte.',
        counterexample: t`Dans $c_{00}$ (suites nulles à partir d'un rang) muni de la norme de $\ell^2$, avec $a=(1/k)_{k\ge1}$ et $K=\{z\in c_{00}:\langle z,a\rangle=1\}$, fermé, convexe et non vide : la distance de $0$ à $K$ vaut $1/\|a\|$ et n'est atteinte qu'en $a/\|a\|^2\notin c_{00}$.`,
      },
      {
        hypothesis: 'h-nonvide',
        label: t`Ne plus supposer $K$ non vide`,
        necessary: true,
        explanation: 'Sans point de K, il n’y a ni suite minimisante ni projeté.',
        counterexample: t`$K=\emptyset$ est fermé et convexe, et aucun point ne peut être son projeté.`,
      },
    ],
  },
  plan: [
    t`Construire une suite minimisante $(p_n)\subset K$.`,
    t`Montrer qu'elle est de Cauchy : identité du parallélogramme, le milieu restant dans $K$ par convexité.`,
    t`Passer à la limite : complétude de $H$, fermeture de $K$, continuité de la norme.`,
    t`Unicité : identité du parallélogramme appliquée à deux minimiseurs.`,
  ],
  solution: t`**Suite minimisante.** $K$ est non vide, donc $d$ est fini, et par définition de la borne inférieure il existe $(p_n)\subset K$ avec $\|x-p_n\|\to d$.

**Cauchy.** Par l'identité du parallélogramme appliquée à $x-p_n$ et $x-p_m$ :
$$\|p_n-p_m\|^2=2\|x-p_n\|^2+2\|x-p_m\|^2-4\Big\|x-\frac{p_n+p_m}2\Big\|^2.$$
Par convexité, $\frac{p_n+p_m}2\in K$, donc le dernier terme est au moins $4d^2$, et $\|p_n-p_m\|^2\le 2\|x-p_n\|^2+2\|x-p_m\|^2-4d^2\to 0$.

**Limite.** $H$ est complet : $p_n\to p\in H$. $K$ est fermé : $p\in K$. Par continuité de la norme, $\|x-p\|=d$.

**Unicité.** Si $p,q\in K$ réalisent $d$, le même calcul donne $\|p-q\|^2\le 2d^2+2d^2-4d^2=0$, donc $p=q$.`,
  verification: { origin: 'complement', review: 'machine', notes: 'Existence selon le plan du polycopié (suite minimisante) ; unicité par l’identité du parallélogramme plutôt que par la caractérisation.' },
};

export default demonstration;
