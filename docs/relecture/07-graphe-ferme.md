# 7. Graphe fermé (`graphe-ferme`) — polycopié p. PDF 9, section 2.3

## Fiche

Espaces : $X,Y$ : espaces de Banach ; $X\times Y$ est muni de la norme produit $\|(x,y)\|=\|x\|_X+\|y\|_Y$. | $T:X\to Y$ linéaire, de domaine $D(T)=X$ ; son graphe est $G(T)=\{(x,Tx) : x\in X\}$.

Hypothèses :
- $X$ est complet. — Sans elle : $X=C^1([0,1])$ muni de $\|\cdot\|_\infty$, qui n'est pas complet, $Y=C([0,1])$ muni de $\|\cdot\|_\infty$ et $Tu=u'$ : le graphe est fermé, car si $u_n\to u$ et $u_n'\to v$ uniformément, alors $u'=v$ ; mais $u_n(x)=x^n$ vérifie $\|u_n\|_\infty=1$ et $\|Tu_n\|_\infty=n$.
- $Y$ est complet. — Sans elle : Soient $E$ un espace de Banach de dimension infinie, $\varphi$ une forme linéaire non continue sur $E$ (construite à l'aide d'une base algébrique), $Y=(E,\|x\|+|\varphi(x)|)$ et $T=\mathrm{Id}:E\to Y$. Le graphe de $T$ est fermé, car la norme de $Y$ domine celle de $E$, et $T$ n'est pas continu : $Y$ n'est pas complet.
- $T$ est linéaire et défini sur tout $X$. — Sans elle : $Au=u'$ sur $D(A)=H^1_0(]0,1[)\subset L^2(]0,1[)$ est fermé mais non borné : $w_n(x)=\sin(n\pi x)$ vérifie $\|Aw_n\|_{L^2}/\|w_n\|_{L^2}=n\pi$. Son domaine n'est pas l'espace entier.
- $G(T)$ est fermé dans $X\times Y$. — Sans elle : Une forme linéaire non continue sur un Banach de dimension infinie (construite à l'aide d'une base algébrique) est partout définie et non continue : son graphe n'est pas fermé.

Énoncé : Si $X,Y$ sont des espaces de Banach, si $T:X\to Y$ est linéaire, défini sur tout $X$, et si son graphe $\{(x,Tx) : x\in X\}$ est fermé dans $X\times Y$, alors $T$ est continu.

Bilan : {"autre":"Continuité : il existe $C\\ge 0$ tel que $\\|Tx\\|_Y\\le C\\|x\\|_X$ pour tout $x\\in X$."}

Preuve dans le polycopié : complete

Plan :
1. $G(T)$ est un sous-espace fermé du Banach $X\times Y$ : c'est un Banach pour la norme produit.
2. La projection $\pi_X:(x,Tx)\mapsto x$ est une bijection linéaire continue de $G(T)$ sur $X$ ; la surjectivité utilise $D(T)=X$.
3. Par le théorème de l'inverse borné, $\pi_X^{-1}:x\mapsto(x,Tx)$ est continue.
4. La projection sur $Y$ donne la continuité de $T=\pi_Y\circ\pi_X^{-1}$.

Vigilance :
- Les opérateurs différentiels non bornés $A:D(A)\subsetneq H\to H$ peuvent être fermés sans être bornés sur $H$ : le théorème exige le domaine entier $D(T)=X$.
- La fermeture du graphe suppose la convergence de $(Tx_n)_n$ et identifie sa limite ; elle ne la fournit pas.
- Le sens réciproque, un opérateur continu a un graphe fermé, est élémentaire et n’utilise pas la complétude.

Vérification : {"origin":"polycopie","review":"machine"}

Définition « Graphe d’un opérateur » : Pour $T:D(T)\subset X\to Y$ linéaire, $G(T)=\{(x,Tx) : x\in D(T)\}\subset X\times Y$, muni de la norme produit $\|(x,y)\|=\|x\|_X+\|y\|_Y$.

Définition « Opérateur fermé » : $T$ est fermé si $G(T)$ est fermé dans $X\times Y$ : si $x_n\in D(T)$, $x_n\to x$ et $Tx_n\to y$, alors $x\in D(T)$ et $Tx=y$.

Définition « Norme du graphe » : Sur $D(T)$, $\|x\|_T=\|x\|_X+\|Tx\|_Y$. Lorsque $X$ et $Y$ sont des Banach, $T$ est fermé si et seulement si $(D(T),\|\cdot\|_T)$ est complet, et $T$ est alors borné de $(D(T),\|\cdot\|_T)$ dans $Y$.

## Contre-exemple `ce-gf-domaine` : Domaine strict
Assertion : Tout opérateur linéaire fermé $A:D(A)\subset H\to H$ est borné.
Tâche : Pour $Au=u'$ sur $D(A)=H^1_0(]0,1[)\subset L^2(]0,1[)$, soit $u_n(x)=\max(0,1-n|x-\tfrac12|)$, $n\ge 2$. Exprime $\|u_n'\|^2_{L^2}/\|u_n\|^2_{L^2}$ en fonction de $n$.
Vérification : {"kind":"expr-equiv","prompt":"Rapport $\\|u_n'\\|^2_{L^2}/\\|u_n\\|^2_{L^2}$ en fonction de $n$","expected":"3n^2","vars":["n"]}
Explication : $u_n$ est affine par morceaux, à support $[\tfrac12-\tfrac1n,\tfrac12+\tfrac1n]\subset[0,1]$, nulle en $0$ et en $1$ : $u_n\in H^1_0(]0,1[)$. On a $\|u_n\|^2_{L^2}=2\int_0^{1/n}(1-nt)^2\,dt=\frac2{3n}$ et $\|u_n'\|^2_{L^2}=n^2\cdot\frac2n=2n$, d'où le rapport $3n^2$, non borné. $A$ est pourtant fermé : c'est l'hypothèse $D(A)=L^2$ qui manque.

