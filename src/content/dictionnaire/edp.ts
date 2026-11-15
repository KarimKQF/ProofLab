/** EDP et méthodes variationnelles. */
import { t } from '../authoring';
import type { DicoEntry } from './types';

export const EDP: DicoEntry[] = [
  {
    id: 'formulation-variationnelle',
    term: 'Formulation variationnelle (faible)',
    domain: 'edp',
    forms: ['formulation variationnelle', 'formulations variationnelles', 'formulation faible', 'formulations faibles', 'variationnelle', 'variationnelles', 'variationnel', 'variationnels'],
    definition: t`On multiplie l'équation par une fonction test $v$, on intègre et l'on transfère des dérivées sur $v$ (formule de Green). Pour $-\Delta u=f$ avec $u=0$ au bord : trouver $u\in H^1_0(\Omega)$ tel que $\int_\Omega\nabla u\cdot\nabla v=\langle f,v\rangle$ pour tout $v\in H^1_0(\Omega)$.`,
    complements: [
      { kind: 'retenir', text: 'Le problème devient : trouver $u\\in V$ tel que $a(u,v)=\\ell(v)$ pour tout $v\\in V$ — exactement le cadre de Lax–Milgram.' },
      { kind: 'attention', text: 'Les conditions aux limites se répartissent : Dirichlet dans l’espace ($H^1_0$), Neumann dans l’équation (elles sortent naturellement de l’intégration par parties).' },
    ],
    prerequisites: ['h1-0', 'derivee-distributionnelle'],
    related: ['solution-faible', 'resultat-lax-milgram', 'outil-integration-parties'],
  },
  {
    id: 'solution-faible',
    term: 'Solution faible',
    domain: 'edp',
    forms: ['solution faible', 'solutions faibles', 'au sens faible'],
    definition: t`Une solution faible vérifie la formulation variationnelle, avec la régularité minimale qui lui donne un sens (par exemple $u\in H^1_0$), et non nécessairement l'équation ponctuelle.`,
    complements: [
      { kind: 'retenir', text: t`Une solution faible assez régulière (par exemple $H^2$) est solution forte : $-\Delta u=f$ presque partout. C'est l'objet de la régularité elliptique.` },
    ],
    prerequisites: ['formulation-variationnelle'],
    related: ['regularite', 'resultat-regularite-elliptique'],
  },
  {
    id: 'inequation-variationnelle',
    term: 'Inéquation variationnelle',
    domain: 'edp',
    forms: ['inéquation variationnelle', 'inéquations variationnelles', 'inéquation', 'inéquations'],
    from: 'stampacchia-inequation',
    complements: [
      { kind: 'retenir', text: t`Pour $a$ symétrique, c'est la condition d'optimalité de la minimisation de $\frac12a(v,v)-\langle f,v\rangle$ sur le convexe $K$ ; pour $K=V$, on retrouve l'équation $a(u,v)=\langle f,v\rangle$.` },
      { kind: 'exemple', text: t`Problème de l'obstacle : $K=\{v\in H^1_0:v\ge\psi\ \text{p.p.}\}$.` },
    ],
    prerequisites: ['convexe', 'forme-bilineaire'],
    related: ['resultat-stampacchia', 'resultat-projection'],
  },
  {
    id: 'probleme-dirichlet',
    term: 'Problème de Dirichlet',
    domain: 'edp',
    forms: ['problème de dirichlet', 'problèmes de dirichlet', 'condition de dirichlet', 'conditions de dirichlet', 'dirichlet'],
    definition: t`On impose la valeur de la solution sur le bord : $-\Delta u=f$ dans $\Omega$, $u=g$ sur $\partial\Omega$. Homogène ($g=0$), il se pose dans $H^1_0(\Omega)$.`,
    complements: [
      { kind: 'retenir', text: t`Pour $\Omega$ borné et $f\in H^{-1}(\Omega)$, la solution existe et est unique (Lax–Milgram avec Poincaré) ; si $g\neq0$, on se ramène au cas homogène par un relèvement.` },
    ],
    prerequisites: ['h1-0', 'trace-sobolev'],
    related: ['probleme-neumann', 'relevement', 'laplacien-dirichlet'],
  },
  {
    id: 'probleme-neumann',
    term: 'Problème de Neumann',
    domain: 'edp',
    forms: ['problème de neumann', 'problèmes de neumann', 'condition de neumann', 'conditions de neumann', 'neumann', 'dérivée normale'],
    definition: t`On impose la dérivée normale au bord : $-\Delta u=f$ dans $\Omega$, $\partial_\nu u=0$ sur $\partial\Omega$. On cherche $u\in H^1(\Omega)$ avec $\int\nabla u\cdot\nabla v=\int fv$ pour tout $v\in H^1(\Omega)$.`,
    complements: [
      { kind: 'retenir', text: t`Les constantes sont solutions du problème homogène : il faut la condition $\int_\Omega f=0$, et la solution n'est unique qu'à une constante près ; on travaille dans $V_0$ (moyenne nulle) avec Poincaré–Wirtinger.` },
    ],
    prerequisites: ['h1'],
    related: ['compatibilite', 'resultat-poincare-wirtinger', 'probleme-dirichlet'],
  },
  {
    id: 'compatibilite',
    term: 'Condition de compatibilité',
    domain: 'edp',
    forms: ['condition de compatibilité', 'conditions de compatibilité', 'compatibilité'],
    from: 'poincare-wirtinger-compatibilite',
    complements: [
      { kind: 'montrer', text: t`Tester l'équation avec $v=1$ : $\int\nabla u\cdot\nabla1=0$, donc $\langle f,1\rangle=0$ est nécessaire.` },
    ],
    related: ['probleme-neumann', 'moyenne', 'cns'],
  },
  {
    id: 'espace-v0',
    term: 'Espace $V_0$ (moyenne nulle)',
    domain: 'edp',
    notation: t`$V_0$`,
    forms: [],
    symbols: ['V_0'],
    from: 'poincare-wirtinger-v0',
    complements: [
      { kind: 'retenir', text: t`Sur $V_0$, avec $\Omega$ borné connexe lipschitzien, $\|\nabla u\|_{L^2}$ est une norme équivalente à la norme $H^1$ (Poincaré–Wirtinger).` },
    ],
    prerequisites: ['h1', 'moyenne'],
    related: ['probleme-neumann'],
  },
  {
    id: 'regularite',
    term: 'Régularité d’une solution',
    domain: 'edp',
    forms: ['régularité', 'régularités'],
    definition: t`Montrer qu'une solution, obtenue dans un espace faible, a en fait plus de dérivées (par exemple $u\in H^2$ au lieu de $H^1$), sous des hypothèses supplémentaires sur les données et le bord.`,
    complements: [
      { kind: 'contre-exemple', text: t`Sur un domaine à coin rentrant d'angle $\omega>\pi$, la solution de Dirichlet peut se comporter comme $r^{\pi/\omega}\sin(\pi\theta/\omega)$ et ne pas être dans $H^2$.` },
    ],
    related: ['solution-faible', 'h2', 'resultat-regularite-elliptique'],
  },
  {
    id: 'estimation-a-priori',
    term: 'Estimation a priori',
    domain: 'edp',
    forms: ['estimation a priori', 'estimations a priori', 'a priori'],
    definition: t`Une borne sur une éventuelle solution (ou sur des solutions approchées), obtenue à partir de l'équation seule, avant d'en avoir démontré l'existence ; typiquement en testant l'équation avec la solution elle-même.`,
    complements: [
      { kind: 'exemple', text: t`Pour $u'-\Delta u=f$ : tester avec $u$ donne $\frac12\frac{d}{dt}\|u\|^2_{L^2}+\|\nabla u\|^2_{L^2}=\langle f,u\rangle$, puis Young et intégration en temps.` },
      { kind: 'retenir', text: 'Une estimation uniforme en $n$ sur les approximations de Galerkin permet ensuite l’extraction (compacité) et le passage à la limite.' },
    ],
    related: ['argument-compacite', 'systeme-galerkin', 'outil-young', 'resultat-gronwall'],
  },
  {
    id: 'systeme-galerkin',
    term: 'Approximation de Galerkin',
    domain: 'edp',
    forms: ['système de galerkin', 'systèmes de galerkin', 'approximation de galerkin', 'approximations de galerkin', 'approchée de galerkin', 'approchées de galerkin'],
    from: 'systeme-galerkin',
    complements: [
      { kind: 'retenir', text: 'En dimension finie, le problème devient un système d’équations différentielles ordinaires, résolu par Cauchy–Lipschitz ; les estimations a priori ne dépendent pas de $n$.' },
    ],
    prerequisites: ['base-hilbertienne', 'projecteur'],
    related: ['resultat-galerkin', 'estimation-a-priori'],
  },
  {
    id: 'parabolique',
    term: 'Problème parabolique (d’évolution)',
    domain: 'edp',
    forms: ['problème parabolique', 'problèmes paraboliques', 'parabolique', 'paraboliques', 'équation d’évolution', 'équations d’évolution', 'problème d’évolution', 'problèmes d’évolution'],
    definition: t`Équation de la forme $u'+Au=f$ sur $]0,T[$ avec donnée initiale $u(0)=u_0$, où $A$ est un opérateur elliptique (par exemple $-\Delta$).`,
    complements: [
      { kind: 'retenir', text: t`Cadre : $u\in L^2(0,T;V)$, $u'\in L^2(0,T;V')$, triplet $V\subset H\subset V'$ ; existence par Galerkin, unicité par estimation a priori.` },
    ],
    related: ['espaces-bochner', 'systeme-galerkin', 'semi-groupe', 'condition-initiale'],
  },
  {
    id: 'condition-initiale',
    term: 'Condition initiale',
    domain: 'edp',
    forms: ['condition initiale', 'conditions initiales', 'donnée initiale', 'données initiales', 'valeur initiale', 'valeurs initiales'],
    definition: t`La valeur imposée à l'instant $t=0$ : $u(0)=u_0$. Elle n'a de sens que si $u$ est continue en temps à valeurs dans un espace convenable.`,
    complements: [
      { kind: 'retenir', text: t`Lions–Magenes : $u\in L^2(0,T;V)$, $u'\in L^2(0,T;V')$ entraînent $u\in C([0,T];H)$, ce qui donne un sens à $u(0)\in H$.` },
    ],
    related: ['resultat-lions-magenes', 'parabolique'],
  },
  {
    id: 'bien-pose',
    term: 'Problème bien posé',
    domain: 'edp',
    forms: ['bien posé', 'bien posée', 'bien posés', 'bien posées', 'problème bien posé', 'stabilité'],
    definition: t`Au sens d'Hadamard : la solution existe, elle est unique, et elle dépend continûment des données (stabilité).`,
    complements: [
      { kind: 'exemple', text: t`Lax–Milgram donne les trois : existence, unicité et $\|u\|_V\le\frac1\alpha\|f\|_{V'}$.` },
    ],
    related: ['existence', 'unicite', 'isomorphisme'],
  },
  {
    id: 'elliptique',
    term: 'Opérateur elliptique',
    domain: 'edp',
    forms: ['elliptique', 'elliptiques', 'ellipticité', 'uniformément elliptique'],
    definition: t`$Au=-\operatorname{div}(M\nabla u)$ est uniformément elliptique s'il existe $\alpha>0$ avec $M(x)\xi\cdot\xi\ge\alpha|\xi|^2$ pour presque tout $x$ et tout $\xi$. Le modèle est $-\Delta$.`,
    complements: [
      { kind: 'retenir', text: 'L’ellipticité donne la coercivité de la forme associée sur $H^1_0$ (avec Poincaré), donc l’existence par Lax–Milgram.' },
    ],
    related: ['coercivite', 'laplacien', 'resultat-regularite-elliptique'],
  },
];
