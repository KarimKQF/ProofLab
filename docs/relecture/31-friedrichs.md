# 31. Extension de Friedrichs (`friedrichs`) — polycopié p. PDF 26, section 6.7

## Fiche

Espaces : $H$ : espace de Hilbert, de produit scalaire $\langle\cdot,\cdot\rangle_H$. | $S:D(S)\subset H\to H$ : opérateur linéaire densément défini. | $m\in\mathbb R$ : borne inférieure ; « $S\ge mI$ » signifie $\langle Su,u\rangle_H\ge m\|u\|_H^2$ pour $u\in D(S)$.

Hypothèses :
- $S$ est symétrique et densément défini : $\langle Su,v\rangle_H=\langle u,Sv\rangle_H$ pour $u,v\in D(S)$.
- $S$ est minoré : $\langle Su,u\rangle_H\ge m\|u\|_H^2$ pour tout $u\in D(S)$. — Sans elle : Dans $L^2(]0,+\infty[)$ complexe, $S=i\frac{d}{dx}$ sur $C^\infty_c(]0,+\infty[)$ est symétrique, non minoré ; $S^*u=\pm iu$ a pour solutions $e^{x}$ et $e^{-x}$, dont une seule est de carré intégrable : les indices de défaut diffèrent et $S$ n'a aucune extension auto-adjointe.

Énoncé : Tout opérateur symétrique densément défini $S$ minoré par $mI$ admet une extension auto-adjointe $S_F$ également minorée par $mI$, dite extension de Friedrichs.

Bilan : {"existence":"$S_F=A+mI$, où $A$ est l'opérateur associé à la fermeture de la forme $q(u,v)=\\langle(S-m)u,v\\rangle_H$ sur $D(S)$.","autre":"Le domaine de forme de $S_F$ est le complété de $D(S)$ pour $\\|u\\|_q^2=q(u,u)+\\|u\\|_H^2$ ; pour $-\\frac{d^2}{dx^2}$ sur $C^\\infty_c(]0,1[)$, c'est $H^1_0$, et $S_F$ est la réalisation de Dirichlet."}

Preuve dans le polycopié : idee

Plan :
1. Poser $B=S-mI\ge 0$, $q(u,v)=\langle Bu,v\rangle_H$ sur $D(S)$ : forme symétrique positive, $\|u\|_q^2=q(u,u)+\|u\|_H^2\ge\|u\|_H^2$.
2. Fermabilité : soit $(u_n)$ de Cauchy pour $\|\cdot\|_q$ avec $u_n\to 0$ dans $H$. Pour $p$ fixé, $(u_n,u_p)_q=\langle u_n,(B+I)u_p\rangle_H\to 0$ quand $n\to\infty$, par symétrie de $B$. Alors $\|u_n\|_q^2=(u_n,u_n-u_p)_q+(u_n,u_p)_q\le\varepsilon\sup_k\|u_k\|_q+(u_n,u_p)_q$ dès que $n,p\ge N_\varepsilon$, d'où $\limsup_n\|u_n\|_q^2\le\varepsilon\sup_k\|u_k\|_q$ pour tout $\varepsilon>0$.
3. Fermeture : l'injection $D(S)\to H$ se prolonge au complété en une application injective (par fermabilité) ; on identifie ce complété à $D(\bar q)\subset H$. La forme $\bar q$ est symétrique, positive, fermée, densément définie.
4. Représentation : soit $A$ l'opérateur associé à $\bar q$. Pour $u\in D(S)$ et $v\in D(\bar q)$, limite de $v_n\in D(S)$ pour $\|\cdot\|_q$, $\bar q(u,v)=\lim\langle Bu,v_n\rangle_H=\langle Bu,v\rangle_H$ : donc $u\in D(A)$ et $Au=Bu$.
5. Conclusion : $S_F=A+mI$ est auto-adjoint, prolonge $S$, et $\langle S_Fu,u\rangle_H=\bar q(u,u)+m\|u\|_H^2\ge m\|u\|_H^2$.

Vigilance :
- Une forme symétrique positive densément définie n’est pas toujours fermable : la fermabilité vient ici de l’opérateur symétrique.
- Fermer la forme n’est pas fermer le graphe : les domaines obtenus diffèrent.
- Un même opérateur symétrique peut avoir plusieurs extensions auto-adjointes ($-\frac{d^2}{dx^2}$ : Dirichlet, Neumann, conditions mixtes) ; Friedrichs en choisit une.
- $S\subset B$ entraîne $B^*\subset S^*$ : le passage à l'adjoint renverse les inclusions.

Vérification : {"origin":"complement","review":"machine","notes":"Le polycopié ne donne que l’idée de preuve (p. PDF 26) ; démonstration complète rédigée pour ProofLab."}

Définition « Extension d’un opérateur » : $B$ est une extension de $S$, noté $S\subset B$, si $D(S)\subset D(B)$ et $Bu=Su$ pour tout $u\in D(S)$.

Définition « Forme fermable » : Une forme symétrique positive $q$ sur $D(q)\subset H$ est fermable si toute suite $(u_n)\subset D(q)$, de Cauchy pour $\|\cdot\|_q$ et tendant vers $0$ dans $H$, vérifie $\|u_n\|_q\to 0$ ; sa fermeture est alors définie sur le complété de $D(q)$, réalisé dans $H$.

## Contre-exemple `ce-friedrichs-non-fermable` : Forme non fermable
Assertion : Toute forme symétrique positive densément définie est fermable.
Tâche : Sur $C([0,1])\subset L^2(]0,1[)$, soit $q(u,v)=u(0)v(0)$ et $u_n(x)=\max(1-nx,0)$. Calcule $\lim_n\|u_n\|_q^2$, où $\|u\|_q^2=q(u,u)+\|u\|_{L^2}^2$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\lim_n\\|u_n\\|_q^2$","expected":"1"}
Explication : $\|u_n\|_{L^2}^2=\frac1{3n}\to 0$ et $(u_n-u_p)(0)=0$, donc $(u_n)$ est de Cauchy pour $\|\cdot\|_q$ et tend vers $0$ dans $L^2$. Pourtant $\|u_n\|_q^2=1+\frac1{3n}\to 1\neq 0$ : $q$ n'est pas fermable.

