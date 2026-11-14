/**
 * Résultat 17 — Dualité H^{-s} et interpolation (polycopié, section 4.3, p. PDF 18).
 * Crochet : ⟨f, φ⟩ = ∫ f̂(ξ) φ̂(-ξ) dξ, qui prolonge ∫ f φ ; interpolation par Hölder.
 */
import { t, rubric, poly } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'dualite-interpolation.facile',
  theoremId: 'dualite-interpolation',
  level: 'facile',
  title: t`Les duaux de $H^1_0(\Omega)$ et de $H^s(\mathbb R^d)$`,
  statement: t`Soit $\Omega\subset\mathbb R^d$ un ouvert borné. (a) Préciser le dual de $H^1_0(\Omega)$ et la place qu'y occupe le pivot $L^2(\Omega)$. (b) Pour $s\in\mathbb R$, $f\in H^{-s}(\mathbb R^d)$ et $\varphi\in H^s(\mathbb R^d)$, on pose $\langle f,\varphi\rangle=\int_{\mathbb R^d}\hat f(\xi)\,\hat\varphi(-\xi)\,d\xi$. Montrer que $f\mapsto\langle f,\cdot\rangle$ est une isométrie linéaire bijective de $H^{-s}(\mathbb R^d)$ sur $(H^s(\mathbb R^d))'$, et que ce crochet prolonge $\int f\varphi$. (c) Réfuter l'identification « $H^{-1}(\Omega)=L^2(\Omega)$ ».`,
  source: poly(41, 'Exercice 17, facile ; sections 3.2 (p. PDF 12) et 4.3 (p. PDF 18)'),
  prerequisites: ['riesz'],
  concepts: ['dual-identification', 'dualite-interpolation-pivot', 'hypotheses-theoreme'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-omega', kind: 'hypothese', text: t`$\Omega\subset\mathbb R^d$ est un ouvert borné, $V=H^1_0(\Omega)$ est muni de la norme de $H^1$, et $H^{-1}(\Omega):=V'$ est son dual continu.` },
      { id: 'p-plong', kind: 'inclusion', text: t`$g\mapsto\big(v\mapsto\int_\Omega gv\big)$ est linéaire, continue et injective de $L^2(\Omega)$ dans $H^{-1}(\Omega)$ : c'est l'identification du pivot $L^2$ à son dual.` },
      { id: 'q-dirac', kind: 'consequence', text: t`Sur $]0,1[$, la forme $v\mapsto v(1/2)$ appartient à $H^{-1}(]0,1[)$, et n'est représentée par aucune $g\in L^2(]0,1[)$.` },
      { id: 'h-s', kind: 'hypothese', text: t`$s\in\mathbb R$.` },
      { id: 'd-cro', kind: 'definition', text: t`$w(\xi)=1+|\xi|^2$ et $\|v\|^2_{H^\sigma}=\int w^\sigma|\hat v|^2\,d\xi$ ; pour $f\in H^{-s}$ et $\varphi\in H^s$ : $\langle f,\varphi\rangle=\int_{\mathbb R^d}\hat f(\xi)\,\hat\varphi(-\xi)\,d\xi$.` },
      { id: 'c-compat', kind: 'egalite', text: t`Pour $f,\varphi\in L^2(\mathbb R^d)$ : $\langle f,\varphi\rangle=\int_{\mathbb R^d}f\varphi\,dx$ ; pour $f\in H^{-s}$ et $\varphi\in\mathcal S$, $\langle f,\varphi\rangle$ est l'action de la distribution tempérée $f$ sur $\varphi$.` },
      { id: 'c-cs', kind: 'inegalite', text: t`$|\langle f,\varphi\rangle|\le\|f\|_{H^{-s}}\,\|\varphi\|_{H^s}$.` },
      { id: 'c-test', kind: 'egalite', text: t`Pour $f\in H^{-s}$, l'élément $\varphi_f$ défini par $\hat\varphi_f(\xi)=w(\xi)^{-s}\,\overline{\hat f(-\xi)}$ vérifie $\|\varphi_f\|_{H^s}=\|f\|_{H^{-s}}$ et $\langle f,\varphi_f\rangle=\|f\|^2_{H^{-s}}$.` },
      { id: 'c-surj', kind: 'consequence', text: t`Toute forme $\ell\in(H^s(\mathbb R^d))'$ s'écrit $\ell=\langle f,\cdot\rangle$ avec $f\in H^{-s}(\mathbb R^d)$.` },
      { id: 'c-dual', kind: 'consequence', text: t`$f\mapsto\langle f,\cdot\rangle$ est une isométrie linéaire bijective de $H^{-s}(\mathbb R^d)$ sur $(H^s(\mathbb R^d))'$.` },
      { id: 'fin', kind: 'conclusion', text: t`Le dual de $H^1_0(\Omega)$ est, par définition, $H^{-1}(\Omega)$, qui contient le pivot $L^2(\Omega)$, strictement sur $]0,1[$. Le dual de $H^s(\mathbb R^d)$ s'identifie isométriquement à $H^{-s}(\mathbb R^d)$ par le crochet $\int\hat f(\xi)\hat\varphi(-\xi)\,d\xi$, qui prolonge $\int f\varphi$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-l2', kind: 'inclusion', distractor: true, text: t`$H^{-1}(\Omega)=L^2(\Omega)$ : toute forme linéaire continue sur $H^1_0(\Omega)$ s'écrit $v\mapsto\int_\Omega gv$ avec $g\in L^2(\Omega)$.` },
      { id: 'x-riesz', kind: 'egalite', distractor: true, after: ['c-dual'], text: t`Pour $s>0$, l'identification de Riesz de $H^s(\mathbb R^d)$ à son dual coïncide avec l'inclusion $H^s\subset H^{-s}$ lue à travers le crochet.` },
      { id: 'x-four', kind: 'consequence', distractor: true, text: t`$H^{-1}(\Omega)$ est l'ensemble des $f\in\mathcal D'(\Omega)$ telles que $(1+|\xi|^2)^{-1/2}\hat f\in L^2$.` },
    ],
    justifications: [
      { id: 'j-plong', label: t`Cauchy–Schwarz et $\|v\|_{L^2}\le\|v\|_{H^1}$ pour la continuité ; densité de $C^\infty_c(\Omega)\subset V$ dans $L^2(\Omega)$ pour l'injectivité.` },
      { id: 'j-dirac', label: t`$|v(1/2)|=\big|\int_0^{1/2}v'\big|\le 2^{-1/2}\|v'\|_{L^2}$ ; si $g\in L^2$ représentait la forme, les fonctions test $\varphi_n=\varphi(n(\cdot-\frac12))$, avec $\varphi(0)=1$, donneraient $1=\int g\varphi_n\le\|g\|_{L^2}\|\varphi_n\|_{L^2}\to 0$.` },
      { id: 'j-parseval', label: t`Parseval appliqué à $f$ et $\bar\varphi$, avec $\widehat{\bar\varphi}(\xi)=\overline{\hat\varphi(-\xi)}$ ; sur $\mathcal S'$, $\langle f,\varphi\rangle=\langle\hat f,\mathcal F^{-1}\varphi\rangle$ et $\mathcal F^{-1}\varphi(\xi)=\hat\varphi(-\xi)$.`, theorem: 'plancherel' },
      { id: 'j-cs-poids', label: t`Écrire $\hat f(\xi)\hat\varphi(-\xi)=\big[w^{-s/2}\hat f\big](\xi)\cdot\big[w^{s/2}\hat\varphi(-\cdot)\big](\xi)$, $w$ étant paire, puis Cauchy–Schwarz dans $L^2$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-test', label: t`Calcul direct, avec la parité de $w$ et le changement de variable $\xi\mapsto-\xi$.` },
      { id: 'j-riesz', label: t`$\varphi\mapsto w^{s/2}\hat\varphi(-\cdot)$ est une isométrie bijective de $H^s$ sur $L^2$ ; Riesz dans $L^2$ fournit $g$, puis $f=\mathcal F^{-1}(w^{s/2}g)\in H^{-s}$.`, theorem: 'riesz' },
      { id: 'j-isom', label: t`Norme duale égale à $\|f\|_{H^{-s}}$ (majoration atteinte), injectivité par isométrie, surjectivité.` },
      { id: 'j-syn', label: 'Réunion des deux identifications et de leur comparaison avec le pivot.' },
      // Justifications séduisantes et fausses.
      { id: 'j-hb', label: 'Hahn–Banach prolonge toute forme : il fournit ainsi un représentant dans $H^{-s}$.' },
      { id: 'j-cs-nu', label: t`Cauchy–Schwarz directement : $|\langle f,\varphi\rangle|\le\|\hat f\|_{L^2}\|\hat\varphi\|_{L^2}$.` },
    ],
    rules: [
      { from: ['h-omega'], to: 'p-plong', by: 'j-plong' },
      { from: ['h-omega'], to: 'q-dirac', by: 'j-dirac' },
      { from: ['h-s', 'd-cro'], to: 'c-compat', by: 'j-parseval' },
      { from: ['h-s', 'd-cro'], to: 'c-cs', by: 'j-cs-poids' },
      { from: ['h-s', 'd-cro'], to: 'c-test', by: 'j-test' },
      { from: ['h-s', 'd-cro'], to: 'c-surj', by: 'j-riesz' },
      { from: ['c-cs', 'c-test', 'c-surj'], to: 'c-dual', by: 'j-isom' },
      { from: ['p-plong', 'q-dirac', 'c-dual', 'c-compat'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'c-surj',
        by: 'j-hb',
        verdict: 'incorrect',
        concept: 'dual-identification',
        message: t`Hahn–Banach prolonge une forme définie sur un sous-espace ; il ne dit pas qu'une forme continue sur tout $H^s$ est représentée par un élément de $H^{-s}$. C'est Riesz, transporté par l'isométrie $H^s\to L^2$, qui fournit ce représentant.`,
      },
      {
        conclusion: 'c-cs',
        by: 'j-cs-nu',
        verdict: 'incorrect',
        concept: 'dual-identification',
        message: t`Sans les poids $w^{\mp s/2}$, on ne contrôle que $\|\hat f\|_{L^2}\|\hat\varphi\|_{L^2}$, qui est infini dès que $f\notin L^2$.`,
        counterexample: t`Pour $s>d/2$, $\delta_0\in H^{-s}(\mathbb R^d)$, mais $\hat\delta_0=(2\pi)^{-d/2}\notin L^2(\mathbb R^d)$.`,
      },
      {
        conclusion: 'x-l2',
        verdict: 'incorrect',
        concept: 'dual-identification',
        message: t`$H^{-1}(\Omega)$ est un dual : ses éléments ne sont pas forcément des fonctions de $L^2$. Le pivot $L^2$ s'y plonge strictement.`,
        counterexample: t`Sur $]0,1[$, $v\mapsto v(1/2)$ est continue sur $H^1_0$ ($|v(1/2)|\le 2^{-1/2}\|v'\|_{L^2}$), et n'est représentée par aucune $g\in L^2$.`,
      },
      {
        conclusion: 'x-riesz',
        verdict: 'incorrect',
        concept: 'dualite-interpolation-pivot',
        message: t`L'identification de Riesz utilise le produit scalaire de $H^s$, le crochet celui de $L^2$ : pour $u\neq0$, les deux formes associées diffèrent. Lue dans $H^{-s}$, l'application de Riesz est $u\mapsto(I-\Delta)^s\bar u$.`,
        counterexample: t`Pour $s=1$ et $u\neq 0$ réelle : Riesz associe à $u$ la forme $\varphi\mapsto\int(u\varphi+\nabla u\cdot\nabla\varphi)=\langle(I-\Delta)u,\varphi\rangle$, et $(I-\Delta)u\neq u$ puisque $\Delta u\neq 0$ pour $u\in H^1\setminus\{0\}$.`,
      },
      {
        conclusion: 'x-four',
        verdict: 'incorrect',
        concept: 'dual-identification',
        message: t`Pour $\Omega\neq\mathbb R^d$, la transformée de Fourier n'est pas définie sur $\mathcal D'(\Omega)$ : $H^{-1}(\Omega)$ est défini par dualité, et $H^{-s}(\mathbb R^d)$ défini par Fourier est une autre construction, adaptée à l'espace entier.`,
      },
    ],
    removable: [
      {
        hypothesis: 'p-plong',
        label: 'Ne plus disposer du plongement du pivot',
        necessary: true,
        explanation: t`L'injectivité de $g\mapsto\int gv$ repose sur la densité de $V$ dans $L^2(\Omega)$ : sans elle, des fonctions non nulles de $L^2$ définissent la forme nulle.`,
        counterexample: t`Pour $V_0=\{v\in H^1_0(]0,1[) : v=0\text{ sur }]0,\tfrac12[\}$, non dense dans $L^2(]0,1[)$, la fonction $g=\mathbb 1_{]0,1/2[}\neq 0$ vérifie $\int_0^1gv=0$ pour tout $v\in V_0$.`,
      },
    ],
  },
  closedChecks: [
    { kind: 'rational', prompt: t`Seuil $\sigma_0$ tel que $\delta_0\in H^\sigma(\mathbb R^3)$ si et seulement si $\sigma<\sigma_0$.`, expected: '-3/2' },
    {
      kind: 'expr-equiv',
      prompt: t`Pour $s=1$ et des fonctions réelles : multiplicateur de Fourier de l'application de Riesz $u\mapsto(\cdot,u)_{H^1}$, lue dans $H^{-1}$ par le crochet, en fonction de $r=|\xi|$ (écrire r).`,
      expected: '1+r^2',
      vars: ['r'],
    },
  ],
  solution: t`**(a) Ouvert borné.** $H^{-1}(\Omega)$ est, par définition, le dual de $V=H^1_0(\Omega)$. Pour $g\in L^2(\Omega)$, $|\int gv|\le\|g\|_{L^2}\|v\|_{L^2}\le\|g\|_{L^2}\|v\|_{H^1}$ : la forme $v\mapsto\int gv$ est dans $H^{-1}(\Omega)$, et $g\mapsto\int g\,\cdot$ est injective par densité de $C^\infty_c(\Omega)$ dans $L^2$. D'où le triplet $H^1_0\hookrightarrow L^2\hookrightarrow H^{-1}$ (polycopié, p. PDF 12).

**(b) Espace entier.** Avec $w=1+|\xi|^2$, paire :
- *Compatibilité.* Pour $f,\varphi\in L^2$, Parseval appliqué à $f$ et $\bar\varphi$ donne $\int f\varphi=\int\hat f(\xi)\hat\varphi(-\xi)\,d\xi$ ; pour $\varphi\in\mathcal S$, le crochet est l'action de la distribution $f$.
- *Continuité.* $\hat f(\xi)\hat\varphi(-\xi)=[w^{-s/2}\hat f](\xi)\,[w^{s/2}\hat\varphi(-\cdot)](\xi)$ et Cauchy–Schwarz : $|\langle f,\varphi\rangle|\le\|f\|_{H^{-s}}\|\varphi\|_{H^s}$.
- *Isométrie.* Avec $\hat\varphi_f(\xi)=w^{-s}\overline{\hat f(-\xi)}$ : $\|\varphi_f\|_{H^s}=\|f\|_{H^{-s}}$ et $\langle f,\varphi_f\rangle=\|f\|^2_{H^{-s}}$ ; la norme duale vaut donc $\|f\|_{H^{-s}}$.
- *Surjectivité.* $T\varphi=w^{s/2}\hat\varphi(-\cdot)$ est une isométrie bijective de $H^s$ sur $L^2$. Pour $\ell\in(H^s)'$, Riesz dans $L^2$ donne $g\in L^2$ avec $\ell(\varphi)=\int g\,T\varphi$ ; $f=\mathcal F^{-1}(w^{s/2}g)$ est dans $H^{-s}$ et $\ell=\langle f,\cdot\rangle$.

**(c) Le pivot n'est pas tout le dual.** Sur $]0,1[$, $v(1/2)=\int_0^{1/2}v'$ donne $|v(1/2)|\le2^{-1/2}\|v'\|_{L^2}$ : $\delta_{1/2}\in H^{-1}$. Si $g\in L^2$ la représentait, des fonctions test concentrées en $\frac12$ donneraient $1\le\|g\|_{L^2}\|\varphi_n\|_{L^2}\to0$.

**Riesz ou crochet.** Pour $s>0$, l'identification de Riesz de $H^s$ avec son dual n'est pas l'inclusion dans $H^{-s}$ : pour $s=1$ et $u$ réelle, elle associe à $u$ l'élément $(I-\Delta)u$, de multiplicateur $1+|\xi|^2$.`,
  steps: [
    t`Identifier $H^{-1}(\Omega)$ comme dual et y plonger $L^2(\Omega)$ par le pivot.`,
    t`Exhiber un élément de $H^{-1}(]0,1[)$ hors de $L^2$.`,
    t`Sur $\mathbb R^d$ : vérifier la compatibilité du crochet avec $\int f\varphi$.`,
    'Majorer par Cauchy–Schwarz pondéré, puis montrer que la majoration est atteinte.',
    'Obtenir la surjectivité par Riesz dans $L^2$.',
  ],
  commonErrors: [
    { id: 'e-pivot', description: t`Confondre $H^{-1}(\Omega)$ avec $L^2(\Omega)$.`, concept: 'dual-identification' },
    { id: 'e-riesz', description: t`Confondre l'identification de Riesz avec l'inclusion $H^s\subset H^{-s}$ donnée par le crochet.`, concept: 'dualite-interpolation-pivot' },
    { id: 'e-fourier-omega', description: t`Définir $H^{-1}(\Omega)$ par une transformée de Fourier sur $\Omega$.`, concept: 'dual-identification' },
  ],
  hints: [
    t`Sur $\Omega$, le dual est une définition : quel est le rôle de $L^2(\Omega)$ ? Sur $\mathbb R^d$, quel produit le crochet doit-il prolonger ?`,
    t`Sépare continuité, isométrie et surjectivité. Pour la continuité, insère $w^{-s/2}w^{s/2}$ ; pour la surjectivité, transporte le problème dans $L^2$.`,
    t`$\varphi_f$ défini par $\hat\varphi_f(\xi)=w^{-s}\overline{\hat f(-\xi)}$ réalise l'égalité. Pour la surjectivité, $\varphi\mapsto w^{s/2}\hat\varphi(-\cdot)$ est une isométrie de $H^s$ sur $L^2$, puis Riesz.`,
  ],
  rubric: rubric({
    hypotheses: t`Le caractère d'espace de Hilbert de $H^s$ et la densité de $V$ dans $L^2$ sont utilisés explicitement.`,
    methode: 'Cauchy–Schwarz pondéré, majoration atteinte, surjectivité par Riesz.',
    validite: t`Le crochet est compatible avec $\int f\varphi$ ; les poids et la parité de $w$ sont correctement manipulés.`,
    justifications: 'Le plongement du pivot est distingué de l’identification de Riesz.',
    conclusion: t`$(H^s)'\simeq H^{-s}$ isométriquement, et $L^2(\Omega)\subsetneq H^{-1}(\Omega)$.`,
  }),
  variant: {
    statement: t`Soit $s>d/2$. Montrer que $\delta_0\in H^{-s}(\mathbb R^d)$ et que $\langle\delta_0,\varphi\rangle=\varphi(0)$ pour tout $\varphi\in\mathcal S(\mathbb R^d)$, puis que $|\varphi(0)|\le\|\delta_0\|_{H^{-s}}\|\varphi\|_{H^s}$.`,
    solution: t`$\hat\delta_0=(2\pi)^{-d/2}$, donc $\|\delta_0\|^2_{H^{-s}}=(2\pi)^{-d}\int(1+|\xi|^2)^{-s}\,d\xi<+\infty$ car $2s>d$. Pour $\varphi\in\mathcal S$ : $\langle\delta_0,\varphi\rangle=(2\pi)^{-d/2}\int\hat\varphi(-\xi)\,d\xi=(2\pi)^{-d/2}\int\hat\varphi(\xi)\,d\xi=\varphi(0)$ par inversion de Fourier en $0$. La majoration est celle du crochet ; c'est l'injection $H^s\hookrightarrow C_0$ lue par dualité.`,
  },
  verification: { origin: 'complement', review: 'machine', notes: 'Triplet H¹₀ ⊂ L² ⊂ H⁻¹ : polycopié p. PDF 12 ; la dualité H^{-s} ≃ (H^s)′ est énoncée sans démonstration p. PDF 18, démonstration complétée ici.' },
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'dualite-interpolation.intermediaire',
  theoremId: 'dualite-interpolation',
  level: 'intermediaire',
  title: t`L'inégalité d'interpolation par Hölder`,
  statement: t`Soient $s_0,s_1\in\mathbb R$, $\theta\in[0,1]$, $s_\theta=(1-\theta)s_0+\theta s_1$ et $u\in H^{s_0}(\mathbb R^d)\cap H^{s_1}(\mathbb R^d)$. Prouver, par l'inégalité de Hölder, que $\|u\|_{H^{s_\theta}}\le\|u\|^{1-\theta}_{H^{s_0}}\|u\|^{\theta}_{H^{s_1}}$.`,
  source: poly(41, 'Exercice 17, intermédiaire ; démonstration de la section 4.3 (p. PDF 18)'),
  prerequisites: [],
  concepts: ['dualite-interpolation-exposants', 'calcul-exact', 'utilisation-prematuree'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-u', kind: 'hypothese', text: t`$s_0,s_1\in\mathbb R$, $\theta\in[0,1]$, $s_\theta=(1-\theta)s_0+\theta s_1$, et $u\in H^{s_0}(\mathbb R^d)\cap H^{s_1}(\mathbb R^d)$.` },
      { id: 'd-w', kind: 'definition', text: t`$w_\sigma(\xi)=(1+|\xi|^2)^\sigma$ et $\|v\|^2_{H^\sigma}=\int_{\mathbb R^d}w_\sigma|\hat v|^2\,d\xi$.` },
      { id: 'h-theta', kind: 'definition', local: true, text: t`Cas $0<\theta<1$.` },
      { id: 'e-split', kind: 'egalite', text: t`Presque partout : $w_{s_\theta}|\hat u|^2=\big(w_{s_0}|\hat u|^2\big)^{1-\theta}\big(w_{s_1}|\hat u|^2\big)^{\theta}$.` },
      {
        id: 'e-conj',
        kind: 'egalite',
        text: t`$p=\frac{1}{1-\theta}$ et $q=\frac1\theta$ appartiennent à $]1,+\infty[$ et vérifient $\frac1p+\frac1q=1$.`,
        masked: t`Exposants conjugués de Hölder : à déterminer.`,
        check: { kind: 'rational-vector', prompt: t`Pour $\theta=\frac13$ : valeurs de $p$ et de $q$.`, expected: ['3/2', '3'], labels: ['p', 'q'] },
      },
      { id: 'e-holder', kind: 'inegalite', text: t`$\displaystyle\int w_{s_\theta}|\hat u|^2\le\Big(\int w_{s_0}|\hat u|^2\Big)^{1-\theta}\Big(\int w_{s_1}|\hat u|^2\Big)^{\theta}$.` },
      { id: 'e-racine', kind: 'inegalite', text: t`Pour $0<\theta<1$ : $\|u\|_{H^{s_\theta}}\le\|u\|^{1-\theta}_{H^{s_0}}\|u\|^{\theta}_{H^{s_1}}$ ; en particulier $u\in H^{s_\theta}$.` },
      { id: 'c-limites', kind: 'egalite', text: t`Pour $\theta=0$ (resp. $\theta=1$), $s_\theta=s_0$ (resp. $s_1$) et l'inégalité est une égalité.` },
      { id: 'fin', kind: 'conclusion', text: t`Pour tout $\theta\in[0,1]$ : $\|u\|_{H^{(1-\theta)s_0+\theta s_1}}\le\|u\|^{1-\theta}_{H^{s_0}}\|u\|^{\theta}_{H^{s_1}}$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-swap', kind: 'inegalite', distractor: true, after: ['e-split'], text: t`$\|u\|_{H^{s_\theta}}\le\|u\|^{\theta}_{H^{s_0}}\|u\|^{1-\theta}_{H^{s_1}}$.` },
      { id: 'x-cvx', kind: 'egalite', distractor: true, text: t`$\|u\|^2_{H^{s_\theta}}=(1-\theta)\|u\|^2_{H^{s_0}}+\theta\|u\|^2_{H^{s_1}}$.` },
      { id: 'x-fini', kind: 'consequence', distractor: true, text: t`Les exposants $p=\frac1{1-\theta}$ et $q=\frac1\theta$ sont finis pour tout $\theta\in[0,1]$.` },
    ],
    justifications: [
      { id: 'j-puissances', label: t`$(1+|\xi|^2)^{(1-\theta)s_0+\theta s_1}=\big((1+|\xi|^2)^{s_0}\big)^{1-\theta}\big((1+|\xi|^2)^{s_1}\big)^{\theta}$, et $|\hat u|^2=(|\hat u|^2)^{1-\theta}(|\hat u|^2)^{\theta}$.` },
      { id: 'j-conj', label: t`$\frac1p+\frac1q=(1-\theta)+\theta=1$, avec $p,q$ finis car $\theta\notin\{0,1\}$.` },
      { id: 'j-holder', label: t`Inégalité de Hölder d'exposants $p$ et $q$, avec $\big\|(w_{s_0}|\hat u|^2)^{1-\theta}\big\|_{L^p}=\big(\int w_{s_0}|\hat u|^2\big)^{1-\theta}$, et de même en $q$.`, theorem: 'holder' },
      { id: 'j-racine', label: t`Définition des normes, puis racine carrée, croissante sur $[0,+\infty[$.` },
      { id: 'j-extremes', label: t`Pour $\theta\in\{0,1\}$, les deux membres coïncident, avec la convention $a^0=1$.` },
      { id: 'j-syn', label: t`Réunion du cas $0<\theta<1$ et des cas extrêmes.` },
      // Justification séduisante et fausse.
      { id: 'j-cs', label: 'Inégalité de Cauchy–Schwarz pondérée.', theorem: 'cauchy-schwarz' },
    ],
    rules: [
      { from: ['h-u', 'd-w'], to: 'e-split', by: 'j-puissances' },
      { from: ['h-u', 'h-theta'], to: 'e-conj', by: 'j-conj' },
      { from: ['e-split', 'e-conj', 'h-u', 'd-w'], to: 'e-holder', by: 'j-holder' },
      { from: ['e-holder', 'd-w'], to: 'e-racine', by: 'j-racine' },
      { from: ['h-u', 'd-w'], to: 'c-limites', by: 'j-extremes' },
      { from: ['e-racine', 'c-limites'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'e-holder',
        by: 'j-cs',
        verdict: 'incorrect',
        concept: 'dualite-interpolation-exposants',
        message: t`Cauchy–Schwarz est le cas $\theta=\frac12$ de Hölder. Pour $\theta$ quelconque, il faut les exposants conjugués $p=\frac1{1-\theta}$ et $q=\frac1\theta$, adaptés aux puissances $1-\theta$ et $\theta$.`,
      },
      {
        conclusion: 'x-swap',
        verdict: 'incorrect',
        concept: 'dualite-interpolation-exposants',
        message: t`Le poids $1-\theta$ porte sur la norme d'indice $s_0$ et le poids $\theta$ sur celle d'indice $s_1$ : c'est ce qu'impose $w_{s_\theta}=w_{s_0}^{1-\theta}w_{s_1}^\theta$.`,
        counterexample: t`$d=1$, $s_0=3$, $s_1=0$, $\theta=\frac13$ (donc $s_\theta=2$) et $\hat u=\mathbb 1_{]0,1[}$ : $\|u\|^2_{L^2}=1$, $\|u\|^2_{H^2}=\frac{28}{15}$, $\|u\|^2_{H^3}=\frac{96}{35}$. L'inégalité inversée donnerait $\big(\frac{28}{15}\big)^3\le\frac{96}{35}$, ce qui est faux.`,
      },
      {
        conclusion: 'x-cvx',
        verdict: 'incorrect',
        concept: 'calcul-exact',
        message: t`L'interpolation est multiplicative, non additive : il n'y a pas d'égalité, et la moyenne arithmétique ne fait que majorer la moyenne géométrique.`,
        counterexample: t`$d=1$, $s_0=0$, $s_1=2$, $\theta=\frac12$, $\hat u=\mathbb 1_{]0,1[}$ : $\|u\|^2_{H^1}=\frac43$, alors que $\frac12\big(1+\frac{28}{15}\big)=\frac{43}{30}$.`,
      },
      {
        conclusion: 'x-fini',
        verdict: 'incorrect',
        concept: 'dualite-interpolation-exposants',
        message: t`Pour $\theta=0$, $q=\frac1\theta$ n'est pas défini, et pour $\theta=1$, c'est $p$ : les extrémités se traitent à part, l'inégalité y étant une égalité.`,
      },
    ],
    removable: [
      {
        hypothesis: 'e-conj',
        label: 'Ne plus disposer d’exposants conjugués finis',
        necessary: true,
        explanation: t`Les formules $p=\frac1{1-\theta}$ et $q=\frac1\theta$ ne définissent des exposants réels finis que pour $0<\theta<1$ : aux extrémités, l'argument ne s'écrit pas tel quel.`,
        counterexample: t`Pour $\theta=1$, $p=\frac{1}{1-\theta}$ n'est pas défini : le cas se traite directement, $s_\theta=s_1$ et les deux membres valent $\|u\|_{H^{s_1}}$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Pour $s_0=-1$, $s_1=3$ et $\theta=\frac14$, valeur de $s_\theta$.`, expected: '0' }],
  solution: t`**Poids.** Avec $w_\sigma(\xi)=(1+|\xi|^2)^\sigma$, on a $w_{s_\theta}=w_{s_0}^{1-\theta}w_{s_1}^\theta$, donc, presque partout,
$$w_{s_\theta}|\hat u|^2=\big(w_{s_0}|\hat u|^2\big)^{1-\theta}\big(w_{s_1}|\hat u|^2\big)^{\theta}.$$

**Hölder.** Pour $0<\theta<1$, $p=\frac1{1-\theta}$ et $q=\frac1\theta$ sont conjugués et finis. Comme $\big\|(w_{s_0}|\hat u|^2)^{1-\theta}\big\|_{L^p}=\|u\|^{2(1-\theta)}_{H^{s_0}}$ et $\big\|(w_{s_1}|\hat u|^2)^{\theta}\big\|_{L^q}=\|u\|^{2\theta}_{H^{s_1}}$,
$$\|u\|^2_{H^{s_\theta}}\le\|u\|^{2(1-\theta)}_{H^{s_0}}\|u\|^{2\theta}_{H^{s_1}},$$
puis on prend la racine carrée. Pour $\theta\in\{0,1\}$, l'inégalité est une égalité.

**Remarques.** Aucun ordre entre $s_0$ et $s_1$ n'est requis. Inverser les exposants donne un énoncé faux : pour $s_0=3$, $s_1=0$, $\theta=\frac13$ et $\hat u=\mathbb 1_{]0,1[}$, on aurait $(28/15)^3\le 96/35$. L'hypothèse $u\in H^{s_0}\cap H^{s_1}$, implicite au polycopié, donne un sens au membre de droite.`,
  steps: [
    t`Factoriser le poids $w_{s_\theta}$ et l'intégrande.`,
    'Choisir les exposants conjugués adaptés aux puissances.',
    'Appliquer Hölder et identifier les normes.',
    'Prendre la racine carrée ; traiter les extrémités.',
  ],
  commonErrors: [
    { id: 'e-swap', description: t`Placer l'exposant $\theta$ sur la norme d'indice $s_0$.`, concept: 'dualite-interpolation-exposants' },
    { id: 'e-cs', description: t`Appliquer Cauchy–Schwarz pour un $\theta\neq\frac12$.`, concept: 'dualite-interpolation-exposants' },
    { id: 'e-extremes', description: t`Traiter $\frac1{1-\theta}$ ou $\frac1\theta$ comme un exposant réel fini pour $\theta\in\{0,1\}$, au lieu de traiter les extrémités à part.`, concept: 'dualite-interpolation-exposants' },
  ],
  hints: [
    t`Écris $\|u\|^2_{H^{s_\theta}}$ comme une intégrale de Fourier : comment le poids $w_{s_\theta}$ s'exprime-t-il à l'aide de $w_{s_0}$ et $w_{s_1}$ ?`,
    t`Coupe l'intégrande en deux facteurs élevés aux puissances $1-\theta$ et $\theta$, et choisis des exposants de Hölder qui annulent ces puissances.`,
    t`Prends $p=\frac1{1-\theta}$ et $q=\frac1\theta$ : alors $\big\|(w_{s_0}|\hat u|^2)^{1-\theta}\big\|_{L^p}=\big(\int w_{s_0}|\hat u|^2\big)^{1-\theta}$.`,
  ],
  rubric: rubric({
    hypotheses: t`$u\in H^{s_0}\cap H^{s_1}$ et $0<\theta<1$ sont explicités ; les extrémités sont traitées à part.`,
    methode: 'Factorisation du poids, puis Hölder d’exposants conjugués.',
    validite: 'Exposants corrects, et puissances des normes bien placées.',
    justifications: t`Hölder est invoqué avec $p=\frac1{1-\theta}$ et $q=\frac1\theta$, pas Cauchy–Schwarz.`,
    conclusion: t`L'inégalité est obtenue pour tout $\theta\in[0,1]$.`,
  }),
  variant: {
    statement: t`Soient $0\le a<b$, $\theta\in]0,1[$ et $c=(1-\theta)a+\theta b$. Pour $u\in L^2(\mathbb R^d)$ tel que $|\xi|^a\hat u$ et $|\xi|^b\hat u$ soient dans $L^2$, montrer que $\||\xi|^c\hat u\|_{L^2}\le\||\xi|^a\hat u\|^{1-\theta}_{L^2}\||\xi|^b\hat u\|^{\theta}_{L^2}$, puis que $\|u'\|_{L^2}\le\|u\|^{1/2}_{L^2}\|u''\|^{1/2}_{L^2}$ pour $u\in H^2(\mathbb R)$.`,
    solution: t`Presque partout, $|\xi|^{2c}|\hat u|^2=(|\xi|^{2a}|\hat u|^2)^{1-\theta}(|\xi|^{2b}|\hat u|^2)^{\theta}$. Hölder d'exposants $\frac1{1-\theta}$ et $\frac1\theta$ donne $\int|\xi|^{2c}|\hat u|^2\le\big(\int|\xi|^{2a}|\hat u|^2\big)^{1-\theta}\big(\int|\xi|^{2b}|\hat u|^2\big)^{\theta}$, puis la racine carrée conclut. Pour $d=1$, $a=0$, $b=2$, $\theta=\frac12$ : $c=1$, et Plancherel ($\widehat{u'}=i\xi\hat u$, $\widehat{u''}=-\xi^2\hat u$) donne $\|u'\|_{L^2}\le\|u\|^{1/2}_{L^2}\|u''\|^{1/2}_{L^2}$.`,
    proof: {
      purpose: 'demonstration',
      goal: 'fin',
      nodes: [
        { id: 'h-u', kind: 'hypothese', text: t`$0\le a<b$, $\theta\in]0,1[$, $c=(1-\theta)a+\theta b$, et $u\in L^2(\mathbb R^d)$ avec $|\xi|^a\hat u,|\xi|^b\hat u\in L^2$.` },
        { id: 'e-split', kind: 'egalite', text: t`Presque partout : $|\xi|^{2c}|\hat u|^2=\big(|\xi|^{2a}|\hat u|^2\big)^{1-\theta}\big(|\xi|^{2b}|\hat u|^2\big)^{\theta}$.` },
        { id: 'e-conj', kind: 'egalite', text: t`$p=\frac1{1-\theta}$ et $q=\frac1\theta$ sont finis et conjugués.` },
        { id: 'e-holder', kind: 'inegalite', text: t`$\displaystyle\int|\xi|^{2c}|\hat u|^2\le\Big(\int|\xi|^{2a}|\hat u|^2\Big)^{1-\theta}\Big(\int|\xi|^{2b}|\hat u|^2\Big)^{\theta}$.` },
        { id: 'e-racine', kind: 'inegalite', text: t`$\||\xi|^c\hat u\|_{L^2}\le\||\xi|^a\hat u\|^{1-\theta}_{L^2}\||\xi|^b\hat u\|^{\theta}_{L^2}$.` },
        { id: 'e-gn', kind: 'inegalite', text: t`Pour $u\in H^2(\mathbb R)$ : $\|u'\|_{L^2}\le\|u\|^{1/2}_{L^2}\|u''\|^{1/2}_{L^2}$.` },
        { id: 'fin', kind: 'conclusion', text: t`L'interpolation homogène est établie, ainsi que son cas particulier $\|u'\|^2_{L^2}\le\|u\|_{L^2}\|u''\|_{L^2}$ sur $\mathbb R$.` },
        { id: 'x-swap', kind: 'inegalite', distractor: true, text: t`$\||\xi|^c\hat u\|_{L^2}\le\||\xi|^a\hat u\|^{\theta}_{L^2}\||\xi|^b\hat u\|^{1-\theta}_{L^2}$.` },
        { id: 'x-somme', kind: 'egalite', distractor: true, text: t`$\||\xi|^c\hat u\|^2_{L^2}=(1-\theta)\||\xi|^a\hat u\|^2_{L^2}+\theta\||\xi|^b\hat u\|^2_{L^2}$.` },
      ],
      justifications: [
        { id: 'j-puissances', label: t`$|\xi|^{2c}=(|\xi|^{2a})^{1-\theta}(|\xi|^{2b})^{\theta}$.` },
        { id: 'j-conj', label: t`$(1-\theta)+\theta=1$, avec $0<\theta<1$.` },
        { id: 'j-holder', label: 'Inégalité de Hölder d’exposants conjugués.', theorem: 'holder' },
        { id: 'j-racine', label: 'Racine carrée, croissante sur $[0,+\\infty[$.' },
        { id: 'j-cas', label: t`Cas $d=1$, $a=0$, $b=2$, $\theta=\frac12$, et Plancherel : $\widehat{u'}=i\xi\hat u$, $\widehat{u''}=-\xi^2\hat u$.`, theorem: 'plancherel' },
        { id: 'j-syn', label: 'Réunion du cas général et du cas particulier.' },
      ],
      rules: [
        { from: ['h-u'], to: 'e-split', by: 'j-puissances' },
        { from: ['h-u'], to: 'e-conj', by: 'j-conj' },
        { from: ['e-split', 'e-conj', 'h-u'], to: 'e-holder', by: 'j-holder' },
        { from: ['e-holder'], to: 'e-racine', by: 'j-racine' },
        { from: ['e-racine'], to: 'e-gn', by: 'j-cas' },
        { from: ['e-racine', 'e-gn'], to: 'fin', by: 'j-syn' },
      ],
      traps: [
        {
          conclusion: 'x-swap',
          verdict: 'incorrect',
          concept: 'dualite-interpolation-exposants',
          message: t`Le poids $1-\theta$ doit porter sur l'indice $a$, conformément à $c=(1-\theta)a+\theta b$.`,
          counterexample: t`$d=1$, $a=0$, $b=2$, $\theta=\frac14$, $\hat u=\mathbb 1_{]0,1[}$ : $\||\xi|^{1/2}\hat u\|^2=\frac12$, alors que l'inégalité inversée, élevée à la puissance $8$, donnerait $\frac1{16}\le\frac1{125}$.`,
        },
        {
          conclusion: 'x-somme',
          verdict: 'incorrect',
          concept: 'calcul-exact',
          message: 'L’interpolation est multiplicative : la combinaison convexe des carrés n’est qu’un majorant.',
          counterexample: t`$d=1$, $a=0$, $b=2$, $\theta=\frac12$, $\hat u=\mathbb 1_{]0,1[}$ : $\int_0^1\xi^2\,d\xi=\frac13\neq\frac12\big(1+\frac15\big)=\frac35$.`,
        },
      ],
      removable: [],
    },
  },
  verification: { origin: 'polycopie', review: 'machine', notes: 'Démonstration du polycopié (p. PDF 18) ; l’hypothèse u ∈ H^{s0} ∩ H^{s1}, implicite, est explicitée.' },
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'dualite-interpolation.difficile',
  theoremId: 'dualite-interpolation',
  level: 'difficile',
  title: t`Convergence forte dans $H^s$ par interpolation`,
  statement: t`Soient $s\in]0,1[$ et $(u_n)$ une suite de $H^1(\mathbb R^d)$ telle que $\|u_n\|_{H^1}\le M$ pour tout $n$ et $u_n\to u$ dans $L^2(\mathbb R^d)$. Montrer que $u\in H^1(\mathbb R^d)$ et que la suite entière converge vers $u$ dans $H^s(\mathbb R^d)$. Montrer que la convergence dans $H^1$ peut échouer.`,
  source: poly(41, 'Exercice 17, difficile ; exemple de la section 4.3 (p. PDF 18)'),
  prerequisites: [],
  concepts: ['dualite-interpolation-borne', 'densite-fermeture', 'domaine-borne', 'faible-fort'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'holder', label: 'Par l’inégalité d’interpolation' },
      { id: 'frequences', label: 'Par découpage en fréquences' },
    ],
    nodes: [
      { id: 'h-borne', kind: 'hypothese', text: t`$(u_n)\subset H^1(\mathbb R^d)$ et $\|u_n\|_{H^1}\le M$ pour tout $n$.` },
      { id: 'h-cv', kind: 'hypothese', text: t`$u_n\to u$ dans $L^2(\mathbb R^d)$.` },
      { id: 'h-s', kind: 'hypothese', text: t`$s\in]0,1[$.` },
      { id: 's-fatou', kind: 'consequence', text: t`$u\in H^1(\mathbb R^d)$ et $\|u\|_{H^1}\le M$.` },
      { id: 's-diff', kind: 'inegalite', text: t`$\|u_n-u\|_{H^1}\le 2M$ pour tout $n$.` },
      { id: 't-interp', kind: 'application-theoreme', text: t`Pour tout $v\in H^1(\mathbb R^d)$ : $\|v\|_{H^s}\le\|v\|^{1-s}_{L^2}\|v\|^{s}_{H^1}$.` },
      {
        id: 'e-bound',
        kind: 'inegalite',
        text: t`$\|u_n-u\|_{H^s}\le(2M)^s\,\|u_n-u\|^{1-s}_{L^2}$ pour tout $n$.`,
        masked: t`Majoration de $\|u_n-u\|_{H^s}$ : exposant de $\|u_n-u\|_{L^2}$ à déterminer.`,
        check: { kind: 'expr-equiv', prompt: t`Exposant de $\|u_n-u\|_{L^2}$ dans la majoration, en fonction de s.`, expected: '1-s', vars: ['s'] },
      },
      { id: 'f-split', kind: 'inegalite', text: t`Pour tout $R>0$ et tout $n$ : $\|u_n-u\|^2_{H^s}\le(1+R^2)^s\|u_n-u\|^2_{L^2}+(1+R^2)^{s-1}(2M)^2$.` },
      { id: 'fin', kind: 'conclusion', text: t`$u\in H^1(\mathbb R^d)$ et $u_n\to u$ dans $H^s(\mathbb R^d)$, pour toute la suite.` },

      // Propositions plausibles mais fausses.
      { id: 'x-H1', kind: 'consequence', distractor: true, after: ['s-fatou'], text: t`$u_n\to u$ dans $H^1(\mathbb R^d)$.` },
      { id: 'x-sous-suite', kind: 'consequence', distractor: true, after: ['s-fatou'], text: t`Seule une sous-suite de $(u_n)$ converge vers $u$ dans $H^s(\mathbb R^d)$.` },
    ],
    justifications: [
      { id: 'j-fatou', label: t`Plancherel : $\hat u_n\to\hat u$ dans $L^2$ ; extraction d'une sous-suite convergeant presque partout ; lemme de Fatou appliqué à $(1+|\xi|^2)|\hat u_{n_k}|^2$.` },
      { id: 'j-triang', label: 'Inégalité triangulaire dans $H^1$.', theorem: 'inegalite-triangulaire' },
      { id: 'j-interp', label: t`Inégalité d'interpolation avec $s_0=0$, $s_1=1$, $\theta=s$.`, theorem: 'dualite-interpolation' },
      { id: 'j-applique', label: t`Application à $v=u_n-u\in H^1$, puis majoration $\|u_n-u\|_{H^1}\le 2M$.` },
      { id: 'j-limite', label: t`$\|u_n-u\|_{L^2}\to 0$ et $1-s>0$, donc $\|u_n-u\|^{1-s}_{L^2}\to 0$.` },
      { id: 'j-coupe', label: t`Sur $|\xi|\le R$ : $(1+|\xi|^2)^s\le(1+R^2)^s$ ; sur $|\xi|>R$ : $(1+|\xi|^2)^s\le(1+R^2)^{s-1}(1+|\xi|^2)$, car $s-1<0$.` },
      { id: 'j-eps', label: t`Pour $\varepsilon>0$, choisir $R$ tel que $(1+R^2)^{s-1}(2M)^2<\varepsilon/2$, puis $n$ assez grand pour le premier terme.` },
      // Justifications séduisantes et fausses.
      { id: 'j-ferme', label: t`$H^1(\mathbb R^d)$ est fermé dans $L^2(\mathbb R^d)$, donc la limite $u$ est dans $H^1$.` },
      { id: 'j-compact', label: t`L'injection $H^1(\mathbb R^d)\hookrightarrow L^2(\mathbb R^d)$ est compacte, donc la suite converge dans $H^1$, a fortiori dans $H^s$.` },
    ],
    rules: [
      { from: ['h-borne', 'h-cv'], to: 's-fatou', by: 'j-fatou' },
      { from: ['h-borne', 's-fatou'], to: 's-diff', by: 'j-triang' },
      { from: ['h-s'], to: 't-interp', by: 'j-interp', path: 'holder' },
      { from: ['t-interp', 's-diff'], to: 'e-bound', by: 'j-applique', path: 'holder' },
      { from: ['e-bound', 'h-cv', 'h-s'], to: 'fin', by: 'j-limite', path: 'holder' },
      { from: ['h-s', 's-diff'], to: 'f-split', by: 'j-coupe', path: 'frequences' },
      { from: ['f-split', 'h-cv', 'h-s'], to: 'fin', by: 'j-eps', path: 'frequences' },
    ],
    traps: [
      {
        conclusion: 's-fatou',
        by: 'j-ferme',
        verdict: 'incorrect',
        concept: 'densite-fermeture',
        message: t`$H^1(\mathbb R^d)$ est dense et non fermé dans $L^2(\mathbb R^d)$ : c'est la borne uniforme, via Fatou, qui place la limite dans $H^1$.`,
        counterexample: t`$\mathbb 1_{]0,1[}\in L^2(\mathbb R)$ est limite dans $L^2$ de régularisées $\mathbb 1_{]0,1[}*\rho_\varepsilon\in H^1(\mathbb R)$, sans appartenir à $H^1(\mathbb R)$.`,
      },
      {
        conclusion: 'fin',
        by: 'j-compact',
        verdict: 'incorrect',
        concept: 'domaine-borne',
        message: t`Sur $\mathbb R^d$, l'injection $H^1\hookrightarrow L^2$ n'est pas compacte (translations), et une compacité donnerait de toute façon une convergence dans $L^2$, pas dans $H^1$.`,
      },
      {
        conclusion: 'x-H1',
        verdict: 'incorrect',
        concept: 'dualite-interpolation-borne',
        message: t`L'interpolation exige $1-s>0$ : en $s=1$, la borne ne donne aucune convergence.`,
        counterexample: t`$d=1$, $\hat u_n=\mathbb 1_{[n,n+a_n]}$ avec $a_n=(1+(n+1)^2)^{-1}$ : $\|u_n\|^2_{L^2}=a_n\to 0$, mais $\frac{1+n^2}{1+(n+1)^2}\le\|u_n\|^2_{H^1}\le 1$, donc $\|u_n\|_{H^1}\to 1$.`,
      },
      {
        conclusion: 'x-sous-suite',
        verdict: 'incorrect',
        concept: 'dualite-interpolation-borne',
        message: t`La majoration $\|u_n-u\|_{H^s}\le(2M)^s\|u_n-u\|^{1-s}_{L^2}$ vaut pour tout $n$ : l'extraction ne sert qu'à établir $u\in H^1$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-borne',
        label: t`Retirer la borne uniforme dans $H^1$`,
        necessary: true,
        explanation: t`Sans borne en $H^1$, la convergence dans $L^2$ ne contrôle pas les hautes fréquences.`,
        counterexample: t`$d=1$, $\hat u_n=\mathbb 1_{[n,n+b_n]}$ avec $b_n=(1+(n+1)^2)^{-s}$ : $u_n\in H^1$, $\|u_n\|^2_{L^2}=b_n\to 0$, mais $\|u_n\|^2_{H^s}\ge b_n(1+n^2)^s\to 1$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Pour $s=\frac12$, $\|v\|_{L^2}=\frac1{16}$ et $\|v\|_{H^1}=4$, valeur de $\|v\|^{1-s}_{L^2}\|v\|^{s}_{H^1}$.`, expected: '1/2' }],
  solution: t`**La limite est dans $H^1$.** Par Plancherel, $\hat u_n\to\hat u$ dans $L^2$ ; une sous-suite converge presque partout, et Fatou donne $\int(1+|\xi|^2)|\hat u|^2\le\liminf_k\int(1+|\xi|^2)|\hat u_{n_k}|^2\le M^2$. Donc $u\in H^1$, $\|u\|_{H^1}\le M$ et $\|u_n-u\|_{H^1}\le 2M$. L'argument « $H^1$ est fermé dans $L^2$ » est faux : $H^1$ y est dense.

**Interpolation.** Avec $s_0=0$, $s_1=1$, $\theta=s$ :
$$\|u_n-u\|_{H^s}\le\|u_n-u\|^{1-s}_{L^2}\|u_n-u\|^{s}_{H^1}\le(2M)^s\|u_n-u\|^{1-s}_{L^2}\longrightarrow 0,$$
car $1-s>0$. La suite entière converge : l'extraction n'a servi qu'à identifier $u\in H^1$.

**Autre voie : découpage en fréquences.** Pour $R>0$, $\|u_n-u\|^2_{H^s}\le(1+R^2)^s\|u_n-u\|^2_{L^2}+(1+R^2)^{s-1}(2M)^2$ ; on choisit $R$ pour rendre le second terme petit, puis $n$ grand.

**Pas de convergence dans $H^1$.** $\hat u_n=\mathbb 1_{[n,n+a_n]}$, $a_n=(1+(n+1)^2)^{-1}$ : $\|u_n\|_{L^2}\to 0$ et $\|u_n\|_{H^1}\to1$. Le cas $s=1$ est exclu.`,
  steps: [
    t`Établir $u\in H^1$ par Fatou côté Fourier.`,
    t`Borner $\|u_n-u\|_{H^1}$ uniformément.`,
    t`Appliquer l'interpolation entre $L^2$ et $H^1$ à $u_n-u$.`,
    t`Conclure pour toute la suite, puis réfuter la convergence dans $H^1$.`,
  ],
  commonErrors: [
    { id: 'e-limite', description: t`Écrire $\|u_n-u\|_{H^1}$ sans avoir établi $u\in H^1$.`, concept: 'dualite-interpolation-borne' },
    { id: 'e-ferme', description: t`Croire $H^1$ fermé dans $L^2$.`, concept: 'densite-fermeture' },
    { id: 'e-H1', description: t`Conclure à la convergence dans $H^1$, ou pour $s=1$.`, concept: 'dualite-interpolation-borne' },
    { id: 'e-compact', description: t`Invoquer une compacité de $H^1(\mathbb R^d)\hookrightarrow L^2(\mathbb R^d)$, fausse sur l'espace entier.`, concept: 'domaine-borne' },
  ],
  hints: [
    t`Avant d'estimer $u_n-u$ dans $H^s$, faut-il savoir que $u$ est dans un espace de Sobolev ? Lequel ?`,
    t`Fatou côté Fourier donne $u\in H^1$ ; ensuite, une inégalité entre $L^2$, $H^s$ et $H^1$ appliquée à $u_n-u$ suffit.`,
    t`Interpolation avec $s_0=0$, $s_1=1$, $\theta=s$ : $\|v\|_{H^s}\le\|v\|^{1-s}_{L^2}\|v\|^s_{H^1}$, avec $v=u_n-u$ et $\|v\|_{H^1}\le 2M$.`,
  ],
  rubric: rubric({
    hypotheses: t`La borne uniforme et la convergence $L^2$ sont toutes deux utilisées ; $u\in H^1$ est démontré.`,
    methode: 'Fatou, puis interpolation entre $L^2$ et $H^1$, ou découpage en fréquences.',
    validite: t`L'exposant $1-s>0$ est identifié comme la raison de la convergence.`,
    justifications: t`Aucune fermeture de $H^1$ dans $L^2$, aucune compacité sur $\mathbb R^d$ n'est invoquée.`,
    conclusion: t`Convergence de toute la suite dans $H^s$, et contre-exemple dans $H^1$.`,
  }),
  variant: {
    statement: t`Soit $(u_n)$ bornée dans $H^1(\mathbb R^d)$, avec $u_n\to u$ dans $H^{-1}(\mathbb R^d)$ et $u\in H^1(\mathbb R^d)$. Montrer que $u_n\to u$ dans $L^2(\mathbb R^d)$.`,
    solution: t`L'interpolation avec $s_0=-1$, $s_1=1$, $\theta=\frac12$ donne $s_\theta=0$ et $\|v\|_{L^2}\le\|v\|^{1/2}_{H^{-1}}\|v\|^{1/2}_{H^1}$. Pour $v=u_n-u$ : $\|u_n-u\|_{L^2}\le\|u_n-u\|^{1/2}_{H^{-1}}\big(\sup_n\|u_n\|_{H^1}+\|u\|_{H^1}\big)^{1/2}\to 0$.`,
  },
  verification: { origin: 'complement', review: 'machine', notes: 'L’argument d’interpolation vient du polycopié (p. PDF 18), qui ne traite que le cas uₙ → 0 ; l’appartenance de la limite à H¹ (Fatou), le découpage en fréquences et le contre-exemple dans H¹ sont des compléments.' },
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT17: TheoremModule = {
  theorem: {
    id: 'dualite-interpolation',
    spaces: [
      t`$H^\sigma(\mathbb R^d)$, $\sigma\in\mathbb R$, normé par $\|u\|^2_{H^\sigma}=\int(1+|\xi|^2)^\sigma|\hat u(\xi)|^2\,d\xi$.`,
      t`Crochet de dualité : $\langle f,\varphi\rangle=\int\hat f(\xi)\,\hat\varphi(-\xi)\,d\xi$ pour $f\in H^{-s}$ et $\varphi\in H^s$ ; il prolonge $\int f\varphi$.`,
      t`$(H^s(\mathbb R^d))'$ : dual topologique, muni de la norme duale.`,
    ],
    hypotheses: [
      {
        id: 'h-param',
        text: t`$s_0,s_1\in\mathbb R$ et $\theta\in[0,1]$.`,
        whenRemoved: t`Pour $\theta=2$, $s_0=0$, $s_1=1$, on aurait $\|u\|_{H^2}\le\|u\|^{-1}_{L^2}\|u\|^2_{H^1}$, que contredit $\hat u=\mathbb 1_{]0,1[}$ : $\frac{28}{15}>\big(\frac43\big)^2$.`,
      },
      {
        id: 'h-u',
        text: t`$u\in H^{s_0}(\mathbb R^d)\cap H^{s_1}(\mathbb R^d)$ : hypothèse implicite au polycopié, qui donne un sens au membre de droite.`,
      },
    ],
    statement: t`Avec le crochet de dualité adapté, le dual hilbertien de $H^s(\mathbb R^d)$ s'identifie à $H^{-s}(\mathbb R^d)$. Si $s_0,s_1\in\mathbb R$ et $\theta\in[0,1]$, alors, pour $u\in H^{s_0}\cap H^{s_1}$,
$$\|u\|_{H^{(1-\theta)s_0+\theta s_1}}\le\|u\|^{1-\theta}_{H^{s_0}}\|u\|^{\theta}_{H^{s_1}}.$$`,
    conclusions: {
      stabilite: t`Contrôle des normes intermédiaires : une borne dans $H^{s_1}$ et une petitesse dans $H^{s_0}$ donnent une petitesse dans $H^{s_\theta}$, pour $0<\theta<1$.`,
      autre: t`$f\mapsto\langle f,\cdot\rangle$ est une isométrie linéaire bijective de $H^{-s}(\mathbb R^d)$ sur $(H^s(\mathbb R^d))'$.`,
    },
    sourceProof: 'idee',
    proofOutline: [
      t`Dualité : Cauchy–Schwarz pondéré par $w^{\mp s/2}$, majoration atteinte, puis Riesz dans $L^2$ transporté par l'isométrie $\varphi\mapsto w^{s/2}\hat\varphi(-\cdot)$.`,
      t`Interpolation : $w_{(1-\theta)s_0+\theta s_1}=w_{s_0}^{1-\theta}w_{s_1}^\theta$.`,
      t`Hölder d'exposants $\frac1{1-\theta}$ et $\frac1\theta$ appliqué à l'intégrale de $w_{s_\theta}|\hat u|^2$, puis racine carrée.`,
    ],
    warnings: [
      t`$H^{-1}(\Omega)$ est un dual : ses éléments ne sont pas forcément des fonctions $L^2$. $H^{-s}(\mathbb R^d)$, défini par Fourier, est une autre construction, adaptée à l'espace entier.`,
      t`Pour $s>0$, l'identification de Riesz de $H^s$ à son dual n'est pas l'inclusion $H^s\subset H^{-s}$ lue par le crochet.`,
      t`Les exposants de Hölder sont $\frac1{1-\theta}$ et $\frac1\theta$ ; aux extrémités $\theta\in\{0,1\}$, l'inégalité est une égalité.`,
      t`Une borne dans $H^1$ et une convergence dans $L^2$ donnent la convergence dans $H^s$ pour $s<1$, pas dans $H^1$.`,
    ],
    usefulFor: t`Faire converger des approximations dans une norme intermédiaire ; formuler des équations dans $H^{-1}$, $H^{-s}$ ou leurs analogues sur les domaines, en distinguant pivot et identification de Riesz.`,
    verification: { origin: 'polycopie', review: 'machine', notes: 'Interpolation démontrée au polycopié (p. PDF 18) ; la dualité y est énoncée sans démonstration, complétée dans l’exercice facile.' },
  },
  definitions: [
    {
      id: 'dualite-interpolation-crochet',
      term: 'Crochet de dualité sur $\\mathbb R^d$',
      statement: t`Pour $f\in H^{-s}(\mathbb R^d)$ et $\varphi\in H^s(\mathbb R^d)$ : $\langle f,\varphi\rangle=\int\hat f(\xi)\,\hat\varphi(-\xi)\,d\xi$, avec $|\langle f,\varphi\rangle|\le\|f\|_{H^{-s}}\|\varphi\|_{H^s}$ ; il prolonge $\int f\varphi$.`,
      source: poly(18, 'Section 4.3'),
    },
    {
      id: 'dualite-interpolation-triplet',
      term: t`Triplet $H^1_0\subset L^2\subset H^{-1}$`,
      statement: t`Si $\Omega$ est borné, $H^1_0(\Omega)\hookrightarrow L^2(\Omega)\hookrightarrow H^{-1}(\Omega)=(H^1_0(\Omega))'$, injections continues et denses, $L^2$ étant identifié à son dual.`,
      source: poly(12, 'Section 3.2'),
    },
  ],
  concepts: [
    {
      id: 'dualite-interpolation-pivot',
      label: 'Pivot et identification de Riesz',
      reminder: t`Pour $s>0$, le pivot $L^2$ plonge $H^s$ dans $H^{-s}$ par $\int f\varphi$ ; l'identification de Riesz associe à $u$ la forme $(\cdot,u)_{H^s}$, qui correspond à $(I-\Delta)^s\bar u$. Ce sont deux identifications différentes.`,
    },
    {
      id: 'dualite-interpolation-exposants',
      label: 'Exposants d’interpolation',
      reminder: t`Pour $s_\theta=(1-\theta)s_0+\theta s_1$ : $\|u\|_{H^{s_\theta}}\le\|u\|^{1-\theta}_{H^{s_0}}\|u\|^{\theta}_{H^{s_1}}$, par Hölder d'exposants $\frac1{1-\theta}$ et $\frac1\theta$.`,
    },
    {
      id: 'dualite-interpolation-borne',
      label: 'Borne et convergence',
      reminder: t`Une borne dans $H^1$ et une convergence dans $L^2$ donnent une convergence dans $H^s$ pour tout $s<1$, jamais gratuitement dans $H^1$.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-dualite-interpolation-borne',
      theoremId: 'dualite-interpolation',
      title: t`Borne dans $H^1$ sans convergence dans $H^1$`,
      claim: t`Si $(u_n)$ est bornée dans $H^1(\mathbb R)$ et converge vers $0$ dans $L^2(\mathbb R)$, alors $u_n\to 0$ dans $H^1(\mathbb R)$.`,
      correctStatement: t`On obtient seulement $u_n\to 0$ dans $H^s(\mathbb R)$ pour tout $s<1$.`,
      task: t`Pour $\hat u_n=\mathbb 1_{[n,n+a_n]}$ avec $a_n=(1+(n+1)^2)^{-1}$, calcule $\lim_n\|u_n\|^2_{H^1}$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\lim_n\|u_n\|^2_{H^1}$`, expected: '1' },
      explanation: t`$\|u_n\|^2_{L^2}=a_n\to 0$ et $\|u_n\|^2_{H^1}=\int_n^{n+a_n}(1+\xi^2)\,d\xi$ est compris entre $a_n(1+n^2)$ et $a_n(1+(n+1)^2)=1$ ; les deux bornes tendent vers $1$. La suite est bornée dans $H^1$, tend vers $0$ dans $L^2$, mais pas dans $H^1$.`,
      concept: 'dualite-interpolation-borne',
      source: poly(41, 'Exercice 17, difficile'),
    },
    {
      id: 'ce-dualite-interpolation-inverse',
      theoremId: 'dualite-interpolation',
      title: 'Exposants inversés',
      claim: t`$\|u\|_{H^{s_\theta}}\le\|u\|^{\theta}_{H^{s_0}}\|u\|^{1-\theta}_{H^{s_1}}$ pour tous $s_0,s_1$ et $\theta\in[0,1]$.`,
      correctStatement: t`$\|u\|_{H^{s_\theta}}\le\|u\|^{1-\theta}_{H^{s_0}}\|u\|^{\theta}_{H^{s_1}}$, avec $s_\theta=(1-\theta)s_0+\theta s_1$.`,
      task: t`Pour $d=1$ et $\hat u=\mathbb 1_{]0,1[}$, calcule $\|u\|^2_{L^2}$, $\|u\|^2_{H^2}$ et $\|u\|^2_{H^3}$ ; avec $s_0=3$, $s_1=0$, $\theta=\frac13$, l'énoncé inversé exigerait $\big(\|u\|^2_{H^2}\big)^3\le\|u\|^2_{H^3}\big(\|u\|^2_{L^2}\big)^2$.`,
      check: { kind: 'rational-vector', prompt: t`Valeurs de $\|u\|^2_{L^2}$, $\|u\|^2_{H^2}$, $\|u\|^2_{H^3}$`, expected: ['1', '28/15', '96/35'], labels: ['L²', 'H²', 'H³'] },
      explanation: t`$\int_0^1(1+\xi^2)^2\,d\xi=\frac{28}{15}$ et $\int_0^1(1+\xi^2)^3\,d\xi=\frac{96}{35}$. Or $\big(\frac{28}{15}\big)^3\approx 6{,}50>\frac{96}{35}\approx 2{,}74$ : l'énoncé inversé est faux, alors que l'énoncé correct, $\big(\frac{28}{15}\big)^3\le\big(\frac{96}{35}\big)^2$, est vérifié.`,
      concept: 'dualite-interpolation-exposants',
      source: poly(18, 'Section 4.3'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT17;
