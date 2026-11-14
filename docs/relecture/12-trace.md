# 12. Théorème de trace (`trace`) — polycopié p. PDF 14, section 3.6

## Fiche

Espaces : $\Omega\subset\mathbb R^d$ : ouvert borné lipschitzien, de frontière $\partial\Omega$. | $H^1(\Omega)$, et $H^1_0(\Omega)$, adhérence de $C^\infty_c(\Omega)$ dans $H^1(\Omega)$. | $H^{1/2}(\partial\Omega)$ : espace des traces sur le bord. Pour $\Omega=]a,b[$, la frontière est $\{a,b\}$ et la trace s'identifie au couple des valeurs aux extrémités.

Hypothèses :
- $\Omega$ est borné.
- $\Omega$ est lipschitzien : son bord est localement le graphe d'une fonction lipschitzienne, $\Omega$ étant situé d'un seul côté. — Sans elle : Sur le carré fendu $]-1,1[^2\setminus\big([0,1[\times\{0\}\big)$, la fonction $\theta\,\chi(r)$, avec $\chi\in C^\infty_c(]0,1[)$ et $\chi(1/2)=1$, est dans $H^1$ et admet deux limites différentes de part et d'autre de la fente : la valeur au bord n'est plus univoque.

Énoncé : Si $\Omega\subset\mathbb R^d$ est borné lipschitzien, la restriction au bord se prolonge en une application linéaire continue surjective
$$\gamma:H^1(\Omega)\longrightarrow H^{1/2}(\partial\Omega),\qquad\ker\gamma=H^1_0(\Omega).$$
Il existe un relèvement linéaire continu de $H^{1/2}(\partial\Omega)$ vers $H^1(\Omega)$.

Bilan : {"existence":"$\\gamma u$ est défini pour tout $u\\in H^1(\\Omega)$ et prolonge la restriction au bord des fonctions régulières jusqu'au bord ; tout $g\\in H^{1/2}(\\partial\\Omega)$ est une trace.","stabilite":"$\\|\\gamma u\\|_{H^{1/2}(\\partial\\Omega)}\\le C\\|u\\|_{H^1(\\Omega)}$, et le relèvement $R$ vérifie $\\gamma Rg=g$ et $\\|Rg\\|_{H^1}\\le C_R\\|g\\|_{H^{1/2}(\\partial\\Omega)}$.","autre":"$\\ker\\gamma=H^1_0(\\Omega)$."}

Preuve dans le polycopié : idee

Plan :
1. Aplatir localement le bord à l’aide de cartes lipschitziennes.
2. Prouver l’estimation de trace sur un demi-espace, pour des fonctions régulières, puis prolonger par densité.
3. Recoller les représentations locales par une partition de l’unité.
4. Sur un intervalle, tout se démontre à la main : $|w(x)|\le\sqrt2\,\|w\|_{H^1}$, et le noyau s'obtient par primitives (exercices de ce résultat).

Vigilance :
- La valeur au bord d'une fonction $H^1$ est une trace Sobolev, non une évaluation ponctuelle arbitraire.
- Une classe de $L^2(\Omega)$ n'a pas de trace : la restriction au bord n'est pas continue pour la norme de $L^2$.
- L'image de $\gamma$ est $H^{1/2}(\partial\Omega)$, et non $L^2(\partial\Omega)$ : sur le disque unité, $\sum_{n\ge 1}\cos(n\theta)/n$ est de carré intégrable sans être une trace.
- Avec une donnée au bord non nulle, la solution n'est pas dans $H^1_0(\Omega)$ : on retranche un relèvement.

Vérification : {"origin":"polycopie","review":"machine","notes":"Énoncé du polycopié ; la démonstration n’y figure qu’en idée."}

Définition « Trace sur un intervalle » : Pour $w\in H^1(]0,1[)$, de représentant continu encore noté $w$ sur $[0,1]$, on pose $\gamma w=(w(0),w(1))$.

Définition « Relèvement » : Un relèvement est une application linéaire continue $R:H^{1/2}(\partial\Omega)\to H^1(\Omega)$ telle que $\gamma(Rg)=g$ pour tout $g\in H^{1/2}(\partial\Omega)$.

## Contre-exemple `ce-trace-L2` : Pas de trace sur $L^2$
Assertion : L'application $u\mapsto u(0)$, définie sur $C([0,1])$, est continue pour la norme de $L^2(]0,1[)$ : elle définit une trace sur $L^2$.
Tâche : Pour $u_n(x)=(1-nx)^+$, on a $u_n(0)=1$. Calcule $\|u_n\|_{L^2}^2$ pour $n=3$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\|u_3\\|_{L^2}^2$","expected":"1/9"}
Explication : $\|u_n\|_{L^2}^2=\int_0^{1/n}(1-nx)^2dx=\frac1{3n}\to 0$, alors que $u_n(0)=1$ : aucune constante $C$ ne vérifie $|u(0)|\le C\|u\|_{L^2}$.

## Contre-exemple `ce-trace-image` : L'image de la trace n'est pas $L^2(\partial\Omega)$
Assertion : Toute fonction de $L^2(\partial\Omega)$ est la trace d'une fonction de $H^1(\Omega)$.
Tâche : Pour $g(\theta)=\sum_{n\ge 1}a_n\cos(n\theta)$ avec $a_n=1/n$, calcule la somme partielle $S_4=\sum_{n=1}^4n\,a_n^2$.
Vérification : {"kind":"rational","prompt":"Valeur de $S_4$","expected":"25/12"}
Explication : $S_N=\sum_{n=1}^N1/n$ tend vers $+\infty$ : $g\notin H^{1/2}$, alors que $\sum_na_n^2<\infty$ donne $g\in L^2$. Sur le disque unité, $g$ n'est la trace d'aucune fonction de $H^1$.

## Exercice facile `trace.facile` : Une fonction de $H^1(]0,1[)$ à traces non nulles

Énoncé : On rappelle que toute fonction de $H^1(]0,1[)$ admet un unique représentant continu sur $[0,1]$, que sa trace aux deux extrémités est $\gamma w=(w(0),w(1))$, valeurs de ce représentant, et que $\ker\gamma=H^1_0(]0,1[)$. Soit $u(x)=1+x$ sur $]0,1[$. Montrer que $u\in H^1(]0,1[)$, calculer $\gamma u$, et en déduire que $u\notin H^1_0(]0,1[)$.
Source : {"doc":"polycopie","pdfPage":40,"label":"Exercice 12, facile"} — prérequis : distributions

But : `fin` — usage : application

Nœuds :
- `h-rep` (hypothese) : Tout $w\in H^1(]0,1[)$ admet un unique représentant continu sur $[0,1]$, noté encore $w$.
- `d-H1` (definition) : $H^1(]0,1[)=\{w\in L^2(]0,1[) : w'\in L^2(]0,1[)\}$, la dérivée étant prise au sens des distributions.
- `d-gamma` (definition) : $\gamma w=(w(0),w(1))$, valeurs du représentant continu de $w\in H^1(]0,1[)$.
- `d-u` (definition) : $u(x)=1+x$ pour $x\in]0,1[$.
- `u-c1` (consequence) : $u$ se prolonge en une fonction de classe $C^1$ sur $[0,1]$, de dérivée classique $u'=1$.
- `u-weak` (egalite) : La dérivée de $u$ au sens des distributions sur $]0,1[$ est la fonction constante $1$.
- `u-H1` (consequence) : $u\in H^1(]0,1[)$.
- `rep` (consequence) : La fonction continue $x\mapsto 1+x$, définie sur $[0,1]$, est le représentant continu de $u$.
- `tr` (egalite, calcul rational-vector) : $\gamma u=(1,2)$.
  - valeur attendue : ["1","2"]
- `non-H10` (consequence) : $u\notin H^1_0(]0,1[)$.
- `fin` (conclusion) : $u\in H^1(]0,1[)$ a des traces non nulles, $u(0)=1$ et $u(1)=2$ ; en particulier $u\notin H^1_0(]0,1[)$.
- `x-L2` (consequence, DISTRACTEUR) : Toute classe de $L^2(]0,1[)$ possède une valeur bien définie en $0$.
- `x-H1-H10` (consequence, DISTRACTEUR) : $H^1(]0,1[)=H^1_0(]0,1[)$, car $C^\infty_c(]0,1[)$ est dense dans $L^2(]0,1[)$.

Règles :
- `d-u` ⟹ `u-c1` par « Fonction polynomiale : dérivée classique sur l’intervalle fermé. »
- `u-c1` ⟹ `u-weak` par « Pour $\varphi\in C^\infty_c(]0,1[)$, intégration par parties sans terme de bord : $-\int_0^1u\varphi'=\int_0^1u'\varphi$. [distributions] »
- `u-c1` + `u-weak` + `d-H1` ⟹ `u-H1` par « $u$ et sa dérivée sont bornées sur l'intervalle borné $]0,1[$, donc de carré intégrable. »
- `u-c1` + `h-rep` ⟹ `rep` par « Une fonction continue sur $[0,1]$ égale à $u$ sur $]0,1[$ est le représentant continu, qui est unique. »
- `rep` + `d-gamma` + `d-u` ⟹ `tr` par « Évaluation du représentant continu aux deux extrémités. »
- `tr` + `u-H1` ⟹ `non-H10` par « Noyau de la trace : $\ker\gamma=H^1_0(]0,1[)$. [trace] »
- `u-H1` + `tr` + `non-H10` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « Les points $0$ et $1$ sont négligeables : on peut y fixer les valeurs à volonté. » ; « C’est évident. »

Pièges :
- `tr` par « Les points $0$ et $1$ sont négligeables : on peut y fixer les valeurs à volonté. » → incorrect [trace-ponctuelle] : La trace n'est pas une valeur choisie arbitrairement en un point négligeable : c'est la valeur du représentant continu, qui est unique. — Contre-exemple : Si l'on posait « $\gamma u=(0,0)$ », aucun représentant continu de $u$ ne prendrait ces valeurs : $1+x$ vaut $1$ en $0$.
- `u-H1` par « C’est évident. » → a-justifier [justification-absente] : L'appartenance à $H^1$ se vérifie : quelle est la dérivée au sens des distributions de $u$, et est-elle de carré intégrable ?
- `x-L2` → incorrect [trace-ponctuelle] : Une classe de $L^2$ est définie à un ensemble négligeable près : sa « valeur en $0$ » n'a pas de sens, et la fonction peut même être non bornée près de $0$. — Contre-exemple : $x\mapsto x^{-1/4}$ appartient à $L^2(]0,1[)$ (car $\int_0^1x^{-1/2}dx=2$) et n'a pas de limite finie en $0$.
- `x-H1-H10` → incorrect [densite-fermeture] : La densité dans $L^2$ ne dit rien de l'adhérence pour la norme de $H^1$ : $H^1_0(]0,1[)$ est un sous-espace fermé strict de $H^1(]0,1[)$. — Contre-exemple : $w=1$ appartient à $H^1(]0,1[)$, et $\gamma w=(1,1)\ne(0,0)$ : donc $w\notin H^1_0(]0,1[)$.

Retraits :
- `h-rep` (nécessaire) : En dimension $1$, la trace est la valeur du représentant continu. En dimension $d\ge 2$, une fonction de $H^1$ peut n'avoir aucun représentant continu : la trace n'est plus une évaluation ponctuelle. — Contre-exemple : Sur le disque $B(0,1/2)\subset\mathbb R^2$, $w(x)=\log\log(1/|x|)$ appartient à $H^1$, car $\int|\nabla w|^2=2\pi\int_0^{1/2}\frac{dr}{r\log^2(1/r)}=\frac{2\pi}{\log 2}$, et elle n'est pas bornée au voisinage de $0$.

Calculs fermés : [{"kind":"rational-vector","prompt":"Pour $w(x)=\\cos(\\pi x)$ : composantes de $\\gamma w$","expected":["1","-1"],"labels":["w(0)","w(1)"]}]

Solution :
**Appartenance à $H^1$.** $u(x)=1+x$ se prolonge en une fonction de classe $C^1$ sur $[0,1]$. Pour $\varphi\in C^\infty_c(]0,1[)$, l'intégration par parties ne produit aucun terme de bord : $-\int_0^1u\varphi'=\int_0^1\varphi$. La dérivée au sens des distributions est donc la constante $1$. Comme $u$ et $u'$ sont bornées sur l'intervalle borné $]0,1[$, elles sont de carré intégrable : $u\in H^1(]0,1[)$.

**Trace.** La fonction continue $x\mapsto 1+x$ sur $[0,1]$ est l'unique représentant continu de $u$. Donc $\gamma u=(u(0),u(1))=(1,2)$.

**Conséquence.** $\gamma u\ne(0,0)$ et $\ker\gamma=H^1_0(]0,1[)$ : $u\notin H^1_0(]0,1[)$.

**Point de vigilance.** La trace n'est pas une valeur fixée arbitrairement en un point négligeable : elle provient du représentant continu, et elle a un sens parce que $u\in H^1$. Une classe de $L^2$ n'a pas de valeur en $0$.

Indices :
1. Pour parler de $u(0)$ et $u(1)$, il faut savoir à quel espace appartient $u$ et quel représentant on évalue.
2. Calcule la dérivée au sens des distributions de $u$, vérifie l'appartenance à $H^1$, puis évalue le représentant continu en $0$ et en $1$.
3. $u'=1$ au sens des distributions, $u\in H^1(]0,1[)$, $\gamma u=(1,2)\neq(0,0)$ ; le noyau de $\gamma$ est $H^1_0(]0,1[)$.

Erreurs fréquentes :
- Attribuer une valeur en un point à une classe de $L^2$.
- Déduire $H^1=H^1_0$ de la densité de $C^\infty_c$ dans $L^2$.

Variante : Soit $v(x)=x^{3/4}$ sur $]0,1[$. Montrer que $v\in H^1(]0,1[)$, bien que $v$ ne soit pas de classe $C^1$ sur $[0,1]$, calculer $\gamma v$, et décider si $v\in H^1_0(]0,1[)$.

Solution de la variante : Pour $\varphi\in C^\infty_c(]0,1[)$, le support de $\varphi$ est contenu dans un segment $[a,b]\subset]0,1[$, sur lequel $v$ est de classe $C^1$ : l'intégration par parties donne $-\int_0^1v\varphi'=\int_0^1\tfrac34x^{-1/4}\varphi$. Donc $v'=\tfrac34x^{-1/4}$, qui est de carré intégrable car $\int_0^1x^{-1/2}dx=2$. Ainsi $v\in H^1(]0,1[)$. La fonction $x\mapsto x^{3/4}$ est continue sur $[0,1]$ : c'est le représentant continu, et $\gamma v=(0,1)$. Comme $\gamma v\ne(0,0)$, $v\notin H^1_0(]0,1[)$.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `trace.intermediaire` : $H^1_0(]0,1[)$ est le noyau de la trace aux deux extrémités

Énoncé : On rappelle que tout $w\in H^1(]0,1[)$ admet un unique représentant continu sur $[0,1]$, noté encore $w$, et que $w(y)-w(x)=\int_x^yw'$ pour tous $x,y\in[0,1]$. Soit $\gamma w=(w(0),w(1))$. Démontrer que $\gamma:H^1(]0,1[)\to\mathbb R^2$ est continue, puis que $\ker\gamma=H^1_0(]0,1[)$, où $H^1_0(]0,1[)$ est l'adhérence de $C^\infty_c(]0,1[)$ dans $H^1(]0,1[)$.
Source : {"doc":"polycopie","pdfPage":40,"label":"Exercice 12, intermédiaire"} — prérequis : distributions

But : `fin` — usage : demonstration

Nœuds :
- `d-H1` (definition) : Tout $w\in H^1(]0,1[)$ admet un unique représentant continu sur $[0,1]$, noté encore $w$, et $w(y)-w(x)=\int_x^yw'$ pour tous $x,y\in[0,1]$.
- `d-H10` (definition) : $H^1_0(]0,1[)$ est l'adhérence de $C^\infty_c(]0,1[)$ dans $H^1(]0,1[)$.
- `d-gamma` (definition) : $\gamma:H^1(]0,1[)\to\mathbb R^2$, $\gamma w=(w(0),w(1))$.
- `borne` (inegalite) : Pour tout $w\in H^1(]0,1[)$ et tout $x\in[0,1]$ : $|w(x)|\le\sqrt2\,\|w\|_{H^1}$.
- `cont` (consequence) : $\gamma$ est linéaire et continue de $H^1(]0,1[)$ dans $\mathbb R^2$.
- `s-dir` (definition, locale) : Soit $w\in H^1_0(]0,1[)$ et $(\varphi_n)\subset C^\infty_c(]0,1[)$ telle que $\varphi_n\to w$ dans $H^1(]0,1[)$.
- `gphi` (egalite) : $\gamma\varphi_n=(0,0)$ pour tout $n$.
- `gw` (egalite) : $\gamma w=\lim_n\gamma\varphi_n=(0,0)$.
- `dir` (inclusion) : $H^1_0(]0,1[)\subset\ker\gamma$.
- `s-rec` (definition, locale) : Soit $w\in H^1(]0,1[)$ tel que $\gamma w=(0,0)$.
- `int` (egalite) : $w(x)=\int_0^xw'$ pour tout $x\in[0,1]$, et $\int_0^1w'=0$.
- `approx` (consequence) : Il existe $\psi_n\in C^\infty_c(]0,1[)$ telles que $\psi_n\to w'$ dans $L^2(]0,1[)$.
- `correc` (consequence) : Pour $\theta\in C^\infty_c(]0,1[)$ d'intégrale $1$, les fonctions $\tilde\psi_n=\psi_n-\big(\int_0^1\psi_n\big)\theta$ sont dans $C^\infty_c(]0,1[)$, d'intégrale nulle, et $\tilde\psi_n\to w'$ dans $L^2$.
- `prim` (consequence) : $\varphi_n(x)=\int_0^x\tilde\psi_n$ définit $\varphi_n\in C^\infty_c(]0,1[)$.
- `conv` (inegalite) : $\varphi_n'=\tilde\psi_n\to w'$ dans $L^2$, et $\sup_{x\in[0,1]}|\varphi_n(x)-w(x)|\le\|\tilde\psi_n-w'\|_{L^2}$.
- `H1` (consequence) : $\varphi_n\to w$ dans $H^1(]0,1[)$ : $w\in H^1_0(]0,1[)$.
- `rec` (inclusion) : $\ker\gamma\subset H^1_0(]0,1[)$.
- `fin` (conclusion) : $\gamma$ est continue et $\ker\gamma=H^1_0(]0,1[)$.
- `x-L2-approx` (consequence, DISTRACTEUR) : Tout $w\in H^1(]0,1[)$ est limite dans $L^2$ de fonctions de $C^\infty_c(]0,1[)$ : donc $w\in H^1_0(]0,1[)$.
- `x-prim` (consequence, DISTRACTEUR) : Pour tout $\psi\in C^\infty_c(]0,1[)$, la primitive $x\mapsto\int_0^x\psi$ appartient à $C^\infty_c(]0,1[)$.

Règles :
- `d-H1` ⟹ `borne` par « $|w(x)|\le|w(y)|+\|w'\|_{L^2}$ pour tous $x,y$ ; on intègre en $y\in[0,1]$, puis $a+b\le\sqrt2\sqrt{a^2+b^2}$. [cauchy-schwarz] »
- `borne` + `d-gamma` ⟹ `cont` par « Une application linéaire bornée sur la boule unité est continue. »
- `s-dir` + `d-gamma` ⟹ `gphi` par « Une fonction de $C^\infty_c(]0,1[)$ est nulle au voisinage de $0$ et de $1$. »
- `gphi` + `cont` + `s-dir` ⟹ `gw` par « Continuité de $\gamma$ pour la norme de $H^1$, et convergence $\varphi_n\to w$ dans $H^1$. »
- `gw` ⟹ `dir` par « L'élément $w$ était arbitraire. »
- `s-rec` + `d-H1` ⟹ `int` par « Formule $w(x)-w(0)=\int_0^xw'$ et conditions $w(0)=w(1)=0$. »
- `s-rec` ⟹ `approx` par « Densité de $C^\infty_c(]0,1[)$ dans $L^2(]0,1[)$, appliquée à $w'\in L^2$. [densite-cinf] »
- `approx` + `int` ⟹ `correc` par « $|\int_0^1\psi_n|=|\int_0^1(\psi_n-w')|\le\|\psi_n-w'\|_{L^2}\to 0$, car $\int_0^1w'=0$. [cauchy-schwarz] »
- `correc` ⟹ `prim` par « $\tilde\psi_n$ est nulle près de $0$ et près de $1$, et d'intégrale nulle : sa primitive nulle en $0$ s'annule aussi près de $1$. »
- `prim` + `int` ⟹ `conv` par « $|\varphi_n(x)-w(x)|=\big|\int_0^x(\tilde\psi_n-w')\big|\le\|\tilde\psi_n-w'\|_{L^2}$, par Cauchy–Schwarz. [cauchy-schwarz] »
- `conv` + `d-H10` ⟹ `H1` par « Convergence uniforme, donc dans $L^2$, des fonctions et convergence $L^2$ des dérivées ; définition de $H^1_0$ comme adhérence. »
- `H1` ⟹ `rec` par « L'élément $w$ était arbitraire. »
- `dir` + `rec` + `cont` ⟹ `fin` par « Double inclusion, et continuité déjà établie. »

Justifications sans règle (séduisantes ou fausses) : « Théorème de trace : $\ker\gamma=H^1_0$. » ; « Continuité de $\gamma$ pour la norme de $L^2(]0,1[)$. » ; « C’est évident. »

Pièges :
- `gw` par « Continuité de $\gamma$ pour la norme de $L^2(]0,1[)$. » → incorrect [trace-ponctuelle] : $\gamma$ n'est pas continue pour la norme de $L^2$ : c'est le contrôle par la norme de $H^1$ qui permet le passage à la limite. — Contre-exemple : $u_n(x)=(1-nx)^+$ vérifie $u_n(0)=1$ pour tout $n$, alors que $\|u_n\|_{L^2}^2=1/(3n)\to 0$.
- `prim` par « C’est évident. » → a-justifier [justification-absente] : Pourquoi la primitive s'annule-t-elle près de $1$ ? C'est précisément le rôle de la correction d'intégrale.
- `x-L2-approx` → incorrect [densite-fermeture] : $H^1_0(]0,1[)$ est l'adhérence pour la norme de $H^1$, non pour celle de $L^2$. Approcher dans $L^2$ ne contrôle ni les dérivées, ni les valeurs au bord. — Contre-exemple : $w=1$ est limite dans $L^2$ de fonctions de $C^\infty_c(]0,1[)$, mais $\gamma w=(1,1)\ne(0,0)$, donc $w\notin H^1_0(]0,1[)$.
- `x-prim` → incorrect [hypotheses-theoreme] : La primitive nulle en $0$ d'une fonction de $C^\infty_c(]0,1[)$ vaut, près de $1$, l'intégrale totale : elle n'est à support compact que si cette intégrale est nulle. — Contre-exemple : Si $\psi\ge 0$ et $\int_0^1\psi=1$, la primitive vaut $1$ au voisinage de $1$.

Retraits :
- `borne` (nécessaire) : Sans ce contrôle, la continuité de $\gamma$ et le passage à la limite $\gamma\varphi_n\to\gamma w$ disparaissent : la norme de $L^2$ seule ne contrôle pas les valeurs au bord. — Contre-exemple : $u_n(x)=(1-nx)^+$ : $u_n(0)=1$ et $\|u_n\|_{L^2}\to 0$.
- `s-rec` (nécessaire) : Sans traces nulles, la primitive corrigée ne peut plus approcher $w$ : $w(0)\ne 0$ ou $\int_0^1w'\ne 0$. — Contre-exemple : $w=1\in H^1(]0,1[)$ n'appartient pas à $H^1_0(]0,1[)$, puisque $\gamma w=(1,1)$ et $H^1_0(]0,1[)\subset\ker\gamma$.

Calculs fermés : [{"kind":"rational","prompt":"Pour $w(x)=x(1-x)$ : valeur de $\\|w\\|_{H^1}^2$","expected":"11/30"}]

Solution :
**Continuité.** Pour $w\in H^1(]0,1[)$ et $x,y\in[0,1]$, $|w(x)|\le|w(y)|+\int_0^1|w'|\le|w(y)|+\|w'\|_{L^2}$. En intégrant en $y\in[0,1]$ : $|w(x)|\le\|w\|_{L^2}+\|w'\|_{L^2}\le\sqrt2\,\|w\|_{H^1}$. L'application linéaire $\gamma$ est donc continue.

**$H^1_0\subset\ker\gamma$.** Si $\varphi_n\in C^\infty_c(]0,1[)$ converge vers $w$ dans $H^1$, alors $\gamma\varphi_n=(0,0)$, et par continuité $\gamma w=(0,0)$.

**$\ker\gamma\subset H^1_0$.** Soit $w\in H^1(]0,1[)$ avec $w(0)=w(1)=0$. Alors $w(x)=\int_0^xw'$ et $\int_0^1w'=0$. Choisissons $\psi_n\in C^\infty_c(]0,1[)$ avec $\psi_n\to w'$ dans $L^2$, et $\theta\in C^\infty_c(]0,1[)$ d'intégrale $1$. Comme $|\int_0^1\psi_n|\le\|\psi_n-w'\|_{L^2}\to 0$, les fonctions $\tilde\psi_n=\psi_n-(\int_0^1\psi_n)\theta$ sont dans $C^\infty_c(]0,1[)$, d'intégrale nulle, et tendent vers $w'$ dans $L^2$. Leur primitive $\varphi_n(x)=\int_0^x\tilde\psi_n$ s'annule près de $0$ et, l'intégrale totale étant nulle, près de $1$ : $\varphi_n\in C^\infty_c(]0,1[)$. Enfin $\varphi_n'\to w'$ dans $L^2$ et $|\varphi_n(x)-w(x)|\le\|\tilde\psi_n-w'\|_{L^2}$ uniformément : $\varphi_n\to w$ dans $H^1$, donc $w\in H^1_0(]0,1[)$.

**Point de vigilance.** Le théorème général de trace ne peut pas servir ici : c'est précisément son cas particulier que l'on démontre. La correction d'intégrale est indispensable.

Indices :
1. Deux inclusions sont à démontrer. Laquelle utilise la continuité de $\gamma$, et pour quelle norme ?
2. Pour $\ker\gamma\subset H^1_0$, approche plutôt $w'$ que $w$ : les primitives des approximations s'annulent en $0$, et il reste à les faire s'annuler près de $1$.
3. Corrige l'intégrale : $\tilde\psi_n=\psi_n-(\int_0^1\psi_n)\theta$ avec $\int\theta=1$. Alors $\varphi_n=\int_0^x\tilde\psi_n\in C^\infty_c(]0,1[)$ et $\sup|\varphi_n-w|\le\|\tilde\psi_n-w'\|_{L^2}$.

Erreurs fréquentes :
- Approcher $w$ dans $L^2$ seulement et conclure à $w\in H^1_0$.
- Oublier que la primitive d’une fonction test n’est à support compact que si son intégrale est nulle.
- Invoquer le théorème général de trace pour démontrer son cas particulier.

Variante : Soit $W=\{w\in H^1(]0,1[) : w(0)=0\}$. Montrer que $W$ est fermé dans $H^1(]0,1[)$ et qu'il est l'adhérence dans $H^1(]0,1[)$ de l'ensemble des $\varphi\in C^\infty([0,1])$ nulles au voisinage de $0$.

Solution de la variante : $W$ est le noyau de la forme linéaire $w\mapsto w(0)$, continue sur $H^1(]0,1[)$ car $|w(0)|\le\sqrt2\,\|w\|_{H^1}$ : il est fermé, et il contient les fonctions nulles près de $0$, donc leur adhérence. Réciproquement, pour $w\in W$, on choisit $\psi_n\in C^\infty_c(]0,1[)$ avec $\psi_n\to w'$ dans $L^2$, et on pose $\varphi_n(x)=\int_0^x\psi_n$ : $\varphi_n$ est de classe $C^\infty$ sur $[0,1]$, nulle près de $0$, et aucune correction d'intégrale n'est nécessaire puisqu'aucune condition n'est imposée en $1$. Comme $w(x)=\int_0^xw'$, on a $\sup|\varphi_n-w|\le\|\psi_n-w'\|_{L^2}$ et $\varphi_n'\to w'$ dans $L^2$ : $\varphi_n\to w$ dans $H^1$.

Vérification : {"origin":"complement","review":"machine"}

## Exercice difficile `trace.difficile` : Donnée de Dirichlet non homogène : relèvement

Énoncé : Soient $\Omega\subset\mathbb R^d$ un ouvert borné lipschitzien, $V=H^1_0(\Omega)$ muni de $\|v\|_V=\|\nabla v\|_{L^2}$, $f\in H^{-1}(\Omega)=V'$ et $g\in H^{1/2}(\partial\Omega)$. On cherche $u\in H^1(\Omega)$ tel que $\gamma u=g$ et $-\Delta u=f$ dans $\mathcal D'(\Omega)$. À l'aide d'un relèvement $G\in H^1(\Omega)$ de $g$, transformer ce problème en un problème pour l'inconnue de trace nulle $w=u-G\in V$. En déduire l'existence et l'unicité de $u$, son indépendance vis-à-vis du relèvement choisi, et une estimation $\|u\|_{H^1}\le C\big(\|f\|_{H^{-1}}+\|g\|_{H^{1/2}(\partial\Omega)}\big)$.
Source : {"doc":"polycopie","pdfPage":40,"label":"Exercice 12, difficile ; théorème de trace et relèvement (section 3.6, p. PDF 14)"} — prérequis : lax-milgram, poincare, distributions

But : `fin` — usage : application

Nœuds :
- `h-omega` (hypothese) : $\Omega\subset\mathbb R^d$ est un ouvert borné lipschitzien.
- `h-f` (hypothese) : $f\in H^{-1}(\Omega)=V'$.
- `h-g` (hypothese) : $g\in H^{1/2}(\partial\Omega)$.
- `d-V` (definition) : $V=H^1_0(\Omega)$, muni de $\|v\|_V=\|\nabla v\|_{L^2}$, et $a(w,v)=\int_\Omega\nabla w\cdot\nabla v$ pour $w,v\in V$.
- `d-pb` (definition) : $(P)$ : trouver $u\in H^1(\Omega)$ tel que $\gamma u=g$ et $-\Delta u=f$ dans $\mathcal D'(\Omega)$.
- `rel` (application-theoreme) : Il existe $G\in H^1(\Omega)$ tel que $\gamma G=g$ et $\|G\|_{H^1}\le C_R\|g\|_{H^{1/2}(\partial\Omega)}$ (on prend $G=Rg$).
- `poinc` (application-theoreme) : Il existe $C_P>0$ tel que $\|v\|_{L^2}\le C_P\|\nabla v\|_{L^2}$ pour tout $v\in V$ : $V$ est un espace de Hilbert pour $a$.
- `w-V` (consequence) : Si $u$ résout $(P)$, alors $w=u-G\in V$.
- `u-trace` (consequence) : Réciproquement, pour tout $w\in V$, $u=G+w$ appartient à $H^1(\Omega)$ et $\gamma u=g$.
- `L-cont` (inegalite) : $L(v)=\langle f,v\rangle-\int_\Omega\nabla G\cdot\nabla v$ définit $L\in V'$, avec $\|L\|_{V'}\le\|f\|_{V'}+\|\nabla G\|_{L^2}$.
- `form` (consequence) : Pour $u=G+w$ avec $w\in V$ : $-\Delta u=f$ dans $\mathcal D'(\Omega)$ si et seulement si $a(w,v)=L(v)$ pour tout $v\in V$.
- `a-ok` (consequence) : $|a(w,v)|\le\|w\|_V\|v\|_V$ et $a(w,w)=\|w\|_V^2$ : $a$ est continue et coercive sur $V$.
- `lm` (application-theoreme) : Il existe un unique $w\in V$ tel que $a(w,v)=L(v)$ pour tout $v\in V$, et $\|w\|_V\le\|L\|_{V'}$.
- `exist` (consequence) : $u=G+w$ résout $(P)$.
- `unic` (consequence) : $(P)$ admet au plus une solution.
- `indep` (consequence) : La solution de $(P)$ ne dépend pas du relèvement $G$ choisi.
- `estim` (inegalite) : $\|u\|_{H^1}\le C\big(\|f\|_{H^{-1}}+\|g\|_{H^{1/2}(\partial\Omega)}\big)$, où $C$ ne dépend que de $C_P$ et de $C_R$.
- `fin` (conclusion) : $(P)$ admet une unique solution $u=G+w$, indépendante du relèvement, avec $\|u\|_{H^1}\le C\big(\|f\|_{H^{-1}}+\|g\|_{H^{1/2}(\partial\Omega)}\big)$.
- `x-signe` (consequence, DISTRACTEUR) : Pour $u=G+w$ : $-\Delta u=f$ équivaut à $a(w,v)=\langle f,v\rangle+\int_\Omega\nabla G\cdot\nabla v$ pour tout $v\in V$.
- `x-G-H2` (consequence, DISTRACTEUR) : Le relèvement vérifie $\Delta G\in L^2(\Omega)$.
- `x-u-V` (consequence, DISTRACTEUR) : La solution $u$ de $(P)$ appartient à $H^1_0(\Omega)$.
- `x-coer-H1` (consequence, DISTRACTEUR) : On peut chercher $u$ directement dans $H^1(\Omega)$, où $a$ est coercive.

Règles :
- `h-omega` + `h-g` ⟹ `rel` par « Théorème de trace : existence d'un relèvement linéaire continu $R$ de $H^{1/2}(\partial\Omega)$ vers $H^1(\Omega)$. [trace] »
- `h-omega` + `d-V` ⟹ `poinc` par « Inégalité de Poincaré sur l'ouvert borné $\Omega$. [poincare] »
- `d-pb` + `rel` + `h-omega` ⟹ `w-V` par « Linéarité de $\gamma$ : $\gamma(u-G)=g-g=0$, et $\ker\gamma=H^1_0(\Omega)$. [trace] »
- `rel` + `d-V` ⟹ `u-trace` par « Linéarité de $\gamma$, et $\gamma w=0$ pour $w\in H^1_0(\Omega)$. [trace] »
- `h-f` + `rel` + `d-V` ⟹ `L-cont` par « Cauchy–Schwarz : $|\int_\Omega\nabla G\cdot\nabla v|\le\|\nabla G\|_{L^2}\|v\|_V$, et $f\in V'$. [cauchy-schwarz] »
- `d-V` + `rel` + `L-cont` ⟹ `form` par « Pour $\varphi\in C^\infty_c(\Omega)$ : $\langle-\Delta u,\varphi\rangle=\int_\Omega\nabla w\cdot\nabla\varphi+\int_\Omega\nabla G\cdot\nabla\varphi$ ; puis densité de $C^\infty_c(\Omega)$ dans $V$, les deux membres étant continus sur $V$. [distributions] »
- `d-V` + `poinc` ⟹ `a-ok` par « Cauchy–Schwarz, et définition de la norme de $V$. [cauchy-schwarz] »
- `poinc` + `a-ok` + `L-cont` ⟹ `lm` par « Théorème de Lax–Milgram. [lax-milgram] »
- `lm` + `form` + `u-trace` ⟹ `exist` par « La reformulation, appliquée à l'élément $w$ fourni par Lax–Milgram. »
- `w-V` + `form` + `lm` ⟹ `unic` par « Si $u_1,u_2$ résolvent $(P)$, alors $u_1-G$ et $u_2-G$ résolvent le même problème dans $V$ : unicité de Lax–Milgram. »
- `exist` + `unic` ⟹ `indep` par « Un autre relèvement $G'$ fournit une solution $G'+w'$ de $(P)$ : par unicité, c'est la même. »
- `lm` + `L-cont` + `rel` + `poinc` ⟹ `estim` par « $\|u\|_{H^1}\le\|G\|_{H^1}+\sqrt{1+C_P^2}\,\|w\|_V$, puis $\|w\|_V\le\|f\|_{V'}+\|\nabla G\|_{L^2}$ et $\|G\|_{H^1}\le C_R\|g\|_{H^{1/2}}$. »
- `exist` + `unic` + `indep` + `estim` ⟹ `fin` par « Réunion de l’existence, de l’unicité, de l’indépendance et de l’estimation. »

Justifications sans règle (séduisantes ou fausses) : « Comme $u=G$ en chaque point de $\partial\Omega$, la différence $u-G$ est nulle au bord. » ; « C’est évident. »

Pièges :
- `w-V` par « Comme $u=G$ en chaque point de $\partial\Omega$, la différence $u-G$ est nulle au bord. » → incorrect [trace-ponctuelle] : En dimension $d\ge 2$, une fonction de $H^1$ n'a pas de valeur ponctuelle au bord : l'égalité $\gamma u=\gamma G$ a lieu dans $H^{1/2}(\partial\Omega)$, et c'est $\ker\gamma=H^1_0(\Omega)$ qui conclut.
- `form` par « C’est évident. » → a-justifier [justification-absente] : La reformulation se démontre : écris $\langle-\Delta u,\varphi\rangle$ contre une fonction test, sépare les contributions de $w$ et de $G$, puis passe à tout $V$ par densité.
- `x-signe` → incorrect [trace-relevement] : Le terme de relèvement change de signe en passant à droite : $\int_\Omega\nabla w\cdot\nabla v=\langle f,v\rangle-\int_\Omega\nabla G\cdot\nabla v$. — Contre-exemple : $d=1$, $\Omega=]0,1[$, $f=0$, $g=(0,1)$, $G(x)=x^2$ : le bon signe donne $w=x-x^2$ et $u=x$ ; le signe faux donne $w=x^2-x$ et $u=2x^2-x$, qui ne vérifie pas $-u''=0$.
- `x-G-H2` → incorrect [trace-relevement] : Un relèvement n'est que dans $H^1(\Omega)$ : $\Delta G$ n'est en général qu'un élément de $H^{-1}(\Omega)$, d'où l'écriture faible $\int_\Omega\nabla G\cdot\nabla v$. — Contre-exemple : $d=1$, $\Omega=]0,1[$ : $G(x)=|x-1/2|$ relève $g=(1/2,1/2)$, appartient à $H^1(]0,1[)$, et $G''=2\delta_{1/2}\notin L^2$.
- `x-u-V` → incorrect [trace-relevement] : $\gamma u=g$ et $\ker\gamma=H^1_0(\Omega)$ : $u\in H^1_0(\Omega)$ si et seulement si $g=0$. C'est l'inconnue $w=u-G$ qui vit dans $H^1_0$. — Contre-exemple : $d=1$, $f=0$, $g=(0,1)$ : $u(x)=x$ et $\gamma u=(0,1)\neq(0,0)$.
- `x-coer-H1` → incorrect [hypotheses-theoreme] : $a$ n'est pas coercive sur $H^1(\Omega)$ : les constantes annulent $a(u,u)$. La coercivité n'a lieu que sur $H^1_0(\Omega)$, par Poincaré. — Contre-exemple : $u=1$ : $a(1,1)=0$, alors que $\|1\|_{H^1}^2=|\Omega|>0$.

Retraits :
- `h-g` (nécessaire) : L'image de $\gamma$ est exactement $H^{1/2}(\partial\Omega)$ : une donnée seulement de carré intégrable sur le bord peut n'être la trace d'aucune fonction de $H^1(\Omega)$. — Contre-exemple : Sur le disque unité, $g(\theta)=\sum_{n\ge 1}\cos(n\theta)/n$ est dans $L^2(\partial\Omega)$ car $\sum_n1/n^2<\infty$, mais pas dans $H^{1/2}(\partial\Omega)$ car $\sum_n n\cdot(1/n)^2=+\infty$ : aucun $u\in H^1$ n'a pour trace $g$.
- `h-omega` (nécessaire) : Le théorème de trace et l’inégalité de Poincaré reposent sur cette hypothèse. — Contre-exemple : Sur le carré fendu $]-1,1[^2\setminus\big([0,1[\times\{0\}\big)$, non lipschitzien, $u=\theta\,\chi(r)$ (angle $\theta\in]0,2\pi[$, $\chi\in C^\infty_c(]0,1[)$, $\chi(1/2)=1$) appartient à $H^1$ et tend vers $0$ au-dessus de la fente, vers $2\pi\chi(r)$ au-dessous : sa valeur au bord n'est pas univoque.

Calculs fermés : [{"kind":"rational","prompt":"Pour $d=1$, $\\Omega=]0,1[$, $f=2$ et $g=(1,3)$ : valeur de $u(1/2)$","expected":"9/4"}]

Solution :
**Relèvement.** Par le théorème de trace, il existe $G=Rg\in H^1(\Omega)$ avec $\gamma G=g$ et $\|G\|_{H^1}\le C_R\|g\|_{H^{1/2}}$.

**Changement d'inconnue.** Si $u$ résout $(P)$, alors $\gamma(u-G)=0$, donc $w=u-G\in\ker\gamma=H^1_0(\Omega)=V$. Réciproquement, pour $w\in V$, $u=G+w\in H^1(\Omega)$ et $\gamma u=g$.

**Équation pour $w$.** Pour $\varphi\in C^\infty_c(\Omega)$ : $\langle-\Delta u,\varphi\rangle=\int_\Omega\nabla u\cdot\nabla\varphi=\int_\Omega\nabla w\cdot\nabla\varphi+\int_\Omega\nabla G\cdot\nabla\varphi$. Donc $-\Delta u=f$ équivaut à $a(w,\varphi)=L(\varphi)$ pour tout $\varphi\in C^\infty_c(\Omega)$, avec $L(v)=\langle f,v\rangle-\int_\Omega\nabla G\cdot\nabla v$. Comme $|L(v)|\le(\|f\|_{V'}+\|\nabla G\|_{L^2})\|v\|_V$, $L\in V'$, et la densité de $C^\infty_c(\Omega)$ dans $V$ étend l'égalité à tout $v\in V$.

**Existence et unicité.** Par Poincaré, $V$ est un espace de Hilbert pour $a$, et $a$ est continue et coercive. Lax–Milgram donne un unique $w\in V$, avec $\|w\|_V\le\|L\|_{V'}$ ; $u=G+w$ résout $(P)$. Si $u_1,u_2$ sont solutions, $u_1-G$ et $u_2-G$ résolvent le même problème dans $V$, donc coïncident. Un autre relèvement fournit une autre écriture de la même solution.

**Estimation.** $\|u\|_{H^1}\le\|G\|_{H^1}+\sqrt{1+C_P^2}\,\|w\|_V\le C_R\|g\|_{H^{1/2}}+\sqrt{1+C_P^2}\big(\|f\|_{H^{-1}}+C_R\|g\|_{H^{1/2}}\big)$.

**Points de vigilance.** La condition $\gamma u=g$ n'est pas une égalité point par point ; $u$ n'est pas dans $H^1_0$ si $g\ne 0$ ; le terme de relèvement passe à droite avec un signe moins, sous forme faible.

Indices :
1. Lax–Milgram s'applique dans un espace de Hilbert où la forme est coercive : lequel ? L'inconnue $u$ y appartient-elle ?
2. Retranche un relèvement $G$ de $g$ : $w=u-G$ a une trace nulle. Écris l'équation satisfaite par $w$ contre $v\in H^1_0(\Omega)$.
3. $a(w,v)=\langle f,v\rangle-\int_\Omega\nabla G\cdot\nabla v$, second membre continu sur $H^1_0(\Omega)$ ; puis Lax–Milgram, et $u=G+w$.

Erreurs fréquentes :
- Se tromper de signe sur le terme de relèvement.
- Chercher $u$ dans $H^1_0(\Omega)$ alors que $g\ne 0$.
- Traiter $\gamma u=g$ comme une égalité point par point.
- Oublier de vérifier que la solution ne dépend pas du relèvement choisi.

Variante : Soient $f\in L^2(]0,1[)$ et $(\beta_0,\beta_1)\in\mathbb R^2$. À l'aide du relèvement affine $G(x)=\beta_0(1-x)+\beta_1x$, montrer que le problème : $u\in H^1(]0,1[)$, $u(0)=\beta_0$, $u(1)=\beta_1$ et $-u''=f$ dans $\mathcal D'(]0,1[)$, admet une unique solution.

Solution de la variante : $G$ est affine : $G\in H^1(]0,1[)$, $\gamma G=(\beta_0,\beta_1)$ et $G'$ est constante. Pour $v\in H^1_0(]0,1[)$, $\int_0^1G'v'=G'\big(v(1)-v(0)\big)=0$ : le terme de relèvement disparaît. Comme $\ker\gamma=H^1_0(]0,1[)$, $u=G+w$ résout le problème si et seulement si $w\in H^1_0(]0,1[)$ et $\int_0^1w'v'=\int_0^1fv$ pour tout $v\in H^1_0(]0,1[)$. Lax–Milgram (la forme est le produit scalaire de $H^1_0$ pour la norme $\|v'\|_{L^2}$, et $v\mapsto\int fv$ est continue) donne un unique $w$, donc une unique solution $u=G+w$.

Graphe de la variante :
But : `fin` — usage : application

Nœuds :
- `h-f` (hypothese) : $f\in L^2(]0,1[)$.
- `h-beta` (hypothese) : $(\beta_0,\beta_1)\in\mathbb R^2$.
- `d-V` (definition) : $V=H^1_0(]0,1[)$, muni de $\|v\|_V=\|v'\|_{L^2}$.
- `d-G` (definition) : $G(x)=\beta_0(1-x)+\beta_1x$.
- `G-prop` (consequence) : $G\in H^1(]0,1[)$, $\gamma G=(\beta_0,\beta_1)$ et $G'$ est constante.
- `G-orth` (egalite) : $\int_0^1G'v'=0$ pour tout $v\in V$.
- `red` (consequence) : $u=G+w$ résout le problème si et seulement si $w\in V$ et $\int_0^1w'v'=\int_0^1fv$ pour tout $v\in V$.
- `lm` (application-theoreme) : Il existe un unique $w\in V$ tel que $\int_0^1w'v'=\int_0^1fv$ pour tout $v\in V$.
- `fin` (conclusion) : Le problème admet une unique solution, $u=G+w$.
- `x-u-V` (consequence, DISTRACTEUR) : La solution $u$ appartient à $H^1_0(]0,1[)$.

Règles :
- `d-G` + `h-beta` ⟹ `G-prop` par « Fonction affine : dérivée constante, valeurs explicites aux extrémités. »
- `G-prop` + `d-V` ⟹ `G-orth` par « $G'$ est constante et $\int_0^1v'=v(1)-v(0)=0$ pour $v\in V$. »
- `G-prop` + `G-orth` + `d-V` ⟹ `red` par « Noyau de la trace ($\ker\gamma=V$), fonctions test, puis densité de $C^\infty_c(]0,1[)$ dans $V$. [trace] »
- `d-V` + `h-f` ⟹ `lm` par « Lax–Milgram : produit scalaire de $V$ (Poincaré), second membre continu. [lax-milgram] »
- `red` + `lm` ⟹ `fin` par « La reformulation et l’unique solution réduite. »

Pièges :
- `x-u-V` → incorrect [trace-relevement] : $u$ a pour trace $(\beta_0,\beta_1)$ : elle n'est dans $H^1_0$ que si $\beta_0=\beta_1=0$. — Contre-exemple : $f=0$, $(\beta_0,\beta_1)=(0,1)$ : $u(x)=x$.

Retraits :
- `h-f` (nécessaire) : Le second membre doit définir une forme continue sur $V$ pour appliquer Lax–Milgram : c'est le cas si $f\in L^2$ (ou plus généralement $f\in H^{-1}(]0,1[)$), mais pas pour une distribution quelconque. — Contre-exemple : Pour $f=\delta_{1/2}'$, dérivée de la distribution de Dirac en $1/2$ : $-u''=f$ impose $(u'+\delta_{1/2})'=0$, donc $u'=c-\delta_{1/2}$ pour une constante $c$, qui n'est pas dans $L^2$. Aucune solution n'existe dans $H^1(]0,1[)$.

Vérification : {"origin":"complement","review":"machine"}