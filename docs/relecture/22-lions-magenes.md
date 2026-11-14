# 22. Lions–Magenes (`lions-magenes`) — polycopié p. PDF 21, section 5.4

## Fiche

Espaces : $V\hookrightarrow H\simeq H'\hookrightarrow V'$ : triplet de Hilbert réels ; $V$ s'injecte continûment et densément dans $H$, identifié à son dual par Riesz, d'où $H\hookrightarrow V'$. | $\langle\cdot,\cdot\rangle_{V',V}$ : dualité, qui prolonge le produit scalaire de $H$ : $\langle h,v\rangle_{V',V}=(h,v)_H$ pour $h\in H$, $v\in V$. | $u'$ : dérivée au sens des distributions sur $]0,T[$, à valeurs dans $V'$.

Hypothèses :
- $V\hookrightarrow H\simeq H'\hookrightarrow V'$ est un triplet de Hilbert dense et continu. — Sans elle : Sans densité, $H\to V'$ n'est plus injective : si $V=\mathrm{Vect}(e)$ dans $\ell^2$, tout $h\perp e$ a une image nulle dans $V'$.
- $u\in L^2(0,T;V)$.
- $u'\in L^2(0,T;V')$. — Sans elle : $u=\mathbb 1_{]T/2,T[}\,v$, $v\in V\setminus\{0\}$, appartient à $L^2(0,T;V)$ sans représentant continu : $\|u(t)\|_H^2$ saute de $0$ à $\|v\|_H^2$ en $T/2$.

Énoncé : Si $V\hookrightarrow H\simeq H'\hookrightarrow V'$ est un triplet de Hilbert dense et continu, et $u\in L^2(0,T;V)$, $u'\in L^2(0,T;V')$, alors $u$ admet un représentant dans $C([0,T];H)$ et
$$\frac12\frac{d}{dt}\|u(t)\|_H^2=\langle u'(t),u(t)\rangle_{V',V}\quad\text{p.p.}$$

Bilan : {"regularite":"$u$ admet un représentant dans $C([0,T];H)$, unique, ce qui donne un sens à $u(0)$ et $u(T)$ dans $H$.","autre":"Identité de dérivation presque partout, la fonction $t\\mapsto\\|u(t)\\|_H^2$ étant absolument continue."}

Preuve dans le polycopié : idee

