# 28. Hille–Yosida (`hille-yosida`) — polycopié p. PDF 26, section 6.8

## Fiche

Espaces : $X$ : espace de Banach réel ou complexe ; $\mathcal L(X)$ : opérateurs bornés sur $X$. | $A:D(A)\subset X\to X$ : opérateur linéaire fermé, densément défini. | $\rho(A)$ : ensemble des $\lambda$ tels que $\lambda I-A:D(A)\to X$ soit bijectif d'inverse borné ; $R(\lambda,A)=(\lambda I-A)^{-1}$. | $(S(t))_{t\ge0}\subset\mathcal L(X)$ : $C_0$-semi-groupe, de contractions lorsque $\|S(t)\|\le1$ pour tout $t\ge0$.

Hypothèses :
- $X$ est un espace de Banach. — Sans elle : Rôle dans la démonstration : la limite $S(t)x=\lim_ne^{tA_n}x$ est obtenue par le critère de Cauchy, qui repose sur la complétude de $X$.
- $A$ est fermé. — Sans elle : Tout générateur est fermé ; et si $\rho(A)\neq\emptyset$, $A$ est automatiquement fermé, car pour $\lambda\in\rho(A)$, $\lambda I-A$ est l'inverse d'un opérateur borné partout défini.
- $D(A)$ est dense dans $X$. — Sans elle : Sur $X=C([0,1])$, $Au=-u'$ de domaine $\{u\in C^1([0,1]):u(0)=0\}$ vérifie $\|R(\lambda,A)\|\le1/\lambda$ pour tout $\lambda>0$, mais $D(A)$ n'est pas dense : $A$ n'engendre aucun $C_0$-semi-groupe.

