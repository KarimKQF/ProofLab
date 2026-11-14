# Relecture mathématique R4 — mondes 6 et 7

Périmètre : `src/content/worlds/w6/t27-spectral-general.ts`, `t28-hille-yosida.ts`, `t29-lumer-phillips.ts`, `src/content/worlds/w7/t30-formes-fermees.ts`, `t31-friedrichs.ts`.

Source de vérité : `source-materials/extraits/polycopie_texte_par_page.txt`.

- Pages PDF 25 à 27 : sections 6.5 à 6.8 et point de vigilance de Hille–Yosida.
- Pages PDF 43 et 44 : exercices 27 à 31.
- Page PDF 24 : résolvante compacte du laplacien de Dirichlet et théorème spectral compact, cités par l'exercice difficile 27.

La relecture s'appuie sur les exports `docs/relecture/27-…` à `31-…`. Je les ai complétés par ce que l'export n'affiche pas : invites des calculs, calculs fermés des variantes, `correctStatement` des tâches de contre-exemple, étapes et rappels de concepts.

## Ce qui a été vérifié

Pour chacun des 5 théorèmes et des 15 exercices :

- **Fiches.** Chaque énoncé est fidèle au polycopié :
  - spectral : $A$ auto-adjoint sur un Hilbert, $f$ borélienne, domaine $D(f(A))$ ;
  - Hille–Yosida : Banach, $A$ fermé et densément défini, cas contractif, avec la mise en garde pour $M>1$ ;
  - Lumer–Phillips : Hilbert, dissipativité et $\mathrm{Im}(\lambda_0I-A)=H$ ;
  - formes fermées : forme symétrique, positive, fermée, densément définie ; $D(A)\subset D(a)=D(A^{1/2})$ ;
  - Friedrichs : $S$ symétrique, densément défini, minoré par $mI$.

  Chaque contre-exemple « Sans elle » a été revérifié. Exemples : $\begin{pmatrix}0&1\\0&0\end{pmatrix}$ ; $-u'$ sur $\{u\in C^1:u(0)=0\}$ dans $C([0,1])$ ; $u'$ sur $H^1_0(]0,1[)$ ; indices de défaut de $i\,d/dx$ sur $]0,+\infty[$.

  Les preuves sont signalées honnêtement : `sourceProof` vaut `admise` pour le spectral général, `idee` pour Hille–Yosida, les formes fermées et Friedrichs, `complete` pour Lumer–Phillips (complète modulo Hille–Yosida).
- **Règles.** J'ai vérifié chaque règle de chaque graphe, variantes à `proof` comprises : les prémisses citées, avec la justification citée, établissent la conclusion. Les prémisses manquantes trouvées sont corrigées ci-dessous.
- **Pièges.** Chaque piège « incorrect » vise une assertion fausse ou une justification fautive. Les contre-exemples ont été recalculés :
  - $\|e^{tA_n}-S(t)\|\ge1-e^{-nt}$ pour $A=\mathrm{diag}(\mathrm ik)$ ;
  - $\|A_nx\|^2\ge n/4$ pour $x_k=1/k$ ;
  - $r^{2/3}\sin(2\theta/3)$ près d'un coin rentrant d'angle $3\pi/2$ ;
  - $Tf=1-\cosh(x-\frac12)/\cosh\frac12$ ;
  - $|v(0)|\le\sqrt2\|v\|_{H^1}$ ;
  - $1\in D(S^*)\setminus D(T^*)$.

  Aucun piège ne refuse un raisonnement juste.
- **Retraits « nécessaires ».** Tous les contre-exemples sont vrais. Exemples : $\|R(1,A)\|\ge\sqrt{10}/2$ pour la matrice $\begin{pmatrix}0&3\\-1/3&0\end{pmatrix}$ ; $A_c=\Delta+2\pi^2I$ ; la forme $\int u'v'-\pi^2\int uv$ ; $u_n(x)=u(x/n)$ sur $\mathbb R$.
- **Calculs.** Toutes les valeurs attendues ont été recalculées à la main : nœuds, calculs fermés, variantes et tâches de contre-exemple.

  | Module | Valeurs vérifiées |
  |---|---|
  | 27, spectral général | $1$, $\frac1{12}$, $\frac12$ ; $(2,10)$ ; $\frac12$ ; rang $2$ ; $\frac45$ ; $\frac13$ ; $\|R(3/2,M)\|=2$ ; $\|R(2,N)\|=1$ |
  | 28, Hille–Yosida | $e^{(\pi/2)A}e_2=(3,0)$ ; $-1$ ; $0$ ; $(-1,-4)$ ; $-9$ ; $\frac1{l+a}$ ; $\frac13$ ; $\frac15$ ; $\frac{na}{n-a}$ ; $-\frac{nk}{n+k}$ ; $\|A_3\|=3$ |
  | 29, Lumer–Phillips | $1$, $\frac1{12}$, $1$ ; $-\frac13$ ; $-\frac{11}{30}$ ; $8$ ; $\alpha=1$ |
  | 30, formes fermées | $8$ ; $\frac{11}{30}$ (deux fois) ; $\frac13$ ; $\frac43$ ; $T(1,1)=(\frac12,\frac14)$ ; $a(u,u)=1$ ; $\lambda_k^2c_k^2=8$ |
  | 31, Friedrichs | $1$ ; $0$ ; $-2$ ; $\frac65$ ; $\frac25$ ; $0$ ; $\pi^2/\pi^2=1$ |

  Chaque réponse est unique lorsque l'invite l'exige.
- **Pages et vocabulaire.** Les pages sont exactes : 25, 26, 26–27, 43, 43–44 et 24. « Dissipatif » n'est employé qu'au sens formel. Existence, unicité et régularité sont distinguées dans les bilans.

## Erreurs trouvées et corrigées

### `src/content/worlds/w6/t27-spectral-general.ts`

1. **`spectral-general.facile`, nœud `exemple` (texte, masque, invite) et solution.** $f(\lambda)=\frac1{1+\lambda}$ n'est pas définie en $\lambda=-1$. Ce n'est donc pas une fonction borélienne de $\mathbb R$ dans $\mathbb C$, comme l'exige l'énoncé. Je l'ai remplacée par $f(\lambda)=\frac1{1+|\lambda|}$. La valeur attendue $\frac12=\sup_n\frac1{1+n}$ est inchangée.
2. **`spectral-general.difficile`, nœud `fin` et dernière étape.** La phrase « la résolvante de $M$ n'est pas compacte » devient « la résolvante $R(2,M)$ n'est pas compacte ». Le graphe n'établit que la non-compacité de $R(2,M)$, au nœud `nc`.
3. **`spectral-general.difficile`, piège sur `m-spec`.** L'explication disait : « Cette description ne vaut que lorsqu'il existe une base de vecteurs propres ». Cette condition nécessaire est fausse. Soit $M\oplus\mathrm{diag}(q_n)$ sur $L^2(]0,1[)\oplus\ell^2$, où $(q_n)$ énumère les rationnels de $[0,1]$. Son spectre $[0,1]$ est l'adhérence de ses valeurs propres, sans base de vecteurs propres. Nouveau texte : « Cette description vaut lorsqu'il existe une base hilbertienne de vecteurs propres, par exemple pour une résolvante compacte, mais pas en général. » Le verdict reste « incorrect ».
4. **`spectral-general.difficile`, conclusion de la solution.** La phrase « Un opérateur à résolvante compacte a un spectre purement discret, réduit à une suite de valeurs propres, et une mesure spectrale portée par ces points » est fausse sans auto-adjonction. Contre-exemple : $u\mapsto u'$ sur $\{u\in H^1(]0,1[):u(0)=0\}$ a une résolvante compacte et un spectre vide. J'ai ajouté « auto-adjoint ».

### `src/content/worlds/w6/t28-hille-yosida.ts`

5. **Fiche, hypothèse « $A$ est fermé », texte « Sans elle ».** Le texte disait « $A$ est automatiquement fermé, comme inverse d'un opérateur borné », alors que $A$ n'est pas un inverse. Nouveau texte : « car pour $\lambda\in\rho(A)$, $\lambda I-A$ est l'inverse d'un opérateur borné partout défini ».
6. **`hille-yosida.intermediaire`, règle `laplace + r-bij + d-R ⟹ r-laplace`.** Deux lacunes :
   - l'hypothèse $a_n\ge0$ (`h-suite`) est nécessaire pour appliquer `laplace` à $a=a_n$ et pour borner $\|T(t)f\|$, mais n'était pas citée ;
   - l'existence de l'intégrale à valeurs dans $H$ n'était pas justifiée.

   J'ai ajouté `h-suite` aux prémisses, et à la justification `j-laplace-coord` : « Comme $a_n\ge0$, $t\mapsto e^{-\lambda t}T(t)f$ est continue (convergence dominée) et de norme au plus $e^{-\lambda t}\|f\|$ : l'intégrale converge dans $H$. »
7. **`hille-yosida.intermediaire`, règle finale.** La conclusion affirme « $A$ est fermé, densément défini » sans citer ces deux nœuds. J'ai ajouté `ferme` et `dense` aux prémisses.

### `src/content/worlds/w6/t29-lumer-phillips.ts`

8. **Fiche, vigilance.** « La minoration $\|(\lambda I-A)u\|\ge\lambda\|u\|$ n'est valable que pour $\lambda>0$ » est faux à la lettre : pour $\lambda\le0$, elle est triviale. Nouveau texte : « … n'apporte d'information que pour $\lambda>0$ : pour $\lambda<0$, la minoration par $|\lambda|\,\|u\|$ peut tomber ($A=-I$, $\lambda=-1$) ». Même nuance dans le rappel du concept `lumer-phillips-dissipativite`.

### `src/content/worlds/w7/t30-formes-fermees.ts`

9. **Fiche, positivité, « Sans elle ».** « $a(u,u)+u^2=-u^2<0$ » devient « … $<0$ pour $u\neq0$ ».
10. **`formes-fermees.facile`, graphe principal et graphe de la variante, règle finale.** La conclusion identifie $\|\cdot\|_a$ à la norme de $H^1$ sans citer `id`. Prémisse ajoutée.
11. **`formes-fermees.intermediaire`, règle finale.** La conclusion affirme que $T$ est symétrique et injectif sans citer `t-sym` ni `t-inj`. Prémisses ajoutées.
12. **`formes-fermees.difficile`, nœud `fin`.** La stricte inclusion « domaine d'opérateur ⊊ domaine de forme » était énoncée pour tout ouvert borné lipschitzien. Le graphe ne l'établit que sur $]0,1[$, au nœud `s-strict` : les hypothèses ne donnent pas $\lambda_k\to\infty$ en général. J'ai ajouté « sur $]0,1[$ ».

### `src/content/worlds/w7/t31-friedrichs.ts`

13. **`friedrichs.intermediaire`, règle `fermee + ipp ⟹ rep`.** La conclusion décrit $D(S_F)$ par $H^1_0$ et $\int u'v'$, c'est-à-dire par $D(\bar q)$ et $\bar q$. Seul le nœud `dom` fournit ces objets. Prémisse `dom` ajoutée.
14. **`friedrichs.difficile`, règle finale.** La conclusion affirme que $A_D$ et $A_N$ sont auto-adjoints positifs, ce que donnent `rep-D` et `rep-N`, qui n'étaient pas cités. Prémisses ajoutées.

### Validation

Après correction :

- `npx vitest run src/tests/content/content.test.ts -t "spectral-general|hille-yosida|lumer-phillips|formes-fermees|friedrichs"` : 30 tests réussis.
- `npx vitest run src/tests/content` : 209 tests réussis.
- `npx tsc --noEmit` : aucune erreur.

## Réserves restantes

Aucune. Les 20 entrées de `src/content/reviews/r4.ts` sont marquées `relu`.

## Remarques non bloquantes

- **`lumer-phillips`, `sourceProof: 'complete'`.** Le polycopié démontre le sens principal et la dissipativité dans la réciproque. La surjectivité dans la réciproque découle implicitement du sens direct de Hille–Yosida, ce que le plan de la fiche explicite.
- **`friedrichs.difficile`, règle vers `fried`.** Pour conclure que $A_N$ n'est pas l'extension de Friedrichs, la règle utilise $D(a_N)=H^1\neq H^1_0$. L'argument est valide, mais il repose sur un point que la justification ne dit pas : le domaine de forme d'un auto-adjoint positif est déterminé, car c'est $D(A^{1/2})$. On pourrait l'écrire.
- **Rappel du concept `formes-fermees-domaine`.** La phrase « une dérivée / deux dérivées » est une lecture heuristique pour les opérateurs d'ordre 2. La solution de l'exercice difficile précise que « deux dérivées » s'entend au sens $\Delta u\in L^2$, et non $H^2$ en général.
- **Variante de `spectral-general.facile`.** Le nœud `fin` écrit $f(A)=E(]1/3,+\infty[)$ sans que $E$ figure dans le graphe de la variante. L'identité vaut par définition du calcul fonctionnel : $\mathbb 1_B(A)=E(B)$.
- **Exports.** Les exports `docs/relecture/27-…` à `31-…` datent d'avant ces corrections. Relancer `npx vite-node scripts/dump-content.ts docs/relecture` pour les mettre à jour.