Plan :
1. Prolonger $u$ au-delà de $[0,T]$ par réflexion, puis régulariser en temps par convolution : $u_\varepsilon\in C^1(\mathbb R;V)$, $u_\varepsilon\to u$ dans $L^2(V)$ et $u_\varepsilon'\to u'$ dans $L^2(V')$ sur $]0,T[$.
2. Pour une fonction régulière, $\tfrac{d}{dt}\|u_\varepsilon(t)\|_H^2=2(u_\varepsilon',u_\varepsilon)_H=2\langle u_\varepsilon',u_\varepsilon\rangle_{V',V}$.
3. Appliquée à $u_\varepsilon-u_\eta$, intégrée puis moyennée en temps, cette identité montre que $(u_\varepsilon)$ est de Cauchy dans $C([0,T];H)$.
4. La limite est un représentant continu de $u$ ; l'identité intégrée $\|u(t)\|_H^2=\|u(s)\|_H^2+2\int_s^t\langle u',u\rangle$ passe à la limite par la dualité $V',V$.

Vigilance :
- Le crochet $\langle u',u\rangle_{V',V}$ n'est pas un produit scalaire de $H$ : $u'(t)$ n'appartient pas à $H$ en général.
- L'identité s'entend avec $t\mapsto\|u(t)\|_H^2$ absolument continue : c'est ce qui autorise à l'intégrer entre deux instants.
- $u(0)$ n'a de sens que pour le représentant continu : une classe de $L^2(0,T;H)$ n'a pas de valeur en un point.

Vérification : {"origin":"polycopie","review":"machine"}

Définition « Triplet de Hilbert » : $V\hookrightarrow H\simeq H'\hookrightarrow V'$ : $V$ s'injecte continûment et densément dans $H$ ; $H$ est identifié à son dual, et $h\in H$ agit sur $V$ par $v\mapsto(h,v)_H$.

Définition « Dérivée dans $L^2(0,T;V')$ » : Pour $u\in L^2(0,T;V)$, $u'=g\in L^2(0,T;V')$ signifie $\int_0^T\varphi'u\,dt=-\int_0^T\varphi g\,dt$ dans $V'$ pour toute $\varphi\in C^\infty_c(]0,T[)$.

## Contre-exemple `ce-lm-l2-seul` : Sans dérivée dans $L^2(0,T;V')$
Assertion : Toute $u\in L^2(0,T;V)$ admet un représentant dans $C([0,T];H)$.
Tâche : $T=2$, $v\in V$ avec $\|v\|_H=1$, $u=\mathbb 1_{]1,2[}\,v$. Donne les limites de $\|u(t)\|_H$ quand $t\to 1^-$ et $t\to 1^+$.
Vérification : {"kind":"rational-vector","prompt":"Limites à gauche et à droite de $\\|u(t)\\|_H$ en $t=1$","expected":["0","1"],"labels":["gauche","droite"]}
Explication : Tout représentant coïncide presque partout avec $u$ ; un représentant continu aurait des limites égales à gauche et à droite de $1$, ce qui est impossible.

## Contre-exemple `ce-lm-derivee-seule` : Valeur initiale dans $V'$ seulement
Assertion : Si $u'\in L^2(0,T;V')$, alors $u(0)$ est défini dans $H$.
Tâche : $V=H^1_0(]0,1[)$, $H=L^2(]0,1[)$, $u\equiv\delta_{1/2}$, constante en temps. À quel espace appartient $u(0)$ ?
Vérification : {"kind":"choice","prompt":"Espace contenant $u(0)$","options":["$H^{-1}(]0,1[)$, mais pas $L^2(]0,1[)$","$L^2(]0,1[)$","$H^1_0(]0,1[)$","Aucun : $u(0)$ n'a pas de sens"],"correct":[0],"explanation":"$u'=0\\in L^2(0,T;V')$ et $u(0)=\\delta_{1/2}$, élément de $H^{-1}$ qui n'est pas une fonction de $L^2$ ; mais $u\\notin L^2(0,T;V)$."}
Explication : La distribution de Dirac en $1/2$ est continue sur $H^1_0(]0,1[)\subset C([0,1])$, sans être représentée par une fonction de $L^2$ : la seule régularité de la dérivée ne place pas la trace dans $H$.

## Contre-exemple `ce-lm-facteur` : Le facteur 1/2
Assertion : $\tfrac{d}{dt}\|u(t)\|_H^2=\langle u'(t),u(t)\rangle_{V',V}$.
Tâche : Pour $u(t)=t\,v$ avec $v\in V$ et $\|v\|_H=1$, calcule $\tfrac{d}{dt}\|u(t)\|_H^2$ en fonction de $t$.
Vérification : {"kind":"expr-equiv","prompt":"Valeur de $\\tfrac{d}{dt}\\|u(t)\\|_H^2$","expected":"2*t","vars":["t"]}
Explication : $\|u(t)\|_H^2=t^2$ a pour dérivée $2t$, tandis que $\langle u'(t),u(t)\rangle=(v,tv)_H=t$ : le facteur $\tfrac12$ est nécessaire.

## Exercice facile `lions-magenes.facile` : Définir $u'$ dans $L^2(0,T;V')$

Énoncé : Soient $V\hookrightarrow H\simeq H'\hookrightarrow V'$ un triplet de Hilbert réels, dense et continu, $T>0$ et $u\in L^2(0,T;V)$. Donner la définition exacte de « $u'\in L^2(0,T;V')$ » : préciser comment $u$ est vue dans $V'$, la classe des fonctions test et le sens de l'égalité ; montrer que la dérivée est unique, la calculer pour $u(t)=t^2v_0$, et montrer que des fonctions test sans support compact rendraient la définition fausse.
Source : {"doc":"polycopie","pdfPage":42,"label":"Exercice 22, facile ; section 8.4 (p. PDF 32)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-triplet` (hypothese) : $V\hookrightarrow H\simeq H'\hookrightarrow V'$ : $V$ s'injecte continûment dans $H$, avec image dense, et $H$ est identifié à son dual par Riesz.
- `h-u` (hypothese) : $u\in L^2(0,T;V)$.
- `i-iota` (consequence) : $\iota:H\to V'$, $\langle\iota h,v\rangle_{V',V}=(h,v)_H$, est linéaire continue et injective.
- `i-plonge` (consequence) : Par $V\hookrightarrow H\hookrightarrow V'$, $u\in L^2(0,T;V')$ ; pour $\varphi\in C^\infty_c(]0,T[)$, $\int_0^T\varphi'(t)\,u(t)\,dt$ est une intégrale de Bochner dans $V'$.
- `d-star` (definition, locale) : Soit $g\in L^2(0,T;V')$ vérifiant $(\star)$ : $\int_0^T\varphi'(t)\,u(t)\,dt=-\int_0^T\varphi(t)\,g(t)\,dt$ dans $V'$ pour toute $\varphi\in C^\infty_c(]0,T[)$.
- `s-scal` (egalite) : $(\star)$ équivaut à : pour toute $\varphi\in C^\infty_c(]0,T[)$ et tout $v\in V$, $\int_0^T\varphi'(t)\,(u(t),v)_H\,dt=-\int_0^T\varphi(t)\,\langle g(t),v\rangle_{V',V}\,dt$.
- `d-unic` (definition, locale) : Soient $g_1,g_2\in L^2(0,T;V')$ vérifiant $(\star)$, et $h=g_1-g_2$.
- `u-nul` (egalite) : $\int_0^T\varphi(t)\,h(t)\,dt=0$ dans $V'$ pour toute $\varphi\in C^\infty_c(]0,T[)$.
- `u-zero` (consequence) : $h=0$ presque partout : $g$ est unique, on la note $u'$.
- `e-calc` (egalite, calcul expr-equiv) : Pour $u(t)=t^2v_0$, $v_0\in V$ : $g(t)=2t\,v_0$ vérifie $(\star)$.
  - valeur attendue : "2*t"
- `t-supp` (consequence) : Pour $u\equiv v_0\in V\setminus\{0\}$, $g=0$ vérifie $(\star)$ ; mais pour $\varphi(t)=t$, sans support compact, $\int_0^T\varphi'u\,dt=Tv_0\neq 0$ : le support compact des fonctions test est indispensable.
- `fin` (conclusion) : « $u'\in L^2(0,T;V')$ » signifie : il existe $g\in L^2(0,T;V')$, unique, telle que $\int_0^T\varphi'u\,dt=-\int_0^T\varphi g\,dt$ dans $V'$ pour toute $\varphi\in C^\infty_c(]0,T[)$, $u$ étant vue dans $V'$ par $V\hookrightarrow H\hookrightarrow V'$ ; de façon équivalente, l'égalité testée contre chaque $v\in V$.
- `x-nonsupp` (consequence, DISTRACTEUR) : On peut prendre les fonctions test dans $C^\infty([0,T])$, sans condition de support.
- `x-V` (consequence, DISTRACTEUR) : La définition impose $u'(t)\in V$ pour presque tout $t$.
- `x-H` (consequence, DISTRACTEUR) : Pour presque tout $t$ et tout $v\in V$ : $\langle u'(t),v\rangle_{V',V}=(u'(t),v)_H$.

Règles :
- `h-triplet` ⟹ `i-iota` par « $|(h,v)_H|\le\|h\|_H\|v\|_H\le c\|h\|_H\|v\|_V$ ; si $(h,v)_H=0$ pour tout $v$ d'une partie dense de $H$, alors $h=0$. »
- `i-iota` + `h-u` ⟹ `i-plonge` par « Composée d'injections linéaires continues, appliquée presque partout en $t$. »
- `i-plonge` + `d-star` ⟹ `s-scal` par « Une forme linéaire continue $\langle\cdot,v\rangle_{V',V}$ commute avec l'intégrale de Bochner ; un élément de $V'$ est déterminé par ses valeurs sur $V$. »
- `d-unic` + `i-plonge` ⟹ `u-nul` par « Différence des deux égalités $(\star)$. »
- `u-nul` ⟹ `u-zero` par « Lemme fondamental vectoriel : une fonction de $L^1(0,T;V')$ d'intégrale nulle contre toute $\varphi\in C^\infty_c(]0,T[)$ est nulle presque partout (points de Lebesgue). »
- `i-plonge` ⟹ `e-calc` par « Intégration par parties scalaire : $\int_0^T\varphi'(t)\,t^2\,dt=-\int_0^T\varphi(t)\,2t\,dt$, les termes de bord s'annulant. »
- `i-plonge` ⟹ `t-supp` par « Calcul direct : $\int_0^T\varphi'=\varphi(T)-\varphi(0)$, nul pour un support compact, égal à $T$ pour $\varphi(t)=t$. »
- `s-scal` + `u-zero` + `e-calc` + `t-supp` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « Limite, dans $V$, des taux d'accroissement $\frac{u(t+h)-u(t)}{h}$ pour presque tout $t$. »

Pièges :
- `fin` par « Limite, dans $V$, des taux d'accroissement $\frac{u(t+h)-u(t)}{h}$ pour presque tout $t$. » → incorrect [lions-magenes-crochet] : La dérivée est définie au sens des distributions à valeurs dans $V'$ : $u(t)$ n'est défini que presque partout, et $u'(t)$ n'appartient pas à $V$ en général. — Contre-exemple : $V=H^1_0(]0,1[)$, $F(y)=\max(0,1-|y|)$, $u(t,x)=F(4x-2-t)$ pour $t\in]0,1[$ : $u\in L^2(0,1;V)$, mais $\partial_tu(t,\cdot)=-F'(4x-2-t)$ présente des sauts, donc n'appartient pas à $H^1_0$.
- `x-nonsupp` → incorrect [lions-magenes-crochet] : Sans support compact, des termes de bord apparaissent : la formule échoue déjà pour une fonction constante. — Contre-exemple : $u\equiv v_0\neq 0$, $u'=0$, et $\varphi(t)=t$ : $\int_0^T\varphi'u\,dt=Tv_0\neq 0=-\int_0^T\varphi\cdot 0\,dt$.
- `x-V` → incorrect [dual-identification] : La définition demande seulement $u'\in L^2(0,T;V')$ ; les valeurs de $u'$ peuvent sortir de $V$. — Contre-exemple : $u(t,x)=F(4x-2-t)$ avec $F(y)=\max(0,1-|y|)$ : $u\in L^2(0,1;H^1_0(]0,1[))$ et $\partial_tu(t,\cdot)$, fonction en escalier, n'est pas dans $H^1_0$.
- `x-H` → a-justifier [lions-magenes-crochet] : Le membre de droite n'a de sens que si $u'(t)\in H$, ce que la définition n'exige pas : le crochet est celui de la dualité $V',V$, qui ne coïncide avec $(\cdot,\cdot)_H$ que sur $H$.

Retraits :
- `h-triplet` (nécessaire) : Sans densité, $\iota:H\to V'$ n'est plus injective : $H$ ne s'identifie plus à un sous-espace de $V'$, et le triplet $V\hookrightarrow H\hookrightarrow V'$ de l'énoncé n'a plus lieu. La restriction de $\iota$ à $V$ reste injective, car $\langle\iota v,v\rangle=\|v\|_H^2$. — Contre-exemple : Si $V=\mathrm{Vect}(e)$ dans $H=\ell^2$, tout $h\perp e$ vérifie $\iota h=0$.

Solution :
**Identification.** L'application $\iota:H\to V'$, $\langle\iota h,v\rangle=(h,v)_H$, est continue car $|(h,v)_H|\le c\|h\|_H\|v\|_V$, et injective car $V$ est dense dans $H$. Par $V\hookrightarrow H\hookrightarrow V'$, $u\in L^2(0,T;V)$ est aussi une fonction de $L^2(0,T;V')$.

**Définition.** On dit que $u'\in L^2(0,T;V')$ s'il existe $g\in L^2(0,T;V')$ telle que $\int_0^T\varphi'(t)u(t)\,dt=-\int_0^T\varphi(t)g(t)\,dt$ dans $V'$ pour toute $\varphi\in C^\infty_c(]0,T[)$. Testée contre $v\in V$, c'est : $\int_0^T\varphi'(u,v)_H=-\int_0^T\varphi\langle g,v\rangle_{V',V}$.

**Unicité.** Si $g_1,g_2$ conviennent, $h=g_1-g_2$ vérifie $\int_0^T\varphi h=0$ pour toute $\varphi$ ; le lemme fondamental vectoriel donne $h=0$ presque partout.

**Exemple.** Pour $u(t)=t^2v_0$ : $\int_0^T\varphi'(t)t^2\,dt=-\int_0^T\varphi(t)\,2t\,dt$, donc $u'(t)=2t\,v_0$.

**Le support compact est indispensable.** Pour $u\equiv v_0\neq 0$, $u'=0$ ; avec $\varphi(t)=t$, on aurait $\int_0^T\varphi'u=Tv_0\neq 0$.

**Vigilance.** $u'(t)\in V'$ n'est en général ni dans $V$ ni dans $H$ : le crochet $\langle u'(t),v\rangle_{V',V}$ n'est pas un produit scalaire de $H$.

Indices :
1. Dans quel espace l'égalité définissante a-t-elle lieu, et comment $u$, à valeurs dans $V$, y est-elle vue ?
2. Écris l'intégration par parties contre $\varphi\in C^\infty_c(]0,T[)$, puis teste-la contre $v\in V$.
3. Pour l'unicité, la différence de deux dérivées est orthogonale à toute $\varphi$ ; pour le support, essaie $u$ constante et $\varphi(t)=t$.

Erreurs fréquentes :
- Utiliser des fonctions test sans support compact.
- Supposer $u'(t)\in H$ ou $u'(t)\in V$.
- Parler de « la » dérivée sans en démontrer l’unicité.

Variante : Soit $v_0\in H$ et $u(t)=|t-T/2|\,v_0$. Montrer que $u\in L^2(0,T;H)$ admet une dérivée dans $L^2(0,T;H)$, et la calculer.

Solution de la variante : Pour $\varphi\in C^\infty_c(]0,T[)$, on coupe en $T/2$ et on intègre par parties sur chaque morceau ; les termes en $T/2$ s'annulent car $|t-T/2|$ s'y annule, et ceux en $0$ et $T$ par le support de $\varphi$. On obtient $\int_0^T\varphi'(t)|t-T/2|\,dt=-\int_0^T\varphi(t)\operatorname{sign}(t-T/2)\,dt$, donc $u'(t)=\operatorname{sign}(t-T/2)\,v_0$, fonction de $L^2(0,T;H)$, discontinue en $T/2$ : une dérivée faible n'a pas à être continue.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `lions-magenes.intermediaire` : Pourquoi $u(0)$ est défini dans $H$

Énoncé : Soient $V\hookrightarrow H\simeq H'\hookrightarrow V'$ un triplet de Hilbert dense et continu, avec $\|v\|_H\le c\|v\|_V$, et $W=\{u\in L^2(0,T;V) : u'\in L^2(0,T;V')\}$ muni de $\|u\|_W^2=\|u\|_{L^2(0,T;V)}^2+\|u'\|_{L^2(0,T;V')}^2$. Justifier que, pour $u\in W$, la valeur $u(0)$ est définie dans $H$ indépendamment du représentant, et que $u\mapsto u(0)$ est linéaire continue de $W$ dans $H$.
Source : {"doc":"polycopie","pdfPage":42,"label":"Exercice 22, intermédiaire"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-triplet` (hypothese) : $V\hookrightarrow H\simeq H'\hookrightarrow V'$ est un triplet de Hilbert dense et continu, et $\|v\|_H\le c\|v\|_V$ pour tout $v\in V$.
- `h-u` (hypothese) : $u\in L^2(0,T;V)$ et $u'\in L^2(0,T;V')$.
- `thm` (application-theoreme) : Il existe $\tilde u\in C([0,T];H)$ égale à $u$ presque partout ; $t\mapsto\|\tilde u(t)\|_H^2$ est absolument continue et $\tfrac12\tfrac{d}{dt}\|\tilde u(t)\|_H^2=\langle u'(t),u(t)\rangle_{V',V}$ presque partout.
- `d-deux` (definition, locale) : Soient $\tilde u_1,\tilde u_2\in C([0,T];H)$ deux représentants continus de $u$.
- `uni` (consequence) : $\tilde u_1(t)=\tilde u_2(t)$ pour tout $t\in[0,T]$.
- `def0` (consequence) : $u(0):=\tilde u(0)\in H$ est bien défini, indépendamment du représentant.
- `ident` (egalite) : Pour $s,t\in[0,T]$ : $\|\tilde u(t)\|_H^2=\|\tilde u(s)\|_H^2+2\int_s^t\langle u',u\rangle_{V',V}\,dr$.
- `moy` (inegalite) : $\|\tilde u(t)\|_H^2\le\dfrac1T\int_0^T\|u(s)\|_H^2\,ds+2\|u'\|_{L^2(0,T;V')}\|u\|_{L^2(0,T;V)}$ pour tout $t$.
- `est` (inegalite, calcul expr-equiv) : $\|\tilde u(t)\|_H^2\le\big(1+\tfrac{c^2}{T}\big)\|u\|_W^2$ pour tout $t\in[0,T]$.
  - valeur attendue : "1+c^2/T"
- `fin` (conclusion) : $u(0)$ est la valeur en $0$ de l'unique représentant continu de $u$, et $\|u(0)\|_H\le(1+c^2/T)^{1/2}\|u\|_W$ : $u\mapsto u(0)$ est linéaire continue de $W$ dans $H$.
- `x-L2` (consequence, DISTRACTEUR) : $u\in L^2(0,T;H)$ suffit pour définir $u(0)\in H$.
- `x-Vprime` (consequence, DISTRACTEUR) : $u'\in L^2(0,T;V')$ suffit, sans hypothèse sur $u$, pour que $u(0)$ appartienne à $H$.
- `x-V` (consequence, DISTRACTEUR) : Pour $u\in W$, on a toujours $u(0)\in V$.

Règles :
- `h-triplet` + `h-u` ⟹ `thm` par « Théorème de Lions–Magenes. [lions-magenes] »
- `d-deux` ⟹ `uni` par « $\{t : \tilde u_1(t)\neq\tilde u_2(t)\}$ est un ouvert de $[0,T]$, négligeable : il est vide. »
- `thm` + `uni` ⟹ `def0` par « Évaluation en 0 du représentant continu, qui est unique. »
- `thm` ⟹ `ident` par « Une fonction absolument continue est l'intégrale de sa dérivée presque partout. »
- `ident` ⟹ `moy` par « Majoration $|\langle u',u\rangle|\le\|u'\|_{V'}\|u\|_V$, Cauchy–Schwarz en temps, puis moyenne en $s$ sur $[0,T]$. »
- `moy` + `h-triplet` ⟹ `est` par « $\|u(s)\|_H\le c\|u(s)\|_V$ et $2ab\le a^2+b^2$. »
- `def0` + `est` ⟹ `fin` par « Réunion de la définition et de l’estimation ; linéarité de l’évaluation. »

Justifications sans règle (séduisantes ou fausses) : « Compacité de l'injection $V\hookrightarrow H$. »

Pièges :
- `thm` par « Compacité de l'injection $V\hookrightarrow H$. » → incorrect [hypotheses-theoreme] : Lions–Magenes ne suppose aucune compacité : seulement un triplet dense et continu, et les deux régularités de u.
- `x-L2` → incorrect [valeur-initiale] : Un élément de $L^2(0,T;H)$ est une classe modulo les ensembles négligeables, et $\{0\}$ en est un ; de plus l'évaluation en $0$ n'est pas continue pour cette norme. — Contre-exemple : $u_n(t)=\max(1-nt,0)\,v$ : $\|u_n\|_{L^2(0,T;H)}\to 0$ alors que $u_n(0)=v$.
- `x-Vprime` → incorrect [valeur-initiale] : $u'\in L^2(0,T;V')$ seule donne une valeur initiale dans $V'$, pas dans $H$ : il faut coupler avec $u\in L^2(0,T;V)$. — Contre-exemple : $V=H^1_0(]0,1[)$ : $u\equiv\delta_{1/2}$, constante, vérifie $u'=0$, et $u(0)=\delta_{1/2}\in H^{-1}\setminus L^2$.
- `x-V` → incorrect [lions-magenes-representant] : La trace en $0$ d'un élément de $W$ décrit tout $H$, pas seulement $V$. — Contre-exemple : $H=L^2(]0,1[)$, $V=H^1_0$, $\varphi_k=\sqrt2\sin(k\pi x)$, $\lambda_k=(k\pi)^2$ : pour $h=\sum_kh_k\varphi_k\in H\setminus V$, $u(t)=\sum_kh_ke^{-\lambda_kt}\varphi_k$ appartient à $W$, avec $\|u\|_W^2\le\|h\|_H^2$, et $u(0)=h$.

Retraits :
- `h-u` (nécessaire) : Sans régularité en temps, il n'y a ni représentant continu ni trace continue. — Contre-exemple : $u=\mathbb 1_{]T/2,T[}\,v$, $v\in V\setminus\{0\}$ : $u\in L^2(0,T;V)$ n'a pas de représentant continu ; et $u_n(t)=\max(1-nt,0)\,v$ tend vers $0$ dans $L^2(0,T;V)$ avec $u_n(0)=v$.

Calculs fermés : [{"kind":"rational","prompt":"Pour $T=2$ et $c=2$, valeur de la constante $1+c^2/T$","expected":"3"}]

Solution :
**Représentant continu.** Lions–Magenes fournit $\tilde u\in C([0,T];H)$ égale à $u$ presque partout. Deux représentants continus coïncident partout : l'ensemble où ils diffèrent est ouvert dans $[0,T]$ et négligeable, donc vide. On pose $u(0)=\tilde u(0)\in H$.

**Estimation.** La fonction $t\mapsto\|\tilde u(t)\|_H^2$ étant absolument continue, $\|\tilde u(t)\|_H^2=\|\tilde u(s)\|_H^2+2\int_s^t\langle u',u\rangle$. Avec $|\langle u',u\rangle|\le\|u'\|_{V'}\|u\|_V$ et Cauchy–Schwarz en temps : $\|\tilde u(t)\|_H^2\le\|\tilde u(s)\|_H^2+2\|u'\|_{L^2(V')}\|u\|_{L^2(V)}$. En moyennant en $s$ sur $[0,T]$, puis avec $\|u\|_H\le c\|u\|_V$ et $2ab\le a^2+b^2$ :
$$\|\tilde u(t)\|_H^2\le\tfrac{c^2}{T}\|u\|_{L^2(V)}^2+\|u'\|_{L^2(V')}^2+\|u\|_{L^2(V)}^2\le\big(1+\tfrac{c^2}{T}\big)\|u\|_W^2.$$
L'évaluation en $0$ est donc linéaire continue de $W$ dans $H$.

**Ce qu'il faut les deux hypothèses.** $u\in L^2(0,T;H)$ seule ne définit pas $u(0)$ ; $u'\in L^2(0,T;V')$ seule ne place $u(0)$ que dans $V'$ ; et $u(0)$ n'est pas dans $V$ en général.

Indices :
1. Un élément de $L^2(0,T;V)$ est une classe : qu'est-ce qui permet de choisir un représentant privilégié ?
2. Lions–Magenes donne un représentant continu à valeurs dans $H$ ; montre qu'il est unique, puis intègre l'identité de dérivation entre $s$ et $t$.
3. Moyenne en $s$ sur $[0,T]$ : le terme $\|\tilde u(s)\|_H^2$ devient $\frac1T\int_0^T\|u\|_H^2$.

Erreurs fréquentes :
- Évaluer en $0$ un élément de $L^2(0,T;H)$.
- Placer $u(0)$ dans $V$, ou seulement dans $V'$.

Variante : Avec les mêmes notations, montrer que pour $u,v\in W$ et $0\le s\le t\le T$ : $(u(t),v(t))_H-(u(s),v(s))_H=\int_s^t\big(\langle u',v\rangle_{V',V}+\langle v',u\rangle_{V',V}\big)\,dr$.

Solution de la variante : On applique l'identité de Lions–Magenes à $u+v$ et à $u-v$, qui appartiennent à $W$, et l'on soustrait : $\|u+v\|_H^2-\|u-v\|_H^2=4(u,v)_H$, tandis que $\langle(u+v)',u+v\rangle-\langle(u-v)',u-v\rangle=2\langle u',v\rangle+2\langle v',u\rangle$. L'intégration entre $s$ et $t$ donne la formule d'intégration par parties.

Vérification : {"origin":"complement","review":"machine"}

## Exercice difficile `lions-magenes.difficile` : Unicité d’une solution faible d’évolution

Énoncé : Soient $V\hookrightarrow H\simeq H'\hookrightarrow V'$ un triplet de Hilbert réels, dense et continu, $a:V\times V\to\mathbb R$ bilinéaire continue avec $a(v,v)\ge\alpha\|v\|_V^2$ ($\alpha>0$), $f\in L^2(0,T;V')$ et $u_0\in H$. Démontrer, en utilisant $\tfrac12\big(\|u\|_H^2\big)'=\langle u',u\rangle_{V',V}$, qu'il existe au plus une $u\in L^2(0,T;V)$, $u'\in L^2(0,T;V')$, telle que $\langle u'(t),v\rangle_{V',V}+a(u(t),v)=\langle f(t),v\rangle_{V',V}$ pour tout $v\in V$ et presque tout $t$, avec $u(0)=u_0$ dans $H$.
Source : {"doc":"polycopie","pdfPage":42,"label":"Exercice 22, difficile ; section 8.6 (p. PDF 33)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-triplet` (hypothese) : $V\hookrightarrow H\simeq H'\hookrightarrow V'$ est un triplet de Hilbert réels, dense et continu.
- `h-a` (hypothese) : $a$ est bilinéaire continue sur $V$ et $a(v,v)\ge\alpha\|v\|_V^2$ pour tout $v\in V$, avec $\alpha>0$.
- `h-sol` (hypothese) : $u_1,u_2\in L^2(0,T;V)$, $u_1',u_2'\in L^2(0,T;V')$ vérifient l'équation pour tout $v\in V$ et presque tout $t$, et $u_1(0)=u_2(0)=u_0$ dans $H$.
- `d-w` (definition) : $w=u_1-u_2$, et $A:V\to V'$ défini par $\langle Az,v\rangle_{V',V}=a(z,v)$.
- `w-eq` (egalite) : $w\in L^2(0,T;V)$, $w'\in L^2(0,T;V')$, et $\langle w'(t),v\rangle+a(w(t),v)=0$ pour tout $v\in V$ et presque tout $t$.
- `w-init` (egalite) : $w(0)=0$ dans $H$.
- `w-Vp` (egalite) : $w'(t)+Aw(t)=0$ dans $V'$ pour presque tout $t$, le négligeable ne dépendant pas de $v$.
- `lm` (application-theoreme) : $t\mapsto\|w(t)\|_H^2$ est absolument continue et $\tfrac12\tfrac{d}{dt}\|w(t)\|_H^2=\langle w'(t),w(t)\rangle_{V',V}$ presque partout.
- `test` (egalite) : Pour presque tout $t$ : $\tfrac12\tfrac{d}{dt}\|w(t)\|_H^2+a(w(t),w(t))=0$.
- `integ` (egalite) : Pour tout $t\in[0,T]$ : $\tfrac12\|w(t)\|_H^2+\int_0^ta(w,w)\,ds=\tfrac12\|w(0)\|_H^2=0$.
- `coer` (inegalite) : Pour tout $t\in[0,T]$ : $\tfrac12\|w(t)\|_H^2+\alpha\int_0^t\|w(s)\|_V^2\,ds\le 0$.
- `fin` (conclusion) : $w=0$ : la solution faible est unique.
- `x-test-deriv` (consequence, DISTRACTEUR) : Pour toute solution faible $u$, quel que soit le second membre $f\in L^2(0,T;V')$, on peut tester l'équation par $v=u'(t)$, qui appartient à $V$.
- `x-produit-H` (consequence, DISTRACTEUR) : $\langle w'(t),w(t)\rangle_{V',V}=(w'(t),w(t))_H$ pour presque tout $t$.

Règles :
- `h-sol` + `d-w` ⟹ `w-eq` par « Linéarité : différence des deux équations, et $W$ est un espace vectoriel. »
- `h-sol` + `h-triplet` + `d-w` ⟹ `w-init` par « Les deux traces sont définies dans $H$ (représentants continus) et égales à $u_0$. »
- `w-eq` + `h-a` + `d-w` ⟹ `w-Vp` par « $w'+Aw\in L^2(0,T;V')$ ; ses valeurs sont presque toutes dans un sous-espace séparable de $V'$, qu'une famille dénombrable de $v_j\in V$ suffit à tester : un seul négligeable convient. »
- `h-triplet` + `w-eq` ⟹ `lm` par « Théorème de Lions–Magenes appliqué à $w$. [lions-magenes] »
- `w-Vp` + `lm` ⟹ `test` par « On évalue l'identité de $V'$ sur $w(t)\in V$, puis on remplace $\langle w',w\rangle$ grâce à Lions–Magenes. »
- `test` + `lm` + `w-init` ⟹ `integ` par « Intégration de 0 à t d’une dérivée de fonction absolument continue, puis condition initiale. »
- `integ` + `h-a` ⟹ `coer` par « Coercivité : $a(w,w)\ge\alpha\|w\|_V^2$. »
- `coer` ⟹ `fin` par « Deux termes positifs de somme négative sont nuls : $\|w(t)\|_H=0$ pour tout $t$. »

