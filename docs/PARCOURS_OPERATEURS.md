# Parcours opérateurs et théorie spectrale

Accessible par « Opérateurs et spectre » dans la navigation, à l’adresse `/#/operateurs`. Les 12 figures sont également dans l’Atlas visuel ; la recherche de l’atlas porte sur les nouvelles planches et sur celles de Lie.

## Contenu ajouté

13 leçons, chacune avec définitions et résultats, exemple travaillé, démonstration ou plan explicitement délimité, points à distinguer et deux questions à correction immédiate :

1. Opérateurs bornés, norme et différences entre dimension finie et infinie.
2. Domaine, fermeture du graphe et adjoint.
3. Symétrie, auto-adjonction et conditions au bord.
4. Spectre, résolvante, identité de résolvante et estimation hors de la droite réelle.
5. Compacité, approximation par rang fini, alternative de Fredholm.
6. Noyaux de Hilbert–Schmidt, rang fini et exemple de noyau xy.
7. Spectral compact, multiplicité, orthogonalité et modes de Dirichlet.
8. Spectral général, mesures à valeurs projections et représentation multiplicative.
9. Spectre continu de la multiplication par x, preuve complète sur L²(0,1).
10. Calcul fonctionnel borélien et domaines des puissances.
11. Formes fermées, représentation et Friedrichs.
12. Semi-groupes, Hille–Yosida, Lumer–Phillips, générateur diagonal.
13. Problème matriciel Au = λBu avec B définie positive, distinct du théorème spectral général.

Les fiches des résultats existants renvoient au cours accompagné. Les leçons renvoient aux preuves jouables du laboratoire H lorsqu’elles existent, avec indication des preuves partielles. Les nouvelles questions sont des entraînements immédiats : elles ne donnent pas un statut de maîtrise ni une validation formelle de preuve.

## Sources locales consultées

- *Compléments d’analyse fonctionnelle, opérateurs et EDP*, chapitre 6 : PDF 23 (domaines, adjoints, résolvante), 24–25 (Fredholm, compact, spectral général, formes), 26–27 (Friedrichs et génération des semi-groupes).
- *Analyse fonctionnelle et EDP*, chapitres 30 et 31 : PDF 155–158 (compacts, Hilbert–Schmidt et spectral compact), 159–162 (laplacien et décomposition), particulièrement PDF 161 pour les modes sur (0,π).

Les textes et figures ajoutés sont des développements pédagogiques originaux. Les références indiquent les notions auxquelles ils se rattachent ; le second cours n’est pas copié dans le dépôt. Les pages sont les pages des PDF, pas les pages imprimées. Le problème matriciel généralisé est identifié comme complément.

## Portée mathématique

Le polycopié admet la construction générale de la mesure spectrale. La leçon correspondante donne son énoncé précis et un plan de construction avec les résultats admis clairement nommés ; elle ne revendique pas une preuve intégrale. Des preuves complètes sont fournies pour les modèles diagonaux et multiplicatifs, la résolvante non réelle, la dérivée périodique et la réduction matricielle généralisée.

Chaque planche distingue le modèle illustré du résultat infini. En particulier :

- une matrice tronquée ne démontre pas la compacité ; la norme exacte de la queue accompagne la figure ;
- le modèle de multiplication montre un spectre continu sans base propre ;
- une somme partielle ne démontre pas la convergence ; les seuils de sommabilité sont donnés analytiquement ;
- la continuité forte d’un semi-groupe ne signifie pas sa continuité en norme d’opérateur ;
- le changement de géométrie dans Au = λBu exige B définie positive.

Le dictionnaire précise désormais la représentation multiplicative générale, le domaine avec |λₙ|², la masse de μᵤ et la condition t ≥ 0. Parseval est écrit avec les modules au carré pour être valable sur un Hilbert complexe.

## Organisation et vérification

- `src/content/operateurs/` : contrat et 13 leçons.
- `src/pages/OperatorCoursePage.tsx` : cours, questions et liens.
- `src/components/operator-atlas/` : contenu et scènes SVG paramétrées.
- `src/pages/OperatorAtlasPage.tsx` : lecture pédagogique d’une planche.
- `src/tests/content/operateurs.test.ts` : cohérence, sources, portée des preuves, compilation de toutes les formules.
- `src/tests/visual-reasoning/operator-atlas.test.tsx` : recalcul du résidu par quadrature indépendante, seuils de domaines, normes de troncature, navigation, correction et paramètres.

Vérification ciblée : `npm test -- src/tests/content/operateurs.test.ts src/tests/visual-reasoning/operator-atlas.test.tsx`. Vérification globale : `npm test`, puis `npm run build`.
