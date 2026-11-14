/**
 * Catalogue fixe : parcours, mondes, identifiants des résultats, graphe de dépendances et
 * références aux documents sources (pages du PDF). Parcours « analyse » : polycopié
 * d'analyse fonctionnelle et EDP (page imprimée = page PDF − 4). Parcours « lie » : cours
 * de géométrie différentielle et groupes de Lie (page imprimée = page PDF − 20).
 *
 * `requires` : résultats que la démonstration utilise (arêtes du DAG, servent au
 * déverrouillage et au contrôle d'utilisation prématurée).
 * `alsoAllowed` : résultats utilisables par un chemin de preuve alternatif, sans être
 * exigés pour déverrouiller le théorème.
 */

export type TrackId = 'analyse' | 'lie';

export const TRACKS: { id: TrackId; title: string; subtitle: string }[] = [
  { id: 'analyse', title: 'Analyse fonctionnelle et EDP', subtitle: 'Polycopié « Compléments d’analyse fonctionnelle, opérateurs et EDP »' },
  { id: 'lie', title: 'Géométrie de Lie', subtitle: 'Cours « Géométrie différentielle, groupes de Lie, symétries » et son atlas visuel' },
];

export interface WorldInfo {
  n: number;
  id: string;
  title: string;
  subtitle: string;
  track: TrackId;
}

export const WORLDS: WorldInfo[] = [
  { n: 1, id: 'w1', title: 'Géométrie hilbertienne', subtitle: 'Projection, dualité, inéquations variationnelles', track: 'analyse' },
  { n: 2, id: 'w2', title: 'Opérateurs', subtitle: 'Les trois principes des opérateurs bornés', track: 'analyse' },
  { n: 3, id: 'w3', title: 'Distributions, Sobolev et EDP elliptiques', subtitle: 'Dérivées faibles, inégalités, formulation variationnelle', track: 'analyse' },
  { n: 4, id: 'w4', title: 'Analyse de Fourier', subtitle: 'Plancherel, ordres réels, injections fractionnaires', track: 'analyse' },
  { n: 5, id: 'w5', title: 'Convergence et compacité', subtitle: 'Topologies faibles, extraction, estimations', track: 'analyse' },
  { n: 6, id: 'w6', title: 'Opérateurs et théorie spectrale', subtitle: 'Domaines, adjoints, spectre, semi-groupes', track: 'analyse' },
  { n: 7, id: 'w7', title: 'Formes fermées', subtitle: 'Du domaine de forme à l’opérateur auto-adjoint', track: 'analyse' },
  { n: 8, id: 'w8', title: 'Analyse non linéaire', subtitle: 'Monotonie, identification de limite, Galerkin', track: 'analyse' },
  { n: 9, id: 'w9', title: 'Variétés et champs de vecteurs', subtitle: 'Niveaux réguliers, crochet de Lie, Frobenius', track: 'lie' },
  { n: 10, id: 'w10', title: 'Groupes et algèbres de Lie', subtitle: 'Orbites, algèbres matricielles, exponentielle, SO(3) et SU(2)', track: 'lie' },
  { n: 11, id: 'w11', title: 'Symétries et structure symplectique', subtitle: 'Réduction d’ordre, Noether, flots hamiltoniens', track: 'lie' },
];

export interface CatalogEntry {
  id: string;
  n: number;
  world: number;
  name: string;
  /** « Question résolue en EDP » (carte des 34 résultats, polycopié p. PDF 37). */
  use: string;
  requires: string[];
  alsoAllowed?: string[];
  /** Outils admis (hors parcours) sur lesquels repose la démonstration. */
  tools?: string[];
  /** Page PDF où figure l'énoncé dans le document source. */
  pdfPage: number;
  section: string;
  /** Document source (polycopié par défaut). */
  doc?: 'polycopie' | 'cours-lie';
  /** Laboratoire interactif associé, s'il existe. */
  lab?: 'projection' | 'riesz-lax-milgram' | 'convergences' | 'compacite' | 'galerkin' | 'sobolev-trace' | 'groupes-lie';
  /** Planches de l'atlas visuel de géométrie de Lie qui illustrent ce résultat. */
  atlas?: number[];
}

