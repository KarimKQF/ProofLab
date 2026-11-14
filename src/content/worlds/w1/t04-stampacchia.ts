/**
 * Résultat 4 — Théorème de Stampacchia.
 * Source : polycopié, section 1.5 (p. PDF 7–8) ; exercices p. PDF 38.
 */
import { t, rubric, poly, FROM_POLY, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'stampacchia.facile',
  theoremId: 'stampacchia',
  level: 'facile',
  title: t`Stampacchia sur le quart de plan $\mathbb R^2_+$`,
  statement: t`Dans $V=\mathbb R^2$ euclidien, on pose $a(u,v)=u\cdot v$ et $K=\mathbb R^2_+=\{(u_1,u_2) : u_1\ge 0,\ u_2\ge 0\}$. Vérifier les hypothèses du théorème de Stampacchia, puis, pour $f(v)=v_1-2v_2$, déterminer l'unique $u\in K$ tel que $a(u,v-u)\ge f(v-u)$ pour tout $v\in K$.`,
  source: poly(38, 'Exercice 4, facile (p. PDF 38)'),
  prerequisites: [],
  concepts: ['hypotheses-theoreme', 'existence-unicite', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'projection', label: 'Reconnaître une projection, puis minimiser coordonnée par coordonnée' },
      { id: 'verification', label: 'Vérifier un candidat, puis conclure par unicité' },
    ],
    nodes: [
      { id: 'h-V', kind: 'hypothese', text: t`$V=\mathbb R^2$, muni du produit scalaire euclidien, est un espace de Hilbert réel.` },
      { id: 'd-a', kind: 'definition', text: t`$a(u,v)=u\cdot v=u_1v_1+u_2v_2$.` },
      { id: 'd-K', kind: 'definition', text: t`$K=\{(u_1,u_2)\in\mathbb R^2 : u_1\ge 0,\ u_2\ge 0\}$.` },
      { id: 'd-f', kind: 'definition', text: t`$f(v)=v_1-2v_2$ pour $v=(v_1,v_2)\in\mathbb R^2$.` },

      { id: 'a-ok', kind: 'consequence', text: t`$a$ est bilinéaire, continue et coercive : $|a(u,v)|\le\|u\|\,\|v\|$ et $a(u,u)=\|u\|^2$.` },
      { id: 'K-ok', kind: 'consequence', text: t`$K$ est non vide, fermé et convexe.` },
      { id: 'f-ok', kind: 'egalite', text: t`$f(v)=g\cdot v$ avec $g=(1,-2)$ : $f\in V'$.` },
      { id: 'thm', kind: 'application-theoreme', text: t`Il existe un unique $u\in K$ tel que $a(u,v-u)\ge f(v-u)$ pour tout $v\in K$.` },

      { id: 'eqv', kind: 'egalite', text: t`L'inéquation équivaut à : $u\in K$ et $(g-u)\cdot(v-u)\le 0$ pour tout $v\in K$, c'est-à-dire $u=P_Kg$.` },
      { id: 'minim', kind: 'inegalite', text: t`Pour $v\in K$ : $\|g-v\|^2=(v_1-1)^2+(v_2+2)^2$, à minimiser séparément en $v_1\ge 0$ et en $v_2\ge 0$.` },
      { id: 'ver', kind: 'inegalite', text: t`Le vecteur $\bar u=(g_1^+,g_2^+)$ des parties positives des coordonnées de $g$ appartient à $K$, et $a(\bar u,v-\bar u)-f(v-\bar u)=(\bar u-g)\cdot(v-\bar u)\ge 0$ pour tout $v\in K$.` },
      {
        id: 'val',
        kind: 'egalite',
        text: t`$u=(1,0)$.`,
        masked: t`Valeur de la solution $u$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Coordonnées de $u$`, expected: ['1', '0'], labels: ['u₁', 'u₂'] },
      },
      { id: 'fin', kind: 'conclusion', text: t`Les hypothèses sont vérifiées et la solution de l'inéquation est déterminée.` },

      // Propositions plausibles mais fausses.
      { id: 'x-coer', kind: 'consequence', distractor: true, text: t`La positivité $a(u,u)\ge 0$ pour tout $u$ suffit à établir la coercivité.` },
      { id: 'x-g', kind: 'egalite', distractor: true, after: ['f-ok'], text: t`La solution est $u=g=(1,-2)$.` },
    ],
    justifications: [
      { id: 'j-a', label: t`Bilinéarité du produit scalaire, et inégalité de Cauchy–Schwarz ; constantes $M=\alpha=1$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-K', label: t`$(0,0)\in K$ ; $K=[0,+\infty[^2$ est un produit d'intervalles fermés et convexes.` },
      { id: 'j-f', label: 'Lecture des coefficients ; une forme linéaire sur un espace de dimension finie est continue.' },
      { id: 'j-stamp', label: 'Théorème de Stampacchia.', theorem: 'stampacchia' },
      { id: 'j-carac', label: t`$a(u,v-u)-f(v-u)=(u-g)\cdot(v-u)$, puis caractérisation variationnelle de la projection.`, theorem: 'projection' },
      { id: 'j-coord', label: t`Développement du carré ; la contrainte porte séparément sur chaque coordonnée.` },
      { id: 'j-min', label: t`Minimiser $(v_1-1)^2$ sur $[0,+\infty[$, puis $(v_2+2)^2$ sur $[0,+\infty[$ : le minimiseur est $P_Kg$.` },
      { id: 'j-verif', label: t`Disjonction par coordonnée : si $g_i\ge 0$ le terme est nul ; si $g_i<0$, il vaut $-g_iv_i\ge 0$.` },
      { id: 'j-unicite', label: 'Unicité de la solution, fournie par le théorème.' },
      { id: 'j-syn', label: 'Réunion des hypothèses vérifiées et du calcul de la solution.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-lax-milgram', label: 'Théorème de Lax–Milgram.', theorem: 'lax-milgram' },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['d-a', 'h-V'], to: 'a-ok', by: 'j-a' },
      { from: ['d-K'], to: 'K-ok', by: 'j-K' },
      { from: ['d-f'], to: 'f-ok', by: 'j-f' },
      { from: ['h-V', 'a-ok', 'K-ok', 'f-ok'], to: 'thm', by: 'j-stamp' },

      { from: ['f-ok', 'd-a', 'K-ok', 'h-V'], to: 'eqv', by: 'j-carac', path: 'projection' },
      { from: ['f-ok', 'd-K'], to: 'minim', by: 'j-coord', path: 'projection' },
      { from: ['eqv', 'minim'], to: 'val', by: 'j-min', path: 'projection' },

      { from: ['f-ok', 'd-K', 'd-a'], to: 'ver', by: 'j-verif', path: 'verification' },
      { from: ['thm', 'ver'], to: 'val', by: 'j-unicite', path: 'verification' },

      { from: ['thm', 'val'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-coer',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`La coercivité exige une minoration $a(u,u)\ge\alpha\|u\|^2$ avec $\alpha>0$ : la positivité ne suffit pas.`,
        counterexample: t`Sur $\mathbb R^2$, $a(u,v)=u_1v_1$ vérifie $a(u,u)\ge 0$, mais $a\big((0,1),(0,1)\big)=0$ : elle n'est pas coercive.`,
      },
      {
        conclusion: 'x-g',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`$g=(1,-2)$ n'appartient pas à $K$ : la solution doit respecter la contrainte. Sans contrainte ($K=V$), ce serait bien $g$.`,
        counterexample: t`La seconde coordonnée de $g$ est strictement négative.`,
      },
      {
        conclusion: 'thm',
        by: 'j-lax-milgram',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Lax–Milgram correspond au cas $K=V$, où l'inéquation devient une équation. Ici $K$ est un cône strict de $V$.`,
      },
      {
        conclusion: 'a-ok',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`Continuité et coercivité se vérifient avec des constantes explicites $M$ et $\alpha$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'K-ok',
        label: t`Ne plus disposer de la fermeture de $K$`,
        necessary: true,
        explanation: t`Sans fermeture, ni le théorème ni la projection ne s'appliquent, et la solution peut disparaître.`,
        counterexample: t`Sur $K'=\,]0,+\infty[^2$, ouvert, une solution $u$ serait intérieure : en testant $v=u-\varepsilon(u-g)$, on obtiendrait $-\varepsilon\|u-g\|^2\ge 0$, donc $u=g\notin K'$. Il n'y a pas de solution.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational-vector', prompt: t`Constantes de continuité et de coercivité $(M,\alpha)$ de $a$`, expected: ['1', '1'], labels: ['M', 'α'] }],
  solution: t`**Hypothèses.** $\mathbb R^2$ euclidien est un espace de Hilbert. La forme $a$ est le produit scalaire : bilinéaire, continue ($M=1$ par Cauchy–Schwarz) et coercive ($a(u,u)=\|u\|^2$, $\alpha=1$). $K=[0,+\infty[^2$ est non vide, fermé et convexe. Enfin $f(v)=g\cdot v$ avec $g=(1,-2)$, donc $f\in V'$. Le théorème de Stampacchia donne une unique solution.

**Calcul.** Comme $a(u,v-u)-f(v-u)=(u-g)\cdot(v-u)$, l'inéquation équivaut à $(g-u)\cdot(v-u)\le 0$ pour tout $v\in K$, c'est-à-dire $u=P_Kg$. Pour $v\in K$, $\|g-v\|^2=(v_1-1)^2+(v_2+2)^2$ est minimal pour $v_1=1$ et $v_2=0$. Donc $u=(1,0)$.

**Vérification directe.** Pour $v\in K$ : $a(u,v-u)-f(v-u)=(u-g)\cdot(v-u)=(0,2)\cdot(v_1-1,v_2)=2v_2\ge 0$.`,
  steps: [
    'Vérifier les hypothèses : Hilbert, forme continue et coercive, convexe fermé non vide, forme linéaire continue.',
    t`Réécrire l'inéquation à l'aide du vecteur $g$ qui représente $f$.`,
    t`Identifier la solution comme projection de $g$ sur $K$, ou vérifier un candidat.`,
  ],
  commonErrors: [
    { id: 'e-coer', description: t`Confondre $a(u,u)\ge 0$ avec la coercivité.`, concept: 'hypotheses-theoreme' },
    { id: 'e-contrainte', description: t`Oublier la contrainte et répondre $u=g$.`, concept: 'hypotheses-theoreme' },
  ],
  hints: [
    t`Dresse la liste des hypothèses du théorème et vérifie-les une à une, constantes comprises.`,
    t`Écris $f(v)=g\cdot v$ : comme $a$ est ici le produit scalaire, l'inéquation est une caractérisation de projection.`,
    t`La projection sur $[0,+\infty[^2$ se calcule coordonnée par coordonnée : chaque coordonnée négative est remplacée par $0$.`,
  ],
  rubric: rubric({
    hypotheses: 'Chaque hypothèse du théorème est vérifiée, avec les constantes M et α.',
    methode: 'L’inéquation est reconnue comme une projection, ou un candidat est vérifié puis l’unicité invoquée.',
    validite: 'La contrainte est respectée par la solution proposée.',
    justifications: 'Coercivité et positivité ne sont pas confondues.',
    conclusion: t`La solution $u=(1,0)$ est obtenue.`,
  }),
  variant: {
    statement: t`Dans $V=\mathbb R^2$ euclidien, avec $K=\mathbb R^2_+$, on considère la forme non symétrique $a(u,v)=u\cdot v+u_1v_2-u_2v_1$ et $f(v)=v_1+v_2$. Vérifier les hypothèses du théorème de Stampacchia et déterminer la solution de l'inéquation.`,
    solution: t`On a $a(u,v)=(Bu)\cdot v$ avec $Bu=(u_1-u_2,\,u_1+u_2)$, donc $|a(u,v)|\le\|Bu\|\,\|v\|=\sqrt2\,\|u\|\,\|v\|$, et $a(u,u)=\|u\|^2$ : $a$ est continue et coercive, sans être symétrique. Avec $g=(1,1)$, le système $Bu=g$ donne $\bar u=(1,0)\in K$, et $a(\bar u,w)=g\cdot w=f(w)$ pour tout $w$ : $\bar u$ vérifie l'inéquation avec égalité. Par unicité, $u=(1,0)$. Ce n'est pas le minimiseur sur $K$ de $J(v)=\tfrac12a(v,v)-f(v)=\tfrac12\|v\|^2-v_1-v_2$, atteint en $(1,1)$ : sans symétrie, l'inéquation n'est pas un problème de minimisation.`,
    closedChecks: [{ kind: 'rational-vector', prompt: t`Coordonnées de la solution $u$`, expected: ['1', '0'], labels: ['u₁', 'u₂'] }],
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h-V', kind: 'hypothese', text: t`$V=\mathbb R^2$, euclidien, est un espace de Hilbert réel.` },
        { id: 'd-a', kind: 'definition', text: t`$a(u,v)=u\cdot v+u_1v_2-u_2v_1$.` },
        { id: 'd-K', kind: 'definition', text: t`$K=\{(u_1,u_2) : u_1\ge 0,\ u_2\ge 0\}$.` },
        { id: 'd-f', kind: 'definition', text: t`$f(v)=v_1+v_2=g\cdot v$, avec $g=(1,1)$.` },
        { id: 'B', kind: 'egalite', text: t`$a(u,v)=(Bu)\cdot v$, avec $Bu=(u_1-u_2,\,u_1+u_2)$.` },
        { id: 'a-ok', kind: 'consequence', text: t`$a$ est bilinéaire, continue ($|a(u,v)|\le\sqrt2\,\|u\|\,\|v\|$) et coercive ($a(u,u)=\|u\|^2$).` },
        { id: 'K-ok', kind: 'consequence', text: t`$K$ est non vide, fermé et convexe.` },
        { id: 'thm', kind: 'application-theoreme', text: t`Il existe un unique $u\in K$ tel que $a(u,v-u)\ge f(v-u)$ pour tout $v\in K$.` },
        { id: 'syst', kind: 'egalite', text: t`Le système $Bu=g$, soit $u_1-u_2=1$ et $u_1+u_2=1$, a une unique solution $\bar u$, et $\bar u\in K$.` },
        { id: 'ver', kind: 'egalite', text: t`Pour tout $v\in K$ : $a(\bar u,v-\bar u)=(B\bar u)\cdot(v-\bar u)=f(v-\bar u)$ ; $\bar u$ est solution, avec égalité.` },
        {
          id: 'val',
          kind: 'egalite',
          text: t`$u=(1,0)$.`,
          masked: t`Valeur de la solution $u$ : à calculer.`,
          check: { kind: 'rational-vector', prompt: t`Coordonnées de $u$`, expected: ['1', '0'], labels: ['u₁', 'u₂'] },
        },
        { id: 'fin', kind: 'conclusion', text: t`Les hypothèses sont vérifiées et la solution de l'inéquation est déterminée.` },
        { id: 'x-min', kind: 'consequence', distractor: true, after: ['thm'], text: t`La solution est le minimiseur sur $K$ de $J(v)=\tfrac12a(v,v)-f(v)$.` },
        { id: 'x-sym', kind: 'consequence', distractor: true, text: t`$a$ est symétrique.` },
      ],
      justifications: [
        { id: 'j-B', label: t`Regrouper les termes de $a(u,v)$ selon $v_1$ et $v_2$.` },
        { id: 'j-a', label: t`Cauchy–Schwarz avec $\|Bu\|^2=2\|u\|^2$ ; les termes $u_1u_2-u_2u_1$ s'annulent dans $a(u,u)$.`, theorem: 'cauchy-schwarz' },
        { id: 'j-K', label: t`$(0,0)\in K$, et $K=[0,+\infty[^2$ est un produit d'intervalles fermés et convexes.` },
        { id: 'j-stamp', label: 'Théorème de Stampacchia.', theorem: 'stampacchia' },
        { id: 'j-syst', label: 'Résolution d’un système linéaire de Cramer, puis lecture des signes.' },
        { id: 'j-egal', label: t`$B\bar u=g$ donne $a(\bar u,w)=g\cdot w=f(w)$ pour tout $w\in V$.` },
        { id: 'j-unicite', label: 'Unicité de la solution, fournie par le théorème.' },
        { id: 'j-syn', label: 'Réunion des hypothèses vérifiées et du calcul de la solution.' },
      ],
      rules: [
        { from: ['d-a'], to: 'B', by: 'j-B' },
        { from: ['B', 'd-a', 'h-V'], to: 'a-ok', by: 'j-a' },
        { from: ['d-K'], to: 'K-ok', by: 'j-K' },
        { from: ['h-V', 'a-ok', 'K-ok', 'd-f'], to: 'thm', by: 'j-stamp' },
        { from: ['B', 'd-f', 'd-K'], to: 'syst', by: 'j-syst' },
        { from: ['syst', 'B'], to: 'ver', by: 'j-egal' },
        { from: ['thm', 'ver'], to: 'val', by: 'j-unicite' },
        { from: ['thm', 'val'], to: 'fin', by: 'j-syn' },
      ],
      traps: [
        {
          conclusion: 'x-min',
          verdict: 'incorrect',
          concept: 'stampacchia-minimisation',
          message: t`L'inéquation n'est la condition d'optimalité de $J$ que si $a$ est symétrique.`,
          counterexample: t`Ici $J(v)=\tfrac12\|v\|^2-v_1-v_2$ est minimale sur $K$ en $(1,1)$, alors que la solution de l'inéquation est $(1,0)$.`,
        },
        {
          conclusion: 'x-sym',
          verdict: 'incorrect',
          concept: 'coercivite-symetrie',
          message: t`La forme n'est pas symétrique ; la coercivité n'en a pas besoin.`,
          counterexample: t`$a\big((1,0),(0,1)\big)=1$ et $a\big((0,1),(1,0)\big)=-1$.`,
        },
      ],
      removable: [
        {
          hypothesis: 'a-ok',
          label: 'Ne plus disposer de la coercivité',
          necessary: true,
          explanation: 'Sans coercivité, le théorème ne s’applique plus : l’existence peut échouer.',
          counterexample: t`Pour $a(u,v)=u_1v_1$, $K=\mathbb R^2$ et $f(v)=v_2$ : l'inéquation impose $u_1w_1\ge w_2$ pour tout $w\in\mathbb R^2$, ce qui est faux pour $w=(0,1)$.`,
        },
      ],
    },
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'stampacchia.intermediaire',
  theoremId: 'stampacchia',
  level: 'intermediaire',
  title: 'Stampacchia par un point fixe contractant',
  statement: t`Soit $V$ un espace de Hilbert réel, $K\subset V$ non vide, fermé et convexe, $a$ bilinéaire avec $|a(u,v)|\le M\|u\|\,\|v\|$ et $a(u,u)\ge\alpha\|u\|^2$ ($M,\alpha>0$), et $f\in V'$. En introduisant par Riesz $B\in\mathcal L(V)$ et $g\in V$, démontrer le théorème de Stampacchia à partir du point fixe $u=P_K\big(u-\rho(Bu-g)\big)$, et déterminer une condition sur $\rho>0$, ne dépendant que de $M$ et $\alpha$, qui assure que l'application $T_\rho(u)=P_K\big(u-\rho(Bu-g)\big)$ est contractante.`,
  source: poly(38, 'Exercice 4, intermédiaire (p. PDF 38) ; démonstration de la section 1.5 (p. PDF 8)'),
  prerequisites: [],
  concepts: ['stampacchia-parametre', 'stampacchia-minimisation', 'utilisation-prematuree', 'complet-necessaire'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-V', kind: 'hypothese', text: t`$V$ est un espace de Hilbert réel.` },
      { id: 'h-K', kind: 'hypothese', text: t`$K\subset V$ est non vide, fermé et convexe.` },
      { id: 'h-a', kind: 'hypothese', text: t`$a$ est bilinéaire, $|a(u,v)|\le M\|u\|\,\|v\|$ et $a(u,u)\ge\alpha\|u\|^2$, avec $M,\alpha>0$.` },
      { id: 'h-f', kind: 'hypothese', text: t`$f\in V'$.` },
      { id: 'd-rho', kind: 'definition', local: true, text: t`Soit $\rho>0$.` },

      { id: 'Bg', kind: 'application-theoreme', text: t`Il existe $B\in\mathcal L(V)$ et $g\in V$ tels que $a(u,v)=\langle Bu,v\rangle$ et $\langle f,v\rangle=\langle g,v\rangle$ pour tous $u,v\in V$ ; de plus $\|Bw\|\le M\|w\|$ et $\langle Bw,w\rangle\ge\alpha\|w\|^2$.` },
      { id: 'eqv', kind: 'egalite', text: t`Pour $u\in K$ : $u$ est solution de l'inéquation si et seulement si $\langle(u-\rho(Bu-g))-u,v-u\rangle\le 0$ pour tout $v\in K$, c'est-à-dire $u=T_\rho(u)$.` },
      { id: 'nonexp', kind: 'inegalite', text: t`$T_\rho$ envoie $K$ dans $K$, et $\|T_\rho u-T_\rho v\|\le\|(u-v)-\rho B(u-v)\|$ pour tous $u,v\in K$.` },
      {
        id: 'contr',
        kind: 'inegalite',
        text: t`$\|T_\rho u-T_\rho v\|^2\le(1-2\rho\alpha+\rho^2M^2)\,\|u-v\|^2$ pour tous $u,v\in K$.`,
        masked: t`Majoration de $\|T_\rho u-T_\rho v\|^2$ : facteur à calculer.`,
        check: { kind: 'expr-equiv', prompt: t`Facteur $q(\rho)$ tel que $\|T_\rho u-T_\rho v\|^2\le q(\rho)\|u-v\|^2$ (variables rho, alpha, M)`, expected: '1-2*rho*alpha+rho^2*M^2', vars: ['rho', 'alpha', 'M'] },
      },
      {
        id: 'cond',
        kind: 'inegalite',
        text: t`Ce facteur est strictement inférieur à $1$ si et seulement si $0<\rho<2\alpha/M^2$.`,
        masked: t`Condition sur $\rho$ : à déterminer.`,
        check: { kind: 'expr-equiv', prompt: t`Borne supérieure des $\rho$ admissibles (variables alpha, M)`, expected: '2*alpha/M^2', vars: ['alpha', 'M'] },
      },
      { id: 'complet', kind: 'consequence', text: t`$K$, fermé dans l'espace complet $V$, est complet pour la distance induite.` },
      { id: 'PF', kind: 'application-theoreme', text: t`Pour un tel $\rho$, $T_\rho$ admet un unique point fixe dans $K$.` },
      { id: 'fin', kind: 'conclusion', text: t`Il existe un unique $u\in K$ tel que $a(u,v-u)\ge\langle f,v-u\rangle$ pour tout $v\in K$, et $T_\rho$ est contractante pour les $\rho$ admissibles.` },

      // Propositions plausibles mais fausses.
      { id: 'x-rho', kind: 'consequence', distractor: true, after: ['nonexp'], text: t`$T_\rho$ est contractante pour tout $\rho>0$.` },
      { id: 'x-2aM', kind: 'consequence', distractor: true, after: ['contr'], text: t`$T_\rho$ est contractante dès que $0<\rho<2\alpha/M$.` },
    ],
    justifications: [
      { id: 'j-riesz', label: t`Théorème de Riesz, appliqué à $v\mapsto a(u,v)$ pour chaque $u$, et à $f$ ; puis continuité et coercivité de $a$.`, theorem: 'riesz' },
      { id: 'j-carac', label: t`Multiplier par $-\rho<0$, puis caractérisation variationnelle de la projection.`, theorem: 'projection' },
      { id: 'j-nonexp', label: 'Non-expansivité de la projection sur un convexe fermé non vide.', theorem: 'projection' },
      { id: 'j-dev', label: t`Développer $\|w-\rho Bw\|^2=\|w\|^2-2\rho\langle Bw,w\rangle+\rho^2\|Bw\|^2$, puis coercivité et continuité.` },
      { id: 'j-trinome', label: t`$q(\rho)-1=\rho(\rho M^2-2\alpha)$, et $\rho>0$.` },
      { id: 'j-ferme-complet', label: 'Une partie fermée d’un espace métrique complet est complète.' },
      { id: 'j-banach', label: 'Théorème du point fixe de Banach.', theorem: 'point-fixe-banach' },
      { id: 'j-retour', label: 'Le point fixe est solution par l’équivalence ; toute solution est un point fixe, d’où l’unicité.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-lax-milgram', label: 'Théorème de Lax–Milgram.', theorem: 'lax-milgram' },
      { id: 'j-triangle', label: t`Inégalité triangulaire : $\|w-\rho Bw\|\le\|w\|+\rho\|Bw\|$.` },
      { id: 'j-minim', label: t`Minimiser $J(v)=\tfrac12a(v,v)-\langle f,v\rangle$ sur $K$.` },
    ],
    rules: [
      { from: ['h-V', 'h-a', 'h-f'], to: 'Bg', by: 'j-riesz' },
      { from: ['Bg', 'd-rho', 'h-K', 'h-V'], to: 'eqv', by: 'j-carac' },
      { from: ['Bg', 'h-K', 'h-V'], to: 'nonexp', by: 'j-nonexp' },
      { from: ['nonexp', 'Bg'], to: 'contr', by: 'j-dev' },
      { from: ['contr', 'd-rho'], to: 'cond', by: 'j-trinome' },
      { from: ['h-K', 'h-V'], to: 'complet', by: 'j-ferme-complet' },
      { from: ['contr', 'cond', 'complet', 'h-K'], to: 'PF', by: 'j-banach' },
      { from: ['PF', 'eqv'], to: 'fin', by: 'j-retour' },
    ],
    traps: [
      {
        conclusion: 'x-rho',
        verdict: 'incorrect',
        concept: 'stampacchia-parametre',
        message: t`La non-expansivité de $P_K$ ne suffit pas : le facteur $1-2\rho\alpha+\rho^2M^2$ est au moins égal à $1$ dès que $\rho\ge 2\alpha/M^2$.`,
        counterexample: t`$V=K=\mathbb R$, $a(u,v)=uv$, $g=0$ : $T_\rho u=(1-\rho)u$, de constante $|1-\rho|=2$ pour $\rho=3$.`,
      },
      {
        conclusion: 'x-2aM',
        verdict: 'incorrect',
        concept: 'stampacchia-parametre',
        message: t`La condition fait intervenir $M^2$ : le facteur vaut $1+\rho(\rho M^2-2\alpha)$.`,
        counterexample: t`$V=K=\mathbb R^2$, $Bu=(u_1-u_2,\,u_1+u_2)$, $g=0$ : $\alpha=1$, $M=\sqrt2$. Pour $\rho=6/5<\sqrt2=2\alpha/M$, l'application $u\mapsto u-\rho Bu$ a pour constante de Lipschitz $\sqrt{37}/5>1$.`,
      },
      {
        conclusion: 'PF',
        by: 'j-lax-milgram',
        verdict: 'incorrect',
        concept: 'utilisation-prematuree',
        message: t`Lax–Milgram est le cas particulier $K=V$ de Stampacchia : il ne peut pas servir à démontrer Stampacchia, et ne construit pas de point fixe sur $K$.`,
      },
      {
        conclusion: 'contr',
        by: 'j-triangle',
        verdict: 'incorrect',
        concept: 'stampacchia-parametre',
        message: t`L'inégalité triangulaire donne le facteur $1+\rho M>1$ : elle perd le terme $-2\rho\langle Bw,w\rangle$, seul endroit où la coercivité intervient. Il faut développer le carré.`,
      },
      {
        conclusion: 'fin',
        by: 'j-minim',
        verdict: 'incorrect',
        concept: 'stampacchia-minimisation',
        message: t`La minimisation de $J$ ne caractérise la solution que si $a$ est symétrique, ce que l'énoncé ne suppose pas.`,
        counterexample: t`Pour $a(u,v)=u\cdot v+u_1v_2-u_2v_1$ sur $\mathbb R^2$, $K=\mathbb R^2_+$ et $f(v)=v_1+v_2$, la solution est $(1,0)$, alors que $J$ est minimale sur $K$ en $(1,1)$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-a',
        label: 'Ne plus disposer de la coercivité',
        necessary: true,
        explanation: t`Sans la minoration $\langle Bw,w\rangle\ge\alpha\|w\|^2$, aucun $\rho>0$ ne rend le facteur strictement inférieur à $1$.`,
        counterexample: t`$V=K=\mathbb R$, $a=0$ : pour $f=0$, tout $u$ est solution ; pour $f\neq 0$, aucun.`,
      },
      {
        hypothesis: 'h-K',
        label: t`Ne plus disposer de la fermeture ou de la convexité de $K$`,
        necessary: true,
        explanation: t`Ni $P_K$ ni la complétude de $K$ ne sont alors disponibles.`,
        counterexample: t`$V=\mathbb R$, $a(u,v)=uv$, $f=0$, $K=\{-1,1\}$ : pour $u=\pm1$ et $v=-u$, $a(u,v-u)=-2<0$. Aucune solution.`,
      },
    ],
  },
  closedChecks: [
    { kind: 'rational', prompt: t`Pour $M=2$ et $\alpha=1$ : borne supérieure des $\rho$ admissibles`, expected: '1/2' },
    { kind: 'rational', prompt: t`Pour $M=2$ et $\alpha=1$ : valeur de $\rho$ qui minimise $1-2\rho\alpha+\rho^2M^2$`, expected: '1/4' },
  ],
  solution: t`**Riesz.** Pour $u$ fixé, $v\mapsto a(u,v)$ est linéaire continue : Riesz donne $Bu\in V$ avec $a(u,v)=\langle Bu,v\rangle$. Par unicité, $B$ est linéaire ; avec $v=Bu$, $\|Bu\|^2\le M\|u\|\,\|Bu\|$, donc $\|Bu\|\le M\|u\|$. De même, $\langle f,v\rangle=\langle g,v\rangle$, et $\langle Bw,w\rangle=a(w,w)\ge\alpha\|w\|^2$.

**Équivalence.** Pour $u\in K$ et $\rho>0$ : $a(u,v-u)\ge\langle f,v-u\rangle$ s'écrit $\langle Bu-g,v-u\rangle\ge 0$, soit $\langle(u-\rho(Bu-g))-u,v-u\rangle\le 0$ pour tout $v\in K$ : par la caractérisation de la projection, c'est $u=P_K(u-\rho(Bu-g))=T_\rho(u)$.

**Contraction.** Par non-expansivité, avec $w=u-v$ : $\|T_\rho u-T_\rho v\|^2\le\|w-\rho Bw\|^2=\|w\|^2-2\rho\langle Bw,w\rangle+\rho^2\|Bw\|^2\le(1-2\rho\alpha+\rho^2M^2)\|w\|^2$. Le facteur vaut $1+\rho(\rho M^2-2\alpha)$ : il est strictement inférieur à $1$ si et seulement si $0<\rho<2\alpha/M^2$ ; il est minimal pour $\rho=\alpha/M^2$, où il vaut $1-\alpha^2/M^2$.

**Point fixe.** $K$ est fermé dans $V$ complet, donc complet. Pour $0<\rho<2\alpha/M^2$, le théorème de Banach donne un unique point fixe de $T_\rho$ dans $K$ : c'est une solution, et toute solution est un point fixe, d'où l'unicité. Lorsque $K=V$, on retrouve Lax–Milgram.`,
  steps: [
    t`Représenter $a$ par $B$ et $f$ par $g$ grâce à Riesz.`,
    t`Réécrire l'inéquation comme l'équation de point fixe $u=T_\rho(u)$.`,
    t`Majorer $\|T_\rho u-T_\rho v\|^2$ par non-expansivité, coercivité et continuité.`,
    t`Déterminer les $\rho$ pour lesquels le facteur est strictement inférieur à $1$.`,
    t`Conclure par le point fixe de Banach sur $K$ complet.`,
  ],
  commonErrors: [
    { id: 'e-rho', description: t`Oublier la condition $\rho<2\alpha/M^2$.`, concept: 'stampacchia-parametre' },
    { id: 'e-lm', description: 'Invoquer Lax–Milgram, cas particulier du résultat à démontrer.', concept: 'utilisation-prematuree' },
    { id: 'e-complet', description: t`Oublier que $K$ doit être complet pour appliquer le point fixe de Banach.`, concept: 'complet-necessaire' },
  ],
  hints: [
    t`Quels objets de $V$ remplacent la forme $a$ et la forme $f$ ? Quel résultat traduit une inéquation sur $K$ en égalité avec $P_K$ ?`,
    t`Montre que $u$ est solution si et seulement si $u=T_\rho(u)$, puis compare $\|T_\rho u-T_\rho v\|$ à $\|w-\rho Bw\|$ avec $w=u-v$.`,
    t`Développe le carré : $\|w-\rho Bw\|^2\le(1-2\rho\alpha+\rho^2M^2)\|w\|^2$. Le facteur est un trinôme en $\rho$, égal à $1$ en $\rho=0$.`,
  ],
  rubric: rubric({
    hypotheses: t`Riesz est appliqué avec ses hypothèses, et $K$ complet est justifié.`,
    methode: 'Équivalence avec un point fixe, puis contraction, puis point fixe de Banach.',
    validite: 'Le carré est développé : la coercivité intervient par le produit scalaire.',
    justifications: 'Aucun résultat dont Stampacchia est la généralisation n’est invoqué.',
    conclusion: t`Existence, unicité et condition $0<\rho<2\alpha/M^2$ sont obtenues.`,
  }),
  variant: {
    statement: t`Sous les hypothèses du théorème, soient $u_1$ et $u_2$ les solutions associées à $f_1,f_2\in V'$. Montrer que $\|u_1-u_2\|_V\le\alpha^{-1}\|f_1-f_2\|_{V'}$.`,
    solution: t`On teste l'inéquation de $u_1$ par $v=u_2$ et celle de $u_2$ par $v=u_1$ : $a(u_1,u_2-u_1)\ge\langle f_1,u_2-u_1\rangle$ et $a(u_2,u_1-u_2)\ge\langle f_2,u_1-u_2\rangle$. En additionnant, avec $w=u_1-u_2$ : $-a(w,w)\ge-\langle f_1-f_2,w\rangle$. Donc $\alpha\|w\|^2\le a(w,w)\le\|f_1-f_2\|_{V'}\|w\|$, d'où le résultat (trivial si $w=0$). La solution dépend donc de $f$ de façon lipschitzienne.`,
  },
  verification: FROM_POLY,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'stampacchia.difficile',
  theoremId: 'stampacchia',
  level: 'difficile',
  title: t`Inéquation non symétrique sur $H^1_0(]0,1[)$ avec contrainte $v\ge 0$`,
  statement: t`Soit $V=H^1_0(]0,1[)$, muni de $(u,v)_V=\int_0^1u'v'$, $K=\{v\in V : v\ge 0\ \text{p.p.}\}$, $b\in\mathbb R$, $a(u,v)=\int_0^1u'v'+b\int_0^1u'v$ et $f\in V'$. Montrer qu'il existe un unique $u\in K$ tel que $a(u,v-u)\ge\langle f,v-u\rangle$ pour tout $v\in K$, l'unicité étant démontrée en testant les solutions l'une par l'autre.`,
  source: poly(38, 'Exercice 4, difficile (p. PDF 38)'),
  prerequisites: ['projection', 'poincare', 'distributions'],
  concepts: ['coercivite-symetrie', 'existence-unicite', 'hypotheses-theoreme', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-V', kind: 'hypothese', text: t`$V=H^1_0(]0,1[)$, muni de $(u,v)_V=\int_0^1u'v'$, est un espace de Hilbert réel.` },
      { id: 'h-K', kind: 'hypothese', text: t`$K=\{v\in V : v\ge 0\ \text{p.p.}\}$ est non vide, convexe et fermé dans $V$ (exercice difficile du résultat 1).` },
      { id: 'd-a', kind: 'definition', text: t`$a(u,v)=\int_0^1u'v'+b\int_0^1u'v$, avec $b\in\mathbb R$ fixé.` },
      { id: 'h-f', kind: 'hypothese', text: t`$f\in V'$.` },
      { id: 'h-poinc', kind: 'hypothese', text: t`Il existe $C_P>0$ tel que $\|v\|_{L^2}\le C_P\|v'\|_{L^2}$ pour tout $v\in V$ (inégalité de Poincaré).` },

      { id: 'cont', kind: 'inegalite', text: t`$a$ est bilinéaire et $|a(u,v)|\le(1+|b|C_P)\,\|u\|_V\|v\|_V$ pour tous $u,v\in V$.` },
      { id: 'anti', kind: 'egalite', text: t`$\int_0^1w'w=0$ pour tout $w\in V$.` },
      { id: 'coer', kind: 'egalite', text: t`$a(w,w)=\|w\|_V^2$ pour tout $w\in V$ : $a$ est coercive.` },
      { id: 'thm', kind: 'application-theoreme', text: t`Il existe $u\in K$ tel que $a(u,v-u)\ge\langle f,v-u\rangle$ pour tout $v\in K$.` },

      { id: 'u-sol', kind: 'definition', local: true, text: t`Soient $u_1,u_2\in K$ deux solutions de l'inéquation.` },
      { id: 'u-test', kind: 'inegalite', text: t`$a(u_1,u_2-u_1)+a(u_2,u_1-u_2)\ge\langle f,u_2-u_1\rangle+\langle f,u_1-u_2\rangle=0$.` },
      { id: 'u-neg', kind: 'inegalite', text: t`$a(u_1-u_2,u_1-u_2)\le 0$.` },
      { id: 'unique', kind: 'consequence', text: t`$u_1=u_2$.` },
      { id: 'fin', kind: 'conclusion', text: t`Il existe un unique $u\in K$ tel que $a(u,v-u)\ge\langle f,v-u\rangle$ pour tout $v\in K$.` },

      // Proposition plausible mais fausse.
      { id: 'x-sym', kind: 'consequence', distractor: true, text: t`$a$ est symétrique, et c'est ce qui la rend coercive.` },
    ],
    justifications: [
      { id: 'j-cs-poinc', label: t`Cauchy–Schwarz sur chaque terme, puis Poincaré pour $\|v\|_{L^2}$.`, theorem: 'poincare' },
      { id: 'j-anti', label: t`$w$ est continue, nulle en $0$ et en $1$, et $(w^2)'=2ww'$ : $\int_0^1w'w=\tfrac12\big(w(1)^2-w(0)^2\big)$.` },
      { id: 'j-coer', label: t`Le terme $b\int_0^1w'w$ est nul.` },
      { id: 'j-stamp', label: 'Théorème de Stampacchia.', theorem: 'stampacchia' },
      { id: 'j-tester', label: t`Tester l'inéquation de $u_1$ par $v=u_2$, celle de $u_2$ par $v=u_1$, puis additionner : les termes en $f$ se compensent.` },
      { id: 'j-bil', label: t`Bilinéarité : $a(u_1,u_2-u_1)+a(u_2,u_1-u_2)=-a(u_1-u_2,u_1-u_2)$.` },
      { id: 'j-coer-nul', label: t`Coercivité : $\|u_1-u_2\|_V^2=a(u_1-u_2,u_1-u_2)\le 0$.` },
      { id: 'j-syn', label: 'Réunion de l’existence et de l’unicité.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-stamp-unicite', label: 'L’unicité est donnée par le théorème de Stampacchia.', theorem: 'stampacchia' },
      { id: 'j-lax-milgram', label: 'Théorème de Lax–Milgram.', theorem: 'lax-milgram' },
      { id: 'j-sym', label: t`La symétrie de $a$ donne $a(w,w)\ge\|w\|_V^2$.` },
    ],
    rules: [
      { from: ['d-a', 'h-poinc'], to: 'cont', by: 'j-cs-poinc' },
      { from: ['h-V'], to: 'anti', by: 'j-anti' },
      { from: ['d-a', 'anti'], to: 'coer', by: 'j-coer' },
      { from: ['h-V', 'h-K', 'cont', 'coer', 'h-f'], to: 'thm', by: 'j-stamp' },
      { from: ['u-sol', 'h-f'], to: 'u-test', by: 'j-tester' },
      { from: ['u-test', 'cont'], to: 'u-neg', by: 'j-bil' },
      { from: ['u-neg', 'coer'], to: 'unique', by: 'j-coer-nul' },
      { from: ['thm', 'unique'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-sym',
        verdict: 'incorrect',
        concept: 'coercivite-symetrie',
        message: t`$a$ n'est pas symétrique dès que $b\neq 0$, et sa coercivité ne vient pas d'une symétrie : le terme $b\int_0^1w'w$ est nul sur $V$.`,
        counterexample: t`Pour $u(x)=x(1-x)$ et $v(x)=x^2(1-x)$ : $a(u,v)-a(v,u)=b\int_0^1(u'v-v'u)=-b/30$.`,
      },
      {
        conclusion: 'unique',
        by: 'j-stamp-unicite',
        verdict: 'a-justifier',
        concept: 'existence-unicite',
        message: t`Stampacchia donne bien l'unicité, mais l'exercice demande de la retrouver : teste chaque solution par l'autre.`,
      },
      {
        conclusion: 'thm',
        by: 'j-lax-milgram',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Lax–Milgram correspond à $K=V$ ; ici $K$ est un cône strict et l'on obtient une inéquation.`,
      },
      {
        conclusion: 'coer',
        by: 'j-sym',
        verdict: 'incorrect',
        concept: 'coercivite-symetrie',
        message: t`$a$ n'est pas symétrique : la coercivité provient de l'annulation de $\int_0^1w'w$ sur $V$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'coer',
        label: 'Ne plus disposer de la coercivité',
        necessary: true,
        explanation: 'Sans coercivité, ni le théorème ni l’argument d’unicité ne fonctionnent.',
        counterexample: t`Pour $a_c(u,v)=\int_0^1u'v'-\pi^2\int_0^1uv$ et $\varphi(x)=\sin(\pi x)$ : $a_c(\varphi,w)=0$ pour tout $w\in V$, donc pour $f=0$ tous les $t\varphi$, $t\ge 0$, sont solutions.`,
      },
      {
        hypothesis: 'h-K',
        label: t`Ne plus disposer des propriétés de $K$`,
        necessary: true,
        explanation: t`Le théorème exige un convexe fermé non vide de $V$.`,
        counterexample: t`$K'=\{v\in C^\infty_c(]0,1[) : v\ge 0\}$ n'est pas fermé dans $V$. Pour $b=0$ et $\langle f,v\rangle=\int_0^1v$, si $u\in K'$ était solution, le test $v=u+\psi$, avec $\psi\in K'$ égale à $1$ près du support de $u$, donnerait $0=\int_0^1u'\psi'\ge\int_0^1\psi>0$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Constante de coercivité $\alpha$ de $a$ pour la norme de $V$`, expected: '1' }],
  solution: t`**Hypothèses.** $V$ est un espace de Hilbert et $K$ un convexe fermé non vide de $V$ (exercice difficile du résultat 1). La forme $a$ est bilinéaire, et par Cauchy–Schwarz puis Poincaré, $|a(u,v)|\le\|u'\|\,\|v'\|+|b|\,\|u'\|\,\|v\|_{L^2}\le(1+|b|C_P)\|u\|_V\|v\|_V$. Pour $w\in V$, $w$ est continue, nulle au bord, et $(w^2)'=2ww'$, donc $\int_0^1w'w=0$ : $a(w,w)=\|w\|_V^2$. La forme est coercive avec $\alpha=1$, sans être symétrique si $b\neq 0$.

**Existence.** Stampacchia fournit $u\in K$ solution.

**Unicité par test.** Si $u_1,u_2$ sont solutions, on teste l'inéquation de $u_1$ par $v=u_2$ et celle de $u_2$ par $v=u_1$ ; en additionnant, $a(u_1,u_2-u_1)+a(u_2,u_1-u_2)\ge 0$. Par bilinéarité, le membre de gauche vaut $-a(u_1-u_2,u_1-u_2)=-\|u_1-u_2\|_V^2$. Donc $u_1=u_2$.

**Point de vigilance.** Si $b\neq 0$, la solution n'est en général pas la projection sur $K$, pour $(\cdot,\cdot)_V$, du représentant de Riesz de $f$ : c'est Stampacchia, et non la seule projection, qui donne l'existence.`,
  steps: [
    t`Vérifier continuité (Poincaré) et coercivité ($\int_0^1w'w=0$) de $a$.`,
    'Invoquer Stampacchia pour l’existence.',
    'Tester chaque solution par l’autre et additionner.',
    'Conclure par la coercivité.',
  ],
  commonErrors: [
    { id: 'e-sym', description: 'Attribuer la coercivité à une symétrie de la forme.', concept: 'coercivite-symetrie' },
    { id: 'e-unicite', description: 'Confondre l’existence d’une solution et son unicité.', concept: 'existence-unicite' },
  ],
  hints: [
    t`Le terme $b\int_0^1u'v$ menace-t-il la coercivité ? Calcule-le pour $u=v=w\in V$.`,
    t`Pour l'unicité, écris les deux inéquations, chacune testée par l'autre solution, et additionne.`,
    t`$\int_0^1w'w=\tfrac12[w^2]_0^1=0$ ; la somme des deux inéquations donne $-a(u_1-u_2,u_1-u_2)\ge 0$.`,
  ],
  rubric: rubric({
    hypotheses: 'Continuité, coercivité et propriétés de K sont établies dans V.',
    methode: 'Stampacchia pour l’existence, test des solutions l’une par l’autre pour l’unicité.',
    validite: t`L'annulation de $\int_0^1w'w$ est justifiée par les conditions au bord.`,
    justifications: 'La coercivité n’est pas attribuée à une symétrie.',
    conclusion: 'Existence et unicité de la solution sont obtenues.',
  }),
  variant: {
    statement: t`Avec $b=0$, c'est-à-dire $a(u,v)=\int_0^1u'v'$, et le même $K$, déterminer la solution pour $\langle f,v\rangle=\int_0^1v$, puis pour $\langle f,v\rangle=-\int_0^1v$.`,
    solution: t`Pour $\langle f,v\rangle=\int_0^1v$ : $u(x)=\tfrac12x(1-x)$ appartient à $K$, et une intégration par parties donne $\int_0^1u'w'=\int_0^1w$ pour tout $w\in V$ ; l'inéquation est vérifiée avec égalité. Pour $\langle f,v\rangle=-\int_0^1v$ : $u=0$ convient, car $a(0,v)=0\ge-\int_0^1v$ pour tout $v\in K$. Dans les deux cas, l'unicité donne la solution.`,
    closedChecks: [{ kind: 'expr-equiv', prompt: t`Solution $u(x)$ pour $\langle f,v\rangle=\int_0^1v$`, expected: 'x*(1-x)/2', vars: ['x'] }],
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT04: TheoremModule = {
  theorem: {
    id: 'stampacchia',
    spaces: [
      t`$V$ : espace de Hilbert réel, de produit scalaire $\langle\cdot,\cdot\rangle_V$ ; $V'$ est son dual et $\langle f,v\rangle$ désigne la dualité.`,
      t`$K\subset V$ : partie non vide, fermée, convexe ; $a:V\times V\to\mathbb R$ : forme bilinéaire, non nécessairement symétrique.`,
    ],
    hypotheses: [
      {
        id: 'h-hilbert',
        text: t`$V$ est un espace de Hilbert réel.`,
        whenRemoved: t`Sur $E=C([-1,1])$ muni du produit scalaire de $L^2$, avec $a$ le produit scalaire, $K=E$ et $f(v)=\int_0^1v$, l'inéquation équivaut à représenter $f$ par un élément de $E$, ce qui est impossible.`,
      },
      {
        id: 'h-K',
        text: t`$K$ est non vide, fermé et convexe.`,
        whenRemoved: t`$V=\mathbb R$, $a(u,v)=uv$ : pour $K=\{-1,1\}$ et $f=0$, aucune solution ($v=-u$ donne $-2<0$) ; pour $K=\,]0,1[$ et $f(v)=2v$, aucune solution, car $(u-2)(v-u)\ge 0$ imposerait $v\le u$ pour tout $v\in K$.`,
      },
      { id: 'h-continue', text: t`$a$ est bilinéaire et continue : $|a(u,v)|\le M\|u\|_V\|v\|_V$.` },
      {
        id: 'h-coercive',
        text: t`$a$ est coercive : $a(u,u)\ge\alpha\|u\|_V^2$, avec $\alpha>0$.`,
        whenRemoved: t`$V=K=\mathbb R$ et $a=0$ : pour $f=0$, tout $u$ est solution ; pour $f\neq 0$, aucun.`,
      },
      { id: 'h-f', text: t`$f\in V'$.` },
    ],
    statement: t`Soit $V$ un espace de Hilbert réel, $K\subset V$ non vide, fermé, convexe, et $a:V\times V\to\mathbb R$ bilinéaire, continue et coercive : $|a(u,v)|\le M\|u\|_V\|v\|_V$ et $a(u,u)\ge\alpha\|u\|_V^2$, avec $M,\alpha>0$. Pour chaque $f\in V'$, il existe un unique $u\in K$ vérifiant
$$a(u,v-u)\ge\langle f,v-u\rangle\quad\forall v\in K.$$`,
    conclusions: {
      existence: t`La solution est le point fixe dans $K$ de $T_\rho(u)=P_K\big(u-\rho(Bu-g)\big)$, contractante pour $0<\rho<2\alpha/M^2$.`,
      unicite: t`Deux solutions vérifient $\alpha\|u_1-u_2\|_V^2\le a(u_1-u_2,u_1-u_2)\le 0$ ; c'est aussi l'unicité du point fixe.`,
      autre: t`Lorsque $K=V$, on retrouve Lax–Milgram.`,
    },
    sourceProof: 'complete',
    proofOutline: [
      t`Par Riesz, associer à $a$ un opérateur $B\in\mathcal L(V)$ et à $f$ un vecteur $g\in V$ : $a(u,v)=\langle Bu,v\rangle$, $\langle f,v\rangle=\langle g,v\rangle$.`,
      t`Pour tout $\rho>0$, la caractérisation de la projection donne : $u\in K$ est solution si et seulement si $u=P_K\big(u-\rho(Bu-g)\big)$.`,
      t`Par non-expansivité : $\|T_\rho u-T_\rho v\|^2\le\|(u-v)-\rho(Bu-Bv)\|^2\le(1-2\rho\alpha+\rho^2M^2)\|u-v\|^2$.`,
      t`Choisir $0<\rho<2\alpha/M^2$ : le facteur est strictement inférieur à $1$.`,
      t`$K$ est complet pour la distance induite par $V$ ; le point fixe de Banach donne un unique $u=T_\rho(u)$, qui est l'unique solution.`,
    ],
    warnings: [
      t`La forme $a$ n'a pas besoin d'être symétrique : seule la coercivité intervient.`,
      t`Si $a$ est symétrique, la solution minimise $J(v)=\tfrac12a(v,v)-\langle f,v\rangle$ sur $K$ ; sans symétrie, ce n'est plus vrai en général.`,
      t`Le paramètre doit vérifier $0<\rho<2\alpha/M^2$ : pour $\rho$ trop grand, $T_\rho$ peut ne pas être contractante.`,
    ],
    usefulFor: 'Problèmes avec contraintes d’inégalité, problèmes d’obstacle, contraintes convexes en formulation faible. Lorsque K = V, on retrouve Lax–Milgram.',
    verification: FROM_POLY,
  },
  definitions: [
    {
      id: 'stampacchia-forme-coercive',
      term: 'Forme bilinéaire continue et coercive',
      statement: t`$a:V\times V\to\mathbb R$ bilinéaire est continue s'il existe $M>0$ tel que $|a(u,v)|\le M\|u\|_V\|v\|_V$, et coercive s'il existe $\alpha>0$ tel que $a(u,u)\ge\alpha\|u\|_V^2$, pour tous $u,v\in V$.`,
      source: poly(7, 'Section 1.5'),
    },
    {
      id: 'stampacchia-inequation',
      term: 'Inéquation variationnelle',
      statement: t`Étant donnés $K\subset V$, $a$ et $f\in V'$ : trouver $u\in K$ tel que $a(u,v-u)\ge\langle f,v-u\rangle$ pour tout $v\in K$.`,
      source: poly(7, 'Section 1.5'),
    },
  ],
  concepts: [
    {
      id: 'stampacchia-parametre',
      label: 'Paramètre de contraction',
      reminder: t`L'estimation $\|T_\rho u-T_\rho v\|^2\le(1-2\rho\alpha+\rho^2M^2)\|u-v\|^2$ ne garantit la contraction que pour $0<\rho<2\alpha/M^2$ : au-delà, ce facteur n'est plus strictement inférieur à $1$.`,
    },
    {
      id: 'stampacchia-minimisation',
      label: 'Inéquation et minimisation',
      reminder: t`L'inéquation variationnelle n'équivaut à minimiser $\tfrac12a(v,v)-\langle f,v\rangle$ sur $K$ que si $a$ est symétrique.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-stampacchia-coercivite',
      theoremId: 'stampacchia',
      title: 'Positivité sans coercivité',
      claim: t`Si $a$ est bilinéaire, continue, symétrique et vérifie $a(u,u)\ge 0$, l'inéquation a une solution pour tout $f\in V'$.`,
      correctStatement: t`Il faut la coercivité $a(u,u)\ge\alpha\|u\|^2$ avec $\alpha>0$.`,
      task: t`Pour $a(u,v)=u_1v_1$ sur $\mathbb R^2$, calcule la meilleure constante $\alpha=\inf_{u\neq 0}a(u,u)/\|u\|^2$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\inf_{u\neq 0}a(u,u)/\|u\|^2$`, expected: '0' },
      explanation: t`$a\big((0,1),(0,1)\big)=0$, donc l'infimum vaut $0$ : $a$ n'est pas coercive. Pour $K=\mathbb R^2$ et $f(v)=v_2$, l'inéquation impose $u_1w_1\ge w_2$ pour tout $w$, ce qui est faux pour $w=(0,1)$ : pas de solution.`,
      concept: 'hypotheses-theoreme',
      source: poly(7, 'Section 1.5 (coercivité)'),
    },
    {
      id: 'ce-stampacchia-symetrie',
      theoremId: 'stampacchia',
      title: 'Coercivité sans symétrie',
      claim: t`Le théorème de Stampacchia exige une forme $a$ symétrique.`,
      correctStatement: t`Seules la continuité et la coercivité sont requises : $a$ peut être non symétrique.`,
      task: t`Donne une matrice $A$ de taille $2$, non symétrique, telle que $a(u,v)=u^{\mathsf T}Av$ soit coercive sur $\mathbb R^2$.`,
      check: { kind: 'matrix-spd', prompt: t`Matrice $A$ non symétrique et coercive`, size: 2, property: 'coercive-nonsymmetric' },
      explanation: t`$a(u,u)=u^{\mathsf T}\tfrac{A+A^{\mathsf T}}2u$ : $a$ est coercive si et seulement si la partie symétrique de $A$ est définie positive. Par exemple $A=\begin{pmatrix}1&1\\-1&1\end{pmatrix}$ donne $a(u,u)=\|u\|^2$.`,
      concept: 'coercivite-symetrie',
      source: poly(7, 'Section 1.5 (aucune symétrie n’est supposée)'),
    },
    {
      id: 'ce-stampacchia-rho',
      theoremId: 'stampacchia',
      title: 'Paramètre trop grand',
      claim: t`$T_\rho(u)=P_K\big(u-\rho(Bu-g)\big)$ est contractante pour tout $\rho>0$.`,
      correctStatement: t`La contraction est garantie pour $0<\rho<2\alpha/M^2$.`,
      task: t`Pour $V=K=\mathbb R$, $a(u,v)=uv$ (donc $B=1$, $\alpha=M=1$) et $\rho=3$, calcule la constante de Lipschitz de $T_\rho$.`,
      check: { kind: 'rational', prompt: t`Constante de Lipschitz de $T_3$`, expected: '2' },
      explanation: t`$T_3(u)=u-3(u-g)=-2u+3g$, donc $|T_3u-T_3v|=2|u-v|$ : l'application n'est pas contractante, et $\rho=3$ n'appartient pas à $]0,2\alpha/M^2[\,=\,]0,2[$.`,
      concept: 'stampacchia-parametre',
      source: poly(8, 'Démonstration de la section 1.5 (choix de ρ)'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT04;
