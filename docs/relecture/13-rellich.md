# 13. Rellich–Kondrachov (`rellich`) — polycopié p. PDF 15, section 3.7

## Fiche

Espaces : $\Omega\subset\mathbb R^d$ : ouvert borné lipschitzien. | $H^1(\Omega)$ muni de sa norme, et $L^2(\Omega)$ muni de la sienne (topologies fortes).

Hypothèses :
- $\Omega$ est borné. — Sans elle : Sur $\mathbb R^d$, les translatées $\varphi(x-2n\rho e_1)$ d'une fonction test non nulle, de support contenu dans $B(0,\rho)$, sont bornées dans $H^1$ et vérifient $\|u_n-u_m\|_{L^2}^2=2\|\varphi\|_{L^2}^2$ : aucune sous-suite ne converge.
- $\Omega$ est lipschitzien.

Énoncé : Si $\Omega$ est borné lipschitzien, l'injection
$$H^1(\Omega)\hookrightarrow\hookrightarrow L^2(\Omega)$$
est compacte : toute suite bornée en $H^1$ possède une sous-suite fortement convergente dans $L^2$.

Bilan : {"autre":"Compacité de l'injection : extraction d'une sous-suite convergeant fortement dans $L^2(\\Omega)$. Aucune convergence forte dans $H^1(\\Omega)$ n'est affirmée."}

Preuve dans le polycopié : idee

Plan :
1. Prolonger les fonctions de $H^1(\Omega)$ à $\mathbb R^d$ (le bord lipschitzien le permet).
2. Contrôler les translations par les gradients : $\|\tau_hv-v\|_{L^2}\le|h|\,\|\nabla v\|_{L^2}$.
3. Conclure par un critère de compacité de type Fréchet–Kolmogorov.

Vigilance :
- Sur un ouvert non borné, l'injection $H^1\hookrightarrow L^2$ peut n'être que continue : c'est le cas sur $\mathbb R^d$.
- La compacité donne une sous-suite convergente dans $L^2$, pas dans $H^1$ : $\sin(n\pi x)/(n\pi)$ tend vers $0$ dans $L^2(]0,1[)$, sans converger dans $H^1$.
- Une suite bornée en dimension infinie n’a pas, en général, de sous-suite fortement convergente : la compacité est une propriété de l’injection.

Vérification : {"origin":"polycopie","review":"machine","notes":"Énoncé du polycopié ; la démonstration n’y figure qu’en idée."}

Définition « Injection compacte » : Une injection continue $X\hookrightarrow Y$ entre espaces de Banach est compacte si toute suite bornée de $X$ admet une sous-suite convergente dans $Y$, c'est-à-dire si l'image de la boule unité de $X$ est relativement compacte dans $Y$.

## Contre-exemple `ce-rellich-translations` : Translations sur la droite
Assertion : L'injection $H^1(\mathbb R)\hookrightarrow L^2(\mathbb R)$ est compacte.
Tâche : Avec $\varphi(x)=(1-|x|)^+\in H^1(\mathbb R)$ et $u_n(x)=\varphi(x-2n)$, calcule $\|u_n-u_m\|_{L^2}^2$ pour $n\neq m$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\|u_n-u_m\\|_{L^2}^2$","expected":"4/3"}
Explication : Les supports $[2n-1,2n+1]$ se rencontrent au plus en un point, donc $\|u_n-u_m\|_{L^2}^2=2\|\varphi\|_{L^2}^2=2\cdot\tfrac23=\tfrac43$. La suite est bornée dans $H^1(\mathbb R)$ et n'a aucune sous-suite convergente dans $L^2(\mathbb R)$.

## Contre-exemple `ce-rellich-H1-fort` : Pas de convergence forte dans $H^1$
Assertion : Toute suite bornée de $H^1_0(]0,1[)$ admet une sous-suite convergente dans $H^1_0(]0,1[)$.
Tâche : Pour $u_n(x)=\sin(n\pi x)/(n\pi)$, calcule $\|u_n'-u_m'\|_{L^2(]0,1[)}^2$ pour $n\ne m$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\|u_n'-u_m'\\|_{L^2}^2$","expected":"1"}
Explication : $u_n'(x)=\cos(n\pi x)$, et les $\cos(n\pi x)$ sont orthogonaux de norme $1/\sqrt2$ : $\|u_n'-u_m'\|^2=\tfrac12+\tfrac12=1$. Aucune sous-suite n'est de Cauchy dans $H^1$, alors que $\|u_n\|_{L^2}\to 0$.

