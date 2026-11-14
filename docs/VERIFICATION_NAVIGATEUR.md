# Vérification en navigateur réel — Visual Reasoning Engine 2.0

Date : 14 novembre 2026. Navigateur : Chrome 157 (sans interface, piloté par Playwright), WebGL sur le GPU de la machine (ANGLE / Direct3D 11). Serveur de développement Vite.

## Comment rejouer

```bash
export PATH="$PWD/.tools/node:$PATH"
npm run dev -- --port 4175 --strictPort --host 127.0.0.1      # dans un premier terminal
node scripts/verify-visual.mjs http://127.0.0.1:4175 captures-visuel           # tous les scénarios
node scripts/verify-visual.mjs http://127.0.0.1:4175 captures-visuel riesz     # un seul scénario
node scripts/verify-visual.mjs http://127.0.0.1:4175 captures-visuel lie atlas # laboratoire G et atlas
node scripts/verify-atlas-interactif.mjs http://127.0.0.1:4175 captures-atlas 1-90             # les 90 figures interactives
node scripts/verify-atlas-interactif.mjs http://127.0.0.1:4175 captures-atlas 1-90 --telephone # idem sur 390 × 844
npm run test:e2e                                                # suite Playwright complète (33 tests)
```

Sous Git Bash, préfixer par `MSYS_NO_PATHCONV=1` et donner un chemin de sortie Windows (`C:/…`) : sinon les routes et chemins commençant par `/` sont réécrits.

## Ce que le script vérifie réellement

Chaque scénario manipule l'interface (clavier, pointeur, curseurs, boutons, vues), lit des attributs posés par la scène et échoue au moindre écart. Le rendu WebGL est contrôlé en copiant la toile dans un canevas 2D et en comptant les couleurs distinctes échantillonnées (une toile vide n'en a qu'une).

| Laboratoire | Contrôles |
| --- | --- |
| A — Projection | projeté absent sans preuve ; x déplacé au clavier et au pointeur ; exploration libre : projeté et produit scalaire affichés, existence toujours « illustrative » ; boule de ℝ³ rendue en WebGL, sans alternative 2D ; caméra au clavier ; coupe plane ; plan de ℝ³ rendu, égalité ⟨x − PₖX, z − PₖX⟩ = 0 au statut exact ; démonstration : étape 4 verrouillée en mode Preuve, avertissement « Illustration disponible — preuve non encore établie » en Exploration, retour à l'étape précédente ; échelle des dimensions jusqu'à l'énoncé dans H ; aucune erreur de console. |
| B — Riesz / Lax–Milgram | Riesz établi après saisie exacte de det G et continuité de ℓ ; point de tangence affiché ; ℓ(v) = ⟨v, w⟩_G après déplacement de v ; forme quadratique indéfinie reconnue ; ellipsoïde et plans de niveau rendus en WebGL ; aucune erreur. |
| C — Modes de convergence | cascade 3D rendue ; justification « machine à écrire : pas de convergence presque partout » ; animation en n ; aucune erreur. |
| D — Aubin–Lions | conclusion garantie pour une famille amortie ; surface uₙ(t, x) rendue ; borne temporelle retirée : contre-exemple « conclusion fausse » et exemple « vraie mais non garantie » ; aucune erreur. |
| E — Galerkin 2D | surface uₙ(t, x, y) rendue ; statut « exploration, non démontrée » ; aucune erreur. |
| F — Sobolev et traces | surface rendue ; trace inchangée après ajout de t·u₀ ∈ H¹₀ ; aucune erreur. |
| G — Groupes de Lie | C_{1/2}(1,2) = (1 ; 2,25) affiché ; p déplacé au clavier, lecture mise à jour ; Rodrigues rendu en WebGL ; revêtement : relevé en −1 après un tour, en 1 après deux (y compris en interrompant l'animation) ; sphère rendue en WebGL ; λ₁ = λ₂ : orbite de dimension 0 ; thèmes sombre et clair sans erreur. |
| Atlas visuel | 90 planches dans la grille ; figure interactive affichée par défaut ; onglet « Planche originale » : image pleine servie (1684 px), réponse masquée puis révélée ; fiche de résultat avec ses planches ; carte avec le parcours Lie ; téléphone 390 × 844 sans défilement horizontal (figure et planche) ; aucune erreur. |
| Atlas interactif (script dédié) | pour chacune des 90 planches : figure affichée sans repli, aucune erreur de console ni avertissement NaN / Three.js / WebGL, chaque toile 3D réellement dessinée (plus de deux couleurs), premier curseur déplacé et animation lancée, captures avant / après, aucun défilement horizontal ; sur bureau (1440 × 1000) et sur téléphone (390 × 844). |

Résultat du dernier passage (14 novembre 2026, après les figures interactives de l'atlas) : 51 contrôles, tous réussis (code de sortie 0) ; aucune erreur de console, aucune ressource en échec. Atlas interactif : 90 planches sur 90 sans erreur sur bureau et 90 sur 90 sur téléphone (deux planches interrompues lors d'un premier passage, pendant une compilation lancée en parallèle, ont été repassées seules avec succès). Suite Playwright : 33 tests réussis, dont 11 pour l'atlas interactif (`e2e/atlas-interactif.spec.ts`).

## Captures examinées

Les captures produites (bureau 1440 × 900 en thème sombre ; bureau et tablette 834 × 1112 en thème clair) ont été regardées une à une. Défauts trouvés et corrigés pendant la vérification :

- repère non isotrope dans le laboratoire A (et B) : un projeté sur le disque n'était pas dessiné sur le cercle — hauteur des figures portée à 480 px ;
- second minimiseur hypothétique hors du cadre à l'étape « Unicité » — corde limitée ;
- formules larges qui débordaient dans une colonne étroite — défilement horizontal ;
- figures côte à côte illisibles dans une vue étroite — requêtes de conteneur ;
- quadrillage trop dense des plans 3D — contour simple ;
- une note affichait « P_Kx » en texte brut — rendu LaTeX.

Parcours Lie, atlas et laboratoire G (captures du 14 novembre 2026, sombre et clair, bureau et téléphone) :

- revêtement : « Aller au bout » pendant l'animation était écrasé par l'image suivante de l'animation — toute action manuelle interrompt désormais l'animation (test e2e ajouté) ;
- commutateur : chemin trop petit dans un domaine trop large, flèches des deux champs superposées — domaines resserrés, grilles de flèches décalées, tracés coupés au cadre ;
- intégration symplectique : trajectoire d'Euler explicite dessinée hors du graphique, colonnes du tableau collées — courbes coupées au cadre, tableau aéré ; l'aire mesurée pour le flot exact du pendule (0,998 avec 64 points) venait du contour polygonal : 128 points, et la lecture l'explique ;
- orbites : hyperboloïde trop haut, conjugués peu visibles ; conjugués du bloc de Jordan sur une seule nappe (P = exp(ξ) est de déterminant positif) — hauteur réduite, points agrandis, P de déterminant des deux signes ;
- titre de vue « Trace de e^{sA} » et étiquette « G_x·y » en texte brut, « $ » parasite dans une légende — corrigés ;
- carte : mondes IX à XI numérotés « 9, 10, 11 » — conversion en chiffres romains générale ;
- atlas sur téléphone : libellé « Réponse masquée » plus grand que son cache — libellé masqué sur petit écran.

## Ce qui n'a pas été vérifié

- Rendu WebGL logiciel (SwiftShader) : non testé (la machine a un GPU) ; l'alternative sans WebGL est testée sous jsdom (tests unitaires).
- Navigateurs mobiles réels, lecteurs d'écran réels : non testés.
