# 25. Alternative de Fredholm (`fredholm`) — polycopié p. PDF 24, section 6.3

## Fiche

Espaces : $H$ : espace de Hilbert réel (dans le cas complexe, le produit scalaire est linéaire en la première variable). | $\mathcal L(H)$ : opérateurs linéaires continus de $H$ dans $H$ ; $K^*$ désigne l'adjoint de $K$. | $\ker$ et $\operatorname{Im}$ : noyau et image ; $E^\perp$ : orthogonal de $E$ dans $H$.

Hypothèses :
- $H$ est un espace de Hilbert.
- $K\in\mathcal L(H)$ est compact : l'image par $K$ de toute partie bornée de $H$ est relativement compacte. — Sans elle : Sur $\ell^2$, soit $S(x_1,x_2,\dots)=(0,x_1,x_2,\dots)$ et $K=I-S$, non compact. Alors $I-K=S$ est injectif, isométrique, mais pas surjectif : l'alternative tombe.

Énoncé : Si $K\in\mathcal L(H)$ est compact, alors $I-K$ a un noyau de dimension finie et une image fermée, et
$$\operatorname{Im}(I-K)=\ker(I-K^*)^\perp.$$
Il est injectif si et seulement s'il est surjectif (alternative de Fredholm).

Bilan : {"existence":"$(I-K)u=f$ admet une solution si et seulement si $f\\perp\\ker(I-K^*)$.","unicite":"Deux solutions diffèrent d'un élément de $\\ker(I-K)$, de dimension finie ; l'unicité pour tout second membre équivaut à l'existence pour tout second membre.","autre":"$\\dim\\ker(I-K)<+\\infty$, et $\\operatorname{Im}(I-K)$ est fermée."}

Preuve dans le polycopié : idee

Plan :
1. Noyau : sur $N=\ker(I-K)$, $K$ coïncide avec l'identité ; la boule unité fermée de $N$ est donc compacte, et $N$ est de dimension finie (lemme de Riesz).
2. Image fermée : si $(I-K)u_n\to f$ avec $u_n\in N^\perp$, la suite $(u_n)$ est bornée, sinon la normalisation et la compacité fourniraient un vecteur unitaire de $N\cap N^\perp$ ; une extraction donne alors $u_n\to u$ et $(I-K)u=f$.
3. Identité des images : $(\operatorname{Im}(I-K))^\perp=\ker(I-K^*)$, et une image fermée est égale à son biorthogonal.
4. Injectif implique surjectif : sinon, les images itérées $H_k=(I-K)^kH$ sont fermées et strictement décroissantes ; des vecteurs unitaires $e_k\in H_k\cap H_{k+1}^\perp$ vérifient $\|Ke_k-Ke_m\|\ge 1$ pour $k<m$, ce qui contredit la compacité.
5. Surjectif implique injectif : sinon, en remontant une chaîne d'antécédents d'un vecteur non nul du noyau, les noyaux itérés $\ker(I-K)^k$ sont strictement croissants, et le même argument conduit à une contradiction.

Vigilance :
- La condition d'orthogonalité porte sur le noyau de $I-K^*$, non sur celui de $I-K$.
- L'alternative concerne $I-K$, non $K$ : en dimension infinie, un opérateur compact injectif n'est jamais surjectif.
- Sans compacité, l’image peut ne pas être fermée, et l’alternative peut tomber.
- L'énoncé du polycopié ne compare pas les dimensions de $\ker(I-K)$ et de $\ker(I-K^*)$ : les exercices n'utilisent pas une telle égalité.

Vérification : {"origin":"complement","review":"machine","notes":"Énoncé repris du polycopié (p. PDF 24), qui n’en donne qu’une idée de preuve ; la démonstration de la fiche est rédigée pour ProofLab."}

Définition « Opérateur compact » : $K\in\mathcal L(H)$ est compact si l'image par $K$ de la boule unité de $H$ est relativement compacte ; de façon équivalente, de toute suite bornée $(u_n)$ de $H$ on peut extraire une sous-suite $(u_{n_k})$ telle que $(Ku_{n_k})$ converge dans $H$.

Définition « Alternative de Fredholm » : Pour $K\in\mathcal L(H)$ compact, l'opérateur $I-K$ est injectif si et seulement s'il est surjectif.

Définition « Orthogonal d’une partie » : Pour $E\subset H$, $E^\perp=\{v\in H:\langle u,v\rangle=0\ \forall u\in E\}$ ; c'est un sous-espace fermé, et si $E$ est un sous-espace vectoriel, $(E^\perp)^\perp=\overline E$.

## Contre-exemple `ce-fredholm-condition` : Le mauvais noyau
Assertion : Pour $K$ compact, $(I-K)u=f$ admet une solution si et seulement si $f\perp\ker(I-K)$.
Tâche : Dans $\mathbb R^2$, soit $K_0=\begin{pmatrix}1&1\\0&0\end{pmatrix}$, $f=(1,-1)$ et $z=(1,0)\in\ker(I-K_0)$. Sachant que $f=(I-K_0)(0,-1)$, calcule $\langle f,z\rangle$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\langle f,z\\rangle$","expected":"1"}
Explication : $(I-K_0)(0,-1)=(1,-1)$ : $f$ est dans l'image, et pourtant $\langle f,z\rangle=1\neq 0$. La condition $f\perp\ker(I-K)$ n'est donc pas nécessaire ; la bonne condition, $f\perp(1,1)$, est satisfaite.

## Contre-exemple `ce-fredholm-non-compact` : Sans compacité
Assertion : Pour tout $K\in\mathcal L(H)$, l'opérateur $I-K$ est injectif si et seulement s'il est surjectif.
Tâche : Sur $\ell^2$, soit $S(x_1,x_2,\dots)=(0,x_1,x_2,\dots)$ et $K=I-S$, de sorte que $I-K=S$. Calcule $\langle Sx,e_1\rangle$ pour $x\in\ell^2$ quelconque.
Vérification : {"kind":"rational","prompt":"Valeur de $\\langle Sx,e_1\\rangle$","expected":"0"}
Explication : $\langle Sx,e_1\rangle$ est la première coordonnée de $Sx$, toujours nulle : $e_1\notin\operatorname{Im}S$. Or $S$ est injectif, car isométrique. L'alternative tombe parce que $K=I-S$ n'est pas compact : $Ke_n=e_n-e_{n+1}$ et $\|Ke_n-Ke_m\|=2$ pour $|n-m|\ge 2$.

