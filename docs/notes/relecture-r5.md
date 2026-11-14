# Relecture mathématique R5

## Périmètre et sources

Sept modules relus :

- `src/content/worlds/w3/t10-poincare-wirtinger.ts` ;
- `src/content/worlds/w4/t17-dualite-interpolation.ts` et `t18-injections-fractionnaires.ts` ;
- `src/content/worlds/w5/t21-aubin-lions.ts`, `t22-lions-magenes.ts` et `t23-gronwall.ts` ;
- `src/content/worlds/w8/t32-browder-minty.ts`.

Les modules t18 et t23 ont été ajoutés en cours de relecture.

Source de vérité : `source-materials/extraits/polycopie_texte_par_page.txt`, pages PDF 12 à 15, 18 et 19, 20 à 22, 28 à 33 (sections 7.1 à 7.4 et 8.1 à 8.7) et 38 à 44 (exercices).

La relecture part des exports `docs/relecture/10-…`, `17-…`, `18-…`, `21-…`, `22-…`, `23-…` et `32-…`. J'y ai ajouté ce que l'export n'affiche pas :

- les invites des calculs fermés ;
- les calculs fermés des variantes ;
- les `correctStatement` des tâches de contre-exemple ;
- les étapes (`steps`) et les rappels de concepts.

## Ce qui a été vérifié

J'ai vérifié les 7 théorèmes et les 21 exercices, y compris les graphes de variantes.

- **Fiches.** Chaque énoncé reprend celui du polycopié, et chaque contre-exemple « Sans elle » a été recalculé. En voici quelques-uns :
  - le peigne de $\mathbb R^2$ : $\|\nabla u_k\|^2=\delta_k/\ell_k^2=2^{4-2k}$ ;
  - le contre-exemple de Kakutani dans $\ell^2$ ;
  - $\min(nt,1)\,v$ pour $p=\infty$, $q=1$ ;
  - $\hat u=\mathbb 1_{]0,1[}$, avec $\frac{28}{15}>\frac{16}9$ ;
  - $\hat u=\frac1{(1+|\xi|)\log(e+|\xi|)}$.

  Les valeurs de `sourceProof` sont honnêtes :
  - `complete` pour Poincaré–Wirtinger, Grönwall et Browder–Minty ;
  - `idee` pour la dualité et l'interpolation, les injections fractionnaires, Aubin–Lions et Lions–Magenes.
- **Règles.** Pour chaque règle, j'ai vérifié que les prémisses citées et la justification suffisent à établir la conclusion. Dans quelques règles de « réunion », une prémisse n'est pas citée, mais c'est un ancêtre déjà établi : la chaîne logique est complète, et je n'ai rien modifié. Les cas concernés :
  - t10 facile, `norme-v` et `minor` ;
  - t17 difficile, `fin` ;
  - t21 difficile, `fin`.

  Une seule hypothèse réellement manquante a été trouvée (t23, ci-dessous).
- **Pièges, retraits et tâches.** Les contre-exemples ont été recalculés. Pour une assertion posée dans le contexte d'un exercice, j'ai exigé un contre-exemple qui vérifie les hypothèses de ce contexte. Les valeurs attendues et l'unicité des réponses des tâches de contre-exemple ont été contrôlées.
- **Calculs.** Toutes les valeurs attendues sont exactes. En voici quelques-unes :
  - $\frac1{12}$, $\frac{128}{45}$ et $\frac4{15}$ ;
  - $\frac{96}{35}$ et $-\frac32$ ;
  - $I_1/(2\pi)=\frac12$ ;
  - $\frac{10}{27}$ et $\frac18$ ;
  - $1+c^2/T$ ;
  - $x^2/4-x^3/6-1/24$.

## Erreurs trouvées et corrigées

### t17 : `src/content/worlds/w4/t17-dualite-interpolation.ts`

