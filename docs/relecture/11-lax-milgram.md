# 11. Lax–Milgram (`lax-milgram`) — polycopié p. PDF 13, section 3.4

## Fiche

Espaces : $V$ : espace de Hilbert réel, de produit scalaire $\langle\cdot,\cdot\rangle_V$ et de norme $\|\cdot\|_V$. | $V'$ : dual topologique de $V$, muni de $\|f\|_{V'}=\sup_{\|v\|_V\le 1}|\langle f,v\rangle|$. | $a:V\times V\to\mathbb R$ : forme bilinéaire ; elle n'est pas supposée symétrique.

Hypothèses :
- $V$ est un espace de Hilbert réel. — Sans elle : Sur l'espace des polynômes sur $[0,1]$, muni du produit scalaire de $L^2(0,1)$, avec $a=\langle\cdot,\cdot\rangle$ et $f(v)=\int_0^1e^xv\,dx$, une solution polynomiale $u$ serait égale à $e^x$ par densité des polynômes dans $L^2(0,1)$ : impossible.
- $a$ est bilinéaire.
- Continuité : $|a(u,v)|\le M\|u\|_V\|v\|_V$ pour tous $u,v\in V$. — Sans elle : Si $\varphi$ est une forme linéaire non continue sur $V$ de dimension infinie, $a(u,v)=\langle u,v\rangle_V+\varphi(u)\varphi(v)$ est coercive et l'équation $a(u,v)=\langle g,v\rangle_V$ pour tout $v$ n'a pas de solution dès que $\varphi(g)\neq 0$.
- Coercivité : $a(u,u)\ge\alpha\|u\|_V^2$ pour tout $u\in V$, avec $\alpha>0$. — Sans elle : Sur $V=\ell^2$, $a(u,v)=\sum_{n\ge 1}u_nv_n/n$ est continue, symétrique et $a(u,u)>0$ pour $u\ne 0$, mais $a(e_n,e_n)=1/n\to 0$ : pour $g=(1/n)_n$, l'équation impose $u_n=1$ pour tout $n$, et n'a pas de solution dans $\ell^2$.
- $f\in V'$.

