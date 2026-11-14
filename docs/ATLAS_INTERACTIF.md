# Atlas interactif — conception planche par planche

Objectif (demande du 14 novembre 2026) : reprendre **les mêmes représentations** que les 90 planches de l'Atlas visuel, mais **manipulables**, en 2D ou en 3D, sans perdre le sens pédagogique de l'observation géométrique. Chaque figure interactive :

- reprend les panneaux de la planche (mêmes objets, mêmes couleurs, mêmes titres, sauf vocabulaire physique remplacé) ;
- fait faire le geste que la planche demande de regarder (« Lire le dessin ») ;
- propose 2 ou 3 observations guidées, cochées automatiquement quand l'état de la figure les réalise ;
- affiche l'identité de la planche (LaTeX) et des lectures chiffrées avec leur statut (exact, numérique, illustratif) ;
- n'écrit rien dans la progression du joueur.

Code : `src/atlas-interactif/` (hors de `src/content/`, pour rester hors du bloc chargé au démarrage). Une planche = `planches/pNN.tsx`, chargée à la demande ; les planches 2D n'importent pas Three.js.

Légende des colonnes : **Vue** 2D, 3D ou 2D + 3D ; **Geste** ce que l'on manipule ; **Observer** ce que la figure fait constater.

## I — Variétés différentielles

| N° | Vue | Geste | Observer |
| --- | --- | --- | --- |
| 1 | 2D + 3D | déplacer la tache dans le carré ; curseur « recoller » : carré → cylindre → tore | la tache qui sort par un bord rentre par le bord opposé ; deux paramètres suffisent |
| 2 | 2D + 3D | point sur le cercle (deux arcs U, V) ; point sur la sphère, projection stéréographique depuis N | N n'a pas d'image ; sur le recouvrement, les deux cartes se recollent |
| 3 | 2D | p, v dans la carte de départ ; t → 0 | la sécante (F(p+tv) − F(p))/t tend vers dF_p(v) |
| 4 | 2D + 3D | p sur la sphère, vecteur v ; p sur le cercle | p·v = 0 caractérise T_pS² ; un vecteur incliné sort du plan |
| 5 | 2D + 3D | champ c(θ) le long du cercle | une section de TS¹ ≃ S¹ × ℝ est une courbe du cylindre ; section nulle |
| 6 | 2D | métrique étirée a ; v | df inchangé, grad_g f tourne ; df(v) = g(grad_g f, v) |
| 7 | 2D | p, t ; rotation et descente de V | Φ_{t+s} = Φ_t ∘ Φ_s ; V décroît le long des courbes intégrales |
| 8 | 2D | t ; quatre déplacements ; flèches comparées au même point | écart = t² ∂_y ; (Φ_{−t})_* Y − Y ≈ t [X,Y] |
| 9 | 2D | paramètre t sur la lemniscate, le cercle ; point et fibre de la projection | immersion non injective ; plongement ; fibres d'une submersion |
| 10 | 2D | c, point p sur le niveau ; carte adaptée | dF_p ≠ 0 ; le niveau devient une droite ; c = 0 n'est pas régulier |
| 11 | 2D | v, w ; coefficients de A ; changement de base | (dx⊗dy)(v,w) ≠ (dx⊗dy)(w,v) ; tr(PAP⁻¹) = tr A |
| 12 | 3D | distribution dz ou dz − x dy ; taille de la boucle | relevé fermé (intégrable) ou écart = aire (non intégrable) |
| 13 | 2D | v, w ; cellule polaire (r, dr, dθ) | dx∧dy(v,w) = det(v,w), signe ; aire → r dr dθ |
| 14 | 2D + 3D | point sur le bord du disque ; transport autour du ruban | (n,t) orienté ; la normale revient opposée sur Möbius |
| 15 | 2D | largeur de recouvrement | χ₁ + χ₂ = 1 ; ∫f = Σ∫χᵢf |
| 16 | 2D | finesse du découpage ; forme ω | arêtes intérieures qui s'annulent ; Σ circulations = ∫∂M ω = ∫M dω |
| 17 | 2D | a de la métrique ; v ; deux points du cercle | deux longueurs d'un même vecteur ; arc ≥ corde |
| 18 | 3D | latitude du chemin, transport | sur l'équateur le vecteur garde son angle ; grand cercle plus court que l'arc de latitude |
| 19 | 3D + 2D | angle α du triangle géodésique | angle de retour = α = aire du triangle |
| 20 | 2D | courbure K | J(s) = sin(√K s)/√K, s, sinh ; point conjugué en π/√K |
| 21 | 2D + 3D | p, V, direction de f ; cône | P V = V − (p·V)p ; extremum où ∇f ∥ p ; pas de plan tangent au sommet |
| 22 | 2D + 3D | angle de la droite ; plan et repère | ±u même droite ; tourner le repère dans le plan ne change pas le plan |
| 23 | schéma | cliquer les nœuds | dériver, évaluer, déplacer, intégrer : renvois vers les planches |

