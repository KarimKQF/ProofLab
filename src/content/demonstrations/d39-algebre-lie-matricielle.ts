/**
 * Démonstration du résultat 39 (partie structurelle) : l'espace tangent à l'identité d'un
 * groupe matriciel est un sous-espace stable par le commutateur, par dérivation de la
 * conjugaison. Les descriptions de so(n), sl(n), u(n) sont travaillées dans les exercices.
 */
import { t, COMPLEMENT } from '@/content/authoring';
import type { Demonstration } from '@/content/schema';

const demonstration: Demonstration = {
  id: 'algebre-lie-matricielle.demonstration',
  theoremId: 'algebre-lie-matricielle',
  title: 'L’espace tangent à l’identité est une algèbre de Lie',
  statement: t`Soit $G\subset GL(n,\mathbb R)$ un sous-groupe de Lie et $\mathfrak g=T_IG=\{Q'(0):Q$ courbe lisse de $G$, $Q(0)=I\}$. Démontrer que $\mathfrak g$ est un sous-espace vectoriel de $M_n(\mathbb R)$, stable par $[A,B]=AB-BA$, et que ce crochet est bilinéaire, antisymétrique et vérifie l'identité de Jacobi.`,
  scope: 'partie',
  scopeNote: t`La structure d'algèbre de Lie de $\mathfrak g$. Les descriptions $\mathfrak{so}(n)$, $\mathfrak{sl}(n)$, $\mathfrak u(n)$, par dérivation des contraintes et théorème du niveau régulier, sont travaillées dans les exercices.`,
  source: { doc: 'cours-lie', pdfPage: 102, label: '§ 25–26 : algèbre de Lie d’un groupe matriciel (plan détaillé pour ProofLab)' },
  prerequisites: [],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-groupe', kind: 'hypothese', text: t`$G$ est un sous-groupe de $GL(n,\mathbb R)$ et une sous-variété de $M_n(\mathbb R)$.` },
      { id: 'd-g', kind: 'definition', text: t`$\mathfrak g=T_IG=\{Q'(0):Q$ courbe lisse de $G$, $Q(0)=I\}$.` },

      { id: 'sev', kind: 'consequence', text: t`$\mathfrak g$ est un sous-espace vectoriel de $M_n(\mathbb R)$.` },
      { id: 'soit', kind: 'definition', local: true, text: t`Soient $A,B\in\mathfrak g$, et $Q$, $P$ des courbes lisses de $G$ avec $Q(0)=P(0)=I$, $Q'(0)=A$, $P'(0)=B$.` },
      { id: 'conj', kind: 'inclusion', text: t`Pour tout $t$ : $Q(t)BQ(t)^{-1}\in\mathfrak g$.` },
      { id: 'inverse', kind: 'egalite', text: t`$\frac{d}{dt}\big|_{t=0}Q(t)^{-1}=-A$.` },
      { id: 'deriv', kind: 'egalite', text: t`$\frac{d}{dt}\big|_{t=0}\big(Q(t)BQ(t)^{-1}\big)=AB-BA$.` },
      { id: 'ferme', kind: 'consequence', text: t`$\mathfrak g$ est fermé dans $M_n(\mathbb R)$.` },
      { id: 'crochet', kind: 'inclusion', text: t`$[A,B]=AB-BA\in\mathfrak g$.` },
      { id: 'algebre', kind: 'consequence', text: t`Le commutateur est bilinéaire, antisymétrique et vérifie $[A,[B,C]]+[B,[C,A]]+[C,[A,B]]=0$.` },

      { id: 'fin', kind: 'conclusion', text: t`$\mathfrak g$ est un sous-espace vectoriel de $M_n(\mathbb R)$, stable par le commutateur, qui en fait une algèbre de Lie.` },

      { id: 'x-produit', kind: 'inclusion', distractor: true, after: ['crochet'], text: t`$AB\in\mathfrak g$ pour tous $A,B\in\mathfrak g$.` },
      { id: 'x-tangent-produit', kind: 'egalite', distractor: true, after: ['soit'], text: t`La courbe $Q(t)P(t)$ a pour vecteur tangent $AB$ en $t=0$.` },
    ],
    justifications: [
      { id: 'j-sev', label: t`Espace tangent à une sous-variété en un point ; concrètement, $Q_1(t)Q_2(t)$ et $Q_1(\lambda t)$ sont des courbes de $G$ de vecteurs tangents $A_1+A_2$ et $\lambda A_1$.` },
      { id: 'j-conjugaison', label: t`$s\mapsto Q(t)P(s)Q(t)^{-1}$ est une courbe de $G$ (sous-groupe) issue de $I$, de vecteur tangent $Q(t)BQ(t)^{-1}$ en $s=0$.` },
      { id: 'j-deriv-inverse', label: t`Dériver $Q(t)Q(t)^{-1}=I$ en $t=0$.` },
      { id: 'j-leibniz', label: 'Règle de Leibniz pour un produit de matrices.' },
      { id: 'j-dim-finie', label: 'Un sous-espace vectoriel de dimension finie est fermé.' },
      { id: 'j-taux', label: t`$AB-BA$ est la limite des taux d'accroissement $\frac1t\big(Q(t)BQ(t)^{-1}-B\big)$, éléments de $\mathfrak g$ ; $\mathfrak g$ est fermé.` },
      { id: 'j-calcul', label: 'Développement direct des produits de matrices, terme à terme.' },
      { id: 'j-syn', label: 'Réunion des résultats établis.' },
      // Justifications séduisantes mais fausses.
      { id: 'j-crochet-champs', label: t`$[A,B]$ est le crochet de deux courbes de $G$, donc un élément de $G$.` },
      { id: 'j-thm', label: 'Algèbre de Lie d’un groupe matriciel.', theorem: 'algebre-lie-matricielle' },
    ],
    rules: [
      { from: ['h-groupe', 'd-g'], to: 'sev', by: 'j-sev' },
      { from: ['soit', 'h-groupe', 'd-g'], to: 'conj', by: 'j-conjugaison' },
      { from: ['soit'], to: 'inverse', by: 'j-deriv-inverse' },
      { from: ['inverse', 'soit'], to: 'deriv', by: 'j-leibniz' },
      { from: ['sev'], to: 'ferme', by: 'j-dim-finie' },
      { from: ['conj', 'deriv', 'ferme'], to: 'crochet', by: 'j-taux' },
      { from: ['sev'], to: 'algebre', by: 'j-calcul' },
      { from: ['sev', 'crochet', 'algebre'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-produit',
        verdict: 'incorrect',
        concept: 'lie-algebre-tangente',
        message: t`$\mathfrak g$ n'est pas stable par produit : seul le commutateur reste dans $\mathfrak g$.`,
        counterexample: t`Dans $\mathfrak{so}(2)$, $J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ vérifie $J^2=-I\notin\mathfrak{so}(2)$.`,
      },
      {
        conclusion: 'x-tangent-produit',
        verdict: 'incorrect',
        concept: 'lie-algebre-tangente',
        message: t`La règle de Leibniz donne $(QP)'(0)=Q'(0)P(0)+Q(0)P'(0)=A+B$ : le produit de courbes correspond à la somme des vecteurs tangents.`,
        counterexample: t`$Q(t)=e^{tA}$ et $P(t)=e^{tB}$ : $Q(t)P(t)=I+t(A+B)+O(t^2)$.`,
      },
      {
        conclusion: 'crochet',
        by: 'j-crochet-champs',
        verdict: 'incorrect',
        concept: 'lie-algebre-tangente',
        message: t`$[A,B]$ est un vecteur tangent, dans $\mathfrak g$, pas un élément du groupe $G$. On l'obtient en dérivant la conjugaison, dans le sous-espace fermé $\mathfrak g$.`,
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
        hypothesis: 'h-groupe',
        label: t`Ne plus supposer $G$ stable par produit`,
        necessary: true,
        explanation: t`Sans structure de groupe, la conjugaison $Q(t)P(s)Q(t)^{-1}$ ne reste pas dans $G$, et l'espace tangent n'a aucune raison d'être stable par le commutateur.`,
        counterexample: t`Le plan affine $\{I+aE_{12}+bE_{21}\}$, non stable par produit, a pour espace tangent en $I$ l'espace engendré par $E_{12}$ et $E_{21}$, qui ne contient pas $[E_{12},E_{21}]=E_{11}-E_{22}$.`,
      },
    ],
  },
  plan: [
    t`$\mathfrak g$ est un sous-espace vectoriel (espace tangent), donc fermé.`,
    t`Pour $A,B\in\mathfrak g$, la conjugaison donne $Q(t)BQ(t)^{-1}\in\mathfrak g$ pour tout $t$.`,
    t`Dériver en $t=0$ : $AB-BA\in\mathfrak g$, par fermeture.`,
    'Bilinéarité, antisymétrie et Jacobi : calcul direct.',
  ],
  solution: t`$\mathfrak g$ est l'espace tangent en $I$ à la sous-variété $G$ : c'est un sous-espace vectoriel, de dimension finie, donc fermé.

Soient $A,B\in\mathfrak g$, $Q$ et $P$ des courbes de $G$ issues de $I$ avec $Q'(0)=A$, $P'(0)=B$. Pour $t$ fixé, $s\mapsto Q(t)P(s)Q(t)^{-1}$ est une courbe de $G$ issue de $I$, de vecteur tangent $Q(t)BQ(t)^{-1}$ : cet élément est dans $\mathfrak g$ pour tout $t$. En dérivant $Q(t)Q(t)^{-1}=I$, on obtient $\frac{d}{dt}\big|_0Q(t)^{-1}=-A$, puis par Leibniz $\frac{d}{dt}\big|_0Q(t)BQ(t)^{-1}=AB-BA$. Ce vecteur est limite de taux d'accroissement appartenant à $\mathfrak g$, fermé : $[A,B]\in\mathfrak g$.

Enfin, le commutateur est bilinéaire et antisymétrique, et l'identité de Jacobi se vérifie en développant les douze produits.`,
  verification: { ...COMPLEMENT, notes: 'Plan du cours (idée de la démonstration), détaillé pour ProofLab par dérivation de la conjugaison.' },
};

export default demonstration;