Énoncé : Un opérateur $A:D(A)\subset X\to X$ fermé et densément défini sur un Banach engendre un $C_0$-semi-groupe de contractions si et seulement si
$$]0,\infty[\,\subset\rho(A),\qquad\|R(\lambda,A)\|\le\frac1\lambda\quad\forall\lambda>0.$$

Bilan : {"existence":"Sens réciproque : sous la condition de résolvante, il existe un $C_0$-semi-groupe de contractions de générateur $A$, limite forte des $e^{tA_n}$.","autre":"Sens direct : pour un semi-groupe de contractions de générateur $A$, $R(\\lambda,A)x=\\int_0^\\infty e^{-\\lambda t}S(t)x\\,dt$ et $\\|R(\\lambda,A)\\|\\le1/\\lambda$."}

Preuve dans le polycopié : idee

Plan :
1. Sens direct (polycopié) : pour $\lambda>0$, $R_\lambda x=\int_0^\infty e^{-\lambda t}S(t)x\,dt$ converge dans $X$, de norme au plus $\|x\|/\lambda$.
2. Complément : $R_\lambda$ inverse $\lambda I-A$. En effet $\frac{S(h)-I}{h}R_\lambda x=\frac{e^{\lambda h}-1}{h}\int_h^\infty e^{-\lambda t}S(t)x\,dt-\frac1h\int_0^he^{-\lambda t}S(t)x\,dt\to\lambda R_\lambda x-x$, et $R_\lambda Ax=AR_\lambda x$ pour $x\in D(A)$.
3. Sens réciproque (plan du polycopié) : $A_n=n^2R(n,A)-nI=nA(nI-A)^{-1}$ est borné et $\|e^{tA_n}\|\le1$.
4. $nR(n,A)x\to x$ pour tout $x$, grâce à la densité de $D(A)$ ; d'où $A_nx\to Ax$ pour $x\in D(A)$.
5. Estimation de Cauchy $\|e^{tA_n}x-e^{tA_m}x\|\le t\|A_nx-A_mx\|$ sur $D(A)$, étendue à $X$ par densité ; la limite $S(t)x$ est uniforme sur $[0,T]$.
6. $S$ est un $C_0$-semi-groupe de contractions ; son générateur $B$ prolonge $A$, et $B=A$ car $I-A$ est surjectif et $I-B$ injectif.

Vigilance :
- Point de vigilance du polycopié : pour $\|S(t)\|\le Me^{\omega t}$ avec $M>1$, la caractérisation requiert des bornes de toutes les puissances de la résolvante, $\|R(\lambda,A)^k\|\le M/(\lambda-\omega)^k$ ; la seule estimation $\|R(\lambda,A)\|\le M/(\lambda-\omega)$ ne suffit pas en général.
- Exemple : $A=\begin{pmatrix}0&3\\-1/3&0\end{pmatrix}$ sur $\mathbb R^2$ vérifie $\|R(\lambda,A)\|\le\frac{5/2}{\lambda}$ pour tout $\lambda>0$, et pourtant $\|e^{(\pi/2)A}\|=3>\frac52$.
- La convergence $e^{tA_n}\to S(t)$ est forte, uniforme en temps sur les intervalles bornés ; elle n'a pas lieu en norme d'opérateur en général.
- Le générateur est donné avec son domaine : il n'est pas défini sur tout $X$, sauf s'il est borné.

Vérification : {"origin":"polycopie","review":"machine","notes":"Énoncé repris du polycopié (p. PDF 26) ; sens direct esquissé et réciproque donnée en plan au polycopié, complétés dans l’exercice difficile."}

Définition « $C_0$-semi-groupe » : Famille $(S(t))_{t\ge0}\subset\mathcal L(X)$ telle que $S(0)=I$, $S(t+s)=S(t)S(s)$ et $\lim_{t\downarrow0}S(t)x=x$ pour chaque $x\in X$.

Définition « Générateur d’un $C_0$-semi-groupe » : $Ax=\lim_{t\downarrow0}\frac{S(t)x-x}{t}$, limite dans $X$, sur le domaine $D(A)$ des $x$ pour lesquels cette limite existe.

Définition « Semi-groupe de contractions » : $C_0$-semi-groupe tel que $\|S(t)\|\le1$ pour tout $t\ge0$.

Définition « Approximations de Yosida » : $A_n=n^2R(n,A)-nI=nA(nI-A)^{-1}$, opérateurs bornés définis dès que $n\in\rho(A)$.

## Contre-exemple `ce-hille-yosida-premiere-puissance` : Borne de la résolvante en première puissance
Assertion : Si $\|R(\lambda,A)\|\le M/(\lambda-\omega)$ pour tout $\lambda>\omega$, alors $A$ engendre un semi-groupe vérifiant $\|S(t)\|\le Me^{\omega t}$.
Tâche : Soit $A=\begin{pmatrix}0&3\\-1/3&0\end{pmatrix}$ sur $\mathbb R^2$ euclidien, $M=\frac52$ et $\omega=0$. Calcule $e^{(\pi/2)A}e_2$, où $e_2=(0,1)$.
Vérification : {"kind":"rational-vector","prompt":"Coordonnées de $e^{(\\pi/2)A}e_2$","expected":["3","0"],"labels":["x₁","x₂"]}
Explication : $A^2=-I$, donc $R(\lambda,A)=\frac{\lambda I+A}{\lambda^2+1}$ et $\|R(\lambda,A)\|\le\frac{\lambda+3}{\lambda^2+1}\le\frac{5/2}{\lambda}$, cette dernière inégalité équivalant à $3\lambda^2-6\lambda+5\ge0$, de discriminant négatif. Mais $e^{tA}=\cos t\,I+\sin t\,A$, donc $e^{(\pi/2)A}=A$ et $Ae_2=(3,0)$ : $\|e^{(\pi/2)A}\|\ge3>\frac52=Me^{\omega\pi/2}$.

## Contre-exemple `ce-hille-yosida-domaine` : Générateur partout défini
Assertion : Le générateur d'un $C_0$-semi-groupe est défini sur tout l'espace.
Tâche : Pour $(S(t)u)_n=e^{-nt}u_n$ sur $\ell^2(\mathbb N^*)$ et $u_n=1/n$, calcule la limite, quand $t\downarrow0$, de la $n$-ième coordonnée de $\frac{S(t)u-u}{t}$.
Vérification : {"kind":"rational","prompt":"Limite de la $n$-ième coordonnée","expected":"-1"}
Explication : $\frac{e^{-nt}-1}{t}\cdot\frac1n=\frac{e^{-nt}-1}{nt}\to-1$ pour tout $n$. Si la limite existait dans $\ell^2$, ses coordonnées seraient ces limites, par continuité des formes coordonnées ; or la suite constante égale à $-1$ n'est pas dans $\ell^2$. Donc $u\notin D(G)$, alors que $u\in\ell^2$.

## Contre-exemple `ce-hille-yosida-densite` : Borne de résolvante sans densité
Assertion : Si $]0,+\infty[\subset\rho(A)$ et $\|R(\lambda,A)\|\le1/\lambda$ pour tout $\lambda>0$, alors $A$ engendre un $C_0$-semi-groupe, même si $D(A)$ n'est pas dense.
Tâche : Sur $X=C([0,1])$ muni de la norme uniforme, soit $Au=-u'$ de domaine $\{u\in C^1([0,1]):u(0)=0\}$. Calcule $\big(nR(n,A)\mathbb 1\big)(0)$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\big(nR(n,A)\\mathbb 1\\big)(0)$","expected":"0"}
Explication : $(\lambda I-A)u=f$ s'écrit $\lambda u+u'=f$, $u(0)=0$, d'où $R(\lambda,A)f(x)=\int_0^xe^{-\lambda(x-s)}f(s)\,ds$ et $\|R(\lambda,A)\|\le1/\lambda$. Pour $f=\mathbb 1$ : $nR(n,A)\mathbb 1(x)=1-e^{-nx}$, nul en $0$, donc $\|nR(n,A)\mathbb 1-\mathbb 1\|_\infty=1$. Tout élément de $D(A)$ s'annule en $0$ : $D(A)$ n'est pas dense, et $A$ n'est pas un générateur, puisque le domaine d'un générateur est toujours dense.

## Exercice facile `hille-yosida.facile` : Générateur d'un semi-groupe diagonal : le domaine exact

Énoncé : Sur $H=\ell^2(\mathbb N^*)$, on pose $(S(t)u)_n=e^{-nt}u_n$ pour $t\ge0$ et $u\in H$.

Rappeler la définition exacte du générateur $G$ d'un $C_0$-semi-groupe : $D(G)$ est l'ensemble des $u\in H$ pour lesquels $\lim_{t\downarrow0}\frac{S(t)u-u}{t}$ existe dans la norme de $H$, et $Gu$ est cette limite. Montrer que $S$ est un $C_0$-semi-groupe de contractions, puis que $D(G)=\{u\in H:\sum_nn^2|u_n|^2<\infty\}$ et $(Gu)_n=-nu_n$. Réfuter l'assertion voisine : « $D(G)=H$, puisque chaque coordonnée de $\frac{S(t)u-u}{t}$ converge ».
Source : {"doc":"polycopie","pdfPage":43,"label":"Exercice 28, facile (p. PDF 43) ; vocabulaire de la section 6.8 (p. PDF 26)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-S` (hypothese) : $H=\ell^2(\mathbb N^*)$ et, pour $t\ge0$ et $u\in H$ : $(S(t)u)_n=e^{-nt}u_n$.
- `d-c0` (definition) : $(S(t))_{t\ge0}\subset\mathcal L(H)$ est un $C_0$-semi-groupe si $S(0)=I$, $S(t+s)=S(t)S(s)$ et $\lim_{t\downarrow0}S(t)u=u$ dans $H$ pour chaque $u\in H$.
- `d-gen` (definition) : Générateur : $D(G)$ est l'ensemble des $u\in H$ tels que $\frac{S(t)u-u}{t}$ admette une limite dans $H$, pour la norme de $H$, quand $t\downarrow0$ ; $Gu$ est cette limite.
- `d-D` (definition) : $D=\{u\in H:\sum_nn^2|u_n|^2<\infty\}$ et $(Au)_n=-nu_n$ pour $u\in D$.
- `s-borne` (inegalite) : Pour tout $t\ge0$ : $S(t)\in\mathcal L(H)$ et $\|S(t)\|\le1$.
- `s-sg` (egalite) : $S(0)=I$ et $S(t+s)=S(t)S(s)$ pour tous $t,s\ge0$.
- `s-fort` (consequence) : Pour tout $u\in H$ : $\|S(t)u-u\|^2=\sum_n(1-e^{-nt})^2|u_n|^2\to0$ quand $t\downarrow0$.
- `s-c0` (consequence) : $S$ est un $C_0$-semi-groupe de contractions.
- `g-coord` (egalite) : Si $u\in D(G)$, alors $(Gu)_n=-nu_n$ pour tout $n$.
- `g-incl1` (inclusion) : $D(G)\subset D$, et $Gu=Au$ pour $u\in D(G)$.
- `g-maj` (inegalite) : Pour $t>0$ et $n\ge1$ : $0\le n-\dfrac{1-e^{-nt}}{t}\le n$.
- `g-dom` (consequence) : Pour $u\in D$ : $\Big\|\dfrac{S(t)u-u}{t}-Au\Big\|^2=\sum_n\Big(n-\dfrac{1-e^{-nt}}{t}\Big)^2|u_n|^2\to0$ quand $t\downarrow0$.
- `g-incl2` (inclusion) : $D\subset D(G)$, et $Gu=Au$ pour $u\in D$.
- `g-eg` (egalite) : $G=A$, domaines inclus : $D(G)=D$.
- `temoin` (consequence) : Pour $u_n=1/n$ : $u\in H$, mais $u\notin D(G)$.
- `fin` (conclusion) : $S$ est un $C_0$-semi-groupe de contractions, de générateur $G$ donné par $D(G)=\{u:\sum_nn^2|u_n|^2<\infty\}\neq H$ et $(Gu)_n=-nu_n$.
- `x-tout` (egalite, DISTRACTEUR) : $D(G)=H$, puisque pour tout $u\in H$ chaque coordonnée de $\frac{S(t)u-u}{t}$ converge quand $t\downarrow0$.
- `x-norme` (consequence, DISTRACTEUR) : $\|S(t)-I\|\to0$ quand $t\downarrow0$.

Règles :
- `h-S` ⟹ `s-borne` par « $0<e^{-nt}\le1$ pour $t\ge0$ et $n\ge1$ : opérateur diagonal de coefficients bornés par $1$. »
- `h-S` ⟹ `s-sg` par « $e^{0}=1$ et $e^{-n(t+s)}=e^{-nt}e^{-ns}$, coordonnée par coordonnée. »
- `h-S` ⟹ `s-fort` par « Convergence dominée pour les séries : chaque terme tend vers $0$ et reste majoré par $|u_n|^2$. [convergence-dominee] »
- `s-borne` + `s-sg` + `s-fort` + `d-c0` ⟹ `s-c0` par « Définition d'un $C_0$-semi-groupe, avec la contractivité établie. »
- `d-gen` + `h-S` ⟹ `g-coord` par « La forme coordonnée $v\mapsto v_n$ est linéaire continue sur $H$, et $\lim_{t\downarrow0}\frac{e^{-nt}-1}{t}=-n$. »
- `g-coord` + `d-D` ⟹ `g-incl1` par « $Gu\in H$, donc $\sum_nn^2|u_n|^2=\|Gu\|^2<\infty$. »
- ∅ ⟹ `g-maj` par « $0\le1-e^{-x}\le x$ pour tout $x\ge0$, appliqué à $x=nt$. »
- `g-maj` + `d-D` + `h-S` ⟹ `g-dom` par « Convergence dominée pour les séries : chaque terme tend vers $0$ et reste majoré par $n^2|u_n|^2$, sommable pour $u\in D$. [convergence-dominee] »
- `g-dom` + `d-gen` ⟹ `g-incl2` par « Définition du générateur : la limite existe dans $H$ et vaut $Au$. »
- `g-incl1` + `g-incl2` ⟹ `g-eg` par « Double inclusion, et égalité des actions. »
- `g-incl1` + `d-D` ⟹ `temoin` par « $\sum_nn^{-2}<\infty$, tandis que $\sum_nn^2\cdot n^{-2}=+\infty$. »
- `s-c0` + `g-eg` + `temoin` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « Une suite de $\ell^2$ qui converge coordonnée par coordonnée converge dans $\ell^2$. » ; « C’est évident. »

Pièges :
- `x-tout` → incorrect [domaine-operateur] : La définition exige une limite dans la norme de $H$ : la limite coordonnée par coordonnée doit encore appartenir à $\ell^2$, et la convergence avoir lieu en norme. — Contre-exemple : $u_n=1/n$ : $u\in H$, chaque coordonnée de $\frac{S(t)u-u}{t}$ tend vers $-1$, et la suite constante égale à $-1$ n'est pas dans $\ell^2$.
- `x-norme` → incorrect [hille-yosida-convergence-forte] : Un $C_0$-semi-groupe est continu pour chaque $u$ fixé, non en norme d'opérateur ; ici la continuité en norme est fausse. — Contre-exemple : Pour $t>0$ et $n\ge\ln2/t$ : $\|S(t)e_n-e_n\|=1-e^{-nt}\ge\frac12$ ; en fait $\|S(t)-I\|=1$ pour tout $t>0$.
- `g-dom` par « Une suite de $\ell^2$ qui converge coordonnée par coordonnée converge dans $\ell^2$. » → incorrect [hille-yosida-convergence-forte] : La convergence coordonnée par coordonnée n'entraîne pas la convergence dans $\ell^2$ : il faut une domination, fournie ici par $\sum_nn^2|u_n|^2<\infty$. — Contre-exemple : $e_k\to0$ coordonnée par coordonnée quand $k\to\infty$, alors que $\|e_k\|=1$.
- `s-fort` par « Une suite de $\ell^2$ qui converge coordonnée par coordonnée converge dans $\ell^2$. » → incorrect [hille-yosida-convergence-forte] : La convergence de chaque coordonnée ne suffit pas : il faut dominer la série, ici par $\sum_n|u_n|^2$. — Contre-exemple : $e_k\to0$ coordonnée par coordonnée, alors que $\|e_k\|=1$.
- `s-fort` par « C’est évident. » → a-justifier [justification-absente] : Chaque terme de la série tend vers $0$, mais le passage à la limite dans la somme infinie reste à justifier.

Retraits :
- `d-D` (nécessaire) : Sans cette condition, la domination disparaît et la limite peut ne pas exister dans $H$ : c'est exactement la condition qui décrit $D(G)$. — Contre-exemple : $u_n=1/n$ : chaque coordonnée de $\frac{S(t)u-u}{t}$ tend vers $-1$, et cette limite n'appartient pas à $\ell^2$.

Calculs fermés : [{"kind":"rational-vector","prompt":"Pour $u=e_1+2e_2$ : coordonnées $(Gu)_1$ et $(Gu)_2$","expected":["-1","-4"],"labels":["(Gu)₁","(Gu)₂"]}]

Solution :
**Semi-groupe.** Pour $t\ge0$, $S(t)$ est diagonal de coefficients $e^{-nt}\in\,]0,1]$ : $S(t)\in\mathcal L(H)$ et $\|S(t)\|\le1$. On a $S(0)=I$, et $e^{-n(t+s)}=e^{-nt}e^{-ns}$ donne $S(t+s)=S(t)S(s)$. Pour $u\in H$, $\|S(t)u-u\|^2=\sum_n(1-e^{-nt})^2|u_n|^2$ : chaque terme tend vers $0$ quand $t\downarrow0$ et reste majoré par $|u_n|^2$, donc la somme tend vers $0$ par convergence dominée. $S$ est un $C_0$-semi-groupe de contractions. En revanche, $\|S(t)-I\|=\sup_n(1-e^{-nt})=1$ pour tout $t>0$ : la continuité n'a pas lieu en norme d'opérateur.

