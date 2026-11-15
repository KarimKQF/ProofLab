/**
 * Dictionnaire des notions : chaque entrée donne une définition précise et quelques
 * compléments (propriétés à retenir, exemple, contre-exemple, piège, comment le montrer).
 * Les formes (`forms`) sont les mots ou expressions qui, dans un énoncé, renvoient à
 * l'entrée : ils deviennent cliquables partout où le texte est affiché avec `terms`.
 */

/** Parcours : départage les homonymes (« distribution » en analyse ou en géométrie). */
export type DicoTrack = 'analyse' | 'lie';

export type DicoDomain =
  | 'methodes'
  | 'fondements'
  | 'algebre'
  | 'espaces'
  | 'distributions'
  | 'operateurs'
  | 'edp'
  | 'varietes'
  | 'groupes'
  | 'symetries'
  | 'outils'
  | 'resultats';

export const DOMAIN_LABEL: Record<DicoDomain, string> = {
  methodes: 'Logique et méthodes de preuve',
  fondements: 'Ensembles, topologie, suites',
  algebre: 'Algèbre linéaire',
  espaces: 'Espaces normés, Banach, Hilbert',
  distributions: 'Intégration, distributions, Sobolev',
  operateurs: 'Opérateurs et théorie spectrale',
  edp: 'EDP et méthodes variationnelles',
  varietes: 'Variétés et champs de vecteurs',
  groupes: 'Groupes et algèbres de Lie',
  symetries: 'Symétries et structure symplectique',
  outils: 'Outils admis',
  resultats: 'Résultats du jeu',
};

export const DOMAIN_ORDER: DicoDomain[] = [
  'methodes',
  'fondements',
  'algebre',
  'espaces',
  'distributions',
  'operateurs',
  'edp',
  'varietes',
  'groupes',
  'symetries',
  'outils',
  'resultats',
];

export type ComplementKind = 'retenir' | 'exemple' | 'contre-exemple' | 'attention' | 'intuition' | 'montrer';

export const COMPLEMENT_LABEL: Record<ComplementKind, string> = {
  retenir: 'À retenir',
  exemple: 'Exemple',
  'contre-exemple': 'Contre-exemple',
  attention: 'Attention',
  intuition: 'Image mentale',
  montrer: 'Comment le montrer',
};

export interface DicoComplement {
  kind: ComplementKind;
  /** Texte mixte (français et LaTeX entre $…$). */
  text: string;
}

export interface DicoEntry {
  /** Identifiant stable, utilisé dans l'adresse `/dictionnaire/<id>`. */
  id: string;
  /** Intitulé affiché (texte mixte). */
  term: string;
  domain: DicoDomain;
  /** Réservé à un parcours (homonymes) ; absent : les deux parcours. */
  track?: DicoTrack;
  /** Formes repérées dans les énoncés, en minuscules (« continue », « continuité »…). */
  forms: string[];
  /** Notation usuelle (texte mixte), affichée à côté de l'intitulé. */
  notation?: string;
  /** Formules qui, isolées entre dollars dans un énoncé, renvoient à l'entrée. */
  symbols?: string[];
  /** Définition (texte mixte). Absente : reprise de la définition du jeu `from`. */
  definition?: string;
  /** Identifiant d'une définition du carnet dont l'énoncé est repris tel quel. */
  from?: string;
  complements: DicoComplement[];
  /** Notions à connaître d'abord. */
  prerequisites?: string[];
  /** Entrées voisines. */
  related?: string[];
  /** Résultats du jeu à citer en priorité (identifiants du catalogue). */
  theorems?: string[];
}

/** Entrée prête à l'affichage : définition résolue et origine. */
export interface ResolvedEntry extends DicoEntry {
  definition: string;
  /** Pour les résultats du jeu : identifiant du théorème. */
  theoremId?: string;
  /** Pour les outils admis : identifiant dans `AUX_TOOLS`. */
  toolId?: string;
}