## Exercice facile `rellich.facile` : Injection continue et injection compacte

Énoncé : Soient $X\subset Y$ deux espaces de Banach et $J:X\to Y$, $Jx=x$, l'injection canonique. On dit que $J$ est continue s'il existe $C>0$ tel que $\|x\|_Y\le C\|x\|_X$ pour tout $x\in X$, et compacte si toute suite bornée de $X$ admet une sous-suite convergente dans $Y$. Montrer que toute injection compacte est continue, puis que la réciproque est fausse, à l'aide de $X=Y=\ell^2$.
Source : {"doc":"polycopie","pdfPage":40,"label":"Exercice 13, facile"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-XY` (hypothese) : $X\subset Y$ sont des espaces de Banach, et $J:X\to Y$, $Jx=x$, est linéaire.
- `d-cont` (definition) : $J$ est continue si et seulement s'il existe $C>0$ tel que $\|x\|_Y\le C\|x\|_X$ pour tout $x\in X$.
- `d-comp` (definition) : $J$ est compacte si et seulement si toute suite bornée de $X$ admet une sous-suite convergente dans $Y$.
- `s-comp` (definition, locale) : Supposons $J$ compacte.
- `s-neg` (definition, locale) : Supposons par l'absurde que $J$ n'est pas continue.
- `neg` (consequence) : Il existe $(x_n)\subset X$ avec $\|x_n\|_X=1$ et $\|x_n\|_Y\ge n$ pour tout $n\ge 1$.
- `ext` (consequence) : Une sous-suite $(x_{n_k})$ converge dans $Y$.
- `contra` (contradiction) : $(x_{n_k})$, convergente, est bornée dans $Y$ : contradiction avec $\|x_{n_k}\|_Y\ge n_k\to+\infty$.
- `imp` (consequence) : Toute injection compacte est continue.
- `d-ex` (definition) : $X=Y=\ell^2$, $J=\mathrm{Id}$, et $(e_n)$ la base hilbertienne canonique.
- `ex-dist` (egalite, calcul rational) : $\|e_n\|=1$ et $\|e_n-e_m\|^2=2$ pour $n\ne m$.
  - valeur attendue : "2"
- `ex-nc` (consequence) : $\mathrm{Id}_{\ell^2}$ est continue ($C=1$) mais non compacte.
- `fin` (conclusion) : Toute injection compacte est continue, et la réciproque est fausse.
- `x-cont-comp` (consequence, DISTRACTEUR) : Toute injection continue entre espaces de Banach est compacte.
- `x-image` (consequence, DISTRACTEUR) : $J$ est compacte si et seulement si l'image $J(B_X)$ de la boule unité est compacte dans $Y$.

Règles :
- `s-neg` + `d-cont` + `h-XY` ⟹ `neg` par « Négation de la définition pour $C=n$, puis normalisation $x_n=y_n/\|y_n\|_X$ (linéarité de $J$). »
- `neg` + `s-comp` + `d-comp` ⟹ `ext` par « Définition de la compacité, appliquée à une suite bornée de $X$. »
- `ext` + `neg` ⟹ `contra` par « Une suite convergente est bornée. »
- `contra` ⟹ `imp` par « Raisonnement par l’absurde : la supposition est contradictoire. »
- `d-ex` ⟹ `ex-dist` par « Orthonormalité de $(e_n)$ : $\|e_n-e_m\|^2=\|e_n\|^2+\|e_m\|^2$. »
- `ex-dist` + `d-ex` + `d-cont` + `d-comp` ⟹ `ex-nc` par « $C=1$ convient ; $(e_n)$ est bornée, et aucune sous-suite n'est de Cauchy, donc aucune ne converge. »
- `imp` + `ex-nc` ⟹ `fin` par « Réunion de l’implication et du contre-exemple. »

Justifications sans règle (séduisantes ou fausses) : « Théorème de Bolzano–Weierstrass : toute suite bornée admet une sous-suite convergente. » ; « C’est évident. »

Pièges :
- `ext` par « Théorème de Bolzano–Weierstrass : toute suite bornée admet une sous-suite convergente. » → incorrect [bornee-non-convergente] : Bolzano–Weierstrass ne vaut qu’en dimension finie. Ici, la sous-suite convergente provient de la compacité supposée de l’injection. — Contre-exemple : La suite $(e_n)$ de $\ell^2$ est bornée, sans sous-suite convergente.
- `imp` par « C’est évident. » → a-justifier [justification-absente] : L’implication se démontre : suppose la continuité en défaut et construis une suite bornée dont l’image n’est pas bornée.
- `x-cont-comp` → incorrect [compact-continue] : Une injection continue envoie les bornés sur des bornés ; une injection compacte, sur des relativement compacts. En dimension infinie, ce n’est pas la même chose. — Contre-exemple : $\mathrm{Id}_{\ell^2}$ est continue, et $(e_n)$ n'a aucune sous-suite convergente.
- `x-image` → incorrect [compact-continue] : La compacité de $J$ demande que $J(B_X)$ soit relativement compacte, non compacte : l'image de la boule n'est pas forcément fermée. — Contre-exemple : $X=C^1([0,1])$, normé par $\|u\|_\infty+\|u'\|_\infty$, et $Y=C([0,1])$ : $J$ est compacte (Arzelà–Ascoli), mais $u_n(x)=\tfrac14\sqrt{(x-1/2)^2+1/n^2}$ appartient à $B_X$ et converge uniformément vers $\tfrac14|x-1/2|\notin C^1$.

Retraits :
- `s-comp` (nécessaire) : Sans compacité, une suite bornée de X n’a plus de sous-suite convergente dans Y : l’argument par l’absurde tombe. — Contre-exemple : Dans $\ell^2$, $(e_n)$ est bornée et n'a aucune sous-suite convergente.
- `d-ex` (nécessaire) : En dimension finie, toute application linéaire est compacte : le contre-exemple exige un espace de dimension infinie. — Contre-exemple : Pour $X=Y=\mathbb R^n$, $\mathrm{Id}$ est compacte, par Bolzano–Weierstrass.

Solution :
**Compacte implique continue.** Supposons $J$ compacte et non continue. Pour tout $n$, il existe $y_n\in X$ avec $\|y_n\|_Y>n\|y_n\|_X$ ; en particulier $y_n\ne 0$, et $x_n=y_n/\|y_n\|_X$ vérifie $\|x_n\|_X=1$, $\|x_n\|_Y>n$. La suite $(x_n)$ est bornée dans $X$ : une sous-suite converge dans $Y$, donc est bornée dans $Y$, ce qui contredit $\|x_{n_k}\|_Y>n_k$.

**La réciproque est fausse.** Dans $\ell^2$, $\mathrm{Id}$ est continue ($C=1$). La suite $(e_n)$ est bornée et $\|e_n-e_m\|^2=2$ pour $n\neq m$ : aucune sous-suite n'est de Cauchy, donc aucune ne converge. $\mathrm{Id}$ n'est pas compacte.

**Point de vigilance.** La compacité de $J$ demande que l'image de la boule unité soit relativement compacte, non compacte.

Indices :
1. Pour la première implication, que se passe-t-il si aucune constante C ne convient ?
2. La négation fournit, pour chaque $n$, un $x_n$ de norme $1$ dans $X$ avec $\|x_n\|_Y\ge n$. Que dit la compacité de cette suite ?
3. Une suite convergente est bornée. Pour la réciproque, calcule $\|e_n-e_m\|$ dans $\ell^2$.

Erreurs fréquentes :
- Appliquer Bolzano–Weierstrass en dimension infinie.
- Confondre « image d’un borné bornée » et « image d’un borné relativement compacte ».

Variante : Montrer qu'une injection continue $J:X\to Y$ est compacte si et seulement si l'image par $J$ de la boule unité de $X$ est relativement compacte dans $Y$.

Solution de la variante : Dans un espace métrique, une partie est relativement compacte si et seulement si toute suite de cette partie admet une sous-suite convergente dans l'espace. Si $J$ est compacte, toute suite de $J(B_X)$ s'écrit $(Jx_n)$ avec $(x_n)\subset B_X$ bornée : elle admet une sous-suite convergente dans $Y$. Réciproquement, si $J(B_X)$ est relativement compacte et $(x_n)$ est bornée par $R>0$, alors $(J(x_n/R))\subset J(B_X)$ admet une sous-suite convergente, et par linéarité $(Jx_{n_k})$ converge.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `rellich.intermediaire` : Compacité de $H^1_0(]0,1[)\hookrightarrow L^2(]0,1[)$

Énoncé : On admet le critère de Fréchet–Kolmogorov : si $\mathcal F$ est bornée dans $L^2(\mathbb R)$ et si $\sup_{v\in\mathcal F}\|\tau_hv-v\|_{L^2(\mathbb R)}\to 0$ quand $h\to 0$, où $(\tau_hv)(x)=v(x+h)$, alors de toute suite de $\mathcal F$ on extrait une sous-suite dont la restriction à $]0,1[$ converge dans $L^2(]0,1[)$. En utilisant ce critère, montrer que toute suite bornée de $H^1_0(]0,1[)$ admet une sous-suite convergente dans $L^2(]0,1[)$.
Source : {"doc":"polycopie","pdfPage":40,"label":"Exercice 13, intermédiaire ; idée de preuve de la section 3.7 (p. PDF 15)"} — prérequis : distributions

But : `fin` — usage : demonstration

Nœuds :
- `h-borne` (hypothese) : $(u_n)$ est bornée dans $H^1_0(]0,1[)$ : $\|u_n\|_{H^1}\le R$ pour tout $n$.
- `d-H10` (definition) : $H^1_0(]0,1[)$ est l'adhérence de $C^\infty_c(]0,1[)$ dans $H^1(]0,1[)$.
- `prol` (consequence) : Pour $v\in H^1_0(]0,1[)$, le prolongement $\tilde v$ par $0$ appartient à $H^1(\mathbb R)$, avec $(\tilde v)'=\widetilde{v'}$ et $\|\tilde v\|_{H^1(\mathbb R)}=\|v\|_{H^1(]0,1[)}$.
- `tr` (inegalite) : Pour $v\in H^1(\mathbb R)$ et $h\in\mathbb R$ : $\|\tau_hv-v\|_{L^2(\mathbb R)}\le|h|\,\|v'\|_{L^2(\mathbb R)}$.
- `borne-L2` (consequence) : $(\tilde u_n)$ est bornée dans $L^2(\mathbb R)$.
- `equi` (inegalite) : $\sup_n\|\tau_h\tilde u_n-\tilde u_n\|_{L^2(\mathbb R)}\le R|h|\to 0$ quand $h\to 0$.
- `ext` (application-theoreme) : Une sous-suite $(u_{n_k})$ converge dans $L^2(]0,1[)$.
- `aa` (inegalite) : Pour $v\in H^1_0(]0,1[)$ et $x,y\in[0,1]$ : $|v(x)-v(y)|\le|x-y|^{1/2}\|v'\|_{L^2}$ et $|v(x)|\le\|v'\|_{L^2}$.
- `aa-ext` (consequence) : Une sous-suite de $(u_n)$ converge uniformément sur $[0,1]$, donc dans $L^2(]0,1[)$.
- `fin` (conclusion) : Toute suite bornée de $H^1_0(]0,1[)$ admet une sous-suite convergente dans $L^2(]0,1[)$ : l'injection est compacte.
- `x-borne-L2` (consequence, DISTRACTEUR) : Toute suite bornée de $L^2(]0,1[)$ admet une sous-suite convergente dans $L^2(]0,1[)$.
- `x-prol-H1` (consequence, DISTRACTEUR) : Pour tout $v\in H^1(]0,1[)$, le prolongement par $0$ appartient à $H^1(\mathbb R)$.

Règles :
- `d-H10` ⟹ `prol` par « Vrai pour $\varphi\in C^\infty_c(]0,1[)$ ; on passe à la limite dans $L^2(\mathbb R)$ sur les fonctions et leurs dérivées. » (chemin fk)
- ∅ ⟹ `tr` par « Pour $\varphi\in C^\infty_c(\mathbb R)$ : $\varphi(x+h)-\varphi(x)=h\int_0^1\varphi'(x+sh)\,ds$, Cauchy–Schwarz et Tonelli, puis densité de $C^\infty_c(\mathbb R)$ dans $H^1(\mathbb R)$. [cauchy-schwarz] » (chemin fk)
- `prol` + `h-borne` ⟹ `borne-L2` par « Le prolongement par zéro conserve les normes. » (chemin fk)
- `tr` + `prol` + `h-borne` ⟹ `equi` par « Majoration appliquée à chaque $\tilde u_n$, avec $\|\tilde u_n'\|_{L^2(\mathbb R)}\le R$. » (chemin fk)
- `borne-L2` + `equi` ⟹ `ext` par « Critère de compacité de Fréchet–Kolmogorov. [frechet-kolmogorov] » (chemin fk)
- `ext` ⟹ `fin` par « Définition d’une injection compacte. » (chemin fk)
- `d-H10` ⟹ `aa` par « Pour $\varphi\in C^\infty_c(]0,1[)$ : $\varphi(x)-\varphi(y)=\int_y^x\varphi'$ et Cauchy–Schwarz, puis passage à la limite uniforme. [cauchy-schwarz] » (chemin aa)
- `aa` + `h-borne` ⟹ `aa-ext` par « Suite uniformément bornée et équicontinue sur un compact : théorème d’Arzelà–Ascoli. » (chemin aa)
- `aa-ext` ⟹ `fin` par « Définition d’une injection compacte. » (chemin aa)

Justifications sans règle (séduisantes ou fausses) : « Une suite bornée de $L^2$ a une sous-suite faiblement convergente, donc fortement convergente. » ; « Théorème de Rellich–Kondrachov. »

Pièges :
- `ext` par « Une suite bornée de $L^2$ a une sous-suite faiblement convergente, donc fortement convergente. » → incorrect [faible-fort] : La convergence faible n’entraîne pas la convergence forte : c’est le contrôle uniforme des translations qui apporte la compacité. — Contre-exemple : $\sin(n\pi x)\rightharpoonup 0$ dans $L^2(]0,1[)$, alors que $\|\sin(n\pi x)\|_{L^2}^2=1/2$ pour tout $n$.
- `x-borne-L2` → incorrect [bornee-non-convergente] : Une borne dans $L^2$ seule ne suffit pas : il faut contrôler les dérivées, donc les translations. — Contre-exemple : $u_n(x)=\sin(n\pi x)$ est bornée dans $L^2(]0,1[)$ et $\|u_n-u_m\|_{L^2}^2=1$ pour $n\ne m$.
- `x-prol-H1` → incorrect [hypotheses-theoreme] : Le prolongement par zéro reste dans $H^1(\mathbb R)$ grâce à la condition $v\in H^1_0$ ; sans elle, il crée des sauts aux extrémités. — Contre-exemple : $v=1$ sur $]0,1[$ : $\tilde v=\mathbb 1_{]0,1[}$ a pour dérivée $\delta_0-\delta_1$, qui n'est pas dans $L^2(\mathbb R)$.

Retraits :
- `h-borne` (nécessaire) : Sans borne sur les dérivées, les translations ne sont plus contrôlées uniformément et l'équicontinuité disparaît. — Contre-exemple : $u_n(x)=\sin(n\pi x)$ est bornée dans $L^2(]0,1[)$, avec $\|u_n'\|_{L^2}=n\pi/\sqrt2\to\infty$, et n'a aucune sous-suite convergente dans $L^2$.

Calculs fermés : [{"kind":"rational","prompt":"Pour $u_n(x)=\\sin(n\\pi x)$ et $n\\neq m$ : valeur de $\\|u_n-u_m\\|_{L^2(]0,1[)}^2$","expected":"1"}]

Solution :
**Prolongement.** Pour $v\in H^1_0(]0,1[)$, le prolongement $\tilde v$ par $0$ appartient à $H^1(\mathbb R)$, avec $(\tilde v)'=\widetilde{v'}$ : c'est vrai pour $\varphi\in C^\infty_c(]0,1[)$, et l'on passe à la limite dans $L^2(\mathbb R)$. Les normes sont conservées.

**Translations.** Pour $\varphi\in C^\infty_c(\mathbb R)$, $\varphi(x+h)-\varphi(x)=h\int_0^1\varphi'(x+sh)\,ds$ ; Cauchy–Schwarz et Tonelli donnent $\|\tau_h\varphi-\varphi\|_{L^2}\le|h|\,\|\varphi'\|_{L^2}$, inégalité qui s'étend à $H^1(\mathbb R)$ par densité. Ainsi $\sup_n\|\tau_h\tilde u_n-\tilde u_n\|_{L^2(\mathbb R)}\le R|h|$.

**Conclusion.** $(\tilde u_n)$ est bornée dans $L^2(\mathbb R)$ et ses translations sont uniformément contrôlées : le critère de Fréchet–Kolmogorov fournit une sous-suite convergente dans $L^2(]0,1[)$.

**Autre voie.** Pour $v\in H^1_0(]0,1[)$, $|v(x)-v(y)|\le|x-y|^{1/2}\|v'\|_{L^2}$ et $|v(x)|\le\|v'\|_{L^2}$ : la suite est équicontinue et uniformément bornée, et Arzelà–Ascoli conclut.

**Point de vigilance.** Une borne dans $L^2$ seule ne suffit pas, et la convergence faible n'est pas la convergence forte.

Indices :
1. Le critère est énoncé sur $\mathbb R$ : comment passer d'une fonction de $H^1_0(]0,1[)$ à une fonction définie sur $\mathbb R$ ?
2. Après prolongement par zéro, majore $\|\tau_hv-v\|_{L^2(\mathbb R)}$ à l'aide de $v'$, d'abord pour une fonction test, puis par densité.
3. $\|\tau_hv-v\|_{L^2}\le|h|\,\|v'\|_{L^2}$ : la borne $R$ sur les normes $H^1$ rend ce contrôle uniforme en $n$.

Erreurs fréquentes :
- Conclure à la convergence forte à partir d’une extraction faible.
- Prolonger par zéro une fonction de $H^1(]0,1[)$ sans condition au bord.
- Invoquer Rellich–Kondrachov pour démontrer son cas particulier.

Variante : Montrer, par la seconde voie, que l'injection $H^1_0(]0,1[)\hookrightarrow C([0,1])$ est compacte.

Solution de la variante : Pour $v\in H^1_0(]0,1[)$, le représentant continu vérifie $|v(x)-v(y)|\le|x-y|^{1/2}\|v'\|_{L^2}$ et $|v(x)|\le\|v'\|_{L^2}$, inégalités établies pour les fonctions test puis étendues par convergence uniforme. Une suite bornée de $H^1_0(]0,1[)$ est donc uniformément bornée et équicontinue sur $[0,1]$ : par Arzelà–Ascoli, elle admet une sous-suite uniformément convergente.

Vérification : {"origin":"complement","review":"machine"}

## Exercice difficile `rellich.difficile` : Échec de la compacité sur $\mathbb R^d$ : les translations

Énoncé : Soient $\varphi\in C^\infty_c(\mathbb R^d)$ non nulle, de support contenu dans $B(0,\rho)$, et $u_n(x)=\varphi(x-2n\rho e_1)$ pour $n\ge 1$. Montrer que l'injection $H^1(\mathbb R^d)\hookrightarrow L^2(\mathbb R^d)$ est continue, que $(u_n)$ est bornée dans $H^1(\mathbb R^d)$, et qu'aucune sous-suite de $(u_n)$ ne converge dans $L^2(\mathbb R^d)$. Expliquer pourquoi la compacité peut échouer sur $\mathbb R^d$.
Source : {"doc":"polycopie","pdfPage":40,"label":"Exercice 13, difficile"} — prérequis : distributions

But : `fin` — usage : application

Nœuds :
- `h-Rd` (hypothese) : L'ouvert est $\mathbb R^d$ tout entier : la mesure de Lebesgue y est invariante par translation.
- `d-phi` (definition) : $\varphi\in C^\infty_c(\mathbb R^d)$, $\operatorname{supp}\varphi\subset B(0,\rho)$, et $u_n(x)=\varphi(x-2n\rho e_1)$ pour $n\ge 1$.
- `h-nz` (hypothese) : $\varphi\ne 0$.
- `cont` (inegalite) : $\|v\|_{L^2(\mathbb R^d)}\le\|v\|_{H^1(\mathbb R^d)}$ pour tout $v\in H^1(\mathbb R^d)$ : l'injection est continue.
- `iso` (egalite) : $\|u_n\|_{H^1}=\|\varphi\|_{H^1}$ et $\|u_n\|_{L^2}=\|\varphi\|_{L^2}$ pour tout $n$ : $(u_n)$ est bornée dans $H^1(\mathbb R^d)$.
- `disj` (consequence) : Pour $n\neq m$, les supports de $u_n$ et de $u_m$ sont disjoints.
- `dist` (egalite) : Pour $n\neq m$ : $\|u_n-u_m\|_{L^2}^2=2\|\varphi\|_{L^2}^2$.
- `fa` (consequence) : $u_n\rightharpoonup 0$ faiblement dans $L^2(\mathbb R^d)$.
- `nc` (consequence) : Aucune sous-suite de $(u_n)$ ne converge dans $L^2(\mathbb R^d)$.
- `non-comp` (consequence) : L'injection $H^1(\mathbb R^d)\hookrightarrow L^2(\mathbb R^d)$ n'est pas compacte.
- `fin` (conclusion) : L'injection $H^1(\mathbb R^d)\hookrightarrow L^2(\mathbb R^d)$ est continue mais non compacte : la norme $L^2$ des translatées s'échappe à l'infini.
- `x-faible-fort` (consequence, DISTRACTEUR) : Puisque $u_n\rightharpoonup 0$, on a $\|u_n\|_{L^2}\to 0$.
- `x-rellich-Rd` (consequence, DISTRACTEUR) : $(u_n)$ étant bornée dans $H^1(\mathbb R^d)$, Rellich–Kondrachov fournit une sous-suite convergente dans $L^2(\mathbb R^d)$.

Règles :
- ∅ ⟹ `cont` par « Définition de la norme de $H^1$ : $\|v\|_{H^1}^2=\|v\|_{L^2}^2+\|\nabla v\|_{L^2}^2$. »
- `d-phi` + `h-Rd` ⟹ `iso` par « Changement de variable par translation dans les intégrales. »
- `d-phi` ⟹ `disj` par « $\operatorname{supp}u_n\subset B(2n\rho e_1,\rho)$, et ces boules sont disjointes pour $n\neq m$. »
- `disj` + `iso` ⟹ `dist` par « Supports disjoints : $\|u_n-u_m\|^2=\|u_n\|^2+\|u_m\|^2$. » (chemin supports)
- `dist` + `h-nz` ⟹ `nc` par « Une suite convergente est de Cauchy, ce qu'interdit $\|u_n-u_m\|=\sqrt2\,\|\varphi\|_{L^2}>0$. » (chemin supports)
- `iso` + `disj` ⟹ `fa` par « Pour $\psi\in C_c(\mathbb R^d)$, $\int u_n\psi=0$ dès que $n$ est grand ; densité de $C_c$ dans $L^2$ et bornitude de $(u_n)$. » (chemin faible)
- `fa` + `iso` + `h-nz` ⟹ `nc` par « Une limite forte serait aussi limite faible, donc nulle, alors que $\|u_n\|_{L^2}=\|\varphi\|_{L^2}>0$. » (chemin faible)
- `iso` + `nc` ⟹ `non-comp` par « Définition d’une injection compacte : une suite bornée sans sous-suite convergente l’exclut. »
- `cont` + `non-comp` ⟹ `fin` par « Réunion de la continuité et de la non-compacité. »

Justifications sans règle (séduisantes ou fausses) : « Une suite bornée n’a jamais de sous-suite convergente en dimension infinie. »

Pièges :
- `nc` par « Une suite bornée n’a jamais de sous-suite convergente en dimension infinie. » → incorrect [bornee-non-convergente] : Une suite bornée peut avoir des sous-suites convergentes, même en dimension infinie : il faut un argument propre à cette suite. — Contre-exemple : Dans $\ell^2$, la suite constante égale à $e_1$ est bornée et convergente.
- `x-faible-fort` → incorrect [faible-fort] : $u_n\rightharpoonup u$ n'entraîne pas $\|u_n-u\|\to 0$ : ici la norme reste constante. — Contre-exemple : $\|u_n\|_{L^2}=\|\varphi\|_{L^2}>0$ pour tout $n$.
- `x-rellich-Rd` → incorrect [domaine-borne] : Rellich–Kondrachov suppose l'ouvert borné et lipschitzien ; $\mathbb R^d$ n'est pas borné. — Contre-exemple : La suite $(u_n)$ elle-même : bornée dans $H^1(\mathbb R^d)$, sans sous-suite convergente dans $L^2(\mathbb R^d)$.

Retraits :
- `h-Rd` (nécessaire) : Sur un ouvert borné lipschitzien, Rellich–Kondrachov rend l'injection compacte : les translatées finissent par sortir de l'ouvert. — Contre-exemple : Si $\Omega\subset B(0,r)$, alors $u_n=0$ sur $\Omega$ dès que $2n\rho>r+\rho$ : les restrictions convergent vers $0$.
- `h-nz` (nécessaire) : Avec la fonction nulle, la suite est constante et converge. — Contre-exemple : $\varphi=0$ donne $u_n=0$ pour tout $n$.

Calculs fermés : [{"kind":"rational","prompt":"Pour $d=1$, $\\varphi(x)=(1-|x|)^+$ (qui appartient à $H^1(\\mathbb R)$) et $\\rho=1$ : valeur de $\\|u_n-u_m\\|_{L^2}^2$ pour $n\\neq m$","expected":"4/3"}]

Solution :
**Continuité.** $\|v\|_{L^2}\le\|v\|_{H^1}$ par définition de la norme de $H^1$.

**Bornitude.** La mesure de Lebesgue étant invariante par translation, $\|u_n\|_{H^1}=\|\varphi\|_{H^1}$ et $\|u_n\|_{L^2}=\|\varphi\|_{L^2}$.

**Aucune sous-suite convergente.** Les supports $B(2n\rho e_1,\rho)$ sont deux à deux disjoints, donc $\|u_n-u_m\|_{L^2}^2=2\|\varphi\|_{L^2}^2>0$ pour $n\neq m$ : aucune sous-suite n'est de Cauchy. Autre argument : $u_n\rightharpoonup 0$ faiblement, donc une limite forte éventuelle serait nulle, ce qu'interdit $\|u_n\|_{L^2}=\|\varphi\|_{L^2}>0$.

**Interprétation.** Le contrôle des translations est uniforme, mais la norme $L^2$ s'échappe à l'infini : sur $\mathbb R^d$, l'injection est continue sans être compacte. Sur un ouvert borné, les translatées sortent de l'ouvert, et Rellich–Kondrachov rétablit la compacité.

Indices :
1. Cherche une suite bornée dans $H^1(\mathbb R^d)$ dont les termes restent éloignés les uns des autres dans $L^2$.
2. Translate une même fonction à support compact assez loin pour que les supports soient disjoints, et calcule $\|u_n-u_m\|_{L^2}$.
3. $\|u_n-u_m\|_{L^2}^2=2\|\varphi\|_{L^2}^2$ : aucune sous-suite n'est de Cauchy. Alternativement, la limite faible est nulle alors que la norme est constante.

Erreurs fréquentes :
- Appliquer Rellich–Kondrachov sur $\mathbb R^d$.
- Déduire $\|u_n\|\to 0$ de $u_n\rightharpoonup 0$.

Variante : Montrer que l'injection $H^1(]0,+\infty[)\hookrightarrow L^2(]0,+\infty[)$ n'est pas compacte.

Solution de la variante : Soit $\varphi\in C^\infty_c(]0,1[)$ non nulle et $u_n(x)=\varphi(x-n)$, de support dans $]n,n+1[$. Les normes $H^1$ et $L^2$ de $u_n$ sont celles de $\varphi$ ; les supports sont disjoints, donc $\|u_n-u_m\|_{L^2}^2=2\|\varphi\|_{L^2}^2>0$ pour $n\ne m$. La suite est bornée dans $H^1(]0,+\infty[)$ et n'a aucune sous-suite convergente dans $L^2(]0,+\infty[)$.

Graphe de la variante :
But : `fin` — usage : application

Nœuds :
- `d-phi` (definition) : $\varphi\in C^\infty_c(]0,1[)$ et $u_n(x)=\varphi(x-n)$ pour $n\ge 1$.
- `h-nz` (hypothese) : $\varphi\neq 0$.
- `in` (consequence) : $u_n\in C^\infty_c(]n,n+1[)\subset H^1(]0,+\infty[)$.
- `iso` (egalite) : $\|u_n\|_{H^1}=\|\varphi\|_{H^1}$ et $\|u_n\|_{L^2}=\|\varphi\|_{L^2}$.
- `dist` (egalite) : $\|u_n-u_m\|_{L^2}^2=2\|\varphi\|_{L^2}^2>0$ pour $n\ne m$.
- `nc` (consequence) : Aucune sous-suite de $(u_n)$ ne converge dans $L^2(]0,+\infty[)$.
- `fin` (conclusion) : L'injection $H^1(]0,+\infty[)\hookrightarrow L^2(]0,+\infty[)$ n'est pas compacte.
- `x-rellich` (consequence, DISTRACTEUR) : Par Rellich–Kondrachov, $(u_n)$ a une sous-suite convergente dans $L^2(]0,+\infty[)$.

Règles :
- `d-phi` ⟹ `in` par « Le support de $\varphi$ est un compact de $]0,1[$, translaté dans $]n,n+1[$. »
- `in` ⟹ `iso` par « Changement de variable par translation. »
- `in` + `iso` + `h-nz` ⟹ `dist` par « Supports disjoints, puis $\varphi\ne 0$. »
- `dist` ⟹ `nc` par « Une suite convergente est de Cauchy. »
- `iso` + `nc` ⟹ `fin` par « Suite bornée sans sous-suite convergente : définition d’une injection non compacte. »

Pièges :
- `x-rellich` → incorrect [domaine-borne] : $]0,+\infty[$ n'est pas borné : Rellich–Kondrachov ne s'applique pas. — Contre-exemple : $\|u_n-u_m\|_{L^2}^2=2\|\varphi\|_{L^2}^2$ pour $n\ne m$.

Retraits :
- `h-nz` (nécessaire) : La suite nulle converge. — Contre-exemple : $\varphi=0$ donne $u_n=0$.

Vérification : {"origin":"complement","review":"machine"}