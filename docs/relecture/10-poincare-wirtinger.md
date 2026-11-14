# 10. Poincaré–Wirtinger (`poincare-wirtinger`) — polycopié p. PDF 12, section 3.3

## Fiche

Espaces : $\Omega\subset\mathbb R^d$ : ouvert borné, connexe, lipschitzien. | $H^1(\Omega)$, muni de la norme usuelle $\|u\|^2_{H^1}=\|u\|^2_{L^2}+\|\nabla u\|^2_{L^2}$. | $u_\Omega=\frac1{|\Omega|}\int_\Omega u$ : moyenne de $u$, bien définie car $L^2(\Omega)\subset L^1(\Omega)$ lorsque $|\Omega|<+\infty$.

Hypothèses :
- $\Omega$ est borné. — Sans elle : Sur $\Omega=]0,+\infty[$, $u(x)=\frac1{1+x}$ appartient à $H^1(\Omega)$ sans être intégrable, et $|\Omega|=+\infty$ : la moyenne n'a pas de sens.
- $\Omega$ est connexe. — Sans elle : Sur $\Omega=]0,1[\cup]2,3[$, $u=1$ sur $]0,1[$ et $u=-1$ sur $]2,3[$ vérifie $u_\Omega=0$, $\nabla u=0$ et $\|u-u_\Omega\|_{L^2}=\sqrt2$ : aucune constante ne convient.
- $\Omega$ est lipschitzien. — Sans elle : Sur un peigne borné et connexe de $\mathbb R^2$, à couloirs de plus en plus fins terminés par des pièces, on construit $u_k\in H^1$ avec $\|u_k-(u_k)_\Omega\|_{L^2}\ge\frac12$ pour $k$ grand et $\|\nabla u_k\|_{L^2}\to 0$ : l'inégalité tombe (construction détaillée dans l'exercice intermédiaire).

Énoncé : Si $\Omega$ est borné, connexe et lipschitzien, il existe une constante $C_\Omega>0$ telle que, pour tout $u\in H^1(\Omega)$,
$$\|u-u_\Omega\|_{L^2}\le C_\Omega\|\nabla u\|_{L^2},\qquad u_\Omega=\frac1{|\Omega|}\int_\Omega u.$$

Bilan : {"existence":"Il existe une constante $C_\\Omega>0$, ne dépendant que de $\\Omega$ ; la démonstration, par l'absurde, n'en fournit pas de valeur.","autre":"Si $u_\\Omega=0$, alors $\\|u\\|_{L^2}\\le C_\\Omega\\|\\nabla u\\|_{L^2}$ : la forme $\\int_\\Omega\\nabla u\\cdot\\nabla v$ est coercive sur les fonctions de moyenne nulle."}

Preuve dans le polycopié : complete

Plan :
1. Par l'absurde : il existe $v_n\in H^1(\Omega)$ avec $(v_n)_\Omega=0$, $\|v_n\|_{L^2}=1$ et $\|\nabla v_n\|_{L^2}\to 0$.
2. La suite est bornée dans $H^1(\Omega)$ ; par Rellich, une sous-suite converge fortement dans $L^2$ vers $v$.
3. Le passage à la limite dans la définition des dérivées distributionnelles donne $\nabla v=0$ dans $\mathcal D'(\Omega)$.
4. La connexité impose que $v$ soit constante presque partout ; sa moyenne étant nulle, $v=0$.
5. La convergence forte et $\|v_n\|_{L^2}=1$ donnent $\|v\|_{L^2}=1$ : contradiction.

Vigilance :
- La preuve par compacité ne donne aucune valeur de $C_\Omega$ : aucune constante n'est annoncée comme optimale.
- La connexité est indispensable : sur un ouvert non connexe, les fonctions localement constantes mettent l’inégalité en défaut.
- Ne pas appliquer Poincaré à $u-u_\Omega$ : cette fonction n'appartient pas à $H^1_0(\Omega)$ en général.
- $\nabla u$ ne distingue pas $u$ de $u+c$ : sans condition au bord, il faut retirer la moyenne.

Vérification : {"origin":"polycopie","review":"machine"}

Définition « Moyenne sur un ouvert borné » : Pour $\Omega$ borné et $u\in L^2(\Omega)$ : $u_\Omega=\frac1{|\Omega|}\int_\Omega u$.

Définition « Espace $V_0$ » : $V_0=\{v\in H^1(\Omega) : \int_\Omega v=0\}$ : fonctions de $H^1(\Omega)$ de moyenne nulle, espace de travail du problème de Neumann.

Définition « Condition de compatibilité (Neumann) » : Pour $-\Delta u=f$ avec dérivée normale nulle au bord, la condition $\langle f,1\rangle=0$ est nécessaire lorsque la dualité le permet ; pour $f\in L^2(\Omega)$, elle s'écrit $\int_\Omega f=0$.

