/**
 * Résultat 37 — Théorème de Frobenius (cours de géométrie de Lie, § 10, p. PDF 54–56).
 * Le cours énonce l'équivalence « intégrable ⟺ involutive » et justifie la nécessité ;
 * la suffisance (construction de coordonnées adaptées) est admise. Les exercices
 * démontrent la nécessité par le commutateur de flots, l'appliquent pour réfuter
 * l'intégrabilité d'une distribution de contact, et exhibent des feuilles explicites.
 */
import { t, rubric, lie, FROM_LIE, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'frobenius.facile',
  theoremId: 'frobenius',
  level: 'facile',
  title: t`La distribution $\operatorname{Ker}(dz-y\,dx)$ n'est pas intégrable`,
  statement: t`Sur $\mathbb R^3$, soit $\alpha=dz-y\,dx$ et $D=\operatorname{Ker}\alpha$. Vérifier que $X=\partial_y$ et $Y=\partial_x+y\,\partial_z$ engendrent $D$, calculer $[X,Y]$ et $\alpha([X,Y])$, puis conclure avec le théorème de Frobenius.`,
  source: lie(55, 'Exercice 10.5'),
  prerequisites: [],
  concepts: ['lie-involutivite', 'lie-crochet-commutation', 'hypotheses-theoreme'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-alpha', kind: 'hypothese', text: t`$\alpha=dz-y\,dx$ sur $\mathbb R^3$, et $D=\operatorname{Ker}\alpha$.` },
      { id: 'd-inv', kind: 'definition', text: t`$D$ est involutive si $[X,Y]_p\in D_p$ pour tous champs $X,Y$ à valeurs dans $D$ et tout $p$.` },
      { id: 'gens', kind: 'consequence', text: t`$\alpha(\partial_y)=0$ et $\alpha(\partial_x+y\,\partial_z)=y-y=0$ ; $X$ et $Y$ sont indépendants : ils engendrent $D$, de rang $2$.` },
      {
        id: 'crochet',
        kind: 'egalite',
        text: t`$[X,Y]=\partial_z$.`,
        masked: t`Composantes de $[X,Y]$ sur $(\partial_x,\partial_y,\partial_z)$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Composantes de $[X,Y]$ sur $(\partial_x,\partial_y,\partial_z)$`, expected: ['0', '0', '1'], labels: ['∂x', '∂y', '∂z'] },
      },
      {
        id: 'sort',
        kind: 'egalite',
        text: t`$\alpha([X,Y])=\alpha(\partial_z)=1\neq 0$ : $[X,Y]_p\notin D_p$.`,
        masked: t`Valeur de $\alpha([X,Y])$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\alpha([X,Y])$`, expected: '1' },
      },
      { id: 'noninv', kind: 'consequence', text: t`$D$ n'est pas involutive.` },
      { id: 'thm', kind: 'application-theoreme', text: t`$D$ n'est intégrable au voisinage d'aucun point.` },
      { id: 'fin', kind: 'conclusion', text: t`Aucune surface ne peut avoir pour plans tangents les plans $\operatorname{Ker}(dz-y\,dx)$.` },
      { id: 'x-rang', kind: 'consequence', distractor: true, text: t`$D$ est intégrable, puisque $\alpha$ ne s'annule nulle part et que $D$ est de rang constant.` },
      { id: 'x-xx', kind: 'consequence', distractor: true, text: t`Il suffit de vérifier $[X,X]=0$ et $[Y,Y]=0$ pour conclure à l'involutivité.` },
    ],
    justifications: [
      { id: 'j-gens', label: t`Évaluation de $\alpha$ ; les deux champs ont des composantes $(0,1,0)$ et $(1,0,y)$.` },
      { id: 'j-crochet', label: t`$[X,Y]=Y'X-X'Y$ : seul $\partial_y(y)=1$ intervient.` },
      { id: 'j-eval', label: t`$dz(\partial_z)=1$ et $dx(\partial_z)=0$.` },
      { id: 'j-noninv', label: 'Un crochet de deux champs de D sort de D.' },
      { id: 'j-frob', label: 'Frobenius : une distribution intégrable est involutive ; par contraposée, non involutive entraîne non intégrable.', theorem: 'frobenius' },
      { id: 'j-syn', label: 'Conclusion.' },
      { id: 'j-rang', label: 'Une distribution de rang constant est toujours intégrable.' },
    ],
    rules: [
      { from: ['h-alpha'], to: 'gens', by: 'j-gens' },
      { from: ['gens'], to: 'crochet', by: 'j-crochet' },
      { from: ['crochet', 'h-alpha'], to: 'sort', by: 'j-eval' },
      { from: ['sort', 'gens', 'd-inv'], to: 'noninv', by: 'j-noninv' },
      { from: ['noninv'], to: 'thm', by: 'j-frob' },
      { from: ['thm'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-rang',
        verdict: 'incorrect',
        concept: 'lie-involutivite',
        message: 'Le rang constant ne suffit pas : Frobenius exige l’involutivité.',
        counterexample: t`Ici le rang vaut $2$ partout, et $[X,Y]=\partial_z$ sort de $D$.`,
      },
      {
        conclusion: 'x-rang',
        by: 'j-rang',
        verdict: 'incorrect',
        concept: 'lie-involutivite',
        message: 'Cette affirmation est fausse.',
        counterexample: t`$\operatorname{Ker}(dz-y\,dx)$ est de rang constant $2$ et n'est pas intégrable.`,
      },
      {
        conclusion: 'x-xx',
        verdict: 'incorrect',
        concept: 'lie-involutivite',
        message: t`$[X,X]=0$ pour tout champ : la condition porte sur les crochets de champs distincts de $D$.`,
        counterexample: t`$[\partial_y,\partial_y]=0$ et $[Y,Y]=0$, alors que $[\partial_y,Y]=\partial_z\notin D$.`,
      },
    ],
    removable: [],
  },
  solution: t`**Générateurs.** $\alpha(\partial_y)=dz(\partial_y)-y\,dx(\partial_y)=0$ et $\alpha(\partial_x+y\partial_z)=y-y=0$. Les champs $X=(0,1,0)$ et $Y=(1,0,y)$ sont indépendants : ils engendrent $D$, de rang $2$.

**Crochet.** $[X,Y]=Y'X-X'Y$ ; $X'=0$ et seule la troisième composante de $Y$ dépend de $y$ : $[X,Y]=\partial_z$.

**Conclusion.** $\alpha(\partial_z)=1\neq 0$ : $[X,Y]$ sort de $D$, qui n'est donc pas involutive. Par Frobenius (une distribution intégrable est involutive), $D$ n'est intégrable au voisinage d'aucun point.`,
  steps: ['Vérifier que X et Y engendrent D.', 'Calculer [X,Y].', 'Évaluer α sur le crochet.', 'Conclure par la contraposée de Frobenius.'],
  commonErrors: [
    { id: 'e-rang', description: 'Croire que le rang constant suffit à l’intégrabilité.', concept: 'lie-involutivite' },
    { id: 'e-xx', description: 'Tester l’involutivité sur [X,X], toujours nul.', concept: 'lie-involutivite' },
  ],
  hints: [
    t`Vérifie $\alpha(X)=\alpha(Y)=0$ : que vaut $dz(\partial_x+y\partial_z)$ ?`,
    t`Calcule $[X,Y]$ par $Y'X-X'Y$ : quelle composante de $Y$ dépend de la variable dérivée par $X$ ?`,
    t`Si le crochet sort de $D$, la distribution n'est pas involutive : quelle direction de Frobenius s'applique alors ?`,
  ],
  rubric: rubric({
    hypotheses: 'Les générateurs de D sont vérifiés et indépendants.',
    methode: 'Le critère d’involutivité est testé sur un crochet de générateurs.',
    validite: 'Le crochet et α([X,Y]) sont calculés exactement.',
    justifications: 'La direction utilisée de Frobenius (nécessité de l’involutivité) est explicitée.',
    conclusion: 'La non-intégrabilité est conclue.',
  }),
  variant: {
    statement: t`Montrer que $\operatorname{Ker}(dz-x\,dy)$ n'est pas intégrable (cours, § 10.4).`,
    solution: t`$X=\partial_x$ et $Y=\partial_y+x\,\partial_z$ engendrent le noyau ; $[X,Y]=\partial_z$ et $(dz-x\,dy)(\partial_z)=1\neq 0$. La distribution n'est pas involutive, donc pas intégrable.`,
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h-alpha', kind: 'hypothese', text: t`$\alpha=dz-x\,dy$, $D=\operatorname{Ker}\alpha$.` },
        { id: 'gens', kind: 'consequence', text: t`$X=\partial_x$ et $Y=\partial_y+x\,\partial_z$ engendrent $D$.` },
        { id: 'crochet', kind: 'egalite', text: t`$[X,Y]=\partial_z$ et $\alpha(\partial_z)=1$.` },
        { id: 'fin', kind: 'conclusion', text: t`$D$ n'est pas involutive, donc pas intégrable.` },
        { id: 'x-int', kind: 'consequence', distractor: true, text: t`$D$ est intégrable, de feuilles les plans $z=c$.` },
      ],
      justifications: [
        { id: 'j-gens', label: t`$\alpha(\partial_x)=0$ et $\alpha(\partial_y+x\partial_z)=x-x=0$.` },
        { id: 'j-crochet', label: t`$\partial_x(x)=1$.` },
        { id: 'j-frob', label: 'Contraposée de Frobenius.', theorem: 'frobenius' },
      ],
      rules: [
        { from: ['h-alpha'], to: 'gens', by: 'j-gens' },
        { from: ['gens'], to: 'crochet', by: 'j-crochet' },
        { from: ['crochet'], to: 'fin', by: 'j-frob' },
      ],
      traps: [
        {
          conclusion: 'x-int',
          verdict: 'incorrect',
          concept: 'lie-involutivite',
          message: t`Les plans $z=c$ ont pour plans tangents $\operatorname{Ker}dz$, pas $\operatorname{Ker}(dz-x\,dy)$.`,
          counterexample: t`En $(1,0,0)$ : $\partial_y+\partial_z\in D$ n'est pas tangent au plan $z=0$.`,
        },
      ],
      removable: [],
    },
  },
  verification: FROM_LIE,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'frobenius.intermediaire',
  theoremId: 'frobenius',
  level: 'intermediaire',
  title: 'Une distribution intégrable est involutive',
  statement: t`Soit $D$ une distribution de rang $k$ sur $M$ qui admet, par chaque point, une sous-variété intégrale $S$ ($T_qS=D_q$ pour $q\in S$). Soient $X,Y$ deux champs à valeurs dans $D$ et $p\in M$. Montrer que $[X,Y]_p\in D_p$, en utilisant le commutateur des flots.`,
  source: lie(54, 'Involutivité, § 10.2'),
  prerequisites: [],
  concepts: ['lie-involutivite', 'lie-espace-tangent', 'justification-absente'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-D', kind: 'hypothese', text: t`$D$ est une distribution lisse de rang $k$ sur $M$.` },
      { id: 'h-feuille', kind: 'hypothese', text: t`Par $p$ passe une sous-variété $S$ avec $T_qS=D_q$ pour tout $q\in S$.` },
      { id: 'h-XY', kind: 'hypothese', text: t`$X$ et $Y$ sont des champs lisses à valeurs dans $D$.` },
      { id: 'tang', kind: 'consequence', text: t`$X$ et $Y$ sont tangents à $S$ en tout point de $S$.` },
      { id: 'flots-S', kind: 'consequence', text: t`Pour $q\in S$ et $|t|$ petit, $\Phi^X_t(q)\in S$ et $\Phi^Y_t(q)\in S$.` },
      { id: 'commut', kind: 'consequence', text: t`$C_t(p)=\Phi^Y_{-t}\circ\Phi^X_{-t}\circ\Phi^Y_t\circ\Phi^X_t(p)\in S$ pour $|t|$ petit.` },
      { id: 'dl', kind: 'egalite', text: t`$C_t(p)=p+t^2[X,Y]_p+O(t^3)$.` },
      { id: 'courbe', kind: 'consequence', text: t`$c(s)=C_{\sqrt s}(p)$, $s\ge 0$, est tracée dans $S$, avec $c(0)=p$ et $c'(0^+)=[X,Y]_p$.` },
      { id: 'tangent', kind: 'inclusion', text: t`$[X,Y]_p\in T_pS=D_p$.` },
      { id: 'fin', kind: 'conclusion', text: t`$D$ est involutive : l'involutivité est nécessaire à l'intégrabilité.` },
      { id: 'x-bilin', kind: 'consequence', distractor: true, text: t`$[X,Y]_p\in D_p$ car $X_p,Y_p\in D_p$ et le crochet est bilinéaire.` },
      { id: 'x-reciproque', kind: 'consequence', distractor: true, after: ['tangent'], text: t`Le même argument montre que toute distribution involutive est intégrable.` },
    ],
    justifications: [
      { id: 'j-tang', label: t`$X_q,Y_q\in D_q=T_qS$ pour $q\in S$.` },
      { id: 'j-courbes-int', label: 'Une courbe intégrale d’un champ tangent à une sous-variété, issue d’un point de la sous-variété, y reste pour les petits temps (lecture dans une carte adaptée et unicité de Cauchy–Lipschitz).', theorem: 'theoreme-cauchy-lipschitz' },
      { id: 'j-compose', label: 'Chacun des quatre flots laisse S invariante localement.' },
      { id: 'j-commutateur', label: 'Développement du commutateur de flots.', theorem: 'crochet-lie' },
      { id: 'j-courbe', label: t`$c(s)=p+s[X,Y]_p+O(s^{3/2})$.` },
      { id: 'j-cone', label: 'Dans une carte adaptée, S est un sous-espace : le vecteur dérivé à droite d’une courbe tracée dans S appartient à T_pS.' },
      { id: 'j-syn', label: 'Le point et les champs étant arbitraires, D est involutive.' },
      { id: 'j-bilin', label: 'Bilinéarité ponctuelle du crochet.' },
    ],
    rules: [
      { from: ['h-XY', 'h-feuille'], to: 'tang', by: 'j-tang' },
      { from: ['tang', 'h-feuille'], to: 'flots-S', by: 'j-courbes-int' },
      { from: ['flots-S'], to: 'commut', by: 'j-compose' },
      { from: ['h-XY', 'h-D'], to: 'dl', by: 'j-commutateur' },
      { from: ['commut', 'dl'], to: 'courbe', by: 'j-courbe' },
      { from: ['courbe', 'h-feuille'], to: 'tangent', by: 'j-cone' },
      { from: ['tangent'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-bilin',
        verdict: 'incorrect',
        concept: 'lie-involutivite',
        message: 'Le crochet dépend des dérivées des champs, pas seulement de leurs valeurs en p : ce n’est pas une opération bilinéaire sur D_p.',
        counterexample: t`Pour $D=\operatorname{Ker}(dz-y\,dx)$, $\partial_y$ et $\partial_x+y\partial_z$ sont dans $D$, et leur crochet $\partial_z$ n'y est pas.`,
      },
      {
        conclusion: 'x-bilin',
        by: 'j-bilin',
        verdict: 'incorrect',
        concept: 'lie-crochet-commutation',
        message: 'Le crochet n’est pas défini ponctuellement à partir de X_p et Y_p.',
      },
      {
        conclusion: 'x-reciproque',
        verdict: 'a-justifier',
        concept: 'lie-involutivite',
        message: 'La réciproque est vraie (c’est le contenu difficile de Frobenius), mais l’argument ci-dessus ne la donne pas : il faut construire des coordonnées adaptées.',
      },
    ],
    removable: [
      {
        hypothesis: 'h-feuille',
        label: 'Ne plus supposer l’existence de sous-variétés intégrales',
        necessary: true,
        explanation: 'Sans feuille contenant les quatre flots, le commutateur peut sortir de toute surface tangente à D.',
        counterexample: t`Pour $D=\operatorname{Ker}(dz-y\,dx)$, $X=\partial_y$ et $Y=\partial_x+y\partial_z$ : $C_t(0,0,0)=(0,0,t^2)$, défaut dirigé par $\partial_z\notin D$.`,
      },
    ],
  },
  solution: t`Soit $S$ une sous-variété intégrale passant par $p$. Pour $q\in S$, $X_q,Y_q\in D_q=T_qS$ : les champs sont tangents à $S$, donc leurs courbes intégrales issues de points de $S$ restent dans $S$ pour $|t|$ petit (dans une carte adaptée où $S$ est un sous-espace, unicité de Cauchy–Lipschitz). Les quatre flots préservent donc $S$ localement, et $C_t(p)\in S$.

Or $C_t(p)=p+t^2[X,Y]_p+O(t^3)$. La courbe $c(s)=C_{\sqrt s}(p)$, $s\ge 0$, est tracée dans $S$, avec $c(s)=p+s[X,Y]_p+O(s^{3/2})$ : son vecteur dérivé à droite en $0$ est $[X,Y]_p$. Dans une carte adaptée, $S$ est un sous-espace, qui contient ce vecteur : $[X,Y]_p\in T_pS=D_p$.

Les champs et le point étant arbitraires, $D$ est involutive. La réciproque, plus difficile, construit des coordonnées où $D=\operatorname{Vect}(\partial_1,\dots,\partial_k)$.`,
  steps: [
    'Les champs de D sont tangents à la feuille.',
    'Leurs flots laissent la feuille invariante localement.',
    'Le commutateur reste dans la feuille.',
    'Son développement donne [X,Y]_p comme vecteur tangent à la feuille.',
  ],
  commonErrors: [
    { id: 'e-bilin', description: 'Croire que [X,Y]_p ne dépend que de X_p et Y_p.', concept: 'lie-involutivite' },
    { id: 'e-reciproque', description: 'Croire que l’argument donne aussi la réciproque.', concept: 'lie-involutivite' },
  ],
  hints: [
    'Si X et Y sont tangents à la feuille S, où vont leurs courbes intégrales issues de S ?',
    'Le commutateur des quatre flots part de p et reste dans S : que dit son développement à l’ordre 2 ?',
    t`Reparamètre par $s=t^2$ : la courbe obtenue est tracée dans $S$ et son vecteur dérivé à droite est le crochet.`,
  ],
  rubric: rubric({
    hypotheses: 'L’existence de la feuille et la tangence des champs sont utilisées explicitement.',
    methode: 'Invariance de la feuille par les flots, puis commutateur.',
    validite: 'La reparamétrisation s = t² et la limite sont correctes.',
    justifications: 'Le développement du commutateur est invoqué comme résultat établi.',
    conclusion: 'L’involutivité est conclue, sans prétendre à la réciproque.',
  }),
  variant: {
    statement: t`Montrer que si $D=\operatorname{Ker}\alpha$ est intégrable, avec $\alpha$ une $1$-forme partout non nulle sur $\mathbb R^3$, alors $\alpha\wedge d\alpha=0$.`,
    solution: t`Pour $X,Y\in D$, $d\alpha(X,Y)=X(\alpha(Y))-Y(\alpha(X))-\alpha([X,Y])=-\alpha([X,Y])$. Si $D$ est intégrable, elle est involutive, donc $d\alpha(X,Y)=0$ sur $D$. Pour $Z\notin D$, en évaluant $\alpha\wedge d\alpha$ sur une base $(X,Y,Z)$ adaptée, seul le terme $\alpha(Z)\,d\alpha(X,Y)$ subsiste ; il est nul. Donc $\alpha\wedge d\alpha=0$.`,
  },
  verification: FROM_LIE,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'frobenius.difficile',
  theoremId: 'frobenius',
  level: 'difficile',
  title: 'Feuilles explicites, et ce qui change avec un seul coefficient',
  statement: t`Soit $\beta=dz-y\,dx-x\,dy$ sur $\mathbb R^3$ et $D=\operatorname{Ker}\beta$. (1) Montrer que $D$ est involutive à l'aide de $X=\partial_x+y\,\partial_z$ et $Y=\partial_y+x\,\partial_z$. (2) Exhiber ses feuilles comme niveaux réguliers de $F(x,y,z)=z-xy$. (3) Montrer qu'en remplaçant $\beta$ par $\alpha=dz-y\,dx$, la distribution n'est plus intégrable.`,
  source: lie(55, 'Deux exemples calculés, § 10.4'),
  prerequisites: ['niveau-regulier'],
  concepts: ['lie-involutivite', 'lie-niveau-regulier', 'calcul-exact'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-beta', kind: 'hypothese', text: t`$\beta=dz-y\,dx-x\,dy$ et $D=\operatorname{Ker}\beta$.` },
      { id: 'gens', kind: 'consequence', text: t`$X=\partial_x+y\,\partial_z$ et $Y=\partial_y+x\,\partial_z$ sont indépendants et vérifient $\beta(X)=\beta(Y)=0$.` },
      {
        id: 'crochet',
        kind: 'egalite',
        text: t`$[X,Y]=\partial_z-\partial_z=0$.`,
        masked: t`Composantes de $[X,Y]$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Composantes de $[X,Y]$ sur $(\partial_x,\partial_y,\partial_z)$`, expected: ['0', '0', '0'], labels: ['∂x', '∂y', '∂z'] },
      },
      { id: 'inv', kind: 'consequence', text: t`$D$ est involutive.` },
      { id: 'dF', kind: 'egalite', text: t`$dF=dz-y\,dx-x\,dy=\beta$ pour $F=z-xy$, et $\partial_zF=1\neq 0$.` },
      { id: 'feuilles', kind: 'application-theoreme', text: t`Chaque niveau $F^{-1}(c)$, la surface $z=xy+c$, est une sous-variété de dimension $2$ d'espace tangent $\operatorname{Ker}dF=D$.` },
      { id: 'integ', kind: 'consequence', text: t`$D$ est intégrable, de feuilles $z=xy+c$.` },
      { id: 'h-alpha', kind: 'hypothese', text: t`$\alpha=dz-y\,dx$, de noyau engendré par $X_1=\partial_y$ et $Y_1=\partial_x+y\,\partial_z$.` },
      {
        id: 'contraste',
        kind: 'egalite',
        text: t`$[X_1,Y_1]=\partial_z$ et $\alpha(\partial_z)=1\neq 0$.`,
        masked: t`Valeur de $\alpha([X_1,Y_1])$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\alpha([X_1,Y_1])$`, expected: '1' },
      },
      { id: 'nonint', kind: 'application-theoreme', text: t`$\operatorname{Ker}\alpha$ n'est pas involutive, donc pas intégrable.` },
      { id: 'fin', kind: 'conclusion', text: t`$\operatorname{Ker}\beta$ est intégrable, de feuilles $z=xy+c$ ; $\operatorname{Ker}\alpha$, qui ne diffère que par le terme $x\,dy$, ne l'est pas.` },
      { id: 'x-plans', kind: 'consequence', distractor: true, text: t`Les feuilles de $\operatorname{Ker}\beta$ sont les plans $z=c$.` },
      { id: 'x-coef', kind: 'consequence', distractor: true, text: t`Deux formes qui ne diffèrent que d'un terme ont des noyaux simultanément intégrables ou non.` },
    ],
    justifications: [
      { id: 'j-gens', label: t`$\beta(X)=y-y=0$, $\beta(Y)=x-x=0$.` },
      { id: 'j-crochet', label: t`$[X,Y]=Y'X-X'Y$ : $\partial_x(x)\partial_z-\partial_y(y)\partial_z$.` },
      { id: 'j-inv', label: 'Le crochet des générateurs reste dans D (il est nul) ; par bilinéarité et règle de Leibniz, D est involutive.' },
      { id: 'j-dF', label: t`$d(z-xy)=dz-y\,dx-x\,dy$.` },
      { id: 'j-niveau', label: t`Niveau régulier de $F$ ($dF\neq 0$ partout).`, theorem: 'niveau-regulier' },
      { id: 'j-integ', label: t`Les surfaces $F^{-1}(c)$ ont pour espaces tangents $\operatorname{Ker}dF=D$.` },
      { id: 'j-contraste', label: t`$\partial_y(y)=1$ ; $\alpha(\partial_z)=1$.` },
      { id: 'j-frob', label: 'Contraposée de Frobenius : non involutive entraîne non intégrable.', theorem: 'frobenius' },
      { id: 'j-syn', label: 'Réunion des deux volets.' },
    ],
    rules: [
      { from: ['h-beta'], to: 'gens', by: 'j-gens' },
      { from: ['gens'], to: 'crochet', by: 'j-crochet' },
      { from: ['crochet'], to: 'inv', by: 'j-inv' },
      { from: ['h-beta'], to: 'dF', by: 'j-dF' },
      { from: ['dF'], to: 'feuilles', by: 'j-niveau' },
      { from: ['feuilles', 'inv'], to: 'integ', by: 'j-integ' },
      { from: ['h-alpha'], to: 'contraste', by: 'j-contraste' },
      { from: ['contraste'], to: 'nonint', by: 'j-frob' },
      { from: ['integ', 'nonint'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-plans',
        verdict: 'incorrect',
        concept: 'lie-involutivite',
        message: t`Les plans $z=c$ sont les feuilles de $\operatorname{Ker}dz$ ; celles de $\operatorname{Ker}\beta$ sont les surfaces $z=xy+c$.`,
        counterexample: t`En $(1,0,0)$, $Y=\partial_y+\partial_z\in D$ n'est pas tangent au plan $z=0$.`,
      },
      {
        conclusion: 'x-coef',
        verdict: 'incorrect',
        concept: 'lie-involutivite',
        message: 'L’intégrabilité est une propriété fine : un seul terme peut la détruire.',
        counterexample: t`$\beta=dz-y\,dx-x\,dy$ a un noyau intégrable, $\alpha=dz-y\,dx$ non.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-alpha',
        label: t`Ne plus étudier la forme $\alpha$`,
        necessary: true,
        explanation: 'Le contraste disparaît : la seconde moitié de la conclusion n’est plus établie.',
        counterexample: t`Sans $\alpha$, rien ne montre qu'un seul terme peut détruire l'intégrabilité.`,
      },
    ],
  },
  solution: t`**(1) Involutivité.** $\beta(X)=y-y=0$ et $\beta(Y)=x-x=0$, et $X,Y$ sont indépendants : ils engendrent $D$. Avec $[X,Y]=Y'X-X'Y$ : $Y'X=\partial_x(x)\partial_z=\partial_z$ et $X'Y=\partial_y(y)\partial_z=\partial_z$, donc $[X,Y]=0\in D$. Par bilinéarité et Leibniz ($[fX,gY]=fg[X,Y]+f(Xg)Y-g(Yf)X$), tout crochet de champs de $D$ reste dans $D$.

**(2) Feuilles.** $F=z-xy$ vérifie $dF=\beta$ et $\partial_zF=1$ : chaque niveau est régulier, donc la surface $z=xy+c$ est une sous-variété de dimension $2$ d'espace tangent $\operatorname{Ker}dF=D$. Ce sont les feuilles.

**(3) Contraste.** Pour $\alpha=dz-y\,dx$, $X_1=\partial_y$, $Y_1=\partial_x+y\partial_z$ engendrent le noyau et $[X_1,Y_1]=\partial_z$ avec $\alpha(\partial_z)=1$ : non involutive, donc non intégrable.`,
  steps: ['Générateurs de Ker β.', 'Crochet nul : involutivité.', 'Feuilles par le niveau régulier de z − xy.', 'Contraste avec dz − y dx.'],
  commonErrors: [
    { id: 'e-plans', description: 'Prendre les plans horizontaux pour feuilles.', concept: 'lie-involutivite' },
    { id: 'e-coef', description: 'Croire qu’un terme de plus ou de moins ne change pas l’intégrabilité.', concept: 'lie-involutivite' },
  ],
  hints: [
    t`Calcule $Y'X$ et $X'Y$ : les deux valent $\partial_z$.`,
    t`Cherche $F$ avec $dF=\beta$ : quelle primitive de $y\,dx+x\,dy$ connais-tu ?`,
    t`Pour $\alpha=dz-y\,dx$, le terme $x\,dy$ manque : recalcule le crochet des générateurs de son noyau.`,
  ],
  rubric: rubric({
    hypotheses: 'Les générateurs sont vérifiés pour chacune des deux formes.',
    methode: 'Involutivité par le crochet, feuilles par le niveau régulier, contraste par Frobenius.',
    validite: 'Les deux crochets sont exacts.',
    justifications: 'Le théorème du niveau régulier et la contraposée de Frobenius sont invoqués à bon escient.',
    conclusion: 'Les deux volets sont conclus et comparés.',
  }),
  variant: {
    statement: t`Montrer que $\operatorname{Ker}(dz-2x\,dx)$ est intégrable et décrire ses feuilles.`,
    solution: t`$dz-2x\,dx=d(z-x^2)$ ; $F=z-x^2$ a des niveaux réguliers ($\partial_zF=1$), les surfaces $z=x^2+c$, dont les espaces tangents sont $\operatorname{Ker}dF$. Le noyau est donc intégrable ; les générateurs $\partial_x+2x\partial_z$ et $\partial_y$ ont un crochet nul.`,
  },
  verification: COMPLEMENT,
};

const mod: TheoremModule = {
  theorem: {
    id: 'frobenius',
    spaces: [t`$M$ variété lisse de dimension $n$, $D$ distribution lisse de rang constant $k$.`],
    hypotheses: [
      { id: 'rang', text: t`$D$ est lisse, de rang constant $k$ : localement engendrée par $k$ champs lisses indépendants.` },
    ],
    statement: t`$D$ est localement intégrable si et seulement si elle est involutive : $[X,Y]_p\in D_p$ pour tous champs $X,Y$ à valeurs dans $D$. Dans ce cas, près de tout point, il existe des coordonnées $(x_1,\dots,x_n)$ telles que $D=\operatorname{Vect}(\partial_{x_1},\dots,\partial_{x_k})$.`,
    conclusions: {
      existence: t`Si $D$ est involutive : des sous-variétés intégrales (les ensembles $x_{k+1},\dots,x_n$ constants).`,
      autre: 'L’involutivité est nécessaire ; elle est aussi suffisante.',
    },
    sourceProof: 'idee',
    proofOutline: [
      'Nécessité : les flots des champs de D préservent les feuilles, donc leur commutateur aussi ; son développement place [X,Y] dans le plan tangent à la feuille.',
      'Suffisance (admise dans le cours) : par récurrence sur k, redresser un champ de D puis construire des coordonnées adaptées, l’involutivité assurant la compatibilité.',
    ],
    warnings: [
      'Le rang constant ne suffit pas : la distribution de contact Ker(dz − y dx) n’est pas intégrable.',
      'Le crochet dépend des dérivées des champs : on ne teste pas l’involutivité sur les seules valeurs en un point.',
      'Il suffit de tester le crochet de générateurs locaux : la règle de Leibniz fait le reste.',
    ],
    usefulFor: 'Intégration des sous-algèbres de Lie en sous-groupes, contraintes non holonomes, directions accessibles en contrôle géométrique.',
    verification: FROM_LIE,
  },
  definitions: [
    { id: 'def-distribution', term: 'Distribution', statement: t`Une distribution lisse de rang $k$ associe à chaque $p$ un sous-espace $D_p\subset T_pM$ de dimension $k$, localement engendré par $k$ champs lisses.`, source: lie(54, 'Définition 10.1') },
    { id: 'def-sous-variete-integrale', term: 'Sous-variété intégrale', statement: t`$S$ est intégrale pour $D$ si $T_pS=D_p$ pour tout $p\in S$.`, source: lie(54, 'Définition 10.2') },
    { id: 'def-involutive', term: 'Distribution involutive', statement: t`$D$ est involutive si $[X,Y]_p\in D_p$ pour tous champs $X,Y$ à valeurs dans $D$.`, source: lie(54, 'Définition 10.3') },
  ],
  concepts: [],
  counterexamples: [
    {
      id: 'ce-frobenius-contact',
      theoremId: 'frobenius',
      title: 'Rang constant sans intégrabilité',
      claim: t`Toute distribution de rang $2$ sur $\mathbb R^3$ définie comme noyau d'une $1$-forme partout non nulle est intégrable.`,
      correctStatement: t`Une telle distribution est intégrable si et seulement si elle est involutive.`,
      task: t`Pour $\alpha=dz-x\,dy$, $X=\partial_x$ et $Y=\partial_y+x\,\partial_z$, calculer $\alpha([X,Y])$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\alpha([X,Y])$`, expected: '1' },
      explanation: t`$[X,Y]=\partial_z$ et $\alpha(\partial_z)=1\neq 0$ : la distribution n'est pas involutive, donc pas intégrable.`,
      concept: 'lie-involutivite',
      source: lie(55, '§ 10.4'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default mod;
