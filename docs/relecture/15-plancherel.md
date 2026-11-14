# 15. Plancherel (`plancherel`) — polycopié p. PDF 17, section 4.1

## Fiche

Espaces : $\mathcal S(\mathbb R^d)$ : fonctions $C^\infty$ dont toutes les dérivées décroissent plus vite que toute puissance. | $\mathcal S'(\mathbb R^d)$ : dual continu de $\mathcal S(\mathbb R^d)$, espace des distributions tempérées. | $L^2(\mathbb R^d)$, muni de son produit scalaire usuel ; $L^2(\mathbb R^d)\subset\mathcal S'(\mathbb R^d)$. | Convention unitaire : $\hat u(\xi)=(2\pi)^{-d/2}\int_{\mathbb R^d}e^{-ix\cdot\xi}u(x)\,dx$, formule valable pour $u\in\mathcal S(\mathbb R^d)$ (plus généralement pour $u\in L^1$).

Hypothèses :
- La transformée est normalisée par le facteur $(2\pi)^{-d/2}$ (convention unitaire du polycopié). — Sans elle : Avec $\mathcal F_0u(\xi)=\int e^{-ix\cdot\xi}u(x)\,dx$, on a $\|\mathcal F_0u\|_{L^2}=(2\pi)^{d/2}\|u\|_{L^2}$ : l'égalité des normes devient fausse.
- La formule intégrale définit $\hat u$ sur $\mathcal S(\mathbb R^d)$ ; sur $L^2(\mathbb R^d)$, $\mathcal F$ est le prolongement par densité ; sur $\mathcal S'(\mathbb R^d)$, elle se définit par dualité. — Sans elle : Pour $u(x)=(1+|x|)^{-3/4}$ sur $\mathbb R$, on a $u\in L^2\setminus L^1$, et l'intégrale définissant $\hat u(0)$ diverge : $\hat u$ ne peut être définie que par prolongement.

Énoncé : La transformée de Fourier se prolonge en un isomorphisme unitaire $\mathcal F:L^2(\mathbb R^d)\to L^2(\mathbb R^d)$ tel que
$$\|\hat u\|_{L^2}=\|u\|_{L^2},\qquad \widehat{\partial_ju}=i\xi_j\,\hat u\quad\text{dans }\mathcal S'.$$

Bilan : {"existence":"Le prolongement de $\\mathcal F$ de $\\mathcal S(\\mathbb R^d)$ à $L^2(\\mathbb R^d)$ existe, par densité de $\\mathcal S$ dans $L^2$.","unicite":"Ce prolongement continu est unique, puisque $\\mathcal S$ est dense dans $L^2$.","stabilite":"$\\|\\hat u\\|_{L^2}=\\|u\\|_{L^2}$ : $\\mathcal F$ est une isométrie bijective de $L^2(\\mathbb R^d)$.","autre":"La dérivation devient la multiplication par $i\\xi_j$, identité entre distributions tempérées."}

Preuve dans le polycopié : idee

Plan :
1. Sur $\mathcal S(\mathbb R^d)$ : $\mathcal F$ est une bijection, d'inverse $\check v(x)=(2\pi)^{-d/2}\int e^{ix\cdot\xi}v(\xi)\,d\xi$ (formule d'inversion).
2. Identité de Parseval sur $\mathcal S$ : $\int\hat u\,\overline{\hat v}=\int u\,\bar v$, d'où $\|\hat u\|_{L^2}=\|u\|_{L^2}$.
3. Densité de $\mathcal S$ dans $L^2$ : $\mathcal F$ se prolonge en une isométrie de $L^2$, surjective car son image contient $\mathcal S$ et est fermée.
4. Dérivation : sur $\mathcal S$ par intégration par parties ; sur $\mathcal S'$ par dualité, avec $\langle\hat T,\varphi\rangle=\langle T,\hat\varphi\rangle$.

