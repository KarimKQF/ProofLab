# 29. Lumer–Phillips (`lumer-phillips`) — polycopié p. PDF 26, section 6.8

## Fiche

Espaces : $H$ : espace de Hilbert réel ou complexe, de produit scalaire $\langle\cdot,\cdot\rangle$ ; dans le cas réel, $\mathrm{Re}$ est l'identité. | $A:D(A)\subset H\to H$ : opérateur linéaire densément défini. | $\mathrm{Im}(\lambda_0I-A)$ : image de $D(A)$ par $\lambda_0I-A$.

Hypothèses :
- $A$ est densément défini. — Sans elle : Sur un Hilbert, cette hypothèse découle en fait des deux autres : si $v\perp D(A)$, on écrit $v=(\lambda_0I-A)u$ avec $u\in D(A)$, et $\lambda_0\|u\|^2\le\mathrm{Re}\langle v,u\rangle=0$ donne $u=0$, puis $v=0$.
- $\mathrm{Re}\langle Au,u\rangle\le0$ pour tout $u\in D(A)$ : $A$ est dissipatif. — Sans elle : $A=I$ : $\mathrm{Im}(2I-A)=H$, mais $A$ engendre $S(t)=e^tI$, qui n'est pas contractif.
- $\mathrm{Im}(\lambda_0I-A)=H$ pour un $\lambda_0>0$. — Sans elle : $Bu=u'$ sur $D(B)=H^1_0(]0,1[)\subset L^2(]0,1[)$ est dissipatif et densément défini, mais $\mathrm{Im}(\lambda I-B)$ est un hyperplan fermé strict pour tout $\lambda>0$ : $B$ n'est pas générateur.

Énoncé : Un opérateur $A$ densément défini sur un Hilbert engendre un $C_0$-semi-groupe de contractions si et seulement si
$$\mathrm{Re}\langle Au,u\rangle\le0\quad(u\in D(A)),\qquad\mathrm{Im}(\lambda_0I-A)=H\ \text{ pour un }\lambda_0>0.$$

Bilan : {"existence":"Sous les deux conditions, $A$ engendre un $C_0$-semi-groupe de contractions (par Hille–Yosida).","autre":"Réciproquement, le générateur d'un semi-groupe de contractions est dissipatif, et $\\lambda I-A$ est surjectif pour tout $\\lambda>0$."}

Preuve dans le polycopié : complete

