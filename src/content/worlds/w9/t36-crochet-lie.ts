/**
 * Résultat 36 — Crochet de Lie et commutateur de flots (cours de géométrie de Lie, § 7.1–7.3,
 * p. PDF 45–47). Convention du cours : [X,Y](f) = X(Yf) − Y(Xf), et
 * C_t = Φ^Y_{−t} ∘ Φ^X_{−t} ∘ Φ^Y_t ∘ Φ^X_t vérifie C_t(p) = p + t²[X,Y]_p + O(t³).
 * En coordonnées, [X,Y] = Y′X − X′Y (X′, Y′ jacobiennes). Pour des champs linéaires
 * X_A(x) = Ax, X_B(x) = Bx, cela donne [X_A,X_B] = X_{BA−AB} : attention au signe.
 */
import { t, rubric, lie, FROM_LIE, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'crochet-lie.facile',
  theoremId: 'crochet-lie',
  level: 'facile',
  title: t`Le crochet de $\partial_x$ et $x\,\partial_y$, et le petit quadrilatère`,
  statement: t`Dans $\mathbb R^2$, soient $X=\partial_x$ et $Y=x\,\partial_y$. Calculer $[X,Y]$, expliciter les flots, et montrer que $C_t=\Phi^Y_{-t}\circ\Phi^X_{-t}\circ\Phi^Y_t\circ\Phi^X_t$ vérifie exactement $C_t(x,y)=(x,y+t^2)$. Calculer $C_{1/2}(1,2)$.`,
  source: lie(46, 'Exemple calculé, § 7.3'),
  prerequisites: [],
  concepts: ['lie-crochet-convention', 'lie-crochet-commutation', 'calcul-exact'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-champs', kind: 'hypothese', text: t`$X=\partial_x$ et $Y=x\,\partial_y$ sur $\mathbb R^2$ : $X^1=1$, $X^2=0$, $Y^1=0$, $Y^2=x$.` },
      { id: 'd-crochet', kind: 'definition', text: t`$[X,Y]=\sum_j\big(X^i\partial_iY^j-Y^i\partial_iX^j\big)\partial_j$, avec $[X,Y](f)=X(Yf)-Y(Xf)$.` },
      {
        id: 'crochet',
        kind: 'egalite',
        text: t`$[X,Y]=\partial_y$.`,
        masked: t`Composantes de $[X,Y]$ sur $(\partial_x,\partial_y)$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Composantes de $[X,Y]$ sur $(\partial_x,\partial_y)$`, expected: ['0', '1'], labels: ['∂x', '∂y'] },
      },
      { id: 'flots', kind: 'egalite', text: t`$\Phi^X_t(x,y)=(x+t,y)$ et $\Phi^Y_t(x,y)=(x,y+tx)$.` },
      { id: 'compo', kind: 'egalite', text: t`$C_t(x,y)=(x,\,y+t^2)$ pour tous $t,x,y$.` },
      {
        id: 'num',
        kind: 'egalite',
        text: t`$C_{1/2}(1,2)=\big(1,\tfrac94\big)$.`,
        masked: t`Valeur de $C_{1/2}(1,2)$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Coordonnées de $C_{1/2}(1,2)$`, expected: ['1', '9/4'], labels: ['x', 'y'] },
      },
      { id: 'compar', kind: 'consequence', text: t`$C_t(p)-p=t^2[X,Y]_p$ exactement : le défaut de fermeture est d'ordre $2$ et dirigé par le crochet.` },
      { id: 'fin', kind: 'conclusion', text: t`$[X,Y]=\partial_y\neq 0$, les flots ne commutent pas, et $C_t(x,y)=(x,y+t^2)$.` },
      { id: 'x-ortho', kind: 'consequence', distractor: true, text: t`Les flots de $X$ et $Y$ commutent, puisque $X$ et $Y$ sont orthogonaux en tout point.` },
      { id: 'x-signe', kind: 'egalite', distractor: true, text: t`$[X,Y]=-\partial_y$.` },
    ],
    justifications: [
      { id: 'j-coord', label: t`Formule en coordonnées : seul $\partial_xY^2=1$ est non nul.` },
      { id: 'j-flots', label: t`Résolution des systèmes $\dot x=1,\dot y=0$ et $\dot x=0,\dot y=x$ ; unicité par Cauchy–Lipschitz.`, theorem: 'theoreme-cauchy-lipschitz' },
      { id: 'j-compo', label: t`Composition de droite à gauche : $(x,y)\mapsto(x+t,y)\mapsto(x+t,y+t(x+t))\mapsto(x,y+t(x+t))\mapsto(x,y+t(x+t)-tx)$.` },
      { id: 'j-num', label: t`Substitution $t=\tfrac12$, $x=1$, $y=2$.` },
      { id: 'j-compar', label: t`Comparaison de $(0,t^2)$ avec $t^2[X,Y]_p=t^2(0,1)$.` },
      { id: 'j-syn', label: 'Réunion des résultats.' },
      { id: 'j-ortho', label: 'Deux champs orthogonaux ont des flots qui commutent.' },
    ],
    rules: [
      { from: ['h-champs', 'd-crochet'], to: 'crochet', by: 'j-coord' },
      { from: ['h-champs'], to: 'flots', by: 'j-flots' },
      { from: ['flots'], to: 'compo', by: 'j-compo' },
      { from: ['compo'], to: 'num', by: 'j-num' },
      { from: ['compo', 'crochet'], to: 'compar', by: 'j-compar' },
      { from: ['crochet', 'compo', 'num', 'compar'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-ortho',
        verdict: 'incorrect',
        concept: 'lie-crochet-commutation',
        message: 'Le crochet mesure la non-commutation des flots, pas un angle : l’orthogonalité ne dit rien de la commutation.',
        counterexample: t`Ici $\langle(1,0),(0,x)\rangle=0$ partout, et pourtant $C_1(0,0)=(0,1)\neq(0,0)$.`,
      },
      {
        conclusion: 'x-ortho',
        by: 'j-ortho',
        verdict: 'incorrect',
        concept: 'lie-crochet-commutation',
        message: 'Cette règle est fausse.',
        counterexample: t`$X=\partial_x$ et $Y=x\,\partial_y$ sont orthogonaux et leurs flots ne commutent pas.`,
      },
      {
        conclusion: 'x-signe',
        verdict: 'incorrect',
        concept: 'lie-crochet-convention',
        message: t`Avec la convention $[X,Y](f)=X(Yf)-Y(Xf)$, on trouve $+\partial_y$ ; le signe opposé correspond à l'autre convention ou à l'autre ordre de composition.`,
        counterexample: t`$X(Yf)-Y(Xf)=\partial_x(xf_y)-x\,\partial_y(f_x)=f_y$.`,
      },
    ],
    removable: [],
  },
  solution: t`**Crochet.** Avec $X^1=1$, $X^2=0$, $Y^1=0$, $Y^2=x$, le seul terme non nul est $X^1\partial_xY^2=1$ : $[X,Y]=\partial_y$. On le vérifie sur une fonction : $X(Yf)-Y(Xf)=\partial_x(xf_y)-x\partial_y(f_x)=f_y$.

**Flots.** $\Phi^X_t(x,y)=(x+t,y)$ et $\Phi^Y_t(x,y)=(x,y+tx)$.

**Commutateur.** De droite à gauche : $(x,y)\mapsto(x+t,y)\mapsto(x+t,\,y+t(x+t))\mapsto(x,\,y+t(x+t))\mapsto(x,\,y+t(x+t)-tx)=(x,\,y+t^2)$.

**Lecture.** $C_t(p)-p=(0,t^2)=t^2[X,Y]_p$ : les termes d'ordre $1$ s'annulent, le premier défaut est quadratique et dirigé par le crochet. En particulier $C_{1/2}(1,2)=(1,\tfrac94)$.`,
  steps: [
    'Crochet en coordonnées.',
    'Flots explicites.',
    'Composition des quatre flots, de droite à gauche.',
    'Identification du défaut avec t²[X,Y].',
  ],
  commonErrors: [
    { id: 'e-ortho', description: 'Croire que des champs orthogonaux ont des flots qui commutent.', concept: 'lie-crochet-commutation' },
    { id: 'e-ordre', description: 'Composer les flots dans le mauvais ordre et trouver le signe opposé.', concept: 'lie-crochet-convention' },
  ],
  hints: [
    t`Écris les composantes $X^i$ et $Y^j$ : quelle dérivée partielle $\partial_iY^j$ est non nulle ?`,
    t`Les flots se lisent sur les équations $\dot x=1$ et $\dot y=x$ ; compose-les en lisant $C_t$ de droite à gauche.`,
    t`Après les quatre étapes, la première coordonnée revient à $x$ ; la seconde vaut $y+t(x+t)-tx$.`,
  ],
  rubric: rubric({
    hypotheses: 'Les composantes des champs sont correctement lues.',
    methode: 'Le crochet est calculé, puis comparé au commutateur des flots.',
    validite: 'La composition des quatre flots est exacte.',
    justifications: 'L’ordre de composition et la convention du crochet sont explicités.',
    conclusion: t`$[X,Y]=\partial_y$ et $C_t(x,y)=(x,y+t^2)$ sont conclus.`,
  }),
  variant: {
    statement: t`Pour $X=\partial_x$ et $Y=e^x\,\partial_y$ sur $\mathbb R^2$, calculer $[X,Y]$ et le commutateur $C_t(x,y)$, puis vérifier $C_t(p)=p+t^2[X,Y]_p+O(t^3)$.`,
    solution: t`$[X,Y]=\partial_x(e^x)\partial_y=e^x\partial_y$. Les flots sont $\Phi^X_t(x,y)=(x+t,y)$ et $\Phi^Y_t(x,y)=(x,y+te^x)$. Alors $C_t(x,y)=(x,\,y+te^{x+t}-te^x)=(x,\,y+te^x(e^t-1))$, et $te^x(e^t-1)=t^2e^x+O(t^3)$ : $C_t(p)=p+t^2[X,Y]_p+O(t^3)$.`,
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h-champs', kind: 'hypothese', text: t`$X=\partial_x$ et $Y=e^x\,\partial_y$ sur $\mathbb R^2$.` },
        { id: 'crochet', kind: 'egalite', text: t`$[X,Y]=e^x\,\partial_y$.` },
        { id: 'flots', kind: 'egalite', text: t`$\Phi^X_t(x,y)=(x+t,y)$ et $\Phi^Y_t(x,y)=(x,y+te^x)$.` },
        { id: 'compo', kind: 'egalite', text: t`$C_t(x,y)=\big(x,\,y+te^x(e^t-1)\big)$.` },
        { id: 'dl', kind: 'egalite', text: t`$te^x(e^t-1)=t^2e^x+O(t^3)$.` },
        { id: 'fin', kind: 'conclusion', text: t`$C_t(p)=p+t^2[X,Y]_p+O(t^3)$ avec $[X,Y]=e^x\partial_y$.` },
        { id: 'x-exact', kind: 'egalite', distractor: true, text: t`$C_t(x,y)=(x,\,y+t^2e^x)$ exactement.` },
      ],
      justifications: [
        { id: 'j-coord', label: t`Formule en coordonnées : $\partial_x(e^x)=e^x$.` },
        { id: 'j-flots', label: 'Résolution des équations des courbes intégrales.' },
        { id: 'j-compo', label: 'Composition des quatre flots, de droite à gauche.' },
        { id: 'j-dl', label: t`$e^t-1=t+O(t^2)$.` },
        { id: 'j-syn', label: 'Comparaison avec le crochet.' },
      ],
      rules: [
        { from: ['h-champs'], to: 'crochet', by: 'j-coord' },
        { from: ['h-champs'], to: 'flots', by: 'j-flots' },
        { from: ['flots'], to: 'compo', by: 'j-compo' },
        { from: ['compo'], to: 'dl', by: 'j-dl' },
        { from: ['crochet', 'dl'], to: 'fin', by: 'j-syn' },
      ],
      traps: [
        {
          conclusion: 'x-exact',
          verdict: 'incorrect',
          concept: 'calcul-exact',
          message: 'Le développement n’est exact qu’à l’ordre 2 : le reste en t³ n’est pas nul ici.',
          counterexample: t`En $(0,0)$ et $t=1$ : $e-1\neq 1$.`,
        },
      ],
      removable: [],
    },
  },
  verification: FROM_LIE,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'crochet-lie.intermediaire',
  theoremId: 'crochet-lie',
  level: 'intermediaire',
  title: t`Champs linéaires : $[y\partial_x,\,x\partial_y]$ et le signe du commutateur`,
  statement: t`Soient $X=y\,\partial_x$ et $Y=x\,\partial_y$, c'est-à-dire $X(v)=Av$ et $Y(v)=Bv$ avec $A=\begin{pmatrix}0&1\\0&0\end{pmatrix}$, $B=\begin{pmatrix}0&0\\1&0\end{pmatrix}$. Établir $[X,Y](v)=(BA-AB)v$, en déduire $[X,Y]=-x\,\partial_x+y\,\partial_y$, puis calculer $C_t(1,0)$ et vérifier le développement $C_t(p)=p+t^2[X,Y]_p+O(t^3)$.`,
  source: lie(47, 'Exercice 7.4'),
  prerequisites: [],
  concepts: ['lie-crochet-convention', 'lie-crochet-commutation', 'calcul-exact'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-lin', kind: 'hypothese', text: t`$X(v)=Av$ et $Y(v)=Bv$, avec $A=\begin{pmatrix}0&1\\0&0\end{pmatrix}$ et $B=\begin{pmatrix}0&0\\1&0\end{pmatrix}$.` },
      { id: 'd-crochet', kind: 'definition', text: t`En coordonnées, $[X,Y]=Y'X-X'Y$, où $X'$ et $Y'$ sont les matrices jacobiennes.` },
      { id: 'lin', kind: 'egalite', text: t`$X'=A$, $Y'=B$, donc $[X,Y](v)=BAv-ABv=(BA-AB)v$.` },
      {
        id: 'matrice',
        kind: 'egalite',
        text: t`$BA-AB=\begin{pmatrix}-1&0\\0&1\end{pmatrix}$, donc $[X,Y]=-x\,\partial_x+y\,\partial_y$.`,
        masked: t`Matrice $BA-AB$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Coefficients de $BA-AB$, ligne par ligne`, expected: ['-1', '0', '0', '1'], labels: ['a11', 'a12', 'a21', 'a22'] },
      },
      { id: 'flots', kind: 'egalite', text: t`$\Phi^X_t(x,y)=(x+ty,\,y)$ et $\Phi^Y_t(x,y)=(x,\,y+tx)$.` },
      {
        id: 'compo',
        kind: 'egalite',
        text: t`$C_t(1,0)=(1-t^2,\,t^3)$.`,
        masked: t`Valeur de $C_t(1,0)$ : à calculer (évaluer en $t=\tfrac12$).`,
        check: { kind: 'rational-vector', prompt: t`Coordonnées de $C_{1/2}(1,0)$`, expected: ['3/4', '1/8'], labels: ['x', 'y'] },
      },
      { id: 'dl', kind: 'egalite', text: t`$C_t(1,0)-(1,0)=t^2(-1,0)+(0,t^3)=t^2[X,Y]_{(1,0)}+O(t^3)$.` },
      { id: 'fin', kind: 'conclusion', text: t`$[X,Y]=-x\,\partial_x+y\,\partial_y$, champ associé à $BA-AB=-[A,B]$, et le commutateur des flots en $(1,0)$ vaut $(1-t^2,t^3)$, conformément au développement.` },
      { id: 'x-commutateur', kind: 'egalite', distractor: true, text: t`$[X,Y](v)=(AB-BA)v$.` },
      { id: 'x-exact', kind: 'egalite', distractor: true, after: ['compo'], text: t`$C_t(p)=p+t^2[X,Y]_p$ exactement pour tout $p$.` },
    ],
    justifications: [
      { id: 'j-jac', label: t`La jacobienne de $v\mapsto Mv$ est $M$.` },
      { id: 'j-produit', label: 'Produits matriciels.' },
      { id: 'j-flots', label: t`Résolution de $\dot x=y,\dot y=0$ et de $\dot x=0,\dot y=x$.`, theorem: 'theoreme-cauchy-lipschitz' },
      { id: 'j-compo', label: t`$(1,0)\mapsto(1,0)\mapsto(1,t)\mapsto(1-t^2,t)\mapsto(1-t^2,\,t-t(1-t^2))$.` },
      { id: 'j-dl', label: t`Lecture des termes d'ordre $2$ et $3$, avec $[X,Y]_{(1,0)}=(-1,0)$.` },
      { id: 'j-syn', label: 'Réunion des résultats.' },
      { id: 'j-algebre', label: t`L'application $M\mapsto X_M$ respecte le crochet : $[X_A,X_B]=X_{[A,B]}$.` },
    ],
    rules: [
      { from: ['h-lin', 'd-crochet'], to: 'lin', by: 'j-jac' },
      { from: ['lin'], to: 'matrice', by: 'j-produit' },
      { from: ['h-lin'], to: 'flots', by: 'j-flots' },
      { from: ['flots'], to: 'compo', by: 'j-compo' },
      { from: ['compo', 'matrice'], to: 'dl', by: 'j-dl' },
      { from: ['matrice', 'compo', 'dl'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-commutateur',
        verdict: 'incorrect',
        concept: 'lie-crochet-convention',
        message: t`Pour des champs linéaires et la convention $[X,Y]=Y'X-X'Y$, on obtient $BA-AB$, l'opposé du commutateur matriciel $[A,B]$.`,
        counterexample: t`En $v=(1,0)$ : $(BA-AB)v=(-1,0)$ alors que $(AB-BA)v=(1,0)$ ; le développement de $C_t(1,0)$ tranche en faveur de $(-1,0)$.`,
      },
      {
        conclusion: 'x-commutateur',
        by: 'j-algebre',
        verdict: 'incorrect',
        concept: 'lie-crochet-convention',
        message: t`Avec ces conventions, $M\mapsto X_M$ renverse le crochet : $[X_A,X_B]=X_{BA-AB}=-X_{[A,B]}$.`,
      },
      {
        conclusion: 'x-exact',
        verdict: 'incorrect',
        concept: 'calcul-exact',
        message: 'Le développement contient un reste : ici la seconde composante vaut t³, pas 0.',
        counterexample: t`$C_t(1,0)=(1-t^2,t^3)\neq(1-t^2,0)$ pour $t\neq 0$.`,
      },
    ],
    removable: [],
  },
  solution: t`**Crochet.** La jacobienne de $v\mapsto Av$ est $A$. Avec $[X,Y]=Y'X-X'Y$ : $[X,Y](v)=B(Av)-A(Bv)=(BA-AB)v$. Or $AB=\begin{pmatrix}1&0\\0&0\end{pmatrix}$ et $BA=\begin{pmatrix}0&0\\0&1\end{pmatrix}$, donc $BA-AB=\begin{pmatrix}-1&0\\0&1\end{pmatrix}$ et $[X,Y]=-x\,\partial_x+y\,\partial_y$ (cours, exercice 7.4). C'est le champ de $-[A,B]$ : le passage $M\mapsto X_M$ renverse le crochet.

**Flots.** $\Phi^X_t(x,y)=(x+ty,y)$, $\Phi^Y_t(x,y)=(x,y+tx)$.

**Commutateur en $(1,0)$.** $(1,0)\mapsto(1,0)\mapsto(1,t)\mapsto(1-t^2,t)\mapsto(1-t^2,\,t-t(1-t^2))=(1-t^2,t^3)$. Donc $C_t(1,0)-(1,0)=t^2(-1,0)+O(t^3)=t^2[X,Y]_{(1,0)}+O(t^3)$ ; en $t=\tfrac12$, $C_{1/2}(1,0)=(\tfrac34,\tfrac18)$.`,
  steps: [
    t`Jacobiennes des champs linéaires, puis $[X,Y]=(BA-AB)v$.`,
    t`Calcul de $BA-AB$.`,
    t`Flots et composition en $(1,0)$.`,
    'Comparaison avec le développement à l’ordre 2.',
  ],
  commonErrors: [
    { id: 'e-signe', description: 'Identifier le crochet des champs linéaires au commutateur matriciel AB − BA.', concept: 'lie-crochet-convention' },
    { id: 'e-exact', description: 'Oublier le reste en t³ du développement.', concept: 'calcul-exact' },
  ],
  hints: [
    t`Pour un champ linéaire $v\mapsto Mv$, la jacobienne est $M$ : applique $[X,Y]=Y'X-X'Y$.`,
    t`Calcule $AB$ et $BA$ séparément ; l'ordre importe.`,
    t`Pour le commutateur, suis le point $(1,0)$ à travers les quatre flots, de droite à gauche.`,
  ],
  rubric: rubric({
    hypotheses: 'Les champs sont écrits comme des champs linéaires, jacobiennes identifiées.',
    methode: 'Formule en coordonnées, puis contrôle par le commutateur des flots.',
    validite: 'Les produits matriciels et la composition sont exacts.',
    justifications: 'Le renversement du crochet par M ↦ X_M est expliqué.',
    conclusion: t`$[X,Y]=-x\partial_x+y\partial_y$ et $C_t(1,0)=(1-t^2,t^3)$ sont conclus.`,
  }),
  variant: {
    statement: t`Pour $X=-y\,\partial_x+x\,\partial_y$ (rotations) et $Y=x\,\partial_x+y\,\partial_y$ (homothéties), calculer $[X,Y]$ et en déduire que leurs flots commutent.`,
    solution: t`$X(v)=Jv$ et $Y(v)=Iv$ avec $J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$. Alors $[X,Y](v)=(IJ-JI)v=0$. Les flots, $v\mapsto R_tv$ (rotation d'angle $t$) et $v\mapsto e^tv$, commutent effectivement : $R_t(e^sv)=e^sR_tv$.`,
  },
  verification: FROM_LIE,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'crochet-lie.difficile',
  theoremId: 'crochet-lie',
  level: 'difficile',
  title: t`Démontrer $C_t(p)=p+t^2[X,Y]_p+O(t^3)$`,
  statement: t`Soient $X,Y$ deux champs de classe $C^3$ sur un ouvert de $\mathbb R^n$, de flots $\Phi^X_t$, $\Phi^Y_t$, et $p$ fixé. En notant $X'$, $Y'$ les jacobiennes, établir par des développements à l'ordre $2$ que $C_t=\Phi^Y_{-t}\circ\Phi^X_{-t}\circ\Phi^Y_t\circ\Phi^X_t$ vérifie $C_t(p)=p+t^2\,(Y'X-X'Y)(p)+O(t^3)$, et identifier $Y'X-X'Y$ au crochet $[X,Y]$.`,
  source: lie(45, 'Le commutateur de flots, § 7.2'),
  prerequisites: [],
  concepts: ['lie-crochet-convention', 'lie-crochet-commutation', 'justification-absente'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-champs', kind: 'hypothese', text: t`$X,Y$ sont de classe $C^3$ ; leurs flots sont définis près de $p$ pour $|t|$ petit.` },
      { id: 'd-flot', kind: 'definition', text: t`$\partial_t\Phi^X_t(q)=X(\Phi^X_t(q))$ et $\Phi^X_0(q)=q$ ; de même pour $Y$.` },
      { id: 'taylor', kind: 'egalite', text: t`$\Phi^X_t(q)=q+tX(q)+\tfrac{t^2}2X'(q)X(q)+O(t^3)$, uniformément pour $q$ près de $p$ ; de même pour $Y$.` },
      { id: 'a', kind: 'egalite', text: t`$a:=\Phi^X_t(p)=p+tX+\tfrac{t^2}2X'X+O(t^3)$, tout étant évalué en $p$.` },
      { id: 'b', kind: 'egalite', text: t`$b:=\Phi^Y_t(a)=p+t(X+Y)+t^2\big(\tfrac12X'X+Y'X+\tfrac12Y'Y\big)+O(t^3)$.` },
      { id: 'c', kind: 'egalite', text: t`$c:=\Phi^X_{-t}(b)=p+tY+t^2\big(Y'X-X'Y+\tfrac12Y'Y\big)+O(t^3)$.` },
      { id: 'd', kind: 'egalite', text: t`$C_t(p)=\Phi^Y_{-t}(c)=p+t^2(Y'X-X'Y)+O(t^3)$.` },
      { id: 'd-crochet', kind: 'definition', text: t`$[X,Y](f)=X(Yf)-Y(Xf)$.` },
      { id: 'coord', kind: 'egalite', text: t`En coordonnées, $[X,Y]=\sum_j\big(X^i\partial_iY^j-Y^i\partial_iX^j\big)\partial_j=Y'X-X'Y$.` },
      { id: 'fin', kind: 'conclusion', text: t`$C_t(p)=p+t^2[X,Y]_p+O(t^3)$ : les termes d'ordre $1$ s'annulent et le premier défaut est dirigé par le crochet.` },
      { id: 'x-ordre1', kind: 'egalite', distractor: true, text: t`$C_t(p)=p+t[X,Y]_p+O(t^2)$.` },
      { id: 'x-somme', kind: 'egalite', distractor: true, text: t`$\Phi^Y_t\circ\Phi^X_t=\Phi^{X+Y}_t$ exactement.` },
    ],
    justifications: [
      { id: 'j-taylor', label: t`Taylor en $t$ : $\partial_t\Phi=X(\Phi)$ et $\partial_t^2\Phi=X'(\Phi)X(\Phi)$, restes uniformes car $X\in C^3$.` },
      { id: 'j-a', label: t`Développement en $q=p$.` },
      { id: 'j-b', label: t`Développement en $q=a$, avec $Y(a)=Y+tY'X+O(t^2)$.` },
      { id: 'j-c', label: t`Développement de $\Phi^X_{-t}$ en $q=b$, avec $X(b)=X+tX'(X+Y)+O(t^2)$ ; les termes $\pm tX$ et $\pm\tfrac12t^2X'X$ se compensent.` },
      { id: 'j-d', label: t`Développement de $\Phi^Y_{-t}$ en $q=c$, avec $Y(c)=Y+tY'Y+O(t^2)$ ; les termes $\pm tY$ et $\pm\tfrac12t^2Y'Y$ se compensent.` },
      { id: 'j-coord', label: t`$X(Yf)-Y(Xf)=X^i\partial_i(Y^j\partial_jf)-Y^i\partial_i(X^j\partial_jf)$ ; les dérivées secondes de $f$ se compensent par le théorème de Schwarz.`, theorem: 'schwarz' },
      { id: 'j-syn', label: t`Identification du coefficient de $t^2$.` },
      { id: 'j-flot-somme', label: 'Le flot d’une somme est la composée des flots.' },
    ],
    rules: [
      { from: ['h-champs', 'd-flot'], to: 'taylor', by: 'j-taylor' },
      { from: ['taylor'], to: 'a', by: 'j-a' },
      { from: ['taylor', 'a'], to: 'b', by: 'j-b' },
      { from: ['taylor', 'b'], to: 'c', by: 'j-c' },
      { from: ['taylor', 'c'], to: 'd', by: 'j-d' },
      { from: ['d-crochet', 'h-champs'], to: 'coord', by: 'j-coord' },
      { from: ['d', 'coord'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-ordre1',
        verdict: 'incorrect',
        concept: 'lie-crochet-commutation',
        message: 'Les termes d’ordre 1 se compensent exactement : le défaut de fermeture est quadratique.',
        counterexample: t`Pour $X=\partial_x$, $Y=x\partial_y$ : $C_t(x,y)-(x,y)=(0,t^2)$, qui n'a pas de terme en $t$.`,
      },
      {
        conclusion: 'x-somme',
        verdict: 'incorrect',
        concept: 'lie-crochet-commutation',
        message: 'La composée des flots coïncide avec le flot de la somme au premier ordre seulement, sauf si les flots commutent.',
        counterexample: t`Pour $X=\partial_x$, $Y=x\partial_y$ : $\Phi^Y_t\circ\Phi^X_t(0,0)=(t,t^2)$ alors que $\Phi^{X+Y}_t(0,0)=(t,\tfrac{t^2}2)$.`,
      },
      {
        conclusion: 'x-somme',
        by: 'j-flot-somme',
        verdict: 'incorrect',
        concept: 'lie-crochet-commutation',
        message: 'Cette règle n’est vraie que pour des champs qui commutent.',
      },
    ],
    removable: [
      {
        hypothesis: 'h-champs',
        label: t`Ne plus supposer les champs de classe $C^3$`,
        necessary: true,
        explanation: 'Sans régularité, les développements de Taylor à l’ordre 2 avec reste uniforme ne sont plus disponibles.',
        counterexample: t`Pour un champ seulement continu, comme $Y=\sqrt{|x|}\,\partial_y$, la jacobienne n'existe pas en $x=0$ et l'expression $Y'X-X'Y$ n'a pas de sens.`,
      },
    ],
  },
  solution: t`**Développement d'un flot.** Comme $\partial_t\Phi^X_t=X(\Phi^X_t)$, on a $\partial_t^2\Phi^X_t=X'(\Phi^X_t)X(\Phi^X_t)$, d'où $\Phi^X_t(q)=q+tX(q)+\frac{t^2}2X'(q)X(q)+O(t^3)$ uniformément près de $p$ (ici $X\in C^3$).

**Quatre étapes**, tout étant évalué en $p$ :
- $a=\Phi^X_t(p)=p+tX+\frac{t^2}2X'X+O(t^3)$ ;
- $b=\Phi^Y_t(a)$ : avec $Y(a)=Y+tY'X+O(t^2)$, $b=p+t(X+Y)+t^2(\frac12X'X+Y'X+\frac12Y'Y)+O(t^3)$ ;
- $c=\Phi^X_{-t}(b)$ : avec $X(b)=X+tX'(X+Y)+O(t^2)$, $c=p+tY+t^2(Y'X-X'Y+\frac12Y'Y)+O(t^3)$ ;
- $C_t(p)=\Phi^Y_{-t}(c)$ : avec $Y(c)=Y+tY'Y+O(t^2)$, $C_t(p)=p+t^2(Y'X-X'Y)+O(t^3)$.

**Identification.** $X(Yf)-Y(Xf)=X^i\partial_iY^j\,\partial_jf-Y^i\partial_iX^j\,\partial_jf$, les termes en dérivées secondes se compensant (Schwarz) : $[X,Y]=Y'X-X'Y$. Donc $C_t(p)=p+t^2[X,Y]_p+O(t^3)$.`,
  steps: [
    'Taylor à l’ordre 2 d’un flot.',
    'Composition des quatre flots, en suivant les compensations.',
    'Identification du coefficient de t² au crochet en coordonnées.',
  ],
  commonErrors: [
    { id: 'e-ordre1', description: 'Annoncer un défaut d’ordre t.', concept: 'lie-crochet-commutation' },
    { id: 'e-somme', description: 'Confondre la composée des flots avec le flot de la somme.', concept: 'lie-crochet-commutation' },
  ],
  hints: [
    t`Commence par développer un seul flot : que vaut $\partial_t^2\Phi^X_t$ ?`,
    t`À chaque étape, développe aussi le champ au point courant : $Y(a)=Y(p)+tY'(p)X(p)+O(t^2)$.`,
    t`Dans les deux dernières étapes, les termes $\pm tX$, $\pm tY$, $\pm\frac12t^2X'X$, $\pm\frac12t^2Y'Y$ se compensent : il reste $t^2(Y'X-X'Y)$.`,
  ],
  rubric: rubric({
    hypotheses: 'La régularité des champs justifie les restes uniformes.',
    methode: 'Composition de quatre développements de Taylor, puis identification.',
    validite: 'Les compensations d’ordre 1 et 2 sont correctement suivies.',
    justifications: 'Le crochet en coordonnées est établi par Schwarz.',
    conclusion: 'Le développement C_t(p) = p + t²[X,Y]_p + O(t³) est conclu, avec le bon signe.',
  }),
  variant: {
    statement: t`Montrer que si les flots de $X$ et $Y$ commutent pour $|t|$ petit, alors $[X,Y]=0$.`,
    solution: t`Si $\Phi^X_t\circ\Phi^Y_t=\Phi^Y_t\circ\Phi^X_t$, alors $C_t=\Phi^Y_{-t}\circ\Phi^X_{-t}\circ\Phi^Y_t\circ\Phi^X_t=\mathrm{id}$, donc $p=C_t(p)=p+t^2[X,Y]_p+O(t^3)$ ; en divisant par $t^2$ et en faisant $t\to 0$, $[X,Y]_p=0$ pour tout $p$.`,
  },
  verification: COMPLEMENT,
};