1. **`dualite-interpolation.facile`, nœud `fin`.** Le nœud affirmait $L^2(\Omega)\subsetneq H^{-1}(\Omega)$ pour tout ouvert borné. Or le graphe ne le démontre que sur $]0,1[$, par `q-dirac`. Nouveau texte : « qui contient le pivot $L^2(\Omega)$, strictement sur $]0,1[$ ».
2. **`dualite-interpolation.intermediaire`, retrait `e-conj`.** Le texte disait : « L'argument de Hölder exige $1<p,q<+\infty$ ». C'est faux : Hölder vaut pour les exposants $(1,\infty)$. En fait, ce sont les formules $p=\frac1{1-\theta}$ et $q=\frac1\theta$ qui ne définissent pas d'exposant réel fini aux extrémités. L'explication est reformulée, ainsi que l'erreur fréquente `e-extremes` (« appliquer Hölder… où un exposant est infini »).
3. **`dualite-interpolation.intermediaire`, variante, piège `x-swap`.** Le texte annonçait « élevée à la puissance $4$ ». Or c'est à la puissance $8$ qu'on obtient $\frac1{16}\le\frac1{125}$ ; à la puissance $4$, on obtient $\frac14\le5^{-3/2}$. Corrigé.
4. **`dualite-interpolation`, « Riesz ≠ inclusion ».** Cette affirmation était faite sans condition sur $s$. Pour $s=0$ et des fonctions réelles, les deux identifications coïncident. « Pour $s>0$ » a été ajouté à trois endroits :
   - dans la vigilance de la fiche ;
   - dans la solution du facile ;
   - dans le concept `dualite-interpolation-pivot`.
5. **`dualite-interpolation.difficile`, origine `polycopie` → `complement`.** Le polycopié (p. PDF 18) ne traite que le cas $u_n\to0$. Les autres éléments sont des compléments :
   - l'appartenance de la limite à $H^1$ (Fatou) ;
   - le découpage en fréquences ;
   - le contre-exemple dans $H^1$.

### t18 : `src/content/worlds/w4/t18-injections-fractionnaires.ts`

6. **Fiche, hypothèse $s>\frac d2+\alpha$ (`whenRemoved`).** Le texte donnait l'échec de l'argument de Cauchy–Schwarz pour $s=\frac d2+\alpha$ comme effet du retrait de l'hypothèse. Cela laissait croire que l'injection tombe. Or $H^{d/2+\alpha}\hookrightarrow C^{0,\alpha}$ reste vraie pour $0<\alpha<1$. Pour le voir, on coupe les fréquences en $|\xi|\le h^{-1}$ et $|\xi|>h^{-1}$, avec $h=|x-y|$. Cauchy–Schwarz sur chaque morceau donne une majoration en $C h^{\alpha}$ pour les deux morceaux. Le texte précise désormais que ce cas n'est pas un contre-exemple et qu'il sort de l'énoncé du polycopié.
7. **Tâche `ce-injections-fractionnaires-surcritique`, `correctStatement`.** Le texte disait « dès que $p+1\le 6$ ». C'est faux pour $0<p<1$ sur $\mathbb R^3$ : prendre $p=\frac12$ et $u=v=(1+|x|^2)^{-b/2}$ avec $\frac32<b\le2$. Nouveau texte : « dès que $1\le p$ et $p+1\le6$ ».
8. **`injections-fractionnaires.intermediaire`, origine `polycopie` → `complement`.** Le polycopié ne donne qu'une idée de preuve : Cauchy–Schwarz pondéré, puis inversion de Fourier. La limite nulle à l'infini (Riemann–Lebesgue) et la höldérianité de la variante y manquent.

### t21 : `src/content/worlds/w5/t21-aubin-lions.ts`

9. **`aubin-lions.difficile`, piège `x-grad`.** Le contre-exemple, $\frac{\sqrt2}{n\pi}\sin(n\pi x)$, ne vérifiait pas l'équation de l'exercice avec un second membre fixe. Il est remplacé par des solutions, avec $f=0$ et $g=0$ :
   - $u_n=e^{-\lambda_nt}\sqrt2\sin(n\pi x)$ ;
   - les deux bornes sont vérifiées et $u_n\to0$ dans $L^2(0,T;H)$ ;
   - mais $\|\partial_xu_n\|^2_{L^2(0,T;L^2)}=\frac12(1-e^{-2\lambda_nT})\to\frac12$.
10. **Tâche `ce-al-cible`, `correctStatement`.** Le texte disait « seulement faiblement dans $L^p(0,T;X_0)$ », ce qui suppose une réflexivité absente du cadre de Banach du lemme. Nouveau texte : « en général pas dans $L^p(0,T;X_0)$ ».

### t22 : `src/content/worlds/w5/t22-lions-magenes.ts`

11. **`lions-magenes.facile`, retrait `h-triplet`.** Le texte disait : « $u$ ne peut plus être identifiée à une fonction à valeurs dans $V'$ sans perte ». C'est faux : même sans densité, la restriction de $\iota$ à $V$ reste injective, car $\langle\iota v,v\rangle=\|v\|_H^2$. Seule l'injectivité de $H\to V'$ se perd. Reformulé.
12. **`lions-magenes.difficile`, variante de Gårding, retrait `h-garding`.** Le « contre-exemple » n'était qu'une paraphrase de l'argument. Il est remplacé par un vrai contre-exemple :
    - $a(u,v)=-\int_0^1\partial_xu\,\partial_xv$ sur $H^1_0(]0,1[)$, qui ne vérifie aucune inégalité de Gårding ;
    - $w_k=e^{k^2\pi^2t}\sin(k\pi x)$ vérifie $\frac12\frac d{dt}\|w_k\|_H^2=k^2\pi^2\|w_k\|_H^2$ ;
    - aucune constante $\lambda$ ne convient donc pour tous les $k$.

### t23 : `src/content/worlds/w5/t23-gronwall.ts`

13. **Fiche, hypothèse sur $b$.** Le texte disait « Si $b$ change de signe » pour $b=-1$, qui est de signe constant. Nouveau texte : « Si $b$ n'est pas positive ».
14. **`gronwall.intermediaire`, retrait `h-b1`.** Le texte disait « $z$ n'est plus absolument continue », ce qui est faux dans l'exemple fourni, où $z(t)=t$. Nouveau texte : « $B$ peut ne plus être finie, et $z$ n'est plus nécessairement absolument continue ».
15. **`gronwall.difficile`, règle vers `w-test`.** J'ai ajouté les prémisses `h-G` et `h-triplet`. L'argument du négligeable indépendant de $v$ en a besoin :
    - il demande que $t\mapsto G(u_i(t))$ soit fortement mesurable, ce que garantit $G$ lipschitzienne ;
    - il demande aussi l'identification $H\hookrightarrow V'$.
16. **`gronwall.facile`.**
    - L'origine passe de `FROM_POLY` à `complement` : l'exercice figure au polycopié sans corrigé.
    - Dans la variante, le retrait `h-y` évalue $y$ en $t=\frac12$ ; j'ai précisé « pour $T\ge\frac12$ ».

### t32 : `src/content/worlds/w8/t32-browder-minty.ts`

17. **`browder-minty.intermediaire`, retrait `h-p1`.** Le texte disait « l'exposant conjugué n'existe plus » pour $p=1$. Nouveau texte : « $p'=p/(p-1)$ n'est plus un réel (l'exposant conjugué de $1$ est $+\infty$) ».
18. **`browder-minty.difficile`, piège `x-fort`.** La suite $(e_n)$ de $\ell^2$ n'était pas une suite de Galerkin. Elle est remplacée par une vraie suite de Galerkin :
    - $V=\ell^2$, $f=0$ et $A=\nabla\Phi$, avec $\Phi(u)=\max(\|u\|-1,0)^2$ ;
    - $A$ est monotone, continu, coercif et borné sur les bornés ;
    - $u_n=e_n$ est une solution de Galerkin, puisque $Ae_n=0$, et aucune de ses sous-suites ne converge fortement.

### t10 : `src/content/worlds/w3/t10-poincare-wirtinger.ts`

Aucune erreur.

## Points demandés par l'auteur et le coordinateur

- **$u(t,x)=F(4x-2-t)$, avec $F(y)=\max(0,1-|y|)$ (t22).** Exact. On le retrouve dans le piège sur `fin` et dans `x-V` (facile), ainsi que dans `x-test-deriv` (difficile).
  - Le support de $u(t,\cdot)$ est $[\frac{1+t}4,\frac{3+t}4]\subset]0,1[$ pour $t\in]0,1[$, et $\|\partial_xu(t)\|^2_{L^2}=8$.
  - $t\mapsto u(t)$ est lipschitzienne à valeurs dans $L^2$, et $u'(t)=-F'(4\cdot-2-t)$ prend les valeurs $0,-1,1,0$, avec trois sauts. Donc $u'\in L^\infty(0,1;H)\subset L^2(0,1;V')$ et $u'(t)\notin H^1_0$.
  - Pour le difficile, $f:=u'+Au\in L^2(0,1;V')$ pour toute forme $a$ continue.
