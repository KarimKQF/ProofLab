# Trouver l’erreur, effacement progressif, révisions des notions, bilan des pièges

Cinq fonctions ajoutées le 16 novembre 2026 :

1. le mode **Trouver l’erreur** : une démonstration complète contient une étape fautive, à désigner et à qualifier ;
2. une **démonstration jouable pour chacun des 45 résultats** dans le laboratoire H ;
3. l’**effacement progressif** dans le laboratoire H : preuve modèle, justifications à retrouver, étapes effacées, page blanche ;
4. la **révision des notions** du dictionnaire, par répétition espacée ;
5. le **bilan des pièges** : où l’on se trompe, de quelle façon, et sur quoi s’entraîner.

## 1. Trouver l’erreur (`/trouver-erreur`)

### Construction (`src/core/error-hunt/hunt.ts`)

On part de la **démonstration de référence** d’un exercice ou de sa variante (`src/core/proof-engine/reference.ts` : la dérivation du but qui compte le moins d’étapes, dans l’ordre de lecture), puis on y introduit **une** erreur, tirée des données relues du contenu :

| Nature | Origine dans le contenu | Construction |
| --- | --- | --- |
| Justification invalide | piège « incorrect » sur une étape de la preuve (`traps` avec `by`) | la justification fautive remplace la bonne |
| Affirmation fausse | distracteur et son piège | l’affirmation est insérée après ce dont elle paraît découler (`premises` du piège, `after` du distracteur, sinon l’étape la plus ressemblante, au-dessus d’un seuil), et la conclusion la cite |
| Hypothèse non vérifiée | retrait déclaré nécessaire d’une propriété établie (`removable`, `necessary`) | la propriété n’est jamais établie : ses étapes disparaissent, et celles qui l’utilisaient la perdent de leurs prémisses |
| Résultat indisponible (circularité) | justification qui invoque un résultat indisponible (`theorem` hors de `allowedTheorems`) | elle remplace la justification de l’étape visée par son piège, sinon de l’étape de théorème correspondante, sinon de la conclusion |

**Garantie, vérifiée par le moteur à la construction et par les tests** : toutes les lignes sont validées par une règle du contenu, sauf exactement les lignes désignées comme fautives. Une démonstration fautive qui ne la respecte pas est écartée. Sur le contenu actuel : 577 démonstrations fautives possibles ; 350 sont jouées (au plus une de chaque nature par exercice et par variante), sur les 45 résultats et les quatre natures.

### Jeu (`src/pages/ErrorHuntPage.tsx`)

- Liste par monde et par résultat ; les résultats verrouillés sur la carte le sont aussi ici. Chaque démonstration fautive contient la preuve complète d’un exercice : mieux vaut l’avoir résolu d’abord.
- Le joueur désigne l’étape, puis la nature de l’erreur. Une étape correcte désignée est refusée (« elle découle de ce qu’elle cite par une règle explicite ») ; une bonne étape avec une mauvaise nature est signalée comme telle.
- Après réussite, ou « Montrer l’erreur » : explication et contre-exemple du contenu, et la correction (justification qui convient, propriété à établir d’abord).
- Enregistrement : `errorHunt[id]` (tentatives, trouvée, du premier coup). Une erreur **manquée** (étape correcte désignée, ou réponse affichée) est comptée contre son concept et journalisée, sans toucher à la progression des exercices.

## 2. Une démonstration jouable par résultat

Quinze résultats n’avaient que des exercices d’application. Chacun a désormais une démonstration (`src/content/demonstrations/dNN-<id>.ts`, schéma `DemonstrationSchema`), découverte automatiquement :

| Résultat | Démonstration | Portée |
| --- | --- | --- |
| 1. Projection | existence par suite minimisante, unicité par le parallélogramme | partie (la caractérisation et la non-expansivité sont dans les exercices) |
| 2. Riesz | noyau fermé, projection, identification, unicité, norme | complète |
| 3. Hahn–Banach | une direction de plus, puis lemme de Zorn | complète |
| 8. Dérivation distributionnelle | linéarité, continuité, cohérence avec la dérivée classique | complète |
| 20. Extraction faible | Banach–Alaoglu dans le bidual, transport par J, Eberlein–Šmulian | complète |
| 21. Aubin–Lions | lemme d’Ehrling, par l’absurde | étape clé |
| 22. Lions–Magenes | identité et estimation pour une fonction régulière | étape clé (le passage par régularisation est décrit) |
| 24. Adjoint | bien défini, linéaire, fermé ; A ⊂ A* si A est symétrique | complète |
| 27. Théorème spectral général | le spectre d’un auto-adjoint est réel, borne de la résolvante | étape (le théorème reste admis, comme dans le polycopié) |
| 35. Niveau régulier | fonctions implicites, carte adaptée, espace tangent | complète |
| 39. Algèbre de Lie matricielle | sous-espace stable par le commutateur (dérivation de la conjugaison) | partie (so(n), sl(n), u(n) dans les exercices) |
| 40. Exponentielle | cas matriciel : sous-groupe à un paramètre, det e^A = e^{tr A} | partie |
| 43. Symétries d’EDO | coordonnées canoniques, réduction à une quadrature (premier ordre) | partie |
| 44. Noether | règle de chaîne, Leibniz, Euler–Lagrange | complète |
| 45. Flot hamiltonien | équations de Hamilton, crochet de Poisson, conservation de H, préservation de ω | partie (les schémas symplectiques sont dans les exercices) |