## Contre-exemple `ce-gf-complet` : Espace de départ non complet
Assertion : Si $X$ est normé, $Y$ un Banach et $T:X\to Y$ linéaire, partout défini, de graphe fermé, alors $T$ est continu.
Tâche : $X=C^1([0,1])$ muni de $\|\cdot\|_\infty$, $Y=C([0,1])$ muni de $\|\cdot\|_\infty$ et $Tu=u'$. Pour $u_n(x)=x^n$, exprime $\|Tu_n\|_\infty/\|u_n\|_\infty$ en fonction de $n$.
Vérification : {"kind":"expr-equiv","prompt":"Rapport $\\|Tu_n\\|_\\infty/\\|u_n\\|_\\infty$ en fonction de $n$","expected":"n","vars":["n"]}
Explication : $\|u_n\|_\infty=1$ et $\|nx^{n-1}\|_\infty=n$ : $T$ n'est pas continu. Son graphe est pourtant fermé : si $u_n\to u$ et $u_n'\to v$ uniformément, avec $u\in C^1$, alors $u(x)=u(0)+\int_0^xv$, donc $u'=v$. Le théorème ne s'applique pas, car $(C^1([0,1]),\|\cdot\|_\infty)$ n'est pas complet.

## Exercice facile `graphe-ferme.facile` : Graphe d’un opérateur de multiplication borné