- **$w_n=n\,\mathbb 1_{]0,n^{-3}[}$ testé contre $x^{-3/4}$.** Exact. Ce contre-exemple se trouve dans **t19** (`banach-alaoglu.difficile`, piège `x-sans-borne` et retrait `h-M`), avec $\Omega=]0,2\pi[$ :
  - $\int w_nx^{-3/4}=4n^{1/4}$, $\|w_n\|^2_{L^2}=1/n$ et $\|w_n^2\|^2_{L^2}=n$ ;
  - $x^{-3/4}\in L^1(]0,2\pi[)$.

  t19 est hors périmètre : je ne l'ai pas modifié et il n'a pas d'entrée dans r5. La variante de t21 (retrait `h-g`, avec $|E_n|=n^{-3}$) est elle aussi exacte.
- **$y_1=16t^2\le2e^{3t}$ (t23).** Exact.
  - On a $e^{3t}\ge P(t)+8t^2$, avec $P(t)=1+3t-\frac72t^2+\frac92t^3$.
  - Le discriminant de $P'$ vaut $49-162<0$, donc $P\ge P(0)=1$ sur $[0,\infty[$.
  - Violation de l'hypothèse en $t=\frac23$ : $\frac{192}{27}-\frac{182}{27}=\frac{10}{27}$.
- **t17 facile (application de Riesz et crochet bilinéaire, cas réel).** Exact.
  - Le crochet $\int\hat f(\xi)\hat\varphi(-\xi)\,d\xi$ prolonge $\int f\varphi$, par Parseval appliqué à $f$ et $\bar\varphi$.
  - L'application de Riesz, lue dans $H^{-s}$, est $u\mapsto(I-\Delta)^s\bar u$, de multiplicateur $1+|\xi|^2$ pour $s=1$ et $u$ réelle.
  - La surjectivité vaut aussi dans le cadre réel : le représentant construit est réel.
- **t18 difficile (optimalité de $p+1\le2^*$ par dilatation).** Exact.
  - Pour $\lambda\ge1$, $\|u_\lambda\|^2_{H^s}\le\lambda^{2s-d}\|u\|^2_{H^s}$, car $1+\lambda^2|\eta|^2\le\lambda^2(1+|\eta|^2)$.
  - On a aussi $\int u_\lambda^{p+1}=\lambda^{-d}\int u^{p+1}$, et le crochet de $u_\lambda^p\in\mathcal S$ avec $u_\lambda$ vaut bien $\int u_\lambda^{p+1}$.
  - L'exposant $\frac{(d-2s)(p+1)}2-d$ est $>0$ si et seulement si $p+1>2^*$.
- **Origines (t17, t18).** J'ai tranché comme suit :
  - t17 intermédiaire reste `polycopie` : la « Démonstration » de la p. PDF 18 est exactement la preuve par Hölder ; seules l'hypothèse $u\in H^{s_0}\cap H^{s_1}$ et les extrémités sont explicitées ;
  - t17 difficile et t18 intermédiaire passent à `complement` (points 5 et 8) ;
  - par cohérence, t23 facile passe aussi à `complement` (point 16).

## Réserves restantes (non bloquantes)

- **t17, `sourceProof: 'idee'`.** Le schéma n'a pas de valeur « en partie complète ». L'interpolation est démontrée au polycopié, la dualité y est énoncée sans démonstration. Les notes de vérification le disent.
- **Distracteurs du type « … suffit ».** C'est le cas de t10 intermédiaire `x-faible` et de t21 difficile `x-faible`. Ils sont réfutés comme principes de raisonnement. Dans le contexte de t10, la conclusion $\|v\|_{L^2}=1$ est vraie, mais à cause de Rellich, non de la convergence faible. Le verdict `incorrect` vise donc la justification ; je l'ai conservé.
- **Aubin–Lions.** L'énoncé du polycopié ($1<p,q<\infty$) est conservé. La version de Simon admet $q=1$ lorsque $p<\infty$, ce qui reste cohérent : le contre-exemple de la fiche viole les deux conditions à la fois ($p=\infty$, $q=1$).

## Validation

Commandes exécutées après correction, depuis la racine du projet :

- `npx vitest run src/tests/content/content.test.ts -t "poincare-wirtinger|dualite-interpolation|injections-fractionnaires|aubin-lions|lions-magenes|gronwall|browder-minty"` : 42 tests réussis ;
- `npx vitest run src/tests/content` : 209 tests réussis ;
- `npx tsc --noEmit` : aucune erreur.

Traçabilité : `src/content/reviews/r5.ts` contient 28 entrées (7 théorèmes et 21 exercices), toutes au statut `relu` après correction.
