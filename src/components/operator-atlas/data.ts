import { t } from '@/content/authoring';

export interface OperatorPlate {
  id: string;
  title: string;
  description: string;
  theoremIds: string[];
  lessonId: string;
  formula: string;
  reading: string;
  limit: string;
  question: string;
  answer: string;
  source: string;
}

/** Figures originales : les références concernent les notions, pas des images reproduites. */
export const OPERATOR_PLATES: OperatorPlate[] = [
  {
    id: 'norme-operateur', lessonId: 'norme-operateur',
    title: 'De la boule unité à l’ellipse',
    description: 'Mesurer la norme d’un opérateur en suivant les images des vecteurs unitaires.',
    theoremIds: ['banach-steinhaus', 'graphe-ferme'],
    formula: t`$A=\operatorname{diag}(a,b)$ sur $\mathbb R^2$, $a,b>0$ ; $\|A\|=\max(a,b)$ et $\|Au_\theta\|^2=a^2\cos^2\theta+b^2\sin^2\theta$.`,
    reading: t`Le cercle gris est la sphère unité. L’ellipse bleue est son image par $A$. Le segment bleu relie l’origine à $Au_\theta$ : sa longueur varie avec la direction. La norme est la plus grande de ces longueurs, pas celle d’un vecteur choisi arbitrairement.`,
    limit: t`Ici le maximum est atteint, car la sphère unité est compacte en dimension finie. En dimension infinie, une norme d’opérateur est un supremum qui peut ne pas être atteint.`,
    question: t`Si $a=3$ et $b=1$, quelle direction atteint la norme ? Toutes les directions sont-elles multipliées par $3$ ?`,
    answer: t`Les vecteurs $(1,0)$ et $(-1,0)$ atteignent $\|A\|=3$. La direction $(0,1)$ est multipliée par $1$ ; en général le facteur dépend de la direction.`,
    source: 'Complément en dimension finie aux notions d’opérateur borné et d’adjoint (polycopié, section 6.1, PDF 23).',
  },
  {
    id: 'domaine-adjoint', lessonId: 'domaine-adjoint',
    title: 'L’adjoint transporte le produit scalaire',
    description: 'Comparer Au et A*v, puis comprendre pourquoi le domaine devient essentiel.',
    theoremIds: ['adjoint'],
    formula: t`$A=\begin{pmatrix}1&s\\0&1\end{pmatrix}$, $u=(1,0)$, $v=(\cos\theta,\sin\theta)$ : $\langle Au,v\rangle=\langle u,A^*v\rangle=\cos\theta$.`,
    reading: t`Les deux dessins gardent le même produit scalaire : à gauche on transforme $u$ par $A$, à droite on transforme $v$ par $A^*=A^\mathsf T$. Pour $s\ne0$, $A\ne A^*$ : un opérateur peut posséder un adjoint sans être symétrique.`,
    limit: t`Toutes ces matrices ont domaine $\mathbb R^2$. Pour un opérateur non borné, la formule seule ne suffit pas : $v\in D(A^*)$ signifie que $u\mapsto\langle Au,v\rangle$ est bornée pour la norme de $H$ sur $D(A)$. L’auto-adjonction exige aussi $D(A)=D(A^*)$.`,
    question: t`Pour $s=1$ et $v=(0,1)$, que valent $Av$ et $A^*v$ ? Pourquoi cela ne donne-t-il aucune information sur les domaines d’un opérateur différentiel ?`,
    answer: t`$Av=(1,1)$ et $A^*v=(0,1)$. Cette différence concerne des matrices partout définies. Pour $-u''$ sur $L^2(0,1)$, les conditions au bord font partie du domaine et modifient l’adjoint ; la figure ne les encode pas.`,
    source: 'Polycopié, section 6.1, PDF 23 ; illustration matricielle complémentaire.',
  },
  {
    id: 'spectre-resolvante', lessonId: 'spectre-resolvante',
    title: 'Le spectre et la taille de la résolvante',
    description: 'Déplacer un point complexe et observer la proximité des valeurs spectrales.',
    theoremIds: ['spectral-general'],
    formula: t`$A=\operatorname{diag}(-1,1,3)$ sur $\mathbb C^3$. Pour $z\notin\{-1,1,3\}$ : $\|(zI-A)^{-1}\|=\max_j|z-\lambda_j|^{-1}=1/\operatorname{dist}(z,\sigma(A))$.`,
    reading: t`Les points orange sont les valeurs propres ; le point bleu représente $z$. Le segment relie $z$ au point spectral le plus proche. Plus ce segment est court, plus la résolvante amplifie certaines composantes. Sur un point spectral, l’inverse n’existe plus.`,
    limit: t`L’égalité avec la distance au spectre est valable ici pour un opérateur normal. Elle ne s’étend pas telle quelle aux matrices non normales. Le spectre d’un opérateur auto-adjoint général peut être un intervalle.`,
    question: t`Pour $z=1+i$, quelle est la norme de la résolvante ? Et pour $z=1$ ?`,
    answer: t`Pour $z=1+i$, la distance au spectre vaut $1$, donc la norme vaut $1$. Pour $z=1$, $zI-A$ a un noyau non nul : la résolvante n’est pas définie.`,
    source: 'Polycopié, sections 6.2 et 6.5, PDF 23 et 25 ; exemple diagonal complémentaire.',
  },
  {
    id: 'compacite-fredholm', lessonId: 'compacite-fredholm',
    title: 'Compact : les directions restantes se contractent',
    description: 'Comparer diag(1/n) à l’identité à mesure que le rang de troncature augmente.',
    theoremIds: ['fredholm', 'spectral-compact'],
    formula: t`Sur $\ell^2(\mathbb N^*)$, $Ke_n=n^{-1}e_n$ et $K_N=KP_N$. Alors $\|K-K_N\|=1/(N+1)\to0$, tandis que $\|I-P_N\|=1$.`,
    reading: t`Les barres bleues sont les coefficients conservés dans les $N$ premières directions ; les barres orange montrent quelques directions omises. Pour $K$, l’erreur exacte est le premier coefficient omis. Pour l’identité, les vecteurs $e_{N+1}$ gardent toujours une image de norme $1$.`,
    limit: t`Le dessin affiche seulement 24 directions. La formule de l’erreur porte sur toute la queue infinie et constitue l’argument. Une matrice finie est toujours compacte : on ne peut pas décider la compacité d’un opérateur infini à partir d’une seule troncature.`,
    question: t`Pour $N=9$, quelle est l’erreur d’approximation de $K$ ? Pourquoi les mêmes troncatures ne convergent-elles pas vers $I$ en norme ?`,
    answer: t`$\|K-K_9\|=1/10$. Pour tout $N$, $\|(I-P_N)e_{N+1}\|=1$ ; l’erreur en norme de l’identité reste donc $1$, même si $P_Nu\to u$ pour chaque $u\in\ell^2$.`,
    source: 'Polycopié, sections 6.3–6.4, PDF 24 ; preuve de la compacité diagonale en complément.',
  },
  {
    id: 'spectral-compact', lessonId: 'spectral-compact',
    title: 'Axes propres et quotient de Rayleigh',
    description: 'Tourner une base propre orthonormée et retrouver les valeurs extrêmes de la forme quadratique.',
    theoremIds: ['spectral-compact'],
    formula: t`$A=Q_\varphi\operatorname{diag}(1,3)Q_\varphi^\mathsf T$. Pour $\|u_\theta\|=1$, $\langle Au_\theta,u_\theta\rangle=1+2\sin^2(\theta-\varphi)\in[1,3]$.`,
    reading: t`Les axes orange sont les deux sous-espaces propres, orthogonaux. Le vecteur bleu représente $Au$, le gris représente $u$. Ils sont colinéaires exactement lorsque $u$ est une direction propre. Les valeurs extrêmes du quotient de Rayleigh sont les valeurs propres.`,
    limit: t`Cette figure illustre la diagonalisation réelle symétrique en dimension deux. Pour le théorème compact auto-adjoint en dimension infinie, il faut en plus montrer l’exhaustivité des sous-espaces propres et l’accumulation éventuelle des valeurs propres non nulles en $0$.`,
    question: t`Si $\theta=\varphi$, quelle valeur obtient-on ? Que devient-elle pour $\theta=\varphi+90^\circ$ ?`,
    answer: t`Le premier vecteur est dans l’espace propre de valeur $1$, donc le quotient vaut $1$. Le second est dans l’espace propre de valeur $3$, donc le quotient vaut $3$. Changer $\varphi$ tourne les directions sans changer le spectre.`,
    source: 'Polycopié, section 6.4, PDF 24 ; illustration du quotient de Rayleigh en dimension deux.',
  },
  {
    id: 'operateurs-integraux', lessonId: 'operateurs-integraux',
    title: 'Un noyau intégral projette sur une direction',
    description: 'Transformer une fonction par le noyau axy et repérer celles qui sont annulées.',
    theoremIds: ['spectral-compact', 'fredholm'],
    formula: t`$K_au(x)=a x\int_0^1 y u(y)\,dy=\frac a3\langle u,e\rangle e$, avec $e(x)=\sqrt3x$. Pour $a\ne0$, le rang vaut $1$, la valeur propre non nulle vaut $a/3$ et $\|K_a\|=|a|/3$.`,
    reading: t`La courbe grise représente $u$, la bleue représente $K_au$. Toute image est proportionnelle à $x$. Pour $u(x)=1-3x/2$, l’intégrale $\int_0^1yu(y)\,dy$ s’annule : une fonction non nulle peut être envoyée sur zéro.`,
    limit: t`Ce noyau est séparé et de rang un. Un noyau de Hilbert–Schmidt général peut produire un compact de rang infini. L’identité de projection affichée est exacte pour ce modèle ; le tracé ne démontre pas le théorème général.`,
    question: t`Si $a=-2$, l’opérateur reste-t-il auto-adjoint ? Est-il positif ?`,
    answer: t`Il reste auto-adjoint, car le noyau réel $-2xy$ est symétrique. Il n’est pas positif : $\langle K_ae,e\rangle=a/3=-2/3<0$. Symétrie et positivité sont deux propriétés distinctes.`,
    source: 'Analyse fonctionnelle et EDP, section 30.1, PDF 155–156 ; exemple de noyau séparé développé pour ProofLab.',
  },
  {
    id: 'modes-dirichlet', lessonId: 'spectral-compact',
    title: 'Reconstruire une solution avec les modes de Dirichlet',
    description: 'Comparer le second membre, la solution spectrale et son approximation par quelques modes.',
    theoremIds: ['spectral-compact', 'regularite-elliptique'],
    formula: t`Sur $(0,\pi)$, $e_n(x)=\sqrt{2/\pi}\sin(nx)$ et $Ae_n=n^2e_n$ pour $A=-d^2/dx^2$ avec conditions de Dirichlet. Si $f=\sum f_ne_n$, alors $u=A^{-1}f=\sum(f_n/n^2)e_n$.`,
    reading: t`La courbe grise représente $f=e_1+ae_2+be_3$, la bleue la solution exacte $u=e_1+(a/4)e_2+(b/9)e_3$, et la courbe orange pointillée la somme tronquée $u_N$. Le coefficient de chaque mode est divisé par sa valeur propre.`,
    limit: t`Ici $f$ possède seulement trois modes, donc $N=3$ donne la solution exacte. Pour un second membre général de $L^2$, il faut une série infinie. Parseval fournit la borne uniforme $\|u-u_N\|\le (N+1)^{-2}\|f\|$ ; le graphique seul ne prouve pas la convergence.`,
    question: t`Si $f=e_1+2e_2$ et $N=1$, quelle est l’erreur exacte dans la norme de $L^2$ ?`,
    answer: t`La solution est $u=e_1+(1/2)e_2$. La troncature ne garde que $e_1$. Comme $e_2$ est unitaire, $\|u-u_1\|_2=1/2$.`,
    source: 'Analyse fonctionnelle et EDP, chapitre 31, PDF 159–162, particulièrement section 31.5 PDF 161.',
  },
  {
    id: 'spectral-general', lessonId: 'spectral-general',
    title: 'Un spectre continu sans vecteurs propres',
    description: 'Localiser une fonction pour approcher une valeur spectrale de l’opérateur de multiplication.',
    theoremIds: ['spectral-general'],
    formula: t`Sur $L^2(0,1)$, $(M_xu)(x)=xu(x)$ et $E(B)u=\mathbf1_Bu$. Pour $I=[c-\varepsilon,c+\varepsilon]\cap[0,1]$, $u_I=\mathbf1_I/\sqrt{|I|}$ : $\|u_I\|_2=1$, $\|(M_x-cI)u_I\|_2\le\varepsilon$.`,
    reading: t`La bande bleue est l’intervalle $I$ et la courbe représente $u_I$. Rétrécir $I$ concentre la fonction près de $c$ : la multiplication par $x$ devient presque celle par $c$. Le projecteur spectral $E(I)$ conserve exactement les valeurs de la fonction dans cet intervalle.`,
    limit: t`La figure représente une fonction de $L^2$, pas une liste de vecteurs propres. L’équation $(x-c)u(x)=0$ impose que $u$ soit portée par le singleton $\{c\}$, de mesure nulle : aucun vecteur propre non nul. Pourtant $\sigma(M_x)=[0,1]$. La construction générale de la mesure spectrale n’est pas démontrée par cette figure.`,
    question: t`Quand l’intervalle se rétrécit, l’erreur tend-elle vers zéro ? Les fonctions $u_I$ convergent-elles fortement vers un vecteur propre de norme $1$ ?`,
    answer: t`L’erreur est au plus $\varepsilon$ et tend vers zéro. Il n’y a pas de limite forte de norme $1$ : une telle limite serait un vecteur propre non nul, qui n’existe pas. L’approximation spectrale ne produit donc pas forcément un vecteur propre.`,
    source: 'Polycopié, section 6.5, PDF 25 ; modèle multiplicatif détaillé en complément.',
  },
  {
    id: 'calcul-fonctionnel', lessonId: 'calcul-fonctionnel',
    title: 'Appliquer une fonction aux valeurs spectrales',
    description: 'Comparer les composantes de u, Au et f(A)u sans confondre calcul fonctionnel et composition.',
    theoremIds: ['spectral-general', 'formes-fermees'],
    formula: t`$A=\operatorname{diag}(1,2,4)$, $u=(1,1/2,1/4)$. Pour chaque coordonnée, $(f(A)u)_j=f(\lambda_j)u_j$, et non $f(\lambda_ju_j)$.`,
    reading: t`Les barres grises sont les coordonnées de $u$, les bleues celles de $f(A)u$. Changer $f$ modifie séparément chaque coefficient spectral, tout en conservant les sous-espaces propres. Le carré renforce les grandes valeurs spectrales ; la résolvante $1/(1+\lambda)$ les réduit.`,
    limit: t`En dimension trois, le domaine est toujours tout l’espace. Pour un opérateur auto-adjoint non borné, $D(f(A))=\{u:\int|f(\lambda)|^2\,d\mu_u(\lambda)<\infty\}$ : une fonction $f$ peut imposer un domaine strict.`,
    question: t`Pour $f(\lambda)=\lambda^2$, que vaut la deuxième coordonnée de $f(A)u$ ? Que donnerait la confusion $f(Au)$ ?`,
    answer: t`La bonne coordonnée est $2^2\times(1/2)=2$. Appliquer le carré au nombre $(Au)_2=1$ donnerait $1$. Le calcul fonctionnel conserve la linéarité en $u$ ; l’application du carré aux coordonnées de $Au$ ne la conserve pas.`,
    source: 'Polycopié, section 6.5, PDF 25 ; exemple diagonal complémentaire.',
  },
  {
    id: 'formes-friedrichs', lessonId: 'formes-friedrichs',
    title: 'Trois normes, trois conditions de sommabilité',
    description: 'Distinguer l’espace de Hilbert, le domaine de forme et le domaine de l’opérateur.',
    theoremIds: ['formes-fermees', 'friedrichs'],
    formula: t`$Ae_n=ne_n$, $u_n=n^{-p}$ : $\|u\|^2=\sum n^{-2p}$, $q(u,u)=\sum n^{1-2p}$, $\|Au\|^2=\sum n^{2-2p}$. Ainsi $u\in H\iff p>1/2$, $u\in D(A^{1/2})\iff p>1$, $u\in D(A)\iff p>3/2$.`,
    reading: t`Les trois courbes sont les sommes partielles jusqu’à $N$. Chaque application d’une puissance de $A$ donne plus de poids aux grandes coordonnées. Avec $p=5/4$, le vecteur appartient au domaine de forme mais pas au domaine de l’opérateur.`,
    limit: t`Une somme partielle finie ne prouve jamais la convergence d’une série. Les seuils affichés viennent du critère exact pour les séries $\sum n^{-r}$, convergentes si et seulement si $r>1$. Ici $A$ est déjà défini ; le théorème de représentation des formes permet le chemin inverse.`,
    question: t`Pour $p=5/4$, peut-on calculer $q(u,u)$ ? Peut-on considérer $Au$ comme un élément de $\ell^2$ ?`,
    answer: t`Oui pour la forme : $\sum n^{-3/2}<\infty$. Non pour $Au$ : $\sum n^{-1/2}=+\infty$. On a bien $D(A)\subsetneq D(A^{1/2})\subsetneq H$.`,
    source: 'Polycopié, sections 6.6–6.7, PDF 25–26 ; modèle diagonal complémentaire.',
  },
  {
    id: 'semi-groupes', lessonId: 'semi-groupes',
    title: 'Le semi-groupe agit mode par mode',
    description: 'Observer exp(−tA), la loi de composition et la distinction entre continuité forte et en norme.',
    theoremIds: ['hille-yosida', 'lumer-phillips'],
    formula: t`$Ae_n=ne_n$ sur $\ell^2(\mathbb N^*)$. Alors $T(t)e_n=e^{-nt}e_n$, $T(t+s)=T(t)T(s)$ et $\|T(t)\|=e^{-t}$. Pour tout $t>0$, $\|T(t)-I\|=\sup_n(1-e^{-nt})=1$.`,
    reading: t`Chaque barre montre le multiplicateur $e^{-nt}$ d’une coordonnée. Les grands indices sont plus fortement réduits. Le produit des multiplicateurs aux temps $t$ et $s$ donne celui au temps $t+s$. Le générateur de ce semi-groupe est $-A$.`,
    limit: t`Seuls douze modes sont dessinés. Sur ces douze modes, $\|T(t)-I\|\to0$ quand $t\to0$ ; sur tout $\ell^2$, cette norme vaut $1$ pour chaque $t>0$. La continuité forte $T(t)u\to u$ pour chaque $u$ reste vraie, par convergence dominée des séries.`,
    question: t`Le fait que chaque barre tende vers $1$ quand $t\downarrow0$ implique-t-il la convergence en norme d’opérateur sur tout $\ell^2$ ?`,
    answer: t`Non. Pour un $t>0$ fixé, on peut toujours choisir $n$ très grand avec $e^{-nt}$ proche de zéro : le supremum de $|e^{-nt}-1|$ vaut $1$. La convergence coordonnée par coordonnée fournit ici la continuité forte, après domination par les coefficients de $u$.`,
    source: 'Polycopié, section 6.8, PDF 26 ; exemple diagonal de semi-groupe complémentaire.',
  },
  {
    id: 'spectral-generalise', lessonId: 'spectral-generalise',
    title: 'Changer de géométrie : Au = λBu',
    description: 'Transformer une ellipse unité pour ramener un problème spectral généralisé au cas symétrique.',
    theoremIds: ['spectral-compact', 'formes-fermees'],
    formula: t`$A=\operatorname{diag}(1,4)$, $B=\operatorname{diag}(b,1)$, $b>0$. Avec $v=B^{1/2}u$, $Au=\lambda Bu\iff B^{-1/2}AB^{-1/2}v=\lambda v$. Les valeurs propres sont $1/b$ et $4$.`,
    reading: t`À gauche, l’ellipse $u^\mathsf TBu=1$ est la sphère unité pour le produit scalaire associé à $B$. À droite, $v=B^{1/2}u$ appartient au cercle unité euclidien. Les vecteurs propres peuvent être normalisés pour ce produit scalaire : $q_1=(1/\sqrt b,0)$ et $q_2=(0,1)$.`,
    limit: t`Ce problème matriciel généralisé est distinct du théorème spectral général à mesure spectrale. La réduction utilise la positivité définie de $B$ ; elle échoue sous cette forme lorsque $B$ est singulière ou indéfinie. En dimension infinie, il faut préciser les domaines et l’inversibilité.`,
    question: t`Pour $b=1/4$, quelles sont les valeurs propres ? Les deux vecteurs propres peuvent-ils encore être choisis B-orthonormés ?`,
    answer: t`Les deux valeurs valent $4$ : il y a une valeur propre double. Les vecteurs $(2,0)$ et $(0,1)$ sont $B$-orthonormés. La multiplicité ne supprime pas l’existence d’une base orthonormée dans cette géométrie.`,
    source: 'Complément de dimension finie aux sections 6.4 et 6.6 du polycopié (PDF 24–25).',
  },
];

export const OPERATOR_PLATE_BY_ID = new Map(OPERATOR_PLATES.map((plate) => [plate.id, plate]));