Justifications sans règle (séduisantes ou fausses) : « Règle de dérivation du produit scalaire de $H$ : $\tfrac{d}{dt}\|w\|_H^2=2(w',w)_H$. »

Pièges :
- `lm` par « Règle de dérivation du produit scalaire de $H$ : $\tfrac{d}{dt}\|w\|_H^2=2(w',w)_H$. » → incorrect [lions-magenes-crochet] : $w'(t)$ n'appartient pas à $H$ en général : la dérivation classique du produit scalaire de $H$ ne s'applique pas. C'est exactement ce que fournit Lions–Magenes.
- `x-produit-H` → a-justifier [lions-magenes-crochet] : Le membre de droite suppose $w'(t)\in H$, ce qui n'est pas acquis : seul le crochet de dualité $V',V$ a un sens.
- `x-test-deriv` → incorrect [lions-magenes-crochet] : Les fonctions test doivent appartenir à $V$ ; $u'(t)$ n'est en général qu'un élément de $V'$. — Contre-exemple : $u(t,x)=F(4x-2-t)$ avec $F(y)=\max(0,1-|y|)$ appartient à $L^2(0,1;H^1_0(]0,1[))$, avec $u'\in L^2(0,1;V')$ : c'est la solution faible de second membre $f=u'+Au$, et $\partial_tu(t,\cdot)\notin H^1_0$.

Retraits :
- `w-init` (nécessaire) : Sans condition initiale, l’équation seule ne détermine pas la solution. — Contre-exemple : $V=H^1_0(]0,1[)$, $H=L^2$, $a(u,v)=\int_0^1u'v'$, $f=0$ : pour tout $k\in\mathbb R$, $u_k(t)=k\,e^{-\pi^2t}\sin(\pi x)$ est solution faible.
- `h-a` (nécessaire) : Sans signe sur $a(w,w)$, l'identité intégrée ne donne plus la décroissance de $\|w(t)\|_H$ ; il faut alors un autre argument (Grönwall, sous une hypothèse de Gårding). — Contre-exemple : $V=H=\mathbb R$, $a(u,v)=-uv$ : $w(t)=e^tw(0)$ vérifie $w'+Aw=0$ et $|w(t)|>|w(0)|$ pour $t>0$ si $w(0)\neq 0$.

Calculs fermés : [{"kind":"expr-equiv","prompt":"Pour $w(t)=t\\,v$ avec $v\\in V$ et $\\|v\\|_H=1$, valeur de $\\langle w'(t),w(t)\\rangle_{V',V}$ en fonction de $t$","expected":"t","vars":["t"]}]

Solution :
**Réduction.** $w=u_1-u_2$ vérifie $w\in L^2(0,T;V)$, $w'\in L^2(0,T;V')$, $\langle w',v\rangle+a(w,v)=0$ pour tout $v\in V$ et presque tout $t$, et $w(0)=0$ dans $H$, les traces étant définies grâce à Lions–Magenes.

