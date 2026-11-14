# 2. Représentation de Riesz (`riesz`) — polycopié p. PDF 6, section 1.2

## Fiche

Espaces : $H$ : espace de Hilbert réel, de produit scalaire $\langle\cdot,\cdot\rangle_H$ et de norme associée $\|\cdot\|_H$. | $H'$ : dual de $H$, espace des formes linéaires continues sur $H$, muni de la norme $\|\ell\|_{H'}=\sup_{\|v\|_H\le 1}|\ell(v)|$.

Hypothèses :
- $H$ est un espace de Hilbert réel : la norme issue du produit scalaire le rend complet. — Sans elle : Sur $E=C([-1,1])$ muni du produit scalaire de $L^2$, la forme $\ell(u)=\int_0^1u$ est continue. Si $w\in E$ la représentait, tester contre les $u$ à support dans $]-1,0[$, puis dans $]0,1[$, imposerait $w=0$ sur $[-1,0]$ et $w=1$ sur $[0,1]$ : impossible pour $w$ continue.
- $\ell\in H'$ : $\ell$ est linéaire et continue sur $H$. — Sans elle : Une forme représentée vérifie automatiquement $|\ell(v)|=|\langle v,w\rangle|\le\|w\|\,\|v\|$ : une forme linéaire discontinue ne peut donc pas être représentée.

Énoncé : Pour tout $\ell\in H'$, il existe un unique $w\in H$ tel que
$$\ell(v)=\langle v,w\rangle_H\quad\forall v\in H,\qquad \|\ell\|_{H'}=\|w\|_H.$$

Bilan : {"existence":"Si $\\ell\\neq 0$, on choisit $z\\in(\\ker\\ell)^\\perp\\setminus\\{0\\}$ et $w=\\ell(z)\\,z/\\|z\\|_H^2$ convient.","unicite":"Deux représentants vérifient $\\langle v,w_1-w_2\\rangle=0$ pour tout $v\\in H$.","stabilite":"L'application $\\ell\\mapsto w$ est isométrique : $\\|\\ell\\|_{H'}=\\|w\\|_H$."}

Preuve dans le polycopié : complete

Plan :
1. Si $\ell=0$, prendre $w=0$.
2. Sinon, $F=\ker\ell$ est un sous-espace fermé strict de $H$.
3. Par projection orthogonale, choisir $z\in F^\perp\setminus\{0\}$ ; alors $z\notin F$, donc $\ell(z)\neq 0$.
4. Pour tout $v\in H$, le vecteur $v-\tfrac{\ell(v)}{\ell(z)}z$ appartient à $F$ : son produit scalaire avec $z$ est nul.
5. On en déduit $\ell(v)=\tfrac{\ell(z)}{\|z\|^2}\langle v,z\rangle$, donc $w=\ell(z)z/\|z\|^2$ (cas réel).
6. Unicité : $\langle v,w_1-w_2\rangle=0$ pour tout $v\in H$, puis tester en $v=w_1-w_2$.
7. Norme : Cauchy–Schwarz donne $\|\ell\|_{H'}\le\|w\|_H$, et le choix $v=w/\|w\|_H$ (si $w\neq 0$) donne l'inégalité inverse.

Vigilance :
- Le représentant dépend du produit scalaire : deux produits scalaires équivalents sur le même espace donnent en général deux représentants différents.
- Le théorème ne dit rien des formes non continues, et la complétude de $H$ est indispensable.
- $\|\ell\|_{H'}=\|w\|_H$ est une identité pour la norme hilbertienne : pour une autre norme, la norme duale change.

Vérification : {"origin":"polycopie","review":"machine"}

Définition « Dual topologique » : Si $E$ est un espace normé réel, $E'$ désigne l'espace des formes linéaires continues $\ell:E\to\mathbb R$, muni de la norme $\|\ell\|_{E'}=\sup\{|\ell(v)| : \|v\|_E\le 1\}$.

Définition « Représentant de Riesz » : Le représentant de $\ell\in H'$ est l'unique vecteur $w\in H$ tel que $\ell(v)=\langle v,w\rangle_H$ pour tout $v\in H$.

Définition « Orthogonal d’une partie » : Pour une partie $F$ de l'espace de Hilbert $H$, $F^\perp=\{x\in H : \langle x,y\rangle_H=0\ \text{pour tout}\ y\in F\}$.

## Contre-exemple `ce-riesz-complet` : Espace préhilbertien non complet
Assertion : Toute forme linéaire continue sur un espace préhilbertien est représentée par un vecteur de cet espace.
Tâche : Soit $E=C([-1,1])$, muni du produit scalaire de $L^2(]-1,1[)$, et $\ell(u)=\int_0^1u$. Calcule la norme de $\ell$ dans le dual de $E$ : cette valeur n'est atteinte par aucune fonction de $E$, et $\ell$ n'a pas de représentant dans $E$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\|\\ell\\|_{E'}$","expected":"1"}
Explication : Pour $u\in E$ : $\ell(u)=\int_{-1}^1u\,\mathbb 1_{]0,1[}\le\|u\|_{L^2}$. Si $u_n=1$ sur $[0,1]$, $u_n=0$ sur $[-1,-1/n]$ et affine entre les deux, alors $\ell(u_n)=1$ et $\|u_n\|_{L^2}\to 1$ : donc $\|\ell\|_{E'}=1$. Si $w\in E$ représentait $\ell$, tester contre les $u$ à support dans $]-1,0[$ imposerait $w=0$ sur $[-1,0]$, et contre ceux à support dans $]0,1[$ imposerait $w=1$ sur $[0,1]$ : impossible pour une fonction continue en $0$.

## Contre-exemple `ce-riesz-ps` : Le représentant dépend du produit scalaire
Assertion : Le représentant de Riesz d'une forme linéaire sur $\mathbb R^2$ ne dépend que de cette forme.
Tâche : Sur $\mathbb R^2$ muni de $\langle u,v\rangle_A=2u_1v_1+u_2v_2$, calcule le représentant de $\ell(x,y)=3x-2y$. Il diffère du représentant euclidien $(3,-2)$.
Vérification : {"kind":"rational-vector","prompt":"Coordonnées du représentant pour $\\langle\\cdot,\\cdot\\rangle_A$","expected":["3/2","-2"],"labels":["w₁","w₂"]}
Explication : Pour $w=(w_1,w_2)$ : $\langle e_1,w\rangle_A=2w_1$ et $\langle e_2,w\rangle_A=w_2$. L'identité $\ell=\langle\cdot,w\rangle_A$ donne $w_1=\ell(e_1)/2=3/2$ et $w_2=\ell(e_2)=-2$.

## Contre-exemple `ce-riesz-sup` : Norme non hilbertienne
Assertion : Sur $\mathbb R^2$ muni de $\|(x,y)\|_\infty=\max(|x|,|y|)$, la forme $\ell(x,y)=3x-2y$ vérifie $\|\ell\|=\|(3,-2)\|_\infty$.
Tâche : Calcule la norme de $\ell(x,y)=3x-2y$ pour la norme $\|\cdot\|_\infty$ sur $\mathbb R^2$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\|\\ell\\|$ pour $\\|\\cdot\\|_\\infty$","expected":"5"}
Explication : Pour $\max(|x|,|y|)\le 1$ : $|3x-2y|\le 3|x|+2|y|\le 5$, avec égalité en $(x,y)=(1,-1)$. Donc $\|\ell\|=5$, alors que $\|(3,-2)\|_\infty=3$.

## Exercice facile `riesz.facile` : Représentant d'une forme linéaire sur $\mathbb R^2$

Énoncé : Dans $H=\mathbb R^2$, muni du produit scalaire euclidien $\langle(x,y),(x',y')\rangle=xx'+yy'$, on considère la forme $\ell(x,y)=3x-2y$. Déterminer le représentant de Riesz $w$ de $\ell$, puis calculer $\|\ell\|_{H'}$.
Source : {"doc":"polycopie","pdfPage":38,"label":"Exercice 2, facile (p. PDF 38)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-H` (hypothese) : $H=\mathbb R^2$, muni de $\langle(x,y),(x',y')\rangle=xx'+yy'$, est un espace de Hilbert réel.
- `d-ell` (definition) : $\ell(x,y)=3x-2y$ pour tout $(x,y)\in\mathbb R^2$.
- `lin` (consequence) : $\ell$ est linéaire sur $\mathbb R^2$.
- `borne` (inegalite) : Il existe $C>0$ tel que $|\ell(x,y)|\le C\,\|(x,y)\|$ pour tout $(x,y)\in\mathbb R^2$.
- `cont` (consequence) : $\ell\in H'$.
- `thm` (application-theoreme) : Il existe un unique $w\in\mathbb R^2$ tel que $\ell(v)=\langle v,w\rangle$ pour tout $v\in\mathbb R^2$, et $\|\ell\|_{H'}=\|w\|$.
- `b-e1` (egalite) : $w_1=\langle e_1,w\rangle=\ell(e_1)$, où $e_1=(1,0)$.
- `b-e2` (egalite) : $w_2=\langle e_2,w\rangle=\ell(e_2)$, où $e_2=(0,1)$.
- `k-F` (egalite) : $F=\ker\ell$ est la droite engendrée par $(2,3)$.
- `k-z` (consequence) : Le vecteur $z=(6,-4)$ est non nul et orthogonal à $F$.
- `val` (egalite, calcul rational-vector) : $w=(3,-2)$.
  - valeur attendue : ["3","-2"]
- `norme` (egalite, calcul rational) : $\|\ell\|_{H'}^2=13$.
  - valeur attendue : "13"
- `fin` (conclusion) : Le représentant de $\ell$ est déterminé et sa norme dans $H'$ est calculée.
- `x-signe` (egalite, DISTRACTEUR) : $w=(3,2)$.
- `x-somme` (egalite, DISTRACTEUR) : $\|\ell\|_{H'}=5$.

Règles :
- `d-ell` ⟹ `lin` par « Vérification directe : $\ell\big(\lambda(x,y)+\mu(x',y')\big)=\lambda\ell(x,y)+\mu\ell(x',y')$. »
- `d-ell` ⟹ `borne` par « Inégalité de Cauchy–Schwarz dans $\mathbb R^2$, appliquée aux coefficients de $\ell$. [cauchy-schwarz] »
- `lin` + `borne` ⟹ `cont` par « Une forme linéaire vérifiant une majoration $|\ell(v)|\le C\|v\|$ est continue. »
- `h-H` + `cont` ⟹ `thm` par « Théorème de représentation de Riesz. [riesz] »
- `thm` ⟹ `b-e1` par « Spécialiser la représentation en $v=e_1$. » (chemin base)
- `thm` ⟹ `b-e2` par « Spécialiser la représentation en $v=e_2$. » (chemin base)
- `b-e1` + `b-e2` + `d-ell` ⟹ `val` par « Évaluer $\ell$ en $e_1$ et $e_2$ : un vecteur de $\mathbb R^2$ est déterminé par ses deux coordonnées. » (chemin base)
- `d-ell` ⟹ `k-F` par « Résolution de l'équation $3x-2y=0$. » (chemin noyau)
- `k-F` ⟹ `k-z` par « Le produit scalaire avec le générateur de $F$ est nul, et le vecteur n'est pas le vecteur nul. » (chemin noyau)
- `h-H` + `k-z` + `d-ell` ⟹ `val` par « Formule de la démonstration du théorème : $w=\ell(z)\,z/\|z\|^2$ pour $z\in F^\perp\setminus\{0\}$. » (chemin noyau)
- `thm` + `val` ⟹ `norme` par « Isométrie de Riesz : $\|\ell\|_{H'}=\|w\|$, puis calcul de $\|w\|^2$. »
- `val` + `norme` ⟹ `fin` par « Réunion des résultats obtenus. »

Justifications sans règle (séduisantes ou fausses) : « Un seul test suffit : $\ell(1,1)=1$ détermine $w$. » ; « La norme d’une forme linéaire est la somme des valeurs absolues de ses coefficients. » ; « C’est évident. »

Pièges :
- `x-signe` → incorrect [riesz-produit-scalaire] : La coordonnée $w_2$ s'obtient en testant la représentation en $e_2$ : elle vaut $\ell(e_2)=-2$. Le vecteur $(3,2)$ ne représente pas $\ell$. — Contre-exemple : $\langle(0,1),(3,2)\rangle=2$, alors que $\ell(0,1)=-2$.
- `x-somme` → incorrect [riesz-norme-duale] : $5$ est la somme des valeurs absolues des coefficients : c'est la norme de $\ell$ pour la norme $\|\cdot\|_\infty$ de $\mathbb R^2$. Pour la norme euclidienne, $\|\ell\|_{H'}=\|w\|$. — Contre-exemple : Par Cauchy–Schwarz, $|\ell(x,y)|\le\sqrt{13}\,\|(x,y)\|$ : aucun vecteur de norme $1$ ne donne $|\ell(v)|=5$.
- `val` par « Un seul test suffit : $\ell(1,1)=1$ détermine $w$. » → incorrect [riesz-produit-scalaire] : Une égalité scalaire unique ne détermine pas un vecteur de $\mathbb R^2$. Il faut tester sur une base, ou passer par le noyau. — Contre-exemple : $\langle(1,1),(1,0)\rangle=1=\ell(1,1)$, mais $(1,0)$ ne représente pas $\ell$ : $\langle(0,1),(1,0)\rangle=0\neq\ell(0,1)=-2$.
- `norme` par « La norme d’une forme linéaire est la somme des valeurs absolues de ses coefficients. » → incorrect [riesz-norme-duale] : La norme d'une forme dépend de la norme choisie sur l'espace : pour la norme euclidienne, ce n'est pas la somme des valeurs absolues des coefficients.
- `cont` par « C’est évident. » → a-justifier [justification-absente] : Écrire la majoration : la continuité d'une forme linéaire se vérifie sur une constante $C$ telle que $|\ell(v)|\le C\|v\|$.

Retraits :
- `h-H` (nécessaire) : Le représentant est défini par $\ell(v)=\langle v,w\rangle_H$ : il dépend du produit scalaire fixé sur l'espace. — Contre-exemple : Avec $\langle u,v\rangle_A=2u_1v_1+u_2v_2$, le représentant de $\ell$ est $(3/2,-2)$, et non $(3,-2)$.

Calculs fermés : [{"kind":"rational","prompt":"Valeur de $\\|\\ell\\|_{H'}^2$","expected":"13"}]

Solution :
**Continuité.** La forme $\ell$ est linéaire et, par Cauchy–Schwarz, $|\ell(x,y)|=|\langle(x,y),(3,-2)\rangle|\le\sqrt{13}\,\|(x,y)\|$. Donc $\ell\in H'$.

**Représentant.** Par le théorème de Riesz, il existe un unique $w\in\mathbb R^2$ tel que $\ell(v)=\langle v,w\rangle$ pour tout $v$. En testant en $e_1=(1,0)$ et $e_2=(0,1)$ : $w_1=\ell(e_1)=3$ et $w_2=\ell(e_2)=-2$. Donc $w=(3,-2)$.

**Autre voie, celle de la démonstration du théorème.** $F=\ker\ell$ est la droite engendrée par $(2,3)$. Le vecteur $z=(6,-4)$ est non nul et orthogonal à $F$, avec $\ell(z)=26$ et $\|z\|^2=52$, d'où $w=\ell(z)z/\|z\|^2=(3,-2)$.

**Norme.** $\|\ell\|_{H'}=\|w\|$, donc $\|\ell\|_{H'}^2=3^2+(-2)^2=13$, soit $\|\ell\|_{H'}=\sqrt{13}$.

Indices :
1. Que demande le théorème de Riesz pour produire un représentant ? Vérifie d'abord ces hypothèses.
2. Une fois $w$ donné par le théorème, teste la relation $\ell(v)=\langle v,w\rangle$ sur deux vecteurs bien choisis ; on peut aussi suivre la construction par le noyau de la démonstration.
3. Avec $v=e_1$ puis $v=e_2$, on lit les coordonnées de $w$ sur les valeurs de $\ell$. Pour la norme, l'isométrie de Riesz ramène à la norme euclidienne de $w$.

Erreurs fréquentes :
- Oublier le signe de la seconde coordonnée en lisant $w$ sur les coefficients de $\ell$.
- Confondre la norme euclidienne de $w$ avec la somme des valeurs absolues de ses coordonnées.
- Croire qu'un seul test $\ell(v_0)=\langle v_0,w\rangle$ suffit à déterminer $w$.

Variante : Dans $\mathbb R^2$ muni du produit scalaire $\langle u,v\rangle_A=2u_1v_1+u_2v_2$, on considère encore $\ell(x,y)=3x-2y$. Déterminer le représentant de Riesz de $\ell$ pour ce produit scalaire, ainsi que la norme de $\ell$ dans le dual.

Solution de la variante : Le produit scalaire $\langle\cdot,\cdot\rangle_A$ munit $\mathbb R^2$ d'une structure hilbertienne, et $\ell$ y est continue (dimension finie). Si $w=(w_1,w_2)$ est le représentant, $\langle e_1,w\rangle_A=2w_1=\ell(e_1)=3$ et $\langle e_2,w\rangle_A=w_2=\ell(e_2)=-2$, donc $w=(3/2,-2)$. Vérification : $\langle(x,y),w\rangle_A=3x-2y$. L'isométrie de Riesz donne $\|\ell\|^2=\|w\|_A^2=2\cdot\tfrac94+4=\tfrac{17}{2}$. Le représentant diffère du représentant euclidien $(3,-2)$ : il dépend du produit scalaire.

Graphe de la variante :
But : `fin` — usage : application

Nœuds :
- `h-H` (hypothese) : $H=\mathbb R^2$, muni de $\langle u,v\rangle_A=2u_1v_1+u_2v_2$, est un espace de Hilbert réel.
- `d-ell` (definition) : $\ell(x,y)=3x-2y$ pour tout $(x,y)\in\mathbb R^2$.
- `cont` (consequence) : $\ell$ est une forme linéaire continue sur $H$.
- `thm` (application-theoreme) : Il existe un unique $w\in H$ tel que $\ell(v)=\langle v,w\rangle_A$ pour tout $v\in H$, et $\|\ell\|_{H'}=\|w\|_A$.
- `c1` (egalite) : $\ell(e_1)=\langle e_1,w\rangle_A=2w_1$.
- `c2` (egalite) : $\ell(e_2)=\langle e_2,w\rangle_A=w_2$.
- `val` (egalite, calcul rational-vector) : $w=(3/2,-2)$.
  - valeur attendue : ["3/2","-2"]
- `norme` (egalite, calcul rational) : $\|\ell\|_{H'}^2=\|w\|_A^2=17/2$.
  - valeur attendue : "17/2"
- `fin` (conclusion) : Le représentant de $\ell$ pour $\langle\cdot,\cdot\rangle_A$ et sa norme sont déterminés.
- `x-eucl` (egalite, DISTRACTEUR) : $w=(3,-2)$ : le représentant est le même que pour le produit scalaire euclidien.
- `x-norme` (egalite, DISTRACTEUR) : $\|\ell\|_{H'}^2=13$.

Règles :
- `d-ell` ⟹ `cont` par « Toute forme linéaire sur $\mathbb R^2$ est continue pour toute norme : on peut aussi majorer directement $|3x-2y|$. »
- `h-H` + `cont` ⟹ `thm` par « Théorème de représentation de Riesz. [riesz] »
- `thm` ⟹ `c1` par « Spécialiser la représentation en $v=e_1$ et développer $\langle\cdot,\cdot\rangle_A$. »
- `thm` ⟹ `c2` par « Spécialiser la représentation en $v=e_2$ et développer $\langle\cdot,\cdot\rangle_A$. »
- `c1` + `c2` + `d-ell` ⟹ `val` par « Résoudre les deux égalités après calcul de $\ell(e_1)$ et $\ell(e_2)$. »
- `thm` + `val` ⟹ `norme` par « Isométrie de Riesz : $\|\ell\|_{H'}=\|w\|_A$, puis calcul de $\|w\|_A^2$. »
- `val` + `norme` ⟹ `fin` par « Réunion des résultats obtenus. »

Justifications sans règle (séduisantes ou fausses) : « Le produit scalaire ne change rien : on lit $w$ sur les coefficients de $\ell$. »

Pièges :
- `x-eucl` → incorrect [riesz-produit-scalaire] : Le représentant dépend du produit scalaire : ici $\langle e_1,w\rangle_A=2w_1$, ce qui donne une autre première coordonnée. — Contre-exemple : $\langle(1,0),(3,-2)\rangle_A=6$, alors que $\ell(1,0)=3$.
- `x-norme` → incorrect [riesz-norme-duale] : $13$ est le carré de la norme euclidienne de $(3,-2)$. Il faut calculer $\|w\|_A^2$ pour le représentant associé à $\langle\cdot,\cdot\rangle_A$.
- `val` par « Le produit scalaire ne change rien : on lit $w$ sur les coefficients de $\ell$. » → incorrect [riesz-produit-scalaire] : Lire $w$ sur les coefficients n'est légitime que pour le produit scalaire euclidien. Il faut tester contre la base en utilisant $\langle\cdot,\cdot\rangle_A$.

Retraits :
- `h-H` (nécessaire) : Le représentant n'a de sens que pour un produit scalaire fixé. — Contre-exemple : Pour le produit scalaire euclidien, le représentant de $\ell$ est $(3,-2)$, différent de celui trouvé ici.

Vérification : {"origin":"complement","review":"machine"}

## Exercice intermediaire `riesz.intermediaire` : Représentant d'une forme intégrale sur $L^2(]0,1[)$

Énoncé : Dans $H=L^2(]0,1[)$, muni de $\langle u,v\rangle=\int_0^1uv$, on considère la forme $\ell(u)=\int_0^1x\,u(x)\,dx$. Montrer que $\ell\in H'$, déterminer son représentant de Riesz, puis calculer $\|\ell\|_{H'}$.
Source : {"doc":"polycopie","pdfPage":38,"label":"Exercice 2, intermédiaire (p. PDF 38)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-ps` (hypothese) : $H=L^2(]0,1[)$ est muni du produit scalaire $\langle u,v\rangle=\int_0^1uv$.
- `h-comp` (hypothese) : $H$ est complet pour la norme associée : c'est un espace de Hilbert réel.
- `d-ell` (definition) : $\ell(u)=\int_0^1x\,u(x)\,dx$ pour $u\in H$.
- `rep` (egalite, calcul expr-equiv) : Pour tout $u\in H$ : $\ell(u)=\langle u,w_0\rangle$, où $w_0(x)=x$ sur $]0,1[$.
  - valeur attendue : "x"
- `w0-L2` (consequence) : $w_0$ est de carré intégrable sur $]0,1[$ : $w_0\in H$.
- `cont` (consequence) : $\ell$ est une forme linéaire continue sur $H$ : $\ell\in H'$.
- `thm` (application-theoreme) : Il existe un unique $w\in H$ tel que $\ell(v)=\langle v,w\rangle$ pour tout $v\in H$, et $\|\ell\|_{H'}=\|w\|_{L^2}$.
- `uni` (consequence) : Si $w_1,w_2\in H$ vérifient $\langle u,w_1\rangle=\langle u,w_2\rangle$ pour tout $u\in H$, alors $w_1=w_2$.
- `w-id` (consequence) : Le représentant de $\ell$ est $w=w_0$.
- `n-maj` (inegalite) : $|\ell(u)|\le\|w_0\|_{L^2}\|u\|_{L^2}$ pour tout $u\in H$.
- `n-test` (egalite) : Pour $u=w_0/\|w_0\|_{L^2}$ : $\|u\|_{L^2}=1$ et $\ell(u)=\|w_0\|_{L^2}$.
- `norme` (egalite, calcul rational) : $\|\ell\|_{H'}^2=1/3$.
  - valeur attendue : "1/3"
- `fin` (conclusion) : $\ell\in H'$, son représentant est identifié et sa norme est calculée.
- `x-demi` (egalite, DISTRACTEUR) : $\|\ell\|_{H'}=1/2$.
- `x-un` (egalite, DISTRACTEUR) : $\|\ell\|_{H'}=1$.
- `x-const` (egalite, DISTRACTEUR) : Le représentant de $\ell$ est la fonction constante égale à $1$.

Règles :
- `d-ell` ⟹ `rep` par « Lecture directe de l'intégrale : c'est le produit scalaire de $L^2$ de $u$ avec une fonction explicite. »
- `rep` ⟹ `w0-L2` par « Une fonction bornée sur un intervalle borné est de carré intégrable. »
- `rep` + `w0-L2` + `h-ps` ⟹ `cont` par « Inégalité de Cauchy–Schwarz dans $L^2$, et linéarité de l'intégrale. [cauchy-schwarz] »
- `h-ps` + `h-comp` + `cont` ⟹ `thm` par « Théorème de représentation de Riesz. [riesz] » (chemin riesz)
- `thm` + `rep` + `w0-L2` ⟹ `w-id` par « Unicité du représentant : deux représentants vérifient la relation pour tout vecteur. » (chemin riesz)
- `h-ps` ⟹ `uni` par « Tester la relation en $u=w_1-w_2$ : $\|w_1-w_2\|^2=0$. » (chemin direct)
- `uni` + `rep` + `w0-L2` ⟹ `w-id` par « $w_0\in H$ représente $\ell$, et le représentant est unique dans $H$. » (chemin direct)
- `thm` + `w-id` ⟹ `norme` par « Isométrie de Riesz, puis calcul de $\|w_0\|_{L^2}^2=\int_0^1 x^2\,dx$. » (chemin riesz)
- `rep` + `w0-L2` + `h-ps` ⟹ `n-maj` par « Inégalité de Cauchy–Schwarz dans $L^2$. [cauchy-schwarz] » (chemin direct)
- `rep` + `w0-L2` + `h-ps` ⟹ `n-test` par « Choisir le vecteur unitaire colinéaire à $w_0$ : $\ell(w_0/\|w_0\|)=\|w_0\|^2/\|w_0\|$. » (chemin direct)
- `n-maj` + `n-test` ⟹ `norme` par « Encadrement : la majoration et le vecteur de test donnent $\|\ell\|_{H'}=\|w_0\|_{L^2}$, puis calcul de $\int_0^1x^2\,dx$. » (chemin direct)
- `cont` + `w-id` + `norme` ⟹ `fin` par « Réunion de la continuité, de l’identification et du calcul de la norme. »

Justifications sans règle (séduisantes ou fausses) : « L'inégalité de Cauchy–Schwarz donne directement $\|\ell\|_{H'}=\|w_0\|_{L^2}$. » ; « C’est évident. »

Pièges :
- `x-demi` → incorrect [riesz-norme-duale] : $\ell(1)=1/2$ et $\|1\|_{L^2}=1$ ne donnent que la minoration $\|\ell\|_{H'}\ge 1/2$ : la constante $1$ n'est pas dans la direction du représentant. — Contre-exemple : Pour $u(x)=\sqrt3\,x$, on a $\|u\|_{L^2}=1$ et $\ell(u)=1/\sqrt3>1/2$.
- `x-un` → incorrect [riesz-norme-duale] : Majorer $x$ par $1$ dans l'intégrale donne seulement une majoration, qui n'est pas atteinte : la norme n'est pas $1$. — Contre-exemple : Cauchy–Schwarz donne $|\ell(u)|\le\|w_0\|_{L^2}\|u\|_{L^2}$, et $\|w_0\|_{L^2}^2=1/3<1$.
- `x-const` → incorrect [riesz-produit-scalaire] : La forme porte le poids $x$ : $\langle u,1\rangle=\int_0^1u$ n'est pas $\ell(u)$. — Contre-exemple : Pour $u=1$ : $\ell(1)=1/2$, alors que $\langle 1,1\rangle=1$.
- `norme` par « L'inégalité de Cauchy–Schwarz donne directement $\|\ell\|_{H'}=\|w_0\|_{L^2}$. » → incorrect [riesz-norme-duale] : L'inégalité de Cauchy–Schwarz ne fournit que $\|\ell\|_{H'}\le\|w_0\|_{L^2}$. L'égalité demande un vecteur qui atteint la borne, ou l'isométrie du théorème de Riesz.
- `cont` par « C’est évident. » → a-justifier [justification-absente] : En dimension infinie, une forme linéaire n'est pas automatiquement continue : il faut une majoration par $\|u\|_{L^2}$.

Retraits :
- `w0-L2` (nécessaire) : Un représentant doit appartenir à l'espace de Hilbert considéré. — Contre-exemple : Le poids $x\mapsto x^{-1/2}$ n'est pas de carré intégrable sur $]0,1[$, et la forme $u\mapsto\int_0^1x^{-1/2}u(x)\,dx$ n'est pas continue pour la norme de $L^2$ : pour $u_n=x^{-1/2}\mathbb 1_{]1/n,1[}$, on a $\ell(u_n)=\ln n$ et $\|u_n\|_{L^2}=\sqrt{\ln n}$.
- `h-comp` (non nécessaire) : Sans complétude, la garantie générale de Riesz est perdue, mais pour cette forme la représentation $\ell=\langle\cdot,w_0\rangle$ a été calculée directement et $w_0$ est continue : elle reste valable sur $C([0,1])$ muni du produit scalaire de $L^2$. — Contre-exemple : Le théorème peut réellement échouer sans complétude : sur $E=C([0,1])$ avec le produit scalaire de $L^2$, la forme $u\mapsto\int_0^{1/2}u$ est continue, mais son seul représentant possible est $\mathbb 1_{]0,1/2[}$, qui n'appartient pas à $E$.

Calculs fermés : [{"kind":"rational","prompt":"Valeur de $\\|\\ell\\|_{H'}^2$","expected":"1/3"}]

Solution :
**Représentation et continuité.** Pour $u\in H$, $\ell(u)=\int_0^1u\,w_0=\langle u,w_0\rangle$ avec $w_0(x)=x$. La fonction $w_0$ est bornée sur $]0,1[$, donc de carré intégrable : $w_0\in H$. L'inégalité de Cauchy–Schwarz donne $|\ell(u)|\le\|w_0\|\,\|u\|$, et $\ell$ est linéaire : $\ell\in H'$.

**Représentant.** Par le théorème de Riesz, il existe un unique $w\in H$ tel que $\ell(v)=\langle v,w\rangle$ pour tout $v\in H$. Comme $w_0$ convient, $w=w_0$ : le représentant de $\ell$ est la fonction $x\mapsto x$. (L'unicité se vérifie aussi directement en testant en $u=w_1-w_2$.)

**Norme.** L'isométrie de Riesz donne $\|\ell\|_{H'}=\|w_0\|_{L^2}$, donc $\|\ell\|_{H'}^2=\int_0^1x^2\,dx=\tfrac13$. Sans Riesz : Cauchy–Schwarz donne $\|\ell\|_{H'}\le\|w_0\|$, et le vecteur $u=w_0/\|w_0\|$ donne $\ell(u)=\|w_0\|$. La constante $1$ ne convient pas : $\ell(1)=1/2$ ne fournit qu'une minoration de $\|\ell\|_{H'}$.

Indices :
1. La forme s'écrit-elle déjà comme un produit scalaire de $L^2$ avec un vecteur explicite ?
2. Montre que ce vecteur est bien dans $L^2(]0,1[)$. La continuité vient de Cauchy–Schwarz, et l'unicité du représentant fait le reste.
3. Pour la norme : Cauchy–Schwarz ne donne que $\le$. L'égalité vient de l'isométrie de Riesz, ou du test $u=w_0/\|w_0\|$. Il reste à calculer $\int_0^1x^2\,dx$.

Erreurs fréquentes :
- Confondre $\|\ell\|_{H'}$ avec la valeur $\ell(1)$.
- Conclure à l’égalité des normes à partir de la seule inégalité de Cauchy–Schwarz.
- Oublier que le poids $x$ fait partie du représentant : prendre $w=1$.

Variante : Dans $H=L^2(]0,1[)$, on considère $\ell(u)=\int_0^{1/2}u(x)\,dx$. Montrer que $\ell\in H'$, déterminer son représentant et calculer $\|\ell\|_{H'}$.

Solution de la variante : Pour $u\in H$, $\ell(u)=\int_0^1u\,\mathbb 1_{]0,1/2[}=\langle u,w\rangle$ avec $w=\mathbb 1_{]0,1/2[}\in L^2(]0,1[)$. Par Cauchy–Schwarz, $|\ell(u)|\le\|w\|\,\|u\|$ : $\ell\in H'$. Le représentant est $w$, unique par Riesz, et $\|\ell\|_{H'}^2=\|w\|^2=\int_0^{1/2}1\,dx=\tfrac12$. Le représentant n'a pas de version continue : on retrouve qu'il n'appartient pas à $C([0,1])$.

Vérification : {"origin":"complement","review":"machine"}

## Exercice difficile `riesz.difficile` : Représentant de $v\mapsto\int_0^1v$ dans $H^1_0(]0,1[)$

Énoncé : Soit $V=H^1_0(]0,1[)$, muni du produit scalaire $(u,v)_V=\int_0^1u'v'$, et soit $\ell(v)=\int_0^1v(x)\,dx$. Montrer que $\ell\in V'$, identifier le représentant de Riesz $w$ de $\ell$ en résolvant un problème aux limites, puis calculer $\|\ell\|_{V'}$.
Source : {"doc":"polycopie","pdfPage":38,"label":"Exercice 2, difficile (p. PDF 38)"} — prérequis : poincare, distributions

But : `fin` — usage : application

Nœuds :
- `h-V` (hypothese) : $V=H^1_0(]0,1[)$, muni de $(u,v)_V=\int_0^1u'v'$, est un espace de Hilbert réel (norme équivalente à celle de $H^1$, par Poincaré).
- `d-ell` (definition) : $\ell(v)=\int_0^1v(x)\,dx$ pour $v\in V$.
- `h-poinc` (hypothese) : Il existe $C>0$ tel que $\|v\|_{L^2}\le C\|v'\|_{L^2}$ pour tout $v\in V$ (inégalité de Poincaré).
- `lin` (consequence) : $\ell$ est linéaire sur $V$.
- `cs` (inegalite) : $|\ell(v)|\le\|v\|_{L^2}$ pour tout $v\in V$.
- `cont` (consequence) : $\ell\in V'$ : $|\ell(v)|\le C\|v\|_V$ pour tout $v\in V$.
- `thm` (application-theoreme) : Il existe un unique $w\in V$ tel que $(w,v)_V=\ell(v)$ pour tout $v\in V$, et $\|\ell\|_{V'}=\|w\|_V$.
- `test` (egalite) : Pour tout $\varphi\in C^\infty_c(]0,1[)$ : $\int_0^1w'\varphi'=\int_0^1\varphi$.
- `eqD` (egalite) : $-w''=1$ dans $\mathcal D'(]0,1[)$.
- `poly` (egalite) : Il existe $a,b\in\mathbb R$ tels que $w(x)=-\tfrac12x^2+ax+b$ pour presque tout $x\in\,]0,1[$.
- `cl` (egalite) : Le représentant continu de $w$ vérifie $w(0)=w(1)=0$.
- `cand` (egalite) : Le polynôme $p$ de degré $2$ tel que $p''=-1$ et $p(0)=p(1)=0$ appartient à $V$, et $\int_0^1p'v'=\int_0^1v$ pour tout $v\in V$.
- `val` (egalite, calcul expr-equiv) : $w(x)=\tfrac12\,x(1-x)$ sur $]0,1[$.
  - valeur attendue : "x*(1-x)/2"
- `norme` (egalite, calcul rational) : $\|\ell\|_{V'}^2=1/12$.
  - valeur attendue : "1/12"
- `fin` (conclusion) : Le représentant de $\ell$ est identifié, il résout un problème aux limites, et sa norme dans $V'$ est calculée.
- `x-un` (egalite, DISTRACTEUR) : Le représentant de $\ell$ dans $V$ est la fonction constante égale à $1$.
- `x-signe` (egalite, DISTRACTEUR) : $w''=1$ dans $\mathcal D'(]0,1[)$.
- `x-cl` (consequence, DISTRACTEUR) : L'équation $-w''=1$ suffit à déterminer $w$ de manière unique.

Règles :
- `d-ell` ⟹ `lin` par « Linéarité de l’intégrale. »
- `d-ell` ⟹ `cs` par « Inégalité de Cauchy–Schwarz sur $]0,1[$, avec la fonction constante $1$. [cauchy-schwarz] »
- `lin` + `cs` + `h-poinc` ⟹ `cont` par « Inégalité de Poincaré, appliquée à $\|v\|_{L^2}$. [poincare] »
- `h-V` + `cont` ⟹ `thm` par « Théorème de représentation de Riesz. [riesz] »
- `thm` ⟹ `test` par « Spécialiser l'identité à $v=\varphi\in C^\infty_c(]0,1[)\subset V$. » (chemin bvp)
- `test` ⟹ `eqD` par « Définition de la dérivée distributionnelle : $\langle w'',\varphi\rangle=-\int_0^1w'\varphi'$. » (chemin bvp)
- `eqD` ⟹ `poly` par « Une distribution de dérivée seconde nulle sur un intervalle est une fonction affine ; on applique cela à $w+\tfrac12x^2$. » (chemin bvp)
- `thm` + `h-V` ⟹ `cl` par « $w\in H^1_0(]0,1[)$ : les fonctions de $V$ sont continues et nulles au bord. » (chemin bvp)
- `poly` + `cl` ⟹ `val` par « Déterminer $a$ et $b$ à partir des deux conditions au bord. » (chemin bvp)
- `d-ell` ⟹ `cand` par « Intégration par parties sur $]0,1[$ : le terme de bord s'annule car $v$ est nulle en $0$ et en $1$. » (chemin verif)
- `thm` + `cand` ⟹ `val` par « Unicité du représentant de Riesz : le candidat vérifie l'identité caractéristique. [riesz] » (chemin verif)
- `thm` + `val` ⟹ `norme` par « Isométrie de Riesz, puis calcul de $\|w\|_V^2=\int_0^1(w')^2$. »
- `thm` + `val` ⟹ `norme` par « Isométrie de Riesz, puis $\|w\|_V^2=(w,w)_V=\ell(w)=\int_0^1w$. »
- `cont` + `val` + `norme` ⟹ `fin` par « Réunion de la continuité, de l’identification et du calcul de la norme. »

Justifications sans règle (séduisantes ou fausses) : « Les valeurs au bord se lisent sur l'équation $-w''=1$. » ; « Riesz dans $L^2(]0,1[)$, où $\ell(v)=\int_0^1 1\cdot v$. » ; « C’est évident. »

Pièges :
- `x-un` → incorrect [dual-identification] : Dans $L^2(]0,1[)$, la forme $\ell$ est représentée par la constante $1$. Mais le représentant cherché ici appartient à $V$ pour le produit scalaire $(\cdot,\cdot)_V$ : il dépend de l'espace et du produit scalaire. — Contre-exemple : La constante $1$ n'appartient pas à $V$ : sa valeur en $0$ n'est pas nulle. Pour une fonction constante, $(1,v)_V$ serait nul, alors que $\ell(v)$ ne l'est pas en général.
- `x-signe` → incorrect [riesz-signe] : Attention au signe : pour $\varphi$ test, $\int_0^1w'\varphi'=-\langle w'',\varphi\rangle$. On obtient $-w''=1$, c'est-à-dire $w''=-1$. — Contre-exemple : Avec $w(x)=-\tfrac12x(1-x)$, on aurait $(w,v)_V=-\ell(v)$ pour tout $v$.
- `x-cl` → incorrect [domaine-operateur] : Une équation différentielle sans conditions aux limites admet une infinité de solutions : ce sont les conditions $w(0)=w(1)=0$, issues de $w\in H^1_0$, qui déterminent $w$. — Contre-exemple : $w(x)=-\tfrac12x^2+ax+b$ vérifie $-w''=1$ pour tous $a,b\in\mathbb R$.
- `cl` par « Les valeurs au bord se lisent sur l'équation $-w''=1$. » → incorrect [domaine-operateur] : L'équation ne fixe pas les valeurs au bord. Elles proviennent de l'appartenance $w\in H^1_0(]0,1[)$.
- `thm` par « Riesz dans $L^2(]0,1[)$, où $\ell(v)=\int_0^1 1\cdot v$. » → incorrect [riesz-produit-scalaire] : La représentation est demandée dans $V$, pour le produit scalaire $(\cdot,\cdot)_V$. Riesz dans $L^2$ donne le représentant $1$, qui n'appartient pas à $V$.
- `cont` par « C’est évident. » → a-justifier [justification-absente] : La continuité sur $V$ se démontre : elle requiert de majorer $|\ell(v)|$ par la norme de $V$, donc l'inégalité de Poincaré.

Retraits :
- `h-V` (nécessaire) : Sans condition au bord, l'application $(u,v)\mapsto\int_0^1u'v'$ n'est plus un produit scalaire : elle s'annule sur les constantes. La forme $\ell$ n'admet plus de représentant. — Contre-exemple : Sur $H^1(]0,1[)$ : $\int_0^1w'\cdot 1'=0$ pour tout $w$, alors que $\ell(1)=1$. Aucun $w$ ne peut représenter $\ell$.
- `h-poinc` (nécessaire) : Sans l'inégalité de Poincaré, $\ell$ n'est plus contrôlée par la norme de $V$. — Contre-exemple : Sur $]0,+\infty[$, soit $\varphi\in C^\infty_c(]0,+\infty[)$ positive non nulle et $v_n(x)=\varphi(x/n)$ : $\|v_n'\|_{L^2}^2=\|\varphi'\|_{L^2}^2/n\to 0$, alors que $\int v_n=n\int\varphi\to+\infty$.

Calculs fermés : [{"kind":"rational","prompt":"Valeur de $\\|\\ell\\|_{V'}^2$","expected":"1/12"}]

Solution :
**Continuité.** $\ell$ est linéaire, et par Cauchy–Schwarz puis Poincaré : $|\ell(v)|\le\|v\|_{L^2}\le C\|v'\|_{L^2}=C\|v\|_V$. Donc $\ell\in V'$.

**Représentation.** Le théorème de Riesz donne un unique $w\in V$ tel que $\int_0^1w'v'=\int_0^1v$ pour tout $v\in V$, et $\|\ell\|_{V'}=\|w\|_V$.

**Problème aux limites.** En restreignant à $v=\varphi\in C^\infty_c(]0,1[)$ : $\int_0^1w'\varphi'=\int_0^1\varphi$, c'est-à-dire $-w''=1$ dans $\mathcal D'(]0,1[)$. Ainsi $(w+\tfrac12x^2)''=0$ : il existe $a,b\in\mathbb R$ tels que $w(x)=-\tfrac12x^2+ax+b$. L'appartenance $w\in H^1_0(]0,1[)$ donne $w(0)=w(1)=0$, d'où $b=0$ et $a=\tfrac12$ : $w(x)=\tfrac12x(1-x)$.

**Vérification.** Ce polynôme $p$ appartient à $V$, et une intégration par parties donne $\int_0^1p'v'=[p'v]_0^1-\int_0^1p''v=\int_0^1v$ pour tout $v\in V$ : par unicité, $w=p$.

**Norme.** $\|\ell\|_{V'}^2=\|w\|_V^2=\int_0^1(\tfrac12-x)^2\,dx=\tfrac1{12}$ ; on retrouve la même valeur par $\|w\|_V^2=(w,w)_V=\ell(w)=\int_0^1\tfrac12x(1-x)\,dx=\tfrac1{12}$.

**Point de vigilance.** Le représentant dépend de l'espace : dans $L^2(]0,1[)$, la même forme est représentée par la constante $1$.

Indices :
1. Quel est le produit scalaire de $V$ ? C'est dans cette structure, et non dans $L^2$, que le représentant est cherché.
2. Teste l'identité $(w,v)_V=\ell(v)$ contre $\varphi\in C^\infty_c(]0,1[)$ pour obtenir une équation sur $w$. Les conditions au bord viennent de l'espace.
3. On obtient $-w''=1$, donc $w(x)=-\tfrac12x^2+ax+b$ ; $w(0)=w(1)=0$ fixe $a$ et $b$. Pour la norme, utilise l'isométrie : $\|\ell\|_{V'}=\|w\|_V$.

Erreurs fréquentes :
- Répondre $w=1$ en raisonnant dans $L^2$ au lieu de $V$.
- Écrire $w''=1$ au lieu de $-w''=1$.
- Oublier d’utiliser les conditions au bord, qui viennent de l’espace et non de l’équation.

Variante : Soit $V=H^1_0(]0,1[)$, muni de $(u,v)_V=\int_0^1u'v'$, et $\ell(v)=\int_0^1x\,v(x)\,dx$. Déterminer le représentant de Riesz $w$ de $\ell$ dans $V$ et calculer $\|\ell\|_{V'}$.

Solution de la variante : $\ell$ est continue sur $V$ (Cauchy–Schwarz et Poincaré). Le représentant vérifie $\int_0^1w'v'=\int_0^1x\,v$ pour tout $v\in V$, donc $-w''=x$ dans $\mathcal D'(]0,1[)$ et $w(0)=w(1)=0$. Alors $w(x)=-\tfrac16x^3+ax+b$, et les conditions au bord donnent $b=0$, $a=\tfrac16$ : $w(x)=\tfrac16(x-x^3)$. Enfin $\|\ell\|_{V'}^2=\|w\|_V^2=(w,w)_V=\ell(w)=\int_0^1x\cdot\tfrac16(x-x^3)\,dx=\tfrac16\big(\tfrac13-\tfrac15\big)=\tfrac1{45}$.

Vérification : {"origin":"complement","review":"machine"}