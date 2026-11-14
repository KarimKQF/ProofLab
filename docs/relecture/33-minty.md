# 33. Argument de Minty (`minty`) — polycopié p. PDF 30, section 7.4

## Fiche

Espaces : $V$ : Banach réel réflexif, $V'$ son dual ; $\rightharpoonup$ désigne la convergence faible. | $A:V\to V'$ : opérateur non linéaire défini sur tout $V$.

Hypothèses :
- $A$ est monotone. — Sans elle : $B(u)=-u^3$ sur $L^4(]0,1[)$, $u_n=1+\sin(2\pi nx)$ : $\limsup\langle Bu_n,u_n-1\rangle=-\frac{15}8\le 0$, et pourtant $Bu_n\rightharpoonup-\frac52\neq B(1)$.
- $A$ est hémicontinu. — Sans elle : Sur $\mathbb R$, $A(u)=-1$ pour $u<0$ et $A(u)=1$ pour $u\ge 0$ est monotone ; $u_n=-1/n\to 0$, $Au_n=-1$, $\langle Au_n,u_n-0\rangle=1/n\to 0$, mais $\chi=-1\neq A(0)=1$.
- $u_n\rightharpoonup u$ dans $V$ et $Au_n\rightharpoonup\chi$ dans $V'$.
- $\limsup_n\langle Au_n,u_n-u\rangle\le 0$. — Sans elle : $A(u)=u^3$ sur $L^4(]0,1[)$, $u_n=1+\sin(2\pi nx)$ : $\chi=\frac52\neq A(1)=1$, et le $\limsup$ vaut $\frac{15}8$.

Énoncé : Soit $V$ réflexif réel et $A:V\to V'$ monotone, hémicontinu. Si
$$u_n\rightharpoonup u\ \text{dans } V,\qquad Au_n\rightharpoonup\chi\ \text{dans } V',\qquad \limsup_{n\to\infty}\langle Au_n,u_n-u\rangle\le 0,$$
alors $\chi=Au$.

Bilan : {"autre":"Identification de la limite faible du terme non linéaire : $\\chi=Au$."}

Preuve dans le polycopié : complete

Plan :
1. Monotonie : $0\le\langle Au_n-Av,u_n-v\rangle=\langle Au_n,u_n-u\rangle+\langle Au_n,u-v\rangle-\langle Av,u_n-v\rangle$.
2. Passage au $\limsup$ : $0\le\langle\chi-Av,u-v\rangle$ pour tout $v\in V$.
3. $v=u-tw$, $t>0$ : $\langle\chi-A(u-tw),w\rangle\ge 0$ ; hémicontinuité quand $t\downarrow 0$ : $\langle\chi-Au,w\rangle\ge 0$.
4. Remplacer $w$ par $-w$ : $\langle\chi-Au,w\rangle=0$ pour tout $w$, donc $\chi=Au$.

Vigilance :
- L'hypothèse $\limsup\langle Au_n,u_n-u\rangle\le 0$ n'est pas automatique : dans une EDP, elle se démontre à partir des estimations et des identités disponibles, avant d'appliquer le lemme.
- « $Au_n\rightharpoonup\chi$ » ne dit rien de $Au$ : l'identification $\chi=Au$ est le contenu du lemme.
- L'hémicontinuité ne porte que sur les droites : $t\mapsto\langle A(u+tv),w\rangle$ est continue. Elle ne dit rien du comportement de $A$ le long d'une suite faiblement convergente.

Vérification : {"origin":"polycopie","review":"machine"}

Définition « Hypothèse du limsup de Minty » : Pour $u_n\rightharpoonup u$ dans $V$ : $\limsup_n\langle Au_n,u_n-u\rangle\le 0$.

## Contre-exemple `ce-minty-limsup` : Sans l'hypothèse du $\limsup$
Assertion : Si $A$ est monotone hémicontinu, $u_n\rightharpoonup u$ et $Au_n\rightharpoonup\chi$, alors $\chi=Au$.
Tâche : Pour $A(u)=u^3$ sur $L^4(]0,1[)$ et $u_n=1+\sin(2\pi nx)$, calcule la limite faible constante $\chi$ de $Au_n$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\chi$","expected":"5/2"}
Explication : $u_n^3=1+3s_n+3s_n^2+s_n^3$ avec $s_n\rightharpoonup 0$, $s_n^2\rightharpoonup\frac12$, $s_n^3\rightharpoonup 0$ : $\chi=\frac52$, alors que $u_n\rightharpoonup 1$ et $A(1)=1$. Le $\limsup$ vaut $\frac{15}8>0$.

