# Visual Reasoning Engine 2.0 — architecture

Ce document décrit la couche visuelle ajoutée à ProofLab en novembre 2026. Le principe qu'elle suit : **une transformation visuelle correspond à une opération mathématique définie, et une étape n'est présentée comme établie que si le moteur de preuve l'a validée.**

## 1. Principes

1. **Un seul état mathématique par scène.** Chaque laboratoire tient un état (convexe, point x, points z ; ou G, A, c ; ou fonction, t, x₀, y₀…). Une fonction pure de `src/core/visual-reasoning/` en dérive une **lecture** (`SceneReadout`) : mesures, équations, hypothèses, conclusions. Toutes les vues affichent cette lecture. Aucune vue ne calcule elle-même une quantité mathématique.
2. **Aucune logique mathématique dans les composants graphiques.** Les composants SVG et 3D reçoivent des objets déjà calculés (points, coupes, grilles, courbes de niveau) et ne font que les placer.
3. **Le moteur de preuve est la seule source de vérité de la progression.** Une étape de démonstration animée est « établie » si et seulement si la clé produite par le nœud correspondant (`analyzeGraph`, champ `unlocks`) figure dans la sauvegarde. Le lecteur d'animation parcourt des étapes ; il ne valide rien et n'écrit jamais dans la progression.
4. **Préférences d'affichage séparées de la maîtrise.** Disposition du studio (`prooflab:studio:<id>`) et qualité 3D (`prooflab:qualite3d`) sont dans `localStorage`. Elles ne touchent ni aux exercices, ni aux révisions, ni aux clés de laboratoire.
5. **Une figure finie ne démontre jamais un énoncé infini.** Des points z en nombre fini, une quadrature, une coupe, une suite de rangs n affichés sont toujours étiquetés « Illustratif » ou « Numérique ». Le passage à un espace de Hilbert quelconque se fait par l'énoncé ou par un diagramme abstrait, jamais par une figure présentée comme fidèle.

## 2. Arborescence

```text
src/core/visual-reasoning/        modèle mathématique pur (aucun import React)
  types.ts                        statuts, lecture de scène, formatage
  linalg.ts                       algèbre linéaire 2D/3D (flottants) : Cholesky, Jacobi, inverses
  projection-scene.ts             familles de convexes (ℝ², ℝ³), projections, coupe plane, visibilité,
                                  données de l'animation du théorème, échelle ℝ → ℝ² → ℝ³ → H
  proof-stages.ts                 lien étapes ↔ nœuds de preuve, statut des étapes, contrôle de cohérence
  riesz-scene.ts                  Riesz / Lax–Milgram : décisions exactes, w = G⁻¹c, tangence, ellipsoïde,
                                  niveaux de a(x, x), changement de base de Cholesky, trois situations
  sections.ts                     grilles (avec cache), coupes x = x₀ / y = y₀, courbes de niveau, annulation
  surfaces.ts                     fonctions de ]0,1[² (H¹, H², H¹₀, exemple singulier), base de Dirichlet 2D
  sobolev-scene.ts                traces, invariance par H¹₀, dérivées approchées, normes, lecture
  convergence-modes.ts            presque partout, en mesure, forte, faible : six suites et leurs justifications
  aubin-lions-scene.ts            V ↪↪ H ↪ V′, familles « conclusion fausse » et « vraie mais non garantie »
  galerkin2d-scene.ts             Galerkin sur le carré : coefficients, Parseval, majorant du reste
  lie-core.ts                     laboratoire G : exponentielle de matrice, Runge–Kutta, crochets, Rodrigues,
                                  quaternions et relèvement de chemins, schémas pour H = p²/2 + V(q), rang
  lie-commutator.ts               commutateur de flots, prédiction t²[X,Y], ordre du reste
  lie-exponential.ts              sous-groupes à un paramètre de GL(2) ; Rodrigues dans SO(3)
  lie-cover.ts                    revêtement SU(2) → SO(3) : boule de rayon π, relevés
  lie-orbits.ts                   SO(3) sur S², conjugaison dans GL(2), flot linéaire sur le tore
  lie-symplectic.ts               flot exact contre Euler explicite, Euler symplectique, Störmer–Verlet

src/content/visual-proofs/
  projection-theorem.ts           graphe de preuve du théorème de projection + 8 étapes visuelles

src/components/math-visualizations/
  MathViewStudio.tsx              1 à 3 vues côte à côte, redimensionnables (souris, flèches), plein écran,
                                  boutons « Pourquoi cette représentation ? », « Voir le lien avec la
                                  démonstration », « Généraliser »
  panels.tsx                      équations, mesures (statut et méthode), hypothèses et conclusions,
                                  lecteur de démonstration (lecture, pause, précédent, suivant, début, vitesse)
  ChainDiagram.tsx                diagrammes abstraits (V ↪ H ↪ V′, J : H → H′, Pₙ) en notation précise
  Scene3DGate.tsx                 détection de WebGL, chargement différé, barrière d'erreur, alternative 2D
  three/Canvas3D.tsx              toile React Three Fiber : contrôles orbitaux de Three.js, caméra
                                  réinitialisable, clavier, étiquettes HTML projetées, rendu à la demande
  three/primitives.tsx            points, segments et flèches (cylindres), boules, plans, ellipsoïdes,
                                  surfaces, polylignes (tubes), plans de coupe
  three/quality.ts                qualité « normale » ou « faible »

src/labs/visual-scenes/           scènes par laboratoire (SVG et 3D), sans calcul
src/labs/sobolev/SobolevLab.tsx   laboratoire F
src/labs/groupes-lie/            laboratoire G (six scènes, onglets liés au paramètre « scene »)
src/tests/visual-reasoning/       tests du moteur visuel et des studios
```

