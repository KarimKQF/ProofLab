# 18. Injections de Sobolev fractionnaires (`injections-fractionnaires`) — polycopié p. PDF 19, section 4.5

## Fiche

Espaces : $H^s(\mathbb R^d)$, défini par $(1+|\xi|^2)^{s/2}\hat u\in L^2$. | $C_0(\mathbb R^d)$ : fonctions continues tendant vers $0$ à l'infini, munies de la norme uniforme ; $C^{0,\alpha}(\mathbb R^d)$ : fonctions bornées et $\alpha$-höldériennes. | Une injection $H^s\hookrightarrow X$ signifie : tout élément de $H^s$ admet un représentant dans $X$, et $\|u\|_X\le C\|u\|_{H^s}$.

Hypothèses :
- Pour l'injection dans $L^{2d/(d-2s)}$ : $0<s<\frac d2$. — Sans elle : Pour $s=\frac d2$, l'exposant $\frac{2d}{d-2s}$ n'est plus défini, et $H^{d/2}(\mathbb R^d)\not\subset L^\infty(\mathbb R^d)$.
- Pour l'injection dans $C_0$ : $s>\frac d2$, strictement. — Sans elle : Au cas limite, l'injection échoue : en dimension $1$, $\hat u(\xi)=\frac{1}{(1+|\xi|)\log(e+|\xi|)}$ définit $u\in H^{1/2}(\mathbb R)$ non essentiellement bornée.
- Pour l'injection dans $C^{0,\alpha}$ : $0<\alpha<1$ et $s>\frac d2+\alpha$. — Sans elle : Pour $s=\frac d2+\alpha$, l'intégrale $\int|\xi|^{2\alpha}(1+|\xi|^2)^{-s}\,d\xi$ diverge : l'argument par Cauchy–Schwarz global ne s'applique plus. Ce n'est pas un contre-exemple : dans ce cas limite, l'injection subsiste (découpage des fréquences en $|\xi|\le|x-y|^{-1}$ et $|\xi|>|x-y|^{-1}$), hors de l'énoncé du polycopié.

Énoncé : Sur $\mathbb R^d$, pour $0<s<\frac d2$, $H^s\hookrightarrow L^{2d/(d-2s)}$. Pour $s>\frac d2$, $H^s\hookrightarrow C_0(\mathbb R^d)$. Si $0<\alpha<1$ et $s>\frac d2+\alpha$, alors $H^s\hookrightarrow C^{0,\alpha}(\mathbb R^d)$.

Bilan : {"regularite":"Pour $s>\\frac d2$, tout élément de $H^s$ admet un représentant continu nul à l'infini, avec $\\sup|u|\\le(2\\pi)^{-d/2}\\big(\\int(1+|\\xi|^2)^{-s}\\,d\\xi\\big)^{1/2}\\|u\\|_{H^s}$ ; pour $s>\\frac d2+\\alpha$, ce représentant est $\\alpha$-höldérien.","autre":"Pour $0<s<\\frac d2$ : $H^s\\hookrightarrow L^q$ pour tout $q\\in[2,\\frac{2d}{d-2s}]$, par interpolation entre $L^2$ et l'exposant critique."}

Preuve dans le polycopié : idee

Plan :
1. Pour $s>\frac d2$ : Cauchy–Schwarz donne $\|\hat u\|_{L^1}\le\|u\|_{H^s}\big(\int(1+|\xi|^2)^{-s}\,d\xi\big)^{1/2}<\infty$.
2. Inversion de Fourier : $u$ coïncide presque partout avec $(2\pi)^{-d/2}\int e^{ix\cdot\xi}\hat u(\xi)\,d\xi$, continue et nulle à l'infini (Riemann–Lebesgue).
3. Höldérianité : $|e^{i\xi\cdot x}-e^{i\xi\cdot y}|\le 2^{1-\alpha}|\xi|^\alpha|x-y|^\alpha$, puis Cauchy–Schwarz, convergent si $s>\frac d2+\alpha$.
4. Exposant critique $\frac{2d}{d-2s}$ : résultat supplémentaire de théorie des intégrales singulières, admis ; il ne se déduit pas de Cauchy–Schwarz.

Vigilance :
- Le cas limite $s=\frac d2$ est exclu : $H^{d/2}(\mathbb R^d)\not\subset L^\infty(\mathbb R^d)$.
- L'injection critique dans $L^{2d/(d-2s)}$ n'est pas démontrée par Cauchy–Schwarz : elle est admise.
- « $u$ est continue » signifie : la classe $u$ admet un représentant continu.
- Sur $\mathbb R^d$, $H^s\not\subset L^q$ pour $q<2$ : les exposants accessibles pour $0<s<\frac d2$ sont $q\in[2,\frac{2d}{d-2s}]$.

Vérification : {"origin":"polycopie","review":"machine","notes":"Idée de preuve du polycopié (p. PDF 19) pour s > d/2 ; l’injection à l’exposant critique est admise."}

Définition « Injection continue $H^s\hookrightarrow X$ » : Tout élément de $H^s(\mathbb R^d)$ admet un représentant dans $X$, et il existe $C$ tel que $\|u\|_X\le C\|u\|_{H^s}$ pour tout $u\in H^s(\mathbb R^d)$.

Définition « Exposant critique $2^*$ » : Pour $0<s<\frac d2$ : $2^*=\frac{2d}{d-2s}$, et $H^s(\mathbb R^d)\hookrightarrow L^{2^*}(\mathbb R^d)$, résultat admis au polycopié.

## Contre-exemple `ce-injections-fractionnaires-limite` : Le cas limite en dimension 1
Assertion : $H^{1/2}(\mathbb R)\hookrightarrow C_0(\mathbb R)$.
Tâche : Pour $\hat u(\xi)=\frac{1}{(1+|\xi|)\log(e+|\xi|)}$, la finitude de $\|u\|_{H^{1/2}}$ se ramène à $\int_0^{+\infty}\frac{dr}{(e+r)\log^2(e+r)}$. Calcule cette intégrale.
Vérification : {"kind":"rational","prompt":"Valeur de $\\int_0^{+\\infty}\\frac{dr}{(e+r)\\log^2(e+r)}$","expected":"1"}
Explication : Une primitive est $-\frac{1}{\log(e+r)}$, d'où la valeur $\frac{1}{\log e}=1$ : $u\in H^{1/2}(\mathbb R)$. Mais $\int\hat u=+\infty$ (primitive $\log\log(e+r)$), et les moyennes gaussiennes $\int u\rho_\varepsilon=(2\pi)^{-1/2}\int\hat u\,e^{-\varepsilon^2\xi^2/2}$ tendent vers $+\infty$ : $u$ n'est pas bornée.

