# 17. Dualité et interpolation $H^s$ (`dualite-interpolation`) — polycopié p. PDF 18, section 4.3

## Fiche

Espaces : $H^\sigma(\mathbb R^d)$, $\sigma\in\mathbb R$, normé par $\|u\|^2_{H^\sigma}=\int(1+|\xi|^2)^\sigma|\hat u(\xi)|^2\,d\xi$. | Crochet de dualité : $\langle f,\varphi\rangle=\int\hat f(\xi)\,\hat\varphi(-\xi)\,d\xi$ pour $f\in H^{-s}$ et $\varphi\in H^s$ ; il prolonge $\int f\varphi$. | $(H^s(\mathbb R^d))'$ : dual topologique, muni de la norme duale.

Hypothèses :
- $s_0,s_1\in\mathbb R$ et $\theta\in[0,1]$. — Sans elle : Pour $\theta=2$, $s_0=0$, $s_1=1$, on aurait $\|u\|_{H^2}\le\|u\|^{-1}_{L^2}\|u\|^2_{H^1}$, que contredit $\hat u=\mathbb 1_{]0,1[}$ : $\frac{28}{15}>\big(\frac43\big)^2$.
- $u\in H^{s_0}(\mathbb R^d)\cap H^{s_1}(\mathbb R^d)$ : hypothèse implicite au polycopié, qui donne un sens au membre de droite.

Énoncé : Avec le crochet de dualité adapté, le dual hilbertien de $H^s(\mathbb R^d)$ s'identifie à $H^{-s}(\mathbb R^d)$. Si $s_0,s_1\in\mathbb R$ et $\theta\in[0,1]$, alors, pour $u\in H^{s_0}\cap H^{s_1}$,
$$\|u\|_{H^{(1-\theta)s_0+\theta s_1}}\le\|u\|^{1-\theta}_{H^{s_0}}\|u\|^{\theta}_{H^{s_1}}.$$

Bilan : {"stabilite":"Contrôle des normes intermédiaires : une borne dans $H^{s_1}$ et une petitesse dans $H^{s_0}$ donnent une petitesse dans $H^{s_\\theta}$, pour $0<\\theta<1$.","autre":"$f\\mapsto\\langle f,\\cdot\\rangle$ est une isométrie linéaire bijective de $H^{-s}(\\mathbb R^d)$ sur $(H^s(\\mathbb R^d))'$."}

Preuve dans le polycopié : idee

Plan :
1. Dualité : Cauchy–Schwarz pondéré par $w^{\mp s/2}$, majoration atteinte, puis Riesz dans $L^2$ transporté par l'isométrie $\varphi\mapsto w^{s/2}\hat\varphi(-\cdot)$.
2. Interpolation : $w_{(1-\theta)s_0+\theta s_1}=w_{s_0}^{1-\theta}w_{s_1}^\theta$.
3. Hölder d'exposants $\frac1{1-\theta}$ et $\frac1\theta$ appliqué à l'intégrale de $w_{s_\theta}|\hat u|^2$, puis racine carrée.

Vigilance :
- $H^{-1}(\Omega)$ est un dual : ses éléments ne sont pas forcément des fonctions $L^2$. $H^{-s}(\mathbb R^d)$, défini par Fourier, est une autre construction, adaptée à l'espace entier.
- Pour $s>0$, l'identification de Riesz de $H^s$ à son dual n'est pas l'inclusion $H^s\subset H^{-s}$ lue par le crochet.
- Les exposants de Hölder sont $\frac1{1-\theta}$ et $\frac1\theta$ ; aux extrémités $\theta\in\{0,1\}$, l'inégalité est une égalité.
- Une borne dans $H^1$ et une convergence dans $L^2$ donnent la convergence dans $H^s$ pour $s<1$, pas dans $H^1$.

Vérification : {"origin":"polycopie","review":"machine","notes":"Interpolation démontrée au polycopié (p. PDF 18) ; la dualité y est énoncée sans démonstration, complétée dans l’exercice facile."}

Définition « Crochet de dualité sur $\mathbb R^d$ » : Pour $f\in H^{-s}(\mathbb R^d)$ et $\varphi\in H^s(\mathbb R^d)$ : $\langle f,\varphi\rangle=\int\hat f(\xi)\,\hat\varphi(-\xi)\,d\xi$, avec $|\langle f,\varphi\rangle|\le\|f\|_{H^{-s}}\|\varphi\|_{H^s}$ ; il prolonge $\int f\varphi$.

Définition « Triplet $H^1_0\subset L^2\subset H^{-1}$ » : Si $\Omega$ est borné, $H^1_0(\Omega)\hookrightarrow L^2(\Omega)\hookrightarrow H^{-1}(\Omega)=(H^1_0(\Omega))'$, injections continues et denses, $L^2$ étant identifié à son dual.

## Contre-exemple `ce-dualite-interpolation-borne` : Borne dans $H^1$ sans convergence dans $H^1$
Assertion : Si $(u_n)$ est bornée dans $H^1(\mathbb R)$ et converge vers $0$ dans $L^2(\mathbb R)$, alors $u_n\to 0$ dans $H^1(\mathbb R)$.
Tâche : Pour $\hat u_n=\mathbb 1_{[n,n+a_n]}$ avec $a_n=(1+(n+1)^2)^{-1}$, calcule $\lim_n\|u_n\|^2_{H^1}$.
Vérification : {"kind":"rational","prompt":"Valeur de $\\lim_n\\|u_n\\|^2_{H^1}$","expected":"1"}
Explication : $\|u_n\|^2_{L^2}=a_n\to 0$ et $\|u_n\|^2_{H^1}=\int_n^{n+a_n}(1+\xi^2)\,d\xi$ est compris entre $a_n(1+n^2)$ et $a_n(1+(n+1)^2)=1$ ; les deux bornes tendent vers $1$. La suite est bornée dans $H^1$, tend vers $0$ dans $L^2$, mais pas dans $H^1$.

