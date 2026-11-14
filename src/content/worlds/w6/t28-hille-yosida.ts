/**
 * Résultat 28 — Hille–Yosida, cas contractif (polycopié, section 6.8).
 * Le polycopié donne le sens direct en une phrase et la réciproque sous forme de plan :
 * l'exercice difficile complète entièrement la construction de Yosida.
 */
import { t, rubric, poly, complement, FROM_POLY, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'hille-yosida.facile',
  theoremId: 'hille-yosida',
  level: 'facile',
  title: t`Générateur d'un semi-groupe diagonal : le domaine exact`,
  statement: t`Sur $H=\ell^2(\mathbb N^*)$, on pose $(S(t)u)_n=e^{-nt}u_n$ pour $t\ge0$ et $u\in H$.

Rappeler la définition exacte du générateur $G$ d'un $C_0$-semi-groupe : $D(G)$ est l'ensemble des $u\in H$ pour lesquels $\lim_{t\downarrow0}\frac{S(t)u-u}{t}$ existe dans la norme de $H$, et $Gu$ est cette limite. Montrer que $S$ est un $C_0$-semi-groupe de contractions, puis que $D(G)=\{u\in H:\sum_nn^2|u_n|^2<\infty\}$ et $(Gu)_n=-nu_n$. Réfuter l'assertion voisine : « $D(G)=H$, puisque chaque coordonnée de $\frac{S(t)u-u}{t}$ converge ».`,
  source: poly(43, 'Exercice 28, facile (p. PDF 43) ; vocabulaire de la section 6.8 (p. PDF 26)'),
  prerequisites: [],
  concepts: ['domaine-operateur', 'hille-yosida-convergence-forte', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-S', kind: 'hypothese', text: t`$H=\ell^2(\mathbb N^*)$ et, pour $t\ge0$ et $u\in H$ : $(S(t)u)_n=e^{-nt}u_n$.` },
      { id: 'd-c0', kind: 'definition', text: t`$(S(t))_{t\ge0}\subset\mathcal L(H)$ est un $C_0$-semi-groupe si $S(0)=I$, $S(t+s)=S(t)S(s)$ et $\lim_{t\downarrow0}S(t)u=u$ dans $H$ pour chaque $u\in H$.` },
      { id: 'd-gen', kind: 'definition', text: t`Générateur : $D(G)$ est l'ensemble des $u\in H$ tels que $\frac{S(t)u-u}{t}$ admette une limite dans $H$, pour la norme de $H$, quand $t\downarrow0$ ; $Gu$ est cette limite.` },
      { id: 'd-D', kind: 'definition', text: t`$D=\{u\in H:\sum_nn^2|u_n|^2<\infty\}$ et $(Au)_n=-nu_n$ pour $u\in D$.` },

      { id: 's-borne', kind: 'inegalite', text: t`Pour tout $t\ge0$ : $S(t)\in\mathcal L(H)$ et $\|S(t)\|\le1$.` },
      { id: 's-sg', kind: 'egalite', text: t`$S(0)=I$ et $S(t+s)=S(t)S(s)$ pour tous $t,s\ge0$.` },
      { id: 's-fort', kind: 'consequence', text: t`Pour tout $u\in H$ : $\|S(t)u-u\|^2=\sum_n(1-e^{-nt})^2|u_n|^2\to0$ quand $t\downarrow0$.` },
      { id: 's-c0', kind: 'consequence', text: t`$S$ est un $C_0$-semi-groupe de contractions.` },
      { id: 'g-coord', kind: 'egalite', text: t`Si $u\in D(G)$, alors $(Gu)_n=-nu_n$ pour tout $n$.` },
      { id: 'g-incl1', kind: 'inclusion', text: t`$D(G)\subset D$, et $Gu=Au$ pour $u\in D(G)$.` },
      { id: 'g-maj', kind: 'inegalite', text: t`Pour $t>0$ et $n\ge1$ : $0\le n-\dfrac{1-e^{-nt}}{t}\le n$.` },
      { id: 'g-dom', kind: 'consequence', text: t`Pour $u\in D$ : $\Big\|\dfrac{S(t)u-u}{t}-Au\Big\|^2=\sum_n\Big(n-\dfrac{1-e^{-nt}}{t}\Big)^2|u_n|^2\to0$ quand $t\downarrow0$.` },
      { id: 'g-incl2', kind: 'inclusion', text: t`$D\subset D(G)$, et $Gu=Au$ pour $u\in D$.` },
      { id: 'g-eg', kind: 'egalite', text: t`$G=A$, domaines inclus : $D(G)=D$.` },
      { id: 'temoin', kind: 'consequence', text: t`Pour $u_n=1/n$ : $u\in H$, mais $u\notin D(G)$.` },
      { id: 'fin', kind: 'conclusion', text: t`$S$ est un $C_0$-semi-groupe de contractions, de générateur $G$ donné par $D(G)=\{u:\sum_nn^2|u_n|^2<\infty\}\neq H$ et $(Gu)_n=-nu_n$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-tout', kind: 'egalite', distractor: true, after: ['g-coord'], text: t`$D(G)=H$, puisque pour tout $u\in H$ chaque coordonnée de $\frac{S(t)u-u}{t}$ converge quand $t\downarrow0$.` },
      { id: 'x-norme', kind: 'consequence', distractor: true, after: ['s-fort'], text: t`$\|S(t)-I\|\to0$ quand $t\downarrow0$.` },
    ],
    justifications: [
      { id: 'j-coef', label: t`$0<e^{-nt}\le1$ pour $t\ge0$ et $n\ge1$ : opérateur diagonal de coefficients bornés par $1$.` },
      { id: 'j-expo', label: t`$e^{0}=1$ et $e^{-n(t+s)}=e^{-nt}e^{-ns}$, coordonnée par coordonnée.` },
      { id: 'j-dominee-fort', label: t`Convergence dominée pour les séries : chaque terme tend vers $0$ et reste majoré par $|u_n|^2$.`, theorem: 'convergence-dominee' },
      { id: 'j-def-c0', label: t`Définition d'un $C_0$-semi-groupe, avec la contractivité établie.` },
      { id: 'j-coord', label: t`La forme coordonnée $v\mapsto v_n$ est linéaire continue sur $H$, et $\lim_{t\downarrow0}\frac{e^{-nt}-1}{t}=-n$.` },
      { id: 'j-appartient', label: t`$Gu\in H$, donc $\sum_nn^2|u_n|^2=\|Gu\|^2<\infty$.` },
      { id: 'j-exp-ineg', label: t`$0\le1-e^{-x}\le x$ pour tout $x\ge0$, appliqué à $x=nt$.` },
      { id: 'j-dominee-gen', label: t`Convergence dominée pour les séries : chaque terme tend vers $0$ et reste majoré par $n^2|u_n|^2$, sommable pour $u\in D$.`, theorem: 'convergence-dominee' },
      { id: 'j-def-gen', label: t`Définition du générateur : la limite existe dans $H$ et vaut $Au$.` },
      { id: 'j-double-incl', label: 'Double inclusion, et égalité des actions.' },
      { id: 'j-temoin', label: t`$\sum_nn^{-2}<\infty$, tandis que $\sum_nn^2\cdot n^{-2}=+\infty$.` },
      { id: 'j-syn', label: 'Réunion des propriétés établies.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-coord-suffit', label: t`Une suite de $\ell^2$ qui converge coordonnée par coordonnée converge dans $\ell^2$.` },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['h-S'], to: 's-borne', by: 'j-coef' },
      { from: ['h-S'], to: 's-sg', by: 'j-expo' },
      { from: ['h-S'], to: 's-fort', by: 'j-dominee-fort' },
      { from: ['s-borne', 's-sg', 's-fort', 'd-c0'], to: 's-c0', by: 'j-def-c0' },
      { from: ['d-gen', 'h-S'], to: 'g-coord', by: 'j-coord' },
      { from: ['g-coord', 'd-D'], to: 'g-incl1', by: 'j-appartient' },
      { from: [], to: 'g-maj', by: 'j-exp-ineg' },
      { from: ['g-maj', 'd-D', 'h-S'], to: 'g-dom', by: 'j-dominee-gen' },
      { from: ['g-dom', 'd-gen'], to: 'g-incl2', by: 'j-def-gen' },
      { from: ['g-incl1', 'g-incl2'], to: 'g-eg', by: 'j-double-incl' },
      { from: ['g-incl1', 'd-D'], to: 'temoin', by: 'j-temoin' },
      { from: ['s-c0', 'g-eg', 'temoin'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-tout',
        verdict: 'incorrect',
        concept: 'domaine-operateur',
        message: t`La définition exige une limite dans la norme de $H$ : la limite coordonnée par coordonnée doit encore appartenir à $\ell^2$, et la convergence avoir lieu en norme.`,
        counterexample: t`$u_n=1/n$ : $u\in H$, chaque coordonnée de $\frac{S(t)u-u}{t}$ tend vers $-1$, et la suite constante égale à $-1$ n'est pas dans $\ell^2$.`,
      },
      {
        conclusion: 'x-norme',
        verdict: 'incorrect',
        concept: 'hille-yosida-convergence-forte',
        message: t`Un $C_0$-semi-groupe est continu pour chaque $u$ fixé, non en norme d'opérateur ; ici la continuité en norme est fausse.`,
        counterexample: t`Pour $t>0$ et $n\ge\ln2/t$ : $\|S(t)e_n-e_n\|=1-e^{-nt}\ge\frac12$ ; en fait $\|S(t)-I\|=1$ pour tout $t>0$.`,
      },
      {
        conclusion: 'g-dom',
        by: 'j-coord-suffit',
        verdict: 'incorrect',
        concept: 'hille-yosida-convergence-forte',
        message: t`La convergence coordonnée par coordonnée n'entraîne pas la convergence dans $\ell^2$ : il faut une domination, fournie ici par $\sum_nn^2|u_n|^2<\infty$.`,
        counterexample: t`$e_k\to0$ coordonnée par coordonnée quand $k\to\infty$, alors que $\|e_k\|=1$.`,
      },
      {
        conclusion: 's-fort',
        by: 'j-coord-suffit',
        verdict: 'incorrect',
        concept: 'hille-yosida-convergence-forte',
        message: t`La convergence de chaque coordonnée ne suffit pas : il faut dominer la série, ici par $\sum_n|u_n|^2$.`,
        counterexample: t`$e_k\to0$ coordonnée par coordonnée, alors que $\|e_k\|=1$.`,
      },
      {
        conclusion: 's-fort',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`Chaque terme de la série tend vers $0$, mais le passage à la limite dans la somme infinie reste à justifier.`,
      },
    ],
    removable: [
      {
        hypothesis: 'd-D',
        label: t`Ne plus imposer $\sum_nn^2|u_n|^2<\infty$`,
        necessary: true,
        explanation: t`Sans cette condition, la domination disparaît et la limite peut ne pas exister dans $H$ : c'est exactement la condition qui décrit $D(G)$.`,
        counterexample: t`$u_n=1/n$ : chaque coordonnée de $\frac{S(t)u-u}{t}$ tend vers $-1$, et cette limite n'appartient pas à $\ell^2$.`,
      },
    ],
  },
  closedChecks: [
    {
      kind: 'rational-vector',
      prompt: t`Pour $u=e_1+2e_2$ : coordonnées $(Gu)_1$ et $(Gu)_2$`,
      expected: ['-1', '-4'],
      labels: ['(Gu)₁', '(Gu)₂'],
    },
  ],
  solution: t`**Semi-groupe.** Pour $t\ge0$, $S(t)$ est diagonal de coefficients $e^{-nt}\in\,]0,1]$ : $S(t)\in\mathcal L(H)$ et $\|S(t)\|\le1$. On a $S(0)=I$, et $e^{-n(t+s)}=e^{-nt}e^{-ns}$ donne $S(t+s)=S(t)S(s)$. Pour $u\in H$, $\|S(t)u-u\|^2=\sum_n(1-e^{-nt})^2|u_n|^2$ : chaque terme tend vers $0$ quand $t\downarrow0$ et reste majoré par $|u_n|^2$, donc la somme tend vers $0$ par convergence dominée. $S$ est un $C_0$-semi-groupe de contractions. En revanche, $\|S(t)-I\|=\sup_n(1-e^{-nt})=1$ pour tout $t>0$ : la continuité n'a pas lieu en norme d'opérateur.

**$D(G)\subset D$.** Si $u\in D(G)$, la forme coordonnée étant continue, $(Gu)_n=\lim_{t\downarrow0}\frac{e^{-nt}-1}{t}u_n=-nu_n$. Comme $Gu\in H$, $\sum_nn^2|u_n|^2<\infty$ : $u\in D$ et $Gu=Au$.

**$D\subset D(G)$.** Pour $t>0$, l'inégalité $0\le1-e^{-x}\le x$, appliquée à $x=nt$, donne $0\le n-\frac{1-e^{-nt}}{t}\le n$. Pour $u\in D$, $\big\|\frac{S(t)u-u}{t}-Au\big\|^2=\sum_n\big(n-\frac{1-e^{-nt}}{t}\big)^2|u_n|^2$ : chaque terme tend vers $0$ et est majoré par $n^2|u_n|^2$, sommable. Par convergence dominée, la limite existe dans $H$ et vaut $Au$. Donc $D(G)=D$ et $G=A$.

**Assertion voisine.** Pour $u_n=1/n$, $u\in H$ ; si $u$ appartenait à $D(G)$, il appartiendrait à $D$, or $\sum_nn^2\cdot n^{-2}=+\infty$. Chaque coordonnée converge, vers $-1$, mais la limite coordonnée par coordonnée n'est pas dans $\ell^2$. Le domaine fait partie de la définition du générateur, et ici $D(G)\neq H$.`,
  steps: [
    'Vérifier les trois axiomes d’un $C_0$-semi-groupe et la contractivité.',
    t`Montrer $D(G)\subset D$ par continuité des formes coordonnées.`,
    t`Montrer $D\subset D(G)$ par une domination et la convergence dominée.`,
    t`Exhiber $u\in H\setminus D(G)$.`,
  ],
  commonErrors: [
    { id: 'e-coord', description: 'Confondre convergence coordonnée par coordonnée et convergence dans la norme de $\\ell^2$.', concept: 'hille-yosida-convergence-forte' },
    { id: 'e-domaine', description: 'Oublier que le domaine fait partie de la définition du générateur, et le prendre égal à l’espace entier.', concept: 'domaine-operateur' },
    { id: 'e-norme', description: t`Croire qu'un $C_0$-semi-groupe vérifie $\|S(t)-I\|\to0$.`, concept: 'hille-yosida-convergence-forte' },
  ],
  hints: [
    t`La définition du générateur demande une limite dans quelle topologie ? Que se passe-t-il pour chaque coordonnée, et que faut-il en plus ?`,
    t`Deux inclusions : si la limite existe, ses coordonnées sont déterminées ; réciproquement, il faut dominer $\big(n-\frac{1-e^{-nt}}t\big)^2|u_n|^2$ uniformément en $t$.`,
    t`$0\le1-e^{-x}\le x$ donne la domination par $n^2|u_n|^2$. Pour réfuter $D(G)=H$, essaie $u_n=1/n$.`,
  ],
  rubric: rubric({
    hypotheses: 'Les axiomes d’un $C_0$-semi-groupe sont vérifiés un à un.',
    methode: 'Le générateur est identifié par double inclusion des domaines.',
    validite: 'La convergence est établie dans la norme de $\\ell^2$, par domination.',
    justifications: 'Aucune convergence coordonnée par coordonnée n’est présentée comme une convergence en norme.',
    conclusion: t`$D(G)$ et $G$ sont identifiés, et $D(G)\neq H$ est démontré.`,
  }),
  variant: {
    statement: t`Sur $H=\ell^2(\mathbb N^*)$, soit $(S(t)u)_n=e^{-n^2t}u_n$. Montrer que $S$ est un $C_0$-semi-groupe de contractions et déterminer son générateur, domaine compris.`,
    solution: t`Comme dans l'exercice : $S(t)$ est diagonal de coefficients $e^{-n^2t}\in\,]0,1]$, $S(0)=I$, $S(t+s)=S(t)S(s)$, et la continuité forte vient de la convergence dominée. Si $u\in D(G)$, la continuité des formes coordonnées donne $(Gu)_n=-n^2u_n$, donc $\sum_nn^4|u_n|^2<\infty$. Réciproquement, $0\le n^2-\frac{1-e^{-n^2t}}{t}\le n^2$ et la convergence dominée donnent la limite dans $H$ dès que $\sum_nn^4|u_n|^2<\infty$. Donc $D(G)=\{u:\sum_nn^4|u_n|^2<\infty\}$ et $(Gu)_n=-n^2u_n$.`,
    closedChecks: [{ kind: 'rational', prompt: t`Pour $u=e_3$ : valeur de $(Gu)_3$`, expected: '-9' }],
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'hille-yosida.intermediaire',
  theoremId: 'hille-yosida',
  level: 'intermediaire',
  title: t`La borne $\|R(\lambda,A)\|\le1/\lambda$ pour un opérateur diagonal négatif`,
  statement: t`Soit $H=\ell^2(\mathbb N^*)$, $(a_n)_{n\ge1}\subset[0,+\infty[$, et $A$ l'opérateur diagonal négatif défini par $D(A)=\{u\in H:\sum_na_n^2|u_n|^2<\infty\}$, $(Au)_n=-a_nu_n$.

Vérifier que $A$ est fermé et densément défini, que $]0,+\infty[\subset\rho(A)$ avec $\|R(\lambda,A)\|\le1/\lambda$, et conclure par le théorème de Hille–Yosida. Calculer enfin $\int_0^\infty e^{-\lambda t}e^{-at}\,dt$ pour $\lambda>0$, $a\ge0$, et reconnaître $R(\lambda,A)$ comme la transformée de Laplace de la famille diagonale $(T(t)f)_n=e^{-a_nt}f_n$.`,
  source: poly(43, 'Exercice 28, intermédiaire (p. PDF 43) ; Hille–Yosida, cas contractif (p. PDF 26)'),
  prerequisites: [],
  concepts: ['hypotheses-theoreme', 'calcul-exact', 'domaine-operateur', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-suite', kind: 'hypothese', text: t`$(a_n)_{n\ge1}\subset[0,+\infty[$.` },
      { id: 'd-A', kind: 'definition', text: t`$H=\ell^2(\mathbb N^*)$, $D(A)=\{u\in H:\sum_na_n^2|u_n|^2<\infty\}$ et $(Au)_n=-a_nu_n$.` },
      { id: 's-lam', kind: 'definition', local: true, text: t`Soit $\lambda>0$.` },
      { id: 'd-R', kind: 'definition', local: true, text: t`Pour $f\in H$, on pose $R_\lambda f=\Big(\dfrac{f_n}{\lambda+a_n}\Big)_{n\ge1}$.` },

      { id: 'dense', kind: 'consequence', text: t`$D(A)$ est dense dans $H$.` },
      { id: 'ferme', kind: 'consequence', text: t`$A$ est fermé.` },
      { id: 'minor', kind: 'inegalite', text: t`$\lambda+a_n\ge\lambda>0$ pour tout $n$.` },
      { id: 'r-in', kind: 'consequence', text: t`Pour tout $f\in H$ : $R_\lambda f\in D(A)$.` },
      { id: 'r-bij', kind: 'consequence', text: t`$\lambda I-A:D(A)\to H$ est bijectif, d'inverse $R_\lambda$.` },
      { id: 'r-borne', kind: 'inegalite', text: t`Pour tout $f\in H$ : $\|R_\lambda f\|\le\|f\|/\lambda$.` },
      { id: 'rho', kind: 'consequence', text: t`$]0,+\infty[\,\subset\rho(A)$ et $\|R(\lambda,A)\|\le1/\lambda$ pour tout $\lambda>0$.` },
      { id: 'hy', kind: 'application-theoreme', text: t`$A$ engendre un $C_0$-semi-groupe de contractions sur $H$.` },
      {
        id: 'laplace',
        kind: 'egalite',
        text: t`Pour $\lambda>0$ et $a\ge0$ : $\int_0^\infty e^{-\lambda t}e^{-at}\,dt=\dfrac1{\lambda+a}$.`,
        masked: t`Valeur de l'intégrale $\int_0^\infty e^{-\lambda t}e^{-at}\,dt$ : à calculer.`,
        check: { kind: 'expr-equiv', prompt: t`Valeur de $\int_0^\infty e^{-lt}e^{-at}\,dt$, en fonction de $l=\lambda>0$ et de $a\ge0$`, expected: '1/(l+a)', vars: ['l', 'a'] },
      },
      { id: 'r-laplace', kind: 'egalite', text: t`Pour $f\in H$ : $R(\lambda,A)f=\int_0^\infty e^{-\lambda t}\,T(t)f\,dt$, où $(T(t)f)_n=e^{-a_nt}f_n$.` },
      { id: 'fin', kind: 'conclusion', text: t`$A$ est fermé, densément défini, et $\|R(\lambda,A)\|\le1/\lambda$ pour tout $\lambda>0$ : $A$ engendre un $C_0$-semi-groupe de contractions, et $R(\lambda,A)$ est la transformée de Laplace de $T$.` },

      { id: 'x-neumann', kind: 'egalite', distractor: true, after: ['r-bij'], text: t`Pour tout $\lambda>0$ : $R(\lambda,A)=\sum_{k\ge0}\lambda^{-k-1}A^k$.` },
      { id: 'x-egal', kind: 'egalite', distractor: true, after: ['rho'], text: t`Pour toute suite $(a_n)\subset[0,+\infty[$ et tout $\lambda>0$ : $\|R(\lambda,A)\|=1/\lambda$.` },
    ],
    justifications: [
      { id: 'j-dense', label: t`Les suites à support fini appartiennent à $D(A)$ et sont denses dans $\ell^2$.` },
      { id: 'j-ferme', label: t`Si $u^{(k)}\to u$ et $Au^{(k)}\to v$ dans $H$, alors, coordonnée par coordonnée, $v_n=-a_nu_n$ ; donc $\sum_na_n^2|u_n|^2=\|v\|^2<\infty$ et $Au=v$.` },
      { id: 'j-somme-pos', label: t`Somme du réel $\lambda>0$ et du réel $a_n\ge0$.` },
      { id: 'j-quotients', label: t`$\dfrac{1}{\lambda+a_n}\le\dfrac1\lambda$ et $\dfrac{a_n}{\lambda+a_n}\le1$ : les séries $\sum_n\frac{|f_n|^2}{(\lambda+a_n)^2}$ et $\sum_n\frac{a_n^2|f_n|^2}{(\lambda+a_n)^2}$ convergent.` },
      { id: 'j-bij', label: t`Coordonnée par coordonnée : $(\lambda+a_n)\dfrac{f_n}{\lambda+a_n}=f_n$, et $\dfrac{(\lambda+a_n)u_n}{\lambda+a_n}=u_n$ pour $u\in D(A)$.` },
      { id: 'j-borne', label: t`$\|R_\lambda f\|^2=\sum_n\dfrac{|f_n|^2}{(\lambda+a_n)^2}\le\dfrac{\|f\|^2}{\lambda^2}$.` },
      { id: 'j-rho', label: t`Définition de $\rho(A)$ pour l'opérateur fermé $A$ : bijection de $D(A)$ sur $H$ d'inverse borné ; $\lambda>0$ est arbitraire.` },
      { id: 'j-hy', label: 'Théorème de Hille–Yosida, cas contractif.', theorem: 'hille-yosida' },
      { id: 'j-integrale', label: t`Primitive de $e^{-(\lambda+a)t}$ sur $[0,+\infty[$, avec $\lambda+a>0$.` },
      { id: 'j-laplace-coord', label: t`Comme $a_n\ge0$, $t\mapsto e^{-\lambda t}T(t)f$ est continue (convergence dominée) et de norme au plus $e^{-\lambda t}\|f\|$ : l'intégrale converge dans $H$. Les formes coordonnées sont linéaires continues et commutent avec l'intégrale : la $n$-ième coordonnée de l'intégrale vaut $\dfrac{f_n}{\lambda+a_n}$.` },
      { id: 'j-syn', label: 'Réunion des propriétés établies.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-neumann', label: t`Série de Neumann : $\|(\lambda I-A)^{-1}\|\le\lambda^{-1}\sum_{k\ge0}(\|A\|/\lambda)^k$.`, theorem: 'serie-neumann' },
      { id: 'j-sup-atteint', label: t`La borne $1/\lambda$ est toujours atteinte, car $a_n\ge0$.` },
    ],
    rules: [
      { from: ['d-A'], to: 'dense', by: 'j-dense' },
      { from: ['d-A'], to: 'ferme', by: 'j-ferme' },
      { from: ['s-lam', 'h-suite'], to: 'minor', by: 'j-somme-pos' },
      { from: ['minor', 'd-R', 'd-A', 'h-suite'], to: 'r-in', by: 'j-quotients' },
      { from: ['r-in', 'minor', 'd-R', 'd-A'], to: 'r-bij', by: 'j-bij' },
      { from: ['minor', 'd-R'], to: 'r-borne', by: 'j-borne' },
      { from: ['r-bij', 'r-borne', 'ferme'], to: 'rho', by: 'j-rho' },
      { from: ['dense', 'ferme', 'rho'], to: 'hy', by: 'j-hy' },
      { from: [], to: 'laplace', by: 'j-integrale' },
      { from: ['laplace', 'r-bij', 'd-R', 'h-suite'], to: 'r-laplace', by: 'j-laplace-coord' },
      { from: ['ferme', 'dense', 'rho', 'hy', 'r-laplace'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-neumann',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`La série de Neumann suppose $A$ borné et $\|A\|<\lambda$ ; ici $A$ peut être non borné, et la série diverge dès que $a_n>\lambda$ pour un indice $n$.`,
        counterexample: t`$a_1=2$, $\lambda=1$ : sur $e_1$, la série vaut $\sum_k(-2)^k$, qui diverge, alors que $R(1,A)e_1=\frac13e_1$.`,
      },
      {
        conclusion: 'x-egal',
        verdict: 'incorrect',
        concept: 'calcul-exact',
        message: t`$1/\lambda$ n'est qu'un majorant : $\|R(\lambda,A)\|=\sup_n\frac1{\lambda+a_n}=\frac1{\lambda+\inf_na_n}$.`,
        counterexample: t`$a_n=1$ pour tout $n$ : $\|R(\lambda,A)\|=\frac1{\lambda+1}<\frac1\lambda$.`,
      },
      {
        conclusion: 'r-borne',
        by: 'j-neumann',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`$A$ n'est pas borné en général : $\|A\|$ n'a pas de sens, et la série de Neumann n'est pas disponible. La borne se lit directement sur les coefficients diagonaux.`,
        counterexample: t`$a_n=n$ : $\|Ae_n\|=n$ pour tout $n$, donc $A$ n'est pas borné.`,
      },
      {
        conclusion: 'rho',
        by: 'j-sup-atteint',
        verdict: 'incorrect',
        concept: 'calcul-exact',
        message: t`La borne $1/\lambda$ n'est atteinte que si $\inf_na_n=0$ ; ce n'est d'ailleurs pas ce qu'il faut montrer : seule l'inégalité compte.`,
        counterexample: t`$a_n=1$ pour tout $n$ : $\|R(\lambda,A)\|=\frac1{\lambda+1}$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-suite',
        label: t`Autoriser des coefficients $a_n<0$`,
        necessary: true,
        explanation: t`Si un coefficient diagonal $-a_n$ de $A$ est strictement positif, la minoration $\lambda+a_n\ge\lambda$ tombe : un $\lambda>0$ peut être valeur propre, et la borne $1/\lambda$ échoue.`,
        counterexample: t`$a_1=-1$ : pour $\lambda=1$, $(\lambda I-A)e_1=0$, donc $1\in\sigma(A)$ ; pour $\lambda=2$, $\|R(2,A)\|\ge\frac1{2-1}=1>\frac12$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Pour $a_n=n$ et $\lambda=2$ : valeur de $\|R(\lambda,A)\|$`, expected: '1/3' }],
  solution: t`**Densité et fermeture.** Les suites à support fini sont dans $D(A)$ et denses dans $\ell^2$. Si $u^{(k)}\to u$ et $Au^{(k)}\to v$ dans $H$, alors, coordonnée par coordonnée, $v_n=\lim_k(-a_nu^{(k)}_n)=-a_nu_n$ ; donc $\sum_na_n^2|u_n|^2=\|v\|^2<\infty$, $u\in D(A)$ et $Au=v$ : $A$ est fermé.

**Résolvante.** Soit $\lambda>0$. Comme $a_n\ge0$, $\lambda+a_n\ge\lambda>0$. On pose $R_\lambda f=\big(f_n/(\lambda+a_n)\big)_n$. Les majorations $\frac1{\lambda+a_n}\le\frac1\lambda$ et $\frac{a_n}{\lambda+a_n}\le1$ donnent $R_\lambda f\in H$ et $R_\lambda f\in D(A)$. Coordonnée par coordonnée, $(\lambda I-A)R_\lambda f=f$ et $R_\lambda(\lambda I-A)u=u$ pour $u\in D(A)$ : $\lambda I-A$ est une bijection de $D(A)$ sur $H$, d'inverse $R_\lambda$. Enfin $\|R_\lambda f\|^2=\sum_n\frac{|f_n|^2}{(\lambda+a_n)^2}\le\frac{\|f\|^2}{\lambda^2}$. Ainsi $]0,+\infty[\subset\rho(A)$ et $\|R(\lambda,A)\|\le1/\lambda$ ; plus précisément, $\|R(\lambda,A)\|=\frac1{\lambda+\inf_na_n}$.

**Conclusion.** $A$ est fermé, densément défini et vérifie la condition de résolvante : par Hille–Yosida, $A$ engendre un $C_0$-semi-groupe de contractions.

**Transformée de Laplace.** $\int_0^\infty e^{-(\lambda+a)t}\,dt=\frac1{\lambda+a}$. La famille $(T(t)f)_n=e^{-a_nt}f_n$ est continue de $[0,+\infty[$ dans $H$ (convergence dominée, comme dans l'exercice facile) et de norme au plus $\|f\|$ ; les formes coordonnées commutant avec l'intégrale, la $n$-ième coordonnée de $\int_0^\infty e^{-\lambda t}T(t)f\,dt$ vaut $\frac{f_n}{\lambda+a_n}$. On retrouve la formule du sens direct : $R(\lambda,A)f=\int_0^\infty e^{-\lambda t}T(t)f\,dt$.`,
  steps: [
    t`Établir la densité de $D(A)$ et la fermeture de $A$.`,
    t`Construire l'inverse de $\lambda I-A$ et vérifier qu'il envoie $H$ dans $D(A)$.`,
    t`Majorer $\|R(\lambda,A)\|$ par $1/\lambda$.`,
    'Invoquer Hille–Yosida, toutes hypothèses vérifiées.',
    'Relier la résolvante à la transformée de Laplace.',
  ],
  commonErrors: [
    { id: 'e-neumann', description: 'Utiliser une série de Neumann pour un opérateur non borné.', concept: 'hypotheses-theoreme' },
    { id: 'e-image', description: t`Oublier de vérifier que l'inverse envoie $H$ dans $D(A)$.`, concept: 'domaine-operateur' },
    { id: 'e-egal', description: t`Affirmer que la borne $1/\lambda$ est toujours atteinte.`, concept: 'calcul-exact' },
  ],
  hints: [
    t`Quelles sont les hypothèses du théorème de Hille–Yosida ? Pour un opérateur diagonal, l'inverse de $\lambda I-A$ se devine coordonnée par coordonnée.`,
    t`Écris $R_\lambda f=\big(f_n/(\lambda+a_n)\big)_n$ ; vérifie successivement $R_\lambda f\in H$, $R_\lambda f\in D(A)$, les deux identités d'inverse, puis la borne.`,
    t`Tout repose sur $\lambda+a_n\ge\lambda$ et $\frac{a_n}{\lambda+a_n}\le1$.`,
  ],
  rubric: rubric({
    hypotheses: 'Fermeture et densité sont démontrées avant l’application du théorème.',
    methode: 'L’inverse est construit explicitement, avec son image dans le domaine.',
    validite: 'La borne est obtenue sans série de Neumann.',
    justifications: t`Le signe $a_n\ge0$ est utilisé là où il intervient.`,
    conclusion: 'La génération d’un semi-groupe de contractions est obtenue.',
  }),
  variant: {
    statement: t`Soit $H=\ell^2(\mathbb N^*)$ complexe, $(a_n)\subset[0,+\infty[$, $(b_n)\subset\mathbb R$, et $A$ diagonal de coefficients $-a_n+\mathrm ib_n$, de domaine $\{u:\sum_n(a_n^2+b_n^2)|u_n|^2<\infty\}$. Montrer que $\|R(\lambda,A)\|\le1/\lambda$ pour tout $\lambda>0$, et calculer $\|R(3,A)\|$ lorsque $a_n=0$ et $b_n=4$ pour tout $n$.`,
    solution: t`$\lambda I-A$ est diagonal de coefficients $\lambda+a_n-\mathrm ib_n$, de module $\sqrt{(\lambda+a_n)^2+b_n^2}\ge\lambda+a_n\ge\lambda>0$. L'inverse est diagonal de coefficients $(\lambda+a_n-\mathrm ib_n)^{-1}$ ; il envoie $H$ dans $D(A)$, car $\frac{a_n^2+b_n^2}{(\lambda+a_n)^2+b_n^2}\le1$, et sa norme vaut $\sup_n|\lambda+a_n-\mathrm ib_n|^{-1}\le1/\lambda$. Pour $a_n=0$, $b_n=4$ et $\lambda=3$ : $|3-4\mathrm i|=5$, donc $\|R(3,A)\|=\frac15$.`,
    closedChecks: [{ kind: 'rational', prompt: t`Valeur de $\|R(3,A)\|$ pour $a_n=0$ et $b_n=4$`, expected: '1/5' }],
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'hille-yosida.difficile',
  theoremId: 'hille-yosida',
  level: 'difficile',
  title: 'Approximations de Yosida et construction du semi-groupe',
  statement: t`Soit $X$ un espace de Banach et $A:D(A)\subset X\to X$ fermé, densément défini, tel que $]0,+\infty[\subset\rho(A)$ et $\|R(\lambda,A)\|\le1/\lambda$ pour tout $\lambda>0$. Pour $n\ge1$, on pose $A_n=nAR(n,A)$.

Retrouver $A_n=n^2R(n,A)-nI$, en déduire $A_n\in\mathcal L(X)$ et $\|e^{tA_n}\|\le1$. Montrer que $A_nx\to Ax$ pour $x\in D(A)$, que $(e^{tA_n}x)_n$ converge pour tout $x\in X$, uniformément en $t$ sur les intervalles bornés, et que la limite $S(t)x$ définit un $C_0$-semi-groupe de contractions de générateur $A$. Expliquer pourquoi la convergence n'a pas lieu en général en norme d'opérateur, et pourquoi l'argument échoue si l'on sait seulement $\|R(\lambda,A)\|\le M/(\lambda-\omega)$ avec $M>1$.`,
  source: poly(43, 'Exercice 28, difficile (p. PDF 43) ; construction réciproque et point de vigilance (p. PDF 26–27)'),
  prerequisites: [],
  concepts: ['hille-yosida-puissances-resolvante', 'hille-yosida-convergence-forte', 'domaine-operateur', 'complet-necessaire', 'circularite', 'hypotheses-theoreme'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    paths: [
      { id: 'exponentielle', label: t`Injectivité de $I-B$ par la solution exponentielle` },
      { id: 'laplace', label: t`Injectivité de $I-B$ par la transformée de Laplace` },
    ],
    nodes: [
      { id: 'h-X', kind: 'hypothese', text: t`$X$ est un espace de Banach et $A:D(A)\subset X\to X$ est linéaire et fermé.` },
      { id: 'h-dense', kind: 'hypothese', text: t`$D(A)$ est dense dans $X$.` },
      { id: 'h-res', kind: 'hypothese', text: t`$]0,+\infty[\,\subset\rho(A)$ et $\|R(\lambda,A)\|\le1/\lambda$ pour tout $\lambda>0$.` },
      { id: 'd-An', kind: 'definition', text: t`Pour $n\ge1$ : $A_n=nA\,R(n,A)$, défini sur $X$ puisque $R(n,A)$ envoie $X$ dans $D(A)$.` },

      {
        id: 'a-expr',
        kind: 'egalite',
        text: t`$A_n=n^2R(n,A)-nI$ ; en particulier $A_n\in\mathcal L(X)$.`,
        masked: t`Expression de $A_n$ à l'aide de $R(n,A)$ : à établir.`,
        check: { kind: 'expr-equiv', prompt: t`Cas scalaire $X=\mathbb R$, $A=a$ avec $a<0$ : valeur de $A_n$ en fonction de $n$ et $a$`, expected: 'n*a/(n-a)', vars: ['n', 'a'] },
      },
      { id: 'a-comm', kind: 'egalite', text: t`Pour tous $n,m\ge1$ : $A_nA_m=A_mA_n$.` },
      { id: 'a-contr', kind: 'inegalite', text: t`Pour tous $t\ge0$ et $n\ge1$ : $\|e^{tA_n}\|\le1$.` },
      { id: 'r-dom', kind: 'inegalite', text: t`Pour $x\in D(A)$ : $\|nR(n,A)x-x\|\le\|Ax\|/n$.` },
      { id: 'r-fort', kind: 'consequence', text: t`Pour tout $x\in X$ : $nR(n,A)x\to x$ quand $n\to\infty$.` },
      { id: 'y-cv', kind: 'consequence', text: t`Pour $x\in D(A)$ : $A_nx\to Ax$ dans $X$.` },
      { id: 'c-diff', kind: 'egalite', text: t`Pour $x\in X$ et $t\ge0$ : $e^{tA_n}x-e^{tA_m}x=\int_0^te^{(t-s)A_m}e^{sA_n}(A_n-A_m)x\,ds$.` },
      { id: 'c-maj', kind: 'inegalite', text: t`Pour $x\in D(A)$ et $t\ge0$ : $\|e^{tA_n}x-e^{tA_m}x\|\le t\,\|A_nx-A_mx\|$.` },
      { id: 'c-cauchy', kind: 'consequence', text: t`Pour tout $x\in X$ et tout $T>0$, la suite $(e^{tA_n}x)_n$ est de Cauchy, uniformément en $t\in[0,T]$.` },
      { id: 's-lim', kind: 'consequence', text: t`Pour tout $x\in X$, $S(t)x:=\lim_ne^{tA_n}x$ existe, uniformément en $t\in[0,T]$ pour tout $T>0$.` },
      { id: 's-prop', kind: 'consequence', text: t`$S(t)\in\mathcal L(X)$, $\|S(t)\|\le1$, $S(0)=I$, $S(t+s)=S(t)S(s)$, et $t\mapsto S(t)x$ est continue : $S$ est un $C_0$-semi-groupe de contractions.` },
      { id: 'g-int', kind: 'egalite', text: t`Pour $x\in D(A)$ et $t\ge0$ : $S(t)x-x=\int_0^tS(s)Ax\,ds$.` },
      { id: 'g-ext', kind: 'inclusion', text: t`Le générateur $B$ de $S$ prolonge $A$ : $D(A)\subset D(B)$ et $Bx=Ax$ pour $x\in D(A)$.` },
      { id: 'g-inj', kind: 'consequence', text: t`$I-B$ est injectif sur $D(B)$.` },
      { id: 'g-eg', kind: 'egalite', text: t`$B=A$, domaines inclus.` },
      { id: 'fin', kind: 'conclusion', text: t`$e^{tA_n}x\to S(t)x$ pour tout $x\in X$, uniformément sur les intervalles bornés en temps, et $S$ est un $C_0$-semi-groupe de contractions de générateur $A$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-norme', kind: 'consequence', distractor: true, after: ['s-lim'], text: t`Pour tout $t>0$ : $\|e^{tA_n}-S(t)\|\to0$ quand $n\to\infty$.` },
      { id: 'x-partout', kind: 'consequence', distractor: true, after: ['y-cv'], text: t`Pour tout $x\in X$, la suite $(A_nx)_n$ converge dans $X$.` },
      { id: 'x-Mgen', kind: 'inegalite', distractor: true, after: ['a-contr'], text: t`Si l'on sait seulement $\|R(\lambda,A)\|\le M/(\lambda-\omega)$ pour $\lambda>\omega$, avec $M>1$, la même construction donne $\|S(t)\|\le Me^{\omega t}$.` },
    ],
    justifications: [
      { id: 'j-res', label: t`$(nI-A)R(n,A)=I$ sur $X$, donc $AR(n,A)=nR(n,A)-I$.` },
      { id: 'j-comm', label: t`L'identité de la résolvante montre que $R(n,A)$ et $R(m,A)$ commutent ; $A_n$ et $A_m$ sont des polynômes en ces opérateurs.` },
      { id: 'j-exp', label: t`$e^{tA_n}=e^{-nt}e^{tn^2R(n,A)}$, car $-nI$ commute avec tout opérateur, et $\|e^{tn^2R(n,A)}\|\le e^{tn^2\|R(n,A)\|}\le e^{nt}$.` },
      { id: 'j-rdom', label: t`Pour $x\in D(A)$ : $nR(n,A)x-x=R(n,A)Ax$, et $\|R(n,A)\|\le1/n$.` },
      { id: 'j-eps3', label: t`Approcher $x$ par $y\in D(A)$, utiliser $\|nR(n,A)\|\le1$, et découper en trois termes.` },
      { id: 'j-yosida', label: t`Pour $x\in D(A)$ : $A_nx=nR(n,A)Ax$ ; appliquer la convergence précédente à $Ax$.` },
      { id: 'j-derivee', label: t`Dériver $s\mapsto e^{(t-s)A_m}e^{sA_n}x$ sur $[0,t]$, grâce à la commutation de $A_n$ et $A_m$, puis intégrer.`, theorem: 'theoreme-fondamental' },
      { id: 'j-int-maj', label: t`Majoration de la norme de l'intégrale, les deux exponentielles étant de norme au plus $1$.` },
      { id: 'j-cauchy', label: t`Sur $D(A)$ : $(A_nx)_n$ converge, donc est de Cauchy, et $t\le T$. Sur $X$ : densité de $D(A)$ et contractivité des $e^{tA_n}$.` },
      { id: 'j-complet', label: t`$X$ est complet : une suite uniformément de Cauchy converge uniformément.` },
      { id: 'j-limite', label: t`Passage à la limite dans $\|e^{tA_n}x\|\le\|x\|$ et dans $e^{(t+s)A_n}=e^{tA_n}e^{sA_n}$, avec des bornes uniformes ; limite uniforme de fonctions continues.` },
      { id: 'j-fond', label: t`Limite uniforme sur $[0,t]$ dans $e^{tA_n}x-x=\int_0^te^{sA_n}A_nx\,ds$, car $\|e^{sA_n}A_nx-S(s)Ax\|\le\|A_nx-Ax\|+\|(e^{sA_n}-S(s))Ax\|$.`, theorem: 'theoreme-fondamental' },
      { id: 'j-gen', label: t`Diviser par $t$ : $\frac1t\int_0^tS(s)Ax\,ds\to Ax$ quand $t\downarrow0$, par continuité de $s\mapsto S(s)Ax$.` },
      { id: 'j-inj-exp', label: t`Si $x\in D(B)$ et $Bx=x$, alors $\frac{d}{dt}S(t)x=S(t)Bx=S(t)x$, donc $S(t)x=e^tx$ ; or $\|S(t)x\|\le\|x\|$, d'où $x=0$.` },
      { id: 'j-inj-laplace', label: t`Pour $x\in D(B)$ : $\int_0^\infty e^{-t}S(t)(x-Bx)\,dt=x$, en intégrant $\frac{d}{dt}\big(e^{-t}S(t)x\big)=e^{-t}S(t)(Bx-x)$.` },
      { id: 'j-identif', label: t`$I-A$ est surjectif car $1\in\rho(A)$ ; pour $x\in D(B)$, $y=R(1,A)(I-B)x$ vérifie $(I-B)y=(I-A)y=(I-B)x$, donc $y=x$.` },
      { id: 'j-syn', label: 'Réunion des propriétés établies.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-borne-grossiere', label: t`$\|e^{tA_n}\|\le e^{t\|A_n\|}$, et $\|A_n\|\le2n$.` },
      { id: 'j-resolv-norme', label: t`$nR(n,A)\to I$ en norme d'opérateur.` },
      { id: 'j-hy', label: 'Théorème de Hille–Yosida.', theorem: 'hille-yosida' },
    ],
    rules: [
      { from: ['d-An', 'h-res'], to: 'a-expr', by: 'j-res' },
      { from: ['a-expr', 'h-res'], to: 'a-comm', by: 'j-comm' },
      { from: ['a-expr', 'h-res'], to: 'a-contr', by: 'j-exp' },
      { from: ['h-res'], to: 'r-dom', by: 'j-rdom' },
      { from: ['r-dom', 'h-dense', 'h-res'], to: 'r-fort', by: 'j-eps3' },
      { from: ['r-fort', 'd-An'], to: 'y-cv', by: 'j-yosida' },
      { from: ['a-comm', 'a-expr'], to: 'c-diff', by: 'j-derivee' },
      { from: ['c-diff', 'a-contr'], to: 'c-maj', by: 'j-int-maj' },
      { from: ['c-maj', 'y-cv', 'a-contr', 'h-dense'], to: 'c-cauchy', by: 'j-cauchy' },
      { from: ['c-cauchy', 'h-X'], to: 's-lim', by: 'j-complet' },
      { from: ['s-lim', 'a-contr'], to: 's-prop', by: 'j-limite' },
      { from: ['s-lim', 'y-cv', 'a-contr'], to: 'g-int', by: 'j-fond' },
      { from: ['g-int', 's-prop'], to: 'g-ext', by: 'j-gen' },
      { from: ['s-prop'], to: 'g-inj', by: 'j-inj-exp', path: 'exponentielle' },
      { from: ['s-prop'], to: 'g-inj', by: 'j-inj-laplace', path: 'laplace' },
      { from: ['g-ext', 'g-inj', 'h-res'], to: 'g-eg', by: 'j-identif' },
      { from: ['s-lim', 's-prop', 'g-eg'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-norme',
        verdict: 'incorrect',
        concept: 'hille-yosida-convergence-forte',
        message: t`La construction donne une convergence pour chaque $x$ fixé, uniforme en temps sur les intervalles bornés ; la convergence en norme d'opérateur est fausse en général.`,
        counterexample: t`$X=\ell^2(\mathbb N^*)$ complexe, $A=\mathrm{diag}(\mathrm ik)$ : $A_n$ a pour coefficients $\frac{\mathrm ikn}{n-\mathrm ik}$, de partie réelle $-\frac{k^2n}{n^2+k^2}$, tandis que $S(t)=\mathrm{diag}(e^{\mathrm ikt})$ est unitaire. Donc $\|e^{tA_n}-S(t)\|\ge\sup_k\big(1-e^{-tk^2n/(n^2+k^2)}\big)=1-e^{-nt}$, qui ne tend pas vers $0$.`,
      },
      {
        conclusion: 'x-partout',
        verdict: 'incorrect',
        concept: 'domaine-operateur',
        message: t`La convergence $A_nx\to Ax$ n'est établie que pour $x\in D(A)$ ; hors du domaine, $(A_nx)_n$ peut diverger.`,
        counterexample: t`$X=\ell^2(\mathbb N^*)$, $A=\mathrm{diag}(-k)$, $x_k=1/k$ : $(A_nx)_k=-\frac n{n+k}$, donc $\|A_nx\|^2\ge\sum_{k\le n}\frac14=\frac n4\to+\infty$.`,
      },
      {
        conclusion: 'x-Mgen',
        verdict: 'incorrect',
        concept: 'hille-yosida-puissances-resolvante',
        message: t`Avec la seule borne en première puissance, $\|e^{tA_n}\|\le\exp\big(t(\frac{n^2M}{n-\omega}-n)\big)$, qui explose quand $n\to\infty$ si $M>1$. Il faut borner toutes les puissances : $\|R(\lambda,A)^k\|\le M/(\lambda-\omega)^k$ donne $\|e^{tA_n}\|\le M\exp\big(\frac{tn\omega}{n-\omega}\big)$.`,
        counterexample: t`$A=\begin{pmatrix}0&3\\-1/3&0\end{pmatrix}$ sur $\mathbb R^2$ euclidien : $\|R(\lambda,A)\|\le\frac{\lambda+3}{\lambda^2+1}\le\frac{5/2}{\lambda}$ pour tout $\lambda>0$, mais $e^{tA}=\cos t\,I+\sin t\,A$, donc $\|e^{(\pi/2)A}\|=\|A\|=3>\frac52$.`,
      },
      {
        conclusion: 'a-contr',
        by: 'j-borne-grossiere',
        verdict: 'incorrect',
        concept: 'hille-yosida-puissances-resolvante',
        message: t`Cette majoration donne seulement $\|e^{tA_n}\|\le e^{2nt}$, qui n'est pas uniforme en $n$ : il faut séparer $-nI$ et $n^2R(n,A)$ pour faire jouer $\|R(n,A)\|\le1/n$.`,
      },
      {
        conclusion: 'r-fort',
        by: 'j-resolv-norme',
        verdict: 'incorrect',
        concept: 'hille-yosida-convergence-forte',
        message: t`La convergence $nR(n,A)\to I$ n'a lieu que point par point ; en norme, elle forcerait $A$ à être borné.`,
        counterexample: t`$A=\mathrm{diag}(-k)$ sur $\ell^2$ : $nR(n,A)=\mathrm{diag}\big(\frac n{n+k}\big)$ et $\|nR(n,A)-I\|=\sup_k\frac k{n+k}=1$ pour tout $n$.`,
      },
      {
        conclusion: 'fin',
        by: 'j-hy',
        verdict: 'incorrect',
        concept: 'circularite',
        message: t`Cette construction démontre précisément le sens réciproque du théorème de Hille–Yosida : l'invoquer ici serait circulaire.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-dense',
        label: t`Retirer la densité de $D(A)$`,
        necessary: true,
        explanation: t`Sans densité, $nR(n,A)x\to x$ peut échouer hors de l'adhérence de $D(A)$ : la construction s'arrête, et $A$ ne peut pas être un générateur, le domaine d'un générateur étant toujours dense.`,
        counterexample: t`$X=C([0,1])$, $Au=-u'$, $D(A)=\{u\in C^1([0,1]):u(0)=0\}$ : $R(\lambda,A)f(x)=\int_0^xe^{-\lambda(x-s)}f(s)\,ds$ vérifie $\|R(\lambda,A)\|\le1/\lambda$, mais $nR(n,A)\mathbb 1=1-e^{-nx}$ s'annule en $0$, donc $\|nR(n,A)\mathbb 1-\mathbb 1\|_\infty=1$.`,
      },
      {
        hypothesis: 'h-res',
        label: t`Retirer la borne $\|R(\lambda,A)\|\le1/\lambda$`,
        necessary: true,
        explanation: t`Sans la borne, rien n'assure que les $e^{tA_n}$ soient uniformément bornées, et la contractivité de la limite peut tomber.`,
        counterexample: t`$A=\begin{pmatrix}0&3\\-1/3&0\end{pmatrix}$ sur $\mathbb R^2$ : $]0,+\infty[\subset\rho(A)$, mais $\|e^{(\pi/2)A}\|=3>1$ ; conformément au théorème, $\|R(\lambda,A)\|>1/\lambda$ pour certains $\lambda>0$, par exemple $\|R(1,A)\|\ge\frac{\sqrt{10}}2$.`,
      },
    ],
  },
  solution: t`**Approximations de Yosida.** Comme $(nI-A)R(n,A)=I$ sur $X$, on a $AR(n,A)=nR(n,A)-I$, d'où $A_n=nAR(n,A)=n^2R(n,A)-nI\in\mathcal L(X)$. Les résolvantes $R(n,A)$ et $R(m,A)$ commutent (identité de la résolvante), donc $A_n$ et $A_m$ aussi. Comme $-nI$ commute avec $n^2R(n,A)$, $e^{tA_n}=e^{-nt}e^{tn^2R(n,A)}$, et $\|e^{tA_n}\|\le e^{-nt}e^{tn^2\|R(n,A)\|}\le e^{-nt}e^{nt}=1$.

**Convergence de $A_nx$.** Pour $x\in D(A)$, $nR(n,A)x-x=R(n,A)Ax$, donc $\|nR(n,A)x-x\|\le\|Ax\|/n\to0$. Pour $x\in X$ et $\varepsilon>0$, on choisit $y\in D(A)$ avec $\|x-y\|\le\varepsilon$ ; comme $\|nR(n,A)\|\le1$, $\|nR(n,A)x-x\|\le2\varepsilon+\|Ay\|/n$. Donc $nR(n,A)x\to x$ pour tout $x\in X$, et pour $x\in D(A)$, $A_nx=nR(n,A)Ax\to Ax$.

**Estimation de Cauchy.** Pour $x\in X$, la dérivée de $s\mapsto e^{(t-s)A_m}e^{sA_n}x$ vaut $e^{(t-s)A_m}e^{sA_n}(A_n-A_m)x$, par commutation ; en intégrant sur $[0,t]$, $e^{tA_n}x-e^{tA_m}x=\int_0^te^{(t-s)A_m}e^{sA_n}(A_n-A_m)x\,ds$, d'où $\|e^{tA_n}x-e^{tA_m}x\|\le t\|A_nx-A_mx\|$. Pour $x\in D(A)$, la suite $(A_nx)$ converge : $(e^{tA_n}x)_n$ est de Cauchy uniformément sur $[0,T]$. Pour $x\in X$ et $y\in D(A)$ : $\|e^{tA_n}x-e^{tA_m}x\|\le2\|x-y\|+T\|A_ny-A_my\|$. $X$ étant complet, $S(t)x=\lim_ne^{tA_n}x$ existe, uniformément sur $[0,T]$.

**Le semi-groupe limite.** $S(t)$ est linéaire, $\|S(t)x\|\le\|x\|$ et $S(0)=I$. De $e^{(t+s)A_n}x=e^{tA_n}e^{sA_n}x$ et $\|e^{tA_n}e^{sA_n}x-S(t)S(s)x\|\le\|e^{sA_n}x-S(s)x\|+\|(e^{tA_n}-S(t))S(s)x\|$, on tire $S(t+s)=S(t)S(s)$. Limite uniforme de fonctions continues, $t\mapsto S(t)x$ est continue : $S$ est un $C_0$-semi-groupe de contractions.

**Générateur.** Pour $x\in D(A)$, $e^{tA_n}x-x=\int_0^te^{sA_n}A_nx\,ds$, et $\|e^{sA_n}A_nx-S(s)Ax\|\le\|A_nx-Ax\|+\|(e^{sA_n}-S(s))Ax\|\to0$ uniformément sur $[0,t]$ ; donc $S(t)x-x=\int_0^tS(s)Ax\,ds$. En divisant par $t$ et en faisant $t\downarrow0$, on obtient $x\in D(B)$ et $Bx=Ax$, où $B$ est le générateur de $S$. Si $x\in D(B)$ vérifie $Bx=x$, alors $\frac{d}{dt}S(t)x=S(t)Bx=S(t)x$, donc $S(t)x=e^tx$, et $\|S(t)x\|\le\|x\|$ impose $x=0$ : $I-B$ est injectif. Pour $x\in D(B)$, posons $y=R(1,A)(I-B)x\in D(A)$ ; alors $(I-B)y=(I-A)y=(I-B)x$, donc $x=y\in D(A)$ : $B=A$.

**Pourquoi la convergence est forte.** Pour $A=\mathrm{diag}(\mathrm ik)$ sur $\ell^2$, $\|e^{tA_n}-S(t)\|\ge1-e^{-nt}$ : il n'y a pas convergence en norme d'opérateur.

**Cas $M>1$.** Si l'on sait seulement $\|R(\lambda,A)\|\le M/(\lambda-\omega)$, la même majoration donne $\|e^{tA_n}\|\le\exp\big(t(\frac{n^2M}{n-\omega}-n)\big)$, qui explose quand $n\to\infty$ si $M>1$. Les bornes $\|R(\lambda,A)^k\|\le M/(\lambda-\omega)^k$ pour tout $k$ donnent au contraire $\|e^{tA_n}\|\le M\exp\big(\frac{tn\omega}{n-\omega}\big)$. La borne en première puissance ne suffit pas en général, comme le montre la matrice $\begin{pmatrix}0&3\\-1/3&0\end{pmatrix}$, pour laquelle $\|R(\lambda,A)\|\le\frac{5/2}\lambda$ et $\|e^{(\pi/2)A}\|=3$.`,
  steps: [
    t`Établir $A_n=n^2R(n,A)-nI$, la commutation et $\|e^{tA_n}\|\le1$.`,
    t`Montrer $nR(n,A)x\to x$ sur $X$, puis $A_nx\to Ax$ sur $D(A)$.`,
    t`Obtenir l'estimation de Cauchy et la convergence uniforme en temps.`,
    t`Vérifier que la limite est un $C_0$-semi-groupe de contractions.`,
    t`Identifier le générateur : prolongement de $A$, puis égalité par injectivité de $I-B$.`,
  ],
  commonErrors: [
    { id: 'e-borne-grossiere', description: t`Majorer $\|e^{tA_n}\|$ par $e^{t\|A_n\|}$, borne non uniforme en $n$.`, concept: 'hille-yosida-puissances-resolvante' },
    { id: 'e-norme', description: t`Affirmer la convergence de $e^{tA_n}$ en norme d'opérateur.`, concept: 'hille-yosida-convergence-forte' },
    { id: 'e-domaine', description: t`Écrire $A_nx\to Ax$ pour tout $x\in X$.`, concept: 'domaine-operateur' },
    { id: 'e-M', description: t`Croire que $\|R(\lambda,A)\|\le M/(\lambda-\omega)$ suffit lorsque $M>1$.`, concept: 'hille-yosida-puissances-resolvante' },
  ],
  hints: [
    t`Que vaut $AR(n,A)$ ? Pour borner $e^{tA_n}$ indépendamment de $n$, il faut tirer parti de la structure de $A_n$, et non de sa seule norme.`,
    t`Trois étapes : (i) $nR(n,A)\to I$ point par point, d'abord sur $D(A)$ ; (ii) une formule intégrale pour $e^{tA_n}-e^{tA_m}$, grâce à la commutation ; (iii) identification du générateur de la limite.`,
    t`$e^{tA_n}=e^{-nt}e^{tn^2R(n,A)}$. Pour l'identification : le générateur $B$ prolonge $A$, $I-A$ est surjectif, et $I-B$ est injectif car $Bx=x$ impose $S(t)x=e^tx$.`,
  ],
  rubric: rubric({
    hypotheses: 'Densité de $D(A)$, complétude de $X$ et borne de la résolvante sont utilisées aux bons endroits.',
    methode: 'La construction de Yosida est menée jusqu’à l’identification du générateur.',
    validite: 'Les convergences sont fortes et uniformes en temps, jamais en norme d’opérateur.',
    justifications: 'La commutation des $A_n$ est justifiée avant d’être utilisée.',
    conclusion: 'Le semi-groupe limite est contractif, de générateur $A$ ; le rôle de $M>1$ est expliqué.',
  }),
  variant: {
    statement: t`Sur $H=\ell^2(\mathbb N^*)$, soit $A$ diagonal de coefficients $-k$, $D(A)=\{u\in H:\sum_kk^2|u_k|^2<\infty\}$, de sorte que $(R(n,A)f)_k=f_k/(n+k)$. Calculer les coefficients de $A_n=nAR(n,A)$, montrer que $\|e^{tA_n}\|\le1$, que $\|A_n\|=n$, et que $A_nx\to Ax$ pour tout $x\in D(A)$, bien que $(A_n)$ ne soit pas de Cauchy en norme d'opérateur.`,
    solution: t`$A_n$ est diagonal de coefficients $\frac{n^2}{n+k}-n=-\frac{nk}{n+k}$. Ces coefficients sont négatifs, donc $e^{tA_n}$ est diagonal de coefficients $e^{-tnk/(n+k)}\in\,]0,1]$, et $\|e^{tA_n}\|\le1$. La suite $k\mapsto\frac{nk}{n+k}$ croît vers $n$, d'où $\|A_n\|=n$ : $(A_n)$ n'est pas bornée en norme, donc pas de Cauchy. Pour $x\in D(A)$, $(A_nx-Ax)_k=\big(k-\frac{nk}{n+k}\big)x_k=\frac{k^2}{n+k}x_k$, de module au plus $k|x_k|$ et tendant vers $0$ ; comme $\sum_kk^2|x_k|^2<\infty$, la convergence dominée donne $\|A_nx-Ax\|\to0$.`,
    closedChecks: [{ kind: 'rational', prompt: t`Valeur de $\|A_n\|$ pour $n=3$`, expected: '3' }],
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'd-A', kind: 'definition', text: t`$H=\ell^2(\mathbb N^*)$, $D(A)=\{u\in H:\sum_kk^2|u_k|^2<\infty\}$ et $(Au)_k=-ku_k$.` },
        { id: 'h-res', kind: 'hypothese', text: t`Pour $n\ge1$ et $f\in H$ : $(R(n,A)f)_k=\dfrac{f_k}{n+k}$.` },
        { id: 'd-An', kind: 'definition', text: t`$A_n=nAR(n,A)=n^2R(n,A)-nI$.` },
        { id: 's-x', kind: 'definition', local: true, text: t`Soit $x\in D(A)$.` },

        {
          id: 'coef',
          kind: 'egalite',
          text: t`$A_n$ est diagonal de coefficients $-\dfrac{nk}{n+k}$.`,
          masked: t`Coefficients diagonaux de $A_n$ : à calculer.`,
          check: { kind: 'expr-equiv', prompt: t`Coefficient diagonal d'indice $k$ de $A_n$, en fonction de $n$ et $k$`, expected: '-n*k/(n+k)', vars: ['n', 'k'] },
        },
        { id: 'contr', kind: 'inegalite', text: t`$\|e^{tA_n}\|\le1$ pour tout $t\ge0$.` },
        { id: 'norme', kind: 'egalite', text: t`$\|A_n\|=n$.` },
        { id: 'diff', kind: 'egalite', text: t`Pour tout $k$ : $(A_nx-Ax)_k=\dfrac{k^2}{n+k}\,x_k$.` },
        { id: 'cv', kind: 'consequence', text: t`$A_nx\to Ax$ dans $H$ quand $n\to\infty$.` },
        { id: 'pas-cauchy', kind: 'consequence', text: t`$(A_n)_n$ n'est pas de Cauchy en norme d'opérateur.` },
        { id: 'fin', kind: 'conclusion', text: t`$A_n$ est explicite, $\|e^{tA_n}\|\le1$ et $A_nx\to Ax$ sur $D(A)$, sans convergence en norme d'opérateur.` },

        { id: 'x-unif', kind: 'consequence', distractor: true, after: ['diff'], text: t`$\sup_k\dfrac{k^2}{n+k}\to0$ quand $n\to\infty$.` },
      ],
      justifications: [
        { id: 'j-coef', label: t`Réduction au même dénominateur de $\dfrac{n^2}{n+k}-n$.` },
        { id: 'j-neg', label: t`Les coefficients sont négatifs : $e^{tA_n}$ est diagonal, de coefficients $e^{-tnk/(n+k)}\in\,]0,1]$.` },
        { id: 'j-sup', label: t`$k\mapsto\dfrac{nk}{n+k}$ est croissante et tend vers $n$.` },
        { id: 'j-calc', label: t`$k-\dfrac{nk}{n+k}=\dfrac{k^2}{n+k}$.` },
        { id: 'j-dominee', label: t`Convergence dominée pour les séries : $\Big|\dfrac{k^2}{n+k}x_k\Big|\le k|x_k|$, de carré sommable, et chaque terme tend vers $0$.`, theorem: 'convergence-dominee' },
        { id: 'j-non-borne', label: 'Une suite de Cauchy d’opérateurs bornés est bornée en norme.' },
        { id: 'j-syn', label: 'Réunion des propriétés établies.' },
        { id: 'j-coord-unif', label: t`Chaque coefficient $\frac{k^2}{n+k}$ tend vers $0$, donc leur supremum aussi.` },
      ],
      rules: [
        { from: ['d-An', 'h-res', 'd-A'], to: 'coef', by: 'j-coef' },
        { from: ['coef'], to: 'contr', by: 'j-neg' },
        { from: ['coef'], to: 'norme', by: 'j-sup' },
        { from: ['coef', 'd-A', 's-x'], to: 'diff', by: 'j-calc' },
        { from: ['diff', 's-x', 'd-A'], to: 'cv', by: 'j-dominee' },
        { from: ['norme'], to: 'pas-cauchy', by: 'j-non-borne' },
        { from: ['coef', 'contr', 'cv', 'pas-cauchy'], to: 'fin', by: 'j-syn' },
      ],
      traps: [
        {
          conclusion: 'x-unif',
          verdict: 'incorrect',
          concept: 'hille-yosida-convergence-forte',
          message: t`La convergence de chaque coefficient n'est pas uniforme en $k$ : pour $n$ fixé, $\frac{k^2}{n+k}\to+\infty$ quand $k\to\infty$.`,
          counterexample: t`Pour $k=n^2$ : $\frac{k^2}{n+k}=\frac{n^3}{1+n}\ge\frac{n^2}2$.`,
        },
        {
          conclusion: 'cv',
          by: 'j-coord-unif',
          verdict: 'incorrect',
          concept: 'hille-yosida-convergence-forte',
          message: t`La convergence de chaque coefficient n'entraîne pas celle du supremum ; c'est la domination par $k|x_k|$, valable pour $x\in D(A)$, qui permet de conclure.`,
          counterexample: t`Pour $k=n^2$, le coefficient vaut $\frac{n^3}{1+n}$, qui tend vers $+\infty$.`,
        },
      ],
      removable: [
        {
          hypothesis: 's-x',
          label: t`Prendre $x\notin D(A)$`,
          necessary: true,
          explanation: t`La domination par $k|x_k|$ exige $\sum_kk^2|x_k|^2<\infty$ ; hors de $D(A)$, $(A_nx)$ peut diverger.`,
          counterexample: t`$x_k=1/k$ : $(A_nx)_k=-\frac n{n+k}$ et $\|A_nx\|^2\ge\frac n4\to+\infty$.`,
        },
      ],
    },
  },
  verification: { ...COMPLEMENT, notes: 'Plan de la construction de Yosida repris du polycopié (p. PDF 26) ; toutes les estimations sont détaillées ici.' },
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT28: TheoremModule = {
  theorem: {
    id: 'hille-yosida',
    spaces: [
      t`$X$ : espace de Banach réel ou complexe ; $\mathcal L(X)$ : opérateurs bornés sur $X$.`,
      t`$A:D(A)\subset X\to X$ : opérateur linéaire fermé, densément défini.`,
      t`$\rho(A)$ : ensemble des $\lambda$ tels que $\lambda I-A:D(A)\to X$ soit bijectif d'inverse borné ; $R(\lambda,A)=(\lambda I-A)^{-1}$.`,
      t`$(S(t))_{t\ge0}\subset\mathcal L(X)$ : $C_0$-semi-groupe, de contractions lorsque $\|S(t)\|\le1$ pour tout $t\ge0$.`,
    ],
    hypotheses: [
      {
        id: 'h-banach',
        text: t`$X$ est un espace de Banach.`,
        whenRemoved: t`Rôle dans la démonstration : la limite $S(t)x=\lim_ne^{tA_n}x$ est obtenue par le critère de Cauchy, qui repose sur la complétude de $X$.`,
      },
      {
        id: 'h-ferme',
        text: t`$A$ est fermé.`,
        whenRemoved: t`Tout générateur est fermé ; et si $\rho(A)\neq\emptyset$, $A$ est automatiquement fermé, car pour $\lambda\in\rho(A)$, $\lambda I-A$ est l'inverse d'un opérateur borné partout défini.`,
      },
      {
        id: 'h-dense',
        text: t`$D(A)$ est dense dans $X$.`,
        whenRemoved: t`Sur $X=C([0,1])$, $Au=-u'$ de domaine $\{u\in C^1([0,1]):u(0)=0\}$ vérifie $\|R(\lambda,A)\|\le1/\lambda$ pour tout $\lambda>0$, mais $D(A)$ n'est pas dense : $A$ n'engendre aucun $C_0$-semi-groupe.`,
      },
    ],
    statement: t`Un opérateur $A:D(A)\subset X\to X$ fermé et densément défini sur un Banach engendre un $C_0$-semi-groupe de contractions si et seulement si
$$]0,\infty[\,\subset\rho(A),\qquad\|R(\lambda,A)\|\le\frac1\lambda\quad\forall\lambda>0.$$`,
    conclusions: {
      existence: t`Sens réciproque : sous la condition de résolvante, il existe un $C_0$-semi-groupe de contractions de générateur $A$, limite forte des $e^{tA_n}$.`,
      autre: t`Sens direct : pour un semi-groupe de contractions de générateur $A$, $R(\lambda,A)x=\int_0^\infty e^{-\lambda t}S(t)x\,dt$ et $\|R(\lambda,A)\|\le1/\lambda$.`,
    },
    sourceProof: 'idee',
    proofOutline: [
      t`Sens direct (polycopié) : pour $\lambda>0$, $R_\lambda x=\int_0^\infty e^{-\lambda t}S(t)x\,dt$ converge dans $X$, de norme au plus $\|x\|/\lambda$.`,
      t`Complément : $R_\lambda$ inverse $\lambda I-A$. En effet $\frac{S(h)-I}{h}R_\lambda x=\frac{e^{\lambda h}-1}{h}\int_h^\infty e^{-\lambda t}S(t)x\,dt-\frac1h\int_0^he^{-\lambda t}S(t)x\,dt\to\lambda R_\lambda x-x$, et $R_\lambda Ax=AR_\lambda x$ pour $x\in D(A)$.`,
      t`Sens réciproque (plan du polycopié) : $A_n=n^2R(n,A)-nI=nA(nI-A)^{-1}$ est borné et $\|e^{tA_n}\|\le1$.`,
      t`$nR(n,A)x\to x$ pour tout $x$, grâce à la densité de $D(A)$ ; d'où $A_nx\to Ax$ pour $x\in D(A)$.`,
      t`Estimation de Cauchy $\|e^{tA_n}x-e^{tA_m}x\|\le t\|A_nx-A_mx\|$ sur $D(A)$, étendue à $X$ par densité ; la limite $S(t)x$ est uniforme sur $[0,T]$.`,
      t`$S$ est un $C_0$-semi-groupe de contractions ; son générateur $B$ prolonge $A$, et $B=A$ car $I-A$ est surjectif et $I-B$ injectif.`,
    ],
    warnings: [
      t`Point de vigilance du polycopié : pour $\|S(t)\|\le Me^{\omega t}$ avec $M>1$, la caractérisation requiert des bornes de toutes les puissances de la résolvante, $\|R(\lambda,A)^k\|\le M/(\lambda-\omega)^k$ ; la seule estimation $\|R(\lambda,A)\|\le M/(\lambda-\omega)$ ne suffit pas en général.`,
      t`Exemple : $A=\begin{pmatrix}0&3\\-1/3&0\end{pmatrix}$ sur $\mathbb R^2$ vérifie $\|R(\lambda,A)\|\le\frac{5/2}{\lambda}$ pour tout $\lambda>0$, et pourtant $\|e^{(\pi/2)A}\|=3>\frac52$.`,
      t`La convergence $e^{tA_n}\to S(t)$ est forte, uniforme en temps sur les intervalles bornés ; elle n'a pas lieu en norme d'opérateur en général.`,
      t`Le générateur est donné avec son domaine : il n'est pas défini sur tout $X$, sauf s'il est borné.`,
    ],
    usefulFor: t`Résoudre les problèmes abstraits $u'(t)=Au(t)$ dans un Banach, notamment pour des réalisations d'opérateurs différentiels non bornés.`,
    verification: { ...FROM_POLY, notes: 'Énoncé repris du polycopié (p. PDF 26) ; sens direct esquissé et réciproque donnée en plan au polycopié, complétés dans l’exercice difficile.' },
  },
  definitions: [
    {
      id: 'hille-yosida-c0',
      term: t`$C_0$-semi-groupe`,
      statement: t`Famille $(S(t))_{t\ge0}\subset\mathcal L(X)$ telle que $S(0)=I$, $S(t+s)=S(t)S(s)$ et $\lim_{t\downarrow0}S(t)x=x$ pour chaque $x\in X$.`,
      source: poly(26, 'Section 6.8, vocabulaire'),
    },
    {
      id: 'hille-yosida-generateur',
      term: 'Générateur d’un $C_0$-semi-groupe',
      statement: t`$Ax=\lim_{t\downarrow0}\frac{S(t)x-x}{t}$, limite dans $X$, sur le domaine $D(A)$ des $x$ pour lesquels cette limite existe.`,
      source: poly(26, 'Section 6.8, vocabulaire'),
    },
    {
      id: 'hille-yosida-contractions',
      term: 'Semi-groupe de contractions',
      statement: t`$C_0$-semi-groupe tel que $\|S(t)\|\le1$ pour tout $t\ge0$.`,
      source: poly(26, 'Section 6.8, Hille–Yosida, cas contractif'),
    },
    {
      id: 'hille-yosida-approximations',
      term: 'Approximations de Yosida',
      statement: t`$A_n=n^2R(n,A)-nI=nA(nI-A)^{-1}$, opérateurs bornés définis dès que $n\in\rho(A)$.`,
      source: poly(26, 'Section 6.8, construction réciproque'),
    },
  ],
  concepts: [
    {
      id: 'hille-yosida-puissances-resolvante',
      label: 'Puissances de la résolvante',
      reminder: t`Pour $\|S(t)\|\le Me^{\omega t}$ avec $M>1$, il faut $\|R(\lambda,A)^k\|\le M/(\lambda-\omega)^k$ pour tout $k\ge1$ ; la borne en première puissance ne suffit pas.`,
    },
    {
      id: 'hille-yosida-convergence-forte',
      label: 'Convergence forte et convergence en norme',
      reminder: t`$T_nx\to Tx$ pour chaque $x$ n'entraîne pas $\|T_n-T\|\to0$ ; de même, une convergence coordonnée par coordonnée n'entraîne pas la convergence dans $\ell^2$.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-hille-yosida-premiere-puissance',
      theoremId: 'hille-yosida',
      title: 'Borne de la résolvante en première puissance',
      claim: t`Si $\|R(\lambda,A)\|\le M/(\lambda-\omega)$ pour tout $\lambda>\omega$, alors $A$ engendre un semi-groupe vérifiant $\|S(t)\|\le Me^{\omega t}$.`,
      correctStatement: t`Pour $M>1$, la caractérisation de Hille–Yosida requiert $\|R(\lambda,A)^k\|\le M/(\lambda-\omega)^k$ pour tout $k\ge1$ ; pour $M=1$, la borne en première puissance suffit (cas contractif).`,
      task: t`Soit $A=\begin{pmatrix}0&3\\-1/3&0\end{pmatrix}$ sur $\mathbb R^2$ euclidien, $M=\frac52$ et $\omega=0$. Calcule $e^{(\pi/2)A}e_2$, où $e_2=(0,1)$.`,
      check: { kind: 'rational-vector', prompt: t`Coordonnées de $e^{(\pi/2)A}e_2$`, expected: ['3', '0'], labels: ['x₁', 'x₂'] },
      explanation: t`$A^2=-I$, donc $R(\lambda,A)=\frac{\lambda I+A}{\lambda^2+1}$ et $\|R(\lambda,A)\|\le\frac{\lambda+3}{\lambda^2+1}\le\frac{5/2}{\lambda}$, cette dernière inégalité équivalant à $3\lambda^2-6\lambda+5\ge0$, de discriminant négatif. Mais $e^{tA}=\cos t\,I+\sin t\,A$, donc $e^{(\pi/2)A}=A$ et $Ae_2=(3,0)$ : $\|e^{(\pi/2)A}\|\ge3>\frac52=Me^{\omega\pi/2}$.`,
      concept: 'hille-yosida-puissances-resolvante',
      source: poly(27, 'Point de vigilance, section 6.8'),
    },
    {
      id: 'ce-hille-yosida-domaine',
      theoremId: 'hille-yosida',
      title: 'Générateur partout défini',
      claim: t`Le générateur d'un $C_0$-semi-groupe est défini sur tout l'espace.`,
      correctStatement: t`Le domaine du générateur est l'ensemble des $x$ pour lesquels la limite existe dans $X$ ; il est dense, et égal à $X$ seulement si le générateur est borné.`,
      task: t`Pour $(S(t)u)_n=e^{-nt}u_n$ sur $\ell^2(\mathbb N^*)$ et $u_n=1/n$, calcule la limite, quand $t\downarrow0$, de la $n$-ième coordonnée de $\frac{S(t)u-u}{t}$.`,
      check: { kind: 'rational', prompt: t`Limite de la $n$-ième coordonnée`, expected: '-1' },
      explanation: t`$\frac{e^{-nt}-1}{t}\cdot\frac1n=\frac{e^{-nt}-1}{nt}\to-1$ pour tout $n$. Si la limite existait dans $\ell^2$, ses coordonnées seraient ces limites, par continuité des formes coordonnées ; or la suite constante égale à $-1$ n'est pas dans $\ell^2$. Donc $u\notin D(G)$, alors que $u\in\ell^2$.`,
      concept: 'domaine-operateur',
      source: poly(26, 'Section 6.8, vocabulaire (définition du générateur)'),
    },
    {
      id: 'ce-hille-yosida-densite',
      theoremId: 'hille-yosida',
      title: 'Borne de résolvante sans densité',
      claim: t`Si $]0,+\infty[\subset\rho(A)$ et $\|R(\lambda,A)\|\le1/\lambda$ pour tout $\lambda>0$, alors $A$ engendre un $C_0$-semi-groupe, même si $D(A)$ n'est pas dense.`,
      correctStatement: t`Le théorème suppose $D(A)$ dense ; sur un Banach, cette densité ne découle pas de la borne de la résolvante.`,
      task: t`Sur $X=C([0,1])$ muni de la norme uniforme, soit $Au=-u'$ de domaine $\{u\in C^1([0,1]):u(0)=0\}$. Calcule $\big(nR(n,A)\mathbb 1\big)(0)$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\big(nR(n,A)\mathbb 1\big)(0)$`, expected: '0' },
      explanation: t`$(\lambda I-A)u=f$ s'écrit $\lambda u+u'=f$, $u(0)=0$, d'où $R(\lambda,A)f(x)=\int_0^xe^{-\lambda(x-s)}f(s)\,ds$ et $\|R(\lambda,A)\|\le1/\lambda$. Pour $f=\mathbb 1$ : $nR(n,A)\mathbb 1(x)=1-e^{-nx}$, nul en $0$, donc $\|nR(n,A)\mathbb 1-\mathbb 1\|_\infty=1$. Tout élément de $D(A)$ s'annule en $0$ : $D(A)$ n'est pas dense, et $A$ n'est pas un générateur, puisque le domaine d'un générateur est toujours dense.`,
      concept: 'hypotheses-theoreme',
      source: complement('Rôle de l’hypothèse de densité dans l’énoncé de Hille–Yosida (p. PDF 26)'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT28;