**Un seul négligeable.** Avec $\langle Az,v\rangle=a(z,v)$, la fonction $w'+Aw$ appartient à $L^2(0,T;V')$ et chacun de ses crochets avec $v\in V$ est nul presque partout. Ses valeurs étant presque toutes dans un sous-espace séparable de $V'$, une famille dénombrable de tests suffit : $w'(t)+Aw(t)=0$ dans $V'$ pour presque tout $t$. On peut donc évaluer en $v=w(t)$.

**Identité de Lions–Magenes.** $t\mapsto\|w(t)\|_H^2$ est absolument continue et $\tfrac12\tfrac{d}{dt}\|w\|_H^2=\langle w',w\rangle$ presque partout. D'où $\tfrac12\tfrac{d}{dt}\|w\|_H^2+a(w,w)=0$, puis, en intégrant (polycopié, section 8.6) :
$$\tfrac12\|w(t)\|_H^2+\int_0^ta(w,w)\,ds=\tfrac12\|w(0)\|_H^2=0.$$

**Conclusion.** Par coercivité, $\tfrac12\|w(t)\|_H^2+\alpha\int_0^t\|w\|_V^2\le 0$ : les deux termes sont nuls, donc $w=0$.

**Vigilance.** On ne teste pas par $w'(t)$, qui n'est pas dans $V$, et $\langle w',w\rangle$ n'est pas un produit scalaire de $H$.