## Contre-exemple `ce-fredholm-image-non-fermee` : Image dense non fermée
Assertion : Pour tout $T\in\mathcal L(H)$, on a $\operatorname{Im}T=\ker(T^*)^\perp$.
Tâche : Sur $\ell^2$, soit $Tx=(x_n/n)_{n\ge1}$, auto-adjoint et injectif, de sorte que $\ker(T^*)^\perp=\ell^2$. Pour $y=(1/n)_n$, donne la coordonnée $x_n$ commune à tout antécédent éventuel de $y$.
Vérification : {"kind":"rational","prompt":"Valeur de $x_n$","expected":"1"}
Explication : $Tx=y$ impose $x_n/n=1/n$, soit $x_n=1$ pour tout $n$ : la suite constante $1$ n'est pas de carré sommable. Donc $y\notin\operatorname{Im}T$, bien que $y\in\ker(T^*)^\perp$.

## Exercice facile `fredholm.facile` : La condition d’orthogonalité exacte

Énoncé : Soit $H$ un espace de Hilbert réel, $K\in\mathcal L(H)$ compact et $f\in H$. Formuler la condition exacte portant sur $f$ pour que $(I-K)u=f$ admette une solution, en justifiant chaque sens. Vérifier ensuite, dans $\mathbb R^2$ euclidien avec $K_0=\begin{pmatrix}1&1\\0&0\end{pmatrix}$, qu'on ne peut pas remplacer $\ker(I-K^*)$ par $\ker(I-K)$.
Source : {"doc":"polycopie","pdfPage":42,"label":"Exercice 25, facile ; énoncé de la section 6.3 (p. PDF 24)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-H` (hypothese) : $H$ est un espace de Hilbert réel.
- `h-K` (hypothese) : $K\in\mathcal L(H)$ est compact.
- `h-f` (hypothese) : $f\in H$ est donné.
- `d-K0` (definition) : Dans $\mathbb R^2$ euclidien : $K_0=\begin{pmatrix}1&1\\0&0\end{pmatrix}$, donc $I-K_0=\begin{pmatrix}0&-1\\0&1\end{pmatrix}$.
- `h-fini` (hypothese) : Un opérateur linéaire sur un espace de dimension finie est compact.
- `adj` (egalite) : $(I-K)^*=I-K^*$.
- `nec` (consequence) : Si $f=(I-K)u$ et $z\in\ker(I-K^*)$, alors $\langle f,z\rangle=\langle u,(I-K^*)z\rangle=0$.
- `thm` (application-theoreme) : $\operatorname{Im}(I-K)=\ker(I-K^*)^\perp$.
- `cond` (consequence) : $(I-K)u=f$ admet une solution si et seulement si $\langle f,z\rangle=0$ pour tout $z\in\ker(I-K^*)$.
- `k-compact` (consequence) : $K_0$ est compact.
- `k-adj` (egalite, calcul rational-vector) : $K_0^*=K_0^{\mathsf T}=\begin{pmatrix}1&0\\1&0\end{pmatrix}$.
  - valeur attendue : ["1","0","1","0"]
- `k-Nstar` (egalite, calcul rational-vector) : $\ker(I-K_0^*)=\operatorname{Vect}\{(1,1)\}$.
  - valeur attendue : ["1","1"]
- `k-N` (egalite, calcul rational-vector) : $\ker(I-K_0)=\operatorname{Vect}\{(1,0)\}$.
  - valeur attendue : ["1","0"]
- `k-im` (egalite, calcul rational-vector) : $\operatorname{Im}(I-K_0)=\operatorname{Vect}\{(1,-1)\}$.
  - valeur attendue : ["1","-1"]
- `k-cond` (consequence) : $(I-K_0)u=f$ admet une solution si et seulement si $f_1+f_2=0$.
- `k-t1` (egalite, calcul rational) : $f=(1,-1)$ appartient à $\operatorname{Im}(I-K_0)$, et $\langle f,(1,0)\rangle=1\neq 0$.
  - valeur attendue : "1"
- `k-t2` (consequence) : $f=(0,1)$ vérifie $\langle f,(1,0)\rangle=0$, mais $f_1+f_2=1\neq 0$ : l'équation n'a pas de solution.
- `faux` (consequence) : La condition « $f\perp\ker(I-K)$ » n'est ni nécessaire, ni suffisante.
- `fin` (conclusion) : La condition exacte est $f\perp\ker(I-K^*)$ ; elle ne peut pas être remplacée par $f\perp\ker(I-K)$.
- `x-ker` (consequence, DISTRACTEUR) : $(I-K)u=f$ admet une solution si et seulement si $f\perp\ker(I-K)$.
- `x-toujours` (consequence, DISTRACTEUR) : Comme $K$ est compact, $(I-K)u=f$ admet une solution pour tout $f\in H$.
- `x-egal` (egalite, DISTRACTEUR) : $\ker(I-K^*)=\ker(I-K)$.

Règles :
- `h-H` + `h-K` ⟹ `adj` par « Pour tous $u,v$ : $\langle(I-K)u,v\rangle=\langle u,v\rangle-\langle u,K^*v\rangle$. »
- `adj` ⟹ `nec` par « On fait passer $I-K$ sur le second argument. »
- `h-H` + `h-K` ⟹ `thm` par « Alternative de Fredholm : identité des images. [fredholm] »
- `thm` + `nec` + `h-f` ⟹ `cond` par « Sens direct par le calcul précédent ; réciproque par l'identité des images. »
- `d-K0` + `h-fini` ⟹ `k-compact` par « Dimension finie. »
- `d-K0` ⟹ `k-adj` par « Adjoint d’une matrice pour le produit euclidien. »
- `k-adj` ⟹ `k-Nstar` par « Résolution du système $(I-K_0^*)z=0$. »
- `d-K0` ⟹ `k-N` par « Résolution du système $(I-K_0)n=0$. »
- `d-K0` ⟹ `k-im` par « L’image d’une matrice est engendrée par ses colonnes. »
- `cond` + `k-compact` + `k-Nstar` ⟹ `k-cond` par « Condition générale appliquée à l'opérateur compact $K_0$. » (chemin theoreme)
- `k-im` ⟹ `k-cond` par « Équation d'une droite vectorielle de $\mathbb R^2$. » (chemin direct)
- `k-im` + `k-N` ⟹ `k-t1` par « $f=(I-K_0)(0,-1)$, puis produit scalaire avec le générateur de $\ker(I-K_0)$. »
- `k-cond` + `k-N` ⟹ `k-t2` par « Produit scalaire avec $(1,0)$, puis critère de l'exemple. »
- `k-t1` + `k-t2` ⟹ `faux` par « Le premier témoin réfute la nécessité, le second la suffisance. »
- `cond` + `faux` ⟹ `fin` par « Réunion des résultats établis. »

Justifications sans règle (séduisantes ou fausses) : « Une solution n'est définie qu'à un élément de $\ker(I-K)$ près : c'est donc dans ce noyau que se lit la compatibilité. » ; « Un opérateur compact est auto-adjoint. » ; « C’est évident. »

Pièges :
- `x-ker` → incorrect [fredholm-noyau-adjoint] : L'obstruction se lit dans le noyau de l'adjoint : $\operatorname{Im}(I-K)=\ker(I-K^*)^\perp$, et non $\ker(I-K)^\perp$. — Contre-exemple : Avec $K_0$ : $f=(1,-1)=(I-K_0)(0,-1)$ est dans l'image, et n'est pas orthogonal à $(1,0)\in\ker(I-K_0)$.
- `x-toujours` → incorrect [hypotheses-theoreme] : La compacité donne une image fermée, pas l'image entière : la surjectivité de $I-K$ équivaut à son injectivité, qui peut manquer. — Contre-exemple : Avec $K_0$ et $f=(0,1)$ : $f_1+f_2=1\neq 0$, l'équation n'a pas de solution.
- `x-egal` → incorrect [fredholm-noyau-adjoint] : Les noyaux de $I-K$ et de $I-K^*$ n'ont aucune raison de coïncider lorsque $K$ n'est pas auto-adjoint. — Contre-exemple : $\ker(I-K_0)=\operatorname{Vect}\{(1,0)\}$ et $\ker(I-K_0^*)=\operatorname{Vect}\{(1,1)\}$.
- `cond` par « Une solution n'est définie qu'à un élément de $\ker(I-K)$ près : c'est donc dans ce noyau que se lit la compatibilité. » → incorrect [fredholm-noyau-adjoint] : $\ker(I-K)$ décrit la non-unicité des solutions ; la compatibilité de $f$ se lit dans $\ker(I-K^*)$. — Contre-exemple : Avec $K_0$ : $f=(1,-1)$ est atteint, et $\langle f,(1,0)\rangle=1$.
- `k-adj` par « Un opérateur compact est auto-adjoint. » → incorrect [symetrie-autoadjonction] : La compacité n’entraîne aucune symétrie. — Contre-exemple : $K_0$ est compact, et $K_0\neq K_0^{\mathsf T}$.
- `cond` par « C’est évident. » → a-justifier [justification-absente] : Chacun des deux sens se justifie : un calcul pour la nécessité, le théorème pour la suffisance.

Retraits :
- `h-K` (nécessaire) : Sans compacité, l'image peut ne pas être fermée, et la condition d'orthogonalité cesse d'être suffisante. — Contre-exemple : Sur $\ell^2$, soit $Tx=(x_n/n)_{n\ge1}$ et $K=I-T$, non compact. Alors $\ker(I-K^*)=\ker T=\{0\}$ : tout $f$ vérifie la condition, mais $(1/n)_n\notin\operatorname{Im}T$.

Calculs fermés : [{"kind":"choice","prompt":"Pour $K$ compact, $(I-K)u=f$ admet une solution si et seulement si :","options":["$f\\perp\\ker(I-K)$","$f\\perp\\ker(I-K^*)$","$f\\in\\ker(I-K^*)$","$f\\in\\operatorname{Im}(I-K^*)$"],"correct":[1],"explanation":"La condition exacte est $f\\in\\ker(I-K^*)^\\perp=\\operatorname{Im}(I-K)$."}]

Solution :
**Énoncé exact.** Pour $K$ compact sur $H$ et $f\in H$ :
$$(I-K)u=f\ \text{admet une solution}\iff\langle f,z\rangle=0\quad\text{pour tout } z\in\ker(I-K^*).$$

*Nécessité.* Si $f=(I-K)u$ et $(I-K^*)z=0$, alors $\langle f,z\rangle=\langle u,(I-K^*)z\rangle=0$, car $(I-K)^*=I-K^*$.

*Suffisance.* Le théorème donne $\operatorname{Im}(I-K)=\ker(I-K^*)^\perp$ : la compacité sert à la fermeture de l'image.

**Exemple.** $K_0$ est compact, car la dimension est finie, et $K_0^*=K_0^{\mathsf T}=\begin{pmatrix}1&0\\1&0\end{pmatrix}$. On trouve $\ker(I-K_0^*)=\operatorname{Vect}\{(1,1)\}$, d'où la condition $f_1+f_2=0$ ; elle est confirmée par $\operatorname{Im}(I-K_0)=\operatorname{Vect}\{(1,-1)\}$. En revanche $\ker(I-K_0)=\operatorname{Vect}\{(1,0)\}$.

**La condition voisine est fausse.** $f=(1,-1)=(I-K_0)(0,-1)$ est dans l'image, et $\langle f,(1,0)\rangle=1$ : la condition $f\perp\ker(I-K)$ n'est pas nécessaire. $f=(0,1)$ est orthogonal à $(1,0)$, sans être dans l'image : elle n'est pas suffisante.

Indices :
1. Quel opérateur apparaît quand on fait passer $I-K$ de l'autre côté d'un produit scalaire ?
2. La nécessité est un calcul d'une ligne ; la suffisance demande l'identité des images. Pour l'exemple, calcule séparément les deux noyaux et l'image.
3. $\ker(I-K_0^*)$ est engendré par $(1,1)$, $\ker(I-K_0)$ par $(1,0)$. Teste $f=(1,-1)$, puis $f=(0,1)$.

Erreurs fréquentes :
- Écrire la condition avec $\ker(I-K)$ au lieu de $\ker(I-K^*)$.
- Croire que la compacité rend l’équation toujours résoluble.
- Supposer qu’un opérateur compact est auto-adjoint.

Variante : Dans $\mathbb R^2$ euclidien, soit $K_1=\begin{pmatrix}0&2\\0&1\end{pmatrix}$. Déterminer la condition exacte sur $f$ pour que $(I-K_1)u=f$ admette une solution, et montrer que $f\perp\ker(I-K_1)$ n'est pas nécessaire.

Solution de la variante : On a $I-K_1=\begin{pmatrix}1&-2\\0&0\end{pmatrix}$ et $K_1^*=K_1^{\mathsf T}$, donc $I-K_1^*=\begin{pmatrix}1&0\\-2&0\end{pmatrix}$ : $\ker(I-K_1^*)=\operatorname{Vect}\{(0,1)\}$. La condition exacte est $f_2=0$, confirmée par $\operatorname{Im}(I-K_1)=\operatorname{Vect}\{(1,0)\}$. D'autre part, $\ker(I-K_1)=\operatorname{Vect}\{(2,1)\}$ : le vecteur $f=(1,0)$ est dans l'image, mais $\langle f,(2,1)\rangle=2\neq 0$.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `fredholm.intermediaire` : Image fermée et identité des images

Énoncé : Soit $H$ un espace de Hilbert réel, $K\in\mathcal L(H)$ compact et $T=I-K$. Montrer que $T^*=I-K^*$ et $(\operatorname{Im}T)^\perp=\ker T^*$, puis que $\operatorname{Im}T$ est fermée, et en déduire $\operatorname{Im}(I-K)=\ker(I-K^*)^\perp$.
Source : {"doc":"polycopie","pdfPage":42,"label":"Exercice 25, intermédiaire ; idée de preuve de la section 6.3 (p. PDF 24)"} — prérequis : —

But : `fin` — usage : demonstration

Nœuds :
- `h-H` (hypothese) : $H$ est un espace de Hilbert réel.
- `h-K` (hypothese) : $K\in\mathcal L(H)$ est compact ; on pose $T=I-K$.
- `adj` (egalite) : $T^*=I-K^*$.
- `perp` (egalite) : $(\operatorname{Im}T)^\perp=\ker T^*$.
- `biortho` (application-theoreme) : Pour tout sous-espace vectoriel $E$ de $H$ : $(E^\perp)^\perp=\overline E$.
- `adh` (egalite) : $\overline{\operatorname{Im}T}=(\ker T^*)^\perp$.
- `kerT-ferme` (consequence) : $\ker T$ est fermé dans $H$.
- `decomp` (application-theoreme) : $H=\ker T\oplus(\ker T)^\perp$.
- `s-suite` (definition, locale) : Soit $f\in\overline{\operatorname{Im}T}$, et $(u_n)\subset H$ telle que $Tu_n\to f$.
- `reduc` (consequence) : Quitte à remplacer $u_n$ par sa composante sur $(\ker T)^\perp$, on peut supposer $u_n\in(\ker T)^\perp$ pour tout $n$.
- `abs` (definition, locale) : Supposons $(u_n)$ non bornée : après extraction, $\|u_n\|\to+\infty$ ; on pose $v_n=u_n/\|u_n\|$.
- `abs-Tv` (consequence) : $\|v_n\|=1$ pour tout $n$, et $Tv_n\to 0$.
- `abs-extract` (consequence) : Une sous-suite vérifie $Kv_n\to w$ dans $H$.
- `abs-lim` (consequence) : Le long de cette sous-suite, $v_n=Tv_n+Kv_n\to w$, et $\|w\|=1$.
- `abs-orth` (consequence) : $w\in(\ker T)^\perp$ et $Tw=0$.
- `abs-contra` (contradiction) : $w\in\ker T\cap(\ker T)^\perp=\{0\}$, ce qui contredit $\|w\|=1$.
- `bornee` (consequence) : La suite $(u_n)$ est bornée.
- `extract` (consequence) : Une sous-suite vérifie $Ku_n\to g$ dans $H$.
- `conv` (consequence) : Le long de cette sous-suite, $u_n=Tu_n+Ku_n\to f+g=:u$.
- `im` (egalite) : $Tu=f$, donc $f\in\operatorname{Im}T$.
- `ferme` (consequence) : $\operatorname{Im}T$ est fermée dans $H$.
- `fin` (conclusion) : $\operatorname{Im}(I-K)=\overline{\operatorname{Im}(I-K)}=\ker(I-K^*)^\perp$.
- `x-image` (consequence, DISTRACTEUR) : Tout opérateur borné de $H$ dans $H$ a une image fermée.
- `x-borne` (consequence, DISTRACTEUR) : Toute suite $(u_n)$ telle que $(Tu_n)$ converge est bornée.
- `x-suite` (consequence, DISTRACTEUR) : Toute suite bornée de $H$ admet une sous-suite convergente dans $H$.

Règles :
- `h-K` ⟹ `adj` par « Pour tous $u,v$ : $\langle(I-K)u,v\rangle=\langle u,v\rangle-\langle u,K^*v\rangle$. »
- `adj` ⟹ `perp` par « $v\perp\operatorname{Im}T$ équivaut à $\langle u,T^*v\rangle=0$ pour tout $u\in H$. »
- `h-H` ⟹ `biortho` par « Théorème de projection : $H=\overline E\oplus E^\perp$. [projection] »
- `perp` + `biortho` ⟹ `adh` par « Orthogonal des deux membres. »
- `h-K` ⟹ `kerT-ferme` par « Image réciproque du fermé $\{0\}$ par l'application continue $T$. »
- `kerT-ferme` + `h-H` ⟹ `decomp` par « Théorème de projection sur le sous-espace fermé $\ker T$. [projection] »
- `s-suite` + `decomp` ⟹ `reduc` par « Si $u_n=z_n+y_n$ avec $z_n\in\ker T$ et $y_n\in(\ker T)^\perp$, alors $Ty_n=Tu_n$. »
- `abs` + `s-suite` ⟹ `abs-Tv` par « $Tv_n=Tu_n/\|u_n\|$, où $(Tu_n)$ est bornée car convergente. »
- `abs-Tv` + `h-K` ⟹ `abs-extract` par « Compacité de $K$, appliquée à la suite bornée $(v_n)$. »
- `abs-extract` + `abs-Tv` ⟹ `abs-lim` par « Somme de deux suites convergentes, et continuité de la norme. »
- `abs-lim` + `reduc` + `h-K` ⟹ `abs-orth` par « $(\ker T)^\perp$ est fermé, et $T$ est continu. »
- `abs-orth` + `abs-lim` ⟹ `abs-contra` par « Un vecteur orthogonal à lui-même est nul. »
- `abs-contra` ⟹ `bornee` par « Raisonnement par l’absurde. »
- `bornee` + `h-K` ⟹ `extract` par « Compacité de $K$, appliquée à la suite bornée $(u_n)$. »
- `extract` + `s-suite` ⟹ `conv` par « Somme de deux suites convergentes. »
- `conv` + `s-suite` ⟹ `im` par « Continuité de $T$ : $Tu=\lim Tu_n$. »
- `im` ⟹ `ferme` par « On a établi $\overline{\operatorname{Im}T}\subset\operatorname{Im}T$. »
- `ferme` + `adh` + `adj` ⟹ `fin` par « Une image fermée coïncide avec son adhérence ; puis $T^*=I-K^*$. »

Justifications sans règle (séduisantes ou fausses) : « Théorème de l'application ouverte : $T$ induit un isomorphisme de $(\ker T)^\perp$ sur son image. » ; « L’image d’un opérateur continu est fermée. » ; « $\langle Tu,v\rangle=\langle u,Tv\rangle$ pour tous $u,v\in H$. »

Pièges :
- `x-image` → incorrect [image-dense-surjective] : La continuité ne donne pas la fermeture de l’image : c’est ici la compacité qui la fournit. — Contre-exemple : Sur $\ell^2$, $Tx=(x_n/n)_{n\ge1}$ est continu ; $y=(1/n)_n$ est limite des images des suites $(1,\dots,1,0,\dots)$, mais $Tx=y$ impose $x_n=1$ pour tout $n$, et $x\notin\ell^2$.
- `x-borne` → incorrect [fredholm-reduction] : Une composante dans $\ker T$ n'est pas vue par $T$ : la bornitude ne vaut qu'après réduction à $(\ker T)^\perp$. — Contre-exemple : Si $z\in\ker T$ est non nul (par exemple $K=I$ sur $\mathbb R$ et $z=1$), la suite $u_n=nz$ vérifie $Tu_n=0$ et n'est pas bornée.
- `x-suite` → incorrect [bornee-non-convergente] : En dimension infinie, une suite bornée n'a pas de sous-suite fortement convergente en général : c'est la compacité de $K$ qui fournit l'extraction. — Contre-exemple : Une suite orthonormée $(e_n)$ d'un Hilbert de dimension infinie vérifie $\|e_n-e_m\|=\sqrt2$ pour $n\neq m$.
- `bornee` par « Théorème de l'application ouverte : $T$ induit un isomorphisme de $(\ker T)^\perp$ sur son image. » → incorrect [circularite] : Le théorème de l'application ouverte suppose que l'image est un espace de Banach, donc fermée dans $H$ : c'est précisément ce qu'on veut démontrer.
- `ferme` par « L’image d’un opérateur continu est fermée. » → incorrect [image-dense-surjective] : Cette justification est fausse : un opérateur continu peut avoir une image dense et non fermée. — Contre-exemple : $Tx=(x_n/n)_{n\ge1}$ sur $\ell^2$ : $(1/n)_n$ est dans l'adhérence de l'image, pas dans l'image.
- `perp` par « $\langle Tu,v\rangle=\langle u,Tv\rangle$ pour tous $u,v\in H$. » → incorrect [symetrie-autoadjonction] : $T=I-K$ n'est pas auto-adjoint en général : faire passer $T$ de l'autre côté fait apparaître $T^*$. — Contre-exemple : Pour $K=\begin{pmatrix}1&1\\0&0\end{pmatrix}$ sur $\mathbb R^2$ : $T=\begin{pmatrix}0&-1\\0&1\end{pmatrix}\neq T^{\mathsf T}$.

Retraits :
- `h-K` (nécessaire) : Sans compacité, ni la bornitude ni l'extraction ne sont disponibles, et l'image peut ne pas être fermée. — Contre-exemple : Sur $\ell^2$, pour $K=I-T$ avec $Tx=(x_n/n)_{n\ge1}$ : $K$ n'est pas compact, et $\operatorname{Im}(I-K)=\operatorname{Im}T$ n'est pas fermée.
- `reduc` (nécessaire) : Le raisonnement par l’absurde ne conduit plus à une contradiction : la limite obtenue peut être un vecteur unitaire du noyau. — Contre-exemple : Pour $K=I$ sur $\mathbb R$ : $T=0$, et $u_n=n$ vérifie $Tu_n\to 0$ ; normalisée, la suite vaut $1$, qui est dans $\ker T$.

Solution :
**Adjoint et orthogonal.** Pour $u,v\in H$, $\langle(I-K)u,v\rangle=\langle u,(I-K^*)v\rangle$ : donc $T^*=I-K^*$. Puis $v\perp\operatorname{Im}T$ si et seulement si $\langle u,T^*v\rangle=0$ pour tout $u$, c'est-à-dire $T^*v=0$ : $(\operatorname{Im}T)^\perp=\ker T^*$. En passant à l'orthogonal, $\overline{\operatorname{Im}T}=(\ker T^*)^\perp$.

**Image fermée.** Soit $f\in\overline{\operatorname{Im}T}$ et $Tu_n\to f$. Comme $\ker T$ est fermé, on peut remplacer $u_n$ par sa composante sur $(\ker T)^\perp$, sans changer $Tu_n$.

*La suite est bornée.* Sinon, après extraction, $\|u_n\|\to+\infty$ ; $v_n=u_n/\|u_n\|$ vérifie $\|v_n\|=1$ et $Tv_n\to 0$. Par compacité, une sous-suite vérifie $Kv_n\to w$, donc $v_n=Tv_n+Kv_n\to w$, avec $\|w\|=1$. Comme $(\ker T)^\perp$ est fermé, $w\in(\ker T)^\perp$, et $Tw=\lim Tv_n=0$ : $w\in\ker T\cap(\ker T)^\perp=\{0\}$, contradiction.

*Passage à la limite.* Par compacité, une sous-suite vérifie $Ku_n\to g$, donc $u_n=Tu_n+Ku_n\to f+g=:u$, et $Tu=f$ par continuité. Ainsi $\operatorname{Im}T$ est fermée.

**Conclusion.** $\operatorname{Im}(I-K)=\overline{\operatorname{Im}(I-K)}=\ker(I-K^*)^\perp$.

**Point de vigilance.** Le théorème de l'application ouverte ne peut pas servir à borner $(u_n)$ : il supposerait l'image fermée.

Indices :
1. L'identité $(\operatorname{Im}T)^\perp=\ker T^*$ vaut pour tout opérateur borné. Que manque-t-il pour passer de l'adhérence de l'image à l'image ?
2. Pour la fermeture, pars de $Tu_n\to f$. Une suite non bornée ruinerait l'argument : retire d'abord la composante de $u_n$ dans $\ker T$, puis raisonne par l'absurde.
3. Normalise : $v_n=u_n/\|u_n\|$ vérifie $Tv_n\to 0$. La compacité donne $Kv_n\to w$, donc $v_n\to w$ : où se trouve $w$ ?

Erreurs fréquentes :
- Confondre $\operatorname{Im}T$ et son adhérence $(\ker T^*)^\perp$.
- Affirmer la bornitude de $(u_n)$ sans l'avoir réduite à $(\ker T)^\perp$.
- Extraire une sous-suite convergente d’une suite seulement bornée.
- Invoquer l’application ouverte, qui suppose l’image fermée.

Variante : Soit $T\in\mathcal L(H)$ quelconque. Montrer que $\overline{\operatorname{Im}T}=\ker(T^*)^\perp$, et que l'égalité $\operatorname{Im}T=\ker(T^*)^\perp$ peut échouer, à l'aide de $Tx=(x_n/n)_{n\ge1}$ sur $\ell^2$.

Solution de la variante : Pour tout $T\in\mathcal L(H)$, $v\perp\operatorname{Im}T$ équivaut à $T^*v=0$, donc $(\operatorname{Im}T)^\perp=\ker T^*$ et $\overline{\operatorname{Im}T}=(\ker T^*)^\perp$. Pour $Tx=(x_n/n)_n$ sur $\ell^2$, on a $T^*=T$, injectif, donc $\ker(T^*)^\perp=\ell^2$. Mais $y=(1/n)_n\in\ell^2$ n'est pas dans l'image : $Tx=y$ impose $x_n=1$ pour tout $n$, et la suite constante $1$ n'est pas de carré sommable. L'image est dense et non fermée.

Vérification : {"origin":"complement","review":"machine"}

## Exercice difficile `fredholm.difficile` : L'équation $u-Ku=f$ quand $1$ est valeur propre

Énoncé : Soit $H$ un espace de Hilbert réel et $K\in\mathcal L(H)$ compact, tel que $1$ soit valeur propre de $K$ ; on note $N=\ker(I-K)\neq\{0\}$ et $N^*=\ker(I-K^*)$. Montrer que $I-K$ n'est pas surjectif et que $N^*\neq\{0\}$ ; caractériser les $f$ pour lesquels $u-Ku=f$ a une solution ; décrire l'ensemble des solutions ; montrer qu'une seule appartient à $N^\perp$ et qu'elle vérifie une estimation a priori $\|u\|\le C\|f\|$.
Source : {"doc":"polycopie","pdfPage":42,"label":"Exercice 25, difficile ; énoncé de la section 6.3 (p. PDF 24)"} — prérequis : application-ouverte

But : `fin` — usage : application

Nœuds :
- `h-H` (hypothese) : $H$ est un espace de Hilbert réel.
- `h-K` (hypothese) : $K\in\mathcal L(H)$ est compact.
- `h-vp` (hypothese) : $1$ est valeur propre de $K$ : $N=\ker(I-K)\neq\{0\}$.
- `d-Nstar` (definition) : $N^*=\ker(I-K^*)$.
- `h-f` (hypothese) : $f\in H$ est un second membre donné.
- `thm` (application-theoreme) : $N$ est de dimension finie, $\operatorname{Im}(I-K)=(N^*)^\perp$ est fermée, et $I-K$ est injectif si et seulement s'il est surjectif.
- `nonsurj` (consequence) : $I-K$ n'est pas surjectif.
- `Nstar` (consequence) : $N^*\neq\{0\}$.
- `cond` (consequence) : $u-Ku=f$ admet une solution si et seulement si $f\perp N^*$.
- `s-sol` (definition, locale) : Soit $f\perp N^*$, et $u_0$ une solution de $u-Ku=f$.
- `s-aff` (consequence) : $u$ est solution si et seulement si $u-u_0\in N$.
- `s-ens` (consequence) : L'ensemble des solutions est $u_0+N$, sous-espace affine de dimension finie $\dim N\ge 1$.
- `decomp` (application-theoreme) : $N$ est fermé, et $H=N\oplus N^\perp$.
- `s-unique` (consequence) : La composante de $u_0$ sur $N^\perp$ est l'unique solution appartenant à $N^\perp$.
- `e-abs` (definition, locale) : Supposons qu'aucun $C>0$ ne vérifie $\|y\|\le C\|(I-K)y\|$ pour tout $y\in N^\perp$ : il existe alors $(y_n)\subset N^\perp$ avec $\|y_n\|=1$ et $(I-K)y_n\to 0$.
- `e-ext` (consequence) : Une sous-suite vérifie $Ky_n\to g$ dans $H$.
- `e-lim` (consequence) : Le long de cette sous-suite, $y_n\to g$, avec $\|g\|=1$, $g\in N^\perp$ et $(I-K)g=0$.
- `e-contra` (contradiction) : $g\in N\cap N^\perp=\{0\}$, ce qui contredit $\|g\|=1$.
- `b-bij` (consequence) : $I-K$ induit une bijection linéaire continue de $N^\perp$ sur $\operatorname{Im}(I-K)$, deux espaces de Banach.
- `C` (inegalite) : Il existe $C>0$ tel que $\|y\|\le C\|(I-K)y\|$ pour tout $y\in N^\perp$.
- `stab` (inegalite) : La solution $y\in N^\perp$ vérifie $\|y\|\le C\|f\|$.
- `fin` (conclusion) : $I-K$ n'est pas surjectif et $N^*\neq\{0\}$ ; l'équation est résoluble si et seulement si $f\perp N^*$ ; ses solutions forment $u_0+N$ ; une seule est dans $N^\perp$, et elle vérifie $\|y\|\le C\|f\|$.
- `x-partout` (consequence, DISTRACTEUR) : $u-Ku=f$ admet une solution pour tout $f\in H$, puisque $K$ est compact.
- `x-minore` (inegalite, DISTRACTEUR) : Il existe $C>0$ tel que $\|u\|\le C\|(I-K)u\|$ pour tout $u\in H$.
- `x-Nstar-N` (egalite, DISTRACTEUR) : $N^*=N$.

Règles :
- `h-H` + `h-K` + `d-Nstar` ⟹ `thm` par « Alternative de Fredholm pour le compact $K$. [fredholm] »
- `thm` + `h-vp` ⟹ `nonsurj` par « $N\neq\{0\}$ : $I-K$ n'est pas injectif ; on applique l'équivalence entre injectivité et surjectivité. »
- `thm` + `nonsurj` ⟹ `Nstar` par « Si $N^*=\{0\}$, alors $(N^*)^\perp=H$, et $I-K$ serait surjectif. »
- `thm` + `h-f` ⟹ `cond` par « Identité $\operatorname{Im}(I-K)=(N^*)^\perp$. »
- `s-sol` + `h-vp` ⟹ `s-aff` par « Linéarité : $(I-K)(u-u_0)=f-f=0$, et réciproquement. »
- `s-aff` + `thm` + `h-vp` ⟹ `s-ens` par « Translaté de $N$, de dimension finie par le théorème. »
- `thm` + `h-H` ⟹ `decomp` par « Un sous-espace de dimension finie est fermé ; théorème de projection. [projection] »
- `s-sol` + `decomp` + `s-aff` ⟹ `s-unique` par « $(I-K)$ s'annule sur la composante dans $N$ ; deux solutions de $N^\perp$ diffèrent d'un élément de $N\cap N^\perp=\{0\}$. »
- `e-abs` + `h-K` ⟹ `e-ext` par « Compacité de $K$, appliquée à la suite bornée $(y_n)$. » (chemin compacite)
- `e-ext` + `e-abs` ⟹ `e-lim` par « $y_n=(I-K)y_n+Ky_n$ ; $N^\perp$ est fermé et $I-K$ est continu. » (chemin compacite)
- `e-lim` + `h-vp` ⟹ `e-contra` par « Un vecteur orthogonal à lui-même est nul. » (chemin compacite)
- `e-contra` ⟹ `C` par « Raisonnement par l’absurde. » (chemin compacite)
- `thm` + `decomp` ⟹ `b-bij` par « Le noyau de la restriction est $N\cap N^\perp=\{0\}$ ; tout $(I-K)u$ est atteint par la composante de $u$ sur $N^\perp$ ; les deux espaces sont fermés dans $H$. » (chemin banach)
- `b-bij` ⟹ `C` par « Théorème de l’application ouverte : l’inverse d’une bijection linéaire continue entre Banach est continu. [application-ouverte] » (chemin banach)
- `C` + `s-unique` + `cond` ⟹ `stab` par « On applique la minoration à la solution $y\in N^\perp$, pour laquelle $(I-K)y=f$. »
- `nonsurj` + `Nstar` + `cond` + `s-ens` + `s-unique` + `stab` ⟹ `fin` par « Réunion des résultats établis. »

Justifications sans règle (séduisantes ou fausses) : « Les noyaux de $I-K$ et de $I-K^*$ coïncident, donc $N^*=N\neq\{0\}$. » ; « L'image de $I-K$ étant fermée, $I-K$ est minoré sur $H$ tout entier. »

Pièges :
- `x-partout` → incorrect [fredholm-noyau-adjoint] : $I-K$ n'est pas injectif, donc pas surjectif : l'obstruction $N^*\neq\{0\}$ est réelle. — Contre-exemple : $K=I$ sur $\mathbb R$ est compact, $1$ en est valeur propre, et $u-Ku=0$ pour tout $u$ : $f=1$ n'est pas atteint.
- `x-minore` → incorrect [fredholm-reduction] : Une minoration sur $H$ entier rendrait $I-K$ injectif. Elle ne peut valoir que sur un supplémentaire de $N$, ici $N^\perp$. — Contre-exemple : Pour $u\in N\setminus\{0\}$ : $(I-K)u=0$, alors que $\|u\|>0$.
- `x-Nstar-N` → incorrect [fredholm-noyau-adjoint] : Les noyaux de $I-K$ et de $I-K^*$ n'ont aucune raison de coïncider lorsque $K$ n'est pas auto-adjoint. — Contre-exemple : Sur $\mathbb R^2$, $K_0=\begin{pmatrix}1&1\\0&0\end{pmatrix}$ : $N=\operatorname{Vect}\{(1,0)\}$ et $N^*=\operatorname{Vect}\{(1,1)\}$.
- `Nstar` par « Les noyaux de $I-K$ et de $I-K^*$ coïncident, donc $N^*=N\neq\{0\}$. » → incorrect [fredholm-noyau-adjoint] : La conclusion est juste, la raison est fausse : $N^*$ et $N$ diffèrent en général. Ici, $N^*\neq\{0\}$ découle de la non-surjectivité et de l'identité des images. — Contre-exemple : Pour $K_0=\begin{pmatrix}1&1\\0&0\end{pmatrix}$ : $N=\operatorname{Vect}\{(1,0)\}\neq\operatorname{Vect}\{(1,1)\}=N^*$.
- `C` par « L'image de $I-K$ étant fermée, $I-K$ est minoré sur $H$ tout entier. » → incorrect [fredholm-reduction] : $I-K$ s'annule sur $N\neq\{0\}$ : aucune minoration n'est possible sur $H$ entier, seulement sur $N^\perp$.

Retraits :
- `h-K` (nécessaire) : Le théorème ne s’applique plus : la dimension finie du noyau et la fermeture de l’image peuvent disparaître. — Contre-exemple : Pour $K=I$ sur un Hilbert de dimension infinie, $1$ est valeur propre et $N=H$ est de dimension infinie.
- `h-vp` (nécessaire) : Si $1$ n'est pas valeur propre, $I-K$ est injectif, donc surjectif : l'équation a une unique solution pour tout $f$, et il n'y a plus d'obstruction. — Contre-exemple : $K=0$ : l'unique solution de $u-Ku=f$ est $u=f$.

Solution :
On note $T=I-K$, $N=\ker T$ et $N^*=\ker T^*=\ker(I-K^*)$.

**Obstruction.** Le théorème donne $\dim N<+\infty$, $\operatorname{Im}T=(N^*)^\perp$ fermée, et l'équivalence entre injectivité et surjectivité. Comme $N\neq\{0\}$, $T$ n'est pas injectif, donc pas surjectif. Si l'on avait $N^*=\{0\}$, on aurait $\operatorname{Im}T=H$ : donc $N^*\neq\{0\}$.

**Compatibilité.** $u-Ku=f$ admet une solution si et seulement si $f\in\operatorname{Im}T=(N^*)^\perp$.

**Ensemble des solutions.** Si $u_0$ est une solution, $u$ en est une si et seulement si $T(u-u_0)=0$ : l'ensemble des solutions est $u_0+N$, de dimension finie $\dim N\ge 1$. Il n'y a jamais unicité.

**Solution canonique.** $N$ est de dimension finie, donc fermé, et $H=N\oplus N^\perp$. Si $u_0=z+y$ avec $z\in N$ et $y\in N^\perp$, alors $Ty=Tu_0=f$ : $y$ est solution. Deux solutions de $N^\perp$ diffèrent d'un élément de $N\cap N^\perp=\{0\}$.

**Estimation a priori.** Il existe $C>0$ tel que $\|y\|\le C\|Ty\|$ pour $y\in N^\perp$. Sinon, il existerait $y_n\in N^\perp$, $\|y_n\|=1$, $Ty_n\to 0$ ; par compacité, une sous-suite vérifie $Ky_n\to g$, donc $y_n=Ty_n+Ky_n\to g$, avec $\|g\|=1$, $g\in N^\perp$ et $Tg=0$ : contradiction, car $g\in N\cap N^\perp$. On peut aussi appliquer le théorème de l'application ouverte à la bijection continue $T:N^\perp\to\operatorname{Im}T$, entre deux espaces de Banach. Pour la solution $y\in N^\perp$, on obtient $\|y\|\le C\|f\|$.

**Remarque.** L'estimation est fausse sur $H$ entier, puisque $T$ s'annule sur $N$ : la stabilité ne porte que sur la solution normalisée par $y\perp N$.

Indices :
1. Que dit l'alternative lorsque $I-K$ n'est pas injectif ? Où se lit alors l'obstruction à la résolution ?
2. Sépare les questions : existence (condition sur $f$), description des solutions (translaté de $N$), normalisation (composante sur $N^\perp$), stabilité (minoration sur $N^\perp$).
3. Pour la minoration, raisonne par l'absurde avec $y_n\in N^\perp$ unitaires et $(I-K)y_n\to 0$ : la compacité fait converger $y_n$ vers un vecteur unitaire de $N\cap N^\perp$.

Erreurs fréquentes :
- Croire l’équation résoluble pour tout second membre.
- Annoncer une solution unique alors que $N\neq\{0\}$.
- Écrire une estimation a priori sur $H$ entier, sans se restreindre à $N^\perp$.
- Identifier $\ker(I-K^*)$ à $\ker(I-K)$.

Variante : Dans $H=L^2(]0,1[)$ réel, soit $Ku(x)=2x\int_0^1u(y)\,dy$. Vérifier que $K$ est compact et que $1$ en est valeur propre ; déterminer $\ker(I-K)$, $K^*$ et $\ker(I-K^*)$ ; pour $f(x)=1-2x$, décrire toutes les solutions de $u-Ku=f$ et calculer celle qui est orthogonale à $\ker(I-K)$.

Solution de la variante : On a $Ku=\langle u,b\rangle a$ avec $a(x)=2x$ et $b\equiv 1$ : $K$ est de rang $1$, donc compact. Si $u=Ku$, alors $u$ est proportionnelle à $x$ ; réciproquement $K(x)=2x\int_0^1y\,dy=x$ : $\ker(I-K)=\operatorname{Vect}\{x\}$. L'adjoint est $K^*v=\langle v,a\rangle b$, fonction constante égale à $\int_0^12xv(x)\,dx$ ; ses points fixes sont les constantes : $\ker(I-K^*)=\operatorname{Vect}\{1\}$. La condition est donc $\int_0^1f=0$, vérifiée par $f(x)=1-2x$. Comme $Kf=0$, $f$ est une solution, et les solutions sont les $u_c(x)=1-2x+cx$. L'orthogonalité à $x$ s'écrit $\frac12-\frac23+\frac c3=0$, soit $c=\frac12$ : la solution cherchée est $u(x)=1-\frac32x$.

Graphe de la variante :
But : `fin` — usage : application

Nœuds :
- `h-H` (hypothese) : $H=L^2(]0,1[)$, réel, est un espace de Hilbert.
- `d-K` (definition) : $Ku(x)=2x\int_0^1u(y)\,dy$, c'est-à-dire $Ku=\langle u,b\rangle a$ avec $a(x)=2x$ et $b\equiv 1$.
- `d-f` (definition) : $f(x)=1-2x$.
- `k-rang` (consequence) : $K$ est de rang $1$, donc compact.
- `k-adj` (egalite) : $K^*v=\langle v,a\rangle b$ : $K^*v$ est la fonction constante égale à $\int_0^12xv(x)\,dx$.
- `k-N` (egalite) : $\ker(I-K)=\operatorname{Vect}\{x\}$ ; en particulier, $1$ est valeur propre de $K$.
- `k-Nstar` (egalite) : $\ker(I-K^*)=\operatorname{Vect}\{1\}$.
- `k-cond` (consequence) : $u-Ku=g$ admet une solution si et seulement si $\int_0^1g=0$.
- `k-int` (egalite, calcul rational) : $\int_0^1f=0$.
  - valeur attendue : "0"
- `k-part` (consequence) : $Kf=0$, donc $u=f$ est une solution.
- `k-sol` (consequence) : Les solutions sont les fonctions $u_c(x)=1-2x+cx$, $c\in\mathbb R$.
- `k-perp` (egalite, calcul expr-equiv) : L'unique solution orthogonale à $x$ est $u(x)=1-\frac32x$.
  - valeur attendue : "1-3*x/2"
- `fin` (conclusion) : L'équation $u-Ku=f$ est résoluble, ses solutions sont les $u_c$, et la solution orthogonale à $\ker(I-K)$ est calculée.
- `x-N-adj` (egalite, DISTRACTEUR) : $\ker(I-K^*)=\operatorname{Vect}\{x\}$.
- `x-Kstar` (egalite, DISTRACTEUR) : $K^*=K$.

Règles :
- `d-K` + `h-H` ⟹ `k-rang` par « Un opérateur borné de rang fini est compact. »
- `d-K` ⟹ `k-adj` par « $\langle Ku,v\rangle=\langle u,b\rangle\langle a,v\rangle=\langle u,\langle v,a\rangle b\rangle$. »
- `d-K` ⟹ `k-N` par « Si $u=Ku$, $u$ est proportionnelle à $a$ ; et $Ka=\langle a,b\rangle a=a$. »
- `k-adj` ⟹ `k-Nstar` par « Si $v=K^*v$, $v$ est constante ; et $K^*1=\int_0^12x\,dx=1$. »
- `k-rang` + `k-Nstar` + `h-H` ⟹ `k-cond` par « Alternative de Fredholm : $\operatorname{Im}(I-K)=\ker(I-K^*)^\perp$. [fredholm] »
- `d-f` ⟹ `k-int` par « Calcul d’une intégrale de polynôme. »
- `k-int` + `d-K` + `d-f` ⟹ `k-part` par « $Kf=2x\int_0^1f=0$, donc $f-Kf=f$. »
- `k-part` + `k-N` ⟹ `k-sol` par « Les solutions forment le translaté $f+\ker(I-K)$. »
- `k-sol` ⟹ `k-perp` par « $\int_0^1(1-2x+cx)\,x\,dx=\frac c3-\frac16$ s'annule pour une seule valeur de $c$. »
- `k-cond` + `k-int` + `k-sol` + `k-perp` ⟹ `fin` par « Réunion des résultats établis. »

Justifications sans règle (séduisantes ou fausses) : « La compatibilité se lit dans $\ker(I-K)$ : il faut $f\perp x$. »

Pièges :
- `x-N-adj` → incorrect [fredholm-noyau-adjoint] : Le noyau de $I-K^*$ se calcule avec $K^*$, pas avec $K$. — Contre-exemple : $K^*x$ est la constante $\int_0^12y^2\,dy=\frac23$, donc $(I-K^*)x=x-\frac23\neq 0$.
- `x-Kstar` → incorrect [symetrie-autoadjonction] : Le noyau $k(x,y)=2x$ n'est pas symétrique : $K$ n'est pas auto-adjoint. — Contre-exemple : $K1=2x$, alors que $K^*1$ est la constante $\int_0^12x\,dx=1$.
- `k-cond` par « La compatibilité se lit dans $\ker(I-K)$ : il faut $f\perp x$. » → incorrect [fredholm-noyau-adjoint] : La condition de compatibilité porte sur $\ker(I-K^*)=\operatorname{Vect}\{1\}$, non sur $\ker(I-K)$. — Contre-exemple : $f(x)=1-2x$ est un second membre admissible, et $\int_0^1(1-2x)\,x\,dx=-\frac16\neq 0$.

Retraits :
- `k-rang` (nécessaire) : Sans compacité, l’identité des images ne peut plus être invoquée. — Contre-exemple : Sur $\ell^2$, $K=I-T$ avec $Tx=(x_n/n)_{n\ge1}$ : $\ker(I-K^*)=\{0\}$, et pourtant $\operatorname{Im}(I-K)\neq\ell^2$.

Vérification : {"origin":"complement","review":"machine"}