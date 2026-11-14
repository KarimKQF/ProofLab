/**
 * Résultat 19 — Banach–Alaoglu.
 * Le polycopié n'en donne qu'une idée de preuve (p. PDF 20). Les exercices travaillent ce
 * qui est réellement démontrable : la définition de la topologie faible-*, l'extraction de
 * suites lorsque le prédual est séparable, la comparaison avec la convergence forte. La
 * démonstration complète par Tychonoff figure en variante de l'exercice intermédiaire.
 */
import { t, rubric, poly, complement, FROM_POLY, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'banach-alaoglu.facile',
  theoremId: 'banach-alaoglu',
  level: 'facile',
  title: t`Définir la topologie faible-* sur $X'$`,
  statement: t`Soit $X$ un espace normé réel, $X'$ son dual topologique et, pour $x\in X$, $J_x:X'\to\mathbb R$ l'évaluation $J_x(\ell)=\ell(x)$. Définir la topologie faible-* $\sigma(X',X)$ : établir qu'il existe une topologie la moins fine rendant continues toutes les $J_x$, décrire ses voisinages de base, caractériser la convergence des suites, et montrer sur $\ell^1=(c_0)'$ qu'elle ne coïncide pas avec la topologie faible $\sigma(X',X'')$.`,
  source: poly(41, 'Exercice 19, facile (notation de la section 5.2, p. PDF 20)'),
  prerequisites: [],
  concepts: ['faible-etoile', 'banach-alaoglu-topologie-initiale', 'quantificateurs', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-X', kind: 'hypothese', text: t`$X$ est un espace normé réel ; les éléments de son dual $X'$ sont les formes linéaires continues sur $X$.` },
      { id: 'd-J', kind: 'definition', text: t`Pour $x\in X$, $J_x:X'\to\mathbb R$ est l'évaluation $J_x(\ell)=\ell(x)$.` },
      { id: 'd-B', kind: 'definition', text: t`$\mathcal B$ est la famille des intersections finies $\bigcap_{i=1}^kJ_{x_i}^{-1}(O_i)$, avec $k\in\mathbb N$, $x_i\in X$ et $O_i$ ouvert de $\mathbb R$ (l'intersection vide valant $X'$).` },
      { id: 'd-T', kind: 'definition', text: t`$\mathcal T$ est la famille des réunions quelconques d'éléments de $\mathcal B$.` },

      { id: 'b-stable', kind: 'consequence', text: t`$\mathcal B$ contient $X'$ et est stable par intersection finie.` },
      { id: 't-topo', kind: 'consequence', text: t`$\mathcal T$ est une topologie sur $X'$.` },
      { id: 't-cont', kind: 'consequence', text: t`Pour tout $x\in X$, $J_x$ est continue de $(X',\mathcal T)$ dans $\mathbb R$.` },
      { id: 't-min', kind: 'inclusion', text: t`Toute topologie $\mathcal T'$ sur $X'$ rendant continues toutes les $J_x$ contient $\mathcal T$.` },
      { id: 'sigma', kind: 'consequence', text: t`$\mathcal T$ est la topologie la moins fine sur $X'$ rendant continues toutes les évaluations $J_x$, $x\in X$ : c'est, par définition, la topologie faible-* $\sigma(X',X)$.` },
      { id: 'v-base', kind: 'consequence', text: t`Les ensembles $V(\ell_0;x_1,\dots,x_k;\varepsilon)=\{\ell\in X' : |\ell(x_i)-\ell_0(x_i)|<\varepsilon,\ 1\le i\le k\}$, avec $k\ge 1$, $x_i\in X$ et $\varepsilon>0$, forment une base de voisinages de $\ell_0$ pour $\sigma(X',X)$.` },

      { id: 'd-suite', kind: 'definition', local: true, text: t`Soient $(\ell_n)$ une suite de $X'$ et $\ell\in X'$.` },
      { id: 's-dir', kind: 'consequence', text: t`Si $\ell_n\to\ell$ pour $\sigma(X',X)$, alors $\ell_n(x)\to\ell(x)$ pour tout $x\in X$.` },
      { id: 's-rec', kind: 'consequence', text: t`Si $\ell_n(x)\to\ell(x)$ pour tout $x\in X$, alors $\ell_n\to\ell$ pour $\sigma(X',X)$.` },
      { id: 's-carac', kind: 'consequence', text: t`$\ell_n\overset{*}{\rightharpoonup}\ell$ si et seulement si $\ell_n(x)\to\ell(x)$ pour tout $x\in X$.` },
      { id: 'sep', kind: 'consequence', text: t`$\sigma(X',X)$ est séparée : une suite de $X'$ a au plus une limite faible-*.` },

      { id: 'd-c0', kind: 'definition', text: t`Témoin : $X=c_0$, dont le dual s'identifie à $\ell^1$ par $\langle a,x\rangle=\sum_ka_kx_k$, le dual de $\ell^1$ s'identifiant à $\ell^\infty$ ; $e_n$ désigne le $n$-ième vecteur de la base canonique de $\ell^1$.` },
      {
        id: 'c-etoile',
        kind: 'egalite',
        text: t`Pour tout $x\in c_0$ : $\langle e_n,x\rangle=x_n\to 0$, donc $e_n\overset{*}{\rightharpoonup}0$ pour $\sigma(\ell^1,c_0)$.`,
        masked: t`Limite de $\langle e_n,x\rangle$ pour $x\in c_0$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Pour $x\in c_0$, valeur de $\lim_{n\to\infty}\langle e_n,x\rangle$`, expected: '0' },
      },
      {
        id: 'c-nf',
        kind: 'egalite',
        text: t`Pour $\phi=(1,1,1,\dots)\in\ell^\infty$ : $\langle\phi,e_n\rangle=1$ pour tout $n$, donc $(e_n)$ ne converge pas vers $0$ pour $\sigma(\ell^1,\ell^\infty)$.`,
        masked: t`Valeur de $\langle\phi,e_n\rangle$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\langle\phi,e_n\rangle$ pour $\phi=(1,1,1,\dots)$`, expected: '1' },
      },
      { id: 'c-diff', kind: 'consequence', text: t`$\sigma(\ell^1,c_0)\neq\sigma(\ell^1,\ell^\infty)$ : la topologie faible-* $\sigma(X',X)$ n'est pas, en général, la topologie faible $\sigma(X',X'')$.` },

      { id: 'fin', kind: 'conclusion', text: t`$\sigma(X',X)$ est la topologie la moins fine rendant continues les $J_x$, $x\in X$ ; les $V(\ell_0;x_1,\dots,x_k;\varepsilon)$ en forment une base de voisinages ; $\ell_n\overset{*}{\rightharpoonup}\ell$ équivaut à $\ell_n(x)\to\ell(x)$ pour tout $x\in X$ ; elle est séparée, et distincte en général de $\sigma(X',X'')$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-fine', kind: 'consequence', distractor: true, text: t`$\sigma(X',X)$ est la topologie la plus fine rendant continues toutes les évaluations $J_x$.` },
      { id: 'x-bidual', kind: 'consequence', distractor: true, text: t`$\ell_n\overset{*}{\rightharpoonup}\ell$ signifie $\eta(\ell_n)\to\eta(\ell)$ pour tout $\eta\in X''$.` },
      { id: 'x-uniforme', kind: 'consequence', distractor: true, text: t`$\ell_n\overset{*}{\rightharpoonup}\ell$ signifie $\sup_{\|x\|_X\le 1}|\ell_n(x)-\ell(x)|\to 0$.` },
      { id: 'x-boule', kind: 'consequence', distractor: true, after: ['v-base'], text: t`Si $\dim X=\infty$, toute boule ouverte de $X'$ pour la norme duale est un voisinage de son centre pour $\sigma(X',X)$.` },
    ],
    justifications: [
      { id: 'j-inter', label: t`L'intersection de deux intersections finies d'ensembles $J_x^{-1}(O)$ en est encore une ; l'intersection vide est $X'$.` },
      { id: 'j-engendre', label: t`Les réunions d'une famille contenant l'espace et stable par intersection finie forment une topologie, car $(\bigcup_iB_i)\cap(\bigcup_jB'_j)=\bigcup_{i,j}(B_i\cap B'_j)$.` },
      { id: 'j-preimage', label: t`Pour tout ouvert $O$ de $\mathbb R$, l'image réciproque $J_x^{-1}(O)$ appartient à $\mathcal B\subset\mathcal T$.` },
      { id: 'j-minimal', label: t`Si $\mathcal T'$ rend continues les $J_x$, elle contient les $J_x^{-1}(O)$, donc leurs intersections finies et leurs réunions.` },
      { id: 'j-moins-fine', label: 'Continuité des évaluations et minimalité caractérisent la topologie la moins fine rendant ces applications continues.' },
      { id: 'j-base', label: t`Chaque $V$ appartient à $\mathcal B$ et contient $\ell_0$ ; un élément de $\mathcal B$ contenant $\ell_0$ contient un $V$ : on prend pour $\varepsilon$ le plus petit des rayons d'intervalles centrés en $\ell_0(x_i)$ inclus dans les $O_i$.` },
      { id: 'j-composee', label: 'L’image d’une suite convergente par une application continue converge vers l’image de la limite.' },
      { id: 'j-rang', label: t`Pour $V(\ell;x_1,\dots,x_k;\varepsilon)$, on choisit un rang $N_i$ pour chacun des $k$ points, puis $N=\max_iN_i$.` },
      { id: 'j-equiv', label: 'Réunion des deux implications.' },
      { id: 'j-separe', label: t`Si $\ell\neq\ell'$, il existe $x\in X$ avec $\ell(x)\neq\ell'(x)$ ; les images réciproques par $J_x$ de deux intervalles disjoints séparent $\ell$ et $\ell'$.` },
      { id: 'j-c0', label: t`Définition de $c_0$, puis caractérisation séquentielle de la convergence faible-*.` },
      { id: 'j-phi', label: t`La suite constante $\phi$ est bornée, donc $\phi\in\ell^\infty$, et $\langle\phi,e_n\rangle=\sum_k\phi_k(e_n)_k$.` },
      { id: 'j-distinct', label: 'Une suite qui converge pour l’une des topologies et non pour l’autre montre qu’elles diffèrent.' },
      { id: 'j-synthese', label: 'Réunion des propriétés établies.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-evident', label: 'C’est évident.' },
      { id: 'j-plus-fine', label: 'Plus une topologie est fine, plus elle rend d’applications continues : la topologie cherchée est la plus fine possible.' },
      { id: 'j-bidual', label: t`On teste la convergence contre tous les éléments du bidual $X''$.` },
    ],
    rules: [
      { from: ['h-X', 'd-J', 'd-B'], to: 'b-stable', by: 'j-inter' },
      { from: ['b-stable', 'd-T'], to: 't-topo', by: 'j-engendre' },
      { from: ['t-topo', 'd-J', 'd-B', 'd-T'], to: 't-cont', by: 'j-preimage' },
      { from: ['t-topo', 'd-B', 'd-T'], to: 't-min', by: 'j-minimal' },
      { from: ['t-cont', 't-min'], to: 'sigma', by: 'j-moins-fine' },
      { from: ['sigma', 'd-B', 'd-T'], to: 'v-base', by: 'j-base' },
      { from: ['sigma', 'd-suite'], to: 's-dir', by: 'j-composee' },
      { from: ['v-base', 'd-suite'], to: 's-rec', by: 'j-rang' },
      { from: ['s-dir', 's-rec'], to: 's-carac', by: 'j-equiv' },
      { from: ['h-X', 'sigma'], to: 'sep', by: 'j-separe' },
      { from: ['s-carac', 'd-c0'], to: 'c-etoile', by: 'j-c0' },
      { from: ['d-c0'], to: 'c-nf', by: 'j-phi' },
      { from: ['c-etoile', 'c-nf'], to: 'c-diff', by: 'j-distinct' },
      { from: ['sigma', 'v-base', 's-carac', 'sep', 'c-diff'], to: 'fin', by: 'j-synthese' },
    ],
    traps: [
      {
        conclusion: 'x-fine',
        verdict: 'incorrect',
        concept: 'banach-alaoglu-topologie-initiale',
        message: t`La topologie la plus fine rendant continues les $J_x$ est la topologie discrète, pour laquelle toute application est continue : ce n'est pas un objet utile. La topologie faible-* est la moins fine.`,
        counterexample: t`Pour la topologie discrète de $X'$, toutes les $J_x$ sont continues, et seules les suites stationnaires convergent.`,
      },
      {
        conclusion: 'sigma',
        by: 'j-plus-fine',
        verdict: 'incorrect',
        concept: 'banach-alaoglu-topologie-initiale',
        message: t`Cette justification mène à la topologie discrète. On cherche au contraire le minimum d'ouverts compatible avec la continuité des $J_x$.`,
      },
      {
        conclusion: 'x-bidual',
        verdict: 'incorrect',
        concept: 'faible-etoile',
        message: t`Tester contre $X''$ définit la convergence faible $\sigma(X',X'')$. La convergence faible-* ne teste que contre les éléments de $X$.`,
        counterexample: t`Dans $\ell^1=(c_0)'$ : $e_n\overset{*}{\rightharpoonup}0$, alors que $\langle\phi,e_n\rangle=1$ pour $\phi=(1,1,\dots)\in\ell^\infty=(\ell^1)'$.`,
      },
      {
        conclusion: 's-carac',
        by: 'j-bidual',
        verdict: 'incorrect',
        concept: 'faible-etoile',
        message: t`Les tests sont les éléments de $X$, et non ceux de $X''$ : tester contre le bidual caractérise une autre convergence.`,
      },
      {
        conclusion: 'x-uniforme',
        verdict: 'incorrect',
        concept: 'faible-etoile',
        message: t`La convergence uniforme sur la boule unité de $X$ est la convergence en norme duale. La convergence faible-* est une convergence point par point.`,
        counterexample: t`Dans $\ell^1=(c_0)'$ : $e_n\overset{*}{\rightharpoonup}0$, mais $\|e_n\|_{\ell^1}=1$ pour tout $n$.`,
      },
      {
        conclusion: 'x-boule',
        verdict: 'incorrect',
        concept: 'faible-etoile',
        message: t`Un voisinage de base n'impose qu'un nombre fini de conditions : $V(\ell_0;x_1,\dots,x_k;\varepsilon)$ contient $\ell_0+\bigcap_{i=1}^k\ker J_{x_i}$, sous-espace affine de codimension finie, non réduit à un point lorsque $\dim X'=\infty$, donc non borné.`,
        counterexample: t`Si $\psi\neq 0$ annule $x_1,\dots,x_k$, les formes $\ell_0+n\psi$ sont toutes dans $V(\ell_0;x_1,\dots,x_k;\varepsilon)$, et $\|n\psi\|_{X'}\to\infty$ : aucune boule de centre $\ell_0$ ne contient ce voisinage de base.`,
      },
      {
        conclusion: 't-topo',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`Une famille d'ensembles n'est pas d'office une topologie : vérifie la stabilité par intersection finie et par réunion.`,
      },
      {
        conclusion: 's-rec',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'quantificateurs',
        message: t`Le rang doit convenir simultanément aux $k$ points qui définissent le voisinage : prends le maximum d'un nombre fini de rangs.`,
      },
    ],
    removable: [
      {
        hypothesis: 't-min',
        label: 'Ne plus exiger la minimalité',
        necessary: true,
        explanation: t`La seule continuité des évaluations ne singularise pas $\sigma(X',X)$ : plusieurs topologies la vérifient.`,
        counterexample: t`La topologie de la norme duale et la topologie discrète rendent aussi continues toutes les $J_x$ ; lorsque $\dim X=\infty$, elles sont strictement plus fines que $\sigma(X',X)$.`,
      },
      {
        hypothesis: 'd-c0',
        label: t`Ne plus disposer du témoin $c_0$`,
        necessary: true,
        explanation: 'Sans espace témoin, rien ne distingue les deux topologies : elles coïncident pour certains espaces.',
        counterexample: t`Si $X$ est réflexif, par exemple $X=\ell^2$, tout élément de $X''$ est une évaluation en un point de $X$, donc $\sigma(X',X)=\sigma(X',X'')$.`,
      },
    ],
  },
  closedChecks: [
    {
      kind: 'choice',
      prompt: t`Contre quels éléments teste-t-on la convergence faible-* d'une suite de $X'$ ?`,
      options: [t`Les éléments de $X$, un par un`, t`Les éléments de $X''$`, t`Les éléments de $X'$`, t`Les éléments de la boule unité de $X$, uniformément`],
      correct: [0],
      explanation: t`$\ell_n\overset{*}{\rightharpoonup}\ell$ signifie $\ell_n(x)\to\ell(x)$ pour tout $x\in X$, sans uniformité.`,
    },
  ],
  solution: t`**Construction.** Pour $x\in X$, posons $J_x(\ell)=\ell(x)$. La famille $\mathcal B$ des intersections finies d'ensembles $J_x^{-1}(O)$, $O$ ouvert de $\mathbb R$, contient $X'$ (intersection vide) et est stable par intersection finie. Ses réunions forment donc une topologie $\mathcal T$, car $(\bigcup_iB_i)\cap(\bigcup_jB'_j)=\bigcup_{i,j}(B_i\cap B'_j)$.

**Minimalité.** Chaque $J_x$ est continue pour $\mathcal T$, puisque $J_x^{-1}(O)\in\mathcal B$. Si $\mathcal T'$ rend continues toutes les $J_x$, elle contient les $J_x^{-1}(O)$, donc leurs intersections finies et leurs réunions : $\mathcal T\subset\mathcal T'$. Ainsi $\mathcal T$ est la topologie la moins fine rendant les $J_x$ continues : c'est $\sigma(X',X)$. La topologie *la plus fine* ayant cette propriété serait la topologie discrète, sans intérêt.

**Voisinages.** Les $V(\ell_0;x_1,\dots,x_k;\varepsilon)=\{\ell : |\ell(x_i)-\ell_0(x_i)|<\varepsilon,\ i\le k\}$ appartiennent à $\mathcal B$ et contiennent $\ell_0$. Réciproquement, si $\ell_0\in\bigcap_iJ_{x_i}^{-1}(O_i)$, chaque $O_i$ contient un intervalle $]\ell_0(x_i)-\varepsilon_i,\ell_0(x_i)+\varepsilon_i[$, et $\varepsilon=\min_i\varepsilon_i$ convient.

**Suites.** Si $\ell_n\to\ell$ pour $\sigma(X',X)$, la continuité de $J_x$ donne $\ell_n(x)\to\ell(x)$. Réciproquement, si $\ell_n(x)\to\ell(x)$ pour tout $x$, un voisinage $V(\ell;x_1,\dots,x_k;\varepsilon)$ contient $\ell_n$ pour $n\ge\max_iN_i$. Donc $\ell_n\overset{*}{\rightharpoonup}\ell$ si et seulement si $\ell_n(x)\to\ell(x)$ pour tout $x\in X$.

**Séparation.** Si $\ell\neq\ell'$, il existe $x$ avec $\ell(x)\neq\ell'(x)$, et deux intervalles disjoints autour de ces valeurs donnent, par $J_x^{-1}$, deux ouverts disjoints.

**Ce n'est pas la topologie faible.** Pour $X=c_0$, $X'=\ell^1$ et $X''=\ell^\infty$ : $\langle e_n,x\rangle=x_n\to 0$ pour tout $x\in c_0$, donc $e_n\overset{*}{\rightharpoonup}0$ ; mais $\phi=(1,1,\dots)\in\ell^\infty$ donne $\langle\phi,e_n\rangle=1$. Ainsi $\sigma(\ell^1,c_0)\neq\sigma(\ell^1,\ell^\infty)$.`,
  steps: [
    t`Construire la famille $\mathcal B$ et vérifier que ses réunions forment une topologie.`,
    t`Montrer que les $J_x$ sont continues et que toute topologie qui les rend continues contient $\mathcal T$.`,
    'Décrire les voisinages de base.',
    'Caractériser la convergence des suites, dans les deux sens.',
    t`Exhiber, dans $\ell^1=(c_0)'$, une suite faible-* convergente qui ne converge pas faiblement.`,
  ],
  commonErrors: [
    { id: 'e-bidual', description: t`Tester la convergence faible-* contre les éléments de $X''$.`, concept: 'faible-etoile' },
    { id: 'e-plus-fine', description: 'Écrire « la plus fine » au lieu de « la moins fine ».', concept: 'banach-alaoglu-topologie-initiale' },
    { id: 'e-uniforme', description: 'Confondre convergence point par point et convergence uniforme sur la boule unité.', concept: 'faible-etoile' },
    { id: 'e-rang', description: 'Choisir un rang qui ne convient qu’à un seul des points définissant le voisinage.', concept: 'quantificateurs' },
  ],
  hints: [
    t`Quelles applications de $X'$ dans $\mathbb R$ doivent devenir continues, et combien d'ouverts faut-il au minimum pour cela ?`,
    t`Pars des images réciproques $J_x^{-1}(O)$, prends leurs intersections finies, puis les réunions. Pour les suites, traite séparément les deux implications.`,
    t`Pour distinguer $\sigma(X',X)$ de $\sigma(X',X'')$, prends $X=c_0$ : teste $e_n$ contre $x\in c_0$, puis contre la suite constante $(1,1,\dots)\in\ell^\infty$.`,
  ],
  rubric: rubric({
    hypotheses: t`L'espace des tests ($X$, et non $X''$) est clairement identifié.`,
    methode: 'La topologie est construite à partir des images réciproques, puis sa minimalité est démontrée.',
    validite: 'Les voisinages de base et la caractérisation séquentielle sont établis dans les deux sens.',
    justifications: 'Le choix d’un rang commun et la séparation sont justifiés.',
    conclusion: t`La définition exacte est obtenue, et la différence avec $\sigma(X',X'')$ est démontrée sur $c_0$.`,
  }),
  variant: {
    statement: t`Dans $\ell^\infty=(\ell^1)'$, on pose $s_n=(0,\dots,0,1,1,\dots)$, les $n-1$ premiers termes étant nuls. Montrer que $s_n\overset{*}{\rightharpoonup}0$ pour $\sigma(\ell^\infty,\ell^1)$, que $\|s_n\|_{\ell^\infty}=1$ pour tout $n$, et que $(s_n)$ ne converge pas vers $0$ pour la topologie faible $\sigma(\ell^\infty,(\ell^\infty)')$.`,
    solution: t`Pour $x\in\ell^1$, $\langle s_n,x\rangle=\sum_{k\ge n}x_k$ est le reste d'une série absolument convergente, donc tend vers $0$ : $s_n\overset{*}{\rightharpoonup}0$. Par ailleurs $\|s_n\|_{\ell^\infty}=1$. Sur le sous-espace $c$ des suites convergentes, la forme $\lambda(x)=\lim_kx_k$ vérifie $|\lambda(x)|\le\|x\|_{\ell^\infty}$ ; Hahn–Banach la prolonge en $\Lambda\in(\ell^\infty)'$. Comme $s_n\in c$ et $\lim_k(s_n)_k=1$, on a $\Lambda(s_n)=1$ pour tout $n$ : $(s_n)$ ne converge pas faiblement vers $0$. La convergence faible-* n'entraîne ni la convergence faible ni la convergence en norme.`,
    closedChecks: [{ kind: 'rational', prompt: t`Valeur de $\Lambda(s_n)$`, expected: '1' }],
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'banach-alaoglu.intermediaire',
  theoremId: 'banach-alaoglu',
  level: 'intermediaire',
  title: t`Extraction faible-* dans $L^\infty$, prédual séparable`,
  statement: t`Soit $\Omega$ un ouvert de $\mathbb R^d$ et $(u_n)$ une suite de $L^\infty(\Omega)$ telle que $\|u_n\|_{L^\infty(\Omega)}\le M$ pour tout $n$. On admet que $L^1(\Omega)$ est séparable et que $v\mapsto\big(\varphi\mapsto\int_\Omega v\varphi\big)$ est une isométrie bijective de $L^\infty(\Omega)$ sur $(L^1(\Omega))'$. Expliquer pourquoi il existe une sous-suite $(u_{n_k})$ et $u\in L^\infty(\Omega)$, $\|u\|_{L^\infty(\Omega)}\le M$, tels que $u_{n_k}\overset{*}{\rightharpoonup}u$, c'est-à-dire $\int_\Omega u_{n_k}\varphi\to\int_\Omega u\varphi$ pour toute $\varphi\in L^1(\Omega)$.`,
  source: poly(41, 'Exercice 19, intermédiaire'),
  prerequisites: [],
  concepts: ['banach-alaoglu-sequentiel', 'faible-etoile', 'faible-fort', 'convergence-pp', 'hypotheses-theoreme'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'diagonale', label: 'Extraction diagonale sur une partie dense' },
      { id: 'metrisation', label: 'Banach–Alaoglu et métrisabilité de la boule' },
    ],
    nodes: [
      { id: 'h-sep', kind: 'hypothese', text: t`$L^1(\Omega)$ est séparable.` },
      { id: 'h-dual', kind: 'hypothese', text: t`$v\mapsto\langle v,\cdot\rangle$, où $\langle v,\varphi\rangle=\int_\Omega v\varphi$, est une isométrie bijective de $L^\infty(\Omega)$ sur $(L^1(\Omega))'$.` },
      { id: 'h-borne', kind: 'hypothese', text: t`$\|u_n\|_{L^\infty(\Omega)}\le M$ pour tout $n$.` },

      { id: 'dense', kind: 'consequence', text: t`Il existe une suite $(\varphi_j)_{j\ge 1}$ dense dans $L^1(\Omega)$.` },

      { id: 'd-borne', kind: 'inegalite', text: t`Pour tous $j$ et $n$ : $\big|\int_\Omega u_n\varphi_j\big|\le M\|\varphi_j\|_{L^1(\Omega)}$.` },
      { id: 'd-diag', kind: 'consequence', text: t`Il existe une sous-suite $(u_{n_k})$ telle que $\big(\int_\Omega u_{n_k}\varphi_j\big)_k$ converge pour tout $j$.` },
      { id: 'd-cauchy', kind: 'consequence', text: t`Pour toute $\varphi\in L^1(\Omega)$, la suite $\big(\int_\Omega u_{n_k}\varphi\big)_k$ est de Cauchy.` },
      { id: 'd-forme', kind: 'consequence', text: t`$\Lambda(\varphi)=\lim_k\int_\Omega u_{n_k}\varphi$ définit une forme linéaire sur $L^1(\Omega)$, avec $|\Lambda(\varphi)|\le M\|\varphi\|_{L^1(\Omega)}$.` },

      { id: 'm-compact', kind: 'application-theoreme', text: t`$B_M=\{\ell\in(L^1(\Omega))' : \|\ell\|\le M\}$ est compacte pour $\sigma\big((L^1)',L^1\big)$.` },
      { id: 'm-distance', kind: 'consequence', text: t`$d(\ell,\ell')=\sum_{j\ge 1}2^{-j}\dfrac{|(\ell-\ell')(\varphi_j)|}{1+\|\varphi_j\|_{L^1}}$ est une distance sur $B_M$, et l'identité de $(B_M,\sigma)$ dans $(B_M,d)$ est continue.` },
      { id: 'm-metrisable', kind: 'consequence', text: t`L'identité est un homéomorphisme : $(B_M,\sigma)$ est métrisable.` },
      { id: 'm-extrait', kind: 'consequence', text: t`La suite des formes $\langle u_n,\cdot\rangle$, contenue dans $B_M$, admet une sous-suite convergeant pour $\sigma\big((L^1)',L^1\big)$ vers un $\Lambda\in B_M$.` },

      { id: 'rep', kind: 'consequence', text: t`Il existe $u\in L^\infty(\Omega)$, avec $\|u\|_{L^\infty(\Omega)}\le M$, tel que $\Lambda(\varphi)=\int_\Omega u\varphi$ pour toute $\varphi\in L^1(\Omega)$.` },

      { id: 'fin', kind: 'conclusion', text: t`Il existe une sous-suite $(u_{n_k})$ et $u\in L^\infty(\Omega)$, $\|u\|_{L^\infty(\Omega)}\le M$, tels que $\int_\Omega u_{n_k}\varphi\to\int_\Omega u\varphi$ pour toute $\varphi\in L^1(\Omega)$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-forte', kind: 'consequence', distractor: true, text: t`Une sous-suite de $(u_n)$ converge dans $L^\infty(\Omega)$ pour la norme.` },
      { id: 'x-pp', kind: 'consequence', distractor: true, text: t`Une sous-suite de $(u_n)$ converge presque partout.` },
      { id: 'x-reflexif', kind: 'consequence', distractor: true, text: t`$L^\infty(\Omega)$ est réflexif : une sous-suite de $(u_n)$ converge faiblement dans $L^\infty(\Omega)$.` },
      { id: 'x-sans-sep', kind: 'consequence', distractor: true, after: ['m-compact'], text: t`La compacité faible-* de la boule suffit : dans le dual de tout espace normé, une suite bornée admet une sous-suite faiblement-* convergente.` },
    ],
    justifications: [
      { id: 'j-sep', label: 'Définition de la séparabilité.' },
      { id: 'j-holder', label: t`Hölder $L^\infty$–$L^1$ et borne uniforme sur $(u_n)$.` },
      { id: 'j-diag', label: t`Bolzano–Weierstrass sur chaque suite réelle bornée $\big(\int_\Omega u_n\varphi_j\big)_n$, puis extraction diagonale.` },
      { id: 'j-eps', label: t`Pour $\varepsilon>0$, choisir $j$ avec $\|\varphi-\varphi_j\|_{L^1}\le\varepsilon$ : $\big|\int_\Omega(u_{n_k}-u_{n_l})\varphi\big|\le 2M\varepsilon+\big|\int_\Omega(u_{n_k}-u_{n_l})\varphi_j\big|$.` },
      { id: 'j-limite', label: t`$\mathbb R$ est complet ; la linéarité et la majoration $\big|\int_\Omega u_{n_k}\varphi\big|\le M\|\varphi\|_{L^1}$ passent à la limite.` },
      { id: 'j-alaoglu', label: t`Théorème de Banach–Alaoglu, appliqué à l'espace normé $L^1(\Omega)$, puis homothétie de rapport $M$.`, theorem: 'banach-alaoglu' },
      { id: 'j-distance', label: t`Chaque terme est majoré par $2^{-j}\cdot 2M$ et continu pour $\sigma$ : la série converge uniformément ; deux formes égales sur une partie dense sont égales.` },
      { id: 'j-homeo', label: 'Une bijection continue d’un espace compact sur un espace séparé est un homéomorphisme.' },
      { id: 'j-seq', label: t`Un espace métrique compact est séquentiellement compact ; $\|u_n\|_{L^\infty}\le M$ place la suite dans $B_M$.` },
      { id: 'j-rep', label: t`Identification isométrique de $L^\infty(\Omega)$ au dual de $L^1(\Omega)$.` },
      { id: 'j-conclure', label: t`Définition de $\Lambda$ comme limite, puis représentation par $u$.` },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-reflexif', label: t`Extraction faible en espace réflexif, appliquée à $L^\infty(\Omega)$.`, theorem: 'extraction-reflexive' },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['h-sep'], to: 'dense', by: 'j-sep' },

      { from: ['h-borne', 'dense'], to: 'd-borne', by: 'j-holder', path: 'diagonale' },
      { from: ['d-borne'], to: 'd-diag', by: 'j-diag', path: 'diagonale' },
      { from: ['d-diag', 'dense', 'h-borne'], to: 'd-cauchy', by: 'j-eps', path: 'diagonale' },
      { from: ['d-cauchy', 'h-borne'], to: 'd-forme', by: 'j-limite', path: 'diagonale' },
      { from: ['d-forme', 'h-dual'], to: 'rep', by: 'j-rep', path: 'diagonale' },

      { from: ['h-dual'], to: 'm-compact', by: 'j-alaoglu', path: 'metrisation' },
      { from: ['m-compact', 'dense'], to: 'm-distance', by: 'j-distance', path: 'metrisation' },
      { from: ['m-compact', 'm-distance'], to: 'm-metrisable', by: 'j-homeo', path: 'metrisation' },
      { from: ['m-metrisable', 'h-borne', 'h-dual'], to: 'm-extrait', by: 'j-seq', path: 'metrisation' },
      { from: ['m-extrait', 'h-dual'], to: 'rep', by: 'j-rep', path: 'metrisation' },

      { from: ['rep', 'd-forme'], to: 'fin', by: 'j-conclure', path: 'diagonale' },
      { from: ['rep', 'm-extrait'], to: 'fin', by: 'j-conclure', path: 'metrisation' },
    ],
    traps: [
      {
        conclusion: 'x-forte',
        verdict: 'incorrect',
        concept: 'bornee-non-convergente',
        message: t`La boule de $L^\infty(\Omega)$ n'est pas compacte pour la norme : une suite bornée peut avoir ses termes deux à deux à distance fixe.`,
        counterexample: t`Fonctions de Rademacher sur $]0,1[$ : $r_n(x)=\operatorname{sign}\sin(2^n\pi x)$. Pour $n\neq m$, $r_n\neq r_m$ sur un ensemble de mesure $1/2$, donc $\|r_n-r_m\|_{L^\infty}=2$.`,
      },
      {
        conclusion: 'x-pp',
        verdict: 'incorrect',
        concept: 'convergence-pp',
        message: t`La convergence faible-* n'apporte aucune information ponctuelle.`,
        counterexample: t`Si $r_{n_k}\to f$ presque partout, la convergence dominée donne $r_{n_k}\to f$ dans $L^1(]0,1[)$, alors que $\|r_n-r_m\|_{L^1}=1$ pour $n\neq m$.`,
      },
      {
        conclusion: 'x-reflexif',
        verdict: 'incorrect',
        concept: 'faible-etoile',
        message: t`$L^\infty(\Omega)$ n'est pas réflexif : c'est précisément pourquoi on utilise la topologie faible-*, qui ne teste que contre $L^1(\Omega)$.`,
        counterexample: t`Sur $]0,1[$, $u_n=\mathbb 1_{]0,1/n[}$ : une limite faible serait nulle (tests contre $L^1$), alors qu'un prolongement de Hahn–Banach $\Lambda$ de $v\mapsto\lim_{x\to 0^+}v(x)$ vérifie $\Lambda(u_n)=1$ pour tout $n$.`,
      },
      {
        conclusion: 'd-diag',
        by: 'j-reflexif',
        verdict: 'incorrect',
        concept: 'faible-etoile',
        message: t`$L^\infty(\Omega)$ n'est pas réflexif : ce théorème ne s'applique pas ici. L'extraction repose sur la séparabilité de $L^1(\Omega)$.`,
      },
      {
        conclusion: 'x-sans-sep',
        verdict: 'incorrect',
        concept: 'banach-alaoglu-sequentiel',
        message: 'Compacité et compacité séquentielle diffèrent hors du cadre métrisable : sans hypothèse supplémentaire, telle que la séparabilité du prédual, l’extraction de suites peut échouer.',
        counterexample: t`Dans $(\ell^\infty)'$, soit $\ell_n(x)=x_n$. Pour toute extraction $(n_k)$, le choix $x_{n_k}=(-1)^k$ et $x_m=0$ sinon donne $\ell_{n_k}(x)=(-1)^k$, qui ne converge pas.`,
      },
      {
        conclusion: 'd-forme',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`La limite existe-t-elle pour toute $\varphi$, ou seulement pour les $\varphi_j$ ? Et pourquoi la forme limite est-elle continue ?`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-sep',
        label: t`Retirer la séparabilité du prédual`,
        necessary: true,
        explanation: 'Les deux voies utilisent une suite dense : sans elle, le procédé diagonal n’est plus disponible et la boule duale n’est plus métrisable pour la topologie faible-*.',
        counterexample: t`Pour $X=\ell^\infty$, non séparable, les $\ell_n(x)=x_n$ forment une suite bornée de $X'$ sans sous-suite faiblement-* convergente : pour $x_{n_k}=(-1)^k$, $\ell_{n_k}(x)=(-1)^k$.`,
      },
      {
        hypothesis: 'h-borne',
        label: 'Retirer la borne uniforme',
        necessary: true,
        explanation: 'Sans borne uniforme, les intégrales testées peuvent diverger.',
        counterexample: t`Sur $\Omega=]0,1[$, $u_n=n$ et $\varphi=1$ : $\int_\Omega u_n\varphi=n\to+\infty$, et aucune sous-suite ne converge faiblement-*.`,
      },
    ],
  },
  closedChecks: [
    { kind: 'rational', prompt: t`Pour les fonctions de Rademacher $r_n$ sur $]0,1[$ et $n\neq m$, valeur de $\|r_n-r_m\|_{L^\infty(]0,1[)}$`, expected: '2' },
  ],
  solution: t`**Une partie dense.** $L^1(\Omega)$ étant séparable, soit $(\varphi_j)$ dense dans $L^1(\Omega)$.

**Voie diagonale.** Pour chaque $j$, $\big|\int_\Omega u_n\varphi_j\big|\le M\|\varphi_j\|_{L^1}$ : la suite réelle est bornée. Bolzano–Weierstrass et l'extraction diagonale donnent $(n_k)$ telle que $\int_\Omega u_{n_k}\varphi_j$ converge pour tout $j$. Pour $\varphi\in L^1(\Omega)$ et $\varepsilon>0$, choisissons $j$ avec $\|\varphi-\varphi_j\|_{L^1}\le\varepsilon$ : $\big|\int_\Omega(u_{n_k}-u_{n_l})\varphi\big|\le 2M\varepsilon+\big|\int_\Omega(u_{n_k}-u_{n_l})\varphi_j\big|$, d'où une suite de Cauchy. Sa limite $\Lambda(\varphi)$ est linéaire en $\varphi$ et vérifie $|\Lambda(\varphi)|\le M\|\varphi\|_{L^1}$.

**Voie par Banach–Alaoglu.** La boule $B_M$ de $(L^1)'$ est compacte pour $\sigma((L^1)',L^1)$. La formule $d(\ell,\ell')=\sum_j2^{-j}|(\ell-\ell')(\varphi_j)|/(1+\|\varphi_j\|_{L^1})$ définit une distance sur $B_M$ (deux formes égales sur une partie dense sont égales), et l'identité $(B_M,\sigma)\to(B_M,d)$ est continue, la série convergeant uniformément. Bijection continue d'un compact sur un séparé, c'est un homéomorphisme : $(B_M,\sigma)$ est un compact métrisable, donc séquentiellement compact.

**Représentation.** Dans les deux cas, la forme limite $\Lambda$, de norme au plus $M$, s'écrit $\Lambda(\varphi)=\int_\Omega u\varphi$ avec $\|u\|_{L^\infty}\le M$, par l'identification $L^\infty=(L^1)'$.

**Ce qu'on n'obtient pas.** Ni convergence en norme $L^\infty$, ni convergence presque partout (fonctions de Rademacher), ni convergence faible : $L^\infty$ n'est pas réflexif. Sans séparabilité, l'extraction de suites peut échouer, par exemple dans $(\ell^\infty)'$.`,
  steps: [
    t`Fixer une suite dense $(\varphi_j)$ de $L^1(\Omega)$.`,
    'Extraire une sous-suite par le procédé diagonal, ou par métrisation de la boule compacte.',
    t`Étendre la convergence à toute $\varphi\in L^1(\Omega)$ grâce à la borne uniforme.`,
    t`Représenter la forme limite par un $u\in L^\infty(\Omega)$ de norme au plus $M$.`,
  ],
  commonErrors: [
    { id: 'e-reflexif', description: t`Invoquer la réflexivité de $L^\infty$, qui est fausse.`, concept: 'faible-etoile' },
    { id: 'e-sans-sep', description: 'Extraire une sous-suite de la seule compacité faible-*, sans séparabilité.', concept: 'banach-alaoglu-sequentiel' },
    { id: 'e-pp', description: 'Déduire une convergence presque partout de la convergence faible-*.', concept: 'convergence-pp' },
  ],
  hints: [
    t`Quel espace teste la convergence faible-* dans $L^\infty(\Omega)$, et quelle propriété de cet espace rend une extraction de suites possible ?`,
    t`Une suite dense $(\varphi_j)$ réduit le problème à une famille dénombrable de suites réelles bornées : pense au procédé diagonal.`,
    t`Après la diagonale, l'inégalité $\big|\int(u_{n_k}-u_{n_l})\varphi\big|\le 2M\|\varphi-\varphi_j\|_{L^1}+\big|\int(u_{n_k}-u_{n_l})\varphi_j\big|$ donne une suite de Cauchy pour toute $\varphi$.`,
  ],
  rubric: rubric({
    hypotheses: t`La séparabilité de $L^1(\Omega)$ et l'identification $L^\infty=(L^1)'$ sont explicitement utilisées.`,
    methode: 'L’extraction diagonale ou la métrisation de la boule compacte est menée jusqu’au bout.',
    validite: t`Le passage d'une partie dense à toute $\varphi\in L^1$ utilise la borne uniforme.`,
    justifications: 'La forme limite est représentée, avec la borne de sa norme.',
    conclusion: t`La sous-suite et la limite $u$, de norme au plus $M$, sont obtenues, sans prétendre à une convergence plus forte.`,
  }),
  variant: {
    statement: t`Soit $X$ un espace normé réel. Démontrer le théorème de Banach–Alaoglu : la boule unité fermée $B_{X'}$ de $X'$ est compacte pour $\sigma(X',X)$, en suivant l'idée du polycopié (produit d'intervalles compacts, relations de linéarité fermées).`,
    solution: t`Pour $\ell\in B_{X'}$ et $x\in X$, $|\ell(x)|\le\|x\|$ : l'application $\Phi(\ell)=(\ell(x))_{x\in X}$ envoie $B_{X'}$ dans $P=\prod_{x\in X}[-\|x\|,\|x\|]$, compact par Tychonoff. $\Phi$ est injective, et c'est un homéomorphisme de $(B_{X'},\sigma(X',X))$ sur son image munie de la topologie induite, car les deux topologies sont engendrées par les coordonnées $\ell\mapsto\ell(x)$. L'image est $L=\{\omega\in P : \omega_{x+y}=\omega_x+\omega_y,\ \omega_{\lambda x}=\lambda\omega_x\}$ : un élément de $L$ définit une forme linéaire de norme au plus $1$. Chaque relation est l'égalité de deux fonctions continues d'un nombre fini de coordonnées, donc $L$ est fermé dans le compact $P$, donc compact. On conclut par $\Phi^{-1}$, continue sur $L$.`,
    proof: {
      purpose: 'demonstration',
      goal: 'fin',
      nodes: [
        { id: 'h-X', kind: 'hypothese', text: t`$X$ est un espace normé réel et $B_{X'}=\{\ell\in X' : \|\ell\|_{X'}\le 1\}$.` },
        { id: 'd-P', kind: 'definition', text: t`$P=\prod_{x\in X}[-\|x\|,\|x\|]$, muni de la topologie produit.` },
        { id: 'd-Phi', kind: 'definition', text: t`$\Phi:B_{X'}\to\mathbb R^X$, $\Phi(\ell)=(\ell(x))_{x\in X}$.` },
        { id: 'd-L', kind: 'definition', text: t`$L=\{\omega\in P : \omega_{x+y}=\omega_x+\omega_y\ \text{et}\ \omega_{\lambda x}=\lambda\omega_x\ \text{pour tous}\ x,y\in X,\ \lambda\in\mathbb R\}$.` },
        { id: 'p-compact', kind: 'application-theoreme', text: t`$P$ est compact.` },
        { id: 'p-image', kind: 'inclusion', text: t`$\Phi(B_{X'})\subset P$.` },
        { id: 'p-inj', kind: 'consequence', text: t`$\Phi$ est injective.` },
        { id: 'p-homeo', kind: 'consequence', text: t`$\Phi$ est un homéomorphisme de $(B_{X'},\sigma(X',X))$ sur $\Phi(B_{X'})$, muni de la topologie induite par $P$.` },
        { id: 'l-ferme', kind: 'consequence', text: t`$L$ est fermé dans $P$.` },
        { id: 'l-egal', kind: 'egalite', text: t`$\Phi(B_{X'})=L$.` },
        { id: 'l-compact', kind: 'consequence', text: t`$L$ est compact.` },
        { id: 'fin', kind: 'conclusion', text: t`$B_{X'}$ est compacte pour la topologie faible-* $\sigma(X',X)$.` },
        { id: 'x-norme', kind: 'consequence', distractor: true, after: ['l-compact'], text: t`$B_{X'}$ est compacte pour la norme duale.` },
        { id: 'x-suites', kind: 'consequence', distractor: true, after: ['l-compact'], text: t`Toute suite de $B_{X'}$ admet une sous-suite convergente pour $\sigma(X',X)$.` },
      ],
      justifications: [
        { id: 'j-tychonoff', label: 'Théorème de Tychonoff : un produit de compacts est compact.', theorem: 'tychonoff' },
        { id: 'j-borne', label: t`Pour $\ell\in B_{X'}$ : $|\ell(x)|\le\|\ell\|_{X'}\|x\|\le\|x\|$.` },
        { id: 'j-inj', label: t`Deux formes ayant la même valeur en chaque point de $X$ sont égales.` },
        { id: 'j-coord', label: t`$\sigma(X',X)$ et la topologie produit sont engendrées par les mêmes applications coordonnées $\ell\mapsto\ell(x)$.` },
        { id: 'j-ferme', label: 'Chaque relation de linéarité est l’égalité de deux fonctions continues d’un nombre fini de coordonnées ; une intersection de fermés est fermée.' },
        { id: 'j-image', label: t`$\Phi(\ell)$ satisfait les relations de linéarité ; un $\omega\in L$ définit $\ell(x)=\omega_x$, linéaire et vérifiant $|\ell(x)|\le\|x\|$.` },
        { id: 'j-ferme-compact', label: 'Un fermé d’un compact est compact.' },
        { id: 'j-transport', label: t`$\Phi^{-1}$ est continue de $L$ dans $(B_{X'},\sigma(X',X))$, et l'image continue d'un compact est compacte.` },
        { id: 'j-suites', label: 'Caractérisation séquentielle des fermés.' },
        { id: 'j-alaoglu', label: 'Théorème de Banach–Alaoglu.', theorem: 'banach-alaoglu' },
      ],
      rules: [
        { from: ['d-P'], to: 'p-compact', by: 'j-tychonoff' },
        { from: ['h-X', 'd-P', 'd-Phi'], to: 'p-image', by: 'j-borne' },
        { from: ['d-Phi'], to: 'p-inj', by: 'j-inj' },
        { from: ['p-inj', 'd-Phi'], to: 'p-homeo', by: 'j-coord' },
        { from: ['d-L', 'd-P'], to: 'l-ferme', by: 'j-ferme' },
        { from: ['p-image', 'd-L', 'd-Phi', 'h-X'], to: 'l-egal', by: 'j-image' },
        { from: ['p-compact', 'l-ferme'], to: 'l-compact', by: 'j-ferme-compact' },
        { from: ['l-compact', 'l-egal', 'p-homeo'], to: 'fin', by: 'j-transport' },
      ],
      traps: [
        {
          conclusion: 'l-ferme',
          by: 'j-suites',
          verdict: 'incorrect',
          concept: 'banach-alaoglu-sequentiel',
          message: t`Pour $X\neq\{0\}$, $P$ est un produit non dénombrable d'intervalles non réduits à un point : il n'est pas métrisable, et les suites ne caractérisent pas ses fermés.`,
        },
        {
          conclusion: 'x-norme',
          verdict: 'incorrect',
          concept: 'faible-fort',
          message: 'La compacité est relative à la topologie faible-*. Pour la norme, la boule duale n’est compacte qu’en dimension finie.',
          counterexample: t`Dans $\ell^1=(c_0)'$, $\|e_n-e_m\|_{\ell^1}=2$ pour $n\neq m$ : aucune sous-suite de $(e_n)$ n'est de Cauchy.`,
        },
        {
          conclusion: 'x-suites',
          verdict: 'incorrect',
          concept: 'banach-alaoglu-sequentiel',
          message: 'La compacité obtenue n’est pas séquentielle en général ; elle le devient par exemple lorsque $X$ est séparable.',
          counterexample: t`$X=\ell^\infty$, $\ell_n(x)=x_n$ : pour toute extraction, $x_{n_k}=(-1)^k$ donne $\ell_{n_k}(x)=(-1)^k$.`,
        },
      ],
      removable: [
        {
          hypothesis: 'p-image',
          label: t`Ne plus disposer de la borne $|\ell(x)|\le\|x\|$`,
          necessary: true,
          explanation: t`Sans borne, les facteurs ne sont plus compacts et Tychonoff ne s'applique plus : $X'$ tout entier n'est pas compact.`,
          counterexample: t`Si $X\neq\{0\}$, soit $\ell_0\in X'$ et $x\in X$ avec $\ell_0(x)\neq 0$ : $J_x$ est continue pour $\sigma(X',X)$ et non bornée sur $X'$ (elle prend la valeur $n\ell_0(x)$ en $n\ell_0$), donc $X'$ n'est pas compact.`,
        },
      ],
    },
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'banach-alaoglu.difficile',
  theoremId: 'banach-alaoglu',
  level: 'difficile',
  title: t`Faible-* dans $L^\infty$ contre forte dans $L^2$`,
  statement: t`Soit $\Omega=]0,2\pi[$. Comparer les informations fournies par la convergence faible-* dans $L^\infty(\Omega)$ et par la convergence forte dans $L^2(\Omega)$. (a) Si $\|u_n\|_{L^\infty(\Omega)}\le M$ pour tout $n$ et $u_n\to u$ fortement dans $L^2(\Omega)$, montrer que $u_n\overset{*}{\rightharpoonup}u$ dans $L^\infty(\Omega)$ et que $u_n^2\to u^2$ fortement dans $L^2(\Omega)$. (b) Montrer que $v_n(x)=\sin(nx)$ vérifie $v_n\overset{*}{\rightharpoonup}0$ dans $L^\infty(\Omega)$, qu'aucune sous-suite de $(v_n)$ ne converge fortement dans $L^2(\Omega)$, et que $v_n^2$ ne converge pas vers $0$.`,
  source: poly(41, 'Exercice 19, difficile ; exemple de la section 5.1 (p. PDF 20)'),
  prerequisites: [],
  concepts: ['faible-fort', 'faible-etoile', 'nonlinearite-limite-faible', 'hypotheses-theoreme', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-Om', kind: 'hypothese', text: t`$\Omega=]0,2\pi[$ ; $L^2(\Omega)\subset L^1(\Omega)$ et $L^2(\Omega)$ est dense dans $L^1(\Omega)$.` },
      { id: 'h-M', kind: 'hypothese', text: t`$\|u_n\|_{L^\infty(\Omega)}\le M$ pour tout $n$.` },
      { id: 'h-fort', kind: 'hypothese', text: t`$u_n\to u$ fortement dans $L^2(\Omega)$.` },
      { id: 'd-v', kind: 'definition', text: t`$v_n(x)=\sin(nx)$ pour $n\ge 1$ et $x\in\Omega$.` },

      { id: 'a-borne', kind: 'inegalite', text: t`$\|u\|_{L^\infty(\Omega)}\le M$.` },
      { id: 'a-test', kind: 'consequence', text: t`Pour toute $\psi\in L^2(\Omega)$ : $\int_\Omega(u_n-u)\psi\to 0$.` },
      { id: 'a-etoile', kind: 'consequence', text: t`$u_n\overset{*}{\rightharpoonup}u$ dans $L^\infty(\Omega)$ : $\int_\Omega u_n\varphi\to\int_\Omega u\varphi$ pour toute $\varphi\in L^1(\Omega)$.` },
      { id: 'a-carre', kind: 'inegalite', text: t`$\|u_n^2-u^2\|_{L^2(\Omega)}\le 2M\|u_n-u\|_{L^2(\Omega)}$, donc $u_n^2\to u^2$ fortement dans $L^2(\Omega)$.` },

      { id: 'b-etoile', kind: 'consequence', text: t`$v_n\overset{*}{\rightharpoonup}0$ dans $L^\infty(\Omega)$.` },
      {
        id: 'b-norme',
        kind: 'egalite',
        text: t`$\int_0^{2\pi}v_n(x)^2\,dx=\pi$ pour tout $n\ge 1$.`,
        masked: t`Valeur de $\int_0^{2\pi}\sin^2(nx)\,dx$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\dfrac1\pi\int_0^{2\pi}\sin^2(nx)\,dx$ pour $n\ge 1$`, expected: '1' },
      },
      { id: 'b-nonfort', kind: 'consequence', text: t`Aucune sous-suite de $(v_n)$ ne converge fortement dans $L^2(\Omega)$.` },
      {
        id: 'b-carre',
        kind: 'egalite',
        text: t`$v_n^2=\tfrac12-\tfrac12\cos(2nx)\overset{*}{\rightharpoonup}\tfrac12$ dans $L^\infty(\Omega)$ : $v_n^2$ ne converge pas vers $0=(\lim v_n)^2$.`,
        masked: t`Limite faible-* de $v_n^2$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Constante $c$ telle que $\sin^2(nx)\overset{*}{\rightharpoonup}c$ dans $L^\infty(]0,2\pi[)$`, expected: '1/2' },
      },

      { id: 'fin', kind: 'conclusion', text: t`Pour une suite bornée de $L^\infty(\Omega)$, la convergence forte dans $L^2(\Omega)$ entraîne la convergence faible-* et le passage à la limite dans $u_n^2$ ; la convergence faible-* n'entraîne ni la convergence forte dans $L^2(\Omega)$, même pour une sous-suite, ni la convergence de $u_n^2$ vers le carré de la limite.` },

      // Propositions plausibles mais fausses.
      { id: 'x-rec', kind: 'consequence', distractor: true, text: t`Si $(u_n)$ est bornée dans $L^\infty(\Omega)$ et $u_n\overset{*}{\rightharpoonup}u$, alors $u_n\to u$ fortement dans $L^2(\Omega)$.` },
      { id: 'x-Linfty', kind: 'consequence', distractor: true, after: ['a-etoile'], text: t`Sous les hypothèses de (a), $u_n\to u$ dans $L^\infty(\Omega)$ pour la norme.` },
      { id: 'x-sans-borne', kind: 'consequence', distractor: true, text: t`La seule convergence forte dans $L^2(\Omega)$, sans borne dans $L^\infty(\Omega)$, entraîne $u_n\overset{*}{\rightharpoonup}u$ dans $L^\infty(\Omega)$.` },
      { id: 'x-carre0', kind: 'consequence', distractor: true, after: ['b-etoile'], text: t`$v_n^2\overset{*}{\rightharpoonup}0$ dans $L^\infty(\Omega)$.` },
    ],
    justifications: [
      { id: 'j-pp', label: t`Une sous-suite converge presque partout ; passage à la limite dans $|u_{n_k}|\le M$, hors d'un ensemble négligeable.` },
      { id: 'j-cs', label: t`Cauchy–Schwarz : $\big|\int_\Omega(u_n-u)\psi\big|\le\|u_n-u\|_{L^2}\|\psi\|_{L^2}$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-densite', label: t`Pour $\varphi\in L^1$ et $\psi\in L^2$ avec $\|\varphi-\psi\|_{L^1}\le\varepsilon$ : $\big|\int_\Omega(u_n-u)\varphi\big|\le 2M\varepsilon+\big|\int_\Omega(u_n-u)\psi\big|$.` },
      { id: 'j-facteur', label: t`$|u_n^2-u^2|=|u_n+u|\,|u_n-u|\le 2M|u_n-u|$ presque partout.` },
      { id: 'j-rl', label: t`Lemme de Riemann–Lebesgue : $\int_0^{2\pi}\varphi(x)\sin(nx)\,dx\to 0$ pour toute $\varphi\in L^1(]0,2\pi[)$.`, theorem: 'riemann-lebesgue' },
      { id: 'j-calcul', label: t`$\sin^2(nx)=\tfrac12\big(1-\cos(2nx)\big)$ et $\int_0^{2\pi}\cos(2nx)\,dx=0$.` },
      { id: 'j-compat', label: t`Si $v_{n_k}\to w$ dans $L^2$, tester contre $\psi\in L^2\subset L^1$ donne $\int_\Omega w\psi=\lim_k\int_\Omega v_{n_k}\psi=0$, donc $w=0$ ; or $\|v_{n_k}\|_{L^2}^2=\pi$.` },
      { id: 'j-rl-cos', label: t`Décomposition $\sin^2(nx)=\tfrac12-\tfrac12\cos(2nx)$, puis Riemann–Lebesgue pour $\cos(2nx)$.`, theorem: 'riemann-lebesgue' },
      { id: 'j-synthese', label: 'Réunion des deux parties.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-faible-fort', label: t`Pour une suite bornée dans $L^\infty$, la convergence faible-* entraîne la convergence forte dans $L^2$.` },
      { id: 'j-continu', label: t`L'application $s\mapsto s^2$ est continue, donc elle commute avec toute limite.` },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['h-fort', 'h-M'], to: 'a-borne', by: 'j-pp' },
      { from: ['h-fort'], to: 'a-test', by: 'j-cs' },
      { from: ['a-test', 'a-borne', 'h-M', 'h-Om'], to: 'a-etoile', by: 'j-densite' },
      { from: ['h-fort', 'h-M', 'a-borne'], to: 'a-carre', by: 'j-facteur' },
      { from: ['d-v'], to: 'b-etoile', by: 'j-rl' },
      { from: ['d-v'], to: 'b-norme', by: 'j-calcul' },
      { from: ['b-etoile', 'b-norme', 'h-Om'], to: 'b-nonfort', by: 'j-compat' },
      { from: ['d-v'], to: 'b-carre', by: 'j-rl-cos' },
      { from: ['a-etoile', 'a-carre', 'b-etoile', 'b-nonfort', 'b-carre'], to: 'fin', by: 'j-synthese' },
    ],
    traps: [
      {
        conclusion: 'x-rec',
        verdict: 'incorrect',
        concept: 'faible-fort',
        message: t`La convergence faible-* ne contrôle pas les oscillations : elle n'entraîne pas la convergence forte, même pour une suite bornée.`,
        counterexample: t`$v_n=\sin(n\cdot)$ : $\|v_n\|_{L^\infty}\le 1$ et $v_n\overset{*}{\rightharpoonup}0$, mais $\|v_n\|_{L^2}^2=\pi$.`,
      },
      {
        conclusion: 'b-nonfort',
        by: 'j-faible-fort',
        verdict: 'incorrect',
        concept: 'faible-fort',
        message: t`Cette justification est fausse, et elle conduirait même à la conclusion contraire : $(v_n)$ est bornée dans $L^\infty$, faiblement-* convergente, et ne converge pas fortement.`,
      },
      {
        conclusion: 'x-Linfty',
        verdict: 'incorrect',
        concept: 'faible-fort',
        message: t`La convergence dans $L^2$ ne contrôle pas le supremum essentiel : une bosse de hauteur fixe et de support évanescent tend vers $0$ dans $L^2$.`,
        counterexample: t`$u_n=\mathbb 1_{]0,1/n[}$ : $\|u_n\|_{L^\infty}=1$, $\|u_n\|_{L^2}^2=1/n\to 0$, et $\|u_n-0\|_{L^\infty}=1$.`,
      },
      {
        conclusion: 'x-sans-borne',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`La borne dans $L^\infty$ sert à passer des tests de $L^2$ à tous les tests de $L^1$ ; sans elle, l'argument de densité tombe.`,
        counterexample: t`$w_n=n\,\mathbb 1_{]0,n^{-3}[}$ : $\|w_n\|_{L^2}^2=1/n\to 0$, mais pour $\varphi(x)=x^{-3/4}\in L^1(\Omega)$, $\int_\Omega w_n\varphi=4n^{1/4}\to+\infty$.`,
      },
      {
        conclusion: 'x-carre0',
        verdict: 'incorrect',
        concept: 'nonlinearite-limite-faible',
        message: t`La convergence faible-* ne passe pas à travers la non-linéarité $s\mapsto s^2$.`,
        counterexample: t`Pour $\varphi=1\in L^1(\Omega)$ : $\int_\Omega v_n^2\varphi=\pi$ pour tout $n$, et non $0$.`,
      },
      {
        conclusion: 'a-carre',
        by: 'j-continu',
        verdict: 'a-justifier',
        concept: 'hypotheses-theoreme',
        message: t`La continuité ponctuelle de $s\mapsto s^2$ ne fournit aucune estimation dans $L^2$ : c'est la borne $|u_n+u|\le 2M$ qui contrôle $u_n^2-u^2$.`,
      },
      {
        conclusion: 'a-etoile',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`Les tests de la convergence faible-* sont les fonctions de $L^1$, pas seulement celles de $L^2$ : comment passer des unes aux autres ?`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-M',
        label: t`Retirer la borne dans $L^\infty$`,
        necessary: true,
        explanation: t`Sans borne uniforme, la convergence forte dans $L^2$ ne donne plus la convergence faible-*, ni le contrôle de $u_n^2$.`,
        counterexample: t`$w_n=n\,\mathbb 1_{]0,n^{-3}[}\to 0$ dans $L^2(\Omega)$, alors que $\int_\Omega w_nx^{-3/4}\,dx=4n^{1/4}\to+\infty$ et $\|w_n^2\|_{L^2}^2=n\to+\infty$.`,
      },
      {
        hypothesis: 'h-fort',
        label: 'Retirer la convergence forte',
        necessary: true,
        explanation: 'Une suite bornée faiblement-* convergente peut osciller : le passage à la limite dans le carré est perdu.',
        counterexample: t`$v_n=\sin(n\cdot)$ est bornée dans $L^\infty$, $v_n\overset{*}{\rightharpoonup}0$, et $v_n^2\overset{*}{\rightharpoonup}\tfrac12\neq 0$.`,
      },
    ],
  },
  solution: t`**(a) Borne de la limite.** Une sous-suite de $(u_n)$ converge vers $u$ presque partout ; le passage à la limite dans $|u_{n_k}|\le M$ donne $\|u\|_{L^\infty}\le M$.

**Convergence faible-*.** Pour $\psi\in L^2(\Omega)$, Cauchy–Schwarz donne $\big|\int_\Omega(u_n-u)\psi\big|\le\|u_n-u\|_{L^2}\|\psi\|_{L^2}\to 0$. Pour $\varphi\in L^1(\Omega)$ et $\varepsilon>0$, on choisit $\psi\in L^2(\Omega)$ avec $\|\varphi-\psi\|_{L^1}\le\varepsilon$, ce qui est possible par densité : $\big|\int_\Omega(u_n-u)\varphi\big|\le 2M\varepsilon+\big|\int_\Omega(u_n-u)\psi\big|$, donc $\limsup_n\big|\int_\Omega(u_n-u)\varphi\big|\le 2M\varepsilon$, pour tout $\varepsilon>0$.

**Carré.** Presque partout, $|u_n^2-u^2|=|u_n+u|\,|u_n-u|\le 2M|u_n-u|$, donc $\|u_n^2-u^2\|_{L^2}\le 2M\|u_n-u\|_{L^2}\to 0$.

**(b) Oscillations.** Par Riemann–Lebesgue, $\int_0^{2\pi}\varphi(x)\sin(nx)\,dx\to 0$ pour toute $\varphi\in L^1$ : $v_n\overset{*}{\rightharpoonup}0$. Mais $\int_0^{2\pi}\sin^2(nx)\,dx=\pi$. Si une sous-suite convergeait fortement dans $L^2$ vers $w$, le test contre $\psi\in L^2\subset L^1$ donnerait $\int_\Omega w\psi=0$, donc $w=0$, ce qui contredit $\|v_{n_k}\|_{L^2}^2=\pi$. Enfin $v_n^2=\tfrac12-\tfrac12\cos(2nx)\overset{*}{\rightharpoonup}\tfrac12\neq 0$.

**Bilan.** Bornée dans $L^\infty$ et forte dans $L^2$ : on obtient la faible-* et le passage à la limite dans les non-linéarités lipschitziennes sur les bornés. Faible-* seule : seules les quantités linéaires passent à la limite. La borne dans $L^\infty$ est indispensable dans (a) : $w_n=n\,\mathbb 1_{]0,n^{-3}[}$ tend vers $0$ dans $L^2$ sans converger faiblement-*.`,
  steps: [
    t`Borner la limite forte dans $L^\infty$ par extraction presque partout.`,
    t`Tester d'abord contre $L^2$, puis étendre à $L^1$ par densité et borne uniforme.`,
    t`Contrôler $u_n^2-u^2$ par la factorisation $(u_n+u)(u_n-u)$.`,
    t`Pour $\sin(nx)$ : convergence faible-* par Riemann–Lebesgue, norme $L^2$ constante.`,
    'Conclure à l’absence de sous-suite fortement convergente et identifier la limite du carré.',
  ],
  commonErrors: [
    { id: 'e-rec', description: 'Croire que la convergence faible-* d’une suite bornée entraîne la convergence forte.', concept: 'faible-fort' },
    { id: 'e-carre', description: t`Passer à la limite dans $u_n^2$ avec une simple convergence faible-*.`, concept: 'nonlinearite-limite-faible' },
    { id: 'e-borne', description: t`Oublier la borne dans $L^\infty$ dans l'argument de densité.`, concept: 'hypotheses-theoreme' },
  ],
  hints: [
    t`Chaque mode de convergence teste une classe de fonctions différente : lesquelles, et avec quel contrôle uniforme ?`,
    t`Pour (a), commence par tester contre $\psi\in L^2$, puis approche $\varphi\in L^1$ par une telle $\psi$. Pour (b), calcule $\int_0^{2\pi}\sin^2(nx)\,dx$.`,
    t`Pour l'absence de sous-suite forte : une limite forte $w$ coïnciderait avec la limite faible-* $0$, alors que la norme $L^2$ reste égale à $\sqrt\pi$.`,
  ],
  rubric: rubric({
    hypotheses: t`La borne dans $L^\infty$ et la finitude de la mesure de $\Omega$ sont utilisées là où elles servent.`,
    methode: 'Les implications vraies sont démontrées, les implications fausses réfutées par un contre-exemple vérifié.',
    validite: t`Le passage de $L^2$ à $L^1$ par densité et la factorisation du carré sont correctement contrôlés.`,
    justifications: t`L'absence de sous-suite fortement convergente est démontrée, et non seulement celle de la suite entière.`,
    conclusion: 'Le bilan distingue clairement ce que chaque convergence permet de passer à la limite.',
  }),
  variant: {
    statement: t`Soit $\Omega$ un ouvert borné de $\mathbb R^d$ et $(u_n)$ une suite bornée de $L^\infty(\Omega)$. Montrer que $u_n\overset{*}{\rightharpoonup}u$ dans $L^\infty(\Omega)$ si et seulement si $u_n\rightharpoonup u$ faiblement dans $L^2(\Omega)$.`,
    solution: t`Si $u_n\overset{*}{\rightharpoonup}u$, alors $u\in L^\infty\subset L^2$ et, comme $L^2(\Omega)\subset L^1(\Omega)$ sur un ouvert borné, $\int_\Omega u_n\psi\to\int_\Omega u\psi$ pour toute $\psi\in L^2$. Réciproquement, si $u_n\rightharpoonup u$ dans $L^2$ et $\|u_n\|_{L^\infty}\le M$, l'ensemble $\{v\in L^2 : |v|\le M\ \text{p.p.}\}$ est convexe et fermé, donc faiblement fermé : $\|u\|_{L^\infty}\le M$. Pour $\varphi\in L^1$ et $\psi\in L^2$ avec $\|\varphi-\psi\|_{L^1}\le\varepsilon$ : $\big|\int_\Omega(u_n-u)\varphi\big|\le 2M\varepsilon+\big|\int_\Omega(u_n-u)\psi\big|$, d'où la convergence faible-*. Pour les suites bornées de $L^\infty$, les deux convergences coïncident ; aucune n'entraîne la convergence forte.`,
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT19: TheoremModule = {
  theorem: {
    id: 'banach-alaoglu',
    spaces: [
      t`$X$ : espace normé réel ; $X'$ : son dual topologique, muni de la norme $\|\ell\|_{X'}=\sup_{\|x\|_X\le 1}|\ell(x)|$.`,
      t`$B_{X'}=\{\ell\in X' : \|\ell\|_{X'}\le 1\}$ : boule unité fermée de $X'$.`,
      t`$\sigma(X',X)$ : topologie faible-*, la moins fine sur $X'$ rendant continues les évaluations $\ell\mapsto\ell(x)$, $x\in X$.`,
    ],
    hypotheses: [
      { id: 'h-norme', text: t`$X$ est un espace normé ; ni sa complétude ni sa séparabilité ne sont requises.` },
      {
        id: 'h-boule',
        text: t`La boule considérée est la boule unité fermée de $X'$.`,
        whenRemoved: t`Si $X\neq\{0\}$, la boule ouverte $\{\|\ell\|_{X'}<1\}$ n'est pas fermée pour la norme, car $(1-1/n)\ell_0\to\ell_0$ lorsque $\|\ell_0\|_{X'}=1$ ; elle ne l'est donc pas non plus pour $\sigma(X',X)$, moins fine, et n'est pas compacte pour cette topologie séparée.`,
      },
      {
        id: 'h-topologie',
        text: t`La compacité est relative à la topologie faible-* $\sigma(X',X)$.`,
        whenRemoved: t`Pour la norme duale, la boule de $\ell^1=(c_0)'$ n'est pas compacte : $\|e_n-e_m\|_{\ell^1}=2$ pour $n\neq m$.`,
      },
    ],
    statement: t`Pour un espace normé $X$, la boule unité de $X'$ est compacte dans la topologie faible-* $\sigma(X',X)$.`,
    conclusions: {
      autre: t`Compacité de la boule unité fermée de $X'$ pour $\sigma(X',X)$.`,
    },
    sourceProof: 'idee',
    proofOutline: [
      t`Pour $\ell\in B_{X'}$ et $x\in X$, $|\ell(x)|\le\|x\|$ : l'application $\Phi(\ell)=(\ell(x))_{x\in X}$ envoie $B_{X'}$ dans $P=\prod_{x\in X}[-\|x\|,\|x\|]$.`,
      t`$P$ est compact pour la topologie produit (Tychonoff).`,
      t`$\Phi$ est un homéomorphisme de $(B_{X'},\sigma(X',X))$ sur son image : les deux topologies sont engendrées par les coordonnées $\ell\mapsto\ell(x)$.`,
      t`L'image est l'ensemble des $\omega\in P$ vérifiant les relations de linéarité $\omega_{x+y}=\omega_x+\omega_y$, $\omega_{\lambda x}=\lambda\omega_x$ : c'est un fermé de $P$.`,
      t`Un fermé d'un compact est compact ; on revient à $B_{X'}$ par $\Phi^{-1}$.`,
    ],
    warnings: [
      t`Compacité n'est pas compacité séquentielle : sans hypothèse supplémentaire, par exemple la séparabilité de $X$, une suite bornée de $X'$ peut n'avoir aucune sous-suite faiblement-* convergente, comme les évaluations $x\mapsto x_n$ dans $(\ell^\infty)'$.`,
      t`Faible-* signifie tester contre les éléments de $X$, non contre ceux de $X''$ : dans $\ell^1=(c_0)'$, $e_n\overset{*}{\rightharpoonup}0$ sans converger faiblement.`,
      t`En dimension infinie, la boule de $X'$ n'est pas compacte pour la norme duale.`,
    ],
    usefulFor: t`D'une estimation uniforme $\|u_n\|_{L^\infty}\le C$, extraire $u_n\overset{*}{\rightharpoonup}u$ dans $L^\infty=(L^1)'$ : la séparabilité de $L^1$ rend la boule métrisable, donc séquentiellement compacte. C'est l'outil d'extraction dans les duaux non réflexifs.`,
    verification: FROM_POLY,
  },
  definitions: [
    {
      id: 'ba-topologie-faible-etoile',
      term: 'Topologie faible-*',
      statement: t`Sur le dual $X'$ d'un espace normé $X$, la topologie faible-* $\sigma(X',X)$ est la topologie la moins fine rendant continues toutes les évaluations $\ell\mapsto\ell(x)$, $x\in X$. Ses voisinages de base en $\ell_0$ sont les $\{\ell : |\ell(x_i)-\ell_0(x_i)|<\varepsilon,\ 1\le i\le k\}$.`,
      source: complement('Définition standard ; le polycopié emploie la notation sans la définir (section 5.2)'),
    },
    {
      id: 'ba-convergence-faible-etoile',
      term: 'Convergence faible-*',
      statement: t`$\ell_n\overset{*}{\rightharpoonup}\ell$ dans $X'$ signifie $\ell_n(x)\to\ell(x)$ pour tout $x\in X$.`,
      source: complement('Caractérisation séquentielle de la topologie faible-*'),
    },
    {
      id: 'ba-separable',
      term: 'Espace séparable',
      statement: 'Un espace métrique est séparable s’il contient une partie dénombrable dense.',
      source: complement('Définition standard'),
    },
  ],
  concepts: [
    {
      id: 'banach-alaoglu-topologie-initiale',
      label: 'Topologie la moins fine',
      reminder: 'La topologie faible-* est la moins fine rendant continues les évaluations ; la plus fine ayant cette propriété est la topologie discrète.',
    },
    {
      id: 'banach-alaoglu-sequentiel',
      label: 'Compacité faible-* et extraction de suites',
      reminder: t`La compacité de la boule de $X'$ pour $\sigma(X',X)$ ne donne pas, à elle seule, l'extraction de sous-suites : il faut une hypothèse supplémentaire, typiquement la séparabilité de $X$.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-ba-norme',
      theoremId: 'banach-alaoglu',
      title: 'Compacité pour la norme duale',
      claim: t`La boule unité fermée de $X'$ est compacte pour la norme duale.`,
      correctStatement: t`Elle est compacte pour la topologie faible-* $\sigma(X',X)$ ; pour la norme, seulement en dimension finie.`,
      task: t`Dans $\ell^1=(c_0)'$, calcule $\|e_n-e_m\|_{\ell^1}$ pour $n\neq m$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\|e_n-e_m\|_{\ell^1}$, $n\neq m$`, expected: '2' },
      explanation: t`Les $e_n$ sont dans la boule unité de $\ell^1$ et deux à deux à distance $2$ : aucune sous-suite n'est de Cauchy, la boule n'est donc pas compacte pour la norme. En revanche $e_n\overset{*}{\rightharpoonup}0$ pour $\sigma(\ell^1,c_0)$.`,
      concept: 'faible-fort',
      source: poly(20, 'Énoncé de Banach–Alaoglu, section 5.2'),
    },
    {
      id: 'ce-ba-non-separable',
      theoremId: 'banach-alaoglu',
      title: 'Suite bornée sans sous-suite faiblement-* convergente',
      claim: t`Dans le dual de tout espace normé, une suite bornée admet une sous-suite faiblement-* convergente.`,
      correctStatement: t`C'est vrai si $X$ est séparable ; la compacité de Banach–Alaoglu n'est pas séquentielle en général.`,
      task: t`Dans $(\ell^\infty)'$, soit $\ell_n(x)=x_n$. Pour une extraction $(n_k)$, on choisit $x\in\ell^\infty$ avec $x_{n_k}=(-1)^k$ et $x_m=0$ sinon. Calcule $\limsup_k\ell_{n_k}(x)-\liminf_k\ell_{n_k}(x)$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\limsup_k\ell_{n_k}(x)-\liminf_k\ell_{n_k}(x)$`, expected: '2' },
      explanation: t`On a $\ell_{n_k}(x)=(-1)^k$, qui oscille entre $-1$ et $1$ : la sous-suite $(\ell_{n_k})$ ne converge pas faiblement-*. L'extraction étant arbitraire, aucune sous-suite ne converge, bien que la boule de $(\ell^\infty)'$ soit compacte pour $\sigma((\ell^\infty)',\ell^\infty)$ ; $\ell^\infty$ n'est pas séparable.`,
      concept: 'banach-alaoglu-sequentiel',
      source: complement('Contre-exemple classique, hors polycopié'),
    },
    {
      id: 'ce-ba-etoile-faible',
      theoremId: 'banach-alaoglu',
      title: 'Faible-* n’est pas faible',
      claim: t`Dans $X'$, la convergence faible-* entraîne la convergence faible $\sigma(X',X'')$.`,
      correctStatement: t`La convergence faible entraîne la convergence faible-* ; la réciproque est fausse en général, et vraie si $X$ est réflexif.`,
      task: t`Dans $\ell^1=(c_0)'$, on teste $e_n$ contre $\phi=(1,1,1,\dots)\in\ell^\infty=(\ell^1)'$. Calcule $\langle\phi,e_n\rangle$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\langle\phi,e_n\rangle$`, expected: '1' },
      explanation: t`Pour $x\in c_0$, $\langle e_n,x\rangle=x_n\to 0$ : $e_n\overset{*}{\rightharpoonup}0$. Mais $\langle\phi,e_n\rangle=1$ pour tout $n$ : $(e_n)$ ne converge pas faiblement vers $0$.`,
      concept: 'faible-etoile',
      source: complement('Contre-exemple classique, hors polycopié'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT19;