Énoncé : Soient $\Omega\subset\mathbb R^d$ un ouvert, $m\in L^\infty(\Omega)$ et $M$ l'opérateur de multiplication par $m$ dans $L^2(\Omega)$, $Mu=mu$. Montrer que $M$ est défini sur tout $L^2(\Omega)$, linéaire et borné, et que son graphe $G(M)=\{(u,mu) : u\in L^2(\Omega)\}$ est fermé dans $L^2(\Omega)\times L^2(\Omega)$.
Source : {"doc":"polycopie","pdfPage":39,"label":"Annexe B, exercice 7, facile"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-m` (hypothese) : $m\in L^\infty(\Omega)$.
- `d-M` (definition) : $M$ est la multiplication par $m$, de domaine $D(M)=\{u\in L^2(\Omega) : mu\in L^2(\Omega)\}$ et de graphe $G(M)=\{(u,mu) : u\in D(M)\}$.
- `d-suite` (definition, locale) : Soit $(u_n,v_n)_n\subset G(M)$ convergeant vers $(u,v)$ dans $L^2(\Omega)\times L^2(\Omega)$.
- `m-borne` (inegalite) : $D(M)=L^2(\Omega)$ et $\|mu\|_{L^2}\le\|m\|_{L^\infty}\|u\|_{L^2}$ pour tout $u\in L^2(\Omega)$.
- `m-lin` (consequence) : $M$ est linéaire.
- `s-vn` (egalite) : $v_n=mu_n$ pour tout $n$.
- `s-cv` (inegalite) : $\|mu_n-mu\|_{L^2}\le\|m\|_{L^\infty}\|u_n-u\|_{L^2}\to 0$.
- `pp-ext` (consequence) : Une sous-suite vérifie $u_{n_k}\to u$ et $v_{n_k}\to v$ presque partout.
- `s-lim` (egalite) : $v=mu$ presque partout ; en particulier $mu\in L^2(\Omega)$.
- `s-in` (consequence) : $u\in D(M)$ et $(u,v)\in G(M)$.
- `i-phi` (consequence) : $\Phi:L^2(\Omega)\times L^2(\Omega)\to L^2(\Omega)$, $\Phi(u,v)=v-mu$, est continue.
- `i-eq` (egalite) : $G(M)=\Phi^{-1}(\{0\})$.
- `fin` (conclusion) : $G(M)$ est fermé dans $L^2(\Omega)\times L^2(\Omega)$.
- `x-pp` (consequence, DISTRACTEUR) : La suite entière $(u_n)_n$ converge vers $u$ presque partout.
- `x-ferme-borne` (consequence, DISTRACTEUR) : Si le graphe de la multiplication par une fonction mesurable $m$ est fermé, alors $m\in L^\infty(\Omega)$.

Règles :
- `h-m` + `d-M` ⟹ `m-borne` par « $|m(x)u(x)|\le\|m\|_{L^\infty}|u(x)|$ pour presque tout $x$, puis intégration du carré. »
- `d-M` ⟹ `m-lin` par « $m(u+\lambda w)=mu+\lambda\,mw$. »
- `d-suite` + `d-M` ⟹ `s-vn` par « Définition du graphe : $(u_n,v_n)\in G(M)$. »
- `m-borne` + `m-lin` + `d-suite` ⟹ `s-cv` par « Linéarité de $M$ et majoration appliquée à $u_n-u$. » (chemin continuite)
- `s-vn` + `s-cv` + `d-suite` ⟹ `s-lim` par « $v_n=mu_n$ tend vers $v$ et vers $mu$ dans $L^2$ : unicité de la limite. » (chemin continuite)
- `d-suite` ⟹ `pp-ext` par « Une suite convergente dans $L^2$ admet une sous-suite convergeant presque partout ; on extrait deux fois. » (chemin presque-partout)
- `pp-ext` + `s-vn` ⟹ `s-lim` par « Passage à la limite presque partout dans $v_{n_k}=mu_{n_k}$, la fonction $m$ étant finie presque partout. » (chemin presque-partout)
- `s-lim` + `d-M` ⟹ `s-in` par « Définition de $D(M)$ et de $G(M)$. »
- `s-in` ⟹ `fin` par « Caractérisation séquentielle d'un fermé de l'espace métrique $L^2(\Omega)\times L^2(\Omega)$. »
- `m-borne` + `m-lin` ⟹ `i-phi` par « $\|\Phi(u,v)-\Phi(u',v')\|_{L^2}\le\|v-v'\|_{L^2}+\|m\|_{L^\infty}\|u-u'\|_{L^2}$. » (chemin image-reciproque)
- `m-borne` + `d-M` ⟹ `i-eq` par « Définition du graphe, avec $D(M)=L^2(\Omega)$. » (chemin image-reciproque)
- `i-phi` + `i-eq` ⟹ `fin` par « L'image réciproque du fermé $\{0\}$ par une application continue est fermée. » (chemin image-reciproque)

Justifications sans règle (séduisantes ou fausses) : « Théorème du graphe fermé. » ; « Une suite convergente est bornée, donc $(mu_n)_n$ converge vers $mu$. »

Pièges :
- `x-pp` → incorrect [convergence-pp] : La convergence dans $L^2$ ne donne la convergence presque partout que pour une sous-suite. — Contre-exemple : Les indicatrices des intervalles dyadiques $[j2^{-k},(j+1)2^{-k}]$, parcourus successivement, tendent vers $0$ dans $L^2(]0,1[)$ sans converger en aucun point.
- `x-ferme-borne` → incorrect [graphe-ferme-ferme-borne] : La fermeture du graphe ne demande aucune borne sur $m$ : la voie presque partout s'applique à toute fonction $m$ finie presque partout, sur le domaine maximal. — Contre-exemple : $m(x)=1/x$ sur $]0,1[$, avec $D(M)=\{u\in L^2 : u/x\in L^2\}$ : le graphe est fermé et $m\notin L^\infty(]0,1[)$.
- `fin` par « Théorème du graphe fermé. » → incorrect [circularite] : Ce théorème part de la fermeture du graphe pour conclure à la continuité : il ne peut pas établir la fermeture. Ici, c’est le sens élémentaire, continuité entraîne graphe fermé, qui est en jeu.
- `s-cv` par « Une suite convergente est bornée, donc $(mu_n)_n$ converge vers $mu$. » → incorrect [justification-absente] : Une suite bornée ne converge pas en général : la convergence de $(mu_n)_n$ vient de la majoration $\|m(u_n-u)\|_{L^2}\le\|m\|_{L^\infty}\|u_n-u\|_{L^2}$. — Contre-exemple : $\sin(nx)$ est bornée dans $L^2(]0,\pi[)$ sans y converger : $\|\sin(nx)-\sin(px)\|^2_{L^2}=\pi$ pour $n\neq p$.

Retraits :
- `h-m` (non nécessaire) : La voie presque partout n'utilise pas la bornitude de $m$ : le graphe reste fermé sur le domaine maximal, mais $M$ n'est plus défini sur tout $L^2(\Omega)$, ni borné. — Contre-exemple : $m(x)=1/x$ sur $]0,1[$ : $1\notin D(M)$, et $u_n=\mathbb 1_{]1/(2n),1/n[}$ vérifie $\|Mu_n\|_{L^2}/\|u_n\|_{L^2}=\sqrt2\,n$.

Calculs fermés : [{"kind":"rational","prompt":"Pour $\\Omega=]0,1[$ et $m(x)=x$, valeur de $\\|M\\|_{\\mathcal L(L^2)}$","expected":"1"}]

Solution :
**Bornitude.** Pour presque tout $x$, $|m(x)u(x)|\le\|m\|_{L^\infty}|u(x)|$ ; en intégrant le carré, $\|mu\|_{L^2}\le\|m\|_{L^\infty}\|u\|_{L^2}$. Donc $M$ est défini sur tout $L^2(\Omega)$, linéaire et borné.

**Fermeture.** Soit $(u_n,mu_n)\to(u,v)$ dans $L^2\times L^2$. Comme $\|mu_n-mu\|_{L^2}\le\|m\|_{L^\infty}\|u_n-u\|_{L^2}\to 0$, on a aussi $mu_n\to mu$, et l'unicité de la limite donne $v=mu$ : $(u,v)\in G(M)$. Autres voies : $G(M)=\Phi^{-1}(\{0\})$ avec $\Phi(u,v)=v-mu$ continue ; ou extraction d'une sous-suite convergeant presque partout, qui donne $v=mu$ presque partout.

**Remarque.** La voie presque partout n'utilise pas $m\in L^\infty$ : pour $m(x)=1/x$ sur $]0,1[$, la multiplication, sur son domaine maximal, est fermée sans être bornée, et son domaine n'est pas $L^2$ tout entier. Le théorème du graphe fermé ne peut pas servir ici : il conclut à la continuité à partir de la fermeture, non l'inverse.

Indices :
1. Que faut-il vérifier, exactement, pour une suite $(u_n,mu_n)$ du graphe qui converge dans $L^2\times L^2$ ?
2. Compare la limite $v$ de $(mu_n)_n$ à $mu$, en majorant $\|mu_n-mu\|_{L^2}$ grâce à $m\in L^\infty$.
3. $\|m(u_n-u)\|_{L^2}\le\|m\|_{L^\infty}\|u_n-u\|_{L^2}\to 0$, donc $mu_n\to mu$ ; l'unicité de la limite donne $v=mu$.

Erreurs fréquentes :
- Affirmer la convergence presque partout de toute la suite à partir de la convergence dans $L^2$.
- Invoquer le théorème du graphe fermé pour établir la fermeture du graphe.
- Croire qu’un graphe fermé impose un multiplicateur borné.

Variante : Sur $\Omega=]0,1[$, soit $M$ la multiplication par $m(x)=1/x$, de domaine $D(M)=\{u\in L^2(]0,1[) : u/x\in L^2(]0,1[)\}$. Montrer que $M$ est fermé, que $D(M)\neq L^2(]0,1[)$ et que $M$ n'est pas borné.

Solution de la variante : Si $u_n\in D(M)$, $u_n\to u$ et $u_n/x\to v$ dans $L^2$, une sous-suite converge presque partout pour les deux suites, d'où $v=u/x$ presque partout : $u\in D(M)$ et $Mu=v$. La fonction $1$ n'est pas dans $D(M)$, car $\int_0^1x^{-2}\,dx=+\infty$. Pour $u_n=\mathbb 1_{]1/(2n),1/n[}$, on a $\|u_n\|^2_{L^2}=\frac1{2n}$ et $\|Mu_n\|^2_{L^2}=\int_{1/(2n)}^{1/n}x^{-2}\,dx=n$ : le rapport $\sqrt2\,n$ n'est pas borné. Il n'y a pas de contradiction avec le théorème du graphe fermé, car $D(M)\neq L^2$.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `graphe-ferme.intermediaire` : Le graphe fermé à partir de l’application ouverte

Énoncé : Soient $X,Y$ deux espaces de Banach et $T:X\to Y$ linéaire, défini sur tout $X$, dont le graphe $G(T)=\{(x,Tx) : x\in X\}$ est fermé dans $X\times Y$. Démontrer, à partir du théorème de l'application ouverte (inverse borné), que $T$ est continu.
Source : {"doc":"polycopie","pdfPage":10,"label":"Démonstration de la section 2.3 ; Annexe B, exercice 7, intermédiaire (p. PDF 39)"} — prérequis : —

But : `fin` — usage : demonstration

Nœuds :
- `h-X` (hypothese) : $X$ est un espace de Banach.
- `h-Y` (hypothese) : $Y$ est un espace de Banach.
- `h-lin` (hypothese) : $T:X\to Y$ est linéaire et défini sur tout $X$.
- `h-ferme` (hypothese) : $G(T)=\{(x,Tx) : x\in X\}$ est fermé dans $X\times Y$, muni de la norme $\|(x,y)\|=\|x\|_X+\|y\|_Y$.
- `d-pi` (definition) : $\pi_X:G(T)\to X$ et $\pi_Y:G(T)\to Y$ sont les projections $\pi_X(x,Tx)=x$ et $\pi_Y(x,Tx)=Tx$.
- `p-complet` (consequence) : $X\times Y$, muni de la norme produit, est complet.
- `g-sev` (consequence) : $G(T)$ est un sous-espace vectoriel de $X\times Y$.
- `g-banach` (consequence) : $G(T)$, muni de la norme produit, est un espace de Banach.
- `pi-cont` (inegalite) : $\pi_X$ et $\pi_Y$ sont linéaires, avec $\|\pi_X(x,Tx)\|_X\le\|(x,Tx)\|$ et $\|\pi_Y(x,Tx)\|_Y\le\|(x,Tx)\|$ : elles sont continues.
- `pi-bij` (consequence) : $\pi_X$ est bijective, d'inverse $\pi_X^{-1}:x\mapsto(x,Tx)$.
- `ao` (application-theoreme) : $\pi_X^{-1}\in\mathcal L\big(X,G(T)\big)$ : il existe $C\ge 0$ tel que $\|x\|_X+\|Tx\|_Y\le C\|x\|_X$ pour tout $x\in X$.
- `comp` (egalite) : $T=\pi_Y\circ\pi_X^{-1}$.
- `fin` (conclusion) : $T$ est continu.
- `x-def` (consequence, DISTRACTEUR) : La fermeture du graphe donne directement : si $x_n\to x$ dans $X$, alors $Tx_n\to Tx$ dans $Y$.

Règles :
- `h-X` + `h-Y` ⟹ `p-complet` par « Une suite de Cauchy de $X\times Y$ a ses deux composantes de Cauchy, qui convergent dans $X$ et dans $Y$. »
- `h-lin` ⟹ `g-sev` par « Linéarité de $T$ : $(x,Tx)+\lambda(x',Tx')=(x+\lambda x',T(x+\lambda x'))$. »
- `p-complet` + `g-sev` + `h-ferme` ⟹ `g-banach` par « Un sous-espace fermé d’un espace complet est complet. »
- `d-pi` + `g-sev` ⟹ `pi-cont` par « Définition de la norme produit. »
- `d-pi` + `h-lin` ⟹ `pi-bij` par « Injective : $\pi_X(x,Tx)=0$ impose $x=0$, donc $(x,Tx)=(0,0)$ ; surjective : tout $x\in X$ est dans le domaine de $T$. »
- `g-banach` + `h-X` + `pi-cont` + `pi-bij` ⟹ `ao` par « Théorème de l’application ouverte (inverse borné), appliqué à $\pi_X$. [application-ouverte] »
- `d-pi` + `pi-bij` ⟹ `comp` par « Pour $x\in X$ : $\pi_Y\big(\pi_X^{-1}(x)\big)=\pi_Y(x,Tx)=Tx$. » (chemin composition)
- `ao` + `pi-cont` + `comp` ⟹ `fin` par « Une composée d’applications linéaires continues est continue. » (chemin composition)
- `ao` + `h-lin` ⟹ `fin` par « $\|Tx\|_Y\le\|x\|_X+\|Tx\|_Y\le C\|x\|_X$, et $T$ est linéaire. » (chemin estimation)

Justifications sans règle (séduisantes ou fausses) : « Tout sous-espace vectoriel d’un espace de Banach est complet. » ; « $\pi_X$ est surjective parce que le graphe est fermé. » ; « Théorème du graphe fermé. »

Pièges :
- `x-def` → incorrect [graphe-ferme-definition] : La fermeture du graphe suppose que $(Tx_n)_n$ converge, et identifie alors sa limite ; elle ne fournit pas cette convergence. C'est tout l'apport du théorème. — Contre-exemple : Pour la dérivation $A$ sur $D(A)=H^1_0(]0,1[)\subset L^2(]0,1[)$, de graphe fermé, $u_n=\sin(n\pi x)/n\to 0$ dans $L^2$, alors que $\|Au_n\|_{L^2}=\pi/\sqrt2$.
- `g-banach` par « Tout sous-espace vectoriel d’un espace de Banach est complet. » → incorrect [fermeture-espace] : Un sous-espace vectoriel n’est complet que s’il est fermé : c’est ici que sert l’hypothèse sur le graphe. — Contre-exemple : $c_{00}$ est un sous-espace vectoriel non fermé de $\ell^\infty$ et n'est pas complet.
- `pi-bij` par « $\pi_X$ est surjective parce que le graphe est fermé. » → incorrect [domaine-operateur] : La surjectivité de $\pi_X$ traduit $D(T)=X$ ; la fermeture du graphe n'y est pour rien. — Contre-exemple : Pour $Au=u'$ sur $D(A)=H^1_0(]0,1[)\subset L^2(]0,1[)$, le graphe est fermé, mais $\pi_X\big(G(A)\big)=H^1_0(]0,1[)\neq L^2(]0,1[)$.
- `fin` par « Théorème du graphe fermé. » → incorrect [circularite] : C’est le résultat à démontrer : l’invoquer rend la preuve circulaire.

Retraits :
- `h-X` (nécessaire) : $G(T)$ et $X$ ne sont plus des Banach : l'inverse borné ne s'applique plus à $\pi_X$. — Contre-exemple : $X=C^1([0,1])$ muni de $\|\cdot\|_\infty$, qui n'est pas complet, $Y=C([0,1])$ muni de $\|\cdot\|_\infty$ et $Tu=u'$ : le graphe est fermé, car si $u_n\to u$ et $u_n'\to v$ uniformément, alors $u'=v$ ; mais $u_n(x)=x^n$ vérifie $\|u_n\|_\infty=1$ et $\|Tu_n\|_\infty=n$.
- `h-Y` (nécessaire) : $X\times Y$, donc $G(T)$, peut ne plus être complet. — Contre-exemple : Soient $E$ un espace de Banach de dimension infinie, $\varphi$ une forme linéaire non continue sur $E$ (construite à l'aide d'une base algébrique), $Y=(E,\|x\|+|\varphi(x)|)$ et $T=\mathrm{Id}:E\to Y$. Le graphe de $T$ est fermé, car la norme de $Y$ domine celle de $E$, et $T$ n'est pas continu : $Y$ n'est pas complet.
- `h-ferme` (nécessaire) : $G(T)$ n'est plus un Banach, et la conclusion peut échouer. — Contre-exemple : Une forme linéaire non continue sur un Banach de dimension infinie (construite à l'aide d'une base algébrique) est linéaire et définie partout ; par le théorème, son graphe n'est pas fermé.
- `h-lin` (nécessaire) : $\pi_X$ n'est plus surjective sur $X$. — Contre-exemple : $Au=u'$ sur $D(A)=H^1_0(]0,1[)\subset L^2(]0,1[)$ est fermé mais non borné : $w_n(x)=\sin(n\pi x)$ vérifie $\|Aw_n\|_{L^2}/\|w_n\|_{L^2}=n\pi$. Son domaine n'est pas l'espace entier.

Calculs fermés : [{"kind":"choice","prompt":"Pour appliquer l'inverse borné à $\\pi_X:G(T)\\to X$, quels espaces doivent être complets ?","options":["$G(T)$ et $X$","$Y$ seulement","$X$ seulement","$G(T)$ seulement"],"correct":[0],"explanation":"$\\pi_X$ va de $G(T)$ dans $X$ : les deux doivent être des Banach. $G(T)$ l'est comme sous-espace fermé de $X\\times Y$, complet parce que $X$ et $Y$ le sont."}]

Solution :
$X\times Y$, muni de $\|(x,y)\|=\|x\|_X+\|y\|_Y$, est complet ; $G(T)$ en est un sous-espace vectoriel, par linéarité de $T$, et fermé par hypothèse : c'est un Banach. La projection $\pi_X:(x,Tx)\mapsto x$ est linéaire, continue car $\|x\|_X\le\|(x,Tx)\|$, et bijective : injective car $x=0$ impose $(x,Tx)=(0,0)$, surjective car $T$ est défini sur tout $X$. Par le théorème de l'inverse borné, $\pi_X^{-1}:x\mapsto(x,Tx)$ est continue. Alors $T=\pi_Y\circ\pi_X^{-1}$ est continu, comme composée d'applications continues ; de façon équivalente, $\|Tx\|_Y\le\|x\|_X+\|Tx\|_Y\le C\|x\|_X$.

**Point de vigilance.** L'hypothèse $D(T)=X$ sert à la surjectivité de $\pi_X$ : la dérivation sur $H^1_0(]0,1[)\subset L^2(]0,1[)$ est fermée sans être bornée.

Indices :
1. Quel opérateur, naturellement associé au graphe, est une bijection linéaire continue entre deux espaces de Banach ?
2. Considère $\pi_X:G(T)\to X$. Vérifie que $G(T)$ est complet, puis que $\pi_X$ est continue et bijective.
3. L'inverse borné donne $\pi_X^{-1}:x\mapsto(x,Tx)$ continue ; compose avec la projection sur $Y$.

Erreurs fréquentes :
- Affirmer qu’un sous-espace d’un Banach est complet sans qu’il soit fermé.
- Oublier que la surjectivité de $\pi_X$ repose sur $D(T)=X$.
- Croire que la fermeture du graphe donne la convergence de la suite des images.

Variante : Soit $H$ un espace de Hilbert réel et $S:H\to H$ linéaire, défini sur tout $H$, et symétrique : $\langle Sx,z\rangle=\langle x,Sz\rangle$ pour tous $x,z\in H$. Montrer que $S$ est continu (théorème de Hellinger–Toeplitz).

Solution de la variante : Soit $x_n\to x$ avec $Sx_n\to y$. Pour tout $z\in H$, $\langle Sx_n,z\rangle=\langle x_n,Sz\rangle$ ; par continuité du produit scalaire, $\langle y,z\rangle=\langle x,Sz\rangle=\langle Sx,z\rangle$. Donc $\langle y-Sx,z\rangle=0$ pour tout $z$, et $z=y-Sx$ donne $y=Sx$ : le graphe de $S$ est fermé. $H$ étant complet et $S$ défini sur tout $H$, le théorème du graphe fermé donne la continuité. Les deux hypothèses sont indispensables : $Au=-u''$ sur $H^2(]0,1[)\cap H^1_0(]0,1[)$ est symétrique et non borné, et sur $c_{00}$ muni du produit scalaire de $\ell^2$, $S(x)=(kx_k)_k$ est symétrique, partout défini et non borné.

Graphe de la variante :
But : `fin` — usage : application

Nœuds :
- `h-H` (hypothese) : $H$ est un espace de Hilbert réel, donc un espace de Banach.
- `h-S` (hypothese) : $S:H\to H$ est linéaire et défini sur tout $H$.
- `h-sym` (hypothese) : $\langle Sx,z\rangle=\langle x,Sz\rangle$ pour tous $x,z\in H$.
- `d-suite` (definition, locale) : Soit $(x_n)_n\subset H$ avec $x_n\to x$ et $Sx_n\to y$ dans $H$.
- `d-z` (definition, locale) : Soit $z\in H$.
- `e-sym` (egalite) : $\langle Sx_n,z\rangle=\langle x_n,Sz\rangle$ pour tout $n$.
- `e-lim` (egalite) : $\langle y,z\rangle=\langle x,Sz\rangle=\langle Sx,z\rangle$.
- `e-y` (egalite) : $y=Sx$.
- `ferme` (consequence) : Le graphe de $S$ est fermé dans $H\times H$.
- `thm` (application-theoreme) : $S$ est continu.
- `fin` (conclusion) : $S\in\mathcal L(H)$.
- `x-sym-seule` (consequence, DISTRACTEUR) : Un opérateur symétrique est borné, quel que soit son domaine.

Règles :
- `h-sym` + `d-suite` + `d-z` ⟹ `e-sym` par « Symétrie de $S$, appliquée à $x_n$ et $z$. »
- `e-sym` + `d-suite` + `h-sym` ⟹ `e-lim` par « Continuité du produit scalaire, puis symétrie de $S$ appliquée à $x$ et $z$. »
- `e-lim` ⟹ `e-y` par « $\langle y-Sx,z\rangle=0$ pour tout $z\in H$ ; on choisit $z=y-Sx$. »
- `e-y` ⟹ `ferme` par « Caractérisation séquentielle de la fermeture du graphe. »
- `h-H` + `h-S` + `ferme` ⟹ `thm` par « Théorème du graphe fermé. [graphe-ferme] »
- `thm` ⟹ `fin` par « Définition de $\mathcal L(H)$. »

Justifications sans règle (séduisantes ou fausses) : « Cauchy–Schwarz : $\|Sx\|^2=\langle x,S^2x\rangle\le\|x\|\,\|S^2x\|$, ce qui borne $S$. »

Pièges :
- `x-sym-seule` → incorrect [domaine-operateur] : La symétrie ne suffit pas : le théorème exige que l’opérateur soit défini sur tout l’espace. — Contre-exemple : $Au=-u''$ sur $D(A)=H^2(]0,1[)\cap H^1_0(]0,1[)\subset L^2(]0,1[)$ est symétrique, et $w_n(x)=\sin(n\pi x)$ vérifie $\|Aw_n\|/\|w_n\|=n^2\pi^2$.
- `thm` par « Cauchy–Schwarz : $\|Sx\|^2=\langle x,S^2x\rangle\le\|x\|\,\|S^2x\|$, ce qui borne $S$. » → incorrect [circularite] : La majoration fait intervenir $\|S^2x\|$, qui n'est pas contrôlé : on suppose ce qu'on veut démontrer.

Retraits :
- `h-H` (nécessaire) : Le théorème du graphe fermé ne s’applique plus. — Contre-exemple : Sur $c_{00}$ muni du produit scalaire de $\ell^2$, $S(x)=(kx_k)_k$ est linéaire, partout défini, symétrique, et $Se_n=ne_n$ : il n'est pas borné.
- `h-S` (nécessaire) : Un opérateur symétrique de domaine strict peut être non borné. — Contre-exemple : $Au=-u''$ sur $H^2(]0,1[)\cap H^1_0(]0,1[)\subset L^2(]0,1[)$.

Vérification : {"origin":"polycopie","review":"machine"}

## Exercice difficile `graphe-ferme.difficile` : La dérivation sur $H^1_0\subset L^2$ : fermée et non bornée

Énoncé : Soient $H=L^2(]0,1[)$ et $A:D(A)\subset H\to H$, $Au=u'$, de domaine $D(A)=H^1_0(]0,1[)$. Montrer que $A$ est fermé, que $A$ n'est pas borné pour la norme de $H$, et expliquer pourquoi cela ne contredit pas le théorème du graphe fermé.
Source : {"doc":"polycopie","pdfPage":39,"label":"Annexe B, exercice 7, difficile ; point de vigilance de la section 2.3 (p. PDF 10)"} — prérequis : distributions

But : `fin` — usage : application

Nœuds :
- `d-A` (definition) : $H=L^2(]0,1[)$, $D(A)=H^1_0(]0,1[)$ et $Au=u'$, dérivée faible.
- `h-H10` (hypothese) : $H^1_0(]0,1[)$, adhérence de $C^\infty_c(]0,1[)$ dans $H^1(]0,1[)$, est fermé dans $H^1(]0,1[)$, normé par $\|u\|^2_{H^1}=\|u\|^2_{L^2}+\|u'\|^2_{L^2}$.
- `d-suite` (definition, locale) : Soit $(u_n)_n\subset D(A)$ tel que $u_n\to u$ et $u_n'\to v$ dans $H$.
- `d-w` (definition) : Pour $n\ge 1$ : $w_n(x)=\sin(n\pi x)$.
- `c-H1` (consequence) : Pour tout $\varphi\in C^\infty_c(]0,1[)$, $\int_0^1u\varphi'=-\int_0^1v\varphi$ : $u\in H^1(]0,1[)$ et $u'=v$.
- `c-H10` (consequence) : $u_n\to u$ dans $H^1(]0,1[)$, donc $u\in H^1_0(]0,1[)$.
- `ferme` (consequence) : $u\in D(A)$ et $Au=v$ : le graphe de $A$ est fermé dans $H\times H$.
- `w-ratio` (egalite, calcul expr-equiv) : $w_n\in D(A)$ et $\|w_n'\|^2_{L^2}/\|w_n\|^2_{L^2}=n^2\pi^2$.
  - valeur attendue : "n^2*pi^2"
- `nonborne` (consequence) : Aucune constante $C$ ne vérifie $\|Au\|_H\le C\|u\|_H$ pour tout $u\in D(A)$ : $A$ n'est pas borné en norme $L^2$.
- `dom` (consequence) : $D(A)$ est dense dans $H$ et distinct de $H$ : la fonction constante $1$ n'appartient pas à $H^1_0(]0,1[)$.
- `n-complet` (consequence) : $(D(A),\|\cdot\|_H)$ n'est pas complet.
- `nc` (consequence) : Le théorème du graphe fermé ne s'applique pas : avec $X=H$, $A$ n'est pas défini sur tout $X$ ; avec $X=(D(A),\|\cdot\|_H)$, l'espace n'est pas complet.
- `fin` (conclusion) : $A$ est fermé et non borné en norme $L^2$, sans contradiction avec le théorème du graphe fermé, dont les hypothèses de domaine et de complétude échouent.
- `x-borne` (consequence, DISTRACTEUR) : $A$ étant fermé, le théorème du graphe fermé montre que $A$ est borné en norme $L^2$.
- `x-D-ferme` (consequence, DISTRACTEUR) : $H^1_0(]0,1[)$ est fermé dans $L^2(]0,1[)$.

Règles :
- `d-suite` ⟹ `c-H1` par « Définition de la dérivée faible, $\int_0^1u_n\varphi'=-\int_0^1u_n'\varphi$, puis passage à la limite par Cauchy–Schwarz ; $\varphi$ est quelconque. »
- `d-suite` + `c-H1` + `h-H10` ⟹ `c-H10` par « $\|u_n-u\|^2_{H^1}=\|u_n-u\|^2_{L^2}+\|u_n'-v\|^2_{L^2}\to 0$, et $H^1_0$ est fermé dans $H^1$. »
- `c-H1` + `c-H10` + `d-A` ⟹ `ferme` par « Caractérisation séquentielle de la fermeture du graphe. »
- `d-w` + `d-A` ⟹ `w-ratio` par « $w_n$ est régulière et nulle en $0$ et $1$ ; $\|w_n\|^2_{L^2}=\tfrac12$ et $\|w_n'\|^2_{L^2}=\tfrac{n^2\pi^2}2$. »
- `w-ratio` ⟹ `nonborne` par « Le rapport $\|Aw_n\|_H/\|w_n\|_H=n\pi$ n'est pas borné. »
- `d-A` ⟹ `dom` par « $C^\infty_c(]0,1[)\subset H^1_0(]0,1[)$ est dense dans $L^2$ ; une fonction de $H^1_0(]0,1[)$ a un représentant continu nul en $0$ et en $1$. »
- `dom` ⟹ `n-complet` par « Un sous-espace complet est fermé ; or un sous-espace dense et distinct de l’espace n’est pas fermé. »
- `dom` + `n-complet` ⟹ `nc` par « Comparaison avec les hypothèses du théorème : opérateur linéaire défini sur tout un espace de Banach. »
- `ferme` + `nonborne` + `nc` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « La dérivation est continue dans $L^2$ : $u_n\to u$ dans $L^2$ entraîne $u_n'\to u'$ dans $L^2$. » ; « $H^1_0(]0,1[)$ est fermé dans $L^2(]0,1[)$. » ; « Théorème du graphe fermé. »

Pièges :
- `x-borne` → incorrect [graphe-ferme-ferme-borne] : Le théorème exige un opérateur défini sur tout un espace de Banach ; ici $D(A)\neq H$, et $D(A)$ n'est pas complet pour la norme de $H$. — Contre-exemple : $w_n(x)=\sin(n\pi x)\in D(A)$ et $\|Aw_n\|_{L^2}/\|w_n\|_{L^2}=n\pi$.
- `x-D-ferme` → incorrect [densite-fermeture] : $H^1_0$ est fermé dans $H^1$, pour la norme de $H^1$ ; dans $L^2$, il est dense et strict. — Contre-exemple : Des fonctions de $C^\infty_c(]0,1[)$ convergent dans $L^2$ vers la fonction $1$, qui n'est pas dans $H^1_0(]0,1[)$.
- `c-H1` par « La dérivation est continue dans $L^2$ : $u_n\to u$ dans $L^2$ entraîne $u_n'\to u'$ dans $L^2$. » → incorrect [graphe-ferme-ferme-borne] : La dérivation n'est pas continue de $L^2$ dans $L^2$ : c'est précisément ce que montre la non-bornitude de $A$. L'identification $u'=v$ passe par les distributions. — Contre-exemple : $u_n=\sin(n\pi x)/n\to 0$ dans $L^2(]0,1[)$, alors que $\|u_n'\|_{L^2}=\pi/\sqrt2$.
- `c-H10` par « $H^1_0(]0,1[)$ est fermé dans $L^2(]0,1[)$. » → incorrect [densite-fermeture] : $H^1_0(]0,1[)$ n'est pas fermé dans $L^2$ ; la limite reste dans $H^1_0$ parce que la convergence a lieu dans $H^1$.
- `nonborne` par « Théorème du graphe fermé. » → incorrect [hypotheses-theoreme] : Le théorème du graphe fermé ne dit rien ici : son hypothèse de domaine n’est pas satisfaite. La non-bornitude se démontre par une suite explicite.

Retraits :
- `h-H10` (nécessaire) : Le domaine fait partie de la donnée : un domaine trop petit rend l’opérateur non fermé. — Contre-exemple : Sur $D(B)=C^\infty_c(]0,1[)$, $Bu=u'$ n'est pas fermé : pour $u(x)=x(1-x)\in H^1_0(]0,1[)\setminus C^\infty_c(]0,1[)$, il existe $u_n\in C^\infty_c(]0,1[)$ avec $u_n\to u$ dans $H^1$, donc $(u_n,u_n')\to(u,u')$ dans $H\times H$, alors que $u\notin D(B)$.

Solution :
**Fermeture.** Soit $u_n\in H^1_0(]0,1[)$ avec $u_n\to u$ et $u_n'\to v$ dans $L^2$. Pour $\varphi\in C^\infty_c(]0,1[)$, $\int_0^1u_n\varphi'=-\int_0^1u_n'\varphi$, et les deux membres passent à la limite par Cauchy–Schwarz : $\int_0^1u\varphi'=-\int_0^1v\varphi$. Donc $u\in H^1(]0,1[)$ et $u'=v$. Alors $\|u_n-u\|^2_{H^1}=\|u_n-u\|^2_{L^2}+\|u_n'-v\|^2_{L^2}\to 0$ ; $H^1_0$ étant fermé dans $H^1$, $u\in H^1_0(]0,1[)$ et $Au=v$.

**Non-bornitude.** $w_n(x)=\sin(n\pi x)\in H^1_0(]0,1[)$, $\|w_n\|^2_{L^2}=\frac12$ et $\|w_n'\|^2_{L^2}=\frac{n^2\pi^2}2$ : le rapport $\|Aw_n\|/\|w_n\|=n\pi$ n'est pas borné.

**Pas de contradiction.** Le théorème exige un opérateur linéaire défini sur tout un espace de Banach. Avec $X=L^2$, $A$ n'est pas défini partout, car $1\notin H^1_0(]0,1[)$. Avec $X=(H^1_0,\|\cdot\|_{L^2})$, l'espace n'est pas complet : il est dense et distinct de $L^2$, donc non fermé. En revanche, pour la norme du graphe, équivalente ici à la norme de $H^1$, $D(A)$ est complet et $\|Au\|_{L^2}\le\|u\|_{H^1}$ : $A$ y est borné, conformément au théorème.

Indices :
1. Le théorème du graphe fermé porte sur un opérateur défini sur tout un espace de Banach : est-ce le cas de $A$, pour la norme de $L^2$ ?
2. Pour la fermeture, passe à la limite dans $\int u_n\varphi'=-\int u_n'\varphi$, puis utilise la convergence dans $H^1$. Pour la non-bornitude, teste sur $\sin(n\pi x)$.
3. $\|\sin(n\pi\cdot)\|^2_{L^2}=\frac12$ et $\|(\sin(n\pi\cdot))'\|^2_{L^2}=\frac{n^2\pi^2}2$ ; la fonction $1$ montre que $D(A)\neq L^2$.

Erreurs fréquentes :
- Déduire la bornitude de la seule fermeture.
- Affirmer que $H^1_0$ est fermé dans $L^2$.
- Oublier que le domaine fait partie de la donnée de l’opérateur.

Variante : Même question pour $B:D(B)\subset L^2(]0,1[)\to L^2(]0,1[)$, $Bu=u'$, de domaine $D(B)=H^1(]0,1[)$.

Solution de la variante : La fermeture s'obtient comme ci-dessus, sans étape de bord : si $u_n\to u$ et $u_n'\to v$ dans $L^2$, alors $u\in H^1(]0,1[)$ et $u'=v$. Les fonctions $\sin(n\pi x)$ sont dans $H^1$ et donnent le rapport $n\pi$ : $B$ n'est pas borné. $D(B)$ est dense dans $L^2$ et distinct de $L^2$, car $\mathbb 1_{]0,1/2[}$ n'a pas de représentant continu ; le théorème du graphe fermé ne s'applique donc pas.

Vérification : {"origin":"complement","review":"machine"}