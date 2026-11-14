# 32. Browder–Minty (`browder-minty`) — polycopié p. PDF 28, section 7.2

## Fiche

Espaces : $V$ : Banach réel, réflexif et séparable ; $V'$ son dual, $\langle\cdot,\cdot\rangle$ le crochet de dualité. | $A:V\to V'$ : opérateur non linéaire, défini sur tout $V$.

Hypothèses :
- $A$ est monotone : $\langle Au-Av,u-v\rangle\ge 0$. — Sans elle : Dans $\ell^2$, avec $F(x)=(\sqrt{1-\|x\|^2},x_1,x_2,\dots)$ sans point fixe sur la boule unité et $r$ la rétraction radiale, $A(u)=u-F(r(u))$ est continu, coercif, borné sur les bornés, et ne s'annule pas.
- $A$ est hémicontinu : $t\mapsto\langle A(u+tv),w\rangle$ est continue. — Sans elle : Sur $\mathbb R$, $A(u)=u-1$ pour $u<0$, $u+1$ pour $u\ge 0$ : monotone, coercif, borné sur les bornés, et $0$ n'est pas atteint.
- $A$ est coercif : $\langle Au,u\rangle/\|u\|_V\to+\infty$ quand $\|u\|_V\to\infty$. — Sans elle : Sur $\mathbb R$, $u\mapsto e^u$ est monotone, continue, bornée sur les bornés, d'image $]0,+\infty[$.
- $A$ est borné sur les bornés : $\sup_{\|u\|_V\le R}\|Au\|_{V'}<\infty$ pour tout $R>0$.

Énoncé : Si $V$ est un Banach réel, réflexif et séparable, et si $A:V\to V'$ est monotone, hémicontinu, coercif et borné sur les parties bornées, alors
$$\forall f\in V',\ \exists u\in V : Au=f.$$
Si $A$ est strictement monotone, cette solution est unique.

Bilan : {"existence":"Approximations de Galerkin $u_n\\in V_n$ par Brouwer, extraction faible, identification de la limite par l'argument de Minty.","unicite":"Si $A$ est strictement monotone, $Au=Av=f$ entraîne $0=\\langle Au-Av,u-v\\rangle>0$ pour $u\\neq v$, contradiction."}

Preuve dans le polycopié : complete

Plan :
1. Galerkin : $V_n=\mathrm{Vect}(e_1,\dots,e_n)$ ; le champ des coefficients est continu et dirigé vers l'extérieur d'une grande boule (coercivité) ; Brouwer donne $u_n$ avec $\langle Au_n,v\rangle=\langle f,v\rangle$ pour $v\in V_n$.
2. Bornes : $\langle Au_n,u_n\rangle=\langle f,u_n\rangle\le\|f\|\|u_n\|$ ; $(u_n)$ bornée par coercivité, $(Au_n)$ bornée par hypothèse.
3. Extraction : $u_n\rightharpoonup u$, $Au_n\rightharpoonup\chi$ ; $\langle\chi,e_k\rangle=\langle f,e_k\rangle$ pour tout $k$, donc $\chi=f$.
4. Minty : $0\le\langle Au_n-Av,u_n-v\rangle$ et $\langle Au_n,u_n\rangle=\langle f,u_n\rangle$ donnent $\langle f-Av,u-v\rangle\ge 0$ ; $v=u-tw$, $t\downarrow 0$ et $w\mapsto -w$ donnent $Au=f$.
5. Unicité par stricte monotonie.

Vigilance :
- La coercivité d’un opérateur non linéaire n’est pas la coercivité quadratique d’une forme bilinéaire.
- Monotonie et coercivité ne sont pas interchangeables : chacune se vérifie.
- La difficulté n'est pas d'obtenir une limite $u$, mais de prouver que la limite du terme non linéaire est $A(u)$.

Vérification : {"origin":"polycopie","review":"machine","notes":"Démonstration du polycopié (p. PDF 28–29), le lemme de dimension finie étant détaillé."}

Définition « Opérateur monotone, strictement monotone » : $A:V\to V'$ est monotone si $\langle Au-Av,u-v\rangle\ge 0$ pour tous $u,v\in V$, strictement monotone si l'inégalité est stricte pour $u\neq v$.

Définition « Opérateur hémicontinu, coercif » : $A$ est hémicontinu si $t\mapsto\langle A(u+tv),w\rangle$ est continue pour tous $u,v,w\in V$ ; coercif si $\langle Au,u\rangle/\|u\|_V\to+\infty$ quand $\|u\|_V\to\infty$.

## Contre-exemple `ce-bm-coercivite` : Monotone sans coercivité
Assertion : Tout opérateur monotone et continu de ℝ dans ℝ est surjectif.
Tâche : Pour $A(u)=e^u$ sur $\mathbb R$, donne la borne inférieure de l'image de $A$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\inf_{u\\in\\mathbb R}e^u$","expected":"0"}
Explication : $e^u$ est strictement croissante, donc monotone, et continue ; son image est $]0,+\infty[$ : aucun $f\le 0$ n'est atteint. La coercivité échoue : $e^u u/|u|\to 0$ quand $u\to-\infty$.

## Contre-exemple `ce-bm-monotonie` : Coercif sans monotonie
Assertion : Un opérateur continu et coercif de ℝ dans ℝ définit une équation à solution unique.
Tâche : Pour $A(u)=u^3-u$, compte les solutions de $A(u)=0$.
Vérification : {"kind":"rational","prompt":"Nombre de solutions de $u^3-u=0$","expected":"3"}
Explication : $A$ est continue et coercive ($(u^4-u^2)/|u|\to+\infty$), non monotone ($A'(0)=-1$), et $u^3-u=u(u-1)(u+1)$ s'annule en $-1$, $0$, $1$.

## Exercice facile `browder-minty.facile` : Monotonie de $A(u)=u$ sur un Hilbert

Énoncé : Soit $H$ un Hilbert réel séparable et $A:H\to H'$ défini par $\langle Au,w\rangle=(u,w)_H$. Vérifier que $A$ est strictement monotone, hémicontinu, coercif et borné sur les bornés, puis en déduire par Browder–Minty que $Au=f$ a une unique solution pour tout $f\in H'$.
Source : {"doc":"polycopie","pdfPage":44,"label":"Exercice 32, facile (p. PDF 44) ; définitions de la section 7.1 (p. PDF 28)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-H` (hypothese) : $H$ est un Hilbert réel séparable, donc un Banach réel réflexif séparable.
- `d-A` (definition) : $\langle Au,w\rangle=(u,w)_H$ pour $u,w\in H$.
- `s-uv` (definition, locale) : Soient $u,v\in H$.
- `calc` (egalite) : $\langle Au-Av,u-v\rangle=\|u-v\|_H^2$.
- `mono` (consequence) : $A$ est monotone.
- `strict` (consequence) : $A$ est strictement monotone.
- `hemi` (consequence) : $t\mapsto\langle A(u+tv),w\rangle=(u,w)_H+t(v,w)_H$ est continue : $A$ est hémicontinu.
- `coer` (egalite) : $\langle Au,u\rangle/\|u\|_H=\|u\|_H\to+\infty$ quand $\|u\|_H\to\infty$ : $A$ est coercif.
- `borne` (egalite) : $\|Au\|_{H'}=\|u\|_H$ : $A$ est borné sur les bornés.
- `thm` (application-theoreme) : Pour tout $f\in H'$, il existe un unique $u\in H$ tel que $Au=f$.
- `fin` (conclusion) : $A$ vérifie toutes les hypothèses de Browder–Minty, avec stricte monotonie : $Au=f$ a une unique solution pour tout $f\in H'$.
- `x-opp` (consequence, DISTRACTEUR) : L'opérateur $B(u)=-u$ est monotone.
- `x-mono-coer` (consequence, DISTRACTEUR) : Tout opérateur monotone de $H$ dans $H'$ est coercif.
- `x-quad` (consequence, DISTRACTEUR) : Un opérateur est coercif au sens de Browder–Minty si et seulement s'il existe $\alpha>0$ tel que $\langle Au,u\rangle\ge\alpha\|u\|^2$ pour tout $u$.

Règles :
- `s-uv` + `d-A` ⟹ `calc` par « Linéarité de $A$ et définition : $\langle A(u-v),u-v\rangle=(u-v,u-v)_H$. »
- `calc` ⟹ `mono` par « Définition de la monotonie : le crochet est positif ou nul. »
- `calc` ⟹ `strict` par « Si $u\neq v$, alors $\|u-v\|_H^2>0$. »
- `d-A` ⟹ `hemi` par « Une fonction affine de t est continue. »
- `d-A` ⟹ `coer` par « $\langle Au,u\rangle=\|u\|_H^2$. »
- `d-A` ⟹ `borne` par « Cauchy–Schwarz donne $|(u,w)_H|\le\|u\|_H\|w\|_H$, avec égalité pour $w=u$. [cauchy-schwarz] »
- `h-H` + `mono` + `strict` + `hemi` + `coer` + `borne` ⟹ `thm` par « Théorème de Browder–Minty, avec unicité par stricte monotonie. [browder-minty] »
- `mono` + `strict` + `hemi` + `coer` + `borne` + `thm` ⟹ `fin` par « Réunion des hypothèses vérifiées et de la conclusion du théorème. »

Justifications sans règle (séduisantes ou fausses) : « Tout opérateur linéaire est monotone. » ; « La monotonie entraîne la coercivité. »

Pièges :
- `x-opp` → incorrect [browder-minty-monotone-coercif] : La monotonie dépend du signe : un opérateur linéaire n’est monotone que si sa forme quadratique est positive. — Contre-exemple : $\langle B u-Bv,u-v\rangle=-\|u-v\|_H^2<0$ pour $u\neq v$.
- `mono` par « Tout opérateur linéaire est monotone. » → incorrect [browder-minty-monotone-coercif] : Cette justification est fausse : la linéarité ne donne aucun signe. — Contre-exemple : $B(u)=-u$ est linéaire et non monotone.
- `x-mono-coer` → incorrect [browder-minty-monotone-coercif] : Monotonie et coercivité sont deux hypothèses indépendantes. — Contre-exemple : $A=0$ est monotone et $\langle Au,u\rangle/\|u\|=0$ ; sur $\mathbb R$, $u\mapsto e^u$ est monotone et non coercive, d'image $]0,+\infty[$.
- `coer` par « La monotonie entraîne la coercivité. » → incorrect [browder-minty-monotone-coercif] : La coercivité se vérifie à part : elle n’est pas une conséquence de la monotonie.
- `x-quad` → incorrect [coercivite-non-lineaire] : La coercivité d'un opérateur non linéaire demande seulement $\langle Au,u\rangle/\|u\|\to+\infty$ ; la coercivité quadratique en est un cas particulier. — Contre-exemple : Sur $\mathbb R$, $A(u)=|u|^{-1/2}u$ (prolongé par $0$) donne $\langle Au,u\rangle/|u|=|u|^{1/2}\to+\infty$, alors que $|u|^{3/2}\ge\alpha u^2$ échoue pour $|u|$ grand.

Retraits :
- `coer` (nécessaire) : Sans coercivité, les solutions approchées ne sont plus bornées et l’existence peut échouer. — Contre-exemple : Sur $\mathbb R$, $u\mapsto e^u$ est monotone, continue, bornée sur les bornés, et $e^u=-1$ n'a pas de solution.
- `strict` (nécessaire) : L’existence subsiste, l’unicité peut tomber. — Contre-exemple : Sur $\mathbb R$, $A(u)=u-1$ si $u>1$, $0$ si $|u|\le 1$, $u+1$ si $u<-1$ : continue, monotone, coercive, et $Au=0$ pour tout $u\in[-1,1]$.

Calculs fermés : [{"kind":"rational","prompt":"Dans $H=\\mathbb R^2$, valeur de $\\langle Au-Av,u-v\\rangle$ pour $u=(1,2)$ et $v=(3,-1)$","expected":"13"}]

Solution :
**Monotonie.** $\langle Au-Av,u-v\rangle=(u-v,u-v)_H=\|u-v\|_H^2\ge 0$, avec inégalité stricte si $u\neq v$.

**Hémicontinuité.** $t\mapsto\langle A(u+tv),w\rangle=(u,w)_H+t(v,w)_H$ est affine, donc continue.

**Coercivité.** $\langle Au,u\rangle/\|u\|_H=\|u\|_H\to+\infty$.

**Bornitude.** $\|Au\|_{H'}=\sup_{\|w\|\le 1}(u,w)_H=\|u\|_H$ par Cauchy–Schwarz.

**Conclusion.** $H$ est réflexif et séparable ; Browder–Minty donne une solution de $Au=f$, unique par stricte monotonie. On retrouve le théorème de Riesz : $u$ est le représentant de $f$.

**Vigilance.** $-I$ est linéaire et non monotone ; $e^u$ est monotone et non coercive. Monotonie et coercivité ne sont pas interchangeables.

Indices :
1. Que vaut $\langle Au-Av,u-v\rangle$ quand $A$ est l'identification de Riesz ?
2. Chaque hypothèse du théorème se vérifie par un calcul d’une ligne ; fais-les toutes, sans en déduire une des autres.
3. $\langle Au,u\rangle=\|u\|^2$ et $\|Au\|_{H'}=\|u\|$ ; la stricte monotonie donne l'unicité.

Erreurs fréquentes :
- Croire qu’un opérateur linéaire est toujours monotone.
- Déduire la coercivité de la monotonie.
- Exiger une coercivité quadratique dans Browder–Minty.

Variante : Sur $V=\mathbb R$, soit $A(u)=u^3$. Vérifier les hypothèses de Browder–Minty avec stricte monotonie, et résoudre $A(u)=8$.

Solution de la variante : $(u^3-v^3)(u-v)=(u-v)^2(u^2+uv+v^2)$ et $u^2+uv+v^2=(u+v/2)^2+3v^2/4>0$ si $(u,v)\neq(0,0)$ : $A$ est strictement monotone. $A$ est continue, bornée sur les bornés, et $u^4/|u|=|u|^3\to+\infty$. Browder–Minty donne une unique solution de $A(u)=8$, à savoir $u=2$. La coercivité quadratique $u^4\ge\alpha u^2$ échoue près de $0$ : elle n'est pas requise.

Graphe de la variante :
But : `fin` — usage : application

Nœuds :
- `h-R` (hypothese) : $V=\mathbb R$ est un Banach réel réflexif séparable.
- `d-A` (definition) : $A(u)=u^3$.
- `fact` (egalite) : $(u^3-v^3)(u-v)=(u-v)^2(u^2+uv+v^2)$.
- `strict` (consequence) : $A$ est strictement monotone.
- `autres` (consequence) : $A$ est continue (donc hémicontinue), bornée sur les bornés, et $u^4/|u|=|u|^3\to+\infty$.
- `thm` (application-theoreme) : $A(u)=f$ admet une unique solution pour tout $f\in\mathbb R$.
- `val` (egalite, calcul rational) : La solution de $A(u)=8$ est $u=2$.
  - valeur attendue : "2"
- `fin` (conclusion) : $A(u)=u^3$ relève de Browder–Minty, et $A(u)=8$ a pour unique solution $u=2$.
- `x-quad` (inegalite, DISTRACTEUR) : Il existe $\alpha>0$ tel que $u^4\ge\alpha u^2$ pour tout $u\in\mathbb R$.

Règles :
- `d-A` ⟹ `fact` par « Factorisation $u^3-v^3=(u-v)(u^2+uv+v^2)$. »
- `fact` ⟹ `strict` par « $u^2+uv+v^2=(u+v/2)^2+3v^2/4>0$ si $(u,v)\neq(0,0)$, et $(u-v)^2>0$ si $u\neq v$. »
- `d-A` ⟹ `autres` par « Un polynôme est continu, borné sur les compacts, et le calcul du quotient est direct. »
- `h-R` + `strict` + `autres` ⟹ `thm` par « Théorème de Browder–Minty. [browder-minty] »
- `thm` + `d-A` ⟹ `val` par « $2^3=8$, et l'unicité exclut toute autre solution. »
- `thm` + `val` ⟹ `fin` par « Réunion des résultats établis. »

Pièges :
- `x-quad` → incorrect [coercivite-non-lineaire] : La coercivité quadratique échoue près de $0$ ; Browder–Minty ne la demande pas. — Contre-exemple : Pour $u=\sqrt{\alpha}/2$ : $u^4=\alpha u^2/4<\alpha u^2$.

Retraits :
- `strict` (nécessaire) : Sans stricte monotonie, l’unicité n’est plus garantie par le théorème. — Contre-exemple : $A(u)=u^3-u$ est coercive et continue, non monotone, et $A(u)=0$ a trois solutions.

Vérification : {"origin":"complement","review":"machine","notes":"L’exercice figure au polycopié sans corrigé ; vérifications rédigées pour ProofLab."}

## Exercice intermediaire `browder-minty.intermediaire` : Croissance, coercivité, hémicontinuité du $p$-Laplacien

Énoncé : Soit $1<p<\infty$, $p'=p/(p-1)$, $\Omega$ borné lipschitzien, $V=W^{1,p}_0(\Omega)$ muni de $\|u\|_V=\|\nabla u\|_{L^p}$, et $\langle Au,v\rangle=\int_\Omega|\nabla u|^{p-2}\nabla u\cdot\nabla v\,dx$. Montrer que $\|Au\|_{V'}\le\|u\|_V^{p-1}$, que $A$ est coercif au sens de la section 7.1, et que $A$ est hémicontinu.
Source : {"doc":"polycopie","pdfPage":44,"label":"Exercice 32, intermédiaire (p. PDF 44) ; section 7.3 (p. PDF 29–30)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-p` (hypothese) : $\Omega$ est borné lipschitzien, $V=W^{1,p}_0(\Omega)$ est muni de $\|u\|_V=\|\nabla u\|_{L^p}$, et $|z|^{p-2}z$ vaut $0$ en $z=0$.
- `h-p1` (hypothese) : $1<p<\infty$ et $p'=p/(p-1)$.
- `d-A` (definition) : $\langle Au,v\rangle=\int_\Omega|\nabla u|^{p-2}\nabla u\cdot\nabla v\,dx$.
- `e-exp` (egalite) : $(p-1)p'=p$, donc $\big\||\nabla u|^{p-1}\big\|_{L^{p'}}=\|\nabla u\|_{L^p}^{p-1}$.
- `holder` (inegalite) : $|\langle Au,v\rangle|\le\|\nabla u\|_{L^p}^{p-1}\|\nabla v\|_{L^p}$.
- `crois` (inegalite) : $Au\in V'$ et $\|Au\|_{V'}\le\|u\|_V^{p-1}$ : $A$ est borné sur les bornés.
- `egal` (egalite) : $\langle Au,u\rangle=\int_\Omega|\nabla u|^p=\|u\|_V^p$.
- `coer` (consequence) : $\langle Au,u\rangle/\|u\|_V=\|u\|_V^{p-1}\to+\infty$ quand $\|u\|_V\to\infty$.
- `ptw` (consequence) : Pour $u,v,w\in V$ et $t\to t_0$, $|\nabla(u+tv)|^{p-2}\nabla(u+tv)\cdot\nabla w$ converge presque partout vers sa valeur en $t_0$.
- `dom` (inegalite) : Pour $|t|\le R$ : $\big||\nabla(u+tv)|^{p-2}\nabla(u+tv)\cdot\nabla w\big|\le C_{p,R}\big(|\nabla u|^{p-1}+|\nabla v|^{p-1}\big)|\nabla w|\in L^1(\Omega)$.
- `hemi` (consequence) : $t\mapsto\langle A(u+tv),w\rangle$ est continue : $A$ est hémicontinu.
- `fin` (conclusion) : $A:V\to V'$ vérifie $\|Au\|_{V'}\le\|u\|_V^{p-1}$, est coercif et hémicontinu.
- `x-quad` (inegalite, DISTRACTEUR) : Il existe $\alpha>0$ tel que $\langle Au,u\rangle\ge\alpha\|u\|_V^2$ pour tout $u\in V$.

Règles :
- `h-p1` ⟹ `e-exp` par « $(p-1)\cdot\frac{p}{p-1}=p$, puis calcul de la norme $L^{p'}$. »
- `d-A` + `e-exp` ⟹ `holder` par « Inégalité de Hölder avec les exposants conjugués $p'$ et $p$. [holder] »
- `holder` + `h-p` ⟹ `crois` par « Définition de la norme duale, et linéarité de $v\mapsto\langle Au,v\rangle$. »
- `d-A` + `h-p` ⟹ `egal` par « Prendre $v=u$ : $|\nabla u|^{p-2}\nabla u\cdot\nabla u=|\nabla u|^p$. »
- `egal` + `h-p1` ⟹ `coer` par « Division par $\|u\|_V$, et $p-1>0$. »
- `d-A` + `h-p` ⟹ `ptw` par « $z\mapsto|z|^{p-2}z$ est continue sur $\mathbb R^d$, y compris en $0$ lorsque $p<2$, car $\big||z|^{p-2}z\big|=|z|^{p-1}\to 0$. »
- `d-A` + `e-exp` ⟹ `dom` par « $|\nabla u+t\nabla v|^{p-1}\le(|\nabla u|+R|\nabla v|)^{p-1}$, convexité ou sous-additivité de $s\mapsto s^{p-1}$, puis Hölder. »
- `ptw` + `dom` ⟹ `hemi` par « Théorème de convergence dominée. [convergence-dominee] »
- `crois` + `coer` + `hemi` ⟹ `fin` par « Réunion des trois propriétés. »

Justifications sans règle (séduisantes ou fausses) : « Cauchy–Schwarz dans $L^2$ : $|\langle Au,v\rangle|\le\big\||\nabla u|^{p-1}\big\|_{L^2}\|\nabla v\|_{L^2}$. » ; « La monotonie stricte de $A$ entraîne sa coercivité. » ; « C’est évident. »

Pièges :
- `x-quad` → incorrect [coercivite-non-lineaire] : Pour $p\neq 2$, $\langle Au,u\rangle=\|u\|_V^p$ n'est pas minoré par $\alpha\|u\|_V^2$ : c'est la coercivité au sens de la section 7.1, non la coercivité quadratique, qui est vérifiée. — Contre-exemple : Pour $u=s u_0$ : $\langle Au,u\rangle=s^p\|u_0\|_V^p$, et $s^p<\alpha s^2\|u_0\|_V^{2-p}$ pour $s$ grand si $p<2$, pour $s$ petit si $p>2$.
- `holder` par « Cauchy–Schwarz dans $L^2$ : $|\langle Au,v\rangle|\le\big\||\nabla u|^{p-1}\big\|_{L^2}\|\nabla v\|_{L^2}$. » → incorrect [hypotheses-theoreme] : Pour $p<2$, $\nabla v$ n'est pas de carré intégrable en général : seule la paire d'exposants $(p',p)$ convient. — Contre-exemple : Pour $p=\frac32$ sur $]0,1[$, $v(x)=x^{1/2}(1-x)$ appartient à $W^{1,3/2}_0$, et $v'\notin L^2$ car $|v'|^2$ se comporte comme $\frac1{4x}$ près de $0$.
- `coer` par « La monotonie stricte de $A$ entraîne sa coercivité. » → incorrect [browder-minty-monotone-coercif] : Monotonie et coercivité sont des hypothèses distinctes : la coercivité se calcule ici directement. — Contre-exemple : Sur $\mathbb R$, $u\mapsto\arctan u$ est strictement monotone et non coercive.
- `hemi` par « C’est évident. » → a-justifier [justification-absente] : L’hémicontinuité demande un passage à la limite sous l’intégrale : il faut une domination.

Retraits :
- `h-p1` (nécessaire) : Pour $p=1$, $p'=p/(p-1)$ n'est plus un réel (l'exposant conjugué de $1$ est $+\infty$) et la coercivité est perdue. — Contre-exemple : Pour $p=1$ : $\langle Au,u\rangle/\|u\|_V=\int|\nabla u|/\|\nabla u\|_{L^1}=1$ ne tend pas vers $+\infty$.

Calculs fermés : [{"kind":"rational","prompt":"Exposant conjugué $p'$ pour $p=3$","expected":"3/2"}]

Solution :
**Croissance.** Comme $(p-1)p'=p$, $\||\nabla u|^{p-1}\|_{L^{p'}}=\|\nabla u\|_{L^p}^{p-1}$. Hölder donne $|\langle Au,v\rangle|\le\|\nabla u\|_{L^p}^{p-1}\|\nabla v\|_{L^p}$, donc $\|Au\|_{V'}\le\|u\|_V^{p-1}$ : $A$ envoie $V$ dans $V'$ et est borné sur les bornés.

**Coercivité.** $\langle Au,u\rangle=\int|\nabla u|^p=\|u\|_V^p$, donc $\langle Au,u\rangle/\|u\|_V=\|u\|_V^{p-1}\to+\infty$ puisque $p>1$. Ce n'est pas une coercivité quadratique si $p\neq 2$.

**Hémicontinuité.** $z\mapsto|z|^{p-2}z$ est continue sur $\mathbb R^d$ (en $0$, sa norme vaut $|z|^{p-1}\to 0$), d'où la convergence presque partout de l'intégrande quand $t\to t_0$. Pour $|t|\le R$, l'intégrande est dominé par $C_{p,R}(|\nabla u|^{p-1}+|\nabla v|^{p-1})|\nabla w|$, intégrable par Hölder. La convergence dominée conclut.

Indices :
1. Quel couple d'exposants conjugués fait apparaître exactement $\|\nabla v\|_{L^p}$ ?
2. Calcule $\||\nabla u|^{p-1}\|_{L^{p'}}$ grâce à $(p-1)p'=p$ ; pour la coercivité, prends $v=u$.
3. Pour l'hémicontinuité : continuité de $z\mapsto|z|^{p-2}z$, puis domination par $C(|\nabla u|^{p-1}+|\nabla v|^{p-1})|\nabla w|$ pour $|t|\le R$.

Erreurs fréquentes :
- Confondre la coercivité de la section 7.1 avec la coercivité quadratique.
- Employer Cauchy–Schwarz dans $L^2$ au lieu de Hölder $(p',p)$.
- Passer à la limite sous l’intégrale sans domination.

Variante : Sur $V=\mathbb R^2$ euclidien, soit $A(z)=|z|^2z$. Vérifier croissance, coercivité et hémicontinuité, et calculer $\langle A(z),z\rangle$ pour $z=(1,1)$.

Solution de la variante : $|A(z)|=|z|^3$ : croissance de degré $3$, et $A$ est borné sur les bornés. $\langle A(z),z\rangle=|z|^4$, donc $\langle A(z),z\rangle/|z|=|z|^3\to+\infty$. $A$ est polynomiale, donc continue, a fortiori hémicontinue. Pour $z=(1,1)$ : $|z|^2=2$ et $\langle A(z),z\rangle=|z|^4=4$.

Vérification : {"origin":"polycopie","review":"machine","notes":"Démonstration de la section 7.3 (p. PDF 29–30), détaillée."}

## Exercice difficile `browder-minty.difficile` : Galerkin stationnaire et argument de Minty

Énoncé : Soit $V$ un Banach réel réflexif séparable, $A:V\to V'$ monotone, hémicontinu, coercif et borné sur les bornés, et $f\in V'$. Reconstruire la preuve de l'existence d'un $u\in V$ tel que $Au=f$ : approximation de Galerkin, bornes, extraction, identification de la limite duale, puis argument de Minty.
Source : {"doc":"polycopie","pdfPage":44,"label":"Exercice 32, difficile (p. PDF 44) ; démonstration de la section 7.2 (p. PDF 28–29)"} — prérequis : —

But : `fin` — usage : demonstration

Nœuds :
- `h-V` (hypothese) : $V$ est un Banach réel réflexif séparable ; $(e_k)$ est une suite libre dont les combinaisons linéaires sont denses, et $V_n=\mathrm{Vect}(e_1,\dots,e_n)$.
- `h-mono` (hypothese) : $A$ est monotone.
- `h-hemi` (hypothese) : $A$ est hémicontinu.
- `h-coer` (hypothese) : $A$ est coercif : $\langle Au,u\rangle/\|u\|_V\to+\infty$ quand $\|u\|_V\to\infty$.
- `h-borne` (hypothese) : $A$ est borné sur les bornés.
- `h-f` (definition, locale) : Soit $f\in V'$.
- `gal` (application-theoreme) : Pour tout $n$, il existe $u_n\in V_n$ tel que $\langle Au_n,v\rangle=\langle f,v\rangle$ pour tout $v\in V_n$.
- `bound` (consequence) : $(u_n)$ est bornée dans $V$ et $(Au_n)$ est bornée dans $V'$.
- `ext` (application-theoreme) : Après extraction : $u_n\rightharpoonup u$ dans $V$ et $Au_n\rightharpoonup\chi$ dans $V'$.
- `chi` (egalite) : $\chi=f$.
- `ident` (egalite) : $\langle Au_n,u_n\rangle=\langle f,u_n\rangle\to\langle f,u\rangle$.
- `mlim` (inegalite) : $\langle f-Av,u-v\rangle\ge 0$ pour tout $v\in V$.
- `hem` (inegalite) : $\langle f-Au,w\rangle\ge 0$ pour tout $w\in V$.
- `ls` (egalite) : $\limsup_n\langle Au_n,u_n-u\rangle=\lim_n\big(\langle f,u_n\rangle-\langle Au_n,u\rangle\big)=0$.
- `eq` (egalite) : $Au=f$.
- `fin` (conclusion) : Pour tout $f\in V'$, il existe $u\in V$ tel que $Au=f$.
- `x-weak` (consequence, DISTRACTEUR) : $u_n\rightharpoonup u$ entraîne $Au_n\rightharpoonup Au$, donc $\chi=Au$ sans autre argument.
- `x-fort` (consequence, DISTRACTEUR) : Une sous-suite de $(u_n)$ converge fortement dans $V$.

Règles :
- `h-V` + `h-mono` + `h-hemi` + `h-coer` + `h-f` ⟹ `gal` par « Sur $V_n\simeq\mathbb R^n$, $c\mapsto\big(\langle A(\sum c_ke_k)-f,e_j\rangle\big)_j$ est continue (monotonie et hémicontinuité en dimension finie) et, par coercivité, de produit scalaire positif avec $c$ sur une grande sphère : Brouwer fournit un zéro. [brouwer] »
- `gal` + `h-coer` + `h-borne` ⟹ `bound` par « $v=u_n$ donne $\langle Au_n,u_n\rangle=\langle f,u_n\rangle\le\|f\|_{V'}\|u_n\|_V$ ; la coercivité borne $(u_n)$, puis la bornitude sur les bornés borne $(Au_n)$. »
- `bound` + `h-V` ⟹ `ext` par « Extraction faible dans les espaces réflexifs $V$ et $V'$. [extraction-reflexive] »
- `ext` + `gal` + `h-V` ⟹ `chi` par « $\langle Au_n,e_k\rangle=\langle f,e_k\rangle$ pour $n\ge k$ ; à la limite $\langle\chi,e_k\rangle=\langle f,e_k\rangle$, puis densité des combinaisons des $e_k$. »
- `gal` + `ext` ⟹ `ident` par « Équation de Galerkin avec $v=u_n\in V_n$, puis convergence faible de $u_n$ testée contre $f$ fixé. »
- `ident` + `ext` + `chi` + `h-mono` ⟹ `mlim` par « $0\le\langle Au_n-Av,u_n-v\rangle=\langle Au_n,u_n\rangle-\langle Au_n,v\rangle-\langle Av,u_n-v\rangle$ : chaque terme converge, vers $\langle f,u\rangle$, $\langle f,v\rangle$ et $\langle Av,u-v\rangle$. » (chemin direct)
- `mlim` + `h-hemi` ⟹ `hem` par « $v=u-tw$, $t>0$ : $\langle f-A(u-tw),w\rangle\ge 0$ ; hémicontinuité quand $t\downarrow 0$. » (chemin direct)
- `hem` ⟹ `eq` par « Remplacer $w$ par $-w$ donne l'inégalité inverse. » (chemin direct)
- `ident` + `ext` + `chi` ⟹ `ls` par « $\langle Au_n,u_n-u\rangle=\langle f,u_n\rangle-\langle Au_n,u\rangle$, et chaque terme tend vers $\langle f,u\rangle$. » (chemin lemme)
- `ls` + `ext` + `chi` + `h-mono` + `h-hemi` ⟹ `eq` par « Lemme d’identification de Minty. [minty] » (chemin lemme)
- `eq` + `h-f` ⟹ `fin` par « $f\in V'$ est arbitraire. »

Justifications sans règle (séduisantes ou fausses) : « Le crochet de deux suites faiblement convergentes converge vers le crochet des limites : $\langle Au_n,u_n\rangle\to\langle\chi,u\rangle$. » ; « $A$ est continu pour les convergences faibles. »

Pièges :
- `x-weak` → incorrect [nonlinearite-limite-faible] : Un opérateur non linéaire n'est pas continu pour la convergence faible : identifier $\chi$ est tout l'enjeu de l'argument de Minty. — Contre-exemple : $V=L^4(]0,1[)$, $A(u)=u^3$, $u_n=1+\sin(2\pi nx)\rightharpoonup 1$, mais $u_n^3\rightharpoonup\frac52\neq 1=A(1)$.
- `x-fort` → incorrect [bornee-non-convergente] : En dimension infinie, une suite bornée n’a en général qu’une sous-suite faiblement convergente. — Contre-exemple : $V=\ell^2$, $f=0$, $(e_k)$ la base canonique, et $A=\nabla\Phi$ avec $\Phi(u)=\max(\|u\|-1,0)^2$ convexe, soit $A(u)=2\max(\|u\|-1,0)\,\frac{u}{\|u\|}$ et $A=0$ sur la boule unité : $A$ est monotone, continu, coercif et borné sur les bornés. Comme $Ae_n=0$, $u_n=e_n\in V_n$ est une solution de Galerkin ; or $\|e_n-e_m\|=\sqrt2$ pour $n\neq m$.
- `ident` par « Le crochet de deux suites faiblement convergentes converge vers le crochet des limites : $\langle Au_n,u_n\rangle\to\langle\chi,u\rangle$. » → incorrect [nonlinearite-limite-faible] : Le crochet de deux suites faiblement convergentes ne passe pas à la limite en général. Ici la limite vient de l'équation : $\langle Au_n,u_n\rangle=\langle f,u_n\rangle$. — Contre-exemple : Dans $\ell^2$, $e_n\rightharpoonup 0$ et $\langle e_n,e_n\rangle=1\not\to 0$.
- `eq` par « $A$ est continu pour les convergences faibles. » → incorrect [nonlinearite-limite-faible] : Cette justification est fausse : la monotonie et l’hémicontinuité remplacent une continuité faible qui n’existe pas. — Contre-exemple : $A(u)=u^3$ sur $L^4(]0,1[)$ et $u_n=1+\sin(2\pi nx)$.

Retraits :
- `h-coer` (nécessaire) : Sans coercivité, ni le zéro de Brouwer ni la borne uniforme ne sont garantis. — Contre-exemple : Sur $V=\mathbb R$, $u\mapsto e^u$ est monotone, continue, bornée sur les bornés, et $e^u=-1$ n'a pas de solution.
- `h-hemi` (nécessaire) : Sans hémicontinuité, le passage $t\downarrow 0$ est impossible. — Contre-exemple : Sur $\mathbb R$, $A(u)=u-1$ si $u<0$ et $A(u)=u+1$ si $u\ge 0$ : monotone, coercif, borné sur les bornés, et $A(u)=0$ n'a pas de solution.
- `h-mono` (nécessaire) : Sans monotonie, l’identification de la limite échoue en dimension infinie. — Contre-exemple : Dans $\ell^2$, $F(x)=\big(\sqrt{1-\|x\|^2},x_1,x_2,\dots\big)$ envoie la boule unité dans elle-même sans point fixe ; avec $r$ la rétraction radiale sur la boule, $A(u)=u-F(r(u))$ est continu, coercif, borné sur les bornés, et ne s'annule jamais.

Solution :
**1. Galerkin.** Sur $V_n\simeq\mathbb R^n$, le champ $c\mapsto(\langle A(\sum c_ke_k)-f,e_j\rangle)_j$ est continu (un opérateur monotone hémicontinu est continu en dimension finie) et son produit scalaire avec $c$ vaut $\langle Au,u\rangle-\langle f,u\rangle>0$ pour $|c|$ grand, par coercivité et équivalence des normes. Brouwer fournit un zéro : $u_n\in V_n$ avec $\langle Au_n,v\rangle=\langle f,v\rangle$ pour $v\in V_n$.

**2. Bornes.** Avec $v=u_n$ : $\langle Au_n,u_n\rangle=\langle f,u_n\rangle\le\|f\|\,\|u_n\|$ ; la coercivité borne $(u_n)$, puis $(Au_n)$ est bornée.

**3. Extraction et $\chi=f$.** $u_n\rightharpoonup u$ et $Au_n\rightharpoonup\chi$ par réflexivité. Pour $n\ge k$, $\langle Au_n,e_k\rangle=\langle f,e_k\rangle$, d'où $\langle\chi,e_k\rangle=\langle f,e_k\rangle$ et $\chi=f$ par densité.

**4. Minty.** $0\le\langle Au_n-Av,u_n-v\rangle=\langle f,u_n\rangle-\langle Au_n,v\rangle-\langle Av,u_n-v\rangle\to\langle f-Av,u-v\rangle$. Avec $v=u-tw$ et $t\downarrow 0$ : $\langle f-Au,w\rangle\ge 0$ pour tout $w$, puis pour $-w$ : $Au=f$. Variante : $\limsup\langle Au_n,u_n-u\rangle=0$ et le lemme de Minty donne $\chi=Au$.

**Point clé.** $\langle Au_n,u_n\rangle$ ne converge pas par « produit de limites faibles » : sa limite vient de l'équation de Galerkin.

Indices :
1. Quel théorème de point fixe résout un problème non linéaire en dimension finie ? Quelle hypothèse donne une borne uniforme ?
2. Après extraction, il y a deux limites, $u$ et $\chi$. L'équation de Galerkin identifie $\chi$ ; il reste à montrer $\chi=Au$.
3. Écris $0\le\langle Au_n-Av,u_n-v\rangle$, remplace $\langle Au_n,u_n\rangle$ par $\langle f,u_n\rangle$, passe à la limite, puis prends $v=u-tw$.

Erreurs fréquentes :
- Affirmer $Au_n\rightharpoonup Au$ à partir de $u_n\rightharpoonup u$.
- Passer à la limite dans $\langle Au_n,u_n\rangle$ comme dans un produit de limites faibles.
- Extraire une sous-suite fortement convergente d’une suite seulement bornée.

Variante : Même cadre, avec de plus $A$ strictement monotone. Montrer l'unicité de la solution de $Au=f$, puis que toute la suite de Galerkin converge faiblement vers elle.

Solution de la variante : Si $Au=Av=f$ avec $u\neq v$, la stricte monotonie donne $0=\langle Au-Av,u-v\rangle>0$, contradiction. Toute sous-suite de $(u_n)$, bornée, a une sous-suite faiblement convergente, dont la limite résout $Au=f$ par l'argument précédent : c'est l'unique solution $u$. Une suite bornée d'un réflexif dont toutes les valeurs d'adhérence faibles valent $u$ converge faiblement vers $u$.

Vérification : {"origin":"polycopie","review":"machine"}