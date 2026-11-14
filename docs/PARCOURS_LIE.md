# Parcours « Géométrie de Lie », Atlas visuel et laboratoire G

Ajouté le 14 novembre 2026. Ce document décrit ce qui a été livré, d'où vient chaque contenu, ce qui est vérifié et ce qui ne l'est pas.

## 1. Sources

| Document | Rôle dans le jeu |
| --- | --- |
| Cours *Géométrie différentielle, groupes de Lie, symétries et structures géométriques pour les EDP et le Scientific Machine Learning* (275 pages PDF, 17 parties, 78 chapitres) | Énoncés, démonstrations et exercices des résultats 35 à 45. Les références `lie(pdfPage, …)` donnent la page du PDF ; page imprimée = page PDF − 20. |
| *Atlas visuel — Géométrie de Lie* (93 pages, 90 planches, auteur « Projet MATHS ») | Les 90 planches, reproduites en image, avec leurs textes cités. |

Aucun des deux PDF n'est copié dans le projet. Le PDF de l'atlas contient un lien externe (URI) sur chaque planche : il n'est ni lu ni recopié (le script de génération n'extrait que le texte et les positions, et un test vérifie l'absence de toute URL dans les données).

## 2. Résultats et exercices (mondes IX, X, XI)

Trois mondes, onze résultats, trois exercices chacun (facile, intermédiaire, difficile), soit 33 exercices, chacun avec graphe de preuve, pièges, indices gradués, variante, et au moins une variante par résultat munie d'une preuve (mode Examen).

| N° | Résultat | Monde | Source (PDF) | Planches |
| --- | --- | --- | --- | --- |
| 35 | Théorème du niveau régulier | IX | 50 | 4, 9, 10, 21 |
| 36 | Crochet de Lie et commutateur de flots | IX | 45 | 7, 8 |
| 37 | Théorème de Frobenius | IX | 55 | 12 |
| 38 | Orbite–stabilisateur | X | 92 | 24, 25, 26 |
| 39 | Algèbre de Lie d'un groupe matriciel | X | 102 | 28 à 31 |
| 40 | Sous-groupes à un paramètre et exponentielle | X | 111 | 32, 33, 34, 40 |
| 41 | SO(3), so(3) et formule de Rodrigues | X | 116 | 35 |
| 42 | Double revêtement de SO(3) par SU(2) | X | 119 | 36 |
| 43 | Symétries de Lie et réduction d'une EDO | XI | 148 | 42 à 47 |
| 44 | Théorème de Noether | XI | 188 | 58, 60, 61 |
| 45 | Flots hamiltoniens et intégration symplectique | XI | 199 | 62, 63, 64, 66, 87 |

Conventions du cours suivies partout : $[X,Y](f)=X(Yf)-Y(Xf)$, soit $[X,Y]=Y'X-X'Y$ en coordonnées ; $C_t=\Phi^Y_{-t}\circ\Phi^X_{-t}\circ\Phi^Y_t\circ\Phi^X_t$ ; $\omega=dq\wedge dp$ et $\iota_{X_H}\omega=dH$, d'où $q'=\partial_pH$, $p'=-\partial_qH$.

