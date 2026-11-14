# 21. Aubin–Lions (`aubin-lions`) — polycopié p. PDF 21, section 5.3

## Fiche

Espaces : $X_0\hookrightarrow\hookrightarrow X\hookrightarrow X_1$ : espaces de Banach, l'injection de $X_0$ dans $X$ étant compacte et celle de $X$ dans $X_1$ continue. | $L^p(0,T;X)$ : espace de Bochner ; $u_n'$ : dérivée au sens des distributions sur $]0,T[$, à valeurs dans $X_1$.

Hypothèses :
- $X_0\hookrightarrow X$ est compacte (compacité spatiale). — Sans elle : $X_0=X=L^2(]0,1[)$, $X_1=H^{-1}(]0,1[)$ : $u_n(t,x)=\sqrt2\sin(n\pi x)$ est bornée dans $L^p(0,T;X_0)$, $u_n'=0$, et $\|u_n-u_m\|_{L^2(0,T;L^2)}^2=2T$ pour $n\neq m$.
- $X\hookrightarrow X_1$ est continue.
- $1<p,q<\infty$. — Sans elle : Pour $p=\infty$ et $q=1$, la compacité dans $L^\infty(0,T;X)$ tombe : $u_n(t)=\min(nt,1)\,v$, $v\in X_0\setminus\{0\}$, est bornée dans $L^\infty(0,T;X_0)$, $\|u_n'\|_{L^1(0,T;X_1)}=\|v\|_{X_1}$, $u_n(t)\to v$ pour tout $t>0$, mais $\|u_n-v\|_{L^\infty(0,T;X)}=\|v\|_X$.
- $\sup_n\big(\|u_n\|_{L^p(0,T;X_0)}+\|u_n'\|_{L^q(0,T;X_1)}\big)<\infty$ : contrôle spatial et contrôle temporel. — Sans elle : Sans borne sur $u_n'$ : $u_n(t,x)=\sin(2\pi nt)\varphi(x)$ sur $]0,1[$ est bornée dans $L^2(0,1;H^1_0)$, tend faiblement vers $0$, et $\|u_n\|_{L^2(0,1;L^2)}^2=\tfrac12\|\varphi\|_{L^2}^2$.

Énoncé : Soient $X_0\hookrightarrow\hookrightarrow X\hookrightarrow X_1$ des espaces de Banach à injections continue et compacte comme indiquées, et $1<p,q<\infty$. Si
$$\sup_n\big(\|u_n\|_{L^p(0,T;X_0)}+\|u_n'\|_{L^q(0,T;X_1)}\big)<\infty,$$
alors $(u_n)$ est relativement compacte dans $L^p(0,T;X)$.

Bilan : {"autre":"Compacité relative dans $L^p(0,T;X)$ : de toute sous-suite on extrait une sous-suite fortement convergente dans $L^p(0,T;X)$."}

Preuve dans le polycopié : idee

Plan :
1. Lemme d'Ehrling : pour tout $\varepsilon>0$, il existe $C_\varepsilon$ tel que $\|v\|_X\le\varepsilon\|v\|_{X_0}+C_\varepsilon\|v\|_{X_1}$ pour $v\in X_0$ (compacité de $X_0\hookrightarrow X$, injectivité de $X\hookrightarrow X_1$).
2. Contrôle des translations en temps : $\|u_n(t+h)-u_n(t)\|_{X_1}\le\int_t^{t+h}\|u_n'\|_{X_1}\le h^{1-1/q}\|u_n'\|_{L^q(0,T;X_1)}$.
3. En combinant les deux, les translations $\|u_n(\cdot+h)-u_n\|_{L^p(0,T-h;X)}$ tendent vers $0$ uniformément en $n$, et les moyennes $\int_{t_1}^{t_2}u_n$ restent dans un compact de $X$.
4. Un critère de compacité de type Fréchet–Kolmogorov dans $L^p(0,T;X)$ conclut.

Vigilance :
- La compacité porte sur $X_0\hookrightarrow X$ ; la compacité de $X\hookrightarrow X_1$ ne suffit pas.
- La convergence forte a lieu dans $L^p(0,T;X)$, ni dans $L^p(0,T;X_0)$, ni en général dans $C([0,T];X)$.
- La compacité spatiale ne contrôle pas les oscillations en temps : la borne sur la dérivée est indispensable.

Vérification : {"origin":"polycopie","review":"machine"}

Définition « Injection compacte » : $X_0\hookrightarrow\hookrightarrow X$ : l'injection de $X_0$ dans $X$ est continue et envoie les bornés de $X_0$ sur des parties relativement compactes de $X$.

Définition « Partie relativement compacte » : Dans un espace métrique, une partie est relativement compacte si son adhérence est compacte, autrement dit si toute suite de la partie admet une sous-suite convergente dans l’espace.

## Contre-exemple `ce-al-sans-temps` : Oscillations en temps
Assertion : Une suite bornée dans $L^2(0,T;H^1_0(\Omega))$ est relativement compacte dans $L^2(0,T;L^2(\Omega))$.
Tâche : $T=1$, $\varphi\in H^1_0(\Omega)$ avec $\|\varphi\|_{L^2}=1$, $u_n(t,x)=\sin(2\pi nt)\varphi(x)$. Calcule $\|u_n-u_m\|_{L^2(0,1;L^2(\Omega))}^2$ pour $n\neq m$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\|u_n-u_m\\|_{L^2(0,1;L^2)}^2$, $n\\neq m$","expected":"1"}
Explication : $\int_0^1(\sin 2\pi nt-\sin 2\pi mt)^2\,dt=\tfrac12+\tfrac12-0=1$ : les termes restent à distance $1$, aucune sous-suite n'est de Cauchy. La suite est bornée dans $L^2(0,1;H^1_0)$, mais $\|u_n'\|_{L^2(0,1;H^{-1})}$ croît comme $n$.

## Contre-exemple `ce-al-sans-espace` : Sans injection compacte
Assertion : Si $(u_n)$ est bornée dans $L^2(0,T;L^2(\Omega))$ et $(u_n')$ bornée dans $L^2(0,T;H^{-1}(\Omega))$, une sous-suite converge fortement dans $L^2(0,T;L^2(\Omega))$.
Tâche : $\Omega=]0,1[$, $u_n(t,x)=\sqrt2\sin(n\pi x)$. Exprime $\|u_n-u_m\|_{L^2(0,T;L^2)}^2$ en fonction de $T$, pour $n\neq m$.
Vérification : {"kind":"expr-equiv","prompt":"Valeur de $\\|u_n-u_m\\|_{L^2(0,T;L^2)}^2$ en fonction de $T$","expected":"2*T","vars":["T"]}
Explication : La famille $(\sqrt2\sin(n\pi x))$ est orthonormée dans $L^2(]0,1[)$ : $\|u_n(t)-u_m(t)\|_{L^2}^2=2$ pour tout $t$, d'où $2T$. La suite est bornée dans $L^2(0,T;L^2)$ et $u_n'=0$, mais aucune sous-suite n'est de Cauchy.

## Contre-exemple `ce-al-cible` : Convergence dans le mauvais espace
Assertion : Sous les hypothèses d'Aubin–Lions, une sous-suite converge fortement dans $L^p(0,T;X_0)$.
Tâche : $\Omega=]0,1[$, $T=1$, $u_n=\tfrac{\sqrt2}{n\pi}\sin(n\pi x)$, indépendante de $t$. Calcule $\|u_n\|_{L^2(0,1;H^1_0)}^2$, où $\|v\|_{H^1_0}=\|v'\|_{L^2}$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\|u_n\\|_{L^2(0,1;H^1_0)}^2$","expected":"1"}
Explication : $u_n\to 0$ dans $L^2(0,1;L^2)$ car $\|u_n\|_{L^2}=\tfrac1{n\pi}$, et $u_n'=0$ ; mais $\|u_n\|_{L^2(0,1;H^1_0)}=1$. Une limite forte dans $L^2(0,1;H^1_0)$ serait nulle, ce qui est impossible.

## Exercice facile `aubin-lions.facile` : Le triplet $H^1_0\hookrightarrow\hookrightarrow L^2\hookrightarrow H^{-1}$

Énoncé : Soit $\Omega\subset\mathbb R^d$ un ouvert borné lipschitzien. Énoncer précisément le triplet $H^1_0(\Omega)\hookrightarrow\hookrightarrow L^2(\Omega)\hookrightarrow H^{-1}(\Omega)$ : démontrer que la première injection est compacte, que l'identification $f\mapsto\big(v\mapsto\int_\Omega fv\big)$ réalise une injection linéaire continue de $L^2(\Omega)$ dans $H^{-1}(\Omega)$, et que la compacité tombe en défaut sur $\mathbb R^d$.
Source : {"doc":"polycopie","pdfPage":42,"label":"Exercice 21, facile ; Rellich, p. PDF 15"} — prérequis : poincare

But : `fin` — usage : application

Nœuds :
- `h-Om` (hypothese) : $\Omega\subset\mathbb R^d$ est un ouvert borné lipschitzien.
- `d-V` (definition) : $V=H^1_0(\Omega)$, normé par $\|v\|_V=\|\nabla v\|_{L^2(\Omega)}$ ; $H=L^2(\Omega)$ ; $V'=H^{-1}(\Omega)$, dual topologique de $V$.
- `d-iota` (definition) : $\iota:H\to V'$ est défini par $\langle\iota f,v\rangle_{V',V}=\int_\Omega fv$.
- `p-poincare` (application-theoreme) : Il existe $C_P$ tel que $\|v\|_{L^2(\Omega)}\le C_P\|v\|_V$ pour tout $v\in V$.
- `c-rellich` (application-theoreme) : L'injection $H^1(\Omega)\hookrightarrow L^2(\Omega)$ est compacte.
- `c-compact` (consequence) : L'injection $V\hookrightarrow H$ est compacte.
- `i-cont` (inegalite) : $\|\iota f\|_{V'}\le C_P\|f\|_{L^2(\Omega)}$ : $\iota$ est linéaire continue.
- `i-inj` (consequence) : $\iota$ est injective : $L^2(\Omega)$ s'identifie à un sous-espace de $H^{-1}(\Omega)$.
- `d-tr` (definition) : Sur $\mathbb R^d$ : $\varphi\in C^\infty_c(\mathbb R^d)\setminus\{0\}$ à support dans $B(0,R/2)$, et $u_n=\varphi(\cdot-nRe_1)$.
- `n-sep` (egalite, calcul rational) : $\|u_n\|_{H^1(\mathbb R^d)}=\|\varphi\|_{H^1(\mathbb R^d)}$ et, pour $n\neq m$, $\|u_n-u_m\|_{L^2}^2=2\|\varphi\|_{L^2}^2$.
  - valeur attendue : "2"
- `n-noncomp` (consequence) : L'injection $H^1(\mathbb R^d)=H^1_0(\mathbb R^d)\hookrightarrow L^2(\mathbb R^d)$ n'est pas compacte.
- `fin` (conclusion) : $H^1_0(\Omega)\hookrightarrow\hookrightarrow L^2(\Omega)\hookrightarrow H^{-1}(\Omega)$ : la première injection est compacte, la seconde, $f\mapsto\iota f$, est linéaire continue et injective ; sur $\mathbb R^d$, la première n'est plus compacte.
- `x-partout` (consequence, DISTRACTEUR) : $H^1_0(\Omega)\hookrightarrow L^2(\Omega)$ est compacte pour tout ouvert $\Omega\subset\mathbb R^d$.
- `x-egal` (consequence, DISTRACTEUR) : $\iota$ est surjective : $H^{-1}(\Omega)=L^2(\Omega)$.
- `x-place` (consequence, DISTRACTEUR) : Dans le lemme d'Aubin–Lions, c'est l'injection $L^2(\Omega)\hookrightarrow H^{-1}(\Omega)$ qui doit être compacte ; la première peut n'être que continue.

Règles :
- `h-Om` + `d-V` ⟹ `p-poincare` par « Inégalité de Poincaré sur l'ouvert borné $\Omega$. [poincare] »
- `h-Om` ⟹ `c-rellich` par « Théorème de Rellich–Kondrachov (ouvert borné lipschitzien). [rellich] »
- `c-rellich` + `p-poincare` ⟹ `c-compact` par « $\|v\|_{H^1}\le(1+C_P^2)^{1/2}\|v\|_V$ : composée d'une injection continue et d'une injection compacte. »
- `d-iota` + `p-poincare` ⟹ `i-cont` par « $\big|\int_\Omega fv\big|\le\|f\|_{L^2}\|v\|_{L^2}\le C_P\|f\|_{L^2}\|v\|_V$. [cauchy-schwarz] »
- `d-iota` + `d-V` ⟹ `i-inj` par « Si $\int_\Omega fv=0$ pour tout $v\in C^\infty_c(\Omega)\subset V$, la densité de $C^\infty_c(\Omega)$ dans $L^2(\Omega)$ donne $f=0$. [densite-cinf] »
- `d-tr` ⟹ `n-sep` par « Invariance des normes par translation ; supports disjoints dès que $n\neq m$. »
- `n-sep` ⟹ `n-noncomp` par « Une suite bornée dont aucune sous-suite n’est de Cauchy contredit la compacité. »
- `c-compact` + `i-cont` + `i-inj` + `n-noncomp` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « Une injection continue entre espaces de Hilbert est compacte. »

Pièges :
- `c-compact` par « Une injection continue entre espaces de Hilbert est compacte. » → incorrect [compact-continue] : Une injection continue envoie les bornés sur des bornés, pas sur des relativement compacts. — Contre-exemple : L'identité de $L^2(\Omega)$ est continue et non compacte : une suite orthonormée n'a aucune sous-suite convergente.
- `x-partout` → incorrect [domaine-borne] : La compacité de Rellich exige un domaine borné : des translations font fuir la masse à l’infini. — Contre-exemple : Sur $\mathbb R^d$, $u_n=\varphi(\cdot-nRe_1)$ est bornée dans $H^1$ et $\|u_n-u_m\|_{L^2}^2=2\|\varphi\|_{L^2}^2$ pour $n\neq m$.
- `x-egal` → incorrect [dual-identification] : $H^{-1}(\Omega)$ contient strictement $L^2(\Omega)$. — Contre-exemple : Sur $\Omega=]0,1[$, $H^1_0\subset C([0,1])$ et $v\mapsto v(1/2)$ appartient à $H^{-1}$ ; si $\int_0^1fv=v(1/2)$ pour toute $v\in C^\infty_c(]0,1[)$, alors $f=0$ hors de $1/2$, donc $f=0$, ce qui est absurde.
- `x-place` → incorrect [aubin-lions-roles] : Dans $X_0\hookrightarrow\hookrightarrow X\hookrightarrow X_1$, c'est l'injection de l'espace de la borne spatiale dans l'espace de convergence qui doit être compacte. — Contre-exemple : $X_0=X=L^2(]0,1[)$, $X_1=H^{-1}(]0,1[)$ : $L^2\hookrightarrow H^{-1}$ est compacte, mais $u_n(t,x)=\sqrt2\sin(n\pi x)$ vérifie $u_n'=0$ et $\|u_n-u_m\|_{L^2(0,T;L^2)}^2=2T$ pour $n\neq m$.

Retraits :
- `h-Om` (nécessaire) : Rellich et Poincaré utilisent la bornitude de Ω ; sans elle, la compacité est perdue. — Contre-exemple : Sur $\mathbb R^d$, les translatés $\varphi(\cdot-nRe_1)$ sont bornés dans $H^1$ et deux à deux à distance $\sqrt2\|\varphi\|_{L^2}$ dans $L^2$.

Calculs fermés : [{"kind":"choice","prompt":"Dans le lemme d'Aubin–Lions $X_0\\hookrightarrow\\hookrightarrow X\\hookrightarrow X_1$, quelle injection doit être compacte ?","options":["$X_0\\hookrightarrow X$","$X\\hookrightarrow X_1$","Les deux","Aucune : la borne sur $u_n'$ suffit"],"correct":[0],"explanation":"La compacité spatiale porte sur $X_0\\hookrightarrow X$ ; l'injection $X\\hookrightarrow X_1$ n'a besoin que d'être continue."}]

Solution :
**Compacité.** Par Poincaré, $\|v\|_{L^2}\le C_P\|\nabla v\|_{L^2}$ sur $V=H^1_0(\Omega)$, donc $\|v\|_{H^1}\le(1+C_P^2)^{1/2}\|v\|_V$ : l'injection $V\hookrightarrow H^1(\Omega)$ est continue. Rellich donne $H^1(\Omega)\hookrightarrow\hookrightarrow L^2(\Omega)$ ; la composée $V\hookrightarrow L^2(\Omega)$ est compacte.

**Identification de $L^2$ dans $H^{-1}$.** Pour $f\in L^2(\Omega)$, $\iota f:v\mapsto\int_\Omega fv$ vérifie $|\langle\iota f,v\rangle|\le\|f\|_{L^2}\|v\|_{L^2}\le C_P\|f\|_{L^2}\|v\|_V$ : $\iota f\in H^{-1}(\Omega)$ et $\|\iota f\|_{H^{-1}}\le C_P\|f\|_{L^2}$. Si $\iota f=0$, alors $\int_\Omega fv=0$ pour toute $v\in C^\infty_c(\Omega)$, dense dans $L^2(\Omega)$, donc $f=0$.

**Rôle de la bornitude.** Sur $\mathbb R^d$, $u_n=\varphi(\cdot-nRe_1)$ est bornée dans $H^1$, et les supports étant disjoints pour $n\neq m$, $\|u_n-u_m\|_{L^2}^2=2\|\varphi\|_{L^2}^2$ : aucune sous-suite n'est de Cauchy.

**Ce que retient Aubin–Lions.** Seule l'injection $H^1_0\hookrightarrow L^2$ doit être compacte ; $L^2\hookrightarrow H^{-1}$ ne sert que comme injection continue, pour donner un sens à la borne sur $u_n'$. Elle n'est pas surjective : la distribution de Dirac en $1/2$ appartient à $H^{-1}(]0,1[)$ sans être une fonction de $L^2$.

Indices :
1. Quelles sont les trois normes en jeu, et laquelle des deux injections est compacte ?
2. Pour la compacité, combine Poincaré et Rellich ; pour l'injection $L^2\hookrightarrow H^{-1}$, écris $\langle\iota f,v\rangle=\int_\Omega fv$ et majore.
3. Sur $\mathbb R^d$, translate une même fonction à support compact : la norme $H^1$ ne change pas, la distance $L^2$ entre deux translatés reste fixe.

Erreurs fréquentes :
- Placer la compacité sur la mauvaise injection du triplet.
- Oublier que la compacité de Rellich exige un domaine borné.
- Identifier $H^{-1}$ à $L^2$.

Variante : Soit $\Omega$ borné lipschitzien. Énoncer le triplet $H^1(\Omega)\hookrightarrow\hookrightarrow L^2(\Omega)\hookrightarrow(H^1(\Omega))'$ utilisé pour la condition de Neumann, et montrer que $(H^1(\Omega))'$ ne s'identifie pas à $H^{-1}(\Omega)$.

Solution de la variante : Rellich donne la compacité de $H^1(\Omega)\hookrightarrow L^2(\Omega)$. Pour $f\in L^2$, $v\mapsto\int_\Omega fv$ est continue sur $H^1(\Omega)$, de norme au plus $\|f\|_{L^2}$, et l'application est injective car $H^1(\Omega)$ est dense dans $L^2(\Omega)$. La forme $v\mapsto\int_{\partial\Omega}\gamma v$, où $\gamma$ est la trace, appartient à $(H^1(\Omega))'$ et s'annule sur $H^1_0(\Omega)$ sans être nulle : la restriction de $(H^1)'$ à $H^1_0$ n'est pas injective, donc $(H^1(\Omega))'$ et $H^{-1}(\Omega)$ sont des espaces différents.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `aubin-lions.intermediaire` : Deux bornes uniformes, une convergence forte

Énoncé : Soient $\Omega\subset\mathbb R^d$ un ouvert borné lipschitzien, $T>0$ et $(u_n)\subset L^2(0,T;H^1_0(\Omega))$ avec $u_n'\in L^2(0,T;H^{-1}(\Omega))$, telles que $\|u_n\|_{L^2(0,T;H^1_0(\Omega))}\le C_1$ et $\|u_n'\|_{L^2(0,T;H^{-1}(\Omega))}\le C_2$ pour tout $n$. Déduire qu'une sous-suite converge fortement dans $L^2(0,T;L^2(\Omega))$ vers un $u$, qui est aussi sa limite faible dans $L^2(0,T;H^1_0(\Omega))$, en distinguant compacité spatiale, contrôle temporel et convergence obtenue.
Source : {"doc":"polycopie","pdfPage":42,"label":"Exercice 21, intermédiaire ; schéma de la section 5.3 (p. PDF 21) et section 8.4 (p. PDF 32)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-Om` (hypothese) : $\Omega\subset\mathbb R^d$ est un ouvert borné lipschitzien et $T>0$.
- `h-sp` (hypothese) : Contrôle spatial : $\|u_n\|_{L^2(0,T;H^1_0(\Omega))}\le C_1$ pour tout $n$.
- `h-tp` (hypothese) : Contrôle temporel : $\|u_n'\|_{L^2(0,T;H^{-1}(\Omega))}\le C_2$ pour tout $n$.
- `c-spatial` (application-theoreme) : Compacité spatiale : l'injection $H^1_0(\Omega)\hookrightarrow L^2(\Omega)$ est compacte.
- `c-cont` (consequence) : L'injection $L^2(\Omega)\hookrightarrow H^{-1}(\Omega)$ est continue.
- `c-expo` (egalite, calcul rational-vector) : Avec $X_0=H^1_0(\Omega)$, $X=L^2(\Omega)$, $X_1=H^{-1}(\Omega)$ : $p=q=2$, et $1<p,q<\infty$.
  - valeur attendue : ["2","2"]
- `al` (application-theoreme) : $(u_n)$ est relativement compacte dans $L^2(0,T;L^2(\Omega))$.
- `sub` (consequence) : Il existe une sous-suite $(u_{n_k})$ et $u\in L^2(0,T;L^2(\Omega))$ avec $u_{n_k}\to u$ fortement dans $L^2(0,T;L^2(\Omega))$.
- `weak` (application-theoreme) : Quitte à extraire encore, $u_{n_k}\rightharpoonup\tilde u$ faiblement dans $L^2(0,T;H^1_0(\Omega))$.
- `ident` (egalite) : $\tilde u=u$ : la limite forte dans $L^2(0,T;L^2)$ est la limite faible dans $L^2(0,T;H^1_0)$.
- `fin` (conclusion) : Une sous-suite vérifie $u_{n_k}\to u$ fortement dans $L^2(0,T;L^2(\Omega))$ et $u_{n_k}\rightharpoonup u$ faiblement dans $L^2(0,T;H^1_0(\Omega))$.
- `x-sans-temps` (consequence, DISTRACTEUR) : Le contrôle spatial seul, $\|u_n\|_{L^2(0,T;H^1_0)}\le C_1$, suffit à extraire une sous-suite fortement convergente dans $L^2(0,T;L^2)$.
- `x-cv-V` (consequence, DISTRACTEUR) : Une sous-suite converge fortement dans $L^2(0,T;H^1_0(\Omega))$.
- `x-C` (consequence, DISTRACTEUR) : Une sous-suite converge fortement dans $C([0,T];L^2(\Omega))$.

Règles :
- `h-Om` ⟹ `c-spatial` par « Théorème de Rellich–Kondrachov, puis Poincaré pour la norme du gradient. [rellich] »
- `h-Om` ⟹ `c-cont` par « $\big|\int_\Omega fv\big|\le\|f\|_{L^2}\|v\|_{L^2}\le C_P\|f\|_{L^2}\|v\|_{H^1_0}$. »
- `h-sp` + `h-tp` ⟹ `c-expo` par « Lecture des espaces de Bochner dans les deux bornes. »
- `c-spatial` + `c-cont` + `c-expo` + `h-sp` + `h-tp` ⟹ `al` par « Lemme d'Aubin–Lions : compacité de $X_0\hookrightarrow X$, continuité de $X\hookrightarrow X_1$, bornes dans $L^p(0,T;X_0)$ et sur $u_n'$ dans $L^q(0,T;X_1)$. [aubin-lions] »
- `al` ⟹ `sub` par « Définition de la compacité relative dans un espace métrique : toute suite admet une sous-suite convergente. »
- `sub` + `h-sp` ⟹ `weak` par « $L^2(0,T;H^1_0(\Omega))$ est un espace de Hilbert : extraction faible en espace réflexif. [extraction-reflexive] »
- `sub` + `weak` ⟹ `ident` par « L'injection continue $L^2(0,T;H^1_0)\hookrightarrow L^2(0,T;L^2)$ transporte la convergence faible ; la convergence forte entraîne la faible ; une limite faible est unique. »
- `sub` + `weak` + `ident` ⟹ `fin` par « Réunion des deux convergences de la même sous-suite. »

Justifications sans règle (séduisantes ou fausses) : « Rellich, appliqué à chaque instant $t$, donne la compacité dans $L^2(0,T;L^2(\Omega))$. » ; « La borne sur $u_n'$ fournit la compacité en espace. »

Pièges :
- `al` par « Rellich, appliqué à chaque instant $t$, donne la compacité dans $L^2(0,T;L^2(\Omega))$. » → incorrect [temps-compacite] : La compacité à chaque instant ne contrôle pas les oscillations en temps : c’est le rôle de la borne sur la dérivée. — Contre-exemple : $T=1$, $\varphi\in H^1_0(\Omega)$ avec $\|\varphi\|_{L^2}=1$, $u_n(t,x)=\sin(2\pi nt)\varphi(x)$ : bornée dans $L^2(0,1;H^1_0)$, $u_n\rightharpoonup 0$, mais $\|u_n\|_{L^2(0,1;L^2)}^2=\tfrac12$ ; ici $\|u_n'\|_{L^2(0,1;H^{-1})}\to\infty$.
- `c-spatial` par « La borne sur $u_n'$ fournit la compacité en espace. » → incorrect [aubin-lions-roles] : La borne sur la dérivée temporelle contrôle les translations en temps ; la compacité en espace vient de l’injection compacte.
- `x-sans-temps` → incorrect [temps-compacite] : Sans contrôle temporel, la suite peut osciller en temps. — Contre-exemple : $u_n(t,x)=\sin(2\pi nt)\varphi(x)$ sur $]0,1[$ : si une sous-suite convergeait fortement, sa limite serait la limite faible $0$, alors que $\|u_n\|_{L^2(0,1;L^2)}^2=\tfrac12\|\varphi\|_{L^2}^2$.
- `x-cv-V` → incorrect [aubin-lions-espace-cible] : La convergence forte a lieu dans $L^p(0,T;X)$, pas dans $L^p(0,T;X_0)$. — Contre-exemple : $\Omega=]0,1[$, $u_n=\tfrac{\sqrt2}{n\pi}\sin(n\pi x)$, indépendante de $t$ : $\|u_n\|_{H^1_0}=1$, $u_n'=0$, $u_n\to 0$ dans $L^2(0,T;L^2)$, mais $\|u_n\|_{L^2(0,T;H^1_0)}^2=T$.
- `x-C` → incorrect [aubin-lions-espace-cible] : Avec ces exposants, le lemme ne donne pas la compacité dans $C([0,T];L^2)$. — Contre-exemple : $\Omega=]0,1[$, $\varphi_n=\sqrt2\sin(n\pi x)$, $\lambda_n=(n\pi)^2$, $u_n(t)=e^{-\lambda_nt}\varphi_n$ : les deux bornes valent au plus $\tfrac12$ au carré, $u_n\to 0$ dans $L^2(0,T;L^2)$, mais $\|u_n(0)\|_{L^2}=1$.

Retraits :
- `h-tp` (nécessaire) : Sans borne sur la dérivée temporelle, les oscillations en temps empêchent toute convergence forte. — Contre-exemple : $u_n(t,x)=\sin(2\pi nt)\varphi(x)$ sur $]0,1[$, $\|\varphi\|_{L^2}=1$ : $\|u_n-u_m\|_{L^2(0,1;L^2)}^2=1$ pour $n\neq m$.
- `h-sp` (nécessaire) : Sans borne dans l’espace compactement injecté, rien n’empêche les oscillations en espace. — Contre-exemple : $\Omega=]0,1[$, $u_n(t,x)=\sqrt2\sin(n\pi x)$ : $u_n'=0$, bornée dans $L^2(0,T;L^2)$, et $\|u_n-u_m\|_{L^2(0,T;L^2)}^2=2T$ pour $n\neq m$.
- `h-Om` (nécessaire) : L'injection $H^1_0\hookrightarrow L^2$ n'est plus compacte. — Contre-exemple : Sur $\mathbb R^d$, $u_n(t,x)=\varphi(x-nRe_1)$ : $u_n'=0$, bornée dans $L^2(0,T;H^1)$, et $\|u_n-u_m\|_{L^2(0,T;L^2)}^2=2T\|\varphi\|_{L^2}^2$.

Calculs fermés : [{"kind":"rational","prompt":"Pour $\\|\\varphi\\|_{L^2}=1$ et $n\\ge 1$, valeur de $\\|\\sin(2\\pi n\\cdot)\\varphi\\|_{L^2(0,1;L^2(\\Omega))}^2$","expected":"1/2"}]

Solution :
**Les trois ingrédients.** Compacité spatiale : $H^1_0(\Omega)\hookrightarrow L^2(\Omega)$ est compacte (Rellich, Ω borné lipschitzien). Continuité : $L^2(\Omega)\hookrightarrow H^{-1}(\Omega)$, avec $\|f\|_{H^{-1}}\le C_P\|f\|_{L^2}$. Contrôle temporel : la borne de $u_n'$ dans $L^2(0,T;H^{-1})$. Les exposants sont $p=q=2$.

**Application du lemme.** Avec $X_0=H^1_0$, $X=L^2$, $X_1=H^{-1}$, le lemme d'Aubin–Lions donne la compacité relative de $(u_n)$ dans $L^2(0,T;L^2(\Omega))$ : une sous-suite converge fortement vers $u$.

**Identification.** $L^2(0,T;H^1_0)$ étant un espace de Hilbert, on extrait encore : $u_{n_k}\rightharpoonup\tilde u$ dans $L^2(0,T;H^1_0)$. L'injection continue dans $L^2(0,T;L^2)$ transporte cette convergence faible ; la convergence forte vers $u$ entraîne aussi la convergence faible ; par unicité de la limite faible, $\tilde u=u$.

**Ce que le lemme ne donne pas.** La convergence forte n'a lieu ni dans $L^2(0,T;H^1_0)$ (exemple $\tfrac{\sqrt2}{n\pi}\sin(n\pi x)$), ni dans $C([0,T];L^2)$ (exemple $e^{-\lambda_nt}\varphi_n$). Chacune des deux bornes est nécessaire : $\sin(2\pi nt)\varphi(x)$ réfute la seule borne spatiale, $\sqrt2\sin(n\pi x)$ la seule borne en $L^2$.

Indices :
1. Quel espace joue le rôle de $X_0$, de $X$, de $X_1$ ? Laquelle des bornes est spatiale, laquelle est temporelle ?
2. Vérifie chaque hypothèse du lemme, y compris les exposants, avant de l'appliquer ; puis identifie la limite forte avec une limite faible.
3. Pour identifier les limites : une injection linéaire continue transporte la convergence faible, et la limite faible est unique.

Erreurs fréquentes :
- Croire que la compacité spatiale suffit, sans contrôle en temps.
- Annoncer une convergence forte dans $L^2(0,T;H^1_0)$ ou dans $C([0,T];L^2)$.
- Attribuer la compacité spatiale à la borne sur la dérivée.

Variante : Avec $\Omega$ borné lipschitzien, on suppose $\|u_n\|_{L^4(0,T;H^1_0(\Omega))}\le C_1$ et $\|u_n'\|_{L^2(0,T;H^{-1}(\Omega))}\le C_2$. Dans quel espace obtient-on la compacité relative de $(u_n)$ ?

Solution de la variante : Le triplet est inchangé, avec $p=4$ et $q=2$, tous deux dans $]1,\infty[$. Aubin–Lions donne la compacité relative dans $L^p(0,T;X)=L^4(0,T;L^2(\Omega))$ : l'exposant en temps de la conclusion est celui de la borne spatiale, non celui de la borne sur $u_n'$. A fortiori, la compacité vaut dans $L^2(0,T;L^2(\Omega))$, puisque $L^4(0,T)\subset L^2(0,T)$ continûment sur un intervalle borné.

Graphe de la variante :
But : `fin` — usage : application

Nœuds :
- `h-Om` (hypothese) : $\Omega\subset\mathbb R^d$ est un ouvert borné lipschitzien et $T>0$.
- `h-b4` (hypothese) : $\|u_n\|_{L^4(0,T;H^1_0(\Omega))}\le C_1$ pour tout $n$.
- `h-b2` (hypothese) : $\|u_n'\|_{L^2(0,T;H^{-1}(\Omega))}\le C_2$ pour tout $n$.
- `c-spatial` (application-theoreme) : $H^1_0(\Omega)\hookrightarrow L^2(\Omega)$ est compacte.
- `c-cont` (consequence) : $L^2(\Omega)\hookrightarrow H^{-1}(\Omega)$ est continue.
- `c-expo` (egalite, calcul rational-vector) : $p=4$ et $q=2$, avec $1<p,q<\infty$.
  - valeur attendue : ["4","2"]
- `fin` (conclusion) : $(u_n)$ est relativement compacte dans $L^4(0,T;L^2(\Omega))$.
- `x-Lq` (consequence, DISTRACTEUR) : La conclusion ne peut pas dépasser l'exposant $q=2$ : on n'obtient la compacité que dans $L^2(0,T;L^2(\Omega))$.

Règles :
- `h-Om` ⟹ `c-spatial` par « Rellich–Kondrachov, puis Poincaré. [rellich] »
- `h-Om` ⟹ `c-cont` par « Cauchy–Schwarz et Poincaré : $\|f\|_{H^{-1}}\le C_P\|f\|_{L^2}$. »
- `h-b4` + `h-b2` ⟹ `c-expo` par « Lecture des exposants dans les deux bornes. »
- `c-spatial` + `c-cont` + `c-expo` + `h-b4` + `h-b2` ⟹ `fin` par « Lemme d’Aubin–Lions. [aubin-lions] »

Pièges :
- `x-Lq` → incorrect [aubin-lions-espace-cible] : L'énoncé donne la compacité relative dans $L^p(0,T;X)$, où $p$ est l'exposant de la borne dans $L^p(0,T;X_0)$ : ici $p=4$.

Retraits :
- `h-b2` (nécessaire) : Sans borne sur la dérivée, les oscillations en temps subsistent. — Contre-exemple : $u_n(t,x)=\sin(2\pi nt)\varphi(x)$ sur $]0,1[$ : bornée dans $L^4(0,1;H^1_0)$, $u_n\rightharpoonup 0$, et $\|u_n\|_{L^2(0,1;L^2)}^2=\tfrac12\|\varphi\|_{L^2}^2$.

Vérification : {"origin":"polycopie","review":"machine"}

## Exercice difficile `aubin-lions.difficile` : Passage à la limite dans $g(u_n)$, $g$ lipschitzienne

Énoncé : Soient $\Omega\subset\mathbb R^d$ borné lipschitzien, $T>0$, $V=H^1_0(\Omega)$, $H=L^2(\Omega)$, $V'=H^{-1}(\Omega)$, $f\in L^2(0,T;V')$ et $g:\mathbb R\to\mathbb R$ globalement lipschitzienne de constante $L$. Soit $(u_n)$ bornée dans $L^2(0,T;V)$, avec $(u_n')$ bornée dans $L^2(0,T;V')$, telle que pour tout $n$, tout $v\in V$ et presque tout $t$ : $\langle u_n'(t),v\rangle_{V',V}+\int_\Omega\nabla u_n(t)\cdot\nabla v+\int_\Omega g(u_n(t))v=\langle f(t),v\rangle_{V',V}$. Montrer qu'à extraction près $u_n\to u$ fortement dans $L^2(0,T;H)$, $g(u_n)\to g(u)$ fortement dans $L^2(0,T;H)$, et que $u$ vérifie la même formulation faible.
Source : {"doc":"polycopie","pdfPage":42,"label":"Exercice 21, difficile ; section 8.7 (p. PDF 33)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-cadre` (hypothese) : $\Omega\subset\mathbb R^d$ est borné lipschitzien, $T>0$, $V=H^1_0(\Omega)\hookrightarrow\hookrightarrow H=L^2(\Omega)\hookrightarrow V'=H^{-1}(\Omega)$, et $f\in L^2(0,T;V')$.
- `h-g` (hypothese) : $g:\mathbb R\to\mathbb R$ est globalement lipschitzienne : $|g(r)-g(s)|\le L|r-s|$ pour tous $r,s$.
- `h-bornes` (hypothese) : $\sup_n\big(\|u_n\|_{L^2(0,T;V)}+\|u_n'\|_{L^2(0,T;V')}\big)<\infty$.
- `h-eq` (hypothese) : Pour tout $n$, tout $v\in V$ et presque tout $t$ : $\langle u_n'(t),v\rangle_{V',V}+\int_\Omega\nabla u_n(t)\cdot\nabla v+\int_\Omega g(u_n(t))v=\langle f(t),v\rangle_{V',V}$.
- `a-weak` (application-theoreme) : Quitte à extraire : $u_n\rightharpoonup u$ dans $L^2(0,T;V)$ et $u_n'\rightharpoonup\zeta$ dans $L^2(0,T;V')$.
- `a-deriv` (egalite) : $\zeta=u'$ au sens des distributions sur $]0,T[$ à valeurs dans $V'$.
- `a-strong` (application-theoreme) : Quitte à extraire encore : $u_n\to u$ fortement dans $L^2(0,T;H)$.
- `g-cv` (inegalite) : $\|g(u_n)-g(u)\|_{L^2(0,T;H)}\le L\|u_n-u\|_{L^2(0,T;H)}\to 0$.
- `l-lim` (egalite) : Pour $v\in V$ et $\eta\in C^\infty_c(]0,T[)$ : $\int_0^T\eta\Big[\langle u',v\rangle_{V',V}+\int_\Omega\nabla u\cdot\nabla v+\int_\Omega g(u)v-\langle f,v\rangle_{V',V}\Big]dt=0$.
- `fin` (conclusion) : $u\in L^2(0,T;V)$, $u'\in L^2(0,T;V')$, et pour tout $v\in V$ et presque tout $t$ : $\langle u'(t),v\rangle_{V',V}+\int_\Omega\nabla u(t)\cdot\nabla v+\int_\Omega g(u(t))v=\langle f(t),v\rangle_{V',V}$.
- `x-faible` (consequence, DISTRACTEUR) : La seule convergence faible de $u_n$ dans $L^2(0,T;V)$ donne $g(u_n)\rightharpoonup g(u)$.
- `x-grad` (consequence, DISTRACTEUR) : $\nabla u_n\to\nabla u$ fortement dans $L^2(0,T;L^2(\Omega)^d)$.

Règles :
- `h-bornes` + `h-cadre` ⟹ `a-weak` par « $L^2(0,T;V)$ et $L^2(0,T;V')$ sont des espaces de Hilbert : extraction faible des deux suites bornées. [extraction-reflexive] »
- `a-weak` ⟹ `a-deriv` par « $\int_0^T\langle u_n',v\rangle\eta=-\int_0^T(u_n,v)_H\eta'$ pour $v\in V$, $\eta\in C^\infty_c(]0,T[)$ ; les deux membres passent à la limite faible. »
- `h-bornes` + `h-cadre` + `a-weak` ⟹ `a-strong` par « Lemme d'Aubin–Lions avec $X_0=V$, $X=H$, $X_1=V'$, $p=q=2$ ; la limite forte coïncide avec la limite faible. [aubin-lions] »
- `h-g` + `a-strong` ⟹ `g-cv` par « Ponctuellement $|g(u_n)-g(u)|\le L|u_n-u|$ ; on élève au carré et on intègre sur $]0,T[\times\Omega$. »
- `h-eq` + `a-weak` + `a-deriv` + `g-cv` ⟹ `l-lim` par « Terme en $u_n'$ : convergence faible dans $L^2(0,T;V')$ testée par $\eta v\in L^2(0,T;V)$ ; terme en gradient : convergence faible dans $L^2(0,T;V)$ ; terme non linéaire : convergence forte de $g(u_n)$. »
- `l-lim` + `a-deriv` ⟹ `fin` par « Une fonction de $L^1(0,T)$ d'intégrale nulle contre toute $\eta\in C^\infty_c(]0,T[)$ est nulle presque partout. »

Justifications sans règle (séduisantes ou fausses) : « $g$ est continue : la convergence faible de $u_n$ suffit pour passer à la limite dans $g(u_n)$. »

Pièges :
- `g-cv` par « $g$ est continue : la convergence faible de $u_n$ suffit pour passer à la limite dans $g(u_n)$. » → incorrect [nonlinearite-limite-faible] : La continuité de g ne permet pas de passer à la limite faible : c’est la convergence forte fournie par Aubin–Lions qui sert. — Contre-exemple : $g(s)=|s|$, $T=1$, $u_n=\sin(2\pi nt)\varphi(x)$ : $u_n\rightharpoonup 0$ mais $|u_n|\rightharpoonup\tfrac2\pi|\varphi|\neq 0=g(0)$.
- `x-faible` → incorrect [nonlinearite-limite-faible] : Les oscillations en temps survivent à la limite faible et sont rectifiées par la non-linéarité. — Contre-exemple : $g(s)=|s|$, lipschitzienne : pour $u_n=\sin(2\pi nt)\varphi(x)$ sur $]0,1[$, $g(u_n)\rightharpoonup\tfrac2\pi|\varphi|$, tandis que $g(0)=0$.
- `x-grad` → incorrect [faible-fort] : Aubin–Lions donne la convergence forte dans $L^2(0,T;H)$, pas celle des gradients ; une non-linéarité en gradient demande d'autres arguments (Minty). — Contre-exemple : $\Omega=]0,1[$, $f=0$, $g=0$, $\lambda_n=(n\pi)^2$ et $u_n(t)=e^{-\lambda_nt}\sqrt2\sin(n\pi x)$ : chaque $u_n$ vérifie l'équation, $(u_n)$ et $(u_n')$ sont bornées dans $L^2(0,T;V)$ et $L^2(0,T;V')$, $u_n\to 0$ dans $L^2(0,T;H)$, mais $\|\partial_xu_n\|_{L^2(0,T;L^2)}^2=\tfrac12\big(1-e^{-2\lambda_nT}\big)\to\tfrac12$.

Retraits :
- `h-g` (nécessaire) : L'inégalité $\|g(u_n)-g(u)\|\le L\|u_n-u\|$ disparaît : la convergence forte dans $L^2$ ne passe plus à travers $g$. — Contre-exemple : $g(s)=s^2$ et $w_n=n\,\mathbb 1_{E_n}$ avec $E_n\subset]0,T[\times\Omega$, $|E_n|=n^{-3}$ : $\|w_n\|_{L^2}^2=1/n\to 0$ mais $\|g(w_n)\|_{L^2}^2=n\to+\infty$.
- `a-strong` (nécessaire) : Avec la seule convergence faible, le terme non linéaire ne passe pas à la limite. — Contre-exemple : $g(s)=|s|$, $u_n=\sin(2\pi nt)\varphi(x)$ sur $]0,1[$ : $u_n\rightharpoonup 0$ et $g(u_n)\rightharpoonup\tfrac2\pi|\varphi|\neq g(0)$.

Calculs fermés : [{"kind":"rational","prompt":"Pour $g(r)=\\tanh r$ (exemple de la section 8.7), meilleure constante de Lipschitz $L$","expected":"1"}]

Solution :
**Extractions faibles.** $L^2(0,T;V)$ et $L^2(0,T;V')$ étant des espaces de Hilbert, on extrait $u_n\rightharpoonup u$ et $u_n'\rightharpoonup\zeta$. Pour $v\in V$ et $\eta\in C^\infty_c(]0,T[)$, $\int_0^T\langle u_n',v\rangle\eta=-\int_0^T(u_n,v)_H\eta'$ passe à la limite, donc $\zeta=u'$.

**Convergence forte.** Compacité spatiale : $V\hookrightarrow\hookrightarrow H$ (Rellich). Contrôle temporel : la borne de $u_n'$ dans $L^2(0,T;V')$. Aubin–Lions, avec $p=q=2$, donne une sous-suite fortement convergente dans $L^2(0,T;H)$, dont la limite est $u$ par unicité de la limite faible.

**Terme non linéaire.** Ponctuellement $|g(u_n)-g(u)|\le L|u_n-u|$, d'où $\|g(u_n)-g(u)\|_{L^2(0,T;H)}\le L\|u_n-u\|_{L^2(0,T;H)}\to 0$. Comme $|g(s)|\le|g(0)|+L|s|$ et $\Omega$ est borné, $g(u_n)$ et $g(u)$ appartiennent bien à $L^2(0,T;H)$.

**Équation limite.** On multiplie l'équation par $\eta\in C^\infty_c(]0,T[)$ et on intègre en temps. Le terme en $u_n'$ passe à la limite par convergence faible dans $L^2(0,T;V')$, testée contre $\eta v\in L^2(0,T;V)$ ; le terme en gradient par convergence faible dans $L^2(0,T;V)$ ; le terme non linéaire par convergence forte de $g(u_n)$. L'intégrande limite, fonction de $L^1(0,T)$ orthogonale à toute $\eta$, est nulle presque partout : $u$ vérifie la formulation faible pour tout $v\in V$ et presque tout $t$.

**Vigilance.** La convergence faible seule ne suffit pas ($g(s)=|s|$ et oscillations en temps) ; la convergence forte n'est pas celle des gradients.

Indices :
1. Quels termes de la formulation sont linéaires en la suite, et lequel ne l’est pas ?
2. Les termes linéaires passent à la limite faible ; pour $g(u_n)$, il faut une convergence forte : vérifie les deux contrôles d'Aubin–Lions.
3. Ponctuellement $|g(u_n)-g(u)|\le L|u_n-u|$ ; intègre le carré sur $]0,T[\times\Omega$.

Erreurs fréquentes :
- Passer à la limite dans $g(u_n)$ avec une simple convergence faible.
- Croire que la convergence forte de la suite entraîne celle des gradients.
- Omettre la borne sur la dérivée temporelle dans l’application d’Aubin–Lions.

Variante : Reprendre l'exercice lorsque $(u_n')$ n'est bornée que dans $L^{4/3}(0,T;V')$.

Solution de la variante : Aubin–Lions s'applique avec $p=2$ et $q=4/3$, tous deux dans $]1,\infty[$ : la compacité relative a lieu dans $L^2(0,T;H)$, et le terme non linéaire passe à la limite comme avant. L'espace $L^{4/3}(0,T;V')$ est réflexif, de dual $L^4(0,T;V)$ : on extrait $u_n'\rightharpoonup\zeta$, et les tests $\eta v$, $\eta\in C^\infty_c(]0,T[)$, appartiennent à $L^4(0,T;V)$, ce qui identifie $\zeta=u'$ et fait passer à la limite le terme en $u_n'$. On obtient $u'\in L^{4/3}(0,T;V')$ et la même formulation faible.

Vérification : {"origin":"polycopie","review":"machine","notes":"Section 8.7 du polycopié, sans l’hypothèse de monotonie de g, inutile pour le passage à la limite."}