Plan :
1. Pour $\lambda>0$ : $\lambda\|u\|^2\le\mathrm{Re}\langle(\lambda I-A)u,u\rangle\le\|(\lambda I-A)u\|\,\|u\|$, donc $\|(\lambda I-A)u\|\ge\lambda\|u\|$.
2. Si $\lambda_0I-A$ est surjectif, son inverse est borné ; $A$ est alors fermé.
3. L'ensemble des $\lambda>0$ pour lesquels $\lambda I-A$ est surjectif est ouvert (série de Neumann) et fermé (borne inférieure uniforme) dans $]0,+\infty[$ ; il contient $\lambda_0$, donc vaut $]0,+\infty[$.
4. On a alors $]0,+\infty[\subset\rho(A)$ et $\|R(\lambda,A)\|\le1/\lambda$ : Hille–Yosida conclut.
5. Réciproque : pour $u\in D(A)$, $\mathrm{Re}\langle S(t)u-u,u\rangle\le\|S(t)u\|\,\|u\|-\|u\|^2\le0$ ; diviser par $t$ et faire $t\downarrow0$ donne $\mathrm{Re}\langle Au,u\rangle\le0$ (le polycopié dérive $\|S(t)u\|^2$ en $t=0$). La surjectivité provient du sens direct de Hille–Yosida.

Vigilance :
- Une image seulement dense de $\lambda_0I-A$ ne suffit pas pour $A$ lui-même.
- Dans un Hilbert complexe, seule la partie réelle de $\langle Au,u\rangle$ est contrôlée.
- La minoration $\|(\lambda I-A)u\|\ge\lambda\|u\|$ n'apporte d'information que pour $\lambda>0$ : pour $\lambda<0$, la minoration par $|\lambda|\,\|u\|$ peut tomber ($A=-I$, $\lambda=-1$).
- L'hypothèse de densité, présente dans l'énoncé, découle sur un Hilbert des deux autres conditions.

Vérification : {"origin":"polycopie","review":"machine"}

Définition « Opérateur dissipatif » : $A:D(A)\subset H\to H$ linéaire est dissipatif si $\mathrm{Re}\langle Au,u\rangle\le0$ pour tout $u\in D(A)$.

Définition « Laplacien de Dirichlet » : Sur un ouvert $\Omega$, $A=\Delta$ de domaine $D(A)=\{u\in H^1_0(\Omega):\Delta u\in L^2(\Omega)\}$ ; c'est un opérateur négatif, et $-A$ est la réalisation positive $-\Delta_D$.

## Contre-exemple `ce-lumer-phillips-surjectivite` : Dissipatif sans condition d’image
Assertion : Un opérateur densément défini et dissipatif sur un Hilbert engendre un $C_0$-semi-groupe de contractions.
Tâche : Sur $H=L^2(]0,1[)$, soit $Bu=u'$ de domaine $H^1_0(]0,1[)$ ; l'image de $I-B$ est $\{f:\int_0^1e^{-s}f(s)\,ds=0\}$. Calcule $\int_0^1e^{-s}f(s)\,ds$ pour $f(s)=e^s$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\int_0^1e^{-s}e^{s}\\,ds$","expected":"1"}
Explication : Pour $u\in H^1_0(]0,1[)$, $\langle Bu,u\rangle=\int_0^1u'u=\frac12\big[u^2\big]_0^1=0$ : $B$ est dissipatif, et densément défini. L'équation $u-u'=f$ avec $u(0)=0$ impose $u(x)=-e^x\int_0^xe^{-s}f(s)\,ds$, et $u(1)=0$ exige $\int_0^1e^{-s}f(s)\,ds=0$. Pour $f(s)=e^s$, cette intégrale vaut $1$ : $f\notin\mathrm{Im}(I-B)$, et $B$ n'est pas générateur d'un semi-groupe de contractions.

## Contre-exemple `ce-lumer-phillips-image-dense` : Image dense, non surjective
Assertion : Pour un opérateur dissipatif densément défini, il suffit que $\mathrm{Im}(\lambda_0I-A)$ soit dense dans $H$.
Tâche : Sur $H=\ell^2(\mathbb N^*)$, soit $A$ diagonal de coefficients $-n$, défini sur les suites à support fini, et $f_n=1/n$. Toute solution de $(I-A)u=f$ vérifierait $u_n=f_n/(1+n)$. Calcule $u_3$.
Vérification : {"kind":"rational","prompt":"Valeur de $u_3$","expected":"1/12"}
Explication : $\langle Au,u\rangle=-\sum_nn|u_n|^2\le0$ : $A$ est dissipatif, et densément défini. $\mathrm{Im}(I-A)$ est l'espace des suites à support fini, dense dans $\ell^2$. La seule candidate, $u_n=\frac1{n(n+1)}$ (avec $u_3=\frac1{12}$), n'est pas à support fini : $f\notin\mathrm{Im}(I-A)$. L'opérateur $A$ n'est pas fermé, donc n'est pas un générateur ; sa fermeture en est un.

## Contre-exemple `ce-lumer-phillips-dissipativite` : Condition d’image sans dissipativité
Assertion : Si $\mathrm{Im}(\lambda_0I-A)=H$ pour un $\lambda_0>0$, alors $A$ engendre un $C_0$-semi-groupe de contractions.
Tâche : Soit $A=I$ sur un Hilbert $H\neq\{0\}$. Calcule $\|R(2,A)\|$, et compare à la borne $\frac12$ qu'imposerait un semi-groupe de contractions.
Vérification : {"kind":"rational","prompt":"Valeur de $\\|R(2,A)\\|$","expected":"1"}
Explication : $2I-A=I$ est surjectif, et $R(2,A)=I$ a pour norme $1>\frac12$. Par Hille–Yosida, $A$ n'engendre donc pas de semi-groupe de contractions ; de fait, il engendre $S(t)=e^tI$, avec $\|S(t)\|=e^t>1$ pour $t>0$. Ici $\mathrm{Re}\langle Au,u\rangle=\|u\|^2>0$ pour $u\neq0$.

## Exercice facile `lumer-phillips.facile` : Le laplacien de Dirichlet est dissipatif

Énoncé : Soit $\Omega\subset\mathbb R^d$ un ouvert borné, $H=L^2(\Omega)$ réel, et $A=\Delta$ de domaine $D(A)=\{u\in H^1_0(\Omega):\Delta u\in L^2(\Omega)\}$, le laplacien étant pris au sens des distributions : c'est le laplacien de Dirichlet, opérateur négatif. Montrer que $\langle Au,u\rangle_{L^2}=-\int_\Omega|\nabla u|^2\le0$ pour tout $u\in D(A)$, sans supposer $u\in H^2(\Omega)$ ni aucune régularité de $\partial\Omega$.
Source : {"doc":"polycopie","pdfPage":43,"label":"Exercice 29, facile (p. PDF 43)"} — prérequis : distributions

But : `fin` — usage : application

Nœuds :
- `h-omega` (hypothese) : $\Omega\subset\mathbb R^d$ est un ouvert borné, et $H=L^2(\Omega)$ est réel.
- `d-H10` (definition) : $H^1_0(\Omega)$ est l'adhérence de $C^\infty_c(\Omega)$ dans $H^1(\Omega)$.
- `d-A` (definition) : $D(A)=\{u\in H^1_0(\Omega):\Delta u\in L^2(\Omega)\}$ et $Au=\Delta u$, où $\Delta u=\sum_i\partial_i\partial_iu$ au sens des distributions.
- `s-u` (definition, locale) : Soit $u\in D(A)$.
- `f-dist` (egalite) : Pour tout $\varphi\in C^\infty_c(\Omega)$ : $\int_\Omega(\Delta u)\,\varphi=-\int_\Omega\nabla u\cdot\nabla\varphi$.
- `appr` (consequence) : Il existe $(\varphi_k)\subset C^\infty_c(\Omega)$ telle que $\varphi_k\to u$ dans $H^1(\Omega)$.
- `pass-g` (consequence) : $\int_\Omega(\Delta u)\,\varphi_k\to\int_\Omega(\Delta u)\,u$ quand $k\to\infty$.
- `pass-d` (consequence) : $\int_\Omega\nabla u\cdot\nabla\varphi_k\to\int_\Omega|\nabla u|^2$ quand $k\to\infty$.
- `ipp` (egalite) : $\int_\Omega(\Delta u)\,u=-\int_\Omega|\nabla u|^2$.
- `fin` (conclusion) : Pour tout $u\in D(A)$ : $\langle Au,u\rangle_{L^2}=-\int_\Omega|\nabla u|^2\le0$.
- `x-H2` (consequence, DISTRACTEUR) : Tout $u\in D(A)$ appartient à $H^2(\Omega)$.
- `x-nul` (egalite, DISTRACTEUR) : $\langle Au,u\rangle_{L^2}=0$ pour tout $u\in D(A)$.

Règles :
- `d-A` + `s-u` ⟹ `f-dist` par « Définition des dérivées au sens des distributions, $\langle\partial_i\partial_iu,\varphi\rangle=-\langle\partial_iu,\partial_i\varphi\rangle$, avec $\partial_iu\in L^2(\Omega)$ et $\Delta u\in L^2(\Omega)$. [distributions] »
- `s-u` + `d-A` + `d-H10` ⟹ `appr` par « Définition de $H^1_0(\Omega)$ par adhérence. »
- `appr` + `d-A` + `h-omega` ⟹ `pass-g` par « Cauchy–Schwarz dans $L^2(\Omega)$ : $\big|\int(\Delta u)(\varphi_k-u)\big|\le\|\Delta u\|_{L^2}\|\varphi_k-u\|_{L^2}$. [cauchy-schwarz] »
- `appr` + `h-omega` ⟹ `pass-d` par « Cauchy–Schwarz dans $L^2(\Omega)^d$ : $\big|\int\nabla u\cdot\nabla(\varphi_k-u)\big|\le\|\nabla u\|_{L^2}\|\nabla(\varphi_k-u)\|_{L^2}$. [cauchy-schwarz] »
- `f-dist` + `pass-g` + `pass-d` ⟹ `ipp` par « Passage à la limite dans les deux membres de l'égalité écrite pour $\varphi=\varphi_k$. »
- `ipp` ⟹ `fin` par « $\int_\Omega|\nabla u|^2\ge0$. »

Justifications sans règle (séduisantes ou fausses) : « On prend directement $\varphi=u$ dans la définition des dérivées au sens des distributions. » ; « Formule de Green sur $\Omega$, le terme de bord étant nul car $u=0$ sur $\partial\Omega$. » ; « Le laplacien de Dirichlet $-\Delta$ est un opérateur positif. »

Pièges :
- `x-H2` → incorrect [regularite-bord] : La régularité $H^2$ dépend du bord : elle n'est pas disponible sur un ouvert borné quelconque, et l'exercice n'en a pas besoin. — Contre-exemple : Sur un domaine plan à coin rentrant d'angle $3\pi/2$, la fonction $\eta(r)\,r^{2/3}\sin(2\theta/3)$, où $\eta$ est une troncature égale à $1$ près du coin, appartient à $D(A)$ sans appartenir à $H^2(\Omega)$.
- `x-nul` → incorrect [calcul-exact] : L'égalité $\int(\Delta u)u=-\int|\nabla u|^2$ donne une valeur strictement négative dès que $\nabla u\neq0$. — Contre-exemple : $\Omega=]0,1[$, $u(x)=\sin(\pi x)$ : $u\in D(A)$ et $\langle Au,u\rangle=-\pi^2\int_0^1\sin^2(\pi x)\,dx=-\frac{\pi^2}2$.
- `ipp` par « On prend directement $\varphi=u$ dans la définition des dérivées au sens des distributions. » → incorrect [domaine-operateur] : $u$ n'est pas une fonction test : son support n'est pas compact dans $\Omega$ en général, et la formule n'est établie que pour $\varphi\in C^\infty_c(\Omega)$. Il faut un argument de densité dans $H^1_0(\Omega)$. — Contre-exemple : $\Omega=]0,1[$ et $u(x)=x(1-x)$ : $u\in D(A)$, mais son support $[0,1]$ n'est pas un compact de $]0,1[$.
- `ipp` par « Formule de Green sur $\Omega$, le terme de bord étant nul car $u=0$ sur $\partial\Omega$. » → a-justifier [regularite-bord] : La formule de Green avec terme de bord demande $u\in H^2(\Omega)$ et un bord assez régulier pour donner un sens à $\partial_\nu u$ : aucune de ces hypothèses n'est disponible. La densité de $C^\infty_c(\Omega)$ dans $H^1_0(\Omega)$ évite toute considération de bord.
- `fin` par « Le laplacien de Dirichlet $-\Delta$ est un opérateur positif. » → incorrect [circularite] : C'est exactement ce qu'il faut démontrer : invoquer la positivité de $-\Delta$ revient à supposer le résultat.

Retraits :
- `d-H10` (nécessaire) : Sans condition de Dirichlet, l'approximation par des fonctions test disparaît, et $\langle\Delta u,u\rangle$ peut être positif. — Contre-exemple : $\Omega=]0,1[$ et $u(x)=e^x$ : $u\in H^1(\Omega)$, $\Delta u=e^x\in L^2(\Omega)$, et $\langle\Delta u,u\rangle=\int_0^1e^{2x}\,dx=\frac{e^2-1}2>0$.

Calculs fermés : [{"kind":"rational","prompt":"Pour $\\Omega=]0,1[$ et $u(x)=x(1-x)$ : valeur de $\\langle Au,u\\rangle_{L^2}$","expected":"-1/3"}]

Solution :
**Formule pour les fonctions test.** Soit $u\in D(A)$. Comme $u\in H^1(\Omega)$, les dérivées $\partial_iu$ sont dans $L^2(\Omega)$, et la définition des dérivées au sens des distributions donne, pour $\varphi\in C^\infty_c(\Omega)$, $\langle\Delta u,\varphi\rangle=\sum_i\langle\partial_i(\partial_iu),\varphi\rangle=-\sum_i\int_\Omega\partial_iu\,\partial_i\varphi$. Puisque $\Delta u\in L^2(\Omega)$, le membre de gauche vaut $\int_\Omega(\Delta u)\varphi$.

**Densité.** Par définition de $H^1_0(\Omega)$, il existe $\varphi_k\in C^\infty_c(\Omega)$ avec $\varphi_k\to u$ dans $H^1(\Omega)$. Par Cauchy–Schwarz, $\int(\Delta u)\varphi_k\to\int(\Delta u)u$, car $\varphi_k\to u$ dans $L^2(\Omega)$, et $\int\nabla u\cdot\nabla\varphi_k\to\int|\nabla u|^2$, car $\nabla\varphi_k\to\nabla u$ dans $L^2(\Omega)^d$. À la limite : $\int_\Omega(\Delta u)u=-\int_\Omega|\nabla u|^2$.

**Conclusion.** $\langle Au,u\rangle_{L^2}=-\|\nabla u\|^2_{L^2}\le0$ : $A$ est dissipatif. Aucune régularité $H^2$ ni aucune hypothèse sur $\partial\Omega$ n'a servi. Exemple : pour $\Omega=]0,1[$ et $u(x)=x(1-x)$, $\Delta u=-2$ et $\langle Au,u\rangle=-2\int_0^1x(1-x)\,dx=-\frac13=-\int_0^1(1-2x)^2\,dx$.

Indices :
1. Que signifie $\Delta u$ au sens des distributions, et contre quelles fonctions sait-on tester ? $u$ en fait-il partie ?
2. Écris l'égalité pour $\varphi\in C^\infty_c(\Omega)$, puis approche $u$ par de telles fonctions, dans la norme adaptée aux deux membres.
3. Prends $\varphi_k\to u$ dans $H^1(\Omega)$ : chaque membre de $\int(\Delta u)\varphi_k=-\int\nabla u\cdot\nabla\varphi_k$ passe à la limite par Cauchy–Schwarz.

Erreurs fréquentes :
- Prendre $\varphi=u$ dans la définition des dérivées au sens des distributions, alors que $u$ n'est pas une fonction test.
- Utiliser la formule de Green avec terme de bord sans disposer de $u\in H^2(\Omega)$.
- Invoquer la positivité de $-\Delta$, qui est précisément ce qu'il faut démontrer.

Variante : Soit $q\in L^\infty(\Omega)$ avec $q\ge0$ p.p., et $A_q=\Delta-q$ sur le même domaine $D(A)$. Montrer que $\langle A_qu,u\rangle=-\int_\Omega|\nabla u|^2-\int_\Omega qu^2\le0$, puis calculer $\langle A_qu,u\rangle$ pour $\Omega=]0,1[$, $q=1$ et $u(x)=x(1-x)$.

Solution de la variante : Comme $qu\in L^2(\Omega)$, la condition $\Delta u-qu\in L^2(\Omega)$ équivaut à $\Delta u\in L^2(\Omega)$ : le domaine est inchangé. Par l'exercice, $\langle\Delta u,u\rangle=-\int|\nabla u|^2$, et $\langle qu,u\rangle=\int qu^2\ge0$, d'où $\langle A_qu,u\rangle\le0$. Pour $\Omega=]0,1[$, $q=1$ et $u=x(1-x)$ : $-\int_0^1(1-2x)^2\,dx-\int_0^1x^2(1-x)^2\,dx=-\frac13-\frac1{30}=-\frac{11}{30}$.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `lumer-phillips.intermediaire` : De la dissipativité à la minoration $\|(\lambda I-A)u\|\ge\lambda\|u\|$

Énoncé : Soit $H$ un espace de Hilbert, réel ou complexe, et $A:D(A)\subset H\to H$ linéaire et dissipatif : $\mathrm{Re}\langle Au,u\rangle\le0$ pour tout $u\in D(A)$. Pour $\lambda>0$ et $u\in D(A)$, démontrer $\|(\lambda I-A)u\|\ge\lambda\|u\|$. En déduire que $\lambda I-A$ est injectif ; que, s'il est de plus surjectif, $\lambda\in\rho(A)$ et $\|R(\lambda,A)\|\le1/\lambda$ ; et que $\mathrm{Im}(\lambda I-A)$ est fermée lorsque $A$ est fermé.
Source : {"doc":"polycopie","pdfPage":43,"label":"Exercice 29, intermédiaire (p. PDF 43) ; démonstration de Lumer–Phillips (p. PDF 27)"} — prérequis : —

But : `fin` — usage : demonstration

Nœuds :
- `h-H` (hypothese) : $H$ est un espace de Hilbert, réel ou complexe, et $A:D(A)\subset H\to H$ est linéaire.
- `h-diss` (hypothese) : $A$ est dissipatif : $\mathrm{Re}\langle Au,u\rangle\le0$ pour tout $u\in D(A)$.
- `s-u` (definition, locale) : Soient $\lambda>0$ et $u\in D(A)$.
- `h-ferme` (hypothese) : Pour la dernière assertion : $A$ est fermé.
- `dev` (egalite) : $\mathrm{Re}\langle(\lambda I-A)u,u\rangle=\lambda\|u\|^2-\mathrm{Re}\langle Au,u\rangle$.
- `min` (inegalite) : $\lambda\|u\|^2\le\mathrm{Re}\langle(\lambda I-A)u,u\rangle$.
- `cs` (inegalite) : $\mathrm{Re}\langle(\lambda I-A)u,u\rangle\le\|(\lambda I-A)u\|\,\|u\|$.
- `chain` (inegalite) : $\lambda\|u\|^2\le\|(\lambda I-A)u\|\,\|u\|$.
- `borne-inf` (inegalite) : $\|(\lambda I-A)u\|\ge\lambda\|u\|$.
- `inj` (consequence) : $\lambda I-A$ est injectif.
- `inv-borne` (inegalite) : Si $\lambda I-A$ est surjectif, alors $\lambda\in\rho(A)$ et $\|R(\lambda,A)\|\le1/\lambda$.
- `im-fermee` (consequence) : Si $A$ est fermé, $\mathrm{Im}(\lambda I-A)$ est fermée dans $H$.
- `fin` (conclusion) : Pour tous $\lambda>0$ et $u\in D(A)$ : $\|(\lambda I-A)u\|\ge\lambda\|u\|$ ; $\lambda I-A$ est injectif, d'inverse borné par $1/\lambda$ sur son image, et cette image est fermée si $A$ est fermé.
- `x-sens` (inegalite, DISTRACTEUR) : $\|(\lambda I-A)u\|\le\lambda\|u\|$.
- `x-reel` (consequence, DISTRACTEUR) : $\langle Au,u\rangle$ est un réel négatif ou nul.

Règles :
- `h-H` + `s-u` ⟹ `dev` par « Linéarité du produit scalaire en la première variable, et $\langle u,u\rangle=\|u\|^2$. »
- `dev` + `h-diss` ⟹ `min` par « Hypothèse de dissipativité : $-\mathrm{Re}\langle Au,u\rangle\ge0$. »
- `h-H` + `s-u` ⟹ `cs` par « Inégalité de Cauchy–Schwarz, et $\mathrm{Re}\,z\le|z|$ pour tout $z$. [cauchy-schwarz] »
- `min` + `cs` ⟹ `chain` par « Transitivité des deux inégalités. »
- `chain` ⟹ `borne-inf` par « Si $u=0$, l'inégalité est triviale ; sinon, on divise par $\|u\|>0$. »
- `borne-inf` ⟹ `inj` par « Si $(\lambda I-A)u=0$, alors $\lambda\|u\|\le0$, donc $u=0$. »
- `borne-inf` + `inj` ⟹ `inv-borne` par « L'inverse est défini sur $\mathrm{Im}(\lambda I-A)$, et la minoration appliquée à $u=(\lambda I-A)^{-1}f$ donne $\|(\lambda I-A)^{-1}f\|\le\|f\|/\lambda$. »
- `borne-inf` + `h-ferme` ⟹ `im-fermee` par « Si $(\lambda I-A)u_k\to f$, la minoration rend $(u_k)$ de Cauchy, donc $u_k\to u$ ; alors $Au_k\to\lambda u-f$, et la fermeture de $A$ donne $u\in D(A)$ et $(\lambda I-A)u=f$. »
- `borne-inf` + `inj` + `inv-borne` + `im-fermee` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « Inégalité triangulaire : $\|(\lambda I-A)u\|\ge\lambda\|u\|-\|Au\|\ge\lambda\|u\|$. » ; « Diviser par $\|u\|$. » ; « Théorème de Lumer–Phillips. »

Pièges :
- `x-sens` → incorrect [lumer-phillips-dissipativite] : La dissipativité donne une minoration, pas une majoration : $\lambda\|u\|^2\le\|(\lambda I-A)u\|\,\|u\|$. — Contre-exemple : $A=-I$, dissipatif, et $\lambda=1$ : $\|(\lambda I-A)u\|=2\|u\|>\|u\|$ pour $u\neq0$.
- `x-reel` → incorrect [lumer-phillips-dissipativite] : Dans un Hilbert complexe, la dissipativité ne porte que sur la partie réelle : $\langle Au,u\rangle$ peut ne pas être réel. — Contre-exemple : $H=\mathbb C$ et $A=\mathrm iI$ : $\mathrm{Re}\langle Au,u\rangle=0$, mais $\langle Au,u\rangle=\mathrm i|u|^2$.
- `borne-inf` par « Inégalité triangulaire : $\|(\lambda I-A)u\|\ge\lambda\|u\|-\|Au\|\ge\lambda\|u\|$. » → incorrect [lumer-phillips-dissipativite] : L'inégalité triangulaire donne seulement $\lambda\|u\|-\|Au\|$, qui est au plus $\lambda\|u\|$ : la seconde inégalité est fausse dès que $Au\neq0$. C'est la partie réelle du produit scalaire qui fournit la minoration. — Contre-exemple : $A=-I$, $\lambda=1$, $\|u\|=1$ : $\lambda\|u\|-\|Au\|=0<1$.
- `borne-inf` par « Diviser par $\|u\|$. » → a-justifier [justification-absente] : Et si $u=0$ ? La division par $\|u\|$ exige de traiter ce cas à part.
- `fin` par « Théorème de Lumer–Phillips. » → incorrect [circularite] : Cette minoration est une étape de la démonstration de Lumer–Phillips : l'invoquer ici serait circulaire.

Retraits :
- `h-diss` (nécessaire) : Sans dissipativité, la minoration et l'injectivité peuvent tomber. — Contre-exemple : $A=I$ et $\lambda=1$ : $(\lambda I-A)u=0$ pour tout $u$, donc $\|(\lambda I-A)u\|\ge\lambda\|u\|$ est faux pour $u\neq0$.
- `h-ferme` (nécessaire) : La minoration subsiste, mais l'image de $\lambda I-A$ peut ne plus être fermée. — Contre-exemple : $H=\ell^2(\mathbb N^*)$ et $A$ diagonal de coefficients $-n$ sur les suites à support fini : $A$ est dissipatif, et $\mathrm{Im}(I-A)$ est l'espace des suites à support fini, dense et non fermé.

Calculs fermés : [{"kind":"rational","prompt":"Pour $H=\\mathbb R^2$, $A=\\begin{pmatrix}-1&2\\\\-2&-1\\end{pmatrix}$, $\\lambda=1$ et $u=e_1$ : valeur de $\\|(\\lambda I-A)u\\|^2$","expected":"8"}]

Solution :
**Minoration.** Pour $\lambda>0$ et $u\in D(A)$, la linéarité donne $\mathrm{Re}\langle(\lambda I-A)u,u\rangle=\lambda\|u\|^2-\mathrm{Re}\langle Au,u\rangle\ge\lambda\|u\|^2$, par dissipativité. Par Cauchy–Schwarz, $\mathrm{Re}\langle(\lambda I-A)u,u\rangle\le\|(\lambda I-A)u\|\,\|u\|$. Donc $\lambda\|u\|^2\le\|(\lambda I-A)u\|\,\|u\|$. Si $u=0$, l'inégalité cherchée est triviale ; sinon, on divise par $\|u\|>0$ : $\|(\lambda I-A)u\|\ge\lambda\|u\|$.

**Conséquences.** Si $(\lambda I-A)u=0$, alors $\lambda\|u\|\le0$, donc $u=0$ : $\lambda I-A$ est injectif. Sur son image, l'inverse vérifie $\|(\lambda I-A)^{-1}f\|\le\|f\|/\lambda$. Si $\lambda I-A$ est surjectif, c'est une bijection de $D(A)$ sur $H$ d'inverse borné : $\lambda\in\rho(A)$ et $\|R(\lambda,A)\|\le1/\lambda$ (l'opérateur $A$ est alors automatiquement fermé).

