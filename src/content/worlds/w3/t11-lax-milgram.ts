/**
 * Résultat 11 — Lax–Milgram.
 * Énoncé et démonstration : polycopié, section 3.4 (p. PDF 13–14).
 * Exercices : annexe B, exercice 11 (p. PDF 40).
 */
import { t, rubric, poly, FROM_POLY, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'lax-milgram.facile',
  theoremId: 'lax-milgram',
  level: 'facile',
  title: t`Continuité et coercivité de $a(u,v)=\int_\Omega(\nabla u\cdot\nabla v+uv)$`,
  statement: t`Soit $\Omega\subset\mathbb R^d$ un ouvert non vide et $V=H^1(\Omega)$, muni de la norme $\|u\|_V^2=\|u\|_{L^2}^2+\|\nabla u\|_{L^2}^2$. Pour $u,v\in V$, on pose $a(u,v)=\int_\Omega(\nabla u\cdot\nabla v+uv)$. Montrer que $a$ est bilinéaire, continue et coercive sur $V$, et déterminer les meilleures constantes $M$ et $\alpha$.`,
  source: poly(40, 'Exercice 11, facile'),
  prerequisites: [],
  concepts: ['hypotheses-theoreme', 'lax-milgram-coercivite-positivite', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'ps', label: t`Reconnaître le produit scalaire de $V$` },
      { id: 'termes', label: 'Majorer terme à terme puis assembler' },
    ],
    nodes: [
      { id: 'h-V', kind: 'hypothese', text: t`$\Omega\subset\mathbb R^d$ est un ouvert non vide et $V=H^1(\Omega)$, muni de $\|u\|_V^2=\|u\|_{L^2}^2+\|\nabla u\|_{L^2}^2$.` },
      { id: 'd-a', kind: 'definition', text: t`Pour $u,v\in V$ : $a(u,v)=\int_\Omega(\nabla u\cdot\nabla v+uv)$.` },
      { id: 'd-ps', kind: 'definition', text: t`Le produit scalaire de $V$ est $\langle u,v\rangle_V=\int_\Omega\nabla u\cdot\nabla v+\int_\Omega uv$.` },

      { id: 'int', kind: 'consequence', text: t`Pour $u,v\in V$ : $\nabla u\cdot\nabla v\in L^1(\Omega)$ et $uv\in L^1(\Omega)$ ; $a(u,v)$ est bien définie.` },
      { id: 'bilin', kind: 'consequence', text: t`$a$ est bilinéaire sur $V\times V$.` },

      { id: 'ps', kind: 'egalite', text: t`Pour $u,v\in V$ : $a(u,v)=\langle u,v\rangle_V$.` },
      { id: 'cs-somme', kind: 'inegalite', text: t`Pour $u,v\in V$ : $|a(u,v)|\le\|\nabla u\|_{L^2}\|\nabla v\|_{L^2}+\|u\|_{L^2}\|v\|_{L^2}$.` },
      { id: 'continue', kind: 'inegalite', text: t`Pour tous $u,v\in V$ : $|a(u,v)|\le\|u\|_V\|v\|_V$ ; $a$ est continue.` },

      { id: 'coer-eq', kind: 'egalite', text: t`Pour tout $u\in V$ : $a(u,u)=\|u\|_V^2$.` },
      { id: 'coer', kind: 'consequence', text: t`$a$ est coercive : $a(u,u)\ge\alpha\|u\|_V^2$ pour tout $u\in V$, avec $\alpha>0$.` },
      {
        id: 'constantes',
        kind: 'egalite',
        text: t`Les meilleures constantes sont $M=1$ et $\alpha=1$.`,
        masked: t`Meilleures constantes $M$ et $\alpha$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Meilleures constantes $(M,\alpha)$`, expected: ['1', '1'], labels: ['M', 'α'] },
      },

      { id: 'fin', kind: 'conclusion', text: t`$a$ est bilinéaire, continue et coercive sur $V$, de meilleures constantes $M=\alpha=1$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-poinc', kind: 'inegalite', distractor: true, text: t`Il existe $C>0$ tel que $\|u\|_{L^2(\Omega)}\le C\|\nabla u\|_{L^2(\Omega)}$ pour tout $u\in H^1(\Omega)$.` },
      { id: 'x-pos', kind: 'consequence', distractor: true, after: ['coer-eq'], text: t`Il suffit de vérifier $a(u,u)\ge 0$ pour tout $u\in V$ pour obtenir la coercivité.` },
    ],
    justifications: [
      { id: 'j-cs-L2', label: t`Cauchy–Schwarz dans $L^2(\Omega)$ : les facteurs sont dans $L^2$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-lin', label: 'Linéarité de l’intégrale, de la dérivation faible et du produit scalaire euclidien.' },
      { id: 'j-identif', label: t`Comparaison terme à terme de $a$ et du produit scalaire défini sur $V$.` },
      { id: 'j-cs-V', label: t`Cauchy–Schwarz dans l'espace de Hilbert $V$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-cs-R2', label: t`Cauchy–Schwarz dans $\mathbb R^2$ pour les couples $(\|\nabla u\|_{L^2},\|u\|_{L^2})$ et $(\|\nabla v\|_{L^2},\|v\|_{L^2})$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-carre', label: t`On prend $v=u$ et on reconnaît le carré de la norme de $V$.` },
      { id: 'j-def-coer', label: 'Définition de la coercivité.' },
      { id: 'j-optimal', label: t`L'égalité $a(u,u)=\|u\|_V^2$ pour $u\ne 0$ interdit $M<1$ et $\alpha>1$ ; $V\ne\{0\}$ car $\Omega\neq\emptyset$.` },
      { id: 'j-syn', label: 'Réunion des propriétés établies.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-evident', label: 'C’est évident.' },
      { id: 'j-sym-coer', label: t`Une forme symétrique est coercive.` },
      { id: 'j-poinc-H1', label: t`L'inégalité de Poincaré sur $H^1(\Omega)$ donne la coercivité.` },
    ],
    rules: [
      { from: ['h-V', 'd-a'], to: 'int', by: 'j-cs-L2' },
      { from: ['int', 'd-a'], to: 'bilin', by: 'j-lin' },

      { from: ['d-a', 'd-ps'], to: 'ps', by: 'j-identif', path: 'ps' },
      { from: ['ps'], to: 'continue', by: 'j-cs-V', path: 'ps' },

      { from: ['int', 'd-a'], to: 'cs-somme', by: 'j-cs-L2', path: 'termes' },
      { from: ['cs-somme'], to: 'continue', by: 'j-cs-R2', path: 'termes' },

      { from: ['d-a', 'h-V'], to: 'coer-eq', by: 'j-carre' },
      { from: ['coer-eq'], to: 'coer', by: 'j-def-coer' },
      { from: ['continue', 'coer-eq'], to: 'constantes', by: 'j-optimal' },

      { from: ['bilin', 'continue', 'coer', 'constantes'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'continue',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`La continuité se démontre : quelle inégalité contrôle $|a(u,v)|$ par le produit des normes ?`,
      },
      {
        conclusion: 'coer',
        by: 'j-sym-coer',
        verdict: 'incorrect',
        concept: 'lax-milgram-coercivite-positivite',
        message: t`La symétrie ne donne aucune minoration de $a(u,u)$. La coercivité se vérifie sur $a(u,u)$ lui-même.`,
        counterexample: t`$b=-\langle\cdot,\cdot\rangle_V$ est symétrique, mais $b(u,u)=-\|u\|_V^2<0$ pour $u\ne 0$.`,
      },
      {
        conclusion: 'coer',
        by: 'j-poinc-H1',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Poincaré est démontré sur $H^1_0$, pour $\Omega$ borné : il n'est ni vrai sur $H^1(\Omega)$, ni utile ici, car $a(u,u)$ contient déjà $\|u\|_{L^2}^2$.`,
        counterexample: t`$\Omega=]0,1[$, $u=1$ : $\|u\|_{L^2}=1$, $\|\nabla u\|_{L^2}=0$.`,
      },
      {
        conclusion: 'x-poinc',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Cette inégalité est fausse sur $H^1(\Omega)$ : les constantes la mettent en défaut lorsque $\Omega$ est borné. Elle n'a d'ailleurs aucune utilité ici.`,
        counterexample: t`$\Omega=]0,1[$, $u=1$ : $\|u\|_{L^2}=1$, $\|\nabla u\|_{L^2}=0$.`,
      },
      {
        conclusion: 'x-pos',
        verdict: 'incorrect',
        concept: 'lax-milgram-coercivite-positivite',
        message: t`La coercivité exige une constante $\alpha>0$ uniforme : $a(u,u)\ge\alpha\|u\|_V^2$. La seule positivité ne la fournit pas.`,
        counterexample: t`Sur $V=H^1(]0,1[)$, $b(u,v)=\int_0^1u'v'$ vérifie $b(u,u)\ge 0$, mais $b(1,1)=0$ alors que $\|1\|_V=1$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'coer-eq',
        label: t`Retirer le terme d'ordre zéro $uv$`,
        necessary: true,
        explanation: t`Sans le terme $uv$, la quantité $a_0(u,u)=\|\nabla u\|_{L^2}^2$ ne contrôle plus $\|u\|_V^2$ : la coercivité est perdue sur $H^1(\Omega)$.`,
        counterexample: t`Sur $\Omega=]0,1[$, avec $a_0(u,v)=\int_0^1u'v'$ et $u=1$ : $a_0(1,1)=0$, alors que $\|1\|_V^2=1$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Pour $\Omega=]0,1[$, $u(x)=x$ et $v(x)=x^2$ : valeur de $a(u,v)$`, expected: '5/4' }],
  solution: t`**Forme bien définie.** Pour $u,v\in V$, Cauchy–Schwarz dans $L^2$ assure que $\nabla u\cdot\nabla v$ et $uv$ sont intégrables. Par linéarité de l'intégrale et de la dérivation faible, $a$ est bilinéaire.

**Continuité.** Le plus direct est de reconnaître le produit scalaire de $V$ : $a(u,v)=\langle u,v\rangle_V$, puis Cauchy–Schwarz dans $V$ donne $|a(u,v)|\le\|u\|_V\|v\|_V$. Alternativement, Cauchy–Schwarz dans $L^2$ donne $|a(u,v)|\le\|\nabla u\|_{L^2}\|\nabla v\|_{L^2}+\|u\|_{L^2}\|v\|_{L^2}$, puis Cauchy–Schwarz dans $\mathbb R^2$ majore cette somme par $\|u\|_V\|v\|_V$.

**Coercivité.** Pour tout $u\in V$ : $a(u,u)=\|\nabla u\|_{L^2}^2+\|u\|_{L^2}^2=\|u\|_V^2$. Aucune inégalité de Poincaré n'intervient, et elle serait d'ailleurs fausse sur $H^1(\Omega)$.

**Meilleures constantes.** Le cas $v=u\ne 0$ dans $|a(u,v)|\le M\|u\|_V\|v\|_V$ donne $M\ge 1$ ; l'égalité $a(u,u)=\|u\|_V^2$ interdit $\alpha>1$ et $M<1$. Donc $M=\alpha=1$.`,
  steps: [
    'Vérifier que la forme est bien définie et bilinéaire.',
    'Établir la continuité, en identifiant le produit scalaire ou terme à terme.',
    t`Calculer $a(u,u)$ pour obtenir la coercivité.`,
    'Déterminer les meilleures constantes.',
  ],
  commonErrors: [
    { id: 'e-poincare', description: t`Invoquer l'inégalité de Poincaré sur $H^1(\Omega)$, où elle est fausse.`, concept: 'hypotheses-theoreme' },
    { id: 'e-positivite', description: t`Confondre $a(u,u)\ge 0$ et la coercivité, qui exige une constante $\alpha>0$.`, concept: 'lax-milgram-coercivite-positivite' },
  ],
  hints: [
    t`La forme $a$ ressemble à un objet que tu connais déjà sur $V=H^1(\Omega)$ : lequel ?`,
    t`Pour la continuité, deux voies : identifier $a$ au produit scalaire de $V$, ou majorer chacune des deux intégrales par Cauchy–Schwarz, puis assembler. Pour la coercivité, calcule simplement $a(u,u)$.`,
    t`$a(u,u)=\|\nabla u\|_{L^2}^2+\|u\|_{L^2}^2=\|u\|_V^2$ : la coercivité vaut avec $\alpha=1$, sans aucune inégalité de Poincaré.`,
  ],
  rubric: rubric({
    hypotheses: 'La forme est reconnue bien définie et bilinéaire sur l’espace indiqué.',
    methode: t`La continuité est établie par Cauchy–Schwarz ; la coercivité, par le calcul direct de $a(u,u)$.`,
    validite: 'Chaque inégalité est justifiée, sans recours à une inégalité indisponible.',
    justifications: 'Coercivité et positivité ne sont pas confondues.',
    conclusion: t`Les constantes $M=1$ et $\alpha=1$ sont établies.`,
  }),
  variant: {
    statement: t`Soit $\Omega\subset\mathbb R^d$ un ouvert non vide, $V=H^1(\Omega)$ et $a(u,v)=\int_\Omega(\nabla u\cdot\nabla v+2uv)$. Montrer que $a$ est continue de constante $M=2$ et coercive de constante $\alpha=1$.`,
    solution: t`Cauchy–Schwarz dans $L^2$ donne $|a(u,v)|\le\|\nabla u\|_{L^2}\|\nabla v\|_{L^2}+2\|u\|_{L^2}\|v\|_{L^2}\le 2\big(\|\nabla u\|_{L^2}\|\nabla v\|_{L^2}+\|u\|_{L^2}\|v\|_{L^2}\big)\le 2\|u\|_V\|v\|_V$, la dernière inégalité étant Cauchy–Schwarz dans $\mathbb R^2$. Par ailleurs $a(u,u)=\|\nabla u\|_{L^2}^2+2\|u\|_{L^2}^2\ge\|u\|_V^2$.`,
    closedChecks: [{ kind: 'rational', prompt: t`Pour $\Omega=]0,1[$ et $u(x)=x$ : valeur de $a(u,u)$`, expected: '5/3' }],
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'lax-milgram.intermediaire',
  theoremId: 'lax-milgram',
  level: 'intermediaire',
  title: t`Problème faible de Poisson et estimation en $H^1_0$`,
  statement: t`Soit $\Omega\subset\mathbb R^d$ un ouvert borné, $f\in L^2(\Omega)$ et $V=H^1_0(\Omega)$, muni de la norme $\|v\|_V=\|\nabla v\|_{L^2}$. Montrer que le problème $(P)$ : trouver $u\in V$ tel que $-\Delta u=f$ dans $\mathcal D'(\Omega)$, équivaut à la formulation faible $(FV)$ : trouver $u\in V$ tel que $\int_\Omega\nabla u\cdot\nabla v=\int_\Omega fv$ pour tout $v\in V$. Démontrer que $(FV)$ admet une unique solution, et établir $\|\nabla u\|_{L^2}\le C_P\|f\|_{L^2}$ ainsi que $\|u\|_{H^1}\le C_P\sqrt{1+C_P^2}\,\|f\|_{L^2}$, où $C_P$ est une constante de Poincaré de $\Omega$.`,
  source: poly(40, 'Exercice 11, intermédiaire ; problème de Poisson (section 3.4, p. PDF 14)'),
  prerequisites: ['poincare', 'distributions'],
  concepts: ['hypotheses-theoreme', 'lax-milgram-espace-test', 'densite-fermeture', 'existence-unicite', 'quantificateurs'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'lm', label: 'Application de Lax–Milgram' },
      { id: 'riesz', label: t`Riesz, puisque $a$ est ici le produit scalaire de $V$` },
      { id: 'test', label: t`Estimation directe en testant par $v=u$` },
    ],
    nodes: [
      { id: 'h-omega', kind: 'hypothese', text: t`$\Omega\subset\mathbb R^d$ est un ouvert borné.` },
      { id: 'h-f', kind: 'hypothese', text: t`$f\in L^2(\Omega)$.` },
      { id: 'd-V', kind: 'definition', text: t`$V=H^1_0(\Omega)$, adhérence de $C^\infty_c(\Omega)$ dans $H^1(\Omega)$, muni de $\langle u,v\rangle_V=\int_\Omega\nabla u\cdot\nabla v$ et de $\|v\|_V=\|\nabla v\|_{L^2}$.` },
      { id: 'd-a', kind: 'definition', text: t`Pour $u,v\in V$ : $a(u,v)=\int_\Omega\nabla u\cdot\nabla v$ et $\ell(v)=\int_\Omega fv$.` },
      { id: 'd-pb', kind: 'definition', text: t`$(P)$ : trouver $u\in V$ tel que $-\Delta u=f$ dans $\mathcal D'(\Omega)$.` },
      { id: 'd-fv', kind: 'definition', text: t`$(FV)$ : trouver $u\in V$ tel que $a(u,v)=\ell(v)$ pour tout $v\in V$.` },

      { id: 'poinc', kind: 'application-theoreme', text: t`Il existe $C_P>0$ tel que $\|v\|_{L^2}\le C_P\|\nabla v\|_{L^2}$ pour tout $v\in V$.` },
      { id: 'V-hilb', kind: 'consequence', text: t`$(V,\langle\cdot,\cdot\rangle_V)$ est un espace de Hilbert, de norme équivalente à la norme de $H^1$.` },
      { id: 'a-cont', kind: 'inegalite', text: t`$|a(u,v)|\le\|u\|_V\|v\|_V$ pour tous $u,v\in V$.` },
      { id: 'a-coer', kind: 'egalite', text: t`$a(u,u)=\|u\|_V^2$ pour tout $u\in V$.` },
      { id: 'ell-cont', kind: 'inegalite', text: t`$|\ell(v)|\le C_P\|f\|_{L^2}\|v\|_V$ : donc $\ell\in V'$ et $\|\ell\|_{V'}\le C_P\|f\|_{L^2}$.` },
      { id: 'lm', kind: 'application-theoreme', text: t`$(FV)$ admet une unique solution $u\in V$, et $\|u\|_V\le\|\ell\|_{V'}$.` },

      { id: 'dist', kind: 'egalite', text: t`Pour $u\in V$ et $\varphi\in C^\infty_c(\Omega)$ : $\langle-\Delta u,\varphi\rangle=\int_\Omega\nabla u\cdot\nabla\varphi=a(u,\varphi)$.` },
      { id: 'eq1', kind: 'consequence', text: t`Si $u$ résout $(P)$, alors $a(u,\varphi)=\ell(\varphi)$ pour tout $\varphi\in C^\infty_c(\Omega)$.` },
      { id: 'eq2', kind: 'consequence', text: t`Si $u$ résout $(P)$, alors $a(u,v)=\ell(v)$ pour tout $v\in V$.` },
      { id: 'eq3', kind: 'consequence', text: t`Si $u$ résout $(FV)$, alors $u$ résout $(P)$.` },
      { id: 'equiv', kind: 'consequence', text: t`$(P)$ et $(FV)$ sont équivalents.` },

      { id: 'estim', kind: 'inegalite', text: t`La solution vérifie $\|\nabla u\|_{L^2}\le C_P\|f\|_{L^2}$.` },
      { id: 'test-u', kind: 'inegalite', text: t`En prenant $v=u$ dans $(FV)$ : $\|\nabla u\|_{L^2}^2=\int_\Omega fu\le C_P\|f\|_{L^2}\|\nabla u\|_{L^2}$.` },
      { id: 'estim-H1', kind: 'inegalite', text: t`$\|u\|_{H^1}\le C_P\sqrt{1+C_P^2}\,\|f\|_{L^2}$.` },

      { id: 'fin', kind: 'conclusion', text: t`$(P)$ admet une unique solution, caractérisée par $(FV)$, avec $\|\nabla u\|_{L^2}\le C_P\|f\|_{L^2}$ et $\|u\|_{H^1}\le C_P\sqrt{1+C_P^2}\,\|f\|_{L^2}$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-test-H1', kind: 'consequence', distractor: true, after: ['eq1'], text: t`Si $u$ résout $(P)$, alors $a(u,v)=\ell(v)$ pour tout $v\in H^1(\Omega)$.` },
      { id: 'x-coer-H1', kind: 'inegalite', distractor: true, text: t`Il existe $\alpha>0$ tel que $a(u,u)\ge\alpha\|u\|_{H^1}^2$ pour tout $u\in H^1(\Omega)$.` },
      { id: 'x-cst1', kind: 'inegalite', distractor: true, after: ['estim'], text: t`Pour tout ouvert borné $\Omega$ : $\|\nabla u\|_{L^2}\le\|f\|_{L^2}$.` },
    ],
    justifications: [
      { id: 'j-poinc', label: t`Inégalité de Poincaré sur l'ouvert borné $\Omega$.`, theorem: 'poincare' },
      { id: 'j-Vhilb', label: t`$H^1_0(\Omega)$ est fermé dans $H^1(\Omega)$, donc complet ; Poincaré rend $\|\nabla\cdot\|_{L^2}$ équivalente à la norme de $H^1$.` },
      { id: 'j-cs-a', label: t`Cauchy–Schwarz dans $L^2(\Omega)^d$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-def-a', label: t`Définition de $a$ et de la norme de $V$.` },
      { id: 'j-ell', label: t`Cauchy–Schwarz dans $L^2(\Omega)$, puis Poincaré.`, theorem: 'cauchy-schwarz' },
      { id: 'j-lm', label: 'Théorème de Lax–Milgram.', theorem: 'lax-milgram' },
      { id: 'j-riesz-direct', label: t`Riesz appliqué dans $(V,\langle\cdot,\cdot\rangle_V)$ à $\ell$ : ici $a$ est le produit scalaire de $V$.`, theorem: 'riesz' },
      { id: 'j-distr', label: t`Définition de la dérivation distributionnelle : $\langle\partial_i\partial_iu,\varphi\rangle=-\langle\partial_iu,\partial_i\varphi\rangle$, et $\partial_iu\in L^2(\Omega)$.`, theorem: 'distributions' },
      { id: 'j-test', label: t`Écriture de l'égalité dans $\mathcal D'(\Omega)$ contre les fonctions test.` },
      { id: 'j-densite', label: t`Densité de $C^\infty_c(\Omega)$ dans $V$ (définition de $H^1_0$) et continuité de $a(u,\cdot)$ et de $\ell$ sur $V$.` },
      { id: 'j-restrict', label: t`On restreint $(FV)$ aux $v=\varphi\in C^\infty_c(\Omega)\subset V$, puis on identifie les deux distributions.` },
      { id: 'j-equiv', label: 'Réunion des deux implications.' },
      { id: 'j-compo', label: t`On compose $\|u\|_V\le\|\ell\|_{V'}$ et la majoration de $\|\ell\|_{V'}$.` },
      { id: 'j-test-u', label: t`Choix $v=u$, puis Cauchy–Schwarz et Poincaré.`, theorem: 'cauchy-schwarz' },
      { id: 'j-simplif', label: t`Division par $\|\nabla u\|_{L^2}$ lorsqu'il est non nul ; le cas nul est immédiat.` },
      { id: 'j-H1', label: t`$\|u\|_{H^1}^2=\|u\|_{L^2}^2+\|\nabla u\|_{L^2}^2\le(1+C_P^2)\|\nabla u\|_{L^2}^2$, puis l'estimation sur le gradient.` },
      { id: 'j-syn', label: 'Réunion de l’équivalence, de l’existence, de l’unicité et des estimations.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-poinc-H1', label: t`Inégalité de Poincaré sur $H^1(\Omega)$ tout entier, sans condition au bord.` },
      { id: 'j-identite', label: t`$C^\infty_c(\Omega)$ et $V$ sont le même espace.` },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['h-omega', 'd-V'], to: 'poinc', by: 'j-poinc' },
      { from: ['d-V', 'poinc'], to: 'V-hilb', by: 'j-Vhilb' },
      { from: ['d-a', 'd-V'], to: 'a-cont', by: 'j-cs-a' },
      { from: ['d-a', 'd-V'], to: 'a-coer', by: 'j-def-a' },
      { from: ['h-f', 'd-a', 'poinc'], to: 'ell-cont', by: 'j-ell' },

      { from: ['V-hilb', 'a-cont', 'a-coer', 'ell-cont', 'd-fv'], to: 'lm', by: 'j-lm', path: 'lm' },
      { from: ['V-hilb', 'ell-cont', 'd-fv', 'd-a'], to: 'lm', by: 'j-riesz-direct', path: 'riesz' },

      { from: ['d-V', 'd-a'], to: 'dist', by: 'j-distr' },
      { from: ['d-pb', 'dist'], to: 'eq1', by: 'j-test' },
      { from: ['eq1', 'a-cont', 'ell-cont', 'd-V'], to: 'eq2', by: 'j-densite' },
      { from: ['d-fv', 'dist', 'd-V'], to: 'eq3', by: 'j-restrict' },
      { from: ['eq2', 'eq3'], to: 'equiv', by: 'j-equiv' },

      { from: ['lm', 'ell-cont'], to: 'estim', by: 'j-compo' },
      { from: ['lm', 'poinc', 'h-f', 'd-a'], to: 'test-u', by: 'j-test-u', path: 'test' },
      { from: ['test-u'], to: 'estim', by: 'j-simplif', path: 'test' },
      { from: ['estim', 'poinc', 'd-V'], to: 'estim-H1', by: 'j-H1' },

      { from: ['lm', 'equiv', 'estim', 'estim-H1'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'poinc',
        by: 'j-poinc-H1',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Poincaré est démontré sur $H^1_0(\Omega)$. Sur $H^1(\Omega)$, sans condition au bord, l'inégalité est fausse : les constantes la mettent en défaut.`,
        counterexample: t`Pour $\Omega$ borné non vide et $u=1$ : $\|u\|_{L^2}=|\Omega|^{1/2}>0$, alors que $\|\nabla u\|_{L^2}=0$.`,
      },
      {
        conclusion: 'eq2',
        by: 'j-identite',
        verdict: 'incorrect',
        concept: 'densite-fermeture',
        message: t`$C^\infty_c(\Omega)$ est dense dans $V$, sans lui être égal. Il faut passer à la limite, en utilisant la continuité des deux membres pour la norme de $V$.`,
        counterexample: t`Sur $\Omega=]0,1[$, $v(x)=x(1-x)$ appartient à $H^1_0(]0,1[)$ et n'est pas à support compact dans $]0,1[$.`,
      },
      {
        conclusion: 'equiv',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: 'L’équivalence se démontre dans les deux sens : du problème vers la formulation faible (densité), et réciproquement (restriction aux fonctions test).',
      },
      {
        conclusion: 'x-test-H1',
        verdict: 'incorrect',
        concept: 'lax-milgram-espace-test',
        message: t`Tester contre tout $H^1(\Omega)$ imposerait une condition supplémentaire au bord. La formulation de Dirichlet se teste contre $V=H^1_0(\Omega)$.`,
        counterexample: t`$\Omega=]0,1[$, $f=1$, $u(x)=x(1-x)/2$ et $v=1\in H^1(]0,1[)$ : $a(u,1)=0$ alors que $\ell(1)=1$.`,
      },
      {
        conclusion: 'x-coer-H1',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`La coercivité n'a lieu que sur $V=H^1_0(\Omega)$, par Poincaré. Sur $H^1(\Omega)$, les constantes l'empêchent.`,
        counterexample: t`Pour $u=1$ sur $\Omega$ borné non vide : $a(1,1)=0$ et $\|1\|_{H^1}^2=|\Omega|>0$.`,
      },
      {
        conclusion: 'x-cst1',
        verdict: 'incorrect',
        concept: 'quantificateurs',
        message: t`La constante de Poincaré dépend de $\Omega$ : on ne peut pas la remplacer par $1$ en général.`,
        counterexample: t`$\Omega=]0,4[$, $f=1$ : $u(x)=x(4-x)/2$, $\|u'\|_{L^2}^2=16/3$ et $\|f\|_{L^2}^2=4$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-omega',
        label: t`Retirer la bornitude de $\Omega$`,
        necessary: true,
        explanation: t`Sans ouvert borné, Poincaré n'est plus disponible et le cadre hilbertien sur $H^1_0(\Omega)$ avec la norme du gradient s'écroule.`,
        counterexample: t`Sur $\Omega=\mathbb R$, pour $f\in C^\infty_c(\mathbb R)$, $f\ge 0$, $f\ne 0$, il n'existe aucune solution $u\in H^1(\mathbb R)$ de $-u''=f$ : $u'$ serait décroissante, de carré intégrable, donc de limites nulles en $\pm\infty$, alors que $u'(+\infty)-u'(-\infty)=-\int f<0$.`,
      },
      {
        hypothesis: 'h-f',
        label: t`Retirer $f\in L^2(\Omega)$`,
        necessary: true,
        explanation: t`Lax–Milgram comme Riesz exigent $\ell\in V'$ : sans $f\in L^2(\Omega)$ (ou au moins $f\in H^{-1}(\Omega)$), le second membre n'a plus de sens continu sur $V$.`,
        counterexample: t`En dimension $2$, pour $0\in\Omega$, la distribution de Dirac $\delta_0$ n'est pas dans $H^{-1}(\Omega)$ : $\ell(v)=v(0)$ n'est pas continue sur $H^1_0(\Omega)$, car les fonctions $v_n=\min\big(1,\log(R/|x|)/\log n\big)^+$ (avec $B(0,R)\subset\Omega$) vérifient $v_n(0)=1$ et $\|\nabla v_n\|_{L^2}^2=2\pi/\log n\to 0$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Pour $\Omega=]0,1[$, $f=1$ et $u(x)=x(1-x)/2$ : valeur de $\|\nabla u\|_{L^2}^2$`, expected: '1/12' }],
  solution: t`**Cadre.** $H^1_0(\Omega)$ est fermé dans $H^1(\Omega)$, donc complet ; par Poincaré, $\|\nabla\cdot\|_{L^2}$ y est une norme équivalente à celle de $H^1$, et $V$ muni de $\langle u,v\rangle_V=\int_\Omega\nabla u\cdot\nabla v$ est un espace de Hilbert.

**Hypothèses de Lax–Milgram.** $|a(u,v)|\le\|u\|_V\|v\|_V$ par Cauchy–Schwarz, $a(u,u)=\|u\|_V^2$, et pour $v\in V$ : $|\ell(v)|\le\|f\|_{L^2}\|v\|_{L^2}\le C_P\|f\|_{L^2}\|v\|_V$, donc $\ell\in V'$ et $\|\ell\|_{V'}\le C_P\|f\|_{L^2}$.

**Existence, unicité.** Lax–Milgram (ou Riesz, puisque $a$ est ici le produit scalaire de $V$) fournit une unique solution $u\in V$ de $(FV)$, avec $\|u\|_V\le\|\ell\|_{V'}$.

**Équivalence avec $(P)$.** Pour $u\in V$ et $\varphi\in C^\infty_c(\Omega)$, la définition des dérivées au sens des distributions donne $\langle-\Delta u,\varphi\rangle=\int_\Omega\nabla u\cdot\nabla\varphi=a(u,\varphi)$. Si $u$ résout $(P)$, alors $a(u,\varphi)=\ell(\varphi)$ pour tout $\varphi\in C^\infty_c(\Omega)$ ; $C^\infty_c(\Omega)$ étant dense dans $V$ et $a(u,\cdot)$, $\ell$ continues sur $V$, l'égalité s'étend à tout $v\in V$. Réciproquement, si $u$ résout $(FV)$, sa restriction aux fonctions test montre que $-\Delta u=f$ dans $\mathcal D'(\Omega)$.

**Estimations.** $\|\nabla u\|_{L^2}=\|u\|_V\le\|\ell\|_{V'}\le C_P\|f\|_{L^2}$. Puis $\|u\|_{H^1}^2\le(1+C_P^2)\|\nabla u\|_{L^2}^2\le(1+C_P^2)C_P^2\|f\|_{L^2}^2$.

**Point de vigilance.** Les fonctions test vivent dans $H^1_0(\Omega)$, pas dans $H^1(\Omega)$ : c'est là que la condition de Dirichlet est codée. La constante $C_P$ dépend de $\Omega$.`,
  steps: [
    t`Poser le cadre : $V$ Hilbert par Poincaré.`,
    t`Vérifier continuité, coercivité de $a$ et $\ell\in V'$.`,
    'Appliquer Lax–Milgram (existence, unicité, estimation).',
    t`Démontrer l'équivalence entre $(P)$ et $(FV)$ par densité de $C^\infty_c(\Omega)$ dans $V$.`,
    t`En déduire l'estimation en norme de $H^1$.`,
  ],
  commonErrors: [
    { id: 'e-test-H1', description: t`Tester la formulation faible contre tout $H^1(\Omega)$.`, concept: 'lax-milgram-espace-test' },
    { id: 'e-densite', description: t`Confondre « $C^\infty_c(\Omega)$ dense dans $V$ » et « $C^\infty_c(\Omega)=V$ ».`, concept: 'densite-fermeture' },
    { id: 'e-constante', description: t`Oublier la dépendance en $\Omega$ de la constante de Poincaré.`, concept: 'quantificateurs' },
  ],
  hints: [
    t`Avant d'appliquer Lax–Milgram, quels sont l'espace, la forme bilinéaire et la forme linéaire ? Où la condition au bord est-elle codée ?`,
    t`Pour l'équivalence avec $(P)$, travaille d'abord contre $\varphi\in C^\infty_c(\Omega)$, puis passe à tout $V$ par densité. Pour l'estimation, compose Lax–Milgram avec la majoration de $\|\ell\|_{V'}$.`,
    t`$|\ell(v)|\le\|f\|_{L^2}\|v\|_{L^2}\le C_P\|f\|_{L^2}\|\nabla v\|_{L^2}$. Ensuite, $\|u\|_{H^1}^2=\|u\|_{L^2}^2+\|\nabla u\|_{L^2}^2\le(1+C_P^2)\|\nabla u\|_{L^2}^2$.`,
  ],
  rubric: rubric({
    hypotheses: t`Le cadre hilbertien sur $H^1_0(\Omega)$ est établi, et $\ell\in V'$ est vérifiée.`,
    methode: 'Lax–Milgram (ou Riesz) est appliqué, l’équivalence étant démontrée séparément.',
    validite: 'Les passages à la limite par densité sont justifiés.',
    justifications: t`L'espace des fonctions test est correctement identifié.`,
    conclusion: 'Existence, unicité et estimations en sont déduites.',
  }),
  variant: {
    statement: t`Soit $\Omega\subset\mathbb R^d$ un ouvert borné, $f\in L^2(\Omega)$, $b\in\mathbb R^d$ et $V=H^1_0(\Omega)$. Formuler faiblement le problème $-\Delta u+b\cdot\nabla u+u=f$ dans $\mathcal D'(\Omega)$, $u\in V$, puis montrer l'existence et l'unicité de la solution.`,
    solution: t`La forme $a(u,v)=\int_\Omega\big(\nabla u\cdot\nabla v+(b\cdot\nabla u)v+uv\big)$ n'est pas symétrique dès que $b\ne0$ : Riesz ne s'applique pas directement à $a$. Pour $\varphi\in C^\infty_c(\Omega)$, $\int_\Omega(b\cdot\nabla\varphi)\varphi=\tfrac12\int_\Omega b\cdot\nabla(\varphi^2)=0$, et par densité $\int_\Omega(b\cdot\nabla u)u=0$ pour tout $u\in V$. Donc $a(u,u)=\|\nabla u\|_{L^2}^2+\|u\|_{L^2}^2$ : $a$ est coercive pour la norme de $H^1$. Sa continuité découle de Cauchy–Schwarz, et $\ell(v)=\int_\Omega fv$ est continue. Lax–Milgram conclut, et l'équivalence avec le problème dans $\mathcal D'(\Omega)$ s'établit comme dans l'exercice.`,
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'lax-milgram.difficile',
  theoremId: 'lax-milgram',
  level: 'difficile',
  title: t`Surjectivité de $B$ : image fermée et image dense, sans symétrie`,
  statement: t`Soient $V$ un espace de Hilbert réel, $a:V\times V\to\mathbb R$ bilinéaire, continue (constante $M$) et coercive (constante $\alpha>0$), **non supposée symétrique**, et $f\in V'$. Par Riesz, on associe à $a$ un opérateur $B\in\mathcal L(V)$ et à $f$ un vecteur $g\in V$ tels que $a(u,v)=\langle Bu,v\rangle_V$ et $\langle f,v\rangle=\langle g,v\rangle_V$ pour tous $u,v\in V$. Reconstituer la preuve de la surjectivité de $B$ en séparant quatre étapes : (1) injectivité et estimation, (2) image fermée, (3) image dense, (4) surjectivité. En déduire le théorème de Lax–Milgram : existence, unicité, et $\|u\|_V\le\alpha^{-1}\|f\|_{V'}$.`,
  source: poly(13, 'Démonstration, section 3.4 ; exercice 11, difficile (p. PDF 40)'),
  prerequisites: ['riesz', 'stampacchia'],
  concepts: ['image-dense-surjective', 'coercivite-symetrie', 'hypotheses-theoreme', 'utilisation-prematuree', 'complet-necessaire'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    paths: [
      { id: 'image', label: 'Image fermée et image dense (polycopié)' },
      { id: 'stampacchia', label: t`Stampacchia avec $K=V$` },
    ],
    nodes: [
      { id: 'h-V', kind: 'hypothese', text: t`$V$ est un espace de Hilbert réel.` },
      { id: 'h-bilin', kind: 'hypothese', text: t`$a:V\times V\to\mathbb R$ est bilinéaire (elle n'est pas supposée symétrique).` },
      { id: 'h-cont', kind: 'hypothese', text: t`Continuité : il existe $M>0$ tel que $|a(u,v)|\le M\|u\|_V\|v\|_V$ pour tous $u,v\in V$.` },
      { id: 'h-coer', kind: 'hypothese', text: t`Coercivité : il existe $\alpha>0$ tel que $a(u,u)\ge\alpha\|u\|_V^2$ pour tout $u\in V$.` },
      { id: 'h-f', kind: 'hypothese', text: t`$f\in V'$.` },

      // Construction de B et de g.
      { id: 'forme-cont', kind: 'consequence', text: t`Pour tout $u\in V$, la forme $v\mapsto a(u,v)$ appartient à $V'$.` },
      {
        id: 'riesz-B',
        kind: 'application-theoreme',
        text: t`Pour tout $u\in V$, il existe un unique $Bu\in V$ tel que $a(u,v)=\langle Bu,v\rangle_V$ pour tout $v\in V$.`,
        masked: t`Application de Riesz à $a(u,\cdot)$ : hypothèses à reconnaître d'abord.`,
        check: {
          kind: 'choice',
          prompt: t`Avant d'appliquer Riesz à $a(u,\cdot)$, quel est le rôle de chaque hypothèse sur $a$ ?`,
          options: [
            t`La continuité rend $a(u,\cdot)$ élément de $V'$ ; la coercivité servira ensuite à minorer $\|Bu\|_V$.`,
            t`La coercivité rend $a(u,\cdot)$ élément de $V'$ ; la continuité servira ensuite à minorer $\|Bu\|_V$.`,
            t`La symétrie rend $a(u,\cdot)$ élément de $V'$ ; aucune autre hypothèse n'est utile à ce stade.`,
            t`La bilinéarité seule rend $a(u,\cdot)$ continue ; continuité et coercivité ne servent qu'à l'estimation finale.`,
          ],
          correct: [0],
          explanation: t`La continuité de $a$ borne $a(u,\cdot)$ par $M\|u\|_V$ : Riesz s'applique. La coercivité intervient ensuite, pour minorer $\|Bu\|_V$.`,
        },
      },
      { id: 'B-L', kind: 'consequence', text: t`$B:V\to V$ est linéaire et $\|Bu\|_V\le M\|u\|_V$ : $B\in\mathcal L(V)$.` },
      { id: 'riesz-g', kind: 'application-theoreme', text: t`Il existe un unique $g\in V$ tel que $\langle f,v\rangle=\langle g,v\rangle_V$ pour tout $v\in V$, et $\|g\|_V=\|f\|_{V'}$.` },
      { id: 'reduc', kind: 'consequence', text: t`Pour $u\in V$ : $\big[a(u,v)=\langle f,v\rangle\ \ \forall v\in V\big]\iff Bu=g$.` },

      // 1. Injectivité et estimation.
      { id: 'minor', kind: 'inegalite', text: t`Pour tout $u\in V$ : $\alpha\|u\|_V^2\le\langle Bu,u\rangle_V\le\|Bu\|_V\|u\|_V$.` },
      { id: 'borne-inf', kind: 'inegalite', text: t`Pour tout $u\in V$ : $\|Bu\|_V\ge\alpha\|u\|_V$.` },
      { id: 'inj', kind: 'consequence', text: t`$\ker B=\{0\}$ : $B$ est injectif.` },

      // 2. Image fermée.
      { id: 's-suite', kind: 'definition', local: true, text: t`Soit $(u_n)\subset V$ telle que $Bu_n\to y$ dans $V$.` },
      { id: 'cauchy', kind: 'consequence', text: t`$(u_n)$ est de Cauchy dans $V$ : $\|u_n-u_m\|_V\le\alpha^{-1}\|Bu_n-Bu_m\|_V$.` },
      { id: 'conv', kind: 'consequence', text: t`Il existe $u\in V$ tel que $u_n\to u$ dans $V$.` },
      { id: 'lim', kind: 'egalite', text: t`$Bu=y$.` },
      { id: 'ferme', kind: 'consequence', text: t`$\operatorname{Im}B$ est fermée dans $V$.` },

      // 3. Image dense.
      { id: 'orth', kind: 'definition', local: true, text: t`Soit $v\in V$ tel que $v\perp\operatorname{Im}B$, c'est-à-dire $\langle Bu,v\rangle_V=0$ pour tout $u\in V$.` },
      { id: 'orth-test', kind: 'egalite', text: t`$\langle Bv,v\rangle_V=0$.` },
      { id: 'orth-nul', kind: 'consequence', text: t`$v=0$ : l'orthogonal de $\operatorname{Im}B$ est réduit à $\{0\}$.` },
      { id: 'dense', kind: 'consequence', text: t`$\operatorname{Im}B$ est dense dans $V$ : $\overline{\operatorname{Im}B}=V$.` },

      // 4. Surjectivité.
      { id: 'surj', kind: 'consequence', text: t`$\operatorname{Im}B=V$ : $B$ est surjectif.` },

      // Second chemin : Stampacchia avec K = V.
      { id: 's-K', kind: 'consequence', text: t`$K=V$ est non vide, convexe et fermé dans $V$.` },
      { id: 's-ineq', kind: 'application-theoreme', text: t`Il existe un unique $u\in V$ tel que $a(u,w-u)\ge\langle f,w-u\rangle$ pour tout $w\in V$.` },
      { id: 's-eq', kind: 'consequence', text: t`Pour cet $u$ : $a(u,v)=\langle f,v\rangle$ pour tout $v\in V$.` },
      { id: 's-uniq', kind: 'consequence', text: t`Toute solution de l'équation $a(u,v)=\langle f,v\rangle$ pour tout $v\in V$ résout l'inéquation : elle est unique.` },

      // Conclusion commune.
      { id: 'exist-unique', kind: 'consequence', text: t`Pour tout $f\in V'$, il existe un unique $u\in V$ tel que $a(u,v)=\langle f,v\rangle$ pour tout $v\in V$.` },
      { id: 'estim', kind: 'inegalite', text: t`Cette solution vérifie $\|u\|_V\le\alpha^{-1}\|f\|_{V'}$.` },
      { id: 'fin', kind: 'conclusion', text: t`Théorème de Lax–Milgram : pour tout $f\in V'$, il existe un unique $u\in V$ tel que $a(u,v)=\langle f,v\rangle$ pour tout $v\in V$, et $\|u\|_V\le\alpha^{-1}\|f\|_{V'}$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-dense-surj', kind: 'consequence', distractor: true, after: ['dense'], text: t`Comme $\overline{\operatorname{Im}B}=V$, on a directement $\operatorname{Im}B=V$, sans établir la fermeture de l'image.` },
      { id: 'x-sym', kind: 'consequence', distractor: true, text: t`$a$ est un produit scalaire équivalent sur $V$ : Riesz appliqué à $(V,a)$ conclut directement.` },
    ],
    justifications: [
      { id: 'j-forme-u', label: t`Linéaire en $v$ par bilinéarité, bornée en $v$ par $M\|u\|_V$ par continuité de $a$.` },
      { id: 'j-riesz', label: 'Théorème de représentation de Riesz.', theorem: 'riesz' },
      { id: 'j-B-L', label: t`Linéarité : unicité du représentant de Riesz. Borne : $\|Bu\|_V^2=a(u,Bu)\le M\|u\|_V\|Bu\|_V$.` },
      { id: 'j-reduc', label: t`L'égalité $\langle Bu-g,v\rangle_V=0$ pour tout $v\in V$ équivaut à $Bu=g$, en prenant $v=Bu-g$.` },
      { id: 'j-minor', label: t`$\langle Bu,u\rangle_V=a(u,u)$, coercivité, puis Cauchy–Schwarz dans $V$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-div', label: t`Division par $\|u\|_V$ si $u\ne 0$ ; le cas $u=0$ est immédiat.` },
      { id: 'j-ker', label: t`Si $Bu=0$, la minoration donne $u=0$ ; $B$ étant linéaire, noyau nul équivaut à injectivité.` },
      { id: 'j-diff', label: t`La minoration appliquée à $u_n-u_m$ (linéarité de $B$) ; $(Bu_n)$ convergente est de Cauchy.` },
      { id: 'j-complet', label: t`Complétude de $V$.` },
      { id: 'j-cont-B', label: t`Continuité de $B$ : $Bu_n\to Bu$, puis unicité de la limite.` },
      { id: 'j-seq', label: t`Caractérisation séquentielle : toute limite de suite d'éléments de $\operatorname{Im}B$ appartient à $\operatorname{Im}B$.` },
      { id: 'j-test-v', label: t`On prend $u=v$ dans la relation d'orthogonalité.` },
      { id: 'j-adjoint', label: t`L'adjoint de $B\in\mathcal L(V)$ vérifie $\langle Bu,v\rangle_V=\langle u,B^*v\rangle_V$ pour tout $u$ : donc $B^*v=0$, d'où $\langle Bv,v\rangle_V=\langle v,B^*v\rangle_V=0$.` },
      { id: 'j-coer-v', label: t`$\alpha\|v\|_V^2\le a(v,v)=\langle Bv,v\rangle_V$.` },
      { id: 'j-ortho-dense', label: t`Dans un espace de Hilbert, un sous-espace $F$ vérifie $\overline F=V$ si et seulement si $F^\perp=\{0\}$ ; ici $F=\operatorname{Im}B$ est un sous-espace car $B$ est linéaire.` },
      { id: 'j-dense-ferme', label: t`Un sous-espace à la fois fermé et dense est l'espace entier : $\operatorname{Im}B=\overline{\operatorname{Im}B}=V$.` },
      { id: 'j-bij', label: t`$B$ est bijectif, et la réduction donne l'équivalence entre le problème et $Bu=g$.` },
      { id: 'j-K-V', label: t`$V$ est non vide, convexe et fermé dans lui-même.` },
      { id: 'j-stamp', label: t`Théorème de Stampacchia, pour le convexe fermé non vide $K=V$.`, theorem: 'stampacchia' },
      { id: 'j-pm', label: t`On prend $w=u+v$ puis $w=u-v$ : deux inégalités opposées, par linéarité de $a(u,\cdot)$ et de $f$.` },
      { id: 'j-uniq-stamp', label: t`Une égalité implique l'inégalité large ; l'unicité dans le théorème de Stampacchia conclut.` },
      { id: 'j-syn-stamp', label: 'Réunion de l’existence et de l’unicité données par Stampacchia.' },
      { id: 'j-estim', label: t`$\alpha\|u\|_V^2\le a(u,u)=\langle f,u\rangle\le\|f\|_{V'}\|u\|_V$, puis division par $\|u\|_V$ si $u\ne 0$.` },
      { id: 'j-syn', label: 'Réunion de l’existence, de l’unicité et de l’estimation.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-bilin-seule', label: t`Une forme bilinéaire est automatiquement continue en chaque variable.` },
      { id: 'j-M-inverse', label: t`La majoration $\|Bu\|_V\le M\|u\|_V$ se renverse en une minoration.` },
      { id: 'j-image-ferme', label: 'L’image d’un opérateur borné est toujours fermée.' },
      { id: 'j-dense-egal', label: 'L’image étant dense, elle est égale à tout l’espace.' },
      { id: 'j-sym-riesz', label: t`Comme $a$ est symétrique, on applique Riesz dans $(V,a)$.` },
      { id: 'j-lm', label: 'Théorème de Lax–Milgram.', theorem: 'lax-milgram' },
    ],
    rules: [
      { from: ['h-bilin', 'h-cont'], to: 'forme-cont', by: 'j-forme-u' },
      { from: ['h-V', 'forme-cont'], to: 'riesz-B', by: 'j-riesz' },
      { from: ['riesz-B', 'h-bilin', 'h-cont'], to: 'B-L', by: 'j-B-L' },
      { from: ['h-V', 'h-f'], to: 'riesz-g', by: 'j-riesz' },
      { from: ['riesz-B', 'riesz-g'], to: 'reduc', by: 'j-reduc' },

      // 1. Injectivité et estimation.
      { from: ['h-coer', 'riesz-B'], to: 'minor', by: 'j-minor', path: 'image' },
      { from: ['minor'], to: 'borne-inf', by: 'j-div', path: 'image' },
      { from: ['borne-inf', 'B-L'], to: 'inj', by: 'j-ker', path: 'image' },

      // 2. Image fermée.
      { from: ['s-suite', 'borne-inf', 'B-L'], to: 'cauchy', by: 'j-diff', path: 'image' },
      { from: ['cauchy', 'h-V'], to: 'conv', by: 'j-complet', path: 'image' },
      { from: ['conv', 's-suite', 'B-L'], to: 'lim', by: 'j-cont-B', path: 'image' },
      { from: ['lim'], to: 'ferme', by: 'j-seq', path: 'image' },

      // 3. Image dense.
      { from: ['orth'], to: 'orth-test', by: 'j-test-v', path: 'image' },
      { from: ['orth', 'B-L'], to: 'orth-test', by: 'j-adjoint', path: 'image' },
      { from: ['orth-test', 'h-coer', 'riesz-B'], to: 'orth-nul', by: 'j-coer-v', path: 'image' },
      { from: ['orth-nul', 'h-V', 'B-L'], to: 'dense', by: 'j-ortho-dense', path: 'image' },

      // 4. Surjectivité.
      { from: ['ferme', 'dense'], to: 'surj', by: 'j-dense-ferme', path: 'image' },

      { from: ['surj', 'inj', 'reduc'], to: 'exist-unique', by: 'j-bij', path: 'image' },

      // Chemin par Stampacchia.
      { from: ['h-V'], to: 's-K', by: 'j-K-V', path: 'stampacchia' },
      { from: ['h-V', 'h-bilin', 'h-cont', 'h-coer', 's-K', 'h-f'], to: 's-ineq', by: 'j-stamp', path: 'stampacchia' },
      { from: ['s-ineq', 'h-bilin'], to: 's-eq', by: 'j-pm', path: 'stampacchia' },
      { from: ['s-ineq'], to: 's-uniq', by: 'j-uniq-stamp', path: 'stampacchia' },
      { from: ['s-eq', 's-uniq'], to: 'exist-unique', by: 'j-syn-stamp', path: 'stampacchia' },

      { from: ['exist-unique', 'h-coer'], to: 'estim', by: 'j-estim' },
      { from: ['exist-unique', 'estim'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'surj',
        by: 'j-dense-egal',
        verdict: 'incorrect',
        concept: 'image-dense-surjective',
        message: t`Une image dense n'est pas forcément tout l'espace : c'est la fermeture, établie à part, qui permet de conclure. Densité et fermeture sont deux étapes distinctes.`,
        counterexample: t`Sur $\ell^2$, $T(u)=(u_n/n)_{n\ge 1}$ est borné, injectif, d'image dense (elle contient les suites à support fini), mais $g=(1/n)_n\in\ell^2$ n'a pas d'antécédent : il faudrait $u_n=1$ pour tout $n$.`,
      },
      {
        conclusion: 'x-dense-surj',
        verdict: 'incorrect',
        concept: 'image-dense-surjective',
        message: t`« Image dense » et « image égale à l'espace » sont deux propriétés distinctes : sans l'image fermée, la densité ne donne pas la surjectivité.`,
        counterexample: t`Sur $\ell^2$, $T(u)=(u_n/n)_{n\ge 1}$ est injectif et d'image dense, sans être surjectif, car son image n'est pas fermée.`,
      },
      {
        conclusion: 'ferme',
        by: 'j-image-ferme',
        verdict: 'incorrect',
        concept: 'image-dense-surjective',
        message: t`L'image d'un opérateur borné n'est pas fermée en général : c'est la minoration $\|Bu\|_V\ge\alpha\|u\|_V$ qui donne la fermeture ici.`,
        counterexample: t`$T(u)=(u_n/n)_{n\ge 1}$ sur $\ell^2$ : l'image contient les suites à support fini, donc elle est dense, et elle ne contient pas $(1/n)_n$. Elle n'est donc pas fermée.`,
      },
      {
        conclusion: 'forme-cont',
        by: 'j-bilin-seule',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`En dimension infinie, la bilinéarité ne donne aucune continuité : l'application de Riesz repose sur l'hypothèse de continuité de $a$.`,
        counterexample: t`Si $\varphi$ est une forme linéaire non continue sur $V$ de dimension infinie, $a(u,v)=\langle u,v\rangle_V+\varphi(u)\varphi(v)$ est bilinéaire et coercive, mais $a(u,\cdot)$ n'est pas continue dès que $\varphi(u)\neq 0$.`,
      },
      {
        conclusion: 'borne-inf',
        by: 'j-M-inverse',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Une majoration ne se renverse pas : la minoration vient de la coercivité, combinée à Cauchy–Schwarz.`,
      },
      {
        conclusion: 'x-sym',
        verdict: 'incorrect',
        concept: 'coercivite-symetrie',
        message: t`La symétrie n'est pas une hypothèse de Lax–Milgram : une forme coercive peut ne pas être symétrique, et ne définit alors pas un produit scalaire.`,
        counterexample: t`$V=\mathbb R^2$, $a(u,v)=u_1v_1+u_2v_2+u_1v_2-u_2v_1$ : $a(u,u)=\|u\|^2$, mais $a(e_1,e_2)=1$ et $a(e_2,e_1)=-1$.`,
      },
      {
        conclusion: 'exist-unique',
        by: 'j-sym-riesz',
        verdict: 'incorrect',
        concept: 'coercivite-symetrie',
        message: t`Riesz dans $(V,a)$ suppose $a$ symétrique. L'énoncé ne le suppose pas : c'est tout l'objet du théorème.`,
        counterexample: t`$V=\mathbb R^2$, $a(u,v)=u_1v_1+u_2v_2+u_1v_2-u_2v_1$ est coercive et non symétrique.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-cont',
        label: t`Retirer la continuité de $a$`,
        necessary: true,
        explanation: t`Sans continuité, $a(u,\cdot)$ n'appartient plus à $V'$ : Riesz ne s'applique plus et $B$ n'est plus défini. La conclusion peut tomber.`,
        counterexample: t`Si $\varphi$ est une forme linéaire non continue sur $V$ de dimension infinie (il en existe, par base algébrique) et $g\in V$ vérifie $\varphi(g)\neq 0$, alors $a(u,v)=\langle u,v\rangle_V+\varphi(u)\varphi(v)$ est coercive, et l'équation $a(u,v)=\langle g,v\rangle_V$ pour tout $v$ n'a aucune solution : $\varphi(u)\ne 0$ rendrait $\varphi$ continue, et $\varphi(u)=0$ imposerait $u=g$, avec $\varphi(g)\ne 0$.`,
      },
      {
        hypothesis: 'h-coer',
        label: t`Retirer la coercivité de $a$`,
        necessary: true,
        explanation: t`Sans coercivité, plus de minoration : ni l'injectivité, ni la fermeture de l'image, ni la densité ne sont garanties.`,
        counterexample: t`Sur $V=\ell^2$, $a(u,v)=\sum_{n\ge 1}u_nv_n/n$ est bilinéaire, continue, symétrique, avec $a(u,u)>0$ pour $u\ne 0$, mais non coercive ($a(e_n,e_n)=1/n$). Pour $g=(1/n)_n\in\ell^2$, l'équation $a(u,v)=\langle g,v\rangle$ impose $u_n=1$ pour tout $n$ : aucune solution dans $\ell^2$.`,
      },
      {
        hypothesis: 'h-V',
        label: t`Retirer la complétude de $V$`,
        necessary: true,
        explanation: 'Sans complétude, la suite de Cauchy obtenue pour l’image fermée peut ne pas converger, et Riesz n’est plus disponible.',
        counterexample: t`Sur l'espace des polynômes sur $[0,1]$, muni du produit scalaire de $L^2(0,1)$, avec $a=\langle\cdot,\cdot\rangle$ et $f(v)=\int_0^1e^xv\,dx$ : une solution polynomiale $u$ serait égale à $e^x$ par densité des polynômes dans $L^2(0,1)$, ce qui est impossible.`,
      },
      {
        hypothesis: 'h-f',
        label: t`Retirer $f\in V'$`,
        necessary: true,
        explanation: t`Si $u$ résout $a(u,v)=\langle f,v\rangle$ pour tout $v$, alors $f=a(u,\cdot)$ est continue : la continuité de $f$ est nécessaire à l'existence.`,
        counterexample: t`Si $f$ est une forme linéaire non continue sur $V$, une solution $u$ rendrait $f=a(u,\cdot)$ continue : aucune solution n'existe.`,
      },
    ],
  },
  closedChecks: [
    {
      kind: 'rational-vector',
      prompt: t`Sur $V=\mathbb R^2$ euclidien, $a(u,v)=u_1v_1+u_2v_2+u_1v_2-u_2v_1$ et $\langle f,v\rangle=v_1$ : coordonnées de la solution $u$`,
      expected: ['1/2', '-1/2'],
      labels: ['u₁', 'u₂'],
    },
  ],
  solution: t`**Construction de $B$ et $g$.** Pour $u\in V$ fixé, la forme $v\mapsto a(u,v)$ est linéaire (bilinéarité de $a$) et bornée par $M\|u\|_V\|v\|_V$ (continuité de $a$) : elle appartient à $V'$. Riesz fournit un unique $Bu\in V$ tel que $a(u,v)=\langle Bu,v\rangle_V$ pour tout $v\in V$. L'unicité donne la linéarité de $B$, et $\|Bu\|_V^2=a(u,Bu)\le M\|u\|_V\|Bu\|_V$ donne $\|Bu\|_V\le M\|u\|_V$. De même, Riesz fournit $g\in V$ tel que $\langle f,v\rangle=\langle g,v\rangle_V$ et $\|g\|_V=\|f\|_{V'}$. L'équation $a(u,v)=\langle f,v\rangle$ pour tout $v$ équivaut alors à $Bu=g$.

**1. Injectivité et estimation.** La coercivité et Cauchy–Schwarz donnent $\alpha\|u\|_V^2\le\langle Bu,u\rangle_V\le\|Bu\|_V\|u\|_V$, donc $\|Bu\|_V\ge\alpha\|u\|_V$, et $\ker B=\{0\}$.

**2. Image fermée.** Si $Bu_n\to y$ dans $V$, la minoration appliquée à $u_n-u_m$ montre que $(u_n)$ est de Cauchy ; $V$ étant complet, $u_n\to u$, et $Bu=y$ par continuité de $B$.

**3. Image dense.** Si $v\perp\operatorname{Im}B$, alors $\langle Bu,v\rangle_V=0$ pour tout $u$. En prenant $u=v$ (ou en notant que $B^*v=0$, comme dans le polycopié) : $\alpha\|v\|_V^2\le\langle Bv,v\rangle_V=0$, donc $v=0$. L'orthogonal de $\operatorname{Im}B$ étant nul, $\overline{\operatorname{Im}B}=V$.

**4. Surjectivité.** L'image est à la fois fermée et dense : $\operatorname{Im}B=V$. Avec l'injectivité, $B$ est bijectif : pour tout $f$, il existe un unique $u$ tel que $Bu=g$, c'est-à-dire $a(u,v)=\langle f,v\rangle$ pour tout $v$.

**Estimation.** $\alpha\|u\|_V^2\le a(u,u)=\langle f,u\rangle\le\|f\|_{V'}\|u\|_V$, donc $\|u\|_V\le\alpha^{-1}\|f\|_{V'}$.

**Autre chemin.** Le convexe fermé non vide $K=V$ permet d'appliquer Stampacchia : il existe un unique $u\in V$ tel que $a(u,w-u)\ge\langle f,w-u\rangle$ pour tout $w\in V$. Le choix $w=u+v$ puis $w=u-v$ donne $a(u,v)=\langle f,v\rangle$. Toute solution de l'équation étant solution de l'inéquation, elle est unique.

**Point de vigilance.** Aucune symétrie de $a$ n'a été utilisée. « Image dense » et « image égale à $V$ » sont deux étapes distinctes.`,
  steps: [
    t`Par Riesz, construire $B\in\mathcal L(V)$ et $g\in V$, et réduire le problème à $Bu=g$.`,
    t`Injectivité et estimation : $\|Bu\|_V\ge\alpha\|u\|_V$.`,
    'Image fermée : minoration, complétude, continuité.',
    t`Image dense : orthogonal de $\operatorname{Im}B$ réduit à $\{0\}$.`,
    'Surjectivité : image fermée et dense.',
    t`Conclure à l'existence, l'unicité et l'estimation.`,
  ],
  commonErrors: [
    { id: 'e-dense-surj', description: 'Conclure à la surjectivité à partir de la seule densité de l’image.', concept: 'image-dense-surjective' },
    { id: 'e-symetrie', description: t`Supposer $a$ symétrique et appliquer Riesz dans $(V,a)$.`, concept: 'coercivite-symetrie' },
    { id: 'e-riesz-continuite', description: t`Appliquer Riesz à $a(u,\cdot)$ sans avoir reconnu l'hypothèse de continuité de $a$.`, concept: 'hypotheses-theoreme' },
    { id: 'e-circulaire', description: 'Invoquer le théorème de Lax–Milgram pour le démontrer.', concept: 'utilisation-prematuree' },
  ],
  hints: [
    t`Une fois $B$ et $g$ construits par Riesz, le problème se réduit à $Bu=g$. Que faut-il prouver sur $B$, et quelles hypothèses sur $a$ interviennent à chaque stade ?`,
    t`Sépare quatre blocs : minoration et injectivité (coercivité) ; image fermée (minoration et complétude) ; image dense (orthogonal de l'image) ; surjectivité (fermeture et densité). La symétrie n'intervient nulle part.`,
    t`Pour l'image dense : si $v\perp\operatorname{Im}B$, prends $u=v$ dans $\langle Bu,v\rangle_V=0$, puis utilise $\alpha\|v\|_V^2\le a(v,v)=\langle Bv,v\rangle_V$. Pour la fermeture : applique la minoration à $u_n-u_m$.`,
  ],
  rubric: rubric({
    hypotheses: t`Continuité et coercivité sont reconnues et utilisées à l'endroit requis ; aucune symétrie n'est supposée.`,
    methode: 'Les quatre étapes sont séparées : minoration, image fermée, image dense, surjectivité.',
    validite: 'Densité et fermeture sont traitées séparément, avant de conclure à la surjectivité.',
    justifications: 'Chaque invocation de théorème a ses hypothèses vérifiées, sans utilisation prématurée.',
    conclusion: 'Existence, unicité et estimation du théorème de Lax–Milgram sont établies.',
  }),
  variant: {
    statement: t`Soient $V\neq\{0\}$ un Hilbert réel, $B\in\mathcal L(V)$ tel que $\|Bu\|_V\le M\|u\|_V$ et $\langle Bu,u\rangle_V\ge\alpha\|u\|_V^2$ pour tout $u$ (avec $\alpha>0$), et $g\in V$. Sans passer par l'image, montrer que $T(u)=u-\rho(Bu-g)$ est une contraction de $V$ pour $0<\rho<2\alpha/M^2$, et en déduire que $Bu=g$ a une unique solution.`,
    solution: t`Pour $u,v\in V$, posons $w=u-v$. On a $T(u)-T(v)=w-\rho Bw$, donc $\|T(u)-T(v)\|_V^2=\|w\|_V^2-2\rho\langle Bw,w\rangle_V+\rho^2\|Bw\|_V^2\le(1-2\rho\alpha+\rho^2M^2)\|w\|_V^2$. La condition $0<\rho<2\alpha/M^2$ donne $q^2:=1-2\rho\alpha+\rho^2M^2<1$. De plus $M\ge\alpha$ (coercivité et continuité, avec $V\ne\{0\}$) donne $q^2\ge(1-\rho\alpha)^2\ge 0$. Ainsi $T$ est une contraction de $V$, complet, et le théorème du point fixe de Banach fournit un unique $u$ tel que $T(u)=u$, c'est-à-dire $Bu=g$.`,
    closedChecks: [
      {
        kind: 'expr-equiv',
        prompt: t`Coefficient $q^2=1-2\rho\alpha+\rho^2M^2$ pour $\rho=\alpha/M^2$, en fonction de $\alpha$ et $M$`,
        expected: '1 - alpha^2 / M^2',
        vars: ['alpha', 'M'],
      },
    ],
    proof: {
      purpose: 'demonstration',
      goal: 'fin',
      nodes: [
        { id: 'h-V', kind: 'hypothese', text: t`$V$ est un espace de Hilbert réel, $V\neq\{0\}$.` },
        { id: 'h-B', kind: 'hypothese', text: t`$B\in\mathcal L(V)$ vérifie $\|Bu\|_V\le M\|u\|_V$ et $\langle Bu,u\rangle_V\ge\alpha\|u\|_V^2$ pour tout $u\in V$, avec $\alpha>0$.` },
        { id: 'h-rho', kind: 'hypothese', text: t`$0<\rho<2\alpha/M^2$.` },
        { id: 'd-T', kind: 'definition', text: t`Pour $g\in V$ et $u\in V$ : $T(u)=u-\rho(Bu-g)$.` },
        { id: 'dif', kind: 'egalite', text: t`Pour $u,v\in V$, en posant $w=u-v$ : $T(u)-T(v)=w-\rho Bw$.` },
        { id: 'dev', kind: 'egalite', text: t`$\|T(u)-T(v)\|_V^2=\|w\|_V^2-2\rho\langle Bw,w\rangle_V+\rho^2\|Bw\|_V^2$.` },
        { id: 'maj', kind: 'inegalite', text: t`$\|T(u)-T(v)\|_V^2\le(1-2\rho\alpha+\rho^2M^2)\|u-v\|_V^2$.` },
        { id: 'q', kind: 'inegalite', text: t`$q^2:=1-2\rho\alpha+\rho^2M^2$ vérifie $0\le q^2<1$.` },
        { id: 'contr', kind: 'consequence', text: t`$T:V\to V$ est une contraction stricte, de rapport $q<1$.` },
        { id: 'pf', kind: 'application-theoreme', text: t`$T$ admet un unique point fixe dans $V$.` },
        { id: 'eq', kind: 'egalite', text: t`Pour $u\in V$ : $T(u)=u\iff Bu=g$.` },
        { id: 'fin', kind: 'conclusion', text: t`L'équation $Bu=g$ admet une unique solution $u\in V$.` },
        { id: 'x-tout-rho', kind: 'consequence', distractor: true, after: ['contr'], text: t`$T$ est une contraction stricte pour tout $\rho>0$.` },
      ],
      justifications: [
        { id: 'j-calc', label: 'Calcul direct : les termes en $g$ se compensent.' },
        { id: 'j-dev', label: 'Développement du carré de la norme.' },
        { id: 'j-maj', label: t`Coercivité sur le terme en $\rho$, continuité de $B$ sur le terme en $\rho^2$.` },
        { id: 'j-q', label: t`$q^2<1\iff\rho(\rho M^2-2\alpha)<0$ ; et $M\ge\alpha$ donne $q^2\ge(1-\rho\alpha)^2\ge 0$.` },
        { id: 'j-contr', label: t`On prend la racine carrée de la majoration.` },
        { id: 'j-bf', label: 'Théorème du point fixe de Banach sur l’espace complet $V$.', theorem: 'point-fixe-banach' },
        { id: 'j-eq', label: t`$u-\rho(Bu-g)=u\iff\rho(Bu-g)=0\iff Bu=g$, car $\rho\ne 0$.` },
        { id: 'j-syn', label: 'L’unique point fixe est l’unique solution.' },
        { id: 'j-evident', label: 'C’est évident.' },
      ],
      rules: [
        { from: ['d-T'], to: 'dif', by: 'j-calc' },
        { from: ['dif'], to: 'dev', by: 'j-dev' },
        { from: ['dev', 'h-B'], to: 'maj', by: 'j-maj' },
        { from: ['h-rho', 'h-B'], to: 'q', by: 'j-q' },
        { from: ['maj', 'q'], to: 'contr', by: 'j-contr' },
        { from: ['contr', 'h-V'], to: 'pf', by: 'j-bf' },
        { from: ['d-T', 'h-rho'], to: 'eq', by: 'j-eq' },
        { from: ['pf', 'eq'], to: 'fin', by: 'j-syn' },
      ],
      traps: [
        {
          conclusion: 'x-tout-rho',
          verdict: 'incorrect',
          concept: 'hypotheses-theoreme',
          message: t`Le rapport de contraction dépend de $\rho$ : la condition $0<\rho<2\alpha/M^2$ est indispensable en général.`,
          counterexample: t`$V=\mathbb R$, $B=\mathrm{Id}$ ($\alpha=M=1$), $\rho=3$ : $T(u)-T(v)=-2(u-v)$.`,
        },
        {
          conclusion: 'contr',
          by: 'j-evident',
          verdict: 'a-justifier',
          concept: 'justification-absente',
          message: t`La contraction se démontre : développe le carré de la norme, puis utilise coercivité et continuité.`,
        },
      ],
      removable: [
        {
          hypothesis: 'h-rho',
          label: t`Retirer la condition sur $\rho$`,
          necessary: true,
          explanation: t`Sans $0<\rho<2\alpha/M^2$, le coefficient $q^2$ peut être $\ge 1$.`,
          counterexample: t`$V=\mathbb R$, $B=\mathrm{Id}$, $\rho=2$ : $T(u)-T(v)=-(u-v)$, rapport $1$, pas de contraction stricte.`,
        },
      ],
    },
  },
  verification: FROM_POLY,
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT11: TheoremModule = {
  theorem: {
    id: 'lax-milgram',
    spaces: [
      t`$V$ : espace de Hilbert réel, de produit scalaire $\langle\cdot,\cdot\rangle_V$ et de norme $\|\cdot\|_V$.`,
      t`$V'$ : dual topologique de $V$, muni de $\|f\|_{V'}=\sup_{\|v\|_V\le 1}|\langle f,v\rangle|$.`,
      t`$a:V\times V\to\mathbb R$ : forme bilinéaire ; elle n'est pas supposée symétrique.`,
    ],
    hypotheses: [
      {
        id: 'h-hilbert',
        text: t`$V$ est un espace de Hilbert réel.`,
        whenRemoved: t`Sur l'espace des polynômes sur $[0,1]$, muni du produit scalaire de $L^2(0,1)$, avec $a=\langle\cdot,\cdot\rangle$ et $f(v)=\int_0^1e^xv\,dx$, une solution polynomiale $u$ serait égale à $e^x$ par densité des polynômes dans $L^2(0,1)$ : impossible.`,
      },
      { id: 'h-bilineaire', text: t`$a$ est bilinéaire.` },
      {
        id: 'h-continue',
        text: t`Continuité : $|a(u,v)|\le M\|u\|_V\|v\|_V$ pour tous $u,v\in V$.`,
        whenRemoved: t`Si $\varphi$ est une forme linéaire non continue sur $V$ de dimension infinie, $a(u,v)=\langle u,v\rangle_V+\varphi(u)\varphi(v)$ est coercive et l'équation $a(u,v)=\langle g,v\rangle_V$ pour tout $v$ n'a pas de solution dès que $\varphi(g)\neq 0$.`,
      },
      {
        id: 'h-coercive',
        text: t`Coercivité : $a(u,u)\ge\alpha\|u\|_V^2$ pour tout $u\in V$, avec $\alpha>0$.`,
        whenRemoved: t`Sur $V=\ell^2$, $a(u,v)=\sum_{n\ge 1}u_nv_n/n$ est continue, symétrique et $a(u,u)>0$ pour $u\ne 0$, mais $a(e_n,e_n)=1/n\to 0$ : pour $g=(1/n)_n$, l'équation impose $u_n=1$ pour tout $n$, et n'a pas de solution dans $\ell^2$.`,
      },
      { id: 'h-f', text: t`$f\in V'$.` },
    ],
    statement: t`Pour tout $f\in V'$, il existe un unique $u\in V$ tel que
$$a(u,v)=\langle f,v\rangle\quad\forall v\in V,\qquad\|u\|_V\le\alpha^{-1}\|f\|_{V'}.$$
La forme $a$ n'a pas besoin d'être symétrique.`,
    conclusions: {
      existence: t`$B$ est surjectif : pour tout $g\in V$, il existe $u\in V$ tel que $Bu=g$.`,
      unicite: t`La minoration $\|Bu\|_V\ge\alpha\|u\|_V$ donne $\ker B=\{0\}$.`,
      stabilite: t`$\|u\|_V\le\alpha^{-1}\|f\|_{V'}$.`,
    },
    sourceProof: 'complete',
    proofOutline: [
      t`Par Riesz, associer à $a$ un opérateur $B\in\mathcal L(V)$ et à $f$ un vecteur $g\in V$ : il suffit de résoudre $Bu=g$.`,
      t`Injectivité et estimation : la coercivité et Cauchy–Schwarz donnent $\|Bu\|_V\ge\alpha\|u\|_V$.`,
      t`Image fermée : la minoration rend $(u_n)$ de Cauchy dès que $(Bu_n)$ converge.`,
      t`Image dense : si $v\perp\operatorname{Im}B$, alors $\alpha\|v\|_V^2\le\langle Bv,v\rangle_V=0$.`,
      t`Surjectivité : une image fermée et dense est $V$ tout entier.`,
      t`Estimation : $\alpha\|u\|_V^2\le a(u,u)=\langle f,u\rangle\le\|f\|_{V'}\|u\|_V$.`,
    ],
    warnings: [
      t`« Image dense » et « image égale à $V$ » sont deux étapes séparées de la démonstration.`,
      t`$a(u,u)>0$ pour $u\neq 0$ n'est pas la coercivité : il faut une constante $\alpha>0$ uniforme.`,
      t`La continuité de $a$ est indispensable avant d'appliquer Riesz à $a(u,\cdot)$.`,
      'La forme n’a pas à être symétrique : lorsqu’elle l’est, Riesz suffit, mais c’est un cas particulier.',
    ],
    usefulFor: t`Problème de Poisson $-\Delta u=f$ avec condition de Dirichlet, formes elliptiques du second ordre, formulation faible et stabilité de l'opérateur inverse.`,
    verification: FROM_POLY,
  },
  definitions: [
    {
      id: 'lax-milgram-forme-continue',
      term: 'Forme bilinéaire continue',
      statement: t`Une forme bilinéaire $a$ sur un espace de Hilbert $V$ est continue s'il existe $M>0$ tel que $|a(u,v)|\le M\|u\|_V\|v\|_V$ pour tous $u,v\in V$.`,
      source: poly(13, 'Section 3.4'),
    },
    {
      id: 'lax-milgram-forme-coercive',
      term: 'Forme bilinéaire coercive',
      statement: t`Une forme bilinéaire $a$ sur un espace de Hilbert $V$ est coercive s'il existe $\alpha>0$ tel que $a(u,u)\ge\alpha\|u\|_V^2$ pour tout $u\in V$. Aucune symétrie n'est requise.`,
      source: poly(13, 'Section 3.4'),
    },
  ],
  concepts: [
    {
      id: 'lax-milgram-coercivite-positivite',
      label: 'Positivité et coercivité',
      reminder: t`$a(u,u)\ge 0$, ou même $a(u,u)>0$ pour $u\ne 0$, ne donne pas la coercivité : il faut une constante $\alpha>0$ uniforme telle que $a(u,u)\ge\alpha\|u\|_V^2$.`,
    },
    {
      id: 'lax-milgram-espace-test',
      label: 'Espace des fonctions test',
      reminder: t`La formulation faible se teste contre l'espace où vit la solution : pour Dirichlet, contre $V=H^1_0(\Omega)$, et non contre $H^1(\Omega)$.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-lax-milgram-coercivite',
      theoremId: 'lax-milgram',
      title: 'Positivité stricte sans coercivité',
      claim: t`Si $a$ est bilinéaire continue, symétrique, et $a(u,u)>0$ pour tout $u\neq 0$, alors pour tout $f\in V'$ le problème $a(u,v)=\langle f,v\rangle$ admet une solution.`,
      correctStatement: t`Il faut la coercivité : $a(u,u)\ge\alpha\|u\|_V^2$ avec $\alpha>0$ uniforme.`,
      task: t`Sur $V=\ell^2$, soit $a(u,v)=\sum_{n\ge 1}u_nv_n/n$. Détermine $\inf_{\|u\|=1}a(u,u)$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\inf_{\|u\|=1}a(u,u)$`, expected: '0' },
      explanation: t`Comme $a(e_n,e_n)=1/n\to 0$ et $a\ge 0$, l'infimum est nul : aucune constante $\alpha>0$ ne convient. Pour $g=(1/n)_n\in\ell^2$, l'équation $a(u,v)=\langle g,v\rangle$ impose $u_n=1$ pour tout $n$ : aucune solution dans $\ell^2$.`,
      concept: 'lax-milgram-coercivite-positivite',
      source: poly(13, 'Hypothèse de coercivité, section 3.4'),
    },
    {
      id: 'ce-lax-milgram-image-dense',
      theoremId: 'lax-milgram',
      title: 'Image dense sans surjectivité',
      claim: 'Un opérateur borné injectif dont l’image est dense est surjectif.',
      correctStatement: t`Il faut en plus que l'image soit fermée : c'est ce que donne la minoration issue de la coercivité.`,
      task: t`Sur $\ell^2$, soit $T(u)=(u_n/n)_{n\ge 1}$. Détermine $\inf_{\|u\|=1}\|Tu\|_{\ell^2}$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\inf_{\|u\|=1}\|Tu\|_{\ell^2}$`, expected: '0' },
      explanation: t`$\|Te_n\|=1/n\to 0$ : aucune minoration n'a lieu, ce qui explique que l'image de $T$ ne soit pas fermée. $T$ est injectif, d'image dense (elle contient les suites à support fini), mais $(1/n)_n$ n'a pas d'antécédent, car il faudrait $u_n=1$ pour tout $n$.`,
      concept: 'image-dense-surjective',
      source: poly(14, 'Lecture géométrique, section 3.4'),
    },
    {
      id: 'ce-lax-milgram-symetrie',
      theoremId: 'lax-milgram',
      title: 'Coercivité sans symétrie',
      claim: t`Le théorème de Lax–Milgram exige la symétrie de $a$ : une forme non symétrique n'est jamais coercive.`,
      correctStatement: t`La coercivité ne dépend que de $a(u,u)$ : seule la partie symétrique de $a$ intervient. Lax–Milgram vaut sans symétrie.`,
      task: t`Donne une matrice $A\in\mathcal M_2(\mathbb R)$ non symétrique telle que la forme $a(x,y)=x^{\mathsf T}Ay$ soit coercive sur $\mathbb R^2$.`,
      check: { kind: 'matrix-spd', prompt: t`Une matrice $2\times 2$ non symétrique et coercive`, size: 2, property: 'coercive-nonsymmetric' },
      explanation: t`$x^{\mathsf T}Ax=x^{\mathsf T}\tfrac{A+A^{\mathsf T}}2x$ : la coercivité équivaut à la définie-positivité de la partie symétrique. Par exemple, $A=\begin{pmatrix}1&1\\-1&1\end{pmatrix}$ donne $a(x,x)=\|x\|^2$.`,
      concept: 'coercivite-symetrie',
      source: poly(13, 'Section 3.4 : « La forme a n’a pas besoin d’être symétrique »'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT11;
