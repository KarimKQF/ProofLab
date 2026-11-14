# 5. Banach–Steinhaus (`banach-steinhaus`) — polycopié p. PDF 9, section 2.1

## Fiche

Espaces : $X$ : espace de Banach ; $Y$ : espace normé. | $\mathcal L(X,Y)$ : espace des applications linéaires continues de $X$ dans $Y$, muni de la norme d'opérateur $\|T\|_{\mathcal L(X,Y)}=\sup_{\|x\|_X\le 1}\|Tx\|_Y$. | $(T_i)_{i\in I}\subset\mathcal L(X,Y)$ : famille quelconque, dénombrable ou non.

Hypothèses :
- $X$ est complet. — Sans elle : Sur $X=c_{00}$ muni de $\|\cdot\|_\infty$, les formes $T_nx=nx_n$ sont ponctuellement bornées et $\|T_n\|=n$.
- Chaque $T_i$ est linéaire et continu. — Sans elle : Si $T$ est une forme linéaire non continue sur un espace de Banach de dimension infinie (construite à l'aide d'une base algébrique), la famille $\{T\}$ vérifie l'hypothèse ponctuelle, mais $\|T\|=+\infty$.
- Pour chaque $x\in X$ : $\sup_{i\in I}\|T_ix\|_Y<\infty$. — Sans elle : $T_nx=nx$ sur $\mathbb R$ : $\sup_n|T_n1|=+\infty$ et $\|T_n\|=n$.

Énoncé : Si $X$ est un espace de Banach, $Y$ un espace normé et si $(T_i)_{i\in I}\subset\mathcal L(X,Y)$ vérifie $\sup_{i\in I}\|T_ix\|_Y<\infty$ pour chaque $x\in X$, alors $\sup_{i\in I}\|T_i\|_{\mathcal L(X,Y)}<\infty$.

Bilan : {"autre":"Une bornitude ponctuelle, vecteur par vecteur, devient une borne uniforme de la famille pour la norme d'opérateur."}

Preuve dans le polycopié : idee

Plan :
1. Poser $F_m=\{x\in X:\|T_ix\|_Y\le m\ \ \forall i\in I\}$ : chaque $F_m$ est fermé, comme intersection de fermés, et les $F_m$ recouvrent $X$ par hypothèse.
2. Par le théorème de Baire, $X$ étant complet, un $F_{m_0}$ contient une boule fermée $\overline B(a,r)$ avec $r>0$.
3. Déplacement : pour $\|z\|_X\le r$ et $i\in I$, $\|T_iz\|_Y\le\|T_i(a+z)\|_Y+\|T_ia\|_Y\le 2m_0$.
4. Homogénéité : pour $x\neq 0$, appliquer ce qui précède à $z=rx/\|x\|_X$ donne $\|T_ix\|_Y\le\frac{2m_0}{r}\|x\|_X$ ; donc $\sup_i\|T_i\|\le 2m_0/r$.

Vigilance :
- L'hypothèse se lit $\forall x,\ \exists C_x,\ \forall i$ : la constante dépend de $x$. La conclusion se lit $\exists C,\ \forall i,\ \forall x,\ \|T_ix\|\le C\|x\|$.
- La complétude porte sur $X$ seul : $Y$ est simplement normé.
- Une convergence simple $T_nx\to Tx$ ne donne pas la convergence pour la norme d'opérateur, seulement $\sup_n\|T_n\|<\infty$.

Vérification : {"origin":"complement","review":"machine","notes":"Le polycopié (p. PDF 9) ne donne que l’idée de preuve ; le détail des quatre étapes est rédigé pour ProofLab."}

Définition « Famille ponctuellement bornée » : La famille $(T_i)_{i\in I}\subset\mathcal L(X,Y)$ est ponctuellement bornée lorsque $\sup_{i\in I}\|T_ix\|_Y<\infty$ pour chaque $x\in X$, c'est-à-dire : $\forall x\in X,\ \exists C_x\ge 0,\ \forall i\in I,\ \|T_ix\|_Y\le C_x$.

Définition « Famille uniformément bornée » : La famille $(T_i)_{i\in I}\subset\mathcal L(X,Y)$ est uniformément bornée lorsque $\sup_{i\in I}\|T_i\|_{\mathcal L(X,Y)}<\infty$, c'est-à-dire : $\exists C\ge 0,\ \forall i\in I,\ \forall x\in X,\ \|T_ix\|_Y\le C\|x\|_X$.

Définition « Théorème de Baire (outil admis) » : Si un espace métrique complet non vide est réunion dénombrable de fermés, l'un d'eux est d'intérieur non vide.

## Contre-exemple `ce-bs-complet` : Espace non complet
Assertion : Si $X$ est un espace normé, $Y$ normé et si $(T_i)_{i\in I}\subset\mathcal L(X,Y)$ vérifie $\sup_i\|T_ix\|_Y<\infty$ pour chaque $x\in X$, alors $\sup_i\|T_i\|<\infty$.
Tâche : Sur $X=c_{00}$ muni de $\|\cdot\|_\infty$, on pose $T_nx=nx_n$. Pour $x=(1,-2,0,5,0,\dots)$, calcule $\sup_n|T_nx|$, puis la norme $\|T_7\|$.
Vérification : {"kind":"rational-vector","prompt":"Valeurs de $\\sup_n|T_nx|$ et de $\\|T_7\\|$","expected":["20","7"],"labels":["sup","‖T₇‖"]}
Explication : Ici $T_1x=1$, $T_2x=-4$, $T_3x=0$, $T_4x=20$, et $T_nx=0$ pour $n\ge 5$, d'où $\sup_n|T_nx|=20$. En général, $\sup_n|T_nx|<\infty$ pour tout $x\in c_{00}$, grâce au support fini, mais $\|T_n\|=n$ car $T_ne_n=n$ et $\|e_n\|_\infty=1$. La famille est donc ponctuellement bornée sans être uniformément bornée, ce qui montre que $c_{00}$ muni de $\|\cdot\|_\infty$ n'est pas complet.

## Contre-exemple `ce-bs-convergence-simple` : Convergence simple sans convergence en norme
Assertion : Si $(T_n)_{n}\subset\mathcal L(X,Y)$ vérifie $T_nx\to Tx$ pour tout $x\in X$, alors $\|T_n-T\|_{\mathcal L(X,Y)}\to 0$.
Tâche : Sur $X=Y=\ell^2$, soit $P_n$ la projection orthogonale sur les $n$ premières coordonnées : $P_nx\to x$ pour tout $x$. Détermine $\|P_n-\mathrm{Id}\|_{\mathcal L(\ell^2)}$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\|P_n-\\mathrm{Id}\\|$","expected":"1"}
Explication : $\mathrm{Id}-P_n$ est la projection orthogonale sur les coordonnées de rang $>n$ : elle est non nulle, de norme $1$, comme on le voit sur le vecteur $e_{n+1}$. Ainsi $\|P_n-\mathrm{Id}\|=1$ pour tout $n$, alors que $P_nx\to x$ pour tout $x\in\ell^2$, comme reste d'une série convergente.