export const THEOREM_CATALOG: CatalogEntry[] = [
  { id: 'projection', n: 1, world: 1, name: 'Projection sur un convexe fermé', use: 'Construire le meilleur approximant sous contrainte ; inéquation variationnelle.', requires: [], tools: ['parallelogramme'], pdfPage: 5, section: '1.1', lab: 'projection' },
  { id: 'riesz', n: 2, world: 1, name: 'Représentation de Riesz', use: 'Représenter un élément du dual par un vecteur du Hilbert.', requires: ['projection'], tools: ['cauchy-schwarz'], pdfPage: 6, section: '1.2', lab: 'riesz-lax-milgram' },
  { id: 'hahn-banach', n: 3, world: 1, name: 'Hahn–Banach', use: 'Prolonger une forme, séparer des ensembles, utiliser le dual.', requires: [], tools: ['zorn'], pdfPage: 7, section: '1.3' },
  { id: 'stampacchia', n: 4, world: 1, name: 'Stampacchia', use: 'Résoudre une inéquation variationnelle coercive.', requires: ['projection', 'riesz'], tools: ['point-fixe-banach'], pdfPage: 7, section: '1.5' },

  { id: 'banach-steinhaus', n: 5, world: 2, name: 'Banach–Steinhaus', use: 'Passer d’une bornitude ponctuelle à une borne uniforme d’opérateurs.', requires: [], tools: ['baire'], pdfPage: 9, section: '2.1' },
  { id: 'application-ouverte', n: 6, world: 2, name: 'Application ouverte', use: 'Déduire la stabilité d’une bijection bornée entre Banach.', requires: [], tools: ['baire'], pdfPage: 9, section: '2.2' },
  { id: 'graphe-ferme', n: 7, world: 2, name: 'Graphe fermé', use: 'Démontrer la continuité d’un opérateur partout défini.', requires: ['application-ouverte'], pdfPage: 9, section: '2.3' },

  { id: 'distributions', n: 8, world: 3, name: 'Dérivation distributionnelle', use: 'Définir les dérivées et les équations au sens faible.', requires: [], pdfPage: 11, section: '3.1' },
  { id: 'poincare', n: 9, world: 3, name: 'Inégalité de Poincaré', use: 'Contrôler une fonction de $H^1_0$ par son gradient.', requires: ['distributions'], tools: ['cauchy-schwarz', 'densite-cinf'], pdfPage: 12, section: '3.3' },
  { id: 'poincare-wirtinger', n: 10, world: 3, name: 'Poincaré–Wirtinger', use: 'Contrôler $H^1$ modulo les constantes.', requires: ['rellich', 'distributions'], pdfPage: 12, section: '3.3' },
  { id: 'lax-milgram', n: 11, world: 3, name: 'Lax–Milgram', use: 'Construire l’unique solution faible elliptique linéaire.', requires: ['riesz'], alsoAllowed: ['stampacchia'], tools: ['cauchy-schwarz'], pdfPage: 13, section: '3.4', lab: 'riesz-lax-milgram' },
  { id: 'trace', n: 12, world: 3, name: 'Théorème de trace', use: 'Formuler une donnée au bord dans un espace de Sobolev.', requires: ['distributions'], pdfPage: 14, section: '3.6', lab: 'sobolev-trace' },
  { id: 'rellich', n: 13, world: 3, name: 'Rellich–Kondrachov', use: 'Obtenir une convergence forte spatiale par extraction.', requires: ['distributions'], tools: ['frechet-kolmogorov'], pdfPage: 15, section: '3.7', lab: 'compacite' },
  { id: 'regularite-elliptique', n: 14, world: 3, name: 'Régularité elliptique', use: 'Améliorer $H^1_0$ en $H^2$ lorsque les données le permettent.', requires: ['lax-milgram', 'distributions'], pdfPage: 15, section: '3.7' },

  { id: 'plancherel', n: 15, world: 4, name: 'Plancherel', use: 'Convertir une EDP linéaire à coefficients constants en multiplicateurs.', requires: [], pdfPage: 17, section: '4.1' },
  { id: 'gagliardo', n: 16, world: 4, name: 'Gagliardo', use: 'Mesurer $H^s$ via les différences $u(x)-u(y)$.', requires: ['plancherel'], tools: ['tonelli'], pdfPage: 18, section: '4.4' },
  { id: 'dualite-interpolation', n: 17, world: 4, name: 'Dualité et interpolation $H^s$', use: 'Déduire des contrôles intermédiaires, manipuler les ordres négatifs.', requires: ['plancherel'], tools: ['holder'], pdfPage: 18, section: '4.3' },
  { id: 'injections-fractionnaires', n: 18, world: 4, name: 'Injections de Sobolev fractionnaires', use: 'Traduire régularité Sobolev en intégrabilité ou continuité.', requires: ['plancherel'], tools: ['cauchy-schwarz'], pdfPage: 19, section: '4.5' },

  { id: 'banach-alaoglu', n: 19, world: 5, name: 'Banach–Alaoglu', use: 'Extraire des limites faibles-* dans les duaux.', requires: [], tools: ['tychonoff'], pdfPage: 20, section: '5.2' },
  { id: 'extraction-reflexive', n: 20, world: 5, name: 'Extraction faible en espace réflexif', use: 'Extraire une limite faible d’approximations bornées.', requires: ['banach-alaoglu'], tools: ['eberlein-smulian'], pdfPage: 20, section: '5.2', lab: 'convergences' },
  { id: 'aubin-lions', n: 21, world: 5, name: 'Aubin–Lions', use: 'Obtenir une convergence forte espace-temps.', requires: ['rellich', 'extraction-reflexive'], pdfPage: 21, section: '5.3', lab: 'compacite' },
  { id: 'lions-magenes', n: 22, world: 5, name: 'Lions–Magenes', use: 'Donner un sens à $u(0)$ et dériver $\\|u(t)\\|_H^2$.', requires: ['riesz'], pdfPage: 21, section: '5.4' },
  { id: 'gronwall', n: 23, world: 5, name: 'Lemme de Grönwall', use: 'Démontrer stabilité, bornes et unicité.', requires: [], pdfPage: 22, section: '5.5' },

  { id: 'adjoint', n: 24, world: 6, name: 'Adjoint d’un opérateur densément défini', use: 'Définir l’auto-adjonction avec les bons domaines.', requires: ['riesz'], pdfPage: 23, section: '6.1' },
  { id: 'fredholm', n: 25, world: 6, name: 'Alternative de Fredholm', use: 'Décrire l’obstruction de dimension finie à l’inversibilité.', requires: ['adjoint'], pdfPage: 24, section: '6.3' },
  { id: 'spectral-compact', n: 26, world: 6, name: 'Théorème spectral compact auto-adjoint', use: 'Construire une base orthonormée de vecteurs propres.', requires: ['adjoint'], pdfPage: 24, section: '6.4' },
  { id: 'spectral-general', n: 27, world: 6, name: 'Théorème spectral général', use: 'Définir $f(A)$ quand le spectre n’est pas discret.', requires: ['spectral-compact'], pdfPage: 25, section: '6.5' },
  { id: 'hille-yosida', n: 28, world: 6, name: 'Hille–Yosida', use: 'Construire le semi-groupe d’un opérateur non borné.', requires: ['adjoint'], pdfPage: 26, section: '6.8' },
  { id: 'lumer-phillips', n: 29, world: 6, name: 'Lumer–Phillips', use: 'Reconnaître un générateur contractif par un critère sur $A$.', requires: ['hille-yosida'], pdfPage: 26, section: '6.8' },

  { id: 'formes-fermees', n: 30, world: 7, name: 'Représentation des formes fermées', use: 'Construire $A\\ge 0$ à partir d’une forme fermée.', requires: ['lax-milgram', 'spectral-general'], pdfPage: 25, section: '6.6' },
  { id: 'friedrichs', n: 31, world: 7, name: 'Extension de Friedrichs', use: 'Choisir une extension auto-adjointe canonique.', requires: ['formes-fermees'], pdfPage: 26, section: '6.7' },

  { id: 'browder-minty', n: 32, world: 8, name: 'Browder–Minty', use: 'Existence pour une EDP elliptique monotone non linéaire.', requires: ['minty', 'extraction-reflexive'], tools: ['brouwer'], pdfPage: 28, section: '7.2' },
  { id: 'minty', n: 33, world: 8, name: 'Argument de Minty', use: 'Identifier la limite d’un opérateur monotone.', requires: ['extraction-reflexive'], pdfPage: 30, section: '7.4' },
  { id: 'galerkin', n: 34, world: 8, name: 'Méthode de Galerkin et passage à la limite', use: 'Construire une solution faible d’évolution par approximation.', requires: ['extraction-reflexive', 'aubin-lions', 'lions-magenes', 'spectral-compact'], alsoAllowed: ['gronwall', 'minty'], pdfPage: 31, section: '8', lab: 'galerkin' },

  // ───────── Parcours « Géométrie de Lie » (cours de géométrie différentielle et groupes de Lie) ─────────
  { id: 'niveau-regulier', n: 35, world: 9, name: 'Théorème du niveau régulier', use: 'Reconnaître une sous-variété et calculer son espace tangent.', requires: [], tools: ['fonction-implicite'], pdfPage: 50, section: '8.6', doc: 'cours-lie', atlas: [4, 9, 10, 21] },
  { id: 'crochet-lie', n: 36, world: 9, name: 'Crochet de Lie et commutateur de flots', use: 'Mesurer la non-commutation de deux flots.', requires: [], tools: ['theoreme-cauchy-lipschitz', 'schwarz'], pdfPage: 45, section: '7.1–7.2', doc: 'cours-lie', lab: 'groupes-lie', atlas: [7, 8] },
  { id: 'frobenius', n: 37, world: 9, name: 'Théorème de Frobenius', use: 'Décider si un champ de plans admet des surfaces intégrales.', requires: ['crochet-lie', 'niveau-regulier'], pdfPage: 55, section: '10.3', doc: 'cours-lie', atlas: [12] },
  { id: 'orbite-stabilisateur', n: 38, world: 10, name: 'Orbite–stabilisateur', use: 'Identifier une orbite au quotient d’un groupe par un stabilisateur.', requires: [], pdfPage: 92, section: '21.5', doc: 'cours-lie', lab: 'groupes-lie', atlas: [24, 25, 26] },
  { id: 'algebre-lie-matricielle', n: 39, world: 10, name: 'Algèbre de Lie d’un groupe matriciel', use: 'Calculer l’espace tangent à l’identité et son crochet.', requires: ['niveau-regulier', 'crochet-lie'], tools: ['formule-jacobi'], pdfPage: 102, section: '25–26', doc: 'cours-lie', atlas: [28, 29, 30, 31] },
  { id: 'exponentielle', n: 40, world: 10, name: 'Sous-groupes à un paramètre et exponentielle', use: 'Passer du générateur infinitésimal à la transformation finie.', requires: ['algebre-lie-matricielle'], tools: ['theoreme-cauchy-lipschitz'], pdfPage: 111, section: '28–29', doc: 'cours-lie', lab: 'groupes-lie', atlas: [32, 33, 34, 40] },
  { id: 'rodrigues', n: 41, world: 10, name: 'SO(3), so(3) et formule de Rodrigues', use: 'Calculer une rotation à partir de son axe et de son angle.', requires: ['exponentielle'], pdfPage: 116, section: '31', doc: 'cours-lie', lab: 'groupes-lie', atlas: [35] },
  { id: 'revetement-su2', n: 42, world: 10, name: 'Double revêtement de SO(3) par SU(2)', use: 'Comprendre pourquoi un tour complet n’est pas homotope à l’identité.', requires: ['rodrigues', 'orbite-stabilisateur'], pdfPage: 119, section: '32', doc: 'cours-lie', lab: 'groupes-lie', atlas: [36] },
  { id: 'symetries-edo', n: 43, world: 11, name: 'Symétries de Lie et réduction d’une EDO', use: 'Abaisser l’ordre d’une EDO grâce à un groupe de symétries.', requires: ['crochet-lie', 'exponentielle'], pdfPage: 148, section: '39–42', doc: 'cours-lie', atlas: [42, 43, 44, 45, 46, 47] },
  { id: 'noether', n: 44, world: 11, name: 'Théorème de Noether', use: 'Associer une intégrale première à une symétrie variationnelle.', requires: ['symetries-edo'], pdfPage: 188, section: '53', doc: 'cours-lie', atlas: [58, 60, 61] },
  { id: 'flot-hamiltonien', n: 45, world: 11, name: 'Flots hamiltoniens et intégration symplectique', use: 'Préserver la forme symplectique, à l’échelle continue et discrète.', requires: ['crochet-lie', 'noether'], tools: ['formule-cartan'], pdfPage: 199, section: '56, 59', doc: 'cours-lie', lab: 'groupes-lie', atlas: [62, 63, 64, 66, 87] },
];

