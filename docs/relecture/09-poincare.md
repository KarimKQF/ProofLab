# 9. Inégalité de Poincaré (`poincare`) — polycopié p. PDF 12, section 3.3

## Fiche

Espaces : $\Omega\subset\mathbb R^d$ : ouvert borné. | $H^1_0(\Omega)$ : fermeture de $C^\infty_c(\Omega)$ dans $H^1(\Omega)$, muni de la norme usuelle $\|u\|^2_{H^1}=\|u\|^2_{L^2}+\|\nabla u\|^2_{L^2}$. | $\|\nabla u\|_{L^2(\Omega)}$ : norme de $\nabla u$ dans $L^2(\Omega)^d$.

Hypothèses :
- $\Omega$ est borné. — Sans elle : Sur $\Omega=\mathbb R$, pour $\chi\in C^\infty_c(\mathbb R)$ non nulle et $u_n(x)=\chi(x/n)$ : $\|u_n\|_{L^2}=n\,\frac{\|\chi\|_{L^2}}{\|\chi'\|_{L^2}}\,\|u_n'\|_{L^2}$, donc aucune constante ne convient.
- $u\in H^1_0(\Omega)$. — Sans elle : Sur $H^1(\Omega)$, l'inégalité est fausse : $u\equiv 1$ vérifie $\|u\|_{L^2}=|\Omega|^{1/2}>0$ et $\nabla u=0$.

Énoncé : Si $\Omega$ est borné, il existe $C>0$ tel que
$$\|u\|_{L^2(\Omega)}\le C\|\nabla u\|_{L^2(\Omega)}\qquad\forall u\in H^1_0(\Omega).$$
Sur $H^1_0(\Omega)$, la norme $u\mapsto\|\nabla u\|_{L^2}$ est donc équivalente à la norme usuelle de $H^1$.

Bilan : {"existence":"Il existe une constante $C>0$ ne dépendant que de $\\Omega$ : si $\\Omega\\subset\\,]a_1,b_1[\\times\\dots\\times]a_d,b_d[$, la démonstration fournit $C=b_1-a_1$, sans prétention d'optimalité.","autre":"Sur $H^1_0(\\Omega)$ : $\\|\\nabla u\\|_{L^2}\\le\\|u\\|_{H^1}\\le\\sqrt{1+C^2}\\,\\|\\nabla u\\|_{L^2}$."}

Preuve dans le polycopié : complete

Plan :
1. Pour $u\in C^\infty_c(\Omega)$, prolongée par zéro, enfermer $\Omega$ dans un pavé $]a_1,b_1[\times\dots\times]a_d,b_d[$.
2. Intégrer selon $x_1$ : $u(x)=\int_{a_1}^{x_1}\partial_1u(s,x_2,\dots,x_d)\,ds$.
3. Cauchy–Schwarz : $|u(x)|^2\le(b_1-a_1)\int_{a_1}^{b_1}|\partial_1u(s,x')|^2\,ds$.
4. Intégrer sur le pavé, puis prendre la racine : $\|u\|_{L^2}\le(b_1-a_1)\|\partial_1u\|_{L^2}\le(b_1-a_1)\|\nabla u\|_{L^2}$.
5. Passer à tout $H^1_0(\Omega)$ par densité de $C^\infty_c(\Omega)$ pour la norme de $H^1$ : les deux membres passent à la limite.

Vigilance :
- L'inégalité est fausse sur $H^1(\Omega)$ : les constantes ont un gradient nul.
- La constante fournie par la démonstration est admissible ; elle n’est pas annoncée comme optimale.
- Le passage de $C^\infty_c(\Omega)$ à $H^1_0(\Omega)$ se fait par densité pour la norme de $H^1$ : la densité dans $L^2$ ne suffit pas.
- Ne pas confondre avec Poincaré–Wirtinger, qui porte sur $u-u_\Omega$ pour $u\in H^1(\Omega)$.

Vérification : {"origin":"polycopie","review":"machine"}

Définition « Espace $H^1_0(\Omega)$ » : $H^1_0(\Omega)$ est la fermeture de $C^\infty_c(\Omega)$ dans $H^1(\Omega)$ : c'est un sous-espace fermé de $H^1(\Omega)$, mais en général pas un sous-espace fermé de $L^2(\Omega)$.

Définition « Espace $H^{-1}(\Omega)$ » : $H^{-1}(\Omega)=\big(H^1_0(\Omega)\big)'$. Si $\Omega$ est borné, $H^1_0(\Omega)\hookrightarrow L^2(\Omega)\hookrightarrow H^{-1}(\Omega)$, avec injections continues et denses, $L^2$ étant identifié à son dual. Les éléments de $H^{-1}(\Omega)$ ne sont pas forcément des fonctions de $L^2$.

Définition « Normes équivalentes » : Deux normes $N_1$ et $N_2$ sur un espace vectoriel $E$ sont équivalentes s'il existe $\alpha,\beta>0$ tels que $\alpha N_1(x)\le N_2(x)\le\beta N_1(x)$ pour tout $x\in E$.

## Contre-exemple `ce-poincare-h1` : Sans condition au bord
Assertion : Pour $\Omega$ borné, il existe $C>0$ tel que $\|u\|_{L^2}\le C\|\nabla u\|_{L^2}$ pour tout $u\in H^1(\Omega)$.
Tâche : Sur $\Omega=]0,1[$, on teste $u\equiv 1$. Que vaut $\|u'\|_{L^2}$ ?
Vérification : {"kind":"rational","prompt":"Valeur de $\\|u'\\|_{L^2}$","expected":"0"}
Explication : $u\equiv 1\in H^1(]0,1[)$, $\|u\|_{L^2}=1$ et $u'=0$ : aucune constante $C$ ne convient.

## Contre-exemple `ce-poincare-non-borne` : Ouvert non borné
Assertion : L'inégalité de Poincaré vaut sur $H^1_0(\mathbb R)$.
Tâche : Sur $\mathbb R$, soit $\chi\in C^\infty_c(\mathbb R)$ non nulle, $q=\|\chi\|^2_{L^2}/\|\chi'\|^2_{L^2}$ et $u_n(x)=\chi(x/n)$. Exprime $\|u_n\|^2_{L^2}/\|u_n'\|^2_{L^2}$ en fonction de $n$ et $q$.
Vérification : {"kind":"expr-equiv","prompt":"Quotient en fonction de $n$ et $q$","expected":"q*n^2","vars":["n","q"]}
Explication : $\|u_n\|^2_{L^2}=n\|\chi\|^2_{L^2}$ et $\|u_n'\|^2_{L^2}=n^{-1}\|\chi'\|^2_{L^2}$ : le quotient vaut $qn^2\to+\infty$, donc aucune constante ne convient.

## Contre-exemple `ce-poincare-optimale` : Constante admissible et constante optimale
Assertion : Sur $]0,1[$, la constante $\frac1{\sqrt2}$, obtenue en intégrant $|u(x)|^2\le x\|u'\|^2_{L^2}$, est la meilleure possible.
Tâche : En combinant $|u(x)|^2\le x\|u'\|^2_{L^2}$ et $|u(x)|^2\le(1-x)\|u'\|^2_{L^2}$ (intégration depuis $1$), on obtient $|u(x)|^2\le\min(x,1-x)\|u'\|^2_{L^2}$. Calcule $\int_0^1\min(x,1-x)\,dx$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\int_0^1\\min(x,1-x)\\,dx$","expected":"1/4"}
Explication : On obtient $\|u\|^2_{L^2}\le\frac14\|u'\|^2_{L^2}$ : la constante $\frac12<\frac1{\sqrt2}$ convient aussi, donc $\frac1{\sqrt2}$ n'est pas la meilleure. Ce calcul n'identifie pas pour autant la meilleure constante.

## Exercice facile `poincare.facile` : Inégalité de Poincaré sur $]0,1[$

Énoncé : Montrer qu'il existe une constante $C>0$, indépendante de $u$, telle que $\|u\|_{L^2(]0,1[)}\le C\|u'\|_{L^2(]0,1[)}$ pour tout $u\in H^1_0(]0,1[)$. On raisonnera d'abord sur $C^\infty_c(]0,1[)$, puis par densité.
Source : {"doc":"polycopie","pdfPage":12,"label":"Démonstration de la section 3.3 ; exercice 9, facile (p. PDF 39)"} — prérequis : —

But : `fin` — usage : demonstration

Nœuds :
- `d-H10` (definition) : $H^1_0(]0,1[)$ est la fermeture de $C^\infty_c(]0,1[)$ dans $H^1(]0,1[)$, normé par $\|v\|^2_{H^1}=\|v\|^2_{L^2}+\|v'\|^2_{L^2}$.
- `d-phi` (definition, locale) : Soit $\varphi\in C^\infty_c(]0,1[)$, prolongée par $0$ à $[0,1]$.
- `d-u` (definition, locale) : Soit $u\in H^1_0(]0,1[)$.
- `zero` (egalite) : $\varphi(0)=0$.
- `ftc` (egalite) : Pour tout $x\in[0,1]$ : $\varphi(x)=\int_0^x\varphi'(s)\,ds$.
- `cs` (inegalite) : Pour tout $x\in[0,1]$ : $|\varphi(x)|^2\le x\int_0^x|\varphi'(s)|^2\,ds\le x\,\|\varphi'\|^2_{L^2}$.
- `int1` (inegalite) : $\|\varphi\|^2_{L^2}\le\|\varphi'\|^2_{L^2}$.
- `int2` (inegalite, calcul rational) : $\|\varphi\|^2_{L^2}\le\frac12\|\varphi'\|^2_{L^2}$.
  - valeur attendue : "1/2"
- `ineg-phi` (inegalite) : Pour tout $\varphi\in C^\infty_c(]0,1[)$ : $\|\varphi\|_{L^2}\le\|\varphi'\|_{L^2}$.
- `suite` (consequence) : Il existe $(\varphi_n)\subset C^\infty_c(]0,1[)$ telle que $\varphi_n\to u$ dans $H^1(]0,1[)$.
- `ineg-u` (inegalite) : $\|u\|_{L^2}\le\|u'\|_{L^2}$.
- `fin` (conclusion) : Il existe $C>0$, indépendante de $u$, telle que $\|u\|_{L^2}\le C\|u'\|_{L^2}$ pour tout $u\in H^1_0(]0,1[)$ : $C=1$ convient.
- `x-H1` (inegalite, DISTRACTEUR) : Pour tout $u\in H^1(]0,1[)$ : $\|u\|_{L^2}\le\|u'\|_{L^2}$.
- `x-optimale` (consequence, DISTRACTEUR) : La constante $\frac1{\sqrt2}$ est la plus petite constante admissible sur $]0,1[$.
- `x-quant` (consequence, DISTRACTEUR) : Il suffit d'établir : pour chaque $u\in H^1_0(]0,1[)$, il existe $C_u>0$, pouvant dépendre de $u$, tel que $\|u\|_{L^2}\le C_u\|u'\|_{L^2}$.

Règles :
- `d-phi` ⟹ `zero` par « Le support de $\varphi$ est un compact de $]0,1[$ : $\varphi$ est nulle au voisinage de $0$. »
- `d-phi` + `zero` ⟹ `ftc` par « Théorème fondamental du calcul intégral sur $[0,x]$, avec $\varphi(0)=0$. [theoreme-fondamental] »
- `ftc` ⟹ `cs` par « Cauchy–Schwarz sur $[0,x]$ pour les fonctions $1$ et $\varphi'$, puis $\int_0^x\le\int_0^1$. [cauchy-schwarz] »
- `cs` ⟹ `int1` par « Majoration de $x$ par $1$, puis intégration en $x$ sur $]0,1[$. » (chemin grossier)
- `int1` ⟹ `ineg-phi` par « Racine carrée d'une inégalité entre réels positifs ($\frac12\le 1$ pour la majoration fine). » (chemin grossier)
- `cs` ⟹ `int2` par « Intégration en $x$ sur $]0,1[$ de la majoration $x\,\|\varphi'\|^2_{L^2}$. » (chemin precis)
- `int2` ⟹ `ineg-phi` par « Racine carrée d'une inégalité entre réels positifs ($\frac12\le 1$ pour la majoration fine). » (chemin precis)
- `d-H10` + `d-u` ⟹ `suite` par « Définition de $H^1_0(]0,1[)$ comme fermeture dans $H^1$. »
- `ineg-phi` + `suite` ⟹ `ineg-u` par « Les deux membres convergent, car $\varphi_n\to u$ et $\varphi_n'\to u'$ dans $L^2$ ; passage à la limite dans une inégalité large. »
- `ineg-u` ⟹ `fin` par « $C=1$ est un témoin, choisi indépendamment de $u$. »

Justifications sans règle (séduisantes ou fausses) : « $C^\infty_c(]0,1[)$ est dense dans $L^2(]0,1[)$ : l'inégalité s'étend donc à $H^1_0(]0,1[)$. » ; « Cauchy–Schwarz donne $\left|\int_0^xf\right|^2\le\int_0^x|f|^2$. » ; « Théorème de trace : $u$ s'annule aux extrémités. » ; « Inégalité de Poincaré. »

Pièges :
- `x-H1` → incorrect [poincare-condition-bord] : La preuve utilise $\varphi(0)=0$, que rien ne garantit pour $u\in H^1(]0,1[)$ : sans condition au bord, l'inégalité tombe. — Contre-exemple : $u\equiv 1$ : $\|u\|_{L^2}=1$ et $\|u'\|_{L^2}=0$.
- `x-optimale` → incorrect [poincare-constante] : L’argument fournit une constante admissible, non la meilleure. — Contre-exemple : En intégrant aussi depuis $1$ : $|\varphi(x)|^2\le\min(x,1-x)\,\|\varphi'\|^2_{L^2}$, d'où $\|\varphi\|^2_{L^2}\le\frac14\|\varphi'\|^2_{L^2}$ : la constante $\frac12<\frac1{\sqrt2}$ convient aussi.
- `x-quant` → incorrect [quantificateurs] : L'énoncé demande une constante choisie avant $u$ : $\exists C\,\forall u$. L'assertion $\forall u\,\exists C_u$ est bien plus faible. — Contre-exemple : Sur $\mathbb R$, toute $u\in C^\infty_c(\mathbb R)$ non nulle vérifie l'inégalité avec $C_u=\|u\|_{L^2}/\|u'\|_{L^2}$, mais aucune constante uniforme n'existe : pour $u_n(x)=\chi(x/n)$, le quotient vaut $n\|\chi\|_{L^2}/\|\chi'\|_{L^2}$.
- `ineg-u` par « $C^\infty_c(]0,1[)$ est dense dans $L^2(]0,1[)$ : l'inégalité s'étend donc à $H^1_0(]0,1[)$. » → incorrect [poincare-densite-h1] : La densité dans $L^2$ ne contrôle pas les dérivées : il faut approcher $u$ dans $H^1$ pour faire passer les deux membres à la limite. — Contre-exemple : Pour $\theta\in C^\infty_c(]0,1[)$ non nulle, $\psi_n=\frac1n\sin(n^2x)\,\theta$ tend vers $0$ dans $L^2$, alors que $\|\psi_n'\|_{L^2}\to+\infty$.
- `cs` par « Cauchy–Schwarz donne $\left|\int_0^xf\right|^2\le\int_0^x|f|^2$. » → incorrect [poincare-constante] : Cauchy–Schwarz sur $[0,x]$ fait apparaître la longueur de l'intervalle : $\left|\int_0^xf\right|^2\le x\int_0^x|f|^2$. Sans ce facteur, l'inégalité est fausse en général. — Contre-exemple : Sur $[0,2]$ avec $f=1$ : $\left|\int_0^2f\right|^2=4>2=\int_0^2|f|^2$.
- `ftc` par « Théorème de trace : $u$ s'annule aux extrémités. » → incorrect [utilisation-prematuree] : Le théorème de trace n'est pas disponible ici, et il est inutile : on travaille sur $\varphi\in C^\infty_c(]0,1[)$, nulle près de $0$, puis on passe à $H^1_0$ par densité.
- `fin` par « Inégalité de Poincaré. » → incorrect [circularite] : Invoquer l’inégalité de Poincaré revient à supposer ce qu’il faut démontrer.

Retraits :
- `zero` (nécessaire) : La représentation $\varphi(x)=\int_0^x\varphi'$ repose sur l'annulation en $0$ : sans condition au bord, l'inégalité tombe. — Contre-exemple : $u\equiv 1\in H^1(]0,1[)$ : $\|u\|_{L^2}=1$ et $\|u'\|_{L^2}=0$, donc aucune constante ne convient.
- `suite` (nécessaire) : L'inégalité n'est établie que sur $C^\infty_c(]0,1[)$ ; c'est l'approximation dans $H^1$ qui l'étend à $u$. — Contre-exemple : $u\equiv 1$ n'est limite dans $H^1(]0,1[)$ d'aucune suite de $C^\infty_c(]0,1[)$ (cette convergence entraîne la convergence uniforme sur $[0,1]$, et ces fonctions s'annulent en $0$), et l'inégalité est fausse pour $u$.

Solution :
**Fonctions tests.** Soit $\varphi\in C^\infty_c(]0,1[)$, prolongée par $0$. Son support est un compact de $]0,1[$, donc $\varphi(0)=0$ et $\varphi(x)=\int_0^x\varphi'(s)\,ds$ pour $x\in[0,1]$. Cauchy–Schwarz sur $[0,x]$ donne
$$|\varphi(x)|^2\le x\int_0^x|\varphi'(s)|^2\,ds\le x\,\|\varphi'\|^2_{L^2}.$$
En majorant $x$ par $1$ et en intégrant sur $]0,1[$, $\|\varphi\|^2_{L^2}\le\|\varphi'\|^2_{L^2}$ : c'est la constante $b_1-a_1=1$ de la démonstration du polycopié. En intégrant exactement ($\int_0^1x\,dx=\frac12$), on obtient la majoration plus fine $\|\varphi\|^2_{L^2}\le\frac12\|\varphi'\|^2_{L^2}$.

**Densité.** Soit $u\in H^1_0(]0,1[)$ et $\varphi_n\in C^\infty_c(]0,1[)$ avec $\varphi_n\to u$ dans $H^1$. Alors $\varphi_n\to u$ et $\varphi_n'\to u'$ dans $L^2$, donc les normes convergent, et le passage à la limite dans $\|\varphi_n\|_{L^2}\le\|\varphi_n'\|_{L^2}$ donne $\|u\|_{L^2}\le\|u'\|_{L^2}$. La constante $C=1$ convient, indépendamment de $u$.

**Points de vigilance.** La constante est choisie avant $u$. Aucune optimalité n'est affirmée : $1$, $\frac1{\sqrt2}$ et même $\frac12$ (en intégrant depuis les deux bords) sont des constantes admissibles. Sur $H^1(]0,1[)$, l'inégalité est fausse : $u\equiv 1$.

Indices :
1. Pour une fonction nulle en $0$, comment exprimer $\varphi(x)$ à l'aide de $\varphi'$ ?
2. Écris $\varphi(x)=\int_0^x\varphi'(s)\,ds$, applique Cauchy–Schwarz sur $[0,x]$ et intègre en $x$ ; traite d'abord $C^\infty_c(]0,1[)$, puis passe à $H^1_0$.
3. $|\varphi(x)|^2\le x\|\varphi'\|^2_{L^2}\le\|\varphi'\|^2_{L^2}$. Pour $u\in H^1_0$, prends $\varphi_n\to u$ dans $H^1$ : les deux membres convergent.

Erreurs fréquentes :
- Appliquer l'inégalité à $u\in H^1(]0,1[)$ sans condition au bord.
- Passer à la limite avec une approximation dans $L^2$ seulement.
- Présenter la constante obtenue comme optimale.
- Laisser la constante dépendre de $u$.

Variante : Soit $L>0$. Montrer que $\|u\|_{L^2(]0,L[)}\le L\,\|u'\|_{L^2(]0,L[)}$ pour tout $u\in H^1_0(]0,L[)$.

Solution de la variante : Pour $\varphi\in C^\infty_c(]0,L[)$ et $x\in[0,L]$ : $\varphi(x)=\int_0^x\varphi'$, donc $|\varphi(x)|^2\le x\int_0^x|\varphi'|^2\le L\|\varphi'\|^2_{L^2}$. En intégrant sur $]0,L[$ : $\|\varphi\|^2_{L^2}\le L^2\|\varphi'\|^2_{L^2}$. Par densité de $C^\infty_c(]0,L[)$ dans $H^1_0(]0,L[)$ pour la norme de $H^1$, l'inégalité s'étend à tout $u\in H^1_0(]0,L[)$. La constante dépend de $L$ : pour $L>\pi$, $u(x)=\sin(\pi x/L)$ vérifie $\|u\|_{L^2}=\frac L\pi\|u'\|_{L^2}>\|u'\|_{L^2}$, si bien qu'aucune constante indépendante de $L$, par exemple $1$, ne convient pour tout $L$.

Graphe de la variante :
But : `fin` — usage : demonstration

Nœuds :
- `d-H10` (definition) : $H^1_0(]0,L[)$ est la fermeture de $C^\infty_c(]0,L[)$ dans $H^1(]0,L[)$.
- `d-phi` (definition, locale) : Soit $\varphi\in C^\infty_c(]0,L[)$, prolongée par $0$ à $[0,L]$.
- `d-u` (definition, locale) : Soit $u\in H^1_0(]0,L[)$.
- `ftc` (egalite) : Pour tout $x\in[0,L]$ : $\varphi(x)=\int_0^x\varphi'(s)\,ds$.
- `cs` (inegalite) : Pour tout $x\in[0,L]$ : $|\varphi(x)|^2\le x\int_0^x|\varphi'(s)|^2\,ds\le L\,\|\varphi'\|^2_{L^2}$.
- `int` (inegalite) : Pour tout $\varphi\in C^\infty_c(]0,L[)$ : $\|\varphi\|_{L^2}\le L\,\|\varphi'\|_{L^2}$.
- `suite` (consequence) : Il existe $(\varphi_n)\subset C^\infty_c(]0,L[)$ telle que $\varphi_n\to u$ dans $H^1(]0,L[)$.
- `fin` (conclusion) : $\|u\|_{L^2}\le L\,\|u'\|_{L^2}$ pour tout $u\in H^1_0(]0,L[)$.
- `x-sans-facteur` (inegalite, DISTRACTEUR) : Quel que soit $L>0$, pour tout $x\in[0,L]$ : $|\varphi(x)|^2\le\int_0^x|\varphi'(s)|^2\,ds$.
- `x-sans-constante` (inegalite, DISTRACTEUR) : Pour tout $L>0$ et tout $u\in H^1_0(]0,L[)$ : $\|u\|_{L^2}\le\|u'\|_{L^2}$.

Règles :
- `d-phi` ⟹ `ftc` par « $\varphi$ est nulle près de $0$ ; théorème fondamental du calcul intégral. [theoreme-fondamental] »
- `ftc` ⟹ `cs` par « Cauchy–Schwarz sur $[0,x]$, puis $x\le L$ et $\int_0^x\le\int_0^L$. [cauchy-schwarz] »
- `cs` ⟹ `int` par « Intégration en $x$ sur $]0,L[$, intervalle de longueur $L$, puis racine carrée. »
- `d-H10` + `d-u` ⟹ `suite` par « Définition de $H^1_0(]0,L[)$ comme fermeture dans $H^1$. »
- `int` + `suite` ⟹ `fin` par « Les deux membres convergent quand $\varphi_n\to u$ dans $H^1$ ; passage à la limite dans une inégalité large. »

Justifications sans règle (séduisantes ou fausses) : « Cauchy–Schwarz sans facteur : $\left|\int_0^xf\right|^2\le\int_0^x|f|^2$. »

Pièges :
- `x-sans-facteur` → incorrect [poincare-constante] : Cauchy–Schwarz sur $[0,x]$ produit le facteur $x$ ; il ne peut pas être omis dès que $x>1$. — Contre-exemple : Sur $]0,4[$, $T(s)=\min(s,4-s)$ appartient à $H^1_0(]0,4[)$ et $|T(2)|^2=4>2=\int_0^2|T'|^2$ ; en approchant $T$ dans $H^1$, donc uniformément, par des fonctions de $C^\infty_c(]0,4[)$, l'inégalité tombe aussi pour une fonction test.
- `x-sans-constante` → incorrect [poincare-constante] : La constante dépend de la longueur de l’intervalle. — Contre-exemple : Pour $L>\pi$ et $u(x)=\sin(\pi x/L)$ : $\|u\|_{L^2}=\frac L\pi\|u'\|_{L^2}>\|u'\|_{L^2}$.
- `cs` par « Cauchy–Schwarz sans facteur : $\left|\int_0^xf\right|^2\le\int_0^x|f|^2$. » → incorrect [poincare-constante] : Cette inégalité est fausse sur un intervalle de longueur supérieure à $1$ : il manque le facteur $x$. — Contre-exemple : Sur $[0,2]$ avec $f=1$ : $4>2$.

Retraits :
- `suite` (nécessaire) : Sans approximation par $C^\infty_c(]0,L[)$ dans $H^1$, l'inégalité ne s'étend pas. — Contre-exemple : $u\equiv 1\in H^1(]0,L[)$ n'est pas dans $H^1_0(]0,L[)$, et $\|u\|_{L^2}=\sqrt L>0=\|u'\|_{L^2}$.

Vérification : {"origin":"polycopie","review":"machine"}

## Exercice intermediaire `poincare.intermediaire` : $\|\nabla u\|_{L^2}$ est une norme équivalente sur $H^1_0(\Omega)$

Énoncé : Soit $\Omega\subset\mathbb R^d$ un ouvert borné. Montrer que $N(u)=\|\nabla u\|_{L^2(\Omega)}$ définit une norme sur $H^1_0(\Omega)$, équivalente à la norme usuelle $\|u\|_{H^1}=\big(\|u\|^2_{L^2}+\|\nabla u\|^2_{L^2}\big)^{1/2}$.
Source : {"doc":"polycopie","pdfPage":12,"label":"Section 3.3 ; exercice 9, intermédiaire (p. PDF 39)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-omega` (hypothese) : $\Omega\subset\mathbb R^d$ est un ouvert borné.
- `d-N` (definition) : Pour $u\in H^1_0(\Omega)$ : $N(u)=\|\nabla u\|_{L^2(\Omega)}$ et $\|u\|^2_{H^1}=\|u\|^2_{L^2}+N(u)^2$.
- `d-zero` (definition, locale) : Soit $u\in H^1_0(\Omega)$ tel que $N(u)=0$.
- `poinc` (application-theoreme) : Il existe $C>0$ tel que $\|v\|_{L^2}\le C\,N(v)$ pour tout $v\in H^1_0(\Omega)$.
- `semi` (consequence) : $N$ est une semi-norme : $N(u+v)\le N(u)+N(v)$ et $N(\lambda u)=|\lambda|\,N(u)$.
- `zero` (consequence) : $\|u\|_{L^2}\le C\cdot 0$, donc $u=0$.
- `norme` (consequence) : $N$ est une norme sur $H^1_0(\Omega)$.
- `maj` (inegalite) : Pour tout $u\in H^1_0(\Omega)$ : $N(u)\le\|u\|_{H^1}$.
- `min` (inegalite, calcul expr-equiv) : Pour tout $u\in H^1_0(\Omega)$ : $\|u\|^2_{H^1}\le(1+C^2)\,N(u)^2$.
  - valeur attendue : "1+C^2"
- `fin` (conclusion) : $N$ est une norme sur $H^1_0(\Omega)$, et $N(u)\le\|u\|_{H^1}\le\sqrt{1+C^2}\,N(u)$ : elle est équivalente à la norme usuelle.
- `x-H1` (consequence, DISTRACTEUR) : $N$ est une norme sur $H^1(\Omega)$ tout entier.
- `x-unilateral` (consequence, DISTRACTEUR) : L'inégalité $N(u)\le\|u\|_{H^1}$ suffit à établir l'équivalence des deux normes.
- `x-c-un` (inegalite, DISTRACTEUR) : Pour tout ouvert borné $\Omega$ et tout $u\in H^1_0(\Omega)$ : $\|u\|_{L^2}\le N(u)$.

Règles :
- `h-omega` ⟹ `poinc` par « Inégalité de Poincaré sur un ouvert borné. [poincare] »
- `d-N` ⟹ `semi` par « Linéarité de $u\mapsto\nabla u$ et propriétés de la norme de $L^2(\Omega)^d$. »
- `d-zero` + `poinc` ⟹ `zero` par « Inégalité de Poincaré appliquée à $u$, puis séparation de la norme de $L^2$. »
- `semi` + `zero` ⟹ `norme` par « Une semi-norme qui ne s'annule qu'en $0$ est une norme. »
- `d-N` ⟹ `maj` par « $\|u\|^2_{H^1}=\|u\|^2_{L^2}+N(u)^2\ge N(u)^2$. »
- `d-N` + `poinc` ⟹ `min` par « $\|u\|^2_{L^2}\le C^2N(u)^2$, que l'on ajoute à $N(u)^2$. »
- `norme` + `maj` + `min` ⟹ `fin` par « Définition de l'équivalence des normes : deux inégalités, à constantes indépendantes de $u$. »

Justifications sans règle (séduisantes ou fausses) : « Un gradient nul force $u$ à être constante, et la condition au bord annule cette constante. » ; « On peut prendre $C=1$ dans l'inégalité de Poincaré. »

Pièges :
- `x-H1` → incorrect [poincare-condition-bord] : Sur $H^1(\Omega)$, les constantes ont un gradient nul : $N$ n'y sépare pas les points. — Contre-exemple : $u\equiv 1\in H^1(\Omega)$ ($\Omega$ borné) : $N(u)=0$ et $u\neq 0$.
- `x-unilateral` → incorrect [hypotheses-theoreme] : L'équivalence demande deux inégalités. $N\le\|\cdot\|_{H^1}$ est le sens facile ; c'est l'autre sens qui utilise Poincaré. — Contre-exemple : Sur $H^1(\Omega)$, on a aussi $N(u)\le\|u\|_{H^1}$, et pourtant $N$ n'y est même pas une norme : $N(1)=0$.
- `x-c-un` → incorrect [poincare-constante] : La constante de Poincaré dépend de $\Omega$ et ne peut pas être prise égale à $1$ en général. — Contre-exemple : Sur $\Omega=]0,L[$ avec $L>\pi$, $u(x)=\sin(\pi x/L)$ vérifie $\|u\|_{L^2}=\frac L\pi\|u'\|_{L^2}>\|u'\|_{L^2}$.
- `zero` par « Un gradient nul force $u$ à être constante, et la condition au bord annule cette constante. » → incorrect [hypotheses-theoreme] : Cet argument suppose $\Omega$ connexe, ce qui n'est pas une hypothèse, et donne un sens ponctuel à la condition au bord. L'inégalité de Poincaré conclut directement. — Contre-exemple : Sur $\Omega=]0,1[\cup]2,3[$, non connexe, $u=\mathbb 1_{]0,1[}$ a un gradient nul sans être constante.
- `min` par « On peut prendre $C=1$ dans l'inégalité de Poincaré. » → incorrect [poincare-constante] : Rien n'autorise $C=1$ : on garde la constante $C$ fournie par le théorème.

Retraits :
- `h-omega` (nécessaire) : L'inégalité de Poincaré n'est plus disponible : l'équivalence avec la norme de $H^1$ peut tomber. — Contre-exemple : Sur $\Omega=\mathbb R$, pour $\chi\in C^\infty_c(\mathbb R)$ non nulle et $u_n(x)=\chi(x/n)$ : $\|u_n\|^2_{H^1}\ge n\|\chi\|^2_{L^2}$ alors que $N(u_n)^2=n^{-1}\|\chi'\|^2_{L^2}$ ; aucune constante ne majore $\|u_n\|_{H^1}/N(u_n)$.

Solution :
**Norme.** $N$ est une semi-norme sur $H^1_0(\Omega)$, par linéarité du gradient et propriétés de la norme de $L^2(\Omega)^d$. Si $N(u)=0$, l'inégalité de Poincaré ($\Omega$ borné) donne $\|u\|_{L^2}\le C\cdot 0$, donc $u=0$ : $N$ est une norme.

**Équivalence.** D'une part $N(u)^2\le\|u\|^2_{L^2}+N(u)^2=\|u\|^2_{H^1}$. D'autre part, $\|u\|^2_{L^2}\le C^2N(u)^2$, d'où $\|u\|^2_{H^1}\le(1+C^2)N(u)^2$. Ainsi
$$N(u)\le\|u\|_{H^1}\le\sqrt{1+C^2}\,N(u)\qquad\forall u\in H^1_0(\Omega).$$

**Points de vigilance.** Sur $H^1(\Omega)$, $N$ n'est pas une norme ($N(1)=0$). La séparation ne passe pas par « gradient nul implique constante » : cet argument exigerait la connexité et un sens ponctuel de la condition au bord, alors que Poincaré conclut directement. La constante $C$ dépend de $\Omega$.

Indices :
1. Une norme équivalente demande deux inégalités. Laquelle est immédiate, et laquelle exige un théorème ?
2. $\|u\|^2_{H^1}=\|u\|^2_{L^2}+N(u)^2$ : un sens est gratuit ; pour l'autre, contrôle $\|u\|_{L^2}$ par $N(u)$.
3. Poincaré donne $\|u\|^2_{L^2}\le C^2N(u)^2$, donc $\|u\|^2_{H^1}\le(1+C^2)N(u)^2$ ; et $N(u)=0$ entraîne $u=0$.

Erreurs fréquentes :
- Affirmer que $N$ est une norme sur $H^1(\Omega)$.
- Ne démontrer qu’une des deux inégalités.
- Oublier que $\Omega$ doit être borné pour disposer de Poincaré.

Variante : Soit $\Omega\subset\mathbb R^d$ un ouvert borné. Montrer que $(u,v)\mapsto\int_\Omega\nabla u\cdot\nabla v$ est un produit scalaire sur $H^1_0(\Omega)$, qui en fait un espace de Hilbert.

Solution de la variante : La forme est bilinéaire, symétrique et positive ; elle est définie, car $\int_\Omega|\nabla u|^2=0$ entraîne $u=0$ par Poincaré. Sa norme est $N$, équivalente à $\|\cdot\|_{H^1}$ d'après l'exercice. Comme $H^1_0(\Omega)$ est fermé dans l'espace complet $H^1(\Omega)$, il est complet pour $\|\cdot\|_{H^1}$ ; une suite de Cauchy pour $N$ l'est pour $\|\cdot\|_{H^1}$ et converge pour les deux normes. Donc $H^1_0(\Omega)$, muni de ce produit scalaire, est un espace de Hilbert.

Vérification : {"origin":"complement","review":"machine"}

## Exercice difficile `poincare.difficile` : Coercivité et estimation pour le problème de Dirichlet

Énoncé : Soit $\Omega\subset\mathbb R^d$ un ouvert borné, $f\in L^2(\Omega)$ et $V=H^1_0(\Omega)$, muni de la norme usuelle de $H^1$. On pose $a(u,v)=\int_\Omega\nabla u\cdot\nabla v$ et $L(v)=\int_\Omega fv$. Montrer que $a$ est continue et coercive sur $V$, que le problème « trouver $u\in V$ tel que $-\Delta u=f$ dans $\mathcal D'(\Omega)$ » admet une unique solution, et que $\|\nabla u\|_{L^2}\le C\|f\|_{L^2}$, où $C$ est une constante de Poincaré de $\Omega$.
Source : {"doc":"polycopie","pdfPage":13,"label":"Section 3.3, « Pourquoi utile aux EDP » ; exercice 9, difficile (p. PDF 39)"} — prérequis : lax-milgram

But : `fin` — usage : application

Nœuds :
- `h-omega` (hypothese) : $\Omega\subset\mathbb R^d$ est un ouvert borné.
- `h-f` (hypothese) : $f\in L^2(\Omega)$.
- `d-V` (definition) : $V=H^1_0(\Omega)$, sous-espace fermé de $H^1(\Omega)$, est un espace de Hilbert pour $\|\cdot\|_{H^1}$.
- `d-a` (definition) : $a(u,v)=\int_\Omega\nabla u\cdot\nabla v$ et $L(v)=\int_\Omega fv$ pour $u,v\in V$.
- `poinc` (application-theoreme) : Il existe $C>0$ tel que $\|v\|_{L^2}\le C\|\nabla v\|_{L^2}$ pour tout $v\in V$.
- `cont` (inegalite) : $|a(u,v)|\le\|u\|_{H^1}\|v\|_{H^1}$ et $|L(v)|\le\|f\|_{L^2}\|v\|_{H^1}$ pour tous $u,v\in V$.
- `coer` (inegalite, calcul expr-equiv) : $a(v,v)=\|\nabla v\|^2_{L^2}\ge\frac{1}{1+C^2}\|v\|^2_{H^1}$ pour tout $v\in V$.
  - valeur attendue : "1/(1+C^2)"
- `lm` (application-theoreme) : Il existe un unique $u\in V$ tel que $a(u,v)=L(v)$ pour tout $v\in V$.
- `sol` (consequence) : Le problème « $u\in V$, $-\Delta u=f$ dans $\mathcal D'(\Omega)$ » admet une unique solution.
- `est1` (inegalite) : $\|\nabla u\|^2_{L^2}=L(u)\le\|f\|_{L^2}\|u\|_{L^2}\le C\|f\|_{L^2}\|\nabla u\|_{L^2}$.
- `est2` (inegalite) : $\|\nabla u\|_{L^2}\le C\|f\|_{L^2}$.
- `fin` (conclusion) : $a$ est continue et coercive sur $V$ ; le problème de Dirichlet admet une unique solution $u\in H^1_0(\Omega)$, et $\|\nabla u\|_{L^2}\le C\|f\|_{L^2}$.
- `x-coer-un` (inegalite, DISTRACTEUR) : $a(v,v)\ge\|v\|^2_{H^1}$ pour tout $v\in V$.
- `x-coer-H1` (consequence, DISTRACTEUR) : $a$ est coercive sur $H^1(\Omega)$ tout entier.
- `x-sans-c` (inegalite, DISTRACTEUR) : Quel que soit l'ouvert borné $\Omega$ : $\|\nabla u\|_{L^2}\le\|f\|_{L^2}$.

Règles :
- `h-omega` ⟹ `poinc` par « Inégalité de Poincaré sur un ouvert borné. [poincare] »
- `d-a` + `d-V` + `h-f` ⟹ `cont` par « Cauchy–Schwarz dans $L^2$, puis $\|\nabla w\|_{L^2}\le\|w\|_{H^1}$ et $\|w\|_{L^2}\le\|w\|_{H^1}$. [cauchy-schwarz] »
- `d-a` + `poinc` ⟹ `coer` par « Poincaré : $\|v\|^2_{H^1}=\|v\|^2_{L^2}+\|\nabla v\|^2_{L^2}\le(1+C^2)\|\nabla v\|^2_{L^2}$. »
- `d-V` + `cont` + `coer` ⟹ `lm` par « Théorème de Lax–Milgram : forme bilinéaire continue et coercive sur un Hilbert, forme linéaire continue. [lax-milgram] »
- `lm` + `d-a` + `d-V` + `cont` ⟹ `sol` par « Pour $\varphi\in\mathcal D(\Omega)$, $\langle-\Delta u,\varphi\rangle=a(u,\varphi)$ par définition des dérivées distributionnelles ; densité de $\mathcal D(\Omega)$ dans $V$ et continuité de $a(u,\cdot)$ et de $L$. [distributions] »
- `lm` + `h-f` + `poinc` ⟹ `est1` par « Test par $v=u$, Cauchy–Schwarz, puis Poincaré appliquée à $u\in V$. »
- `est1` ⟹ `est2` par « Si $\|\nabla u\|_{L^2}=0$, c'est immédiat ; sinon, on divise par $\|\nabla u\|_{L^2}>0$. »
- `cont` + `coer` + `sol` + `est2` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « Lax–Milgram, puisque $a$ est continue et symétrique. » ; « $a(v,v)=\|\nabla v\|^2_{L^2}$ est le carré de la norme de $H^1$. »

Pièges :
- `x-coer-un` → incorrect [poincare-constante] : $a(v,v)=\|\nabla v\|^2_{L^2}$ ne contient pas $\|v\|^2_{L^2}$ : la constante de coercivité est strictement inférieure à $1$. — Contre-exemple : Pour $v\in V$ non nul : $\|v\|^2_{H^1}=\|v\|^2_{L^2}+\|\nabla v\|^2_{L^2}>\|\nabla v\|^2_{L^2}=a(v,v)$.
- `x-coer-H1` → incorrect [poincare-condition-bord] : Sur $H^1(\Omega)$, les constantes annulent $a(v,v)$ sans être nulles : la coercivité repose sur la condition de Dirichlet. — Contre-exemple : $v\equiv 1\in H^1(\Omega)$ : $a(v,v)=0$ et $\|v\|_{H^1}=|\Omega|^{1/2}>0$.
- `x-sans-c` → incorrect [poincare-constante] : L'estimation fait intervenir une constante de Poincaré de $\Omega$, qui dépend de la taille du domaine. — Contre-exemple : Sur $\Omega=]0,2\pi[$, $f(x)=\sin(x/2)$ et $u(x)=4\sin(x/2)$ : $-u''=f$, $u\in H^1_0(\Omega)$ et $\|u'\|_{L^2}=2\|f\|_{L^2}$.
- `lm` par « Lax–Milgram, puisque $a$ est continue et symétrique. » → incorrect [hypotheses-theoreme] : Lax–Milgram exige la coercivité : continuité et symétrie ne suffisent pas. — Contre-exemple : Sur $H^1(]0,1[)$, $a(u,v)=\int_0^1u'v'$ est continue et symétrique, mais $a(1,1)=0$ ; pour $f=1$, le choix $v=1$ donne $0=1$ : pas de solution.
- `coer` par « $a(v,v)=\|\nabla v\|^2_{L^2}$ est le carré de la norme de $H^1$. » → incorrect [poincare-constante] : $\|\nabla v\|^2_{L^2}$ n'est pas le carré de la norme usuelle de $H^1$ : il manque $\|v\|^2_{L^2}$, que seule l'inégalité de Poincaré contrôle.

Retraits :
- `h-omega` (nécessaire) : Sans Poincaré, la coercivité de $a$ pour la norme de $H^1$ n'est plus établie. — Contre-exemple : Sur $\Omega=\mathbb R$, $u_n(x)=\chi(x/n)$ avec $\chi\in C^\infty_c(\mathbb R)$ non nulle vérifie $a(u_n,u_n)=n^{-1}\|\chi'\|^2_{L^2}$ et $\|u_n\|^2_{H^1}\ge n\|\chi\|^2_{L^2}$ : $a$ n'est pas coercive sur $H^1_0(\mathbb R)$.

Calculs fermés : [{"kind":"expr-equiv","prompt":"Pour $\\Omega=]0,1[$ et $f=1$, solution $u(x)$ du problème de Dirichlet","expected":"x(1-x)/2","vars":["x"]},{"kind":"rational","prompt":"Pour cette solution, valeur de $\\|u'\\|^2_{L^2}$","expected":"1/12"}]

Solution :
**Poincaré.** $\Omega$ étant borné, il existe $C>0$ tel que $\|v\|_{L^2}\le C\|\nabla v\|_{L^2}$ pour tout $v\in V$.

**Continuité.** Par Cauchy–Schwarz, $|a(u,v)|\le\|\nabla u\|_{L^2}\|\nabla v\|_{L^2}\le\|u\|_{H^1}\|v\|_{H^1}$ et $|L(v)|\le\|f\|_{L^2}\|v\|_{L^2}\le\|f\|_{L^2}\|v\|_{H^1}$.

**Coercivité.** Pour $v\in V$ : $\|v\|^2_{H^1}=\|v\|^2_{L^2}+\|\nabla v\|^2_{L^2}\le(1+C^2)\|\nabla v\|^2_{L^2}$, donc $a(v,v)\ge\frac1{1+C^2}\|v\|^2_{H^1}$.

**Existence et unicité.** $V$ est un Hilbert ; Lax–Milgram donne un unique $u\in V$ tel que $a(u,v)=L(v)$ pour tout $v\in V$. Pour $u\in V$ et $\varphi\in\mathcal D(\Omega)$, $\langle-\Delta u,\varphi\rangle=\int_\Omega\nabla u\cdot\nabla\varphi=a(u,\varphi)$ ; par densité de $\mathcal D(\Omega)$ dans $V$ et continuité, l'équation $-\Delta u=f$ dans $\mathcal D'(\Omega)$ équivaut à $a(u,v)=L(v)$ pour tout $v\in V$. Le problème de Dirichlet admet donc une unique solution dans $V$.

**Estimation.** Avec $v=u$ : $\|\nabla u\|^2_{L^2}=\int_\Omega fu\le\|f\|_{L^2}\|u\|_{L^2}\le C\|f\|_{L^2}\|\nabla u\|_{L^2}$, d'où $\|\nabla u\|_{L^2}\le C\|f\|_{L^2}$. On en déduit aussi $\|u\|_{L^2}\le C^2\|f\|_{L^2}$ et $\|u\|_{H^1}\le C\sqrt{1+C^2}\,\|f\|_{L^2}$.

**Point de vigilance.** $C$ est une constante de Poincaré de $\Omega$ : aucune valeur universelle ne convient, et sur $H^1(\Omega)$ la forme $a$ n'est pas coercive.

Indices :
1. Lax–Milgram demande continuité et coercivité pour la norme de $V$. Que manque-t-il à $a(v,v)$ pour dominer $\|v\|^2_{H^1}$ ?
2. Poincaré contrôle $\|v\|_{L^2}$ par $\|\nabla v\|_{L^2}$ : ajoute $\|\nabla v\|^2_{L^2}$ aux deux membres. Pour l'estimation, teste l'équation par $v=u$.
3. $\|v\|^2_{H^1}\le(1+C^2)\,a(v,v)$. Puis $\|\nabla u\|^2_{L^2}=\int fu\le C\|f\|_{L^2}\|\nabla u\|_{L^2}$.

Erreurs fréquentes :
- Affirmer la coercivité sur $H^1(\Omega)$ entier, en oubliant les constantes.
- Écrire $a(v,v)\ge\|v\|^2_{H^1}$, en confondant $\|\nabla v\|_{L^2}$ et $\|v\|_{H^1}$.
- Appliquer Lax–Milgram sans avoir établi la coercivité.

Variante : Soit $\Omega$ un ouvert borné, $c\in L^\infty(\Omega)$ avec $c\ge 0$ presque partout, et $f\in L^2(\Omega)$. Montrer que le problème « trouver $u\in H^1_0(\Omega)$ tel que $-\Delta u+cu=f$ dans $\mathcal D'(\Omega)$ » admet une unique solution, et que $\|\nabla u\|_{L^2}\le C\|f\|_{L^2}$ avec une constante de Poincaré $C$ de $\Omega$.

Solution de la variante : La forme $b(u,v)=\int_\Omega\nabla u\cdot\nabla v+\int_\Omega cuv$ est continue sur $H^1_0(\Omega)$ : $|b(u,v)|\le(1+\|c\|_{L^\infty})\|u\|_{H^1}\|v\|_{H^1}$. Comme $c\ge 0$, $b(v,v)\ge\|\nabla v\|^2_{L^2}\ge\frac1{1+C^2}\|v\|^2_{H^1}$ par Poincaré : $b$ est coercive. Lax–Milgram donne une unique solution faible, équivalente à l'équation dans $\mathcal D'(\Omega)$ par le même argument de densité. En testant par $v=u$ : $\|\nabla u\|^2_{L^2}\le b(u,u)=\int_\Omega fu\le C\|f\|_{L^2}\|\nabla u\|_{L^2}$, d'où l'estimation. Le signe de $c$ sert ici à minorer $b(v,v)$ par $\|\nabla v\|^2_{L^2}$.

Vérification : {"origin":"complement","review":"machine"}