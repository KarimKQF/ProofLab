/**
 * Résultat 13 — Rellich–Kondrachov.
 * Énoncé : polycopié, section 3.7 (p. PDF 15), donné avec une idée de preuve seulement.
 * Exercices : annexe B, exercice 13 (p. PDF 40). Les exercices travaillent les
 * définitions, le cas démontrable de l'intervalle et le contre-exemple des translations.
 */
import { t, rubric, poly, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'rellich.facile',
  theoremId: 'rellich',
  level: 'facile',
  title: 'Injection continue et injection compacte',
  statement: t`Soient $X\subset Y$ deux espaces de Banach et $J:X\to Y$, $Jx=x$, l'injection canonique. On dit que $J$ est continue s'il existe $C>0$ tel que $\|x\|_Y\le C\|x\|_X$ pour tout $x\in X$, et compacte si toute suite bornée de $X$ admet une sous-suite convergente dans $Y$. Montrer que toute injection compacte est continue, puis que la réciproque est fausse, à l'aide de $X=Y=\ell^2$.`,
  source: poly(40, 'Exercice 13, facile'),
  prerequisites: [],
  concepts: ['compact-continue', 'bornee-non-convergente', 'quantificateurs'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-XY', kind: 'hypothese', text: t`$X\subset Y$ sont des espaces de Banach, et $J:X\to Y$, $Jx=x$, est linéaire.` },
      { id: 'd-cont', kind: 'definition', text: t`$J$ est continue si et seulement s'il existe $C>0$ tel que $\|x\|_Y\le C\|x\|_X$ pour tout $x\in X$.` },
      { id: 'd-comp', kind: 'definition', text: t`$J$ est compacte si et seulement si toute suite bornée de $X$ admet une sous-suite convergente dans $Y$.` },
      { id: 's-comp', kind: 'definition', local: true, text: t`Supposons $J$ compacte.` },
      { id: 's-neg', kind: 'definition', local: true, text: t`Supposons par l'absurde que $J$ n'est pas continue.` },
      { id: 'neg', kind: 'consequence', text: t`Il existe $(x_n)\subset X$ avec $\|x_n\|_X=1$ et $\|x_n\|_Y\ge n$ pour tout $n\ge 1$.` },
      { id: 'ext', kind: 'consequence', text: t`Une sous-suite $(x_{n_k})$ converge dans $Y$.` },
      { id: 'contra', kind: 'contradiction', text: t`$(x_{n_k})$, convergente, est bornée dans $Y$ : contradiction avec $\|x_{n_k}\|_Y\ge n_k\to+\infty$.` },
      { id: 'imp', kind: 'consequence', text: 'Toute injection compacte est continue.' },
      { id: 'd-ex', kind: 'definition', text: t`$X=Y=\ell^2$, $J=\mathrm{Id}$, et $(e_n)$ la base hilbertienne canonique.` },
      {
        id: 'ex-dist',
        kind: 'egalite',
        text: t`$\|e_n\|=1$ et $\|e_n-e_m\|^2=2$ pour $n\ne m$.`,
        masked: t`Valeur de $\|e_n-e_m\|^2$ pour $n\neq m$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\|e_n-e_m\|_{\ell^2}^2$ pour $n\ne m$`, expected: '2' },
      },
      { id: 'ex-nc', kind: 'consequence', text: t`$\mathrm{Id}_{\ell^2}$ est continue ($C=1$) mais non compacte.` },
      { id: 'fin', kind: 'conclusion', text: 'Toute injection compacte est continue, et la réciproque est fausse.' },

      // Propositions plausibles mais fausses.
      { id: 'x-cont-comp', kind: 'consequence', distractor: true, text: 'Toute injection continue entre espaces de Banach est compacte.' },
      { id: 'x-image', kind: 'consequence', distractor: true, text: t`$J$ est compacte si et seulement si l'image $J(B_X)$ de la boule unité est compacte dans $Y$.` },
    ],
    justifications: [
      { id: 'j-neg', label: t`Négation de la définition pour $C=n$, puis normalisation $x_n=y_n/\|y_n\|_X$ (linéarité de $J$).` },
      { id: 'j-def-comp', label: t`Définition de la compacité, appliquée à une suite bornée de $X$.` },
      { id: 'j-conv-bornee', label: 'Une suite convergente est bornée.' },
      { id: 'j-absurde', label: 'Raisonnement par l’absurde : la supposition est contradictoire.' },
      { id: 'j-orthonorm', label: t`Orthonormalité de $(e_n)$ : $\|e_n-e_m\|^2=\|e_n\|^2+\|e_m\|^2$.` },
      { id: 'j-nc', label: t`$C=1$ convient ; $(e_n)$ est bornée, et aucune sous-suite n'est de Cauchy, donc aucune ne converge.` },
      { id: 'j-syn', label: 'Réunion de l’implication et du contre-exemple.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-bw', label: 'Théorème de Bolzano–Weierstrass : toute suite bornée admet une sous-suite convergente.' },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['s-neg', 'd-cont', 'h-XY'], to: 'neg', by: 'j-neg' },
      { from: ['neg', 's-comp', 'd-comp'], to: 'ext', by: 'j-def-comp' },
      { from: ['ext', 'neg'], to: 'contra', by: 'j-conv-bornee' },
      { from: ['contra'], to: 'imp', by: 'j-absurde' },
      { from: ['d-ex'], to: 'ex-dist', by: 'j-orthonorm' },
      { from: ['ex-dist', 'd-ex', 'd-cont', 'd-comp'], to: 'ex-nc', by: 'j-nc' },
      { from: ['imp', 'ex-nc'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'ext',
        by: 'j-bw',
        verdict: 'incorrect',
        concept: 'bornee-non-convergente',
        message: 'Bolzano–Weierstrass ne vaut qu’en dimension finie. Ici, la sous-suite convergente provient de la compacité supposée de l’injection.',
        counterexample: t`La suite $(e_n)$ de $\ell^2$ est bornée, sans sous-suite convergente.`,
      },
      {
        conclusion: 'imp',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: 'L’implication se démontre : suppose la continuité en défaut et construis une suite bornée dont l’image n’est pas bornée.',
      },
      {
        conclusion: 'x-cont-comp',
        verdict: 'incorrect',
        concept: 'compact-continue',
        message: 'Une injection continue envoie les bornés sur des bornés ; une injection compacte, sur des relativement compacts. En dimension infinie, ce n’est pas la même chose.',
        counterexample: t`$\mathrm{Id}_{\ell^2}$ est continue, et $(e_n)$ n'a aucune sous-suite convergente.`,
      },
      {
        conclusion: 'x-image',
        verdict: 'incorrect',
        concept: 'compact-continue',
        message: t`La compacité de $J$ demande que $J(B_X)$ soit relativement compacte, non compacte : l'image de la boule n'est pas forcément fermée.`,
        counterexample: t`$X=C^1([0,1])$, normé par $\|u\|_\infty+\|u'\|_\infty$, et $Y=C([0,1])$ : $J$ est compacte (Arzelà–Ascoli), mais $u_n(x)=\tfrac14\sqrt{(x-1/2)^2+1/n^2}$ appartient à $B_X$ et converge uniformément vers $\tfrac14|x-1/2|\notin C^1$.`,
      },
    ],
    removable: [
      {
        hypothesis: 's-comp',
        label: 'Retirer la compacité de l’injection',
        necessary: true,
        explanation: 'Sans compacité, une suite bornée de X n’a plus de sous-suite convergente dans Y : l’argument par l’absurde tombe.',
        counterexample: t`Dans $\ell^2$, $(e_n)$ est bornée et n'a aucune sous-suite convergente.`,
      },
      {
        hypothesis: 'd-ex',
        label: 'Retirer l’exemple en dimension infinie',
        necessary: true,
        explanation: 'En dimension finie, toute application linéaire est compacte : le contre-exemple exige un espace de dimension infinie.',
        counterexample: t`Pour $X=Y=\mathbb R^n$, $\mathrm{Id}$ est compacte, par Bolzano–Weierstrass.`,
      },
    ],
  },
  solution: t`**Compacte implique continue.** Supposons $J$ compacte et non continue. Pour tout $n$, il existe $y_n\in X$ avec $\|y_n\|_Y>n\|y_n\|_X$ ; en particulier $y_n\ne 0$, et $x_n=y_n/\|y_n\|_X$ vérifie $\|x_n\|_X=1$, $\|x_n\|_Y>n$. La suite $(x_n)$ est bornée dans $X$ : une sous-suite converge dans $Y$, donc est bornée dans $Y$, ce qui contredit $\|x_{n_k}\|_Y>n_k$.

**La réciproque est fausse.** Dans $\ell^2$, $\mathrm{Id}$ est continue ($C=1$). La suite $(e_n)$ est bornée et $\|e_n-e_m\|^2=2$ pour $n\neq m$ : aucune sous-suite n'est de Cauchy, donc aucune ne converge. $\mathrm{Id}$ n'est pas compacte.

**Point de vigilance.** La compacité de $J$ demande que l'image de la boule unité soit relativement compacte, non compacte.`,
  steps: [
    'Supposer l’injection compacte et non continue.',
    'Construire une suite bornée dont les normes dans Y explosent.',
    'Extraire grâce à la compacité, et conclure à une contradiction.',
    t`Exhiber l'identité de $\ell^2$ : continue, non compacte.`,
  ],
  commonErrors: [
    { id: 'e-bw', description: 'Appliquer Bolzano–Weierstrass en dimension infinie.', concept: 'bornee-non-convergente' },
    { id: 'e-confusion', description: 'Confondre « image d’un borné bornée » et « image d’un borné relativement compacte ».', concept: 'compact-continue' },
  ],
  hints: [
    'Pour la première implication, que se passe-t-il si aucune constante C ne convient ?',
    t`La négation fournit, pour chaque $n$, un $x_n$ de norme $1$ dans $X$ avec $\|x_n\|_Y\ge n$. Que dit la compacité de cette suite ?`,
    t`Une suite convergente est bornée. Pour la réciproque, calcule $\|e_n-e_m\|$ dans $\ell^2$.`,
  ],
  rubric: rubric({
    hypotheses: 'Les deux définitions sont énoncées exactement, avec leurs quantificateurs.',
    methode: 'Raisonnement par l’absurde pour l’implication ; contre-exemple explicite pour la réciproque.',
    validite: 'La négation de la continuité est correctement formée et normalisée.',
    justifications: 'Aucun argument de dimension finie n’est utilisé en dimension infinie.',
    conclusion: 'L’implication et l’échec de la réciproque sont établis.',
  }),
  variant: {
    statement: t`Montrer qu'une injection continue $J:X\to Y$ est compacte si et seulement si l'image par $J$ de la boule unité de $X$ est relativement compacte dans $Y$.`,
    solution: t`Dans un espace métrique, une partie est relativement compacte si et seulement si toute suite de cette partie admet une sous-suite convergente dans l'espace. Si $J$ est compacte, toute suite de $J(B_X)$ s'écrit $(Jx_n)$ avec $(x_n)\subset B_X$ bornée : elle admet une sous-suite convergente dans $Y$. Réciproquement, si $J(B_X)$ est relativement compacte et $(x_n)$ est bornée par $R>0$, alors $(J(x_n/R))\subset J(B_X)$ admet une sous-suite convergente, et par linéarité $(Jx_{n_k})$ converge.`,
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'rellich.intermediaire',
  theoremId: 'rellich',
  level: 'intermediaire',
  title: t`Compacité de $H^1_0(]0,1[)\hookrightarrow L^2(]0,1[)$`,
  statement: t`On admet le critère de Fréchet–Kolmogorov : si $\mathcal F$ est bornée dans $L^2(\mathbb R)$ et si $\sup_{v\in\mathcal F}\|\tau_hv-v\|_{L^2(\mathbb R)}\to 0$ quand $h\to 0$, où $(\tau_hv)(x)=v(x+h)$, alors de toute suite de $\mathcal F$ on extrait une sous-suite dont la restriction à $]0,1[$ converge dans $L^2(]0,1[)$. En utilisant ce critère, montrer que toute suite bornée de $H^1_0(]0,1[)$ admet une sous-suite convergente dans $L^2(]0,1[)$.`,
  source: poly(40, 'Exercice 13, intermédiaire ; idée de preuve de la section 3.7 (p. PDF 15)'),
  prerequisites: ['distributions'],
  concepts: ['bornee-non-convergente', 'faible-fort', 'hypotheses-theoreme', 'utilisation-prematuree'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    paths: [
      { id: 'fk', label: 'Translations et critère de Fréchet–Kolmogorov' },
      { id: 'aa', label: 'Équicontinuité et Arzelà–Ascoli' },
    ],
    nodes: [
      { id: 'h-borne', kind: 'hypothese', text: t`$(u_n)$ est bornée dans $H^1_0(]0,1[)$ : $\|u_n\|_{H^1}\le R$ pour tout $n$.` },
      { id: 'd-H10', kind: 'definition', text: t`$H^1_0(]0,1[)$ est l'adhérence de $C^\infty_c(]0,1[)$ dans $H^1(]0,1[)$.` },
      { id: 'prol', kind: 'consequence', text: t`Pour $v\in H^1_0(]0,1[)$, le prolongement $\tilde v$ par $0$ appartient à $H^1(\mathbb R)$, avec $(\tilde v)'=\widetilde{v'}$ et $\|\tilde v\|_{H^1(\mathbb R)}=\|v\|_{H^1(]0,1[)}$.` },
      { id: 'tr', kind: 'inegalite', text: t`Pour $v\in H^1(\mathbb R)$ et $h\in\mathbb R$ : $\|\tau_hv-v\|_{L^2(\mathbb R)}\le|h|\,\|v'\|_{L^2(\mathbb R)}$.` },
      { id: 'borne-L2', kind: 'consequence', text: t`$(\tilde u_n)$ est bornée dans $L^2(\mathbb R)$.` },
      { id: 'equi', kind: 'inegalite', text: t`$\sup_n\|\tau_h\tilde u_n-\tilde u_n\|_{L^2(\mathbb R)}\le R|h|\to 0$ quand $h\to 0$.` },
      { id: 'ext', kind: 'application-theoreme', text: t`Une sous-suite $(u_{n_k})$ converge dans $L^2(]0,1[)$.` },
      { id: 'aa', kind: 'inegalite', text: t`Pour $v\in H^1_0(]0,1[)$ et $x,y\in[0,1]$ : $|v(x)-v(y)|\le|x-y|^{1/2}\|v'\|_{L^2}$ et $|v(x)|\le\|v'\|_{L^2}$.` },
      { id: 'aa-ext', kind: 'consequence', text: t`Une sous-suite de $(u_n)$ converge uniformément sur $[0,1]$, donc dans $L^2(]0,1[)$.` },
      { id: 'fin', kind: 'conclusion', text: t`Toute suite bornée de $H^1_0(]0,1[)$ admet une sous-suite convergente dans $L^2(]0,1[)$ : l'injection est compacte.` },

      // Propositions plausibles mais fausses.
      { id: 'x-borne-L2', kind: 'consequence', distractor: true, text: t`Toute suite bornée de $L^2(]0,1[)$ admet une sous-suite convergente dans $L^2(]0,1[)$.` },
      { id: 'x-prol-H1', kind: 'consequence', distractor: true, after: ['prol'], text: t`Pour tout $v\in H^1(]0,1[)$, le prolongement par $0$ appartient à $H^1(\mathbb R)$.` },
    ],
    justifications: [
      { id: 'j-prol', label: t`Vrai pour $\varphi\in C^\infty_c(]0,1[)$ ; on passe à la limite dans $L^2(\mathbb R)$ sur les fonctions et leurs dérivées.` },
      { id: 'j-tr', label: t`Pour $\varphi\in C^\infty_c(\mathbb R)$ : $\varphi(x+h)-\varphi(x)=h\int_0^1\varphi'(x+sh)\,ds$, Cauchy–Schwarz et Tonelli, puis densité de $C^\infty_c(\mathbb R)$ dans $H^1(\mathbb R)$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-norme', label: 'Le prolongement par zéro conserve les normes.' },
      { id: 'j-unif', label: t`Majoration appliquée à chaque $\tilde u_n$, avec $\|\tilde u_n'\|_{L^2(\mathbb R)}\le R$.` },
      { id: 'j-fk', label: 'Critère de compacité de Fréchet–Kolmogorov.', theorem: 'frechet-kolmogorov' },
      { id: 'j-holder', label: t`Pour $\varphi\in C^\infty_c(]0,1[)$ : $\varphi(x)-\varphi(y)=\int_y^x\varphi'$ et Cauchy–Schwarz, puis passage à la limite uniforme.`, theorem: 'cauchy-schwarz' },
      { id: 'j-aa', label: 'Suite uniformément bornée et équicontinue sur un compact : théorème d’Arzelà–Ascoli.' },
      { id: 'j-def-comp', label: 'Définition d’une injection compacte.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-faible', label: t`Une suite bornée de $L^2$ a une sous-suite faiblement convergente, donc fortement convergente.` },
      { id: 'j-rellich', label: 'Théorème de Rellich–Kondrachov.', theorem: 'rellich' },
    ],
    rules: [
      { from: ['d-H10'], to: 'prol', by: 'j-prol', path: 'fk' },
      { from: [], to: 'tr', by: 'j-tr', path: 'fk' },
      { from: ['prol', 'h-borne'], to: 'borne-L2', by: 'j-norme', path: 'fk' },
      { from: ['tr', 'prol', 'h-borne'], to: 'equi', by: 'j-unif', path: 'fk' },
      { from: ['borne-L2', 'equi'], to: 'ext', by: 'j-fk', path: 'fk' },
      { from: ['ext'], to: 'fin', by: 'j-def-comp', path: 'fk' },

      { from: ['d-H10'], to: 'aa', by: 'j-holder', path: 'aa' },
      { from: ['aa', 'h-borne'], to: 'aa-ext', by: 'j-aa', path: 'aa' },
      { from: ['aa-ext'], to: 'fin', by: 'j-def-comp', path: 'aa' },
    ],
    traps: [
      {
        conclusion: 'ext',
        by: 'j-faible',
        verdict: 'incorrect',
        concept: 'faible-fort',
        message: 'La convergence faible n’entraîne pas la convergence forte : c’est le contrôle uniforme des translations qui apporte la compacité.',
        counterexample: t`$\sin(n\pi x)\rightharpoonup 0$ dans $L^2(]0,1[)$, alors que $\|\sin(n\pi x)\|_{L^2}^2=1/2$ pour tout $n$.`,
      },
      {
        conclusion: 'x-borne-L2',
        verdict: 'incorrect',
        concept: 'bornee-non-convergente',
        message: t`Une borne dans $L^2$ seule ne suffit pas : il faut contrôler les dérivées, donc les translations.`,
        counterexample: t`$u_n(x)=\sin(n\pi x)$ est bornée dans $L^2(]0,1[)$ et $\|u_n-u_m\|_{L^2}^2=1$ pour $n\ne m$.`,
      },
      {
        conclusion: 'x-prol-H1',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Le prolongement par zéro reste dans $H^1(\mathbb R)$ grâce à la condition $v\in H^1_0$ ; sans elle, il crée des sauts aux extrémités.`,
        counterexample: t`$v=1$ sur $]0,1[$ : $\tilde v=\mathbb 1_{]0,1[}$ a pour dérivée $\delta_0-\delta_1$, qui n'est pas dans $L^2(\mathbb R)$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-borne',
        label: t`Retirer la borne dans $H^1$`,
        necessary: true,
        explanation: t`Sans borne sur les dérivées, les translations ne sont plus contrôlées uniformément et l'équicontinuité disparaît.`,
        counterexample: t`$u_n(x)=\sin(n\pi x)$ est bornée dans $L^2(]0,1[)$, avec $\|u_n'\|_{L^2}=n\pi/\sqrt2\to\infty$, et n'a aucune sous-suite convergente dans $L^2$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Pour $u_n(x)=\sin(n\pi x)$ et $n\neq m$ : valeur de $\|u_n-u_m\|_{L^2(]0,1[)}^2$`, expected: '1' }],
  solution: t`**Prolongement.** Pour $v\in H^1_0(]0,1[)$, le prolongement $\tilde v$ par $0$ appartient à $H^1(\mathbb R)$, avec $(\tilde v)'=\widetilde{v'}$ : c'est vrai pour $\varphi\in C^\infty_c(]0,1[)$, et l'on passe à la limite dans $L^2(\mathbb R)$. Les normes sont conservées.

**Translations.** Pour $\varphi\in C^\infty_c(\mathbb R)$, $\varphi(x+h)-\varphi(x)=h\int_0^1\varphi'(x+sh)\,ds$ ; Cauchy–Schwarz et Tonelli donnent $\|\tau_h\varphi-\varphi\|_{L^2}\le|h|\,\|\varphi'\|_{L^2}$, inégalité qui s'étend à $H^1(\mathbb R)$ par densité. Ainsi $\sup_n\|\tau_h\tilde u_n-\tilde u_n\|_{L^2(\mathbb R)}\le R|h|$.

**Conclusion.** $(\tilde u_n)$ est bornée dans $L^2(\mathbb R)$ et ses translations sont uniformément contrôlées : le critère de Fréchet–Kolmogorov fournit une sous-suite convergente dans $L^2(]0,1[)$.

**Autre voie.** Pour $v\in H^1_0(]0,1[)$, $|v(x)-v(y)|\le|x-y|^{1/2}\|v'\|_{L^2}$ et $|v(x)|\le\|v'\|_{L^2}$ : la suite est équicontinue et uniformément bornée, et Arzelà–Ascoli conclut.

**Point de vigilance.** Une borne dans $L^2$ seule ne suffit pas, et la convergence faible n'est pas la convergence forte.`,
  steps: [
    t`Prolonger par zéro les éléments de $H^1_0(]0,1[)$.`,
    t`Contrôler les translations par la norme $L^2$ de la dérivée.`,
    'Appliquer le critère de Fréchet–Kolmogorov.',
  ],
  commonErrors: [
    { id: 'e-faible', description: 'Conclure à la convergence forte à partir d’une extraction faible.', concept: 'faible-fort' },
    { id: 'e-prolongement', description: t`Prolonger par zéro une fonction de $H^1(]0,1[)$ sans condition au bord.`, concept: 'hypotheses-theoreme' },
    { id: 'e-circulaire', description: 'Invoquer Rellich–Kondrachov pour démontrer son cas particulier.', concept: 'utilisation-prematuree' },
  ],
  hints: [
    t`Le critère est énoncé sur $\mathbb R$ : comment passer d'une fonction de $H^1_0(]0,1[)$ à une fonction définie sur $\mathbb R$ ?`,
    t`Après prolongement par zéro, majore $\|\tau_hv-v\|_{L^2(\mathbb R)}$ à l'aide de $v'$, d'abord pour une fonction test, puis par densité.`,
    t`$\|\tau_hv-v\|_{L^2}\le|h|\,\|v'\|_{L^2}$ : la borne $R$ sur les normes $H^1$ rend ce contrôle uniforme en $n$.`,
  ],
  rubric: rubric({
    hypotheses: t`La condition au bord est utilisée pour prolonger par zéro ; la borne $H^1$ est utilisée pour les translations.`,
    methode: 'Le critère de Fréchet–Kolmogorov est appliqué après vérification de ses deux hypothèses.',
    validite: 'L’estimation des translations est établie pour une fonction test, puis par densité.',
    justifications: 'Aucune confusion entre convergence faible et forte ; aucun usage du théorème démontré.',
    conclusion: 'La compacité de l’injection est établie.',
  }),
  variant: {
    statement: t`Montrer, par la seconde voie, que l'injection $H^1_0(]0,1[)\hookrightarrow C([0,1])$ est compacte.`,
    solution: t`Pour $v\in H^1_0(]0,1[)$, le représentant continu vérifie $|v(x)-v(y)|\le|x-y|^{1/2}\|v'\|_{L^2}$ et $|v(x)|\le\|v'\|_{L^2}$, inégalités établies pour les fonctions test puis étendues par convergence uniforme. Une suite bornée de $H^1_0(]0,1[)$ est donc uniformément bornée et équicontinue sur $[0,1]$ : par Arzelà–Ascoli, elle admet une sous-suite uniformément convergente.`,
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'rellich.difficile',
  theoremId: 'rellich',
  level: 'difficile',
  title: t`Échec de la compacité sur $\mathbb R^d$ : les translations`,
  statement: t`Soient $\varphi\in C^\infty_c(\mathbb R^d)$ non nulle, de support contenu dans $B(0,\rho)$, et $u_n(x)=\varphi(x-2n\rho e_1)$ pour $n\ge 1$. Montrer que l'injection $H^1(\mathbb R^d)\hookrightarrow L^2(\mathbb R^d)$ est continue, que $(u_n)$ est bornée dans $H^1(\mathbb R^d)$, et qu'aucune sous-suite de $(u_n)$ ne converge dans $L^2(\mathbb R^d)$. Expliquer pourquoi la compacité peut échouer sur $\mathbb R^d$.`,
  source: poly(40, 'Exercice 13, difficile'),
  prerequisites: ['distributions'],
  concepts: ['domaine-borne', 'faible-fort', 'bornee-non-convergente', 'compact-continue'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'supports', label: 'Supports disjoints : aucune sous-suite de Cauchy' },
      { id: 'faible', label: 'Limite faible nulle et norme constante' },
    ],
    nodes: [
      { id: 'h-Rd', kind: 'hypothese', text: t`L'ouvert est $\mathbb R^d$ tout entier : la mesure de Lebesgue y est invariante par translation.` },
      { id: 'd-phi', kind: 'definition', text: t`$\varphi\in C^\infty_c(\mathbb R^d)$, $\operatorname{supp}\varphi\subset B(0,\rho)$, et $u_n(x)=\varphi(x-2n\rho e_1)$ pour $n\ge 1$.` },
      { id: 'h-nz', kind: 'hypothese', text: t`$\varphi\ne 0$.` },
      { id: 'cont', kind: 'inegalite', text: t`$\|v\|_{L^2(\mathbb R^d)}\le\|v\|_{H^1(\mathbb R^d)}$ pour tout $v\in H^1(\mathbb R^d)$ : l'injection est continue.` },
      { id: 'iso', kind: 'egalite', text: t`$\|u_n\|_{H^1}=\|\varphi\|_{H^1}$ et $\|u_n\|_{L^2}=\|\varphi\|_{L^2}$ pour tout $n$ : $(u_n)$ est bornée dans $H^1(\mathbb R^d)$.` },
      { id: 'disj', kind: 'consequence', text: t`Pour $n\neq m$, les supports de $u_n$ et de $u_m$ sont disjoints.` },
      { id: 'dist', kind: 'egalite', text: t`Pour $n\neq m$ : $\|u_n-u_m\|_{L^2}^2=2\|\varphi\|_{L^2}^2$.` },
      { id: 'fa', kind: 'consequence', text: t`$u_n\rightharpoonup 0$ faiblement dans $L^2(\mathbb R^d)$.` },
      { id: 'nc', kind: 'consequence', text: t`Aucune sous-suite de $(u_n)$ ne converge dans $L^2(\mathbb R^d)$.` },
      { id: 'non-comp', kind: 'consequence', text: t`L'injection $H^1(\mathbb R^d)\hookrightarrow L^2(\mathbb R^d)$ n'est pas compacte.` },
      { id: 'fin', kind: 'conclusion', text: t`L'injection $H^1(\mathbb R^d)\hookrightarrow L^2(\mathbb R^d)$ est continue mais non compacte : la norme $L^2$ des translatées s'échappe à l'infini.` },

      // Propositions plausibles mais fausses.
      { id: 'x-faible-fort', kind: 'consequence', distractor: true, after: ['fa'], text: t`Puisque $u_n\rightharpoonup 0$, on a $\|u_n\|_{L^2}\to 0$.` },
      { id: 'x-rellich-Rd', kind: 'consequence', distractor: true, after: ['iso'], text: t`$(u_n)$ étant bornée dans $H^1(\mathbb R^d)$, Rellich–Kondrachov fournit une sous-suite convergente dans $L^2(\mathbb R^d)$.` },
    ],
    justifications: [
      { id: 'j-def-norme', label: t`Définition de la norme de $H^1$ : $\|v\|_{H^1}^2=\|v\|_{L^2}^2+\|\nabla v\|_{L^2}^2$.` },
      { id: 'j-transl', label: 'Changement de variable par translation dans les intégrales.' },
      { id: 'j-supports', label: t`$\operatorname{supp}u_n\subset B(2n\rho e_1,\rho)$, et ces boules sont disjointes pour $n\neq m$.` },
      { id: 'j-pyth', label: t`Supports disjoints : $\|u_n-u_m\|^2=\|u_n\|^2+\|u_m\|^2$.` },
      { id: 'j-faible', label: t`Pour $\psi\in C_c(\mathbb R^d)$, $\int u_n\psi=0$ dès que $n$ est grand ; densité de $C_c$ dans $L^2$ et bornitude de $(u_n)$.` },
      { id: 'j-cauchy', label: t`Une suite convergente est de Cauchy, ce qu'interdit $\|u_n-u_m\|=\sqrt2\,\|\varphi\|_{L^2}>0$.` },
      { id: 'j-limite-nulle', label: t`Une limite forte serait aussi limite faible, donc nulle, alors que $\|u_n\|_{L^2}=\|\varphi\|_{L^2}>0$.` },
      { id: 'j-def-comp', label: 'Définition d’une injection compacte : une suite bornée sans sous-suite convergente l’exclut.' },
      { id: 'j-syn', label: 'Réunion de la continuité et de la non-compacité.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-borne-suffit', label: 'Une suite bornée n’a jamais de sous-suite convergente en dimension infinie.' },
    ],
    rules: [
      { from: [], to: 'cont', by: 'j-def-norme' },
      { from: ['d-phi', 'h-Rd'], to: 'iso', by: 'j-transl' },
      { from: ['d-phi'], to: 'disj', by: 'j-supports' },
      { from: ['disj', 'iso'], to: 'dist', by: 'j-pyth', path: 'supports' },
      { from: ['dist', 'h-nz'], to: 'nc', by: 'j-cauchy', path: 'supports' },
      { from: ['iso', 'disj'], to: 'fa', by: 'j-faible', path: 'faible' },
      { from: ['fa', 'iso', 'h-nz'], to: 'nc', by: 'j-limite-nulle', path: 'faible' },
      { from: ['iso', 'nc'], to: 'non-comp', by: 'j-def-comp' },
      { from: ['cont', 'non-comp'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'nc',
        by: 'j-borne-suffit',
        verdict: 'incorrect',
        concept: 'bornee-non-convergente',
        message: 'Une suite bornée peut avoir des sous-suites convergentes, même en dimension infinie : il faut un argument propre à cette suite.',
        counterexample: t`Dans $\ell^2$, la suite constante égale à $e_1$ est bornée et convergente.`,
      },
      {
        conclusion: 'x-faible-fort',
        verdict: 'incorrect',
        concept: 'faible-fort',
        message: t`$u_n\rightharpoonup u$ n'entraîne pas $\|u_n-u\|\to 0$ : ici la norme reste constante.`,
        counterexample: t`$\|u_n\|_{L^2}=\|\varphi\|_{L^2}>0$ pour tout $n$.`,
      },
      {
        conclusion: 'x-rellich-Rd',
        verdict: 'incorrect',
        concept: 'domaine-borne',
        message: t`Rellich–Kondrachov suppose l'ouvert borné et lipschitzien ; $\mathbb R^d$ n'est pas borné.`,
        counterexample: t`La suite $(u_n)$ elle-même : bornée dans $H^1(\mathbb R^d)$, sans sous-suite convergente dans $L^2(\mathbb R^d)$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-Rd',
        label: t`Remplacer $\mathbb R^d$ par un ouvert borné`,
        necessary: true,
        explanation: t`Sur un ouvert borné lipschitzien, Rellich–Kondrachov rend l'injection compacte : les translatées finissent par sortir de l'ouvert.`,
        counterexample: t`Si $\Omega\subset B(0,r)$, alors $u_n=0$ sur $\Omega$ dès que $2n\rho>r+\rho$ : les restrictions convergent vers $0$.`,
      },
      {
        hypothesis: 'h-nz',
        label: t`Retirer $\varphi\neq 0$`,
        necessary: true,
        explanation: 'Avec la fonction nulle, la suite est constante et converge.',
        counterexample: t`$\varphi=0$ donne $u_n=0$ pour tout $n$.`,
      },
    ],
  },
  closedChecks: [
    { kind: 'rational', prompt: t`Pour $d=1$, $\varphi(x)=(1-|x|)^+$ (qui appartient à $H^1(\mathbb R)$) et $\rho=1$ : valeur de $\|u_n-u_m\|_{L^2}^2$ pour $n\neq m$`, expected: '4/3' },
  ],
  solution: t`**Continuité.** $\|v\|_{L^2}\le\|v\|_{H^1}$ par définition de la norme de $H^1$.

**Bornitude.** La mesure de Lebesgue étant invariante par translation, $\|u_n\|_{H^1}=\|\varphi\|_{H^1}$ et $\|u_n\|_{L^2}=\|\varphi\|_{L^2}$.

**Aucune sous-suite convergente.** Les supports $B(2n\rho e_1,\rho)$ sont deux à deux disjoints, donc $\|u_n-u_m\|_{L^2}^2=2\|\varphi\|_{L^2}^2>0$ pour $n\neq m$ : aucune sous-suite n'est de Cauchy. Autre argument : $u_n\rightharpoonup 0$ faiblement, donc une limite forte éventuelle serait nulle, ce qu'interdit $\|u_n\|_{L^2}=\|\varphi\|_{L^2}>0$.

**Interprétation.** Le contrôle des translations est uniforme, mais la norme $L^2$ s'échappe à l'infini : sur $\mathbb R^d$, l'injection est continue sans être compacte. Sur un ouvert borné, les translatées sortent de l'ouvert, et Rellich–Kondrachov rétablit la compacité.`,
  steps: [
    'Établir la continuité de l’injection.',
    'Montrer que les translatées sont bornées dans $H^1$.',
    'Montrer qu’aucune sous-suite ne converge : supports disjoints, ou limite faible nulle.',
    'Conclure à la non-compacité et l’interpréter.',
  ],
  commonErrors: [
    { id: 'e-rellich', description: t`Appliquer Rellich–Kondrachov sur $\mathbb R^d$.`, concept: 'domaine-borne' },
    { id: 'e-faible-fort', description: t`Déduire $\|u_n\|\to 0$ de $u_n\rightharpoonup 0$.`, concept: 'faible-fort' },
  ],
  hints: [
    t`Cherche une suite bornée dans $H^1(\mathbb R^d)$ dont les termes restent éloignés les uns des autres dans $L^2$.`,
    t`Translate une même fonction à support compact assez loin pour que les supports soient disjoints, et calcule $\|u_n-u_m\|_{L^2}$.`,
    t`$\|u_n-u_m\|_{L^2}^2=2\|\varphi\|_{L^2}^2$ : aucune sous-suite n'est de Cauchy. Alternativement, la limite faible est nulle alors que la norme est constante.`,
  ],
  rubric: rubric({
    hypotheses: t`L'invariance par translation de $\mathbb R^d$ et la non-nullité de $\varphi$ sont explicitement utilisées.`,
    methode: 'Une suite explicite, bornée dans $H^1$, sans sous-suite convergente dans $L^2$.',
    validite: 'Les normes sont calculées exactement ; convergences faible et forte sont distinguées.',
    justifications: 'Rellich–Kondrachov n’est pas invoqué hors de ses hypothèses.',
    conclusion: 'L’injection est continue et non compacte sur $\\mathbb R^d$.',
  }),
  variant: {
    statement: t`Montrer que l'injection $H^1(]0,+\infty[)\hookrightarrow L^2(]0,+\infty[)$ n'est pas compacte.`,
    solution: t`Soit $\varphi\in C^\infty_c(]0,1[)$ non nulle et $u_n(x)=\varphi(x-n)$, de support dans $]n,n+1[$. Les normes $H^1$ et $L^2$ de $u_n$ sont celles de $\varphi$ ; les supports sont disjoints, donc $\|u_n-u_m\|_{L^2}^2=2\|\varphi\|_{L^2}^2>0$ pour $n\ne m$. La suite est bornée dans $H^1(]0,+\infty[)$ et n'a aucune sous-suite convergente dans $L^2(]0,+\infty[)$.`,
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'd-phi', kind: 'definition', text: t`$\varphi\in C^\infty_c(]0,1[)$ et $u_n(x)=\varphi(x-n)$ pour $n\ge 1$.` },
        { id: 'h-nz', kind: 'hypothese', text: t`$\varphi\neq 0$.` },
        { id: 'in', kind: 'consequence', text: t`$u_n\in C^\infty_c(]n,n+1[)\subset H^1(]0,+\infty[)$.` },
        { id: 'iso', kind: 'egalite', text: t`$\|u_n\|_{H^1}=\|\varphi\|_{H^1}$ et $\|u_n\|_{L^2}=\|\varphi\|_{L^2}$.` },
        { id: 'dist', kind: 'egalite', text: t`$\|u_n-u_m\|_{L^2}^2=2\|\varphi\|_{L^2}^2>0$ pour $n\ne m$.` },
        { id: 'nc', kind: 'consequence', text: t`Aucune sous-suite de $(u_n)$ ne converge dans $L^2(]0,+\infty[)$.` },
        { id: 'fin', kind: 'conclusion', text: t`L'injection $H^1(]0,+\infty[)\hookrightarrow L^2(]0,+\infty[)$ n'est pas compacte.` },
        { id: 'x-rellich', kind: 'consequence', distractor: true, text: t`Par Rellich–Kondrachov, $(u_n)$ a une sous-suite convergente dans $L^2(]0,+\infty[)$.` },
      ],
      justifications: [
        { id: 'j-support', label: t`Le support de $\varphi$ est un compact de $]0,1[$, translaté dans $]n,n+1[$.` },
        { id: 'j-transl', label: 'Changement de variable par translation.' },
        { id: 'j-pyth', label: t`Supports disjoints, puis $\varphi\ne 0$.` },
        { id: 'j-cauchy', label: 'Une suite convergente est de Cauchy.' },
        { id: 'j-def-comp', label: 'Suite bornée sans sous-suite convergente : définition d’une injection non compacte.' },
      ],
      rules: [
        { from: ['d-phi'], to: 'in', by: 'j-support' },
        { from: ['in'], to: 'iso', by: 'j-transl' },
        { from: ['in', 'iso', 'h-nz'], to: 'dist', by: 'j-pyth' },
        { from: ['dist'], to: 'nc', by: 'j-cauchy' },
        { from: ['iso', 'nc'], to: 'fin', by: 'j-def-comp' },
      ],
      traps: [
        {
          conclusion: 'x-rellich',
          verdict: 'incorrect',
          concept: 'domaine-borne',
          message: t`$]0,+\infty[$ n'est pas borné : Rellich–Kondrachov ne s'applique pas.`,
          counterexample: t`$\|u_n-u_m\|_{L^2}^2=2\|\varphi\|_{L^2}^2$ pour $n\ne m$.`,
        },
      ],
      removable: [
        {
          hypothesis: 'h-nz',
          label: t`Retirer $\varphi\neq 0$`,
          necessary: true,
          explanation: 'La suite nulle converge.',
          counterexample: t`$\varphi=0$ donne $u_n=0$.`,
        },
      ],
    },
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT13: TheoremModule = {
  theorem: {
    id: 'rellich',
    spaces: [
      t`$\Omega\subset\mathbb R^d$ : ouvert borné lipschitzien.`,
      t`$H^1(\Omega)$ muni de sa norme, et $L^2(\Omega)$ muni de la sienne (topologies fortes).`,
    ],
    hypotheses: [
      {
        id: 'h-borne',
        text: t`$\Omega$ est borné.`,
        whenRemoved: t`Sur $\mathbb R^d$, les translatées $\varphi(x-2n\rho e_1)$ d'une fonction test non nulle, de support contenu dans $B(0,\rho)$, sont bornées dans $H^1$ et vérifient $\|u_n-u_m\|_{L^2}^2=2\|\varphi\|_{L^2}^2$ : aucune sous-suite ne converge.`,
      },
      { id: 'h-lipschitz', text: t`$\Omega$ est lipschitzien.` },
    ],
    statement: t`Si $\Omega$ est borné lipschitzien, l'injection
$$H^1(\Omega)\hookrightarrow\hookrightarrow L^2(\Omega)$$
est compacte : toute suite bornée en $H^1$ possède une sous-suite fortement convergente dans $L^2$.`,
    conclusions: {
      autre: t`Compacité de l'injection : extraction d'une sous-suite convergeant fortement dans $L^2(\Omega)$. Aucune convergence forte dans $H^1(\Omega)$ n'est affirmée.`,
    },
    sourceProof: 'idee',
    proofOutline: [
      t`Prolonger les fonctions de $H^1(\Omega)$ à $\mathbb R^d$ (le bord lipschitzien le permet).`,
      t`Contrôler les translations par les gradients : $\|\tau_hv-v\|_{L^2}\le|h|\,\|\nabla v\|_{L^2}$.`,
      'Conclure par un critère de compacité de type Fréchet–Kolmogorov.',
    ],
    warnings: [
      t`Sur un ouvert non borné, l'injection $H^1\hookrightarrow L^2$ peut n'être que continue : c'est le cas sur $\mathbb R^d$.`,
      t`La compacité donne une sous-suite convergente dans $L^2$, pas dans $H^1$ : $\sin(n\pi x)/(n\pi)$ tend vers $0$ dans $L^2(]0,1[)$, sans converger dans $H^1$.`,
      'Une suite bornée en dimension infinie n’a pas, en général, de sous-suite fortement convergente : la compacité est une propriété de l’injection.',
    ],
    usefulFor: 'Obtenir une convergence forte spatiale par extraction, et passer à la limite dans des termes non linéaires d’ordre zéro.',
    verification: { origin: 'polycopie', review: 'machine', notes: 'Énoncé du polycopié ; la démonstration n’y figure qu’en idée.' },
  },
  definitions: [
    {
      id: 'rellich-injection-compacte',
      term: 'Injection compacte',
      statement: t`Une injection continue $X\hookrightarrow Y$ entre espaces de Banach est compacte si toute suite bornée de $X$ admet une sous-suite convergente dans $Y$, c'est-à-dire si l'image de la boule unité de $X$ est relativement compacte dans $Y$.`,
      source: poly(15, 'Section 3.7, compacité spatiale'),
    },
  ],
  concepts: [],
  counterexamples: [
    {
      id: 'ce-rellich-translations',
      theoremId: 'rellich',
      title: 'Translations sur la droite',
      claim: t`L'injection $H^1(\mathbb R)\hookrightarrow L^2(\mathbb R)$ est compacte.`,
      correctStatement: t`Rellich–Kondrachov suppose l'ouvert borné lipschitzien ; sur $\mathbb R$, l'injection est seulement continue.`,
      task: t`Avec $\varphi(x)=(1-|x|)^+\in H^1(\mathbb R)$ et $u_n(x)=\varphi(x-2n)$, calcule $\|u_n-u_m\|_{L^2}^2$ pour $n\neq m$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\|u_n-u_m\|_{L^2}^2$`, expected: '4/3' },
      explanation: t`Les supports $[2n-1,2n+1]$ se rencontrent au plus en un point, donc $\|u_n-u_m\|_{L^2}^2=2\|\varphi\|_{L^2}^2=2\cdot\tfrac23=\tfrac43$. La suite est bornée dans $H^1(\mathbb R)$ et n'a aucune sous-suite convergente dans $L^2(\mathbb R)$.`,
      concept: 'domaine-borne',
      source: poly(15, 'Lecture géométrique, section 3.7'),
    },
    {
      id: 'ce-rellich-H1-fort',
      theoremId: 'rellich',
      title: t`Pas de convergence forte dans $H^1$`,
      claim: t`Toute suite bornée de $H^1_0(]0,1[)$ admet une sous-suite convergente dans $H^1_0(]0,1[)$.`,
      correctStatement: t`La compacité porte sur l'injection dans $L^2$ : la sous-suite converge dans $L^2$, pas dans $H^1$.`,
      task: t`Pour $u_n(x)=\sin(n\pi x)/(n\pi)$, calcule $\|u_n'-u_m'\|_{L^2(]0,1[)}^2$ pour $n\ne m$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\|u_n'-u_m'\|_{L^2}^2$`, expected: '1' },
      explanation: t`$u_n'(x)=\cos(n\pi x)$, et les $\cos(n\pi x)$ sont orthogonaux de norme $1/\sqrt2$ : $\|u_n'-u_m'\|^2=\tfrac12+\tfrac12=1$. Aucune sous-suite n'est de Cauchy dans $H^1$, alors que $\|u_n\|_{L^2}\to 0$.`,
      concept: 'compact-continue',
      source: poly(15, 'Énoncé de la section 3.7'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT13;