/** Outils classiques admis : invocables partout, jamais soumis au contrôle de dépendance. */
export const AUX_TOOLS: Record<string, string> = {
  parallelogramme: 'Identité du parallélogramme',
  'cauchy-schwarz': 'Inégalité de Cauchy–Schwarz',
  'inegalite-triangulaire': 'Inégalité triangulaire',
  young: 'Inégalité de Young',
  holder: 'Inégalité de Hölder',
  'convergence-dominee': 'Théorème de convergence dominée',
  tonelli: 'Théorème de Tonelli',
  zorn: 'Lemme de Zorn',
  tychonoff: 'Théorème de Tychonoff',
  baire: 'Théorème de Baire',
  'point-fixe-banach': 'Théorème du point fixe de Banach',
  brouwer: 'Théorème du point fixe de Brouwer',
  'eberlein-smulian': 'Théorème d’Eberlein–Šmulian',
  'frechet-kolmogorov': 'Critère de compacité de Fréchet–Kolmogorov',
  'densite-cinf': 'Densité de $C^\\infty_c(\\Omega)$',
  'riemann-lebesgue': 'Lemme de Riemann–Lebesgue',
  'plongement-canonique': 'Plongement canonique dans le bidual',
  'theoreme-fondamental': 'Théorème fondamental du calcul intégral',
  'theoreme-cauchy-lipschitz': 'Théorème de Cauchy–Lipschitz',
  'serie-neumann': 'Série de Neumann',
  'lemme-riesz-compacite': 'Lemme de compacité de Riesz',
  'fonction-implicite': 'Théorème des fonctions implicites',
  schwarz: 'Théorème de Schwarz (symétrie des dérivées secondes)',
  'formule-jacobi': 'Formule de Jacobi pour la dérivée du déterminant',
  'formule-cartan': 'Formule de Cartan pour la dérivée de Lie',
  'relevement-homotopies': 'Propriété de relèvement des homotopies d’un revêtement',
  'sphere-simplement-connexe': 'La sphère S³ est simplement connexe',
};

