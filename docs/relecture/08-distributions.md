# 8. Dérivation distributionnelle (`distributions`) — polycopié p. PDF 11, section 3.1

## Fiche

Espaces : $\Omega\subset\mathbb R^d$ : ouvert. | $\mathcal D(\Omega)=C^\infty_c(\Omega)$ : fonctions tests, munies de leur topologie usuelle : $\varphi_n\to\varphi$ dans $\mathcal D(\Omega)$ signifie que les supports des $\varphi_n$ sont contenus dans un même compact de $\Omega$ et que toutes les dérivées convergent uniformément. | $\mathcal D'(\Omega)$ : espace des distributions, dual continu de $\mathcal D(\Omega)$. Toute $u\in L^1_{\mathrm{loc}}(\Omega)$ définit la distribution régulière $\langle T_u,\varphi\rangle=\int_\Omega u\varphi$.

Hypothèses :
- $T\in\mathcal D'(\Omega)$ est une distribution.
- $\alpha\in\mathbb N^d$ est un multi-indice.

Énoncé : Pour $T\in\mathcal D'(\Omega)$ et $\alpha\in\mathbb N^d$, la dérivée distributionnelle est donnée par
$$\langle\partial^\alpha T,\varphi\rangle=(-1)^{|\alpha|}\langle T,\partial^\alpha\varphi\rangle\qquad\forall\varphi\in\mathcal D(\Omega).$$
Elle existe toujours comme distribution.

Bilan : {"existence":"Pour tout $T\\in\\mathcal D'(\\Omega)$ et tout $\\alpha$, $\\partial^\\alpha T$ existe dans $\\mathcal D'(\\Omega)$, sans condition de régularité.","unicite":"La formule détermine $\\partial^\\alpha T$ sur toutes les fonctions tests, donc $\\partial^\\alpha T$ est unique.","autre":"Pour $u\\in C^{|\\alpha|}(\\Omega)$, on a $\\partial^\\alpha T_u=T_{\\partial^\\alpha u}$ (intégration par parties, les termes de bord étant nuls car $\\varphi$ est à support compact)."}

Preuve dans le polycopié : complete

Plan :
1. La formule reproduit l'intégration par parties pour les fonctions régulières : elle est cohérente avec la dérivée classique.
2. Linéarité : $\varphi\mapsto(-1)^{|\alpha|}\langle T,\partial^\alpha\varphi\rangle$ est linéaire, par composition.
3. Continuité de $\partial^\alpha$ sur $\mathcal D(\Omega)$ : si $\varphi_n\to\varphi$ dans $\mathcal D(\Omega)$, alors $\partial^\alpha\varphi_n\to\partial^\alpha\varphi$ dans $\mathcal D(\Omega)$ (mêmes supports, convergence uniforme de toutes les dérivées).
4. Par continuité de $T$ sur $\mathcal D(\Omega)$, la forme $\varphi\mapsto(-1)^{|\alpha|}\langle T,\partial^\alpha\varphi\rangle$ est linéaire continue : c'est un élément de $\mathcal D'(\Omega)$.

Vigilance :
- $H=\mathbb 1_{]0,+\infty[}$ a une dérivée nulle presque partout, et pourtant $H'=\delta_0$ : la dérivée presque partout n'est pas la dérivée distributionnelle.
- $\partial^\alpha T$ existe toujours comme distribution, mais pas nécessairement comme fonction.
- Le facteur $(-1)^{|\alpha|}$ fait partie de la définition.

Vérification : {"origin":"polycopie","review":"machine"}

Définition « Fonctions tests $\mathcal D(\Omega)$ » : $\mathcal D(\Omega)=C^\infty_c(\Omega)$ est l'espace des fonctions indéfiniment dérivables à support compact dans $\Omega$, muni de sa topologie usuelle.

Définition « Distribution » : $\mathcal D'(\Omega)$ est le dual continu de $\mathcal D(\Omega)$ : une distribution est une forme linéaire continue sur $\mathcal D(\Omega)$.

Définition « Distribution régulière » : Toute fonction $u\in L^1_{\mathrm{loc}}(\Omega)$ définit une distribution régulière par $\langle T_u,\varphi\rangle=\int_\Omega u\varphi$.

Définition « Dérivée distributionnelle » : Pour $T\in\mathcal D'(\Omega)$ et $\alpha\in\mathbb N^d$ : $\langle\partial^\alpha T,\varphi\rangle=(-1)^{|\alpha|}\langle T,\partial^\alpha\varphi\rangle$ pour tout $\varphi\in\mathcal D(\Omega)$.

Définition « Distribution de Dirac » : $\delta_0$ est la distribution définie sur $\mathcal D(\mathbb R)$ par $\langle\delta_0,\varphi\rangle=\varphi(0)$. Elle n'est pas représentée par une fonction de $L^1_{\mathrm{loc}}(\mathbb R)$.

Définition « Espaces de Sobolev $W^{m,p}(\Omega)$ » : Pour un entier $m\ge 0$ et $1\le p\le\infty$, $W^{m,p}(\Omega)$ contient les fonctions de $L^p(\Omega)$ dont toutes les dérivées distributionnelles jusqu'à l'ordre $m$ appartiennent à $L^p(\Omega)$. On écrit $H^m=W^{m,2}$.

## Contre-exemple `ce-distributions-derivee-pp` : Dérivée presque partout nulle
Assertion : Si $u\in L^1_{\mathrm{loc}}(\mathbb R)$ est dérivable presque partout, de dérivée presque partout nulle, alors $u'=0$ dans $\mathcal D'(\mathbb R)$.
Tâche : Soit $H=\mathbb 1_{]0,+\infty[}$ et $\varphi\in\mathcal D(\mathbb R)$ telle que $\varphi(0)=3$. Calcule $\langle H',\varphi\rangle$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\langle H',\\varphi\\rangle$","expected":"3"}
Explication : $H'=\delta_0$ d'après l'exemple fondamental, donc $\langle H',\varphi\rangle=\varphi(0)=3\neq 0$, alors que $H$ a une dérivée nulle sur $\mathbb R^*$, donc presque partout.