## Contre-exemple `ce-injections-fractionnaires-surcritique` : Au-delà de l’exposant critique
Assertion : Pour $u,v\in H^1(\mathbb R^3)$, on a toujours $\int|u|^6|v|<+\infty$.
Tâche : Avec $u=v=|x|^{-a}\chi$, où $\chi\in C^\infty_c(\mathbb R^3)$ vaut $1$ près de $0$, on a $u\in H^1(\mathbb R^3)$ pour $a<\frac12$, et $\int|u|^6|v|=\int|x|^{-7a}\chi^7\,dx$. Donne le plus petit $a$ rendant cette intégrale infinie.
Vérification : {"kind":"rational","prompt":"Plus petite valeur de $a$","expected":"3/7"}
Explication : En dimension $3$, $|x|^{-7a}$ est intégrable près de $0$ si et seulement si $7a<3$ : l'intégrale diverge dès $a=\frac37$, valeur inférieure à $\frac12$. Ainsi $u,v\in H^1(\mathbb R^3)$ et $\int|u|^6|v|=+\infty$ : pour $(d,s)=(3,1)$, la condition $p+1\le 2^*=6$ ne peut pas être relâchée.

## Exercice facile `injections-fractionnaires.facile` : Quand $H^s(\mathbb R)$ s'injecte-t-il dans $C_0(\mathbb R)$ ?

Énoncé : Déterminer les $s\in\mathbb R$ pour lesquels $H^s(\mathbb R)\hookrightarrow C_0(\mathbb R)$ : tout élément de $H^s(\mathbb R)$ admet un représentant dans $C_0(\mathbb R)$, et $\sup|v|\le C\|v\|_{H^s}$. Le cas limite $s=\frac12$ doit être tranché par une démonstration.
Source : {"doc":"polycopie","pdfPage":41,"label":"Exercice 18, facile ; énoncé de la section 4.5 (p. PDF 19)"} — prérequis : dualite-interpolation

But : `fin` — usage : application

Nœuds :
- `d-def` (definition) : Pour $s\in\mathbb R$ : $\|v\|_{H^s(\mathbb R)}=\|(1+\xi^2)^{s/2}\hat v\|_{L^2}$. « $H^s(\mathbb R)\hookrightarrow C_0(\mathbb R)$ » signifie : tout élément de $H^s(\mathbb R)$ admet un représentant dans $C_0(\mathbb R)$, et il existe $C$ tel que $\sup|v|\le C\|v\|_{H^s}$.
- `c-seuil` (consequence, calcul rational) : $I(s)=\int_{\mathbb R}(1+\xi^2)^{-s}\,d\xi<+\infty$ si et seulement si $s>\frac12$.
  - valeur attendue : "1/2"
- `h-pos` (definition, locale) : Soit $s>\frac12$.
- `a-pos` (application-theoreme) : Pour $s>\frac12$ : $H^s(\mathbb R)\hookrightarrow C_0(\mathbb R)$.
- `d-g` (definition) : $g(\xi)=\dfrac{1}{(1+|\xi|)\log(e+|\xi|)}$ et $u=\mathcal F^{-1}g$.
- `c-g` (consequence) : $\int_{\mathbb R}(1+\xi^2)^{1/2}g(\xi)^2\,d\xi\le 2e<+\infty$, donc $u\in H^{1/2}(\mathbb R)$ ; mais $\int_{\mathbb R}g(\xi)\,d\xi=+\infty$.
- `c-nonb` (consequence) : Pour $\rho_\varepsilon(x)=\frac{1}{\varepsilon\sqrt{2\pi}}e^{-x^2/(2\varepsilon^2)}$ : $\int_{\mathbb R}u\,\rho_\varepsilon\,dx=(2\pi)^{-1/2}\int_{\mathbb R}g(\xi)e^{-\varepsilon^2\xi^2/2}\,d\xi\to+\infty$ quand $\varepsilon\to0^+$ ; donc $u\notin L^\infty(\mathbb R)$, et $u$ n'a aucun représentant dans $C_0(\mathbb R)$.
- `c-monot` (inclusion) : Pour $s\le\frac12$ : $H^{1/2}(\mathbb R)\subset H^s(\mathbb R)$, avec $\|v\|_{H^s}\le\|v\|_{H^{1/2}}$.
- `d-abs` (definition, locale) : Soit $s\le\frac12$ ; supposons, par l'absurde, $H^s(\mathbb R)\hookrightarrow C_0(\mathbb R)$ avec une constante $C$.
- `c-dual` (application-theoreme) : $v\mapsto v(0)$ (valeur du représentant continu) est une forme linéaire continue sur $H^s(\mathbb R)$ ; par dualité, elle s'écrit $\langle T,\cdot\rangle$ avec $T\in H^{-s}(\mathbb R)$, et $T=\delta_0$ dans $\mathcal S'$ : $\delta_0\in H^{-s}(\mathbb R)$.
- `c-contra` (contradiction) : $\|\delta_0\|^2_{H^{-s}}=\frac{1}{2\pi}I(s)<+\infty$ impose $s>\frac12$ : contradiction avec $s\le\frac12$.
- `a-neg` (consequence) : Pour $s\le\frac12$, $H^s(\mathbb R)$ ne s'injecte pas dans $C_0(\mathbb R)$.
- `fin` (conclusion) : $H^s(\mathbb R)\hookrightarrow C_0(\mathbb R)$ si et seulement si $s>\frac12$ ; le cas limite $s=\frac12$ est exclu.
- `x-demi` (inclusion, DISTRACTEUR) : $H^{1/2}(\mathbb R)\hookrightarrow C_0(\mathbb R)$.
- `x-I` (inegalite, DISTRACTEUR) : $I(1/2)=\int_{\mathbb R}(1+\xi^2)^{-1/2}\,d\xi<+\infty$.

