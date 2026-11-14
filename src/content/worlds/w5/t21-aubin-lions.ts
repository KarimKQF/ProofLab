/**
 * Résultat 21 — Aubin–Lions.
 * Le polycopié n'en donne qu'une idée de preuve (p. PDF 21). Les exercices travaillent ce
 * qui est démontrable : le triplet compact, l'application du lemme en distinguant compacité
 * spatiale, contrôle temporel et convergence obtenue, et le passage à la limite dans une
 * non-linéarité lipschitzienne (section 8.7, p. PDF 33).
 */
import { t, rubric, poly, complement, FROM_POLY, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'aubin-lions.facile',
  theoremId: 'aubin-lions',
  level: 'facile',
  title: t`Le triplet $H^1_0\hookrightarrow\hookrightarrow L^2\hookrightarrow H^{-1}$`,
  statement: t`Soit $\Omega\subset\mathbb R^d$ un ouvert borné lipschitzien. Énoncer précisément le triplet $H^1_0(\Omega)\hookrightarrow\hookrightarrow L^2(\Omega)\hookrightarrow H^{-1}(\Omega)$ : démontrer que la première injection est compacte, que l'identification $f\mapsto\big(v\mapsto\int_\Omega fv\big)$ réalise une injection linéaire continue de $L^2(\Omega)$ dans $H^{-1}(\Omega)$, et que la compacité tombe en défaut sur $\mathbb R^d$.`,
  source: poly(42, 'Exercice 21, facile ; Rellich, p. PDF 15'),
  prerequisites: ['poincare'],
  concepts: ['compact-continue', 'domaine-borne', 'aubin-lions-roles', 'dual-identification'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-Om', kind: 'hypothese', text: t`$\Omega\subset\mathbb R^d$ est un ouvert borné lipschitzien.` },
      { id: 'd-V', kind: 'definition', text: t`$V=H^1_0(\Omega)$, normé par $\|v\|_V=\|\nabla v\|_{L^2(\Omega)}$ ; $H=L^2(\Omega)$ ; $V'=H^{-1}(\Omega)$, dual topologique de $V$.` },
      { id: 'd-iota', kind: 'definition', text: t`$\iota:H\to V'$ est défini par $\langle\iota f,v\rangle_{V',V}=\int_\Omega fv$.` },
      { id: 'p-poincare', kind: 'application-theoreme', text: t`Il existe $C_P$ tel que $\|v\|_{L^2(\Omega)}\le C_P\|v\|_V$ pour tout $v\in V$.` },
      { id: 'c-rellich', kind: 'application-theoreme', text: t`L'injection $H^1(\Omega)\hookrightarrow L^2(\Omega)$ est compacte.` },
      { id: 'c-compact', kind: 'consequence', text: t`L'injection $V\hookrightarrow H$ est compacte.` },
      { id: 'i-cont', kind: 'inegalite', text: t`$\|\iota f\|_{V'}\le C_P\|f\|_{L^2(\Omega)}$ : $\iota$ est linéaire continue.` },
      { id: 'i-inj', kind: 'consequence', text: t`$\iota$ est injective : $L^2(\Omega)$ s'identifie à un sous-espace de $H^{-1}(\Omega)$.` },
      { id: 'd-tr', kind: 'definition', text: t`Sur $\mathbb R^d$ : $\varphi\in C^\infty_c(\mathbb R^d)\setminus\{0\}$ à support dans $B(0,R/2)$, et $u_n=\varphi(\cdot-nRe_1)$.` },
      {
        id: 'n-sep',
        kind: 'egalite',
        text: t`$\|u_n\|_{H^1(\mathbb R^d)}=\|\varphi\|_{H^1(\mathbb R^d)}$ et, pour $n\neq m$, $\|u_n-u_m\|_{L^2}^2=2\|\varphi\|_{L^2}^2$.`,
        masked: t`Valeur de $\|u_n-u_m\|_{L^2}^2$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\|u_n-u_m\|_{L^2}^2/\|\varphi\|_{L^2}^2$ pour $n\neq m$`, expected: '2' },
      },
      { id: 'n-noncomp', kind: 'consequence', text: t`L'injection $H^1(\mathbb R^d)=H^1_0(\mathbb R^d)\hookrightarrow L^2(\mathbb R^d)$ n'est pas compacte.` },
      { id: 'fin', kind: 'conclusion', text: t`$H^1_0(\Omega)\hookrightarrow\hookrightarrow L^2(\Omega)\hookrightarrow H^{-1}(\Omega)$ : la première injection est compacte, la seconde, $f\mapsto\iota f$, est linéaire continue et injective ; sur $\mathbb R^d$, la première n'est plus compacte.` },
      // Propositions plausibles mais fausses.
      { id: 'x-partout', kind: 'consequence', distractor: true, text: t`$H^1_0(\Omega)\hookrightarrow L^2(\Omega)$ est compacte pour tout ouvert $\Omega\subset\mathbb R^d$.` },
      { id: 'x-egal', kind: 'consequence', distractor: true, after: ['i-inj'], text: t`$\iota$ est surjective : $H^{-1}(\Omega)=L^2(\Omega)$.` },
      { id: 'x-place', kind: 'consequence', distractor: true, text: t`Dans le lemme d'Aubin–Lions, c'est l'injection $L^2(\Omega)\hookrightarrow H^{-1}(\Omega)$ qui doit être compacte ; la première peut n'être que continue.` },
    ],
    justifications: [
      { id: 'j-poincare', label: t`Inégalité de Poincaré sur l'ouvert borné $\Omega$.`, theorem: 'poincare' },
      { id: 'j-rellich', label: 'Théorème de Rellich–Kondrachov (ouvert borné lipschitzien).', theorem: 'rellich' },
      { id: 'j-compo', label: t`$\|v\|_{H^1}\le(1+C_P^2)^{1/2}\|v\|_V$ : composée d'une injection continue et d'une injection compacte.` },
      { id: 'j-cs', label: t`$\big|\int_\Omega fv\big|\le\|f\|_{L^2}\|v\|_{L^2}\le C_P\|f\|_{L^2}\|v\|_V$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-dense', label: t`Si $\int_\Omega fv=0$ pour tout $v\in C^\infty_c(\Omega)\subset V$, la densité de $C^\infty_c(\Omega)$ dans $L^2(\Omega)$ donne $f=0$.`, theorem: 'densite-cinf' },
      { id: 'j-translation', label: t`Invariance des normes par translation ; supports disjoints dès que $n\neq m$.` },
      { id: 'j-non-cauchy', label: 'Une suite bornée dont aucune sous-suite n’est de Cauchy contredit la compacité.' },
      { id: 'j-synthese', label: 'Réunion des propriétés établies.' },
      { id: 'j-continue-compacte', label: 'Une injection continue entre espaces de Hilbert est compacte.' },
    ],
    rules: [
      { from: ['h-Om', 'd-V'], to: 'p-poincare', by: 'j-poincare' },
      { from: ['h-Om'], to: 'c-rellich', by: 'j-rellich' },
      { from: ['c-rellich', 'p-poincare'], to: 'c-compact', by: 'j-compo' },
      { from: ['d-iota', 'p-poincare'], to: 'i-cont', by: 'j-cs' },
      { from: ['d-iota', 'd-V'], to: 'i-inj', by: 'j-dense' },
      { from: ['d-tr'], to: 'n-sep', by: 'j-translation' },
      { from: ['n-sep'], to: 'n-noncomp', by: 'j-non-cauchy' },
      { from: ['c-compact', 'i-cont', 'i-inj', 'n-noncomp'], to: 'fin', by: 'j-synthese' },
    ],
    traps: [
      {
        conclusion: 'c-compact',
        by: 'j-continue-compacte',
        verdict: 'incorrect',
        concept: 'compact-continue',
        message: 'Une injection continue envoie les bornés sur des bornés, pas sur des relativement compacts.',
        counterexample: t`L'identité de $L^2(\Omega)$ est continue et non compacte : une suite orthonormée n'a aucune sous-suite convergente.`,
      },
      {
        conclusion: 'x-partout',
        verdict: 'incorrect',
        concept: 'domaine-borne',
        message: 'La compacité de Rellich exige un domaine borné : des translations font fuir la masse à l’infini.',
        counterexample: t`Sur $\mathbb R^d$, $u_n=\varphi(\cdot-nRe_1)$ est bornée dans $H^1$ et $\|u_n-u_m\|_{L^2}^2=2\|\varphi\|_{L^2}^2$ pour $n\neq m$.`,
      },
      {
        conclusion: 'x-egal',
        verdict: 'incorrect',
        concept: 'dual-identification',
        message: t`$H^{-1}(\Omega)$ contient strictement $L^2(\Omega)$.`,
        counterexample: t`Sur $\Omega=]0,1[$, $H^1_0\subset C([0,1])$ et $v\mapsto v(1/2)$ appartient à $H^{-1}$ ; si $\int_0^1fv=v(1/2)$ pour toute $v\in C^\infty_c(]0,1[)$, alors $f=0$ hors de $1/2$, donc $f=0$, ce qui est absurde.`,
      },
      {
        conclusion: 'x-place',
        verdict: 'incorrect',
        concept: 'aubin-lions-roles',
        message: t`Dans $X_0\hookrightarrow\hookrightarrow X\hookrightarrow X_1$, c'est l'injection de l'espace de la borne spatiale dans l'espace de convergence qui doit être compacte.`,
        counterexample: t`$X_0=X=L^2(]0,1[)$, $X_1=H^{-1}(]0,1[)$ : $L^2\hookrightarrow H^{-1}$ est compacte, mais $u_n(t,x)=\sqrt2\sin(n\pi x)$ vérifie $u_n'=0$ et $\|u_n-u_m\|_{L^2(0,T;L^2)}^2=2T$ pour $n\neq m$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-Om',
        label: 'Retirer la bornitude du domaine',
        necessary: true,
        explanation: 'Rellich et Poincaré utilisent la bornitude de Ω ; sans elle, la compacité est perdue.',
        counterexample: t`Sur $\mathbb R^d$, les translatés $\varphi(\cdot-nRe_1)$ sont bornés dans $H^1$ et deux à deux à distance $\sqrt2\|\varphi\|_{L^2}$ dans $L^2$.`,
      },
    ],
  },
  closedChecks: [
    {
      kind: 'choice',
      prompt: t`Dans le lemme d'Aubin–Lions $X_0\hookrightarrow\hookrightarrow X\hookrightarrow X_1$, quelle injection doit être compacte ?`,
      options: [t`$X_0\hookrightarrow X$`, t`$X\hookrightarrow X_1$`, 'Les deux', t`Aucune : la borne sur $u_n'$ suffit`],
      correct: [0],
      explanation: t`La compacité spatiale porte sur $X_0\hookrightarrow X$ ; l'injection $X\hookrightarrow X_1$ n'a besoin que d'être continue.`,
    },
  ],
  solution: t`**Compacité.** Par Poincaré, $\|v\|_{L^2}\le C_P\|\nabla v\|_{L^2}$ sur $V=H^1_0(\Omega)$, donc $\|v\|_{H^1}\le(1+C_P^2)^{1/2}\|v\|_V$ : l'injection $V\hookrightarrow H^1(\Omega)$ est continue. Rellich donne $H^1(\Omega)\hookrightarrow\hookrightarrow L^2(\Omega)$ ; la composée $V\hookrightarrow L^2(\Omega)$ est compacte.

**Identification de $L^2$ dans $H^{-1}$.** Pour $f\in L^2(\Omega)$, $\iota f:v\mapsto\int_\Omega fv$ vérifie $|\langle\iota f,v\rangle|\le\|f\|_{L^2}\|v\|_{L^2}\le C_P\|f\|_{L^2}\|v\|_V$ : $\iota f\in H^{-1}(\Omega)$ et $\|\iota f\|_{H^{-1}}\le C_P\|f\|_{L^2}$. Si $\iota f=0$, alors $\int_\Omega fv=0$ pour toute $v\in C^\infty_c(\Omega)$, dense dans $L^2(\Omega)$, donc $f=0$.

**Rôle de la bornitude.** Sur $\mathbb R^d$, $u_n=\varphi(\cdot-nRe_1)$ est bornée dans $H^1$, et les supports étant disjoints pour $n\neq m$, $\|u_n-u_m\|_{L^2}^2=2\|\varphi\|_{L^2}^2$ : aucune sous-suite n'est de Cauchy.

**Ce que retient Aubin–Lions.** Seule l'injection $H^1_0\hookrightarrow L^2$ doit être compacte ; $L^2\hookrightarrow H^{-1}$ ne sert que comme injection continue, pour donner un sens à la borne sur $u_n'$. Elle n'est pas surjective : la distribution de Dirac en $1/2$ appartient à $H^{-1}(]0,1[)$ sans être une fonction de $L^2$.`,
  steps: [
    t`Établir l'injection continue $H^1_0\hookrightarrow H^1$ (Poincaré), puis la compacité par Rellich.`,
    t`Construire $\iota:L^2\to H^{-1}$, borner sa norme.`,
    'Démontrer l’injectivité par densité.',
    t`Réfuter la compacité sur $\mathbb R^d$ par translations.`,
  ],
  commonErrors: [
    { id: 'e-place', description: 'Placer la compacité sur la mauvaise injection du triplet.', concept: 'aubin-lions-roles' },
    { id: 'e-borne', description: 'Oublier que la compacité de Rellich exige un domaine borné.', concept: 'domaine-borne' },
    { id: 'e-egal', description: t`Identifier $H^{-1}$ à $L^2$.`, concept: 'dual-identification' },
  ],
  hints: [
    t`Quelles sont les trois normes en jeu, et laquelle des deux injections est compacte ?`,
    t`Pour la compacité, combine Poincaré et Rellich ; pour l'injection $L^2\hookrightarrow H^{-1}$, écris $\langle\iota f,v\rangle=\int_\Omega fv$ et majore.`,
    t`Sur $\mathbb R^d$, translate une même fonction à support compact : la norme $H^1$ ne change pas, la distance $L^2$ entre deux translatés reste fixe.`,
  ],
  rubric: rubric({
    hypotheses: 'La bornitude et la régularité lipschitzienne de Ω sont utilisées là où elles servent.',
    methode: 'La compacité est obtenue par Rellich, l’injection continue par Cauchy–Schwarz et Poincaré.',
    validite: 'L’injectivité de l’identification est démontrée par densité.',
    justifications: 'La non-compacité sur un domaine non borné est démontrée par un contre-exemple vérifié.',
    conclusion: 'Le triplet est énoncé avec la nature exacte de chaque injection.',
  }),
  variant: {
    statement: t`Soit $\Omega$ borné lipschitzien. Énoncer le triplet $H^1(\Omega)\hookrightarrow\hookrightarrow L^2(\Omega)\hookrightarrow(H^1(\Omega))'$ utilisé pour la condition de Neumann, et montrer que $(H^1(\Omega))'$ ne s'identifie pas à $H^{-1}(\Omega)$.`,
    solution: t`Rellich donne la compacité de $H^1(\Omega)\hookrightarrow L^2(\Omega)$. Pour $f\in L^2$, $v\mapsto\int_\Omega fv$ est continue sur $H^1(\Omega)$, de norme au plus $\|f\|_{L^2}$, et l'application est injective car $H^1(\Omega)$ est dense dans $L^2(\Omega)$. La forme $v\mapsto\int_{\partial\Omega}\gamma v$, où $\gamma$ est la trace, appartient à $(H^1(\Omega))'$ et s'annule sur $H^1_0(\Omega)$ sans être nulle : la restriction de $(H^1)'$ à $H^1_0$ n'est pas injective, donc $(H^1(\Omega))'$ et $H^{-1}(\Omega)$ sont des espaces différents.`,
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'aubin-lions.intermediaire',
  theoremId: 'aubin-lions',
  level: 'intermediaire',
  title: t`Deux bornes uniformes, une convergence forte`,
  statement: t`Soient $\Omega\subset\mathbb R^d$ un ouvert borné lipschitzien, $T>0$ et $(u_n)\subset L^2(0,T;H^1_0(\Omega))$ avec $u_n'\in L^2(0,T;H^{-1}(\Omega))$, telles que $\|u_n\|_{L^2(0,T;H^1_0(\Omega))}\le C_1$ et $\|u_n'\|_{L^2(0,T;H^{-1}(\Omega))}\le C_2$ pour tout $n$. Déduire qu'une sous-suite converge fortement dans $L^2(0,T;L^2(\Omega))$ vers un $u$, qui est aussi sa limite faible dans $L^2(0,T;H^1_0(\Omega))$, en distinguant compacité spatiale, contrôle temporel et convergence obtenue.`,
  source: poly(42, 'Exercice 21, intermédiaire ; schéma de la section 5.3 (p. PDF 21) et section 8.4 (p. PDF 32)'),
  prerequisites: [],
  concepts: ['temps-compacite', 'compact-continue', 'aubin-lions-roles', 'aubin-lions-espace-cible', 'faible-fort'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-Om', kind: 'hypothese', text: t`$\Omega\subset\mathbb R^d$ est un ouvert borné lipschitzien et $T>0$.` },
      { id: 'h-sp', kind: 'hypothese', text: t`Contrôle spatial : $\|u_n\|_{L^2(0,T;H^1_0(\Omega))}\le C_1$ pour tout $n$.` },
      { id: 'h-tp', kind: 'hypothese', text: t`Contrôle temporel : $\|u_n'\|_{L^2(0,T;H^{-1}(\Omega))}\le C_2$ pour tout $n$.` },
      { id: 'c-spatial', kind: 'application-theoreme', text: t`Compacité spatiale : l'injection $H^1_0(\Omega)\hookrightarrow L^2(\Omega)$ est compacte.` },
      { id: 'c-cont', kind: 'consequence', text: t`L'injection $L^2(\Omega)\hookrightarrow H^{-1}(\Omega)$ est continue.` },
      {
        id: 'c-expo',
        kind: 'egalite',
        text: t`Avec $X_0=H^1_0(\Omega)$, $X=L^2(\Omega)$, $X_1=H^{-1}(\Omega)$ : $p=q=2$, et $1<p,q<\infty$.`,
        masked: t`Exposants $p$ et $q$ du lemme : à identifier.`,
        check: { kind: 'rational-vector', prompt: t`Exposants $(p,q)$ du lemme d'Aubin–Lions`, expected: ['2', '2'], labels: ['p', 'q'] },
      },
      { id: 'al', kind: 'application-theoreme', text: t`$(u_n)$ est relativement compacte dans $L^2(0,T;L^2(\Omega))$.` },
      { id: 'sub', kind: 'consequence', text: t`Il existe une sous-suite $(u_{n_k})$ et $u\in L^2(0,T;L^2(\Omega))$ avec $u_{n_k}\to u$ fortement dans $L^2(0,T;L^2(\Omega))$.` },
      { id: 'weak', kind: 'application-theoreme', text: t`Quitte à extraire encore, $u_{n_k}\rightharpoonup\tilde u$ faiblement dans $L^2(0,T;H^1_0(\Omega))$.` },
      { id: 'ident', kind: 'egalite', text: t`$\tilde u=u$ : la limite forte dans $L^2(0,T;L^2)$ est la limite faible dans $L^2(0,T;H^1_0)$.` },
      { id: 'fin', kind: 'conclusion', text: t`Une sous-suite vérifie $u_{n_k}\to u$ fortement dans $L^2(0,T;L^2(\Omega))$ et $u_{n_k}\rightharpoonup u$ faiblement dans $L^2(0,T;H^1_0(\Omega))$.` },
      // Propositions plausibles mais fausses.
      { id: 'x-sans-temps', kind: 'consequence', distractor: true, text: t`Le contrôle spatial seul, $\|u_n\|_{L^2(0,T;H^1_0)}\le C_1$, suffit à extraire une sous-suite fortement convergente dans $L^2(0,T;L^2)$.` },
      { id: 'x-cv-V', kind: 'consequence', distractor: true, after: ['sub'], text: t`Une sous-suite converge fortement dans $L^2(0,T;H^1_0(\Omega))$.` },
      { id: 'x-C', kind: 'consequence', distractor: true, after: ['sub'], text: t`Une sous-suite converge fortement dans $C([0,T];L^2(\Omega))$.` },
    ],
    justifications: [
      { id: 'j-rellich', label: 'Théorème de Rellich–Kondrachov, puis Poincaré pour la norme du gradient.', theorem: 'rellich' },
      { id: 'j-dual', label: t`$\big|\int_\Omega fv\big|\le\|f\|_{L^2}\|v\|_{L^2}\le C_P\|f\|_{L^2}\|v\|_{H^1_0}$.` },
      { id: 'j-expo', label: 'Lecture des espaces de Bochner dans les deux bornes.' },
      { id: 'j-aubin', label: t`Lemme d'Aubin–Lions : compacité de $X_0\hookrightarrow X$, continuité de $X\hookrightarrow X_1$, bornes dans $L^p(0,T;X_0)$ et sur $u_n'$ dans $L^q(0,T;X_1)$.`, theorem: 'aubin-lions' },
      { id: 'j-relcomp', label: 'Définition de la compacité relative dans un espace métrique : toute suite admet une sous-suite convergente.' },
      { id: 'j-extraction', label: t`$L^2(0,T;H^1_0(\Omega))$ est un espace de Hilbert : extraction faible en espace réflexif.`, theorem: 'extraction-reflexive' },
      { id: 'j-ident', label: t`L'injection continue $L^2(0,T;H^1_0)\hookrightarrow L^2(0,T;L^2)$ transporte la convergence faible ; la convergence forte entraîne la faible ; une limite faible est unique.` },
      { id: 'j-synthese', label: 'Réunion des deux convergences de la même sous-suite.' },
      { id: 'j-rellich-seul', label: t`Rellich, appliqué à chaque instant $t$, donne la compacité dans $L^2(0,T;L^2(\Omega))$.` },
      { id: 'j-temps-spatial', label: t`La borne sur $u_n'$ fournit la compacité en espace.` },
    ],
    rules: [
      { from: ['h-Om'], to: 'c-spatial', by: 'j-rellich' },
      { from: ['h-Om'], to: 'c-cont', by: 'j-dual' },
      { from: ['h-sp', 'h-tp'], to: 'c-expo', by: 'j-expo' },
      { from: ['c-spatial', 'c-cont', 'c-expo', 'h-sp', 'h-tp'], to: 'al', by: 'j-aubin' },
      { from: ['al'], to: 'sub', by: 'j-relcomp' },
      { from: ['sub', 'h-sp'], to: 'weak', by: 'j-extraction' },
      { from: ['sub', 'weak'], to: 'ident', by: 'j-ident' },
      { from: ['sub', 'weak', 'ident'], to: 'fin', by: 'j-synthese' },
    ],
    traps: [
      {
        conclusion: 'al',
        by: 'j-rellich-seul',
        verdict: 'incorrect',
        concept: 'temps-compacite',
        message: 'La compacité à chaque instant ne contrôle pas les oscillations en temps : c’est le rôle de la borne sur la dérivée.',
        counterexample: t`$T=1$, $\varphi\in H^1_0(\Omega)$ avec $\|\varphi\|_{L^2}=1$, $u_n(t,x)=\sin(2\pi nt)\varphi(x)$ : bornée dans $L^2(0,1;H^1_0)$, $u_n\rightharpoonup 0$, mais $\|u_n\|_{L^2(0,1;L^2)}^2=\tfrac12$ ; ici $\|u_n'\|_{L^2(0,1;H^{-1})}\to\infty$.`,
      },
      {
        conclusion: 'c-spatial',
        by: 'j-temps-spatial',
        verdict: 'incorrect',
        concept: 'aubin-lions-roles',
        message: 'La borne sur la dérivée temporelle contrôle les translations en temps ; la compacité en espace vient de l’injection compacte.',
      },
      {
        conclusion: 'x-sans-temps',
        verdict: 'incorrect',
        concept: 'temps-compacite',
        message: 'Sans contrôle temporel, la suite peut osciller en temps.',
        counterexample: t`$u_n(t,x)=\sin(2\pi nt)\varphi(x)$ sur $]0,1[$ : si une sous-suite convergeait fortement, sa limite serait la limite faible $0$, alors que $\|u_n\|_{L^2(0,1;L^2)}^2=\tfrac12\|\varphi\|_{L^2}^2$.`,
      },
      {
        conclusion: 'x-cv-V',
        verdict: 'incorrect',
        concept: 'aubin-lions-espace-cible',
        message: t`La convergence forte a lieu dans $L^p(0,T;X)$, pas dans $L^p(0,T;X_0)$.`,
        counterexample: t`$\Omega=]0,1[$, $u_n=\tfrac{\sqrt2}{n\pi}\sin(n\pi x)$, indépendante de $t$ : $\|u_n\|_{H^1_0}=1$, $u_n'=0$, $u_n\to 0$ dans $L^2(0,T;L^2)$, mais $\|u_n\|_{L^2(0,T;H^1_0)}^2=T$.`,
      },
      {
        conclusion: 'x-C',
        verdict: 'incorrect',
        concept: 'aubin-lions-espace-cible',
        message: t`Avec ces exposants, le lemme ne donne pas la compacité dans $C([0,T];L^2)$.`,
        counterexample: t`$\Omega=]0,1[$, $\varphi_n=\sqrt2\sin(n\pi x)$, $\lambda_n=(n\pi)^2$, $u_n(t)=e^{-\lambda_nt}\varphi_n$ : les deux bornes valent au plus $\tfrac12$ au carré, $u_n\to 0$ dans $L^2(0,T;L^2)$, mais $\|u_n(0)\|_{L^2}=1$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-tp',
        label: 'Retirer le contrôle temporel',
        necessary: true,
        explanation: 'Sans borne sur la dérivée temporelle, les oscillations en temps empêchent toute convergence forte.',
        counterexample: t`$u_n(t,x)=\sin(2\pi nt)\varphi(x)$ sur $]0,1[$, $\|\varphi\|_{L^2}=1$ : $\|u_n-u_m\|_{L^2(0,1;L^2)}^2=1$ pour $n\neq m$.`,
      },
      {
        hypothesis: 'h-sp',
        label: 'Retirer le contrôle spatial',
        necessary: true,
        explanation: 'Sans borne dans l’espace compactement injecté, rien n’empêche les oscillations en espace.',
        counterexample: t`$\Omega=]0,1[$, $u_n(t,x)=\sqrt2\sin(n\pi x)$ : $u_n'=0$, bornée dans $L^2(0,T;L^2)$, et $\|u_n-u_m\|_{L^2(0,T;L^2)}^2=2T$ pour $n\neq m$.`,
      },
      {
        hypothesis: 'h-Om',
        label: 'Retirer la bornitude du domaine',
        necessary: true,
        explanation: t`L'injection $H^1_0\hookrightarrow L^2$ n'est plus compacte.`,
        counterexample: t`Sur $\mathbb R^d$, $u_n(t,x)=\varphi(x-nRe_1)$ : $u_n'=0$, bornée dans $L^2(0,T;H^1)$, et $\|u_n-u_m\|_{L^2(0,T;L^2)}^2=2T\|\varphi\|_{L^2}^2$.`,
      },
    ],
  },
  closedChecks: [
    { kind: 'rational', prompt: t`Pour $\|\varphi\|_{L^2}=1$ et $n\ge 1$, valeur de $\|\sin(2\pi n\cdot)\varphi\|_{L^2(0,1;L^2(\Omega))}^2$`, expected: '1/2' },
  ],
  solution: t`**Les trois ingrédients.** Compacité spatiale : $H^1_0(\Omega)\hookrightarrow L^2(\Omega)$ est compacte (Rellich, Ω borné lipschitzien). Continuité : $L^2(\Omega)\hookrightarrow H^{-1}(\Omega)$, avec $\|f\|_{H^{-1}}\le C_P\|f\|_{L^2}$. Contrôle temporel : la borne de $u_n'$ dans $L^2(0,T;H^{-1})$. Les exposants sont $p=q=2$.

**Application du lemme.** Avec $X_0=H^1_0$, $X=L^2$, $X_1=H^{-1}$, le lemme d'Aubin–Lions donne la compacité relative de $(u_n)$ dans $L^2(0,T;L^2(\Omega))$ : une sous-suite converge fortement vers $u$.

**Identification.** $L^2(0,T;H^1_0)$ étant un espace de Hilbert, on extrait encore : $u_{n_k}\rightharpoonup\tilde u$ dans $L^2(0,T;H^1_0)$. L'injection continue dans $L^2(0,T;L^2)$ transporte cette convergence faible ; la convergence forte vers $u$ entraîne aussi la convergence faible ; par unicité de la limite faible, $\tilde u=u$.

**Ce que le lemme ne donne pas.** La convergence forte n'a lieu ni dans $L^2(0,T;H^1_0)$ (exemple $\tfrac{\sqrt2}{n\pi}\sin(n\pi x)$), ni dans $C([0,T];L^2)$ (exemple $e^{-\lambda_nt}\varphi_n$). Chacune des deux bornes est nécessaire : $\sin(2\pi nt)\varphi(x)$ réfute la seule borne spatiale, $\sqrt2\sin(n\pi x)$ la seule borne en $L^2$.`,
  steps: [
    'Identifier le triplet et vérifier la compacité de la première injection.',
    t`Identifier les exposants $p=q=2$ et les deux bornes.`,
    t`Appliquer Aubin–Lions et extraire une sous-suite convergente dans $L^2(0,T;L^2)$.`,
    'Extraire encore faiblement et identifier les limites.',
  ],
  commonErrors: [
    { id: 'e-temps', description: 'Croire que la compacité spatiale suffit, sans contrôle en temps.', concept: 'temps-compacite' },
    { id: 'e-cible', description: t`Annoncer une convergence forte dans $L^2(0,T;H^1_0)$ ou dans $C([0,T];L^2)$.`, concept: 'aubin-lions-espace-cible' },
    { id: 'e-role', description: 'Attribuer la compacité spatiale à la borne sur la dérivée.', concept: 'aubin-lions-roles' },
  ],
  hints: [
    t`Quel espace joue le rôle de $X_0$, de $X$, de $X_1$ ? Laquelle des bornes est spatiale, laquelle est temporelle ?`,
    t`Vérifie chaque hypothèse du lemme, y compris les exposants, avant de l'appliquer ; puis identifie la limite forte avec une limite faible.`,
    t`Pour identifier les limites : une injection linéaire continue transporte la convergence faible, et la limite faible est unique.`,
  ],
  rubric: rubric({
    hypotheses: 'Compacité spatiale, contrôle temporel et exposants sont vérifiés séparément.',
    methode: 'Le lemme est appliqué au bon triplet, puis la limite est identifiée.',
    validite: t`La convergence obtenue est située dans $L^2(0,T;L^2)$, et seulement là.`,
    justifications: 'Le rôle de chaque borne est justifié par un contre-exemple quand elle manque.',
    conclusion: t`La sous-suite converge fortement dans $L^2(0,T;L^2)$, et sa limite est sa limite faible dans $L^2(0,T;H^1_0)$.`,
  }, [20, 20, 20, 25, 15]),
  variant: {
    statement: t`Avec $\Omega$ borné lipschitzien, on suppose $\|u_n\|_{L^4(0,T;H^1_0(\Omega))}\le C_1$ et $\|u_n'\|_{L^2(0,T;H^{-1}(\Omega))}\le C_2$. Dans quel espace obtient-on la compacité relative de $(u_n)$ ?`,
    solution: t`Le triplet est inchangé, avec $p=4$ et $q=2$, tous deux dans $]1,\infty[$. Aubin–Lions donne la compacité relative dans $L^p(0,T;X)=L^4(0,T;L^2(\Omega))$ : l'exposant en temps de la conclusion est celui de la borne spatiale, non celui de la borne sur $u_n'$. A fortiori, la compacité vaut dans $L^2(0,T;L^2(\Omega))$, puisque $L^4(0,T)\subset L^2(0,T)$ continûment sur un intervalle borné.`,
    closedChecks: [{ kind: 'rational-vector', prompt: t`Exposants $(p,q)$`, expected: ['4', '2'], labels: ['p', 'q'] }],
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h-Om', kind: 'hypothese', text: t`$\Omega\subset\mathbb R^d$ est un ouvert borné lipschitzien et $T>0$.` },
        { id: 'h-b4', kind: 'hypothese', text: t`$\|u_n\|_{L^4(0,T;H^1_0(\Omega))}\le C_1$ pour tout $n$.` },
        { id: 'h-b2', kind: 'hypothese', text: t`$\|u_n'\|_{L^2(0,T;H^{-1}(\Omega))}\le C_2$ pour tout $n$.` },
        { id: 'c-spatial', kind: 'application-theoreme', text: t`$H^1_0(\Omega)\hookrightarrow L^2(\Omega)$ est compacte.` },
        { id: 'c-cont', kind: 'consequence', text: t`$L^2(\Omega)\hookrightarrow H^{-1}(\Omega)$ est continue.` },
        {
          id: 'c-expo',
          kind: 'egalite',
          text: t`$p=4$ et $q=2$, avec $1<p,q<\infty$.`,
          masked: t`Exposants $p$ et $q$ : à identifier.`,
          check: { kind: 'rational-vector', prompt: t`Exposants $(p,q)$`, expected: ['4', '2'], labels: ['p', 'q'] },
        },
        { id: 'fin', kind: 'conclusion', text: t`$(u_n)$ est relativement compacte dans $L^4(0,T;L^2(\Omega))$.` },
        { id: 'x-Lq', kind: 'consequence', distractor: true, text: t`La conclusion ne peut pas dépasser l'exposant $q=2$ : on n'obtient la compacité que dans $L^2(0,T;L^2(\Omega))$.` },
      ],
      justifications: [
        { id: 'j-rellich', label: 'Rellich–Kondrachov, puis Poincaré.', theorem: 'rellich' },
        { id: 'j-dual', label: t`Cauchy–Schwarz et Poincaré : $\|f\|_{H^{-1}}\le C_P\|f\|_{L^2}$.` },
        { id: 'j-expo', label: 'Lecture des exposants dans les deux bornes.' },
        { id: 'j-aubin', label: 'Lemme d’Aubin–Lions.', theorem: 'aubin-lions' },
      ],
      rules: [
        { from: ['h-Om'], to: 'c-spatial', by: 'j-rellich' },
        { from: ['h-Om'], to: 'c-cont', by: 'j-dual' },
        { from: ['h-b4', 'h-b2'], to: 'c-expo', by: 'j-expo' },
        { from: ['c-spatial', 'c-cont', 'c-expo', 'h-b4', 'h-b2'], to: 'fin', by: 'j-aubin' },
      ],
      traps: [
        {
          conclusion: 'x-Lq',
          verdict: 'incorrect',
          concept: 'aubin-lions-espace-cible',
          message: t`L'énoncé donne la compacité relative dans $L^p(0,T;X)$, où $p$ est l'exposant de la borne dans $L^p(0,T;X_0)$ : ici $p=4$.`,
        },
      ],
      removable: [
        {
          hypothesis: 'h-b2',
          label: 'Retirer le contrôle temporel',
          necessary: true,
          explanation: 'Sans borne sur la dérivée, les oscillations en temps subsistent.',
          counterexample: t`$u_n(t,x)=\sin(2\pi nt)\varphi(x)$ sur $]0,1[$ : bornée dans $L^4(0,1;H^1_0)$, $u_n\rightharpoonup 0$, et $\|u_n\|_{L^2(0,1;L^2)}^2=\tfrac12\|\varphi\|_{L^2}^2$.`,
        },
      ],
    },
  },
  verification: FROM_POLY,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'aubin-lions.difficile',
  theoremId: 'aubin-lions',
  level: 'difficile',
  title: t`Passage à la limite dans $g(u_n)$, $g$ lipschitzienne`,
  statement: t`Soient $\Omega\subset\mathbb R^d$ borné lipschitzien, $T>0$, $V=H^1_0(\Omega)$, $H=L^2(\Omega)$, $V'=H^{-1}(\Omega)$, $f\in L^2(0,T;V')$ et $g:\mathbb R\to\mathbb R$ globalement lipschitzienne de constante $L$. Soit $(u_n)$ bornée dans $L^2(0,T;V)$, avec $(u_n')$ bornée dans $L^2(0,T;V')$, telle que pour tout $n$, tout $v\in V$ et presque tout $t$ : $\langle u_n'(t),v\rangle_{V',V}+\int_\Omega\nabla u_n(t)\cdot\nabla v+\int_\Omega g(u_n(t))v=\langle f(t),v\rangle_{V',V}$. Montrer qu'à extraction près $u_n\to u$ fortement dans $L^2(0,T;H)$, $g(u_n)\to g(u)$ fortement dans $L^2(0,T;H)$, et que $u$ vérifie la même formulation faible.`,
  source: poly(42, 'Exercice 21, difficile ; section 8.7 (p. PDF 33)'),
  prerequisites: [],
  concepts: ['nonlinearite-limite-faible', 'temps-compacite', 'faible-fort', 'hypotheses-theoreme'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-cadre', kind: 'hypothese', text: t`$\Omega\subset\mathbb R^d$ est borné lipschitzien, $T>0$, $V=H^1_0(\Omega)\hookrightarrow\hookrightarrow H=L^2(\Omega)\hookrightarrow V'=H^{-1}(\Omega)$, et $f\in L^2(0,T;V')$.` },
      { id: 'h-g', kind: 'hypothese', text: t`$g:\mathbb R\to\mathbb R$ est globalement lipschitzienne : $|g(r)-g(s)|\le L|r-s|$ pour tous $r,s$.` },
      { id: 'h-bornes', kind: 'hypothese', text: t`$\sup_n\big(\|u_n\|_{L^2(0,T;V)}+\|u_n'\|_{L^2(0,T;V')}\big)<\infty$.` },
      { id: 'h-eq', kind: 'hypothese', text: t`Pour tout $n$, tout $v\in V$ et presque tout $t$ : $\langle u_n'(t),v\rangle_{V',V}+\int_\Omega\nabla u_n(t)\cdot\nabla v+\int_\Omega g(u_n(t))v=\langle f(t),v\rangle_{V',V}$.` },
      { id: 'a-weak', kind: 'application-theoreme', text: t`Quitte à extraire : $u_n\rightharpoonup u$ dans $L^2(0,T;V)$ et $u_n'\rightharpoonup\zeta$ dans $L^2(0,T;V')$.` },
      { id: 'a-deriv', kind: 'egalite', text: t`$\zeta=u'$ au sens des distributions sur $]0,T[$ à valeurs dans $V'$.` },
      { id: 'a-strong', kind: 'application-theoreme', text: t`Quitte à extraire encore : $u_n\to u$ fortement dans $L^2(0,T;H)$.` },
      { id: 'g-cv', kind: 'inegalite', text: t`$\|g(u_n)-g(u)\|_{L^2(0,T;H)}\le L\|u_n-u\|_{L^2(0,T;H)}\to 0$.` },
      { id: 'l-lim', kind: 'egalite', text: t`Pour $v\in V$ et $\eta\in C^\infty_c(]0,T[)$ : $\int_0^T\eta\Big[\langle u',v\rangle_{V',V}+\int_\Omega\nabla u\cdot\nabla v+\int_\Omega g(u)v-\langle f,v\rangle_{V',V}\Big]dt=0$.` },
      { id: 'fin', kind: 'conclusion', text: t`$u\in L^2(0,T;V)$, $u'\in L^2(0,T;V')$, et pour tout $v\in V$ et presque tout $t$ : $\langle u'(t),v\rangle_{V',V}+\int_\Omega\nabla u(t)\cdot\nabla v+\int_\Omega g(u(t))v=\langle f(t),v\rangle_{V',V}$.` },
      // Propositions plausibles mais fausses.
      { id: 'x-faible', kind: 'consequence', distractor: true, after: ['a-weak'], text: t`La seule convergence faible de $u_n$ dans $L^2(0,T;V)$ donne $g(u_n)\rightharpoonup g(u)$.` },
      { id: 'x-grad', kind: 'consequence', distractor: true, after: ['a-strong'], text: t`$\nabla u_n\to\nabla u$ fortement dans $L^2(0,T;L^2(\Omega)^d)$.` },
    ],
    justifications: [
      { id: 'j-extraction', label: t`$L^2(0,T;V)$ et $L^2(0,T;V')$ sont des espaces de Hilbert : extraction faible des deux suites bornées.`, theorem: 'extraction-reflexive' },
      { id: 'j-ipp', label: t`$\int_0^T\langle u_n',v\rangle\eta=-\int_0^T(u_n,v)_H\eta'$ pour $v\in V$, $\eta\in C^\infty_c(]0,T[)$ ; les deux membres passent à la limite faible.` },
      { id: 'j-aubin', label: t`Lemme d'Aubin–Lions avec $X_0=V$, $X=H$, $X_1=V'$, $p=q=2$ ; la limite forte coïncide avec la limite faible.`, theorem: 'aubin-lions' },
      { id: 'j-lip', label: t`Ponctuellement $|g(u_n)-g(u)|\le L|u_n-u|$ ; on élève au carré et on intègre sur $]0,T[\times\Omega$.` },
      { id: 'j-passage', label: t`Terme en $u_n'$ : convergence faible dans $L^2(0,T;V')$ testée par $\eta v\in L^2(0,T;V)$ ; terme en gradient : convergence faible dans $L^2(0,T;V)$ ; terme non linéaire : convergence forte de $g(u_n)$.` },
      { id: 'j-fondamental', label: t`Une fonction de $L^1(0,T)$ d'intégrale nulle contre toute $\eta\in C^\infty_c(]0,T[)$ est nulle presque partout.` },
      { id: 'j-faible-suffit', label: t`$g$ est continue : la convergence faible de $u_n$ suffit pour passer à la limite dans $g(u_n)$.` },
    ],
    rules: [
      { from: ['h-bornes', 'h-cadre'], to: 'a-weak', by: 'j-extraction' },
      { from: ['a-weak'], to: 'a-deriv', by: 'j-ipp' },
      { from: ['h-bornes', 'h-cadre', 'a-weak'], to: 'a-strong', by: 'j-aubin' },
      { from: ['h-g', 'a-strong'], to: 'g-cv', by: 'j-lip' },
      { from: ['h-eq', 'a-weak', 'a-deriv', 'g-cv'], to: 'l-lim', by: 'j-passage' },
      { from: ['l-lim', 'a-deriv'], to: 'fin', by: 'j-fondamental' },
    ],
    traps: [
      {
        conclusion: 'g-cv',
        by: 'j-faible-suffit',
        verdict: 'incorrect',
        concept: 'nonlinearite-limite-faible',
        message: 'La continuité de g ne permet pas de passer à la limite faible : c’est la convergence forte fournie par Aubin–Lions qui sert.',
        counterexample: t`$g(s)=|s|$, $T=1$, $u_n=\sin(2\pi nt)\varphi(x)$ : $u_n\rightharpoonup 0$ mais $|u_n|\rightharpoonup\tfrac2\pi|\varphi|\neq 0=g(0)$.`,
      },
      {
        conclusion: 'x-faible',
        verdict: 'incorrect',
        concept: 'nonlinearite-limite-faible',
        message: 'Les oscillations en temps survivent à la limite faible et sont rectifiées par la non-linéarité.',
        counterexample: t`$g(s)=|s|$, lipschitzienne : pour $u_n=\sin(2\pi nt)\varphi(x)$ sur $]0,1[$, $g(u_n)\rightharpoonup\tfrac2\pi|\varphi|$, tandis que $g(0)=0$.`,
      },
      {
        conclusion: 'x-grad',
        verdict: 'incorrect',
        concept: 'faible-fort',
        message: t`Aubin–Lions donne la convergence forte dans $L^2(0,T;H)$, pas celle des gradients ; une non-linéarité en gradient demande d'autres arguments (Minty).`,
        counterexample: t`$\Omega=]0,1[$, $f=0$, $g=0$, $\lambda_n=(n\pi)^2$ et $u_n(t)=e^{-\lambda_nt}\sqrt2\sin(n\pi x)$ : chaque $u_n$ vérifie l'équation, $(u_n)$ et $(u_n')$ sont bornées dans $L^2(0,T;V)$ et $L^2(0,T;V')$, $u_n\to 0$ dans $L^2(0,T;H)$, mais $\|\partial_xu_n\|_{L^2(0,T;L^2)}^2=\tfrac12\big(1-e^{-2\lambda_nT}\big)\to\tfrac12$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-g',
        label: t`Retirer le caractère lipschitzien de $g$`,
        necessary: true,
        explanation: t`L'inégalité $\|g(u_n)-g(u)\|\le L\|u_n-u\|$ disparaît : la convergence forte dans $L^2$ ne passe plus à travers $g$.`,
        counterexample: t`$g(s)=s^2$ et $w_n=n\,\mathbb 1_{E_n}$ avec $E_n\subset]0,T[\times\Omega$, $|E_n|=n^{-3}$ : $\|w_n\|_{L^2}^2=1/n\to 0$ mais $\|g(w_n)\|_{L^2}^2=n\to+\infty$.`,
      },
      {
        hypothesis: 'a-strong',
        label: 'Ne plus disposer de la convergence forte',
        necessary: true,
        explanation: 'Avec la seule convergence faible, le terme non linéaire ne passe pas à la limite.',
        counterexample: t`$g(s)=|s|$, $u_n=\sin(2\pi nt)\varphi(x)$ sur $]0,1[$ : $u_n\rightharpoonup 0$ et $g(u_n)\rightharpoonup\tfrac2\pi|\varphi|\neq g(0)$.`,
      },
    ],
  },
  closedChecks: [
    { kind: 'rational', prompt: t`Pour $g(r)=\tanh r$ (exemple de la section 8.7), meilleure constante de Lipschitz $L$`, expected: '1' },
  ],
  solution: t`**Extractions faibles.** $L^2(0,T;V)$ et $L^2(0,T;V')$ étant des espaces de Hilbert, on extrait $u_n\rightharpoonup u$ et $u_n'\rightharpoonup\zeta$. Pour $v\in V$ et $\eta\in C^\infty_c(]0,T[)$, $\int_0^T\langle u_n',v\rangle\eta=-\int_0^T(u_n,v)_H\eta'$ passe à la limite, donc $\zeta=u'$.

**Convergence forte.** Compacité spatiale : $V\hookrightarrow\hookrightarrow H$ (Rellich). Contrôle temporel : la borne de $u_n'$ dans $L^2(0,T;V')$. Aubin–Lions, avec $p=q=2$, donne une sous-suite fortement convergente dans $L^2(0,T;H)$, dont la limite est $u$ par unicité de la limite faible.

**Terme non linéaire.** Ponctuellement $|g(u_n)-g(u)|\le L|u_n-u|$, d'où $\|g(u_n)-g(u)\|_{L^2(0,T;H)}\le L\|u_n-u\|_{L^2(0,T;H)}\to 0$. Comme $|g(s)|\le|g(0)|+L|s|$ et $\Omega$ est borné, $g(u_n)$ et $g(u)$ appartiennent bien à $L^2(0,T;H)$.

**Équation limite.** On multiplie l'équation par $\eta\in C^\infty_c(]0,T[)$ et on intègre en temps. Le terme en $u_n'$ passe à la limite par convergence faible dans $L^2(0,T;V')$, testée contre $\eta v\in L^2(0,T;V)$ ; le terme en gradient par convergence faible dans $L^2(0,T;V)$ ; le terme non linéaire par convergence forte de $g(u_n)$. L'intégrande limite, fonction de $L^1(0,T)$ orthogonale à toute $\eta$, est nulle presque partout : $u$ vérifie la formulation faible pour tout $v\in V$ et presque tout $t$.

**Vigilance.** La convergence faible seule ne suffit pas ($g(s)=|s|$ et oscillations en temps) ; la convergence forte n'est pas celle des gradients.`,
  steps: [
    'Extraire faiblement la suite et sa dérivée, identifier la dérivée limite.',
    t`Appliquer Aubin–Lions pour la convergence forte dans $L^2(0,T;H)$.`,
    t`Passer à la limite dans $g(u_n)$ par l'inégalité de Lipschitz.`,
    'Passer à la limite terme à terme dans la formulation intégrée en temps.',
    'Conclure par le lemme fondamental du calcul des variations.',
  ],
  commonErrors: [
    { id: 'e-faible', description: t`Passer à la limite dans $g(u_n)$ avec une simple convergence faible.`, concept: 'nonlinearite-limite-faible' },
    { id: 'e-grad', description: 'Croire que la convergence forte de la suite entraîne celle des gradients.', concept: 'faible-fort' },
    { id: 'e-temps', description: 'Omettre la borne sur la dérivée temporelle dans l’application d’Aubin–Lions.', concept: 'temps-compacite' },
  ],
  hints: [
    'Quels termes de la formulation sont linéaires en la suite, et lequel ne l’est pas ?',
    t`Les termes linéaires passent à la limite faible ; pour $g(u_n)$, il faut une convergence forte : vérifie les deux contrôles d'Aubin–Lions.`,
    t`Ponctuellement $|g(u_n)-g(u)|\le L|u_n-u|$ ; intègre le carré sur $]0,T[\times\Omega$.`,
  ],
  rubric: rubric({
    hypotheses: 'Le caractère lipschitzien de g et les deux bornes uniformes sont explicitement utilisés.',
    methode: 'Extractions faibles, puis Aubin–Lions, puis passage à la limite terme à terme.',
    validite: 'Chaque terme passe à la limite avec la convergence adaptée.',
    justifications: 'La dérivée limite est identifiée, et l’équation est obtenue presque partout en temps.',
    conclusion: 'La limite est une solution faible du problème non linéaire.',
  }),
  variant: {
    statement: t`Reprendre l'exercice lorsque $(u_n')$ n'est bornée que dans $L^{4/3}(0,T;V')$.`,
    solution: t`Aubin–Lions s'applique avec $p=2$ et $q=4/3$, tous deux dans $]1,\infty[$ : la compacité relative a lieu dans $L^2(0,T;H)$, et le terme non linéaire passe à la limite comme avant. L'espace $L^{4/3}(0,T;V')$ est réflexif, de dual $L^4(0,T;V)$ : on extrait $u_n'\rightharpoonup\zeta$, et les tests $\eta v$, $\eta\in C^\infty_c(]0,T[)$, appartiennent à $L^4(0,T;V)$, ce qui identifie $\zeta=u'$ et fait passer à la limite le terme en $u_n'$. On obtient $u'\in L^{4/3}(0,T;V')$ et la même formulation faible.`,
  },
  verification: { ...FROM_POLY, notes: 'Section 8.7 du polycopié, sans l’hypothèse de monotonie de g, inutile pour le passage à la limite.' },
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT21: TheoremModule = {
  theorem: {
    id: 'aubin-lions',
    spaces: [
      t`$X_0\hookrightarrow\hookrightarrow X\hookrightarrow X_1$ : espaces de Banach, l'injection de $X_0$ dans $X$ étant compacte et celle de $X$ dans $X_1$ continue.`,
      t`$L^p(0,T;X)$ : espace de Bochner ; $u_n'$ : dérivée au sens des distributions sur $]0,T[$, à valeurs dans $X_1$.`,
    ],
    hypotheses: [
      {
        id: 'h-compacte',
        text: t`$X_0\hookrightarrow X$ est compacte (compacité spatiale).`,
        whenRemoved: t`$X_0=X=L^2(]0,1[)$, $X_1=H^{-1}(]0,1[)$ : $u_n(t,x)=\sqrt2\sin(n\pi x)$ est bornée dans $L^p(0,T;X_0)$, $u_n'=0$, et $\|u_n-u_m\|_{L^2(0,T;L^2)}^2=2T$ pour $n\neq m$.`,
      },
      { id: 'h-continue', text: t`$X\hookrightarrow X_1$ est continue.` },
      {
        id: 'h-exposants',
        text: t`$1<p,q<\infty$.`,
        whenRemoved: t`Pour $p=\infty$ et $q=1$, la compacité dans $L^\infty(0,T;X)$ tombe : $u_n(t)=\min(nt,1)\,v$, $v\in X_0\setminus\{0\}$, est bornée dans $L^\infty(0,T;X_0)$, $\|u_n'\|_{L^1(0,T;X_1)}=\|v\|_{X_1}$, $u_n(t)\to v$ pour tout $t>0$, mais $\|u_n-v\|_{L^\infty(0,T;X)}=\|v\|_X$.`,
      },
      {
        id: 'h-bornes',
        text: t`$\sup_n\big(\|u_n\|_{L^p(0,T;X_0)}+\|u_n'\|_{L^q(0,T;X_1)}\big)<\infty$ : contrôle spatial et contrôle temporel.`,
        whenRemoved: t`Sans borne sur $u_n'$ : $u_n(t,x)=\sin(2\pi nt)\varphi(x)$ sur $]0,1[$ est bornée dans $L^2(0,1;H^1_0)$, tend faiblement vers $0$, et $\|u_n\|_{L^2(0,1;L^2)}^2=\tfrac12\|\varphi\|_{L^2}^2$.`,
      },
    ],
    statement: t`Soient $X_0\hookrightarrow\hookrightarrow X\hookrightarrow X_1$ des espaces de Banach à injections continue et compacte comme indiquées, et $1<p,q<\infty$. Si
$$\sup_n\big(\|u_n\|_{L^p(0,T;X_0)}+\|u_n'\|_{L^q(0,T;X_1)}\big)<\infty,$$
alors $(u_n)$ est relativement compacte dans $L^p(0,T;X)$.`,
    conclusions: {
      autre: t`Compacité relative dans $L^p(0,T;X)$ : de toute sous-suite on extrait une sous-suite fortement convergente dans $L^p(0,T;X)$.`,
    },
    sourceProof: 'idee',
    proofOutline: [
      t`Lemme d'Ehrling : pour tout $\varepsilon>0$, il existe $C_\varepsilon$ tel que $\|v\|_X\le\varepsilon\|v\|_{X_0}+C_\varepsilon\|v\|_{X_1}$ pour $v\in X_0$ (compacité de $X_0\hookrightarrow X$, injectivité de $X\hookrightarrow X_1$).`,
      t`Contrôle des translations en temps : $\|u_n(t+h)-u_n(t)\|_{X_1}\le\int_t^{t+h}\|u_n'\|_{X_1}\le h^{1-1/q}\|u_n'\|_{L^q(0,T;X_1)}$.`,
      t`En combinant les deux, les translations $\|u_n(\cdot+h)-u_n\|_{L^p(0,T-h;X)}$ tendent vers $0$ uniformément en $n$, et les moyennes $\int_{t_1}^{t_2}u_n$ restent dans un compact de $X$.`,
      t`Un critère de compacité de type Fréchet–Kolmogorov dans $L^p(0,T;X)$ conclut.`,
    ],
    warnings: [
      t`La compacité porte sur $X_0\hookrightarrow X$ ; la compacité de $X\hookrightarrow X_1$ ne suffit pas.`,
      t`La convergence forte a lieu dans $L^p(0,T;X)$, ni dans $L^p(0,T;X_0)$, ni en général dans $C([0,T];X)$.`,
      'La compacité spatiale ne contrôle pas les oscillations en temps : la borne sur la dérivée est indispensable.',
    ],
    usefulFor: t`Justifier le passage à la limite dans des termes tels que $g(u_n)$ lorsque $g$ est lipschitzienne, et dans d'autres non-linéarités sous des hypothèses adaptées.`,
    verification: FROM_POLY,
  },
  definitions: [
    {
      id: 'al-injection-compacte',
      term: 'Injection compacte',
      statement: t`$X_0\hookrightarrow\hookrightarrow X$ : l'injection de $X_0$ dans $X$ est continue et envoie les bornés de $X_0$ sur des parties relativement compactes de $X$.`,
      source: poly(21, 'Section 5.3'),
    },
    {
      id: 'al-relativement-compacte',
      term: 'Partie relativement compacte',
      statement: 'Dans un espace métrique, une partie est relativement compacte si son adhérence est compacte, autrement dit si toute suite de la partie admet une sous-suite convergente dans l’espace.',
      source: complement('Définition standard'),
    },
  ],
  concepts: [
    {
      id: 'aubin-lions-roles',
      label: 'Rôles des hypothèses d’Aubin–Lions',
      reminder: t`Compacité spatiale : l'injection $X_0\hookrightarrow X$. Contrôle temporel : la borne sur $u_n'$ dans $L^q(0,T;X_1)$. Les deux sont nécessaires, et aucun ne remplace l'autre.`,
    },
    {
      id: 'aubin-lions-espace-cible',
      label: 'Espace de convergence d’Aubin–Lions',
      reminder: t`La convergence forte obtenue a lieu dans $L^p(0,T;X)$ : ni dans $L^p(0,T;X_0)$, ni en général dans $C([0,T];X)$, et l'exposant en temps est celui de la borne spatiale.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-al-sans-temps',
      theoremId: 'aubin-lions',
      title: 'Oscillations en temps',
      claim: t`Une suite bornée dans $L^2(0,T;H^1_0(\Omega))$ est relativement compacte dans $L^2(0,T;L^2(\Omega))$.`,
      correctStatement: t`Il faut aussi borner $u_n'$ dans $L^q(0,T;X_1)$, avec $1<q<\infty$.`,
      task: t`$T=1$, $\varphi\in H^1_0(\Omega)$ avec $\|\varphi\|_{L^2}=1$, $u_n(t,x)=\sin(2\pi nt)\varphi(x)$. Calcule $\|u_n-u_m\|_{L^2(0,1;L^2(\Omega))}^2$ pour $n\neq m$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\|u_n-u_m\|_{L^2(0,1;L^2)}^2$, $n\neq m$`, expected: '1' },
      explanation: t`$\int_0^1(\sin 2\pi nt-\sin 2\pi mt)^2\,dt=\tfrac12+\tfrac12-0=1$ : les termes restent à distance $1$, aucune sous-suite n'est de Cauchy. La suite est bornée dans $L^2(0,1;H^1_0)$, mais $\|u_n'\|_{L^2(0,1;H^{-1})}$ croît comme $n$.`,
      concept: 'temps-compacite',
      source: poly(21, 'Section 5.3 (rôle du contrôle temporel)'),
    },
    {
      id: 'ce-al-sans-espace',
      theoremId: 'aubin-lions',
      title: 'Sans injection compacte',
      claim: t`Si $(u_n)$ est bornée dans $L^2(0,T;L^2(\Omega))$ et $(u_n')$ bornée dans $L^2(0,T;H^{-1}(\Omega))$, une sous-suite converge fortement dans $L^2(0,T;L^2(\Omega))$.`,
      correctStatement: t`La borne doit porter sur $L^p(0,T;X_0)$ avec $X_0\hookrightarrow X$ compacte, par exemple $X_0=H^1_0(\Omega)$.`,
      task: t`$\Omega=]0,1[$, $u_n(t,x)=\sqrt2\sin(n\pi x)$. Exprime $\|u_n-u_m\|_{L^2(0,T;L^2)}^2$ en fonction de $T$, pour $n\neq m$.`,
      check: { kind: 'expr-equiv', prompt: t`Valeur de $\|u_n-u_m\|_{L^2(0,T;L^2)}^2$ en fonction de $T$`, expected: '2*T', vars: ['T'] },
      explanation: t`La famille $(\sqrt2\sin(n\pi x))$ est orthonormée dans $L^2(]0,1[)$ : $\|u_n(t)-u_m(t)\|_{L^2}^2=2$ pour tout $t$, d'où $2T$. La suite est bornée dans $L^2(0,T;L^2)$ et $u_n'=0$, mais aucune sous-suite n'est de Cauchy.`,
      concept: 'aubin-lions-roles',
      source: complement('Contre-exemple classique, hors polycopié'),
    },
    {
      id: 'ce-al-cible',
      theoremId: 'aubin-lions',
      title: 'Convergence dans le mauvais espace',
      claim: t`Sous les hypothèses d'Aubin–Lions, une sous-suite converge fortement dans $L^p(0,T;X_0)$.`,
      correctStatement: t`La convergence forte a lieu dans $L^p(0,T;X)$, et en général pas dans $L^p(0,T;X_0)$.`,
      task: t`$\Omega=]0,1[$, $T=1$, $u_n=\tfrac{\sqrt2}{n\pi}\sin(n\pi x)$, indépendante de $t$. Calcule $\|u_n\|_{L^2(0,1;H^1_0)}^2$, où $\|v\|_{H^1_0}=\|v'\|_{L^2}$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\|u_n\|_{L^2(0,1;H^1_0)}^2$`, expected: '1' },
      explanation: t`$u_n\to 0$ dans $L^2(0,1;L^2)$ car $\|u_n\|_{L^2}=\tfrac1{n\pi}$, et $u_n'=0$ ; mais $\|u_n\|_{L^2(0,1;H^1_0)}=1$. Une limite forte dans $L^2(0,1;H^1_0)$ serait nulle, ce qui est impossible.`,
      concept: 'aubin-lions-espace-cible',
      source: complement('Contre-exemple classique, hors polycopié'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT21;
