# ProofLab — Theorem Engine

Jeu local d’apprentissage de l’analyse fonctionnelle et des EDP, puis de la géométrie de Lie, du L3 avancé au M2 recherche. On n’y franchit pas un niveau en connaissant la réponse : on le franchit en démontrant pourquoi elle est vraie.

Sources : *Compléments d’analyse fonctionnelle, opérateurs et EDP* (polycopié, 46 pages ; copie locale dans `source-materials/`, non publiée) ; pour le parcours de géométrie de Lie, le cours *Géométrie différentielle, groupes de Lie, symétries et structures géométriques pour les EDP et le Scientific Machine Learning* (275 pages) et son *Atlas visuel* (90 planches), non copiés (voir `docs/PARCOURS_LIE.md`).

## Démarrer

**Windows, le plus simple** : double-cliquer sur `start.bat`. Le script utilise le Node portable de `.tools\node` (ou celui du système), installe les dépendances la première fois, lance le serveur et ouvre le navigateur sur http://127.0.0.1:5173.

En ligne de commande (Git Bash) :

```bash
export PATH="$PWD/.tools/node:$PATH"   # si Node n’est pas installé sur le système
npm install                              # une seule fois
npm run dev                              # http://127.0.0.1:5173
```

Version de production : `npm run build`, puis `npm run preview`.

Prérequis : Node.js ≥ 20. Une installation portable peut être placée localement dans `.tools/node`. Ce dossier et les dépendances `node_modules/` sont exclus du dépôt ; aucune installation portable n’est fournie sur GitHub.

## Ce que l’on fait dans ProofLab

- **Carte** : deux parcours, 11 mondes, 45 résultats reliés par leurs dépendances : analyse fonctionnelle et EDP (mondes I à VIII, résultats 1 à 34), géométrie de Lie (mondes IX à XI, résultats 35 à 45 : niveaux réguliers, crochet de Lie, Frobenius, orbites, algèbres de Lie, exponentielle, Rodrigues, SU(2) → SO(3), symétries d’EDO, Noether, flots hamiltoniens). Un résultat s’ouvre quand ceux dont dépend sa démonstration ont été travaillés.
- **Construction de preuve en blocs logiques** : la démonstration s’écrit de haut en bas, bloc par bloc : « Soit… / Supposons… », implication « si … alors … car … », théorème, calcul exact, contradiction, conclusion. Chaque bloc est vérifié par le moteur ; un bloc validé se replie en « De (3) et H2, car … ⟹ affirmation », et la preuve se relit rédigée, avec ses renvois. La vue « Graphe des dépendances » montre la même preuve. La banque se dévoile au fil des étapes établies (réglage « banque complète » pour tout afficher). Plusieurs chemins de preuve sont acceptés.
- **Dictionnaire** : dans tout énoncé, une notion déjà rencontrée (continuité, compacité, opérateur fermé, sous-variété…) est soulignée en pointillé et ouvre sa fiche : définition, à retenir, exemple, contre-exemple, piège, comment le montrer, notions préalables, résultats du jeu qui l’emploient. Plus de 320 fiches, dont les 45 résultats et les outils admis ; les homonymes sont départagés par parcours. Voir `docs/DICTIONNAIRE_ET_BLOCS.md`.
- **Retirer une hypothèse** : la preuve est recalculée sans elle, et un contre-exemple montre pourquoi le résultat ne peut plus être invoqué.
- **Preuve libre** : rédaction en français + LaTeX, aperçu en direct, points d’attention, grille d’auto-évaluation, solution de référence.
- **Contre-exemples** : assertions trop générales à faire tomber ; chaque réponse est décidée exactement.
- **Trouver l’erreur** : une démonstration complète, reprise d’un exercice, contient une étape fautive (affirmation fausse, justification invalide, hypothèse jamais vérifiée, résultat invoqué alors qu’il dépend de ce qu’on démontre) ; on la désigne, puis on dit ce qui ne va pas. 350 démonstrations fautives sur les 45 résultats ; le moteur de preuve confirme pour chacune que seule l’étape désignée est fautive. Voir `docs/ERREURS_ET_REVISIONS.md`.
- **Examen** : énoncés nouveaux (variantes), sans indice, durée optionnelle, notés sur la grille Hypothèses / Méthode / Validité des étapes / Justifications / Conclusion.
- **Laboratoires** (huit) : projection sur un convexe (ℝ² et ℝ³), Riesz et Lax–Milgram (ℝ² et ℝ³), convergences et modes de convergence, Rellich et Aubin–Lions, méthode de Galerkin (dimension 1, et dimension spatiale 2), Sobolev et traces, groupes de Lie (commutateur de flots, exponentielle, Rodrigues, revêtement SU(2) → SO(3), orbites, intégration symplectique), et **démonstration** (laboratoire H) : on n’y manipule que les démonstrations des énoncés, en blocs, avec un guide de preuve (méthode, ce qu’on peut établir maintenant, ce qu’il suffit de montrer, plan), et un **effacement progressif** : lire la preuve modèle, retrouver ses justifications, reconstruire les étapes effacées, puis la page blanche. Chacun des 45 résultats y a au moins une démonstration jouable (dont quinze démonstrations de résultats, complètes ou d’une étape clé, signalées comme telles).
- **Atlas visuel** : les 90 planches de l’atlas de géométrie de Lie, filtrables et cherchables. Chaque planche existe en **figure interactive** (2D ou 3D) qui reprend ses représentations : on fait le geste que la planche demande d’observer (déplacer un point, tourner, déformer, animer) et des observations guidées se cochent d’elles-mêmes, avec l’identité de la planche et des lectures chiffrées. L’onglet « Planche originale » garde l’image, la question « À vérifier » à réponse masquée ; s’y ajoutent les textes de la planche cités, le chapitre du cours, les résultats du jeu et la scène du laboratoire G qui s’y rattachent.
- **Visual Reasoning Engine** : dans chaque laboratoire, un « studio » affiche jusqu’à trois vues synchronisées d’un même état mathématique (géométrie 2D ou 3D, coupes, équations et mesures, hypothèses, démonstration animée, comparaison avec / sans hypothèse, schémas abstraits), redimensionnables et agrandissables. Chaque valeur porte son statut (formule exacte, valeur numérique, illustratif) ; une étape de démonstration n’est dite établie que si le moteur de preuve l’a validée. Voir `docs/ARCHITECTURE_VISUELLE.md`.
- **Révisions** (SM-2) des exercices et des **notions** du dictionnaire : une notion consultée dans un énoncé, liée à une erreur ou ajoutée à la main revient sous forme de question (définition, contre-exemple, méthode, piège), celles où l’on a trébuché d’abord.
- **Bilan des pièges** : les erreurs regroupées par concept et par nature, les pièges précis rencontrés, les fiches à relire et des exercices pour s’entraîner.
- **Tableau de bord**, **carnet** des énoncés et définitions, **mode libre** sans verrou, **réglages** (thème clair, animations réduites, pause des révisions, export et import de la sauvegarde).