Règles :
- `d-def` ⟹ `c-seuil` par « $(1+\xi^2)^{-s}$ est continue, équivalente à $|\xi|^{-2s}$ à l'infini, et $\int_1^{+\infty}\xi^{-2s}\,d\xi<+\infty\iff 2s>1$. »
- `h-pos` + `c-seuil` + `d-def` ⟹ `a-pos` par « Injection de Sobolev fractionnaire, cas $s>d/2$ avec $d=1$. [injections-fractionnaires] »
- `d-g` + `d-def` ⟹ `c-g` par « $(1+\xi^2)^{1/2}\le 1+|\xi|$ et $\frac{1}{1+r}\le\frac{e}{e+r}$ ; primitives $-\frac{1}{\log(e+r)}$ et $\log\log(e+r)$. » (chemin explicite)
- `c-g` ⟹ `c-nonb` par « Parseval, avec $\hat\rho_\varepsilon(\xi)=(2\pi)^{-1/2}e^{-\varepsilon^2\xi^2/2}$ ; convergence monotone, car $g\ge 0$ ; si $|u|\le K$ presque partout, alors $\big|\int u\rho_\varepsilon\big|\le K$ puisque $\int\rho_\varepsilon=1$. [plancherel] » (chemin explicite)
- `d-def` ⟹ `c-monot` par « $(1+\xi^2)^s\le(1+\xi^2)^{1/2}$ pour $s\le\frac12$. » (chemin explicite)
- `c-nonb` + `c-monot` + `c-g` ⟹ `a-neg` par « $u$ appartient à tout $H^s$, $s\le\frac12$, et n'est pas essentiellement bornée, alors que les éléments de $C_0(\mathbb R)$ sont bornés. » (chemin explicite)
- `d-abs` + `d-def` ⟹ `c-dual` par « Dualité $(H^s)'\simeq H^{-s}$ par le crochet qui prolonge l'action des distributions sur $\mathcal S$. [dualite-interpolation] » (chemin dualite)
- `c-dual` + `c-seuil` + `d-abs` ⟹ `c-contra` par « $\hat\delta_0=(2\pi)^{-1/2}$, donc $\|\delta_0\|^2_{H^{-s}}=\frac{1}{2\pi}\int(1+\xi^2)^{-s}\,d\xi$. » (chemin dualite)
- `c-contra` ⟹ `a-neg` par « Raisonnement par l’absurde. » (chemin dualite)
- `a-pos` + `a-neg` ⟹ `fin` par « Réunion des deux sens. »

Justifications sans règle (séduisantes ou fausses) : « Pour $s\le\frac12$, la majoration de Cauchy–Schwarz ne s'applique plus, donc l'injection est fausse. » ; « Convergence dominée, appliquée à $g(\xi)e^{-\varepsilon^2\xi^2/2}$. »

Pièges :
- `a-neg` par « Pour $s\le\frac12$, la majoration de Cauchy–Schwarz ne s'applique plus, donc l'injection est fausse. » → incorrect [injections-fractionnaires-cas-limite] : L’échec d’une méthode ne prouve pas la fausseté d’un énoncé : il faut un contre-exemple explicite, ou un argument de dualité.
- `c-nonb` par « Convergence dominée, appliquée à $g(\xi)e^{-\varepsilon^2\xi^2/2}$. » → incorrect [hypotheses-theoreme] : La convergence dominée exige un majorant intégrable, et $g\notin L^1(\mathbb R)$ : c'est la convergence monotone qui s'applique, l'intégrande croissant vers $g$.
- `x-demi` → incorrect [injections-fractionnaires-cas-limite] : Le théorème exige $s>\frac d2$ strictement : au cas limite, l'injection échoue. — Contre-exemple : $u=\mathcal F^{-1}g$, avec $g(\xi)=\frac{1}{(1+|\xi|)\log(e+|\xi|)}$, est dans $H^{1/2}(\mathbb R)$ et n'est pas essentiellement bornée.
- `x-I` → incorrect [injections-fractionnaires-cas-limite] : Au cas limite, l'intégrale diverge logarithmiquement. — Contre-exemple : Pour $\xi\ge 1$ : $(1+\xi^2)^{-1/2}\ge\frac{1}{\sqrt2\,\xi}$, et $\int_1^{+\infty}\frac{d\xi}{\xi}=+\infty$.

Retraits :
- `h-pos` (nécessaire) : Le sens direct repose sur l'inégalité stricte $s>\frac d2$ : au cas limite, elle cesse d'être vraie. — Contre-exemple : Pour $s=\frac12$, $u=\mathcal F^{-1}g$ est dans $H^{1/2}(\mathbb R)$ sans être essentiellement bornée.

Calculs fermés : [{"kind":"rational","prompt":"Valeur de $\\int_0^{+\\infty}\\frac{dr}{(e+r)\\log^2(e+r)}$.","expected":"1"}]

Solution :
**Seuil.** $I(s)=\int(1+\xi^2)^{-s}\,d\xi$ est finie si et seulement si $2s>1$.

**Sens direct.** Pour $s>\frac12$, le théorème (cas $s>\frac d2$, $d=1$) donne $H^s(\mathbb R)\hookrightarrow C_0(\mathbb R)$, avec $\sup|v|\le(2\pi)^{-1/2}I(s)^{1/2}\|v\|_{H^s}$.

**Cas $s\le\frac12$, première voie.** Soit $g(\xi)=\frac{1}{(1+|\xi|)\log(e+|\xi|)}$ et $u=\mathcal F^{-1}g$. Comme $(1+\xi^2)^{1/2}\le1+|\xi|$ et $\frac1{1+r}\le\frac{e}{e+r}$ :
$$\int(1+\xi^2)^{1/2}g^2\,d\xi\le 2e\int_0^{+\infty}\frac{dr}{(e+r)\log^2(e+r)}=2e,$$
donc $u\in H^{1/2}\subset H^s$. Mais $\int g=+\infty$ ($\log\log$). Pour la gaussienne $\rho_\varepsilon$ de masse $1$, Parseval donne $\int u\rho_\varepsilon=(2\pi)^{-1/2}\int g\,e^{-\varepsilon^2\xi^2/2}\,d\xi$, qui tend vers $+\infty$ par convergence monotone ; si $u$ était bornée par $K$, ces intégrales le seraient aussi. Donc $u$ n'a aucun représentant dans $C_0$.

**Cas $s\le\frac12$, seconde voie.** Si $H^s\hookrightarrow C_0$, l'évaluation en $0$ est continue sur $H^s$ ; par dualité, $\delta_0\in H^{-s}$, donc $\frac{1}{2\pi}I(s)=\|\delta_0\|^2_{H^{-s}}<+\infty$, soit $s>\frac12$ : contradiction.

