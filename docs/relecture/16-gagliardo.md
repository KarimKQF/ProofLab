# 16. Gagliardo (`gagliardo`) — polycopié p. PDF 18, section 4.4

## Fiche

Espaces : $u\in L^2(\mathbb R^d)$ et $0<s<1$. | $[u]^2_{H^s}$ : intégrale double d'une fonction positive, à valeurs dans $[0,+\infty]$. | $\hat u$ : transformée de Fourier unitaire de $u$ dans $L^2(\mathbb R^d)$ ; $H^s(\mathbb R^d)$ défini par le poids $(1+|\xi|^2)^{s/2}$.

Hypothèses :
- $0<s<1$. — Sans elle : Pour $s=1$, la constante est infinie (divergence en $0$ de $\int_0 r^{-1}\,dr$) ; pour $s=0$, elle est infinie par divergence à l'infini.
- $u\in L^2(\mathbb R^d)$. — Sans elle : $u\equiv 1$ a une séminorme nulle mais n'appartient pas à $L^2(\mathbb R^d)$ : la caractérisation de $H^s$ exige $u\in L^2$.

Énoncé : Pour $0<s<1$ et $u\in L^2(\mathbb R^d)$,
$$[u]^2_{H^s}=\int_{\mathbb R^d}\int_{\mathbb R^d}\frac{|u(x)-u(y)|^2}{|x-y|^{d+2s}}\,dx\,dy=C_{d,s}\int_{\mathbb R^d}|\xi|^{2s}|\hat u(\xi)|^2\,d\xi,$$
où $C_{d,s}\in]0,+\infty[$ dépend de la normalisation. En conséquence, $u\in H^s$ si et seulement si $u\in L^2$ et $[u]_{H^s}<\infty$.

Bilan : {"autre":"Identité dans $[0,+\\infty]$ entre l'intégrale des différences et l'intégrale de Fourier ; caractérisation de $H^s(\\mathbb R^d)$, $0<s<1$, par $u\\in L^2$ et $[u]_{H^s}<\\infty$, grâce à $(1+|\\xi|^2)^s\\le 1+|\\xi|^{2s}\\le 2(1+|\\xi|^2)^s$."}

Preuve dans le polycopié : complete

Plan :
1. Poser $h=y-x$ : $[u]^2_{H^s}=\int|h|^{-d-2s}\|u(\cdot+h)-u\|^2_{L^2}\,dh$.
2. Plancherel : $\|u(\cdot+h)-u\|^2_{L^2}=\int|e^{i\xi\cdot h}-1|^2|\hat u(\xi)|^2\,d\xi$.
3. Tonelli : intervertir les intégrales en $h$ et en $\xi$.
4. Rotation et changement d'échelle $z=|\xi|h$ : l'intégrale intérieure vaut $C_{d,s}|\xi|^{2s}$.
5. Constante finie : le numérateur est au plus $|z|^2$ près de l'origine, et borné à l'infini.

Vigilance :
- L'exposant du dénominateur est $d+2s$ ; le multiplicateur obtenu est $|\xi|^{2s}$, le jacobien $|\xi|^{-d}$ absorbant le reste.
- L'interversion relève de Tonelli : l'identité a lieu dans $[0,+\infty]$, sans intégrabilité supposée.
- $[u]_{H^s}$ est une séminorme : elle ne contrôle pas $\|u\|_{L^2}$, et la caractérisation exige $u\in L^2$.
- Les inégalités $0<s<1$ sont strictes : la constante est infinie en $s=0$ et en $s=1$.
- Sur un domaine borné, le laplacien fractionnaire spectral et les réalisations intégrales avec conditions extérieures ne coïncident pas en général.

Vérification : {"origin":"polycopie","review":"machine"}

Définition « Séminorme de Gagliardo » : Pour $0<s<1$ et $u\in L^2(\mathbb R^d)$ : $[u]^2_{H^s}=\iint\frac{|u(x)-u(y)|^2}{|x-y|^{d+2s}}\,dx\,dy\in[0,+\infty]$.

Définition « Laplacien fractionnaire sur $\mathbb R^d$ » : Pour $s\in]0,1[$ : $\widehat{(-\Delta)^su}(\xi)=|\xi|^{2s}\hat u(\xi)$. Sur $L^2(\mathbb R^d)$, son domaine maximal est $H^{2s}(\mathbb R^d)$ ; le domaine de la forme quadratique associée est $H^s(\mathbb R^d)$.

## Contre-exemple `ce-gagliardo-indicatrice` : Une indicatrice au cas limite
Assertion : $\mathbb 1_{]0,1[}$ est bornée à support compact, donc appartient à $H^{1/2}(\mathbb R)$.
Tâche : Calcule $[\mathbb 1_{]0,1[}]^2_{H^{1/4}(\mathbb R)}$ ; la même formule diverge en $s=\frac12$.
Vérification : {"kind":"rational","prompt":"Valeur de $[\\mathbb 1_{]0,1[}]^2_{H^{1/4}(\\mathbb R)}$","expected":"16"}
Explication : $[\mathbb 1_{]0,1[}]^2_{H^s}=2\int_0^1\frac{x^{-2s}+(1-x)^{-2s}}{2s}\,dx=\frac{2}{s(1-2s)}$ pour $s<\frac12$, soit $16$ pour $s=\frac14$ ; pour $s=\frac12$, $\int_0^1x^{-1}\,dx=+\infty$. Côté Fourier, $|\xi|\,|\hat u(\xi)|^2=\frac{2-2\cos\xi}{2\pi|\xi|}$ n'est pas intégrable à l'infini.

## Contre-exemple `ce-gagliardo-dilatation` : La séminorme ne contrôle pas la norme
Assertion : Il existe $C>0$ tel que $\|u\|_{L^2}\le C[u]_{H^{1/2}(\mathbb R)}$ pour tout $u\in H^{1/2}(\mathbb R)$.
Tâche : Pour $u_\lambda=u(\cdot/\lambda)$, on a $[u_\lambda]^2_{H^s(\mathbb R^d)}=\lambda^{\beta}[u]^2_{H^s(\mathbb R^d)}$ avec $\beta=d-2s$. Donne $\beta$ pour $d=1$ et $s=\frac12$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\beta$","expected":"0"}
Explication : Le changement de variables $(x,y)=(\lambda x',\lambda y')$ donne $[u_\lambda]^2_{H^s}=\lambda^{2d}\lambda^{-d-2s}[u]^2_{H^s}=\lambda^{d-2s}[u]^2_{H^s}$, soit $\lambda^0$ pour $d=1$, $s=\frac12$. Or $\|u_\lambda\|^2_{L^2}=\lambda\|u\|^2_{L^2}\to+\infty$ : aucune constante ne convient.

## Exercice facile `gagliardo.facile` : La séminorme de $H^{1/2}(\mathbb R)$

Énoncé : On se place en dimension $d=1$, avec $s=\frac12$. Écrire exactement la séminorme $[u]^2_{H^{1/2}(\mathbb R)}$ de $u\in L^2(\mathbb R)$ et sa forme de Fourier. Montrer ensuite qu'aucune constante $C$ ne vérifie $\|w\|_{L^2}\le C\,[w]_{H^{1/2}(\mathbb R)}$ pour tout $w\in H^{1/2}(\mathbb R)$ : la séminorme seule ne remplace pas la norme de $H^{1/2}(\mathbb R)$.
Source : {"doc":"polycopie","pdfPage":41,"label":"Exercice 16, facile ; énoncé de Gagliardo, section 4.4 (p. PDF 18)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-u` (hypothese) : $u\in L^2(\mathbb R)$.
- `d-gen` (definition) : Pour $0<s<1$ et $v\in L^2(\mathbb R^d)$ : $[v]^2_{H^s}=\displaystyle\iint_{\mathbb R^d\times\mathbb R^d}\frac{|v(x)-v(y)|^2}{|x-y|^{d+2s}}\,dx\,dy\in[0,+\infty]$.
- `d-par` (definition) : On prend $d=1$ et $s=\frac12$.
- `c-exp` (egalite, calcul rational) : L'exposant du dénominateur vaut $d+2s=2$.
  - valeur attendue : "2"
- `c-form` (egalite) : $[u]^2_{H^{1/2}(\mathbb R)}=\displaystyle\iint_{\mathbb R^2}\frac{|u(x)-u(y)|^2}{|x-y|^2}\,dx\,dy$.
- `t-four` (application-theoreme) : $[u]^2_{H^{1/2}(\mathbb R)}=C_{1,1/2}\displaystyle\int_{\mathbb R}|\xi|\,|\hat u(\xi)|^2\,d\xi$ dans $[0,+\infty]$, avec $C_{1,1/2}\in]0,+\infty[$ ; et $u\in H^{1/2}(\mathbb R)$ si et seulement si $[u]_{H^{1/2}(\mathbb R)}<+\infty$.
- `d-dil` (definition, locale) : Soient $v\in H^{1/2}(\mathbb R)$ non nulle, $\lambda>0$ et $v_\lambda(x)=v(x/\lambda)$.
- `c-l2` (egalite) : $\|v_\lambda\|^2_{L^2}=\lambda\,\|v\|^2_{L^2}$.
- `c-inv` (egalite) : $[v_\lambda]^2_{H^{1/2}(\mathbb R)}=[v]^2_{H^{1/2}(\mathbb R)}$.
- `c-contra` (contradiction) : Si l'on avait $\|w\|_{L^2}\le C\,[w]_{H^{1/2}}$ pour tout $w\in H^{1/2}(\mathbb R)$, on aurait $\lambda\|v\|^2_{L^2}\le C^2[v]^2_{H^{1/2}}<+\infty$ pour tout $\lambda>0$ : c'est impossible, car $v\neq 0$.
- `fin` (conclusion) : $[u]^2_{H^{1/2}(\mathbb R)}=\iint_{\mathbb R^2}\frac{|u(x)-u(y)|^2}{|x-y|^2}\,dx\,dy=C_{1,1/2}\int_{\mathbb R}|\xi||\hat u|^2\,d\xi$. Cette séminorme, invariante par dilatation, ne contrôle pas $\|u\|_{L^2}$ : elle ne remplace pas la norme de $H^{1/2}(\mathbb R)$.
- `x-exp32` (egalite, DISTRACTEUR) : $[u]^2_{H^{1/2}(\mathbb R)}=\displaystyle\iint_{\mathbb R^2}\frac{|u(x)-u(y)|^2}{|x-y|^{3/2}}\,dx\,dy$.
- `x-exp1` (egalite, DISTRACTEUR) : $[u]^2_{H^{1/2}(\mathbb R)}=\displaystyle\iint_{\mathbb R^2}\frac{|u(x)-u(y)|^2}{|x-y|}\,dx\,dy$.
- `x-borne` (inegalite, DISTRACTEUR) : Il existe $C>0$ tel que $\|w\|_{L^2}\le C\,[w]_{H^{1/2}(\mathbb R)}$ pour tout $w\in H^{1/2}(\mathbb R)$.

Règles :
- `d-par` ⟹ `c-exp` par « Calcul direct de $d+2s$. »
- `d-gen` + `c-exp` + `h-u` ⟹ `c-form` par « Substitution de $d$ et de l'exposant dans la définition générale. »
- `h-u` + `d-par` ⟹ `t-four` par « Théorème de Gagliardo. [gagliardo] »
- `d-dil` ⟹ `c-l2` par « Changement de variable $x=\lambda x'$ dans $\int_{\mathbb R}|v(x/\lambda)|^2\,dx$. »
- `d-dil` + `c-form` ⟹ `c-inv` par « Changement de variables $(x,y)=(\lambda x',\lambda y')$ : jacobien $\lambda^2$, dénominateur $\lambda^2|x'-y'|^2$. »
- `c-l2` + `c-inv` + `t-four` ⟹ `c-contra` par « $v_\lambda\in L^2$ et $[v_\lambda]<+\infty$, donc $v_\lambda\in H^{1/2}$ ; puis $\lambda\to+\infty$ avec $\|v\|_{L^2}>0$. »
- `c-form` + `t-four` + `c-contra` ⟹ `fin` par « Réunion : formule exacte, forme de Fourier, défaut de contrôle de la norme. »

Justifications sans règle (séduisantes ou fausses) : « Le changement de variables $(x,y)=(\lambda x',\lambda y')$ a pour jacobien $\lambda$. »

Pièges :
- `c-inv` par « Le changement de variables $(x,y)=(\lambda x',\lambda y')$ a pour jacobien $\lambda$. » → incorrect [calcul-exact] : Deux variables changent : le jacobien vaut $\lambda^2$. Avec $\lambda$, on obtiendrait à tort $[v_\lambda]^2=\lambda^{-1}[v]^2$.
- `x-exp32` → incorrect [gagliardo-exposant] : L'exposant est $d+2s$, et non $d+s$ : avec $|x-y|^{3/2}$, on écrit la séminorme de $H^{1/4}(\mathbb R)$. — Contre-exemple : Pour $u=\mathbb 1_{]0,1[}$, l'intégrale avec $|x-y|^{3/2}$ vaut $16$, alors que $[u]^2_{H^{1/2}(\mathbb R)}=+\infty$ : $\int_0^1\big(x^{-1}+(1-x)^{-1}\big)dx$ diverge.
- `x-exp1` → incorrect [gagliardo-exposant] : Cet exposant oublie la dimension : $2s$ au lieu de $d+2s$. L'intégrale obtenue est infinie pour toute $u\in L^2(\mathbb R)$ non nulle. — Contre-exemple : En posant $y=x+h$, l'intégrale vaut $\int_{\mathbb R}\|u(\cdot+h)-u\|^2_{L^2}\frac{dh}{|h|}$ ; or $\|u(\cdot+h)-u\|^2_{L^2}\to 2\|u\|^2_{L^2}>0$ quand $|h|\to+\infty$, et $\int^{+\infty}\frac{dh}{h}=+\infty$.
- `x-borne` → incorrect [gagliardo-seminorme] : La séminorme est invariante par dilatation en dimension $1$ pour $s=\frac12$, alors que la norme $L^2$ ne l'est pas : aucune constante ne convient. — Contre-exemple : Pour $v\in H^{1/2}(\mathbb R)$ non nulle et $v_\lambda=v(\cdot/\lambda)$ : $\|v_\lambda\|^2_{L^2}=\lambda\|v\|^2_{L^2}\to+\infty$, tandis que $[v_\lambda]_{H^{1/2}}=[v]_{H^{1/2}}$.

Retraits :
- `h-u` (nécessaire) : La caractérisation de $H^{1/2}$ par la séminorme exige $u\in L^2$ : la séminorme seule ne voit pas les constantes. — Contre-exemple : $u\equiv 1$ vérifie $[u]_{H^{1/2}(\mathbb R)}=0$, mais $u\notin L^2(\mathbb R)$, donc $u\notin H^{1/2}(\mathbb R)$.

Calculs fermés : [{"kind":"rational","prompt":"Valeur exacte de $C_{1,1/2}/\\pi$, où $C_{1,1/2}=\\int_{\\mathbb R}\\frac{|e^{iz}-1|^2}{z^2}\\,dz$.","expected":"2"}]

Solution :
**Formule.** Pour $d=1$ et $s=\frac12$, l'exposant vaut $d+2s=2$ :
$$[u]^2_{H^{1/2}(\mathbb R)}=\iint_{\mathbb R^2}\frac{|u(x)-u(y)|^2}{|x-y|^2}\,dx\,dy\in[0,+\infty].$$
Le théorème de Gagliardo donne $[u]^2_{H^{1/2}}=C_{1,1/2}\int_{\mathbb R}|\xi||\hat u(\xi)|^2\,d\xi$, avec $C_{1,1/2}=\int_{\mathbb R}\frac{2-2\cos z}{z^2}\,dz=2\pi$ (intégration par parties, puis $\int_0^{+\infty}\frac{\sin z}{z}\,dz=\frac\pi2$), et $u\in H^{1/2}(\mathbb R)$ si et seulement si $u\in L^2$ et $[u]_{H^{1/2}}<+\infty$.

**Dilatations.** Pour $v\in H^{1/2}(\mathbb R)$ non nulle et $v_\lambda=v(\cdot/\lambda)$ : $\|v_\lambda\|^2_{L^2}=\lambda\|v\|^2_{L^2}$, et le changement de variables $(x,y)=(\lambda x',\lambda y')$, de jacobien $\lambda^2$, donne $[v_\lambda]^2=[v]^2$. Une inégalité $\|w\|_{L^2}\le C[w]_{H^{1/2}}$ donnerait $\lambda\|v\|^2_{L^2}\le C^2[v]^2$ pour tout $\lambda>0$, ce qui est absurde. La norme de $H^{1/2}$ contient donc nécessairement le terme $\|u\|_{L^2}$.

**Pièges d'exposant.** Avec $|x-y|^{3/2}$, on écrit la séminorme de $H^{1/4}$ ; avec $|x-y|$, l'intégrale est infinie pour toute $u\neq 0$.

Indices :
1. La définition générale fait intervenir $|x-y|^{d+2s}$ : que vaut cet exposant ici ? Que dit le théorème côté Fourier ?
2. Pour la seconde partie, cherche une famille de fonctions dont la séminorme reste fixe alors que la norme $L^2$ explose.
3. Prends $v_\lambda(x)=v(x/\lambda)$ : calcule $\|v_\lambda\|^2_{L^2}$ et $[v_\lambda]^2_{H^{1/2}}$ par changement de variables, puis fais tendre $\lambda$ vers $+\infty$.

Erreurs fréquentes :
- Écrire $|x-y|^{d+s}$ ou $|x-y|^{2s}$ au lieu de $|x-y|^{d+2s}$.
- Prendre la séminorme pour une norme équivalente à celle de $H^{1/2}$.
- Oublier qu'un changement de variables sur $\mathbb R^2$ a pour jacobien $\lambda^2$.

Variante : Soit $u=\mathbb 1_{]0,1[}\in L^2(\mathbb R)$. Déterminer les $s\in]0,1[$ tels que $u\in H^s(\mathbb R)$, et calculer $[u]^2_{H^{1/4}(\mathbb R)}$.

Solution de la variante : Hors d'un ensemble négligeable, $|u(x)-u(y)|^2$ vaut $1$ si exactement l'un des points $x,y$ est dans $]0,1[$, et $0$ sinon. Par Tonelli et symétrie,
$$[u]^2_{H^s}=2\int_0^1\int_{\mathbb R\setminus]0,1[}\frac{dy}{|x-y|^{1+2s}}\,dx=2\int_0^1\frac{x^{-2s}+(1-x)^{-2s}}{2s}\,dx.$$
Cette intégrale est finie si et seulement si $2s<1$, et vaut alors $\frac{2}{s(1-2s)}$. Comme $u\in L^2$, le théorème donne $u\in H^s(\mathbb R)\iff s<\frac12$. Pour $s=\frac14$ : $[u]^2_{H^{1/4}}=\frac{2}{\frac14\cdot\frac12}=16$. Le cas limite $s=\frac12$ est exclu : $\int_0^1x^{-1}\,dx=+\infty$.

Graphe de la variante :
But : `fin` — usage : application

Nœuds :
- `d-u` (definition) : $u=\mathbb 1_{]0,1[}\in L^2(\mathbb R)$ et $s\in]0,1[$.
- `e-sym` (egalite) : $[u]^2_{H^s}=2\displaystyle\int_0^1\int_{\mathbb R\setminus]0,1[}\frac{dy}{|x-y|^{1+2s}}\,dx$.
- `e-y` (egalite) : Pour $x\in]0,1[$ : $\displaystyle\int_{\mathbb R\setminus]0,1[}\frac{dy}{|x-y|^{1+2s}}=\frac{x^{-2s}+(1-x)^{-2s}}{2s}$.
- `e-val` (egalite) : $[u]^2_{H^s}=\frac1s\displaystyle\int_0^1\big(x^{-2s}+(1-x)^{-2s}\big)\,dx$, fini si et seulement si $s<\frac12$, et alors égal à $\frac{2}{s(1-2s)}$.
- `t-car` (application-theoreme) : Comme $u\in L^2(\mathbb R)$ : $u\in H^s(\mathbb R)\iff[u]_{H^s}<+\infty$.
- `c-rep` (consequence) : $u\in H^s(\mathbb R)$ si et seulement si $s<\frac12$.
- `c-val` (egalite, calcul rational) : $[u]^2_{H^{1/4}(\mathbb R)}=16$.
  - valeur attendue : "16"
- `fin` (conclusion) : $\mathbb 1_{]0,1[}\in H^s(\mathbb R)$ exactement pour $0<s<\frac12$, et $[\mathbb 1_{]0,1[}]^2_{H^{1/4}}=16$.
- `x-demi` (consequence, DISTRACTEUR) : $\mathbb 1_{]0,1[}\in H^{1/2}(\mathbb R)$, puisque la fonction est bornée et à support compact.
- `x-val` (egalite, DISTRACTEUR) : $[u]^2_{H^{1/4}(\mathbb R)}=8$.

Règles :
- `d-u` ⟹ `e-sym` par « $|u(x)-u(y)|^2=1$ si exactement un des points est dans $]0,1[$, $0$ sinon ; Tonelli et symétrie en $(x,y)$. [tonelli] »
- `d-u` ⟹ `e-y` par « Primitive de $t^{-1-2s}$ sur $[x,+\infty[$ et sur $[1-x,+\infty[$. »
- `e-sym` + `e-y` ⟹ `e-val` par « Report, puis intégrabilité de $x^{-2s}$ en $0$ si et seulement si $2s<1$. »
- `d-u` ⟹ `t-car` par « Théorème de Gagliardo (caractérisation de $H^s$). [gagliardo] »
- `e-val` + `t-car` ⟹ `c-rep` par « Combinaison de la caractérisation et du calcul. »
- `e-val` ⟹ `c-val` par « Évaluation de $\frac{2}{s(1-2s)}$ en $s=\frac14$. »
- `c-rep` + `c-val` ⟹ `fin` par « Réunion des deux résultats. »

Justifications sans règle (séduisantes ou fausses) : « $u$ est bornée à support compact, donc sa séminorme est finie pour tout $s\in]0,1[$. »

Pièges :
- `e-val` par « $u$ est bornée à support compact, donc sa séminorme est finie pour tout $s\in]0,1[$. » → incorrect [gagliardo-integrabilite] : La bornitude ne contrôle pas la singularité de $|x-y|^{-1-2s}$ près du saut : la finitude dépend de $s$. — Contre-exemple : Pour $s=\frac12$ : $\int_0^1x^{-1}\,dx=+\infty$, donc $[\mathbb 1_{]0,1[}]_{H^{1/2}}=+\infty$.
- `x-demi` → incorrect [gagliardo-integrabilite] : Le cas limite $s=\frac12$ est exclu : le saut de l'indicatrice rend l'intégrale divergente. — Contre-exemple : $\frac1s\int_0^1\big(x^{-2s}+(1-x)^{-2s}\big)dx$ diverge pour $s=\frac12$.
- `x-val` → incorrect [calcul-exact] : Le facteur $2$ vient de la symétrie : les couples avec $x\in]0,1[$, $y\notin]0,1[$ et ceux avec $x\notin]0,1[$, $y\in]0,1[$ contribuent autant.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `gagliardo.intermediaire` : Des différences $u(x+h)-u(x)$ au multiplicateur $|\xi|^{2s}$

Énoncé : Soient $0<s<1$ et $u\in L^2(\mathbb R^d)$. En partant des différences $u(x+h)-u(x)$, démontrer que $[u]^2_{H^s}=C_{d,s}\int_{\mathbb R^d}|\xi|^{2s}|\hat u(\xi)|^2\,d\xi$ dans $[0,+\infty]$, avec $C_{d,s}\in]0,+\infty[$ indépendante de $u$.
Source : {"doc":"polycopie","pdfPage":41,"label":"Exercice 16, intermédiaire ; démonstration de la section 4.4 (p. PDF 19)"} — prérequis : —

But : `fin` — usage : demonstration

Nœuds :
- `h-u` (hypothese) : $u\in L^2(\mathbb R^d)$.
- `h-s` (hypothese) : $0<s<1$.
- `d-gag` (definition) : $[u]^2_{H^s}=\displaystyle\iint_{\mathbb R^d\times\mathbb R^d}\frac{|u(x)-u(y)|^2}{|x-y|^{d+2s}}\,dx\,dy\in[0,+\infty]$ ; pour $h\in\mathbb R^d$, $\tau_hu=u(\cdot+h)$.
- `e-cdv` (egalite) : $[u]^2_{H^s}=\displaystyle\int_{\mathbb R^d}|h|^{-d-2s}\,\|\tau_hu-u\|^2_{L^2}\,dh$.
- `e-planch` (egalite) : Pour tout $h\in\mathbb R^d$ : $\|\tau_hu-u\|^2_{L^2}=\displaystyle\int_{\mathbb R^d}|e^{i\xi\cdot h}-1|^2\,|\hat u(\xi)|^2\,d\xi$.
- `e-tonelli` (egalite) : $[u]^2_{H^s}=\displaystyle\int_{\mathbb R^d}|\hat u(\xi)|^2\,\Phi(\xi)\,d\xi$, où $\Phi(\xi)=\displaystyle\int_{\mathbb R^d}\frac{|e^{i\xi\cdot h}-1|^2}{|h|^{d+2s}}\,dh\in[0,+\infty]$.
- `e-echelle` (egalite, calcul expr-equiv) : Pour $\xi\neq 0$ et $\omega=\xi/|\xi|$ : $\Phi(\xi)=|\xi|^{2s}\displaystyle\int_{\mathbb R^d}\frac{|e^{i\omega\cdot z}-1|^2}{|z|^{d+2s}}\,dz$.
  - valeur attendue : "2*s"
- `e-rot` (egalite) : L'intégrale en $z$ ne dépend pas de $\omega\in S^{d-1}$ ; on la note $C_{d,s}$, de sorte que $\Phi(\xi)=C_{d,s}|\xi|^{2s}$ pour $\xi\neq 0$.
- `e-cst` (inegalite) : $0<C_{d,s}<+\infty$.
- `fin` (conclusion) : $[u]^2_{H^s}=C_{d,s}\displaystyle\int_{\mathbb R^d}|\xi|^{2s}|\hat u(\xi)|^2\,d\xi$ dans $[0,+\infty]$, avec $C_{d,s}\in]0,+\infty[$ indépendante de $u$.
- `x-jac` (egalite, DISTRACTEUR) : Pour $\xi\neq 0$ : $\Phi(\xi)=|\xi|^{d+2s}\displaystyle\int_{\mathbb R^d}\frac{|e^{i\omega\cdot z}-1|^2}{|z|^{d+2s}}\,dz$.
- `x-sans-carre` (egalite, DISTRACTEUR) : $\|\tau_hu-u\|_{L^2}=\displaystyle\int_{\mathbb R^d}|e^{i\xi\cdot h}-1|\,|\hat u(\xi)|\,d\xi$.

Règles :
- `h-u` + `d-gag` ⟹ `e-cdv` par « Changement de variable $y=x+h$ à $x$ fixé, puis Tonelli : l'intégrande est positif. [tonelli] »
- `h-u` + `d-gag` ⟹ `e-planch` par « Plancherel appliqué à $\tau_hu-u$, avec $\widehat{\tau_hu}=e^{i\xi\cdot h}\hat u$ (calcul sur $\mathcal S$, puis densité dans $L^2$). [plancherel] »
- `e-cdv` + `e-planch` ⟹ `e-tonelli` par « Interversion des intégrales en $h$ et en $\xi$ d'une fonction mesurable positive. [tonelli] »
- `e-tonelli` ⟹ `e-echelle` par « Changement de variable $z=|\xi|h$ : $dh=|\xi|^{-d}dz$ et $|h|^{-d-2s}=|\xi|^{d+2s}|z|^{-d-2s}$. »
- `e-echelle` ⟹ `e-rot` par « Substitution $z=\rho z'$, où $\rho$ est une rotation envoyant $\omega$ sur $\omega'$ : $\omega'\cdot\rho z'=\omega\cdot z'$, $|\rho z'|=|z'|$, jacobien $1$. »
- `e-rot` + `h-s` ⟹ `e-cst` par « $|e^{it}-1|^2\le\min(t^2,4)$ : $|z|^{2-d-2s}$ est intégrable près de $0$ car $s<1$, $|z|^{-d-2s}$ à l'infini car $s>0$ ; l'intégrande est positif et non presque partout nul. »
- `e-tonelli` + `e-rot` + `e-cst` ⟹ `fin` par « Report de $\Phi(\xi)=C_{d,s}|\xi|^{2s}$, le point $\xi=0$ étant négligeable. »

Justifications sans règle (séduisantes ou fausses) : « Théorème de Fubini : on intervertit les deux intégrales. » ; « Théorème de Gagliardo. »

Pièges :
- `e-tonelli` par « Théorème de Fubini : on intervertit les deux intégrales. » → incorrect [gagliardo-identite] : Fubini exige l'intégrabilité de la fonction, inconnue a priori : c'est précisément ce que l'identité caractérise. Pour une fonction positive, Tonelli s'applique sans condition, dans $[0,+\infty]$. — Contre-exemple : Pour $d=1$, $s=\frac12$ et $u=\mathbb 1_{]0,1[}$, l'intégrale double vaut $+\infty$ : la fonction n'est pas intégrable, Fubini ne s'applique pas, Tonelli si.
- `x-jac` → incorrect [gagliardo-exposant] : Le jacobien du changement de variable $z=|\xi|h$ vaut $|\xi|^{-d}$ : il compense le $|\xi|^{d}$ de $|h|^{-d-2s}$, et il ne reste que $|\xi|^{2s}$. — Contre-exemple : Pour $u\in\mathcal S(\mathbb R)$ et $s=\frac12$, on obtiendrait $\int|\xi|^2|\hat u|^2=\|u'\|^2_{L^2}$, qui n'est pas invariant par la dilatation $u\mapsto u(\cdot/\lambda)$, alors que $[u]^2_{H^{1/2}(\mathbb R)}$ l'est.
- `x-sans-carre` → incorrect [gagliardo-identite] : Plancherel identifie des normes $L^2$, donc des intégrales de carrés : $\|\tau_hu-u\|^2_{L^2}=\int|e^{i\xi\cdot h}-1|^2|\hat u|^2$. — Contre-exemple : $d=1$, $\hat u=\mathbb 1_{[0,1]}$, $h=\pi$ : le membre de gauche vaut $\sqrt 2$, celui de droite $\int_0^12\sin(\pi\xi/2)\,d\xi=\frac4\pi$.

Retraits :
- `h-s` (nécessaire) : La constante $C_{d,s}$ n'est finie et non nulle que pour $0<s<1$ : la divergence a lieu en $0$ si $s\ge1$, à l'infini si $s\le 0$. — Contre-exemple : Pour $s=1$ : $|e^{iz_1}-1|^2\ge\frac{4}{\pi^2}z_1^2$ si $|z_1|\le\pi$, et $\int_{|z|\le\pi}z_1^2|z|^{-d-2}\,dz=+\infty$, donc $C_{d,1}=+\infty$.

Solution :
**Différences.** Avec $y=x+h$ à $x$ fixé puis Tonelli (intégrande positif) :
$$[u]^2_{H^s}=\int_{\mathbb R^d}|h|^{-d-2s}\,\|\tau_hu-u\|^2_{L^2}\,dh.$$

**Plancherel.** $\widehat{\tau_hu}=e^{i\xi\cdot h}\hat u$ (calcul sur $\mathcal S$, puis densité), donc $\|\tau_hu-u\|^2_{L^2}=\int|e^{i\xi\cdot h}-1|^2|\hat u(\xi)|^2\,d\xi$.

**Tonelli.** La fonction $(h,\xi)\mapsto|h|^{-d-2s}|e^{i\xi\cdot h}-1|^2|\hat u(\xi)|^2$ est mesurable positive : $[u]^2_{H^s}=\int|\hat u(\xi)|^2\Phi(\xi)\,d\xi$, avec $\Phi(\xi)=\int|e^{i\xi\cdot h}-1|^2|h|^{-d-2s}\,dh$. Fubini ne conviendrait pas : l'intégrabilité est inconnue a priori.

**Changement d'échelle et rotation.** Pour $\xi\neq0$, $z=|\xi|h$ donne $dh=|\xi|^{-d}dz$ et $|h|^{-d-2s}=|\xi|^{d+2s}|z|^{-d-2s}$, d'où $\Phi(\xi)=|\xi|^{2s}\int|e^{i\omega\cdot z}-1|^2|z|^{-d-2s}\,dz$ avec $\omega=\xi/|\xi|$. Une rotation envoyant $\omega$ sur $e_1$ montre que cette intégrale vaut $C_{d,s}=\int|e^{iz_1}-1|^2|z|^{-d-2s}\,dz$.

**Constante.** $|e^{it}-1|^2\le\min(t^2,4)$ : l'intégrande est majoré par $|z|^{2-d-2s}$ près de $0$ (intégrable car $s<1$) et par $4|z|^{-d-2s}$ à l'infini (intégrable car $s>0$). Il est positif et non nul presque partout, donc $0<C_{d,s}<+\infty$. Le point $\xi=0$ est négligeable, d'où l'identité.

Indices :
1. Transforme d'abord l'intégrale double en une intégrale en $h$ de normes $L^2$ : que devient une translation après transformée de Fourier ?
2. Après Plancherel, intervertis les intégrales en justifiant l'interversion, puis isole la fonction $\Phi(\xi)$ de la seule variable $\xi$.
3. Dans $\Phi(\xi)$, pose $z=|\xi|h$ : le jacobien $|\xi|^{-d}$ compense une partie de $|h|^{-d-2s}$. Une rotation rend l'intégrale restante indépendante de la direction de $\xi$.

Erreurs fréquentes :
- Invoquer Fubini sans intégrabilité : seul Tonelli s’applique ici, dans $[0,+\infty]$.
- Oublier le jacobien $|\xi|^{-d}$ et obtenir $|\xi|^{d+2s}$.
- Appliquer Plancherel à une intégrale de modules au lieu d'une intégrale de carrés.

Variante : Soient $0<s<2$ et $u\in L^2(\mathbb R^d)$. Montrer que $\iint\frac{|u(x+h)+u(x-h)-2u(x)|^2}{|h|^{d+2s}}\,dx\,dh=\tilde C_{d,s}\int|\xi|^{2s}|\hat u(\xi)|^2\,d\xi$ dans $[0,+\infty]$, avec $\tilde C_{d,s}\in]0,+\infty[$.

Solution de la variante : La transformée de $\tau_hu+\tau_{-h}u-2u$ est $(2\cos(\xi\cdot h)-2)\hat u$. Par Plancherel puis Tonelli, l'intégrale vaut $\int|\hat u(\xi)|^2\Psi(\xi)\,d\xi$, avec $\Psi(\xi)=\int(2-2\cos(\xi\cdot h))^2|h|^{-d-2s}\,dh$. Le changement d'échelle $z=|\xi|h$ et une rotation donnent $\Psi(\xi)=\tilde C_{d,s}|\xi|^{2s}$. Comme $(2-2\cos t)^2\le\min(t^4,16)$, la constante est finie dès que $4-2s>0$ et $s>0$ : la seconde différence autorise $s<2$.

Vérification : {"origin":"polycopie","review":"machine"}

## Exercice difficile `gagliardo.difficile` : Intégrabilité de l’intégrale radiale de la constante

Énoncé : Soient $d\ge 1$, $s\in\mathbb R$, et $C_{d,s}=\int_{\mathbb R^d}\frac{|e^{iz_1}-1|^2}{|z|^{d+2s}}\,dz\in[0,+\infty]$. Écrire cette constante comme une intégrale radiale et montrer que $C_{d,s}<+\infty$ si et seulement si $0<s<1$, en localisant la divergence dans chacun des cas exclus.
Source : {"doc":"polycopie","pdfPage":41,"label":"Exercice 16, difficile ; constante de la section 4.4 (p. PDF 19)"} — prérequis : —

But : `fin` — usage : demonstration

Nœuds :
- `d-C` (definition) : $C_{d,s}=\displaystyle\int_{\mathbb R^d}\frac{E(z_1)}{|z|^{d+2s}}\,dz\in[0,+\infty]$, où $E(t)=|e^{it}-1|^2=2-2\cos t$.
- `e-polaire` (egalite) : $C_{d,s}=\displaystyle\int_0^{+\infty}r^{-1-2s}F(r)\,dr$, où $F(r)=\displaystyle\int_{S^{d-1}}E(r\omega_1)\,d\sigma(\omega)$, $\sigma$ étant la mesure de surface (le comptage sur $\{\pm1\}$ si $d=1$).
- `e-encadre` (inegalite) : Avec $A=\int_{S^{d-1}}\omega_1^2\,d\sigma>0$ : $F(r)\le\min\big(Ar^2,4|S^{d-1}|\big)$ pour tout $r>0$, et $F(r)\ge\frac{4A}{\pi^2}r^2$ pour $0<r\le\pi$.
- `h-cas1` (definition, locale) : Cas $0<s<1$.
- `c-zero` (inegalite, calcul rational) : $\displaystyle\int_0^1r^{-1-2s}F(r)\,dr\le A\int_0^1r^{1-2s}\,dr=\frac{A}{2-2s}<+\infty$.
  - valeur attendue : "1"
- `c-inf` (inegalite, calcul rational) : $\displaystyle\int_1^{+\infty}r^{-1-2s}F(r)\,dr\le 4|S^{d-1}|\int_1^{+\infty}r^{-1-2s}\,dr=\frac{2|S^{d-1}|}{s}<+\infty$.
  - valeur attendue : "0"
- `c-cv` (inegalite) : Pour $0<s<1$ : $0<C_{d,s}\le\frac{A}{2-2s}+\frac{2|S^{d-1}|}{s}$.
- `h-cas2` (definition, locale) : Cas $s\ge 1$.
- `c-div0` (inegalite) : $\displaystyle\int_0^\pi r^{-1-2s}F(r)\,dr\ge\frac{4A}{\pi^2}\int_0^\pi r^{1-2s}\,dr=+\infty$ : divergence en $0$, et $C_{d,s}=+\infty$.
- `h-cas3` (definition, locale) : Cas $s\le 0$.
- `c-divinf` (inegalite) : $\displaystyle\int_1^{+\infty}r^{-1-2s}F(r)\,dr\ge\int_{S^{d-1}}\Big(\int_{|\omega_1|}^{+\infty}E(\rho)\,\frac{d\rho}{\rho}\Big)d\sigma(\omega)=+\infty$ : divergence à l'infini, et $C_{d,s}=+\infty$.
- `fin` (conclusion) : $C_{d,s}<+\infty$ si et seulement si $0<s<1$, et alors $C_{d,s}\in]0,+\infty[$. La divergence a lieu en $0$ pour $s\ge 1$, à l'infini pour $s\le 0$.
- `x-s1` (inegalite, DISTRACTEUR) : $C_{d,1}<+\infty$.
- `x-jac` (consequence, DISTRACTEUR) : Près de $0$, la condition de convergence est $2-d-2s>-1$.
- `x-osc` (inegalite, DISTRACTEUR) : $C_{d,0}<+\infty$ : le cosinus oscille et ses contributions se compensent à l'infini.

Règles :
- `d-C` ⟹ `e-polaire` par « Coordonnées polaires $z=r\omega$ : $dz=r^{d-1}dr\,d\sigma(\omega)$ et $|z|^{-d-2s}=r^{-d-2s}$ ; Tonelli. [tonelli] »
- `e-polaire` ⟹ `e-encadre` par « $E(t)=4\sin^2(t/2)$, avec $|\sin x|\le\min(|x|,1)$ et $|\sin x|\ge\frac{2}{\pi}|x|$ pour $|x|\le\frac\pi2$ ; intégration sur la sphère, où $|\omega_1|\le 1$. »
- `e-encadre` + `h-cas1` ⟹ `c-zero` par « Majoration $F(r)\le Ar^2$ sur $]0,1]$, puis intégrabilité de $r^{1-2s}$ en $0$. »
- `e-encadre` + `h-cas1` ⟹ `c-inf` par « Majoration $F(r)\le 4|S^{d-1}|$ sur $[1,+\infty[$, puis intégrabilité de $r^{-1-2s}$ à l'infini. »
- `c-zero` + `c-inf` + `e-polaire` + `e-encadre` ⟹ `c-cv` par « Somme des deux morceaux ; $F\ge 0$ et $F>0$ sur un ensemble de mesure positive. »
- `e-encadre` + `e-polaire` + `h-cas2` ⟹ `c-div0` par « Minoration $F(r)\ge\frac{4A}{\pi^2}r^2$ sur $]0,\pi]$, et $1-2s\le -1$. »
- `e-polaire` + `h-cas3` ⟹ `c-divinf` par « Pour $r\ge1$ et $s\le 0$, $r^{-1-2s}\ge r^{-1}$ ; Tonelli, puis $\rho=r|\omega_1|$ si $\omega_1\neq 0$. Sur $[(2k+\frac12)\pi,(2k+\frac32)\pi]$, $E\ge 2$ : minoration par $\sum_k\frac{2}{2k+3/2}=+\infty$ ; enfin $\sigma(\{\omega_1\neq 0\})>0$. »
- `c-cv` + `c-div0` + `c-divinf` ⟹ `fin` par « Réunion des trois cas. »

Justifications sans règle (séduisantes ou fausses) : « $F(r)\le 4|S^{d-1}|$ pour tout $r$, et $r^{-1-2s}$ est intégrable près de $0$. »

Pièges :
- `c-zero` par « $F(r)\le 4|S^{d-1}|$ pour tout $r$, et $r^{-1-2s}$ est intégrable près de $0$. » → incorrect [gagliardo-integrabilite] : La majoration par une constante est trop grossière près de $0$ : $\int_0^1r^{-1-2s}\,dr=+\infty$ dès que $s\ge 0$. Il faut utiliser $E(t)\le t^2$, qui fait gagner $r^2$.
- `x-s1` → incorrect [gagliardo-integrabilite] : En $s=1$, la minoration $F(r)\ge\frac{4A}{\pi^2}r^2$ laisse $\int_0 r^{-1}\,dr$, qui diverge : l'inégalité $s<1$ est stricte. — Contre-exemple : $\int_0^\pi r^{-3}F(r)\,dr\ge\frac{4A}{\pi^2}\int_0^\pi\frac{dr}{r}=+\infty$.
- `x-jac` → incorrect [gagliardo-exposant] : En coordonnées polaires, le jacobien $r^{d-1}$ s'ajoute : près de $0$, l'intégrande se comporte comme $r^{2-d-2s}\,r^{d-1}=r^{1-2s}$, d'où la condition $s<1$, indépendante de $d$. — Contre-exemple : Pour $d=3$, la condition proposée donnerait $s<0$ et exclurait tout $s\in]0,1[$, alors que $C_{3,1/2}<+\infty$.
- `x-osc` → incorrect [gagliardo-integrabilite] : $E\ge 0$ ne change pas de signe : il n'y a aucune compensation. $E\ge 2$ sur la moitié de chaque période, et $\int^{+\infty}\frac{d\rho}{\rho}$ diverge. — Contre-exemple : Pour $d=1$ : $\int_1^{+\infty}\frac{2-2\cos r}{r}\,dr\ge\sum_{k\ge1}\frac{2}{2k+3/2}=+\infty$.

Retraits :
- `h-cas1` (nécessaire) : La finitude de $C_{d,s}$ repose sur les deux inégalités strictes $s<1$ (en $0$) et $s>0$ (à l'infini). — Contre-exemple : Pour $s=1$, $C_{d,1}=+\infty$ (divergence en $0$) ; pour $s=0$, $C_{d,0}=+\infty$ (divergence à l'infini).

Calculs fermés : [{"kind":"rational","prompt":"Valeur exacte de $C_{1,1/2}/\\pi$.","expected":"2"}]

Solution :
**Forme radiale.** En coordonnées polaires $z=r\omega$ (Tonelli), $C_{d,s}=\int_0^{+\infty}r^{-1-2s}F(r)\,dr$ avec $F(r)=\int_{S^{d-1}}E(r\omega_1)\,d\sigma(\omega)$ et $E(t)=4\sin^2(t/2)$ ; pour $d=1$, $F(r)=2E(r)$.

**Encadrement.** De $|\sin x|\le\min(|x|,1)$ et $|\sin x|\ge\frac2\pi|x|$ sur $[-\frac\pi2,\frac\pi2]$ : $E(t)\le\min(t^2,4)$, et $E(t)\ge\frac4{\pi^2}t^2$ pour $|t|\le\pi$. Avec $A=\int\omega_1^2\,d\sigma>0$ et $|\omega_1|\le1$ : $F(r)\le\min(Ar^2,4|S^{d-1}|)$, et $F(r)\ge\frac{4A}{\pi^2}r^2$ pour $r\le\pi$.

**Cas $0<s<1$.** $\int_0^1r^{-1-2s}F\le\frac{A}{2-2s}$ et $\int_1^{+\infty}r^{-1-2s}F\le\frac{2|S^{d-1}|}{s}$ : $C_{d,s}$ est finie, et strictement positive car $F>0$ sur un ensemble de mesure positive.

**Cas $s\ge1$.** $\int_0^\pi r^{-1-2s}F\ge\frac{4A}{\pi^2}\int_0^\pi r^{1-2s}\,dr=+\infty$, car $1-2s\le-1$ : divergence en $0$.

**Cas $s\le0$.** Pour $r\ge1$, $r^{-1-2s}\ge r^{-1}$. Par Tonelli puis $\rho=r|\omega_1|$ (pour $\omega_1\neq0$, ensemble de mesure positive), on minore par $\int_{|\omega_1|}^{+\infty}E(\rho)\frac{d\rho}\rho$, qui vaut $+\infty$ : sur chaque $[(2k+\frac12)\pi,(2k+\frac32)\pi]$, $\cos\rho\le0$ donc $E\ge2$, et $\sum_k\frac{2}{2k+3/2}=+\infty$. Divergence à l'infini, sans compensation possible puisque $E\ge0$.

**Valeur pour $d=1$, $s=\frac12$.** $C_{1,1/2}=\int_{\mathbb R}\frac{2-2\cos z}{z^2}\,dz=2\pi$, par intégration par parties et $\int_0^{+\infty}\frac{\sin z}{z}\,dz=\frac\pi2$.

Indices :
1. La difficulté est double : en $0$ et à l'infini. Quelle est la taille de $|e^{it}-1|^2$ dans chacun de ces régimes ?
2. Passe en coordonnées polaires sans oublier $r^{d-1}$, majore la fonction radiale par $Ar^2$ près de $0$ et par une constante à l'infini, puis traite les deux cas exclus par des minorations.
3. Pour $s\le0$, minore $r^{-1-2s}$ par $r^{-1}$ et travaille rayon par rayon : sur la moitié de chaque période, $2-2\cos\rho\ge 2$.

Erreurs fréquentes :
- Oublier le jacobien $r^{d-1}$ des coordonnées polaires.
- Inclure les cas limites $s=0$ ou $s=1$ : les deux inégalités sont strictes.
- Croire que l’oscillation du cosinus fait converger l’intégrale à l’infini, alors que l’intégrande est positif.

Variante : Pour $d=1$, montrer que $C_{1,s}=2\int_0^{+\infty}\frac{2-2\cos r}{r^{1+2s}}\,dr$ pour $0<s<1$, puis calculer $C_{1,1/2}$.

Solution de la variante : Pour $d=1$, $S^0=\{\pm1\}$ et $E$ est paire : $C_{1,s}=\int_{\mathbb R}\frac{2-2\cos z}{|z|^{1+2s}}\,dz=2\int_0^{+\infty}\frac{2-2\cos r}{r^{1+2s}}\,dr$. Pour $s=\frac12$, une intégration par parties donne $\int_0^{+\infty}\frac{2-2\cos r}{r^2}\,dr=\Big[-\frac{2-2\cos r}{r}\Big]_0^{+\infty}+\int_0^{+\infty}\frac{2\sin r}{r}\,dr=\pi$, les termes de bord étant nuls ($2-2\cos r\le r^2$ en $0$, $\le 4$ à l'infini). Donc $C_{1,1/2}=2\pi$.

Vérification : {"origin":"complement","review":"machine","notes":"Les majorations (cas 0 < s < 1) suivent le polycopié, p. PDF 19 ; les minorations des cas exclus sont un complément."}