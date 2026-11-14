# Relecture R2 : modules 9 et 11 à 16

Relecture mathématique indépendante, terminée le 13 novembre 2026.

- **Périmètre.** `src/content/worlds/w3/` : `t09-poincare.ts`, `t11-lax-milgram.ts`, `t12-trace.ts`, `t13-rellich.ts`, `t14-regularite-elliptique.ts`. `src/content/worlds/w4/` : `t15-plancherel.ts`, `t16-gagliardo.ts`.
- **Sources.** Polycopié (`source-materials/extraits/polycopie_texte_par_page.txt`), p. PDF 12 à 19 et 38 à 41. Les p. PDF 7 et 8 (Stampacchia) ont servi à contrôler le second chemin de preuve de Lax–Milgram.
- **Supports relus.** Les exports `docs/relecture/*.md`, régénérés après correction. Les champs absents de l'export ont été relus directement dans les sources : `steps`, `masked`, `correctStatement`, calculs fermés des variantes, choix multiples, concepts propres aux modules.

## Méthode

Pour chaque module, j'ai vérifié les points suivants :

- **Fiche.** Fidélité de l'énoncé au polycopié, hypothèses, contre-exemples « Sans elle », bilan, valeur de `sourceProof`.
- **Règles.** Pour chaque règle, les prémisses citées et la justification suffisent-elles ?
- **Pièges et retraits.** Chaque piège et chaque retrait a été contrôlé, contre-exemple compris.
- **Solutions et variantes.** Relues en entier.
- **Valeurs attendues.** Toutes recalculées à la main.

## Erreurs trouvées et corrigées

| # | Fichier | Identifiant | Problème | Correction |
|---|---------|-------------|----------|------------|
| 1 | `t09-poincare.ts` | `poincare.difficile`, règle `lm` + `d-a` + `d-V` ⟹ `sol` (justification `j-faible`) | La justification invoque la continuité de $L(v)=\int_\Omega fv$ sur $V$. Cette continuité repose sur $f\in L^2$, établie au nœud `cont`, qui n'était pas cité : c'était une hypothèse cachée. | Prémisse `cont` ajoutée. |
| 2 | `t13-rellich.ts` | Fiche `rellich`, hypothèse « $\Omega$ est borné » (`whenRemoved`) | Le contre-exemple des translatées $\varphi(x-2n\rho e_1)$ ne disait pas que $\operatorname{supp}\varphi\subset B(0,\rho)$. Sans cette condition, les supports peuvent se rencontrer et l'égalité $\|u_n-u_m\|^2_{L^2}=2\|\varphi\|^2_{L^2}$ est fausse. | Condition de support ajoutée. |
| 3 | `t14-regularite-elliptique.ts` | Fiche `regularite-elliptique`, hypothèse « $\Omega$ borné de classe $C^{1,1}$ » (`whenRemoved`) | Ni $\chi$ ni le rayon du secteur n'étaient définis. Avec un $\chi$ quelconque (par exemple $\chi\equiv 1$), $u\notin H^1_0$. | Précisé : secteur $\{0<r<1,\ 0<\theta<\omega\}$, et $\chi\in C^\infty([0,1])$ égale à $1$ près de $0$ et à $0$ près de $1$. |
| 4 | `t15-plancherel.ts` | `plancherel.difficile`, solution (« Estimations ») | Le calcul fermé annonce la *meilleure* constante $\frac12$ dans $\|\nabla u\|_{L^2}\le c\|f\|_{L^2}$. La solution ne prouvait que la majoration, pas l'optimalité. | Preuve ajoutée : on prend $\hat f=\mathbb 1_{\{1-\varepsilon<\vert\xi\vert<1+\varepsilon\}}$ et l'on fait tendre $\varepsilon$ vers $0$. |
| 5 | `t15-plancherel.ts` | `plancherel.difficile`, variante (solution) | L'optimalité de $\lambda^{-1}$ (calcul fermé : $\frac14$ pour $\lambda=4$) était seulement justifiée par « maximum du multiplicateur, atteint en $\xi=0$ ». Or un point est de mesure nulle : cela ne suffit pas. | Preuve ajoutée : on prend $\hat f=\mathbb 1_{\{\vert\xi\vert<\varepsilon\}}$ et l'on fait tendre $\varepsilon$ vers $0$. |
| 6 | `t15-plancherel.ts` | `plancherel.difficile`, `steps` (étape 1) | Coquille mathématique : « $\widehat{\partial_jv}=i\xi_jv$ ». | Remplacée par « $\widehat{\partial_jv}=i\xi_j\hat v$ ». |

Les sept énoncés de théorème sont exacts et fidèles au polycopié :

- Poincaré, p. 12 ;
- Lax–Milgram, p. 13 ;
- trace, p. 14 ;
- Rellich–Kondrachov et régularité $H^2$, p. 15 ;
- Plancherel, p. 17 ;
- Gagliardo, p. 18 et 19.

Les statuts `sourceProof` sont honnêtes. Ils valent `complete` pour Poincaré, Lax–Milgram et Gagliardo, et `idee` pour la trace, Rellich, la régularité et Plancherel. Les numéros de page des exercices sont exacts : exercice 9 en p. 39, exercices 11 à 15 en p. 40, exercice 16 en p. 41.

## Valeurs recalculées (toutes exactes)