## Contre-exemple `ce-minty-hemi` : Sans hémicontinuité
Assertion : Le lemme de Minty vaut pour tout opérateur monotone.
Tâche : Sur $\mathbb R$, $A(u)=-1$ pour $u<0$, $A(u)=1$ pour $u\ge 0$, $u_n=-1/n$. Donne la limite $\chi$ de $Au_n$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\chi$","expected":"-1"}
Explication : $Au_n=-1$ pour tout $n$, donc $\chi=-1$ ; $u_n\to 0$, $\langle Au_n,u_n\rangle=1/n\to 0$, $A$ est monotone, et pourtant $A(0)=1\neq\chi$.

## Exercice facile `minty.facile` : $Au_n\rightharpoonup\chi$ n'est pas $\chi=Au$

Énoncé : Soit $V=L^4(]0,1[)$, $V'=L^{4/3}(]0,1[)$, $A(u)=u^3$ et $u_n(x)=1+\sin(2\pi nx)$. Énoncer précisément les assertions « $Au_n\rightharpoonup\chi$ dans $V'$ » et « $\chi=Au$ ». Montrer que $u_n\rightharpoonup 1$, que $Au_n\rightharpoonup\chi$ avec $\chi\neq A(1)$, et identifier l'hypothèse du lemme de Minty qui fait défaut.
Source : {"doc":"polycopie","pdfPage":44,"label":"Exercice 33, facile (p. PDF 44) ; section 7.4 (p. PDF 30)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-V` (hypothese) : $V=L^4(]0,1[)$ est réflexif, $V'=L^{4/3}(]0,1[)$, $\langle g,w\rangle=\int_0^1gw$.
- `d-def` (definition) : « $Au_n\rightharpoonup\chi$ dans $V'$ » signifie $\langle Au_n,w\rangle\to\langle\chi,w\rangle$ pour tout $w\in V$ ; « $\chi=Au$ » est une égalité entre deux éléments de $V'$, qui porte sur la limite $u$ de $(u_n)$.
- `d-A` (definition) : $A(u)=u^3$, $u_n=1+s_n$ avec $s_n(x)=\sin(2\pi nx)$.
- `mono` (consequence) : $A:V\to V'$ est monotone et hémicontinu.
- `osc` (consequence) : $s_n\rightharpoonup 0$, $s_n^2\rightharpoonup\frac12$ et $s_n^3\rightharpoonup 0$, faiblement dans $L^4$ et dans $L^{4/3}$.
- `weak-u` (consequence) : $u_n\rightharpoonup 1$ dans $V$.
- `chi` (egalite, calcul rational) : $Au_n=1+3s_n+3s_n^2+s_n^3\rightharpoonup\chi=\frac52$ dans $V'$.
  - valeur attendue : "5/2"
- `neq` (consequence) : $\chi=\frac52\neq 1=A(1)$ : « $Au_n\rightharpoonup\chi$ » n'entraîne pas « $\chi=Au$ ».
- `ls` (egalite, calcul rational) : Pour tout $n\ge 1$ : $\langle Au_n,u_n-1\rangle=\int_0^1(1+s_n)^3s_n=\frac{15}8$.
  - valeur attendue : "15/8"
- `diag` (inegalite) : $\limsup_n\langle Au_n,u_n-u\rangle>0$ : l'hypothèse du $\limsup$ fait défaut.
- `fin` (conclusion) : Les deux assertions sont distinctes ; ici $A$ est monotone, hémicontinu, $u_n\rightharpoonup 1$, $Au_n\rightharpoonup\frac52\neq A(1)$, et seule l'hypothèse du $\limsup$ manque.
- `x-cont` (consequence, DISTRACTEUR) : $A$ étant hémicontinu, $u_n\rightharpoonup u$ et $Au_n\rightharpoonup\chi$ entraînent $\chi=Au$.
- `x-ls-auto` (inegalite, DISTRACTEUR) : $\limsup_n\langle Au_n,u_n-u\rangle\le 0$ est automatique, puisque $u_n-u\rightharpoonup 0$.

Règles :
- `d-A` + `h-V` ⟹ `mono` par « $(a^3-b^3)(a-b)\ge 0$ pour $a,b\in\mathbb R$, intégré ; $t\mapsto\int_0^1(u+tv)^3w$ est polynomiale en $t$. »
- `d-A` + `h-V` ⟹ `osc` par « Lemme de Riemann–Lebesgue pour les puissances de $\sin(2\pi n\cdot)$, de moyennes $0$, $\frac12$, $0$, et bornitude dans $L^4$. [riemann-lebesgue] »
- `osc` + `d-A` ⟹ `weak-u` par « Somme de limites faibles. »
- `osc` + `d-A` ⟹ `chi` par « Développement de $(1+s_n)^3$, puis limite faible de chaque terme. »
- `chi` + `d-A` + `d-def` ⟹ `neq` par « Comparaison de deux constantes, avec la définition de chaque assertion. »
- `d-A` ⟹ `ls` par « $\int_0^1s_n=\int_0^1s_n^3=0$, $\int_0^1s_n^2=\frac12$, $\int_0^1s_n^4=\frac38$ pour $n\ge 1$. »
- `ls` + `weak-u` ⟹ `diag` par « La suite est constante, de valeur strictement positive. » (chemin calcul)
- `neq` + `mono` + `weak-u` + `chi` ⟹ `diag` par « Lemme de Minty : si le $\limsup$ était $\le 0$, on aurait $\chi=A(1)$. [minty] » (chemin contraposee)
- `neq` + `diag` + `mono` ⟹ `fin` par « Réunion des résultats établis. »

Justifications sans règle (séduisantes ou fausses) : « La limite faible d’un cube est le cube de la limite faible. »

Pièges :
- `x-cont` → incorrect [minty-identification] : L'hémicontinuité ne porte que sur les droites ($t\mapsto\langle A(u+tv),w\rangle$ est continue) ; elle ne fait pas passer $A$ à la limite faible le long d'une suite. — Contre-exemple : Ici $A$ est hémicontinu, $u_n\rightharpoonup 1$, et $Au_n\rightharpoonup\frac52\neq 1$.
- `x-ls-auto` → incorrect [limsup-minty] : Le crochet $\langle Au_n,u_n-u\rangle$ couple deux suites faiblement convergentes : la convergence faible de $u_n-u$ vers $0$ ne suffit pas. — Contre-exemple : $\langle Au_n,u_n-1\rangle=\frac{15}8$ pour tout $n\ge 1$.
- `chi` par « La limite faible d’un cube est le cube de la limite faible. » → incorrect [nonlinearite-limite-faible] : Les non-linéarités ne passent pas à la limite faible : le terme oscillant au carré laisse une contribution. — Contre-exemple : $s_n\rightharpoonup 0$ mais $s_n^2\rightharpoonup\frac12\neq 0$.

Retraits :
- `mono` (nécessaire) : Sans monotonie, l'échec de $\chi=Au$ peut venir d'une autre hypothèse que le $\limsup$. — Contre-exemple : $B(u)=-u^3$ n'est pas monotone : avec la même suite, $Bu_n\rightharpoonup-\frac52\neq-1=B(1)$, alors que $\langle Bu_n,u_n-1\rangle=-\frac{15}8\le 0$.

Solution :
**Les deux assertions.** « $Au_n\rightharpoonup\chi$ dans $V'$ » signifie $\int_0^1Au_n\,w\to\int_0^1\chi w$ pour tout $w\in L^4$ : c'est une propriété de la suite $(Au_n)$. « $\chi=Au$ » est une égalité dans $V'$ entre cette limite et l'image par $A$ de la limite faible $u$ de $(u_n)$.

**Limites faibles.** Par Riemann–Lebesgue, $s_n\rightharpoonup 0$, $s_n^2\rightharpoonup\frac12$, $s_n^3\rightharpoonup 0$. Donc $u_n\rightharpoonup 1$, et $u_n^3=1+3s_n+3s_n^2+s_n^3\rightharpoonup 1+\frac32=\frac52$. Or $A(1)=1$ : $\chi\neq A(1)$.

**Diagnostic.** $A$ est monotone ($(a^3-b^3)(a-b)\ge 0$) et hémicontinu. Mais $\langle Au_n,u_n-1\rangle=\int_0^1(s_n+3s_n^2+3s_n^3+s_n^4)=\frac32+\frac38=\frac{15}8$ pour tout $n\ge 1$ : le $\limsup$ vaut $\frac{15}8>0$. C'est exactement l'hypothèse qui manque, ce que confirme la contraposée du lemme.

Indices :
1. Sur quel objet porte chacune des deux assertions : la suite $(Au_n)$, ou l'image de la limite $u$ ?
2. Développe $(1+s_n)^3$ et utilise les moyennes de $\sin$, $\sin^2$, $\sin^3$ sur une période.
3. $\chi=\frac52$ alors que $A(1)=1$. Puis $\int_0^1(1+s_n)^3s_n=\frac32+\frac38$.

Erreurs fréquentes :
- Prendre la limite faible d’un cube pour le cube de la limite faible.
- Croire que l’hémicontinuité suffit à identifier la limite.
- Tenir l'hypothèse du $\limsup$ pour automatique.

Variante : Même question avec $A(u)=u^3$ sur $L^4(]0,1[)$ et $u_n=\sin(2\pi nx)$.

Solution de la variante : $u_n\rightharpoonup 0$ et $u_n^3\rightharpoonup 0=A(0)$ : ici la limite faible coïncide avec l'image de la limite, par symétrie. Pourtant $\langle Au_n,u_n-0\rangle=\int_0^1s_n^4=\frac38>0$ : l'hypothèse du $\limsup$ n'est pas nécessaire à la conclusion, elle est seulement suffisante.

Vérification : {"origin":"complement","review":"machine","notes":"L’exercice figure au polycopié sans corrigé ; exemple et calculs rédigés pour ProofLab."}

## Exercice intermediaire `minty.intermediaire` : Dériver $\langle\chi-Av,u-v\rangle\ge 0$

Énoncé : Soit $V$ réflexif réel, $A:V\to V'$ monotone, $u_n\rightharpoonup u$ dans $V$, $Au_n\rightharpoonup\chi$ dans $V'$ et $\limsup_n\langle Au_n,u_n-u\rangle\le 0$. Montrer que $\langle\chi-Av,u-v\rangle\ge 0$ pour tout $v\in V$.
Source : {"doc":"polycopie","pdfPage":44,"label":"Exercice 33, intermédiaire (p. PDF 44) ; démonstration de la section 7.4 (p. PDF 30)"} — prérequis : —

But : `fin` — usage : demonstration

Nœuds :
- `h-mono` (hypothese) : $V$ est réflexif réel et $A:V\to V'$ est monotone.
- `h-cv` (hypothese) : $u_n\rightharpoonup u$ dans $V$ et $Au_n\rightharpoonup\chi$ dans $V'$.
- `h-ls` (hypothese) : $\limsup_n\langle Au_n,u_n-u\rangle\le 0$.
- `s-v` (definition, locale) : Soit $v\in V$.
- `dec` (egalite) : $\langle Au_n-Av,u_n-v\rangle=\langle Au_n,u_n-u\rangle+\langle Au_n,u-v\rangle-\langle Av,u_n-v\rangle$.
- `pos` (inegalite) : Pour tout $n$ : $0\le\langle Au_n,u_n-u\rangle+\langle Au_n,u-v\rangle-\langle Av,u_n-v\rangle$.
- `cv1` (consequence) : $\langle Au_n,u-v\rangle\to\langle\chi,u-v\rangle$.
- `cv2` (consequence) : $\langle Av,u_n-v\rangle\to\langle Av,u-v\rangle$.
- `lim` (inegalite) : $0\le\limsup_n\langle Au_n,u_n-u\rangle+\langle\chi,u-v\rangle-\langle Av,u-v\rangle$.
- `fin` (conclusion) : $\langle\chi-Av,u-v\rangle\ge 0$ pour tout $v\in V$.
- `x-prod` (consequence, DISTRACTEUR) : $\langle Au_n,u_n\rangle\to\langle\chi,u\rangle$ découle des seules convergences faibles $u_n\rightharpoonup u$ et $Au_n\rightharpoonup\chi$.
- `x-liminf` (consequence, DISTRACTEUR) : La conclusion subsiste si l'on suppose seulement $\liminf_n\langle Au_n,u_n-u\rangle\ge 0$.

Règles :
- `s-v` ⟹ `dec` par « Écrire $u_n-v=(u_n-u)+(u-v)$ dans le premier crochet. »
- `dec` + `h-mono` ⟹ `pos` par « Monotonie de $A$ appliquée au couple $(u_n,v)$. »
- `h-cv` + `s-v` ⟹ `cv1` par « Convergence faible de $Au_n$ dans $V'$, testée contre l'élément fixé $u-v\in V$. »
- `h-cv` + `s-v` + `h-mono` ⟹ `cv2` par « Convergence faible de $u_n$ dans $V$, testée contre l'élément fixé $Av\in V'$. »
- `pos` + `cv1` + `cv2` ⟹ `lim` par « $\limsup(a_n+b_n)\le\limsup a_n+\lim b_n$ lorsque $(b_n)$ converge ; une inégalité large passe au $\limsup$. »
- `lim` + `h-ls` ⟹ `fin` par « Hypothèse du $\limsup$, puis regroupement des deux derniers termes. »

Justifications sans règle (séduisantes ou fausses) : « $\langle Au_n,u_n-u\rangle\to 0$ puisque $u_n-u\rightharpoonup 0$. »

Pièges :
- `x-prod` → incorrect [nonlinearite-limite-faible] : Le crochet de deux suites faiblement convergentes ne converge pas en général vers le crochet des limites : c'est pour cela qu'on isole le terme du $\limsup$. Sous la monotonie et l'hypothèse du $\limsup$, cette convergence a bien lieu (le crochet $\langle Au_n,u_n-u\rangle$, de $\liminf\ge 0$ par monotonie, tend vers $0$), mais elle ne découle pas des seules convergences faibles. — Contre-exemple : Dans $V=\ell^2$, $V'$ identifié à $\ell^2$ et $A=I$ : $e_n\rightharpoonup 0$, $Ae_n\rightharpoonup 0$, et $\langle Ae_n,e_n\rangle=1$ pour tout $n$.
- `x-liminf` → incorrect [limsup-minty] : Seule une majoration du $\limsup$ permet de garder l'inégalité dans le bon sens. — Contre-exemple : $A(u)=u^3$ sur $L^4(]0,1[)$, $u_n=1+\sin(2\pi nx)$ : le crochet vaut $\frac{15}8$, son $\liminf$ est positif, $\chi=\frac52$, et pour $v=\frac54$ : $\langle\chi-Av,u-v\rangle=\big(\frac52-\frac{125}{64}\big)\big(1-\frac54\big)=-\frac{35}{256}<0$.
- `lim` par « $\langle Au_n,u_n-u\rangle\to 0$ puisque $u_n-u\rightharpoonup 0$. » → incorrect [limsup-minty] : Ce crochet couple deux suites faiblement convergentes : il ne tend pas vers $0$ en général, d'où l'hypothèse du $\limsup$. — Contre-exemple : $\langle u_n^3,u_n-1\rangle=\frac{15}8$ pour $u_n=1+\sin(2\pi nx)$.

Retraits :
- `h-ls` (nécessaire) : Le premier terme n’est plus contrôlé, et l’inégalité peut changer de signe. — Contre-exemple : $A(u)=u^3$, $u_n=1+\sin(2\pi nx)$, $v=\frac54$ : $\langle\chi-Av,u-v\rangle=-\frac{35}{256}$.
- `h-mono` (nécessaire) : Sans monotonie, le point de départ de l’argument disparaît. — Contre-exemple : $B(u)=-u^3$, $u_n=1+\sin(2\pi nx)$ : $\limsup\langle Bu_n,u_n-1\rangle=-\frac{15}8\le 0$, $\chi=-\frac52$, et pour $v=0$ : $\langle\chi-B0,1-0\rangle=-\frac52<0$.

Solution :
Soit $v\in V$. Par monotonie,
$$0\le\langle Au_n-Av,u_n-v\rangle=\langle Au_n,u_n-u\rangle+\langle Au_n,u-v\rangle-\langle Av,u_n-v\rangle.$$
Le deuxième terme tend vers $\langle\chi,u-v\rangle$ (convergence faible de $Au_n$ testée contre $u-v$ fixé), le troisième vers $\langle Av,u-v\rangle$ (convergence faible de $u_n$ testée contre $Av$ fixé). Seul le premier ne converge pas a priori : il couple deux suites faiblement convergentes. En passant au $\limsup$ :
$$0\le\limsup_n\langle Au_n,u_n-u\rangle+\langle\chi-Av,u-v\rangle\le\langle\chi-Av,u-v\rangle.$$
La suite du lemme prend $v=u-tw$, divise par $t>0$ et fait $t\downarrow 0$ par hémicontinuité.

Indices :
1. Lequel des termes de $\langle Au_n-Av,u_n-v\rangle$ ne peut pas passer à la limite faible ?
2. Écris $u_n-v=(u_n-u)+(u-v)$ : un seul terme couple deux suites faiblement convergentes.
3. $\limsup(a_n+b_n)\le\limsup a_n+\lim b_n$ ; l'hypothèse borne $\limsup a_n$ par $0$.

Erreurs fréquentes :
- Passer à la limite dans $\langle Au_n,u_n\rangle$ comme dans un produit.
- Remplacer l'hypothèse du $\limsup$ par une hypothèse sur le $\liminf$.

Variante : Soit $V$ réflexif, $A:V\to V'$ borné sur les bornés, et $u_n\to u$ fortement dans $V$. Montrer que $\limsup_n\langle Au_n,u_n-u\rangle\le 0$.

Solution de la variante : $(u_n)$ converge, donc est bornée, et $(Au_n)$ est bornée dans $V'$ par une constante $M$. Alors $|\langle Au_n,u_n-u\rangle|\le M\|u_n-u\|_V\to 0$ : la limite existe et vaut $0$. Avec une convergence seulement faible, ce raisonnement tombe.

Graphe de la variante :
But : `fin` — usage : demonstration

Nœuds :
- `h-fort` (hypothese) : $u_n\to u$ fortement dans $V$.
- `h-borne` (hypothese) : $A$ est borné sur les bornés.
- `b-un` (consequence) : $(u_n)$ est bornée dans $V$.
- `b-Aun` (inegalite) : Il existe $M$ tel que $\|Au_n\|_{V'}\le M$ pour tout $n$.
- `est` (inegalite) : $|\langle Au_n,u_n-u\rangle|\le M\|u_n-u\|_V$.
- `fin` (conclusion) : $\langle Au_n,u_n-u\rangle\to 0$, donc $\limsup_n\langle Au_n,u_n-u\rangle\le 0$.
- `x-faible` (consequence, DISTRACTEUR) : La même conclusion vaut si $u_n\rightharpoonup u$ seulement faiblement.

Règles :
- `h-fort` ⟹ `b-un` par « Une suite convergente est bornée. »
- `b-un` + `h-borne` ⟹ `b-Aun` par « Bornitude de A sur la boule qui contient la suite. »
- `b-Aun` ⟹ `est` par « Définition de la norme duale. »
- `est` + `h-fort` ⟹ `fin` par « $\|u_n-u\|_V\to 0$. »

Pièges :
- `x-faible` → incorrect [faible-fort] : La majoration $M\|u_n-u\|_V$ ne tend vers $0$ qu'en convergence forte. — Contre-exemple : $A(u)=u^3$ sur $L^4(]0,1[)$, $u_n=1+\sin(2\pi nx)\rightharpoonup 1$ : $\langle Au_n,u_n-1\rangle=\frac{15}8$.

Retraits :
- `h-fort` (nécessaire) : La majoration ne tend plus vers 0. — Contre-exemple : $u_n=1+\sin(2\pi nx)$ dans $L^4(]0,1[)$ et $A(u)=u^3$.

Vérification : {"origin":"polycopie","review":"machine"}

## Exercice difficile `minty.difficile` : Solutions approchées du $p$-Laplacien : justifier le $\limsup$, puis identifier

Énoncé : Soit $1<p<\infty$, $\Omega$ borné lipschitzien, $V=W^{1,p}_0(\Omega)$ normé par $\|u\|_V=\|\nabla u\|_{L^p}$, $A$ le $p$-Laplacien ($\langle Au,v\rangle=\int_\Omega|\nabla u|^{p-2}\nabla u\cdot\nabla v$), $f\in V'$, et $(V_n)$ des sous-espaces croissants de dimension finie de réunion dense. On suppose $u_n\in V_n$ tel que $\langle Au_n,v\rangle=\langle f,v\rangle$ pour tout $v\in V_n$. Montrer qu'après extraction $u_n\rightharpoonup u$ avec $Au=f$, en démontrant d'abord l'hypothèse du $\limsup$ du lemme de Minty.
Source : {"doc":"polycopie","pdfPage":44,"label":"Exercice 33, difficile (p. PDF 44) ; sections 7.3 et 7.4 (p. PDF 29–30)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-p` (hypothese) : $V=W^{1,p}_0(\Omega)$, normé par $\|u\|_V=\|\nabla u\|_{L^p}$, est réflexif séparable ; $A$ est monotone, hémicontinu, $\|Au\|_{V'}\le\|u\|_V^{p-1}$ et $\langle Au,u\rangle=\|u\|_V^p$.
- `h-Vn` (hypothese) : Les $V_n$ sont de dimension finie, croissants, et $\bigcup_nV_n$ est dense dans $V$.
- `h-un` (hypothese) : $u_n\in V_n$ et $\langle Au_n,v\rangle=\langle f,v\rangle$ pour tout $v\in V_n$.
- `b` (inegalite) : $\|u_n\|_V^{p-1}\le\|f\|_{V'}$ et $\|Au_n\|_{V'}\le\|f\|_{V'}$.
- `ext` (application-theoreme) : Après extraction : $u_n\rightharpoonup u$ dans $V$ et $Au_n\rightharpoonup\chi$ dans $V'$.
- `chi` (egalite) : $\chi=f$.
- `id` (egalite) : $\langle Au_n,u_n\rangle=\langle f,u_n\rangle$.
- `ls` (egalite) : $\langle Au_n,u_n-u\rangle=\langle f,u_n\rangle-\langle Au_n,u\rangle\to\langle f,u\rangle-\langle\chi,u\rangle=0$ : $\limsup_n\langle Au_n,u_n-u\rangle\le 0$.
- `minty` (application-theoreme) : $\chi=Au$.
- `fin` (conclusion) : $Au=f$ : $u$ est solution faible de $-\mathrm{div}(|\nabla u|^{p-2}\nabla u)=f$, obtenue sans utiliser de convergence forte des gradients.
- `x-ls-faible` (inegalite, DISTRACTEUR) : $\limsup_n\langle Au_n,u_n-u\rangle\le 0$ résulte de la seule convergence $u_n\rightharpoonup u$.
- `x-grad-fort` (consequence, DISTRACTEUR) : Par Rellich, $\nabla u_n\to\nabla u$ fortement dans $L^p(\Omega)$.

Règles :
- `h-un` + `h-p` ⟹ `b` par « Tester par $v=u_n$ : $\|u_n\|_V^p=\langle f,u_n\rangle\le\|f\|_{V'}\|u_n\|_V$ ; puis la croissance de $A$. »
- `b` + `h-p` ⟹ `ext` par « Extraction faible dans les espaces réflexifs V et V′. [extraction-reflexive] »
- `ext` + `h-un` + `h-Vn` ⟹ `chi` par « Pour $v\in V_k$ et $n\ge k$, $\langle Au_n,v\rangle=\langle f,v\rangle$ ; à la limite $\langle\chi,v\rangle=\langle f,v\rangle$ sur $\bigcup V_k$, dense. »
- `h-un` ⟹ `id` par « L'équation approchée avec $v=u_n\in V_n$. »
- `id` + `ext` + `chi` ⟹ `ls` par « Développer, utiliser l'équation pour $\langle Au_n,u_n\rangle$, puis les deux convergences faibles contre des éléments fixés, et $\chi=f$. »
- `ls` + `ext` + `h-p` ⟹ `minty` par « Lemme d’identification de Minty, ses quatre hypothèses étant établies. [minty] »
- `minty` + `chi` ⟹ `fin` par « $Au=\chi=f$. »

Justifications sans règle (séduisantes ou fausses) : « Lemme de Minty, l'hypothèse du $\limsup$ étant automatique pour des solutions approchées. » ; « $\langle Au_n,u_n\rangle=\|u_n\|_V^p\to\|u\|_V^p=\langle Au,u\rangle$ par convergence faible. »

Pièges :
- `x-ls-faible` → incorrect [limsup-minty] : Le crochet couple deux suites faiblement convergentes : c'est l'équation approchée qui permet de le calculer. — Contre-exemple : Pour $A(u)=u^3$ sur $L^4(]0,1[)$ et $u_n=1+\sin(2\pi nx)\rightharpoonup 1$ : $\langle Au_n,u_n-1\rangle=\frac{15}8$.
- `x-grad-fort` → incorrect [faible-fort] : Rellich donne la convergence forte de $u_n$ dans $L^p$, pas celle des gradients : c'est pour cela que l'on passe par Minty. (Pour le $p$-Laplacien, la convergence forte des gradients a bien lieu a posteriori, mais par un autre argument, qui utilise la conclusion de Minty.) — Contre-exemple : Sur $]0,1[$, $u_n=\frac{\sin(2\pi nx)}{2\pi n}\to 0$ dans $L^p$, mais $\|u_n'\|_{L^p}=\|\cos(2\pi n\,\cdot)\|_{L^p}$ ne dépend pas de $n\ge 1$ et ne tend pas vers $0$.
- `minty` par « Lemme de Minty, l'hypothèse du $\limsup$ étant automatique pour des solutions approchées. » → incorrect [limsup-minty] : L'hypothèse du $\limsup$ n'est pas automatique pour des solutions approchées : elle se démontre, ici grâce à l'équation approchée, avant d'appliquer le lemme.
- `ls` par « $\langle Au_n,u_n\rangle=\|u_n\|_V^p\to\|u\|_V^p=\langle Au,u\rangle$ par convergence faible. » → incorrect [faible-fort] : La norme n'est pas continue pour la convergence faible ; elle n'est que semi-continue inférieurement. — Contre-exemple : $u_n=\frac{\sin(2\pi nx)}{2\pi n}\rightharpoonup 0$ dans $W^{1,p}_0(]0,1[)$, et $\|u_n\|_V$ est constante non nulle.

Retraits :
- `h-Vn` (nécessaire) : On n'identifie plus $\chi=f$ que sur l'adhérence $W$ de $\bigcup V_n$. Le calcul du $\limsup$ subsiste (car $u\in W$), et Minty donne encore $\chi=Au$ ; mais on obtient seulement $\langle Au,w\rangle=\langle f,w\rangle$ pour $w\in W$, et non $Au=f$. — Contre-exemple : $p=2$, $\Omega=]0,1[$, $V_n=\mathrm{Vect}(\sin\pi x)$ pour tout $n$, $f=-(\sin 2\pi x)''=4\pi^2\sin 2\pi x$ : $\langle f,\sin\pi x\rangle=0$, donc $u_n=0$ et $u=0$, alors que $A0=0\neq f$.
- `id` (nécessaire) : C'est l'équation $\langle Au_n,u_n\rangle=\langle f,u_n\rangle$ qui rend le $\limsup$ calculable. — Contre-exemple : Pour une suite quelconque, $u_n=1+\sin(2\pi nx)$ et $A(u)=u^3$ donnent un $\limsup$ égal à $\frac{15}8$.

Solution :
**Bornes.** Avec $v=u_n$ : $\|u_n\|_V^p=\langle f,u_n\rangle\le\|f\|_{V'}\|u_n\|_V$, donc $\|u_n\|_V^{p-1}\le\|f\|_{V'}$, puis $\|Au_n\|_{V'}\le\|u_n\|_V^{p-1}\le\|f\|_{V'}$.

**Extraction et $\chi=f$.** Par réflexivité, $u_n\rightharpoonup u$ et $Au_n\rightharpoonup\chi$ après extraction. Pour $v\in V_k$ et $n\ge k$, $\langle Au_n,v\rangle=\langle f,v\rangle$, donc $\langle\chi,v\rangle=\langle f,v\rangle$ sur la réunion dense des $V_k$ : $\chi=f$.

**Hypothèse du $\limsup$, d'abord.** $\langle Au_n,u_n-u\rangle=\langle f,u_n\rangle-\langle Au_n,u\rangle\to\langle f,u\rangle-\langle\chi,u\rangle=0$. L'équation approchée a remplacé le crochet non linéaire par un terme linéaire en $u_n$.

**Identification.** Le lemme de Minty, dont les hypothèses sont maintenant toutes établies, donne $\chi=Au$, d'où $Au=f$. Aucune convergence forte des gradients n'a été utilisée : Rellich ne la fournirait pas.

Indices :
1. Avant d'appliquer le lemme, liste ses hypothèses : laquelle n'est pas donnée par l'extraction ?
2. Dans $\langle Au_n,u_n-u\rangle$, le terme $\langle Au_n,u_n\rangle$ est le seul difficile : que vaut-il d'après l'équation approchée ?
3. $\langle Au_n,u_n-u\rangle=\langle f,u_n\rangle-\langle Au_n,u\rangle\to\langle f-\chi,u\rangle=0$, une fois établi $\chi=f$.

Erreurs fréquentes :
- Appliquer Minty sans avoir démontré l'hypothèse du $\limsup$.
- Attendre de Rellich la convergence forte des gradients.
- Passer à la limite dans une norme sous convergence faible.

Variante : Même cadre, avec $Au=-\mathrm{div}(|\nabla u|^{p-2}\nabla u)+|u|^{p-2}u$ sur $V=W^{1,p}_0(\Omega)$. Vérifier que $A$ garde les propriétés utilisées, puis dire quelle étape de la preuve change.

Solution de la variante : $z\mapsto|z|^{p-2}z$ est croissante sur $\mathbb R$, donc le terme d'ordre zéro est monotone ; il est hémicontinu par convergence dominée, et $|\langle|u|^{p-2}u,v\rangle|\le\|u\|_{L^p}^{p-1}\|v\|_{L^p}\le C^p\|u\|_V^{p-1}\|v\|_V$ avec $C$ la constante de Poincaré. Ainsi $A$ est monotone, hémicontinu, $\|Au\|_{V'}\le(1+C^p)\|u\|_V^{p-1}$, et $\langle Au,u\rangle\ge\|u\|_V^p$. Les bornes deviennent $\|u_n\|_V^{p-1}\le\|f\|_{V'}$ et $\|Au_n\|_{V'}\le(1+C^p)\|f\|_{V'}$ ; rien d'autre ne change : $\chi=f$ par densité, le $\limsup$ par l'équation approchée, puis Minty.

Vérification : {"origin":"complement","review":"machine","notes":"Application du lemme de la section 7.4 (p. PDF 30) rédigée pour ProofLab."}