**Conclusion.** $H^s(\mathbb R)\hookrightarrow C_0(\mathbb R)$ si et seulement si $s>\frac12$. L'échec de Cauchy–Schwarz pour $s\le\frac12$ ne prouverait rien à lui seul : il faut l'une des deux voies ci-dessus.

Indices :
1. Le critère du théorème porte sur $s$ et $d$. Que vaut-il ici, et que se passe-t-il exactement au seuil ?
2. Pour réfuter l'injection au cas limite, il faut un objet : soit une fonction de $H^{1/2}$ non bornée, soit une forme linéaire dont la continuité contredirait le critère pour la distribution de Dirac.
3. Essaie $\hat u(\xi)=\frac{1}{(1+|\xi|)\log(e+|\xi|)}$ : il est de carré intégrable avec le poids $(1+\xi^2)^{1/2}$, mais pas intégrable. Teste $u$ contre des gaussiennes de masse $1$.

Erreurs fréquentes :
- Inclure le cas $s=\frac12$ dans l'injection.
- Conclure à la fausseté d’une injection parce qu’une méthode de preuve échoue.
- Oublier que « continue » signifie « admet un représentant continu ».

Variante : Déterminer les $s\in\mathbb R$ pour lesquels $H^s(\mathbb R^2)\hookrightarrow C_0(\mathbb R^2)$.

Solution de la variante : Pour $s>1$, le théorème s'applique. Pour $s\le 1$, on prend $\hat u(\xi)=\frac{1}{(1+|\xi|)^2\log(e+|\xi|)}$ : en coordonnées polaires, $\int(1+|\xi|^2)|\hat u|^2\le 2\pi\int_0^{+\infty}\frac{r\,dr}{(1+r)^2\log^2(e+r)}<+\infty$, car $\frac{r}{(1+r)^2}\le\frac{1}{1+r}$ ; et $\int\hat u=2\pi\int_0^{+\infty}\frac{r\,dr}{(1+r)^2\log(e+r)}=+\infty$, car $\frac{r}{(1+r)^2}\ge\frac{1}{4(1+r)}$ pour $r\ge1$. Les moyennes gaussiennes montrent que $u\in H^1(\mathbb R^2)$ n'est pas bornée : l'injection a lieu si et seulement si $s>1$.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `injections-fractionnaires.intermediaire` : $H^s\hookrightarrow C_0$ pour $s>d/2$, par Fourier et Cauchy–Schwarz

Énoncé : Soient $s>\frac d2$ et $u\in H^s(\mathbb R^d)$. Montrer, par la transformée de Fourier et l'inégalité de Cauchy–Schwarz, que $u$ admet un représentant $v\in C_0(\mathbb R^d)$ et que $\sup|v|\le(2\pi)^{-d/2}\big(\int(1+|\xi|^2)^{-s}d\xi\big)^{1/2}\|u\|_{H^s}$.
Source : {"doc":"polycopie","pdfPage":41,"label":"Exercice 18, intermédiaire ; idée de preuve de la section 4.5 (p. PDF 19)"} — prérequis : —

But : `fin` — usage : demonstration

Nœuds :
- `h-s` (hypothese) : $s>\frac d2$.
- `h-u` (hypothese) : $u\in H^s(\mathbb R^d)$.
- `d-norm` (definition) : $w(\xi)=1+|\xi|^2$ et $\|u\|^2_{H^s}=\int_{\mathbb R^d}w^s|\hat u|^2\,d\xi$.
- `c-rad` (inegalite, calcul rational) : $I_s=\int_{\mathbb R^d}w(\xi)^{-s}\,d\xi<+\infty$.
  - valeur attendue : "1/2"
- `c-cs` (inegalite) : $\int_{\mathbb R^d}|\hat u|\,d\xi\le I_s^{1/2}\|u\|_{H^s}$.
- `c-L1` (consequence) : $\hat u\in L^1(\mathbb R^d)\cap L^2(\mathbb R^d)$.
- `d-v` (definition) : Pour $x\in\mathbb R^d$ : $v(x)=(2\pi)^{-d/2}\int_{\mathbb R^d}e^{ix\cdot\xi}\hat u(\xi)\,d\xi$.
- `c-C0` (consequence) : $v$ est continue et $v(x)\to 0$ quand $|x|\to+\infty$ : $v\in C_0(\mathbb R^d)$.
- `c-rep` (egalite) : $v=u$ presque partout.
- `c-sup` (inegalite) : $\sup|v|\le(2\pi)^{-d/2}I_s^{1/2}\|u\|_{H^s}$.
- `fin` (conclusion) : Tout $u\in H^s(\mathbb R^d)$ admet un représentant $v\in C_0(\mathbb R^d)$, avec $\sup|v|\le(2\pi)^{-d/2}I_s^{1/2}\|u\|_{H^s}$ : $H^s(\mathbb R^d)\hookrightarrow C_0(\mathbb R^d)$ pour $s>\frac d2$.
- `x-limite` (inegalite, DISTRACTEUR) : $I_{d/2}=\int_{\mathbb R^d}(1+|\xi|^2)^{-d/2}\,d\xi<+\infty$.
- `x-RL2` (consequence, DISTRACTEUR) : La transformée de Fourier de toute fonction de $L^2(\mathbb R^d)$ tend vers $0$ à l'infini.
- `x-cst` (inegalite, DISTRACTEUR) : Pour tout $s>\frac d2$ : $\sup|v|\le\|u\|_{H^s}$.

Règles :
- `h-s` + `d-norm` ⟹ `c-rad` par « Coordonnées polaires : $\int_1^{+\infty}r^{-2s}r^{d-1}\,dr<+\infty\iff 2s>d$ ; l'intégrande est borné près de $0$. »
- `h-u` + `c-rad` + `d-norm` ⟹ `c-cs` par « Écrire $|\hat u|=w^{-s/2}\cdot w^{s/2}|\hat u|$, puis Cauchy–Schwarz dans $L^2$. [cauchy-schwarz] »
- `c-cs` + `h-u` + `h-s` + `d-norm` ⟹ `c-L1` par « La borne précédente, et $\|\hat u\|_{L^2}\le\|u\|_{H^s}$ car $w^s\ge 1$ pour $s>0$. »
- `c-L1` + `d-v` ⟹ `c-C0` par « Continuité par convergence dominée (majorant $|\hat u|\in L^1$), et limite nulle à l'infini par le lemme de Riemann–Lebesgue. [riemann-lebesgue] »
- `c-L1` + `d-v` ⟹ `c-rep` par « Pour $\hat u\in L^1\cap L^2$, l'inverse de $\mathcal F$ sur $L^2$ coïncide presque partout avec la formule intégrale. [plancherel] »
- `c-cs` + `d-v` ⟹ `c-sup` par « $|e^{ix\cdot\xi}|=1$, puis la borne de Cauchy–Schwarz. »
- `c-C0` + `c-rep` + `c-sup` ⟹ `fin` par « Réunion : représentant, appartenance à $C_0$, continuité de l’injection. »

