# 24. Adjoint d’un opérateur densément défini (`adjoint`) — polycopié p. PDF 23, section 6.1

## Fiche

Espaces : $H$ : espace de Hilbert réel, de produit scalaire $\langle\cdot,\cdot\rangle$ (dans le cas complexe, le produit scalaire est linéaire en la première variable). | $A:D(A)\subset H\to H$ : opérateur linéaire, éventuellement non borné, défini sur un sous-espace vectoriel $D(A)$ de $H$. | Graphe de $A$ : $\{(u,Au):u\in D(A)\}\subset H\times H$, pour la topologie produit de la norme.

Hypothèses :
- $H$ est un espace de Hilbert.
- $A$ est linéaire, de domaine un sous-espace vectoriel $D(A)$ de $H$.
- $D(A)$ est dense dans $H$. — Sans elle : Dans $\mathbb R^2$, si $D(A)=\mathbb R\times\{0\}$ et $A=0$, alors pour tout $v$ et tout $b\in\mathbb R$, le vecteur $w=(0,b)$ convient : $A^*v$ n'est pas défini de façon unique.
- Pour la dernière assertion : $A$ est symétrique, c'est-à-dire $\langle Au,v\rangle=\langle u,Av\rangle$ pour tous $u,v\in D(A)$. — Sans elle : Pour $A=d/dx$ sur $\{u\in H^1(]0,1[):u(0)=0\}$, avec $u(x)=x$ et $v(x)=x^2$ : $\langle Au,v\rangle=\frac13$ et $\langle u,Av\rangle=\frac23$ ; et $A\not\subset A^*$.

Énoncé : Si $A$ est densément défini, son adjoint $A^*$ est défini par
$$D(A^*)=\{v\in H:\exists w\in H,\ \langle Au,v\rangle=\langle u,w\rangle\ \forall u\in D(A)\},\qquad A^*v=w.$$
L'opérateur $A^*$ est fermé. Si $A$ est symétrique, alors $A\subset A^*$ ; il est auto-adjoint si $A=A^*$, domaines inclus.

Bilan : {"unicite":"Pour $v\\in D(A^*)$, le vecteur $w$ est unique : c'est la densité de $D(A)$ qui rend $A^*$ bien défini.","autre":"$A^*$ est linéaire et fermé, sans hypothèse de fermeture sur $A$. Si $A$ est symétrique, $A\\subset A^*$. L'auto-adjonction est l'égalité $A=A^*$, domaines inclus."}

Preuve dans le polycopié : idee

Plan :
1. Unicité de $w$ : si $w,w'$ conviennent, $\langle u,w-w'\rangle=0$ pour tout $u\in D(A)$, et la densité donne $w=w'$.
2. Linéarité : $D(A^*)$ est un sous-espace, et $v\mapsto w$ est linéaire, par linéarité de la relation définissant $w$.
3. Caractérisation par Riesz : $v\in D(A^*)$ si et seulement si $u\mapsto\langle Au,v\rangle$ est continue sur $D(A)$ pour la norme de $H$ ; on la prolonge à $H$ par densité.
4. Fermeture de $A^*$ : si $v_n\in D(A^*)$, $v_n\to v$ et $A^*v_n\to w$, on passe à la limite dans $\langle Au,v_n\rangle=\langle u,A^*v_n\rangle$ à $u\in D(A)$ fixé, d'où $v\in D(A^*)$ et $A^*v=w$.
5. Si $A$ est symétrique, tout $v\in D(A)$ convient avec $w=Av$ : c'est l'inclusion $A\subset A^*$.

Vigilance :
- L’adjoint dépend du domaine : une expression différentielle seule ne définit pas un opérateur.
- $A\subset A^*$ n'entraîne pas $A=A^*$ : les domaines peuvent différer.
- Sans densité de $D(A)$, le vecteur $w$ n'est pas unique et $A^*$ n'est pas défini.
- C'est $A^*$ qui est fermé, sans hypothèse sur $A$ : l'énoncé ne dit pas que $A$ est fermé.

Vérification : {"origin":"complement","review":"machine","notes":"Énoncé repris du polycopié (p. PDF 23), qui n’en donne qu’une lecture géométrique ; la démonstration de la fiche est rédigée pour ProofLab."}

Définition « Opérateur fermé » : $A:D(A)\subset H\to H$ est fermé si son graphe est fermé dans $H\times H$ ; concrètement, si $u_n\in D(A)$, $u_n\to u$ dans $H$ et $Au_n\to v$ dans $H$, alors $u\in D(A)$ et $Au=v$.

Définition « Opérateur densément défini » : $A:D(A)\subset H\to H$ est densément défini si $D(A)$ est dense dans $H$.

Définition « Adjoint » : Si $A$ est densément défini, $D(A^*)=\{v\in H:\exists w\in H,\ \langle Au,v\rangle=\langle u,w\rangle\ \forall u\in D(A)\}$, et $A^*v=w$.

Définition « Extension » : $A\subset B$ signifie $D(A)\subset D(B)$ et $Bu=Au$ pour tout $u\in D(A)$.

Définition « Opérateur symétrique » : $A$, densément défini, est symétrique si $\langle Au,v\rangle=\langle u,Av\rangle$ pour tous $u,v\in D(A)$ ; on a alors $A\subset A^*$.

Définition « Opérateur auto-adjoint » : $A$ est auto-adjoint si $A=A^*$, domaines inclus : $D(A)=D(A^*)$ et $A^*u=Au$ pour tout $u\in D(A)$.

## Contre-exemple `ce-adjoint-sans-densite` : Domaine non dense
Assertion : Tout opérateur linéaire $A:D(A)\subset H\to H$ admet un adjoint bien défini par la relation $\langle Au,v\rangle=\langle u,w\rangle$.
Tâche : Dans $H=\mathbb R^2$, soit $D(A)=\mathbb R\times\{0\}$ et $A=0$. Pour $v=(1,0)$, détermine la dimension de l'ensemble des $w\in\mathbb R^2$ vérifiant $\langle Au,v\rangle=\langle u,w\rangle$ pour tout $u\in D(A)$.
Vérification : {"kind":"rational","prompt":"Dimension de cet ensemble","expected":"1"}
Explication : La relation s'écrit $0=s\,w_1$ pour tout $s\in\mathbb R$ : donc $w_1=0$ et $w_2$ est libre. L'ensemble est la droite $\{0\}\times\mathbb R$, de dimension $1$ : le vecteur $w$ n'est pas unique.

## Contre-exemple `ce-adjoint-symetrique-non-auto` : Symétrique, non auto-adjoint
Assertion : Tout opérateur symétrique densément défini est auto-adjoint.
Tâche : Soit $S=-d^2/dx^2$ sur $D(S)=\{u\in H^2(]0,1[):u(0)=u'(0)=u(1)=u'(1)=0\}$, dans $L^2(]0,1[)$ réel. Donne la valeur constante de $S^*v$ pour $v(x)=x^2$, qui n'appartient pas à $D(S)$.
Vérification : {"kind":"rational","prompt":"Valeur constante de $S^*v$","expected":"-2"}
Explication : Pour $u\in D(S)$, deux intégrations par parties donnent $\int_0^1(-u'')x^2=-2\int_0^1u$, les termes de bord étant nuls : $x^2\in D(S^*)$ et $S^*x^2=-2$. Comme $v(1)=1\neq 0$, on a $x^2\notin D(S)$ : $S$ est symétrique et non auto-adjoint.

