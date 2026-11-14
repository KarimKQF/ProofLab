/**
 * Résultat 9 — Inégalité de Poincaré.
 * Polycopié : section 3.3 (p. PDF 12, démonstration ; p. PDF 13, usage) ; exercices 9 (p. PDF 39).
 * Aucune constante n'est présentée comme optimale : seules des constantes admissibles sont établies.
 */
import { t, rubric, poly, complement, FROM_POLY, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'poincare.facile',
  theoremId: 'poincare',
  level: 'facile',
  title: t`Inégalité de Poincaré sur $]0,1[$`,
  statement: t`Montrer qu'il existe une constante $C>0$, indépendante de $u$, telle que $\|u\|_{L^2(]0,1[)}\le C\|u'\|_{L^2(]0,1[)}$ pour tout $u\in H^1_0(]0,1[)$. On raisonnera d'abord sur $C^\infty_c(]0,1[)$, puis par densité.`,
  source: poly(12, 'Démonstration de la section 3.3 ; exercice 9, facile (p. PDF 39)'),
  prerequisites: [],
  concepts: ['poincare-condition-bord', 'poincare-constante', 'poincare-densite-h1', 'quantificateurs', 'utilisation-prematuree'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    paths: [
      { id: 'grossier', label: t`Majoration de $x$ par $1$ (constante de la démonstration du polycopié)` },
      { id: 'precis', label: t`Intégration exacte du facteur $x$` },
    ],
    nodes: [
      { id: 'd-H10', kind: 'definition', text: t`$H^1_0(]0,1[)$ est la fermeture de $C^\infty_c(]0,1[)$ dans $H^1(]0,1[)$, normé par $\|v\|^2_{H^1}=\|v\|^2_{L^2}+\|v'\|^2_{L^2}$.` },
      { id: 'd-phi', kind: 'definition', local: true, text: t`Soit $\varphi\in C^\infty_c(]0,1[)$, prolongée par $0$ à $[0,1]$.` },
      { id: 'd-u', kind: 'definition', local: true, text: t`Soit $u\in H^1_0(]0,1[)$.` },

      { id: 'zero', kind: 'egalite', text: t`$\varphi(0)=0$.` },
      { id: 'ftc', kind: 'egalite', text: t`Pour tout $x\in[0,1]$ : $\varphi(x)=\int_0^x\varphi'(s)\,ds$.` },
      { id: 'cs', kind: 'inegalite', text: t`Pour tout $x\in[0,1]$ : $|\varphi(x)|^2\le x\int_0^x|\varphi'(s)|^2\,ds\le x\,\|\varphi'\|^2_{L^2}$.` },
      { id: 'int1', kind: 'inegalite', text: t`$\|\varphi\|^2_{L^2}\le\|\varphi'\|^2_{L^2}$.` },
      {
        id: 'int2',
        kind: 'inegalite',
        text: t`$\|\varphi\|^2_{L^2}\le\frac12\|\varphi'\|^2_{L^2}$.`,
        masked: t`En intégrant en $x$ : $\|\varphi\|^2_{L^2}\le\kappa\,\|\varphi'\|^2_{L^2}$, avec $\kappa$ à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\kappa=\int_0^1x\,dx$`, expected: '1/2' },
      },
      { id: 'ineg-phi', kind: 'inegalite', text: t`Pour tout $\varphi\in C^\infty_c(]0,1[)$ : $\|\varphi\|_{L^2}\le\|\varphi'\|_{L^2}$.` },
      { id: 'suite', kind: 'consequence', text: t`Il existe $(\varphi_n)\subset C^\infty_c(]0,1[)$ telle que $\varphi_n\to u$ dans $H^1(]0,1[)$.` },
      { id: 'ineg-u', kind: 'inegalite', text: t`$\|u\|_{L^2}\le\|u'\|_{L^2}$.` },
      { id: 'fin', kind: 'conclusion', text: t`Il existe $C>0$, indépendante de $u$, telle que $\|u\|_{L^2}\le C\|u'\|_{L^2}$ pour tout $u\in H^1_0(]0,1[)$ : $C=1$ convient.` },

      // Propositions plausibles mais fausses.
      { id: 'x-H1', kind: 'inegalite', distractor: true, after: ['ineg-phi'], text: t`Pour tout $u\in H^1(]0,1[)$ : $\|u\|_{L^2}\le\|u'\|_{L^2}$.` },
      { id: 'x-optimale', kind: 'consequence', distractor: true, after: ['int2'], text: t`La constante $\frac1{\sqrt2}$ est la plus petite constante admissible sur $]0,1[$.` },
      { id: 'x-quant', kind: 'consequence', distractor: true, text: t`Il suffit d'établir : pour chaque $u\in H^1_0(]0,1[)$, il existe $C_u>0$, pouvant dépendre de $u$, tel que $\|u\|_{L^2}\le C_u\|u'\|_{L^2}$.` },
    ],
    justifications: [
      { id: 'j-support', label: t`Le support de $\varphi$ est un compact de $]0,1[$ : $\varphi$ est nulle au voisinage de $0$.` },
      { id: 'j-ftc', label: t`Théorème fondamental du calcul intégral sur $[0,x]$, avec $\varphi(0)=0$.`, theorem: 'theoreme-fondamental' },
      { id: 'j-cs', label: t`Cauchy–Schwarz sur $[0,x]$ pour les fonctions $1$ et $\varphi'$, puis $\int_0^x\le\int_0^1$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-int-un', label: t`Majoration de $x$ par $1$, puis intégration en $x$ sur $]0,1[$.` },
      { id: 'j-int-x', label: t`Intégration en $x$ sur $]0,1[$ de la majoration $x\,\|\varphi'\|^2_{L^2}$.` },
      { id: 'j-racine', label: t`Racine carrée d'une inégalité entre réels positifs ($\frac12\le 1$ pour la majoration fine).` },
      { id: 'j-fermeture', label: t`Définition de $H^1_0(]0,1[)$ comme fermeture dans $H^1$.` },
      { id: 'j-limite', label: t`Les deux membres convergent, car $\varphi_n\to u$ et $\varphi_n'\to u'$ dans $L^2$ ; passage à la limite dans une inégalité large.` },
      { id: 'j-temoin', label: t`$C=1$ est un témoin, choisi indépendamment de $u$.` },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-densite-L2', label: t`$C^\infty_c(]0,1[)$ est dense dans $L^2(]0,1[)$ : l'inégalité s'étend donc à $H^1_0(]0,1[)$.` },
      { id: 'j-sans-facteur', label: t`Cauchy–Schwarz donne $\left|\int_0^xf\right|^2\le\int_0^x|f|^2$.` },
      { id: 'j-trace', label: t`Théorème de trace : $u$ s'annule aux extrémités.`, theorem: 'trace' },
      { id: 'j-poincare', label: 'Inégalité de Poincaré.', theorem: 'poincare' },
    ],
    rules: [
      { from: ['d-phi'], to: 'zero', by: 'j-support' },
      { from: ['d-phi', 'zero'], to: 'ftc', by: 'j-ftc' },
      { from: ['ftc'], to: 'cs', by: 'j-cs' },
      { from: ['cs'], to: 'int1', by: 'j-int-un', path: 'grossier' },
      { from: ['int1'], to: 'ineg-phi', by: 'j-racine', path: 'grossier' },
      { from: ['cs'], to: 'int2', by: 'j-int-x', path: 'precis' },
      { from: ['int2'], to: 'ineg-phi', by: 'j-racine', path: 'precis' },
      { from: ['d-H10', 'd-u'], to: 'suite', by: 'j-fermeture' },
      { from: ['ineg-phi', 'suite'], to: 'ineg-u', by: 'j-limite' },
      { from: ['ineg-u'], to: 'fin', by: 'j-temoin' },
    ],
    traps: [
      {
        conclusion: 'x-H1',
        verdict: 'incorrect',
        concept: 'poincare-condition-bord',
        message: t`La preuve utilise $\varphi(0)=0$, que rien ne garantit pour $u\in H^1(]0,1[)$ : sans condition au bord, l'inégalité tombe.`,
        counterexample: t`$u\equiv 1$ : $\|u\|_{L^2}=1$ et $\|u'\|_{L^2}=0$.`,
      },
      {
        conclusion: 'x-optimale',
        verdict: 'incorrect',
        concept: 'poincare-constante',
        message: 'L’argument fournit une constante admissible, non la meilleure.',
        counterexample: t`En intégrant aussi depuis $1$ : $|\varphi(x)|^2\le\min(x,1-x)\,\|\varphi'\|^2_{L^2}$, d'où $\|\varphi\|^2_{L^2}\le\frac14\|\varphi'\|^2_{L^2}$ : la constante $\frac12<\frac1{\sqrt2}$ convient aussi.`,
      },
      {
        conclusion: 'x-quant',
        verdict: 'incorrect',
        concept: 'quantificateurs',
        message: t`L'énoncé demande une constante choisie avant $u$ : $\exists C\,\forall u$. L'assertion $\forall u\,\exists C_u$ est bien plus faible.`,
        counterexample: t`Sur $\mathbb R$, toute $u\in C^\infty_c(\mathbb R)$ non nulle vérifie l'inégalité avec $C_u=\|u\|_{L^2}/\|u'\|_{L^2}$, mais aucune constante uniforme n'existe : pour $u_n(x)=\chi(x/n)$, le quotient vaut $n\|\chi\|_{L^2}/\|\chi'\|_{L^2}$.`,
      },
      {
        conclusion: 'ineg-u',
        by: 'j-densite-L2',
        verdict: 'incorrect',
        concept: 'poincare-densite-h1',
        message: t`La densité dans $L^2$ ne contrôle pas les dérivées : il faut approcher $u$ dans $H^1$ pour faire passer les deux membres à la limite.`,
        counterexample: t`Pour $\theta\in C^\infty_c(]0,1[)$ non nulle, $\psi_n=\frac1n\sin(n^2x)\,\theta$ tend vers $0$ dans $L^2$, alors que $\|\psi_n'\|_{L^2}\to+\infty$.`,
      },
      {
        conclusion: 'cs',
        by: 'j-sans-facteur',
        verdict: 'incorrect',
        concept: 'poincare-constante',
        message: t`Cauchy–Schwarz sur $[0,x]$ fait apparaître la longueur de l'intervalle : $\left|\int_0^xf\right|^2\le x\int_0^x|f|^2$. Sans ce facteur, l'inégalité est fausse en général.`,
        counterexample: t`Sur $[0,2]$ avec $f=1$ : $\left|\int_0^2f\right|^2=4>2=\int_0^2|f|^2$.`,
      },
      {
        conclusion: 'ftc',
        by: 'j-trace',
        verdict: 'incorrect',
        concept: 'utilisation-prematuree',
        message: t`Le théorème de trace n'est pas disponible ici, et il est inutile : on travaille sur $\varphi\in C^\infty_c(]0,1[)$, nulle près de $0$, puis on passe à $H^1_0$ par densité.`,
      },
      {
        conclusion: 'fin',
        by: 'j-poincare',
        verdict: 'incorrect',
        concept: 'circularite',
        message: 'Invoquer l’inégalité de Poincaré revient à supposer ce qu’il faut démontrer.',
      },
    ],
    removable: [
      {
        hypothesis: 'zero',
        label: t`Ne plus disposer de $\varphi(0)=0$`,
        necessary: true,
        explanation: t`La représentation $\varphi(x)=\int_0^x\varphi'$ repose sur l'annulation en $0$ : sans condition au bord, l'inégalité tombe.`,
        counterexample: t`$u\equiv 1\in H^1(]0,1[)$ : $\|u\|_{L^2}=1$ et $\|u'\|_{L^2}=0$, donc aucune constante ne convient.`,
      },
      {
        hypothesis: 'suite',
        label: t`Ne plus disposer de l'approximation dans $H^1$`,
        necessary: true,
        explanation: t`L'inégalité n'est établie que sur $C^\infty_c(]0,1[)$ ; c'est l'approximation dans $H^1$ qui l'étend à $u$.`,
        counterexample: t`$u\equiv 1$ n'est limite dans $H^1(]0,1[)$ d'aucune suite de $C^\infty_c(]0,1[)$ (cette convergence entraîne la convergence uniforme sur $[0,1]$, et ces fonctions s'annulent en $0$), et l'inégalité est fausse pour $u$.`,
      },
    ],
  },
  solution: t`**Fonctions tests.** Soit $\varphi\in C^\infty_c(]0,1[)$, prolongée par $0$. Son support est un compact de $]0,1[$, donc $\varphi(0)=0$ et $\varphi(x)=\int_0^x\varphi'(s)\,ds$ pour $x\in[0,1]$. Cauchy–Schwarz sur $[0,x]$ donne
$$|\varphi(x)|^2\le x\int_0^x|\varphi'(s)|^2\,ds\le x\,\|\varphi'\|^2_{L^2}.$$
En majorant $x$ par $1$ et en intégrant sur $]0,1[$, $\|\varphi\|^2_{L^2}\le\|\varphi'\|^2_{L^2}$ : c'est la constante $b_1-a_1=1$ de la démonstration du polycopié. En intégrant exactement ($\int_0^1x\,dx=\frac12$), on obtient la majoration plus fine $\|\varphi\|^2_{L^2}\le\frac12\|\varphi'\|^2_{L^2}$.

**Densité.** Soit $u\in H^1_0(]0,1[)$ et $\varphi_n\in C^\infty_c(]0,1[)$ avec $\varphi_n\to u$ dans $H^1$. Alors $\varphi_n\to u$ et $\varphi_n'\to u'$ dans $L^2$, donc les normes convergent, et le passage à la limite dans $\|\varphi_n\|_{L^2}\le\|\varphi_n'\|_{L^2}$ donne $\|u\|_{L^2}\le\|u'\|_{L^2}$. La constante $C=1$ convient, indépendamment de $u$.

**Points de vigilance.** La constante est choisie avant $u$. Aucune optimalité n'est affirmée : $1$, $\frac1{\sqrt2}$ et même $\frac12$ (en intégrant depuis les deux bords) sont des constantes admissibles. Sur $H^1(]0,1[)$, l'inégalité est fausse : $u\equiv 1$.`,
  steps: [
    t`Établir $\varphi(0)=0$ pour $\varphi\in C^\infty_c(]0,1[)$.`,
    t`Écrire $\varphi(x)=\int_0^x\varphi'$ et appliquer Cauchy–Schwarz sur $[0,x]$.`,
    t`Intégrer en $x$ pour obtenir $\|\varphi\|_{L^2}\le\|\varphi'\|_{L^2}$.`,
    t`Étendre l'inégalité à $H^1_0(]0,1[)$ par densité dans $H^1$.`,
    'Conclure avec une constante indépendante de la fonction.',
  ],
  commonErrors: [
    { id: 'e-H1', description: t`Appliquer l'inégalité à $u\in H^1(]0,1[)$ sans condition au bord.`, concept: 'poincare-condition-bord' },
    { id: 'e-densite', description: t`Passer à la limite avec une approximation dans $L^2$ seulement.`, concept: 'poincare-densite-h1' },
    { id: 'e-optimale', description: 'Présenter la constante obtenue comme optimale.', concept: 'poincare-constante' },
    { id: 'e-quant', description: t`Laisser la constante dépendre de $u$.`, concept: 'quantificateurs' },
  ],
  hints: [
    t`Pour une fonction nulle en $0$, comment exprimer $\varphi(x)$ à l'aide de $\varphi'$ ?`,
    t`Écris $\varphi(x)=\int_0^x\varphi'(s)\,ds$, applique Cauchy–Schwarz sur $[0,x]$ et intègre en $x$ ; traite d'abord $C^\infty_c(]0,1[)$, puis passe à $H^1_0$.`,
    t`$|\varphi(x)|^2\le x\|\varphi'\|^2_{L^2}\le\|\varphi'\|^2_{L^2}$. Pour $u\in H^1_0$, prends $\varphi_n\to u$ dans $H^1$ : les deux membres convergent.`,
  ],
  rubric: rubric({
    hypotheses: t`L'annulation en $0$ des fonctions tests est établie, et $u\in H^1_0$ est utilisé par densité.`,
    methode: 'Représentation intégrale, Cauchy–Schwarz, intégration, puis densité.',
    validite: t`Le facteur $x$ de Cauchy–Schwarz est conservé ; la densité est prise dans $H^1$.`,
    justifications: 'Aucun résultat non disponible (trace, Poincaré lui-même) n’est invoqué.',
    conclusion: 'Une constante explicite, indépendante de la fonction, est obtenue, sans prétention d’optimalité.',
  }),
  variant: {
    statement: t`Soit $L>0$. Montrer que $\|u\|_{L^2(]0,L[)}\le L\,\|u'\|_{L^2(]0,L[)}$ pour tout $u\in H^1_0(]0,L[)$.`,
    solution: t`Pour $\varphi\in C^\infty_c(]0,L[)$ et $x\in[0,L]$ : $\varphi(x)=\int_0^x\varphi'$, donc $|\varphi(x)|^2\le x\int_0^x|\varphi'|^2\le L\|\varphi'\|^2_{L^2}$. En intégrant sur $]0,L[$ : $\|\varphi\|^2_{L^2}\le L^2\|\varphi'\|^2_{L^2}$. Par densité de $C^\infty_c(]0,L[)$ dans $H^1_0(]0,L[)$ pour la norme de $H^1$, l'inégalité s'étend à tout $u\in H^1_0(]0,L[)$. La constante dépend de $L$ : pour $L>\pi$, $u(x)=\sin(\pi x/L)$ vérifie $\|u\|_{L^2}=\frac L\pi\|u'\|_{L^2}>\|u'\|_{L^2}$, si bien qu'aucune constante indépendante de $L$, par exemple $1$, ne convient pour tout $L$.`,
    closedChecks: [
      { kind: 'expr-equiv', prompt: t`Constante $\kappa(L)$ telle que $\|\varphi\|^2_{L^2}\le\kappa(L)\,\|\varphi'\|^2_{L^2}$, obtenue en majorant $x$ par $L$`, expected: 'L^2', vars: ['L'] },
    ],
    proof: {
      purpose: 'demonstration',
      goal: 'fin',
      nodes: [
        { id: 'd-H10', kind: 'definition', text: t`$H^1_0(]0,L[)$ est la fermeture de $C^\infty_c(]0,L[)$ dans $H^1(]0,L[)$.` },
        { id: 'd-phi', kind: 'definition', local: true, text: t`Soit $\varphi\in C^\infty_c(]0,L[)$, prolongée par $0$ à $[0,L]$.` },
        { id: 'd-u', kind: 'definition', local: true, text: t`Soit $u\in H^1_0(]0,L[)$.` },
        { id: 'ftc', kind: 'egalite', text: t`Pour tout $x\in[0,L]$ : $\varphi(x)=\int_0^x\varphi'(s)\,ds$.` },
        { id: 'cs', kind: 'inegalite', text: t`Pour tout $x\in[0,L]$ : $|\varphi(x)|^2\le x\int_0^x|\varphi'(s)|^2\,ds\le L\,\|\varphi'\|^2_{L^2}$.` },
        { id: 'int', kind: 'inegalite', text: t`Pour tout $\varphi\in C^\infty_c(]0,L[)$ : $\|\varphi\|_{L^2}\le L\,\|\varphi'\|_{L^2}$.` },
        { id: 'suite', kind: 'consequence', text: t`Il existe $(\varphi_n)\subset C^\infty_c(]0,L[)$ telle que $\varphi_n\to u$ dans $H^1(]0,L[)$.` },
        { id: 'fin', kind: 'conclusion', text: t`$\|u\|_{L^2}\le L\,\|u'\|_{L^2}$ pour tout $u\in H^1_0(]0,L[)$.` },
        { id: 'x-sans-facteur', kind: 'inegalite', distractor: true, text: t`Quel que soit $L>0$, pour tout $x\in[0,L]$ : $|\varphi(x)|^2\le\int_0^x|\varphi'(s)|^2\,ds$.` },
        { id: 'x-sans-constante', kind: 'inegalite', distractor: true, text: t`Pour tout $L>0$ et tout $u\in H^1_0(]0,L[)$ : $\|u\|_{L^2}\le\|u'\|_{L^2}$.` },
      ],
      justifications: [
        { id: 'j-ftc', label: t`$\varphi$ est nulle près de $0$ ; théorème fondamental du calcul intégral.`, theorem: 'theoreme-fondamental' },
        { id: 'j-cs', label: t`Cauchy–Schwarz sur $[0,x]$, puis $x\le L$ et $\int_0^x\le\int_0^L$.`, theorem: 'cauchy-schwarz' },
        { id: 'j-int', label: t`Intégration en $x$ sur $]0,L[$, intervalle de longueur $L$, puis racine carrée.` },
        { id: 'j-fermeture', label: t`Définition de $H^1_0(]0,L[)$ comme fermeture dans $H^1$.` },
        { id: 'j-limite', label: t`Les deux membres convergent quand $\varphi_n\to u$ dans $H^1$ ; passage à la limite dans une inégalité large.` },
        { id: 'j-sans-facteur', label: t`Cauchy–Schwarz sans facteur : $\left|\int_0^xf\right|^2\le\int_0^x|f|^2$.` },
      ],
      rules: [
        { from: ['d-phi'], to: 'ftc', by: 'j-ftc' },
        { from: ['ftc'], to: 'cs', by: 'j-cs' },
        { from: ['cs'], to: 'int', by: 'j-int' },
        { from: ['d-H10', 'd-u'], to: 'suite', by: 'j-fermeture' },
        { from: ['int', 'suite'], to: 'fin', by: 'j-limite' },
      ],
      traps: [
        {
          conclusion: 'x-sans-facteur',
          verdict: 'incorrect',
          concept: 'poincare-constante',
          message: t`Cauchy–Schwarz sur $[0,x]$ produit le facteur $x$ ; il ne peut pas être omis dès que $x>1$.`,
          counterexample: t`Sur $]0,4[$, $T(s)=\min(s,4-s)$ appartient à $H^1_0(]0,4[)$ et $|T(2)|^2=4>2=\int_0^2|T'|^2$ ; en approchant $T$ dans $H^1$, donc uniformément, par des fonctions de $C^\infty_c(]0,4[)$, l'inégalité tombe aussi pour une fonction test.`,
        },
        {
          conclusion: 'x-sans-constante',
          verdict: 'incorrect',
          concept: 'poincare-constante',
          message: 'La constante dépend de la longueur de l’intervalle.',
          counterexample: t`Pour $L>\pi$ et $u(x)=\sin(\pi x/L)$ : $\|u\|_{L^2}=\frac L\pi\|u'\|_{L^2}>\|u'\|_{L^2}$.`,
        },
        {
          conclusion: 'cs',
          by: 'j-sans-facteur',
          verdict: 'incorrect',
          concept: 'poincare-constante',
          message: t`Cette inégalité est fausse sur un intervalle de longueur supérieure à $1$ : il manque le facteur $x$.`,
          counterexample: t`Sur $[0,2]$ avec $f=1$ : $4>2$.`,
        },
      ],
      removable: [
        {
          hypothesis: 'suite',
          label: t`Ne plus disposer de l'approximation dans $H^1$`,
          necessary: true,
          explanation: t`Sans approximation par $C^\infty_c(]0,L[)$ dans $H^1$, l'inégalité ne s'étend pas.`,
          counterexample: t`$u\equiv 1\in H^1(]0,L[)$ n'est pas dans $H^1_0(]0,L[)$, et $\|u\|_{L^2}=\sqrt L>0=\|u'\|_{L^2}$.`,
        },
      ],
    },
  },
  verification: FROM_POLY,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'poincare.intermediaire',
  theoremId: 'poincare',
  level: 'intermediaire',
  title: t`$\|\nabla u\|_{L^2}$ est une norme équivalente sur $H^1_0(\Omega)$`,
  statement: t`Soit $\Omega\subset\mathbb R^d$ un ouvert borné. Montrer que $N(u)=\|\nabla u\|_{L^2(\Omega)}$ définit une norme sur $H^1_0(\Omega)$, équivalente à la norme usuelle $\|u\|_{H^1}=\big(\|u\|^2_{L^2}+\|\nabla u\|^2_{L^2}\big)^{1/2}$.`,
  source: poly(12, 'Section 3.3 ; exercice 9, intermédiaire (p. PDF 39)'),
  prerequisites: [],
  concepts: ['poincare-condition-bord', 'poincare-constante', 'hypotheses-theoreme', 'domaine-borne'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-omega', kind: 'hypothese', text: t`$\Omega\subset\mathbb R^d$ est un ouvert borné.` },
      { id: 'd-N', kind: 'definition', text: t`Pour $u\in H^1_0(\Omega)$ : $N(u)=\|\nabla u\|_{L^2(\Omega)}$ et $\|u\|^2_{H^1}=\|u\|^2_{L^2}+N(u)^2$.` },
      { id: 'd-zero', kind: 'definition', local: true, text: t`Soit $u\in H^1_0(\Omega)$ tel que $N(u)=0$.` },
      { id: 'poinc', kind: 'application-theoreme', text: t`Il existe $C>0$ tel que $\|v\|_{L^2}\le C\,N(v)$ pour tout $v\in H^1_0(\Omega)$.` },
      { id: 'semi', kind: 'consequence', text: t`$N$ est une semi-norme : $N(u+v)\le N(u)+N(v)$ et $N(\lambda u)=|\lambda|\,N(u)$.` },
      { id: 'zero', kind: 'consequence', text: t`$\|u\|_{L^2}\le C\cdot 0$, donc $u=0$.` },
      { id: 'norme', kind: 'consequence', text: t`$N$ est une norme sur $H^1_0(\Omega)$.` },
      { id: 'maj', kind: 'inegalite', text: t`Pour tout $u\in H^1_0(\Omega)$ : $N(u)\le\|u\|_{H^1}$.` },
      {
        id: 'min',
        kind: 'inegalite',
        text: t`Pour tout $u\in H^1_0(\Omega)$ : $\|u\|^2_{H^1}\le(1+C^2)\,N(u)^2$.`,
        masked: t`Pour tout $u\in H^1_0(\Omega)$ : $\|u\|^2_{H^1}\le K\,N(u)^2$, avec $K$ à exprimer en fonction de $C$.`,
        check: { kind: 'expr-equiv', prompt: t`Constante $K$ en fonction de $C$`, expected: '1+C^2', vars: ['C'] },
      },
      { id: 'fin', kind: 'conclusion', text: t`$N$ est une norme sur $H^1_0(\Omega)$, et $N(u)\le\|u\|_{H^1}\le\sqrt{1+C^2}\,N(u)$ : elle est équivalente à la norme usuelle.` },

      // Propositions plausibles mais fausses.
      { id: 'x-H1', kind: 'consequence', distractor: true, text: t`$N$ est une norme sur $H^1(\Omega)$ tout entier.` },
      { id: 'x-unilateral', kind: 'consequence', distractor: true, after: ['maj'], text: t`L'inégalité $N(u)\le\|u\|_{H^1}$ suffit à établir l'équivalence des deux normes.` },
      { id: 'x-c-un', kind: 'inegalite', distractor: true, text: t`Pour tout ouvert borné $\Omega$ et tout $u\in H^1_0(\Omega)$ : $\|u\|_{L^2}\le N(u)$.` },
    ],
    justifications: [
      { id: 'j-poinc', label: 'Inégalité de Poincaré sur un ouvert borné.', theorem: 'poincare' },
      { id: 'j-semi', label: t`Linéarité de $u\mapsto\nabla u$ et propriétés de la norme de $L^2(\Omega)^d$.` },
      { id: 'j-sep', label: t`Inégalité de Poincaré appliquée à $u$, puis séparation de la norme de $L^2$.` },
      { id: 'j-def-norme', label: t`Une semi-norme qui ne s'annule qu'en $0$ est une norme.` },
      { id: 'j-somme', label: t`$\|u\|^2_{H^1}=\|u\|^2_{L^2}+N(u)^2\ge N(u)^2$.` },
      { id: 'j-poinc-carre', label: t`$\|u\|^2_{L^2}\le C^2N(u)^2$, que l'on ajoute à $N(u)^2$.` },
      { id: 'j-equiv', label: t`Définition de l'équivalence des normes : deux inégalités, à constantes indépendantes de $u$.` },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-connexe', label: t`Un gradient nul force $u$ à être constante, et la condition au bord annule cette constante.` },
      { id: 'j-c-un', label: t`On peut prendre $C=1$ dans l'inégalité de Poincaré.` },
    ],
    rules: [
      { from: ['h-omega'], to: 'poinc', by: 'j-poinc' },
      { from: ['d-N'], to: 'semi', by: 'j-semi' },
      { from: ['d-zero', 'poinc'], to: 'zero', by: 'j-sep' },
      { from: ['semi', 'zero'], to: 'norme', by: 'j-def-norme' },
      { from: ['d-N'], to: 'maj', by: 'j-somme' },
      { from: ['d-N', 'poinc'], to: 'min', by: 'j-poinc-carre' },
      { from: ['norme', 'maj', 'min'], to: 'fin', by: 'j-equiv' },
    ],
    traps: [
      {
        conclusion: 'x-H1',
        verdict: 'incorrect',
        concept: 'poincare-condition-bord',
        message: t`Sur $H^1(\Omega)$, les constantes ont un gradient nul : $N$ n'y sépare pas les points.`,
        counterexample: t`$u\equiv 1\in H^1(\Omega)$ ($\Omega$ borné) : $N(u)=0$ et $u\neq 0$.`,
      },
      {
        conclusion: 'x-unilateral',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`L'équivalence demande deux inégalités. $N\le\|\cdot\|_{H^1}$ est le sens facile ; c'est l'autre sens qui utilise Poincaré.`,
        counterexample: t`Sur $H^1(\Omega)$, on a aussi $N(u)\le\|u\|_{H^1}$, et pourtant $N$ n'y est même pas une norme : $N(1)=0$.`,
      },
      {
        conclusion: 'x-c-un',
        verdict: 'incorrect',
        concept: 'poincare-constante',
        message: t`La constante de Poincaré dépend de $\Omega$ et ne peut pas être prise égale à $1$ en général.`,
        counterexample: t`Sur $\Omega=]0,L[$ avec $L>\pi$, $u(x)=\sin(\pi x/L)$ vérifie $\|u\|_{L^2}=\frac L\pi\|u'\|_{L^2}>\|u'\|_{L^2}$.`,
      },
      {
        conclusion: 'zero',
        by: 'j-connexe',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Cet argument suppose $\Omega$ connexe, ce qui n'est pas une hypothèse, et donne un sens ponctuel à la condition au bord. L'inégalité de Poincaré conclut directement.`,
        counterexample: t`Sur $\Omega=]0,1[\cup]2,3[$, non connexe, $u=\mathbb 1_{]0,1[}$ a un gradient nul sans être constante.`,
      },
      {
        conclusion: 'min',
        by: 'j-c-un',
        verdict: 'incorrect',
        concept: 'poincare-constante',
        message: t`Rien n'autorise $C=1$ : on garde la constante $C$ fournie par le théorème.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-omega',
        label: t`Ne plus supposer $\Omega$ borné`,
        necessary: true,
        explanation: t`L'inégalité de Poincaré n'est plus disponible : l'équivalence avec la norme de $H^1$ peut tomber.`,
        counterexample: t`Sur $\Omega=\mathbb R$, pour $\chi\in C^\infty_c(\mathbb R)$ non nulle et $u_n(x)=\chi(x/n)$ : $\|u_n\|^2_{H^1}\ge n\|\chi\|^2_{L^2}$ alors que $N(u_n)^2=n^{-1}\|\chi'\|^2_{L^2}$ ; aucune constante ne majore $\|u_n\|_{H^1}/N(u_n)$.`,
      },
    ],
  },
  solution: t`**Norme.** $N$ est une semi-norme sur $H^1_0(\Omega)$, par linéarité du gradient et propriétés de la norme de $L^2(\Omega)^d$. Si $N(u)=0$, l'inégalité de Poincaré ($\Omega$ borné) donne $\|u\|_{L^2}\le C\cdot 0$, donc $u=0$ : $N$ est une norme.

**Équivalence.** D'une part $N(u)^2\le\|u\|^2_{L^2}+N(u)^2=\|u\|^2_{H^1}$. D'autre part, $\|u\|^2_{L^2}\le C^2N(u)^2$, d'où $\|u\|^2_{H^1}\le(1+C^2)N(u)^2$. Ainsi
$$N(u)\le\|u\|_{H^1}\le\sqrt{1+C^2}\,N(u)\qquad\forall u\in H^1_0(\Omega).$$

**Points de vigilance.** Sur $H^1(\Omega)$, $N$ n'est pas une norme ($N(1)=0$). La séparation ne passe pas par « gradient nul implique constante » : cet argument exigerait la connexité et un sens ponctuel de la condition au bord, alors que Poincaré conclut directement. La constante $C$ dépend de $\Omega$.`,
  steps: [
    t`Vérifier que $N$ est une semi-norme.`,
    t`Séparer : $N(u)=0$ entraîne $u=0$ par Poincaré.`,
    t`Majorer $N$ par $\|\cdot\|_{H^1}$.`,
    t`Majorer $\|\cdot\|_{H^1}$ par $\sqrt{1+C^2}\,N$ grâce à Poincaré.`,
    'Conclure à l’équivalence des normes.',
  ],
  commonErrors: [
    { id: 'e-H1', description: t`Affirmer que $N$ est une norme sur $H^1(\Omega)$.`, concept: 'poincare-condition-bord' },
    { id: 'e-unilateral', description: 'Ne démontrer qu’une des deux inégalités.', concept: 'hypotheses-theoreme' },
    { id: 'e-borne', description: t`Oublier que $\Omega$ doit être borné pour disposer de Poincaré.`, concept: 'domaine-borne' },
  ],
  hints: [
    t`Une norme équivalente demande deux inégalités. Laquelle est immédiate, et laquelle exige un théorème ?`,
    t`$\|u\|^2_{H^1}=\|u\|^2_{L^2}+N(u)^2$ : un sens est gratuit ; pour l'autre, contrôle $\|u\|_{L^2}$ par $N(u)$.`,
    t`Poincaré donne $\|u\|^2_{L^2}\le C^2N(u)^2$, donc $\|u\|^2_{H^1}\le(1+C^2)N(u)^2$ ; et $N(u)=0$ entraîne $u=0$.`,
  ],
  rubric: rubric({
    hypotheses: t`Le caractère borné de $\Omega$ est utilisé pour invoquer Poincaré, sur $H^1_0(\Omega)$.`,
    methode: 'Les axiomes de norme, puis les deux inégalités d’équivalence, sont établis.',
    validite: 'La constante obtenue ne dépend pas de la fonction.',
    justifications: 'La séparation repose sur Poincaré, sans recours à la connexité.',
    conclusion: t`L'encadrement $N\le\|\cdot\|_{H^1}\le\sqrt{1+C^2}\,N$ est obtenu.`,
  }),
  variant: {
    statement: t`Soit $\Omega\subset\mathbb R^d$ un ouvert borné. Montrer que $(u,v)\mapsto\int_\Omega\nabla u\cdot\nabla v$ est un produit scalaire sur $H^1_0(\Omega)$, qui en fait un espace de Hilbert.`,
    solution: t`La forme est bilinéaire, symétrique et positive ; elle est définie, car $\int_\Omega|\nabla u|^2=0$ entraîne $u=0$ par Poincaré. Sa norme est $N$, équivalente à $\|\cdot\|_{H^1}$ d'après l'exercice. Comme $H^1_0(\Omega)$ est fermé dans l'espace complet $H^1(\Omega)$, il est complet pour $\|\cdot\|_{H^1}$ ; une suite de Cauchy pour $N$ l'est pour $\|\cdot\|_{H^1}$ et converge pour les deux normes. Donc $H^1_0(\Omega)$, muni de ce produit scalaire, est un espace de Hilbert.`,
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'poincare.difficile',
  theoremId: 'poincare',
  level: 'difficile',
  title: 'Coercivité et estimation pour le problème de Dirichlet',
  statement: t`Soit $\Omega\subset\mathbb R^d$ un ouvert borné, $f\in L^2(\Omega)$ et $V=H^1_0(\Omega)$, muni de la norme usuelle de $H^1$. On pose $a(u,v)=\int_\Omega\nabla u\cdot\nabla v$ et $L(v)=\int_\Omega fv$. Montrer que $a$ est continue et coercive sur $V$, que le problème « trouver $u\in V$ tel que $-\Delta u=f$ dans $\mathcal D'(\Omega)$ » admet une unique solution, et que $\|\nabla u\|_{L^2}\le C\|f\|_{L^2}$, où $C$ est une constante de Poincaré de $\Omega$.`,
  source: poly(13, 'Section 3.3, « Pourquoi utile aux EDP » ; exercice 9, difficile (p. PDF 39)'),
  prerequisites: ['lax-milgram'],
  concepts: ['poincare-condition-bord', 'poincare-constante', 'hypotheses-theoreme', 'existence-unicite'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-omega', kind: 'hypothese', text: t`$\Omega\subset\mathbb R^d$ est un ouvert borné.` },
      { id: 'h-f', kind: 'hypothese', text: t`$f\in L^2(\Omega)$.` },
      { id: 'd-V', kind: 'definition', text: t`$V=H^1_0(\Omega)$, sous-espace fermé de $H^1(\Omega)$, est un espace de Hilbert pour $\|\cdot\|_{H^1}$.` },
      { id: 'd-a', kind: 'definition', text: t`$a(u,v)=\int_\Omega\nabla u\cdot\nabla v$ et $L(v)=\int_\Omega fv$ pour $u,v\in V$.` },

      { id: 'poinc', kind: 'application-theoreme', text: t`Il existe $C>0$ tel que $\|v\|_{L^2}\le C\|\nabla v\|_{L^2}$ pour tout $v\in V$.` },
      { id: 'cont', kind: 'inegalite', text: t`$|a(u,v)|\le\|u\|_{H^1}\|v\|_{H^1}$ et $|L(v)|\le\|f\|_{L^2}\|v\|_{H^1}$ pour tous $u,v\in V$.` },
      {
        id: 'coer',
        kind: 'inegalite',
        text: t`$a(v,v)=\|\nabla v\|^2_{L^2}\ge\frac{1}{1+C^2}\|v\|^2_{H^1}$ pour tout $v\in V$.`,
        masked: t`$a(v,v)\ge\alpha\|v\|^2_{H^1}$ pour tout $v\in V$, avec $\alpha$ à exprimer en fonction de $C$.`,
        check: { kind: 'expr-equiv', prompt: t`Constante de coercivité $\alpha$ en fonction de $C$`, expected: '1/(1+C^2)', vars: ['C'] },
      },
      { id: 'lm', kind: 'application-theoreme', text: t`Il existe un unique $u\in V$ tel que $a(u,v)=L(v)$ pour tout $v\in V$.` },
      { id: 'sol', kind: 'consequence', text: t`Le problème « $u\in V$, $-\Delta u=f$ dans $\mathcal D'(\Omega)$ » admet une unique solution.` },
      { id: 'est1', kind: 'inegalite', text: t`$\|\nabla u\|^2_{L^2}=L(u)\le\|f\|_{L^2}\|u\|_{L^2}\le C\|f\|_{L^2}\|\nabla u\|_{L^2}$.` },
      { id: 'est2', kind: 'inegalite', text: t`$\|\nabla u\|_{L^2}\le C\|f\|_{L^2}$.` },
      { id: 'fin', kind: 'conclusion', text: t`$a$ est continue et coercive sur $V$ ; le problème de Dirichlet admet une unique solution $u\in H^1_0(\Omega)$, et $\|\nabla u\|_{L^2}\le C\|f\|_{L^2}$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-coer-un', kind: 'inegalite', distractor: true, after: ['poinc'], text: t`$a(v,v)\ge\|v\|^2_{H^1}$ pour tout $v\in V$.` },
      { id: 'x-coer-H1', kind: 'consequence', distractor: true, text: t`$a$ est coercive sur $H^1(\Omega)$ tout entier.` },
      { id: 'x-sans-c', kind: 'inegalite', distractor: true, after: ['est1'], text: t`Quel que soit l'ouvert borné $\Omega$ : $\|\nabla u\|_{L^2}\le\|f\|_{L^2}$.` },
    ],
    justifications: [
      { id: 'j-poinc', label: 'Inégalité de Poincaré sur un ouvert borné.', theorem: 'poincare' },
      { id: 'j-cs', label: t`Cauchy–Schwarz dans $L^2$, puis $\|\nabla w\|_{L^2}\le\|w\|_{H^1}$ et $\|w\|_{L^2}\le\|w\|_{H^1}$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-coer', label: t`Poincaré : $\|v\|^2_{H^1}=\|v\|^2_{L^2}+\|\nabla v\|^2_{L^2}\le(1+C^2)\|\nabla v\|^2_{L^2}$.` },
      { id: 'j-lm', label: 'Théorème de Lax–Milgram : forme bilinéaire continue et coercive sur un Hilbert, forme linéaire continue.', theorem: 'lax-milgram' },
      { id: 'j-faible', label: t`Pour $\varphi\in\mathcal D(\Omega)$, $\langle-\Delta u,\varphi\rangle=a(u,\varphi)$ par définition des dérivées distributionnelles ; densité de $\mathcal D(\Omega)$ dans $V$ et continuité de $a(u,\cdot)$ et de $L$.`, theorem: 'distributions' },
      { id: 'j-test', label: t`Test par $v=u$, Cauchy–Schwarz, puis Poincaré appliquée à $u\in V$.` },
      { id: 'j-division', label: t`Si $\|\nabla u\|_{L^2}=0$, c'est immédiat ; sinon, on divise par $\|\nabla u\|_{L^2}>0$.` },
      { id: 'j-synthese', label: 'Réunion des propriétés établies.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-lm-sans-coer', label: t`Lax–Milgram, puisque $a$ est continue et symétrique.`, theorem: 'lax-milgram' },
      { id: 'j-norme-h1', label: t`$a(v,v)=\|\nabla v\|^2_{L^2}$ est le carré de la norme de $H^1$.` },
    ],
    rules: [
      { from: ['h-omega'], to: 'poinc', by: 'j-poinc' },
      { from: ['d-a', 'd-V', 'h-f'], to: 'cont', by: 'j-cs' },
      { from: ['d-a', 'poinc'], to: 'coer', by: 'j-coer' },
      { from: ['d-V', 'cont', 'coer'], to: 'lm', by: 'j-lm' },
      { from: ['lm', 'd-a', 'd-V', 'cont'], to: 'sol', by: 'j-faible' },
      { from: ['lm', 'h-f', 'poinc'], to: 'est1', by: 'j-test' },
      { from: ['est1'], to: 'est2', by: 'j-division' },
      { from: ['cont', 'coer', 'sol', 'est2'], to: 'fin', by: 'j-synthese' },
    ],
    traps: [
      {
        conclusion: 'x-coer-un',
        verdict: 'incorrect',
        concept: 'poincare-constante',
        message: t`$a(v,v)=\|\nabla v\|^2_{L^2}$ ne contient pas $\|v\|^2_{L^2}$ : la constante de coercivité est strictement inférieure à $1$.`,
        counterexample: t`Pour $v\in V$ non nul : $\|v\|^2_{H^1}=\|v\|^2_{L^2}+\|\nabla v\|^2_{L^2}>\|\nabla v\|^2_{L^2}=a(v,v)$.`,
      },
      {
        conclusion: 'x-coer-H1',
        verdict: 'incorrect',
        concept: 'poincare-condition-bord',
        message: t`Sur $H^1(\Omega)$, les constantes annulent $a(v,v)$ sans être nulles : la coercivité repose sur la condition de Dirichlet.`,
        counterexample: t`$v\equiv 1\in H^1(\Omega)$ : $a(v,v)=0$ et $\|v\|_{H^1}=|\Omega|^{1/2}>0$.`,
      },
      {
        conclusion: 'x-sans-c',
        verdict: 'incorrect',
        concept: 'poincare-constante',
        message: t`L'estimation fait intervenir une constante de Poincaré de $\Omega$, qui dépend de la taille du domaine.`,
        counterexample: t`Sur $\Omega=]0,2\pi[$, $f(x)=\sin(x/2)$ et $u(x)=4\sin(x/2)$ : $-u''=f$, $u\in H^1_0(\Omega)$ et $\|u'\|_{L^2}=2\|f\|_{L^2}$.`,
      },
      {
        conclusion: 'lm',
        by: 'j-lm-sans-coer',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: 'Lax–Milgram exige la coercivité : continuité et symétrie ne suffisent pas.',
        counterexample: t`Sur $H^1(]0,1[)$, $a(u,v)=\int_0^1u'v'$ est continue et symétrique, mais $a(1,1)=0$ ; pour $f=1$, le choix $v=1$ donne $0=1$ : pas de solution.`,
      },
      {
        conclusion: 'coer',
        by: 'j-norme-h1',
        verdict: 'incorrect',
        concept: 'poincare-constante',
        message: t`$\|\nabla v\|^2_{L^2}$ n'est pas le carré de la norme usuelle de $H^1$ : il manque $\|v\|^2_{L^2}$, que seule l'inégalité de Poincaré contrôle.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-omega',
        label: t`Ne plus supposer $\Omega$ borné`,
        necessary: true,
        explanation: t`Sans Poincaré, la coercivité de $a$ pour la norme de $H^1$ n'est plus établie.`,
        counterexample: t`Sur $\Omega=\mathbb R$, $u_n(x)=\chi(x/n)$ avec $\chi\in C^\infty_c(\mathbb R)$ non nulle vérifie $a(u_n,u_n)=n^{-1}\|\chi'\|^2_{L^2}$ et $\|u_n\|^2_{H^1}\ge n\|\chi\|^2_{L^2}$ : $a$ n'est pas coercive sur $H^1_0(\mathbb R)$.`,
      },
    ],
  },
  closedChecks: [
    { kind: 'expr-equiv', prompt: t`Pour $\Omega=]0,1[$ et $f=1$, solution $u(x)$ du problème de Dirichlet`, expected: 'x(1-x)/2', vars: ['x'] },
    { kind: 'rational', prompt: t`Pour cette solution, valeur de $\|u'\|^2_{L^2}$`, expected: '1/12' },
  ],
  solution: t`**Poincaré.** $\Omega$ étant borné, il existe $C>0$ tel que $\|v\|_{L^2}\le C\|\nabla v\|_{L^2}$ pour tout $v\in V$.

**Continuité.** Par Cauchy–Schwarz, $|a(u,v)|\le\|\nabla u\|_{L^2}\|\nabla v\|_{L^2}\le\|u\|_{H^1}\|v\|_{H^1}$ et $|L(v)|\le\|f\|_{L^2}\|v\|_{L^2}\le\|f\|_{L^2}\|v\|_{H^1}$.

**Coercivité.** Pour $v\in V$ : $\|v\|^2_{H^1}=\|v\|^2_{L^2}+\|\nabla v\|^2_{L^2}\le(1+C^2)\|\nabla v\|^2_{L^2}$, donc $a(v,v)\ge\frac1{1+C^2}\|v\|^2_{H^1}$.

**Existence et unicité.** $V$ est un Hilbert ; Lax–Milgram donne un unique $u\in V$ tel que $a(u,v)=L(v)$ pour tout $v\in V$. Pour $u\in V$ et $\varphi\in\mathcal D(\Omega)$, $\langle-\Delta u,\varphi\rangle=\int_\Omega\nabla u\cdot\nabla\varphi=a(u,\varphi)$ ; par densité de $\mathcal D(\Omega)$ dans $V$ et continuité, l'équation $-\Delta u=f$ dans $\mathcal D'(\Omega)$ équivaut à $a(u,v)=L(v)$ pour tout $v\in V$. Le problème de Dirichlet admet donc une unique solution dans $V$.

**Estimation.** Avec $v=u$ : $\|\nabla u\|^2_{L^2}=\int_\Omega fu\le\|f\|_{L^2}\|u\|_{L^2}\le C\|f\|_{L^2}\|\nabla u\|_{L^2}$, d'où $\|\nabla u\|_{L^2}\le C\|f\|_{L^2}$. On en déduit aussi $\|u\|_{L^2}\le C^2\|f\|_{L^2}$ et $\|u\|_{H^1}\le C\sqrt{1+C^2}\,\|f\|_{L^2}$.

**Point de vigilance.** $C$ est une constante de Poincaré de $\Omega$ : aucune valeur universelle ne convient, et sur $H^1(\Omega)$ la forme $a$ n'est pas coercive.`,
  steps: [
    'Invoquer Poincaré pour l’ouvert borné.',
    t`Établir la continuité de $a$ et de $L$ sur $V$.`,
    t`Établir la coercivité, avec $\alpha=\frac1{1+C^2}$.`,
    'Appliquer Lax–Milgram et traduire la formulation faible en équation au sens des distributions.',
    t`Tester par $v=u$ pour obtenir l'estimation.`,
  ],
  commonErrors: [
    { id: 'e-coer-H1', description: t`Affirmer la coercivité sur $H^1(\Omega)$ entier, en oubliant les constantes.`, concept: 'poincare-condition-bord' },
    { id: 'e-coer-un', description: t`Écrire $a(v,v)\ge\|v\|^2_{H^1}$, en confondant $\|\nabla v\|_{L^2}$ et $\|v\|_{H^1}$.`, concept: 'poincare-constante' },
    { id: 'e-lm', description: 'Appliquer Lax–Milgram sans avoir établi la coercivité.', concept: 'hypotheses-theoreme' },
  ],
  hints: [
    t`Lax–Milgram demande continuité et coercivité pour la norme de $V$. Que manque-t-il à $a(v,v)$ pour dominer $\|v\|^2_{H^1}$ ?`,
    t`Poincaré contrôle $\|v\|_{L^2}$ par $\|\nabla v\|_{L^2}$ : ajoute $\|\nabla v\|^2_{L^2}$ aux deux membres. Pour l'estimation, teste l'équation par $v=u$.`,
    t`$\|v\|^2_{H^1}\le(1+C^2)\,a(v,v)$. Puis $\|\nabla u\|^2_{L^2}=\int fu\le C\|f\|_{L^2}\|\nabla u\|_{L^2}$.`,
  ],
  rubric: rubric({
    hypotheses: t`$\Omega$ borné, $V$ hilbertien et $f\in L^2(\Omega)$ sont utilisés là où ils interviennent.`,
    methode: 'Poincaré, puis continuité et coercivité, puis Lax–Milgram, puis test par la solution.',
    validite: t`La constante de coercivité $\frac1{1+C^2}$ est correcte, et l'équivalence avec l'équation au sens des distributions est justifiée.`,
    justifications: 'Lax–Milgram n’est invoqué qu’après vérification de toutes ses hypothèses.',
    conclusion: t`Existence, unicité et l'estimation $\|\nabla u\|_{L^2}\le C\|f\|_{L^2}$ sont obtenues.`,
  }),
  variant: {
    statement: t`Soit $\Omega$ un ouvert borné, $c\in L^\infty(\Omega)$ avec $c\ge 0$ presque partout, et $f\in L^2(\Omega)$. Montrer que le problème « trouver $u\in H^1_0(\Omega)$ tel que $-\Delta u+cu=f$ dans $\mathcal D'(\Omega)$ » admet une unique solution, et que $\|\nabla u\|_{L^2}\le C\|f\|_{L^2}$ avec une constante de Poincaré $C$ de $\Omega$.`,
    solution: t`La forme $b(u,v)=\int_\Omega\nabla u\cdot\nabla v+\int_\Omega cuv$ est continue sur $H^1_0(\Omega)$ : $|b(u,v)|\le(1+\|c\|_{L^\infty})\|u\|_{H^1}\|v\|_{H^1}$. Comme $c\ge 0$, $b(v,v)\ge\|\nabla v\|^2_{L^2}\ge\frac1{1+C^2}\|v\|^2_{H^1}$ par Poincaré : $b$ est coercive. Lax–Milgram donne une unique solution faible, équivalente à l'équation dans $\mathcal D'(\Omega)$ par le même argument de densité. En testant par $v=u$ : $\|\nabla u\|^2_{L^2}\le b(u,u)=\int_\Omega fu\le C\|f\|_{L^2}\|\nabla u\|_{L^2}$, d'où l'estimation. Le signe de $c$ sert ici à minorer $b(v,v)$ par $\|\nabla v\|^2_{L^2}$.`,
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT09: TheoremModule = {
  theorem: {
    id: 'poincare',
    spaces: [
      t`$\Omega\subset\mathbb R^d$ : ouvert borné.`,
      t`$H^1_0(\Omega)$ : fermeture de $C^\infty_c(\Omega)$ dans $H^1(\Omega)$, muni de la norme usuelle $\|u\|^2_{H^1}=\|u\|^2_{L^2}+\|\nabla u\|^2_{L^2}$.`,
      t`$\|\nabla u\|_{L^2(\Omega)}$ : norme de $\nabla u$ dans $L^2(\Omega)^d$.`,
    ],
    hypotheses: [
      {
        id: 'h-borne',
        text: t`$\Omega$ est borné.`,
        whenRemoved: t`Sur $\Omega=\mathbb R$, pour $\chi\in C^\infty_c(\mathbb R)$ non nulle et $u_n(x)=\chi(x/n)$ : $\|u_n\|_{L^2}=n\,\frac{\|\chi\|_{L^2}}{\|\chi'\|_{L^2}}\,\|u_n'\|_{L^2}$, donc aucune constante ne convient.`,
      },
      {
        id: 'h-h10',
        text: t`$u\in H^1_0(\Omega)$.`,
        whenRemoved: t`Sur $H^1(\Omega)$, l'inégalité est fausse : $u\equiv 1$ vérifie $\|u\|_{L^2}=|\Omega|^{1/2}>0$ et $\nabla u=0$.`,
      },
    ],
    statement: t`Si $\Omega$ est borné, il existe $C>0$ tel que
$$\|u\|_{L^2(\Omega)}\le C\|\nabla u\|_{L^2(\Omega)}\qquad\forall u\in H^1_0(\Omega).$$
Sur $H^1_0(\Omega)$, la norme $u\mapsto\|\nabla u\|_{L^2}$ est donc équivalente à la norme usuelle de $H^1$.`,
    conclusions: {
      existence: t`Il existe une constante $C>0$ ne dépendant que de $\Omega$ : si $\Omega\subset\,]a_1,b_1[\times\dots\times]a_d,b_d[$, la démonstration fournit $C=b_1-a_1$, sans prétention d'optimalité.`,
      autre: t`Sur $H^1_0(\Omega)$ : $\|\nabla u\|_{L^2}\le\|u\|_{H^1}\le\sqrt{1+C^2}\,\|\nabla u\|_{L^2}$.`,
    },
    sourceProof: 'complete',
    proofOutline: [
      t`Pour $u\in C^\infty_c(\Omega)$, prolongée par zéro, enfermer $\Omega$ dans un pavé $]a_1,b_1[\times\dots\times]a_d,b_d[$.`,
      t`Intégrer selon $x_1$ : $u(x)=\int_{a_1}^{x_1}\partial_1u(s,x_2,\dots,x_d)\,ds$.`,
      t`Cauchy–Schwarz : $|u(x)|^2\le(b_1-a_1)\int_{a_1}^{b_1}|\partial_1u(s,x')|^2\,ds$.`,
      t`Intégrer sur le pavé, puis prendre la racine : $\|u\|_{L^2}\le(b_1-a_1)\|\partial_1u\|_{L^2}\le(b_1-a_1)\|\nabla u\|_{L^2}$.`,
      t`Passer à tout $H^1_0(\Omega)$ par densité de $C^\infty_c(\Omega)$ pour la norme de $H^1$ : les deux membres passent à la limite.`,
    ],
    warnings: [
      t`L'inégalité est fausse sur $H^1(\Omega)$ : les constantes ont un gradient nul.`,
      'La constante fournie par la démonstration est admissible ; elle n’est pas annoncée comme optimale.',
      t`Le passage de $C^\infty_c(\Omega)$ à $H^1_0(\Omega)$ se fait par densité pour la norme de $H^1$ : la densité dans $L^2$ ne suffit pas.`,
      t`Ne pas confondre avec Poincaré–Wirtinger, qui porte sur $u-u_\Omega$ pour $u\in H^1(\Omega)$.`,
    ],
    usefulFor: 'Fournir la coercivité indispensable à Lax–Milgram pour le problème de Dirichlet.',
    verification: FROM_POLY,
  },
  definitions: [
    {
      id: 'poincare-h10',
      term: t`Espace $H^1_0(\Omega)$`,
      statement: t`$H^1_0(\Omega)$ est la fermeture de $C^\infty_c(\Omega)$ dans $H^1(\Omega)$ : c'est un sous-espace fermé de $H^1(\Omega)$, mais en général pas un sous-espace fermé de $L^2(\Omega)$.`,
      source: poly(11, 'Section 3.2'),
    },
    {
      id: 'poincare-h-1',
      term: t`Espace $H^{-1}(\Omega)$`,
      statement: t`$H^{-1}(\Omega)=\big(H^1_0(\Omega)\big)'$. Si $\Omega$ est borné, $H^1_0(\Omega)\hookrightarrow L^2(\Omega)\hookrightarrow H^{-1}(\Omega)$, avec injections continues et denses, $L^2$ étant identifié à son dual. Les éléments de $H^{-1}(\Omega)$ ne sont pas forcément des fonctions de $L^2$.`,
      source: poly(12, 'Section 3.2'),
    },
    {
      id: 'poincare-normes-equivalentes',
      term: 'Normes équivalentes',
      statement: t`Deux normes $N_1$ et $N_2$ sur un espace vectoriel $E$ sont équivalentes s'il existe $\alpha,\beta>0$ tels que $\alpha N_1(x)\le N_2(x)\le\beta N_1(x)$ pour tout $x\in E$.`,
      source: complement('Rappel de définition'),
    },
  ],
  concepts: [
    {
      id: 'poincare-condition-bord',
      label: 'Condition au bord et inégalité de Poincaré',
      reminder: t`L'inégalité de Poincaré est fausse sur $H^1(\Omega)$ : les constantes non nulles ont un gradient nul. Elle repose sur $u\in H^1_0(\Omega)$.`,
    },
    {
      id: 'poincare-constante',
      label: 'Constante de Poincaré',
      reminder: t`La constante dépend de $\Omega$ ; une constante admissible n'est pas une constante optimale, et l'inégalité sans constante est fausse en général.`,
    },
    {
      id: 'poincare-densite-h1',
      label: 'Passage à la limite par densité',
      reminder: t`On étend l'inégalité de $C^\infty_c(\Omega)$ à $H^1_0(\Omega)$ par densité pour la norme de $H^1$ : c'est ce mode de convergence qui fait passer les deux membres à la limite.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-poincare-h1',
      theoremId: 'poincare',
      title: 'Sans condition au bord',
      claim: t`Pour $\Omega$ borné, il existe $C>0$ tel que $\|u\|_{L^2}\le C\|\nabla u\|_{L^2}$ pour tout $u\in H^1(\Omega)$.`,
      correctStatement: t`L'inégalité de Poincaré vaut pour $u\in H^1_0(\Omega)$ ; sur $H^1(\Omega)$, il faut retirer la moyenne (Poincaré–Wirtinger, sous ses hypothèses).`,
      task: t`Sur $\Omega=]0,1[$, on teste $u\equiv 1$. Que vaut $\|u'\|_{L^2}$ ?`,
      check: { kind: 'rational', prompt: t`Valeur de $\|u'\|_{L^2}$`, expected: '0' },
      explanation: t`$u\equiv 1\in H^1(]0,1[)$, $\|u\|_{L^2}=1$ et $u'=0$ : aucune constante $C$ ne convient.`,
      concept: 'poincare-condition-bord',
      source: poly(13, 'Section 3.3, lecture géométrique'),
    },
    {
      id: 'ce-poincare-non-borne',
      theoremId: 'poincare',
      title: 'Ouvert non borné',
      claim: t`L'inégalité de Poincaré vaut sur $H^1_0(\mathbb R)$.`,
      correctStatement: t`Le polycopié suppose $\Omega$ borné.`,
      task: t`Sur $\mathbb R$, soit $\chi\in C^\infty_c(\mathbb R)$ non nulle, $q=\|\chi\|^2_{L^2}/\|\chi'\|^2_{L^2}$ et $u_n(x)=\chi(x/n)$. Exprime $\|u_n\|^2_{L^2}/\|u_n'\|^2_{L^2}$ en fonction de $n$ et $q$.`,
      check: { kind: 'expr-equiv', prompt: t`Quotient en fonction de $n$ et $q$`, expected: 'q*n^2', vars: ['n', 'q'] },
      explanation: t`$\|u_n\|^2_{L^2}=n\|\chi\|^2_{L^2}$ et $\|u_n'\|^2_{L^2}=n^{-1}\|\chi'\|^2_{L^2}$ : le quotient vaut $qn^2\to+\infty$, donc aucune constante ne convient.`,
      concept: 'domaine-borne',
      source: poly(12, 'Section 3.3, hypothèse « Ω borné »'),
    },
    {
      id: 'ce-poincare-optimale',
      theoremId: 'poincare',
      title: 'Constante admissible et constante optimale',
      claim: t`Sur $]0,1[$, la constante $\frac1{\sqrt2}$, obtenue en intégrant $|u(x)|^2\le x\|u'\|^2_{L^2}$, est la meilleure possible.`,
      correctStatement: 'La démonstration élémentaire fournit des constantes admissibles ; elle ne détermine pas la meilleure.',
      task: t`En combinant $|u(x)|^2\le x\|u'\|^2_{L^2}$ et $|u(x)|^2\le(1-x)\|u'\|^2_{L^2}$ (intégration depuis $1$), on obtient $|u(x)|^2\le\min(x,1-x)\|u'\|^2_{L^2}$. Calcule $\int_0^1\min(x,1-x)\,dx$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\int_0^1\min(x,1-x)\,dx$`, expected: '1/4' },
      explanation: t`On obtient $\|u\|^2_{L^2}\le\frac14\|u'\|^2_{L^2}$ : la constante $\frac12<\frac1{\sqrt2}$ convient aussi, donc $\frac1{\sqrt2}$ n'est pas la meilleure. Ce calcul n'identifie pas pour autant la meilleure constante.`,
      concept: 'poincare-constante',
      source: poly(39, 'Exercice 9, facile'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT09;
