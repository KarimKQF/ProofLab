/**
 * Résultat 15 — Plancherel (polycopié, section 4.1, p. PDF 17).
 * Convention unitaire du polycopié : û(ξ) = (2π)^{-d/2} ∫ e^{-ix·ξ} u(x) dx.
 * Chaque identité est située sur son espace : intégrale sur 𝒮, prolongement unitaire sur L²,
 * dualité sur 𝒮'.
 */
import { t, rubric, poly, FROM_POLY, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'plancherel.facile',
  theoremId: 'plancherel',
  level: 'facile',
  title: t`Transformée de Fourier d'une dérivée sur $\mathcal S(\mathbb R)$`,
  statement: t`Soit $u\in\mathcal S(\mathbb R)$. Avec la convention unitaire du polycopié, $\hat v(\xi)=(2\pi)^{-1/2}\int_{\mathbb R}e^{-ix\xi}v(x)\,dx$, calculer $\widehat{u'}$ en fonction de $\hat u$ en justifiant chaque étape. Il s'agit de la transformée de la dérivée $u'$, et non de la dérivée de $\hat u$.`,
  source: poly(40, 'Exercice 15, facile ; énoncé de Plancherel, section 4.1 (p. PDF 17)'),
  prerequisites: [],
  concepts: ['plancherel-convention', 'plancherel-derivee-transformee', 'plancherel-cadre-identite', 'justification-absente'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-u', kind: 'hypothese', text: t`$u\in\mathcal S(\mathbb R)$.` },
      { id: 'd-fourier', kind: 'definition', text: t`Pour $v\in\mathcal S(\mathbb R)$ et $\xi\in\mathbb R$ : $\hat v(\xi)=(2\pi)^{-1/2}\int_{\mathbb R}e^{-ix\xi}v(x)\,dx$.` },
      { id: 'd-xi', kind: 'definition', local: true, text: t`Soient $\xi\in\mathbb R$ fixé et $R>0$.` },

      { id: 's-schwartz', kind: 'consequence', text: t`$u'\in\mathcal S(\mathbb R)$ ; en particulier $u$ et $u'$ sont intégrables sur $\mathbb R$, et $\widehat{u'}$ est donnée par l'intégrale.` },
      { id: 's-bord', kind: 'consequence', text: t`$u(x)\to 0$ lorsque $|x|\to+\infty$.` },
      { id: 'ipp', kind: 'egalite', text: t`$\displaystyle\int_{-R}^{R}e^{-ix\xi}u'(x)\,dx=e^{-iR\xi}u(R)-e^{iR\xi}u(-R)+i\xi\int_{-R}^{R}e^{-ix\xi}u(x)\,dx$.` },
      { id: 'lim', kind: 'egalite', text: t`$\displaystyle\int_{\mathbb R}e^{-ix\xi}u'(x)\,dx=i\xi\int_{\mathbb R}e^{-ix\xi}u(x)\,dx$.` },
      {
        id: 'res',
        kind: 'egalite',
        text: t`$\widehat{u'}(\xi)=i\xi\,\hat u(\xi)$.`,
        masked: t`Expression de $\widehat{u'}(\xi)$ en fonction de $\hat u(\xi)$ : à déterminer.`,
        check: {
          kind: 'expr-equiv',
          prompt: t`Multiplicateur $m(\xi)$ tel que $\widehat{u'}(\xi)=m(\xi)\,\hat u(\xi)$. Écrire i pour l'unité imaginaire, xi pour la variable, et * pour les produits.`,
          expected: 'i*xi',
          vars: ['i', 'xi'],
        },
      },
      { id: 'fin', kind: 'conclusion', text: t`Pour tout $\xi\in\mathbb R$ : $\widehat{u'}(\xi)=i\xi\,\hat u(\xi)$. C'est une identité ponctuelle entre fonctions de $\mathcal S(\mathbb R)$, sans facteur $2\pi$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-signe', kind: 'egalite', distractor: true, after: ['lim'], text: t`$\widehat{u'}(\xi)=-i\xi\,\hat u(\xi)$.` },
      { id: 'x-2pi', kind: 'egalite', distractor: true, after: ['lim'], text: t`$\widehat{u'}(\xi)=2\pi i\xi\,\hat u(\xi)$.` },
      { id: 'x-derive', kind: 'egalite', distractor: true, text: t`$(\hat u)'(\xi)=i\xi\,\hat u(\xi)$.` },
    ],
    justifications: [
      { id: 'j-stable', label: t`$\mathcal S(\mathbb R)$ est stable par dérivation, et toute $v\in\mathcal S(\mathbb R)$ vérifie $|v(x)|\le C(1+x^2)^{-1}$, donc est intégrable.` },
      { id: 'j-decroit', label: t`Décroissance rapide : $\sup_{x\in\mathbb R}(1+|x|)\,|u(x)|<+\infty$.` },
      { id: 'j-ipp', label: t`Intégration par parties sur $[-R,R]$, avec $\partial_x\big(e^{-ix\xi}\big)=-i\xi\,e^{-ix\xi}$.` },
      { id: 'j-limite', label: t`Limite $R\to+\infty$ : les termes de bord sont de module $|u(\pm R)|$, et les intégrales sur $[-R,R]$ convergent par intégrabilité.` },
      { id: 'j-normalise', label: t`Multiplication par $(2\pi)^{-1/2}$, puis définition de la transformée de $u'$ et de celle de $u$.` },
      { id: 'j-quantif', label: t`Le réel $\xi$ ayant été choisi arbitrairement, l'identité vaut pour tout $\xi\in\mathbb R$.` },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-borne', label: t`Les termes de bord sont nuls parce que $u$ est bornée.` },
      { id: 'j-convention', label: t`La dérivation de l'exponentielle fait apparaître un facteur $2\pi$.` },
      { id: 'j-evident', label: 'C’est la formule du cours.' },
      { id: 'j-plancherel', label: 'Théorème de Plancherel.', theorem: 'plancherel' },
    ],
    rules: [
      { from: ['h-u'], to: 's-schwartz', by: 'j-stable' },
      { from: ['h-u'], to: 's-bord', by: 'j-decroit' },
      { from: ['h-u', 'd-xi'], to: 'ipp', by: 'j-ipp' },
      { from: ['ipp', 's-bord', 's-schwartz'], to: 'lim', by: 'j-limite' },
      { from: ['lim', 'd-fourier', 's-schwartz'], to: 'res', by: 'j-normalise' },
      { from: ['res', 'd-xi'], to: 'fin', by: 'j-quantif' },
    ],
    traps: [
      {
        conclusion: 'lim',
        by: 'j-borne',
        verdict: 'incorrect',
        concept: 'plancherel-cadre-identite',
        message: t`Être bornée ne force pas $u(x)\to 0$ à l'infini : les termes de bord ne disparaissent que grâce à la décroissance de $u$.`,
        counterexample: t`$u\equiv 1$ est $C^\infty$ et bornée ; le terme de bord vaut $e^{-iR\xi}-e^{iR\xi}=-2i\sin(R\xi)$, sans limite quand $R\to+\infty$ si $\xi\neq 0$.`,
      },
      {
        conclusion: 'res',
        by: 'j-convention',
        verdict: 'incorrect',
        concept: 'plancherel-convention',
        message: t`La dérivée de $x\mapsto e^{-ix\xi}$ est $-i\xi e^{-ix\xi}$ : aucun facteur $2\pi$ n'apparaît. Un tel facteur n'existe qu'avec la convention $\int e^{-2i\pi x\xi}v(x)\,dx$.`,
      },
      {
        conclusion: 'res',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`La formule se démontre ici : d'où vient le facteur $i\xi$, et pourquoi les termes de bord disparaissent-ils ?`,
      },
      {
        conclusion: 'x-signe',
        verdict: 'incorrect',
        concept: 'plancherel-convention',
        message: t`Le signe provient de l'intégration par parties : le signe moins de la formule se combine avec celui de $\partial_x e^{-ix\xi}=-i\xi e^{-ix\xi}$, d'où $+i\xi$.`,
        counterexample: t`Pour $u(x)=e^{-x^2/2}$ : $\hat u(\xi)=e^{-\xi^2/2}$ et $u'(x)=-xe^{-x^2/2}$, dont la transformée est $i\xi e^{-\xi^2/2}$ ; en $\xi=1$, on obtient $ie^{-1/2}\neq -ie^{-1/2}$.`,
      },
      {
        conclusion: 'x-2pi',
        verdict: 'incorrect',
        concept: 'plancherel-convention',
        message: t`Avec la convention unitaire du polycopié, la dérivation devient la multiplication par $i\xi$, sans facteur $2\pi$ ; le multiplicateur $2\pi i\xi$ correspond à la convention $\int e^{-2i\pi x\xi}v(x)\,dx$.`,
        counterexample: t`Pour $u(x)=e^{-x^2/2}$ : $\widehat{u'}(1)=ie^{-1/2}$, et non $2\pi ie^{-1/2}$.`,
      },
      {
        conclusion: 'x-derive',
        verdict: 'incorrect',
        concept: 'plancherel-derivee-transformee',
        message: t`$(\hat u)'$ n'est pas $\widehat{u'}$ : dériver $\hat u$ fait descendre $-ix$ sous l'intégrale, et $(\hat u)'=-i\,\widehat{xu}$.`,
        counterexample: t`Pour $u(x)=e^{-x^2/2}$ : $(\hat u)'(\xi)=-\xi e^{-\xi^2/2}$, réel, alors que $i\xi\hat u(\xi)=i\xi e^{-\xi^2/2}$ est imaginaire pur ; ils diffèrent dès que $\xi\neq 0$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-u',
        label: t`Retirer $u\in\mathcal S(\mathbb R)$`,
        necessary: true,
        explanation: t`Sans intégrabilité ni décroissance, ni $\hat u$ ni $\widehat{u'}$ ne sont données par l'intégrale, et les termes de bord ne disparaissent pas.`,
        counterexample: t`$u\equiv 1$ est $C^\infty$ et bornée, mais n'est pas intégrable sur $\mathbb R$ : l'intégrale définissant $\hat u(0)$ diverge.`,
      },
      {
        hypothesis: 's-bord',
        label: 'Ne plus disposer de la nullité à l’infini',
        necessary: true,
        explanation: t`Le passage à la limite $R\to+\infty$ exige $u(\pm R)\to 0$.`,
        counterexample: t`Pour $u\equiv 1$, le terme de bord $-2i\sin(R\xi)$ n'a pas de limite lorsque $\xi\neq 0$.`,
      },
    ],
  },
  closedChecks: [
    {
      kind: 'expr-equiv',
      prompt: t`En itérant le calcul : multiplicateur $m(\xi)$ tel que $\widehat{u''}(\xi)=m(\xi)\,\hat u(\xi)$, en fonction de xi.`,
      expected: '-xi^2',
      vars: ['xi'],
    },
  ],
  solution: t`**Cadre.** Soit $u\in\mathcal S(\mathbb R)$. Alors $u'\in\mathcal S(\mathbb R)$ : $u$ et $u'$ sont intégrables, leurs transformées sont données par l'intégrale, et $u(x)\to 0$ quand $|x|\to+\infty$.

**Intégration par parties.** Pour $\xi\in\mathbb R$ et $R>0$, comme $\partial_x e^{-ix\xi}=-i\xi e^{-ix\xi}$ :
$$\int_{-R}^{R}e^{-ix\xi}u'(x)\,dx=e^{-iR\xi}u(R)-e^{iR\xi}u(-R)+i\xi\int_{-R}^{R}e^{-ix\xi}u(x)\,dx.$$

**Limite.** Les termes de bord sont de module $|u(\pm R)|\to 0$, et les intégrales convergent par intégrabilité. En multipliant par $(2\pi)^{-1/2}$ :
$$\widehat{u'}(\xi)=i\xi\,\hat u(\xi)\qquad\text{pour tout }\xi\in\mathbb R.$$

**Points de vigilance.** Aucun facteur $2\pi$ n'apparaît avec la convention unitaire. L'identité ne porte pas sur $(\hat u)'$, qui vaut $-i\,\widehat{xu}$. En itérant, $\widehat{u''}=(i\xi)^2\hat u=-\xi^2\hat u$. Pour $u\in L^2$ seulement, la même formule n'a de sens que dans $\mathcal S'$ : c'est l'objet de l'exercice suivant.`,
  steps: [
    t`Vérifier que $u'\in\mathcal S(\mathbb R)$ et que $u$ tend vers $0$ à l'infini.`,
    t`Intégrer par parties sur $[-R,R]$.`,
    t`Faire tendre $R$ vers $+\infty$.`,
    t`Normaliser par $(2\pi)^{-1/2}$ et reconnaître $\widehat{u'}$ et $\hat u$.`,
  ],
  commonErrors: [
    { id: 'e-signe', description: t`Obtenir $-i\xi$ au lieu de $+i\xi$ en oubliant l'un des deux signes de l'intégration par parties.`, concept: 'plancherel-convention' },
    { id: 'e-2pi', description: t`Importer un facteur $2\pi$ d'une autre convention de Fourier.`, concept: 'plancherel-convention' },
    { id: 'e-chapeau', description: t`Confondre $\widehat{u'}$ et $(\hat u)'$.`, concept: 'plancherel-derivee-transformee' },
    { id: 'e-bord', description: t`Annuler les termes de bord en invoquant seulement le caractère borné de $u$.`, concept: 'plancherel-cadre-identite' },
  ],
  hints: [
    t`Dans quel espace vit $u'$, et l'intégrale qui définit $\widehat{u'}$ a-t-elle un sens ?`,
    t`Écris l'intégrale sur $[-R,R]$, intègre par parties en dérivant l'exponentielle, puis fais tendre $R$ vers l'infini.`,
    t`$\partial_x e^{-ix\xi}=-i\xi e^{-ix\xi}$ : le signe moins de l'intégration par parties et celui de la phase se compensent. Les termes de bord sont majorés par $|u(\pm R)|$.`,
  ],
  rubric: rubric({
    hypotheses: t`L'appartenance de $u'$ à $\mathcal S(\mathbb R)$ et la décroissance de $u$ sont établies avant le calcul.`,
    methode: 'Intégration par parties sur un intervalle borné, puis passage à la limite.',
    validite: t`Signe et constante corrects : $+i\xi$, sans facteur $2\pi$.`,
    justifications: 'La disparition des termes de bord est justifiée par la décroissance, non par la seule bornitude.',
    conclusion: t`L'identité $\widehat{u'}=i\xi\hat u$ est obtenue pour tout $\xi$ et distinguée de $(\hat u)'$.`,
  }),
  variant: {
    statement: t`Soit $u\in\mathcal S(\mathbb R)$. Montrer que $\hat u$ est dérivable sur $\mathbb R$ et que $\widehat{xu}=i\,(\hat u)'$, où $xu$ désigne la fonction $x\mapsto xu(x)$.`,
    solution: t`Pour $x$ fixé, $\xi\mapsto e^{-ix\xi}u(x)$ est dérivable, de dérivée $-ix\,e^{-ix\xi}u(x)$, de module $|x\,u(x)|$ indépendant de $\xi$ et intégrable, car $xu\in\mathcal S(\mathbb R)$. Le théorème de dérivation sous l'intégrale (convergence dominée) donne
$$(\hat u)'(\xi)=(2\pi)^{-1/2}\int_{\mathbb R}(-ix)\,e^{-ix\xi}u(x)\,dx=-i\,\widehat{xu}(\xi),$$
d'où $\widehat{xu}=i(\hat u)'$, puisque $i\cdot(-i)=1$. Sans domination, la conclusion peut tomber : pour $u(x)=(1+x^2)^{-1}$, intégrable mais avec $xu\notin L^1$, on a $\hat u(\xi)=\sqrt{\pi/2}\,e^{-|\xi|}$, non dérivable en $0$.`,
    proof: {
      purpose: 'demonstration',
      goal: 'fin',
      nodes: [
        { id: 'h-u', kind: 'hypothese', text: t`$u\in\mathcal S(\mathbb R)$.` },
        { id: 'd-fourier', kind: 'definition', text: t`Pour $v\in\mathcal S(\mathbb R)$ : $\hat v(\xi)=(2\pi)^{-1/2}\int_{\mathbb R}e^{-ix\xi}v(x)\,dx$.` },
        { id: 's-xu', kind: 'consequence', text: t`$xu\in\mathcal S(\mathbb R)$ ; en particulier $x\mapsto x\,u(x)$ est intégrable.` },
        { id: 's-dom', kind: 'egalite', text: t`Pour tous $x,\xi\in\mathbb R$ : $\big|\partial_\xi\big(e^{-ix\xi}u(x)\big)\big|=|x\,u(x)|$.` },
        { id: 's-der', kind: 'egalite', text: t`$\hat u$ est dérivable et $(\hat u)'(\xi)=(2\pi)^{-1/2}\int_{\mathbb R}(-ix)\,e^{-ix\xi}u(x)\,dx$.` },
        { id: 'res', kind: 'egalite', text: t`$(\hat u)'(\xi)=-i\,\widehat{xu}(\xi)$ pour tout $\xi\in\mathbb R$.` },
        { id: 'fin', kind: 'conclusion', text: t`$\widehat{xu}=i\,(\hat u)'$ sur $\mathbb R$.` },
        { id: 'x-signe', kind: 'egalite', distractor: true, after: ['res'], text: t`$\widehat{xu}=-i\,(\hat u)'$ sur $\mathbb R$.` },
        { id: 'x-pareil', kind: 'egalite', distractor: true, text: t`$(\hat u)'(\xi)=i\xi\,\hat u(\xi)$.` },
      ],
      justifications: [
        { id: 'j-stable', label: t`$\mathcal S(\mathbb R)$ est stable par multiplication par $x$, et ses éléments sont intégrables.` },
        { id: 'j-calc', label: t`$\partial_\xi e^{-ix\xi}=-ix\,e^{-ix\xi}$ et $|e^{-ix\xi}|=1$.` },
        { id: 'j-dct', label: 'Dérivation sous l’intégrale : majoration de la dérivée par une fonction intégrable indépendante du paramètre.', theorem: 'convergence-dominee' },
        { id: 'j-reconnait', label: t`On reconnaît la transformée de $xu$, multipliée par $-i$.` },
        { id: 'j-multiplie', label: t`Multiplication par $i$, avec $i\cdot(-i)=1$.` },
        { id: 'j-sans-dom', label: 'On dérive sous l’intégrale sans autre vérification.' },
      ],
      rules: [
        { from: ['h-u'], to: 's-xu', by: 'j-stable' },
        { from: ['h-u'], to: 's-dom', by: 'j-calc' },
        { from: ['d-fourier', 's-xu', 's-dom'], to: 's-der', by: 'j-dct' },
        { from: ['s-der', 'd-fourier'], to: 'res', by: 'j-reconnait' },
        { from: ['res'], to: 'fin', by: 'j-multiplie' },
      ],
      traps: [
        {
          conclusion: 's-der',
          by: 'j-sans-dom',
          verdict: 'incorrect',
          concept: 'hypotheses-theoreme',
          message: 'La dérivation sous l’intégrale exige une domination intégrable de la dérivée, uniforme en le paramètre.',
          counterexample: t`$u(x)=(1+x^2)^{-1}$ est intégrable, mais $xu\notin L^1(\mathbb R)$ et $\hat u(\xi)=\sqrt{\pi/2}\,e^{-|\xi|}$ n'est pas dérivable en $0$.`,
        },
        {
          conclusion: 'x-signe',
          verdict: 'incorrect',
          concept: 'plancherel-convention',
          message: t`De $(\hat u)'=-i\,\widehat{xu}$, on tire $\widehat{xu}=i\,(\hat u)'$ en multipliant par $i$, car $i\cdot(-i)=1$.`,
          counterexample: t`Pour $u(x)=e^{-x^2/2}$ : $\widehat{xu}(\xi)=-i\xi e^{-\xi^2/2}=i\,(\hat u)'(\xi)$.`,
        },
        {
          conclusion: 'x-pareil',
          verdict: 'incorrect',
          concept: 'plancherel-derivee-transformee',
          message: t`La multiplication par $i\xi$ correspond à la dérivation de $u$, pas à celle de $\hat u$.`,
          counterexample: t`Pour $u(x)=e^{-x^2/2}$ : $(\hat u)'(\xi)=-\xi e^{-\xi^2/2}\neq i\xi e^{-\xi^2/2}$ pour $\xi\neq 0$.`,
        },
      ],
      removable: [
        {
          hypothesis: 's-dom',
          label: 'Ne plus disposer de la domination',
          necessary: true,
          explanation: 'Sans domination intégrable, la dérivation sous l’intégrale n’est plus justifiée, et la conclusion peut être fausse.',
          counterexample: t`$u(x)=(1+x^2)^{-1}$ : $\hat u(\xi)=\sqrt{\pi/2}\,e^{-|\xi|}$ n'est pas dérivable en $0$.`,
        },
      ],
    },
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'plancherel.intermediaire',
  theoremId: 'plancherel',
  level: 'intermediaire',
  title: t`$\|u'\|_{L^2}=\|\xi\hat u\|_{L^2}$ : les bonnes hypothèses`,
  statement: t`Soit $u\in L^2(\mathbb R)$, vue comme distribution tempérée, et soit $u'$ sa dérivée au sens de $\mathcal S'(\mathbb R)$. Montrer que $u'\in L^2(\mathbb R)$ si et seulement si $\xi\hat u\in L^2(\mathbb R)$, et que dans ce cas $\|u'\|_{L^2}=\|\xi\hat u\|_{L^2}$. Montrer par un exemple que l'hypothèse $u\in L^2(\mathbb R)$ seule ne suffit pas.`,
  source: poly(40, 'Exercice 15, intermédiaire ; énoncé de Plancherel, section 4.1 (p. PDF 17)'),
  prerequisites: [],
  concepts: ['plancherel-cadre-identite', 'plancherel-derivee-transformee', 'plancherel-convention', 'hypotheses-theoreme'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-u', kind: 'hypothese', text: t`$u\in L^2(\mathbb R)$, vue comme élément de $\mathcal S'(\mathbb R)$ ; $u'$ désigne sa dérivée dans $\mathcal S'(\mathbb R)$.` },
      { id: 't-iso', kind: 'application-theoreme', text: t`$\mathcal F$ est un isomorphisme unitaire de $L^2(\mathbb R)$ : $\|\hat v\|_{L^2}=\|v\|_{L^2}$ pour tout $v\in L^2(\mathbb R)$.` },
      { id: 't-der', kind: 'application-theoreme', text: t`$\widehat{u'}=i\xi\,\hat u$ dans $\mathcal S'(\mathbb R)$.` },
      { id: 't-inj', kind: 'consequence', text: t`$\mathcal F$ est injective sur $\mathcal S'(\mathbb R)$ et coïncide sur $L^2(\mathbb R)$ avec le prolongement unitaire.` },
      { id: 's-fct', kind: 'consequence', text: t`$\hat u\in L^2(\mathbb R)$ ; la fonction $\xi\mapsto i\xi\,\hat u(\xi)$ est localement intégrable et représente la distribution tempérée $i\xi\hat u$.` },

      { id: 'd-cn', kind: 'definition', local: true, text: t`Supposons $u'\in L^2(\mathbb R)$.` },
      { id: 'cn-planch', kind: 'egalite', text: t`$\widehat{u'}\in L^2(\mathbb R)$ et $\|\widehat{u'}\|_{L^2}=\|u'\|_{L^2}$.` },
      { id: 'cn-pp', kind: 'egalite', text: t`$\widehat{u'}(\xi)=i\xi\,\hat u(\xi)$ pour presque tout $\xi\in\mathbb R$.` },
      { id: 'cn-fin', kind: 'egalite', text: t`$\xi\hat u\in L^2(\mathbb R)$ et $\|\xi\hat u\|_{L^2}=\|u'\|_{L^2}$.` },

      { id: 'd-cs', kind: 'definition', local: true, text: t`Supposons $\xi\hat u\in L^2(\mathbb R)$.` },
      { id: 'cs-v', kind: 'consequence', text: t`$v:=\mathcal F^{-1}(i\xi\hat u)$ est un élément bien défini de $L^2(\mathbb R)$, avec $\hat v=i\xi\hat u$ et $\|v\|_{L^2}=\|\xi\hat u\|_{L^2}$.` },
      { id: 'cs-eq', kind: 'egalite', text: t`$\hat v=\widehat{u'}$ dans $\mathcal S'(\mathbb R)$.` },
      { id: 'cs-inj', kind: 'egalite', text: t`$u'=v$ dans $\mathcal S'(\mathbb R)$ ; donc $u'\in L^2(\mathbb R)$.` },
      { id: 'cs-fin', kind: 'egalite', text: t`$u'\in L^2(\mathbb R)$ et $\|u'\|_{L^2}=\|\xi\hat u\|_{L^2}$.` },

      {
        id: 'c-ex',
        kind: 'consequence',
        text: t`Pour $w=\mathbb 1_{]0,1[}\in L^2(\mathbb R)$ : $2\pi\,|\xi\hat w(\xi)|^2=|1-e^{-i\xi}|^2=2-2\cos\xi$, fonction $2\pi$-périodique non nulle ; donc $\xi\hat w\notin L^2(\mathbb R)$, et $w'=\delta_0-\delta_1\notin L^2(\mathbb R)$.`,
        masked: t`Pour $w=\mathbb 1_{]0,1[}$ : comportement de $|\xi\hat w(\xi)|^2$ à déterminer.`,
        check: { kind: 'rational', prompt: t`Valeur de $2\pi\,|\xi\hat w(\xi)|^2$ en $\xi=\pi$.`, expected: '4' },
      },
      { id: 'fin', kind: 'conclusion', text: t`Pour $u\in L^2(\mathbb R)$ : $u'\in L^2(\mathbb R)\iff\xi\hat u\in L^2(\mathbb R)$, et alors $\|u'\|_{L^2}=\|\xi\hat u\|_{L^2}$. L'hypothèse $u\in L^2(\mathbb R)$ seule ne suffit pas.` },

      // Propositions plausibles mais fausses.
      { id: 'x-sansH', kind: 'consequence', distractor: true, text: t`Pour tout $u\in L^2(\mathbb R)$ : $\xi\hat u\in L^2(\mathbb R)$ et $\|u'\|_{L^2}=\|\xi\hat u\|_{L^2}$.` },
      { id: 'x-chapeau', kind: 'egalite', distractor: true, text: t`$\|u'\|_{L^2}=\|(\hat u)'\|_{L^2}$ dès que les deux membres sont finis.` },
      { id: 'x-2pi', kind: 'egalite', distractor: true, after: ['cn-pp'], text: t`$\|u'\|_{L^2}=2\pi\,\|\xi\hat u\|_{L^2}$.` },
    ],
    justifications: [
      { id: 'j-planch', label: 'Théorème de Plancherel.', theorem: 'plancherel' },
      { id: 'j-dual', label: t`Inversion de Fourier sur $\mathcal S(\mathbb R)$, transportée à $\mathcal S'(\mathbb R)$ par dualité ; les deux définitions coïncident sur $L^2$ par densité de $\mathcal S$.` },
      { id: 'j-fct', label: t`$\hat u\in L^2$ par Plancherel, et $\xi\hat u$ est de carré intégrable sur tout compact.` },
      { id: 'j-isom', label: t`Unitarité de $\mathcal F$, appliquée à $u'\in L^2(\mathbb R)$.` },
      { id: 'j-loc', label: t`Deux fonctions localement intégrables égales dans $\mathcal S'(\mathbb R)$ coïncident presque partout.` },
      { id: 'j-module', label: t`$|i|=1$ : $\|\xi\hat u\|_{L^2}=\|\widehat{u'}\|_{L^2}$.` },
      { id: 'j-inverse', label: t`Surjectivité et unitarité de $\mathcal F$ sur $L^2(\mathbb R)$, appliquées à $i\xi\hat u\in L^2$.` },
      { id: 'j-compare', label: t`Comparaison de $\hat v=i\xi\hat u$ avec l'identité $\widehat{u'}=i\xi\hat u$.` },
      { id: 'j-inj', label: t`Injectivité de $\mathcal F$ sur $\mathcal S'(\mathbb R)$.` },
      { id: 'j-report', label: t`Report de $u'=v$ dans l'égalité des normes.` },
      { id: 'j-calc-ex', label: t`Calcul explicite : $\hat w(\xi)=(2\pi)^{-1/2}\int_0^1e^{-ix\xi}\,dx$, et dérivée de $w$ testée contre $\varphi\in\mathcal S(\mathbb R)$.` },
      { id: 'j-syn', label: 'Réunion des deux implications et de l’exemple.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-inj-L2', label: t`$\mathcal F$ est injective sur $L^2(\mathbb R)$.` },
      { id: 'j-ponctuel', label: t`L'égalité $\widehat{u'}=i\xi\hat u$ vaut en tout point, puisque $u\in L^2(\mathbb R)$.` },
    ],
    rules: [
      { from: [], to: 't-iso', by: 'j-planch' },
      { from: ['h-u'], to: 't-der', by: 'j-planch' },
      { from: ['t-iso'], to: 't-inj', by: 'j-dual' },
      { from: ['h-u', 't-iso'], to: 's-fct', by: 'j-fct' },

      { from: ['d-cn', 't-iso'], to: 'cn-planch', by: 'j-isom' },
      { from: ['cn-planch', 't-der', 's-fct'], to: 'cn-pp', by: 'j-loc' },
      { from: ['cn-planch', 'cn-pp'], to: 'cn-fin', by: 'j-module' },

      { from: ['d-cs', 't-iso'], to: 'cs-v', by: 'j-inverse' },
      { from: ['cs-v', 't-der'], to: 'cs-eq', by: 'j-compare' },
      { from: ['cs-eq', 't-inj'], to: 'cs-inj', by: 'j-inj' },
      { from: ['cs-inj', 'cs-v'], to: 'cs-fin', by: 'j-report' },

      { from: [], to: 'c-ex', by: 'j-calc-ex' },
      { from: ['cn-fin', 'cs-fin', 'c-ex'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'cs-inj',
        by: 'j-inj-L2',
        verdict: 'incorrect',
        concept: 'plancherel-cadre-identite',
        message: t`À ce stade, $u'$ n'est qu'une distribution tempérée : l'injectivité de $\mathcal F$ sur $L^2$ ne s'applique pas à elle, puisque $u'\in L^2$ est précisément ce qu'on cherche à établir. C'est l'injectivité sur $\mathcal S'$ qui conclut.`,
      },
      {
        conclusion: 'cn-pp',
        by: 'j-ponctuel',
        verdict: 'incorrect',
        concept: 'plancherel-cadre-identite',
        message: t`Pour $u\in L^2$, $\hat u$ n'est définie que presque partout, et l'identité $\widehat{u'}=i\xi\hat u$ vit dans $\mathcal S'$ : on n'en tire qu'une égalité presque partout, après avoir vérifié que les deux membres sont des fonctions localement intégrables.`,
      },
      {
        conclusion: 'x-sansH',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`L'unitarité porte sur $u$, pas sur $u'$ : sans l'hypothèse $u'\in L^2$, la distribution $\widehat{u'}=i\xi\hat u$ peut ne pas être de carré intégrable.`,
        counterexample: t`$w=\mathbb 1_{]0,1[}$ : $|\xi\hat w(\xi)|^2=\frac{2-2\cos\xi}{2\pi}$ n'est pas intégrable sur $\mathbb R$, et $w'=\delta_0-\delta_1$.`,
      },
      {
        conclusion: 'x-chapeau',
        verdict: 'incorrect',
        concept: 'plancherel-derivee-transformee',
        message: t`$(\hat u)'=-i\,\widehat{xu}$, donc $\|(\hat u)'\|_{L^2}=\|xu\|_{L^2}$ : la dérivée de $\hat u$ mesure la multiplication par $x$, non la dérivation.`,
        counterexample: t`$u(x)=e^{-x^2}$ : $u'=-2xu$, donc $\|u'\|_{L^2}=2\|xu\|_{L^2}=2\|(\hat u)'\|_{L^2}\neq\|(\hat u)'\|_{L^2}$.`,
      },
      {
        conclusion: 'x-2pi',
        verdict: 'incorrect',
        concept: 'plancherel-convention',
        message: t`Avec la convention unitaire, $\mathcal F$ est une isométrie de $L^2$ et $\widehat{u'}=i\xi\hat u$ : aucune constante n'apparaît.`,
        counterexample: t`$u(x)=e^{-x^2/2}$ : $\|u'\|^2_{L^2}=\int_{\mathbb R} x^2e^{-x^2}dx=\frac{\sqrt\pi}{2}=\int_{\mathbb R}\xi^2e^{-\xi^2}d\xi=\|\xi\hat u\|^2_{L^2}$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'd-cn',
        label: t`Retirer l'hypothèse $u'\in L^2(\mathbb R)$`,
        necessary: true,
        explanation: t`Sans elle, $\widehat{u'}$ n'est qu'une distribution tempérée et l'unitarité de $\mathcal F$ ne s'applique pas : le sens direct tombe.`,
        counterexample: t`$w=\mathbb 1_{]0,1[}\in L^2(\mathbb R)$ : $w'=\delta_0-\delta_1\notin L^2(\mathbb R)$ et $\xi\hat w\notin L^2(\mathbb R)$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Pour $u(x)=e^{-x^2/2}$, valeur exacte de $\|u'\|^2_{L^2}/\|u\|^2_{L^2}$.`, expected: '1/2' }],
  solution: t`**Deux outils de Plancherel.** $\mathcal F$ est unitaire sur $L^2(\mathbb R)$, et $\widehat{u'}=i\xi\hat u$ dans $\mathcal S'(\mathbb R)$. Comme $\hat u\in L^2$, la fonction $i\xi\hat u$ est localement intégrable : c'est elle qui représente la distribution $i\xi\hat u$. Enfin $\mathcal F$ est injective sur $\mathcal S'$ (inversion sur $\mathcal S$, transportée par dualité).

**Sens direct.** Si $u'\in L^2$, alors $\widehat{u'}\in L^2$ et $\|\widehat{u'}\|_{L^2}=\|u'\|_{L^2}$. Les deux fonctions localement intégrables $\widehat{u'}$ et $i\xi\hat u$ sont égales dans $\mathcal S'$, donc presque partout. Ainsi $\xi\hat u\in L^2$ et $\|\xi\hat u\|_{L^2}=\|u'\|_{L^2}$.

**Réciproque.** Si $\xi\hat u\in L^2$, on pose $v=\mathcal F^{-1}(i\xi\hat u)\in L^2$. Alors $\hat v=i\xi\hat u=\widehat{u'}$ dans $\mathcal S'$, et l'injectivité de $\mathcal F$ sur $\mathcal S'$ donne $u'=v\in L^2$, avec $\|u'\|_{L^2}=\|v\|_{L^2}=\|\xi\hat u\|_{L^2}$. L'injectivité sur $L^2$ ne suffirait pas : on ne sait pas encore que $u'\in L^2$.

**L'hypothèse $u\in L^2$ ne suffit pas.** Pour $w=\mathbb 1_{]0,1[}$ : $\hat w(\xi)=(2\pi)^{-1/2}\frac{1-e^{-i\xi}}{i\xi}$, donc $2\pi|\xi\hat w(\xi)|^2=2-2\cos\xi$, fonction périodique non nulle, non intégrable sur $\mathbb R$. De même $w'=\delta_0-\delta_1\notin L^2$.

**Exemple.** Pour $u=e^{-x^2/2}$ : $\|u'\|^2_{L^2}=\frac{\sqrt\pi}{2}$ et $\|u\|^2_{L^2}=\sqrt\pi$, de rapport $\frac12$, en accord avec $\|\xi\hat u\|^2_{L^2}=\int\xi^2e^{-\xi^2}d\xi$.`,
  steps: [
    t`Rassembler l'unitarité sur $L^2$ et l'identité $\widehat{u'}=i\xi\hat u$ dans $\mathcal S'$.`,
    t`Sens direct : Plancherel appliqué à $u'$, puis égalité presque partout.`,
    t`Réciproque : construire $v=\mathcal F^{-1}(i\xi\hat u)$ et identifier $u'=v$ par injectivité sur $\mathcal S'$.`,
    t`Exhiber un $u\in L^2$ tel que $\xi\hat u\notin L^2$.`,
  ],
  commonErrors: [
    { id: 'e-sans-hyp', description: t`Écrire $\|u'\|_{L^2}=\|\xi\hat u\|_{L^2}$ pour tout $u\in L^2$, sans hypothèse sur $u'$.`, concept: 'hypotheses-theoreme' },
    { id: 'e-inj', description: t`Invoquer l'injectivité de $\mathcal F$ sur $L^2$ pour un objet dont on ignore encore s'il est dans $L^2$.`, concept: 'plancherel-cadre-identite' },
    { id: 'e-chapeau', description: t`Remplacer $\xi\hat u$ par $(\hat u)'$.`, concept: 'plancherel-derivee-transformee' },
  ],
  hints: [
    t`Quelles sont les « bonnes hypothèses » : sur quel espace l'isométrie de Plancherel s'applique-t-elle, et à quel objet veux-tu l'appliquer ?`,
    t`Traite séparément les deux implications. Dans le sens réciproque, fabrique un candidat dans $L^2$ à partir de $i\xi\hat u$.`,
    t`Réciproque : $v=\mathcal F^{-1}(i\xi\hat u)$ vérifie $\hat v=\widehat{u'}$ dans $\mathcal S'$, et $\mathcal F$ est injective sur $\mathcal S'$. Pour l'exemple, calcule la transformée de $\mathbb 1_{]0,1[}$.`,
  ],
  rubric: rubric({
    hypotheses: t`Le cadre est explicite : $u\in L^2$, dérivée dans $\mathcal S'$, et l'hypothèse $u'\in L^2$ ou $\xi\hat u\in L^2$ selon le sens.`,
    methode: 'Les deux implications sont traitées séparément, avec un contre-exemple pour l’hypothèse insuffisante.',
    validite: 'Les égalités de distributions sont converties en égalités presque partout à bon escient.',
    justifications: t`L'injectivité est utilisée sur $\mathcal S'$, et non sur $L^2$.`,
    conclusion: t`L'équivalence, l'égalité des normes et l'exemple $\mathbb 1_{]0,1[}$ sont obtenus.`,
  }),
  variant: {
    statement: t`Soit $u\in L^2(\mathbb R^d)$. Montrer que $\nabla u\in L^2(\mathbb R^d)^d$ si et seulement si $|\xi|\hat u\in L^2(\mathbb R^d)$, et qu'alors $\|\nabla u\|^2_{L^2}=\int_{\mathbb R^d}|\xi|^2|\hat u(\xi)|^2\,d\xi$.`,
    solution: t`Pour chaque $j$, $\widehat{\partial_ju}=i\xi_j\hat u$ dans $\mathcal S'(\mathbb R^d)$. Le raisonnement de l'exercice, appliqué à chaque $\partial_ju$, montre que $\partial_ju\in L^2$ si et seulement si $\xi_j\hat u\in L^2$, avec $\|\partial_ju\|_{L^2}=\|\xi_j\hat u\|_{L^2}$. Comme $|\xi|^2=\sum_j\xi_j^2$, on a $|\xi|\hat u\in L^2$ si et seulement si chaque $\xi_j\hat u\in L^2$, et en sommant : $\|\nabla u\|^2_{L^2}=\sum_j\|\xi_j\hat u\|^2_{L^2}=\int|\xi|^2|\hat u|^2\,d\xi$.`,
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'plancherel.difficile',
  theoremId: 'plancherel',
  level: 'difficile',
  title: t`Résoudre $(I-\Delta)u=f$ et caractériser $H^2(\mathbb R^d)$`,
  statement: t`Soit $f\in L^2(\mathbb R^d)$. Montrer que l'équation $(I-\Delta)u=f$ admet une unique solution $u\in\mathcal S'(\mathbb R^d)$, donnée par $\hat u=(1+|\xi|^2)^{-1}\hat f$, que $u\in H^2(\mathbb R^d)$ et que $\|u\|_{H^2}=\|f\|_{L^2}$, où $\|v\|_{H^2}=\|(1+|\xi|^2)\hat v\|_{L^2}$. En déduire que, pour $v\in\mathcal S'(\mathbb R^d)$, on a $v\in H^2(\mathbb R^d)$ si et seulement si $(I-\Delta)v\in L^2(\mathbb R^d)$.`,
  source: poly(40, 'Exercice 15, difficile ; sections 4.1 et 4.2 (p. PDF 17)'),
  prerequisites: [],
  concepts: ['plancherel-symbole-nul', 'plancherel-cadre-identite', 'plancherel-convention', 'existence-unicite'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-f', kind: 'hypothese', text: t`$f\in L^2(\mathbb R^d)$.` },
      { id: 'd-Hs', kind: 'definition', text: t`$H^2(\mathbb R^d)=\{v\in\mathcal S'(\mathbb R^d) : (1+|\xi|^2)\hat v\in L^2(\mathbb R^d)\}$, normé par $\|v\|_{H^2}=\|(1+|\xi|^2)\hat v\|_{L^2}$.` },
      { id: 'd-m', kind: 'definition', text: t`$m(\xi)=(1+|\xi|^2)^{-1}$ pour $\xi\in\mathbb R^d$.` },

      { id: 't-iso', kind: 'application-theoreme', text: t`$\mathcal F$ est un isomorphisme unitaire de $L^2(\mathbb R^d)$.` },
      { id: 't-der', kind: 'application-theoreme', text: t`Pour $v\in\mathcal S'(\mathbb R^d)$ et $1\le j\le d$ : $\widehat{\partial_jv}=i\xi_j\hat v$ dans $\mathcal S'(\mathbb R^d)$.` },
      { id: 't-Sp', kind: 'consequence', text: t`$\mathcal F$ est une bijection de $\mathcal S'(\mathbb R^d)$ sur lui-même ; pour $v\in\mathcal S'$, on a $v\in L^2\iff\hat v\in L^2$, et alors $\|\hat v\|_{L^2}=\|v\|_{L^2}$.` },
      {
        id: 'e-sym',
        kind: 'egalite',
        text: t`Pour $v\in\mathcal S'(\mathbb R^d)$ : $\widehat{(I-\Delta)v}=(1+|\xi|^2)\,\hat v$ dans $\mathcal S'(\mathbb R^d)$.`,
        masked: t`Symbole de $I-\Delta$ : à déterminer.`,
        check: { kind: 'expr-equiv', prompt: t`Symbole de $I-\Delta$ en fonction de $r=|\xi|$ (écrire r).`, expected: '1+r^2', vars: ['r'] },
      },
      { id: 's-mult', kind: 'consequence', text: t`$m$ est $C^\infty$, bornée ainsi que toutes ses dérivées : la multiplication par $m$ opère sur $\mathcal S'(\mathbb R^d)$, et c'est l'inverse de la multiplication par $1+|\xi|^2$.` },
      { id: 'eq1', kind: 'consequence', text: t`Pour $v\in\mathcal S'(\mathbb R^d)$ : $(I-\Delta)v=f$ si et seulement si $(1+|\xi|^2)\,\hat v=\hat f$ dans $\mathcal S'(\mathbb R^d)$.` },
      { id: 'eq2', kind: 'consequence', text: t`Pour $v\in\mathcal S'(\mathbb R^d)$ : $(I-\Delta)v=f$ si et seulement si $\hat v=m\hat f$.` },
      { id: 'exu', kind: 'consequence', text: t`Il existe une unique $u\in\mathcal S'(\mathbb R^d)$ telle que $(I-\Delta)u=f$ : c'est $u=\mathcal F^{-1}(m\hat f)$.` },
      { id: 'reg', kind: 'consequence', text: t`$(1+|\xi|^2)\,\hat u=\hat f\in L^2(\mathbb R^d)$, donc $u\in H^2(\mathbb R^d)$.` },
      { id: 'nrm', kind: 'egalite', text: t`$\|u\|_{H^2}=\|f\|_{L^2}$.` },
      { id: 'car', kind: 'consequence', text: t`Pour $v\in\mathcal S'(\mathbb R^d)$ : $v\in H^2(\mathbb R^d)$ si et seulement si $(I-\Delta)v\in L^2(\mathbb R^d)$, et alors $\|v\|_{H^2}=\|(I-\Delta)v\|_{L^2}$.` },
      { id: 'fin', kind: 'conclusion', text: t`$(I-\Delta)u=f$ a une unique solution $u\in\mathcal S'(\mathbb R^d)$, donnée par $\hat u=(1+|\xi|^2)^{-1}\hat f$ ; elle appartient à $H^2(\mathbb R^d)$ et $\|u\|_{H^2}=\|f\|_{L^2}$. Ainsi $I-\Delta$ est une isométrie bijective de $H^2(\mathbb R^d)$ sur $L^2(\mathbb R^d)$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-sgn', kind: 'egalite', distractor: true, text: t`Pour $v\in\mathcal S'(\mathbb R^d)$ : $\widehat{(I-\Delta)v}=(1-|\xi|^2)\,\hat v$.` },
      { id: 'x-dprime', kind: 'consequence', distractor: true, after: ['exu'], text: t`L'unicité vaut aussi dans $\mathcal D'(\mathbb R^d)$ : si $(I-\Delta)v=0$ dans $\mathcal D'(\mathbb R^d)$, alors $v=0$.` },
      { id: 'x-laplacien', kind: 'consequence', distractor: true, after: ['exu'], text: t`Le même raisonnement donne, pour tout $f\in L^2(\mathbb R^d)$, une unique solution $u\in\mathcal S'(\mathbb R^d)$ de $-\Delta u=f$, donnée par $\hat u=|\xi|^{-2}\hat f$.` },
      { id: 'x-norm-H1', kind: 'egalite', distractor: true, after: ['nrm'], text: t`$\|u\|_{H^1}=\|f\|_{L^2}$.` },
    ],
    justifications: [
      { id: 'j-planch', label: 'Théorème de Plancherel.', theorem: 'plancherel' },
      { id: 'j-dual', label: t`Inversion de Fourier sur $\mathcal S$, transportée à $\mathcal S'$ par dualité ; coïncidence avec le prolongement unitaire sur $L^2$.` },
      { id: 'j-carres', label: t`$\widehat{\partial_j^2v}=(i\xi_j)^2\hat v=-\xi_j^2\hat v$, puis sommation sur $j$.` },
      { id: 'j-multiplicateur', label: t`$1+|\xi|^2\ge 1$ ne s'annule pas, et chaque dérivée de $m$ est une fraction rationnelle bornée.` },
      { id: 'j-transforme', label: t`Application de $\mathcal F$, bijective sur $\mathcal S'$, aux deux membres de l'équation.` },
      { id: 'j-divise', label: t`Multiplication par $m$, et réciproquement par $1+|\xi|^2$, dans $\mathcal S'(\mathbb R^d)$.` },
      { id: 'j-bijection', label: t`$\hat v$ est imposée : existence et unicité découlent de la bijectivité de $\mathcal F$ sur $\mathcal S'$.` },
      { id: 'j-def-H2', label: t`$\hat u=m\hat f$ et $\hat f\in L^2$ par Plancherel, puis définition de $H^2$.` },
      { id: 'j-norme', label: t`Définition de la norme de $H^2$ et unitarité de $\mathcal F$.` },
      { id: 'j-carac', label: t`Définition de $H^2$, symbole de $I-\Delta$, et équivalence $w\in L^2\iff\hat w\in L^2$ pour $w\in\mathcal S'$.` },
      { id: 'j-syn', label: 'Réunion : existence, unicité, régularité, égalité des normes.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-m-bornee', label: t`$m$ est bornée : cela suffit pour multiplier une distribution tempérée par $m$.` },
      { id: 'j-L2-suffit', label: t`$\hat u=m\hat f\in L^2$, donc $u\in L^2$, donc $u\in H^2$.` },
      { id: 'j-evident', label: t`C'est le même calcul que dans $L^2$.` },
    ],
    rules: [
      { from: [], to: 't-iso', by: 'j-planch' },
      { from: [], to: 't-der', by: 'j-planch' },
      { from: ['t-iso'], to: 't-Sp', by: 'j-dual' },
      { from: ['t-der'], to: 'e-sym', by: 'j-carres' },
      { from: ['d-m'], to: 's-mult', by: 'j-multiplicateur' },
      { from: ['e-sym', 't-Sp', 'h-f'], to: 'eq1', by: 'j-transforme' },
      { from: ['eq1', 's-mult'], to: 'eq2', by: 'j-divise' },
      { from: ['eq2', 't-Sp'], to: 'exu', by: 'j-bijection' },
      { from: ['exu', 'h-f', 't-Sp', 'd-Hs'], to: 'reg', by: 'j-def-H2' },
      { from: ['reg', 't-Sp', 'd-Hs'], to: 'nrm', by: 'j-norme' },
      { from: ['e-sym', 't-Sp', 'd-Hs'], to: 'car', by: 'j-carac' },
      { from: ['exu', 'reg', 'nrm', 'car'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 's-mult',
        by: 'j-m-bornee',
        verdict: 'incorrect',
        concept: 'plancherel-cadre-identite',
        message: t`Une fonction bornée ne multiplie pas une distribution tempérée en général : il faut un multiplicateur $C^\infty$ dont toutes les dérivées sont à croissance polynomiale. C'est le cas de $m$, mais pour une autre raison que sa bornitude.`,
        counterexample: t`La fonction $\operatorname{sign}$ est bornée, et le produit $\operatorname{sign}\cdot\delta_0$ n'a pas de sens.`,
      },
      {
        conclusion: 'reg',
        by: 'j-L2-suffit',
        verdict: 'incorrect',
        concept: 'plancherel-cadre-identite',
        message: t`$u\in L^2$ ne donne pas $u\in H^2$ : il faut que $(1+|\xi|^2)\hat u$ soit de carré intégrable, ce que fournit l'équation elle-même.`,
        counterexample: t`$v=\mathbb 1_{]0,1[}\in L^2(\mathbb R)$ n'est pas dans $H^2(\mathbb R)$ : $|\xi\hat v(\xi)|^2=\frac{2-2\cos\xi}{2\pi}$ n'est déjà pas intégrable.`,
      },
      {
        conclusion: 'exu',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'existence-unicite',
        message: t`L'unicité dépend de l'espace : elle tient dans $\mathcal S'$ parce que le symbole $1+|\xi|^2$ ne s'annule pas et que $\mathcal F$ est bijective sur $\mathcal S'$.`,
      },
      {
        conclusion: 'x-sgn',
        verdict: 'incorrect',
        concept: 'plancherel-convention',
        message: t`$(i\xi_j)^2=-\xi_j^2$ : la transformée de $\Delta v$ est $-|\xi|^2\hat v$, et celle de $(I-\Delta)v$ est $(1+|\xi|^2)\hat v$.`,
        counterexample: t`Pour $d=1$ et $v=e^{-x^2/2}$ : $v-v''=(2-x^2)e^{-x^2/2}$, dont la transformée est $(1+\xi^2)e^{-\xi^2/2}$, et non $(1-\xi^2)e^{-\xi^2/2}$.`,
      },
      {
        conclusion: 'x-dprime',
        verdict: 'incorrect',
        concept: 'plancherel-cadre-identite',
        message: t`L'argument de Fourier ne vaut que dans $\mathcal S'$ : hors des distributions tempérées, $I-\Delta$ a un noyau non trivial.`,
        counterexample: t`$v(x)=e^{x_1}$ vérifie $\Delta v=v$, donc $(I-\Delta)v=0$ avec $v\neq 0$ ; $v$ n'est pas tempérée.`,
      },
      {
        conclusion: 'x-laplacien',
        verdict: 'incorrect',
        concept: 'plancherel-symbole-nul',
        message: t`Le symbole $|\xi|^2$ de $-\Delta$ s'annule en $0$ : on ne peut pas diviser par lui dans $\mathcal S'$, et l'unicité tombe.`,
        counterexample: t`La constante $1\in\mathcal S'(\mathbb R^d)$ vérifie $-\Delta 1=0$ : si $u$ est solution, $u+1$ l'est aussi.`,
      },
      {
        conclusion: 'x-norm-H1',
        verdict: 'incorrect',
        concept: 'plancherel-cadre-identite',
        message: t`$\|u\|^2_{H^1}=\int(1+|\xi|^2)\,m(\xi)^2|\hat f(\xi)|^2\,d\xi=\int\frac{|\hat f(\xi)|^2}{1+|\xi|^2}\,d\xi$ : c'est le carré de la norme de $f$ dans $H^{-1}$, strictement inférieur à $\|f\|^2_{L^2}$ dès que $f\neq 0$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-f',
        label: t`Retirer $f\in L^2(\mathbb R^d)$`,
        necessary: true,
        explanation: t`Pour $f\in\mathcal S'$, l'unique solution tempérée existe encore, mais la régularité $H^2$ est perdue.`,
        counterexample: t`Pour $d=1$ et $f=\delta_0$ : $u=\tfrac12 e^{-|x|}$, avec $\hat u=(2\pi)^{-1/2}(1+\xi^2)^{-1}$ ; $u\in H^1(\mathbb R)$ mais $u\notin H^2(\mathbb R)$, car $\int(1+\xi^2)^2|\hat u|^2\,d\xi=+\infty$.`,
      },
      {
        hypothesis: 's-mult',
        label: 'Ne plus pouvoir diviser par le symbole',
        necessary: true,
        explanation: t`La division par $1+|\xi|^2$ dans $\mathcal S'$ fournit à la fois l'existence et l'unicité.`,
        counterexample: t`Pour $-\Delta$, de symbole $|\xi|^2$ nul en $0$, la division est impossible et l'unicité échoue dans $\mathcal S'$ : $-\Delta 1=0$.`,
      },
    ],
  },
  closedChecks: [
    {
      kind: 'rational',
      prompt: t`Meilleure constante $c$ telle que $\|\nabla u\|_{L^2}\le c\,\|f\|_{L^2}$ pour la solution de $(I-\Delta)u=f$, c'est-à-dire $\sup_{\xi}\frac{|\xi|}{1+|\xi|^2}$.`,
      expected: '1/2',
    },
  ],
  solution: t`**Passage en Fourier.** Pour $v\in\mathcal S'(\mathbb R^d)$, Plancherel dans $\mathcal S'$ donne $\widehat{\partial_j^2v}=(i\xi_j)^2\hat v=-\xi_j^2\hat v$, donc $\widehat{(I-\Delta)v}=(1+|\xi|^2)\hat v$. Comme $\mathcal F$ est une bijection de $\mathcal S'$, l'équation $(I-\Delta)v=f$ équivaut à $(1+|\xi|^2)\hat v=\hat f$ dans $\mathcal S'$.

**Division par le symbole.** $m=(1+|\xi|^2)^{-1}$ est $C^\infty$, bornée ainsi que toutes ses dérivées : la multiplication par $m$ est définie sur $\mathcal S'$ et inverse celle par $1+|\xi|^2$. L'équation équivaut donc à $\hat v=m\hat f$ : il existe une unique solution tempérée, $u=\mathcal F^{-1}(m\hat f)$. La bornitude de $m$ ne suffirait pas : c'est sa régularité qui autorise le produit avec une distribution tempérée.

**Régularité et norme.** $(1+|\xi|^2)\hat u=\hat f\in L^2$, donc $u\in H^2(\mathbb R^d)$ et $\|u\|_{H^2}=\|\hat f\|_{L^2}=\|f\|_{L^2}$.

**Caractérisation.** Pour $v\in\mathcal S'$ : $v\in H^2\iff(1+|\xi|^2)\hat v\in L^2\iff\widehat{(I-\Delta)v}\in L^2\iff(I-\Delta)v\in L^2$, avec $\|v\|_{H^2}=\|(I-\Delta)v\|_{L^2}$. Ainsi $I-\Delta:H^2\to L^2$ est une isométrie bijective.

**Estimations.** $\|u\|_{L^2}\le\|f\|_{L^2}$, $\|\Delta u\|_{L^2}\le\|f\|_{L^2}$, et $\|\nabla u\|_{L^2}\le\frac12\|f\|_{L^2}$, car $\sup_\xi\frac{|\xi|}{1+|\xi|^2}=\frac12$, atteint en $|\xi|=1$. Cette constante $\frac12$ est la meilleure : pour $\hat f=\mathbb 1_{\{1-\varepsilon<|\xi|<1+\varepsilon\}}$ avec $0<\varepsilon<1$, $\|\nabla u\|_{L^2}^2=\int\frac{|\xi|^2}{(1+|\xi|^2)^2}|\hat f|^2\,d\xi\ge\min_{|r-1|\le\varepsilon}\frac{r^2}{(1+r^2)^2}\,\|f\|_{L^2}^2$, et ce minimum tend vers $\frac14$ quand $\varepsilon\to 0$.

**Points de vigilance.** L'unicité est fausse dans $\mathcal D'$ : $e^{x_1}$ annule $I-\Delta$. Pour $-\Delta$, le symbole s'annule en $0$ et l'unicité échoue déjà dans $\mathcal S'$ (les constantes). Si $f=\delta_0$ et $d=1$, la solution $\frac12e^{-|x|}$ est dans $H^1$ mais pas dans $H^2$.`,
  steps: [
    t`Calculer le symbole de $I-\Delta$ à partir de $\widehat{\partial_jv}=i\xi_j\hat v$ dans $\mathcal S'$.`,
    t`Justifier la division par $1+|\xi|^2$ dans $\mathcal S'$.`,
    t`En déduire existence et unicité dans $\mathcal S'$.`,
    t`Lire la régularité $H^2$ et l'égalité des normes sur $(1+|\xi|^2)\hat u=\hat f$.`,
    t`Caractériser $H^2$ par $(I-\Delta)v\in L^2$.`,
  ],
  commonErrors: [
    { id: 'e-signe', description: t`Écrire le symbole $1-|\xi|^2$ en oubliant que $(i\xi_j)^2=-\xi_j^2$.`, concept: 'plancherel-convention' },
    { id: 'e-unicite', description: t`Affirmer l'unicité sans préciser l'espace : elle est fausse dans $\mathcal D'$.`, concept: 'plancherel-cadre-identite' },
    { id: 'e-laplacien', description: t`Transposer le raisonnement à $-\Delta$, dont le symbole s'annule.`, concept: 'plancherel-symbole-nul' },
    { id: 'e-regularite', description: t`Déduire $u\in H^2$ de la seule appartenance $u\in L^2$.`, concept: 'existence-unicite' },
  ],
  hints: [
    t`Que devient l'opérateur $I-\Delta$ après transformée de Fourier, et dans quel espace l'identité obtenue a-t-elle lieu ?`,
    t`Divise par le symbole : il faut justifier que cette division est licite dans $\mathcal S'$, puis lire l'appartenance à $H^2$ sur la définition par poids.`,
    t`$\widehat{(I-\Delta)v}=(1+|\xi|^2)\hat v$, et $m=(1+|\xi|^2)^{-1}$ est $C^\infty$ à dérivées bornées. Ensuite, $(1+|\xi|^2)\hat u=\hat f$ est exactement la condition définissant $H^2$.`,
  ],
  rubric: rubric({
    hypotheses: t`$f\in L^2$ est utilisée pour la régularité, et l'espace de l'unicité est précisé.`,
    methode: 'Transformée de Fourier, division par un symbole qui ne s’annule pas, lecture de la régularité sur les poids.',
    validite: t`Symbole correct, et division justifiée dans $\mathcal S'$ par la régularité de $m$.`,
    justifications: t`Existence, unicité et régularité sont établies séparément ; les contre-exemples ($\mathcal D'$, $-\Delta$) sont identifiés.`,
    conclusion: t`$u\in H^2$, $\|u\|_{H^2}=\|f\|_{L^2}$, et la caractérisation de $H^2$ est obtenue.`,
  }),
  variant: {
    statement: t`Soient $\lambda>0$ et $f\in L^2(\mathbb R^d)$. Montrer que $(\lambda I-\Delta)u=f$ admet une unique solution $u\in\mathcal S'(\mathbb R^d)$, que $u\in H^2(\mathbb R^d)$, et que $\|u\|_{L^2}\le\lambda^{-1}\|f\|_{L^2}$ et $\|\Delta u\|_{L^2}\le\|f\|_{L^2}$.`,
    solution: t`Le symbole vaut $\lambda+|\xi|^2\ge\lambda>0$ ; $(\lambda+|\xi|^2)^{-1}$ est $C^\infty$ à dérivées bornées, d'où l'existence et l'unicité dans $\mathcal S'$ de $u$ avec $\hat u=(\lambda+|\xi|^2)^{-1}\hat f$. Comme $\frac{1+|\xi|^2}{\lambda+|\xi|^2}\le\max(1,\lambda^{-1})$, on a $(1+|\xi|^2)\hat u\in L^2$, donc $u\in H^2$. Enfin $(\lambda+|\xi|^2)^{-1}\le\lambda^{-1}$ et $\frac{|\xi|^2}{\lambda+|\xi|^2}\le 1$ donnent les deux estimations, par Plancherel. La constante $\lambda^{-1}$ est optimale : pour $\hat f=\mathbb 1_{\{|\xi|<\varepsilon\}}$, on a $\|u\|_{L^2}\ge(\lambda+\varepsilon^2)^{-1}\|f\|_{L^2}$, et $(\lambda+\varepsilon^2)^{-1}\to\lambda^{-1}$ quand $\varepsilon\to 0$.`,
    closedChecks: [{ kind: 'rational', prompt: t`Pour $\lambda=4$ : meilleure constante $c$ telle que $\|u\|_{L^2}\le c\,\|f\|_{L^2}$.`, expected: '1/4' }],
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT15: TheoremModule = {
  theorem: {
    id: 'plancherel',
    spaces: [
      t`$\mathcal S(\mathbb R^d)$ : fonctions $C^\infty$ dont toutes les dérivées décroissent plus vite que toute puissance.`,
      t`$\mathcal S'(\mathbb R^d)$ : dual continu de $\mathcal S(\mathbb R^d)$, espace des distributions tempérées.`,
      t`$L^2(\mathbb R^d)$, muni de son produit scalaire usuel ; $L^2(\mathbb R^d)\subset\mathcal S'(\mathbb R^d)$.`,
      t`Convention unitaire : $\hat u(\xi)=(2\pi)^{-d/2}\int_{\mathbb R^d}e^{-ix\cdot\xi}u(x)\,dx$, formule valable pour $u\in\mathcal S(\mathbb R^d)$ (plus généralement pour $u\in L^1$).`,
    ],
    hypotheses: [
      {
        id: 'h-convention',
        text: t`La transformée est normalisée par le facteur $(2\pi)^{-d/2}$ (convention unitaire du polycopié).`,
        whenRemoved: t`Avec $\mathcal F_0u(\xi)=\int e^{-ix\cdot\xi}u(x)\,dx$, on a $\|\mathcal F_0u\|_{L^2}=(2\pi)^{d/2}\|u\|_{L^2}$ : l'égalité des normes devient fausse.`,
      },
      {
        id: 'h-cadre',
        text: t`La formule intégrale définit $\hat u$ sur $\mathcal S(\mathbb R^d)$ ; sur $L^2(\mathbb R^d)$, $\mathcal F$ est le prolongement par densité ; sur $\mathcal S'(\mathbb R^d)$, elle se définit par dualité.`,
        whenRemoved: t`Pour $u(x)=(1+|x|)^{-3/4}$ sur $\mathbb R$, on a $u\in L^2\setminus L^1$, et l'intégrale définissant $\hat u(0)$ diverge : $\hat u$ ne peut être définie que par prolongement.`,
      },
    ],
    statement: t`La transformée de Fourier se prolonge en un isomorphisme unitaire $\mathcal F:L^2(\mathbb R^d)\to L^2(\mathbb R^d)$ tel que
$$\|\hat u\|_{L^2}=\|u\|_{L^2},\qquad \widehat{\partial_ju}=i\xi_j\,\hat u\quad\text{dans }\mathcal S'.$$`,
    conclusions: {
      existence: t`Le prolongement de $\mathcal F$ de $\mathcal S(\mathbb R^d)$ à $L^2(\mathbb R^d)$ existe, par densité de $\mathcal S$ dans $L^2$.`,
      unicite: t`Ce prolongement continu est unique, puisque $\mathcal S$ est dense dans $L^2$.`,
      stabilite: t`$\|\hat u\|_{L^2}=\|u\|_{L^2}$ : $\mathcal F$ est une isométrie bijective de $L^2(\mathbb R^d)$.`,
      autre: t`La dérivation devient la multiplication par $i\xi_j$, identité entre distributions tempérées.`,
    },
    sourceProof: 'idee',
    proofOutline: [
      t`Sur $\mathcal S(\mathbb R^d)$ : $\mathcal F$ est une bijection, d'inverse $\check v(x)=(2\pi)^{-d/2}\int e^{ix\cdot\xi}v(\xi)\,d\xi$ (formule d'inversion).`,
      t`Identité de Parseval sur $\mathcal S$ : $\int\hat u\,\overline{\hat v}=\int u\,\bar v$, d'où $\|\hat u\|_{L^2}=\|u\|_{L^2}$.`,
      t`Densité de $\mathcal S$ dans $L^2$ : $\mathcal F$ se prolonge en une isométrie de $L^2$, surjective car son image contient $\mathcal S$ et est fermée.`,
      t`Dérivation : sur $\mathcal S$ par intégration par parties ; sur $\mathcal S'$ par dualité, avec $\langle\hat T,\varphi\rangle=\langle T,\hat\varphi\rangle$.`,
    ],
    warnings: [
      t`Les constantes dépendent de la convention : avec la convention unitaire, ni l'isométrie ni la formule $\widehat{\partial_ju}=i\xi_j\hat u$ ne comportent de facteur $2\pi$.`,
      t`Pour $u\in L^2$, l'intégrale de définition peut diverger : $\hat u$ est une classe définie par prolongement, presque partout.`,
      t`$\widehat{u'}=i\xi\hat u$, alors que $(\hat u)'=-i\,\widehat{xu}$.`,
      t`L'identité $\widehat{\partial_ju}=i\xi_j\hat u$ vit dans $\mathcal S'$ : pour $u\in L^2$, $\xi_j\hat u$ n'est pas dans $L^2$ en général.`,
      t`L'unicité des solutions d'une équation à coefficients constants dépend de l'espace : $e^{x_1}$ annule $I-\Delta$ dans $\mathcal D'$.`,
    ],
    usefulFor: t`Transformer une équation linéaire à coefficients constants en multiplication par un symbole : $-\Delta$ devient la multiplication par $|\xi|^2$, $I-\Delta$ une isométrie de $H^2$ sur $L^2$, et les espaces $H^s$ se définissent par des poids.`,
    verification: FROM_POLY,
  },
  definitions: [
    {
      id: 'plancherel-schwartz',
      term: 'Espace de Schwartz',
      statement: t`$\mathcal S(\mathbb R^d)$ est l'espace des fonctions $C^\infty$ dont toutes les dérivées décroissent plus vite que toute puissance de $|x|$.`,
      source: poly(17, 'Vocabulaire, section 4.1'),
    },
    {
      id: 'plancherel-temperees',
      term: 'Distributions tempérées',
      statement: t`$\mathcal S'(\mathbb R^d)$ est le dual continu de $\mathcal S(\mathbb R^d)$ ; la transformée de Fourier s'y définit par $\langle\hat T,\varphi\rangle=\langle T,\hat\varphi\rangle$.`,
      source: poly(17, 'Vocabulaire, section 4.1'),
    },
    {
      id: 'plancherel-fourier-unitaire',
      term: 'Transformée de Fourier unitaire',
      statement: t`Pour $u\in\mathcal S(\mathbb R^d)$ : $\hat u(\xi)=(2\pi)^{-d/2}\int_{\mathbb R^d}e^{-ix\cdot\xi}u(x)\,dx$.`,
      source: poly(17, 'Section 4.1'),
    },
    {
      id: 'plancherel-sobolev-reel',
      term: 'Espace de Sobolev d’ordre réel',
      statement: t`Pour $s\in\mathbb R$ : $H^s(\mathbb R^d)=\{u\in\mathcal S'(\mathbb R^d) : (1+|\xi|^2)^{s/2}\hat u\in L^2(\mathbb R^d)\}$, de norme $\|u\|_{H^s}=\|(1+|\xi|^2)^{s/2}\hat u\|_{L^2}$ ; c'est un espace de Hilbert, isométrique à $L^2(\mathbb R^d)$.`,
      source: poly(17, 'Section 4.2'),
    },
    {
      id: 'plancherel-critere-dirac',
      term: 'Critère pour la distribution de Dirac',
      statement: t`$\hat\delta_0=(2\pi)^{-d/2}$, donc $\delta_0\in H^s(\mathbb R^d)$ si et seulement si $\int_{\mathbb R^d}(1+|\xi|^2)^s\,d\xi<+\infty$, c'est-à-dire $s<-d/2$.`,
      source: poly(18, 'Section 4.2'),
    },
  ],
  concepts: [
    {
      id: 'plancherel-convention',
      label: 'Convention de normalisation',
      reminder: t`Avec $\hat u(\xi)=(2\pi)^{-d/2}\int e^{-ix\cdot\xi}u(x)\,dx$ : $\|\hat u\|_{L^2}=\|u\|_{L^2}$ et $\widehat{\partial_ju}=i\xi_j\hat u$, sans facteur $2\pi$. Ces constantes changent avec la convention.`,
    },
    {
      id: 'plancherel-cadre-identite',
      label: 'Cadre d’une identité de Fourier',
      reminder: t`Une identité de Fourier vit sur un espace précis : intégrale sur $\mathcal S$ ou $L^1$, prolongement par densité sur $L^2$, dualité sur $\mathcal S'$. Une égalité dans $\mathcal S'$ entre fonctions localement intégrables n'est qu'une égalité presque partout.`,
    },
    {
      id: 'plancherel-derivee-transformee',
      label: 'Dérivée et transformée',
      reminder: t`$\widehat{u'}=i\xi\hat u$, alors que $(\hat u)'=-i\,\widehat{xu}$ : dériver avant ou après la transformée n'est pas la même opération.`,
    },
    {
      id: 'plancherel-symbole-nul',
      label: 'Symbole et unicité',
      reminder: t`Un opérateur à coefficients constants se résout dans $\mathcal S'$ par division par son symbole seulement si celui-ci ne s'annule pas ; le noyau de $-\Delta$ dans $\mathcal S'$ contient les polynômes harmoniques, dont les constantes.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-plancherel-l2-sans-derivee',
      theoremId: 'plancherel',
      title: t`$u\in L^2$ ne donne pas $\xi\hat u\in L^2$`,
      claim: t`Pour tout $u\in L^2(\mathbb R)$, on a $\xi\hat u\in L^2(\mathbb R)$ et $\|u'\|_{L^2}=\|\xi\hat u\|_{L^2}$.`,
      correctStatement: t`Pour $u\in L^2(\mathbb R)$ : $\xi\hat u\in L^2(\mathbb R)$ si et seulement si $u'\in L^2(\mathbb R)$, et alors $\|u'\|_{L^2}=\|\xi\hat u\|_{L^2}$.`,
      task: t`Pour $w=\mathbb 1_{]0,1[}$, on a $2\pi|\xi\hat w(\xi)|^2=|1-e^{-i\xi}|^2$. Donne la valeur de cette quantité en $\xi=\pi$ : elle est $2\pi$-périodique et non nulle, donc non intégrable sur $\mathbb R$.`,
      check: { kind: 'rational', prompt: t`Valeur de $|1-e^{-i\pi}|^2$`, expected: '4' },
      explanation: t`$\hat w(\xi)=(2\pi)^{-1/2}\int_0^1e^{-ix\xi}\,dx=(2\pi)^{-1/2}\frac{1-e^{-i\xi}}{i\xi}$, donc $2\pi|\xi\hat w(\xi)|^2=2-2\cos\xi$, qui vaut $4$ en $\xi=\pi$. Une fonction périodique non nulle n'est pas intégrable sur $\mathbb R$ : $\xi\hat w\notin L^2$. De fait $w'=\delta_0-\delta_1\notin L^2$.`,
      concept: 'hypotheses-theoreme',
      source: poly(40, 'Exercice 15, intermédiaire'),
    },
    {
      id: 'ce-plancherel-unicite-dprime',
      theoremId: 'plancherel',
      title: t`Unicité hors de $\mathcal S'$`,
      claim: t`Si $(I-\Delta)v=0$ dans $\mathcal D'(\mathbb R^d)$, alors $v=0$.`,
      correctStatement: t`L'unicité vaut dans $\mathcal S'(\mathbb R^d)$, où $\mathcal F$ transforme l'équation en $(1+|\xi|^2)\hat v=0$.`,
      task: t`Cherche $v(x)=e^{ax_1}$ avec $a>0$ solution de $(I-\Delta)v=0$ : donne $a$.`,
      check: { kind: 'rational', prompt: t`Valeur de $a$`, expected: '1' },
      explanation: t`$\Delta e^{ax_1}=a^2e^{ax_1}$, donc $(I-\Delta)e^{ax_1}=(1-a^2)e^{ax_1}$, nul pour $a=1$. La fonction $e^{x_1}$ n'est pas une distribution tempérée : elle échappe à l'argument de Fourier, qui ne prouve l'unicité que dans $\mathcal S'$.`,
      concept: 'plancherel-cadre-identite',
      source: poly(40, 'Exercice 15, difficile'),
    },
    {
      id: 'ce-plancherel-normalisation',
      theoremId: 'plancherel',
      title: 'Isométrie et normalisation',
      claim: t`Avec $\mathcal F_0u(\xi)=\int_{\mathbb R}e^{-ix\xi}u(x)\,dx$, on a $\|\mathcal F_0u\|_{L^2}=\|u\|_{L^2}$.`,
      correctStatement: t`L'isométrie vaut pour la convention unitaire $\hat u=(2\pi)^{-1/2}\mathcal F_0u$ en dimension $1$.`,
      task: t`Calcule le quotient $\|\mathcal F_0u\|^2_{L^2}/\big(\pi\,\|u\|^2_{L^2}\big)$ pour $u\in\mathcal S(\mathbb R)$ non nulle.`,
      check: { kind: 'rational', prompt: t`Valeur du quotient`, expected: '2' },
      explanation: t`$\mathcal F_0u=(2\pi)^{1/2}\hat u$, donc $\|\mathcal F_0u\|^2_{L^2}=2\pi\|\hat u\|^2_{L^2}=2\pi\|u\|^2_{L^2}$ par Plancherel ; le quotient vaut $2$.`,
      concept: 'plancherel-convention',
      source: poly(17, 'Section 4.1, convention unitaire'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT15;
