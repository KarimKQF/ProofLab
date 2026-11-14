# 27. Théorème spectral général (`spectral-general`) — polycopié p. PDF 25, section 6.5

## Fiche

Espaces : $H$ : espace de Hilbert, de norme $\|\cdot\|_H$ issue du produit scalaire $\langle\cdot,\cdot\rangle$. | $A:D(A)\subset H\to H$ : opérateur auto-adjoint, densément défini, de domaine $D(A)$ ; $A=A^*$, domaines inclus. | $E$ : mesure à valeurs projections sur les boréliens de $\mathbb R$ ; $\mu_u(B)=\|E(B)u\|^2_H$ est une mesure positive finie sur $\mathbb R$. | $f:\mathbb R\to\mathbb C$ : fonction borélienne.

Hypothèses :
- $A$ est auto-adjoint, densément défini. — Sans elle : La matrice $\begin{pmatrix}0&1\\0&0\end{pmatrix}$ sur $\mathbb C^2$ n'est pas diagonalisable : elle n'admet aucune écriture $\sum_j\lambda_jP_j$ avec des projecteurs orthogonaux $P_j$ et des réels $\lambda_j$.
- $f$ est borélienne, pour que les intégrales contre $E$ et $\mu_u$ aient un sens.

Énoncé : Si $A$ est auto-adjoint sur $H$, il existe une mesure spectrale à valeurs projections $E$ telle que
$$A=\int_{\mathbb R}\lambda\,dE(\lambda),\qquad f(A)=\int_{\mathbb R}f(\lambda)\,dE(\lambda).$$
Pour $f$ borélienne, $D(f(A))=\{u:\int|f(\lambda)|^2\,d\mu_u(\lambda)<\infty\}$, où $\mu_u(B)=\|E(B)u\|_H^2$.

Bilan : {"existence":"Existence d'une mesure spectrale $E$ à valeurs projections représentant $A$.","autre":"Calcul fonctionnel borélien : définition de $f(A)$ et de son domaine, sans hypothèse de compacité."}

Preuve dans le polycopié : admise

Plan :
1. En dimension finie, $A=Q\,\mathrm{diag}(\lambda_j)\,Q^*$ et $f(A)=Q\,\mathrm{diag}(f(\lambda_j))\,Q^*$.
2. Une mesure spectrale généralise ce mécanisme aux spectres non discrets : $E(B)$ joue le rôle de la somme des projecteurs propres associés aux $\lambda_j\in B$.
3. Le polycopié annonce : « Nous avons étudié ses conséquences et sa représentation, pas la construction intégrale complète du théorème » (p. PDF 25). Le théorème reste admis ici.

Vigilance :
- Le spectre d'un opérateur auto-adjoint n'est pas fait que de valeurs propres : la multiplication par $x$ sur $L^2(]0,1[)$ n'en a aucune, et son spectre vaut $[0,1]$.
- $f(A)$ n'est pas défini sur tout $H$ en général : le domaine dépend de la croissance de $f$ sur le spectre.
- Le théorème fournit une mesure spectrale, pas une base hilbertienne de vecteurs propres : une telle base provient, sous hypothèse de compacité, du théorème spectral compact.

Vérification : {"origin":"polycopie","review":"machine","notes":"Énoncé repris du polycopié (p. PDF 25) ; démonstration admise, comme au polycopié."}

Définition « Mesure spectrale à valeurs projections » : Application $E$ des boréliens de $\mathbb R$ dans les projections orthogonales de $H$ telle que $E(\emptyset)=0$, $E(\mathbb R)=I$, $E(B\cap C)=E(B)E(C)$ et, si $B=\bigsqcup_jB_j$, $E(B)u=\sum_jE(B_j)u$ pour tout $u\in H$.

Définition « Mesure $\mu_u$ » : Pour $u\in H$ : $\mu_u(B)=\|E(B)u\|^2$. C'est une mesure positive finie sur $\mathbb R$, de mesure totale $\|u\|^2$.

Définition « Calcul fonctionnel borélien » : Pour $f:\mathbb R\to\mathbb C$ borélienne : $f(A)=\int_{\mathbb R}f(\lambda)\,dE(\lambda)$, de domaine $D(f(A))=\{u:\int|f|^2\,d\mu_u<\infty\}$.

Définition « Spectre continu » : Ensemble des $z\in\sigma(M)$ tels que $zI-M$ soit injectif, d'image dense et non surjectif.

## Contre-exemple `ce-spectral-general-domaine` : Domaine et fonction continue
Assertion : Pour tout opérateur auto-adjoint $A$ et toute fonction $f$ continue sur $\mathbb R$, $D(f(A))=H$.
Tâche : Soit $A$ diagonal sur $\ell^2$, avec $\lambda_n=n$, $f(\lambda)=\lambda$ et $u_n=1/n$. Calcule la valeur commune des termes $|f(\lambda_n)|^2|u_n|^2$.
Vérification : {"kind":"rational","prompt":"Valeur commune de $|f(\\lambda_n)|^2|u_n|^2$","expected":"1"}
Explication : Chaque terme vaut $n^2\cdot n^{-2}=1$, de sorte que $\sum_n|f(\lambda_n)|^2|u_n|^2=+\infty$, alors que $\sum_n|u_n|^2=\sum_nn^{-2}<\infty$. Donc $u\in H$ et $u\notin D(f(A))$.

## Contre-exemple `ce-spectral-general-valeur-propre` : Spectre sans valeur propre
Assertion : Tout point du spectre d'un opérateur borné auto-adjoint est une valeur propre.
Tâche : Pour $M$, multiplication par $x$ sur $L^2(]0,1[)$, $z=\frac12$ et $u_n=\sqrt n\,\mathbb 1_{]1/2,\,1/2+1/n[}$ (pour $n\ge2$), calcule $\|(zI-M)u_2\|^2$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\|(zI-M)u_2\\|^2$","expected":"1/12"}
Explication : $\|u_n\|^2=n\cdot\frac1n=1$, et $\|(zI-M)u_n\|^2=n\int_0^{1/n}s^2\,ds=\frac1{3n^2}$. Pour $n=2$ : $\frac1{12}$. Le quotient $\|(zI-M)u_n\|/\|u_n\|$ tend vers $0$, donc $z$ appartient au spectre, sans être valeur propre puisque $(z-x)u(x)=0$ p.p. impose $u=0$ p.p.

## Contre-exemple `ce-spectral-general-resolvante` : Résolvante non compacte
Assertion : La résolvante d'un opérateur auto-adjoint est toujours compacte.
Tâche : Pour $M$, multiplication par $x$ sur $L^2(]0,1[)$, $R(2,M)$ est la multiplication par $g(x)=\dfrac1{2-x}$. Calcule $\min_{[0,1]}g$.
Vérification : {"kind":"rational","prompt":"Minimum de $g$ sur $[0,1]$","expected":"1/2"}
Explication : Comme $g$ est croissante, $\min_{[0,1]}g=g(0)=\frac12$. Pour la suite orthonormée $e_k(x)=\sqrt2\sin(k\pi x)$, on a $e_k\rightharpoonup0$ et $\|R(2,M)e_k\|\ge\frac12$ : $R(2,M)$ n'est pas compact.

## Exercice facile `spectral-general.facile` : Calcul fonctionnel d'un opérateur diagonal sur $\ell^2$

Énoncé : Soit $H=\ell^2(\mathbb N^*)$ complexe, $(e_n)_{n\ge1}$ sa base canonique, $(\lambda_n)_{n\ge1}$ une suite réelle et $A$ l'opérateur diagonal défini par $D(A)=\{u\in H:\sum_n\lambda_n^2|u_n|^2<\infty\}$, $(Au)_n=\lambda_nu_n$. Pour $B\subset\mathbb R$ borélien, on pose $E(B)u=\sum_{n:\lambda_n\in B}u_ne_n$.