## Contre-exemple `ce-bs-dense` : Bornitude sur une partie dense
Assertion : Si $X$ est un espace de Banach, $Y$ un espace normé et si $\sup_i\|T_ix\|_Y<\infty$ pour tout $x$ d'une partie dense de $X$, alors $\sup_i\|T_i\|<\infty$.
Tâche : Sur $X=\ell^2$, $Y=\mathbb R$, soit $T_nx=nx_n$. La famille est bornée sur la partie dense $c_{00}$, et $\|T_n\|=n$. Pour le point $x=(k^{-3/4})_{k\ge 1}\in\ell^2$, calcule $T_{16}x$.
Vérification : {"kind":"rational","prompt":"Valeur de $T_{16}x$","expected":"2"}
Explication : Pour $x=(k^{-3/4})_k$, on a $\sum_kk^{-3/2}<\infty$, donc $x\in\ell^2$, et $T_nx=n^{1/4}$, ce qui donne $T_{16}x=2$ et $\sup_n|T_nx|=+\infty$. Pour $x\in c_{00}$, $T_nx$ s'annule pour $n$ assez grand : la famille est bornée en chaque point de la partie dense $c_{00}$, et $\|T_n\|=n$. L'espace $\ell^2$ étant complet, il n'y a pas de contradiction : l'hypothèse ponctuelle échoue en $x$.

## Exercice facile `banach-steinhaus.facile` : Les quantificateurs de la bornitude ponctuelle

Énoncé : Soient $X,Y$ deux espaces normés, $I$ un ensemble non vide et $(T_i)_{i\in I}\subset\mathcal L(X,Y)$. On note (P) l'hypothèse de Banach–Steinhaus : « pour chaque $x\in X$, $\sup_{i\in I}\|T_ix\|_Y<\infty$ ».

Écrire (P) avec des quantificateurs, en précisant de quoi dépend la constante. Établir ensuite que les deux assertions voisines suivantes ne sont pas (P) :