## Contre-exemple `ce-dualite-interpolation-inverse` : Exposants inversés
Assertion : $\|u\|_{H^{s_\theta}}\le\|u\|^{\theta}_{H^{s_0}}\|u\|^{1-\theta}_{H^{s_1}}$ pour tous $s_0,s_1$ et $\theta\in[0,1]$.
Tâche : Pour $d=1$ et $\hat u=\mathbb 1_{]0,1[}$, calcule $\|u\|^2_{L^2}$, $\|u\|^2_{H^2}$ et $\|u\|^2_{H^3}$ ; avec $s_0=3$, $s_1=0$, $\theta=\frac13$, l'énoncé inversé exigerait $\big(\|u\|^2_{H^2}\big)^3\le\|u\|^2_{H^3}\big(\|u\|^2_{L^2}\big)^2$.
Vérification : {"kind":"rational-vector","prompt":"Valeurs de $\\|u\\|^2_{L^2}$, $\\|u\\|^2_{H^2}$, $\\|u\\|^2_{H^3}$","expected":["1","28/15","96/35"],"labels":["L²","H²","H³"]}
Explication : $\int_0^1(1+\xi^2)^2\,d\xi=\frac{28}{15}$ et $\int_0^1(1+\xi^2)^3\,d\xi=\frac{96}{35}$. Or $\big(\frac{28}{15}\big)^3\approx 6{,}50>\frac{96}{35}\approx 2{,}74$ : l'énoncé inversé est faux, alors que l'énoncé correct, $\big(\frac{28}{15}\big)^3\le\big(\frac{96}{35}\big)^2$, est vérifié.

## Exercice facile `dualite-interpolation.facile` : Les duaux de $H^1_0(\Omega)$ et de $H^s(\mathbb R^d)$

Énoncé : Soit $\Omega\subset\mathbb R^d$ un ouvert borné. (a) Préciser le dual de $H^1_0(\Omega)$ et la place qu'y occupe le pivot $L^2(\Omega)$. (b) Pour $s\in\mathbb R$, $f\in H^{-s}(\mathbb R^d)$ et $\varphi\in H^s(\mathbb R^d)$, on pose $\langle f,\varphi\rangle=\int_{\mathbb R^d}\hat f(\xi)\,\hat\varphi(-\xi)\,d\xi$. Montrer que $f\mapsto\langle f,\cdot\rangle$ est une isométrie linéaire bijective de $H^{-s}(\mathbb R^d)$ sur $(H^s(\mathbb R^d))'$, et que ce crochet prolonge $\int f\varphi$. (c) Réfuter l'identification « $H^{-1}(\Omega)=L^2(\Omega)$ ».
Source : {"doc":"polycopie","pdfPage":41,"label":"Exercice 17, facile ; sections 3.2 (p. PDF 12) et 4.3 (p. PDF 18)"} — prérequis : riesz

But : `fin` — usage : application

