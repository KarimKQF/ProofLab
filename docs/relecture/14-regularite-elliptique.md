# 14. Régularité elliptique (`regularite-elliptique`) — polycopié p. PDF 15, section 3.7

## Fiche

Espaces : $\Omega\subset\mathbb R^d$ : ouvert borné de classe $C^{1,1}$. | $H^1_0(\Omega)$, espace de la solution faible ; $H^2(\Omega)$, fonctions de $L^2$ dont les dérivées au sens des distributions jusqu'à l'ordre $2$ sont dans $L^2$.

Hypothèses :
- $\Omega$ est borné de classe $C^{1,1}$. — Sans elle : Sur le secteur $\{0<r<1,\ 0<\theta<\omega\}$, avec $\omega\in]\pi,2\pi[$, $u=\chi(r)r^{\pi/\omega}\sin(\pi\theta/\omega)$, où $\chi\in C^\infty([0,1])$ vaut $1$ près de $0$ et $0$ près de $1$, est dans $H^1_0$, de laplacien borné, et n'est pas dans $H^2$.
- $f\in L^2(\Omega)$. — Sans elle : Sur $]0,1[$, pour $f=\delta_{1/2}$, la solution faible $u(x)=\tfrac12\min(x,1-x)$ vérifie $u''=-\delta_{1/2}\notin L^2$.
- $u\in H^1_0(\Omega)$ résout $-\Delta u=f$ au sens faible.

Énoncé : Si $\Omega$ est borné de classe $C^{1,1}$, $f\in L^2(\Omega)$ et $u\in H^1_0(\Omega)$ résout $-\Delta u=f$ au sens faible, alors
$$u\in H^2(\Omega),\qquad\|u\|_{H^2}\le C_\Omega\|f\|_{L^2}.$$

Bilan : {"regularite":"$u\\in H^2(\\Omega)$.","stabilite":"$\\|u\\|_{H^2}\\le C_\\Omega\\|f\\|_{L^2}$."}

Preuve dans le polycopié : idee

Plan :
1. Quotients de différences : estimations des dérivées secondes à l’intérieur.
2. Près du bord : cartes régulières et condition de Dirichlet.
3. Sur un intervalle, l'équation donne directement $u''=-f\in L^2$ (exercice intermédiaire).

Vigilance :
- L'hypothèse de régularité du bord est déterminante : sur un domaine à coins rentrants, $H^2$ peut échouer.
- $H^2$ n'entraîne pas $C^2$ : la dérivée seconde n'est qu'une fonction de $L^2$.
- Les dérivées sont prises au sens des distributions : une dérivée presque partout ne suffit pas.

Vérification : {"origin":"polycopie","review":"machine","notes":"Énoncé du polycopié ; la démonstration n’y figure qu’en idée."}

Définition « Espace $H^2(\Omega)$ » : $H^2(\Omega)$ est l'espace des $u\in L^2(\Omega)$ dont toutes les dérivées au sens des distributions d'ordre $1$ et $2$ appartiennent à $L^2(\Omega)$.

## Contre-exemple `ce-regularite-coin` : Angle rentrant
Assertion : Sur tout ouvert borné lipschitzien, la solution faible de $-\Delta u=f$ avec $f\in L^2$ appartient à $H^2$.
Tâche : Pour le secteur d'angle $\omega=3\pi/2$, détermine l'exposant $\lambda=\pi/\omega$ de la fonction singulière $r^\lambda\sin(\lambda\theta)$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\lambda$","expected":"2/3"}
Explication : $|D^2S|^2=2\lambda^2(1-\lambda)^2r^{2\lambda-4}$ et $\int_0r^{2\lambda-3}dr=+\infty$ pour $\lambda=2/3$ : la solution tronquée a un laplacien borné et n'est pas dans $H^2$.

## Contre-exemple `ce-regularite-pp` : Dérivée seconde presque partout
Assertion : Une fonction continue, dont la dérivée seconde existe presque partout et est de carré intégrable, appartient à $H^2(]0,1[)$.
Tâche : Pour $v(x)=|x-1/2|$, calcule le saut $v'(1/2^+)-v'(1/2^-)$.
Vérification : {"kind":"rational","prompt":"Valeur du saut de $v'$ en $1/2$","expected":"2"}
Explication : $v''=0$ presque partout, mais $(v')'=2\delta_{1/2}$ dans $\mathcal D'(]0,1[)$, qui n'est pas une fonction de $L^2$ : $v\notin H^2(]0,1[)$.

## Exercice facile `regularite-elliptique.facile` : La fonction $x(1-x)$ appartient-elle à $H^2(]0,1[)$ ?

Énoncé : Soit $u(x)=x(1-x)$ sur $]0,1[$. Déterminer si $u\in H^2(]0,1[)=\{v\in L^2 : v',v''\in L^2\}$, les dérivées étant prises au sens des distributions, et calculer $\|u\|_{H^2}^2=\|u\|_{L^2}^2+\|u'\|_{L^2}^2+\|u''\|_{L^2}^2$.
Source : {"doc":"polycopie","pdfPage":40,"label":"Exercice 14, facile"} — prérequis : distributions

But : `fin` — usage : application

Nœuds :
- `d-u` (definition) : $u(x)=x(1-x)$ sur $]0,1[$.
- `d-H2` (definition) : $H^2(]0,1[)=\{v\in L^2(]0,1[) : v',v''\in L^2(]0,1[)\}$, dérivées au sens des distributions.
- `calc` (egalite) : $u$ est de classe $C^\infty$ sur $[0,1]$, avec $u'(x)=1-2x$ et $u''(x)=-2$ au sens classique.
- `weak` (consequence) : Les dérivées au sens des distributions de $u$ et de $u'$ sont $u'$ et $u''$ classiques.
- `L2` (consequence) : $u$, $u'$ et $u''$ sont bornées sur $]0,1[$, donc de carré intégrable.
- `inH2` (consequence) : $u\in H^2(]0,1[)$.
- `norme` (egalite, calcul rational) : $\|u\|_{H^2}^2=\tfrac1{30}+\tfrac13+4=\tfrac{131}{30}$.
  - valeur attendue : "131/30"
- `fin` (conclusion) : $u\in H^2(]0,1[)$, avec $u''=-2$ et $\|u\|_{H^2}^2=131/30$.
- `x-pp` (consequence, DISTRACTEUR) : Toute fonction continue, deux fois dérivable presque partout avec des dérivées presque partout de carré intégrable, appartient à $H^2(]0,1[)$.
- `x-bord` (consequence, DISTRACTEUR) : $u\in H^2(]0,1[)$ parce que $u(0)=u(1)=0$.

Règles :
- `d-u` ⟹ `calc` par « Dérivation d’un polynôme. »
- `calc` ⟹ `weak` par « Pour $\varphi\in C^\infty_c(]0,1[)$, intégration par parties sans terme de bord, appliquée à $u$ puis à $u'$. [distributions] »
- `calc` ⟹ `L2` par « Fonctions continues sur le segment, donc bornées ; intervalle de mesure finie. »
- `weak` + `L2` + `d-H2` ⟹ `inH2` par « Définition de $H^2(]0,1[)$. »
- `calc` + `inH2` ⟹ `norme` par « Calcul exact des trois intégrales $\int_0^1u^2$, $\int_0^1(u')^2$, $\int_0^1(u'')^2$. »
- `inH2` + `norme` ⟹ `fin` par « Réunion des résultats. »

Justifications sans règle (séduisantes ou fausses) : « Les dérivées presque partout suffisent à définir les dérivées faibles. »

Pièges :
- `weak` par « Les dérivées presque partout suffisent à définir les dérivées faibles. » → incorrect [regularite-elliptique-classique] : Une dérivée presque partout n'est pas, en général, la dérivée au sens des distributions : ici l'identification vient d'une intégration par parties, légitime car $u$ est de classe $C^2$ sur $[0,1]$. — Contre-exemple : $v(x)=|x-1/2|$ : $v''=0$ presque partout, mais $(v')'=2\delta_{1/2}$ dans $\mathcal D'(]0,1[)$.
- `x-pp` → incorrect [regularite-elliptique-classique] : Les dérivées au sens des distributions voient les sauts de la dérivée première, que les dérivées presque partout ignorent. — Contre-exemple : $v(x)=|x-1/2|$ est continue, $v''=0$ presque partout, mais $(v')'=2\delta_{1/2}\notin L^2$ : $v\notin H^2(]0,1[)$.
- `x-bord` → incorrect [regularite-elliptique-classique] : Les valeurs au bord ne disent rien de l'appartenance à $H^2$ : c'est la dérivée seconde au sens des distributions qu'il faut contrôler. — Contre-exemple : $w(x)=|x-1/2|-1/2$ vérifie $w(0)=w(1)=0$ et $w\notin H^2(]0,1[)$.

Retraits :
- `weak` (nécessaire) : Sans elle, les calculs classiques ne disent rien des dérivées au sens des distributions. — Contre-exemple : $v(x)=|x-1/2|$ a une dérivée seconde classique nulle hors de $1/2$, et n'est pas dans $H^2(]0,1[)$.

Solution :
**Dérivées.** $u$ est polynomiale : $u'(x)=1-2x$ et $u''(x)=-2$. Pour $\varphi\in C^\infty_c(]0,1[)$, l'intégration par parties ne produit aucun terme de bord : $-\int_0^1u\varphi'=\int_0^1u'\varphi$ et $-\int_0^1u'\varphi'=\int_0^1u''\varphi$. Les dérivées au sens des distributions sont donc les dérivées classiques.

**Appartenance.** $u$, $u'$, $u''$ sont bornées sur $]0,1[$, donc dans $L^2$ : $u\in H^2(]0,1[)$.

**Norme.** $\int_0^1x^2(1-x)^2dx=\tfrac1{30}$, $\int_0^1(1-2x)^2dx=\tfrac13$, $\int_0^14\,dx=4$, d'où $\|u\|_{H^2}^2=\tfrac{131}{30}$.

**Point de vigilance.** C'est la dérivée au sens des distributions qui compte : $|x-1/2|$ a une dérivée seconde nulle presque partout sans être dans $H^2$.

Indices :
1. Que demande exactement la définition de $H^2(]0,1[)$, et en quel sens les dérivées sont-elles prises ?
2. Calcule $u'$ et $u''$ classiquement, puis justifie qu'elles sont aussi les dérivées au sens des distributions.
3. Une intégration par parties contre $\varphi\in C^\infty_c(]0,1[)$ n'a pas de terme de bord. Reste à calculer $\int_0^1u^2$, $\int_0^1(u')^2$ et $\int_0^1(u'')^2$.

Erreurs fréquentes :
- Confondre dérivée presque partout et dérivée au sens des distributions.
- Remplacer le calcul exact de $\|u\|_{H^2}^2$ par une valeur approchée.

Variante : Déterminer si $v(x)=|x-1/2|$ appartient à $H^2(]0,1[)$.

Solution de la variante : $v$ est lipschitzienne ; en intégrant par parties sur $]0,1/2[$ et $]1/2,1[$, sa dérivée au sens des distributions est $v'=\operatorname{sgn}(x-1/2)\in L^2$, donc $v\in H^1(]0,1[)$. Pour $\varphi\in C^\infty_c(]0,1[)$ : $\langle(v')',\varphi\rangle=-\int_0^1\operatorname{sgn}(x-1/2)\varphi'(x)\,dx=\int_0^{1/2}\varphi'-\int_{1/2}^1\varphi'=2\varphi(1/2)$. Donc $(v')'=2\delta_{1/2}$. Si une fonction $g\in L^2$ vérifiait $\int_0^1g\varphi=2\varphi(1/2)$ pour tout $\varphi$, les fonctions test à support dans $]0,1[\setminus\{1/2\}$ donneraient $g=0$ presque partout, puis $\varphi(1/2)=0$ pour tout $\varphi$ : absurde. Ainsi $v\in H^1(]0,1[)\setminus H^2(]0,1[)$.

Graphe de la variante :
But : `fin` — usage : application

Nœuds :
- `d-v` (definition) : $v(x)=|x-1/2|$ sur $]0,1[$.
- `v1` (egalite) : $v'=\operatorname{sgn}(x-1/2)$ au sens des distributions, et $v\in H^1(]0,1[)$.
- `v2` (egalite) : $(v')'=2\delta_{1/2}$ dans $\mathcal D'(]0,1[)$.
- `nonL2` (consequence) : $2\delta_{1/2}$ n'est représentée par aucune fonction de $L^2(]0,1[)$.
- `fin` (conclusion) : $v\in H^1(]0,1[)$ et $v\notin H^2(]0,1[)$.
- `x-pp` (consequence, DISTRACTEUR) : $v''=0$ presque partout, donc $v\in H^2(]0,1[)$.

Règles :
- `d-v` ⟹ `v1` par « Intégration par parties sur $]0,1/2[$ et sur $]1/2,1[$ : les termes en $1/2$ se compensent car $v$ est continue. [distributions] »
- `v1` ⟹ `v2` par « $-\int_0^1\operatorname{sgn}(x-1/2)\varphi'=\int_0^{1/2}\varphi'-\int_{1/2}^1\varphi'=2\varphi(1/2)$. [distributions] »
- `v2` ⟹ `nonL2` par « Une fonction $g\in L^2$ représentant $2\delta_{1/2}$ serait nulle presque partout, par les fonctions test à support hors de $1/2$. »
- `v1` + `nonL2` ⟹ `fin` par « Définition de $H^2(]0,1[)$. »

Pièges :
- `x-pp` → incorrect [regularite-elliptique-classique] : La dérivée seconde au sens des distributions voit le saut de la dérivée première en 1/2. — Contre-exemple : $(v')'=2\delta_{1/2}$.

Retraits :
- `d-v` (nécessaire) : Sans saut de la dérivée, la dérivée seconde distributionnelle est la dérivée classique. — Contre-exemple : $u(x)=x(1-x)$ est dans $H^2(]0,1[)$.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `regularite-elliptique.intermediaire` : Régularité $H^2$ pour $-u''=f$ sur $]0,1[$

Énoncé : Soient $f\in L^2(]0,1[)$ et $u\in H^1_0(]0,1[)$ la solution faible de $-u''=f$ avec condition de Dirichlet : $\int_0^1u'v'=\int_0^1fv$ pour tout $v\in H^1_0(]0,1[)$. Montrer que $u\in H^2(]0,1[)$, que $u''=-f$ presque partout, et que $\|u\|_{H^2}\le\sqrt3\,\|f\|_{L^2}$.
Source : {"doc":"polycopie","pdfPage":40,"label":"Exercice 14, intermédiaire"} — prérequis : lax-milgram, distributions

But : `fin` — usage : demonstration

Nœuds :
- `h-f` (hypothese) : $f\in L^2(]0,1[)$.
- `h-sol` (hypothese) : $u\in H^1_0(]0,1[)$ et $\int_0^1u'v'=\int_0^1fv$ pour tout $v\in H^1_0(]0,1[)$.
- `dist` (egalite) : Pour $\varphi\in C^\infty_c(]0,1[)$ : $\langle(u')',\varphi\rangle=-\int_0^1u'\varphi'$.
- `test` (egalite) : Pour $\varphi\in C^\infty_c(]0,1[)$ : $\int_0^1u'\varphi'=\int_0^1f\varphi$.
- `eq` (egalite) : $(u')'=-f$ dans $\mathcal D'(]0,1[)$.
- `H2` (consequence) : $u''=-f\in L^2(]0,1[)$ : $u\in H^2(]0,1[)$.
- `sob` (inegalite) : $\|u\|_{L^2}\le\|u'\|_{L^2}$.
- `grad` (inegalite) : $\|u'\|_{L^2}\le\|f\|_{L^2}$.
- `estim` (inegalite) : $\|u\|_{H^2}^2=\|u\|_{L^2}^2+\|u'\|_{L^2}^2+\|u''\|_{L^2}^2\le 3\|f\|_{L^2}^2$.
- `fin` (conclusion) : $u\in H^2(]0,1[)$, $u''=-f$ presque partout, et $\|u\|_{H^2}\le\sqrt3\,\|f\|_{L^2}$.
- `x-C2` (consequence, DISTRACTEUR) : $u$ est de classe $C^2$ sur $[0,1]$.
- `x-sans-bord` (inegalite, DISTRACTEUR) : Toute solution de $-u''=f$ dans $\mathcal D'(]0,1[)$, sans condition au bord, vérifie $\|u\|_{H^2}\le\sqrt3\,\|f\|_{L^2}$.

Règles :
- `h-sol` ⟹ `dist` par « Définition de la dérivée au sens des distributions de $u'\in L^2$. [distributions] »
- `h-sol` ⟹ `test` par « $C^\infty_c(]0,1[)\subset H^1_0(]0,1[)$ : on teste la formulation faible par $v=\varphi$. »
- `dist` + `test` ⟹ `eq` par « Comparaison des deux expressions pour toute fonction test. »
- `eq` + `h-f` + `h-sol` ⟹ `H2` par « $u\in L^2$, $u'\in L^2$ et $(u')'=-f\in L^2$ : définition de $H^2$. »
- `h-sol` ⟹ `sob` par « Pour $\varphi\in C^\infty_c(]0,1[)$, $|\varphi(x)|=\big|\int_0^x\varphi'\big|\le\|\varphi'\|_{L^2}$ ; passage à la limite par densité dans $H^1_0$. [cauchy-schwarz] »
- `h-sol` + `h-f` + `sob` ⟹ `grad` par « Choix $v=u$ : $\|u'\|_{L^2}^2=\int_0^1fu\le\|f\|_{L^2}\|u\|_{L^2}\le\|f\|_{L^2}\|u'\|_{L^2}$. [cauchy-schwarz] »
- `grad` + `sob` + `H2` ⟹ `estim` par « Somme des trois carrés, chacun majoré par $\|f\|_{L^2}^2$. »
- `H2` + `estim` ⟹ `fin` par « Réunion de la régularité et de l’estimation. »

Justifications sans règle (séduisantes ou fausses) : « Théorème de régularité $H^2$ du laplacien de Dirichlet. » ; « C’est évident. »

Pièges :
- `eq` par « C’est évident. » → a-justifier [justification-absente] : L'équation au sens des distributions se démontre : écris $\langle(u')',\varphi\rangle$ par définition, puis teste la formulation faible par $\varphi$.
- `x-C2` → incorrect [regularite-elliptique-classique] : $H^2$ n'entraîne pas $C^2$ : $u''=-f$ n'est qu'une fonction de $L^2$. — Contre-exemple : Pour $f=\mathbb 1_{]1/2,1[}$, $u''=-f$ presque partout saute de $0$ à $-1$ en $1/2$ : $u$ n'est pas de classe $C^2$.
- `x-sans-bord` → incorrect [hypotheses-theoreme] : La régularité $H^2$ ne demande ici que l'équation, mais l'estimation repose sur la condition de Dirichlet, via $\|u\|_{L^2}\le\|u'\|_{L^2}$. — Contre-exemple : $u=1$ et $f=0$ : $-u''=f$, mais $\|u\|_{H^2}=1>0=\sqrt3\,\|f\|_{L^2}$.

Retraits :
- `sob` (nécessaire) : Sans $\|u\|_{L^2}\le\|u'\|_{L^2}$, les constantes échappent à l'estimation. — Contre-exemple : $u=1$ résout $-u''=0$ et $\|u\|_{L^2}=1>0=\|u'\|_{L^2}$.
- `h-f` (nécessaire) : Avec un second membre seulement dans $H^{-1}$, la solution faible existe encore, mais n'est plus dans $H^2$. — Contre-exemple : Pour $f=\delta_{1/2}$, la solution faible est $u(x)=\tfrac12\min(x,1-x)$ : $u\in H^1_0(]0,1[)$, et $u''=-\delta_{1/2}\notin L^2$.

Calculs fermés : [{"kind":"rational","prompt":"Pour $f=2$ : la solution est $u(x)=x(1-x)$ ; valeur de $\\|u'\\|_{L^2}^2$","expected":"1/3"}]

Solution :
**Équation au sens des distributions.** Pour $\varphi\in C^\infty_c(]0,1[)$, la définition donne $\langle(u')',\varphi\rangle=-\int_0^1u'\varphi'$, et la formulation faible testée par $\varphi\in H^1_0(]0,1[)$ donne $\int_0^1u'\varphi'=\int_0^1f\varphi$. Donc $(u')'=-f$ dans $\mathcal D'(]0,1[)$.

**Régularité.** $u\in L^2$, $u'\in L^2$ et $u''=-f\in L^2$ : $u\in H^2(]0,1[)$, et $u''=-f$ presque partout.

**Estimation.** Pour $\varphi\in C^\infty_c(]0,1[)$, $|\varphi(x)|\le\|\varphi'\|_{L^2}$, d'où $\|\varphi\|_{L^2}\le\|\varphi'\|_{L^2}$, inégalité qui passe à $H^1_0$ par densité. En testant par $v=u$ : $\|u'\|_{L^2}^2=\int_0^1fu\le\|f\|_{L^2}\|u'\|_{L^2}$, donc $\|u'\|_{L^2}\le\|f\|_{L^2}$ et $\|u\|_{L^2}\le\|f\|_{L^2}$. Avec $\|u''\|_{L^2}=\|f\|_{L^2}$ : $\|u\|_{H^2}\le\sqrt3\,\|f\|_{L^2}$.

**Points de vigilance.** En dimension $1$, aucun quotient de différences n'est nécessaire : l'équation donne directement la dérivée seconde. On ne peut pas invoquer le théorème général, dont c'est un cas particulier. $H^2$ n'entraîne pas $C^2$.

Indices :
1. Qu'est-ce que $(u')'$ au sens des distributions, et que dit la formulation faible lorsqu'on la teste par une fonction test ?
2. Compare $\langle(u')',\varphi\rangle=-\int u'\varphi'$ et $\int u'\varphi'=\int f\varphi$ : la dérivée seconde est identifiée à une fonction de $L^2$.
3. Pour l'estimation, teste par $v=u$ et utilise $\|u\|_{L^2}\le\|u'\|_{L^2}$, valable sur $H^1_0(]0,1[)$.

Erreurs fréquentes :
- Conclure que $u$ est de classe $C^2$.
- Invoquer le théorème de régularité $H^2$ pour démontrer son cas particulier.
- Oublier que l’estimation repose sur la condition de Dirichlet.

Variante : Soient $f\in L^2(]0,1[)$ et $u\in H^1(]0,1[)$ tel que $\int_0^1u'v'+\int_0^1uv=\int_0^1fv$ pour tout $v\in H^1(]0,1[)$ (problème de Neumann). Montrer que $u\in H^2(]0,1[)$.

Solution de la variante : En testant par $\varphi\in C^\infty_c(]0,1[)\subset H^1(]0,1[)$ : $\langle(u')',\varphi\rangle=-\int_0^1u'\varphi'=\int_0^1(u-f)\varphi$. Donc $(u')'=u-f\in L^2(]0,1[)$, et $u\in H^2(]0,1[)$. La condition au bord ne joue aucun rôle dans cette régularité à l'intérieur de l'intervalle.

Vérification : {"origin":"complement","review":"machine"}

## Exercice difficile `regularite-elliptique.difficile` : Angle rentrant : la régularité $H^2$ tombe

Énoncé : Soient $\omega\in]\pi,2\pi[$, $\lambda=\pi/\omega\in]1/2,1[$ et le secteur $\Omega=\{(r\cos\theta,r\sin\theta) : 0<r<1,\ 0<\theta<\omega\}$. Soient $\chi\in C^\infty([0,1])$, égale à $1$ sur $[0,1/3]$ et à $0$ sur $[2/3,1]$, $S=r^\lambda\sin(\lambda\theta)$ et $u=\chi(r)S$. Formuler précisément le théorème de régularité $H^2$ et l'hypothèse qui tombe pour $\Omega$. Montrer que $u\in H^1_0(\Omega)$ résout $-\Delta u=f$ au sens faible avec $f\in L^2(\Omega)$, mais que $u\notin H^2(\Omega)$.
Source : {"doc":"polycopie","pdfPage":40,"label":"Exercice 14, difficile ; énoncé et point de vigilance de la section 3.7 (p. PDF 15)"} — prérequis : lax-milgram, distributions

But : `fin` — usage : application

Nœuds :
- `h-sector` (hypothese) : $\omega\in]\pi,2\pi[$, $\lambda=\pi/\omega\in]1/2,1[$, et $\Omega$ est le secteur d'ouverture $\omega$ et de rayon $1$ : un ouvert borné lipschitzien à angle rentrant en $0$.
- `d-u` (definition) : $S=r^\lambda\sin(\lambda\theta)$, $\chi\in C^\infty([0,1])$ égale à $1$ sur $[0,1/3]$ et à $0$ sur $[2/3,1]$, et $u=\chi(r)S$.
- `formule` (consequence, calcul choice) : Théorème : si $\Omega$ est borné de classe $C^{1,1}$, $f\in L^2(\Omega)$ et $u\in H^1_0(\Omega)$ résout $-\Delta u=f$ au sens faible, alors $u\in H^2(\Omega)$ et $\|u\|_{H^2}\le C_\Omega\|f\|_{L^2}$.
- `coin` (consequence) : En $0$, le bord de $\Omega$ forme un coin d'angle intérieur $\omega\neq\pi$ : $\Omega$ n'est pas de classe $C^1$, a fortiori pas $C^{1,1}$.
- `non-appl` (consequence) : Le théorème de régularité $H^2$ ne s'applique pas à $\Omega$ : l'hypothèse de bord tombe.
- `harm` (egalite) : $\Delta S=0$ dans $\Omega$, et $S=0$ sur les côtés $\theta=0$ et $\theta=\omega$.
- `u-H10` (consequence) : $u\in H^1_0(\Omega)$.
- `f-L2` (consequence) : $f:=-\Delta u=-2\chi'(r)\partial_rS-\big(\chi''(r)+\tfrac1r\chi'(r)\big)S$ est bornée, donc dans $L^2(\Omega)$, et $u$ résout $-\Delta u=f$ au sens faible.
- `D2` (egalite) : Dans $\Omega$ : $|D^2S|^2=2\lambda^2(1-\lambda)^2r^{2\lambda-4}$.
- `non-H2` (consequence) : $\int_{\Omega\cap\{r<1/3\}}|D^2u|^2=2\lambda^2(1-\lambda)^2\,\omega\int_0^{1/3}r^{2\lambda-3}\,dr=+\infty$ : $u\notin H^2(\Omega)$.
- `fin` (conclusion) : Pour ce secteur à angle rentrant, $f\in L^2(\Omega)$ et la solution faible $u\in H^1_0(\Omega)$ n'est pas dans $H^2(\Omega)$ : sans bord $C^{1,1}$, la conclusion du théorème peut tomber.
- `x-lip` (consequence, DISTRACTEUR) : Sur un ouvert borné lipschitzien, toute solution faible avec $f\in L^2$ appartient à $H^2$.
- `x-f` (consequence, DISTRACTEUR) : $f$ n'est pas de carré intégrable près de $0$, à cause de la singularité de $S$.
- `x-dirac` (consequence, DISTRACTEUR) : $-\Delta u$ contient une distribution de Dirac en $0$.

Règles :
- ∅ ⟹ `formule` par « Lecture de l’énoncé du polycopié, section 3.7. »
- `h-sector` ⟹ `coin` par « Un bord de classe $C^1$ admet une tangente en chaque point ; en $0$, les deux demi-tangentes font un angle $\omega\ne\pi$. »
- `formule` + `coin` ⟹ `non-appl` par « Une hypothèse du théorème n’est pas satisfaite. »
- `d-u` + `h-sector` ⟹ `harm` par « En polaires, $\Delta=\partial_r^2+\tfrac1r\partial_r+\tfrac1{r^2}\partial_\theta^2$ donne $(\lambda^2-\lambda^2)r^{\lambda-2}\sin(\lambda\theta)=0$ ; et $\sin(\lambda\omega)=\sin\pi=0$. »
- `harm` + `d-u` + `h-sector` ⟹ `u-H10` par « $|\nabla S|^2=\lambda^2r^{2\lambda-2}$ et $\int_0^1r^{2\lambda-1}dr<\infty$ : $u\in H^1(\Omega)$ ; $u$ est continue sur $\overline\Omega$ et nulle sur $\partial\Omega$, et les troncatures $(u-\varepsilon)^+-(u+\varepsilon)^-$, à support compact dans $\Omega$, convergent vers $u$ dans $H^1$. »
- `harm` + `d-u` + `u-H10` ⟹ `f-L2` par « $\Delta(\chi S)=\chi\Delta S+2\nabla\chi\cdot\nabla S+S\Delta\chi$, avec $\chi'=\chi''=0$ sur $[0,1/3]$ ; $u$ est de classe $C^\infty$ dans $\Omega$, puis densité de $C^\infty_c(\Omega)$ dans $H^1_0(\Omega)$. »
- `d-u` + `h-sector` ⟹ `D2` par « $S=\operatorname{Im}(z^\lambda)$ avec $z^\lambda$ holomorphe sur le secteur ; pour $S=\operatorname{Im}F$, $|D^2S|^2=2|F''|^2$, et $F''(z)=\lambda(\lambda-1)z^{\lambda-2}$. »
- `D2` + `d-u` + `h-sector` ⟹ `non-H2` par « $u=S$ pour $r<1/3$, $dx=r\,dr\,d\theta$, et $2\lambda-3<-1$ car $\lambda<1$ ; les dérivées faibles de $u$ sont ses dérivées classiques dans $\Omega$. »
- `non-appl` + `u-H10` + `f-L2` + `non-H2` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « Un secteur à angle rentrant n’est pas lipschitzien. »

Pièges :
- `coin` par « Un secteur à angle rentrant n’est pas lipschitzien. » → incorrect [regularite-bord] : Pour $\omega<2\pi$, le secteur est lipschitzien : c'est la régularité $C^{1,1}$ qui manque, pas le caractère lipschitzien.
- `x-lip` → incorrect [regularite-bord] : Le théorème suppose un bord de classe $C^{1,1}$ ; le caractère lipschitzien ne suffit pas. — Contre-exemple : Le secteur $\Omega$ de cet exercice : lipschitzien, $f\in L^2(\Omega)$, et $u\notin H^2(\Omega)$.
- `x-f` → incorrect [regularite-bord] : Près de $0$, $\chi=1$ et $\Delta S=0$ : $f$ y est nulle. La perte de régularité vient du domaine, non du second membre. — Contre-exemple : Sur $\{r<1/3\}$, $f=-\Delta S=0$.
- `x-dirac` → incorrect [regularite-bord] : L'origine est un point du bord : elle n'appartient pas à l'ouvert $\Omega$, et dans $\mathcal D'(\Omega)$ on a simplement $-\Delta u=f$. — Contre-exemple : Pour $\varphi\in C^\infty_c(\Omega)$, le support de $\varphi$ évite un voisinage de $0$, où $u$ est de classe $C^\infty$.

Retraits :
- `h-sector` (nécessaire) : Pour $\omega\le\pi$, on a $\lambda\ge 1$ : soit $\lambda(1-\lambda)=0$, soit $2\lambda-3>-1$, et l'intégrale des dérivées secondes converge. — Contre-exemple : $\omega=\pi/2$ : $\lambda=2$ et $S=r^2\sin(2\theta)=2xy$, polynomiale, donc dans $H^2$.

Calculs fermés : [{"kind":"rational","prompt":"Pour $\\omega=3\\pi/2$ : valeur de $\\lambda=\\pi/\\omega$","expected":"2/3"}]

Solution :
**Le théorème.** Si $\Omega$ est borné de classe $C^{1,1}$, $f\in L^2(\Omega)$ et $u\in H^1_0(\Omega)$ résout $-\Delta u=f$ au sens faible, alors $u\in H^2(\Omega)$ et $\|u\|_{H^2}\le C_\Omega\|f\|_{L^2}$. Le secteur est borné et lipschitzien, mais son bord forme en $0$ un coin d'angle $\omega\ne\pi$ : il n'est pas $C^1$, donc pas $C^{1,1}$. Le théorème ne s'applique pas.

**La fonction singulière.** En polaires, $\Delta S=(\lambda^2-\lambda^2)r^{\lambda-2}\sin(\lambda\theta)=0$, et $S$ s'annule sur les deux côtés car $\sin(\lambda\omega)=\sin\pi=0$. Comme $|\nabla S|^2=\lambda^2r^{2\lambda-2}$ et $\int_0^1r^{2\lambda-1}dr<\infty$, $u\in H^1(\Omega)$ ; $u$ est continue sur $\overline\Omega$ et nulle sur le bord, d'où $u\in H^1_0(\Omega)$.

**Le second membre.** $-\Delta u=-2\chi'(r)\partial_rS-(\chi''+\tfrac1r\chi')S=:f$ est bornée car $\chi'$ et $\chi''$ sont nulles près de $0$. Comme $u$ est de classe $C^\infty$ dans $\Omega$ (qui ne contient pas l'origine), l'équation a lieu au sens des distributions, puis au sens faible par densité.

**Pas de régularité $H^2$.** $S=\operatorname{Im}(z^\lambda)$, donc $|D^2S|^2=2|\lambda(\lambda-1)z^{\lambda-2}|^2=2\lambda^2(1-\lambda)^2r^{2\lambda-4}$. Sur $\{r<1/3\}$, $u=S$ et $\int|D^2u|^2=2\lambda^2(1-\lambda)^2\,\omega\int_0^{1/3}r^{2\lambda-3}dr=+\infty$ car $2\lambda-3<-1$. Donc $u\notin H^2(\Omega)$.

**Conclusion.** Pour $\omega=3\pi/2$, $\lambda=2/3$. Le second membre est régulier ; c'est le coin rentrant qui fait perdre la régularité $H^2$.

Indices :
1. Quelles sont exactement les hypothèses du théorème de régularité $H^2$ ? Laquelle le secteur ne vérifie-t-il pas ?
2. Vérifie que $S=r^\lambda\sin(\lambda\theta)$ est harmonique et nulle sur les deux côtés ; la troncature $\chi$ rend $u$ nulle près de $r=1$ et ne crée de second membre que loin de $0$.
3. $S=\operatorname{Im}(z^\lambda)$ : $|D^2S|^2=2\lambda^2(1-\lambda)^2r^{2\lambda-4}$, et $\int_0r^{2\lambda-3}dr$ diverge pour $\lambda<1$.

Erreurs fréquentes :
- Croire qu'un bord lipschitzien suffit à la régularité $H^2$.
- Attribuer la perte de régularité au second membre plutôt qu’au domaine.
- Énoncer le théorème avec une hypothèse ou une conclusion modifiée.

Variante : Pour quelles valeurs de $\omega\in]0,2\pi[$ la fonction $S=r^{\pi/\omega}\sin(\pi\theta/\omega)$ a-t-elle des dérivées secondes de carré intégrable au voisinage de $0$ dans le secteur d'ouverture $\omega$ ?

Solution de la variante : Avec $\lambda=\pi/\omega$, $|D^2S|^2=2\lambda^2(1-\lambda)^2r^{2\lambda-4}$. Si $\lambda=1$ ($\omega=\pi$), $S=r\sin\theta$ est linéaire et $D^2S=0$. Sinon, $\int_0r^{2\lambda-3}dr$ converge si et seulement si $2\lambda-3>-1$, c'est-à-dire $\lambda>1$. Les dérivées secondes sont donc de carré intégrable près de $0$ exactement pour $\omega\le\pi$.

Vérification : {"origin":"complement","review":"machine"}