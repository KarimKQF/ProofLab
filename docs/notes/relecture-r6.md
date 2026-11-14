# Relecture mathématique R6 — Minty et Galerkin (monde 8), laboratoire Galerkin

Périmètre :

- `src/content/worlds/w8/t33-minty.ts` ;
- `src/content/worlds/w8/t34-galerkin.ts` ;
- les dix preuves de `src/labs/galerkin/steps.ts`.

Source de vérité : `source-materials/extraits/polycopie_texte_par_page.txt`.

- Pages PDF 28 à 30 : sections 7.1 à 7.4.
- Pages PDF 31 à 34 : section 8.
- Page PDF 44 : exercices 33 et 34.

Erreur connue du polycopié : l'estimation a priori de la section 8. Elle est correctement traitée partout, avec la forme à $t$ fixé et le facteur $2$ dans la forme globale.

Je me suis appuyé sur les exports `docs/relecture/33-minty.md` et `34-galerkin.md`. Je les ai complétés, dans les sources, par ce que l'export n'affiche pas :

- textes masqués et invites des calculs ;
- `correctStatement` des tâches de contre-exemple ;
- rappels de concepts ;
- étapes et grilles.

## Ce qui a été vérifié

- **Fiches.**
  - L'énoncé de Minty est conforme à la p. PDF 30 : $V$ réflexif réel, $A$ monotone et hémicontinu, hypothèse du $\limsup$.
  - L'énoncé de Galerkin est conforme à la p. PDF 31, avec $\Omega$ borné lipschitzien, $u_0\in L^2$, $f\in L^2(0,T;H^{-1})$, et l'estimation a priori corrigée.
  - Les trois contre-exemples « Sans elle » de Minty sont vrais :
    - $B=-u^3$ : $\limsup=-\frac{15}8$ et $Bu_n\rightharpoonup-\frac52\ne-1$ ;
    - fonction échelon monotone sur $\mathbb R$ ;
    - $u^3$ : $\chi=\frac52$, $\limsup=\frac{15}8$.
  - Les bilans de Galerkin (existence, unicité, régularité, stabilité) ne disent rien de plus que ce qui est démontré.
