# Relecture r1 : résultats 1 à 8

Périmètre : `projection`, `riesz`, `hahn-banach`, `stampacchia` (monde 1), `banach-steinhaus`, `application-ouverte`, `graphe-ferme` (monde 2), `distributions` (monde 3), avec leurs 24 exercices.

Source de vérité : `source-materials/extraits/polycopie_texte_par_page.txt`, pages PDF 5 à 11 (énoncés et démonstrations), 35 et 36 (ateliers 9.1 à 9.3), 38 et 39 (exercices), 23 (définition de l'opérateur fermé, citée par `graphe-ferme`).

Ce qui a été vérifié, pour chaque module :

- la fiche : énoncé, hypothèses, contre-exemples « Sans elle », bilan, `sourceProof`, origine ;
- chaque règle (prémisses, justification, conclusion), chaque piège, chaque retrait ;
- les solutions, variantes et graphes de variante ;
- les valeurs attendues des calculs fermés et des tâches de contre-exemple (unicité de la réponse quand elle est exigée) ;
- les pages citées ;
- hors export : `correctStatement` des contre-exemples, rappels des concepts, `steps` et grilles.

## Erreurs trouvées et corrigées

| Fichier | Identifiant | Erreur | Correction |
|---|---|---|---|
| `w1/t03-hahn-banach.ts` | contre-exemple `ce-hb-ferme`, `correctStatement` | « La séparation stricte d'un point demande un convexe fermé » présente une condition suffisante comme nécessaire. Le disque unité ouvert et $x_0=(2,0)$ se séparent strictement. | La séparation stricte est garantie lorsque $C$ est fermé, ou plus généralement lorsque $x_0$ n'est pas adhérent à $C$. Un point adhérent n'est jamais séparé strictement. |
| `w1/t04-stampacchia.ts` | concept `stampacchia-parametre` (rappel) | « $T_\rho$ n'est contractante que pour $0<\rho<2\alpha/M^2$ » est faux. Avec $V=K=\mathbb R^2$, $B=\mathrm{diag}(1,2)$ et $g=0$, on a $\alpha=1$, $M=2$ et $2\alpha/M^2=1/2$. Pourtant, pour $\rho=0{,}6$, la constante de Lipschitz de $T_\rho=I-\rho B$ vaut $\max(0{,}4\,;0{,}2)<1$. | C'est l'estimation $(1-2\rho\alpha+\rho^2M^2)$ qui ne garantit la contraction que pour $0<\rho<2\alpha/M^2$. |
| `w1/t04-stampacchia.ts` | `stampacchia.intermediaire`, piège `x-rho` | « Le facteur dépasse $1$ dès que $\rho\ge 2\alpha/M^2$ » est faux pour $\rho=2\alpha/M^2$, où le facteur vaut exactement $1$. | « est au moins égal à $1$ dès que $\rho\ge 2\alpha/M^2$ ». |
| `w1/t04-stampacchia.ts` | `stampacchia.intermediaire`, énoncé | « Déterminer pour quels $\rho>0$ $T_\rho$ est contractante » annonce une caractérisation exacte, alors que la démonstration ne fournit qu'une condition suffisante (voir l'exemple $\mathrm{diag}(1,2)$ ci-dessus). | Formulation fidèle au polycopié (« déterminer une condition sur $\rho$ ») : une condition sur $\rho$, ne dépendant que de $M$ et $\alpha$, qui assure la contraction. Cette condition est optimale parmi celles qui ne dépendent que de $(M,\alpha)$ : pour $B=\begin{pmatrix}\alpha&-\beta\\\beta&\alpha\end{pmatrix}$ avec $\alpha^2+\beta^2=M^2$, l'estimation est une égalité. |
| `w1/t04-stampacchia.ts` | `stampacchia.difficile`, solution, point de vigilance | « La solution n'est pas une projection pour $(\cdot,\cdot)_V$ » est littéralement faux, puisque tout $u\in K$ vérifie $u=P_Ku$. | « La solution n'est en général pas la projection sur $K$, pour $(\cdot,\cdot)_V$, du représentant de Riesz de $f$ ». La mention « en général » est nécessaire : pour $f=0$, les deux valent $0$. |
| `w2/t06-application-ouverte.ts` | `application-ouverte.intermediaire`, titre | Le titre était écrit entre apostrophes simples, ce qui supprime les barres obliques inverses : il s'affichait « $\lvert u\rvert le C\lvert Tu\rvert$ ». | Passage en gabarit `t`. |
| `w2/t07-graphe-ferme.ts` | `graphe-ferme.difficile`, titre | Même défaut : affichage de « $H^1_0 subset L^2$ ». | Passage en gabarit `t`. |
| `w2/t07-graphe-ferme.ts` | `graphe-ferme.intermediaire`, justification `j-ao` | Même défaut : affichage de « $pi_X$ ». | Passage en gabarit `t`. |
| `w2/t07-graphe-ferme.ts` | `graphe-ferme.difficile`, solution | « La norme du graphe, qui est ici la norme de $H^1$ » est inexact. Avec la définition de la fiche, $\|u\|_T=\|u\|+\|Au\|$, la norme du graphe est seulement équivalente à celle de $H^1$. | « équivalente ici à la norme de $H^1$ ». |
| `w2/t07-graphe-ferme.ts` | concept `graphe-ferme-ferme-borne` (rappel) | « Un opérateur fermé n'est borné que s'il est défini sur tout un espace de Banach » est faux. Contre-exemple : $A=0$ sur un sous-espace fermé strict $D(A)$ est fermé et borné. | « Un opérateur fermé défini sur tout un espace de Banach, à valeurs dans un espace de Banach, est borné ; de domaine strict, il peut ne pas l'être ». |