Énoncé : Pour tout $f\in V'$, il existe un unique $u\in V$ tel que
$$a(u,v)=\langle f,v\rangle\quad\forall v\in V,\qquad\|u\|_V\le\alpha^{-1}\|f\|_{V'}.$$
La forme $a$ n'a pas besoin d'être symétrique.

Bilan : {"existence":"$B$ est surjectif : pour tout $g\\in V$, il existe $u\\in V$ tel que $Bu=g$.","unicite":"La minoration $\\|Bu\\|_V\\ge\\alpha\\|u\\|_V$ donne $\\ker B=\\{0\\}$.","stabilite":"$\\|u\\|_V\\le\\alpha^{-1}\\|f\\|_{V'}$."}

Preuve dans le polycopié : complete

Plan :
1. Par Riesz, associer à $a$ un opérateur $B\in\mathcal L(V)$ et à $f$ un vecteur $g\in V$ : il suffit de résoudre $Bu=g$.
2. Injectivité et estimation : la coercivité et Cauchy–Schwarz donnent $\|Bu\|_V\ge\alpha\|u\|_V$.
3. Image fermée : la minoration rend $(u_n)$ de Cauchy dès que $(Bu_n)$ converge.
4. Image dense : si $v\perp\operatorname{Im}B$, alors $\alpha\|v\|_V^2\le\langle Bv,v\rangle_V=0$.
5. Surjectivité : une image fermée et dense est $V$ tout entier.
6. Estimation : $\alpha\|u\|_V^2\le a(u,u)=\langle f,u\rangle\le\|f\|_{V'}\|u\|_V$.

Vigilance :
- « Image dense » et « image égale à $V$ » sont deux étapes séparées de la démonstration.
- $a(u,u)>0$ pour $u\neq 0$ n'est pas la coercivité : il faut une constante $\alpha>0$ uniforme.
- La continuité de $a$ est indispensable avant d'appliquer Riesz à $a(u,\cdot)$.
- La forme n’a pas à être symétrique : lorsqu’elle l’est, Riesz suffit, mais c’est un cas particulier.

Vérification : {"origin":"polycopie","review":"machine"}

Définition « Forme bilinéaire continue » : Une forme bilinéaire $a$ sur un espace de Hilbert $V$ est continue s'il existe $M>0$ tel que $|a(u,v)|\le M\|u\|_V\|v\|_V$ pour tous $u,v\in V$.

Définition « Forme bilinéaire coercive » : Une forme bilinéaire $a$ sur un espace de Hilbert $V$ est coercive s'il existe $\alpha>0$ tel que $a(u,u)\ge\alpha\|u\|_V^2$ pour tout $u\in V$. Aucune symétrie n'est requise.

## Contre-exemple `ce-lax-milgram-coercivite` : Positivité stricte sans coercivité
Assertion : Si $a$ est bilinéaire continue, symétrique, et $a(u,u)>0$ pour tout $u\neq 0$, alors pour tout $f\in V'$ le problème $a(u,v)=\langle f,v\rangle$ admet une solution.
Tâche : Sur $V=\ell^2$, soit $a(u,v)=\sum_{n\ge 1}u_nv_n/n$. Détermine $\inf_{\|u\|=1}a(u,u)$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\inf_{\\|u\\|=1}a(u,u)$","expected":"0"}
Explication : Comme $a(e_n,e_n)=1/n\to 0$ et $a\ge 0$, l'infimum est nul : aucune constante $\alpha>0$ ne convient. Pour $g=(1/n)_n\in\ell^2$, l'équation $a(u,v)=\langle g,v\rangle$ impose $u_n=1$ pour tout $n$ : aucune solution dans $\ell^2$.

## Contre-exemple `ce-lax-milgram-image-dense` : Image dense sans surjectivité
Assertion : Un opérateur borné injectif dont l’image est dense est surjectif.
Tâche : Sur $\ell^2$, soit $T(u)=(u_n/n)_{n\ge 1}$. Détermine $\inf_{\|u\|=1}\|Tu\|_{\ell^2}$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\inf_{\\|u\\|=1}\\|Tu\\|_{\\ell^2}$","expected":"0"}
Explication : $\|Te_n\|=1/n\to 0$ : aucune minoration n'a lieu, ce qui explique que l'image de $T$ ne soit pas fermée. $T$ est injectif, d'image dense (elle contient les suites à support fini), mais $(1/n)_n$ n'a pas d'antécédent, car il faudrait $u_n=1$ pour tout $n$.

## Contre-exemple `ce-lax-milgram-symetrie` : Coercivité sans symétrie
Assertion : Le théorème de Lax–Milgram exige la symétrie de $a$ : une forme non symétrique n'est jamais coercive.
Tâche : Donne une matrice $A\in\mathcal M_2(\mathbb R)$ non symétrique telle que la forme $a(x,y)=x^{\mathsf T}Ay$ soit coercive sur $\mathbb R^2$.
Vérification : {"kind":"matrix-spd","prompt":"Une matrice $2\\times 2$ non symétrique et coercive","size":2,"property":"coercive-nonsymmetric"}
Explication : $x^{\mathsf T}Ax=x^{\mathsf T}\tfrac{A+A^{\mathsf T}}2x$ : la coercivité équivaut à la définie-positivité de la partie symétrique. Par exemple, $A=\begin{pmatrix}1&1\\-1&1\end{pmatrix}$ donne $a(x,x)=\|x\|^2$.

## Exercice facile `lax-milgram.facile` : Continuité et coercivité de $a(u,v)=\int_\Omega(\nabla u\cdot\nabla v+uv)$

Énoncé : Soit $\Omega\subset\mathbb R^d$ un ouvert non vide et $V=H^1(\Omega)$, muni de la norme $\|u\|_V^2=\|u\|_{L^2}^2+\|\nabla u\|_{L^2}^2$. Pour $u,v\in V$, on pose $a(u,v)=\int_\Omega(\nabla u\cdot\nabla v+uv)$. Montrer que $a$ est bilinéaire, continue et coercive sur $V$, et déterminer les meilleures constantes $M$ et $\alpha$.
Source : {"doc":"polycopie","pdfPage":40,"label":"Exercice 11, facile"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-V` (hypothese) : $\Omega\subset\mathbb R^d$ est un ouvert non vide et $V=H^1(\Omega)$, muni de $\|u\|_V^2=\|u\|_{L^2}^2+\|\nabla u\|_{L^2}^2$.
- `d-a` (definition) : Pour $u,v\in V$ : $a(u,v)=\int_\Omega(\nabla u\cdot\nabla v+uv)$.
- `d-ps` (definition) : Le produit scalaire de $V$ est $\langle u,v\rangle_V=\int_\Omega\nabla u\cdot\nabla v+\int_\Omega uv$.
- `int` (consequence) : Pour $u,v\in V$ : $\nabla u\cdot\nabla v\in L^1(\Omega)$ et $uv\in L^1(\Omega)$ ; $a(u,v)$ est bien définie.
- `bilin` (consequence) : $a$ est bilinéaire sur $V\times V$.
- `ps` (egalite) : Pour $u,v\in V$ : $a(u,v)=\langle u,v\rangle_V$.
- `cs-somme` (inegalite) : Pour $u,v\in V$ : $|a(u,v)|\le\|\nabla u\|_{L^2}\|\nabla v\|_{L^2}+\|u\|_{L^2}\|v\|_{L^2}$.
- `continue` (inegalite) : Pour tous $u,v\in V$ : $|a(u,v)|\le\|u\|_V\|v\|_V$ ; $a$ est continue.
- `coer-eq` (egalite) : Pour tout $u\in V$ : $a(u,u)=\|u\|_V^2$.
- `coer` (consequence) : $a$ est coercive : $a(u,u)\ge\alpha\|u\|_V^2$ pour tout $u\in V$, avec $\alpha>0$.
- `constantes` (egalite, calcul rational-vector) : Les meilleures constantes sont $M=1$ et $\alpha=1$.
  - valeur attendue : ["1","1"]
- `fin` (conclusion) : $a$ est bilinéaire, continue et coercive sur $V$, de meilleures constantes $M=\alpha=1$.
- `x-poinc` (inegalite, DISTRACTEUR) : Il existe $C>0$ tel que $\|u\|_{L^2(\Omega)}\le C\|\nabla u\|_{L^2(\Omega)}$ pour tout $u\in H^1(\Omega)$.
- `x-pos` (consequence, DISTRACTEUR) : Il suffit de vérifier $a(u,u)\ge 0$ pour tout $u\in V$ pour obtenir la coercivité.

Règles :
- `h-V` + `d-a` ⟹ `int` par « Cauchy–Schwarz dans $L^2(\Omega)$ : les facteurs sont dans $L^2$. [cauchy-schwarz] »
- `int` + `d-a` ⟹ `bilin` par « Linéarité de l’intégrale, de la dérivation faible et du produit scalaire euclidien. »
- `d-a` + `d-ps` ⟹ `ps` par « Comparaison terme à terme de $a$ et du produit scalaire défini sur $V$. » (chemin ps)
- `ps` ⟹ `continue` par « Cauchy–Schwarz dans l'espace de Hilbert $V$. [cauchy-schwarz] » (chemin ps)
- `int` + `d-a` ⟹ `cs-somme` par « Cauchy–Schwarz dans $L^2(\Omega)$ : les facteurs sont dans $L^2$. [cauchy-schwarz] » (chemin termes)
- `cs-somme` ⟹ `continue` par « Cauchy–Schwarz dans $\mathbb R^2$ pour les couples $(\|\nabla u\|_{L^2},\|u\|_{L^2})$ et $(\|\nabla v\|_{L^2},\|v\|_{L^2})$. [cauchy-schwarz] » (chemin termes)
- `d-a` + `h-V` ⟹ `coer-eq` par « On prend $v=u$ et on reconnaît le carré de la norme de $V$. »
- `coer-eq` ⟹ `coer` par « Définition de la coercivité. »
- `continue` + `coer-eq` ⟹ `constantes` par « L'égalité $a(u,u)=\|u\|_V^2$ pour $u\ne 0$ interdit $M<1$ et $\alpha>1$ ; $V\ne\{0\}$ car $\Omega\neq\emptyset$. »
- `bilin` + `continue` + `coer` + `constantes` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « C’est évident. » ; « Une forme symétrique est coercive. » ; « L'inégalité de Poincaré sur $H^1(\Omega)$ donne la coercivité. »

Pièges :
- `continue` par « C’est évident. » → a-justifier [justification-absente] : La continuité se démontre : quelle inégalité contrôle $|a(u,v)|$ par le produit des normes ?
- `coer` par « Une forme symétrique est coercive. » → incorrect [lax-milgram-coercivite-positivite] : La symétrie ne donne aucune minoration de $a(u,u)$. La coercivité se vérifie sur $a(u,u)$ lui-même. — Contre-exemple : $b=-\langle\cdot,\cdot\rangle_V$ est symétrique, mais $b(u,u)=-\|u\|_V^2<0$ pour $u\ne 0$.
- `coer` par « L'inégalité de Poincaré sur $H^1(\Omega)$ donne la coercivité. » → incorrect [hypotheses-theoreme] : Poincaré est démontré sur $H^1_0$, pour $\Omega$ borné : il n'est ni vrai sur $H^1(\Omega)$, ni utile ici, car $a(u,u)$ contient déjà $\|u\|_{L^2}^2$. — Contre-exemple : $\Omega=]0,1[$, $u=1$ : $\|u\|_{L^2}=1$, $\|\nabla u\|_{L^2}=0$.
- `x-poinc` → incorrect [hypotheses-theoreme] : Cette inégalité est fausse sur $H^1(\Omega)$ : les constantes la mettent en défaut lorsque $\Omega$ est borné. Elle n'a d'ailleurs aucune utilité ici. — Contre-exemple : $\Omega=]0,1[$, $u=1$ : $\|u\|_{L^2}=1$, $\|\nabla u\|_{L^2}=0$.
- `x-pos` → incorrect [lax-milgram-coercivite-positivite] : La coercivité exige une constante $\alpha>0$ uniforme : $a(u,u)\ge\alpha\|u\|_V^2$. La seule positivité ne la fournit pas. — Contre-exemple : Sur $V=H^1(]0,1[)$, $b(u,v)=\int_0^1u'v'$ vérifie $b(u,u)\ge 0$, mais $b(1,1)=0$ alors que $\|1\|_V=1$.

Retraits :
- `coer-eq` (nécessaire) : Sans le terme $uv$, la quantité $a_0(u,u)=\|\nabla u\|_{L^2}^2$ ne contrôle plus $\|u\|_V^2$ : la coercivité est perdue sur $H^1(\Omega)$. — Contre-exemple : Sur $\Omega=]0,1[$, avec $a_0(u,v)=\int_0^1u'v'$ et $u=1$ : $a_0(1,1)=0$, alors que $\|1\|_V^2=1$.

Calculs fermés : [{"kind":"rational","prompt":"Pour $\\Omega=]0,1[$, $u(x)=x$ et $v(x)=x^2$ : valeur de $a(u,v)$","expected":"5/4"}]

Solution :
**Forme bien définie.** Pour $u,v\in V$, Cauchy–Schwarz dans $L^2$ assure que $\nabla u\cdot\nabla v$ et $uv$ sont intégrables. Par linéarité de l'intégrale et de la dérivation faible, $a$ est bilinéaire.

**Continuité.** Le plus direct est de reconnaître le produit scalaire de $V$ : $a(u,v)=\langle u,v\rangle_V$, puis Cauchy–Schwarz dans $V$ donne $|a(u,v)|\le\|u\|_V\|v\|_V$. Alternativement, Cauchy–Schwarz dans $L^2$ donne $|a(u,v)|\le\|\nabla u\|_{L^2}\|\nabla v\|_{L^2}+\|u\|_{L^2}\|v\|_{L^2}$, puis Cauchy–Schwarz dans $\mathbb R^2$ majore cette somme par $\|u\|_V\|v\|_V$.

**Coercivité.** Pour tout $u\in V$ : $a(u,u)=\|\nabla u\|_{L^2}^2+\|u\|_{L^2}^2=\|u\|_V^2$. Aucune inégalité de Poincaré n'intervient, et elle serait d'ailleurs fausse sur $H^1(\Omega)$.

**Meilleures constantes.** Le cas $v=u\ne 0$ dans $|a(u,v)|\le M\|u\|_V\|v\|_V$ donne $M\ge 1$ ; l'égalité $a(u,u)=\|u\|_V^2$ interdit $\alpha>1$ et $M<1$. Donc $M=\alpha=1$.

Indices :
1. La forme $a$ ressemble à un objet que tu connais déjà sur $V=H^1(\Omega)$ : lequel ?
2. Pour la continuité, deux voies : identifier $a$ au produit scalaire de $V$, ou majorer chacune des deux intégrales par Cauchy–Schwarz, puis assembler. Pour la coercivité, calcule simplement $a(u,u)$.
3. $a(u,u)=\|\nabla u\|_{L^2}^2+\|u\|_{L^2}^2=\|u\|_V^2$ : la coercivité vaut avec $\alpha=1$, sans aucune inégalité de Poincaré.

Erreurs fréquentes :
- Invoquer l'inégalité de Poincaré sur $H^1(\Omega)$, où elle est fausse.
- Confondre $a(u,u)\ge 0$ et la coercivité, qui exige une constante $\alpha>0$.

Variante : Soit $\Omega\subset\mathbb R^d$ un ouvert non vide, $V=H^1(\Omega)$ et $a(u,v)=\int_\Omega(\nabla u\cdot\nabla v+2uv)$. Montrer que $a$ est continue de constante $M=2$ et coercive de constante $\alpha=1$.

Solution de la variante : Cauchy–Schwarz dans $L^2$ donne $|a(u,v)|\le\|\nabla u\|_{L^2}\|\nabla v\|_{L^2}+2\|u\|_{L^2}\|v\|_{L^2}\le 2\big(\|\nabla u\|_{L^2}\|\nabla v\|_{L^2}+\|u\|_{L^2}\|v\|_{L^2}\big)\le 2\|u\|_V\|v\|_V$, la dernière inégalité étant Cauchy–Schwarz dans $\mathbb R^2$. Par ailleurs $a(u,u)=\|\nabla u\|_{L^2}^2+2\|u\|_{L^2}^2\ge\|u\|_V^2$.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `lax-milgram.intermediaire` : Problème faible de Poisson et estimation en $H^1_0$

Énoncé : Soit $\Omega\subset\mathbb R^d$ un ouvert borné, $f\in L^2(\Omega)$ et $V=H^1_0(\Omega)$, muni de la norme $\|v\|_V=\|\nabla v\|_{L^2}$. Montrer que le problème $(P)$ : trouver $u\in V$ tel que $-\Delta u=f$ dans $\mathcal D'(\Omega)$, équivaut à la formulation faible $(FV)$ : trouver $u\in V$ tel que $\int_\Omega\nabla u\cdot\nabla v=\int_\Omega fv$ pour tout $v\in V$. Démontrer que $(FV)$ admet une unique solution, et établir $\|\nabla u\|_{L^2}\le C_P\|f\|_{L^2}$ ainsi que $\|u\|_{H^1}\le C_P\sqrt{1+C_P^2}\,\|f\|_{L^2}$, où $C_P$ est une constante de Poincaré de $\Omega$.
Source : {"doc":"polycopie","pdfPage":40,"label":"Exercice 11, intermédiaire ; problème de Poisson (section 3.4, p. PDF 14)"} — prérequis : poincare, distributions

But : `fin` — usage : application

Nœuds :
- `h-omega` (hypothese) : $\Omega\subset\mathbb R^d$ est un ouvert borné.
- `h-f` (hypothese) : $f\in L^2(\Omega)$.
- `d-V` (definition) : $V=H^1_0(\Omega)$, adhérence de $C^\infty_c(\Omega)$ dans $H^1(\Omega)$, muni de $\langle u,v\rangle_V=\int_\Omega\nabla u\cdot\nabla v$ et de $\|v\|_V=\|\nabla v\|_{L^2}$.
- `d-a` (definition) : Pour $u,v\in V$ : $a(u,v)=\int_\Omega\nabla u\cdot\nabla v$ et $\ell(v)=\int_\Omega fv$.
- `d-pb` (definition) : $(P)$ : trouver $u\in V$ tel que $-\Delta u=f$ dans $\mathcal D'(\Omega)$.
- `d-fv` (definition) : $(FV)$ : trouver $u\in V$ tel que $a(u,v)=\ell(v)$ pour tout $v\in V$.
- `poinc` (application-theoreme) : Il existe $C_P>0$ tel que $\|v\|_{L^2}\le C_P\|\nabla v\|_{L^2}$ pour tout $v\in V$.
- `V-hilb` (consequence) : $(V,\langle\cdot,\cdot\rangle_V)$ est un espace de Hilbert, de norme équivalente à la norme de $H^1$.
- `a-cont` (inegalite) : $|a(u,v)|\le\|u\|_V\|v\|_V$ pour tous $u,v\in V$.
- `a-coer` (egalite) : $a(u,u)=\|u\|_V^2$ pour tout $u\in V$.
- `ell-cont` (inegalite) : $|\ell(v)|\le C_P\|f\|_{L^2}\|v\|_V$ : donc $\ell\in V'$ et $\|\ell\|_{V'}\le C_P\|f\|_{L^2}$.
- `lm` (application-theoreme) : $(FV)$ admet une unique solution $u\in V$, et $\|u\|_V\le\|\ell\|_{V'}$.
- `dist` (egalite) : Pour $u\in V$ et $\varphi\in C^\infty_c(\Omega)$ : $\langle-\Delta u,\varphi\rangle=\int_\Omega\nabla u\cdot\nabla\varphi=a(u,\varphi)$.
- `eq1` (consequence) : Si $u$ résout $(P)$, alors $a(u,\varphi)=\ell(\varphi)$ pour tout $\varphi\in C^\infty_c(\Omega)$.
- `eq2` (consequence) : Si $u$ résout $(P)$, alors $a(u,v)=\ell(v)$ pour tout $v\in V$.
- `eq3` (consequence) : Si $u$ résout $(FV)$, alors $u$ résout $(P)$.
- `equiv` (consequence) : $(P)$ et $(FV)$ sont équivalents.
- `estim` (inegalite) : La solution vérifie $\|\nabla u\|_{L^2}\le C_P\|f\|_{L^2}$.
- `test-u` (inegalite) : En prenant $v=u$ dans $(FV)$ : $\|\nabla u\|_{L^2}^2=\int_\Omega fu\le C_P\|f\|_{L^2}\|\nabla u\|_{L^2}$.
- `estim-H1` (inegalite) : $\|u\|_{H^1}\le C_P\sqrt{1+C_P^2}\,\|f\|_{L^2}$.
- `fin` (conclusion) : $(P)$ admet une unique solution, caractérisée par $(FV)$, avec $\|\nabla u\|_{L^2}\le C_P\|f\|_{L^2}$ et $\|u\|_{H^1}\le C_P\sqrt{1+C_P^2}\,\|f\|_{L^2}$.
- `x-test-H1` (consequence, DISTRACTEUR) : Si $u$ résout $(P)$, alors $a(u,v)=\ell(v)$ pour tout $v\in H^1(\Omega)$.
- `x-coer-H1` (inegalite, DISTRACTEUR) : Il existe $\alpha>0$ tel que $a(u,u)\ge\alpha\|u\|_{H^1}^2$ pour tout $u\in H^1(\Omega)$.
- `x-cst1` (inegalite, DISTRACTEUR) : Pour tout ouvert borné $\Omega$ : $\|\nabla u\|_{L^2}\le\|f\|_{L^2}$.

Règles :
- `h-omega` + `d-V` ⟹ `poinc` par « Inégalité de Poincaré sur l'ouvert borné $\Omega$. [poincare] »
- `d-V` + `poinc` ⟹ `V-hilb` par « $H^1_0(\Omega)$ est fermé dans $H^1(\Omega)$, donc complet ; Poincaré rend $\|\nabla\cdot\|_{L^2}$ équivalente à la norme de $H^1$. »
- `d-a` + `d-V` ⟹ `a-cont` par « Cauchy–Schwarz dans $L^2(\Omega)^d$. [cauchy-schwarz] »
- `d-a` + `d-V` ⟹ `a-coer` par « Définition de $a$ et de la norme de $V$. »
- `h-f` + `d-a` + `poinc` ⟹ `ell-cont` par « Cauchy–Schwarz dans $L^2(\Omega)$, puis Poincaré. [cauchy-schwarz] »
- `V-hilb` + `a-cont` + `a-coer` + `ell-cont` + `d-fv` ⟹ `lm` par « Théorème de Lax–Milgram. [lax-milgram] » (chemin lm)
- `V-hilb` + `ell-cont` + `d-fv` + `d-a` ⟹ `lm` par « Riesz appliqué dans $(V,\langle\cdot,\cdot\rangle_V)$ à $\ell$ : ici $a$ est le produit scalaire de $V$. [riesz] » (chemin riesz)
- `d-V` + `d-a` ⟹ `dist` par « Définition de la dérivation distributionnelle : $\langle\partial_i\partial_iu,\varphi\rangle=-\langle\partial_iu,\partial_i\varphi\rangle$, et $\partial_iu\in L^2(\Omega)$. [distributions] »
- `d-pb` + `dist` ⟹ `eq1` par « Écriture de l'égalité dans $\mathcal D'(\Omega)$ contre les fonctions test. »
- `eq1` + `a-cont` + `ell-cont` + `d-V` ⟹ `eq2` par « Densité de $C^\infty_c(\Omega)$ dans $V$ (définition de $H^1_0$) et continuité de $a(u,\cdot)$ et de $\ell$ sur $V$. »
- `d-fv` + `dist` + `d-V` ⟹ `eq3` par « On restreint $(FV)$ aux $v=\varphi\in C^\infty_c(\Omega)\subset V$, puis on identifie les deux distributions. »
- `eq2` + `eq3` ⟹ `equiv` par « Réunion des deux implications. »
- `lm` + `ell-cont` ⟹ `estim` par « On compose $\|u\|_V\le\|\ell\|_{V'}$ et la majoration de $\|\ell\|_{V'}$. »
- `lm` + `poinc` + `h-f` + `d-a` ⟹ `test-u` par « Choix $v=u$, puis Cauchy–Schwarz et Poincaré. [cauchy-schwarz] » (chemin test)
- `test-u` ⟹ `estim` par « Division par $\|\nabla u\|_{L^2}$ lorsqu'il est non nul ; le cas nul est immédiat. » (chemin test)
- `estim` + `poinc` + `d-V` ⟹ `estim-H1` par « $\|u\|_{H^1}^2=\|u\|_{L^2}^2+\|\nabla u\|_{L^2}^2\le(1+C_P^2)\|\nabla u\|_{L^2}^2$, puis l'estimation sur le gradient. »
- `lm` + `equiv` + `estim` + `estim-H1` ⟹ `fin` par « Réunion de l’équivalence, de l’existence, de l’unicité et des estimations. »

Justifications sans règle (séduisantes ou fausses) : « Inégalité de Poincaré sur $H^1(\Omega)$ tout entier, sans condition au bord. » ; « $C^\infty_c(\Omega)$ et $V$ sont le même espace. » ; « C’est évident. »

Pièges :
- `poinc` par « Inégalité de Poincaré sur $H^1(\Omega)$ tout entier, sans condition au bord. » → incorrect [hypotheses-theoreme] : Poincaré est démontré sur $H^1_0(\Omega)$. Sur $H^1(\Omega)$, sans condition au bord, l'inégalité est fausse : les constantes la mettent en défaut. — Contre-exemple : Pour $\Omega$ borné non vide et $u=1$ : $\|u\|_{L^2}=|\Omega|^{1/2}>0$, alors que $\|\nabla u\|_{L^2}=0$.
- `eq2` par « $C^\infty_c(\Omega)$ et $V$ sont le même espace. » → incorrect [densite-fermeture] : $C^\infty_c(\Omega)$ est dense dans $V$, sans lui être égal. Il faut passer à la limite, en utilisant la continuité des deux membres pour la norme de $V$. — Contre-exemple : Sur $\Omega=]0,1[$, $v(x)=x(1-x)$ appartient à $H^1_0(]0,1[)$ et n'est pas à support compact dans $]0,1[$.
- `equiv` par « C’est évident. » → a-justifier [justification-absente] : L’équivalence se démontre dans les deux sens : du problème vers la formulation faible (densité), et réciproquement (restriction aux fonctions test).
- `x-test-H1` → incorrect [lax-milgram-espace-test] : Tester contre tout $H^1(\Omega)$ imposerait une condition supplémentaire au bord. La formulation de Dirichlet se teste contre $V=H^1_0(\Omega)$. — Contre-exemple : $\Omega=]0,1[$, $f=1$, $u(x)=x(1-x)/2$ et $v=1\in H^1(]0,1[)$ : $a(u,1)=0$ alors que $\ell(1)=1$.
- `x-coer-H1` → incorrect [hypotheses-theoreme] : La coercivité n'a lieu que sur $V=H^1_0(\Omega)$, par Poincaré. Sur $H^1(\Omega)$, les constantes l'empêchent. — Contre-exemple : Pour $u=1$ sur $\Omega$ borné non vide : $a(1,1)=0$ et $\|1\|_{H^1}^2=|\Omega|>0$.
- `x-cst1` → incorrect [quantificateurs] : La constante de Poincaré dépend de $\Omega$ : on ne peut pas la remplacer par $1$ en général. — Contre-exemple : $\Omega=]0,4[$, $f=1$ : $u(x)=x(4-x)/2$, $\|u'\|_{L^2}^2=16/3$ et $\|f\|_{L^2}^2=4$.

Retraits :
- `h-omega` (nécessaire) : Sans ouvert borné, Poincaré n'est plus disponible et le cadre hilbertien sur $H^1_0(\Omega)$ avec la norme du gradient s'écroule. — Contre-exemple : Sur $\Omega=\mathbb R$, pour $f\in C^\infty_c(\mathbb R)$, $f\ge 0$, $f\ne 0$, il n'existe aucune solution $u\in H^1(\mathbb R)$ de $-u''=f$ : $u'$ serait décroissante, de carré intégrable, donc de limites nulles en $\pm\infty$, alors que $u'(+\infty)-u'(-\infty)=-\int f<0$.
- `h-f` (nécessaire) : Lax–Milgram comme Riesz exigent $\ell\in V'$ : sans $f\in L^2(\Omega)$ (ou au moins $f\in H^{-1}(\Omega)$), le second membre n'a plus de sens continu sur $V$. — Contre-exemple : En dimension $2$, pour $0\in\Omega$, la distribution de Dirac $\delta_0$ n'est pas dans $H^{-1}(\Omega)$ : $\ell(v)=v(0)$ n'est pas continue sur $H^1_0(\Omega)$, car les fonctions $v_n=\min\big(1,\log(R/|x|)/\log n\big)^+$ (avec $B(0,R)\subset\Omega$) vérifient $v_n(0)=1$ et $\|\nabla v_n\|_{L^2}^2=2\pi/\log n\to 0$.

Calculs fermés : [{"kind":"rational","prompt":"Pour $\\Omega=]0,1[$, $f=1$ et $u(x)=x(1-x)/2$ : valeur de $\\|\\nabla u\\|_{L^2}^2$","expected":"1/12"}]

Solution :
**Cadre.** $H^1_0(\Omega)$ est fermé dans $H^1(\Omega)$, donc complet ; par Poincaré, $\|\nabla\cdot\|_{L^2}$ y est une norme équivalente à celle de $H^1$, et $V$ muni de $\langle u,v\rangle_V=\int_\Omega\nabla u\cdot\nabla v$ est un espace de Hilbert.

**Hypothèses de Lax–Milgram.** $|a(u,v)|\le\|u\|_V\|v\|_V$ par Cauchy–Schwarz, $a(u,u)=\|u\|_V^2$, et pour $v\in V$ : $|\ell(v)|\le\|f\|_{L^2}\|v\|_{L^2}\le C_P\|f\|_{L^2}\|v\|_V$, donc $\ell\in V'$ et $\|\ell\|_{V'}\le C_P\|f\|_{L^2}$.

**Existence, unicité.** Lax–Milgram (ou Riesz, puisque $a$ est ici le produit scalaire de $V$) fournit une unique solution $u\in V$ de $(FV)$, avec $\|u\|_V\le\|\ell\|_{V'}$.

**Équivalence avec $(P)$.** Pour $u\in V$ et $\varphi\in C^\infty_c(\Omega)$, la définition des dérivées au sens des distributions donne $\langle-\Delta u,\varphi\rangle=\int_\Omega\nabla u\cdot\nabla\varphi=a(u,\varphi)$. Si $u$ résout $(P)$, alors $a(u,\varphi)=\ell(\varphi)$ pour tout $\varphi\in C^\infty_c(\Omega)$ ; $C^\infty_c(\Omega)$ étant dense dans $V$ et $a(u,\cdot)$, $\ell$ continues sur $V$, l'égalité s'étend à tout $v\in V$. Réciproquement, si $u$ résout $(FV)$, sa restriction aux fonctions test montre que $-\Delta u=f$ dans $\mathcal D'(\Omega)$.

**Estimations.** $\|\nabla u\|_{L^2}=\|u\|_V\le\|\ell\|_{V'}\le C_P\|f\|_{L^2}$. Puis $\|u\|_{H^1}^2\le(1+C_P^2)\|\nabla u\|_{L^2}^2\le(1+C_P^2)C_P^2\|f\|_{L^2}^2$.

**Point de vigilance.** Les fonctions test vivent dans $H^1_0(\Omega)$, pas dans $H^1(\Omega)$ : c'est là que la condition de Dirichlet est codée. La constante $C_P$ dépend de $\Omega$.

Indices :
1. Avant d'appliquer Lax–Milgram, quels sont l'espace, la forme bilinéaire et la forme linéaire ? Où la condition au bord est-elle codée ?
2. Pour l'équivalence avec $(P)$, travaille d'abord contre $\varphi\in C^\infty_c(\Omega)$, puis passe à tout $V$ par densité. Pour l'estimation, compose Lax–Milgram avec la majoration de $\|\ell\|_{V'}$.
3. $|\ell(v)|\le\|f\|_{L^2}\|v\|_{L^2}\le C_P\|f\|_{L^2}\|\nabla v\|_{L^2}$. Ensuite, $\|u\|_{H^1}^2=\|u\|_{L^2}^2+\|\nabla u\|_{L^2}^2\le(1+C_P^2)\|\nabla u\|_{L^2}^2$.

Erreurs fréquentes :
- Tester la formulation faible contre tout $H^1(\Omega)$.
- Confondre « $C^\infty_c(\Omega)$ dense dans $V$ » et « $C^\infty_c(\Omega)=V$ ».
- Oublier la dépendance en $\Omega$ de la constante de Poincaré.

Variante : Soit $\Omega\subset\mathbb R^d$ un ouvert borné, $f\in L^2(\Omega)$, $b\in\mathbb R^d$ et $V=H^1_0(\Omega)$. Formuler faiblement le problème $-\Delta u+b\cdot\nabla u+u=f$ dans $\mathcal D'(\Omega)$, $u\in V$, puis montrer l'existence et l'unicité de la solution.

Solution de la variante : La forme $a(u,v)=\int_\Omega\big(\nabla u\cdot\nabla v+(b\cdot\nabla u)v+uv\big)$ n'est pas symétrique dès que $b\ne0$ : Riesz ne s'applique pas directement à $a$. Pour $\varphi\in C^\infty_c(\Omega)$, $\int_\Omega(b\cdot\nabla\varphi)\varphi=\tfrac12\int_\Omega b\cdot\nabla(\varphi^2)=0$, et par densité $\int_\Omega(b\cdot\nabla u)u=0$ pour tout $u\in V$. Donc $a(u,u)=\|\nabla u\|_{L^2}^2+\|u\|_{L^2}^2$ : $a$ est coercive pour la norme de $H^1$. Sa continuité découle de Cauchy–Schwarz, et $\ell(v)=\int_\Omega fv$ est continue. Lax–Milgram conclut, et l'équivalence avec le problème dans $\mathcal D'(\Omega)$ s'établit comme dans l'exercice.

Vérification : {"origin":"complement","review":"machine"}

## Exercice difficile `lax-milgram.difficile` : Surjectivité de $B$ : image fermée et image dense, sans symétrie

Énoncé : Soient $V$ un espace de Hilbert réel, $a:V\times V\to\mathbb R$ bilinéaire, continue (constante $M$) et coercive (constante $\alpha>0$), **non supposée symétrique**, et $f\in V'$. Par Riesz, on associe à $a$ un opérateur $B\in\mathcal L(V)$ et à $f$ un vecteur $g\in V$ tels que $a(u,v)=\langle Bu,v\rangle_V$ et $\langle f,v\rangle=\langle g,v\rangle_V$ pour tous $u,v\in V$. Reconstituer la preuve de la surjectivité de $B$ en séparant quatre étapes : (1) injectivité et estimation, (2) image fermée, (3) image dense, (4) surjectivité. En déduire le théorème de Lax–Milgram : existence, unicité, et $\|u\|_V\le\alpha^{-1}\|f\|_{V'}$.
Source : {"doc":"polycopie","pdfPage":13,"label":"Démonstration, section 3.4 ; exercice 11, difficile (p. PDF 40)"} — prérequis : riesz, stampacchia

But : `fin` — usage : demonstration

Nœuds :
- `h-V` (hypothese) : $V$ est un espace de Hilbert réel.
- `h-bilin` (hypothese) : $a:V\times V\to\mathbb R$ est bilinéaire (elle n'est pas supposée symétrique).
- `h-cont` (hypothese) : Continuité : il existe $M>0$ tel que $|a(u,v)|\le M\|u\|_V\|v\|_V$ pour tous $u,v\in V$.
- `h-coer` (hypothese) : Coercivité : il existe $\alpha>0$ tel que $a(u,u)\ge\alpha\|u\|_V^2$ pour tout $u\in V$.
- `h-f` (hypothese) : $f\in V'$.
- `forme-cont` (consequence) : Pour tout $u\in V$, la forme $v\mapsto a(u,v)$ appartient à $V'$.
- `riesz-B` (application-theoreme, calcul choice) : Pour tout $u\in V$, il existe un unique $Bu\in V$ tel que $a(u,v)=\langle Bu,v\rangle_V$ pour tout $v\in V$.
- `B-L` (consequence) : $B:V\to V$ est linéaire et $\|Bu\|_V\le M\|u\|_V$ : $B\in\mathcal L(V)$.
- `riesz-g` (application-theoreme) : Il existe un unique $g\in V$ tel que $\langle f,v\rangle=\langle g,v\rangle_V$ pour tout $v\in V$, et $\|g\|_V=\|f\|_{V'}$.
- `reduc` (consequence) : Pour $u\in V$ : $\big[a(u,v)=\langle f,v\rangle\ \ \forall v\in V\big]\iff Bu=g$.
- `minor` (inegalite) : Pour tout $u\in V$ : $\alpha\|u\|_V^2\le\langle Bu,u\rangle_V\le\|Bu\|_V\|u\|_V$.
- `borne-inf` (inegalite) : Pour tout $u\in V$ : $\|Bu\|_V\ge\alpha\|u\|_V$.
- `inj` (consequence) : $\ker B=\{0\}$ : $B$ est injectif.
- `s-suite` (definition, locale) : Soit $(u_n)\subset V$ telle que $Bu_n\to y$ dans $V$.
- `cauchy` (consequence) : $(u_n)$ est de Cauchy dans $V$ : $\|u_n-u_m\|_V\le\alpha^{-1}\|Bu_n-Bu_m\|_V$.
- `conv` (consequence) : Il existe $u\in V$ tel que $u_n\to u$ dans $V$.
- `lim` (egalite) : $Bu=y$.
- `ferme` (consequence) : $\operatorname{Im}B$ est fermée dans $V$.
- `orth` (definition, locale) : Soit $v\in V$ tel que $v\perp\operatorname{Im}B$, c'est-à-dire $\langle Bu,v\rangle_V=0$ pour tout $u\in V$.
- `orth-test` (egalite) : $\langle Bv,v\rangle_V=0$.
- `orth-nul` (consequence) : $v=0$ : l'orthogonal de $\operatorname{Im}B$ est réduit à $\{0\}$.
- `dense` (consequence) : $\operatorname{Im}B$ est dense dans $V$ : $\overline{\operatorname{Im}B}=V$.
- `surj` (consequence) : $\operatorname{Im}B=V$ : $B$ est surjectif.
- `s-K` (consequence) : $K=V$ est non vide, convexe et fermé dans $V$.
- `s-ineq` (application-theoreme) : Il existe un unique $u\in V$ tel que $a(u,w-u)\ge\langle f,w-u\rangle$ pour tout $w\in V$.
- `s-eq` (consequence) : Pour cet $u$ : $a(u,v)=\langle f,v\rangle$ pour tout $v\in V$.
- `s-uniq` (consequence) : Toute solution de l'équation $a(u,v)=\langle f,v\rangle$ pour tout $v\in V$ résout l'inéquation : elle est unique.
- `exist-unique` (consequence) : Pour tout $f\in V'$, il existe un unique $u\in V$ tel que $a(u,v)=\langle f,v\rangle$ pour tout $v\in V$.
- `estim` (inegalite) : Cette solution vérifie $\|u\|_V\le\alpha^{-1}\|f\|_{V'}$.
- `fin` (conclusion) : Théorème de Lax–Milgram : pour tout $f\in V'$, il existe un unique $u\in V$ tel que $a(u,v)=\langle f,v\rangle$ pour tout $v\in V$, et $\|u\|_V\le\alpha^{-1}\|f\|_{V'}$.
- `x-dense-surj` (consequence, DISTRACTEUR) : Comme $\overline{\operatorname{Im}B}=V$, on a directement $\operatorname{Im}B=V$, sans établir la fermeture de l'image.
- `x-sym` (consequence, DISTRACTEUR) : $a$ est un produit scalaire équivalent sur $V$ : Riesz appliqué à $(V,a)$ conclut directement.

Règles :
- `h-bilin` + `h-cont` ⟹ `forme-cont` par « Linéaire en $v$ par bilinéarité, bornée en $v$ par $M\|u\|_V$ par continuité de $a$. »
- `h-V` + `forme-cont` ⟹ `riesz-B` par « Théorème de représentation de Riesz. [riesz] »
- `riesz-B` + `h-bilin` + `h-cont` ⟹ `B-L` par « Linéarité : unicité du représentant de Riesz. Borne : $\|Bu\|_V^2=a(u,Bu)\le M\|u\|_V\|Bu\|_V$. »
- `h-V` + `h-f` ⟹ `riesz-g` par « Théorème de représentation de Riesz. [riesz] »
- `riesz-B` + `riesz-g` ⟹ `reduc` par « L'égalité $\langle Bu-g,v\rangle_V=0$ pour tout $v\in V$ équivaut à $Bu=g$, en prenant $v=Bu-g$. »
- `h-coer` + `riesz-B` ⟹ `minor` par « $\langle Bu,u\rangle_V=a(u,u)$, coercivité, puis Cauchy–Schwarz dans $V$. [cauchy-schwarz] » (chemin image)
- `minor` ⟹ `borne-inf` par « Division par $\|u\|_V$ si $u\ne 0$ ; le cas $u=0$ est immédiat. » (chemin image)
- `borne-inf` + `B-L` ⟹ `inj` par « Si $Bu=0$, la minoration donne $u=0$ ; $B$ étant linéaire, noyau nul équivaut à injectivité. » (chemin image)
- `s-suite` + `borne-inf` + `B-L` ⟹ `cauchy` par « La minoration appliquée à $u_n-u_m$ (linéarité de $B$) ; $(Bu_n)$ convergente est de Cauchy. » (chemin image)
- `cauchy` + `h-V` ⟹ `conv` par « Complétude de $V$. » (chemin image)
- `conv` + `s-suite` + `B-L` ⟹ `lim` par « Continuité de $B$ : $Bu_n\to Bu$, puis unicité de la limite. » (chemin image)
- `lim` ⟹ `ferme` par « Caractérisation séquentielle : toute limite de suite d'éléments de $\operatorname{Im}B$ appartient à $\operatorname{Im}B$. » (chemin image)
- `orth` ⟹ `orth-test` par « On prend $u=v$ dans la relation d'orthogonalité. » (chemin image)
- `orth` + `B-L` ⟹ `orth-test` par « L'adjoint de $B\in\mathcal L(V)$ vérifie $\langle Bu,v\rangle_V=\langle u,B^*v\rangle_V$ pour tout $u$ : donc $B^*v=0$, d'où $\langle Bv,v\rangle_V=\langle v,B^*v\rangle_V=0$. » (chemin image)
- `orth-test` + `h-coer` + `riesz-B` ⟹ `orth-nul` par « $\alpha\|v\|_V^2\le a(v,v)=\langle Bv,v\rangle_V$. » (chemin image)
- `orth-nul` + `h-V` + `B-L` ⟹ `dense` par « Dans un espace de Hilbert, un sous-espace $F$ vérifie $\overline F=V$ si et seulement si $F^\perp=\{0\}$ ; ici $F=\operatorname{Im}B$ est un sous-espace car $B$ est linéaire. » (chemin image)
- `ferme` + `dense` ⟹ `surj` par « Un sous-espace à la fois fermé et dense est l'espace entier : $\operatorname{Im}B=\overline{\operatorname{Im}B}=V$. » (chemin image)
- `surj` + `inj` + `reduc` ⟹ `exist-unique` par « $B$ est bijectif, et la réduction donne l'équivalence entre le problème et $Bu=g$. » (chemin image)
- `h-V` ⟹ `s-K` par « $V$ est non vide, convexe et fermé dans lui-même. » (chemin stampacchia)
- `h-V` + `h-bilin` + `h-cont` + `h-coer` + `s-K` + `h-f` ⟹ `s-ineq` par « Théorème de Stampacchia, pour le convexe fermé non vide $K=V$. [stampacchia] » (chemin stampacchia)
- `s-ineq` + `h-bilin` ⟹ `s-eq` par « On prend $w=u+v$ puis $w=u-v$ : deux inégalités opposées, par linéarité de $a(u,\cdot)$ et de $f$. » (chemin stampacchia)
- `s-ineq` ⟹ `s-uniq` par « Une égalité implique l'inégalité large ; l'unicité dans le théorème de Stampacchia conclut. » (chemin stampacchia)
- `s-eq` + `s-uniq` ⟹ `exist-unique` par « Réunion de l’existence et de l’unicité données par Stampacchia. » (chemin stampacchia)
- `exist-unique` + `h-coer` ⟹ `estim` par « $\alpha\|u\|_V^2\le a(u,u)=\langle f,u\rangle\le\|f\|_{V'}\|u\|_V$, puis division par $\|u\|_V$ si $u\ne 0$. »
- `exist-unique` + `estim` ⟹ `fin` par « Réunion de l’existence, de l’unicité et de l’estimation. »

Justifications sans règle (séduisantes ou fausses) : « Une forme bilinéaire est automatiquement continue en chaque variable. » ; « La majoration $\|Bu\|_V\le M\|u\|_V$ se renverse en une minoration. » ; « L’image d’un opérateur borné est toujours fermée. » ; « L’image étant dense, elle est égale à tout l’espace. » ; « Comme $a$ est symétrique, on applique Riesz dans $(V,a)$. » ; « Théorème de Lax–Milgram. »

Pièges :
- `surj` par « L’image étant dense, elle est égale à tout l’espace. » → incorrect [image-dense-surjective] : Une image dense n'est pas forcément tout l'espace : c'est la fermeture, établie à part, qui permet de conclure. Densité et fermeture sont deux étapes distinctes. — Contre-exemple : Sur $\ell^2$, $T(u)=(u_n/n)_{n\ge 1}$ est borné, injectif, d'image dense (elle contient les suites à support fini), mais $g=(1/n)_n\in\ell^2$ n'a pas d'antécédent : il faudrait $u_n=1$ pour tout $n$.
- `x-dense-surj` → incorrect [image-dense-surjective] : « Image dense » et « image égale à l'espace » sont deux propriétés distinctes : sans l'image fermée, la densité ne donne pas la surjectivité. — Contre-exemple : Sur $\ell^2$, $T(u)=(u_n/n)_{n\ge 1}$ est injectif et d'image dense, sans être surjectif, car son image n'est pas fermée.
- `ferme` par « L’image d’un opérateur borné est toujours fermée. » → incorrect [image-dense-surjective] : L'image d'un opérateur borné n'est pas fermée en général : c'est la minoration $\|Bu\|_V\ge\alpha\|u\|_V$ qui donne la fermeture ici. — Contre-exemple : $T(u)=(u_n/n)_{n\ge 1}$ sur $\ell^2$ : l'image contient les suites à support fini, donc elle est dense, et elle ne contient pas $(1/n)_n$. Elle n'est donc pas fermée.
- `forme-cont` par « Une forme bilinéaire est automatiquement continue en chaque variable. » → incorrect [hypotheses-theoreme] : En dimension infinie, la bilinéarité ne donne aucune continuité : l'application de Riesz repose sur l'hypothèse de continuité de $a$. — Contre-exemple : Si $\varphi$ est une forme linéaire non continue sur $V$ de dimension infinie, $a(u,v)=\langle u,v\rangle_V+\varphi(u)\varphi(v)$ est bilinéaire et coercive, mais $a(u,\cdot)$ n'est pas continue dès que $\varphi(u)\neq 0$.
- `borne-inf` par « La majoration $\|Bu\|_V\le M\|u\|_V$ se renverse en une minoration. » → incorrect [hypotheses-theoreme] : Une majoration ne se renverse pas : la minoration vient de la coercivité, combinée à Cauchy–Schwarz.
- `x-sym` → incorrect [coercivite-symetrie] : La symétrie n'est pas une hypothèse de Lax–Milgram : une forme coercive peut ne pas être symétrique, et ne définit alors pas un produit scalaire. — Contre-exemple : $V=\mathbb R^2$, $a(u,v)=u_1v_1+u_2v_2+u_1v_2-u_2v_1$ : $a(u,u)=\|u\|^2$, mais $a(e_1,e_2)=1$ et $a(e_2,e_1)=-1$.
- `exist-unique` par « Comme $a$ est symétrique, on applique Riesz dans $(V,a)$. » → incorrect [coercivite-symetrie] : Riesz dans $(V,a)$ suppose $a$ symétrique. L'énoncé ne le suppose pas : c'est tout l'objet du théorème. — Contre-exemple : $V=\mathbb R^2$, $a(u,v)=u_1v_1+u_2v_2+u_1v_2-u_2v_1$ est coercive et non symétrique.

Retraits :
- `h-cont` (nécessaire) : Sans continuité, $a(u,\cdot)$ n'appartient plus à $V'$ : Riesz ne s'applique plus et $B$ n'est plus défini. La conclusion peut tomber. — Contre-exemple : Si $\varphi$ est une forme linéaire non continue sur $V$ de dimension infinie (il en existe, par base algébrique) et $g\in V$ vérifie $\varphi(g)\neq 0$, alors $a(u,v)=\langle u,v\rangle_V+\varphi(u)\varphi(v)$ est coercive, et l'équation $a(u,v)=\langle g,v\rangle_V$ pour tout $v$ n'a aucune solution : $\varphi(u)\ne 0$ rendrait $\varphi$ continue, et $\varphi(u)=0$ imposerait $u=g$, avec $\varphi(g)\ne 0$.
- `h-coer` (nécessaire) : Sans coercivité, plus de minoration : ni l'injectivité, ni la fermeture de l'image, ni la densité ne sont garanties. — Contre-exemple : Sur $V=\ell^2$, $a(u,v)=\sum_{n\ge 1}u_nv_n/n$ est bilinéaire, continue, symétrique, avec $a(u,u)>0$ pour $u\ne 0$, mais non coercive ($a(e_n,e_n)=1/n$). Pour $g=(1/n)_n\in\ell^2$, l'équation $a(u,v)=\langle g,v\rangle$ impose $u_n=1$ pour tout $n$ : aucune solution dans $\ell^2$.
- `h-V` (nécessaire) : Sans complétude, la suite de Cauchy obtenue pour l’image fermée peut ne pas converger, et Riesz n’est plus disponible. — Contre-exemple : Sur l'espace des polynômes sur $[0,1]$, muni du produit scalaire de $L^2(0,1)$, avec $a=\langle\cdot,\cdot\rangle$ et $f(v)=\int_0^1e^xv\,dx$ : une solution polynomiale $u$ serait égale à $e^x$ par densité des polynômes dans $L^2(0,1)$, ce qui est impossible.
- `h-f` (nécessaire) : Si $u$ résout $a(u,v)=\langle f,v\rangle$ pour tout $v$, alors $f=a(u,\cdot)$ est continue : la continuité de $f$ est nécessaire à l'existence. — Contre-exemple : Si $f$ est une forme linéaire non continue sur $V$, une solution $u$ rendrait $f=a(u,\cdot)$ continue : aucune solution n'existe.

Calculs fermés : [{"kind":"rational-vector","prompt":"Sur $V=\\mathbb R^2$ euclidien, $a(u,v)=u_1v_1+u_2v_2+u_1v_2-u_2v_1$ et $\\langle f,v\\rangle=v_1$ : coordonnées de la solution $u$","expected":["1/2","-1/2"],"labels":["u₁","u₂"]}]

Solution :
**Construction de $B$ et $g$.** Pour $u\in V$ fixé, la forme $v\mapsto a(u,v)$ est linéaire (bilinéarité de $a$) et bornée par $M\|u\|_V\|v\|_V$ (continuité de $a$) : elle appartient à $V'$. Riesz fournit un unique $Bu\in V$ tel que $a(u,v)=\langle Bu,v\rangle_V$ pour tout $v\in V$. L'unicité donne la linéarité de $B$, et $\|Bu\|_V^2=a(u,Bu)\le M\|u\|_V\|Bu\|_V$ donne $\|Bu\|_V\le M\|u\|_V$. De même, Riesz fournit $g\in V$ tel que $\langle f,v\rangle=\langle g,v\rangle_V$ et $\|g\|_V=\|f\|_{V'}$. L'équation $a(u,v)=\langle f,v\rangle$ pour tout $v$ équivaut alors à $Bu=g$.

**1. Injectivité et estimation.** La coercivité et Cauchy–Schwarz donnent $\alpha\|u\|_V^2\le\langle Bu,u\rangle_V\le\|Bu\|_V\|u\|_V$, donc $\|Bu\|_V\ge\alpha\|u\|_V$, et $\ker B=\{0\}$.

**2. Image fermée.** Si $Bu_n\to y$ dans $V$, la minoration appliquée à $u_n-u_m$ montre que $(u_n)$ est de Cauchy ; $V$ étant complet, $u_n\to u$, et $Bu=y$ par continuité de $B$.

**3. Image dense.** Si $v\perp\operatorname{Im}B$, alors $\langle Bu,v\rangle_V=0$ pour tout $u$. En prenant $u=v$ (ou en notant que $B^*v=0$, comme dans le polycopié) : $\alpha\|v\|_V^2\le\langle Bv,v\rangle_V=0$, donc $v=0$. L'orthogonal de $\operatorname{Im}B$ étant nul, $\overline{\operatorname{Im}B}=V$.

**4. Surjectivité.** L'image est à la fois fermée et dense : $\operatorname{Im}B=V$. Avec l'injectivité, $B$ est bijectif : pour tout $f$, il existe un unique $u$ tel que $Bu=g$, c'est-à-dire $a(u,v)=\langle f,v\rangle$ pour tout $v$.

**Estimation.** $\alpha\|u\|_V^2\le a(u,u)=\langle f,u\rangle\le\|f\|_{V'}\|u\|_V$, donc $\|u\|_V\le\alpha^{-1}\|f\|_{V'}$.

**Autre chemin.** Le convexe fermé non vide $K=V$ permet d'appliquer Stampacchia : il existe un unique $u\in V$ tel que $a(u,w-u)\ge\langle f,w-u\rangle$ pour tout $w\in V$. Le choix $w=u+v$ puis $w=u-v$ donne $a(u,v)=\langle f,v\rangle$. Toute solution de l'équation étant solution de l'inéquation, elle est unique.

**Point de vigilance.** Aucune symétrie de $a$ n'a été utilisée. « Image dense » et « image égale à $V$ » sont deux étapes distinctes.

Indices :
1. Une fois $B$ et $g$ construits par Riesz, le problème se réduit à $Bu=g$. Que faut-il prouver sur $B$, et quelles hypothèses sur $a$ interviennent à chaque stade ?
2. Sépare quatre blocs : minoration et injectivité (coercivité) ; image fermée (minoration et complétude) ; image dense (orthogonal de l'image) ; surjectivité (fermeture et densité). La symétrie n'intervient nulle part.
3. Pour l'image dense : si $v\perp\operatorname{Im}B$, prends $u=v$ dans $\langle Bu,v\rangle_V=0$, puis utilise $\alpha\|v\|_V^2\le a(v,v)=\langle Bv,v\rangle_V$. Pour la fermeture : applique la minoration à $u_n-u_m$.

Erreurs fréquentes :
- Conclure à la surjectivité à partir de la seule densité de l’image.
- Supposer $a$ symétrique et appliquer Riesz dans $(V,a)$.
- Appliquer Riesz à $a(u,\cdot)$ sans avoir reconnu l'hypothèse de continuité de $a$.
- Invoquer le théorème de Lax–Milgram pour le démontrer.

Variante : Soient $V\neq\{0\}$ un Hilbert réel, $B\in\mathcal L(V)$ tel que $\|Bu\|_V\le M\|u\|_V$ et $\langle Bu,u\rangle_V\ge\alpha\|u\|_V^2$ pour tout $u$ (avec $\alpha>0$), et $g\in V$. Sans passer par l'image, montrer que $T(u)=u-\rho(Bu-g)$ est une contraction de $V$ pour $0<\rho<2\alpha/M^2$, et en déduire que $Bu=g$ a une unique solution.

Solution de la variante : Pour $u,v\in V$, posons $w=u-v$. On a $T(u)-T(v)=w-\rho Bw$, donc $\|T(u)-T(v)\|_V^2=\|w\|_V^2-2\rho\langle Bw,w\rangle_V+\rho^2\|Bw\|_V^2\le(1-2\rho\alpha+\rho^2M^2)\|w\|_V^2$. La condition $0<\rho<2\alpha/M^2$ donne $q^2:=1-2\rho\alpha+\rho^2M^2<1$. De plus $M\ge\alpha$ (coercivité et continuité, avec $V\ne\{0\}$) donne $q^2\ge(1-\rho\alpha)^2\ge 0$. Ainsi $T$ est une contraction de $V$, complet, et le théorème du point fixe de Banach fournit un unique $u$ tel que $T(u)=u$, c'est-à-dire $Bu=g$.

Graphe de la variante :
But : `fin` — usage : demonstration

Nœuds :
- `h-V` (hypothese) : $V$ est un espace de Hilbert réel, $V\neq\{0\}$.
- `h-B` (hypothese) : $B\in\mathcal L(V)$ vérifie $\|Bu\|_V\le M\|u\|_V$ et $\langle Bu,u\rangle_V\ge\alpha\|u\|_V^2$ pour tout $u\in V$, avec $\alpha>0$.
- `h-rho` (hypothese) : $0<\rho<2\alpha/M^2$.
- `d-T` (definition) : Pour $g\in V$ et $u\in V$ : $T(u)=u-\rho(Bu-g)$.
- `dif` (egalite) : Pour $u,v\in V$, en posant $w=u-v$ : $T(u)-T(v)=w-\rho Bw$.
- `dev` (egalite) : $\|T(u)-T(v)\|_V^2=\|w\|_V^2-2\rho\langle Bw,w\rangle_V+\rho^2\|Bw\|_V^2$.
- `maj` (inegalite) : $\|T(u)-T(v)\|_V^2\le(1-2\rho\alpha+\rho^2M^2)\|u-v\|_V^2$.
- `q` (inegalite) : $q^2:=1-2\rho\alpha+\rho^2M^2$ vérifie $0\le q^2<1$.
- `contr` (consequence) : $T:V\to V$ est une contraction stricte, de rapport $q<1$.
- `pf` (application-theoreme) : $T$ admet un unique point fixe dans $V$.
- `eq` (egalite) : Pour $u\in V$ : $T(u)=u\iff Bu=g$.
- `fin` (conclusion) : L'équation $Bu=g$ admet une unique solution $u\in V$.
- `x-tout-rho` (consequence, DISTRACTEUR) : $T$ est une contraction stricte pour tout $\rho>0$.

Règles :
- `d-T` ⟹ `dif` par « Calcul direct : les termes en $g$ se compensent. »
- `dif` ⟹ `dev` par « Développement du carré de la norme. »
- `dev` + `h-B` ⟹ `maj` par « Coercivité sur le terme en $\rho$, continuité de $B$ sur le terme en $\rho^2$. »
- `h-rho` + `h-B` ⟹ `q` par « $q^2<1\iff\rho(\rho M^2-2\alpha)<0$ ; et $M\ge\alpha$ donne $q^2\ge(1-\rho\alpha)^2\ge 0$. »
- `maj` + `q` ⟹ `contr` par « On prend la racine carrée de la majoration. »
- `contr` + `h-V` ⟹ `pf` par « Théorème du point fixe de Banach sur l’espace complet $V$. [point-fixe-banach] »
- `d-T` + `h-rho` ⟹ `eq` par « $u-\rho(Bu-g)=u\iff\rho(Bu-g)=0\iff Bu=g$, car $\rho\ne 0$. »
- `pf` + `eq` ⟹ `fin` par « L’unique point fixe est l’unique solution. »

Justifications sans règle (séduisantes ou fausses) : « C’est évident. »

Pièges :
- `x-tout-rho` → incorrect [hypotheses-theoreme] : Le rapport de contraction dépend de $\rho$ : la condition $0<\rho<2\alpha/M^2$ est indispensable en général. — Contre-exemple : $V=\mathbb R$, $B=\mathrm{Id}$ ($\alpha=M=1$), $\rho=3$ : $T(u)-T(v)=-2(u-v)$.
- `contr` par « C’est évident. » → a-justifier [justification-absente] : La contraction se démontre : développe le carré de la norme, puis utilise coercivité et continuité.

Retraits :
- `h-rho` (nécessaire) : Sans $0<\rho<2\alpha/M^2$, le coefficient $q^2$ peut être $\ge 1$. — Contre-exemple : $V=\mathbb R$, $B=\mathrm{Id}$, $\rho=2$ : $T(u)-T(v)=-(u-v)$, rapport $1$, pas de contraction stricte.

Vérification : {"origin":"polycopie","review":"machine"}