Nœuds :
- `h-omega` (hypothese) : $\Omega\subset\mathbb R^d$ est un ouvert borné, $V=H^1_0(\Omega)$ est muni de la norme de $H^1$, et $H^{-1}(\Omega):=V'$ est son dual continu.
- `p-plong` (inclusion) : $g\mapsto\big(v\mapsto\int_\Omega gv\big)$ est linéaire, continue et injective de $L^2(\Omega)$ dans $H^{-1}(\Omega)$ : c'est l'identification du pivot $L^2$ à son dual.
- `q-dirac` (consequence) : Sur $]0,1[$, la forme $v\mapsto v(1/2)$ appartient à $H^{-1}(]0,1[)$, et n'est représentée par aucune $g\in L^2(]0,1[)$.
- `h-s` (hypothese) : $s\in\mathbb R$.
- `d-cro` (definition) : $w(\xi)=1+|\xi|^2$ et $\|v\|^2_{H^\sigma}=\int w^\sigma|\hat v|^2\,d\xi$ ; pour $f\in H^{-s}$ et $\varphi\in H^s$ : $\langle f,\varphi\rangle=\int_{\mathbb R^d}\hat f(\xi)\,\hat\varphi(-\xi)\,d\xi$.
- `c-compat` (egalite) : Pour $f,\varphi\in L^2(\mathbb R^d)$ : $\langle f,\varphi\rangle=\int_{\mathbb R^d}f\varphi\,dx$ ; pour $f\in H^{-s}$ et $\varphi\in\mathcal S$, $\langle f,\varphi\rangle$ est l'action de la distribution tempérée $f$ sur $\varphi$.
- `c-cs` (inegalite) : $|\langle f,\varphi\rangle|\le\|f\|_{H^{-s}}\,\|\varphi\|_{H^s}$.
- `c-test` (egalite) : Pour $f\in H^{-s}$, l'élément $\varphi_f$ défini par $\hat\varphi_f(\xi)=w(\xi)^{-s}\,\overline{\hat f(-\xi)}$ vérifie $\|\varphi_f\|_{H^s}=\|f\|_{H^{-s}}$ et $\langle f,\varphi_f\rangle=\|f\|^2_{H^{-s}}$.
- `c-surj` (consequence) : Toute forme $\ell\in(H^s(\mathbb R^d))'$ s'écrit $\ell=\langle f,\cdot\rangle$ avec $f\in H^{-s}(\mathbb R^d)$.
- `c-dual` (consequence) : $f\mapsto\langle f,\cdot\rangle$ est une isométrie linéaire bijective de $H^{-s}(\mathbb R^d)$ sur $(H^s(\mathbb R^d))'$.
- `fin` (conclusion) : Le dual de $H^1_0(\Omega)$ est, par définition, $H^{-1}(\Omega)$, qui contient le pivot $L^2(\Omega)$, strictement sur $]0,1[$. Le dual de $H^s(\mathbb R^d)$ s'identifie isométriquement à $H^{-s}(\mathbb R^d)$ par le crochet $\int\hat f(\xi)\hat\varphi(-\xi)\,d\xi$, qui prolonge $\int f\varphi$.
- `x-l2` (inclusion, DISTRACTEUR) : $H^{-1}(\Omega)=L^2(\Omega)$ : toute forme linéaire continue sur $H^1_0(\Omega)$ s'écrit $v\mapsto\int_\Omega gv$ avec $g\in L^2(\Omega)$.
- `x-riesz` (egalite, DISTRACTEUR) : Pour $s>0$, l'identification de Riesz de $H^s(\mathbb R^d)$ à son dual coïncide avec l'inclusion $H^s\subset H^{-s}$ lue à travers le crochet.
- `x-four` (consequence, DISTRACTEUR) : $H^{-1}(\Omega)$ est l'ensemble des $f\in\mathcal D'(\Omega)$ telles que $(1+|\xi|^2)^{-1/2}\hat f\in L^2$.

Règles :
- `h-omega` ⟹ `p-plong` par « Cauchy–Schwarz et $\|v\|_{L^2}\le\|v\|_{H^1}$ pour la continuité ; densité de $C^\infty_c(\Omega)\subset V$ dans $L^2(\Omega)$ pour l'injectivité. »
- `h-omega` ⟹ `q-dirac` par « $|v(1/2)|=\big|\int_0^{1/2}v'\big|\le 2^{-1/2}\|v'\|_{L^2}$ ; si $g\in L^2$ représentait la forme, les fonctions test $\varphi_n=\varphi(n(\cdot-\frac12))$, avec $\varphi(0)=1$, donneraient $1=\int g\varphi_n\le\|g\|_{L^2}\|\varphi_n\|_{L^2}\to 0$. »
- `h-s` + `d-cro` ⟹ `c-compat` par « Parseval appliqué à $f$ et $\bar\varphi$, avec $\widehat{\bar\varphi}(\xi)=\overline{\hat\varphi(-\xi)}$ ; sur $\mathcal S'$, $\langle f,\varphi\rangle=\langle\hat f,\mathcal F^{-1}\varphi\rangle$ et $\mathcal F^{-1}\varphi(\xi)=\hat\varphi(-\xi)$. [plancherel] »
- `h-s` + `d-cro` ⟹ `c-cs` par « Écrire $\hat f(\xi)\hat\varphi(-\xi)=\big[w^{-s/2}\hat f\big](\xi)\cdot\big[w^{s/2}\hat\varphi(-\cdot)\big](\xi)$, $w$ étant paire, puis Cauchy–Schwarz dans $L^2$. [cauchy-schwarz] »
- `h-s` + `d-cro` ⟹ `c-test` par « Calcul direct, avec la parité de $w$ et le changement de variable $\xi\mapsto-\xi$. »
- `h-s` + `d-cro` ⟹ `c-surj` par « $\varphi\mapsto w^{s/2}\hat\varphi(-\cdot)$ est une isométrie bijective de $H^s$ sur $L^2$ ; Riesz dans $L^2$ fournit $g$, puis $f=\mathcal F^{-1}(w^{s/2}g)\in H^{-s}$. [riesz] »
- `c-cs` + `c-test` + `c-surj` ⟹ `c-dual` par « Norme duale égale à $\|f\|_{H^{-s}}$ (majoration atteinte), injectivité par isométrie, surjectivité. »
- `p-plong` + `q-dirac` + `c-dual` + `c-compat` ⟹ `fin` par « Réunion des deux identifications et de leur comparaison avec le pivot. »

Justifications sans règle (séduisantes ou fausses) : « Hahn–Banach prolonge toute forme : il fournit ainsi un représentant dans $H^{-s}$. » ; « Cauchy–Schwarz directement : $|\langle f,\varphi\rangle|\le\|\hat f\|_{L^2}\|\hat\varphi\|_{L^2}$. »

Pièges :
- `c-surj` par « Hahn–Banach prolonge toute forme : il fournit ainsi un représentant dans $H^{-s}$. » → incorrect [dual-identification] : Hahn–Banach prolonge une forme définie sur un sous-espace ; il ne dit pas qu'une forme continue sur tout $H^s$ est représentée par un élément de $H^{-s}$. C'est Riesz, transporté par l'isométrie $H^s\to L^2$, qui fournit ce représentant.
- `c-cs` par « Cauchy–Schwarz directement : $|\langle f,\varphi\rangle|\le\|\hat f\|_{L^2}\|\hat\varphi\|_{L^2}$. » → incorrect [dual-identification] : Sans les poids $w^{\mp s/2}$, on ne contrôle que $\|\hat f\|_{L^2}\|\hat\varphi\|_{L^2}$, qui est infini dès que $f\notin L^2$. — Contre-exemple : Pour $s>d/2$, $\delta_0\in H^{-s}(\mathbb R^d)$, mais $\hat\delta_0=(2\pi)^{-d/2}\notin L^2(\mathbb R^d)$.
- `x-l2` → incorrect [dual-identification] : $H^{-1}(\Omega)$ est un dual : ses éléments ne sont pas forcément des fonctions de $L^2$. Le pivot $L^2$ s'y plonge strictement. — Contre-exemple : Sur $]0,1[$, $v\mapsto v(1/2)$ est continue sur $H^1_0$ ($|v(1/2)|\le 2^{-1/2}\|v'\|_{L^2}$), et n'est représentée par aucune $g\in L^2$.
- `x-riesz` → incorrect [dualite-interpolation-pivot] : L'identification de Riesz utilise le produit scalaire de $H^s$, le crochet celui de $L^2$ : pour $u\neq0$, les deux formes associées diffèrent. Lue dans $H^{-s}$, l'application de Riesz est $u\mapsto(I-\Delta)^s\bar u$. — Contre-exemple : Pour $s=1$ et $u\neq 0$ réelle : Riesz associe à $u$ la forme $\varphi\mapsto\int(u\varphi+\nabla u\cdot\nabla\varphi)=\langle(I-\Delta)u,\varphi\rangle$, et $(I-\Delta)u\neq u$ puisque $\Delta u\neq 0$ pour $u\in H^1\setminus\{0\}$.
- `x-four` → incorrect [dual-identification] : Pour $\Omega\neq\mathbb R^d$, la transformée de Fourier n'est pas définie sur $\mathcal D'(\Omega)$ : $H^{-1}(\Omega)$ est défini par dualité, et $H^{-s}(\mathbb R^d)$ défini par Fourier est une autre construction, adaptée à l'espace entier.

Retraits :
- `p-plong` (nécessaire) : L'injectivité de $g\mapsto\int gv$ repose sur la densité de $V$ dans $L^2(\Omega)$ : sans elle, des fonctions non nulles de $L^2$ définissent la forme nulle. — Contre-exemple : Pour $V_0=\{v\in H^1_0(]0,1[) : v=0\text{ sur }]0,\tfrac12[\}$, non dense dans $L^2(]0,1[)$, la fonction $g=\mathbb 1_{]0,1/2[}\neq 0$ vérifie $\int_0^1gv=0$ pour tout $v\in V_0$.

Calculs fermés : [{"kind":"rational","prompt":"Seuil $\\sigma_0$ tel que $\\delta_0\\in H^\\sigma(\\mathbb R^3)$ si et seulement si $\\sigma<\\sigma_0$.","expected":"-3/2"},{"kind":"expr-equiv","prompt":"Pour $s=1$ et des fonctions réelles : multiplicateur de Fourier de l'application de Riesz $u\\mapsto(\\cdot,u)_{H^1}$, lue dans $H^{-1}$ par le crochet, en fonction de $r=|\\xi|$ (écrire r).","expected":"1+r^2","vars":["r"]}]

Solution :
**(a) Ouvert borné.** $H^{-1}(\Omega)$ est, par définition, le dual de $V=H^1_0(\Omega)$. Pour $g\in L^2(\Omega)$, $|\int gv|\le\|g\|_{L^2}\|v\|_{L^2}\le\|g\|_{L^2}\|v\|_{H^1}$ : la forme $v\mapsto\int gv$ est dans $H^{-1}(\Omega)$, et $g\mapsto\int g\,\cdot$ est injective par densité de $C^\infty_c(\Omega)$ dans $L^2$. D'où le triplet $H^1_0\hookrightarrow L^2\hookrightarrow H^{-1}$ (polycopié, p. PDF 12).

