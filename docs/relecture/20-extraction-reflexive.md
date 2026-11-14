# 20. Extraction faible en espace réflexif (`extraction-reflexive`) — polycopié p. PDF 20, section 5.2

## Fiche

Espaces : $E$ : espace de Banach réel, $J:E\to E''$ l'injection canonique $J(u)(f)=f(u)$ ; $E$ est réflexif lorsque $J$ est surjective. | Convergence faible : $u_n\rightharpoonup u$ dans $E$ signifie $f(u_n)\to f(u)$ pour tout $f\in E'$.

Hypothèses :
- $E$ est un espace de Banach réflexif. — Sans elle : Dans $L^1(]0,1[)$, non réflexif, $u_n=n\,\mathbb 1_{]0,1/n[}$ est bornée sans sous-suite faiblement convergente : une limite faible serait nulle (tests $\mathbb 1_{]\delta,1[}$), alors que $\int_0^1u_n=1$.
- La suite $(u_n)$ est bornée dans $E$. — Sans elle : $u_n=nw$, $w\neq 0$ : pour $f\in E'$ avec $f(w)\neq 0$, $f(u_n)=nf(w)$ diverge le long de toute sous-suite.

Énoncé : Dans un Banach réflexif, toute suite bornée possède une sous-suite faiblement convergente.

Bilan : {"existence":"Existence d'une sous-suite faiblement convergente ; deux sous-suites peuvent avoir des limites différentes."}

Preuve dans le polycopié : idee

