# 19. Banach–Alaoglu (`banach-alaoglu`) — polycopié p. PDF 20, section 5.2

## Fiche

Espaces : $X$ : espace normé réel ; $X'$ : son dual topologique, muni de la norme $\|\ell\|_{X'}=\sup_{\|x\|_X\le 1}|\ell(x)|$. | $B_{X'}=\{\ell\in X' : \|\ell\|_{X'}\le 1\}$ : boule unité fermée de $X'$. | $\sigma(X',X)$ : topologie faible-*, la moins fine sur $X'$ rendant continues les évaluations $\ell\mapsto\ell(x)$, $x\in X$.

Hypothèses :
- $X$ est un espace normé ; ni sa complétude ni sa séparabilité ne sont requises.
- La boule considérée est la boule unité fermée de $X'$. — Sans elle : Si $X\neq\{0\}$, la boule ouverte $\{\|\ell\|_{X'}<1\}$ n'est pas fermée pour la norme, car $(1-1/n)\ell_0\to\ell_0$ lorsque $\|\ell_0\|_{X'}=1$ ; elle ne l'est donc pas non plus pour $\sigma(X',X)$, moins fine, et n'est pas compacte pour cette topologie séparée.
- La compacité est relative à la topologie faible-* $\sigma(X',X)$. — Sans elle : Pour la norme duale, la boule de $\ell^1=(c_0)'$ n'est pas compacte : $\|e_n-e_m\|_{\ell^1}=2$ pour $n\neq m$.

Énoncé : Pour un espace normé $X$, la boule unité de $X'$ est compacte dans la topologie faible-* $\sigma(X',X)$.

Bilan : {"autre":"Compacité de la boule unité fermée de $X'$ pour $\\sigma(X',X)$."}

Preuve dans le polycopié : idee