## Contre-exemple `ce-friedrichs-domaine` : Même expression, opérateurs différents
Assertion : Deux extensions auto-adjointes de $-\frac{d^2}{dx^2}$ sur $C^\infty_c(]0,1[)$ coïncident.
Tâche : Pour la réalisation de Neumann $A_N$, de domaine $\{u\in H^2 : u'(0)=u'(1)=0\}$, donne la plus petite valeur propre.
Vérification : {"kind":"rational","prompt":"Plus petite valeur propre de $A_N$","expected":"0"}
Explication : $A_N1=0$ et $A_N\ge 0$ : la plus petite valeur propre est $0$. Pour la réalisation de Dirichlet, $A_Du=0$ entraîne $u=0$, et la plus petite valeur propre est $\pi^2$. Les deux opérateurs diffèrent.

## Exercice facile `friedrichs.facile` : Extension d’un opérateur : définition exacte

Énoncé : Dans $H=L^2(]0,1[)$, on considère trois opérateurs agissant par $u\mapsto -u''$ : $S$ de domaine $C^\infty_c(]0,1[)$, $A_D$ de domaine $H^2(]0,1[)\cap H^1_0(]0,1[)$, et $T$ de domaine $H^2(]0,1[)$. (a) Écrire la définition exacte de « $B$ est une extension de $S$ ». (b) Montrer que $S\subset A_D\subset T$. (c) Montrer que $S$ est symétrique et que $T$ ne l'est pas : une extension d'un opérateur symétrique n'est pas symétrique en général.
Source : {"doc":"polycopie","pdfPage":43,"label":"Exercice 31, facile (p. PDF 43)"} — prérequis : adjoint

But : `fin` — usage : application

Nœuds :
- `h-H` (hypothese) : $H=L^2(]0,1[)$ est un Hilbert réel, et $C^\infty_c(]0,1[)$ y est dense.
- `d-ext` (definition) : $S\subset B$ (« $B$ est une extension de $S$ ») signifie : $D(S)\subset D(B)$ et $Bu=Su$ pour tout $u\in D(S)$.
- `d-S` (definition) : $Su=-u''$, $D(S)=C^\infty_c(]0,1[)$.
- `d-AD` (definition) : $A_Du=-u''$, $D(A_D)=H^2(]0,1[)\cap H^1_0(]0,1[)$.
- `d-T` (definition) : $Tu=-u''$, $D(T)=H^2(]0,1[)$.
- `inc1` (inclusion) : $C^\infty_c(]0,1[)\subset H^2(]0,1[)\cap H^1_0(]0,1[)$.
- `inc2` (inclusion) : $H^2(]0,1[)\cap H^1_0(]0,1[)\subset H^2(]0,1[)$.
- `same` (egalite) : Sur l'intersection de leurs domaines, $S$, $A_D$ et $T$ prennent la même valeur $-u''$ (dérivée faible).
- `ext1` (consequence) : $S\subset A_D$.
- `ext2` (consequence) : $A_D\subset T$.
- `ext3` (consequence) : $S\subset T$.
- `ipp-S` (egalite) : Pour $u,v\in C^\infty_c(]0,1[)$ : $\langle Su,v\rangle_H=\int_0^1u'v'=\langle u,Sv\rangle_H$.
- `sym-S` (consequence) : $S$ est symétrique : densément défini et $\langle Su,v\rangle_H=\langle u,Sv\rangle_H$ sur $D(S)$.
- `calc` (egalite, calcul rational) : Pour $u(x)=x^2$ et $v=1$, éléments de $D(T)$ : $\langle Tu,v\rangle_H-\langle u,Tv\rangle_H=-2$.
  - valeur attendue : "-2"
- `nonsym-T` (consequence) : $T$ n'est pas symétrique.
- `fin` (conclusion) : $S\subset A_D\subset T$ au sens des extensions ; $S$ est symétrique, son extension $T$ ne l'est pas.
- `x-sym-ext` (consequence, DISTRACTEUR) : Toute extension d'un opérateur symétrique est symétrique ; en particulier $T$ l'est.
- `x-meme-expr` (egalite, DISTRACTEUR) : $S=A_D$, puisque les deux opérateurs sont donnés par $-\frac{d^2}{dx^2}$.
- `x-adj` (inclusion, DISTRACTEUR) : $S\subset T$ entraîne $D(S^*)\subset D(T^*)$.

Règles :
- `d-S` + `d-AD` ⟹ `inc1` par « Une fonction de $C^\infty_c(]0,1[)$ est de classe $C^\infty$, à support compact : elle est dans $H^2$ et s'annule près du bord. »
- `d-AD` + `d-T` ⟹ `inc2` par « Une intersection est incluse dans chacun des ensembles. »
- `d-S` + `d-AD` + `d-T` ⟹ `same` par « Les trois opérateurs sont définis par la même formule, la dérivée seconde faible coïncidant avec la dérivée classique sur $C^\infty_c$. »
- `inc1` + `same` + `d-ext` ⟹ `ext1` par « Définition d'une extension : inclusion des domaines et coïncidence sur le plus petit. »
- `inc2` + `same` + `d-ext` ⟹ `ext2` par « Définition d'une extension : inclusion des domaines et coïncidence sur le plus petit. »
- `ext1` + `ext2` ⟹ `ext3` par « Transitivité de la relation d’extension. »
- `d-S` ⟹ `ipp-S` par « Deux intégrations par parties ; les termes de bord sont nuls, car $u$ et $v$ s'annulent près de $0$ et de $1$. »
- `ipp-S` + `h-H` ⟹ `sym-S` par « Définition d'un opérateur symétrique, la densité de $C^\infty_c(]0,1[)$ dans $H$ étant acquise. »
- `d-T` ⟹ `calc` par « $Tu=-2$, $Tv=0$ : $\langle Tu,v\rangle_H=\int_0^1(-2)=-2$ et $\langle u,Tv\rangle_H=0$. »
- `calc` ⟹ `nonsym-T` par « Un couple qui met en défaut l’égalité suffit à réfuter la symétrie. »
- `ext1` + `ext2` + `ext3` + `sym-S` + `nonsym-T` ⟹ `fin` par « Réunion des résultats établis. »

