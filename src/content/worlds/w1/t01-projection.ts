/**
 * Résultat 1 — Projection sur un convexe fermé.
 * Fichier exemplaire : il sert de modèle à tous les autres modules de théorèmes.
 */
import { t, rubric, poly, FROM_POLY } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'projection.facile',
  theoremId: 'projection',
  level: 'facile',
  title: 'Projection sur un demi-plan fermé',
  statement: t`Dans $H=\mathbb R^2$ euclidien, on pose $K=\{(a,b)\in\mathbb R^2 : a\ge 0\}$ et $x=(-2,3)$. Montrer que $K$ est non vide, fermé et convexe, calculer $P_Kx$ et vérifier l'inégalité caractéristique.`,
  source: poly(35, 'Atelier 9.1 ; exercice 1, facile (p. PDF 38)'),
  prerequisites: [],
  concepts: ['fermeture-espace', 'inegalite-stricte-limite', 'quantificateurs', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'suites', label: 'Fermeture par les suites' },
      { id: 'complementaire', label: 'Fermeture par le complémentaire ouvert' },
      { id: 'image-reciproque', label: 'Fermeture par image réciproque d’un fermé' },
      { id: 'produit', label: 'Fermeture comme produit de fermés' },
    ],
    nodes: [
      { id: 'h-hilbert', kind: 'hypothese', text: t`$H=\mathbb R^2$, muni du produit scalaire euclidien, est un espace de Hilbert réel.` },
      { id: 'd-K', kind: 'definition', text: t`$K=\{(a,b)\in\mathbb R^2 : a\ge 0\}$.` },
      { id: 'd-x', kind: 'definition', text: t`$x=(-2,3)$.` },

      { id: 'nonvide', kind: 'consequence', text: t`$K\neq\emptyset$.`, unlocks: ['K-nonvide'] },

      { id: 's-suite', kind: 'definition', local: true, text: t`Soit $(a_n,b_n)_n\subset K$ convergeant vers $(a,b)$ dans $\mathbb R^2$.` },
      { id: 's-an-pos', kind: 'inegalite', text: t`$a_n\ge 0$ pour tout $n$.` },
      { id: 's-an-conv', kind: 'consequence', text: t`$a_n\to a$ dans $\mathbb R$.` },
      { id: 's-a-pos', kind: 'inegalite', text: t`$a\ge 0$.` },
      { id: 's-lim-in', kind: 'consequence', text: t`$(a,b)\in K$.` },

      { id: 'c-point', kind: 'definition', local: true, text: t`Soit $(a,b)\notin K$, c'est-à-dire $a<0$ ; on pose $\varepsilon=-a/2>0$.` },
      { id: 'c-boule', kind: 'inclusion', text: t`$B\big((a,b),\varepsilon\big)\subset\mathbb R^2\setminus K$.` },
      { id: 'c-ouvert', kind: 'consequence', text: t`$\mathbb R^2\setminus K$ est ouvert.` },

      { id: 'i-pi-cont', kind: 'consequence', text: t`$\pi_1:\mathbb R^2\to\mathbb R$, $\pi_1(a,b)=a$, est continue.` },
      { id: 'i-ferme-R', kind: 'consequence', text: t`$[0,+\infty[$ est fermé dans $\mathbb R$.` },
      { id: 'i-eq', kind: 'egalite', text: t`$K=\pi_1^{-1}\big([0,+\infty[\big)$.` },

      { id: 'p-prod', kind: 'egalite', text: t`$K=[0,+\infty[\times\mathbb R$.` },

      { id: 'ferme', kind: 'consequence', text: t`$K$ est fermé dans $\mathbb R^2$.`, unlocks: ['K-ferme'] },

      { id: 'v-pts', kind: 'definition', local: true, text: t`Soient $(a,b),(c,d)\in K$ et $t\in[0,1]$.` },
      { id: 'v-coord', kind: 'egalite', text: t`La première coordonnée de $t(a,b)+(1-t)(c,d)$ vaut $ta+(1-t)c$.` },
      { id: 'v-pos', kind: 'inegalite', text: t`$ta+(1-t)c\ge 0$.` },
      { id: 'convexe', kind: 'consequence', text: t`$K$ est convexe.`, unlocks: ['K-convexe'] },

      { id: 'thm', kind: 'application-theoreme', text: t`Il existe un unique $p\in K$ tel que $\|x-p\|=\inf_{z\in K}\|x-z\|$ : c'est $P_Kx$.`, unlocks: ['projection-existe'] },

      { id: 'm-dist', kind: 'egalite', text: t`Pour $(a,b)\in K$ : $\|x-(a,b)\|^2=(a+2)^2+(b-3)^2$.` },
      { id: 'm-ineg', kind: 'inegalite', text: t`Pour $(a,b)\in K$ : $(a+2)^2+(b-3)^2\ge 4$, avec égalité si et seulement si $a=0$ et $b=3$.` },
      {
        id: 'p-val',
        kind: 'egalite',
        text: t`$P_Kx=(0,3)$.`,
        masked: t`Valeur de $P_Kx$ : à calculer.`,
        unlocks: ['projection-point'],
        check: { kind: 'rational-vector', prompt: t`Coordonnées de $P_Kx$`, expected: ['0', '3'], labels: ['p₁', 'p₂'] },
      },

      { id: 'q-vect', kind: 'egalite', text: t`Avec $p=P_Kx$ et $z=(a,b)\in K$ : $x-p=(-2,0)$ et $z-p=(a,b-3)$.` },
      { id: 'carac', kind: 'inegalite', text: t`$\langle x-p,z-p\rangle=-2a\le 0$ pour tout $z=(a,b)\in K$.`, unlocks: ['inegalite-caracteristique'] },

      { id: 'fin', kind: 'conclusion', text: t`$K$ est non vide, fermé, convexe ; sa projection en $x$ est calculée et l'inégalité caractéristique est vérifiée.` },

      // Propositions plausibles mais fausses.
      { id: 'x-strict', kind: 'inegalite', distractor: true, text: t`$a>0$.` },
      { id: 'x-carac-strict', kind: 'inegalite', distractor: true, after: ['q-vect'], text: t`$\langle x-p,z-p\rangle<0$ pour tout $z\in K$.` },
      { id: 'x-forall-eps', kind: 'inclusion', distractor: true, text: t`Pour tout $\varepsilon>0$ : $B\big((a,b),\varepsilon\big)\subset\mathbb R^2\setminus K$.` },
    ],
    justifications: [
      { id: 'j-temoin', label: t`Un témoin explicite : $(0,0)$ vérifie la condition définissant $K$.` },
      { id: 'j-def-K', label: t`Définition de $K$.` },
      { id: 'j-coord', label: t`Convergence coordonnée par coordonnée : $|a_n-a|\le\|(a_n,b_n)-(a,b)\|$.` },
      { id: 'j-lim-large', label: t`Passage à la limite dans une inégalité large entre réels.` },
      { id: 'j-seq-ferme', label: t`Caractérisation séquentielle d'un fermé d'un espace métrique.` },
      { id: 'j-boule', label: t`Si $|y_1-a|<\varepsilon$, alors $y_1<a+\varepsilon=a/2<0$.` },
      { id: 'j-def-ouvert', label: 'Définition d’un ouvert : chaque point admet une boule incluse.' },
      { id: 'j-compl', label: 'Une partie est fermée si et seulement si son complémentaire est ouvert.' },
      { id: 'j-lipschitz', label: t`$|\pi_1(z)-\pi_1(z')|\le\|z-z'\|$ : application lipschitzienne.` },
      { id: 'j-intervalle', label: t`Le complémentaire $]-\infty,0[$ est ouvert dans $\mathbb R$.` },
      { id: 'j-preimage', label: 'L’image réciproque d’un fermé par une application continue est fermée.' },
      { id: 'j-produit', label: t`Un produit de deux fermés est fermé dans l'espace produit ($\mathbb R$ est fermé dans lui-même).` },
      { id: 'j-calc', label: 'Calcul direct sur les coordonnées.' },
      { id: 'j-somme-pos', label: t`Si $t\in[0,1]$, $a\ge 0$ et $c\ge 0$, chacun des termes $ta$ et $(1-t)c$ est positif.` },
      { id: 'j-def-convexe', label: 'Définition de la convexité.' },
      { id: 'j-thm-proj', label: 'Théorème de projection sur un convexe fermé non vide.', theorem: 'projection' },
      { id: 'j-carre', label: t`Si $a\ge 0$, alors $a+2\ge 2>0$, donc $(a+2)^2\ge 4$, et $(b-3)^2\ge 0$.` },
      { id: 'j-minimiseur', label: t`Le point qui réalise l'égalité appartient à $K$ et minimise la distance ; le minimiseur est unique.` },
      { id: 'j-ps', label: t`Calcul du produit scalaire, puis condition $a\ge 0$ définissant $K$.` },
      { id: 'j-synthese', label: 'Réunion des propriétés établies.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-evident', label: 'C’est évident.' },
      { id: 'j-lim-stricte', label: 'Une limite de réels positifs est strictement positive.' },
      { id: 'j-stampacchia', label: 'Théorème de Stampacchia.', theorem: 'stampacchia' },
    ],
    rules: [
      { from: ['d-K'], to: 'nonvide', by: 'j-temoin' },

      { from: ['s-suite', 'd-K'], to: 's-an-pos', by: 'j-def-K', path: 'suites' },
      { from: ['s-suite'], to: 's-an-conv', by: 'j-coord', path: 'suites' },
      { from: ['s-an-pos', 's-an-conv'], to: 's-a-pos', by: 'j-lim-large', path: 'suites' },
      { from: ['s-a-pos', 'd-K'], to: 's-lim-in', by: 'j-def-K', path: 'suites' },
      { from: ['s-lim-in'], to: 'ferme', by: 'j-seq-ferme', path: 'suites' },

      { from: ['c-point'], to: 'c-boule', by: 'j-boule', path: 'complementaire' },
      { from: ['c-boule'], to: 'c-ouvert', by: 'j-def-ouvert', path: 'complementaire' },
      { from: ['c-ouvert'], to: 'ferme', by: 'j-compl', path: 'complementaire' },

      { from: [], to: 'i-pi-cont', by: 'j-lipschitz', path: 'image-reciproque' },
      { from: [], to: 'i-ferme-R', by: 'j-intervalle' },
      { from: ['d-K'], to: 'i-eq', by: 'j-def-K', path: 'image-reciproque' },
      { from: ['i-pi-cont', 'i-ferme-R', 'i-eq'], to: 'ferme', by: 'j-preimage', path: 'image-reciproque' },

      { from: ['d-K'], to: 'p-prod', by: 'j-def-K', path: 'produit' },
      { from: ['p-prod', 'i-ferme-R'], to: 'ferme', by: 'j-produit', path: 'produit' },

      { from: ['v-pts'], to: 'v-coord', by: 'j-calc' },
      { from: ['v-pts', 'd-K'], to: 'v-pos', by: 'j-somme-pos' },
      { from: ['v-coord', 'v-pos', 'd-K'], to: 'convexe', by: 'j-def-convexe' },

      { from: ['h-hilbert', 'nonvide', 'ferme', 'convexe'], to: 'thm', by: 'j-thm-proj' },

      { from: ['d-x'], to: 'm-dist', by: 'j-calc' },
      { from: ['m-dist', 'd-K'], to: 'm-ineg', by: 'j-carre' },
      { from: ['m-ineg', 'thm'], to: 'p-val', by: 'j-minimiseur' },

      { from: ['d-x', 'p-val'], to: 'q-vect', by: 'j-calc' },
      { from: ['q-vect', 'd-K'], to: 'carac', by: 'j-ps' },

      { from: ['nonvide', 'ferme', 'convexe', 'p-val', 'carac'], to: 'fin', by: 'j-synthese' },
    ],
    traps: [
      {
        conclusion: 's-a-pos',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`Déclarer $a\ge 0$ ne le démontre pas. Quelles propriétés de $(a_n)$ sont connues, et quel résultat les fait passer à la limite ?`,
      },
      {
        conclusion: 'ferme',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: 'La fermeture se démontre. Plusieurs voies sont possibles : les suites, le complémentaire, une image réciproque, un produit.',
      },
      {
        conclusion: 'x-strict',
        verdict: 'incorrect',
        concept: 'inegalite-stricte-limite',
        message: t`Le passage à la limite ne conserve que les inégalités larges : on obtient $a\ge 0$, pas $a>0$.`,
        counterexample: t`$a_n=1/n>0$ et $a_n\to 0$.`,
      },
      {
        conclusion: 's-a-pos',
        by: 'j-lim-stricte',
        verdict: 'incorrect',
        concept: 'inegalite-stricte-limite',
        message: 'Cette justification est fausse : une limite de réels positifs peut être nulle.',
        counterexample: t`$a_n=1/n$.`,
      },
      {
        conclusion: 'x-carac-strict',
        verdict: 'incorrect',
        concept: 'inegalite-stricte-limite',
        message: t`Pour $z=(0,b)\in K$, on a $a=0$ et donc $\langle x-p,z-p\rangle=0$ : l'inégalité n'est pas stricte en général.`,
        counterexample: t`$z=(0,0)$ donne $\langle x-p,z-p\rangle=0$.`,
      },
      {
        conclusion: 'x-forall-eps',
        verdict: 'incorrect',
        concept: 'quantificateurs',
        message: t`La définition d'un ouvert demande qu'il existe un rayon convenable, non que tous les rayons conviennent.`,
        counterexample: t`Pour $(a,b)=(-1,0)$ et $\varepsilon=2$, la boule contient $(0,0)\in K$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'ferme',
        label: 'Ne plus disposer de la fermeture',
        necessary: true,
        explanation: t`Sans fermeture, le théorème de projection ne peut plus être invoqué : l'infimum peut ne pas être atteint.`,
        counterexample: t`$K'=\{(a,b) : a>0\}$ est convexe non vide mais non fermé. Pour $x=(-2,3)$ : $\inf_{z\in K'}\|x-z\|=2$, et aucun point de $K'$ ne réalise cette distance, car $\|x-(a,b)\|\ge a+2>2$.`,
      },
      {
        hypothesis: 'convexe',
        label: 'Ne plus disposer de la convexité',
        necessary: true,
        explanation: t`Sans convexité, le minimiseur peut ne pas être unique, et le théorème ne s'applique plus.`,
        counterexample: t`$K'=\{(a,b) : |a|\ge 1\}$ est fermé non vide, non convexe. Pour $x=(0,0)$, les points $(1,0)$ et $(-1,0)$ réalisent tous deux la distance minimale $1$.`,
      },
      {
        hypothesis: 'nonvide',
        label: 'Ne plus disposer de la non-vacuité',
        necessary: true,
        explanation: t`Si $K$ est vide, l'infimum sur $K$ n'a pas de point qui le réalise.`,
        counterexample: t`$K'=\emptyset$ est fermé et convexe, et aucun point ne peut être sa projection.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Distance $d(x,K)$`, expected: '2' }],
  solution: t`**Non-vacuité.** $(0,0)\in K$.

**Fermeture** (trois voies du polycopié, une voie supplémentaire ici).

- *Complémentaire ouvert.* Si $(a,b)\notin K$, alors $a<0$. Le rayon $\varepsilon=-a/2>0$ convient : $|y_1-a|<\varepsilon$ entraîne $y_1<a+\varepsilon=a/2<0$.
- *Image réciproque.* La projection $\pi_1$ est continue et $K=\pi_1^{-1}([0,+\infty[)$, où l'intervalle est fermé dans $\mathbb R$.
- *Suites.* Si $(a_n,b_n)\in K$ converge vers $(a,b)$, alors $a_n\ge 0$ et $a_n\to a$ ; le passage à la limite dans une inégalité large donne $a\ge 0$.
- *Produit.* $K=[0,+\infty[\times\mathbb R$ est un produit de deux fermés.

**Convexité.** Si $(a,b),(c,d)\in K$ et $t\in[0,1]$, la première coordonnée de $t(a,b)+(1-t)(c,d)$ vaut $ta+(1-t)c\ge 0$.

**Projection.** Pour $(a,b)\in K$, $\|x-(a,b)\|^2=(a+2)^2+(b-3)^2\ge 4$, avec égalité exactement si $a=0$ et $b=3$. Le théorème garantit existence et unicité, et le calcul identifie $P_Kx=(0,3)$.

**Caractérisation.** Pour $z=(a,b)\in K$, $x-p=(-2,0)$ et $z-p=(a,b-3)$, donc $\langle x-p,z-p\rangle=-2a\le 0$. L'inégalité n'est pas stricte en général, car $a=0$ est possible.`,
  steps: [
    'Établir la non-vacuité par un témoin.',
    'Établir la fermeture par l’une des voies disponibles.',
    'Établir la convexité.',
    'Invoquer le théorème de projection, hypothèses vérifiées.',
    'Identifier le projeté par minimisation explicite.',
    'Vérifier l’inégalité caractéristique, large.',
  ],
  commonErrors: [
    { id: 'e-declaration', description: t`Écrire « $a\ge 0$ » sans dire d'où cela vient.`, concept: 'justification-absente' },
    { id: 'e-stricte', description: t`Remplacer $\le$ par $<$ dans l'inégalité caractéristique.`, concept: 'inegalite-stricte-limite' },
    { id: 'e-quantif', description: t`Confondre $\exists\varepsilon$ et $\forall\varepsilon$ dans la définition d'un ouvert.`, concept: 'quantificateurs' },
  ],
  hints: [
    t`Avant de calculer quoi que ce soit, quelles propriétés de $K$ le théorème de projection exige-t-il ?`,
    t`La fermeture admet plusieurs démonstrations. La plus directe part de $(a_n,b_n)\in K$ convergente, et isole la première coordonnée. Pour le calcul, développe $\|x-(a,b)\|^2$ et utilise $a\ge 0$.`,
    t`Pour la fermeture par suites : $a_n\ge 0$, $a_n\to a$, puis inégalité large à la limite. Pour le calcul : $(a+2)^2\ge 4$ si $a\ge 0$, avec égalité si et seulement si $a=0$.`,
  ],
  rubric: rubric({
    hypotheses: t`Non-vacuité, fermeture et convexité sont établies avant d'invoquer le théorème.`,
    methode: 'La fermeture est démontrée par une voie complète ; le projeté est identifié par minimisation.',
    validite: 'Chaque étape suit une règle identifiée, sans inégalité stricte abusive.',
    justifications: 'Aucune assertion n’est simplement déclarée.',
    conclusion: t`La valeur $P_Kx=(0,3)$ et l'inégalité large $-2a\le 0$ sont obtenues.`,
  }),
  variant: {
    statement: t`Dans $\mathbb R^2$ euclidien, soit $K=\{(a,b) : b\le 1\}$ et $x=(4,5)$. Montrer que $K$ est un convexe fermé non vide, calculer $P_Kx$ et vérifier l'inégalité caractéristique.`,
    solution: t`$K$ est non vide ($(0,0)\in K$), fermé (image réciproque de $]-\infty,1]$ par la seconde coordonnée, continue) et convexe. Pour $(a,b)\in K$ : $\|x-(a,b)\|^2=(a-4)^2+(b-5)^2\ge 16$, avec égalité si et seulement si $a=4$ et $b=1$, car $b\le 1$ donne $5-b\ge 4$. Donc $P_Kx=(4,1)$. Enfin, pour $z=(a,b)\in K$, $\langle x-p,z-p\rangle=\langle(0,4),(a-4,b-1)\rangle=4(b-1)\le 0$.`,
    closedChecks: [{ kind: 'rational-vector', prompt: t`Coordonnées de $P_Kx$`, expected: ['4', '1'], labels: ['p₁', 'p₂'] }],
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h-hilbert', kind: 'hypothese', text: t`$H=\mathbb R^2$, euclidien, est un espace de Hilbert réel.` },
        { id: 'd-K', kind: 'definition', text: t`$K=\{(a,b)\in\mathbb R^2 : b\le 1\}$.` },
        { id: 'd-x', kind: 'definition', text: t`$x=(4,5)$.` },
        { id: 'nonvide', kind: 'consequence', text: t`$K\neq\emptyset$.` },
        { id: 'ferme', kind: 'consequence', text: t`$K$ est fermé dans $\mathbb R^2$.` },
        { id: 'convexe', kind: 'consequence', text: t`$K$ est convexe.` },
        { id: 'thm', kind: 'application-theoreme', text: t`$P_Kx$ existe et est unique.` },
        { id: 'm-ineg', kind: 'inegalite', text: t`Pour $(a,b)\in K$ : $\|x-(a,b)\|^2=(a-4)^2+(b-5)^2\ge 16$, avec égalité si et seulement si $a=4$ et $b=1$.` },
        {
          id: 'p-val',
          kind: 'egalite',
          text: t`$P_Kx=(4,1)$.`,
          masked: t`Valeur de $P_Kx$ : à calculer.`,
          check: { kind: 'rational-vector', prompt: t`Coordonnées de $P_Kx$`, expected: ['4', '1'], labels: ['p₁', 'p₂'] },
        },
        { id: 'carac', kind: 'inegalite', text: t`$\langle x-p,z-p\rangle=4(b-1)\le 0$ pour tout $z=(a,b)\in K$.` },
        { id: 'fin', kind: 'conclusion', text: t`$K$ est un convexe fermé non vide, et $P_Kx$ est calculé et caractérisé.` },
        { id: 'x-strict', kind: 'inegalite', distractor: true, text: t`$\langle x-p,z-p\rangle<0$ pour tout $z\in K$.` },
      ],
      justifications: [
        { id: 'j-temoin', label: t`Témoin explicite : $(0,0)\in K$.` },
        { id: 'j-preimage', label: t`Image réciproque de $]-\infty,1]$ par la seconde coordonnée, application continue.` },
        { id: 'j-convexe', label: t`Si $b,d\le 1$ et $t\in[0,1]$, alors $tb+(1-t)d\le 1$.` },
        { id: 'j-thm', label: 'Théorème de projection sur un convexe fermé non vide.', theorem: 'projection' },
        { id: 'j-carre', label: t`Si $b\le 1$, alors $5-b\ge 4$, donc $(b-5)^2\ge 16$.` },
        { id: 'j-min', label: t`Le point réalisant l'égalité appartient à $K$ et minimise la distance.` },
        { id: 'j-ps', label: t`Calcul : $x-p=(0,4)$, $z-p=(a-4,b-1)$, et $b\le 1$.` },
        { id: 'j-syn', label: 'Réunion des propriétés établies.' },
        { id: 'j-evident', label: 'C’est évident.' },
      ],
      rules: [
        { from: ['d-K'], to: 'nonvide', by: 'j-temoin' },
        { from: ['d-K'], to: 'ferme', by: 'j-preimage' },
        { from: ['d-K'], to: 'convexe', by: 'j-convexe' },
        { from: ['h-hilbert', 'nonvide', 'ferme', 'convexe'], to: 'thm', by: 'j-thm' },
        { from: ['d-x', 'd-K'], to: 'm-ineg', by: 'j-carre' },
        { from: ['m-ineg', 'thm'], to: 'p-val', by: 'j-min' },
        { from: ['p-val', 'd-x', 'd-K'], to: 'carac', by: 'j-ps' },
        { from: ['nonvide', 'ferme', 'convexe', 'p-val', 'carac'], to: 'fin', by: 'j-syn' },
      ],
      traps: [
        {
          conclusion: 'x-strict',
          verdict: 'incorrect',
          concept: 'inegalite-stricte-limite',
          message: t`Pour $z=(0,1)\in K$, on a $b=1$ et le produit scalaire est nul : l'inégalité n'est pas stricte.`,
          counterexample: t`$z=(0,1)$.`,
        },
        {
          conclusion: 'ferme',
          by: 'j-evident',
          verdict: 'a-justifier',
          concept: 'justification-absente',
          message: 'La fermeture se démontre : identifie un fermé et une application continue.',
        },
      ],
      removable: [
        {
          hypothesis: 'ferme',
          label: 'Ne plus disposer de la fermeture',
          necessary: true,
          explanation: 'Sans fermeture, le théorème ne peut plus être invoqué.',
          counterexample: t`$K'=\{(a,b) : b<1\}$ : pour $x=(4,5)$, l'infimum $4$ n'est atteint en aucun point de $K'$.`,
        },
      ],
    },
  },
  verification: FROM_POLY,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'projection.intermediaire',
  theoremId: 'projection',
  level: 'intermediaire',
  title: 'Projection sur le cône positif de $L^2$',
  statement: t`Dans $H=L^2(]0,1[)$, soit $K_2=\{u\in L^2(]0,1[) : u\ge 0\ \text{p.p.}\}$. Démontrer que $K_2$ est convexe et fermé, et que $P_{K_2}f=f^+=\max(f,0)$ pour tout $f\in H$.`,
  source: poly(35, 'Atelier 9.2 (p. PDF 35–36) ; exercice 1, intermédiaire (p. PDF 38)'),
  prerequisites: [],
  concepts: ['fermeture-espace', 'norme-signe', 'convergence-pp', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'mesure', label: 'Fermeture par l’ensemble où la limite est négative' },
      { id: 'sous-suite', label: 'Fermeture par extraction presque partout' },
      { id: 'caracterisation', label: 'Identification par l’inégalité caractéristique' },
      { id: 'directe', label: 'Identification par minimisation ponctuelle' },
    ],
    nodes: [
      { id: 'h-hilbert', kind: 'hypothese', text: t`$H=L^2(]0,1[)$ est un espace de Hilbert réel.` },
      { id: 'd-K', kind: 'definition', text: t`$K_2=\{u\in L^2(]0,1[) : u\ge 0\ \text{p.p.}\}$.` },
      { id: 'd-f', kind: 'definition', text: t`$f\in H$ est fixée et $f^+=\max(f,0)$.` },

      { id: 'nonvide', kind: 'consequence', text: t`$K_2\neq\emptyset$.` },

      { id: 'v-pts', kind: 'definition', local: true, text: t`Soient $u,v\in K_2$ et $t\in[0,1]$.` },
      { id: 'v-pp', kind: 'inegalite', text: t`$tu+(1-t)v\ge 0$ presque partout.` },
      { id: 'convexe', kind: 'consequence', text: t`$K_2$ est convexe.` },

      { id: 's-suite', kind: 'definition', local: true, text: t`Soit $(u_n)\subset K_2$ avec $u_n\to u$ dans $L^2(]0,1[)$ ; on note $E=\{x : u(x)<0\}$.` },
      { id: 's-ponct', kind: 'inegalite', text: t`Pour presque tout $x\in E$ : $|u_n(x)-u(x)|^2\ge|u(x)|^2$.` },
      { id: 's-int', kind: 'inegalite', text: t`Pour tout $n$ : $0\le\int_E|u|^2\le\|u_n-u\|_{L^2}^2$.` },
      { id: 's-nul', kind: 'egalite', text: t`$\int_E|u|^2=0$.` },
      { id: 's-negl', kind: 'consequence', text: t`$E$ est négligeable.` },
      { id: 'a-sous', kind: 'consequence', text: t`Une sous-suite $(u_{n_k})$ converge vers $u$ presque partout.` },
      { id: 's-lim', kind: 'consequence', text: t`$u\in K_2$.` },
      { id: 'ferme', kind: 'consequence', text: t`$K_2$ est fermé dans $L^2(]0,1[)$.` },

      { id: 'thm', kind: 'application-theoreme', text: t`Pour tout $f\in H$, $P_{K_2}f$ existe et est unique ; il est caractérisé par $p\in K_2$ et $\langle f-p,g-p\rangle\le 0$ pour tout $g\in K_2$.` },

      { id: 'fp-in', kind: 'consequence', text: t`$f^+\in K_2$.` },
      { id: 'fp-prod', kind: 'inegalite', text: t`Pour tout $g\in K_2$ et presque tout $x$ : $(f-f^+)(g-f^+)\le 0$.` },
      { id: 'fp-int', kind: 'inegalite', text: t`$\langle f-f^+,g-f^+\rangle_{L^2}\le 0$ pour tout $g\in K_2$.` },

      { id: 'd-pt', kind: 'inegalite', text: t`Pour tout $g\in K_2$ et presque tout $x$ : $|f-g|\ge|f-f^+|$.` },
      { id: 'd-int', kind: 'inegalite', text: t`$\|f-g\|_{L^2}\ge\|f-f^+\|_{L^2}$ pour tout $g\in K_2$.` },

      { id: 'fin', kind: 'conclusion', text: t`$P_{K_2}f=f^+$.` },

      { id: 'x-norme', kind: 'consequence', distractor: true, text: t`Puisque $\|u_n\|\to\|u\|$ et $u_n\ge 0$, on a $u\ge 0$ presque partout.` },
      { id: 'x-pp', kind: 'consequence', distractor: true, text: t`La suite entière $(u_n)$ converge vers $u$ presque partout.` },
    ],
    justifications: [
      { id: 'j-zero', label: t`La fonction nulle appartient à $K_2$.` },
      { id: 'j-negl', label: t`Combinaison convexe de réels positifs, hors de la réunion de deux ensembles négligeables.` },
      { id: 'j-def-convexe', label: 'Définition de la convexité.' },
      { id: 'j-signe', label: t`$u_n\ge 0$ p.p. et $u<0$ sur $E$ donnent $u_n-u\ge -u=|u|>0$ p.p. sur $E$.` },
      { id: 'j-integre-E', label: t`Intégration sur $E$ de l'inégalité ponctuelle, puis majoration par l'intégrale sur $]0,1[$.` },
      { id: 'j-limite', label: t`$\|u_n-u\|_{L^2}\to 0$ quand $n\to\infty$.` },
      { id: 'j-int-nulle', label: t`$|u|^2>0$ sur $E$ : une intégrale nulle impose $|E|=0$.` },
      { id: 'j-def-K', label: t`Définition de $K_2$.` },
      { id: 'j-extraction', label: t`Toute suite convergente dans $L^2$ admet une sous-suite convergeant presque partout.` },
      { id: 'j-lim-pp', label: t`Passage à la limite ponctuelle dans $u_{n_k}\ge 0$, hors d'un ensemble négligeable.` },
      { id: 'j-seq-ferme', label: 'Caractérisation séquentielle d’un fermé d’un espace métrique.' },
      { id: 'j-thm', label: 'Théorème de projection et caractérisation variationnelle.', theorem: 'projection' },
      { id: 'j-fplus', label: t`$0\le f^+\le|f|$ donne $f^+\in L^2$ et $f^+\ge 0$.` },
      { id: 'j-cas', label: t`Disjonction : si $f(x)\ge 0$ le produit est nul ; si $f(x)<0$ il vaut $f(x)g(x)\le 0$.` },
      { id: 'j-integre', label: t`Intégration d'une inégalité ponctuelle sur $]0,1[$.` },
      { id: 'j-cas-dist', label: t`Disjonction : si $f(x)\ge 0$, le membre de droite est nul ; si $f(x)<0$, alors $g(x)-f(x)\ge -f(x)>0$.` },
      { id: 'j-minimiseur', label: t`$f^+\in K_2$ minimise la distance à $f$ sur $K_2$, et le minimiseur est unique.` },
      { id: 'j-caract', label: t`$f^+$ satisfait la caractérisation variationnelle de la projection.` },
      { id: 'j-norme-signe', label: 'La convergence des normes impose le signe de la limite.' },
      { id: 'j-cv-pp', label: t`La convergence dans $L^2$ implique la convergence presque partout de la suite entière.` },
    ],
    rules: [
      { from: ['d-K'], to: 'nonvide', by: 'j-zero' },

      { from: ['v-pts', 'd-K'], to: 'v-pp', by: 'j-negl' },
      { from: ['v-pp'], to: 'convexe', by: 'j-def-convexe' },

      { from: ['s-suite', 'd-K'], to: 's-ponct', by: 'j-signe', path: 'mesure' },
      { from: ['s-ponct'], to: 's-int', by: 'j-integre-E', path: 'mesure' },
      { from: ['s-int', 's-suite'], to: 's-nul', by: 'j-limite', path: 'mesure' },
      { from: ['s-nul'], to: 's-negl', by: 'j-int-nulle', path: 'mesure' },
      { from: ['s-negl', 'd-K'], to: 's-lim', by: 'j-def-K', path: 'mesure' },

      { from: ['s-suite'], to: 'a-sous', by: 'j-extraction', path: 'sous-suite' },
      { from: ['a-sous', 'd-K'], to: 's-lim', by: 'j-lim-pp', path: 'sous-suite' },

      { from: ['s-lim'], to: 'ferme', by: 'j-seq-ferme' },

      { from: ['h-hilbert', 'nonvide', 'ferme', 'convexe'], to: 'thm', by: 'j-thm' },

      { from: ['d-f'], to: 'fp-in', by: 'j-fplus' },
      { from: ['d-f', 'd-K'], to: 'fp-prod', by: 'j-cas', path: 'caracterisation' },
      { from: ['fp-prod'], to: 'fp-int', by: 'j-integre', path: 'caracterisation' },
      { from: ['thm', 'fp-in', 'fp-int'], to: 'fin', by: 'j-caract', path: 'caracterisation' },

      { from: ['d-f', 'd-K'], to: 'd-pt', by: 'j-cas-dist', path: 'directe' },
      { from: ['d-pt'], to: 'd-int', by: 'j-integre', path: 'directe' },
      { from: ['thm', 'fp-in', 'd-int'], to: 'fin', by: 'j-minimiseur', path: 'directe' },
    ],
    traps: [
      {
        conclusion: 'x-norme',
        verdict: 'incorrect',
        concept: 'norme-signe',
        message: t`La convergence des normes ne dit rien du signe : $\|u_n\|\to\|u\|$ vaut aussi pour $u_n=|u|$ lorsque $u$ change de signe.`,
        counterexample: t`$u=\mathbb 1_{]0,1/2[}-\mathbb 1_{]1/2,1[}$, $u_n=|u|=1$ : $u_n\ge 0$, $\|u_n\|=\|u\|$, mais $u$ n'est pas positive.`,
      },
      {
        conclusion: 'x-pp',
        verdict: 'incorrect',
        concept: 'convergence-pp',
        message: t`La convergence dans $L^2$ ne donne la convergence presque partout que pour une sous-suite.`,
        counterexample: t`La suite des indicatrices d'intervalles dyadiques balayant $[0,1]$ tend vers $0$ dans $L^2$, et ne converge en aucun point.`,
      },
      {
        conclusion: 's-lim',
        by: 'j-norme-signe',
        verdict: 'incorrect',
        concept: 'norme-signe',
        message: t`Cette justification est fausse. Le signe de la limite doit être obtenu à partir de l'information ponctuelle $u_n\ge 0$ p.p.`,
        counterexample: t`$u=\mathbb 1_{]0,1/2[}-\mathbb 1_{]1/2,1[}$ et $u_n=|u|$.`,
      },
      {
        conclusion: 'a-sous',
        by: 'j-cv-pp',
        verdict: 'incorrect',
        concept: 'convergence-pp',
        message: 'Seule une sous-suite converge presque partout en général : la suite entière peut ne converger en aucun point.',
      },
    ],
    removable: [
      {
        hypothesis: 'ferme',
        label: 'Ne plus disposer de la fermeture',
        necessary: true,
        explanation: t`La projection n'est plus assurée sur un convexe non fermé de $L^2$.`,
        counterexample: t`$K'=\{u\in C([0,1]) : u\ge 0\}$ est convexe, non vide et non fermé dans $L^2$. Pour $f=\mathbb 1_{]1/2,1[}$, on a $\inf_{g\in K'}\|f-g\|=0$ et cet infimum n'est pas atteint, car $f$ n'a pas de représentant continu.`,
      },
      {
        hypothesis: 'convexe',
        label: 'Ne plus disposer de la convexité',
        necessary: true,
        explanation: 'L’unicité du minimiseur peut être perdue.',
        counterexample: t`Sur la sphère unité de $L^2$, fermée non vide et non convexe, tout point est à distance $1$ de $f=0$.`,
      },
    ],
  },
  solution: t`**Convexité.** Si $u,v\ge 0$ presque partout et $t\in[0,1]$, alors $tu+(1-t)v\ge 0$ presque partout : les ensembles exceptionnels se réunissent en un ensemble négligeable.

**Fermeture.** Soit $u_n\in K_2$ avec $u_n\to u$ dans $L^2$ ; posons $E=\{u<0\}$. Sur $E$, comme $u_n\ge 0$ p.p., on a $u_n-u\ge -u>0$, donc $|u_n-u|^2\ge|u|^2$. Ainsi $0\le\int_E|u|^2\le\|u_n-u\|^2_{L^2}\to 0$, d'où $\int_E|u|^2=0$. Comme $|u|^2>0$ sur $E$, l'ensemble $E$ est négligeable et $u\in K_2$.

**Projection.** $0\le f^+\le|f|$ entraîne $f^+\in K_2$. Pour $g\in K_2$ : si $f\ge 0$, alors $(f-f^+)(g-f^+)=0$ ; si $f<0$, alors le produit vaut $fg\le 0$. En intégrant, $\langle f-f^+,g-f^+\rangle\le 0$ pour tout $g\in K_2$, et le théorème de projection donne $P_{K_2}f=f^+$.`,
  steps: [
    'Établir la convexité presque partout.',
    t`Établir la fermeture dans la norme de $L^2$.`,
    t`Vérifier que $f^+$ appartient au cône.`,
    'Obtenir l’inégalité ponctuelle, puis l’intégrer.',
    'Conclure par la caractérisation variationnelle.',
  ],
  commonErrors: [
    { id: 'e-norme-signe', description: 'Conclure au signe de la limite à partir de la seule convergence des normes.', concept: 'norme-signe' },
    { id: 'e-pp', description: t`Affirmer la convergence presque partout de toute la suite à partir de la convergence dans $L^2$.`, concept: 'convergence-pp' },
  ],
  hints: [
    t`La fermeture s'étudie ici pour la norme de $L^2$. Où peut se cacher le défaut de positivité de la limite ?`,
    t`Isole l'ensemble $E=\{u<0\}$ et compare $|u_n-u|$ et $|u|$ sur $E$. Pour l'identification du projeté, raisonne ponctuellement selon le signe de $f(x)$.`,
    t`Sur $E$, $u_n-u\ge -u>0$ p.p. : donc $\int_E|u|^2\le\|u_n-u\|^2$. Pour le produit : si $f<0$, il vaut $f\,g$, négatif car $g\ge 0$.`,
  ],
  rubric: rubric({
    hypotheses: t`Convexité, fermeture dans $L^2$ et appartenance de $f^+$ au cône sont établies.`,
    methode: 'Le projeté est identifié par la caractérisation variationnelle ou par minimisation ponctuelle.',
    validite: 'Les arguments presque partout sont correctement localisés.',
    justifications: t`La convergence dans $L^2$ n'est pas confondue avec une convergence ponctuelle.`,
    conclusion: t`L'égalité $P_{K_2}f=f^+$ est obtenue pour tout $f\in H$.`,
  }),
  variant: {
    statement: t`Dans $H=L^2(]0,1[)$, soit $K=\{u\in L^2(]0,1[) : u\le 1\ \text{p.p.}\}$. Démontrer que $K$ est convexe et fermé, et déterminer $P_Kf$.`,
    solution: t`$K$ est convexe, et si $u_n\to u$ avec $u_n\le 1$, l'ensemble $E=\{u>1\}$ vérifie $|u_n-u|\ge u-1$ sur $E$, d'où $\int_E(u-1)^2\le\|u_n-u\|^2\to 0$, donc $E$ est négligeable. On pose $p=\min(f,1)$ : $p\in L^2$ car $|p|\le|f|+1$ sur un intervalle borné, et $p\in K$. Pour $g\in K$ : si $f\le 1$, $f-p=0$ ; si $f>1$, $(f-p)(g-p)=(f-1)(g-1)\le 0$. Par intégration et caractérisation, $P_Kf=\min(f,1)$.`,
  },
  verification: FROM_POLY,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'projection.difficile',
  theoremId: 'projection',
  level: 'difficile',
  title: 'Inéquation variationnelle sur $H^1_0(]0,1[)$',
  statement: t`Soit $V=H^1_0(]0,1[)$ muni de $(u,v)_V=\int_0^1 u'v'$, soit $K=\{v\in V : v\ge 0\ \text{p.p.}\}$ et soit $f\in V'$. Montrer qu'il existe un unique $u\in K$ tel que $(u,v-u)_V\ge\langle f,v-u\rangle$ pour tout $v\in K$, en utilisant Riesz puis la projection.`,
  source: poly(36, 'Atelier 9.3 ; exercice 1, difficile (p. PDF 38)'),
  prerequisites: ['riesz', 'poincare', 'distributions'],
  concepts: ['densite-fermeture', 'fermeture-espace', 'existence-unicite', 'utilisation-prematuree', 'hypotheses-theoreme'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-V', kind: 'hypothese', text: t`$V=H^1_0(]0,1[)$, muni de $(u,v)_V=\int_0^1u'v'$, est un espace de Hilbert réel (norme équivalente à celle de $H^1$, par Poincaré).` },
      { id: 'd-K', kind: 'definition', text: t`$K=\{v\in V : v\ge 0\ \text{p.p.}\}$.` },
      { id: 'h-f', kind: 'hypothese', text: t`$f\in V'$.` },
      { id: 'h-K2', kind: 'hypothese', text: t`Le cône $K_2=\{u\in L^2 : u\ge 0\ \text{p.p.}\}$ est fermé dans $L^2(]0,1[)$ (exercice précédent).` },
      { id: 'h-inj', kind: 'hypothese', text: t`L'injection $V\hookrightarrow L^2(]0,1[)$ est continue.` },

      { id: 'nonvide', kind: 'consequence', text: t`$K\neq\emptyset$.` },
      { id: 'convexe', kind: 'consequence', text: t`$K$ est convexe.` },

      { id: 'c-suite', kind: 'definition', local: true, text: t`Soit $(u_n)\subset K$ avec $u_n\to u$ dans $V$.` },
      { id: 'c-L2', kind: 'consequence', text: t`$u_n\to u$ dans $L^2(]0,1[)$.` },
      { id: 'c-K2', kind: 'consequence', text: t`$u\in K_2$.` },
      { id: 'c-V', kind: 'consequence', text: t`$u\in V$.` },
      { id: 'c-in', kind: 'consequence', text: t`$u\in V\cap K_2=K$.` },
      { id: 'ferme', kind: 'consequence', text: t`$K$ est fermé dans $V$.` },

      { id: 'riesz', kind: 'application-theoreme', text: t`Il existe un unique $w\in V$ tel que $(w,h)_V=\langle f,h\rangle$ pour tout $h\in V$.` },
      { id: 'proj', kind: 'application-theoreme', text: t`$u:=P_Kw$ existe, $u\in K$ et $(w-u,v-u)_V\le 0$ pour tout $v\in K$.` },
      { id: 'exist', kind: 'inegalite', text: t`$(u,v-u)_V\ge(w,v-u)_V=\langle f,v-u\rangle$ pour tout $v\in K$.` },

      { id: 'u-sol', kind: 'definition', local: true, text: t`Soient $u_1,u_2\in K$ deux solutions de l'inéquation.` },
      { id: 'u-somme', kind: 'inegalite', text: t`$(u_1,u_2-u_1)_V+(u_2,u_1-u_2)_V\ge\langle f,u_2-u_1\rangle+\langle f,u_1-u_2\rangle=0$.` },
      { id: 'u-norme', kind: 'inegalite', text: t`$-\|u_1-u_2\|_V^2\ge 0$.` },
      { id: 'unique', kind: 'consequence', text: t`$u_1=u_2$.` },

      { id: 'fin', kind: 'conclusion', text: t`Il existe un unique $u\in K$ tel que $(u,v-u)_V\ge\langle f,v-u\rangle$ pour tout $v\in K$.` },

      { id: 'x-V-ferme', kind: 'consequence', distractor: true, text: t`$V=H^1_0(]0,1[)$ est fermé dans $L^2(]0,1[)$.` },
      { id: 'x-unique-seul', kind: 'consequence', distractor: true, after: ['proj'], text: t`L'existence de $P_Kw$ suffit à conclure à l'unicité de la solution de l'inéquation, sans autre argument.` },
    ],
    justifications: [
      { id: 'j-zero', label: t`La fonction nulle appartient à $K$.` },
      { id: 'j-conv', label: 'Une combinaison convexe de fonctions positives p.p. est positive p.p.' },
      { id: 'j-inj', label: t`Continuité de l'injection $V\hookrightarrow L^2$.` },
      { id: 'j-K2', label: t`Fermeture de $K_2$ dans $L^2$, et $u_n\in K_2$.` },
      { id: 'j-lim-V', label: t`La convergence est posée dans $V$ : la limite appartient à $V$ par construction.` },
      { id: 'j-inter', label: t`Définition de $K$ comme $V\cap K_2$.` },
      { id: 'j-seq', label: 'Caractérisation séquentielle d’un fermé d’un espace métrique.' },
      { id: 'j-riesz', label: 'Théorème de représentation de Riesz.', theorem: 'riesz' },
      { id: 'j-proj', label: 'Théorème de projection sur un convexe fermé non vide et caractérisation variationnelle.', theorem: 'projection' },
      { id: 'j-reecrit', label: t`Développement de $(w-u,v-u)_V\le 0$, puis définition de $w$.` },
      { id: 'j-tester', label: t`Tester la première solution par $v=u_2$, la seconde par $v=u_1$, et additionner.` },
      { id: 'j-dev', label: t`Le membre de gauche vaut $-\|u_1-u_2\|_V^2$.` },
      { id: 'j-norme-nulle', label: t`Une norme positive ou nulle dont l'opposé est positif ou nul est nulle.` },
      { id: 'j-syn', label: 'Réunion de l’existence et de l’unicité.' },
      { id: 'j-V-ferme', label: t`$H^1_0(]0,1[)$ est fermé dans $L^2(]0,1[)$.` },
      { id: 'j-stampacchia', label: 'Théorème de Stampacchia.', theorem: 'stampacchia' },
    ],
    rules: [
      { from: ['d-K'], to: 'nonvide', by: 'j-zero' },
      { from: ['d-K'], to: 'convexe', by: 'j-conv' },

      { from: ['c-suite', 'h-inj'], to: 'c-L2', by: 'j-inj' },
      { from: ['c-L2', 'c-suite', 'h-K2'], to: 'c-K2', by: 'j-K2' },
      { from: ['c-suite'], to: 'c-V', by: 'j-lim-V' },
      { from: ['c-K2', 'c-V', 'd-K'], to: 'c-in', by: 'j-inter' },
      { from: ['c-in'], to: 'ferme', by: 'j-seq' },

      { from: ['h-V', 'h-f'], to: 'riesz', by: 'j-riesz' },
      { from: ['h-V', 'nonvide', 'ferme', 'convexe', 'riesz'], to: 'proj', by: 'j-proj' },
      { from: ['proj', 'riesz'], to: 'exist', by: 'j-reecrit' },

      { from: ['u-sol'], to: 'u-somme', by: 'j-tester' },
      { from: ['u-somme'], to: 'u-norme', by: 'j-dev' },
      { from: ['u-norme'], to: 'unique', by: 'j-norme-nulle' },

      { from: ['exist', 'unique'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-V-ferme',
        verdict: 'incorrect',
        concept: 'densite-fermeture',
        message: 'La densité et la fermeture sont deux propriétés différentes. Vérifie dans quel espace et pour quelle norme la fermeture est étudiée.',
        counterexample: t`$H^1_0(]0,1[)$ est dense et strict dans $L^2(]0,1[)$ : la fonction constante $1$ est limite dans $L^2$ d'éléments de $H^1_0$ sans appartenir à $H^1_0$.`,
      },
      {
        conclusion: 'c-V',
        by: 'j-V-ferme',
        verdict: 'incorrect',
        concept: 'densite-fermeture',
        message: t`$u\in V$ ne vient pas d'une fermeture de $V$ dans $L^2$, qui est fausse : la limite appartient à $V$ parce que la convergence est posée dans $V$.`,
      },
      {
        conclusion: 'x-unique-seul',
        verdict: 'a-justifier',
        concept: 'existence-unicite',
        message: t`L'unicité de $P_Kw$ ne dit rien, à elle seule, d'une solution quelconque de l'inéquation : teste les solutions l'une par l'autre.`,
      },
    ],
    removable: [
      {
        hypothesis: 'ferme',
        label: 'Ne plus disposer de la fermeture',
        necessary: true,
        explanation: t`Sans fermeture de $K$ dans $V$, $P_K$ n'est plus défini et le candidat $u=P_Kw$ disparaît.`,
        counterexample: t`$K'=\{v\in C^\infty_c(]0,1[) : v\ge 0\}$ est convexe, non fermé dans $V$. Si $w\in V$, $w\ge 0$, n'appartient pas à $K'$, alors $\inf_{v\in K'}\|w-v\|_V=0$ n'est pas atteint.`,
      },
      {
        hypothesis: 'h-f',
        label: t`Retirer $f\in V'$`,
        necessary: true,
        explanation: t`Riesz n'a pas d'objet si $f$ n'est pas une forme linéaire continue sur $V$.`,
        counterexample: t`La forme $v\mapsto v'(1/2)$, définie sur $C^\infty_c(]0,1[)$, n'est pas continue pour la norme de $V$ : elle n'admet pas de représentant dans $V$.`,
      },
    ],
  },
  solution: t`**Non-vacuité, convexité.** $0\in K$, et une combinaison convexe de fonctions positives p.p. reste positive p.p.

**Fermeture.** Si $u_n\in K$ et $u_n\to u$ dans $V$, la continuité de $V\hookrightarrow L^2$ donne $u_n\to u$ dans $L^2$ ; $K_2$ étant fermé dans $L^2$, $u\in K_2$. La convergence étant posée dans $V$, on a aussi $u\in V$. Donc $u\in V\cap K_2=K$.

**Existence.** Par Riesz, il existe un unique $w\in V$ tel que $(w,h)_V=\langle f,h\rangle$ pour tout $h\in V$. On pose $u=P_Kw$. La caractérisation donne $(w-u,v-u)_V\le 0$, c'est-à-dire $(u,v-u)_V\ge(w,v-u)_V=\langle f,v-u\rangle$.

**Unicité.** Si $u_1,u_2$ sont solutions, on teste respectivement par $v=u_2$ et $v=u_1$, puis on additionne : $(u_1,u_2-u_1)_V+(u_2,u_1-u_2)_V\ge 0$. Le membre de gauche vaut $-\|u_1-u_2\|^2_V$, donc $u_1=u_2$.

**Point de vigilance.** $H^1_0(]0,1[)$ n'est pas fermé dans $L^2(]0,1[)$ : il y est dense et strict. La limite appartient à $H^1_0$ parce que la convergence est posée dans cet espace.`,
  steps: [
    t`Établir non-vacuité, convexité et fermeture dans $V$.`,
    t`Représenter $f$ par $w$ grâce à Riesz.`,
    t`Projeter $w$ sur $K$ et réécrire l'inégalité caractéristique.`,
    'Démontrer l’unicité en testant les solutions l’une par l’autre.',
  ],
  commonErrors: [
    { id: 'e-ferme-L2', description: t`Affirmer que $H^1_0$ est fermé dans $L^2$.`, concept: 'densite-fermeture' },
    { id: 'e-prematuree', description: 'Invoquer Stampacchia alors que cet exercice en est une étape préalable.', concept: 'utilisation-prematuree' },
    { id: 'e-unicite', description: 'Conclure à l’unicité de la solution à partir de l’unicité de la projection.', concept: 'existence-unicite' },
  ],
  hints: [
    t`Quelle est la topologie dans laquelle $K$ doit être fermé ? Quel résultat transforme $f\in V'$ en un vecteur de $V$ ?`,
    t`Procède en deux temps : (i) $K$ convexe fermé non vide de $V$ ; (ii) Riesz donne $w$, on pose $u=P_Kw$. L'unicité s'obtient séparément, à partir de l'inéquation.`,
    t`Pour la fermeture : passe de $V$ à $L^2$ par l'injection continue, utilise la fermeture de $K_2$ dans $L^2$, et garde $u\in V$ grâce à la convergence dans $V$.`,
  ],
  rubric: rubric({
    hypotheses: t`$K$ est reconnu convexe, fermé dans $V$, non vide ; $f$ est bien dans $V'$.`,
    methode: 'Riesz, puis projection, puis réécriture de l’inégalité caractéristique.',
    validite: 'La fermeture est établie dans la bonne topologie.',
    justifications: 'L’unicité est démontrée séparément de l’existence.',
    conclusion: 'Existence et unicité de la solution de l’inéquation sont obtenues.',
  }),
  variant: {
    statement: t`Soit $V=H^1_0(]0,1[)$, $(u,v)_V=\int_0^1u'v'$, $\psi\in V$, et $K_\psi=\{v\in V : v\ge\psi\ \text{p.p.}\}$. Pour $f\in V'$, montrer qu'il existe un unique $u\in K_\psi$ tel que $(u,v-u)_V\ge\langle f,v-u\rangle$ pour tout $v\in K_\psi$.`,
    solution: t`$K_\psi=\psi+K$ où $K=\{v\in V : v\ge 0\ \text{p.p.}\}$ : c'est un translaté d'un convexe fermé non vide de $V$, donc un convexe fermé non vide (l'élément $\psi$ en fait partie). Par Riesz, $(w,h)_V=\langle f,h\rangle$ ; on pose $u=P_{K_\psi}w$, ce qui donne l'inéquation comme dans l'exercice. L'unicité s'obtient en testant chaque solution par l'autre.`,
  },
  verification: FROM_POLY,
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT01: TheoremModule = {
  theorem: {
    id: 'projection',
    spaces: [
      t`$H$ : espace de Hilbert réel, de norme $\|\cdot\|$ issue du produit scalaire $\langle\cdot,\cdot\rangle$.`,
      t`$K\subset H$ : partie de $H$ ; « fermé » s'entend pour la topologie de la norme de $H$.`,
      t`$x\in H$ : point à projeter, $d=\inf_{z\in K}\|x-z\|$.`,
    ],
    hypotheses: [
      {
        id: 'h-complet',
        text: t`$H$ est complet (espace de Hilbert).`,
        whenRemoved: t`Dans $E=C([-1,1])$ muni du produit scalaire de $L^2$, l'hyperplan $F=\{u : \int_0^1u=0\}$ est fermé dans $E$. Pour $g=1$, le minimiseur dans $L^2$ vaut $\mathbb 1_{[-1,0[}$ : il n'est pas continu, et $\inf_{u\in F}\|g-u\|$ n'est atteint en aucun point de $E$.`,
      },
      { id: 'h-nonvide', text: t`$K\neq\emptyset$.` },
      {
        id: 'h-ferme',
        text: t`$K$ est fermé dans $H$.`,
        whenRemoved: t`Le disque ouvert de $\mathbb R^2$ est convexe non vide : pour $x=(2,0)$, l'infimum $1$ n'est atteint en aucun point.`,
      },
      {
        id: 'h-convexe',
        text: t`$K$ est convexe : $tu+(1-t)v\in K$ pour tous $u,v\in K$ et $t\in[0,1]$.`,
        whenRemoved: t`Sur le cercle unité de $\mathbb R^2$, fermé non convexe, tous les points sont à distance $1$ de $x=(0,0)$ : l'unicité est perdue.`,
      },
    ],
    statement: t`Il existe un unique $p\in K$ tel que $\|x-p\|=\inf_{z\in K}\|x-z\|$. De plus,
$$p=P_Kx\iff p\in K\ \text{ et }\ \langle x-p,z-p\rangle_H\le 0\quad\forall z\in K,$$
et $P_K:H\to K$ est non expansive : $\|P_Kx-P_Ky\|_H\le\|x-y\|_H$ pour tous $x,y\in H$.`,
    conclusions: {
      existence: t`Une suite minimisante est de Cauchy (identité du parallélogramme) ; sa limite appartient à $K$ par fermeture, grâce à la complétude.`,
      unicite: t`Appliquer la caractérisation à deux projetés $p$ et $q$ donne $\|p-q\|^2\le 0$.`,
      stabilite: t`$P_K$ est non expansive.`,
      autre: t`Caractérisation par une inéquation variationnelle.`,
    },
    sourceProof: 'complete',
    proofOutline: [
      t`Choisir une suite minimisante $(p_n)\subset K$ et noter $d=\inf_K\|x-\cdot\|$.`,
      t`Montrer qu'elle est de Cauchy par l'identité du parallélogramme, le milieu restant dans $K$ par convexité.`,
      t`Passer à la limite : complétude de $H$ et fermeture de $K$ donnent $p\in K$, et $\|x-p\|=d$.`,
      t`Caractérisation : dérivée à droite en $0$ de $t\mapsto\|x-p-t(z-p)\|^2$, et réciproque par développement.`,
      t`Unicité : appliquer la caractérisation à $(p,q)$ puis $(q,p)$.`,
      t`Non-expansivité : combiner les deux caractérisations et utiliser Cauchy–Schwarz.`,
    ],
    warnings: [
      t`Ne pas confondre $\forall\varepsilon>0$ et $\exists\varepsilon>0$ dans la définition d'un ouvert.`,
      'Ne pas conclure qu’une norme convergente impose le signe de la fonction limite.',
      '« Fermé » dépend toujours de l’espace et de sa topologie.',
    ],
    usefulFor: 'L’inégalité de projection traduit un problème de minimisation sous contrainte en une inéquation variationnelle ; la non-expansivité permet de construire des contractions.',
    verification: FROM_POLY,
  },
  definitions: [
    {
      id: 'convexe',
      term: 'Ensemble convexe',
      statement: t`$K$ est convexe lorsque $tu+(1-t)v\in K$ pour tous $u,v\in K$ et $t\in[0,1]$.`,
      source: poly(5, 'Vocabulaire, section 1.1'),
    },
    {
      id: 'ferme-suites',
      term: 'Ensemble fermé (critère séquentiel)',
      statement: t`Dans un espace normé $H$, $K$ est fermé lorsque la limite, dans la norme de $H$, de toute suite convergente d'éléments de $K$ appartient à $K$.`,
      source: poly(5, 'Vocabulaire, section 1.1'),
    },
  ],
  concepts: [],
  counterexamples: [
    {
      id: 'ce-projection-non-ferme',
      theoremId: 'projection',
      title: 'Convexe non fermé',
      claim: t`Tout convexe non vide de $\mathbb R^2$ admet, pour chaque point $x$, un point à distance minimale.`,
      correctStatement: t`Le théorème exige $K$ non vide, convexe et fermé.`,
      task: t`Soit $K'$ le disque unité ouvert et $x=(2,0)$. Détermine $\inf_{z\in K'}\|x-z\|$ : cet infimum n'est pas atteint.`,
      check: { kind: 'rational', prompt: t`Valeur de $\inf_{z\in K'}\|x-z\|$`, expected: '1' },
      explanation: t`Pour $z\in K'$ : $\|x-z\|\ge 2-\|z\|>1$, et $z_n=(1-1/n,0)$ donne $\|x-z_n\|\to 1$. L'infimum vaut donc $1$ et n'est atteint en aucun point de $K'$.`,
      concept: 'hypotheses-theoreme',
      source: poly(5, 'Section 1.1 (hypothèse de fermeture)'),
    },
    {
      id: 'ce-projection-non-convexe',
      theoremId: 'projection',
      title: 'Fermé non convexe',
      claim: t`Si $K$ est une partie fermée non vide de $\mathbb R^2$, le point de $K$ le plus proche de $x$ est unique.`,
      correctStatement: t`L'unicité repose sur la convexité de $K$.`,
      task: t`Soit $K$ le cercle unité de $\mathbb R^2$. Donne un point $x$ pour lequel l'unicité tombe en défaut.`,
      check: { kind: 'rational-vector', prompt: t`Coordonnées de $x$`, expected: ['0', '0'], labels: ['x₁', 'x₂'] },
      explanation: t`Pour $x=(0,0)$, tous les points du cercle sont à distance $1$. Pour $x\neq 0$, l'unique point le plus proche est $x/\|x\|$ : l'origine est le seul point où l'unicité échoue.`,
      concept: 'hypotheses-theoreme',
      source: poly(5, 'Section 1.1 (hypothèse de convexité)'),
    },
    {
      id: 'ce-projection-complet',
      theoremId: 'projection',
      title: 'Espace non complet',
      claim: t`Tout convexe fermé non vide d'un espace préhilbertien admet une projection en tout point.`,
      correctStatement: t`Le théorème est énoncé dans un espace de Hilbert : la complétude sert à faire converger une suite minimisante.`,
      task: 'Quelle hypothèse du théorème manque dans cette assertion ?',
      check: {
        kind: 'choice',
        prompt: 'Hypothèse manquante',
        options: ['La complétude de l’espace', 'La compacité de $K$', 'La bornitude de $K$', 'La symétrie de $K$'],
        correct: [0],
        explanation: t`Dans $C([-1,1])$ muni du produit scalaire de $L^2$, l'hyperplan fermé $\{u : \int_0^1u=0\}$ n'admet pas de point à distance minimale de $g=1$, car le minimiseur dans $L^2$ n'est pas continu.`,
      },
      explanation: t`La suite minimisante est de Cauchy ; sans complétude, rien n'assure qu'elle converge dans l'espace.`,
      concept: 'complet-necessaire',
      source: poly(5, 'Démonstration de l’existence, section 1.1'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT01;