## Contre-exemple `ce-distributions-dirac-non-reguliere` : Distributions non régulières
Assertion : Toute distribution sur $\mathbb R$ est représentée par une fonction de $L^1_{\mathrm{loc}}(\mathbb R)$.
Tâche : Soit $\chi\in\mathcal D(\mathbb R)$ telle que $\chi(0)=1$, et $\varphi_n(x)=\chi(nx)$. Calcule $\langle\delta_0,\varphi_n\rangle$ pour $n\ge 1$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\langle\\delta_0,\\varphi_n\\rangle$, indépendante de $n$","expected":"1"}
Explication : Si $\delta_0=T_g$ avec $g\in L^1_{\mathrm{loc}}(\mathbb R)$, alors $\int g\varphi_n=\varphi_n(0)=1$ pour tout $n$, alors que, si $\operatorname{supp}\chi\subset[-r,r]$, $\left|\int g\varphi_n\right|\le\|\chi\|_\infty\int_{-r/n}^{r/n}|g|\to 0$ par convergence dominée : contradiction.

## Contre-exemple `ce-distributions-signe` : Oubli du signe dans la définition
Assertion : La dérivée distributionnelle d'une distribution $T$ sur $\mathbb R$ est donnée par $\langle T',\varphi\rangle=\langle T,\varphi'\rangle$.
Tâche : Pour $u(x)=x$ sur $\mathbb R$ et $\varphi\in\mathcal D(\mathbb R)$ avec $\int_{\mathbb R}\varphi=1$, calcule $\langle T_u,\varphi'\rangle=\int_{\mathbb R}x\varphi'(x)\,dx$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\int_{\\mathbb R}x\\varphi'(x)\\,dx$","expected":"-1"}
Explication : Par intégration par parties, $\int x\varphi'=-\int\varphi=-1$, alors que la dérivée classique de $u$ vaut $1$ et $\int 1\cdot\varphi=1$. La formule sans signe donnerait donc l'opposé de la dérivée classique ; le facteur $-1$ rétablit l'accord.

## Exercice facile `distributions.facile` : Dérivée distributionnelle de la fonction de Heaviside

