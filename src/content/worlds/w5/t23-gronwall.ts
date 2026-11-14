/**
 * Résultat 23 — Lemme de Grönwall (forme intégrale, p. PDF 22).
 * Démonstration complète dans le polycopié (logarithme, puis ε → 0 pour a = 0). L'exercice
 * intermédiaire la refait par facteur intégrant, qui traite a = 0 sans passage à la limite.
 * Les vérifications fermées portent sur des grandeurs rationnelles : on note E = e^{3t}.
 */
import { t, rubric, poly, complement, FROM_POLY, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'gronwall.facile',
  theoremId: 'gronwall',
  level: 'facile',
  title: t`Grönwall pour $y(t)\le 2+\int_0^t3y$`,
  statement: t`Soit $y:[0,1]\to[0,\infty[$ continue telle que $y(t)\le 2+\int_0^t3y(s)\,ds$ pour tout $t\in[0,1]$. Appliquer le lemme de Grönwall en identifiant $a$ et $b$, et établir $y(t)\le 2e^{3t}$. Montrer que cette majoration est atteinte, puis que l'implication n'est pas réversible : $y_1(t)=16t^2$ vérifie la majoration sans vérifier l'hypothèse.`,
  source: poly(42, 'Exercice 23, facile'),
  prerequisites: [],
  concepts: ['gronwall-reciproque', 'gronwall-signe', 'calcul-exact', 'hypotheses-theoreme'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-y', kind: 'hypothese', text: t`$y:[0,1]\to[0,\infty[$ est continue.` },
      { id: 'h-ineg', kind: 'hypothese', text: t`Pour tout $t\in[0,1]$ : $y(t)\le 2+\int_0^t3y(s)\,ds$.` },
      {
        id: 'id-ab',
        kind: 'egalite',
        text: t`$a=2\ge 0$ et $b\equiv 3$ : $b\in L^1(0,1)$ et $b\ge 0$.`,
        masked: t`Valeurs de $a$ et de $b$ : à identifier.`,
        check: { kind: 'rational-vector', prompt: t`Valeurs de $a$ et de la constante $b$`, expected: ['2', '3'], labels: ['a', 'b'] },
      },
      {
        id: 'int-b',
        kind: 'egalite',
        text: t`$\int_0^tb(s)\,ds=3t$ pour $t\in[0,1]$.`,
        masked: t`Valeur de $\int_0^tb(s)\,ds$ : à calculer.`,
        check: { kind: 'expr-equiv', prompt: t`Expression de $\int_0^tb(s)\,ds$ en fonction de $t$`, expected: '3*t', vars: ['t'] },
      },
      {
        id: 'thm',
        kind: 'application-theoreme',
        text: t`$y(t)\le 2e^{3t}$ pour tout $t\in[0,1]$.`,
        masked: t`Majoration de $y(t)$ : à calculer.`,
        check: { kind: 'expr-equiv', prompt: t`En notant $E=e^{3t}$, majorant de $y(t)$ donné par le lemme, exprimé en $E$`, expected: '2*E', vars: ['E'] },
      },
      { id: 'd-star', kind: 'definition', text: t`$y_*(t)=2e^{3t}$ sur $[0,1]$.` },
      {
        id: 'sat-int',
        kind: 'egalite',
        text: t`$2+\int_0^t3y_*(s)\,ds=2+2(e^{3t}-1)=2e^{3t}=y_*(t)$ : hypothèse et conclusion sont des égalités pour $y_*$.`,
        masked: t`Valeur de $2+\int_0^t3y_*(s)\,ds$ : à calculer.`,
        check: { kind: 'expr-equiv', prompt: t`En notant $E=e^{3t}$, valeur de $2+\int_0^t3y_*(s)\,ds$ exprimée en $E$`, expected: '2*E', vars: ['E'] },
      },
      { id: 'd-y1', kind: 'definition', text: t`$y_1(t)=16t^2$ sur $[0,1]$.` },
      { id: 'nr-maj', kind: 'inegalite', text: t`$y_1(t)\le 2e^{3t}$ pour tout $t\in[0,1]$.` },
      {
        id: 'nr-viol',
        kind: 'egalite',
        text: t`$y_1(2/3)-\big(2+\int_0^{2/3}3y_1(s)\,ds\big)=\tfrac{10}{27}>0$.`,
        masked: t`Écart en $t=2/3$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $y_1(2/3)-\big(2+\int_0^{2/3}3y_1(s)\,ds\big)$`, expected: '10/27' },
      },
      { id: 'nonrev', kind: 'consequence', text: t`La majoration $y(t)\le 2e^{3t}$ n'entraîne pas l'hypothèse intégrale : le lemme n'est pas réversible.` },
      { id: 'fin', kind: 'conclusion', text: t`Pour tout $t\in[0,1]$, $y(t)\le 2e^{3t}$ ; cette majoration est atteinte par $y_*$, et l'implication n'est pas réversible.` },
      // Propositions plausibles mais fausses.
      { id: 'x-affine', kind: 'inegalite', distractor: true, text: t`$y(t)\le 2+3t$ pour tout $t\in[0,1]$.` },
      { id: 'x-somme', kind: 'inegalite', distractor: true, text: t`$y(t)\le 2+e^{3t}$ pour tout $t\in[0,1]$.` },
      { id: 'x-rev', kind: 'consequence', distractor: true, after: ['thm'], text: t`Si $y(t)\le 2e^{3t}$ pour tout $t\in[0,1]$, alors $y(t)\le 2+\int_0^t3y(s)\,ds$ pour tout $t\in[0,1]$.` },
    ],
    justifications: [
      { id: 'j-lire', label: 'Lecture de l’hypothèse : constante additive et coefficient sous l’intégrale.' },
      { id: 'j-int', label: 'Intégrale d’une fonction constante.' },
      { id: 'j-gronwall', label: 'Lemme de Grönwall, hypothèses vérifiées.', theorem: 'gronwall' },
      { id: 'j-primitive', label: t`Primitive : $\int_0^t6e^{3s}\,ds=2e^{3t}-2$.` },
      { id: 'j-taylor', label: t`$e^{3t}\ge 1+3t+\tfrac92t^2+\tfrac92t^3$ pour $t\ge 0$, et $1+3t-\tfrac72t^2+\tfrac92t^3\ge 1$ sur $[0,1]$ (polynôme croissant : dérivée de discriminant négatif).` },
      { id: 'j-eval', label: t`$y_1(2/3)=\tfrac{64}9=\tfrac{192}{27}$ et $2+16(2/3)^3=\tfrac{182}{27}$.` },
      { id: 'j-contre', label: 'Une fonction qui vérifie la conclusion sans vérifier l’hypothèse réfute la réciproque.' },
      { id: 'j-synthese', label: 'Réunion des trois résultats.' },
      { id: 'j-reciproque', label: 'Le lemme de Grönwall est une équivalence.' },
    ],
    rules: [
      { from: ['h-ineg'], to: 'id-ab', by: 'j-lire' },
      { from: ['id-ab'], to: 'int-b', by: 'j-int' },
      { from: ['h-y', 'h-ineg', 'id-ab', 'int-b'], to: 'thm', by: 'j-gronwall' },
      { from: ['d-star'], to: 'sat-int', by: 'j-primitive' },
      { from: ['d-y1'], to: 'nr-maj', by: 'j-taylor' },
      { from: ['d-y1'], to: 'nr-viol', by: 'j-eval' },
      { from: ['nr-maj', 'nr-viol'], to: 'nonrev', by: 'j-contre' },
      { from: ['thm', 'sat-int', 'nonrev'], to: 'fin', by: 'j-synthese' },
    ],
    traps: [
      {
        conclusion: 'x-affine',
        verdict: 'incorrect',
        concept: 'calcul-exact',
        message: t`Cette majoration traite $\int_0^t3y$ comme si $y\le 1$ : l'inconnue $y$ figure sous l'intégrale.`,
        counterexample: t`$y_*(t)=2e^{3t}$ vérifie l'hypothèse avec égalité, et $y_*(1)=2e^3>5$.`,
      },
      {
        conclusion: 'x-somme',
        verdict: 'incorrect',
        concept: 'calcul-exact',
        message: t`La constante $a$ multiplie l'exponentielle : $a\exp\big(\int_0^tb\big)$, et non $a+\exp\big(\int_0^tb\big)$.`,
        counterexample: t`$y_*(1)=2e^3>2+e^3$, puisque $e^3>2$.`,
      },
      {
        conclusion: 'x-rev',
        verdict: 'incorrect',
        concept: 'gronwall-reciproque',
        message: 'La conclusion de Grönwall est plus faible que l’hypothèse : l’implication n’est pas réversible.',
        counterexample: t`$y_1(t)=16t^2$ vérifie $y_1\le 2e^{3t}$ sur $[0,1]$, mais $y_1(2/3)-\big(2+\int_0^{2/3}3y_1\big)=\tfrac{10}{27}>0$.`,
      },
      {
        conclusion: 'nonrev',
        by: 'j-reciproque',
        verdict: 'incorrect',
        concept: 'gronwall-reciproque',
        message: 'Cette justification est fausse, et elle affirmerait même le contraire de ce qui est établi ici.',
      },
    ],
    removable: [
      {
        hypothesis: 'h-y',
        label: t`Retirer la continuité de $y$`,
        necessary: true,
        explanation: t`La continuité garantit $by\in L^1$ ; sans elle, l'intégrale peut être infinie et l'hypothèse ne dit plus rien.`,
        counterexample: t`$y(0)=0$ et $y(t)=1/t$ pour $t>0$ : $\int_0^t3y=+\infty$, l'hypothèse est vraie, mais $y(1/10)=10>2e^{0{,}3}$.`,
      },
      {
        hypothesis: 'id-ab',
        label: t`Ne plus disposer de $b\ge 0$`,
        necessary: true,
        explanation: t`Le lemme exige $b\ge 0$ ; pour un coefficient négatif, la conclusion analogue est fausse.`,
        counterexample: t`$y(t)=t^2$ vérifie $y(t)\le 2-\int_0^t3y(s)\,ds$ sur $[0,1]$, car $t^2+t^3\le 2$, mais $y(1)=1>2e^{-3}$.`,
      },
    ],
  },
  solution: t`**Identification.** L'hypothèse a la forme du lemme avec $a=2\ge 0$ et $b\equiv 3$, intégrable et positive sur $[0,1]$ ; $y$ est continue et positive. Comme $\int_0^tb=3t$, le lemme donne
$$y(t)\le 2e^{3t}\quad\text{pour tout }t\in[0,1].$$

**Optimalité.** Pour $y_*(t)=2e^{3t}$ : $2+\int_0^t6e^{3s}\,ds=2+2(e^{3t}-1)=2e^{3t}$. Hypothèse et conclusion sont des égalités ; en notant $E=e^{3t}$, le calcul $2+2(E-1)=2E$ est une identité exacte.

**Non-réversibilité.** $y_1(t)=16t^2$ vérifie $y_1\le 2e^{3t}$ sur $[0,1]$, car $e^{3t}\ge 1+3t+\tfrac92t^2+\tfrac92t^3\ge 8t^2$, le polynôme $1+3t-\tfrac72t^2+\tfrac92t^3$ étant croissant et égal à $1$ en $0$. Mais en $t=2/3$ : $y_1(2/3)=\tfrac{192}{27}$ et $2+\int_0^{2/3}48s^2\,ds=\tfrac{182}{27}$. L'écart $\tfrac{10}{27}>0$ montre que l'hypothèse intégrale est violée.`,
  steps: [
    t`Identifier $a$ et $b$, vérifier les hypothèses du lemme.`,
    t`Calculer $\int_0^tb$ et conclure à $y(t)\le 2e^{3t}$.`,
    t`Vérifier l'égalité pour $y_*(t)=2e^{3t}$.`,
    t`Réfuter la réciproque avec $y_1(t)=16t^2$.`,
  ],
  commonErrors: [
    { id: 'e-somme', description: t`Écrire $a+\exp(\int b)$ au lieu de $a\exp(\int b)$.`, concept: 'calcul-exact' },
    { id: 'e-rev', description: 'Croire que la majoration exponentielle entraîne l’inégalité intégrale.', concept: 'gronwall-reciproque' },
    { id: 'e-hyp', description: t`Appliquer le lemme sans vérifier $a\ge 0$, $b\ge 0$ et l'intégrabilité.`, concept: 'hypotheses-theoreme' },
  ],
  hints: [
    t`À quelle forme $y(t)\le a+\int_0^tb\,y$ l'hypothèse se ramène-t-elle, et les conditions sur $a$, $b$, $y$ sont-elles remplies ?`,
    t`Le lemme donne $y(t)\le a\exp\big(\int_0^tb\big)$ ; pour l'optimalité, teste une fonction pour laquelle l'hypothèse est une égalité.`,
    t`Pour la non-réversibilité, compare $y_1(2/3)$ et $2+\int_0^{2/3}48s^2\,ds$ ; pour la majoration de $y_1$, utilise le développement de $e^{3t}$ à l'ordre $3$.`,
  ],
  rubric: rubric({
    hypotheses: t`$a\ge 0$, $b\ge 0$ intégrable et $y$ continue positive sont vérifiés.`,
    methode: 'Le lemme est appliqué, puis l’optimalité et la non-réversibilité sont examinées.',
    validite: 'Les calculs sont exacts, sans approximation numérique.',
    justifications: 'Le contre-exemple à la réciproque est vérifié aux deux bouts.',
    conclusion: t`La majoration $y\le 2e^{3t}$ est obtenue et son statut est précisé.`,
  }),
  variant: {
    statement: t`Soit $y:[0,T]\to[0,\infty[$ continue telle que $y(t)\le 1+\int_0^t\frac{2s}{1+s^2}\,y(s)\,ds$. Appliquer Grönwall et montrer que la majoration obtenue est atteinte.`,
    solution: t`Ici $a=1$ et $b(s)=\frac{2s}{1+s^2}$, continue et positive sur $[0,T]$, donc intégrable. Comme $\int_0^tb=\ln(1+t^2)$, le lemme donne $y(t)\le\exp\big(\ln(1+t^2)\big)=1+t^2$. Pour $y_*(t)=1+t^2$ : $1+\int_0^t2s\,ds=1+t^2$, l'hypothèse est une égalité et la majoration est atteinte.`,
    closedChecks: [{ kind: 'expr-equiv', prompt: t`Majorant de $y(t)$ en fonction de $t$`, expected: '1+t^2', vars: ['t'] }],
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h-y', kind: 'hypothese', text: t`$y:[0,T]\to[0,\infty[$ est continue.` },
        { id: 'h-ineg', kind: 'hypothese', text: t`Pour tout $t\in[0,T]$ : $y(t)\le 1+\int_0^t\frac{2s}{1+s^2}\,y(s)\,ds$.` },
        { id: 'id-ab', kind: 'egalite', text: t`$a=1\ge 0$ et $b(s)=\frac{2s}{1+s^2}$, continue et positive sur $[0,T]$, donc intégrable.` },
        {
          id: 'exp-b',
          kind: 'egalite',
          text: t`$\exp\big(\int_0^tb(s)\,ds\big)=\exp\big(\ln(1+t^2)\big)=1+t^2$.`,
          masked: t`Valeur de $\exp\big(\int_0^tb(s)\,ds\big)$ : à calculer.`,
          check: { kind: 'expr-equiv', prompt: t`Valeur de $\exp\big(\int_0^tb(s)\,ds\big)$ en fonction de $t$`, expected: '1+t^2', vars: ['t'] },
        },
        { id: 'thm', kind: 'application-theoreme', text: t`$y(t)\le 1+t^2$ pour tout $t\in[0,T]$.` },
        { id: 'd-star', kind: 'definition', text: t`$y_*(t)=1+t^2$.` },
        {
          id: 'sat',
          kind: 'egalite',
          text: t`$1+\int_0^t\frac{2s}{1+s^2}(1+s^2)\,ds=1+t^2=y_*(t)$.`,
          masked: t`Valeur de $1+\int_0^tb\,y_*$ : à calculer.`,
          check: { kind: 'expr-equiv', prompt: t`Valeur de $1+\int_0^tb(s)y_*(s)\,ds$ en fonction de $t$`, expected: '1+t^2', vars: ['t'] },
        },
        { id: 'fin', kind: 'conclusion', text: t`$y(t)\le 1+t^2$ sur $[0,T]$, et cette majoration est atteinte par $y_*$.` },
        { id: 'x-log', kind: 'inegalite', distractor: true, text: t`$y(t)\le 1+\ln(1+t^2)$ pour tout $t\in[0,T]$.` },
      ],
      justifications: [
        { id: 'j-lire', label: 'Lecture de l’hypothèse et signe de b.' },
        { id: 'j-primitive', label: t`Primitive : $\int_0^t\frac{2s}{1+s^2}\,ds=\ln(1+t^2)$.` },
        { id: 'j-gronwall', label: 'Lemme de Grönwall.', theorem: 'gronwall' },
        { id: 'j-egalite', label: t`Simplification $b\,y_*=2s$, puis intégration.` },
        { id: 'j-synthese', label: 'Réunion de la majoration et de son optimalité.' },
      ],
      rules: [
        { from: ['h-ineg'], to: 'id-ab', by: 'j-lire' },
        { from: ['id-ab'], to: 'exp-b', by: 'j-primitive' },
        { from: ['h-y', 'h-ineg', 'id-ab', 'exp-b'], to: 'thm', by: 'j-gronwall' },
        { from: ['d-star'], to: 'sat', by: 'j-egalite' },
        { from: ['thm', 'sat'], to: 'fin', by: 'j-synthese' },
      ],
      traps: [
        {
          conclusion: 'x-log',
          verdict: 'incorrect',
          concept: 'calcul-exact',
          message: t`La majoration est $a\exp\big(\int_0^tb\big)$, et non $a+\int_0^tb$.`,
          counterexample: t`$y_*(t)=1+t^2$ vérifie l'hypothèse, et $1+t^2>1+\ln(1+t^2)$ pour $t>0$.`,
        },
      ],
      removable: [
        {
          hypothesis: 'h-y',
          label: t`Retirer la continuité de $y$`,
          necessary: true,
          explanation: t`Sans intégrabilité de $b\,y$, l'hypothèse peut devenir vide.`,
          counterexample: t`$y(0)=0$, $y(t)=1/t^3$ pour $t>0$ : $\int_0^t\frac{2s}{1+s^2}s^{-3}\,ds=+\infty$, alors que $y(1/2)=8>\tfrac54$ (pour $T\ge\tfrac12$).`,
        },
      ],
    },
  },
  verification: { ...COMPLEMENT, notes: 'Exercice du polycopié (p. PDF 42) sans corrigé : application du lemme, optimalité et non-réversibilité sont rédigées en complément.' },
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'gronwall.intermediaire',
  theoremId: 'gronwall',
  level: 'intermediaire',
  title: 'Fonction majorante et facteur intégrant',
  statement: t`Soient $y:[0,T]\to[0,\infty[$ continue, $a\ge 0$, $b\in L^1(0,T)$ avec $b\ge 0$, et $y(t)\le a+\int_0^tb(s)y(s)\,ds$ pour tout $t\in[0,T]$. Démontrer que $y(t)\le a\exp\big(\int_0^tb(s)\,ds\big)$ pour tout $t$, en introduisant la fonction majorante $z(t)=a+\int_0^tb\,y$ et le facteur intégrant $e^{-B(t)}$, $B(t)=\int_0^tb$. Comparer avec la preuve du polycopié par le logarithme, notamment pour $a=0$.`,
  source: poly(42, 'Exercice 23, intermédiaire ; démonstration de la section 5.5 (p. PDF 22)'),
  prerequisites: [],
  concepts: ['gronwall-cas-nul', 'gronwall-signe', 'justification-absente', 'utilisation-prematuree'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    paths: [
      { id: 'facteur', label: 'Facteur intégrant (tout a ≥ 0)' },
      { id: 'logarithme', label: 'Logarithme (a > 0), puis ε → 0 (polycopié)' },
    ],
    nodes: [
      { id: 'h-y', kind: 'hypothese', text: t`$y:[0,T]\to[0,\infty[$ est continue.` },
      { id: 'h-a', kind: 'hypothese', text: t`$a\ge 0$.` },
      { id: 'h-b1', kind: 'hypothese', text: t`$b\in L^1(0,T)$.` },
      { id: 'h-b2', kind: 'hypothese', text: t`$b\ge 0$ presque partout.` },
      { id: 'h-ineg', kind: 'hypothese', text: t`Pour tout $t\in[0,T]$ : $y(t)\le a+\int_0^tb(s)y(s)\,ds$.` },
      { id: 'd-z', kind: 'definition', text: t`$z(t)=a+\int_0^tb(s)y(s)\,ds$, $B(t)=\int_0^tb(s)\,ds$ et $Z(t)=z(t)\,e^{-B(t)}$.` },
      { id: 'z-ac', kind: 'consequence', text: t`$by\in L^1(0,T)$ ; $z$ et $B$ sont absolument continues, $z(0)=a$, $B(0)=0$, $z'=by$ et $B'=b$ presque partout.` },
      { id: 'y-le-z', kind: 'inegalite', text: t`$y(t)\le z(t)$ pour tout $t\in[0,T]$.` },
      { id: 'Z-prime', kind: 'egalite', text: t`$Z$ est absolument continue et $Z'(t)=b(t)\big(y(t)-z(t)\big)e^{-B(t)}$ presque partout.` },
      { id: 'Z-neg', kind: 'inegalite', text: t`$Z'\le 0$ presque partout.` },
      { id: 'Z-decr', kind: 'inegalite', text: t`$Z(t)\le Z(0)=a$ pour tout $t\in[0,T]$, soit $z(t)\le a\,e^{B(t)}$.` },
      { id: 'l-pos', kind: 'definition', local: true, text: t`Supposons d'abord $a>0$ (l'énoncé étant alors établi pour toute constante strictement positive).` },
      { id: 'l-log', kind: 'inegalite', text: t`Si $a>0$ : $z\ge a>0$, $\log z$ est absolument continue et $(\log z)'=\dfrac{by}{z}\le b$ presque partout, d'où $z(t)\le a\,e^{B(t)}$.` },
      { id: 'l-cas', kind: 'inegalite', text: t`Pour tout $a\ge 0$ : $z(t)\le a\,e^{B(t)}$ ; si $a=0$, on applique le cas précédent à $\varepsilon>0$, car $y\le\varepsilon+\int_0^tb\,y$, puis on fait $\varepsilon\to 0$.` },
      { id: 'fin', kind: 'conclusion', text: t`$y(t)\le a\exp\big(\int_0^tb(s)\,ds\big)$ pour tout $t\in[0,T]$.` },
      // Propositions plausibles mais fausses.
      { id: 'x-log-0', kind: 'inegalite', distractor: true, after: ['z-ac'], text: t`Si $a=0$, $\log z$ est définie sur $[0,T]$ et $(\log z)'\le b$, ce qui donne directement $z\equiv 0$.` },
      { id: 'x-deriv', kind: 'inegalite', distractor: true, text: t`$y$ est dérivable presque partout et $y'\le b\,y$ presque partout.` },
    ],
    justifications: [
      { id: 'j-ac', label: t`$y$ continue sur un compact est bornée, donc $by\in L^1$ ; une intégrale indéfinie d'une fonction intégrable est absolument continue, de dérivée l'intégrande presque partout.` },
      { id: 'j-def-z', label: t`Hypothèse intégrale et définition de $z$.` },
      { id: 'j-produit', label: t`Produit de fonctions absolument continues sur un segment ; dérivée $z'e^{-B}-zbe^{-B}$.` },
      { id: 'j-signe', label: t`$b\ge 0$ et $y-z\le 0$.` },
      { id: 'j-decroit', label: 'Une fonction absolument continue de dérivée négative presque partout est décroissante, car elle est l’intégrale de sa dérivée.' },
      { id: 'j-conclure', label: t`$y\le z$ et majoration de $z$.` },
      { id: 'j-log', label: t`$z\ge a>0$ car $by\ge 0$ ; $\log$ est lipschitzien sur $[a,\infty[$ ; $by\le bz$ ; on intègre $(\log z)'\le b$.` },
      { id: 'j-cas', label: t`Disjonction $a>0$ ou $a=0$ ; dans le second cas, $y(t)\le\varepsilon e^{B(t)}$ pour tout $\varepsilon>0$.` },
      { id: 'j-deriver', label: 'On dérive l’inégalité intégrale membre à membre.' },
      { id: 'j-gronwall', label: 'Lemme de Grönwall.', theorem: 'gronwall' },
    ],
    rules: [
      { from: ['h-y', 'h-b1', 'd-z'], to: 'z-ac', by: 'j-ac' },
      { from: ['h-ineg', 'd-z'], to: 'y-le-z', by: 'j-def-z' },
      { from: ['z-ac', 'd-z'], to: 'Z-prime', by: 'j-produit', path: 'facteur' },
      { from: ['Z-prime', 'y-le-z', 'h-b2'], to: 'Z-neg', by: 'j-signe', path: 'facteur' },
      { from: ['Z-prime', 'Z-neg'], to: 'Z-decr', by: 'j-decroit', path: 'facteur' },
      { from: ['Z-decr', 'y-le-z'], to: 'fin', by: 'j-conclure', path: 'facteur' },
      { from: ['l-pos', 'z-ac', 'y-le-z', 'h-b2', 'h-y'], to: 'l-log', by: 'j-log', path: 'logarithme' },
      { from: ['l-log', 'h-a', 'h-ineg'], to: 'l-cas', by: 'j-cas', path: 'logarithme' },
      { from: ['l-cas', 'y-le-z'], to: 'fin', by: 'j-conclure', path: 'logarithme' },
    ],
    traps: [
      {
        conclusion: 'x-log-0',
        verdict: 'incorrect',
        concept: 'gronwall-cas-nul',
        message: t`Pour $a=0$, $z$ peut s'annuler : $\log z$ n'est pas défini. C'est pourquoi le polycopié remplace $a$ par $\varepsilon>0$, et pourquoi le facteur intégrant, qui ne divise pas par $z$, est plus direct.`,
        counterexample: t`$y\equiv 0$, $a=0$ : $z\equiv 0$ et $\log z$ n'est défini en aucun point.`,
      },
      {
        conclusion: 'x-deriv',
        verdict: 'incorrect',
        concept: 'justification-absente',
        message: 'L’hypothèse est intégrale : elle ne donne ni la dérivabilité de y ni une inégalité différentielle sur y. On dérive z, pas y.',
        counterexample: t`$a=2$, $b=1$, $y(t)=1+\tfrac12\sin(10t)$ : l'hypothèse est vraie car $y\le\tfrac32\le 2$, mais $y'(0)=5>1=b\,y(0)$.`,
      },
      {
        conclusion: 'Z-neg',
        by: 'j-deriver',
        verdict: 'incorrect',
        concept: 'justification-absente',
        message: t`Dériver une inégalité n'est pas licite. Le signe de $Z'$ vient de $b\ge 0$ et de $y\le z$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-b2',
        label: t`Retirer $b\ge 0$`,
        necessary: true,
        explanation: t`Le signe de $Z'$, comme la majoration $by\le bz$, repose sur $b\ge 0$.`,
        counterexample: t`$a=1$, $b=-1$, $y(t)=\tfrac34t^2$ sur $[0,1]$ : $y(t)+\int_0^ty=\tfrac34t^2+\tfrac14t^3\le 1$, mais $y(1)=\tfrac34>e^{-1}$.`,
      },
      {
        hypothesis: 'h-b1',
        label: t`Retirer $b\in L^1(0,T)$`,
        necessary: true,
        explanation: t`$B$ peut ne plus être finie, et $z$ n'est plus nécessairement absolument continue.`,
        counterexample: t`$a=0$, $b(t)=1/t$, $y(t)=t$ : $\int_0^tb\,y=t$, l'hypothèse est une égalité, et pourtant $y\neq 0$.`,
      },
      {
        hypothesis: 'h-y',
        label: t`Retirer la continuité de $y$`,
        necessary: true,
        explanation: t`Sans intégrabilité de $by$, l'hypothèse peut être vide.`,
        counterexample: t`$a=0$, $b=1$, $y(0)=0$ et $y(t)=1/t$ pour $t>0$ : $\int_0^ty=+\infty$, l'hypothèse est vraie et $y\neq 0$.`,
      },
      {
        hypothesis: 'h-a',
        label: t`Retirer $a\ge 0$`,
        necessary: false,
        explanation: t`Le facteur intégrant n'utilise pas le signe de $a$ ; seule la voie logarithmique en a besoin.`,
        counterexample: t`Si $a<0$, l'hypothèse en $t=0$ donne $y(0)\le a<0$, incompatible avec $y\ge 0$ : l'énoncé est vide.`,
      },
    ],
  },
  solution: t`**Fonction majorante.** $y$ est continue sur un segment, donc bornée, et $b\in L^1$ : $by\in L^1(0,T)$. La fonction $z(t)=a+\int_0^tb\,y$ est absolument continue, $z(0)=a$, $z'=by$ presque partout, et l'hypothèse s'écrit $y\le z$. De même $B(t)=\int_0^tb$ est absolument continue, de dérivée $b$.

**Facteur intégrant.** $Z=z\,e^{-B}$ est absolument continue, produit de deux telles fonctions, et
$$Z'=(z'-bz)\,e^{-B}=b\,(y-z)\,e^{-B}\le 0\quad\text{p.p.},$$
car $b\ge 0$ et $y\le z$. Donc $Z(t)=Z(0)+\int_0^tZ'\le a$, soit $z(t)\le a\,e^{B(t)}$, puis $y(t)\le z(t)\le a\exp\big(\int_0^tb\big)$.

**Comparaison avec le polycopié.** La preuve par le logarithme suppose $a>0$ : alors $z\ge a>0$ et $(\log z)'=by/z\le b$. Pour $a=0$, $z$ peut s'annuler ; on applique le cas $a>0$ à $\varepsilon>0$, puis on fait $\varepsilon\to 0$. Le facteur intégrant ne divise pas par $z$ : il traite $a=0$ directement, et n'utilise ni le signe de $a$ ni celui de $y$. En revanche $b\ge 0$ et $b\in L^1$ sont indispensables.`,
  steps: [
    t`Introduire $z$, vérifier son absolue continuité et $y\le z$.`,
    t`Introduire $Z=z\,e^{-B}$ et calculer $Z'$.`,
    t`Obtenir $Z'\le 0$ grâce à $b\ge 0$ et $y\le z$.`,
    t`Intégrer pour majorer $z$, puis $y$.`,
  ],
  commonErrors: [
    { id: 'e-log', description: t`Prendre $\log z$ lorsque $a=0$.`, concept: 'gronwall-cas-nul' },
    { id: 'e-deriver', description: 'Dériver l’inégalité intégrale pour obtenir une inégalité sur y’.', concept: 'justification-absente' },
    { id: 'e-signe', description: t`Oublier que $Z'\le 0$ repose sur $b\ge 0$.`, concept: 'gronwall-signe' },
    { id: 'e-circulaire', description: 'Invoquer le lemme de Grönwall dans sa propre démonstration.', concept: 'utilisation-prematuree' },
  ],
  hints: [
    t`L'inconnue $y$ n'est pas dérivable : quelle fonction, construite à partir de l'hypothèse, l'est presque partout ?`,
    t`Pour $z(t)=a+\int_0^tb\,y$, on a $z'=by\le bz$ ; quel facteur rend $z'-bz$ égal à la dérivée d'un produit ?`,
    t`Pose $Z=z\,e^{-B}$ : $Z'=b(y-z)e^{-B}\le 0$, donc $Z(t)\le Z(0)=a$.`,
  ],
  rubric: rubric({
    hypotheses: t`$b\in L^1$, $b\ge 0$ et la continuité de $y$ sont utilisés là où ils servent.`,
    methode: 'Fonction majorante, facteur intégrant, intégration.',
    validite: 'L’absolue continuité justifie chaque dérivation et chaque intégration.',
    justifications: t`Le cas $a=0$ est traité sans diviser par une quantité qui peut s'annuler.`,
    conclusion: 'Le lemme est démontré pour tout a ≥ 0.',
  }),
  variant: {
    statement: t`Soient $a:[0,T]\to[0,\infty[$ continue croissante, $b\in L^1(0,T)$, $b\ge 0$, et $y$ continue positive avec $y(t)\le a(t)+\int_0^tb\,y$. Montrer que $y(t)\le a(t)\exp\big(\int_0^tb\big)$. Que se passe-t-il si $a$ n'est pas croissante ?`,
    solution: t`Fixons $t_0\in[0,T]$. Pour $t\le t_0$, $y(t)\le a(t_0)+\int_0^tb\,y$ puisque $a$ est croissante ; le lemme à constante $a(t_0)$, sur $[0,t_0]$, donne $y(t_0)\le a(t_0)\exp\big(\int_0^{t_0}b\big)$. Sans croissance, la conclusion tombe : pour $a(t)=1-t$, $b=1$, $y\equiv 1$ sur $[0,1]$, l'hypothèse est une égalité, mais $a(1)e^1=0<1=y(1)$.`,
  },
  verification: { ...COMPLEMENT, notes: 'La voie logarithmique est celle du polycopié (p. PDF 22) ; la voie par facteur intégrant, demandée par l’exercice, est un complément.' },
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'gronwall.difficile',
  theoremId: 'gronwall',
  level: 'difficile',
  title: 'Dépendance continue par rapport à la donnée initiale',
  statement: t`Soient $V\hookrightarrow H\simeq H'\hookrightarrow V'$ un triplet de Hilbert réels, dense et continu, $a:V\times V\to\mathbb R$ bilinéaire continue avec $a(v,v)\ge 0$, $f\in L^2(0,T;V')$ et $G:H\to H$ lipschitzienne de constante $L\ge 0$. Soient $u_1,u_2\in L^2(0,T;V)$, avec $u_i'\in L^2(0,T;V')$, telles que pour tout $v\in V$ et presque tout $t$ : $\langle u_i'(t),v\rangle_{V',V}+a(u_i(t),v)=(G(u_i(t)),v)_H+\langle f(t),v\rangle_{V',V}$, et $u_i(0)=u_0^i\in H$. Montrer que $\|u_1(t)-u_2(t)\|_H\le e^{Lt}\|u_0^1-u_0^2\|_H$ pour tout $t\in[0,T]$.`,
  source: poly(42, 'Exercice 23, difficile ; cadre de la section 8.7 (p. PDF 33)'),
  prerequisites: ['lions-magenes'],
  concepts: ['gronwall-signe', 'lions-magenes-crochet', 'calcul-exact', 'hypotheses-theoreme'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-triplet', kind: 'hypothese', text: t`$V\hookrightarrow H\simeq H'\hookrightarrow V'$ est un triplet de Hilbert réels, dense et continu.` },
      { id: 'h-a', kind: 'hypothese', text: t`$a$ est bilinéaire continue sur $V$ et $a(v,v)\ge 0$ pour tout $v\in V$.` },
      { id: 'h-G', kind: 'hypothese', text: t`$\|G(h)-G(k)\|_H\le L\|h-k\|_H$ pour tous $h,k\in H$.` },
      { id: 'h-sol', kind: 'hypothese', text: t`$u_1,u_2\in L^2(0,T;V)$, $u_i'\in L^2(0,T;V')$, vérifient l'équation pour tout $v\in V$ et presque tout $t$, avec $u_i(0)=u_0^i$.` },
      { id: 'd-w', kind: 'definition', text: t`$w=u_1-u_2$.` },
      { id: 'lm', kind: 'application-theoreme', text: t`$w\in C([0,T];H)$, $t\mapsto\|w(t)\|_H^2$ est absolument continue et $\tfrac12\tfrac{d}{dt}\|w(t)\|_H^2=\langle w'(t),w(t)\rangle_{V',V}$ presque partout.` },
      { id: 'w-test', kind: 'egalite', text: t`Pour presque tout $t$ : $\langle w'(t),w(t)\rangle_{V',V}+a(w(t),w(t))=\big(G(u_1(t))-G(u_2(t)),w(t)\big)_H$.` },
      { id: 'maj', kind: 'inegalite', text: t`Pour presque tout $t$ : $\tfrac12\tfrac{d}{dt}\|w(t)\|_H^2\le L\|w(t)\|_H^2$.` },
      { id: 'integ', kind: 'inegalite', text: t`Pour tout $t\in[0,T]$ : $\|w(t)\|_H^2\le\|w(0)\|_H^2+\int_0^t2L\|w(s)\|_H^2\,ds$.` },
      {
        id: 'int-b',
        kind: 'egalite',
        text: t`$\int_0^t2L\,ds=2Lt$.`,
        masked: t`Valeur de $\int_0^t2L\,ds$ : à calculer.`,
        check: { kind: 'expr-equiv', prompt: t`Valeur de $\int_0^tb(s)\,ds$ pour $b\equiv 2L$, en fonction de $L$ et $t$`, expected: '2*L*t', vars: ['L', 't'] },
      },
      {
        id: 'gr',
        kind: 'application-theoreme',
        text: t`$\|w(t)\|_H^2\le\|w(0)\|_H^2\,e^{2Lt}$ pour tout $t\in[0,T]$.`,
        masked: t`Majoration de $\|w(t)\|_H^2$ : à calculer.`,
        check: { kind: 'expr-equiv', prompt: t`En notant $\rho=\|w(0)\|_H^2$ et $E=e^{2Lt}$, majorant de $\|w(t)\|_H^2$`, expected: 'rho*E', vars: ['rho', 'E'] },
      },
      { id: 'fin', kind: 'conclusion', text: t`$\|u_1(t)-u_2(t)\|_H\le e^{Lt}\,\|u_0^1-u_0^2\|_H$ pour tout $t\in[0,T]$ : dépendance lipschitzienne par rapport à la donnée initiale.` },
      // Propositions plausibles mais fausses.
      { id: 'x-exp', kind: 'inegalite', distractor: true, text: t`$\|u_1(t)-u_2(t)\|_H\le e^{Lt/2}\,\|u_0^1-u_0^2\|_H$ pour tout $t$, sous les hypothèses de l'énoncé.` },
      { id: 'x-unif', kind: 'inegalite', distractor: true, text: t`Il existe $C$ indépendante de $T$ telle que $\sup_{t\ge 0}\|u_1(t)-u_2(t)\|_H\le C\|u_0^1-u_0^2\|_H$, sous les seules hypothèses de l'énoncé.` },
      { id: 'x-norme', kind: 'inegalite', distractor: true, after: ['maj'], text: t`$\tfrac{d}{dt}\|w(t)\|_H\le L\|w(t)\|_H$ presque partout, par simple division par $\|w(t)\|_H$.` },
    ],
    justifications: [
      { id: 'j-lm', label: t`Lions–Magenes appliqué à $w\in L^2(0,T;V)$, $w'\in L^2(0,T;V')$.`, theorem: 'lions-magenes' },
      { id: 'j-test', label: t`Différence des équations ; elle a lieu dans $V'$ hors d'un négligeable indépendant de $v$, et on l'évalue sur $w(t)\in V$.` },
      { id: 'j-cs-lip', label: t`$a(w,w)\ge 0$, Cauchy–Schwarz dans $H$ et $\|G(u_1)-G(u_2)\|_H\le L\|w\|_H$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-integrer', label: t`Intégration de $0$ à $t$ de la dérivée d'une fonction absolument continue.` },
      { id: 'j-lire-b', label: t`Coefficient constant $b\equiv 2L$ sous l'intégrale.` },
      { id: 'j-gronwall', label: t`Lemme de Grönwall avec $y=\|w\|_H^2$ continue positive, $a=\|w(0)\|_H^2\ge 0$, $b\equiv 2L\ge 0$.`, theorem: 'gronwall' },
      { id: 'j-racine', label: t`Racine carrée, et $w(0)=u_0^1-u_0^2$.` },
      { id: 'j-sup', label: t`On majore $\|w(s)\|_H^2$ par son supremum sur $[0,t]$, ce qui suffit à conclure.` },
    ],
    rules: [
      { from: ['h-triplet', 'h-sol', 'd-w'], to: 'lm', by: 'j-lm' },
      { from: ['h-sol', 'd-w', 'h-a', 'h-G', 'h-triplet'], to: 'w-test', by: 'j-test' },
      { from: ['w-test', 'lm', 'h-a', 'h-G'], to: 'maj', by: 'j-cs-lip' },
      { from: ['maj', 'lm'], to: 'integ', by: 'j-integrer' },
      { from: ['integ'], to: 'int-b', by: 'j-lire-b' },
      { from: ['integ', 'lm', 'int-b'], to: 'gr', by: 'j-gronwall' },
      { from: ['gr', 'h-sol'], to: 'fin', by: 'j-racine' },
    ],
    traps: [
      {
        conclusion: 'gr',
        by: 'j-sup',
        verdict: 'a-justifier',
        concept: 'gronwall-signe',
        message: t`Majorer par le supremum donne $\sup_{[0,t]}\|w\|_H^2\le\|w(0)\|_H^2+2Lt\sup_{[0,t]}\|w\|_H^2$, qui ne conclut que si $2Lt<1$ : un argument local en temps, à itérer. Le lemme de Grönwall évite cette restriction.`,
      },
      {
        conclusion: 'x-exp',
        verdict: 'incorrect',
        concept: 'calcul-exact',
        message: t`L'exposant de la majoration de $\|w\|_H^2$ est $2Lt$ ; en prenant la racine, on obtient $e^{Lt}$, non $e^{Lt/2}$.`,
        counterexample: t`$V=H=\mathbb R$, $a=0$, $f=0$, $G(s)=Ls$ avec $L>0$ : $w(t)=e^{Lt}w(0)$, et $e^{Lt}>e^{Lt/2}$ pour $t>0$.`,
      },
      {
        conclusion: 'x-unif',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: 'Sous ces hypothèses, la constante croît exponentiellement avec le temps.',
        counterexample: t`$V=H=\mathbb R$, $a=0$, $f=0$, $G(s)=Ls$, $L>0$ : $|w(t)|=e^{Lt}|w(0)|$ n'est pas borné uniformément en $t$.`,
      },
      {
        conclusion: 'x-norme',
        verdict: 'a-justifier',
        concept: 'gronwall-cas-nul',
        message: t`La division par $\|w(t)\|_H$ est illicite là où cette norme s'annule, et la dérivabilité de $\|w\|_H$ demande un argument. Passer par le carré, absolument continu par Lions–Magenes, évite ces difficultés.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-G',
        label: t`Retirer le caractère lipschitzien de $G$`,
        necessary: true,
        explanation: 'La majoration différentielle disparaît, et avec elle l’unicité comme la dépendance continue.',
        counterexample: t`$V=H=\mathbb R$, $a=0$, $f=0$, $G(s)=2\sqrt{|s|}$, continue non lipschitzienne : $u_1\equiv 0$ et $u_2(t)=t^2$ sont deux solutions de même donnée initiale $0$.`,
      },
      {
        hypothesis: 'h-a',
        label: t`Retirer $a(v,v)\ge 0$`,
        necessary: true,
        explanation: t`Le terme $a(w,w)$ ne peut plus être négligé : l'exposant $L$ n'est plus le bon.`,
        counterexample: t`$V=H=\mathbb R$, $a(u,v)=-\mu uv$ avec $\mu>0$, $G=0$ ($L=0$) : $w(t)=e^{\mu t}w(0)$ contredit $|w(t)|\le|w(0)|$.`,
      },
    ],
  },
  solution: t`**Réduction.** $w=u_1-u_2\in L^2(0,T;V)$, $w'\in L^2(0,T;V')$, et pour tout $v\in V$, presque tout $t$ : $\langle w',v\rangle+a(w,v)=(G(u_1)-G(u_2),v)_H$. La différence des deux membres appartient à $L^2(0,T;V')$ : l'égalité a lieu dans $V'$ hors d'un négligeable indépendant de $v$, et on peut l'évaluer en $v=w(t)$.

**Identité de Lions–Magenes.** $t\mapsto\|w(t)\|_H^2$ est continue, absolument continue, et $\tfrac12\tfrac{d}{dt}\|w\|_H^2=\langle w',w\rangle$ presque partout. Avec $a(w,w)\ge 0$, Cauchy–Schwarz et le caractère lipschitzien de $G$ :
$$\tfrac12\tfrac{d}{dt}\|w\|_H^2\le\|G(u_1)-G(u_2)\|_H\|w\|_H\le L\|w\|_H^2.$$

**Grönwall.** En intégrant : $\|w(t)\|_H^2\le\|w(0)\|_H^2+\int_0^t2L\|w\|_H^2$. Le lemme, avec $y=\|w\|_H^2$ continue positive, $a=\|w(0)\|_H^2\ge 0$ et $b\equiv 2L\ge 0$, donne $\|w(t)\|_H^2\le\|w(0)\|_H^2e^{2Lt}$, soit $\|u_1(t)-u_2(t)\|_H\le e^{Lt}\|u_0^1-u_0^2\|_H$. Pour $u_0^1=u_0^2$, on retrouve l'unicité (cas $a=0$ du lemme).

**Vigilance.** L'exposant est $Lt$ et la constante croît avec $T$ : l'exemple scalaire $G(s)=Ls$ montre que c'est optimal.`,
  steps: [
    'Former la différence des solutions et l’évaluer sur w(t).',
    t`Utiliser Lions–Magenes pour dériver $\|w\|_H^2$.`,
    'Majorer par Cauchy–Schwarz et la constante de Lipschitz.',
    'Intégrer en temps et appliquer Grönwall au carré de la norme.',
    'Prendre la racine carrée.',
  ],
  commonErrors: [
    { id: 'e-exposant', description: t`Perdre le facteur $2$ : écrire $e^{Lt/2}$ ou $e^{2Lt}$ pour la norme elle-même.`, concept: 'calcul-exact' },
    { id: 'e-norme', description: t`Appliquer le lemme à $\|w\|_H$ en divisant par une quantité qui peut s'annuler.`, concept: 'gronwall-cas-nul' },
    { id: 'e-crochet', description: t`Dériver $\|w\|_H^2$ comme si $w'$ était à valeurs dans $H$.`, concept: 'lions-magenes-crochet' },
  ],
  hints: [
    t`Quelle quantité, définie pour toute solution faible, peut-on dériver en temps, et sous quel théorème ?`,
    t`Teste la différence des équations par $w(t)$, puis majore le second membre par $L\|w\|_H^2$ grâce à Cauchy–Schwarz.`,
    t`Intègre : $\|w(t)\|_H^2\le\|w(0)\|_H^2+\int_0^t2L\|w\|_H^2$, et applique Grönwall à $y=\|w\|_H^2$.`,
  ],
  rubric: rubric({
    hypotheses: t`Le triplet, $a(v,v)\ge 0$ et le caractère lipschitzien de $G$ sont utilisés.`,
    methode: 'Identité de Lions–Magenes, puis Grönwall sur la norme au carré.',
    validite: 'Les hypothèses du lemme de Grönwall sont vérifiées pour y, a et b.',
    justifications: 'Le test par w(t) et l’intégration sont justifiés.',
    conclusion: t`L'estimation $\|w(t)\|_H\le e^{Lt}\|w(0)\|_H$ est obtenue avec le bon exposant.`,
  }),
  variant: {
    statement: t`Même question lorsque $a$ vérifie seulement l'inégalité de Gårding $a(v,v)+\lambda\|v\|_H^2\ge\alpha\|v\|_V^2$, avec $\lambda\ge 0$ et $\alpha>0$.`,
    solution: t`On obtient $\tfrac12\tfrac{d}{dt}\|w\|_H^2\le(L+\lambda)\|w\|_H^2-\alpha\|w\|_V^2\le(L+\lambda)\|w\|_H^2$, d'où, par Grönwall avec $b\equiv 2(L+\lambda)$ : $\|u_1(t)-u_2(t)\|_H\le e^{(L+\lambda)t}\|u_0^1-u_0^2\|_H$.`,
    closedChecks: [{ kind: 'expr-equiv', prompt: t`Exposant $\int_0^tb$ pour $b\equiv 2(L+\lambda)$, avec les variables $L$, $l=\lambda$ et $t$`, expected: '2*(L+l)*t', vars: ['L', 'l', 't'] }],
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT23: TheoremModule = {
  theorem: {
    id: 'gronwall',
    spaces: [
      t`$y:[0,T]\to[0,\infty[$ continue ; $a\in\mathbb R$ constante ; $b\in L^1(0,T)$.`,
      t`Inégalité intégrale : $y(t)\le a+\int_0^tb(s)y(s)\,ds$ pour tout $t\in[0,T]$.`,
    ],
    hypotheses: [
      {
        id: 'h-y',
        text: t`$y:[0,T]\to[0,\infty[$ est continue.`,
        whenRemoved: t`Sans intégrabilité de $by$, l'hypothèse peut être vide : $a=0$, $b=1$, $y(0)=0$ et $y(t)=1/t$ pour $t>0$ donnent $\int_0^ty=+\infty$, et pourtant $y\neq 0$.`,
      },
      {
        id: 'h-a',
        text: t`$a\ge 0$.`,
        whenRemoved: t`Pour $a<0$, l'hypothèse en $t=0$ impose $y(0)\le a<0$, incompatible avec $y\ge 0$ : l'énoncé devient vide.`,
      },
      {
        id: 'h-b',
        text: t`$b\in L^1(0,T)$ et $b\ge 0$.`,
        whenRemoved: t`Si $b\notin L^1$ : $a=0$, $b(t)=1/t$, $y(t)=t$ vérifie l'hypothèse avec égalité et $y\neq 0$. Si $b$ n'est pas positive : $a=1$, $b=-1$, $y(t)=\tfrac34t^2$ sur $[0,1]$ vérifie l'hypothèse, mais $y(1)=\tfrac34>e^{-1}$.`,
      },
    ],
    statement: t`Si $y:[0,T]\to[0,\infty[$ est continue et
$$y(t)\le a+\int_0^tb(s)y(s)\,ds,\qquad a\ge 0,\ b\in L^1(0,T),\ b\ge 0,$$
alors
$$y(t)\le a\exp\Big(\int_0^tb(s)\,ds\Big).$$`,
    conclusions: {
      stabilite: t`Majoration exponentielle de $y$ ; pour $a=0$, $y\equiv 0$, ce qui donne l'unicité dans les applications.`,
    },
    sourceProof: 'complete',
    proofOutline: [
      t`Poser $z(t)=a+\int_0^tb(s)y(s)\,ds$ : absolument continue, $z'=by$ presque partout, et $y\le z$.`,
      t`Si $a>0$ : $z\ge a>0$ et $z'=by\le bz$, donc $(\log z)'\le b$ presque partout.`,
      t`En intégrant, $z(t)\le a\exp\big(\int_0^tb\big)$, puis $y\le z$.`,
      t`Si $a=0$ : remplacer $a$ par $\varepsilon>0$, puis faire $\varepsilon\to 0$.`,
    ],
    warnings: [
      t`Le cas $a=0$ demande une précaution : $z$ peut s'annuler et $\log z$ n'est pas défini.`,
      t`L'implication n'est pas réversible : $y\le a\exp(\int_0^tb)$ n'entraîne pas l'inégalité intégrale.`,
      t`Le signe $b\ge 0$ est indispensable, de même que l'intégrabilité de $b$.`,
      t`$a$ est une constante : pour $a(t)$ non croissante, la conclusion $y\le a(t)\exp(\int_0^tb)$ peut tomber.`,
    ],
    usefulFor: 'Unicité, stabilité et dépendance continue par rapport aux données initiales pour les équations d’évolution.',
    verification: FROM_POLY,
  },
  definitions: [
    {
      id: 'gr-absolument-continue',
      term: 'Fonction absolument continue',
      statement: t`$z:[0,T]\to\mathbb R$ est absolument continue s'il existe $g\in L^1(0,T)$ telle que $z(t)=z(0)+\int_0^tg$ pour tout $t$ ; alors $z'=g$ presque partout. Une fonction absolument continue de dérivée négative presque partout est décroissante.`,
      source: complement('Définition standard, utilisée dans la démonstration de la section 5.5'),
    },
  ],
  concepts: [
    {
      id: 'gronwall-signe',
      label: 'Signe et intégrabilité du coefficient',
      reminder: t`Grönwall exige $b\ge 0$ et $b\in L^1$ : pour $b=-1$ ou $b(t)=1/t$, la conclusion tombe.`,
    },
    {
      id: 'gronwall-cas-nul',
      label: 'Le cas a = 0',
      reminder: t`Pour $a=0$, la fonction majorante peut s'annuler : on ne prend pas son logarithme. On passe par $\varepsilon>0$, ou par le facteur intégrant $e^{-\int_0^tb}$.`,
    },
    {
      id: 'gronwall-reciproque',
      label: 'Non-réversibilité de Grönwall',
      reminder: t`$y\le a\exp(\int_0^tb)$ n'entraîne pas $y\le a+\int_0^tb\,y$ : par exemple $y=16t^2$, $a=2$, $b=3$, en $t=2/3$.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-gr-b-negatif',
      theoremId: 'gronwall',
      title: 'Coefficient négatif',
      claim: t`Si $y(t)\le a+\int_0^tb\,y$ avec $b\in L^1$ de signe quelconque, alors $y(t)\le a\exp(\int_0^tb)$.`,
      correctStatement: t`Le lemme exige $b\ge 0$.`,
      task: t`Pour $a=1$, $b=-1$ et $y(t)=\tfrac34t^2$ sur $[0,1]$, calcule $y(1)+\int_0^1y(s)\,ds$.`,
      check: { kind: 'rational', prompt: t`Valeur de $y(1)+\int_0^1y(s)\,ds$`, expected: '1' },
      explanation: t`$y(t)+\int_0^ty=\tfrac34t^2+\tfrac14t^3$ croît de $0$ à $1$ sur $[0,1]$ : l'hypothèse $y(t)\le 1-\int_0^ty$ est vraie. Mais $y(1)=\tfrac34>e^{-1}$, puisque $e>\tfrac43$.`,
      concept: 'gronwall-signe',
      source: poly(22, 'Hypothèse b ≥ 0, section 5.5'),
    },
    {
      id: 'ce-gr-a-variable',
      theoremId: 'gronwall',
      title: 'Terme constant non constant',
      claim: t`Si $y(t)\le a(t)+\int_0^tb\,y$ avec $a\ge 0$ continue et $b\ge 0$, alors $y(t)\le a(t)\exp(\int_0^tb)$.`,
      correctStatement: t`Le lemme est énoncé pour $a$ constante ; il s'étend à $a$ croissante.`,
      task: t`Pour $a(t)=1-t$, $b=1$ et $y\equiv 1$ sur $[0,1]$, donne $y(1)$ et $a(1)\,e^{1}$.`,
      check: { kind: 'rational-vector', prompt: t`Valeurs de $y(1)$ et de $a(1)\,e^{1}$`, expected: ['1', '0'], labels: ['y(1)', 'a(1)e'] },
      explanation: t`$1-t+\int_0^t1\,ds=1$ : l'hypothèse est une égalité. La conclusion annoncée donnerait $1\le 0$ en $t=1$.`,
      concept: 'hypotheses-theoreme',
      source: complement('Contre-exemple construit pour ProofLab'),
    },
    {
      id: 'ce-gr-reciproque',
      theoremId: 'gronwall',
      title: 'La réciproque est fausse',
      claim: t`Si $y(t)\le a\exp(\int_0^tb)$ pour tout $t$, alors $y(t)\le a+\int_0^tb\,y$ pour tout $t$.`,
      correctStatement: 'Le lemme de Grönwall est une implication, non une équivalence.',
      task: t`Pour $a=b=1$ et $y(t)=t^2$ sur $[0,2]$, calcule $y(3/2)-\big(1+\int_0^{3/2}y(s)\,ds\big)$.`,
      check: { kind: 'rational', prompt: t`Valeur de $y(3/2)-\big(1+\int_0^{3/2}y\big)$`, expected: '1/8' },
      explanation: t`$t^2\le e^t$ pour tout $t\ge 0$, mais $\tfrac94-\big(1+\tfrac98\big)=\tfrac18>0$ : l'hypothèse intégrale est violée en $t=3/2$.`,
      concept: 'gronwall-reciproque',
      source: complement('Contre-exemple construit pour ProofLab'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT23;