Vigilance :
- Les constantes dépendent de la convention : avec la convention unitaire, ni l'isométrie ni la formule $\widehat{\partial_ju}=i\xi_j\hat u$ ne comportent de facteur $2\pi$.
- Pour $u\in L^2$, l'intégrale de définition peut diverger : $\hat u$ est une classe définie par prolongement, presque partout.
- $\widehat{u'}=i\xi\hat u$, alors que $(\hat u)'=-i\,\widehat{xu}$.
- L'identité $\widehat{\partial_ju}=i\xi_j\hat u$ vit dans $\mathcal S'$ : pour $u\in L^2$, $\xi_j\hat u$ n'est pas dans $L^2$ en général.
- L'unicité des solutions d'une équation à coefficients constants dépend de l'espace : $e^{x_1}$ annule $I-\Delta$ dans $\mathcal D'$.

Vérification : {"origin":"polycopie","review":"machine"}

Définition « Espace de Schwartz » : $\mathcal S(\mathbb R^d)$ est l'espace des fonctions $C^\infty$ dont toutes les dérivées décroissent plus vite que toute puissance de $|x|$.

Définition « Distributions tempérées » : $\mathcal S'(\mathbb R^d)$ est le dual continu de $\mathcal S(\mathbb R^d)$ ; la transformée de Fourier s'y définit par $\langle\hat T,\varphi\rangle=\langle T,\hat\varphi\rangle$.

Définition « Transformée de Fourier unitaire » : Pour $u\in\mathcal S(\mathbb R^d)$ : $\hat u(\xi)=(2\pi)^{-d/2}\int_{\mathbb R^d}e^{-ix\cdot\xi}u(x)\,dx$.

Définition « Espace de Sobolev d’ordre réel » : Pour $s\in\mathbb R$ : $H^s(\mathbb R^d)=\{u\in\mathcal S'(\mathbb R^d) : (1+|\xi|^2)^{s/2}\hat u\in L^2(\mathbb R^d)\}$, de norme $\|u\|_{H^s}=\|(1+|\xi|^2)^{s/2}\hat u\|_{L^2}$ ; c'est un espace de Hilbert, isométrique à $L^2(\mathbb R^d)$.

Définition « Critère pour la distribution de Dirac » : $\hat\delta_0=(2\pi)^{-d/2}$, donc $\delta_0\in H^s(\mathbb R^d)$ si et seulement si $\int_{\mathbb R^d}(1+|\xi|^2)^s\,d\xi<+\infty$, c'est-à-dire $s<-d/2$.

## Contre-exemple `ce-plancherel-l2-sans-derivee` : $u\in L^2$ ne donne pas $\xi\hat u\in L^2$
Assertion : Pour tout $u\in L^2(\mathbb R)$, on a $\xi\hat u\in L^2(\mathbb R)$ et $\|u'\|_{L^2}=\|\xi\hat u\|_{L^2}$.
Tâche : Pour $w=\mathbb 1_{]0,1[}$, on a $2\pi|\xi\hat w(\xi)|^2=|1-e^{-i\xi}|^2$. Donne la valeur de cette quantité en $\xi=\pi$ : elle est $2\pi$-périodique et non nulle, donc non intégrable sur $\mathbb R$.
Vérification : {"kind":"rational","prompt":"Valeur de $|1-e^{-i\\pi}|^2$","expected":"4"}
Explication : $\hat w(\xi)=(2\pi)^{-1/2}\int_0^1e^{-ix\xi}\,dx=(2\pi)^{-1/2}\frac{1-e^{-i\xi}}{i\xi}$, donc $2\pi|\xi\hat w(\xi)|^2=2-2\cos\xi$, qui vaut $4$ en $\xi=\pi$. Une fonction périodique non nulle n'est pas intégrable sur $\mathbb R$ : $\xi\hat w\notin L^2$. De fait $w'=\delta_0-\delta_1\notin L^2$.

## Contre-exemple `ce-plancherel-unicite-dprime` : Unicité hors de $\mathcal S'$
Assertion : Si $(I-\Delta)v=0$ dans $\mathcal D'(\mathbb R^d)$, alors $v=0$.
Tâche : Cherche $v(x)=e^{ax_1}$ avec $a>0$ solution de $(I-\Delta)v=0$ : donne $a$.
Vérification : {"kind":"rational","prompt":"Valeur de $a$","expected":"1"}
Explication : $\Delta e^{ax_1}=a^2e^{ax_1}$, donc $(I-\Delta)e^{ax_1}=(1-a^2)e^{ax_1}$, nul pour $a=1$. La fonction $e^{x_1}$ n'est pas une distribution tempérée : elle échappe à l'argument de Fourier, qui ne prouve l'unicité que dans $\mathcal S'$.

## Contre-exemple `ce-plancherel-normalisation` : Isométrie et normalisation
Assertion : Avec $\mathcal F_0u(\xi)=\int_{\mathbb R}e^{-ix\xi}u(x)\,dx$, on a $\|\mathcal F_0u\|_{L^2}=\|u\|_{L^2}$.
Tâche : Calcule le quotient $\|\mathcal F_0u\|^2_{L^2}/\big(\pi\,\|u\|^2_{L^2}\big)$ pour $u\in\mathcal S(\mathbb R)$ non nulle.
Vérification : {"kind":"rational","prompt":"Valeur du quotient","expected":"2"}
Explication : $\mathcal F_0u=(2\pi)^{1/2}\hat u$, donc $\|\mathcal F_0u\|^2_{L^2}=2\pi\|\hat u\|^2_{L^2}=2\pi\|u\|^2_{L^2}$ par Plancherel ; le quotient vaut $2$.

## Exercice facile `plancherel.facile` : Transformée de Fourier d'une dérivée sur $\mathcal S(\mathbb R)$

Énoncé : Soit $u\in\mathcal S(\mathbb R)$. Avec la convention unitaire du polycopié, $\hat v(\xi)=(2\pi)^{-1/2}\int_{\mathbb R}e^{-ix\xi}v(x)\,dx$, calculer $\widehat{u'}$ en fonction de $\hat u$ en justifiant chaque étape. Il s'agit de la transformée de la dérivée $u'$, et non de la dérivée de $\hat u$.
Source : {"doc":"polycopie","pdfPage":40,"label":"Exercice 15, facile ; énoncé de Plancherel, section 4.1 (p. PDF 17)"} — prérequis : —

But : `fin` — usage : demonstration

Nœuds :
- `h-u` (hypothese) : $u\in\mathcal S(\mathbb R)$.
- `d-fourier` (definition) : Pour $v\in\mathcal S(\mathbb R)$ et $\xi\in\mathbb R$ : $\hat v(\xi)=(2\pi)^{-1/2}\int_{\mathbb R}e^{-ix\xi}v(x)\,dx$.
- `d-xi` (definition, locale) : Soient $\xi\in\mathbb R$ fixé et $R>0$.
- `s-schwartz` (consequence) : $u'\in\mathcal S(\mathbb R)$ ; en particulier $u$ et $u'$ sont intégrables sur $\mathbb R$, et $\widehat{u'}$ est donnée par l'intégrale.
- `s-bord` (consequence) : $u(x)\to 0$ lorsque $|x|\to+\infty$.
- `ipp` (egalite) : $\displaystyle\int_{-R}^{R}e^{-ix\xi}u'(x)\,dx=e^{-iR\xi}u(R)-e^{iR\xi}u(-R)+i\xi\int_{-R}^{R}e^{-ix\xi}u(x)\,dx$.
- `lim` (egalite) : $\displaystyle\int_{\mathbb R}e^{-ix\xi}u'(x)\,dx=i\xi\int_{\mathbb R}e^{-ix\xi}u(x)\,dx$.
- `res` (egalite, calcul expr-equiv) : $\widehat{u'}(\xi)=i\xi\,\hat u(\xi)$.
  - valeur attendue : "i*xi"
- `fin` (conclusion) : Pour tout $\xi\in\mathbb R$ : $\widehat{u'}(\xi)=i\xi\,\hat u(\xi)$. C'est une identité ponctuelle entre fonctions de $\mathcal S(\mathbb R)$, sans facteur $2\pi$.
- `x-signe` (egalite, DISTRACTEUR) : $\widehat{u'}(\xi)=-i\xi\,\hat u(\xi)$.
- `x-2pi` (egalite, DISTRACTEUR) : $\widehat{u'}(\xi)=2\pi i\xi\,\hat u(\xi)$.
- `x-derive` (egalite, DISTRACTEUR) : $(\hat u)'(\xi)=i\xi\,\hat u(\xi)$.

Règles :
- `h-u` ⟹ `s-schwartz` par « $\mathcal S(\mathbb R)$ est stable par dérivation, et toute $v\in\mathcal S(\mathbb R)$ vérifie $|v(x)|\le C(1+x^2)^{-1}$, donc est intégrable. »
- `h-u` ⟹ `s-bord` par « Décroissance rapide : $\sup_{x\in\mathbb R}(1+|x|)\,|u(x)|<+\infty$. »
- `h-u` + `d-xi` ⟹ `ipp` par « Intégration par parties sur $[-R,R]$, avec $\partial_x\big(e^{-ix\xi}\big)=-i\xi\,e^{-ix\xi}$. »
- `ipp` + `s-bord` + `s-schwartz` ⟹ `lim` par « Limite $R\to+\infty$ : les termes de bord sont de module $|u(\pm R)|$, et les intégrales sur $[-R,R]$ convergent par intégrabilité. »
- `lim` + `d-fourier` + `s-schwartz` ⟹ `res` par « Multiplication par $(2\pi)^{-1/2}$, puis définition de la transformée de $u'$ et de celle de $u$. »
- `res` + `d-xi` ⟹ `fin` par « Le réel $\xi$ ayant été choisi arbitrairement, l'identité vaut pour tout $\xi\in\mathbb R$. »

Justifications sans règle (séduisantes ou fausses) : « Les termes de bord sont nuls parce que $u$ est bornée. » ; « La dérivation de l'exponentielle fait apparaître un facteur $2\pi$. » ; « C’est la formule du cours. » ; « Théorème de Plancherel. »

Pièges :
- `lim` par « Les termes de bord sont nuls parce que $u$ est bornée. » → incorrect [plancherel-cadre-identite] : Être bornée ne force pas $u(x)\to 0$ à l'infini : les termes de bord ne disparaissent que grâce à la décroissance de $u$. — Contre-exemple : $u\equiv 1$ est $C^\infty$ et bornée ; le terme de bord vaut $e^{-iR\xi}-e^{iR\xi}=-2i\sin(R\xi)$, sans limite quand $R\to+\infty$ si $\xi\neq 0$.
- `res` par « La dérivation de l'exponentielle fait apparaître un facteur $2\pi$. » → incorrect [plancherel-convention] : La dérivée de $x\mapsto e^{-ix\xi}$ est $-i\xi e^{-ix\xi}$ : aucun facteur $2\pi$ n'apparaît. Un tel facteur n'existe qu'avec la convention $\int e^{-2i\pi x\xi}v(x)\,dx$.
- `res` par « C’est la formule du cours. » → a-justifier [justification-absente] : La formule se démontre ici : d'où vient le facteur $i\xi$, et pourquoi les termes de bord disparaissent-ils ?
- `x-signe` → incorrect [plancherel-convention] : Le signe provient de l'intégration par parties : le signe moins de la formule se combine avec celui de $\partial_x e^{-ix\xi}=-i\xi e^{-ix\xi}$, d'où $+i\xi$. — Contre-exemple : Pour $u(x)=e^{-x^2/2}$ : $\hat u(\xi)=e^{-\xi^2/2}$ et $u'(x)=-xe^{-x^2/2}$, dont la transformée est $i\xi e^{-\xi^2/2}$ ; en $\xi=1$, on obtient $ie^{-1/2}\neq -ie^{-1/2}$.
- `x-2pi` → incorrect [plancherel-convention] : Avec la convention unitaire du polycopié, la dérivation devient la multiplication par $i\xi$, sans facteur $2\pi$ ; le multiplicateur $2\pi i\xi$ correspond à la convention $\int e^{-2i\pi x\xi}v(x)\,dx$. — Contre-exemple : Pour $u(x)=e^{-x^2/2}$ : $\widehat{u'}(1)=ie^{-1/2}$, et non $2\pi ie^{-1/2}$.
- `x-derive` → incorrect [plancherel-derivee-transformee] : $(\hat u)'$ n'est pas $\widehat{u'}$ : dériver $\hat u$ fait descendre $-ix$ sous l'intégrale, et $(\hat u)'=-i\,\widehat{xu}$. — Contre-exemple : Pour $u(x)=e^{-x^2/2}$ : $(\hat u)'(\xi)=-\xi e^{-\xi^2/2}$, réel, alors que $i\xi\hat u(\xi)=i\xi e^{-\xi^2/2}$ est imaginaire pur ; ils diffèrent dès que $\xi\neq 0$.

Retraits :
- `h-u` (nécessaire) : Sans intégrabilité ni décroissance, ni $\hat u$ ni $\widehat{u'}$ ne sont données par l'intégrale, et les termes de bord ne disparaissent pas. — Contre-exemple : $u\equiv 1$ est $C^\infty$ et bornée, mais n'est pas intégrable sur $\mathbb R$ : l'intégrale définissant $\hat u(0)$ diverge.
- `s-bord` (nécessaire) : Le passage à la limite $R\to+\infty$ exige $u(\pm R)\to 0$. — Contre-exemple : Pour $u\equiv 1$, le terme de bord $-2i\sin(R\xi)$ n'a pas de limite lorsque $\xi\neq 0$.

Calculs fermés : [{"kind":"expr-equiv","prompt":"En itérant le calcul : multiplicateur $m(\\xi)$ tel que $\\widehat{u''}(\\xi)=m(\\xi)\\,\\hat u(\\xi)$, en fonction de xi.","expected":"-xi^2","vars":["xi"]}]

Solution :
**Cadre.** Soit $u\in\mathcal S(\mathbb R)$. Alors $u'\in\mathcal S(\mathbb R)$ : $u$ et $u'$ sont intégrables, leurs transformées sont données par l'intégrale, et $u(x)\to 0$ quand $|x|\to+\infty$.

**Intégration par parties.** Pour $\xi\in\mathbb R$ et $R>0$, comme $\partial_x e^{-ix\xi}=-i\xi e^{-ix\xi}$ :
$$\int_{-R}^{R}e^{-ix\xi}u'(x)\,dx=e^{-iR\xi}u(R)-e^{iR\xi}u(-R)+i\xi\int_{-R}^{R}e^{-ix\xi}u(x)\,dx.$$

**Limite.** Les termes de bord sont de module $|u(\pm R)|\to 0$, et les intégrales convergent par intégrabilité. En multipliant par $(2\pi)^{-1/2}$ :
$$\widehat{u'}(\xi)=i\xi\,\hat u(\xi)\qquad\text{pour tout }\xi\in\mathbb R.$$

**Points de vigilance.** Aucun facteur $2\pi$ n'apparaît avec la convention unitaire. L'identité ne porte pas sur $(\hat u)'$, qui vaut $-i\,\widehat{xu}$. En itérant, $\widehat{u''}=(i\xi)^2\hat u=-\xi^2\hat u$. Pour $u\in L^2$ seulement, la même formule n'a de sens que dans $\mathcal S'$ : c'est l'objet de l'exercice suivant.

Indices :
1. Dans quel espace vit $u'$, et l'intégrale qui définit $\widehat{u'}$ a-t-elle un sens ?
2. Écris l'intégrale sur $[-R,R]$, intègre par parties en dérivant l'exponentielle, puis fais tendre $R$ vers l'infini.
3. $\partial_x e^{-ix\xi}=-i\xi e^{-ix\xi}$ : le signe moins de l'intégration par parties et celui de la phase se compensent. Les termes de bord sont majorés par $|u(\pm R)|$.

Erreurs fréquentes :
- Obtenir $-i\xi$ au lieu de $+i\xi$ en oubliant l'un des deux signes de l'intégration par parties.
- Importer un facteur $2\pi$ d'une autre convention de Fourier.
- Confondre $\widehat{u'}$ et $(\hat u)'$.
- Annuler les termes de bord en invoquant seulement le caractère borné de $u$.

Variante : Soit $u\in\mathcal S(\mathbb R)$. Montrer que $\hat u$ est dérivable sur $\mathbb R$ et que $\widehat{xu}=i\,(\hat u)'$, où $xu$ désigne la fonction $x\mapsto xu(x)$.

Solution de la variante : Pour $x$ fixé, $\xi\mapsto e^{-ix\xi}u(x)$ est dérivable, de dérivée $-ix\,e^{-ix\xi}u(x)$, de module $|x\,u(x)|$ indépendant de $\xi$ et intégrable, car $xu\in\mathcal S(\mathbb R)$. Le théorème de dérivation sous l'intégrale (convergence dominée) donne
$$(\hat u)'(\xi)=(2\pi)^{-1/2}\int_{\mathbb R}(-ix)\,e^{-ix\xi}u(x)\,dx=-i\,\widehat{xu}(\xi),$$
d'où $\widehat{xu}=i(\hat u)'$, puisque $i\cdot(-i)=1$. Sans domination, la conclusion peut tomber : pour $u(x)=(1+x^2)^{-1}$, intégrable mais avec $xu\notin L^1$, on a $\hat u(\xi)=\sqrt{\pi/2}\,e^{-|\xi|}$, non dérivable en $0$.

Graphe de la variante :
But : `fin` — usage : demonstration

Nœuds :
- `h-u` (hypothese) : $u\in\mathcal S(\mathbb R)$.
- `d-fourier` (definition) : Pour $v\in\mathcal S(\mathbb R)$ : $\hat v(\xi)=(2\pi)^{-1/2}\int_{\mathbb R}e^{-ix\xi}v(x)\,dx$.
- `s-xu` (consequence) : $xu\in\mathcal S(\mathbb R)$ ; en particulier $x\mapsto x\,u(x)$ est intégrable.
- `s-dom` (egalite) : Pour tous $x,\xi\in\mathbb R$ : $\big|\partial_\xi\big(e^{-ix\xi}u(x)\big)\big|=|x\,u(x)|$.
- `s-der` (egalite) : $\hat u$ est dérivable et $(\hat u)'(\xi)=(2\pi)^{-1/2}\int_{\mathbb R}(-ix)\,e^{-ix\xi}u(x)\,dx$.
- `res` (egalite) : $(\hat u)'(\xi)=-i\,\widehat{xu}(\xi)$ pour tout $\xi\in\mathbb R$.
- `fin` (conclusion) : $\widehat{xu}=i\,(\hat u)'$ sur $\mathbb R$.
- `x-signe` (egalite, DISTRACTEUR) : $\widehat{xu}=-i\,(\hat u)'$ sur $\mathbb R$.
- `x-pareil` (egalite, DISTRACTEUR) : $(\hat u)'(\xi)=i\xi\,\hat u(\xi)$.

Règles :
- `h-u` ⟹ `s-xu` par « $\mathcal S(\mathbb R)$ est stable par multiplication par $x$, et ses éléments sont intégrables. »
- `h-u` ⟹ `s-dom` par « $\partial_\xi e^{-ix\xi}=-ix\,e^{-ix\xi}$ et $|e^{-ix\xi}|=1$. »
- `d-fourier` + `s-xu` + `s-dom` ⟹ `s-der` par « Dérivation sous l’intégrale : majoration de la dérivée par une fonction intégrable indépendante du paramètre. [convergence-dominee] »
- `s-der` + `d-fourier` ⟹ `res` par « On reconnaît la transformée de $xu$, multipliée par $-i$. »
- `res` ⟹ `fin` par « Multiplication par $i$, avec $i\cdot(-i)=1$. »

Justifications sans règle (séduisantes ou fausses) : « On dérive sous l’intégrale sans autre vérification. »

Pièges :
- `s-der` par « On dérive sous l’intégrale sans autre vérification. » → incorrect [hypotheses-theoreme] : La dérivation sous l’intégrale exige une domination intégrable de la dérivée, uniforme en le paramètre. — Contre-exemple : $u(x)=(1+x^2)^{-1}$ est intégrable, mais $xu\notin L^1(\mathbb R)$ et $\hat u(\xi)=\sqrt{\pi/2}\,e^{-|\xi|}$ n'est pas dérivable en $0$.
- `x-signe` → incorrect [plancherel-convention] : De $(\hat u)'=-i\,\widehat{xu}$, on tire $\widehat{xu}=i\,(\hat u)'$ en multipliant par $i$, car $i\cdot(-i)=1$. — Contre-exemple : Pour $u(x)=e^{-x^2/2}$ : $\widehat{xu}(\xi)=-i\xi e^{-\xi^2/2}=i\,(\hat u)'(\xi)$.
- `x-pareil` → incorrect [plancherel-derivee-transformee] : La multiplication par $i\xi$ correspond à la dérivation de $u$, pas à celle de $\hat u$. — Contre-exemple : Pour $u(x)=e^{-x^2/2}$ : $(\hat u)'(\xi)=-\xi e^{-\xi^2/2}\neq i\xi e^{-\xi^2/2}$ pour $\xi\neq 0$.

Retraits :
- `s-dom` (nécessaire) : Sans domination intégrable, la dérivation sous l’intégrale n’est plus justifiée, et la conclusion peut être fausse. — Contre-exemple : $u(x)=(1+x^2)^{-1}$ : $\hat u(\xi)=\sqrt{\pi/2}\,e^{-|\xi|}$ n'est pas dérivable en $0$.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `plancherel.intermediaire` : $\|u'\|_{L^2}=\|\xi\hat u\|_{L^2}$ : les bonnes hypothèses

Énoncé : Soit $u\in L^2(\mathbb R)$, vue comme distribution tempérée, et soit $u'$ sa dérivée au sens de $\mathcal S'(\mathbb R)$. Montrer que $u'\in L^2(\mathbb R)$ si et seulement si $\xi\hat u\in L^2(\mathbb R)$, et que dans ce cas $\|u'\|_{L^2}=\|\xi\hat u\|_{L^2}$. Montrer par un exemple que l'hypothèse $u\in L^2(\mathbb R)$ seule ne suffit pas.
Source : {"doc":"polycopie","pdfPage":40,"label":"Exercice 15, intermédiaire ; énoncé de Plancherel, section 4.1 (p. PDF 17)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-u` (hypothese) : $u\in L^2(\mathbb R)$, vue comme élément de $\mathcal S'(\mathbb R)$ ; $u'$ désigne sa dérivée dans $\mathcal S'(\mathbb R)$.
- `t-iso` (application-theoreme) : $\mathcal F$ est un isomorphisme unitaire de $L^2(\mathbb R)$ : $\|\hat v\|_{L^2}=\|v\|_{L^2}$ pour tout $v\in L^2(\mathbb R)$.
- `t-der` (application-theoreme) : $\widehat{u'}=i\xi\,\hat u$ dans $\mathcal S'(\mathbb R)$.
- `t-inj` (consequence) : $\mathcal F$ est injective sur $\mathcal S'(\mathbb R)$ et coïncide sur $L^2(\mathbb R)$ avec le prolongement unitaire.
- `s-fct` (consequence) : $\hat u\in L^2(\mathbb R)$ ; la fonction $\xi\mapsto i\xi\,\hat u(\xi)$ est localement intégrable et représente la distribution tempérée $i\xi\hat u$.
- `d-cn` (definition, locale) : Supposons $u'\in L^2(\mathbb R)$.
- `cn-planch` (egalite) : $\widehat{u'}\in L^2(\mathbb R)$ et $\|\widehat{u'}\|_{L^2}=\|u'\|_{L^2}$.
- `cn-pp` (egalite) : $\widehat{u'}(\xi)=i\xi\,\hat u(\xi)$ pour presque tout $\xi\in\mathbb R$.
- `cn-fin` (egalite) : $\xi\hat u\in L^2(\mathbb R)$ et $\|\xi\hat u\|_{L^2}=\|u'\|_{L^2}$.
- `d-cs` (definition, locale) : Supposons $\xi\hat u\in L^2(\mathbb R)$.
- `cs-v` (consequence) : $v:=\mathcal F^{-1}(i\xi\hat u)$ est un élément bien défini de $L^2(\mathbb R)$, avec $\hat v=i\xi\hat u$ et $\|v\|_{L^2}=\|\xi\hat u\|_{L^2}$.
- `cs-eq` (egalite) : $\hat v=\widehat{u'}$ dans $\mathcal S'(\mathbb R)$.
- `cs-inj` (egalite) : $u'=v$ dans $\mathcal S'(\mathbb R)$ ; donc $u'\in L^2(\mathbb R)$.
- `cs-fin` (egalite) : $u'\in L^2(\mathbb R)$ et $\|u'\|_{L^2}=\|\xi\hat u\|_{L^2}$.
- `c-ex` (consequence, calcul rational) : Pour $w=\mathbb 1_{]0,1[}\in L^2(\mathbb R)$ : $2\pi\,|\xi\hat w(\xi)|^2=|1-e^{-i\xi}|^2=2-2\cos\xi$, fonction $2\pi$-périodique non nulle ; donc $\xi\hat w\notin L^2(\mathbb R)$, et $w'=\delta_0-\delta_1\notin L^2(\mathbb R)$.
  - valeur attendue : "4"
- `fin` (conclusion) : Pour $u\in L^2(\mathbb R)$ : $u'\in L^2(\mathbb R)\iff\xi\hat u\in L^2(\mathbb R)$, et alors $\|u'\|_{L^2}=\|\xi\hat u\|_{L^2}$. L'hypothèse $u\in L^2(\mathbb R)$ seule ne suffit pas.
- `x-sansH` (consequence, DISTRACTEUR) : Pour tout $u\in L^2(\mathbb R)$ : $\xi\hat u\in L^2(\mathbb R)$ et $\|u'\|_{L^2}=\|\xi\hat u\|_{L^2}$.
- `x-chapeau` (egalite, DISTRACTEUR) : $\|u'\|_{L^2}=\|(\hat u)'\|_{L^2}$ dès que les deux membres sont finis.
- `x-2pi` (egalite, DISTRACTEUR) : $\|u'\|_{L^2}=2\pi\,\|\xi\hat u\|_{L^2}$.

Règles :
- ∅ ⟹ `t-iso` par « Théorème de Plancherel. [plancherel] »
- `h-u` ⟹ `t-der` par « Théorème de Plancherel. [plancherel] »
- `t-iso` ⟹ `t-inj` par « Inversion de Fourier sur $\mathcal S(\mathbb R)$, transportée à $\mathcal S'(\mathbb R)$ par dualité ; les deux définitions coïncident sur $L^2$ par densité de $\mathcal S$. »
- `h-u` + `t-iso` ⟹ `s-fct` par « $\hat u\in L^2$ par Plancherel, et $\xi\hat u$ est de carré intégrable sur tout compact. »
- `d-cn` + `t-iso` ⟹ `cn-planch` par « Unitarité de $\mathcal F$, appliquée à $u'\in L^2(\mathbb R)$. »
- `cn-planch` + `t-der` + `s-fct` ⟹ `cn-pp` par « Deux fonctions localement intégrables égales dans $\mathcal S'(\mathbb R)$ coïncident presque partout. »
- `cn-planch` + `cn-pp` ⟹ `cn-fin` par « $|i|=1$ : $\|\xi\hat u\|_{L^2}=\|\widehat{u'}\|_{L^2}$. »
- `d-cs` + `t-iso` ⟹ `cs-v` par « Surjectivité et unitarité de $\mathcal F$ sur $L^2(\mathbb R)$, appliquées à $i\xi\hat u\in L^2$. »
- `cs-v` + `t-der` ⟹ `cs-eq` par « Comparaison de $\hat v=i\xi\hat u$ avec l'identité $\widehat{u'}=i\xi\hat u$. »
- `cs-eq` + `t-inj` ⟹ `cs-inj` par « Injectivité de $\mathcal F$ sur $\mathcal S'(\mathbb R)$. »
- `cs-inj` + `cs-v` ⟹ `cs-fin` par « Report de $u'=v$ dans l'égalité des normes. »
- ∅ ⟹ `c-ex` par « Calcul explicite : $\hat w(\xi)=(2\pi)^{-1/2}\int_0^1e^{-ix\xi}\,dx$, et dérivée de $w$ testée contre $\varphi\in\mathcal S(\mathbb R)$. »
- `cn-fin` + `cs-fin` + `c-ex` ⟹ `fin` par « Réunion des deux implications et de l’exemple. »

Justifications sans règle (séduisantes ou fausses) : « $\mathcal F$ est injective sur $L^2(\mathbb R)$. » ; « L'égalité $\widehat{u'}=i\xi\hat u$ vaut en tout point, puisque $u\in L^2(\mathbb R)$. »

Pièges :
- `cs-inj` par « $\mathcal F$ est injective sur $L^2(\mathbb R)$. » → incorrect [plancherel-cadre-identite] : À ce stade, $u'$ n'est qu'une distribution tempérée : l'injectivité de $\mathcal F$ sur $L^2$ ne s'applique pas à elle, puisque $u'\in L^2$ est précisément ce qu'on cherche à établir. C'est l'injectivité sur $\mathcal S'$ qui conclut.
- `cn-pp` par « L'égalité $\widehat{u'}=i\xi\hat u$ vaut en tout point, puisque $u\in L^2(\mathbb R)$. » → incorrect [plancherel-cadre-identite] : Pour $u\in L^2$, $\hat u$ n'est définie que presque partout, et l'identité $\widehat{u'}=i\xi\hat u$ vit dans $\mathcal S'$ : on n'en tire qu'une égalité presque partout, après avoir vérifié que les deux membres sont des fonctions localement intégrables.
- `x-sansH` → incorrect [hypotheses-theoreme] : L'unitarité porte sur $u$, pas sur $u'$ : sans l'hypothèse $u'\in L^2$, la distribution $\widehat{u'}=i\xi\hat u$ peut ne pas être de carré intégrable. — Contre-exemple : $w=\mathbb 1_{]0,1[}$ : $|\xi\hat w(\xi)|^2=\frac{2-2\cos\xi}{2\pi}$ n'est pas intégrable sur $\mathbb R$, et $w'=\delta_0-\delta_1$.
- `x-chapeau` → incorrect [plancherel-derivee-transformee] : $(\hat u)'=-i\,\widehat{xu}$, donc $\|(\hat u)'\|_{L^2}=\|xu\|_{L^2}$ : la dérivée de $\hat u$ mesure la multiplication par $x$, non la dérivation. — Contre-exemple : $u(x)=e^{-x^2}$ : $u'=-2xu$, donc $\|u'\|_{L^2}=2\|xu\|_{L^2}=2\|(\hat u)'\|_{L^2}\neq\|(\hat u)'\|_{L^2}$.
- `x-2pi` → incorrect [plancherel-convention] : Avec la convention unitaire, $\mathcal F$ est une isométrie de $L^2$ et $\widehat{u'}=i\xi\hat u$ : aucune constante n'apparaît. — Contre-exemple : $u(x)=e^{-x^2/2}$ : $\|u'\|^2_{L^2}=\int_{\mathbb R} x^2e^{-x^2}dx=\frac{\sqrt\pi}{2}=\int_{\mathbb R}\xi^2e^{-\xi^2}d\xi=\|\xi\hat u\|^2_{L^2}$.

Retraits :
- `d-cn` (nécessaire) : Sans elle, $\widehat{u'}$ n'est qu'une distribution tempérée et l'unitarité de $\mathcal F$ ne s'applique pas : le sens direct tombe. — Contre-exemple : $w=\mathbb 1_{]0,1[}\in L^2(\mathbb R)$ : $w'=\delta_0-\delta_1\notin L^2(\mathbb R)$ et $\xi\hat w\notin L^2(\mathbb R)$.

Calculs fermés : [{"kind":"rational","prompt":"Pour $u(x)=e^{-x^2/2}$, valeur exacte de $\\|u'\\|^2_{L^2}/\\|u\\|^2_{L^2}$.","expected":"1/2"}]

Solution :
**Deux outils de Plancherel.** $\mathcal F$ est unitaire sur $L^2(\mathbb R)$, et $\widehat{u'}=i\xi\hat u$ dans $\mathcal S'(\mathbb R)$. Comme $\hat u\in L^2$, la fonction $i\xi\hat u$ est localement intégrable : c'est elle qui représente la distribution $i\xi\hat u$. Enfin $\mathcal F$ est injective sur $\mathcal S'$ (inversion sur $\mathcal S$, transportée par dualité).

**Sens direct.** Si $u'\in L^2$, alors $\widehat{u'}\in L^2$ et $\|\widehat{u'}\|_{L^2}=\|u'\|_{L^2}$. Les deux fonctions localement intégrables $\widehat{u'}$ et $i\xi\hat u$ sont égales dans $\mathcal S'$, donc presque partout. Ainsi $\xi\hat u\in L^2$ et $\|\xi\hat u\|_{L^2}=\|u'\|_{L^2}$.

**Réciproque.** Si $\xi\hat u\in L^2$, on pose $v=\mathcal F^{-1}(i\xi\hat u)\in L^2$. Alors $\hat v=i\xi\hat u=\widehat{u'}$ dans $\mathcal S'$, et l'injectivité de $\mathcal F$ sur $\mathcal S'$ donne $u'=v\in L^2$, avec $\|u'\|_{L^2}=\|v\|_{L^2}=\|\xi\hat u\|_{L^2}$. L'injectivité sur $L^2$ ne suffirait pas : on ne sait pas encore que $u'\in L^2$.

**L'hypothèse $u\in L^2$ ne suffit pas.** Pour $w=\mathbb 1_{]0,1[}$ : $\hat w(\xi)=(2\pi)^{-1/2}\frac{1-e^{-i\xi}}{i\xi}$, donc $2\pi|\xi\hat w(\xi)|^2=2-2\cos\xi$, fonction périodique non nulle, non intégrable sur $\mathbb R$. De même $w'=\delta_0-\delta_1\notin L^2$.

**Exemple.** Pour $u=e^{-x^2/2}$ : $\|u'\|^2_{L^2}=\frac{\sqrt\pi}{2}$ et $\|u\|^2_{L^2}=\sqrt\pi$, de rapport $\frac12$, en accord avec $\|\xi\hat u\|^2_{L^2}=\int\xi^2e^{-\xi^2}d\xi$.

Indices :
1. Quelles sont les « bonnes hypothèses » : sur quel espace l'isométrie de Plancherel s'applique-t-elle, et à quel objet veux-tu l'appliquer ?
2. Traite séparément les deux implications. Dans le sens réciproque, fabrique un candidat dans $L^2$ à partir de $i\xi\hat u$.
3. Réciproque : $v=\mathcal F^{-1}(i\xi\hat u)$ vérifie $\hat v=\widehat{u'}$ dans $\mathcal S'$, et $\mathcal F$ est injective sur $\mathcal S'$. Pour l'exemple, calcule la transformée de $\mathbb 1_{]0,1[}$.

Erreurs fréquentes :
- Écrire $\|u'\|_{L^2}=\|\xi\hat u\|_{L^2}$ pour tout $u\in L^2$, sans hypothèse sur $u'$.
- Invoquer l'injectivité de $\mathcal F$ sur $L^2$ pour un objet dont on ignore encore s'il est dans $L^2$.
- Remplacer $\xi\hat u$ par $(\hat u)'$.

Variante : Soit $u\in L^2(\mathbb R^d)$. Montrer que $\nabla u\in L^2(\mathbb R^d)^d$ si et seulement si $|\xi|\hat u\in L^2(\mathbb R^d)$, et qu'alors $\|\nabla u\|^2_{L^2}=\int_{\mathbb R^d}|\xi|^2|\hat u(\xi)|^2\,d\xi$.

Solution de la variante : Pour chaque $j$, $\widehat{\partial_ju}=i\xi_j\hat u$ dans $\mathcal S'(\mathbb R^d)$. Le raisonnement de l'exercice, appliqué à chaque $\partial_ju$, montre que $\partial_ju\in L^2$ si et seulement si $\xi_j\hat u\in L^2$, avec $\|\partial_ju\|_{L^2}=\|\xi_j\hat u\|_{L^2}$. Comme $|\xi|^2=\sum_j\xi_j^2$, on a $|\xi|\hat u\in L^2$ si et seulement si chaque $\xi_j\hat u\in L^2$, et en sommant : $\|\nabla u\|^2_{L^2}=\sum_j\|\xi_j\hat u\|^2_{L^2}=\int|\xi|^2|\hat u|^2\,d\xi$.

Vérification : {"origin":"complement","review":"machine"}

## Exercice difficile `plancherel.difficile` : Résoudre $(I-\Delta)u=f$ et caractériser $H^2(\mathbb R^d)$

Énoncé : Soit $f\in L^2(\mathbb R^d)$. Montrer que l'équation $(I-\Delta)u=f$ admet une unique solution $u\in\mathcal S'(\mathbb R^d)$, donnée par $\hat u=(1+|\xi|^2)^{-1}\hat f$, que $u\in H^2(\mathbb R^d)$ et que $\|u\|_{H^2}=\|f\|_{L^2}$, où $\|v\|_{H^2}=\|(1+|\xi|^2)\hat v\|_{L^2}$. En déduire que, pour $v\in\mathcal S'(\mathbb R^d)$, on a $v\in H^2(\mathbb R^d)$ si et seulement si $(I-\Delta)v\in L^2(\mathbb R^d)$.
Source : {"doc":"polycopie","pdfPage":40,"label":"Exercice 15, difficile ; sections 4.1 et 4.2 (p. PDF 17)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-f` (hypothese) : $f\in L^2(\mathbb R^d)$.
- `d-Hs` (definition) : $H^2(\mathbb R^d)=\{v\in\mathcal S'(\mathbb R^d) : (1+|\xi|^2)\hat v\in L^2(\mathbb R^d)\}$, normé par $\|v\|_{H^2}=\|(1+|\xi|^2)\hat v\|_{L^2}$.
- `d-m` (definition) : $m(\xi)=(1+|\xi|^2)^{-1}$ pour $\xi\in\mathbb R^d$.
- `t-iso` (application-theoreme) : $\mathcal F$ est un isomorphisme unitaire de $L^2(\mathbb R^d)$.
- `t-der` (application-theoreme) : Pour $v\in\mathcal S'(\mathbb R^d)$ et $1\le j\le d$ : $\widehat{\partial_jv}=i\xi_j\hat v$ dans $\mathcal S'(\mathbb R^d)$.
- `t-Sp` (consequence) : $\mathcal F$ est une bijection de $\mathcal S'(\mathbb R^d)$ sur lui-même ; pour $v\in\mathcal S'$, on a $v\in L^2\iff\hat v\in L^2$, et alors $\|\hat v\|_{L^2}=\|v\|_{L^2}$.
- `e-sym` (egalite, calcul expr-equiv) : Pour $v\in\mathcal S'(\mathbb R^d)$ : $\widehat{(I-\Delta)v}=(1+|\xi|^2)\,\hat v$ dans $\mathcal S'(\mathbb R^d)$.
  - valeur attendue : "1+r^2"
- `s-mult` (consequence) : $m$ est $C^\infty$, bornée ainsi que toutes ses dérivées : la multiplication par $m$ opère sur $\mathcal S'(\mathbb R^d)$, et c'est l'inverse de la multiplication par $1+|\xi|^2$.
- `eq1` (consequence) : Pour $v\in\mathcal S'(\mathbb R^d)$ : $(I-\Delta)v=f$ si et seulement si $(1+|\xi|^2)\,\hat v=\hat f$ dans $\mathcal S'(\mathbb R^d)$.
- `eq2` (consequence) : Pour $v\in\mathcal S'(\mathbb R^d)$ : $(I-\Delta)v=f$ si et seulement si $\hat v=m\hat f$.
- `exu` (consequence) : Il existe une unique $u\in\mathcal S'(\mathbb R^d)$ telle que $(I-\Delta)u=f$ : c'est $u=\mathcal F^{-1}(m\hat f)$.
- `reg` (consequence) : $(1+|\xi|^2)\,\hat u=\hat f\in L^2(\mathbb R^d)$, donc $u\in H^2(\mathbb R^d)$.
- `nrm` (egalite) : $\|u\|_{H^2}=\|f\|_{L^2}$.
- `car` (consequence) : Pour $v\in\mathcal S'(\mathbb R^d)$ : $v\in H^2(\mathbb R^d)$ si et seulement si $(I-\Delta)v\in L^2(\mathbb R^d)$, et alors $\|v\|_{H^2}=\|(I-\Delta)v\|_{L^2}$.
- `fin` (conclusion) : $(I-\Delta)u=f$ a une unique solution $u\in\mathcal S'(\mathbb R^d)$, donnée par $\hat u=(1+|\xi|^2)^{-1}\hat f$ ; elle appartient à $H^2(\mathbb R^d)$ et $\|u\|_{H^2}=\|f\|_{L^2}$. Ainsi $I-\Delta$ est une isométrie bijective de $H^2(\mathbb R^d)$ sur $L^2(\mathbb R^d)$.
- `x-sgn` (egalite, DISTRACTEUR) : Pour $v\in\mathcal S'(\mathbb R^d)$ : $\widehat{(I-\Delta)v}=(1-|\xi|^2)\,\hat v$.
- `x-dprime` (consequence, DISTRACTEUR) : L'unicité vaut aussi dans $\mathcal D'(\mathbb R^d)$ : si $(I-\Delta)v=0$ dans $\mathcal D'(\mathbb R^d)$, alors $v=0$.
- `x-laplacien` (consequence, DISTRACTEUR) : Le même raisonnement donne, pour tout $f\in L^2(\mathbb R^d)$, une unique solution $u\in\mathcal S'(\mathbb R^d)$ de $-\Delta u=f$, donnée par $\hat u=|\xi|^{-2}\hat f$.
- `x-norm-H1` (egalite, DISTRACTEUR) : $\|u\|_{H^1}=\|f\|_{L^2}$.

Règles :
- ∅ ⟹ `t-iso` par « Théorème de Plancherel. [plancherel] »
- ∅ ⟹ `t-der` par « Théorème de Plancherel. [plancherel] »
- `t-iso` ⟹ `t-Sp` par « Inversion de Fourier sur $\mathcal S$, transportée à $\mathcal S'$ par dualité ; coïncidence avec le prolongement unitaire sur $L^2$. »
- `t-der` ⟹ `e-sym` par « $\widehat{\partial_j^2v}=(i\xi_j)^2\hat v=-\xi_j^2\hat v$, puis sommation sur $j$. »
- `d-m` ⟹ `s-mult` par « $1+|\xi|^2\ge 1$ ne s'annule pas, et chaque dérivée de $m$ est une fraction rationnelle bornée. »
- `e-sym` + `t-Sp` + `h-f` ⟹ `eq1` par « Application de $\mathcal F$, bijective sur $\mathcal S'$, aux deux membres de l'équation. »
- `eq1` + `s-mult` ⟹ `eq2` par « Multiplication par $m$, et réciproquement par $1+|\xi|^2$, dans $\mathcal S'(\mathbb R^d)$. »
- `eq2` + `t-Sp` ⟹ `exu` par « $\hat v$ est imposée : existence et unicité découlent de la bijectivité de $\mathcal F$ sur $\mathcal S'$. »
- `exu` + `h-f` + `t-Sp` + `d-Hs` ⟹ `reg` par « $\hat u=m\hat f$ et $\hat f\in L^2$ par Plancherel, puis définition de $H^2$. »
- `reg` + `t-Sp` + `d-Hs` ⟹ `nrm` par « Définition de la norme de $H^2$ et unitarité de $\mathcal F$. »
- `e-sym` + `t-Sp` + `d-Hs` ⟹ `car` par « Définition de $H^2$, symbole de $I-\Delta$, et équivalence $w\in L^2\iff\hat w\in L^2$ pour $w\in\mathcal S'$. »
- `exu` + `reg` + `nrm` + `car` ⟹ `fin` par « Réunion : existence, unicité, régularité, égalité des normes. »

Justifications sans règle (séduisantes ou fausses) : « $m$ est bornée : cela suffit pour multiplier une distribution tempérée par $m$. » ; « $\hat u=m\hat f\in L^2$, donc $u\in L^2$, donc $u\in H^2$. » ; « C'est le même calcul que dans $L^2$. »

Pièges :
- `s-mult` par « $m$ est bornée : cela suffit pour multiplier une distribution tempérée par $m$. » → incorrect [plancherel-cadre-identite] : Une fonction bornée ne multiplie pas une distribution tempérée en général : il faut un multiplicateur $C^\infty$ dont toutes les dérivées sont à croissance polynomiale. C'est le cas de $m$, mais pour une autre raison que sa bornitude. — Contre-exemple : La fonction $\operatorname{sign}$ est bornée, et le produit $\operatorname{sign}\cdot\delta_0$ n'a pas de sens.
- `reg` par « $\hat u=m\hat f\in L^2$, donc $u\in L^2$, donc $u\in H^2$. » → incorrect [plancherel-cadre-identite] : $u\in L^2$ ne donne pas $u\in H^2$ : il faut que $(1+|\xi|^2)\hat u$ soit de carré intégrable, ce que fournit l'équation elle-même. — Contre-exemple : $v=\mathbb 1_{]0,1[}\in L^2(\mathbb R)$ n'est pas dans $H^2(\mathbb R)$ : $|\xi\hat v(\xi)|^2=\frac{2-2\cos\xi}{2\pi}$ n'est déjà pas intégrable.
- `exu` par « C'est le même calcul que dans $L^2$. » → a-justifier [existence-unicite] : L'unicité dépend de l'espace : elle tient dans $\mathcal S'$ parce que le symbole $1+|\xi|^2$ ne s'annule pas et que $\mathcal F$ est bijective sur $\mathcal S'$.
- `x-sgn` → incorrect [plancherel-convention] : $(i\xi_j)^2=-\xi_j^2$ : la transformée de $\Delta v$ est $-|\xi|^2\hat v$, et celle de $(I-\Delta)v$ est $(1+|\xi|^2)\hat v$. — Contre-exemple : Pour $d=1$ et $v=e^{-x^2/2}$ : $v-v''=(2-x^2)e^{-x^2/2}$, dont la transformée est $(1+\xi^2)e^{-\xi^2/2}$, et non $(1-\xi^2)e^{-\xi^2/2}$.
- `x-dprime` → incorrect [plancherel-cadre-identite] : L'argument de Fourier ne vaut que dans $\mathcal S'$ : hors des distributions tempérées, $I-\Delta$ a un noyau non trivial. — Contre-exemple : $v(x)=e^{x_1}$ vérifie $\Delta v=v$, donc $(I-\Delta)v=0$ avec $v\neq 0$ ; $v$ n'est pas tempérée.
- `x-laplacien` → incorrect [plancherel-symbole-nul] : Le symbole $|\xi|^2$ de $-\Delta$ s'annule en $0$ : on ne peut pas diviser par lui dans $\mathcal S'$, et l'unicité tombe. — Contre-exemple : La constante $1\in\mathcal S'(\mathbb R^d)$ vérifie $-\Delta 1=0$ : si $u$ est solution, $u+1$ l'est aussi.
- `x-norm-H1` → incorrect [plancherel-cadre-identite] : $\|u\|^2_{H^1}=\int(1+|\xi|^2)\,m(\xi)^2|\hat f(\xi)|^2\,d\xi=\int\frac{|\hat f(\xi)|^2}{1+|\xi|^2}\,d\xi$ : c'est le carré de la norme de $f$ dans $H^{-1}$, strictement inférieur à $\|f\|^2_{L^2}$ dès que $f\neq 0$.

Retraits :
- `h-f` (nécessaire) : Pour $f\in\mathcal S'$, l'unique solution tempérée existe encore, mais la régularité $H^2$ est perdue. — Contre-exemple : Pour $d=1$ et $f=\delta_0$ : $u=\tfrac12 e^{-|x|}$, avec $\hat u=(2\pi)^{-1/2}(1+\xi^2)^{-1}$ ; $u\in H^1(\mathbb R)$ mais $u\notin H^2(\mathbb R)$, car $\int(1+\xi^2)^2|\hat u|^2\,d\xi=+\infty$.
- `s-mult` (nécessaire) : La division par $1+|\xi|^2$ dans $\mathcal S'$ fournit à la fois l'existence et l'unicité. — Contre-exemple : Pour $-\Delta$, de symbole $|\xi|^2$ nul en $0$, la division est impossible et l'unicité échoue dans $\mathcal S'$ : $-\Delta 1=0$.

Calculs fermés : [{"kind":"rational","prompt":"Meilleure constante $c$ telle que $\\|\\nabla u\\|_{L^2}\\le c\\,\\|f\\|_{L^2}$ pour la solution de $(I-\\Delta)u=f$, c'est-à-dire $\\sup_{\\xi}\\frac{|\\xi|}{1+|\\xi|^2}$.","expected":"1/2"}]

Solution :
**Passage en Fourier.** Pour $v\in\mathcal S'(\mathbb R^d)$, Plancherel dans $\mathcal S'$ donne $\widehat{\partial_j^2v}=(i\xi_j)^2\hat v=-\xi_j^2\hat v$, donc $\widehat{(I-\Delta)v}=(1+|\xi|^2)\hat v$. Comme $\mathcal F$ est une bijection de $\mathcal S'$, l'équation $(I-\Delta)v=f$ équivaut à $(1+|\xi|^2)\hat v=\hat f$ dans $\mathcal S'$.

**Division par le symbole.** $m=(1+|\xi|^2)^{-1}$ est $C^\infty$, bornée ainsi que toutes ses dérivées : la multiplication par $m$ est définie sur $\mathcal S'$ et inverse celle par $1+|\xi|^2$. L'équation équivaut donc à $\hat v=m\hat f$ : il existe une unique solution tempérée, $u=\mathcal F^{-1}(m\hat f)$. La bornitude de $m$ ne suffirait pas : c'est sa régularité qui autorise le produit avec une distribution tempérée.

**Régularité et norme.** $(1+|\xi|^2)\hat u=\hat f\in L^2$, donc $u\in H^2(\mathbb R^d)$ et $\|u\|_{H^2}=\|\hat f\|_{L^2}=\|f\|_{L^2}$.

**Caractérisation.** Pour $v\in\mathcal S'$ : $v\in H^2\iff(1+|\xi|^2)\hat v\in L^2\iff\widehat{(I-\Delta)v}\in L^2\iff(I-\Delta)v\in L^2$, avec $\|v\|_{H^2}=\|(I-\Delta)v\|_{L^2}$. Ainsi $I-\Delta:H^2\to L^2$ est une isométrie bijective.

**Estimations.** $\|u\|_{L^2}\le\|f\|_{L^2}$, $\|\Delta u\|_{L^2}\le\|f\|_{L^2}$, et $\|\nabla u\|_{L^2}\le\frac12\|f\|_{L^2}$, car $\sup_\xi\frac{|\xi|}{1+|\xi|^2}=\frac12$, atteint en $|\xi|=1$. Cette constante $\frac12$ est la meilleure : pour $\hat f=\mathbb 1_{\{1-\varepsilon<|\xi|<1+\varepsilon\}}$ avec $0<\varepsilon<1$, $\|\nabla u\|_{L^2}^2=\int\frac{|\xi|^2}{(1+|\xi|^2)^2}|\hat f|^2\,d\xi\ge\min_{|r-1|\le\varepsilon}\frac{r^2}{(1+r^2)^2}\,\|f\|_{L^2}^2$, et ce minimum tend vers $\frac14$ quand $\varepsilon\to 0$.

**Points de vigilance.** L'unicité est fausse dans $\mathcal D'$ : $e^{x_1}$ annule $I-\Delta$. Pour $-\Delta$, le symbole s'annule en $0$ et l'unicité échoue déjà dans $\mathcal S'$ (les constantes). Si $f=\delta_0$ et $d=1$, la solution $\frac12e^{-|x|}$ est dans $H^1$ mais pas dans $H^2$.

Indices :
1. Que devient l'opérateur $I-\Delta$ après transformée de Fourier, et dans quel espace l'identité obtenue a-t-elle lieu ?
2. Divise par le symbole : il faut justifier que cette division est licite dans $\mathcal S'$, puis lire l'appartenance à $H^2$ sur la définition par poids.
3. $\widehat{(I-\Delta)v}=(1+|\xi|^2)\hat v$, et $m=(1+|\xi|^2)^{-1}$ est $C^\infty$ à dérivées bornées. Ensuite, $(1+|\xi|^2)\hat u=\hat f$ est exactement la condition définissant $H^2$.

Erreurs fréquentes :
- Écrire le symbole $1-|\xi|^2$ en oubliant que $(i\xi_j)^2=-\xi_j^2$.
- Affirmer l'unicité sans préciser l'espace : elle est fausse dans $\mathcal D'$.
- Transposer le raisonnement à $-\Delta$, dont le symbole s'annule.
- Déduire $u\in H^2$ de la seule appartenance $u\in L^2$.

Variante : Soient $\lambda>0$ et $f\in L^2(\mathbb R^d)$. Montrer que $(\lambda I-\Delta)u=f$ admet une unique solution $u\in\mathcal S'(\mathbb R^d)$, que $u\in H^2(\mathbb R^d)$, et que $\|u\|_{L^2}\le\lambda^{-1}\|f\|_{L^2}$ et $\|\Delta u\|_{L^2}\le\|f\|_{L^2}$.

Solution de la variante : Le symbole vaut $\lambda+|\xi|^2\ge\lambda>0$ ; $(\lambda+|\xi|^2)^{-1}$ est $C^\infty$ à dérivées bornées, d'où l'existence et l'unicité dans $\mathcal S'$ de $u$ avec $\hat u=(\lambda+|\xi|^2)^{-1}\hat f$. Comme $\frac{1+|\xi|^2}{\lambda+|\xi|^2}\le\max(1,\lambda^{-1})$, on a $(1+|\xi|^2)\hat u\in L^2$, donc $u\in H^2$. Enfin $(\lambda+|\xi|^2)^{-1}\le\lambda^{-1}$ et $\frac{|\xi|^2}{\lambda+|\xi|^2}\le 1$ donnent les deux estimations, par Plancherel. La constante $\lambda^{-1}$ est optimale : pour $\hat f=\mathbb 1_{\{|\xi|<\varepsilon\}}$, on a $\|u\|_{L^2}\ge(\lambda+\varepsilon^2)^{-1}\|f\|_{L^2}$, et $(\lambda+\varepsilon^2)^{-1}\to\lambda^{-1}$ quand $\varepsilon\to 0$.

Vérification : {"origin":"complement","review":"machine"}