**Image fermée.** Supposons $A$ fermé, et $(\lambda I-A)u_k\to f$. La minoration donne $\|u_k-u_l\|\le\|(\lambda I-A)(u_k-u_l)\|/\lambda$ : $(u_k)$ est de Cauchy, donc $u_k\to u$. Alors $Au_k=\lambda u_k-(\lambda I-A)u_k\to\lambda u-f$, et la fermeture de $A$ donne $u\in D(A)$, $Au=\lambda u-f$, c'est-à-dire $f=(\lambda I-A)u$.

**Exemple.** Pour $A=\begin{pmatrix}-1&2\\-2&-1\end{pmatrix}$ sur $\mathbb R^2$, $\langle Au,u\rangle=-\|u\|^2$ ; avec $\lambda=1$ et $u=e_1$, $(\lambda I-A)u=(2,2)$, de norme au carré $8\ge1$.

Indices :
1. Quelle quantité la dissipativité contrôle-t-elle ? Fais-la apparaître dans $\langle(\lambda I-A)u,u\rangle$.
2. Minore $\mathrm{Re}\langle(\lambda I-A)u,u\rangle$ grâce à l'hypothèse, majore-la par Cauchy–Schwarz, puis compare les deux.
3. $\lambda\|u\|^2\le\mathrm{Re}\langle(\lambda I-A)u,u\rangle\le\|(\lambda I-A)u\|\,\|u\|$. Pour l'image fermée : une suite $(\lambda I-A)u_k$ convergente rend $(u_k)$ de Cauchy.

