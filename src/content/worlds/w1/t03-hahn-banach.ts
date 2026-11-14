/**
 * Résultat 3 — Hahn–Banach (prolongement en conservant la norme) et séparation.
 * Source : polycopié, section 1.3 (p. PDF 7) ; exercices p. PDF 38.
 * Le polycopié ne donne qu'une idée de preuve : la démonstration est complétée ici.
 */
import { t, rubric, poly, complement, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'hahn-banach.facile',
  theoremId: 'hahn-banach',
  level: 'facile',
  title: t`Prolonger $\ell(t,0)=2t$ à $\mathbb R^2$`,
  statement: t`Dans $X=\mathbb R^2$ muni de la norme euclidienne, soit $M=\mathbb R\times\{0\}$ l'axe horizontal et $\ell:M\to\mathbb R$, $\ell(t,0)=2t$. Donner une extension linéaire de $\ell$ à $\mathbb R^2$ ; plus précisément, déterminer toutes les formes linéaires $L$ sur $\mathbb R^2$ qui prolongent $\ell$, puis celles qui vérifient $\|L\|_{X'}=\|\ell\|_{M'}$.`,
  source: poly(38, 'Exercice 3, facile (p. PDF 38)'),
  prerequisites: [],
  concepts: ['hahn-banach-norme-prolongement', 'existence-unicite', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-X', kind: 'hypothese', text: t`$X=\mathbb R^2$ est muni de la norme euclidienne $\|(x,y)\|=\sqrt{x^2+y^2}$.` },
      { id: 'd-M', kind: 'definition', text: t`$M=\mathbb R\times\{0\}$ est un sous-espace de $X$.` },
      { id: 'd-ell', kind: 'definition', text: t`$\ell:M\to\mathbb R$ est définie par $\ell(t,0)=2t$.` },

      {
        id: 'n-ell',
        kind: 'egalite',
        text: t`$\ell\in M'$ et $\|\ell\|_{M'}=2$.`,
        masked: t`Valeur de $\|\ell\|_{M'}$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\|\ell\|_{M'}$`, expected: '2' },
      },
      { id: 'forme', kind: 'consequence', text: t`Toute forme linéaire sur $\mathbb R^2$ s'écrit $L(x,y)=ax+by$, avec $a=L(1,0)$ et $b=L(0,1)$.` },
      { id: 'a', kind: 'egalite', text: t`La forme $L(x,y)=ax+by$ prolonge $\ell$ si et seulement si $a=2$.` },
      { id: 'fam', kind: 'consequence', text: t`Les prolongements linéaires de $\ell$ sont exactement les formes $L_c(x,y)=2x+cy$, pour $c\in\mathbb R$.` },
      { id: 'norm-Lc', kind: 'egalite', text: t`$\|L_c\|_{X'}=\sqrt{4+c^2}$ pour tout $c\in\mathbb R$.` },
      { id: 'c0', kind: 'consequence', text: t`$\|L_c\|_{X'}=\|\ell\|_{M'}$ si et seulement si $c=0$.` },
      {
        id: 'unique',
        kind: 'egalite',
        text: t`L'unique prolongement de même norme est $L_0(x,y)=2x$.`,
        masked: t`Coefficients du prolongement de même norme : à déterminer.`,
        check: { kind: 'rational-vector', prompt: t`Coefficients $(a,b)$ de $L(x,y)=ax+by$`, expected: ['2', '0'], labels: ['a', 'b'] },
      },
      { id: 'fin', kind: 'conclusion', text: t`Les prolongements de $\ell$ sont décrits, et celui qui conserve la norme est déterminé.` },

      // Propositions plausibles mais fausses.
      { id: 'x-unique', kind: 'consequence', distractor: true, after: ['a'], text: t`$\ell$ admet un unique prolongement linéaire à $\mathbb R^2$.` },
      { id: 'x-tout', kind: 'consequence', distractor: true, after: ['fam'], text: t`Tout prolongement linéaire $L$ de $\ell$ vérifie $\|L\|_{X'}=\|\ell\|_{M'}$.` },
      { id: 'x-somme', kind: 'egalite', distractor: true, after: ['fam'], text: t`$\|L_c\|_{X'}=2+|c|$ pour tout $c\in\mathbb R$.` },
    ],
    justifications: [
      { id: 'j-norme-M', label: t`Sur $M$, $\|(t,0)\|=|t|$ et $|\ell(t,0)|=2|t|$.` },
      { id: 'j-base', label: t`Décomposition $(x,y)=x(1,0)+y(0,1)$ et linéarité de $L$.` },
      { id: 'j-restriction', label: t`Restreindre $L$ à $M$ : $L(t,0)=at$ pour tout $t\in\mathbb R$.` },
      { id: 'j-param', label: t`Le coefficient $b$ reste libre : on le note $c$.` },
      { id: 'j-cs-c', label: t`Inégalité de Cauchy–Schwarz pour la majoration, et le vecteur $(2,c)$ pour l'égalité.`, theorem: 'cauchy-schwarz' },
      { id: 'j-resolution', label: t`Résoudre l'équation $\sqrt{4+c^2}=2$.` },
      { id: 'j-choix', label: t`Dans la famille des prolongements, retenir celui dont la norme vaut $\|\ell\|_{M'}$.` },
      { id: 'j-syn', label: 'Réunion de la description des prolongements et de l’étude de leurs normes.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-hb-unique', label: 'Le théorème de Hahn–Banach affirme l’unicité du prolongement de même norme.' },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['h-X', 'd-M', 'd-ell'], to: 'n-ell', by: 'j-norme-M' },
      { from: [], to: 'forme', by: 'j-base' },
      { from: ['forme', 'd-M', 'd-ell'], to: 'a', by: 'j-restriction' },
      { from: ['forme', 'a'], to: 'fam', by: 'j-param' },
      { from: ['h-X', 'fam'], to: 'norm-Lc', by: 'j-cs-c' },
      { from: ['n-ell', 'norm-Lc'], to: 'c0', by: 'j-resolution' },
      { from: ['fam', 'c0'], to: 'unique', by: 'j-choix' },
      { from: ['n-ell', 'fam', 'unique'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-unique',
        verdict: 'incorrect',
        concept: 'existence-unicite',
        message: t`Le prolongement linéaire n'est pas unique : la valeur en $(0,1)$ reste libre.`,
        counterexample: t`$L_1(x,y)=2x+y$ et $L_{-1}(x,y)=2x-y$ prolongent $\ell$ et diffèrent en $(0,1)$.`,
      },
      {
        conclusion: 'x-tout',
        verdict: 'incorrect',
        concept: 'hahn-banach-norme-prolongement',
        message: t`Prolonger peut augmenter la norme : seul un prolongement bien choisi la conserve.`,
        counterexample: t`$L_1(x,y)=2x+y$ prolonge $\ell$, et $L_1(2,1)=5$ avec $\|(2,1)\|=\sqrt5$ : donc $\|L_1\|_{X'}\ge\sqrt5>2$.`,
      },
      {
        conclusion: 'x-somme',
        verdict: 'incorrect',
        concept: 'hahn-banach-norme-prolongement',
        message: t`$2+|c|$ est la norme de $L_c$ pour la norme $\max(|x|,|y|)$ sur $\mathbb R^2$. Pour la norme euclidienne, la norme de $L_c$ est la norme euclidienne du vecteur de ses coefficients.`,
        counterexample: t`Pour $c=1$ : $|L_1(x,y)|\le\sqrt5\,\|(x,y)\|$ par Cauchy–Schwarz, donc $\|L_1\|_{X'}\le\sqrt5<3$.`,
      },
      {
        conclusion: 'unique',
        by: 'j-hb-unique',
        verdict: 'incorrect',
        concept: 'existence-unicite',
        message: t`Hahn–Banach garantit l'existence d'un prolongement de même norme, non son unicité. Ici l'unicité vient du calcul $\sqrt{4+c^2}=2\iff c=0$, propre à la norme euclidienne.`,
        counterexample: t`Pour la norme $\|(x,y)\|_1=|x|+|y|$, les formes $2x$ et $2x+y$ prolongent $\ell$ et ont toutes deux pour norme $2$.`,
      },
      {
        conclusion: 'norm-Lc',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`La norme d'une forme se calcule : une majoration valable pour tout vecteur, puis un vecteur qui l'atteint.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-X',
        label: 'Ne plus disposer de la norme euclidienne',
        necessary: true,
        explanation: t`Le calcul de $\|L_c\|_{X'}$ dépend de la norme de $X$ : pour une autre norme, la norme duale change, et l'unicité peut être perdue.`,
        counterexample: t`Pour $\|(x,y)\|_1=|x|+|y|$, on a $\|L_c\|=\max(2,|c|)$ : tous les $L_c$ avec $|c|\le 2$ conservent la norme.`,
      },
    ],
  },
  solution: t`**Norme de $\ell$.** Sur $M$, $\|(t,0)\|=|t|$ et $|\ell(t,0)|=2|t|$ : $\ell$ est linéaire continue et $\|\ell\|_{M'}=2$.

**Tous les prolongements.** Une forme linéaire sur $\mathbb R^2$ s'écrit $L(x,y)=ax+by$, avec $a=L(1,0)$ et $b=L(0,1)$. Elle prolonge $\ell$ si et seulement si $L(t,0)=at=2t$ pour tout $t$, c'est-à-dire $a=2$. Les prolongements sont donc les $L_c(x,y)=2x+cy$, $c\in\mathbb R$ : il y en a une infinité, par exemple $L_0(x,y)=2x$.

**Prolongements de même norme.** Par Cauchy–Schwarz, $|L_c(x,y)|\le\sqrt{4+c^2}\,\|(x,y)\|$, avec égalité en $(x,y)=(2,c)$ : $\|L_c\|_{X'}=\sqrt{4+c^2}$. Cette norme vaut $2$ si et seulement si $c=0$ : l'unique prolongement de même norme est $L_0(x,y)=2x$.

**Point de vigilance.** L'unicité vient ici de la norme euclidienne ; Hahn–Banach n'affirme que l'existence. Pour la norme $|x|+|y|$, tous les $L_c$ avec $|c|\le 2$ conservent la norme.`,
  steps: [
    t`Calculer $\|\ell\|_{M'}$.`,
    t`Écrire une forme linéaire quelconque sur $\mathbb R^2$ et traduire la condition de prolongement.`,
    t`Calculer la norme de chaque prolongement $L_c$.`,
    'Identifier le prolongement qui conserve la norme.',
  ],
  commonErrors: [
    { id: 'e-unique', description: 'Croire que le prolongement linéaire est unique.', concept: 'existence-unicite' },
    { id: 'e-norme', description: 'Croire que tout prolongement conserve la norme.', concept: 'hahn-banach-norme-prolongement' },
    { id: 'e-hb', description: 'Attribuer à Hahn–Banach une unicité qu’il n’affirme pas.', concept: 'existence-unicite' },
  ],
  hints: [
    t`Commence par calculer $\|\ell\|_{M'}$ : quelle est la norme d'un vecteur $(t,0)$ ?`,
    t`Écris une forme linéaire quelconque sur $\mathbb R^2$ à l'aide de ses valeurs en $(1,0)$ et $(0,1)$ ; la condition de prolongement ne fixe que l'une de ces valeurs.`,
    t`Pour la norme de $L_c(x,y)=2x+cy$, Cauchy–Schwarz donne la majoration et le vecteur $(2,c)$ l'atteint. Compare ensuite à $\|\ell\|_{M'}$.`,
  ],
  rubric: rubric({
    hypotheses: t`La norme de $X$ et celle de $\ell$ sur $M$ sont identifiées.`,
    methode: 'Tous les prolongements sont décrits avant l’étude de leurs normes.',
    validite: t`La norme de $L_c$ est calculée par une majoration atteinte.`,
    justifications: 'L’unicité est tirée du calcul, non du théorème de Hahn–Banach.',
    conclusion: t`Les prolongements $L_c$ et l'unique prolongement de même norme $L_0$ sont obtenus.`,
  }),
  variant: {
    statement: t`Sur $\mathbb R^2$ muni de la norme $\|(x,y)\|_1=|x|+|y|$, soit $M=\mathbb R\times\{0\}$ et $\ell(t,0)=2t$. Déterminer tous les prolongements linéaires de $\ell$ qui conservent la norme.`,
    solution: t`La norme induite sur $M$ est $|t|$, donc $\|\ell\|_{M'}=2$. Tout prolongement s'écrit $L_c(x,y)=2x+cy$. Pour $|x|+|y|\le 1$ : $|2x+cy|\le 2|x|+|c|\,|y|\le\max(2,|c|)$, avec égalité en $(1,0)$ ou en $(0,1)$ : $\|L_c\|=\max(2,|c|)$. Donc $L_c$ conserve la norme si et seulement si $|c|\le 2$ : il existe une infinité de prolongements de même norme, ce qui illustre que Hahn–Banach n'affirme pas l'unicité.`,
    closedChecks: [{ kind: 'rational', prompt: t`Norme de $L_1(x,y)=2x+y$ pour $\|\cdot\|_1$`, expected: '2' }],
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'hahn-banach.intermediaire',
  theoremId: 'hahn-banach',
  level: 'intermediaire',
  title: 'Une forme normante pour un vecteur non nul',
  statement: t`Soit $X$ un espace de Banach réel et $x\in X$, $x\neq 0$. Montrer qu'il existe $\ell\in X'$ telle que $\|\ell\|_{X'}=1$ et $\ell(x)=\|x\|$.`,
  source: poly(38, 'Exercice 3, intermédiaire (p. PDF 38)'),
  prerequisites: [],
  concepts: ['hahn-banach-norme-prolongement', 'hypotheses-theoreme', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-X', kind: 'hypothese', text: t`$X$ est un espace de Banach réel ; seule sa structure d'espace normé servira.` },
      { id: 'h-x', kind: 'hypothese', text: t`$x\in X$ et $x\neq 0$.` },
      { id: 'd-M', kind: 'definition', text: t`$M=\mathbb R x=\{tx : t\in\mathbb R\}$ est la droite engendrée par $x$.` },
      { id: 'd-l0', kind: 'definition', text: t`$\ell_0:M\to\mathbb R$ est définie par $\ell_0(tx)=t\|x\|$.` },

      { id: 'bien', kind: 'consequence', text: t`$\ell_0$ est bien définie : tout $m\in M$ s'écrit de manière unique $m=tx$.` },
      { id: 'lin', kind: 'consequence', text: t`$\ell_0$ est linéaire sur $M$.` },
      { id: 'iso', kind: 'egalite', text: t`$|\ell_0(m)|=\|m\|$ pour tout $m\in M$.` },
      { id: 'n1', kind: 'egalite', text: t`$\ell_0\in M'$ et $\|\ell_0\|_{M'}=1$.` },
      { id: 'hb', kind: 'application-theoreme', text: t`Il existe $\ell\in X'$ tel que $\ell|_M=\ell_0$ et $\|\ell\|_{X'}=\|\ell_0\|_{M'}$.` },
      { id: 'val', kind: 'egalite', text: t`$\ell(x)=\ell_0(x)=\|x\|$.` },
      { id: 'fin', kind: 'conclusion', text: t`Il existe $\ell\in X'$ telle que $\|\ell\|_{X'}=1$ et $\ell(x)=\|x\|$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-l1', kind: 'egalite', distractor: true, after: ['bien'], text: t`La forme $\ell_1(tx)=t$ est de norme $1$ sur $M$.` },
      { id: 'x-prolong', kind: 'consequence', distractor: true, after: ['n1'], text: t`Tout prolongement linéaire de $\ell_0$ à $X$ est de norme $1$.` },
      { id: 'x-riesz', kind: 'egalite', distractor: true, text: t`La forme $\langle\cdot,x\rangle/\|x\|$ convient, quel que soit l'espace de Banach $X$.` },
    ],
    justifications: [
      { id: 'j-ecriture', label: t`Si $tx=t'x$, alors $(t-t')x=0$, et $x\neq 0$ impose $t=t'$.` },
      { id: 'j-lin0', label: t`Pour $m=tx$ et $m'=t'x$ : $\ell_0(\lambda m+\mu m')=(\lambda t+\mu t')\|x\|=\lambda\ell_0(m)+\mu\ell_0(m')$.` },
      { id: 'j-homog', label: t`Homogénéité de la norme : $\|tx\|=|t|\,\|x\|$.` },
      { id: 'j-sup', label: t`La borne supérieure de $|\ell_0|$ sur la boule unité de $M$ vaut $1$, car $M\neq\{0\}$ contient des vecteurs de norme $1$.` },
      { id: 'j-hb', label: 'Théorème de Hahn–Banach : prolongement en conservant la norme.', theorem: 'hahn-banach' },
      { id: 'j-restr', label: t`Le prolongement coïncide avec $\ell_0$ sur $M$, et $x=1\cdot x\in M$.` },
      { id: 'j-syn', label: t`Réunion : $\|\ell\|_{X'}=\|\ell_0\|_{M'}=1$ et $\ell(x)=\|x\|$.` },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-quelconque', label: t`Prolonger $\ell_0$ par une forme linéaire quelconque sur $X$.` },
      { id: 'j-zorn', label: 'Lemme de Zorn.', theorem: 'zorn' },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['h-x', 'd-M', 'd-l0'], to: 'bien', by: 'j-ecriture' },
      { from: ['bien', 'd-l0'], to: 'lin', by: 'j-lin0' },
      { from: ['bien', 'd-l0'], to: 'iso', by: 'j-homog' },
      { from: ['lin', 'iso', 'h-x'], to: 'n1', by: 'j-sup' },
      { from: ['h-X', 'd-M', 'n1'], to: 'hb', by: 'j-hb' },
      { from: ['hb', 'd-l0', 'd-M'], to: 'val', by: 'j-restr' },
      { from: ['hb', 'n1', 'val'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-l1',
        verdict: 'incorrect',
        concept: 'hahn-banach-norme-prolongement',
        message: t`$|\ell_1(tx)|=|t|=\|tx\|/\|x\|$ : la norme de $\ell_1$ sur $M$ vaut $1/\|x\|$. Il faut normaliser par $\|x\|$.`,
        counterexample: t`Si $\|x\|=2$, alors $\|\ell_1\|_{M'}=1/2$.`,
      },
      {
        conclusion: 'x-prolong',
        verdict: 'incorrect',
        concept: 'hahn-banach-norme-prolongement',
        message: t`Un prolongement linéaire quelconque peut augmenter la norme : la conservation de la norme est précisément l'apport de Hahn–Banach.`,
        counterexample: t`Dans $\mathbb R^2$ euclidien, pour $x=(1,0)$ et $\ell_0(t,0)=t$, la forme $L(a,b)=a+b$ prolonge $\ell_0$, et $L(1,1)=2$ avec $\|(1,1)\|=\sqrt2$ : $\|L\|_{X'}\ge\sqrt2>1$.`,
      },
      {
        conclusion: 'x-riesz',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Le vecteur $x/\|x\|$ ne représente une forme que dans un espace de Hilbert : un espace de Banach n'est pas muni d'un produit scalaire en général.`,
        counterexample: t`Dans $C([0,1])$ muni de $\|\cdot\|_\infty$, l'identité du parallélogramme échoue pour $f=1$ et $g(s)=s$ : $\|f+g\|^2+\|f-g\|^2=5\neq 4=2\|f\|^2+2\|g\|^2$. Aucun produit scalaire n'induit cette norme.`,
      },
      {
        conclusion: 'hb',
        by: 'j-quelconque',
        verdict: 'incorrect',
        concept: 'hahn-banach-norme-prolongement',
        message: t`Un prolongement quelconque ne contrôle pas la norme : seul un prolongement fourni par Hahn–Banach vérifie $\|\ell\|_{X'}=\|\ell_0\|_{M'}$.`,
      },
      {
        conclusion: 'hb',
        by: 'j-zorn',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`Le lemme de Zorn intervient dans la démonstration de Hahn–Banach, mais seul il ne fournit aucun prolongement : il faut l'énoncé complet du théorème, avec la conservation de la norme.`,
      },
      {
        conclusion: 'n1',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`La norme de $\ell_0$ se calcule : utilise $|\ell_0(m)|=\|m\|$, puis le fait que $M$ n'est pas réduit à $\{0\}$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-x',
        label: t`Retirer l'hypothèse $x\neq 0$`,
        necessary: true,
        explanation: t`Pour $x=0$, la droite $M$ est réduite à $\{0\}$ : $\ell_0=0$ est de norme $0$, et la construction ne fournit aucune forme de norme $1$.`,
        counterexample: t`Dans $X=\{0\}$, la seule forme linéaire est nulle : aucune n'est de norme $1$.`,
      },
    ],
  },
  solution: t`**Construction sur une droite.** Posons $M=\mathbb R x$ et $\ell_0(tx)=t\|x\|$. Comme $x\neq 0$, l'écriture $m=tx$ est unique : $\ell_0$ est bien définie, et elle est linéaire. Pour $m=tx$ : $|\ell_0(m)|=|t|\,\|x\|=\|m\|$. Donc $\ell_0\in M'$, et $\|\ell_0\|_{M'}=1$ car $M\neq\{0\}$.

**Prolongement.** Par Hahn–Banach, il existe $\ell\in X'$ telle que $\ell|_M=\ell_0$ et $\|\ell\|_{X'}=\|\ell_0\|_{M'}=1$. En particulier $\ell(x)=\ell_0(1\cdot x)=\|x\|$.

**Remarques.** La complétude de $X$ n'est pas utilisée : le résultat vaut dans tout espace normé réel. Un prolongement linéaire quelconque de $\ell_0$ ne convient pas en général, car sa norme peut dépasser $1$.`,
  steps: [
    t`Définir $\ell_0$ sur la droite $\mathbb R x$ et vérifier qu'elle est bien définie.`,
    t`Montrer que $\|\ell_0\|_{M'}=1$.`,
    'Prolonger par Hahn–Banach en conservant la norme.',
    t`Évaluer le prolongement en $x$.`,
  ],
  commonErrors: [
    { id: 'e-normalisation', description: t`Prendre $\ell_0(tx)=t$, de norme $1/\|x\|$.`, concept: 'hahn-banach-norme-prolongement' },
    { id: 'e-quelconque', description: 'Prolonger par une forme linéaire quelconque, sans contrôle de la norme.', concept: 'hahn-banach-norme-prolongement' },
    { id: 'e-riesz', description: 'Utiliser un produit scalaire dans un espace de Banach général.', concept: 'hypotheses-theoreme' },
  ],
  hints: [
    t`Sur quel sous-espace sait-on écrire à la main une forme qui vaut $\|x\|$ en $x$ ?`,
    t`Définis $\ell_0$ sur la droite $\mathbb R x$, calcule sa norme, puis prolonge-la par le théorème du cours.`,
    t`Avec $\ell_0(tx)=t\|x\|$, on a $|\ell_0(m)|=\|m\|$ sur la droite, donc $\|\ell_0\|_{M'}=1$. Hahn–Banach conserve cette norme, et le prolongement vaut $\|x\|$ en $x$.`,
  ],
  rubric: rubric({
    hypotheses: t`L'hypothèse $x\neq 0$ est utilisée pour définir $\ell_0$ et pour calculer sa norme.`,
    methode: 'Construction sur une droite, puis prolongement par Hahn–Banach.',
    validite: t`La norme de $\ell_0$ est calculée exactement.`,
    justifications: 'La conservation de la norme est attribuée à Hahn–Banach, non à un prolongement quelconque.',
    conclusion: t`$\|\ell\|_{X'}=1$ et $\ell(x)=\|x\|$ sont obtenus.`,
  }),
  variant: {
    statement: t`Soit $X$ un espace normé réel. Montrer que, pour tout $x\in X$, $\|x\|=\max\{\ell(x) : \ell\in X',\ \|\ell\|_{X'}\le 1\}$, puis que si $\ell(x)=0$ pour tout $\ell\in X'$, alors $x=0$.`,
    solution: t`Pour $\|\ell\|_{X'}\le 1$ : $\ell(x)\le\|\ell\|_{X'}\|x\|\le\|x\|$. Si $x=0$, la forme nulle réalise l'égalité. Si $x\neq 0$, l'exercice fournit $\ell$ de norme $1$ avec $\ell(x)=\|x\|$ : la borne $\|x\|$ est atteinte, c'est un maximum. Enfin, si $\ell(x)=0$ pour toute $\ell\in X'$, ce maximum est nul, donc $\|x\|=0$ et $x=0$ : le dual sépare les points.`,
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'hahn-banach.difficile',
  theoremId: 'hahn-banach',
  level: 'difficile',
  title: 'Inégalité de support pour un convexe fermé',
  statement: t`Soit $X$ un espace normé réel, $C\subset X$ une partie non vide, convexe et fermée, et $x_0\notin C$. On note $d=\inf_{z\in C}\|x_0-z\|$ et, pour $L\in X'$, $\sigma_C(L)=\sup_{z\in C}L(z)\in\,]-\infty,+\infty]$. On admet la séparation d'un point et d'un convexe fermé : si $D\subset X$ est convexe, fermé, non vide, et si $y\notin D$, il existe $L\in X'$ et $\alpha\in\mathbb R$ tels que $L(w)\le\alpha<L(y)$ pour tout $w\in D$. Montrer que $d>0$ ; que pour tout $r\in\,]0,d[$ il existe $L\in X'$ avec $\|L\|_{X'}=1$ et $\sigma_C(L)+r\le L(x_0)$ (inégalité de support) ; enfin que $d=\sup_{\|L\|_{X'}\le 1}\big(L(x_0)-\sigma_C(L)\big)$.`,
  source: poly(38, 'Exercice 3, difficile (p. PDF 38) ; séparation évoquée en section 1.3 (p. PDF 7)'),
  prerequisites: ['projection'],
  concepts: ['hahn-banach-support', 'fermeture-espace', 'hypotheses-theoreme', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-X', kind: 'hypothese', text: t`$X$ est un espace normé réel.` },
      { id: 'h-nonvide', kind: 'hypothese', text: t`$C\neq\emptyset$.` },
      { id: 'h-convexe', kind: 'hypothese', text: t`$C$ est convexe.` },
      { id: 'h-ferme', kind: 'hypothese', text: t`$C$ est fermé dans $X$.` },
      { id: 'h-x0', kind: 'hypothese', text: t`$x_0\notin C$.` },
      { id: 'd-dist', kind: 'definition', text: t`$d=\inf_{z\in C}\|x_0-z\|$ et $\sigma_C(L)=\sup_{z\in C}L(z)$ pour $L\in X'$.` },
      { id: 'd-r', kind: 'definition', local: true, text: t`Soit $r$ un réel tel que $0<r<d$.` },
      { id: 'd-D', kind: 'definition', local: true, text: t`$D=\overline{C+B(0,r)}$ est l'adhérence dans $X$ de $C+B(0,r)$, où $B(0,r)$ est la boule ouverte de centre $0$ et de rayon $r$.` },

      { id: 'd-pos', kind: 'inegalite', text: t`$d>0$.` },
      { id: 'D-conv', kind: 'consequence', text: t`$D$ est convexe, fermé et non vide.` },
      { id: 'D-sep', kind: 'consequence', text: t`$\|x_0-w\|\ge d-r>0$ pour tout $w\in D$ ; en particulier $x_0\notin D$.` },
      { id: 'sep', kind: 'application-theoreme', text: t`Il existe $L\in X'$ et $\alpha\in\mathbb R$ tels que $L(w)\le\alpha<L(x_0)$ pour tout $w\in D$.` },
      { id: 'Lnn', kind: 'consequence', text: t`$L\neq 0$.` },
      { id: 'nrm', kind: 'consequence', text: t`Quitte à remplacer $(L,\alpha)$ par $(L/\|L\|_{X'},\alpha/\|L\|_{X'})$, on peut supposer $\|L\|_{X'}=1$.` },
      { id: 'sup-ball', kind: 'egalite', text: t`$\sup_{u\in B(0,r)}L(u)=r\,\|L\|_{X'}=r$.` },
      { id: 'ineg-z', kind: 'inegalite', text: t`Pour tout $z\in C$ : $L(z)+r\le\alpha<L(x_0)$.` },
      { id: 'sigma', kind: 'inegalite', text: t`$\sigma_C(L)+r\le\alpha<L(x_0)$ ; en particulier $\sigma_C(L)<+\infty$.` },
      { id: 'support', kind: 'consequence', text: t`Pour tout $r\in\,]0,d[$, il existe $L\in X'$ avec $\|L\|_{X'}=1$ et $\sigma_C(L)+r\le L(x_0)$.` },
      { id: 'maj', kind: 'inegalite', text: t`Pour tout $L\in X'$ tel que $\|L\|_{X'}\le 1$ : $L(x_0)-\sigma_C(L)\le d$.` },
      { id: 'dual', kind: 'egalite', text: t`$d=\sup_{\|L\|_{X'}\le 1}\big(L(x_0)-\sigma_C(L)\big)$.` },
      { id: 'fin', kind: 'conclusion', text: t`$d>0$, l'inégalité de support est établie pour tout $r\in\,]0,d[$, et la distance $d$ s'exprime par dualité.` },

      // Propositions plausibles mais fausses.
      { id: 'x-somme-fermee', kind: 'consequence', distractor: true, text: t`$C+B(0,r)$ est fermé dans $X$.` },
      { id: 'x-sans-norme', kind: 'inegalite', distractor: true, after: ['sep'], text: t`Sans normaliser $L$, on a déjà $L(z)+r\le\alpha$ pour tout $z\in C$.` },
      { id: 'x-sep-directe', kind: 'inegalite', distractor: true, text: t`Toute séparation $L(z)\le\alpha<L(x_0)$ de $x_0$ et de $C$, avec $\|L\|_{X'}=1$, vérifie $L(z)+r\le\alpha$ pour tout $z\in C$.` },
    ],
    justifications: [
      { id: 'j-ferme-dist', label: t`Si $d=0$, une suite de points de $C$ converge vers $x_0$ ; $C$ étant fermé, on aurait $x_0\in C$.` },
      { id: 'j-somme-convexe', label: t`$C+B(0,r)$ est convexe comme somme de deux convexes, et non vide ; l'adhérence d'un convexe est convexe.` },
      { id: 'j-dist-D', label: t`Pour $w=z+u$ avec $z\in C$ et $\|u\|<r$ : $\|x_0-w\|\ge\|x_0-z\|-\|u\|\ge d-r$ ; cette inégalité large passe à l'adhérence.` },
      { id: 'j-sep', label: 'Séparation d’un point et d’un convexe fermé non vide (forme géométrique de Hahn–Banach, admise).', theorem: 'hahn-banach' },
      { id: 'j-L-nonnul', label: t`Si $L=0$, l'inégalité $L(w)\le\alpha<L(x_0)$ en un point $w\in D$ donnerait $0\le\alpha<0$.` },
      { id: 'j-normalise', label: t`Diviser par le réel strictement positif $\|L\|_{X'}$ conserve les inégalités.` },
      { id: 'j-sup-boule', label: t`Définition de $\|L\|_{X'}$ comme borne supérieure, et homogénéité : $\sup_{\|u\|<r}L(u)=r\sup_{\|v\|<1}L(v)$.` },
      { id: 'j-z-plus-u', label: t`Pour $z\in C$ et $u\in B(0,r)$, $z+u\in D$, donc $L(z)+L(u)\le\alpha$ ; passer à la borne supérieure en $u$.` },
      { id: 'j-sup-z', label: t`Passer à la borne supérieure en $z\in C$.` },
      { id: 'j-generalise', label: t`Le réel $r\in\,]0,d[$ était quelconque.` },
      { id: 'j-maj', label: t`Pour $z\in C$ : $L(x_0)-\sigma_C(L)\le L(x_0-z)\le\|L\|_{X'}\|x_0-z\|\le\|x_0-z\|$ ; passer à la borne inférieure en $z$.` },
      { id: 'j-dualite', label: t`La borne supérieure est au plus $d$, et au moins $r$ pour tout $r\in\,]0,d[$ ; cet intervalle est non vide car $d>0$.` },
      { id: 'j-syn', label: 'Réunion des trois résultats.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-proj', label: t`Projeter $x_0$ sur $C$ et prendre $L=\langle\cdot,x_0-P_Cx_0\rangle$.`, theorem: 'projection' },
      { id: 'j-sup-atteint', label: t`Le supremum de $L$ sur $B(0,r)$ est atteint en un point $u_0\in B(0,r)$.` },
      { id: 'j-somme-ferme', label: 'Une somme de deux fermés est fermée.' },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['h-ferme', 'h-x0', 'd-dist'], to: 'd-pos', by: 'j-ferme-dist' },
      { from: ['h-nonvide', 'h-convexe', 'd-D'], to: 'D-conv', by: 'j-somme-convexe' },
      { from: ['d-D', 'd-r', 'd-dist'], to: 'D-sep', by: 'j-dist-D' },
      { from: ['h-X', 'D-conv', 'D-sep'], to: 'sep', by: 'j-sep' },
      { from: ['sep', 'D-conv'], to: 'Lnn', by: 'j-L-nonnul' },
      { from: ['sep', 'Lnn'], to: 'nrm', by: 'j-normalise' },
      { from: ['nrm'], to: 'sup-ball', by: 'j-sup-boule' },
      { from: ['sep', 'nrm', 'sup-ball', 'd-D'], to: 'ineg-z', by: 'j-z-plus-u' },
      { from: ['ineg-z', 'd-dist'], to: 'sigma', by: 'j-sup-z' },
      { from: ['sigma', 'nrm', 'd-r'], to: 'support', by: 'j-generalise' },
      { from: ['d-dist', 'h-nonvide'], to: 'maj', by: 'j-maj' },
      { from: ['support', 'maj', 'd-pos'], to: 'dual', by: 'j-dualite' },
      { from: ['d-pos', 'support', 'dual'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-somme-fermee',
        verdict: 'incorrect',
        concept: 'fermeture-espace',
        message: t`$C+B(0,r)$ est une réunion de boules ouvertes, donc un ouvert, en général non fermé : c'est pourquoi on passe à l'adhérence $D$.`,
        counterexample: t`$X=\mathbb R$, $C=\{0\}$, $r=1$ : $C+B(0,1)=\,]-1,1[$ n'est pas fermé.`,
      },
      {
        conclusion: 'x-sans-norme',
        verdict: 'incorrect',
        concept: 'hahn-banach-support',
        message: t`$\sup_{u\in B(0,r)}L(u)$ vaut $r\|L\|_{X'}$, et non $r$ : sans normalisation, la marge obtenue est $r\|L\|_{X'}$.`,
        counterexample: t`$X=\mathbb R$, $C=\,]-\infty,0]$, $x_0=2$, $r=1$, $D=\,]-\infty,1]$, $L(x)=x/2$, $\alpha=3/4$ : $L(w)\le\alpha<L(x_0)$ sur $D$, mais $L(0)+r=1>\alpha$.`,
      },
      {
        conclusion: 'x-sep-directe',
        verdict: 'incorrect',
        concept: 'hahn-banach-support',
        message: t`Une séparation de $x_0$ et de $C$ ne contrôle pas l'écart entre $\alpha$ et $\sup_CL$ : c'est l'élargissement de $C$ en $D$ qui fournit la marge $r$.`,
        counterexample: t`$X=\mathbb R$, $C=\,]-\infty,0]$, $x_0=1$, $d=1$, $r=1/2$, $L(x)=x$, $\alpha=1/4$ : $L(z)\le\alpha<L(x_0)$ sur $C$, mais $L(0)+r=1/2>\alpha$.`,
      },
      {
        conclusion: 'sep',
        by: 'j-proj',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`La projection sur un convexe fermé est un résultat hilbertien. Dans un espace normé général, le point le plus proche peut ne pas exister ou ne pas être unique : il faut invoquer la séparation.`,
        counterexample: t`Dans $\mathbb R^2$ muni de $\|(a,b)\|_\infty=\max(|a|,|b|)$, tous les points $(1,b)$ avec $|b|\le 1$ de la droite fermée $\{a=1\}$ sont à distance $1$ de $(0,0)$.`,
      },
      {
        conclusion: 'sup-ball',
        by: 'j-sup-atteint',
        verdict: 'incorrect',
        concept: 'hahn-banach-support',
        message: t`Le calcul n'exige aucun point où le supremum est atteint : seule compte la définition de la norme duale comme borne supérieure. Sur une boule ouverte, le supremum d'une forme non nulle n'est d'ailleurs jamais atteint.`,
        counterexample: t`Si $\|u\|<r$ et $\|L\|_{X'}=1$, alors $L(u)\le\|u\|<r$.`,
      },
      {
        conclusion: 'D-conv',
        by: 'j-somme-ferme',
        verdict: 'incorrect',
        concept: 'fermeture-espace',
        message: t`Une somme de deux fermés n'est pas fermée en général, et $B(0,r)$ n'est pas fermée : $D$ est fermé parce que c'est une adhérence.`,
        counterexample: t`Dans $\mathbb R^2$, $\{(a,b) : a>0,\ ab\ge 1\}$ et $\mathbb R\times\{0\}$ sont fermés, mais leur somme $\mathbb R\times\,]0,+\infty[$ ne l'est pas.`,
      },
      {
        conclusion: 'd-pos',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`$d>0$ se démontre : c'est exactement là que sert la fermeture de $C$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-ferme',
        label: t`Ne plus disposer de la fermeture de $C$`,
        necessary: true,
        explanation: t`Sans fermeture, $x_0$ peut être adhérent à $C$ sans lui appartenir : alors $d=0$, et aucune forme ne sépare strictement $x_0$ de $C$.`,
        counterexample: t`Dans $X=\mathbb R$, $C=\,]0,1]$ et $x_0=0\notin C$ : pour toute forme $L(x)=\lambda x$, on a $\sigma_C(L)\ge 0=L(x_0)$. Aucune inégalité stricte n'est possible.`,
      },
      {
        hypothesis: 'h-convexe',
        label: t`Ne plus disposer de la convexité de $C$`,
        necessary: true,
        explanation: 'Sans convexité, le théorème de séparation ne s’applique plus.',
        counterexample: t`Dans $X=\mathbb R$, $C=\{-1,1\}$ et $x_0=0$ : $C$ est fermé, $x_0\notin C$ et $d=1$, mais pour toute forme $L(x)=\lambda x$, $\sigma_C(L)=|\lambda|\ge 0=L(x_0)$.`,
      },
    ],
  },
  closedChecks: [
    {
      kind: 'rational',
      prompt: t`Dans $X=\mathbb R^2$ muni de $\|(a,b)\|_\infty=\max(|a|,|b|)$, avec $C=\{(a,b) : a\le 0\}$ et $x_0=(1,1)$ : valeur de $d$`,
      expected: '1',
    },
  ],
  solution: t`**Écart strictement positif.** Si $d=0$, il existe $z_n\in C$ avec $z_n\to x_0$ ; $C$ étant fermé, $x_0\in C$, ce qui est exclu. Donc $d>0$.

**Élargissement.** Fixons $r\in\,]0,d[$ et $D=\overline{C+B(0,r)}$. L'ensemble $C+B(0,r)$ est convexe, non vide ; son adhérence $D$ est convexe, fermée, non vide. Pour $w=z+u$ avec $z\in C$ et $\|u\|<r$ : $\|x_0-w\|\ge\|x_0-z\|-\|u\|\ge d-r$, et cette inégalité large passe à l'adhérence. Donc $x_0\notin D$.

**Séparation et normalisation.** La séparation fournit $L\in X'$ et $\alpha$ avec $L(w)\le\alpha<L(x_0)$ pour tout $w\in D$. On a $L\neq 0$, sinon $0\le\alpha<0$ ; on divise par $\|L\|_{X'}$ pour obtenir $\|L\|_{X'}=1$.

**Inégalité de support.** Pour $z\in C$ et $u\in B(0,r)$, $z+u\in D$, donc $L(z)+L(u)\le\alpha$. Or $\sup_{\|u\|<r}L(u)=r\|L\|_{X'}=r$. Donc $L(z)+r\le\alpha$ pour tout $z\in C$, puis $\sigma_C(L)+r\le\alpha<L(x_0)$.

**Dualité.** Pour $\|L\|_{X'}\le 1$ et $z\in C$ : $L(x_0)-\sigma_C(L)\le L(x_0-z)\le\|x_0-z\|$ ; en passant à la borne inférieure, $L(x_0)-\sigma_C(L)\le d$. Réciproquement, la borne supérieure est au moins $r$ pour tout $r\in\,]0,d[$, donc au moins $d$. D'où $d=\sup_{\|L\|_{X'}\le 1}\big(L(x_0)-\sigma_C(L)\big)$.

**Remarques.** Cette borne supérieure est en fait atteinte, par compacité faible-* de la boule unité de $X'$ ; ce n'est pas demandé ici. Dans un espace de Hilbert, la projection fournit directement une forme optimale (voir la variante).`,
  steps: [
    t`Utiliser la fermeture de $C$ pour obtenir $d>0$.`,
    t`Élargir $C$ en un convexe fermé $D$ qui ne contient pas $x_0$.`,
    t`Séparer $x_0$ de $D$, puis normaliser la forme obtenue.`,
    t`Calculer la borne supérieure sur la boule pour faire apparaître la marge $r$.`,
    t`Établir la formule de dualité par les deux inégalités.`,
  ],
  commonErrors: [
    { id: 'e-somme', description: t`Croire que $C+B(0,r)$ est fermé.`, concept: 'fermeture-espace' },
    { id: 'e-normalisation', description: t`Oublier de normaliser $L$ : la marge obtenue est alors $r\|L\|_{X'}$.`, concept: 'hahn-banach-support' },
    { id: 'e-projection', description: 'Utiliser une projection dans un espace normé non hilbertien.', concept: 'hypotheses-theoreme' },
  ],
  hints: [
    t`Où sert la fermeture de $C$ ? Commence par montrer que $x_0$ est à distance strictement positive de $C$.`,
    t`Pour obtenir une marge $r$, sépare $x_0$ non pas de $C$, mais d'un convexe fermé plus gros, qui contient tous les $z+u$ avec $z\in C$ et $\|u\|<r$.`,
    t`Après séparation de $x_0$ et de $D=\overline{C+B(0,r)}$, normalise $L$, puis passe à la borne supérieure en $u\in B(0,r)$ dans $L(z)+L(u)\le\alpha$ : elle vaut $r$. L'autre inégalité de la formule de dualité vient de $L(x_0-z)\le\|x_0-z\|$.`,
  ],
  rubric: rubric({
    hypotheses: t`Fermeture et convexité de $C$ sont utilisées là où elles servent : $d>0$ et séparation.`,
    methode: 'Élargissement de C, séparation, normalisation, passage à la borne supérieure.',
    validite: t`$D$ est fermé par construction et ne contient pas $x_0$.`,
    justifications: 'La marge provient du calcul de la norme duale, non d’un point où le supremum serait atteint.',
    conclusion: 'L’inégalité de support et la formule de dualité sont établies.',
  }),
  variant: {
    statement: t`Soit $H$ un espace de Hilbert réel, $C\subset H$ non vide, convexe et fermé, $x_0\notin C$ et $p=P_Cx_0$. Construire explicitement $L\in H'$ de norme $1$ telle que $\sigma_C(L)+\|x_0-p\|=L(x_0)$. Dans ce cadre, la marge de l'inégalité de support atteint donc la distance $\|x_0-p\|=\inf_{z\in C}\|x_0-z\|$.`,
    solution: t`Le théorème de projection donne $p\in C$, $\|x_0-p\|=\inf_{z\in C}\|x_0-z\|$ et $\langle x_0-p,z-p\rangle\le 0$ pour tout $z\in C$. Comme $x_0\notin C$ et $p\in C$, $d=\|x_0-p\|>0$. On pose $n=(x_0-p)/d$ et $L=\langle\cdot,n\rangle$ : $\|L\|_{H'}=\|n\|=1$. L'inégalité caractéristique, divisée par $d>0$, donne $L(z)\le L(p)$ pour tout $z\in C$ ; comme $p\in C$, $\sigma_C(L)=L(p)$. Enfin $L(x_0)-L(p)=\langle x_0-p,n\rangle=d$. Donc $\sigma_C(L)+d=L(x_0)$ : dans un Hilbert, la borne supérieure de la formule de dualité est atteinte, sans recours à Hahn–Banach.`,
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h-H', kind: 'hypothese', text: t`$H$ est un espace de Hilbert réel.` },
        { id: 'h-C', kind: 'hypothese', text: t`$C\subset H$ est non vide, convexe et fermé.` },
        { id: 'h-x0', kind: 'hypothese', text: t`$x_0\notin C$.` },
        { id: 'proj', kind: 'application-theoreme', text: t`$p=P_Cx_0$ existe : $p\in C$, $\|x_0-p\|=\inf_{z\in C}\|x_0-z\|$ et $\langle x_0-p,z-p\rangle\le 0$ pour tout $z\in C$.` },
        { id: 'd-pos', kind: 'inegalite', text: t`$d=\|x_0-p\|>0$.` },
        { id: 'd-n', kind: 'definition', local: true, text: t`On pose $n=(x_0-p)/\|x_0-p\|$ et $L=\langle\cdot,n\rangle$.` },
        { id: 'L-norme', kind: 'egalite', text: t`$L\in H'$ et $\|L\|_{H'}=1$.` },
        { id: 'Lz', kind: 'inegalite', text: t`Pour tout $z\in C$ : $L(z)\le L(p)$.` },
        { id: 'sigma', kind: 'egalite', text: t`$\sigma_C(L)=L(p)$.` },
        { id: 'Lx0', kind: 'egalite', text: t`$L(x_0)-L(p)=\|x_0-p\|$.` },
        { id: 'fin', kind: 'conclusion', text: t`$\|L\|_{H'}=1$ et $\sigma_C(L)+\|x_0-p\|=L(x_0)$, avec $\|x_0-p\|=\inf_{z\in C}\|x_0-z\|$.` },
        { id: 'x-strict', kind: 'inegalite', distractor: true, after: ['Lz'], text: t`Pour tout $z\in C$ : $L(z)<L(p)$.` },
        { id: 'x-non-norme', kind: 'egalite', distractor: true, after: ['proj'], text: t`La forme $\langle\cdot,x_0-p\rangle$ est de norme $1$.` },
      ],
      justifications: [
        { id: 'j-proj', label: 'Théorème de projection sur un convexe fermé non vide, et caractérisation variationnelle.', theorem: 'projection' },
        { id: 'j-dist', label: t`$p\in C$ et $x_0\notin C$, donc $x_0\neq p$.` },
        { id: 'j-cs', label: t`Cauchy–Schwarz pour la majoration, et le test en $v=n$ pour l'égalité.`, theorem: 'cauchy-schwarz' },
        { id: 'j-div', label: t`Diviser l'inégalité caractéristique par le réel strictement positif $\|x_0-p\|$.` },
        { id: 'j-atteint', label: t`$L$ est majorée par $L(p)$ sur $C$, et $p\in C$ : la borne supérieure est atteinte en $p$.` },
        { id: 'j-calc', label: t`$\langle x_0-p,(x_0-p)/\|x_0-p\|\rangle=\|x_0-p\|$.` },
        { id: 'j-syn', label: 'Réunion des résultats.' },
        { id: 'j-hb', label: 'Théorème de Hahn–Banach.', theorem: 'hahn-banach' },
      ],
      rules: [
        { from: ['h-H', 'h-C'], to: 'proj', by: 'j-proj' },
        { from: ['proj', 'h-x0'], to: 'd-pos', by: 'j-dist' },
        { from: ['d-n', 'd-pos'], to: 'L-norme', by: 'j-cs' },
        { from: ['proj', 'd-n', 'd-pos'], to: 'Lz', by: 'j-div' },
        { from: ['Lz', 'proj'], to: 'sigma', by: 'j-atteint' },
        { from: ['d-n', 'd-pos'], to: 'Lx0', by: 'j-calc' },
        { from: ['L-norme', 'sigma', 'Lx0', 'proj'], to: 'fin', by: 'j-syn' },
      ],
      traps: [
        {
          conclusion: 'x-strict',
          verdict: 'incorrect',
          concept: 'hahn-banach-support',
          message: t`En $z=p\in C$, il y a égalité : l'inégalité est large.`,
          counterexample: t`$z=p$ donne $L(z)=L(p)$.`,
        },
        {
          conclusion: 'x-non-norme',
          verdict: 'incorrect',
          concept: 'hahn-banach-support',
          message: t`La norme de $\langle\cdot,x_0-p\rangle$ vaut $\|x_0-p\|$ : elle n'est égale à $1$ que si la distance vaut $1$. Il faut normaliser.`,
          counterexample: t`$H=\mathbb R$, $C=\,]-\infty,0]$, $x_0=2$ : $p=0$, et la forme $v\mapsto 2v$ est de norme $2$.`,
        },
        {
          conclusion: 'Lz',
          by: 'j-hb',
          verdict: 'incorrect',
          concept: 'hahn-banach-support',
          message: t`Hahn–Banach fournit l'existence d'une forme séparante, mais ne dit rien de cette forme précise : ici, c'est l'inégalité caractéristique de la projection qui donne $L(z)\le L(p)$.`,
        },
      ],
      removable: [
        {
          hypothesis: 'h-x0',
          label: t`Retirer l'hypothèse $x_0\notin C$`,
          necessary: true,
          explanation: t`Si $x_0\in C$, alors $p=x_0$ : la distance est nulle et $n$ n'est pas défini.`,
          counterexample: t`Pour $x_0\in C$, on a $\sigma_C(L)\ge L(x_0)$ pour toute $L\in H'$ : aucune marge strictement positive n'est possible.`,
        },
      ],
    },
  },
  verification: {
    origin: 'complement',
    review: 'machine',
    notes: 'Le polycopié n’énonce pas la séparation d’un point et d’un convexe fermé (section 1.3 : forme « prolongement » seulement) ; elle est admise dans l’énoncé de l’exercice.',
  },
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT03: TheoremModule = {
  theorem: {
    id: 'hahn-banach',
    spaces: [
      t`$X$ : espace normé réel, de dual topologique $X'$ normé par $\|L\|_{X'}=\sup_{\|x\|\le 1}|L(x)|$.`,
      t`$M\subset X$ : sous-espace vectoriel, non nécessairement fermé, muni de la norme induite ; $M'$ est son dual topologique.`,
    ],
    hypotheses: [
      { id: 'h-norme-reel', text: t`$X$ est un espace normé réel ; aucune complétude n'est requise.` },
      { id: 'h-sous-espace', text: t`$M$ est un sous-espace vectoriel de $X$.` },
      {
        id: 'h-continue',
        text: t`$\ell\in M'$ : $\ell$ est linéaire et continue sur $M$.`,
        whenRemoved: t`Sur l'espace $M$ des polynômes, muni de la norme uniforme sur $[0,1]$, la forme $\ell(p)=p'(0)$ n'est pas continue : $p_n(x)=x(1-x)^n$ vérifie $\|p_n\|_\infty\le\tfrac1{n+1}$ et $\ell(p_n)=1$. Elle n'admet donc aucun prolongement continu à $C([0,1])$, puisque la restriction à $M$ d'une forme continue est continue.`,
      },
    ],
    statement: t`Soit $X$ un espace normé réel, $M\subset X$ un sous-espace et $\ell\in M'$. Il existe $L\in X'$ tel que $L|_M=\ell$ et $\|L\|_{X'}=\|\ell\|_{M'}$.`,
    conclusions: {
      existence: t`Un prolongement continu existe ; il se construit direction par direction, puis par un argument de maximalité (lemme de Zorn).`,
      autre: t`Le prolongement conserve la norme : $\|L\|_{X'}=\|\ell\|_{M'}$.`,
    },
    sourceProof: 'idee',
    proofOutline: [
      t`Notons $c=\|\ell\|_{M'}$. Il suffit de construire $L\in X'$ prolongeant $\ell$ avec $\|L\|_{X'}\le c$ : l'inégalité inverse est automatique, puisque $L$ coïncide avec $\ell$ sur $M$.`,
      t`*Une direction de plus.* Soit $x_1\notin M$ et $N=M\oplus\mathbb R x_1$. Pour $m,m'\in M$ : $\ell(m)-\ell(m')\le c\|m-m'\|\le c\|m+x_1\|+c\|m'+x_1\|$. Donc $\sup_{m'\in M}\big(-\ell(m')-c\|m'+x_1\|\big)\le\inf_{m\in M}\big(-\ell(m)+c\|m+x_1\|\big)$, et l'on choisit $\beta$ entre ces deux bornes : $|\ell(m)+\beta|\le c\|m+x_1\|$ pour tout $m\in M$.`,
      t`On pose $g(m+tx_1)=\ell(m)+t\beta$. Pour $t\neq 0$ : $|g(m+tx_1)|=|t|\,|\ell(m/t)+\beta|\le c\|m+tx_1\|$. Ainsi $g$ prolonge $\ell$ à $N$ sans augmenter la norme.`,
      t`*Maximalité.* Les couples $(N,g)$, où $N\supset M$ est un sous-espace et $g$ un prolongement linéaire de $\ell$ à $N$ vérifiant $|g|\le c\|\cdot\|$, sont ordonnés par prolongement ; toute chaîne est majorée par sa réunion. Le lemme de Zorn fournit un élément maximal $(N,g)$.`,
      t`Si $N\neq X$, l'étape précédente prolonge strictement $(N,g)$, ce qui contredit la maximalité. Donc $N=X$, et $L=g$ convient.`,
    ],
    warnings: [
      t`Prolonger ne suffit pas : un prolongement linéaire quelconque peut avoir une norme strictement supérieure à $\|\ell\|_{M'}$.`,
      t`Le théorème affirme l'existence, non l'unicité : pour $\|(x,y)\|_1=|x|+|y|$ sur $\mathbb R^2$, la forme $\ell(t,0)=2t$ admet une infinité de prolongements de même norme.`,
      'La séparation d’un point et d’un convexe fermé, évoquée dans le titre de la section, n’est pas énoncée dans le polycopié : elle est utilisée ici comme résultat admis.',
      'La démonstration générale utilise le lemme de Zorn ; en dimension finie, une récurrence sur la dimension suffit.',
    ],
    usefulFor: 'Séparer deux convexes, démontrer qu’une forme linéaire détecte un vecteur non nul, comprendre les topologies faibles et les duaux.',
    verification: {
      origin: 'complement',
      review: 'machine',
      notes: 'Le polycopié (p. PDF 7) ne donne qu’une idée de preuve ; la démonstration esquissée ici est complétée pour ProofLab.',
    },
  },
  definitions: [
    {
      id: 'hahn-banach-prolongement',
      term: 'Prolongement d’une forme linéaire',
      statement: t`Si $M\subset X$ est un sous-espace et $\ell\in M'$, un prolongement de $\ell$ est une forme linéaire $L$ sur $X$ telle que $L|_M=\ell$ ; il est dit de même norme si $\|L\|_{X'}=\|\ell\|_{M'}$.`,
      source: poly(7, 'Section 1.3'),
    },
    {
      id: 'hahn-banach-fonction-appui',
      term: 'Fonction d’appui d’une partie',
      statement: t`Pour $C\subset X$ non vide et $L\in X'$, $\sigma_C(L)=\sup_{z\in C}L(z)\in\,]-\infty,+\infty]$. L'inégalité $L(z)\le\sigma_C(L)$, valable pour tout $z\in C$, est l'inégalité de support associée à $L$.`,
      source: complement('Définition standard, utilisée dans l’exercice difficile'),
    },
  ],
  concepts: [
    {
      id: 'hahn-banach-norme-prolongement',
      label: 'Norme d’un prolongement',
      reminder: t`Si $L$ prolonge $\ell$, on a toujours $\|L\|_{X'}\ge\|\ell\|_{M'}$ ; l'égalité n'est garantie que pour un prolongement bien choisi, celui de Hahn–Banach.`,
    },
    {
      id: 'hahn-banach-support',
      label: 'Séparation et inégalité de support',
      reminder: t`Séparer $x_0$ d'un convexe fermé $C$ donne $L\in X'$ avec $\sup_CL<L(x_0)$ ; une marge quantitative s'obtient en séparant $x_0$ d'un élargissement de $C$, après normalisation de $L$.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-hb-unicite',
      theoremId: 'hahn-banach',
      title: 'Plusieurs prolongements de même norme',
      claim: t`Le prolongement de même norme fourni par Hahn–Banach est unique.`,
      correctStatement: t`Hahn–Banach affirme l'existence d'un prolongement de même norme, non son unicité.`,
      task: t`Sur $\mathbb R^2$ muni de $\|(x,y)\|_1=|x|+|y|$, soit $\ell(t,0)=2t$ sur l'axe horizontal. Calcule la norme du prolongement $L_1(x,y)=2x+y$ : elle coïncide avec celle de $L_0(x,y)=2x$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\|L_1\|$ pour la norme $\|\cdot\|_1$`, expected: '2' },
      explanation: t`Pour $|x|+|y|\le 1$ : $|2x+y|\le 2|x|+|y|\le 2(|x|+|y|)\le 2$, avec égalité en $(1,0)$. Donc $\|L_1\|=2=\|L_0\|=\|\ell\|_{M'}$ : deux prolongements distincts conservent la norme.`,
      concept: 'existence-unicite',
      source: poly(7, 'Section 1.3 (énoncé d’existence)'),
    },
    {
      id: 'ce-hb-norme',
      theoremId: 'hahn-banach',
      title: 'Un prolongement qui augmente la norme',
      claim: t`Tout prolongement linéaire d'une forme continue conserve sa norme.`,
      correctStatement: t`Un prolongement peut augmenter la norme ; Hahn–Banach garantit l'existence d'un prolongement qui la conserve.`,
      task: t`Sur $\mathbb R^2$ euclidien, la forme $L(x,y)=2x+y$ prolonge $\ell(t,0)=2t$, qui est de norme $2$ sur l'axe horizontal. Calcule $\|L\|^2$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\|L\|^2$`, expected: '5' },
      explanation: t`Par Cauchy–Schwarz, $|2x+y|\le\sqrt5\,\|(x,y)\|$, avec égalité en $(2,1)$ : $\|L\|=\sqrt5>2$.`,
      concept: 'hahn-banach-norme-prolongement',
      source: poly(7, 'Section 1.3 (conservation de la norme)'),
    },
    {
      id: 'ce-hb-ferme',
      theoremId: 'hahn-banach',
      title: 'Séparation stricte et convexe non fermé',
      claim: t`Si $C\subset\mathbb R^2$ est convexe et non vide, et si $x_0\notin C$, il existe une forme linéaire $L$ telle que $\sup_CL<L(x_0)$.`,
      correctStatement: t`La séparation stricte d'un point $x_0$ et d'un convexe $C$ est garantie lorsque $C$ est fermé, ou plus généralement lorsque $x_0$ n'est pas adhérent à $C$ : un point adhérent à $C$ ne peut pas en être séparé strictement.`,
      task: t`Soit $C$ le disque unité ouvert de $\mathbb R^2$, $x_0=(1,0)\notin C$ et $L(x,y)=x$. Calcule $\sup_{z\in C}L(z)-L(x_0)$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\sup_{z\in C}L(z)-L(x_0)$`, expected: '0' },
      explanation: t`$\sup_CL=1=L(x_0)$. Plus généralement, pour $L(x,y)=ax+by$, $\sup_CL=\sqrt{a^2+b^2}\ge a=L(x_0)$ : aucune séparation stricte n'est possible.`,
      concept: 'hypotheses-theoreme',
      source: poly(7, 'Section 1.3 (séparation)'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT03;