## 3. Statuts affichés

| Étiquette | Sens |
| --- | --- |
| **Formule exacte** | Formule fermée (ou arithmétique rationnelle), valable pour tout point ; éventuellement évaluée en virgule flottante. |
| **Valeur numérique** | Quadrature, valeurs propres, différences finies : la méthode et sa précision sont affichées sous la valeur. |
| **Illustratif** | Ce que montre la figure pour l'exemple affiché ; ne démontre rien. |

Hypothèses : **satisfaite** (vraie pour l'exemple, par calcul exact), **démontrée** (établie par le joueur dans le moteur de preuve ou par une vérification exacte qu'il a saisie), **supposée** (hypothèse du théorème), **non vérifiée**, **absente** (fausse ou retirée).

Conclusions : **établie** (le moteur de preuve, ou les vérifications du joueur, l'ont validée), **illustrative**, **plus garantie par ce théorème** (hypothèse absente, la conclusion peut rester vraie), **fausse dans ce contre-exemple** (réfutée analytiquement).

## 4. Laboratoires

| | Laboratoire | Représentations |
| --- | --- | --- |
| A | Projection sur un convexe fermé | Demi-plan, rectangle, disque, droite vectorielle (ℝ²) ; boule, plan, droite affine (ℝ³). Vue 3D, coupe plane exacte par x, PₖX et z₁, équations et mesures, hypothèses, démonstration animée en 8 étapes liée au moteur de preuve, avec / sans hypothèse (fermeture, convexité, complétude), échelle ℝ → ℝ² → ℝ³ → H. Points z multiples ; z paramétré dans K en ℝ³. |
| B | Riesz et Lax–Milgram | ℝ² et ℝ³ : ellipse ou ellipsoïde unité de G, lignes ou plans de niveau de ℓ, tangence en w/‖w‖_G, w et u ; changement de base de Cholesky animé ; forme linéaire contre forme quadratique (coniques, homogénéité) ; coupe fidèle par un plan contenant w ; schéma abstrait J : H → H′ et 𝒜 : V → V′. Hypothèses vérifiées exactement (Sylvester, M², α). |
| C | Convergences | Laboratoire existant, plus un studio « modes de convergence » : six suites (dont machine à écrire, n·1]0,1/n[, (−1)ⁿ), quatre modes justifiés, graphe animé en n, cascade 3D (n en profondeur, coupe à x fixé), quantités exactes en fonction de n, surface sin(nπx) sin(nπy). |
| D | Rellich et Aubin–Lions | Laboratoire existant, plus un studio Aubin–Lions : diagramme V ↪↪ H ↪ V′, surface uₙ(t, x) avec coupes, norme spatiale au cours du temps, translations en temps, et retrait d'une hypothèse qui sépare (1) théorème non applicable, (2) conclusion fausse, (3) conclusion vraie mais non garantie. |
| E | Galerkin | Laboratoire existant (dix étapes de preuve, chacune débloquant une visualisation, dimension 1), plus un studio en dimension spatiale 2 : surface uₙ(t, x, y), coupes, terme individuel, comparaison de deux rangs, coefficients, écarts exacts par Parseval, statut « exploration, non démontrée ». |
| F | Sobolev et traces | Surface, niveaux, coupes et dérivées (exactes et différences centrées), traces sur les quatre côtés, invariance de la trace par ajout d'un élément de H¹₀, comparaison H¹ / H² / H¹₀ / bornée, exemple singulier de H¹ non borné justifié analytiquement. |
| G | Groupes de Lie | Six scènes : commutateur de flots (cinq couples de champs, ordre 3 du reste), exponentielle dans GL(2) (orbites, det e^{sA} = e^{s tr A}, tr e^X ≥ −2 sur sl(2)), Rodrigues en 3D, revêtement SU(2) → SO(3) (boule de rayon π, relevé dans S³, animation), orbites (S², hyperboloïdes de conjugaison et cône limite, tore), intégration symplectique (aires et dérive de H). Détails : `docs/PARCOURS_LIE.md`. |

## 5. Démonstration animée et moteur de preuve

`content/visual-proofs/projection-theorem.ts` contient un graphe de preuve complet du théorème de projection (suite minimisante, estimation de Cauchy par l'identité du parallélogramme, complétude, fermeture, minimiseur, unicité par deux chemins, inégalité caractéristique, pièges et retraits d'hypothèse). Les huit étapes visuelles pointent vers ses nœuds. `checkScenario` vérifie que chaque étape vise un nœud existant, que sa clé est produite par ce nœud et que le nœud est dérivable. En mode « Preuve », seules les étapes établies sont accessibles ; en mode « Exploration », les autres s'affichent avec « Illustration disponible — preuve non encore établie ».

Les preuves guidées par famille du laboratoire A produisent des clés **propres à chaque famille** (`disque:K-ferme`). En version 1, la clé `K-ferme` était partagée, de sorte que démontrer la fermeture d'un demi-plan « débloquait » celle du disque. Une migration recalcule les clés à partir des brouillons existants (`migrateFamilyKeys`) : aucune progression n'est perdue, aucune n'est inventée.

## 6. Performance et robustesse

- Three.js et React Three Fiber forment un morceau séparé (`Canvas3D`, ~895 ko, ~241 ko compressé), téléchargé seulement quand une scène 3D s'affiche.
- Rendu à la demande (`frameloop="demand"`) : aucune image calculée au repos.
- Qualité « faible » : géométries trois fois plus légères, densité de pixels 1, pas d'anticrénelage.
- Grilles mises en cache (48 entrées) ; résolution réglable dans le laboratoire F ; géométries créées à la main libérées au démontage.
- Sans WebGL, ou si le rendu 3D échoue : alternative 2D **exacte** (coupe plane, coupe par un plan contenant w, carte des niveaux).
- Mise en page : requêtes de conteneur (Tailwind 4) pour que les figures côte à côte s'empilent selon la largeur de la vue, pas de l'écran.

**Dépendance retirée.** `@react-three/drei` a été désinstallé : l'antivirus de la machine (Avast WebShield) bloquait le fichier regroupé par Vite (`node_modules/.vite/deps/@react-three_drei.js`) comme « contenu malveillant ». Les seules fonctions utilisées (contrôles de caméra, lignes, étiquettes) sont réécrites avec les contrôles officiels de Three.js et des composants maison.

## 7. Fiabilité (compte rendu du 13 novembre 2026)

1. Rouvrir une preuve déjà validée ne crée plus de réussite supplémentaire ni ne modifie la révision espacée : une réussite n'est comptée qu'au moment où une vérification explicite atteint le but, une fois par tentative.
2. Les indices consultés sont conservés au rechargement (brouillon), même sans étape posée.
3. Une écriture différée ne peut plus écraser une sauvegarde importée : écritures sérialisées, tâche différée annulée à l'import et à la réinitialisation, écriture forcée à la fermeture de la page.
4. La rédaction libre ne perd plus ses derniers caractères : copie locale à chaque frappe et écriture au démontage comme à la fermeture.

Tests de non-régression : `src/tests/reliability.test.tsx`. Manipuler un point, changer de dimension, rejouer une animation, consulter une preuve ou bouger la caméra n'enregistre jamais de réussite : tests « aucune écriture » de chaque studio.

## 8. Tests et tolérances

- Valeurs de référence exactes (rationnels) pour les projections sur un plan ou une droite affine, les mineurs de Sylvester, le vecteur de Riesz.
- Comparaisons flottantes à 1e−9 (opérations en nombre borné) ; quadratures fines (2·10⁵ points) pour contrôler les formules fermées des modes de convergence ; ordre 2 vérifié pour les différences centrées.
- Exemple singulier de H¹ : ‖∇u‖² = π/4 exactement, alors que la quadrature converge en 1/√(log n) — le test le vérifie, et l'interface l'affiche.
- Galerkin 2D : reste au-delà de 225 modes ≈ 2·10⁻¹⁰, majoré analytiquement.

## 9. Limites connues

- Le laboratoire F illustre le théorème de trace ; il ne le fait pas démontrer (lien vers la fiche du théorème).
- En dimension 2, la convergence de Galerkin est affichée comme une généralisation de la preuve jouée en dimension 1, jamais comme démontrée.
- La démonstration animée existe pour le théorème de projection seulement.
- Le laboratoire G illustre les résultats 35 à 45 ; il ne fait rien démontrer (renvois vers les fiches). Les notions avancées du cours de géométrie de Lie ne sont présentes que par les planches de l'atlas.
- Les vérifications en navigateur ont été faites avec Chrome 157 sans interface, sur le GPU de la machine (ANGLE / Direct3D 11). Le rendu WebGL logiciel (SwiftShader) n'a pas été testé ; l'alternative sans WebGL est testée sous jsdom. Aucun test sur navigateur mobile réel.