Justifications sans règle (séduisantes ou fausses) : « Cauchy–Schwarz sans poids : $\int|\hat u|\le\|\hat u\|_{L^2}\,\|1\|_{L^2}$. » ; « $u$ est elle-même continue, puisque $\hat u$ est intégrable. » ; « Injection de Sobolev fractionnaire. »

Pièges :
- `c-cs` par « Cauchy–Schwarz sans poids : $\int|\hat u|\le\|\hat u\|_{L^2}\,\|1\|_{L^2}$. » → incorrect [hypotheses-theoreme] : La fonction constante $1$ n'est pas dans $L^2(\mathbb R^d)$ : sans le poids $w^{-s/2}$, la majoration est infinie. C'est le poids qui fait apparaître la condition $s>\frac d2$.
- `c-rep` par « $u$ est elle-même continue, puisque $\hat u$ est intégrable. » → incorrect [injections-fractionnaires-representant] : $u$ est une classe de fonctions : on obtient un représentant continu $v$, égal à $u$ presque partout, non une égalité en tout point. — Contre-exemple : La classe de $e^{-|x|^2}$ contient aussi $e^{-|x|^2}+\mathbb 1_{\{0\}}$, discontinue en $0$.
- `x-limite` → incorrect [injections-fractionnaires-cas-limite] : Au cas limite, $\int_1^{+\infty}r^{-d}r^{d-1}\,dr=\int_1^{+\infty}\frac{dr}{r}$ diverge. — Contre-exemple : Pour $d=1$ : $(1+\xi^2)^{-1/2}\ge\frac{1}{\sqrt2\,\xi}$ pour $\xi\ge1$.
- `x-RL2` → incorrect [hypotheses-theoreme] : Le lemme de Riemann–Lebesgue suppose l'intégrabilité ; $\mathcal F$ étant surjective sur $L^2$, toute fonction de $L^2$ est une transformée. — Contre-exemple : $h=\sum_{n\ge1}\mathbb 1_{[n,n+2^{-n}]}\in L^2(\mathbb R)$ vaut $1$ en des points arbitrairement grands ; c'est la transformée de $\mathcal F^{-1}h\in L^2(\mathbb R)$.
- `x-cst` → incorrect [injections-fractionnaires-cas-limite] : La constante optimale vaut $(2\pi)^{-d/2}I_s^{1/2}$, qui tend vers $+\infty$ quand $s\downarrow\frac d2$. — Contre-exemple : Pour $\hat u=w^{-s}$ : $\|u\|^2_{H^s}=I_s$ et $v(0)=(2\pi)^{-d/2}I_s$, donc $v(0)/\|u\|_{H^s}=(2\pi)^{-d/2}I_s^{1/2}$, non borné quand $s\downarrow\frac d2$, car $I_s\uparrow I_{d/2}=+\infty$.

Retraits :
- `h-s` (nécessaire) : La finitude de $I_s$, donc l'intégrabilité de $\hat u$, repose sur $2s>d$. — Contre-exemple : Pour $d=1$ et $s=\frac12$ : $\hat u(\xi)=\frac{1}{(1+|\xi|)\log(e+|\xi|)}$ définit $u\in H^{1/2}(\mathbb R)$ non essentiellement bornée.

Solution :
**Intégrabilité du poids.** En coordonnées polaires, $I_s=\int(1+|\xi|^2)^{-s}\,d\xi<+\infty$ si et seulement si $2s>d$.

**Cauchy–Schwarz.** $\int|\hat u|=\int w^{-s/2}\cdot w^{s/2}|\hat u|\le I_s^{1/2}\|u\|_{H^s}$. Comme $w^s\ge1$, $\hat u\in L^2$ aussi.

**Représentant continu.** $v(x)=(2\pi)^{-d/2}\int e^{ix\cdot\xi}\hat u(\xi)\,d\xi$ est continue (convergence dominée), tend vers $0$ à l'infini (Riemann–Lebesgue, car $\hat u\in L^1$), et coïncide presque partout avec $u$ (inversion de Fourier sur $L^1\cap L^2$). Enfin $\sup|v|\le(2\pi)^{-d/2}\int|\hat u|\le(2\pi)^{-d/2}I_s^{1/2}\|u\|_{H^s}$.

**Exemple.** Pour $d=1$, $s=1$ : $I_1=\pi$, donc $\sup|v|^2\le\frac12\|u\|^2_{H^1}$, avec égalité pour $u=e^{-|x|}$.

**Vigilance.** Au cas limite $s=\frac d2$, $I_s=+\infty$ et l'injection échoue (exercice facile) ; la constante explose quand $s\downarrow\frac d2$. L'injection à l'exposant critique $\frac{2d}{d-2s}$, pour $s<\frac d2$, ne s'obtient pas ainsi.

Indices :
1. Pour obtenir une fonction continue et bornée, il suffit que $\hat u$ soit intégrable : comment le déduire de $u\in H^s$ ?
2. Insère le poids $(1+|\xi|^2)^{s/2}$ et son inverse dans $\int|\hat u|$, puis utilise Cauchy–Schwarz ; vérifie quand l'intégrale du poids inverse est finie.
3. $\int|\hat u|\le\big(\int(1+|\xi|^2)^{-s}\big)^{1/2}\|u\|_{H^s}$, finie pour $2s>d$. Ensuite : convergence dominée, Riemann–Lebesgue et inversion sur $L^1\cap L^2$.

Erreurs fréquentes :
- Appliquer Cauchy–Schwarz sans poids, avec un facteur non intégrable.
- Affirmer que $u$ est continue, au lieu d'exhiber un représentant continu.
- Appliquer Riemann–Lebesgue à une fonction seulement de carré intégrable.