export const CATALOG_BY_ID = new Map(THEOREM_CATALOG.map((t) => [t.id, t]));

/** Tous les ancêtres stricts d'un théorème dans le DAG (y compris les alsoAllowed). */
export function ancestors(id: string, includeOptional = true): Set<string> {
  const out = new Set<string>();
  const visit = (x: string) => {
    const e = CATALOG_BY_ID.get(x);
    if (!e) return;
    for (const r of [...e.requires, ...(includeOptional ? (e.alsoAllowed ?? []) : [])]) {
      if (!out.has(r)) {
        out.add(r);
        visit(r);
      }
    }
  };
  visit(id);
  return out;
}

/**
 * Théorèmes invocables dans un exercice.
 * Démonstration : ancêtres stricts seulement (invoquer le résultat ou un descendant est circulaire).
 * Application : le résultat lui-même, ses ancêtres et les prérequis déclarés de l'exercice.
 */
export function allowedTheorems(
  theoremId: string,
  purpose: 'demonstration' | 'application',
  prerequisites: readonly string[],
): Set<string> {
  const allowed = new Set<string>([...Object.keys(AUX_TOOLS), ...ancestors(theoremId)]);
  if (purpose === 'application') {
    allowed.add(theoremId);
    for (const p of prerequisites) {
      allowed.add(p);
      for (const a of ancestors(p)) allowed.add(a);
    }
  }
  return allowed;
}

export function theoremLabel(id: string): string {
  return CATALOG_BY_ID.get(id)?.name ?? AUX_TOOLS[id] ?? id;
}