- **Règles.** J'ai vérifié chaque règle des huit graphes, variantes comprises, ainsi que des dix étapes du laboratoire. En particulier :
  - $\|P_nv\|_V\le\|v\|_V$ découle de $\|v\|_V^2=\sum_k\lambda_k(v,\varphi_k)^2$ ;
  - $\|u_n'\|_{V'}\le\|f\|_{V'}+\|u_n\|_V$ s'obtient par $(u_n',v)_H=(u_n',P_nv)_H$ ;
  - l'identification $g=u'$ passe par des formes linéaires continues sur $L^2(0,T;V')$ et $L^2(0,T;V)$ ;
  - la condition initiale s'obtient avec $\eta(0)\ne0$ et $(P_nu_0,\varphi_k)=(u_0,\varphi_k)$ pour $n\ge k$ ;
  - l'unicité utilise la formule de Lions–Magenes ;
  - dans l'exercice difficile, la règle de condition initiale (`lim`, `ext`, `h-data`) suffit : le seul terme en $u'$ et la convergence $u_n'\rightharpoonup u'$ y suffisent.
- **Valeurs attendues recalculées :**
  - Minty : $\frac52$, $\frac{15}8$, $-1$, $-\frac{35}{256}$ ;
  - Galerkin : $4$, $1$, $\frac12$, $\frac54$, $\frac1\pi$ ;
  - $\frac32$ pour la tâche de contre-exemple de Galerkin. Sur $]0,\pi[$, $\|\varphi_1\|_H=\|\varphi_1\|_V=1$ et $u=e^{-t}\varphi_1$, donc $1+\frac{1-e^{-2T}}2\to\frac32$, contre un second membre égal à $1$.

## Erreurs trouvées et corrigées

### `t33-minty.ts`

1. **`minty.intermediaire`, distracteur `x-prod` : un piège refusait un énoncé vrai.**
   - Sous les hypothèses de l'exercice, $\langle Au_n,u_n\rangle\to\langle\chi,u\rangle$ est vrai :
     - la monotonie donne $\liminf\langle Au_n,u_n-u\rangle\ge\lim\langle Au,u_n-u\rangle=0$ ;
     - l'hypothèse du $\limsup$ force alors $\langle Au_n,u_n-u\rangle\to0$.
   - Le contre-exemple dans $\ell^2$ ne vérifie pas l'hypothèse du $\limsup$.
   - Correction : le distracteur devient « … découle des seules convergences faibles ». Cette assertion est fausse : dans $\ell^2$ avec $A=I$, $\langle Ae_n,e_n\rangle=1$. Le message signale que la convergence a bien lieu sous monotonie et $\limsup$.
2. **`minty.difficile`, retrait `h-Vn` : explication fausse.** Elle affirmait que « le calcul du $\limsup$ tombe avec elle ». C'est faux :
   - $u$ appartient à l'adhérence $W$ de $\bigcup V_n$, qui est faiblement fermée ;
   - $\chi=f$ sur $W$, donc le $\limsup$ vaut toujours $\langle f-\chi,u\rangle=0$ ;
   - Minty donne encore $\chi=Au$ ; seule $Au=f$ est perdue.

   L'explication est corrigée. Le contre-exemple « en général » est remplacé par un exemple explicite :
   - $p=2$, $V_n=\mathrm{Vect}(\sin\pi x)$, $f=4\pi^2\sin2\pi x$ ;
   - on obtient $u_n=u=0$, avec $A0\ne f$.
3. **Hémicontinuité décrite comme une « continuité forte le long des droites » :**
   - dans la mise en garde de la fiche ;
   - dans le piège `x-cont` de `minty.facile` (« pour la topologie forte »).

   C'est inexact : la définition (p. PDF 28) est la continuité de $t\mapsto\langle A(u+tv),w\rangle$, donc une continuité faible des valeurs. Les deux textes sont reformulés.
4. **`minty.difficile` : norme absente.** $\|u\|_V=\|\nabla u\|_{L^p}$ est ajoutée dans l'énoncé et dans `h-p`. Les identités $\|Au\|_{V'}\le\|u\|_V^{p-1}$ et $\langle Au,u\rangle=\|u\|_V^p$ en dépendent.
5. **`minty.difficile`, conclusion `fin` : formule ambiguë.**
   - « Sans convergence forte des gradients » laissait croire que les gradients ne convergent pas fortement. Or, pour le $p$-Laplacien, $\nabla u_n\to\nabla u$ fortement a posteriori : $\|u_n\|_V^p=\langle f,u_n\rangle\to\|u\|_V^p$, puis Radon–Riesz.
   - Nouvelle formulation : « obtenue sans utiliser de convergence forte des gradients ».
   - Une mise en garde est ajoutée au piège `x-grad-fort`.
6. **Énoncés trop absolus :**
   - piège `j-minty-auto` : « jamais automatique » devient « pas automatique pour des solutions approchées » ;
   - rappel du concept `minty-identification` : « il faut monotonie, hémicontinuité et $\limsup$ » présentait des conditions suffisantes comme nécessaires. La variante de l'exercice facile montre que le $\limsup$ n'est pas nécessaire.
7. **Hors mathématiques (`minty.facile`).** La justification `j-lim` affichait $\frac{15}8$, valeur du calcul masqué `ls`. Elle devient « de valeur strictement positive ».

### `t34-galerkin.ts`

1. **`galerkin.difficile` : contre-exemples hors hypothèses.** Sont concernés :
   - le distracteur `x-faible-g` ;
   - le piège sur `lip` par `j-faible` ;
   - le retrait `fort`.

   Tous utilisaient $s_n=\sin(2\pi nx)$. Or $\|s_n\|_{H^1_0}=\sqrt2\,\pi n\to\infty$ : $s_n$ ne converge pas faiblement dans $L^2(0,T;V)$, alors que l'assertion réfutée porte sur cette convergence. Ils sont remplacés par une oscillation en temps :
   - $w_n=\sin(2\pi nt/T)\,\varphi_1$, avec $\varphi_1=\sqrt2\sin\pi x>0$ ;
   - $w_n\rightharpoonup0$ dans $L^2(0,T;V)$ ;
   - $\max(w_n,0)\rightharpoonup\varphi_1/\pi\ne0$ dans $L^2(0,T;H)$ ;
   - $w_n'$ n'est pas bornée dans $L^2(0,T;V')$, ce qui est cohérent avec Aubin–Lions.
2. **Énoncés plus généraux que le polycopié.** Sont concernés :
   - les mises en garde 3 et 4 de la fiche ;
   - le `correctStatement` de `ce-galerkin-gradient` ;
   - dans `galerkin.difficile` : la solution, le piège `x-grad`, le message de `x-faible-g` et l'explication du retrait `fort`.

   Deux affirmations sont fausses en général :
   - « $g(u)$ exige une compacité » : pour $g$ lipschitzienne, un point fixe de Banach suffit ; pour $g$ croissante, un argument de monotonie suffit, sans compacité.
   - « Une non-linéarité en gradient exige Minty » : Minty demande une structure monotone, et $G(r)=\min(r^2,1)$ n'est pas monotone.

   Les textes sont reformulés selon le polycopié (p. PDF 32 et 33 : « décisive pour certaines non-linéarités », « notamment le critère de Minty »).
3. **`galerkin.facile`, piège `x-couple` : le « contre-exemple » ne réfutait pas l'assertion.** La base couplée $\psi$ illustrait l'origine du couplage. Nouveau contre-exemple : pour $n=2$, $c_1'=g_1-\lambda_1c_1$ ne fait pas intervenir $c_2$. La base $\psi$ reste en illustration.
4. **`galerkin.difficile`, justification `j-cara`.** « Mesurable en temps, lipschitzien en $c$ » ne suffit pas à l'existence globale sans intégrabilité en temps (version de Carathéodory). J'ai ajouté « intégrable en temps à $c$ fixé, lipschitzien en $c$ uniformément en $t$ ».
5. **Ajouts de « en général » :**
   - piège `x-C1` ;
   - retraits `h-base` de `galerkin.facile` et de sa variante (« couplé »).

### `src/labs/galerkin/steps.ts` (conclusions)

- **Étape 9, retrait de Lions–Magenes (signalé par l'auteur).** L'ancien contre-exemple ($w$ et $w+\mathbb 1_{\{0\}}\varphi_1$) montrait seulement que l'évaluation ponctuelle n'est pas définie sur des classes. L'explication était inexacte : avec $u'\in L^2(0,T;V')$, $u\in H^1(0,T;V')\subset C([0,T];V')$ a déjà une valeur en $0$ dans $V'$. Après correction :
  - l'explication dit que retirer `h-lm` retire l'identité vérifiée par $u$ et tout sens donné à $u(0)$, et que $L^2(0,T;V)$ seul ne définit aucune valeur en $0$ ;
  - elle précise que le contrôle de $u'$, exploité par Lions–Magenes, fournit le représentant continu à valeurs dans $H$ et l'intégration par parties ;
  - nouveau contre-exemple rigoureux : $w=t^{-1/4}\varphi_1\in L^2(0,T;V)$, et aucun représentant n'a de limite en $0$, ni dans $H$ ni dans $V'$ ; de plus $w'\notin L^2(0,T;V')$.

  Remarque : l'identification $u(0)=u_0$ pourrait se faire dans $V'$ sans Lions–Magenes. Le retrait reste « nécessaire » au sens du graphe.
- **Étape 10, piège de dérivation (signalé par l'auteur).** Le Dirac en $1/2$ prouvait seulement que $V'\ne H$ ; il passe dans le message. Nouveau contre-exemple rigoureux :
  - $w(t)=\sum_k\frac{\sin(\lambda_kt)}{k\sqrt{\lambda_k}}\varphi_k$ ;
  - $\|w(t)\|_V^2\le\frac{\pi^2}6$ et $\|w'(t)\|_{V'}^2\le\frac{\pi^2}6$ ;
  - mais $\sum_k\langle w'(t),\varphi_k\rangle^2=\pi^2\sum_k\cos^2(k^2\pi^2t)=+\infty$ pour presque tout $t$. En effet, si le terme général tendait vers $0$ sur un ensemble $E$ de mesure $>0$, la convergence dominée donnerait $\int_E\cos^2\to0$, alors que Riemann–Lebesgue donne $|E|/2$ ;
  - donc $w'(t)\notin H$ presque partout, et $(w',w)_H$ n'a pas de sens.
- **Étape 9, piège `x-trace` : message faux.** Il affirmait que l'évaluation en $0$ « n'est continue pour aucune des convergences obtenues ». Or la trace est continue de $W(0,T)$ dans $H$, et les deux convergences faibles de l'étape 6 donnent $u_n(0)\rightharpoonup u(0)$. Le message est corrigé ; le contre-exemple $\max(1-nt,0)\varphi_1$ est juste et conservé.
- **Étape 8, retrait `h-tot`.** L'explication est remplacée par un vrai contre-exemple : pour $f=0$, $u=\varphi_1$ vérifie l'identité testée par chaque $\varphi_{2k}$, mais pas l'équation pour $v=\varphi_1$ (résidu $\pi^2$).
- **Étape 7 : énoncés trop absolus.**
  - « elle le devient devant un terme non linéaire » devient « elle peut le devenir » ;
  - message `j-fort-requis` : « ne sert que pour certains termes non linéaires » ;
  - piège `j-rellich-t` : « un contrôle en temps : ici, la borne de $u_n'$ ».
- **Vérifié sans changement**, avec contre-exemples et calculs refaits :
  - étapes 1 à 6 ;
  - le reste des étapes 7 à 10 ;
  - valeurs recalculées : terme de bord $-2\pi$, $(w_+,w_-)_V=-\frac32\pi^2$, $\frac{\pi^2}2\begin{pmatrix}5&-3\\-3&5\end{pmatrix}$, $\|\varphi_2\|_V^2/\pi^2=4$ ;
  - exemples refaits : $t^{-1/4}$, escalier de Cantor, rapport $\frac54$, $w_n=\varphi_n/\sqrt{\lambda_nT}$, $n\mathbb 1_{]0,1/n[}$ dans $L^1$, translations sur $\mathbb R$, $y'=2\sqrt{|y|}$.

## Réserves restantes

Je n'ai aucune réserve mathématique : les huit entrées sont marquées `relu` dans `src/content/reviews/r6.ts`. Deux remarques restent hors erreur.

- Les retraits « nécessaires » `sign` et `fort` de `galerkin.difficile` le sont au sens du graphe : le résultat final reste vrai par d'autres voies (Grönwall, monotonie). Les explications le disent désormais.
- Dans `minty.difficile`, le retrait `id` et le piège `x-ls-faible` utilisent l'exemple $u^3$ sur $L^4$, hors du cadre du $p$-Laplacien. Ils sont justes. Un exemple dans le cadre existe : $u_n=\frac{\sin(2\pi nx)}{2\pi n}\rightharpoonup0$ dans $W^{1,p}_0(]0,1[)$, avec $\langle Au_n,u_n\rangle$ constant et $>0$.

Fichier hors périmètre, non modifié : `GalerkinLab.tsx`.

## Contrôles

Toutes les commandes passent :

- `npx vitest run src/tests/content/content.test.ts -t "minty|galerkin"` : 18 tests réussis ;
- `npx vitest run src/tests/labs/galerkin` : 15 tests réussis ;
- `npx tsc --noEmit` : aucune erreur.