**(b) Espace entier.** Avec $w=1+|\xi|^2$, paire :
- *Compatibilité.* Pour $f,\varphi\in L^2$, Parseval appliqué à $f$ et $\bar\varphi$ donne $\int f\varphi=\int\hat f(\xi)\hat\varphi(-\xi)\,d\xi$ ; pour $\varphi\in\mathcal S$, le crochet est l'action de la distribution $f$.
- *Continuité.* $\hat f(\xi)\hat\varphi(-\xi)=[w^{-s/2}\hat f](\xi)\,[w^{s/2}\hat\varphi(-\cdot)](\xi)$ et Cauchy–Schwarz : $|\langle f,\varphi\rangle|\le\|f\|_{H^{-s}}\|\varphi\|_{H^s}$.
- *Isométrie.* Avec $\hat\varphi_f(\xi)=w^{-s}\overline{\hat f(-\xi)}$ : $\|\varphi_f\|_{H^s}=\|f\|_{H^{-s}}$ et $\langle f,\varphi_f\rangle=\|f\|^2_{H^{-s}}$ ; la norme duale vaut donc $\|f\|_{H^{-s}}$.
- *Surjectivité.* $T\varphi=w^{s/2}\hat\varphi(-\cdot)$ est une isométrie bijective de $H^s$ sur $L^2$. Pour $\ell\in(H^s)'$, Riesz dans $L^2$ donne $g\in L^2$ avec $\ell(\varphi)=\int g\,T\varphi$ ; $f=\mathcal F^{-1}(w^{s/2}g)$ est dans $H^{-s}$ et $\ell=\langle f,\cdot\rangle$.

**(c) Le pivot n'est pas tout le dual.** Sur $]0,1[$, $v(1/2)=\int_0^{1/2}v'$ donne $|v(1/2)|\le2^{-1/2}\|v'\|_{L^2}$ : $\delta_{1/2}\in H^{-1}$. Si $g\in L^2$ la représentait, des fonctions test concentrées en $\frac12$ donneraient $1\le\|g\|_{L^2}\|\varphi_n\|_{L^2}\to0$.

**Riesz ou crochet.** Pour $s>0$, l'identification de Riesz de $H^s$ avec son dual n'est pas l'inclusion dans $H^{-s}$ : pour $s=1$ et $u$ réelle, elle associe à $u$ l'élément $(I-\Delta)u$, de multiplicateur $1+|\xi|^2$.

Indices :
1. Sur $\Omega$, le dual est une définition : quel est le rôle de $L^2(\Omega)$ ? Sur $\mathbb R^d$, quel produit le crochet doit-il prolonger ?
2. Sépare continuité, isométrie et surjectivité. Pour la continuité, insère $w^{-s/2}w^{s/2}$ ; pour la surjectivité, transporte le problème dans $L^2$.
3. $\varphi_f$ défini par $\hat\varphi_f(\xi)=w^{-s}\overline{\hat f(-\xi)}$ réalise l'égalité. Pour la surjectivité, $\varphi\mapsto w^{s/2}\hat\varphi(-\cdot)$ est une isométrie de $H^s$ sur $L^2$, puis Riesz.

Erreurs fréquentes :
- Confondre $H^{-1}(\Omega)$ avec $L^2(\Omega)$.
- Confondre l'identification de Riesz avec l'inclusion $H^s\subset H^{-s}$ donnée par le crochet.
- Définir $H^{-1}(\Omega)$ par une transformée de Fourier sur $\Omega$.

Variante : Soit $s>d/2$. Montrer que $\delta_0\in H^{-s}(\mathbb R^d)$ et que $\langle\delta_0,\varphi\rangle=\varphi(0)$ pour tout $\varphi\in\mathcal S(\mathbb R^d)$, puis que $|\varphi(0)|\le\|\delta_0\|_{H^{-s}}\|\varphi\|_{H^s}$.

Solution de la variante : $\hat\delta_0=(2\pi)^{-d/2}$, donc $\|\delta_0\|^2_{H^{-s}}=(2\pi)^{-d}\int(1+|\xi|^2)^{-s}\,d\xi<+\infty$ car $2s>d$. Pour $\varphi\in\mathcal S$ : $\langle\delta_0,\varphi\rangle=(2\pi)^{-d/2}\int\hat\varphi(-\xi)\,d\xi=(2\pi)^{-d/2}\int\hat\varphi(\xi)\,d\xi=\varphi(0)$ par inversion de Fourier en $0$. La majoration est celle du crochet ; c'est l'injection $H^s\hookrightarrow C_0$ lue par dualité.

Vérification : {"origin":"complement","review":"machine","notes":"Triplet H¹₀ ⊂ L² ⊂ H⁻¹ : polycopié p. PDF 12 ; la dualité H^{-s} ≃ (H^s)′ est énoncée sans démonstration p. PDF 18, démonstration complétée ici."}

## Exercice intermediaire `dualite-interpolation.intermediaire` : L'inégalité d'interpolation par Hölder

Énoncé : Soient $s_0,s_1\in\mathbb R$, $\theta\in[0,1]$, $s_\theta=(1-\theta)s_0+\theta s_1$ et $u\in H^{s_0}(\mathbb R^d)\cap H^{s_1}(\mathbb R^d)$. Prouver, par l'inégalité de Hölder, que $\|u\|_{H^{s_\theta}}\le\|u\|^{1-\theta}_{H^{s_0}}\|u\|^{\theta}_{H^{s_1}}$.
Source : {"doc":"polycopie","pdfPage":41,"label":"Exercice 17, intermédiaire ; démonstration de la section 4.3 (p. PDF 18)"} — prérequis : —

But : `fin` — usage : demonstration

