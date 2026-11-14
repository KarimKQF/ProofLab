# Relecture mathématique R3 — mondes 5 et 6

Périmètre : `src/content/worlds/w5/t19-banach-alaoglu.ts`, `t20-extraction-reflexive.ts`, `src/content/worlds/w6/t24-adjoint.ts`, `t25-fredholm.ts`, `t26-spectral-compact.ts`.

Source de vérité : `source-materials/extraits/polycopie_texte_par_page.txt`, pages PDF 20 (section 5.2), 23–25 (sections 6.1, 6.3, 6.4) et 41–43 (exercices 19, 20, 24, 25, 26). Relecture faite sur les exports `docs/relecture/19-…`, `20-…`, `24-…`, `25-…`, `26-…`, complétés par l'extraction des invites de calcul des nœuds, des calculs des variantes, des étapes et des rappels de concepts, que l'export n'affiche pas.

## Ce qui a été vérifié

Pour chacun des 5 théorèmes et des 15 exercices :

- **Fiche.** L'énoncé est fidèle au polycopié et ses hypothèses sont exactes : normé quelconque pour Alaoglu, Banach réflexif, domaine dense, $K$ compact, $K=K^*$, Hilbert séparable. Chaque contre-exemple « Sans elle » est vrai. Le bilan ne dit rien de plus que l'énoncé. `sourceProof: 'idee'` est honnête : le polycopié ne donne qu'une idée de preuve ou une lecture géométrique, et pour l'adjoint la note de vérification le signale.
- **Règles.** Pour chaque règle de chaque graphe (exercices et variantes avec `proof`), les prémisses et la justification suffisent à établir la conclusion. Aucune hypothèse cachée n'a été trouvée.
- **Pièges.** Chaque piège « incorrect » vise une assertion fausse ou un raisonnement fautif, et son contre-exemple a été recalculé. Aucun piège ne refuse un raisonnement juste ; les verdicts « a-justifier » sont justifiés.
- **Retraits.** Tous les contre-exemples des retraits « nécessaires » sont vrais.
- **Calculs.** Toutes les valeurs attendues ont été recalculées à la main : nœuds, calculs fermés, variantes et tâches de contre-exemple. Exemples : $A^{\mathsf T}$ et $A^*v_0=(-1,3,6)$ ; $\langle Au_0,v_0\rangle=5$ ; $S^*x^2=-2$ ; $\dim D(S^*)/D(S)=4$ ; $\det(xI-A)=x^3-81x$ et les vecteurs propres $\frac13(1,2,2)$, $\frac13(2,-2,1)$, $\frac13(2,1,-2)$ ; $u=1-\frac32x$ ; $\mu_2=1/(1+4\pi^2)$ ; $M^{-1}A^{\mathsf T}M$. Chaque réponse est unique lorsque l'invite l'exige.
- **Distinctions.** Faible, fort et faible-* ne sont jamais confondus. Existence, unicité et stabilité sont séparées dans Fredholm. Les numéros de page sont exacts (41, 42, 43 ; section 8.4 en p. 32).

## Erreurs trouvées et corrigées

Aucun énoncé faux n'a été trouvé. Deux manquements à la règle « domaines des opérateurs toujours explicites » ont été corrigés par une précision minimale :

1. `src/content/worlds/w6/t26-spectral-compact.ts`, exercice `spectral-compact.difficile`, énoncé. La réalisation de Dirichlet $A=-\Delta_D$ était nommée sans domaine. Ajout : « de domaine $D(A)=\{u\in V:\Delta u\in L^2(\Omega)\}$ ».
   - *Vérification :* si $u=Tf$, alors $-\Delta u+u=f$ dans $\mathcal D'(\Omega)$, donc $\Delta u\in L^2$.
   - *Réciproque :* si $u\in V$ et $\Delta u\in L^2$, on pose $f=u-\Delta u$. Alors $a(u,v)=\langle f,v\rangle_H$ pour $v\in C^\infty_c(\Omega)$, puis pour $v\in V$ par densité, donc $u=Tf$.
   - Ainsi $T=(I+A)^{-1}$ exactement.
2. `src/content/worlds/w6/t24-adjoint.ts`, tâche de contre-exemple `ce-adjoint-meme-domaine`. L'assertion porte sur un domaine $D(A)\subset H^1(]0,1[)$ quelconque, alors que la tâche supposait $x\in D(A)$ sans choisir le domaine. Ajout : « Prenons $D(A)=\{u\in H^1(]0,1[):u(0)=0\}$, dense dans $L^2(]0,1[)$. » C'est le domaine que cite déjà `correctStatement`. La valeur attendue $1$ et l'explication sont inchangées.

Après correction : `npx vitest run src/tests/content/content.test.ts -t "banach-alaoglu|extraction-reflexive|adjoint|fredholm|spectral-compact"` donne 30 tests réussis, et `npx tsc --noEmit` ne signale aucune erreur.

## Remarques non bloquantes (aucune réserve)

- `extraction-reflexive.difficile`, retrait `h-un`. Le contre-exemple est vrai : dans $L^2(\mathbb R)$, $\mathbb 1_{[n,n+1]}\rightharpoonup 0$ et son carré aussi. Mais la phrase « le phénomène dépend alors de la suite choisie » est d'abord une illustration. Le point précis est le suivant : sur un domaine de mesure finie, le test contre $\mathbb 1$ transforme la convergence faible des carrés en convergence des normes ; sans ce test, ce n'est plus le cas.
- `banach-alaoglu.intermediaire`. Les deux chemins, diagonale et métrisation, nomment tous deux $\Lambda$ la forme limite, et les nœuds `rep` et `fin` sont partagés. Mélanger les chemins reste mathématiquement correct, car `m-extrait` et `h-dual` redonnent `rep` pour la même forme.
- `banach-alaoglu.intermediaire`, piège `x-reflexif`. La forme « $v\mapsto\lim_{x\to0^+}v(x)$ » s'entend comme limite essentielle, définie sur le sous-espace de $L^\infty(]0,1[)$ où elle existe et bornée par $\|v\|_{L^\infty}$. L'argument est correct.
- `banach-alaoglu.difficile`, nœud `b-norme`, et `extraction-reflexive.difficile`, nœud `o-ortho`. Le texte masqué demande $\int\sin^2$, alors que l'invite demande $\frac1\pi\int\sin^2=1$, car $\pi$ n'est pas rationnel. C'est cohérent ; l'invite fait foi.

## Statut consigné

`src/content/reviews/r3.ts` : « relu » pour les 5 théorèmes et les 15 exercices, sans réserve « doute ».