Indices :
1. Quelle équation vérifie la différence de deux solutions, et avec quelle condition initiale ?
2. Teste par $v=w(t)$ : le terme $\langle w',w\rangle$ est une dérivée, à condition de disposer du bon théorème.
3. Intègre $\tfrac12\tfrac{d}{dt}\|w\|_H^2+a(w,w)=0$ de $0$ à $t$, puis utilise $w(0)=0$ et la coercivité.

Erreurs fréquentes :
- Dériver $\|w\|_H^2$ comme si $w'$ était à valeurs dans $H$.
- Tester l'équation par $w'(t)$, qui n'est pas dans $V$.
- Oublier la condition initiale, sans laquelle l’unicité est fausse.

Variante : Même question lorsque $a$ vérifie seulement l'inégalité de Gårding $a(v,v)+\lambda\|v\|_H^2\ge\alpha\|v\|_V^2$, avec $\lambda\ge 0$ et $\alpha>0$.

Solution de la variante : Pour $w=u_1-u_2$, on obtient comme avant $\tfrac12\tfrac{d}{dt}\|w\|_H^2+a(w,w)=0$ presque partout, donc $\tfrac12\tfrac{d}{dt}\|w\|_H^2\le\lambda\|w\|_H^2$. La fonction $e^{-2\lambda t}\|w(t)\|_H^2$ est absolument continue, de dérivée $e^{-2\lambda t}\big(\tfrac{d}{dt}\|w\|_H^2-2\lambda\|w\|_H^2\big)\le 0$ : elle décroît, donc $e^{-2\lambda t}\|w(t)\|_H^2\le\|w(0)\|_H^2=0$, et $w=0$.