- (Q) $\exists C\ge 0,\ \forall x\in X,\ \forall i\in I,\ \|T_ix\|_Y\le C$, qui force $T_i=0$ pour tout $i$ ;
- (R) $\forall x\in X,\ \forall i\in I,\ \exists C\ge 0,\ \|T_ix\|_Y\le C$, qui est vraie pour toute famille.
Source : {"doc":"polycopie","pdfPage":39,"label":"Annexe B, exercice 5, facile"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-esp` (hypothese) : $X$ et $Y$ sont des espaces normés, et $I$ est un ensemble non vide.
- `h-lin` (hypothese) : Chaque $T_i:X\to Y$ est linéaire et continu.
- `d-P` (definition) : (P) : pour chaque $x\in X$, $\sup_{i\in I}\|T_ix\|_Y<\infty$.
- `d-S` (definition, locale) : Soit $x\in X$ fixé, et soit $S_x=\{\|T_ix\|_Y : i\in I\}$, partie non vide de $[0,+\infty[$.
- `s-sup` (consequence) : $\sup S_x<\infty$ si et seulement si $S_x$ est majorée dans $\mathbb R$.
- `s-maj` (consequence) : $S_x$ est majorée si et seulement s'il existe $C_x\ge 0$ tel que $\|T_ix\|_Y\le C_x$ pour tout $i\in I$.
- `f-exact` (consequence, calcul choice) : (P) s'écrit : $\forall x\in X,\ \exists C_x\ge 0,\ \forall i\in I,\ \|T_ix\|_Y\le C_x$. La constante dépend de $x$, pas de $i$.
- `d-Q` (definition, locale) : Supposons (Q) : il existe $C\ge 0$ tel que $\|T_iz\|_Y\le C$ pour tous $z\in X$ et $i\in I$.
- `d-lam` (definition, locale) : Soient $i\in I$, $x\in X$ et $\lambda>0$.
- `q-hom` (inegalite) : $\lambda\|T_ix\|_Y=\|T_i(\lambda x)\|_Y\le C$.
- `q-div` (inegalite) : $\|T_ix\|_Y\le C/\lambda$ pour tout $\lambda>0$.
- `q-zero` (consequence) : Sous (Q) : $T_i=0$ pour tout $i\in I$.
- `r-vrai` (consequence) : (R) est vraie pour toute famille : pour $x$ et $i$ donnés, $C=\|T_ix\|_Y$ convient.
- `d-fam1` (definition) : Première famille : $X=Y=\mathbb R$, $I=\{1\}$, $T_1=\mathrm{Id}$.
- `e-P1` (egalite, calcul rational) : Pour la première famille, (P) est vraie, et la plus petite constante admissible en $x=-3$ vaut $3$.
  - valeur attendue : "3"
- `e-nonQ` (consequence) : Pour la première famille, (Q) est fausse alors que (P) est vraie.
- `d-fam2` (definition) : Seconde famille : $X=Y=\mathbb R$, $I=\mathbb N^*$, $T_nx=nx$.
- `e-nonP` (consequence) : Pour la seconde famille, (P) est fausse : $\sup_{n}|T_n1|=+\infty$.
- `e-nonR` (consequence) : Pour la seconde famille, (R) est vraie alors que (P) est fausse.
- `i-chaine` (consequence) : Pour toute famille : (Q) entraîne (P), et (P) entraîne (R).
- `fin` (conclusion) : (P) s'écrit $\forall x,\ \exists C_x,\ \forall i$ ; (Q) est strictement plus forte que (P) et (R) est strictement plus faible que (P).
- `x-Q` (consequence, DISTRACTEUR) : (P) s'écrit : $\exists C\ge 0,\ \forall x\in X,\ \forall i\in I,\ \|T_ix\|_Y\le C$.
- `x-R` (consequence, DISTRACTEUR) : (P) s'écrit : $\forall x\in X,\ \forall i\in I,\ \exists C\ge 0,\ \|T_ix\|_Y\le C$.
- `x-U` (consequence, DISTRACTEUR) : (P) s'écrit : $\exists C\ge 0,\ \forall i\in I,\ \forall x\in X,\ \|T_ix\|_Y\le C\|x\|_X$.

Règles :
- `h-esp` + `d-S` ⟹ `s-sup` par « Définition de la borne supérieure d'une partie non vide de $\mathbb R$, à valeurs dans $[0,+\infty]$. »
- `d-S` ⟹ `s-maj` par « Définition d'un majorant ; un majorant d'une partie non vide de $[0,+\infty[$ est positif. »
- `d-P` + `s-sup` + `s-maj` ⟹ `f-exact` par « Report dans (P), l'élément $x$ étant quelconque. »
- `h-lin` + `d-Q` + `d-lam` ⟹ `q-hom` par « Linéarité de $T_i$, homogénéité de la norme, puis (Q) appliquée au point $z=\lambda x$. »
- `q-hom` ⟹ `q-div` par « Division par $\lambda>0$. »
- `q-div` ⟹ `q-zero` par « Passage à la limite $\lambda\to+\infty$, puis $\|y\|_Y=0\Rightarrow y=0$. »
- `h-esp` ⟹ `r-vrai` par « Le réel $C$ se choisit après $x$ et $i$ : le choix $C=\|T_ix\|_Y$ est permis. »
- `d-fam1` ⟹ `e-P1` par « Ici $\sup_{i\in I}\|T_ix\|=|x|$. »
- `q-zero` + `e-P1` + `d-fam1` ⟹ `e-nonQ` par « Contraposée de « (Q) entraîne $T_i=0$ », puisque $T_1\neq 0$. »
- `d-fam2` ⟹ `e-nonP` par « Ici $|T_n1|=n$, et $\sup_{n}n=+\infty$. »
- `r-vrai` + `e-nonP` ⟹ `e-nonR` par « Spécialisation d’un énoncé valable pour toute famille à cette famille-ci. »
- `f-exact` ⟹ `i-chaine` par « Choix $C_x=C$ pour la première implication, puis $C=C_x$ pour la seconde. »
- `f-exact` + `i-chaine` + `e-nonQ` + `e-nonR` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « Les quantificateurs d’un même énoncé peuvent être réordonnés librement. » ; « Une application linéaire bornée est nulle. » ; « C’est évident. »

Pièges :
- `x-Q` → incorrect [quantificateurs] : Le quantificateur existentiel a été remonté avant $x$ : la constante ne peut plus dépendre de $x$, ce que (P) autorise. — Contre-exemple : $X=Y=\mathbb R$, $T_1=\mathrm{Id}$ : (P) est vraie avec $C_x=|x|$, mais aucune constante ne majore $|x|$ pour tout $x\in\mathbb R$.
- `x-R` → incorrect [quantificateurs] : Ici la constante est choisie après $i$ : l'énoncé devient toujours vrai et ne dit plus rien de la famille. (P) exige une constante commune à tous les indices. — Contre-exemple : $T_nx=nx$ sur $\mathbb R$ : l'énoncé est vrai, mais $\sup_n|T_n1|=+\infty$.
- `x-U` → incorrect [hypotheses-theoreme] : Cette écriture exprime $\sup_i\|T_i\|<\infty$ : c'est la conclusion du théorème, non son hypothèse. Sans complétude de $X$, elle ne découle pas de (P). — Contre-exemple : $X=c_{00}$ muni de $\|\cdot\|_\infty$ et $T_nx=nx_n$ : (P) est vraie, mais $\|T_n\|=n$.
- `f-exact` par « Les quantificateurs d’un même énoncé peuvent être réordonnés librement. » → incorrect [quantificateurs] : Échanger un $\forall$ et un $\exists$ change le sens de l'énoncé : ici, le choix de la constante n'obéit plus aux mêmes dépendances. — Contre-exemple : « Pour tout entier $n$, il existe un entier $m$ tel que $m>n$ » est vrai ; « il existe un entier $m$ tel que, pour tout entier $n$, $m>n$ » est faux.
- `q-zero` par « Une application linéaire bornée est nulle. » → incorrect [quantificateurs] : Au sens de $\mathcal L(X,Y)$, « borné » signifie $\|Tx\|\le C\|x\|$, et un tel opérateur n'est pas nul en général. C'est la borne sans facteur $\|x\|$, combinée à l'homogénéité, qui force la nullité : il faut le démontrer. — Contre-exemple : $\mathrm{Id}_{\mathbb R}$ est bornée au sens de $\mathcal L(\mathbb R,\mathbb R)$, et non nulle.
- `q-zero` par « C’est évident. » → a-justifier [justification-absente] : La nullité se démontre : quelle propriété des opérateurs linéaires empêche une borne indépendante du point ?

Retraits :
- `h-lin` (nécessaire) : Sans linéarité, l'homogénéité disparaît : (Q) n'entraîne plus la nullité. — Contre-exemple : $T(x)=\sin x$ sur $\mathbb R$ est bornée par $1$, donc vérifie (Q), et n'est pas nulle.

Calculs fermés : [{"kind":"choice","prompt":"Laquelle de ces assertions est la conclusion de Banach–Steinhaus, et non son hypothèse ?","options":["$\\forall x\\in X,\\ \\exists C_x\\ge 0,\\ \\forall i\\in I,\\ \\|T_ix\\|_Y\\le C_x$","$\\exists C\\ge 0,\\ \\forall i\\in I,\\ \\forall x\\in X,\\ \\|T_ix\\|_Y\\le C\\|x\\|_X$","$\\forall x\\in X,\\ \\forall i\\in I,\\ \\exists C\\ge 0,\\ \\|T_ix\\|_Y\\le C$"],"correct":[1],"explanation":"La seconde écriture signifie exactement $\\sup_i\\|T_i\\|_{\\mathcal L(X,Y)}<\\infty$, conclusion du théorème."}]

Solution :
**Écriture exacte.** Pour $x\in X$, posons $S_x=\{\|T_ix\|_Y : i\in I\}$, partie non vide de $[0,+\infty[$. Le nombre $\sup S_x$ est fini si et seulement si $S_x$ est majorée, c'est-à-dire s'il existe $C_x\ge 0$ tel que $\|T_ix\|_Y\le C_x$ pour tout $i\in I$. Donc (P) s'écrit
$$\forall x\in X,\ \exists C_x\ge 0,\ \forall i\in I,\ \|T_ix\|_Y\le C_x.$$
La constante dépend de $x$, pas de $i$.

**(Q) force $T_i=0$.** Si (Q) a lieu avec la constante $C$, alors pour $i\in I$, $x\in X$ et $\lambda>0$, la linéarité de $T_i$ et (Q) au point $\lambda x$ donnent $\lambda\|T_ix\|_Y=\|T_i(\lambda x)\|_Y\le C$, donc $\|T_ix\|_Y\le C/\lambda$. Pour $\lambda\to+\infty$, on obtient $T_ix=0$. Pour $X=Y=\mathbb R$ et $T_1=\mathrm{Id}$, (P) est vraie avec $C_x=|x|$ et $T_1\neq 0$ : (Q) est fausse. Ainsi (Q) entraîne (P) (prendre $C_x=C$), mais (P) n'entraîne pas (Q).

**(R) est toujours vraie.** Pour $x$ et $i$ donnés, $C=\|T_ix\|_Y$ convient. Pour $X=Y=\mathbb R$ et $T_nx=nx$, (R) a lieu, mais (P) échoue en $x=1$, car $\sup_nn=+\infty$. Ainsi (P) entraîne (R), mais (R) n'entraîne pas (P).

Indices :
1. De quoi la constante de (P) a-t-elle le droit de dépendre ? De $x$ seulement, de $i$ seulement, des deux ou d'aucun ?
2. Pour la formule exacte, traduis « $\sup S_x<\infty$ ». Pour (Q), applique l'hypothèse au point $\lambda x$ et fais varier $\lambda$.
3. Sous (Q), on a $\lambda\|T_ix\|\le C$ pour tout $\lambda>0$ : divise par $\lambda$, puis fais tendre $\lambda$ vers $+\infty$. (R) se vérifie avec $C=\|T_ix\|_Y$.

Erreurs fréquentes :
- Écrire $\exists C\,\forall x\,\forall i$ à la place de $\forall x\,\exists C_x\,\forall i$.
- Confondre l'hypothèse ponctuelle (P) avec la borne uniforme $\sup_i\|T_i\|<\infty$.
- Déclarer la nullité sous (Q) sans invoquer l'homogénéité.

Variante : Soient $X,Y$ deux espaces normés, $I$ un ensemble non vide et $(T_i)_{i\in I}\subset\mathcal L(X,Y)$. Écrire la négation de (P) avec des quantificateurs, puis l'établir pour la famille $T_n:\mathbb R\to\mathbb R$, $T_nx=nx$, $n\in\mathbb N^*$.

Solution de la variante : La négation de (P) s'écrit : $\exists x\in X,\ \forall C\ge 0,\ \exists i\in I,\ \|T_ix\|_Y>C$. Pour $X=\mathbb R$, $T_nx=nx$, le point $x=1$ convient : pour $C\ge 0$ donné, l'entier $n=\lfloor C\rfloor+1$ vérifie $T_n1=n>C$.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `banach-steinhaus.intermediaire` : Une suite simplement convergente est bornée en norme

Énoncé : Soient $X$ un espace de Banach, $Y$ un espace normé et $(T_n)_{n\in\mathbb N}\subset\mathcal L(X,Y)$. On suppose que, pour tout $x\in X$, la suite $(T_nx)_n$ converge dans $Y$. Montrer que $\sup_{n}\|T_n\|_{\mathcal L(X,Y)}<\infty$.
Source : {"doc":"polycopie","pdfPage":39,"label":"Annexe B, exercice 5, intermédiaire"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-banach` (hypothese) : $X$ est un espace de Banach.
- `h-Y` (hypothese) : $Y$ est un espace normé.
- `h-Tn` (hypothese) : $(T_n)_{n\in\mathbb N}\subset\mathcal L(X,Y)$.
- `h-conv` (hypothese) : Pour tout $x\in X$, la suite $(T_nx)_n$ converge dans $Y$.
- `d-x` (definition, locale) : Soit $x\in X$ ; on note $y_x$ la limite de $(T_nx)_n$ dans $Y$.
- `s-rang` (consequence) : Il existe $N_x\in\mathbb N$ tel que $\|T_nx-y_x\|_Y\le 1$ pour tout $n\ge N_x$.
- `s-queue` (inegalite) : $\|T_nx\|_Y\le\|y_x\|_Y+1$ pour tout $n\ge N_x$.
- `s-Cx` (inegalite) : Pour tout $n$ : $\|T_nx\|_Y\le C_x:=\max\big(\|T_0x\|_Y,\dots,\|T_{N_x}x\|_Y,\ \|y_x\|_Y+1\big)$.
- `c-K` (consequence) : $K_x=\{T_nx : n\in\mathbb N\}\cup\{y_x\}$ est compact dans $Y$.
- `c-borne` (consequence) : Il existe $C_x\ge 0$ tel que $\|T_nx\|_Y\le C_x$ pour tout $n$.
- `ponctuel` (consequence) : Pour tout $x\in X$ : $\sup_{n}\|T_nx\|_Y<\infty$.
- `bs` (application-theoreme) : $\sup_{n}\|T_n\|_{\mathcal L(X,Y)}<\infty$ par le théorème de Banach–Steinhaus.
- `fin` (conclusion) : La suite $(T_n)_n$ est bornée dans $\mathcal L(X,Y)$.
- `x-conv-norme` (consequence, DISTRACTEUR) : La suite $(T_n)_n$ converge dans $\mathcal L(X,Y)$ pour la norme d'opérateur.
- `x-unif-x` (inegalite, DISTRACTEUR) : Il existe $C\ge 0$ tel que $\|T_nx\|_Y\le C$ pour tous $n\in\mathbb N$ et $x\in X$.
- `x-Y-complet` (consequence, DISTRACTEUR) : $Y$ est complet, comme l'exige le théorème de Banach–Steinhaus.

Règles :
- `d-x` + `h-conv` ⟹ `s-rang` par « Définition de la limite, avec le seuil $\varepsilon=1$. » (chemin rang)
- `s-rang` + `h-Y` ⟹ `s-queue` par « Inégalité triangulaire dans $Y$. » (chemin rang)
- `s-queue` ⟹ `s-Cx` par « Un maximum d'un nombre fini de réels majore les premiers termes ; la queue est déjà majorée. » (chemin rang)
- `s-Cx` ⟹ `ponctuel` par « $x$ était quelconque ; la borne obtenue ne dépend que de $x$. » (chemin rang)
- `d-x` + `h-conv` ⟹ `c-K` par « Une suite convergente et sa limite forment un compact. » (chemin compact)
- `c-K` + `h-Y` ⟹ `c-borne` par « Un compact d’un espace normé est borné. » (chemin compact)
- `c-borne` ⟹ `ponctuel` par « $x$ était quelconque ; la borne obtenue ne dépend que de $x$. » (chemin compact)
- `h-banach` + `h-Y` + `h-Tn` + `ponctuel` ⟹ `bs` par « Théorème de Banach–Steinhaus. [banach-steinhaus] »
- `bs` ⟹ `fin` par « Définition d’une suite bornée dans un espace normé. »

Justifications sans règle (séduisantes ou fausses) : « La suite $(T_n)_n$ converge pour la norme de $\mathcal L(X,Y)$, donc y est bornée. » ; « Une borne supérieure de nombres finis est finie. » ; « C’est évident. »

Pièges :
- `x-conv-norme` → incorrect [banach-steinhaus-convergence-simple] : La convergence de $(T_nx)_n$ pour chaque $x$ est une convergence simple : elle n'entraîne pas la convergence pour la norme d'opérateur. — Contre-exemple : $X=Y=\ell^2$ et $T_n$ la projection orthogonale sur les $n$ premières coordonnées : $T_nx\to x$ pour tout $x$, mais $\|T_{n+1}-T_n\|=1$ pour tout $n$.
- `x-unif-x` → incorrect [quantificateurs] : La borne $C_x$ dépend de $x$ par construction : rien ne permet de la rendre indépendante de $x$, et c'est même impossible en général. — Contre-exemple : $T_n=\mathrm{Id}$ sur $\mathbb R$ : la suite converge pour tout $x$, mais $|T_nx|=|x|$ n'est pas borné en $x$.
- `x-Y-complet` → incorrect [hypotheses-theoreme] : La complétude exigée porte sur $X$, l'espace de départ. Le théorème n'utilise de $Y$ que sa norme : $Y$ est seulement normé.
- `bs` par « La suite $(T_n)_n$ converge pour la norme de $\mathcal L(X,Y)$, donc y est bornée. » → incorrect [banach-steinhaus-convergence-simple] : Cette justification suppose une convergence pour la norme d'opérateur, qui n'est pas donnée et peut être fausse. — Contre-exemple : $X=Y=\ell^2$, $T_n$ projection orthogonale sur les $n$ premières coordonnées : $\|T_{n+1}-T_n\|=1$.
- `bs` par « Une borne supérieure de nombres finis est finie. » → incorrect [quantificateurs] : Chaque borne $\sup_n\|T_nx\|_Y$ est finie, mais la borne supérieure de ces nombres sur la boule unité peut être infinie : le théorème, avec la complétude de $X$, est précisément ce qui l'exclut. — Contre-exemple : Sur $X=c_{00}$ muni de $\|\cdot\|_\infty$ et $T_nx=nx_n$, chaque $\sup_n|T_nx|$ est fini, et $\sup_n\|T_n\|=+\infty$.
- `ponctuel` par « C’est évident. » → a-justifier [justification-absente] : Une borne pour chaque point se démontre : d’où vient-elle, et de quoi dépend-elle ?

Retraits :
- `h-banach` (nécessaire) : Le théorème de Banach–Steinhaus ne peut plus être invoqué, et la conclusion peut être fausse. — Contre-exemple : $X=c_{00}$ muni de $\|\cdot\|_\infty$ et $T_nx=nx_n$ : $T_nx\to 0$ pour tout $x$ (à support fini), mais $\|T_n\|=n$.
- `h-conv` (nécessaire) : Sans convergence, aucune borne ponctuelle n’est disponible. — Contre-exemple : $X=Y=\mathbb R$, $T_nx=nx$ : $(T_n1)_n$ diverge et $\|T_n\|=n$.

Calculs fermés : [{"kind":"rational","prompt":"Pour $T_n$ projection orthogonale de $\\ell^2$ sur les $n$ premières coordonnées, valeur de $\\|T_{n+1}-T_n\\|$","expected":"1"}]

Solution :
Soit $x\in X$. Comme $(T_nx)_n$ converge vers $y_x$ dans $Y$, il existe $N_x$ tel que $\|T_nx-y_x\|_Y\le 1$ pour $n\ge N_x$, donc $\|T_nx\|_Y\le\|y_x\|_Y+1$ pour $n\ge N_x$. Par suite, $\sup_n\|T_nx\|_Y\le\max(\|T_0x\|_Y,\dots,\|T_{N_x}x\|_Y,\|y_x\|_Y+1)<\infty$. Cette borne dépend de $x$ ; cela vaut pour tout $x\in X$.

L'espace $X$ étant de Banach et $Y$ normé, le théorème de Banach–Steinhaus s'applique à la famille $(T_n)_n$ : $\sup_n\|T_n\|_{\mathcal L(X,Y)}<\infty$.

**Remarques.** La convergence considérée est simple : elle n'entraîne pas la convergence en norme d'opérateur, comme le montrent les projections orthogonales de $\ell^2$ sur les $n$ premières coordonnées. La complétude porte sur $X$ seul : sur $c_{00}$ muni de $\|\cdot\|_\infty$, les formes $T_nx=nx_n$ convergent simplement vers $0$, et $\|T_n\|=n$.

Indices :
1. Le théorème réclame, pour chaque $x$ fixé, une borne de la suite $(\|T_nx\|_Y)_n$. La convergence en fournit-elle une ?
2. Une suite convergente d'un espace normé est bornée. Vérifie ensuite toutes les hypothèses de Banach–Steinhaus, sans oublier la complétude de $X$.
3. Prends le seuil $\varepsilon=1$ dans la définition de la limite, puis un maximum fini pour les premiers termes. Attention : la borne obtenue dépend de $x$.

Erreurs fréquentes :
- Déduire la convergence de $(T_n)_n$ pour la norme d'opérateur à partir de la convergence simple.
- Écrire une borne de $\|T_nx\|_Y$ indépendante de $x$.
- Exiger la complétude de $Y$ au lieu de celle de $X$.

Variante : Soient $X$ un espace de Banach, $Y$ un espace normé et $(T_n)_{n\in\mathbb N}\subset\mathcal L(X,Y)$ tels que, pour tout $x\in X$, $T_nx\to Tx$ dans $Y$. Montrer que $T$ est linéaire continu et que $\|T\|\le\liminf_n\|T_n\|$.

Solution de la variante : Pour $x,x'\in X$ et $\lambda$ réel, $T(\lambda x+x')=\lim_nT_n(\lambda x+x')=\lambda Tx+Tx'$ : $T$ est linéaire. Par l'exercice, $\sup_n\|T_n\|<\infty$, donc $\liminf_n\|T_n\|<\infty$. Pour $x\in X$, la continuité de la norme donne $\|Tx\|_Y=\lim_n\|T_nx\|_Y\le\liminf_n\big(\|T_n\|\,\|x\|_X\big)=\big(\liminf_n\|T_n\|\big)\|x\|_X$. Donc $T\in\mathcal L(X,Y)$ et $\|T\|\le\liminf_n\|T_n\|$.

Vérification : {"origin":"complement","review":"machine"}

## Exercice difficile `banach-steinhaus.difficile` : Pourquoi la complétude est indispensable : un contre-exemple sur $c_{00}$

Énoncé : Soit $X=c_{00}$ l'espace des suites réelles $x=(x_k)_{k\ge 1}$ à support fini, muni de la norme $\|x\|_\infty=\max_k|x_k|$, et soit $T_n:X\to\mathbb R$ défini par $T_nx=nx_n$ pour $n\ge 1$. Montrer que chaque $T_n$ est continu, que $\sup_n|T_nx|<\infty$ pour tout $x\in X$, que $\sup_n\|T_n\|=+\infty$ et que $X$ n'est pas complet. Identifier précisément l'étape de la preuve de Banach–Steinhaus qui tombe en défaut.
Source : {"doc":"polycopie","pdfPage":39,"label":"Annexe B, exercice 5, difficile"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `d-X` (definition) : $X=c_{00}$ est l'espace des suites réelles à support fini, muni de $\|x\|_\infty=\max_k|x_k|$.
- `d-Tn` (definition) : Pour $n\ge 1$ : $T_n:X\to\mathbb R$, $T_nx=nx_n$.
- `d-en` (definition) : Pour $n\ge 1$ : $e_n$ est la suite valant $1$ en position $n$ et $0$ ailleurs.
- `d-Fm` (definition) : Pour $m\in\mathbb N$ : $F_m=\{x\in X : \sup_{n\ge 1}|T_nx|\le m\}$.
- `d-x` (definition, locale) : Soit $x\in X$, nul au-delà du rang $N_x\ge 1$.
- `d-bou` (definition, locale) : Soient $m\in\mathbb N$, $a\in X$ nul au-delà du rang $N_a$ et $r>0$ ; on choisit $n>N_a$ tel que $nr/2>m$, et on pose $z=a+\tfrac r2e_n$.
- `t-lip` (inegalite) : $T_n$ est linéaire et $|T_nx|\le n\|x\|_\infty$ pour tout $x\in X$ : $T_n\in\mathcal L(X,\mathbb R)$.
- `t-norme` (egalite, calcul expr-equiv) : $\|T_n\|=n$.
  - valeur attendue : "n"
- `t-sup` (consequence) : $\sup_{n\ge 1}\|T_n\|=+\infty$.
- `p-nul` (egalite) : $T_nx=0$ pour tout $n>N_x$.
- `p-borne` (inegalite) : $\sup_{n\ge 1}|T_nx|=\max_{1\le k\le N_x}k|x_k|<\infty$.
- `p-ponct` (consequence) : Pour tout $x\in X$ : $\sup_{n\ge 1}|T_nx|<\infty$.
- `n-cauchy` (consequence) : La suite $x^{(N)}=(1,\tfrac12,\dots,\tfrac1N,0,0,\dots)$ de $X$ est de Cauchy pour $\|\cdot\|_\infty$.
- `n-lim` (consequence) : Si $(x^{(N)})_N$ convergeait vers un élément $y$ de $X$, on aurait $y_k=1/k$ pour tout $k\ge 1$, ce qui contredit le support fini de $y$.
- `non-complet` (consequence) : $(X,\|\cdot\|_\infty)$ n'est pas complet.
- `f-ferme` (consequence) : Chaque $F_m$ est fermé dans $X$.
- `f-recouvre` (consequence) : $X=\bigcup_{m\in\mathbb N}F_m$.
- `f-point` (inegalite) : $\|z-a\|_\infty=r/2<r$ et $|T_nz|=nr/2>m$.
- `f-interieur` (consequence) : Chaque $F_m$ est d'intérieur vide dans $X$.
- `echec` (consequence) : Les $F_m$ sont fermés et recouvrent $X$, sans qu'aucun soit d'intérieur non vide : c'est l'étape de Baire de la preuve de Banach–Steinhaus qui tombe en défaut.
- `fin` (conclusion) : Les $T_n$ sont continus, la famille est ponctuellement bornée, $\sup_n\|T_n\|=+\infty$, $X$ n'est pas complet, et l'étape de Baire est celle qui échoue.
- `x-baire` (consequence, DISTRACTEUR) : Par le théorème de Baire, il existe $m\in\mathbb N$ tel que $F_m$ est d'intérieur non vide.
- `x-complet` (consequence, DISTRACTEUR) : $(X,\|\cdot\|_\infty)$ est complet, car $\mathbb R$ l'est.
- `x-sup-fini` (consequence, DISTRACTEUR) : $\sup_{n\ge 1}\|T_n\|<\infty$.

Règles :
- `d-X` + `d-Tn` ⟹ `t-lip` par « Linéarité de la coordonnée, et $|x_n|\le\|x\|_\infty$ par définition de la norme. »
- `t-lip` + `d-en` + `d-Tn` ⟹ `t-norme` par « Majoration d'une part ; test sur $e_n$ d'autre part, avec $\|e_n\|_\infty=1$ et $T_ne_n=n$. »
- `t-norme` ⟹ `t-sup` par « $\sup_{n\ge 1}n=+\infty$. »
- `d-x` + `d-Tn` ⟹ `p-nul` par « Le support de $x$ ne dépasse pas le rang $N_x$. »
- `p-nul` ⟹ `p-borne` par « Pour $n>N_x$ le terme est nul : le supremum est un maximum fini. »
- `p-borne` ⟹ `p-ponct` par « $x$ était quelconque dans $X$. »
- `d-X` ⟹ `n-cauchy` par « Pour $N<M$ : $\|x^{(M)}-x^{(N)}\|_\infty=\tfrac1{N+1}$. » (chemin suite)
- `n-cauchy` + `d-X` ⟹ `n-lim` par « La convergence dans la norme uniforme entraîne la convergence de chaque coordonnée. » (chemin suite)
- `n-cauchy` + `n-lim` ⟹ `non-complet` par « Une suite de Cauchy sans limite empêche la complétude. » (chemin suite)
- `t-lip` + `p-ponct` + `t-sup` ⟹ `non-complet` par « Contraposée de Banach–Steinhaus. [banach-steinhaus] » (chemin bs)
- `echec` ⟹ `non-complet` par « Contraposée du théorème de Baire. [baire] » (chemin baire)
- `d-Fm` + `t-lip` ⟹ `f-ferme` par « Intersection des fermés $\{x:|T_nx|\le m\}$, images réciproques de $[-m,m]$ par les $T_n$ continues. »
- `d-Fm` + `p-ponct` ⟹ `f-recouvre` par « Pour chaque $x$, choisir un entier $m\ge\sup_n|T_nx|$. »
- `d-bou` + `d-Tn` + `d-en` ⟹ `f-point` par « La $n$-ième coordonnée de $a$ est nulle, car $n>N_a$. »
- `f-point` + `d-Fm` ⟹ `f-interieur` par « $B(a,r)$ contient toujours un point hors de $F_m$, pour $a$, $r$ et $m$ quelconques. »
- `f-ferme` + `f-recouvre` + `f-interieur` ⟹ `echec` par « Comparaison avec la preuve de Banach–Steinhaus, qui choisit un fermé d’intérieur non vide. »
- `t-lip` + `p-ponct` + `t-sup` + `non-complet` + `echec` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « Le théorème de Banach–Steinhaus s’applique à tout espace normé. » ; « Le théorème de Baire s’applique dans tout espace métrique. » ; « Une suite de Cauchy de $X$ converge coordonnée par coordonnée, donc elle converge dans $X$. »

Pièges :
- `x-baire` par « Le théorème de Baire s’applique dans tout espace métrique. » → incorrect [complet-necessaire] : Le théorème de Baire exige un espace complet : il ne s'applique pas ici, précisément parce que $X$ n'est pas complet.
- `x-baire` → incorrect [complet-necessaire] : Tous les $F_m$ sont au contraire d'intérieur vide. Le théorème de Baire supposerait $X$ complet. — Contre-exemple : Pour $a\in X$ nul au-delà de $N_a$, $r>0$, et $n>N_a$ tel que $nr/2>m$, le point $z=a+\tfrac r2e_n$ est dans $B(a,r)$ mais pas dans $F_m$.
- `x-complet` par « Une suite de Cauchy de $X$ converge coordonnée par coordonnée, donc elle converge dans $X$. » → incorrect [complet-necessaire] : La convergence coordonnée par coordonnée fournit bien une suite limite, mais cette limite peut ne pas être à support fini : elle n'appartient pas forcément à $X$. — Contre-exemple : $x^{(N)}=(1,\tfrac12,\dots,\tfrac1N,0,\dots)$ converge coordonnée par coordonnée vers $(1/k)_k\notin c_{00}$.
- `x-complet` → incorrect [complet-necessaire] : La complétude de $\mathbb R$ ne se transmet pas à $c_{00}$ : la limite d'une suite de Cauchy peut sortir de $c_{00}$. — Contre-exemple : $x^{(N)}=(1,\tfrac12,\dots,\tfrac1N,0,\dots)$ est de Cauchy, sans limite dans $c_{00}$.
- `x-sup-fini` par « Le théorème de Banach–Steinhaus s’applique à tout espace normé. » → incorrect [hypotheses-theoreme] : Le théorème exige la complétude de $X$ : il ne s'applique pas à $c_{00}$ muni de $\|\cdot\|_\infty$.
- `x-sup-fini` → incorrect [hypotheses-theoreme] : Une telle borne contredirait $\|T_n\|=n$ : la conclusion du théorème n'est garantie que sur un espace complet. — Contre-exemple : $\|T_n\|=n\to+\infty$, car $T_ne_n=n$ et $\|e_n\|_\infty=1$.
- `non-complet` par « Le théorème de Banach–Steinhaus s’applique à tout espace normé. » → incorrect [hypotheses-theoreme] : Cette version du théorème est fausse : la complétude de l’espace de départ est indispensable, c’est précisément ce que montre cet exemple.

Retraits :
- `d-X` (nécessaire) : Le contre-exemple dépend de la norme, et pas seulement de l’absence de complétude. — Contre-exemple : Pour la norme $\|x\|_w=\sup_kk|x_k|$ sur $c_{00}$, on a $|T_nx|\le\|x\|_w$ : la famille est uniformément bornée, avec $\|T_n\|=1$, alors que $(c_{00},\|\cdot\|_w)$ n'est pas complet non plus.
- `d-Tn` (nécessaire) : Sans la croissance des normes, la famille est uniformément bornée : le défaut de complétude rend le théorème inapplicable, mais ne contredit pas sa conclusion pour toute famille. — Contre-exemple : Pour $S_nx=x_n$ sur $c_{00}$, on a $\|S_n\|=1$ pour tout $n$.

Calculs fermés : [{"kind":"rational","prompt":"Pour $x=(3,-1,2,0,0,\\dots)\\in c_{00}$, valeur de $\\sup_{n}|T_nx|$","expected":"6"}]

Solution :
**Continuité.** $T_n$ est linéaire et $|T_nx|=n|x_n|\le n\|x\|_\infty$ ; de plus $T_ne_n=n$ et $\|e_n\|_\infty=1$, donc $\|T_n\|=n$.

**Bornitude ponctuelle.** Si $x$ est nul au-delà du rang $N_x$, alors $T_nx=0$ pour $n>N_x$, donc $\sup_n|T_nx|=\max_{k\le N_x}k|x_k|<\infty$.

**Absence de borne uniforme.** $\sup_n\|T_n\|=\sup_nn=+\infty$.

**Non-complétude.** La suite $x^{(N)}=(1,\tfrac12,\dots,\tfrac1N,0,\dots)$ est de Cauchy, car $\|x^{(M)}-x^{(N)}\|_\infty=\tfrac1{N+1}$ pour $M>N$. Si elle convergeait vers $y\in X$, on aurait, coordonnée par coordonnée, $y_k=1/k$ pour tout $k$, donc $y$ ne serait pas à support fini. On peut aussi conclure par contraposée de Banach–Steinhaus.

**Où la preuve échoue.** Les ensembles $F_m=\{x:\sup_n|T_nx|\le m\}$ sont fermés et recouvrent $X$, comme dans la preuve. Mais chaque $F_m$ est d'intérieur vide : si $a\in X$ est nul au-delà de $N_a$ et si $r>0$, on choisit $n>N_a$ tel que $nr/2>m$ et $z=a+\tfrac r2e_n$ ; alors $\|z-a\|_\infty=r/2<r$ et $|T_nz|=nr/2>m$. Ainsi $X$ est réunion dénombrable de fermés d'intérieur vide : c'est l'étape « Baire donne un $F_m$ d'intérieur non vide » qui tombe en défaut, ce qui est possible parce que $X$ n'est pas complet.

**Remarque.** Le contre-exemple dépend de la norme : pour $\|x\|_w=\sup_kk|x_k|$, on a $\|T_n\|\le 1$, bien que $(c_{00},\|\cdot\|_w)$ ne soit pas complet non plus.

Indices :
1. Quelle propriété de $X$ manque par rapport à l'énoncé de Banach–Steinhaus, et à quel moment de la preuve de ce théorème sert-elle ?
2. Calcule d'abord la norme de $T_n$ et la bornitude ponctuelle grâce au support fini. Reprends ensuite les ensembles $F_m$ de la preuve : qu'est-ce qui les empêche d'être d'intérieur non vide ?
3. Autour d'un point $a$ à support fini, ajoute $\tfrac r2e_n$ avec $n$ grand et au-delà du support de $a$ : $T_n$ y prend la valeur $nr/2$, arbitrairement grande.

Erreurs fréquentes :
- Appliquer Baire sans vérifier la complétude.
- Confondre convergence coordonnée par coordonnée et convergence dans $c_{00}$.
- Conclure à une borne uniforme à partir de la seule bornitude ponctuelle.

Variante : Démontrer le théorème de Banach–Steinhaus à partir du théorème de Baire : si $X$ est un espace de Banach, $Y$ un espace normé et si $(T_i)_{i\in I}\subset\mathcal L(X,Y)$ vérifie $\sup_{i\in I}\|T_ix\|_Y<\infty$ pour chaque $x\in X$, alors $\sup_{i\in I}\|T_i\|_{\mathcal L(X,Y)}<\infty$.

Solution de la variante : Pour $m\in\mathbb N$, posons $F_m=\{x\in X:\|T_ix\|_Y\le m\ \forall i\in I\}$. Chaque $F_m$ est fermé, comme intersection des fermés $\{x:\|T_ix\|_Y\le m\}$, images réciproques de $[0,m]$ par les applications continues $x\mapsto\|T_ix\|_Y$. L'hypothèse donne $X=\bigcup_{m\in\mathbb N}F_m$ : pour $x\in X$, on choisit un entier $m\ge\sup_i\|T_ix\|_Y$.

Comme $X$ est complet et non vide, le théorème de Baire fournit $m_0\in\mathbb N$, $a\in X$ et $r>0$ tels que $\overline B(a,r)\subset F_{m_0}$. Pour $\|z\|_X\le r$ et $i\in I$, les points $a$ et $a+z$ sont dans $\overline B(a,r)$, donc $\|T_iz\|_Y\le\|T_i(a+z)\|_Y+\|T_ia\|_Y\le 2m_0$.

Pour $x\neq 0$ et $i\in I$, posons $z=rx/\|x\|_X$, de norme $r$. L'homogénéité donne $\|T_ix\|_Y=\frac{\|x\|_X}{r}\|T_iz\|_Y\le\frac{2m_0}{r}\|x\|_X$. Ainsi $\|T_i\|_{\mathcal L(X,Y)}\le 2m_0/r$ pour tout $i\in I$, et cette borne ne dépend pas de $i$.

Graphe de la variante :
But : `fin` — usage : demonstration

Nœuds :
- `h-banach` (hypothese) : $X$ est un espace de Banach.
- `h-Y` (hypothese) : $Y$ est un espace normé.
- `h-Ti` (hypothese) : $(T_i)_{i\in I}\subset\mathcal L(X,Y)$.
- `h-ponct` (hypothese) : Pour chaque $x\in X$ : $\sup_{i\in I}\|T_ix\|_Y<\infty$.
- `d-Fm` (definition) : Pour $m\in\mathbb N$ : $F_m=\{x\in X : \|T_ix\|_Y\le m\ \ \forall i\in I\}$.
- `d-z` (definition, locale) : Soient $i\in I$ et $z\in X$ tels que $\|z\|_X\le r$.
- `d-x` (definition, locale) : Soient $i\in I$ et $x\in X\setminus\{0\}$ ; on pose $z=rx/\|x\|_X$.
- `f-ferme` (consequence) : Chaque $F_m$ est fermé dans $X$.
- `f-recouvre` (consequence) : $X=\bigcup_{m\in\mathbb N}F_m$.
- `baire` (application-theoreme) : Il existe $m_0\in\mathbb N$, $a\in X$ et $r>0$ tels que $\overline B(a,r)\subset F_{m_0}$.
- `l-borne` (inegalite) : $\|T_iz\|_Y\le\|T_i(a+z)\|_Y+\|T_ia\|_Y\le 2m_0$.
- `h-homog` (inegalite) : $\|T_ix\|_Y=\frac{\|x\|_X}{r}\|T_iz\|_Y\le\frac{2m_0}{r}\|x\|_X$.
- `unif` (inegalite) : $\|T_i\|_{\mathcal L(X,Y)}\le 2m_0/r$ pour tout $i\in I$.
- `fin` (conclusion) : $\sup_{i\in I}\|T_i\|_{\mathcal L(X,Y)}<\infty$.
- `x-Fm-ouvert` (consequence, DISTRACTEUR) : Chaque $F_m$ est ouvert dans $X$.
- `x-tous-int` (consequence, DISTRACTEUR) : Pour tout $m\in\mathbb N$, $F_m$ est d'intérieur non vide.
- `x-Ta` (inegalite, DISTRACTEUR) : $\|T_iz\|_Y\le\|T_i(a+z)\|_Y$.

Règles :
- `h-Ti` + `h-Y` + `d-Fm` ⟹ `f-ferme` par « $F_m$ est une intersection de fermés, images réciproques de $[0,m]$ par les applications continues $x\mapsto\|T_ix\|_Y$. »
- `h-ponct` + `d-Fm` ⟹ `f-recouvre` par « Pour $x\in X$, choisir un entier $m\ge\sup_i\|T_ix\|_Y$. »
- `h-banach` + `f-ferme` + `f-recouvre` ⟹ `baire` par « Théorème de Baire dans l’espace complet non vide $X$. [baire] »
- `baire` + `d-z` + `h-Ti` ⟹ `l-borne` par « $a$ et $a+z$ appartiennent à $\overline B(a,r)$, et $T_iz=T_i(a+z)-T_ia$ par linéarité. »
- `l-borne` + `d-x` + `h-Ti` ⟹ `h-homog` par « Homogénéité de $T_i$ et de la norme, avec $\|z\|_X=r$. »
- `h-homog` ⟹ `unif` par « Définition de la norme d’opérateur. »
- `unif` ⟹ `fin` par « La borne $2m_0/r$ ne dépend pas de $i$. »

Justifications sans règle (séduisantes ou fausses) : « Une borne supérieure de nombres finis est finie. » ; « Le théorème de Baire s’applique dans tout espace métrique. »

Pièges :
- `x-Fm-ouvert` → incorrect [fermeture-espace] : $F_m$ est défini par des inégalités larges : il est fermé, et n'a aucune raison d'être ouvert. — Contre-exemple : $X=Y=\mathbb R$, $T_1=\mathrm{Id}$ : $F_1=[-1,1]$ n'est pas ouvert.
- `x-tous-int` → incorrect [quantificateurs] : Baire fournit l'existence d'un fermé d'intérieur non vide parmi les $F_m$, pas la propriété pour chacun. — Contre-exemple : $X=Y=\mathbb R$, $T_1=\mathrm{Id}$ : $F_0=\{0\}$ est d'intérieur vide.
- `x-Ta` → incorrect [justification-absente] : L'inégalité triangulaire appliquée à $T_iz=T_i(a+z)-T_ia$ fait intervenir les deux termes $\|T_i(a+z)\|_Y$ et $\|T_ia\|_Y$. — Contre-exemple : $X=Y=\mathbb R$, $T_1=\mathrm{Id}$, $a=1$, $z=-1$ : $|T_1z|=1$, alors que $|T_1(a+z)|=0$.
- `unif` par « Une borne supérieure de nombres finis est finie. » → incorrect [quantificateurs] : Une borne supérieure de nombres finis peut être infinie : c'est précisément pour éviter cet écueil que l'on passe par une borne $2m_0/r$ indépendante de $i$. — Contre-exemple : $\sup_{k\ge 1}k=+\infty$.
- `baire` par « Le théorème de Baire s’applique dans tout espace métrique. » → incorrect [complet-necessaire] : Baire exige un espace complet : sur $c_{00}$ muni de $\|\cdot\|_\infty$, les fermés $F_m$ associés à $T_nx=nx_n$ recouvrent l'espace et sont tous d'intérieur vide.

Retraits :
- `h-banach` (nécessaire) : Sans complétude, le théorème de Baire ne s’applique pas : aucun fermé d’intérieur non vide n’est garanti. — Contre-exemple : $X=c_{00}$ muni de $\|\cdot\|_\infty$ et $T_nx=nx_n$ : la famille est ponctuellement bornée, et $\|T_n\|=n$.
- `h-ponct` (nécessaire) : Les $F_m$ peuvent alors ne plus recouvrir $X$. — Contre-exemple : $T_nx=nx$ sur $\mathbb R$ : seul $x=0$ appartient à $\bigcup_mF_m$, et $\|T_n\|=n$.
- `h-Ti` (nécessaire) : Sans continuité, les $F_m$ peuvent ne plus être fermés, et la conclusion cesse d'avoir un sens : un opérateur non continu est de norme infinie. — Contre-exemple : Soit $T$ une forme linéaire non continue sur un espace de Banach de dimension infinie (construite à l'aide d'une base algébrique) : la famille $\{T\}$ vérifie l'hypothèse ponctuelle, et $\|T\|=+\infty$.

Vérification : {"origin":"complement","review":"machine"}