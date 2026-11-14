/**
 * Résultat 5 — Banach–Steinhaus.
 * Le polycopié (p. PDF 9) ne donne qu'une idée de preuve : la démonstration complète
 * (variante de l'exercice difficile) est un complément rédigé pour ProofLab.
 */
import { t, rubric, poly, complement, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'banach-steinhaus.facile',
  theoremId: 'banach-steinhaus',
  level: 'facile',
  title: 'Les quantificateurs de la bornitude ponctuelle',
  statement: t`Soient $X,Y$ deux espaces normés, $I$ un ensemble non vide et $(T_i)_{i\in I}\subset\mathcal L(X,Y)$. On note (P) l'hypothèse de Banach–Steinhaus : « pour chaque $x\in X$, $\sup_{i\in I}\|T_ix\|_Y<\infty$ ».

Écrire (P) avec des quantificateurs, en précisant de quoi dépend la constante. Établir ensuite que les deux assertions voisines suivantes ne sont pas (P) :

- (Q) $\exists C\ge 0,\ \forall x\in X,\ \forall i\in I,\ \|T_ix\|_Y\le C$, qui force $T_i=0$ pour tout $i$ ;
- (R) $\forall x\in X,\ \forall i\in I,\ \exists C\ge 0,\ \|T_ix\|_Y\le C$, qui est vraie pour toute famille.`,
  source: poly(39, 'Annexe B, exercice 5, facile'),
  prerequisites: [],
  concepts: ['quantificateurs', 'hypotheses-theoreme', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-esp', kind: 'hypothese', text: t`$X$ et $Y$ sont des espaces normés, et $I$ est un ensemble non vide.` },
      { id: 'h-lin', kind: 'hypothese', text: t`Chaque $T_i:X\to Y$ est linéaire et continu.` },
      { id: 'd-P', kind: 'definition', text: t`(P) : pour chaque $x\in X$, $\sup_{i\in I}\|T_ix\|_Y<\infty$.` },
      { id: 'd-S', kind: 'definition', local: true, text: t`Soit $x\in X$ fixé, et soit $S_x=\{\|T_ix\|_Y : i\in I\}$, partie non vide de $[0,+\infty[$.` },

      { id: 's-sup', kind: 'consequence', text: t`$\sup S_x<\infty$ si et seulement si $S_x$ est majorée dans $\mathbb R$.` },
      { id: 's-maj', kind: 'consequence', text: t`$S_x$ est majorée si et seulement s'il existe $C_x\ge 0$ tel que $\|T_ix\|_Y\le C_x$ pour tout $i\in I$.` },
      {
        id: 'f-exact',
        kind: 'consequence',
        text: t`(P) s'écrit : $\forall x\in X,\ \exists C_x\ge 0,\ \forall i\in I,\ \|T_ix\|_Y\le C_x$. La constante dépend de $x$, pas de $i$.`,
        masked: t`Écriture exacte de (P) avec des quantificateurs : à déterminer.`,
        check: {
          kind: 'choice',
          prompt: 'Écriture exacte de (P) avec des quantificateurs',
          options: [
            t`$\exists C\ge 0,\ \forall x\in X,\ \forall i\in I,\ \|T_ix\|_Y\le C$`,
            t`$\forall x\in X,\ \exists C_x\ge 0,\ \forall i\in I,\ \|T_ix\|_Y\le C_x$`,
            t`$\forall x\in X,\ \forall i\in I,\ \exists C\ge 0,\ \|T_ix\|_Y\le C$`,
            t`$\exists C\ge 0,\ \forall i\in I,\ \forall x\in X,\ \|T_ix\|_Y\le C\|x\|_X$`,
          ],
          correct: [1],
          explanation: t`La constante doit pouvoir dépendre de $x$, mais elle doit être commune à tous les indices $i$.`,
        },
      },

      { id: 'd-Q', kind: 'definition', local: true, text: t`Supposons (Q) : il existe $C\ge 0$ tel que $\|T_iz\|_Y\le C$ pour tous $z\in X$ et $i\in I$.` },
      { id: 'd-lam', kind: 'definition', local: true, text: t`Soient $i\in I$, $x\in X$ et $\lambda>0$.` },
      { id: 'q-hom', kind: 'inegalite', text: t`$\lambda\|T_ix\|_Y=\|T_i(\lambda x)\|_Y\le C$.` },
      { id: 'q-div', kind: 'inegalite', text: t`$\|T_ix\|_Y\le C/\lambda$ pour tout $\lambda>0$.` },
      { id: 'q-zero', kind: 'consequence', text: t`Sous (Q) : $T_i=0$ pour tout $i\in I$.` },

      { id: 'r-vrai', kind: 'consequence', text: t`(R) est vraie pour toute famille : pour $x$ et $i$ donnés, $C=\|T_ix\|_Y$ convient.` },

      { id: 'd-fam1', kind: 'definition', text: t`Première famille : $X=Y=\mathbb R$, $I=\{1\}$, $T_1=\mathrm{Id}$.` },
      {
        id: 'e-P1',
        kind: 'egalite',
        text: t`Pour la première famille, (P) est vraie, et la plus petite constante admissible en $x=-3$ vaut $3$.`,
        masked: t`Plus petite constante admissible en $x=-3$ pour la première famille : à calculer.`,
        check: { kind: 'rational', prompt: t`Plus petite constante $C_x$ admissible en $x=-3$ pour la première famille`, expected: '3' },
      },
      { id: 'e-nonQ', kind: 'consequence', text: t`Pour la première famille, (Q) est fausse alors que (P) est vraie.` },

      { id: 'd-fam2', kind: 'definition', text: t`Seconde famille : $X=Y=\mathbb R$, $I=\mathbb N^*$, $T_nx=nx$.` },
      { id: 'e-nonP', kind: 'consequence', text: t`Pour la seconde famille, (P) est fausse : $\sup_{n}|T_n1|=+\infty$.` },
      { id: 'e-nonR', kind: 'consequence', text: t`Pour la seconde famille, (R) est vraie alors que (P) est fausse.` },

      { id: 'i-chaine', kind: 'consequence', text: t`Pour toute famille : (Q) entraîne (P), et (P) entraîne (R).` },

      { id: 'fin', kind: 'conclusion', text: t`(P) s'écrit $\forall x,\ \exists C_x,\ \forall i$ ; (Q) est strictement plus forte que (P) et (R) est strictement plus faible que (P).` },

      // Écritures voisines, fausses en général.
      { id: 'x-Q', kind: 'consequence', distractor: true, after: ['s-maj'], text: t`(P) s'écrit : $\exists C\ge 0,\ \forall x\in X,\ \forall i\in I,\ \|T_ix\|_Y\le C$.` },
      { id: 'x-R', kind: 'consequence', distractor: true, after: ['s-maj'], text: t`(P) s'écrit : $\forall x\in X,\ \forall i\in I,\ \exists C\ge 0,\ \|T_ix\|_Y\le C$.` },
      { id: 'x-U', kind: 'consequence', distractor: true, after: ['s-maj'], text: t`(P) s'écrit : $\exists C\ge 0,\ \forall i\in I,\ \forall x\in X,\ \|T_ix\|_Y\le C\|x\|_X$.` },
    ],
    justifications: [
      { id: 'j-sup', label: t`Définition de la borne supérieure d'une partie non vide de $\mathbb R$, à valeurs dans $[0,+\infty]$.` },
      { id: 'j-maj', label: t`Définition d'un majorant ; un majorant d'une partie non vide de $[0,+\infty[$ est positif.` },
      { id: 'j-report', label: t`Report dans (P), l'élément $x$ étant quelconque.` },
      { id: 'j-homog', label: t`Linéarité de $T_i$, homogénéité de la norme, puis (Q) appliquée au point $z=\lambda x$.` },
      { id: 'j-diviser', label: t`Division par $\lambda>0$.` },
      { id: 'j-lim-lam', label: t`Passage à la limite $\lambda\to+\infty$, puis $\|y\|_Y=0\Rightarrow y=0$.` },
      { id: 'j-choix-C', label: t`Le réel $C$ se choisit après $x$ et $i$ : le choix $C=\|T_ix\|_Y$ est permis.` },
      { id: 'j-calc-fam1', label: t`Ici $\sup_{i\in I}\|T_ix\|=|x|$.` },
      { id: 'j-contrap', label: t`Contraposée de « (Q) entraîne $T_i=0$ », puisque $T_1\neq 0$.` },
      { id: 'j-calc-fam2', label: t`Ici $|T_n1|=n$, et $\sup_{n}n=+\infty$.` },
      { id: 'j-cas-part', label: 'Spécialisation d’un énoncé valable pour toute famille à cette famille-ci.' },
      { id: 'j-impl', label: t`Choix $C_x=C$ pour la première implication, puis $C=C_x$ pour la seconde.` },
      { id: 'j-syn', label: 'Réunion des propriétés établies.' },
      // Justifications séduisantes, fausses ou absentes.
      { id: 'j-echange', label: 'Les quantificateurs d’un même énoncé peuvent être réordonnés librement.' },
      { id: 'j-borne-nul', label: 'Une application linéaire bornée est nulle.' },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['h-esp', 'd-S'], to: 's-sup', by: 'j-sup' },
      { from: ['d-S'], to: 's-maj', by: 'j-maj' },
      { from: ['d-P', 's-sup', 's-maj'], to: 'f-exact', by: 'j-report' },

      { from: ['h-lin', 'd-Q', 'd-lam'], to: 'q-hom', by: 'j-homog' },
      { from: ['q-hom'], to: 'q-div', by: 'j-diviser' },
      { from: ['q-div'], to: 'q-zero', by: 'j-lim-lam' },

      { from: ['h-esp'], to: 'r-vrai', by: 'j-choix-C' },

      { from: ['d-fam1'], to: 'e-P1', by: 'j-calc-fam1' },
      { from: ['q-zero', 'e-P1', 'd-fam1'], to: 'e-nonQ', by: 'j-contrap' },

      { from: ['d-fam2'], to: 'e-nonP', by: 'j-calc-fam2' },
      { from: ['r-vrai', 'e-nonP'], to: 'e-nonR', by: 'j-cas-part' },

      { from: ['f-exact'], to: 'i-chaine', by: 'j-impl' },

      { from: ['f-exact', 'i-chaine', 'e-nonQ', 'e-nonR'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-Q',
        verdict: 'incorrect',
        concept: 'quantificateurs',
        message: t`Le quantificateur existentiel a été remonté avant $x$ : la constante ne peut plus dépendre de $x$, ce que (P) autorise.`,
        counterexample: t`$X=Y=\mathbb R$, $T_1=\mathrm{Id}$ : (P) est vraie avec $C_x=|x|$, mais aucune constante ne majore $|x|$ pour tout $x\in\mathbb R$.`,
      },
      {
        conclusion: 'x-R',
        verdict: 'incorrect',
        concept: 'quantificateurs',
        message: t`Ici la constante est choisie après $i$ : l'énoncé devient toujours vrai et ne dit plus rien de la famille. (P) exige une constante commune à tous les indices.`,
        counterexample: t`$T_nx=nx$ sur $\mathbb R$ : l'énoncé est vrai, mais $\sup_n|T_n1|=+\infty$.`,
      },
      {
        conclusion: 'x-U',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Cette écriture exprime $\sup_i\|T_i\|<\infty$ : c'est la conclusion du théorème, non son hypothèse. Sans complétude de $X$, elle ne découle pas de (P).`,
        counterexample: t`$X=c_{00}$ muni de $\|\cdot\|_\infty$ et $T_nx=nx_n$ : (P) est vraie, mais $\|T_n\|=n$.`,
      },
      {
        conclusion: 'f-exact',
        by: 'j-echange',
        verdict: 'incorrect',
        concept: 'quantificateurs',
        message: t`Échanger un $\forall$ et un $\exists$ change le sens de l'énoncé : ici, le choix de la constante n'obéit plus aux mêmes dépendances.`,
        counterexample: t`« Pour tout entier $n$, il existe un entier $m$ tel que $m>n$ » est vrai ; « il existe un entier $m$ tel que, pour tout entier $n$, $m>n$ » est faux.`,
      },
      {
        conclusion: 'q-zero',
        by: 'j-borne-nul',
        verdict: 'incorrect',
        concept: 'quantificateurs',
        message: t`Au sens de $\mathcal L(X,Y)$, « borné » signifie $\|Tx\|\le C\|x\|$, et un tel opérateur n'est pas nul en général. C'est la borne sans facteur $\|x\|$, combinée à l'homogénéité, qui force la nullité : il faut le démontrer.`,
        counterexample: t`$\mathrm{Id}_{\mathbb R}$ est bornée au sens de $\mathcal L(\mathbb R,\mathbb R)$, et non nulle.`,
      },
      {
        conclusion: 'q-zero',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: 'La nullité se démontre : quelle propriété des opérateurs linéaires empêche une borne indépendante du point ?',
      },
    ],
    removable: [
      {
        hypothesis: 'h-lin',
        label: t`Retirer la linéarité des $T_i$`,
        necessary: true,
        explanation: t`Sans linéarité, l'homogénéité disparaît : (Q) n'entraîne plus la nullité.`,
        counterexample: t`$T(x)=\sin x$ sur $\mathbb R$ est bornée par $1$, donc vérifie (Q), et n'est pas nulle.`,
      },
    ],
  },
  closedChecks: [
    {
      kind: 'choice',
      prompt: 'Laquelle de ces assertions est la conclusion de Banach–Steinhaus, et non son hypothèse ?',
      options: [
        t`$\forall x\in X,\ \exists C_x\ge 0,\ \forall i\in I,\ \|T_ix\|_Y\le C_x$`,
        t`$\exists C\ge 0,\ \forall i\in I,\ \forall x\in X,\ \|T_ix\|_Y\le C\|x\|_X$`,
        t`$\forall x\in X,\ \forall i\in I,\ \exists C\ge 0,\ \|T_ix\|_Y\le C$`,
      ],
      correct: [1],
      explanation: t`La seconde écriture signifie exactement $\sup_i\|T_i\|_{\mathcal L(X,Y)}<\infty$, conclusion du théorème.`,
    },
  ],
  solution: t`**Écriture exacte.** Pour $x\in X$, posons $S_x=\{\|T_ix\|_Y : i\in I\}$, partie non vide de $[0,+\infty[$. Le nombre $\sup S_x$ est fini si et seulement si $S_x$ est majorée, c'est-à-dire s'il existe $C_x\ge 0$ tel que $\|T_ix\|_Y\le C_x$ pour tout $i\in I$. Donc (P) s'écrit
$$\forall x\in X,\ \exists C_x\ge 0,\ \forall i\in I,\ \|T_ix\|_Y\le C_x.$$
La constante dépend de $x$, pas de $i$.

**(Q) force $T_i=0$.** Si (Q) a lieu avec la constante $C$, alors pour $i\in I$, $x\in X$ et $\lambda>0$, la linéarité de $T_i$ et (Q) au point $\lambda x$ donnent $\lambda\|T_ix\|_Y=\|T_i(\lambda x)\|_Y\le C$, donc $\|T_ix\|_Y\le C/\lambda$. Pour $\lambda\to+\infty$, on obtient $T_ix=0$. Pour $X=Y=\mathbb R$ et $T_1=\mathrm{Id}$, (P) est vraie avec $C_x=|x|$ et $T_1\neq 0$ : (Q) est fausse. Ainsi (Q) entraîne (P) (prendre $C_x=C$), mais (P) n'entraîne pas (Q).

**(R) est toujours vraie.** Pour $x$ et $i$ donnés, $C=\|T_ix\|_Y$ convient. Pour $X=Y=\mathbb R$ et $T_nx=nx$, (R) a lieu, mais (P) échoue en $x=1$, car $\sup_nn=+\infty$. Ainsi (P) entraîne (R), mais (R) n'entraîne pas (P).`,
  steps: [
    t`Traduire la finitude de $\sup S_x$ par l'existence d'un majorant.`,
    'Écrire (P) en plaçant la constante après $x$ et avant $i$.',
    'Déduire de (Q), par homogénéité, la nullité de chaque opérateur.',
    'Vérifier que (R) est vraie pour toute famille.',
    'Séparer les trois énoncés par deux familles explicites sur la droite réelle.',
  ],
  commonErrors: [
    { id: 'e-remontee', description: t`Écrire $\exists C\,\forall x\,\forall i$ à la place de $\forall x\,\exists C_x\,\forall i$.`, concept: 'quantificateurs' },
    { id: 'e-confusion-conclusion', description: t`Confondre l'hypothèse ponctuelle (P) avec la borne uniforme $\sup_i\|T_i\|<\infty$.`, concept: 'hypotheses-theoreme' },
    { id: 'e-evident', description: t`Déclarer la nullité sous (Q) sans invoquer l'homogénéité.`, concept: 'justification-absente' },
  ],
  hints: [
    t`De quoi la constante de (P) a-t-elle le droit de dépendre ? De $x$ seulement, de $i$ seulement, des deux ou d'aucun ?`,
    t`Pour la formule exacte, traduis « $\sup S_x<\infty$ ». Pour (Q), applique l'hypothèse au point $\lambda x$ et fais varier $\lambda$.`,
    t`Sous (Q), on a $\lambda\|T_ix\|\le C$ pour tout $\lambda>0$ : divise par $\lambda$, puis fais tendre $\lambda$ vers $+\infty$. (R) se vérifie avec $C=\|T_ix\|_Y$.`,
  ],
  rubric: rubric({
    hypotheses: t`Le rôle de chaque objet ($x$, $i$, constante) est identifié sans ambiguïté.`,
    methode: 'La formulation exacte est obtenue à partir de la définition de la borne supérieure.',
    validite: 'Chaque implication et chaque séparation est démontrée, par un exemple vérifié.',
    justifications: 'L’homogénéité est citée explicitement pour réfuter la variante (Q).',
    conclusion: 'Les trois énoncés sont ordonnés et distingués.',
  }),
  variant: {
    statement: t`Soient $X,Y$ deux espaces normés, $I$ un ensemble non vide et $(T_i)_{i\in I}\subset\mathcal L(X,Y)$. Écrire la négation de (P) avec des quantificateurs, puis l'établir pour la famille $T_n:\mathbb R\to\mathbb R$, $T_nx=nx$, $n\in\mathbb N^*$.`,
    solution: t`La négation de (P) s'écrit : $\exists x\in X,\ \forall C\ge 0,\ \exists i\in I,\ \|T_ix\|_Y>C$. Pour $X=\mathbb R$, $T_nx=nx$, le point $x=1$ convient : pour $C\ge 0$ donné, l'entier $n=\lfloor C\rfloor+1$ vérifie $T_n1=n>C$.`,
    closedChecks: [{ kind: 'rational', prompt: t`Plus petit entier $n$ tel que $T_n1>C$ pour $C=7/2$`, expected: '4' }],
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'banach-steinhaus.intermediaire',
  theoremId: 'banach-steinhaus',
  level: 'intermediaire',
  title: 'Une suite simplement convergente est bornée en norme',
  statement: t`Soient $X$ un espace de Banach, $Y$ un espace normé et $(T_n)_{n\in\mathbb N}\subset\mathcal L(X,Y)$. On suppose que, pour tout $x\in X$, la suite $(T_nx)_n$ converge dans $Y$. Montrer que $\sup_{n}\|T_n\|_{\mathcal L(X,Y)}<\infty$.`,
  source: poly(39, 'Annexe B, exercice 5, intermédiaire'),
  prerequisites: [],
  concepts: ['quantificateurs', 'hypotheses-theoreme', 'complet-necessaire', 'banach-steinhaus-convergence-simple'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'rang', label: 'Bornitude par un rang explicite' },
      { id: 'compact', label: 'Bornitude par compacité de la suite et de sa limite' },
    ],
    nodes: [
      { id: 'h-banach', kind: 'hypothese', text: t`$X$ est un espace de Banach.` },
      { id: 'h-Y', kind: 'hypothese', text: t`$Y$ est un espace normé.` },
      { id: 'h-Tn', kind: 'hypothese', text: t`$(T_n)_{n\in\mathbb N}\subset\mathcal L(X,Y)$.` },
      { id: 'h-conv', kind: 'hypothese', text: t`Pour tout $x\in X$, la suite $(T_nx)_n$ converge dans $Y$.` },

      { id: 'd-x', kind: 'definition', local: true, text: t`Soit $x\in X$ ; on note $y_x$ la limite de $(T_nx)_n$ dans $Y$.` },

      { id: 's-rang', kind: 'consequence', text: t`Il existe $N_x\in\mathbb N$ tel que $\|T_nx-y_x\|_Y\le 1$ pour tout $n\ge N_x$.` },
      { id: 's-queue', kind: 'inegalite', text: t`$\|T_nx\|_Y\le\|y_x\|_Y+1$ pour tout $n\ge N_x$.` },
      { id: 's-Cx', kind: 'inegalite', text: t`Pour tout $n$ : $\|T_nx\|_Y\le C_x:=\max\big(\|T_0x\|_Y,\dots,\|T_{N_x}x\|_Y,\ \|y_x\|_Y+1\big)$.` },

      { id: 'c-K', kind: 'consequence', text: t`$K_x=\{T_nx : n\in\mathbb N\}\cup\{y_x\}$ est compact dans $Y$.` },
      { id: 'c-borne', kind: 'consequence', text: t`Il existe $C_x\ge 0$ tel que $\|T_nx\|_Y\le C_x$ pour tout $n$.` },

      { id: 'ponctuel', kind: 'consequence', text: t`Pour tout $x\in X$ : $\sup_{n}\|T_nx\|_Y<\infty$.` },
      { id: 'bs', kind: 'application-theoreme', text: t`$\sup_{n}\|T_n\|_{\mathcal L(X,Y)}<\infty$ par le théorème de Banach–Steinhaus.` },
      { id: 'fin', kind: 'conclusion', text: t`La suite $(T_n)_n$ est bornée dans $\mathcal L(X,Y)$.` },

      // Propositions séduisantes mais fausses.
      { id: 'x-conv-norme', kind: 'consequence', distractor: true, text: t`La suite $(T_n)_n$ converge dans $\mathcal L(X,Y)$ pour la norme d'opérateur.` },
      { id: 'x-unif-x', kind: 'inegalite', distractor: true, after: ['ponctuel'], text: t`Il existe $C\ge 0$ tel que $\|T_nx\|_Y\le C$ pour tous $n\in\mathbb N$ et $x\in X$.` },
      { id: 'x-Y-complet', kind: 'consequence', distractor: true, text: t`$Y$ est complet, comme l'exige le théorème de Banach–Steinhaus.` },
    ],
    justifications: [
      { id: 'j-lim-1', label: t`Définition de la limite, avec le seuil $\varepsilon=1$.` },
      { id: 'j-tri', label: 'Inégalité triangulaire dans $Y$.' },
      { id: 'j-max', label: t`Un maximum d'un nombre fini de réels majore les premiers termes ; la queue est déjà majorée.` },
      { id: 'j-compact', label: 'Une suite convergente et sa limite forment un compact.' },
      { id: 'j-compact-borne', label: 'Un compact d’un espace normé est borné.' },
      { id: 'j-x-arb', label: t`$x$ était quelconque ; la borne obtenue ne dépend que de $x$.` },
      { id: 'j-bs', label: 'Théorème de Banach–Steinhaus.', theorem: 'banach-steinhaus' },
      { id: 'j-syn', label: 'Définition d’une suite bornée dans un espace normé.' },
      // Justifications séduisantes et fausses, ou absentes.
      { id: 'j-conv-norme', label: t`La suite $(T_n)_n$ converge pour la norme de $\mathcal L(X,Y)$, donc y est bornée.` },
      { id: 'j-sup-fini', label: 'Une borne supérieure de nombres finis est finie.' },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['d-x', 'h-conv'], to: 's-rang', by: 'j-lim-1', path: 'rang' },
      { from: ['s-rang', 'h-Y'], to: 's-queue', by: 'j-tri', path: 'rang' },
      { from: ['s-queue'], to: 's-Cx', by: 'j-max', path: 'rang' },
      { from: ['s-Cx'], to: 'ponctuel', by: 'j-x-arb', path: 'rang' },

      { from: ['d-x', 'h-conv'], to: 'c-K', by: 'j-compact', path: 'compact' },
      { from: ['c-K', 'h-Y'], to: 'c-borne', by: 'j-compact-borne', path: 'compact' },
      { from: ['c-borne'], to: 'ponctuel', by: 'j-x-arb', path: 'compact' },

      { from: ['h-banach', 'h-Y', 'h-Tn', 'ponctuel'], to: 'bs', by: 'j-bs' },
      { from: ['bs'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-conv-norme',
        verdict: 'incorrect',
        concept: 'banach-steinhaus-convergence-simple',
        message: t`La convergence de $(T_nx)_n$ pour chaque $x$ est une convergence simple : elle n'entraîne pas la convergence pour la norme d'opérateur.`,
        counterexample: t`$X=Y=\ell^2$ et $T_n$ la projection orthogonale sur les $n$ premières coordonnées : $T_nx\to x$ pour tout $x$, mais $\|T_{n+1}-T_n\|=1$ pour tout $n$.`,
      },
      {
        conclusion: 'x-unif-x',
        verdict: 'incorrect',
        concept: 'quantificateurs',
        message: t`La borne $C_x$ dépend de $x$ par construction : rien ne permet de la rendre indépendante de $x$, et c'est même impossible en général.`,
        counterexample: t`$T_n=\mathrm{Id}$ sur $\mathbb R$ : la suite converge pour tout $x$, mais $|T_nx|=|x|$ n'est pas borné en $x$.`,
      },
      {
        conclusion: 'x-Y-complet',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`La complétude exigée porte sur $X$, l'espace de départ. Le théorème n'utilise de $Y$ que sa norme : $Y$ est seulement normé.`,
      },
      {
        conclusion: 'bs',
        by: 'j-conv-norme',
        verdict: 'incorrect',
        concept: 'banach-steinhaus-convergence-simple',
        message: t`Cette justification suppose une convergence pour la norme d'opérateur, qui n'est pas donnée et peut être fausse.`,
        counterexample: t`$X=Y=\ell^2$, $T_n$ projection orthogonale sur les $n$ premières coordonnées : $\|T_{n+1}-T_n\|=1$.`,
      },
      {
        conclusion: 'bs',
        by: 'j-sup-fini',
        verdict: 'incorrect',
        concept: 'quantificateurs',
        message: t`Chaque borne $\sup_n\|T_nx\|_Y$ est finie, mais la borne supérieure de ces nombres sur la boule unité peut être infinie : le théorème, avec la complétude de $X$, est précisément ce qui l'exclut.`,
        counterexample: t`Sur $X=c_{00}$ muni de $\|\cdot\|_\infty$ et $T_nx=nx_n$, chaque $\sup_n|T_nx|$ est fini, et $\sup_n\|T_n\|=+\infty$.`,
      },
      {
        conclusion: 'ponctuel',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: 'Une borne pour chaque point se démontre : d’où vient-elle, et de quoi dépend-elle ?',
      },
    ],
    removable: [
      {
        hypothesis: 'h-banach',
        label: t`Retirer la complétude de $X$`,
        necessary: true,
        explanation: t`Le théorème de Banach–Steinhaus ne peut plus être invoqué, et la conclusion peut être fausse.`,
        counterexample: t`$X=c_{00}$ muni de $\|\cdot\|_\infty$ et $T_nx=nx_n$ : $T_nx\to 0$ pour tout $x$ (à support fini), mais $\|T_n\|=n$.`,
      },
      {
        hypothesis: 'h-conv',
        label: t`Retirer la convergence de $(T_nx)_n$`,
        necessary: true,
        explanation: 'Sans convergence, aucune borne ponctuelle n’est disponible.',
        counterexample: t`$X=Y=\mathbb R$, $T_nx=nx$ : $(T_n1)_n$ diverge et $\|T_n\|=n$.`,
      },
    ],
  },
  closedChecks: [
    {
      kind: 'rational',
      prompt: t`Pour $T_n$ projection orthogonale de $\ell^2$ sur les $n$ premières coordonnées, valeur de $\|T_{n+1}-T_n\|$`,
      expected: '1',
    },
  ],
  solution: t`Soit $x\in X$. Comme $(T_nx)_n$ converge vers $y_x$ dans $Y$, il existe $N_x$ tel que $\|T_nx-y_x\|_Y\le 1$ pour $n\ge N_x$, donc $\|T_nx\|_Y\le\|y_x\|_Y+1$ pour $n\ge N_x$. Par suite, $\sup_n\|T_nx\|_Y\le\max(\|T_0x\|_Y,\dots,\|T_{N_x}x\|_Y,\|y_x\|_Y+1)<\infty$. Cette borne dépend de $x$ ; cela vaut pour tout $x\in X$.

L'espace $X$ étant de Banach et $Y$ normé, le théorème de Banach–Steinhaus s'applique à la famille $(T_n)_n$ : $\sup_n\|T_n\|_{\mathcal L(X,Y)}<\infty$.

**Remarques.** La convergence considérée est simple : elle n'entraîne pas la convergence en norme d'opérateur, comme le montrent les projections orthogonales de $\ell^2$ sur les $n$ premières coordonnées. La complétude porte sur $X$ seul : sur $c_{00}$ muni de $\|\cdot\|_\infty$, les formes $T_nx=nx_n$ convergent simplement vers $0$, et $\|T_n\|=n$.`,
  steps: [
    t`Fixer $x$ et obtenir une borne de $(T_nx)_n$ à partir de sa convergence.`,
    'Noter que cette borne dépend de $x$.',
    'Vérifier les hypothèses de Banach–Steinhaus, dont la complétude de $X$.',
    'Conclure.',
  ],
  commonErrors: [
    { id: 'e-norme-op', description: t`Déduire la convergence de $(T_n)_n$ pour la norme d'opérateur à partir de la convergence simple.`, concept: 'banach-steinhaus-convergence-simple' },
    { id: 'e-unif', description: t`Écrire une borne de $\|T_nx\|_Y$ indépendante de $x$.`, concept: 'quantificateurs' },
    { id: 'e-Y', description: t`Exiger la complétude de $Y$ au lieu de celle de $X$.`, concept: 'hypotheses-theoreme' },
  ],
  hints: [
    t`Le théorème réclame, pour chaque $x$ fixé, une borne de la suite $(\|T_nx\|_Y)_n$. La convergence en fournit-elle une ?`,
    t`Une suite convergente d'un espace normé est bornée. Vérifie ensuite toutes les hypothèses de Banach–Steinhaus, sans oublier la complétude de $X$.`,
    t`Prends le seuil $\varepsilon=1$ dans la définition de la limite, puis un maximum fini pour les premiers termes. Attention : la borne obtenue dépend de $x$.`,
  ],
  rubric: rubric({
    hypotheses: t`La complétude de $X$ et la continuité des $T_n$ sont explicitement vérifiées.`,
    methode: 'La convergence ponctuelle est transformée en bornitude ponctuelle, puis Banach–Steinhaus est appliqué.',
    validite: 'Aucune convergence pour la norme d’opérateur n’est invoquée.',
    justifications: t`La dépendance en $x$ de la borne ponctuelle est explicitée.`,
    conclusion: t`La borne $\sup_n\|T_n\|<\infty$ est obtenue.`,
  }),
  variant: {
    statement: t`Soient $X$ un espace de Banach, $Y$ un espace normé et $(T_n)_{n\in\mathbb N}\subset\mathcal L(X,Y)$ tels que, pour tout $x\in X$, $T_nx\to Tx$ dans $Y$. Montrer que $T$ est linéaire continu et que $\|T\|\le\liminf_n\|T_n\|$.`,
    solution: t`Pour $x,x'\in X$ et $\lambda$ réel, $T(\lambda x+x')=\lim_nT_n(\lambda x+x')=\lambda Tx+Tx'$ : $T$ est linéaire. Par l'exercice, $\sup_n\|T_n\|<\infty$, donc $\liminf_n\|T_n\|<\infty$. Pour $x\in X$, la continuité de la norme donne $\|Tx\|_Y=\lim_n\|T_nx\|_Y\le\liminf_n\big(\|T_n\|\,\|x\|_X\big)=\big(\liminf_n\|T_n\|\big)\|x\|_X$. Donc $T\in\mathcal L(X,Y)$ et $\|T\|\le\liminf_n\|T_n\|$.`,
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'banach-steinhaus.difficile',
  theoremId: 'banach-steinhaus',
  level: 'difficile',
  title: 'Pourquoi la complétude est indispensable : un contre-exemple sur $c_{00}$',
  statement: t`Soit $X=c_{00}$ l'espace des suites réelles $x=(x_k)_{k\ge 1}$ à support fini, muni de la norme $\|x\|_\infty=\max_k|x_k|$, et soit $T_n:X\to\mathbb R$ défini par $T_nx=nx_n$ pour $n\ge 1$. Montrer que chaque $T_n$ est continu, que $\sup_n|T_nx|<\infty$ pour tout $x\in X$, que $\sup_n\|T_n\|=+\infty$ et que $X$ n'est pas complet. Identifier précisément l'étape de la preuve de Banach–Steinhaus qui tombe en défaut.`,
  source: poly(39, 'Annexe B, exercice 5, difficile'),
  prerequisites: [],
  concepts: ['complet-necessaire', 'quantificateurs', 'hypotheses-theoreme'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'suite', label: 'Non-complétude par une suite de Cauchy explicite' },
      { id: 'bs', label: 'Non-complétude par contraposée de Banach–Steinhaus' },
      { id: 'baire', label: 'Non-complétude par contraposée de Baire' },
    ],
    nodes: [
      { id: 'd-X', kind: 'definition', text: t`$X=c_{00}$ est l'espace des suites réelles à support fini, muni de $\|x\|_\infty=\max_k|x_k|$.` },
      { id: 'd-Tn', kind: 'definition', text: t`Pour $n\ge 1$ : $T_n:X\to\mathbb R$, $T_nx=nx_n$.` },
      { id: 'd-en', kind: 'definition', text: t`Pour $n\ge 1$ : $e_n$ est la suite valant $1$ en position $n$ et $0$ ailleurs.` },
      { id: 'd-Fm', kind: 'definition', text: t`Pour $m\in\mathbb N$ : $F_m=\{x\in X : \sup_{n\ge 1}|T_nx|\le m\}$.` },
      { id: 'd-x', kind: 'definition', local: true, text: t`Soit $x\in X$, nul au-delà du rang $N_x\ge 1$.` },
      { id: 'd-bou', kind: 'definition', local: true, text: t`Soient $m\in\mathbb N$, $a\in X$ nul au-delà du rang $N_a$ et $r>0$ ; on choisit $n>N_a$ tel que $nr/2>m$, et on pose $z=a+\tfrac r2e_n$.` },

      { id: 't-lip', kind: 'inegalite', text: t`$T_n$ est linéaire et $|T_nx|\le n\|x\|_\infty$ pour tout $x\in X$ : $T_n\in\mathcal L(X,\mathbb R)$.` },
      {
        id: 't-norme',
        kind: 'egalite',
        text: t`$\|T_n\|=n$.`,
        masked: t`Valeur de $\|T_n\|$ : à calculer.`,
        check: { kind: 'expr-equiv', prompt: t`Valeur de $\|T_n\|$ en fonction de $n$`, expected: 'n', vars: ['n'] },
      },
      { id: 't-sup', kind: 'consequence', text: t`$\sup_{n\ge 1}\|T_n\|=+\infty$.` },

      { id: 'p-nul', kind: 'egalite', text: t`$T_nx=0$ pour tout $n>N_x$.` },
      { id: 'p-borne', kind: 'inegalite', text: t`$\sup_{n\ge 1}|T_nx|=\max_{1\le k\le N_x}k|x_k|<\infty$.` },
      { id: 'p-ponct', kind: 'consequence', text: t`Pour tout $x\in X$ : $\sup_{n\ge 1}|T_nx|<\infty$.` },

      { id: 'n-cauchy', kind: 'consequence', text: t`La suite $x^{(N)}=(1,\tfrac12,\dots,\tfrac1N,0,0,\dots)$ de $X$ est de Cauchy pour $\|\cdot\|_\infty$.` },
      { id: 'n-lim', kind: 'consequence', text: t`Si $(x^{(N)})_N$ convergeait vers un élément $y$ de $X$, on aurait $y_k=1/k$ pour tout $k\ge 1$, ce qui contredit le support fini de $y$.` },
      { id: 'non-complet', kind: 'consequence', text: t`$(X,\|\cdot\|_\infty)$ n'est pas complet.` },

      { id: 'f-ferme', kind: 'consequence', text: t`Chaque $F_m$ est fermé dans $X$.` },
      { id: 'f-recouvre', kind: 'consequence', text: t`$X=\bigcup_{m\in\mathbb N}F_m$.` },
      { id: 'f-point', kind: 'inegalite', text: t`$\|z-a\|_\infty=r/2<r$ et $|T_nz|=nr/2>m$.` },
      { id: 'f-interieur', kind: 'consequence', text: t`Chaque $F_m$ est d'intérieur vide dans $X$.` },
      { id: 'echec', kind: 'consequence', text: t`Les $F_m$ sont fermés et recouvrent $X$, sans qu'aucun soit d'intérieur non vide : c'est l'étape de Baire de la preuve de Banach–Steinhaus qui tombe en défaut.` },

      { id: 'fin', kind: 'conclusion', text: t`Les $T_n$ sont continus, la famille est ponctuellement bornée, $\sup_n\|T_n\|=+\infty$, $X$ n'est pas complet, et l'étape de Baire est celle qui échoue.` },

      // Propositions plausibles mais fausses.
      { id: 'x-baire', kind: 'consequence', distractor: true, after: ['f-ferme', 'f-recouvre'], text: t`Par le théorème de Baire, il existe $m\in\mathbb N$ tel que $F_m$ est d'intérieur non vide.` },
      { id: 'x-complet', kind: 'consequence', distractor: true, text: t`$(X,\|\cdot\|_\infty)$ est complet, car $\mathbb R$ l'est.` },
      { id: 'x-sup-fini', kind: 'consequence', distractor: true, after: ['p-ponct'], text: t`$\sup_{n\ge 1}\|T_n\|<\infty$.` },
    ],
    justifications: [
      { id: 'j-coord', label: t`Linéarité de la coordonnée, et $|x_n|\le\|x\|_\infty$ par définition de la norme.` },
      { id: 'j-norme', label: t`Majoration d'une part ; test sur $e_n$ d'autre part, avec $\|e_n\|_\infty=1$ et $T_ne_n=n$.` },
      { id: 'j-sup-n', label: t`$\sup_{n\ge 1}n=+\infty$.` },
      { id: 'j-support', label: t`Le support de $x$ ne dépasse pas le rang $N_x$.` },
      { id: 'j-max-fini', label: t`Pour $n>N_x$ le terme est nul : le supremum est un maximum fini.` },
      { id: 'j-x-arb', label: t`$x$ était quelconque dans $X$.` },
      { id: 'j-cauchy', label: t`Pour $N<M$ : $\|x^{(M)}-x^{(N)}\|_\infty=\tfrac1{N+1}$.` },
      { id: 'j-coord-lim', label: 'La convergence dans la norme uniforme entraîne la convergence de chaque coordonnée.' },
      { id: 'j-def-complet', label: 'Une suite de Cauchy sans limite empêche la complétude.' },
      { id: 'j-bs-contra', label: 'Contraposée de Banach–Steinhaus.', theorem: 'banach-steinhaus' },
      { id: 'j-baire-contra', label: 'Contraposée du théorème de Baire.', theorem: 'baire' },
      { id: 'j-ferme', label: t`Intersection des fermés $\{x:|T_nx|\le m\}$, images réciproques de $[-m,m]$ par les $T_n$ continues.` },
      { id: 'j-recouvre', label: t`Pour chaque $x$, choisir un entier $m\ge\sup_n|T_nx|$.` },
      { id: 'j-calc-z', label: t`La $n$-ième coordonnée de $a$ est nulle, car $n>N_a$.` },
      { id: 'j-interieur', label: t`$B(a,r)$ contient toujours un point hors de $F_m$, pour $a$, $r$ et $m$ quelconques.` },
      { id: 'j-echec', label: 'Comparaison avec la preuve de Banach–Steinhaus, qui choisit un fermé d’intérieur non vide.' },
      { id: 'j-syn', label: 'Réunion des propriétés établies.' },
      // Justifications séduisantes et fausses.
      { id: 'j-bs-normes', label: 'Le théorème de Banach–Steinhaus s’applique à tout espace normé.', theorem: 'banach-steinhaus' },
      { id: 'j-baire-normes', label: 'Le théorème de Baire s’applique dans tout espace métrique.', theorem: 'baire' },
      { id: 'j-coord-cv', label: t`Une suite de Cauchy de $X$ converge coordonnée par coordonnée, donc elle converge dans $X$.` },
    ],
    rules: [
      { from: ['d-X', 'd-Tn'], to: 't-lip', by: 'j-coord' },
      { from: ['t-lip', 'd-en', 'd-Tn'], to: 't-norme', by: 'j-norme' },
      { from: ['t-norme'], to: 't-sup', by: 'j-sup-n' },

      { from: ['d-x', 'd-Tn'], to: 'p-nul', by: 'j-support' },
      { from: ['p-nul'], to: 'p-borne', by: 'j-max-fini' },
      { from: ['p-borne'], to: 'p-ponct', by: 'j-x-arb' },

      { from: ['d-X'], to: 'n-cauchy', by: 'j-cauchy', path: 'suite' },
      { from: ['n-cauchy', 'd-X'], to: 'n-lim', by: 'j-coord-lim', path: 'suite' },
      { from: ['n-cauchy', 'n-lim'], to: 'non-complet', by: 'j-def-complet', path: 'suite' },
      { from: ['t-lip', 'p-ponct', 't-sup'], to: 'non-complet', by: 'j-bs-contra', path: 'bs' },
      { from: ['echec'], to: 'non-complet', by: 'j-baire-contra', path: 'baire' },

      { from: ['d-Fm', 't-lip'], to: 'f-ferme', by: 'j-ferme' },
      { from: ['d-Fm', 'p-ponct'], to: 'f-recouvre', by: 'j-recouvre' },
      { from: ['d-bou', 'd-Tn', 'd-en'], to: 'f-point', by: 'j-calc-z' },
      { from: ['f-point', 'd-Fm'], to: 'f-interieur', by: 'j-interieur' },
      { from: ['f-ferme', 'f-recouvre', 'f-interieur'], to: 'echec', by: 'j-echec' },

      { from: ['t-lip', 'p-ponct', 't-sup', 'non-complet', 'echec'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-baire',
        by: 'j-baire-normes',
        verdict: 'incorrect',
        concept: 'complet-necessaire',
        message: t`Le théorème de Baire exige un espace complet : il ne s'applique pas ici, précisément parce que $X$ n'est pas complet.`,
      },
      {
        conclusion: 'x-baire',
        verdict: 'incorrect',
        concept: 'complet-necessaire',
        message: t`Tous les $F_m$ sont au contraire d'intérieur vide. Le théorème de Baire supposerait $X$ complet.`,
        counterexample: t`Pour $a\in X$ nul au-delà de $N_a$, $r>0$, et $n>N_a$ tel que $nr/2>m$, le point $z=a+\tfrac r2e_n$ est dans $B(a,r)$ mais pas dans $F_m$.`,
      },
      {
        conclusion: 'x-complet',
        by: 'j-coord-cv',
        verdict: 'incorrect',
        concept: 'complet-necessaire',
        message: t`La convergence coordonnée par coordonnée fournit bien une suite limite, mais cette limite peut ne pas être à support fini : elle n'appartient pas forcément à $X$.`,
        counterexample: t`$x^{(N)}=(1,\tfrac12,\dots,\tfrac1N,0,\dots)$ converge coordonnée par coordonnée vers $(1/k)_k\notin c_{00}$.`,
      },
      {
        conclusion: 'x-complet',
        verdict: 'incorrect',
        concept: 'complet-necessaire',
        message: t`La complétude de $\mathbb R$ ne se transmet pas à $c_{00}$ : la limite d'une suite de Cauchy peut sortir de $c_{00}$.`,
        counterexample: t`$x^{(N)}=(1,\tfrac12,\dots,\tfrac1N,0,\dots)$ est de Cauchy, sans limite dans $c_{00}$.`,
      },
      {
        conclusion: 'x-sup-fini',
        by: 'j-bs-normes',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Le théorème exige la complétude de $X$ : il ne s'applique pas à $c_{00}$ muni de $\|\cdot\|_\infty$.`,
      },
      {
        conclusion: 'x-sup-fini',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Une telle borne contredirait $\|T_n\|=n$ : la conclusion du théorème n'est garantie que sur un espace complet.`,
        counterexample: t`$\|T_n\|=n\to+\infty$, car $T_ne_n=n$ et $\|e_n\|_\infty=1$.`,
      },
      {
        conclusion: 'non-complet',
        by: 'j-bs-normes',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: 'Cette version du théorème est fausse : la complétude de l’espace de départ est indispensable, c’est précisément ce que montre cet exemple.',
      },
    ],
    removable: [
      {
        hypothesis: 'd-X',
        label: t`Modifier la norme de $X$`,
        necessary: true,
        explanation: 'Le contre-exemple dépend de la norme, et pas seulement de l’absence de complétude.',
        counterexample: t`Pour la norme $\|x\|_w=\sup_kk|x_k|$ sur $c_{00}$, on a $|T_nx|\le\|x\|_w$ : la famille est uniformément bornée, avec $\|T_n\|=1$, alors que $(c_{00},\|\cdot\|_w)$ n'est pas complet non plus.`,
      },
      {
        hypothesis: 'd-Tn',
        label: t`Retirer le facteur $n$`,
        necessary: true,
        explanation: 'Sans la croissance des normes, la famille est uniformément bornée : le défaut de complétude rend le théorème inapplicable, mais ne contredit pas sa conclusion pour toute famille.',
        counterexample: t`Pour $S_nx=x_n$ sur $c_{00}$, on a $\|S_n\|=1$ pour tout $n$.`,
      },
    ],
  },
  closedChecks: [
    {
      kind: 'rational',
      prompt: t`Pour $x=(3,-1,2,0,0,\dots)\in c_{00}$, valeur de $\sup_{n}|T_nx|$`,
      expected: '6',
    },
  ],
  solution: t`**Continuité.** $T_n$ est linéaire et $|T_nx|=n|x_n|\le n\|x\|_\infty$ ; de plus $T_ne_n=n$ et $\|e_n\|_\infty=1$, donc $\|T_n\|=n$.

**Bornitude ponctuelle.** Si $x$ est nul au-delà du rang $N_x$, alors $T_nx=0$ pour $n>N_x$, donc $\sup_n|T_nx|=\max_{k\le N_x}k|x_k|<\infty$.

**Absence de borne uniforme.** $\sup_n\|T_n\|=\sup_nn=+\infty$.

**Non-complétude.** La suite $x^{(N)}=(1,\tfrac12,\dots,\tfrac1N,0,\dots)$ est de Cauchy, car $\|x^{(M)}-x^{(N)}\|_\infty=\tfrac1{N+1}$ pour $M>N$. Si elle convergeait vers $y\in X$, on aurait, coordonnée par coordonnée, $y_k=1/k$ pour tout $k$, donc $y$ ne serait pas à support fini. On peut aussi conclure par contraposée de Banach–Steinhaus.

**Où la preuve échoue.** Les ensembles $F_m=\{x:\sup_n|T_nx|\le m\}$ sont fermés et recouvrent $X$, comme dans la preuve. Mais chaque $F_m$ est d'intérieur vide : si $a\in X$ est nul au-delà de $N_a$ et si $r>0$, on choisit $n>N_a$ tel que $nr/2>m$ et $z=a+\tfrac r2e_n$ ; alors $\|z-a\|_\infty=r/2<r$ et $|T_nz|=nr/2>m$. Ainsi $X$ est réunion dénombrable de fermés d'intérieur vide : c'est l'étape « Baire donne un $F_m$ d'intérieur non vide » qui tombe en défaut, ce qui est possible parce que $X$ n'est pas complet.

**Remarque.** Le contre-exemple dépend de la norme : pour $\|x\|_w=\sup_kk|x_k|$, on a $\|T_n\|\le 1$, bien que $(c_{00},\|\cdot\|_w)$ ne soit pas complet non plus.`,
  steps: [
    t`Calculer la norme exacte de chaque $T_n$.`,
    t`Vérifier la bornitude ponctuelle grâce au support fini.`,
    t`Montrer que $X$ n'est pas complet.`,
    t`Reprendre les fermés $F_m$ de la preuve de Banach–Steinhaus et montrer que chacun est d'intérieur vide.`,
    'Identifier l’étape de Baire comme point de rupture.',
  ],
  commonErrors: [
    { id: 'e-baire', description: 'Appliquer Baire sans vérifier la complétude.', concept: 'complet-necessaire' },
    { id: 'e-complet-coord', description: t`Confondre convergence coordonnée par coordonnée et convergence dans $c_{00}$.`, concept: 'complet-necessaire' },
    { id: 'e-quantif', description: t`Conclure à une borne uniforme à partir de la seule bornitude ponctuelle.`, concept: 'quantificateurs' },
  ],
  hints: [
    t`Quelle propriété de $X$ manque par rapport à l'énoncé de Banach–Steinhaus, et à quel moment de la preuve de ce théorème sert-elle ?`,
    t`Calcule d'abord la norme de $T_n$ et la bornitude ponctuelle grâce au support fini. Reprends ensuite les ensembles $F_m$ de la preuve : qu'est-ce qui les empêche d'être d'intérieur non vide ?`,
    t`Autour d'un point $a$ à support fini, ajoute $\tfrac r2e_n$ avec $n$ grand et au-delà du support de $a$ : $T_n$ y prend la valeur $nr/2$, arbitrairement grande.`,
  ],
  rubric: rubric({
    hypotheses: t`La non-complétude de $X$ est établie, et non simplement affirmée.`,
    methode: 'Le contre-exemple est construit explicitement et comparé à la preuve du théorème.',
    validite: t`Les calculs de $\|T_n\|$ et de l'intérieur des $F_m$ sont exacts.`,
    justifications: 'L’usage de Baire est explicitement exclu faute de complétude.',
    conclusion: 'L’étape précise de la preuve qui échoue est identifiée.',
  }),
  variant: {
    statement: t`Démontrer le théorème de Banach–Steinhaus à partir du théorème de Baire : si $X$ est un espace de Banach, $Y$ un espace normé et si $(T_i)_{i\in I}\subset\mathcal L(X,Y)$ vérifie $\sup_{i\in I}\|T_ix\|_Y<\infty$ pour chaque $x\in X$, alors $\sup_{i\in I}\|T_i\|_{\mathcal L(X,Y)}<\infty$.`,
    solution: t`Pour $m\in\mathbb N$, posons $F_m=\{x\in X:\|T_ix\|_Y\le m\ \forall i\in I\}$. Chaque $F_m$ est fermé, comme intersection des fermés $\{x:\|T_ix\|_Y\le m\}$, images réciproques de $[0,m]$ par les applications continues $x\mapsto\|T_ix\|_Y$. L'hypothèse donne $X=\bigcup_{m\in\mathbb N}F_m$ : pour $x\in X$, on choisit un entier $m\ge\sup_i\|T_ix\|_Y$.

Comme $X$ est complet et non vide, le théorème de Baire fournit $m_0\in\mathbb N$, $a\in X$ et $r>0$ tels que $\overline B(a,r)\subset F_{m_0}$. Pour $\|z\|_X\le r$ et $i\in I$, les points $a$ et $a+z$ sont dans $\overline B(a,r)$, donc $\|T_iz\|_Y\le\|T_i(a+z)\|_Y+\|T_ia\|_Y\le 2m_0$.

Pour $x\neq 0$ et $i\in I$, posons $z=rx/\|x\|_X$, de norme $r$. L'homogénéité donne $\|T_ix\|_Y=\frac{\|x\|_X}{r}\|T_iz\|_Y\le\frac{2m_0}{r}\|x\|_X$. Ainsi $\|T_i\|_{\mathcal L(X,Y)}\le 2m_0/r$ pour tout $i\in I$, et cette borne ne dépend pas de $i$.`,
    proof: {
      purpose: 'demonstration',
      goal: 'fin',
      nodes: [
        { id: 'h-banach', kind: 'hypothese', text: t`$X$ est un espace de Banach.` },
        { id: 'h-Y', kind: 'hypothese', text: t`$Y$ est un espace normé.` },
        { id: 'h-Ti', kind: 'hypothese', text: t`$(T_i)_{i\in I}\subset\mathcal L(X,Y)$.` },
        { id: 'h-ponct', kind: 'hypothese', text: t`Pour chaque $x\in X$ : $\sup_{i\in I}\|T_ix\|_Y<\infty$.` },
        { id: 'd-Fm', kind: 'definition', text: t`Pour $m\in\mathbb N$ : $F_m=\{x\in X : \|T_ix\|_Y\le m\ \ \forall i\in I\}$.` },
        { id: 'd-z', kind: 'definition', local: true, text: t`Soient $i\in I$ et $z\in X$ tels que $\|z\|_X\le r$.` },
        { id: 'd-x', kind: 'definition', local: true, text: t`Soient $i\in I$ et $x\in X\setminus\{0\}$ ; on pose $z=rx/\|x\|_X$.` },

        { id: 'f-ferme', kind: 'consequence', text: t`Chaque $F_m$ est fermé dans $X$.` },
        { id: 'f-recouvre', kind: 'consequence', text: t`$X=\bigcup_{m\in\mathbb N}F_m$.` },
        { id: 'baire', kind: 'application-theoreme', text: t`Il existe $m_0\in\mathbb N$, $a\in X$ et $r>0$ tels que $\overline B(a,r)\subset F_{m_0}$.` },
        { id: 'l-borne', kind: 'inegalite', text: t`$\|T_iz\|_Y\le\|T_i(a+z)\|_Y+\|T_ia\|_Y\le 2m_0$.` },
        { id: 'h-homog', kind: 'inegalite', text: t`$\|T_ix\|_Y=\frac{\|x\|_X}{r}\|T_iz\|_Y\le\frac{2m_0}{r}\|x\|_X$.` },
        { id: 'unif', kind: 'inegalite', text: t`$\|T_i\|_{\mathcal L(X,Y)}\le 2m_0/r$ pour tout $i\in I$.` },
        { id: 'fin', kind: 'conclusion', text: t`$\sup_{i\in I}\|T_i\|_{\mathcal L(X,Y)}<\infty$.` },

        // Propositions plausibles mais fausses.
        { id: 'x-Fm-ouvert', kind: 'consequence', distractor: true, after: ['f-ferme'], text: t`Chaque $F_m$ est ouvert dans $X$.` },
        { id: 'x-tous-int', kind: 'consequence', distractor: true, after: ['f-recouvre'], text: t`Pour tout $m\in\mathbb N$, $F_m$ est d'intérieur non vide.` },
        { id: 'x-Ta', kind: 'inegalite', distractor: true, after: ['baire'], text: t`$\|T_iz\|_Y\le\|T_i(a+z)\|_Y$.` },
      ],
      justifications: [
        { id: 'j-ferme', label: t`$F_m$ est une intersection de fermés, images réciproques de $[0,m]$ par les applications continues $x\mapsto\|T_ix\|_Y$.` },
        { id: 'j-recouvre', label: t`Pour $x\in X$, choisir un entier $m\ge\sup_i\|T_ix\|_Y$.` },
        { id: 'j-baire', label: 'Théorème de Baire dans l’espace complet non vide $X$.', theorem: 'baire' },
        { id: 'j-deplace', label: t`$a$ et $a+z$ appartiennent à $\overline B(a,r)$, et $T_iz=T_i(a+z)-T_ia$ par linéarité.` },
        { id: 'j-homog', label: t`Homogénéité de $T_i$ et de la norme, avec $\|z\|_X=r$.` },
        { id: 'j-def-norme', label: 'Définition de la norme d’opérateur.' },
        { id: 'j-sup', label: t`La borne $2m_0/r$ ne dépend pas de $i$.` },
        // Justifications séduisantes et fausses.
        { id: 'j-sup-finis', label: 'Une borne supérieure de nombres finis est finie.' },
        { id: 'j-baire-normes', label: 'Le théorème de Baire s’applique dans tout espace métrique.', theorem: 'baire' },
      ],
      rules: [
        { from: ['h-Ti', 'h-Y', 'd-Fm'], to: 'f-ferme', by: 'j-ferme' },
        { from: ['h-ponct', 'd-Fm'], to: 'f-recouvre', by: 'j-recouvre' },
        { from: ['h-banach', 'f-ferme', 'f-recouvre'], to: 'baire', by: 'j-baire' },
        { from: ['baire', 'd-z', 'h-Ti'], to: 'l-borne', by: 'j-deplace' },
        { from: ['l-borne', 'd-x', 'h-Ti'], to: 'h-homog', by: 'j-homog' },
        { from: ['h-homog'], to: 'unif', by: 'j-def-norme' },
        { from: ['unif'], to: 'fin', by: 'j-sup' },
      ],
      traps: [
        {
          conclusion: 'x-Fm-ouvert',
          verdict: 'incorrect',
          concept: 'fermeture-espace',
          message: t`$F_m$ est défini par des inégalités larges : il est fermé, et n'a aucune raison d'être ouvert.`,
          counterexample: t`$X=Y=\mathbb R$, $T_1=\mathrm{Id}$ : $F_1=[-1,1]$ n'est pas ouvert.`,
        },
        {
          conclusion: 'x-tous-int',
          verdict: 'incorrect',
          concept: 'quantificateurs',
          message: t`Baire fournit l'existence d'un fermé d'intérieur non vide parmi les $F_m$, pas la propriété pour chacun.`,
          counterexample: t`$X=Y=\mathbb R$, $T_1=\mathrm{Id}$ : $F_0=\{0\}$ est d'intérieur vide.`,
        },
        {
          conclusion: 'x-Ta',
          verdict: 'incorrect',
          concept: 'justification-absente',
          message: t`L'inégalité triangulaire appliquée à $T_iz=T_i(a+z)-T_ia$ fait intervenir les deux termes $\|T_i(a+z)\|_Y$ et $\|T_ia\|_Y$.`,
          counterexample: t`$X=Y=\mathbb R$, $T_1=\mathrm{Id}$, $a=1$, $z=-1$ : $|T_1z|=1$, alors que $|T_1(a+z)|=0$.`,
        },
        {
          conclusion: 'unif',
          by: 'j-sup-finis',
          verdict: 'incorrect',
          concept: 'quantificateurs',
          message: t`Une borne supérieure de nombres finis peut être infinie : c'est précisément pour éviter cet écueil que l'on passe par une borne $2m_0/r$ indépendante de $i$.`,
          counterexample: t`$\sup_{k\ge 1}k=+\infty$.`,
        },
        {
          conclusion: 'baire',
          by: 'j-baire-normes',
          verdict: 'incorrect',
          concept: 'complet-necessaire',
          message: t`Baire exige un espace complet : sur $c_{00}$ muni de $\|\cdot\|_\infty$, les fermés $F_m$ associés à $T_nx=nx_n$ recouvrent l'espace et sont tous d'intérieur vide.`,
        },
      ],
      removable: [
        {
          hypothesis: 'h-banach',
          label: t`Retirer la complétude de $X$`,
          necessary: true,
          explanation: 'Sans complétude, le théorème de Baire ne s’applique pas : aucun fermé d’intérieur non vide n’est garanti.',
          counterexample: t`$X=c_{00}$ muni de $\|\cdot\|_\infty$ et $T_nx=nx_n$ : la famille est ponctuellement bornée, et $\|T_n\|=n$.`,
        },
        {
          hypothesis: 'h-ponct',
          label: 'Retirer la bornitude ponctuelle',
          necessary: true,
          explanation: t`Les $F_m$ peuvent alors ne plus recouvrir $X$.`,
          counterexample: t`$T_nx=nx$ sur $\mathbb R$ : seul $x=0$ appartient à $\bigcup_mF_m$, et $\|T_n\|=n$.`,
        },
        {
          hypothesis: 'h-Ti',
          label: t`Retirer la continuité des $T_i$`,
          necessary: true,
          explanation: t`Sans continuité, les $F_m$ peuvent ne plus être fermés, et la conclusion cesse d'avoir un sens : un opérateur non continu est de norme infinie.`,
          counterexample: t`Soit $T$ une forme linéaire non continue sur un espace de Banach de dimension infinie (construite à l'aide d'une base algébrique) : la famille $\{T\}$ vérifie l'hypothèse ponctuelle, et $\|T\|=+\infty$.`,
        },
      ],
    },
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT05: TheoremModule = {
  theorem: {
    id: 'banach-steinhaus',
    spaces: [
      t`$X$ : espace de Banach ; $Y$ : espace normé.`,
      t`$\mathcal L(X,Y)$ : espace des applications linéaires continues de $X$ dans $Y$, muni de la norme d'opérateur $\|T\|_{\mathcal L(X,Y)}=\sup_{\|x\|_X\le 1}\|Tx\|_Y$.`,
      t`$(T_i)_{i\in I}\subset\mathcal L(X,Y)$ : famille quelconque, dénombrable ou non.`,
    ],
    hypotheses: [
      {
        id: 'h-complet',
        text: t`$X$ est complet.`,
        whenRemoved: t`Sur $X=c_{00}$ muni de $\|\cdot\|_\infty$, les formes $T_nx=nx_n$ sont ponctuellement bornées et $\|T_n\|=n$.`,
      },
      {
        id: 'h-continu',
        text: t`Chaque $T_i$ est linéaire et continu.`,
        whenRemoved: t`Si $T$ est une forme linéaire non continue sur un espace de Banach de dimension infinie (construite à l'aide d'une base algébrique), la famille $\{T\}$ vérifie l'hypothèse ponctuelle, mais $\|T\|=+\infty$.`,
      },
      {
        id: 'h-ponctuelle',
        text: t`Pour chaque $x\in X$ : $\sup_{i\in I}\|T_ix\|_Y<\infty$.`,
        whenRemoved: t`$T_nx=nx$ sur $\mathbb R$ : $\sup_n|T_n1|=+\infty$ et $\|T_n\|=n$.`,
      },
    ],
    statement: t`Si $X$ est un espace de Banach, $Y$ un espace normé et si $(T_i)_{i\in I}\subset\mathcal L(X,Y)$ vérifie $\sup_{i\in I}\|T_ix\|_Y<\infty$ pour chaque $x\in X$, alors $\sup_{i\in I}\|T_i\|_{\mathcal L(X,Y)}<\infty$.`,
    conclusions: {
      autre: t`Une bornitude ponctuelle, vecteur par vecteur, devient une borne uniforme de la famille pour la norme d'opérateur.`,
    },
    sourceProof: 'idee',
    proofOutline: [
      t`Poser $F_m=\{x\in X:\|T_ix\|_Y\le m\ \ \forall i\in I\}$ : chaque $F_m$ est fermé, comme intersection de fermés, et les $F_m$ recouvrent $X$ par hypothèse.`,
      t`Par le théorème de Baire, $X$ étant complet, un $F_{m_0}$ contient une boule fermée $\overline B(a,r)$ avec $r>0$.`,
      t`Déplacement : pour $\|z\|_X\le r$ et $i\in I$, $\|T_iz\|_Y\le\|T_i(a+z)\|_Y+\|T_ia\|_Y\le 2m_0$.`,
      t`Homogénéité : pour $x\neq 0$, appliquer ce qui précède à $z=rx/\|x\|_X$ donne $\|T_ix\|_Y\le\frac{2m_0}{r}\|x\|_X$ ; donc $\sup_i\|T_i\|\le 2m_0/r$.`,
    ],
    warnings: [
      t`L'hypothèse se lit $\forall x,\ \exists C_x,\ \forall i$ : la constante dépend de $x$. La conclusion se lit $\exists C,\ \forall i,\ \forall x,\ \|T_ix\|\le C\|x\|$.`,
      t`La complétude porte sur $X$ seul : $Y$ est simplement normé.`,
      t`Une convergence simple $T_nx\to Tx$ ne donne pas la convergence pour la norme d'opérateur, seulement $\sup_n\|T_n\|<\infty$.`,
    ],
    usefulFor: 'Passer de contrôles individuels sur des vecteurs à une estimation uniforme d’une famille d’opérateurs.',
    verification: {
      origin: 'complement',
      review: 'machine',
      notes: 'Le polycopié (p. PDF 9) ne donne que l’idée de preuve ; le détail des quatre étapes est rédigé pour ProofLab.',
    },
  },
  definitions: [
    {
      id: 'bs-bornitude-ponctuelle',
      term: 'Famille ponctuellement bornée',
      statement: t`La famille $(T_i)_{i\in I}\subset\mathcal L(X,Y)$ est ponctuellement bornée lorsque $\sup_{i\in I}\|T_ix\|_Y<\infty$ pour chaque $x\in X$, c'est-à-dire : $\forall x\in X,\ \exists C_x\ge 0,\ \forall i\in I,\ \|T_ix\|_Y\le C_x$.`,
      source: poly(9, 'Section 2.1'),
    },
    {
      id: 'bs-bornitude-uniforme',
      term: 'Famille uniformément bornée',
      statement: t`La famille $(T_i)_{i\in I}\subset\mathcal L(X,Y)$ est uniformément bornée lorsque $\sup_{i\in I}\|T_i\|_{\mathcal L(X,Y)}<\infty$, c'est-à-dire : $\exists C\ge 0,\ \forall i\in I,\ \forall x\in X,\ \|T_ix\|_Y\le C\|x\|_X$.`,
      source: poly(9, 'Section 2.1'),
    },
    {
      id: 'bs-baire',
      term: 'Théorème de Baire (outil admis)',
      statement: t`Si un espace métrique complet non vide est réunion dénombrable de fermés, l'un d'eux est d'intérieur non vide.`,
      source: complement('Outil admis du parcours, cité sans démonstration dans la section 2.1'),
    },
  ],
  concepts: [
    {
      id: 'banach-steinhaus-convergence-simple',
      label: 'Convergence simple et convergence en norme d’opérateur',
      reminder: t`La convergence simple $T_nx\to Tx$ pour chaque $x$ n'entraîne pas $\|T_n-T\|\to 0$ : Banach–Steinhaus donne seulement $\sup_n\|T_n\|<\infty$.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-bs-complet',
      theoremId: 'banach-steinhaus',
      title: 'Espace non complet',
      claim: t`Si $X$ est un espace normé, $Y$ normé et si $(T_i)_{i\in I}\subset\mathcal L(X,Y)$ vérifie $\sup_i\|T_ix\|_Y<\infty$ pour chaque $x\in X$, alors $\sup_i\|T_i\|<\infty$.`,
      correctStatement: t`Le théorème exige que $X$ soit complet.`,
      task: t`Sur $X=c_{00}$ muni de $\|\cdot\|_\infty$, on pose $T_nx=nx_n$. Pour $x=(1,-2,0,5,0,\dots)$, calcule $\sup_n|T_nx|$, puis la norme $\|T_7\|$.`,
      check: {
        kind: 'rational-vector',
        prompt: t`Valeurs de $\sup_n|T_nx|$ et de $\|T_7\|$`,
        expected: ['20', '7'],
        labels: ['sup', '‖T₇‖'],
      },
      explanation: t`Ici $T_1x=1$, $T_2x=-4$, $T_3x=0$, $T_4x=20$, et $T_nx=0$ pour $n\ge 5$, d'où $\sup_n|T_nx|=20$. En général, $\sup_n|T_nx|<\infty$ pour tout $x\in c_{00}$, grâce au support fini, mais $\|T_n\|=n$ car $T_ne_n=n$ et $\|e_n\|_\infty=1$. La famille est donc ponctuellement bornée sans être uniformément bornée, ce qui montre que $c_{00}$ muni de $\|\cdot\|_\infty$ n'est pas complet.`,
      concept: 'complet-necessaire',
      source: poly(39, 'Annexe B, exercice 5, difficile'),
    },
    {
      id: 'ce-bs-convergence-simple',
      theoremId: 'banach-steinhaus',
      title: 'Convergence simple sans convergence en norme',
      claim: t`Si $(T_n)_{n}\subset\mathcal L(X,Y)$ vérifie $T_nx\to Tx$ pour tout $x\in X$, alors $\|T_n-T\|_{\mathcal L(X,Y)}\to 0$.`,
      correctStatement: t`Dans un espace de Banach $X$, la convergence simple entraîne seulement $\sup_n\|T_n\|<\infty$ ; la convergence en norme d'opérateur peut échouer.`,
      task: t`Sur $X=Y=\ell^2$, soit $P_n$ la projection orthogonale sur les $n$ premières coordonnées : $P_nx\to x$ pour tout $x$. Détermine $\|P_n-\mathrm{Id}\|_{\mathcal L(\ell^2)}$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\|P_n-\mathrm{Id}\|$`, expected: '1' },
      explanation: t`$\mathrm{Id}-P_n$ est la projection orthogonale sur les coordonnées de rang $>n$ : elle est non nulle, de norme $1$, comme on le voit sur le vecteur $e_{n+1}$. Ainsi $\|P_n-\mathrm{Id}\|=1$ pour tout $n$, alors que $P_nx\to x$ pour tout $x\in\ell^2$, comme reste d'une série convergente.`,
      concept: 'banach-steinhaus-convergence-simple',
      source: poly(39, 'Annexe B, exercice 5, intermédiaire'),
    },
    {
      id: 'ce-bs-dense',
      theoremId: 'banach-steinhaus',
      title: 'Bornitude sur une partie dense',
      claim: t`Si $X$ est un espace de Banach, $Y$ un espace normé et si $\sup_i\|T_ix\|_Y<\infty$ pour tout $x$ d'une partie dense de $X$, alors $\sup_i\|T_i\|<\infty$.`,
      correctStatement: t`L'hypothèse doit porter sur chaque $x\in X$, et non seulement sur une partie dense.`,
      task: t`Sur $X=\ell^2$, $Y=\mathbb R$, soit $T_nx=nx_n$. La famille est bornée sur la partie dense $c_{00}$, et $\|T_n\|=n$. Pour le point $x=(k^{-3/4})_{k\ge 1}\in\ell^2$, calcule $T_{16}x$.`,
      check: { kind: 'rational', prompt: t`Valeur de $T_{16}x$`, expected: '2' },
      explanation: t`Pour $x=(k^{-3/4})_k$, on a $\sum_kk^{-3/2}<\infty$, donc $x\in\ell^2$, et $T_nx=n^{1/4}$, ce qui donne $T_{16}x=2$ et $\sup_n|T_nx|=+\infty$. Pour $x\in c_{00}$, $T_nx$ s'annule pour $n$ assez grand : la famille est bornée en chaque point de la partie dense $c_{00}$, et $\|T_n\|=n$. L'espace $\ell^2$ étant complet, il n'y a pas de contradiction : l'hypothèse ponctuelle échoue en $x$.`,
      concept: 'hypotheses-theoreme',
      source: poly(9, 'Section 2.1 (hypothèse sur chaque point)'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT05;