Les démonstrations qui ne viennent pas du cours sont marquées `COMPLEMENT` (par exemple l'exercice difficile du résultat 45, Euler explicite contre Euler symplectique).

## 3. Ce qui est vérifié

- **Validateur de contenu** (comme pour le parcours d'analyse) : schéma, KaTeX, vocabulaire, but dérivable, distracteurs réfutés, hypothèses nécessaires, pages du cours dans 21–275.
- **Recalcul indépendant** (`src/tests/content/lie-calculs.test.ts`) : chaque contrôle fermé des onze modules (54 au total : nœuds masqués, variantes, contre-exemples) est recalculé par une autre méthode que celle du texte. Flots par Runge–Kutta, crochets par jacobiennes numériques, exponentielles par série, relèvement pas à pas dans S³, rangs par élimination de Gauss, schémas itérés. Un contrôle fermé sans recalcul fait échouer le test. Dix autres tests vérifient des affirmations du texte qui ne portent pas de contrôle fermé (développement $C_t(p)=p+t^2[X,Y]_p+O(t^3)$ à l'ordre 3, $\det e^X=e^{\operatorname{tr}X}$, $\operatorname{tr}e^X\ge-2$ sur $\mathfrak{sl}(2)$, Rodrigues, morphisme SU(2) → SO(3), $dI/dt=2q_1q_2$ pour un potentiel non radial, contre-exemple 13/16…). Le test a été éprouvé par mutation : une valeur attendue altérée (9/4 → 5/2) est détectée.
- **Navigateur réel** : une preuve complète (`crochet-lie.facile`) jouée et validée dans Chrome (`e2e/lie.spec.ts`).

## 4. Atlas visuel (`/atlas`, `/atlas/:n`)

- **Génération** : `scripts/atlas/atlas_build.py <atlas.pdf> public/atlas-lie src/content/atlas/atlas-lie.data.ts` (Python avec PyMuPDF et Pillow). Chaque planche est rendue en WebP (zoom 2, 1684 × 1191 px, environ 82 ko) avec une vignette de 480 px. Le texte est extrait par position et par style : partie, titre, question, « Lire le dessin », « D'où vient la formule ? », « À vérifier » (question, réponse, boîte de la réponse), référence au cours. Au total, 7,4 Mo d'images pleines et 1,1 Mo de vignettes.
- **Formules** : elles restent dans les images ; elles ne sont pas retranscrites (l'extraction de texte les détruit).
- **Page Atlas** : 90 planches groupées par partie, filtres (partie, tronc principal / notions avancées, planches reliées au jeu), recherche insensible aux accents.
- **Page planche** : deux onglets. **Figure interactive** (vue par défaut) : les mêmes représentations que la planche, mais manipulables, en 2D (SVG) ou en 3D (Three.js) ; on fait le geste que la planche demande de regarder, des observations guidées se cochent quand l'état de la figure les réalise, l'identité de la planche et des lectures chiffrées (statut exact ou numérique) accompagnent la figure ; rien n'est écrit dans la progression. **Planche originale** : image ; réponse « À vérifier » masquée par un cache posé à sa position exacte, révélée à la demande. Le choix d'onglet est conservé. Dans les deux cas : textes de la planche **cités tels quels** ; référence au chapitre et aux pages du cours (imprimées et PDF) ; renvois vers les fiches des résultats et vers la scène du laboratoire G ; navigation au clavier (les flèches restent dans la figure quand un curseur ou un point a le focus).
- **Figures interactives** : `src/atlas-interactif/` — une planche par fichier (`planches/p01.tsx` à `p90.tsx`), chargée à la demande ; 31 planches ont au moins une vue 3D, 59 sont entièrement en 2D. Conception planche par planche, conventions et état : `docs/ATLAS_INTERACTIF.md`.
- **Vocabulaire** : les textes de l'atlas emploient parfois un vocabulaire que le jeu s'interdit dans ses propres textes (par exemple « vitesse » pour un vecteur tangent). Ils sont affichés comme citations, sous l'intitulé « Texte de la planche, cité tel quel », et ne passent pas par le validateur de vocabulaire.
- **Fiches de résultats** : chaque résultat du parcours montre ses planches (champ `atlas` du catalogue) ; un test vérifie que les planches citées relèvent des chapitres du résultat.

## 5. Laboratoire G — Groupes de Lie (`/labo/groupes-lie?scene=…`)

Noyau numérique et modèles : `src/core/visual-reasoning/lie-*.ts` (fonctions pures). Interface : `src/labs/groupes-lie/`. Chaque scène suit les règles du moteur visuel : une seule lecture (mesures, équations, hypothèses, conclusions) alimente toutes les vues ; chaque valeur porte son statut ; aucune manipulation n'écrit dans la progression.

| Scène | Contenu | Résultats | Planches |
| --- | --- | --- | --- |
| Commutateur de flots | Cinq couples de champs, point p déplaçable, chemin X, Y, −X, −Y, prédiction $p+t^2[X,Y]_p$, tableau des restes (rapport ≈ 8 : ordre 3) ; crochet en forme close recoupé par jacobiennes ; flots exacts ou Runge–Kutta (statut numérique) | 36, 37 | 7, 8 |
| Exponentielle | $A\in\mathfrak{gl}(2)$ (préréglages ou coefficients), orbites, image du cercle unité, $\det e^{sA}=e^{s\operatorname{tr}A}$, courbe de $\operatorname{tr}e^{sA}$ et seuil −2, écart $e^{A_0}e^{B_0}\neq e^{A_0+B_0}$ | 40, 39 | 32, 33, 34, 40 |
| Rodrigues | Axe, angle, vecteur ; vue 3D (projection plane sans WebGL) ; série contre formule fermée, $R^{\mathsf T}R=I$, angle et axe relus | 41, 40 | 35 |
| Revêtement SU(2) → SO(3) | Un ou deux tours ; modèle de la boule de rayon π (passages par le bord) ; relevé sur le cercle de ℍ engendré par 1 et u (formule et relèvement pas à pas) ; repère tourné ; animation | 42, 41 | 36 |
| Orbites | SO(3) sur S² (stabilisateur, deux sous-groupes à un paramètre) ; GL(2) par conjugaison (hyperboloïde $(a-m)^2+y^2-z^2=\delta^2$, cône limite et orbite du bloc de Jordan) ; flot linéaire sur le tore (pente rationnelle ou non) ; dimensions par le rang de l'action infinitésimale | 38, 35 | 1, 24, 25, 26 |
| Intégration symplectique | Oscillateur ou pendule ; flot exact ou de référence, Euler explicite, Euler symplectique, Störmer–Verlet ; image d'un disque, rapport d'aires, déterminant d'un pas, dérive de H | 45, 44 | 63, 66, 89 |

Tests : `src/tests/visual-reasoning/lie-scenes.test.ts` (noyau et modèles), `groupes-lie-lab.test.tsx` (interface), `e2e/lie.spec.ts` (Chrome, WebGL effectif), scénario `lie` de `scripts/verify-visual.mjs`.

## 6. Ce qui n'est pas couvert par des exercices

Le parcours de jeu couvre les parties I à IV, VI et VII du cours, en partie. Les notions suivantes ne sont présentes **que par les planches de l'atlas** (lecture, question « À vérifier », renvoi au chapitre), sans exercice ni démonstration jouable :

- partie I hors niveaux réguliers, crochet et Frobenius : tenseurs, formes différentielles, orientation, Stokes, métriques, connexions, courbure, espaces projectifs et grassmanniennes ;
- partie III hors exponentielle, Rodrigues et revêtement : champs invariants, représentations Ad et ad, Baker–Campbell–Hausdorff, SE(2) et SE(3) ;
- partie V (symétries des EDP), partie VIII (apprentissage scientifique) ;
- parties IX à XVII (notions avancées) : cohomologie de de Rham, théorie de Hodge, fibrés et connexions, classes caractéristiques, représentations compactes, racines et poids, réduction symplectique, systèmes intégrables, passage à l'analyse.

Le laboratoire G illustre ; il ne démontre rien. Les démonstrations se jouent dans le moteur de preuve, sur les fiches des résultats 35 à 45.