Justifications sans règle (séduisantes ou fausses) : « Même expression différentielle, donc même opérateur. » ; « La symétrie se transmet aux extensions. » ; « C’est évident. »

Pièges :
- `x-sym-ext` → incorrect [symetrie-autoadjonction] : Agrandir le domaine peut faire apparaître des termes de bord : la symétrie ne se transmet pas aux extensions. — Contre-exemple : $S\subset T$, $S$ est symétrique, et $\langle T(x^2),1\rangle_H-\langle x^2,T1\rangle_H=-2$.
- `x-meme-expr` → incorrect [domaine-operateur] : Un opérateur est la donnée d’une expression et d’un domaine : deux domaines différents donnent deux opérateurs différents. — Contre-exemple : $x(1-x)\in D(A_D)$ n'appartient pas à $D(S)=C^\infty_c(]0,1[)$.
- `x-adj` → incorrect [friedrichs-extension] : Le passage à l'adjoint renverse les inclusions : $S\subset T$ entraîne $T^*\subset S^*$. — Contre-exemple : $1\in D(S^*)$, car $\langle Su,1\rangle_H=0$ pour $u\in C^\infty_c$. Si $1\in D(T^*)$, on aurait $T^*1=0$ (tester par $C^\infty_c$), puis $\langle T(x^2),1\rangle_H=0$, alors que cette quantité vaut $-2$.
- `ext1` par « Même expression différentielle, donc même opérateur. » → incorrect [domaine-operateur] : La formule ne suffit pas : l'extension exige l'inclusion des domaines, à vérifier séparément. — Contre-exemple : $B=-\frac{d^2}{dx^2}$ sur $\{u\in H^2(]0,1[) : u(1/2)=0\}$ a la même formule, mais $D(S)\not\subset D(B)$.
- `nonsym-T` par « La symétrie se transmet aux extensions. » → incorrect [symetrie-autoadjonction] : Cette justification est fausse, et elle conduirait d’ailleurs à la conclusion opposée.
- `ext1` par « C’est évident. » → a-justifier [justification-absente] : Deux conditions sont à vérifier : l’inclusion des domaines et la coïncidence des valeurs.

Retraits :
- `inc1` (nécessaire) : Sans inclusion des domaines, il n’y a pas d’extension, quelle que soit la formule. — Contre-exemple : $B=-\frac{d^2}{dx^2}$ sur $\{u\in H^2(]0,1[) : u(1/2)=0\}$ : la formule est la même, mais $B$ n'est pas une extension de $S$.
- `same` (nécessaire) : L’inclusion des domaines ne suffit pas : les valeurs doivent coïncider sur le plus petit domaine. — Contre-exemple : $B=-\frac{d^2}{dx^2}+I$ sur $H^2(]0,1[)$ : $D(S)\subset D(B)$, mais $Bu=Su+u\neq Su$ pour $u\neq 0$.

Solution :
**Définition.** $B$ est une extension de $S$, noté $S\subset B$, lorsque $D(S)\subset D(B)$ et $Bu=Su$ pour tout $u\in D(S)$ : le graphe de $S$ est contenu dans celui de $B$.

**Inclusions.** $C^\infty_c(]0,1[)\subset H^2\cap H^1_0$, car une telle fonction est régulière et nulle près du bord ; $H^2\cap H^1_0\subset H^2$. Les trois opérateurs agissent par $-u''$. Donc $S\subset A_D\subset T$.

**Symétrie de $S$.** $D(S)$ est dense dans $L^2$ et, pour $u,v\in C^\infty_c(]0,1[)$, deux intégrations par parties sans terme de bord donnent $\langle Su,v\rangle=\int_0^1u'v'=\langle u,Sv\rangle$.

**$T$ n'est pas symétrique.** Pour $u=x^2$, $v=1$ : $\langle Tu,v\rangle=-2$ et $\langle u,Tv\rangle=0$. La différence vaut $-2$ : le terme de bord $[u'v-uv']_0^1$ ne s'annule plus.

**Vigilance.** Les inclusions s'inversent par passage à l'adjoint : $S\subset T$ entraîne $T^*\subset S^*$.

Indices :
1. Un opérateur est un couple (domaine, formule). Que faut-il comparer pour dire que $B$ prolonge $S$ ?
2. Compare les domaines deux à deux, puis la formule. Pour la symétrie, intègre par parties et regarde les termes de bord.
3. Pour $T$, essaie $u(x)=x^2$ et $v=1$ : le terme de bord $[u'v-uv']_0^1$ ne s'annule pas.

Erreurs fréquentes :
- Identifier deux opérateurs parce qu’ils ont la même expression différentielle.
- Croire que la symétrie passe aux extensions.
- Écrire $D(S^*)\subset D(T^*)$ lorsque $S\subset T$.

Variante : Dans $H=L^2(]0,1[)$, soit $N=-\frac{d^2}{dx^2}$ de domaine $\{u\in H^2(]0,1[) : u'(0)=u'(1)=0\}$. Montrer que $N$ est une extension symétrique de $S$, et calculer $\langle Nu,u\rangle_H$ pour $u(x)=3x^2-2x^3$.

