# Dictionnaire des notions et démonstration par blocs

Deux fonctions ajoutées le 15 novembre 2026 :

1. un **dictionnaire** : dans tout énoncé du jeu, une notion déjà rencontrée (continuité, compacité, opérateur fermé, sous-variété…) est soulignée en pointillé et ouvre sa fiche ;
2. un **atelier de démonstration par blocs logiques**, vue par défaut des exercices, et le **laboratoire H — Démonstration**, qui ne fait manipuler que les démonstrations des énoncés, avec un guide de preuve.

## 1. Dictionnaire

### Contenu

`src/content/dictionnaire/` : une entrée par notion (`types.ts`), rangées par domaine.

| Fichier | Domaine |
| --- | --- |
| `methodes.ts` | Logique et méthodes de preuve (implication, contraposée, absurde, existence, unicité, double inclusion, argument de densité, de compacité, passage à la limite…) |
| `fondements.ts` | Ensembles, topologie, suites (ouvert, fermé, compact, dense, continuité, suite de Cauchy…) |
| `algebre.ts` | Algèbre linéaire (noyau, formes bilinéaires, valeurs propres, déterminant, commutateur…) |
| `espaces.ts` | Espaces normés, Banach, Hilbert, dual, convergences faible et faible-* , injections |
| `distributions.ts` | Mesure, $L^p$, distributions, Sobolev, Fourier, trace |
| `operateurs.ts` | Opérateurs bornés et non bornés, adjoint, spectre, semi-groupes, formes, monotonie |
| `transversales.ts` | Notions très fréquentes (opérateur, prolongement, représentant…) et « Appliquer un théorème » |
| `edp.ts` | Formulation variationnelle, Dirichlet, Neumann, régularité, Galerkin |
| `varietes.ts`, `groupes.ts`, `symetries.ts` | Géométrie de Lie |
| `outils.ts` | Outils admis du catalogue (`AUX_TOOLS`) : Cauchy–Schwarz, Baire, convergence dominée… |
| `resultats.ts` | Formes sous lesquelles les 45 résultats sont cités ; leur fiche est construite à partir du contenu |