**$D(G)\subset D$.** Si $u\in D(G)$, la forme coordonnée étant continue, $(Gu)_n=\lim_{t\downarrow0}\frac{e^{-nt}-1}{t}u_n=-nu_n$. Comme $Gu\in H$, $\sum_nn^2|u_n|^2<\infty$ : $u\in D$ et $Gu=Au$.

**$D\subset D(G)$.** Pour $t>0$, l'inégalité $0\le1-e^{-x}\le x$, appliquée à $x=nt$, donne $0\le n-\frac{1-e^{-nt}}{t}\le n$. Pour $u\in D$, $\big\|\frac{S(t)u-u}{t}-Au\big\|^2=\sum_n\big(n-\frac{1-e^{-nt}}{t}\big)^2|u_n|^2$ : chaque terme tend vers $0$ et est majoré par $n^2|u_n|^2$, sommable. Par convergence dominée, la limite existe dans $H$ et vaut $Au$. Donc $D(G)=D$ et $G=A$.

**Assertion voisine.** Pour $u_n=1/n$, $u\in H$ ; si $u$ appartenait à $D(G)$, il appartiendrait à $D$, or $\sum_nn^2\cdot n^{-2}=+\infty$. Chaque coordonnée converge, vers $-1$, mais la limite coordonnée par coordonnée n'est pas dans $\ell^2$. Le domaine fait partie de la définition du générateur, et ici $D(G)\neq H$.

Indices :
1. La définition du générateur demande une limite dans quelle topologie ? Que se passe-t-il pour chaque coordonnée, et que faut-il en plus ?
2. Deux inclusions : si la limite existe, ses coordonnées sont déterminées ; réciproquement, il faut dominer $\big(n-\frac{1-e^{-nt}}t\big)^2|u_n|^2$ uniformément en $t$.
3. $0\le1-e^{-x}\le x$ donne la domination par $n^2|u_n|^2$. Pour réfuter $D(G)=H$, essaie $u_n=1/n$.

Erreurs fréquentes :
- Confondre convergence coordonnée par coordonnée et convergence dans la norme de $\ell^2$.
- Oublier que le domaine fait partie de la définition du générateur, et le prendre égal à l’espace entier.
- Croire qu'un $C_0$-semi-groupe vérifie $\|S(t)-I\|\to0$.

Variante : Sur $H=\ell^2(\mathbb N^*)$, soit $(S(t)u)_n=e^{-n^2t}u_n$. Montrer que $S$ est un $C_0$-semi-groupe de contractions et déterminer son générateur, domaine compris.

Solution de la variante : Comme dans l'exercice : $S(t)$ est diagonal de coefficients $e^{-n^2t}\in\,]0,1]$, $S(0)=I$, $S(t+s)=S(t)S(s)$, et la continuité forte vient de la convergence dominée. Si $u\in D(G)$, la continuité des formes coordonnées donne $(Gu)_n=-n^2u_n$, donc $\sum_nn^4|u_n|^2<\infty$. Réciproquement, $0\le n^2-\frac{1-e^{-n^2t}}{t}\le n^2$ et la convergence dominée donnent la limite dans $H$ dès que $\sum_nn^4|u_n|^2<\infty$. Donc $D(G)=\{u:\sum_nn^4|u_n|^2<\infty\}$ et $(Gu)_n=-n^2u_n$.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `hille-yosida.intermediaire` : La borne $\|R(\lambda,A)\|\le1/\lambda$ pour un opérateur diagonal négatif

