# 3. Hahn–Banach (`hahn-banach`) — polycopié p. PDF 7, section 1.3

## Fiche

Espaces : $X$ : espace normé réel, de dual topologique $X'$ normé par $\|L\|_{X'}=\sup_{\|x\|\le 1}|L(x)|$. | $M\subset X$ : sous-espace vectoriel, non nécessairement fermé, muni de la norme induite ; $M'$ est son dual topologique.

Hypothèses :
- $X$ est un espace normé réel ; aucune complétude n'est requise.
- $M$ est un sous-espace vectoriel de $X$.
- $\ell\in M'$ : $\ell$ est linéaire et continue sur $M$. — Sans elle : Sur l'espace $M$ des polynômes, muni de la norme uniforme sur $[0,1]$, la forme $\ell(p)=p'(0)$ n'est pas continue : $p_n(x)=x(1-x)^n$ vérifie $\|p_n\|_\infty\le\tfrac1{n+1}$ et $\ell(p_n)=1$. Elle n'admet donc aucun prolongement continu à $C([0,1])$, puisque la restriction à $M$ d'une forme continue est continue.

Énoncé : Soit $X$ un espace normé réel, $M\subset X$ un sous-espace et $\ell\in M'$. Il existe $L\in X'$ tel que $L|_M=\ell$ et $\|L\|_{X'}=\|\ell\|_{M'}$.

Bilan : {"existence":"Un prolongement continu existe ; il se construit direction par direction, puis par un argument de maximalité (lemme de Zorn).","autre":"Le prolongement conserve la norme : $\\|L\\|_{X'}=\\|\\ell\\|_{M'}$."}

Preuve dans le polycopié : idee