Chaque entrée : `term`, `domain`, `forms` (formes repérées dans les textes), `definition` ou `from` (reprise mot pour mot d'une définition du carnet), `complements` (« À retenir », « Exemple », « Contre-exemple », « Attention », « Image mentale », « Comment le montrer »), `prerequisites` (notions préalables), `related`, et facultativement `track` (parcours) et `symbols` (formules isolées comme `$H^1_0(\Omega)$`).

### Repérage (`matcher.ts`)

- Seules les parties en français sont examinées, jamais les formules.
- À une position donnée, la forme la plus longue l'emporte : « opérateur fermé » plutôt que « fermé ».
- Les mots restent entiers, tirets compris : rien dans « hémicontinu » ni dans « semi-groupe ».
- Les homonymes sont départagés par le parcours (`TermScope`) : « distribution », « trace », « générateur », « crochet », « intégrable », « relèvement », « forme fermée » n'ont pas le même sens en analyse et en géométrie de Lie.
- Des tournures neutres ne sont jamais liées (« par la suite », « dans la mesure où »…).
- Dans un même texte, une notion n'est liée qu'à sa première occurrence ; une fiche ne se lie pas à elle-même.
- Une formule isolée égale à une notation connue (`$H^1_0(\Omega)$`, `$SO(3)$`, `$\mathcal D'(\Omega)$`…) devient elle aussi cliquable.

### Interface

- `MathText` et `Prose` acceptent l'option `terms` : à activer dans les textes de lecture, jamais dans un bouton ni un lien.
- `GlossaryProvider` (à la racine) fournit le repéreur et ouvre la **bulle de définition** : ancrée au mot sur ordinateur, en feuille au bas de l'écran sur téléphone ; une notion citée dans la bulle ouvre sa propre fiche, avec retour ; Échap ferme et rend le focus au mot.
- **Page Dictionnaire** (`/dictionnaire`, `/dictionnaire/:id`) : recherche insensible aux accents, filtres par domaine, fiche complète avec « À connaître d'abord », « Notions qui s'appuient sur celle-ci », « Dans le jeu » (résultats qui emploient la notion, calculés sur tous les textes) et le chemin des notions préalables.

### Ajouter une notion

Ajouter une entrée dans le fichier du domaine, avec des formes en minuscules (singulier, pluriel, féminin), puis lancer `npx vitest run src/tests/content/dictionnaire.test.ts` : le test vérifie le LaTeX, le vocabulaire (aucun vocabulaire physique), les renvois, qu'aucune forme n'est revendiquée par deux entrées d'un même parcours, et que chaque définition du carnet, chaque résultat et chaque outil admis a sa fiche.

## 2. Démonstration par blocs logiques

`src/components/proof/blocks/` : `model.ts` (modèle pur, testé), `ProofBlocks.tsx` (éditeur), `ProofGuide.tsx` (guide).

| Bloc | Connecteur | Rôle |
| --- | --- | --- |
| Soit… / Supposons… | ∀ / ⊢ | introduire un objet ou une hypothèse locale ; une hypothèse locale n'est proposée comme prémisse qu'une fois introduite |
| Implication | ⟹ | « si » prémisses, « alors » affirmation, « car » justification |
| Appliquer un théorème | ⊢ | même structure, justifications de type théorème proposées d'abord |
| Calcul exact | = | valeur à calculer exactement avant de justifier |
| Contradiction | ⊥ | des faits établis sont incompatibles ; les blocs entre « Supposons par l'absurde » et la contradiction sont encadrés |
| Conclusion | ∎ | le but |

- Chaque bloc d'étape est exactement une étape (affirmation, prémisses, justification) du moteur : la vue ne change rien à ce qui est validé.
- Les faits sont repérés comme dans une preuve écrite : H1, H2… pour les hypothèses, (3) pour le bloc 3. Un bloc validé se replie en « De (3) et H2, car … ⟹ affirmation ».
- « Lire la démonstration rédigée » donne la preuve en phrases numérotées.
- La vue « Graphe des dépendances » (l'ancien atelier) reste disponible : les deux vues partagent la même session ; le choix est conservé (`prooflab:preuve:vue`).

### Guide de preuve

- Pour tous : méthode suggérée par la structure de la preuve (absurde, unicité, existence, fermeture, convexité, théorème) avec sa fiche, et notions du but avec leur « comment le montrer ».
- Exercices notés : les trois indices habituels, comptés comme avant.
- Laboratoire H seulement : « Que puis-je établir maintenant ? » (affirmations accessibles, puis prémisses, puis justification, révélées pas à pas ; « Introduis d'abord » si une hypothèse locale manque), « Remonter depuis le but » (ce qu'il suffit d'établir, de proche en proche) et le plan de la démonstration, étape par étape.

## 3. Laboratoire H — Démonstration (`/labo/demonstration`)

- Liste des 41 démonstrations jouables (exercices et variantes dont le but est l'énoncé même), pour 30 des 45 résultats ; les 15 autres résultats n'ont que des exercices d'application, et leur démonstration est décrite dans leur fiche.
- Bac à sable : le brouillon est conservé (`labo:demonstration:<exercice>`), mais aucune tentative ni erreur n'entre dans la progression.
- Chaque fiche de résultat qui a une démonstration jouable propose « Laboratoire de démonstration ».

## 4. Vérification

- `src/tests/content/dictionnaire.test.ts` (13 tests), `src/tests/glossaire/glossaire.test.tsx` (5), `src/tests/proof/blocs.test.tsx` (10, dont une démonstration par l'absurde complète au clic).
- `e2e/dictionnaire-blocs.spec.ts` (4 tests dans Chrome) : bulle de définition et navigation, page Dictionnaire, éditeur par blocs dans un exercice (même preuve en vue graphe), démonstration complète dans le laboratoire H avec guide et rédaction.