Variante : Soient $0<\alpha<1$, $s>\frac d2+\alpha$ et $u\in H^s(\mathbb R^d)$, de représentant continu $v$. Montrer que $|v(x)-v(y)|\le C\,\|u\|_{H^s}\,|x-y|^\alpha$ pour tous $x,y\in\mathbb R^d$.

Solution de la variante : Pour $a,b$ réels, $|e^{ia}-e^{ib}|\le\min(2,|a-b|)\le 2^{1-\alpha}|a-b|^\alpha$, donc $|e^{ix\cdot\xi}-e^{iy\cdot\xi}|\le 2^{1-\alpha}|\xi|^\alpha|x-y|^\alpha$. Ainsi $|v(x)-v(y)|\le(2\pi)^{-d/2}2^{1-\alpha}|x-y|^\alpha\int|\xi|^\alpha|\hat u|$, et Cauchy–Schwarz donne $\int|\xi|^\alpha|\hat u|\le J^{1/2}\|u\|_{H^s}$, avec $J=\int|\xi|^{2\alpha}(1+|\xi|^2)^{-s}\,d\xi$, finie si et seulement si $2s-2\alpha>d$.

Graphe de la variante :
But : `fin` — usage : demonstration

Nœuds :
- `h-s` (hypothese) : $0<\alpha<1$, $s>\frac d2+\alpha$, $u\in H^s(\mathbb R^d)$, et $v(x)=(2\pi)^{-d/2}\int e^{ix\cdot\xi}\hat u(\xi)\,d\xi$ son représentant continu.
- `c-phase` (inegalite) : Pour $a,b\in\mathbb R$ : $|e^{ia}-e^{ib}|\le\min(2,|a-b|)\le 2^{1-\alpha}|a-b|^\alpha$.
- `c-diff` (inegalite) : $|v(x)-v(y)|\le(2\pi)^{-d/2}2^{1-\alpha}|x-y|^\alpha\displaystyle\int|\xi|^\alpha|\hat u(\xi)|\,d\xi$.
- `c-J` (inegalite) : $J=\displaystyle\int_{\mathbb R^d}|\xi|^{2\alpha}(1+|\xi|^2)^{-s}\,d\xi<+\infty$.
- `c-cs` (inegalite) : $\displaystyle\int|\xi|^\alpha|\hat u|\,d\xi\le J^{1/2}\|u\|_{H^s}$.
- `fin` (conclusion) : $|v(x)-v(y)|\le(2\pi)^{-d/2}2^{1-\alpha}J^{1/2}\,\|u\|_{H^s}\,|x-y|^\alpha$ pour tous $x,y\in\mathbb R^d$.
- `x-phase` (inegalite, DISTRACTEUR) : Pour $a,b\in\mathbb R$ : $|e^{ia}-e^{ib}|\le|a-b|^\alpha$.
- `x-limite` (inegalite, DISTRACTEUR) : $J<+\infty$ dès que $s\ge\frac d2+\alpha$.

Règles :
- ∅ ⟹ `c-phase` par « $|e^{ia}-e^{ib}|\le 2$ et $\le|a-b|$ ; puis $\min(2,t)\le 2^{1-\alpha}t^\alpha$ pour $t\ge0$, en distinguant $t\le2$ et $t>2$. »
- `c-phase` + `h-s` ⟹ `c-diff` par « Différence des formules intégrales, avec $|(x-y)\cdot\xi|\le|x-y|\,|\xi|$. »
- `h-s` ⟹ `c-J` par « Coordonnées polaires : à l'infini, $r^{2\alpha-2s+d-1}$ est intégrable si et seulement si $s>\frac d2+\alpha$ ; près de $0$, l'intégrande est borné. »
- `c-J` + `h-s` ⟹ `c-cs` par « $|\xi|^\alpha|\hat u|=\big(|\xi|^\alpha w^{-s/2}\big)\big(w^{s/2}|\hat u|\big)$ avec $w=1+|\xi|^2$, puis Cauchy–Schwarz. [cauchy-schwarz] »
- `c-diff` + `c-cs` ⟹ `fin` par « Report de la majoration dans l’inégalité de différence. »

Pièges :
- `x-phase` → incorrect [hypotheses-theoreme] : Sans le facteur $2^{1-\alpha}$, la majoration est fausse pour $|a-b|$ grand. — Contre-exemple : $\alpha=\frac14$, $a-b=\pi$ : $|e^{ia}-e^{ib}|=2$, alors que $\pi^{1/4}<2$.
- `x-limite` → incorrect [injections-fractionnaires-cas-limite] : Pour $s=\frac d2+\alpha$, l'intégrande se comporte à l'infini comme $r^{-1}$ : l'intégrale diverge. — Contre-exemple : $d=1$, $\alpha=\frac14$, $s=\frac34$ : $|\xi|^{1/2}(1+\xi^2)^{-3/4}\ge\frac{1}{2^{3/4}|\xi|}$ pour $|\xi|\ge1$.

Vérification : {"origin":"complement","review":"machine","notes":"Le polycopié (p. PDF 19) ne donne qu’une idée de preuve (Cauchy–Schwarz pondéré, inversion de Fourier) ; la démonstration complète, dont la limite nulle à l’infini par Riemann–Lebesgue et la höldérianité de la variante, est un complément."}

## Exercice difficile `injections-fractionnaires.difficile` : Une non-linéarité polynomiale dans $H^{-s}$

Énoncé : Soient $d\ge1$, $0<s<\frac d2$, $2^*=\frac{2d}{d-2s}$, et $g(t)=\sum_{k=1}^pa_kt^k$ un polynôme réel de degré $p\ge1$, sans terme constant. Dans la formulation faible d'une équation posée dans $V=H^s(\mathbb R^d)$ (fonctions réelles), le terme $\int g(u)v$ doit définir, pour $u\in V$, un élément de $V'=H^{-s}(\mathbb R^d)$. Montrer que c'est le cas si $p+1\le 2^*$, en admettant l'injection critique $H^s\hookrightarrow L^{2^*}$ ; calculer la condition pour $(d,s)=(3,1)$ ; montrer que pour $g(t)=t^p$ et $p+1>2^*$ aucune majoration $\|g(u)\|_{H^{-s}}\le C\|u\|^p_{H^s}$ n'est possible.
Source : {"doc":"polycopie","pdfPage":41,"label":"Exercice 18, difficile ; section 4.5 (p. PDF 19)"} — prérequis : dualite-interpolation