Plan :
1. Notons $c=\|\ell\|_{M'}$. Il suffit de construire $L\in X'$ prolongeant $\ell$ avec $\|L\|_{X'}\le c$ : l'inégalité inverse est automatique, puisque $L$ coïncide avec $\ell$ sur $M$.
2. *Une direction de plus.* Soit $x_1\notin M$ et $N=M\oplus\mathbb R x_1$. Pour $m,m'\in M$ : $\ell(m)-\ell(m')\le c\|m-m'\|\le c\|m+x_1\|+c\|m'+x_1\|$. Donc $\sup_{m'\in M}\big(-\ell(m')-c\|m'+x_1\|\big)\le\inf_{m\in M}\big(-\ell(m)+c\|m+x_1\|\big)$, et l'on choisit $\beta$ entre ces deux bornes : $|\ell(m)+\beta|\le c\|m+x_1\|$ pour tout $m\in M$.
3. On pose $g(m+tx_1)=\ell(m)+t\beta$. Pour $t\neq 0$ : $|g(m+tx_1)|=|t|\,|\ell(m/t)+\beta|\le c\|m+tx_1\|$. Ainsi $g$ prolonge $\ell$ à $N$ sans augmenter la norme.
4. *Maximalité.* Les couples $(N,g)$, où $N\supset M$ est un sous-espace et $g$ un prolongement linéaire de $\ell$ à $N$ vérifiant $|g|\le c\|\cdot\|$, sont ordonnés par prolongement ; toute chaîne est majorée par sa réunion. Le lemme de Zorn fournit un élément maximal $(N,g)$.
5. Si $N\neq X$, l'étape précédente prolonge strictement $(N,g)$, ce qui contredit la maximalité. Donc $N=X$, et $L=g$ convient.

Vigilance :
- Prolonger ne suffit pas : un prolongement linéaire quelconque peut avoir une norme strictement supérieure à $\|\ell\|_{M'}$.
- Le théorème affirme l'existence, non l'unicité : pour $\|(x,y)\|_1=|x|+|y|$ sur $\mathbb R^2$, la forme $\ell(t,0)=2t$ admet une infinité de prolongements de même norme.
- La séparation d’un point et d’un convexe fermé, évoquée dans le titre de la section, n’est pas énoncée dans le polycopié : elle est utilisée ici comme résultat admis.
- La démonstration générale utilise le lemme de Zorn ; en dimension finie, une récurrence sur la dimension suffit.

Vérification : {"origin":"complement","review":"machine","notes":"Le polycopié (p. PDF 7) ne donne qu’une idée de preuve ; la démonstration esquissée ici est complétée pour ProofLab."}

Définition « Prolongement d’une forme linéaire » : Si $M\subset X$ est un sous-espace et $\ell\in M'$, un prolongement de $\ell$ est une forme linéaire $L$ sur $X$ telle que $L|_M=\ell$ ; il est dit de même norme si $\|L\|_{X'}=\|\ell\|_{M'}$.

Définition « Fonction d’appui d’une partie » : Pour $C\subset X$ non vide et $L\in X'$, $\sigma_C(L)=\sup_{z\in C}L(z)\in\,]-\infty,+\infty]$. L'inégalité $L(z)\le\sigma_C(L)$, valable pour tout $z\in C$, est l'inégalité de support associée à $L$.

## Contre-exemple `ce-hb-unicite` : Plusieurs prolongements de même norme
Assertion : Le prolongement de même norme fourni par Hahn–Banach est unique.
Tâche : Sur $\mathbb R^2$ muni de $\|(x,y)\|_1=|x|+|y|$, soit $\ell(t,0)=2t$ sur l'axe horizontal. Calcule la norme du prolongement $L_1(x,y)=2x+y$ : elle coïncide avec celle de $L_0(x,y)=2x$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\|L_1\\|$ pour la norme $\\|\\cdot\\|_1$","expected":"2"}
Explication : Pour $|x|+|y|\le 1$ : $|2x+y|\le 2|x|+|y|\le 2(|x|+|y|)\le 2$, avec égalité en $(1,0)$. Donc $\|L_1\|=2=\|L_0\|=\|\ell\|_{M'}$ : deux prolongements distincts conservent la norme.

## Contre-exemple `ce-hb-norme` : Un prolongement qui augmente la norme
Assertion : Tout prolongement linéaire d'une forme continue conserve sa norme.
Tâche : Sur $\mathbb R^2$ euclidien, la forme $L(x,y)=2x+y$ prolonge $\ell(t,0)=2t$, qui est de norme $2$ sur l'axe horizontal. Calcule $\|L\|^2$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\|L\\|^2$","expected":"5"}
Explication : Par Cauchy–Schwarz, $|2x+y|\le\sqrt5\,\|(x,y)\|$, avec égalité en $(2,1)$ : $\|L\|=\sqrt5>2$.

## Contre-exemple `ce-hb-ferme` : Séparation stricte et convexe non fermé
Assertion : Si $C\subset\mathbb R^2$ est convexe et non vide, et si $x_0\notin C$, il existe une forme linéaire $L$ telle que $\sup_CL<L(x_0)$.
Tâche : Soit $C$ le disque unité ouvert de $\mathbb R^2$, $x_0=(1,0)\notin C$ et $L(x,y)=x$. Calcule $\sup_{z\in C}L(z)-L(x_0)$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\sup_{z\\in C}L(z)-L(x_0)$","expected":"0"}
Explication : $\sup_CL=1=L(x_0)$. Plus généralement, pour $L(x,y)=ax+by$, $\sup_CL=\sqrt{a^2+b^2}\ge a=L(x_0)$ : aucune séparation stricte n'est possible.

## Exercice facile `hahn-banach.facile` : Prolonger $\ell(t,0)=2t$ à $\mathbb R^2$

Énoncé : Dans $X=\mathbb R^2$ muni de la norme euclidienne, soit $M=\mathbb R\times\{0\}$ l'axe horizontal et $\ell:M\to\mathbb R$, $\ell(t,0)=2t$. Donner une extension linéaire de $\ell$ à $\mathbb R^2$ ; plus précisément, déterminer toutes les formes linéaires $L$ sur $\mathbb R^2$ qui prolongent $\ell$, puis celles qui vérifient $\|L\|_{X'}=\|\ell\|_{M'}$.
Source : {"doc":"polycopie","pdfPage":38,"label":"Exercice 3, facile (p. PDF 38)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-X` (hypothese) : $X=\mathbb R^2$ est muni de la norme euclidienne $\|(x,y)\|=\sqrt{x^2+y^2}$.
- `d-M` (definition) : $M=\mathbb R\times\{0\}$ est un sous-espace de $X$.
- `d-ell` (definition) : $\ell:M\to\mathbb R$ est définie par $\ell(t,0)=2t$.
- `n-ell` (egalite, calcul rational) : $\ell\in M'$ et $\|\ell\|_{M'}=2$.
  - valeur attendue : "2"
- `forme` (consequence) : Toute forme linéaire sur $\mathbb R^2$ s'écrit $L(x,y)=ax+by$, avec $a=L(1,0)$ et $b=L(0,1)$.
- `a` (egalite) : La forme $L(x,y)=ax+by$ prolonge $\ell$ si et seulement si $a=2$.
- `fam` (consequence) : Les prolongements linéaires de $\ell$ sont exactement les formes $L_c(x,y)=2x+cy$, pour $c\in\mathbb R$.
- `norm-Lc` (egalite) : $\|L_c\|_{X'}=\sqrt{4+c^2}$ pour tout $c\in\mathbb R$.
- `c0` (consequence) : $\|L_c\|_{X'}=\|\ell\|_{M'}$ si et seulement si $c=0$.
- `unique` (egalite, calcul rational-vector) : L'unique prolongement de même norme est $L_0(x,y)=2x$.
  - valeur attendue : ["2","0"]
- `fin` (conclusion) : Les prolongements de $\ell$ sont décrits, et celui qui conserve la norme est déterminé.
- `x-unique` (consequence, DISTRACTEUR) : $\ell$ admet un unique prolongement linéaire à $\mathbb R^2$.
- `x-tout` (consequence, DISTRACTEUR) : Tout prolongement linéaire $L$ de $\ell$ vérifie $\|L\|_{X'}=\|\ell\|_{M'}$.
- `x-somme` (egalite, DISTRACTEUR) : $\|L_c\|_{X'}=2+|c|$ pour tout $c\in\mathbb R$.

Règles :
- `h-X` + `d-M` + `d-ell` ⟹ `n-ell` par « Sur $M$, $\|(t,0)\|=|t|$ et $|\ell(t,0)|=2|t|$. »
- ∅ ⟹ `forme` par « Décomposition $(x,y)=x(1,0)+y(0,1)$ et linéarité de $L$. »
- `forme` + `d-M` + `d-ell` ⟹ `a` par « Restreindre $L$ à $M$ : $L(t,0)=at$ pour tout $t\in\mathbb R$. »
- `forme` + `a` ⟹ `fam` par « Le coefficient $b$ reste libre : on le note $c$. »
- `h-X` + `fam` ⟹ `norm-Lc` par « Inégalité de Cauchy–Schwarz pour la majoration, et le vecteur $(2,c)$ pour l'égalité. [cauchy-schwarz] »
- `n-ell` + `norm-Lc` ⟹ `c0` par « Résoudre l'équation $\sqrt{4+c^2}=2$. »
- `fam` + `c0` ⟹ `unique` par « Dans la famille des prolongements, retenir celui dont la norme vaut $\|\ell\|_{M'}$. »
- `n-ell` + `fam` + `unique` ⟹ `fin` par « Réunion de la description des prolongements et de l’étude de leurs normes. »

Justifications sans règle (séduisantes ou fausses) : « Le théorème de Hahn–Banach affirme l’unicité du prolongement de même norme. » ; « C’est évident. »

Pièges :
- `x-unique` → incorrect [existence-unicite] : Le prolongement linéaire n'est pas unique : la valeur en $(0,1)$ reste libre. — Contre-exemple : $L_1(x,y)=2x+y$ et $L_{-1}(x,y)=2x-y$ prolongent $\ell$ et diffèrent en $(0,1)$.
- `x-tout` → incorrect [hahn-banach-norme-prolongement] : Prolonger peut augmenter la norme : seul un prolongement bien choisi la conserve. — Contre-exemple : $L_1(x,y)=2x+y$ prolonge $\ell$, et $L_1(2,1)=5$ avec $\|(2,1)\|=\sqrt5$ : donc $\|L_1\|_{X'}\ge\sqrt5>2$.
- `x-somme` → incorrect [hahn-banach-norme-prolongement] : $2+|c|$ est la norme de $L_c$ pour la norme $\max(|x|,|y|)$ sur $\mathbb R^2$. Pour la norme euclidienne, la norme de $L_c$ est la norme euclidienne du vecteur de ses coefficients. — Contre-exemple : Pour $c=1$ : $|L_1(x,y)|\le\sqrt5\,\|(x,y)\|$ par Cauchy–Schwarz, donc $\|L_1\|_{X'}\le\sqrt5<3$.
- `unique` par « Le théorème de Hahn–Banach affirme l’unicité du prolongement de même norme. » → incorrect [existence-unicite] : Hahn–Banach garantit l'existence d'un prolongement de même norme, non son unicité. Ici l'unicité vient du calcul $\sqrt{4+c^2}=2\iff c=0$, propre à la norme euclidienne. — Contre-exemple : Pour la norme $\|(x,y)\|_1=|x|+|y|$, les formes $2x$ et $2x+y$ prolongent $\ell$ et ont toutes deux pour norme $2$.
- `norm-Lc` par « C’est évident. » → a-justifier [justification-absente] : La norme d'une forme se calcule : une majoration valable pour tout vecteur, puis un vecteur qui l'atteint.

Retraits :
- `h-X` (nécessaire) : Le calcul de $\|L_c\|_{X'}$ dépend de la norme de $X$ : pour une autre norme, la norme duale change, et l'unicité peut être perdue. — Contre-exemple : Pour $\|(x,y)\|_1=|x|+|y|$, on a $\|L_c\|=\max(2,|c|)$ : tous les $L_c$ avec $|c|\le 2$ conservent la norme.

Solution :
**Norme de $\ell$.** Sur $M$, $\|(t,0)\|=|t|$ et $|\ell(t,0)|=2|t|$ : $\ell$ est linéaire continue et $\|\ell\|_{M'}=2$.

**Tous les prolongements.** Une forme linéaire sur $\mathbb R^2$ s'écrit $L(x,y)=ax+by$, avec $a=L(1,0)$ et $b=L(0,1)$. Elle prolonge $\ell$ si et seulement si $L(t,0)=at=2t$ pour tout $t$, c'est-à-dire $a=2$. Les prolongements sont donc les $L_c(x,y)=2x+cy$, $c\in\mathbb R$ : il y en a une infinité, par exemple $L_0(x,y)=2x$.

**Prolongements de même norme.** Par Cauchy–Schwarz, $|L_c(x,y)|\le\sqrt{4+c^2}\,\|(x,y)\|$, avec égalité en $(x,y)=(2,c)$ : $\|L_c\|_{X'}=\sqrt{4+c^2}$. Cette norme vaut $2$ si et seulement si $c=0$ : l'unique prolongement de même norme est $L_0(x,y)=2x$.

**Point de vigilance.** L'unicité vient ici de la norme euclidienne ; Hahn–Banach n'affirme que l'existence. Pour la norme $|x|+|y|$, tous les $L_c$ avec $|c|\le 2$ conservent la norme.

Indices :
1. Commence par calculer $\|\ell\|_{M'}$ : quelle est la norme d'un vecteur $(t,0)$ ?
2. Écris une forme linéaire quelconque sur $\mathbb R^2$ à l'aide de ses valeurs en $(1,0)$ et $(0,1)$ ; la condition de prolongement ne fixe que l'une de ces valeurs.
3. Pour la norme de $L_c(x,y)=2x+cy$, Cauchy–Schwarz donne la majoration et le vecteur $(2,c)$ l'atteint. Compare ensuite à $\|\ell\|_{M'}$.

Erreurs fréquentes :
- Croire que le prolongement linéaire est unique.
- Croire que tout prolongement conserve la norme.
- Attribuer à Hahn–Banach une unicité qu’il n’affirme pas.

Variante : Sur $\mathbb R^2$ muni de la norme $\|(x,y)\|_1=|x|+|y|$, soit $M=\mathbb R\times\{0\}$ et $\ell(t,0)=2t$. Déterminer tous les prolongements linéaires de $\ell$ qui conservent la norme.

Solution de la variante : La norme induite sur $M$ est $|t|$, donc $\|\ell\|_{M'}=2$. Tout prolongement s'écrit $L_c(x,y)=2x+cy$. Pour $|x|+|y|\le 1$ : $|2x+cy|\le 2|x|+|c|\,|y|\le\max(2,|c|)$, avec égalité en $(1,0)$ ou en $(0,1)$ : $\|L_c\|=\max(2,|c|)$. Donc $L_c$ conserve la norme si et seulement si $|c|\le 2$ : il existe une infinité de prolongements de même norme, ce qui illustre que Hahn–Banach n'affirme pas l'unicité.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `hahn-banach.intermediaire` : Une forme normante pour un vecteur non nul

Énoncé : Soit $X$ un espace de Banach réel et $x\in X$, $x\neq 0$. Montrer qu'il existe $\ell\in X'$ telle que $\|\ell\|_{X'}=1$ et $\ell(x)=\|x\|$.
Source : {"doc":"polycopie","pdfPage":38,"label":"Exercice 3, intermédiaire (p. PDF 38)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-X` (hypothese) : $X$ est un espace de Banach réel ; seule sa structure d'espace normé servira.
- `h-x` (hypothese) : $x\in X$ et $x\neq 0$.
- `d-M` (definition) : $M=\mathbb R x=\{tx : t\in\mathbb R\}$ est la droite engendrée par $x$.
- `d-l0` (definition) : $\ell_0:M\to\mathbb R$ est définie par $\ell_0(tx)=t\|x\|$.
- `bien` (consequence) : $\ell_0$ est bien définie : tout $m\in M$ s'écrit de manière unique $m=tx$.
- `lin` (consequence) : $\ell_0$ est linéaire sur $M$.
- `iso` (egalite) : $|\ell_0(m)|=\|m\|$ pour tout $m\in M$.
- `n1` (egalite) : $\ell_0\in M'$ et $\|\ell_0\|_{M'}=1$.
- `hb` (application-theoreme) : Il existe $\ell\in X'$ tel que $\ell|_M=\ell_0$ et $\|\ell\|_{X'}=\|\ell_0\|_{M'}$.
- `val` (egalite) : $\ell(x)=\ell_0(x)=\|x\|$.
- `fin` (conclusion) : Il existe $\ell\in X'$ telle que $\|\ell\|_{X'}=1$ et $\ell(x)=\|x\|$.
- `x-l1` (egalite, DISTRACTEUR) : La forme $\ell_1(tx)=t$ est de norme $1$ sur $M$.
- `x-prolong` (consequence, DISTRACTEUR) : Tout prolongement linéaire de $\ell_0$ à $X$ est de norme $1$.
- `x-riesz` (egalite, DISTRACTEUR) : La forme $\langle\cdot,x\rangle/\|x\|$ convient, quel que soit l'espace de Banach $X$.

Règles :
- `h-x` + `d-M` + `d-l0` ⟹ `bien` par « Si $tx=t'x$, alors $(t-t')x=0$, et $x\neq 0$ impose $t=t'$. »
- `bien` + `d-l0` ⟹ `lin` par « Pour $m=tx$ et $m'=t'x$ : $\ell_0(\lambda m+\mu m')=(\lambda t+\mu t')\|x\|=\lambda\ell_0(m)+\mu\ell_0(m')$. »
- `bien` + `d-l0` ⟹ `iso` par « Homogénéité de la norme : $\|tx\|=|t|\,\|x\|$. »
- `lin` + `iso` + `h-x` ⟹ `n1` par « La borne supérieure de $|\ell_0|$ sur la boule unité de $M$ vaut $1$, car $M\neq\{0\}$ contient des vecteurs de norme $1$. »
- `h-X` + `d-M` + `n1` ⟹ `hb` par « Théorème de Hahn–Banach : prolongement en conservant la norme. [hahn-banach] »
- `hb` + `d-l0` + `d-M` ⟹ `val` par « Le prolongement coïncide avec $\ell_0$ sur $M$, et $x=1\cdot x\in M$. »
- `hb` + `n1` + `val` ⟹ `fin` par « Réunion : $\|\ell\|_{X'}=\|\ell_0\|_{M'}=1$ et $\ell(x)=\|x\|$. »

Justifications sans règle (séduisantes ou fausses) : « Prolonger $\ell_0$ par une forme linéaire quelconque sur $X$. » ; « Lemme de Zorn. » ; « C’est évident. »

Pièges :
- `x-l1` → incorrect [hahn-banach-norme-prolongement] : $|\ell_1(tx)|=|t|=\|tx\|/\|x\|$ : la norme de $\ell_1$ sur $M$ vaut $1/\|x\|$. Il faut normaliser par $\|x\|$. — Contre-exemple : Si $\|x\|=2$, alors $\|\ell_1\|_{M'}=1/2$.
- `x-prolong` → incorrect [hahn-banach-norme-prolongement] : Un prolongement linéaire quelconque peut augmenter la norme : la conservation de la norme est précisément l'apport de Hahn–Banach. — Contre-exemple : Dans $\mathbb R^2$ euclidien, pour $x=(1,0)$ et $\ell_0(t,0)=t$, la forme $L(a,b)=a+b$ prolonge $\ell_0$, et $L(1,1)=2$ avec $\|(1,1)\|=\sqrt2$ : $\|L\|_{X'}\ge\sqrt2>1$.
- `x-riesz` → incorrect [hypotheses-theoreme] : Le vecteur $x/\|x\|$ ne représente une forme que dans un espace de Hilbert : un espace de Banach n'est pas muni d'un produit scalaire en général. — Contre-exemple : Dans $C([0,1])$ muni de $\|\cdot\|_\infty$, l'identité du parallélogramme échoue pour $f=1$ et $g(s)=s$ : $\|f+g\|^2+\|f-g\|^2=5\neq 4=2\|f\|^2+2\|g\|^2$. Aucun produit scalaire n'induit cette norme.
- `hb` par « Prolonger $\ell_0$ par une forme linéaire quelconque sur $X$. » → incorrect [hahn-banach-norme-prolongement] : Un prolongement quelconque ne contrôle pas la norme : seul un prolongement fourni par Hahn–Banach vérifie $\|\ell\|_{X'}=\|\ell_0\|_{M'}$.
- `hb` par « Lemme de Zorn. » → a-justifier [justification-absente] : Le lemme de Zorn intervient dans la démonstration de Hahn–Banach, mais seul il ne fournit aucun prolongement : il faut l'énoncé complet du théorème, avec la conservation de la norme.
- `n1` par « C’est évident. » → a-justifier [justification-absente] : La norme de $\ell_0$ se calcule : utilise $|\ell_0(m)|=\|m\|$, puis le fait que $M$ n'est pas réduit à $\{0\}$.

Retraits :
- `h-x` (nécessaire) : Pour $x=0$, la droite $M$ est réduite à $\{0\}$ : $\ell_0=0$ est de norme $0$, et la construction ne fournit aucune forme de norme $1$. — Contre-exemple : Dans $X=\{0\}$, la seule forme linéaire est nulle : aucune n'est de norme $1$.

Solution :
**Construction sur une droite.** Posons $M=\mathbb R x$ et $\ell_0(tx)=t\|x\|$. Comme $x\neq 0$, l'écriture $m=tx$ est unique : $\ell_0$ est bien définie, et elle est linéaire. Pour $m=tx$ : $|\ell_0(m)|=|t|\,\|x\|=\|m\|$. Donc $\ell_0\in M'$, et $\|\ell_0\|_{M'}=1$ car $M\neq\{0\}$.

**Prolongement.** Par Hahn–Banach, il existe $\ell\in X'$ telle que $\ell|_M=\ell_0$ et $\|\ell\|_{X'}=\|\ell_0\|_{M'}=1$. En particulier $\ell(x)=\ell_0(1\cdot x)=\|x\|$.

**Remarques.** La complétude de $X$ n'est pas utilisée : le résultat vaut dans tout espace normé réel. Un prolongement linéaire quelconque de $\ell_0$ ne convient pas en général, car sa norme peut dépasser $1$.

Indices :
1. Sur quel sous-espace sait-on écrire à la main une forme qui vaut $\|x\|$ en $x$ ?
2. Définis $\ell_0$ sur la droite $\mathbb R x$, calcule sa norme, puis prolonge-la par le théorème du cours.
3. Avec $\ell_0(tx)=t\|x\|$, on a $|\ell_0(m)|=\|m\|$ sur la droite, donc $\|\ell_0\|_{M'}=1$. Hahn–Banach conserve cette norme, et le prolongement vaut $\|x\|$ en $x$.

Erreurs fréquentes :
- Prendre $\ell_0(tx)=t$, de norme $1/\|x\|$.
- Prolonger par une forme linéaire quelconque, sans contrôle de la norme.
- Utiliser un produit scalaire dans un espace de Banach général.

Variante : Soit $X$ un espace normé réel. Montrer que, pour tout $x\in X$, $\|x\|=\max\{\ell(x) : \ell\in X',\ \|\ell\|_{X'}\le 1\}$, puis que si $\ell(x)=0$ pour tout $\ell\in X'$, alors $x=0$.

Solution de la variante : Pour $\|\ell\|_{X'}\le 1$ : $\ell(x)\le\|\ell\|_{X'}\|x\|\le\|x\|$. Si $x=0$, la forme nulle réalise l'égalité. Si $x\neq 0$, l'exercice fournit $\ell$ de norme $1$ avec $\ell(x)=\|x\|$ : la borne $\|x\|$ est atteinte, c'est un maximum. Enfin, si $\ell(x)=0$ pour toute $\ell\in X'$, ce maximum est nul, donc $\|x\|=0$ et $x=0$ : le dual sépare les points.

Vérification : {"origin":"complement","review":"machine"}

## Exercice difficile `hahn-banach.difficile` : Inégalité de support pour un convexe fermé

Énoncé : Soit $X$ un espace normé réel, $C\subset X$ une partie non vide, convexe et fermée, et $x_0\notin C$. On note $d=\inf_{z\in C}\|x_0-z\|$ et, pour $L\in X'$, $\sigma_C(L)=\sup_{z\in C}L(z)\in\,]-\infty,+\infty]$. On admet la séparation d'un point et d'un convexe fermé : si $D\subset X$ est convexe, fermé, non vide, et si $y\notin D$, il existe $L\in X'$ et $\alpha\in\mathbb R$ tels que $L(w)\le\alpha<L(y)$ pour tout $w\in D$. Montrer que $d>0$ ; que pour tout $r\in\,]0,d[$ il existe $L\in X'$ avec $\|L\|_{X'}=1$ et $\sigma_C(L)+r\le L(x_0)$ (inégalité de support) ; enfin que $d=\sup_{\|L\|_{X'}\le 1}\big(L(x_0)-\sigma_C(L)\big)$.
Source : {"doc":"polycopie","pdfPage":38,"label":"Exercice 3, difficile (p. PDF 38) ; séparation évoquée en section 1.3 (p. PDF 7)"} — prérequis : projection

But : `fin` — usage : application

Nœuds :
- `h-X` (hypothese) : $X$ est un espace normé réel.
- `h-nonvide` (hypothese) : $C\neq\emptyset$.
- `h-convexe` (hypothese) : $C$ est convexe.
- `h-ferme` (hypothese) : $C$ est fermé dans $X$.
- `h-x0` (hypothese) : $x_0\notin C$.
- `d-dist` (definition) : $d=\inf_{z\in C}\|x_0-z\|$ et $\sigma_C(L)=\sup_{z\in C}L(z)$ pour $L\in X'$.
- `d-r` (definition, locale) : Soit $r$ un réel tel que $0<r<d$.
- `d-D` (definition, locale) : $D=\overline{C+B(0,r)}$ est l'adhérence dans $X$ de $C+B(0,r)$, où $B(0,r)$ est la boule ouverte de centre $0$ et de rayon $r$.
- `d-pos` (inegalite) : $d>0$.
- `D-conv` (consequence) : $D$ est convexe, fermé et non vide.
- `D-sep` (consequence) : $\|x_0-w\|\ge d-r>0$ pour tout $w\in D$ ; en particulier $x_0\notin D$.
- `sep` (application-theoreme) : Il existe $L\in X'$ et $\alpha\in\mathbb R$ tels que $L(w)\le\alpha<L(x_0)$ pour tout $w\in D$.
- `Lnn` (consequence) : $L\neq 0$.
- `nrm` (consequence) : Quitte à remplacer $(L,\alpha)$ par $(L/\|L\|_{X'},\alpha/\|L\|_{X'})$, on peut supposer $\|L\|_{X'}=1$.
- `sup-ball` (egalite) : $\sup_{u\in B(0,r)}L(u)=r\,\|L\|_{X'}=r$.
- `ineg-z` (inegalite) : Pour tout $z\in C$ : $L(z)+r\le\alpha<L(x_0)$.
- `sigma` (inegalite) : $\sigma_C(L)+r\le\alpha<L(x_0)$ ; en particulier $\sigma_C(L)<+\infty$.
- `support` (consequence) : Pour tout $r\in\,]0,d[$, il existe $L\in X'$ avec $\|L\|_{X'}=1$ et $\sigma_C(L)+r\le L(x_0)$.
- `maj` (inegalite) : Pour tout $L\in X'$ tel que $\|L\|_{X'}\le 1$ : $L(x_0)-\sigma_C(L)\le d$.
- `dual` (egalite) : $d=\sup_{\|L\|_{X'}\le 1}\big(L(x_0)-\sigma_C(L)\big)$.
- `fin` (conclusion) : $d>0$, l'inégalité de support est établie pour tout $r\in\,]0,d[$, et la distance $d$ s'exprime par dualité.
- `x-somme-fermee` (consequence, DISTRACTEUR) : $C+B(0,r)$ est fermé dans $X$.
- `x-sans-norme` (inegalite, DISTRACTEUR) : Sans normaliser $L$, on a déjà $L(z)+r\le\alpha$ pour tout $z\in C$.
- `x-sep-directe` (inegalite, DISTRACTEUR) : Toute séparation $L(z)\le\alpha<L(x_0)$ de $x_0$ et de $C$, avec $\|L\|_{X'}=1$, vérifie $L(z)+r\le\alpha$ pour tout $z\in C$.

Règles :
- `h-ferme` + `h-x0` + `d-dist` ⟹ `d-pos` par « Si $d=0$, une suite de points de $C$ converge vers $x_0$ ; $C$ étant fermé, on aurait $x_0\in C$. »
- `h-nonvide` + `h-convexe` + `d-D` ⟹ `D-conv` par « $C+B(0,r)$ est convexe comme somme de deux convexes, et non vide ; l'adhérence d'un convexe est convexe. »
- `d-D` + `d-r` + `d-dist` ⟹ `D-sep` par « Pour $w=z+u$ avec $z\in C$ et $\|u\|<r$ : $\|x_0-w\|\ge\|x_0-z\|-\|u\|\ge d-r$ ; cette inégalité large passe à l'adhérence. »
- `h-X` + `D-conv` + `D-sep` ⟹ `sep` par « Séparation d’un point et d’un convexe fermé non vide (forme géométrique de Hahn–Banach, admise). [hahn-banach] »
- `sep` + `D-conv` ⟹ `Lnn` par « Si $L=0$, l'inégalité $L(w)\le\alpha<L(x_0)$ en un point $w\in D$ donnerait $0\le\alpha<0$. »
- `sep` + `Lnn` ⟹ `nrm` par « Diviser par le réel strictement positif $\|L\|_{X'}$ conserve les inégalités. »
- `nrm` ⟹ `sup-ball` par « Définition de $\|L\|_{X'}$ comme borne supérieure, et homogénéité : $\sup_{\|u\|<r}L(u)=r\sup_{\|v\|<1}L(v)$. »
- `sep` + `nrm` + `sup-ball` + `d-D` ⟹ `ineg-z` par « Pour $z\in C$ et $u\in B(0,r)$, $z+u\in D$, donc $L(z)+L(u)\le\alpha$ ; passer à la borne supérieure en $u$. »
- `ineg-z` + `d-dist` ⟹ `sigma` par « Passer à la borne supérieure en $z\in C$. »
- `sigma` + `nrm` + `d-r` ⟹ `support` par « Le réel $r\in\,]0,d[$ était quelconque. »
- `d-dist` + `h-nonvide` ⟹ `maj` par « Pour $z\in C$ : $L(x_0)-\sigma_C(L)\le L(x_0-z)\le\|L\|_{X'}\|x_0-z\|\le\|x_0-z\|$ ; passer à la borne inférieure en $z$. »
- `support` + `maj` + `d-pos` ⟹ `dual` par « La borne supérieure est au plus $d$, et au moins $r$ pour tout $r\in\,]0,d[$ ; cet intervalle est non vide car $d>0$. »
- `d-pos` + `support` + `dual` ⟹ `fin` par « Réunion des trois résultats. »

Justifications sans règle (séduisantes ou fausses) : « Projeter $x_0$ sur $C$ et prendre $L=\langle\cdot,x_0-P_Cx_0\rangle$. » ; « Le supremum de $L$ sur $B(0,r)$ est atteint en un point $u_0\in B(0,r)$. » ; « Une somme de deux fermés est fermée. » ; « C’est évident. »

Pièges :
- `x-somme-fermee` → incorrect [fermeture-espace] : $C+B(0,r)$ est une réunion de boules ouvertes, donc un ouvert, en général non fermé : c'est pourquoi on passe à l'adhérence $D$. — Contre-exemple : $X=\mathbb R$, $C=\{0\}$, $r=1$ : $C+B(0,1)=\,]-1,1[$ n'est pas fermé.
- `x-sans-norme` → incorrect [hahn-banach-support] : $\sup_{u\in B(0,r)}L(u)$ vaut $r\|L\|_{X'}$, et non $r$ : sans normalisation, la marge obtenue est $r\|L\|_{X'}$. — Contre-exemple : $X=\mathbb R$, $C=\,]-\infty,0]$, $x_0=2$, $r=1$, $D=\,]-\infty,1]$, $L(x)=x/2$, $\alpha=3/4$ : $L(w)\le\alpha<L(x_0)$ sur $D$, mais $L(0)+r=1>\alpha$.
- `x-sep-directe` → incorrect [hahn-banach-support] : Une séparation de $x_0$ et de $C$ ne contrôle pas l'écart entre $\alpha$ et $\sup_CL$ : c'est l'élargissement de $C$ en $D$ qui fournit la marge $r$. — Contre-exemple : $X=\mathbb R$, $C=\,]-\infty,0]$, $x_0=1$, $d=1$, $r=1/2$, $L(x)=x$, $\alpha=1/4$ : $L(z)\le\alpha<L(x_0)$ sur $C$, mais $L(0)+r=1/2>\alpha$.
- `sep` par « Projeter $x_0$ sur $C$ et prendre $L=\langle\cdot,x_0-P_Cx_0\rangle$. » → incorrect [hypotheses-theoreme] : La projection sur un convexe fermé est un résultat hilbertien. Dans un espace normé général, le point le plus proche peut ne pas exister ou ne pas être unique : il faut invoquer la séparation. — Contre-exemple : Dans $\mathbb R^2$ muni de $\|(a,b)\|_\infty=\max(|a|,|b|)$, tous les points $(1,b)$ avec $|b|\le 1$ de la droite fermée $\{a=1\}$ sont à distance $1$ de $(0,0)$.
- `sup-ball` par « Le supremum de $L$ sur $B(0,r)$ est atteint en un point $u_0\in B(0,r)$. » → incorrect [hahn-banach-support] : Le calcul n'exige aucun point où le supremum est atteint : seule compte la définition de la norme duale comme borne supérieure. Sur une boule ouverte, le supremum d'une forme non nulle n'est d'ailleurs jamais atteint. — Contre-exemple : Si $\|u\|<r$ et $\|L\|_{X'}=1$, alors $L(u)\le\|u\|<r$.
- `D-conv` par « Une somme de deux fermés est fermée. » → incorrect [fermeture-espace] : Une somme de deux fermés n'est pas fermée en général, et $B(0,r)$ n'est pas fermée : $D$ est fermé parce que c'est une adhérence. — Contre-exemple : Dans $\mathbb R^2$, $\{(a,b) : a>0,\ ab\ge 1\}$ et $\mathbb R\times\{0\}$ sont fermés, mais leur somme $\mathbb R\times\,]0,+\infty[$ ne l'est pas.
- `d-pos` par « C’est évident. » → a-justifier [justification-absente] : $d>0$ se démontre : c'est exactement là que sert la fermeture de $C$.

Retraits :
- `h-ferme` (nécessaire) : Sans fermeture, $x_0$ peut être adhérent à $C$ sans lui appartenir : alors $d=0$, et aucune forme ne sépare strictement $x_0$ de $C$. — Contre-exemple : Dans $X=\mathbb R$, $C=\,]0,1]$ et $x_0=0\notin C$ : pour toute forme $L(x)=\lambda x$, on a $\sigma_C(L)\ge 0=L(x_0)$. Aucune inégalité stricte n'est possible.
- `h-convexe` (nécessaire) : Sans convexité, le théorème de séparation ne s’applique plus. — Contre-exemple : Dans $X=\mathbb R$, $C=\{-1,1\}$ et $x_0=0$ : $C$ est fermé, $x_0\notin C$ et $d=1$, mais pour toute forme $L(x)=\lambda x$, $\sigma_C(L)=|\lambda|\ge 0=L(x_0)$.

Calculs fermés : [{"kind":"rational","prompt":"Dans $X=\\mathbb R^2$ muni de $\\|(a,b)\\|_\\infty=\\max(|a|,|b|)$, avec $C=\\{(a,b) : a\\le 0\\}$ et $x_0=(1,1)$ : valeur de $d$","expected":"1"}]

Solution :
**Écart strictement positif.** Si $d=0$, il existe $z_n\in C$ avec $z_n\to x_0$ ; $C$ étant fermé, $x_0\in C$, ce qui est exclu. Donc $d>0$.

**Élargissement.** Fixons $r\in\,]0,d[$ et $D=\overline{C+B(0,r)}$. L'ensemble $C+B(0,r)$ est convexe, non vide ; son adhérence $D$ est convexe, fermée, non vide. Pour $w=z+u$ avec $z\in C$ et $\|u\|<r$ : $\|x_0-w\|\ge\|x_0-z\|-\|u\|\ge d-r$, et cette inégalité large passe à l'adhérence. Donc $x_0\notin D$.

**Séparation et normalisation.** La séparation fournit $L\in X'$ et $\alpha$ avec $L(w)\le\alpha<L(x_0)$ pour tout $w\in D$. On a $L\neq 0$, sinon $0\le\alpha<0$ ; on divise par $\|L\|_{X'}$ pour obtenir $\|L\|_{X'}=1$.

**Inégalité de support.** Pour $z\in C$ et $u\in B(0,r)$, $z+u\in D$, donc $L(z)+L(u)\le\alpha$. Or $\sup_{\|u\|<r}L(u)=r\|L\|_{X'}=r$. Donc $L(z)+r\le\alpha$ pour tout $z\in C$, puis $\sigma_C(L)+r\le\alpha<L(x_0)$.

**Dualité.** Pour $\|L\|_{X'}\le 1$ et $z\in C$ : $L(x_0)-\sigma_C(L)\le L(x_0-z)\le\|x_0-z\|$ ; en passant à la borne inférieure, $L(x_0)-\sigma_C(L)\le d$. Réciproquement, la borne supérieure est au moins $r$ pour tout $r\in\,]0,d[$, donc au moins $d$. D'où $d=\sup_{\|L\|_{X'}\le 1}\big(L(x_0)-\sigma_C(L)\big)$.

**Remarques.** Cette borne supérieure est en fait atteinte, par compacité faible-* de la boule unité de $X'$ ; ce n'est pas demandé ici. Dans un espace de Hilbert, la projection fournit directement une forme optimale (voir la variante).

Indices :
1. Où sert la fermeture de $C$ ? Commence par montrer que $x_0$ est à distance strictement positive de $C$.
2. Pour obtenir une marge $r$, sépare $x_0$ non pas de $C$, mais d'un convexe fermé plus gros, qui contient tous les $z+u$ avec $z\in C$ et $\|u\|<r$.
3. Après séparation de $x_0$ et de $D=\overline{C+B(0,r)}$, normalise $L$, puis passe à la borne supérieure en $u\in B(0,r)$ dans $L(z)+L(u)\le\alpha$ : elle vaut $r$. L'autre inégalité de la formule de dualité vient de $L(x_0-z)\le\|x_0-z\|$.

Erreurs fréquentes :
- Croire que $C+B(0,r)$ est fermé.
- Oublier de normaliser $L$ : la marge obtenue est alors $r\|L\|_{X'}$.
- Utiliser une projection dans un espace normé non hilbertien.

Variante : Soit $H$ un espace de Hilbert réel, $C\subset H$ non vide, convexe et fermé, $x_0\notin C$ et $p=P_Cx_0$. Construire explicitement $L\in H'$ de norme $1$ telle que $\sigma_C(L)+\|x_0-p\|=L(x_0)$. Dans ce cadre, la marge de l'inégalité de support atteint donc la distance $\|x_0-p\|=\inf_{z\in C}\|x_0-z\|$.

Solution de la variante : Le théorème de projection donne $p\in C$, $\|x_0-p\|=\inf_{z\in C}\|x_0-z\|$ et $\langle x_0-p,z-p\rangle\le 0$ pour tout $z\in C$. Comme $x_0\notin C$ et $p\in C$, $d=\|x_0-p\|>0$. On pose $n=(x_0-p)/d$ et $L=\langle\cdot,n\rangle$ : $\|L\|_{H'}=\|n\|=1$. L'inégalité caractéristique, divisée par $d>0$, donne $L(z)\le L(p)$ pour tout $z\in C$ ; comme $p\in C$, $\sigma_C(L)=L(p)$. Enfin $L(x_0)-L(p)=\langle x_0-p,n\rangle=d$. Donc $\sigma_C(L)+d=L(x_0)$ : dans un Hilbert, la borne supérieure de la formule de dualité est atteinte, sans recours à Hahn–Banach.

Graphe de la variante :
But : `fin` — usage : application

Nœuds :
- `h-H` (hypothese) : $H$ est un espace de Hilbert réel.
- `h-C` (hypothese) : $C\subset H$ est non vide, convexe et fermé.
- `h-x0` (hypothese) : $x_0\notin C$.
- `proj` (application-theoreme) : $p=P_Cx_0$ existe : $p\in C$, $\|x_0-p\|=\inf_{z\in C}\|x_0-z\|$ et $\langle x_0-p,z-p\rangle\le 0$ pour tout $z\in C$.
- `d-pos` (inegalite) : $d=\|x_0-p\|>0$.
- `d-n` (definition, locale) : On pose $n=(x_0-p)/\|x_0-p\|$ et $L=\langle\cdot,n\rangle$.
- `L-norme` (egalite) : $L\in H'$ et $\|L\|_{H'}=1$.
- `Lz` (inegalite) : Pour tout $z\in C$ : $L(z)\le L(p)$.
- `sigma` (egalite) : $\sigma_C(L)=L(p)$.
- `Lx0` (egalite) : $L(x_0)-L(p)=\|x_0-p\|$.
- `fin` (conclusion) : $\|L\|_{H'}=1$ et $\sigma_C(L)+\|x_0-p\|=L(x_0)$, avec $\|x_0-p\|=\inf_{z\in C}\|x_0-z\|$.
- `x-strict` (inegalite, DISTRACTEUR) : Pour tout $z\in C$ : $L(z)<L(p)$.
- `x-non-norme` (egalite, DISTRACTEUR) : La forme $\langle\cdot,x_0-p\rangle$ est de norme $1$.

Règles :
- `h-H` + `h-C` ⟹ `proj` par « Théorème de projection sur un convexe fermé non vide, et caractérisation variationnelle. [projection] »
- `proj` + `h-x0` ⟹ `d-pos` par « $p\in C$ et $x_0\notin C$, donc $x_0\neq p$. »
- `d-n` + `d-pos` ⟹ `L-norme` par « Cauchy–Schwarz pour la majoration, et le test en $v=n$ pour l'égalité. [cauchy-schwarz] »
- `proj` + `d-n` + `d-pos` ⟹ `Lz` par « Diviser l'inégalité caractéristique par le réel strictement positif $\|x_0-p\|$. »
- `Lz` + `proj` ⟹ `sigma` par « $L$ est majorée par $L(p)$ sur $C$, et $p\in C$ : la borne supérieure est atteinte en $p$. »
- `d-n` + `d-pos` ⟹ `Lx0` par « $\langle x_0-p,(x_0-p)/\|x_0-p\|\rangle=\|x_0-p\|$. »
- `L-norme` + `sigma` + `Lx0` + `proj` ⟹ `fin` par « Réunion des résultats. »

Justifications sans règle (séduisantes ou fausses) : « Théorème de Hahn–Banach. »

Pièges :
- `x-strict` → incorrect [hahn-banach-support] : En $z=p\in C$, il y a égalité : l'inégalité est large. — Contre-exemple : $z=p$ donne $L(z)=L(p)$.
- `x-non-norme` → incorrect [hahn-banach-support] : La norme de $\langle\cdot,x_0-p\rangle$ vaut $\|x_0-p\|$ : elle n'est égale à $1$ que si la distance vaut $1$. Il faut normaliser. — Contre-exemple : $H=\mathbb R$, $C=\,]-\infty,0]$, $x_0=2$ : $p=0$, et la forme $v\mapsto 2v$ est de norme $2$.
- `Lz` par « Théorème de Hahn–Banach. » → incorrect [hahn-banach-support] : Hahn–Banach fournit l'existence d'une forme séparante, mais ne dit rien de cette forme précise : ici, c'est l'inégalité caractéristique de la projection qui donne $L(z)\le L(p)$.

Retraits :
- `h-x0` (nécessaire) : Si $x_0\in C$, alors $p=x_0$ : la distance est nulle et $n$ n'est pas défini. — Contre-exemple : Pour $x_0\in C$, on a $\sigma_C(L)\ge L(x_0)$ pour toute $L\in H'$ : aucune marge strictement positive n'est possible.

Vérification : {"origin":"complement","review":"machine","notes":"Le polycopié n’énonce pas la séparation d’un point et d’un convexe fermé (section 1.3 : forme « prolongement » seulement) ; elle est admise dans l’énoncé de l’exercice."}