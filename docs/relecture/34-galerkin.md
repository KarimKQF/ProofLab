# 34. Méthode de Galerkin et passage à la limite (`galerkin`) — polycopié p. PDF 31, section 8

## Fiche

Espaces : $\Omega\subset\mathbb R^d$ borné lipschitzien, $T>0$ ; $V=H^1_0(\Omega)$, de norme $\|v\|_V=\|\nabla v\|_{L^2}$, $H=L^2(\Omega)$, $V'=H^{-1}(\Omega)$. | Triplet $V\hookrightarrow H\hookrightarrow V'$ ; $\langle\cdot,\cdot\rangle_{V',V}$ crochet de dualité.

Hypothèses :
- $u_0\in L^2(\Omega)$.
- $f\in L^2(0,T;H^{-1}(\Omega))$.

Énoncé : Il existe une unique $u\in L^2(0,T;V)$, $u'\in L^2(0,T;V')$, telle que $\langle u'(t),v\rangle_{V',V}+\int_\Omega\nabla u(t)\cdot\nabla v=\langle f(t),v\rangle_{V',V}$ pour tout $v\in V$ et presque tout $t$, et $u(0)=u_0$ dans $H$. De plus $u\in C([0,T];H)$ et, pour tout $t\in[0,T]$,
$$\|u(t)\|_H^2+\int_0^t\|u\|_V^2\le\|u_0\|_H^2+\int_0^t\|f\|_{V'}^2,\quad\text{donc}\quad\sup_{t\in[0,T]}\|u(t)\|_H^2+\int_0^T\|u\|_V^2\le 2\Big(\|u_0\|_H^2+\|f\|^2_{L^2(0,T;V')}\Big).$$

Bilan : {"existence":"Limite faible d'approximations de Galerkin spectrales, bornées dans $L^2(0,T;V)$ avec dérivées bornées dans $L^2(0,T;V')$.","unicite":"Pour $w=u-v$ : $\\frac12\\|w(t)\\|_H^2+\\int_0^t\\|w\\|_V^2=\\frac12\\|w(0)\\|_H^2=0$.","regularite":"$u\\in C([0,T];H)$ par Lions–Magenes.","stabilite":"Estimation a priori corrigée : facteur $2$ dans la forme globale."}

Preuve dans le polycopié : complete

