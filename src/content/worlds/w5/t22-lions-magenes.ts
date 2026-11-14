/**
 * Résultat 22 — Lions–Magenes (traces temporelles).
 * Le polycopié n'en donne qu'une idée de preuve (p. PDF 21). Les exercices travaillent ce
 * qui est démontrable : la définition de la dérivée à valeurs dans V', le sens de u(0) et la
 * continuité de la trace, l'unicité d'une solution faible (section 8.6, p. PDF 33).
 * Précision ajoutée : l'identité se lit avec t ↦ ‖u(t)‖²_H absolument continue (voir docs/notes/w5.md).
 */
import { t, rubric, poly, complement, FROM_POLY, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'lions-magenes.facile',
  theoremId: 'lions-magenes',
  level: 'facile',
  title: t`Définir $u'$ dans $L^2(0,T;V')$`,
  statement: t`Soient $V\hookrightarrow H\simeq H'\hookrightarrow V'$ un triplet de Hilbert réels, dense et continu, $T>0$ et $u\in L^2(0,T;V)$. Donner la définition exacte de « $u'\in L^2(0,T;V')$ » : préciser comment $u$ est vue dans $V'$, la classe des fonctions test et le sens de l'égalité ; montrer que la dérivée est unique, la calculer pour $u(t)=t^2v_0$, et montrer que des fonctions test sans support compact rendraient la définition fausse.`,
  source: poly(42, 'Exercice 22, facile ; section 8.4 (p. PDF 32)'),
  prerequisites: [],
  concepts: ['lions-magenes-crochet', 'dual-identification', 'existence-unicite', 'calcul-exact'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-triplet', kind: 'hypothese', text: t`$V\hookrightarrow H\simeq H'\hookrightarrow V'$ : $V$ s'injecte continûment dans $H$, avec image dense, et $H$ est identifié à son dual par Riesz.` },
      { id: 'h-u', kind: 'hypothese', text: t`$u\in L^2(0,T;V)$.` },
      { id: 'i-iota', kind: 'consequence', text: t`$\iota:H\to V'$, $\langle\iota h,v\rangle_{V',V}=(h,v)_H$, est linéaire continue et injective.` },
      { id: 'i-plonge', kind: 'consequence', text: t`Par $V\hookrightarrow H\hookrightarrow V'$, $u\in L^2(0,T;V')$ ; pour $\varphi\in C^\infty_c(]0,T[)$, $\int_0^T\varphi'(t)\,u(t)\,dt$ est une intégrale de Bochner dans $V'$.` },
      { id: 'd-star', kind: 'definition', local: true, text: t`Soit $g\in L^2(0,T;V')$ vérifiant $(\star)$ : $\int_0^T\varphi'(t)\,u(t)\,dt=-\int_0^T\varphi(t)\,g(t)\,dt$ dans $V'$ pour toute $\varphi\in C^\infty_c(]0,T[)$.` },
      { id: 's-scal', kind: 'egalite', text: t`$(\star)$ équivaut à : pour toute $\varphi\in C^\infty_c(]0,T[)$ et tout $v\in V$, $\int_0^T\varphi'(t)\,(u(t),v)_H\,dt=-\int_0^T\varphi(t)\,\langle g(t),v\rangle_{V',V}\,dt$.` },
      { id: 'd-unic', kind: 'definition', local: true, text: t`Soient $g_1,g_2\in L^2(0,T;V')$ vérifiant $(\star)$, et $h=g_1-g_2$.` },
      { id: 'u-nul', kind: 'egalite', text: t`$\int_0^T\varphi(t)\,h(t)\,dt=0$ dans $V'$ pour toute $\varphi\in C^\infty_c(]0,T[)$.` },
      { id: 'u-zero', kind: 'consequence', text: t`$h=0$ presque partout : $g$ est unique, on la note $u'$.` },
      {
        id: 'e-calc',
        kind: 'egalite',
        text: t`Pour $u(t)=t^2v_0$, $v_0\in V$ : $g(t)=2t\,v_0$ vérifie $(\star)$.`,
        masked: t`Pour $u(t)=t^2v_0$, la dérivée $g(t)=\alpha(t)\,v_0$ : à calculer.`,
        check: { kind: 'expr-equiv', prompt: t`Coefficient $\alpha(t)$ tel que $u'(t)=\alpha(t)\,v_0$ pour $u(t)=t^2v_0$`, expected: '2*t', vars: ['t'] },
      },
      { id: 't-supp', kind: 'consequence', text: t`Pour $u\equiv v_0\in V\setminus\{0\}$, $g=0$ vérifie $(\star)$ ; mais pour $\varphi(t)=t$, sans support compact, $\int_0^T\varphi'u\,dt=Tv_0\neq 0$ : le support compact des fonctions test est indispensable.` },
      { id: 'fin', kind: 'conclusion', text: t`« $u'\in L^2(0,T;V')$ » signifie : il existe $g\in L^2(0,T;V')$, unique, telle que $\int_0^T\varphi'u\,dt=-\int_0^T\varphi g\,dt$ dans $V'$ pour toute $\varphi\in C^\infty_c(]0,T[)$, $u$ étant vue dans $V'$ par $V\hookrightarrow H\hookrightarrow V'$ ; de façon équivalente, l'égalité testée contre chaque $v\in V$.` },
      // Propositions plausibles mais fausses.
      { id: 'x-nonsupp', kind: 'consequence', distractor: true, text: t`On peut prendre les fonctions test dans $C^\infty([0,T])$, sans condition de support.` },
      { id: 'x-V', kind: 'consequence', distractor: true, text: t`La définition impose $u'(t)\in V$ pour presque tout $t$.` },
      { id: 'x-H', kind: 'consequence', distractor: true, after: ['s-scal'], text: t`Pour presque tout $t$ et tout $v\in V$ : $\langle u'(t),v\rangle_{V',V}=(u'(t),v)_H$.` },
    ],
    justifications: [
      { id: 'j-iota', label: t`$|(h,v)_H|\le\|h\|_H\|v\|_H\le c\|h\|_H\|v\|_V$ ; si $(h,v)_H=0$ pour tout $v$ d'une partie dense de $H$, alors $h=0$.` },
      { id: 'j-plonge', label: t`Composée d'injections linéaires continues, appliquée presque partout en $t$.` },
      { id: 'j-bochner', label: t`Une forme linéaire continue $\langle\cdot,v\rangle_{V',V}$ commute avec l'intégrale de Bochner ; un élément de $V'$ est déterminé par ses valeurs sur $V$.` },
      { id: 'j-soustraire', label: t`Différence des deux égalités $(\star)$.` },
      { id: 'j-fondamental', label: t`Lemme fondamental vectoriel : une fonction de $L^1(0,T;V')$ d'intégrale nulle contre toute $\varphi\in C^\infty_c(]0,T[)$ est nulle presque partout (points de Lebesgue).` },
      { id: 'j-ipp', label: t`Intégration par parties scalaire : $\int_0^T\varphi'(t)\,t^2\,dt=-\int_0^T\varphi(t)\,2t\,dt$, les termes de bord s'annulant.` },
      { id: 'j-support', label: t`Calcul direct : $\int_0^T\varphi'=\varphi(T)-\varphi(0)$, nul pour un support compact, égal à $T$ pour $\varphi(t)=t$.` },
      { id: 'j-synthese', label: 'Réunion des propriétés établies.' },
      { id: 'j-taux', label: t`Limite, dans $V$, des taux d'accroissement $\frac{u(t+h)-u(t)}{h}$ pour presque tout $t$.` },
    ],
    rules: [
      { from: ['h-triplet'], to: 'i-iota', by: 'j-iota' },
      { from: ['i-iota', 'h-u'], to: 'i-plonge', by: 'j-plonge' },
      { from: ['i-plonge', 'd-star'], to: 's-scal', by: 'j-bochner' },
      { from: ['d-unic', 'i-plonge'], to: 'u-nul', by: 'j-soustraire' },
      { from: ['u-nul'], to: 'u-zero', by: 'j-fondamental' },
      { from: ['i-plonge'], to: 'e-calc', by: 'j-ipp' },
      { from: ['i-plonge'], to: 't-supp', by: 'j-support' },
      { from: ['s-scal', 'u-zero', 'e-calc', 't-supp'], to: 'fin', by: 'j-synthese' },
    ],
    traps: [
      {
        conclusion: 'fin',
        by: 'j-taux',
        verdict: 'incorrect',
        concept: 'lions-magenes-crochet',
        message: t`La dérivée est définie au sens des distributions à valeurs dans $V'$ : $u(t)$ n'est défini que presque partout, et $u'(t)$ n'appartient pas à $V$ en général.`,
        counterexample: t`$V=H^1_0(]0,1[)$, $F(y)=\max(0,1-|y|)$, $u(t,x)=F(4x-2-t)$ pour $t\in]0,1[$ : $u\in L^2(0,1;V)$, mais $\partial_tu(t,\cdot)=-F'(4x-2-t)$ présente des sauts, donc n'appartient pas à $H^1_0$.`,
      },
      {
        conclusion: 'x-nonsupp',
        verdict: 'incorrect',
        concept: 'lions-magenes-crochet',
        message: 'Sans support compact, des termes de bord apparaissent : la formule échoue déjà pour une fonction constante.',
        counterexample: t`$u\equiv v_0\neq 0$, $u'=0$, et $\varphi(t)=t$ : $\int_0^T\varphi'u\,dt=Tv_0\neq 0=-\int_0^T\varphi\cdot 0\,dt$.`,
      },
      {
        conclusion: 'x-V',
        verdict: 'incorrect',
        concept: 'dual-identification',
        message: t`La définition demande seulement $u'\in L^2(0,T;V')$ ; les valeurs de $u'$ peuvent sortir de $V$.`,
        counterexample: t`$u(t,x)=F(4x-2-t)$ avec $F(y)=\max(0,1-|y|)$ : $u\in L^2(0,1;H^1_0(]0,1[))$ et $\partial_tu(t,\cdot)$, fonction en escalier, n'est pas dans $H^1_0$.`,
      },
      {
        conclusion: 'x-H',
        verdict: 'a-justifier',
        concept: 'lions-magenes-crochet',
        message: t`Le membre de droite n'a de sens que si $u'(t)\in H$, ce que la définition n'exige pas : le crochet est celui de la dualité $V',V$, qui ne coïncide avec $(\cdot,\cdot)_H$ que sur $H$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-triplet',
        label: t`Retirer la densité de $V$ dans $H$`,
        necessary: true,
        explanation: t`Sans densité, $\iota:H\to V'$ n'est plus injective : $H$ ne s'identifie plus à un sous-espace de $V'$, et le triplet $V\hookrightarrow H\hookrightarrow V'$ de l'énoncé n'a plus lieu. La restriction de $\iota$ à $V$ reste injective, car $\langle\iota v,v\rangle=\|v\|_H^2$.`,
        counterexample: t`Si $V=\mathrm{Vect}(e)$ dans $H=\ell^2$, tout $h\perp e$ vérifie $\iota h=0$.`,
      },
    ],
  },
  solution: t`**Identification.** L'application $\iota:H\to V'$, $\langle\iota h,v\rangle=(h,v)_H$, est continue car $|(h,v)_H|\le c\|h\|_H\|v\|_V$, et injective car $V$ est dense dans $H$. Par $V\hookrightarrow H\hookrightarrow V'$, $u\in L^2(0,T;V)$ est aussi une fonction de $L^2(0,T;V')$.

**Définition.** On dit que $u'\in L^2(0,T;V')$ s'il existe $g\in L^2(0,T;V')$ telle que $\int_0^T\varphi'(t)u(t)\,dt=-\int_0^T\varphi(t)g(t)\,dt$ dans $V'$ pour toute $\varphi\in C^\infty_c(]0,T[)$. Testée contre $v\in V$, c'est : $\int_0^T\varphi'(u,v)_H=-\int_0^T\varphi\langle g,v\rangle_{V',V}$.

**Unicité.** Si $g_1,g_2$ conviennent, $h=g_1-g_2$ vérifie $\int_0^T\varphi h=0$ pour toute $\varphi$ ; le lemme fondamental vectoriel donne $h=0$ presque partout.

**Exemple.** Pour $u(t)=t^2v_0$ : $\int_0^T\varphi'(t)t^2\,dt=-\int_0^T\varphi(t)\,2t\,dt$, donc $u'(t)=2t\,v_0$.

**Le support compact est indispensable.** Pour $u\equiv v_0\neq 0$, $u'=0$ ; avec $\varphi(t)=t$, on aurait $\int_0^T\varphi'u=Tv_0\neq 0$.

**Vigilance.** $u'(t)\in V'$ n'est en général ni dans $V$ ni dans $H$ : le crochet $\langle u'(t),v\rangle_{V',V}$ n'est pas un produit scalaire de $H$.`,
  steps: [
    t`Construire l'injection $H\hookrightarrow V'$ et y plonger $u$.`,
    'Écrire l’égalité définissante, avec des fonctions test à support compact.',
    'Démontrer l’unicité de la dérivée.',
    'Calculer la dérivée sur un exemple et tester le rôle du support.',
  ],
  commonErrors: [
    { id: 'e-support', description: 'Utiliser des fonctions test sans support compact.', concept: 'lions-magenes-crochet' },
    { id: 'e-valeurs', description: t`Supposer $u'(t)\in H$ ou $u'(t)\in V$.`, concept: 'dual-identification' },
    { id: 'e-unicite', description: 'Parler de « la » dérivée sans en démontrer l’unicité.', concept: 'existence-unicite' },
  ],
  hints: [
    t`Dans quel espace l'égalité définissante a-t-elle lieu, et comment $u$, à valeurs dans $V$, y est-elle vue ?`,
    t`Écris l'intégration par parties contre $\varphi\in C^\infty_c(]0,T[)$, puis teste-la contre $v\in V$.`,
    t`Pour l'unicité, la différence de deux dérivées est orthogonale à toute $\varphi$ ; pour le support, essaie $u$ constante et $\varphi(t)=t$.`,
  ],
  rubric: rubric({
    hypotheses: t`Le triplet et l'injection $H\hookrightarrow V'$ sont explicités.`,
    methode: 'La définition est écrite au sens des distributions à valeurs vectorielles.',
    validite: 'Les fonctions test sont à support compact, et le rôle de ce support est justifié.',
    justifications: 'L’unicité de la dérivée est démontrée.',
    conclusion: 'La définition exacte est obtenue, et vérifiée sur un exemple.',
  }),
  variant: {
    statement: t`Soit $v_0\in H$ et $u(t)=|t-T/2|\,v_0$. Montrer que $u\in L^2(0,T;H)$ admet une dérivée dans $L^2(0,T;H)$, et la calculer.`,
    solution: t`Pour $\varphi\in C^\infty_c(]0,T[)$, on coupe en $T/2$ et on intègre par parties sur chaque morceau ; les termes en $T/2$ s'annulent car $|t-T/2|$ s'y annule, et ceux en $0$ et $T$ par le support de $\varphi$. On obtient $\int_0^T\varphi'(t)|t-T/2|\,dt=-\int_0^T\varphi(t)\operatorname{sign}(t-T/2)\,dt$, donc $u'(t)=\operatorname{sign}(t-T/2)\,v_0$, fonction de $L^2(0,T;H)$, discontinue en $T/2$ : une dérivée faible n'a pas à être continue.`,
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'lions-magenes.intermediaire',
  theoremId: 'lions-magenes',
  level: 'intermediaire',
  title: t`Pourquoi $u(0)$ est défini dans $H$`,
  statement: t`Soient $V\hookrightarrow H\simeq H'\hookrightarrow V'$ un triplet de Hilbert dense et continu, avec $\|v\|_H\le c\|v\|_V$, et $W=\{u\in L^2(0,T;V) : u'\in L^2(0,T;V')\}$ muni de $\|u\|_W^2=\|u\|_{L^2(0,T;V)}^2+\|u'\|_{L^2(0,T;V')}^2$. Justifier que, pour $u\in W$, la valeur $u(0)$ est définie dans $H$ indépendamment du représentant, et que $u\mapsto u(0)$ est linéaire continue de $W$ dans $H$.`,
  source: poly(42, 'Exercice 22, intermédiaire'),
  prerequisites: [],
  concepts: ['valeur-initiale', 'lions-magenes-representant', 'lions-magenes-crochet', 'calcul-exact'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-triplet', kind: 'hypothese', text: t`$V\hookrightarrow H\simeq H'\hookrightarrow V'$ est un triplet de Hilbert dense et continu, et $\|v\|_H\le c\|v\|_V$ pour tout $v\in V$.` },
      { id: 'h-u', kind: 'hypothese', text: t`$u\in L^2(0,T;V)$ et $u'\in L^2(0,T;V')$.` },
      { id: 'thm', kind: 'application-theoreme', text: t`Il existe $\tilde u\in C([0,T];H)$ égale à $u$ presque partout ; $t\mapsto\|\tilde u(t)\|_H^2$ est absolument continue et $\tfrac12\tfrac{d}{dt}\|\tilde u(t)\|_H^2=\langle u'(t),u(t)\rangle_{V',V}$ presque partout.` },
      { id: 'd-deux', kind: 'definition', local: true, text: t`Soient $\tilde u_1,\tilde u_2\in C([0,T];H)$ deux représentants continus de $u$.` },
      { id: 'uni', kind: 'consequence', text: t`$\tilde u_1(t)=\tilde u_2(t)$ pour tout $t\in[0,T]$.` },
      { id: 'def0', kind: 'consequence', text: t`$u(0):=\tilde u(0)\in H$ est bien défini, indépendamment du représentant.` },
      { id: 'ident', kind: 'egalite', text: t`Pour $s,t\in[0,T]$ : $\|\tilde u(t)\|_H^2=\|\tilde u(s)\|_H^2+2\int_s^t\langle u',u\rangle_{V',V}\,dr$.` },
      { id: 'moy', kind: 'inegalite', text: t`$\|\tilde u(t)\|_H^2\le\dfrac1T\int_0^T\|u(s)\|_H^2\,ds+2\|u'\|_{L^2(0,T;V')}\|u\|_{L^2(0,T;V)}$ pour tout $t$.` },
      {
        id: 'est',
        kind: 'inegalite',
        text: t`$\|\tilde u(t)\|_H^2\le\big(1+\tfrac{c^2}{T}\big)\|u\|_W^2$ pour tout $t\in[0,T]$.`,
        masked: t`Constante $K(c,T)$ dans $\|\tilde u(t)\|_H^2\le K\|u\|_W^2$ : à calculer.`,
        check: { kind: 'expr-equiv', prompt: t`Constante $K$ obtenue en majorant $\frac1T\int_0^T\|u\|_H^2$ par $\frac{c^2}{T}\|u\|_{L^2(V)}^2$ et $2ab$ par $a^2+b^2$`, expected: '1+c^2/T', vars: ['c', 'T'] },
      },
      { id: 'fin', kind: 'conclusion', text: t`$u(0)$ est la valeur en $0$ de l'unique représentant continu de $u$, et $\|u(0)\|_H\le(1+c^2/T)^{1/2}\|u\|_W$ : $u\mapsto u(0)$ est linéaire continue de $W$ dans $H$.` },
      // Propositions plausibles mais fausses.
      { id: 'x-L2', kind: 'consequence', distractor: true, text: t`$u\in L^2(0,T;H)$ suffit pour définir $u(0)\in H$.` },
      { id: 'x-Vprime', kind: 'consequence', distractor: true, text: t`$u'\in L^2(0,T;V')$ suffit, sans hypothèse sur $u$, pour que $u(0)$ appartienne à $H$.` },
      { id: 'x-V', kind: 'consequence', distractor: true, after: ['def0'], text: t`Pour $u\in W$, on a toujours $u(0)\in V$.` },
    ],
    justifications: [
      { id: 'j-lm', label: 'Théorème de Lions–Magenes.', theorem: 'lions-magenes' },
      { id: 'j-ouvert', label: t`$\{t : \tilde u_1(t)\neq\tilde u_2(t)\}$ est un ouvert de $[0,T]$, négligeable : il est vide.` },
      { id: 'j-def', label: 'Évaluation en 0 du représentant continu, qui est unique.' },
      { id: 'j-ac', label: t`Une fonction absolument continue est l'intégrale de sa dérivée presque partout.` },
      { id: 'j-moyenne', label: t`Majoration $|\langle u',u\rangle|\le\|u'\|_{V'}\|u\|_V$, Cauchy–Schwarz en temps, puis moyenne en $s$ sur $[0,T]$.` },
      { id: 'j-young', label: t`$\|u(s)\|_H\le c\|u(s)\|_V$ et $2ab\le a^2+b^2$.` },
      { id: 'j-synthese', label: 'Réunion de la définition et de l’estimation ; linéarité de l’évaluation.' },
      { id: 'j-compact', label: t`Compacité de l'injection $V\hookrightarrow H$.` },
    ],
    rules: [
      { from: ['h-triplet', 'h-u'], to: 'thm', by: 'j-lm' },
      { from: ['d-deux'], to: 'uni', by: 'j-ouvert' },
      { from: ['thm', 'uni'], to: 'def0', by: 'j-def' },
      { from: ['thm'], to: 'ident', by: 'j-ac' },
      { from: ['ident'], to: 'moy', by: 'j-moyenne' },
      { from: ['moy', 'h-triplet'], to: 'est', by: 'j-young' },
      { from: ['def0', 'est'], to: 'fin', by: 'j-synthese' },
    ],
    traps: [
      {
        conclusion: 'thm',
        by: 'j-compact',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: 'Lions–Magenes ne suppose aucune compacité : seulement un triplet dense et continu, et les deux régularités de u.',
      },
      {
        conclusion: 'x-L2',
        verdict: 'incorrect',
        concept: 'valeur-initiale',
        message: t`Un élément de $L^2(0,T;H)$ est une classe modulo les ensembles négligeables, et $\{0\}$ en est un ; de plus l'évaluation en $0$ n'est pas continue pour cette norme.`,
        counterexample: t`$u_n(t)=\max(1-nt,0)\,v$ : $\|u_n\|_{L^2(0,T;H)}\to 0$ alors que $u_n(0)=v$.`,
      },
      {
        conclusion: 'x-Vprime',
        verdict: 'incorrect',
        concept: 'valeur-initiale',
        message: t`$u'\in L^2(0,T;V')$ seule donne une valeur initiale dans $V'$, pas dans $H$ : il faut coupler avec $u\in L^2(0,T;V)$.`,
        counterexample: t`$V=H^1_0(]0,1[)$ : $u\equiv\delta_{1/2}$, constante, vérifie $u'=0$, et $u(0)=\delta_{1/2}\in H^{-1}\setminus L^2$.`,
      },
      {
        conclusion: 'x-V',
        verdict: 'incorrect',
        concept: 'lions-magenes-representant',
        message: t`La trace en $0$ d'un élément de $W$ décrit tout $H$, pas seulement $V$.`,
        counterexample: t`$H=L^2(]0,1[)$, $V=H^1_0$, $\varphi_k=\sqrt2\sin(k\pi x)$, $\lambda_k=(k\pi)^2$ : pour $h=\sum_kh_k\varphi_k\in H\setminus V$, $u(t)=\sum_kh_ke^{-\lambda_kt}\varphi_k$ appartient à $W$, avec $\|u\|_W^2\le\|h\|_H^2$, et $u(0)=h$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-u',
        label: t`Retirer $u'\in L^2(0,T;V')$`,
        necessary: true,
        explanation: t`Sans régularité en temps, il n'y a ni représentant continu ni trace continue.`,
        counterexample: t`$u=\mathbb 1_{]T/2,T[}\,v$, $v\in V\setminus\{0\}$ : $u\in L^2(0,T;V)$ n'a pas de représentant continu ; et $u_n(t)=\max(1-nt,0)\,v$ tend vers $0$ dans $L^2(0,T;V)$ avec $u_n(0)=v$.`,
      },
    ],
  },
  closedChecks: [
    { kind: 'rational', prompt: t`Pour $T=2$ et $c=2$, valeur de la constante $1+c^2/T$`, expected: '3' },
  ],
  solution: t`**Représentant continu.** Lions–Magenes fournit $\tilde u\in C([0,T];H)$ égale à $u$ presque partout. Deux représentants continus coïncident partout : l'ensemble où ils diffèrent est ouvert dans $[0,T]$ et négligeable, donc vide. On pose $u(0)=\tilde u(0)\in H$.

**Estimation.** La fonction $t\mapsto\|\tilde u(t)\|_H^2$ étant absolument continue, $\|\tilde u(t)\|_H^2=\|\tilde u(s)\|_H^2+2\int_s^t\langle u',u\rangle$. Avec $|\langle u',u\rangle|\le\|u'\|_{V'}\|u\|_V$ et Cauchy–Schwarz en temps : $\|\tilde u(t)\|_H^2\le\|\tilde u(s)\|_H^2+2\|u'\|_{L^2(V')}\|u\|_{L^2(V)}$. En moyennant en $s$ sur $[0,T]$, puis avec $\|u\|_H\le c\|u\|_V$ et $2ab\le a^2+b^2$ :
$$\|\tilde u(t)\|_H^2\le\tfrac{c^2}{T}\|u\|_{L^2(V)}^2+\|u'\|_{L^2(V')}^2+\|u\|_{L^2(V)}^2\le\big(1+\tfrac{c^2}{T}\big)\|u\|_W^2.$$
L'évaluation en $0$ est donc linéaire continue de $W$ dans $H$.

**Ce qu'il faut les deux hypothèses.** $u\in L^2(0,T;H)$ seule ne définit pas $u(0)$ ; $u'\in L^2(0,T;V')$ seule ne place $u(0)$ que dans $V'$ ; et $u(0)$ n'est pas dans $V$ en général.`,
  steps: [
    'Invoquer Lions–Magenes pour obtenir un représentant continu à valeurs dans H.',
    'Démontrer l’unicité du représentant continu.',
    t`Intégrer l'identité de Lions–Magenes entre $s$ et $t$.`,
    t`Moyenner en $s$ et majorer pour obtenir la continuité de la trace.`,
  ],
  commonErrors: [
    { id: 'e-classe', description: t`Évaluer en $0$ un élément de $L^2(0,T;H)$.`, concept: 'valeur-initiale' },
    { id: 'e-espace', description: t`Placer $u(0)$ dans $V$, ou seulement dans $V'$.`, concept: 'lions-magenes-representant' },
  ],
  hints: [
    t`Un élément de $L^2(0,T;V)$ est une classe : qu'est-ce qui permet de choisir un représentant privilégié ?`,
    t`Lions–Magenes donne un représentant continu à valeurs dans $H$ ; montre qu'il est unique, puis intègre l'identité de dérivation entre $s$ et $t$.`,
    t`Moyenne en $s$ sur $[0,T]$ : le terme $\|\tilde u(s)\|_H^2$ devient $\frac1T\int_0^T\|u\|_H^2$.`,
  ],
  rubric: rubric({
    hypotheses: t`Les deux régularités $u\in L^2(0,T;V)$ et $u'\in L^2(0,T;V')$ sont utilisées.`,
    methode: 'Représentant continu, unicité, puis estimation de la trace.',
    validite: 'L’identité intégrée repose sur l’absolue continuité de la norme au carré.',
    justifications: 'L’unicité du représentant continu est démontrée.',
    conclusion: t`La trace est définie dans $H$ et continue sur $W$, avec une constante explicite.`,
  }),
  variant: {
    statement: t`Avec les mêmes notations, montrer que pour $u,v\in W$ et $0\le s\le t\le T$ : $(u(t),v(t))_H-(u(s),v(s))_H=\int_s^t\big(\langle u',v\rangle_{V',V}+\langle v',u\rangle_{V',V}\big)\,dr$.`,
    solution: t`On applique l'identité de Lions–Magenes à $u+v$ et à $u-v$, qui appartiennent à $W$, et l'on soustrait : $\|u+v\|_H^2-\|u-v\|_H^2=4(u,v)_H$, tandis que $\langle(u+v)',u+v\rangle-\langle(u-v)',u-v\rangle=2\langle u',v\rangle+2\langle v',u\rangle$. L'intégration entre $s$ et $t$ donne la formule d'intégration par parties.`,
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'lions-magenes.difficile',
  theoremId: 'lions-magenes',
  level: 'difficile',
  title: 'Unicité d’une solution faible d’évolution',
  statement: t`Soient $V\hookrightarrow H\simeq H'\hookrightarrow V'$ un triplet de Hilbert réels, dense et continu, $a:V\times V\to\mathbb R$ bilinéaire continue avec $a(v,v)\ge\alpha\|v\|_V^2$ ($\alpha>0$), $f\in L^2(0,T;V')$ et $u_0\in H$. Démontrer, en utilisant $\tfrac12\big(\|u\|_H^2\big)'=\langle u',u\rangle_{V',V}$, qu'il existe au plus une $u\in L^2(0,T;V)$, $u'\in L^2(0,T;V')$, telle que $\langle u'(t),v\rangle_{V',V}+a(u(t),v)=\langle f(t),v\rangle_{V',V}$ pour tout $v\in V$ et presque tout $t$, avec $u(0)=u_0$ dans $H$.`,
  source: poly(42, 'Exercice 22, difficile ; section 8.6 (p. PDF 33)'),
  prerequisites: [],
  concepts: ['lions-magenes-crochet', 'existence-unicite', 'valeur-initiale', 'hypotheses-theoreme'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-triplet', kind: 'hypothese', text: t`$V\hookrightarrow H\simeq H'\hookrightarrow V'$ est un triplet de Hilbert réels, dense et continu.` },
      { id: 'h-a', kind: 'hypothese', text: t`$a$ est bilinéaire continue sur $V$ et $a(v,v)\ge\alpha\|v\|_V^2$ pour tout $v\in V$, avec $\alpha>0$.` },
      { id: 'h-sol', kind: 'hypothese', text: t`$u_1,u_2\in L^2(0,T;V)$, $u_1',u_2'\in L^2(0,T;V')$ vérifient l'équation pour tout $v\in V$ et presque tout $t$, et $u_1(0)=u_2(0)=u_0$ dans $H$.` },
      { id: 'd-w', kind: 'definition', text: t`$w=u_1-u_2$, et $A:V\to V'$ défini par $\langle Az,v\rangle_{V',V}=a(z,v)$.` },
      { id: 'w-eq', kind: 'egalite', text: t`$w\in L^2(0,T;V)$, $w'\in L^2(0,T;V')$, et $\langle w'(t),v\rangle+a(w(t),v)=0$ pour tout $v\in V$ et presque tout $t$.` },
      { id: 'w-init', kind: 'egalite', text: t`$w(0)=0$ dans $H$.` },
      { id: 'w-Vp', kind: 'egalite', text: t`$w'(t)+Aw(t)=0$ dans $V'$ pour presque tout $t$, le négligeable ne dépendant pas de $v$.` },
      { id: 'lm', kind: 'application-theoreme', text: t`$t\mapsto\|w(t)\|_H^2$ est absolument continue et $\tfrac12\tfrac{d}{dt}\|w(t)\|_H^2=\langle w'(t),w(t)\rangle_{V',V}$ presque partout.` },
      { id: 'test', kind: 'egalite', text: t`Pour presque tout $t$ : $\tfrac12\tfrac{d}{dt}\|w(t)\|_H^2+a(w(t),w(t))=0$.` },
      { id: 'integ', kind: 'egalite', text: t`Pour tout $t\in[0,T]$ : $\tfrac12\|w(t)\|_H^2+\int_0^ta(w,w)\,ds=\tfrac12\|w(0)\|_H^2=0$.` },
      { id: 'coer', kind: 'inegalite', text: t`Pour tout $t\in[0,T]$ : $\tfrac12\|w(t)\|_H^2+\alpha\int_0^t\|w(s)\|_V^2\,ds\le 0$.` },
      { id: 'fin', kind: 'conclusion', text: t`$w=0$ : la solution faible est unique.` },
      // Propositions plausibles mais fausses.
      { id: 'x-test-deriv', kind: 'consequence', distractor: true, text: t`Pour toute solution faible $u$, quel que soit le second membre $f\in L^2(0,T;V')$, on peut tester l'équation par $v=u'(t)$, qui appartient à $V$.` },
      { id: 'x-produit-H', kind: 'consequence', distractor: true, after: ['lm'], text: t`$\langle w'(t),w(t)\rangle_{V',V}=(w'(t),w(t))_H$ pour presque tout $t$.` },
    ],
    justifications: [
      { id: 'j-diff', label: t`Linéarité : différence des deux équations, et $W$ est un espace vectoriel.` },
      { id: 'j-init', label: t`Les deux traces sont définies dans $H$ (représentants continus) et égales à $u_0$.` },
      { id: 'j-nul-Vp', label: t`$w'+Aw\in L^2(0,T;V')$ ; ses valeurs sont presque toutes dans un sous-espace séparable de $V'$, qu'une famille dénombrable de $v_j\in V$ suffit à tester : un seul négligeable convient.` },
      { id: 'j-lm', label: t`Théorème de Lions–Magenes appliqué à $w$.`, theorem: 'lions-magenes' },
      { id: 'j-test', label: t`On évalue l'identité de $V'$ sur $w(t)\in V$, puis on remplace $\langle w',w\rangle$ grâce à Lions–Magenes.` },
      { id: 'j-integrer', label: 'Intégration de 0 à t d’une dérivée de fonction absolument continue, puis condition initiale.' },
      { id: 'j-coer', label: t`Coercivité : $a(w,w)\ge\alpha\|w\|_V^2$.` },
      { id: 'j-positifs', label: t`Deux termes positifs de somme négative sont nuls : $\|w(t)\|_H=0$ pour tout $t$.` },
      { id: 'j-produit-H', label: t`Règle de dérivation du produit scalaire de $H$ : $\tfrac{d}{dt}\|w\|_H^2=2(w',w)_H$.` },
    ],
    rules: [
      { from: ['h-sol', 'd-w'], to: 'w-eq', by: 'j-diff' },
      { from: ['h-sol', 'h-triplet', 'd-w'], to: 'w-init', by: 'j-init' },
      { from: ['w-eq', 'h-a', 'd-w'], to: 'w-Vp', by: 'j-nul-Vp' },
      { from: ['h-triplet', 'w-eq'], to: 'lm', by: 'j-lm' },
      { from: ['w-Vp', 'lm'], to: 'test', by: 'j-test' },
      { from: ['test', 'lm', 'w-init'], to: 'integ', by: 'j-integrer' },
      { from: ['integ', 'h-a'], to: 'coer', by: 'j-coer' },
      { from: ['coer'], to: 'fin', by: 'j-positifs' },
    ],
    traps: [
      {
        conclusion: 'lm',
        by: 'j-produit-H',
        verdict: 'incorrect',
        concept: 'lions-magenes-crochet',
        message: t`$w'(t)$ n'appartient pas à $H$ en général : la dérivation classique du produit scalaire de $H$ ne s'applique pas. C'est exactement ce que fournit Lions–Magenes.`,
      },
      {
        conclusion: 'x-produit-H',
        verdict: 'a-justifier',
        concept: 'lions-magenes-crochet',
        message: t`Le membre de droite suppose $w'(t)\in H$, ce qui n'est pas acquis : seul le crochet de dualité $V',V$ a un sens.`,
      },
      {
        conclusion: 'x-test-deriv',
        verdict: 'incorrect',
        concept: 'lions-magenes-crochet',
        message: t`Les fonctions test doivent appartenir à $V$ ; $u'(t)$ n'est en général qu'un élément de $V'$.`,
        counterexample: t`$u(t,x)=F(4x-2-t)$ avec $F(y)=\max(0,1-|y|)$ appartient à $L^2(0,1;H^1_0(]0,1[))$, avec $u'\in L^2(0,1;V')$ : c'est la solution faible de second membre $f=u'+Au$, et $\partial_tu(t,\cdot)\notin H^1_0$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'w-init',
        label: 'Retirer la condition initiale',
        necessary: true,
        explanation: 'Sans condition initiale, l’équation seule ne détermine pas la solution.',
        counterexample: t`$V=H^1_0(]0,1[)$, $H=L^2$, $a(u,v)=\int_0^1u'v'$, $f=0$ : pour tout $k\in\mathbb R$, $u_k(t)=k\,e^{-\pi^2t}\sin(\pi x)$ est solution faible.`,
      },
      {
        hypothesis: 'h-a',
        label: 'Retirer la coercivité',
        necessary: true,
        explanation: t`Sans signe sur $a(w,w)$, l'identité intégrée ne donne plus la décroissance de $\|w(t)\|_H$ ; il faut alors un autre argument (Grönwall, sous une hypothèse de Gårding).`,
        counterexample: t`$V=H=\mathbb R$, $a(u,v)=-uv$ : $w(t)=e^tw(0)$ vérifie $w'+Aw=0$ et $|w(t)|>|w(0)|$ pour $t>0$ si $w(0)\neq 0$.`,
      },
    ],
  },
  closedChecks: [
    { kind: 'expr-equiv', prompt: t`Pour $w(t)=t\,v$ avec $v\in V$ et $\|v\|_H=1$, valeur de $\langle w'(t),w(t)\rangle_{V',V}$ en fonction de $t$`, expected: 't', vars: ['t'] },
  ],
  solution: t`**Réduction.** $w=u_1-u_2$ vérifie $w\in L^2(0,T;V)$, $w'\in L^2(0,T;V')$, $\langle w',v\rangle+a(w,v)=0$ pour tout $v\in V$ et presque tout $t$, et $w(0)=0$ dans $H$, les traces étant définies grâce à Lions–Magenes.

**Un seul négligeable.** Avec $\langle Az,v\rangle=a(z,v)$, la fonction $w'+Aw$ appartient à $L^2(0,T;V')$ et chacun de ses crochets avec $v\in V$ est nul presque partout. Ses valeurs étant presque toutes dans un sous-espace séparable de $V'$, une famille dénombrable de tests suffit : $w'(t)+Aw(t)=0$ dans $V'$ pour presque tout $t$. On peut donc évaluer en $v=w(t)$.

**Identité de Lions–Magenes.** $t\mapsto\|w(t)\|_H^2$ est absolument continue et $\tfrac12\tfrac{d}{dt}\|w\|_H^2=\langle w',w\rangle$ presque partout. D'où $\tfrac12\tfrac{d}{dt}\|w\|_H^2+a(w,w)=0$, puis, en intégrant (polycopié, section 8.6) :
$$\tfrac12\|w(t)\|_H^2+\int_0^ta(w,w)\,ds=\tfrac12\|w(0)\|_H^2=0.$$

**Conclusion.** Par coercivité, $\tfrac12\|w(t)\|_H^2+\alpha\int_0^t\|w\|_V^2\le 0$ : les deux termes sont nuls, donc $w=0$.

**Vigilance.** On ne teste pas par $w'(t)$, qui n'est pas dans $V$, et $\langle w',w\rangle$ n'est pas un produit scalaire de $H$.`,
  steps: [
    'Former la différence des deux solutions et sa condition initiale nulle.',
    t`Obtenir l'équation dans $V'$ hors d'un négligeable indépendant du test.`,
    t`Tester par $w(t)$ et utiliser l'identité de Lions–Magenes.`,
    'Intégrer en temps, puis conclure par coercivité.',
  ],
  commonErrors: [
    { id: 'e-produit', description: t`Dériver $\|w\|_H^2$ comme si $w'$ était à valeurs dans $H$.`, concept: 'lions-magenes-crochet' },
    { id: 'e-test', description: t`Tester l'équation par $w'(t)$, qui n'est pas dans $V$.`, concept: 'lions-magenes-crochet' },
    { id: 'e-init', description: 'Oublier la condition initiale, sans laquelle l’unicité est fausse.', concept: 'valeur-initiale' },
  ],
  hints: [
    'Quelle équation vérifie la différence de deux solutions, et avec quelle condition initiale ?',
    t`Teste par $v=w(t)$ : le terme $\langle w',w\rangle$ est une dérivée, à condition de disposer du bon théorème.`,
    t`Intègre $\tfrac12\tfrac{d}{dt}\|w\|_H^2+a(w,w)=0$ de $0$ à $t$, puis utilise $w(0)=0$ et la coercivité.`,
  ],
  rubric: rubric({
    hypotheses: 'Le triplet, la coercivité et la condition initiale sont utilisés.',
    methode: 'Test par la différence, identité de Lions–Magenes, intégration en temps.',
    validite: 'Le test par w(t) est justifié hors d’un négligeable indépendant du test.',
    justifications: 'L’identité de dérivation est attribuée à Lions–Magenes, non à une règle classique.',
    conclusion: 'L’unicité est établie pour tout t.',
  }),
  variant: {
    statement: t`Même question lorsque $a$ vérifie seulement l'inégalité de Gårding $a(v,v)+\lambda\|v\|_H^2\ge\alpha\|v\|_V^2$, avec $\lambda\ge 0$ et $\alpha>0$.`,
    solution: t`Pour $w=u_1-u_2$, on obtient comme avant $\tfrac12\tfrac{d}{dt}\|w\|_H^2+a(w,w)=0$ presque partout, donc $\tfrac12\tfrac{d}{dt}\|w\|_H^2\le\lambda\|w\|_H^2$. La fonction $e^{-2\lambda t}\|w(t)\|_H^2$ est absolument continue, de dérivée $e^{-2\lambda t}\big(\tfrac{d}{dt}\|w\|_H^2-2\lambda\|w\|_H^2\big)\le 0$ : elle décroît, donc $e^{-2\lambda t}\|w(t)\|_H^2\le\|w(0)\|_H^2=0$, et $w=0$.`,
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h-triplet', kind: 'hypothese', text: t`$V\hookrightarrow H\simeq H'\hookrightarrow V'$ est un triplet de Hilbert réels, dense et continu.` },
        { id: 'h-garding', kind: 'hypothese', text: t`$a(v,v)+\lambda\|v\|_H^2\ge\alpha\|v\|_V^2$ pour tout $v\in V$, avec $\lambda\ge 0$, $\alpha>0$.` },
        { id: 'h-w', kind: 'hypothese', text: t`$w\in L^2(0,T;V)$, $w'\in L^2(0,T;V')$, $w'(t)+Aw(t)=0$ dans $V'$ pour presque tout $t$, et $w(0)=0$.` },
        { id: 'lm', kind: 'application-theoreme', text: t`$t\mapsto\|w(t)\|_H^2$ est absolument continue et $\tfrac12\tfrac{d}{dt}\|w\|_H^2=\langle w',w\rangle_{V',V}=-a(w,w)$ presque partout.` },
        { id: 'maj', kind: 'inegalite', text: t`$\tfrac12\tfrac{d}{dt}\|w(t)\|_H^2\le\lambda\|w(t)\|_H^2$ presque partout.` },
        { id: 'facteur', kind: 'inegalite', text: t`$\tfrac{d}{dt}\big(e^{-2\lambda t}\|w(t)\|_H^2\big)\le 0$ presque partout.` },
        { id: 'decr', kind: 'inegalite', text: t`$e^{-2\lambda t}\|w(t)\|_H^2\le\|w(0)\|_H^2=0$ pour tout $t\in[0,T]$.` },
        { id: 'fin', kind: 'conclusion', text: t`$w=0$ : unicité sous l'hypothèse de Gårding.` },
        { id: 'x-direct', kind: 'consequence', distractor: true, after: ['lm'], text: t`Sous la seule hypothèse de Gårding, toute solution de $w'+Aw=0$, quelle que soit sa valeur initiale, vérifie $\tfrac{d}{dt}\|w(t)\|_H^2\le 0$ presque partout.` },
      ],
      justifications: [
        { id: 'j-lm', label: t`Lions–Magenes appliqué à $w$, puis évaluation de l'équation sur $w(t)$.`, theorem: 'lions-magenes' },
        { id: 'j-garding', label: t`$-a(w,w)\le\lambda\|w\|_H^2-\alpha\|w\|_V^2\le\lambda\|w\|_H^2$.` },
        { id: 'j-produit', label: t`Dérivée d'un produit de fonctions absolument continues : $e^{-2\lambda t}\big(\tfrac{d}{dt}\|w\|_H^2-2\lambda\|w\|_H^2\big)$.` },
        { id: 'j-decroit', label: 'Une fonction absolument continue de dérivée négative presque partout est décroissante ; condition initiale nulle.' },
        { id: 'j-positif', label: t`$e^{-2\lambda t}>0$ et une norme au carré négative est nulle.` },
      ],
      rules: [
        { from: ['h-triplet', 'h-w'], to: 'lm', by: 'j-lm' },
        { from: ['lm', 'h-garding'], to: 'maj', by: 'j-garding' },
        { from: ['maj', 'lm'], to: 'facteur', by: 'j-produit' },
        { from: ['facteur', 'h-w'], to: 'decr', by: 'j-decroit' },
        { from: ['decr'], to: 'fin', by: 'j-positif' },
      ],
      traps: [
        {
          conclusion: 'x-direct',
          verdict: 'incorrect',
          concept: 'hypotheses-theoreme',
          message: t`Sous Gårding, $a(w,w)$ peut être négatif : seul $\tfrac12\tfrac{d}{dt}\|w\|_H^2\le\lambda\|w\|_H^2$ est acquis, d'où le facteur $e^{-2\lambda t}$.`,
          counterexample: t`$V=H=\mathbb R$, $a(u,v)=-uv$ vérifie Gårding avec $\lambda=2$, $\alpha=1$ ; $w(t)=e^tw_0$ résout $w'+Aw=0$ et $|w|^2$ croît si $w_0\neq 0$.`,
        },
      ],
      removable: [
        {
          hypothesis: 'h-garding',
          label: 'Retirer l’hypothèse de Gårding',
          necessary: true,
          explanation: t`Sans minoration de $a(w,w)$, la dérivée de $\|w\|_H^2$ n'est plus contrôlée par $\|w\|_H^2$.`,
          counterexample: t`$V=H^1_0(]0,1[)$, $H=L^2(]0,1[)$, $a(u,v)=-\int_0^1\partial_xu\,\partial_xv$, qui ne vérifie aucune inégalité de Gårding : $w_k(t)=e^{k^2\pi^2t}\sin(k\pi x)$ vérifie $w_k'+Aw_k=0$ et $\tfrac12\tfrac{d}{dt}\|w_k\|_H^2=k^2\pi^2\|w_k\|_H^2$, si bien qu'aucune constante $\lambda$ ne convient pour tous les $k$.`,
        },
      ],
    },
  },
  verification: FROM_POLY,
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT22: TheoremModule = {
  theorem: {
    id: 'lions-magenes',
    spaces: [
      t`$V\hookrightarrow H\simeq H'\hookrightarrow V'$ : triplet de Hilbert réels ; $V$ s'injecte continûment et densément dans $H$, identifié à son dual par Riesz, d'où $H\hookrightarrow V'$.`,
      t`$\langle\cdot,\cdot\rangle_{V',V}$ : dualité, qui prolonge le produit scalaire de $H$ : $\langle h,v\rangle_{V',V}=(h,v)_H$ pour $h\in H$, $v\in V$.`,
      t`$u'$ : dérivée au sens des distributions sur $]0,T[$, à valeurs dans $V'$.`,
    ],
    hypotheses: [
      {
        id: 'h-triplet',
        text: t`$V\hookrightarrow H\simeq H'\hookrightarrow V'$ est un triplet de Hilbert dense et continu.`,
        whenRemoved: t`Sans densité, $H\to V'$ n'est plus injective : si $V=\mathrm{Vect}(e)$ dans $\ell^2$, tout $h\perp e$ a une image nulle dans $V'$.`,
      },
      { id: 'h-u', text: t`$u\in L^2(0,T;V)$.` },
      {
        id: 'h-up',
        text: t`$u'\in L^2(0,T;V')$.`,
        whenRemoved: t`$u=\mathbb 1_{]T/2,T[}\,v$, $v\in V\setminus\{0\}$, appartient à $L^2(0,T;V)$ sans représentant continu : $\|u(t)\|_H^2$ saute de $0$ à $\|v\|_H^2$ en $T/2$.`,
      },
    ],
    statement: t`Si $V\hookrightarrow H\simeq H'\hookrightarrow V'$ est un triplet de Hilbert dense et continu, et $u\in L^2(0,T;V)$, $u'\in L^2(0,T;V')$, alors $u$ admet un représentant dans $C([0,T];H)$ et
$$\frac12\frac{d}{dt}\|u(t)\|_H^2=\langle u'(t),u(t)\rangle_{V',V}\quad\text{p.p.}$$`,
    conclusions: {
      regularite: t`$u$ admet un représentant dans $C([0,T];H)$, unique, ce qui donne un sens à $u(0)$ et $u(T)$ dans $H$.`,
      autre: t`Identité de dérivation presque partout, la fonction $t\mapsto\|u(t)\|_H^2$ étant absolument continue.`,
    },
    sourceProof: 'idee',
    proofOutline: [
      t`Prolonger $u$ au-delà de $[0,T]$ par réflexion, puis régulariser en temps par convolution : $u_\varepsilon\in C^1(\mathbb R;V)$, $u_\varepsilon\to u$ dans $L^2(V)$ et $u_\varepsilon'\to u'$ dans $L^2(V')$ sur $]0,T[$.`,
      t`Pour une fonction régulière, $\tfrac{d}{dt}\|u_\varepsilon(t)\|_H^2=2(u_\varepsilon',u_\varepsilon)_H=2\langle u_\varepsilon',u_\varepsilon\rangle_{V',V}$.`,
      t`Appliquée à $u_\varepsilon-u_\eta$, intégrée puis moyennée en temps, cette identité montre que $(u_\varepsilon)$ est de Cauchy dans $C([0,T];H)$.`,
      t`La limite est un représentant continu de $u$ ; l'identité intégrée $\|u(t)\|_H^2=\|u(s)\|_H^2+2\int_s^t\langle u',u\rangle$ passe à la limite par la dualité $V',V$.`,
    ],
    warnings: [
      t`Le crochet $\langle u',u\rangle_{V',V}$ n'est pas un produit scalaire de $H$ : $u'(t)$ n'appartient pas à $H$ en général.`,
      t`L'identité s'entend avec $t\mapsto\|u(t)\|_H^2$ absolument continue : c'est ce qui autorise à l'intégrer entre deux instants.`,
      t`$u(0)$ n'a de sens que pour le représentant continu : une classe de $L^2(0,T;H)$ n'a pas de valeur en un point.`,
    ],
    usefulFor: 'Vérification des données initiales et démonstration d’unicité pour une solution faible d’évolution.',
    verification: FROM_POLY,
  },
  definitions: [
    {
      id: 'lm-triplet',
      term: 'Triplet de Hilbert',
      statement: t`$V\hookrightarrow H\simeq H'\hookrightarrow V'$ : $V$ s'injecte continûment et densément dans $H$ ; $H$ est identifié à son dual, et $h\in H$ agit sur $V$ par $v\mapsto(h,v)_H$.`,
      source: poly(21, 'Section 5.4'),
    },
    {
      id: 'lm-derivee-faible',
      term: t`Dérivée dans $L^2(0,T;V')$`,
      statement: t`Pour $u\in L^2(0,T;V)$, $u'=g\in L^2(0,T;V')$ signifie $\int_0^T\varphi'u\,dt=-\int_0^T\varphi g\,dt$ dans $V'$ pour toute $\varphi\in C^\infty_c(]0,T[)$.`,
      source: complement('Définition standard ; utilisée à la section 8.4 du polycopié'),
    },
  ],
  concepts: [
    {
      id: 'lions-magenes-crochet',
      label: 'Crochet de dualité et produit scalaire',
      reminder: t`$\langle u',u\rangle_{V',V}$ n'est pas $(u',u)_H$ : $u'(t)\in V'$ seulement. L'identité $\tfrac12\tfrac{d}{dt}\|u\|_H^2=\langle u',u\rangle$ est un théorème, pas une règle de calcul.`,
    },
    {
      id: 'lions-magenes-representant',
      label: 'Représentant continu',
      reminder: t`La valeur $u(t)$ est celle de l'unique représentant continu à valeurs dans $H$ ; elle ne se place ni dans $V$ en général, ni seulement dans $V'$.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-lm-l2-seul',
      theoremId: 'lions-magenes',
      title: t`Sans dérivée dans $L^2(0,T;V')$`,
      claim: t`Toute $u\in L^2(0,T;V)$ admet un représentant dans $C([0,T];H)$.`,
      correctStatement: t`Il faut aussi $u'\in L^2(0,T;V')$.`,
      task: t`$T=2$, $v\in V$ avec $\|v\|_H=1$, $u=\mathbb 1_{]1,2[}\,v$. Donne les limites de $\|u(t)\|_H$ quand $t\to 1^-$ et $t\to 1^+$.`,
      check: { kind: 'rational-vector', prompt: t`Limites à gauche et à droite de $\|u(t)\|_H$ en $t=1$`, expected: ['0', '1'], labels: ['gauche', 'droite'] },
      explanation: t`Tout représentant coïncide presque partout avec $u$ ; un représentant continu aurait des limites égales à gauche et à droite de $1$, ce qui est impossible.`,
      concept: 'valeur-initiale',
      source: complement('Contre-exemple classique, hors polycopié'),
    },
    {
      id: 'ce-lm-derivee-seule',
      theoremId: 'lions-magenes',
      title: t`Valeur initiale dans $V'$ seulement`,
      claim: t`Si $u'\in L^2(0,T;V')$, alors $u(0)$ est défini dans $H$.`,
      correctStatement: t`Il faut coupler $u\in L^2(0,T;V)$ et $u'\in L^2(0,T;V')$ ; sinon $u(0)$ n'est défini que dans $V'$.`,
      task: t`$V=H^1_0(]0,1[)$, $H=L^2(]0,1[)$, $u\equiv\delta_{1/2}$, constante en temps. À quel espace appartient $u(0)$ ?`,
      check: {
        kind: 'choice',
        prompt: t`Espace contenant $u(0)$`,
        options: [t`$H^{-1}(]0,1[)$, mais pas $L^2(]0,1[)$`, t`$L^2(]0,1[)$`, t`$H^1_0(]0,1[)$`, t`Aucun : $u(0)$ n'a pas de sens`],
        correct: [0],
        explanation: t`$u'=0\in L^2(0,T;V')$ et $u(0)=\delta_{1/2}$, élément de $H^{-1}$ qui n'est pas une fonction de $L^2$ ; mais $u\notin L^2(0,T;V)$.`,
      },
      explanation: t`La distribution de Dirac en $1/2$ est continue sur $H^1_0(]0,1[)\subset C([0,1])$, sans être représentée par une fonction de $L^2$ : la seule régularité de la dérivée ne place pas la trace dans $H$.`,
      concept: 'lions-magenes-representant',
      source: complement('Contre-exemple classique, hors polycopié'),
    },
    {
      id: 'ce-lm-facteur',
      theoremId: 'lions-magenes',
      title: 'Le facteur 1/2',
      claim: t`$\tfrac{d}{dt}\|u(t)\|_H^2=\langle u'(t),u(t)\rangle_{V',V}$.`,
      correctStatement: t`$\tfrac12\tfrac{d}{dt}\|u(t)\|_H^2=\langle u'(t),u(t)\rangle_{V',V}$ presque partout.`,
      task: t`Pour $u(t)=t\,v$ avec $v\in V$ et $\|v\|_H=1$, calcule $\tfrac{d}{dt}\|u(t)\|_H^2$ en fonction de $t$.`,
      check: { kind: 'expr-equiv', prompt: t`Valeur de $\tfrac{d}{dt}\|u(t)\|_H^2$`, expected: '2*t', vars: ['t'] },
      explanation: t`$\|u(t)\|_H^2=t^2$ a pour dérivée $2t$, tandis que $\langle u'(t),u(t)\rangle=(v,tv)_H=t$ : le facteur $\tfrac12$ est nécessaire.`,
      concept: 'calcul-exact',
      source: poly(21, 'Énoncé de Lions–Magenes, section 5.4'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT22;
