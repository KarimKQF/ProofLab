# 26. Théorème spectral compact auto-adjoint (`spectral-compact`) — polycopié p. PDF 24, section 6.4

## Fiche

Espaces : $H$ : espace de Hilbert séparable, réel sauf mention (dans le cas complexe, le produit scalaire est linéaire en la première variable). | $K\in\mathcal L(H)$ : opérateur linéaire continu, compact et auto-adjoint. | Valeur propre $\lambda$ : $\ker(K-\lambda I)\neq\{0\}$ ; sa multiplicité est $\dim\ker(K-\lambda I)$.

Hypothèses :
- $H$ est un espace de Hilbert séparable : ses bases hilbertiennes sont dénombrables.
- $K$ est compact. — Sans elle : La multiplication $Mu(x)=xu(x)$ sur $L^2(]0,1[)$ est bornée et auto-adjointe, non compacte, et n'a aucune valeur propre : il n'existe pas de base de vecteurs propres.
- $K=K^*$. — Sans elle : La matrice $\begin{pmatrix}0&1\\0&0\end{pmatrix}$, compacte sur $\mathbb R^2$, n'a que $0$ pour valeur propre, d'espace propre $\operatorname{Vect}\{(1,0)\}$ : aucune base de vecteurs propres.

Énoncé : Si $K=K^*$ est compact sur un Hilbert séparable $H$, une base hilbertienne de $H$ est formée de vecteurs propres de $K$ (en complétant par une base de son noyau). Les valeurs propres non nulles sont réelles, de multiplicité finie, et ne s'accumulent qu'en zéro.

Bilan : {"existence":"Il existe une base hilbertienne de $H$ formée de vecteurs propres de $K$, complétée par une base de $\\ker K$.","autre":"Les valeurs propres non nulles sont réelles, de multiplicité finie, et ne s'accumulent qu'en $0$."}

Preuve dans le polycopié : idee

Plan :
1. Pour $K=K^*$, $\|K\|=\sup_{\|u\|=1}|\langle Ku,u\rangle|$, par polarisation.
2. Soit $(u_n)$ unitaire avec $\langle Ku_n,u_n\rangle\to\lambda$, $|\lambda|=\|K\|\neq 0$. Alors $\|Ku_n-\lambda u_n\|^2\le 2\lambda^2-2\lambda\langle Ku_n,u_n\rangle\to 0$ ; par compacité, une sous-suite de $(Ku_n)$ converge, donc $u_n$ converge vers un vecteur propre unitaire $e_1$.
3. L'orthogonal de $e_1$ est invariant par $K$, qui y reste compact auto-adjoint : on itère, avec $|\lambda_{n+1}|=\|K|_{\{e_1,\dots,e_n\}^\perp}\|$.
4. Si la suite est infinie, $|\lambda_n|\to 0$ : sinon $\|Ke_n-Ke_m\|^2=\lambda_n^2+\lambda_m^2$ resterait minoré, contre la compacité.
5. Tout $x$ orthogonal aux $e_n$ vérifie $\|Kx\|\le|\lambda_{n+1}|\|x\|$ pour tout $n$, donc $Kx=0$ : on complète par une base hilbertienne de $\ker K$, dénombrable par séparabilité.
6. Réalité : $\lambda\|u\|^2=\langle Ku,u\rangle=\langle u,Ku\rangle=\bar\lambda\|u\|^2$ ; multiplicité finie et non-accumulation viennent de $\lambda_n\to 0$.

Vigilance :
- Le théorème porte sur un opérateur compact : $A=-\Delta_D$, non borné, n'y entre pas directement ; on l'applique à la résolvante $(I+A)^{-1}$.
- La multiplicité finie concerne les seules valeurs propres non nulles : $\ker K$ peut être de dimension infinie.
- En dimension infinie, $0$ appartient au spectre d'un compact sans être nécessairement valeur propre.
- Sans $K=K^*$, ni l'existence de vecteurs propres ni leur orthogonalité ne sont garanties.

Vérification : {"origin":"complement","review":"machine","notes":"Énoncé repris du polycopié (p. PDF 24), qui n’en donne qu’une idée de preuve ; la démonstration de la fiche est rédigée pour ProofLab."}

Définition « Valeur propre et multiplicité » : $\lambda$ est valeur propre de $K$ si $\ker(K-\lambda I)\neq\{0\}$ ; ses éléments non nuls sont les vecteurs propres, et $\dim\ker(K-\lambda I)$ est la multiplicité de $\lambda$.

Définition « Base hilbertienne » : Une famille orthonormée $(e_k)$ de $H$ est une base hilbertienne si l'espace qu'elle engendre est dense dans $H$ ; alors $u=\sum_k\langle u,e_k\rangle e_k$ et $\|u\|^2=\sum_k\langle u,e_k\rangle^2$ pour tout $u\in H$.

## Contre-exemple `ce-spectral-non-symetrique` : Matrice non symétrique
Assertion : Toute matrice réelle diagonalisable admet une base orthonormée de vecteurs propres.
Tâche : $B=\begin{pmatrix}1&1\\0&2\end{pmatrix}$ a pour valeurs propres $1$ et $2$, de vecteurs propres $(1,0)$ et $(1,1)$. Calcule leur produit scalaire.
Vérification : {"kind":"rational","prompt":"Valeur de $\\langle(1,0),(1,1)\\rangle$","expected":"1"}
Explication : Le produit scalaire vaut $1\neq 0$. Chaque espace propre est une droite : aucune base de vecteurs propres n'est orthogonale.

