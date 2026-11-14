/**
 * Résultat 6 — Application ouverte et inverse borné.
 * Le polycopié (p. PDF 9) ne donne qu'une idée de preuve : la démonstration complète
 * (variante de l'exercice difficile) est un complément rédigé pour ProofLab.
 */
import { t, rubric, poly, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/** Contre-exemple de référence : bijection continue dont l'inverse ne l'est pas. */
const J_EXEMPLE = t`$J=\mathrm{Id}:(C([0,1]),\|\cdot\|_\infty)\to(C([0,1]),\|\cdot\|_1)$ est linéaire, bijective et continue ; pour $f_n(x)=x^n$, $\|f_n\|_\infty=1$ et $\|f_n\|_1=\frac1{n+1}$, donc $J^{-1}$ n'est pas continue.`;

/** Contre-exemple non constructif : espace de départ non complet. */
const HAMEL_DEPART = t`Soient $E$ un espace de Banach de dimension infinie, $\varphi$ une forme linéaire non continue sur $E$ (construite à l'aide d'une base algébrique) et $\|x\|'=\|x\|+|\varphi(x)|$. L'identité $(E,\|\cdot\|')\to(E,\|\cdot\|)$ est une bijection linéaire continue dont l'inverse n'est pas continu : $(E,\|\cdot\|')$ n'est pas complet.`;

/** Forme non coercive dont l'opérateur variationnel est bijectif. */
const NON_COERCIVE = t`Sur $\Omega=]0,1[$, $a(u,v)=\int_0^1u'v'-2\pi^2\int_0^1uv$ : l'opérateur $L$ est bijectif, car $2\pi^2$ n'est pas valeur propre de $-\frac{d^2}{dx^2}$ avec condition de Dirichlet, et pourtant $a(\varphi,\varphi)=-\pi^2/2<0$ pour $\varphi(x)=\sin(\pi x)$.`;

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'application-ouverte.facile',
  theoremId: 'application-ouverte',
  level: 'facile',
  title: 'Pourquoi l’inverse d’une bijection continue entre Banach est continu',
  statement: t`Soient $X,Y$ deux espaces de Banach et $T\in\mathcal L(X,Y)$ bijectif. Expliquer, à partir de l'ouverture de $T$, pourquoi $T^{-1}$ est linéaire et continu. Montrer ensuite que l'assertion voisine « toute bijection linéaire continue entre espaces normés a un inverse continu » est fausse : sur $E=C([0,1])$, avec $\|f\|_1=\int_0^1|f|$, l'identité $J:(E,\|\cdot\|_\infty)\to(E,\|\cdot\|_1)$ est une bijection linéaire continue dont l'inverse n'est pas continu.`,
  source: poly(39, 'Annexe B, exercice 6, facile'),
  prerequisites: [],
  concepts: ['complet-necessaire', 'hypotheses-theoreme', 'justification-absente', 'application-ouverte-norme-inverse'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'topologique', label: 'Continuité par images réciproques d’ouverts' },
      { id: 'boule', label: 'Continuité par une boule contenue dans l’image de la boule unité' },
    ],
    nodes: [
      { id: 'h-X', kind: 'hypothese', text: t`$X$ est un espace de Banach.` },
      { id: 'h-Y', kind: 'hypothese', text: t`$Y$ est un espace de Banach.` },
      { id: 'h-T', kind: 'hypothese', text: t`$T:X\to Y$ est linéaire et continu.` },
      { id: 'h-bij', kind: 'hypothese', text: t`$T$ est bijectif.` },
      { id: 'd-U', kind: 'definition', local: true, text: t`Soit $U$ un ouvert de $X$.` },
      { id: 'd-J', kind: 'definition', text: t`$E=C([0,1])$ ; $(E,\|\cdot\|_\infty)$ est un espace de Banach, $\|f\|_1=\int_0^1|f|$, et $J=\mathrm{Id}:(E,\|\cdot\|_\infty)\to(E,\|\cdot\|_1)$.` },

      { id: 'surj', kind: 'consequence', text: t`$T$ est surjectif.` },
      { id: 'ao', kind: 'application-theoreme', text: t`$T$ est ouverte : l'image par $T$ de tout ouvert de $X$ est un ouvert de $Y$.` },
      { id: 'lin-inv', kind: 'consequence', text: t`$T^{-1}:Y\to X$ est linéaire.` },

      { id: 'pre', kind: 'egalite', text: t`$(T^{-1})^{-1}(U)=T(U)$.` },
      { id: 'pre-ouv', kind: 'consequence', text: t`$(T^{-1})^{-1}(U)$ est ouvert dans $Y$.` },

      { id: 'b-0', kind: 'inclusion', text: t`Il existe $\delta>0$ tel que $B_Y(0,\delta)\subset T\big(B_X(0,1)\big)$.` },
      { id: 'b-est', kind: 'inegalite', text: t`$\|T^{-1}y\|_X\le\frac2\delta\|y\|_Y$ pour tout $y\in Y$.` },

      { id: 'cont', kind: 'consequence', text: t`$T^{-1}$ est continu.` },
      { id: 'inv', kind: 'consequence', text: t`$T^{-1}\in\mathcal L(Y,X)$.` },

      { id: 'J-cont', kind: 'inegalite', text: t`$J$ est linéaire, bijective et continue : $\|f\|_1\le\|f\|_\infty$.` },
      {
        id: 'J-fn',
        kind: 'egalite',
        text: t`Pour $f_n(x)=x^n$ : $\|f_n\|_\infty=1$ et $\|f_n\|_1=\frac1{n+1}$.`,
        masked: t`Normes de $f_n(x)=x^n$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\|f_3\|_1$ pour $f_3(x)=x^3$`, expected: '1/4' },
      },
      { id: 'J-noncont', kind: 'consequence', text: t`$J^{-1}$ n'est pas continue : $\|J^{-1}f_n\|_\infty/\|f_n\|_1=n+1$ n'est pas borné.` },
      { id: 'J-nonbanach', kind: 'consequence', text: t`$(E,\|\cdot\|_1)$ n'est pas complet.` },

      { id: 'fin', kind: 'conclusion', text: t`Entre deux Banach, $T^{-1}\in\mathcal L(Y,X)$ ; sans complétude de l'espace d'arrivée, une bijection linéaire continue peut avoir un inverse discontinu, comme $J$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-toujours', kind: 'consequence', distractor: true, after: ['inv'], text: t`Toute bijection linéaire continue entre espaces normés a un inverse continu.` },
      { id: 'x-norme-inv', kind: 'egalite', distractor: true, after: ['inv'], text: t`$\|T^{-1}\|_{\mathcal L(Y,X)}=1/\|T\|_{\mathcal L(X,Y)}$.` },
    ],
    justifications: [
      { id: 'j-bij', label: 'Une bijection est en particulier surjective.' },
      { id: 'j-ao', label: 'Théorème de l’application ouverte.', theorem: 'application-ouverte' },
      { id: 'j-lin-inv', label: t`Pour $y,y'\in Y$ et $\lambda$ réel, $T(\lambda T^{-1}y+T^{-1}y')=\lambda y+y'$ ; on conclut par injectivité de $T$.` },
      { id: 'j-pre', label: t`$y\in(T^{-1})^{-1}(U)\iff T^{-1}y\in U\iff y\in T(U)$, par bijectivité.` },
      { id: 'j-ouv', label: 'Ouverture de $T$, appliquée à l’ouvert $U$.' },
      { id: 'j-cont-top', label: 'Caractérisation de la continuité par les images réciproques d’ouverts, l’ouvert $U$ étant quelconque.' },
      { id: 'j-ouvert-0', label: t`$T\big(B_X(0,1)\big)$ est un ouvert de $Y$ qui contient $T0=0$.` },
      { id: 'j-homog', label: t`Pour $y\neq 0$, le point $\frac{\delta}{2\|y\|_Y}y$ est dans $B_Y(0,\delta)$, et son unique antécédent est dans $B_X(0,1)$ ; homogénéité de $T^{-1}$.` },
      { id: 'j-borne-cont', label: t`Une application linéaire vérifiant $\|T^{-1}y\|_X\le C\|y\|_Y$ est continue.` },
      { id: 'j-def-L', label: t`Définition de $\mathcal L(Y,X)$ : linéaire et continu.` },
      { id: 'j-maj-J', label: t`$|f|\le\|f\|_\infty$ sur $[0,1]$, intervalle de longueur $1$.` },
      { id: 'j-calc-fn', label: t`$\int_0^1x^n\,dx=\frac1{n+1}$ et $\max_{[0,1]}x^n=1$.` },
      { id: 'j-ratio', label: t`Une application linéaire continue vérifierait $\|J^{-1}f\|_\infty\le C\|f\|_1$, ce que le rapport $n+1$ interdit.` },
      { id: 'j-contra', label: t`Contraposée du théorème : si $(E,\|\cdot\|_1)$ était complet, $J^{-1}$ serait continue.`, theorem: 'application-ouverte' },
      { id: 'j-syn', label: 'Réunion des propriétés établies.' },
      // Justifications séduisantes, fausses ou hors de propos.
      { id: 'j-inv-auto', label: 'L’inverse d’une bijection continue est automatiquement continu.' },
      { id: 'j-compact', label: 'Une bijection continue d’un compact sur un espace séparé est un homéomorphisme.' },
      { id: 'j-ao-direct', label: t`Le théorème affirme directement que $T^{-1}$ est continu.`, theorem: 'application-ouverte' },
    ],
    rules: [
      { from: ['h-bij'], to: 'surj', by: 'j-bij' },
      { from: ['h-X', 'h-Y', 'h-T', 'surj'], to: 'ao', by: 'j-ao' },
      { from: ['h-T', 'h-bij'], to: 'lin-inv', by: 'j-lin-inv' },

      { from: ['h-bij', 'd-U'], to: 'pre', by: 'j-pre', path: 'topologique' },
      { from: ['pre', 'ao'], to: 'pre-ouv', by: 'j-ouv', path: 'topologique' },
      { from: ['pre-ouv'], to: 'cont', by: 'j-cont-top', path: 'topologique' },

      { from: ['ao', 'h-T'], to: 'b-0', by: 'j-ouvert-0', path: 'boule' },
      { from: ['b-0', 'h-bij', 'lin-inv'], to: 'b-est', by: 'j-homog', path: 'boule' },
      { from: ['b-est', 'lin-inv'], to: 'cont', by: 'j-borne-cont', path: 'boule' },

      { from: ['lin-inv', 'cont'], to: 'inv', by: 'j-def-L' },

      { from: ['d-J'], to: 'J-cont', by: 'j-maj-J' },
      { from: ['d-J'], to: 'J-fn', by: 'j-calc-fn' },
      { from: ['J-fn'], to: 'J-noncont', by: 'j-ratio' },
      { from: ['J-cont', 'J-noncont', 'd-J'], to: 'J-nonbanach', by: 'j-contra' },

      { from: ['inv', 'J-cont', 'J-noncont', 'J-nonbanach'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-toujours',
        verdict: 'incorrect',
        concept: 'complet-necessaire',
        message: 'La complétude des deux espaces est indispensable : sans elle, l’inverse peut ne pas être continu.',
        counterexample: J_EXEMPLE,
      },
      {
        conclusion: 'x-norme-inv',
        verdict: 'incorrect',
        concept: 'application-ouverte-norme-inverse',
        message: t`On a seulement $\|T\|\,\|T^{-1}\|\ge 1$ : la norme de l'inverse n'est pas déterminée par celle de $T$.`,
        counterexample: t`$T=\mathrm{diag}(1,2)$ sur $\mathbb R^2$ euclidien : $\|T\|=2$ et $\|T^{-1}\|=1\neq\frac12$.`,
      },
      {
        conclusion: 'cont',
        by: 'j-inv-auto',
        verdict: 'incorrect',
        concept: 'complet-necessaire',
        message: 'Cette règle est fausse en dimension infinie : c’est le théorème de l’application ouverte, avec ses hypothèses de complétude, qui fournit la continuité.',
        counterexample: J_EXEMPLE,
      },
      {
        conclusion: 'cont',
        by: 'j-compact',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Le résultat cité suppose l'espace de départ compact. Un espace normé non réduit à $\{0\}$ n'est jamais compact : il contient les points $nx$, $n\in\mathbb N$, de normes non bornées.`,
      },
      {
        conclusion: 'cont',
        by: 'j-ao-direct',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`C'est précisément l'énoncé à expliquer : déduis-le de l'ouverture de $T$, par les images réciproques d'ouverts ou par une boule contenue dans $T(B_X(0,1))$.`,
      },
      {
        conclusion: 'inv',
        by: 'j-ao-direct',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`L'exercice demande pourquoi l'inverse est continu : établis d'abord la linéarité de $T^{-1}$, puis sa continuité à partir de l'ouverture de $T$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-Y',
        label: t`Retirer la complétude de $Y$`,
        necessary: true,
        explanation: 'Le théorème de l’application ouverte ne s’applique plus.',
        counterexample: J_EXEMPLE,
      },
      {
        hypothesis: 'h-X',
        label: t`Retirer la complétude de $X$`,
        necessary: true,
        explanation: 'Le théorème ne s’applique plus ; un contre-exemple existe, mais il n’est pas explicite.',
        counterexample: HAMEL_DEPART,
      },
      {
        hypothesis: 'h-bij',
        label: t`Retirer la bijectivité de $T$`,
        necessary: true,
        explanation: t`Sans surjectivité, $T$ n'est pas ouverte en général, et l'inverse défini sur l'image peut être discontinu.`,
        counterexample: t`Sur $\ell^2$, $Tx=(x_k/k)_k$ est injectif et continu, mais $\|e_n\|=1$ et $\|Te_n\|=1/n$ : l'inverse défini sur $T(\ell^2)$ n'est pas continu.`,
      },
    ],
  },
  closedChecks: [
    {
      kind: 'choice',
      prompt: t`Quelle hypothèse du théorème fait défaut à $J$ ?`,
      options: [
        t`La continuité de $J$`,
        t`La complétude de l'espace d'arrivée $(E,\|\cdot\|_1)$`,
        t`La complétude de l'espace de départ $(E,\|\cdot\|_\infty)$`,
        t`La bijectivité de $J$`,
      ],
      correct: [1],
      explanation: t`$J$ est continue et bijective, $(E,\|\cdot\|_\infty)$ est complet ; seul $(E,\|\cdot\|_1)$ ne l'est pas, sans quoi $J^{-1}$ serait continue.`,
    },
  ],
  solution: t`**Ouverture.** $T$ est bijectif, donc surjectif ; $X$ et $Y$ étant des Banach, le théorème de l'application ouverte montre que $T$ est ouverte.

**Linéarité de l'inverse.** Pour $y,y'\in Y$ et $\lambda$ réel, $T(\lambda T^{-1}y+T^{-1}y')=\lambda y+y'$, donc $T^{-1}(\lambda y+y')=\lambda T^{-1}y+T^{-1}y'$.

**Continuité.** Pour tout ouvert $U$ de $X$, $(T^{-1})^{-1}(U)=T(U)$ est ouvert : $T^{-1}$ est continu. Autre voie : $T(B_X(0,1))$ est un ouvert contenant $0$, donc contient une boule $B_Y(0,\delta)$. Pour $y\neq 0$, $y'=\frac{\delta}{2\|y\|_Y}y$ a son unique antécédent dans $B_X(0,1)$, d'où $\|T^{-1}y\|_X<\frac2\delta\|y\|_Y$.

**Assertion voisine fausse.** $J$ est linéaire, bijective, et $\|f\|_1\le\|f\|_\infty$. Pour $f_n(x)=x^n$, $\|f_n\|_\infty=1$ et $\|f_n\|_1=\frac1{n+1}$ : le rapport $\|J^{-1}f_n\|_\infty/\|f_n\|_1=n+1$ n'est pas borné, donc $J^{-1}$ n'est pas continue. Par contraposée du théorème, $(E,\|\cdot\|_1)$ n'est pas complet : c'est la complétude de l'espace d'arrivée qui fait défaut.`,
  steps: [
    'Passer de la bijectivité à la surjectivité et appliquer le théorème.',
    t`Établir la linéarité de $T^{-1}$.`,
    t`Traduire l'ouverture de $T$ en continuité de $T^{-1}$.`,
    t`Exhiber la suite $f_n(x)=x^n$ pour l'exemple $J$.`,
    'Identifier l’hypothèse qui manque à l’exemple.',
  ],
  commonErrors: [
    { id: 'e-auto', description: 'Croire que l’inverse d’une bijection linéaire continue est toujours continu.', concept: 'complet-necessaire' },
    { id: 'e-norme', description: t`Écrire $\|T^{-1}\|=1/\|T\|$.`, concept: 'application-ouverte-norme-inverse' },
    { id: 'e-citation', description: 'Citer la conclusion du théorème au lieu d’expliquer comment l’ouverture la fournit.', concept: 'justification-absente' },
  ],
  hints: [
    t`La continuité de $T^{-1}$ porte sur les images réciproques par $T^{-1}$ : à quoi ressemble l'image réciproque d'un ouvert $U$ de $X$ ?`,
    t`Montre que $(T^{-1})^{-1}(U)=T(U)$, puis invoque l'ouverture de $T$. Pour $J$, compare les deux normes sur $f_n(x)=x^n$.`,
    t`$\int_0^1x^n\,dx=\frac1{n+1}$ alors que $\max_{[0,1]}x^n=1$ : le rapport des normes tend vers $+\infty$.`,
  ],
  rubric: rubric({
    hypotheses: t`La complétude de $X$ et de $Y$ et la surjectivité sont vérifiées avant d'invoquer le théorème.`,
    methode: t`La continuité de $T^{-1}$ est déduite de l'ouverture de $T$.`,
    validite: t`La linéarité de $T^{-1}$ est établie, et le contre-exemple $J$ est calculé exactement.`,
    justifications: 'L’hypothèse qui manque à l’exemple est identifiée.',
    conclusion: 'Le résultat et sa limite de validité sont énoncés.',
  }),
  variant: {
    statement: t`Soient $\|\cdot\|_a$ et $\|\cdot\|_b$ deux normes sur un même espace vectoriel $E$, pour lesquelles $E$ est complet, et telles que $\|x\|_a\le C\|x\|_b$ pour tout $x\in E$. Montrer que les deux normes sont équivalentes.`,
    solution: t`L'identité $I:(E,\|\cdot\|_b)\to(E,\|\cdot\|_a)$ est linéaire, bijective et continue, car $\|Ix\|_a\le C\|x\|_b$. Les deux espaces étant de Banach, le théorème de l'application ouverte donne $I^{-1}$ continue : il existe $C'$ tel que $\|x\|_b\le C'\|x\|_a$. Ainsi $\frac1{C'}\|x\|_b\le\|x\|_a\le C\|x\|_b$ (si $E\neq\{0\}$, $C'>0$). La complétude des deux normes est indispensable : $\|\cdot\|_1\le\|\cdot\|_\infty$ sur $C([0,1])$, sans équivalence.`,
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'application-ouverte.intermediaire',
  theoremId: 'application-ouverte',
  level: 'intermediaire',
  title: t`L’estimation $\|u\|\le C\|Tu\|$ pour un isomorphisme borné`,
  statement: t`Soient $X,Y$ deux espaces de Banach et $T\in\mathcal L(X,Y)$ bijectif. En déduire qu'il existe $C\ge 0$ tel que $\|u\|_X\le C\|Tu\|_Y$ pour tout $u\in X$, et que la plus petite constante admissible est $\|T^{-1}\|_{\mathcal L(Y,X)}$. Calculer cette constante pour $T_0=\mathrm{diag}(2,4)$ sur $\mathbb R^2$ euclidien, et la comparer à $1/\|T_0\|$.`,
  source: poly(39, 'Annexe B, exercice 6, intermédiaire'),
  prerequisites: [],
  concepts: ['application-ouverte-norme-inverse', 'hypotheses-theoreme', 'complet-necessaire', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-X', kind: 'hypothese', text: t`$X$ est un espace de Banach.` },
      { id: 'h-Y', kind: 'hypothese', text: t`$Y$ est un espace de Banach.` },
      { id: 'h-T', kind: 'hypothese', text: t`$T\in\mathcal L(X,Y)$.` },
      { id: 'h-bij', kind: 'hypothese', text: t`$T$ est bijectif.` },
      { id: 'd-u', kind: 'definition', local: true, text: t`Soit $u\in X$.` },
      { id: 'd-ex', kind: 'definition', text: t`Exemple : $X=Y=\mathbb R^2$ euclidien et $T_0=\mathrm{diag}(2,4)$.` },

      { id: 'inv', kind: 'application-theoreme', text: t`$T^{-1}\in\mathcal L(Y,X)$.` },
      { id: 'id', kind: 'egalite', text: t`$u=T^{-1}(Tu)$.` },
      { id: 'maj', kind: 'inegalite', text: t`$\|u\|_X\le\|T^{-1}\|_{\mathcal L(Y,X)}\,\|Tu\|_Y$.` },
      { id: 'est', kind: 'inegalite', text: t`Pour tout $u\in X$ : $\|u\|_X\le C\|Tu\|_Y$, avec $C=\|T^{-1}\|_{\mathcal L(Y,X)}$.` },
      { id: 'opt', kind: 'consequence', text: t`Si $C'\ge 0$ vérifie $\|u\|_X\le C'\|Tu\|_Y$ pour tout $u\in X$, alors $\|T^{-1}\|\le C'$ : la constante $\|T^{-1}\|$ est la plus petite possible.` },
      { id: 'stab', kind: 'inegalite', text: t`Pour tous $u_1,u_2\in X$ : $\|u_1-u_2\|_X\le C\|Tu_1-Tu_2\|_Y$.` },
      {
        id: 'ex-val',
        kind: 'egalite',
        text: t`Pour $T_0$, la plus petite constante admissible vaut $\|T_0^{-1}\|=1/2$.`,
        masked: t`Plus petite constante admissible pour $T_0$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Plus petite constante $C$ telle que $\|u\|\le C\|T_0u\|$ pour tout $u\in\mathbb R^2$`, expected: '1/2' },
      },
      { id: 'ex-cmp', kind: 'inegalite', text: t`$\|T_0\|=4$, donc $1/\|T_0\|=1/4<1/2$ : la constante optimale n'est pas $1/\|T\|$ en général.` },

      { id: 'fin', kind: 'conclusion', text: t`$\|u\|_X\le\|T^{-1}\|\,\|Tu\|_Y$ pour tout $u\in X$, avec une constante optimale ; pour $T_0$, elle vaut $1/2$ et diffère de $1/\|T_0\|$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-dir', kind: 'inegalite', distractor: true, after: ['inv'], text: t`$\|u\|_X\le\|T\|_{\mathcal L(X,Y)}\,\|Tu\|_Y$ pour tout $u\in X$.` },
      { id: 'x-inv-norme', kind: 'egalite', distractor: true, after: ['inv'], text: t`$\|T^{-1}\|_{\mathcal L(Y,X)}=1/\|T\|_{\mathcal L(X,Y)}$.` },
      { id: 'x-inj', kind: 'consequence', distractor: true, text: t`L'estimation reste vraie lorsque $T\in\mathcal L(X,Y)$ est seulement injectif.` },
    ],
    justifications: [
      { id: 'j-ao', label: 'Théorème de l’application ouverte (inverse borné).', theorem: 'application-ouverte' },
      { id: 'j-inv', label: t`Définition de l'inverse d'une bijection.` },
      { id: 'j-norme-op', label: t`Définition de la norme d'opérateur de $T^{-1}$, appliquée au vecteur $Tu$.` },
      { id: 'j-u-arb', label: t`$u$ était quelconque dans $X$.` },
      { id: 'j-opt', label: t`Pour $y\in Y$, écrire $y=Tu$ par surjectivité : $\|T^{-1}y\|_X\le C'\|y\|_Y$.` },
      { id: 'j-lin', label: t`Appliquer l'estimation à $u=u_1-u_2$, par linéarité de $T$.` },
      { id: 'j-diag', label: t`$T_0^{-1}=\mathrm{diag}(1/2,1/4)$, et la norme euclidienne d'une matrice diagonale est le plus grand module de ses coefficients.` },
      { id: 'j-cmp', label: t`Même calcul pour $T_0$ : $\|T_0\|=\max(2,4)$.` },
      { id: 'j-syn', label: 'Réunion des propriétés établies.' },
      // Justifications séduisantes et fausses, ou absentes.
      { id: 'j-renverse', label: t`Division de l'inégalité $\|Tu\|_Y\le\|T\|\,\|u\|_X$ par $\|T\|$.` },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['h-X', 'h-Y', 'h-T', 'h-bij'], to: 'inv', by: 'j-ao' },
      { from: ['h-bij', 'd-u'], to: 'id', by: 'j-inv' },
      { from: ['inv', 'id'], to: 'maj', by: 'j-norme-op' },
      { from: ['maj'], to: 'est', by: 'j-u-arb' },
      { from: ['est', 'h-bij'], to: 'opt', by: 'j-opt' },
      { from: ['est', 'h-T'], to: 'stab', by: 'j-lin' },
      { from: ['d-ex', 'opt'], to: 'ex-val', by: 'j-diag' },
      { from: ['ex-val', 'd-ex'], to: 'ex-cmp', by: 'j-cmp' },
      { from: ['est', 'opt', 'stab', 'ex-cmp'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-dir',
        verdict: 'incorrect',
        concept: 'application-ouverte-norme-inverse',
        message: t`La norme de $T$ majore $\|Tu\|$ en fonction de $\|u\|$ ; elle ne permet pas de majorer $\|u\|$ en fonction de $\|Tu\|$.`,
        counterexample: t`$T=\tfrac12\mathrm{Id}$ sur $\mathbb R$ : $\|T\|=\tfrac12$, et $|u|\le\tfrac14|u|$ est faux pour $u\neq 0$.`,
      },
      {
        conclusion: 'x-inv-norme',
        verdict: 'incorrect',
        concept: 'application-ouverte-norme-inverse',
        message: t`On a seulement $\|T\|\,\|T^{-1}\|\ge 1$ : l'égalité n'a pas lieu en général.`,
        counterexample: t`$T_0=\mathrm{diag}(2,4)$ : $\|T_0^{-1}\|=\tfrac12$ et $1/\|T_0\|=\tfrac14$.`,
      },
      {
        conclusion: 'x-inj',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Sans surjectivité, le théorème ne s'applique pas, et l'estimation peut échouer.`,
        counterexample: t`$X=Y=\ell^2$, $Tx=(x_k/k)_k$ : $T$ est injectif et continu, mais $\|e_n\|=1$ et $\|Te_n\|=1/n$.`,
      },
      {
        conclusion: 'maj',
        by: 'j-renverse',
        verdict: 'incorrect',
        concept: 'application-ouverte-norme-inverse',
        message: t`La division de $\|Tu\|\le\|T\|\,\|u\|$ par $\|T\|$ donne une minoration de $\|u\|$, à savoir $\|Tu\|/\|T\|\le\|u\|$, et non une majoration.`,
        counterexample: t`$T_0=\mathrm{diag}(2,4)$ et $u=e_1$ : $\|u\|=1$, alors que $\|T_0u\|/\|T_0\|=\tfrac12$.`,
      },
      {
        conclusion: 'est',
        by: 'j-renverse',
        verdict: 'incorrect',
        concept: 'application-ouverte-norme-inverse',
        message: t`Cette division produit une minoration de $\|u\|$ : la majoration cherchée vient de la continuité de $T^{-1}$.`,
      },
      {
        conclusion: 'inv',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: 'La continuité de l’inverse est le contenu d’un théorème, sous des hypothèses de complétude : lesquelles ?',
      },
    ],
    removable: [
      {
        hypothesis: 'h-Y',
        label: t`Retirer la complétude de $Y$`,
        necessary: true,
        explanation: 'Le théorème ne s’applique plus, et aucune constante ne convient en général.',
        counterexample: t`$J=\mathrm{Id}:(C([0,1]),\|\cdot\|_\infty)\to(C([0,1]),\|\cdot\|_1)$ et $f_n(x)=x^n$ : $\|f_n\|_\infty=1$ et $\|Jf_n\|_1=\frac1{n+1}$.`,
      },
      {
        hypothesis: 'h-bij',
        label: t`Retirer la bijectivité de $T$`,
        necessary: true,
        explanation: t`Sans surjectivité, l'inverse n'est défini que sur l'image, et l'estimation peut échouer.`,
        counterexample: t`$Tx=(x_k/k)_k$ sur $\ell^2$ : $\|e_n\|=1$ et $\|Te_n\|=1/n$.`,
      },
    ],
  },
  solution: t`**Estimation.** $X$ et $Y$ sont des Banach et $T\in\mathcal L(X,Y)$ est bijectif : par le théorème de l'application ouverte, $T^{-1}\in\mathcal L(Y,X)$. Pour $u\in X$, $u=T^{-1}(Tu)$, donc $\|u\|_X\le\|T^{-1}\|\,\|Tu\|_Y$. On prend $C=\|T^{-1}\|$. Par linéarité, $\|u_1-u_2\|_X\le C\|Tu_1-Tu_2\|_Y$ : la solution de $Tu=f$ dépend continûment de $f$.

**Optimalité.** Si $\|u\|_X\le C'\|Tu\|_Y$ pour tout $u$, alors, pour $y\in Y$ et $u=T^{-1}y$, $\|T^{-1}y\|_X\le C'\|y\|_Y$, d'où $\|T^{-1}\|\le C'$.

**Exemple.** $T_0^{-1}=\mathrm{diag}(1/2,1/4)$, donc $\|T_0^{-1}\|=1/2$ : en effet $\|T_0u\|^2=4u_1^2+16u_2^2\ge 4\|u\|^2$, avec égalité pour $u=e_1$. Comme $\|T_0\|=4$, on a $1/\|T_0\|=1/4<1/2$ : la constante n'est pas $1/\|T\|$.`,
  steps: [
    t`Obtenir $T^{-1}\in\mathcal L(Y,X)$ par le théorème de l'application ouverte.`,
    t`Écrire $u=T^{-1}(Tu)$ et majorer.`,
    'Montrer l’optimalité de la constante par surjectivité.',
    t`Calculer la constante pour $T_0$ et la comparer à $1/\|T_0\|$.`,
  ],
  commonErrors: [
    { id: 'e-sens', description: t`Confondre $\|Tu\|\le\|T\|\,\|u\|$ et l'estimation inverse.`, concept: 'application-ouverte-norme-inverse' },
    { id: 'e-inverse', description: t`Prendre $C=1/\|T\|$.`, concept: 'application-ouverte-norme-inverse' },
    { id: 'e-injectif', description: 'Appliquer le résultat à un opérateur seulement injectif.', concept: 'hypotheses-theoreme' },
  ],
  hints: [
    t`L'estimation cherchée majore $\|u\|$ : quel opérateur, appliqué à $Tu$, redonne $u$ ?`,
    t`Écris $u=T^{-1}(Tu)$ et utilise la continuité de $T^{-1}$, fournie par le théorème. Pour l'optimalité, pars d'une constante $C'$ quelconque et pose $y=Tu$.`,
    t`Pour $T_0$ : $\|T_0u\|^2=4u_1^2+16u_2^2\ge 4\|u\|^2$, avec égalité en $u=e_1$.`,
  ],
  rubric: rubric({
    hypotheses: 'La bijectivité et la complétude des deux espaces sont vérifiées.',
    methode: t`L'estimation est déduite de la continuité de $T^{-1}$.`,
    validite: t`L'optimalité de $\|T^{-1}\|$ est démontrée, et le calcul pour $T_0$ est exact.`,
    justifications: t`La constante n'est pas confondue avec $\|T\|$ ou $1/\|T\|$.`,
    conclusion: t`L'estimation, sa constante optimale et l'exemple sont obtenus.`,
  }),
  variant: {
    statement: t`Soient $X,Y$ deux espaces de Banach et $T\in\mathcal L(X,Y)$. On suppose qu'il existe $C\ge 0$ tel que $\|u\|_X\le C\|Tu\|_Y$ pour tout $u\in X$. Montrer que $T$ est injectif et que son image $T(X)$ est fermée dans $Y$.`,
    solution: t`Si $Tu=0$, alors $\|u\|_X\le 0$, donc $u=0$ : $T$ est injectif. Soit $(Tu_n)_n$ une suite de $T(X)$ convergeant vers $y\in Y$. Elle est de Cauchy, et $\|u_n-u_m\|_X\le C\|Tu_n-Tu_m\|_Y$ : $(u_n)_n$ est de Cauchy dans $X$, complet, donc converge vers un $u\in X$. Par continuité de $T$, $Tu_n\to Tu$, d'où $y=Tu\in T(X)$. Seule la complétude de $X$ a servi.`,
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'application-ouverte.difficile',
  theoremId: 'application-ouverte',
  level: 'difficile',
  title: 'Stabilité d’un problème elliptique inversible',
  statement: t`Soient $\Omega\subset\mathbb R^d$ un ouvert borné, $V=H^1_0(\Omega)$ muni de $\|v\|_V=\big(\|v\|_{L^2}^2+\|\nabla v\|_{L^2}^2\big)^{1/2}$ et $V'$ son dual, muni de la norme duale. Soient $A\in L^\infty(\Omega;\mathbb R^{d\times d})$, $c\in L^\infty(\Omega)$, $a(u,v)=\int_\Omega A\nabla u\cdot\nabla v+\int_\Omega c\,uv$, et $L:V\to V'$ l'opérateur variationnel, $\langle Lu,v\rangle=a(u,v)$. On suppose établi que $L$ est bijectif ; aucune coercivité n'est supposée. Montrer que pour tout $f\in V'$ le problème « $u\in V$ et $a(u,v)=\langle f,v\rangle$ pour tout $v\in V$ » admet une unique solution $u_f$, et qu'il existe $C$, indépendant de $f$ et de $g$, tel que $\|u_f-u_g\|_V\le C\|f-g\|_{V'}$.`,
  source: poly(39, 'Annexe B, exercice 6, difficile'),
  prerequisites: [],
  concepts: ['hypotheses-theoreme', 'complet-necessaire', 'dual-identification', 'regularite-bord', 'existence-unicite'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-V', kind: 'hypothese', text: t`$V=H^1_0(\Omega)$, muni de $\|\cdot\|_V$, est un espace de Hilbert, donc un espace de Banach.` },
      { id: 'h-Vp', kind: 'hypothese', text: t`$V'$, muni de la norme duale $\|f\|_{V'}=\sup_{\|v\|_V\le 1}|\langle f,v\rangle|$, est un espace de Banach.` },
      { id: 'h-a', kind: 'hypothese', text: t`$A\in L^\infty(\Omega;\mathbb R^{d\times d})$, $c\in L^\infty(\Omega)$ et $a(u,v)=\int_\Omega A\nabla u\cdot\nabla v+\int_\Omega c\,uv$.` },
      { id: 'h-bij', kind: 'hypothese', text: t`L'opérateur $L:V\to V'$ défini par $\langle Lu,v\rangle=a(u,v)$ est bijectif.` },
      { id: 'd-fg', kind: 'definition', local: true, text: t`Soient $f,g\in V'$.` },

      { id: 'c-cont', kind: 'inegalite', text: t`$|a(u,v)|\le M\|u\|_V\|v\|_V$ pour tous $u,v\in V$, avec $M=\|A\|_{L^\infty}+\|c\|_{L^\infty}$, où $\|A\|_{L^\infty}$ est le supremum essentiel de la norme subordonnée de $A(x)$.` },
      { id: 'c-L', kind: 'consequence', text: t`$L$ est linéaire et $\|Lu\|_{V'}\le M\|u\|_V$ : $L\in\mathcal L(V,V')$.` },
      { id: 'ao', kind: 'application-theoreme', text: t`$L^{-1}\in\mathcal L(V',V)$.` },
      { id: 'e-sol', kind: 'consequence', text: t`Pour tout $f\in V'$, le problème admet une unique solution, $u_f=L^{-1}f$.` },
      { id: 'e-diff', kind: 'egalite', text: t`$u_f-u_g=L^{-1}(f-g)$.` },
      { id: 'e-stab', kind: 'inegalite', text: t`$\|u_f-u_g\|_V\le\|L^{-1}\|_{\mathcal L(V',V)}\,\|f-g\|_{V'}$.` },
      { id: 'e-borne', kind: 'inegalite', text: t`$\|u_f\|_V\le\|L^{-1}\|_{\mathcal L(V',V)}\,\|f\|_{V'}$.` },

      { id: 'fin', kind: 'conclusion', text: t`Pour tout $f\in V'$, la solution $u_f$ existe et est unique, et $\|u_f-u_g\|_V\le C\|f-g\|_{V'}$ avec $C=\|L^{-1}\|_{\mathcal L(V',V)}$, indépendant de $f$ et de $g$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-coerc', kind: 'inegalite', distractor: true, after: ['ao'], text: t`$\|u_f\|_V\le\frac1\alpha\|f\|_{V'}$, où $\alpha>0$ est une constante de coercivité de $a$.` },
      { id: 'x-H2', kind: 'inegalite', distractor: true, after: ['e-stab'], text: t`Pour $f\in L^2(\Omega)$ : $u_f\in H^2(\Omega)$ et $\|u_f\|_{H^2}\le C\|f\|_{L^2}$.` },
      { id: 'x-L2', kind: 'inegalite', distractor: true, after: ['e-stab'], text: t`$\|u_f\|_V\le C\|f\|_{L^2(\Omega)}$ pour tout $f\in V'$.` },
    ],
    justifications: [
      { id: 'j-cs', label: t`Majoration ponctuelle $|A\nabla u\cdot\nabla v|\le\|A\|_{L^\infty}|\nabla u|\,|\nabla v|$, puis inégalité de Cauchy–Schwarz dans $L^2$ pour chacun des deux termes.`, theorem: 'cauchy-schwarz' },
      { id: 'j-def-L', label: t`Définition de la norme duale : $\|Lu\|_{V'}=\sup_{\|v\|_V\le 1}|a(u,v)|$, et bilinéarité de $a$.` },
      { id: 'j-ao', label: 'Théorème de l’application ouverte (inverse borné).', theorem: 'application-ouverte' },
      { id: 'j-bij-sol', label: t`Le problème équivaut à $Lu=f$ dans $V'$ : existence par surjectivité, unicité par injectivité.` },
      { id: 'j-lin-inv', label: t`Linéarité de $L^{-1}$.` },
      { id: 'j-norme-op', label: t`Définition de la norme d'opérateur de $L^{-1}$.` },
      { id: 'j-g0', label: t`Cas $g=0$ : l'unique solution associée est $u_0=0$.` },
      { id: 'j-syn', label: 'Réunion de l’existence, de l’unicité et de la stabilité.' },
      // Justifications séduisantes et fausses.
      { id: 'j-bij-suffit', label: 'Une bijection linéaire a toujours un inverse continu.' },
      { id: 'j-lm', label: 'Théorème de Lax–Milgram.', theorem: 'lax-milgram' },
    ],
    rules: [
      { from: ['h-a', 'h-V'], to: 'c-cont', by: 'j-cs' },
      { from: ['c-cont'], to: 'c-L', by: 'j-def-L' },
      { from: ['h-V', 'h-Vp', 'c-L', 'h-bij'], to: 'ao', by: 'j-ao' },
      { from: ['h-bij', 'd-fg'], to: 'e-sol', by: 'j-bij-sol' },
      { from: ['e-sol', 'ao'], to: 'e-diff', by: 'j-lin-inv' },
      { from: ['e-diff', 'ao'], to: 'e-stab', by: 'j-norme-op' },
      { from: ['e-stab', 'e-sol'], to: 'e-borne', by: 'j-g0' },
      { from: ['e-sol', 'e-stab', 'e-borne'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-coerc',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Aucune coercivité n'est supposée, et elle peut faire défaut alors que $L$ est bijectif : la constante de stabilité est $\|L^{-1}\|$.`,
        counterexample: NON_COERCIVE,
      },
      {
        conclusion: 'x-H2',
        verdict: 'incorrect',
        concept: 'regularite-bord',
        message: t`L'inversibilité de $L:V\to V'$ ne contient aucune information de régularité $H^2$ : celle-ci dépend du bord et des coefficients.`,
        counterexample: t`Pour $A=\mathrm{Id}$, $c=0$ et $\Omega$ un polygone non convexe, il existe $f\in L^2(\Omega)$ dont la solution n'appartient pas à $H^2(\Omega)$.`,
      },
      {
        conclusion: 'x-L2',
        verdict: 'incorrect',
        concept: 'dual-identification',
        message: t`Un élément de $V'$ n'est pas forcément une fonction de $L^2(\Omega)$ : le membre de droite n'a pas de sens en général.`,
        counterexample: t`Pour $d=1$ et $\Omega=]0,1[$, la distribution de Dirac $\delta_{1/2}$ appartient à $H^{-1}(]0,1[)$, puisque $H^1_0(]0,1[)\subset C([0,1])$ avec injection continue, et n'est pas dans $L^2(]0,1[)$.`,
      },
      {
        conclusion: 'ao',
        by: 'j-bij-suffit',
        verdict: 'incorrect',
        concept: 'complet-necessaire',
        message: t`La continuité de l'inverse vient du théorème de l'application ouverte, qui exige $V$ et $V'$ complets ; une bijection linéaire continue entre espaces normés peut avoir un inverse discontinu.`,
        counterexample: J_EXEMPLE,
      },
      {
        conclusion: 'ao',
        by: 'j-lm',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Lax–Milgram demande la coercivité de $a$, qui n'est pas supposée ici : seule la bijectivité de $L$ l'est.`,
        counterexample: NON_COERCIVE,
      },
      {
        conclusion: 'e-sol',
        by: 'j-lm',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Sans coercivité, Lax–Milgram ne s'applique pas ; l'existence et l'unicité viennent ici de la bijectivité de $L$.`,
        counterexample: NON_COERCIVE,
      },
    ],
    removable: [
      {
        hypothesis: 'h-bij',
        label: t`Retirer la bijectivité de $L$`,
        necessary: true,
        explanation: 'Sans injectivité, l’unicité est perdue, et avec elle toute estimation de stabilité.',
        counterexample: t`Sur $\Omega=]0,1[$, $a(u,v)=\int_0^1u'v'-\pi^2\int_0^1uv$ : pour $\varphi(x)=\sin(\pi x)$, $a(\varphi,v)=0$ pour tout $v\in V$, donc $0$ et $\varphi$ résolvent le problème associé à $f=0$.`,
      },
      {
        hypothesis: 'h-Vp',
        label: t`Retirer la complétude de l'espace d'arrivée`,
        necessary: true,
        explanation: 'Le théorème de l’application ouverte exige que l’espace d’arrivée soit complet.',
        counterexample: J_EXEMPLE,
      },
    ],
  },
  closedChecks: [
    {
      kind: 'rational',
      prompt: t`Pour $\Omega=]0,1[$, $a(u,v)=\int_0^1u'v'-2\pi^2\int_0^1uv$ et $\varphi(x)=\sin(\pi x)$, valeur de $a(\varphi,\varphi)/\pi^2$`,
      expected: '-1/2',
    },
  ],
  solution: t`**Continuité de $L$.** Pour $u,v\in V$, $|A\nabla u\cdot\nabla v|\le\|A\|_{L^\infty}|\nabla u|\,|\nabla v|$ presque partout ; par Cauchy–Schwarz, $|a(u,v)|\le\|A\|_{L^\infty}\|\nabla u\|_{L^2}\|\nabla v\|_{L^2}+\|c\|_{L^\infty}\|u\|_{L^2}\|v\|_{L^2}\le M\|u\|_V\|v\|_V$. Donc $\|Lu\|_{V'}\le M\|u\|_V$ et $L\in\mathcal L(V,V')$.

**Inverse borné.** $V$ est un Hilbert et $V'$, dual d'un espace normé, est un Banach ; $L$ est une bijection linéaire continue. Par le théorème de l'application ouverte, $L^{-1}\in\mathcal L(V',V)$.

**Existence, unicité, stabilité.** Le problème équivaut à $Lu=f$ dans $V'$ : il a une unique solution $u_f=L^{-1}f$. Par linéarité, $u_f-u_g=L^{-1}(f-g)$, donc $\|u_f-u_g\|_V\le\|L^{-1}\|\,\|f-g\|_{V'}$ ; avec $g=0$, $\|u_f\|_V\le\|L^{-1}\|\,\|f\|_{V'}$.

**Points de vigilance.** Aucune coercivité n'a servi : pour $a(u,v)=\int_0^1u'v'-2\pi^2\int_0^1uv$ sur $H^1_0(]0,1[)$, $L$ est bijectif sans que $a$ soit coercive. La constante $C=\|L^{-1}\|$ n'est pas explicite en général ; elle vaut $1/\alpha$ au plus lorsque $a$ est $\alpha$-coercive. Enfin, l'estimation porte sur la norme de $V'$ : un élément de $V'$ n'est pas forcément dans $L^2$, et aucune régularité $H^2$ n'en découle.`,
  steps: [
    t`Établir $L\in\mathcal L(V,V')$.`,
    t`Vérifier que $V$ et $V'$ sont des Banach, puis appliquer le théorème de l'application ouverte.`,
    t`Identifier les solutions du problème aux préimages par $L$.`,
    t`Majorer $u_f-u_g=L^{-1}(f-g)$.`,
  ],
  commonErrors: [
    { id: 'e-coercivite', description: 'Invoquer Lax–Milgram, ou une constante de coercivité, alors que seule la bijectivité est supposée.', concept: 'hypotheses-theoreme' },
    { id: 'e-L2', description: t`Écrire la stabilité en norme $L^2$ du second membre au lieu de la norme de $V'$.`, concept: 'dual-identification' },
    { id: 'e-H2', description: t`Déduire une régularité $H^2$ de l'inversibilité de $L:V\to V'$.`, concept: 'regularite-bord' },
  ],
  hints: [
    t`Entre quels espaces $L$ est-il une bijection, et ces espaces sont-ils complets ?`,
    t`Montre d'abord que $L$ est continu, puis applique le théorème de l'application ouverte à $L:V\to V'$. La stabilité est la continuité de $L^{-1}$, écrite avec sa norme.`,
    t`$u_f-u_g=L^{-1}(f-g)$, donc $\|u_f-u_g\|_V\le\|L^{-1}\|\,\|f-g\|_{V'}$ ; aucune coercivité n'intervient.`,
  ],
  rubric: rubric({
    hypotheses: t`La continuité de $L$ et la complétude de $V$ et $V'$ sont établies.`,
    methode: t`La stabilité est déduite du théorème de l'application ouverte appliqué à $L$.`,
    validite: t`Les normes utilisées sont celles de $V$ et de $V'$.`,
    justifications: 'Aucune coercivité ni régularité supplémentaire n’est invoquée.',
    conclusion: 'Existence, unicité et dépendance continue sont obtenues, avec une constante indépendante des données.',
  }),
  variant: {
    statement: t`Démontrer le théorème de l'application ouverte à partir du théorème de Baire : si $X,Y$ sont des espaces de Banach et si $T\in\mathcal L(X,Y)$ est surjectif, alors $T$ est ouverte ; si $T$ est en outre injectif, alors $T^{-1}\in\mathcal L(Y,X)$.`,
    solution: t`Notons $U=B_X(0,1)$.

**Baire.** $X=\bigcup_{n\ge 1}nU$ et $T$ est surjectif, donc $Y=\bigcup_{n\ge 1}nT(U)=\bigcup_{n\ge 1}n\,\overline{T(U)}$, réunion de fermés. $Y$ étant complet, l'un d'eux est d'intérieur non vide ; par homothétie, $\overline{T(U)}$ contient une boule $B_Y(y_0,\rho)$, $\rho>0$.

**Recentrage.** $\overline{T(U)}$ est convexe et symétrique, car $U$ l'est et $T$ est linéaire. Pour $\|y\|_Y<\rho$, $y=\frac12(y_0+y)+\frac12\big(-(y_0-y)\big)$, avec $y_0\pm y\in B_Y(y_0,\rho)$ : donc $B_Y(0,\rho)\subset\overline{T(U)}$, et par homogénéité $B_Y(0,\rho s)\subset\overline{T(B_X(0,s))}$ pour tout $s>0$.

**Procédé itératif.** Soit $\|y\|_Y<\rho/2$. Comme $y\in\overline{T(B_X(0,1/2))}$, il existe $x_1$ avec $\|x_1\|_X<1/2$ et $\|y-Tx_1\|_Y<\rho/4$. Par récurrence, on obtient $x_n$ avec $\|x_n\|_X<2^{-n}$ et $\|y-T(x_1+\dots+x_n)\|_Y<\rho2^{-n-1}$. $X$ étant complet, la série $\sum x_n$, absolument convergente, converge vers $x$ avec $\|x\|_X\le\sum\|x_n\|_X<1$, et la continuité de $T$ donne $Tx=y$. Ainsi $B_Y(0,\rho/2)\subset T(U)$.

**Ouverture.** Si $O$ est ouvert et $B_X(x_0,r)\subset O$, alors $T(O)\supset Tx_0+rT(U)\supset B_Y(Tx_0,\rho r/2)$.

**Inverse borné.** Si $T$ est injectif, $T^{-1}$ est linéaire. Pour $y\neq 0$, $y'=\frac{\rho}{4\|y\|_Y}y$ vérifie $\|y'\|_Y=\rho/4<\rho/2$, donc son unique antécédent est dans $U$ : $\|T^{-1}y\|_X<\frac4\rho\|y\|_Y$.`,
    proof: {
      purpose: 'demonstration',
      goal: 'fin',
      nodes: [
        { id: 'h-X', kind: 'hypothese', text: t`$X$ est un espace de Banach.` },
        { id: 'h-Y', kind: 'hypothese', text: t`$Y$ est un espace de Banach.` },
        { id: 'h-T', kind: 'hypothese', text: t`$T\in\mathcal L(X,Y)$.` },
        { id: 'h-surj', kind: 'hypothese', text: t`$T$ est surjectif.` },
        { id: 'd-B', kind: 'definition', text: t`Notations : $B_X(x,r)$ et $B_Y(y,r)$ désignent les boules ouvertes, et $U=B_X(0,1)$.` },
        { id: 'd-y', kind: 'definition', local: true, text: t`Soit $y\in Y$ tel que $\|y\|_Y<\rho/2$.` },
        { id: 'd-O', kind: 'definition', local: true, text: t`Soient $O$ un ouvert de $X$, $x_0\in O$ et $r>0$ tels que $B_X(x_0,r)\subset O$.` },
        { id: 'h-inj', kind: 'hypothese', local: true, text: t`Supposons de plus $T$ injectif.` },

        { id: 'b-recouvre', kind: 'egalite', text: t`$Y=\bigcup_{n\ge 1}n\,\overline{T(U)}$, réunion de fermés.` },
        { id: 'b-baire', kind: 'application-theoreme', text: t`Il existe $n_0\ge 1$ tel que $n_0\overline{T(U)}$ est d'intérieur non vide.` },
        { id: 'b-boule', kind: 'inclusion', text: t`Il existe $y_0\in Y$ et $\rho>0$ tels que $B_Y(y_0,\rho)\subset\overline{T(U)}$.` },
        { id: 'c-conv', kind: 'consequence', text: t`$\overline{T(U)}$ est convexe et symétrique.` },
        { id: 'c-centre', kind: 'inclusion', text: t`$B_Y(0,\rho)\subset\overline{T(U)}$.` },
        { id: 'c-echelle', kind: 'inclusion', text: t`Pour tout $s>0$ : $B_Y(0,\rho s)\subset\overline{T(B_X(0,s))}$.` },
        { id: 'i-suite', kind: 'consequence', text: t`Il existe $(x_n)_{n\ge 1}\subset X$ tels que $\|x_n\|_X<2^{-n}$ et $\big\|y-\sum_{k=1}^nTx_k\big\|_Y<\rho\,2^{-n-1}$ pour tout $n\ge 1$.` },
        { id: 'i-serie', kind: 'consequence', text: t`La série $\sum_nx_n$ converge dans $X$ vers un point $x$ tel que $\|x\|_X<1$.` },
        { id: 'i-image', kind: 'egalite', text: t`$Tx=y$.` },
        { id: 'i-incl', kind: 'inclusion', text: t`$B_Y(0,\rho/2)\subset T(U)$.` },
        { id: 'o-boule', kind: 'inclusion', text: t`$B_Y(Tx_0,\rho r/2)\subset T(O)$.` },
        { id: 'o-ouverte', kind: 'consequence', text: t`$T$ est ouverte.` },
        { id: 'inv', kind: 'inegalite', text: t`$T^{-1}$ est linéaire et $\|T^{-1}y\|_X\le\frac4\rho\|y\|_Y$ pour tout $y\in Y$.` },
        { id: 'fin', kind: 'conclusion', text: t`$T$ est ouverte ; si $T$ est de plus injectif, alors $T^{-1}\in\mathcal L(Y,X)$.` },

        // Propositions plausibles mais fausses ou non justifiées.
        { id: 'x-baire-seul', kind: 'inclusion', distractor: true, after: ['b-boule'], text: t`Par le seul théorème de Baire, $T(U)$ contient une boule de $Y$ centrée en $0$.` },
        { id: 'x-ouverte-toujours', kind: 'consequence', distractor: true, text: t`Toute application linéaire continue entre espaces de Banach est ouverte.` },
      ],
      justifications: [
        { id: 'j-recouvre', label: t`$X=\bigcup_{n\ge 1}nU$ et $T$ surjectif donnent $Y=\bigcup_{n\ge 1}nT(U)$ ; chaque $n\,\overline{T(U)}$ est fermé.` },
        { id: 'j-baire', label: 'Théorème de Baire dans l’espace complet non vide $Y$.', theorem: 'baire' },
        { id: 'j-homothetie', label: t`L'homothétie $y\mapsto y/n_0$ est un homéomorphisme de $Y$.` },
        { id: 'j-convexe', label: t`$U$ est convexe et symétrique, $T$ est linéaire, et l'adhérence conserve ces deux propriétés.` },
        { id: 'j-centrage', label: t`Pour $\|y\|_Y<\rho$ : $y=\frac12(y_0+y)+\frac12\big(-(y_0-y)\big)$, avec $y_0\pm y\in B_Y(y_0,\rho)$.` },
        { id: 'j-homog', label: t`$T(sU)=sT(U)$ et $\overline{sA}=s\overline A$ pour $s>0$.` },
        { id: 'j-recurrence', label: t`Récurrence : $y-\sum_{k\le n}Tx_k\in B_Y(0,\rho2^{-n-1})\subset\overline{T(B_X(0,2^{-n-1}))}$ fournit $x_{n+1}$.` },
        { id: 'j-serie', label: t`Série absolument convergente dans l'espace complet $X$, avec $\sum_n\|x_n\|_X<\sum_n2^{-n}=1$.` },
        { id: 'j-continuite', label: t`Continuité de $T$ : $T\big(\sum_{k\le n}x_k\big)\to Tx$, et le reste tend vers $0$.` },
        { id: 'j-y-arb', label: t`$y$ était quelconque dans $B_Y(0,\rho/2)$.` },
        { id: 'j-translation', label: t`$T(O)\supset T\big(B_X(x_0,r)\big)=Tx_0+rT(U)\supset Tx_0+B_Y(0,\rho r/2)$.` },
        { id: 'j-def-ouverte', label: t`Tout point $Tx_0$ de $T(O)$ y est intérieur, pour tout ouvert $O$.` },
        { id: 'j-inverse', label: t`Pour $y\neq 0$, le point $\frac{\rho}{4\|y\|_Y}y$ est dans $B_Y(0,\rho/2)$, donc son unique antécédent est dans $U$ ; homogénéité de $T^{-1}$.` },
        { id: 'j-syn', label: 'Réunion des deux résultats.' },
        // Justifications séduisantes et fausses.
        { id: 'j-baire-X', label: t`Théorème de Baire appliqué dans $X$.`, theorem: 'baire' },
        { id: 'j-serie-Y', label: t`Complétude de $Y$.` },
        { id: 'j-adh-image', label: t`L'adhérence de l'image est l'image de l'adhérence : $\overline{T(U)}=T(\overline U)$.` },
      ],
      rules: [
        { from: ['h-T', 'h-surj', 'd-B'], to: 'b-recouvre', by: 'j-recouvre' },
        { from: ['h-Y', 'b-recouvre'], to: 'b-baire', by: 'j-baire' },
        { from: ['b-baire'], to: 'b-boule', by: 'j-homothetie' },
        { from: ['h-T', 'd-B'], to: 'c-conv', by: 'j-convexe' },
        { from: ['b-boule', 'c-conv'], to: 'c-centre', by: 'j-centrage' },
        { from: ['c-centre', 'h-T'], to: 'c-echelle', by: 'j-homog' },
        { from: ['c-echelle', 'd-y'], to: 'i-suite', by: 'j-recurrence' },
        { from: ['i-suite', 'h-X'], to: 'i-serie', by: 'j-serie' },
        { from: ['i-suite', 'i-serie', 'h-T'], to: 'i-image', by: 'j-continuite' },
        { from: ['i-serie', 'i-image', 'd-y'], to: 'i-incl', by: 'j-y-arb' },
        { from: ['i-incl', 'd-O', 'h-T'], to: 'o-boule', by: 'j-translation' },
        { from: ['o-boule'], to: 'o-ouverte', by: 'j-def-ouverte' },
        { from: ['i-incl', 'h-inj', 'h-surj', 'h-T'], to: 'inv', by: 'j-inverse' },
        { from: ['o-ouverte', 'inv'], to: 'fin', by: 'j-syn' },
      ],
      traps: [
        {
          conclusion: 'x-baire-seul',
          verdict: 'a-justifier',
          concept: 'hypotheses-theoreme',
          message: t`Baire ne fournit qu'un intérieur non vide pour l'adhérence $\overline{T(U)}$. Passer de l'adhérence à l'image elle-même est précisément le rôle du procédé itératif, qui utilise la complétude de $X$.`,
        },
        {
          conclusion: 'x-ouverte-toujours',
          verdict: 'incorrect',
          concept: 'hypotheses-theoreme',
          message: 'La surjectivité est indispensable.',
          counterexample: t`$T:\mathbb R^2\to\mathbb R^2$, $T(a,b)=(a,0)$ : l'image du disque unité ouvert est $]-1,1[\times\{0\}$, qui n'est pas ouvert.`,
        },
        {
          conclusion: 'b-baire',
          by: 'j-baire-X',
          verdict: 'incorrect',
          concept: 'complet-necessaire',
          message: t`Le recouvrement $\bigcup_nn\,\overline{T(U)}$ est un recouvrement de $Y$ : c'est dans $Y$, complet, que le théorème de Baire s'applique.`,
        },
        {
          conclusion: 'i-serie',
          by: 'j-serie-Y',
          verdict: 'incorrect',
          concept: 'complet-necessaire',
          message: t`La série $\sum x_n$ vit dans $X$ : sa convergence repose sur la complétude de $X$, et non sur celle de $Y$.`,
        },
        {
          conclusion: 'i-incl',
          by: 'j-adh-image',
          verdict: 'incorrect',
          concept: 'fermeture-espace',
          message: t`En dimension infinie, l'image d'une boule fermée par un opérateur continu n'est pas fermée en général.`,
          counterexample: t`$X=\ell^1$, $Y=\mathbb R$, $Tx=\sum_k(1-1/k)x_k$ : l'image de la boule unité fermée est $]-1,1[$, alors que $\overline{T(U)}=[-1,1]$.`,
        },
      ],
      removable: [
        {
          hypothesis: 'h-Y',
          label: t`Retirer la complétude de $Y$`,
          necessary: true,
          explanation: 'Sans complétude de l’espace d’arrivée, le théorème de Baire ne s’applique plus.',
          counterexample: t`$J=\mathrm{Id}:(C([0,1]),\|\cdot\|_\infty)\to(C([0,1]),\|\cdot\|_1)$ est continue et bijective, mais n'est pas ouverte : $g_n(x)=2x^n$ vérifie $\|g_n\|_1=\frac2{n+1}$ et $\|g_n\|_\infty=2$, donc l'image de la boule unité ne contient aucune boule de $\|\cdot\|_1$ centrée en $0$.`,
        },
        {
          hypothesis: 'h-X',
          label: t`Retirer la complétude de $X$`,
          necessary: true,
          explanation: 'Sans complétude de l’espace de départ, la série du procédé itératif peut ne pas converger.',
          counterexample: HAMEL_DEPART,
        },
        {
          hypothesis: 'h-surj',
          label: t`Retirer la surjectivité de $T$`,
          necessary: true,
          explanation: t`Les $n\,\overline{T(U)}$ ne recouvrent plus $Y$ en général.`,
          counterexample: t`$T(a,b)=(a,0)$ sur $\mathbb R^2$ : l'image du disque unité ouvert n'est pas ouverte.`,
        },
      ],
    },
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT06: TheoremModule = {
  theorem: {
    id: 'application-ouverte',
    spaces: [
      t`$X,Y$ : espaces de Banach, de normes $\|\cdot\|_X$ et $\|\cdot\|_Y$ ; $B_X(x,r)$ et $B_Y(y,r)$ désignent les boules ouvertes.`,
      t`$\mathcal L(X,Y)$ : applications linéaires continues de $X$ dans $Y$.`,
      t`$T$ est ouverte lorsque l'image par $T$ de tout ouvert de $X$ est un ouvert de $Y$.`,
    ],
    hypotheses: [
      { id: 'h-X', text: t`$X$ est complet.`, whenRemoved: HAMEL_DEPART },
      { id: 'h-Y', text: t`$Y$ est complet.`, whenRemoved: J_EXEMPLE },
      { id: 'h-T', text: t`$T\in\mathcal L(X,Y)$.` },
      {
        id: 'h-surj',
        text: t`$T$ est surjectif.`,
        whenRemoved: t`$T:\mathbb R^2\to\mathbb R^2$, $T(a,b)=(a,0)$ : l'image du disque unité ouvert est $]-1,1[\times\{0\}$, qui n'est pas ouvert dans $\mathbb R^2$.`,
      },
    ],
    statement: t`Si $X,Y$ sont des espaces de Banach et si $T\in\mathcal L(X,Y)$ est surjectif, alors $T$ est ouverte. Si $T$ est en outre injectif, alors $T^{-1}\in\mathcal L(Y,X)$.`,
    conclusions: {
      stabilite: t`Pour une bijection $T\in\mathcal L(X,Y)$ entre Banach : $\|u\|_X\le\|T^{-1}\|\,\|Tu\|_Y$, donc la solution de $Tu=f$ dépend continûment de $f$.`,
      autre: t`$T$ est ouverte ; de façon équivalente, il existe $\delta>0$ tel que $B_Y(0,\delta)\subset T\big(B_X(0,1)\big)$.`,
    },
    sourceProof: 'idee',
    proofOutline: [
      t`Baire : $T$ étant surjectif, $Y=\bigcup_{n\ge 1}n\,\overline{T(B_X(0,1))}$ ; $Y$ étant complet, l'un de ces fermés est d'intérieur non vide, donc $\overline{T(B_X(0,1))}$ contient une boule $B_Y(y_0,\rho)$.`,
      t`Convexité et symétrie de $\overline{T(B_X(0,1))}$ : la boule se recentre en $B_Y(0,\rho)$, puis $B_Y(0,\rho s)\subset\overline{T(B_X(0,s))}$ pour tout $s>0$.`,
      t`Procédé itératif : pour $\|y\|_Y<\rho/2$, on construit $x_n$ avec $\|x_n\|_X<2^{-n}$ et $\|y-T(x_1+\dots+x_n)\|_Y<\rho2^{-n-1}$ ; $X$ étant complet, $x=\sum x_n$ vérifie $\|x\|_X<1$ et $Tx=y$. Donc $B_Y(0,\rho/2)\subset T(B_X(0,1))$.`,
      t`Ouverture : si $B_X(x_0,r)\subset O$, alors $B_Y(Tx_0,\rho r/2)\subset T(O)$.`,
      t`Inverse borné : si $T$ est injectif, $\|T^{-1}y\|_X\le\frac4\rho\|y\|_Y$, ce qui contrôle la taille de la préimage de $y$ par $\|y\|_Y$.`,
    ],
    warnings: [
      t`Les deux complétudes servent : celle de $Y$ pour Baire, celle de $X$ pour sommer la série du procédé itératif.`,
      t`Baire ne donne qu'une boule dans l'adhérence de l'image ; l'inclusion dans l'image elle-même demande le procédé itératif.`,
      t`La constante de stabilité est $\|T^{-1}\|$, qui n'est pas $1/\|T\|$ en général.`,
    ],
    usefulFor: 'Stabilité des problèmes linéaires : une solution unique dépend continûment des données dès lors que l’opérateur concerné est une bijection bornée entre Banach.',
    verification: {
      origin: 'complement',
      review: 'machine',
      notes: 'Le polycopié (p. PDF 9) ne donne que l’idée de preuve ; le détail (recentrage, procédé itératif, borne de l’inverse) est rédigé pour ProofLab.',
    },
  },
  definitions: [
    {
      id: 'ao-application-ouverte',
      term: 'Application ouverte',
      statement: t`$T:X\to Y$ est ouverte lorsque $T(U)$ est ouvert dans $Y$ pour tout ouvert $U$ de $X$. Pour $T$ linéaire, cela équivaut à l'existence de $\delta>0$ tel que $B_Y(0,\delta)\subset T\big(B_X(0,1)\big)$.`,
      source: poly(9, 'Section 2.2'),
    },
    {
      id: 'ao-isomorphisme-borne',
      term: 'Isomorphisme borné',
      statement: t`$T\in\mathcal L(X,Y)$ est un isomorphisme borné s'il est bijectif et si $T^{-1}\in\mathcal L(Y,X)$ ; de façon équivalente, $T$ est bijectif et il existe $c>0$ tel que $c\|u\|_X\le\|Tu\|_Y$ pour tout $u\in X$.`,
      source: poly(9, 'Section 2.2'),
    },
  ],
  concepts: [
    {
      id: 'application-ouverte-norme-inverse',
      label: 'Norme de l’inverse',
      reminder: t`Pour $X\neq\{0\}$, $\|T\|\,\|T^{-1}\|\ge 1$ : on a seulement $\|T^{-1}\|\ge 1/\|T\|$. La constante de stabilité est $\|T^{-1}\|$, et non $\|T\|$ ou $1/\|T\|$.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-ao-complet',
      theoremId: 'application-ouverte',
      title: 'Espace d’arrivée non complet',
      claim: t`Toute bijection linéaire continue entre espaces normés a un inverse continu.`,
      correctStatement: t`Le théorème exige que les deux espaces soient complets.`,
      task: t`Sur $E=C([0,1])$, soit $J=\mathrm{Id}:(E,\|\cdot\|_\infty)\to(E,\|\cdot\|_1)$ et $f_n(x)=x^n$. Exprime le rapport $\|J^{-1}f_n\|_\infty/\|f_n\|_1$ en fonction de $n$.`,
      check: { kind: 'expr-equiv', prompt: t`Rapport $\|J^{-1}f_n\|_\infty/\|f_n\|_1$ en fonction de $n$`, expected: 'n+1', vars: ['n'] },
      explanation: t`$\|f_n\|_\infty=1$ et $\|f_n\|_1=\int_0^1x^n\,dx=\frac1{n+1}$ : le rapport $n+1$ n'est pas borné, donc $J^{-1}$ n'est pas continue. $J$ est pourtant linéaire, bijective et continue, car $\|f\|_1\le\|f\|_\infty$. Le théorème ne s'applique pas parce que $(E,\|\cdot\|_1)$ n'est pas complet.`,
      concept: 'complet-necessaire',
      source: poly(39, 'Annexe B, exercice 6, facile'),
    },
    {
      id: 'ce-ao-surjectivite',
      theoremId: 'application-ouverte',
      title: 'Injectif sans être surjectif',
      claim: t`Si $X,Y$ sont des Banach et $T\in\mathcal L(X,Y)$ est injectif, alors $T^{-1}:T(X)\to X$ est continu.`,
      correctStatement: t`Il faut que $T$ soit surjectif ; l'inverse est alors continu sur $Y$ tout entier.`,
      task: t`Sur $X=Y=\ell^2$, soit $Tx=(x_k/k)_{k\ge 1}$. Exprime $\|e_n\|/\|Te_n\|$ en fonction de $n$.`,
      check: { kind: 'expr-equiv', prompt: t`Rapport $\|e_n\|/\|Te_n\|$ en fonction de $n$`, expected: 'n', vars: ['n'] },
      explanation: t`$Te_n=e_n/n$, donc le rapport vaut $n$ et n'est pas borné : $T^{-1}$ n'est pas continu sur $T(\ell^2)$. Il n'y a pas de contradiction : $T$ n'est pas surjectif, car $(1/k)_k\in\ell^2$ aurait pour seul antécédent la suite constante égale à $1$, qui n'est pas dans $\ell^2$ ; et $T(\ell^2)$, dense et distinct de $\ell^2$, n'est pas complet.`,
      concept: 'hypotheses-theoreme',
      source: poly(9, 'Section 2.2 (hypothèse de surjectivité)'),
    },
    {
      id: 'ce-ao-coercivite',
      theoremId: 'application-ouverte',
      title: 'Inversible sans être coercive',
      claim: t`Si l'opérateur variationnel $L:V\to V'$ d'une forme bilinéaire continue $a$ est bijectif, alors $a$ est coercive.`,
      correctStatement: t`La coercivité suffit à la bijectivité, par Lax–Milgram, mais n'est pas nécessaire ; la stabilité ne demande que la bijectivité, avec la constante $\|L^{-1}\|$.`,
      task: t`Sur $V=H^1_0(]0,1[)$ muni de $(u,v)_V=\int_0^1u'v'$, soit $a(u,v)=\int_0^1u'v'-2\pi^2\int_0^1uv$ et $\varphi_k(x)=\sqrt2\sin(k\pi x)$. Calcule $a(\varphi_1,\varphi_1)/\pi^2$, puis $\|L^{-1}\|_{\mathcal L(V',V)}$.`,
      check: {
        kind: 'rational-vector',
        prompt: t`Valeurs de $a(\varphi_1,\varphi_1)/\pi^2$ et de $\|L^{-1}\|_{\mathcal L(V',V)}$`,
        expected: ['-1', '2'],
        labels: ['a(φ₁,φ₁)/π²', '‖L⁻¹‖'],
      },
      explanation: t`$\|\varphi_1\|_{L^2}=1$ et $\|\varphi_1'\|^2_{L^2}=\pi^2$, donc $a(\varphi_1,\varphi_1)=\pi^2-2\pi^2=-\pi^2$ : $a$ n'est pas coercive. Les $\varphi_k$ forment une base orthogonale de $V$ et, par intégration par parties, $a(\varphi_k,v)=(1-2/k^2)(\varphi_k,v)_V$ : à travers l'isométrie de Riesz, $L$ agit sur la $k$-ième coordonnée par multiplication par $1-2/k^2$. Ces nombres ne s'annulent pas et vérifient $|1-2/k^2|\ge\frac12$, avec égalité pour $k=2$ : $L$ est bijectif et $\|L^{-1}\|=2$.`,
      concept: 'hypotheses-theoreme',
      source: poly(39, 'Annexe B, exercice 6, difficile'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT06;
