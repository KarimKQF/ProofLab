/**
 * Concepts transversaux. Une erreur conceptuelle est enregistrée contre un concept :
 * c'est ce qui alimente les « concepts fragiles » et la révision personnalisée.
 * Chaque monde peut ajouter ses propres concepts dans `worlds/wN/concepts.ts`.
 */
import type { Concept } from './schema';
import { t } from './authoring';

export const SHARED_CONCEPTS: Concept[] = [
  { id: 'justification-absente', label: 'Assertion sans justification', reminder: 'Une proposition n’est établie que si ce qui la fonde est identifié : hypothèse, définition ou théorème dont les conditions sont vérifiées.' },
  { id: 'utilisation-prematuree', label: 'Utilisation prématurée d’un résultat', reminder: 'On ne peut invoquer un résultat dont la démonstration repose sur ce qu’on cherche à établir.' },
  { id: 'circularite', label: 'Raisonnement circulaire', reminder: 'Une chaîne de justifications ne peut pas revenir sur son point de départ.' },
  { id: 'quantificateurs', label: 'Ordre des quantificateurs', reminder: t`$\forall x\,\exists C$ et $\exists C\,\forall x$ sont deux affirmations différentes : la constante de la première peut dépendre de $x$.` },
  { id: 'existence-unicite', label: 'Existence et unicité', reminder: 'Une preuve d’existence ne donne pas l’unicité, et inversement : les deux se vérifient séparément.' },
  { id: 'inegalite-stricte-limite', label: 'Inégalité stricte et limite', reminder: t`Le passage à la limite ne conserve que les inégalités larges : $a_n>0$ et $a_n\to a$ donnent seulement $a\ge 0$.` },
  { id: 'fermeture-espace', label: 'Fermeture relative à un espace', reminder: '« Fermé » dépend toujours de l’espace et de sa topologie.' },
  { id: 'densite-fermeture', label: 'Densité et fermeture', reminder: t`La densité et la fermeture sont deux propriétés différentes : $H^1_0$ est fermé dans $H^1$ mais dense et strict dans $L^2$.` },
  { id: 'norme-signe', label: 'Norme et signe de la limite', reminder: 'La convergence des normes ne dit rien du signe de la limite.' },
  { id: 'convergence-pp', label: 'Convergence presque partout', reminder: t`Une suite convergente dans $L^p$ admet une sous-suite convergeant presque partout ; la suite entière peut ne converger en aucun point.` },
  { id: 'faible-fort', label: 'Convergence faible et forte', reminder: t`$u_n\rightharpoonup u$ n'implique pas $\|u_n-u\|\to 0$.` },
  { id: 'faible-etoile', label: 'Convergence faible-*', reminder: t`Faible-* signifie tester contre les éléments de $X$, non contre ceux de $X''$.` },
  { id: 'nonlinearite-limite-faible', label: 'Non-linéarité et limite faible', reminder: t`La convergence faible ne passe pas à la limite dans une non-linéarité : $\sin^2(n x)\rightharpoonup 1/2$.` },
  { id: 'bornee-non-convergente', label: 'Suite bornée', reminder: 'Une suite bornée n’admet pas en général de sous-suite fortement convergente en dimension infinie.' },
  { id: 'coercivite-symetrie', label: 'Coercivité et symétrie', reminder: 'La coercivité ne requiert aucune symétrie : seule la partie symétrique intervient dans la forme quadratique.' },
  { id: 'coercivite-non-lineaire', label: 'Coercivité d’un opérateur non linéaire', reminder: t`La coercivité de $A:V\to V'$ n'est pas la coercivité quadratique d'une forme bilinéaire.` },
  { id: 'image-dense-surjective', label: 'Image dense et surjectivité', reminder: 'Une image dense n’est pas toute l’espace : il faut aussi que l’image soit fermée.' },
  { id: 'dual-identification', label: 'Dual et identification', reminder: t`Un élément de $H^{-1}$ n'est pas forcément une fonction de $L^2$ ; $H^{-s}$ sur $\mathbb R^d$ est une autre construction que $H^{-1}(\Omega)$.` },
  { id: 'domaine-operateur', label: 'Domaine d’un opérateur', reminder: 'Une expression différentielle seule ne définit pas un opérateur : le domaine fait partie de la donnée.' },
  { id: 'symetrie-autoadjonction', label: 'Symétrie et auto-adjonction', reminder: t`$A\subset A^*$ n'entraîne pas $A=A^*$ : les domaines peuvent différer.` },
  { id: 'hypotheses-theoreme', label: 'Hypothèses d’un théorème', reminder: 'Citer un théorème exige de vérifier chacune de ses hypothèses, dans le bon espace.' },
  { id: 'complet-necessaire', label: 'Complétude', reminder: 'Baire, Cauchy et les arguments de limite supposent un espace complet : à vérifier explicitement.' },
  { id: 'compact-continue', label: 'Injection compacte et continue', reminder: 'Une injection continue envoie les bornés sur des bornés ; une injection compacte, sur des relativement compacts.' },
  { id: 'domaine-borne', label: 'Domaine borné', reminder: t`Sur un domaine non borné, l'injection $H^1\hookrightarrow L^2$ peut ne pas être compacte : voir les translations.` },
  { id: 'regularite-bord', label: 'Régularité du bord', reminder: t`La régularité $H^2$ dépend du bord : elle peut échouer sur un domaine à coin rentrant.` },
  { id: 'trace-ponctuelle', label: 'Trace et évaluation ponctuelle', reminder: t`La trace d'une fonction de $H^1$ n'est pas une évaluation ponctuelle arbitraire.` },
  { id: 'compatibilite-neumann', label: 'Compatibilité et constantes', reminder: t`Pour Neumann, $\langle f,1\rangle=0$ est nécessaire et la solution n'est unique qu'à une constante près.` },
  { id: 'temps-compacite', label: 'Compacité en temps', reminder: 'La compacité spatiale ne contrôle pas les oscillations en temps : il faut une borne sur la dérivée temporelle.' },
  { id: 'valeur-initiale', label: 'Valeur initiale', reminder: t`Donner un sens à $u(0)$ demande une régularité en temps : voir Lions–Magenes.` },
  { id: 'limsup-minty', label: 'Hypothèse de Minty', reminder: t`L'hypothèse $\limsup\langle Au_n,u_n-u\rangle\le 0$ se démontre : elle n'est pas automatique.` },
  { id: 'calcul-exact', label: 'Calcul exact', reminder: 'Une valeur numériquement proche n’établit pas une égalité.' },

  // ───────── Parcours « Géométrie de Lie » ─────────
  { id: 'lie-niveau-regulier', label: 'Niveau régulier', reminder: t`Le théorème exige que $dF_p$ soit surjective en **tout** point du niveau ; un seul point critique peut faire perdre la structure de sous-variété.` },
  { id: 'lie-espace-tangent', label: 'Espace tangent', reminder: t`$T_pM$ est un sous-espace vectoriel de directions, pas la surface translatée ; pour un niveau régulier, $T_pM=\operatorname{Ker}dF_p$.` },
  { id: 'lie-crochet-convention', label: 'Convention du crochet', reminder: t`$[X,Y](f)=X(Yf)-Y(Xf)$ ; inverser l'ordre des compositions de flots change le signe du défaut de fermeture.` },
  { id: 'lie-crochet-commutation', label: 'Crochet et commutation', reminder: 'Le crochet mesure la non-commutation des flots, pas un angle entre les champs : deux champs orthogonaux peuvent avoir un crochet nul.' },
  { id: 'lie-involutivite', label: 'Involutivité', reminder: 'Une distribution intégrable est involutive ; un crochet qui sort de la distribution interdit toute surface intégrale.' },
  { id: 'lie-orbite-quotient', label: 'Orbite et quotient', reminder: t`$g\cdot x=h\cdot x\iff h^{-1}g\in G_x$ : l'orbite est en bijection avec $G/G_x$, pas avec $G$.` },
  { id: 'lie-algebre-tangente', label: 'Algèbre de Lie tangente', reminder: t`$\mathfrak g=T_eG$ : on dérive les contraintes en $t=0$ le long d'une courbe issue de l'identité.` },
  { id: 'lie-exp-somme', label: 'Exponentielle d’une somme', reminder: t`$e^{A+B}=e^Ae^B$ est garanti si $[A,B]=0$, et faux en général.` },
  { id: 'lie-exp-globale', label: 'Exponentielle globale', reminder: 'L’exponentielle est un difféomorphisme local près de 0 ; elle n’est ni injective ni surjective en général.' },
  { id: 'lie-revetement-signe', label: 'q et −q', reminder: t`$q$ et $-q$ définissent la même rotation : $SU(2)\to SO(3)$ est deux à un.` },
  { id: 'lie-symetrie-prolongee', label: 'Symétrie d’une EDO', reminder: 'Une symétrie doit envoyer graphes solutions sur graphes solutions : elle agit aussi sur les dérivées (prolongement).' },
  { id: 'lie-noether-variationnelle', label: 'Symétrie variationnelle', reminder: 'Noether s’applique à une symétrie du lagrangien (à une dérivée totale près), pas à n’importe quelle symétrie des équations.' },
  { id: 'lie-symplectique', label: 'Préservation symplectique', reminder: 'Un schéma précis peut ne pas préserver la forme symplectique ; en dimension 2, être symplectique équivaut à avoir un jacobien de déterminant 1.' },
];