## Ce que signifient les verdicts

| Verdict | Signification |
|---|---|
| **Validé** | Établi par une règle explicite du contenu, ou par un calcul exact (rationnels, polynômes, critère de Sylvester). |
| **À justifier** | Ni établi, ni réfuté : il manque une prémisse, la justification ne convient pas, ou le lien n’est pas couvert par les règles. |
| **Incorrect** | Une erreur réellement caractérisée : piège identifié, utilisation prématurée d’un résultat, raisonnement circulaire, calcul faux. |

**Limites.** Le vérifieur n’est pas un assistant de preuve formel : il contrôle des règles écrites à la main dans le contenu. La vérité de ces règles repose sur la rédaction et la relecture, non sur la machine. Une valeur numériquement proche n’est jamais acceptée comme identité. Une rédaction libre n’est jamais « Validée » : son évaluation est pédagogique et provisoire.

## Correcteur IA (optionnel, désactivé par défaut)

L’application fonctionne entièrement sans IA et, par défaut, n’émet aucune requête vers le correcteur. Pour activer une relecture non formelle des preuves libres, il faut deux terminaux :

```bash
PROOFLAB_AI=1 ANTHROPIC_API_KEY=... node server/ai-proxy.mjs   # le correcteur, sur 127.0.0.1:8787
VITE_PROOFLAB_AI=1 npm run dev                                  # l’application, qui l’interroge alors
```

La clé reste côté serveur, le proxy n’écoute que sur 127.0.0.1, et Vite lui relaie `/api`. Modèle par défaut : `claude-opus-5-5` (variable `PROOFLAB_AI_MODEL`). Le proxy active le repli automatique côté serveur en cas de refus du modèle. Chaque relecture est facturée par l’API.

## Tests

```bash
npm test               # Vitest : moteur, mathématiques, contenu
npm run test:content   # validation du contenu seule
npm run typecheck      # TypeScript strict
npm run test:e2e       # Playwright, avec le Chrome installé (aucun navigateur téléchargé)
```

Pour le parcours de géométrie de Lie, `src/tests/content/lie-calculs.test.ts` recalcule en plus, par une méthode indépendante, chaque valeur exacte demandée dans les onze modules ; `src/tests/content/atlas.test.ts` contrôle les données et les images de l’atlas.

Le validateur de contenu vérifie pour chaque exercice : schéma, compilation de chaque formule par KaTeX, vocabulaire (aucun terme physique), but dérivable, distracteurs non dérivables et expliqués par un piège, hypothèses déclarées nécessaires réellement nécessaires, aucun résultat invoqué avant d’être disponible, trois indices distincts, grille à 100 points, auto-validation des calculs fermés.

`node scripts/capture.mjs http://127.0.0.1:5173 captures / /carte` produit des captures d’écran de contrôle et liste les erreurs de console.

`node scripts/verify-visual.mjs http://127.0.0.1:5173 captures-visuel` manipule réellement chaque laboratoire (et l’atlas : scénarios `lie` et `atlas`) dans Chrome (points, curseurs, vues, caméra, animations), contrôle des invariants mathématiques affichés et le rendu WebGL effectif, et enregistre des captures. Méthode et résultats : `docs/VERIFICATION_NAVIGATEUR.md`.

Les scènes 3D utilisent Three.js et React Three Fiber, chargés seulement à l’affichage d’une scène 3D. Sans WebGL, chaque scène 3D est remplacée par une vue 2D exacte (coupe plane, carte des niveaux).

## Organisation du code

Voir `IMPLEMENTATION_PLAN.md` (architecture, modèle de données, validation, graphe de dépendances, progression) et `docs/GUIDE_CONTENU.md` (ajouter un résultat ou un exercice). Le contenu est séparé de l’interface : un résultat = un fichier `src/content/worlds/wN/tNN-<id>.ts`, découvert automatiquement.

## Données

La progression est stockée dans IndexedDB, dans ce navigateur. L’export produit un fichier JSON ; l’import le valide par schéma avant de remplacer quoi que ce soit.
