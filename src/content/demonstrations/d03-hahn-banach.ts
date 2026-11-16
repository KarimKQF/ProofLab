/**
 * Démonstration du résultat 3 — Hahn–Banach (forme analytique normée), selon le plan de la
 * fiche : prolongement d'une direction, puis lemme de Zorn.
 */
import { t, COMPLEMENT } from '@/content/authoring';
import type { Demonstration } from '@/content/schema';

const demonstration: Demonstration = {
  id: 'hahn-banach.demonstration',
  theoremId: 'hahn-banach',
  title: 'Démontrer le théorème de Hahn–Banach',
  statement: t`Soit $X$ un espace normé réel, $M\subset X$ un sous-espace vectoriel et $\ell\in M'$, de norme $c=\|\ell\|_{M'}$. Démontrer qu'il existe $L\in X'$ tel que $L|_M=\ell$ et $\|L\|_{X'}=c$.`,
  scope: 'complete',
  source: { doc: 'polycopie', pdfPage: 7, label: 'Section 1.3 : énoncé et idée de la démonstration (plan détaillé pour ProofLab)' },
  prerequisites: ['zorn', 'inegalite-triangulaire'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-norme', kind: 'hypothese', text: t`$X$ est un espace normé réel.` },
      { id: 'h-M', kind: 'hypothese', text: t`$M$ est un sous-espace vectoriel de $X$.` },
      { id: 'h-ell', kind: 'hypothese', text: t`$\ell$ est linéaire sur $M$ et $|\ell(m)|\le c\|m\|$ pour tout $m\in M$, avec $c=\|\ell\|_{M'}$.` },

      { id: 'r-suffit', kind: 'consequence', text: t`Il suffit de construire $L$ linéaire sur $X$, prolongeant $\ell$, avec $|L(x)|\le c\|x\|$ : l'inégalité $\|L\|_{X'}\ge c$ est automatique.` },

      { id: 'e-soit', kind: 'definition', local: true, text: t`Soient $N\supset M$ un sous-espace, $g$ linéaire sur $N$ prolongeant $\ell$ avec $|g|\le c\|\cdot\|$ sur $N$, et $x_1\notin N$.` },
      { id: 'e-ineg', kind: 'inegalite', text: t`Pour $n,n'\in N$ : $g(n)-g(n')\le c\|n+x_1\|+c\|n'+x_1\|$.` },
      { id: 'e-beta', kind: 'inegalite', text: t`Il existe $\beta\in\mathbb R$ tel que $|g(n)+\beta|\le c\|n+x_1\|$ pour tout $n\in N$.` },
      { id: 'e-prolonge', kind: 'consequence', text: t`$\tilde g(n+tx_1)=g(n)+t\beta$ prolonge $g$ à $N\oplus\mathbb Rx_1$, avec $|\tilde g|\le c\|\cdot\|$.` },

      { id: 'z-ordre', kind: 'consequence', text: t`Les prolongements $(N,g)$ de $\ell$ vérifiant $|g|\le c\|\cdot\|$, ordonnés par prolongement, forment un ensemble inductif non vide.` },
      { id: 'z-max', kind: 'application-theoreme', text: t`Il existe un prolongement maximal $(N,g)$.` },
      { id: 'z-total', kind: 'egalite', text: t`Le prolongement maximal est défini sur $N=X$.` },
      { id: 'existence', kind: 'consequence', text: t`$L=g$ est linéaire sur $X$, prolonge $\ell$ et vérifie $|L(x)|\le c\|x\|$ pour tout $x\in X$.` },

      { id: 'fin', kind: 'conclusion', text: t`Il existe $L\in X'$ tel que $L|_M=\ell$ et $\|L\|_{X'}=\|\ell\|_{M'}$.` },

      { id: 'x-unique', kind: 'consequence', distractor: true, after: ['existence'], text: t`Le prolongement $L$ de même norme est unique.` },
      { id: 'x-beta', kind: 'consequence', distractor: true, after: ['e-ineg'], text: t`Tout $\beta\in\mathbb R$ convient pour prolonger $g$ sans augmenter la norme.` },
    ],
    justifications: [
      { id: 'j-restriction', label: t`$L$ coïncide avec $\ell$ sur $M$ : $\|L\|_{X'}\ge\sup\{|\ell(m)|:m\in M,\ \|m\|\le 1\}=c$.` },
      { id: 'j-tri', label: t`$g(n)-g(n')=g(n-n')\le c\|n-n'\|$, puis $\|n-n'\|\le\|n+x_1\|+\|n'+x_1\|$.`, theorem: 'inegalite-triangulaire' },
      { id: 'j-sup-inf', label: t`L'inégalité donne $\sup_{n'}\big(-g(n')-c\|n'+x_1\|\big)\le\inf_n\big(-g(n)+c\|n+x_1\|\big)$ ; on choisit $\beta$ entre les deux.` },
      { id: 'j-homogeneite', label: t`Pour $t\neq 0$ : $|\tilde g(n+tx_1)|=|t|\,|g(n/t)+\beta|\le|t|\,c\|n/t+x_1\|=c\|n+tx_1\|$.` },
      { id: 'j-chaines', label: t`$(M,\ell)$ en fait partie ; une chaîne est majorée par la réunion de ses domaines, sur laquelle les prolongements se recollent.` },
      { id: 'j-zorn', label: 'Lemme de Zorn.', theorem: 'zorn' },
      { id: 'j-absurde-max', label: t`Si $N\neq X$, l'extension d'une direction donne un prolongement strictement plus grand : contradiction avec la maximalité.` },
      { id: 'j-def', label: 'Définition d’un prolongement admissible.' },
      { id: 'j-syn', label: t`La borne $|L|\le c\|\cdot\|$ donne la continuité et $\|L\|_{X'}\le c$ ; l'inégalité inverse est automatique.` },
      // Justifications séduisantes mais fausses.
      { id: 'j-recurrence', label: 'Récurrence le long d’une base algébrique dénombrable de X.' },
      { id: 'j-thm', label: 'Théorème de Hahn–Banach.', theorem: 'hahn-banach' },
    ],
    rules: [
      { from: ['h-M', 'h-ell'], to: 'r-suffit', by: 'j-restriction' },
      { from: ['e-soit', 'h-norme'], to: 'e-ineg', by: 'j-tri' },
      { from: ['e-ineg'], to: 'e-beta', by: 'j-sup-inf' },
      { from: ['e-beta', 'e-soit'], to: 'e-prolonge', by: 'j-homogeneite' },
      { from: ['h-M', 'h-ell'], to: 'z-ordre', by: 'j-chaines' },
      { from: ['z-ordre'], to: 'z-max', by: 'j-zorn' },
      { from: ['z-max', 'e-prolonge'], to: 'z-total', by: 'j-absurde-max' },
      { from: ['z-total', 'z-max'], to: 'existence', by: 'j-def' },
      { from: ['existence', 'r-suffit'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-unique',
        verdict: 'incorrect',
        concept: 'existence-unicite',
        message: 'Hahn–Banach donne l’existence d’un prolongement de même norme, pas son unicité : en général, il y en a plusieurs.',
        counterexample: t`Sur $\mathbb R^2$ muni de $\|(x,y)\|_1=|x|+|y|$, la forme $\ell(x,0)=x$ a pour prolongements de norme $1$ toutes les formes $L(x,y)=x+cy$ avec $|c|\le 1$.`,
      },
      {
        conclusion: 'x-beta',
        verdict: 'incorrect',
        concept: 'hahn-banach-norme-prolongement',
        message: t`Le choix de $\beta$ est contraint : il doit se trouver entre la borne supérieure et la borne inférieure ; sinon la norme du prolongement augmente.`,
        counterexample: t`$X=\mathbb R^2$ euclidien, $M=\mathbb R\times\{0\}$, $\ell(x,0)=x$, $x_1=(0,1)$ : $\beta=0$ est le seul choix de norme $1$ ; $\beta=1$ donne la forme $x+y$, de norme $\sqrt2$.`,
      },
      {
        conclusion: 'z-total',
        by: 'j-recurrence',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: 'Un espace normé n’a pas en général de base algébrique dénombrable : une récurrence ne parcourt pas tout X. C’est le lemme de Zorn qui remplace la récurrence.',
        counterexample: t`Un espace de Banach de dimension infinie, comme $\ell^2$, n'a pas de base algébrique dénombrable (conséquence du théorème de Baire).`,
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
        hypothesis: 'h-ell',
        label: t`Ne plus supposer $\ell$ continue sur $M$`,
        necessary: true,
        explanation: 'Sans borne c, il n’y a plus de norme à conserver, et aucun prolongement continu n’existe.',
        counterexample: t`Si $\ell$ n'est pas continue sur $M$, aucun $L\in X'$ ne la prolonge, puisque la restriction à $M$ d'une forme continue est continue.`,
      },
    ],
  },
  plan: [
    t`Réduire à : construire un prolongement linéaire $L$ avec $|L|\le c\|\cdot\|$.`,
    t`Prolonger d'une direction : choisir $\beta$ entre une borne supérieure et une borne inférieure.`,
    'Lemme de Zorn : un prolongement maximal existe.',
    'Par maximalité et l’étape d’une direction, il est défini sur tout X.',
  ],
  solution: t`Notons $c=\|\ell\|_{M'}$. Il suffit de construire $L$ linéaire sur $X$, prolongeant $\ell$, avec $|L(x)|\le c\|x\|$ : alors $L\in X'$, $\|L\|_{X'}\le c$, et $\|L\|_{X'}\ge c$ puisque $L$ coïncide avec $\ell$ sur $M$.

**Une direction.** Soit $g$ un prolongement admissible sur $N$ et $x_1\notin N$. Pour $n,n'\in N$ : $g(n)-g(n')\le c\|n-n'\|\le c\|n+x_1\|+c\|n'+x_1\|$, donc $\sup_{n'}\big(-g(n')-c\|n'+x_1\|\big)\le\inf_n\big(-g(n)+c\|n+x_1\|\big)$. Un $\beta$ entre les deux vérifie $|g(n)+\beta|\le c\|n+x_1\|$, et $\tilde g(n+tx_1)=g(n)+t\beta$ vérifie, pour $t\neq 0$, $|\tilde g(n+tx_1)|=|t|\,|g(n/t)+\beta|\le c\|n+tx_1\|$.

**Zorn.** Les prolongements admissibles, ordonnés par prolongement, forment un ensemble inductif (une chaîne est majorée par sa réunion) : il existe un prolongement maximal $(N,g)$. Si $N\neq X$, l'étape précédente le prolonge strictement : contradiction. Donc $N=X$ et $L=g$ convient.`,
  verification: { ...COMPLEMENT, notes: 'Plan de la fiche (idée de la démonstration), détaillé pour ProofLab.' },
};

export default demonstration;