Énoncé : Soit $H=\ell^2(\mathbb N^*)$, $(a_n)_{n\ge1}\subset[0,+\infty[$, et $A$ l'opérateur diagonal négatif défini par $D(A)=\{u\in H:\sum_na_n^2|u_n|^2<\infty\}$, $(Au)_n=-a_nu_n$.

Vérifier que $A$ est fermé et densément défini, que $]0,+\infty[\subset\rho(A)$ avec $\|R(\lambda,A)\|\le1/\lambda$, et conclure par le théorème de Hille–Yosida. Calculer enfin $\int_0^\infty e^{-\lambda t}e^{-at}\,dt$ pour $\lambda>0$, $a\ge0$, et reconnaître $R(\lambda,A)$ comme la transformée de Laplace de la famille diagonale $(T(t)f)_n=e^{-a_nt}f_n$.
Source : {"doc":"polycopie","pdfPage":43,"label":"Exercice 28, intermédiaire (p. PDF 43) ; Hille–Yosida, cas contractif (p. PDF 26)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-suite` (hypothese) : $(a_n)_{n\ge1}\subset[0,+\infty[$.
- `d-A` (definition) : $H=\ell^2(\mathbb N^*)$, $D(A)=\{u\in H:\sum_na_n^2|u_n|^2<\infty\}$ et $(Au)_n=-a_nu_n$.
- `s-lam` (definition, locale) : Soit $\lambda>0$.
- `d-R` (definition, locale) : Pour $f\in H$, on pose $R_\lambda f=\Big(\dfrac{f_n}{\lambda+a_n}\Big)_{n\ge1}$.
- `dense` (consequence) : $D(A)$ est dense dans $H$.
- `ferme` (consequence) : $A$ est fermé.
- `minor` (inegalite) : $\lambda+a_n\ge\lambda>0$ pour tout $n$.
- `r-in` (consequence) : Pour tout $f\in H$ : $R_\lambda f\in D(A)$.
- `r-bij` (consequence) : $\lambda I-A:D(A)\to H$ est bijectif, d'inverse $R_\lambda$.
- `r-borne` (inegalite) : Pour tout $f\in H$ : $\|R_\lambda f\|\le\|f\|/\lambda$.
- `rho` (consequence) : $]0,+\infty[\,\subset\rho(A)$ et $\|R(\lambda,A)\|\le1/\lambda$ pour tout $\lambda>0$.
- `hy` (application-theoreme) : $A$ engendre un $C_0$-semi-groupe de contractions sur $H$.
- `laplace` (egalite, calcul expr-equiv) : Pour $\lambda>0$ et $a\ge0$ : $\int_0^\infty e^{-\lambda t}e^{-at}\,dt=\dfrac1{\lambda+a}$.
  - valeur attendue : "1/(l+a)"
- `r-laplace` (egalite) : Pour $f\in H$ : $R(\lambda,A)f=\int_0^\infty e^{-\lambda t}\,T(t)f\,dt$, où $(T(t)f)_n=e^{-a_nt}f_n$.
- `fin` (conclusion) : $A$ est fermé, densément défini, et $\|R(\lambda,A)\|\le1/\lambda$ pour tout $\lambda>0$ : $A$ engendre un $C_0$-semi-groupe de contractions, et $R(\lambda,A)$ est la transformée de Laplace de $T$.
- `x-neumann` (egalite, DISTRACTEUR) : Pour tout $\lambda>0$ : $R(\lambda,A)=\sum_{k\ge0}\lambda^{-k-1}A^k$.
- `x-egal` (egalite, DISTRACTEUR) : Pour toute suite $(a_n)\subset[0,+\infty[$ et tout $\lambda>0$ : $\|R(\lambda,A)\|=1/\lambda$.

Règles :
- `d-A` ⟹ `dense` par « Les suites à support fini appartiennent à $D(A)$ et sont denses dans $\ell^2$. »
- `d-A` ⟹ `ferme` par « Si $u^{(k)}\to u$ et $Au^{(k)}\to v$ dans $H$, alors, coordonnée par coordonnée, $v_n=-a_nu_n$ ; donc $\sum_na_n^2|u_n|^2=\|v\|^2<\infty$ et $Au=v$. »
- `s-lam` + `h-suite` ⟹ `minor` par « Somme du réel $\lambda>0$ et du réel $a_n\ge0$. »
- `minor` + `d-R` + `d-A` + `h-suite` ⟹ `r-in` par « $\dfrac{1}{\lambda+a_n}\le\dfrac1\lambda$ et $\dfrac{a_n}{\lambda+a_n}\le1$ : les séries $\sum_n\frac{|f_n|^2}{(\lambda+a_n)^2}$ et $\sum_n\frac{a_n^2|f_n|^2}{(\lambda+a_n)^2}$ convergent. »
- `r-in` + `minor` + `d-R` + `d-A` ⟹ `r-bij` par « Coordonnée par coordonnée : $(\lambda+a_n)\dfrac{f_n}{\lambda+a_n}=f_n$, et $\dfrac{(\lambda+a_n)u_n}{\lambda+a_n}=u_n$ pour $u\in D(A)$. »
- `minor` + `d-R` ⟹ `r-borne` par « $\|R_\lambda f\|^2=\sum_n\dfrac{|f_n|^2}{(\lambda+a_n)^2}\le\dfrac{\|f\|^2}{\lambda^2}$. »
- `r-bij` + `r-borne` + `ferme` ⟹ `rho` par « Définition de $\rho(A)$ pour l'opérateur fermé $A$ : bijection de $D(A)$ sur $H$ d'inverse borné ; $\lambda>0$ est arbitraire. »
- `dense` + `ferme` + `rho` ⟹ `hy` par « Théorème de Hille–Yosida, cas contractif. [hille-yosida] »
- ∅ ⟹ `laplace` par « Primitive de $e^{-(\lambda+a)t}$ sur $[0,+\infty[$, avec $\lambda+a>0$. »
- `laplace` + `r-bij` + `d-R` + `h-suite` ⟹ `r-laplace` par « Comme $a_n\ge0$, $t\mapsto e^{-\lambda t}T(t)f$ est continue (convergence dominée) et de norme au plus $e^{-\lambda t}\|f\|$ : l'intégrale converge dans $H$. Les formes coordonnées sont linéaires continues et commutent avec l'intégrale : la $n$-ième coordonnée de l'intégrale vaut $\dfrac{f_n}{\lambda+a_n}$. »
- `ferme` + `dense` + `rho` + `hy` + `r-laplace` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « Série de Neumann : $\|(\lambda I-A)^{-1}\|\le\lambda^{-1}\sum_{k\ge0}(\|A\|/\lambda)^k$. » ; « La borne $1/\lambda$ est toujours atteinte, car $a_n\ge0$. »

Pièges :
- `x-neumann` → incorrect [hypotheses-theoreme] : La série de Neumann suppose $A$ borné et $\|A\|<\lambda$ ; ici $A$ peut être non borné, et la série diverge dès que $a_n>\lambda$ pour un indice $n$. — Contre-exemple : $a_1=2$, $\lambda=1$ : sur $e_1$, la série vaut $\sum_k(-2)^k$, qui diverge, alors que $R(1,A)e_1=\frac13e_1$.
- `x-egal` → incorrect [calcul-exact] : $1/\lambda$ n'est qu'un majorant : $\|R(\lambda,A)\|=\sup_n\frac1{\lambda+a_n}=\frac1{\lambda+\inf_na_n}$. — Contre-exemple : $a_n=1$ pour tout $n$ : $\|R(\lambda,A)\|=\frac1{\lambda+1}<\frac1\lambda$.
- `r-borne` par « Série de Neumann : $\|(\lambda I-A)^{-1}\|\le\lambda^{-1}\sum_{k\ge0}(\|A\|/\lambda)^k$. » → incorrect [hypotheses-theoreme] : $A$ n'est pas borné en général : $\|A\|$ n'a pas de sens, et la série de Neumann n'est pas disponible. La borne se lit directement sur les coefficients diagonaux. — Contre-exemple : $a_n=n$ : $\|Ae_n\|=n$ pour tout $n$, donc $A$ n'est pas borné.
- `rho` par « La borne $1/\lambda$ est toujours atteinte, car $a_n\ge0$. » → incorrect [calcul-exact] : La borne $1/\lambda$ n'est atteinte que si $\inf_na_n=0$ ; ce n'est d'ailleurs pas ce qu'il faut montrer : seule l'inégalité compte. — Contre-exemple : $a_n=1$ pour tout $n$ : $\|R(\lambda,A)\|=\frac1{\lambda+1}$.

Retraits :
- `h-suite` (nécessaire) : Si un coefficient diagonal $-a_n$ de $A$ est strictement positif, la minoration $\lambda+a_n\ge\lambda$ tombe : un $\lambda>0$ peut être valeur propre, et la borne $1/\lambda$ échoue. — Contre-exemple : $a_1=-1$ : pour $\lambda=1$, $(\lambda I-A)e_1=0$, donc $1\in\sigma(A)$ ; pour $\lambda=2$, $\|R(2,A)\|\ge\frac1{2-1}=1>\frac12$.

Calculs fermés : [{"kind":"rational","prompt":"Pour $a_n=n$ et $\\lambda=2$ : valeur de $\\|R(\\lambda,A)\\|$","expected":"1/3"}]

Solution :
**Densité et fermeture.** Les suites à support fini sont dans $D(A)$ et denses dans $\ell^2$. Si $u^{(k)}\to u$ et $Au^{(k)}\to v$ dans $H$, alors, coordonnée par coordonnée, $v_n=\lim_k(-a_nu^{(k)}_n)=-a_nu_n$ ; donc $\sum_na_n^2|u_n|^2=\|v\|^2<\infty$, $u\in D(A)$ et $Au=v$ : $A$ est fermé.

**Résolvante.** Soit $\lambda>0$. Comme $a_n\ge0$, $\lambda+a_n\ge\lambda>0$. On pose $R_\lambda f=\big(f_n/(\lambda+a_n)\big)_n$. Les majorations $\frac1{\lambda+a_n}\le\frac1\lambda$ et $\frac{a_n}{\lambda+a_n}\le1$ donnent $R_\lambda f\in H$ et $R_\lambda f\in D(A)$. Coordonnée par coordonnée, $(\lambda I-A)R_\lambda f=f$ et $R_\lambda(\lambda I-A)u=u$ pour $u\in D(A)$ : $\lambda I-A$ est une bijection de $D(A)$ sur $H$, d'inverse $R_\lambda$. Enfin $\|R_\lambda f\|^2=\sum_n\frac{|f_n|^2}{(\lambda+a_n)^2}\le\frac{\|f\|^2}{\lambda^2}$. Ainsi $]0,+\infty[\subset\rho(A)$ et $\|R(\lambda,A)\|\le1/\lambda$ ; plus précisément, $\|R(\lambda,A)\|=\frac1{\lambda+\inf_na_n}$.

**Conclusion.** $A$ est fermé, densément défini et vérifie la condition de résolvante : par Hille–Yosida, $A$ engendre un $C_0$-semi-groupe de contractions.

**Transformée de Laplace.** $\int_0^\infty e^{-(\lambda+a)t}\,dt=\frac1{\lambda+a}$. La famille $(T(t)f)_n=e^{-a_nt}f_n$ est continue de $[0,+\infty[$ dans $H$ (convergence dominée, comme dans l'exercice facile) et de norme au plus $\|f\|$ ; les formes coordonnées commutant avec l'intégrale, la $n$-ième coordonnée de $\int_0^\infty e^{-\lambda t}T(t)f\,dt$ vaut $\frac{f_n}{\lambda+a_n}$. On retrouve la formule du sens direct : $R(\lambda,A)f=\int_0^\infty e^{-\lambda t}T(t)f\,dt$.

Indices :
1. Quelles sont les hypothèses du théorème de Hille–Yosida ? Pour un opérateur diagonal, l'inverse de $\lambda I-A$ se devine coordonnée par coordonnée.
2. Écris $R_\lambda f=\big(f_n/(\lambda+a_n)\big)_n$ ; vérifie successivement $R_\lambda f\in H$, $R_\lambda f\in D(A)$, les deux identités d'inverse, puis la borne.
3. Tout repose sur $\lambda+a_n\ge\lambda$ et $\frac{a_n}{\lambda+a_n}\le1$.

Erreurs fréquentes :
- Utiliser une série de Neumann pour un opérateur non borné.
- Oublier de vérifier que l'inverse envoie $H$ dans $D(A)$.
- Affirmer que la borne $1/\lambda$ est toujours atteinte.

Variante : Soit $H=\ell^2(\mathbb N^*)$ complexe, $(a_n)\subset[0,+\infty[$, $(b_n)\subset\mathbb R$, et $A$ diagonal de coefficients $-a_n+\mathrm ib_n$, de domaine $\{u:\sum_n(a_n^2+b_n^2)|u_n|^2<\infty\}$. Montrer que $\|R(\lambda,A)\|\le1/\lambda$ pour tout $\lambda>0$, et calculer $\|R(3,A)\|$ lorsque $a_n=0$ et $b_n=4$ pour tout $n$.

Solution de la variante : $\lambda I-A$ est diagonal de coefficients $\lambda+a_n-\mathrm ib_n$, de module $\sqrt{(\lambda+a_n)^2+b_n^2}\ge\lambda+a_n\ge\lambda>0$. L'inverse est diagonal de coefficients $(\lambda+a_n-\mathrm ib_n)^{-1}$ ; il envoie $H$ dans $D(A)$, car $\frac{a_n^2+b_n^2}{(\lambda+a_n)^2+b_n^2}\le1$, et sa norme vaut $\sup_n|\lambda+a_n-\mathrm ib_n|^{-1}\le1/\lambda$. Pour $a_n=0$, $b_n=4$ et $\lambda=3$ : $|3-4\mathrm i|=5$, donc $\|R(3,A)\|=\frac15$.

Vérification : {"origin":"complement","review":"machine"}

## Exercice difficile `hille-yosida.difficile` : Approximations de Yosida et construction du semi-groupe

Énoncé : Soit $X$ un espace de Banach et $A:D(A)\subset X\to X$ fermé, densément défini, tel que $]0,+\infty[\subset\rho(A)$ et $\|R(\lambda,A)\|\le1/\lambda$ pour tout $\lambda>0$. Pour $n\ge1$, on pose $A_n=nAR(n,A)$.

Retrouver $A_n=n^2R(n,A)-nI$, en déduire $A_n\in\mathcal L(X)$ et $\|e^{tA_n}\|\le1$. Montrer que $A_nx\to Ax$ pour $x\in D(A)$, que $(e^{tA_n}x)_n$ converge pour tout $x\in X$, uniformément en $t$ sur les intervalles bornés, et que la limite $S(t)x$ définit un $C_0$-semi-groupe de contractions de générateur $A$. Expliquer pourquoi la convergence n'a pas lieu en général en norme d'opérateur, et pourquoi l'argument échoue si l'on sait seulement $\|R(\lambda,A)\|\le M/(\lambda-\omega)$ avec $M>1$.
Source : {"doc":"polycopie","pdfPage":43,"label":"Exercice 28, difficile (p. PDF 43) ; construction réciproque et point de vigilance (p. PDF 26–27)"} — prérequis : —

But : `fin` — usage : demonstration

Nœuds :
- `h-X` (hypothese) : $X$ est un espace de Banach et $A:D(A)\subset X\to X$ est linéaire et fermé.
- `h-dense` (hypothese) : $D(A)$ est dense dans $X$.
- `h-res` (hypothese) : $]0,+\infty[\,\subset\rho(A)$ et $\|R(\lambda,A)\|\le1/\lambda$ pour tout $\lambda>0$.
- `d-An` (definition) : Pour $n\ge1$ : $A_n=nA\,R(n,A)$, défini sur $X$ puisque $R(n,A)$ envoie $X$ dans $D(A)$.
- `a-expr` (egalite, calcul expr-equiv) : $A_n=n^2R(n,A)-nI$ ; en particulier $A_n\in\mathcal L(X)$.
  - valeur attendue : "n*a/(n-a)"
- `a-comm` (egalite) : Pour tous $n,m\ge1$ : $A_nA_m=A_mA_n$.
- `a-contr` (inegalite) : Pour tous $t\ge0$ et $n\ge1$ : $\|e^{tA_n}\|\le1$.
- `r-dom` (inegalite) : Pour $x\in D(A)$ : $\|nR(n,A)x-x\|\le\|Ax\|/n$.
- `r-fort` (consequence) : Pour tout $x\in X$ : $nR(n,A)x\to x$ quand $n\to\infty$.
- `y-cv` (consequence) : Pour $x\in D(A)$ : $A_nx\to Ax$ dans $X$.
- `c-diff` (egalite) : Pour $x\in X$ et $t\ge0$ : $e^{tA_n}x-e^{tA_m}x=\int_0^te^{(t-s)A_m}e^{sA_n}(A_n-A_m)x\,ds$.
- `c-maj` (inegalite) : Pour $x\in D(A)$ et $t\ge0$ : $\|e^{tA_n}x-e^{tA_m}x\|\le t\,\|A_nx-A_mx\|$.
- `c-cauchy` (consequence) : Pour tout $x\in X$ et tout $T>0$, la suite $(e^{tA_n}x)_n$ est de Cauchy, uniformément en $t\in[0,T]$.
- `s-lim` (consequence) : Pour tout $x\in X$, $S(t)x:=\lim_ne^{tA_n}x$ existe, uniformément en $t\in[0,T]$ pour tout $T>0$.
- `s-prop` (consequence) : $S(t)\in\mathcal L(X)$, $\|S(t)\|\le1$, $S(0)=I$, $S(t+s)=S(t)S(s)$, et $t\mapsto S(t)x$ est continue : $S$ est un $C_0$-semi-groupe de contractions.
- `g-int` (egalite) : Pour $x\in D(A)$ et $t\ge0$ : $S(t)x-x=\int_0^tS(s)Ax\,ds$.
- `g-ext` (inclusion) : Le générateur $B$ de $S$ prolonge $A$ : $D(A)\subset D(B)$ et $Bx=Ax$ pour $x\in D(A)$.
- `g-inj` (consequence) : $I-B$ est injectif sur $D(B)$.
- `g-eg` (egalite) : $B=A$, domaines inclus.
- `fin` (conclusion) : $e^{tA_n}x\to S(t)x$ pour tout $x\in X$, uniformément sur les intervalles bornés en temps, et $S$ est un $C_0$-semi-groupe de contractions de générateur $A$.
- `x-norme` (consequence, DISTRACTEUR) : Pour tout $t>0$ : $\|e^{tA_n}-S(t)\|\to0$ quand $n\to\infty$.
- `x-partout` (consequence, DISTRACTEUR) : Pour tout $x\in X$, la suite $(A_nx)_n$ converge dans $X$.
- `x-Mgen` (inegalite, DISTRACTEUR) : Si l'on sait seulement $\|R(\lambda,A)\|\le M/(\lambda-\omega)$ pour $\lambda>\omega$, avec $M>1$, la même construction donne $\|S(t)\|\le Me^{\omega t}$.

Règles :
- `d-An` + `h-res` ⟹ `a-expr` par « $(nI-A)R(n,A)=I$ sur $X$, donc $AR(n,A)=nR(n,A)-I$. »
- `a-expr` + `h-res` ⟹ `a-comm` par « L'identité de la résolvante montre que $R(n,A)$ et $R(m,A)$ commutent ; $A_n$ et $A_m$ sont des polynômes en ces opérateurs. »
- `a-expr` + `h-res` ⟹ `a-contr` par « $e^{tA_n}=e^{-nt}e^{tn^2R(n,A)}$, car $-nI$ commute avec tout opérateur, et $\|e^{tn^2R(n,A)}\|\le e^{tn^2\|R(n,A)\|}\le e^{nt}$. »
- `h-res` ⟹ `r-dom` par « Pour $x\in D(A)$ : $nR(n,A)x-x=R(n,A)Ax$, et $\|R(n,A)\|\le1/n$. »
- `r-dom` + `h-dense` + `h-res` ⟹ `r-fort` par « Approcher $x$ par $y\in D(A)$, utiliser $\|nR(n,A)\|\le1$, et découper en trois termes. »
- `r-fort` + `d-An` ⟹ `y-cv` par « Pour $x\in D(A)$ : $A_nx=nR(n,A)Ax$ ; appliquer la convergence précédente à $Ax$. »
- `a-comm` + `a-expr` ⟹ `c-diff` par « Dériver $s\mapsto e^{(t-s)A_m}e^{sA_n}x$ sur $[0,t]$, grâce à la commutation de $A_n$ et $A_m$, puis intégrer. [theoreme-fondamental] »
- `c-diff` + `a-contr` ⟹ `c-maj` par « Majoration de la norme de l'intégrale, les deux exponentielles étant de norme au plus $1$. »
- `c-maj` + `y-cv` + `a-contr` + `h-dense` ⟹ `c-cauchy` par « Sur $D(A)$ : $(A_nx)_n$ converge, donc est de Cauchy, et $t\le T$. Sur $X$ : densité de $D(A)$ et contractivité des $e^{tA_n}$. »
- `c-cauchy` + `h-X` ⟹ `s-lim` par « $X$ est complet : une suite uniformément de Cauchy converge uniformément. »
- `s-lim` + `a-contr` ⟹ `s-prop` par « Passage à la limite dans $\|e^{tA_n}x\|\le\|x\|$ et dans $e^{(t+s)A_n}=e^{tA_n}e^{sA_n}$, avec des bornes uniformes ; limite uniforme de fonctions continues. »
- `s-lim` + `y-cv` + `a-contr` ⟹ `g-int` par « Limite uniforme sur $[0,t]$ dans $e^{tA_n}x-x=\int_0^te^{sA_n}A_nx\,ds$, car $\|e^{sA_n}A_nx-S(s)Ax\|\le\|A_nx-Ax\|+\|(e^{sA_n}-S(s))Ax\|$. [theoreme-fondamental] »
- `g-int` + `s-prop` ⟹ `g-ext` par « Diviser par $t$ : $\frac1t\int_0^tS(s)Ax\,ds\to Ax$ quand $t\downarrow0$, par continuité de $s\mapsto S(s)Ax$. »
- `s-prop` ⟹ `g-inj` par « Si $x\in D(B)$ et $Bx=x$, alors $\frac{d}{dt}S(t)x=S(t)Bx=S(t)x$, donc $S(t)x=e^tx$ ; or $\|S(t)x\|\le\|x\|$, d'où $x=0$. » (chemin exponentielle)
- `s-prop` ⟹ `g-inj` par « Pour $x\in D(B)$ : $\int_0^\infty e^{-t}S(t)(x-Bx)\,dt=x$, en intégrant $\frac{d}{dt}\big(e^{-t}S(t)x\big)=e^{-t}S(t)(Bx-x)$. » (chemin laplace)
- `g-ext` + `g-inj` + `h-res` ⟹ `g-eg` par « $I-A$ est surjectif car $1\in\rho(A)$ ; pour $x\in D(B)$, $y=R(1,A)(I-B)x$ vérifie $(I-B)y=(I-A)y=(I-B)x$, donc $y=x$. »
- `s-lim` + `s-prop` + `g-eg` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « $\|e^{tA_n}\|\le e^{t\|A_n\|}$, et $\|A_n\|\le2n$. » ; « $nR(n,A)\to I$ en norme d'opérateur. » ; « Théorème de Hille–Yosida. »

Pièges :
- `x-norme` → incorrect [hille-yosida-convergence-forte] : La construction donne une convergence pour chaque $x$ fixé, uniforme en temps sur les intervalles bornés ; la convergence en norme d'opérateur est fausse en général. — Contre-exemple : $X=\ell^2(\mathbb N^*)$ complexe, $A=\mathrm{diag}(\mathrm ik)$ : $A_n$ a pour coefficients $\frac{\mathrm ikn}{n-\mathrm ik}$, de partie réelle $-\frac{k^2n}{n^2+k^2}$, tandis que $S(t)=\mathrm{diag}(e^{\mathrm ikt})$ est unitaire. Donc $\|e^{tA_n}-S(t)\|\ge\sup_k\big(1-e^{-tk^2n/(n^2+k^2)}\big)=1-e^{-nt}$, qui ne tend pas vers $0$.
- `x-partout` → incorrect [domaine-operateur] : La convergence $A_nx\to Ax$ n'est établie que pour $x\in D(A)$ ; hors du domaine, $(A_nx)_n$ peut diverger. — Contre-exemple : $X=\ell^2(\mathbb N^*)$, $A=\mathrm{diag}(-k)$, $x_k=1/k$ : $(A_nx)_k=-\frac n{n+k}$, donc $\|A_nx\|^2\ge\sum_{k\le n}\frac14=\frac n4\to+\infty$.
- `x-Mgen` → incorrect [hille-yosida-puissances-resolvante] : Avec la seule borne en première puissance, $\|e^{tA_n}\|\le\exp\big(t(\frac{n^2M}{n-\omega}-n)\big)$, qui explose quand $n\to\infty$ si $M>1$. Il faut borner toutes les puissances : $\|R(\lambda,A)^k\|\le M/(\lambda-\omega)^k$ donne $\|e^{tA_n}\|\le M\exp\big(\frac{tn\omega}{n-\omega}\big)$. — Contre-exemple : $A=\begin{pmatrix}0&3\\-1/3&0\end{pmatrix}$ sur $\mathbb R^2$ euclidien : $\|R(\lambda,A)\|\le\frac{\lambda+3}{\lambda^2+1}\le\frac{5/2}{\lambda}$ pour tout $\lambda>0$, mais $e^{tA}=\cos t\,I+\sin t\,A$, donc $\|e^{(\pi/2)A}\|=\|A\|=3>\frac52$.
- `a-contr` par « $\|e^{tA_n}\|\le e^{t\|A_n\|}$, et $\|A_n\|\le2n$. » → incorrect [hille-yosida-puissances-resolvante] : Cette majoration donne seulement $\|e^{tA_n}\|\le e^{2nt}$, qui n'est pas uniforme en $n$ : il faut séparer $-nI$ et $n^2R(n,A)$ pour faire jouer $\|R(n,A)\|\le1/n$.
- `r-fort` par « $nR(n,A)\to I$ en norme d'opérateur. » → incorrect [hille-yosida-convergence-forte] : La convergence $nR(n,A)\to I$ n'a lieu que point par point ; en norme, elle forcerait $A$ à être borné. — Contre-exemple : $A=\mathrm{diag}(-k)$ sur $\ell^2$ : $nR(n,A)=\mathrm{diag}\big(\frac n{n+k}\big)$ et $\|nR(n,A)-I\|=\sup_k\frac k{n+k}=1$ pour tout $n$.
- `fin` par « Théorème de Hille–Yosida. » → incorrect [circularite] : Cette construction démontre précisément le sens réciproque du théorème de Hille–Yosida : l'invoquer ici serait circulaire.

Retraits :
- `h-dense` (nécessaire) : Sans densité, $nR(n,A)x\to x$ peut échouer hors de l'adhérence de $D(A)$ : la construction s'arrête, et $A$ ne peut pas être un générateur, le domaine d'un générateur étant toujours dense. — Contre-exemple : $X=C([0,1])$, $Au=-u'$, $D(A)=\{u\in C^1([0,1]):u(0)=0\}$ : $R(\lambda,A)f(x)=\int_0^xe^{-\lambda(x-s)}f(s)\,ds$ vérifie $\|R(\lambda,A)\|\le1/\lambda$, mais $nR(n,A)\mathbb 1=1-e^{-nx}$ s'annule en $0$, donc $\|nR(n,A)\mathbb 1-\mathbb 1\|_\infty=1$.
- `h-res` (nécessaire) : Sans la borne, rien n'assure que les $e^{tA_n}$ soient uniformément bornées, et la contractivité de la limite peut tomber. — Contre-exemple : $A=\begin{pmatrix}0&3\\-1/3&0\end{pmatrix}$ sur $\mathbb R^2$ : $]0,+\infty[\subset\rho(A)$, mais $\|e^{(\pi/2)A}\|=3>1$ ; conformément au théorème, $\|R(\lambda,A)\|>1/\lambda$ pour certains $\lambda>0$, par exemple $\|R(1,A)\|\ge\frac{\sqrt{10}}2$.

Solution :
**Approximations de Yosida.** Comme $(nI-A)R(n,A)=I$ sur $X$, on a $AR(n,A)=nR(n,A)-I$, d'où $A_n=nAR(n,A)=n^2R(n,A)-nI\in\mathcal L(X)$. Les résolvantes $R(n,A)$ et $R(m,A)$ commutent (identité de la résolvante), donc $A_n$ et $A_m$ aussi. Comme $-nI$ commute avec $n^2R(n,A)$, $e^{tA_n}=e^{-nt}e^{tn^2R(n,A)}$, et $\|e^{tA_n}\|\le e^{-nt}e^{tn^2\|R(n,A)\|}\le e^{-nt}e^{nt}=1$.

**Convergence de $A_nx$.** Pour $x\in D(A)$, $nR(n,A)x-x=R(n,A)Ax$, donc $\|nR(n,A)x-x\|\le\|Ax\|/n\to0$. Pour $x\in X$ et $\varepsilon>0$, on choisit $y\in D(A)$ avec $\|x-y\|\le\varepsilon$ ; comme $\|nR(n,A)\|\le1$, $\|nR(n,A)x-x\|\le2\varepsilon+\|Ay\|/n$. Donc $nR(n,A)x\to x$ pour tout $x\in X$, et pour $x\in D(A)$, $A_nx=nR(n,A)Ax\to Ax$.

**Estimation de Cauchy.** Pour $x\in X$, la dérivée de $s\mapsto e^{(t-s)A_m}e^{sA_n}x$ vaut $e^{(t-s)A_m}e^{sA_n}(A_n-A_m)x$, par commutation ; en intégrant sur $[0,t]$, $e^{tA_n}x-e^{tA_m}x=\int_0^te^{(t-s)A_m}e^{sA_n}(A_n-A_m)x\,ds$, d'où $\|e^{tA_n}x-e^{tA_m}x\|\le t\|A_nx-A_mx\|$. Pour $x\in D(A)$, la suite $(A_nx)$ converge : $(e^{tA_n}x)_n$ est de Cauchy uniformément sur $[0,T]$. Pour $x\in X$ et $y\in D(A)$ : $\|e^{tA_n}x-e^{tA_m}x\|\le2\|x-y\|+T\|A_ny-A_my\|$. $X$ étant complet, $S(t)x=\lim_ne^{tA_n}x$ existe, uniformément sur $[0,T]$.

**Le semi-groupe limite.** $S(t)$ est linéaire, $\|S(t)x\|\le\|x\|$ et $S(0)=I$. De $e^{(t+s)A_n}x=e^{tA_n}e^{sA_n}x$ et $\|e^{tA_n}e^{sA_n}x-S(t)S(s)x\|\le\|e^{sA_n}x-S(s)x\|+\|(e^{tA_n}-S(t))S(s)x\|$, on tire $S(t+s)=S(t)S(s)$. Limite uniforme de fonctions continues, $t\mapsto S(t)x$ est continue : $S$ est un $C_0$-semi-groupe de contractions.

**Générateur.** Pour $x\in D(A)$, $e^{tA_n}x-x=\int_0^te^{sA_n}A_nx\,ds$, et $\|e^{sA_n}A_nx-S(s)Ax\|\le\|A_nx-Ax\|+\|(e^{sA_n}-S(s))Ax\|\to0$ uniformément sur $[0,t]$ ; donc $S(t)x-x=\int_0^tS(s)Ax\,ds$. En divisant par $t$ et en faisant $t\downarrow0$, on obtient $x\in D(B)$ et $Bx=Ax$, où $B$ est le générateur de $S$. Si $x\in D(B)$ vérifie $Bx=x$, alors $\frac{d}{dt}S(t)x=S(t)Bx=S(t)x$, donc $S(t)x=e^tx$, et $\|S(t)x\|\le\|x\|$ impose $x=0$ : $I-B$ est injectif. Pour $x\in D(B)$, posons $y=R(1,A)(I-B)x\in D(A)$ ; alors $(I-B)y=(I-A)y=(I-B)x$, donc $x=y\in D(A)$ : $B=A$.

**Pourquoi la convergence est forte.** Pour $A=\mathrm{diag}(\mathrm ik)$ sur $\ell^2$, $\|e^{tA_n}-S(t)\|\ge1-e^{-nt}$ : il n'y a pas convergence en norme d'opérateur.

**Cas $M>1$.** Si l'on sait seulement $\|R(\lambda,A)\|\le M/(\lambda-\omega)$, la même majoration donne $\|e^{tA_n}\|\le\exp\big(t(\frac{n^2M}{n-\omega}-n)\big)$, qui explose quand $n\to\infty$ si $M>1$. Les bornes $\|R(\lambda,A)^k\|\le M/(\lambda-\omega)^k$ pour tout $k$ donnent au contraire $\|e^{tA_n}\|\le M\exp\big(\frac{tn\omega}{n-\omega}\big)$. La borne en première puissance ne suffit pas en général, comme le montre la matrice $\begin{pmatrix}0&3\\-1/3&0\end{pmatrix}$, pour laquelle $\|R(\lambda,A)\|\le\frac{5/2}\lambda$ et $\|e^{(\pi/2)A}\|=3$.

Indices :
1. Que vaut $AR(n,A)$ ? Pour borner $e^{tA_n}$ indépendamment de $n$, il faut tirer parti de la structure de $A_n$, et non de sa seule norme.
2. Trois étapes : (i) $nR(n,A)\to I$ point par point, d'abord sur $D(A)$ ; (ii) une formule intégrale pour $e^{tA_n}-e^{tA_m}$, grâce à la commutation ; (iii) identification du générateur de la limite.
3. $e^{tA_n}=e^{-nt}e^{tn^2R(n,A)}$. Pour l'identification : le générateur $B$ prolonge $A$, $I-A$ est surjectif, et $I-B$ est injectif car $Bx=x$ impose $S(t)x=e^tx$.

Erreurs fréquentes :
- Majorer $\|e^{tA_n}\|$ par $e^{t\|A_n\|}$, borne non uniforme en $n$.
- Affirmer la convergence de $e^{tA_n}$ en norme d'opérateur.
- Écrire $A_nx\to Ax$ pour tout $x\in X$.
- Croire que $\|R(\lambda,A)\|\le M/(\lambda-\omega)$ suffit lorsque $M>1$.

Variante : Sur $H=\ell^2(\mathbb N^*)$, soit $A$ diagonal de coefficients $-k$, $D(A)=\{u\in H:\sum_kk^2|u_k|^2<\infty\}$, de sorte que $(R(n,A)f)_k=f_k/(n+k)$. Calculer les coefficients de $A_n=nAR(n,A)$, montrer que $\|e^{tA_n}\|\le1$, que $\|A_n\|=n$, et que $A_nx\to Ax$ pour tout $x\in D(A)$, bien que $(A_n)$ ne soit pas de Cauchy en norme d'opérateur.

Solution de la variante : $A_n$ est diagonal de coefficients $\frac{n^2}{n+k}-n=-\frac{nk}{n+k}$. Ces coefficients sont négatifs, donc $e^{tA_n}$ est diagonal de coefficients $e^{-tnk/(n+k)}\in\,]0,1]$, et $\|e^{tA_n}\|\le1$. La suite $k\mapsto\frac{nk}{n+k}$ croît vers $n$, d'où $\|A_n\|=n$ : $(A_n)$ n'est pas bornée en norme, donc pas de Cauchy. Pour $x\in D(A)$, $(A_nx-Ax)_k=\big(k-\frac{nk}{n+k}\big)x_k=\frac{k^2}{n+k}x_k$, de module au plus $k|x_k|$ et tendant vers $0$ ; comme $\sum_kk^2|x_k|^2<\infty$, la convergence dominée donne $\|A_nx-Ax\|\to0$.

Graphe de la variante :
But : `fin` — usage : application

Nœuds :
- `d-A` (definition) : $H=\ell^2(\mathbb N^*)$, $D(A)=\{u\in H:\sum_kk^2|u_k|^2<\infty\}$ et $(Au)_k=-ku_k$.
- `h-res` (hypothese) : Pour $n\ge1$ et $f\in H$ : $(R(n,A)f)_k=\dfrac{f_k}{n+k}$.
- `d-An` (definition) : $A_n=nAR(n,A)=n^2R(n,A)-nI$.
- `s-x` (definition, locale) : Soit $x\in D(A)$.
- `coef` (egalite, calcul expr-equiv) : $A_n$ est diagonal de coefficients $-\dfrac{nk}{n+k}$.
  - valeur attendue : "-n*k/(n+k)"
- `contr` (inegalite) : $\|e^{tA_n}\|\le1$ pour tout $t\ge0$.
- `norme` (egalite) : $\|A_n\|=n$.
- `diff` (egalite) : Pour tout $k$ : $(A_nx-Ax)_k=\dfrac{k^2}{n+k}\,x_k$.
- `cv` (consequence) : $A_nx\to Ax$ dans $H$ quand $n\to\infty$.
- `pas-cauchy` (consequence) : $(A_n)_n$ n'est pas de Cauchy en norme d'opérateur.
- `fin` (conclusion) : $A_n$ est explicite, $\|e^{tA_n}\|\le1$ et $A_nx\to Ax$ sur $D(A)$, sans convergence en norme d'opérateur.
- `x-unif` (consequence, DISTRACTEUR) : $\sup_k\dfrac{k^2}{n+k}\to0$ quand $n\to\infty$.

Règles :
- `d-An` + `h-res` + `d-A` ⟹ `coef` par « Réduction au même dénominateur de $\dfrac{n^2}{n+k}-n$. »
- `coef` ⟹ `contr` par « Les coefficients sont négatifs : $e^{tA_n}$ est diagonal, de coefficients $e^{-tnk/(n+k)}\in\,]0,1]$. »
- `coef` ⟹ `norme` par « $k\mapsto\dfrac{nk}{n+k}$ est croissante et tend vers $n$. »
- `coef` + `d-A` + `s-x` ⟹ `diff` par « $k-\dfrac{nk}{n+k}=\dfrac{k^2}{n+k}$. »
- `diff` + `s-x` + `d-A` ⟹ `cv` par « Convergence dominée pour les séries : $\Big|\dfrac{k^2}{n+k}x_k\Big|\le k|x_k|$, de carré sommable, et chaque terme tend vers $0$. [convergence-dominee] »
- `norme` ⟹ `pas-cauchy` par « Une suite de Cauchy d’opérateurs bornés est bornée en norme. »
- `coef` + `contr` + `cv` + `pas-cauchy` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « Chaque coefficient $\frac{k^2}{n+k}$ tend vers $0$, donc leur supremum aussi. »

Pièges :
- `x-unif` → incorrect [hille-yosida-convergence-forte] : La convergence de chaque coefficient n'est pas uniforme en $k$ : pour $n$ fixé, $\frac{k^2}{n+k}\to+\infty$ quand $k\to\infty$. — Contre-exemple : Pour $k=n^2$ : $\frac{k^2}{n+k}=\frac{n^3}{1+n}\ge\frac{n^2}2$.
- `cv` par « Chaque coefficient $\frac{k^2}{n+k}$ tend vers $0$, donc leur supremum aussi. » → incorrect [hille-yosida-convergence-forte] : La convergence de chaque coefficient n'entraîne pas celle du supremum ; c'est la domination par $k|x_k|$, valable pour $x\in D(A)$, qui permet de conclure. — Contre-exemple : Pour $k=n^2$, le coefficient vaut $\frac{n^3}{1+n}$, qui tend vers $+\infty$.

Retraits :
- `s-x` (nécessaire) : La domination par $k|x_k|$ exige $\sum_kk^2|x_k|^2<\infty$ ; hors de $D(A)$, $(A_nx)$ peut diverger. — Contre-exemple : $x_k=1/k$ : $(A_nx)_k=-\frac n{n+k}$ et $\|A_nx\|^2\ge\frac n4\to+\infty$.

Vérification : {"origin":"complement","review":"machine","notes":"Plan de la construction de Yosida repris du polycopié (p. PDF 26) ; toutes les estimations sont détaillées ici."}