/**
 * Résultat 30 — Formes fermées et théorèmes de représentation (polycopié, section 6.6, p. PDF 25).
 * Exercices : annexe B, n° 30 (p. PDF 43).
 */
import { t, rubric, poly, FROM_POLY, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'formes-fermees.facile',
  theoremId: 'formes-fermees',
  level: 'facile',
  title: 'Norme de forme de $a(u,v)=\\int_0^1u\'v\'$',
  statement: t`Dans $H=L^2(]0,1[)$, soit $a(u,v)=\int_0^1u'v'$ sur $D(a)=H^1_0(]0,1[)$. Déterminer la norme de forme $\|\cdot\|_a$, en déduire que $a$ est une forme symétrique positive, fermée, densément définie, et calculer $\|u\|_a^2$ pour $u(x)=x(1-x)$.`,
  source: poly(43, 'Exercice 30, facile (p. PDF 43) ; vocabulaire de la section 6.6 (p. PDF 25)'),
  prerequisites: ['distributions'],
  concepts: ['formes-fermees-norme-forme', 'fermeture-espace', 'hypotheses-theoreme', 'circularite'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-L2', kind: 'hypothese', text: t`$H=L^2(]0,1[)$ est un espace de Hilbert réel, de norme $\|\cdot\|_H$.` },
      { id: 'h-H1', kind: 'hypothese', text: t`$H^1(]0,1[)$ est complet pour la norme $\|u\|_{H^1}^2=\|u\|_H^2+\|u'\|_H^2$.` },
      { id: 'd-a', kind: 'definition', text: t`$a(u,v)=\int_0^1u'v'$ sur $D(a)=H^1_0(]0,1[)$, adhérence de $C^\infty_c(]0,1[)$ dans $H^1(]0,1[)$.` },
      { id: 'd-norme', kind: 'definition', text: t`$\|u\|_a^2=a(u,u)+\|u\|_H^2$ pour $u\in D(a)$.` },
      { id: 'd-u', kind: 'definition', text: t`$u(x)=x(1-x)$ sur $[0,1]$.` },

      { id: 'sym', kind: 'consequence', text: t`$a$ est symétrique et positive : $a(u,v)=a(v,u)$ et $a(u,u)\ge 0$.` },
      { id: 'dense', kind: 'consequence', text: t`$D(a)$ est dense dans $H$.` },
      { id: 'id', kind: 'egalite', text: t`Pour tout $u\in D(a)$ : $\|u\|_a=\|u\|_{H^1}$.` },
      { id: 'ferme', kind: 'consequence', text: t`$H^1_0(]0,1[)$ est fermé dans $H^1(]0,1[)$.` },
      { id: 'complet', kind: 'consequence', text: t`$\big(H^1_0(]0,1[),\|\cdot\|_{H^1}\big)$ est complet.` },
      { id: 'fermee', kind: 'consequence', text: t`La forme $a$ est fermée.` },

      { id: 'u-in', kind: 'consequence', text: t`$u\in D(a)$.` },
      { id: 'grad', kind: 'egalite', text: t`$\int_0^1|u'|^2=\frac13$.` },
      { id: 'l2', kind: 'egalite', text: t`$\int_0^1|u|^2=\frac1{30}$.` },
      {
        id: 'val',
        kind: 'egalite',
        text: t`$\|u\|_a^2=\frac{11}{30}$.`,
        masked: t`Valeur de $\|u\|_a^2$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur exacte de $\|u\|_a^2$ pour $u(x)=x(1-x)$`, expected: '11/30' },
      },

      { id: 'fin', kind: 'conclusion', text: t`$\|\cdot\|_a$ est la norme de $H^1$, $a$ est symétrique positive, fermée, densément définie, et $\|u\|_a^2=\frac{11}{30}$ pour $u(x)=x(1-x)$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-oubli', kind: 'egalite', distractor: true, after: ['id'], text: t`Pour tout $u\in D(a)$ : $\|u\|_a^2=\int_0^1|u'|^2$.` },
      { id: 'x-cinf', kind: 'consequence', distractor: true, after: ['fermee'], text: t`La restriction de $a$ à $C^\infty_c(]0,1[)$ est encore une forme fermée.` },
    ],
    justifications: [
      { id: 'j-int-sym', label: t`Symétrie du produit réel sous l'intégrale ; $a(u,u)=\int_0^1|u'|^2\ge 0$.` },
      { id: 'j-dense', label: t`$C^\infty_c(]0,1[)\subset D(a)$, et $C^\infty_c(]0,1[)$ est dense dans $L^2(]0,1[)$.`, theorem: 'densite-cinf' },
      { id: 'j-dev', label: t`Écrire $a(u,u)+\|u\|_H^2=\|u'\|_H^2+\|u\|_H^2$ et comparer à la définition de $\|\cdot\|_{H^1}$.` },
      { id: 'j-adh', label: 'Une adhérence est fermée.' },
      { id: 'j-complet', label: 'Un sous-espace fermé d’un espace complet est complet.' },
      { id: 'j-def-fermee', label: t`Définition d'une forme fermée : $D(a)$ est complet pour $\|\cdot\|_a$.` },
      { id: 'j-1d', label: t`$u\in C^1([0,1])$ et $u(0)=u(1)=0$ : en dimension 1, $H^1_0$ est l'ensemble des fonctions de $H^1$ nulles au bord.` },
      { id: 'j-calc', label: t`$u'(x)=1-2x$, puis calcul de l'intégrale.` },
      { id: 'j-calc2', label: t`Développement de $x^2(1-x)^2$, puis intégration terme à terme.` },
      { id: 'j-somme', label: t`Addition des deux intégrales, grâce à l'identification de $\|\cdot\|_a$.` },
      { id: 'j-syn', label: 'Réunion des propriétés établies.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-borne', label: t`$a$ est continue sur $H\times H$, donc fermée.` },
      { id: 'j-poincare', label: t`L'inégalité de Poincaré rend le terme $\|u\|_H^2$ superflu : il disparaît de $\|\cdot\|_a$.` },
      { id: 'j-rep', label: 'Théorème de représentation des formes fermées.', theorem: 'formes-fermees' },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['d-a'], to: 'sym', by: 'j-int-sym' },
      { from: ['d-a', 'h-L2'], to: 'dense', by: 'j-dense' },
      { from: ['d-a', 'd-norme'], to: 'id', by: 'j-dev' },
      { from: ['d-a'], to: 'ferme', by: 'j-adh' },
      { from: ['ferme', 'h-H1'], to: 'complet', by: 'j-complet' },
      { from: ['id', 'complet'], to: 'fermee', by: 'j-def-fermee' },
      { from: ['d-u', 'd-a'], to: 'u-in', by: 'j-1d' },
      { from: ['d-u'], to: 'grad', by: 'j-calc' },
      { from: ['d-u'], to: 'l2', by: 'j-calc2' },
      { from: ['grad', 'l2', 'id', 'u-in'], to: 'val', by: 'j-somme' },
      { from: ['sym', 'dense', 'id', 'fermee', 'val'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-oubli',
        verdict: 'incorrect',
        concept: 'formes-fermees-norme-forme',
        message: t`La norme de forme contient le terme $\|u\|_H^2$. Poincaré rend $\|u'\|_H$ équivalente à $\|\cdot\|_a$ sur $H^1_0$, mais pas égale.`,
        counterexample: t`Pour $u(x)=x(1-x)$ : $\int_0^1|u'|^2=\frac13$, alors que $\|u\|_a^2=\frac{11}{30}$.`,
      },
      {
        conclusion: 'id',
        by: 'j-poincare',
        verdict: 'incorrect',
        concept: 'formes-fermees-norme-forme',
        message: t`Une inégalité de Poincaré fournit une équivalence de normes, pas une égalité : le terme $\|u\|_H^2$ reste dans la définition.`,
      },
      {
        conclusion: 'x-cinf',
        verdict: 'incorrect',
        concept: 'fermeture-espace',
        message: t`$C^\infty_c(]0,1[)$ n'est pas complet pour $\|\cdot\|_a$ : la limite d'une suite de Cauchy peut sortir de cet espace.`,
        counterexample: t`$u(x)=x(1-x)\in H^1_0(]0,1[)\setminus C^\infty_c(]0,1[)$ est limite dans $H^1$ d'une suite de $C^\infty_c(]0,1[)$, de Cauchy pour $\|\cdot\|_a$, sans limite dans $C^\infty_c(]0,1[)$.`,
      },
      {
        conclusion: 'fermee',
        by: 'j-borne',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`$a$ n'est pas continue sur $H\times H$ : le rapport $a(u,u)/\|u\|_H^2$ n'est pas borné, et d'ailleurs $a$ n'est définie que sur $D(a)$.`,
        counterexample: t`Pour $u_n=\sin(n\pi\,\cdot)$ : $\|u_n\|_H^2=\frac12$ et $a(u_n,u_n)=\frac{n^2\pi^2}2$.`,
      },
      {
        conclusion: 'fermee',
        by: 'j-rep',
        verdict: 'incorrect',
        concept: 'circularite',
        message: 'Le théorème de représentation suppose la forme fermée : on ne peut pas l’invoquer pour obtenir cette propriété.',
      },
      {
        conclusion: 'fermee',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`La fermeture se démontre : identifie la norme de forme, puis un espace complet qui la porte.`,
      },
    ],
    removable: [
      {
        hypothesis: 'ferme',
        label: t`Ne plus disposer de la fermeture de $H^1_0$ dans $H^1$`,
        necessary: true,
        explanation: t`La complétude de $D(a)$ vient de ce que $H^1_0$ est un fermé de $H^1$.`,
        counterexample: t`Sur $D(a)=C^\infty_c(]0,1[)$, non fermé dans $H^1$, la forme $\int_0^1u'v'$ n'est pas fermée.`,
      },
      {
        hypothesis: 'h-H1',
        label: t`Retirer la complétude de $H^1$`,
        necessary: true,
        explanation: t`Un fermé d'un espace non complet n'a aucune raison d'être complet.`,
        counterexample: t`$C^1([0,1])$ est dense et strict dans $H^1(]0,1[)$ : muni de $\|\cdot\|_{H^1}$, il n'est pas complet.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Valeur de $\int_0^1|u'|^2$ pour $u(x)=x(1-x)$`, expected: '1/3' }],
  solution: t`**Norme de forme.** Pour $u\in D(a)$, $\|u\|_a^2=a(u,u)+\|u\|_H^2=\|u'\|_H^2+\|u\|_H^2=\|u\|_{H^1}^2$. La norme de forme est donc exactement la norme de $H^1$.

**Fermeture.** $H^1_0(]0,1[)$ est l'adhérence de $C^\infty_c(]0,1[)$ dans $H^1$ : c'est un fermé de $H^1$, complet, donc complet pour $\|\cdot\|_a$. La forme $a$ est fermée.

**Autres hypothèses.** $a$ est symétrique ; $a(u,u)=\int_0^1|u'|^2\ge 0$ ; $D(a)\supset C^\infty_c(]0,1[)$ est dense dans $L^2$.

**Calcul.** $u(x)=x(1-x)$ est de classe $C^1$ et s'annule en $0$ et $1$, donc $u\in D(a)$. On a $u'(x)=1-2x$, d'où $\int_0^1|u'|^2=\frac13$ ; puis $\int_0^1|u|^2=\int_0^1x^2(1-x)^2\,dx=\frac1{30}$. Ainsi $\|u\|_a^2=\frac{11}{30}$.`,
  steps: [
    t`Développer $\|u\|_a^2$ et reconnaître la norme de $H^1$.`,
    t`Déduire la complétude de $D(a)$ de la fermeture de $H^1_0$ dans $H^1$.`,
    t`Vérifier symétrie, positivité, densité.`,
    t`Calculer séparément $\int_0^1|u'|^2$ et $\int_0^1|u|^2$, puis additionner.`,
  ],
  commonErrors: [
    { id: 'e-oubli', description: t`Oublier le terme $\|u\|_H^2$ dans la norme de forme.`, concept: 'formes-fermees-norme-forme' },
    { id: 'e-borne', description: t`Croire que $a$ est continue sur $H\times H$.`, concept: 'hypotheses-theoreme' },
    { id: 'e-cinf', description: t`Penser que la forme est déjà fermée sur $C^\infty_c(]0,1[)$.`, concept: 'fermeture-espace' },
  ],
  hints: [
    t`Que vaut $\|u\|_a^2$ quand on écrit les deux termes de sa définition ? Quel espace complet y reconnais-tu ?`,
    t`La forme est fermée si $D(a)$ est complet pour $\|\cdot\|_a$. Regarde comment $H^1_0$ est défini à l'intérieur de $H^1$, puis calcule les deux intégrales.`,
    t`$H^1_0$ est une adhérence dans $H^1$, donc fermé, donc complet. Pour le calcul : $u'(x)=1-2x$ et $\int_0^1x^2(1-x)^2\,dx=\frac1{30}$.`,
  ],
  rubric: rubric({
    hypotheses: t`Symétrie, positivité, densité et fermeture sont établies séparément.`,
    methode: t`La norme de forme est identifiée à la norme de $H^1$ ; la fermeture vient d'un espace complet.`,
    validite: t`Le terme $\|u\|_H^2$ est conservé ; aucune continuité sur $H\times H$ n'est invoquée.`,
    justifications: t`L'appartenance de $u$ à $D(a)$ est justifiée.`,
    conclusion: t`La valeur $\frac{11}{30}$ est obtenue exactement.`,
  }),
  variant: {
    statement: t`Dans $H=L^2(]0,1[)$, soit $a(u,v)=\int_0^1u'v'$ sur $D(a)=H^1(]0,1[)$. Déterminer $\|\cdot\|_a$, montrer que $a$ est fermée, et calculer $\|w\|_a^2$ pour $w(x)=x$.`,
    solution: t`Pour $u\in H^1$ : $\|u\|_a^2=\|u'\|_H^2+\|u\|_H^2=\|u\|_{H^1}^2$. L'espace $H^1(]0,1[)$ étant complet, $a$ est fermée ; aucune condition au bord n'intervient. Pour $w(x)=x$, $w\in H^1$, $\int_0^1|w'|^2=1$ et $\int_0^1|w|^2=\frac13$, donc $\|w\|_a^2=\frac43$.`,
    closedChecks: [{ kind: 'rational', prompt: t`Valeur de $\|w\|_a^2$ pour $w(x)=x$`, expected: '4/3' }],
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h-H1', kind: 'hypothese', text: t`$H^1(]0,1[)$ est complet pour $\|u\|_{H^1}^2=\|u\|_H^2+\|u'\|_H^2$, où $H=L^2(]0,1[)$.` },
        { id: 'd-a', kind: 'definition', text: t`$a(u,v)=\int_0^1u'v'$ sur $D(a)=H^1(]0,1[)$.` },
        { id: 'd-w', kind: 'definition', text: t`$w(x)=x$ sur $[0,1]$.` },
        { id: 'id', kind: 'egalite', text: t`Pour tout $u\in D(a)$ : $\|u\|_a=\|u\|_{H^1}$.` },
        { id: 'fermee', kind: 'consequence', text: t`La forme $a$ est fermée.` },
        { id: 'w-in', kind: 'consequence', text: t`$w\in D(a)$.` },
        {
          id: 'val',
          kind: 'egalite',
          text: t`$\|w\|_a^2=\frac43$.`,
          masked: t`Valeur de $\|w\|_a^2$ : à calculer.`,
          check: { kind: 'rational', prompt: t`Valeur exacte de $\|w\|_a^2$`, expected: '4/3' },
        },
        { id: 'fin', kind: 'conclusion', text: t`$a$ est fermée de norme de forme $\|\cdot\|_{H^1}$, et $\|w\|_a^2=\frac43$.` },
        { id: 'x-dir', kind: 'consequence', distractor: true, text: t`La forme $a$ n'est pas fermée, car $H^1(]0,1[)$ n'est pas $H^1_0(]0,1[)$.` },
        { id: 'x-oubli', kind: 'egalite', distractor: true, after: ['id'], text: t`$\|w\|_a^2=\int_0^1|w'|^2=1$.` },
      ],
      justifications: [
        { id: 'j-dev', label: t`Écrire $a(u,u)+\|u\|_H^2=\|u'\|_H^2+\|u\|_H^2$.` },
        { id: 'j-complet', label: t`$D(a)=H^1(]0,1[)$ est complet pour la norme $\|\cdot\|_{H^1}$.` },
        { id: 'j-affine', label: t`$w$ est de classe $C^1$ sur $[0,1]$, donc appartient à $H^1(]0,1[)$.` },
        { id: 'j-calc', label: t`$\int_0^1|w'|^2=1$ et $\int_0^1|w|^2=\frac13$ : addition.` },
        { id: 'j-syn', label: 'Réunion des propriétés établies.' },
        { id: 'j-dirichlet', label: t`Une forme fermée doit avoir $H^1_0$ pour domaine.` },
      ],
      rules: [
        { from: ['d-a'], to: 'id', by: 'j-dev' },
        { from: ['id', 'h-H1', 'd-a'], to: 'fermee', by: 'j-complet' },
        { from: ['d-w', 'd-a'], to: 'w-in', by: 'j-affine' },
        { from: ['id', 'w-in'], to: 'val', by: 'j-calc' },
        { from: ['id', 'fermee', 'val'], to: 'fin', by: 'j-syn' },
      ],
      traps: [
        {
          conclusion: 'x-dir',
          verdict: 'incorrect',
          concept: 'fermeture-espace',
          message: t`Être fermée signifie que le domaine est complet pour la norme de forme : aucune condition au bord n'est requise.`,
          counterexample: t`$H^1(]0,1[)$ est complet pour $\|\cdot\|_{H^1}$, sans condition au bord.`,
        },
        {
          conclusion: 'fermee',
          by: 'j-dirichlet',
          verdict: 'incorrect',
          concept: 'fermeture-espace',
          message: t`Aucun théorème n'impose $H^1_0$ pour domaine : la complétude pour $\|\cdot\|_a$ est le seul critère.`,
        },
        {
          conclusion: 'x-oubli',
          verdict: 'incorrect',
          concept: 'formes-fermees-norme-forme',
          message: t`Le terme $\|w\|_H^2=\frac13$ a été oublié. Il n'y a d'ailleurs pas d'inégalité de Poincaré sur $H^1(]0,1[)$.`,
          counterexample: t`$\|w\|_a^2=1+\frac13=\frac43$.`,
        },
      ],
      removable: [
        {
          hypothesis: 'h-H1',
          label: t`Retirer la complétude de $H^1$`,
          necessary: true,
          explanation: t`La fermeture de $a$ est exactement la complétude de son domaine pour $\|\cdot\|_a$.`,
          counterexample: t`Sur $D(a)=C^1([0,1])$, muni de la même norme, la forme n'est pas fermée, car $C^1([0,1])$ est dense et strict dans $H^1(]0,1[)$.`,
        },
      ],
    },
  },
  verification: { ...COMPLEMENT, notes: 'L’exercice figure au polycopié sans corrigé ; calcul et vérification rédigés pour ProofLab.' },
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'formes-fermees.intermediaire',
  theoremId: 'formes-fermees',
  level: 'intermediaire',
  title: t`Construire $T=(I+A)^{-1}$ par Lax–Milgram`,
  statement: t`Soit $H$ un Hilbert réel et $a$ une forme symétrique, positive, fermée, densément définie sur $H$. On munit $V=D(a)$ du produit scalaire $(u,v)_a=a(u,v)+\langle u,v\rangle_H$. Montrer que pour tout $f\in H$ il existe un unique $Tf\in V$ tel que $a(Tf,v)+\langle Tf,v\rangle_H=\langle f,v\rangle_H$ pour tout $v\in V$ ; que $T$ est borné, symétrique, positif, injectif à image dense ; puis que $A=T^{-1}-I$, de domaine $D(A)=\mathrm{Im}\,T$, est auto-adjoint positif, vérifie $a(u,v)=\langle Au,v\rangle_H$ pour $u\in D(A)$, $v\in D(a)$, et $T=(I+A)^{-1}$.`,
  source: poly(43, 'Exercice 30, intermédiaire (p. PDF 43) ; démonstration de la section 6.6 (p. PDF 25)'),
  prerequisites: ['lax-milgram'],
  concepts: ['hypotheses-theoreme', 'symetrie-autoadjonction', 'circularite', 'domaine-operateur'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    paths: [
      { id: 'lax-milgram', label: t`Existence de $Tf$ par Lax–Milgram` },
      { id: 'riesz', label: t`Existence de $Tf$ par Riesz dans $(V,(\cdot,\cdot)_a)$` },
    ],
    nodes: [
      { id: 'h-sym', kind: 'hypothese', text: t`$a$ est symétrique : $a(u,v)=a(v,u)$ pour $u,v\in D(a)$.` },
      { id: 'h-pos', kind: 'hypothese', text: t`$a$ est positive : $a(u,u)\ge 0$ pour $u\in D(a)$.` },
      { id: 'h-dense', kind: 'hypothese', text: t`$D(a)$ est dense dans $H$.` },
      { id: 'h-fermee', kind: 'hypothese', text: t`$a$ est fermée : $D(a)$ est complet pour $\|u\|_a=\big(a(u,u)+\|u\|_H^2\big)^{1/2}$.` },
      { id: 'd-V', kind: 'definition', text: t`$V=D(a)$, $(u,v)_a=a(u,v)+\langle u,v\rangle_H$ ; on a $\|v\|_H\le\|v\|_a$ pour $v\in V$.` },
      { id: 'd-f', kind: 'definition', local: true, text: t`Soit $f\in H$.` },

      { id: 'v-hilb', kind: 'consequence', text: t`$(V,(\cdot,\cdot)_a)$ est un espace de Hilbert réel.` },
      { id: 'b-coer', kind: 'consequence', text: t`$(u,v)\mapsto(u,v)_a$ est bilinéaire, continue et coercive de constante $1$ sur $V$.` },
      { id: 'l-f', kind: 'inegalite', text: t`$v\mapsto\langle f,v\rangle_H$ est linéaire sur $V$ et $|\langle f,v\rangle_H|\le\|f\|_H\|v\|_a$.` },
      { id: 'lm', kind: 'application-theoreme', text: t`Il existe un unique $Tf\in V$ tel que $(Tf,v)_a=\langle f,v\rangle_H$ pour tout $v\in V$.` },
      { id: 't-lin', kind: 'consequence', text: t`$T:H\to V\subset H$ est linéaire.` },
      { id: 't-borne', kind: 'inegalite', text: t`$\|Tf\|_H\le\|Tf\|_a\le\|f\|_H$ : $T$ est borné sur $H$ et $\|T\|\le 1$.` },
      { id: 't-sym', kind: 'egalite', text: t`$\langle Tf,g\rangle_H=\langle f,Tg\rangle_H$ pour tous $f,g\in H$.` },
      { id: 't-pos', kind: 'inegalite', text: t`$\langle Tf,f\rangle_H=\|Tf\|_a^2\ge 0$.` },
      { id: 't-inj', kind: 'consequence', text: t`$T$ est injectif.` },
      { id: 't-dense', kind: 'consequence', text: t`$\mathrm{Im}\,T$ est dense dans $H$.` },
      { id: 'a-def', kind: 'consequence', text: t`$A=T^{-1}-I$ est bien défini sur $D(A)=\mathrm{Im}\,T\subset D(a)$.` },
      { id: 'a-ident', kind: 'egalite', text: t`$a(u,v)=\langle Au,v\rangle_H$ pour $u\in D(A)$ et $v\in D(a)$.` },
      { id: 'a-pos', kind: 'inegalite', text: t`$\langle Au,u\rangle_H=a(u,u)\ge 0$ pour $u\in D(A)$.` },
      { id: 'a-sa', kind: 'consequence', text: t`$A$ est auto-adjoint.` },
      { id: 'a-inv', kind: 'egalite', text: t`$I+A=T^{-1}$, c'est-à-dire $T=(I+A)^{-1}$.` },
      { id: 'fin', kind: 'conclusion', text: t`$T=(I+A)^{-1}$ est borné, symétrique, positif, injectif à image dense, et $A$ est auto-adjoint positif avec $a(u,v)=\langle Au,v\rangle_H$.` },

      { id: 'x-inv-borne', kind: 'consequence', distractor: true, after: ['a-inv'], text: t`$T^{-1}=I+A$ est borné sur $H$.` },
      { id: 'x-compact', kind: 'consequence', distractor: true, after: ['t-borne'], text: t`$T$ est un opérateur compact de $H$.` },
    ],
    justifications: [
      { id: 'j-hilb', label: t`Symétrie et positivité font de $(\cdot,\cdot)_a$ un produit scalaire ; la fermeture donne la complétude.` },
      { id: 'j-coer', label: t`$(u,u)_a=\|u\|_a^2$ et $|(u,v)_a|\le\|u\|_a\|v\|_a$.` },
      { id: 'j-cs', label: t`Cauchy–Schwarz dans $H$, puis $\|v\|_H\le\|v\|_a$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-lm', label: 'Théorème de Lax–Milgram dans l’espace de Hilbert $(V,(\\cdot,\\cdot)_a)$.', theorem: 'lax-milgram' },
      { id: 'j-riesz', label: t`Théorème de Riesz dans $(V,(\cdot,\cdot)_a)$ appliqué à $v\mapsto\langle f,v\rangle_H$.`, theorem: 'riesz' },
      { id: 'j-unic', label: t`$\alpha Tf+\beta Tg$ vérifie l'équation associée à $\alpha f+\beta g$ : unicité.` },
      { id: 'j-test-Tf', label: t`Tester par $v=Tf$ : $\|Tf\|_a^2=\langle f,Tf\rangle_H\le\|f\|_H\|Tf\|_a$.` },
      { id: 'j-croise', label: t`Tester l'équation de $Tg$ par $v=Tf$, celle de $Tf$ par $v=Tg$, et utiliser la symétrie de $a$.` },
      { id: 'j-test-f', label: t`$\langle Tf,f\rangle_H=\langle f,Tf\rangle_H=(Tf,Tf)_a$.` },
      { id: 'j-inj', label: t`Si $Tf=0$, alors $\langle f,v\rangle_H=0$ pour tout $v\in D(a)$, dense : $f=0$.` },
      { id: 'j-orth', label: t`$(\mathrm{Im}\,T)^\perp=\mathrm{Ker}\,T^*=\mathrm{Ker}\,T=\{0\}$ pour $T$ borné symétrique.` },
      { id: 'j-def-A', label: t`$T$ est une bijection linéaire de $H$ sur $\mathrm{Im}\,T\subset V$.` },
      { id: 'j-ident', label: t`Pour $u=Tf$ : $a(u,v)=\langle f,v\rangle_H-\langle u,v\rangle_H=\langle T^{-1}u-u,v\rangle_H$.` },
      { id: 'j-pos', label: t`Prendre $v=u$ dans l'identité de forme.` },
      { id: 'j-sa', label: t`Si $\langle T^{-1}u,v\rangle=\langle u,w\rangle$ pour tout $u=Th$, alors $\langle h,v\rangle=\langle h,Tw\rangle$ pour tout $h$, donc $v=Tw\in\mathrm{Im}\,T$ : $T^{-1}$, symétrique, est auto-adjoint, et $A=T^{-1}-I$ aussi.` },
      { id: 'j-inv', label: t`Définition de $A$.` },
      { id: 'j-syn', label: 'Réunion des propriétés établies.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-rep', label: 'Théorème de représentation des formes fermées.', theorem: 'formes-fermees' },
      { id: 'j-riesz-H', label: t`Riesz dans $H$ : $f$ se représente par lui-même, donc $Tf=f$.` },
      { id: 'j-sym-sa', label: 'Un opérateur symétrique est auto-adjoint.' },
    ],
    rules: [
      { from: ['h-sym', 'h-pos', 'h-fermee', 'd-V'], to: 'v-hilb', by: 'j-hilb' },
      { from: ['v-hilb', 'd-V'], to: 'b-coer', by: 'j-coer' },
      { from: ['d-f', 'd-V'], to: 'l-f', by: 'j-cs' },
      { from: ['v-hilb', 'b-coer', 'l-f'], to: 'lm', by: 'j-lm', path: 'lax-milgram' },
      { from: ['v-hilb', 'l-f'], to: 'lm', by: 'j-riesz', path: 'riesz' },
      { from: ['lm'], to: 't-lin', by: 'j-unic' },
      { from: ['lm', 't-lin', 'd-V'], to: 't-borne', by: 'j-test-Tf' },
      { from: ['lm', 'h-sym'], to: 't-sym', by: 'j-croise' },
      { from: ['lm'], to: 't-pos', by: 'j-test-f' },
      { from: ['lm', 'h-dense'], to: 't-inj', by: 'j-inj' },
      { from: ['t-sym', 't-borne', 't-inj'], to: 't-dense', by: 'j-orth' },
      { from: ['t-inj', 't-lin'], to: 'a-def', by: 'j-def-A' },
      { from: ['lm', 'a-def'], to: 'a-ident', by: 'j-ident' },
      { from: ['a-ident', 'h-pos'], to: 'a-pos', by: 'j-pos' },
      { from: ['t-sym', 't-borne', 't-dense', 'a-def'], to: 'a-sa', by: 'j-sa' },
      { from: ['a-def'], to: 'a-inv', by: 'j-inv' },
      { from: ['t-borne', 't-sym', 't-pos', 't-inj', 't-dense', 'a-ident', 'a-pos', 'a-sa', 'a-inv'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'lm',
        by: 'j-rep',
        verdict: 'incorrect',
        concept: 'circularite',
        message: 'C’est le théorème que cette construction démontre : il ne peut pas en fournir la première étape.',
      },
      {
        conclusion: 'lm',
        by: 'j-riesz-H',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Riesz dans $H$ ignore la forme $a$ : l'équation porte sur $(\cdot,\cdot)_a$, et c'est dans $(V,(\cdot,\cdot)_a)$ qu'il faut représenter $v\mapsto\langle f,v\rangle_H$.`,
        counterexample: t`Pour $a(u,v)=\int_0^1u'v'$ sur $H^1_0(]0,1[)$ et $f=1$, on a $Tf=1-\frac{\cosh(x-1/2)}{\cosh(1/2)}\neq f$.`,
      },
      {
        conclusion: 'a-sa',
        by: 'j-sym-sa',
        verdict: 'incorrect',
        concept: 'symetrie-autoadjonction',
        message: t`Pour un opérateur non borné, la symétrie ne donne que $A\subset A^*$ : il faut contrôler le domaine de l'adjoint.`,
        counterexample: t`$S=-\frac{d^2}{dx^2}$ sur $C^\infty_c(]0,1[)$ est symétrique ; son adjoint a pour domaine $H^2(]0,1[)$, strictement plus grand.`,
      },
      {
        conclusion: 'x-inv-borne',
        verdict: 'incorrect',
        concept: 'domaine-operateur',
        message: t`$T^{-1}=I+A$ n'est borné que si $A$ l'est : en général $A$ est un opérateur non borné, défini seulement sur $\mathrm{Im}\,T$.`,
        counterexample: t`Pour $a(u,v)=\int_0^1u'v'$ sur $H^1_0(]0,1[)$ : $\varphi_k=\sqrt2\sin(k\pi x)$ est unitaire et $\|T^{-1}\varphi_k\|_H=1+k^2\pi^2\to+\infty$.`,
      },
      {
        conclusion: 'x-compact',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Aucune hypothèse de compacité n'est faite : la compacité de $T$ demande une injection compacte de $D(a)$ dans $H$.`,
        counterexample: t`Pour $a=0$ sur $D(a)=H$ de dimension infinie, la forme est fermée et $T=I$, qui n'est pas compact.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-dense',
        label: t`Retirer la densité de $D(a)$`,
        necessary: true,
        explanation: t`Le noyau de $T$ est $D(a)^\perp$ : sans densité, $T$ n'est plus injectif et $T^{-1}$ n'existe pas.`,
        counterexample: t`$H=\mathbb R^2$, $D(a)=\mathbb R\times\{0\}$, $a(u,v)=u_1v_1$ : $T(f_1,f_2)=(f_1/2,0)$, donc $T(0,1)=0$.`,
      },
      {
        hypothesis: 'h-fermee',
        label: 'Retirer la fermeture de la forme',
        necessary: true,
        explanation: t`Sans complétude de $V$, ni Lax–Milgram ni Riesz ne s'appliquent, et l'équation peut n'avoir aucune solution dans $D(a)$.`,
        counterexample: t`$a(u,v)=\int_0^1u'v'$ sur $D(a)=C^\infty_c(]0,1[)$, $f=1$ : une solution $u\in C^\infty_c$ serait nulle près de $0$, où l'équation $-u''+u=1$ tomberait en défaut.`,
      },
    ],
  },
  solution: t`**Espace de Hilbert.** Par symétrie et positivité, $(\cdot,\cdot)_a$ est un produit scalaire sur $V=D(a)$ ; la fermeture de $a$ en fait un espace de Hilbert. La forme $(u,v)\mapsto(u,v)_a$ est continue et coercive de constante $1$.

**Existence de $Tf$.** Pour $f\in H$, $|\langle f,v\rangle_H|\le\|f\|_H\|v\|_H\le\|f\|_H\|v\|_a$. Lax–Milgram (ou simplement Riesz dans $V$) donne un unique $Tf\in V$ tel que $(Tf,v)_a=\langle f,v\rangle_H$ pour tout $v\in V$. L'unicité donne la linéarité de $T$.

**Propriétés de $T$.** Avec $v=Tf$ : $\|Tf\|_a^2=\langle f,Tf\rangle_H\le\|f\|_H\|Tf\|_a$, donc $\|Tf\|_H\le\|Tf\|_a\le\|f\|_H$. En testant l'équation de $Tg$ par $Tf$ et celle de $Tf$ par $Tg$, la symétrie de $a$ donne $\langle Tf,g\rangle_H=\langle f,Tg\rangle_H$. Ensuite $\langle Tf,f\rangle_H=\|Tf\|_a^2\ge 0$. Si $Tf=0$, alors $\langle f,v\rangle_H=0$ pour tout $v\in D(a)$, dense, donc $f=0$. Enfin $(\mathrm{Im}\,T)^\perp=\mathrm{Ker}\,T=\{0\}$.

**L'opérateur $A$.** On pose $A=T^{-1}-I$ sur $D(A)=\mathrm{Im}\,T\subset D(a)$. Pour $u=Tf$ et $v\in D(a)$ : $a(u,v)=\langle f,v\rangle_H-\langle u,v\rangle_H=\langle Au,v\rangle_H$, d'où $\langle Au,u\rangle_H=a(u,u)\ge 0$. L'opérateur $T^{-1}$ est symétrique ; si $\langle T^{-1}u,v\rangle_H=\langle u,w\rangle_H$ pour tout $u=Th$, alors $\langle h,v\rangle_H=\langle Th,w\rangle_H=\langle h,Tw\rangle_H$ pour tout $h$, donc $v=Tw\in D(T^{-1})$ et $T^{-1}v=w$. Ainsi $T^{-1}$ est auto-adjoint, et $A$ aussi. Par construction, $T=(I+A)^{-1}$.

**Vigilance.** $T^{-1}$ n'est pas borné en général, et $T$ n'est pas compact sans hypothèse supplémentaire.`,
  steps: [
    t`Munir $D(a)$ de $(\cdot,\cdot)_a$ et vérifier que c'est un Hilbert.`,
    t`Appliquer Lax–Milgram (ou Riesz) à $v\mapsto\langle f,v\rangle_H$.`,
    t`Tester par $Tf$, puis croiser les équations : bornitude, symétrie, positivité.`,
    t`Injectivité par densité de $D(a)$ ; densité de l'image par orthogonalité.`,
    t`Définir $A=T^{-1}-I$, établir l'identité de forme et l'auto-adjonction.`,
  ],
  commonErrors: [
    { id: 'e-circ', description: 'Invoquer le théorème de représentation pour construire la résolvante qui sert à le démontrer.', concept: 'circularite' },
    { id: 'e-riesz-H', description: t`Appliquer Riesz dans $H$ au lieu de $(V,(\cdot,\cdot)_a)$.`, concept: 'hypotheses-theoreme' },
    { id: 'e-sym', description: t`Conclure à l'auto-adjonction de $A$ à partir de la seule symétrie.`, concept: 'symetrie-autoadjonction' },
  ],
  hints: [
    t`Dans quel espace de Hilbert l'équation $a(u,v)+\langle u,v\rangle_H=\langle f,v\rangle_H$ est-elle une équation de Lax–Milgram ?`,
    t`Teste l'équation par $v=Tf$ pour la borne ; croise les équations de $Tf$ et $Tg$ pour la symétrie ; utilise la densité de $D(a)$ pour l'injectivité.`,
    t`Pour l'auto-adjonction de $T^{-1}$ : si $\langle T^{-1}u,v\rangle=\langle u,w\rangle$ pour tout $u=Th$, réécris cette égalité avec $h$ et identifie $v$.`,
  ],
  rubric: rubric({
    hypotheses: t`Les quatre hypothèses sur $a$ sont utilisées, chacune à sa place.`,
    methode: 'Lax–Milgram dans le bon espace, puis propriétés de la résolvante, puis définition de l’opérateur.',
    validite: t`Les tests $v=Tf$ et les croisements sont corrects ; $T^{-1}$ n'est pas supposé borné.`,
    justifications: 'L’auto-adjonction est démontrée par le domaine de l’adjoint, pas par la seule symétrie.',
    conclusion: t`$T=(I+A)^{-1}$ et l'identité de forme sont obtenues.`,
  }),
  variant: {
    statement: t`Dans $H=\mathbb R^2$ euclidien, soit $a(u,v)=u_1v_1+3u_2v_2$ sur $D(a)=\mathbb R^2$. Calculer $T$, l'opérateur $A=T^{-1}-I$, et $T(1,1)$.`,
    solution: t`L'équation $a(u,v)+\langle u,v\rangle=\langle f,v\rangle$ pour tout $v$ s'écrit $2u_1=f_1$ et $4u_2=f_2$. Donc $T=\mathrm{diag}(\frac12,\frac14)$, $A=T^{-1}-I=\mathrm{diag}(1,3)$, et l'on vérifie $a(u,v)=\langle Au,v\rangle$. Enfin $T(1,1)=(\frac12,\frac14)$.`,
    closedChecks: [{ kind: 'rational-vector', prompt: t`Coordonnées de $T(1,1)$`, expected: ['1/2', '1/4'], labels: ['x₁', 'x₂'] }],
  },
  verification: { ...FROM_POLY, notes: 'Architecture du polycopié (p. PDF 25) ; les propriétés de T, affirmées sans preuve, sont démontrées.' },
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'formes-fermees.difficile',
  theoremId: 'formes-fermees',
  level: 'difficile',
  title: t`Domaine de forme et domaine d'opérateur du Laplacien de Dirichlet`,
  statement: t`Soit $\Omega\subset\mathbb R^d$ un ouvert borné lipschitzien, $H=L^2(\Omega)$, $a(u,v)=\int_\Omega\nabla u\cdot\nabla v$ sur $D(a)=H^1_0(\Omega)$, et $A\ge 0$ l'opérateur auto-adjoint associé. On admet une base orthonormée $(\varphi_k)$ de $H$ avec $\varphi_k\in D(A)$, $A\varphi_k=\lambda_k\varphi_k$, $\lambda_k>0$, et l'on note $c_k(u)=\langle u,\varphi_k\rangle_H$. (i) Montrer que $D(A^{1/2})=H^1_0(\Omega)=D(a)$ et $a(u,v)=\langle A^{1/2}u,A^{1/2}v\rangle_H$. (ii) Pour $\Omega=]0,1[$ et $u(x)=\min(x,1-x)$, montrer que $u\in D(a)$ et $u\notin D(A)$.`,
  source: poly(43, 'Exercice 30, difficile (p. PDF 43) ; énoncé de la section 6.6 (p. PDF 25)'),
  prerequisites: ['poincare', 'spectral-compact', 'spectral-general'],
  concepts: ['formes-fermees-domaine', 'domaine-operateur', 'regularite-bord', 'hypotheses-theoreme'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-poinc', kind: 'hypothese', text: t`Par Poincaré, $a(u,u)^{1/2}$ est sur $H^1_0(\Omega)$ une norme équivalente à celle de $H^1$ : $(H^1_0(\Omega),a)$ est un espace de Hilbert.` },
      { id: 'h-rep', kind: 'hypothese', text: t`$D(A)\subset D(a)$ et $a(u,v)=\langle Au,v\rangle_H$ pour $u\in D(A)$, $v\in D(a)$.` },
      { id: 'h-base', kind: 'hypothese', text: t`$(\varphi_k)$ est une base orthonormée de $H$, $\varphi_k\in D(A)$, $A\varphi_k=\lambda_k\varphi_k$, $\lambda_k>0$.` },
      { id: 'd-calc', kind: 'definition', text: t`Calcul fonctionnel : $D(A^{1/2})=\{u\in H : \sum_k\lambda_kc_k(u)^2<\infty\}$, $A^{1/2}u=\sum_k\sqrt{\lambda_k}\,c_k(u)\varphi_k$, et $D(A)=\{u\in H : \sum_k\lambda_k^2c_k(u)^2<\infty\}$.` },
      { id: 'h-1d', kind: 'hypothese', text: t`Pour $\Omega=]0,1[$ : $\varphi_k(x)=\sqrt2\sin(k\pi x)$ et $\lambda_k=k^2\pi^2$.` },
      { id: 'd-u', kind: 'definition', text: t`$u(x)=\min(x,1-x)$ sur $[0,1]$.` },

      { id: 'o-orth', kind: 'egalite', text: t`$a(\varphi_j,v)=\lambda_j\langle\varphi_j,v\rangle_H$ pour $v\in H^1_0(\Omega)$ ; en particulier $a(\varphi_j,\varphi_k)=\lambda_j\delta_{jk}$.` },
      { id: 'o-onb', kind: 'consequence', text: t`$e_k=\varphi_k/\sqrt{\lambda_k}$ forme une famille orthonormée de $(H^1_0(\Omega),a)$.` },
      { id: 'o-total', kind: 'consequence', text: t`Si $v\in H^1_0(\Omega)$ et $a(v,e_k)=0$ pour tout $k$, alors $v=0$.` },
      { id: 'o-hilb', kind: 'consequence', text: t`$(e_k)$ est une base hilbertienne de $(H^1_0(\Omega),a)$.` },
      { id: 'c-coef', kind: 'egalite', text: t`Pour $u\in H^1_0(\Omega)$ : $a(u,e_k)=\sqrt{\lambda_k}\,c_k(u)$.` },
      { id: 'c-pars', kind: 'egalite', text: t`Pour $u\in H^1_0(\Omega)$ : $a(u,u)=\sum_k\lambda_kc_k(u)^2<\infty$ ; donc $H^1_0(\Omega)\subset D(A^{1/2})$.` },
      { id: 'c-rec', kind: 'inclusion', text: t`Si $\sum_k\lambda_kc_k(u)^2<\infty$, les sommes partielles $\sum_{k\le N}c_k(u)\varphi_k$ convergent dans $(H^1_0(\Omega),a)$ et dans $H$, vers $u$ : $D(A^{1/2})\subset H^1_0(\Omega)$.` },
      { id: 'eq-dom', kind: 'egalite', text: t`$D(A^{1/2})=H^1_0(\Omega)=D(a)$.` },
      { id: 'eq-forme', kind: 'egalite', text: t`Pour $u,v\in H^1_0(\Omega)$ : $a(u,v)=\sum_k\lambda_kc_k(u)c_k(v)=\langle A^{1/2}u,A^{1/2}v\rangle_H$.` },

      { id: 's-in', kind: 'consequence', text: t`$u\in H^1_0(]0,1[)=D(a)$, avec $u'=\mathbb 1_{]0,1/2[}-\mathbb 1_{]1/2,1[}$.` },
      { id: 's-coef', kind: 'egalite', text: t`$c_k(u)=\dfrac{2\sqrt2\,\sin(k\pi/2)}{k^2\pi^2}$.` },
      {
        id: 's-forme',
        kind: 'egalite',
        text: t`$a(u,u)=\int_0^1|u'|^2=1$.`,
        masked: t`Valeur de $a(u,u)$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur exacte de $a(u,u)$`, expected: '1' },
      },
      {
        id: 's-div',
        kind: 'egalite',
        text: t`Pour $k$ impair, $\lambda_k^2c_k(u)^2=8$ ; donc $\sum_k\lambda_k^2c_k(u)^2=+\infty$.`,
        masked: t`Valeur de $\lambda_k^2c_k(u)^2$ pour $k$ impair : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\lambda_k^2c_k(u)^2$ pour $k$ impair`, expected: '8' },
      },
      { id: 's-notA', kind: 'consequence', text: t`$u\notin D(A)$.` },
      { id: 's-strict', kind: 'inclusion', text: t`Sur $]0,1[$ : $D(A)\subsetneq D(A^{1/2})=D(a)$.` },
      { id: 'fin', kind: 'conclusion', text: t`$D(A^{1/2})=H^1_0(\Omega)=D(a)$ et $a(u,v)=\langle A^{1/2}u,A^{1/2}v\rangle_H$ ; sur $]0,1[$, le domaine d'opérateur est strictement plus petit que le domaine de forme.` },

      { id: 'x-DA', kind: 'egalite', distractor: true, after: ['eq-dom'], text: t`$D(A)=H^1_0(\Omega)$.` },
      { id: 'x-H2', kind: 'egalite', distractor: true, after: ['eq-dom'], text: t`$D(A^{1/2})=H^2(\Omega)\cap H^1_0(\Omega)$.` },
      { id: 'x-forme-tout', kind: 'egalite', distractor: true, after: ['eq-forme'], text: t`$a(u,v)=\langle Au,v\rangle_H$ pour tous $u,v\in H^1_0(\Omega)$.` },
      { id: 'x-lip-H2', kind: 'egalite', distractor: true, text: t`$D(A)=H^2(\Omega)\cap H^1_0(\Omega)$ pour tout ouvert borné lipschitzien $\Omega$.` },
    ],
    justifications: [
      { id: 'j-rep-phi', label: t`Identité de forme avec $u=\varphi_j\in D(A)$, puis $v=\varphi_k$ et orthonormalité dans $H$.` },
      { id: 'j-norm', label: t`$a(e_j,e_k)=\lambda_j\delta_{jk}/\sqrt{\lambda_j\lambda_k}=\delta_{jk}$.` },
      { id: 'j-total', label: t`$a(v,\varphi_k)=\lambda_k\langle v,\varphi_k\rangle_H$ : tous les coefficients de $v$ dans la base $(\varphi_k)$ de $H$ sont nuls.` },
      { id: 'j-hilb', label: 'Une famille orthonormée totale d’un espace de Hilbert en est une base hilbertienne.' },
      { id: 'j-coef', label: t`$a(u,\varphi_k)=a(\varphi_k,u)=\lambda_k\langle\varphi_k,u\rangle_H$, puis division par $\sqrt{\lambda_k}$.` },
      { id: 'j-pars', label: t`Égalité de Parseval dans $(H^1_0(\Omega),a)$, puis définition de $D(A^{1/2})$.` },
      { id: 'j-cauchy', label: t`$a\big(\sum_{M<k\le N}c_k\varphi_k\big)=\sum_{M<k\le N}\lambda_kc_k^2$ : suite de Cauchy dans un Hilbert ; les deux limites coïncident car $\|\cdot\|_H\le C\,a(\cdot,\cdot)^{1/2}$.` },
      { id: 'j-double', label: 'Double inclusion.' },
      { id: 'j-polar', label: t`Parseval polarisé dans $(H^1_0(\Omega),a)$ et définition de $A^{1/2}$.` },
      { id: 'j-lip', label: t`$u$ est lipschitzienne, nulle en $0$ et $1$ ; sa dérivée faible vaut $\pm1$.` },
      { id: 'j-ipp', label: t`Deux intégrations par parties sur $]0,1/2[$ et $]1/2,1[$.` },
      { id: 'j-int', label: t`$|u'|=1$ presque partout sur $]0,1[$.` },
      { id: 'j-carre', label: t`$\lambda_k^2c_k^2=k^4\pi^4\cdot\frac{8}{k^4\pi^4}$ pour $k$ impair ; série grossièrement divergente.` },
      { id: 'j-def-DA', label: t`Description de $D(A)$ par les coefficients.` },
      { id: 'j-compare', label: t`$u\in D(a)=D(A^{1/2})$ et $u\notin D(A)$.` },
      { id: 'j-syn', label: 'Réunion des résultats établis.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-racine', label: t`Par définition de la racine carrée, $A^{1/2}$ et $A$ ont le même domaine.` },
      { id: 'j-friedrichs', label: 'Extension de Friedrichs.', theorem: 'friedrichs' },
    ],
    rules: [
      { from: ['h-rep', 'h-base'], to: 'o-orth', by: 'j-rep-phi' },
      { from: ['o-orth'], to: 'o-onb', by: 'j-norm' },
      { from: ['o-orth', 'h-base'], to: 'o-total', by: 'j-total' },
      { from: ['o-onb', 'o-total', 'h-poinc'], to: 'o-hilb', by: 'j-hilb' },
      { from: ['o-orth'], to: 'c-coef', by: 'j-coef' },
      { from: ['o-hilb', 'c-coef', 'd-calc'], to: 'c-pars', by: 'j-pars' },
      { from: ['o-hilb', 'h-base', 'h-poinc', 'd-calc'], to: 'c-rec', by: 'j-cauchy' },
      { from: ['c-pars', 'c-rec'], to: 'eq-dom', by: 'j-double' },
      { from: ['o-hilb', 'c-coef', 'd-calc', 'eq-dom'], to: 'eq-forme', by: 'j-polar' },
      { from: ['d-u', 'h-1d'], to: 's-in', by: 'j-lip' },
      { from: ['d-u', 'h-1d'], to: 's-coef', by: 'j-ipp' },
      { from: ['s-in'], to: 's-forme', by: 'j-int' },
      { from: ['s-coef', 'h-1d'], to: 's-div', by: 'j-carre' },
      { from: ['s-div', 'd-calc'], to: 's-notA', by: 'j-def-DA' },
      { from: ['s-in', 's-notA', 'eq-dom'], to: 's-strict', by: 'j-compare' },
      { from: ['eq-dom', 'eq-forme', 's-forme', 's-strict'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-DA',
        verdict: 'incorrect',
        concept: 'formes-fermees-domaine',
        message: t`Le domaine de l'opérateur est strictement plus petit que le domaine de forme : il faut, en plus, $\sum\lambda_k^2c_k^2<\infty$.`,
        counterexample: t`$u(x)=\min(x,1-x)\in H^1_0(]0,1[)$, mais $\lambda_k^2c_k(u)^2=8$ pour $k$ impair.`,
      },
      {
        conclusion: 'x-H2',
        verdict: 'incorrect',
        concept: 'formes-fermees-domaine',
        message: t`La racine carrée ne demande qu'une dérivée : son domaine est le domaine de forme $H^1_0$.`,
        counterexample: t`$u(x)=\min(x,1-x)$ appartient à $H^1_0(]0,1[)=D(A^{1/2})$ ; sa dérivée saute en $1/2$, donc $u\notin H^2(]0,1[)$.`,
      },
      {
        conclusion: 'x-forme-tout',
        verdict: 'incorrect',
        concept: 'domaine-operateur',
        message: t`$Au$ n'a de sens que pour $u\in D(A)$ ; sur tout $H^1_0$, seule l'écriture $\langle A^{1/2}u,A^{1/2}v\rangle_H$ est définie.`,
        counterexample: t`Pour $u(x)=\min(x,1-x)$, $Au$ n'est pas défini puisque $u\notin D(A)$.`,
      },
      {
        conclusion: 'x-lip-H2',
        verdict: 'incorrect',
        concept: 'regularite-bord',
        message: t`Le théorème de représentation donne $D(A)=\{u\in H^1_0(\Omega):\Delta u\in L^2(\Omega)\}$ ; l'égalité avec $H^2\cap H^1_0$ dépend de la régularité du bord.`,
        counterexample: t`Sur un ouvert plan à coin rentrant d'angle $3\pi/2$, $r^{2/3}\sin(2\theta/3)$ tronquée près du coin appartient à $D(A)$, et ses dérivées secondes, de l'ordre de $r^{-4/3}$, ne sont pas de carré intégrable.`,
      },
      {
        conclusion: 'eq-dom',
        by: 'j-racine',
        verdict: 'incorrect',
        concept: 'formes-fermees-domaine',
        message: t`$D(A^{1/2})$ est en général strictement plus grand que $D(A)$ : la condition porte sur $\sum\lambda_kc_k^2$, non sur $\sum\lambda_k^2c_k^2$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-poinc',
        label: t`Retirer la complétude de $(H^1_0(\Omega),a)$`,
        necessary: true,
        explanation: t`Les sommes partielles convergent parce que $(H^1_0,a)$ est un Hilbert : sans l'équivalence de normes, l'argument tombe.`,
        counterexample: t`Sur $\Omega=\mathbb R$, $u_n(x)=u(x/n)$ donne $\|u_n'\|^2=\|u'\|^2/n$ et $\|u_n\|^2=n\|u\|^2$ : $\int|u'|^2$ n'est pas équivalente à la norme de $H^1(\mathbb R)$, et $(H^1(\mathbb R),a)$ n'est pas complet.`,
      },
      {
        hypothesis: 'h-base',
        label: 'Retirer la base de vecteurs propres',
        necessary: true,
        explanation: t`L'argument par séries disparaît. Le résultat reste vrai, mais il relève alors du calcul spectral général, non d'un calcul de coefficients.`,
        counterexample: t`Sur $L^2(\mathbb R)$, $-u''=\lambda u$ n'a aucune solution non nulle de carré intégrable : l'opérateur associé à $\int u'v'$ sur $H^1(\mathbb R)$ n'a aucun vecteur propre.`,
      },
    ],
  },
  solution: t`**Base de forme.** Pour $v\in H^1_0$, l'identité de forme avec $u=\varphi_j\in D(A)$ donne $a(\varphi_j,v)=\lambda_j\langle\varphi_j,v\rangle_H$, d'où $a(\varphi_j,\varphi_k)=\lambda_j\delta_{jk}$. Les $e_k=\varphi_k/\sqrt{\lambda_k}$ sont orthonormés dans $(H^1_0,a)$, Hilbert par Poincaré. Si $a(v,e_k)=0$ pour tout $k$, tous les coefficients $\langle v,\varphi_k\rangle_H$ sont nuls et $v=0$ : $(e_k)$ est une base hilbertienne.

**Identification.** Pour $u\in H^1_0$, $a(u,e_k)=\sqrt{\lambda_k}\,c_k(u)$ et Parseval donne $a(u,u)=\sum\lambda_kc_k(u)^2<\infty$ : $u\in D(A^{1/2})$. Réciproquement, si $\sum\lambda_kc_k^2<\infty$, les sommes partielles $\sum_{k\le N}c_k\varphi_k$ sont de Cauchy dans $(H^1_0,a)$ ; leur limite dans $H^1_0$ est aussi leur limite dans $H$, c'est-à-dire $u$. Donc $D(A^{1/2})=H^1_0(\Omega)$, et par polarisation $a(u,v)=\sum\lambda_kc_k(u)c_k(v)=\langle A^{1/2}u,A^{1/2}v\rangle_H$.

**Inclusion stricte.** Sur $]0,1[$, $u(x)=\min(x,1-x)$ est lipschitzienne, nulle au bord : $u\in H^1_0$ et $a(u,u)=\int_0^1|u'|^2=1$. Deux intégrations par parties donnent $c_k(u)=2\sqrt2\sin(k\pi/2)/(k^2\pi^2)$, donc $\lambda_kc_k^2=8/(k^2\pi^2)$ et $\lambda_k^2c_k^2=8$ pour $k$ impair. La première série vaut $\frac8{\pi^2}\sum_{k\ \text{impair}}k^{-2}=1$, la seconde diverge : $u\in D(a)\setminus D(A)$.

**Lecture.** Le domaine de forme demande une dérivée ; le domaine d'opérateur en demande deux, au sens de $\Delta u\in L^2$, et son identification à $H^2\cap H^1_0$ dépend du bord.`,
  steps: [
    t`Établir $a(\varphi_j,\varphi_k)=\lambda_j\delta_{jk}$ par l'identité de forme.`,
    t`Montrer que $(\varphi_k/\sqrt{\lambda_k})$ est une base hilbertienne de $(H^1_0,a)$.`,
    t`Identifier $H^1_0$ à $\{\sum\lambda_kc_k^2<\infty\}$ par Parseval et par convergence des sommes partielles.`,
    t`Polariser pour obtenir $a(u,v)=\langle A^{1/2}u,A^{1/2}v\rangle_H$.`,
    t`Calculer les coefficients de $\min(x,1-x)$ et conclure à l'inclusion stricte.`,
  ],
  commonErrors: [
    { id: 'e-DA', description: t`Identifier le domaine de l'opérateur au domaine de forme $H^1_0$.`, concept: 'formes-fermees-domaine' },
    { id: 'e-Au', description: t`Écrire $\langle Au,v\rangle$ pour $u\in H^1_0$ quelconque.`, concept: 'domaine-operateur' },
    { id: 'e-H2', description: t`Affirmer $D(A)=H^2\cap H^1_0$ sans hypothèse sur le bord.`, concept: 'regularite-bord' },
  ],
  hints: [
    t`Que donne l'identité de forme quand on prend $u=\varphi_j$ ? Dans quel espace de Hilbert les $\varphi_k$ deviennent-ils orthogonaux ?`,
    t`Normalise $\varphi_k$ dans $(H^1_0,a)$, montre que la famille est totale, puis compare Parseval dans $(H^1_0,a)$ avec la description spectrale de $D(A^{1/2})$.`,
    t`Pour $u=\min(x,1-x)$ : $c_k(u)=2\sqrt2\sin(k\pi/2)/(k^2\pi^2)$, donc $\lambda_kc_k^2$ est sommable alors que $\lambda_k^2c_k^2=8$ pour $k$ impair.`,
  ],
  rubric: rubric({
    hypotheses: t`L'identité de forme, la base propre et la structure hilbertienne de $(H^1_0,a)$ sont explicitement mobilisées.`,
    methode: 'Base hilbertienne de forme, Parseval, double inclusion, puis exemple explicite.',
    validite: t`La réciproque passe par la convergence dans $(H^1_0,a)$ et l'identification des limites.`,
    justifications: t`Aucune confusion entre $D(A)$, $D(A^{1/2})$ et $H^2\cap H^1_0$.`,
    conclusion: t`L'égalité $D(A^{1/2})=D(a)$ et l'inclusion stricte $D(A)\subsetneq D(a)$ sont obtenues.`,
  }),
  variant: {
    statement: t`Sur $H=\ell^2$, soit $A$ l'opérateur diagonal $Ae_n=n\,e_n$ de domaine maximal, et $a(u,v)=\sum_n n\,u_nv_n$ sur $D(a)=\{u : \sum_n n\,u_n^2<\infty\}$. Montrer que $a$ est fermée, que $A$ lui est associé, et donner un élément de $D(a)\setminus D(A)$.`,
    solution: t`$\|u\|_a^2=\sum(n+1)u_n^2$ : $D(a)$ est un $\ell^2$ à poids, complet, et contient les suites finies, denses dans $\ell^2$. Pour $u\in D(A)$ et $v\in D(a)$, $a(u,v)=\sum n u_nv_n=\langle Au,v\rangle$, et l'unicité dans le théorème identifie l'opérateur associé à $A$ ; $D(A^{1/2})=D(a)$. La suite $u_n=n^{-3/2}$ vérifie $\sum n u_n^2=\sum n^{-2}<\infty$ et $\sum n^2u_n^2=\sum n^{-1}=+\infty$ : $u\in D(a)\setminus D(A)$.`,
  },
  verification: { ...COMPLEMENT, notes: 'Le polycopié renvoie au calcul spectral (p. PDF 25) ; l’identification par base de forme et l’exemple sont rédigés pour ProofLab.' },
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT30: TheoremModule = {
  theorem: {
    id: 'formes-fermees',
    spaces: [
      t`$H$ : espace de Hilbert réel, de produit scalaire $\langle\cdot,\cdot\rangle_H$.`,
      t`$a:D(a)\times D(a)\to\mathbb R$ : forme bilinéaire sur un sous-espace $D(a)\subset H$ (domaine de forme).`,
      t`Norme de forme : $\|u\|_a=\big(a(u,u)+\|u\|_H^2\big)^{1/2}$ sur $D(a)$.`,
    ],
    hypotheses: [
      { id: 'h-sym', text: t`$a$ est symétrique : $a(u,v)=a(v,u)$.` },
      {
        id: 'h-pos',
        text: t`$a$ est positive : $a(u,u)\ge 0$.`,
        whenRemoved: t`Sur $H=\mathbb R$, $a(u,v)=-2uv$ est symétrique sur $D(a)=\mathbb R$, mais $a(u,u)+u^2=-u^2<0$ pour $u\neq0$ : la norme de forme n'est pas définie, et le seul opérateur qui représente $a$, $A=-2$, n'est pas positif.`,
      },
      {
        id: 'h-fermee',
        text: t`$a$ est fermée : $D(a)$ est complet pour $\|\cdot\|_a$.`,
        whenRemoved: t`Sur $D(a)=C^\infty_c(]0,1[)$, la forme $\int_0^1u'v'$ n'est pas fermée, et l'équation $a(u,v)+\langle u,v\rangle_H=\langle 1,v\rangle_H$ n'a pas de solution dans $D(a)$.`,
      },
      {
        id: 'h-dense',
        text: t`$a$ est densément définie : $D(a)$ est dense dans $H$.`,
        whenRemoved: t`$H=\mathbb R^2$, $D(a)=\mathbb R\times\{0\}$ : la résolvante construite a un noyau non nul, et l'opérateur associé ne peut être densément défini.`,
      },
    ],
    statement: t`À toute forme symétrique positive, fermée, densément définie $a$ sur $H$ est associé un unique opérateur auto-adjoint positif $A$ tel que
$$D(A)\subset D(a),\qquad a(u,v)=\langle Au,v\rangle_H\quad(u\in D(A),\ v\in D(a)).$$
De plus, $D(a)=D(A^{1/2})$ et $a(u,v)=\langle A^{1/2}u,A^{1/2}v\rangle_H$.`,
    conclusions: {
      existence: t`$A=T^{-1}-I$, où $T=(I+A)^{-1}$ est construit par Lax–Milgram dans $(D(a),\|\cdot\|_a)$.`,
      unicite: t`Si $B$ est auto-adjoint, $D(B)\subset D(a)$ et $a(u,v)=\langle Bu,v\rangle$, alors $B\subset A^*=A$, et un opérateur auto-adjoint n'a pas d'extension symétrique stricte : $B=A$.`,
      regularite: t`$D(A)\subset D(a)=D(A^{1/2})$, inclusion stricte en général.`,
      autre: t`Le domaine de forme est le complété de $D(A)$ pour $\|\cdot\|_a$.`,
    },
    sourceProof: 'idee',
    proofOutline: [
      t`Pour $f\in H$, Lax–Milgram dans $(D(a),(\cdot,\cdot)_a)$ donne un unique $Tf$ tel que $a(Tf,v)+\langle Tf,v\rangle_H=\langle f,v\rangle_H$ pour tout $v\in D(a)$.`,
      t`Test par $v=Tf$ : $\|Tf\|_H\le\|Tf\|_a\le\|f\|_H$. Croisement des équations : $T$ symétrique ; $\langle Tf,f\rangle=\|Tf\|_a^2\ge 0$.`,
      t`Si $Tf=0$, $f$ est orthogonal à $D(a)$, dense : $T$ injectif ; $(\mathrm{Im}\,T)^\perp=\mathrm{Ker}\,T=\{0\}$ : image dense.`,
      t`$A=T^{-1}-I$ sur $D(A)=\mathrm{Im}\,T$ : $a(u,v)=\langle Au,v\rangle$ pour $u=Tf$ ; $T^{-1}$ est auto-adjoint, donc $A$ aussi, et $\langle Au,u\rangle=a(u,u)\ge 0$.`,
      t`Unicité : si $B$ convient, pour $u\in D(B)$ et $v\in D(A)$, $\langle Bu,v\rangle=a(u,v)=a(v,u)=\langle Av,u\rangle$, donc $u\in D(A^*)=D(A)$ et $Au=Bu$ ; $B\subset A$ et $B=B^*\supset A^*=A$.`,
      t`Second énoncé : sur $D(A)$, $a(u,u)=\|A^{1/2}u\|^2$, donc $\|\cdot\|_a$ coïncide avec la norme du graphe de $A^{1/2}$. $D(A)$ est dense dans $(D(a),\|\cdot\|_a)$ (un $v$ orthogonal à $\mathrm{Im}\,T$ vérifie $\langle f,v\rangle=0$ pour tout $f$) et dans $D(A^{1/2})$ pour la norme du graphe (calcul spectral). Les deux espaces sont complets et s'injectent continûment dans $H$ : ils coïncident, et l'identité de forme passe à la limite.`,
    ],
    warnings: [
      t`$D(A)$ est en général strictement plus petit que $D(a)$ : pour le Laplacien de Dirichlet sur $]0,1[$, $\min(x,1-x)\in D(a)\setminus D(A)$.`,
      t`L'identité $a(u,v)=\langle Au,v\rangle$ n'a de sens que pour $u\in D(A)$.`,
      t`La norme de forme contient toujours le terme $\|u\|_H^2$.`,
      'La symétrie seule ne donne pas l’auto-adjonction : l’argument passe par la résolvante.',
    ],
    usefulFor: t`Construire le Laplacien de Dirichlet directement à partir de la forme $a(u,v)=\int\nabla u\cdot\nabla v$, sans supposer au départ $u\in H^2$.`,
    verification: {
      origin: 'polycopie',
      review: 'machine',
      notes: 'Démonstration du polycopié esquissée (p. PDF 25) : propriétés de T, unicité et seconde partie complétées.',
    },
  },
  definitions: [
    {
      id: 'forme-fermee',
      term: 'Forme fermée',
      statement: t`Une forme symétrique positive $a:D(a)\times D(a)\to\mathbb R$ est fermée lorsque $D(a)$ est complet pour la norme $\|u\|_a=\big(a(u,u)+\|u\|_H^2\big)^{1/2}$.`,
      source: poly(25, 'Vocabulaire, section 6.6'),
    },
    {
      id: 'operateur-associe-forme',
      term: 'Opérateur associé à une forme',
      statement: t`L'opérateur associé à $a$ est défini par $u\in D(A)$ si et seulement si $u\in D(a)$ et il existe $g\in H$ tel que $a(u,v)=\langle g,v\rangle_H$ pour tout $v\in D(a)$ ; on pose alors $Au=g$.`,
      source: poly(25, 'Section 6.6 : $D(A)=\\mathrm{Im}\\,T$ et $A=T^{-1}-I$'),
    },
  ],
  concepts: [
    {
      id: 'formes-fermees-norme-forme',
      label: 'Norme de forme',
      reminder: t`La norme de forme est $\|u\|_a^2=a(u,u)+\|u\|_H^2$ : le terme $\|u\|_H^2$ n'est jamais omis, même lorsqu'une inégalité de Poincaré rend $a(u,u)^{1/2}$ équivalente.`,
    },
    {
      id: 'formes-fermees-domaine',
      label: 'Domaine de forme et domaine d’opérateur',
      reminder: t`$D(A)\subset D(a)=D(A^{1/2})$, inclusion stricte en général : le domaine de forme demande une dérivée, le domaine d'opérateur en demande deux.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-formes-domaine-strict',
      theoremId: 'formes-fermees',
      title: 'Domaine de forme et domaine d’opérateur',
      claim: t`Pour le Laplacien de Dirichlet sur $]0,1[$, $D(A)=D(a)=H^1_0(]0,1[)$.`,
      correctStatement: t`On a $D(A)\subset D(a)=D(A^{1/2})$, et l'inclusion est stricte.`,
      task: t`Pour $u(x)=\min(x,1-x)$, $\varphi_k=\sqrt2\sin(k\pi x)$ et $\lambda_k=k^2\pi^2$, calcule $\lambda_k^2\langle u,\varphi_k\rangle^2$ pour $k$ impair.`,
      check: { kind: 'rational', prompt: t`Valeur de $\lambda_k^2\langle u,\varphi_k\rangle^2$ pour $k$ impair`, expected: '8' },
      explanation: t`$\langle u,\varphi_k\rangle=2\sqrt2\sin(k\pi/2)/(k^2\pi^2)$, donc $\lambda_k\langle u,\varphi_k\rangle^2=8/(k^2\pi^2)$ est sommable ($u\in D(A^{1/2})$), tandis que $\lambda_k^2\langle u,\varphi_k\rangle^2=8$ pour $k$ impair : la série diverge et $u\notin D(A)$.`,
      concept: 'formes-fermees-domaine',
      source: poly(25, 'Section 6.6 ; exercice 30, difficile (p. PDF 43)'),
    },
    {
      id: 'ce-formes-non-fermee',
      theoremId: 'formes-fermees',
      title: 'Forme non fermée',
      claim: t`La forme $a(u,v)=\int_0^1u'v'$ est fermée sur $D(a)=C^\infty_c(]0,1[)$.`,
      correctStatement: t`Elle est fermée sur $H^1_0(]0,1[)$, complété de $C^\infty_c(]0,1[)$ pour $\|\cdot\|_a$, et non sur $C^\infty_c(]0,1[)$.`,
      task: t`$u(x)=x(1-x)$ est limite pour $\|\cdot\|_a$ d'éléments de $C^\infty_c(]0,1[)$. Calcule $\|u\|_a^2$.`,
      check: { kind: 'rational', prompt: t`Valeur exacte de $\|u\|_a^2$`, expected: '11/30' },
      explanation: t`$\|u\|_a^2=\int_0^1(1-2x)^2+\int_0^1x^2(1-x)^2=\frac13+\frac1{30}=\frac{11}{30}$. Une suite de $C^\infty_c$ qui converge vers $u$ dans $H^1$ est de Cauchy pour $\|\cdot\|_a$ sans limite dans $C^\infty_c$, puisque $u\notin C^\infty_c(]0,1[)$.`,
      concept: 'fermeture-espace',
      source: poly(25, 'Vocabulaire, section 6.6'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT30;
