# 6. Application ouverte (`application-ouverte`) — polycopié p. PDF 9, section 2.2

## Fiche

Espaces : $X,Y$ : espaces de Banach, de normes $\|\cdot\|_X$ et $\|\cdot\|_Y$ ; $B_X(x,r)$ et $B_Y(y,r)$ désignent les boules ouvertes. | $\mathcal L(X,Y)$ : applications linéaires continues de $X$ dans $Y$. | $T$ est ouverte lorsque l'image par $T$ de tout ouvert de $X$ est un ouvert de $Y$.

Hypothèses :
- $X$ est complet. — Sans elle : Soient $E$ un espace de Banach de dimension infinie, $\varphi$ une forme linéaire non continue sur $E$ (construite à l'aide d'une base algébrique) et $\|x\|'=\|x\|+|\varphi(x)|$. L'identité $(E,\|\cdot\|')\to(E,\|\cdot\|)$ est une bijection linéaire continue dont l'inverse n'est pas continu : $(E,\|\cdot\|')$ n'est pas complet.
- $Y$ est complet. — Sans elle : $J=\mathrm{Id}:(C([0,1]),\|\cdot\|_\infty)\to(C([0,1]),\|\cdot\|_1)$ est linéaire, bijective et continue ; pour $f_n(x)=x^n$, $\|f_n\|_\infty=1$ et $\|f_n\|_1=\frac1{n+1}$, donc $J^{-1}$ n'est pas continue.
- $T\in\mathcal L(X,Y)$.
- $T$ est surjectif. — Sans elle : $T:\mathbb R^2\to\mathbb R^2$, $T(a,b)=(a,0)$ : l'image du disque unité ouvert est $]-1,1[\times\{0\}$, qui n'est pas ouvert dans $\mathbb R^2$.

Énoncé : Si $X,Y$ sont des espaces de Banach et si $T\in\mathcal L(X,Y)$ est surjectif, alors $T$ est ouverte. Si $T$ est en outre injectif, alors $T^{-1}\in\mathcal L(Y,X)$.

Bilan : {"stabilite":"Pour une bijection $T\\in\\mathcal L(X,Y)$ entre Banach : $\\|u\\|_X\\le\\|T^{-1}\\|\\,\\|Tu\\|_Y$, donc la solution de $Tu=f$ dépend continûment de $f$.","autre":"$T$ est ouverte ; de façon équivalente, il existe $\\delta>0$ tel que $B_Y(0,\\delta)\\subset T\\big(B_X(0,1)\\big)$."}

Preuve dans le polycopié : idee

Plan :
1. Baire : $T$ étant surjectif, $Y=\bigcup_{n\ge 1}n\,\overline{T(B_X(0,1))}$ ; $Y$ étant complet, l'un de ces fermés est d'intérieur non vide, donc $\overline{T(B_X(0,1))}$ contient une boule $B_Y(y_0,\rho)$.
2. Convexité et symétrie de $\overline{T(B_X(0,1))}$ : la boule se recentre en $B_Y(0,\rho)$, puis $B_Y(0,\rho s)\subset\overline{T(B_X(0,s))}$ pour tout $s>0$.
3. Procédé itératif : pour $\|y\|_Y<\rho/2$, on construit $x_n$ avec $\|x_n\|_X<2^{-n}$ et $\|y-T(x_1+\dots+x_n)\|_Y<\rho2^{-n-1}$ ; $X$ étant complet, $x=\sum x_n$ vérifie $\|x\|_X<1$ et $Tx=y$. Donc $B_Y(0,\rho/2)\subset T(B_X(0,1))$.
4. Ouverture : si $B_X(x_0,r)\subset O$, alors $B_Y(Tx_0,\rho r/2)\subset T(O)$.
5. Inverse borné : si $T$ est injectif, $\|T^{-1}y\|_X\le\frac4\rho\|y\|_Y$, ce qui contrôle la taille de la préimage de $y$ par $\|y\|_Y$.

Vigilance :
- Les deux complétudes servent : celle de $Y$ pour Baire, celle de $X$ pour sommer la série du procédé itératif.
- Baire ne donne qu'une boule dans l'adhérence de l'image ; l'inclusion dans l'image elle-même demande le procédé itératif.
- La constante de stabilité est $\|T^{-1}\|$, qui n'est pas $1/\|T\|$ en général.

Vérification : {"origin":"complement","review":"machine","notes":"Le polycopié (p. PDF 9) ne donne que l’idée de preuve ; le détail (recentrage, procédé itératif, borne de l’inverse) est rédigé pour ProofLab."}

Définition « Application ouverte » : $T:X\to Y$ est ouverte lorsque $T(U)$ est ouvert dans $Y$ pour tout ouvert $U$ de $X$. Pour $T$ linéaire, cela équivaut à l'existence de $\delta>0$ tel que $B_Y(0,\delta)\subset T\big(B_X(0,1)\big)$.

Définition « Isomorphisme borné » : $T\in\mathcal L(X,Y)$ est un isomorphisme borné s'il est bijectif et si $T^{-1}\in\mathcal L(Y,X)$ ; de façon équivalente, $T$ est bijectif et il existe $c>0$ tel que $c\|u\|_X\le\|Tu\|_Y$ pour tout $u\in X$.

## Contre-exemple `ce-ao-complet` : Espace d’arrivée non complet
Assertion : Toute bijection linéaire continue entre espaces normés a un inverse continu.
Tâche : Sur $E=C([0,1])$, soit $J=\mathrm{Id}:(E,\|\cdot\|_\infty)\to(E,\|\cdot\|_1)$ et $f_n(x)=x^n$. Exprime le rapport $\|J^{-1}f_n\|_\infty/\|f_n\|_1$ en fonction de $n$.
Vérification : {"kind":"expr-equiv","prompt":"Rapport $\\|J^{-1}f_n\\|_\\infty/\\|f_n\\|_1$ en fonction de $n$","expected":"n+1","vars":["n"]}
Explication : $\|f_n\|_\infty=1$ et $\|f_n\|_1=\int_0^1x^n\,dx=\frac1{n+1}$ : le rapport $n+1$ n'est pas borné, donc $J^{-1}$ n'est pas continue. $J$ est pourtant linéaire, bijective et continue, car $\|f\|_1\le\|f\|_\infty$. Le théorème ne s'applique pas parce que $(E,\|\cdot\|_1)$ n'est pas complet.

## Contre-exemple `ce-ao-surjectivite` : Injectif sans être surjectif
Assertion : Si $X,Y$ sont des Banach et $T\in\mathcal L(X,Y)$ est injectif, alors $T^{-1}:T(X)\to X$ est continu.
Tâche : Sur $X=Y=\ell^2$, soit $Tx=(x_k/k)_{k\ge 1}$. Exprime $\|e_n\|/\|Te_n\|$ en fonction de $n$.
Vérification : {"kind":"expr-equiv","prompt":"Rapport $\\|e_n\\|/\\|Te_n\\|$ en fonction de $n$","expected":"n","vars":["n"]}
Explication : $Te_n=e_n/n$, donc le rapport vaut $n$ et n'est pas borné : $T^{-1}$ n'est pas continu sur $T(\ell^2)$. Il n'y a pas de contradiction : $T$ n'est pas surjectif, car $(1/k)_k\in\ell^2$ aurait pour seul antécédent la suite constante égale à $1$, qui n'est pas dans $\ell^2$ ; et $T(\ell^2)$, dense et distinct de $\ell^2$, n'est pas complet.

