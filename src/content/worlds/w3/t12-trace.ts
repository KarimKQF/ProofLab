/**
 * Résultat 12 — Théorème de trace.
 * Énoncé : polycopié, section 3.6 (p. PDF 14), donné avec une idée de preuve seulement.
 * Exercices : annexe B, exercice 12 (p. PDF 40). Les exercices travaillent le cas
 * démontrable de l'intervalle et l'usage du relèvement.
 */
import { t, rubric, poly, complement, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'trace.facile',
  theoremId: 'trace',
  level: 'facile',
  title: t`Une fonction de $H^1(]0,1[)$ à traces non nulles`,
  statement: t`On rappelle que toute fonction de $H^1(]0,1[)$ admet un unique représentant continu sur $[0,1]$, que sa trace aux deux extrémités est $\gamma w=(w(0),w(1))$, valeurs de ce représentant, et que $\ker\gamma=H^1_0(]0,1[)$. Soit $u(x)=1+x$ sur $]0,1[$. Montrer que $u\in H^1(]0,1[)$, calculer $\gamma u$, et en déduire que $u\notin H^1_0(]0,1[)$.`,
  source: poly(40, 'Exercice 12, facile'),
  prerequisites: ['distributions'],
  concepts: ['trace-ponctuelle', 'densite-fermeture', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-rep', kind: 'hypothese', text: t`Tout $w\in H^1(]0,1[)$ admet un unique représentant continu sur $[0,1]$, noté encore $w$.` },
      { id: 'd-H1', kind: 'definition', text: t`$H^1(]0,1[)=\{w\in L^2(]0,1[) : w'\in L^2(]0,1[)\}$, la dérivée étant prise au sens des distributions.` },
      { id: 'd-gamma', kind: 'definition', text: t`$\gamma w=(w(0),w(1))$, valeurs du représentant continu de $w\in H^1(]0,1[)$.` },
      { id: 'd-u', kind: 'definition', text: t`$u(x)=1+x$ pour $x\in]0,1[$.` },

      { id: 'u-c1', kind: 'consequence', text: t`$u$ se prolonge en une fonction de classe $C^1$ sur $[0,1]$, de dérivée classique $u'=1$.` },
      { id: 'u-weak', kind: 'egalite', text: t`La dérivée de $u$ au sens des distributions sur $]0,1[$ est la fonction constante $1$.` },
      { id: 'u-H1', kind: 'consequence', text: t`$u\in H^1(]0,1[)$.` },
      { id: 'rep', kind: 'consequence', text: t`La fonction continue $x\mapsto 1+x$, définie sur $[0,1]$, est le représentant continu de $u$.` },
      {
        id: 'tr',
        kind: 'egalite',
        text: t`$\gamma u=(1,2)$.`,
        masked: t`Valeur de $\gamma u$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Composantes de $\gamma u=(u(0),u(1))$`, expected: ['1', '2'], labels: ['u(0)', 'u(1)'] },
      },
      { id: 'non-H10', kind: 'consequence', text: t`$u\notin H^1_0(]0,1[)$.` },

      { id: 'fin', kind: 'conclusion', text: t`$u\in H^1(]0,1[)$ a des traces non nulles, $u(0)=1$ et $u(1)=2$ ; en particulier $u\notin H^1_0(]0,1[)$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-L2', kind: 'consequence', distractor: true, text: t`Toute classe de $L^2(]0,1[)$ possède une valeur bien définie en $0$.` },
      { id: 'x-H1-H10', kind: 'consequence', distractor: true, after: ['u-H1'], text: t`$H^1(]0,1[)=H^1_0(]0,1[)$, car $C^\infty_c(]0,1[)$ est dense dans $L^2(]0,1[)$.` },
    ],
    justifications: [
      { id: 'j-poly', label: 'Fonction polynomiale : dérivée classique sur l’intervalle fermé.' },
      { id: 'j-ipp', label: t`Pour $\varphi\in C^\infty_c(]0,1[)$, intégration par parties sans terme de bord : $-\int_0^1u\varphi'=\int_0^1u'\varphi$.`, theorem: 'distributions' },
      { id: 'j-borne', label: t`$u$ et sa dérivée sont bornées sur l'intervalle borné $]0,1[$, donc de carré intégrable.` },
      { id: 'j-unicite', label: t`Une fonction continue sur $[0,1]$ égale à $u$ sur $]0,1[$ est le représentant continu, qui est unique.` },
      { id: 'j-eval', label: 'Évaluation du représentant continu aux deux extrémités.' },
      { id: 'j-noyau', label: t`Noyau de la trace : $\ker\gamma=H^1_0(]0,1[)$.`, theorem: 'trace' },
      { id: 'j-syn', label: 'Réunion des propriétés établies.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-negl', label: t`Les points $0$ et $1$ sont négligeables : on peut y fixer les valeurs à volonté.` },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['d-u'], to: 'u-c1', by: 'j-poly' },
      { from: ['u-c1'], to: 'u-weak', by: 'j-ipp' },
      { from: ['u-c1', 'u-weak', 'd-H1'], to: 'u-H1', by: 'j-borne' },
      { from: ['u-c1', 'h-rep'], to: 'rep', by: 'j-unicite' },
      { from: ['rep', 'd-gamma', 'd-u'], to: 'tr', by: 'j-eval' },
      { from: ['tr', 'u-H1'], to: 'non-H10', by: 'j-noyau' },
      { from: ['u-H1', 'tr', 'non-H10'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'tr',
        by: 'j-negl',
        verdict: 'incorrect',
        concept: 'trace-ponctuelle',
        message: t`La trace n'est pas une valeur choisie arbitrairement en un point négligeable : c'est la valeur du représentant continu, qui est unique.`,
        counterexample: t`Si l'on posait « $\gamma u=(0,0)$ », aucun représentant continu de $u$ ne prendrait ces valeurs : $1+x$ vaut $1$ en $0$.`,
      },
      {
        conclusion: 'u-H1',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`L'appartenance à $H^1$ se vérifie : quelle est la dérivée au sens des distributions de $u$, et est-elle de carré intégrable ?`,
      },
      {
        conclusion: 'x-L2',
        verdict: 'incorrect',
        concept: 'trace-ponctuelle',
        message: t`Une classe de $L^2$ est définie à un ensemble négligeable près : sa « valeur en $0$ » n'a pas de sens, et la fonction peut même être non bornée près de $0$.`,
        counterexample: t`$x\mapsto x^{-1/4}$ appartient à $L^2(]0,1[)$ (car $\int_0^1x^{-1/2}dx=2$) et n'a pas de limite finie en $0$.`,
      },
      {
        conclusion: 'x-H1-H10',
        verdict: 'incorrect',
        concept: 'densite-fermeture',
        message: t`La densité dans $L^2$ ne dit rien de l'adhérence pour la norme de $H^1$ : $H^1_0(]0,1[)$ est un sous-espace fermé strict de $H^1(]0,1[)$.`,
        counterexample: t`$w=1$ appartient à $H^1(]0,1[)$, et $\gamma w=(1,1)\ne(0,0)$ : donc $w\notin H^1_0(]0,1[)$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-rep',
        label: 'Retirer l’existence d’un représentant continu',
        necessary: true,
        explanation: t`En dimension $1$, la trace est la valeur du représentant continu. En dimension $d\ge 2$, une fonction de $H^1$ peut n'avoir aucun représentant continu : la trace n'est plus une évaluation ponctuelle.`,
        counterexample: t`Sur le disque $B(0,1/2)\subset\mathbb R^2$, $w(x)=\log\log(1/|x|)$ appartient à $H^1$, car $\int|\nabla w|^2=2\pi\int_0^{1/2}\frac{dr}{r\log^2(1/r)}=\frac{2\pi}{\log 2}$, et elle n'est pas bornée au voisinage de $0$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational-vector', prompt: t`Pour $w(x)=\cos(\pi x)$ : composantes de $\gamma w$`, expected: ['1', '-1'], labels: ['w(0)', 'w(1)'] }],
  solution: t`**Appartenance à $H^1$.** $u(x)=1+x$ se prolonge en une fonction de classe $C^1$ sur $[0,1]$. Pour $\varphi\in C^\infty_c(]0,1[)$, l'intégration par parties ne produit aucun terme de bord : $-\int_0^1u\varphi'=\int_0^1\varphi$. La dérivée au sens des distributions est donc la constante $1$. Comme $u$ et $u'$ sont bornées sur l'intervalle borné $]0,1[$, elles sont de carré intégrable : $u\in H^1(]0,1[)$.

**Trace.** La fonction continue $x\mapsto 1+x$ sur $[0,1]$ est l'unique représentant continu de $u$. Donc $\gamma u=(u(0),u(1))=(1,2)$.

**Conséquence.** $\gamma u\ne(0,0)$ et $\ker\gamma=H^1_0(]0,1[)$ : $u\notin H^1_0(]0,1[)$.

**Point de vigilance.** La trace n'est pas une valeur fixée arbitrairement en un point négligeable : elle provient du représentant continu, et elle a un sens parce que $u\in H^1$. Une classe de $L^2$ n'a pas de valeur en $0$.`,
  steps: [
    t`Calculer la dérivée de $u$ au sens des distributions.`,
    t`Vérifier que $u$ et $u'$ sont dans $L^2(]0,1[)$.`,
    'Identifier le représentant continu et l’évaluer aux extrémités.',
    t`Conclure par $\ker\gamma=H^1_0(]0,1[)$.`,
  ],
  commonErrors: [
    { id: 'e-valeur-L2', description: t`Attribuer une valeur en un point à une classe de $L^2$.`, concept: 'trace-ponctuelle' },
    { id: 'e-densite', description: t`Déduire $H^1=H^1_0$ de la densité de $C^\infty_c$ dans $L^2$.`, concept: 'densite-fermeture' },
  ],
  hints: [
    t`Pour parler de $u(0)$ et $u(1)$, il faut savoir à quel espace appartient $u$ et quel représentant on évalue.`,
    t`Calcule la dérivée au sens des distributions de $u$, vérifie l'appartenance à $H^1$, puis évalue le représentant continu en $0$ et en $1$.`,
    t`$u'=1$ au sens des distributions, $u\in H^1(]0,1[)$, $\gamma u=(1,2)\neq(0,0)$ ; le noyau de $\gamma$ est $H^1_0(]0,1[)$.`,
  ],
  rubric: rubric({
    hypotheses: t`L'appartenance $u\in H^1(]0,1[)$ est établie avant de parler de trace.`,
    methode: 'La trace est calculée sur le représentant continu.',
    validite: 'La dérivée distributionnelle est identifiée à la dérivée classique par une intégration par parties justifiée.',
    justifications: 'Aucune valeur n’est fixée arbitrairement sur un ensemble négligeable.',
    conclusion: t`$\gamma u=(1,2)$ et $u\notin H^1_0(]0,1[)$.`,
  }),
  variant: {
    statement: t`Soit $v(x)=x^{3/4}$ sur $]0,1[$. Montrer que $v\in H^1(]0,1[)$, bien que $v$ ne soit pas de classe $C^1$ sur $[0,1]$, calculer $\gamma v$, et décider si $v\in H^1_0(]0,1[)$.`,
    solution: t`Pour $\varphi\in C^\infty_c(]0,1[)$, le support de $\varphi$ est contenu dans un segment $[a,b]\subset]0,1[$, sur lequel $v$ est de classe $C^1$ : l'intégration par parties donne $-\int_0^1v\varphi'=\int_0^1\tfrac34x^{-1/4}\varphi$. Donc $v'=\tfrac34x^{-1/4}$, qui est de carré intégrable car $\int_0^1x^{-1/2}dx=2$. Ainsi $v\in H^1(]0,1[)$. La fonction $x\mapsto x^{3/4}$ est continue sur $[0,1]$ : c'est le représentant continu, et $\gamma v=(0,1)$. Comme $\gamma v\ne(0,0)$, $v\notin H^1_0(]0,1[)$.`,
    closedChecks: [{ kind: 'rational-vector', prompt: t`Composantes de $\gamma v$`, expected: ['0', '1'], labels: ['v(0)', 'v(1)'] }],
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'trace.intermediaire',
  theoremId: 'trace',
  level: 'intermediaire',
  title: t`$H^1_0(]0,1[)$ est le noyau de la trace aux deux extrémités`,
  statement: t`On rappelle que tout $w\in H^1(]0,1[)$ admet un unique représentant continu sur $[0,1]$, noté encore $w$, et que $w(y)-w(x)=\int_x^yw'$ pour tous $x,y\in[0,1]$. Soit $\gamma w=(w(0),w(1))$. Démontrer que $\gamma:H^1(]0,1[)\to\mathbb R^2$ est continue, puis que $\ker\gamma=H^1_0(]0,1[)$, où $H^1_0(]0,1[)$ est l'adhérence de $C^\infty_c(]0,1[)$ dans $H^1(]0,1[)$.`,
  source: poly(40, 'Exercice 12, intermédiaire'),
  prerequisites: ['distributions'],
  concepts: ['densite-fermeture', 'trace-ponctuelle', 'utilisation-prematuree', 'hypotheses-theoreme'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'd-H1', kind: 'definition', text: t`Tout $w\in H^1(]0,1[)$ admet un unique représentant continu sur $[0,1]$, noté encore $w$, et $w(y)-w(x)=\int_x^yw'$ pour tous $x,y\in[0,1]$.` },
      { id: 'd-H10', kind: 'definition', text: t`$H^1_0(]0,1[)$ est l'adhérence de $C^\infty_c(]0,1[)$ dans $H^1(]0,1[)$.` },
      { id: 'd-gamma', kind: 'definition', text: t`$\gamma:H^1(]0,1[)\to\mathbb R^2$, $\gamma w=(w(0),w(1))$.` },

      { id: 'borne', kind: 'inegalite', text: t`Pour tout $w\in H^1(]0,1[)$ et tout $x\in[0,1]$ : $|w(x)|\le\sqrt2\,\|w\|_{H^1}$.` },
      { id: 'cont', kind: 'consequence', text: t`$\gamma$ est linéaire et continue de $H^1(]0,1[)$ dans $\mathbb R^2$.` },

      { id: 's-dir', kind: 'definition', local: true, text: t`Soit $w\in H^1_0(]0,1[)$ et $(\varphi_n)\subset C^\infty_c(]0,1[)$ telle que $\varphi_n\to w$ dans $H^1(]0,1[)$.` },
      { id: 'gphi', kind: 'egalite', text: t`$\gamma\varphi_n=(0,0)$ pour tout $n$.` },
      { id: 'gw', kind: 'egalite', text: t`$\gamma w=\lim_n\gamma\varphi_n=(0,0)$.` },
      { id: 'dir', kind: 'inclusion', text: t`$H^1_0(]0,1[)\subset\ker\gamma$.` },

      { id: 's-rec', kind: 'definition', local: true, text: t`Soit $w\in H^1(]0,1[)$ tel que $\gamma w=(0,0)$.` },
      { id: 'int', kind: 'egalite', text: t`$w(x)=\int_0^xw'$ pour tout $x\in[0,1]$, et $\int_0^1w'=0$.` },
      { id: 'approx', kind: 'consequence', text: t`Il existe $\psi_n\in C^\infty_c(]0,1[)$ telles que $\psi_n\to w'$ dans $L^2(]0,1[)$.` },
      { id: 'correc', kind: 'consequence', text: t`Pour $\theta\in C^\infty_c(]0,1[)$ d'intégrale $1$, les fonctions $\tilde\psi_n=\psi_n-\big(\int_0^1\psi_n\big)\theta$ sont dans $C^\infty_c(]0,1[)$, d'intégrale nulle, et $\tilde\psi_n\to w'$ dans $L^2$.` },
      { id: 'prim', kind: 'consequence', text: t`$\varphi_n(x)=\int_0^x\tilde\psi_n$ définit $\varphi_n\in C^\infty_c(]0,1[)$.` },
      { id: 'conv', kind: 'inegalite', text: t`$\varphi_n'=\tilde\psi_n\to w'$ dans $L^2$, et $\sup_{x\in[0,1]}|\varphi_n(x)-w(x)|\le\|\tilde\psi_n-w'\|_{L^2}$.` },
      { id: 'H1', kind: 'consequence', text: t`$\varphi_n\to w$ dans $H^1(]0,1[)$ : $w\in H^1_0(]0,1[)$.` },
      { id: 'rec', kind: 'inclusion', text: t`$\ker\gamma\subset H^1_0(]0,1[)$.` },

      { id: 'fin', kind: 'conclusion', text: t`$\gamma$ est continue et $\ker\gamma=H^1_0(]0,1[)$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-L2-approx', kind: 'consequence', distractor: true, after: ['approx'], text: t`Tout $w\in H^1(]0,1[)$ est limite dans $L^2$ de fonctions de $C^\infty_c(]0,1[)$ : donc $w\in H^1_0(]0,1[)$.` },
      { id: 'x-prim', kind: 'consequence', distractor: true, after: ['approx'], text: t`Pour tout $\psi\in C^\infty_c(]0,1[)$, la primitive $x\mapsto\int_0^x\psi$ appartient à $C^\infty_c(]0,1[)$.` },
    ],
    justifications: [
      { id: 'j-sup', label: t`$|w(x)|\le|w(y)|+\|w'\|_{L^2}$ pour tous $x,y$ ; on intègre en $y\in[0,1]$, puis $a+b\le\sqrt2\sqrt{a^2+b^2}$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-cont', label: 'Une application linéaire bornée sur la boule unité est continue.' },
      { id: 'j-support', label: t`Une fonction de $C^\infty_c(]0,1[)$ est nulle au voisinage de $0$ et de $1$.` },
      { id: 'j-lim-cont', label: t`Continuité de $\gamma$ pour la norme de $H^1$, et convergence $\varphi_n\to w$ dans $H^1$.` },
      { id: 'j-arb', label: t`L'élément $w$ était arbitraire.` },
      { id: 'j-rep', label: t`Formule $w(x)-w(0)=\int_0^xw'$ et conditions $w(0)=w(1)=0$.` },
      { id: 'j-dens-L2', label: t`Densité de $C^\infty_c(]0,1[)$ dans $L^2(]0,1[)$, appliquée à $w'\in L^2$.`, theorem: 'densite-cinf' },
      { id: 'j-moyenne', label: t`$|\int_0^1\psi_n|=|\int_0^1(\psi_n-w')|\le\|\psi_n-w'\|_{L^2}\to 0$, car $\int_0^1w'=0$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-prim', label: t`$\tilde\psi_n$ est nulle près de $0$ et près de $1$, et d'intégrale nulle : sa primitive nulle en $0$ s'annule aussi près de $1$.` },
      { id: 'j-cs-sup', label: t`$|\varphi_n(x)-w(x)|=\big|\int_0^x(\tilde\psi_n-w')\big|\le\|\tilde\psi_n-w'\|_{L^2}$, par Cauchy–Schwarz.`, theorem: 'cauchy-schwarz' },
      { id: 'j-def-H10', label: t`Convergence uniforme, donc dans $L^2$, des fonctions et convergence $L^2$ des dérivées ; définition de $H^1_0$ comme adhérence.` },
      { id: 'j-double', label: 'Double inclusion, et continuité déjà établie.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-trace-gen', label: t`Théorème de trace : $\ker\gamma=H^1_0$.`, theorem: 'trace' },
      { id: 'j-cont-L2', label: t`Continuité de $\gamma$ pour la norme de $L^2(]0,1[)$.` },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['d-H1'], to: 'borne', by: 'j-sup' },
      { from: ['borne', 'd-gamma'], to: 'cont', by: 'j-cont' },

      { from: ['s-dir', 'd-gamma'], to: 'gphi', by: 'j-support' },
      { from: ['gphi', 'cont', 's-dir'], to: 'gw', by: 'j-lim-cont' },
      { from: ['gw'], to: 'dir', by: 'j-arb' },

      { from: ['s-rec', 'd-H1'], to: 'int', by: 'j-rep' },
      { from: ['s-rec'], to: 'approx', by: 'j-dens-L2' },
      { from: ['approx', 'int'], to: 'correc', by: 'j-moyenne' },
      { from: ['correc'], to: 'prim', by: 'j-prim' },
      { from: ['prim', 'int'], to: 'conv', by: 'j-cs-sup' },
      { from: ['conv', 'd-H10'], to: 'H1', by: 'j-def-H10' },
      { from: ['H1'], to: 'rec', by: 'j-arb' },

      { from: ['dir', 'rec', 'cont'], to: 'fin', by: 'j-double' },
    ],
    traps: [
      {
        conclusion: 'gw',
        by: 'j-cont-L2',
        verdict: 'incorrect',
        concept: 'trace-ponctuelle',
        message: t`$\gamma$ n'est pas continue pour la norme de $L^2$ : c'est le contrôle par la norme de $H^1$ qui permet le passage à la limite.`,
        counterexample: t`$u_n(x)=(1-nx)^+$ vérifie $u_n(0)=1$ pour tout $n$, alors que $\|u_n\|_{L^2}^2=1/(3n)\to 0$.`,
      },
      {
        conclusion: 'prim',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`Pourquoi la primitive s'annule-t-elle près de $1$ ? C'est précisément le rôle de la correction d'intégrale.`,
      },
      {
        conclusion: 'x-L2-approx',
        verdict: 'incorrect',
        concept: 'densite-fermeture',
        message: t`$H^1_0(]0,1[)$ est l'adhérence pour la norme de $H^1$, non pour celle de $L^2$. Approcher dans $L^2$ ne contrôle ni les dérivées, ni les valeurs au bord.`,
        counterexample: t`$w=1$ est limite dans $L^2$ de fonctions de $C^\infty_c(]0,1[)$, mais $\gamma w=(1,1)\ne(0,0)$, donc $w\notin H^1_0(]0,1[)$.`,
      },
      {
        conclusion: 'x-prim',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`La primitive nulle en $0$ d'une fonction de $C^\infty_c(]0,1[)$ vaut, près de $1$, l'intégrale totale : elle n'est à support compact que si cette intégrale est nulle.`,
        counterexample: t`Si $\psi\ge 0$ et $\int_0^1\psi=1$, la primitive vaut $1$ au voisinage de $1$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'borne',
        label: t`Retirer le contrôle $|w(x)|\le\sqrt2\,\|w\|_{H^1}$`,
        necessary: true,
        explanation: t`Sans ce contrôle, la continuité de $\gamma$ et le passage à la limite $\gamma\varphi_n\to\gamma w$ disparaissent : la norme de $L^2$ seule ne contrôle pas les valeurs au bord.`,
        counterexample: t`$u_n(x)=(1-nx)^+$ : $u_n(0)=1$ et $\|u_n\|_{L^2}\to 0$.`,
      },
      {
        hypothesis: 's-rec',
        label: t`Retirer l'hypothèse $\gamma w=(0,0)$`,
        necessary: true,
        explanation: t`Sans traces nulles, la primitive corrigée ne peut plus approcher $w$ : $w(0)\ne 0$ ou $\int_0^1w'\ne 0$.`,
        counterexample: t`$w=1\in H^1(]0,1[)$ n'appartient pas à $H^1_0(]0,1[)$, puisque $\gamma w=(1,1)$ et $H^1_0(]0,1[)\subset\ker\gamma$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Pour $w(x)=x(1-x)$ : valeur de $\|w\|_{H^1}^2$`, expected: '11/30' }],
  solution: t`**Continuité.** Pour $w\in H^1(]0,1[)$ et $x,y\in[0,1]$, $|w(x)|\le|w(y)|+\int_0^1|w'|\le|w(y)|+\|w'\|_{L^2}$. En intégrant en $y\in[0,1]$ : $|w(x)|\le\|w\|_{L^2}+\|w'\|_{L^2}\le\sqrt2\,\|w\|_{H^1}$. L'application linéaire $\gamma$ est donc continue.

**$H^1_0\subset\ker\gamma$.** Si $\varphi_n\in C^\infty_c(]0,1[)$ converge vers $w$ dans $H^1$, alors $\gamma\varphi_n=(0,0)$, et par continuité $\gamma w=(0,0)$.

**$\ker\gamma\subset H^1_0$.** Soit $w\in H^1(]0,1[)$ avec $w(0)=w(1)=0$. Alors $w(x)=\int_0^xw'$ et $\int_0^1w'=0$. Choisissons $\psi_n\in C^\infty_c(]0,1[)$ avec $\psi_n\to w'$ dans $L^2$, et $\theta\in C^\infty_c(]0,1[)$ d'intégrale $1$. Comme $|\int_0^1\psi_n|\le\|\psi_n-w'\|_{L^2}\to 0$, les fonctions $\tilde\psi_n=\psi_n-(\int_0^1\psi_n)\theta$ sont dans $C^\infty_c(]0,1[)$, d'intégrale nulle, et tendent vers $w'$ dans $L^2$. Leur primitive $\varphi_n(x)=\int_0^x\tilde\psi_n$ s'annule près de $0$ et, l'intégrale totale étant nulle, près de $1$ : $\varphi_n\in C^\infty_c(]0,1[)$. Enfin $\varphi_n'\to w'$ dans $L^2$ et $|\varphi_n(x)-w(x)|\le\|\tilde\psi_n-w'\|_{L^2}$ uniformément : $\varphi_n\to w$ dans $H^1$, donc $w\in H^1_0(]0,1[)$.

**Point de vigilance.** Le théorème général de trace ne peut pas servir ici : c'est précisément son cas particulier que l'on démontre. La correction d'intégrale est indispensable.`,
  steps: [
    t`Établir $|w(x)|\le\sqrt2\,\|w\|_{H^1}$, d'où la continuité de $\gamma$.`,
    t`Montrer $H^1_0\subset\ker\gamma$ par passage à la limite.`,
    t`Pour $w\in\ker\gamma$, approcher $w'$ par des fonctions test d'intégrale nulle.`,
    'Prendre les primitives, et vérifier la convergence dans $H^1$.',
  ],
  commonErrors: [
    { id: 'e-L2', description: t`Approcher $w$ dans $L^2$ seulement et conclure à $w\in H^1_0$.`, concept: 'densite-fermeture' },
    { id: 'e-primitive', description: 'Oublier que la primitive d’une fonction test n’est à support compact que si son intégrale est nulle.', concept: 'hypotheses-theoreme' },
    { id: 'e-circulaire', description: 'Invoquer le théorème général de trace pour démontrer son cas particulier.', concept: 'utilisation-prematuree' },
  ],
  hints: [
    t`Deux inclusions sont à démontrer. Laquelle utilise la continuité de $\gamma$, et pour quelle norme ?`,
    t`Pour $\ker\gamma\subset H^1_0$, approche plutôt $w'$ que $w$ : les primitives des approximations s'annulent en $0$, et il reste à les faire s'annuler près de $1$.`,
    t`Corrige l'intégrale : $\tilde\psi_n=\psi_n-(\int_0^1\psi_n)\theta$ avec $\int\theta=1$. Alors $\varphi_n=\int_0^x\tilde\psi_n\in C^\infty_c(]0,1[)$ et $\sup|\varphi_n-w|\le\|\tilde\psi_n-w'\|_{L^2}$.`,
  ],
  rubric: rubric({
    hypotheses: 'La définition de $H^1_0$ comme adhérence pour la norme de $H^1$ est utilisée telle quelle.',
    methode: 'Double inclusion : continuité de la trace, puis approximation par des primitives.',
    validite: 'La correction d’intégrale garantit le support compact des approximations.',
    justifications: 'Les convergences sont établies dans la bonne norme ; aucun résultat n’est utilisé prématurément.',
    conclusion: t`$\ker\gamma=H^1_0(]0,1[)$ est établi.`,
  }),
  variant: {
    statement: t`Soit $W=\{w\in H^1(]0,1[) : w(0)=0\}$. Montrer que $W$ est fermé dans $H^1(]0,1[)$ et qu'il est l'adhérence dans $H^1(]0,1[)$ de l'ensemble des $\varphi\in C^\infty([0,1])$ nulles au voisinage de $0$.`,
    solution: t`$W$ est le noyau de la forme linéaire $w\mapsto w(0)$, continue sur $H^1(]0,1[)$ car $|w(0)|\le\sqrt2\,\|w\|_{H^1}$ : il est fermé, et il contient les fonctions nulles près de $0$, donc leur adhérence. Réciproquement, pour $w\in W$, on choisit $\psi_n\in C^\infty_c(]0,1[)$ avec $\psi_n\to w'$ dans $L^2$, et on pose $\varphi_n(x)=\int_0^x\psi_n$ : $\varphi_n$ est de classe $C^\infty$ sur $[0,1]$, nulle près de $0$, et aucune correction d'intégrale n'est nécessaire puisqu'aucune condition n'est imposée en $1$. Comme $w(x)=\int_0^xw'$, on a $\sup|\varphi_n-w|\le\|\psi_n-w'\|_{L^2}$ et $\varphi_n'\to w'$ dans $L^2$ : $\varphi_n\to w$ dans $H^1$.`,
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'trace.difficile',
  theoremId: 'trace',
  level: 'difficile',
  title: 'Donnée de Dirichlet non homogène : relèvement',
  statement: t`Soient $\Omega\subset\mathbb R^d$ un ouvert borné lipschitzien, $V=H^1_0(\Omega)$ muni de $\|v\|_V=\|\nabla v\|_{L^2}$, $f\in H^{-1}(\Omega)=V'$ et $g\in H^{1/2}(\partial\Omega)$. On cherche $u\in H^1(\Omega)$ tel que $\gamma u=g$ et $-\Delta u=f$ dans $\mathcal D'(\Omega)$. À l'aide d'un relèvement $G\in H^1(\Omega)$ de $g$, transformer ce problème en un problème pour l'inconnue de trace nulle $w=u-G\in V$. En déduire l'existence et l'unicité de $u$, son indépendance vis-à-vis du relèvement choisi, et une estimation $\|u\|_{H^1}\le C\big(\|f\|_{H^{-1}}+\|g\|_{H^{1/2}(\partial\Omega)}\big)$.`,
  source: poly(40, 'Exercice 12, difficile ; théorème de trace et relèvement (section 3.6, p. PDF 14)'),
  prerequisites: ['lax-milgram', 'poincare', 'distributions'],
  concepts: ['trace-relevement', 'trace-ponctuelle', 'hypotheses-theoreme', 'existence-unicite'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-omega', kind: 'hypothese', text: t`$\Omega\subset\mathbb R^d$ est un ouvert borné lipschitzien.` },
      { id: 'h-f', kind: 'hypothese', text: t`$f\in H^{-1}(\Omega)=V'$.` },
      { id: 'h-g', kind: 'hypothese', text: t`$g\in H^{1/2}(\partial\Omega)$.` },
      { id: 'd-V', kind: 'definition', text: t`$V=H^1_0(\Omega)$, muni de $\|v\|_V=\|\nabla v\|_{L^2}$, et $a(w,v)=\int_\Omega\nabla w\cdot\nabla v$ pour $w,v\in V$.` },
      { id: 'd-pb', kind: 'definition', text: t`$(P)$ : trouver $u\in H^1(\Omega)$ tel que $\gamma u=g$ et $-\Delta u=f$ dans $\mathcal D'(\Omega)$.` },

      { id: 'rel', kind: 'application-theoreme', text: t`Il existe $G\in H^1(\Omega)$ tel que $\gamma G=g$ et $\|G\|_{H^1}\le C_R\|g\|_{H^{1/2}(\partial\Omega)}$ (on prend $G=Rg$).` },
      { id: 'poinc', kind: 'application-theoreme', text: t`Il existe $C_P>0$ tel que $\|v\|_{L^2}\le C_P\|\nabla v\|_{L^2}$ pour tout $v\in V$ : $V$ est un espace de Hilbert pour $a$.` },
      { id: 'w-V', kind: 'consequence', text: t`Si $u$ résout $(P)$, alors $w=u-G\in V$.` },
      { id: 'u-trace', kind: 'consequence', text: t`Réciproquement, pour tout $w\in V$, $u=G+w$ appartient à $H^1(\Omega)$ et $\gamma u=g$.` },
      { id: 'L-cont', kind: 'inegalite', text: t`$L(v)=\langle f,v\rangle-\int_\Omega\nabla G\cdot\nabla v$ définit $L\in V'$, avec $\|L\|_{V'}\le\|f\|_{V'}+\|\nabla G\|_{L^2}$.` },
      { id: 'form', kind: 'consequence', text: t`Pour $u=G+w$ avec $w\in V$ : $-\Delta u=f$ dans $\mathcal D'(\Omega)$ si et seulement si $a(w,v)=L(v)$ pour tout $v\in V$.` },
      { id: 'a-ok', kind: 'consequence', text: t`$|a(w,v)|\le\|w\|_V\|v\|_V$ et $a(w,w)=\|w\|_V^2$ : $a$ est continue et coercive sur $V$.` },
      { id: 'lm', kind: 'application-theoreme', text: t`Il existe un unique $w\in V$ tel que $a(w,v)=L(v)$ pour tout $v\in V$, et $\|w\|_V\le\|L\|_{V'}$.` },
      { id: 'exist', kind: 'consequence', text: t`$u=G+w$ résout $(P)$.` },
      { id: 'unic', kind: 'consequence', text: t`$(P)$ admet au plus une solution.` },
      { id: 'indep', kind: 'consequence', text: t`La solution de $(P)$ ne dépend pas du relèvement $G$ choisi.` },
      { id: 'estim', kind: 'inegalite', text: t`$\|u\|_{H^1}\le C\big(\|f\|_{H^{-1}}+\|g\|_{H^{1/2}(\partial\Omega)}\big)$, où $C$ ne dépend que de $C_P$ et de $C_R$.` },

      { id: 'fin', kind: 'conclusion', text: t`$(P)$ admet une unique solution $u=G+w$, indépendante du relèvement, avec $\|u\|_{H^1}\le C\big(\|f\|_{H^{-1}}+\|g\|_{H^{1/2}(\partial\Omega)}\big)$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-signe', kind: 'consequence', distractor: true, after: ['rel'], text: t`Pour $u=G+w$ : $-\Delta u=f$ équivaut à $a(w,v)=\langle f,v\rangle+\int_\Omega\nabla G\cdot\nabla v$ pour tout $v\in V$.` },
      { id: 'x-G-H2', kind: 'consequence', distractor: true, after: ['rel'], text: t`Le relèvement vérifie $\Delta G\in L^2(\Omega)$.` },
      { id: 'x-u-V', kind: 'consequence', distractor: true, after: ['exist'], text: t`La solution $u$ de $(P)$ appartient à $H^1_0(\Omega)$.` },
      { id: 'x-coer-H1', kind: 'consequence', distractor: true, text: t`On peut chercher $u$ directement dans $H^1(\Omega)$, où $a$ est coercive.` },
    ],
    justifications: [
      { id: 'j-relev', label: t`Théorème de trace : existence d'un relèvement linéaire continu $R$ de $H^{1/2}(\partial\Omega)$ vers $H^1(\Omega)$.`, theorem: 'trace' },
      { id: 'j-poinc', label: t`Inégalité de Poincaré sur l'ouvert borné $\Omega$.`, theorem: 'poincare' },
      { id: 'j-noyau', label: t`Linéarité de $\gamma$ : $\gamma(u-G)=g-g=0$, et $\ker\gamma=H^1_0(\Omega)$.`, theorem: 'trace' },
      { id: 'j-noyau-rec', label: t`Linéarité de $\gamma$, et $\gamma w=0$ pour $w\in H^1_0(\Omega)$.`, theorem: 'trace' },
      { id: 'j-L', label: t`Cauchy–Schwarz : $|\int_\Omega\nabla G\cdot\nabla v|\le\|\nabla G\|_{L^2}\|v\|_V$, et $f\in V'$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-test-dens', label: t`Pour $\varphi\in C^\infty_c(\Omega)$ : $\langle-\Delta u,\varphi\rangle=\int_\Omega\nabla w\cdot\nabla\varphi+\int_\Omega\nabla G\cdot\nabla\varphi$ ; puis densité de $C^\infty_c(\Omega)$ dans $V$, les deux membres étant continus sur $V$.`, theorem: 'distributions' },
      { id: 'j-a', label: t`Cauchy–Schwarz, et définition de la norme de $V$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-lm', label: 'Théorème de Lax–Milgram.', theorem: 'lax-milgram' },
      { id: 'j-exist', label: t`La reformulation, appliquée à l'élément $w$ fourni par Lax–Milgram.` },
      { id: 'j-unic', label: t`Si $u_1,u_2$ résolvent $(P)$, alors $u_1-G$ et $u_2-G$ résolvent le même problème dans $V$ : unicité de Lax–Milgram.` },
      { id: 'j-indep', label: t`Un autre relèvement $G'$ fournit une solution $G'+w'$ de $(P)$ : par unicité, c'est la même.` },
      { id: 'j-estim', label: t`$\|u\|_{H^1}\le\|G\|_{H^1}+\sqrt{1+C_P^2}\,\|w\|_V$, puis $\|w\|_V\le\|f\|_{V'}+\|\nabla G\|_{L^2}$ et $\|G\|_{H^1}\le C_R\|g\|_{H^{1/2}}$.` },
      { id: 'j-syn', label: 'Réunion de l’existence, de l’unicité, de l’indépendance et de l’estimation.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-ponctuel', label: t`Comme $u=G$ en chaque point de $\partial\Omega$, la différence $u-G$ est nulle au bord.` },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['h-omega', 'h-g'], to: 'rel', by: 'j-relev' },
      { from: ['h-omega', 'd-V'], to: 'poinc', by: 'j-poinc' },
      { from: ['d-pb', 'rel', 'h-omega'], to: 'w-V', by: 'j-noyau' },
      { from: ['rel', 'd-V'], to: 'u-trace', by: 'j-noyau-rec' },
      { from: ['h-f', 'rel', 'd-V'], to: 'L-cont', by: 'j-L' },
      { from: ['d-V', 'rel', 'L-cont'], to: 'form', by: 'j-test-dens' },
      { from: ['d-V', 'poinc'], to: 'a-ok', by: 'j-a' },
      { from: ['poinc', 'a-ok', 'L-cont'], to: 'lm', by: 'j-lm' },
      { from: ['lm', 'form', 'u-trace'], to: 'exist', by: 'j-exist' },
      { from: ['w-V', 'form', 'lm'], to: 'unic', by: 'j-unic' },
      { from: ['exist', 'unic'], to: 'indep', by: 'j-indep' },
      { from: ['lm', 'L-cont', 'rel', 'poinc'], to: 'estim', by: 'j-estim' },
      { from: ['exist', 'unic', 'indep', 'estim'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'w-V',
        by: 'j-ponctuel',
        verdict: 'incorrect',
        concept: 'trace-ponctuelle',
        message: t`En dimension $d\ge 2$, une fonction de $H^1$ n'a pas de valeur ponctuelle au bord : l'égalité $\gamma u=\gamma G$ a lieu dans $H^{1/2}(\partial\Omega)$, et c'est $\ker\gamma=H^1_0(\Omega)$ qui conclut.`,
      },
      {
        conclusion: 'form',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`La reformulation se démontre : écris $\langle-\Delta u,\varphi\rangle$ contre une fonction test, sépare les contributions de $w$ et de $G$, puis passe à tout $V$ par densité.`,
      },
      {
        conclusion: 'x-signe',
        verdict: 'incorrect',
        concept: 'trace-relevement',
        message: t`Le terme de relèvement change de signe en passant à droite : $\int_\Omega\nabla w\cdot\nabla v=\langle f,v\rangle-\int_\Omega\nabla G\cdot\nabla v$.`,
        counterexample: t`$d=1$, $\Omega=]0,1[$, $f=0$, $g=(0,1)$, $G(x)=x^2$ : le bon signe donne $w=x-x^2$ et $u=x$ ; le signe faux donne $w=x^2-x$ et $u=2x^2-x$, qui ne vérifie pas $-u''=0$.`,
      },
      {
        conclusion: 'x-G-H2',
        verdict: 'incorrect',
        concept: 'trace-relevement',
        message: t`Un relèvement n'est que dans $H^1(\Omega)$ : $\Delta G$ n'est en général qu'un élément de $H^{-1}(\Omega)$, d'où l'écriture faible $\int_\Omega\nabla G\cdot\nabla v$.`,
        counterexample: t`$d=1$, $\Omega=]0,1[$ : $G(x)=|x-1/2|$ relève $g=(1/2,1/2)$, appartient à $H^1(]0,1[)$, et $G''=2\delta_{1/2}\notin L^2$.`,
      },
      {
        conclusion: 'x-u-V',
        verdict: 'incorrect',
        concept: 'trace-relevement',
        message: t`$\gamma u=g$ et $\ker\gamma=H^1_0(\Omega)$ : $u\in H^1_0(\Omega)$ si et seulement si $g=0$. C'est l'inconnue $w=u-G$ qui vit dans $H^1_0$.`,
        counterexample: t`$d=1$, $f=0$, $g=(0,1)$ : $u(x)=x$ et $\gamma u=(0,1)\neq(0,0)$.`,
      },
      {
        conclusion: 'x-coer-H1',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`$a$ n'est pas coercive sur $H^1(\Omega)$ : les constantes annulent $a(u,u)$. La coercivité n'a lieu que sur $H^1_0(\Omega)$, par Poincaré.`,
        counterexample: t`$u=1$ : $a(1,1)=0$, alors que $\|1\|_{H^1}^2=|\Omega|>0$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-g',
        label: t`Retirer $g\in H^{1/2}(\partial\Omega)$`,
        necessary: true,
        explanation: t`L'image de $\gamma$ est exactement $H^{1/2}(\partial\Omega)$ : une donnée seulement de carré intégrable sur le bord peut n'être la trace d'aucune fonction de $H^1(\Omega)$.`,
        counterexample: t`Sur le disque unité, $g(\theta)=\sum_{n\ge 1}\cos(n\theta)/n$ est dans $L^2(\partial\Omega)$ car $\sum_n1/n^2<\infty$, mais pas dans $H^{1/2}(\partial\Omega)$ car $\sum_n n\cdot(1/n)^2=+\infty$ : aucun $u\in H^1$ n'a pour trace $g$.`,
      },
      {
        hypothesis: 'h-omega',
        label: t`Retirer l'hypothèse « borné lipschitzien »`,
        necessary: true,
        explanation: 'Le théorème de trace et l’inégalité de Poincaré reposent sur cette hypothèse.',
        counterexample: t`Sur le carré fendu $]-1,1[^2\setminus\big([0,1[\times\{0\}\big)$, non lipschitzien, $u=\theta\,\chi(r)$ (angle $\theta\in]0,2\pi[$, $\chi\in C^\infty_c(]0,1[)$, $\chi(1/2)=1$) appartient à $H^1$ et tend vers $0$ au-dessus de la fente, vers $2\pi\chi(r)$ au-dessous : sa valeur au bord n'est pas univoque.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Pour $d=1$, $\Omega=]0,1[$, $f=2$ et $g=(1,3)$ : valeur de $u(1/2)$`, expected: '9/4' }],
  solution: t`**Relèvement.** Par le théorème de trace, il existe $G=Rg\in H^1(\Omega)$ avec $\gamma G=g$ et $\|G\|_{H^1}\le C_R\|g\|_{H^{1/2}}$.

**Changement d'inconnue.** Si $u$ résout $(P)$, alors $\gamma(u-G)=0$, donc $w=u-G\in\ker\gamma=H^1_0(\Omega)=V$. Réciproquement, pour $w\in V$, $u=G+w\in H^1(\Omega)$ et $\gamma u=g$.

**Équation pour $w$.** Pour $\varphi\in C^\infty_c(\Omega)$ : $\langle-\Delta u,\varphi\rangle=\int_\Omega\nabla u\cdot\nabla\varphi=\int_\Omega\nabla w\cdot\nabla\varphi+\int_\Omega\nabla G\cdot\nabla\varphi$. Donc $-\Delta u=f$ équivaut à $a(w,\varphi)=L(\varphi)$ pour tout $\varphi\in C^\infty_c(\Omega)$, avec $L(v)=\langle f,v\rangle-\int_\Omega\nabla G\cdot\nabla v$. Comme $|L(v)|\le(\|f\|_{V'}+\|\nabla G\|_{L^2})\|v\|_V$, $L\in V'$, et la densité de $C^\infty_c(\Omega)$ dans $V$ étend l'égalité à tout $v\in V$.

**Existence et unicité.** Par Poincaré, $V$ est un espace de Hilbert pour $a$, et $a$ est continue et coercive. Lax–Milgram donne un unique $w\in V$, avec $\|w\|_V\le\|L\|_{V'}$ ; $u=G+w$ résout $(P)$. Si $u_1,u_2$ sont solutions, $u_1-G$ et $u_2-G$ résolvent le même problème dans $V$, donc coïncident. Un autre relèvement fournit une autre écriture de la même solution.

**Estimation.** $\|u\|_{H^1}\le\|G\|_{H^1}+\sqrt{1+C_P^2}\,\|w\|_V\le C_R\|g\|_{H^{1/2}}+\sqrt{1+C_P^2}\big(\|f\|_{H^{-1}}+C_R\|g\|_{H^{1/2}}\big)$.

**Points de vigilance.** La condition $\gamma u=g$ n'est pas une égalité point par point ; $u$ n'est pas dans $H^1_0$ si $g\ne 0$ ; le terme de relèvement passe à droite avec un signe moins, sous forme faible.`,
  steps: [
    'Construire un relèvement par le théorème de trace.',
    t`Ramener l'inconnue à $w=u-G\in H^1_0(\Omega)$ grâce à $\ker\gamma=H^1_0(\Omega)$.`,
    t`Écrire l'équation pour $w$ sous forme faible, avec le second membre $L$.`,
    t`Appliquer Lax–Milgram dans $H^1_0(\Omega)$.`,
    'En déduire unicité, indépendance du relèvement, et estimation.',
  ],
  commonErrors: [
    { id: 'e-signe', description: 'Se tromper de signe sur le terme de relèvement.', concept: 'trace-relevement' },
    { id: 'e-u-H10', description: t`Chercher $u$ dans $H^1_0(\Omega)$ alors que $g\ne 0$.`, concept: 'trace-relevement' },
    { id: 'e-ponctuel', description: t`Traiter $\gamma u=g$ comme une égalité point par point.`, concept: 'trace-ponctuelle' },
    { id: 'e-unicite', description: 'Oublier de vérifier que la solution ne dépend pas du relèvement choisi.', concept: 'existence-unicite' },
  ],
  hints: [
    t`Lax–Milgram s'applique dans un espace de Hilbert où la forme est coercive : lequel ? L'inconnue $u$ y appartient-elle ?`,
    t`Retranche un relèvement $G$ de $g$ : $w=u-G$ a une trace nulle. Écris l'équation satisfaite par $w$ contre $v\in H^1_0(\Omega)$.`,
    t`$a(w,v)=\langle f,v\rangle-\int_\Omega\nabla G\cdot\nabla v$, second membre continu sur $H^1_0(\Omega)$ ; puis Lax–Milgram, et $u=G+w$.`,
  ],
  rubric: rubric({
    hypotheses: t`Le relèvement et le noyau de la trace sont invoqués sous l'hypothèse « borné lipschitzien », avec $g\in H^{1/2}(\partial\Omega)$.`,
    methode: 'Changement d’inconnue, formulation faible pour l’inconnue de trace nulle, Lax–Milgram.',
    validite: 'Le second membre est écrit avec le bon signe et sous forme faible.',
    justifications: 'La reformulation est justifiée par les fonctions test et la densité.',
    conclusion: 'Existence, unicité, indépendance du relèvement et estimation sont établies.',
  }),
  variant: {
    statement: t`Soient $f\in L^2(]0,1[)$ et $(\beta_0,\beta_1)\in\mathbb R^2$. À l'aide du relèvement affine $G(x)=\beta_0(1-x)+\beta_1x$, montrer que le problème : $u\in H^1(]0,1[)$, $u(0)=\beta_0$, $u(1)=\beta_1$ et $-u''=f$ dans $\mathcal D'(]0,1[)$, admet une unique solution.`,
    solution: t`$G$ est affine : $G\in H^1(]0,1[)$, $\gamma G=(\beta_0,\beta_1)$ et $G'$ est constante. Pour $v\in H^1_0(]0,1[)$, $\int_0^1G'v'=G'\big(v(1)-v(0)\big)=0$ : le terme de relèvement disparaît. Comme $\ker\gamma=H^1_0(]0,1[)$, $u=G+w$ résout le problème si et seulement si $w\in H^1_0(]0,1[)$ et $\int_0^1w'v'=\int_0^1fv$ pour tout $v\in H^1_0(]0,1[)$. Lax–Milgram (la forme est le produit scalaire de $H^1_0$ pour la norme $\|v'\|_{L^2}$, et $v\mapsto\int fv$ est continue) donne un unique $w$, donc une unique solution $u=G+w$.`,
    closedChecks: [{ kind: 'rational', prompt: t`Pour $f=0$ et $(\beta_0,\beta_1)=(2,-1)$ : valeur de $u(1/4)$`, expected: '5/4' }],
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h-f', kind: 'hypothese', text: t`$f\in L^2(]0,1[)$.` },
        { id: 'h-beta', kind: 'hypothese', text: t`$(\beta_0,\beta_1)\in\mathbb R^2$.` },
        { id: 'd-V', kind: 'definition', text: t`$V=H^1_0(]0,1[)$, muni de $\|v\|_V=\|v'\|_{L^2}$.` },
        { id: 'd-G', kind: 'definition', text: t`$G(x)=\beta_0(1-x)+\beta_1x$.` },
        { id: 'G-prop', kind: 'consequence', text: t`$G\in H^1(]0,1[)$, $\gamma G=(\beta_0,\beta_1)$ et $G'$ est constante.` },
        { id: 'G-orth', kind: 'egalite', text: t`$\int_0^1G'v'=0$ pour tout $v\in V$.` },
        { id: 'red', kind: 'consequence', text: t`$u=G+w$ résout le problème si et seulement si $w\in V$ et $\int_0^1w'v'=\int_0^1fv$ pour tout $v\in V$.` },
        { id: 'lm', kind: 'application-theoreme', text: t`Il existe un unique $w\in V$ tel que $\int_0^1w'v'=\int_0^1fv$ pour tout $v\in V$.` },
        { id: 'fin', kind: 'conclusion', text: t`Le problème admet une unique solution, $u=G+w$.` },
        { id: 'x-u-V', kind: 'consequence', distractor: true, text: t`La solution $u$ appartient à $H^1_0(]0,1[)$.` },
      ],
      justifications: [
        { id: 'j-affine', label: 'Fonction affine : dérivée constante, valeurs explicites aux extrémités.' },
        { id: 'j-G-orth', label: t`$G'$ est constante et $\int_0^1v'=v(1)-v(0)=0$ pour $v\in V$.` },
        { id: 'j-red', label: t`Noyau de la trace ($\ker\gamma=V$), fonctions test, puis densité de $C^\infty_c(]0,1[)$ dans $V$.`, theorem: 'trace' },
        { id: 'j-lm', label: t`Lax–Milgram : produit scalaire de $V$ (Poincaré), second membre continu.`, theorem: 'lax-milgram' },
        { id: 'j-syn', label: 'La reformulation et l’unique solution réduite.' },
      ],
      rules: [
        { from: ['d-G', 'h-beta'], to: 'G-prop', by: 'j-affine' },
        { from: ['G-prop', 'd-V'], to: 'G-orth', by: 'j-G-orth' },
        { from: ['G-prop', 'G-orth', 'd-V'], to: 'red', by: 'j-red' },
        { from: ['d-V', 'h-f'], to: 'lm', by: 'j-lm' },
        { from: ['red', 'lm'], to: 'fin', by: 'j-syn' },
      ],
      traps: [
        {
          conclusion: 'x-u-V',
          verdict: 'incorrect',
          concept: 'trace-relevement',
          message: t`$u$ a pour trace $(\beta_0,\beta_1)$ : elle n'est dans $H^1_0$ que si $\beta_0=\beta_1=0$.`,
          counterexample: t`$f=0$, $(\beta_0,\beta_1)=(0,1)$ : $u(x)=x$.`,
        },
      ],
      removable: [
        {
          hypothesis: 'h-f',
          label: t`Retirer $f\in L^2(]0,1[)$`,
          necessary: true,
          explanation: t`Le second membre doit définir une forme continue sur $V$ pour appliquer Lax–Milgram : c'est le cas si $f\in L^2$ (ou plus généralement $f\in H^{-1}(]0,1[)$), mais pas pour une distribution quelconque.`,
          counterexample: t`Pour $f=\delta_{1/2}'$, dérivée de la distribution de Dirac en $1/2$ : $-u''=f$ impose $(u'+\delta_{1/2})'=0$, donc $u'=c-\delta_{1/2}$ pour une constante $c$, qui n'est pas dans $L^2$. Aucune solution n'existe dans $H^1(]0,1[)$.`,
        },
      ],
    },
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT12: TheoremModule = {
  theorem: {
    id: 'trace',
    spaces: [
      t`$\Omega\subset\mathbb R^d$ : ouvert borné lipschitzien, de frontière $\partial\Omega$.`,
      t`$H^1(\Omega)$, et $H^1_0(\Omega)$, adhérence de $C^\infty_c(\Omega)$ dans $H^1(\Omega)$.`,
      t`$H^{1/2}(\partial\Omega)$ : espace des traces sur le bord. Pour $\Omega=]a,b[$, la frontière est $\{a,b\}$ et la trace s'identifie au couple des valeurs aux extrémités.`,
    ],
    hypotheses: [
      { id: 'h-borne', text: t`$\Omega$ est borné.` },
      {
        id: 'h-lipschitz',
        text: t`$\Omega$ est lipschitzien : son bord est localement le graphe d'une fonction lipschitzienne, $\Omega$ étant situé d'un seul côté.`,
        whenRemoved: t`Sur le carré fendu $]-1,1[^2\setminus\big([0,1[\times\{0\}\big)$, la fonction $\theta\,\chi(r)$, avec $\chi\in C^\infty_c(]0,1[)$ et $\chi(1/2)=1$, est dans $H^1$ et admet deux limites différentes de part et d'autre de la fente : la valeur au bord n'est plus univoque.`,
      },
    ],
    statement: t`Si $\Omega\subset\mathbb R^d$ est borné lipschitzien, la restriction au bord se prolonge en une application linéaire continue surjective
$$\gamma:H^1(\Omega)\longrightarrow H^{1/2}(\partial\Omega),\qquad\ker\gamma=H^1_0(\Omega).$$
Il existe un relèvement linéaire continu de $H^{1/2}(\partial\Omega)$ vers $H^1(\Omega)$.`,
    conclusions: {
      existence: t`$\gamma u$ est défini pour tout $u\in H^1(\Omega)$ et prolonge la restriction au bord des fonctions régulières jusqu'au bord ; tout $g\in H^{1/2}(\partial\Omega)$ est une trace.`,
      stabilite: t`$\|\gamma u\|_{H^{1/2}(\partial\Omega)}\le C\|u\|_{H^1(\Omega)}$, et le relèvement $R$ vérifie $\gamma Rg=g$ et $\|Rg\|_{H^1}\le C_R\|g\|_{H^{1/2}(\partial\Omega)}$.`,
      autre: t`$\ker\gamma=H^1_0(\Omega)$.`,
    },
    sourceProof: 'idee',
    proofOutline: [
      'Aplatir localement le bord à l’aide de cartes lipschitziennes.',
      'Prouver l’estimation de trace sur un demi-espace, pour des fonctions régulières, puis prolonger par densité.',
      'Recoller les représentations locales par une partition de l’unité.',
      t`Sur un intervalle, tout se démontre à la main : $|w(x)|\le\sqrt2\,\|w\|_{H^1}$, et le noyau s'obtient par primitives (exercices de ce résultat).`,
    ],
    warnings: [
      t`La valeur au bord d'une fonction $H^1$ est une trace Sobolev, non une évaluation ponctuelle arbitraire.`,
      t`Une classe de $L^2(\Omega)$ n'a pas de trace : la restriction au bord n'est pas continue pour la norme de $L^2$.`,
      t`L'image de $\gamma$ est $H^{1/2}(\partial\Omega)$, et non $L^2(\partial\Omega)$ : sur le disque unité, $\sum_{n\ge 1}\cos(n\theta)/n$ est de carré intégrable sans être une trace.`,
      t`Avec une donnée au bord non nulle, la solution n'est pas dans $H^1_0(\Omega)$ : on retranche un relèvement.`,
    ],
    usefulFor: t`Formuler correctement les conditions de Dirichlet et décomposer une solution avec donnée au bord non nulle en relèvement $+$ fonction de $H^1_0$.`,
    verification: { origin: 'polycopie', review: 'machine', notes: 'Énoncé du polycopié ; la démonstration n’y figure qu’en idée.' },
  },
  definitions: [
    {
      id: 'trace-intervalle',
      term: 'Trace sur un intervalle',
      statement: t`Pour $w\in H^1(]0,1[)$, de représentant continu encore noté $w$ sur $[0,1]$, on pose $\gamma w=(w(0),w(1))$.`,
      source: complement('Cas de l’intervalle, exercices du résultat 12'),
    },
    {
      id: 'trace-relevement-def',
      term: 'Relèvement',
      statement: t`Un relèvement est une application linéaire continue $R:H^{1/2}(\partial\Omega)\to H^1(\Omega)$ telle que $\gamma(Rg)=g$ pour tout $g\in H^{1/2}(\partial\Omega)$.`,
      source: poly(14, 'Section 3.6'),
    },
  ],
  concepts: [
    {
      id: 'trace-relevement',
      label: 'Relèvement d’une donnée au bord',
      reminder: t`Pour $\gamma u=g\neq 0$, l'inconnue $u$ n'est pas dans $H^1_0$ : on pose $w=u-G$ avec $\gamma G=g$, et le second membre reçoit le terme faible $-\int_\Omega\nabla G\cdot\nabla v$.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-trace-L2',
      theoremId: 'trace',
      title: t`Pas de trace sur $L^2$`,
      claim: t`L'application $u\mapsto u(0)$, définie sur $C([0,1])$, est continue pour la norme de $L^2(]0,1[)$ : elle définit une trace sur $L^2$.`,
      correctStatement: t`La trace est continue pour la norme de $H^1$, pas pour celle de $L^2$.`,
      task: t`Pour $u_n(x)=(1-nx)^+$, on a $u_n(0)=1$. Calcule $\|u_n\|_{L^2}^2$ pour $n=3$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\|u_3\|_{L^2}^2$`, expected: '1/9' },
      explanation: t`$\|u_n\|_{L^2}^2=\int_0^{1/n}(1-nx)^2dx=\frac1{3n}\to 0$, alors que $u_n(0)=1$ : aucune constante $C$ ne vérifie $|u(0)|\le C\|u\|_{L^2}$.`,
      concept: 'trace-ponctuelle',
      source: poly(14, 'Lecture géométrique, section 3.6'),
    },
    {
      id: 'ce-trace-image',
      theoremId: 'trace',
      title: t`L'image de la trace n'est pas $L^2(\partial\Omega)$`,
      claim: t`Toute fonction de $L^2(\partial\Omega)$ est la trace d'une fonction de $H^1(\Omega)$.`,
      correctStatement: t`L'image de $\gamma$ est $H^{1/2}(\partial\Omega)$. Sur le cercle, $g\in H^{1/2}$ si et seulement si $\sum_n(1+|n|)|\hat g(n)|^2<\infty$.`,
      task: t`Pour $g(\theta)=\sum_{n\ge 1}a_n\cos(n\theta)$ avec $a_n=1/n$, calcule la somme partielle $S_4=\sum_{n=1}^4n\,a_n^2$.`,
      check: { kind: 'rational', prompt: t`Valeur de $S_4$`, expected: '25/12' },
      explanation: t`$S_N=\sum_{n=1}^N1/n$ tend vers $+\infty$ : $g\notin H^{1/2}$, alors que $\sum_na_n^2<\infty$ donne $g\in L^2$. Sur le disque unité, $g$ n'est la trace d'aucune fonction de $H^1$.`,
      concept: 'trace-ponctuelle',
      source: poly(14, 'Énoncé du théorème de trace, section 3.6'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT12;