Graphe de la variante :
But : `fin` — usage : application

Nœuds :
- `h-triplet` (hypothese) : $V\hookrightarrow H\simeq H'\hookrightarrow V'$ est un triplet de Hilbert réels, dense et continu.
- `h-garding` (hypothese) : $a(v,v)+\lambda\|v\|_H^2\ge\alpha\|v\|_V^2$ pour tout $v\in V$, avec $\lambda\ge 0$, $\alpha>0$.
- `h-w` (hypothese) : $w\in L^2(0,T;V)$, $w'\in L^2(0,T;V')$, $w'(t)+Aw(t)=0$ dans $V'$ pour presque tout $t$, et $w(0)=0$.
- `lm` (application-theoreme) : $t\mapsto\|w(t)\|_H^2$ est absolument continue et $\tfrac12\tfrac{d}{dt}\|w\|_H^2=\langle w',w\rangle_{V',V}=-a(w,w)$ presque partout.
- `maj` (inegalite) : $\tfrac12\tfrac{d}{dt}\|w(t)\|_H^2\le\lambda\|w(t)\|_H^2$ presque partout.
- `facteur` (inegalite) : $\tfrac{d}{dt}\big(e^{-2\lambda t}\|w(t)\|_H^2\big)\le 0$ presque partout.
- `decr` (inegalite) : $e^{-2\lambda t}\|w(t)\|_H^2\le\|w(0)\|_H^2=0$ pour tout $t\in[0,T]$.
- `fin` (conclusion) : $w=0$ : unicité sous l'hypothèse de Gårding.
- `x-direct` (consequence, DISTRACTEUR) : Sous la seule hypothèse de Gårding, toute solution de $w'+Aw=0$, quelle que soit sa valeur initiale, vérifie $\tfrac{d}{dt}\|w(t)\|_H^2\le 0$ presque partout.