## Contre-exemple `ce-adjoint-meme-domaine` : Expression différentielle seule
Assertion : Si $A=d/dx$ sur un domaine $D(A)\subset H^1(]0,1[)$, alors $A^*=-d/dx$ sur le même domaine.
Tâche : Prenons $D(A)=\{u\in H^1(]0,1[):u(0)=0\}$, dense dans $L^2(]0,1[)$. Pour $u(x)=x\in D(A)$ et $v(x)=x$, calcule $\int_0^1u'v+\int_0^1uv'$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\int_0^1u'v+\\int_0^1uv'$","expected":"1"}
Explication : La somme vaut $u(1)v(1)=1\neq 0$. Si $v(x)=x$ appartenait à $D(A^*)$ avec $A^*v=-v'$, cette somme serait nulle pour $u(x)=x$ : donc $x\notin D(A^*)$, alors que $x\in D(A)$.

## Exercice facile `adjoint.facile` : Adjoint d’une matrice réelle

Énoncé : Dans $H=\mathbb R^3$ muni du produit scalaire euclidien, soit $A=\begin{pmatrix}1&2&0\\-1&3&4\\0&5&2\end{pmatrix}$, de domaine $D(A)=\mathbb R^3$. À partir de la définition de l'adjoint, déterminer $D(A^*)$ et la matrice de $A^*$, puis calculer $A^*v_0$ pour $v_0=(1,2,-1)$.
Source : {"doc":"polycopie","pdfPage":42,"label":"Exercice 24, facile ; définition de l’adjoint en section 6.1 (p. PDF 23)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-H` (hypothese) : $H=\mathbb R^3$, muni de $\langle x,y\rangle=\sum_{i=1}^3x_iy_i$, est un espace de Hilbert réel.
- `d-A` (definition) : $A=(a_{ij})$ est la matrice de l'énoncé, de domaine $D(A)=\mathbb R^3$.
- `d-v0` (definition) : $v_0=(1,2,-1)$ et $u_0=(1,0,1)$.
- `v-local` (definition, locale) : Soit $v\in\mathbb R^3$.
- `dense` (consequence) : $D(A)$ est dense dans $H$.
- `dev` (egalite) : Pour tout $u\in\mathbb R^3$ : $\langle Au,v\rangle=\sum_{i=1}^3\big(\sum_{j=1}^3a_{ij}u_j\big)v_i$.
- `echange` (egalite) : Pour tout $u\in\mathbb R^3$ : $\langle Au,v\rangle=\sum_{j=1}^3u_j\big(\sum_{i=1}^3a_{ij}v_i\big)$.
- `base-ej` (egalite) : Pour $j=1,2,3$ : $\langle Ae_j,v\rangle=\sum_{i=1}^3a_{ij}v_i$.
- `lin-u` (consequence) : Si $\langle Ae_j,v\rangle=\langle e_j,w\rangle$ pour $j=1,2,3$, alors $\langle Au,v\rangle=\langle u,w\rangle$ pour tout $u\in\mathbb R^3$.
- `w-def` (egalite) : Le vecteur $w=A^{\mathsf T}v$, de coordonnées $w_j=\sum_{i=1}^3a_{ij}v_i$, vérifie $\langle Au,v\rangle=\langle u,w\rangle$ pour tout $u\in\mathbb R^3$.
- `dom` (inclusion) : $D(A^*)=\mathbb R^3$.
- `unique` (consequence) : Pour chaque $v$, le vecteur $w$ est unique.
- `formule` (egalite) : $A^*=A^{\mathsf T}$, c'est-à-dire $(A^*)_{ij}=a_{ji}$.
- `mat` (egalite, calcul rational-vector) : $A^*=\begin{pmatrix}1&-1&0\\2&3&5\\0&4&2\end{pmatrix}$.
  - valeur attendue : ["1","-1","0","2","3","5","0","4","2"]
- `val` (egalite, calcul rational-vector) : $A^*v_0=(-1,3,6)$.
  - valeur attendue : ["-1","3","6"]
- `ctrl` (egalite, calcul rational) : $\langle Au_0,v_0\rangle=\langle u_0,A^*v_0\rangle=5$.
  - valeur attendue : "5"
- `fin` (conclusion) : $D(A^*)=\mathbb R^3$, $A^*=A^{\mathsf T}$, et les valeurs demandées sont établies.
- `x-inverse` (consequence, DISTRACTEUR) : $A^*=A^{-1}$.
- `x-self` (egalite, DISTRACTEUR) : $A^*=A$, car $\langle Au,v\rangle=\langle u,Av\rangle$ pour tous $u,v\in\mathbb R^3$.

Règles :
- `d-A` ⟹ `dense` par « Le domaine est $H$ tout entier. »
- `v-local` + `d-A` + `h-H` ⟹ `dev` par « Définition du produit matriciel et du produit scalaire euclidien. » (chemin coordonnees)
- `dev` ⟹ `echange` par « Interversion de deux sommes finies. » (chemin coordonnees)
- `echange` ⟹ `w-def` par « Le coefficient de $u_j$ est la $j$-ième coordonnée de $A^{\mathsf T}v$. » (chemin coordonnees)
- `v-local` + `d-A` + `h-H` ⟹ `base-ej` par « $Ae_j$ est la $j$-ième colonne de $A$ : on lit $\langle Ae_j,v\rangle$ sur les coordonnées. » (chemin base)
- `d-A` + `h-H` ⟹ `lin-u` par « Linéarité de $u\mapsto\langle Au,v\rangle-\langle u,w\rangle$ : nulle sur la base canonique, elle est nulle. » (chemin base)
- `base-ej` + `lin-u` ⟹ `w-def` par « $\langle e_j,A^{\mathsf T}v\rangle$ est la $j$-ième coordonnée de $A^{\mathsf T}v$, puis linéarité en $u$. » (chemin base)
- `w-def` ⟹ `dom` par « Définition de $D(A^*)$ : un vecteur $w$ convenable existe pour chaque $v$. »
- `dense` ⟹ `unique` par « Si $w,w'$ conviennent, $\langle u,w-w'\rangle=0$ pour tout $u$ dans un ensemble dense : d'où $w=w'$. »
- `w-def` + `unique` + `dom` ⟹ `formule` par « Identification : pour chaque $v$, le vecteur $w$ construit est l'unique vecteur convenable. »
- `formule` + `d-A` ⟹ `mat` par « Lecture des coefficients par transposition. »
- `mat` + `d-v0` ⟹ `val` par « Produit matrice-vecteur. »
- `val` + `d-A` + `d-v0` ⟹ `ctrl` par « Calcul direct des deux produits scalaires. »
- `dom` + `formule` + `mat` + `val` + `ctrl` ⟹ `fin` par « Réunion des résultats établis. »

Justifications sans règle (séduisantes ou fausses) : « Le produit scalaire est symétrique : $A$ passe de l'autre côté sans changement. » ; « $A$ est inversible, donc $w$ est déterminé par $v$. » ; « Une matrice réelle inversible vérifie $A^{-1}=A^{\mathsf T}$. » ; « C’est évident. »

Pièges :
- `x-inverse` → incorrect [adjoint-transposee-inverse] : L'adjoint est défini par l'identité $\langle Au,v\rangle=\langle u,A^*v\rangle$, sans référence à l'inverse. La relation $A^*=A^{-1}$ caractérise les matrices orthogonales. — Contre-exemple : Elle donnerait $A^{\mathsf T}A=I$ ; or le coefficient $(1,1)$ de $A^{\mathsf T}A$ vaut $1^2+(-1)^2+0^2=2\neq 1$.
- `x-self` → incorrect [symetrie-autoadjonction] : $A$ n'est pas symétrique : l'identité $\langle Au,v\rangle=\langle u,Av\rangle$ est fausse ici. — Contre-exemple : $u=e_1$, $v=e_2$ : $\langle Ae_1,e_2\rangle=a_{21}=-1$ et $\langle e_1,Ae_2\rangle=a_{12}=2$.
- `w-def` par « Le produit scalaire est symétrique : $A$ passe de l'autre côté sans changement. » → incorrect [symetrie-autoadjonction] : La symétrie du produit scalaire échange les deux arguments : $\langle Au,v\rangle=\langle v,Au\rangle$. Elle ne fait pas passer $A$ sur l'autre argument. — Contre-exemple : Avec $u=e_1$, $v=e_2$ : $\langle Ae_1,e_2\rangle=-1$, tandis que $\langle e_1,Ae_2\rangle=2$.
- `unique` par « $A$ est inversible, donc $w$ est déterminé par $v$. » → incorrect [adjoint-densite-unicite] : L'unicité de $w$ ne dépend pas de $A$, mais du domaine : si $\langle u,w-w'\rangle=0$ pour tout $u$ d'un ensemble dense, alors $w=w'$. — Contre-exemple : Pour la matrice nulle, non inversible, le vecteur $w=0$ reste l'unique vecteur convenable.
- `formule` par « Une matrice réelle inversible vérifie $A^{-1}=A^{\mathsf T}$. » → incorrect [adjoint-transposee-inverse] : L'égalité $A^{-1}=A^{\mathsf T}$ caractérise les matrices orthogonales : elle n'est pas vraie pour une matrice inversible quelconque. — Contre-exemple : $(2I)^{-1}=\tfrac12I$ et $(2I)^{\mathsf T}=2I$.
- `formule` par « C’est évident. » → a-justifier [justification-absente] : Cette identification se démontre : il faut l'existence de $w$ pour chaque $v$ et son unicité.

Retraits :
- `dense` (nécessaire) : Sans densité, le vecteur $w$ n'est pas déterminé par $v$ : l'adjoint n'est plus une application. — Contre-exemple : Dans $\mathbb R^2$, soit $D(B)=\mathbb R\times\{0\}$ et $B=0$. Pour tout $v$ et tout $b\in\mathbb R$, le vecteur $w=(0,b)$ vérifie $\langle Bu,v\rangle=\langle u,w\rangle$ sur $D(B)$.

Calculs fermés : [{"kind":"rational","prompt":"Valeur de $\\langle Ae_1,e_2\\rangle-\\langle e_1,Ae_2\\rangle$","expected":"-3"}]

Solution :
**Cadre.** $D(A)=\mathbb R^3$ est l'espace entier, donc dense : pour chaque $v$, le vecteur $w$ convenable, s'il existe, est unique.

**Calcul.** Pour $u,v\in\mathbb R^3$,
$$\langle Au,v\rangle=\sum_{i=1}^3\Big(\sum_{j=1}^3a_{ij}u_j\Big)v_i=\sum_{j=1}^3u_j\Big(\sum_{i=1}^3a_{ij}v_i\Big)=\langle u,A^{\mathsf T}v\rangle.$$
Ainsi tout $v$ appartient à $D(A^*)$, donc $D(A^*)=\mathbb R^3$, et par unicité $A^*v=A^{\mathsf T}v$.

**Valeurs.** $A^*=A^{\mathsf T}=\begin{pmatrix}1&-1&0\\2&3&5\\0&4&2\end{pmatrix}$, et $A^*v_0=(1-2,\ 2+6-5,\ 8-2)=(-1,3,6)$.

**Contrôle.** Pour $u_0=(1,0,1)$ : $Au_0=(1,3,2)$, donc $\langle Au_0,v_0\rangle=1+6-2=5$, et $\langle u_0,A^*v_0\rangle=-1+6=5$.

**Point de vigilance.** La matrice $A$ est inversible ($\det A=-10$), mais son inverse n'a aucun rapport avec son adjoint.

Indices :
1. Quelle relation définit $A^*v$ ? Que faut-il exhiber, pour un $v$ fixé ?
2. Développe $\langle Au,v\rangle$ en coordonnées et regroupe les termes selon les $u_j$, ou bien teste la relation sur la base canonique.
3. Le coefficient de $u_j$ est $\sum_ia_{ij}v_i$ : reconnais la $j$-ième coordonnée d'un produit matrice-vecteur, puis conclus par unicité.

Erreurs fréquentes :
- Confondre l’adjoint et l’inverse.
- Écrire $\langle Au,v\rangle=\langle u,Av\rangle$ pour une matrice non symétrique.
- Ne pas justifier que le vecteur $w$ est unique.

Variante : Dans $\mathbb R^2$, muni du produit scalaire $\langle x,y\rangle_M=x^{\mathsf T}My$ avec $M=\begin{pmatrix}1&0\\0&2\end{pmatrix}$, soit $A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$, de domaine $\mathbb R^2$. Déterminer l'adjoint de $A$ pour ce produit scalaire et le comparer à $A^{\mathsf T}$.

Solution de la variante : On cherche $B$ tel que $(Ax)^{\mathsf T}My=x^{\mathsf T}MBy$ pour tous $x,y$, c'est-à-dire $A^{\mathsf T}M=MB$. Comme $M$ est inversible, $B=M^{-1}A^{\mathsf T}M=\begin{pmatrix}1&6\\1&4\end{pmatrix}$. Cette matrice diffère de $A^{\mathsf T}=\begin{pmatrix}1&3\\2&4\end{pmatrix}$ : l'adjoint dépend du produit scalaire, et la transposée n'est l'adjoint que pour le produit euclidien.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `adjoint.intermediaire` : Adjoint de la dérivation avec condition au bord

Énoncé : Dans $H=L^2(]0,1[)$ réel, soit $A=d/dx$, de domaine $D(A)=\{u\in H^1(]0,1[):u(0)=0\}$. Montrer que $A$ est densément défini, déterminer $D(A^*)$ et l'action de $A^*$, puis comparer $D(A)$ et $D(A^*)$.
Source : {"doc":"polycopie","pdfPage":42,"label":"Exercice 24, intermédiaire ; définition de l’adjoint en section 6.1 (p. PDF 23)"} — prérequis : distributions

But : `fin` — usage : application

Nœuds :
- `h-H` (hypothese) : $H=L^2(]0,1[)$, réel, est un espace de Hilbert, et $C^\infty_c(]0,1[)$ y est dense.
- `d-A` (definition) : $Au=u'$, de domaine $D(A)=\{u\in H^1(]0,1[):u(0)=0\}$.
- `h-ipp` (hypothese) : Les éléments de $H^1(]0,1[)$ ont un représentant continu sur $[0,1]$, et pour $u,v\in H^1(]0,1[)$ : $\int_0^1u'v=u(1)v(1)-u(0)v(0)-\int_0^1uv'$.
- `dense` (consequence) : $D(A)$ est dense dans $H$.
- `s-v` (definition, locale) : Soit $v\in H^1(]0,1[)$ avec $v(1)=0$.
- `s-bord` (egalite) : Pour tout $u\in D(A)$ : $\int_0^1u'v=-\int_0^1uv'$.
- `s-in` (inclusion) : $v\in D(A^*)$ et $A^*v=-v'$.
- `n-v` (definition, locale) : Soit $v\in D(A^*)$, et $w=A^*v\in L^2(]0,1[)$ : on a $\int_0^1u'v=\int_0^1uw$ pour tout $u\in D(A)$.
- `n-test` (egalite) : Pour tout $\varphi\in C^\infty_c(]0,1[)$ : $\int_0^1v\varphi'=\int_0^1w\varphi$.
- `n-h1` (consequence) : $v'=-w$ dans $\mathcal D'(]0,1[)$, donc $v\in H^1(]0,1[)$ et $A^*v=-v'$.
- `n-bord` (egalite) : Pour tout $u\in D(A)$ : $u(1)v(1)=0$.
- `n-temoin` (consequence) : La fonction $u_1(x)=x$ appartient à $D(A)$, et $u_1(1)=1$.
- `n-cond` (consequence) : $v(1)=0$.
- `p-W` (consequence) : La fonction $W(x)=\int_x^1w(t)\,dt$ appartient à $H^1(]0,1[)$, avec $W'=-w$ et $W(1)=0$.
- `p-dual` (egalite) : Pour tout $u\in D(A)$ : $\int_0^1uw=\int_0^1u'W$.
- `p-surj` (consequence) : Pour toute $g\in L^2(]0,1[)$, la fonction $u_g(x)=\int_0^xg$ appartient à $D(A)$, et $u_g'=g$.
- `p-ortho` (egalite) : Pour toute $g\in L^2(]0,1[)$ : $\int_0^1g(v-W)=0$.
- `p-egal` (consequence) : $v=W$ presque partout : donc $v\in H^1(]0,1[)$, $v'=-w$ et $v(1)=0$.
- `n-in` (inclusion) : $v\in H^1(]0,1[)$, $v(1)=0$ et $A^*v=-v'$.
- `eq-dom` (egalite) : $D(A^*)=\{v\in H^1(]0,1[):v(1)=0\}$, et $A^*v=-v'$.
- `c-x` (consequence) : $x\mapsto x$ appartient à $D(A)$ et non à $D(A^*)$ ; $x\mapsto 1-x$ appartient à $D(A^*)$ et non à $D(A)$.
- `fin` (conclusion) : $D(A)$ et $D(A^*)$ sont distincts et non emboîtés : $A$ n'est ni égal à $A^*$, ni symétrique.
- `x-meme` (egalite, DISTRACTEUR) : $D(A^*)=D(A)$, puisque $A^*$ ne diffère de $A$ que par le signe.
- `x-sans-bord` (egalite, DISTRACTEUR) : $D(A^*)=H^1(]0,1[)$ : aucune condition au bord n'est imposée à $v$.
- `x-signe` (egalite, DISTRACTEUR) : $A^*v=v'$ pour tout $v\in D(A^*)$.

Règles :
- `h-H` + `d-A` ⟹ `dense` par « Une fonction test s'annule en $0$ : $C^\infty_c(]0,1[)\subset D(A)$. »
- `s-v` + `d-A` + `h-ipp` ⟹ `s-bord` par « Intégration par parties : les conditions au bord sur $u$ et sur $v$ annulent le terme de bord. »
- `s-bord` + `dense` ⟹ `s-in` par « Définition de l'adjoint, avec $w=-v'\in L^2(]0,1[)$. »
- `n-v` + `d-A` ⟹ `n-test` par « Les fonctions test appartiennent à $D(A)$ : on spécialise l'identité. » (chemin distributions)
- `n-test` ⟹ `n-h1` par « Définition de la dérivée au sens des distributions, et $w\in L^2(]0,1[)$. » (chemin distributions)
- `n-h1` + `n-v` + `d-A` + `h-ipp` ⟹ `n-bord` par « Intégration par parties, désormais licite, comparée à l'identité définissant $w$. » (chemin distributions)
- `d-A` ⟹ `n-temoin` par « Vérification directe : $u_1\in C^1([0,1])$ et $u_1(0)=0$. » (chemin distributions)
- `n-bord` + `n-temoin` ⟹ `n-cond` par « On teste l'identité avec une fonction de $D(A)$ non nulle en $1$. » (chemin distributions)
- `n-h1` + `n-cond` ⟹ `n-in` par « Réunion de la régularité et de la condition au bord. » (chemin distributions)
- `n-v` ⟹ `p-W` par « Théorème fondamental pour la primitive d'une fonction de $L^2(]0,1[)$. [theoreme-fondamental] » (chemin primitive)
- `p-W` + `d-A` + `h-ipp` ⟹ `p-dual` par « Intégration par parties : $\int_0^1uw=-\int_0^1uW'$, le terme de bord s'annulant car $u(0)=0$ et $W(1)=0$. » (chemin primitive)
- `d-A` ⟹ `p-surj` par « Théorème fondamental ; $u_g(0)=0$. [theoreme-fondamental] » (chemin primitive)
- `p-dual` + `p-surj` + `n-v` ⟹ `p-ortho` par « On écrit $\int_0^1u_g'v=\int_0^1u_gw=\int_0^1u_g'W$, avec $u_g'=g$. » (chemin primitive)
- `p-ortho` + `p-W` ⟹ `p-egal` par « On prend $g=v-W$ : la norme $L^2$ de $v-W$ est nulle. » (chemin primitive)
- `p-egal` ⟹ `n-in` par « Lecture de l’égalité obtenue. » (chemin primitive)
- `s-in` + `n-in` ⟹ `eq-dom` par « Double inclusion. »
- `eq-dom` + `d-A` ⟹ `c-x` par « Évaluation de chaque fonction en $0$ et en $1$. »
- `eq-dom` + `c-x` ⟹ `fin` par « Si $A\subset A^*$, on aurait $D(A)\subset D(A^*)$ : les deux témoins l'interdisent. »

Justifications sans règle (séduisantes ou fausses) : « Intégration par parties appliquée d'emblée à $v\in D(A^*)$. » ; « Tester contre $C^\infty_c(]0,1[)$, qui est dense dans $L^2(]0,1[)$, détermine $D(A^*)$. » ; « C’est évident. »

Pièges :
- `x-meme` → incorrect [domaine-operateur] : L'expression différentielle ne fixe pas le domaine : l'adjoint a ici une condition au bord différente de celle de $A$. — Contre-exemple : $v(x)=1-x$ appartient à $D(A^*)$, car $v(1)=0$, mais pas à $D(A)$, car $v(0)=1$.
- `x-sans-bord` → incorrect [adjoint-tester-domaine] : Tester seulement contre $C^\infty_c(]0,1[)$ ne voit pas le bord. La condition sur $v$ provient des éléments de $D(A)$ non nuls en $1$. — Contre-exemple : Pour $v\equiv 1$ et $u(x)=x\in D(A)$ : $\int_0^1u'v=1$, alors que $-\int_0^1uv'=0$.
- `x-signe` → incorrect [adjoint-signe] : L'intégration par parties fait apparaître un signe : on ne peut pas transporter $d/dx$ sur $v$ sans le changer en $-d/dx$. — Contre-exemple : $u(x)=x$ et $v(x)=1-x$ : $\int_0^1u'v=\frac12$, et $\int_0^1uv'=-\frac12$.
- `n-bord` par « Intégration par parties appliquée d'emblée à $v\in D(A^*)$. » → incorrect [adjoint-ipp-regularite] : À ce stade, on sait seulement $v\in L^2(]0,1[)$ : ni $v'$ ni $v(1)$ n'ont de sens. La régularité doit d'abord être établie, en testant contre $C^\infty_c(]0,1[)$.
- `eq-dom` par « Tester contre $C^\infty_c(]0,1[)$, qui est dense dans $L^2(]0,1[)$, détermine $D(A^*)$. » → incorrect [adjoint-tester-domaine] : Les fonctions test s'annulent au bord : elles ne déterminent ni $v(1)$, ni la condition cherchée. — Contre-exemple : $v\equiv 1$ vérifie $\int_0^1v\varphi'=\int_0^1 0\cdot\varphi$ pour toute fonction test, et pourtant $v\notin D(A^*)$.
- `s-in` par « C’est évident. » → a-justifier [justification-absente] : L'appartenance à $D(A^*)$ se vérifie : il faut exhiber $w$ tel que l'identité ait lieu pour tout $u\in D(A)$.

Retraits :
- `dense` (nécessaire) : Sans densité du domaine, la relation définissant l'adjoint ne détermine plus $w$. — Contre-exemple : Si $D(B)=\{u\in H^1(]0,1[):u(0)=0,\ u=0\text{ sur }]\tfrac12,1[\}$, toute fonction de $L^2(]0,1[)$ portée par $]\tfrac12,1[$ est orthogonale à $D(B)$ : le vecteur $w$ n'est pas unique.
- `n-temoin` (non nécessaire) : La voie distributionnelle ne peut plus conclure $v(1)=0$ ; la voie par primitive reste disponible, car elle utilise $u\mapsto u'$ surjective. — Contre-exemple : Pour $D(A_0)=\{u\in H^1(]0,1[):u(0)=u(1)=0\}$, toutes les fonctions du domaine s'annulent en $1$, et $D(A_0^*)=H^1(]0,1[)$ : aucune condition au bord sur $v$.

Calculs fermés : [{"kind":"rational","prompt":"Pour $u(x)=x$ et $v(x)=1-x$ : valeur de $\\int_0^1u'v$","expected":"1/2"},{"kind":"rational","prompt":"Pour $u(x)=x$ et $v(x)=x$ : valeur de $\\int_0^1u'v+\\int_0^1uv'$","expected":"1"}]

Solution :
**Densité.** $C^\infty_c(]0,1[)\subset D(A)$ et $C^\infty_c(]0,1[)$ est dense dans $L^2(]0,1[)$.

**Première inclusion.** Si $v\in H^1(]0,1[)$ et $v(1)=0$, alors pour $u\in D(A)$ :
$$\int_0^1u'v=u(1)v(1)-u(0)v(0)-\int_0^1uv'=-\int_0^1uv'.$$
Donc $v\in D(A^*)$ et $A^*v=-v'$.

**Inclusion réciproque.** Soit $v\in D(A^*)$ et $w=A^*v$ : $\int_0^1u'v=\int_0^1uw$ pour tout $u\in D(A)$.

*Voie distributionnelle.* En prenant $u=\varphi\in C^\infty_c(]0,1[)$, on obtient $v'=-w$ dans $\mathcal D'(]0,1[)$, donc $v\in H^1(]0,1[)$. Une intégration par parties, désormais licite, donne pour $u\in D(A)$ : $\int_0^1u'v=u(1)v(1)+\int_0^1uw$, d'où $u(1)v(1)=0$. Avec $u(x)=x$, on obtient $v(1)=0$.

*Voie par primitive.* Soit $W(x)=\int_x^1w$ : $W\in H^1(]0,1[)$, $W'=-w$, $W(1)=0$. Pour $u\in D(A)$, $\int_0^1uw=-\int_0^1uW'=\int_0^1u'W$, le terme de bord étant nul. Donc $\int_0^1u'(v-W)=0$ pour tout $u\in D(A)$. Pour $g\in L^2(]0,1[)$, la fonction $u_g(x)=\int_0^xg$ appartient à $D(A)$ et $u_g'=g$ : en prenant $g=v-W$, on trouve $v=W$. Ainsi $v\in H^1(]0,1[)$, $v(1)=0$, $A^*v=-v'$.

**Comparaison.** $D(A^*)=\{v\in H^1(]0,1[):v(1)=0\}$ et $D(A)=\{u\in H^1(]0,1[):u(0)=0\}$ : la fonction $x$ est dans $D(A)\setminus D(A^*)$, et $1-x$ dans $D(A^*)\setminus D(A)$. En particulier, $A\not\subset A^*$ : $A$ n'est pas symétrique.

Indices :
1. Commence par une inclusion facile : pour quels $v\in H^1(]0,1[)$ le terme de bord s'annule-t-il pour tout $u\in D(A)$ ?
2. Pour l'inclusion réciproque, $v$ n'est a priori que dans $L^2$ : teste d'abord contre $C^\infty_c(]0,1[)$. Ensuite seulement, compare avec une fonction du domaine non nulle en $1$.
3. Avec $u(x)=x$, l'identité $u(1)v(1)=0$ donne $v(1)=0$. On peut aussi poser $W(x)=\int_x^1w$ et utiliser la surjectivité de $u\mapsto u'$ de $D(A)$ sur $L^2(]0,1[)$.

Erreurs fréquentes :
- Affirmer que $D(A^*)=D(A)$ parce que l'expression formelle est la même au signe près.
- Intégrer par parties pour un $v\in D(A^*)$ sans avoir établi $v\in H^1(]0,1[)$.
- Conclure sur le domaine à partir des seules fonctions test $C^\infty_c(]0,1[)$.
- Oublier le signe de l’intégration par parties.

Variante : Dans $H=L^2(]0,1[)$ réel, soit $B=d/dx$ de domaine $D(B)=\{u\in H^1(]0,1[):u(0)=u(1)\}$. Déterminer $D(B^*)$ et $B^*$.

Solution de la variante : $D(B)$ contient $C^\infty_c(]0,1[)$ : il est dense. Si $v\in D(B)$, alors pour $u\in D(B)$, le terme de bord vaut $u(1)v(1)-u(0)v(0)=u(0)\big(v(1)-v(0)\big)=0$ : donc $\int_0^1u'v=-\int_0^1uv'$, soit $v\in D(B^*)$ et $B^*v=-v'$. Réciproquement, si $v\in D(B^*)$ et $w=B^*v$, un test contre $C^\infty_c(]0,1[)$ donne $v\in H^1(]0,1[)$, $v'=-w$. L'intégration par parties donne alors $u(0)\big(v(1)-v(0)\big)=0$ pour tout $u\in D(B)$, et $u\equiv 1$ fournit $v(1)=v(0)$. Ainsi $D(B^*)=D(B)$ et $B^*=-B$ : les domaines coïncident, mais $B$ n'est pas auto-adjoint.

Graphe de la variante :
But : `fin` — usage : application

Nœuds :
- `h-H` (hypothese) : $H=L^2(]0,1[)$, réel, est un espace de Hilbert, et $C^\infty_c(]0,1[)$ y est dense.
- `d-B` (definition) : $Bu=u'$, de domaine $D(B)=\{u\in H^1(]0,1[):u(0)=u(1)\}$.
- `h-ipp` (hypothese) : Pour $u,v\in H^1(]0,1[)$ : $\int_0^1u'v=u(1)v(1)-u(0)v(0)-\int_0^1uv'$.
- `dense` (consequence) : $D(B)$ est dense dans $H$.
- `s-v` (definition, locale) : Soit $v\in H^1(]0,1[)$ avec $v(0)=v(1)$.
- `s-bord` (egalite) : Pour tout $u\in D(B)$ : $\int_0^1u'v=-\int_0^1uv'$.
- `s-in` (inclusion) : $v\in D(B^*)$ et $B^*v=-v'$.
- `n-v` (definition, locale) : Soit $v\in D(B^*)$ et $w=B^*v$ : $\int_0^1u'v=\int_0^1uw$ pour tout $u\in D(B)$.
- `n-test` (egalite) : Pour tout $\varphi\in C^\infty_c(]0,1[)$ : $\int_0^1v\varphi'=\int_0^1w\varphi$.
- `n-h1` (consequence) : $v'=-w$ dans $\mathcal D'(]0,1[)$, donc $v\in H^1(]0,1[)$ et $B^*v=-v'$.
- `n-bord` (egalite) : Pour tout $u\in D(B)$ : $u(0)\big(v(1)-v(0)\big)=0$.
- `n-temoin` (consequence) : La fonction constante $u_1\equiv 1$ appartient à $D(B)$.
- `n-cond` (consequence) : $v(1)=v(0)$.
- `n-in` (inclusion) : $v\in D(B)$ et $B^*v=-v'$.
- `fin` (conclusion) : $D(B^*)=D(B)$ et $B^*=-B$.
- `x-dir` (egalite, DISTRACTEUR) : $D(B^*)=\{v\in H^1(]0,1[):v(1)=0\}$.
- `x-auto` (egalite, DISTRACTEUR) : $B$ est auto-adjoint.

Règles :
- `h-H` + `d-B` ⟹ `dense` par « Une fonction test vérifie $\varphi(0)=\varphi(1)=0$ : $C^\infty_c(]0,1[)\subset D(B)$. »
- `s-v` + `d-B` + `h-ipp` ⟹ `s-bord` par « Intégration par parties : le terme de bord vaut $u(0)\big(v(1)-v(0)\big)$. »
- `s-bord` + `dense` ⟹ `s-in` par « Définition de l'adjoint, avec $w=-v'\in L^2(]0,1[)$. »
- `n-v` + `d-B` ⟹ `n-test` par « Les fonctions test appartiennent à $D(B)$. »
- `n-test` ⟹ `n-h1` par « Définition de la dérivée au sens des distributions. »
- `n-h1` + `n-v` + `d-B` + `h-ipp` ⟹ `n-bord` par « Intégration par parties, désormais licite, comparée à l'identité définissant $w$. »
- `d-B` ⟹ `n-temoin` par « $u_1\equiv 1$ est dans $H^1(]0,1[)$ et $u_1(0)=u_1(1)$. »
- `n-bord` + `n-temoin` ⟹ `n-cond` par « On teste avec une fonction de $D(B)$ non nulle en $0$. »
- `n-h1` + `n-cond` + `d-B` ⟹ `n-in` par « Réunion de la régularité et de la condition de bord. »
- `s-in` + `n-in` ⟹ `fin` par « Double inclusion. »

Justifications sans règle (séduisantes ou fausses) : « Intégration par parties appliquée d'emblée à $v\in D(B^*)$. »

Pièges :
- `x-dir` → incorrect [domaine-operateur] : La condition au bord de l'adjoint dépend du domaine de départ. Ici, le domaine autorise toutes les valeurs communes en $0$ et en $1$. — Contre-exemple : $v\equiv 1$ vérifie $\int_0^1u'=u(1)-u(0)=0$ pour tout $u\in D(B)$ : donc $v\in D(B^*)$, alors que $v(1)=1$.
- `x-auto` → incorrect [symetrie-autoadjonction] : Des domaines égaux ne suffisent pas : ici $B^*=-B\neq B$. — Contre-exemple : Pour $u(x)=\sin(2\pi x)\in D(B)$ : $Bu=2\pi\cos(2\pi x)$, et $B^*u=-Bu$.
- `n-bord` par « Intégration par parties appliquée d'emblée à $v\in D(B^*)$. » → incorrect [adjoint-ipp-regularite] : Le terme de bord n'a de sens qu'une fois $v\in H^1(]0,1[)$ acquis : la régularité passe d'abord par un test contre $C^\infty_c(]0,1[)$.

Retraits :
- `n-temoin` (nécessaire) : La condition sur les valeurs au bord n’apparaît plus. — Contre-exemple : Pour $D(B_0)=H^1_0(]0,1[)$, toute fonction du domaine s'annule au bord, et $D(B_0^*)=H^1(]0,1[)$.

Vérification : {"origin":"complement","review":"machine"}

## Exercice difficile `adjoint.difficile` : Symétrique sans être auto-adjoint

Énoncé : Dans $H=L^2(]0,1[)$ réel, soit $S=-d^2/dx^2$ de domaine $D(S)=\{u\in H^2(]0,1[):u(0)=u'(0)=u(1)=u'(1)=0\}$. Montrer que $S$ est densément défini et symétrique, mais non auto-adjoint, en déterminant $D(S^*)$, et expliquer ce qui fait défaut à la symétrie seule pour donner l'auto-adjonction.
Source : {"doc":"polycopie","pdfPage":42,"label":"Exercice 24, difficile ; symétrie et auto-adjonction en section 6.1 (p. PDF 23)"} — prérequis : distributions

But : `fin` — usage : application

Nœuds :
- `h-H` (hypothese) : $H=L^2(]0,1[)$, réel, est un espace de Hilbert, et $C^\infty_c(]0,1[)$ y est dense.
- `d-S` (definition) : $Su=-u''$, de domaine $D(S)=\{u\in H^2(]0,1[):u(0)=u(1)=0\text{ et }u'(0)=u'(1)=0\}$.
- `h-cond` (hypothese) : Tout $u\in D(S)$ vérifie en particulier $u'(0)=u'(1)=0$, en plus de $u(0)=u(1)=0$.
- `h-green` (hypothese) : Pour $u,v\in H^2(]0,1[)$ : $\int_0^1(-u'')v-\int_0^1u(-v'')=\big[uv'-u'v\big]_0^1$.
- `h-lemme` (hypothese) : Si $v\in L^2(]0,1[)$ et si la dérivée seconde de $v$ au sens des distributions appartient à $L^2(]0,1[)$, alors $v\in H^2(]0,1[)$.
- `dense` (consequence) : $D(S)$ est dense dans $H$.
- `sym-uv` (definition, locale) : Soient $u,v\in D(S)$.
- `sym-green` (egalite) : $\langle Su,v\rangle-\langle u,Sv\rangle=\big[uv'-u'v\big]_0^1=0$.
- `sym` (consequence) : $S$ est symétrique.
- `ext` (application-theoreme) : $S\subset S^*$, et $S^*$ est fermé.
- `t-v1` (egalite) : Pour tout $u\in D(S)$ : $\langle Su,1\rangle=-\int_0^1u''=u'(0)-u'(1)=0$.
- `t-dom` (inclusion) : La fonction constante $v_1\equiv 1$ appartient à $D(S^*)$, et $S^*v_1=0$.
- `t-non` (consequence) : $v_1\notin D(S)$, car $v_1(0)=1\neq 0$.
- `d-v` (definition, locale) : Soit $v\in D(S^*)$ et $w=S^*v$.
- `d-test` (egalite) : Pour tout $\varphi\in C^\infty_c(]0,1[)$ : $-\int_0^1v\varphi''=\int_0^1w\varphi$.
- `d-reg` (consequence) : $v''=-w$ dans $\mathcal D'(]0,1[)$, donc $v\in H^2(]0,1[)$.
- `d-sub` (inclusion) : $D(S^*)\subset H^2(]0,1[)$, et $S^*v=-v''$.
- `d-sup` (inclusion) : $H^2(]0,1[)\subset D(S^*)$.
- `d-eq` (egalite) : $D(S^*)=H^2(]0,1[)$, et $S^*v=-v''$.
- `d-quot` (egalite, calcul rational) : $\dim\big(D(S^*)/D(S)\big)=4$.
  - valeur attendue : "4"
- `strict` (inclusion) : $D(S)\subsetneq D(S^*)$, donc $S\neq S^*$.
- `m-T` (definition, locale) : Soit $T$ un opérateur symétrique de domaine $D(T)=H$.
- `m-eq` (consequence) : Alors $T=T^*$ : un opérateur symétrique défini sur $H$ tout entier est auto-adjoint.
- `fin` (conclusion) : $S$ est densément défini et symétrique, mais $S\neq S^*$ : la symétrie donne seulement $D(S)\subset D(S^*)$, et l'obstruction porte sur les domaines.
- `x-auto` (consequence, DISTRACTEUR) : $S=S^*$, car $\langle Su,v\rangle=\langle u,Sv\rangle$ pour tous $u,v\in D(S)$.
- `x-dense` (egalite, DISTRACTEUR) : Comme $D(S)$ est dense dans $H$ et contenu dans $D(S^*)$, on a $D(S^*)=D(S)$.
- `x-ferme` (consequence, DISTRACTEUR) : $S$ étant fermé et symétrique, on a $S=S^*$.

Règles :
- `h-H` + `d-S` ⟹ `dense` par « Une fonction test et sa dérivée s'annulent au bord : $C^\infty_c(]0,1[)\subset D(S)$. »
- `sym-uv` + `d-S` + `h-green` ⟹ `sym-green` par « Formule de Green : le crochet est nul, car $u$, $u'$, $v$ et $v'$ s'annulent au bord. »
- `sym-green` ⟹ `sym` par « Définition d'un opérateur symétrique. »
- `sym` + `dense` ⟹ `ext` par « Théorème sur l’adjoint : un opérateur symétrique est contenu dans son adjoint, et l’adjoint est fermé. [adjoint] »
- `d-S` + `h-cond` ⟹ `t-v1` par « Théorème fondamental pour $u'\in H^1(]0,1[)$, puis conditions sur $u'$ au bord. » (chemin temoin)
- `t-v1` + `dense` ⟹ `t-dom` par « Définition de l'adjoint, avec $w=0$. » (chemin temoin)
- `d-S` ⟹ `t-non` par « Évaluation de $v_1$ en $0$ et définition de $D(S)$. » (chemin temoin)
- `ext` + `t-dom` + `t-non` ⟹ `strict` par « L'inclusion $D(S)\subset D(S^*)$ est stricte : un élément de $D(S^*)$ n'est pas dans $D(S)$. » (chemin temoin)
- `d-v` + `d-S` ⟹ `d-test` par « Les fonctions test appartiennent à $D(S)$. » (chemin domaine)
- `d-test` + `h-lemme` ⟹ `d-reg` par « Définition de la dérivée seconde au sens des distributions, puis lemme de régularité. » (chemin domaine)
- `d-reg` ⟹ `d-sub` par « Lecture du résultat précédent. » (chemin domaine)
- `h-green` + `d-S` + `h-cond` + `dense` ⟹ `d-sup` par « Pour $v\in H^2(]0,1[)$ et $u\in D(S)$ : le crochet de Green est nul grâce aux quatre conditions sur $u$, et $w=-v''\in L^2(]0,1[)$. » (chemin domaine)
- `d-sub` + `d-sup` ⟹ `d-eq` par « Double inclusion. » (chemin domaine)
- `d-eq` + `d-S` ⟹ `d-quot` par « L'application $v\mapsto(v(0),v'(0),v(1),v'(1))$ est linéaire, surjective de $H^2(]0,1[)$ sur $\mathbb R^4$, de noyau $D(S)$. » (chemin domaine)
- `ext` + `d-eq` + `d-quot` ⟹ `strict` par « Un quotient de dimension non nulle signifie une inclusion stricte. » (chemin domaine)
- `m-T` ⟹ `m-eq` par « On a $D(T^*)\subset H=D(T)$, et la symétrie donne l'inclusion réciproque. »
- `sym` + `dense` + `strict` + `m-eq` ⟹ `fin` par « Réunion des résultats établis. »

Justifications sans règle (séduisantes ou fausses) : « Comme $v_1''=0$, on a $S^*v_1=-v_1''=0$. » ; « L'expression $-d^2/dx^2$ est formellement symétrique. » ; « C’est évident. »

Pièges :
- `x-auto` → incorrect [symetrie-autoadjonction] : La symétrie est une identité sur $D(S)$ : elle ne dit rien de l'appartenance d'un $v\notin D(S)$ à $D(S^*)$. — Contre-exemple : $v_1\equiv 1$ appartient à $D(S^*)$ et n'appartient pas à $D(S)$.
- `x-dense` → incorrect [densite-fermeture] : Densité et égalité sont deux choses différentes : un sous-espace dense n'épuise pas les sous-espaces qui le contiennent. — Contre-exemple : $D(S)$ est dense dans $L^2(]0,1[)$, et $D(S)\subset D(S^*)$, mais $v_1\equiv 1\in D(S^*)\setminus D(S)$.
- `x-ferme` → incorrect [symetrie-autoadjonction] : Être fermé et symétrique ne suffit pas : l'auto-adjonction est une égalité de domaines. — Contre-exemple : $S$ est fermé (la norme du graphe équivaut sur $D(S)$ à celle de $H^2$, et $D(S)$ est fermé dans $H^2$), symétrique, et $v_1\equiv 1\in D(S^*)\setminus D(S)$.
- `t-dom` par « Comme $v_1''=0$, on a $S^*v_1=-v_1''=0$. » → incorrect [domaine-operateur] : Le calcul formel de $-v_1''$ ne dit pas que $v_1\in D(S^*)$ : il faut vérifier la relation d'adjonction pour tout $u\in D(S)$, ce qui utilise les conditions sur $u'$.
- `sym` par « L'expression $-d^2/dx^2$ est formellement symétrique. » → incorrect [domaine-operateur] : La symétrie dépend du domaine : sans conditions au bord, le crochet de Green ne s'annule pas. — Contre-exemple : Sur $H^2(]0,1[)$, pour $u(x)=x$ et $v(x)=x^2$ : $\langle -u'',v\rangle=0$ et $\langle u,-v''\rangle=-1$.
- `strict` par « C’est évident. » → a-justifier [justification-absente] : L'inclusion stricte se démontre : il faut exhiber un élément de $D(S^*)$ hors de $D(S)$.

Retraits :
- `h-cond` (nécessaire) : Le crochet de Green ne s'annule plus, le témoin $v_1$ ne convient plus. Avec les seules conditions $u(0)=u(1)=0$, on obtient la réalisation de Dirichlet, qui est auto-adjointe. — Contre-exemple : Pour $u(x)=x(1-x)$, qui vérifie $u(0)=u(1)=0$ et $u'(0)\neq 0$ : $\langle -u'',1\rangle=\int_0^12=2\neq 0$.
- `dense` (nécessaire) : Sans densité, l’adjoint n’est pas défini et toute la comparaison est vide. — Contre-exemple : Si le domaine n'est pas dense, tout $w$ orthogonal au domaine fournit un autre candidat : $S^*v$ n'est pas défini.

Calculs fermés : [{"kind":"rational","prompt":"Pour $u(x)=x^2(1-x)^2\\in D(S)$ : valeur de $\\int_0^1(-u'')$","expected":"0"},{"kind":"rational","prompt":"Valeur constante de $S^*v$ pour $v(x)=x^2$","expected":"-2"}]

Solution :
**Densité.** Une fonction test et sa dérivée s'annulent au bord, donc $C^\infty_c(]0,1[)\subset D(S)$, dense dans $L^2(]0,1[)$.

**Symétrie.** Pour $u,v\in D(S)$, la formule de Green donne $\langle Su,v\rangle-\langle u,Sv\rangle=[uv'-u'v]_0^1=0$. Ainsi $S$ est symétrique, et $S\subset S^*$.

**Domaine de l'adjoint.** Soit $v\in D(S^*)$ et $w=S^*v$. Pour $\varphi\in C^\infty_c(]0,1[)$ : $-\int_0^1v\varphi''=\int_0^1w\varphi$, d'où $v''=-w$ dans $\mathcal D'(]0,1[)$, et $v\in H^2(]0,1[)$, avec $S^*v=-v''$. Réciproquement, si $v\in H^2(]0,1[)$ et $u\in D(S)$, le crochet $[uv'-u'v]_0^1$ est nul à cause des quatre conditions sur $u$ : $\langle Su,v\rangle=\langle u,-v''\rangle$. Donc $D(S^*)=H^2(]0,1[)$.

**Non-auto-adjonction.** Il suffit d'un témoin : $v_1\equiv 1$ vérifie $\langle Su,v_1\rangle=-\int_0^1u''=u'(0)-u'(1)=0$, donc $v_1\in D(S^*)$, $S^*v_1=0$, et $v_1\notin D(S)$ car $v_1(0)=1$. Plus précisément, $D(S)$ est le noyau de $v\mapsto(v(0),v'(0),v(1),v'(1))$, surjective de $H^2(]0,1[)$ sur $\mathbb R^4$ : $\dim D(S^*)/D(S)=4$.

**Mécanisme.** La symétrie est une identité sur $D(S)$ et n'entraîne que $D(S)\subset D(S^*)$. Plus $D(S)$ est petit, moins la relation d'adjonction contraint $v$, donc plus $D(S^*)$ est grand. Si le domaine était $H$ tout entier, on aurait $D(S^*)\subset H=D(S)$ : un opérateur symétrique partout défini est auto-adjoint ; l'obstruction n'apparaît que pour un domaine strict, le cas typique des opérateurs différentiels non bornés. On peut vérifier que les réalisations de Dirichlet et de Neumann sont deux extensions auto-adjointes distinctes de $S$, contenues dans $S^*$.

Indices :
1. La symétrie porte sur $D(S)$. Que demande l'auto-adjonction en plus ? Cherche où pourrait se trouver un élément de $D(S^*)$ hors de $D(S)$.
2. Deux intégrations par parties montrent que le crochet de Green est nul pour $u\in D(S)$, quels que soient $v(0),v'(0),v(1),v'(1)$. Tu peux chercher un témoin très simple.
3. La fonction constante $v_1\equiv 1$ convient : $\langle Su,v_1\rangle=u'(0)-u'(1)=0$. Pour le domaine complet, teste contre $C^\infty_c(]0,1[)$, puis utilise la formule de Green.

Erreurs fréquentes :
- Conclure à l’auto-adjonction à partir de la seule symétrie.
- Conclure $D(S)=D(S^*)$ de la densité de $D(S)$.
- Raisonner sur l’expression différentielle sans préciser les domaines.

Variante : Dans $H=L^2(]0,1[)$ réel, soit $A_D=-d^2/dx^2$ de domaine $D(A_D)=\{u\in H^2(]0,1[):u(0)=u(1)=0\}$. Démontrer que $A_D$ est symétrique et auto-adjoint.

Solution de la variante : La symétrie résulte de la formule de Green : le crochet $[uv'-u'v]_0^1$ est nul pour $u,v\in D(A_D)$. Soit $v\in D(A_D^*)$ et $w=A_D^*v$. Un test contre $C^\infty_c(]0,1[)$ donne $v''=-w$ dans $\mathcal D'(]0,1[)$, donc $v\in H^2(]0,1[)$ et $A_D^*v=-v''$. Pour $u\in D(A_D)$, la formule de Green donne $0=[uv'-u'v]_0^1=u'(0)v(0)-u'(1)v(1)$. Avec $u(x)=x^2(1-x)$, on a $u'(0)=0$ et $u'(1)=-1$, d'où $v(1)=0$. Avec $u(x)=x(1-x)^2$, on a $u'(0)=1$ et $u'(1)=0$, d'où $v(0)=0$. Donc $v\in D(A_D)$, et $A_D^*=A_D$ : deux conditions au bord, ni plus ni moins, équilibrent les domaines.

Vérification : {"origin":"complement","review":"machine"}