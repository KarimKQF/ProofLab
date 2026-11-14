/**
 * Résultat 14 — Régularité elliptique H² du laplacien de Dirichlet.
 * Énoncé : polycopié, section 3.7 (p. PDF 15), donné avec une idée de preuve seulement.
 * Exercices : annexe B, exercice 14 (p. PDF 40). Les exercices travaillent le cas
 * démontrable de l'intervalle et le contre-exemple du secteur à angle rentrant.
 */
import { t, rubric, poly, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'regularite-elliptique.facile',
  theoremId: 'regularite-elliptique',
  level: 'facile',
  title: t`La fonction $x(1-x)$ appartient-elle à $H^2(]0,1[)$ ?`,
  statement: t`Soit $u(x)=x(1-x)$ sur $]0,1[$. Déterminer si $u\in H^2(]0,1[)=\{v\in L^2 : v',v''\in L^2\}$, les dérivées étant prises au sens des distributions, et calculer $\|u\|_{H^2}^2=\|u\|_{L^2}^2+\|u'\|_{L^2}^2+\|u''\|_{L^2}^2$.`,
  source: poly(40, 'Exercice 14, facile'),
  prerequisites: ['distributions'],
  concepts: ['regularite-elliptique-classique', 'justification-absente', 'calcul-exact'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'd-u', kind: 'definition', text: t`$u(x)=x(1-x)$ sur $]0,1[$.` },
      { id: 'd-H2', kind: 'definition', text: t`$H^2(]0,1[)=\{v\in L^2(]0,1[) : v',v''\in L^2(]0,1[)\}$, dérivées au sens des distributions.` },
      { id: 'calc', kind: 'egalite', text: t`$u$ est de classe $C^\infty$ sur $[0,1]$, avec $u'(x)=1-2x$ et $u''(x)=-2$ au sens classique.` },
      { id: 'weak', kind: 'consequence', text: t`Les dérivées au sens des distributions de $u$ et de $u'$ sont $u'$ et $u''$ classiques.` },
      { id: 'L2', kind: 'consequence', text: t`$u$, $u'$ et $u''$ sont bornées sur $]0,1[$, donc de carré intégrable.` },
      { id: 'inH2', kind: 'consequence', text: t`$u\in H^2(]0,1[)$.` },
      {
        id: 'norme',
        kind: 'egalite',
        text: t`$\|u\|_{H^2}^2=\tfrac1{30}+\tfrac13+4=\tfrac{131}{30}$.`,
        masked: t`Valeur de $\|u\|_{H^2}^2$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\|u\|_{H^2(]0,1[)}^2$`, expected: '131/30' },
      },
      { id: 'fin', kind: 'conclusion', text: t`$u\in H^2(]0,1[)$, avec $u''=-2$ et $\|u\|_{H^2}^2=131/30$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-pp', kind: 'consequence', distractor: true, text: t`Toute fonction continue, deux fois dérivable presque partout avec des dérivées presque partout de carré intégrable, appartient à $H^2(]0,1[)$.` },
      { id: 'x-bord', kind: 'consequence', distractor: true, after: ['calc'], text: t`$u\in H^2(]0,1[)$ parce que $u(0)=u(1)=0$.` },
    ],
    justifications: [
      { id: 'j-poly', label: 'Dérivation d’un polynôme.' },
      { id: 'j-ipp', label: t`Pour $\varphi\in C^\infty_c(]0,1[)$, intégration par parties sans terme de bord, appliquée à $u$ puis à $u'$.`, theorem: 'distributions' },
      { id: 'j-borne', label: 'Fonctions continues sur le segment, donc bornées ; intervalle de mesure finie.' },
      { id: 'j-def-H2', label: t`Définition de $H^2(]0,1[)$.` },
      { id: 'j-int', label: t`Calcul exact des trois intégrales $\int_0^1u^2$, $\int_0^1(u')^2$, $\int_0^1(u'')^2$.` },
      { id: 'j-syn', label: 'Réunion des résultats.' },
      // Justification séduisante et fausse.
      { id: 'j-pp', label: 'Les dérivées presque partout suffisent à définir les dérivées faibles.' },
    ],
    rules: [
      { from: ['d-u'], to: 'calc', by: 'j-poly' },
      { from: ['calc'], to: 'weak', by: 'j-ipp' },
      { from: ['calc'], to: 'L2', by: 'j-borne' },
      { from: ['weak', 'L2', 'd-H2'], to: 'inH2', by: 'j-def-H2' },
      { from: ['calc', 'inH2'], to: 'norme', by: 'j-int' },
      { from: ['inH2', 'norme'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'weak',
        by: 'j-pp',
        verdict: 'incorrect',
        concept: 'regularite-elliptique-classique',
        message: t`Une dérivée presque partout n'est pas, en général, la dérivée au sens des distributions : ici l'identification vient d'une intégration par parties, légitime car $u$ est de classe $C^2$ sur $[0,1]$.`,
        counterexample: t`$v(x)=|x-1/2|$ : $v''=0$ presque partout, mais $(v')'=2\delta_{1/2}$ dans $\mathcal D'(]0,1[)$.`,
      },
      {
        conclusion: 'x-pp',
        verdict: 'incorrect',
        concept: 'regularite-elliptique-classique',
        message: 'Les dérivées au sens des distributions voient les sauts de la dérivée première, que les dérivées presque partout ignorent.',
        counterexample: t`$v(x)=|x-1/2|$ est continue, $v''=0$ presque partout, mais $(v')'=2\delta_{1/2}\notin L^2$ : $v\notin H^2(]0,1[)$.`,
      },
      {
        conclusion: 'x-bord',
        verdict: 'incorrect',
        concept: 'regularite-elliptique-classique',
        message: t`Les valeurs au bord ne disent rien de l'appartenance à $H^2$ : c'est la dérivée seconde au sens des distributions qu'il faut contrôler.`,
        counterexample: t`$w(x)=|x-1/2|-1/2$ vérifie $w(0)=w(1)=0$ et $w\notin H^2(]0,1[)$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'weak',
        label: 'Retirer l’identification des dérivées classiques et distributionnelles',
        necessary: true,
        explanation: 'Sans elle, les calculs classiques ne disent rien des dérivées au sens des distributions.',
        counterexample: t`$v(x)=|x-1/2|$ a une dérivée seconde classique nulle hors de $1/2$, et n'est pas dans $H^2(]0,1[)$.`,
      },
    ],
  },
  solution: t`**Dérivées.** $u$ est polynomiale : $u'(x)=1-2x$ et $u''(x)=-2$. Pour $\varphi\in C^\infty_c(]0,1[)$, l'intégration par parties ne produit aucun terme de bord : $-\int_0^1u\varphi'=\int_0^1u'\varphi$ et $-\int_0^1u'\varphi'=\int_0^1u''\varphi$. Les dérivées au sens des distributions sont donc les dérivées classiques.

**Appartenance.** $u$, $u'$, $u''$ sont bornées sur $]0,1[$, donc dans $L^2$ : $u\in H^2(]0,1[)$.

**Norme.** $\int_0^1x^2(1-x)^2dx=\tfrac1{30}$, $\int_0^1(1-2x)^2dx=\tfrac13$, $\int_0^14\,dx=4$, d'où $\|u\|_{H^2}^2=\tfrac{131}{30}$.

**Point de vigilance.** C'est la dérivée au sens des distributions qui compte : $|x-1/2|$ a une dérivée seconde nulle presque partout sans être dans $H^2$.`,
  steps: [
    'Calculer les dérivées classiques.',
    'Les identifier aux dérivées au sens des distributions.',
    t`Vérifier l'appartenance à $L^2$ et calculer la norme.`,
  ],
  commonErrors: [
    { id: 'e-pp', description: 'Confondre dérivée presque partout et dérivée au sens des distributions.', concept: 'regularite-elliptique-classique' },
    { id: 'e-calcul', description: t`Remplacer le calcul exact de $\|u\|_{H^2}^2$ par une valeur approchée.`, concept: 'calcul-exact' },
  ],
  hints: [
    t`Que demande exactement la définition de $H^2(]0,1[)$, et en quel sens les dérivées sont-elles prises ?`,
    t`Calcule $u'$ et $u''$ classiquement, puis justifie qu'elles sont aussi les dérivées au sens des distributions.`,
    t`Une intégration par parties contre $\varphi\in C^\infty_c(]0,1[)$ n'a pas de terme de bord. Reste à calculer $\int_0^1u^2$, $\int_0^1(u')^2$ et $\int_0^1(u'')^2$.`,
  ],
  rubric: rubric({
    hypotheses: 'La définition de $H^2$ est rappelée avec des dérivées au sens des distributions.',
    methode: 'Les dérivées classiques sont identifiées aux dérivées distributionnelles.',
    validite: 'L’intégration par parties est justifiée par la régularité de la fonction.',
    justifications: 'Aucune conclusion n’est tirée de dérivées presque partout seules.',
    conclusion: t`$u\in H^2(]0,1[)$ et $\|u\|_{H^2}^2=131/30$.`,
  }),
  variant: {
    statement: t`Déterminer si $v(x)=|x-1/2|$ appartient à $H^2(]0,1[)$.`,
    solution: t`$v$ est lipschitzienne ; en intégrant par parties sur $]0,1/2[$ et $]1/2,1[$, sa dérivée au sens des distributions est $v'=\operatorname{sgn}(x-1/2)\in L^2$, donc $v\in H^1(]0,1[)$. Pour $\varphi\in C^\infty_c(]0,1[)$ : $\langle(v')',\varphi\rangle=-\int_0^1\operatorname{sgn}(x-1/2)\varphi'(x)\,dx=\int_0^{1/2}\varphi'-\int_{1/2}^1\varphi'=2\varphi(1/2)$. Donc $(v')'=2\delta_{1/2}$. Si une fonction $g\in L^2$ vérifiait $\int_0^1g\varphi=2\varphi(1/2)$ pour tout $\varphi$, les fonctions test à support dans $]0,1[\setminus\{1/2\}$ donneraient $g=0$ presque partout, puis $\varphi(1/2)=0$ pour tout $\varphi$ : absurde. Ainsi $v\in H^1(]0,1[)\setminus H^2(]0,1[)$.`,
    closedChecks: [{ kind: 'rational', prompt: t`Saut de $v'$ en $1/2$, c'est-à-dire $v'(1/2^+)-v'(1/2^-)$`, expected: '2' }],
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'd-v', kind: 'definition', text: t`$v(x)=|x-1/2|$ sur $]0,1[$.` },
        { id: 'v1', kind: 'egalite', text: t`$v'=\operatorname{sgn}(x-1/2)$ au sens des distributions, et $v\in H^1(]0,1[)$.` },
        { id: 'v2', kind: 'egalite', text: t`$(v')'=2\delta_{1/2}$ dans $\mathcal D'(]0,1[)$.` },
        { id: 'nonL2', kind: 'consequence', text: t`$2\delta_{1/2}$ n'est représentée par aucune fonction de $L^2(]0,1[)$.` },
        { id: 'fin', kind: 'conclusion', text: t`$v\in H^1(]0,1[)$ et $v\notin H^2(]0,1[)$.` },
        { id: 'x-pp', kind: 'consequence', distractor: true, text: t`$v''=0$ presque partout, donc $v\in H^2(]0,1[)$.` },
      ],
      justifications: [
        { id: 'j-v1', label: t`Intégration par parties sur $]0,1/2[$ et sur $]1/2,1[$ : les termes en $1/2$ se compensent car $v$ est continue.`, theorem: 'distributions' },
        { id: 'j-v2', label: t`$-\int_0^1\operatorname{sgn}(x-1/2)\varphi'=\int_0^{1/2}\varphi'-\int_{1/2}^1\varphi'=2\varphi(1/2)$.`, theorem: 'distributions' },
        { id: 'j-nonL2', label: t`Une fonction $g\in L^2$ représentant $2\delta_{1/2}$ serait nulle presque partout, par les fonctions test à support hors de $1/2$.` },
        { id: 'j-syn', label: t`Définition de $H^2(]0,1[)$.` },
      ],
      rules: [
        { from: ['d-v'], to: 'v1', by: 'j-v1' },
        { from: ['v1'], to: 'v2', by: 'j-v2' },
        { from: ['v2'], to: 'nonL2', by: 'j-nonL2' },
        { from: ['v1', 'nonL2'], to: 'fin', by: 'j-syn' },
      ],
      traps: [
        {
          conclusion: 'x-pp',
          verdict: 'incorrect',
          concept: 'regularite-elliptique-classique',
          message: 'La dérivée seconde au sens des distributions voit le saut de la dérivée première en 1/2.',
          counterexample: t`$(v')'=2\delta_{1/2}$.`,
        },
      ],
      removable: [
        {
          hypothesis: 'd-v',
          label: t`Remplacer $v$ par une fonction de classe $C^2$ sur $[0,1]$`,
          necessary: true,
          explanation: 'Sans saut de la dérivée, la dérivée seconde distributionnelle est la dérivée classique.',
          counterexample: t`$u(x)=x(1-x)$ est dans $H^2(]0,1[)$.`,
        },
      ],
    },
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'regularite-elliptique.intermediaire',
  theoremId: 'regularite-elliptique',
  level: 'intermediaire',
  title: t`Régularité $H^2$ pour $-u''=f$ sur $]0,1[$`,
  statement: t`Soient $f\in L^2(]0,1[)$ et $u\in H^1_0(]0,1[)$ la solution faible de $-u''=f$ avec condition de Dirichlet : $\int_0^1u'v'=\int_0^1fv$ pour tout $v\in H^1_0(]0,1[)$. Montrer que $u\in H^2(]0,1[)$, que $u''=-f$ presque partout, et que $\|u\|_{H^2}\le\sqrt3\,\|f\|_{L^2}$.`,
  source: poly(40, 'Exercice 14, intermédiaire'),
  prerequisites: ['lax-milgram', 'distributions'],
  concepts: ['regularite-elliptique-classique', 'hypotheses-theoreme', 'utilisation-prematuree'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-f', kind: 'hypothese', text: t`$f\in L^2(]0,1[)$.` },
      { id: 'h-sol', kind: 'hypothese', text: t`$u\in H^1_0(]0,1[)$ et $\int_0^1u'v'=\int_0^1fv$ pour tout $v\in H^1_0(]0,1[)$.` },
      { id: 'dist', kind: 'egalite', text: t`Pour $\varphi\in C^\infty_c(]0,1[)$ : $\langle(u')',\varphi\rangle=-\int_0^1u'\varphi'$.` },
      { id: 'test', kind: 'egalite', text: t`Pour $\varphi\in C^\infty_c(]0,1[)$ : $\int_0^1u'\varphi'=\int_0^1f\varphi$.` },
      { id: 'eq', kind: 'egalite', text: t`$(u')'=-f$ dans $\mathcal D'(]0,1[)$.` },
      { id: 'H2', kind: 'consequence', text: t`$u''=-f\in L^2(]0,1[)$ : $u\in H^2(]0,1[)$.` },
      { id: 'sob', kind: 'inegalite', text: t`$\|u\|_{L^2}\le\|u'\|_{L^2}$.` },
      { id: 'grad', kind: 'inegalite', text: t`$\|u'\|_{L^2}\le\|f\|_{L^2}$.` },
      { id: 'estim', kind: 'inegalite', text: t`$\|u\|_{H^2}^2=\|u\|_{L^2}^2+\|u'\|_{L^2}^2+\|u''\|_{L^2}^2\le 3\|f\|_{L^2}^2$.` },
      { id: 'fin', kind: 'conclusion', text: t`$u\in H^2(]0,1[)$, $u''=-f$ presque partout, et $\|u\|_{H^2}\le\sqrt3\,\|f\|_{L^2}$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-C2', kind: 'consequence', distractor: true, after: ['H2'], text: t`$u$ est de classe $C^2$ sur $[0,1]$.` },
      { id: 'x-sans-bord', kind: 'inegalite', distractor: true, after: ['estim'], text: t`Toute solution de $-u''=f$ dans $\mathcal D'(]0,1[)$, sans condition au bord, vérifie $\|u\|_{H^2}\le\sqrt3\,\|f\|_{L^2}$.` },
    ],
    justifications: [
      { id: 'j-def-dist', label: t`Définition de la dérivée au sens des distributions de $u'\in L^2$.`, theorem: 'distributions' },
      { id: 'j-test', label: t`$C^\infty_c(]0,1[)\subset H^1_0(]0,1[)$ : on teste la formulation faible par $v=\varphi$.` },
      { id: 'j-identif', label: 'Comparaison des deux expressions pour toute fonction test.' },
      { id: 'j-defH2', label: t`$u\in L^2$, $u'\in L^2$ et $(u')'=-f\in L^2$ : définition de $H^2$.` },
      { id: 'j-fond', label: t`Pour $\varphi\in C^\infty_c(]0,1[)$, $|\varphi(x)|=\big|\int_0^x\varphi'\big|\le\|\varphi'\|_{L^2}$ ; passage à la limite par densité dans $H^1_0$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-test-u', label: t`Choix $v=u$ : $\|u'\|_{L^2}^2=\int_0^1fu\le\|f\|_{L^2}\|u\|_{L^2}\le\|f\|_{L^2}\|u'\|_{L^2}$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-somme', label: t`Somme des trois carrés, chacun majoré par $\|f\|_{L^2}^2$.` },
      { id: 'j-syn', label: 'Réunion de la régularité et de l’estimation.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-reg', label: t`Théorème de régularité $H^2$ du laplacien de Dirichlet.`, theorem: 'regularite-elliptique' },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['h-sol'], to: 'dist', by: 'j-def-dist' },
      { from: ['h-sol'], to: 'test', by: 'j-test' },
      { from: ['dist', 'test'], to: 'eq', by: 'j-identif' },
      { from: ['eq', 'h-f', 'h-sol'], to: 'H2', by: 'j-defH2' },
      { from: ['h-sol'], to: 'sob', by: 'j-fond' },
      { from: ['h-sol', 'h-f', 'sob'], to: 'grad', by: 'j-test-u' },
      { from: ['grad', 'sob', 'H2'], to: 'estim', by: 'j-somme' },
      { from: ['H2', 'estim'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'eq',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`L'équation au sens des distributions se démontre : écris $\langle(u')',\varphi\rangle$ par définition, puis teste la formulation faible par $\varphi$.`,
      },
      {
        conclusion: 'x-C2',
        verdict: 'incorrect',
        concept: 'regularite-elliptique-classique',
        message: t`$H^2$ n'entraîne pas $C^2$ : $u''=-f$ n'est qu'une fonction de $L^2$.`,
        counterexample: t`Pour $f=\mathbb 1_{]1/2,1[}$, $u''=-f$ presque partout saute de $0$ à $-1$ en $1/2$ : $u$ n'est pas de classe $C^2$.`,
      },
      {
        conclusion: 'x-sans-bord',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`La régularité $H^2$ ne demande ici que l'équation, mais l'estimation repose sur la condition de Dirichlet, via $\|u\|_{L^2}\le\|u'\|_{L^2}$.`,
        counterexample: t`$u=1$ et $f=0$ : $-u''=f$, mais $\|u\|_{H^2}=1>0=\sqrt3\,\|f\|_{L^2}$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'sob',
        label: 'Retirer le contrôle issu de la condition de Dirichlet',
        necessary: true,
        explanation: t`Sans $\|u\|_{L^2}\le\|u'\|_{L^2}$, les constantes échappent à l'estimation.`,
        counterexample: t`$u=1$ résout $-u''=0$ et $\|u\|_{L^2}=1>0=\|u'\|_{L^2}$.`,
      },
      {
        hypothesis: 'h-f',
        label: t`Retirer $f\in L^2(]0,1[)$`,
        necessary: true,
        explanation: t`Avec un second membre seulement dans $H^{-1}$, la solution faible existe encore, mais n'est plus dans $H^2$.`,
        counterexample: t`Pour $f=\delta_{1/2}$, la solution faible est $u(x)=\tfrac12\min(x,1-x)$ : $u\in H^1_0(]0,1[)$, et $u''=-\delta_{1/2}\notin L^2$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Pour $f=2$ : la solution est $u(x)=x(1-x)$ ; valeur de $\|u'\|_{L^2}^2$`, expected: '1/3' }],
  solution: t`**Équation au sens des distributions.** Pour $\varphi\in C^\infty_c(]0,1[)$, la définition donne $\langle(u')',\varphi\rangle=-\int_0^1u'\varphi'$, et la formulation faible testée par $\varphi\in H^1_0(]0,1[)$ donne $\int_0^1u'\varphi'=\int_0^1f\varphi$. Donc $(u')'=-f$ dans $\mathcal D'(]0,1[)$.

**Régularité.** $u\in L^2$, $u'\in L^2$ et $u''=-f\in L^2$ : $u\in H^2(]0,1[)$, et $u''=-f$ presque partout.

**Estimation.** Pour $\varphi\in C^\infty_c(]0,1[)$, $|\varphi(x)|\le\|\varphi'\|_{L^2}$, d'où $\|\varphi\|_{L^2}\le\|\varphi'\|_{L^2}$, inégalité qui passe à $H^1_0$ par densité. En testant par $v=u$ : $\|u'\|_{L^2}^2=\int_0^1fu\le\|f\|_{L^2}\|u'\|_{L^2}$, donc $\|u'\|_{L^2}\le\|f\|_{L^2}$ et $\|u\|_{L^2}\le\|f\|_{L^2}$. Avec $\|u''\|_{L^2}=\|f\|_{L^2}$ : $\|u\|_{H^2}\le\sqrt3\,\|f\|_{L^2}$.

**Points de vigilance.** En dimension $1$, aucun quotient de différences n'est nécessaire : l'équation donne directement la dérivée seconde. On ne peut pas invoquer le théorème général, dont c'est un cas particulier. $H^2$ n'entraîne pas $C^2$.`,
  steps: [
    t`Écrire $(u')'$ au sens des distributions contre une fonction test.`,
    'Tester la formulation faible par la même fonction test.',
    t`Identifier $(u')'=-f\in L^2$, d'où $u\in H^2$.`,
    'Estimer chaque terme de la norme.',
  ],
  commonErrors: [
    { id: 'e-C2', description: t`Conclure que $u$ est de classe $C^2$.`, concept: 'regularite-elliptique-classique' },
    { id: 'e-circulaire', description: t`Invoquer le théorème de régularité $H^2$ pour démontrer son cas particulier.`, concept: 'utilisation-prematuree' },
    { id: 'e-bord', description: 'Oublier que l’estimation repose sur la condition de Dirichlet.', concept: 'hypotheses-theoreme' },
  ],
  hints: [
    t`Qu'est-ce que $(u')'$ au sens des distributions, et que dit la formulation faible lorsqu'on la teste par une fonction test ?`,
    t`Compare $\langle(u')',\varphi\rangle=-\int u'\varphi'$ et $\int u'\varphi'=\int f\varphi$ : la dérivée seconde est identifiée à une fonction de $L^2$.`,
    t`Pour l'estimation, teste par $v=u$ et utilise $\|u\|_{L^2}\le\|u'\|_{L^2}$, valable sur $H^1_0(]0,1[)$.`,
  ],
  rubric: rubric({
    hypotheses: t`La formulation faible et $f\in L^2$ sont utilisées, sans invoquer le théorème général.`,
    methode: 'La dérivée seconde est identifiée au sens des distributions.',
    validite: 'Le passage de la formulation faible aux fonctions test est justifié.',
    justifications: 'L’estimation est démontrée terme à terme, avec le rôle de la condition au bord.',
    conclusion: t`$u\in H^2(]0,1[)$ et $\|u\|_{H^2}\le\sqrt3\,\|f\|_{L^2}$.`,
  }),
  variant: {
    statement: t`Soient $f\in L^2(]0,1[)$ et $u\in H^1(]0,1[)$ tel que $\int_0^1u'v'+\int_0^1uv=\int_0^1fv$ pour tout $v\in H^1(]0,1[)$ (problème de Neumann). Montrer que $u\in H^2(]0,1[)$.`,
    solution: t`En testant par $\varphi\in C^\infty_c(]0,1[)\subset H^1(]0,1[)$ : $\langle(u')',\varphi\rangle=-\int_0^1u'\varphi'=\int_0^1(u-f)\varphi$. Donc $(u')'=u-f\in L^2(]0,1[)$, et $u\in H^2(]0,1[)$. La condition au bord ne joue aucun rôle dans cette régularité à l'intérieur de l'intervalle.`,
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'regularite-elliptique.difficile',
  theoremId: 'regularite-elliptique',
  level: 'difficile',
  title: 'Angle rentrant : la régularité $H^2$ tombe',
  statement: t`Soient $\omega\in]\pi,2\pi[$, $\lambda=\pi/\omega\in]1/2,1[$ et le secteur $\Omega=\{(r\cos\theta,r\sin\theta) : 0<r<1,\ 0<\theta<\omega\}$. Soient $\chi\in C^\infty([0,1])$, égale à $1$ sur $[0,1/3]$ et à $0$ sur $[2/3,1]$, $S=r^\lambda\sin(\lambda\theta)$ et $u=\chi(r)S$. Formuler précisément le théorème de régularité $H^2$ et l'hypothèse qui tombe pour $\Omega$. Montrer que $u\in H^1_0(\Omega)$ résout $-\Delta u=f$ au sens faible avec $f\in L^2(\Omega)$, mais que $u\notin H^2(\Omega)$.`,
  source: poly(40, 'Exercice 14, difficile ; énoncé et point de vigilance de la section 3.7 (p. PDF 15)'),
  prerequisites: ['lax-milgram', 'distributions'],
  concepts: ['regularite-bord', 'hypotheses-theoreme', 'regularite-elliptique-classique'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-sector', kind: 'hypothese', text: t`$\omega\in]\pi,2\pi[$, $\lambda=\pi/\omega\in]1/2,1[$, et $\Omega$ est le secteur d'ouverture $\omega$ et de rayon $1$ : un ouvert borné lipschitzien à angle rentrant en $0$.` },
      { id: 'd-u', kind: 'definition', text: t`$S=r^\lambda\sin(\lambda\theta)$, $\chi\in C^\infty([0,1])$ égale à $1$ sur $[0,1/3]$ et à $0$ sur $[2/3,1]$, et $u=\chi(r)S$.` },
      {
        id: 'formule',
        kind: 'consequence',
        text: t`Théorème : si $\Omega$ est borné de classe $C^{1,1}$, $f\in L^2(\Omega)$ et $u\in H^1_0(\Omega)$ résout $-\Delta u=f$ au sens faible, alors $u\in H^2(\Omega)$ et $\|u\|_{H^2}\le C_\Omega\|f\|_{L^2}$.`,
        masked: t`Énoncé exact du théorème de régularité $H^2$ : à identifier.`,
        check: {
          kind: 'choice',
          prompt: t`Quel est l'énoncé exact du théorème de régularité $H^2$ du laplacien de Dirichlet ?`,
          options: [
            t`Si $\Omega$ est borné de classe $C^{1,1}$, $f\in L^2(\Omega)$ et $u\in H^1_0(\Omega)$ résout $-\Delta u=f$ au sens faible, alors $u\in H^2(\Omega)$ et $\|u\|_{H^2}\le C_\Omega\|f\|_{L^2}$.`,
            t`Si $\Omega$ est borné lipschitzien, $f\in L^2(\Omega)$ et $u\in H^1_0(\Omega)$ résout $-\Delta u=f$ au sens faible, alors $u\in H^2(\Omega)$.`,
            t`Si $\Omega$ est borné de classe $C^{1,1}$, $f\in H^{-1}(\Omega)$ et $u\in H^1_0(\Omega)$ résout $-\Delta u=f$ au sens faible, alors $u\in H^2(\Omega)$.`,
            t`Si $\Omega$ est borné de classe $C^{1,1}$ et $f\in L^2(\Omega)$, alors la solution faible est de classe $C^2$ sur $\overline\Omega$.`,
          ],
          correct: [0],
          explanation: t`L'hypothèse de bord est $C^{1,1}$, le second membre est dans $L^2$, et la conclusion est $u\in H^2$ avec estimation : ni plus, ni moins.`,
        },
      },
      { id: 'coin', kind: 'consequence', text: t`En $0$, le bord de $\Omega$ forme un coin d'angle intérieur $\omega\neq\pi$ : $\Omega$ n'est pas de classe $C^1$, a fortiori pas $C^{1,1}$.` },
      { id: 'non-appl', kind: 'consequence', text: t`Le théorème de régularité $H^2$ ne s'applique pas à $\Omega$ : l'hypothèse de bord tombe.` },
      { id: 'harm', kind: 'egalite', text: t`$\Delta S=0$ dans $\Omega$, et $S=0$ sur les côtés $\theta=0$ et $\theta=\omega$.` },
      { id: 'u-H10', kind: 'consequence', text: t`$u\in H^1_0(\Omega)$.` },
      { id: 'f-L2', kind: 'consequence', text: t`$f:=-\Delta u=-2\chi'(r)\partial_rS-\big(\chi''(r)+\tfrac1r\chi'(r)\big)S$ est bornée, donc dans $L^2(\Omega)$, et $u$ résout $-\Delta u=f$ au sens faible.` },
      { id: 'D2', kind: 'egalite', text: t`Dans $\Omega$ : $|D^2S|^2=2\lambda^2(1-\lambda)^2r^{2\lambda-4}$.` },
      { id: 'non-H2', kind: 'consequence', text: t`$\int_{\Omega\cap\{r<1/3\}}|D^2u|^2=2\lambda^2(1-\lambda)^2\,\omega\int_0^{1/3}r^{2\lambda-3}\,dr=+\infty$ : $u\notin H^2(\Omega)$.` },
      { id: 'fin', kind: 'conclusion', text: t`Pour ce secteur à angle rentrant, $f\in L^2(\Omega)$ et la solution faible $u\in H^1_0(\Omega)$ n'est pas dans $H^2(\Omega)$ : sans bord $C^{1,1}$, la conclusion du théorème peut tomber.` },

      // Propositions plausibles mais fausses.
      { id: 'x-lip', kind: 'consequence', distractor: true, text: t`Sur un ouvert borné lipschitzien, toute solution faible avec $f\in L^2$ appartient à $H^2$.` },
      { id: 'x-f', kind: 'consequence', distractor: true, after: ['f-L2'], text: t`$f$ n'est pas de carré intégrable près de $0$, à cause de la singularité de $S$.` },
      { id: 'x-dirac', kind: 'consequence', distractor: true, after: ['harm'], text: t`$-\Delta u$ contient une distribution de Dirac en $0$.` },
    ],
    justifications: [
      { id: 'j-enonce', label: 'Lecture de l’énoncé du polycopié, section 3.7.' },
      { id: 'j-coin', label: t`Un bord de classe $C^1$ admet une tangente en chaque point ; en $0$, les deux demi-tangentes font un angle $\omega\ne\pi$.` },
      { id: 'j-tombe', label: 'Une hypothèse du théorème n’est pas satisfaite.' },
      { id: 'j-polar', label: t`En polaires, $\Delta=\partial_r^2+\tfrac1r\partial_r+\tfrac1{r^2}\partial_\theta^2$ donne $(\lambda^2-\lambda^2)r^{\lambda-2}\sin(\lambda\theta)=0$ ; et $\sin(\lambda\omega)=\sin\pi=0$.` },
      { id: 'j-H10', label: t`$|\nabla S|^2=\lambda^2r^{2\lambda-2}$ et $\int_0^1r^{2\lambda-1}dr<\infty$ : $u\in H^1(\Omega)$ ; $u$ est continue sur $\overline\Omega$ et nulle sur $\partial\Omega$, et les troncatures $(u-\varepsilon)^+-(u+\varepsilon)^-$, à support compact dans $\Omega$, convergent vers $u$ dans $H^1$.` },
      { id: 'j-f', label: t`$\Delta(\chi S)=\chi\Delta S+2\nabla\chi\cdot\nabla S+S\Delta\chi$, avec $\chi'=\chi''=0$ sur $[0,1/3]$ ; $u$ est de classe $C^\infty$ dans $\Omega$, puis densité de $C^\infty_c(\Omega)$ dans $H^1_0(\Omega)$.` },
      { id: 'j-holo', label: t`$S=\operatorname{Im}(z^\lambda)$ avec $z^\lambda$ holomorphe sur le secteur ; pour $S=\operatorname{Im}F$, $|D^2S|^2=2|F''|^2$, et $F''(z)=\lambda(\lambda-1)z^{\lambda-2}$.` },
      { id: 'j-expo', label: t`$u=S$ pour $r<1/3$, $dx=r\,dr\,d\theta$, et $2\lambda-3<-1$ car $\lambda<1$ ; les dérivées faibles de $u$ sont ses dérivées classiques dans $\Omega$.` },
      { id: 'j-syn', label: 'Réunion des propriétés établies.' },
      // Justification séduisante et fausse.
      { id: 'j-non-lip', label: 'Un secteur à angle rentrant n’est pas lipschitzien.' },
    ],
    rules: [
      { from: [], to: 'formule', by: 'j-enonce' },
      { from: ['h-sector'], to: 'coin', by: 'j-coin' },
      { from: ['formule', 'coin'], to: 'non-appl', by: 'j-tombe' },
      { from: ['d-u', 'h-sector'], to: 'harm', by: 'j-polar' },
      { from: ['harm', 'd-u', 'h-sector'], to: 'u-H10', by: 'j-H10' },
      { from: ['harm', 'd-u', 'u-H10'], to: 'f-L2', by: 'j-f' },
      { from: ['d-u', 'h-sector'], to: 'D2', by: 'j-holo' },
      { from: ['D2', 'd-u', 'h-sector'], to: 'non-H2', by: 'j-expo' },
      { from: ['non-appl', 'u-H10', 'f-L2', 'non-H2'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'coin',
        by: 'j-non-lip',
        verdict: 'incorrect',
        concept: 'regularite-bord',
        message: t`Pour $\omega<2\pi$, le secteur est lipschitzien : c'est la régularité $C^{1,1}$ qui manque, pas le caractère lipschitzien.`,
      },
      {
        conclusion: 'x-lip',
        verdict: 'incorrect',
        concept: 'regularite-bord',
        message: t`Le théorème suppose un bord de classe $C^{1,1}$ ; le caractère lipschitzien ne suffit pas.`,
        counterexample: t`Le secteur $\Omega$ de cet exercice : lipschitzien, $f\in L^2(\Omega)$, et $u\notin H^2(\Omega)$.`,
      },
      {
        conclusion: 'x-f',
        verdict: 'incorrect',
        concept: 'regularite-bord',
        message: t`Près de $0$, $\chi=1$ et $\Delta S=0$ : $f$ y est nulle. La perte de régularité vient du domaine, non du second membre.`,
        counterexample: t`Sur $\{r<1/3\}$, $f=-\Delta S=0$.`,
      },
      {
        conclusion: 'x-dirac',
        verdict: 'incorrect',
        concept: 'regularite-bord',
        message: t`L'origine est un point du bord : elle n'appartient pas à l'ouvert $\Omega$, et dans $\mathcal D'(\Omega)$ on a simplement $-\Delta u=f$.`,
        counterexample: t`Pour $\varphi\in C^\infty_c(\Omega)$, le support de $\varphi$ évite un voisinage de $0$, où $u$ est de classe $C^\infty$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-sector',
        label: t`Retirer l'angle rentrant ($\omega>\pi$)`,
        necessary: true,
        explanation: t`Pour $\omega\le\pi$, on a $\lambda\ge 1$ : soit $\lambda(1-\lambda)=0$, soit $2\lambda-3>-1$, et l'intégrale des dérivées secondes converge.`,
        counterexample: t`$\omega=\pi/2$ : $\lambda=2$ et $S=r^2\sin(2\theta)=2xy$, polynomiale, donc dans $H^2$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Pour $\omega=3\pi/2$ : valeur de $\lambda=\pi/\omega$`, expected: '2/3' }],
  solution: t`**Le théorème.** Si $\Omega$ est borné de classe $C^{1,1}$, $f\in L^2(\Omega)$ et $u\in H^1_0(\Omega)$ résout $-\Delta u=f$ au sens faible, alors $u\in H^2(\Omega)$ et $\|u\|_{H^2}\le C_\Omega\|f\|_{L^2}$. Le secteur est borné et lipschitzien, mais son bord forme en $0$ un coin d'angle $\omega\ne\pi$ : il n'est pas $C^1$, donc pas $C^{1,1}$. Le théorème ne s'applique pas.

**La fonction singulière.** En polaires, $\Delta S=(\lambda^2-\lambda^2)r^{\lambda-2}\sin(\lambda\theta)=0$, et $S$ s'annule sur les deux côtés car $\sin(\lambda\omega)=\sin\pi=0$. Comme $|\nabla S|^2=\lambda^2r^{2\lambda-2}$ et $\int_0^1r^{2\lambda-1}dr<\infty$, $u\in H^1(\Omega)$ ; $u$ est continue sur $\overline\Omega$ et nulle sur le bord, d'où $u\in H^1_0(\Omega)$.

**Le second membre.** $-\Delta u=-2\chi'(r)\partial_rS-(\chi''+\tfrac1r\chi')S=:f$ est bornée car $\chi'$ et $\chi''$ sont nulles près de $0$. Comme $u$ est de classe $C^\infty$ dans $\Omega$ (qui ne contient pas l'origine), l'équation a lieu au sens des distributions, puis au sens faible par densité.

**Pas de régularité $H^2$.** $S=\operatorname{Im}(z^\lambda)$, donc $|D^2S|^2=2|\lambda(\lambda-1)z^{\lambda-2}|^2=2\lambda^2(1-\lambda)^2r^{2\lambda-4}$. Sur $\{r<1/3\}$, $u=S$ et $\int|D^2u|^2=2\lambda^2(1-\lambda)^2\,\omega\int_0^{1/3}r^{2\lambda-3}dr=+\infty$ car $2\lambda-3<-1$. Donc $u\notin H^2(\Omega)$.

**Conclusion.** Pour $\omega=3\pi/2$, $\lambda=2/3$. Le second membre est régulier ; c'est le coin rentrant qui fait perdre la régularité $H^2$.`,
  steps: [
    'Énoncer le théorème avec ses hypothèses exactes.',
    t`Identifier l'hypothèse qui tombe : bord non $C^{1,1}$.`,
    t`Vérifier que $u\in H^1_0(\Omega)$ et que $f=-\Delta u\in L^2(\Omega)$.`,
    t`Calculer $|D^2S|^2$ et montrer la divergence de son intégrale près de $0$.`,
  ],
  commonErrors: [
    { id: 'e-lip', description: t`Croire qu'un bord lipschitzien suffit à la régularité $H^2$.`, concept: 'regularite-bord' },
    { id: 'e-second-membre', description: 'Attribuer la perte de régularité au second membre plutôt qu’au domaine.', concept: 'regularite-bord' },
    { id: 'e-enonce', description: 'Énoncer le théorème avec une hypothèse ou une conclusion modifiée.', concept: 'hypotheses-theoreme' },
  ],
  hints: [
    t`Quelles sont exactement les hypothèses du théorème de régularité $H^2$ ? Laquelle le secteur ne vérifie-t-il pas ?`,
    t`Vérifie que $S=r^\lambda\sin(\lambda\theta)$ est harmonique et nulle sur les deux côtés ; la troncature $\chi$ rend $u$ nulle près de $r=1$ et ne crée de second membre que loin de $0$.`,
    t`$S=\operatorname{Im}(z^\lambda)$ : $|D^2S|^2=2\lambda^2(1-\lambda)^2r^{2\lambda-4}$, et $\int_0r^{2\lambda-3}dr$ diverge pour $\lambda<1$.`,
  ],
  rubric: rubric({
    hypotheses: t`L'énoncé exact est donné, et l'hypothèse $C^{1,1}$ est identifiée comme celle qui tombe.`,
    methode: 'Une solution explicite, de second membre régulier, montre l’échec de la conclusion.',
    validite: t`Les calculs en polaires et l'exposant critique sont exacts.`,
    justifications: t`L'appartenance à $H^1_0$ et l'équation au sens faible sont justifiées.`,
    conclusion: t`$u\notin H^2(\Omega)$ alors que $f\in L^2(\Omega)$.`,
  }),
  variant: {
    statement: t`Pour quelles valeurs de $\omega\in]0,2\pi[$ la fonction $S=r^{\pi/\omega}\sin(\pi\theta/\omega)$ a-t-elle des dérivées secondes de carré intégrable au voisinage de $0$ dans le secteur d'ouverture $\omega$ ?`,
    solution: t`Avec $\lambda=\pi/\omega$, $|D^2S|^2=2\lambda^2(1-\lambda)^2r^{2\lambda-4}$. Si $\lambda=1$ ($\omega=\pi$), $S=r\sin\theta$ est linéaire et $D^2S=0$. Sinon, $\int_0r^{2\lambda-3}dr$ converge si et seulement si $2\lambda-3>-1$, c'est-à-dire $\lambda>1$. Les dérivées secondes sont donc de carré intégrable près de $0$ exactement pour $\omega\le\pi$.`,
    closedChecks: [{ kind: 'rational', prompt: t`Pour $\omega=\pi/2$ : valeur de $\lambda$`, expected: '2' }],
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT14: TheoremModule = {
  theorem: {
    id: 'regularite-elliptique',
    spaces: [
      t`$\Omega\subset\mathbb R^d$ : ouvert borné de classe $C^{1,1}$.`,
      t`$H^1_0(\Omega)$, espace de la solution faible ; $H^2(\Omega)$, fonctions de $L^2$ dont les dérivées au sens des distributions jusqu'à l'ordre $2$ sont dans $L^2$.`,
    ],
    hypotheses: [
      {
        id: 'h-bord',
        text: t`$\Omega$ est borné de classe $C^{1,1}$.`,
        whenRemoved: t`Sur le secteur $\{0<r<1,\ 0<\theta<\omega\}$, avec $\omega\in]\pi,2\pi[$, $u=\chi(r)r^{\pi/\omega}\sin(\pi\theta/\omega)$, où $\chi\in C^\infty([0,1])$ vaut $1$ près de $0$ et $0$ près de $1$, est dans $H^1_0$, de laplacien borné, et n'est pas dans $H^2$.`,
      },
      {
        id: 'h-f',
        text: t`$f\in L^2(\Omega)$.`,
        whenRemoved: t`Sur $]0,1[$, pour $f=\delta_{1/2}$, la solution faible $u(x)=\tfrac12\min(x,1-x)$ vérifie $u''=-\delta_{1/2}\notin L^2$.`,
      },
      { id: 'h-sol', text: t`$u\in H^1_0(\Omega)$ résout $-\Delta u=f$ au sens faible.` },
    ],
    statement: t`Si $\Omega$ est borné de classe $C^{1,1}$, $f\in L^2(\Omega)$ et $u\in H^1_0(\Omega)$ résout $-\Delta u=f$ au sens faible, alors
$$u\in H^2(\Omega),\qquad\|u\|_{H^2}\le C_\Omega\|f\|_{L^2}.$$`,
    conclusions: {
      regularite: t`$u\in H^2(\Omega)$.`,
      stabilite: t`$\|u\|_{H^2}\le C_\Omega\|f\|_{L^2}$.`,
    },
    sourceProof: 'idee',
    proofOutline: [
      'Quotients de différences : estimations des dérivées secondes à l’intérieur.',
      'Près du bord : cartes régulières et condition de Dirichlet.',
      t`Sur un intervalle, l'équation donne directement $u''=-f\in L^2$ (exercice intermédiaire).`,
    ],
    warnings: [
      t`L'hypothèse de régularité du bord est déterminante : sur un domaine à coins rentrants, $H^2$ peut échouer.`,
      t`$H^2$ n'entraîne pas $C^2$ : la dérivée seconde n'est qu'une fonction de $L^2$.`,
      'Les dérivées sont prises au sens des distributions : une dérivée presque partout ne suffit pas.',
    ],
    usefulFor: t`Identifier le domaine $D(-\Delta_D)=H^2(\Omega)\cap H^1_0(\Omega)$ sous les hypothèses appropriées, et construire la théorie spectrale de l'opérateur.`,
    verification: { origin: 'polycopie', review: 'machine', notes: 'Énoncé du polycopié ; la démonstration n’y figure qu’en idée.' },
  },
  definitions: [
    {
      id: 'regularite-elliptique-H2',
      term: t`Espace $H^2(\Omega)$`,
      statement: t`$H^2(\Omega)$ est l'espace des $u\in L^2(\Omega)$ dont toutes les dérivées au sens des distributions d'ordre $1$ et $2$ appartiennent à $L^2(\Omega)$.`,
      source: poly(11, 'Section 3.2'),
    },
  ],
  concepts: [
    {
      id: 'regularite-elliptique-classique',
      label: 'Dérivées faibles et dérivées classiques',
      reminder: t`Une dérivée presque partout n'est pas la dérivée au sens des distributions ($|x-1/2|$ a $(v')'=2\delta_{1/2}$), et $H^2$ n'entraîne pas $C^2$.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-regularite-coin',
      theoremId: 'regularite-elliptique',
      title: 'Angle rentrant',
      claim: t`Sur tout ouvert borné lipschitzien, la solution faible de $-\Delta u=f$ avec $f\in L^2$ appartient à $H^2$.`,
      correctStatement: t`Le théorème exige un bord de classe $C^{1,1}$ ; au voisinage d'un coin rentrant, $H^2$ peut échouer.`,
      task: t`Pour le secteur d'angle $\omega=3\pi/2$, détermine l'exposant $\lambda=\pi/\omega$ de la fonction singulière $r^\lambda\sin(\lambda\theta)$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\lambda$`, expected: '2/3' },
      explanation: t`$|D^2S|^2=2\lambda^2(1-\lambda)^2r^{2\lambda-4}$ et $\int_0r^{2\lambda-3}dr=+\infty$ pour $\lambda=2/3$ : la solution tronquée a un laplacien borné et n'est pas dans $H^2$.`,
      concept: 'regularite-bord',
      source: poly(15, 'Lecture géométrique, section 3.7'),
    },
    {
      id: 'ce-regularite-pp',
      theoremId: 'regularite-elliptique',
      title: 'Dérivée seconde presque partout',
      claim: t`Une fonction continue, dont la dérivée seconde existe presque partout et est de carré intégrable, appartient à $H^2(]0,1[)$.`,
      correctStatement: t`$H^2$ porte sur les dérivées au sens des distributions, qui voient les sauts de la dérivée première.`,
      task: t`Pour $v(x)=|x-1/2|$, calcule le saut $v'(1/2^+)-v'(1/2^-)$.`,
      check: { kind: 'rational', prompt: t`Valeur du saut de $v'$ en $1/2$`, expected: '2' },
      explanation: t`$v''=0$ presque partout, mais $(v')'=2\delta_{1/2}$ dans $\mathcal D'(]0,1[)$, qui n'est pas une fonction de $L^2$ : $v\notin H^2(]0,1[)$.`,
      concept: 'regularite-elliptique-classique',
      source: poly(11, 'Sections 3.1 et 3.2 : dérivées au sens des distributions'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT14;