## Contre-exemple `ce-poincare-wirtinger-non-connexe` : Ouvert non connexe
Assertion : L'inégalité de Poincaré–Wirtinger vaut sur tout ouvert borné lipschitzien, connexe ou non.
Tâche : Sur $\Omega=]0,1[\cup]2,3[$, soit $u=1$ sur $]0,1[$ et $u=-1$ sur $]2,3[$. Calcule $u_\Omega$.
Vérification : {"kind":"rational","prompt":"Valeur de $u_\\Omega$","expected":"0"}
Explication : $u_\Omega=\frac12(1-1)=0$, $\nabla u=0$ et $\|u-u_\Omega\|_{L^2}=\sqrt2>0$ : aucune constante $C_\Omega$ ne convient.

## Contre-exemple `ce-poincare-wirtinger-exemple` : Un exemple ne donne pas la meilleure constante
Assertion : Sur $]0,1[$, la meilleure constante de Poincaré–Wirtinger est $\frac1{2\sqrt3}$, valeur du quotient pour $u(x)=x$.
Tâche : Pour $w(x)=\cos(\pi x)$ sur $]0,1[$, de moyenne nulle, on a $\|w\|^2_{L^2}=\frac12$ et $\|w'\|^2_{L^2}=\frac{\pi^2}2$. Exprime le quotient $\|w\|^2_{L^2}/\|w'\|^2_{L^2}$ en fonction de $p=\pi$.
Vérification : {"kind":"expr-equiv","prompt":"Quotient en fonction de $p=\\pi$","expected":"1/p^2","vars":["p"]}
Explication : Le quotient vaut $\frac1{\pi^2}>\frac1{12}$, car $\pi<2\sqrt3$ : la constante $\frac1{2\sqrt3}$ ne convient pas pour $w$, elle n'est donc pas admissible. Ce calcul ne détermine pas pour autant la meilleure constante.

## Contre-exemple `ce-poincare-wirtinger-compatibilite` : Compatibilité pour le problème de Neumann
Assertion : Pour tout $f\in L^2(\Omega)$, le problème de Neumann $-\Delta u=f$, $\partial_\nu u=0$ admet une solution faible dans $H^1(\Omega)$.
Tâche : Sur $\Omega=]0,1[$ avec $f\equiv 1$, on teste la formulation faible par $v=1$. Calcule $\int_0^1f\,v$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\int_0^1f\\cdot 1$","expected":"1"}
Explication : Une solution vérifierait $\int_0^1u'\cdot 0=0=\int_0^1f=1$ : contradiction, il n'y a pas de solution.

## Exercice facile `poincare-wirtinger.facile` : Moyenne de $u(x)=x$ sur $]0,1[$

Énoncé : Soit $\Omega=]0,1[$ et $u(x)=x$. Calculer la moyenne $u_\Omega=\frac1{|\Omega|}\int_\Omega u$. Vérifier que $v=u-u_\Omega$ est de moyenne nulle, puis calculer $\|v\|_{L^2}$ et $\|u'\|_{L^2}$ : qu'en déduit-on pour les constantes admissibles dans l'inégalité de Poincaré–Wirtinger sur $]0,1[$ ?
Source : {"doc":"polycopie","pdfPage":39,"label":"Exercice 10, facile"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `d-u` (definition) : $\Omega=]0,1[$ et $u(x)=x$ ; $u\in H^1(\Omega)$, de dérivée $u'=1$.
- `d-moy` (definition) : Pour $w\in L^2(\Omega)$ : $w_\Omega=\frac1{|\Omega|}\int_\Omega w$.
- `mes` (egalite) : $|\Omega|=1$.
- `int` (egalite) : $\int_0^1x\,dx=\left[\frac{x^2}2\right]_0^1$.
- `moy` (egalite, calcul rational) : $u_\Omega=\frac12$.
  - valeur attendue : "1/2"
- `moy-v` (egalite) : $v=u-\frac12$ vérifie $v_\Omega=u_\Omega-\frac12=0$.
- `norme-v` (egalite, calcul rational) : $\|v\|^2_{L^2}=\int_0^1\left(x-\frac12\right)^2dx=\frac1{12}$.
  - valeur attendue : "1/12"
- `norme-up` (egalite) : $\|u'\|^2_{L^2}=\int_0^11\,dx=1$.
- `compar` (egalite) : $\|v\|_{L^2}=\frac1{2\sqrt3}\,\|u'\|_{L^2}$.
- `minor` (inegalite) : Toute constante $C_\Omega$ admissible sur $]0,1[$ vérifie $C_\Omega\ge\frac1{2\sqrt3}$.
- `fin` (conclusion) : $u_\Omega=\frac12$ ; $v=u-\frac12$ est de moyenne nulle, $\|v\|^2_{L^2}=\frac1{12}$ et $\|u'\|^2_{L^2}=1$ ; toute constante admissible vérifie $C_\Omega\ge\frac1{2\sqrt3}$.
- `x-optimale` (consequence, DISTRACTEUR) : $\frac1{2\sqrt3}$ est la meilleure constante de Poincaré–Wirtinger sur $]0,1[$.
- `x-nulle` (consequence, DISTRACTEUR) : Puisque $v$ est de moyenne nulle, $\|v\|_{L^2}=0$.

Règles :
- `d-u` ⟹ `mes` par « La mesure de Lebesgue d’un intervalle est sa longueur. »
- `d-u` ⟹ `int` par « $\frac{x^2}2$ est une primitive de $x$. »
- `d-moy` + `mes` + `int` ⟹ `moy` par « Définition de la moyenne : intégrale divisée par $|\Omega|$. »
- `moy` + `d-moy` ⟹ `moy-v` par « Linéarité de l'intégrale : $(u-c)_\Omega=u_\Omega-c$ pour une constante $c$. »
- `moy` ⟹ `norme-v` par « Développement $\left(x-\frac12\right)^2=x^2-x+\frac14$ et intégration terme à terme. »
- `d-u` ⟹ `norme-up` par « $u'=1$ sur $]0,1[$. »
- `norme-v` + `norme-up` ⟹ `compar` par « Racines carrées : $\sqrt{1/12}=\frac1{2\sqrt3}$. »
- `compar` ⟹ `minor` par « Si $C_\Omega$ est admissible, l'inégalité appliquée à $u$ donne $\|v\|_{L^2}\le C_\Omega\|u'\|_{L^2}$. »
- `moy` + `moy-v` + `norme-v` + `norme-up` + `minor` ⟹ `fin` par « Réunion des calculs. »

Justifications sans règle (séduisantes ou fausses) : « La moyenne d’une fonction sur un intervalle est sa valeur au milieu. » ; « Le quotient obtenu sur un exemple est la meilleure constante. »

Pièges :
- `moy` par « La moyenne d’une fonction sur un intervalle est sa valeur au milieu. » → incorrect [poincare-wirtinger-moyenne-calcul] : La valeur trouvée est juste ici parce que $u$ est affine, mais la règle est fausse : la moyenne se calcule par l'intégrale. — Contre-exemple : Pour $w(x)=x^2$ sur $]0,1[$ : $w_\Omega=\frac13$, alors que $w(\frac12)=\frac14$.
- `x-optimale` → incorrect [poincare-wirtinger-constante] : Un exemple ne fournit qu’une minoration de toute constante admissible : une autre fonction peut donner un quotient plus grand. — Contre-exemple : $w(x)=\cos(\pi x)$ est de moyenne nulle, avec $\|w\|^2_{L^2}=\frac12$ et $\|w'\|^2_{L^2}=\frac{\pi^2}2$ : son quotient vaut $\frac1\pi>\frac1{2\sqrt3}$, donc $\frac1{2\sqrt3}$ n'est même pas admissible.
- `x-nulle` → incorrect [poincare-wirtinger-moyenne-nulle] : Une fonction de moyenne nulle n’est pas la fonction nulle. — Contre-exemple : $v(x)=x-\frac12$ est de moyenne nulle et $\|v\|^2_{L^2}=\frac1{12}\neq 0$.

Retraits :
- `mes` (nécessaire) : La moyenne divise l'intégrale par $|\Omega|$ : sans la mesure du domaine, elle ne se calcule pas. — Contre-exemple : Sur $]0,2[$, $\int_0^2x\,dx=2$ alors que la moyenne de $x$ vaut $1$ : omettre la division par $|\Omega|$ fausse le résultat.

Solution :
**Moyenne.** $|\Omega|=1$ et $\int_0^1x\,dx=\frac12$, donc $u_\Omega=\frac12$.

**Fonction de moyenne nulle.** $v=u-\frac12$ vérifie $v_\Omega=u_\Omega-\frac12=0$.

**Normes.** $\|v\|^2_{L^2}=\int_0^1\left(x^2-x+\frac14\right)dx=\frac13-\frac12+\frac14=\frac1{12}$, et $\|u'\|^2_{L^2}=1$. Donc $\|u-u_\Omega\|_{L^2}=\frac1{2\sqrt3}\|u'\|_{L^2}$.

**Conséquence.** Si $C_\Omega$ est une constante admissible sur $]0,1[$, l'inégalité appliquée à $u$ impose $C_\Omega\ge\frac1{2\sqrt3}$. Ce calcul ne donne qu'une minoration : il ne détermine pas la meilleure constante, et $\frac1{2\sqrt3}$ n'est d'ailleurs pas admissible, comme le montre $w(x)=\cos(\pi x)$, de quotient $\frac1\pi>\frac1{2\sqrt3}$.

Indices :
1. La moyenne est une intégrale divisée par la mesure du domaine : que valent ces deux quantités sur $]0,1[$ ?
2. Une fois $u_\Omega$ connu, développe $\left(x-u_\Omega\right)^2$ pour calculer $\|u-u_\Omega\|^2_{L^2}$, et compare à $\|u'\|^2_{L^2}$.
3. $u_\Omega=\frac12$ et $\int_0^1\left(x-\frac12\right)^2dx=\frac13-\frac12+\frac14$ ; une constante admissible doit dominer le quotient obtenu.

Erreurs fréquentes :
- Remplacer la moyenne par la valeur au milieu de l’intervalle.
- Confondre fonction de moyenne nulle et fonction nulle.
- Conclure qu’un quotient calculé sur un exemple est la meilleure constante.

Variante : Soit $\Omega=]0,2[$ et $u(x)=x^2$. Calculer $u_\Omega$, puis $\|u-u_\Omega\|^2_{L^2}$ et $\|u'\|^2_{L^2}$.

Solution de la variante : $|\Omega|=2$ et $\int_0^2x^2\,dx=\frac83$, donc $u_\Omega=\frac43$, qui n'est pas la valeur au milieu $u(1)=1$. Ensuite $\|u-u_\Omega\|^2_{L^2}=\int_0^2\left(x^4-\frac83x^2+\frac{16}9\right)dx=\frac{32}5-\frac{64}9+\frac{32}9=\frac{128}{45}$, et $\|u'\|^2_{L^2}=\int_0^24x^2\,dx=\frac{32}3$. Le quotient $\frac{128}{45}\cdot\frac3{32}=\frac4{15}$ minore $C_\Omega^2$ pour toute constante admissible sur $]0,2[$, sans renseigner sur la meilleure constante.

Graphe de la variante :
But : `fin` — usage : application

Nœuds :
- `d-u` (definition) : $\Omega=]0,2[$ et $u(x)=x^2$, de dérivée $u'(x)=2x$.
- `d-moy` (definition) : Pour $w\in L^2(\Omega)$ : $w_\Omega=\frac1{|\Omega|}\int_\Omega w$.
- `mes` (egalite) : $|\Omega|=2$.
- `int` (egalite, calcul rational) : $\int_0^2x^2\,dx=\frac83$.
  - valeur attendue : "8/3"
- `moy` (egalite, calcul rational) : $u_\Omega=\frac43$.
  - valeur attendue : "4/3"
- `norme-v` (egalite, calcul rational) : $\|u-u_\Omega\|^2_{L^2}=\frac{128}{45}$.
  - valeur attendue : "128/45"
- `norme-up` (egalite, calcul rational) : $\|u'\|^2_{L^2}=\frac{32}3$.
  - valeur attendue : "32/3"
- `fin` (conclusion) : $u_\Omega=\frac43$, $\|u-u_\Omega\|^2_{L^2}=\frac{128}{45}$ et $\|u'\|^2_{L^2}=\frac{32}3$.
- `x-oubli` (egalite, DISTRACTEUR) : $u_\Omega=\frac83$.
- `x-milieu` (egalite, DISTRACTEUR) : $u_\Omega=u(1)=1$.

Règles :
- `d-u` ⟹ `mes` par « Longueur de l’intervalle. »
- `d-u` ⟹ `int` par « $\frac{x^3}3$ est une primitive de $x^2$. »
- `d-moy` + `mes` + `int` ⟹ `moy` par « Définition de la moyenne : intégrale divisée par $|\Omega|$. »
- `d-u` + `moy` ⟹ `norme-v` par « Développement $\left(x^2-\frac43\right)^2=x^4-\frac83x^2+\frac{16}9$ et intégration terme à terme. »
- `d-u` ⟹ `norme-up` par « $|u'(x)|^2=4x^2$, puis intégration. »
- `moy` + `norme-v` + `norme-up` ⟹ `fin` par « Réunion des calculs. »

Justifications sans règle (séduisantes ou fausses) : « La moyenne est la valeur au milieu de l’intervalle. »

Pièges :
- `x-oubli` → incorrect [poincare-wirtinger-moyenne-calcul] : La moyenne divise l'intégrale par $|\Omega|=2$. — Contre-exemple : Pour $w\equiv 1$ sur $]0,2[$, l'intégrale vaut $2$, alors que la moyenne d'une constante est cette constante, $1$.
- `x-milieu` → incorrect [poincare-wirtinger-moyenne-calcul] : La valeur au milieu ne coïncide avec la moyenne que pour des fonctions particulières, par exemple affines. — Contre-exemple : Ici $u_\Omega=\frac43\neq 1=u(1)$.

Retraits :
- `mes` (nécessaire) : La moyenne ne se calcule pas sans la mesure du domaine. — Contre-exemple : Sans division par $|\Omega|$, on trouverait $\frac83$, qui n'est pas la moyenne : la moyenne d'une constante $c$ sur $]0,2[$ vaut $c$, non $2c$.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `poincare-wirtinger.intermediaire` : Poincaré–Wirtinger par l’absurde

Énoncé : Soit $\Omega\subset\mathbb R^d$ un ouvert borné, connexe et lipschitzien. Démontrer par l'absurde, à l'aide du théorème de Rellich–Kondrachov, qu'il existe $C_\Omega>0$ tel que $\|u-u_\Omega\|_{L^2}\le C_\Omega\|\nabla u\|_{L^2}$ pour tout $u\in H^1(\Omega)$.
Source : {"doc":"polycopie","pdfPage":13,"label":"Démonstration, section 3.3 (p. PDF 12–13) ; exercice 10, intermédiaire (p. PDF 39)"} — prérequis : —

But : `fin` — usage : demonstration

Nœuds :
- `h-borne` (hypothese) : $\Omega\subset\mathbb R^d$ est un ouvert borné.
- `h-connexe` (hypothese) : $\Omega$ est connexe.
- `h-lip` (hypothese) : $\Omega$ est lipschitzien.
- `abs` (hypothese, locale) : Supposons par l'absurde qu'aucune constante $C_\Omega>0$ ne convienne.
- `neg` (consequence) : Pour tout $n\ge 1$, il existe $u_n\in H^1(\Omega)$ tel que $\|u_n-(u_n)_\Omega\|_{L^2}>n\,\|\nabla u_n\|_{L^2}$.
- `vn` (consequence) : $v_n=\frac{u_n-(u_n)_\Omega}{\|u_n-(u_n)_\Omega\|_{L^2}}$ est bien défini, et $(v_n)_\Omega=0$, $\|v_n\|_{L^2}=1$, $\|\nabla v_n\|_{L^2}<\frac1n$ ; en particulier $\|v_n\|^2_{H^1}\le 2$.
- `rellich` (application-theoreme) : Une sous-suite $(v_{n_k})$ converge fortement dans $L^2(\Omega)$ vers un $v\in L^2(\Omega)$.
- `norme` (egalite) : $\|v\|_{L^2}=1$.
- `moy` (egalite) : $v_\Omega=0$.
- `grad` (egalite) : $\nabla v=0$ dans $\mathcal D'(\Omega)$.
- `nul` (egalite) : $v=0$ presque partout.
- `contra` (contradiction) : $\|v\|_{L^2}=1$ et $v=0$ : contradiction.
- `fin` (conclusion) : Il existe $C_\Omega>0$ tel que $\|u-u_\Omega\|_{L^2}\le C_\Omega\|\nabla u\|_{L^2}$ pour tout $u\in H^1(\Omega)$.
- `x-faible` (consequence, DISTRACTEUR) : La convergence faible d'une sous-suite de $(v_n)$ dans $L^2(\Omega)$ suffit à garantir $\|v\|_{L^2}=1$.
- `x-h10` (consequence, DISTRACTEUR) : $u_n-(u_n)_\Omega\in H^1_0(\Omega)$, si bien que l'inégalité de Poincaré conclut directement.

Règles :
- `abs` ⟹ `neg` par « Négation de « il existe $C$ tel que, pour tout $u$, … », appliquée avec $C=n$. »
- `neg` + `h-borne` ⟹ `vn` par « L'inégalité stricte impose $\|u_n-(u_n)_\Omega\|_{L^2}>0$ ; linéarité de la moyenne (définie car $\Omega$ est borné), homogénéité des normes, gradient nul des constantes. »
- `vn` + `h-borne` + `h-lip` ⟹ `rellich` par « Théorème de Rellich–Kondrachov : l'injection $H^1(\Omega)\hookrightarrow L^2(\Omega)$ est compacte pour $\Omega$ borné lipschitzien. [rellich] »
- `rellich` + `vn` ⟹ `norme` par « Continuité de la norme pour la convergence forte : $\big|\|v_{n_k}\|-\|v\|\big|\le\|v_{n_k}-v\|$. »
- `rellich` + `vn` + `h-borne` ⟹ `moy` par « Continuité de la moyenne sur $L^2(\Omega)$ : $|w_\Omega|\le|\Omega|^{-1/2}\|w\|_{L^2}$ par Cauchy–Schwarz. »
- `rellich` + `vn` ⟹ `grad` par « Passage à la limite dans la définition des dérivées distributionnelles : convergence forte de $(v_{n_k})$ dans $L^2$ et $\|\nabla v_{n_k}\|_{L^2}\to 0$. [distributions] »
- `grad` + `moy` + `h-connexe` ⟹ `nul` par « Sur un ouvert connexe, une distribution de gradient nul est une constante ; la moyenne identifie cette constante. »
- `norme` + `nul` ⟹ `contra` par « Une fonction nulle presque partout a une norme $L^2$ nulle. »
- `contra` ⟹ `fin` par « Raisonnement par l’absurde. »

Justifications sans règle (séduisantes ou fausses) : « Semi-continuité inférieure de la norme : $\|v\|_{L^2}\le\liminf_k\|v_{n_k}\|_{L^2}=1$, donc $\|v\|_{L^2}=1$. » ; « Un gradient nul entraîne directement $v=0$. » ; « Inégalité de Poincaré appliquée à $u-u_\Omega$. » ; « Inégalité de Poincaré–Wirtinger. »

Pièges :
- `x-faible` → incorrect [faible-fort] : Une limite faible ne conserve pas la norme : on obtient seulement $\|v\|_{L^2}\le 1$. C'est la convergence forte fournie par Rellich qui donne $\|v\|_{L^2}=1$. — Contre-exemple : Dans $L^2(\mathbb R)$, pour $\chi\in C^\infty_c(\mathbb R)$ non nulle, $\chi(\cdot-n)$ converge faiblement vers $0$, alors que $\|\chi(\cdot-n)\|_{L^2}=\|\chi\|_{L^2}\neq 0$.
- `x-h10` → incorrect [poincare-wirtinger-constantes] : Retirer la moyenne ne fait pas s'annuler la fonction au bord : $u-u_\Omega$ n'appartient pas à $H^1_0(\Omega)$ en général. — Contre-exemple : Sur $]0,1[$, $u(x)=x$ donne $u-u_\Omega=x-\frac12$, qui vaut $-\frac12$ en $0$ : cette fonction n'est pas dans $H^1_0(]0,1[)$.
- `norme` par « Semi-continuité inférieure de la norme : $\|v\|_{L^2}\le\liminf_k\|v_{n_k}\|_{L^2}=1$, donc $\|v\|_{L^2}=1$. » → incorrect [faible-fort] : La semi-continuité inférieure ne donne que $\|v\|_{L^2}\le 1$ : l'égalité exige la convergence forte. — Contre-exemple : $\chi(\cdot-n)\rightharpoonup 0$ dans $L^2(\mathbb R)$, et la limite a une norme nulle, strictement inférieure à $\|\chi\|_{L^2}$.
- `nul` par « Un gradient nul entraîne directement $v=0$. » → incorrect [poincare-wirtinger-constantes] : Un gradient nul laisse les constantes : il faut la connexité, puis la moyenne nulle. — Contre-exemple : $v\equiv 1$ a un gradient nul et n'est pas nulle.
- `fin` par « Inégalité de Poincaré appliquée à $u-u_\Omega$. » → incorrect [poincare-wirtinger-constantes] : L'inégalité de Poincaré porte sur $H^1_0(\Omega)$, et $u-u_\Omega$ n'y appartient pas en général ; elle n'est d'ailleurs pas disponible dans cette démonstration.
- `fin` par « Inégalité de Poincaré–Wirtinger. » → incorrect [circularite] : Invoquer Poincaré–Wirtinger revient à supposer ce qu’il faut démontrer.

Retraits :
- `h-connexe` (nécessaire) : Sans connexité, un gradient nul n’impose pas une constante unique : la contradiction ne se forme plus, et l’inégalité est fausse. — Contre-exemple : $\Omega=]0,1[\cup]2,3[$, $u=1$ sur $]0,1[$ et $u=-1$ sur $]2,3[$ : $u_\Omega=0$, $\nabla u=0$ et $\|u-u_\Omega\|_{L^2}=\sqrt2$.
- `h-lip` (nécessaire) : Rellich–Kondrachov n’est plus disponible, et l’inégalité peut tomber sur un ouvert borné connexe irrégulier. — Contre-exemple : Peigne de $\mathbb R^2$ : base $]0,1[\times]-1,0[$, couloirs $]a_k,a_k+\delta_k[\times[0,1]$ et pièces $]a_k,a_k+\ell_k[\times]1,1+\ell_k[$, avec $a_k=2^{-k}$, $\ell_k=2^{-k-2}$, $\delta_k=2^{-4k}$. La fonction $u_k$ égale à $1/\ell_k$ sur la $k$-ième pièce, à $y/\ell_k$ dans le $k$-ième couloir et à $0$ ailleurs est dans $H^1$, avec $\|u_k\|_{L^2}\ge 1$, $\|\nabla u_k\|^2_{L^2}=\delta_k/\ell_k^2=2^{4-2k}\to 0$ et $(u_k)_\Omega\to 0$ : aucune constante ne convient.
- `h-borne` (nécessaire) : Sans borne, la moyenne peut ne pas être définie, et Rellich ne s’applique plus. — Contre-exemple : Sur $\Omega=]0,+\infty[$, $u(x)=\frac1{1+x}$ appartient à $H^1(\Omega)$ sans être intégrable, et $|\Omega|=+\infty$ : la moyenne n'a pas de sens.

Solution :
**Négation.** Si aucune constante ne convient, pour tout $n\ge 1$ il existe $u_n\in H^1(\Omega)$ tel que $\|u_n-(u_n)_\Omega\|_{L^2}>n\|\nabla u_n\|_{L^2}\ge 0$. On normalise : $v_n=\frac{u_n-(u_n)_\Omega}{\|u_n-(u_n)_\Omega\|_{L^2}}$ vérifie $(v_n)_\Omega=0$, $\|v_n\|_{L^2}=1$ et $\|\nabla v_n\|_{L^2}<\frac1n$, donc $\|v_n\|^2_{H^1}\le 2$.

**Compacité.** $\Omega$ étant borné et lipschitzien, Rellich–Kondrachov fournit une sous-suite $(v_{n_k})$ convergeant fortement dans $L^2(\Omega)$ vers un $v$.

**Passage à la limite.** La convergence forte donne $\|v\|_{L^2}=1$ et, par continuité de la moyenne ($|w_\Omega|\le|\Omega|^{-1/2}\|w\|_{L^2}$), $v_\Omega=0$. Pour $\varphi\in\mathcal D(\Omega)$ : $\int_\Omega v\,\partial_i\varphi=\lim_k\int_\Omega v_{n_k}\partial_i\varphi=-\lim_k\int_\Omega\partial_iv_{n_k}\,\varphi=0$, car $\|\partial_iv_{n_k}\|_{L^2}\to 0$. Donc $\nabla v=0$ dans $\mathcal D'(\Omega)$ ; les gradients convergent ici fortement vers $0$, a fortiori faiblement, comme l'écrit le polycopié.

**Contradiction.** $\Omega$ étant connexe, $v$ est presque partout égale à une constante $c$, et $c=v_\Omega=0$ : donc $v=0$, ce qui contredit $\|v\|_{L^2}=1$.

**Remarques.** La preuve ne fournit aucune valeur de $C_\Omega$. La convergence forte est indispensable : une limite faible ne donnerait que $\|v\|_{L^2}\le 1$. Le fait qu'une distribution de gradient nul sur un ouvert connexe soit constante se démontre par régularisation : $v$ est localement constante, et la connexité recolle les constantes.

Indices :
1. Que signifie précisément « aucune constante ne convient » ? Quantifie, puis normalise pour obtenir une suite de norme $L^2$ égale à $1$.
2. La suite normalisée est bornée dans $H^1$ : la compacité de Rellich donne une limite forte dans $L^2$. Examine sa norme, sa moyenne et son gradient.
3. $\nabla v=0$ sur un ouvert connexe donne $v$ constante ; la moyenne nulle force $v=0$, incompatible avec $\|v\|_{L^2}=1$.

Erreurs fréquentes :
- Conclure $\|v\|_{L^2}=1$ à partir d'une convergence faible.
- Oublier la connexité pour passer de « gradient nul » à « constante ».
- Appliquer Poincaré à $u-u_\Omega$, qui n'est pas dans $H^1_0(\Omega)$.

Variante : Soit $\Omega=]a,b[$ avec $a<b$. Montrer directement, sans compacité, que $\|u-u_\Omega\|_{L^2}\le(b-a)\|u'\|_{L^2}$ pour tout $u\in H^1(]a,b[)$.

Solution de la variante : Tout $u\in H^1(]a,b[)$ admet un représentant continu tel que $u(x)-u(y)=\int_y^xu'$ pour $x,y\in[a,b]$ ; par Cauchy–Schwarz, $|u(x)-u(y)|\le(b-a)^{1/2}\|u'\|_{L^2}$. Comme $u(x)-u_\Omega=\frac1{b-a}\int_a^b\big(u(x)-u(y)\big)\,dy$, on obtient $|u(x)-u_\Omega|\le(b-a)^{1/2}\|u'\|_{L^2}$ pour tout $x$, puis, en intégrant sur $]a,b[$, $\|u-u_\Omega\|^2_{L^2}\le(b-a)^2\|u'\|^2_{L^2}$. La constante $b-a$ est explicite, sans être annoncée comme optimale ; la connexité de l'intervalle intervient dans la formule $u(x)-u(y)=\int_y^xu'$.

Vérification : {"origin":"polycopie","review":"machine"}

## Exercice difficile `poincare-wirtinger.difficile` : Problème de Neumann : compatibilité, constantes, moyenne nulle

Énoncé : Soit $\Omega\subset\mathbb R^d$ un ouvert borné, connexe et lipschitzien, $f\in L^2(\Omega)$ et $a(u,v)=\int_\Omega\nabla u\cdot\nabla v$. Le problème de Neumann $-\Delta u=f$ dans $\Omega$, $\partial_\nu u=0$ sur $\partial\Omega$, s'écrit sous forme faible : trouver $u\in H^1(\Omega)$ tel que $a(u,v)=\int_\Omega fv$ pour tout $v\in H^1(\Omega)$. Montrer que $\int_\Omega f=0$ est nécessaire. Sous cette condition, montrer qu'il existe une unique solution $u_0$ dans $V_0=\{v\in H^1(\Omega) : \int_\Omega v=0\}$, que les solutions dans $H^1(\Omega)$ sont exactement les $u_0+c$, $c\in\mathbb R$, et que $\|\nabla u_0\|_{L^2}\le C_\Omega\|f\|_{L^2}$.
Source : {"doc":"polycopie","pdfPage":14,"label":"Section 3.5 ; exercice 10, difficile (p. PDF 40)"} — prérequis : lax-milgram

But : `fin` — usage : application

Nœuds :
- `h-omega` (hypothese) : $\Omega\subset\mathbb R^d$ est un ouvert borné et lipschitzien.
- `h-connexe` (hypothese) : $\Omega$ est connexe.
- `h-f` (hypothese) : $f\in L^2(\Omega)$.
- `h-comp` (hypothese) : $\int_\Omega f=0$ (condition de compatibilité).
- `d-a` (definition) : $a(u,v)=\int_\Omega\nabla u\cdot\nabla v$ ; une solution est un $u\in H^1(\Omega)$ tel que $a(u,v)=\int_\Omega fv$ pour tout $v\in H^1(\Omega)$ ; $V_0=\{v\in H^1(\Omega) : \int_\Omega v=0\}$.
- `nec` (consequence) : S'il existe une solution $u\in H^1(\Omega)$, alors $\int_\Omega f=0$.
- `cadre` (consequence) : $V_0$ est un sous-espace fermé de $H^1(\Omega)$, donc un espace de Hilbert, sur lequel $a$ et $v\mapsto\int_\Omega fv$ sont continues.
- `coer` (inegalite) : Pour tout $v\in V_0$ : $\|v\|_{L^2}\le C_\Omega\|\nabla v\|_{L^2}$, donc $a(v,v)\ge\frac{1}{1+C_\Omega^2}\|v\|^2_{H^1}$.
- `lm` (application-theoreme) : Il existe un unique $u_0\in V_0$ tel que $a(u_0,v)=\int_\Omega fv$ pour tout $v\in V_0$.
- `ext` (egalite) : Pour tout $v\in H^1(\Omega)$ : $a(u_0,v)=\int_\Omega fv$ ; $u_0$ est solution.
- `toutes` (consequence) : Les solutions dans $H^1(\Omega)$ sont exactement les $u_0+c$, $c\in\mathbb R$ ; $u_0$ est la seule de moyenne nulle.
- `est` (inegalite) : $\|\nabla u_0\|_{L^2}\le C_\Omega\|f\|_{L^2}$.
- `fin` (conclusion) : La condition $\int_\Omega f=0$ est nécessaire ; sous cette condition, le problème de Neumann admet une unique solution $u_0$ de moyenne nulle, les solutions sont les $u_0+c$, $c\in\mathbb R$, et $\|\nabla u_0\|_{L^2}\le C_\Omega\|f\|_{L^2}$.
- `x-unique-H1` (consequence, DISTRACTEUR) : Le problème faible admet une unique solution dans $H^1(\Omega)$.
- `x-sans-comp` (consequence, DISTRACTEUR) : Pour tout $f\in L^2(\Omega)$, le problème faible admet une solution dans $H^1(\Omega)$.

Règles :
- `d-a` + `h-omega` ⟹ `nec` par « La constante $1$ appartient à $H^1(\Omega)$ ($\Omega$ borné) et $\nabla 1=0$ : on teste l'équation par $v=1$. »
- `d-a` + `h-omega` + `h-f` ⟹ `cadre` par « $V_0$ est le noyau de $v\mapsto\int_\Omega v$, continue car $\left|\int_\Omega v\right|\le|\Omega|^{1/2}\|v\|_{L^2}$ ; continuité de $a$ et du second membre par Cauchy–Schwarz. »
- `d-a` + `h-omega` + `h-connexe` ⟹ `coer` par « Poincaré–Wirtinger pour $v\in V_0$, où $v_\Omega=0$, puis $\|v\|^2_{H^1}\le(1+C_\Omega^2)\|\nabla v\|^2_{L^2}$. [poincare-wirtinger] »
- `cadre` + `coer` ⟹ `lm` par « Théorème de Lax–Milgram dans le Hilbert $V_0$. [lax-milgram] »
- `lm` + `h-comp` + `d-a` ⟹ `ext` par « Décomposition $v=(v-v_\Omega)+v_\Omega$, avec $v-v_\Omega\in V_0$ et $\nabla v_\Omega=0$, équation sur $V_0$, puis condition de compatibilité. »
- `ext` + `d-a` + `h-connexe` ⟹ `toutes` par « Si $w$ est la différence de deux solutions, le test $v=w$ donne $\nabla w=0$, donc $w$ est constante sur l'ouvert connexe $\Omega$ ; réciproquement, une constante ne change pas $\nabla u$. »
- `lm` + `coer` + `h-f` ⟹ `est` par « Test par $v=u_0\in V_0$, Cauchy–Schwarz, puis Poincaré–Wirtinger. »
- `nec` + `toutes` + `est` ⟹ `fin` par « Réunion des résultats établis. »

Justifications sans règle (séduisantes ou fausses) : « Lax–Milgram dans $H^1(\Omega)$ tout entier, avec la forme $a$. » ; « $\nabla(v-v_\Omega)=\nabla v$ : l'équation testée sur $V_0$ vaut donc pour tout $v\in H^1(\Omega)$. » ; « Inégalité de Poincaré pour $v\in V_0$. »

Pièges :
- `x-unique-H1` → incorrect [compatibilite-neumann] : Les constantes forment le noyau de la forme : la solution n’est unique qu’à une constante près, ou après normalisation par la moyenne. — Contre-exemple : Si $u_0$ est solution, $u_0+1$ l'est aussi, car $\nabla(u_0+1)=\nabla u_0$.
- `x-sans-comp` → incorrect [compatibilite-neumann] : Tester par $v=1$ montre que $\int_\Omega f=0$ est nécessaire. — Contre-exemple : Pour $f\equiv 1$ : $a(u,1)=0$ pour tout $u$, alors que $\int_\Omega f=|\Omega|\neq 0$.
- `lm` par « Lax–Milgram dans $H^1(\Omega)$ tout entier, avec la forme $a$. » → incorrect [hypotheses-theoreme] : Lax–Milgram exige la coercivité sur l'espace où l'on se place ; elle échoue sur $H^1(\Omega)$ à cause des constantes : on travaille dans $V_0$. — Contre-exemple : $a(1,1)=0$ avec $1\in H^1(\Omega)$ non nulle.
- `ext` par « $\nabla(v-v_\Omega)=\nabla v$ : l'équation testée sur $V_0$ vaut donc pour tout $v\in H^1(\Omega)$. » → incorrect [compatibilite-neumann] : Le second membre voit la constante retirée : $\int_\Omega f(v-v_\Omega)=\int_\Omega fv-v_\Omega\int_\Omega f$. Sans $\int_\Omega f=0$, le passage échoue. — Contre-exemple : Pour $f\equiv 1$ et $v=1$ : $a(u_0,1)=0$, alors que $\int_\Omega f=|\Omega|\neq 0$.
- `coer` par « Inégalité de Poincaré pour $v\in V_0$. » → incorrect [poincare-wirtinger-constantes] : Poincaré porte sur $H^1_0(\Omega)$ ; une fonction de $V_0$ n'est pas nulle au bord en général. C'est Poincaré–Wirtinger, grâce à la moyenne nulle, qui s'applique. — Contre-exemple : Sur $]0,1[$, $v(x)=x-\frac12\in V_0$ vaut $-\frac12$ en $0$ : $v\notin H^1_0(]0,1[)$.

Retraits :
- `h-comp` (nécessaire) : La solution $u_0\in V_0$ existe encore, mais elle ne vérifie plus l'équation pour $v=1$ : le problème de Neumann n'a pas de solution. — Contre-exemple : Sur $\Omega=]0,1[$ avec $f=1$, une solution vérifierait $0=a(u,1)=\int_0^1f=1$.
- `h-connexe` (nécessaire) : Le noyau de la forme contient alors les fonctions localement constantes, et Poincaré–Wirtinger tombe. — Contre-exemple : $\Omega=]0,1[\cup]2,3[$ : $w=\mathbb 1_{]0,1[}$ vérifie $a(w,v)=0$ pour tout $v$ sans être constante, et $w-w_\Omega$ est de moyenne nulle, non nulle, de gradient nul.

Calculs fermés : [{"kind":"rational","prompt":"Pour $\\Omega=]0,1[$ et $f(x)=x-\\lambda$, valeur de $\\lambda$ rendant le problème compatible","expected":"1/2"}]

Solution :
**Nécessité.** $\Omega$ étant borné, $1\in H^1(\Omega)$ et $\nabla 1=0$. Si $u$ est solution, le choix $v=1$ donne $0=a(u,1)=\int_\Omega f$.

**Cadre.** $V_0$ est le noyau de $v\mapsto\int_\Omega v$, forme linéaire continue sur $H^1(\Omega)$ puisque $\left|\int_\Omega v\right|\le|\Omega|^{1/2}\|v\|_{L^2}$ : c'est un sous-espace fermé, donc un Hilbert. Pour $v\in V_0$, $v_\Omega=0$, et Poincaré–Wirtinger donne $\|v\|_{L^2}\le C_\Omega\|\nabla v\|_{L^2}$, d'où $a(v,v)\ge\frac1{1+C_\Omega^2}\|v\|^2_{H^1}$. La forme $a$ et le second membre $v\mapsto\int_\Omega fv$ sont continus par Cauchy–Schwarz.

**Existence et unicité dans $V_0$.** Lax–Milgram donne un unique $u_0\in V_0$ tel que $a(u_0,v)=\int_\Omega fv$ pour tout $v\in V_0$.

**Toutes les fonctions tests.** Pour $v\in H^1(\Omega)$, $v-v_\Omega\in V_0$ et $\nabla(v-v_\Omega)=\nabla v$, donc
$$a(u_0,v)=a(u_0,v-v_\Omega)=\int_\Omega f(v-v_\Omega)=\int_\Omega fv-v_\Omega\int_\Omega f=\int_\Omega fv,$$
grâce à la compatibilité : $u_0$ résout le problème faible.

**Rôle des constantes et de la moyenne nulle.** Si $u$ est une autre solution, $w=u-u_0$ vérifie $a(w,v)=0$ pour tout $v$ ; avec $v=w$, $\nabla w=0$, et la connexité donne $w=c$ constante. Réciproquement, $u_0+c$ est solution pour tout $c$. Les constantes forment exactement le noyau de la forme $a$ : c'est pourquoi la coercivité n'a lieu que sur $V_0$, et la normalisation $\int_\Omega u=0$ sélectionne l'unique solution $u_0$.

**Estimation.** Avec $v=u_0$ : $\|\nabla u_0\|^2_{L^2}=\int_\Omega fu_0\le\|f\|_{L^2}\|u_0\|_{L^2}\le C_\Omega\|f\|_{L^2}\|\nabla u_0\|_{L^2}$, d'où $\|\nabla u_0\|_{L^2}\le C_\Omega\|f\|_{L^2}$.

Indices :
1. Que se passe-t-il si l'on teste la formulation faible avec la fonction constante $1$ ? Sur quel espace la forme $a$ peut-elle être coercive ?
2. Travaille dans $V_0$ : Poincaré–Wirtinger y donne la coercivité, Lax–Milgram une unique solution. Il reste à tester par un $v\in H^1(\Omega)$ quelconque, décomposé en $(v-v_\Omega)+v_\Omega$.
3. $\int_\Omega f(v-v_\Omega)=\int_\Omega fv-v_\Omega\int_\Omega f$ ; la différence de deux solutions a un gradient nul, donc est constante sur l'ouvert connexe $\Omega$.

Erreurs fréquentes :
- Appliquer Lax–Milgram sur $H^1(\Omega)$, où $a$ n'est pas coercive.
- Affirmer l'unicité dans $H^1(\Omega)$ sans normalisation.
- Oublier la compatibilité en passant de $V_0$ à $H^1(\Omega)$.

Variante : Sur $\Omega=]0,1[$, soit $f(x)=x-\frac12$. Vérifier la compatibilité, déterminer l'unique solution de moyenne nulle du problème de Neumann $-u''=f$, $u'(0)=u'(1)=0$, et décrire toutes les solutions.

Solution de la variante : $\int_0^1\left(x-\frac12\right)dx=0$ : le problème est compatible. La primitive de $-f$ nulle en $0$ est $u'(x)=\frac x2-\frac{x^2}2$, qui vérifie aussi $u'(1)=0$. Donc $u(x)=\frac{x^2}4-\frac{x^3}6+K$, et $\int_0^1\left(\frac{x^2}4-\frac{x^3}6\right)dx=\frac1{12}-\frac1{24}=\frac1{24}$ impose $K=-\frac1{24}$. L'unique solution de moyenne nulle est $u_0(x)=\frac{x^2}4-\frac{x^3}6-\frac1{24}$, et les solutions sont les $u_0+c$, $c\in\mathbb R$. C'est bien une solution faible : pour $v\in H^1(]0,1[)$, $\int_0^1u_0'v'=\big[u_0'v\big]_0^1-\int_0^1u_0''v=\int_0^1fv$, le crochet étant nul.

Vérification : {"origin":"complement","review":"machine","notes":"Squelette du polycopié (section 3.5) complété : nécessité de la compatibilité, extension aux fonctions tests de H¹, description de toutes les solutions, estimation."}