Solution de la variante : $C^\infty_c(]0,1[)\subset D(N)$ (fonctions et dérivées nulles près du bord), et $N$ agit par $-u''$ : $S\subset N$. Pour $u,v\in D(N)$, $\langle Nu,v\rangle=-[u'v]_0^1+\int_0^1u'v'=\int_0^1u'v'$, expression symétrique en $u$ et $v$ : $N$ est symétrique. Pour $u(x)=3x^2-2x^3$, $u'(x)=6x(1-x)$ s'annule en $0$ et $1$, donc $u\in D(N)$, et $\langle Nu,u\rangle=\int_0^136x^2(1-x)^2\,dx=\frac65$.

Graphe de la variante :
But : `fin` — usage : application

Nœuds :
- `d-ext` (definition) : $S\subset B$ signifie : $D(S)\subset D(B)$ et $Bu=Su$ pour $u\in D(S)$.
- `d-S` (definition) : $Su=-u''$, $D(S)=C^\infty_c(]0,1[)$, dense dans $H=L^2(]0,1[)$.
- `d-N` (definition) : $Nu=-u''$, $D(N)=\{u\in H^2(]0,1[) : u'(0)=u'(1)=0\}$.
- `d-u` (definition) : $u(x)=3x^2-2x^3$.
- `inc` (inclusion) : $C^\infty_c(]0,1[)\subset D(N)$.
- `ext` (consequence) : $S\subset N$.
- `ipp` (egalite) : Pour $u,v\in D(N)$ : $\langle Nu,v\rangle_H=\int_0^1u'v'$.
- `sym` (consequence) : $N$ est symétrique.
- `u-in` (consequence) : $u\in D(N)$.
- `val` (egalite, calcul rational) : $\langle Nu,u\rangle_H=\frac65$.
  - valeur attendue : "6/5"
- `fin` (conclusion) : $N$ est une extension symétrique de $S$, et $\langle Nu,u\rangle_H=\frac65$.
- `x-herite` (consequence, DISTRACTEUR) : $N$ est symétrique parce que c'est une extension de l'opérateur symétrique $S$.

Règles :
- `d-S` + `d-N` ⟹ `inc` par « Une fonction de $C^\infty_c(]0,1[)$ et sa dérivée s'annulent près du bord. »
- `inc` + `d-ext` + `d-S` + `d-N` ⟹ `ext` par « Définition d’une extension. »
- `d-N` ⟹ `ipp` par « Intégration par parties : le terme de bord $[u'v]_0^1$ est nul car $u'(0)=u'(1)=0$. »
- `ipp` + `inc` ⟹ `sym` par « L'expression $\int_0^1u'v'$ est symétrique en $u$ et $v$, et $D(N)\supset D(S)$ est dense. »
- `d-u` + `d-N` ⟹ `u-in` par « $u'(x)=6x(1-x)$ s'annule en $0$ et en $1$. »
- `ipp` + `u-in` ⟹ `val` par « $\int_0^136x^2(1-x)^2\,dx=36\cdot\frac1{30}$. »
- `ext` + `sym` + `val` ⟹ `fin` par « Réunion des résultats établis. »

Justifications sans règle (séduisantes ou fausses) : « La symétrie se transmet aux extensions. »

Pièges :
- `x-herite` → incorrect [symetrie-autoadjonction] : La symétrie de $N$ vient des conditions $u'(0)=u'(1)=0$, pas de celle de $S$ : l'extension $T$ de domaine $H^2$ n'est pas symétrique. — Contre-exemple : Pour $T$ de domaine $H^2(]0,1[)$ : $\langle T(x^2),1\rangle_H-\langle x^2,T1\rangle_H=-2$.
- `sym` par « La symétrie se transmet aux extensions. » → incorrect [symetrie-autoadjonction] : Cette justification est fausse : il faut calculer les termes de bord sur le domaine de l’extension.

Retraits :
- `ipp` (nécessaire) : Sans $u'(0)=u'(1)=0$, le terme de bord subsiste et la symétrie tombe. — Contre-exemple : Sur $H^2(]0,1[)$, $u=x^2$ et $v=1$ donnent $\langle Tu,v\rangle-\langle u,Tv\rangle=-2$.

Vérification : {"origin":"complement","review":"machine","notes":"L’exercice figure au polycopié sans corrigé ; définition et vérifications rédigées pour ProofLab."}

## Exercice intermediaire `friedrichs.intermediaire` : Fermeture de la forme de $-\frac{d^2}{dx^2}$ sur $C^\infty_c(]0,1[)$

Énoncé : Dans $H=L^2(]0,1[)$, soit $S=-\frac{d^2}{dx^2}$ de domaine $C^\infty_c(]0,1[)$ et $q(u,v)=\langle Su,v\rangle_H$ sur $D(S)$. Montrer que $q$ est fermable, que sa fermeture $\bar q$ a pour domaine $H^1_0(]0,1[)$ avec $\bar q(u,v)=\int_0^1u'v'$, et que l'opérateur associé $S_F$ est $-\frac{d^2}{dx^2}$ de domaine $H^2(]0,1[)\cap H^1_0(]0,1[)$.
Source : {"doc":"polycopie","pdfPage":43,"label":"Exercice 31, intermédiaire (p. PDF 43) ; idée de preuve de la section 6.7 (p. PDF 26)"} — prérequis : —

But : `fin` — usage : demonstration

Nœuds :
- `h-H` (hypothese) : $H=L^2(]0,1[)$ ; $H^1(]0,1[)$ est complet et $H^1_0(]0,1[)$ est l'adhérence de $C^\infty_c(]0,1[)$ dans $H^1(]0,1[)$.
- `d-S` (definition) : $Su=-u''$ sur $D(S)=C^\infty_c(]0,1[)$.
- `d-q` (definition) : $q(u,v)=\langle Su,v\rangle_H$ et $\|u\|_q^2=q(u,u)+\|u\|_H^2$ pour $u,v\in D(S)$.
- `ipp` (egalite) : $q(u,v)=\int_0^1u'v'$ : $q$ est symétrique et positive, et $S\ge 0$.
- `norme` (egalite) : $\|u\|_q=\|u\|_{H^1}$ pour $u\in D(S)$.
- `fermable` (consequence) : Si $(u_n)\subset D(S)$ est de Cauchy pour $\|\cdot\|_q$ et $u_n\to 0$ dans $H$, alors $\|u_n\|_q\to 0$ : $q$ est fermable.
- `dom` (egalite) : $D(\bar q)=H^1_0(]0,1[)$ et $\bar q(u,v)=\int_0^1u'v'$.
- `fermee` (consequence) : $\bar q$ est symétrique, positive, fermée et densément définie.
- `rep` (application-theoreme) : L'opérateur associé $S_F$ est auto-adjoint, positif, prolonge $S$, et $D(S_F)=\{u\in H^1_0 : \exists g\in L^2,\ \int_0^1u'v'=\int_0^1gv\ \ \forall v\in H^1_0\}$, $S_Fu=g$.
- `id` (egalite) : $D(S_F)=H^2(]0,1[)\cap H^1_0(]0,1[)$ et $S_Fu=-u''$.
- `fin` (conclusion) : La fermeture de $q$ est $\int_0^1u'v'$ sur $H^1_0(]0,1[)$, et l'extension de Friedrichs de $S$ est le Laplacien de Dirichlet $-\frac{d^2}{dx^2}$ sur $H^2\cap H^1_0$.
- `x-H1` (egalite, DISTRACTEUR) : $D(\bar q)=H^1(]0,1[)$.
- `x-fermable` (consequence, DISTRACTEUR) : Toute forme symétrique positive densément définie est fermable.

Règles :
- `d-S` + `d-q` ⟹ `ipp` par « Intégration par parties sans terme de bord, $u$ et $v$ s'annulant près de $0$ et de $1$. »
- `ipp` + `d-q` ⟹ `norme` par « $\|u\|_q^2=\|u'\|_H^2+\|u\|_H^2$. »
- `norme` + `h-H` ⟹ `fermable` par « Une suite de Cauchy pour $\|\cdot\|_q$ est de Cauchy dans $H^1$ complet ; sa limite dans $H^1$ est aussi sa limite dans $L^2$, donc nulle. »
- `norme` + `fermable` + `h-H` ⟹ `dom` par « Grâce à la fermabilité, le complété de $(C^\infty_c,\|\cdot\|_q)$ se réalise dans $H$ : c'est l'adhérence de $C^\infty_c$ dans $H^1$, et $\int_0^1u'v'$ passe à la limite. »
- `dom` + `ipp` + `h-H` ⟹ `fermee` par « $H^1_0$ est complet pour $\|\cdot\|_{H^1}=\|\cdot\|_{\bar q}$ et contient $C^\infty_c$, dense dans $L^2$. »
- `dom` + `fermee` + `ipp` ⟹ `rep` par « Théorème de représentation appliqué à $\bar q$ ; pour $u\in C^\infty_c$, $\bar q(u,v)=\langle -u'',v\rangle_H$ pour tout $v\in H^1_0$. [formes-fermees] »
- `rep` ⟹ `id` par « Tester par $v\in C^\infty_c$ : $-u''=g$ au sens des distributions, donc $u\in H^2$. Réciproquement, pour $u\in H^2\cap H^1_0$, le terme de bord $[u'v]_0^1$ est nul car $v\in H^1_0$. »
- `dom` + `fermee` + `id` ⟹ `fin` par « Réunion des résultats établis. »

Justifications sans règle (séduisantes ou fausses) : « $C^\infty_c(]0,1[)$ est dense dans $L^2$ : la fermeture de la forme est définie sur $L^2$ tout entier. » ; « La fermeture de la forme s'obtient en fermant le graphe de $S$. » ; « Théorème de Friedrichs. »

Pièges :
- `x-H1` → incorrect [densite-fermeture] : La fermeture se prend pour $\|\cdot\|_q=\|\cdot\|_{H^1}$ : on obtient l'adhérence de $C^\infty_c$ dans $H^1$, qui est $H^1_0$, strictement contenu dans $H^1$. — Contre-exemple : $|v(0)|\le\sqrt2\,\|v\|_{H^1}$ sur $H^1(]0,1[)$ : l'évaluation en $0$, nulle sur $C^\infty_c$, l'est sur son adhérence. La fonction $1$ n'appartient donc pas à $D(\bar q)$.
- `x-fermable` → incorrect [friedrichs-fermable] : La fermabilité se démontre : pour la forme de $S$, elle vient de la symétrie de l'opérateur, ou ici de l'injection $H^1\hookrightarrow L^2$. — Contre-exemple : $q(u,v)=u(0)v(0)$ sur $C([0,1])\subset L^2(]0,1[)$ : $u_n(x)=\max(1-nx,0)\to 0$ dans $L^2$, $(u_n)$ est de Cauchy pour $\|\cdot\|_q$, et $\|u_n\|_q^2\to 1$.
- `dom` par « $C^\infty_c(]0,1[)$ est dense dans $L^2$ : la fermeture de la forme est définie sur $L^2$ tout entier. » → incorrect [fermeture-espace] : La densité dans $L^2$ ne dit rien de la fermeture pour la norme de forme, qui contrôle aussi la dérivée. — Contre-exemple : $\mathbb 1_{]0,1/2[}\in L^2(]0,1[)$ n'appartient pas à $H^1(]0,1[)$.
- `dom` par « La fermeture de la forme s'obtient en fermant le graphe de $S$. » → incorrect [friedrichs-fermable] : Fermer le graphe de $S$ donne un opérateur de domaine $H^2_0(]0,1[)$ ($u$ et $u'$ nuls au bord) : ce n'est pas le domaine de forme. — Contre-exemple : $x(1-x)\in H^1_0(]0,1[)$, mais sa dérivée vaut $1$ en $0$ : elle n'est pas dans $H^2_0(]0,1[)$.

Retraits :
- `fermable` (nécessaire) : Sans fermabilité, le complété ne se réalise pas dans H : la forme fermée, et donc l’extension, n’existent plus. — Contre-exemple : $q(u,v)=u(0)v(0)$ sur $C([0,1])$ n'admet aucune extension fermée dans $L^2(]0,1[)$.
- `ipp` (nécessaire) : Sur un domaine plus grand que $C^\infty_c$, $\langle -u'',v\rangle$ n'est plus symétrique en général. — Contre-exemple : Sur $H^2(]0,1[)$, $u=x^2$ et $v=1$ : $\langle -u'',v\rangle=-2$ et $\langle u,-v''\rangle=0$.

Solution :
**Forme.** Pour $u,v\in C^\infty_c(]0,1[)$, $q(u,v)=\int_0^1(-u'')v=\int_0^1u'v'$ : $q$ est symétrique, positive, et $\|u\|_q^2=\|u'\|^2+\|u\|^2=\|u\|_{H^1}^2$.

**Fermabilité.** Si $(u_n)\subset C^\infty_c$ est de Cauchy pour $\|\cdot\|_q$, elle l'est dans $H^1$, complet, et converge dans $H^1$ vers un $w$. Si de plus $u_n\to 0$ dans $L^2$, alors $w=0$, puisque la convergence dans $H^1$ entraîne celle dans $L^2$. Donc $\|u_n\|_q\to 0$.

**Fermeture.** Le domaine de $\bar q$ est l'ensemble des limites dans $H^1$ de suites de $C^\infty_c$ : c'est $H^1_0(]0,1[)$ par définition, et $\bar q(u,v)=\int_0^1u'v'$ par continuité. Cette forme est fermée et densément définie.

**Opérateur associé.** Par le théorème de représentation, $u\in D(S_F)$ si et seulement si $u\in H^1_0$ et $\int_0^1u'v'=\int_0^1gv$ pour un $g\in L^2$ et tout $v\in H^1_0$. Avec $v\in C^\infty_c$, $-u''=g$ au sens des distributions, donc $u\in H^2$. Réciproquement, pour $u\in H^2\cap H^1_0$, l'intégration par parties a un terme de bord nul. Ainsi $S_F=-\frac{d^2}{dx^2}$ sur $H^2\cap H^1_0$ : la condition de Dirichlet vient du domaine de forme.

Indices :
1. Que vaut $\|u\|_q$ sur $C^\infty_c$ ? Dans quel espace complet connu une suite de Cauchy pour cette norme converge-t-elle ?
2. Pour la fermabilité, compare la limite dans $H^1$ et la limite dans $L^2$ d'une même suite. Le domaine de $\bar q$ est alors une adhérence que tu connais.
3. Pour $D(S_F)$ : teste par $v\in C^\infty_c$ pour obtenir $-u''=g$, puis vérifie la réciproque sur $H^2\cap H^1_0$ par intégration par parties.

Erreurs fréquentes :
- Croire que la fermeture de la forme a pour domaine $H^1(]0,1[)$.
- Confondre la fermeture de la forme avec la fermeture du graphe de l’opérateur.
- Supposer la fermabilité sans la démontrer.

Variante : Dans $H=L^2(]0,1[)$, soit $S=-\frac{d^2}{dx^2}+2$ de domaine $C^\infty_c(]0,1[)$, minoré par $2I$. Décrire la fermeture de sa forme et son extension de Friedrichs, puis calculer $\bar q(u,u)$ pour $u(x)=x(1-x)$.

Solution de la variante : $q(u,v)=\int_0^1(u'v'+2uv)$ sur $C^\infty_c$, et $\|u\|_q^2=\|u'\|^2+3\|u\|^2$ est équivalente à $\|u\|_{H^1}^2$. La fermeture a pour domaine $H^1_0(]0,1[)$, et $S_F=-\frac{d^2}{dx^2}+2$ sur $H^2\cap H^1_0$, minoré par $2I$. Pour $u(x)=x(1-x)$ : $\bar q(u,u)=\frac13+\frac2{30}=\frac25$.

Vérification : {"origin":"complement","review":"machine","notes":"Le polycopié donne l’idée de preuve (p. PDF 26) ; la fermeture explicite est rédigée pour ProofLab."}

## Exercice difficile `friedrichs.difficile` : Réalisations de Dirichlet et de Neumann

Énoncé : Dans $H=L^2(]0,1[)$, soit $S=-\frac{d^2}{dx^2}$ sur $C^\infty_c(]0,1[)$, et soient $a_D$ et $a_N$ la forme $\int_0^1u'v'$ sur $H^1_0(]0,1[)$ et sur $H^1(]0,1[)$ respectivement. Identifier les opérateurs associés $A_D$ et $A_N$, montrer que ce sont deux extensions auto-adjointes positives distinctes de $S$, dont seule $A_D$ est l'extension de Friedrichs, et expliquer pourquoi l'expression différentielle seule ne fixe pas le domaine.
Source : {"doc":"polycopie","pdfPage":43,"label":"Exercice 31, difficile (p. PDF 43–44)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-formes` (hypothese) : $a_D$ (sur $H^1_0$) et $a_N$ (sur $H^1$) sont symétriques, positives, fermées et densément définies sur $H=L^2(]0,1[)$.
- `h-bord` (hypothese) : $H^1(]0,1[)\subset C([0,1])$, et pour tous $\alpha,\beta\in\mathbb R$, $v(x)=\alpha(1-x)+\beta x$ est un élément de $H^1$ tel que $v(0)=\alpha$, $v(1)=\beta$.
- `d-S` (definition) : $Su=-u''$ sur $D(S)=C^\infty_c(]0,1[)$.
- `rep-D` (application-theoreme) : $A_D$ est auto-adjoint positif, $u\in D(A_D)$ si et seulement si $u\in H^1_0$ et $\int_0^1u'v'=\int_0^1gv$ pour un $g\in L^2$ et tout $v\in H^1_0$.
- `rep-N` (application-theoreme) : $A_N$ est auto-adjoint positif, $u\in D(A_N)$ si et seulement si $u\in H^1$ et $\int_0^1u'v'=\int_0^1gv$ pour un $g\in L^2$ et tout $v\in H^1$.
- `id-D` (egalite) : $D(A_D)=H^2\cap H^1_0$ et $A_Du=-u''$.
- `reg-N` (consequence) : Si $u\in D(A_N)$ : $u\in H^2$, $A_Nu=-u''$, et $u'(1)v(1)-u'(0)v(0)=0$ pour tout $v\in H^1$.
- `neu` (egalite) : Si $u\in D(A_N)$ : $u'(0)=u'(1)=0$.
- `id-N` (egalite) : $D(A_N)=\{u\in H^2 : u'(0)=u'(1)=0\}$ et $A_Nu=-u''$.
- `ext` (consequence) : $S\subset A_D$ et $S\subset A_N$.
- `one` (egalite, calcul rational) : $1\in D(A_N)$ et $A_N1=0$ : $0$ est valeur propre de $A_N$.
  - valeur attendue : "0"
- `ker-D` (consequence) : $\mathrm{Ker}\,A_D=\{0\}$.
- `diff` (consequence) : $A_D\neq A_N$.
- `fried` (application-theoreme) : $A_D$ est l'extension de Friedrichs de $S$ ; $A_N$ ne l'est pas.
- `fin` (conclusion) : $A_D$ et $A_N$ sont deux extensions auto-adjointes positives distinctes de $S$, de même expression $-\frac{d^2}{dx^2}$ : le domaine, fixé ici par le domaine de forme, fait partie de l'opérateur.
- `x-same` (consequence, DISTRACTEUR) : Deux extensions auto-adjointes de $S$ données par la même expression différentielle coïncident.
- `x-N-fried` (consequence, DISTRACTEUR) : $A_N$ est l'extension de Friedrichs de $S$.
- `x-neu-forme` (consequence, DISTRACTEUR) : La condition $u'(0)=u'(1)=0$ est imposée à tous les éléments du domaine de forme $H^1(]0,1[)$.

Règles :
- `h-formes` ⟹ `rep-D` par « Théorème de représentation des formes fermées. [formes-fermees] »
- `h-formes` ⟹ `rep-N` par « Théorème de représentation des formes fermées. [formes-fermees] »
- `rep-D` ⟹ `id-D` par « Tester par $v\in C^\infty_c$ : $-u''=g$, donc $u\in H^2$ ; réciproquement, pour $u\in H^2\cap H^1_0$, le terme de bord $[u'v]_0^1$ est nul car $v\in H^1_0$. »
- `rep-N` ⟹ `reg-N` par « Tester par $v\in C^\infty_c$ : $-u''=g$ et $u\in H^2$ ; puis intégrer par parties avec $v\in H^1$ : il reste $[u'v]_0^1=0$. »
- `reg-N` + `h-bord` ⟹ `neu` par « Prendre $v(x)=1-x$, puis $v(x)=x$. »
- `neu` + `reg-N` + `rep-N` ⟹ `id-N` par « Réciproquement, pour $u\in H^2$ avec $u'(0)=u'(1)=0$, $\int_0^1u'v'=\int_0^1(-u'')v$ pour tout $v\in H^1$. »
- `id-D` + `id-N` + `d-S` ⟹ `ext` par « $C^\infty_c$ est contenu dans les deux domaines, et les trois opérateurs agissent par $-u''$. »
- `id-N` ⟹ `one` par « $1\in H^2$, $1'=0$ en $0$ et en $1$, et $-1''=0$. »
- `id-D` + `h-formes` ⟹ `ker-D` par « $A_Du=0$ donne $a_D(u,u)=\langle A_Du,u\rangle=0$, donc $u'=0$ : $u$ est constante et nulle en $0$. »
- `one` + `ker-D` ⟹ `diff` par « $0$ est valeur propre de $A_N$ et non de $A_D$. »
- `d-S` + `rep-D` + `h-formes` ⟹ `fried` par « L'extension de Friedrichs est associée à la fermeture de la forme de $S$, de domaine l'adhérence de $C^\infty_c$ dans $H^1$, soit $H^1_0$ : c'est $a_D$. Or $D(a_N)=H^1\neq H^1_0$. [friedrichs] »
- `rep-D` + `rep-N` + `ext` + `diff` + `fried` ⟹ `fin` par « Réunion des résultats établis. »

Justifications sans règle (séduisantes ou fausses) : « Tester seulement par $v\in H^1_0$ suffit à déterminer les conditions au bord. » ; « L’expression différentielle détermine l’opérateur. »

Pièges :
- `x-same` → incorrect [domaine-operateur] : La formule ne détermine pas l’opérateur : deux domaines différents donnent ici deux extensions auto-adjointes différentes. — Contre-exemple : $1\in D(A_N)$ avec $A_N1=0$, tandis que $1\notin D(A_D)$ et que $0$ n'est pas valeur propre de $A_D$.
- `x-N-fried` → incorrect [friedrichs-extension] : Le domaine de forme de l'extension de Friedrichs est l'adhérence de $D(S)$ pour la norme de forme, ici $H^1_0$, et non $H^1$. — Contre-exemple : $1\in D(a_N)=H^1$, mais $1\notin H^1_0=D(\bar q)$ : sa valeur en $0$ ne s'annule pas.
- `x-neu-forme` → incorrect [domaine-operateur] : La condition de Neumann est naturelle : elle n'apparaît que dans $D(A_N)$, pas dans le domaine de forme. — Contre-exemple : $u(x)=x$ appartient à $H^1(]0,1[)$ et $u'(0)=1$.
- `neu` par « Tester seulement par $v\in H^1_0$ suffit à déterminer les conditions au bord. » → incorrect [hypotheses-theoreme] : Avec $v\in H^1_0$, le terme de bord $[u'v]_0^1$ est toujours nul : aucune condition sur $u'(0)$ ni $u'(1)$ n'en résulte. — Contre-exemple : $u(x)=x$ vérifie $\int_0^1u'v'=0=\int_0^1(-u'')v$ pour tout $v\in H^1_0$, et $u'(0)=1$.
- `diff` par « L’expression différentielle détermine l’opérateur. » → incorrect [domaine-operateur] : Cette justification conduirait à identifier les deux opérateurs : c’est précisément le domaine qui les distingue.

Retraits :
- `h-bord` (nécessaire) : Les conditions de Neumann s’obtiennent en testant par des fonctions qui ne s’annulent pas au bord. — Contre-exemple : Avec les seules fonctions test de $H^1_0$, $u(x)=x$ vérifierait l'identité de forme sans satisfaire $u'(0)=0$.
- `h-formes` (nécessaire) : Le théorème de représentation exige des formes fermées. — Contre-exemple : Sur $C^\infty_c(]0,1[)$, la forme $\int_0^1u'v'$ n'est pas fermée : il faut d'abord la fermer.

Calculs fermés : [{"kind":"rational","prompt":"Plus petite valeur propre de $A_D$, divisée par $\\pi^2$","expected":"1"}]

Solution :
**Dirichlet.** Par représentation, $u\in D(A_D)$ si et seulement si $u\in H^1_0$ et $\int_0^1u'v'=\int_0^1gv$ pour tout $v\in H^1_0$. Avec $v\in C^\infty_c$, $-u''=g$, donc $u\in H^2$ ; réciproquement, $H^2\cap H^1_0\subset D(A_D)$. Ainsi $D(A_D)=H^2\cap H^1_0$.

**Neumann.** Si $u\in D(A_N)$, le même test donne $u\in H^2$ et $A_Nu=-u''$. L'intégration par parties avec $v\in H^1$ laisse $u'(1)v(1)-u'(0)v(0)=0$ ; $v=1-x$ puis $v=x$ donnent $u'(0)=u'(1)=0$. Réciproquement, ces conditions suffisent. Ainsi $D(A_N)=\{u\in H^2 : u'(0)=u'(1)=0\}$.

**Deux extensions distinctes.** $C^\infty_c$ est contenu dans les deux domaines, et les deux opérateurs agissent par $-u''$ : $S\subset A_D$, $S\subset A_N$. Les deux sont auto-adjoints positifs. Mais $A_N1=0$, tandis que $A_Du=0$ entraîne $\int|u'|^2=0$, donc $u$ constante nulle en $0$ : $0$ est valeur propre de $A_N$, non de $A_D$ (dont la plus petite valeur propre est $\pi^2$, pour $\sin(\pi x)$).

**Friedrichs.** La fermeture de la forme de $S$ a pour domaine l'adhérence de $C^\infty_c$ dans $H^1$, soit $H^1_0$ : l'extension de Friedrichs est $A_D$. La condition de Dirichlet est essentielle (elle figure dans le domaine de forme), celle de Neumann est naturelle (elle n'apparaît que dans le domaine de l'opérateur).

**Conclusion.** La même expression $-\frac{d^2}{dx^2}$ porte deux opérateurs auto-adjoints différents : le domaine fait partie de la donnée.

Indices :
1. Le théorème de représentation décrit chaque domaine d'opérateur à partir du domaine de forme. Quelles fonctions test chaque forme autorise-t-elle ?
2. Teste d'abord par $C^\infty_c$ pour obtenir $-u''=g$, puis intègre par parties avec les fonctions test du domaine de forme et regarde ce qui reste au bord.
3. Avec $v=1-x$ et $v=x$, le terme de bord donne $u'(0)=0$ et $u'(1)=0$. Pour distinguer les deux opérateurs, regarde la fonction constante $1$.

Erreurs fréquentes :
- Penser que l’expression différentielle détermine l’opérateur.
- Placer la condition de Neumann dans le domaine de forme.
- Prendre $A_N$ pour l'extension de Friedrichs.

Variante : Dans $H=L^2(]0,1[)$, soit $a_M$ la forme $\int_0^1u'v'$ sur $\{u\in H^1(]0,1[) : u(0)=0\}$. Identifier l'opérateur associé $A_M$ et comparer avec $A_D$ et $A_N$.

Solution de la variante : $\{u\in H^1 : u(0)=0\}$ est fermé dans $H^1$ (l'évaluation en $0$ est continue), donc $a_M$ est fermée, densément définie. Le test par $C^\infty_c$ donne $u\in H^2$ et $A_Mu=-u''$ ; il reste $u'(1)v(1)=0$ pour tout $v$ du domaine, et $v=x$ donne $u'(1)=0$. Ainsi $D(A_M)=\{u\in H^2 : u(0)=0,\ u'(1)=0\}$ : condition essentielle en $0$, naturelle en $1$. C'est une troisième extension auto-adjointe positive de $S$, distincte de $A_D$ et de $A_N$ ($x\in D(a_M)$ n'est pas dans $H^1_0$).

Vérification : {"origin":"complement","review":"machine","notes":"L’exercice figure au polycopié sans corrigé ; identification des domaines rédigée pour ProofLab."}