## II — Actions de groupes

| N° | Vue | Geste | Observer |
| --- | --- | --- | --- |
| 24 | 2D | angles de g et h ; repère Q | g·(h·x) = (gh)·x ; QᵀAQ change, l'ellipse non |
| 25 | 3D | latitude du point ; rotation autour de z | orbites = cercles, pôles fixes ; G_p ≃ SO(2) |
| 26 | 3D | lacet, tangage, roulis | le roulis change le repère, pas le point Re₃ |
| 27 | 2D | x ; angle ; application f (équivariante ou non) | ‖Rx‖ = ‖x‖ ; f(Rx) = Rf(x) seulement si f équivariante |

## III — Groupes et algèbres de Lie

| N° | Vue | Geste | Observer |
| --- | --- | --- | --- |
| 28 | 2D | n de ℤ/nℤ ; a, b sur S¹ | e^{ia}e^{ib} = e^{i(a+b)} |
| 29 | 2D | Q ∈ O(2), A ∈ SL(2), z ∈ U(1) | angles, aire, module conservés ; XᵀX…, tr X = 0 |
| 30 | 2D + 3D | vecteur tangent en e ; pente sur le tore | pente rationnelle : orbite fermée ; irrationnelle : dense |
| 31 | 2D | élément g de SE(2) | gX et Xg diffèrent ; coïncident si g commute |
| 32 | 2D | s, t | g_s g_t = g_{s+t} |
| 33 | 2D | θ | e^{θJ} − I − θJ = O(θ²) : dexp₀ = Id |
| 34 | 2D | θ sur la droite | θ et θ + 2π donnent la même rotation |
| 35 | 3D | ω, v, θ ; a, b | ω × v tangent à l'orbite ; [â, b̂] = (a×b)^ |
| 36 | 2D | θ de 0 à 4π | bord de la boule traversé ; relevé −1 puis 1 |
| 37 | 2D + 3D | deux poses ; pas de l'hélice | (R,t)(S,a) = (RS, t + Ra) ; mouvement hélicoïdal |
| 38 | 3D | ω, R | R e^{tω̂} R⁻¹ tourne autour de Rω |
| 39 | 3D | a, b(0), t | (b(t) − b(0))/t → a × b(0) |
| 40 | 2D | ε | avancer-tourner ≠ tourner-avancer ; écart ≈ ε²[X,Y] |
| 41 | 2D | θ ; poids k | ρ_k fait k tours |
| 42 | schéma + 2D | g, p, X, t | X_M(p) = d/dt exp(tX)·p en t = 0 |

## IV — Symétries des EDO

| N° | Vue | Geste | Observer |
| --- | --- | --- | --- |
| 43 | 2D | ε ; équation autonome ou non | la translatée reste solution si l'équation est autonome |
| 44 | 2D | u″(0) des deux courbes | même 1-jet, 2-jets différents |
| 45 | 3D + 2D | graphe ; étirement (a, b) | le relevé est tangent aux plans de contact ; p̄ = (b/a)p |
| 46 | 2D | générateur ; point du niveau | X F = 0 sur F = 0 : tangent ; sinon il quitte le niveau |
| 47 | 2D | λ ; C, A | orbites r = u/√x ; réduction p = Cu |

## V — Symétries des EDP

