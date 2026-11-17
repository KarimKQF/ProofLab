import { t } from '@/content/authoring';
import type { OperatorLesson, OperatorSource } from './types';

const poly = (section: string, ...pdfPages: number[]): OperatorSource => ({ kind: 'polycopie', label: `Compléments d’analyse fonctionnelle et EDP, section ${section}`, pdfPages });
const cours = (section: string, ...pdfPages: number[]): OperatorSource => ({ kind: 'cours-analyse', label: `Analyse fonctionnelle et EDP, ${section}`, pdfPages });
const extra: OperatorSource = { kind: 'complement', label: 'Exemples et preuves pédagogiques développés pour ce parcours', pdfPages: [] };

export const SPECTRAL_LESSONS: OperatorLesson[] = [
  {
    id: 'compacite-fredholm', title: 'Compacité et alternative de Fredholm',
    lead: 'Contrôler les directions omises par une approximation et identifier les obstructions à la résolution.',
    prerequisites: ['spectre-resolvante'], sources: [poly('6.3', 24), cours('section 30.1', 155), extra],
    theoremIds: ['fredholm', 'spectral-compact'], atlasId: 'compacite-fredholm',
    sections: [
      { title: 'Une image relativement compacte', body: t`Un opérateur linéaire borné $K:H\to H$ est compact si l’image de la boule unité est relativement compacte en norme. Cela équivaut à : de toute suite bornée $(u_n)$ on peut extraire une sous-suite dont les images par $K$ convergent en norme. Tout opérateur de rang fini est compact ; une limite en norme d’opérateurs compacts est compacte.` },
      { title: 'Ce que dit Fredholm', body: t`Pour $K$ compact sur un Hilbert, $I-K$ a une image fermée et $\operatorname{Im}(I-K)=\ker(I-K^*)^\perp$. Ses noyaux direct et adjoint sont de même dimension finie. Ainsi $(I-K)u=f$ est résoluble exactement lorsque $f$ est orthogonal au noyau adjoint ; la solution est unique exactement lorsque $\ker(I-K)=\{0\}$. En particulier, l’injectivité et la surjectivité de $I-K$ sont équivalentes.` },
      { title: 'Une différence entre convergence forte et en norme', body: t`Sur $\ell^2$, les projections $P_N$ sur les $N$ premières coordonnées vérifient $P_Nu\to u$ pour chaque $u$. Mais $\|I-P_N\|=1$ pour tout $N$. Les troncatures de $K=\operatorname{diag}(1/n)$ vérifient au contraire $\|K-KP_N\|=1/(N+1)\to0$. La convergence forte de rangs finis ne suffit donc pas à prouver la compacité.` },
    ],
    example: { title: 'Une obstruction d’une seule dimension', body: t`Soit $K=P_{\operatorname{span}(e_1)}$ sur $\ell^2$. Alors $(I-K)u=f$ impose $f_1=0$. Lorsque cette condition est satisfaite, toutes les solutions sont $u=f+ce_1$. L’obstruction et la non-unicité sont ici visibles dans la même direction, car $K=K^*$.` },
    proof: { title: 'Une diagonale bornée est compacte exactement lorsque ses coefficients tendent vers zéro', scope: 'complete-example', scopeNote: 'Preuve complète du critère diagonal. Le théorème de Fredholm général est travaillé séparément dans les exercices du résultat 25.', steps: [
      t`Écrire $Ke_n=a_ne_n$ avec $(a_n)$ bornée. L’opérateur $K_N=KP_N$ est de rang fini. Le calcul de la norme diagonale donne $\|K-K_N\|=\sup_{n>N}|a_n|$.`,
      t`Si $a_n\to0$, cette norme tend vers zéro. Pour justifier la compacité de la limite : pour tout $\varepsilon>0$, choisir $N$ tel que $\|K-K_N\|<\varepsilon/3$, puis un filet fini de rayon $\varepsilon/3$ pour $K_N$ de la boule unité. Il donne un filet fini de rayon $\varepsilon$ pour son image par $K$. Cette image est totalement bornée ; dans le Hilbert complet, son adhérence est compacte.`,
      t`Si $a_n$ ne tend pas vers zéro, il existe $\varepsilon>0$ et des indices distincts $n_j$ tels que $|a_{n_j}|\ge\varepsilon$.`,
      t`Pour $j\ne k$, l’orthogonalité donne $\|Ke_{n_j}-Ke_{n_k}\|^2=|a_{n_j}|^2+|a_{n_k}|^2\ge2\varepsilon^2$. Les images de cette suite unitaire n’ont aucune sous-suite de Cauchy, donc aucune sous-suite convergente. $K$ n’est pas compact.`,
    ] },
    pitfalls: [t`Tout opérateur sur un espace de dimension finie est compact : une image numérique finie ne teste pas à elle seule la compacité infinie.`, t`Dans Fredholm, c’est le noyau de $I-K^*$ qui impose la compatibilité du second membre, pas celui de $I-K$ sans hypothèse de symétrie.`],
    questions: [
      { id: 'queue', prompt: t`Pour $Ke_n=n^{-1}e_n$, quelle est $\|K-KP_4\|$ ?`, options: [{ text: '1/4', feedback: 'La quatrième coordonnée est encore conservée.' }, { text: '1/5', feedback: 'Oui : le plus grand coefficient omis est celui de la cinquième coordonnée.' }, { text: '0', feedback: 'Une infinité de coordonnées non nulles restent omises.' }], correctIndex: 1 },
      { id: 'obstruction', prompt: t`Pour $K=P_{e_1}$, l’équation $(I-K)u=e_1$ a-t-elle une solution ?`, options: [{ text: 'Oui, u = e₁', feedback: 'Mais (I−K)e₁ = 0.' }, { text: 'Non', feedback: 'Le second membre n’est pas orthogonal au noyau adjoint, qui est la droite engendrée par e₁.' }], correctIndex: 1 },
    ],
  },
  {
    id: 'operateurs-integraux', title: 'Des noyaux aux opérateurs intégraux',
    lead: 'Construire un opérateur compact à partir d’une fonction de deux variables et reconnaître son rang.',
    prerequisites: ['compacite-fredholm'], sources: [cours('section 30.1', 155, 156), extra],
    theoremIds: ['fredholm', 'spectral-compact'], atlasId: 'operateurs-integraux',
    sections: [
      { title: 'Le noyau et sa majoration', body: t`Sur $H=L^2(0,1;\mathbb C)$, soit $k\in L^2((0,1)^2)$. Poser $(Ku)(x)=\int_0^1k(x,y)u(y)\,dy$. Cauchy–Schwarz en $y$, puis intégration en $x$, donnent $\|Ku\|_2\le\|k\|_{L^2((0,1)^2)}\|u\|_2$. Un tel opérateur est dit de Hilbert–Schmidt.` },
      { title: 'Rang fini et symétrie', body: t`Si $k(x,y)=\sum_{j=1}^m a_j(x)\overline{b_j(y)}$, l’image de $K$ est contenue dans l’espace engendré par les $a_j$ : son rang est au plus $m$. Le noyau de l’adjoint est $\overline{k(y,x)}$. En particulier, $k(x,y)=\overline{k(y,x)}$ presque partout assure l’auto-adjonction. Sur un Hilbert réel, cette condition devient la symétrie de $k$.` },
      { title: 'Pourquoi le noyau L² donne un compact', body: t`Les sommes finies de noyaux séparés sont denses dans $L^2((0,1)^2)$. Si $k_m\to k$ dans cet espace et $K_m$ est l’opérateur associé, la majoration précédente donne $\|K-K_m\|\le\|k-k_m\|_2\to0$. Les $K_m$ sont de rang fini, donc $K$ est compact.` },
    ],
    example: { title: 'Le noyau xy : une seule direction propre non nulle', body: t`Pour $k(x,y)=xy$, on a $Ku(x)=x\int_0^1yu(y)\,dy$. La fonction $e(x)=\sqrt3x$ a norme $1$ et $K=\frac13P_e$. Le spectre est $\{0,1/3\}$ ; $1/3$ est simple, et le noyau est $e^\perp$. La borne Hilbert–Schmidt est exacte ici : $\|k\|_2=1/3=\|K\|$.` },
    proof: { title: 'Calculer la décomposition du noyau xy', scope: 'complete-example', scopeNote: 'Preuve complète pour ce noyau de rang un ; elle donne aussi une application explicite du théorème spectral compact.', steps: [
      t`Calculer $\int_0^1x^2\,dx=1/3$, donc $\|e\|_2^2=3/3=1$.`,
      t`Avec le produit scalaire linéaire dans la première variable, $\langle u,e\rangle=\sqrt3\int_0^1xu(x)\,dx$. Ainsi $Ku=\frac13\langle u,e\rangle e$.`,
      t`Décomposer tout $u=\langle u,e\rangle e+w$ avec $w\perp e$. Alors $Ke=e/3$ et $Kw=0$. Cela identifie les deux sous-espaces propres.`,
      t`Pour $z\notin\{0,1/3\}$, l’inverse de $zI-K$ agit par $(z-1/3)^{-1}$ sur la droite de $e$ et $z^{-1}$ sur son orthogonal. Il est borné. Les deux autres points sont des valeurs propres : le spectre est exactement $\{0,1/3\}$.`,
    ] },
    pitfalls: [t`Le noyau $k(x,y)$ d’un opérateur intégral et le noyau vectoriel $\ker K$ sont deux objets différents.`, t`Un noyau réel symétrique peut avoir des valeurs propres négatives ; la symétrie seule n’impose pas la positivité.`],
    questions: [
      { id: 'rang', prompt: t`Quel est le rang de l’opérateur de noyau $xy$ ?`, options: [{ text: '1', feedback: 'Toutes les images sont multiples de la fonction x, et cette direction est effectivement atteinte.' }, { text: 'Infini', feedback: 'Le domaine est infini, mais l’image ne contient qu’une direction.' }], correctIndex: 0 },
      { id: 'valeur', prompt: t`Quelle valeur propre non nulle correspond au noyau $2xy$ ?`, options: [{ text: '2', feedback: 'Il faut tenir compte de la norme carrée de la fonction x, égale à 1/3.' }, { text: '2/3', feedback: 'Oui : multiplier l’opérateur par 2 multiplie sa valeur propre 1/3 par 2.' }], correctIndex: 1 },
    ],
  },
  {
    id: 'spectral-compact', title: 'Le théorème spectral compact et les modes de Dirichlet',
    lead: 'Passer de directions propres orthogonales à la reconstruction d’un vecteur ou d’une fonction.',
    prerequisites: ['compacite-fredholm'], sources: [poly('6.4', 24, 25), cours('chapitres 30 et 31', 156, 157, 159, 160, 161, 162)],
    theoremIds: ['spectral-compact', 'regularite-elliptique'], atlasId: 'spectral-compact',
    sections: [
      { title: 'Énoncé dans un Hilbert séparable', body: t`Soit $K$ compact auto-adjoint sur un Hilbert séparable. Les valeurs propres non nulles sont réelles, leurs espaces propres sont de dimension finie, et leur seul point d’accumulation possible est $0$. On a $H=\ker K\oplus\overline{\bigoplus_{\lambda\ne0}\ker(K-\lambda I)}$. En complétant par une base orthonormée de $\ker K$, on obtient une base hilbertienne de vecteurs propres.` },
      { title: 'La décomposition est une convergence en norme', body: t`Dans une base propre $(e_n)$, $u=\sum_n\langle u,e_n\rangle e_n$ et $Ku=\sum_n\lambda_n\langle u,e_n\rangle e_n$. Les séries convergent dans $H$. Parseval donne $\|u\|^2=\sum_n|\langle u,e_n\rangle|^2$. La valeur $0$ appartient au spectre en dimension infinie, mais n’est une valeur propre que si $K$ n’est pas injectif.` },
      { title: 'Du compact inverse à l’opérateur non borné', body: t`Sur $L^2(0,\pi)$, $Au=-u''$ avec $D(A)=H^2(0,\pi)\cap H^1_0(0,\pi)$ est auto-adjoint positif. Son inverse $K=A^{-1}$ est compact. Les fonctions $e_n(x)=\sqrt{2/\pi}\sin(nx)$ forment une base propre, avec $Ae_n=n^2e_n$ et $Ke_n=n^{-2}e_n$. $A$ n’est pas compact : il est non borné. La compacité appartient ici à son inverse.` },
    ],
    example: { title: 'Résoudre et tronquer une équation de Dirichlet', body: t`Pour $f=\sum f_ne_n\in L^2(0,\pi)$, la solution de $Au=f$ est $u=\sum (f_n/n^2)e_n$. Avec $u_N=\sum_{n\le N}(f_n/n^2)e_n$, Parseval donne $\|u-u_N\|_2^2=\sum_{n>N}|f_n|^2/n^4\le (N+1)^{-4}\|f\|_2^2$. D’où $\|A^{-1}-A^{-1}P_N\|=(N+1)^{-2}$, en testant aussi $f=e_{N+1}$.` },
    proof: { title: 'Pourquoi les valeurs propres non nulles ont une multiplicité finie', scope: 'complete-example', scopeNote: 'Démonstration complète de l’orthogonalité et de la multiplicité finie. L’exhaustivité de la base propre est l’étape supplémentaire du théorème compact, étudiée dans ses exercices.', steps: [
      t`Si $Ku=\lambda u$ et $u\ne0$, alors $\lambda\|u\|^2=\langle Ku,u\rangle$ est réel par auto-adjonction. Donc $\lambda\in\mathbb R$.`,
      t`Si $Kv=\mu v$ avec $\lambda\ne\mu$, $\lambda\langle u,v\rangle=\langle Ku,v\rangle=\langle u,Kv\rangle=\mu\langle u,v\rangle$. Donc $u\perp v$.`,
      t`Supposons $\ker(K-\lambda I)$ infini-dimensionnel avec $\lambda\ne0$. On peut y choisir une suite orthonormée $(u_j)$.`,
      t`Pour $j\ne k$, $\|Ku_j-Ku_k\|=|\lambda|\|u_j-u_k\|=\sqrt2|\lambda|$. Aucune sous-suite des images ne converge, alors que $(u_j)$ est bornée. Cela contredit la compacité.`,
      t`Le même argument interdit une infinité de valeurs propres distinctes de module au moins $\varepsilon>0$ : choisir un vecteur unitaire dans chacun des espaces propres, qui sont orthogonaux. Ainsi les valeurs propres non nulles ne peuvent s’accumuler qu’en zéro.`,
    ] },
    pitfalls: [t`Ne pas oublier $\ker K$ lors de la construction de la base.`, t`Sur un ouvert peu régulier, le domaine du laplacien de Dirichlet se décrit par $\{u\in H^1_0:\Delta u\in L^2\}$ ; l’identification avec $H^2\cap H^1_0$ exige de la régularité. L’intervalle utilisé ici la possède.`],
    questions: [
      { id: 'zero', prompt: t`Pour $Ke_n=e_n/n$, zéro est-il une valeur propre ?`, options: [{ text: 'Oui, car 1/n tend vers 0', feedback: 'Une limite de valeurs propres n’est pas nécessairement une valeur propre.' }, { text: 'Non, mais zéro appartient au spectre', feedback: 'K est injectif, tandis que son inverse diagonal n ne peut être borné sur tout ℓ².' }], correctIndex: 1 },
      { id: 'poisson', prompt: t`Si $f=2e_1+8e_2$, quelle solution vérifie $Au=f$ ?`, options: [{ text: t`$u=2e_1+2e_2$`, feedback: 'Oui : on divise chaque coefficient par sa valeur propre, 1 puis 4.' }, { text: t`$u=2e_1+32e_2$`, feedback: 'Ce calcul applique A au lieu de son inverse.' }], correctIndex: 0 },
    ],
  },
  {
    id: 'spectral-general', title: 'Le théorème spectral général : des projections à l’intégrale',
    lead: 'Remplacer la somme sur des vecteurs propres par une mesure à valeurs projections lorsque le spectre n’est plus discret.',
    prerequisites: ['spectral-compact', 'spectre-resolvante'], sources: [poly('6.5', 25), extra],
    theoremIds: ['spectral-general'], atlasId: 'spectral-general',
    sections: [
      { title: 'Une mesure dont les valeurs sont des projections', body: t`Une mesure spectrale $E$ sur $\mathbb R$ associe à chaque borélien $B$ une projection orthogonale $E(B)$ sur $H$, avec $E(\mathbb R)=I$, $E(\varnothing)=0$, $E(B)E(C)=E(B\cap C)$. Pour des $B_n$ disjoints, $E(\bigcup B_n)u=\sum_nE(B_n)u$ en norme pour tout $u\in H$ : la sigma-additivité est forte.` },
      { title: 'L’énoncé pour un auto-adjoint, éventuellement non borné', body: t`Pour tout opérateur auto-adjoint $A:D(A)\subset H\to H$ sur un Hilbert complexe, il existe une unique mesure spectrale $E$ telle que $A=\int_{\mathbb R}\lambda\,dE(\lambda)$. Si $\mu_u(B)=\langle E(B)u,u\rangle=\|E(B)u\|^2$, alors $D(A)=\{u:\int\lambda^2\,d\mu_u<\infty\}$ et $\|Au\|^2=\int\lambda^2\,d\mu_u$. La masse de $\mu_u$ vaut $\|u\|^2$ ; elle n’est pas systématiquement égale à $1$.` },
      { title: 'La somme discrète est un cas particulier', body: t`Si $A$ possède une base propre $(e_n)$, $E(B)u=\sum_{\lambda_n\in B}\langle u,e_n\rangle e_n$. Mais, pour $M_x$ sur $L^2(0,1)$, $E(B)u=\mathbf1_{B\cap(0,1)}u$. Ici, $E(\{\lambda\})=0$ pour tout $\lambda$ et $E((0,1))=I$ : l’intégrale ne se réduit pas à une somme de projections sur des valeurs propres.` },
    ],
    example: { title: 'Une fenêtre spectrale', body: t`Pour $M_x$ et $u(x)=1$, $E([a,b])u=\mathbf1_{[a,b]}$ si $0\le a\le b\le1$. Sa norme carrée est $b-a$. En particulier $\mu_u([a,b])=b-a$. La projection sélectionne une partie du spectre ; elle ne choisit pas un unique vecteur propre.` },
    proof: { title: 'Comment se construit le théorème général', scope: 'theorem-roadmap', scopeNote: 'Le polycopié admet la construction de E. Ce plan expose ses dépendances et ne constitue pas une démonstration complète. La leçon suivante démontre intégralement les propriétés spectrales du modèle Mₓ.', steps: [
      t`Cas auto-adjoint borné : construire d’abord le calcul fonctionnel continu $f\mapsto f(A)$ par approximation polynomiale, avec $\|f(A)\|=\sup_{\sigma(A)}|f|$. L’identité de norme est un résultat à établir, admis dans ce plan.`,
      t`Sur un sous-espace cyclique engendré par les $p(A)u$, le théorème de représentation de Riesz pour les mesures représente la forme positive $f\mapsto\langle f(A)u,u\rangle$ par une mesure. Attention : il s’agit du théorème sur les mesures, distinct de la représentation du dual d’un Hilbert. Cette étape est admise ici.`,
      t`L’application $p(A)u\mapsto p$ s’étend en une identification unitaire avec un espace $L^2$ convenable. $A$ y devient multiplication par la variable. Décomposer ensuite le Hilbert en sous-espaces cycliques orthogonaux permet d’assembler les projections $E(B)$. Ces arguments de construction sont admis dans le présent parcours.`,
      t`Cas non borné : la transformée de Cayley $U=(A-iI)(A+iI)^{-1}=I-2i(A+iI)^{-1}$ est unitaire. Le théorème spectral unitaire (admis ici) puis le changement de variable inverse donnent une mesure sur la droite réelle. Le domaine doit être reconstruit par $\int\lambda^2\,d\mu_u<\infty$ ; il ne peut être supprimé de l’énoncé.`,
      t`Une fois $E$ construite, vérifier les propriétés sur les fonctions indicatrices, puis les fonctions simples et les limites appropriées. Pour $M_x$, ces vérifications sont directes puisque $E(B)$ est une multiplication par $\mathbf1_B$.`,
    ] },
    pitfalls: [t`Le théorème général n’affirme pas l’existence d’une base dénombrable de vecteurs propres.`, t`Une mesure à valeurs projections n’est pas une mesure scalaire. C’est le choix de $u$ qui produit la mesure scalaire $\mu_u$.`],
    questions: [
      { id: 'masse', prompt: t`Si $\|u\|=2$, quelle est la masse $\mu_u(\mathbb R)$ ?`, options: [{ text: '1', feedback: 'La normalisation en probabilité demande un vecteur unitaire.' }, { text: '2', feedback: 'La masse est le carré de la norme.' }, { text: '4', feedback: 'E(ℝ)=I, donc la masse vaut ||u||²=4.' }], correctIndex: 2 },
      { id: 'atome', prompt: t`Pour $M_x$ sur $L^2(0,1)$, que vaut $E(\{1/2\})$ ?`, options: [{ text: 'L’opérateur nul', feedback: 'Oui : multiplier par l’indicatrice d’un singleton donne zéro presque partout.' }, { text: 'Une projection de rang un', feedback: 'Il n’existe pas de fonction non nulle de L² portée par ce singleton.' }], correctIndex: 0 },
    ],
  },
  {
    id: 'spectre-continu', title: 'Démontrer l’existence d’un spectre sans valeurs propres',
    lead: 'Prouver sur un exemple complet que des vecteurs propres approchés ne donnent pas nécessairement de vecteur propre.',
    prerequisites: ['spectral-general'], sources: [poly('6.5', 25), extra], theoremIds: ['spectral-general'], atlasId: 'spectral-general',
    sections: [
      { title: 'L’opérateur de multiplication', body: t`Sur $H=L^2(0,1;\mathbb C)$ muni de la mesure de Lebesgue, poser $Mu(x)=xu(x)$ pour tout $u\in H$. Il est borné de norme $1$ et auto-adjoint, car $x$ est réel. On va démontrer $\sigma(M)=[0,1]$ et l’absence de toute valeur propre.` },
      { title: 'Vecteurs propres approchés', body: t`Pour $c\in[0,1]$ et $\varepsilon>0$, poser $I_\varepsilon=[c-\varepsilon,c+\varepsilon]\cap(0,1)$ et $u_\varepsilon=|I_\varepsilon|^{-1/2}\mathbf1_{I_\varepsilon}$. Alors $\|u_\varepsilon\|_2=1$ et $\|(M-cI)u_\varepsilon\|_2\le\varepsilon$. Le mot « approché » concerne le résidu de l’équation, pas une proximité avec un vrai vecteur propre.` },
    ],
    example: { title: 'Un inverse défini sur une image propre', body: t`Pour $c=0$, l’inverse formel est la multiplication par $1/x$. Mais $f(x)=1$ n’appartient pas à l’image de $M$, car $u(x)=1/x$ n’est pas dans $L^2(0,1)$. En revanche, les fonctions supportées loin de zéro appartiennent à l’image et sont denses dans $L^2$.` },
    proof: { title: 'Spectre exactement [0,1], entièrement continu', scope: 'complete-example', scopeNote: 'Preuve complète : inverse hors du segment, absence de valeurs propres, vecteurs approchés, densité et défaut de surjectivité.', steps: [
      t`Si $z\notin[0,1]$, la fonction $1/(z-x)$ est bornée sur $(0,1)$ par $1/\operatorname{dist}(z,[0,1])$. Sa multiplication est un inverse borné de $zI-M$ ; donc $z\in\rho(M)$.`,
      t`Si $(M-cI)u=0$, la fonction $u$ est nulle presque partout en dehors du singleton $\{c\}$. Ce singleton a mesure nulle, donc $u=0$ dans $L^2$. Il n’y a aucune valeur propre.`,
      t`Pour $c\in[0,1]$, les $u_\varepsilon$ ci-dessus sont unitaires et leur résidu tend vers zéro. Si $(M-cI)^{-1}$ était borné, $1\le\|(M-cI)^{-1}\|\varepsilon$ serait impossible pour de petits $\varepsilon$. Donc $c$ appartient au spectre.`,
      t`L’image est dense : son orthogonal est le noyau de $(M-cI)^*=M-cI$, qui vient d’être montré nul.`,
      t`L’image n’est pas tout $H$ : la fonction constante $1$ n’est pas dans cette image, car $1/(x-c)$ n’appartient pas à $L^2(0,1)$, y compris pour $c=0$ ou $c=1$. Ainsi chaque point du segment est dans le spectre continu.`,
    ] },
    pitfalls: [t`Un singleton peut porter une mesure atomique, mais il est de mesure nulle pour la mesure de Lebesgue utilisée ici.`, t`Les fonctions $u_\varepsilon$ ne convergent pas fortement vers un vecteur unitaire : une telle limite serait un vecteur propre, par continuité de $M$.`],
    questions: [
      { id: 'support', prompt: 'Pourquoi une fonction de L² portée par un singleton est-elle nulle ici ?', options: [{ text: 'Parce que les fonctions doivent être continues', feedback: 'Les éléments de L² ne sont pas nécessairement continus.' }, { text: 'Parce que le singleton est de mesure de Lebesgue nulle', feedback: 'Oui : les fonctions de L² sont identifiées modulo l’égalité presque partout.' }], correctIndex: 1 },
      { id: 'borne', prompt: t`Pour $z=2$, quelle est $\|(2I-M)^{-1}\|$ ?`, options: [{ text: '1', feedback: 'Le supremum essentiel de 1/(2−x) sur (0,1) vaut 1, même si cette valeur n’est pas atteinte.' }, { text: '1/2', feedback: 'La norme contrôle aussi les points proches de x=1.' }], correctIndex: 0 },
    ],
  },
  {
    id: 'calcul-fonctionnel', title: 'Calcul fonctionnel et domaines des puissances',
    lead: 'Définir f(A), contrôler sa norme et reconnaître les vecteurs pour lesquels la formule a un sens.',
    prerequisites: ['spectral-general'], sources: [poly('6.5–6.6', 25), extra], theoremIds: ['spectral-general', 'formes-fermees'], atlasId: 'calcul-fonctionnel',
    sections: [
      { title: 'La condition de domaine fait partie de la définition', body: t`Pour $f:\mathbb R\to\mathbb C$ borélienne et $A$ auto-adjoint, $f(A)=\int f\,dE$ a pour domaine $D(f(A))=\{u:\int|f|^2\,d\mu_u<\infty\}$. Si $f$ est bornée, le domaine est tout $H$ et $\|f(A)\|\le\sup_{\mathbb R}|f|$. Plus précisément, la norme est le supremum essentiel relativement à $E$, pas nécessairement le supremum ordinaire sur $\mathbb R$.` },
      { title: 'Quelques fonctions utiles', body: t`Pour $A\ge0$, $f(\lambda)=\sqrt\lambda$ donne $A^{1/2}$, $f(\lambda)=1/(1+\lambda)$ donne $(I+A)^{-1}$, et $f(\lambda)=e^{-t\lambda}$ pour $t\ge0$ donne un opérateur borné. L’indicatrice $\mathbf1_B$ redonne $E(B)$. Pour les puissances non bornées, les compositions doivent être accompagnées de leurs domaines.` },
      { title: 'Le cas diagonal rend la condition calculable', body: t`Si $Ae_n=ne_n$ sur $\ell^2$, alors $D(A^\alpha)=\{u:\sum n^{2\alpha}|u_n|^2<\infty\}$ pour $\alpha\ge0$. Pour $u_n=n^{-p}$, on a $u\in D(A^\alpha)$ exactement lorsque $p>\alpha+1/2$. À la valeur frontière, la série harmonique diverge.` },
    ],
    example: { title: 'Une fonction nulle presque partout spectralement', body: t`Pour $M_x$ sur $L^2(0,1)$ et $f=\mathbf1_{\{1/2\}}$, on a $f(M_x)=0$, tandis que $\sup_{[0,1]}|f|=1$. La mesure spectrale ignore ce singleton. Pour une fonction continue sur le spectre d’un auto-adjoint borné, on retrouve en revanche $\|f(A)\|=\sup_{\sigma(A)}|f|$.` },
    proof: { title: 'Déterminer les puissances d’une diagonale', scope: 'complete-example', scopeNote: 'Calcul complet à partir de la mesure spectrale explicite de la diagonale ; le théorème spectral général est utilisé, pas redémontré.', steps: [
      t`Pour $Ae_n=ne_n$, $E(B)u=\sum_{n\in B}u_ne_n$ et $\mu_u=\sum_n|u_n|^2\delta_n$.`,
      t`L’intégrale de $|f|^2$ contre cette mesure est $\sum_n|f(n)|^2|u_n|^2$. Cela donne exactement le domaine, et les coordonnées de $f(A)u$ sont $f(n)u_n$.`,
      t`Avec $f(\lambda)=\lambda^\alpha$ sur $[0,\infty)$, la condition devient $\sum_n n^{2\alpha}|u_n|^2<\infty$. Pour $u_n=n^{-p}$, c’est la série $\sum_n n^{2\alpha-2p}$.`,
      t`Le critère des séries de puissances donne $2p-2\alpha>1$, donc $p>\alpha+1/2$. À égalité, la série est $\sum 1/n$ et diverge.`,
      t`Pour $f(\lambda)=1/(1+\lambda)$, les coefficients sont bornés par $1/2$, avec égalité en $n=1$. Le domaine est tout $\ell^2$ et la norme vaut $1/2$.`,
    ] },
    pitfalls: [t`$f(A)u$ n’est pas $f(Au)$ : le premier est linéaire en $u$, le second n’est pas défini en général.`, t`La continuité de $f$ sur un spectre non borné ne garantit ni sa bornitude ni $D(f(A))=H$.`],
    questions: [
      { id: 'puissance', prompt: t`Pour $Ae_n=ne_n$ et $u_n=n^{-5/4}$, où se trouve $u$ ?`, options: [{ text: t`Dans $D(A^{1/2})$, mais pas dans $D(A)$`, feedback: 'Oui : 5/4>1 mais 5/4≤3/2.' }, { text: t`Dans $D(A)$`, feedback: 'La série de ||Au||² vaut Σn^(−1/2), qui diverge.' }], correctIndex: 0 },
      { id: 'fonction', prompt: t`Pour $A=\operatorname{diag}(1,2)$, $u=(1,3)$ et $f(\lambda)=\lambda^2$, que vaut $f(A)u$ ?`, options: [{ text: '(1,36)', feedback: 'Ce serait le carré appliqué aux coordonnées de Au.' }, { text: '(1,12)', feedback: 'Oui : f(A)=diag(1,4), donc la deuxième coordonnée vaut 4×3.' }], correctIndex: 1 },
    ],
  },
];
