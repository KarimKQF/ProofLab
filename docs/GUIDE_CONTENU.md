# Guide de rédaction du contenu

Ce guide s'adresse à quiconque ajoute un résultat au parcours. Le contenu vit dans `src/content/worlds/wN/tNN-<id>.ts`, à raison d'un fichier par résultat, découvert automatiquement.

**Lire d'abord :** `src/content/worlds/w1/t01-projection.ts` (exemple complet), `src/content/schema.ts`, `src/content/catalog.ts`, `src/core/proof-engine/engine.ts`.
**Source principale :** `source-materials/extraits/polycopie_texte_par_page.txt` (marqueurs `<<<PAGE n>>>` : pages du PDF).

## Règles mathématiques

1. Langage strictement mathématique, en français. Aucune analogie physique, aucun vocabulaire physique pour les estimations a priori (interdits : énergie, chaleur, température, diffusion, flux, vitesse, particule, fluide, dissipation, terme source, masse de Dirac). « Dissipatif » n'est admis que comme terme formel de théorie des opérateurs. Dire « second membre », « distribution de Dirac », « estimation a priori », « norme ».
2. Toujours préciser espaces, topologies, hypothèses. Distinguer existence, unicité, régularité, stabilité.
3. Ne jamais confondre convergence faible, forte et faible-*.
4. Ne jamais énoncer un résultat plus général que ce qui est vérifié. Les énoncés de théorèmes reprennent exactement ceux du polycopié, sauf erreur avérée.
5. **Erreur connue du polycopié** : l'estimation a priori de la section 8 (p. PDF 31 et 32), écrite $\sup_t\|u(t)\|^2_H+\int_0^T\|u\|^2_V\le\|u_0\|^2_H+\|f\|^2_{L^2(V')}$, est fausse telle quelle (prendre $f=0$ et $u_0=\varphi_1$). La forme correcte est $\|u(t)\|^2_H+\int_0^t\|u\|^2_V\le\|u_0\|^2_H+\int_0^t\|f\|^2_{V'}$ pour tout $t$, donc $\sup_t\|u\|^2_H+\int_0^T\|u\|^2_V\le 2(\|u_0\|^2_H+\|f\|^2_{L^2(V')})$. Si vous trouvez une autre erreur, ne la reproduisez pas : corrigez, marquez `origin: 'polycopie-corrige'` et consignez-la dans `docs/notes/<monde>.md`.
6. Une démonstration absente du polycopié (il ne donne parfois qu'une « idée de preuve ») se rédige en entier, vérifiée, avec `origin: 'complement'` si l'argument n'en vient pas. Ne jamais inventer de citation ni de numéro de page. `pdfPage` est la page du PDF, relevée dans le fichier texte.
7. Un résultat dont la démonstration dépasse le cadre (théorème spectral général, trace, Fréchet–Kolmogorov…) est signalé `sourceProof: 'admise'` ou `'idee'` : l'exercice travaille alors ce qui est réellement démontrable.

## Structure d'un module

Un fichier exporte par défaut un `TheoremModule` : `theorem`, `definitions`, `concepts`, `counterexamples`, `exercises` (exactement trois, dans l'ordre facile, intermédiaire, difficile). L'identifiant d'un exercice est `<theoremId>.<niveau>`.

Les énoncés suivent les 102 exercices du polycopié (p. PDF 38–44), qu'on peut préciser (ajouter les hypothèses manquantes, rendre l'objet explicite) sans en changer l'objet.

## Concevoir un graphe de preuve

Une preuve est un graphe : **nœud = assertion**, **arête = justification**.

- `hypothese` et `definition` : données disponibles d'emblée. Utiliser `local: true` pour « Soit… », « Supposons par l'absurde… ».
- Autres genres : `egalite`, `inegalite`, `inclusion`, `consequence`, `application-theoreme`, `conclusion`, `contradiction`.
- `rules` : `{ from, to, by }`. Plusieurs règles de même conclusion = plusieurs chemins de preuve acceptés. Une règle sans prémisse est permise pour un fait autonome.
- `purpose: 'demonstration'` : on prouve le résultat ; seuls ses ancêtres du DAG et les outils admis sont invocables. `'application'` : on l'utilise ; le résultat, ses ancêtres et les `prerequisites` de l'exercice sont invocables.
- Une justification qui cite un théorème porte `theorem: '<id>'`, pour le contrôle d'utilisation prématurée.
- `traps` : erreurs réellement caractérisées. `verdict: 'incorrect'` seulement si l'on peut dire pourquoi c'est faux (contre-exemple ou erreur identifiée) ; sinon `'a-justifier'`. Chaque piège pointe un `concept`.
- `distractor: true` : proposition plausible, non dérivable, avec au moins un piège qui explique l'erreur.
- `removable` : hypothèse ou propriété à retirer pour observer ce qui cesse d'être valable, avec un contre-exemple **vérifié** (`necessary: true` exige que le but ne soit plus dérivable). Au moins une par exercice lorsque c'est pertinent.
- `check` et `masked` : valeur à calculer exactement (`rational`, `rational-vector`, `expr-equiv`, `matrix-spd`, `choice`) ; le texte masqué ne doit pas révéler la valeur.
- `unlocks` : réservé aux laboratoires.

Taille raisonnable : 8 à 25 nœuds, 2 à 6 pièges ou distracteurs, au moins une justification séduisante et fausse. La grammaire de preuve doit être **spécifique à l'exercice** : pas de justification générique du type « d'après le cours ».

Un graphe ne doit pas donner la réponse dans l'intitulé d'une justification au point de rendre l'étape mécanique. Ne pas imposer une seule formulation : tout est sélection de jetons, et la réussite ne dépend jamais d'un texte exact.

## Autres champs d'un exercice

- `solution` : démonstration complète (Markdown + LaTeX), `steps` : décomposition.
- `commonErrors` : erreurs fréquentes, chacune liée à un concept.
- `hints` : trois indices distincts et gradués : **Orientation**, **Structure**, **Déblocage**. Aucun ne donne la solution d'emblée.
- `rubric` : utiliser l'aide `rubric({...})`, cinq critères, 100 points.
- `variant` : autre énoncé, autre solution, pour réviser sans mémoriser. **Au moins une variante par théorème doit porter un `proof` complet** (mode Examen).
- `verification` : `FROM_POLY` si la démonstration vient du polycopié, `COMPLEMENT` sinon. Laisser `review: 'machine'` : la relecture indépendante mettra `relecture-ia`.
- `source` : `poly(pdfPage, libellé)` ou `complement(libellé)`.

## Parcours de géométrie de Lie

Les résultats 35 à 45 (`worlds/w9` à `w11`) citent le cours de géométrie de Lie : `source: lie(pdfPage, libellé)`, `verification: FROM_LIE` (ou `COMPLEMENT`), et `doc: 'cours-lie'` dans le catalogue. Pages PDF admises : 21 à 275 (page imprimée = page PDF − 20). Conventions : $[X,Y]=Y'X-X'Y$, $C_t=\Phi^Y_{-t}\circ\Phi^X_{-t}\circ\Phi^Y_t\circ\Phi^X_t$, $\omega=dq\wedge dp$, $\iota_{X_H}\omega=dH$.

**Obligation supplémentaire** : tout contrôle fermé d’un module Lie doit avoir son recalcul indépendant dans `src/tests/content/lie-calculs.test.ts` (table `RECOMPUTED`, clé `exercice#nœud`, `exercice#variant#nœud`, `exercice#variant-closed#i` ou `contre-exemple#ce`) ; sinon le test échoue. Le champ `atlas` du catalogue liste les planches de l’atlas qui relèvent du résultat.

## LaTeX dans les gabarits

Utiliser `t` : `` t`$\|x\|$` ``. Attention, un dollar suivi d'une accolade (`${`) déclenche une interpolation : écrire `$\{u\}$`, ou insérer une espace. Une apostrophe dactylographique `'` est sans risque dans un gabarit. Les textes sans LaTeX peuvent rester entre guillemets simples, avec l'apostrophe typographique `’`.

KaTeX ne connaît pas `\operatorname*` partout ni les macros non standard : le test compile chaque formule. `\mathbb 1` est accepté.

## Vérification (obligatoire avant de terminer)

Depuis la racine du projet, avec Node.js installé (ou `export PATH="$PWD/.tools/node:$PATH"` pour une installation portable locale) :

- `npx vitest run src/tests/content -t "<id-du-theoreme>"` : validation de votre module ;
- `npx tsc --noEmit` : aucune erreur de type.

Le validateur contrôle : conformité au schéma, compilation LaTeX, vocabulaire, cohérence des identifiants, but dérivable, distracteurs non dérivables, hypothèses nécessaires, résultats disponibles, grille à 100 points, indices distincts, auto-validation des calculs fermés. Il ne juge pas la vérité mathématique : c'est à vous de la garantir, étape par étape.