| N° | Vue | Geste | Observer |
| --- | --- | --- | --- |
| 48 | 3D | point (x, t) ; équation | pentes u_x, u_t ; tangence à plusieurs équations |
| 49 | 2D | c, t | u constante le long de x − ct = constante |
| 50 | 2D | t ; changement d'échelle | √t·u en fonction de x/√t : une seule courbe |
| 51 | 2D | ε | grilles transformées ; la transformée galiléenne reste solution |
| 52 | 2D | t | deux demi-profils en sens opposés |
| 53 | 2D | ν | la transition se raidit ; choc à la limite |
| 54 | 2D | générateur ; point du graphe | Q = 0 : l'orbite reste dans le graphe |
| 55 | schéma | étapes sur un exemple | Δ = 0 → X → pr X → test → invariants → réduction |

## VI — Variations et Noether

| N° | Vue | Geste | Observer |
| --- | --- | --- | --- |
| 56 | 2D | champ ; t ; mode k | aire × e^{t div X} ; Δ cos kθ = −k² cos kθ |
| 57 | 2D | a, b | ⋆dx = dy, ⋆dy = −dx ; α ∧ ⋆α = ‖α‖² dx∧dy |
| 58 | 2D | ε ; courbe critique ou non | S(ε) − S(0) parabole de pente nulle en 0 pour la courbe critique |
| 59 | 3D | ε ; u harmonique ou non | D(u + εη) a une dérivée nulle en 0 si u est harmonique |
| 60 | 2D | potentiel radial ou non | J = q × p constant si et seulement si radial |
| 61 | 2D | γ ; translation ε | H constante si γ = 0, décroissante sinon ; le bord casse la translation |
| 62 | 2D | V, W | θ(V) = p dπ(V) ; ω(V,W) = aire orientée |
| 63 | 2D | H ; t | X_H longe les niveaux ; aire de Φ_t(D) conservée |
| 64 | 2D + 3D | translation ; q, p, axe | J = p ; J_ξ = ξ·(q × p) conservé |
| 65 | 2D | p ; lagrangien | tangente de pente p ; H(p) = max_v (pv − L) |
| 66 | 2D | h, N | Euler explicite spirale ; symplectique fermé |

## VIII — Apprentissage scientifique

| N° | Vue | Geste | Observer |
| --- | --- | --- | --- |
| 67 | 2D | y ; λ ; θ | minimiseur pénalisé r* = (r₀ + λ)/(1 + λ) → 1 ; projection ; paramétrage |
| 68 | 2D | g ; F équivariante ou non | les deux trajets du diagramme coïncident ou non |
| 69 | 2D | part non hamiltonienne ε | orbites fermées (ε = 0) ou spirales |
| 70 | 2D | θ ; points de collocation | résidu nul pour θ = π² |
| 71 | 2D | décalage ; fond | fond plat : translation permise ; fond fixe : non |
| 72 | schéma | cliquer | contrainte, symétrie, fonctionnelle : renvois |

## IX à XVII — Notions avancées