## Contre-exemple `ce-spectral-noyau-infini` : Multiplicité de la valeur propre nulle
Assertion : Toutes les valeurs propres d’un opérateur compact sont de multiplicité finie.
Tâche : Sur $\ell^2$, soit $Kx=x_1e_1$, compact et auto-adjoint. Donne la valeur propre de $K$ dont l'espace propre est de dimension infinie.
Vérification : {"kind":"rational","prompt":"Valeur propre de multiplicité infinie","expected":"0"}
Explication : $\ker K=\{x\in\ell^2:x_1=0\}$ est de dimension infinie ; la seule autre valeur propre, $1$, a pour espace propre $\operatorname{Vect}\{e_1\}$.

## Contre-exemple `ce-spectral-sans-compacite` : Auto-adjoint non compact
Assertion : Tout opérateur borné auto-adjoint admet une base hilbertienne de vecteurs propres.
Tâche : Sur $L^2(]0,1[)$, soit $Mu(x)=xu(x)$, borné et auto-adjoint. Combien $M$ a-t-il de valeurs propres ?
Vérification : {"kind":"rational","prompt":"Nombre de valeurs propres de $M$","expected":"0"}
Explication : Si $xu(x)=\lambda u(x)$ presque partout, alors $(x-\lambda)u(x)=0$ presque partout, donc $u=0$ : $M$ n'a aucune valeur propre. Il n'est pas compact, puisque son spectre $[0,1]$ n'est pas dénombrable.

## Exercice facile `spectral-compact.facile` : Diagonaliser une matrice symétrique réelle