Aucune autre erreur n'a été trouvée. Les énoncés et les hypothèses sont conformes aux pages PDF 5 à 11. Les valeurs attendues ont toutes été recalculées et sont exactes. Exemples : $P_Kx=(0,3)$, $\|\ell\|^2=13$, $1/3$, $1/12$, $17/2$, $1/45$, $\sqrt{37}/5$ dans le piège `x-2aM`, $-b/30$ dans `x-sym`, $3n^2$ dans `ce-gf-domaine`, $(-1,2)$ dans `ce-ao-coercivite`, et $2\delta_0$.

## Remarques sans correction

- Fiche `stampacchia`, vigilance : « Le paramètre doit vérifier $0<\rho<2\alpha/M^2$ » se lit comme une exigence de la démonstration. La suite de la phrase est correctement nuancée (« peut ne pas être contractante »).
- `application-ouverte.difficile`, piège `x-L2` : l'inégalité $\|u_f\|_V\le C\|f\|_{L^2}$ est vraie pour $f\in L^2$, puisque $L^2\hookrightarrow V'$. Le distracteur l'affirme cependant pour tout $f\in V'$, où le membre de droite n'a pas de sens. Le verdict `incorrect` est donc justifié.
- Certains retraits « nécessaires » portent sur des propriétés toujours vraies et ont une valeur d'illustration : `h-Vp`, car $V'$ est toujours complet, et `h-chi`, car les fonctions plateau existent. Les contre-exemples associés sont exacts.
- L'export `docs/relecture/` a été régénéré après les corrections.

## Réserves restantes

Aucune. Les 32 entrées de `src/content/reviews/r1.ts` (8 théorèmes et 24 exercices) sont marquées `relu`.

## Validation

- `npx vitest run src/tests/content/content.test.ts -t "<id>"` sur les 8 identifiants : 48 tests réussis, avant et après les corrections.
- `npx vitest run src/tests/content` : 209 tests réussis.
- `npx tsc --noEmit` : aucune erreur.