## Contre-exemple `ce-ao-coercivite` : Inversible sans être coercive
Assertion : Si l'opérateur variationnel $L:V\to V'$ d'une forme bilinéaire continue $a$ est bijectif, alors $a$ est coercive.
Tâche : Sur $V=H^1_0(]0,1[)$ muni de $(u,v)_V=\int_0^1u'v'$, soit $a(u,v)=\int_0^1u'v'-2\pi^2\int_0^1uv$ et $\varphi_k(x)=\sqrt2\sin(k\pi x)$. Calcule $a(\varphi_1,\varphi_1)/\pi^2$, puis $\|L^{-1}\|_{\mathcal L(V',V)}$.
Vérification : {"kind":"rational-vector","prompt":"Valeurs de $a(\\varphi_1,\\varphi_1)/\\pi^2$ et de $\\|L^{-1}\\|_{\\mathcal L(V',V)}$","expected":["-1","2"],"labels":["a(φ₁,φ₁)/π²","‖L⁻¹‖"]}
Explication : $\|\varphi_1\|_{L^2}=1$ et $\|\varphi_1'\|^2_{L^2}=\pi^2$, donc $a(\varphi_1,\varphi_1)=\pi^2-2\pi^2=-\pi^2$ : $a$ n'est pas coercive. Les $\varphi_k$ forment une base orthogonale de $V$ et, par intégration par parties, $a(\varphi_k,v)=(1-2/k^2)(\varphi_k,v)_V$ : à travers l'isométrie de Riesz, $L$ agit sur la $k$-ième coordonnée par multiplication par $1-2/k^2$. Ces nombres ne s'annulent pas et vérifient $|1-2/k^2|\ge\frac12$, avec égalité pour $k=2$ : $L$ est bijectif et $\|L^{-1}\|=2$.

## Exercice facile `application-ouverte.facile` : Pourquoi l’inverse d’une bijection continue entre Banach est continu

Énoncé : Soient $X,Y$ deux espaces de Banach et $T\in\mathcal L(X,Y)$ bijectif. Expliquer, à partir de l'ouverture de $T$, pourquoi $T^{-1}$ est linéaire et continu. Montrer ensuite que l'assertion voisine « toute bijection linéaire continue entre espaces normés a un inverse continu » est fausse : sur $E=C([0,1])$, avec $\|f\|_1=\int_0^1|f|$, l'identité $J:(E,\|\cdot\|_\infty)\to(E,\|\cdot\|_1)$ est une bijection linéaire continue dont l'inverse n'est pas continu.
Source : {"doc":"polycopie","pdfPage":39,"label":"Annexe B, exercice 6, facile"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-X` (hypothese) : $X$ est un espace de Banach.
- `h-Y` (hypothese) : $Y$ est un espace de Banach.
- `h-T` (hypothese) : $T:X\to Y$ est linéaire et continu.
- `h-bij` (hypothese) : $T$ est bijectif.
- `d-U` (definition, locale) : Soit $U$ un ouvert de $X$.
- `d-J` (definition) : $E=C([0,1])$ ; $(E,\|\cdot\|_\infty)$ est un espace de Banach, $\|f\|_1=\int_0^1|f|$, et $J=\mathrm{Id}:(E,\|\cdot\|_\infty)\to(E,\|\cdot\|_1)$.
- `surj` (consequence) : $T$ est surjectif.
- `ao` (application-theoreme) : $T$ est ouverte : l'image par $T$ de tout ouvert de $X$ est un ouvert de $Y$.
- `lin-inv` (consequence) : $T^{-1}:Y\to X$ est linéaire.
- `pre` (egalite) : $(T^{-1})^{-1}(U)=T(U)$.
- `pre-ouv` (consequence) : $(T^{-1})^{-1}(U)$ est ouvert dans $Y$.
- `b-0` (inclusion) : Il existe $\delta>0$ tel que $B_Y(0,\delta)\subset T\big(B_X(0,1)\big)$.
- `b-est` (inegalite) : $\|T^{-1}y\|_X\le\frac2\delta\|y\|_Y$ pour tout $y\in Y$.
- `cont` (consequence) : $T^{-1}$ est continu.
- `inv` (consequence) : $T^{-1}\in\mathcal L(Y,X)$.
- `J-cont` (inegalite) : $J$ est linéaire, bijective et continue : $\|f\|_1\le\|f\|_\infty$.
- `J-fn` (egalite, calcul rational) : Pour $f_n(x)=x^n$ : $\|f_n\|_\infty=1$ et $\|f_n\|_1=\frac1{n+1}$.
  - valeur attendue : "1/4"
- `J-noncont` (consequence) : $J^{-1}$ n'est pas continue : $\|J^{-1}f_n\|_\infty/\|f_n\|_1=n+1$ n'est pas borné.
- `J-nonbanach` (consequence) : $(E,\|\cdot\|_1)$ n'est pas complet.
- `fin` (conclusion) : Entre deux Banach, $T^{-1}\in\mathcal L(Y,X)$ ; sans complétude de l'espace d'arrivée, une bijection linéaire continue peut avoir un inverse discontinu, comme $J$.
- `x-toujours` (consequence, DISTRACTEUR) : Toute bijection linéaire continue entre espaces normés a un inverse continu.
- `x-norme-inv` (egalite, DISTRACTEUR) : $\|T^{-1}\|_{\mathcal L(Y,X)}=1/\|T\|_{\mathcal L(X,Y)}$.

Règles :
- `h-bij` ⟹ `surj` par « Une bijection est en particulier surjective. »
- `h-X` + `h-Y` + `h-T` + `surj` ⟹ `ao` par « Théorème de l’application ouverte. [application-ouverte] »
- `h-T` + `h-bij` ⟹ `lin-inv` par « Pour $y,y'\in Y$ et $\lambda$ réel, $T(\lambda T^{-1}y+T^{-1}y')=\lambda y+y'$ ; on conclut par injectivité de $T$. »
- `h-bij` + `d-U` ⟹ `pre` par « $y\in(T^{-1})^{-1}(U)\iff T^{-1}y\in U\iff y\in T(U)$, par bijectivité. » (chemin topologique)
- `pre` + `ao` ⟹ `pre-ouv` par « Ouverture de $T$, appliquée à l’ouvert $U$. » (chemin topologique)
- `pre-ouv` ⟹ `cont` par « Caractérisation de la continuité par les images réciproques d’ouverts, l’ouvert $U$ étant quelconque. » (chemin topologique)
- `ao` + `h-T` ⟹ `b-0` par « $T\big(B_X(0,1)\big)$ est un ouvert de $Y$ qui contient $T0=0$. » (chemin boule)
- `b-0` + `h-bij` + `lin-inv` ⟹ `b-est` par « Pour $y\neq 0$, le point $\frac{\delta}{2\|y\|_Y}y$ est dans $B_Y(0,\delta)$, et son unique antécédent est dans $B_X(0,1)$ ; homogénéité de $T^{-1}$. » (chemin boule)
- `b-est` + `lin-inv` ⟹ `cont` par « Une application linéaire vérifiant $\|T^{-1}y\|_X\le C\|y\|_Y$ est continue. » (chemin boule)
- `lin-inv` + `cont` ⟹ `inv` par « Définition de $\mathcal L(Y,X)$ : linéaire et continu. »
- `d-J` ⟹ `J-cont` par « $|f|\le\|f\|_\infty$ sur $[0,1]$, intervalle de longueur $1$. »
- `d-J` ⟹ `J-fn` par « $\int_0^1x^n\,dx=\frac1{n+1}$ et $\max_{[0,1]}x^n=1$. »
- `J-fn` ⟹ `J-noncont` par « Une application linéaire continue vérifierait $\|J^{-1}f\|_\infty\le C\|f\|_1$, ce que le rapport $n+1$ interdit. »
- `J-cont` + `J-noncont` + `d-J` ⟹ `J-nonbanach` par « Contraposée du théorème : si $(E,\|\cdot\|_1)$ était complet, $J^{-1}$ serait continue. [application-ouverte] »
- `inv` + `J-cont` + `J-noncont` + `J-nonbanach` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « L’inverse d’une bijection continue est automatiquement continu. » ; « Une bijection continue d’un compact sur un espace séparé est un homéomorphisme. » ; « Le théorème affirme directement que $T^{-1}$ est continu. »

Pièges :
- `x-toujours` → incorrect [complet-necessaire] : La complétude des deux espaces est indispensable : sans elle, l’inverse peut ne pas être continu. — Contre-exemple : $J=\mathrm{Id}:(C([0,1]),\|\cdot\|_\infty)\to(C([0,1]),\|\cdot\|_1)$ est linéaire, bijective et continue ; pour $f_n(x)=x^n$, $\|f_n\|_\infty=1$ et $\|f_n\|_1=\frac1{n+1}$, donc $J^{-1}$ n'est pas continue.
- `x-norme-inv` → incorrect [application-ouverte-norme-inverse] : On a seulement $\|T\|\,\|T^{-1}\|\ge 1$ : la norme de l'inverse n'est pas déterminée par celle de $T$. — Contre-exemple : $T=\mathrm{diag}(1,2)$ sur $\mathbb R^2$ euclidien : $\|T\|=2$ et $\|T^{-1}\|=1\neq\frac12$.
- `cont` par « L’inverse d’une bijection continue est automatiquement continu. » → incorrect [complet-necessaire] : Cette règle est fausse en dimension infinie : c’est le théorème de l’application ouverte, avec ses hypothèses de complétude, qui fournit la continuité. — Contre-exemple : $J=\mathrm{Id}:(C([0,1]),\|\cdot\|_\infty)\to(C([0,1]),\|\cdot\|_1)$ est linéaire, bijective et continue ; pour $f_n(x)=x^n$, $\|f_n\|_\infty=1$ et $\|f_n\|_1=\frac1{n+1}$, donc $J^{-1}$ n'est pas continue.
- `cont` par « Une bijection continue d’un compact sur un espace séparé est un homéomorphisme. » → incorrect [hypotheses-theoreme] : Le résultat cité suppose l'espace de départ compact. Un espace normé non réduit à $\{0\}$ n'est jamais compact : il contient les points $nx$, $n\in\mathbb N$, de normes non bornées.
- `cont` par « Le théorème affirme directement que $T^{-1}$ est continu. » → a-justifier [justification-absente] : C'est précisément l'énoncé à expliquer : déduis-le de l'ouverture de $T$, par les images réciproques d'ouverts ou par une boule contenue dans $T(B_X(0,1))$.
- `inv` par « Le théorème affirme directement que $T^{-1}$ est continu. » → a-justifier [justification-absente] : L'exercice demande pourquoi l'inverse est continu : établis d'abord la linéarité de $T^{-1}$, puis sa continuité à partir de l'ouverture de $T$.

Retraits :
- `h-Y` (nécessaire) : Le théorème de l’application ouverte ne s’applique plus. — Contre-exemple : $J=\mathrm{Id}:(C([0,1]),\|\cdot\|_\infty)\to(C([0,1]),\|\cdot\|_1)$ est linéaire, bijective et continue ; pour $f_n(x)=x^n$, $\|f_n\|_\infty=1$ et $\|f_n\|_1=\frac1{n+1}$, donc $J^{-1}$ n'est pas continue.
- `h-X` (nécessaire) : Le théorème ne s’applique plus ; un contre-exemple existe, mais il n’est pas explicite. — Contre-exemple : Soient $E$ un espace de Banach de dimension infinie, $\varphi$ une forme linéaire non continue sur $E$ (construite à l'aide d'une base algébrique) et $\|x\|'=\|x\|+|\varphi(x)|$. L'identité $(E,\|\cdot\|')\to(E,\|\cdot\|)$ est une bijection linéaire continue dont l'inverse n'est pas continu : $(E,\|\cdot\|')$ n'est pas complet.
- `h-bij` (nécessaire) : Sans surjectivité, $T$ n'est pas ouverte en général, et l'inverse défini sur l'image peut être discontinu. — Contre-exemple : Sur $\ell^2$, $Tx=(x_k/k)_k$ est injectif et continu, mais $\|e_n\|=1$ et $\|Te_n\|=1/n$ : l'inverse défini sur $T(\ell^2)$ n'est pas continu.

Calculs fermés : [{"kind":"choice","prompt":"Quelle hypothèse du théorème fait défaut à $J$ ?","options":["La continuité de $J$","La complétude de l'espace d'arrivée $(E,\\|\\cdot\\|_1)$","La complétude de l'espace de départ $(E,\\|\\cdot\\|_\\infty)$","La bijectivité de $J$"],"correct":[1],"explanation":"$J$ est continue et bijective, $(E,\\|\\cdot\\|_\\infty)$ est complet ; seul $(E,\\|\\cdot\\|_1)$ ne l'est pas, sans quoi $J^{-1}$ serait continue."}]

Solution :
**Ouverture.** $T$ est bijectif, donc surjectif ; $X$ et $Y$ étant des Banach, le théorème de l'application ouverte montre que $T$ est ouverte.

**Linéarité de l'inverse.** Pour $y,y'\in Y$ et $\lambda$ réel, $T(\lambda T^{-1}y+T^{-1}y')=\lambda y+y'$, donc $T^{-1}(\lambda y+y')=\lambda T^{-1}y+T^{-1}y'$.

**Continuité.** Pour tout ouvert $U$ de $X$, $(T^{-1})^{-1}(U)=T(U)$ est ouvert : $T^{-1}$ est continu. Autre voie : $T(B_X(0,1))$ est un ouvert contenant $0$, donc contient une boule $B_Y(0,\delta)$. Pour $y\neq 0$, $y'=\frac{\delta}{2\|y\|_Y}y$ a son unique antécédent dans $B_X(0,1)$, d'où $\|T^{-1}y\|_X<\frac2\delta\|y\|_Y$.

**Assertion voisine fausse.** $J$ est linéaire, bijective, et $\|f\|_1\le\|f\|_\infty$. Pour $f_n(x)=x^n$, $\|f_n\|_\infty=1$ et $\|f_n\|_1=\frac1{n+1}$ : le rapport $\|J^{-1}f_n\|_\infty/\|f_n\|_1=n+1$ n'est pas borné, donc $J^{-1}$ n'est pas continue. Par contraposée du théorème, $(E,\|\cdot\|_1)$ n'est pas complet : c'est la complétude de l'espace d'arrivée qui fait défaut.

Indices :
1. La continuité de $T^{-1}$ porte sur les images réciproques par $T^{-1}$ : à quoi ressemble l'image réciproque d'un ouvert $U$ de $X$ ?
2. Montre que $(T^{-1})^{-1}(U)=T(U)$, puis invoque l'ouverture de $T$. Pour $J$, compare les deux normes sur $f_n(x)=x^n$.
3. $\int_0^1x^n\,dx=\frac1{n+1}$ alors que $\max_{[0,1]}x^n=1$ : le rapport des normes tend vers $+\infty$.

Erreurs fréquentes :
- Croire que l’inverse d’une bijection linéaire continue est toujours continu.
- Écrire $\|T^{-1}\|=1/\|T\|$.
- Citer la conclusion du théorème au lieu d’expliquer comment l’ouverture la fournit.

Variante : Soient $\|\cdot\|_a$ et $\|\cdot\|_b$ deux normes sur un même espace vectoriel $E$, pour lesquelles $E$ est complet, et telles que $\|x\|_a\le C\|x\|_b$ pour tout $x\in E$. Montrer que les deux normes sont équivalentes.

Solution de la variante : L'identité $I:(E,\|\cdot\|_b)\to(E,\|\cdot\|_a)$ est linéaire, bijective et continue, car $\|Ix\|_a\le C\|x\|_b$. Les deux espaces étant de Banach, le théorème de l'application ouverte donne $I^{-1}$ continue : il existe $C'$ tel que $\|x\|_b\le C'\|x\|_a$. Ainsi $\frac1{C'}\|x\|_b\le\|x\|_a\le C\|x\|_b$ (si $E\neq\{0\}$, $C'>0$). La complétude des deux normes est indispensable : $\|\cdot\|_1\le\|\cdot\|_\infty$ sur $C([0,1])$, sans équivalence.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `application-ouverte.intermediaire` : L’estimation $\|u\|\le C\|Tu\|$ pour un isomorphisme borné

Énoncé : Soient $X,Y$ deux espaces de Banach et $T\in\mathcal L(X,Y)$ bijectif. En déduire qu'il existe $C\ge 0$ tel que $\|u\|_X\le C\|Tu\|_Y$ pour tout $u\in X$, et que la plus petite constante admissible est $\|T^{-1}\|_{\mathcal L(Y,X)}$. Calculer cette constante pour $T_0=\mathrm{diag}(2,4)$ sur $\mathbb R^2$ euclidien, et la comparer à $1/\|T_0\|$.
Source : {"doc":"polycopie","pdfPage":39,"label":"Annexe B, exercice 6, intermédiaire"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-X` (hypothese) : $X$ est un espace de Banach.
- `h-Y` (hypothese) : $Y$ est un espace de Banach.
- `h-T` (hypothese) : $T\in\mathcal L(X,Y)$.
- `h-bij` (hypothese) : $T$ est bijectif.
- `d-u` (definition, locale) : Soit $u\in X$.
- `d-ex` (definition) : Exemple : $X=Y=\mathbb R^2$ euclidien et $T_0=\mathrm{diag}(2,4)$.
- `inv` (application-theoreme) : $T^{-1}\in\mathcal L(Y,X)$.
- `id` (egalite) : $u=T^{-1}(Tu)$.
- `maj` (inegalite) : $\|u\|_X\le\|T^{-1}\|_{\mathcal L(Y,X)}\,\|Tu\|_Y$.
- `est` (inegalite) : Pour tout $u\in X$ : $\|u\|_X\le C\|Tu\|_Y$, avec $C=\|T^{-1}\|_{\mathcal L(Y,X)}$.
- `opt` (consequence) : Si $C'\ge 0$ vérifie $\|u\|_X\le C'\|Tu\|_Y$ pour tout $u\in X$, alors $\|T^{-1}\|\le C'$ : la constante $\|T^{-1}\|$ est la plus petite possible.
- `stab` (inegalite) : Pour tous $u_1,u_2\in X$ : $\|u_1-u_2\|_X\le C\|Tu_1-Tu_2\|_Y$.
- `ex-val` (egalite, calcul rational) : Pour $T_0$, la plus petite constante admissible vaut $\|T_0^{-1}\|=1/2$.
  - valeur attendue : "1/2"
- `ex-cmp` (inegalite) : $\|T_0\|=4$, donc $1/\|T_0\|=1/4<1/2$ : la constante optimale n'est pas $1/\|T\|$ en général.
- `fin` (conclusion) : $\|u\|_X\le\|T^{-1}\|\,\|Tu\|_Y$ pour tout $u\in X$, avec une constante optimale ; pour $T_0$, elle vaut $1/2$ et diffère de $1/\|T_0\|$.
- `x-dir` (inegalite, DISTRACTEUR) : $\|u\|_X\le\|T\|_{\mathcal L(X,Y)}\,\|Tu\|_Y$ pour tout $u\in X$.
- `x-inv-norme` (egalite, DISTRACTEUR) : $\|T^{-1}\|_{\mathcal L(Y,X)}=1/\|T\|_{\mathcal L(X,Y)}$.
- `x-inj` (consequence, DISTRACTEUR) : L'estimation reste vraie lorsque $T\in\mathcal L(X,Y)$ est seulement injectif.

Règles :
- `h-X` + `h-Y` + `h-T` + `h-bij` ⟹ `inv` par « Théorème de l’application ouverte (inverse borné). [application-ouverte] »
- `h-bij` + `d-u` ⟹ `id` par « Définition de l'inverse d'une bijection. »
- `inv` + `id` ⟹ `maj` par « Définition de la norme d'opérateur de $T^{-1}$, appliquée au vecteur $Tu$. »
- `maj` ⟹ `est` par « $u$ était quelconque dans $X$. »
- `est` + `h-bij` ⟹ `opt` par « Pour $y\in Y$, écrire $y=Tu$ par surjectivité : $\|T^{-1}y\|_X\le C'\|y\|_Y$. »
- `est` + `h-T` ⟹ `stab` par « Appliquer l'estimation à $u=u_1-u_2$, par linéarité de $T$. »
- `d-ex` + `opt` ⟹ `ex-val` par « $T_0^{-1}=\mathrm{diag}(1/2,1/4)$, et la norme euclidienne d'une matrice diagonale est le plus grand module de ses coefficients. »
- `ex-val` + `d-ex` ⟹ `ex-cmp` par « Même calcul pour $T_0$ : $\|T_0\|=\max(2,4)$. »
- `est` + `opt` + `stab` + `ex-cmp` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « Division de l'inégalité $\|Tu\|_Y\le\|T\|\,\|u\|_X$ par $\|T\|$. » ; « C’est évident. »

Pièges :
- `x-dir` → incorrect [application-ouverte-norme-inverse] : La norme de $T$ majore $\|Tu\|$ en fonction de $\|u\|$ ; elle ne permet pas de majorer $\|u\|$ en fonction de $\|Tu\|$. — Contre-exemple : $T=\tfrac12\mathrm{Id}$ sur $\mathbb R$ : $\|T\|=\tfrac12$, et $|u|\le\tfrac14|u|$ est faux pour $u\neq 0$.
- `x-inv-norme` → incorrect [application-ouverte-norme-inverse] : On a seulement $\|T\|\,\|T^{-1}\|\ge 1$ : l'égalité n'a pas lieu en général. — Contre-exemple : $T_0=\mathrm{diag}(2,4)$ : $\|T_0^{-1}\|=\tfrac12$ et $1/\|T_0\|=\tfrac14$.
- `x-inj` → incorrect [hypotheses-theoreme] : Sans surjectivité, le théorème ne s'applique pas, et l'estimation peut échouer. — Contre-exemple : $X=Y=\ell^2$, $Tx=(x_k/k)_k$ : $T$ est injectif et continu, mais $\|e_n\|=1$ et $\|Te_n\|=1/n$.
- `maj` par « Division de l'inégalité $\|Tu\|_Y\le\|T\|\,\|u\|_X$ par $\|T\|$. » → incorrect [application-ouverte-norme-inverse] : La division de $\|Tu\|\le\|T\|\,\|u\|$ par $\|T\|$ donne une minoration de $\|u\|$, à savoir $\|Tu\|/\|T\|\le\|u\|$, et non une majoration. — Contre-exemple : $T_0=\mathrm{diag}(2,4)$ et $u=e_1$ : $\|u\|=1$, alors que $\|T_0u\|/\|T_0\|=\tfrac12$.
- `est` par « Division de l'inégalité $\|Tu\|_Y\le\|T\|\,\|u\|_X$ par $\|T\|$. » → incorrect [application-ouverte-norme-inverse] : Cette division produit une minoration de $\|u\|$ : la majoration cherchée vient de la continuité de $T^{-1}$.
- `inv` par « C’est évident. » → a-justifier [justification-absente] : La continuité de l’inverse est le contenu d’un théorème, sous des hypothèses de complétude : lesquelles ?

Retraits :
- `h-Y` (nécessaire) : Le théorème ne s’applique plus, et aucune constante ne convient en général. — Contre-exemple : $J=\mathrm{Id}:(C([0,1]),\|\cdot\|_\infty)\to(C([0,1]),\|\cdot\|_1)$ et $f_n(x)=x^n$ : $\|f_n\|_\infty=1$ et $\|Jf_n\|_1=\frac1{n+1}$.
- `h-bij` (nécessaire) : Sans surjectivité, l'inverse n'est défini que sur l'image, et l'estimation peut échouer. — Contre-exemple : $Tx=(x_k/k)_k$ sur $\ell^2$ : $\|e_n\|=1$ et $\|Te_n\|=1/n$.

Solution :
**Estimation.** $X$ et $Y$ sont des Banach et $T\in\mathcal L(X,Y)$ est bijectif : par le théorème de l'application ouverte, $T^{-1}\in\mathcal L(Y,X)$. Pour $u\in X$, $u=T^{-1}(Tu)$, donc $\|u\|_X\le\|T^{-1}\|\,\|Tu\|_Y$. On prend $C=\|T^{-1}\|$. Par linéarité, $\|u_1-u_2\|_X\le C\|Tu_1-Tu_2\|_Y$ : la solution de $Tu=f$ dépend continûment de $f$.

**Optimalité.** Si $\|u\|_X\le C'\|Tu\|_Y$ pour tout $u$, alors, pour $y\in Y$ et $u=T^{-1}y$, $\|T^{-1}y\|_X\le C'\|y\|_Y$, d'où $\|T^{-1}\|\le C'$.

**Exemple.** $T_0^{-1}=\mathrm{diag}(1/2,1/4)$, donc $\|T_0^{-1}\|=1/2$ : en effet $\|T_0u\|^2=4u_1^2+16u_2^2\ge 4\|u\|^2$, avec égalité pour $u=e_1$. Comme $\|T_0\|=4$, on a $1/\|T_0\|=1/4<1/2$ : la constante n'est pas $1/\|T\|$.

Indices :
1. L'estimation cherchée majore $\|u\|$ : quel opérateur, appliqué à $Tu$, redonne $u$ ?
2. Écris $u=T^{-1}(Tu)$ et utilise la continuité de $T^{-1}$, fournie par le théorème. Pour l'optimalité, pars d'une constante $C'$ quelconque et pose $y=Tu$.
3. Pour $T_0$ : $\|T_0u\|^2=4u_1^2+16u_2^2\ge 4\|u\|^2$, avec égalité en $u=e_1$.

Erreurs fréquentes :
- Confondre $\|Tu\|\le\|T\|\,\|u\|$ et l'estimation inverse.
- Prendre $C=1/\|T\|$.
- Appliquer le résultat à un opérateur seulement injectif.

Variante : Soient $X,Y$ deux espaces de Banach et $T\in\mathcal L(X,Y)$. On suppose qu'il existe $C\ge 0$ tel que $\|u\|_X\le C\|Tu\|_Y$ pour tout $u\in X$. Montrer que $T$ est injectif et que son image $T(X)$ est fermée dans $Y$.

Solution de la variante : Si $Tu=0$, alors $\|u\|_X\le 0$, donc $u=0$ : $T$ est injectif. Soit $(Tu_n)_n$ une suite de $T(X)$ convergeant vers $y\in Y$. Elle est de Cauchy, et $\|u_n-u_m\|_X\le C\|Tu_n-Tu_m\|_Y$ : $(u_n)_n$ est de Cauchy dans $X$, complet, donc converge vers un $u\in X$. Par continuité de $T$, $Tu_n\to Tu$, d'où $y=Tu\in T(X)$. Seule la complétude de $X$ a servi.

Vérification : {"origin":"complement","review":"machine"}

## Exercice difficile `application-ouverte.difficile` : Stabilité d’un problème elliptique inversible

Énoncé : Soient $\Omega\subset\mathbb R^d$ un ouvert borné, $V=H^1_0(\Omega)$ muni de $\|v\|_V=\big(\|v\|_{L^2}^2+\|\nabla v\|_{L^2}^2\big)^{1/2}$ et $V'$ son dual, muni de la norme duale. Soient $A\in L^\infty(\Omega;\mathbb R^{d\times d})$, $c\in L^\infty(\Omega)$, $a(u,v)=\int_\Omega A\nabla u\cdot\nabla v+\int_\Omega c\,uv$, et $L:V\to V'$ l'opérateur variationnel, $\langle Lu,v\rangle=a(u,v)$. On suppose établi que $L$ est bijectif ; aucune coercivité n'est supposée. Montrer que pour tout $f\in V'$ le problème « $u\in V$ et $a(u,v)=\langle f,v\rangle$ pour tout $v\in V$ » admet une unique solution $u_f$, et qu'il existe $C$, indépendant de $f$ et de $g$, tel que $\|u_f-u_g\|_V\le C\|f-g\|_{V'}$.
Source : {"doc":"polycopie","pdfPage":39,"label":"Annexe B, exercice 6, difficile"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-V` (hypothese) : $V=H^1_0(\Omega)$, muni de $\|\cdot\|_V$, est un espace de Hilbert, donc un espace de Banach.
- `h-Vp` (hypothese) : $V'$, muni de la norme duale $\|f\|_{V'}=\sup_{\|v\|_V\le 1}|\langle f,v\rangle|$, est un espace de Banach.
- `h-a` (hypothese) : $A\in L^\infty(\Omega;\mathbb R^{d\times d})$, $c\in L^\infty(\Omega)$ et $a(u,v)=\int_\Omega A\nabla u\cdot\nabla v+\int_\Omega c\,uv$.
- `h-bij` (hypothese) : L'opérateur $L:V\to V'$ défini par $\langle Lu,v\rangle=a(u,v)$ est bijectif.
- `d-fg` (definition, locale) : Soient $f,g\in V'$.
- `c-cont` (inegalite) : $|a(u,v)|\le M\|u\|_V\|v\|_V$ pour tous $u,v\in V$, avec $M=\|A\|_{L^\infty}+\|c\|_{L^\infty}$, où $\|A\|_{L^\infty}$ est le supremum essentiel de la norme subordonnée de $A(x)$.
- `c-L` (consequence) : $L$ est linéaire et $\|Lu\|_{V'}\le M\|u\|_V$ : $L\in\mathcal L(V,V')$.
- `ao` (application-theoreme) : $L^{-1}\in\mathcal L(V',V)$.
- `e-sol` (consequence) : Pour tout $f\in V'$, le problème admet une unique solution, $u_f=L^{-1}f$.
- `e-diff` (egalite) : $u_f-u_g=L^{-1}(f-g)$.
- `e-stab` (inegalite) : $\|u_f-u_g\|_V\le\|L^{-1}\|_{\mathcal L(V',V)}\,\|f-g\|_{V'}$.
- `e-borne` (inegalite) : $\|u_f\|_V\le\|L^{-1}\|_{\mathcal L(V',V)}\,\|f\|_{V'}$.
- `fin` (conclusion) : Pour tout $f\in V'$, la solution $u_f$ existe et est unique, et $\|u_f-u_g\|_V\le C\|f-g\|_{V'}$ avec $C=\|L^{-1}\|_{\mathcal L(V',V)}$, indépendant de $f$ et de $g$.
- `x-coerc` (inegalite, DISTRACTEUR) : $\|u_f\|_V\le\frac1\alpha\|f\|_{V'}$, où $\alpha>0$ est une constante de coercivité de $a$.
- `x-H2` (inegalite, DISTRACTEUR) : Pour $f\in L^2(\Omega)$ : $u_f\in H^2(\Omega)$ et $\|u_f\|_{H^2}\le C\|f\|_{L^2}$.
- `x-L2` (inegalite, DISTRACTEUR) : $\|u_f\|_V\le C\|f\|_{L^2(\Omega)}$ pour tout $f\in V'$.

Règles :
- `h-a` + `h-V` ⟹ `c-cont` par « Majoration ponctuelle $|A\nabla u\cdot\nabla v|\le\|A\|_{L^\infty}|\nabla u|\,|\nabla v|$, puis inégalité de Cauchy–Schwarz dans $L^2$ pour chacun des deux termes. [cauchy-schwarz] »
- `c-cont` ⟹ `c-L` par « Définition de la norme duale : $\|Lu\|_{V'}=\sup_{\|v\|_V\le 1}|a(u,v)|$, et bilinéarité de $a$. »
- `h-V` + `h-Vp` + `c-L` + `h-bij` ⟹ `ao` par « Théorème de l’application ouverte (inverse borné). [application-ouverte] »
- `h-bij` + `d-fg` ⟹ `e-sol` par « Le problème équivaut à $Lu=f$ dans $V'$ : existence par surjectivité, unicité par injectivité. »
- `e-sol` + `ao` ⟹ `e-diff` par « Linéarité de $L^{-1}$. »
- `e-diff` + `ao` ⟹ `e-stab` par « Définition de la norme d'opérateur de $L^{-1}$. »
- `e-stab` + `e-sol` ⟹ `e-borne` par « Cas $g=0$ : l'unique solution associée est $u_0=0$. »
- `e-sol` + `e-stab` + `e-borne` ⟹ `fin` par « Réunion de l’existence, de l’unicité et de la stabilité. »

Justifications sans règle (séduisantes ou fausses) : « Une bijection linéaire a toujours un inverse continu. » ; « Théorème de Lax–Milgram. »

Pièges :
- `x-coerc` → incorrect [hypotheses-theoreme] : Aucune coercivité n'est supposée, et elle peut faire défaut alors que $L$ est bijectif : la constante de stabilité est $\|L^{-1}\|$. — Contre-exemple : Sur $\Omega=]0,1[$, $a(u,v)=\int_0^1u'v'-2\pi^2\int_0^1uv$ : l'opérateur $L$ est bijectif, car $2\pi^2$ n'est pas valeur propre de $-\frac{d^2}{dx^2}$ avec condition de Dirichlet, et pourtant $a(\varphi,\varphi)=-\pi^2/2<0$ pour $\varphi(x)=\sin(\pi x)$.
- `x-H2` → incorrect [regularite-bord] : L'inversibilité de $L:V\to V'$ ne contient aucune information de régularité $H^2$ : celle-ci dépend du bord et des coefficients. — Contre-exemple : Pour $A=\mathrm{Id}$, $c=0$ et $\Omega$ un polygone non convexe, il existe $f\in L^2(\Omega)$ dont la solution n'appartient pas à $H^2(\Omega)$.
- `x-L2` → incorrect [dual-identification] : Un élément de $V'$ n'est pas forcément une fonction de $L^2(\Omega)$ : le membre de droite n'a pas de sens en général. — Contre-exemple : Pour $d=1$ et $\Omega=]0,1[$, la distribution de Dirac $\delta_{1/2}$ appartient à $H^{-1}(]0,1[)$, puisque $H^1_0(]0,1[)\subset C([0,1])$ avec injection continue, et n'est pas dans $L^2(]0,1[)$.
- `ao` par « Une bijection linéaire a toujours un inverse continu. » → incorrect [complet-necessaire] : La continuité de l'inverse vient du théorème de l'application ouverte, qui exige $V$ et $V'$ complets ; une bijection linéaire continue entre espaces normés peut avoir un inverse discontinu. — Contre-exemple : $J=\mathrm{Id}:(C([0,1]),\|\cdot\|_\infty)\to(C([0,1]),\|\cdot\|_1)$ est linéaire, bijective et continue ; pour $f_n(x)=x^n$, $\|f_n\|_\infty=1$ et $\|f_n\|_1=\frac1{n+1}$, donc $J^{-1}$ n'est pas continue.
- `ao` par « Théorème de Lax–Milgram. » → incorrect [hypotheses-theoreme] : Lax–Milgram demande la coercivité de $a$, qui n'est pas supposée ici : seule la bijectivité de $L$ l'est. — Contre-exemple : Sur $\Omega=]0,1[$, $a(u,v)=\int_0^1u'v'-2\pi^2\int_0^1uv$ : l'opérateur $L$ est bijectif, car $2\pi^2$ n'est pas valeur propre de $-\frac{d^2}{dx^2}$ avec condition de Dirichlet, et pourtant $a(\varphi,\varphi)=-\pi^2/2<0$ pour $\varphi(x)=\sin(\pi x)$.
- `e-sol` par « Théorème de Lax–Milgram. » → incorrect [hypotheses-theoreme] : Sans coercivité, Lax–Milgram ne s'applique pas ; l'existence et l'unicité viennent ici de la bijectivité de $L$. — Contre-exemple : Sur $\Omega=]0,1[$, $a(u,v)=\int_0^1u'v'-2\pi^2\int_0^1uv$ : l'opérateur $L$ est bijectif, car $2\pi^2$ n'est pas valeur propre de $-\frac{d^2}{dx^2}$ avec condition de Dirichlet, et pourtant $a(\varphi,\varphi)=-\pi^2/2<0$ pour $\varphi(x)=\sin(\pi x)$.

Retraits :
- `h-bij` (nécessaire) : Sans injectivité, l’unicité est perdue, et avec elle toute estimation de stabilité. — Contre-exemple : Sur $\Omega=]0,1[$, $a(u,v)=\int_0^1u'v'-\pi^2\int_0^1uv$ : pour $\varphi(x)=\sin(\pi x)$, $a(\varphi,v)=0$ pour tout $v\in V$, donc $0$ et $\varphi$ résolvent le problème associé à $f=0$.
- `h-Vp` (nécessaire) : Le théorème de l’application ouverte exige que l’espace d’arrivée soit complet. — Contre-exemple : $J=\mathrm{Id}:(C([0,1]),\|\cdot\|_\infty)\to(C([0,1]),\|\cdot\|_1)$ est linéaire, bijective et continue ; pour $f_n(x)=x^n$, $\|f_n\|_\infty=1$ et $\|f_n\|_1=\frac1{n+1}$, donc $J^{-1}$ n'est pas continue.

Calculs fermés : [{"kind":"rational","prompt":"Pour $\\Omega=]0,1[$, $a(u,v)=\\int_0^1u'v'-2\\pi^2\\int_0^1uv$ et $\\varphi(x)=\\sin(\\pi x)$, valeur de $a(\\varphi,\\varphi)/\\pi^2$","expected":"-1/2"}]

Solution :
**Continuité de $L$.** Pour $u,v\in V$, $|A\nabla u\cdot\nabla v|\le\|A\|_{L^\infty}|\nabla u|\,|\nabla v|$ presque partout ; par Cauchy–Schwarz, $|a(u,v)|\le\|A\|_{L^\infty}\|\nabla u\|_{L^2}\|\nabla v\|_{L^2}+\|c\|_{L^\infty}\|u\|_{L^2}\|v\|_{L^2}\le M\|u\|_V\|v\|_V$. Donc $\|Lu\|_{V'}\le M\|u\|_V$ et $L\in\mathcal L(V,V')$.

**Inverse borné.** $V$ est un Hilbert et $V'$, dual d'un espace normé, est un Banach ; $L$ est une bijection linéaire continue. Par le théorème de l'application ouverte, $L^{-1}\in\mathcal L(V',V)$.

**Existence, unicité, stabilité.** Le problème équivaut à $Lu=f$ dans $V'$ : il a une unique solution $u_f=L^{-1}f$. Par linéarité, $u_f-u_g=L^{-1}(f-g)$, donc $\|u_f-u_g\|_V\le\|L^{-1}\|\,\|f-g\|_{V'}$ ; avec $g=0$, $\|u_f\|_V\le\|L^{-1}\|\,\|f\|_{V'}$.

**Points de vigilance.** Aucune coercivité n'a servi : pour $a(u,v)=\int_0^1u'v'-2\pi^2\int_0^1uv$ sur $H^1_0(]0,1[)$, $L$ est bijectif sans que $a$ soit coercive. La constante $C=\|L^{-1}\|$ n'est pas explicite en général ; elle vaut $1/\alpha$ au plus lorsque $a$ est $\alpha$-coercive. Enfin, l'estimation porte sur la norme de $V'$ : un élément de $V'$ n'est pas forcément dans $L^2$, et aucune régularité $H^2$ n'en découle.

Indices :
1. Entre quels espaces $L$ est-il une bijection, et ces espaces sont-ils complets ?
2. Montre d'abord que $L$ est continu, puis applique le théorème de l'application ouverte à $L:V\to V'$. La stabilité est la continuité de $L^{-1}$, écrite avec sa norme.
3. $u_f-u_g=L^{-1}(f-g)$, donc $\|u_f-u_g\|_V\le\|L^{-1}\|\,\|f-g\|_{V'}$ ; aucune coercivité n'intervient.

Erreurs fréquentes :
- Invoquer Lax–Milgram, ou une constante de coercivité, alors que seule la bijectivité est supposée.
- Écrire la stabilité en norme $L^2$ du second membre au lieu de la norme de $V'$.
- Déduire une régularité $H^2$ de l'inversibilité de $L:V\to V'$.

Variante : Démontrer le théorème de l'application ouverte à partir du théorème de Baire : si $X,Y$ sont des espaces de Banach et si $T\in\mathcal L(X,Y)$ est surjectif, alors $T$ est ouverte ; si $T$ est en outre injectif, alors $T^{-1}\in\mathcal L(Y,X)$.

Solution de la variante : Notons $U=B_X(0,1)$.

**Baire.** $X=\bigcup_{n\ge 1}nU$ et $T$ est surjectif, donc $Y=\bigcup_{n\ge 1}nT(U)=\bigcup_{n\ge 1}n\,\overline{T(U)}$, réunion de fermés. $Y$ étant complet, l'un d'eux est d'intérieur non vide ; par homothétie, $\overline{T(U)}$ contient une boule $B_Y(y_0,\rho)$, $\rho>0$.

**Recentrage.** $\overline{T(U)}$ est convexe et symétrique, car $U$ l'est et $T$ est linéaire. Pour $\|y\|_Y<\rho$, $y=\frac12(y_0+y)+\frac12\big(-(y_0-y)\big)$, avec $y_0\pm y\in B_Y(y_0,\rho)$ : donc $B_Y(0,\rho)\subset\overline{T(U)}$, et par homogénéité $B_Y(0,\rho s)\subset\overline{T(B_X(0,s))}$ pour tout $s>0$.

**Procédé itératif.** Soit $\|y\|_Y<\rho/2$. Comme $y\in\overline{T(B_X(0,1/2))}$, il existe $x_1$ avec $\|x_1\|_X<1/2$ et $\|y-Tx_1\|_Y<\rho/4$. Par récurrence, on obtient $x_n$ avec $\|x_n\|_X<2^{-n}$ et $\|y-T(x_1+\dots+x_n)\|_Y<\rho2^{-n-1}$. $X$ étant complet, la série $\sum x_n$, absolument convergente, converge vers $x$ avec $\|x\|_X\le\sum\|x_n\|_X<1$, et la continuité de $T$ donne $Tx=y$. Ainsi $B_Y(0,\rho/2)\subset T(U)$.

**Ouverture.** Si $O$ est ouvert et $B_X(x_0,r)\subset O$, alors $T(O)\supset Tx_0+rT(U)\supset B_Y(Tx_0,\rho r/2)$.

**Inverse borné.** Si $T$ est injectif, $T^{-1}$ est linéaire. Pour $y\neq 0$, $y'=\frac{\rho}{4\|y\|_Y}y$ vérifie $\|y'\|_Y=\rho/4<\rho/2$, donc son unique antécédent est dans $U$ : $\|T^{-1}y\|_X<\frac4\rho\|y\|_Y$.

Graphe de la variante :
But : `fin` — usage : demonstration

Nœuds :
- `h-X` (hypothese) : $X$ est un espace de Banach.
- `h-Y` (hypothese) : $Y$ est un espace de Banach.
- `h-T` (hypothese) : $T\in\mathcal L(X,Y)$.
- `h-surj` (hypothese) : $T$ est surjectif.
- `d-B` (definition) : Notations : $B_X(x,r)$ et $B_Y(y,r)$ désignent les boules ouvertes, et $U=B_X(0,1)$.
- `d-y` (definition, locale) : Soit $y\in Y$ tel que $\|y\|_Y<\rho/2$.
- `d-O` (definition, locale) : Soient $O$ un ouvert de $X$, $x_0\in O$ et $r>0$ tels que $B_X(x_0,r)\subset O$.
- `h-inj` (hypothese, locale) : Supposons de plus $T$ injectif.
- `b-recouvre` (egalite) : $Y=\bigcup_{n\ge 1}n\,\overline{T(U)}$, réunion de fermés.
- `b-baire` (application-theoreme) : Il existe $n_0\ge 1$ tel que $n_0\overline{T(U)}$ est d'intérieur non vide.
- `b-boule` (inclusion) : Il existe $y_0\in Y$ et $\rho>0$ tels que $B_Y(y_0,\rho)\subset\overline{T(U)}$.
- `c-conv` (consequence) : $\overline{T(U)}$ est convexe et symétrique.
- `c-centre` (inclusion) : $B_Y(0,\rho)\subset\overline{T(U)}$.
- `c-echelle` (inclusion) : Pour tout $s>0$ : $B_Y(0,\rho s)\subset\overline{T(B_X(0,s))}$.
- `i-suite` (consequence) : Il existe $(x_n)_{n\ge 1}\subset X$ tels que $\|x_n\|_X<2^{-n}$ et $\big\|y-\sum_{k=1}^nTx_k\big\|_Y<\rho\,2^{-n-1}$ pour tout $n\ge 1$.
- `i-serie` (consequence) : La série $\sum_nx_n$ converge dans $X$ vers un point $x$ tel que $\|x\|_X<1$.
- `i-image` (egalite) : $Tx=y$.
- `i-incl` (inclusion) : $B_Y(0,\rho/2)\subset T(U)$.
- `o-boule` (inclusion) : $B_Y(Tx_0,\rho r/2)\subset T(O)$.
- `o-ouverte` (consequence) : $T$ est ouverte.
- `inv` (inegalite) : $T^{-1}$ est linéaire et $\|T^{-1}y\|_X\le\frac4\rho\|y\|_Y$ pour tout $y\in Y$.
- `fin` (conclusion) : $T$ est ouverte ; si $T$ est de plus injectif, alors $T^{-1}\in\mathcal L(Y,X)$.
- `x-baire-seul` (inclusion, DISTRACTEUR) : Par le seul théorème de Baire, $T(U)$ contient une boule de $Y$ centrée en $0$.
- `x-ouverte-toujours` (consequence, DISTRACTEUR) : Toute application linéaire continue entre espaces de Banach est ouverte.

Règles :
- `h-T` + `h-surj` + `d-B` ⟹ `b-recouvre` par « $X=\bigcup_{n\ge 1}nU$ et $T$ surjectif donnent $Y=\bigcup_{n\ge 1}nT(U)$ ; chaque $n\,\overline{T(U)}$ est fermé. »
- `h-Y` + `b-recouvre` ⟹ `b-baire` par « Théorème de Baire dans l’espace complet non vide $Y$. [baire] »
- `b-baire` ⟹ `b-boule` par « L'homothétie $y\mapsto y/n_0$ est un homéomorphisme de $Y$. »
- `h-T` + `d-B` ⟹ `c-conv` par « $U$ est convexe et symétrique, $T$ est linéaire, et l'adhérence conserve ces deux propriétés. »
- `b-boule` + `c-conv` ⟹ `c-centre` par « Pour $\|y\|_Y<\rho$ : $y=\frac12(y_0+y)+\frac12\big(-(y_0-y)\big)$, avec $y_0\pm y\in B_Y(y_0,\rho)$. »
- `c-centre` + `h-T` ⟹ `c-echelle` par « $T(sU)=sT(U)$ et $\overline{sA}=s\overline A$ pour $s>0$. »
- `c-echelle` + `d-y` ⟹ `i-suite` par « Récurrence : $y-\sum_{k\le n}Tx_k\in B_Y(0,\rho2^{-n-1})\subset\overline{T(B_X(0,2^{-n-1}))}$ fournit $x_{n+1}$. »
- `i-suite` + `h-X` ⟹ `i-serie` par « Série absolument convergente dans l'espace complet $X$, avec $\sum_n\|x_n\|_X<\sum_n2^{-n}=1$. »
- `i-suite` + `i-serie` + `h-T` ⟹ `i-image` par « Continuité de $T$ : $T\big(\sum_{k\le n}x_k\big)\to Tx$, et le reste tend vers $0$. »
- `i-serie` + `i-image` + `d-y` ⟹ `i-incl` par « $y$ était quelconque dans $B_Y(0,\rho/2)$. »
- `i-incl` + `d-O` + `h-T` ⟹ `o-boule` par « $T(O)\supset T\big(B_X(x_0,r)\big)=Tx_0+rT(U)\supset Tx_0+B_Y(0,\rho r/2)$. »
- `o-boule` ⟹ `o-ouverte` par « Tout point $Tx_0$ de $T(O)$ y est intérieur, pour tout ouvert $O$. »
- `i-incl` + `h-inj` + `h-surj` + `h-T` ⟹ `inv` par « Pour $y\neq 0$, le point $\frac{\rho}{4\|y\|_Y}y$ est dans $B_Y(0,\rho/2)$, donc son unique antécédent est dans $U$ ; homogénéité de $T^{-1}$. »
- `o-ouverte` + `inv` ⟹ `fin` par « Réunion des deux résultats. »

Justifications sans règle (séduisantes ou fausses) : « Théorème de Baire appliqué dans $X$. » ; « Complétude de $Y$. » ; « L'adhérence de l'image est l'image de l'adhérence : $\overline{T(U)}=T(\overline U)$. »

Pièges :
- `x-baire-seul` → a-justifier [hypotheses-theoreme] : Baire ne fournit qu'un intérieur non vide pour l'adhérence $\overline{T(U)}$. Passer de l'adhérence à l'image elle-même est précisément le rôle du procédé itératif, qui utilise la complétude de $X$.
- `x-ouverte-toujours` → incorrect [hypotheses-theoreme] : La surjectivité est indispensable. — Contre-exemple : $T:\mathbb R^2\to\mathbb R^2$, $T(a,b)=(a,0)$ : l'image du disque unité ouvert est $]-1,1[\times\{0\}$, qui n'est pas ouvert.
- `b-baire` par « Théorème de Baire appliqué dans $X$. » → incorrect [complet-necessaire] : Le recouvrement $\bigcup_nn\,\overline{T(U)}$ est un recouvrement de $Y$ : c'est dans $Y$, complet, que le théorème de Baire s'applique.
- `i-serie` par « Complétude de $Y$. » → incorrect [complet-necessaire] : La série $\sum x_n$ vit dans $X$ : sa convergence repose sur la complétude de $X$, et non sur celle de $Y$.
- `i-incl` par « L'adhérence de l'image est l'image de l'adhérence : $\overline{T(U)}=T(\overline U)$. » → incorrect [fermeture-espace] : En dimension infinie, l'image d'une boule fermée par un opérateur continu n'est pas fermée en général. — Contre-exemple : $X=\ell^1$, $Y=\mathbb R$, $Tx=\sum_k(1-1/k)x_k$ : l'image de la boule unité fermée est $]-1,1[$, alors que $\overline{T(U)}=[-1,1]$.

Retraits :
- `h-Y` (nécessaire) : Sans complétude de l’espace d’arrivée, le théorème de Baire ne s’applique plus. — Contre-exemple : $J=\mathrm{Id}:(C([0,1]),\|\cdot\|_\infty)\to(C([0,1]),\|\cdot\|_1)$ est continue et bijective, mais n'est pas ouverte : $g_n(x)=2x^n$ vérifie $\|g_n\|_1=\frac2{n+1}$ et $\|g_n\|_\infty=2$, donc l'image de la boule unité ne contient aucune boule de $\|\cdot\|_1$ centrée en $0$.
- `h-X` (nécessaire) : Sans complétude de l’espace de départ, la série du procédé itératif peut ne pas converger. — Contre-exemple : Soient $E$ un espace de Banach de dimension infinie, $\varphi$ une forme linéaire non continue sur $E$ (construite à l'aide d'une base algébrique) et $\|x\|'=\|x\|+|\varphi(x)|$. L'identité $(E,\|\cdot\|')\to(E,\|\cdot\|)$ est une bijection linéaire continue dont l'inverse n'est pas continu : $(E,\|\cdot\|')$ n'est pas complet.
- `h-surj` (nécessaire) : Les $n\,\overline{T(U)}$ ne recouvrent plus $Y$ en général. — Contre-exemple : $T(a,b)=(a,0)$ sur $\mathbb R^2$ : l'image du disque unité ouvert n'est pas ouverte.

Vérification : {"origin":"complement","review":"machine"}