const mod: TheoremModule = {
  theorem: {
    id: 'crochet-lie',
    spaces: [t`$M$ variété lisse, $X,Y$ champs de vecteurs lisses de flots locaux $\Phi^X_t$, $\Phi^Y_t$.`],
    hypotheses: [
      { id: 'lisses', text: t`$X$ et $Y$ sont lisses (au moins $C^3$ pour le développement).`, whenRemoved: 'Sans dérivabilité, ni le crochet ni le développement à l’ordre 2 n’ont de sens.' },
    ],
    statement: t`Le crochet $[X,Y](f)=X(Yf)-Y(Xf)$ est un champ de vecteurs ; il est bilinéaire, antisymétrique et vérifie l'identité de Jacobi. Le commutateur $C_t=\Phi^Y_{-t}\circ\Phi^X_{-t}\circ\Phi^Y_t\circ\Phi^X_t$ vérifie $C_t(p)=p+t^2[X,Y]_p+O(t^3)$ en coordonnées locales.`,
    conclusions: {
      autre: 'Le crochet mesure, au premier ordre non trivial, le défaut de commutation des flots ; il est nul si les flots commutent.',
    },
    sourceProof: 'idee',
    proofOutline: [
      t`En coordonnées, les dérivées secondes de $f$ se compensent dans $X(Yf)-Y(Xf)$ : le crochet est un champ, $[X,Y]=Y'X-X'Y$.`,
      'Développer chacun des quatre flots à l’ordre 2 et composer : les termes d’ordre 1 se compensent, le terme d’ordre 2 est le crochet.',
      'Antisymétrie et Jacobi se lisent sur la définition par les dérivations.',
    ],
    warnings: [
      'Le signe dépend de la convention du crochet et de l’ordre des quatre compositions.',
      t`Pour des champs linéaires $v\mapsto Av$, on obtient $[X_A,X_B]=X_{BA-AB}$, l'opposé du commutateur matriciel.`,
      'Le crochet ne mesure pas un angle : des champs orthogonaux peuvent avoir un crochet non nul.',
    ],
    usefulFor: 'Frobenius (involutivité), algèbres de Lie, symétries des équations différentielles, dérivée de Lie.',
    verification: FROM_LIE,
  },
  definitions: [
    { id: 'def-crochet-lie', term: 'Crochet de Lie de deux champs', statement: t`$[X,Y](f)=X(Yf)-Y(Xf)$ ; en coordonnées $[X,Y]=\big(X^i\partial_iY^j-Y^i\partial_iX^j\big)\partial_j$.`, source: lie(45, 'Définition 7.1') },
    { id: 'def-flot', term: 'Flot d’un champ', statement: t`$\Phi^X_t$ est défini par $\partial_t\Phi^X_t(p)=X(\Phi^X_t(p))$, $\Phi^X_0(p)=p$ ; localement $\Phi^X_{t+s}=\Phi^X_t\circ\Phi^X_s$.`, source: lie(42, 'Flot local, § 6.2') },
    { id: 'def-derivee-lie', term: 'Dérivée de Lie', statement: t`$\mathcal L_XT=\frac{d}{dt}\big|_{t=0}(\Phi^X_t)^*T$ ; pour un champ, $\mathcal L_XY=[X,Y]$.`, source: lie(46, 'Définition 7.3') },
  ],
  concepts: [],
  counterexamples: [
    {
      id: 'ce-crochet-orthogonaux',
      theoremId: 'crochet-lie',
      title: 'Orthogonaux mais non commutants',
      claim: 'Si deux champs du plan sont orthogonaux en tout point, leurs flots commutent.',
      correctStatement: t`Les flots de deux champs commutent si et seulement si $[X,Y]=0$ (champs complets) ; l'orthogonalité n'intervient pas.`,
      task: t`Pour $X=\partial_x$ et $Y=x\,\partial_y$, orthogonaux en tout point, calculer la seconde coordonnée de $C_1(0,0)$, où $C_t=\Phi^Y_{-t}\circ\Phi^X_{-t}\circ\Phi^Y_t\circ\Phi^X_t$.`,
      check: { kind: 'rational', prompt: t`Seconde coordonnée de $C_1(0,0)$`, expected: '1' },
      explanation: t`$C_t(x,y)=(x,y+t^2)$, donc $C_1(0,0)=(0,1)\neq(0,0)$ : les flots ne commutent pas, alors que $\langle(1,0),(0,x)\rangle=0$ partout.`,
      concept: 'lie-crochet-commutation',
      source: lie(46, '§ 7.3'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default mod;