Énoncé : Dans $\mathbb R^3$ euclidien, soit $A=\begin{pmatrix}-3&0&6\\0&3&6\\6&6&0\end{pmatrix}$. Justifier que $A$ se diagonalise dans une base orthonormée, puis déterminer ses valeurs propres, une telle base, et la matrice diagonale obtenue.
Source : {"doc":"polycopie","pdfPage":42,"label":"Exercice 26, facile ; énoncé de la section 6.4 (p. PDF 24)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-H` (hypothese) : $H=\mathbb R^3$, muni du produit scalaire euclidien, est un espace de Hilbert séparable.
- `d-A` (definition) : $A=\begin{pmatrix}-3&0&6\\0&3&6\\6&6&0\end{pmatrix}$.
- `sym` (consequence) : $A=A^{\mathsf T}$, donc $A=A^*$ pour le produit euclidien.
- `compact` (consequence) : $A$ est compact.
- `thm` (application-theoreme) : $\mathbb R^3$ admet une base orthonormée formée de vecteurs propres de $A$.
- `chi` (egalite, calcul expr-equiv) : $\det(xI-A)=x^3-81x$.
  - valeur attendue : "x^3-81*x"
- `vp` (egalite, calcul rational-vector) : Les valeurs propres de $A$ sont $9$, $0$ et $-9$.
  - valeur attendue : ["9","0","-9"]
- `e1` (egalite, calcul rational-vector) : $e_1=\frac13(1,2,2)$ est unitaire et $Ae_1=9e_1$.
  - valeur attendue : ["1/3","2/3","2/3"]
- `e2` (egalite, calcul rational-vector) : $e_2=\frac13(2,-2,1)$ est unitaire et $Ae_2=0$ : $\ker A=\operatorname{Vect}\{e_2\}$.
  - valeur attendue : ["2/3","-2/3","1/3"]
- `e3` (egalite, calcul rational-vector) : $e_3=\frac13(2,1,-2)$ est unitaire et $Ae_3=-9e_3$.
  - valeur attendue : ["2/3","1/3","-2/3"]
- `ortho` (consequence) : $e_1$, $e_2$ et $e_3$ sont deux à deux orthogonaux.
- `diag` (egalite) : La matrice $P=(e_1\ e_2\ e_3)$ vérifie $P^{\mathsf T}P=I$ et $P^{\mathsf T}AP=\operatorname{diag}(9,0,-9)$.
- `fin` (conclusion) : $A$ est diagonalisée dans la base orthonormée $(e_1,e_2,e_3)$ ; le vecteur $e_2$, base du noyau, complète les vecteurs propres de valeurs propres non nulles.
- `x-zero` (consequence, DISTRACTEUR) : $0$ n'est pas valeur propre de $A$, puisque $A\neq 0$.
- `x-diag` (egalite, DISTRACTEUR) : Les valeurs propres de $A$ sont ses coefficients diagonaux $-3$, $3$ et $0$.

Règles :
- `d-A` ⟹ `sym` par « Lecture des coefficients symétriques ; adjoint d’une matrice pour le produit euclidien. »
- `d-A` ⟹ `compact` par « En dimension finie, tout opérateur linéaire est compact. »
- `h-H` + `sym` + `compact` ⟹ `thm` par « Théorème spectral compact auto-adjoint. [spectral-compact] »
- `d-A` ⟹ `chi` par « Développement du déterminant selon la première ligne. »
- `chi` ⟹ `vp` par « Factorisation du polynôme caractéristique. »
- `d-A` + `vp` ⟹ `e1` par « Résolution de $(A-\lambda I)x=0$, puis normalisation. »
- `d-A` + `vp` ⟹ `e2` par « Résolution de $(A-\lambda I)x=0$, puis normalisation. »
- `d-A` + `vp` ⟹ `e3` par « Résolution de $(A-\lambda I)x=0$, puis normalisation. »
- `e1` + `e2` + `e3` ⟹ `ortho` par « Calcul des trois produits scalaires. » (chemin calcul)
- `e1` + `e2` + `e3` + `sym` ⟹ `ortho` par « Pour $A=A^*$ : $\lambda\langle x,y\rangle=\langle Ax,y\rangle=\langle x,Ay\rangle=\mu\langle x,y\rangle$, avec $\lambda\neq\mu$. » (chemin symetrie)
- `ortho` + `e1` + `e2` + `e3` ⟹ `diag` par « Colonnes orthonormées, et $AP=P\operatorname{diag}(9,0,-9)$. »
- `thm` + `diag` ⟹ `fin` par « Réunion des résultats établis. »

Justifications sans règle (séduisantes ou fausses) : « Pour toute matrice réelle, deux vecteurs propres associés à des valeurs propres distinctes sont orthogonaux. » ; « Tout opérateur compact se diagonalise dans une base orthonormée. »

Pièges :
- `x-zero` → incorrect [spectral-compact-valeur-nulle] : Une matrice non nulle peut avoir un noyau non trivial : $0$ est valeur propre dès que $\det A=0$. — Contre-exemple : $A(2,-2,1)^{\mathsf T}=(0,0,0)^{\mathsf T}$.
- `x-diag` → incorrect [spectral-compact-diagonale] : Les coefficients diagonaux ne sont les valeurs propres que pour une matrice diagonale ou triangulaire. — Contre-exemple : $A(1,2,2)^{\mathsf T}=9\,(1,2,2)^{\mathsf T}$, et $9$ n'est pas un coefficient diagonal de $A$.
- `ortho` par « Pour toute matrice réelle, deux vecteurs propres associés à des valeurs propres distinctes sont orthogonaux. » → incorrect [spectral-compact-orthogonalite] : L'orthogonalité des vecteurs propres repose sur la symétrie : elle est fausse pour une matrice quelconque. — Contre-exemple : $\begin{pmatrix}1&1\\0&2\end{pmatrix}$ a pour vecteurs propres $(1,0)$ et $(1,1)$, associés à $1$ et $2$, non orthogonaux.
- `thm` par « Tout opérateur compact se diagonalise dans une base orthonormée. » → incorrect [hypotheses-theoreme] : Le théorème exige $K=K^*$ en plus de la compacité. — Contre-exemple : $\begin{pmatrix}0&1\\0&0\end{pmatrix}$, compacte, n'a que $\operatorname{Vect}\{(1,0)\}$ comme espace propre.

Retraits :
- `sym` (nécessaire) : Sans symétrie, le théorème spectral ne s’applique plus, et une base orthonormée de vecteurs propres peut ne pas exister. — Contre-exemple : Pour $\begin{pmatrix}1&1\\0&2\end{pmatrix}$, les seules directions propres sont $(1,0)$ et $(1,1)$, non orthogonales.

Solution :
**Justification.** $A$ est symétrique, donc $A=A^*$ pour le produit euclidien, et compacte, car la dimension est finie : le théorème fournit une base orthonormée de vecteurs propres.

**Valeurs propres.** En développant selon la première ligne, $\det(xI-A)=(x+3)\big(x(x-3)-36\big)-36(x-3)=x^3-81x=x(x-9)(x+9)$ : les valeurs propres sont $9$, $0$ et $-9$.

**Vecteurs propres.** On résout $(A-\lambda I)x=0$ et on normalise :
$$e_1=\tfrac13(1,2,2)\ (\lambda=9),\qquad e_2=\tfrac13(2,-2,1)\ (\lambda=0),\qquad e_3=\tfrac13(2,1,-2)\ (\lambda=-9).$$
Ils sont deux à deux orthogonaux, ce que donne aussi la symétrie, puisque les valeurs propres sont distinctes.

**Diagonalisation.** $P=(e_1\ e_2\ e_3)$ vérifie $P^{\mathsf T}P=I$ et $P^{\mathsf T}AP=\operatorname{diag}(9,0,-9)$. Le noyau $\operatorname{Vect}\{e_2\}$ complète les vecteurs propres de valeurs propres non nulles, comme dans l'énoncé du théorème.

Indices :
1. Quelles hypothèses du théorème faut-il vérifier avant tout calcul ?
2. Calcule $\det(xI-A)$ : la trace et le déterminant de $A$ donnent un contrôle rapide.
3. $\det(xI-A)=x(x-9)(x+9)$. Pour $\lambda=9$, cherche un vecteur de la forme $(1,2,2)$ ; pense à normaliser.

Erreurs fréquentes :
- Lire les valeurs propres sur la diagonale d’une matrice non diagonale.
- Écarter la valeur propre $0$ au motif que $A\neq 0$.
- Affirmer l’orthogonalité de vecteurs propres sans invoquer la symétrie ni calculer.

Variante : Diagonaliser dans une base orthonormée de $\mathbb R^2$ la matrice symétrique $B=\begin{pmatrix}-7&24\\24&7\end{pmatrix}$.

Solution de la variante : On a $\det(xI-B)=x^2-625=(x-25)(x+25)$. Pour $25$ : $f_1=\frac15(3,4)$, car $B(3,4)=(75,100)$. Pour $-25$ : $f_2=\frac15(4,-3)$, car $B(4,-3)=(-100,75)$. Ces vecteurs sont orthonormés, et $P=(f_1\ f_2)$ vérifie $P^{\mathsf T}BP=\operatorname{diag}(25,-25)$.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `spectral-compact.intermediaire` : Multiplicité finie des valeurs propres non nulles

Énoncé : Soit $H$ un espace de Hilbert réel, $K\in\mathcal L(H)$ compact et $\lambda\neq 0$. Démontrer que $E_\lambda=\ker(K-\lambda I)$ est de dimension finie.
Source : {"doc":"polycopie","pdfPage":42,"label":"Exercice 26, intermédiaire ; idée de preuve de la section 6.4 (p. PDF 24)"} — prérequis : —

But : `fini` — usage : demonstration

Nœuds :
- `h-H` (hypothese) : $H$ est un espace de Hilbert réel.
- `h-K` (hypothese) : $K\in\mathcal L(H)$ est compact.
- `h-lambda` (hypothese) : $\lambda\in\mathbb R$ est non nul.
- `d-E` (definition) : $E_\lambda=\ker(K-\lambda I)$.
- `abs` (definition, locale) : Supposons $\dim E_\lambda=+\infty$.
- `ortho` (consequence) : Il existe une suite orthonormée $(e_n)_{n\ge1}$ d'éléments de $E_\lambda$.
- `ecart` (egalite, calcul expr-equiv) : Pour $n\neq m$ : $Ke_n-Ke_m=\lambda(e_n-e_m)$, donc $\|Ke_n-Ke_m\|^2=2\lambda^2$.
  - valeur attendue : "2*l^2"
- `ext` (consequence) : Une sous-suite de $(Ke_n)$ converge dans $H$.
- `contra` (contradiction) : Cette sous-suite serait de Cauchy, alors que $\|Ke_n-Ke_m\|=\sqrt2\,|\lambda|>0$ pour $n\neq m$.
- `ferme` (consequence) : $E_\lambda$ est fermé dans $H$.
- `boule` (egalite) : La boule unité fermée $B$ de $E_\lambda$ vérifie $B=\lambda^{-1}K(B)$.
- `boule-cpt` (consequence) : $B$ est compacte.
- `fini` (conclusion) : $\dim E_\lambda<+\infty$ : toute valeur propre non nulle d'un opérateur compact est de multiplicité finie.
- `x-noyau` (consequence, DISTRACTEUR) : $\ker K$ est, lui aussi, de dimension finie.
- `x-suite` (consequence, DISTRACTEUR) : Toute suite bornée de $H$ admet une sous-suite convergente dans $H$.

Règles :
- `abs` + `h-H` ⟹ `ortho` par « Procédé de Gram–Schmidt dans un sous-espace de dimension infinie. » (chemin orthonormale)
- `ortho` + `d-E` ⟹ `ecart` par « $Ke_n=\lambda e_n$, puis théorème de Pythagore : $\|e_n-e_m\|^2=2$. » (chemin orthonormale)
- `ortho` + `h-K` ⟹ `ext` par « Compacité de $K$, appliquée à la suite bornée $(e_n)$. » (chemin orthonormale)
- `ecart` + `ext` + `h-lambda` ⟹ `contra` par « Une suite convergente est de Cauchy, et $\lambda\neq 0$. » (chemin orthonormale)
- `contra` ⟹ `fini` par « Raisonnement par l’absurde. » (chemin orthonormale)
- `h-K` + `d-E` ⟹ `ferme` par « Noyau de l'opérateur continu $K-\lambda I$. » (chemin riesz)
- `d-E` + `h-lambda` ⟹ `boule` par « Sur $E_\lambda$, $\lambda^{-1}K$ coïncide avec l'identité. » (chemin riesz)
- `boule` + `h-K` + `ferme` ⟹ `boule-cpt` par « $B$ est fermée dans $H$ et contenue dans $\lambda^{-1}K(\text{boule unité de }H)$, relativement compacte. » (chemin riesz)
- `boule-cpt` ⟹ `fini` par « Lemme de Riesz : un espace normé dont la boule unité fermée est compacte est de dimension finie. [lemme-riesz-compacite] » (chemin riesz)

Justifications sans règle (séduisantes ou fausses) : « $K$ est continu et $(e_n)$ est bornée. » ; « $\|Ke_n-Ke_m\|=\|Ke_n\|+\|Ke_m\|$, car $e_n\perp e_m$. » ; « Alternative de Fredholm. »

Pièges :
- `x-noyau` → incorrect [spectral-compact-valeur-nulle] : L'argument utilise $\lambda\neq 0$ de façon essentielle : pour $\lambda=0$, $\|Ke_n-Ke_m\|$ est nul. — Contre-exemple : Sur $\ell^2$, $Kx=x_1e_1$ est compact, de rang $1$, et $\ker K=\{x:x_1=0\}$ est de dimension infinie.
- `x-suite` → incorrect [bornee-non-convergente] : En dimension infinie, la bornitude ne donne pas d’extraction convergente : c’est la compacité de l’opérateur qui la fournit. — Contre-exemple : La suite orthonormée $(e_n)$ elle-même : $\|e_n-e_m\|=\sqrt2$ pour $n\neq m$.
- `ext` par « $K$ est continu et $(e_n)$ est bornée. » → incorrect [compact-continue] : Un opérateur continu envoie les bornés sur des bornés, non sur des relativement compacts. — Contre-exemple : $K=I$ sur $\ell^2$ est continu, et $(Ke_n)=(e_n)$ n'a aucune sous-suite convergente.
- `ecart` par « $\|Ke_n-Ke_m\|=\|Ke_n\|+\|Ke_m\|$, car $e_n\perp e_m$. » → incorrect [calcul-exact] : Pour des vecteurs orthogonaux, ce sont les carrés des normes qui s’ajoutent (Pythagore), non les normes. — Contre-exemple : $\|e_1-e_2\|=\sqrt2$, alors que $\|e_1\|+\|e_2\|=2$.
- `fini` par « Alternative de Fredholm. » → a-justifier [utilisation-prematuree] : L'alternative contient ce résultat, mais sa finitude du noyau repose sur l'argument de compacité demandé ici : établis-le directement.

Retraits :
- `h-lambda` (nécessaire) : Pour $\lambda=0$, les deux arguments s'effondrent : l'écart $\sqrt2|\lambda|$ est nul, et $\lambda^{-1}$ n'existe pas. — Contre-exemple : $K=0$ sur un Hilbert de dimension infinie : $\ker K=H$.
- `h-K` (nécessaire) : Aucune extraction n’est plus disponible. — Contre-exemple : $K=I$ sur $\ell^2$ et $\lambda=1$ : $E_1=\ell^2$.

Solution :
Soit $E_\lambda=\ker(K-\lambda I)$, avec $\lambda\neq 0$.

**Par une suite orthonormée.** Si $\dim E_\lambda=+\infty$, le procédé de Gram–Schmidt fournit une suite orthonormée $(e_n)$ de $E_\lambda$. Elle est bornée, donc, $K$ étant compact, une sous-suite de $(Ke_n)$ converge. Mais $Ke_n=\lambda e_n$, d'où, pour $n\neq m$, $\|Ke_n-Ke_m\|^2=\lambda^2\|e_n-e_m\|^2=2\lambda^2$ : aucune sous-suite n'est de Cauchy, puisque $\lambda\neq 0$. Contradiction.

**Par le lemme de Riesz.** $E_\lambda$ est fermé, comme noyau d'un opérateur continu. Sur $E_\lambda$, $\lambda^{-1}K$ est l'identité : la boule unité fermée $B$ de $E_\lambda$ vérifie $B=\lambda^{-1}K(B)$, contenue dans un relativement compact, et fermée. Elle est donc compacte, et $E_\lambda$ est de dimension finie.

**Point de vigilance.** L'hypothèse $\lambda\neq 0$ est indispensable : le noyau d'un compact peut être de dimension infinie.

Indices :
1. Que donnerait une infinité de vecteurs orthonormés dans $E_\lambda$, sachant que $K$ agit sur eux comme $\lambda I$ ?
2. Raisonne par l'absurde : prends $(e_n)$ orthonormée dans $E_\lambda$ et compare la compacité de $K$ avec les écarts $\|Ke_n-Ke_m\|$.
3. $\|Ke_n-Ke_m\|=|\lambda|\,\|e_n-e_m\|=\sqrt2\,|\lambda|$ : où sert l'hypothèse $\lambda\neq 0$ ?

Erreurs fréquentes :
- Étendre la conclusion à $\lambda=0$.
- Extraire une sous-suite convergente en n’utilisant que la continuité.
- Additionner les normes de vecteurs orthogonaux au lieu de leurs carrés.

Variante : Soit $K\in\mathcal L(H)$ compact et auto-adjoint, et $\varepsilon>0$. Démontrer que $K$ n'a qu'un nombre fini de valeurs propres distinctes $\lambda$ telles que $|\lambda|\ge\varepsilon$, et en déduire que les valeurs propres non nulles ne s'accumulent qu'en $0$.

Solution de la variante : Sinon, il existe des valeurs propres $\lambda_n$ deux à deux distinctes avec $|\lambda_n|\ge\varepsilon$, et des vecteurs propres unitaires $e_n$. Comme $K=K^*$, $\lambda_n\langle e_n,e_m\rangle=\langle Ke_n,e_m\rangle=\langle e_n,Ke_m\rangle=\lambda_m\langle e_n,e_m\rangle$, donc $\langle e_n,e_m\rangle=0$ pour $n\neq m$. Alors $\|Ke_n-Ke_m\|^2=\lambda_n^2+\lambda_m^2\ge 2\varepsilon^2$ : aucune sous-suite de $(Ke_n)$ ne converge, ce qui contredit la compacité. Une valeur d'accumulation $\lambda_*\neq 0$ fournirait une infinité de valeurs propres distinctes de module au moins $|\lambda_*|/2$.

Graphe de la variante :
But : `fin` — usage : demonstration

Nœuds :
- `h-H` (hypothese) : $H$ est un espace de Hilbert réel.
- `h-K` (hypothese) : $K\in\mathcal L(H)$ est compact et $K=K^*$.
- `h-eps` (hypothese) : $\varepsilon>0$ est fixé.
- `abs` (definition, locale) : Supposons qu'il existe des valeurs propres $\lambda_n$ de $K$, deux à deux distinctes, avec $|\lambda_n|\ge\varepsilon$ pour tout $n\ge 1$.
- `vect` (consequence) : Pour chaque $n$, il existe $e_n$ unitaire tel que $Ke_n=\lambda_ne_n$.
- `ortho` (consequence) : La suite $(e_n)$ est orthonormée.
- `ecart` (inegalite) : Pour $n\neq m$ : $\|Ke_n-Ke_m\|^2=\lambda_n^2+\lambda_m^2\ge 2\varepsilon^2$.
- `ext` (consequence) : Une sous-suite de $(Ke_n)$ converge dans $H$.
- `contra` (contradiction) : Cette sous-suite serait de Cauchy, ce que l'écart $\sqrt2\,\varepsilon$ interdit.
- `fin` (conclusion) : Seul un nombre fini de valeurs propres distinctes vérifient $|\lambda|\ge\varepsilon$ : les valeurs propres non nulles ne s'accumulent qu'en $0$.
- `x-sans-sym` (consequence, DISTRACTEUR) : Pour $K$ seulement compact, des vecteurs propres associés à des valeurs propres distinctes sont orthogonaux.
- `x-zero` (consequence, DISTRACTEUR) : Les valeurs propres ne peuvent pas non plus s'accumuler en $0$.

Règles :
- `abs` + `h-H` ⟹ `vect` par « Choix d’un vecteur propre normalisé pour chaque valeur propre. »
- `vect` + `abs` + `h-K` ⟹ `ortho` par « $\lambda_n\langle e_n,e_m\rangle=\langle Ke_n,e_m\rangle=\langle e_n,Ke_m\rangle=\lambda_m\langle e_n,e_m\rangle$, avec $\lambda_n\neq\lambda_m$. »
- `vect` + `ortho` + `abs` ⟹ `ecart` par « Théorème de Pythagore pour $\lambda_ne_n-\lambda_me_m$. »
- `vect` + `h-K` ⟹ `ext` par « Compacité de $K$, appliquée à la suite bornée $(e_n)$. »
- `ecart` + `ext` + `h-eps` ⟹ `contra` par « Une suite convergente est de Cauchy. »
- `contra` ⟹ `fin` par « Raisonnement par l’absurde ; une valeur d’accumulation non nulle donnerait une telle suite. »

Justifications sans règle (séduisantes ou fausses) : « $K$ est continu et $(e_n)$ est bornée. »

Pièges :
- `x-sans-sym` → incorrect [spectral-compact-orthogonalite] : L'orthogonalité utilise $K=K^*$. — Contre-exemple : $\begin{pmatrix}1&1\\0&2\end{pmatrix}$, compacte, a pour vecteurs propres $(1,0)$ et $(1,1)$, non orthogonaux.
- `x-zero` → incorrect [spectral-compact-valeur-nulle] : L'argument exige $|\lambda_n|\ge\varepsilon>0$ : rien n'empêche une accumulation en $0$. — Contre-exemple : Sur $\ell^2$, $Kx=(x_n/n)_{n\ge1}$ est compact, auto-adjoint, de valeurs propres $1/n\to 0$.
- `ext` par « $K$ est continu et $(e_n)$ est bornée. » → incorrect [compact-continue] : La continuité ne fournit pas d’extraction convergente. — Contre-exemple : $K=I$ sur $\ell^2$ et la suite $(e_n)$.

Retraits :
- `h-K` (nécessaire) : L’orthogonalité et l’extraction disparaissent. — Contre-exemple : Sur $\ell^2$, $De_n=(1+1/n)e_n$ est borné et auto-adjoint, non compact, et ses valeurs propres s'accumulent en $1$.

Vérification : {"origin":"complement","review":"machine"}

## Exercice difficile `spectral-compact.difficile` : Base spectrale de la résolvante de Dirichlet

Énoncé : Soit $\Omega\subset\mathbb R^d$ un ouvert non vide, borné, lipschitzien, $H=L^2(\Omega)$ réel, $V=H^1_0(\Omega)$ et $a(u,v)=\int_\Omega\nabla u\cdot\nabla v+\int_\Omega uv$. Pour $f\in H$, soit $Tf\in V$ tel que $a(Tf,v)=\langle f,v\rangle_H$ pour tout $v\in V$ : c'est la résolvante $(I+A)^{-1}$ de la réalisation de Dirichlet $A=-\Delta_D$, de domaine $D(A)=\{u\in V:\Delta u\in L^2(\Omega)\}$. Construire une base hilbertienne de $H$ formée de fonctions propres de $T$, et préciser leurs propriétés : appartenance à $V$, équation satisfaite, signe et comportement des valeurs propres, orthogonalité des gradients.
Source : {"doc":"polycopie","pdfPage":43,"label":"Exercice 26, difficile ; résolvante compacte du Laplacien de Dirichlet, section 6.3 (p. PDF 24)"} — prérequis : lax-milgram, rellich, poincare

But : `fin` — usage : application

Nœuds :
- `h-omega` (hypothese) : $\Omega\subset\mathbb R^d$ est un ouvert non vide, borné, lipschitzien.
- `h-H` (hypothese) : $H=L^2(\Omega)$, réel, est un espace de Hilbert séparable de dimension infinie, et $V=H^1_0(\Omega)$ y est dense.
- `d-T` (definition) : $a$ est un produit scalaire symétrique sur $V$, qui y induit la norme de $H^1$ ; pour $f\in H$, $Tf\in V$ vérifie $a(Tf,v)=\langle f,v\rangle_H$ pour tout $v\in V$.
- `T-borne` (application-theoreme) : $T:H\to V$ est bien défini, linéaire, et $\|Tf\|_{H^1}\le\|f\|_H$.
- `T-compact` (application-theoreme) : $T$ est compact de $H$ dans $H$.
- `T-sym` (egalite) : $T$ est auto-adjoint sur $H$.
- `T-pos` (inegalite) : $\langle Tf,f\rangle_H=\|Tf\|^2_{H^1}\ge 0$ pour tout $f\in H$, et $T$ est injectif.
- `spec` (application-theoreme) : Il existe une base hilbertienne $(\varphi_k)_{k\ge1}$ de $H$ et des réels $\mu_k\neq 0$ tels que $T\varphi_k=\mu_k\varphi_k$ ; chaque valeur propre est de multiplicité finie, et les $\mu_k$ ne s'accumulent qu'en $0$.
- `mu` (consequence) : $\mu_k>0$ pour tout $k$, et $\mu_k\to 0$.
- `faible` (egalite) : $\varphi_k=\mu_k^{-1}T\varphi_k\in V$ et, avec $\lambda_k=\mu_k^{-1}-1$ : $\int_\Omega\nabla\varphi_k\cdot\nabla v=\lambda_k\int_\Omega\varphi_kv$ pour tout $v\in V$ ; en particulier, $-\Delta\varphi_k=\lambda_k\varphi_k$ dans $\mathcal D'(\Omega)$.
- `lambda` (inegalite) : $\lambda_k\ge C_P^{-2}>0$ pour tout $k$, et $\lambda_k\to+\infty$.
- `grad` (egalite) : $\int_\Omega\nabla\varphi_j\cdot\nabla\varphi_k=\lambda_j\delta_{jk}$, et $\big(\varphi_k/\sqrt{1+\lambda_k}\big)_{k\ge1}$ est une base hilbertienne de $V$ pour $a$.
- `fin` (conclusion) : $(\varphi_k)$ est une base hilbertienne de $H$, formée de fonctions de $V$ telles que $-\Delta\varphi_k=\lambda_k\varphi_k$ au sens faible, avec $0<\lambda_k\to+\infty$ et des gradients orthogonaux.
- `x-A-compact` (consequence, DISTRACTEUR) : L'opérateur $A=-\Delta_D$ est compact sur $H$.
- `x-lambda-zero` (consequence, DISTRACTEUR) : $\lambda_k\to 0$ quand $k\to+\infty$.

Règles :
- `d-T` ⟹ `T-borne` par « Lax–Milgram sur $V$ ; on teste avec $v=Tf$, puis Cauchy–Schwarz. [lax-milgram] »
- `T-borne` + `h-omega` ⟹ `T-compact` par « Injection compacte $V\hookrightarrow H$, composée avec $T:H\to V$ borné. [rellich] »
- `d-T` ⟹ `T-sym` par « $\langle f,Tg\rangle_H=a(Tf,Tg)=a(Tg,Tf)=\langle g,Tf\rangle_H$, par symétrie de $a$. »
- `d-T` + `h-H` ⟹ `T-pos` par « On teste avec $v=Tf$ ; si $Tf=0$, alors $f$ est orthogonale à un sous-espace dense. »
- `T-compact` + `T-sym` + `T-pos` + `h-H` ⟹ `spec` par « Théorème spectral compact auto-adjoint ; $\ker T=\{0\}$, et la base est infinie car $\dim H=+\infty$. [spectral-compact] »
- `spec` + `T-pos` ⟹ `mu` par « $\mu_k=\langle T\varphi_k,\varphi_k\rangle_H=\|T\varphi_k\|^2_{H^1}>0$ ; multiplicités finies et seule accumulation en $0$. »
- `spec` + `mu` + `d-T` ⟹ `faible` par « $a(\varphi_k,v)=\mu_k^{-1}a(T\varphi_k,v)=\mu_k^{-1}\langle\varphi_k,v\rangle_H$ ; on retranche $\langle\varphi_k,v\rangle_H$, puis on prend $v\in C^\infty_c(\Omega)$. »
- `faible` + `mu` + `h-omega` ⟹ `lambda` par « Inégalité de Poincaré avec $v=\varphi_k$ : $1\le C_P^2\|\nabla\varphi_k\|^2_{L^2}=C_P^2\lambda_k$ ; puis $\lambda_k=\mu_k^{-1}-1$ avec $\mu_k\to 0^+$. [poincare] »
- `faible` + `spec` ⟹ `grad` par « On prend $v=\varphi_k$ dans la relation de $\varphi_j$ ; si $a(\varphi_k,v)=0$ pour tout $k$, alors $\langle\varphi_k,v\rangle_H=0$ pour tout $k$, donc $v=0$. »
- `spec` + `faible` + `lambda` + `grad` ⟹ `fin` par « Réunion des résultats établis. »

Justifications sans règle (séduisantes ou fausses) : « L'injection $V\hookrightarrow H$ est continue, donc $T:H\to H$ est compact. » ; « Théorème spectral compact appliqué directement à $A=-\Delta_D$. » ; « $(\varphi_k)$ étant orthonormée dans $H$, elle l'est aussi pour $\int_\Omega\nabla u\cdot\nabla v$. »

Pièges :
- `x-A-compact` → incorrect [spectral-compact-resolvante] : $A$ n'est pas borné : on applique le théorème à sa résolvante compacte, non à $A$. — Contre-exemple : Sur $]0,1[$, $\varphi_k=\sqrt2\sin(k\pi x)$ est unitaire et $A\varphi_k=k^2\pi^2\varphi_k$, de norme non bornée.
- `x-lambda-zero` → incorrect [spectral-compact-resolvante] : Ce sont les valeurs propres $\mu_k$ de $T$ qui tendent vers $0$ ; celles de $A$ sont $\lambda_k=\mu_k^{-1}-1\to+\infty$. — Contre-exemple : Sur $]0,1[$ : $\lambda_k=k^2\pi^2$ et $\mu_k=1/(1+k^2\pi^2)$.
- `T-compact` par « L'injection $V\hookrightarrow H$ est continue, donc $T:H\to H$ est compact. » → incorrect [compact-continue] : La continuité de l’injection ne donne que des bornés : c’est sa compacité (Rellich) qui sert. — Contre-exemple : Sur $\mathbb R^d$, l'injection $H^1\hookrightarrow L^2$ est continue et non compacte : les translatés $\psi(\cdot-ne_1)$ d'une fonction test non nulle sont bornés dans $H^1$, sans sous-suite convergente dans $L^2$.
- `spec` par « Théorème spectral compact appliqué directement à $A=-\Delta_D$. » → incorrect [spectral-compact-resolvante] : Le théorème porte sur un opérateur compact ; $A=-\Delta_D$ n'est même pas borné.
- `grad` par « $(\varphi_k)$ étant orthonormée dans $H$, elle l'est aussi pour $\int_\Omega\nabla u\cdot\nabla v$. » → incorrect [spectral-compact-normes] : L'orthogonalité se transmet aux gradients, pas la normalisation : $\int_\Omega|\nabla\varphi_k|^2=\lambda_k$. — Contre-exemple : Sur $]0,1[$, $\varphi_1=\sqrt2\sin(\pi x)$ vérifie $\int_0^1|\varphi_1'|^2=\pi^2\neq 1$.

Retraits :
- `h-omega` (nécessaire) : Rellich et Poincaré tombent : la résolvante n’est plus compacte. — Contre-exemple : Sur $\mathbb R^d$, $(I-\Delta)^{-1}$ correspond par transformée de Fourier à la multiplication par $1/(1+|\xi|^2)$ : elle n'a aucune valeur propre, donc aucune base de fonctions propres.
- `T-sym` (nécessaire) : Le théorème spectral ne s’applique plus, et les fonctions propres peuvent ne pas être orthogonales. — Contre-exemple : Pour la forme non symétrique $\int_0^1u'v'+\int_0^1u'v$ sur $H^1_0(]0,1[)$, les fonctions propres $e^{x/2}\sin(k\pi x)$ ne sont pas orthogonales dans $L^2(]0,1[)$.

Calculs fermés : [{"kind":"expr-equiv","prompt":"$\\lambda_k$ en fonction de $\\mu_k$, noté m","expected":"1/m-1","vars":["m"]}]

Solution :
**L'opérateur $T$.** La forme $a$ est le produit scalaire de $H^1$ sur $V$, complet ; $v\mapsto\langle f,v\rangle_H$ y est continue. Lax–Milgram définit $T$, linéaire, et le test $v=Tf$ donne $\|Tf\|^2_{H^1}=\langle f,Tf\rangle_H\le\|f\|_H\|Tf\|_{H^1}$, d'où $\|Tf\|_{H^1}\le\|f\|_H$.

**Compacité.** $T$ envoie la boule unité de $H$ dans une partie bornée de $V$, relativement compacte dans $H$ par Rellich : $T$ est compact.

**Auto-adjonction, positivité, injectivité.** $\langle f,Tg\rangle_H=a(Tf,Tg)=a(Tg,Tf)=\langle g,Tf\rangle_H$. Puis $\langle Tf,f\rangle_H=\|Tf\|^2_{H^1}\ge 0$ ; si $Tf=0$, $f$ est orthogonale à $V$, dense, donc $f=0$.

**Base spectrale.** Le théorème donne une base hilbertienne $(\varphi_k)$ de vecteurs propres, $T\varphi_k=\mu_k\varphi_k$, avec $\mu_k\neq 0$ car $\ker T=\{0\}$, et la base est infinie. De plus $\mu_k=\|T\varphi_k\|^2_{H^1}>0$, et, les multiplicités étant finies et l'accumulation n'ayant lieu qu'en $0$, $\mu_k\to 0$.

**Fonctions propres.** $\varphi_k=\mu_k^{-1}T\varphi_k\in V$ et $a(\varphi_k,v)=\mu_k^{-1}\langle\varphi_k,v\rangle_H$ ; avec $\lambda_k=\mu_k^{-1}-1$, on obtient $\int_\Omega\nabla\varphi_k\cdot\nabla v=\lambda_k\int_\Omega\varphi_kv$ pour tout $v\in V$, donc $-\Delta\varphi_k=\lambda_k\varphi_k$ dans $\mathcal D'(\Omega)$. Avec $v=\varphi_k$ et Poincaré : $1=\|\varphi_k\|^2_H\le C_P^2\lambda_k$. Et $\lambda_k\to+\infty$ puisque $\mu_k\to 0^+$.

**Gradients.** $\int_\Omega\nabla\varphi_j\cdot\nabla\varphi_k=\lambda_j\delta_{jk}$ : la famille $\big(\varphi_k/\sqrt{1+\lambda_k}\big)$ est orthonormée pour $a$, et totale dans $V$, car $a(\varphi_k,v)=0$ pour tout $k$ impose $\langle\varphi_k,v\rangle_H=0$ pour tout $k$. C'est la base utilisée dans la méthode de Galerkin.

Indices :
1. Le théorème s'applique à un opérateur compact auto-adjoint. Lequel, ici, puisque $A$ n'est pas borné ?
2. Vérifie dans l'ordre : $T$ borné de $H$ dans $V$, compact par Rellich, auto-adjoint par symétrie de $a$, positif et injectif. Puis traduis $T\varphi_k=\mu_k\varphi_k$ en une relation sur $a(\varphi_k,v)$.
3. De $a(\varphi_k,v)=\mu_k^{-1}\langle\varphi_k,v\rangle_H$ on tire $\int\nabla\varphi_k\cdot\nabla v=\lambda_k\int\varphi_kv$ avec $\lambda_k=\mu_k^{-1}-1$ ; Poincaré donne $\lambda_k>0$.

Erreurs fréquentes :
- Appliquer le théorème spectral compact à $A=-\Delta_D$ lui-même.
- Confondre $\mu_k\to 0$ et $\lambda_k\to 0$.
- Déduire la compacité de la seule continuité de l’injection.
- Croire la base orthonormée pour le produit scalaire des gradients.

Variante : Sur $\Omega=]0,1[$, montrer que les fonctions propres de $T$ sont, à normalisation près, les $\varphi_k(x)=\sqrt2\sin(k\pi x)$, $k\ge 1$, et calculer les valeurs propres $\lambda_k$ et $\mu_k$. En déduire que $(\varphi_k)$ est une base hilbertienne de $L^2(]0,1[)$.

Solution de la variante : Une fonction propre vérifie $\varphi\in H^1_0(]0,1[)$ et $-\varphi''=\lambda\varphi$ dans $\mathcal D'(]0,1[)$ avec $\lambda>0$ ; elle est donc de classe $C^\infty$, de la forme $\alpha\cos(\sqrt\lambda x)+\beta\sin(\sqrt\lambda x)$. La condition $\varphi(0)=0$ donne $\alpha=0$, et $\varphi(1)=0$ avec $\beta\neq 0$ impose $\sqrt\lambda=k\pi$. Ainsi $\lambda_k=k^2\pi^2$, chaque espace propre est la droite engendrée par $\sin(k\pi x)$, et $\int_0^12\sin^2(k\pi x)\,dx=1$. Enfin $\mu_k=1/(1+k^2\pi^2)$. Comme le théorème fournit une base hilbertienne de fonctions propres et que les $\varphi_k$ sont les seules, à normalisation près, $(\varphi_k)$ est une base hilbertienne de $L^2(]0,1[)$.

Vérification : {"origin":"complement","review":"machine","notes":"La compacité de la résolvante suit la démonstration du polycopié (p. PDF 24) ; la construction de la base et les propriétés des fonctions propres sont des compléments."}