But : `fin` — usage : application

Nœuds :
- `h-s` (hypothese) : $d\ge 1$, $0<s<\frac d2$ et $2^*=\frac{2d}{d-2s}$ ; les fonctions sont réelles.
- `h-g` (hypothese) : $g(t)=\sum_{k=1}^pa_kt^k$ est un polynôme réel de degré $p\ge 1$, sans terme constant.
- `h-p` (hypothese) : $p+1\le 2^*$.
- `t-crit` (application-theoreme) : Il existe $S$ tel que $\|w\|_{L^{2^*}}\le S\|w\|_{H^s}$ pour tout $w\in H^s(\mathbb R^d)$ (injection critique, admise).
- `t-lq` (inegalite) : Pour tout $q\in[2,2^*]$, il existe $C_q$ tel que $\|w\|_{L^q}\le C_q\|w\|_{H^s}$ pour tout $w\in H^s(\mathbb R^d)$.
- `c-hold` (inegalite) : Pour $1\le k\le p$ et $u,v\in H^s$ : $\int|u|^k|v|\le\|u\|^k_{L^{k+1}}\|v\|_{L^{k+1}}\le C^{k+1}_{k+1}\|u\|^k_{H^s}\|v\|_{H^s}$.
- `c-form` (consequence) : Pour $u\in H^s$, $v\mapsto\int g(u)v$ est une forme linéaire continue sur $H^s(\mathbb R^d)$, de norme au plus $\sum_k|a_k|\,C^{k+1}_{k+1}\|u\|^k_{H^s}$.
- `t-dual` (application-theoreme) : $g(u)\in H^{-s}(\mathbb R^d)$, avec $\langle g(u),v\rangle=\int g(u)v$ : le terme non linéaire a un sens dans la formulation faible.
- `c-seuil` (egalite, calcul rational-vector) : Pour $(d,s)=(3,1)$ : $2^*=6$, et la condition s'écrit $p\le 5$.
  - valeur attendue : ["6","5"]
- `e-dil` (consequence) : Pour $g(t)=t^p$ et $p+1>2^*$, aucune majoration $\|g(w)\|_{H^{-s}}\le C\|w\|^p_{H^s}$ n'est possible sur $H^s(\mathbb R^d)$.
- `fin` (conclusion) : Si $p+1\le 2^*$, alors $g(u)\in H^{-s}(\mathbb R^d)$ pour tout $u\in H^s$, avec $\|g(u)\|_{H^{-s}}\le\sum_k|a_k|\,C^{k+1}_{k+1}\|u\|^k_{H^s}$ ; pour $(d,s)=(3,1)$, cela signifie $p\le 5$ ; et la condition ne peut pas être relâchée pour $g(t)=t^p$.
- `x-Lqprime` (consequence, DISTRACTEUR) : Pour tout $1\le k\le p$ et tout $u\in H^s(\mathbb R^d)$ : $u^k\in L^{(2^*)'}(\mathbb R^d)$, où $(2^*)'=\frac{2d}{d+2s}$.
- `x-constant` (consequence, DISTRACTEUR) : Un terme constant $a_0\neq 0$ ne change rien : $v\mapsto\int a_0v$ est défini et continu sur $H^s(\mathbb R^d)$.

Règles :
- `h-s` ⟹ `t-crit` par « Injection de Sobolev fractionnaire à l'exposant critique, pour $0<s<\frac d2$. [injections-fractionnaires] »
- `t-crit` + `h-s` ⟹ `t-lq` par « Hölder dans les espaces de Lebesgue : $\|w\|_{L^q}\le\|w\|^{1-\lambda}_{L^2}\|w\|^{\lambda}_{L^{2^*}}$ avec $\frac1q=\frac{1-\lambda}{2}+\frac{\lambda}{2^*}$, et $\|w\|_{L^2}\le\|w\|_{H^s}$. [holder] »
- `t-lq` + `h-p` + `h-g` ⟹ `c-hold` par « Hölder d'exposants $\frac{k+1}{k}$ et $k+1$, avec $2\le k+1\le p+1\le 2^*$. [holder] »
- `c-hold` + `h-g` ⟹ `c-form` par « Linéarité en $v$ et somme des majorations des monômes. »
- `c-form` ⟹ `t-dual` par « Identification de $(H^s)'$ à $H^{-s}$ par le crochet qui prolonge $\int fv$. [dualite-interpolation] »
- `h-s` ⟹ `c-seuil` par « $2^*=\frac{2d}{d-2s}$, puis $p+1\le 2^*$. »
- `h-s` ⟹ `e-dil` par « $u=e^{-|x|^2}$, $u_\lambda=u(\lambda\,\cdot)$, $\lambda\ge1$ : $\int u_\lambda^{p+1}=\lambda^{-d}\int u^{p+1}$ et $\|u_\lambda\|^2_{H^s}\le\lambda^{2s-d}\|u\|^2_{H^s}$ ; la majoration imposerait $\lambda^{\frac{(d-2s)(p+1)}{2}-d}\le C'$, exposant positif si $p+1>2^*$. »
- `t-dual` + `c-seuil` + `e-dil` ⟹ `fin` par « Réunion : condition suffisante, valeur critique, optimalité. »

Justifications sans règle (séduisantes ou fausses) : « Cauchy–Schwarz sur $\int|\hat w|$, comme dans le cas $s>\frac d2$. »

Pièges :
- `t-crit` par « Cauchy–Schwarz sur $\int|\hat w|$, comme dans le cas $s>\frac d2$. » → incorrect [injections-fractionnaires-exposant-critique] : Pour $s<\frac d2$, $\int(1+|\xi|^2)^{-s}\,d\xi=+\infty$ : Cauchy–Schwarz ne donne rien. L'injection à l'exposant critique demande un résultat supplémentaire de théorie des intégrales singulières (polycopié, p. PDF 19).
- `x-Lqprime` → incorrect [injections-fractionnaires-exposant-critique] : Sur $\mathbb R^d$, $H^s$ ne s'injecte dans aucun $L^q$ avec $q<2$ ; or $(2^*)'<2$. Il faut traiter chaque monôme avec l'exposant $k+1\in[2,2^*]$. — Contre-exemple : $k=1$ et $u(x)=(1+|x|^2)^{-b/2}$ avec $\frac d2<b\le\frac{d+2s}{2}$ : $u\in H^s(\mathbb R^d)$, mais $\int|u|^{(2^*)'}=+\infty$, car $b\,(2^*)'\le d$.
- `x-constant` → incorrect [hypotheses-theoreme] : Sur $\mathbb R^d$, les éléments de $H^s$ ne sont pas intégrables en général : un terme constant ne définit pas de forme sur $H^s(\mathbb R^d)$. — Contre-exemple : $v(x)=(1+|x|^2)^{-d/2}$ a toutes ses dérivées dans $L^2$, donc $v\in H^s(\mathbb R^d)$, mais $\int_{\mathbb R^d}v=+\infty$.