- **Poincaré.**
  - $\int_0^1x\,dx=\frac12$ et $\int_0^1\min(x,1-x)\,dx=\frac14$ ;
  - quotient $qn^2$ pour les dilatées ;
  - $K=1+C^2$ et $\alpha=\frac1{1+C^2}$ ;
  - $u=\frac{x(1-x)}2$ et $\|u'\|^2_{L^2}=\frac1{12}$ ;
  - $\kappa(L)=L^2$ ;
  - contre-exemple $4\sin(x/2)$ sur $]0,2\pi[$, qui donne $\|u'\|_{L^2}=2\|f\|_{L^2}$.
- **Lax–Milgram.**
  - $a(x,x^2)=\frac54$ ;
  - $(M,\alpha)=(1,1)$ ;
  - $a(x,x)=\frac53$ pour la variante ;
  - $\frac1{12}$ ;
  - $u=(\frac12,-\frac12)$ ;
  - $q^2=1-\frac{\alpha^2}{M^2}$ ;
  - $\|u'\|^2_{L^2}=\frac{16}3$ sur $]0,4[$ ;
  - $\|\nabla v_n\|^2_{L^2}=\frac{2\pi}{\log n}$.
- **Trace.**
  - $\frac19$ et $S_4=\frac{25}{12}$ ;
  - $(1,2)$, $(1,-1)$ et $(0,1)$ ;
  - $\frac{11}{30}$ ;
  - $u(\frac12)=\frac94$ et $u(\frac14)=\frac54$ ;
  - $\int_{B(0,1/2)}|\nabla\log\log(1/|x|)|^2\,dx=\frac{2\pi}{\log2}$.
- **Rellich–Kondrachov.**
  - $\frac43$ et $1$ ;
  - $\|e_n-e_m\|^2=2$ ;
  - $\|\sin(n\pi x)-\sin(m\pi x)\|^2_{L^2}=1$.
- **Régularité elliptique.**
  - $\lambda=\frac23$, et $\lambda=2$ pour $\omega=\frac\pi2$ ;
  - saut $2$ ;
  - $\frac{131}{30}$ et $\frac13$ ;
  - $|D^2S|^2=2\lambda^2(1-\lambda)^2r^{2\lambda-4}$, vérifié par $S=\operatorname{Im}z^\lambda$.
- **Plancherel.**
  - $4$, $a=1$ et quotient $2$ ;
  - multiplicateurs $i\xi$ et $-\xi^2$, symbole $1+r^2$ ;
  - $\frac12$ pour la gaussienne ;
  - $\sup_\xi\frac{|\xi|}{1+|\xi|^2}=\frac12$ et $\lambda^{-1}=\frac14$ ;
  - $\hat u=\sqrt{\pi/2}\,e^{-|\xi|}$ pour $u=(1+x^2)^{-1}$ ;
  - $u=\frac12e^{-|x|}$ pour $f=\delta_0$.
- **Gagliardo.**
  - $d+2s=2$ ;
  - $[\mathbb 1_{]0,1[}]^2_{H^s}=\frac{2}{s(1-2s)}$, qui vaut $16$ pour $s=\frac14$ ;
  - $\beta=d-2s=0$ ;
  - $C_{1,1/2}=2\pi$ ;
  - exposant $2s$ et valeurs critiques $1$ et $0$ ;
  - contre-exemple $\sqrt2\neq\frac4\pi$.

## Points examinés et maintenus (non bloquants)

- **`poincare.facile`, piège sur `cs`** (« Cauchy–Schwarz donne $|\int_0^xf|^2\le\int_0^x|f|^2$ »). Sur $[0,1]$, cette inégalité est vraie, puisque $x\le1$. Mais elle n'établit pas le nœud `cs`, qui contient le facteur $x$, et elle est fausse comme énoncé général (contre-exemple sur $[0,2]$). Le verdict « incorrect » est justifié.
- **`lax-milgram.difficile`, variante, retrait `h-rho` (« nécessaire »).** Le contre-exemple est exact : pour $\rho=2$, $T$ n'est plus une contraction stricte. En revanche, la conclusion « $Bu=g$ a une unique solution » reste vraie, puisqu'on peut choisir un autre $\rho$. « Nécessaire » s'entend ici au sens du guide : le but n'est plus dérivable dans le graphe.
- **`rellich.difficile`, calcul fermé.** La fonction $\varphi=(1-|x|)^+$ n'est pas dans $C^\infty_c$, et son support n'est pas inclus dans la boule ouverte $B(0,1)$. Mais les supports des translatées ne se rencontrent qu'en un point, donc la valeur $\frac43$ est exacte. L'énoncé précise d'ailleurs que $\varphi\in H^1(\mathbb R)$.
- **`trace.difficile`, distracteur `x-G-H2`.** Un relèvement particulier, le prolongement harmonique, vérifie $\Delta G=0$. Le distracteur porte toutefois sur le relèvement générique $G=Rg$ ; il reste non dérivable, et l'explication dit bien « en général ».
- **Définitions de notation non citées en prémisse.** Quelques règles ne citent pas la définition d'une notation : par exemple $\ell(v)=\int fv$ (`d-a`) pour `eq3` dans `lax-milgram.intermediaire`. Ce sont des notations, non des hypothèses mathématiques ; je n'ai rien modifié.

## Réserves restantes

Aucune. Les 28 entrées du périmètre (7 théorèmes, 21 exercices) sont marquées `relu` dans `src/content/reviews/r2.ts`.

## Contrôles

- `npx vitest run src/tests/content/content.test.ts -t "poincare|lax-milgram|trace|rellich|regularite-elliptique|plancherel|gagliardo"` : 48 tests réussis.
- `npx tsc --noEmit` : aucune erreur.