Établir la définition exacte de $f(A)$ pour $f:\mathbb R\to\mathbb C$ borélienne : montrer que $E$ est une mesure spectrale représentant $A$, que $D(f(A))=\{u\in H:\sum_n|f(\lambda_n)|^2|u_n|^2<\infty\}$, que $(f(A)u)_n=f(\lambda_n)u_n$, puis que $D(f(A))=H$ si et seulement si la suite $(f(\lambda_n))_n$ est bornée, avec alors $\|f(A)\|=\sup_n|f(\lambda_n)|$.
Source : {"doc":"polycopie","pdfPage":43,"label":"Exercice 27, facile (p. PDF 43) ; section 6.5 (p. PDF 25)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-cadre` (hypothese) : $H=\ell^2(\mathbb N^*)$ est complexe, de produit scalaire $\langle u,v\rangle=\sum_nu_n\overline{v_n}$, $(e_n)$ est sa base canonique, et $f:\mathbb R\to\mathbb C$ est borélienne.
- `h-reels` (hypothese) : La suite $(\lambda_n)_{n\ge1}$ est réelle.
- `d-A` (definition) : $D(A)=\{u\in H:\sum_n\lambda_n^2|u_n|^2<\infty\}$ et $(Au)_n=\lambda_nu_n$ pour $u\in D(A)$.
- `d-E` (definition) : Pour $B\subset\mathbb R$ borélien : $E(B)u=\sum_{n:\lambda_n\in B}u_ne_n$.
- `d-fA` (definition) : Calcul fonctionnel associé à $E$ : pour $f$ borélienne, $D(f(A))=\{u\in H:\int_{\mathbb R}|f|^2\,d\mu_u<\infty\}$ où $\mu_u(B)=\|E(B)u\|^2$, et $\langle f(A)u,v\rangle=\int_{\mathbb R}f\,d\mu_{u,v}$ pour $u\in D(f(A))$, $v\in H$, où $\mu_{u,v}(B)=\langle E(B)u,v\rangle$.
- `E-proj` (consequence) : Chaque $E(B)$ est une projection orthogonale, $E(\emptyset)=0$, $E(\mathbb R)=I$, $E(B\cap C)=E(B)E(C)$, et $E$ est fortement $\sigma$-additive : $E$ est une mesure spectrale.
- `mu-val` (egalite) : Pour tout $u\in H$ et tout borélien $B$ : $\mu_u(B)=\sum_{n:\lambda_n\in B}|u_n|^2$.
- `int-val` (egalite) : Pour tout $u\in H$ : $\int_{\mathbb R}|f|^2\,d\mu_u=\sum_n|f(\lambda_n)|^2|u_n|^2$.
- `dom-val` (egalite) : $D(f(A))=\{u\in H:\sum_n|f(\lambda_n)|^2|u_n|^2<\infty\}$.
- `mu-croise` (egalite) : Pour tout $u\in H$, $k\ge1$ et $B$ borélien : $\mu_{u,e_k}(B)=\mathbb 1_B(\lambda_k)\,u_k$.
- `action` (egalite) : Pour $u\in D(f(A))$ et $k\ge1$ : $(f(A)u)_k=f(\lambda_k)\,u_k$.
- `repr-A` (egalite) : $E$ représente $A$ : pour $f(\lambda)=\lambda$, les deux formules redonnent le domaine et l'action de $A$.
- `borne` (inegalite) : Si $C=\sup_n|f(\lambda_n)|<\infty$, alors $D(f(A))=H$ et $\|f(A)\|=C$.
- `temoin` (consequence) : Si $(f(\lambda_n))_n$ n'est pas bornée, il existe $u\in H$ tel que $u\notin D(f(A))$.
- `exemple` (egalite, calcul rational) : Pour $\lambda_n=n$ et $f(\lambda)=\dfrac1{1+|\lambda|}$ : $\|f(A)\|=\dfrac12$.
  - valeur attendue : "1/2"
- `fin` (conclusion) : $E$ est une mesure spectrale représentant $A$ ; $D(f(A))$ et $f(A)$ sont identifiés coordonnée par coordonnée, et $D(f(A))=H$ si et seulement si $(f(\lambda_n))_n$ est bornée.
- `x-dom-tout` (egalite, DISTRACTEUR) : Pour toute $f$ continue sur $\mathbb R$ : $D(f(A))=H$.
- `x-compo` (egalite, DISTRACTEUR) : Pour $u\in D(f(A))$ et $k\ge1$ : $(f(A)u)_k=f(\lambda_ku_k)$.
- `x-norme-R` (inegalite, DISTRACTEUR) : Si $f$ est bornée sur $\mathbb R$, alors $\|f(A)\|=\sup_{\mathbb R}|f|$.

Règles :
- `h-cadre` + `h-reels` + `d-E` ⟹ `E-proj` par « Sur la base canonique, $E(B)e_k=\mathbb 1_B(\lambda_k)e_k$ : les coefficients diagonaux valent $0$ ou $1$ ; la $\sigma$-additivité forte vient de la convergence de $\sum_n|u_n|^2$. »
- `h-cadre` + `d-E` ⟹ `mu-val` par « Identité de Parseval appliquée à $E(B)u$ dans la base canonique. »
- `mu-val` + `h-cadre` ⟹ `int-val` par « $\mu_u$ est la somme des mesures $|u_n|^2\,\delta_{\lambda_n}$ ; pour une fonction positive, on intervertit série et intégrale. [tonelli] »
- `d-fA` + `int-val` ⟹ `dom-val` par « Formule du domaine de $f(A)$, appliquée à la mesure $\mu_u$ calculée. [spectral-general] »
- `h-cadre` + `d-E` ⟹ `mu-croise` par « Linéarité et orthonormalité : $\langle E(B)u,e_k\rangle=\sum_{n:\lambda_n\in B}u_n\langle e_n,e_k\rangle$. »
- `d-fA` + `mu-croise` ⟹ `action` par « $\mu_{u,e_k}=u_k\,\delta_{\lambda_k}$, donc $\int f\,d\mu_{u,e_k}=f(\lambda_k)u_k$. »
- `dom-val` + `action` + `d-A` ⟹ `repr-A` par « Cas $f(\lambda)=\lambda$ des formules de domaine et d'action, comparé à la définition de $A$. »
- `dom-val` + `action` ⟹ `borne` par « Majoration $\sum_n|f(\lambda_n)|^2|u_n|^2\le C^2\|u\|^2$, puis test sur $e_n$ pour la borne inférieure. »
- `dom-val` ⟹ `temoin` par « Choisir $n_k$ strictement croissante avec $|f(\lambda_{n_k})|\ge k$ et poser $u_{n_k}=1/k$, les autres coordonnées étant nulles. »
- `borne` ⟹ `exemple` par « Formule de la norme appliquée à la suite $\big(1/(1+n)\big)_{n\ge1}$. »
- `E-proj` + `repr-A` + `dom-val` + `action` + `borne` + `temoin` + `exemple` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « Une fonction continue sur $\mathbb R$ est bornée sur le spectre de $A$, donc le domaine de $f(A)$ vaut $H$. » ; « Par composition : $f(A)u=f(Au)$. » ; « C’est évident. »

Pièges :
- `x-dom-tout` → incorrect [spectral-general-calcul-fonctionnel] : La continuité de $f$ ne contrôle pas sa croissance sur un spectre non borné : le domaine impose la sommabilité de $|f(\lambda_n)|^2|u_n|^2$. — Contre-exemple : $\lambda_n=n$, $f(\lambda)=\lambda$, $u_n=1/n$ : $u\in H$, mais $\sum_n|f(\lambda_n)|^2|u_n|^2=\sum_n1=+\infty$.
- `dom-val` par « Une fonction continue sur $\mathbb R$ est bornée sur le spectre de $A$, donc le domaine de $f(A)$ vaut $H$. » → incorrect [spectral-general-calcul-fonctionnel] : Une fonction continue n'est pas bornée sur un spectre non borné, et la formule du domaine ne dépend pas de la continuité de $f$. — Contre-exemple : $\lambda_n=n$ et $f(\lambda)=\lambda$ : $f$ est continue et $\sup_n|f(\lambda_n)|=+\infty$.
- `x-compo` → incorrect [spectral-general-calcul-fonctionnel] : $f(A)$ multiplie la coordonnée par $f(\lambda_k)$ : on n'applique pas $f$ au produit $\lambda_ku_k$. — Contre-exemple : $f(\lambda)=\lambda^2$, $\lambda_k=2$, $u_k=3$ : $f(\lambda_k)u_k=12$, alors que $f(\lambda_ku_k)=36$.
- `action` par « Par composition : $f(A)u=f(Au)$. » → incorrect [spectral-general-calcul-fonctionnel] : $f(A)$ n'est pas la composée $f\circ A$, et $f(Au)$ n'a pas de sens : $f$ est une fonction de $\mathbb R$ dans $\mathbb C$, tandis que $Au$ est un vecteur de $H$.
- `x-norme-R` → incorrect [spectral-general-calcul-fonctionnel] : Seules les valeurs de $f$ aux points $\lambda_n$ interviennent : le supremum est pris sur la suite, non sur $\mathbb R$. — Contre-exemple : $\lambda_n=0$ pour tout $n$ et $f(\lambda)=\lambda^2/(1+\lambda^2)$ : $f(A)=0$, alors que $\sup_{\mathbb R}|f|=1$.
- `int-val` par « C’est évident. » → a-justifier [justification-absente] : Cette égalité repose sur une interversion : il faut dire pourquoi l'intégrale contre $\mu_u$ est une somme.

Retraits :
- `h-reels` (nécessaire) : Sans valeurs réelles, $E$ ne couvre plus tout l'espace : $E(\mathbb R)\neq I$, et $A$ n'est plus auto-adjoint. — Contre-exemple : Si $\lambda_1=\mathrm i$, alors $E(\mathbb R)e_1=0\neq e_1$, et $A$ admet la valeur propre non réelle $\mathrm i$, ce qui exclut l'auto-adjonction.

Calculs fermés : [{"kind":"rational-vector","prompt":"Pour $\\lambda_n=n$, $f(\\lambda)=\\lambda^2+1$ et $u=e_1+2e_2$ : coordonnées $(f(A)u)_1$ et $(f(A)u)_2$","expected":["2","10"],"labels":["(f(A)u)₁","(f(A)u)₂"]}]

Solution :
**Mesure spectrale.** Sur la base canonique, $E(B)e_k=\mathbb 1_B(\lambda_k)e_k$ : chaque $E(B)$ est diagonal à coefficients dans $\{0,1\}$, donc une projection orthogonale. On a $E(\emptyset)=0$, $E(B\cap C)=E(B)E(C)$, et $E(\mathbb R)=I$ parce que tous les $\lambda_n$ sont réels. Si $B=\bigsqcup_jB_j$, alors $\big\|E(B)u-\sum_{j\le J}E(B_j)u\big\|^2=\sum_{n:\lambda_n\in B\setminus\bigcup_{j\le J}B_j}|u_n|^2\to0$ quand $J\to\infty$ : $E$ est fortement $\sigma$-additive.

**Domaine.** Par Parseval, $\mu_u(B)=\|E(B)u\|^2=\sum_{n:\lambda_n\in B}|u_n|^2$, c'est-à-dire $\mu_u=\sum_n|u_n|^2\,\delta_{\lambda_n}$. Pour la fonction positive $|f|^2$, l'interversion série-intégrale donne $\int_{\mathbb R}|f|^2\,d\mu_u=\sum_n|f(\lambda_n)|^2|u_n|^2$, d'où $D(f(A))=\{u\in H:\sum_n|f(\lambda_n)|^2|u_n|^2<\infty\}$.

**Action.** $\mu_{u,e_k}(B)=\langle E(B)u,e_k\rangle=\mathbb 1_B(\lambda_k)u_k$, donc $\mu_{u,e_k}=u_k\,\delta_{\lambda_k}$ et $(f(A)u)_k=\langle f(A)u,e_k\rangle=\int f\,d\mu_{u,e_k}=f(\lambda_k)u_k$. En prenant $f(\lambda)=\lambda$, on retrouve $D(A)$ et $A$ : $E$ représente bien $A$. L'unicité de la mesure spectrale, qui ne figure pas au polycopié, n'est pas utilisée : on définit ici $f(A)=\int f\,dE$ pour cette $E$.

**Domaine total.** Si $C=\sup_n|f(\lambda_n)|<\infty$, alors $\sum_n|f(\lambda_n)|^2|u_n|^2\le C^2\|u\|^2$, donc $D(f(A))=H$ et $\|f(A)\|\le C$ ; comme $\|f(A)e_n\|=|f(\lambda_n)|$, on a $\|f(A)\|=C$. Si $(f(\lambda_n))_n$ n'est pas bornée, on choisit $n_k$ strictement croissante avec $|f(\lambda_{n_k})|\ge k$ et on pose $u_{n_k}=1/k$, $u_n=0$ sinon : $u\in H$ car $\sum_k1/k^2<\infty$, et $\sum_n|f(\lambda_n)|^2|u_n|^2\ge\sum_k1=+\infty$, donc $u\notin D(f(A))$.

**Exemple.** Pour $\lambda_n=n$ et $f(\lambda)=1/(1+|\lambda|)$, on obtient $\|f(A)\|=\sup_n1/(1+n)=1/2$.

Indices :
1. Commence par calculer $E(B)e_k$ : tout le reste se lit dans cette formule. Que vaut alors $\mu_u$ ?
2. Procède en trois temps : la mesure $\mu_u$ et l'intégrale de $|f|^2$ donnent le domaine ; les mesures $\mu_{u,e_k}$ donnent l'action ; le test sur $e_n$ donne la norme.
3. $\mu_u=\sum_n|u_n|^2\delta_{\lambda_n}$ et $\mu_{u,e_k}=u_k\delta_{\lambda_k}$. Pour le témoin hors du domaine : extrais $n_k$ avec $|f(\lambda_{n_k})|\ge k$ et pose $u_{n_k}=1/k$.

Erreurs fréquentes :
- Écrire $D(f(A))=H$ pour toute fonction continue, oubliant la croissance sur un spectre non borné.
- Confondre $f(A)$ et la composition avec $f$ : remplacer $f(\lambda_k)u_k$ par $f(\lambda_ku_k)$.
- Identifier $\|f(A)\|$ à $\sup_{\mathbb R}|f|$ au lieu de $\sup_n|f(\lambda_n)|$.

Variante : Soit $H=\ell^2(\mathbb N^*)$ complexe, $A$ l'opérateur diagonal borné de coefficients $\lambda_n=1/n$, et $f=\mathbb 1_{]1/3,+\infty[}$. Déterminer $f(A)$ et montrer que c'est le projecteur orthogonal sur $\mathrm{Vect}(e_1,e_2)$, de rang $2$.

Solution de la variante : La fonction $f$ est borélienne bornée, donc $D(f(A))=H$. Comme $1/n>1/3$ si et seulement si $n\le2$, on a $f(\lambda_1)=f(\lambda_2)=1$ et $f(\lambda_n)=0$ pour $n\ge3$ (notamment $\lambda_3=1/3$ n'appartient pas à l'intervalle ouvert). Ainsi $f(A)u=u_1e_1+u_2e_2$ : les coefficients diagonaux valent $0$ ou $1$, donc $f(A)$ est une projection orthogonale, d'image $\mathrm{Vect}(e_1,e_2)$. C'est la projection spectrale $E(]1/3,+\infty[)$ : le calcul fonctionnel borélien inclut des fonctions discontinues, ce qu'exige la construction des projections spectrales.

Graphe de la variante :
But : `fin` — usage : application

Nœuds :
- `h-cadre` (hypothese) : $H=\ell^2(\mathbb N^*)$, $(e_n)$ base canonique, $\lambda_n=1/n$.
- `d-f` (definition) : $f=\mathbb 1_{]1/3,+\infty[}$ : fonction borélienne bornée.
- `h-cf` (hypothese) : Calcul fonctionnel diagonal (exercice) : $D(f(A))=\{u:\sum_n|f(\lambda_n)|^2|u_n|^2<\infty\}$ et $(f(A)u)_n=f(\lambda_n)u_n$.
- `f-val` (egalite) : $f(\lambda_1)=f(\lambda_2)=1$ et $f(\lambda_n)=0$ pour $n\ge3$.
- `dom` (egalite) : $D(f(A))=H$.
- `act` (egalite) : Pour tout $u\in H$ : $f(A)u=u_1e_1+u_2e_2$.
- `idem` (egalite) : $f(A)^2=f(A)=f(A)^*$.
- `proj` (consequence) : $f(A)$ est le projecteur orthogonal sur $\mathrm{Vect}(e_1,e_2)$.
- `rang` (egalite, calcul rational) : Le rang de $f(A)$ vaut $2$.
  - valeur attendue : "2"
- `fin` (conclusion) : $f(A)=E(]1/3,+\infty[)$ est le projecteur orthogonal sur $\mathrm{Vect}(e_1,e_2)$, de rang $2$.
- `x-noncont` (consequence, DISTRACTEUR) : Comme $f$ n'est pas continue, $f(A)$ n'est pas défini.

Règles :
- `d-f` + `h-cadre` ⟹ `f-val` par « Comparaison : $1/n>1/3$ si et seulement si $n\le2$. »
- `h-cf` + `f-val` ⟹ `dom` par « La suite $(f(\lambda_n))_n$ est bornée. »
- `h-cf` + `f-val` ⟹ `act` par « Formule de l’action, coordonnée par coordonnée. »
- `act` ⟹ `idem` par « Les coefficients diagonaux valent $0$ ou $1$. »
- `idem` + `act` ⟹ `proj` par « Une projection orthogonale est déterminée par son image. »
- `proj` ⟹ `rang` par « Dimension de l'image $\mathrm{Vect}(e_1,e_2)$. »
- `dom` + `proj` + `rang` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « Le calcul fonctionnel n’est défini que pour des fonctions continues. » ; « $\lambda_3=1/3$ appartient à $]1/3,+\infty[$. »

Pièges :
- `x-noncont` → incorrect [spectral-general-calcul-fonctionnel] : Le théorème porte sur les fonctions boréliennes : les indicatrices d'intervalles sont précisément ce qui produit les projections spectrales. — Contre-exemple : Ici, $f(A)$ est bien défini : c'est $E(]1/3,+\infty[)$.
- `f-val` par « $\lambda_3=1/3$ appartient à $]1/3,+\infty[$. » → incorrect [calcul-exact] : L'intervalle $]1/3,+\infty[$ est ouvert en $1/3$ : on a $f(\lambda_3)=f(1/3)=0$.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `spectral-general.intermediaire` : Domaine de $A^{1/2}$ pour un opérateur diagonal positif

Énoncé : Soit $H$ un espace de Hilbert complexe séparable de dimension infinie, $(e_n)_{n\ge1}$ une base hilbertienne, $(\lambda_n)_{n\ge1}\subset[0,+\infty[$, et $A$ défini par $D(A)=\{u\in H:\sum_n\lambda_n^2|u_n|^2<\infty\}$, $Au=\sum_n\lambda_nu_ne_n$, où $u_n=\langle u,e_n\rangle$.

Caractériser $D(A^{1/2})$ et expliciter $A^{1/2}$. Montrer que $D(A)\subset D(A^{1/2})$, l'inclusion étant stricte si la suite $(\lambda_n)$ n'est pas bornée, et que $(A^{1/2})^2=A$, domaines inclus.
Source : {"doc":"polycopie","pdfPage":43,"label":"Exercice 27, intermédiaire (p. PDF 43)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-base` (hypothese) : $H$ est un Hilbert complexe séparable, $(e_n)$ une base hilbertienne ; pour $u\in H$, on note $u_n=\langle u,e_n\rangle$, de sorte que $\|u\|^2=\sum_n|u_n|^2$.
- `h-pos` (hypothese) : $\lambda_n\ge0$ pour tout $n$.
- `d-A` (definition) : $D(A)=\{u\in H:\sum_n\lambda_n^2|u_n|^2<\infty\}$ et $Au=\sum_n\lambda_nu_ne_n$.
- `d-f` (definition) : $f(\lambda)=\sqrt{\max(\lambda,0)}$, fonction continue donc borélienne, et $A^{1/2}:=f(A)$.
- `h-cf` (hypothese) : Calcul fonctionnel diagonal (exercice facile, via l'isométrie $u\mapsto(u_n)_n$ de $H$ sur $\ell^2$) : pour $f$ borélienne, $D(f(A))=\{u\in H:\sum_n|f(\lambda_n)|^2|u_n|^2<\infty\}$ et $f(A)u=\sum_nf(\lambda_n)u_ne_n$.
- `f-carre` (egalite) : Pour tout $n$ : $|f(\lambda_n)|^2=\lambda_n$.
- `dom` (egalite) : $D(A^{1/2})=\{u\in H:\sum_n\lambda_n|u_n|^2<\infty\}$.
- `action` (egalite) : Pour $u\in D(A^{1/2})$ : $A^{1/2}u=\sum_n\sqrt{\lambda_n}\,u_ne_n$ et $\|A^{1/2}u\|^2=\sum_n\lambda_n|u_n|^2$.
- `young` (inegalite) : Pour tout $\lambda\ge0$ : $\lambda\le\frac12\big(1+\lambda^2\big)$.
- `incl` (inclusion) : $D(A)\subset D(A^{1/2})$.
- `ps` (egalite) : Pour $u\in D(A)$ : $\|A^{1/2}u\|^2=\langle Au,u\rangle$.
- `temoin` (consequence) : Si $(\lambda_n)$ n'est pas bornée, il existe $u\in D(A^{1/2})$ tel que $u\notin D(A)$.
- `strict` (inclusion) : Si $(\lambda_n)$ n'est pas bornée, $D(A)\subsetneq D(A^{1/2})$.
- `carre` (egalite) : $(A^{1/2})^2=A$, domaines inclus.
- `ex` (egalite, calcul rational) : Pour $\lambda_n=4^n$ et $u_n=3^{-n}$ : $\|A^{1/2}u\|^2=\dfrac45$.
  - valeur attendue : "4/5"
- `fin` (conclusion) : $D(A^{1/2})=\{u\in H:\sum_n\lambda_n|u_n|^2<\infty\}$, avec $D(A)\subset D(A^{1/2})$, stricte si $(\lambda_n)$ n'est pas bornée, et $(A^{1/2})^2=A$.
- `x-domA` (egalite, DISTRACTEUR) : $D(A^{1/2})=D(A)$.
- `x-demi` (egalite, DISTRACTEUR) : $D(A^{1/2})=\{u\in H:\sum_n\sqrt{\lambda_n}\,|u_n|^2<\infty\}$.
- `x-norme` (egalite, DISTRACTEUR) : Pour $u\in D(A)$ : $\|A^{1/2}u\|^2=\|Au\|$.

Règles :
- `h-pos` + `d-f` ⟹ `f-carre` par « $\lambda_n\ge0$, donc $f(\lambda_n)^2=\lambda_n$. »
- `h-cf` + `f-carre` ⟹ `dom` par « Formule du domaine de $f(A)$ pour $f(\lambda)=\sqrt{\lambda}$ sur $[0,+\infty[$. [spectral-general] »
- `h-cf` + `f-carre` + `h-base` ⟹ `action` par « Formule de l’action du calcul fonctionnel et identité de Parseval. »
- ∅ ⟹ `young` par « Conséquence de $(\lambda-1)^2\ge0$. »
- `dom` + `d-A` + `young` + `h-base` ⟹ `incl` par « Majoration $\sum_n\lambda_n|u_n|^2\le\frac12\|u\|^2+\frac12\sum_n\lambda_n^2|u_n|^2$, finie pour $u\in D(A)$. »
- `action` + `d-A` + `incl` + `h-base` ⟹ `ps` par « Parseval : $\langle Au,u\rangle=\sum_n\lambda_nu_n\overline{u_n}$. »
- `dom` + `d-A` + `h-pos` ⟹ `temoin` par « Extraire $n_k$ strictement croissante avec $\lambda_{n_k}\ge k^2$, et poser $u=\sum_k\big(k\sqrt{\lambda_{n_k}}\big)^{-1}e_{n_k}$. »
- `incl` + `temoin` ⟹ `strict` par « Un élément de la différence rend l’inclusion stricte. »
- `dom` + `action` + `incl` + `d-A` ⟹ `carre` par « $u\in D\big((A^{1/2})^2\big)$ équivaut à $\sum_n\lambda_n|u_n|^2<\infty$ et $\sum_n\lambda_n^2|u_n|^2<\infty$ : on applique l'inclusion précédente. »
- `dom` + `action` ⟹ `ex` par « Somme d'une série géométrique de raison $4/9$ ; les conditions d'appartenance sont vérifiées. »
- `dom` + `action` + `incl` + `ps` + `strict` + `carre` + `ex` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « Le domaine ne dépend que de $|f|$ : on peut remplacer $|f|^2$ par $|f|$ dans le critère de domaine. » ; « $D(A)$ est dense dans $H$, donc contenu dans $D(A^{1/2})$. » ; « L’égalité de deux expressions suffit, sans contrôle des domaines. »

Pièges :
- `x-domA` → incorrect [domaine-operateur] : Le domaine de $A^{1/2}$ est en général plus grand que celui de $A$ : les conditions portent sur des poids différents. — Contre-exemple : $\lambda_n=n^2$, $u_n=1/n^2$ : $\sum_n\lambda_n|u_n|^2=\sum_n1/n^2<\infty$, mais $\sum_n\lambda_n^2|u_n|^2=\sum_n1=+\infty$.
- `x-demi` → incorrect [spectral-general-calcul-fonctionnel] : Le critère porte sur $|f|^2$, et $|f(\lambda_n)|^2=\lambda_n$ pour $f(\lambda)=\sqrt\lambda$ : le poids est $\lambda_n$, pas $\sqrt{\lambda_n}$. — Contre-exemple : $\lambda_n=n^4$, $u_n=1/n^2$ : $\sum_n\sqrt{\lambda_n}\,|u_n|^2=\sum_n1/n^2<\infty$, mais $\sum_n\lambda_n|u_n|^2=\sum_n1=+\infty$.
- `x-norme` → incorrect [calcul-exact] : L'identité correcte est $\|A^{1/2}u\|^2=\langle Au,u\rangle$, qui n'est pas $\|Au\|$. — Contre-exemple : $A=4I$, $u=3e_1$ : $\|A^{1/2}u\|^2=36$ et $\|Au\|=12$.
- `dom` par « Le domaine ne dépend que de $|f|$ : on peut remplacer $|f|^2$ par $|f|$ dans le critère de domaine. » → incorrect [spectral-general-calcul-fonctionnel] : Le carré fait partie du critère : remplacer $|f|^2$ par $|f|$ change l'ensemble obtenu. — Contre-exemple : $\lambda_n=n^4$, $u_n=1/n^2$ : $u$ vérifie le critère avec $|f|$, mais pas le critère exact avec $|f|^2=\lambda_n$.
- `incl` par « $D(A)$ est dense dans $H$, donc contenu dans $D(A^{1/2})$. » → a-justifier [densite-fermeture] : La densité de $D(A)$ dans $H$ ne dit rien de l'appartenance à $D(A^{1/2})$ : cette inclusion se démontre en comparant les poids $\lambda_n$ et $\lambda_n^2$.
- `carre` par « L’égalité de deux expressions suffit, sans contrôle des domaines. » → a-justifier [domaine-operateur] : L'égalité sur une formule ne suffit pas : il faut aussi établir $D\big((A^{1/2})^2\big)=D(A)$.

Retraits :
- `h-pos` (nécessaire) : Une valeur négative rend impossible une racine carrée auto-adjointe : l'exercice perd son objet. — Contre-exemple : Si $\lambda_1=-1$ et s'il existait $B=B^*$ avec $B^2=A$, on aurait $\|Be_1\|^2=\langle B^2e_1,e_1\rangle=-1$, ce qui est impossible.

Solution :
**Domaine.** On note $f(\lambda)=\sqrt{\max(\lambda,0)}$. Comme $\lambda_n\ge0$, on a $f(\lambda_n)^2=\lambda_n$, et le calcul fonctionnel diagonal donne
$$D(A^{1/2})=\Big\{u\in H:\sum_n\lambda_n|u_n|^2<\infty\Big\},\qquad A^{1/2}u=\sum_n\sqrt{\lambda_n}\,u_ne_n,\qquad \|A^{1/2}u\|^2=\sum_n\lambda_n|u_n|^2.$$

**Inclusion.** De $(\lambda-1)^2\ge0$ on déduit $\lambda\le\frac12(1+\lambda^2)$ pour $\lambda\ge0$, donc pour $u\in D(A)$ : $\sum_n\lambda_n|u_n|^2\le\frac12\|u\|^2+\frac12\sum_n\lambda_n^2|u_n|^2<\infty$. Ainsi $D(A)\subset D(A^{1/2})$, et $\|A^{1/2}u\|^2=\sum_n\lambda_n|u_n|^2=\langle Au,u\rangle$ par Parseval.

**Stricte si non bornée.** Choisissons $n_k$ strictement croissante avec $\lambda_{n_k}\ge k^2$ (la suite étant non bornée) et posons $u=\sum_kc_ke_{n_k}$, $c_k=\big(k\sqrt{\lambda_{n_k}}\big)^{-1}$. Alors $\sum_kc_k^2\le\sum_k1/k^4<\infty$, $\sum_k\lambda_{n_k}c_k^2=\sum_k1/k^2<\infty$, mais $\sum_k\lambda_{n_k}^2c_k^2=\sum_k\lambda_{n_k}/k^2\ge\sum_k1=+\infty$ : $u\in D(A^{1/2})\setminus D(A)$.

**Racine carrée.** $u\in D\big((A^{1/2})^2\big)$ signifie $u\in D(A^{1/2})$ et $A^{1/2}u\in D(A^{1/2})$, c'est-à-dire $\sum_n\lambda_n|u_n|^2<\infty$ et $\sum_n\lambda_n^2|u_n|^2<\infty$ ; d'après l'inclusion, c'est équivalent à $u\in D(A)$, et $(A^{1/2})^2u=\sum_n\lambda_nu_ne_n=Au$.

**Exemple.** Pour $\lambda_n=4^n$ et $u_n=3^{-n}$ : $\|u\|^2=\sum_n9^{-n}<\infty$, $\|A^{1/2}u\|^2=\sum_{n\ge1}(4/9)^n=4/5$, et $\sum_n\lambda_n^2u_n^2=\sum_n(16/9)^n=+\infty$ : $u\in D(A^{1/2})\setminus D(A)$.

Indices :
1. La formule du domaine fait intervenir $|f|^2$. Que vaut $|f(\lambda_n)|^2$ pour la racine carrée ?
2. Pour l'inclusion, compare $\lambda$ et $\lambda^2$ sur $[0,+\infty[$ ; pour la stricte inclusion, fabrique un $u$ porté par une sous-suite où $\lambda_{n_k}$ est grand.
3. $\lambda\le\frac12(1+\lambda^2)$. Pour le témoin, $u=\sum_kc_ke_{n_k}$ avec $c_k=(k\sqrt{\lambda_{n_k}})^{-1}$ et $\lambda_{n_k}\ge k^2$.

Erreurs fréquentes :
- Écrire le poids $\sqrt{\lambda_n}$ dans le critère du domaine au lieu de $\lambda_n$.
- Affirmer $D(A^{1/2})=D(A)$.
- Vérifier seulement l'égalité de formules dans $(A^{1/2})^2=A$, sans les domaines.

Variante : Dans le cadre de l'exercice, pour $\lambda_n=9^n$ et $u_n=6^{-n}$, montrer que $u\in D(A^{1/2})\setminus D(A)$ et calculer $\|A^{1/2}u\|^2$.

Solution de la variante : $\sum_n|u_n|^2=\sum_n36^{-n}<\infty$, donc $u\in H$. $\|A^{1/2}u\|^2=\sum_{n\ge1}9^n36^{-n}=\sum_{n\ge1}(1/4)^n=\dfrac13$, donc $u\in D(A^{1/2})$. En revanche, $\sum_{n\ge1}\lambda_n^2|u_n|^2=\sum_{n\ge1}81^n36^{-n}=\sum_{n\ge1}(9/4)^n=+\infty$, donc $u\notin D(A)$.

Vérification : {"origin":"complement","review":"machine"}

## Exercice difficile `spectral-general.difficile` : Spectre continu d'une multiplication, spectre discret d'une résolvante compacte

Énoncé : Soit $H=L^2(]0,1[)$ complexe et $M\in\mathcal L(H)$ défini par $(Mu)(x)=xu(x)$, borné et auto-adjoint. Soit $K$ un espace de Hilbert complexe séparable de dimension infinie et $A:D(A)\subset K\to K$ auto-adjoint, positif, tel que $T=(I+A)^{-1}$ soit compact.

On dit que $z$ appartient au spectre continu de $M$ lorsque $zI-M$ est injectif, d'image dense et non surjectif.

Montrer : (1) $\sigma(M)=[0,1]$, $M$ n'a aucune valeur propre, tout point de $\sigma(M)$ est dans le spectre continu, et $E_M(\{z\})=0$ pour tout réel $z$, où $E_M(B)u=\mathbb 1_Bu$ ; (2) $\sigma(A)$ est constitué d'une suite de valeurs propres de multiplicité finie, tendant vers $+\infty$, sans point d'accumulation ; (3) la résolvante $R(2,M)$ n'est pas compacte.
Source : {"doc":"polycopie","pdfPage":43,"label":"Exercice 27, difficile (p. PDF 43) ; sections 6.2, 6.4 et 6.5 (p. PDF 23–25)"} — prérequis : spectral-compact

But : `fin` — usage : application

Nœuds :
- `h-M` (hypothese) : $H=L^2(]0,1[)$ complexe ; $(Mu)(x)=xu(x)$ pour $u\in H=D(M)$ ; $M$ est borné et auto-adjoint.
- `h-A` (hypothese) : $K$ est un espace de Hilbert complexe séparable et $A:D(A)\subset K\to K$ est auto-adjoint, avec $\langle Au,u\rangle\ge0$ pour tout $u\in D(A)$.
- `h-compact` (hypothese) : $T=(I+A)^{-1}$ est compact sur $K$.
- `h-dim` (hypothese) : $K$ est de dimension infinie.
- `d-Em` (definition) : $E_M(B)u=\mathbb 1_Bu$ pour $B\subset\mathbb R$ borélien et $u\in H$.
- `m-hors` (consequence) : Pour $z\in\mathbb C\setminus[0,1]$ : $z\in\rho(M)$, $R(z,M)$ est la multiplication par $x\mapsto1/(z-x)$, et $\|R(z,M)\|\le1/\mathrm{dist}(z,[0,1])$.
- `m-in` (inegalite) : Pour $z\in[0,1]$ : avec $J_n=\,]0,1[\,\cap\,]z-1/n,z+1/n[$ et $u_n=|J_n|^{-1/2}\mathbb 1_{J_n}$, on a $\|u_n\|=1$ et $\|(zI-M)u_n\|\le1/n$.
- `m-spec` (egalite) : $\sigma(M)=[0,1]$.
- `m-vp` (consequence) : $M$ n'a aucune valeur propre.
- `m-nonsurj` (consequence) : Pour $z\in[0,1]$ : la fonction constante $1$ n'appartient pas à $\mathrm{Im}(zI-M)$.
- `m-continu` (consequence) : Pour tout $z\in[0,1]$ : $zI-M$ est injectif, d'image dense et non surjectif ; tout le spectre de $M$ est donc continu.
- `m-E` (egalite) : $E_M$ est une mesure spectrale représentant $M$, $\mu_u(B)=\int_{B\cap]0,1[}|u|^2\,dx$, et $E_M(\{z\})=0$ pour tout $z\in\mathbb R$.
- `a-T` (consequence) : $T$ est compact, auto-adjoint, injectif, et $0\le\langle Tf,f\rangle\le\|f\|^2$ pour tout $f\in K$.
- `a-base` (application-theoreme) : Il existe une base hilbertienne $(\varphi_k)_{k\ge1}$ de $K$ avec $T\varphi_k=\tau_k\varphi_k$, $\tau_k\in\,]0,1]$, $\tau_k\to0$, chaque valeur propre étant de multiplicité finie.
- `a-vp` (egalite) : $\varphi_k\in D(A)$, $A\varphi_k=\lambda_k\varphi_k$ avec $\lambda_k=\tau_k^{-1}-1\ge0$, $\lambda_k\to+\infty$, et $A$ est diagonal dans la base $(\varphi_k)$.
- `a-spec` (egalite) : $\sigma(A)=\{\lambda_k:k\ge1\}$, partie fermée de $\mathbb R$ sans point d'accumulation, chaque $\lambda_k$ étant une valeur propre de multiplicité finie.
- `a-E` (egalite) : $E_A(B)=\sum_{k:\lambda_k\in B}\langle\,\cdot\,,\varphi_k\rangle\varphi_k$ est une mesure spectrale représentant $A$, et $E_A(\{\lambda\})\ne0$ si et seulement si $\lambda\in\sigma(A)$.
- `r2` (consequence) : $2\in\rho(M)$, et $R(2,M)$ est la multiplication par $g(x)=1/(2-x)$, avec $\frac12\le g\le1$ sur $]0,1[$.
- `pc-vp` (consequence) : $R(2,M)$ n'a aucune valeur propre.
- `pc-suite` (inegalite) : Pour $e_k(x)=\sqrt2\sin(k\pi x)$ : $e_k\rightharpoonup0$ faiblement dans $H$, alors que $\|R(2,M)e_k\|\ge\frac12$ pour tout $k$.
- `nc` (consequence) : $R(2,M)$ n'est pas compact.
- `fin` (conclusion) : $\sigma(M)=[0,1]$ est purement continu, sans valeur propre et sans point chargé par $E_M$ ; $\sigma(A)$ est purement discret, et la résolvante $R(2,M)$ n'est pas compacte.
- `x-spec-vide` (egalite, DISTRACTEUR) : Comme $M$ n'a aucune valeur propre, $\sigma(M)=\emptyset$.
- `x-base-M` (consequence, DISTRACTEUR) : $M$ étant auto-adjoint, $H$ admet une base hilbertienne formée de vecteurs propres de $M$.
- `x-compact-borne` (consequence, DISTRACTEUR) : $R(2,M)$ est compact, puisque c'est un opérateur borné de $H$ dans $H$.

Règles :
- `h-M` ⟹ `m-hors` par « Pour $z\notin[0,1]$, $x\mapsto1/(z-x)$ est bornée sur $]0,1[$ ; la multiplication par cette fonction inverse $zI-M$. »
- `h-M` ⟹ `m-in` par « $J_n$ est un intervalle non vide, $|z-x|\le1/n$ sur $J_n$, et $\|\mathbb 1_{J_n}\|^2=|J_n|$. »
- `m-hors` + `m-in` ⟹ `m-spec` par « Si $z\in\rho(M)$, alors $1=\|u_n\|\le\|R(z,M)\|\,\|(zI-M)u_n\|\to0$ : absurde pour $z\in[0,1]$. »
- `h-M` ⟹ `m-vp` par « $(z-x)u(x)=0$ p.p. entraîne $u=0$ p.p., car $\{z\}$ est négligeable. »
- `h-M` ⟹ `m-nonsurj` par « L'équation $(z-x)u(x)=1$ impose $u(x)=1/(z-x)$ p.p., et $\int_0^1|z-x|^{-2}\,dx=+\infty$. »
- `m-vp` + `m-nonsurj` + `m-spec` + `h-M` ⟹ `m-continu` par « Si $v\perp\mathrm{Im}(zI-M)$, alors $(zI-M)v=0$, car $M=M^*$ et $z$ est réel ; l'injectivité donne $v=0$, et le défaut de surjectivité est acquis. »
- `d-Em` + `h-M` ⟹ `m-E` par « $E_M(B)$ est la multiplication par $\mathbb 1_B$, $\langle E_M(B)u,v\rangle=\int_Bu\bar v$, et $\{z\}$ est négligeable. »
- `h-A` + `h-compact` ⟹ `a-T` par « Si $f=(I+A)u$ : $\langle Tf,f\rangle=\|u\|^2+\langle Au,u\rangle\ge0$ et $\|f\|^2\ge\|u\|^2$ ; injectif comme inverse, auto-adjoint car $A$ l'est. »
- `a-T` + `h-dim` ⟹ `a-base` par « Théorème spectral pour les opérateurs compacts auto-adjoints, appliqué à l’opérateur injectif et positif $T$. [spectral-compact] »
- `a-base` + `h-A` ⟹ `a-vp` par « $\varphi_k=\tau_k^{-1}T\varphi_k\in\mathrm{Im}\,T=D(A)$ et $(I+A)\varphi_k=\tau_k^{-1}\varphi_k$ ; on décompose $f=(I+A)u$ sur la base. »
- `a-vp` + `a-base` ⟹ `a-spec` par « Si $z\notin\{\lambda_k\}$, alors $\delta=\inf_k|z-\lambda_k|>0$ puisque $\lambda_k\to+\infty$, et $\sum_k(z-\lambda_k)^{-1}\langle\,\cdot\,,\varphi_k\rangle\varphi_k$ est un inverse borné de $zI-A$. »
- `a-vp` + `a-spec` ⟹ `a-E` par « Calcul diagonal dans la base $(\varphi_k)$, comme dans le cas d'une suite de $\ell^2$. »
- `m-hors` ⟹ `r2` par « Cas particulier $z=2\notin[0,1]$ ; $g$ est croissante sur $]0,1[$. »
- `r2` ⟹ `pc-vp` par « $g$ est injective : $(g(x)-\mu)u(x)=0$ p.p. impose $u=0$ p.p. » (chemin vecteurs-propres)
- `r2` ⟹ `pc-suite` par « Une suite orthonormée tend faiblement vers $0$ ; $g\ge\frac12$ donne $\|ge_k\|\ge\frac12\|e_k\|$. » (chemin suite-orthonormee)
- `pc-vp` + `h-M` ⟹ `nc` par « Si $R(2,M)$, auto-adjoint, était compact, le théorème spectral compact fournirait un vecteur propre. [spectral-compact] » (chemin vecteurs-propres)
- `pc-suite` ⟹ `nc` par « Un opérateur compact envoie toute suite faiblement nulle sur une suite fortement nulle. » (chemin suite-orthonormee)
- `m-spec` + `m-continu` + `m-E` + `a-spec` + `a-E` + `nc` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « Le spectre d’un opérateur auto-adjoint est l’adhérence de l’ensemble de ses valeurs propres. » ; « Un opérateur borné envoie la boule unité sur une partie relativement compacte. » ; « Le théorème spectral général fournit, pour tout opérateur auto-adjoint, une base hilbertienne de vecteurs propres. »

Pièges :
- `x-spec-vide` → incorrect [spectral-general-spectre-ponctuel] : L'absence de valeur propre dit que $zI-M$ est injectif, non qu'il est bijectif d'inverse borné. Le spectre peut être non vide sans contenir aucune valeur propre. — Contre-exemple : Pour $z=\frac12$ : $zI-M$ est injectif, mais la fonction $1$ n'appartient pas à son image, donc $\frac12\in\sigma(M)$.
- `x-base-M` → incorrect [spectral-general-spectre-ponctuel] : La base de vecteurs propres provient du théorème spectral compact : elle exige la compacité. Ici, $M$ n'a aucune valeur propre, donc aucun vecteur propre. — Contre-exemple : Si $Mu=zu$ dans $H$, alors $(x-z)u(x)=0$ p.p., donc $u=0$.
- `x-compact-borne` → incorrect [compact-continue] : En dimension infinie, borné n'implique pas compact : une suite orthonormée met en défaut toute extraction convergente. — Contre-exemple : $e_k(x)=\sqrt2\sin(k\pi x)$ : $e_k\rightharpoonup0$, mais $\|R(2,M)e_k\|\ge\frac12$ pour tout $k$.
- `m-spec` par « Le spectre d’un opérateur auto-adjoint est l’adhérence de l’ensemble de ses valeurs propres. » → incorrect [spectral-general-spectre-ponctuel] : Cette description vaut lorsqu'il existe une base hilbertienne de vecteurs propres, par exemple pour une résolvante compacte, mais pas en général. Pour $M$, l'ensemble des valeurs propres est vide alors que $\sigma(M)=[0,1]$. — Contre-exemple : $M$ elle-même : aucune valeur propre, spectre égal à $[0,1]$.
- `nc` par « Un opérateur borné envoie la boule unité sur une partie relativement compacte. » → incorrect [compact-continue] : Cet argument prouverait la compacité de $R(2,M)$, et il est faux en dimension infinie.
- `a-base` par « Le théorème spectral général fournit, pour tout opérateur auto-adjoint, une base hilbertienne de vecteurs propres. » → incorrect [spectral-general-spectre-ponctuel] : Le théorème spectral général fournit une mesure spectrale, pas une base de vecteurs propres : c'est la compacité de $T$ qui donne une telle base. — Contre-exemple : $M$ est auto-adjoint, et n'a aucun vecteur propre.

Retraits :
- `h-compact` (nécessaire) : Sans compacité, le théorème spectral compact ne s'applique plus : le spectre peut ne pas être discret. — Contre-exemple : $A=M$ sur $L^2(]0,1[)$ est auto-adjoint positif, $T=(I+M)^{-1}$ est la multiplication par $1/(1+x)$, non compacte, et $\sigma(M)=[0,1]$ ne contient aucune valeur propre.
- `h-dim` (nécessaire) : En dimension finie, la suite $(\lambda_k)$ est finie : la divergence vers $+\infty$ n'a pas lieu. — Contre-exemple : $K=\mathbb C^2$, $A=I$ : $T=\frac12I$ est compact, et $\sigma(A)=\{1\}$.

Calculs fermés : [{"kind":"rational","prompt":"Valeur de $\\|R(3/2,M)\\|=\\sup_{x\\in]0,1[}\\dfrac1{|3/2-x|}$","expected":"2"}]

Solution :
**(1) La multiplication $M$.** Pour $z\notin[0,1]$, $x\mapsto1/(z-x)$ est bornée sur $]0,1[$, et la multiplication par cette fonction est l'inverse borné de $zI-M$ : $z\in\rho(M)$, avec $\|R(z,M)\|\le1/\mathrm{dist}(z,[0,1])$. Pour $z\in[0,1]$, posons $J_n=\,]0,1[\,\cap\,]z-1/n,z+1/n[$ et $u_n=|J_n|^{-1/2}\mathbb 1_{J_n}$ : $\|u_n\|=1$ et $\|(zI-M)u_n\|\le1/n$. Si $z$ était dans $\rho(M)$, on aurait $1\le\|R(z,M)\|/n\to0$, ce qui est absurde. Donc $\sigma(M)=[0,1]$.

Si $(z-x)u(x)=0$ p.p., alors $u=0$ p.p. car $\{z\}$ est négligeable : $M$ n'a aucune valeur propre. Pour $z\in[0,1]$, l'orthogonal de $\mathrm{Im}(zI-M)$ est $\ker(zI-M)=\{0\}$, car $M=M^*$ et $z$ est réel : l'image est dense. Elle est stricte, car $(z-x)u(x)=1$ impose $u=1/(z-x)$ p.p., et $\int_0^1|z-x|^{-2}dx=+\infty$. Tout point de $[0,1]$ est donc dans le spectre continu.

La famille $E_M(B)u=\mathbb 1_Bu$ est une mesure spectrale, et $\langle Mu,v\rangle=\int x\,u\bar v=\int_{\mathbb R}\lambda\,d\langle E_M(\lambda)u,v\rangle$ : elle représente $M$. On a $\mu_u(B)=\int_{B\cap]0,1[}|u|^2dx$, et $E_M(\{z\})=0$ pour tout réel $z$.

**(2) La résolvante compacte.** Pour $f=(I+A)u$, $\langle Tf,f\rangle=\|u\|^2+\langle Au,u\rangle\ge0$ et $\|f\|^2=\|u\|^2+2\langle Au,u\rangle+\|Au\|^2\ge\|u\|^2$ : $T$ est compact, auto-adjoint, injectif, et $0\le T\le I$. Le théorème spectral compact, avec $\dim K=\infty$, donne une base hilbertienne $(\varphi_k)$ et $T\varphi_k=\tau_k\varphi_k$, $\tau_k\in\,]0,1]$, de multiplicités finies, $\tau_k\to0$. Alors $\varphi_k=\tau_k^{-1}T\varphi_k\in D(A)$, $A\varphi_k=\lambda_k\varphi_k$, $\lambda_k=\tau_k^{-1}-1\to+\infty$ ; et pour $u=Tf$, $u_k=\tau_kf_k$, donc $D(A)=\{u:\sum_k(1+\lambda_k)^2|u_k|^2<\infty\}$ et $Au=\sum_k\lambda_ku_k\varphi_k$.

Si $z\notin\{\lambda_k\}$, alors $\delta=\inf_k|z-\lambda_k|>0$, et $\sum_k(z-\lambda_k)^{-1}\langle\cdot,\varphi_k\rangle\varphi_k$ est l'inverse borné de $zI-A$. Donc $\sigma(A)=\{\lambda_k\}$, partie fermée sans point d'accumulation, chaque point étant valeur propre de multiplicité finie. La mesure spectrale $E_A(B)=\sum_{\lambda_k\in B}\langle\cdot,\varphi_k\rangle\varphi_k$ est ici discrète.

**(3) Résolvante de $M$.** $R(2,M)$ est la multiplication par $g(x)=1/(2-x)$, $\frac12\le g\le1$. *Par vecteurs propres* : si $R(2,M)$ était compact, le théorème spectral compact fournirait un vecteur propre ; or $g$ injective interdit tout vecteur propre. *Par suite orthonormée* : $e_k=\sqrt2\sin(k\pi\cdot)$ vérifie $e_k\rightharpoonup0$, alors que $\|ge_k\|\ge\frac12$, ce qui contredirait la compacité.

**Conclusion.** Un opérateur auto-adjoint à résolvante compacte a un spectre purement discret, réduit à une suite de valeurs propres, et une mesure spectrale portée par ces points. La multiplication $M$ a au contraire un spectre continu, sans aucun point chargé : sa résolvante n'est pas compacte.

Indices :
1. Pour $M$ : où $zI-M$ cesse-t-il d'être inversible, et que se passe-t-il pour $z\in[0,1]$ avec des fonctions concentrées près de $z$ ? Pour $A$ : quel opérateur compact est naturellement associé à $A$ ?
2. Sépare les deux études. Pour $M$ : spectre, absence de valeurs propres, caractère continu. Pour $A$ : théorème spectral compact appliqué à $T$. La comparaison porte ensuite sur la compacité de $R(2,M)$.
3. Sur $[0,1]$ : $u_n=|J_n|^{-1/2}\mathbb 1_{J_n}$, avec $J_n$ un intervalle autour de $z$. Pour $A$ : $\lambda_k=\tau_k^{-1}-1$. Pour la non-compacité : $e_k=\sqrt2\sin(k\pi\cdot)$ ou absence de vecteur propre.

Erreurs fréquentes :
- Confondre spectre et ensemble des valeurs propres.
- Déduire de l’auto-adjonction l’existence d’une base de vecteurs propres.
- Affirmer qu’un opérateur borné est compact.

Variante : Soit $N$ la multiplication par $x^2$ sur $L^2(]0,1[)$, et soit $A=-\dfrac{d^2}{dx^2}$ sur $D(A)=H^2(]0,1[)\cap H^1_0(]0,1[)$. Montrer que $\sigma(N)=[0,1]$ sans valeur propre et que $\sigma(A)=\{k^2\pi^2:k\ge1\}$, purement discret. Calculer $\|R(2,N)\|$.

Solution de la variante : La fonction $m(x)=x^2$ est continue, strictement croissante et d'image $]0,1[$ sur $]0,1[$. Comme dans l'exercice, $zI-N$ a un inverse borné de multiplication par $1/(z-m)$ si $z\notin[0,1]$, de norme $\sup_x1/|z-m(x)|$ ; pour $z\in[0,1]$, une suite concentrée autour du point où $m=z$ fournit une suite approchée, donc $\sigma(N)=[0,1]$ ; et $(z-m)u=0$ p.p. impose $u=0$ p.p. Ainsi $N$ n'a pas de valeur propre et $\|R(2,N)\|=\sup_{]0,1[}1/(2-x^2)=1$.

D'après le polycopié (résolvante compacte du laplacien de Dirichlet, p. PDF 24), $(I+A)^{-1}$ est compact ; les fonctions propres sont $\sqrt2\sin(k\pi x)$ et les valeurs propres $k^2\pi^2$. La méthode de l'exercice donne $\sigma(A)=\{k^2\pi^2:k\ge1\}$, purement discret.

Vérification : {"origin":"complement","review":"machine"}