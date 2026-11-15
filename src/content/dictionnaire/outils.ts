/**
 * Outils admis : résultats classiques que les démonstrations du jeu invoquent sans les
 * redémontrer. L'identifiant `outil-<clé>` reprend la clé de `AUX_TOOLS` (catalogue).
 */
import { t } from '../authoring';
import type { DicoEntry } from './types';

export const OUTILS: DicoEntry[] = [
  {
    id: 'outil-parallelogramme',
    term: 'Identité du parallélogramme',
    domain: 'outils',
    forms: ['identité du parallélogramme', 'parallélogramme'],
    definition: t`Dans un espace préhilbertien : $\|u+v\|^2+\|u-v\|^2=2\|u\|^2+2\|v\|^2$.`,
    complements: [
      { kind: 'retenir', text: 'Elle caractérise les normes issues d’un produit scalaire. Appliquée à une suite minimisante, elle montre que la suite est de Cauchy : c’est le cœur de la projection sur un convexe fermé.' },
    ],
    related: ['produit-scalaire', 'resultat-projection'],
  },
  {
    id: 'outil-cauchy-schwarz',
    term: 'Inégalité de Cauchy–Schwarz',
    domain: 'outils',
    forms: ['cauchy–schwarz', 'inégalité de cauchy–schwarz', 'inégalités de cauchy–schwarz'],
    definition: t`$|\langle u,v\rangle|\le\|u\|\,\|v\|$, avec égalité si et seulement si $u$ et $v$ sont colinéaires. Dans $L^2$ : $\big|\int uv\big|\le\|u\|_{L^2}\|v\|_{L^2}$.`,
    complements: [
      { kind: 'exemple', text: t`$\big|\int_\Omega u\big|\le|\Omega|^{1/2}\|u\|_{L^2}$ (prendre $v=1$) ; $|u(x)-u(y)|\le|x-y|^{1/2}\|u'\|_{L^2}$ pour $u\in H^1(]a,b[)$.` },
    ],
    related: ['produit-scalaire', 'outil-holder'],
  },
  {
    id: 'outil-inegalite-triangulaire',
    term: 'Inégalité triangulaire',
    domain: 'outils',
    forms: ['inégalité triangulaire', 'inégalités triangulaires'],
    definition: t`$\|u+v\|\le\|u\|+\|v\|$ ; forme renversée : $\big|\|u\|-\|v\|\big|\le\|u-v\|$.`,
    complements: [
      { kind: 'retenir', text: 'La forme renversée donne la continuité de la norme : $u_n\\to u$ entraîne $\\|u_n\\|\\to\\|u\\|$.' },
    ],
    related: ['norme'],
  },
  {
    id: 'outil-young',
    term: 'Inégalité de Young',
    domain: 'outils',
    forms: ['inégalité de young', 'young'],
    definition: t`Pour $a,b\ge0$ et $\varepsilon>0$ : $ab\le\frac\varepsilon2a^2+\frac1{2\varepsilon}b^2$ ; plus généralement $ab\le\frac{a^p}p+\frac{b^{p'}}{p'}$ avec $\frac1p+\frac1{p'}=1$.`,
    complements: [
      { kind: 'exemple', text: t`Dans une estimation a priori : $\langle f,u\rangle\le\|f\|_{V'}\|u\|_V\le\frac\alpha2\|u\|_V^2+\frac1{2\alpha}\|f\|_{V'}^2$, ce qui absorbe le terme en $u$ dans la partie coercive.` },
    ],
    related: ['estimation-a-priori', 'outil-holder'],
  },
  {
    id: 'outil-holder',
    term: 'Inégalité de Hölder',
    domain: 'outils',
    forms: ['hölder', 'inégalité de hölder', 'inégalités de hölder', 'holder', 'exposant conjugué', 'exposants conjugués'],
    definition: t`Pour $\frac1p+\frac1{p'}=1$ : $\int|uv|\le\|u\|_{L^p}\|v\|_{L^{p'}}$. Pour $p=p'=2$, c'est Cauchy–Schwarz.`,
    complements: [
      { kind: 'retenir', text: t`Sur un domaine de mesure finie, elle donne $L^q(\Omega)\subset L^p(\Omega)$ pour $p\le q$.` },
    ],
    related: ['outil-cauchy-schwarz', 'espace-lp'],
  },
  {
    id: 'outil-convergence-dominee',
    term: 'Théorème de convergence dominée',
    domain: 'outils',
    forms: ['convergence dominée', 'théorème de convergence dominée', 'théorème de lebesgue', 'domination'],
    definition: t`Si $f_n\to f$ presque partout et $|f_n|\le g$ avec $g$ intégrable (indépendante de $n$), alors $f$ est intégrable et $\int f_n\to\int f$.`,
    complements: [
      { kind: 'contre-exemple', text: t`$f_n=n\mathbf 1_{]0,1/n[}\to0$ presque partout, mais $\int f_n=1$ : pas de domination intégrable.` },
    ],
    related: ['presque-partout', 'integrable', 'passage-limite'],
  },
  {
    id: 'outil-tonelli',
    term: 'Théorèmes de Tonelli et Fubini',
    domain: 'outils',
    forms: ['tonelli', 'fubini', 'théorème de tonelli', 'théorème de fubini'],
    definition: t`Pour $f\ge0$ mesurable (Tonelli), ou $f$ intégrable sur le produit (Fubini) : $\iint f(x,y)\,dx\,dy=\int\big(\int f(x,y)\,dy\big)dx=\int\big(\int f(x,y)\,dx\big)dy$.`,
    complements: [
      { kind: 'retenir', text: 'Tonelli s’applique sans hypothèse d’intégrabilité aux fonctions positives : c’est souvent lui qui prouve l’intégrabilité requise par Fubini.' },
    ],
    related: ['integrable'],
  },
  {
    id: 'outil-zorn',
    term: 'Lemme de Zorn',
    domain: 'outils',
    forms: ['lemme de zorn', 'zorn'],
    definition: t`Dans un ensemble ordonné non vide où toute partie totalement ordonnée admet un majorant, il existe un élément maximal.`,
    complements: [
      { kind: 'retenir', text: 'Il fournit le prolongement de Hahn–Banach en dimension infinie quelconque (sans hypothèse de séparabilité).' },
    ],
    related: ['resultat-hahn-banach'],
  },
  {
    id: 'outil-tychonoff',
    term: 'Théorème de Tychonoff',
    domain: 'outils',
    forms: ['tychonoff', 'théorème de tychonoff'],
    definition: t`Un produit quelconque d'espaces topologiques compacts est compact pour la topologie produit.`,
    complements: [
      { kind: 'retenir', text: 'C’est l’outil de la preuve générale de Banach–Alaoglu : la boule duale se plonge dans un produit de segments.' },
    ],
    related: ['resultat-banach-alaoglu', 'compact'],
  },
  {
    id: 'outil-baire',
    term: 'Théorème de Baire',
    domain: 'outils',
    forms: ['baire', 'théorème de baire', 'lemme de baire'],
    from: 'bs-baire',
    complements: [
      { kind: 'retenir', text: 'Forme équivalente : une intersection dénombrable d’ouverts denses est dense. La complétude est indispensable.' },
      { kind: 'exemple', text: 'Il fonde Banach–Steinhaus et l’application ouverte ; il montre aussi qu’un Banach de dimension infinie n’a pas de base algébrique dénombrable.' },
    ],
    related: ['complet', 'interieur', 'resultat-banach-steinhaus', 'resultat-application-ouverte'],
  },
  {
    id: 'outil-point-fixe-banach',
    term: 'Théorème du point fixe de Banach',
    domain: 'outils',
    forms: ['point fixe de banach', 'théorème du point fixe de banach', 'contraction stricte', 'contractions strictes'],
    definition: t`Une application $k$-lipschitzienne avec $k<1$ d'un espace métrique complet non vide dans lui-même a un unique point fixe, limite de toute suite $x_{n+1}=T(x_n)$.`,
    complements: [
      { kind: 'exemple', text: t`Preuve de Stampacchia : $u\mapsto P_K\big(u-\rho(Au-f)\big)$ est une contraction pour $\rho>0$ assez petit.` },
    ],
    related: ['lipschitz', 'complet', 'resultat-stampacchia'],
  },
  {
    id: 'outil-brouwer',
    term: 'Théorème du point fixe de Brouwer',
    domain: 'outils',
    forms: ['brouwer', 'théorème de brouwer', 'point fixe de brouwer'],
    definition: t`Toute application continue de la boule fermée de $\mathbb R^n$ dans elle-même a au moins un point fixe.`,
    complements: [
      { kind: 'retenir', text: 'Corollaire utilisé pour Galerkin non linéaire : si $P$ est continue sur $\\mathbb R^n$ avec $P(x)\\cdot x\\ge0$ sur une sphère, $P$ s’annule dans la boule.' },
    ],
    related: ['resultat-browder-minty', 'resultat-galerkin'],
  },
  {
    id: 'outil-eberlein-smulian',
    term: 'Théorème d’Eberlein–Šmulian',
    domain: 'outils',
    forms: ['eberlein–šmulian', 'eberlein–smulian', 'eberlein'],
    definition: t`Dans un espace de Banach, une partie est relativement compacte pour la topologie faible si et seulement si toute suite de cette partie admet une sous-suite faiblement convergente.`,
    complements: [
      { kind: 'retenir', text: 'Avec la réflexivité, il donne l’extraction faible de toute suite bornée.' },
    ],
    related: ['convergence-faible', 'resultat-extraction-reflexive'],
  },
  {
    id: 'outil-frechet-kolmogorov',
    term: 'Critère de Fréchet–Kolmogorov',
    domain: 'outils',
    forms: ['fréchet–kolmogorov', 'frechet–kolmogorov', 'kolmogorov'],
    definition: t`Une partie bornée $\mathcal F$ de $L^p(\mathbb R^d)$, $1\le p<\infty$, est relativement compacte dans $L^p(\Omega)$ ($\Omega$ borné) si les translations sont uniformément petites : $\sup_{f\in\mathcal F}\|f(\cdot+h)-f\|_{L^p}\to0$ quand $h\to0$.`,
    complements: [
      { kind: 'retenir', text: t`Pour $f\in H^1$ : $\|f(\cdot+h)-f\|_{L^2}\le|h|\,\|\nabla f\|_{L^2}$, d'où la compacité de Rellich.` },
    ],
    related: ['resultat-rellich', 'relativement-compact'],
  },
  {
    id: 'outil-densite-cinf',
    term: 'Densité des fonctions régulières',
    domain: 'outils',
    forms: ['densité de c^∞_c', 'densité des fonctions régulières', 'densité des fonctions tests'],
    definition: t`$C^\infty_c(\Omega)$ est dense dans $L^p(\Omega)$ pour $1\le p<\infty$ (par troncature et convolution) ; $C^\infty(\overline\Omega)$ est dense dans $H^1(\Omega)$ pour $\Omega$ lipschitzien.`,
    complements: [
      { kind: 'retenir', text: 'C’est le point de départ de tout argument de densité : établir une formule pour les fonctions régulières, puis prolonger.' },
    ],
    related: ['densite', 'argument-densite', 'fonctions-test'],
  },
  {
    id: 'outil-riemann-lebesgue',
    term: 'Lemme de Riemann–Lebesgue',
    domain: 'outils',
    forms: ['riemann–lebesgue', 'lemme de riemann–lebesgue'],
    definition: t`Pour $u\in L^1(\mathbb R^d)$, $\hat u$ est continue et tend vers $0$ à l'infini. En particulier, $\int_a^bu(x)\sin(nx)\,dx\to0$.`,
    complements: [
      { kind: 'retenir', text: t`D'où $\sin(nx)\rightharpoonup0$ dans $L^2(a,b)$ : les oscillations rapides tendent faiblement vers $0$.` },
    ],
    related: ['fourier', 'convergence-faible'],
  },
  {
    id: 'outil-plongement-canonique',
    term: 'Plongement canonique dans le bidual',
    domain: 'outils',
    forms: ['plongement canonique', 'plongements canoniques'],
    definition: t`$J:E\to E''$, $J(u)(f)=f(u)$, est une isométrie linéaire : $\|J(u)\|_{E''}=\|u\|_E$ (par Hahn–Banach).`,
    complements: [
      { kind: 'retenir', text: t`$E$ est réflexif lorsque $J$ est surjective.` },
    ],
    related: ['bidual', 'reflexif'],
  },
  {
    id: 'outil-theoreme-fondamental',
    term: 'Théorème fondamental de l’analyse',
    domain: 'outils',
    forms: ['théorème fondamental', 'théorème fondamental du calcul intégral', 'théorème fondamental de l’analyse'],
    definition: t`Si $f$ est continue sur $[a,b]$, alors $F(x)=\int_a^xf$ est dérivable de dérivée $f$ ; pour $F$ de classe $C^1$ (ou absolument continue), $F(b)-F(a)=\int_a^bF'$.`,
    complements: [
      { kind: 'exemple', text: t`Pour $u\in H^1_0(]0,1[)$ : $u(x)=\int_0^xu'$, d'où $|u(x)|\le\|u'\|_{L^2}$ par Cauchy–Schwarz — la preuve de Poincaré en dimension $1$.` },
    ],
    related: ['absolument-continue', 'resultat-poincare'],
  },
  {
    id: 'outil-theoreme-cauchy-lipschitz',
    term: 'Théorème de Cauchy–Lipschitz',
    domain: 'outils',
    forms: ['cauchy–lipschitz', 'théorème de cauchy–lipschitz', 'problème de cauchy', 'problèmes de cauchy'],
    definition: t`Si $f(t,y)$ est continue et localement lipschitzienne en $y$, le problème de Cauchy $y'=f(t,y)$, $y(t_0)=y_0$ admet une unique solution maximale.`,
    complements: [
      { kind: 'retenir', text: 'Si $f$ est globalement lipschitzienne en $y$, la solution est globale ; sinon, elle peut exploser en temps fini (alternative d’explosion).' },
    ],
    related: ['edo', 'flot', 'systeme-galerkin'],
  },
  {
    id: 'outil-serie-neumann',
    term: 'Série de Neumann',
    domain: 'outils',
    forms: ['série de neumann', 'séries de neumann'],
    definition: t`Si $T\in\mathcal L(X)$ sur un Banach vérifie $\|T\|<1$, alors $I-T$ est inversible et $(I-T)^{-1}=\sum_{k\ge0}T^k$, de norme au plus $\frac1{1-\|T\|}$.`,
    complements: [
      { kind: 'retenir', text: 'Conséquence : les opérateurs inversibles forment un ouvert, et l’ensemble résolvant est ouvert (le spectre est fermé).' },
    ],
    related: ['inversible', 'spectre'],
  },
  {
    id: 'outil-lemme-riesz-compacite',
    term: 'Lemme de compacité de Riesz',
    domain: 'outils',
    forms: ['lemme de compacité de riesz', 'théorème de compacité de riesz', 'lemme de riesz'],
    definition: t`La boule unité fermée d'un espace normé est compacte si et seulement si l'espace est de dimension finie.`,
    complements: [
      { kind: 'retenir', text: 'En dimension infinie, la compacité forte ne vient jamais gratuitement : elle doit être fournie par un théorème (Rellich, Aubin–Lions, opérateur compact).' },
    ],
    related: ['compact', 'dimension', 'boule'],
  },
  {
    id: 'outil-fonction-implicite',
    term: 'Théorèmes des fonctions implicites et d’inversion locale',
    domain: 'outils',
    forms: ['fonctions implicites', 'fonction implicite', 'théorème des fonctions implicites', 'inversion locale', 'théorème d’inversion locale'],
    definition: t`Si $F:\mathbb R^n\times\mathbb R^m\to\mathbb R^m$ est $C^1$, $F(a,b)=0$ et $\partial_yF(a,b)$ est inversible, alors près de $(a,b)$ l'équation $F(x,y)=0$ équivaut à $y=\varphi(x)$ avec $\varphi$ de classe $C^1$.`,
    complements: [
      { kind: 'retenir', text: 'C’est l’outil de la preuve du théorème du niveau régulier : localement, le niveau est un graphe.' },
    ],
    related: ['resultat-niveau-regulier', 'diffeomorphisme'],
  },
  {
    id: 'outil-schwarz',
    term: 'Théorème de Schwarz',
    domain: 'outils',
    forms: ['théorème de schwarz', 'lemme de schwarz', 'symétrie des dérivées secondes'],
    definition: t`Pour $f$ de classe $C^2$ : $\partial_i\partial_jf=\partial_j\partial_if$.`,
    complements: [
      { kind: 'retenir', text: t`C'est ce qui fait disparaître les dérivées secondes dans le calcul du crochet de Lie : $[X,Y]$ est un champ du premier ordre.` },
    ],
    related: ['crochet-lie-champs'],
  },
  {
    id: 'outil-formule-jacobi',
    term: 'Formule de Jacobi',
    domain: 'outils',
    forms: ['formule de jacobi'],
    definition: t`$\frac{d}{dt}\det A(t)=\operatorname{tr}\big(\operatorname{adj}A(t)\,A'(t)\big)$ ; en particulier $\frac{d}{dt}\big|_{t=0}\det(I+tX)=\operatorname{tr}X$ et $\det e^X=e^{\operatorname{tr}X}$.`,
    complements: [
      { kind: 'retenir', text: t`Elle donne l'algèbre de Lie de $SL(n)$ : $\mathfrak{sl}(n)=\{X:\operatorname{tr}X=0\}$.` },
    ],
    related: ['determinant', 'trace-matrice', 'resultat-algebre-lie-matricielle'],
  },
  {
    id: 'outil-formule-cartan',
    term: 'Formule de Cartan',
    domain: 'outils',
    forms: ['formule de cartan', 'formule magique de cartan'],
    definition: t`Pour une forme différentielle $\alpha$ et un champ $X$ : $\mathcal L_X\alpha=d(\iota_X\alpha)+\iota_X(d\alpha)$.`,
    complements: [
      { kind: 'retenir', text: t`Pour $\omega$ fermée et $X_H$ hamiltonien : $\mathcal L_{X_H}\omega=d(\iota_{X_H}\omega)=d(dH)=0$ — le flot hamiltonien préserve $\omega$.` },
    ],
    related: ['derivee-lie', 'forme-symplectique', 'resultat-flot-hamiltonien'],
  },
  {
    id: 'outil-relevement-homotopies',
    term: 'Relèvement des homotopies',
    domain: 'outils',
    forms: ['relèvement des homotopies', 'propriété de relèvement'],
    definition: t`Pour un revêtement, toute homotopie de chemins à extrémités fixes se relève en une homotopie de chemins relevés : deux chemins homotopes ont des relevés de même extrémité.`,
    complements: [
      { kind: 'retenir', text: t`Conséquence : si le relevé d'un lacet ne se referme pas, ce lacet n'est pas contractile (cas de la rotation d'angle $2\pi$ dans $SO(3)$).` },
    ],
    related: ['revetement', 'relevement-chemin', 'lacet'],
  },
  {
    id: 'outil-sphere-simplement-connexe',
    term: 'La sphère $S^3$ est simplement connexe',
    domain: 'outils',
    forms: ['sphère simplement connexe'],
    definition: t`Tout lacet de $S^n$, $n\ge2$, est contractile ; en particulier $S^3\simeq SU(2)$ est simplement connexe.`,
    complements: [
      { kind: 'retenir', text: t`$SU(2)$ est donc le revêtement universel de $SO(3)$, et $\pi_1(SO(3))$ a deux éléments.` },
    ],
    related: ['simplement-connexe', 'su2', 'resultat-revetement-su2'],
  },
  {
    id: 'outil-integration-parties',
    term: 'Intégration par parties, formule de Green',
    domain: 'outils',
    forms: ['intégration par parties', 'intégrations par parties', 'intègre par parties', 'intégrant par parties', 'formule de green', 'formules de green', 'green'],
    definition: t`Sur un intervalle : $\int_a^bu'v=[uv]_a^b-\int_a^buv'$. Sur un ouvert lipschitzien : $\int_\Omega(\Delta u)v=\int_{\partial\Omega}\partial_\nu u\,v-\int_\Omega\nabla u\cdot\nabla v$.`,
    complements: [
      { kind: 'retenir', text: 'Avec $v$ à support compact (fonction test), les termes de bord disparaissent : c’est la définition même de la dérivée au sens des distributions.' },
    ],
    related: ['formulation-variationnelle', 'derivee-distributionnelle', 'probleme-neumann'],
  },
  {
    id: 'outil-parseval',
    term: 'Égalité de Parseval',
    domain: 'outils',
    forms: ['parseval', 'égalité de parseval', 'identité de parseval'],
    definition: t`Pour une base hilbertienne $(e_k)$ : $\|u\|^2=\sum_k|\langle u,e_k\rangle|^2$ et $\langle u,v\rangle=\sum_k\langle u,e_k\rangle\overline{\langle v,e_k\rangle}$.`,
    complements: [
      { kind: 'exemple', text: t`Sur la base propre du laplacien de Dirichlet : $\|\nabla u\|_{L^2}^2=\sum_k\lambda_k|\langle u,e_k\rangle|^2$ pour $u\in H^1_0$.` },
    ],
    related: ['base-hilbertienne', 'resultat-plancherel'],
  },
];