Retraits :
- `h-p` (nécessaire) : Au-delà de l'exposant critique, $\int|u|^p|v|$ peut diverger pour des $u,v\in H^s$. — Contre-exemple : $(d,s)=(3,1)$, $p=6$ : $u=v=|x|^{-3/7}\chi$, avec $\chi\in C^\infty_c(\mathbb R^3)$ égale à $1$ près de $0$, sont dans $H^1(\mathbb R^3)$ car $\frac37<\frac12$, et $\int|u|^6|v|=\int|x|^{-3}\chi^7\,dx=+\infty$.
- `h-g` (nécessaire) : Un terme constant exige $v\in L^1$, ce que $H^s(\mathbb R^d)$ ne garantit pas. — Contre-exemple : $g\equiv 1$ et $v=(1+|x|^2)^{-d/2}\in H^s(\mathbb R^d)$ : $\int g(u)v=+\infty$.

Calculs fermés : [{"kind":"rational","prompt":"Pour $(d,s)=(3,\\frac12)$, valeur de $2^*$.","expected":"3"}]

Solution :
**Injections disponibles.** L'injection critique $\|w\|_{L^{2^*}}\le S\|w\|_{H^s}$ est admise : elle relève d'un résultat supplémentaire de théorie des intégrales singulières (polycopié, p. PDF 19), et ne se déduit pas de Cauchy–Schwarz. Avec $\|w\|_{L^2}\le\|w\|_{H^s}$ et Hölder dans les espaces de Lebesgue, $\|w\|_{L^q}\le S^\lambda\|w\|_{H^s}$ pour tout $q\in[2,2^*]$.

**Monômes.** Pour $1\le k\le p$, on a $2\le k+1\le 2^*$. Hölder d'exposants $\frac{k+1}{k}$ et $k+1$ :
$$\int|u|^k|v|\le\|u\|^k_{L^{k+1}}\|v\|_{L^{k+1}}\le C^{k+1}_{k+1}\|u\|^k_{H^s}\|v\|_{H^s}.$$
En sommant, $v\mapsto\int g(u)v$ est linéaire et continue sur $H^s$ ; par dualité, $g(u)\in H^{-s}$, avec $\|g(u)\|_{H^{-s}}\le\sum_k|a_k|C^{k+1}_{k+1}\|u\|^k_{H^s}$.

**Cas $(d,s)=(3,1)$.** $2^*=6$, donc $p\le5$ : par exemple $u^3$ et $u^5$ sont admissibles dans $H^{-1}(\mathbb R^3)$.

**Optimalité.** Pour $g(t)=t^p$, $u=e^{-|x|^2}$ et $u_\lambda=u(\lambda\cdot)$ avec $\lambda\ge1$ : $\int u_\lambda^{p+1}=\lambda^{-d}\int u^{p+1}$ et $\|u_\lambda\|^2_{H^s}\le\lambda^{2s-d}\|u\|^2_{H^s}$. Une majoration $\|g(w)\|_{H^{-s}}\le C\|w\|^p_{H^s}$ donnerait $\int u_\lambda^{p+1}\le C\|u_\lambda\|^{p+1}_{H^s}$, soit $\lambda^{\frac{(d-2s)(p+1)}{2}-d}\le C'$ pour tout $\lambda\ge1$, ce qui exige $p+1\le 2^*$. Pour $(d,s)=(3,1)$ et $p=6$, on a même $\int|u|^6|v|=+\infty$ pour $u=v=|x|^{-3/7}\chi$.

**Pièges.** Le terme constant doit être absent sur $\mathbb R^d$ ; et l'on ne peut pas placer tous les monômes dans $L^{(2^*)'}$, puisque $H^s\not\subset L^q$ pour $q<2$.

Indices :
1. Dans quel espace le terme $g(u)$ doit-il vivre pour que la formulation faible ait un sens, et quelles intégrabilités de $u$ fournit $H^s(\mathbb R^d)$ ?
2. Traite les monômes un par un : pour $u^kv$, choisis des exposants de Hölder qui ne font intervenir que des $L^q$ avec $q\in[2,2^*]$.
3. Avec les exposants $\frac{k+1}{k}$ et $k+1$, tout se ramène à $\|u\|_{L^{k+1}}$ et $\|v\|_{L^{k+1}}$, contrôlés si $k+1\le 2^*$. Pour l'optimalité, dilate une gaussienne.

Erreurs fréquentes :
- Prétendre obtenir l'injection critique par Cauchy–Schwarz sur la transformée de Fourier.
- Placer tous les monômes dans $L^{(2^*)'}$, alors que $H^s\not\subset L^q$ pour $q<2$.
- Oublier qu'un terme constant n'agit pas sur $H^s(\mathbb R^d)$.

Variante : Pour quelles dimensions $d\ge 3$ l'application $u\mapsto u^3$ envoie-t-elle $H^1(\mathbb R^d)$ dans $H^{-1}(\mathbb R^d)$, avec $\|u^3\|_{H^{-1}}\le C\|u\|^3_{H^1}$ ?

Solution de la variante : Ici $s=1$, $2^*=\frac{2d}{d-2}$ et $p=3$. La condition $4\le\frac{2d}{d-2}$ équivaut à $d\le 4$. Pour $d\in\{3,4\}$, Hölder d'exposants $\frac43$ et $4$ donne $\int|u|^3|v|\le\|u\|^3_{L^4}\|v\|_{L^4}\le C\|u\|^3_{H^1}\|v\|_{H^1}$. Pour $d\ge5$, l'argument de dilatation montre qu'aucune telle majoration n'est possible.

Vérification : {"origin":"complement","review":"machine","notes":"L’injection critique est admise, comme au polycopié (p. PDF 19) ; le reste est un complément."}