Règles :
- `h-triplet` + `h-w` ⟹ `lm` par « Lions–Magenes appliqué à $w$, puis évaluation de l'équation sur $w(t)$. [lions-magenes] »
- `lm` + `h-garding` ⟹ `maj` par « $-a(w,w)\le\lambda\|w\|_H^2-\alpha\|w\|_V^2\le\lambda\|w\|_H^2$. »
- `maj` + `lm` ⟹ `facteur` par « Dérivée d'un produit de fonctions absolument continues : $e^{-2\lambda t}\big(\tfrac{d}{dt}\|w\|_H^2-2\lambda\|w\|_H^2\big)$. »
- `facteur` + `h-w` ⟹ `decr` par « Une fonction absolument continue de dérivée négative presque partout est décroissante ; condition initiale nulle. »
- `decr` ⟹ `fin` par « $e^{-2\lambda t}>0$ et une norme au carré négative est nulle. »

Pièges :
- `x-direct` → incorrect [hypotheses-theoreme] : Sous Gårding, $a(w,w)$ peut être négatif : seul $\tfrac12\tfrac{d}{dt}\|w\|_H^2\le\lambda\|w\|_H^2$ est acquis, d'où le facteur $e^{-2\lambda t}$. — Contre-exemple : $V=H=\mathbb R$, $a(u,v)=-uv$ vérifie Gårding avec $\lambda=2$, $\alpha=1$ ; $w(t)=e^tw_0$ résout $w'+Aw=0$ et $|w|^2$ croît si $w_0\neq 0$.

Retraits :
- `h-garding` (nécessaire) : Sans minoration de $a(w,w)$, la dérivée de $\|w\|_H^2$ n'est plus contrôlée par $\|w\|_H^2$. — Contre-exemple : $V=H^1_0(]0,1[)$, $H=L^2(]0,1[)$, $a(u,v)=-\int_0^1\partial_xu\,\partial_xv$, qui ne vérifie aucune inégalité de Gårding : $w_k(t)=e^{k^2\pi^2t}\sin(k\pi x)$ vérifie $w_k'+Aw_k=0$ et $\tfrac12\tfrac{d}{dt}\|w_k\|_H^2=k^2\pi^2\|w_k\|_H^2$, si bien qu'aucune constante $\lambda$ ne convient pour tous les $k$.

Vérification : {"origin":"polycopie","review":"machine"}