# 30. Représentation des formes fermées (`formes-fermees`) — polycopié p. PDF 25, section 6.6

## Fiche

Espaces : $H$ : espace de Hilbert réel, de produit scalaire $\langle\cdot,\cdot\rangle_H$. | $a:D(a)\times D(a)\to\mathbb R$ : forme bilinéaire sur un sous-espace $D(a)\subset H$ (domaine de forme). | Norme de forme : $\|u\|_a=\big(a(u,u)+\|u\|_H^2\big)^{1/2}$ sur $D(a)$.

Hypothèses :
- $a$ est symétrique : $a(u,v)=a(v,u)$.
- $a$ est positive : $a(u,u)\ge 0$. — Sans elle : Sur $H=\mathbb R$, $a(u,v)=-2uv$ est symétrique sur $D(a)=\mathbb R$, mais $a(u,u)+u^2=-u^2<0$ pour $u\neq0$ : la norme de forme n'est pas définie, et le seul opérateur qui représente $a$, $A=-2$, n'est pas positif.
- $a$ est fermée : $D(a)$ est complet pour $\|\cdot\|_a$. — Sans elle : Sur $D(a)=C^\infty_c(]0,1[)$, la forme $\int_0^1u'v'$ n'est pas fermée, et l'équation $a(u,v)+\langle u,v\rangle_H=\langle 1,v\rangle_H$ n'a pas de solution dans $D(a)$.
- $a$ est densément définie : $D(a)$ est dense dans $H$. — Sans elle : $H=\mathbb R^2$, $D(a)=\mathbb R\times\{0\}$ : la résolvante construite a un noyau non nul, et l'opérateur associé ne peut être densément défini.

Énoncé : À toute forme symétrique positive, fermée, densément définie $a$ sur $H$ est associé un unique opérateur auto-adjoint positif $A$ tel que
$$D(A)\subset D(a),\qquad a(u,v)=\langle Au,v\rangle_H\quad(u\in D(A),\ v\in D(a)).$$
De plus, $D(a)=D(A^{1/2})$ et $a(u,v)=\langle A^{1/2}u,A^{1/2}v\rangle_H$.

Bilan : {"existence":"$A=T^{-1}-I$, où $T=(I+A)^{-1}$ est construit par Lax–Milgram dans $(D(a),\\|\\cdot\\|_a)$.","unicite":"Si $B$ est auto-adjoint, $D(B)\\subset D(a)$ et $a(u,v)=\\langle Bu,v\\rangle$, alors $B\\subset A^*=A$, et un opérateur auto-adjoint n'a pas d'extension symétrique stricte : $B=A$.","regularite":"$D(A)\\subset D(a)=D(A^{1/2})$, inclusion stricte en général.","autre":"Le domaine de forme est le complété de $D(A)$ pour $\\|\\cdot\\|_a$."}

Preuve dans le polycopié : idee

Plan :
1. Pour $f\in H$, Lax–Milgram dans $(D(a),(\cdot,\cdot)_a)$ donne un unique $Tf$ tel que $a(Tf,v)+\langle Tf,v\rangle_H=\langle f,v\rangle_H$ pour tout $v\in D(a)$.
2. Test par $v=Tf$ : $\|Tf\|_H\le\|Tf\|_a\le\|f\|_H$. Croisement des équations : $T$ symétrique ; $\langle Tf,f\rangle=\|Tf\|_a^2\ge 0$.
3. Si $Tf=0$, $f$ est orthogonal à $D(a)$, dense : $T$ injectif ; $(\mathrm{Im}\,T)^\perp=\mathrm{Ker}\,T=\{0\}$ : image dense.
4. $A=T^{-1}-I$ sur $D(A)=\mathrm{Im}\,T$ : $a(u,v)=\langle Au,v\rangle$ pour $u=Tf$ ; $T^{-1}$ est auto-adjoint, donc $A$ aussi, et $\langle Au,u\rangle=a(u,u)\ge 0$.
5. Unicité : si $B$ convient, pour $u\in D(B)$ et $v\in D(A)$, $\langle Bu,v\rangle=a(u,v)=a(v,u)=\langle Av,u\rangle$, donc $u\in D(A^*)=D(A)$ et $Au=Bu$ ; $B\subset A$ et $B=B^*\supset A^*=A$.
6. Second énoncé : sur $D(A)$, $a(u,u)=\|A^{1/2}u\|^2$, donc $\|\cdot\|_a$ coïncide avec la norme du graphe de $A^{1/2}$. $D(A)$ est dense dans $(D(a),\|\cdot\|_a)$ (un $v$ orthogonal à $\mathrm{Im}\,T$ vérifie $\langle f,v\rangle=0$ pour tout $f$) et dans $D(A^{1/2})$ pour la norme du graphe (calcul spectral). Les deux espaces sont complets et s'injectent continûment dans $H$ : ils coïncident, et l'identité de forme passe à la limite.

