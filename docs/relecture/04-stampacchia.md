# 4. Stampacchia (`stampacchia`) — polycopié p. PDF 7, section 1.5

## Fiche

Espaces : $V$ : espace de Hilbert réel, de produit scalaire $\langle\cdot,\cdot\rangle_V$ ; $V'$ est son dual et $\langle f,v\rangle$ désigne la dualité. | $K\subset V$ : partie non vide, fermée, convexe ; $a:V\times V\to\mathbb R$ : forme bilinéaire, non nécessairement symétrique.

Hypothèses :
- $V$ est un espace de Hilbert réel. — Sans elle : Sur $E=C([-1,1])$ muni du produit scalaire de $L^2$, avec $a$ le produit scalaire, $K=E$ et $f(v)=\int_0^1v$, l'inéquation équivaut à représenter $f$ par un élément de $E$, ce qui est impossible.
- $K$ est non vide, fermé et convexe. — Sans elle : $V=\mathbb R$, $a(u,v)=uv$ : pour $K=\{-1,1\}$ et $f=0$, aucune solution ($v=-u$ donne $-2<0$) ; pour $K=\,]0,1[$ et $f(v)=2v$, aucune solution, car $(u-2)(v-u)\ge 0$ imposerait $v\le u$ pour tout $v\in K$.
- $a$ est bilinéaire et continue : $|a(u,v)|\le M\|u\|_V\|v\|_V$.
- $a$ est coercive : $a(u,u)\ge\alpha\|u\|_V^2$, avec $\alpha>0$. — Sans elle : $V=K=\mathbb R$ et $a=0$ : pour $f=0$, tout $u$ est solution ; pour $f\neq 0$, aucun.
- $f\in V'$.

Énoncé : Soit $V$ un espace de Hilbert réel, $K\subset V$ non vide, fermé, convexe, et $a:V\times V\to\mathbb R$ bilinéaire, continue et coercive : $|a(u,v)|\le M\|u\|_V\|v\|_V$ et $a(u,u)\ge\alpha\|u\|_V^2$, avec $M,\alpha>0$. Pour chaque $f\in V'$, il existe un unique $u\in K$ vérifiant
$$a(u,v-u)\ge\langle f,v-u\rangle\quad\forall v\in K.$$

Bilan : {"existence":"La solution est le point fixe dans $K$ de $T_\\rho(u)=P_K\\big(u-\\rho(Bu-g)\\big)$, contractante pour $0<\\rho<2\\alpha/M^2$.","unicite":"Deux solutions vérifient $\\alpha\\|u_1-u_2\\|_V^2\\le a(u_1-u_2,u_1-u_2)\\le 0$ ; c'est aussi l'unicité du point fixe.","autre":"Lorsque $K=V$, on retrouve Lax–Milgram."}

Preuve dans le polycopié : complete

Plan :
1. Par Riesz, associer à $a$ un opérateur $B\in\mathcal L(V)$ et à $f$ un vecteur $g\in V$ : $a(u,v)=\langle Bu,v\rangle$, $\langle f,v\rangle=\langle g,v\rangle$.
2. Pour tout $\rho>0$, la caractérisation de la projection donne : $u\in K$ est solution si et seulement si $u=P_K\big(u-\rho(Bu-g)\big)$.
3. Par non-expansivité : $\|T_\rho u-T_\rho v\|^2\le\|(u-v)-\rho(Bu-Bv)\|^2\le(1-2\rho\alpha+\rho^2M^2)\|u-v\|^2$.
4. Choisir $0<\rho<2\alpha/M^2$ : le facteur est strictement inférieur à $1$.
5. $K$ est complet pour la distance induite par $V$ ; le point fixe de Banach donne un unique $u=T_\rho(u)$, qui est l'unique solution.

Vigilance :
- La forme $a$ n'a pas besoin d'être symétrique : seule la coercivité intervient.
- Si $a$ est symétrique, la solution minimise $J(v)=\tfrac12a(v,v)-\langle f,v\rangle$ sur $K$ ; sans symétrie, ce n'est plus vrai en général.
- Le paramètre doit vérifier $0<\rho<2\alpha/M^2$ : pour $\rho$ trop grand, $T_\rho$ peut ne pas être contractante.

Vérification : {"origin":"polycopie","review":"machine"}

Définition « Forme bilinéaire continue et coercive » : $a:V\times V\to\mathbb R$ bilinéaire est continue s'il existe $M>0$ tel que $|a(u,v)|\le M\|u\|_V\|v\|_V$, et coercive s'il existe $\alpha>0$ tel que $a(u,u)\ge\alpha\|u\|_V^2$, pour tous $u,v\in V$.

Définition « Inéquation variationnelle » : Étant donnés $K\subset V$, $a$ et $f\in V'$ : trouver $u\in K$ tel que $a(u,v-u)\ge\langle f,v-u\rangle$ pour tout $v\in K$.

## Contre-exemple `ce-stampacchia-coercivite` : Positivité sans coercivité
Assertion : Si $a$ est bilinéaire, continue, symétrique et vérifie $a(u,u)\ge 0$, l'inéquation a une solution pour tout $f\in V'$.
Tâche : Pour $a(u,v)=u_1v_1$ sur $\mathbb R^2$, calcule la meilleure constante $\alpha=\inf_{u\neq 0}a(u,u)/\|u\|^2$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\inf_{u\\neq 0}a(u,u)/\\|u\\|^2$","expected":"0"}
Explication : $a\big((0,1),(0,1)\big)=0$, donc l'infimum vaut $0$ : $a$ n'est pas coercive. Pour $K=\mathbb R^2$ et $f(v)=v_2$, l'inéquation impose $u_1w_1\ge w_2$ pour tout $w$, ce qui est faux pour $w=(0,1)$ : pas de solution.

## Contre-exemple `ce-stampacchia-symetrie` : Coercivité sans symétrie
Assertion : Le théorème de Stampacchia exige une forme $a$ symétrique.
Tâche : Donne une matrice $A$ de taille $2$, non symétrique, telle que $a(u,v)=u^{\mathsf T}Av$ soit coercive sur $\mathbb R^2$.
Vérification : {"kind":"matrix-spd","prompt":"Matrice $A$ non symétrique et coercive","size":2,"property":"coercive-nonsymmetric"}
Explication : $a(u,u)=u^{\mathsf T}\tfrac{A+A^{\mathsf T}}2u$ : $a$ est coercive si et seulement si la partie symétrique de $A$ est définie positive. Par exemple $A=\begin{pmatrix}1&1\\-1&1\end{pmatrix}$ donne $a(u,u)=\|u\|^2$.

## Contre-exemple `ce-stampacchia-rho` : Paramètre trop grand
Assertion : $T_\rho(u)=P_K\big(u-\rho(Bu-g)\big)$ est contractante pour tout $\rho>0$.
Tâche : Pour $V=K=\mathbb R$, $a(u,v)=uv$ (donc $B=1$, $\alpha=M=1$) et $\rho=3$, calcule la constante de Lipschitz de $T_\rho$.
Vérification : {"kind":"rational","prompt":"Constante de Lipschitz de $T_3$","expected":"2"}
Explication : $T_3(u)=u-3(u-g)=-2u+3g$, donc $|T_3u-T_3v|=2|u-v|$ : l'application n'est pas contractante, et $\rho=3$ n'appartient pas à $]0,2\alpha/M^2[\,=\,]0,2[$.

## Exercice facile `stampacchia.facile` : Stampacchia sur le quart de plan $\mathbb R^2_+$

Énoncé : Dans $V=\mathbb R^2$ euclidien, on pose $a(u,v)=u\cdot v$ et $K=\mathbb R^2_+=\{(u_1,u_2) : u_1\ge 0,\ u_2\ge 0\}$. Vérifier les hypothèses du théorème de Stampacchia, puis, pour $f(v)=v_1-2v_2$, déterminer l'unique $u\in K$ tel que $a(u,v-u)\ge f(v-u)$ pour tout $v\in K$.
Source : {"doc":"polycopie","pdfPage":38,"label":"Exercice 4, facile (p. PDF 38)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-V` (hypothese) : $V=\mathbb R^2$, muni du produit scalaire euclidien, est un espace de Hilbert réel.
- `d-a` (definition) : $a(u,v)=u\cdot v=u_1v_1+u_2v_2$.
- `d-K` (definition) : $K=\{(u_1,u_2)\in\mathbb R^2 : u_1\ge 0,\ u_2\ge 0\}$.
- `d-f` (definition) : $f(v)=v_1-2v_2$ pour $v=(v_1,v_2)\in\mathbb R^2$.
- `a-ok` (consequence) : $a$ est bilinéaire, continue et coercive : $|a(u,v)|\le\|u\|\,\|v\|$ et $a(u,u)=\|u\|^2$.
- `K-ok` (consequence) : $K$ est non vide, fermé et convexe.
- `f-ok` (egalite) : $f(v)=g\cdot v$ avec $g=(1,-2)$ : $f\in V'$.
- `thm` (application-theoreme) : Il existe un unique $u\in K$ tel que $a(u,v-u)\ge f(v-u)$ pour tout $v\in K$.
- `eqv` (egalite) : L'inéquation équivaut à : $u\in K$ et $(g-u)\cdot(v-u)\le 0$ pour tout $v\in K$, c'est-à-dire $u=P_Kg$.
- `minim` (inegalite) : Pour $v\in K$ : $\|g-v\|^2=(v_1-1)^2+(v_2+2)^2$, à minimiser séparément en $v_1\ge 0$ et en $v_2\ge 0$.
- `ver` (inegalite) : Le vecteur $\bar u=(g_1^+,g_2^+)$ des parties positives des coordonnées de $g$ appartient à $K$, et $a(\bar u,v-\bar u)-f(v-\bar u)=(\bar u-g)\cdot(v-\bar u)\ge 0$ pour tout $v\in K$.
- `val` (egalite, calcul rational-vector) : $u=(1,0)$.
  - valeur attendue : ["1","0"]
- `fin` (conclusion) : Les hypothèses sont vérifiées et la solution de l'inéquation est déterminée.
- `x-coer` (consequence, DISTRACTEUR) : La positivité $a(u,u)\ge 0$ pour tout $u$ suffit à établir la coercivité.
- `x-g` (egalite, DISTRACTEUR) : La solution est $u=g=(1,-2)$.

Règles :
- `d-a` + `h-V` ⟹ `a-ok` par « Bilinéarité du produit scalaire, et inégalité de Cauchy–Schwarz ; constantes $M=\alpha=1$. [cauchy-schwarz] »
- `d-K` ⟹ `K-ok` par « $(0,0)\in K$ ; $K=[0,+\infty[^2$ est un produit d'intervalles fermés et convexes. »
- `d-f` ⟹ `f-ok` par « Lecture des coefficients ; une forme linéaire sur un espace de dimension finie est continue. »
- `h-V` + `a-ok` + `K-ok` + `f-ok` ⟹ `thm` par « Théorème de Stampacchia. [stampacchia] »
- `f-ok` + `d-a` + `K-ok` + `h-V` ⟹ `eqv` par « $a(u,v-u)-f(v-u)=(u-g)\cdot(v-u)$, puis caractérisation variationnelle de la projection. [projection] » (chemin projection)
- `f-ok` + `d-K` ⟹ `minim` par « Développement du carré ; la contrainte porte séparément sur chaque coordonnée. » (chemin projection)
- `eqv` + `minim` ⟹ `val` par « Minimiser $(v_1-1)^2$ sur $[0,+\infty[$, puis $(v_2+2)^2$ sur $[0,+\infty[$ : le minimiseur est $P_Kg$. » (chemin projection)
- `f-ok` + `d-K` + `d-a` ⟹ `ver` par « Disjonction par coordonnée : si $g_i\ge 0$ le terme est nul ; si $g_i<0$, il vaut $-g_iv_i\ge 0$. » (chemin verification)
- `thm` + `ver` ⟹ `val` par « Unicité de la solution, fournie par le théorème. » (chemin verification)
- `thm` + `val` ⟹ `fin` par « Réunion des hypothèses vérifiées et du calcul de la solution. »

Justifications sans règle (séduisantes ou fausses) : « Théorème de Lax–Milgram. » ; « C’est évident. »

Pièges :
- `x-coer` → incorrect [hypotheses-theoreme] : La coercivité exige une minoration $a(u,u)\ge\alpha\|u\|^2$ avec $\alpha>0$ : la positivité ne suffit pas. — Contre-exemple : Sur $\mathbb R^2$, $a(u,v)=u_1v_1$ vérifie $a(u,u)\ge 0$, mais $a\big((0,1),(0,1)\big)=0$ : elle n'est pas coercive.
- `x-g` → incorrect [hypotheses-theoreme] : $g=(1,-2)$ n'appartient pas à $K$ : la solution doit respecter la contrainte. Sans contrainte ($K=V$), ce serait bien $g$. — Contre-exemple : La seconde coordonnée de $g$ est strictement négative.
- `thm` par « Théorème de Lax–Milgram. » → incorrect [hypotheses-theoreme] : Lax–Milgram correspond au cas $K=V$, où l'inéquation devient une équation. Ici $K$ est un cône strict de $V$.
- `a-ok` par « C’est évident. » → a-justifier [justification-absente] : Continuité et coercivité se vérifient avec des constantes explicites $M$ et $\alpha$.

Retraits :
- `K-ok` (nécessaire) : Sans fermeture, ni le théorème ni la projection ne s'appliquent, et la solution peut disparaître. — Contre-exemple : Sur $K'=\,]0,+\infty[^2$, ouvert, une solution $u$ serait intérieure : en testant $v=u-\varepsilon(u-g)$, on obtiendrait $-\varepsilon\|u-g\|^2\ge 0$, donc $u=g\notin K'$. Il n'y a pas de solution.

Calculs fermés : [{"kind":"rational-vector","prompt":"Constantes de continuité et de coercivité $(M,\\alpha)$ de $a$","expected":["1","1"],"labels":["M","α"]}]

Solution :
**Hypothèses.** $\mathbb R^2$ euclidien est un espace de Hilbert. La forme $a$ est le produit scalaire : bilinéaire, continue ($M=1$ par Cauchy–Schwarz) et coercive ($a(u,u)=\|u\|^2$, $\alpha=1$). $K=[0,+\infty[^2$ est non vide, fermé et convexe. Enfin $f(v)=g\cdot v$ avec $g=(1,-2)$, donc $f\in V'$. Le théorème de Stampacchia donne une unique solution.

**Calcul.** Comme $a(u,v-u)-f(v-u)=(u-g)\cdot(v-u)$, l'inéquation équivaut à $(g-u)\cdot(v-u)\le 0$ pour tout $v\in K$, c'est-à-dire $u=P_Kg$. Pour $v\in K$, $\|g-v\|^2=(v_1-1)^2+(v_2+2)^2$ est minimal pour $v_1=1$ et $v_2=0$. Donc $u=(1,0)$.

**Vérification directe.** Pour $v\in K$ : $a(u,v-u)-f(v-u)=(u-g)\cdot(v-u)=(0,2)\cdot(v_1-1,v_2)=2v_2\ge 0$.

Indices :
1. Dresse la liste des hypothèses du théorème et vérifie-les une à une, constantes comprises.
2. Écris $f(v)=g\cdot v$ : comme $a$ est ici le produit scalaire, l'inéquation est une caractérisation de projection.
3. La projection sur $[0,+\infty[^2$ se calcule coordonnée par coordonnée : chaque coordonnée négative est remplacée par $0$.

Erreurs fréquentes :
- Confondre $a(u,u)\ge 0$ avec la coercivité.
- Oublier la contrainte et répondre $u=g$.

Variante : Dans $V=\mathbb R^2$ euclidien, avec $K=\mathbb R^2_+$, on considère la forme non symétrique $a(u,v)=u\cdot v+u_1v_2-u_2v_1$ et $f(v)=v_1+v_2$. Vérifier les hypothèses du théorème de Stampacchia et déterminer la solution de l'inéquation.

Solution de la variante : On a $a(u,v)=(Bu)\cdot v$ avec $Bu=(u_1-u_2,\,u_1+u_2)$, donc $|a(u,v)|\le\|Bu\|\,\|v\|=\sqrt2\,\|u\|\,\|v\|$, et $a(u,u)=\|u\|^2$ : $a$ est continue et coercive, sans être symétrique. Avec $g=(1,1)$, le système $Bu=g$ donne $\bar u=(1,0)\in K$, et $a(\bar u,w)=g\cdot w=f(w)$ pour tout $w$ : $\bar u$ vérifie l'inéquation avec égalité. Par unicité, $u=(1,0)$. Ce n'est pas le minimiseur sur $K$ de $J(v)=\tfrac12a(v,v)-f(v)=\tfrac12\|v\|^2-v_1-v_2$, atteint en $(1,1)$ : sans symétrie, l'inéquation n'est pas un problème de minimisation.

Graphe de la variante :
But : `fin` — usage : application

Nœuds :
- `h-V` (hypothese) : $V=\mathbb R^2$, euclidien, est un espace de Hilbert réel.
- `d-a` (definition) : $a(u,v)=u\cdot v+u_1v_2-u_2v_1$.
- `d-K` (definition) : $K=\{(u_1,u_2) : u_1\ge 0,\ u_2\ge 0\}$.
- `d-f` (definition) : $f(v)=v_1+v_2=g\cdot v$, avec $g=(1,1)$.
- `B` (egalite) : $a(u,v)=(Bu)\cdot v$, avec $Bu=(u_1-u_2,\,u_1+u_2)$.
- `a-ok` (consequence) : $a$ est bilinéaire, continue ($|a(u,v)|\le\sqrt2\,\|u\|\,\|v\|$) et coercive ($a(u,u)=\|u\|^2$).
- `K-ok` (consequence) : $K$ est non vide, fermé et convexe.
- `thm` (application-theoreme) : Il existe un unique $u\in K$ tel que $a(u,v-u)\ge f(v-u)$ pour tout $v\in K$.
- `syst` (egalite) : Le système $Bu=g$, soit $u_1-u_2=1$ et $u_1+u_2=1$, a une unique solution $\bar u$, et $\bar u\in K$.
- `ver` (egalite) : Pour tout $v\in K$ : $a(\bar u,v-\bar u)=(B\bar u)\cdot(v-\bar u)=f(v-\bar u)$ ; $\bar u$ est solution, avec égalité.
- `val` (egalite, calcul rational-vector) : $u=(1,0)$.
  - valeur attendue : ["1","0"]
- `fin` (conclusion) : Les hypothèses sont vérifiées et la solution de l'inéquation est déterminée.
- `x-min` (consequence, DISTRACTEUR) : La solution est le minimiseur sur $K$ de $J(v)=\tfrac12a(v,v)-f(v)$.
- `x-sym` (consequence, DISTRACTEUR) : $a$ est symétrique.

Règles :
- `d-a` ⟹ `B` par « Regrouper les termes de $a(u,v)$ selon $v_1$ et $v_2$. »
- `B` + `d-a` + `h-V` ⟹ `a-ok` par « Cauchy–Schwarz avec $\|Bu\|^2=2\|u\|^2$ ; les termes $u_1u_2-u_2u_1$ s'annulent dans $a(u,u)$. [cauchy-schwarz] »
- `d-K` ⟹ `K-ok` par « $(0,0)\in K$, et $K=[0,+\infty[^2$ est un produit d'intervalles fermés et convexes. »
- `h-V` + `a-ok` + `K-ok` + `d-f` ⟹ `thm` par « Théorème de Stampacchia. [stampacchia] »
- `B` + `d-f` + `d-K` ⟹ `syst` par « Résolution d’un système linéaire de Cramer, puis lecture des signes. »
- `syst` + `B` ⟹ `ver` par « $B\bar u=g$ donne $a(\bar u,w)=g\cdot w=f(w)$ pour tout $w\in V$. »
- `thm` + `ver` ⟹ `val` par « Unicité de la solution, fournie par le théorème. »
- `thm` + `val` ⟹ `fin` par « Réunion des hypothèses vérifiées et du calcul de la solution. »

Pièges :
- `x-min` → incorrect [stampacchia-minimisation] : L'inéquation n'est la condition d'optimalité de $J$ que si $a$ est symétrique. — Contre-exemple : Ici $J(v)=\tfrac12\|v\|^2-v_1-v_2$ est minimale sur $K$ en $(1,1)$, alors que la solution de l'inéquation est $(1,0)$.
- `x-sym` → incorrect [coercivite-symetrie] : La forme n'est pas symétrique ; la coercivité n'en a pas besoin. — Contre-exemple : $a\big((1,0),(0,1)\big)=1$ et $a\big((0,1),(1,0)\big)=-1$.

Retraits :
- `a-ok` (nécessaire) : Sans coercivité, le théorème ne s’applique plus : l’existence peut échouer. — Contre-exemple : Pour $a(u,v)=u_1v_1$, $K=\mathbb R^2$ et $f(v)=v_2$ : l'inéquation impose $u_1w_1\ge w_2$ pour tout $w\in\mathbb R^2$, ce qui est faux pour $w=(0,1)$.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `stampacchia.intermediaire` : Stampacchia par un point fixe contractant

Énoncé : Soit $V$ un espace de Hilbert réel, $K\subset V$ non vide, fermé et convexe, $a$ bilinéaire avec $|a(u,v)|\le M\|u\|\,\|v\|$ et $a(u,u)\ge\alpha\|u\|^2$ ($M,\alpha>0$), et $f\in V'$. En introduisant par Riesz $B\in\mathcal L(V)$ et $g\in V$, démontrer le théorème de Stampacchia à partir du point fixe $u=P_K\big(u-\rho(Bu-g)\big)$, et déterminer une condition sur $\rho>0$, ne dépendant que de $M$ et $\alpha$, qui assure que l'application $T_\rho(u)=P_K\big(u-\rho(Bu-g)\big)$ est contractante.
Source : {"doc":"polycopie","pdfPage":38,"label":"Exercice 4, intermédiaire (p. PDF 38) ; démonstration de la section 1.5 (p. PDF 8)"} — prérequis : —

But : `fin` — usage : demonstration

Nœuds :
- `h-V` (hypothese) : $V$ est un espace de Hilbert réel.
- `h-K` (hypothese) : $K\subset V$ est non vide, fermé et convexe.
- `h-a` (hypothese) : $a$ est bilinéaire, $|a(u,v)|\le M\|u\|\,\|v\|$ et $a(u,u)\ge\alpha\|u\|^2$, avec $M,\alpha>0$.
- `h-f` (hypothese) : $f\in V'$.
- `d-rho` (definition, locale) : Soit $\rho>0$.
- `Bg` (application-theoreme) : Il existe $B\in\mathcal L(V)$ et $g\in V$ tels que $a(u,v)=\langle Bu,v\rangle$ et $\langle f,v\rangle=\langle g,v\rangle$ pour tous $u,v\in V$ ; de plus $\|Bw\|\le M\|w\|$ et $\langle Bw,w\rangle\ge\alpha\|w\|^2$.
- `eqv` (egalite) : Pour $u\in K$ : $u$ est solution de l'inéquation si et seulement si $\langle(u-\rho(Bu-g))-u,v-u\rangle\le 0$ pour tout $v\in K$, c'est-à-dire $u=T_\rho(u)$.
- `nonexp` (inegalite) : $T_\rho$ envoie $K$ dans $K$, et $\|T_\rho u-T_\rho v\|\le\|(u-v)-\rho B(u-v)\|$ pour tous $u,v\in K$.
- `contr` (inegalite, calcul expr-equiv) : $\|T_\rho u-T_\rho v\|^2\le(1-2\rho\alpha+\rho^2M^2)\,\|u-v\|^2$ pour tous $u,v\in K$.
  - valeur attendue : "1-2*rho*alpha+rho^2*M^2"
- `cond` (inegalite, calcul expr-equiv) : Ce facteur est strictement inférieur à $1$ si et seulement si $0<\rho<2\alpha/M^2$.
  - valeur attendue : "2*alpha/M^2"
- `complet` (consequence) : $K$, fermé dans l'espace complet $V$, est complet pour la distance induite.
- `PF` (application-theoreme) : Pour un tel $\rho$, $T_\rho$ admet un unique point fixe dans $K$.
- `fin` (conclusion) : Il existe un unique $u\in K$ tel que $a(u,v-u)\ge\langle f,v-u\rangle$ pour tout $v\in K$, et $T_\rho$ est contractante pour les $\rho$ admissibles.
- `x-rho` (consequence, DISTRACTEUR) : $T_\rho$ est contractante pour tout $\rho>0$.
- `x-2aM` (consequence, DISTRACTEUR) : $T_\rho$ est contractante dès que $0<\rho<2\alpha/M$.

Règles :
- `h-V` + `h-a` + `h-f` ⟹ `Bg` par « Théorème de Riesz, appliqué à $v\mapsto a(u,v)$ pour chaque $u$, et à $f$ ; puis continuité et coercivité de $a$. [riesz] »
- `Bg` + `d-rho` + `h-K` + `h-V` ⟹ `eqv` par « Multiplier par $-\rho<0$, puis caractérisation variationnelle de la projection. [projection] »
- `Bg` + `h-K` + `h-V` ⟹ `nonexp` par « Non-expansivité de la projection sur un convexe fermé non vide. [projection] »
- `nonexp` + `Bg` ⟹ `contr` par « Développer $\|w-\rho Bw\|^2=\|w\|^2-2\rho\langle Bw,w\rangle+\rho^2\|Bw\|^2$, puis coercivité et continuité. »
- `contr` + `d-rho` ⟹ `cond` par « $q(\rho)-1=\rho(\rho M^2-2\alpha)$, et $\rho>0$. »
- `h-K` + `h-V` ⟹ `complet` par « Une partie fermée d’un espace métrique complet est complète. »
- `contr` + `cond` + `complet` + `h-K` ⟹ `PF` par « Théorème du point fixe de Banach. [point-fixe-banach] »
- `PF` + `eqv` ⟹ `fin` par « Le point fixe est solution par l’équivalence ; toute solution est un point fixe, d’où l’unicité. »

Justifications sans règle (séduisantes ou fausses) : « Théorème de Lax–Milgram. » ; « Inégalité triangulaire : $\|w-\rho Bw\|\le\|w\|+\rho\|Bw\|$. » ; « Minimiser $J(v)=\tfrac12a(v,v)-\langle f,v\rangle$ sur $K$. »

Pièges :
- `x-rho` → incorrect [stampacchia-parametre] : La non-expansivité de $P_K$ ne suffit pas : le facteur $1-2\rho\alpha+\rho^2M^2$ est au moins égal à $1$ dès que $\rho\ge 2\alpha/M^2$. — Contre-exemple : $V=K=\mathbb R$, $a(u,v)=uv$, $g=0$ : $T_\rho u=(1-\rho)u$, de constante $|1-\rho|=2$ pour $\rho=3$.
- `x-2aM` → incorrect [stampacchia-parametre] : La condition fait intervenir $M^2$ : le facteur vaut $1+\rho(\rho M^2-2\alpha)$. — Contre-exemple : $V=K=\mathbb R^2$, $Bu=(u_1-u_2,\,u_1+u_2)$, $g=0$ : $\alpha=1$, $M=\sqrt2$. Pour $\rho=6/5<\sqrt2=2\alpha/M$, l'application $u\mapsto u-\rho Bu$ a pour constante de Lipschitz $\sqrt{37}/5>1$.
- `PF` par « Théorème de Lax–Milgram. » → incorrect [utilisation-prematuree] : Lax–Milgram est le cas particulier $K=V$ de Stampacchia : il ne peut pas servir à démontrer Stampacchia, et ne construit pas de point fixe sur $K$.
- `contr` par « Inégalité triangulaire : $\|w-\rho Bw\|\le\|w\|+\rho\|Bw\|$. » → incorrect [stampacchia-parametre] : L'inégalité triangulaire donne le facteur $1+\rho M>1$ : elle perd le terme $-2\rho\langle Bw,w\rangle$, seul endroit où la coercivité intervient. Il faut développer le carré.
- `fin` par « Minimiser $J(v)=\tfrac12a(v,v)-\langle f,v\rangle$ sur $K$. » → incorrect [stampacchia-minimisation] : La minimisation de $J$ ne caractérise la solution que si $a$ est symétrique, ce que l'énoncé ne suppose pas. — Contre-exemple : Pour $a(u,v)=u\cdot v+u_1v_2-u_2v_1$ sur $\mathbb R^2$, $K=\mathbb R^2_+$ et $f(v)=v_1+v_2$, la solution est $(1,0)$, alors que $J$ est minimale sur $K$ en $(1,1)$.

Retraits :
- `h-a` (nécessaire) : Sans la minoration $\langle Bw,w\rangle\ge\alpha\|w\|^2$, aucun $\rho>0$ ne rend le facteur strictement inférieur à $1$. — Contre-exemple : $V=K=\mathbb R$, $a=0$ : pour $f=0$, tout $u$ est solution ; pour $f\neq 0$, aucun.
- `h-K` (nécessaire) : Ni $P_K$ ni la complétude de $K$ ne sont alors disponibles. — Contre-exemple : $V=\mathbb R$, $a(u,v)=uv$, $f=0$, $K=\{-1,1\}$ : pour $u=\pm1$ et $v=-u$, $a(u,v-u)=-2<0$. Aucune solution.

Calculs fermés : [{"kind":"rational","prompt":"Pour $M=2$ et $\\alpha=1$ : borne supérieure des $\\rho$ admissibles","expected":"1/2"},{"kind":"rational","prompt":"Pour $M=2$ et $\\alpha=1$ : valeur de $\\rho$ qui minimise $1-2\\rho\\alpha+\\rho^2M^2$","expected":"1/4"}]

Solution :
**Riesz.** Pour $u$ fixé, $v\mapsto a(u,v)$ est linéaire continue : Riesz donne $Bu\in V$ avec $a(u,v)=\langle Bu,v\rangle$. Par unicité, $B$ est linéaire ; avec $v=Bu$, $\|Bu\|^2\le M\|u\|\,\|Bu\|$, donc $\|Bu\|\le M\|u\|$. De même, $\langle f,v\rangle=\langle g,v\rangle$, et $\langle Bw,w\rangle=a(w,w)\ge\alpha\|w\|^2$.

**Équivalence.** Pour $u\in K$ et $\rho>0$ : $a(u,v-u)\ge\langle f,v-u\rangle$ s'écrit $\langle Bu-g,v-u\rangle\ge 0$, soit $\langle(u-\rho(Bu-g))-u,v-u\rangle\le 0$ pour tout $v\in K$ : par la caractérisation de la projection, c'est $u=P_K(u-\rho(Bu-g))=T_\rho(u)$.

**Contraction.** Par non-expansivité, avec $w=u-v$ : $\|T_\rho u-T_\rho v\|^2\le\|w-\rho Bw\|^2=\|w\|^2-2\rho\langle Bw,w\rangle+\rho^2\|Bw\|^2\le(1-2\rho\alpha+\rho^2M^2)\|w\|^2$. Le facteur vaut $1+\rho(\rho M^2-2\alpha)$ : il est strictement inférieur à $1$ si et seulement si $0<\rho<2\alpha/M^2$ ; il est minimal pour $\rho=\alpha/M^2$, où il vaut $1-\alpha^2/M^2$.

**Point fixe.** $K$ est fermé dans $V$ complet, donc complet. Pour $0<\rho<2\alpha/M^2$, le théorème de Banach donne un unique point fixe de $T_\rho$ dans $K$ : c'est une solution, et toute solution est un point fixe, d'où l'unicité. Lorsque $K=V$, on retrouve Lax–Milgram.

Indices :
1. Quels objets de $V$ remplacent la forme $a$ et la forme $f$ ? Quel résultat traduit une inéquation sur $K$ en égalité avec $P_K$ ?
2. Montre que $u$ est solution si et seulement si $u=T_\rho(u)$, puis compare $\|T_\rho u-T_\rho v\|$ à $\|w-\rho Bw\|$ avec $w=u-v$.
3. Développe le carré : $\|w-\rho Bw\|^2\le(1-2\rho\alpha+\rho^2M^2)\|w\|^2$. Le facteur est un trinôme en $\rho$, égal à $1$ en $\rho=0$.

Erreurs fréquentes :
- Oublier la condition $\rho<2\alpha/M^2$.
- Invoquer Lax–Milgram, cas particulier du résultat à démontrer.
- Oublier que $K$ doit être complet pour appliquer le point fixe de Banach.

Variante : Sous les hypothèses du théorème, soient $u_1$ et $u_2$ les solutions associées à $f_1,f_2\in V'$. Montrer que $\|u_1-u_2\|_V\le\alpha^{-1}\|f_1-f_2\|_{V'}$.

Solution de la variante : On teste l'inéquation de $u_1$ par $v=u_2$ et celle de $u_2$ par $v=u_1$ : $a(u_1,u_2-u_1)\ge\langle f_1,u_2-u_1\rangle$ et $a(u_2,u_1-u_2)\ge\langle f_2,u_1-u_2\rangle$. En additionnant, avec $w=u_1-u_2$ : $-a(w,w)\ge-\langle f_1-f_2,w\rangle$. Donc $\alpha\|w\|^2\le a(w,w)\le\|f_1-f_2\|_{V'}\|w\|$, d'où le résultat (trivial si $w=0$). La solution dépend donc de $f$ de façon lipschitzienne.

Vérification : {"origin":"polycopie","review":"machine"}

## Exercice difficile `stampacchia.difficile` : Inéquation non symétrique sur $H^1_0(]0,1[)$ avec contrainte $v\ge 0$

Énoncé : Soit $V=H^1_0(]0,1[)$, muni de $(u,v)_V=\int_0^1u'v'$, $K=\{v\in V : v\ge 0\ \text{p.p.}\}$, $b\in\mathbb R$, $a(u,v)=\int_0^1u'v'+b\int_0^1u'v$ et $f\in V'$. Montrer qu'il existe un unique $u\in K$ tel que $a(u,v-u)\ge\langle f,v-u\rangle$ pour tout $v\in K$, l'unicité étant démontrée en testant les solutions l'une par l'autre.
Source : {"doc":"polycopie","pdfPage":38,"label":"Exercice 4, difficile (p. PDF 38)"} — prérequis : projection, poincare, distributions

But : `fin` — usage : application

Nœuds :
- `h-V` (hypothese) : $V=H^1_0(]0,1[)$, muni de $(u,v)_V=\int_0^1u'v'$, est un espace de Hilbert réel.
- `h-K` (hypothese) : $K=\{v\in V : v\ge 0\ \text{p.p.}\}$ est non vide, convexe et fermé dans $V$ (exercice difficile du résultat 1).
- `d-a` (definition) : $a(u,v)=\int_0^1u'v'+b\int_0^1u'v$, avec $b\in\mathbb R$ fixé.
- `h-f` (hypothese) : $f\in V'$.
- `h-poinc` (hypothese) : Il existe $C_P>0$ tel que $\|v\|_{L^2}\le C_P\|v'\|_{L^2}$ pour tout $v\in V$ (inégalité de Poincaré).
- `cont` (inegalite) : $a$ est bilinéaire et $|a(u,v)|\le(1+|b|C_P)\,\|u\|_V\|v\|_V$ pour tous $u,v\in V$.
- `anti` (egalite) : $\int_0^1w'w=0$ pour tout $w\in V$.
- `coer` (egalite) : $a(w,w)=\|w\|_V^2$ pour tout $w\in V$ : $a$ est coercive.
- `thm` (application-theoreme) : Il existe $u\in K$ tel que $a(u,v-u)\ge\langle f,v-u\rangle$ pour tout $v\in K$.
- `u-sol` (definition, locale) : Soient $u_1,u_2\in K$ deux solutions de l'inéquation.
- `u-test` (inegalite) : $a(u_1,u_2-u_1)+a(u_2,u_1-u_2)\ge\langle f,u_2-u_1\rangle+\langle f,u_1-u_2\rangle=0$.
- `u-neg` (inegalite) : $a(u_1-u_2,u_1-u_2)\le 0$.
- `unique` (consequence) : $u_1=u_2$.
- `fin` (conclusion) : Il existe un unique $u\in K$ tel que $a(u,v-u)\ge\langle f,v-u\rangle$ pour tout $v\in K$.
- `x-sym` (consequence, DISTRACTEUR) : $a$ est symétrique, et c'est ce qui la rend coercive.

Règles :
- `d-a` + `h-poinc` ⟹ `cont` par « Cauchy–Schwarz sur chaque terme, puis Poincaré pour $\|v\|_{L^2}$. [poincare] »
- `h-V` ⟹ `anti` par « $w$ est continue, nulle en $0$ et en $1$, et $(w^2)'=2ww'$ : $\int_0^1w'w=\tfrac12\big(w(1)^2-w(0)^2\big)$. »
- `d-a` + `anti` ⟹ `coer` par « Le terme $b\int_0^1w'w$ est nul. »
- `h-V` + `h-K` + `cont` + `coer` + `h-f` ⟹ `thm` par « Théorème de Stampacchia. [stampacchia] »
- `u-sol` + `h-f` ⟹ `u-test` par « Tester l'inéquation de $u_1$ par $v=u_2$, celle de $u_2$ par $v=u_1$, puis additionner : les termes en $f$ se compensent. »
- `u-test` + `cont` ⟹ `u-neg` par « Bilinéarité : $a(u_1,u_2-u_1)+a(u_2,u_1-u_2)=-a(u_1-u_2,u_1-u_2)$. »
- `u-neg` + `coer` ⟹ `unique` par « Coercivité : $\|u_1-u_2\|_V^2=a(u_1-u_2,u_1-u_2)\le 0$. »
- `thm` + `unique` ⟹ `fin` par « Réunion de l’existence et de l’unicité. »

Justifications sans règle (séduisantes ou fausses) : « L’unicité est donnée par le théorème de Stampacchia. » ; « Théorème de Lax–Milgram. » ; « La symétrie de $a$ donne $a(w,w)\ge\|w\|_V^2$. »

Pièges :
- `x-sym` → incorrect [coercivite-symetrie] : $a$ n'est pas symétrique dès que $b\neq 0$, et sa coercivité ne vient pas d'une symétrie : le terme $b\int_0^1w'w$ est nul sur $V$. — Contre-exemple : Pour $u(x)=x(1-x)$ et $v(x)=x^2(1-x)$ : $a(u,v)-a(v,u)=b\int_0^1(u'v-v'u)=-b/30$.
- `unique` par « L’unicité est donnée par le théorème de Stampacchia. » → a-justifier [existence-unicite] : Stampacchia donne bien l'unicité, mais l'exercice demande de la retrouver : teste chaque solution par l'autre.
- `thm` par « Théorème de Lax–Milgram. » → incorrect [hypotheses-theoreme] : Lax–Milgram correspond à $K=V$ ; ici $K$ est un cône strict et l'on obtient une inéquation.
- `coer` par « La symétrie de $a$ donne $a(w,w)\ge\|w\|_V^2$. » → incorrect [coercivite-symetrie] : $a$ n'est pas symétrique : la coercivité provient de l'annulation de $\int_0^1w'w$ sur $V$.

Retraits :
- `coer` (nécessaire) : Sans coercivité, ni le théorème ni l’argument d’unicité ne fonctionnent. — Contre-exemple : Pour $a_c(u,v)=\int_0^1u'v'-\pi^2\int_0^1uv$ et $\varphi(x)=\sin(\pi x)$ : $a_c(\varphi,w)=0$ pour tout $w\in V$, donc pour $f=0$ tous les $t\varphi$, $t\ge 0$, sont solutions.
- `h-K` (nécessaire) : Le théorème exige un convexe fermé non vide de $V$. — Contre-exemple : $K'=\{v\in C^\infty_c(]0,1[) : v\ge 0\}$ n'est pas fermé dans $V$. Pour $b=0$ et $\langle f,v\rangle=\int_0^1v$, si $u\in K'$ était solution, le test $v=u+\psi$, avec $\psi\in K'$ égale à $1$ près du support de $u$, donnerait $0=\int_0^1u'\psi'\ge\int_0^1\psi>0$.

Calculs fermés : [{"kind":"rational","prompt":"Constante de coercivité $\\alpha$ de $a$ pour la norme de $V$","expected":"1"}]

Solution :
**Hypothèses.** $V$ est un espace de Hilbert et $K$ un convexe fermé non vide de $V$ (exercice difficile du résultat 1). La forme $a$ est bilinéaire, et par Cauchy–Schwarz puis Poincaré, $|a(u,v)|\le\|u'\|\,\|v'\|+|b|\,\|u'\|\,\|v\|_{L^2}\le(1+|b|C_P)\|u\|_V\|v\|_V$. Pour $w\in V$, $w$ est continue, nulle au bord, et $(w^2)'=2ww'$, donc $\int_0^1w'w=0$ : $a(w,w)=\|w\|_V^2$. La forme est coercive avec $\alpha=1$, sans être symétrique si $b\neq 0$.

**Existence.** Stampacchia fournit $u\in K$ solution.

**Unicité par test.** Si $u_1,u_2$ sont solutions, on teste l'inéquation de $u_1$ par $v=u_2$ et celle de $u_2$ par $v=u_1$ ; en additionnant, $a(u_1,u_2-u_1)+a(u_2,u_1-u_2)\ge 0$. Par bilinéarité, le membre de gauche vaut $-a(u_1-u_2,u_1-u_2)=-\|u_1-u_2\|_V^2$. Donc $u_1=u_2$.

**Point de vigilance.** Si $b\neq 0$, la solution n'est en général pas la projection sur $K$, pour $(\cdot,\cdot)_V$, du représentant de Riesz de $f$ : c'est Stampacchia, et non la seule projection, qui donne l'existence.

Indices :
1. Le terme $b\int_0^1u'v$ menace-t-il la coercivité ? Calcule-le pour $u=v=w\in V$.
2. Pour l'unicité, écris les deux inéquations, chacune testée par l'autre solution, et additionne.
3. $\int_0^1w'w=\tfrac12[w^2]_0^1=0$ ; la somme des deux inéquations donne $-a(u_1-u_2,u_1-u_2)\ge 0$.

Erreurs fréquentes :
- Attribuer la coercivité à une symétrie de la forme.
- Confondre l’existence d’une solution et son unicité.

Variante : Avec $b=0$, c'est-à-dire $a(u,v)=\int_0^1u'v'$, et le même $K$, déterminer la solution pour $\langle f,v\rangle=\int_0^1v$, puis pour $\langle f,v\rangle=-\int_0^1v$.

Solution de la variante : Pour $\langle f,v\rangle=\int_0^1v$ : $u(x)=\tfrac12x(1-x)$ appartient à $K$, et une intégration par parties donne $\int_0^1u'w'=\int_0^1w$ pour tout $w\in V$ ; l'inéquation est vérifiée avec égalité. Pour $\langle f,v\rangle=-\int_0^1v$ : $u=0$ convient, car $a(0,v)=0\ge-\int_0^1v$ pour tout $v\in K$. Dans les deux cas, l'unicité donne la solution.

Vérification : {"origin":"complement","review":"machine"}