# 23. Lemme de Grönwall (`gronwall`) — polycopié p. PDF 22, section 5.5

## Fiche

Espaces : $y:[0,T]\to[0,\infty[$ continue ; $a\in\mathbb R$ constante ; $b\in L^1(0,T)$. | Inégalité intégrale : $y(t)\le a+\int_0^tb(s)y(s)\,ds$ pour tout $t\in[0,T]$.

Hypothèses :
- $y:[0,T]\to[0,\infty[$ est continue. — Sans elle : Sans intégrabilité de $by$, l'hypothèse peut être vide : $a=0$, $b=1$, $y(0)=0$ et $y(t)=1/t$ pour $t>0$ donnent $\int_0^ty=+\infty$, et pourtant $y\neq 0$.
- $a\ge 0$. — Sans elle : Pour $a<0$, l'hypothèse en $t=0$ impose $y(0)\le a<0$, incompatible avec $y\ge 0$ : l'énoncé devient vide.
- $b\in L^1(0,T)$ et $b\ge 0$. — Sans elle : Si $b\notin L^1$ : $a=0$, $b(t)=1/t$, $y(t)=t$ vérifie l'hypothèse avec égalité et $y\neq 0$. Si $b$ n'est pas positive : $a=1$, $b=-1$, $y(t)=\tfrac34t^2$ sur $[0,1]$ vérifie l'hypothèse, mais $y(1)=\tfrac34>e^{-1}$.

Énoncé : Si $y:[0,T]\to[0,\infty[$ est continue et
$$y(t)\le a+\int_0^tb(s)y(s)\,ds,\qquad a\ge 0,\ b\in L^1(0,T),\ b\ge 0,$$
alors
$$y(t)\le a\exp\Big(\int_0^tb(s)\,ds\Big).$$

Bilan : {"stabilite":"Majoration exponentielle de $y$ ; pour $a=0$, $y\\equiv 0$, ce qui donne l'unicité dans les applications."}

Preuve dans le polycopié : complete

Plan :
1. Poser $z(t)=a+\int_0^tb(s)y(s)\,ds$ : absolument continue, $z'=by$ presque partout, et $y\le z$.
2. Si $a>0$ : $z\ge a>0$ et $z'=by\le bz$, donc $(\log z)'\le b$ presque partout.
3. En intégrant, $z(t)\le a\exp\big(\int_0^tb\big)$, puis $y\le z$.
4. Si $a=0$ : remplacer $a$ par $\varepsilon>0$, puis faire $\varepsilon\to 0$.

Vigilance :
- Le cas $a=0$ demande une précaution : $z$ peut s'annuler et $\log z$ n'est pas défini.
- L'implication n'est pas réversible : $y\le a\exp(\int_0^tb)$ n'entraîne pas l'inégalité intégrale.
- Le signe $b\ge 0$ est indispensable, de même que l'intégrabilité de $b$.
- $a$ est une constante : pour $a(t)$ non croissante, la conclusion $y\le a(t)\exp(\int_0^tb)$ peut tomber.

Vérification : {"origin":"polycopie","review":"machine"}

Définition « Fonction absolument continue » : $z:[0,T]\to\mathbb R$ est absolument continue s'il existe $g\in L^1(0,T)$ telle que $z(t)=z(0)+\int_0^tg$ pour tout $t$ ; alors $z'=g$ presque partout. Une fonction absolument continue de dérivée négative presque partout est décroissante.

## Contre-exemple `ce-gr-b-negatif` : Coefficient négatif
Assertion : Si $y(t)\le a+\int_0^tb\,y$ avec $b\in L^1$ de signe quelconque, alors $y(t)\le a\exp(\int_0^tb)$.
Tâche : Pour $a=1$, $b=-1$ et $y(t)=\tfrac34t^2$ sur $[0,1]$, calcule $y(1)+\int_0^1y(s)\,ds$.
Vérification : {"kind":"rational","prompt":"Valeur de $y(1)+\\int_0^1y(s)\\,ds$","expected":"1"}
Explication : $y(t)+\int_0^ty=\tfrac34t^2+\tfrac14t^3$ croît de $0$ à $1$ sur $[0,1]$ : l'hypothèse $y(t)\le 1-\int_0^ty$ est vraie. Mais $y(1)=\tfrac34>e^{-1}$, puisque $e>\tfrac43$.

## Contre-exemple `ce-gr-a-variable` : Terme constant non constant
Assertion : Si $y(t)\le a(t)+\int_0^tb\,y$ avec $a\ge 0$ continue et $b\ge 0$, alors $y(t)\le a(t)\exp(\int_0^tb)$.
Tâche : Pour $a(t)=1-t$, $b=1$ et $y\equiv 1$ sur $[0,1]$, donne $y(1)$ et $a(1)\,e^{1}$.
Vérification : {"kind":"rational-vector","prompt":"Valeurs de $y(1)$ et de $a(1)\\,e^{1}$","expected":["1","0"],"labels":["y(1)","a(1)e"]}
Explication : $1-t+\int_0^t1\,ds=1$ : l'hypothèse est une égalité. La conclusion annoncée donnerait $1\le 0$ en $t=1$.

## Contre-exemple `ce-gr-reciproque` : La réciproque est fausse
Assertion : Si $y(t)\le a\exp(\int_0^tb)$ pour tout $t$, alors $y(t)\le a+\int_0^tb\,y$ pour tout $t$.
Tâche : Pour $a=b=1$ et $y(t)=t^2$ sur $[0,2]$, calcule $y(3/2)-\big(1+\int_0^{3/2}y(s)\,ds\big)$.
Vérification : {"kind":"rational","prompt":"Valeur de $y(3/2)-\\big(1+\\int_0^{3/2}y\\big)$","expected":"1/8"}
Explication : $t^2\le e^t$ pour tout $t\ge 0$, mais $\tfrac94-\big(1+\tfrac98\big)=\tfrac18>0$ : l'hypothèse intégrale est violée en $t=3/2$.

## Exercice facile `gronwall.facile` : Grönwall pour $y(t)\le 2+\int_0^t3y$

Énoncé : Soit $y:[0,1]\to[0,\infty[$ continue telle que $y(t)\le 2+\int_0^t3y(s)\,ds$ pour tout $t\in[0,1]$. Appliquer le lemme de Grönwall en identifiant $a$ et $b$, et établir $y(t)\le 2e^{3t}$. Montrer que cette majoration est atteinte, puis que l'implication n'est pas réversible : $y_1(t)=16t^2$ vérifie la majoration sans vérifier l'hypothèse.
Source : {"doc":"polycopie","pdfPage":42,"label":"Exercice 23, facile"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-y` (hypothese) : $y:[0,1]\to[0,\infty[$ est continue.
- `h-ineg` (hypothese) : Pour tout $t\in[0,1]$ : $y(t)\le 2+\int_0^t3y(s)\,ds$.
- `id-ab` (egalite, calcul rational-vector) : $a=2\ge 0$ et $b\equiv 3$ : $b\in L^1(0,1)$ et $b\ge 0$.
  - valeur attendue : ["2","3"]
- `int-b` (egalite, calcul expr-equiv) : $\int_0^tb(s)\,ds=3t$ pour $t\in[0,1]$.
  - valeur attendue : "3*t"
- `thm` (application-theoreme, calcul expr-equiv) : $y(t)\le 2e^{3t}$ pour tout $t\in[0,1]$.
  - valeur attendue : "2*E"
- `d-star` (definition) : $y_*(t)=2e^{3t}$ sur $[0,1]$.
- `sat-int` (egalite, calcul expr-equiv) : $2+\int_0^t3y_*(s)\,ds=2+2(e^{3t}-1)=2e^{3t}=y_*(t)$ : hypothèse et conclusion sont des égalités pour $y_*$.
  - valeur attendue : "2*E"
- `d-y1` (definition) : $y_1(t)=16t^2$ sur $[0,1]$.
- `nr-maj` (inegalite) : $y_1(t)\le 2e^{3t}$ pour tout $t\in[0,1]$.
- `nr-viol` (egalite, calcul rational) : $y_1(2/3)-\big(2+\int_0^{2/3}3y_1(s)\,ds\big)=\tfrac{10}{27}>0$.
  - valeur attendue : "10/27"
- `nonrev` (consequence) : La majoration $y(t)\le 2e^{3t}$ n'entraîne pas l'hypothèse intégrale : le lemme n'est pas réversible.
- `fin` (conclusion) : Pour tout $t\in[0,1]$, $y(t)\le 2e^{3t}$ ; cette majoration est atteinte par $y_*$, et l'implication n'est pas réversible.
- `x-affine` (inegalite, DISTRACTEUR) : $y(t)\le 2+3t$ pour tout $t\in[0,1]$.
- `x-somme` (inegalite, DISTRACTEUR) : $y(t)\le 2+e^{3t}$ pour tout $t\in[0,1]$.
- `x-rev` (consequence, DISTRACTEUR) : Si $y(t)\le 2e^{3t}$ pour tout $t\in[0,1]$, alors $y(t)\le 2+\int_0^t3y(s)\,ds$ pour tout $t\in[0,1]$.

Règles :
- `h-ineg` ⟹ `id-ab` par « Lecture de l’hypothèse : constante additive et coefficient sous l’intégrale. »
- `id-ab` ⟹ `int-b` par « Intégrale d’une fonction constante. »
- `h-y` + `h-ineg` + `id-ab` + `int-b` ⟹ `thm` par « Lemme de Grönwall, hypothèses vérifiées. [gronwall] »
- `d-star` ⟹ `sat-int` par « Primitive : $\int_0^t6e^{3s}\,ds=2e^{3t}-2$. »
- `d-y1` ⟹ `nr-maj` par « $e^{3t}\ge 1+3t+\tfrac92t^2+\tfrac92t^3$ pour $t\ge 0$, et $1+3t-\tfrac72t^2+\tfrac92t^3\ge 1$ sur $[0,1]$ (polynôme croissant : dérivée de discriminant négatif). »
- `d-y1` ⟹ `nr-viol` par « $y_1(2/3)=\tfrac{64}9=\tfrac{192}{27}$ et $2+16(2/3)^3=\tfrac{182}{27}$. »
- `nr-maj` + `nr-viol` ⟹ `nonrev` par « Une fonction qui vérifie la conclusion sans vérifier l’hypothèse réfute la réciproque. »
- `thm` + `sat-int` + `nonrev` ⟹ `fin` par « Réunion des trois résultats. »

Justifications sans règle (séduisantes ou fausses) : « Le lemme de Grönwall est une équivalence. »

Pièges :
- `x-affine` → incorrect [calcul-exact] : Cette majoration traite $\int_0^t3y$ comme si $y\le 1$ : l'inconnue $y$ figure sous l'intégrale. — Contre-exemple : $y_*(t)=2e^{3t}$ vérifie l'hypothèse avec égalité, et $y_*(1)=2e^3>5$.
- `x-somme` → incorrect [calcul-exact] : La constante $a$ multiplie l'exponentielle : $a\exp\big(\int_0^tb\big)$, et non $a+\exp\big(\int_0^tb\big)$. — Contre-exemple : $y_*(1)=2e^3>2+e^3$, puisque $e^3>2$.
- `x-rev` → incorrect [gronwall-reciproque] : La conclusion de Grönwall est plus faible que l’hypothèse : l’implication n’est pas réversible. — Contre-exemple : $y_1(t)=16t^2$ vérifie $y_1\le 2e^{3t}$ sur $[0,1]$, mais $y_1(2/3)-\big(2+\int_0^{2/3}3y_1\big)=\tfrac{10}{27}>0$.
- `nonrev` par « Le lemme de Grönwall est une équivalence. » → incorrect [gronwall-reciproque] : Cette justification est fausse, et elle affirmerait même le contraire de ce qui est établi ici.

Retraits :
- `h-y` (nécessaire) : La continuité garantit $by\in L^1$ ; sans elle, l'intégrale peut être infinie et l'hypothèse ne dit plus rien. — Contre-exemple : $y(0)=0$ et $y(t)=1/t$ pour $t>0$ : $\int_0^t3y=+\infty$, l'hypothèse est vraie, mais $y(1/10)=10>2e^{0{,}3}$.
- `id-ab` (nécessaire) : Le lemme exige $b\ge 0$ ; pour un coefficient négatif, la conclusion analogue est fausse. — Contre-exemple : $y(t)=t^2$ vérifie $y(t)\le 2-\int_0^t3y(s)\,ds$ sur $[0,1]$, car $t^2+t^3\le 2$, mais $y(1)=1>2e^{-3}$.

Solution :
**Identification.** L'hypothèse a la forme du lemme avec $a=2\ge 0$ et $b\equiv 3$, intégrable et positive sur $[0,1]$ ; $y$ est continue et positive. Comme $\int_0^tb=3t$, le lemme donne
$$y(t)\le 2e^{3t}\quad\text{pour tout }t\in[0,1].$$

**Optimalité.** Pour $y_*(t)=2e^{3t}$ : $2+\int_0^t6e^{3s}\,ds=2+2(e^{3t}-1)=2e^{3t}$. Hypothèse et conclusion sont des égalités ; en notant $E=e^{3t}$, le calcul $2+2(E-1)=2E$ est une identité exacte.

**Non-réversibilité.** $y_1(t)=16t^2$ vérifie $y_1\le 2e^{3t}$ sur $[0,1]$, car $e^{3t}\ge 1+3t+\tfrac92t^2+\tfrac92t^3\ge 8t^2$, le polynôme $1+3t-\tfrac72t^2+\tfrac92t^3$ étant croissant et égal à $1$ en $0$. Mais en $t=2/3$ : $y_1(2/3)=\tfrac{192}{27}$ et $2+\int_0^{2/3}48s^2\,ds=\tfrac{182}{27}$. L'écart $\tfrac{10}{27}>0$ montre que l'hypothèse intégrale est violée.

Indices :
1. À quelle forme $y(t)\le a+\int_0^tb\,y$ l'hypothèse se ramène-t-elle, et les conditions sur $a$, $b$, $y$ sont-elles remplies ?
2. Le lemme donne $y(t)\le a\exp\big(\int_0^tb\big)$ ; pour l'optimalité, teste une fonction pour laquelle l'hypothèse est une égalité.
3. Pour la non-réversibilité, compare $y_1(2/3)$ et $2+\int_0^{2/3}48s^2\,ds$ ; pour la majoration de $y_1$, utilise le développement de $e^{3t}$ à l'ordre $3$.

Erreurs fréquentes :
- Écrire $a+\exp(\int b)$ au lieu de $a\exp(\int b)$.
- Croire que la majoration exponentielle entraîne l’inégalité intégrale.
- Appliquer le lemme sans vérifier $a\ge 0$, $b\ge 0$ et l'intégrabilité.

Variante : Soit $y:[0,T]\to[0,\infty[$ continue telle que $y(t)\le 1+\int_0^t\frac{2s}{1+s^2}\,y(s)\,ds$. Appliquer Grönwall et montrer que la majoration obtenue est atteinte.

Solution de la variante : Ici $a=1$ et $b(s)=\frac{2s}{1+s^2}$, continue et positive sur $[0,T]$, donc intégrable. Comme $\int_0^tb=\ln(1+t^2)$, le lemme donne $y(t)\le\exp\big(\ln(1+t^2)\big)=1+t^2$. Pour $y_*(t)=1+t^2$ : $1+\int_0^t2s\,ds=1+t^2$, l'hypothèse est une égalité et la majoration est atteinte.

Graphe de la variante :
But : `fin` — usage : application

Nœuds :
- `h-y` (hypothese) : $y:[0,T]\to[0,\infty[$ est continue.
- `h-ineg` (hypothese) : Pour tout $t\in[0,T]$ : $y(t)\le 1+\int_0^t\frac{2s}{1+s^2}\,y(s)\,ds$.
- `id-ab` (egalite) : $a=1\ge 0$ et $b(s)=\frac{2s}{1+s^2}$, continue et positive sur $[0,T]$, donc intégrable.
- `exp-b` (egalite, calcul expr-equiv) : $\exp\big(\int_0^tb(s)\,ds\big)=\exp\big(\ln(1+t^2)\big)=1+t^2$.
  - valeur attendue : "1+t^2"
- `thm` (application-theoreme) : $y(t)\le 1+t^2$ pour tout $t\in[0,T]$.
- `d-star` (definition) : $y_*(t)=1+t^2$.
- `sat` (egalite, calcul expr-equiv) : $1+\int_0^t\frac{2s}{1+s^2}(1+s^2)\,ds=1+t^2=y_*(t)$.
  - valeur attendue : "1+t^2"
- `fin` (conclusion) : $y(t)\le 1+t^2$ sur $[0,T]$, et cette majoration est atteinte par $y_*$.
- `x-log` (inegalite, DISTRACTEUR) : $y(t)\le 1+\ln(1+t^2)$ pour tout $t\in[0,T]$.

Règles :
- `h-ineg` ⟹ `id-ab` par « Lecture de l’hypothèse et signe de b. »
- `id-ab` ⟹ `exp-b` par « Primitive : $\int_0^t\frac{2s}{1+s^2}\,ds=\ln(1+t^2)$. »
- `h-y` + `h-ineg` + `id-ab` + `exp-b` ⟹ `thm` par « Lemme de Grönwall. [gronwall] »
- `d-star` ⟹ `sat` par « Simplification $b\,y_*=2s$, puis intégration. »
- `thm` + `sat` ⟹ `fin` par « Réunion de la majoration et de son optimalité. »

Pièges :
- `x-log` → incorrect [calcul-exact] : La majoration est $a\exp\big(\int_0^tb\big)$, et non $a+\int_0^tb$. — Contre-exemple : $y_*(t)=1+t^2$ vérifie l'hypothèse, et $1+t^2>1+\ln(1+t^2)$ pour $t>0$.

Retraits :
- `h-y` (nécessaire) : Sans intégrabilité de $b\,y$, l'hypothèse peut devenir vide. — Contre-exemple : $y(0)=0$, $y(t)=1/t^3$ pour $t>0$ : $\int_0^t\frac{2s}{1+s^2}s^{-3}\,ds=+\infty$, alors que $y(1/2)=8>\tfrac54$ (pour $T\ge\tfrac12$).

Vérification : {"origin":"complement","review":"machine","notes":"Exercice du polycopié (p. PDF 42) sans corrigé : application du lemme, optimalité et non-réversibilité sont rédigées en complément."}

## Exercice intermediaire `gronwall.intermediaire` : Fonction majorante et facteur intégrant

Énoncé : Soient $y:[0,T]\to[0,\infty[$ continue, $a\ge 0$, $b\in L^1(0,T)$ avec $b\ge 0$, et $y(t)\le a+\int_0^tb(s)y(s)\,ds$ pour tout $t\in[0,T]$. Démontrer que $y(t)\le a\exp\big(\int_0^tb(s)\,ds\big)$ pour tout $t$, en introduisant la fonction majorante $z(t)=a+\int_0^tb\,y$ et le facteur intégrant $e^{-B(t)}$, $B(t)=\int_0^tb$. Comparer avec la preuve du polycopié par le logarithme, notamment pour $a=0$.
Source : {"doc":"polycopie","pdfPage":42,"label":"Exercice 23, intermédiaire ; démonstration de la section 5.5 (p. PDF 22)"} — prérequis : —

But : `fin` — usage : demonstration

Nœuds :
- `h-y` (hypothese) : $y:[0,T]\to[0,\infty[$ est continue.
- `h-a` (hypothese) : $a\ge 0$.
- `h-b1` (hypothese) : $b\in L^1(0,T)$.
- `h-b2` (hypothese) : $b\ge 0$ presque partout.
- `h-ineg` (hypothese) : Pour tout $t\in[0,T]$ : $y(t)\le a+\int_0^tb(s)y(s)\,ds$.
- `d-z` (definition) : $z(t)=a+\int_0^tb(s)y(s)\,ds$, $B(t)=\int_0^tb(s)\,ds$ et $Z(t)=z(t)\,e^{-B(t)}$.
- `z-ac` (consequence) : $by\in L^1(0,T)$ ; $z$ et $B$ sont absolument continues, $z(0)=a$, $B(0)=0$, $z'=by$ et $B'=b$ presque partout.
- `y-le-z` (inegalite) : $y(t)\le z(t)$ pour tout $t\in[0,T]$.
- `Z-prime` (egalite) : $Z$ est absolument continue et $Z'(t)=b(t)\big(y(t)-z(t)\big)e^{-B(t)}$ presque partout.
- `Z-neg` (inegalite) : $Z'\le 0$ presque partout.
- `Z-decr` (inegalite) : $Z(t)\le Z(0)=a$ pour tout $t\in[0,T]$, soit $z(t)\le a\,e^{B(t)}$.
- `l-pos` (definition, locale) : Supposons d'abord $a>0$ (l'énoncé étant alors établi pour toute constante strictement positive).
- `l-log` (inegalite) : Si $a>0$ : $z\ge a>0$, $\log z$ est absolument continue et $(\log z)'=\dfrac{by}{z}\le b$ presque partout, d'où $z(t)\le a\,e^{B(t)}$.
- `l-cas` (inegalite) : Pour tout $a\ge 0$ : $z(t)\le a\,e^{B(t)}$ ; si $a=0$, on applique le cas précédent à $\varepsilon>0$, car $y\le\varepsilon+\int_0^tb\,y$, puis on fait $\varepsilon\to 0$.
- `fin` (conclusion) : $y(t)\le a\exp\big(\int_0^tb(s)\,ds\big)$ pour tout $t\in[0,T]$.
- `x-log-0` (inegalite, DISTRACTEUR) : Si $a=0$, $\log z$ est définie sur $[0,T]$ et $(\log z)'\le b$, ce qui donne directement $z\equiv 0$.
- `x-deriv` (inegalite, DISTRACTEUR) : $y$ est dérivable presque partout et $y'\le b\,y$ presque partout.

Règles :
- `h-y` + `h-b1` + `d-z` ⟹ `z-ac` par « $y$ continue sur un compact est bornée, donc $by\in L^1$ ; une intégrale indéfinie d'une fonction intégrable est absolument continue, de dérivée l'intégrande presque partout. »
- `h-ineg` + `d-z` ⟹ `y-le-z` par « Hypothèse intégrale et définition de $z$. »
- `z-ac` + `d-z` ⟹ `Z-prime` par « Produit de fonctions absolument continues sur un segment ; dérivée $z'e^{-B}-zbe^{-B}$. » (chemin facteur)
- `Z-prime` + `y-le-z` + `h-b2` ⟹ `Z-neg` par « $b\ge 0$ et $y-z\le 0$. » (chemin facteur)
- `Z-prime` + `Z-neg` ⟹ `Z-decr` par « Une fonction absolument continue de dérivée négative presque partout est décroissante, car elle est l’intégrale de sa dérivée. » (chemin facteur)
- `Z-decr` + `y-le-z` ⟹ `fin` par « $y\le z$ et majoration de $z$. » (chemin facteur)
- `l-pos` + `z-ac` + `y-le-z` + `h-b2` + `h-y` ⟹ `l-log` par « $z\ge a>0$ car $by\ge 0$ ; $\log$ est lipschitzien sur $[a,\infty[$ ; $by\le bz$ ; on intègre $(\log z)'\le b$. » (chemin logarithme)
- `l-log` + `h-a` + `h-ineg` ⟹ `l-cas` par « Disjonction $a>0$ ou $a=0$ ; dans le second cas, $y(t)\le\varepsilon e^{B(t)}$ pour tout $\varepsilon>0$. » (chemin logarithme)
- `l-cas` + `y-le-z` ⟹ `fin` par « $y\le z$ et majoration de $z$. » (chemin logarithme)

Justifications sans règle (séduisantes ou fausses) : « On dérive l’inégalité intégrale membre à membre. » ; « Lemme de Grönwall. »

Pièges :
- `x-log-0` → incorrect [gronwall-cas-nul] : Pour $a=0$, $z$ peut s'annuler : $\log z$ n'est pas défini. C'est pourquoi le polycopié remplace $a$ par $\varepsilon>0$, et pourquoi le facteur intégrant, qui ne divise pas par $z$, est plus direct. — Contre-exemple : $y\equiv 0$, $a=0$ : $z\equiv 0$ et $\log z$ n'est défini en aucun point.
- `x-deriv` → incorrect [justification-absente] : L’hypothèse est intégrale : elle ne donne ni la dérivabilité de y ni une inégalité différentielle sur y. On dérive z, pas y. — Contre-exemple : $a=2$, $b=1$, $y(t)=1+\tfrac12\sin(10t)$ : l'hypothèse est vraie car $y\le\tfrac32\le 2$, mais $y'(0)=5>1=b\,y(0)$.
- `Z-neg` par « On dérive l’inégalité intégrale membre à membre. » → incorrect [justification-absente] : Dériver une inégalité n'est pas licite. Le signe de $Z'$ vient de $b\ge 0$ et de $y\le z$.

Retraits :
- `h-b2` (nécessaire) : Le signe de $Z'$, comme la majoration $by\le bz$, repose sur $b\ge 0$. — Contre-exemple : $a=1$, $b=-1$, $y(t)=\tfrac34t^2$ sur $[0,1]$ : $y(t)+\int_0^ty=\tfrac34t^2+\tfrac14t^3\le 1$, mais $y(1)=\tfrac34>e^{-1}$.
- `h-b1` (nécessaire) : $B$ peut ne plus être finie, et $z$ n'est plus nécessairement absolument continue. — Contre-exemple : $a=0$, $b(t)=1/t$, $y(t)=t$ : $\int_0^tb\,y=t$, l'hypothèse est une égalité, et pourtant $y\neq 0$.
- `h-y` (nécessaire) : Sans intégrabilité de $by$, l'hypothèse peut être vide. — Contre-exemple : $a=0$, $b=1$, $y(0)=0$ et $y(t)=1/t$ pour $t>0$ : $\int_0^ty=+\infty$, l'hypothèse est vraie et $y\neq 0$.
- `h-a` (non nécessaire) : Le facteur intégrant n'utilise pas le signe de $a$ ; seule la voie logarithmique en a besoin. — Contre-exemple : Si $a<0$, l'hypothèse en $t=0$ donne $y(0)\le a<0$, incompatible avec $y\ge 0$ : l'énoncé est vide.

Solution :
**Fonction majorante.** $y$ est continue sur un segment, donc bornée, et $b\in L^1$ : $by\in L^1(0,T)$. La fonction $z(t)=a+\int_0^tb\,y$ est absolument continue, $z(0)=a$, $z'=by$ presque partout, et l'hypothèse s'écrit $y\le z$. De même $B(t)=\int_0^tb$ est absolument continue, de dérivée $b$.

**Facteur intégrant.** $Z=z\,e^{-B}$ est absolument continue, produit de deux telles fonctions, et
$$Z'=(z'-bz)\,e^{-B}=b\,(y-z)\,e^{-B}\le 0\quad\text{p.p.},$$
car $b\ge 0$ et $y\le z$. Donc $Z(t)=Z(0)+\int_0^tZ'\le a$, soit $z(t)\le a\,e^{B(t)}$, puis $y(t)\le z(t)\le a\exp\big(\int_0^tb\big)$.

**Comparaison avec le polycopié.** La preuve par le logarithme suppose $a>0$ : alors $z\ge a>0$ et $(\log z)'=by/z\le b$. Pour $a=0$, $z$ peut s'annuler ; on applique le cas $a>0$ à $\varepsilon>0$, puis on fait $\varepsilon\to 0$. Le facteur intégrant ne divise pas par $z$ : il traite $a=0$ directement, et n'utilise ni le signe de $a$ ni celui de $y$. En revanche $b\ge 0$ et $b\in L^1$ sont indispensables.

Indices :
1. L'inconnue $y$ n'est pas dérivable : quelle fonction, construite à partir de l'hypothèse, l'est presque partout ?
2. Pour $z(t)=a+\int_0^tb\,y$, on a $z'=by\le bz$ ; quel facteur rend $z'-bz$ égal à la dérivée d'un produit ?
3. Pose $Z=z\,e^{-B}$ : $Z'=b(y-z)e^{-B}\le 0$, donc $Z(t)\le Z(0)=a$.

Erreurs fréquentes :
- Prendre $\log z$ lorsque $a=0$.
- Dériver l’inégalité intégrale pour obtenir une inégalité sur y’.
- Oublier que $Z'\le 0$ repose sur $b\ge 0$.
- Invoquer le lemme de Grönwall dans sa propre démonstration.

Variante : Soient $a:[0,T]\to[0,\infty[$ continue croissante, $b\in L^1(0,T)$, $b\ge 0$, et $y$ continue positive avec $y(t)\le a(t)+\int_0^tb\,y$. Montrer que $y(t)\le a(t)\exp\big(\int_0^tb\big)$. Que se passe-t-il si $a$ n'est pas croissante ?

Solution de la variante : Fixons $t_0\in[0,T]$. Pour $t\le t_0$, $y(t)\le a(t_0)+\int_0^tb\,y$ puisque $a$ est croissante ; le lemme à constante $a(t_0)$, sur $[0,t_0]$, donne $y(t_0)\le a(t_0)\exp\big(\int_0^{t_0}b\big)$. Sans croissance, la conclusion tombe : pour $a(t)=1-t$, $b=1$, $y\equiv 1$ sur $[0,1]$, l'hypothèse est une égalité, mais $a(1)e^1=0<1=y(1)$.

Vérification : {"origin":"complement","review":"machine","notes":"La voie logarithmique est celle du polycopié (p. PDF 22) ; la voie par facteur intégrant, demandée par l’exercice, est un complément."}

## Exercice difficile `gronwall.difficile` : Dépendance continue par rapport à la donnée initiale

Énoncé : Soient $V\hookrightarrow H\simeq H'\hookrightarrow V'$ un triplet de Hilbert réels, dense et continu, $a:V\times V\to\mathbb R$ bilinéaire continue avec $a(v,v)\ge 0$, $f\in L^2(0,T;V')$ et $G:H\to H$ lipschitzienne de constante $L\ge 0$. Soient $u_1,u_2\in L^2(0,T;V)$, avec $u_i'\in L^2(0,T;V')$, telles que pour tout $v\in V$ et presque tout $t$ : $\langle u_i'(t),v\rangle_{V',V}+a(u_i(t),v)=(G(u_i(t)),v)_H+\langle f(t),v\rangle_{V',V}$, et $u_i(0)=u_0^i\in H$. Montrer que $\|u_1(t)-u_2(t)\|_H\le e^{Lt}\|u_0^1-u_0^2\|_H$ pour tout $t\in[0,T]$.
Source : {"doc":"polycopie","pdfPage":42,"label":"Exercice 23, difficile ; cadre de la section 8.7 (p. PDF 33)"} — prérequis : lions-magenes

But : `fin` — usage : application

Nœuds :
- `h-triplet` (hypothese) : $V\hookrightarrow H\simeq H'\hookrightarrow V'$ est un triplet de Hilbert réels, dense et continu.
- `h-a` (hypothese) : $a$ est bilinéaire continue sur $V$ et $a(v,v)\ge 0$ pour tout $v\in V$.
- `h-G` (hypothese) : $\|G(h)-G(k)\|_H\le L\|h-k\|_H$ pour tous $h,k\in H$.
- `h-sol` (hypothese) : $u_1,u_2\in L^2(0,T;V)$, $u_i'\in L^2(0,T;V')$, vérifient l'équation pour tout $v\in V$ et presque tout $t$, avec $u_i(0)=u_0^i$.
- `d-w` (definition) : $w=u_1-u_2$.
- `lm` (application-theoreme) : $w\in C([0,T];H)$, $t\mapsto\|w(t)\|_H^2$ est absolument continue et $\tfrac12\tfrac{d}{dt}\|w(t)\|_H^2=\langle w'(t),w(t)\rangle_{V',V}$ presque partout.
- `w-test` (egalite) : Pour presque tout $t$ : $\langle w'(t),w(t)\rangle_{V',V}+a(w(t),w(t))=\big(G(u_1(t))-G(u_2(t)),w(t)\big)_H$.
- `maj` (inegalite) : Pour presque tout $t$ : $\tfrac12\tfrac{d}{dt}\|w(t)\|_H^2\le L\|w(t)\|_H^2$.
- `integ` (inegalite) : Pour tout $t\in[0,T]$ : $\|w(t)\|_H^2\le\|w(0)\|_H^2+\int_0^t2L\|w(s)\|_H^2\,ds$.
- `int-b` (egalite, calcul expr-equiv) : $\int_0^t2L\,ds=2Lt$.
  - valeur attendue : "2*L*t"
- `gr` (application-theoreme, calcul expr-equiv) : $\|w(t)\|_H^2\le\|w(0)\|_H^2\,e^{2Lt}$ pour tout $t\in[0,T]$.
  - valeur attendue : "rho*E"
- `fin` (conclusion) : $\|u_1(t)-u_2(t)\|_H\le e^{Lt}\,\|u_0^1-u_0^2\|_H$ pour tout $t\in[0,T]$ : dépendance lipschitzienne par rapport à la donnée initiale.
- `x-exp` (inegalite, DISTRACTEUR) : $\|u_1(t)-u_2(t)\|_H\le e^{Lt/2}\,\|u_0^1-u_0^2\|_H$ pour tout $t$, sous les hypothèses de l'énoncé.
- `x-unif` (inegalite, DISTRACTEUR) : Il existe $C$ indépendante de $T$ telle que $\sup_{t\ge 0}\|u_1(t)-u_2(t)\|_H\le C\|u_0^1-u_0^2\|_H$, sous les seules hypothèses de l'énoncé.
- `x-norme` (inegalite, DISTRACTEUR) : $\tfrac{d}{dt}\|w(t)\|_H\le L\|w(t)\|_H$ presque partout, par simple division par $\|w(t)\|_H$.

Règles :
- `h-triplet` + `h-sol` + `d-w` ⟹ `lm` par « Lions–Magenes appliqué à $w\in L^2(0,T;V)$, $w'\in L^2(0,T;V')$. [lions-magenes] »
- `h-sol` + `d-w` + `h-a` + `h-G` + `h-triplet` ⟹ `w-test` par « Différence des équations ; elle a lieu dans $V'$ hors d'un négligeable indépendant de $v$, et on l'évalue sur $w(t)\in V$. »
- `w-test` + `lm` + `h-a` + `h-G` ⟹ `maj` par « $a(w,w)\ge 0$, Cauchy–Schwarz dans $H$ et $\|G(u_1)-G(u_2)\|_H\le L\|w\|_H$. [cauchy-schwarz] »
- `maj` + `lm` ⟹ `integ` par « Intégration de $0$ à $t$ de la dérivée d'une fonction absolument continue. »
- `integ` ⟹ `int-b` par « Coefficient constant $b\equiv 2L$ sous l'intégrale. »
- `integ` + `lm` + `int-b` ⟹ `gr` par « Lemme de Grönwall avec $y=\|w\|_H^2$ continue positive, $a=\|w(0)\|_H^2\ge 0$, $b\equiv 2L\ge 0$. [gronwall] »
- `gr` + `h-sol` ⟹ `fin` par « Racine carrée, et $w(0)=u_0^1-u_0^2$. »

Justifications sans règle (séduisantes ou fausses) : « On majore $\|w(s)\|_H^2$ par son supremum sur $[0,t]$, ce qui suffit à conclure. »

Pièges :
- `gr` par « On majore $\|w(s)\|_H^2$ par son supremum sur $[0,t]$, ce qui suffit à conclure. » → a-justifier [gronwall-signe] : Majorer par le supremum donne $\sup_{[0,t]}\|w\|_H^2\le\|w(0)\|_H^2+2Lt\sup_{[0,t]}\|w\|_H^2$, qui ne conclut que si $2Lt<1$ : un argument local en temps, à itérer. Le lemme de Grönwall évite cette restriction.
- `x-exp` → incorrect [calcul-exact] : L'exposant de la majoration de $\|w\|_H^2$ est $2Lt$ ; en prenant la racine, on obtient $e^{Lt}$, non $e^{Lt/2}$. — Contre-exemple : $V=H=\mathbb R$, $a=0$, $f=0$, $G(s)=Ls$ avec $L>0$ : $w(t)=e^{Lt}w(0)$, et $e^{Lt}>e^{Lt/2}$ pour $t>0$.
- `x-unif` → incorrect [hypotheses-theoreme] : Sous ces hypothèses, la constante croît exponentiellement avec le temps. — Contre-exemple : $V=H=\mathbb R$, $a=0$, $f=0$, $G(s)=Ls$, $L>0$ : $|w(t)|=e^{Lt}|w(0)|$ n'est pas borné uniformément en $t$.
- `x-norme` → a-justifier [gronwall-cas-nul] : La division par $\|w(t)\|_H$ est illicite là où cette norme s'annule, et la dérivabilité de $\|w\|_H$ demande un argument. Passer par le carré, absolument continu par Lions–Magenes, évite ces difficultés.

Retraits :
- `h-G` (nécessaire) : La majoration différentielle disparaît, et avec elle l’unicité comme la dépendance continue. — Contre-exemple : $V=H=\mathbb R$, $a=0$, $f=0$, $G(s)=2\sqrt{|s|}$, continue non lipschitzienne : $u_1\equiv 0$ et $u_2(t)=t^2$ sont deux solutions de même donnée initiale $0$.
- `h-a` (nécessaire) : Le terme $a(w,w)$ ne peut plus être négligé : l'exposant $L$ n'est plus le bon. — Contre-exemple : $V=H=\mathbb R$, $a(u,v)=-\mu uv$ avec $\mu>0$, $G=0$ ($L=0$) : $w(t)=e^{\mu t}w(0)$ contredit $|w(t)|\le|w(0)|$.

Solution :
**Réduction.** $w=u_1-u_2\in L^2(0,T;V)$, $w'\in L^2(0,T;V')$, et pour tout $v\in V$, presque tout $t$ : $\langle w',v\rangle+a(w,v)=(G(u_1)-G(u_2),v)_H$. La différence des deux membres appartient à $L^2(0,T;V')$ : l'égalité a lieu dans $V'$ hors d'un négligeable indépendant de $v$, et on peut l'évaluer en $v=w(t)$.

**Identité de Lions–Magenes.** $t\mapsto\|w(t)\|_H^2$ est continue, absolument continue, et $\tfrac12\tfrac{d}{dt}\|w\|_H^2=\langle w',w\rangle$ presque partout. Avec $a(w,w)\ge 0$, Cauchy–Schwarz et le caractère lipschitzien de $G$ :
$$\tfrac12\tfrac{d}{dt}\|w\|_H^2\le\|G(u_1)-G(u_2)\|_H\|w\|_H\le L\|w\|_H^2.$$

**Grönwall.** En intégrant : $\|w(t)\|_H^2\le\|w(0)\|_H^2+\int_0^t2L\|w\|_H^2$. Le lemme, avec $y=\|w\|_H^2$ continue positive, $a=\|w(0)\|_H^2\ge 0$ et $b\equiv 2L\ge 0$, donne $\|w(t)\|_H^2\le\|w(0)\|_H^2e^{2Lt}$, soit $\|u_1(t)-u_2(t)\|_H\le e^{Lt}\|u_0^1-u_0^2\|_H$. Pour $u_0^1=u_0^2$, on retrouve l'unicité (cas $a=0$ du lemme).

**Vigilance.** L'exposant est $Lt$ et la constante croît avec $T$ : l'exemple scalaire $G(s)=Ls$ montre que c'est optimal.

Indices :
1. Quelle quantité, définie pour toute solution faible, peut-on dériver en temps, et sous quel théorème ?
2. Teste la différence des équations par $w(t)$, puis majore le second membre par $L\|w\|_H^2$ grâce à Cauchy–Schwarz.
3. Intègre : $\|w(t)\|_H^2\le\|w(0)\|_H^2+\int_0^t2L\|w\|_H^2$, et applique Grönwall à $y=\|w\|_H^2$.

Erreurs fréquentes :
- Perdre le facteur $2$ : écrire $e^{Lt/2}$ ou $e^{2Lt}$ pour la norme elle-même.
- Appliquer le lemme à $\|w\|_H$ en divisant par une quantité qui peut s'annuler.
- Dériver $\|w\|_H^2$ comme si $w'$ était à valeurs dans $H$.

Variante : Même question lorsque $a$ vérifie seulement l'inégalité de Gårding $a(v,v)+\lambda\|v\|_H^2\ge\alpha\|v\|_V^2$, avec $\lambda\ge 0$ et $\alpha>0$.

Solution de la variante : On obtient $\tfrac12\tfrac{d}{dt}\|w\|_H^2\le(L+\lambda)\|w\|_H^2-\alpha\|w\|_V^2\le(L+\lambda)\|w\|_H^2$, d'où, par Grönwall avec $b\equiv 2(L+\lambda)$ : $\|u_1(t)-u_2(t)\|_H\le e^{(L+\lambda)t}\|u_0^1-u_0^2\|_H$.

Vérification : {"origin":"complement","review":"machine"}