Erreurs fréquentes :
- Remplacer l'argument de partie réelle par l'inégalité triangulaire, qui donne seulement $\lambda\|u\|-\|Au\|$.
- Diviser par $\|u\|$ sans traiter le cas $u=0$.
- Écrire $\langle Au,u\rangle\le0$ dans un Hilbert complexe.

Variante : Soit $A$ linéaire et dissipatif sur un Hilbert $H$, et supposons $\lambda_0I-A$ surjectif pour un $\lambda_0>0$. Montrer que $A$ est fermé, et que $\lambda I-A$ est surjectif pour tout $\lambda>0$, avec $\|R(\lambda,A)\|\le1/\lambda$.

Solution de la variante : L'exercice donne $\|(\lambda I-A)u\|\ge\lambda\|u\|$ pour $\lambda>0$. Soit $\Lambda=\{\lambda>0:\lambda I-A\text{ surjectif}\}$ ; il contient $\lambda_0$. Pour $\lambda\in\Lambda$, $\lambda I-A$ est une bijection de $D(A)$ sur $H$, d'inverse de norme au plus $1/\lambda$ ; en particulier $(\lambda_0I-A)^{-1}$ est borné et partout défini, donc $A$ est fermé. Si $\lambda\in\Lambda$ et $|\mu-\lambda|<\lambda$, l'écriture $\mu I-A=\big[I+(\mu-\lambda)(\lambda I-A)^{-1}\big](\lambda I-A)$ et la série de Neumann montrent $\mu\in\Lambda$ : $\Lambda$ est ouvert. Si $\lambda_k\in\Lambda$ tend vers $\lambda>0$, alors $|\lambda-\lambda_k|<\lambda_k$ pour $k$ assez grand, donc $\lambda\in\Lambda$ : $\Lambda$ est fermé dans $]0,+\infty[$. Partie non vide, ouverte et fermée du connexe $]0,+\infty[$, $\Lambda$ lui est égal : tout $\lambda>0$ appartient à $\rho(A)$, avec $\|R(\lambda,A)\|\le1/\lambda$.