Énoncé : Soit $H=\mathbb 1_{]0,+\infty[}$ la fonction de Heaviside sur $\mathbb R$. Montrer que $H\in L^1_{\mathrm{loc}}(\mathbb R)$, puis calculer sa dérivée distributionnelle $H'$ dans $\mathcal D'(\mathbb R)$.
Source : {"doc":"polycopie","pdfPage":11,"label":"Exemple fondamental, section 3.1 ; exercice 8, facile (p. PDF 39)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `d-H` (definition) : $H=\mathbb 1_{]0,+\infty[}$ sur $\mathbb R$.
- `d-phi` (definition, locale) : Soit $\varphi\in\mathcal D(\mathbb R)$ et $R>0$ tel que $\operatorname{supp}\varphi\subset\,]-R,R[$.
- `d-delta` (definition) : $\delta_0$ est la distribution de Dirac en $0$ : $\langle\delta_0,\psi\rangle=\psi(0)$ pour $\psi\in\mathcal D(\mathbb R)$.
- `loc` (consequence) : $H\in L^1_{\mathrm{loc}}(\mathbb R)$ : $H$ définit une distribution régulière.
- `def` (egalite) : $\langle H',\varphi\rangle=-\langle H,\varphi'\rangle=-\int_{\mathbb R}H(x)\,\varphi'(x)\,dx$.
- `restr` (egalite) : $\int_{\mathbb R}H(x)\,\varphi'(x)\,dx=\int_0^R\varphi'(x)\,dx$.
- `ftc` (egalite) : $\int_0^R\varphi'(x)\,dx=\varphi(R)-\varphi(0)$.
- `bord` (egalite) : $\varphi(R)=0$.
- `val` (egalite, calcul expr-equiv) : $\langle H',\varphi\rangle=\varphi(0)$.
  - valeur attendue : "p"
- `fin` (conclusion) : $H'=\delta_0$ dans $\mathcal D'(\mathbb R)$.
- `x-signe` (egalite, DISTRACTEUR) : $\langle H',\varphi\rangle=-\varphi(0)$.
- `x-nul` (consequence, DISTRACTEUR) : $H'=0$ dans $\mathcal D'(\mathbb R)$, puisque $H$ est constante sur $]-\infty,0[$ et sur $]0,+\infty[$.
- `x-fonction` (consequence, DISTRACTEUR) : Il existe $g\in L^1_{\mathrm{loc}}(\mathbb R)$ telle que $H'=T_g$.

Règles :
- `d-H` ⟹ `loc` par « $H$ est mesurable et bornée par $1$ : elle est intégrable sur tout compact. »
- `loc` + `d-phi` ⟹ `def` par « Définition de la dérivée distributionnelle (facteur $(-1)^{|\alpha|}$, ici $|\alpha|=1$), puis formule de la distribution régulière. »
- `d-H` + `d-phi` ⟹ `restr` par « $H=0$ sur $]-\infty,0]$, $H=1$ sur $]0,+\infty[$, et $\varphi'$ est nulle hors de $]-R,R[$. »
- `d-phi` ⟹ `ftc` par « Théorème fondamental du calcul intégral. [theoreme-fondamental] »
- `d-phi` ⟹ `bord` par « $\varphi$ est nulle hors de son support, contenu dans $]-R,R[$. »
- `def` + `restr` + `ftc` + `bord` ⟹ `val` par « Report des égalités précédentes. »
- `val` + `d-delta` ⟹ `fin` par « Deux distributions sont égales lorsqu’elles coïncident sur toute fonction test. »

Justifications sans règle (séduisantes ou fausses) : « $H$ est dérivable sur $\mathbb R^*$, de dérivée nulle : sa dérivée distributionnelle est donc nulle. » ; « Définition de la dérivée distributionnelle : $\langle T',\varphi\rangle=\langle T,\varphi'\rangle$. » ; « C’est évident. »

Pièges :
- `x-signe` → incorrect [distributions-signe] : Le facteur $(-1)^{|\alpha|}$ fait partie de la définition : il vaut ici $-1$, et l'intégration par parties le compense. — Contre-exemple : Pour $u(x)=x$ : $\langle u',\varphi\rangle=\int\varphi$, alors que $\langle u,\varphi'\rangle=\int x\varphi'=-\int\varphi$. Sans le signe, on trouverait $u'=-1$.
- `x-nul` → incorrect [distributions-derivee-pp] : $H'$ ne se réduit pas à la dérivée presque partout : celle-ci est nulle sur $\mathbb R^*$ et ne dit rien près de $0$, où la fonction test « voit » le saut. — Contre-exemple : Si $\varphi(0)=1$, alors $\langle H',\varphi\rangle=\varphi(0)=1\neq 0$.
- `x-fonction` → incorrect [distributions-dirac] : La distribution de Dirac n'est pas une distribution régulière : aucune fonction de $L^1_{\mathrm{loc}}$ ne la représente. — Contre-exemple : Si $\delta_0=T_g$, soit $\chi\in\mathcal D(\mathbb R)$ avec $\chi(0)=1$, $0\le\chi\le 1$, $\operatorname{supp}\chi\subset[-1,1]$, et $\varphi_n(x)=\chi(nx)$ : alors $1=\varphi_n(0)=\int g\varphi_n$, tandis que $\left|\int g\varphi_n\right|\le\int_{-1/n}^{1/n}|g|\to 0$.
- `def` par « Définition de la dérivée distributionnelle : $\langle T',\varphi\rangle=\langle T,\varphi'\rangle$. » → incorrect [distributions-signe] : La définition comporte le facteur $(-1)^{|\alpha|}$, ici égal à $-1$ : c'est ce signe qui rend la formule cohérente avec l'intégration par parties. — Contre-exemple : Pour $u(x)=x$, la formule sans signe donne $\langle u',\varphi\rangle=\int x\varphi'=-\int\varphi$, soit $u'=-1$, au lieu de la dérivée classique $u'=1$.
- `loc` par « C’est évident. » → a-justifier [justification-absente] : Pourquoi $H$ est-elle intégrable sur tout compact ? Une fonction n'est pas toujours localement intégrable.
- `fin` par « C’est évident. » → a-justifier [justification-absente] : L’identification se démontre : compare les valeurs des deux distributions sur toute fonction test.

Retraits :
- `bord` (nécessaire) : La fonction test est à support compact : c'est ce qui annule le terme en $R$. Sans cela, la formule $\langle H',\varphi\rangle=\varphi(0)$ n'est plus établie. — Contre-exemple : Pour $\varphi(x)=1$, de dérivée nulle mais non à support compact, $-\int_0^R\varphi'(x)\,dx=0$ pour tout $R$, alors que $\varphi(0)=1$.
- `loc` (nécessaire) : Sans intégrabilité locale, la formule $\int_{\mathbb R}u\varphi$ ne définit pas une distribution régulière. — Contre-exemple : $x\mapsto 1/|x|$ n'est pas intégrable au voisinage de $0$ : pour une fonction test $\varphi$ telle que $\varphi(0)\ne 0$, l'intégrale $\int\frac{\varphi(x)}{|x|}\,dx$ diverge.

Calculs fermés : [{"kind":"rational","prompt":"Pour $\\varphi\\in\\mathcal D(\\mathbb R)$ telle que $\\varphi(0)=3$, valeur de $\\langle H',\\varphi\\rangle$","expected":"3"}]

Solution :
**Intégrabilité locale.** $H$ est mesurable et $|H|\le 1$, donc $H$ est intégrable sur tout compact : $H\in L^1_{\mathrm{loc}}(\mathbb R)$, et $H$ définit une distribution régulière.

**Calcul.** Soit $\varphi\in\mathcal D(\mathbb R)$ et $R>0$ tel que $\operatorname{supp}\varphi\subset\,]-R,R[$. Par définition de la dérivée distributionnelle (facteur $-1$ pour $|\alpha|=1$),
$$\langle H',\varphi\rangle=-\int_{\mathbb R}H(x)\varphi'(x)\,dx=-\int_0^R\varphi'(x)\,dx=-\big(\varphi(R)-\varphi(0)\big)=\varphi(0),$$
la dernière égalité venant de $\varphi(R)=0$.

**Conclusion.** $\langle H',\varphi\rangle=\varphi(0)=\langle\delta_0,\varphi\rangle$ pour toute fonction test, donc $H'=\delta_0$ dans $\mathcal D'(\mathbb R)$, où $\delta_0$ est la distribution de Dirac en $0$.

**Point de vigilance.** $H$ est dérivable sur $\mathbb R^*$ de dérivée nulle : la dérivée presque partout est nulle, alors que la dérivée distributionnelle ne l'est pas. La distribution de Dirac n'est pas une fonction : aucun $g\in L^1_{\mathrm{loc}}(\mathbb R)$ ne vérifie $\delta_0=T_g$, comme le montre le test sur $\varphi_n(x)=\chi(nx)$ pour $\chi\in\mathcal D(\mathbb R)$ avec $\chi(0)=1$.

Indices :
1. Une dérivée distributionnelle ne se calcule pas point par point : quel objet écrit-on en premier, pour une fonction test $\varphi$ ?
2. Écris $\langle H',\varphi\rangle=-\int_{\mathbb R}H\varphi'$, puis réduis l'intégrale au domaine où $H$ ne s'annule pas.
3. Il reste $-\int_0^R\varphi'(x)\,dx$. Le théorème fondamental donne $\varphi(R)-\varphi(0)$, et $\varphi(R)=0$ par le support de $\varphi$.

Erreurs fréquentes :
- Oublier le facteur $(-1)^{|\alpha|}$ : on trouverait $-\delta_0$.
- Conclure $H'=0$ parce que $H$ a une dérivée nulle sur $\mathbb R^*$.
- Traiter $\delta_0$ comme une fonction de $L^1_{\mathrm{loc}}$ : ce n'est pas une distribution régulière.

Variante : Soient $a<b$ deux réels et $u=\mathbb 1_{]a,b[}$. Calculer $u'$ dans $\mathcal D'(\mathbb R)$.

Solution de la variante : $u$ est mesurable et bornée, donc localement intégrable. Pour $\varphi\in\mathcal D(\mathbb R)$ :
$$\langle u',\varphi\rangle=-\int_{\mathbb R}u\varphi'=-\int_a^b\varphi'(x)\,dx=-\big(\varphi(b)-\varphi(a)\big)=\varphi(a)-\varphi(b).$$
Donc $u'=\delta_a-\delta_b$, où $\delta_c$ désigne la distribution de Dirac en $c$, définie par $\langle\delta_c,\varphi\rangle=\varphi(c)$. Comme pour la fonction de Heaviside, la dérivée presque partout de $u$ est nulle, sans que $u'$ le soit.

Graphe de la variante :
But : `fin` — usage : application

Nœuds :
- `d-u` (definition) : $u=\mathbb 1_{]a,b[}$ sur $\mathbb R$, avec $a<b$.
- `d-phi` (definition, locale) : Soit $\varphi\in\mathcal D(\mathbb R)$.
- `d-delta` (definition) : Pour $c\in\mathbb R$ : $\langle\delta_c,\psi\rangle=\psi(c)$ pour $\psi\in\mathcal D(\mathbb R)$ (distribution de Dirac en $c$).
- `loc` (consequence) : $u\in L^1_{\mathrm{loc}}(\mathbb R)$.
- `def` (egalite) : $\langle u',\varphi\rangle=-\int_{\mathbb R}u\,\varphi'=-\int_a^b\varphi'(x)\,dx$.
- `ftc` (egalite) : $\int_a^b\varphi'(x)\,dx=\varphi(b)-\varphi(a)$.
- `val` (egalite) : $\langle u',\varphi\rangle=\varphi(a)-\varphi(b)$.
- `fin` (conclusion) : $u'=\delta_a-\delta_b$ dans $\mathcal D'(\mathbb R)$.
- `x-signe` (consequence, DISTRACTEUR) : $u'=\delta_b-\delta_a$ dans $\mathcal D'(\mathbb R)$.
- `x-nul` (consequence, DISTRACTEUR) : $u'=0$ dans $\mathcal D'(\mathbb R)$, car $u$ est constante par morceaux.

Règles :
- `d-u` ⟹ `loc` par « $u$ est mesurable et bornée. »
- `loc` + `d-phi` ⟹ `def` par « Définition de la dérivée distributionnelle, puis expression de $u$. »
- `d-phi` ⟹ `ftc` par « Théorème fondamental du calcul intégral. [theoreme-fondamental] »
- `def` + `ftc` ⟹ `val` par « Report des égalités précédentes. »
- `val` + `d-delta` ⟹ `fin` par « Égalité des distributions sur toutes les fonctions tests. »

Justifications sans règle (séduisantes ou fausses) : « La dérivée presque partout est nulle, donc la dérivée distributionnelle aussi. »

Pièges :
- `x-signe` → incorrect [distributions-signe] : Le signe se retrouve en écrivant $\langle u',\varphi\rangle=-\int_a^b\varphi'$ : le point $a$ reçoit le signe $+$ et le point $b$ le signe $-$. — Contre-exemple : Pour $\varphi$ telle que $\varphi(a)=1$ et $\varphi(b)=0$, on a $\langle u',\varphi\rangle=1$, alors que $\langle\delta_b-\delta_a,\varphi\rangle=-1$.
- `x-nul` → incorrect [distributions-derivee-pp] : La dérivée presque partout de cette fonction est nulle, mais sa dérivée distributionnelle garde la trace des sauts aux extrémités. — Contre-exemple : Si $\varphi(a)=1$ et $\varphi(b)=0$, alors $\langle u',\varphi\rangle=1\neq 0$.

Retraits :
- `loc` (nécessaire) : Sans $u\in L^1_{\mathrm{loc}}(\mathbb R)$, la formule $\int u\varphi$ ne définit pas de distribution régulière. — Contre-exemple : $x\mapsto 1/|x-a|$ n'est pas intégrable près de $a$ : la formule $\int\frac{\varphi(x)}{|x-a|}\,dx$ diverge dès que $\varphi(a)\ne 0$.

Vérification : {"origin":"polycopie","review":"machine"}

## Exercice intermediaire `distributions.intermediaire` : Dérivée distributionnelle de $|x|$

Énoncé : Soit $u(x)=|x|$ sur $\mathbb R$. Montrer que $u\in L^1_{\mathrm{loc}}(\mathbb R)$ et que $u'=\operatorname{sgn}$ dans $\mathcal D'(\mathbb R)$, où $\operatorname{sgn}(x)=1$ si $x>0$ et $\operatorname{sgn}(x)=-1$ si $x<0$.
Source : {"doc":"polycopie","pdfPage":39,"label":"Exercice 8, intermédiaire"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `d-u` (definition) : $u(x)=|x|$ sur $\mathbb R$ ; $\operatorname{sgn}(x)=1$ si $x>0$, $\operatorname{sgn}(x)=-1$ si $x<0$.
- `d-phi` (definition, locale) : Soit $\varphi\in\mathcal D(\mathbb R)$ et $R>0$ tel que $\operatorname{supp}\varphi\subset\,]-R,R[$.
- `loc` (consequence) : $u$ et $\operatorname{sgn}$ appartiennent à $L^1_{\mathrm{loc}}(\mathbb R)$.
- `def` (egalite) : $\langle u',\varphi\rangle=-\int_{\mathbb R}|x|\,\varphi'(x)\,dx$.
- `chasles` (egalite) : $-\int_{\mathbb R}|x|\,\varphi'(x)\,dx=\int_{-R}^0x\varphi'(x)\,dx-\int_0^Rx\varphi'(x)\,dx$.
- `cont0` (consequence) : $|x|$ est continue en $0$ et s'y annule.
- `bord` (egalite, calcul rational) : $\big[x\varphi(x)\big]_{0}^{R}=0$ et $\big[x\varphi(x)\big]_{-R}^{0}=0$.
  - valeur attendue : "0"
- `ipp-p` (egalite) : $\int_0^Rx\varphi'(x)\,dx=-\int_0^R\varphi(x)\,dx$.
- `ipp-m` (egalite) : $\int_{-R}^0x\varphi'(x)\,dx=-\int_{-R}^0\varphi(x)\,dx$.
- `somme` (egalite) : $\langle u',\varphi\rangle=\int_0^R\varphi(x)\,dx-\int_{-R}^0\varphi(x)\,dx$.
- `sgn` (egalite) : $\int_{\mathbb R}\operatorname{sgn}(x)\,\varphi(x)\,dx=\int_0^R\varphi(x)\,dx-\int_{-R}^0\varphi(x)\,dx$.
- `fin` (conclusion) : $u\in L^1_{\mathrm{loc}}(\mathbb R)$ et $u'=\operatorname{sgn}$ dans $\mathcal D'(\mathbb R)$.
- `x-dirac` (consequence, DISTRACTEUR) : $u'=\operatorname{sgn}+2\delta_0$ dans $\mathcal D'(\mathbb R)$.
- `x-non-existe` (consequence, DISTRACTEUR) : Comme $|x|$ n'est pas dérivable en $0$, $u$ n'admet pas de dérivée dans $\mathcal D'(\mathbb R)$.
- `x-ipp` (egalite, DISTRACTEUR) : $\int_0^Rx\varphi'(x)\,dx=-\varphi(0)-\int_0^R\varphi(x)\,dx$.

Règles :
- `d-u` ⟹ `loc` par « $|x|$ est continue et $\operatorname{sgn}$ est mesurable bornée : ces fonctions sont intégrables sur tout compact. »
- `loc` + `d-phi` ⟹ `def` par « Définition de la dérivée distributionnelle et de la distribution régulière $T_u$. »
- `d-u` + `d-phi` ⟹ `chasles` par « Relation de Chasles, $|x|=x$ sur $[0,R]$, $|x|=-x$ sur $[-R,0]$, et $\varphi'$ nulle hors de $]-R,R[$. »
- `d-u` ⟹ `cont0` par « $|x|$ s'annule en $0$ et ne présente pas de saut en ce point. »
- `d-phi` + `cont0` ⟹ `bord` par « Le facteur $x$ s'annule en $0$, et $\varphi(\pm R)=0$ par le support. »
- `d-phi` + `bord` ⟹ `ipp-p` par « Intégration par parties sur un segment, pour des fonctions de classe $C^1$. »
- `d-phi` + `bord` ⟹ `ipp-m` par « Intégration par parties sur un segment, pour des fonctions de classe $C^1$. »
- `def` + `chasles` + `ipp-p` + `ipp-m` ⟹ `somme` par « Report des deux intégrations par parties dans le découpage. »
- `d-u` + `d-phi` ⟹ `sgn` par « Valeur de $\operatorname{sgn}$ sur chaque intervalle et support de $\varphi$. »
- `somme` + `sgn` + `loc` ⟹ `fin` par « Deux distributions régulières qui coïncident sur toute fonction test sont égales. »

Justifications sans règle (séduisantes ou fausses) : « $|x|$ est dérivable sur $\mathbb R^*$, de dérivée $\operatorname{sgn}$ : la dérivée presque partout est donc la dérivée distributionnelle. » ; « La dérivée de $|x|$ saute en $0$ : il faut donc lui ajouter un terme de Dirac en ce point. » ; « Une fonction non dérivable en un point n’admet pas de dérivée distributionnelle. »

Pièges :
- `x-dirac` → incorrect [distributions-bord-saut] : Un terme de Dirac en $0$ traduirait un saut de $u$ en $0$. Or $|x|$ est continue en $0$ : c'est $u'$ qui saute, et ce saut n'apparaîtra qu'en dérivant une seconde fois. — Contre-exemple : Pour $\varphi$ paire avec $\varphi(0)=1$ : $\langle u',\varphi\rangle=-\int|x|\varphi'=0$ (intégrande impaire), tandis que $\langle\operatorname{sgn}+2\delta_0,\varphi\rangle=2$.
- `x-non-existe` → incorrect [distributions-existence] : La dérivée distributionnelle existe toujours : $\partial^\alpha T$ est définie pour toute distribution $T$, sans condition de régularité. — Contre-exemple : $u\in L^1_{\mathrm{loc}}(\mathbb R)$ définit une distribution, et sa dérivée se calcule par $\langle u',\varphi\rangle=-\int|x|\varphi'$.
- `x-ipp` → incorrect [distributions-bord-saut] : Le crochet en $0$ vaut $0\cdot\varphi(0)=0$ : l'intégration par parties ne produit aucun terme $\varphi(0)$. — Contre-exemple : Pour $\varphi$ avec $\varphi(0)\neq 0$, le terme $-\varphi(0)$ est faux : le crochet $[x\varphi(x)]_0^R$ est nul.
- `fin` par « $|x|$ est dérivable sur $\mathbb R^*$, de dérivée $\operatorname{sgn}$ : la dérivée presque partout est donc la dérivée distributionnelle. » → incorrect [distributions-derivee-pp] : La dérivée presque partout ne détermine pas la dérivée distributionnelle : la conclusion est juste, mais il faut un argument, celui du calcul de $\langle u',\varphi\rangle$. — Contre-exemple : $H$ a une dérivée presque partout nulle, et pourtant $H'=\delta_0\neq 0$.
- `fin` par « Une fonction non dérivable en un point n’admet pas de dérivée distributionnelle. » → incorrect [distributions-existence] : La dérivée distributionnelle existe sans condition de dérivabilité ponctuelle.

Retraits :
- `cont0` (nécessaire) : Si la fonction présentait un saut en $0$, les crochets en $0$ ne seraient plus nuls et un terme de Dirac apparaîtrait dans la dérivée. — Contre-exemple : $v=|x|+H$ présente un saut en $0$, et $v'=\operatorname{sgn}+\delta_0$, d'après le calcul de $H'$.

Calculs fermés : [{"kind":"rational","prompt":"Pour $\\varphi\\in\\mathcal D(\\mathbb R)$ paire, valeur de $\\langle u',\\varphi\\rangle$","expected":"0"}]

Solution :
**Intégrabilité locale.** $u$ est continue et $\operatorname{sgn}$ est mesurable et bornée : ces deux fonctions sont intégrables sur tout compact, donc appartiennent à $L^1_{\mathrm{loc}}(\mathbb R)$.

**Calcul.** Soit $\varphi\in\mathcal D(\mathbb R)$ et $R>0$ tel que $\operatorname{supp}\varphi\subset\,]-R,R[$. Par définition,
$$\langle u',\varphi\rangle=-\int_{\mathbb R}|x|\varphi'(x)\,dx=\int_{-R}^0x\varphi'(x)\,dx-\int_0^Rx\varphi'(x)\,dx.$$
Intégrons par parties sur chaque segment. Les crochets $[x\varphi(x)]_0^R$ et $[x\varphi(x)]_{-R}^0$ sont nuls : en $\pm R$ car $\varphi(\pm R)=0$, en $0$ car le facteur $x$ s'y annule. Il vient
$$\int_0^Rx\varphi'(x)\,dx=-\int_0^R\varphi(x)\,dx,\qquad\int_{-R}^0x\varphi'(x)\,dx=-\int_{-R}^0\varphi(x)\,dx,$$
d'où
$$\langle u',\varphi\rangle=\int_0^R\varphi(x)\,dx-\int_{-R}^0\varphi(x)\,dx=\int_{\mathbb R}\operatorname{sgn}(x)\varphi(x)\,dx.$$
Donc $u'=\operatorname{sgn}$ dans $\mathcal D'(\mathbb R)$.

**Point de vigilance.** $|x|$ n'est pas dérivable en $0$ au sens classique, mais cela n'empêche pas $u'$ d'exister. Il n'y a pas de terme de Dirac dans $u'$ : la fonction $|x|$ est continue en $0$, et les crochets en $0$ s'annulent. Le saut de $u'$ en $0$ n'apparaîtra qu'en dérivant une seconde fois.

Indices :
1. $|x|$ n'est pas dérivable en $0$ au sens classique : ne cherche pas une formule ponctuelle, teste contre une fonction $\varphi$.
2. Découpe $-\int|x|\varphi'$ en $\int_{-R}^0x\varphi'-\int_0^Rx\varphi'$ et intègre par parties sur chacun des deux segments.
3. Les crochets sont nuls : en $0$ le facteur $x$ s'annule, en $\pm R$ c'est $\varphi$. Il reste $\int_0^R\varphi-\int_{-R}^0\varphi$.

Erreurs fréquentes :
- Ajouter un terme de Dirac à $u'$ parce que la dérivée classique saute en $0$.
- Conclure directement que la dérivée distributionnelle est la dérivée presque partout, sans calcul.
- Affirmer que la dérivée distributionnelle de $|x|$ n'existe pas parce que $|x|$ n'est pas dérivable en $0$.

Variante : Soit $u(x)=x_+=\max(x,0)$ sur $\mathbb R$. Montrer que $u\in L^1_{\mathrm{loc}}(\mathbb R)$ et calculer $u'$ dans $\mathcal D'(\mathbb R)$.

Solution de la variante : $u$ est continue, donc $u\in L^1_{\mathrm{loc}}(\mathbb R)$. Pour $\varphi\in\mathcal D(\mathbb R)$ à support dans $]-R,R[$ : $\langle u',\varphi\rangle=-\int_0^Rx\varphi'(x)\,dx$. L'intégration par parties, de crochet nul en $0$ (facteur $x$) et en $R$ (support), donne $\int_0^Rx\varphi'(x)\,dx=-\int_0^R\varphi(x)\,dx$. Donc $\langle u',\varphi\rangle=\int_0^R\varphi(x)\,dx=\int_{\mathbb R}H\varphi$, c'est-à-dire $u'=H$ dans $\mathcal D'(\mathbb R)$, où $H$ est la fonction de Heaviside.

Vérification : {"origin":"complement","review":"machine"}

## Exercice difficile `distributions.difficile` : Dérivée seconde distributionnelle de $|x|$ et terme de Dirac

Énoncé : Soit $u(x)=|x|$ sur $\mathbb R$. Calculer $u''$ dans $\mathcal D'(\mathbb R)$. Interpréter le terme de Dirac obtenu, en montrant que $u''$ n'est pas représentable par une fonction de $L^1_{\mathrm{loc}}(\mathbb R)$ et que $u$ appartient à $H^1(]-1,1[)$ sans appartenir à $H^2(]-1,1[)$.
Source : {"doc":"polycopie","pdfPage":39,"label":"Exercice 8, difficile"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `d-u` (definition) : $u(x)=|x|$ sur $\mathbb R$.
- `h-prem` (hypothese) : $u'=\operatorname{sgn}$ dans $\mathcal D'(\mathbb R)$ (exercice précédent).
- `d-phi` (definition, locale) : Soit $\varphi\in\mathcal D(\mathbb R)$ et $R>0$ tel que $\operatorname{supp}\varphi\subset\,]-R,R[$.
- `d-delta` (definition) : $\delta_0$ est la distribution de Dirac en $0$ : $\langle\delta_0,\psi\rangle=\psi(0)$.
- `h-chi` (definition) : $\chi\in\mathcal D(\mathbb R)$ vérifie $\chi(0)=1$, $0\le\chi\le 1$ et $\operatorname{supp}\chi\subset[-1,1]$.
- `bord` (egalite) : $\varphi(\pm R)=0$ et $\varphi'(\pm R)=0$.
- `v-def` (egalite) : $\langle u'',\varphi\rangle=-\langle\operatorname{sgn},\varphi'\rangle=\int_{-R}^0\varphi'(x)\,dx-\int_0^R\varphi'(x)\,dx$.
- `v-ftc` (egalite) : $\int_{-R}^0\varphi'(x)\,dx=\varphi(0)$ et $\int_0^R\varphi'(x)\,dx=-\varphi(0)$.
- `w-def` (egalite) : $\langle u'',\varphi\rangle=(-1)^2\langle u,\varphi''\rangle=\int_{\mathbb R}|x|\varphi''(x)\,dx$.
- `w-ipp` (egalite) : $\int_0^Rx\varphi''(x)\,dx=\varphi(0)$ et $\int_{-R}^0(-x)\varphi''(x)\,dx=\varphi(0)$.
- `val` (egalite, calcul expr-equiv) : $\langle u'',\varphi\rangle=2\varphi(0)$.
  - valeur attendue : "2p"
- `eg` (egalite) : $u''=2\delta_0$ dans $\mathcal D'(\mathbb R)$.
- `saut` (egalite) : Le coefficient $2$ est le saut de $u'$ en $0$ : $u'(0^+)-u'(0^-)=1-(-1)=2$.
- `abs` (hypothese, locale) : Supposons qu'il existe $g\in L^1(]-1,1[)$ telle que $\int_{-1}^1g\psi=2\psi(0)$ pour tout $\psi\in\mathcal D(]-1,1[)$.
- `phi-n` (consequence) : Pour $n\ge 2$, $\varphi_n(x)=\chi(nx)$ appartient à $\mathcal D(]-1,1[)$, avec $\varphi_n(0)=1$ et $\operatorname{supp}\varphi_n\subset[-1/n,1/n]$.
- `eg-deux` (egalite) : Pour $n\ge 2$ : $\int_{-1}^1g\varphi_n=2$.
- `lim-zero` (inegalite) : $\left|\int_{-1}^1g\varphi_n\right|\le\int_{-1/n}^{1/n}|g|$, et ce majorant tend vers $0$ quand $n\to+\infty$.
- `contra` (contradiction) : Par passage à la limite, $2\le 0$ : contradiction.
- `non-reg` (consequence) : Aucune $g\in L^1(]-1,1[)$ ne représente $2\delta_0$ sur $]-1,1[$.
- `h1` (consequence) : $u\in H^1(]-1,1[)$.
- `non-h2` (consequence) : $u\notin H^2(]-1,1[)$.
- `fin` (conclusion) : $u''=2\delta_0$ dans $\mathcal D'(\mathbb R)$ ; ce terme de Dirac, de coefficient le saut de $u'$ en $0$, n'est pas représentable par une fonction ; $u\in H^1(]-1,1[)$ et $u\notin H^2(]-1,1[)$.
- `x-nul` (consequence, DISTRACTEUR) : $u''=0$ dans $\mathcal D'(\mathbb R)$, car $u$ est affine sur chaque demi-droite.
- `x-un` (consequence, DISTRACTEUR) : $u''=\delta_0$ dans $\mathcal D'(\mathbb R)$.
- `x-l2` (consequence, DISTRACTEUR) : Comme $u'=\operatorname{sgn}$ est bornée, on a $u''\in L^2(]-1,1[)$.

Règles :
- `d-phi` ⟹ `bord` par « Le support de $\varphi$ est contenu dans $]-R,R[$ : $\varphi$ et $\varphi'$ s'annulent en $\pm R$. »
- `h-prem` + `d-phi` ⟹ `v-def` par « Définition de la dérivée distributionnelle appliquée à $\operatorname{sgn}$, puis découpage de l'intégrale en $0$. » (chemin par-sgn)
- `d-phi` + `bord` ⟹ `v-ftc` par « Théorème fondamental du calcul intégral et annulation en $\pm R$. [theoreme-fondamental] » (chemin par-sgn)
- `v-def` + `v-ftc` ⟹ `val` par « Report des égalités précédentes. » (chemin par-sgn)
- `d-u` + `d-phi` ⟹ `w-def` par « Définition de la dérivée distributionnelle à l'ordre $2$ : le facteur est $(-1)^2=1$. » (chemin directe)
- `d-phi` + `bord` ⟹ `w-ipp` par « Intégration par parties sur $[0,R]$ et sur $[-R,0]$, les crochets en $0$ et $\pm R$ étant nuls. » (chemin directe)
- `w-def` + `w-ipp` ⟹ `val` par « Report des égalités précédentes. » (chemin directe)
- `val` + `d-delta` ⟹ `eg` par « Égalité des distributions sur toutes les fonctions tests. »
- `h-prem` ⟹ `saut` par « Valeurs de $\operatorname{sgn}$ à droite et à gauche de $0$. »
- `h-chi` ⟹ `phi-n` par « Changement d'échelle : le support de $\varphi_n$ est celui de $\chi$ divisé par $n$. »
- `abs` + `phi-n` ⟹ `eg-deux` par « Égalité $\int g\psi=2\psi(0)$ appliquée à $\psi=\varphi_n$, avec $\varphi_n(0)=1$. »
- `abs` + `phi-n` ⟹ `lim-zero` par « Majoration par le support de $\varphi_n$, puis convergence dominée ($g\in L^1(]-1,1[)$). [convergence-dominee] »
- `eg-deux` + `lim-zero` ⟹ `contra` par « Passage à la limite dans une égalité et une majoration incompatibles. »
- `contra` ⟹ `non-reg` par « Raisonnement par l’absurde. »
- `d-u` + `h-prem` ⟹ `h1` par « $u$ est bornée sur $]-1,1[$ et $u'=\operatorname{sgn}$, de carré intégrable sur cet intervalle. »
- `eg` + `non-reg` ⟹ `non-h2` par « Si $u\in H^2(]-1,1[)$, alors $u''$ serait une fonction de $L^2(]-1,1[)\subset L^1(]-1,1[)$ représentant $2\delta_0$ sur $]-1,1[$. »
- `eg` + `saut` + `non-reg` + `h1` + `non-h2` ⟹ `fin` par « Réunion des résultats établis. »

Justifications sans règle (séduisantes ou fausses) : « Le point $0$ est de mesure nulle : il ne peut contribuer à $u''$. » ; « $u'$ est bornée, donc sa dérivée est de carré intégrable. »

Pièges :
- `x-nul` → incorrect [distributions-derivee-pp] : $u$ est affine sur chaque demi-droite : la dérivée seconde presque partout est nulle, mais la fonction test voit le raccord en $0$. — Contre-exemple : Si $\varphi(0)=1$, alors $\langle u'',\varphi\rangle=\int|x|\varphi''=2\ne 0$.
- `x-un` → incorrect [distributions-bord-saut] : Le coefficient de $\delta_0$ est le saut de $u'$ en $0$, soit $1-(-1)=2$. — Contre-exemple : Si $\varphi(0)=1$, alors $\langle u'',\varphi\rangle=2$, et non $1$.
- `x-l2` → incorrect [distributions-dirac] : Une dérivée bornée n'a aucune raison d'avoir elle-même une dérivée dans $L^2$ : ici, $u''$ est un terme de Dirac. — Contre-exemple : $H$ est bornée, et pourtant $H'=\delta_0$ n'est pas une fonction.
- `eg` par « Le point $0$ est de mesure nulle : il ne peut contribuer à $u''$. » → incorrect [distributions-derivee-pp] : Un point de mesure nulle ne compte pas pour l’intégrale d’une fonction, mais une distribution peut y être concentrée. — Contre-exemple : $\delta_0$ est concentrée en $\{0\}$, et $\langle\delta_0,\varphi\rangle=\varphi(0)$ n'est pas nul.
- `non-h2` par « $u'$ est bornée, donc sa dérivée est de carré intégrable. » → incorrect [distributions-dirac] : Cette justification est fausse : une borne sur $u'$ ne donne rien sur $u''$.

Retraits :
- `bord` (nécessaire) : Sans le support compact, les termes de bord en $\pm R$ ne disparaissent pas et le calcul ne se referme pas. — Contre-exemple : Pour $\varphi(x)=1$, de dérivée nulle : $\int_{\mathbb R}|x|\varphi''=0$, alors que $2\varphi(0)=2$.
- `h-chi` (nécessaire) : La non-représentabilité de $2\delta_0$ s'obtient en testant près de $0$ : il faut des fonctions tests de valeur non nulle en $0$. — Contre-exemple : Sur les fonctions tests nulles en $0$, on a $\langle 2\delta_0,\psi\rangle=0$ : $2\delta_0$ y est indiscernable de $T_0$, et l'argument ne se forme plus.

Calculs fermés : [{"kind":"rational","prompt":"Pour $\\varphi\\in\\mathcal D(\\mathbb R)$ telle que $\\varphi(0)=5$, valeur de $\\langle u'',\\varphi\\rangle$","expected":"10"},{"kind":"rational","prompt":"Saut de $u'$ en $0$, c'est-à-dire $u'(0^+)-u'(0^-)$","expected":"2"}]

Solution :
**Calcul.** Soit $\varphi\in\mathcal D(\mathbb R)$, $\operatorname{supp}\varphi\subset\,]-R,R[$. D'après l'exercice précédent, $u'=\operatorname{sgn}$. Par définition,
$$\langle u'',\varphi\rangle=-\langle\operatorname{sgn},\varphi'\rangle=-\int_{\mathbb R}\operatorname{sgn}(x)\varphi'(x)\,dx=\int_{-R}^0\varphi'(x)\,dx-\int_0^R\varphi'(x)\,dx.$$
Le théorème fondamental et $\varphi(\pm R)=0$ donnent $\int_{-R}^0\varphi'=\varphi(0)$ et $\int_0^R\varphi'=-\varphi(0)$. Donc $\langle u'',\varphi\rangle=2\varphi(0)$, soit $u''=2\delta_0$ dans $\mathcal D'(\mathbb R)$.

*Autre voie.* On obtient le même résultat sans passer par $\operatorname{sgn}$ : $\langle u'',\varphi\rangle=\int_{\mathbb R}|x|\varphi''$, et l'intégration par parties sur chaque demi-droite donne $\int_0^Rx\varphi''=\varphi(0)$ et $\int_{-R}^0(-x)\varphi''=\varphi(0)$.

**Interprétation du terme de Dirac.** Le coefficient $2$ est le saut de $u'$ en $0$ : $u'(0^+)-u'(0^-)=1-(-1)=2$. La distribution $2\delta_0$ n'est représentée par aucune fonction localement intégrable. En effet, soit $g\in L^1(]-1,1[)$ telle que $\int_{-1}^1g\psi=2\psi(0)$ pour tout $\psi\in\mathcal D(]-1,1[)$. Pour $\chi\in\mathcal D(\mathbb R)$ avec $\chi(0)=1$, $0\le\chi\le 1$, $\operatorname{supp}\chi\subset[-1,1]$, et pour $n\ge 2$, posons $\varphi_n(x)=\chi(nx)$ : alors $\int_{-1}^1g\varphi_n=2$, tandis que $\left|\int_{-1}^1g\varphi_n\right|\le\int_{-1/n}^{1/n}|g|\to 0$ par convergence dominée, ce qui est impossible. A fortiori, $u''$ n'est représentée par aucune fonction de $L^1_{\mathrm{loc}}(\mathbb R)$.

**Conséquence.** $u\in H^1(]-1,1[)$, car $u$ est bornée sur $]-1,1[$ et $u'=\operatorname{sgn}$ y est de carré intégrable. En revanche, si $u\in H^2(]-1,1[)$, alors $u''$ serait une fonction de $L^2(]-1,1[)\subset L^1(]-1,1[)$ représentant $2\delta_0$ sur $]-1,1[$, ce qui est exclu : $u\notin H^2(]-1,1[)$.

Indices :
1. Deux voies : repartir de $u'=\operatorname{sgn}$, ou écrire $\langle u'',\varphi\rangle=\int|x|\varphi''$. Dans les deux cas, découpe l'intégrale en $0$.
2. Pour montrer que $2\delta_0$ n'est pas une fonction, suppose qu'une fonction $g\in L^1(]-1,1[)$ la représente, et teste-la sur des fonctions concentrées près de $0$.
3. $\varphi_n(x)=\chi(nx)$ vaut $1$ en $0$ et son support rétrécit autour de $0$ : $\int g\varphi_n\to 0$, alors que $\langle 2\delta_0,\varphi_n\rangle=2$.

Erreurs fréquentes :
- Conclure $u''=0$ parce que $u$ est affine sur chaque demi-droite.
- Prendre un coefficient $1$ au lieu du saut, qui vaut $2$.
- Considérer $2\delta_0$ comme une fonction, nulle hors de $0$.

Variante : Soit $u(x)=x|x|$ sur $\mathbb R$. Calculer $u'$, $u''$ et $u'''$ dans $\mathcal D'(\mathbb R)$. En déduire l'appartenance de $u$ à $H^2(]-1,1[)$ et sa non-appartenance à $H^3(]-1,1[)$.

Solution de la variante : $u$ est de classe $C^1$ sur $\mathbb R$, avec $u'(x)=2|x|$ : la dérivée distributionnelle coïncide alors avec la dérivée classique. Puis $u''=2\operatorname{sgn}$ (exercice intermédiaire), et $u'''=2\operatorname{sgn}'=4\delta_0$, car $\operatorname{sgn}'=2\delta_0$ (même calcul que pour $u''$ dans l'exercice). Sur $]-1,1[$, $u''$ est bornée, donc $u\in H^2(]-1,1[)$ ; le terme $4\delta_0$ n'est représentable par aucune fonction de $L^1(]-1,1[)$, donc $u\notin H^3(]-1,1[)$. Le terme de Dirac n'apparaît qu'à l'ordre où la dérivée précédente présente un saut.

Vérification : {"origin":"complement","review":"machine"}