Plan :
1. Approximation : $V_n=\mathrm{Vect}(\varphi_1,\dots,\varphi_n)$, base propre du Laplacien de Dirichlet ; $c_j'+\lambda_jc_j=\langle f,\varphi_j\rangle$, $c_j(0)=(u_0,\varphi_j)_H$.
2. Estimations : test par $u_n$ et Young ; pour tout $t$, $\|u_n(t)\|_H^2+\int_0^t\|u_n\|_V^2\le\|u_0\|_H^2+\int_0^t\|f\|_{V'}^2$ ; puis $\|u_n'(t)\|_{V'}\le\|f(t)\|_{V'}+\|u_n(t)\|_V$ grâce à $\|P_nv\|_V\le\|v\|_V$.
3. Extraction faible dans $L^2(0,T;V)$ et $L^2(0,T;V')$ ; identification $u_n'\rightharpoonup u'$. La convergence forte (Aubin–Lions) n'est pas indispensable au problème linéaire.
4. Équation limite : test par $\varphi_k\eta$, passage à la limite par les convergences faibles, densité des $\varphi_k$ dans $V$.
5. Condition initiale : Lions–Magenes, test par $\eta\in C^1([0,T])$ avec $\eta(T)=0$.
6. Unicité : test par la différence de deux solutions.

Vigilance :
- Erreur du polycopié (p. PDF 31 et 32) : $\sup_t\|u\|_H^2+\int_0^T\|u\|_V^2\le\|u_0\|_H^2+\|f\|^2_{L^2(V')}$ est fausse telle quelle ; pour $f=0$ et $u_0=\varphi_1$, le membre de gauche vaut $1+\frac{1-e^{-2\lambda_1T}}2>1$. Il faut le facteur $2$.
- Dans le problème linéaire, les convergences faibles suffisent ; la convergence forte n’y est pas indispensable.
- Pour une non-linéarité $g(u)$, les convergences faibles ne suffisent pas en général ; dans la preuve du polycopié (section 8.7), c'est la compacité d'Aubin–Lions, puis Lipschitz, qui permet le passage à la limite.
- Pour une non-linéarité en gradient, Aubin–Lions ne suffit pas : il faut d'autres arguments, notamment celui de Minty pour un opérateur monotone, l'hypothèse du $\limsup$ étant démontrée d'abord.

Vérification : {"origin":"polycopie-corrige","review":"machine","notes":"Estimation a priori corrigée : celle des p. PDF 31 et 32 est fausse telle quelle (f = 0, u0 = φ1) ; le facteur 2 est rétabli."}

Définition « Système de Galerkin spectral » : $u_n(t)=\sum_{k\le n}c_k(t)\varphi_k$ vérifie $(u_n',v)_H+\int_\Omega\nabla u_n\cdot\nabla v=\langle f,v\rangle_{V',V}$ pour tout $v\in V_n=\mathrm{Vect}(\varphi_1,\dots,\varphi_n)$, et $u_n(0)=P_nu_0$.

## Contre-exemple `ce-galerkin-estimation` : L’estimation a priori sans facteur 2
Assertion : $\sup_t\|u(t)\|_H^2+\int_0^T\|u\|_V^2\le\|u_0\|_H^2+\|f\|^2_{L^2(0,T;V')}$ (polycopié, p. PDF 31 et 32).
Tâche : Sur $\Omega=]0,\pi[$, $\varphi_1=\sqrt{2/\pi}\sin x$, $\lambda_1=1$, $f=0$, $u_0=\varphi_1$ : calcule la limite, quand $T\to+\infty$, de $\sup_t\|u(t)\|_H^2+\int_0^T\|u\|_V^2$.
Vérification : {"kind":"rational","prompt":"Valeur de la limite","expected":"3/2"}
Explication : $u(t)=e^{-t}\varphi_1$ : $\sup_t\|u(t)\|_H^2=1$ et $\int_0^T\|u\|_V^2=\int_0^Te^{-2t}\,dt=\frac{1-e^{-2T}}2\to\frac12$. Le membre de gauche tend vers $\frac32$, alors que le membre de droite vaut $\|u_0\|_H^2=1$.

## Contre-exemple `ce-galerkin-gradient` : Non-linéarité en gradient
Assertion : Aubin–Lions et une non-linéarité lipschitzienne $G$ permettent toujours de passer à la limite dans $G(\nabla u_n)$.
Tâche : Sur $]0,1[$, $u_n=\frac{\sin(2\pi nx)}{2\pi n}\to 0$ dans $L^2$ et $G(r)=\min(r^2,1)$, lipschitzienne. Calcule la limite faible constante de $G(u_n')$.
Vérification : {"kind":"rational","prompt":"Limite faible de $G(u_n')$","expected":"1/2"}
Explication : $u_n'=\cos(2\pi nx)$, donc $G(u_n')=\cos^2(2\pi nx)=\frac{1+\cos(4\pi nx)}2\rightharpoonup\frac12$, alors que $G(0)=0$ : la limite du terme non linéaire n'est pas $G$ de la limite.

## Exercice facile `galerkin.facile` : Système de Galerkin du problème parabolique de Dirichlet

Énoncé : Soit $\Omega$ borné lipschitzien, $T>0$, $V=H^1_0(\Omega)\hookrightarrow H=L^2(\Omega)\hookrightarrow V'$, $u_0\in H$, $f\in L^2(0,T;V')$, et $(\varphi_k)$ une base orthonormée de $H$ de fonctions propres du Laplacien de Dirichlet : $\varphi_k\in V$, $\int_\Omega\nabla\varphi_j\cdot\nabla\varphi_k=\lambda_j\delta_{jk}$, $\lambda_k>0$. Écrire le système de Galerkin sur $V_n=\mathrm{Vect}(\varphi_1,\dots,\varphi_n)$ sous forme d'équations différentielles pour les coefficients, et le résoudre.
Source : {"doc":"polycopie","pdfPage":44,"label":"Exercice 34, facile (p. PDF 44) ; section 8.2 (p. PDF 31)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-tri` (hypothese) : $V=H^1_0(\Omega)\hookrightarrow H=L^2(\Omega)\hookrightarrow V'$, $u_0\in H$, $f\in L^2(0,T;V')$.
- `h-base` (hypothese) : $(\varphi_k)$ est une base orthonormée de $H$, $\varphi_k\in V$, $\int_\Omega\nabla\varphi_j\cdot\nabla\varphi_k=\lambda_j\delta_{jk}$, $\lambda_k>0$.
- `d-gal` (definition) : On cherche $u_n(t)=\sum_{k=1}^nc_k(t)\varphi_k$ tel que $(u_n',v)_H+\int_\Omega\nabla u_n\cdot\nabla v=\langle f,v\rangle_{V',V}$ pour tout $v\in V_n$, et $u_n(0)=P_nu_0$, où $P_n$ est la projection orthogonale de $H$ sur $V_n$.
- `test` (consequence) : L'équation pour tout $v\in V_n$ équivaut à l'équation pour $v=\varphi_j$, $1\le j\le n$.
- `mass` (egalite) : $(u_n',\varphi_j)_H=c_j'$ et $\int_\Omega\nabla u_n\cdot\nabla\varphi_j=\lambda_jc_j$.
- `init` (egalite) : $c_j(0)=(P_nu_0,\varphi_j)_H=(u_0,\varphi_j)_H$ pour $j\le n$.
- `syst` (egalite) : $c_j'(t)+\lambda_jc_j(t)=\langle f(t),\varphi_j\rangle_{V',V}$, $c_j(0)=(u_0,\varphi_j)_H$, pour $1\le j\le n$ : $n$ équations découplées.
- `gj` (consequence) : $g_j(t)=\langle f(t),\varphi_j\rangle_{V',V}$ définit un élément de $L^2(0,T)$.
- `sol` (egalite) : $c_j(t)=e^{-\lambda_jt}(u_0,\varphi_j)_H+\int_0^te^{-\lambda_j(t-r)}g_j(r)\,dr$ est l'unique solution absolument continue.
- `fin` (conclusion) : Le système de Galerkin est un système de $n$ équations différentielles linéaires découplées, uniquement soluble : $u_n\in H^1(0,T;V_n)$.
- `x-couple` (consequence, DISTRACTEUR) : Chaque $c_j'$ dépend de tous les coefficients $c_1,\dots,c_n$.
- `x-lambda` (egalite, DISTRACTEUR) : $c_j'+c_j=\langle f,\varphi_j\rangle_{V',V}$.
- `x-C1` (consequence, DISTRACTEUR) : Les coefficients $c_j$ sont de classe $C^1$ sur $[0,T]$.

Règles :
- `d-gal` ⟹ `test` par « Linéarité en $v$ des deux membres, et $(\varphi_1,\dots,\varphi_n)$ base de $V_n$. »
- `d-gal` + `h-base` ⟹ `mass` par « Orthonormalité de $(\varphi_k)$ dans $H$ et relation $\int\nabla\varphi_k\cdot\nabla\varphi_j=\lambda_j\delta_{jk}$. »
- `d-gal` + `h-base` ⟹ `init` par « $P_nu_0=\sum_{k\le n}(u_0,\varphi_k)_H\varphi_k$. »
- `test` + `mass` + `init` ⟹ `syst` par « Report des deux identités dans l'équation testée par $\varphi_j$. »
- `h-tri` + `h-base` ⟹ `gj` par « $|g_j(t)|\le\|f(t)\|_{V'}\|\varphi_j\|_V$, et $g_j$ est mesurable. »
- `syst` + `gj` ⟹ `sol` par « Variation de la constante : $\big(e^{\lambda_jt}c_j\big)'=e^{\lambda_jt}g_j$ presque partout, puis intégration ; unicité par différence de deux solutions. »
- `syst` + `sol` ⟹ `fin` par « Réunion des résultats établis. »

Justifications sans règle (séduisantes ou fausses) : « Théorème de Cauchy–Lipschitz classique, le second membre étant continu en temps. »

Pièges :
- `x-couple` → incorrect [galerkin-projection] : Avec la base spectrale, les matrices de masse $(\varphi_k,\varphi_j)_H=\delta_{jk}$ et de rigidité $\lambda_j\delta_{jk}$ sont diagonales : le système est découplé. — Contre-exemple : Pour $n=2$ : $c_1'=g_1-\lambda_1c_1$ ne fait pas intervenir $c_2$. Le couplage peut apparaître avec une autre base, par exemple $\psi_1=\varphi_1$, $\psi_2=\varphi_1+\varphi_2$, de matrice de masse $\begin{pmatrix}1&1\\1&2\end{pmatrix}$.
- `x-lambda` → incorrect [calcul-exact] : Le terme $\int\nabla u_n\cdot\nabla\varphi_j$ vaut $\lambda_jc_j$, non $c_j$. — Contre-exemple : Sur $]0,\pi[$, $f=0$, $u_0=\varphi_2$, $\lambda_2=4$ : $e^{-t}\varphi_2$ ne vérifie pas l'équation, car $-e^{-t}+4e^{-t}\neq 0$.
- `x-C1` → incorrect [hypotheses-theoreme] : Avec $f\in L^2(0,T;V')$, $c_j'=g_j-\lambda_jc_j$ n'est en général que de carré intégrable : $c_j$ est absolument continue, pas $C^1$ en général. — Contre-exemple : $f(t)=\mathbb 1_{]0,T/2[}(t)\,\varphi_1$ : $c_1'$ saute en $t=T/2$.
- `sol` par « Théorème de Cauchy–Lipschitz classique, le second membre étant continu en temps. » → incorrect [hypotheses-theoreme] : Le second membre $g_j$ n'est que dans $L^2(0,T)$ : le théorème classique ne s'applique pas ; la formule de variation de la constante fournit directement la solution absolument continue. — Contre-exemple : $g_1=\mathbb 1_{]0,T/2[}$ n'est pas continue.

Retraits :
- `h-base` (nécessaire) : Avec une base quelconque de $V_n$, on obtient $Mc'+Kc=F$ : le système reste soluble ($M$ inversible) mais en général couplé, et la formule explicite disparaît. — Contre-exemple : Base $\psi_1=\varphi_1$, $\psi_2=\varphi_1+\varphi_2$ : matrice de masse $\begin{pmatrix}1&1\\1&2\end{pmatrix}$.

Calculs fermés : [{"kind":"rational","prompt":"Sur $\\Omega=]0,\\pi[$, avec $\\varphi_k=\\sqrt{2/\\pi}\\sin(kx)$ : valeur de $\\int_0^\\pi|\\varphi_2'|^2$","expected":"4"}]

Solution :
**Système.** Par linéarité, l'équation sur $V_n$ équivaut à l'équation testée par $\varphi_j$, $1\le j\le n$. Par orthonormalité, $(u_n',\varphi_j)_H=c_j'$, et $\int\nabla u_n\cdot\nabla\varphi_j=\sum_kc_k\lambda_k\delta_{kj}=\lambda_jc_j$. La donnée initiale donne $c_j(0)=(u_0,\varphi_j)_H$. D'où
$$c_j'(t)+\lambda_jc_j(t)=\langle f(t),\varphi_j\rangle_{V',V},\qquad c_j(0)=(u_0,\varphi_j)_H,\qquad 1\le j\le n.$$
**Résolution.** $g_j=\langle f,\varphi_j\rangle\in L^2(0,T)$ ; la variation de la constante donne l'unique solution absolument continue $c_j(t)=e^{-\lambda_jt}(u_0,\varphi_j)_H+\int_0^te^{-\lambda_j(t-r)}g_j(r)\,dr$. Les équations sont découplées parce que la base est spectrale ; $c_j$ n'est pas $C^1$ en général.

Indices :
1. Par quelles fonctions suffit-il de tester l'équation lorsque $v$ parcourt $V_n$ ?
2. Utilise $(\varphi_k,\varphi_j)_H=\delta_{kj}$ et $\int\nabla\varphi_k\cdot\nabla\varphi_j=\lambda_j\delta_{kj}$ : que deviennent les deux termes ?
3. Tu obtiens $c_j'+\lambda_jc_j=g_j$ : multiplie par $e^{\lambda_jt}$ et intègre.

Erreurs fréquentes :
- Oublier le facteur $\lambda_j$ dans le terme de rigidité.
- Invoquer Cauchy–Lipschitz classique avec un second membre seulement de carré intégrable en temps.

Variante : Même cadre pour $\partial_tu-\Delta u+u=f$. Écrire le système de Galerkin, puis, sur $\Omega=]0,\pi[$ avec $f=0$ et $u_0=\varphi_1$, calculer $c_1(t)e^{2t}$.

Solution de la variante : Le terme supplémentaire donne $(u_n,\varphi_j)_H=c_j$, d'où $c_j'+(\lambda_j+1)c_j=\langle f,\varphi_j\rangle$, $c_j(0)=(u_0,\varphi_j)_H$. Sur $]0,\pi[$, $\lambda_1=1$ ; avec $f=0$ et $u_0=\varphi_1$, $c_1(t)=e^{-2t}$, donc $c_1(t)e^{2t}=1$.

Graphe de la variante :
But : `fin` — usage : application

Nœuds :
- `h-base` (hypothese) : $(\varphi_k)$ base orthonormée de $H$, $\int\nabla\varphi_j\cdot\nabla\varphi_k=\lambda_j\delta_{jk}$ ; sur $]0,\pi[$, $\lambda_1=1$.
- `d-gal` (definition) : $(u_n',v)_H+\int\nabla u_n\cdot\nabla v+(u_n,v)_H=\langle f,v\rangle$ pour $v\in V_n$, $u_n(0)=P_nu_0$, $u_n=\sum_{k\le n}c_k\varphi_k$.
- `d-data` (definition) : $f=0$, $u_0=\varphi_1$.
- `syst` (egalite) : $c_j'+(\lambda_j+1)c_j=\langle f,\varphi_j\rangle$, $c_j(0)=(u_0,\varphi_j)_H$.
- `c1` (egalite) : $c_1(t)=e^{-2t}$.
- `val` (egalite, calcul rational) : $c_1(t)e^{2t}=1$.
  - valeur attendue : "1"
- `fin` (conclusion) : Le système de Galerkin est $c_j'+(\lambda_j+1)c_j=\langle f,\varphi_j\rangle$, et $c_1(t)=e^{-2t}$ pour les données choisies.
- `x-oubli` (egalite, DISTRACTEUR) : $c_1(t)=e^{-t}$.

Règles :
- `d-gal` + `h-base` ⟹ `syst` par « Test par $\varphi_j$, orthonormalité et relation spectrale ; le terme d'ordre zéro donne $c_j$. »
- `syst` + `d-data` + `h-base` ⟹ `c1` par « $c_1'+2c_1=0$ et $c_1(0)=(\varphi_1,\varphi_1)_H=1$. »
- `c1` ⟹ `val` par « Multiplication par l’exponentielle. »
- `syst` + `val` ⟹ `fin` par « Réunion des résultats établis. »

Pièges :
- `x-oubli` → incorrect [calcul-exact] : Le coefficient est $\lambda_1+1=2$ : il ne faut oublier ni la rigidité ni le terme d'ordre zéro. — Contre-exemple : $e^{-t}$ vérifie $c'+c=0$, et non $c'+2c=0$.

Retraits :
- `h-base` (nécessaire) : Sans relation spectrale, le système est en général couplé et la valeur explicite disparaît. — Contre-exemple : Base $\psi_1=\varphi_1$, $\psi_2=\varphi_1+\varphi_2$ : matrice de masse non diagonale.

Vérification : {"origin":"polycopie","review":"machine"}

## Exercice intermediaire `galerkin.intermediaire` : Estimations uniformes et extraction faible

Énoncé : Dans le cadre du système de Galerkin spectral ($\|v\|_V=\|\nabla v\|_{L^2}$), démontrer que pour tout $t\in[0,T]$, $\|u_n(t)\|_H^2+\int_0^t\|u_n\|_V^2\le\|u_0\|_H^2+\int_0^t\|f\|_{V'}^2$, en déduire $\sup_t\|u_n(t)\|_H^2+\int_0^T\|u_n\|_V^2\le 2\big(\|u_0\|_H^2+\|f\|_{L^2(0,T;V')}^2\big)$, borner $(u_n')$ dans $L^2(0,T;V')$, et extraire une sous-suite faiblement convergente dont on identifie la dérivée.
Source : {"doc":"polycopie","pdfPage":44,"label":"Exercice 34, intermédiaire (p. PDF 44) ; sections 8.3 et 8.4 (p. PDF 32)"} — prérequis : —

But : `fin` — usage : demonstration

Nœuds :
- `h-gal` (hypothese) : $u_n$ résout le système de Galerkin spectral : coefficients absolument continus, $u_n(0)=P_nu_0$, $(u_n',v)_H+\int\nabla u_n\cdot\nabla v=\langle f,v\rangle$ pour $v\in V_n$.
- `h-base` (hypothese) : $(\varphi_k)$ base orthonormée de $H$, $\int\nabla\varphi_j\cdot\nabla\varphi_k=\lambda_j\delta_{jk}$, et $\|v\|_V^2=\sum_k\lambda_k(v,\varphi_k)_H^2$ pour $v\in V$.
- `ident` (egalite) : $\frac12\frac{d}{dt}\|u_n\|_H^2+\|u_n\|_V^2=\langle f,u_n\rangle$ presque partout.
- `young` (inegalite) : $\langle f,u_n\rangle\le\frac12\|f\|_{V'}^2+\frac12\|u_n\|_V^2$.
- `int` (inegalite) : $\|u_n(t)\|_H^2+\int_0^t\|u_n\|_V^2\le\|P_nu_0\|_H^2+\int_0^t\|f\|_{V'}^2$ pour tout $t\in[0,T]$.
- `pn` (inegalite) : $\|P_nu_0\|_H\le\|u_0\|_H$ et $\|P_nv\|_V\le\|v\|_V$ pour $v\in V$.
- `est` (inegalite) : Pour tout $t\in[0,T]$ : $\|u_n(t)\|_H^2+\int_0^t\|u_n\|_V^2\le\|u_0\|_H^2+\int_0^t\|f\|_{V'}^2$.
- `est2` (inegalite) : $\sup_{t}\|u_n(t)\|_H^2+\int_0^T\|u_n\|_V^2\le 2\big(\|u_0\|_H^2+\|f\|_{L^2(0,T;V')}^2\big)$.
- `dual` (inegalite) : $\|u_n'(t)\|_{V'}\le\|f(t)\|_{V'}+\|u_n(t)\|_V$ presque partout.
- `deriv` (consequence) : $\sup_n\|u_n'\|_{L^2(0,T;V')}<\infty$.
- `ext` (application-theoreme) : Après extraction : $u_n\rightharpoonup u$ dans $L^2(0,T;V)$ et $u_n'\rightharpoonup g$ dans $L^2(0,T;V')$.
- `gu` (egalite) : $g=u'$ au sens des distributions à valeurs dans $V'$.
- `fin` (conclusion) : Les estimations uniformes (forme corrigée) sont établies, et une sous-suite converge faiblement, avec $u_n'\rightharpoonup u'$.
- `x-poly` (inegalite, DISTRACTEUR) : $\sup_{t}\|u_n(t)\|_H^2+\int_0^T\|u_n\|_V^2\le\|u_0\|_H^2+\|f\|_{L^2(0,T;V')}^2$.
- `x-fort` (consequence, DISTRACTEUR) : Toute suite bornée de $L^2(0,T;V)$ admet une sous-suite fortement convergente dans $L^2(0,T;V)$.
- `x-proj` (inegalite, DISTRACTEUR) : Pour tout sous-espace $W\subset V$ de dimension finie, la projection orthogonale $P_W$ de $H$ sur $W$ vérifie $\|P_Wv\|_V\le\|v\|_V$.

Règles :
- `h-gal` ⟹ `ident` par « Tester par $v=u_n(t)\in V_n$ : $(u_n',u_n)_H=\frac12\frac{d}{dt}\|u_n\|_H^2$ en dimension finie. »
- `ident` ⟹ `young` par « $\langle f,u_n\rangle\le\|f\|_{V'}\|u_n\|_V$, puis $ab\le\frac{a^2+b^2}2$. [young] »
- `ident` + `young` ⟹ `int` par « Absorber $\frac12\|u_n\|_V^2$, multiplier par $2$, intégrer de $0$ à $t$. »
- `h-base` ⟹ `pn` par « $P_n$ tronque le développement dans $(\varphi_k)$ : il diminue $\sum_k(v,\varphi_k)^2$ et $\sum_k\lambda_k(v,\varphi_k)^2$. »
- `int` + `pn` ⟹ `est` par « Report de $\|P_nu_0\|_H\le\|u_0\|_H$. »
- `est` ⟹ `est2` par « Pour chaque $t$, $\|u_n(t)\|_H^2$ et $\int_0^T\|u_n\|_V^2$ sont chacun majorés par le second membre pris en $t=T$ ; on additionne. »
- `h-gal` + `pn` ⟹ `dual` par « $\langle u_n',v\rangle=(u_n',P_nv)_H=\langle f,P_nv\rangle-\int\nabla u_n\cdot\nabla(P_nv)$, puis $\|P_nv\|_V\le\|v\|_V$. »
- `dual` + `est2` ⟹ `deriv` par « Carré, intégration en temps, et estimation précédente. »
- `est2` + `deriv` ⟹ `ext` par « Extraction faible dans les espaces réflexifs $L^2(0,T;V)$ et $L^2(0,T;V')$. [extraction-reflexive] »
- `ext` + `h-gal` ⟹ `gu` par « $\int_0^T\langle u_n',v\rangle\eta=-\int_0^T(u_n,v)_H\eta'$ pour $v\in V$, $\eta\in C^\infty_c(]0,T[)$, puis passage à la limite faible. »
- `est` + `est2` + `deriv` + `gu` ⟹ `fin` par « Réunion des résultats établis. »

Justifications sans règle (séduisantes ou fausses) : « Le $\sup$ en $t$ et l'intégrale sur $[0,T]$ se majorent ensemble par le même second membre, sans facteur. »

Pièges :
- `x-poly` → incorrect [galerkin-estimation] : Cette inégalité, écrite au polycopié (p. PDF 31 et 32), est fausse : le $\sup$ et l'intégrale sont majorés séparément par le second membre, et leur somme demande un facteur $2$. — Contre-exemple : $f=0$, $u_0=\varphi_1$ : $u_n(t)=e^{-\lambda_1t}\varphi_1$, le membre de gauche vaut $1+\frac{1-e^{-2\lambda_1T}}2>1$, le membre de droite vaut $1$.
- `est2` par « Le $\sup$ en $t$ et l'intégrale sur $[0,T]$ se majorent ensemble par le même second membre, sans facteur. » → incorrect [galerkin-estimation] : L'inégalité intégrée majore la somme à $t$ fixé ; le $\sup$ du premier terme et l'intégrale jusqu'à $T$ ne sont pas atteints au même instant. — Contre-exemple : $f=0$, $u_0=\varphi_1$ : $\sup_t\|u_n\|_H^2=1$ (en $t=0$) et $\int_0^T\|u_n\|_V^2=\frac{1-e^{-2\lambda_1T}}2>0$.
- `x-fort` → incorrect [bornee-non-convergente] : Une borne dans un espace réflexif ne donne qu’une sous-suite faiblement convergente. — Contre-exemple : $v_n(t)=\sin(nt)\,w$ avec $w\in V$ non nul : bornée dans $L^2(0,T;V)$, $v_n\rightharpoonup 0$, et $\|v_n\|_{L^2(0,T;V)}\not\to 0$.
- `x-proj` → incorrect [galerkin-projection] : La stabilité $\|P_nv\|_V\le\|v\|_V$ est propre au choix spectral ; elle tombe pour un sous-espace quelconque. — Contre-exemple : Sur $]0,1[$, $W=\mathrm{Vect}(\varphi_1+\varphi_2)$, $v=\varphi_1$ : $P_Wv=\frac{\varphi_1+\varphi_2}2$ et $\|P_Wv\|_V^2/\|v\|_V^2=\frac{\pi^2+4\pi^2}{4\pi^2}=\frac54$.

Retraits :
- `pn` (nécessaire) : La borne de $u_n'$ dans $L^2(0,T;V')$ repose sur $\|P_nv\|_V\le\|v\|_V$, et l'estimation sur $\|P_nu_0\|_H\le\|u_0\|_H$. — Contre-exemple : Pour un sous-espace non spectral, $\|P_Wv\|_V$ peut dépasser $\|v\|_V$ : rapport $\frac54$ pour $W=\mathrm{Vect}(\varphi_1+\varphi_2)$ et $v=\varphi_1$ sur $]0,1[$.

Calculs fermés : [{"kind":"rational","prompt":"Pour $f=0$, $u_0=\\varphi_1$ : limite quand $T\\to+\\infty$ de $\\sup_t\\|u(t)\\|_H^2+\\int_0^T\\|u\\|_V^2$","expected":"3/2"}]

Solution :
**Identité.** Le test $v=u_n(t)$ donne $\frac12\frac{d}{dt}\|u_n\|_H^2+\|u_n\|_V^2=\langle f,u_n\rangle\le\frac12\|f\|_{V'}^2+\frac12\|u_n\|_V^2$.

**Estimation, forme correcte.** Après absorption et intégration, pour tout $t\in[0,T]$ :
$$\|u_n(t)\|_H^2+\int_0^t\|u_n\|_V^2\le\|u_0\|_H^2+\int_0^t\|f\|_{V'}^2,$$
car $\|P_nu_0\|_H\le\|u_0\|_H$. Chacun des deux termes $\sup_t\|u_n(t)\|_H^2$ et $\int_0^T\|u_n\|_V^2$ est majoré par le second membre en $t=T$ ; d'où $\sup_t\|u_n\|_H^2+\int_0^T\|u_n\|_V^2\le 2(\|u_0\|_H^2+\|f\|^2_{L^2(V')})$. **Le facteur 2 est nécessaire** : l'inégalité sans facteur, écrite au polycopié, est fausse ($f=0$, $u_0=\varphi_1$ donne $1+\frac{1-e^{-2\lambda_1T}}2>1$).

**Dérivée.** Pour $v\in V$, $\langle u_n',v\rangle=\langle f,P_nv\rangle-\int\nabla u_n\cdot\nabla P_nv$, et $\|P_nv\|_V\le\|v\|_V$ : $\|u_n'(t)\|_{V'}\le\|f(t)\|_{V'}+\|u_n(t)\|_V$, donc $(u_n')$ est bornée dans $L^2(0,T;V')$.

**Extraction.** Par réflexivité, $u_n\rightharpoonup u$ dans $L^2(0,T;V)$ et $u_n'\rightharpoonup g$ dans $L^2(0,T;V')$ ; l'intégration par parties contre $\eta(t)v$ passe à la limite et donne $g=u'$. Ces convergences sont faibles ; aucune convergence forte n'est affirmée.

Indices :
1. Par quoi tester l'équation pour faire apparaître $\frac{d}{dt}\|u_n\|_H^2$ ?
2. Intègre de $0$ à $t$ et garde le $t$ : l'inégalité vaut pour chaque $t$. Le $\sup$ en $t$ et l'intégrale jusqu'à $T$ sont-ils atteints au même instant ?
3. Pour $u_n'$ : $\langle u_n',v\rangle=(u_n',P_nv)_H$ et l'équation testée par $P_nv\in V_n$.

Erreurs fréquentes :
- Additionner le sup en temps et l’intégrale sur [0,T] sans facteur 2.
- Utiliser $\|P_nv\|_V\le\|v\|_V$ pour une base quelconque.
- Affirmer une convergence forte à partir des seules bornes.

Variante : Même question pour $\partial_tu-\Delta u+u=f$.

Solution de la variante : Le test par $u_n$ donne $\frac12\frac{d}{dt}\|u_n\|_H^2+\|u_n\|_V^2+\|u_n\|_H^2=\langle f,u_n\rangle\le\frac12\|f\|_{V'}^2+\frac12\|u_n\|_V^2$, d'où, pour tout $t$, $\|u_n(t)\|_H^2+\int_0^t\big(\|u_n\|_V^2+2\|u_n\|_H^2\big)\le\|u_0\|_H^2+\int_0^t\|f\|_{V'}^2$, et le même facteur $2$ dans l'estimation globale. La borne de $u_n'$ gagne le terme $\|u_n\|_H\le C\|u_n\|_V$.

Vérification : {"origin":"polycopie-corrige","review":"machine","notes":"Estimation a priori corrigée : celle des p. PDF 31 et 32 est fausse telle quelle (f = 0, u0 = φ1) ; le facteur 2 est rétabli."}

## Exercice difficile `galerkin.difficile` : Passage à la limite dans $\partial_tu-\Delta u+g(u)=f$

Énoncé : Soit $g:\mathbb R\to\mathbb R$ $L$-lipschitzienne, croissante, avec $g(0)=0$. Dans le cadre du problème parabolique de Dirichlet ($\Omega$ borné lipschitzien, $u_0\in H$, $f\in L^2(0,T;V')$), construire par Galerkin spectral une solution faible de $\partial_tu-\Delta u+g(u)=f$, $u=0$ au bord, $u(0)=u_0$ : estimations, extraction, convergence forte, passage à la limite dans $g(u_n)$, condition initiale, unicité.
Source : {"doc":"polycopie","pdfPage":44,"label":"Exercice 34, difficile (p. PDF 44) ; section 8.7 (p. PDF 33)"} — prérequis : —

But : `fin` — usage : demonstration

Nœuds :
- `h-g` (hypothese) : $g$ est $L$-lipschitzienne, croissante, et $g(0)=0$.
- `h-data` (hypothese) : $V=H^1_0(\Omega)\hookrightarrow H=L^2(\Omega)$ compacte (Rellich), $u_0\in H$, $f\in L^2(0,T;V')$, base spectrale $(\varphi_k)$ avec $\|P_nv\|_V\le\|v\|_V$.
- `gal` (application-theoreme) : Le système de Galerkin avec le terme $(g(u_n),v)_H$ admet une unique solution $u_n$ sur $[0,T]$.
- `sign` (inegalite) : $(g(u_n),u_n)_H\ge 0$.
- `est` (inegalite) : Pour tout $t$ : $\|u_n(t)\|_H^2+\int_0^t\|u_n\|_V^2\le\|u_0\|_H^2+\int_0^t\|f\|_{V'}^2$.
- `der` (consequence) : $\|g(u_n)\|_H\le L\|u_n\|_H$, et $(u_n')$ est bornée dans $L^2(0,T;V')$.
- `ext` (application-theoreme) : Après extraction : $u_n\rightharpoonup u$ dans $L^2(0,T;V)$ et $u_n'\rightharpoonup u'$ dans $L^2(0,T;V')$.
- `fort` (application-theoreme) : Quitte à extraire encore : $u_n\to u$ fortement dans $L^2(0,T;H)$.
- `lip` (inegalite) : $\|g(u_n)-g(u)\|_{L^2(0,T;H)}\le L\|u_n-u\|_{L^2(0,T;H)}\to 0$.
- `lim` (consequence) : $\langle u',v\rangle+\int\nabla u\cdot\nabla v+(g(u),v)_H=\langle f,v\rangle$ pour tout $v\in V$ et presque tout $t$.
- `init` (egalite) : $u\in C([0,T];H)$ et $u(0)=u_0$.
- `uniq` (consequence) : La solution est unique.
- `fin` (conclusion) : Il existe une unique solution faible $u\in L^2(0,T;V)\cap C([0,T];H)$, $u'\in L^2(0,T;V')$, avec $u(0)=u_0$.
- `x-faible-g` (consequence, DISTRACTEUR) : $u_n\rightharpoonup u$ dans $L^2(0,T;V)$ suffit à obtenir $g(u_n)\rightharpoonup g(u)$.
- `x-grad` (consequence, DISTRACTEUR) : Le même argument (Aubin–Lions puis Lipschitz) passe à la limite dans un terme $G(\nabla u)$ avec $G$ lipschitzienne.

Règles :
- `h-g` + `h-data` ⟹ `gal` par « Champ des coefficients mesurable en temps, intégrable en temps à $c$ fixé, lipschitzien en $c$ uniformément en $t$ : $|(g(u)-g(w),\varphi_j)_H|\le L\|u-w\|_H$ ; existence et unicité globales. [theoreme-cauchy-lipschitz] »
- `h-g` + `gal` ⟹ `sign` par « $g$ croissante et $g(0)=0$ donnent $g(r)r\ge 0$ pour tout $r$, puis intégration. »
- `gal` + `sign` + `h-data` ⟹ `est` par « Test par $u_n$, Young, terme $(g(u_n),u_n)_H\ge 0$ abandonné, intégration de $0$ à $t$. »
- `est` + `h-g` + `h-data` ⟹ `der` par « $|g(r)|\le L|r|$, puis dualité avec $P_nv$, comme dans le cas linéaire, et $\|P_nv\|_H\le C\|v\|_V$. »
- `est` + `der` ⟹ `ext` par « Extraction faible dans des espaces réflexifs, puis identification de la dérivée. [extraction-reflexive] »
- `est` + `der` + `h-data` ⟹ `fort` par « Aubin–Lions : borne dans $L^2(0,T;V)$, borne de la dérivée dans $L^2(0,T;V')$, injection $V\hookrightarrow H$ compacte. [aubin-lions] »
- `fort` + `h-g` ⟹ `lip` par « $|g(a)-g(b)|\le L|a-b|$ ponctuellement, puis intégration en espace et en temps. »
- `ext` + `lip` + `h-data` ⟹ `lim` par « Équation testée par $\varphi_k\eta$, $n\ge k$ : convergences faibles pour les termes linéaires, convergence forte pour $g(u_n)$ ; puis densité des $\varphi_k$ dans $V$. »
- `lim` + `ext` + `h-data` ⟹ `init` par « Lions–Magenes donne $u\in C([0,T];H)$ ; test par $\eta\in C^1([0,T])$, $\eta(T)=0$, et $(P_nu_0,\varphi_k)_H=(u_0,\varphi_k)_H$ pour $n\ge k$. [lions-magenes] »
- `lim` + `init` + `h-g` ⟹ `uniq` par « Pour $w=u-v$ : $\frac12\|w(t)\|_H^2+\int_0^t\|w\|_V^2+\int_0^t(g(u)-g(v),w)_H=0$, le dernier terme étant positif par croissance de $g$. [lions-magenes] » (chemin monotonie)
- `lim` + `init` + `h-g` ⟹ `uniq` par « $\frac12\frac{d}{dt}\|w\|_H^2\le L\|w\|_H^2$ et $w(0)=0$ : Grönwall donne $w=0$. [gronwall] » (chemin gronwall)
- `lim` + `init` + `uniq` ⟹ `fin` par « Réunion de l’existence, de la condition initiale et de l’unicité. »

Justifications sans règle (séduisantes ou fausses) : « La convergence faible de $u_n$ dans $L^2(0,T;V)$ suffit, $g$ étant lipschitzienne. » ; « Estimation du polycopié : $\sup_t\|u_n\|_H^2+\int_0^T\|u_n\|_V^2\le\|u_0\|_H^2+\|f\|_{L^2(V')}^2$. »

Pièges :
- `x-faible-g` → incorrect [nonlinearite-limite-faible] : Une non-linéarité, même lipschitzienne et croissante, ne passe pas à la limite faible : ici, c'est la convergence forte d'Aubin–Lions qui permet de conclure. — Contre-exemple : Sur $\Omega=]0,1[$, $\varphi_1=\sqrt2\sin\pi x>0$, $g(r)=\max(r,0)$ et $w_n(t,x)=\sin(2\pi nt/T)\,\varphi_1(x)$ : $w_n\rightharpoonup 0$ dans $L^2(0,T;V)$, mais $g(w_n)=\max(\sin(2\pi nt/T),0)\,\varphi_1\rightharpoonup\frac1\pi\varphi_1\neq g(0)$ dans $L^2(0,T;H)$.
- `lip` par « La convergence faible de $u_n$ dans $L^2(0,T;V)$ suffit, $g$ étant lipschitzienne. » → incorrect [nonlinearite-limite-faible] : L’inégalité de Lipschitz transporte une convergence forte, jamais une convergence faible. — Contre-exemple : Sur $]0,1[$, avec $\varphi_1=\sqrt2\sin\pi x>0$ : $w_n(t,x)=\sin(2\pi nt/T)\,\varphi_1(x)\rightharpoonup 0$ dans $L^2(0,T;V)$, et $\max(w_n,0)\rightharpoonup\frac1\pi\varphi_1\neq 0$ dans $L^2(0,T;H)$.
- `x-grad` → incorrect [faible-fort] : Aubin–Lions donne la convergence forte de $u_n$ dans $L^2(0,T;H)$, pas celle des gradients : une non-linéarité en gradient demande un autre argument, par exemple celui de Minty pour un opérateur monotone, avec l'hypothèse du $\limsup$ démontrée d'abord. — Contre-exemple : $u_n=\frac{\sin(2\pi nx)}{2\pi n}\to 0$ dans $L^2(]0,1[)$, et pour $G(r)=\max(r,0)$ : $G(u_n')=\max(\cos(2\pi nx),0)\rightharpoonup\frac1\pi\neq G(0)$.
- `est` par « Estimation du polycopié : $\sup_t\|u_n\|_H^2+\int_0^T\|u_n\|_V^2\le\|u_0\|_H^2+\|f\|_{L^2(V')}^2$. » → incorrect [galerkin-estimation] : Cette estimation est fausse telle quelle (facteur $2$ manquant), et elle ne donne pas la borne à $t$ fixé dont on a besoin. — Contre-exemple : $g=0$, $f=0$, $u_0=\varphi_1$ : le membre de gauche vaut $1+\frac{1-e^{-2\lambda_1T}}2>1$.

Retraits :
- `fort` (nécessaire) : Sans convergence forte, la seule convergence faible ne permet plus de passer à la limite dans $g(u_n)$ par cet argument. — Contre-exemple : $g(r)=\max(r,0)$ et, sur $]0,1[$ avec $\varphi_1=\sqrt2\sin\pi x>0$, $w_n(t,x)=\sin(2\pi nt/T)\,\varphi_1(x)\rightharpoonup 0$ dans $L^2(0,T;V)$ : $g(w_n)\rightharpoonup\frac1\pi\varphi_1\neq g(0)$ dans $L^2(0,T;H)$.
- `sign` (nécessaire) : Sans ce signe, l'estimation sous cette forme peut tomber ; seule une estimation avec facteur exponentiel subsiste, par Grönwall. — Contre-exemple : Sur $]0,2\pi[$, $\lambda_1=\frac14$ ; pour $g(r)=-r$, $f=0$, $u_0=\varphi_1$ : $u(t)=e^{3t/4}\varphi_1$ et $\|u(t)\|_H^2=e^{3t/2}>\|u_0\|_H^2$.

Solution :
**Galerkin.** Le champ des coefficients est mesurable en temps et lipschitzien en $c$, car $|(g(u)-g(w),\varphi_j)_H|\le L\|u-w\|_H$ : le système admet une unique solution $u_n$.

**Estimations.** $g$ croissante et $g(0)=0$ donnent $g(r)r\ge 0$, donc $(g(u_n),u_n)_H\ge 0$ : le test par $u_n$ fournit la même estimation que dans le cas linéaire, sous sa forme correcte, pour tout $t$ : $\|u_n(t)\|_H^2+\int_0^t\|u_n\|_V^2\le\|u_0\|_H^2+\int_0^t\|f\|_{V'}^2$. Comme $\|g(u_n)\|_H\le L\|u_n\|_H$, la borne de $u_n'$ dans $L^2(0,T;V')$ persiste.

**Convergences.** Extraction faible dans $L^2(0,T;V)$ et $L^2(0,T;V')$, puis Aubin–Lions (avec Rellich) : $u_n\to u$ fortement dans $L^2(0,T;H)$. Par Lipschitz, $g(u_n)\to g(u)$ dans $L^2(0,T;H)$. C'est la convergence forte qui permet ici ce passage à la limite : une non-linéarité ne passe pas, en général, à la limite faible.

**Équation limite et condition initiale.** On teste par $\varphi_k\eta$, on passe à la limite terme à terme, puis on conclut par densité. Lions–Magenes donne $u\in C([0,T];H)$, et le test par $\eta\in C^1([0,T])$, $\eta(T)=0$, identifie $u(0)=u_0$.

**Unicité.** Pour deux solutions, $w=u-v$ vérifie $\frac12\|w(t)\|_H^2+\int_0^t\|w\|_V^2+\int_0^t(g(u)-g(v),w)_H=0$, et le dernier terme est positif : $w=0$. (Variante : Lipschitz et Grönwall.)

**Vigilance.** Pour une non-linéarité en gradient, Aubin–Lions ne suffit pas : il faut d'autres arguments, notamment celui de Minty pour un opérateur monotone.

Indices :
1. Quelles estimations du cas linéaire survivent au terme $g(u_n)$, et grâce à quel signe ?
2. La convergence faible ne suffit pas pour $g(u_n)$ : quel résultat de compacité espace-temps est disponible avec les deux bornes obtenues ?
3. Aubin–Lions donne $u_n\to u$ dans $L^2(0,T;H)$ ; Lipschitz transporte cette convergence à $g(u_n)$. Pour l'unicité, teste par la différence de deux solutions.

Erreurs fréquentes :
- Passer à la limite dans $g(u_n)$ avec la seule convergence faible.
- Traiter une non-linéarité en gradient par Aubin–Lions et Lipschitz.
- Reprendre l’estimation a priori du polycopié sans le facteur 2.

Variante : Reprendre la construction avec $g$ seulement $L$-lipschitzienne et $g(0)=0$, sans croissance.

Solution de la variante : On a $(g(u_n),u_n)_H\ge -L\|u_n\|_H^2$, d'où $\frac{d}{dt}\|u_n\|_H^2+\|u_n\|_V^2\le\|f\|_{V'}^2+2L\|u_n\|_H^2$. Grönwall donne $\|u_n(t)\|_H^2+\int_0^t\|u_n\|_V^2\le e^{2Lt}\big(\|u_0\|_H^2+\int_0^t\|f\|_{V'}^2\big)$ : les bornes restent uniformes en $n$. Extraction, Aubin–Lions et Lipschitz s'appliquent sans changement. L'unicité s'obtient par Grönwall : $\frac12\frac{d}{dt}\|w\|_H^2\le L\|w\|_H^2$ avec $w(0)=0$.

Vérification : {"origin":"polycopie-corrige","review":"machine","notes":"Estimation a priori corrigée : celle des p. PDF 31 et 32 est fausse telle quelle (f = 0, u0 = φ1) ; le facteur 2 est rétabli."}