Graphe de la variante :
But : `fin` — usage : demonstration

Nœuds :
- `h-A` (hypothese) : $H$ est un espace de Hilbert et $A:D(A)\subset H\to H$ est linéaire et dissipatif.
- `h-min` (hypothese) : (Exercice) Pour tous $\lambda>0$ et $u\in D(A)$ : $\|(\lambda I-A)u\|\ge\lambda\|u\|$.
- `h-surj` (hypothese) : Il existe $\lambda_0>0$ tel que $\lambda_0I-A$ soit surjectif.
- `d-L` (definition) : $\Lambda=\{\lambda>0:\lambda I-A\text{ est surjectif}\}$.
- `nonvide` (consequence) : $\lambda_0\in\Lambda$.
- `inv` (consequence) : Pour $\lambda\in\Lambda$ : $\lambda I-A$ est une bijection de $D(A)$ sur $H$, et $\|(\lambda I-A)^{-1}\|\le1/\lambda$.
- `ferme` (consequence) : $A$ est fermé.
- `ouvert` (consequence) : Si $\lambda\in\Lambda$ et si $\mu>0$ vérifie $|\mu-\lambda|<\lambda$, alors $\mu\in\Lambda$.
- `ferme-L` (consequence) : $\Lambda$ est fermé dans $]0,+\infty[$.
- `tout` (egalite) : $\Lambda=\,]0,+\infty[$.
- `fin` (conclusion) : Pour tout $\lambda>0$ : $\lambda\in\rho(A)$ et $\|R(\lambda,A)\|\le1/\lambda$.
- `x-ouvert-seul` (egalite, DISTRACTEUR) : $\Lambda$ étant ouvert et non vide, $\Lambda=\,]0,+\infty[$.

Règles :
- `h-surj` + `d-L` ⟹ `nonvide` par « $\lambda_0$ vérifie la condition qui définit $\Lambda$. »
- `h-A` + `h-min` + `d-L` ⟹ `inv` par « La minoration donne l'injectivité, puis la borne de l'inverse sur $\mathrm{Im}(\lambda I-A)=H$. »
- `inv` + `nonvide` ⟹ `ferme` par « $(\lambda_0I-A)^{-1}$ est borné et partout défini, donc fermé ; le graphe de $\lambda_0I-A$ est le symétrique du sien, et $A=\lambda_0I-(\lambda_0I-A)$ est fermé. »
- `inv` + `d-L` ⟹ `ouvert` par « $\mu I-A=\big[I+(\mu-\lambda)(\lambda I-A)^{-1}\big](\lambda I-A)$, avec $\|(\mu-\lambda)(\lambda I-A)^{-1}\|\le|\mu-\lambda|/\lambda<1$ : série de Neumann. [serie-neumann] »
- `ouvert` ⟹ `ferme-L` par « Si $\lambda_k\in\Lambda$ et $\lambda_k\to\lambda>0$, alors $|\lambda-\lambda_k|<\lambda_k$ pour $k$ assez grand, et le critère précédent s'applique. »
- `nonvide` + `ouvert` + `ferme-L` ⟹ `tout` par « Partie non vide, ouverte et fermée du connexe $]0,+\infty[$. »
- `tout` + `inv` + `ferme` ⟹ `fin` par « Définition de $\rho(A)$ pour l'opérateur fermé $A$, avec la borne de l'inverse. »

Justifications sans règle (séduisantes ou fausses) : « Une partie ouverte non vide d’un intervalle est l’intervalle entier. »

Pièges :
- `x-ouvert-seul` → incorrect [hypotheses-theoreme] : L'ouverture ne suffit pas : un ouvert non vide de $]0,+\infty[$ peut en être distinct. La fermeture de $\Lambda$, qui vient de l'uniformité de la borne $1/\lambda$, est indispensable. — Contre-exemple : $]0,1[$ est un ouvert non vide de $]0,+\infty[$, distinct de $]0,+\infty[$.
- `tout` par « Une partie ouverte non vide d’un intervalle est l’intervalle entier. » → incorrect [hypotheses-theoreme] : Une partie ouverte non vide d'un intervalle n'est pas l'intervalle entier : il faut aussi qu'elle soit fermée dans cet intervalle. — Contre-exemple : $]0,1[\,\subset\,]0,+\infty[$.

Retraits :
- `h-surj` (nécessaire) : Sans un premier $\lambda_0$, l'ensemble $\Lambda$ peut être vide. — Contre-exemple : $Bu=u'$ sur $D(B)=H^1_0(]0,1[)$ est dissipatif, et $\mathrm{Im}(\lambda I-B)=\{f:\int_0^1e^{-\lambda s}f(s)\,ds=0\}$ pour tout $\lambda>0$ : $\Lambda=\emptyset$.

Vérification : {"origin":"polycopie","review":"machine"}

## Exercice difficile `lumer-phillips.difficile` : Génération par Lumer–Phillips et Lax–Milgram

Énoncé : Soit $\Omega\subset\mathbb R^d$ un ouvert borné, $H=L^2(\Omega)$ réel, $V=H^1_0(\Omega)$ muni de $(u,v)_V=\int_\Omega\nabla u\cdot\nabla v+\int_\Omega uv$, et $A=\Delta$ de domaine $D(A)=\{u\in H^1_0(\Omega):\Delta u\in L^2(\Omega)\}$. On admet le résultat de l'exercice facile : $\langle Au,u\rangle=-\int_\Omega|\nabla u|^2$ pour $u\in D(A)$.

Montrer, par le théorème de Lax–Milgram appliqué sur $V$ à $a(u,v)=\int_\Omega\nabla u\cdot\nabla v+\int_\Omega uv$, que $I-A$ est surjectif, puis en déduire par Lumer–Phillips que $A$ engendre un $C_0$-semi-groupe de contractions sur $L^2(\Omega)$.
Source : {"doc":"polycopie","pdfPage":43,"label":"Exercice 29, difficile (p. PDF 43) ; énoncé de Lumer–Phillips (p. PDF 26–27)"} — prérequis : lax-milgram, distributions

But : `fin` — usage : application

Nœuds :
- `h-omega` (hypothese) : $\Omega\subset\mathbb R^d$ est un ouvert borné, $H=L^2(\Omega)$ est réel, et $V=H^1_0(\Omega)$, muni de $(u,v)_V=\int_\Omega\nabla u\cdot\nabla v+\int_\Omega uv$, est un espace de Hilbert.
- `d-A` (definition) : $D(A)=\{u\in H^1_0(\Omega):\Delta u\in L^2(\Omega)\}$ et $Au=\Delta u$, au sens des distributions.
- `h-diss` (hypothese) : (Exercice facile) Pour $u\in D(A)$ : $\langle Au,u\rangle=-\int_\Omega|\nabla u|^2\le0$.
- `s-f` (definition, locale) : Soit $f\in L^2(\Omega)$.
- `d-a` (definition) : $a(u,v)=\int_\Omega\nabla u\cdot\nabla v+\int_\Omega uv$ pour $u,v\in V$, et $\ell(v)=\int_\Omega fv$.
- `dense` (consequence) : $D(A)$ est dense dans $L^2(\Omega)$.
- `a-cont` (inegalite) : $|a(u,v)|\le\|u\|_V\|v\|_V$ pour tous $u,v\in V$.
- `a-coer` (egalite) : $a(v,v)=\|v\|_V^2$ pour tout $v\in V$ : $a$ est coercive.
- `l-cont` (inegalite) : $|\ell(v)|\le\|f\|_{L^2}\|v\|_V$ pour tout $v\in V$ : $\ell\in V'$.
- `lm` (application-theoreme) : Il existe un unique $u\in V$ tel que $a(u,v)=\ell(v)$ pour tout $v\in V$.
- `eq-dist` (egalite) : $-\Delta u+u=f$ dans $\mathcal D'(\Omega)$.
- `surj` (egalite) : $u\in D(A)$ et $(I-A)u=f$ ; $f$ étant arbitraire, $\mathrm{Im}(I-A)=L^2(\Omega)$.
- `fin` (conclusion) : $A$ engendre un $C_0$-semi-groupe de contractions sur $L^2(\Omega)$.
- `x-dense` (consequence, DISTRACTEUR) : Pour appliquer Lumer–Phillips, il suffit que $\mathrm{Im}(I-A)$ soit dense dans $L^2(\Omega)$.
- `x-A-surj` (consequence, DISTRACTEUR) : Lumer–Phillips exige en outre que $A$ lui-même soit surjectif.

Règles :
- `d-A` + `h-omega` ⟹ `dense` par « $C^\infty_c(\Omega)\subset D(A)$, et $C^\infty_c(\Omega)$ est dense dans $L^2(\Omega)$. [densite-cinf] »
- `d-a` + `h-omega` ⟹ `a-cont` par « Cauchy–Schwarz dans $L^2(\Omega)^d$ et dans $L^2(\Omega)$, puis dans $\mathbb R^2$. [cauchy-schwarz] »
- `d-a` + `h-omega` ⟹ `a-coer` par « $a$ coïncide avec le produit scalaire de $V$. »
- `d-a` + `s-f` + `h-omega` ⟹ `l-cont` par « Cauchy–Schwarz dans $L^2(\Omega)$ et $\|v\|_{L^2}\le\|v\|_V$. [cauchy-schwarz] »
- `h-omega` + `a-cont` + `a-coer` + `l-cont` ⟹ `lm` par « Théorème de Lax–Milgram sur l’espace de Hilbert $V$. [lax-milgram] »
- `lm` + `d-a` ⟹ `eq-dist` par « Tester avec $v=\varphi\in C^\infty_c(\Omega)\subset V$, puis définition des dérivées au sens des distributions. [distributions] »
- `eq-dist` + `lm` + `s-f` + `d-A` ⟹ `surj` par « $u\in H^1_0(\Omega)$ et $\Delta u=u-f\in L^2(\Omega)$ : donc $u\in D(A)$ et $u-\Delta u=f$. »
- `dense` + `h-diss` + `surj` ⟹ `fin` par « Théorème de Lumer–Phillips, avec $\lambda_0=1$. [lumer-phillips] »

Justifications sans règle (séduisantes ou fausses) : « Théorème de Riesz dans $L^2(\Omega)$, appliqué à la forme $\ell$. » ; « Théorème de Lax–Milgram sur $H=L^2(\Omega)$, appliqué à la forme $a$. » ; « Inégalité de Poincaré, nécessaire à la coercivité de $a$. »

Pièges :
- `x-dense` → incorrect [image-dense-surjective] : L'énoncé du polycopié exige $\mathrm{Im}(\lambda_0I-A)=H$ : une image seulement dense ne suffit pas pour l'opérateur $A$ lui-même. — Contre-exemple : $H=\ell^2(\mathbb N^*)$ et $A$ diagonal de coefficients $-n$ sur les suites à support fini : $A$ est dissipatif et densément défini, $\mathrm{Im}(I-A)$ est dense mais distincte de $H$, et $A$, non fermé, n'est pas un générateur.
- `x-A-surj` → incorrect [hypotheses-theoreme] : Le critère porte sur $\lambda_0I-A$ pour un $\lambda_0>0$, non sur $A$. — Contre-exemple : $H=\mathbb R$ et $A=0$ : $A$ engendre $S(t)=I$, semi-groupe de contractions, alors que $A$ n'est pas surjectif.
- `lm` par « Théorème de Riesz dans $L^2(\Omega)$, appliqué à la forme $\ell$. » → incorrect [hypotheses-theoreme] : Riesz dans $L^2(\Omega)$ représente $\ell$ par $f$ lui-même : il ne produit aucune solution dans $H^1_0(\Omega)$ et ignore le terme $\int\nabla u\cdot\nabla v$.
- `lm` par « Théorème de Lax–Milgram sur $H=L^2(\Omega)$, appliqué à la forme $a$. » → incorrect [hypotheses-theoreme] : $a$ n'est ni définie ni continue sur $L^2(\Omega)\times L^2(\Omega)$ : Lax–Milgram s'applique sur $V=H^1_0(\Omega)$. — Contre-exemple : $\Omega=]0,1[$ et $v_k(x)=\sqrt2\sin(k\pi x)$ : $\|v_k\|_{L^2}=1$ et $a(v_k,v_k)=k^2\pi^2+1\to+\infty$.
- `a-coer` par « Inégalité de Poincaré, nécessaire à la coercivité de $a$. » → a-justifier [hypotheses-theoreme] : L'inégalité de Poincaré est inutile ici : grâce au terme $\int uv$, $a(v,v)$ est exactement $\|v\|_V^2$. Elle servirait pour la forme $\int\nabla u\cdot\nabla v$ seule.

Retraits :
- `h-diss` (nécessaire) : La surjectivité seule ne donne pas un semi-groupe de contractions. — Contre-exemple : $\Omega=]0,1[$ et $A_c=\Delta+2\pi^2I$ sur $D(A)$ : $\lambda_0I-A_c$ est surjectif pour $\lambda_0>2\pi^2$, mais $\varphi=\sin(\pi x)$ vérifie $A_c\varphi=\pi^2\varphi$ ; un semi-groupe engendré par $A_c$ vérifierait $S(t)\varphi=e^{\pi^2t}\varphi$, de norme croissante : il n'est pas contractif.
- `a-coer` (nécessaire) : Sans coercivité, Lax–Milgram ne s'applique plus, et la résolution peut échouer. — Contre-exemple : Sur $H^1_0(]0,1[)$, $b(u,v)=\int_0^1u'v'-\pi^2\int_0^1uv$ n'est pas coercive : $\varphi=\sin(\pi x)$ vérifie $b(u,\varphi)=0$ pour tout $u$, donc $b(u,v)=\int_0^1\varphi v$ n'a pas de solution (tester avec $v=\varphi$).
- `surj` (nécessaire) : Densité et dissipativité ne suffisent pas : la condition d'image est indispensable. — Contre-exemple : $Bu=u'$ sur $D(B)=H^1_0(]0,1[)$ : $B$ est densément défini et $\langle Bu,u\rangle=0$, mais $\mathrm{Im}(I-B)=\{f:\int_0^1e^{-s}f(s)\,ds=0\}\neq L^2(]0,1[)$ : $B$ n'est pas générateur.

Calculs fermés : [{"kind":"rational","prompt":"Meilleure constante $\\alpha$ telle que $a(v,v)\\ge\\alpha\\|v\\|_V^2$ pour tout $v\\in V$","expected":"1"}]

Solution :
**Densité.** Pour $\varphi\in C^\infty_c(\Omega)$, $\varphi\in H^1_0(\Omega)$ et $\Delta\varphi\in C^\infty_c(\Omega)\subset L^2(\Omega)$ : $C^\infty_c(\Omega)\subset D(A)$, et $C^\infty_c(\Omega)$ est dense dans $L^2(\Omega)$.

**Dissipativité.** Par l'exercice facile, $\langle Au,u\rangle=-\int_\Omega|\nabla u|^2\le0$ pour $u\in D(A)$.

**Surjectivité de $I-A$.** Soit $f\in L^2(\Omega)$. La forme $a$ est le produit scalaire de $V$ : $|a(u,v)|\le\|u\|_V\|v\|_V$ et $a(v,v)=\|v\|_V^2$. La forme $\ell(v)=\int fv$ vérifie $|\ell(v)|\le\|f\|_{L^2}\|v\|_{L^2}\le\|f\|_{L^2}\|v\|_V$. Lax–Milgram donne un unique $u\in V$ tel que $a(u,v)=\ell(v)$ pour tout $v\in V$. Avec $v=\varphi\in C^\infty_c(\Omega)$ : $\int\nabla u\cdot\nabla\varphi+\int u\varphi=\int f\varphi$, c'est-à-dire $-\Delta u+u=f$ dans $\mathcal D'(\Omega)$. Ainsi $\Delta u=u-f\in L^2(\Omega)$, donc $u\in D(A)$ et $(I-A)u=f$.

**Conclusion.** $A$ est densément défini, dissipatif, et $\mathrm{Im}(I-A)=L^2(\Omega)$ : par Lumer–Phillips avec $\lambda_0=1$, $A$ engendre un $C_0$-semi-groupe de contractions sur $L^2(\Omega)$. L'inégalité de Poincaré n'a pas servi : le terme $\int uv$ rend $a$ coercive sur $V$, avec la constante $1$.

Indices :
1. Lumer–Phillips demande trois vérifications : lesquelles sont déjà acquises, et laquelle reste à faire ?
2. Pour résoudre $u-\Delta u=f$ avec $u\in H^1_0(\Omega)$, écris une formulation variationnelle sur $V$, vérifie les hypothèses de Lax–Milgram, puis reviens à l'équation au sens des distributions.
3. $a$ est exactement le produit scalaire de $V$. Teste ensuite avec $v\in C^\infty_c(\Omega)$ pour obtenir $-\Delta u+u=f$, d'où $\Delta u=u-f\in L^2(\Omega)$.

Erreurs fréquentes :
- Appliquer Lax–Milgram ou Riesz dans $L^2(\Omega)$ au lieu de $V=H^1_0(\Omega)$.
- Se contenter d'une image dense de $I-A$.
- Oublier de vérifier $\Delta u\in L^2(\Omega)$, c'est-à-dire $u\in D(A)$.

Variante : Soit $q\in L^\infty(\Omega)$ avec $q\ge0$ p.p., et $A_q=\Delta-q$ sur $D(A)$. Montrer que $A_q$ engendre un $C_0$-semi-groupe de contractions sur $L^2(\Omega)$, en appliquant Lax–Milgram à $a_q(u,v)=\int_\Omega\nabla u\cdot\nabla v+\int_\Omega(1+q)uv$.

Solution de la variante : Le domaine est inchangé, car $qu\in L^2(\Omega)$. La dissipativité vient de $\langle A_qu,u\rangle=-\int|\nabla u|^2-\int qu^2\le0$. La forme $a_q$ est continue sur $V$, avec $|a_q(u,v)|\le(1+\|q\|_{L^\infty})\|u\|_V\|v\|_V$, et coercive, car $a_q(v,v)\ge\|v\|_V^2$ puisque $q\ge0$. Lax–Milgram donne $u\in V$ avec $a_q(u,v)=\int fv$ pour tout $v\in V$, d'où $-\Delta u+(1+q)u=f$ dans $\mathcal D'(\Omega)$, puis $\Delta u=(1+q)u-f\in L^2(\Omega)$ : $u\in D(A)$ et $(I-A_q)u=f$. Lumer–Phillips conclut.

Vérification : {"origin":"complement","review":"machine"}