Plan :
1. Pour $\ell\in B_{X'}$ et $x\in X$, $|\ell(x)|\le\|x\|$ : l'application $\Phi(\ell)=(\ell(x))_{x\in X}$ envoie $B_{X'}$ dans $P=\prod_{x\in X}[-\|x\|,\|x\|]$.
2. $P$ est compact pour la topologie produit (Tychonoff).
3. $\Phi$ est un homéomorphisme de $(B_{X'},\sigma(X',X))$ sur son image : les deux topologies sont engendrées par les coordonnées $\ell\mapsto\ell(x)$.
4. L'image est l'ensemble des $\omega\in P$ vérifiant les relations de linéarité $\omega_{x+y}=\omega_x+\omega_y$, $\omega_{\lambda x}=\lambda\omega_x$ : c'est un fermé de $P$.
5. Un fermé d'un compact est compact ; on revient à $B_{X'}$ par $\Phi^{-1}$.

Vigilance :
- Compacité n'est pas compacité séquentielle : sans hypothèse supplémentaire, par exemple la séparabilité de $X$, une suite bornée de $X'$ peut n'avoir aucune sous-suite faiblement-* convergente, comme les évaluations $x\mapsto x_n$ dans $(\ell^\infty)'$.
- Faible-* signifie tester contre les éléments de $X$, non contre ceux de $X''$ : dans $\ell^1=(c_0)'$, $e_n\overset{*}{\rightharpoonup}0$ sans converger faiblement.
- En dimension infinie, la boule de $X'$ n'est pas compacte pour la norme duale.

Vérification : {"origin":"polycopie","review":"machine"}

Définition « Topologie faible-* » : Sur le dual $X'$ d'un espace normé $X$, la topologie faible-* $\sigma(X',X)$ est la topologie la moins fine rendant continues toutes les évaluations $\ell\mapsto\ell(x)$, $x\in X$. Ses voisinages de base en $\ell_0$ sont les $\{\ell : |\ell(x_i)-\ell_0(x_i)|<\varepsilon,\ 1\le i\le k\}$.

Définition « Convergence faible-* » : $\ell_n\overset{*}{\rightharpoonup}\ell$ dans $X'$ signifie $\ell_n(x)\to\ell(x)$ pour tout $x\in X$.

Définition « Espace séparable » : Un espace métrique est séparable s’il contient une partie dénombrable dense.

## Contre-exemple `ce-ba-norme` : Compacité pour la norme duale
Assertion : La boule unité fermée de $X'$ est compacte pour la norme duale.
Tâche : Dans $\ell^1=(c_0)'$, calcule $\|e_n-e_m\|_{\ell^1}$ pour $n\neq m$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\|e_n-e_m\\|_{\\ell^1}$, $n\\neq m$","expected":"2"}
Explication : Les $e_n$ sont dans la boule unité de $\ell^1$ et deux à deux à distance $2$ : aucune sous-suite n'est de Cauchy, la boule n'est donc pas compacte pour la norme. En revanche $e_n\overset{*}{\rightharpoonup}0$ pour $\sigma(\ell^1,c_0)$.

## Contre-exemple `ce-ba-non-separable` : Suite bornée sans sous-suite faiblement-* convergente
Assertion : Dans le dual de tout espace normé, une suite bornée admet une sous-suite faiblement-* convergente.
Tâche : Dans $(\ell^\infty)'$, soit $\ell_n(x)=x_n$. Pour une extraction $(n_k)$, on choisit $x\in\ell^\infty$ avec $x_{n_k}=(-1)^k$ et $x_m=0$ sinon. Calcule $\limsup_k\ell_{n_k}(x)-\liminf_k\ell_{n_k}(x)$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\limsup_k\\ell_{n_k}(x)-\\liminf_k\\ell_{n_k}(x)$","expected":"2"}
Explication : On a $\ell_{n_k}(x)=(-1)^k$, qui oscille entre $-1$ et $1$ : la sous-suite $(\ell_{n_k})$ ne converge pas faiblement-*. L'extraction étant arbitraire, aucune sous-suite ne converge, bien que la boule de $(\ell^\infty)'$ soit compacte pour $\sigma((\ell^\infty)',\ell^\infty)$ ; $\ell^\infty$ n'est pas séparable.

## Contre-exemple `ce-ba-etoile-faible` : Faible-* n’est pas faible
Assertion : Dans $X'$, la convergence faible-* entraîne la convergence faible $\sigma(X',X'')$.
Tâche : Dans $\ell^1=(c_0)'$, on teste $e_n$ contre $\phi=(1,1,1,\dots)\in\ell^\infty=(\ell^1)'$. Calcule $\langle\phi,e_n\rangle$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\langle\\phi,e_n\\rangle$","expected":"1"}
Explication : Pour $x\in c_0$, $\langle e_n,x\rangle=x_n\to 0$ : $e_n\overset{*}{\rightharpoonup}0$. Mais $\langle\phi,e_n\rangle=1$ pour tout $n$ : $(e_n)$ ne converge pas faiblement vers $0$.

## Exercice facile `banach-alaoglu.facile` : Définir la topologie faible-* sur $X'$

Énoncé : Soit $X$ un espace normé réel, $X'$ son dual topologique et, pour $x\in X$, $J_x:X'\to\mathbb R$ l'évaluation $J_x(\ell)=\ell(x)$. Définir la topologie faible-* $\sigma(X',X)$ : établir qu'il existe une topologie la moins fine rendant continues toutes les $J_x$, décrire ses voisinages de base, caractériser la convergence des suites, et montrer sur $\ell^1=(c_0)'$ qu'elle ne coïncide pas avec la topologie faible $\sigma(X',X'')$.
Source : {"doc":"polycopie","pdfPage":41,"label":"Exercice 19, facile (notation de la section 5.2, p. PDF 20)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-X` (hypothese) : $X$ est un espace normé réel ; les éléments de son dual $X'$ sont les formes linéaires continues sur $X$.
- `d-J` (definition) : Pour $x\in X$, $J_x:X'\to\mathbb R$ est l'évaluation $J_x(\ell)=\ell(x)$.
- `d-B` (definition) : $\mathcal B$ est la famille des intersections finies $\bigcap_{i=1}^kJ_{x_i}^{-1}(O_i)$, avec $k\in\mathbb N$, $x_i\in X$ et $O_i$ ouvert de $\mathbb R$ (l'intersection vide valant $X'$).
- `d-T` (definition) : $\mathcal T$ est la famille des réunions quelconques d'éléments de $\mathcal B$.
- `b-stable` (consequence) : $\mathcal B$ contient $X'$ et est stable par intersection finie.
- `t-topo` (consequence) : $\mathcal T$ est une topologie sur $X'$.
- `t-cont` (consequence) : Pour tout $x\in X$, $J_x$ est continue de $(X',\mathcal T)$ dans $\mathbb R$.
- `t-min` (inclusion) : Toute topologie $\mathcal T'$ sur $X'$ rendant continues toutes les $J_x$ contient $\mathcal T$.
- `sigma` (consequence) : $\mathcal T$ est la topologie la moins fine sur $X'$ rendant continues toutes les évaluations $J_x$, $x\in X$ : c'est, par définition, la topologie faible-* $\sigma(X',X)$.
- `v-base` (consequence) : Les ensembles $V(\ell_0;x_1,\dots,x_k;\varepsilon)=\{\ell\in X' : |\ell(x_i)-\ell_0(x_i)|<\varepsilon,\ 1\le i\le k\}$, avec $k\ge 1$, $x_i\in X$ et $\varepsilon>0$, forment une base de voisinages de $\ell_0$ pour $\sigma(X',X)$.
- `d-suite` (definition, locale) : Soient $(\ell_n)$ une suite de $X'$ et $\ell\in X'$.
- `s-dir` (consequence) : Si $\ell_n\to\ell$ pour $\sigma(X',X)$, alors $\ell_n(x)\to\ell(x)$ pour tout $x\in X$.
- `s-rec` (consequence) : Si $\ell_n(x)\to\ell(x)$ pour tout $x\in X$, alors $\ell_n\to\ell$ pour $\sigma(X',X)$.
- `s-carac` (consequence) : $\ell_n\overset{*}{\rightharpoonup}\ell$ si et seulement si $\ell_n(x)\to\ell(x)$ pour tout $x\in X$.
- `sep` (consequence) : $\sigma(X',X)$ est séparée : une suite de $X'$ a au plus une limite faible-*.
- `d-c0` (definition) : Témoin : $X=c_0$, dont le dual s'identifie à $\ell^1$ par $\langle a,x\rangle=\sum_ka_kx_k$, le dual de $\ell^1$ s'identifiant à $\ell^\infty$ ; $e_n$ désigne le $n$-ième vecteur de la base canonique de $\ell^1$.
- `c-etoile` (egalite, calcul rational) : Pour tout $x\in c_0$ : $\langle e_n,x\rangle=x_n\to 0$, donc $e_n\overset{*}{\rightharpoonup}0$ pour $\sigma(\ell^1,c_0)$.
  - valeur attendue : "0"
- `c-nf` (egalite, calcul rational) : Pour $\phi=(1,1,1,\dots)\in\ell^\infty$ : $\langle\phi,e_n\rangle=1$ pour tout $n$, donc $(e_n)$ ne converge pas vers $0$ pour $\sigma(\ell^1,\ell^\infty)$.
  - valeur attendue : "1"
- `c-diff` (consequence) : $\sigma(\ell^1,c_0)\neq\sigma(\ell^1,\ell^\infty)$ : la topologie faible-* $\sigma(X',X)$ n'est pas, en général, la topologie faible $\sigma(X',X'')$.
- `fin` (conclusion) : $\sigma(X',X)$ est la topologie la moins fine rendant continues les $J_x$, $x\in X$ ; les $V(\ell_0;x_1,\dots,x_k;\varepsilon)$ en forment une base de voisinages ; $\ell_n\overset{*}{\rightharpoonup}\ell$ équivaut à $\ell_n(x)\to\ell(x)$ pour tout $x\in X$ ; elle est séparée, et distincte en général de $\sigma(X',X'')$.
- `x-fine` (consequence, DISTRACTEUR) : $\sigma(X',X)$ est la topologie la plus fine rendant continues toutes les évaluations $J_x$.
- `x-bidual` (consequence, DISTRACTEUR) : $\ell_n\overset{*}{\rightharpoonup}\ell$ signifie $\eta(\ell_n)\to\eta(\ell)$ pour tout $\eta\in X''$.
- `x-uniforme` (consequence, DISTRACTEUR) : $\ell_n\overset{*}{\rightharpoonup}\ell$ signifie $\sup_{\|x\|_X\le 1}|\ell_n(x)-\ell(x)|\to 0$.
- `x-boule` (consequence, DISTRACTEUR) : Si $\dim X=\infty$, toute boule ouverte de $X'$ pour la norme duale est un voisinage de son centre pour $\sigma(X',X)$.

Règles :
- `h-X` + `d-J` + `d-B` ⟹ `b-stable` par « L'intersection de deux intersections finies d'ensembles $J_x^{-1}(O)$ en est encore une ; l'intersection vide est $X'$. »
- `b-stable` + `d-T` ⟹ `t-topo` par « Les réunions d'une famille contenant l'espace et stable par intersection finie forment une topologie, car $(\bigcup_iB_i)\cap(\bigcup_jB'_j)=\bigcup_{i,j}(B_i\cap B'_j)$. »
- `t-topo` + `d-J` + `d-B` + `d-T` ⟹ `t-cont` par « Pour tout ouvert $O$ de $\mathbb R$, l'image réciproque $J_x^{-1}(O)$ appartient à $\mathcal B\subset\mathcal T$. »
- `t-topo` + `d-B` + `d-T` ⟹ `t-min` par « Si $\mathcal T'$ rend continues les $J_x$, elle contient les $J_x^{-1}(O)$, donc leurs intersections finies et leurs réunions. »
- `t-cont` + `t-min` ⟹ `sigma` par « Continuité des évaluations et minimalité caractérisent la topologie la moins fine rendant ces applications continues. »
- `sigma` + `d-B` + `d-T` ⟹ `v-base` par « Chaque $V$ appartient à $\mathcal B$ et contient $\ell_0$ ; un élément de $\mathcal B$ contenant $\ell_0$ contient un $V$ : on prend pour $\varepsilon$ le plus petit des rayons d'intervalles centrés en $\ell_0(x_i)$ inclus dans les $O_i$. »
- `sigma` + `d-suite` ⟹ `s-dir` par « L’image d’une suite convergente par une application continue converge vers l’image de la limite. »
- `v-base` + `d-suite` ⟹ `s-rec` par « Pour $V(\ell;x_1,\dots,x_k;\varepsilon)$, on choisit un rang $N_i$ pour chacun des $k$ points, puis $N=\max_iN_i$. »
- `s-dir` + `s-rec` ⟹ `s-carac` par « Réunion des deux implications. »
- `h-X` + `sigma` ⟹ `sep` par « Si $\ell\neq\ell'$, il existe $x\in X$ avec $\ell(x)\neq\ell'(x)$ ; les images réciproques par $J_x$ de deux intervalles disjoints séparent $\ell$ et $\ell'$. »
- `s-carac` + `d-c0` ⟹ `c-etoile` par « Définition de $c_0$, puis caractérisation séquentielle de la convergence faible-*. »
- `d-c0` ⟹ `c-nf` par « La suite constante $\phi$ est bornée, donc $\phi\in\ell^\infty$, et $\langle\phi,e_n\rangle=\sum_k\phi_k(e_n)_k$. »
- `c-etoile` + `c-nf` ⟹ `c-diff` par « Une suite qui converge pour l’une des topologies et non pour l’autre montre qu’elles diffèrent. »
- `sigma` + `v-base` + `s-carac` + `sep` + `c-diff` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « C’est évident. » ; « Plus une topologie est fine, plus elle rend d’applications continues : la topologie cherchée est la plus fine possible. » ; « On teste la convergence contre tous les éléments du bidual $X''$. »

Pièges :
- `x-fine` → incorrect [banach-alaoglu-topologie-initiale] : La topologie la plus fine rendant continues les $J_x$ est la topologie discrète, pour laquelle toute application est continue : ce n'est pas un objet utile. La topologie faible-* est la moins fine. — Contre-exemple : Pour la topologie discrète de $X'$, toutes les $J_x$ sont continues, et seules les suites stationnaires convergent.
- `sigma` par « Plus une topologie est fine, plus elle rend d’applications continues : la topologie cherchée est la plus fine possible. » → incorrect [banach-alaoglu-topologie-initiale] : Cette justification mène à la topologie discrète. On cherche au contraire le minimum d'ouverts compatible avec la continuité des $J_x$.
- `x-bidual` → incorrect [faible-etoile] : Tester contre $X''$ définit la convergence faible $\sigma(X',X'')$. La convergence faible-* ne teste que contre les éléments de $X$. — Contre-exemple : Dans $\ell^1=(c_0)'$ : $e_n\overset{*}{\rightharpoonup}0$, alors que $\langle\phi,e_n\rangle=1$ pour $\phi=(1,1,\dots)\in\ell^\infty=(\ell^1)'$.
- `s-carac` par « On teste la convergence contre tous les éléments du bidual $X''$. » → incorrect [faible-etoile] : Les tests sont les éléments de $X$, et non ceux de $X''$ : tester contre le bidual caractérise une autre convergence.
- `x-uniforme` → incorrect [faible-etoile] : La convergence uniforme sur la boule unité de $X$ est la convergence en norme duale. La convergence faible-* est une convergence point par point. — Contre-exemple : Dans $\ell^1=(c_0)'$ : $e_n\overset{*}{\rightharpoonup}0$, mais $\|e_n\|_{\ell^1}=1$ pour tout $n$.
- `x-boule` → incorrect [faible-etoile] : Un voisinage de base n'impose qu'un nombre fini de conditions : $V(\ell_0;x_1,\dots,x_k;\varepsilon)$ contient $\ell_0+\bigcap_{i=1}^k\ker J_{x_i}$, sous-espace affine de codimension finie, non réduit à un point lorsque $\dim X'=\infty$, donc non borné. — Contre-exemple : Si $\psi\neq 0$ annule $x_1,\dots,x_k$, les formes $\ell_0+n\psi$ sont toutes dans $V(\ell_0;x_1,\dots,x_k;\varepsilon)$, et $\|n\psi\|_{X'}\to\infty$ : aucune boule de centre $\ell_0$ ne contient ce voisinage de base.
- `t-topo` par « C’est évident. » → a-justifier [justification-absente] : Une famille d'ensembles n'est pas d'office une topologie : vérifie la stabilité par intersection finie et par réunion.
- `s-rec` par « C’est évident. » → a-justifier [quantificateurs] : Le rang doit convenir simultanément aux $k$ points qui définissent le voisinage : prends le maximum d'un nombre fini de rangs.

Retraits :
- `t-min` (nécessaire) : La seule continuité des évaluations ne singularise pas $\sigma(X',X)$ : plusieurs topologies la vérifient. — Contre-exemple : La topologie de la norme duale et la topologie discrète rendent aussi continues toutes les $J_x$ ; lorsque $\dim X=\infty$, elles sont strictement plus fines que $\sigma(X',X)$.
- `d-c0` (nécessaire) : Sans espace témoin, rien ne distingue les deux topologies : elles coïncident pour certains espaces. — Contre-exemple : Si $X$ est réflexif, par exemple $X=\ell^2$, tout élément de $X''$ est une évaluation en un point de $X$, donc $\sigma(X',X)=\sigma(X',X'')$.

Calculs fermés : [{"kind":"choice","prompt":"Contre quels éléments teste-t-on la convergence faible-* d'une suite de $X'$ ?","options":["Les éléments de $X$, un par un","Les éléments de $X''$","Les éléments de $X'$","Les éléments de la boule unité de $X$, uniformément"],"correct":[0],"explanation":"$\\ell_n\\overset{*}{\\rightharpoonup}\\ell$ signifie $\\ell_n(x)\\to\\ell(x)$ pour tout $x\\in X$, sans uniformité."}]

Solution :
**Construction.** Pour $x\in X$, posons $J_x(\ell)=\ell(x)$. La famille $\mathcal B$ des intersections finies d'ensembles $J_x^{-1}(O)$, $O$ ouvert de $\mathbb R$, contient $X'$ (intersection vide) et est stable par intersection finie. Ses réunions forment donc une topologie $\mathcal T$, car $(\bigcup_iB_i)\cap(\bigcup_jB'_j)=\bigcup_{i,j}(B_i\cap B'_j)$.

**Minimalité.** Chaque $J_x$ est continue pour $\mathcal T$, puisque $J_x^{-1}(O)\in\mathcal B$. Si $\mathcal T'$ rend continues toutes les $J_x$, elle contient les $J_x^{-1}(O)$, donc leurs intersections finies et leurs réunions : $\mathcal T\subset\mathcal T'$. Ainsi $\mathcal T$ est la topologie la moins fine rendant les $J_x$ continues : c'est $\sigma(X',X)$. La topologie *la plus fine* ayant cette propriété serait la topologie discrète, sans intérêt.

**Voisinages.** Les $V(\ell_0;x_1,\dots,x_k;\varepsilon)=\{\ell : |\ell(x_i)-\ell_0(x_i)|<\varepsilon,\ i\le k\}$ appartiennent à $\mathcal B$ et contiennent $\ell_0$. Réciproquement, si $\ell_0\in\bigcap_iJ_{x_i}^{-1}(O_i)$, chaque $O_i$ contient un intervalle $]\ell_0(x_i)-\varepsilon_i,\ell_0(x_i)+\varepsilon_i[$, et $\varepsilon=\min_i\varepsilon_i$ convient.

**Suites.** Si $\ell_n\to\ell$ pour $\sigma(X',X)$, la continuité de $J_x$ donne $\ell_n(x)\to\ell(x)$. Réciproquement, si $\ell_n(x)\to\ell(x)$ pour tout $x$, un voisinage $V(\ell;x_1,\dots,x_k;\varepsilon)$ contient $\ell_n$ pour $n\ge\max_iN_i$. Donc $\ell_n\overset{*}{\rightharpoonup}\ell$ si et seulement si $\ell_n(x)\to\ell(x)$ pour tout $x\in X$.

**Séparation.** Si $\ell\neq\ell'$, il existe $x$ avec $\ell(x)\neq\ell'(x)$, et deux intervalles disjoints autour de ces valeurs donnent, par $J_x^{-1}$, deux ouverts disjoints.

**Ce n'est pas la topologie faible.** Pour $X=c_0$, $X'=\ell^1$ et $X''=\ell^\infty$ : $\langle e_n,x\rangle=x_n\to 0$ pour tout $x\in c_0$, donc $e_n\overset{*}{\rightharpoonup}0$ ; mais $\phi=(1,1,\dots)\in\ell^\infty$ donne $\langle\phi,e_n\rangle=1$. Ainsi $\sigma(\ell^1,c_0)\neq\sigma(\ell^1,\ell^\infty)$.

Indices :
1. Quelles applications de $X'$ dans $\mathbb R$ doivent devenir continues, et combien d'ouverts faut-il au minimum pour cela ?
2. Pars des images réciproques $J_x^{-1}(O)$, prends leurs intersections finies, puis les réunions. Pour les suites, traite séparément les deux implications.
3. Pour distinguer $\sigma(X',X)$ de $\sigma(X',X'')$, prends $X=c_0$ : teste $e_n$ contre $x\in c_0$, puis contre la suite constante $(1,1,\dots)\in\ell^\infty$.

Erreurs fréquentes :
- Tester la convergence faible-* contre les éléments de $X''$.
- Écrire « la plus fine » au lieu de « la moins fine ».
- Confondre convergence point par point et convergence uniforme sur la boule unité.
- Choisir un rang qui ne convient qu’à un seul des points définissant le voisinage.

Variante : Dans $\ell^\infty=(\ell^1)'$, on pose $s_n=(0,\dots,0,1,1,\dots)$, les $n-1$ premiers termes étant nuls. Montrer que $s_n\overset{*}{\rightharpoonup}0$ pour $\sigma(\ell^\infty,\ell^1)$, que $\|s_n\|_{\ell^\infty}=1$ pour tout $n$, et que $(s_n)$ ne converge pas vers $0$ pour la topologie faible $\sigma(\ell^\infty,(\ell^\infty)')$.

Solution de la variante : Pour $x\in\ell^1$, $\langle s_n,x\rangle=\sum_{k\ge n}x_k$ est le reste d'une série absolument convergente, donc tend vers $0$ : $s_n\overset{*}{\rightharpoonup}0$. Par ailleurs $\|s_n\|_{\ell^\infty}=1$. Sur le sous-espace $c$ des suites convergentes, la forme $\lambda(x)=\lim_kx_k$ vérifie $|\lambda(x)|\le\|x\|_{\ell^\infty}$ ; Hahn–Banach la prolonge en $\Lambda\in(\ell^\infty)'$. Comme $s_n\in c$ et $\lim_k(s_n)_k=1$, on a $\Lambda(s_n)=1$ pour tout $n$ : $(s_n)$ ne converge pas faiblement vers $0$. La convergence faible-* n'entraîne ni la convergence faible ni la convergence en norme.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `banach-alaoglu.intermediaire` : Extraction faible-* dans $L^\infty$, prédual séparable

Énoncé : Soit $\Omega$ un ouvert de $\mathbb R^d$ et $(u_n)$ une suite de $L^\infty(\Omega)$ telle que $\|u_n\|_{L^\infty(\Omega)}\le M$ pour tout $n$. On admet que $L^1(\Omega)$ est séparable et que $v\mapsto\big(\varphi\mapsto\int_\Omega v\varphi\big)$ est une isométrie bijective de $L^\infty(\Omega)$ sur $(L^1(\Omega))'$. Expliquer pourquoi il existe une sous-suite $(u_{n_k})$ et $u\in L^\infty(\Omega)$, $\|u\|_{L^\infty(\Omega)}\le M$, tels que $u_{n_k}\overset{*}{\rightharpoonup}u$, c'est-à-dire $\int_\Omega u_{n_k}\varphi\to\int_\Omega u\varphi$ pour toute $\varphi\in L^1(\Omega)$.
Source : {"doc":"polycopie","pdfPage":41,"label":"Exercice 19, intermédiaire"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-sep` (hypothese) : $L^1(\Omega)$ est séparable.
- `h-dual` (hypothese) : $v\mapsto\langle v,\cdot\rangle$, où $\langle v,\varphi\rangle=\int_\Omega v\varphi$, est une isométrie bijective de $L^\infty(\Omega)$ sur $(L^1(\Omega))'$.
- `h-borne` (hypothese) : $\|u_n\|_{L^\infty(\Omega)}\le M$ pour tout $n$.
- `dense` (consequence) : Il existe une suite $(\varphi_j)_{j\ge 1}$ dense dans $L^1(\Omega)$.
- `d-borne` (inegalite) : Pour tous $j$ et $n$ : $\big|\int_\Omega u_n\varphi_j\big|\le M\|\varphi_j\|_{L^1(\Omega)}$.
- `d-diag` (consequence) : Il existe une sous-suite $(u_{n_k})$ telle que $\big(\int_\Omega u_{n_k}\varphi_j\big)_k$ converge pour tout $j$.
- `d-cauchy` (consequence) : Pour toute $\varphi\in L^1(\Omega)$, la suite $\big(\int_\Omega u_{n_k}\varphi\big)_k$ est de Cauchy.
- `d-forme` (consequence) : $\Lambda(\varphi)=\lim_k\int_\Omega u_{n_k}\varphi$ définit une forme linéaire sur $L^1(\Omega)$, avec $|\Lambda(\varphi)|\le M\|\varphi\|_{L^1(\Omega)}$.
- `m-compact` (application-theoreme) : $B_M=\{\ell\in(L^1(\Omega))' : \|\ell\|\le M\}$ est compacte pour $\sigma\big((L^1)',L^1\big)$.
- `m-distance` (consequence) : $d(\ell,\ell')=\sum_{j\ge 1}2^{-j}\dfrac{|(\ell-\ell')(\varphi_j)|}{1+\|\varphi_j\|_{L^1}}$ est une distance sur $B_M$, et l'identité de $(B_M,\sigma)$ dans $(B_M,d)$ est continue.
- `m-metrisable` (consequence) : L'identité est un homéomorphisme : $(B_M,\sigma)$ est métrisable.
- `m-extrait` (consequence) : La suite des formes $\langle u_n,\cdot\rangle$, contenue dans $B_M$, admet une sous-suite convergeant pour $\sigma\big((L^1)',L^1\big)$ vers un $\Lambda\in B_M$.
- `rep` (consequence) : Il existe $u\in L^\infty(\Omega)$, avec $\|u\|_{L^\infty(\Omega)}\le M$, tel que $\Lambda(\varphi)=\int_\Omega u\varphi$ pour toute $\varphi\in L^1(\Omega)$.
- `fin` (conclusion) : Il existe une sous-suite $(u_{n_k})$ et $u\in L^\infty(\Omega)$, $\|u\|_{L^\infty(\Omega)}\le M$, tels que $\int_\Omega u_{n_k}\varphi\to\int_\Omega u\varphi$ pour toute $\varphi\in L^1(\Omega)$.
- `x-forte` (consequence, DISTRACTEUR) : Une sous-suite de $(u_n)$ converge dans $L^\infty(\Omega)$ pour la norme.
- `x-pp` (consequence, DISTRACTEUR) : Une sous-suite de $(u_n)$ converge presque partout.
- `x-reflexif` (consequence, DISTRACTEUR) : $L^\infty(\Omega)$ est réflexif : une sous-suite de $(u_n)$ converge faiblement dans $L^\infty(\Omega)$.
- `x-sans-sep` (consequence, DISTRACTEUR) : La compacité faible-* de la boule suffit : dans le dual de tout espace normé, une suite bornée admet une sous-suite faiblement-* convergente.

Règles :
- `h-sep` ⟹ `dense` par « Définition de la séparabilité. »
- `h-borne` + `dense` ⟹ `d-borne` par « Hölder $L^\infty$–$L^1$ et borne uniforme sur $(u_n)$. » (chemin diagonale)
- `d-borne` ⟹ `d-diag` par « Bolzano–Weierstrass sur chaque suite réelle bornée $\big(\int_\Omega u_n\varphi_j\big)_n$, puis extraction diagonale. » (chemin diagonale)
- `d-diag` + `dense` + `h-borne` ⟹ `d-cauchy` par « Pour $\varepsilon>0$, choisir $j$ avec $\|\varphi-\varphi_j\|_{L^1}\le\varepsilon$ : $\big|\int_\Omega(u_{n_k}-u_{n_l})\varphi\big|\le 2M\varepsilon+\big|\int_\Omega(u_{n_k}-u_{n_l})\varphi_j\big|$. » (chemin diagonale)
- `d-cauchy` + `h-borne` ⟹ `d-forme` par « $\mathbb R$ est complet ; la linéarité et la majoration $\big|\int_\Omega u_{n_k}\varphi\big|\le M\|\varphi\|_{L^1}$ passent à la limite. » (chemin diagonale)
- `d-forme` + `h-dual` ⟹ `rep` par « Identification isométrique de $L^\infty(\Omega)$ au dual de $L^1(\Omega)$. » (chemin diagonale)
- `h-dual` ⟹ `m-compact` par « Théorème de Banach–Alaoglu, appliqué à l'espace normé $L^1(\Omega)$, puis homothétie de rapport $M$. [banach-alaoglu] » (chemin metrisation)
- `m-compact` + `dense` ⟹ `m-distance` par « Chaque terme est majoré par $2^{-j}\cdot 2M$ et continu pour $\sigma$ : la série converge uniformément ; deux formes égales sur une partie dense sont égales. » (chemin metrisation)
- `m-compact` + `m-distance` ⟹ `m-metrisable` par « Une bijection continue d’un espace compact sur un espace séparé est un homéomorphisme. » (chemin metrisation)
- `m-metrisable` + `h-borne` + `h-dual` ⟹ `m-extrait` par « Un espace métrique compact est séquentiellement compact ; $\|u_n\|_{L^\infty}\le M$ place la suite dans $B_M$. » (chemin metrisation)
- `m-extrait` + `h-dual` ⟹ `rep` par « Identification isométrique de $L^\infty(\Omega)$ au dual de $L^1(\Omega)$. » (chemin metrisation)
- `rep` + `d-forme` ⟹ `fin` par « Définition de $\Lambda$ comme limite, puis représentation par $u$. » (chemin diagonale)
- `rep` + `m-extrait` ⟹ `fin` par « Définition de $\Lambda$ comme limite, puis représentation par $u$. » (chemin metrisation)

Justifications sans règle (séduisantes ou fausses) : « Extraction faible en espace réflexif, appliquée à $L^\infty(\Omega)$. » ; « C’est évident. »

Pièges :
- `x-forte` → incorrect [bornee-non-convergente] : La boule de $L^\infty(\Omega)$ n'est pas compacte pour la norme : une suite bornée peut avoir ses termes deux à deux à distance fixe. — Contre-exemple : Fonctions de Rademacher sur $]0,1[$ : $r_n(x)=\operatorname{sign}\sin(2^n\pi x)$. Pour $n\neq m$, $r_n\neq r_m$ sur un ensemble de mesure $1/2$, donc $\|r_n-r_m\|_{L^\infty}=2$.
- `x-pp` → incorrect [convergence-pp] : La convergence faible-* n'apporte aucune information ponctuelle. — Contre-exemple : Si $r_{n_k}\to f$ presque partout, la convergence dominée donne $r_{n_k}\to f$ dans $L^1(]0,1[)$, alors que $\|r_n-r_m\|_{L^1}=1$ pour $n\neq m$.
- `x-reflexif` → incorrect [faible-etoile] : $L^\infty(\Omega)$ n'est pas réflexif : c'est précisément pourquoi on utilise la topologie faible-*, qui ne teste que contre $L^1(\Omega)$. — Contre-exemple : Sur $]0,1[$, $u_n=\mathbb 1_{]0,1/n[}$ : une limite faible serait nulle (tests contre $L^1$), alors qu'un prolongement de Hahn–Banach $\Lambda$ de $v\mapsto\lim_{x\to 0^+}v(x)$ vérifie $\Lambda(u_n)=1$ pour tout $n$.
- `d-diag` par « Extraction faible en espace réflexif, appliquée à $L^\infty(\Omega)$. » → incorrect [faible-etoile] : $L^\infty(\Omega)$ n'est pas réflexif : ce théorème ne s'applique pas ici. L'extraction repose sur la séparabilité de $L^1(\Omega)$.
- `x-sans-sep` → incorrect [banach-alaoglu-sequentiel] : Compacité et compacité séquentielle diffèrent hors du cadre métrisable : sans hypothèse supplémentaire, telle que la séparabilité du prédual, l’extraction de suites peut échouer. — Contre-exemple : Dans $(\ell^\infty)'$, soit $\ell_n(x)=x_n$. Pour toute extraction $(n_k)$, le choix $x_{n_k}=(-1)^k$ et $x_m=0$ sinon donne $\ell_{n_k}(x)=(-1)^k$, qui ne converge pas.
- `d-forme` par « C’est évident. » → a-justifier [justification-absente] : La limite existe-t-elle pour toute $\varphi$, ou seulement pour les $\varphi_j$ ? Et pourquoi la forme limite est-elle continue ?

Retraits :
- `h-sep` (nécessaire) : Les deux voies utilisent une suite dense : sans elle, le procédé diagonal n’est plus disponible et la boule duale n’est plus métrisable pour la topologie faible-*. — Contre-exemple : Pour $X=\ell^\infty$, non séparable, les $\ell_n(x)=x_n$ forment une suite bornée de $X'$ sans sous-suite faiblement-* convergente : pour $x_{n_k}=(-1)^k$, $\ell_{n_k}(x)=(-1)^k$.
- `h-borne` (nécessaire) : Sans borne uniforme, les intégrales testées peuvent diverger. — Contre-exemple : Sur $\Omega=]0,1[$, $u_n=n$ et $\varphi=1$ : $\int_\Omega u_n\varphi=n\to+\infty$, et aucune sous-suite ne converge faiblement-*.

Calculs fermés : [{"kind":"rational","prompt":"Pour les fonctions de Rademacher $r_n$ sur $]0,1[$ et $n\\neq m$, valeur de $\\|r_n-r_m\\|_{L^\\infty(]0,1[)}$","expected":"2"}]

Solution :
**Une partie dense.** $L^1(\Omega)$ étant séparable, soit $(\varphi_j)$ dense dans $L^1(\Omega)$.

**Voie diagonale.** Pour chaque $j$, $\big|\int_\Omega u_n\varphi_j\big|\le M\|\varphi_j\|_{L^1}$ : la suite réelle est bornée. Bolzano–Weierstrass et l'extraction diagonale donnent $(n_k)$ telle que $\int_\Omega u_{n_k}\varphi_j$ converge pour tout $j$. Pour $\varphi\in L^1(\Omega)$ et $\varepsilon>0$, choisissons $j$ avec $\|\varphi-\varphi_j\|_{L^1}\le\varepsilon$ : $\big|\int_\Omega(u_{n_k}-u_{n_l})\varphi\big|\le 2M\varepsilon+\big|\int_\Omega(u_{n_k}-u_{n_l})\varphi_j\big|$, d'où une suite de Cauchy. Sa limite $\Lambda(\varphi)$ est linéaire en $\varphi$ et vérifie $|\Lambda(\varphi)|\le M\|\varphi\|_{L^1}$.

**Voie par Banach–Alaoglu.** La boule $B_M$ de $(L^1)'$ est compacte pour $\sigma((L^1)',L^1)$. La formule $d(\ell,\ell')=\sum_j2^{-j}|(\ell-\ell')(\varphi_j)|/(1+\|\varphi_j\|_{L^1})$ définit une distance sur $B_M$ (deux formes égales sur une partie dense sont égales), et l'identité $(B_M,\sigma)\to(B_M,d)$ est continue, la série convergeant uniformément. Bijection continue d'un compact sur un séparé, c'est un homéomorphisme : $(B_M,\sigma)$ est un compact métrisable, donc séquentiellement compact.

**Représentation.** Dans les deux cas, la forme limite $\Lambda$, de norme au plus $M$, s'écrit $\Lambda(\varphi)=\int_\Omega u\varphi$ avec $\|u\|_{L^\infty}\le M$, par l'identification $L^\infty=(L^1)'$.

**Ce qu'on n'obtient pas.** Ni convergence en norme $L^\infty$, ni convergence presque partout (fonctions de Rademacher), ni convergence faible : $L^\infty$ n'est pas réflexif. Sans séparabilité, l'extraction de suites peut échouer, par exemple dans $(\ell^\infty)'$.

Indices :
1. Quel espace teste la convergence faible-* dans $L^\infty(\Omega)$, et quelle propriété de cet espace rend une extraction de suites possible ?
2. Une suite dense $(\varphi_j)$ réduit le problème à une famille dénombrable de suites réelles bornées : pense au procédé diagonal.
3. Après la diagonale, l'inégalité $\big|\int(u_{n_k}-u_{n_l})\varphi\big|\le 2M\|\varphi-\varphi_j\|_{L^1}+\big|\int(u_{n_k}-u_{n_l})\varphi_j\big|$ donne une suite de Cauchy pour toute $\varphi$.

Erreurs fréquentes :
- Invoquer la réflexivité de $L^\infty$, qui est fausse.
- Extraire une sous-suite de la seule compacité faible-*, sans séparabilité.
- Déduire une convergence presque partout de la convergence faible-*.

Variante : Soit $X$ un espace normé réel. Démontrer le théorème de Banach–Alaoglu : la boule unité fermée $B_{X'}$ de $X'$ est compacte pour $\sigma(X',X)$, en suivant l'idée du polycopié (produit d'intervalles compacts, relations de linéarité fermées).

Solution de la variante : Pour $\ell\in B_{X'}$ et $x\in X$, $|\ell(x)|\le\|x\|$ : l'application $\Phi(\ell)=(\ell(x))_{x\in X}$ envoie $B_{X'}$ dans $P=\prod_{x\in X}[-\|x\|,\|x\|]$, compact par Tychonoff. $\Phi$ est injective, et c'est un homéomorphisme de $(B_{X'},\sigma(X',X))$ sur son image munie de la topologie induite, car les deux topologies sont engendrées par les coordonnées $\ell\mapsto\ell(x)$. L'image est $L=\{\omega\in P : \omega_{x+y}=\omega_x+\omega_y,\ \omega_{\lambda x}=\lambda\omega_x\}$ : un élément de $L$ définit une forme linéaire de norme au plus $1$. Chaque relation est l'égalité de deux fonctions continues d'un nombre fini de coordonnées, donc $L$ est fermé dans le compact $P$, donc compact. On conclut par $\Phi^{-1}$, continue sur $L$.

Graphe de la variante :
But : `fin` — usage : demonstration

Nœuds :
- `h-X` (hypothese) : $X$ est un espace normé réel et $B_{X'}=\{\ell\in X' : \|\ell\|_{X'}\le 1\}$.
- `d-P` (definition) : $P=\prod_{x\in X}[-\|x\|,\|x\|]$, muni de la topologie produit.
- `d-Phi` (definition) : $\Phi:B_{X'}\to\mathbb R^X$, $\Phi(\ell)=(\ell(x))_{x\in X}$.
- `d-L` (definition) : $L=\{\omega\in P : \omega_{x+y}=\omega_x+\omega_y\ \text{et}\ \omega_{\lambda x}=\lambda\omega_x\ \text{pour tous}\ x,y\in X,\ \lambda\in\mathbb R\}$.
- `p-compact` (application-theoreme) : $P$ est compact.
- `p-image` (inclusion) : $\Phi(B_{X'})\subset P$.
- `p-inj` (consequence) : $\Phi$ est injective.
- `p-homeo` (consequence) : $\Phi$ est un homéomorphisme de $(B_{X'},\sigma(X',X))$ sur $\Phi(B_{X'})$, muni de la topologie induite par $P$.
- `l-ferme` (consequence) : $L$ est fermé dans $P$.
- `l-egal` (egalite) : $\Phi(B_{X'})=L$.
- `l-compact` (consequence) : $L$ est compact.
- `fin` (conclusion) : $B_{X'}$ est compacte pour la topologie faible-* $\sigma(X',X)$.
- `x-norme` (consequence, DISTRACTEUR) : $B_{X'}$ est compacte pour la norme duale.
- `x-suites` (consequence, DISTRACTEUR) : Toute suite de $B_{X'}$ admet une sous-suite convergente pour $\sigma(X',X)$.

Règles :
- `d-P` ⟹ `p-compact` par « Théorème de Tychonoff : un produit de compacts est compact. [tychonoff] »
- `h-X` + `d-P` + `d-Phi` ⟹ `p-image` par « Pour $\ell\in B_{X'}$ : $|\ell(x)|\le\|\ell\|_{X'}\|x\|\le\|x\|$. »
- `d-Phi` ⟹ `p-inj` par « Deux formes ayant la même valeur en chaque point de $X$ sont égales. »
- `p-inj` + `d-Phi` ⟹ `p-homeo` par « $\sigma(X',X)$ et la topologie produit sont engendrées par les mêmes applications coordonnées $\ell\mapsto\ell(x)$. »
- `d-L` + `d-P` ⟹ `l-ferme` par « Chaque relation de linéarité est l’égalité de deux fonctions continues d’un nombre fini de coordonnées ; une intersection de fermés est fermée. »
- `p-image` + `d-L` + `d-Phi` + `h-X` ⟹ `l-egal` par « $\Phi(\ell)$ satisfait les relations de linéarité ; un $\omega\in L$ définit $\ell(x)=\omega_x$, linéaire et vérifiant $|\ell(x)|\le\|x\|$. »
- `p-compact` + `l-ferme` ⟹ `l-compact` par « Un fermé d’un compact est compact. »
- `l-compact` + `l-egal` + `p-homeo` ⟹ `fin` par « $\Phi^{-1}$ est continue de $L$ dans $(B_{X'},\sigma(X',X))$, et l'image continue d'un compact est compacte. »

Justifications sans règle (séduisantes ou fausses) : « Caractérisation séquentielle des fermés. » ; « Théorème de Banach–Alaoglu. »

Pièges :
- `l-ferme` par « Caractérisation séquentielle des fermés. » → incorrect [banach-alaoglu-sequentiel] : Pour $X\neq\{0\}$, $P$ est un produit non dénombrable d'intervalles non réduits à un point : il n'est pas métrisable, et les suites ne caractérisent pas ses fermés.
- `x-norme` → incorrect [faible-fort] : La compacité est relative à la topologie faible-*. Pour la norme, la boule duale n’est compacte qu’en dimension finie. — Contre-exemple : Dans $\ell^1=(c_0)'$, $\|e_n-e_m\|_{\ell^1}=2$ pour $n\neq m$ : aucune sous-suite de $(e_n)$ n'est de Cauchy.
- `x-suites` → incorrect [banach-alaoglu-sequentiel] : La compacité obtenue n’est pas séquentielle en général ; elle le devient par exemple lorsque $X$ est séparable. — Contre-exemple : $X=\ell^\infty$, $\ell_n(x)=x_n$ : pour toute extraction, $x_{n_k}=(-1)^k$ donne $\ell_{n_k}(x)=(-1)^k$.

Retraits :
- `p-image` (nécessaire) : Sans borne, les facteurs ne sont plus compacts et Tychonoff ne s'applique plus : $X'$ tout entier n'est pas compact. — Contre-exemple : Si $X\neq\{0\}$, soit $\ell_0\in X'$ et $x\in X$ avec $\ell_0(x)\neq 0$ : $J_x$ est continue pour $\sigma(X',X)$ et non bornée sur $X'$ (elle prend la valeur $n\ell_0(x)$ en $n\ell_0$), donc $X'$ n'est pas compact.

Vérification : {"origin":"complement","review":"machine"}

## Exercice difficile `banach-alaoglu.difficile` : Faible-* dans $L^\infty$ contre forte dans $L^2$

Énoncé : Soit $\Omega=]0,2\pi[$. Comparer les informations fournies par la convergence faible-* dans $L^\infty(\Omega)$ et par la convergence forte dans $L^2(\Omega)$. (a) Si $\|u_n\|_{L^\infty(\Omega)}\le M$ pour tout $n$ et $u_n\to u$ fortement dans $L^2(\Omega)$, montrer que $u_n\overset{*}{\rightharpoonup}u$ dans $L^\infty(\Omega)$ et que $u_n^2\to u^2$ fortement dans $L^2(\Omega)$. (b) Montrer que $v_n(x)=\sin(nx)$ vérifie $v_n\overset{*}{\rightharpoonup}0$ dans $L^\infty(\Omega)$, qu'aucune sous-suite de $(v_n)$ ne converge fortement dans $L^2(\Omega)$, et que $v_n^2$ ne converge pas vers $0$.
Source : {"doc":"polycopie","pdfPage":41,"label":"Exercice 19, difficile ; exemple de la section 5.1 (p. PDF 20)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-Om` (hypothese) : $\Omega=]0,2\pi[$ ; $L^2(\Omega)\subset L^1(\Omega)$ et $L^2(\Omega)$ est dense dans $L^1(\Omega)$.
- `h-M` (hypothese) : $\|u_n\|_{L^\infty(\Omega)}\le M$ pour tout $n$.
- `h-fort` (hypothese) : $u_n\to u$ fortement dans $L^2(\Omega)$.
- `d-v` (definition) : $v_n(x)=\sin(nx)$ pour $n\ge 1$ et $x\in\Omega$.
- `a-borne` (inegalite) : $\|u\|_{L^\infty(\Omega)}\le M$.
- `a-test` (consequence) : Pour toute $\psi\in L^2(\Omega)$ : $\int_\Omega(u_n-u)\psi\to 0$.
- `a-etoile` (consequence) : $u_n\overset{*}{\rightharpoonup}u$ dans $L^\infty(\Omega)$ : $\int_\Omega u_n\varphi\to\int_\Omega u\varphi$ pour toute $\varphi\in L^1(\Omega)$.
- `a-carre` (inegalite) : $\|u_n^2-u^2\|_{L^2(\Omega)}\le 2M\|u_n-u\|_{L^2(\Omega)}$, donc $u_n^2\to u^2$ fortement dans $L^2(\Omega)$.
- `b-etoile` (consequence) : $v_n\overset{*}{\rightharpoonup}0$ dans $L^\infty(\Omega)$.
- `b-norme` (egalite, calcul rational) : $\int_0^{2\pi}v_n(x)^2\,dx=\pi$ pour tout $n\ge 1$.
  - valeur attendue : "1"
- `b-nonfort` (consequence) : Aucune sous-suite de $(v_n)$ ne converge fortement dans $L^2(\Omega)$.
- `b-carre` (egalite, calcul rational) : $v_n^2=\tfrac12-\tfrac12\cos(2nx)\overset{*}{\rightharpoonup}\tfrac12$ dans $L^\infty(\Omega)$ : $v_n^2$ ne converge pas vers $0=(\lim v_n)^2$.
  - valeur attendue : "1/2"
- `fin` (conclusion) : Pour une suite bornée de $L^\infty(\Omega)$, la convergence forte dans $L^2(\Omega)$ entraîne la convergence faible-* et le passage à la limite dans $u_n^2$ ; la convergence faible-* n'entraîne ni la convergence forte dans $L^2(\Omega)$, même pour une sous-suite, ni la convergence de $u_n^2$ vers le carré de la limite.
- `x-rec` (consequence, DISTRACTEUR) : Si $(u_n)$ est bornée dans $L^\infty(\Omega)$ et $u_n\overset{*}{\rightharpoonup}u$, alors $u_n\to u$ fortement dans $L^2(\Omega)$.
- `x-Linfty` (consequence, DISTRACTEUR) : Sous les hypothèses de (a), $u_n\to u$ dans $L^\infty(\Omega)$ pour la norme.
- `x-sans-borne` (consequence, DISTRACTEUR) : La seule convergence forte dans $L^2(\Omega)$, sans borne dans $L^\infty(\Omega)$, entraîne $u_n\overset{*}{\rightharpoonup}u$ dans $L^\infty(\Omega)$.
- `x-carre0` (consequence, DISTRACTEUR) : $v_n^2\overset{*}{\rightharpoonup}0$ dans $L^\infty(\Omega)$.

Règles :
- `h-fort` + `h-M` ⟹ `a-borne` par « Une sous-suite converge presque partout ; passage à la limite dans $|u_{n_k}|\le M$, hors d'un ensemble négligeable. »
- `h-fort` ⟹ `a-test` par « Cauchy–Schwarz : $\big|\int_\Omega(u_n-u)\psi\big|\le\|u_n-u\|_{L^2}\|\psi\|_{L^2}$. [cauchy-schwarz] »
- `a-test` + `a-borne` + `h-M` + `h-Om` ⟹ `a-etoile` par « Pour $\varphi\in L^1$ et $\psi\in L^2$ avec $\|\varphi-\psi\|_{L^1}\le\varepsilon$ : $\big|\int_\Omega(u_n-u)\varphi\big|\le 2M\varepsilon+\big|\int_\Omega(u_n-u)\psi\big|$. »
- `h-fort` + `h-M` + `a-borne` ⟹ `a-carre` par « $|u_n^2-u^2|=|u_n+u|\,|u_n-u|\le 2M|u_n-u|$ presque partout. »
- `d-v` ⟹ `b-etoile` par « Lemme de Riemann–Lebesgue : $\int_0^{2\pi}\varphi(x)\sin(nx)\,dx\to 0$ pour toute $\varphi\in L^1(]0,2\pi[)$. [riemann-lebesgue] »
- `d-v` ⟹ `b-norme` par « $\sin^2(nx)=\tfrac12\big(1-\cos(2nx)\big)$ et $\int_0^{2\pi}\cos(2nx)\,dx=0$. »
- `b-etoile` + `b-norme` + `h-Om` ⟹ `b-nonfort` par « Si $v_{n_k}\to w$ dans $L^2$, tester contre $\psi\in L^2\subset L^1$ donne $\int_\Omega w\psi=\lim_k\int_\Omega v_{n_k}\psi=0$, donc $w=0$ ; or $\|v_{n_k}\|_{L^2}^2=\pi$. »
- `d-v` ⟹ `b-carre` par « Décomposition $\sin^2(nx)=\tfrac12-\tfrac12\cos(2nx)$, puis Riemann–Lebesgue pour $\cos(2nx)$. [riemann-lebesgue] »
- `a-etoile` + `a-carre` + `b-etoile` + `b-nonfort` + `b-carre` ⟹ `fin` par « Réunion des deux parties. »

Justifications sans règle (séduisantes ou fausses) : « Pour une suite bornée dans $L^\infty$, la convergence faible-* entraîne la convergence forte dans $L^2$. » ; « L'application $s\mapsto s^2$ est continue, donc elle commute avec toute limite. » ; « C’est évident. »

Pièges :
- `x-rec` → incorrect [faible-fort] : La convergence faible-* ne contrôle pas les oscillations : elle n'entraîne pas la convergence forte, même pour une suite bornée. — Contre-exemple : $v_n=\sin(n\cdot)$ : $\|v_n\|_{L^\infty}\le 1$ et $v_n\overset{*}{\rightharpoonup}0$, mais $\|v_n\|_{L^2}^2=\pi$.
- `b-nonfort` par « Pour une suite bornée dans $L^\infty$, la convergence faible-* entraîne la convergence forte dans $L^2$. » → incorrect [faible-fort] : Cette justification est fausse, et elle conduirait même à la conclusion contraire : $(v_n)$ est bornée dans $L^\infty$, faiblement-* convergente, et ne converge pas fortement.
- `x-Linfty` → incorrect [faible-fort] : La convergence dans $L^2$ ne contrôle pas le supremum essentiel : une bosse de hauteur fixe et de support évanescent tend vers $0$ dans $L^2$. — Contre-exemple : $u_n=\mathbb 1_{]0,1/n[}$ : $\|u_n\|_{L^\infty}=1$, $\|u_n\|_{L^2}^2=1/n\to 0$, et $\|u_n-0\|_{L^\infty}=1$.
- `x-sans-borne` → incorrect [hypotheses-theoreme] : La borne dans $L^\infty$ sert à passer des tests de $L^2$ à tous les tests de $L^1$ ; sans elle, l'argument de densité tombe. — Contre-exemple : $w_n=n\,\mathbb 1_{]0,n^{-3}[}$ : $\|w_n\|_{L^2}^2=1/n\to 0$, mais pour $\varphi(x)=x^{-3/4}\in L^1(\Omega)$, $\int_\Omega w_n\varphi=4n^{1/4}\to+\infty$.
- `x-carre0` → incorrect [nonlinearite-limite-faible] : La convergence faible-* ne passe pas à travers la non-linéarité $s\mapsto s^2$. — Contre-exemple : Pour $\varphi=1\in L^1(\Omega)$ : $\int_\Omega v_n^2\varphi=\pi$ pour tout $n$, et non $0$.
- `a-carre` par « L'application $s\mapsto s^2$ est continue, donc elle commute avec toute limite. » → a-justifier [hypotheses-theoreme] : La continuité ponctuelle de $s\mapsto s^2$ ne fournit aucune estimation dans $L^2$ : c'est la borne $|u_n+u|\le 2M$ qui contrôle $u_n^2-u^2$.
- `a-etoile` par « C’est évident. » → a-justifier [justification-absente] : Les tests de la convergence faible-* sont les fonctions de $L^1$, pas seulement celles de $L^2$ : comment passer des unes aux autres ?

Retraits :
- `h-M` (nécessaire) : Sans borne uniforme, la convergence forte dans $L^2$ ne donne plus la convergence faible-*, ni le contrôle de $u_n^2$. — Contre-exemple : $w_n=n\,\mathbb 1_{]0,n^{-3}[}\to 0$ dans $L^2(\Omega)$, alors que $\int_\Omega w_nx^{-3/4}\,dx=4n^{1/4}\to+\infty$ et $\|w_n^2\|_{L^2}^2=n\to+\infty$.
- `h-fort` (nécessaire) : Une suite bornée faiblement-* convergente peut osciller : le passage à la limite dans le carré est perdu. — Contre-exemple : $v_n=\sin(n\cdot)$ est bornée dans $L^\infty$, $v_n\overset{*}{\rightharpoonup}0$, et $v_n^2\overset{*}{\rightharpoonup}\tfrac12\neq 0$.

Solution :
**(a) Borne de la limite.** Une sous-suite de $(u_n)$ converge vers $u$ presque partout ; le passage à la limite dans $|u_{n_k}|\le M$ donne $\|u\|_{L^\infty}\le M$.

**Convergence faible-*.** Pour $\psi\in L^2(\Omega)$, Cauchy–Schwarz donne $\big|\int_\Omega(u_n-u)\psi\big|\le\|u_n-u\|_{L^2}\|\psi\|_{L^2}\to 0$. Pour $\varphi\in L^1(\Omega)$ et $\varepsilon>0$, on choisit $\psi\in L^2(\Omega)$ avec $\|\varphi-\psi\|_{L^1}\le\varepsilon$, ce qui est possible par densité : $\big|\int_\Omega(u_n-u)\varphi\big|\le 2M\varepsilon+\big|\int_\Omega(u_n-u)\psi\big|$, donc $\limsup_n\big|\int_\Omega(u_n-u)\varphi\big|\le 2M\varepsilon$, pour tout $\varepsilon>0$.

**Carré.** Presque partout, $|u_n^2-u^2|=|u_n+u|\,|u_n-u|\le 2M|u_n-u|$, donc $\|u_n^2-u^2\|_{L^2}\le 2M\|u_n-u\|_{L^2}\to 0$.

**(b) Oscillations.** Par Riemann–Lebesgue, $\int_0^{2\pi}\varphi(x)\sin(nx)\,dx\to 0$ pour toute $\varphi\in L^1$ : $v_n\overset{*}{\rightharpoonup}0$. Mais $\int_0^{2\pi}\sin^2(nx)\,dx=\pi$. Si une sous-suite convergeait fortement dans $L^2$ vers $w$, le test contre $\psi\in L^2\subset L^1$ donnerait $\int_\Omega w\psi=0$, donc $w=0$, ce qui contredit $\|v_{n_k}\|_{L^2}^2=\pi$. Enfin $v_n^2=\tfrac12-\tfrac12\cos(2nx)\overset{*}{\rightharpoonup}\tfrac12\neq 0$.

**Bilan.** Bornée dans $L^\infty$ et forte dans $L^2$ : on obtient la faible-* et le passage à la limite dans les non-linéarités lipschitziennes sur les bornés. Faible-* seule : seules les quantités linéaires passent à la limite. La borne dans $L^\infty$ est indispensable dans (a) : $w_n=n\,\mathbb 1_{]0,n^{-3}[}$ tend vers $0$ dans $L^2$ sans converger faiblement-*.

Indices :
1. Chaque mode de convergence teste une classe de fonctions différente : lesquelles, et avec quel contrôle uniforme ?
2. Pour (a), commence par tester contre $\psi\in L^2$, puis approche $\varphi\in L^1$ par une telle $\psi$. Pour (b), calcule $\int_0^{2\pi}\sin^2(nx)\,dx$.
3. Pour l'absence de sous-suite forte : une limite forte $w$ coïnciderait avec la limite faible-* $0$, alors que la norme $L^2$ reste égale à $\sqrt\pi$.

Erreurs fréquentes :
- Croire que la convergence faible-* d’une suite bornée entraîne la convergence forte.
- Passer à la limite dans $u_n^2$ avec une simple convergence faible-*.
- Oublier la borne dans $L^\infty$ dans l'argument de densité.

Variante : Soit $\Omega$ un ouvert borné de $\mathbb R^d$ et $(u_n)$ une suite bornée de $L^\infty(\Omega)$. Montrer que $u_n\overset{*}{\rightharpoonup}u$ dans $L^\infty(\Omega)$ si et seulement si $u_n\rightharpoonup u$ faiblement dans $L^2(\Omega)$.

Solution de la variante : Si $u_n\overset{*}{\rightharpoonup}u$, alors $u\in L^\infty\subset L^2$ et, comme $L^2(\Omega)\subset L^1(\Omega)$ sur un ouvert borné, $\int_\Omega u_n\psi\to\int_\Omega u\psi$ pour toute $\psi\in L^2$. Réciproquement, si $u_n\rightharpoonup u$ dans $L^2$ et $\|u_n\|_{L^\infty}\le M$, l'ensemble $\{v\in L^2 : |v|\le M\ \text{p.p.}\}$ est convexe et fermé, donc faiblement fermé : $\|u\|_{L^\infty}\le M$. Pour $\varphi\in L^1$ et $\psi\in L^2$ avec $\|\varphi-\psi\|_{L^1}\le\varepsilon$ : $\big|\int_\Omega(u_n-u)\varphi\big|\le 2M\varepsilon+\big|\int_\Omega(u_n-u)\psi\big|$, d'où la convergence faible-*. Pour les suites bornées de $L^\infty$, les deux convergences coïncident ; aucune n'entraîne la convergence forte.

Vérification : {"origin":"complement","review":"machine"}