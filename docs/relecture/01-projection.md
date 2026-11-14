# 1. Projection sur un convexe fermé (`projection`) — polycopié p. PDF 5, section 1.1

## Fiche

Espaces : $H$ : espace de Hilbert réel, de norme $\|\cdot\|$ issue du produit scalaire $\langle\cdot,\cdot\rangle$. | $K\subset H$ : partie de $H$ ; « fermé » s'entend pour la topologie de la norme de $H$. | $x\in H$ : point à projeter, $d=\inf_{z\in K}\|x-z\|$.

Hypothèses :
- $H$ est complet (espace de Hilbert). — Sans elle : Dans $E=C([-1,1])$ muni du produit scalaire de $L^2$, l'hyperplan $F=\{u : \int_0^1u=0\}$ est fermé dans $E$. Pour $g=1$, le minimiseur dans $L^2$ vaut $\mathbb 1_{[-1,0[}$ : il n'est pas continu, et $\inf_{u\in F}\|g-u\|$ n'est atteint en aucun point de $E$.
- $K\neq\emptyset$.
- $K$ est fermé dans $H$. — Sans elle : Le disque ouvert de $\mathbb R^2$ est convexe non vide : pour $x=(2,0)$, l'infimum $1$ n'est atteint en aucun point.
- $K$ est convexe : $tu+(1-t)v\in K$ pour tous $u,v\in K$ et $t\in[0,1]$. — Sans elle : Sur le cercle unité de $\mathbb R^2$, fermé non convexe, tous les points sont à distance $1$ de $x=(0,0)$ : l'unicité est perdue.

Énoncé : Il existe un unique $p\in K$ tel que $\|x-p\|=\inf_{z\in K}\|x-z\|$. De plus,
$$p=P_Kx\iff p\in K\ \text{ et }\ \langle x-p,z-p\rangle_H\le 0\quad\forall z\in K,$$
et $P_K:H\to K$ est non expansive : $\|P_Kx-P_Ky\|_H\le\|x-y\|_H$ pour tous $x,y\in H$.

Bilan : {"existence":"Une suite minimisante est de Cauchy (identité du parallélogramme) ; sa limite appartient à $K$ par fermeture, grâce à la complétude.","unicite":"Appliquer la caractérisation à deux projetés $p$ et $q$ donne $\\|p-q\\|^2\\le 0$.","stabilite":"$P_K$ est non expansive.","autre":"Caractérisation par une inéquation variationnelle."}

Preuve dans le polycopié : complete

Plan :
1. Choisir une suite minimisante $(p_n)\subset K$ et noter $d=\inf_K\|x-\cdot\|$.
2. Montrer qu'elle est de Cauchy par l'identité du parallélogramme, le milieu restant dans $K$ par convexité.
3. Passer à la limite : complétude de $H$ et fermeture de $K$ donnent $p\in K$, et $\|x-p\|=d$.
4. Caractérisation : dérivée à droite en $0$ de $t\mapsto\|x-p-t(z-p)\|^2$, et réciproque par développement.
5. Unicité : appliquer la caractérisation à $(p,q)$ puis $(q,p)$.
6. Non-expansivité : combiner les deux caractérisations et utiliser Cauchy–Schwarz.

Vigilance :
- Ne pas confondre $\forall\varepsilon>0$ et $\exists\varepsilon>0$ dans la définition d'un ouvert.
- Ne pas conclure qu’une norme convergente impose le signe de la fonction limite.
- « Fermé » dépend toujours de l’espace et de sa topologie.

Vérification : {"origin":"polycopie","review":"machine"}

Définition « Ensemble convexe » : $K$ est convexe lorsque $tu+(1-t)v\in K$ pour tous $u,v\in K$ et $t\in[0,1]$.

Définition « Ensemble fermé (critère séquentiel) » : Dans un espace normé $H$, $K$ est fermé lorsque la limite, dans la norme de $H$, de toute suite convergente d'éléments de $K$ appartient à $K$.

## Contre-exemple `ce-projection-non-ferme` : Convexe non fermé
Assertion : Tout convexe non vide de $\mathbb R^2$ admet, pour chaque point $x$, un point à distance minimale.
Tâche : Soit $K'$ le disque unité ouvert et $x=(2,0)$. Détermine $\inf_{z\in K'}\|x-z\|$ : cet infimum n'est pas atteint.
Vérification : {"kind":"rational","prompt":"Valeur de $\\inf_{z\\in K'}\\|x-z\\|$","expected":"1"}
Explication : Pour $z\in K'$ : $\|x-z\|\ge 2-\|z\|>1$, et $z_n=(1-1/n,0)$ donne $\|x-z_n\|\to 1$. L'infimum vaut donc $1$ et n'est atteint en aucun point de $K'$.

## Contre-exemple `ce-projection-non-convexe` : Fermé non convexe
Assertion : Si $K$ est une partie fermée non vide de $\mathbb R^2$, le point de $K$ le plus proche de $x$ est unique.
Tâche : Soit $K$ le cercle unité de $\mathbb R^2$. Donne un point $x$ pour lequel l'unicité tombe en défaut.
Vérification : {"kind":"rational-vector","prompt":"Coordonnées de $x$","expected":["0","0"],"labels":["x₁","x₂"]}
Explication : Pour $x=(0,0)$, tous les points du cercle sont à distance $1$. Pour $x\neq 0$, l'unique point le plus proche est $x/\|x\|$ : l'origine est le seul point où l'unicité échoue.