| N° | Vue | Geste | Observer |
| --- | --- | --- | --- |
| 73 | 2D | tour du cercle (souris, clavier ou « Faire un tour ») | la primitive relevée gagne 2π par tour : fermée non exacte |
| 74 | 2D + 3D | t de la contraction ; cycles du tore | homotopie vers un point ; ∫ dθ₁, ∫ dθ₂ |
| 75 | 2D | coefficients de f | ⟨Δα, α⟩ = ‖δα‖² ; harmonique ⟺ f constante |
| 76 | 2D | parts exacte, coexacte, harmonique ; position du cycle vertical | circulations de chaque part ; ‖ω‖² = somme des trois carrés (orthogonalité) |
| 77 | 2D | section, transition | π ∘ s = id ; s_j = s_i g_ij |
| 78 | 2D + 3D | taille et position de la boucle | écart de phase = −aire, indépendant de la position |
| 79 | 3D | deux points de S² | deux fibres de Hopf enlacées (enlacement 1) |
| 80 | 2D + 3D | degré k ; parcours de l'équateur | la transition fait k tours (spirale déroulée) |
| 81 | 3D | rayon R ; demi-axes a, b, c | K × aire = 4π pour R et 2R ; ∫K dA = 4π pour l'ellipsoïde |
| 82 | 2D + 3D | n, élément g, cisaillement s ; ellipse initiale | W stable ; W⊥ du produit moyen fixe ; la moyenne est un cercle si n ≥ 3 |
| 83 | 2D | k ; m | (−I) agit par (−1)^m : m pair passe à SO(3) |
| 84 | 2D | m ; E, F | poids m, m−2, …, −m ; E monte de 2, F descend de 2 |
| 85 | 2D + 3D | niveau r ; point réduit ; phase ψ | fibre S¹ au-dessus de chaque point de S² ; la phase ne déplace pas le point réduit |
| 86 | 3D | ‖ν‖, rotation γ, ξ, η | orbite = sphère ; ω_ν = ν·(ξ×η) = aire / ‖ν‖ |
| 87 | 2D + 3D | h₁, h₂, rapport des fréquences, temps | tore invariant ; orbite fermée si rapport rationnel, dense sinon |
| 88 | 2D | I, ε, t | I constant, θ affine en t ; pente −(1 + 2εI) |
| 89 | 2D | point initial (glissé), suivi de l'orbite | libration, séparatrice (H = 1), rotation ; période elliptique |
| 90 | 2D + 3D | finesse ; nœud | fonction chapeau affine par triangle (support de 8 ou 4 triangles) ; erreur d'interpolation en h² |

## État

Au 14 novembre 2026 :

- **90 planches sur 90** ont leur figure interactive (`planches/p01.tsx` à `p90.tsx`) : 31 comportent au moins une vue 3D (Three.js), 59 sont entièrement en 2D (SVG). La planche originale reste disponible dans le second onglet, avec sa réponse masquée ; le choix d'onglet est conservé.
- **Tests** : `src/tests/atlas/planches-interactives.test.tsx` (jsdom) charge chaque planche, vérifie la scène, au moins une vignette, deux observations et un réglage, l'absence de `NaN` et d'`Infinity`, pousse chaque curseur à ses bornes, clique chaque choix et contrôle que la sauvegarde du joueur n'a pas changé. `e2e/atlas-interactif.spec.ts` (Chrome) ouvre les 90 planches, vérifie que chaque toile 3D est dessinée, les onglets et la préférence conservée, un geste qui coche une observation (planche 81) et un tour complet au clavier (planche 73) sans changer de planche.
- **Vérification visuelle** : `node scripts/verify-atlas-interactif.mjs <base> <dossier> [1-90] [--telephone]` ; dernier passage : 90 planches sans erreur sur bureau et 90 sur téléphone, aucun défilement horizontal ; captures examinées par lots.
- **Statut des lectures** : les valeurs données par une formule fermée sont « exactes » ; intégrales numériques, Runge-Kutta, nombre d'enlacement de Gauss, erreurs d'interpolation sont « numériques ».
- **Parties schématiques**, signalées dans la figure elle-même : planche 48 (panneau de droite : deux équations figurées par deux plans d'un espace de jets), planche 71 (profils de Saint-Venant, comme dans l'atlas ; seul le terme de fond est calculé), planche 87 (tore de révolution comme image du niveau commun, qui vit dans ℝ⁴). Les planches 23 et 72 sont d'abord des cartes de notions cliquables (renvois vers les planches) ; la 23 y ajoute un exemple vivant sur le cercle.
- **Vocabulaire** : les titres de vignette reprennent ceux de l'atlas, sauf vocabulaire physique remplacé (planche 87 « Deux niveaux indépendants », planche 88 « Angle déplié : affine en t »).
- **Conventions de code** : légendes en texte mixte via `Caption` (LaTeX entre `$`), étiquettes SVG en Unicode (Φₜ, Tₚ…), sphères avec `Globe`, maillages affines par morceaux avec `TriMesh3`, courbes coupées au cadre avec `ClippedCurve`, animations avec `usePlayer` (interrompues par toute action manuelle), point déplaçable sur une courbe fermée avec `DragOnCurve wrap` (le clavier fait le tour).