Plan :
1. $J:E\to E''$ est une isométrie linéaire, surjective par réflexivité.
2. Banach–Alaoglu appliqué à l'espace normé $E'$ : la boule unité de $E''$ est compacte pour $\sigma(E'',E')$.
3. $J$ est un homéomorphisme de $(E,\sigma(E,E'))$ sur $(E'',\sigma(E'',E'))$, car $J(u)(f)=f(u)$ : la boule unité de $E$ est faiblement compacte.
4. Eberlein–Šmulian : dans un Banach, une partie faiblement compacte est faiblement séquentiellement compacte.
5. Une suite bornée, contenue dans une boule fermée, admet donc une sous-suite faiblement convergente.

Vigilance :
- La sous-suite converge faiblement, pas en norme : une suite orthonormée tend faiblement vers 0 avec une norme constante.
- Seule une sous-suite converge en général : $(-1)^nw$ a deux limites faibles d’adhérence.
- $L^1$, $L^\infty$ et $C([0,1])$ ne sont pas réflexifs : pour $L^\infty$, on utilise Banach–Alaoglu et la topologie faible-*.
- La convergence faible ne passe pas à la limite dans les non-linéarités.

Vérification : {"origin":"polycopie","review":"machine"}

Définition « Espace réflexif » : Un espace de Banach $E$ est réflexif lorsque l'injection canonique $J:E\to E''$, $J(u)(f)=f(u)$, est surjective. Tout espace de Hilbert est réflexif.

Définition « Convergence faible » : $u_n\rightharpoonup u$ dans $E$ signifie $f(u_n)\to f(u)$ pour tout $f\in E'$.

## Contre-exemple `ce-er-l1` : Suite bornée de $L^1$
Assertion : Toute suite bornée de $L^1(]0,1[)$ admet une sous-suite faiblement convergente.
Tâche : Pour $u_n=n\,\mathbb 1_{]0,1/n[}$ et $\delta\in]0,1[$, calcule $\int_0^1u_n$ et $\lim_n\int_\delta^1u_n$.
Vérification : {"kind":"rational-vector","prompt":"Valeurs de $\\int_0^1u_n$ et de $\\lim_n\\int_\\delta^1u_n$","expected":["1","0"],"labels":["∫₀¹ uₙ","lim ∫_δ¹ uₙ"]}
Explication : Une limite faible $u$ d'une sous-suite vérifierait $\int_\delta^1u=0$ pour tout $\delta>0$ (test contre $\mathbb 1_{]\delta,1[}\in L^\infty$), donc $u=0$ ; mais le test contre $\mathbb 1$ donne $\int_0^1u=1$. Contradiction.

## Contre-exemple `ce-er-toute-suite` : Sous-suite et suite entière
Assertion : Dans un Hilbert, toute suite bornée converge faiblement.
Tâche : Pour $u_n=(-1)^nw$ avec $\|w\|=1$, calcule $(u_{2k},w)$ et $(u_{2k+1},w)$.
Vérification : {"kind":"rational-vector","prompt":"Valeurs de $(u_{2k},w)$ et $(u_{2k+1},w)$","expected":["1","-1"],"labels":["pair","impair"]}
Explication : Les sous-suites paire et impaire convergent faiblement vers $w$ et $-w$ : la suite entière ne converge pas.

## Contre-exemple `ce-er-forte` : Faible n’est pas fort
Assertion : Toute suite bornée d'un Hilbert admet une sous-suite fortement convergente.
Tâche : Pour une suite orthonormée $(e_n)$ et $n\neq m$, calcule $\|e_n-e_m\|^2$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\|e_n-e_m\\|^2$","expected":"2"}
Explication : Les termes sont deux à deux à distance $\sqrt2$ : aucune sous-suite n'est de Cauchy. Pourtant $e_n\rightharpoonup 0$ par l'inégalité de Bessel.

## Exercice facile `extraction-reflexive.facile` : Pourquoi $L^2(0,T;H^1_0)$ est réflexif

Énoncé : Soient $\Omega$ un ouvert de $\mathbb R^d$, $T>0$, $V=H^1_0(\Omega)$ muni du produit scalaire de $H^1(\Omega)$, et $E=L^2(0,T;V)$ muni de $(u,v)_E=\int_0^T(u(t),v(t))_V\,dt$. Dire pourquoi $E$ est réflexif : démontrer que l'injection canonique $J:E\to E''$, $J(u)(f)=f(u)$, est surjective. Expliquer pourquoi l'argument ne s'étend pas à $L^1(0,T;V)$.
Source : {"doc":"polycopie","pdfPage":41,"label":"Exercice 20, facile"} — prérequis : riesz

But : `fin` — usage : application

Nœuds :
- `h-V` (hypothese) : $V=H^1_0(\Omega)$, sous-espace fermé de $H^1(\Omega)$ muni de son produit scalaire, est un espace de Hilbert réel ; $T>0$.
- `d-E` (definition) : $E=L^2(0,T;V)$, muni de $(u,v)_E=\int_0^T(u(t),v(t))_V\,dt$.
- `e-ps` (consequence) : $(\cdot,\cdot)_E$ est un produit scalaire sur $E$, de norme associée $\|u\|_E=\|u\|_{L^2(0,T;V)}$.
- `e-complet` (consequence) : $E$ est complet.
- `e-hilbert` (consequence) : $E$ est un espace de Hilbert réel.
- `r-riesz` (application-theoreme) : $R:E\to E'$, $R(w)=(\cdot,w)_E$, est une bijection linéaire isométrique.
- `d-eta` (definition, locale) : Soit $\eta\in E''$.
- `r-compo` (consequence) : $w\mapsto\eta(R(w))$ est une forme linéaire continue sur $E$.
- `r-u` (application-theoreme) : Il existe $u\in E$ tel que $\eta(R(w))=(w,u)_E$ pour tout $w\in E$.
- `r-eval` (egalite) : Pour tout $f\in E'$ : $\eta(f)=f(u)$, c'est-à-dire $\eta=J(u)$.
- `fin` (conclusion) : $J:E\to E''$ est surjective : $E=L^2(0,T;H^1_0(\Omega))$ est réflexif.
- `x-L1` (consequence, DISTRACTEUR) : Par le même argument, $L^1(0,T;V)$ est réflexif.
- `x-separable` (consequence, DISTRACTEUR) : Tout espace de Banach séparable est réflexif.

Règles :
- `h-V` + `d-E` ⟹ `e-ps` par « Bilinéarité et symétrie héritées de $(\cdot,\cdot)_V$ ; $(u,u)_E=0$ impose $u(t)=0$ pour presque tout $t$. »
- `h-V` + `d-E` ⟹ `e-complet` par « Théorème de Riesz–Fischer pour les fonctions de carré intégrable à valeurs dans l'espace complet $V$. »
- `e-ps` + `e-complet` ⟹ `e-hilbert` par « Définition d’un espace de Hilbert : espace préhilbertien complet. »
- `e-hilbert` ⟹ `r-riesz` par « Théorème de représentation de Riesz dans $E$. [riesz] »
- `d-eta` + `r-riesz` ⟹ `r-compo` par « Composée de l'isométrie linéaire $R$ et de la forme linéaire continue $\eta$. »
- `r-compo` + `e-hilbert` ⟹ `r-u` par « Théorème de représentation de Riesz dans $E$. [riesz] »
- `r-u` + `r-riesz` ⟹ `r-eval` par « Pour $f\in E'$, écrire $f=R(w)$ : $\eta(f)=(w,u)_E=(u,w)_E=f(u)$. »
- `r-eval` + `d-eta` ⟹ `fin` par « Définition de la réflexivité : $J$ est surjective. »

Justifications sans règle (séduisantes ou fausses) : « C’est évident. » ; « Tout espace de Banach est réflexif. »

Pièges :
- `e-complet` par « C’est évident. » → a-justifier [justification-absente] : La complétude de $E$ se démontre : elle vient de celle de $V$, par le théorème de Riesz–Fischer vectoriel.
- `fin` par « Tout espace de Banach est réflexif. » → incorrect [extraction-reflexive-non-reflexif] : Beaucoup d’espaces de Banach usuels ne sont pas réflexifs ; ici la réflexivité vient de la structure hilbertienne. — Contre-exemple : Dans $L^1(]0,1[)$, $u_n=n\,\mathbb 1_{]0,1/n[}$ est bornée sans sous-suite faiblement convergente.
- `x-L1` → incorrect [extraction-reflexive-non-reflexif] : $L^1(0,T;V)$ n'est pas hilbertien, et il n'est pas réflexif : il contient une copie isométrique fermée de $L^1(0,T)$, et un sous-espace fermé d'un réflexif est réflexif. — Contre-exemple : Avec $\|v_0\|_V=1$ et $T\ge 1$, $u_n(t)=n\,\mathbb 1_{]0,1/n[}(t)\,v_0$ est bornée dans $L^1(0,T;V)$ ; une limite faible $u$ vérifierait $\int_\delta^Tu=0$ pour tout $\delta>0$, donc $u=0$, alors que $\int_0^Tu_n=v_0$.
- `x-separable` → incorrect [extraction-reflexive-non-reflexif] : Séparabilité et réflexivité sont indépendantes. — Contre-exemple : $L^1(]0,1[)$ est séparable et non réflexif ; $u_n=n\,\mathbb 1_{]0,1/n[}$ y est bornée sans sous-suite faiblement convergente.

Retraits :
- `h-V` (nécessaire) : Tout l'argument repose sur la structure hilbertienne de $E$, héritée de celle de $V$. — Contre-exemple : Pour $V=L^1(\Omega)$, $L^2(0,T;L^1(\Omega))$ contient les fonctions constantes en temps, copie fermée de $L^1(\Omega)$, qui n'est pas réflexif : $L^2(0,T;L^1(\Omega))$ ne l'est pas.

Calculs fermés : [{"kind":"choice","prompt":"Pour $T>0$ et $\\Omega$ ouvert borné, lesquels de ces espaces sont réflexifs ?","options":["$L^2(0,T;H^1_0(\\Omega))$","$L^1(0,T;H^1_0(\\Omega))$","$L^2(0,T;L^2(\\Omega))$","$L^\\infty(0,T;L^2(\\Omega))$"],"correct":[0,2],"explanation":"Les deux espaces $L^2$ à valeurs hilbertiennes sont des espaces de Hilbert. $L^1(0,T;H)$ et $L^\\infty(0,T;H)$ contiennent des copies fermées de $L^1(0,T)$ et de $L^\\infty(0,T)$, non réflexifs."}]

Solution :
**Structure hilbertienne.** $V=H^1_0(\Omega)$ est un sous-espace fermé de $H^1(\Omega)$, donc un espace de Hilbert. Sur $E=L^2(0,T;V)$, $(u,v)_E=\int_0^T(u(t),v(t))_V\,dt$ est un produit scalaire, et $E$ est complet par le théorème de Riesz–Fischer pour les fonctions de carré intégrable à valeurs dans l'espace complet $V$ : $E$ est un espace de Hilbert.

**Réflexivité d'un Hilbert.** Par Riesz, $R(w)=(\cdot,w)_E$ est une bijection linéaire isométrique de $E$ sur $E'$. Soit $\eta\in E''$ : $w\mapsto\eta(R(w))$ est une forme linéaire continue sur $E$, donc, par Riesz encore, il existe $u\in E$ tel que $\eta(R(w))=(w,u)_E$ pour tout $w$. Pour $f\in E'$, écrivons $f=R(w)$ : $\eta(f)=(w,u)_E=(u,w)_E=f(u)$. Ainsi $\eta=J(u)$ et $J$ est surjective.

**Pourquoi pas $L^1(0,T;V)$.** Cet espace contient la copie fermée $\{t\mapsto\varphi(t)v_0\}$ de $L^1(0,T)$, $\|v_0\|_V=1$. Or $L^1(0,T)$ n'est pas réflexif : $n\,\mathbb 1_{]0,1/n[}$ y est bornée sans sous-suite faiblement convergente. Un sous-espace fermé d'un espace réflexif étant réflexif, $L^1(0,T;V)$ ne l'est pas.

Indices :
1. Quelle structure, plus riche que celle d'un espace de Banach, porte $L^2(0,T;H^1_0(\Omega))$ ?
2. Un espace de Hilbert est réflexif : applique le théorème de Riesz deux fois, à $E$ puis à $w\mapsto\eta(R(w))$.
3. Pour $f=R(w)\in E'$, compare $\eta(f)$ et $f(u)$ en utilisant la symétrie du produit scalaire réel.

Erreurs fréquentes :
- Croire que tout espace de Banach, ou tout espace séparable, est réflexif.
- Oublier de justifier la complétude de $L^2(0,T;V)$.

Variante : Soit $E$ un espace de Banach réflexif et $F$ un sous-espace fermé de $E$. Montrer que $F$ est réflexif, et en déduire que $L^1(0,T;V)$ n'est pas réflexif.

Solution de la variante : Soit $\eta\in F''$. La forme $\tilde\eta(f)=\eta(f|_F)$ appartient à $E''$, donc $\tilde\eta=J_E(u)$ pour un $u\in E$ : $f(u)=\eta(f|_F)$ pour tout $f\in E'$. Si $u\notin F$, Hahn–Banach donne $f\in E'$ nulle sur $F$ avec $f(u)\neq 0$, alors que $\eta(f|_F)=\eta(0)=0$ : contradiction, donc $u\in F$. Pour $g\in F'$, un prolongement $f\in E'$ de $g$ (Hahn–Banach) donne $\eta(g)=f(u)=g(u)$ : $\eta=J_F(u)$. Comme $L^1(0,T;V)$ contient la copie fermée $\{\varphi v_0\}$ de $L^1(0,T)$, non réflexif, il n'est pas réflexif.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `extraction-reflexive.intermediaire` : Extraire une sous-suite faible dans $L^2(0,T;V)$

Énoncé : Soient $V$ un espace de Hilbert réel, $T>0$, $E=L^2(0,T;V)$ muni de $(u,v)_E=\int_0^T(u(t),v(t))_V\,dt$, et $(u_n)$ une suite de $E$ avec $\|u_n\|_E\le C$ pour tout $n$. Extraire une sous-suite convergeant faiblement dans $E$ vers un $u\in E$, expliciter cette convergence, et montrer que $\|u\|_E\le\liminf_k\|u_{n_k}\|_E\le C$.
Source : {"doc":"polycopie","pdfPage":41,"label":"Exercice 20, intermédiaire ; usage à la section 8.4 (p. PDF 32)"} — prérequis : riesz

But : `fin` — usage : application

Nœuds :
- `h-E` (hypothese) : $E=L^2(0,T;V)$, muni de $(u,v)_E=\int_0^T(u(t),v(t))_V\,dt$, est un espace de Hilbert réel.
- `h-borne` (hypothese) : $\|u_n\|_E\le C$ pour tout $n$.
- `a-refl` (consequence) : $E$ est réflexif.
- `a-ext` (application-theoreme) : Il existe une sous-suite $(u_{n_k})$ et $u\in E$ tels que $f(u_{n_k})\to f(u)$ pour tout $f\in E'$.
- `b-diag` (consequence) : Il existe une sous-suite $(u_{n_k})$ telle que $\big((u_{n_k},u_m)_E\big)_k$ converge pour tout $m$.
- `b-tout` (consequence) : Pour tout $w\in E$, $\big((u_{n_k},w)_E\big)_k$ converge.
- `b-forme` (consequence) : $\Lambda(w)=\lim_k(u_{n_k},w)_E$ est une forme linéaire sur $E$ avec $|\Lambda(w)|\le C\|w\|_E$ ; il existe $u\in E$ tel que $\Lambda(w)=(u,w)_E$.
- `c-test` (consequence) : $u_{n_k}\rightharpoonup u$ dans $E$ : $\int_0^T(u_{n_k}(t),w(t))_V\,dt\to\int_0^T(u(t),w(t))_V\,dt$ pour tout $w\in L^2(0,T;V)$.
- `lsc` (inegalite) : $\|u\|_E\le\liminf_k\|u_{n_k}\|_E\le C$.
- `fin` (conclusion) : Une sous-suite $(u_{n_k})$ converge faiblement dans $L^2(0,T;V)$ vers un $u$ tel que $\|u\|_{L^2(0,T;V)}\le C$.
- `x-forte` (consequence, DISTRACTEUR) : La sous-suite converge fortement : $\|u_{n_k}-u\|_E\to 0$.
- `x-toute` (consequence, DISTRACTEUR) : La suite entière $(u_n)$ converge faiblement vers $u$.
- `x-ponctuel` (consequence, DISTRACTEUR) : Pour presque tout $t$, $u_{n_k}(t)\rightharpoonup u(t)$ faiblement dans $V$.

Règles :
- `h-E` ⟹ `a-refl` par « Un espace de Hilbert est réflexif (Riesz appliqué deux fois). » (chemin theoreme)
- `a-refl` + `h-borne` ⟹ `a-ext` par « Extraction faible en espace réflexif. [extraction-reflexive] » (chemin theoreme)
- `a-ext` + `h-E` ⟹ `c-test` par « Pour $w\in E$, $f=(\cdot,w)_E$ appartient à $E'$ par Cauchy–Schwarz. » (chemin theoreme)
- `h-borne` + `h-E` ⟹ `b-diag` par « $|(u_n,u_m)_E|\le C\|u_m\|_E$ : Bolzano–Weierstrass pour chaque $m$, puis extraction diagonale. » (chemin hilbert)
- `b-diag` + `h-borne` + `h-E` ⟹ `b-tout` par « Combinaisons linéaires, densité dans $Y=\overline{\mathrm{Vect}}\{u_m\}$ avec la borne $C$, puis $(u_{n_k},w)_E=(u_{n_k},P_Yw)_E$ car $u_{n_k}\in Y$. » (chemin hilbert)
- `b-tout` + `h-borne` + `h-E` ⟹ `b-forme` par « Linéarité et majoration passent à la limite ; représentation de Riesz de $\Lambda$. [riesz] » (chemin hilbert)
- `b-forme` ⟹ `c-test` par « Définition de $\Lambda$ et écriture explicite du produit scalaire de $E$. » (chemin hilbert)
- `c-test` + `h-borne` ⟹ `lsc` par « $\|u\|_E^2=\lim_k(u_{n_k},u)_E\le\liminf_k\|u_{n_k}\|_E\,\|u\|_E$ (Cauchy–Schwarz), puis division si $u\neq 0$. [cauchy-schwarz] »
- `c-test` + `lsc` ⟹ `fin` par « Réunion de la convergence et de la borne. »

Justifications sans règle (séduisantes ou fausses) : « La boule de $E$ est compacte, donc une sous-suite converge en norme. »

Pièges :
- `a-ext` par « La boule de $E$ est compacte, donc une sous-suite converge en norme. » → incorrect [bornee-non-convergente] : En dimension infinie, la boule n’est pas compacte en norme : l’extraction ne donne qu’une convergence faible. — Contre-exemple : Avec $\|v_0\|_V=1$, $e_n(t)=\sqrt{2/T}\,\sin(n\pi t/T)\,v_0$ est orthonormée dans $E$ et $\|e_n-e_m\|_E^2=2$ pour $n\neq m$.
- `x-forte` → incorrect [faible-fort] : La convergence faible n’entraîne pas la convergence en norme. — Contre-exemple : La suite orthonormée $(e_n)$ ci-dessus vérifie $e_n\rightharpoonup 0$ (inégalité de Bessel) et $\|e_n\|_E=1$.
- `x-toute` → incorrect [existence-unicite] : L’extraction est indispensable : deux sous-suites peuvent avoir des limites faibles différentes. — Contre-exemple : $u_n=(-1)^nw$ avec $w\neq 0$ : $(u_{2k},w)_E=\|w\|_E^2$ et $(u_{2k+1},w)_E=-\|w\|_E^2$.
- `x-ponctuel` → incorrect [faible-fort] : La convergence faible dans un espace de Bochner ne donne aucune convergence à temps fixé. — Contre-exemple : $T=1$, $u_n(t)=\sin(2\pi nt)\,v_0$ : $u_n\rightharpoonup 0$ dans $E$. Si $\sin(2\pi n_kt)\to 0$ pour presque tout $t$, la convergence dominée donnerait $\int_0^1\sin^2(2\pi n_kt)\,dt\to 0$, alors que cette intégrale vaut $\tfrac12$.

Retraits :
- `h-borne` (nécessaire) : Une suite faiblement convergente est bornée : sans borne, aucune extraction faible n’est possible en général. — Contre-exemple : $u_n=nw$ avec $w\neq 0$ : $(u_n,w)_E=n\|w\|_E^2\to+\infty$ le long de toute sous-suite.
- `h-E` (nécessaire) : Les deux voies utilisent la réflexivité, ou la représentation de Riesz. — Contre-exemple : Dans $L^1(]0,1[)$, non réflexif, $u_n=n\,\mathbb 1_{]0,1/n[}$ est bornée sans sous-suite faiblement convergente.

Calculs fermés : [{"kind":"rational","prompt":"Pour la suite orthonormée $(e_n)$ de $E$ et $n\\neq m$, valeur de $\\|e_n-e_m\\|_E^2$","expected":"2"}]

Solution :
**Voie du théorème.** $E$ est un espace de Hilbert, donc réflexif. La suite étant bornée, le théorème d'extraction en espace réflexif fournit $(u_{n_k})$ et $u\in E$ avec $f(u_{n_k})\to f(u)$ pour tout $f\in E'$. Avec $f=(\cdot,w)_E$, cela s'écrit $\int_0^T(u_{n_k}(t),w(t))_V\,dt\to\int_0^T(u(t),w(t))_V\,dt$ pour tout $w\in L^2(0,T;V)$.

**Voie hilbertienne directe.** Comme $|(u_n,u_m)_E|\le C\|u_m\|_E$, le procédé diagonal donne une sous-suite telle que $(u_{n_k},u_m)_E$ converge pour tout $m$, puis pour tout $y\in Y=\overline{\mathrm{Vect}}\{u_m\}$ par linéarité et densité, la borne $C$ contrôlant l'approximation. Pour $w\in E$, $(u_{n_k},w)_E=(u_{n_k},P_Yw)_E$ converge. La limite $\Lambda(w)$ est linéaire, avec $|\Lambda(w)|\le C\|w\|_E$ ; Riesz la représente par $u\in E$.

**Semi-continuité.** $\|u\|_E^2=\lim_k(u_{n_k},u)_E\le\liminf_k\|u_{n_k}\|_E\,\|u\|_E$, d'où $\|u\|_E\le\liminf_k\|u_{n_k}\|_E\le C$.

**Ce qu'on n'obtient pas.** Ni convergence forte (suite orthonormée), ni convergence de toute la suite ($(-1)^nw$), ni convergence à $t$ fixé ($\sin(2\pi nt)v_0$).

Indices :
1. Quelle propriété de $L^2(0,T;V)$ autorise une extraction faible d'une suite bornée ?
2. Soit tu invoques le théorème d'extraction, soit tu extrais à la main : procédé diagonal sur $(u_{n},u_m)_E$, puis densité et projection orthogonale.
3. Pour la borne de $u$, teste la convergence faible contre $w=u$ et applique Cauchy–Schwarz.

Erreurs fréquentes :
- Conclure à une convergence forte à partir d’une borne uniforme.
- Affirmer la convergence de toute la suite, sans unicité de la limite.
- Écrire $\|u\|=\lim\|u_{n_k}\|$ au lieu d'une inégalité.

Variante : Avec les mêmes notations, on suppose que $V\hookrightarrow H\simeq H'\hookrightarrow V'$ est un triplet de Hilbert dense et continu, et de plus que $\|u_n'\|_{L^2(0,T;V')}\le C'$. Montrer qu'après une nouvelle extraction $u_{n_k}'\rightharpoonup g$ dans $L^2(0,T;V')$, puis que $g=u'$.