## Contre-exemple `ce-projection-complet` : Espace non complet
Assertion : Tout convexe fermé non vide d'un espace préhilbertien admet une projection en tout point.
Tâche : Quelle hypothèse du théorème manque dans cette assertion ?
Vérification : {"kind":"choice","prompt":"Hypothèse manquante","options":["La complétude de l’espace","La compacité de $K$","La bornitude de $K$","La symétrie de $K$"],"correct":[0],"explanation":"Dans $C([-1,1])$ muni du produit scalaire de $L^2$, l'hyperplan fermé $\\{u : \\int_0^1u=0\\}$ n'admet pas de point à distance minimale de $g=1$, car le minimiseur dans $L^2$ n'est pas continu."}
Explication : La suite minimisante est de Cauchy ; sans complétude, rien n'assure qu'elle converge dans l'espace.

## Exercice facile `projection.facile` : Projection sur un demi-plan fermé

Énoncé : Dans $H=\mathbb R^2$ euclidien, on pose $K=\{(a,b)\in\mathbb R^2 : a\ge 0\}$ et $x=(-2,3)$. Montrer que $K$ est non vide, fermé et convexe, calculer $P_Kx$ et vérifier l'inégalité caractéristique.
Source : {"doc":"polycopie","pdfPage":35,"label":"Atelier 9.1 ; exercice 1, facile (p. PDF 38)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-hilbert` (hypothese) : $H=\mathbb R^2$, muni du produit scalaire euclidien, est un espace de Hilbert réel.
- `d-K` (definition) : $K=\{(a,b)\in\mathbb R^2 : a\ge 0\}$.
- `d-x` (definition) : $x=(-2,3)$.
- `nonvide` (consequence) : $K\neq\emptyset$.
- `s-suite` (definition, locale) : Soit $(a_n,b_n)_n\subset K$ convergeant vers $(a,b)$ dans $\mathbb R^2$.
- `s-an-pos` (inegalite) : $a_n\ge 0$ pour tout $n$.
- `s-an-conv` (consequence) : $a_n\to a$ dans $\mathbb R$.
- `s-a-pos` (inegalite) : $a\ge 0$.
- `s-lim-in` (consequence) : $(a,b)\in K$.
- `c-point` (definition, locale) : Soit $(a,b)\notin K$, c'est-à-dire $a<0$ ; on pose $\varepsilon=-a/2>0$.
- `c-boule` (inclusion) : $B\big((a,b),\varepsilon\big)\subset\mathbb R^2\setminus K$.
- `c-ouvert` (consequence) : $\mathbb R^2\setminus K$ est ouvert.
- `i-pi-cont` (consequence) : $\pi_1:\mathbb R^2\to\mathbb R$, $\pi_1(a,b)=a$, est continue.
- `i-ferme-R` (consequence) : $[0,+\infty[$ est fermé dans $\mathbb R$.
- `i-eq` (egalite) : $K=\pi_1^{-1}\big([0,+\infty[\big)$.
- `p-prod` (egalite) : $K=[0,+\infty[\times\mathbb R$.
- `ferme` (consequence) : $K$ est fermé dans $\mathbb R^2$.
- `v-pts` (definition, locale) : Soient $(a,b),(c,d)\in K$ et $t\in[0,1]$.
- `v-coord` (egalite) : La première coordonnée de $t(a,b)+(1-t)(c,d)$ vaut $ta+(1-t)c$.
- `v-pos` (inegalite) : $ta+(1-t)c\ge 0$.
- `convexe` (consequence) : $K$ est convexe.
- `thm` (application-theoreme) : Il existe un unique $p\in K$ tel que $\|x-p\|=\inf_{z\in K}\|x-z\|$ : c'est $P_Kx$.
- `m-dist` (egalite) : Pour $(a,b)\in K$ : $\|x-(a,b)\|^2=(a+2)^2+(b-3)^2$.
- `m-ineg` (inegalite) : Pour $(a,b)\in K$ : $(a+2)^2+(b-3)^2\ge 4$, avec égalité si et seulement si $a=0$ et $b=3$.
- `p-val` (egalite, calcul rational-vector) : $P_Kx=(0,3)$.
  - valeur attendue : ["0","3"]
- `q-vect` (egalite) : Avec $p=P_Kx$ et $z=(a,b)\in K$ : $x-p=(-2,0)$ et $z-p=(a,b-3)$.
- `carac` (inegalite) : $\langle x-p,z-p\rangle=-2a\le 0$ pour tout $z=(a,b)\in K$.
- `fin` (conclusion) : $K$ est non vide, fermé, convexe ; sa projection en $x$ est calculée et l'inégalité caractéristique est vérifiée.
- `x-strict` (inegalite, DISTRACTEUR) : $a>0$.
- `x-carac-strict` (inegalite, DISTRACTEUR) : $\langle x-p,z-p\rangle<0$ pour tout $z\in K$.
- `x-forall-eps` (inclusion, DISTRACTEUR) : Pour tout $\varepsilon>0$ : $B\big((a,b),\varepsilon\big)\subset\mathbb R^2\setminus K$.

Règles :
- `d-K` ⟹ `nonvide` par « Un témoin explicite : $(0,0)$ vérifie la condition définissant $K$. »
- `s-suite` + `d-K` ⟹ `s-an-pos` par « Définition de $K$. » (chemin suites)
- `s-suite` ⟹ `s-an-conv` par « Convergence coordonnée par coordonnée : $|a_n-a|\le\|(a_n,b_n)-(a,b)\|$. » (chemin suites)
- `s-an-pos` + `s-an-conv` ⟹ `s-a-pos` par « Passage à la limite dans une inégalité large entre réels. » (chemin suites)
- `s-a-pos` + `d-K` ⟹ `s-lim-in` par « Définition de $K$. » (chemin suites)
- `s-lim-in` ⟹ `ferme` par « Caractérisation séquentielle d'un fermé d'un espace métrique. » (chemin suites)
- `c-point` ⟹ `c-boule` par « Si $|y_1-a|<\varepsilon$, alors $y_1<a+\varepsilon=a/2<0$. » (chemin complementaire)
- `c-boule` ⟹ `c-ouvert` par « Définition d’un ouvert : chaque point admet une boule incluse. » (chemin complementaire)
- `c-ouvert` ⟹ `ferme` par « Une partie est fermée si et seulement si son complémentaire est ouvert. » (chemin complementaire)
- ∅ ⟹ `i-pi-cont` par « $|\pi_1(z)-\pi_1(z')|\le\|z-z'\|$ : application lipschitzienne. » (chemin image-reciproque)
- ∅ ⟹ `i-ferme-R` par « Le complémentaire $]-\infty,0[$ est ouvert dans $\mathbb R$. »
- `d-K` ⟹ `i-eq` par « Définition de $K$. » (chemin image-reciproque)
- `i-pi-cont` + `i-ferme-R` + `i-eq` ⟹ `ferme` par « L’image réciproque d’un fermé par une application continue est fermée. » (chemin image-reciproque)
- `d-K` ⟹ `p-prod` par « Définition de $K$. » (chemin produit)
- `p-prod` + `i-ferme-R` ⟹ `ferme` par « Un produit de deux fermés est fermé dans l'espace produit ($\mathbb R$ est fermé dans lui-même). » (chemin produit)
- `v-pts` ⟹ `v-coord` par « Calcul direct sur les coordonnées. »
- `v-pts` + `d-K` ⟹ `v-pos` par « Si $t\in[0,1]$, $a\ge 0$ et $c\ge 0$, chacun des termes $ta$ et $(1-t)c$ est positif. »
- `v-coord` + `v-pos` + `d-K` ⟹ `convexe` par « Définition de la convexité. »
- `h-hilbert` + `nonvide` + `ferme` + `convexe` ⟹ `thm` par « Théorème de projection sur un convexe fermé non vide. [projection] »
- `d-x` ⟹ `m-dist` par « Calcul direct sur les coordonnées. »
- `m-dist` + `d-K` ⟹ `m-ineg` par « Si $a\ge 0$, alors $a+2\ge 2>0$, donc $(a+2)^2\ge 4$, et $(b-3)^2\ge 0$. »
- `m-ineg` + `thm` ⟹ `p-val` par « Le point qui réalise l'égalité appartient à $K$ et minimise la distance ; le minimiseur est unique. »
- `d-x` + `p-val` ⟹ `q-vect` par « Calcul direct sur les coordonnées. »
- `q-vect` + `d-K` ⟹ `carac` par « Calcul du produit scalaire, puis condition $a\ge 0$ définissant $K$. »
- `nonvide` + `ferme` + `convexe` + `p-val` + `carac` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « C’est évident. » ; « Une limite de réels positifs est strictement positive. » ; « Théorème de Stampacchia. »

Pièges :
- `s-a-pos` par « C’est évident. » → a-justifier [justification-absente] : Déclarer $a\ge 0$ ne le démontre pas. Quelles propriétés de $(a_n)$ sont connues, et quel résultat les fait passer à la limite ?
- `ferme` par « C’est évident. » → a-justifier [justification-absente] : La fermeture se démontre. Plusieurs voies sont possibles : les suites, le complémentaire, une image réciproque, un produit.
- `x-strict` → incorrect [inegalite-stricte-limite] : Le passage à la limite ne conserve que les inégalités larges : on obtient $a\ge 0$, pas $a>0$. — Contre-exemple : $a_n=1/n>0$ et $a_n\to 0$.
- `s-a-pos` par « Une limite de réels positifs est strictement positive. » → incorrect [inegalite-stricte-limite] : Cette justification est fausse : une limite de réels positifs peut être nulle. — Contre-exemple : $a_n=1/n$.
- `x-carac-strict` → incorrect [inegalite-stricte-limite] : Pour $z=(0,b)\in K$, on a $a=0$ et donc $\langle x-p,z-p\rangle=0$ : l'inégalité n'est pas stricte en général. — Contre-exemple : $z=(0,0)$ donne $\langle x-p,z-p\rangle=0$.
- `x-forall-eps` → incorrect [quantificateurs] : La définition d'un ouvert demande qu'il existe un rayon convenable, non que tous les rayons conviennent. — Contre-exemple : Pour $(a,b)=(-1,0)$ et $\varepsilon=2$, la boule contient $(0,0)\in K$.

Retraits :
- `ferme` (nécessaire) : Sans fermeture, le théorème de projection ne peut plus être invoqué : l'infimum peut ne pas être atteint. — Contre-exemple : $K'=\{(a,b) : a>0\}$ est convexe non vide mais non fermé. Pour $x=(-2,3)$ : $\inf_{z\in K'}\|x-z\|=2$, et aucun point de $K'$ ne réalise cette distance, car $\|x-(a,b)\|\ge a+2>2$.
- `convexe` (nécessaire) : Sans convexité, le minimiseur peut ne pas être unique, et le théorème ne s'applique plus. — Contre-exemple : $K'=\{(a,b) : |a|\ge 1\}$ est fermé non vide, non convexe. Pour $x=(0,0)$, les points $(1,0)$ et $(-1,0)$ réalisent tous deux la distance minimale $1$.
- `nonvide` (nécessaire) : Si $K$ est vide, l'infimum sur $K$ n'a pas de point qui le réalise. — Contre-exemple : $K'=\emptyset$ est fermé et convexe, et aucun point ne peut être sa projection.

Calculs fermés : [{"kind":"rational","prompt":"Distance $d(x,K)$","expected":"2"}]

Solution :
**Non-vacuité.** $(0,0)\in K$.

**Fermeture** (trois voies du polycopié, une voie supplémentaire ici).

- *Complémentaire ouvert.* Si $(a,b)\notin K$, alors $a<0$. Le rayon $\varepsilon=-a/2>0$ convient : $|y_1-a|<\varepsilon$ entraîne $y_1<a+\varepsilon=a/2<0$.
- *Image réciproque.* La projection $\pi_1$ est continue et $K=\pi_1^{-1}([0,+\infty[)$, où l'intervalle est fermé dans $\mathbb R$.
- *Suites.* Si $(a_n,b_n)\in K$ converge vers $(a,b)$, alors $a_n\ge 0$ et $a_n\to a$ ; le passage à la limite dans une inégalité large donne $a\ge 0$.
- *Produit.* $K=[0,+\infty[\times\mathbb R$ est un produit de deux fermés.

**Convexité.** Si $(a,b),(c,d)\in K$ et $t\in[0,1]$, la première coordonnée de $t(a,b)+(1-t)(c,d)$ vaut $ta+(1-t)c\ge 0$.

**Projection.** Pour $(a,b)\in K$, $\|x-(a,b)\|^2=(a+2)^2+(b-3)^2\ge 4$, avec égalité exactement si $a=0$ et $b=3$. Le théorème garantit existence et unicité, et le calcul identifie $P_Kx=(0,3)$.

**Caractérisation.** Pour $z=(a,b)\in K$, $x-p=(-2,0)$ et $z-p=(a,b-3)$, donc $\langle x-p,z-p\rangle=-2a\le 0$. L'inégalité n'est pas stricte en général, car $a=0$ est possible.

Indices :
1. Avant de calculer quoi que ce soit, quelles propriétés de $K$ le théorème de projection exige-t-il ?
2. La fermeture admet plusieurs démonstrations. La plus directe part de $(a_n,b_n)\in K$ convergente, et isole la première coordonnée. Pour le calcul, développe $\|x-(a,b)\|^2$ et utilise $a\ge 0$.
3. Pour la fermeture par suites : $a_n\ge 0$, $a_n\to a$, puis inégalité large à la limite. Pour le calcul : $(a+2)^2\ge 4$ si $a\ge 0$, avec égalité si et seulement si $a=0$.

Erreurs fréquentes :
- Écrire « $a\ge 0$ » sans dire d'où cela vient.
- Remplacer $\le$ par $<$ dans l'inégalité caractéristique.
- Confondre $\exists\varepsilon$ et $\forall\varepsilon$ dans la définition d'un ouvert.

Variante : Dans $\mathbb R^2$ euclidien, soit $K=\{(a,b) : b\le 1\}$ et $x=(4,5)$. Montrer que $K$ est un convexe fermé non vide, calculer $P_Kx$ et vérifier l'inégalité caractéristique.

Solution de la variante : $K$ est non vide ($(0,0)\in K$), fermé (image réciproque de $]-\infty,1]$ par la seconde coordonnée, continue) et convexe. Pour $(a,b)\in K$ : $\|x-(a,b)\|^2=(a-4)^2+(b-5)^2\ge 16$, avec égalité si et seulement si $a=4$ et $b=1$, car $b\le 1$ donne $5-b\ge 4$. Donc $P_Kx=(4,1)$. Enfin, pour $z=(a,b)\in K$, $\langle x-p,z-p\rangle=\langle(0,4),(a-4,b-1)\rangle=4(b-1)\le 0$.

Graphe de la variante :
But : `fin` — usage : application

Nœuds :
- `h-hilbert` (hypothese) : $H=\mathbb R^2$, euclidien, est un espace de Hilbert réel.
- `d-K` (definition) : $K=\{(a,b)\in\mathbb R^2 : b\le 1\}$.
- `d-x` (definition) : $x=(4,5)$.
- `nonvide` (consequence) : $K\neq\emptyset$.
- `ferme` (consequence) : $K$ est fermé dans $\mathbb R^2$.
- `convexe` (consequence) : $K$ est convexe.
- `thm` (application-theoreme) : $P_Kx$ existe et est unique.
- `m-ineg` (inegalite) : Pour $(a,b)\in K$ : $\|x-(a,b)\|^2=(a-4)^2+(b-5)^2\ge 16$, avec égalité si et seulement si $a=4$ et $b=1$.
- `p-val` (egalite, calcul rational-vector) : $P_Kx=(4,1)$.
  - valeur attendue : ["4","1"]
- `carac` (inegalite) : $\langle x-p,z-p\rangle=4(b-1)\le 0$ pour tout $z=(a,b)\in K$.
- `fin` (conclusion) : $K$ est un convexe fermé non vide, et $P_Kx$ est calculé et caractérisé.
- `x-strict` (inegalite, DISTRACTEUR) : $\langle x-p,z-p\rangle<0$ pour tout $z\in K$.

Règles :
- `d-K` ⟹ `nonvide` par « Témoin explicite : $(0,0)\in K$. »
- `d-K` ⟹ `ferme` par « Image réciproque de $]-\infty,1]$ par la seconde coordonnée, application continue. »
- `d-K` ⟹ `convexe` par « Si $b,d\le 1$ et $t\in[0,1]$, alors $tb+(1-t)d\le 1$. »
- `h-hilbert` + `nonvide` + `ferme` + `convexe` ⟹ `thm` par « Théorème de projection sur un convexe fermé non vide. [projection] »
- `d-x` + `d-K` ⟹ `m-ineg` par « Si $b\le 1$, alors $5-b\ge 4$, donc $(b-5)^2\ge 16$. »
- `m-ineg` + `thm` ⟹ `p-val` par « Le point réalisant l'égalité appartient à $K$ et minimise la distance. »
- `p-val` + `d-x` + `d-K` ⟹ `carac` par « Calcul : $x-p=(0,4)$, $z-p=(a-4,b-1)$, et $b\le 1$. »
- `nonvide` + `ferme` + `convexe` + `p-val` + `carac` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « C’est évident. »

Pièges :
- `x-strict` → incorrect [inegalite-stricte-limite] : Pour $z=(0,1)\in K$, on a $b=1$ et le produit scalaire est nul : l'inégalité n'est pas stricte. — Contre-exemple : $z=(0,1)$.
- `ferme` par « C’est évident. » → a-justifier [justification-absente] : La fermeture se démontre : identifie un fermé et une application continue.

Retraits :
- `ferme` (nécessaire) : Sans fermeture, le théorème ne peut plus être invoqué. — Contre-exemple : $K'=\{(a,b) : b<1\}$ : pour $x=(4,5)$, l'infimum $4$ n'est atteint en aucun point de $K'$.

Vérification : {"origin":"polycopie","review":"machine"}

## Exercice intermediaire `projection.intermediaire` : Projection sur le cône positif de $L^2$

Énoncé : Dans $H=L^2(]0,1[)$, soit $K_2=\{u\in L^2(]0,1[) : u\ge 0\ \text{p.p.}\}$. Démontrer que $K_2$ est convexe et fermé, et que $P_{K_2}f=f^+=\max(f,0)$ pour tout $f\in H$.
Source : {"doc":"polycopie","pdfPage":35,"label":"Atelier 9.2 (p. PDF 35–36) ; exercice 1, intermédiaire (p. PDF 38)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-hilbert` (hypothese) : $H=L^2(]0,1[)$ est un espace de Hilbert réel.
- `d-K` (definition) : $K_2=\{u\in L^2(]0,1[) : u\ge 0\ \text{p.p.}\}$.
- `d-f` (definition) : $f\in H$ est fixée et $f^+=\max(f,0)$.
- `nonvide` (consequence) : $K_2\neq\emptyset$.
- `v-pts` (definition, locale) : Soient $u,v\in K_2$ et $t\in[0,1]$.
- `v-pp` (inegalite) : $tu+(1-t)v\ge 0$ presque partout.
- `convexe` (consequence) : $K_2$ est convexe.
- `s-suite` (definition, locale) : Soit $(u_n)\subset K_2$ avec $u_n\to u$ dans $L^2(]0,1[)$ ; on note $E=\{x : u(x)<0\}$.
- `s-ponct` (inegalite) : Pour presque tout $x\in E$ : $|u_n(x)-u(x)|^2\ge|u(x)|^2$.
- `s-int` (inegalite) : Pour tout $n$ : $0\le\int_E|u|^2\le\|u_n-u\|_{L^2}^2$.
- `s-nul` (egalite) : $\int_E|u|^2=0$.
- `s-negl` (consequence) : $E$ est négligeable.
- `a-sous` (consequence) : Une sous-suite $(u_{n_k})$ converge vers $u$ presque partout.
- `s-lim` (consequence) : $u\in K_2$.
- `ferme` (consequence) : $K_2$ est fermé dans $L^2(]0,1[)$.
- `thm` (application-theoreme) : Pour tout $f\in H$, $P_{K_2}f$ existe et est unique ; il est caractérisé par $p\in K_2$ et $\langle f-p,g-p\rangle\le 0$ pour tout $g\in K_2$.
- `fp-in` (consequence) : $f^+\in K_2$.
- `fp-prod` (inegalite) : Pour tout $g\in K_2$ et presque tout $x$ : $(f-f^+)(g-f^+)\le 0$.
- `fp-int` (inegalite) : $\langle f-f^+,g-f^+\rangle_{L^2}\le 0$ pour tout $g\in K_2$.
- `d-pt` (inegalite) : Pour tout $g\in K_2$ et presque tout $x$ : $|f-g|\ge|f-f^+|$.
- `d-int` (inegalite) : $\|f-g\|_{L^2}\ge\|f-f^+\|_{L^2}$ pour tout $g\in K_2$.
- `fin` (conclusion) : $P_{K_2}f=f^+$.
- `x-norme` (consequence, DISTRACTEUR) : Puisque $\|u_n\|\to\|u\|$ et $u_n\ge 0$, on a $u\ge 0$ presque partout.
- `x-pp` (consequence, DISTRACTEUR) : La suite entière $(u_n)$ converge vers $u$ presque partout.

Règles :
- `d-K` ⟹ `nonvide` par « La fonction nulle appartient à $K_2$. »
- `v-pts` + `d-K` ⟹ `v-pp` par « Combinaison convexe de réels positifs, hors de la réunion de deux ensembles négligeables. »
- `v-pp` ⟹ `convexe` par « Définition de la convexité. »
- `s-suite` + `d-K` ⟹ `s-ponct` par « $u_n\ge 0$ p.p. et $u<0$ sur $E$ donnent $u_n-u\ge -u=|u|>0$ p.p. sur $E$. » (chemin mesure)
- `s-ponct` ⟹ `s-int` par « Intégration sur $E$ de l'inégalité ponctuelle, puis majoration par l'intégrale sur $]0,1[$. » (chemin mesure)
- `s-int` + `s-suite` ⟹ `s-nul` par « $\|u_n-u\|_{L^2}\to 0$ quand $n\to\infty$. » (chemin mesure)
- `s-nul` ⟹ `s-negl` par « $|u|^2>0$ sur $E$ : une intégrale nulle impose $|E|=0$. » (chemin mesure)
- `s-negl` + `d-K` ⟹ `s-lim` par « Définition de $K_2$. » (chemin mesure)
- `s-suite` ⟹ `a-sous` par « Toute suite convergente dans $L^2$ admet une sous-suite convergeant presque partout. » (chemin sous-suite)
- `a-sous` + `d-K` ⟹ `s-lim` par « Passage à la limite ponctuelle dans $u_{n_k}\ge 0$, hors d'un ensemble négligeable. » (chemin sous-suite)
- `s-lim` ⟹ `ferme` par « Caractérisation séquentielle d’un fermé d’un espace métrique. »
- `h-hilbert` + `nonvide` + `ferme` + `convexe` ⟹ `thm` par « Théorème de projection et caractérisation variationnelle. [projection] »
- `d-f` ⟹ `fp-in` par « $0\le f^+\le|f|$ donne $f^+\in L^2$ et $f^+\ge 0$. »
- `d-f` + `d-K` ⟹ `fp-prod` par « Disjonction : si $f(x)\ge 0$ le produit est nul ; si $f(x)<0$ il vaut $f(x)g(x)\le 0$. » (chemin caracterisation)
- `fp-prod` ⟹ `fp-int` par « Intégration d'une inégalité ponctuelle sur $]0,1[$. » (chemin caracterisation)
- `thm` + `fp-in` + `fp-int` ⟹ `fin` par « $f^+$ satisfait la caractérisation variationnelle de la projection. » (chemin caracterisation)
- `d-f` + `d-K` ⟹ `d-pt` par « Disjonction : si $f(x)\ge 0$, le membre de droite est nul ; si $f(x)<0$, alors $g(x)-f(x)\ge -f(x)>0$. » (chemin directe)
- `d-pt` ⟹ `d-int` par « Intégration d'une inégalité ponctuelle sur $]0,1[$. » (chemin directe)
- `thm` + `fp-in` + `d-int` ⟹ `fin` par « $f^+\in K_2$ minimise la distance à $f$ sur $K_2$, et le minimiseur est unique. » (chemin directe)

Justifications sans règle (séduisantes ou fausses) : « La convergence des normes impose le signe de la limite. » ; « La convergence dans $L^2$ implique la convergence presque partout de la suite entière. »

Pièges :
- `x-norme` → incorrect [norme-signe] : La convergence des normes ne dit rien du signe : $\|u_n\|\to\|u\|$ vaut aussi pour $u_n=|u|$ lorsque $u$ change de signe. — Contre-exemple : $u=\mathbb 1_{]0,1/2[}-\mathbb 1_{]1/2,1[}$, $u_n=|u|=1$ : $u_n\ge 0$, $\|u_n\|=\|u\|$, mais $u$ n'est pas positive.
- `x-pp` → incorrect [convergence-pp] : La convergence dans $L^2$ ne donne la convergence presque partout que pour une sous-suite. — Contre-exemple : La suite des indicatrices d'intervalles dyadiques balayant $[0,1]$ tend vers $0$ dans $L^2$, et ne converge en aucun point.
- `s-lim` par « La convergence des normes impose le signe de la limite. » → incorrect [norme-signe] : Cette justification est fausse. Le signe de la limite doit être obtenu à partir de l'information ponctuelle $u_n\ge 0$ p.p. — Contre-exemple : $u=\mathbb 1_{]0,1/2[}-\mathbb 1_{]1/2,1[}$ et $u_n=|u|$.
- `a-sous` par « La convergence dans $L^2$ implique la convergence presque partout de la suite entière. » → incorrect [convergence-pp] : Seule une sous-suite converge presque partout en général : la suite entière peut ne converger en aucun point.

Retraits :
- `ferme` (nécessaire) : La projection n'est plus assurée sur un convexe non fermé de $L^2$. — Contre-exemple : $K'=\{u\in C([0,1]) : u\ge 0\}$ est convexe, non vide et non fermé dans $L^2$. Pour $f=\mathbb 1_{]1/2,1[}$, on a $\inf_{g\in K'}\|f-g\|=0$ et cet infimum n'est pas atteint, car $f$ n'a pas de représentant continu.
- `convexe` (nécessaire) : L’unicité du minimiseur peut être perdue. — Contre-exemple : Sur la sphère unité de $L^2$, fermée non vide et non convexe, tout point est à distance $1$ de $f=0$.

Solution :
**Convexité.** Si $u,v\ge 0$ presque partout et $t\in[0,1]$, alors $tu+(1-t)v\ge 0$ presque partout : les ensembles exceptionnels se réunissent en un ensemble négligeable.

**Fermeture.** Soit $u_n\in K_2$ avec $u_n\to u$ dans $L^2$ ; posons $E=\{u<0\}$. Sur $E$, comme $u_n\ge 0$ p.p., on a $u_n-u\ge -u>0$, donc $|u_n-u|^2\ge|u|^2$. Ainsi $0\le\int_E|u|^2\le\|u_n-u\|^2_{L^2}\to 0$, d'où $\int_E|u|^2=0$. Comme $|u|^2>0$ sur $E$, l'ensemble $E$ est négligeable et $u\in K_2$.

**Projection.** $0\le f^+\le|f|$ entraîne $f^+\in K_2$. Pour $g\in K_2$ : si $f\ge 0$, alors $(f-f^+)(g-f^+)=0$ ; si $f<0$, alors le produit vaut $fg\le 0$. En intégrant, $\langle f-f^+,g-f^+\rangle\le 0$ pour tout $g\in K_2$, et le théorème de projection donne $P_{K_2}f=f^+$.

Indices :
1. La fermeture s'étudie ici pour la norme de $L^2$. Où peut se cacher le défaut de positivité de la limite ?
2. Isole l'ensemble $E=\{u<0\}$ et compare $|u_n-u|$ et $|u|$ sur $E$. Pour l'identification du projeté, raisonne ponctuellement selon le signe de $f(x)$.
3. Sur $E$, $u_n-u\ge -u>0$ p.p. : donc $\int_E|u|^2\le\|u_n-u\|^2$. Pour le produit : si $f<0$, il vaut $f\,g$, négatif car $g\ge 0$.

Erreurs fréquentes :
- Conclure au signe de la limite à partir de la seule convergence des normes.
- Affirmer la convergence presque partout de toute la suite à partir de la convergence dans $L^2$.

Variante : Dans $H=L^2(]0,1[)$, soit $K=\{u\in L^2(]0,1[) : u\le 1\ \text{p.p.}\}$. Démontrer que $K$ est convexe et fermé, et déterminer $P_Kf$.

Solution de la variante : $K$ est convexe, et si $u_n\to u$ avec $u_n\le 1$, l'ensemble $E=\{u>1\}$ vérifie $|u_n-u|\ge u-1$ sur $E$, d'où $\int_E(u-1)^2\le\|u_n-u\|^2\to 0$, donc $E$ est négligeable. On pose $p=\min(f,1)$ : $p\in L^2$ car $|p|\le|f|+1$ sur un intervalle borné, et $p\in K$. Pour $g\in K$ : si $f\le 1$, $f-p=0$ ; si $f>1$, $(f-p)(g-p)=(f-1)(g-1)\le 0$. Par intégration et caractérisation, $P_Kf=\min(f,1)$.

Vérification : {"origin":"polycopie","review":"machine"}

## Exercice difficile `projection.difficile` : Inéquation variationnelle sur $H^1_0(]0,1[)$

Énoncé : Soit $V=H^1_0(]0,1[)$ muni de $(u,v)_V=\int_0^1 u'v'$, soit $K=\{v\in V : v\ge 0\ \text{p.p.}\}$ et soit $f\in V'$. Montrer qu'il existe un unique $u\in K$ tel que $(u,v-u)_V\ge\langle f,v-u\rangle$ pour tout $v\in K$, en utilisant Riesz puis la projection.
Source : {"doc":"polycopie","pdfPage":36,"label":"Atelier 9.3 ; exercice 1, difficile (p. PDF 38)"} — prérequis : riesz, poincare, distributions

But : `fin` — usage : application

Nœuds :
- `h-V` (hypothese) : $V=H^1_0(]0,1[)$, muni de $(u,v)_V=\int_0^1u'v'$, est un espace de Hilbert réel (norme équivalente à celle de $H^1$, par Poincaré).
- `d-K` (definition) : $K=\{v\in V : v\ge 0\ \text{p.p.}\}$.
- `h-f` (hypothese) : $f\in V'$.
- `h-K2` (hypothese) : Le cône $K_2=\{u\in L^2 : u\ge 0\ \text{p.p.}\}$ est fermé dans $L^2(]0,1[)$ (exercice précédent).
- `h-inj` (hypothese) : L'injection $V\hookrightarrow L^2(]0,1[)$ est continue.
- `nonvide` (consequence) : $K\neq\emptyset$.
- `convexe` (consequence) : $K$ est convexe.
- `c-suite` (definition, locale) : Soit $(u_n)\subset K$ avec $u_n\to u$ dans $V$.
- `c-L2` (consequence) : $u_n\to u$ dans $L^2(]0,1[)$.
- `c-K2` (consequence) : $u\in K_2$.
- `c-V` (consequence) : $u\in V$.
- `c-in` (consequence) : $u\in V\cap K_2=K$.
- `ferme` (consequence) : $K$ est fermé dans $V$.
- `riesz` (application-theoreme) : Il existe un unique $w\in V$ tel que $(w,h)_V=\langle f,h\rangle$ pour tout $h\in V$.
- `proj` (application-theoreme) : $u:=P_Kw$ existe, $u\in K$ et $(w-u,v-u)_V\le 0$ pour tout $v\in K$.
- `exist` (inegalite) : $(u,v-u)_V\ge(w,v-u)_V=\langle f,v-u\rangle$ pour tout $v\in K$.
- `u-sol` (definition, locale) : Soient $u_1,u_2\in K$ deux solutions de l'inéquation.
- `u-somme` (inegalite) : $(u_1,u_2-u_1)_V+(u_2,u_1-u_2)_V\ge\langle f,u_2-u_1\rangle+\langle f,u_1-u_2\rangle=0$.
- `u-norme` (inegalite) : $-\|u_1-u_2\|_V^2\ge 0$.
- `unique` (consequence) : $u_1=u_2$.
- `fin` (conclusion) : Il existe un unique $u\in K$ tel que $(u,v-u)_V\ge\langle f,v-u\rangle$ pour tout $v\in K$.
- `x-V-ferme` (consequence, DISTRACTEUR) : $V=H^1_0(]0,1[)$ est fermé dans $L^2(]0,1[)$.
- `x-unique-seul` (consequence, DISTRACTEUR) : L'existence de $P_Kw$ suffit à conclure à l'unicité de la solution de l'inéquation, sans autre argument.

Règles :
- `d-K` ⟹ `nonvide` par « La fonction nulle appartient à $K$. »
- `d-K` ⟹ `convexe` par « Une combinaison convexe de fonctions positives p.p. est positive p.p. »
- `c-suite` + `h-inj` ⟹ `c-L2` par « Continuité de l'injection $V\hookrightarrow L^2$. »
- `c-L2` + `c-suite` + `h-K2` ⟹ `c-K2` par « Fermeture de $K_2$ dans $L^2$, et $u_n\in K_2$. »
- `c-suite` ⟹ `c-V` par « La convergence est posée dans $V$ : la limite appartient à $V$ par construction. »
- `c-K2` + `c-V` + `d-K` ⟹ `c-in` par « Définition de $K$ comme $V\cap K_2$. »
- `c-in` ⟹ `ferme` par « Caractérisation séquentielle d’un fermé d’un espace métrique. »
- `h-V` + `h-f` ⟹ `riesz` par « Théorème de représentation de Riesz. [riesz] »
- `h-V` + `nonvide` + `ferme` + `convexe` + `riesz` ⟹ `proj` par « Théorème de projection sur un convexe fermé non vide et caractérisation variationnelle. [projection] »
- `proj` + `riesz` ⟹ `exist` par « Développement de $(w-u,v-u)_V\le 0$, puis définition de $w$. »
- `u-sol` ⟹ `u-somme` par « Tester la première solution par $v=u_2$, la seconde par $v=u_1$, et additionner. »
- `u-somme` ⟹ `u-norme` par « Le membre de gauche vaut $-\|u_1-u_2\|_V^2$. »
- `u-norme` ⟹ `unique` par « Une norme positive ou nulle dont l'opposé est positif ou nul est nulle. »
- `exist` + `unique` ⟹ `fin` par « Réunion de l’existence et de l’unicité. »

Justifications sans règle (séduisantes ou fausses) : « $H^1_0(]0,1[)$ est fermé dans $L^2(]0,1[)$. » ; « Théorème de Stampacchia. »

Pièges :
- `x-V-ferme` → incorrect [densite-fermeture] : La densité et la fermeture sont deux propriétés différentes. Vérifie dans quel espace et pour quelle norme la fermeture est étudiée. — Contre-exemple : $H^1_0(]0,1[)$ est dense et strict dans $L^2(]0,1[)$ : la fonction constante $1$ est limite dans $L^2$ d'éléments de $H^1_0$ sans appartenir à $H^1_0$.
- `c-V` par « $H^1_0(]0,1[)$ est fermé dans $L^2(]0,1[)$. » → incorrect [densite-fermeture] : $u\in V$ ne vient pas d'une fermeture de $V$ dans $L^2$, qui est fausse : la limite appartient à $V$ parce que la convergence est posée dans $V$.
- `x-unique-seul` → a-justifier [existence-unicite] : L'unicité de $P_Kw$ ne dit rien, à elle seule, d'une solution quelconque de l'inéquation : teste les solutions l'une par l'autre.

Retraits :
- `ferme` (nécessaire) : Sans fermeture de $K$ dans $V$, $P_K$ n'est plus défini et le candidat $u=P_Kw$ disparaît. — Contre-exemple : $K'=\{v\in C^\infty_c(]0,1[) : v\ge 0\}$ est convexe, non fermé dans $V$. Si $w\in V$, $w\ge 0$, n'appartient pas à $K'$, alors $\inf_{v\in K'}\|w-v\|_V=0$ n'est pas atteint.
- `h-f` (nécessaire) : Riesz n'a pas d'objet si $f$ n'est pas une forme linéaire continue sur $V$. — Contre-exemple : La forme $v\mapsto v'(1/2)$, définie sur $C^\infty_c(]0,1[)$, n'est pas continue pour la norme de $V$ : elle n'admet pas de représentant dans $V$.

Solution :
**Non-vacuité, convexité.** $0\in K$, et une combinaison convexe de fonctions positives p.p. reste positive p.p.

**Fermeture.** Si $u_n\in K$ et $u_n\to u$ dans $V$, la continuité de $V\hookrightarrow L^2$ donne $u_n\to u$ dans $L^2$ ; $K_2$ étant fermé dans $L^2$, $u\in K_2$. La convergence étant posée dans $V$, on a aussi $u\in V$. Donc $u\in V\cap K_2=K$.

**Existence.** Par Riesz, il existe un unique $w\in V$ tel que $(w,h)_V=\langle f,h\rangle$ pour tout $h\in V$. On pose $u=P_Kw$. La caractérisation donne $(w-u,v-u)_V\le 0$, c'est-à-dire $(u,v-u)_V\ge(w,v-u)_V=\langle f,v-u\rangle$.

**Unicité.** Si $u_1,u_2$ sont solutions, on teste respectivement par $v=u_2$ et $v=u_1$, puis on additionne : $(u_1,u_2-u_1)_V+(u_2,u_1-u_2)_V\ge 0$. Le membre de gauche vaut $-\|u_1-u_2\|^2_V$, donc $u_1=u_2$.

**Point de vigilance.** $H^1_0(]0,1[)$ n'est pas fermé dans $L^2(]0,1[)$ : il y est dense et strict. La limite appartient à $H^1_0$ parce que la convergence est posée dans cet espace.

Indices :
1. Quelle est la topologie dans laquelle $K$ doit être fermé ? Quel résultat transforme $f\in V'$ en un vecteur de $V$ ?
2. Procède en deux temps : (i) $K$ convexe fermé non vide de $V$ ; (ii) Riesz donne $w$, on pose $u=P_Kw$. L'unicité s'obtient séparément, à partir de l'inéquation.
3. Pour la fermeture : passe de $V$ à $L^2$ par l'injection continue, utilise la fermeture de $K_2$ dans $L^2$, et garde $u\in V$ grâce à la convergence dans $V$.

Erreurs fréquentes :
- Affirmer que $H^1_0$ est fermé dans $L^2$.
- Invoquer Stampacchia alors que cet exercice en est une étape préalable.
- Conclure à l’unicité de la solution à partir de l’unicité de la projection.

Variante : Soit $V=H^1_0(]0,1[)$, $(u,v)_V=\int_0^1u'v'$, $\psi\in V$, et $K_\psi=\{v\in V : v\ge\psi\ \text{p.p.}\}$. Pour $f\in V'$, montrer qu'il existe un unique $u\in K_\psi$ tel que $(u,v-u)_V\ge\langle f,v-u\rangle$ pour tout $v\in K_\psi$.

Solution de la variante : $K_\psi=\psi+K$ où $K=\{v\in V : v\ge 0\ \text{p.p.}\}$ : c'est un translaté d'un convexe fermé non vide de $V$, donc un convexe fermé non vide (l'élément $\psi$ en fait partie). Par Riesz, $(w,h)_V=\langle f,h\rangle$ ; on pose $u=P_{K_\psi}w$, ce qui donne l'inéquation comme dans l'exercice. L'unicité s'obtient en testant chaque solution par l'autre.

Vérification : {"origin":"polycopie","review":"machine"}