Nœuds :
- `h-u` (hypothese) : $s_0,s_1\in\mathbb R$, $\theta\in[0,1]$, $s_\theta=(1-\theta)s_0+\theta s_1$, et $u\in H^{s_0}(\mathbb R^d)\cap H^{s_1}(\mathbb R^d)$.
- `d-w` (definition) : $w_\sigma(\xi)=(1+|\xi|^2)^\sigma$ et $\|v\|^2_{H^\sigma}=\int_{\mathbb R^d}w_\sigma|\hat v|^2\,d\xi$.
- `h-theta` (definition, locale) : Cas $0<\theta<1$.
- `e-split` (egalite) : Presque partout : $w_{s_\theta}|\hat u|^2=\big(w_{s_0}|\hat u|^2\big)^{1-\theta}\big(w_{s_1}|\hat u|^2\big)^{\theta}$.
- `e-conj` (egalite, calcul rational-vector) : $p=\frac{1}{1-\theta}$ et $q=\frac1\theta$ appartiennent à $]1,+\infty[$ et vérifient $\frac1p+\frac1q=1$.
  - valeur attendue : ["3/2","3"]
- `e-holder` (inegalite) : $\displaystyle\int w_{s_\theta}|\hat u|^2\le\Big(\int w_{s_0}|\hat u|^2\Big)^{1-\theta}\Big(\int w_{s_1}|\hat u|^2\Big)^{\theta}$.
- `e-racine` (inegalite) : Pour $0<\theta<1$ : $\|u\|_{H^{s_\theta}}\le\|u\|^{1-\theta}_{H^{s_0}}\|u\|^{\theta}_{H^{s_1}}$ ; en particulier $u\in H^{s_\theta}$.
- `c-limites` (egalite) : Pour $\theta=0$ (resp. $\theta=1$), $s_\theta=s_0$ (resp. $s_1$) et l'inégalité est une égalité.
- `fin` (conclusion) : Pour tout $\theta\in[0,1]$ : $\|u\|_{H^{(1-\theta)s_0+\theta s_1}}\le\|u\|^{1-\theta}_{H^{s_0}}\|u\|^{\theta}_{H^{s_1}}$.
- `x-swap` (inegalite, DISTRACTEUR) : $\|u\|_{H^{s_\theta}}\le\|u\|^{\theta}_{H^{s_0}}\|u\|^{1-\theta}_{H^{s_1}}$.
- `x-cvx` (egalite, DISTRACTEUR) : $\|u\|^2_{H^{s_\theta}}=(1-\theta)\|u\|^2_{H^{s_0}}+\theta\|u\|^2_{H^{s_1}}$.
- `x-fini` (consequence, DISTRACTEUR) : Les exposants $p=\frac1{1-\theta}$ et $q=\frac1\theta$ sont finis pour tout $\theta\in[0,1]$.

Règles :
- `h-u` + `d-w` ⟹ `e-split` par « $(1+|\xi|^2)^{(1-\theta)s_0+\theta s_1}=\big((1+|\xi|^2)^{s_0}\big)^{1-\theta}\big((1+|\xi|^2)^{s_1}\big)^{\theta}$, et $|\hat u|^2=(|\hat u|^2)^{1-\theta}(|\hat u|^2)^{\theta}$. »
- `h-u` + `h-theta` ⟹ `e-conj` par « $\frac1p+\frac1q=(1-\theta)+\theta=1$, avec $p,q$ finis car $\theta\notin\{0,1\}$. »
- `e-split` + `e-conj` + `h-u` + `d-w` ⟹ `e-holder` par « Inégalité de Hölder d'exposants $p$ et $q$, avec $\big\|(w_{s_0}|\hat u|^2)^{1-\theta}\big\|_{L^p}=\big(\int w_{s_0}|\hat u|^2\big)^{1-\theta}$, et de même en $q$. [holder] »
- `e-holder` + `d-w` ⟹ `e-racine` par « Définition des normes, puis racine carrée, croissante sur $[0,+\infty[$. »
- `h-u` + `d-w` ⟹ `c-limites` par « Pour $\theta\in\{0,1\}$, les deux membres coïncident, avec la convention $a^0=1$. »
- `e-racine` + `c-limites` ⟹ `fin` par « Réunion du cas $0<\theta<1$ et des cas extrêmes. »

Justifications sans règle (séduisantes ou fausses) : « Inégalité de Cauchy–Schwarz pondérée. »

Pièges :
- `e-holder` par « Inégalité de Cauchy–Schwarz pondérée. » → incorrect [dualite-interpolation-exposants] : Cauchy–Schwarz est le cas $\theta=\frac12$ de Hölder. Pour $\theta$ quelconque, il faut les exposants conjugués $p=\frac1{1-\theta}$ et $q=\frac1\theta$, adaptés aux puissances $1-\theta$ et $\theta$.
- `x-swap` → incorrect [dualite-interpolation-exposants] : Le poids $1-\theta$ porte sur la norme d'indice $s_0$ et le poids $\theta$ sur celle d'indice $s_1$ : c'est ce qu'impose $w_{s_\theta}=w_{s_0}^{1-\theta}w_{s_1}^\theta$. — Contre-exemple : $d=1$, $s_0=3$, $s_1=0$, $\theta=\frac13$ (donc $s_\theta=2$) et $\hat u=\mathbb 1_{]0,1[}$ : $\|u\|^2_{L^2}=1$, $\|u\|^2_{H^2}=\frac{28}{15}$, $\|u\|^2_{H^3}=\frac{96}{35}$. L'inégalité inversée donnerait $\big(\frac{28}{15}\big)^3\le\frac{96}{35}$, ce qui est faux.
- `x-cvx` → incorrect [calcul-exact] : L'interpolation est multiplicative, non additive : il n'y a pas d'égalité, et la moyenne arithmétique ne fait que majorer la moyenne géométrique. — Contre-exemple : $d=1$, $s_0=0$, $s_1=2$, $\theta=\frac12$, $\hat u=\mathbb 1_{]0,1[}$ : $\|u\|^2_{H^1}=\frac43$, alors que $\frac12\big(1+\frac{28}{15}\big)=\frac{43}{30}$.
- `x-fini` → incorrect [dualite-interpolation-exposants] : Pour $\theta=0$, $q=\frac1\theta$ n'est pas défini, et pour $\theta=1$, c'est $p$ : les extrémités se traitent à part, l'inégalité y étant une égalité.

Retraits :
- `e-conj` (nécessaire) : Les formules $p=\frac1{1-\theta}$ et $q=\frac1\theta$ ne définissent des exposants réels finis que pour $0<\theta<1$ : aux extrémités, l'argument ne s'écrit pas tel quel. — Contre-exemple : Pour $\theta=1$, $p=\frac{1}{1-\theta}$ n'est pas défini : le cas se traite directement, $s_\theta=s_1$ et les deux membres valent $\|u\|_{H^{s_1}}$.

Calculs fermés : [{"kind":"rational","prompt":"Pour $s_0=-1$, $s_1=3$ et $\\theta=\\frac14$, valeur de $s_\\theta$.","expected":"0"}]

Solution :
**Poids.** Avec $w_\sigma(\xi)=(1+|\xi|^2)^\sigma$, on a $w_{s_\theta}=w_{s_0}^{1-\theta}w_{s_1}^\theta$, donc, presque partout,
$$w_{s_\theta}|\hat u|^2=\big(w_{s_0}|\hat u|^2\big)^{1-\theta}\big(w_{s_1}|\hat u|^2\big)^{\theta}.$$

**Hölder.** Pour $0<\theta<1$, $p=\frac1{1-\theta}$ et $q=\frac1\theta$ sont conjugués et finis. Comme $\big\|(w_{s_0}|\hat u|^2)^{1-\theta}\big\|_{L^p}=\|u\|^{2(1-\theta)}_{H^{s_0}}$ et $\big\|(w_{s_1}|\hat u|^2)^{\theta}\big\|_{L^q}=\|u\|^{2\theta}_{H^{s_1}}$,
$$\|u\|^2_{H^{s_\theta}}\le\|u\|^{2(1-\theta)}_{H^{s_0}}\|u\|^{2\theta}_{H^{s_1}},$$
puis on prend la racine carrée. Pour $\theta\in\{0,1\}$, l'inégalité est une égalité.

**Remarques.** Aucun ordre entre $s_0$ et $s_1$ n'est requis. Inverser les exposants donne un énoncé faux : pour $s_0=3$, $s_1=0$, $\theta=\frac13$ et $\hat u=\mathbb 1_{]0,1[}$, on aurait $(28/15)^3\le 96/35$. L'hypothèse $u\in H^{s_0}\cap H^{s_1}$, implicite au polycopié, donne un sens au membre de droite.

Indices :
1. Écris $\|u\|^2_{H^{s_\theta}}$ comme une intégrale de Fourier : comment le poids $w_{s_\theta}$ s'exprime-t-il à l'aide de $w_{s_0}$ et $w_{s_1}$ ?
2. Coupe l'intégrande en deux facteurs élevés aux puissances $1-\theta$ et $\theta$, et choisis des exposants de Hölder qui annulent ces puissances.
3. Prends $p=\frac1{1-\theta}$ et $q=\frac1\theta$ : alors $\big\|(w_{s_0}|\hat u|^2)^{1-\theta}\big\|_{L^p}=\big(\int w_{s_0}|\hat u|^2\big)^{1-\theta}$.

Erreurs fréquentes :
- Placer l'exposant $\theta$ sur la norme d'indice $s_0$.
- Appliquer Cauchy–Schwarz pour un $\theta\neq\frac12$.
- Traiter $\frac1{1-\theta}$ ou $\frac1\theta$ comme un exposant réel fini pour $\theta\in\{0,1\}$, au lieu de traiter les extrémités à part.

Variante : Soient $0\le a<b$, $\theta\in]0,1[$ et $c=(1-\theta)a+\theta b$. Pour $u\in L^2(\mathbb R^d)$ tel que $|\xi|^a\hat u$ et $|\xi|^b\hat u$ soient dans $L^2$, montrer que $\||\xi|^c\hat u\|_{L^2}\le\||\xi|^a\hat u\|^{1-\theta}_{L^2}\||\xi|^b\hat u\|^{\theta}_{L^2}$, puis que $\|u'\|_{L^2}\le\|u\|^{1/2}_{L^2}\|u''\|^{1/2}_{L^2}$ pour $u\in H^2(\mathbb R)$.

Solution de la variante : Presque partout, $|\xi|^{2c}|\hat u|^2=(|\xi|^{2a}|\hat u|^2)^{1-\theta}(|\xi|^{2b}|\hat u|^2)^{\theta}$. Hölder d'exposants $\frac1{1-\theta}$ et $\frac1\theta$ donne $\int|\xi|^{2c}|\hat u|^2\le\big(\int|\xi|^{2a}|\hat u|^2\big)^{1-\theta}\big(\int|\xi|^{2b}|\hat u|^2\big)^{\theta}$, puis la racine carrée conclut. Pour $d=1$, $a=0$, $b=2$, $\theta=\frac12$ : $c=1$, et Plancherel ($\widehat{u'}=i\xi\hat u$, $\widehat{u''}=-\xi^2\hat u$) donne $\|u'\|_{L^2}\le\|u\|^{1/2}_{L^2}\|u''\|^{1/2}_{L^2}$.

Graphe de la variante :
But : `fin` — usage : demonstration

Nœuds :
- `h-u` (hypothese) : $0\le a<b$, $\theta\in]0,1[$, $c=(1-\theta)a+\theta b$, et $u\in L^2(\mathbb R^d)$ avec $|\xi|^a\hat u,|\xi|^b\hat u\in L^2$.
- `e-split` (egalite) : Presque partout : $|\xi|^{2c}|\hat u|^2=\big(|\xi|^{2a}|\hat u|^2\big)^{1-\theta}\big(|\xi|^{2b}|\hat u|^2\big)^{\theta}$.
- `e-conj` (egalite) : $p=\frac1{1-\theta}$ et $q=\frac1\theta$ sont finis et conjugués.
- `e-holder` (inegalite) : $\displaystyle\int|\xi|^{2c}|\hat u|^2\le\Big(\int|\xi|^{2a}|\hat u|^2\Big)^{1-\theta}\Big(\int|\xi|^{2b}|\hat u|^2\Big)^{\theta}$.
- `e-racine` (inegalite) : $\||\xi|^c\hat u\|_{L^2}\le\||\xi|^a\hat u\|^{1-\theta}_{L^2}\||\xi|^b\hat u\|^{\theta}_{L^2}$.
- `e-gn` (inegalite) : Pour $u\in H^2(\mathbb R)$ : $\|u'\|_{L^2}\le\|u\|^{1/2}_{L^2}\|u''\|^{1/2}_{L^2}$.
- `fin` (conclusion) : L'interpolation homogène est établie, ainsi que son cas particulier $\|u'\|^2_{L^2}\le\|u\|_{L^2}\|u''\|_{L^2}$ sur $\mathbb R$.
- `x-swap` (inegalite, DISTRACTEUR) : $\||\xi|^c\hat u\|_{L^2}\le\||\xi|^a\hat u\|^{\theta}_{L^2}\||\xi|^b\hat u\|^{1-\theta}_{L^2}$.
- `x-somme` (egalite, DISTRACTEUR) : $\||\xi|^c\hat u\|^2_{L^2}=(1-\theta)\||\xi|^a\hat u\|^2_{L^2}+\theta\||\xi|^b\hat u\|^2_{L^2}$.

Règles :
- `h-u` ⟹ `e-split` par « $|\xi|^{2c}=(|\xi|^{2a})^{1-\theta}(|\xi|^{2b})^{\theta}$. »
- `h-u` ⟹ `e-conj` par « $(1-\theta)+\theta=1$, avec $0<\theta<1$. »
- `e-split` + `e-conj` + `h-u` ⟹ `e-holder` par « Inégalité de Hölder d’exposants conjugués. [holder] »
- `e-holder` ⟹ `e-racine` par « Racine carrée, croissante sur $[0,+\infty[$. »
- `e-racine` ⟹ `e-gn` par « Cas $d=1$, $a=0$, $b=2$, $\theta=\frac12$, et Plancherel : $\widehat{u'}=i\xi\hat u$, $\widehat{u''}=-\xi^2\hat u$. [plancherel] »
- `e-racine` + `e-gn` ⟹ `fin` par « Réunion du cas général et du cas particulier. »

Pièges :
- `x-swap` → incorrect [dualite-interpolation-exposants] : Le poids $1-\theta$ doit porter sur l'indice $a$, conformément à $c=(1-\theta)a+\theta b$. — Contre-exemple : $d=1$, $a=0$, $b=2$, $\theta=\frac14$, $\hat u=\mathbb 1_{]0,1[}$ : $\||\xi|^{1/2}\hat u\|^2=\frac12$, alors que l'inégalité inversée, élevée à la puissance $8$, donnerait $\frac1{16}\le\frac1{125}$.
- `x-somme` → incorrect [calcul-exact] : L’interpolation est multiplicative : la combinaison convexe des carrés n’est qu’un majorant. — Contre-exemple : $d=1$, $a=0$, $b=2$, $\theta=\frac12$, $\hat u=\mathbb 1_{]0,1[}$ : $\int_0^1\xi^2\,d\xi=\frac13\neq\frac12\big(1+\frac15\big)=\frac35$.

Vérification : {"origin":"polycopie","review":"machine","notes":"Démonstration du polycopié (p. PDF 18) ; l’hypothèse u ∈ H^{s0} ∩ H^{s1}, implicite, est explicitée."}

## Exercice difficile `dualite-interpolation.difficile` : Convergence forte dans $H^s$ par interpolation

Énoncé : Soient $s\in]0,1[$ et $(u_n)$ une suite de $H^1(\mathbb R^d)$ telle que $\|u_n\|_{H^1}\le M$ pour tout $n$ et $u_n\to u$ dans $L^2(\mathbb R^d)$. Montrer que $u\in H^1(\mathbb R^d)$ et que la suite entière converge vers $u$ dans $H^s(\mathbb R^d)$. Montrer que la convergence dans $H^1$ peut échouer.
Source : {"doc":"polycopie","pdfPage":41,"label":"Exercice 17, difficile ; exemple de la section 4.3 (p. PDF 18)"} — prérequis : —

But : `fin` — usage : application

Nœuds :
- `h-borne` (hypothese) : $(u_n)\subset H^1(\mathbb R^d)$ et $\|u_n\|_{H^1}\le M$ pour tout $n$.
- `h-cv` (hypothese) : $u_n\to u$ dans $L^2(\mathbb R^d)$.
- `h-s` (hypothese) : $s\in]0,1[$.
- `s-fatou` (consequence) : $u\in H^1(\mathbb R^d)$ et $\|u\|_{H^1}\le M$.
- `s-diff` (inegalite) : $\|u_n-u\|_{H^1}\le 2M$ pour tout $n$.
- `t-interp` (application-theoreme) : Pour tout $v\in H^1(\mathbb R^d)$ : $\|v\|_{H^s}\le\|v\|^{1-s}_{L^2}\|v\|^{s}_{H^1}$.
- `e-bound` (inegalite, calcul expr-equiv) : $\|u_n-u\|_{H^s}\le(2M)^s\,\|u_n-u\|^{1-s}_{L^2}$ pour tout $n$.
  - valeur attendue : "1-s"
- `f-split` (inegalite) : Pour tout $R>0$ et tout $n$ : $\|u_n-u\|^2_{H^s}\le(1+R^2)^s\|u_n-u\|^2_{L^2}+(1+R^2)^{s-1}(2M)^2$.
- `fin` (conclusion) : $u\in H^1(\mathbb R^d)$ et $u_n\to u$ dans $H^s(\mathbb R^d)$, pour toute la suite.
- `x-H1` (consequence, DISTRACTEUR) : $u_n\to u$ dans $H^1(\mathbb R^d)$.
- `x-sous-suite` (consequence, DISTRACTEUR) : Seule une sous-suite de $(u_n)$ converge vers $u$ dans $H^s(\mathbb R^d)$.

Règles :
- `h-borne` + `h-cv` ⟹ `s-fatou` par « Plancherel : $\hat u_n\to\hat u$ dans $L^2$ ; extraction d'une sous-suite convergeant presque partout ; lemme de Fatou appliqué à $(1+|\xi|^2)|\hat u_{n_k}|^2$. »
- `h-borne` + `s-fatou` ⟹ `s-diff` par « Inégalité triangulaire dans $H^1$. [inegalite-triangulaire] »
- `h-s` ⟹ `t-interp` par « Inégalité d'interpolation avec $s_0=0$, $s_1=1$, $\theta=s$. [dualite-interpolation] » (chemin holder)
- `t-interp` + `s-diff` ⟹ `e-bound` par « Application à $v=u_n-u\in H^1$, puis majoration $\|u_n-u\|_{H^1}\le 2M$. » (chemin holder)
- `e-bound` + `h-cv` + `h-s` ⟹ `fin` par « $\|u_n-u\|_{L^2}\to 0$ et $1-s>0$, donc $\|u_n-u\|^{1-s}_{L^2}\to 0$. » (chemin holder)
- `h-s` + `s-diff` ⟹ `f-split` par « Sur $|\xi|\le R$ : $(1+|\xi|^2)^s\le(1+R^2)^s$ ; sur $|\xi|>R$ : $(1+|\xi|^2)^s\le(1+R^2)^{s-1}(1+|\xi|^2)$, car $s-1<0$. » (chemin frequences)
- `f-split` + `h-cv` + `h-s` ⟹ `fin` par « Pour $\varepsilon>0$, choisir $R$ tel que $(1+R^2)^{s-1}(2M)^2<\varepsilon/2$, puis $n$ assez grand pour le premier terme. » (chemin frequences)

Justifications sans règle (séduisantes ou fausses) : « $H^1(\mathbb R^d)$ est fermé dans $L^2(\mathbb R^d)$, donc la limite $u$ est dans $H^1$. » ; « L'injection $H^1(\mathbb R^d)\hookrightarrow L^2(\mathbb R^d)$ est compacte, donc la suite converge dans $H^1$, a fortiori dans $H^s$. »

Pièges :
- `s-fatou` par « $H^1(\mathbb R^d)$ est fermé dans $L^2(\mathbb R^d)$, donc la limite $u$ est dans $H^1$. » → incorrect [densite-fermeture] : $H^1(\mathbb R^d)$ est dense et non fermé dans $L^2(\mathbb R^d)$ : c'est la borne uniforme, via Fatou, qui place la limite dans $H^1$. — Contre-exemple : $\mathbb 1_{]0,1[}\in L^2(\mathbb R)$ est limite dans $L^2$ de régularisées $\mathbb 1_{]0,1[}*\rho_\varepsilon\in H^1(\mathbb R)$, sans appartenir à $H^1(\mathbb R)$.
- `fin` par « L'injection $H^1(\mathbb R^d)\hookrightarrow L^2(\mathbb R^d)$ est compacte, donc la suite converge dans $H^1$, a fortiori dans $H^s$. » → incorrect [domaine-borne] : Sur $\mathbb R^d$, l'injection $H^1\hookrightarrow L^2$ n'est pas compacte (translations), et une compacité donnerait de toute façon une convergence dans $L^2$, pas dans $H^1$.
- `x-H1` → incorrect [dualite-interpolation-borne] : L'interpolation exige $1-s>0$ : en $s=1$, la borne ne donne aucune convergence. — Contre-exemple : $d=1$, $\hat u_n=\mathbb 1_{[n,n+a_n]}$ avec $a_n=(1+(n+1)^2)^{-1}$ : $\|u_n\|^2_{L^2}=a_n\to 0$, mais $\frac{1+n^2}{1+(n+1)^2}\le\|u_n\|^2_{H^1}\le 1$, donc $\|u_n\|_{H^1}\to 1$.
- `x-sous-suite` → incorrect [dualite-interpolation-borne] : La majoration $\|u_n-u\|_{H^s}\le(2M)^s\|u_n-u\|^{1-s}_{L^2}$ vaut pour tout $n$ : l'extraction ne sert qu'à établir $u\in H^1$.

Retraits :
- `h-borne` (nécessaire) : Sans borne en $H^1$, la convergence dans $L^2$ ne contrôle pas les hautes fréquences. — Contre-exemple : $d=1$, $\hat u_n=\mathbb 1_{[n,n+b_n]}$ avec $b_n=(1+(n+1)^2)^{-s}$ : $u_n\in H^1$, $\|u_n\|^2_{L^2}=b_n\to 0$, mais $\|u_n\|^2_{H^s}\ge b_n(1+n^2)^s\to 1$.

Calculs fermés : [{"kind":"rational","prompt":"Pour $s=\\frac12$, $\\|v\\|_{L^2}=\\frac1{16}$ et $\\|v\\|_{H^1}=4$, valeur de $\\|v\\|^{1-s}_{L^2}\\|v\\|^{s}_{H^1}$.","expected":"1/2"}]

Solution :
**La limite est dans $H^1$.** Par Plancherel, $\hat u_n\to\hat u$ dans $L^2$ ; une sous-suite converge presque partout, et Fatou donne $\int(1+|\xi|^2)|\hat u|^2\le\liminf_k\int(1+|\xi|^2)|\hat u_{n_k}|^2\le M^2$. Donc $u\in H^1$, $\|u\|_{H^1}\le M$ et $\|u_n-u\|_{H^1}\le 2M$. L'argument « $H^1$ est fermé dans $L^2$ » est faux : $H^1$ y est dense.

**Interpolation.** Avec $s_0=0$, $s_1=1$, $\theta=s$ :
$$\|u_n-u\|_{H^s}\le\|u_n-u\|^{1-s}_{L^2}\|u_n-u\|^{s}_{H^1}\le(2M)^s\|u_n-u\|^{1-s}_{L^2}\longrightarrow 0,$$
car $1-s>0$. La suite entière converge : l'extraction n'a servi qu'à identifier $u\in H^1$.

**Autre voie : découpage en fréquences.** Pour $R>0$, $\|u_n-u\|^2_{H^s}\le(1+R^2)^s\|u_n-u\|^2_{L^2}+(1+R^2)^{s-1}(2M)^2$ ; on choisit $R$ pour rendre le second terme petit, puis $n$ grand.

**Pas de convergence dans $H^1$.** $\hat u_n=\mathbb 1_{[n,n+a_n]}$, $a_n=(1+(n+1)^2)^{-1}$ : $\|u_n\|_{L^2}\to 0$ et $\|u_n\|_{H^1}\to1$. Le cas $s=1$ est exclu.

Indices :
1. Avant d'estimer $u_n-u$ dans $H^s$, faut-il savoir que $u$ est dans un espace de Sobolev ? Lequel ?
2. Fatou côté Fourier donne $u\in H^1$ ; ensuite, une inégalité entre $L^2$, $H^s$ et $H^1$ appliquée à $u_n-u$ suffit.
3. Interpolation avec $s_0=0$, $s_1=1$, $\theta=s$ : $\|v\|_{H^s}\le\|v\|^{1-s}_{L^2}\|v\|^s_{H^1}$, avec $v=u_n-u$ et $\|v\|_{H^1}\le 2M$.

Erreurs fréquentes :
- Écrire $\|u_n-u\|_{H^1}$ sans avoir établi $u\in H^1$.
- Croire $H^1$ fermé dans $L^2$.
- Conclure à la convergence dans $H^1$, ou pour $s=1$.
- Invoquer une compacité de $H^1(\mathbb R^d)\hookrightarrow L^2(\mathbb R^d)$, fausse sur l'espace entier.

Variante : Soit $(u_n)$ bornée dans $H^1(\mathbb R^d)$, avec $u_n\to u$ dans $H^{-1}(\mathbb R^d)$ et $u\in H^1(\mathbb R^d)$. Montrer que $u_n\to u$ dans $L^2(\mathbb R^d)$.

Solution de la variante : L'interpolation avec $s_0=-1$, $s_1=1$, $\theta=\frac12$ donne $s_\theta=0$ et $\|v\|_{L^2}\le\|v\|^{1/2}_{H^{-1}}\|v\|^{1/2}_{H^1}$. Pour $v=u_n-u$ : $\|u_n-u\|_{L^2}\le\|u_n-u\|^{1/2}_{H^{-1}}\big(\sup_n\|u_n\|_{H^1}+\|u\|_{H^1}\big)^{1/2}\to 0$.

Vérification : {"origin":"complement","review":"machine","notes":"L’argument d’interpolation vient du polycopié (p. PDF 18), qui ne traite que le cas uₙ → 0 ; l’appartenance de la limite à H¹ (Fatou), le découpage en fréquences et le contre-exemple dans H¹ sont des compléments."}