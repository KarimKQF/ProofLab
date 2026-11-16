/**
 * Démonstration du résultat 24 — l'adjoint d'un opérateur densément défini est bien défini,
 * linéaire et fermé ; un opérateur symétrique est contenu dans son adjoint.
 */
import { t, COMPLEMENT } from '@/content/authoring';
import type { Demonstration } from '@/content/schema';

const demonstration: Demonstration = {
  id: 'adjoint.demonstration',
  theoremId: 'adjoint',
  title: 'L’adjoint est bien défini et fermé',
  statement: t`Soit $H$ un espace de Hilbert réel et $A:D(A)\subset H\to H$ linéaire, de domaine dense. Pour $v\in D(A^*)$, c'est-à-dire s'il existe $w\in H$ tel que $\langle Au,v\rangle=\langle u,w\rangle$ pour tout $u\in D(A)$, on pose $A^*v=w$. Démontrer que $A^*$ est bien défini, linéaire et fermé, et que si $A$ est symétrique, alors $A\subset A^*$.`,
  scope: 'complete',
  source: { doc: 'polycopie', pdfPage: 23, label: 'Section 6.1 : adjoint d’un opérateur densément défini (plan détaillé pour ProofLab)' },
  prerequisites: [],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-hilbert', kind: 'hypothese', text: t`$H$ est un espace de Hilbert réel.` },
      { id: 'h-lin', kind: 'hypothese', text: t`$A$ est linéaire, de domaine un sous-espace vectoriel $D(A)$ de $H$.` },
      { id: 'h-dense', kind: 'hypothese', text: t`$D(A)$ est dense dans $H$.` },
      { id: 'h-sym', kind: 'hypothese', text: t`Pour la dernière assertion : $A$ est symétrique, $\langle Au,v\rangle=\langle u,Av\rangle$ pour tous $u,v\in D(A)$.` },
      { id: 'd-adj', kind: 'definition', text: t`$v\in D(A^*)$ s'il existe $w\in H$ tel que $\langle Au,v\rangle=\langle u,w\rangle$ pour tout $u\in D(A)$ ; on pose alors $A^*v=w$.` },

      { id: 'u-soit', kind: 'definition', local: true, text: t`Soient $v\in D(A^*)$ et $w,w'$ deux vecteurs qui conviennent pour $v$.` },
      { id: 'u-orth', kind: 'egalite', text: t`$\langle u,w-w'\rangle=0$ pour tout $u\in D(A)$.` },
      { id: 'unique', kind: 'consequence', text: t`$w=w'$ : $A^*$ est bien défini.` },
      { id: 'lin', kind: 'consequence', text: t`$D(A^*)$ est un sous-espace vectoriel et $A^*$ est linéaire.` },

      { id: 'f-soit', kind: 'definition', local: true, text: t`Soit $(v_n)\subset D(A^*)$ avec $v_n\to v$ et $A^*v_n\to w$ dans $H$.` },
      { id: 'f-lim', kind: 'egalite', text: t`Pour tout $u\in D(A)$ : $\langle Au,v\rangle=\langle u,w\rangle$.` },
      { id: 'ferme', kind: 'consequence', text: t`$v\in D(A^*)$ et $A^*v=w$ : le graphe de $A^*$ est fermé.` },

      { id: 's-soit', kind: 'definition', local: true, text: t`Soit $v\in D(A)$.` },
      { id: 's-in', kind: 'consequence', text: t`Si $A$ est symétrique : $v\in D(A^*)$ et $A^*v=Av$, donc $A\subset A^*$.` },

      { id: 'fin', kind: 'conclusion', text: t`$A^*$ est bien défini, linéaire et fermé ; si $A$ est symétrique, alors $A\subset A^*$.` },

      { id: 'x-egal', kind: 'consequence', distractor: true, after: ['s-in'], text: t`Si $A$ est symétrique, alors $A=A^*$.` },
      { id: 'x-borne', kind: 'consequence', distractor: true, after: ['ferme'], text: t`$A^*$ est fermé, donc borné.` },
    ],
    justifications: [
      { id: 'j-diff', label: 'Différence des deux relations définissant w et w′.' },
      { id: 'j-densite', label: t`Un vecteur orthogonal à une partie dense est nul : approcher $w-w'$ par $u_n\in D(A)$ et passer à la limite dans $\langle u_n,w-w'\rangle=0$.` },
      { id: 'j-lin', label: t`Si $w_1,w_2$ conviennent pour $v_1,v_2$, alors $w_1+\lambda w_2$ convient pour $v_1+\lambda v_2$ ; l'unicité identifie l'image.` },
      { id: 'j-passage', label: t`Passage à la limite dans $\langle Au,v_n\rangle=\langle u,A^*v_n\rangle$, $u$ fixé, par continuité du produit scalaire.` },
      { id: 'j-def-adj', label: t`Définition de $D(A^*)$, et unicité du vecteur associé.` },
      { id: 'j-sym', label: t`La symétrie donne $\langle Au,v\rangle=\langle u,Av\rangle$ pour tout $u\in D(A)$ : $w=Av$ convient.` },
      { id: 'j-syn', label: 'Réunion des résultats établis.' },
      // Justifications séduisantes mais fausses.
      { id: 'j-non-degenere', label: t`Le produit scalaire est non dégénéré : $\langle u,w-w'\rangle=0$ impose $w=w'$.` },
      { id: 'j-thm', label: 'Adjoint d’un opérateur densément défini (le résultat à établir).', theorem: 'adjoint' },
    ],
    rules: [
      { from: ['u-soit', 'd-adj'], to: 'u-orth', by: 'j-diff' },
      { from: ['u-orth', 'h-dense', 'h-hilbert'], to: 'unique', by: 'j-densite' },
      { from: ['unique', 'd-adj', 'h-lin'], to: 'lin', by: 'j-lin' },
      { from: ['f-soit', 'd-adj'], to: 'f-lim', by: 'j-passage' },
      { from: ['f-lim', 'unique'], to: 'ferme', by: 'j-def-adj' },
      { from: ['s-soit', 'h-sym', 'd-adj', 'unique'], to: 's-in', by: 'j-sym' },
      { from: ['unique', 'lin', 'ferme', 's-in'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-egal',
        verdict: 'incorrect',
        concept: 'symetrie-autoadjonction',
        message: t`La symétrie donne seulement $A\subset A^*$ : le domaine de $A^*$ peut être strictement plus grand.`,
        counterexample: t`$Au=-u''$ sur $D(A)=C^\infty_c(]0,1[)\subset L^2(]0,1[)$ est symétrique, mais $D(A^*)=H^2(]0,1[)$, sans condition au bord.`,
      },
      {
        conclusion: 'x-borne',
        verdict: 'incorrect',
        concept: 'graphe-ferme-ferme-borne',
        message: 'Fermé n’est pas borné : l’adjoint d’un opérateur non borné est fermé, et en général non borné. Le graphe fermé ne s’applique que si D(A*) = H.',
        counterexample: t`Pour $A=-\frac{d^2}{dx^2}$ comme ci-dessus, $A^*$ est fermé et non borné sur $L^2(]0,1[)$.`,
      },
      {
        conclusion: 'unique',
        by: 'j-non-degenere',
        verdict: 'incorrect',
        concept: 'adjoint-densite-unicite',
        message: t`La non-dégénérescence demande $\langle u,w-w'\rangle=0$ pour tout $u\in H$ ; ici on ne le sait que pour $u\in D(A)$. C'est la densité de $D(A)$ qui permet de conclure.`,
        counterexample: t`$D(A)=\mathbb R\times\{0\}\subset\mathbb R^2$ et $A(x,0)=(x,0)$ : pour $v=0$, tout $w=(0,s)$ vérifie $\langle Au,v\rangle=0=\langle u,w\rangle$ pour $u\in D(A)$.`,
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
        hypothesis: 'h-dense',
        label: t`Ne plus supposer $D(A)$ dense`,
        necessary: true,
        explanation: t`Le vecteur $w$ n'est plus déterminé par $v$ : $A^*$ n'est plus une application.`,
        counterexample: t`$D(A)=\mathbb R\times\{0\}\subset\mathbb R^2$ et $A(x,0)=(x,0)$ : pour $v=0$, tous les $w=(0,s)$ conviennent.`,
      },
      {
        hypothesis: 'h-sym',
        label: t`Ne plus supposer $A$ symétrique`,
        necessary: true,
        explanation: t`L'inclusion $A\subset A^*$ n'a plus de raison d'être : $A^*$ peut agir autrement sur $D(A)$.`,
        counterexample: t`$Au=u'$ sur $D(A)=C^\infty_c(]0,1[)$ : $A^*v=-v'$, donc $A^*\neq A$ sur $D(A)$.`,
      },
    ],
  },
  plan: [
    t`Unicité de $w$ : différence de deux relations, puis densité de $D(A)$.`,
    t`Linéarité de $A^*$, par unicité.`,
    t`Fermeture : passage à la limite dans $\langle Au,v_n\rangle=\langle u,A^*v_n\rangle$.`,
    t`Si $A$ est symétrique, $w=Av$ convient pour $v\in D(A)$.`,
  ],
  solution: t`**Unicité.** Si $w,w'$ conviennent pour $v$, alors $\langle u,w-w'\rangle=0$ pour tout $u\in D(A)$. Par densité, il existe $u_n\in D(A)$ avec $u_n\to w-w'$, et $\|w-w'\|^2=\lim\langle u_n,w-w'\rangle=0$.

**Linéarité.** Si $w_1,w_2$ conviennent pour $v_1,v_2$, alors $w_1+\lambda w_2$ convient pour $v_1+\lambda v_2$ ; par unicité, $A^*(v_1+\lambda v_2)=A^*v_1+\lambda A^*v_2$.

**Fermeture.** Si $v_n\to v$ et $A^*v_n\to w$, alors pour $u\in D(A)$ fixé, $\langle Au,v_n\rangle=\langle u,A^*v_n\rangle$ donne à la limite $\langle Au,v\rangle=\langle u,w\rangle$ : $v\in D(A^*)$ et $A^*v=w$.

**Symétrie.** Si $A$ est symétrique et $v\in D(A)$, alors $\langle Au,v\rangle=\langle u,Av\rangle$ pour tout $u\in D(A)$ : $v\in D(A^*)$ et $A^*v=Av$.`,
  verification: { ...COMPLEMENT, notes: 'Plan de la fiche, détaillé pour ProofLab.' },
};

export default demonstration;