Vigilance :
- $D(A)$ est en général strictement plus petit que $D(a)$ : pour le Laplacien de Dirichlet sur $]0,1[$, $\min(x,1-x)\in D(a)\setminus D(A)$.
- L'identité $a(u,v)=\langle Au,v\rangle$ n'a de sens que pour $u\in D(A)$.
- La norme de forme contient toujours le terme $\|u\|_H^2$.
- La symétrie seule ne donne pas l’auto-adjonction : l’argument passe par la résolvante.

Vérification : {"origin":"polycopie","review":"machine","notes":"Démonstration du polycopié esquissée (p. PDF 25) : propriétés de T, unicité et seconde partie complétées."}

Définition « Forme fermée » : Une forme symétrique positive $a:D(a)\times D(a)\to\mathbb R$ est fermée lorsque $D(a)$ est complet pour la norme $\|u\|_a=\big(a(u,u)+\|u\|_H^2\big)^{1/2}$.

Définition « Opérateur associé à une forme » : L'opérateur associé à $a$ est défini par $u\in D(A)$ si et seulement si $u\in D(a)$ et il existe $g\in H$ tel que $a(u,v)=\langle g,v\rangle_H$ pour tout $v\in D(a)$ ; on pose alors $Au=g$.

## Contre-exemple `ce-formes-domaine-strict` : Domaine de forme et domaine d’opérateur
Assertion : Pour le Laplacien de Dirichlet sur $]0,1[$, $D(A)=D(a)=H^1_0(]0,1[)$.
Tâche : Pour $u(x)=\min(x,1-x)$, $\varphi_k=\sqrt2\sin(k\pi x)$ et $\lambda_k=k^2\pi^2$, calcule $\lambda_k^2\langle u,\varphi_k\rangle^2$ pour $k$ impair.
Vérification : {"kind":"rational","prompt":"Valeur de $\\lambda_k^2\\langle u,\\varphi_k\\rangle^2$ pour $k$ impair","expected":"8"}
Explication : $\langle u,\varphi_k\rangle=2\sqrt2\sin(k\pi/2)/(k^2\pi^2)$, donc $\lambda_k\langle u,\varphi_k\rangle^2=8/(k^2\pi^2)$ est sommable ($u\in D(A^{1/2})$), tandis que $\lambda_k^2\langle u,\varphi_k\rangle^2=8$ pour $k$ impair : la série diverge et $u\notin D(A)$.

## Contre-exemple `ce-formes-non-fermee` : Forme non fermée
Assertion : La forme $a(u,v)=\int_0^1u'v'$ est fermée sur $D(a)=C^\infty_c(]0,1[)$.
Tâche : $u(x)=x(1-x)$ est limite pour $\|\cdot\|_a$ d'éléments de $C^\infty_c(]0,1[)$. Calcule $\|u\|_a^2$.
Vérification : {"kind":"rational","prompt":"Valeur exacte de $\\|u\\|_a^2$","expected":"11/30"}
Explication : $\|u\|_a^2=\int_0^1(1-2x)^2+\int_0^1x^2(1-x)^2=\frac13+\frac1{30}=\frac{11}{30}$. Une suite de $C^\infty_c$ qui converge vers $u$ dans $H^1$ est de Cauchy pour $\|\cdot\|_a$ sans limite dans $C^\infty_c$, puisque $u\notin C^\infty_c(]0,1[)$.

## Exercice facile `formes-fermees.facile` : Norme de forme de $a(u,v)=\int_0^1u'v'$

Énoncé : Dans $H=L^2(]0,1[)$, soit $a(u,v)=\int_0^1u'v'$ sur $D(a)=H^1_0(]0,1[)$. Déterminer la norme de forme $\|\cdot\|_a$, en déduire que $a$ est une forme symétrique positive, fermée, densément définie, et calculer $\|u\|_a^2$ pour $u(x)=x(1-x)$.
Source : {"doc":"polycopie","pdfPage":43,"label":"Exercice 30, facile (p. PDF 43) ; vocabulaire de la section 6.6 (p. PDF 25)"} — prérequis : distributions

But : `fin` — usage : application

Nœuds :
- `h-L2` (hypothese) : $H=L^2(]0,1[)$ est un espace de Hilbert réel, de norme $\|\cdot\|_H$.
- `h-H1` (hypothese) : $H^1(]0,1[)$ est complet pour la norme $\|u\|_{H^1}^2=\|u\|_H^2+\|u'\|_H^2$.
- `d-a` (definition) : $a(u,v)=\int_0^1u'v'$ sur $D(a)=H^1_0(]0,1[)$, adhérence de $C^\infty_c(]0,1[)$ dans $H^1(]0,1[)$.
- `d-norme` (definition) : $\|u\|_a^2=a(u,u)+\|u\|_H^2$ pour $u\in D(a)$.
- `d-u` (definition) : $u(x)=x(1-x)$ sur $[0,1]$.
- `sym` (consequence) : $a$ est symétrique et positive : $a(u,v)=a(v,u)$ et $a(u,u)\ge 0$.
- `dense` (consequence) : $D(a)$ est dense dans $H$.
- `id` (egalite) : Pour tout $u\in D(a)$ : $\|u\|_a=\|u\|_{H^1}$.
- `ferme` (consequence) : $H^1_0(]0,1[)$ est fermé dans $H^1(]0,1[)$.
- `complet` (consequence) : $\big(H^1_0(]0,1[),\|\cdot\|_{H^1}\big)$ est complet.
- `fermee` (consequence) : La forme $a$ est fermée.
- `u-in` (consequence) : $u\in D(a)$.
- `grad` (egalite) : $\int_0^1|u'|^2=\frac13$.
- `l2` (egalite) : $\int_0^1|u|^2=\frac1{30}$.
- `val` (egalite, calcul rational) : $\|u\|_a^2=\frac{11}{30}$.
  - valeur attendue : "11/30"
- `fin` (conclusion) : $\|\cdot\|_a$ est la norme de $H^1$, $a$ est symétrique positive, fermée, densément définie, et $\|u\|_a^2=\frac{11}{30}$ pour $u(x)=x(1-x)$.
- `x-oubli` (egalite, DISTRACTEUR) : Pour tout $u\in D(a)$ : $\|u\|_a^2=\int_0^1|u'|^2$.
- `x-cinf` (consequence, DISTRACTEUR) : La restriction de $a$ à $C^\infty_c(]0,1[)$ est encore une forme fermée.

Règles :
- `d-a` ⟹ `sym` par « Symétrie du produit réel sous l'intégrale ; $a(u,u)=\int_0^1|u'|^2\ge 0$. »
- `d-a` + `h-L2` ⟹ `dense` par « $C^\infty_c(]0,1[)\subset D(a)$, et $C^\infty_c(]0,1[)$ est dense dans $L^2(]0,1[)$. [densite-cinf] »
- `d-a` + `d-norme` ⟹ `id` par « Écrire $a(u,u)+\|u\|_H^2=\|u'\|_H^2+\|u\|_H^2$ et comparer à la définition de $\|\cdot\|_{H^1}$. »
- `d-a` ⟹ `ferme` par « Une adhérence est fermée. »
- `ferme` + `h-H1` ⟹ `complet` par « Un sous-espace fermé d’un espace complet est complet. »
- `id` + `complet` ⟹ `fermee` par « Définition d'une forme fermée : $D(a)$ est complet pour $\|\cdot\|_a$. »
- `d-u` + `d-a` ⟹ `u-in` par « $u\in C^1([0,1])$ et $u(0)=u(1)=0$ : en dimension 1, $H^1_0$ est l'ensemble des fonctions de $H^1$ nulles au bord. »
- `d-u` ⟹ `grad` par « $u'(x)=1-2x$, puis calcul de l'intégrale. »
- `d-u` ⟹ `l2` par « Développement de $x^2(1-x)^2$, puis intégration terme à terme. »
- `grad` + `l2` + `id` + `u-in` ⟹ `val` par « Addition des deux intégrales, grâce à l'identification de $\|\cdot\|_a$. »
- `sym` + `dense` + `id` + `fermee` + `val` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « $a$ est continue sur $H\times H$, donc fermée. » ; « L'inégalité de Poincaré rend le terme $\|u\|_H^2$ superflu : il disparaît de $\|\cdot\|_a$. » ; « Théorème de représentation des formes fermées. » ; « C’est évident. »

Pièges :
- `x-oubli` → incorrect [formes-fermees-norme-forme] : La norme de forme contient le terme $\|u\|_H^2$. Poincaré rend $\|u'\|_H$ équivalente à $\|\cdot\|_a$ sur $H^1_0$, mais pas égale. — Contre-exemple : Pour $u(x)=x(1-x)$ : $\int_0^1|u'|^2=\frac13$, alors que $\|u\|_a^2=\frac{11}{30}$.
- `id` par « L'inégalité de Poincaré rend le terme $\|u\|_H^2$ superflu : il disparaît de $\|\cdot\|_a$. » → incorrect [formes-fermees-norme-forme] : Une inégalité de Poincaré fournit une équivalence de normes, pas une égalité : le terme $\|u\|_H^2$ reste dans la définition.
- `x-cinf` → incorrect [fermeture-espace] : $C^\infty_c(]0,1[)$ n'est pas complet pour $\|\cdot\|_a$ : la limite d'une suite de Cauchy peut sortir de cet espace. — Contre-exemple : $u(x)=x(1-x)\in H^1_0(]0,1[)\setminus C^\infty_c(]0,1[)$ est limite dans $H^1$ d'une suite de $C^\infty_c(]0,1[)$, de Cauchy pour $\|\cdot\|_a$, sans limite dans $C^\infty_c(]0,1[)$.
- `fermee` par « $a$ est continue sur $H\times H$, donc fermée. » → incorrect [hypotheses-theoreme] : $a$ n'est pas continue sur $H\times H$ : le rapport $a(u,u)/\|u\|_H^2$ n'est pas borné, et d'ailleurs $a$ n'est définie que sur $D(a)$. — Contre-exemple : Pour $u_n=\sin(n\pi\,\cdot)$ : $\|u_n\|_H^2=\frac12$ et $a(u_n,u_n)=\frac{n^2\pi^2}2$.
- `fermee` par « Théorème de représentation des formes fermées. » → incorrect [circularite] : Le théorème de représentation suppose la forme fermée : on ne peut pas l’invoquer pour obtenir cette propriété.
- `fermee` par « C’est évident. » → a-justifier [justification-absente] : La fermeture se démontre : identifie la norme de forme, puis un espace complet qui la porte.

Retraits :
- `ferme` (nécessaire) : La complétude de $D(a)$ vient de ce que $H^1_0$ est un fermé de $H^1$. — Contre-exemple : Sur $D(a)=C^\infty_c(]0,1[)$, non fermé dans $H^1$, la forme $\int_0^1u'v'$ n'est pas fermée.
- `h-H1` (nécessaire) : Un fermé d'un espace non complet n'a aucune raison d'être complet. — Contre-exemple : $C^1([0,1])$ est dense et strict dans $H^1(]0,1[)$ : muni de $\|\cdot\|_{H^1}$, il n'est pas complet.

Calculs fermés : [{"kind":"rational","prompt":"Valeur de $\\int_0^1|u'|^2$ pour $u(x)=x(1-x)$","expected":"1/3"}]

Solution :
**Norme de forme.** Pour $u\in D(a)$, $\|u\|_a^2=a(u,u)+\|u\|_H^2=\|u'\|_H^2+\|u\|_H^2=\|u\|_{H^1}^2$. La norme de forme est donc exactement la norme de $H^1$.

**Fermeture.** $H^1_0(]0,1[)$ est l'adhérence de $C^\infty_c(]0,1[)$ dans $H^1$ : c'est un fermé de $H^1$, complet, donc complet pour $\|\cdot\|_a$. La forme $a$ est fermée.

**Autres hypothèses.** $a$ est symétrique ; $a(u,u)=\int_0^1|u'|^2\ge 0$ ; $D(a)\supset C^\infty_c(]0,1[)$ est dense dans $L^2$.

**Calcul.** $u(x)=x(1-x)$ est de classe $C^1$ et s'annule en $0$ et $1$, donc $u\in D(a)$. On a $u'(x)=1-2x$, d'où $\int_0^1|u'|^2=\frac13$ ; puis $\int_0^1|u|^2=\int_0^1x^2(1-x)^2\,dx=\frac1{30}$. Ainsi $\|u\|_a^2=\frac{11}{30}$.

Indices :
1. Que vaut $\|u\|_a^2$ quand on écrit les deux termes de sa définition ? Quel espace complet y reconnais-tu ?
2. La forme est fermée si $D(a)$ est complet pour $\|\cdot\|_a$. Regarde comment $H^1_0$ est défini à l'intérieur de $H^1$, puis calcule les deux intégrales.
3. $H^1_0$ est une adhérence dans $H^1$, donc fermé, donc complet. Pour le calcul : $u'(x)=1-2x$ et $\int_0^1x^2(1-x)^2\,dx=\frac1{30}$.

Erreurs fréquentes :
- Oublier le terme $\|u\|_H^2$ dans la norme de forme.
- Croire que $a$ est continue sur $H\times H$.
- Penser que la forme est déjà fermée sur $C^\infty_c(]0,1[)$.

Variante : Dans $H=L^2(]0,1[)$, soit $a(u,v)=\int_0^1u'v'$ sur $D(a)=H^1(]0,1[)$. Déterminer $\|\cdot\|_a$, montrer que $a$ est fermée, et calculer $\|w\|_a^2$ pour $w(x)=x$.

Solution de la variante : Pour $u\in H^1$ : $\|u\|_a^2=\|u'\|_H^2+\|u\|_H^2=\|u\|_{H^1}^2$. L'espace $H^1(]0,1[)$ étant complet, $a$ est fermée ; aucune condition au bord n'intervient. Pour $w(x)=x$, $w\in H^1$, $\int_0^1|w'|^2=1$ et $\int_0^1|w|^2=\frac13$, donc $\|w\|_a^2=\frac43$.

Graphe de la variante :
But : `fin` — usage : application

Nœuds :
- `h-H1` (hypothese) : $H^1(]0,1[)$ est complet pour $\|u\|_{H^1}^2=\|u\|_H^2+\|u'\|_H^2$, où $H=L^2(]0,1[)$.
- `d-a` (definition) : $a(u,v)=\int_0^1u'v'$ sur $D(a)=H^1(]0,1[)$.
- `d-w` (definition) : $w(x)=x$ sur $[0,1]$.
- `id` (egalite) : Pour tout $u\in D(a)$ : $\|u\|_a=\|u\|_{H^1}$.
- `fermee` (consequence) : La forme $a$ est fermée.
- `w-in` (consequence) : $w\in D(a)$.
- `val` (egalite, calcul rational) : $\|w\|_a^2=\frac43$.
  - valeur attendue : "4/3"
- `fin` (conclusion) : $a$ est fermée de norme de forme $\|\cdot\|_{H^1}$, et $\|w\|_a^2=\frac43$.
- `x-dir` (consequence, DISTRACTEUR) : La forme $a$ n'est pas fermée, car $H^1(]0,1[)$ n'est pas $H^1_0(]0,1[)$.
- `x-oubli` (egalite, DISTRACTEUR) : $\|w\|_a^2=\int_0^1|w'|^2=1$.

Règles :
- `d-a` ⟹ `id` par « Écrire $a(u,u)+\|u\|_H^2=\|u'\|_H^2+\|u\|_H^2$. »
- `id` + `h-H1` + `d-a` ⟹ `fermee` par « $D(a)=H^1(]0,1[)$ est complet pour la norme $\|\cdot\|_{H^1}$. »
- `d-w` + `d-a` ⟹ `w-in` par « $w$ est de classe $C^1$ sur $[0,1]$, donc appartient à $H^1(]0,1[)$. »
- `id` + `w-in` ⟹ `val` par « $\int_0^1|w'|^2=1$ et $\int_0^1|w|^2=\frac13$ : addition. »
- `id` + `fermee` + `val` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « Une forme fermée doit avoir $H^1_0$ pour domaine. »

Pièges :
- `x-dir` → incorrect [fermeture-espace] : Être fermée signifie que le domaine est complet pour la norme de forme : aucune condition au bord n'est requise. — Contre-exemple : $H^1(]0,1[)$ est complet pour $\|\cdot\|_{H^1}$, sans condition au bord.
- `fermee` par « Une forme fermée doit avoir $H^1_0$ pour domaine. » → incorrect [fermeture-espace] : Aucun théorème n'impose $H^1_0$ pour domaine : la complétude pour $\|\cdot\|_a$ est le seul critère.
- `x-oubli` → incorrect [formes-fermees-norme-forme] : Le terme $\|w\|_H^2=\frac13$ a été oublié. Il n'y a d'ailleurs pas d'inégalité de Poincaré sur $H^1(]0,1[)$. — Contre-exemple : $\|w\|_a^2=1+\frac13=\frac43$.

Retraits :
- `h-H1` (nécessaire) : La fermeture de $a$ est exactement la complétude de son domaine pour $\|\cdot\|_a$. — Contre-exemple : Sur $D(a)=C^1([0,1])$, muni de la même norme, la forme n'est pas fermée, car $C^1([0,1])$ est dense et strict dans $H^1(]0,1[)$.

Vérification : {"origin":"complement","review":"machine","notes":"L’exercice figure au polycopié sans corrigé ; calcul et vérification rédigés pour ProofLab."}

## Exercice intermediaire `formes-fermees.intermediaire` : Construire $T=(I+A)^{-1}$ par Lax–Milgram

Énoncé : Soit $H$ un Hilbert réel et $a$ une forme symétrique, positive, fermée, densément définie sur $H$. On munit $V=D(a)$ du produit scalaire $(u,v)_a=a(u,v)+\langle u,v\rangle_H$. Montrer que pour tout $f\in H$ il existe un unique $Tf\in V$ tel que $a(Tf,v)+\langle Tf,v\rangle_H=\langle f,v\rangle_H$ pour tout $v\in V$ ; que $T$ est borné, symétrique, positif, injectif à image dense ; puis que $A=T^{-1}-I$, de domaine $D(A)=\mathrm{Im}\,T$, est auto-adjoint positif, vérifie $a(u,v)=\langle Au,v\rangle_H$ pour $u\in D(A)$, $v\in D(a)$, et $T=(I+A)^{-1}$.
Source : {"doc":"polycopie","pdfPage":43,"label":"Exercice 30, intermédiaire (p. PDF 43) ; démonstration de la section 6.6 (p. PDF 25)"} — prérequis : lax-milgram

But : `fin` — usage : demonstration

Nœuds :
- `h-sym` (hypothese) : $a$ est symétrique : $a(u,v)=a(v,u)$ pour $u,v\in D(a)$.
- `h-pos` (hypothese) : $a$ est positive : $a(u,u)\ge 0$ pour $u\in D(a)$.
- `h-dense` (hypothese) : $D(a)$ est dense dans $H$.
- `h-fermee` (hypothese) : $a$ est fermée : $D(a)$ est complet pour $\|u\|_a=\big(a(u,u)+\|u\|_H^2\big)^{1/2}$.
- `d-V` (definition) : $V=D(a)$, $(u,v)_a=a(u,v)+\langle u,v\rangle_H$ ; on a $\|v\|_H\le\|v\|_a$ pour $v\in V$.
- `d-f` (definition, locale) : Soit $f\in H$.
- `v-hilb` (consequence) : $(V,(\cdot,\cdot)_a)$ est un espace de Hilbert réel.
- `b-coer` (consequence) : $(u,v)\mapsto(u,v)_a$ est bilinéaire, continue et coercive de constante $1$ sur $V$.
- `l-f` (inegalite) : $v\mapsto\langle f,v\rangle_H$ est linéaire sur $V$ et $|\langle f,v\rangle_H|\le\|f\|_H\|v\|_a$.
- `lm` (application-theoreme) : Il existe un unique $Tf\in V$ tel que $(Tf,v)_a=\langle f,v\rangle_H$ pour tout $v\in V$.
- `t-lin` (consequence) : $T:H\to V\subset H$ est linéaire.
- `t-borne` (inegalite) : $\|Tf\|_H\le\|Tf\|_a\le\|f\|_H$ : $T$ est borné sur $H$ et $\|T\|\le 1$.
- `t-sym` (egalite) : $\langle Tf,g\rangle_H=\langle f,Tg\rangle_H$ pour tous $f,g\in H$.
- `t-pos` (inegalite) : $\langle Tf,f\rangle_H=\|Tf\|_a^2\ge 0$.
- `t-inj` (consequence) : $T$ est injectif.
- `t-dense` (consequence) : $\mathrm{Im}\,T$ est dense dans $H$.
- `a-def` (consequence) : $A=T^{-1}-I$ est bien défini sur $D(A)=\mathrm{Im}\,T\subset D(a)$.
- `a-ident` (egalite) : $a(u,v)=\langle Au,v\rangle_H$ pour $u\in D(A)$ et $v\in D(a)$.
- `a-pos` (inegalite) : $\langle Au,u\rangle_H=a(u,u)\ge 0$ pour $u\in D(A)$.
- `a-sa` (consequence) : $A$ est auto-adjoint.
- `a-inv` (egalite) : $I+A=T^{-1}$, c'est-à-dire $T=(I+A)^{-1}$.
- `fin` (conclusion) : $T=(I+A)^{-1}$ est borné, symétrique, positif, injectif à image dense, et $A$ est auto-adjoint positif avec $a(u,v)=\langle Au,v\rangle_H$.
- `x-inv-borne` (consequence, DISTRACTEUR) : $T^{-1}=I+A$ est borné sur $H$.
- `x-compact` (consequence, DISTRACTEUR) : $T$ est un opérateur compact de $H$.

Règles :
- `h-sym` + `h-pos` + `h-fermee` + `d-V` ⟹ `v-hilb` par « Symétrie et positivité font de $(\cdot,\cdot)_a$ un produit scalaire ; la fermeture donne la complétude. »
- `v-hilb` + `d-V` ⟹ `b-coer` par « $(u,u)_a=\|u\|_a^2$ et $|(u,v)_a|\le\|u\|_a\|v\|_a$. »
- `d-f` + `d-V` ⟹ `l-f` par « Cauchy–Schwarz dans $H$, puis $\|v\|_H\le\|v\|_a$. [cauchy-schwarz] »
- `v-hilb` + `b-coer` + `l-f` ⟹ `lm` par « Théorème de Lax–Milgram dans l’espace de Hilbert $(V,(\cdot,\cdot)_a)$. [lax-milgram] » (chemin lax-milgram)
- `v-hilb` + `l-f` ⟹ `lm` par « Théorème de Riesz dans $(V,(\cdot,\cdot)_a)$ appliqué à $v\mapsto\langle f,v\rangle_H$. [riesz] » (chemin riesz)
- `lm` ⟹ `t-lin` par « $\alpha Tf+\beta Tg$ vérifie l'équation associée à $\alpha f+\beta g$ : unicité. »
- `lm` + `t-lin` + `d-V` ⟹ `t-borne` par « Tester par $v=Tf$ : $\|Tf\|_a^2=\langle f,Tf\rangle_H\le\|f\|_H\|Tf\|_a$. »
- `lm` + `h-sym` ⟹ `t-sym` par « Tester l'équation de $Tg$ par $v=Tf$, celle de $Tf$ par $v=Tg$, et utiliser la symétrie de $a$. »
- `lm` ⟹ `t-pos` par « $\langle Tf,f\rangle_H=\langle f,Tf\rangle_H=(Tf,Tf)_a$. »
- `lm` + `h-dense` ⟹ `t-inj` par « Si $Tf=0$, alors $\langle f,v\rangle_H=0$ pour tout $v\in D(a)$, dense : $f=0$. »
- `t-sym` + `t-borne` + `t-inj` ⟹ `t-dense` par « $(\mathrm{Im}\,T)^\perp=\mathrm{Ker}\,T^*=\mathrm{Ker}\,T=\{0\}$ pour $T$ borné symétrique. »
- `t-inj` + `t-lin` ⟹ `a-def` par « $T$ est une bijection linéaire de $H$ sur $\mathrm{Im}\,T\subset V$. »
- `lm` + `a-def` ⟹ `a-ident` par « Pour $u=Tf$ : $a(u,v)=\langle f,v\rangle_H-\langle u,v\rangle_H=\langle T^{-1}u-u,v\rangle_H$. »
- `a-ident` + `h-pos` ⟹ `a-pos` par « Prendre $v=u$ dans l'identité de forme. »
- `t-sym` + `t-borne` + `t-dense` + `a-def` ⟹ `a-sa` par « Si $\langle T^{-1}u,v\rangle=\langle u,w\rangle$ pour tout $u=Th$, alors $\langle h,v\rangle=\langle h,Tw\rangle$ pour tout $h$, donc $v=Tw\in\mathrm{Im}\,T$ : $T^{-1}$, symétrique, est auto-adjoint, et $A=T^{-1}-I$ aussi. »
- `a-def` ⟹ `a-inv` par « Définition de $A$. »
- `t-borne` + `t-sym` + `t-pos` + `t-inj` + `t-dense` + `a-ident` + `a-pos` + `a-sa` + `a-inv` ⟹ `fin` par « Réunion des propriétés établies. »

Justifications sans règle (séduisantes ou fausses) : « Théorème de représentation des formes fermées. » ; « Riesz dans $H$ : $f$ se représente par lui-même, donc $Tf=f$. » ; « Un opérateur symétrique est auto-adjoint. »

Pièges :
- `lm` par « Théorème de représentation des formes fermées. » → incorrect [circularite] : C’est le théorème que cette construction démontre : il ne peut pas en fournir la première étape.
- `lm` par « Riesz dans $H$ : $f$ se représente par lui-même, donc $Tf=f$. » → incorrect [hypotheses-theoreme] : Riesz dans $H$ ignore la forme $a$ : l'équation porte sur $(\cdot,\cdot)_a$, et c'est dans $(V,(\cdot,\cdot)_a)$ qu'il faut représenter $v\mapsto\langle f,v\rangle_H$. — Contre-exemple : Pour $a(u,v)=\int_0^1u'v'$ sur $H^1_0(]0,1[)$ et $f=1$, on a $Tf=1-\frac{\cosh(x-1/2)}{\cosh(1/2)}\neq f$.
- `a-sa` par « Un opérateur symétrique est auto-adjoint. » → incorrect [symetrie-autoadjonction] : Pour un opérateur non borné, la symétrie ne donne que $A\subset A^*$ : il faut contrôler le domaine de l'adjoint. — Contre-exemple : $S=-\frac{d^2}{dx^2}$ sur $C^\infty_c(]0,1[)$ est symétrique ; son adjoint a pour domaine $H^2(]0,1[)$, strictement plus grand.
- `x-inv-borne` → incorrect [domaine-operateur] : $T^{-1}=I+A$ n'est borné que si $A$ l'est : en général $A$ est un opérateur non borné, défini seulement sur $\mathrm{Im}\,T$. — Contre-exemple : Pour $a(u,v)=\int_0^1u'v'$ sur $H^1_0(]0,1[)$ : $\varphi_k=\sqrt2\sin(k\pi x)$ est unitaire et $\|T^{-1}\varphi_k\|_H=1+k^2\pi^2\to+\infty$.
- `x-compact` → incorrect [hypotheses-theoreme] : Aucune hypothèse de compacité n'est faite : la compacité de $T$ demande une injection compacte de $D(a)$ dans $H$. — Contre-exemple : Pour $a=0$ sur $D(a)=H$ de dimension infinie, la forme est fermée et $T=I$, qui n'est pas compact.

Retraits :
- `h-dense` (nécessaire) : Le noyau de $T$ est $D(a)^\perp$ : sans densité, $T$ n'est plus injectif et $T^{-1}$ n'existe pas. — Contre-exemple : $H=\mathbb R^2$, $D(a)=\mathbb R\times\{0\}$, $a(u,v)=u_1v_1$ : $T(f_1,f_2)=(f_1/2,0)$, donc $T(0,1)=0$.
- `h-fermee` (nécessaire) : Sans complétude de $V$, ni Lax–Milgram ni Riesz ne s'appliquent, et l'équation peut n'avoir aucune solution dans $D(a)$. — Contre-exemple : $a(u,v)=\int_0^1u'v'$ sur $D(a)=C^\infty_c(]0,1[)$, $f=1$ : une solution $u\in C^\infty_c$ serait nulle près de $0$, où l'équation $-u''+u=1$ tomberait en défaut.

Solution :
**Espace de Hilbert.** Par symétrie et positivité, $(\cdot,\cdot)_a$ est un produit scalaire sur $V=D(a)$ ; la fermeture de $a$ en fait un espace de Hilbert. La forme $(u,v)\mapsto(u,v)_a$ est continue et coercive de constante $1$.

**Existence de $Tf$.** Pour $f\in H$, $|\langle f,v\rangle_H|\le\|f\|_H\|v\|_H\le\|f\|_H\|v\|_a$. Lax–Milgram (ou simplement Riesz dans $V$) donne un unique $Tf\in V$ tel que $(Tf,v)_a=\langle f,v\rangle_H$ pour tout $v\in V$. L'unicité donne la linéarité de $T$.

**Propriétés de $T$.** Avec $v=Tf$ : $\|Tf\|_a^2=\langle f,Tf\rangle_H\le\|f\|_H\|Tf\|_a$, donc $\|Tf\|_H\le\|Tf\|_a\le\|f\|_H$. En testant l'équation de $Tg$ par $Tf$ et celle de $Tf$ par $Tg$, la symétrie de $a$ donne $\langle Tf,g\rangle_H=\langle f,Tg\rangle_H$. Ensuite $\langle Tf,f\rangle_H=\|Tf\|_a^2\ge 0$. Si $Tf=0$, alors $\langle f,v\rangle_H=0$ pour tout $v\in D(a)$, dense, donc $f=0$. Enfin $(\mathrm{Im}\,T)^\perp=\mathrm{Ker}\,T=\{0\}$.

**L'opérateur $A$.** On pose $A=T^{-1}-I$ sur $D(A)=\mathrm{Im}\,T\subset D(a)$. Pour $u=Tf$ et $v\in D(a)$ : $a(u,v)=\langle f,v\rangle_H-\langle u,v\rangle_H=\langle Au,v\rangle_H$, d'où $\langle Au,u\rangle_H=a(u,u)\ge 0$. L'opérateur $T^{-1}$ est symétrique ; si $\langle T^{-1}u,v\rangle_H=\langle u,w\rangle_H$ pour tout $u=Th$, alors $\langle h,v\rangle_H=\langle Th,w\rangle_H=\langle h,Tw\rangle_H$ pour tout $h$, donc $v=Tw\in D(T^{-1})$ et $T^{-1}v=w$. Ainsi $T^{-1}$ est auto-adjoint, et $A$ aussi. Par construction, $T=(I+A)^{-1}$.

**Vigilance.** $T^{-1}$ n'est pas borné en général, et $T$ n'est pas compact sans hypothèse supplémentaire.

Indices :
1. Dans quel espace de Hilbert l'équation $a(u,v)+\langle u,v\rangle_H=\langle f,v\rangle_H$ est-elle une équation de Lax–Milgram ?
2. Teste l'équation par $v=Tf$ pour la borne ; croise les équations de $Tf$ et $Tg$ pour la symétrie ; utilise la densité de $D(a)$ pour l'injectivité.
3. Pour l'auto-adjonction de $T^{-1}$ : si $\langle T^{-1}u,v\rangle=\langle u,w\rangle$ pour tout $u=Th$, réécris cette égalité avec $h$ et identifie $v$.

Erreurs fréquentes :
- Invoquer le théorème de représentation pour construire la résolvante qui sert à le démontrer.
- Appliquer Riesz dans $H$ au lieu de $(V,(\cdot,\cdot)_a)$.
- Conclure à l'auto-adjonction de $A$ à partir de la seule symétrie.

Variante : Dans $H=\mathbb R^2$ euclidien, soit $a(u,v)=u_1v_1+3u_2v_2$ sur $D(a)=\mathbb R^2$. Calculer $T$, l'opérateur $A=T^{-1}-I$, et $T(1,1)$.

Solution de la variante : L'équation $a(u,v)+\langle u,v\rangle=\langle f,v\rangle$ pour tout $v$ s'écrit $2u_1=f_1$ et $4u_2=f_2$. Donc $T=\mathrm{diag}(\frac12,\frac14)$, $A=T^{-1}-I=\mathrm{diag}(1,3)$, et l'on vérifie $a(u,v)=\langle Au,v\rangle$. Enfin $T(1,1)=(\frac12,\frac14)$.

Vérification : {"origin":"polycopie","review":"machine","notes":"Architecture du polycopié (p. PDF 25) ; les propriétés de T, affirmées sans preuve, sont démontrées."}

## Exercice difficile `formes-fermees.difficile` : Domaine de forme et domaine d'opérateur du Laplacien de Dirichlet

Énoncé : Soit $\Omega\subset\mathbb R^d$ un ouvert borné lipschitzien, $H=L^2(\Omega)$, $a(u,v)=\int_\Omega\nabla u\cdot\nabla v$ sur $D(a)=H^1_0(\Omega)$, et $A\ge 0$ l'opérateur auto-adjoint associé. On admet une base orthonormée $(\varphi_k)$ de $H$ avec $\varphi_k\in D(A)$, $A\varphi_k=\lambda_k\varphi_k$, $\lambda_k>0$, et l'on note $c_k(u)=\langle u,\varphi_k\rangle_H$. (i) Montrer que $D(A^{1/2})=H^1_0(\Omega)=D(a)$ et $a(u,v)=\langle A^{1/2}u,A^{1/2}v\rangle_H$. (ii) Pour $\Omega=]0,1[$ et $u(x)=\min(x,1-x)$, montrer que $u\in D(a)$ et $u\notin D(A)$.
Source : {"doc":"polycopie","pdfPage":43,"label":"Exercice 30, difficile (p. PDF 43) ; énoncé de la section 6.6 (p. PDF 25)"} — prérequis : poincare, spectral-compact, spectral-general

But : `fin` — usage : application

Nœuds :
- `h-poinc` (hypothese) : Par Poincaré, $a(u,u)^{1/2}$ est sur $H^1_0(\Omega)$ une norme équivalente à celle de $H^1$ : $(H^1_0(\Omega),a)$ est un espace de Hilbert.
- `h-rep` (hypothese) : $D(A)\subset D(a)$ et $a(u,v)=\langle Au,v\rangle_H$ pour $u\in D(A)$, $v\in D(a)$.
- `h-base` (hypothese) : $(\varphi_k)$ est une base orthonormée de $H$, $\varphi_k\in D(A)$, $A\varphi_k=\lambda_k\varphi_k$, $\lambda_k>0$.
- `d-calc` (definition) : Calcul fonctionnel : $D(A^{1/2})=\{u\in H : \sum_k\lambda_kc_k(u)^2<\infty\}$, $A^{1/2}u=\sum_k\sqrt{\lambda_k}\,c_k(u)\varphi_k$, et $D(A)=\{u\in H : \sum_k\lambda_k^2c_k(u)^2<\infty\}$.
- `h-1d` (hypothese) : Pour $\Omega=]0,1[$ : $\varphi_k(x)=\sqrt2\sin(k\pi x)$ et $\lambda_k=k^2\pi^2$.
- `d-u` (definition) : $u(x)=\min(x,1-x)$ sur $[0,1]$.
- `o-orth` (egalite) : $a(\varphi_j,v)=\lambda_j\langle\varphi_j,v\rangle_H$ pour $v\in H^1_0(\Omega)$ ; en particulier $a(\varphi_j,\varphi_k)=\lambda_j\delta_{jk}$.
- `o-onb` (consequence) : $e_k=\varphi_k/\sqrt{\lambda_k}$ forme une famille orthonormée de $(H^1_0(\Omega),a)$.
- `o-total` (consequence) : Si $v\in H^1_0(\Omega)$ et $a(v,e_k)=0$ pour tout $k$, alors $v=0$.
- `o-hilb` (consequence) : $(e_k)$ est une base hilbertienne de $(H^1_0(\Omega),a)$.
- `c-coef` (egalite) : Pour $u\in H^1_0(\Omega)$ : $a(u,e_k)=\sqrt{\lambda_k}\,c_k(u)$.
- `c-pars` (egalite) : Pour $u\in H^1_0(\Omega)$ : $a(u,u)=\sum_k\lambda_kc_k(u)^2<\infty$ ; donc $H^1_0(\Omega)\subset D(A^{1/2})$.
- `c-rec` (inclusion) : Si $\sum_k\lambda_kc_k(u)^2<\infty$, les sommes partielles $\sum_{k\le N}c_k(u)\varphi_k$ convergent dans $(H^1_0(\Omega),a)$ et dans $H$, vers $u$ : $D(A^{1/2})\subset H^1_0(\Omega)$.
- `eq-dom` (egalite) : $D(A^{1/2})=H^1_0(\Omega)=D(a)$.
- `eq-forme` (egalite) : Pour $u,v\in H^1_0(\Omega)$ : $a(u,v)=\sum_k\lambda_kc_k(u)c_k(v)=\langle A^{1/2}u,A^{1/2}v\rangle_H$.
- `s-in` (consequence) : $u\in H^1_0(]0,1[)=D(a)$, avec $u'=\mathbb 1_{]0,1/2[}-\mathbb 1_{]1/2,1[}$.
- `s-coef` (egalite) : $c_k(u)=\dfrac{2\sqrt2\,\sin(k\pi/2)}{k^2\pi^2}$.
- `s-forme` (egalite, calcul rational) : $a(u,u)=\int_0^1|u'|^2=1$.
  - valeur attendue : "1"
- `s-div` (egalite, calcul rational) : Pour $k$ impair, $\lambda_k^2c_k(u)^2=8$ ; donc $\sum_k\lambda_k^2c_k(u)^2=+\infty$.
  - valeur attendue : "8"
- `s-notA` (consequence) : $u\notin D(A)$.
- `s-strict` (inclusion) : Sur $]0,1[$ : $D(A)\subsetneq D(A^{1/2})=D(a)$.
- `fin` (conclusion) : $D(A^{1/2})=H^1_0(\Omega)=D(a)$ et $a(u,v)=\langle A^{1/2}u,A^{1/2}v\rangle_H$ ; sur $]0,1[$, le domaine d'opérateur est strictement plus petit que le domaine de forme.
- `x-DA` (egalite, DISTRACTEUR) : $D(A)=H^1_0(\Omega)$.
- `x-H2` (egalite, DISTRACTEUR) : $D(A^{1/2})=H^2(\Omega)\cap H^1_0(\Omega)$.
- `x-forme-tout` (egalite, DISTRACTEUR) : $a(u,v)=\langle Au,v\rangle_H$ pour tous $u,v\in H^1_0(\Omega)$.
- `x-lip-H2` (egalite, DISTRACTEUR) : $D(A)=H^2(\Omega)\cap H^1_0(\Omega)$ pour tout ouvert borné lipschitzien $\Omega$.

Règles :
- `h-rep` + `h-base` ⟹ `o-orth` par « Identité de forme avec $u=\varphi_j\in D(A)$, puis $v=\varphi_k$ et orthonormalité dans $H$. »
- `o-orth` ⟹ `o-onb` par « $a(e_j,e_k)=\lambda_j\delta_{jk}/\sqrt{\lambda_j\lambda_k}=\delta_{jk}$. »
- `o-orth` + `h-base` ⟹ `o-total` par « $a(v,\varphi_k)=\lambda_k\langle v,\varphi_k\rangle_H$ : tous les coefficients de $v$ dans la base $(\varphi_k)$ de $H$ sont nuls. »
- `o-onb` + `o-total` + `h-poinc` ⟹ `o-hilb` par « Une famille orthonormée totale d’un espace de Hilbert en est une base hilbertienne. »
- `o-orth` ⟹ `c-coef` par « $a(u,\varphi_k)=a(\varphi_k,u)=\lambda_k\langle\varphi_k,u\rangle_H$, puis division par $\sqrt{\lambda_k}$. »
- `o-hilb` + `c-coef` + `d-calc` ⟹ `c-pars` par « Égalité de Parseval dans $(H^1_0(\Omega),a)$, puis définition de $D(A^{1/2})$. »
- `o-hilb` + `h-base` + `h-poinc` + `d-calc` ⟹ `c-rec` par « $a\big(\sum_{M<k\le N}c_k\varphi_k\big)=\sum_{M<k\le N}\lambda_kc_k^2$ : suite de Cauchy dans un Hilbert ; les deux limites coïncident car $\|\cdot\|_H\le C\,a(\cdot,\cdot)^{1/2}$. »
- `c-pars` + `c-rec` ⟹ `eq-dom` par « Double inclusion. »
- `o-hilb` + `c-coef` + `d-calc` + `eq-dom` ⟹ `eq-forme` par « Parseval polarisé dans $(H^1_0(\Omega),a)$ et définition de $A^{1/2}$. »
- `d-u` + `h-1d` ⟹ `s-in` par « $u$ est lipschitzienne, nulle en $0$ et $1$ ; sa dérivée faible vaut $\pm1$. »
- `d-u` + `h-1d` ⟹ `s-coef` par « Deux intégrations par parties sur $]0,1/2[$ et $]1/2,1[$. »
- `s-in` ⟹ `s-forme` par « $|u'|=1$ presque partout sur $]0,1[$. »
- `s-coef` + `h-1d` ⟹ `s-div` par « $\lambda_k^2c_k^2=k^4\pi^4\cdot\frac{8}{k^4\pi^4}$ pour $k$ impair ; série grossièrement divergente. »
- `s-div` + `d-calc` ⟹ `s-notA` par « Description de $D(A)$ par les coefficients. »
- `s-in` + `s-notA` + `eq-dom` ⟹ `s-strict` par « $u\in D(a)=D(A^{1/2})$ et $u\notin D(A)$. »
- `eq-dom` + `eq-forme` + `s-forme` + `s-strict` ⟹ `fin` par « Réunion des résultats établis. »

Justifications sans règle (séduisantes ou fausses) : « Par définition de la racine carrée, $A^{1/2}$ et $A$ ont le même domaine. » ; « Extension de Friedrichs. »

Pièges :
- `x-DA` → incorrect [formes-fermees-domaine] : Le domaine de l'opérateur est strictement plus petit que le domaine de forme : il faut, en plus, $\sum\lambda_k^2c_k^2<\infty$. — Contre-exemple : $u(x)=\min(x,1-x)\in H^1_0(]0,1[)$, mais $\lambda_k^2c_k(u)^2=8$ pour $k$ impair.
- `x-H2` → incorrect [formes-fermees-domaine] : La racine carrée ne demande qu'une dérivée : son domaine est le domaine de forme $H^1_0$. — Contre-exemple : $u(x)=\min(x,1-x)$ appartient à $H^1_0(]0,1[)=D(A^{1/2})$ ; sa dérivée saute en $1/2$, donc $u\notin H^2(]0,1[)$.
- `x-forme-tout` → incorrect [domaine-operateur] : $Au$ n'a de sens que pour $u\in D(A)$ ; sur tout $H^1_0$, seule l'écriture $\langle A^{1/2}u,A^{1/2}v\rangle_H$ est définie. — Contre-exemple : Pour $u(x)=\min(x,1-x)$, $Au$ n'est pas défini puisque $u\notin D(A)$.
- `x-lip-H2` → incorrect [regularite-bord] : Le théorème de représentation donne $D(A)=\{u\in H^1_0(\Omega):\Delta u\in L^2(\Omega)\}$ ; l'égalité avec $H^2\cap H^1_0$ dépend de la régularité du bord. — Contre-exemple : Sur un ouvert plan à coin rentrant d'angle $3\pi/2$, $r^{2/3}\sin(2\theta/3)$ tronquée près du coin appartient à $D(A)$, et ses dérivées secondes, de l'ordre de $r^{-4/3}$, ne sont pas de carré intégrable.
- `eq-dom` par « Par définition de la racine carrée, $A^{1/2}$ et $A$ ont le même domaine. » → incorrect [formes-fermees-domaine] : $D(A^{1/2})$ est en général strictement plus grand que $D(A)$ : la condition porte sur $\sum\lambda_kc_k^2$, non sur $\sum\lambda_k^2c_k^2$.

Retraits :
- `h-poinc` (nécessaire) : Les sommes partielles convergent parce que $(H^1_0,a)$ est un Hilbert : sans l'équivalence de normes, l'argument tombe. — Contre-exemple : Sur $\Omega=\mathbb R$, $u_n(x)=u(x/n)$ donne $\|u_n'\|^2=\|u'\|^2/n$ et $\|u_n\|^2=n\|u\|^2$ : $\int|u'|^2$ n'est pas équivalente à la norme de $H^1(\mathbb R)$, et $(H^1(\mathbb R),a)$ n'est pas complet.
- `h-base` (nécessaire) : L'argument par séries disparaît. Le résultat reste vrai, mais il relève alors du calcul spectral général, non d'un calcul de coefficients. — Contre-exemple : Sur $L^2(\mathbb R)$, $-u''=\lambda u$ n'a aucune solution non nulle de carré intégrable : l'opérateur associé à $\int u'v'$ sur $H^1(\mathbb R)$ n'a aucun vecteur propre.

Solution :
**Base de forme.** Pour $v\in H^1_0$, l'identité de forme avec $u=\varphi_j\in D(A)$ donne $a(\varphi_j,v)=\lambda_j\langle\varphi_j,v\rangle_H$, d'où $a(\varphi_j,\varphi_k)=\lambda_j\delta_{jk}$. Les $e_k=\varphi_k/\sqrt{\lambda_k}$ sont orthonormés dans $(H^1_0,a)$, Hilbert par Poincaré. Si $a(v,e_k)=0$ pour tout $k$, tous les coefficients $\langle v,\varphi_k\rangle_H$ sont nuls et $v=0$ : $(e_k)$ est une base hilbertienne.

**Identification.** Pour $u\in H^1_0$, $a(u,e_k)=\sqrt{\lambda_k}\,c_k(u)$ et Parseval donne $a(u,u)=\sum\lambda_kc_k(u)^2<\infty$ : $u\in D(A^{1/2})$. Réciproquement, si $\sum\lambda_kc_k^2<\infty$, les sommes partielles $\sum_{k\le N}c_k\varphi_k$ sont de Cauchy dans $(H^1_0,a)$ ; leur limite dans $H^1_0$ est aussi leur limite dans $H$, c'est-à-dire $u$. Donc $D(A^{1/2})=H^1_0(\Omega)$, et par polarisation $a(u,v)=\sum\lambda_kc_k(u)c_k(v)=\langle A^{1/2}u,A^{1/2}v\rangle_H$.

**Inclusion stricte.** Sur $]0,1[$, $u(x)=\min(x,1-x)$ est lipschitzienne, nulle au bord : $u\in H^1_0$ et $a(u,u)=\int_0^1|u'|^2=1$. Deux intégrations par parties donnent $c_k(u)=2\sqrt2\sin(k\pi/2)/(k^2\pi^2)$, donc $\lambda_kc_k^2=8/(k^2\pi^2)$ et $\lambda_k^2c_k^2=8$ pour $k$ impair. La première série vaut $\frac8{\pi^2}\sum_{k\ \text{impair}}k^{-2}=1$, la seconde diverge : $u\in D(a)\setminus D(A)$.

**Lecture.** Le domaine de forme demande une dérivée ; le domaine d'opérateur en demande deux, au sens de $\Delta u\in L^2$, et son identification à $H^2\cap H^1_0$ dépend du bord.

Indices :
1. Que donne l'identité de forme quand on prend $u=\varphi_j$ ? Dans quel espace de Hilbert les $\varphi_k$ deviennent-ils orthogonaux ?
2. Normalise $\varphi_k$ dans $(H^1_0,a)$, montre que la famille est totale, puis compare Parseval dans $(H^1_0,a)$ avec la description spectrale de $D(A^{1/2})$.
3. Pour $u=\min(x,1-x)$ : $c_k(u)=2\sqrt2\sin(k\pi/2)/(k^2\pi^2)$, donc $\lambda_kc_k^2$ est sommable alors que $\lambda_k^2c_k^2=8$ pour $k$ impair.

Erreurs fréquentes :
- Identifier le domaine de l'opérateur au domaine de forme $H^1_0$.
- Écrire $\langle Au,v\rangle$ pour $u\in H^1_0$ quelconque.
- Affirmer $D(A)=H^2\cap H^1_0$ sans hypothèse sur le bord.

Variante : Sur $H=\ell^2$, soit $A$ l'opérateur diagonal $Ae_n=n\,e_n$ de domaine maximal, et $a(u,v)=\sum_n n\,u_nv_n$ sur $D(a)=\{u : \sum_n n\,u_n^2<\infty\}$. Montrer que $a$ est fermée, que $A$ lui est associé, et donner un élément de $D(a)\setminus D(A)$.

Solution de la variante : $\|u\|_a^2=\sum(n+1)u_n^2$ : $D(a)$ est un $\ell^2$ à poids, complet, et contient les suites finies, denses dans $\ell^2$. Pour $u\in D(A)$ et $v\in D(a)$, $a(u,v)=\sum n u_nv_n=\langle Au,v\rangle$, et l'unicité dans le théorème identifie l'opérateur associé à $A$ ; $D(A^{1/2})=D(a)$. La suite $u_n=n^{-3/2}$ vérifie $\sum n u_n^2=\sum n^{-2}<\infty$ et $\sum n^2u_n^2=\sum n^{-1}=+\infty$ : $u\in D(a)\setminus D(A)$.

Vérification : {"origin":"complement","review":"machine","notes":"Le polycopié renvoie au calcul spectral (p. PDF 25) ; l’identification par base de forme et l’exemple sont rédigés pour ProofLab."}