Statut affiché : « Complément, absent du document source » quand la démonstration détaille un plan ou une idée, « Démonstration du polycopié » ou « du cours » quand elle suit la preuve du document. Tout est « testé automatiquement » (structure, pièges, hypothèses nécessaires), rien n’est relu par un humain ni vérifié formellement.

`src/tests/content/demonstrations.test.ts` applique la validation des exercices (but dérivable, distracteurs non dérivables et expliqués, hypothèses retirables réellement nécessaires, aucun résultat indisponible, LaTeX, vocabulaire), exige un piège de circularité pour toute justification qui invoque le résultat lui-même, et vérifie que **les 45 résultats** ont au moins une démonstration jouable.

## 3. Effacement progressif (laboratoire H)

Quatre étapes, au-dessus de l’atelier (`FADING_LEVELS` dans `src/components/proof/blocks/model.ts`) :

1. **Lire la preuve modèle** : la démonstration de référence, en blocs figés et rédigée, avec une lecture guidée.
2. **Retrouver les justifications** : affirmations et prémisses en place, chaque « car » à choisir puis vérifier.
3. **Reconstruire les étapes effacées** : une étape sur deux est effacée, en partant de la fin (la conclusion reste) ; son texte est masqué partout (repère seul, guide compris) tant qu’elle n’est pas reconstruite. Choisir une autre affirmation valide dans un trou est signalé.
4. **Page blanche** : l’atelier habituel, avec son brouillon.

Une démonstration jamais ouverte commence à l’étape 1 ; une page blanche déjà commencée reprend où elle en était. L’étape courante et les étapes réussies sont conservées dans ce navigateur (`prooflab:effacement:<démonstration>`). Comme tout le laboratoire, rien n’entre dans la progression.

## 4. Révision des notions

- Une notion entre dans les révisions (`notions` de la sauvegarde) quand on la **consulte** dans un énoncé (bulle de définition ; première révision le lendemain), quand une **erreur** s’y rattache (concept d’erreur → notions, `src/content/dictionnaire/concepts-notions.ts` ; révision aussitôt), ou **à la main** depuis sa fiche.
- Page Révisions : « Notions à revoir », puis une carte à la fois. La question varie d’une révision à l’autre selon la fiche : définition (ou énoncé du résultat), contre-exemple, méthode (« comment le montrer »), piège, exemple ; une notion liée à une erreur commence par son piège.
- On répond de mémoire, on compare à la fiche, on se note (À revoir, Difficile, Bien, Facile) : qualité SM-2 1, 3, 4, 5. On ne peut pas vérifier automatiquement une définition restituée : la note est déclarée par le joueur.
- Ordre : les notions liées au plus d’erreurs d’abord, puis les plus en retard ; une pause décale aussi ces échéances.

## 5. Bilan des pièges (`/pieges`, depuis le tableau de bord et les révisions)

- Sources : les compteurs par concept (depuis le début) et le **journal** des erreurs (`errorLog`, 500 dernières) : nature, exercice, étape, origine (preuve, Trouver l’erreur, contre-exemple). Le journal commence le 16 novembre 2026 ; les erreurs antérieures ne sont comptées que par concept, et la page le dit.
- Par concept, les plus fréquents récemment (14 jours) d’abord : le rappel, les pièges précis rencontrés (message du contenu), les fiches à relire (avec « Ajouter à mes révisions »), et pour s’entraîner des exercices accessibles qui travaillent ce concept (non résolus d’abord) et des démonstrations fautives de même concept.
- Par nature d’erreur : affirmation fausse, justification invalide, hypothèse non vérifiée, résultat indisponible ou circularité, contre-exemple manqué.

## Sauvegarde

Trois champs nouveaux, `errorHunt`, `errorLog`, `notions`, avec des valeurs par défaut : une sauvegarde ou un export antérieurs restent lisibles (test dans `src/tests/progression-notions.test.ts`).

## Vérification

- Tests unitaires : `src/tests/proof/trouver-erreur.test.tsx`, `src/tests/proof/effacement.test.tsx`, `src/tests/progression-notions.test.ts`, `src/tests/content/demonstrations.test.ts`.
- Dans Chrome : `e2e/erreurs-revisions.spec.ts` (Trouver l’erreur et bilan, révision d’une notion, effacement progressif jusqu’à la reconstruction, démonstration d’un résultat depuis sa fiche).
