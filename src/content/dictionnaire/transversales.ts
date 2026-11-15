/** Notions transversales très fréquentes dans les énoncés (opérateur, prolongement, représentant…). */
import { t } from '../authoring';
import type { DicoEntry } from './types';

export const TRANSVERSALES: DicoEntry[] = [
  {
    id: 'operateur',
    term: 'Opérateur (linéaire)',
    domain: 'operateurs',
    track: 'analyse',
    forms: ['opérateur', 'opérateurs', 'opérateur linéaire', 'opérateurs linéaires'],
    definition: t`Un opérateur linéaire de $X$ dans $Y$ est une application linéaire $A$ définie sur un sous-espace $D(A)\subset X$, son domaine. Il est borné s'il existe $C$ avec $\|Au\|_Y\le C\|u\|_X$ sur $D(A)$, non borné sinon.`,
    complements: [
      { kind: 'retenir', text: t`Pour un opérateur borné, on prend en général $D(A)=X$ ; pour un opérateur différentiel (comme $-\Delta$), le domaine est un sous-espace strict et dense, qui fait partie de la donnée.` },
      { kind: 'attention', text: t`Avant d'utiliser $\langle Au,v\rangle$ ou $A^*$, vérifier que $u$ est bien dans le domaine.` },
    ],
    related: ['operateur-borne', 'operateur-non-borne', 'domaine-operateur', 'adjoint'],
  },
  {
    id: 'prolongement',
    term: 'Prolongement',
    domain: 'espaces',
    track: 'analyse',
    forms: ['prolongement', 'prolongements', 'prolonge', 'prolongent', 'prolonger', 'prolongé', 'prolongée', 'prolongés', 'prolongées', 'prolongeant', 'prolongement par continuité'],
    from: 'hahn-banach-prolongement',
    complements: [
      { kind: 'retenir', text: t`Prolongement par continuité : une application linéaire continue (ou uniformément continue) sur une partie dense d'un espace se prolonge de façon unique à tout l'espace, avec la même norme.` },
      { kind: 'exemple', text: t`La transformée de Fourier, définie sur $\mathcal S$, se prolonge en une isométrie de $L^2$ (Plancherel) ; la trace, définie sur les fonctions régulières, se prolonge à $H^1$.` },
      { kind: 'attention', text: t`Un prolongement linéaire quelconque n'est pas forcément continu : Hahn–Banach garantit l'existence d'un prolongement de même norme, pas son unicité.` },
    ],
    related: ['argument-densite', 'resultat-hahn-banach', 'densite'],
  },
  {
    id: 'representant-riesz',
    term: 'Représentant de Riesz',
    domain: 'espaces',
    forms: ['représentant de riesz', 'représentants de riesz'],
    from: 'riesz-representant',
    complements: [
      { kind: 'retenir', text: t`L'application $\ell\mapsto w$ est une isométrie de $H'$ sur $H$ : $\|w\|_H=\|\ell\|_{H'}$.` },
      { kind: 'attention', text: t`Le représentant dépend du produit scalaire choisi : sur $H^1_0$, celui de $v\mapsto\int fv$ pour $\int\nabla u\cdot\nabla v$ est la solution de $-\Delta u=f$, pas $f$.` },
    ],
    prerequisites: ['espace-hilbert', 'dual'],
    related: ['resultat-riesz', 'forme-lineaire'],
  },
  {
    id: 'representant-continu',
    term: 'Représentant continu',
    domain: 'distributions',
    forms: ['représentant continu', 'représentants continus', 'version continue'],
    definition: t`Un élément de $L^p$ est une classe de fonctions égales presque partout ; s'il contient une fonction continue, celle-ci est unique et s'appelle son représentant continu.`,
    complements: [
      { kind: 'retenir', text: t`En dimension $1$, toute $u\in H^1(]a,b[)$ a un représentant continu (même hölderien d'exposant $\frac12$) : on peut parler de $u(a)$ et $u(b)$.` },
      { kind: 'attention', text: t`En dimension $d\ge2$, une fonction de $H^1$ n'a pas toujours de représentant continu : « la valeur en un point » n'a pas de sens.` },
    ],
    related: ['espace-lp', 'presque-partout', 'trace-sobolev', 'sobolev'],
  },
  {
    id: 'fonction-appui',
    term: 'Fonction d’appui',
    domain: 'espaces',
    notation: t`$\sigma_C(L)=\sup_{z\in C}L(z)$`,
    forms: ['fonction d’appui', 'fonctions d’appui', 'inégalité de support', 'hyperplan d’appui'],
    from: 'hahn-banach-fonction-appui',
    complements: [
      { kind: 'retenir', text: t`Par Hahn–Banach (forme géométrique), un convexe fermé est l'intersection des demi-espaces $\{z:L(z)\le\sigma_C(L)\}$, $L\in X'$ : il est entièrement décrit par sa fonction d'appui.` },
      { kind: 'exemple', text: t`Pour la boule unité $C=\overline B(0,1)$ d'un espace normé : $\sigma_C(L)=\|L\|_{X'}$.` },
    ],
    prerequisites: ['convexe', 'dual'],
    related: ['resultat-hahn-banach'],
  },
  {
    id: 'appliquer-theoreme',
    term: 'Appliquer un théorème',
    domain: 'methodes',
    forms: ['appliquer le théorème', 'application du théorème', 'invoquer le théorème'],
    definition: t`Pour utiliser un théorème, on vérifie chacune de ses hypothèses, dans le bon espace et pour les bons objets, puis on en tire la conclusion, telle qu'elle est énoncée et pas davantage.`,
    complements: [
      { kind: 'montrer', text: 'Écrire la liste des hypothèses ; pour chacune, citer le fait établi qui la garantit ; vérifier que la conclusion obtenue est bien celle dont on a besoin (même espace, même topologie, même quantificateur).' },
      { kind: 'attention', text: t`Un théorème ne s'applique pas à moitié : Rellich exige un ouvert borné et lipschitzien ; Lax–Milgram, une forme continue et coercive sur un Hilbert. Une hypothèse manquante, et la conclusion peut être fausse.` },
      { kind: 'attention', text: 'On ne peut pas invoquer un résultat dont la démonstration repose sur ce qu’on cherche à établir (utilisation prématurée).' },
    ],
    related: ['implication', 'cns', 'contre-exemple'],
  },
  {
    id: 'divergence',
    term: 'Divergence',
    domain: 'distributions',
    notation: t`$\operatorname{div}F=\sum_j\partial_jF_j$`,
    forms: ['divergence nulle', 'opérateur divergence', 'formule de la divergence'],
    definition: t`La divergence d'un champ $F=(F_1,\dots,F_d)$ est $\operatorname{div}F=\sum_j\partial_jF_j$ ; on a $\Delta u=\operatorname{div}\nabla u$.`,
    complements: [
      { kind: 'retenir', text: t`Formule de la divergence : $\int_\Omega\operatorname{div}F=\int_{\partial\Omega}F\cdot\nu$ ; elle donne la formule de Green.` },
    ],
    related: ['gradient', 'laplacien', 'outil-integration-parties'],
  },
];