Solution de la variante : $L^2(0,T;V')$ est un espace de Hilbert, donc une nouvelle extraction donne $u_{n_k}'\rightharpoonup g$. Pour $v\in V$ et $\eta\in C^\infty_c(]0,T[)$, $\int_0^T\langle u_{n_k}',v\rangle\eta=-\int_0^T(u_{n_k},v)_H\eta'$. À gauche, $t\mapsto\eta(t)v$ appartient à $L^2(0,T;V)$, dual de $L^2(0,T;V')$ ; à droite, $w\mapsto\int_0^T(w,v)_H\eta'$ est linéaire continue sur $L^2(0,T;V)$. Les deux membres passent à la limite : $\int_0^T\langle g,v\rangle\eta=-\int_0^T(u,v)_H\eta'$, c'est-à-dire $g=u'$ au sens des distributions à valeurs dans $V'$ (polycopié, section 8.4).

Vérification : {"origin":"complement","review":"machine"}

## Exercice difficile `extraction-reflexive.difficile` : La limite faible ne passe pas au carré

Énoncé : Dans $H=L^2(]0,2\pi[)$, on pose $u_n(x)=\sin(nx)$, $n\ge 1$. Montrer que $u_n\rightharpoonup 0$ faiblement dans $H$, mais que $u_n^2$ ne converge pas faiblement vers $0^2=0$ : la convergence faible de $u_n$ ne donne pas celle de $u_n^2$ vers $u^2$. Identifier la limite faible de $u_n^2$.
Source : {"doc":"polycopie","pdfPage":41,"label":"Exercice 20, difficile ; exemple de la section 5.1 (p. PDF 20)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-H` (hypothese) : $H=L^2(]0,2\pi[)$ est un espace de Hilbert réel, de produit scalaire $(f,g)=\int_0^{2\pi}fg$, et $H\subset L^1(]0,2\pi[)$.
- `h-un` (hypothese) : L'intervalle étant borné, la fonction constante $\mathbb 1$ appartient à $H$.
- `d-u` (definition) : $u_n(x)=\sin(nx)$ pour $n\ge 1$.
- `o-ortho` (egalite, calcul rational) : $\int_0^{2\pi}\sin(nx)\sin(mx)\,dx=\pi\,\delta_{nm}$ pour $n,m\ge 1$ : $(u_n/\sqrt\pi)_n$ est orthonormée.
  - valeur attendue : "1"
- `o-bessel` (inegalite) : Pour tout $g\in H$ : $\sum_{n\ge 1}\tfrac1\pi(g,u_n)^2\le\|g\|_H^2$, donc $(g,u_n)\to 0$.
- `cv` (consequence) : $u_n\rightharpoonup 0$ faiblement dans $H$.
- `c-faible` (egalite, calcul rational) : $u_n^2=\tfrac12-\tfrac12\cos(2nx)\rightharpoonup\tfrac12$ faiblement dans $H$.
  - valeur attendue : "1/2"
- `c-test` (egalite) : $(u_n^2,\mathbb 1)=\int_0^{2\pi}\sin^2(nx)\,dx=\pi$ pour tout $n\ge 1$.
- `c-non` (consequence) : $u_n^2$ ne converge pas faiblement vers $0=0^2$.
- `fin` (conclusion) : $u_n\rightharpoonup 0$ alors que $u_n^2\rightharpoonup\tfrac12\neq 0^2$ : la convergence faible ne passe pas à la limite dans $s\mapsto s^2$.
- `x-carre` (consequence, DISTRACTEUR) : $u_n^2\rightharpoonup 0$ faiblement.
- `x-forte` (consequence, DISTRACTEUR) : Une sous-suite de $(u_n)$ converge fortement vers $0$ dans $H$.

Règles :
- `d-u` + `h-H` ⟹ `o-ortho` par « $\sin a\sin b=\tfrac12\big(\cos(a-b)-\cos(a+b)\big)$, et $\int_0^{2\pi}\cos(kx)\,dx=0$ pour $k\neq 0$. »
- `o-ortho` + `h-H` ⟹ `o-bessel` par « Inégalité de Bessel pour une famille orthonormée ; le terme général d’une série convergente tend vers 0. » (chemin bessel)
- `o-bessel` ⟹ `cv` par « Définition de la convergence faible dans $H$ (Riesz : $H'$ s'identifie à $H$). » (chemin bessel)
- `d-u` + `h-H` ⟹ `cv` par « Riemann–Lebesgue pour $g\in H\subset L^1$ : $\int_0^{2\pi}g(x)\sin(nx)\,dx\to 0$. [riemann-lebesgue] » (chemin riemann-lebesgue)
- `d-u` + `h-H` ⟹ `c-faible` par « Linéarisation $\sin^2=\tfrac12(1-\cos(2\cdot))$, puis Riemann–Lebesgue pour $\cos(2nx)$. [riemann-lebesgue] »
- `o-ortho` + `h-un` ⟹ `c-test` par « Test contre $g=\mathbb 1\in H$ et calcul de $\int_0^{2\pi}\sin^2(nx)\,dx$. »
- `c-test` ⟹ `c-non` par « Une limite faible nulle imposerait $(u_n^2,\mathbb 1)\to 0$. »
- `cv` + `c-faible` + `c-non` ⟹ `fin` par « Réunion des résultats. »

Justifications sans règle (séduisantes ou fausses) : « L'application $s\mapsto s^2$ est continue, donc elle conserve les limites faibles. »

Pièges :
- `x-carre` → incorrect [nonlinearite-limite-faible] : Une limite faible ne se compose pas avec une non-linéarité. — Contre-exemple : Contre $\mathbb 1\in H$ : $(u_n^2,\mathbb 1)=\pi$ pour tout $n$, et non $0$.
- `c-faible` par « L'application $s\mapsto s^2$ est continue, donc elle conserve les limites faibles. » → incorrect [nonlinearite-limite-faible] : Ce raisonnement donnerait $u_n^2\rightharpoonup 0$, ce qui est faux : la continuité de $s\mapsto s^2$ pour la norme ne dit rien de la topologie faible.
- `x-forte` → incorrect [faible-fort] : Une limite forte coïnciderait avec la limite faible, ici nulle. — Contre-exemple : $\|u_n\|_H^2=\pi$ pour tout $n$ : aucune sous-suite ne tend vers $0$ en norme.

Retraits :
- `h-un` (nécessaire) : Sur un domaine de mesure infinie, $\mathbb 1\notin L^2$ : le test qui révèle le défaut n'est plus disponible, et le phénomène dépend alors de la suite choisie. — Contre-exemple : Dans $L^2(\mathbb R)$, $w_n=\mathbb 1_{[n,n+1]}$ vérifie $w_n\rightharpoonup 0$ et $w_n^2=w_n\rightharpoonup 0$ : ici le carré passe à la limite.

Solution :
**Orthogonalité.** Pour $n,m\ge 1$, $\int_0^{2\pi}\sin(nx)\sin(mx)\,dx=\pi\,\delta_{nm}$ : la famille $(u_n/\sqrt\pi)$ est orthonormée dans $H$.

**Convergence faible.** Par Bessel, $\sum_n\tfrac1\pi(g,u_n)^2\le\|g\|_H^2$ pour tout $g\in H$, donc $(g,u_n)\to 0$ : $u_n\rightharpoonup 0$. Le lemme de Riemann–Lebesgue donne la même conclusion, puisque $H\subset L^1(]0,2\pi[)$.

**Le carré.** $u_n^2=\tfrac12-\tfrac12\cos(2nx)$ et, par Riemann–Lebesgue, $(\cos(2n\cdot),g)\to 0$ : $u_n^2\rightharpoonup\tfrac12$. En particulier, contre $\mathbb 1\in H$ : $(u_n^2,\mathbb 1)=\pi\not\to 0$. Donc $u_n^2$ ne converge pas faiblement vers $0=0^2$.

**Lecture.** La convergence faible capte les moyennes, pas les oscillations : la non-linéarité $s\mapsto s^2$ transforme l'oscillation en une moyenne non nulle. Aucune sous-suite de $(u_n)$ ne converge fortement, puisque $\|u_n\|_H^2=\pi$.

Indices :
1. Que signifie $u_n\rightharpoonup 0$ dans $H$, et quelle propriété de la famille des sinus le fournit ?
2. Pour le carré, linéarise : $\sin^2(nx)=\tfrac12-\tfrac12\cos(2nx)$.
3. Teste $u_n^2$ contre la fonction constante $\mathbb 1$ : que vaut $\int_0^{2\pi}\sin^2(nx)\,dx$ ?

Erreurs fréquentes :
- Écrire $\lim u_n^2=(\lim u_n)^2$ pour une limite faible.
- Confondre la convergence faible vers 0 et la convergence en norme vers 0.

Variante : Soit $\Omega$ un ouvert de $\mathbb R^d$. On suppose $u_n\rightharpoonup u$ dans $L^2(\Omega)$ et $u_n^2\rightharpoonup u^2$ faiblement dans $L^1(\Omega)$. Montrer que $u_n\to u$ fortement dans $L^2(\Omega)$. Qu'en déduit-on pour $\sin(nx)$ ?

Solution de la variante : La fonction $\mathbb 1$ appartient à $L^\infty(\Omega)=(L^1(\Omega))'$ : la convergence faible de $u_n^2$ donne $\|u_n\|_{L^2}^2=\int_\Omega u_n^2\to\int_\Omega u^2=\|u\|_{L^2}^2$. La convergence faible donne $(u_n,u)\to\|u\|^2$. Alors $\|u_n-u\|^2=\|u_n\|^2+\|u\|^2-2(u_n,u)\to 0$ : c'est la proposition de la section 5.1 du polycopié. Pour $\sin(nx)$, qui tend faiblement vers $0$ sans tendre fortement vers $0$, on en déduit que $\sin^2(nx)$ ne peut pas converger faiblement vers $0$.

Graphe de la variante :
But : `fin` — usage : application

Nœuds :
- `h-L2` (hypothese) : $(u_n)\subset L^2(\Omega)$, $u\in L^2(\Omega)$ et $u_n\rightharpoonup u$ dans $L^2(\Omega)$.
- `h-carre` (hypothese) : $u_n^2\rightharpoonup u^2$ faiblement dans $L^1(\Omega)$.
- `h-un` (hypothese) : La fonction constante $\mathbb 1$ appartient à $L^\infty(\Omega)=(L^1(\Omega))'$.
- `n-norme` (consequence) : $\|u_n\|_{L^2}^2=\int_\Omega u_n^2\to\int_\Omega u^2=\|u\|_{L^2}^2$.
- `p-ps` (consequence) : $(u_n,u)_{L^2}\to\|u\|_{L^2}^2$.
- `dev` (egalite) : $\|u_n-u\|_{L^2}^2=\|u_n\|_{L^2}^2+\|u\|_{L^2}^2-2(u_n,u)_{L^2}$.
- `fin` (conclusion) : $u_n\to u$ fortement dans $L^2(\Omega)$.
- `x-faible-seule` (consequence, DISTRACTEUR) : La seule convergence faible $u_n\rightharpoonup u$ dans $L^2(\Omega)$ entraîne $u_n\to u$ fortement.

Règles :
- `h-carre` + `h-un` ⟹ `n-norme` par « Test de la convergence faible dans $L^1$ contre $\mathbb 1\in L^\infty$. »
- `h-L2` ⟹ `p-ps` par « Test de la convergence faible dans $L^2$ contre $u$. »
- `h-L2` ⟹ `dev` par « Développement du carré de la norme hilbertienne. »
- `dev` + `n-norme` + `p-ps` ⟹ `fin` par « Passage à la limite : $\|u\|^2+\|u\|^2-2\|u\|^2=0$. »

Pièges :
- `x-faible-seule` → incorrect [faible-fort] : Il manque la convergence des normes : c’est elle que fournit l’hypothèse sur les carrés. — Contre-exemple : $\sin(n\cdot)\rightharpoonup 0$ dans $L^2(]0,2\pi[)$ et $\|\sin(n\cdot)\|^2=\pi$.

Retraits :
- `h-carre` (nécessaire) : Sans convergence des normes, la convergence faible ne donne pas la convergence forte. — Contre-exemple : $u_n=\sin(n\cdot)$ dans $L^2(]0,2\pi[)$ : $u_n\rightharpoonup 0$, $u_n^2\rightharpoonup\tfrac12$, et $\|u_n\|_{L^2}^2=\pi$.

Vérification : {"origin":"complement","review":"machine","notes":"Le polycopié donne l’exemple (p. PDF 20) sans démonstration ; la preuve par Bessel ou Riemann–Lebesgue est un complément."}