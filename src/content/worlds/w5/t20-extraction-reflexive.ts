/**
 * Résultat 20 — Extraction faible en espace réflexif.
 * Le polycopié énonce le résultat et renvoie à Eberlein–Šmulian (p. PDF 20) : idée de preuve.
 * Les exercices établissent la réflexivité des espaces de Bochner hilbertiens, une extraction
 * démontrée dans le cadre hilbertien, et l'échec du passage à la limite dans un carré.
 */
import { t, rubric, poly, complement, FROM_POLY, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'extraction-reflexive.facile',
  theoremId: 'extraction-reflexive',
  level: 'facile',
  title: t`Pourquoi $L^2(0,T;H^1_0)$ est réflexif`,
  statement: t`Soient $\Omega$ un ouvert de $\mathbb R^d$, $T>0$, $V=H^1_0(\Omega)$ muni du produit scalaire de $H^1(\Omega)$, et $E=L^2(0,T;V)$ muni de $(u,v)_E=\int_0^T(u(t),v(t))_V\,dt$. Dire pourquoi $E$ est réflexif : démontrer que l'injection canonique $J:E\to E''$, $J(u)(f)=f(u)$, est surjective. Expliquer pourquoi l'argument ne s'étend pas à $L^1(0,T;V)$.`,
  source: poly(41, 'Exercice 20, facile'),
  prerequisites: ['riesz'],
  concepts: ['extraction-reflexive-non-reflexif', 'hypotheses-theoreme', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-V', kind: 'hypothese', text: t`$V=H^1_0(\Omega)$, sous-espace fermé de $H^1(\Omega)$ muni de son produit scalaire, est un espace de Hilbert réel ; $T>0$.` },
      { id: 'd-E', kind: 'definition', text: t`$E=L^2(0,T;V)$, muni de $(u,v)_E=\int_0^T(u(t),v(t))_V\,dt$.` },
      { id: 'e-ps', kind: 'consequence', text: t`$(\cdot,\cdot)_E$ est un produit scalaire sur $E$, de norme associée $\|u\|_E=\|u\|_{L^2(0,T;V)}$.` },
      { id: 'e-complet', kind: 'consequence', text: t`$E$ est complet.` },
      { id: 'e-hilbert', kind: 'consequence', text: t`$E$ est un espace de Hilbert réel.` },
      { id: 'r-riesz', kind: 'application-theoreme', text: t`$R:E\to E'$, $R(w)=(\cdot,w)_E$, est une bijection linéaire isométrique.` },
      { id: 'd-eta', kind: 'definition', local: true, text: t`Soit $\eta\in E''$.` },
      { id: 'r-compo', kind: 'consequence', text: t`$w\mapsto\eta(R(w))$ est une forme linéaire continue sur $E$.` },
      { id: 'r-u', kind: 'application-theoreme', text: t`Il existe $u\in E$ tel que $\eta(R(w))=(w,u)_E$ pour tout $w\in E$.` },
      { id: 'r-eval', kind: 'egalite', text: t`Pour tout $f\in E'$ : $\eta(f)=f(u)$, c'est-à-dire $\eta=J(u)$.` },
      { id: 'fin', kind: 'conclusion', text: t`$J:E\to E''$ est surjective : $E=L^2(0,T;H^1_0(\Omega))$ est réflexif.` },
      // Propositions plausibles mais fausses.
      { id: 'x-L1', kind: 'consequence', distractor: true, text: t`Par le même argument, $L^1(0,T;V)$ est réflexif.` },
      { id: 'x-separable', kind: 'consequence', distractor: true, text: t`Tout espace de Banach séparable est réflexif.` },
    ],
    justifications: [
      { id: 'j-ps', label: t`Bilinéarité et symétrie héritées de $(\cdot,\cdot)_V$ ; $(u,u)_E=0$ impose $u(t)=0$ pour presque tout $t$.` },
      { id: 'j-fischer', label: t`Théorème de Riesz–Fischer pour les fonctions de carré intégrable à valeurs dans l'espace complet $V$.` },
      { id: 'j-hilbert', label: 'Définition d’un espace de Hilbert : espace préhilbertien complet.' },
      { id: 'j-riesz', label: t`Théorème de représentation de Riesz dans $E$.`, theorem: 'riesz' },
      { id: 'j-compo', label: t`Composée de l'isométrie linéaire $R$ et de la forme linéaire continue $\eta$.` },
      { id: 'j-eval', label: t`Pour $f\in E'$, écrire $f=R(w)$ : $\eta(f)=(w,u)_E=(u,w)_E=f(u)$.` },
      { id: 'j-def-reflexif', label: t`Définition de la réflexivité : $J$ est surjective.` },
      { id: 'j-evident', label: 'C’est évident.' },
      { id: 'j-banach', label: 'Tout espace de Banach est réflexif.' },
    ],
    rules: [
      { from: ['h-V', 'd-E'], to: 'e-ps', by: 'j-ps' },
      { from: ['h-V', 'd-E'], to: 'e-complet', by: 'j-fischer' },
      { from: ['e-ps', 'e-complet'], to: 'e-hilbert', by: 'j-hilbert' },
      { from: ['e-hilbert'], to: 'r-riesz', by: 'j-riesz' },
      { from: ['d-eta', 'r-riesz'], to: 'r-compo', by: 'j-compo' },
      { from: ['r-compo', 'e-hilbert'], to: 'r-u', by: 'j-riesz' },
      { from: ['r-u', 'r-riesz'], to: 'r-eval', by: 'j-eval' },
      { from: ['r-eval', 'd-eta'], to: 'fin', by: 'j-def-reflexif' },
    ],
    traps: [
      {
        conclusion: 'e-complet',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`La complétude de $E$ se démontre : elle vient de celle de $V$, par le théorème de Riesz–Fischer vectoriel.`,
      },
      {
        conclusion: 'fin',
        by: 'j-banach',
        verdict: 'incorrect',
        concept: 'extraction-reflexive-non-reflexif',
        message: 'Beaucoup d’espaces de Banach usuels ne sont pas réflexifs ; ici la réflexivité vient de la structure hilbertienne.',
        counterexample: t`Dans $L^1(]0,1[)$, $u_n=n\,\mathbb 1_{]0,1/n[}$ est bornée sans sous-suite faiblement convergente.`,
      },
      {
        conclusion: 'x-L1',
        verdict: 'incorrect',
        concept: 'extraction-reflexive-non-reflexif',
        message: t`$L^1(0,T;V)$ n'est pas hilbertien, et il n'est pas réflexif : il contient une copie isométrique fermée de $L^1(0,T)$, et un sous-espace fermé d'un réflexif est réflexif.`,
        counterexample: t`Avec $\|v_0\|_V=1$ et $T\ge 1$, $u_n(t)=n\,\mathbb 1_{]0,1/n[}(t)\,v_0$ est bornée dans $L^1(0,T;V)$ ; une limite faible $u$ vérifierait $\int_\delta^Tu=0$ pour tout $\delta>0$, donc $u=0$, alors que $\int_0^Tu_n=v_0$.`,
      },
      {
        conclusion: 'x-separable',
        verdict: 'incorrect',
        concept: 'extraction-reflexive-non-reflexif',
        message: 'Séparabilité et réflexivité sont indépendantes.',
        counterexample: t`$L^1(]0,1[)$ est séparable et non réflexif ; $u_n=n\,\mathbb 1_{]0,1/n[}$ y est bornée sans sous-suite faiblement convergente.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-V',
        label: t`Remplacer $V$ par un espace non hilbertien`,
        necessary: true,
        explanation: t`Tout l'argument repose sur la structure hilbertienne de $E$, héritée de celle de $V$.`,
        counterexample: t`Pour $V=L^1(\Omega)$, $L^2(0,T;L^1(\Omega))$ contient les fonctions constantes en temps, copie fermée de $L^1(\Omega)$, qui n'est pas réflexif : $L^2(0,T;L^1(\Omega))$ ne l'est pas.`,
      },
    ],
  },
  closedChecks: [
    {
      kind: 'choice',
      prompt: t`Pour $T>0$ et $\Omega$ ouvert borné, lesquels de ces espaces sont réflexifs ?`,
      options: [t`$L^2(0,T;H^1_0(\Omega))$`, t`$L^1(0,T;H^1_0(\Omega))$`, t`$L^2(0,T;L^2(\Omega))$`, t`$L^\infty(0,T;L^2(\Omega))$`],
      correct: [0, 2],
      explanation: t`Les deux espaces $L^2$ à valeurs hilbertiennes sont des espaces de Hilbert. $L^1(0,T;H)$ et $L^\infty(0,T;H)$ contiennent des copies fermées de $L^1(0,T)$ et de $L^\infty(0,T)$, non réflexifs.`,
    },
  ],
  solution: t`**Structure hilbertienne.** $V=H^1_0(\Omega)$ est un sous-espace fermé de $H^1(\Omega)$, donc un espace de Hilbert. Sur $E=L^2(0,T;V)$, $(u,v)_E=\int_0^T(u(t),v(t))_V\,dt$ est un produit scalaire, et $E$ est complet par le théorème de Riesz–Fischer pour les fonctions de carré intégrable à valeurs dans l'espace complet $V$ : $E$ est un espace de Hilbert.

**Réflexivité d'un Hilbert.** Par Riesz, $R(w)=(\cdot,w)_E$ est une bijection linéaire isométrique de $E$ sur $E'$. Soit $\eta\in E''$ : $w\mapsto\eta(R(w))$ est une forme linéaire continue sur $E$, donc, par Riesz encore, il existe $u\in E$ tel que $\eta(R(w))=(w,u)_E$ pour tout $w$. Pour $f\in E'$, écrivons $f=R(w)$ : $\eta(f)=(w,u)_E=(u,w)_E=f(u)$. Ainsi $\eta=J(u)$ et $J$ est surjective.

**Pourquoi pas $L^1(0,T;V)$.** Cet espace contient la copie fermée $\{t\mapsto\varphi(t)v_0\}$ de $L^1(0,T)$, $\|v_0\|_V=1$. Or $L^1(0,T)$ n'est pas réflexif : $n\,\mathbb 1_{]0,1/n[}$ y est bornée sans sous-suite faiblement convergente. Un sous-espace fermé d'un espace réflexif étant réflexif, $L^1(0,T;V)$ ne l'est pas.`,
  steps: [
    t`Reconnaître $V$ comme espace de Hilbert.`,
    t`Montrer que $E$ est un espace de Hilbert : produit scalaire et complétude.`,
    t`Appliquer Riesz à $E$, puis à la forme $w\mapsto\eta(R(w))$.`,
    t`Identifier $\eta$ à l'évaluation en $u$.`,
  ],
  commonErrors: [
    { id: 'e-banach', description: 'Croire que tout espace de Banach, ou tout espace séparable, est réflexif.', concept: 'extraction-reflexive-non-reflexif' },
    { id: 'e-complet', description: t`Oublier de justifier la complétude de $L^2(0,T;V)$.`, concept: 'justification-absente' },
  ],
  hints: [
    t`Quelle structure, plus riche que celle d'un espace de Banach, porte $L^2(0,T;H^1_0(\Omega))$ ?`,
    t`Un espace de Hilbert est réflexif : applique le théorème de Riesz deux fois, à $E$ puis à $w\mapsto\eta(R(w))$.`,
    t`Pour $f=R(w)\in E'$, compare $\eta(f)$ et $f(u)$ en utilisant la symétrie du produit scalaire réel.`,
  ],
  rubric: rubric({
    hypotheses: t`La structure hilbertienne de $V$ et la complétude de $E$ sont établies.`,
    methode: 'Le théorème de Riesz est appliqué deux fois, aux bons objets.',
    validite: 'L’identification de l’élément du bidual à une évaluation est correcte.',
    justifications: 'Aucune réflexivité n’est attribuée à un espace non hilbertien sans preuve.',
    conclusion: t`La surjectivité de $J$ est obtenue, et le cas de $L^1(0,T;V)$ est expliqué.`,
  }),
  variant: {
    statement: t`Soit $E$ un espace de Banach réflexif et $F$ un sous-espace fermé de $E$. Montrer que $F$ est réflexif, et en déduire que $L^1(0,T;V)$ n'est pas réflexif.`,
    solution: t`Soit $\eta\in F''$. La forme $\tilde\eta(f)=\eta(f|_F)$ appartient à $E''$, donc $\tilde\eta=J_E(u)$ pour un $u\in E$ : $f(u)=\eta(f|_F)$ pour tout $f\in E'$. Si $u\notin F$, Hahn–Banach donne $f\in E'$ nulle sur $F$ avec $f(u)\neq 0$, alors que $\eta(f|_F)=\eta(0)=0$ : contradiction, donc $u\in F$. Pour $g\in F'$, un prolongement $f\in E'$ de $g$ (Hahn–Banach) donne $\eta(g)=f(u)=g(u)$ : $\eta=J_F(u)$. Comme $L^1(0,T;V)$ contient la copie fermée $\{\varphi v_0\}$ de $L^1(0,T)$, non réflexif, il n'est pas réflexif.`,
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'extraction-reflexive.intermediaire',
  theoremId: 'extraction-reflexive',
  level: 'intermediaire',
  title: t`Extraire une sous-suite faible dans $L^2(0,T;V)$`,
  statement: t`Soient $V$ un espace de Hilbert réel, $T>0$, $E=L^2(0,T;V)$ muni de $(u,v)_E=\int_0^T(u(t),v(t))_V\,dt$, et $(u_n)$ une suite de $E$ avec $\|u_n\|_E\le C$ pour tout $n$. Extraire une sous-suite convergeant faiblement dans $E$ vers un $u\in E$, expliciter cette convergence, et montrer que $\|u\|_E\le\liminf_k\|u_{n_k}\|_E\le C$.`,
  source: poly(41, 'Exercice 20, intermédiaire ; usage à la section 8.4 (p. PDF 32)'),
  prerequisites: ['riesz'],
  concepts: ['faible-fort', 'bornee-non-convergente', 'existence-unicite', 'hypotheses-theoreme'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'theoreme', label: 'Réflexivité et théorème d’extraction' },
      { id: 'hilbert', label: 'Extraction diagonale dans un Hilbert' },
    ],
    nodes: [
      { id: 'h-E', kind: 'hypothese', text: t`$E=L^2(0,T;V)$, muni de $(u,v)_E=\int_0^T(u(t),v(t))_V\,dt$, est un espace de Hilbert réel.` },
      { id: 'h-borne', kind: 'hypothese', text: t`$\|u_n\|_E\le C$ pour tout $n$.` },

      { id: 'a-refl', kind: 'consequence', text: t`$E$ est réflexif.` },
      { id: 'a-ext', kind: 'application-theoreme', text: t`Il existe une sous-suite $(u_{n_k})$ et $u\in E$ tels que $f(u_{n_k})\to f(u)$ pour tout $f\in E'$.` },

      { id: 'b-diag', kind: 'consequence', text: t`Il existe une sous-suite $(u_{n_k})$ telle que $\big((u_{n_k},u_m)_E\big)_k$ converge pour tout $m$.` },
      { id: 'b-tout', kind: 'consequence', text: t`Pour tout $w\in E$, $\big((u_{n_k},w)_E\big)_k$ converge.` },
      { id: 'b-forme', kind: 'consequence', text: t`$\Lambda(w)=\lim_k(u_{n_k},w)_E$ est une forme linéaire sur $E$ avec $|\Lambda(w)|\le C\|w\|_E$ ; il existe $u\in E$ tel que $\Lambda(w)=(u,w)_E$.` },

      { id: 'c-test', kind: 'consequence', text: t`$u_{n_k}\rightharpoonup u$ dans $E$ : $\int_0^T(u_{n_k}(t),w(t))_V\,dt\to\int_0^T(u(t),w(t))_V\,dt$ pour tout $w\in L^2(0,T;V)$.` },
      { id: 'lsc', kind: 'inegalite', text: t`$\|u\|_E\le\liminf_k\|u_{n_k}\|_E\le C$.` },
      { id: 'fin', kind: 'conclusion', text: t`Une sous-suite $(u_{n_k})$ converge faiblement dans $L^2(0,T;V)$ vers un $u$ tel que $\|u\|_{L^2(0,T;V)}\le C$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-forte', kind: 'consequence', distractor: true, after: ['c-test'], text: t`La sous-suite converge fortement : $\|u_{n_k}-u\|_E\to 0$.` },
      { id: 'x-toute', kind: 'consequence', distractor: true, after: ['c-test'], text: t`La suite entière $(u_n)$ converge faiblement vers $u$.` },
      { id: 'x-ponctuel', kind: 'consequence', distractor: true, after: ['c-test'], text: t`Pour presque tout $t$, $u_{n_k}(t)\rightharpoonup u(t)$ faiblement dans $V$.` },
    ],
    justifications: [
      { id: 'j-hilbert-refl', label: 'Un espace de Hilbert est réflexif (Riesz appliqué deux fois).' },
      { id: 'j-extraction', label: 'Extraction faible en espace réflexif.', theorem: 'extraction-reflexive' },
      { id: 'j-forme-ps', label: t`Pour $w\in E$, $f=(\cdot,w)_E$ appartient à $E'$ par Cauchy–Schwarz.` },
      { id: 'j-diag', label: t`$|(u_n,u_m)_E|\le C\|u_m\|_E$ : Bolzano–Weierstrass pour chaque $m$, puis extraction diagonale.` },
      { id: 'j-ortho', label: t`Combinaisons linéaires, densité dans $Y=\overline{\mathrm{Vect}}\{u_m\}$ avec la borne $C$, puis $(u_{n_k},w)_E=(u_{n_k},P_Yw)_E$ car $u_{n_k}\in Y$.` },
      { id: 'j-riesz-lim', label: t`Linéarité et majoration passent à la limite ; représentation de Riesz de $\Lambda$.`, theorem: 'riesz' },
      { id: 'j-lim', label: t`Définition de $\Lambda$ et écriture explicite du produit scalaire de $E$.` },
      { id: 'j-cs', label: t`$\|u\|_E^2=\lim_k(u_{n_k},u)_E\le\liminf_k\|u_{n_k}\|_E\,\|u\|_E$ (Cauchy–Schwarz), puis division si $u\neq 0$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-synthese', label: 'Réunion de la convergence et de la borne.' },
      { id: 'j-compacite', label: t`La boule de $E$ est compacte, donc une sous-suite converge en norme.` },
    ],
    rules: [
      { from: ['h-E'], to: 'a-refl', by: 'j-hilbert-refl', path: 'theoreme' },
      { from: ['a-refl', 'h-borne'], to: 'a-ext', by: 'j-extraction', path: 'theoreme' },
      { from: ['a-ext', 'h-E'], to: 'c-test', by: 'j-forme-ps', path: 'theoreme' },

      { from: ['h-borne', 'h-E'], to: 'b-diag', by: 'j-diag', path: 'hilbert' },
      { from: ['b-diag', 'h-borne', 'h-E'], to: 'b-tout', by: 'j-ortho', path: 'hilbert' },
      { from: ['b-tout', 'h-borne', 'h-E'], to: 'b-forme', by: 'j-riesz-lim', path: 'hilbert' },
      { from: ['b-forme'], to: 'c-test', by: 'j-lim', path: 'hilbert' },

      { from: ['c-test', 'h-borne'], to: 'lsc', by: 'j-cs' },
      { from: ['c-test', 'lsc'], to: 'fin', by: 'j-synthese' },
    ],
    traps: [
      {
        conclusion: 'a-ext',
        by: 'j-compacite',
        verdict: 'incorrect',
        concept: 'bornee-non-convergente',
        message: 'En dimension infinie, la boule n’est pas compacte en norme : l’extraction ne donne qu’une convergence faible.',
        counterexample: t`Avec $\|v_0\|_V=1$, $e_n(t)=\sqrt{2/T}\,\sin(n\pi t/T)\,v_0$ est orthonormée dans $E$ et $\|e_n-e_m\|_E^2=2$ pour $n\neq m$.`,
      },
      {
        conclusion: 'x-forte',
        verdict: 'incorrect',
        concept: 'faible-fort',
        message: 'La convergence faible n’entraîne pas la convergence en norme.',
        counterexample: t`La suite orthonormée $(e_n)$ ci-dessus vérifie $e_n\rightharpoonup 0$ (inégalité de Bessel) et $\|e_n\|_E=1$.`,
      },
      {
        conclusion: 'x-toute',
        verdict: 'incorrect',
        concept: 'existence-unicite',
        message: 'L’extraction est indispensable : deux sous-suites peuvent avoir des limites faibles différentes.',
        counterexample: t`$u_n=(-1)^nw$ avec $w\neq 0$ : $(u_{2k},w)_E=\|w\|_E^2$ et $(u_{2k+1},w)_E=-\|w\|_E^2$.`,
      },
      {
        conclusion: 'x-ponctuel',
        verdict: 'incorrect',
        concept: 'faible-fort',
        message: 'La convergence faible dans un espace de Bochner ne donne aucune convergence à temps fixé.',
        counterexample: t`$T=1$, $u_n(t)=\sin(2\pi nt)\,v_0$ : $u_n\rightharpoonup 0$ dans $E$. Si $\sin(2\pi n_kt)\to 0$ pour presque tout $t$, la convergence dominée donnerait $\int_0^1\sin^2(2\pi n_kt)\,dt\to 0$, alors que cette intégrale vaut $\tfrac12$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-borne',
        label: 'Retirer la borne uniforme',
        necessary: true,
        explanation: 'Une suite faiblement convergente est bornée : sans borne, aucune extraction faible n’est possible en général.',
        counterexample: t`$u_n=nw$ avec $w\neq 0$ : $(u_n,w)_E=n\|w\|_E^2\to+\infty$ le long de toute sous-suite.`,
      },
      {
        hypothesis: 'h-E',
        label: 'Retirer la structure hilbertienne',
        necessary: true,
        explanation: 'Les deux voies utilisent la réflexivité, ou la représentation de Riesz.',
        counterexample: t`Dans $L^1(]0,1[)$, non réflexif, $u_n=n\,\mathbb 1_{]0,1/n[}$ est bornée sans sous-suite faiblement convergente.`,
      },
    ],
  },
  closedChecks: [
    { kind: 'rational', prompt: t`Pour la suite orthonormée $(e_n)$ de $E$ et $n\neq m$, valeur de $\|e_n-e_m\|_E^2$`, expected: '2' },
  ],
  solution: t`**Voie du théorème.** $E$ est un espace de Hilbert, donc réflexif. La suite étant bornée, le théorème d'extraction en espace réflexif fournit $(u_{n_k})$ et $u\in E$ avec $f(u_{n_k})\to f(u)$ pour tout $f\in E'$. Avec $f=(\cdot,w)_E$, cela s'écrit $\int_0^T(u_{n_k}(t),w(t))_V\,dt\to\int_0^T(u(t),w(t))_V\,dt$ pour tout $w\in L^2(0,T;V)$.

**Voie hilbertienne directe.** Comme $|(u_n,u_m)_E|\le C\|u_m\|_E$, le procédé diagonal donne une sous-suite telle que $(u_{n_k},u_m)_E$ converge pour tout $m$, puis pour tout $y\in Y=\overline{\mathrm{Vect}}\{u_m\}$ par linéarité et densité, la borne $C$ contrôlant l'approximation. Pour $w\in E$, $(u_{n_k},w)_E=(u_{n_k},P_Yw)_E$ converge. La limite $\Lambda(w)$ est linéaire, avec $|\Lambda(w)|\le C\|w\|_E$ ; Riesz la représente par $u\in E$.

**Semi-continuité.** $\|u\|_E^2=\lim_k(u_{n_k},u)_E\le\liminf_k\|u_{n_k}\|_E\,\|u\|_E$, d'où $\|u\|_E\le\liminf_k\|u_{n_k}\|_E\le C$.

**Ce qu'on n'obtient pas.** Ni convergence forte (suite orthonormée), ni convergence de toute la suite ($(-1)^nw$), ni convergence à $t$ fixé ($\sin(2\pi nt)v_0$).`,
  steps: [
    t`Établir la réflexivité de $E$, ou travailler directement avec son produit scalaire.`,
    'Extraire une sous-suite faiblement convergente.',
    t`Traduire la convergence faible par des tests $w\in L^2(0,T;V)$.`,
    'Établir la semi-continuité inférieure de la norme.',
  ],
  commonErrors: [
    { id: 'e-forte', description: 'Conclure à une convergence forte à partir d’une borne uniforme.', concept: 'bornee-non-convergente' },
    { id: 'e-toute', description: 'Affirmer la convergence de toute la suite, sans unicité de la limite.', concept: 'existence-unicite' },
    { id: 'e-norme', description: t`Écrire $\|u\|=\lim\|u_{n_k}\|$ au lieu d'une inégalité.`, concept: 'faible-fort' },
  ],
  hints: [
    t`Quelle propriété de $L^2(0,T;V)$ autorise une extraction faible d'une suite bornée ?`,
    t`Soit tu invoques le théorème d'extraction, soit tu extrais à la main : procédé diagonal sur $(u_{n},u_m)_E$, puis densité et projection orthogonale.`,
    t`Pour la borne de $u$, teste la convergence faible contre $w=u$ et applique Cauchy–Schwarz.`,
  ],
  rubric: rubric({
    hypotheses: t`La borne uniforme et la structure hilbertienne de $E$ sont explicitement utilisées.`,
    methode: 'Une extraction complète est menée, par le théorème ou par le procédé diagonal.',
    validite: t`La convergence faible est traduite par des tests dans $L^2(0,T;V)$.`,
    justifications: 'La semi-continuité inférieure est démontrée, non affirmée.',
    conclusion: 'La sous-suite et la borne de la limite sont obtenues, sans convergence forte ni ponctuelle abusive.',
  }),
  variant: {
    statement: t`Avec les mêmes notations, on suppose que $V\hookrightarrow H\simeq H'\hookrightarrow V'$ est un triplet de Hilbert dense et continu, et de plus que $\|u_n'\|_{L^2(0,T;V')}\le C'$. Montrer qu'après une nouvelle extraction $u_{n_k}'\rightharpoonup g$ dans $L^2(0,T;V')$, puis que $g=u'$.`,
    solution: t`$L^2(0,T;V')$ est un espace de Hilbert, donc une nouvelle extraction donne $u_{n_k}'\rightharpoonup g$. Pour $v\in V$ et $\eta\in C^\infty_c(]0,T[)$, $\int_0^T\langle u_{n_k}',v\rangle\eta=-\int_0^T(u_{n_k},v)_H\eta'$. À gauche, $t\mapsto\eta(t)v$ appartient à $L^2(0,T;V)$, dual de $L^2(0,T;V')$ ; à droite, $w\mapsto\int_0^T(w,v)_H\eta'$ est linéaire continue sur $L^2(0,T;V)$. Les deux membres passent à la limite : $\int_0^T\langle g,v\rangle\eta=-\int_0^T(u,v)_H\eta'$, c'est-à-dire $g=u'$ au sens des distributions à valeurs dans $V'$ (polycopié, section 8.4).`,
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'extraction-reflexive.difficile',
  theoremId: 'extraction-reflexive',
  level: 'difficile',
  title: t`La limite faible ne passe pas au carré`,
  statement: t`Dans $H=L^2(]0,2\pi[)$, on pose $u_n(x)=\sin(nx)$, $n\ge 1$. Montrer que $u_n\rightharpoonup 0$ faiblement dans $H$, mais que $u_n^2$ ne converge pas faiblement vers $0^2=0$ : la convergence faible de $u_n$ ne donne pas celle de $u_n^2$ vers $u^2$. Identifier la limite faible de $u_n^2$.`,
  source: poly(41, 'Exercice 20, difficile ; exemple de la section 5.1 (p. PDF 20)'),
  prerequisites: [],
  concepts: ['nonlinearite-limite-faible', 'faible-fort', 'calcul-exact'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'bessel', label: 'Famille orthonormée et inégalité de Bessel' },
      { id: 'riemann-lebesgue', label: 'Lemme de Riemann–Lebesgue' },
    ],
    nodes: [
      { id: 'h-H', kind: 'hypothese', text: t`$H=L^2(]0,2\pi[)$ est un espace de Hilbert réel, de produit scalaire $(f,g)=\int_0^{2\pi}fg$, et $H\subset L^1(]0,2\pi[)$.` },
      { id: 'h-un', kind: 'hypothese', text: t`L'intervalle étant borné, la fonction constante $\mathbb 1$ appartient à $H$.` },
      { id: 'd-u', kind: 'definition', text: t`$u_n(x)=\sin(nx)$ pour $n\ge 1$.` },
      {
        id: 'o-ortho',
        kind: 'egalite',
        text: t`$\int_0^{2\pi}\sin(nx)\sin(mx)\,dx=\pi\,\delta_{nm}$ pour $n,m\ge 1$ : $(u_n/\sqrt\pi)_n$ est orthonormée.`,
        masked: t`Valeur de $\int_0^{2\pi}\sin(nx)\sin(mx)\,dx$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\dfrac1\pi\int_0^{2\pi}\sin^2(nx)\,dx$ pour $n\ge 1$`, expected: '1' },
      },
      { id: 'o-bessel', kind: 'inegalite', text: t`Pour tout $g\in H$ : $\sum_{n\ge 1}\tfrac1\pi(g,u_n)^2\le\|g\|_H^2$, donc $(g,u_n)\to 0$.` },
      { id: 'cv', kind: 'consequence', text: t`$u_n\rightharpoonup 0$ faiblement dans $H$.` },
      {
        id: 'c-faible',
        kind: 'egalite',
        text: t`$u_n^2=\tfrac12-\tfrac12\cos(2nx)\rightharpoonup\tfrac12$ faiblement dans $H$.`,
        masked: t`Limite faible de $u_n^2$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Constante $c$ telle que $\sin^2(nx)\rightharpoonup c$ dans $L^2(]0,2\pi[)$`, expected: '1/2' },
      },
      { id: 'c-test', kind: 'egalite', text: t`$(u_n^2,\mathbb 1)=\int_0^{2\pi}\sin^2(nx)\,dx=\pi$ pour tout $n\ge 1$.` },
      { id: 'c-non', kind: 'consequence', text: t`$u_n^2$ ne converge pas faiblement vers $0=0^2$.` },
      { id: 'fin', kind: 'conclusion', text: t`$u_n\rightharpoonup 0$ alors que $u_n^2\rightharpoonup\tfrac12\neq 0^2$ : la convergence faible ne passe pas à la limite dans $s\mapsto s^2$.` },
      // Propositions plausibles mais fausses.
      { id: 'x-carre', kind: 'consequence', distractor: true, after: ['cv'], text: t`$u_n^2\rightharpoonup 0$ faiblement.` },
      { id: 'x-forte', kind: 'consequence', distractor: true, after: ['cv'], text: t`Une sous-suite de $(u_n)$ converge fortement vers $0$ dans $H$.` },
    ],
    justifications: [
      { id: 'j-integrale', label: t`$\sin a\sin b=\tfrac12\big(\cos(a-b)-\cos(a+b)\big)$, et $\int_0^{2\pi}\cos(kx)\,dx=0$ pour $k\neq 0$.` },
      { id: 'j-bessel', label: 'Inégalité de Bessel pour une famille orthonormée ; le terme général d’une série convergente tend vers 0.' },
      { id: 'j-def-faible', label: t`Définition de la convergence faible dans $H$ (Riesz : $H'$ s'identifie à $H$).` },
      { id: 'j-rl', label: t`Riemann–Lebesgue pour $g\in H\subset L^1$ : $\int_0^{2\pi}g(x)\sin(nx)\,dx\to 0$.`, theorem: 'riemann-lebesgue' },
      { id: 'j-rl-cos', label: t`Linéarisation $\sin^2=\tfrac12(1-\cos(2\cdot))$, puis Riemann–Lebesgue pour $\cos(2nx)$.`, theorem: 'riemann-lebesgue' },
      { id: 'j-test1', label: t`Test contre $g=\mathbb 1\in H$ et calcul de $\int_0^{2\pi}\sin^2(nx)\,dx$.` },
      { id: 'j-contra', label: t`Une limite faible nulle imposerait $(u_n^2,\mathbb 1)\to 0$.` },
      { id: 'j-synthese', label: 'Réunion des résultats.' },
      { id: 'j-cont-faible', label: t`L'application $s\mapsto s^2$ est continue, donc elle conserve les limites faibles.` },
    ],
    rules: [
      { from: ['d-u', 'h-H'], to: 'o-ortho', by: 'j-integrale' },
      { from: ['o-ortho', 'h-H'], to: 'o-bessel', by: 'j-bessel', path: 'bessel' },
      { from: ['o-bessel'], to: 'cv', by: 'j-def-faible', path: 'bessel' },
      { from: ['d-u', 'h-H'], to: 'cv', by: 'j-rl', path: 'riemann-lebesgue' },
      { from: ['d-u', 'h-H'], to: 'c-faible', by: 'j-rl-cos' },
      { from: ['o-ortho', 'h-un'], to: 'c-test', by: 'j-test1' },
      { from: ['c-test'], to: 'c-non', by: 'j-contra' },
      { from: ['cv', 'c-faible', 'c-non'], to: 'fin', by: 'j-synthese' },
    ],
    traps: [
      {
        conclusion: 'x-carre',
        verdict: 'incorrect',
        concept: 'nonlinearite-limite-faible',
        message: 'Une limite faible ne se compose pas avec une non-linéarité.',
        counterexample: t`Contre $\mathbb 1\in H$ : $(u_n^2,\mathbb 1)=\pi$ pour tout $n$, et non $0$.`,
      },
      {
        conclusion: 'c-faible',
        by: 'j-cont-faible',
        verdict: 'incorrect',
        concept: 'nonlinearite-limite-faible',
        message: t`Ce raisonnement donnerait $u_n^2\rightharpoonup 0$, ce qui est faux : la continuité de $s\mapsto s^2$ pour la norme ne dit rien de la topologie faible.`,
      },
      {
        conclusion: 'x-forte',
        verdict: 'incorrect',
        concept: 'faible-fort',
        message: 'Une limite forte coïnciderait avec la limite faible, ici nulle.',
        counterexample: t`$\|u_n\|_H^2=\pi$ pour tout $n$ : aucune sous-suite ne tend vers $0$ en norme.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-un',
        label: t`Ne plus pouvoir tester contre $\mathbb 1$`,
        necessary: true,
        explanation: t`Sur un domaine de mesure infinie, $\mathbb 1\notin L^2$ : le test qui révèle le défaut n'est plus disponible, et le phénomène dépend alors de la suite choisie.`,
        counterexample: t`Dans $L^2(\mathbb R)$, $w_n=\mathbb 1_{[n,n+1]}$ vérifie $w_n\rightharpoonup 0$ et $w_n^2=w_n\rightharpoonup 0$ : ici le carré passe à la limite.`,
      },
    ],
  },
  solution: t`**Orthogonalité.** Pour $n,m\ge 1$, $\int_0^{2\pi}\sin(nx)\sin(mx)\,dx=\pi\,\delta_{nm}$ : la famille $(u_n/\sqrt\pi)$ est orthonormée dans $H$.

**Convergence faible.** Par Bessel, $\sum_n\tfrac1\pi(g,u_n)^2\le\|g\|_H^2$ pour tout $g\in H$, donc $(g,u_n)\to 0$ : $u_n\rightharpoonup 0$. Le lemme de Riemann–Lebesgue donne la même conclusion, puisque $H\subset L^1(]0,2\pi[)$.

**Le carré.** $u_n^2=\tfrac12-\tfrac12\cos(2nx)$ et, par Riemann–Lebesgue, $(\cos(2n\cdot),g)\to 0$ : $u_n^2\rightharpoonup\tfrac12$. En particulier, contre $\mathbb 1\in H$ : $(u_n^2,\mathbb 1)=\pi\not\to 0$. Donc $u_n^2$ ne converge pas faiblement vers $0=0^2$.

**Lecture.** La convergence faible capte les moyennes, pas les oscillations : la non-linéarité $s\mapsto s^2$ transforme l'oscillation en une moyenne non nulle. Aucune sous-suite de $(u_n)$ ne converge fortement, puisque $\|u_n\|_H^2=\pi$.`,
  steps: [
    'Établir l’orthogonalité des sinus.',
    'En déduire la convergence faible vers 0, par Bessel ou Riemann–Lebesgue.',
    t`Linéariser $\sin^2$ et identifier la limite faible $\tfrac12$.`,
    t`Tester contre $\mathbb 1$ pour réfuter la convergence vers $0$.`,
  ],
  commonErrors: [
    { id: 'e-carre', description: t`Écrire $\lim u_n^2=(\lim u_n)^2$ pour une limite faible.`, concept: 'nonlinearite-limite-faible' },
    { id: 'e-forte', description: 'Confondre la convergence faible vers 0 et la convergence en norme vers 0.', concept: 'faible-fort' },
  ],
  hints: [
    t`Que signifie $u_n\rightharpoonup 0$ dans $H$, et quelle propriété de la famille des sinus le fournit ?`,
    t`Pour le carré, linéarise : $\sin^2(nx)=\tfrac12-\tfrac12\cos(2nx)$.`,
    t`Teste $u_n^2$ contre la fonction constante $\mathbb 1$ : que vaut $\int_0^{2\pi}\sin^2(nx)\,dx$ ?`,
  ],
  rubric: rubric({
    hypotheses: t`Le cadre $L^2(]0,2\pi[)$ et l'appartenance de $\mathbb 1$ à $H$ sont explicités.`,
    methode: 'La convergence faible est démontrée, par Bessel ou Riemann–Lebesgue.',
    validite: t`La limite faible de $u_n^2$ est calculée exactement.`,
    justifications: 'La réfutation repose sur un test explicite, non sur une intuition.',
    conclusion: t`L'écart entre $\lim u_n^2$ et $(\lim u_n)^2$ est établi.`,
  }),
  variant: {
    statement: t`Soit $\Omega$ un ouvert de $\mathbb R^d$. On suppose $u_n\rightharpoonup u$ dans $L^2(\Omega)$ et $u_n^2\rightharpoonup u^2$ faiblement dans $L^1(\Omega)$. Montrer que $u_n\to u$ fortement dans $L^2(\Omega)$. Qu'en déduit-on pour $\sin(nx)$ ?`,
    solution: t`La fonction $\mathbb 1$ appartient à $L^\infty(\Omega)=(L^1(\Omega))'$ : la convergence faible de $u_n^2$ donne $\|u_n\|_{L^2}^2=\int_\Omega u_n^2\to\int_\Omega u^2=\|u\|_{L^2}^2$. La convergence faible donne $(u_n,u)\to\|u\|^2$. Alors $\|u_n-u\|^2=\|u_n\|^2+\|u\|^2-2(u_n,u)\to 0$ : c'est la proposition de la section 5.1 du polycopié. Pour $\sin(nx)$, qui tend faiblement vers $0$ sans tendre fortement vers $0$, on en déduit que $\sin^2(nx)$ ne peut pas converger faiblement vers $0$.`,
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h-L2', kind: 'hypothese', text: t`$(u_n)\subset L^2(\Omega)$, $u\in L^2(\Omega)$ et $u_n\rightharpoonup u$ dans $L^2(\Omega)$.` },
        { id: 'h-carre', kind: 'hypothese', text: t`$u_n^2\rightharpoonup u^2$ faiblement dans $L^1(\Omega)$.` },
        { id: 'h-un', kind: 'hypothese', text: t`La fonction constante $\mathbb 1$ appartient à $L^\infty(\Omega)=(L^1(\Omega))'$.` },
        { id: 'n-norme', kind: 'consequence', text: t`$\|u_n\|_{L^2}^2=\int_\Omega u_n^2\to\int_\Omega u^2=\|u\|_{L^2}^2$.` },
        { id: 'p-ps', kind: 'consequence', text: t`$(u_n,u)_{L^2}\to\|u\|_{L^2}^2$.` },
        { id: 'dev', kind: 'egalite', text: t`$\|u_n-u\|_{L^2}^2=\|u_n\|_{L^2}^2+\|u\|_{L^2}^2-2(u_n,u)_{L^2}$.` },
        { id: 'fin', kind: 'conclusion', text: t`$u_n\to u$ fortement dans $L^2(\Omega)$.` },
        { id: 'x-faible-seule', kind: 'consequence', distractor: true, text: t`La seule convergence faible $u_n\rightharpoonup u$ dans $L^2(\Omega)$ entraîne $u_n\to u$ fortement.` },
      ],
      justifications: [
        { id: 'j-test1', label: t`Test de la convergence faible dans $L^1$ contre $\mathbb 1\in L^\infty$.` },
        { id: 'j-test-u', label: t`Test de la convergence faible dans $L^2$ contre $u$.` },
        { id: 'j-dev', label: 'Développement du carré de la norme hilbertienne.' },
        { id: 'j-limite', label: t`Passage à la limite : $\|u\|^2+\|u\|^2-2\|u\|^2=0$.` },
      ],
      rules: [
        { from: ['h-carre', 'h-un'], to: 'n-norme', by: 'j-test1' },
        { from: ['h-L2'], to: 'p-ps', by: 'j-test-u' },
        { from: ['h-L2'], to: 'dev', by: 'j-dev' },
        { from: ['dev', 'n-norme', 'p-ps'], to: 'fin', by: 'j-limite' },
      ],
      traps: [
        {
          conclusion: 'x-faible-seule',
          verdict: 'incorrect',
          concept: 'faible-fort',
          message: 'Il manque la convergence des normes : c’est elle que fournit l’hypothèse sur les carrés.',
          counterexample: t`$\sin(n\cdot)\rightharpoonup 0$ dans $L^2(]0,2\pi[)$ et $\|\sin(n\cdot)\|^2=\pi$.`,
        },
      ],
      removable: [
        {
          hypothesis: 'h-carre',
          label: 'Retirer l’hypothèse sur les carrés',
          necessary: true,
          explanation: 'Sans convergence des normes, la convergence faible ne donne pas la convergence forte.',
          counterexample: t`$u_n=\sin(n\cdot)$ dans $L^2(]0,2\pi[)$ : $u_n\rightharpoonup 0$, $u_n^2\rightharpoonup\tfrac12$, et $\|u_n\|_{L^2}^2=\pi$.`,
        },
      ],
    },
  },
  verification: { ...COMPLEMENT, notes: 'Le polycopié donne l’exemple (p. PDF 20) sans démonstration ; la preuve par Bessel ou Riemann–Lebesgue est un complément.' },
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT20: TheoremModule = {
  theorem: {
    id: 'extraction-reflexive',
    spaces: [
      t`$E$ : espace de Banach réel, $J:E\to E''$ l'injection canonique $J(u)(f)=f(u)$ ; $E$ est réflexif lorsque $J$ est surjective.`,
      t`Convergence faible : $u_n\rightharpoonup u$ dans $E$ signifie $f(u_n)\to f(u)$ pour tout $f\in E'$.`,
    ],
    hypotheses: [
      {
        id: 'h-reflexif',
        text: t`$E$ est un espace de Banach réflexif.`,
        whenRemoved: t`Dans $L^1(]0,1[)$, non réflexif, $u_n=n\,\mathbb 1_{]0,1/n[}$ est bornée sans sous-suite faiblement convergente : une limite faible serait nulle (tests $\mathbb 1_{]\delta,1[}$), alors que $\int_0^1u_n=1$.`,
      },
      {
        id: 'h-bornee',
        text: t`La suite $(u_n)$ est bornée dans $E$.`,
        whenRemoved: t`$u_n=nw$, $w\neq 0$ : pour $f\in E'$ avec $f(w)\neq 0$, $f(u_n)=nf(w)$ diverge le long de toute sous-suite.`,
      },
    ],
    statement: t`Dans un Banach réflexif, toute suite bornée possède une sous-suite faiblement convergente.`,
    conclusions: {
      existence: t`Existence d'une sous-suite faiblement convergente ; deux sous-suites peuvent avoir des limites différentes.`,
    },
    sourceProof: 'idee',
    proofOutline: [
      t`$J:E\to E''$ est une isométrie linéaire, surjective par réflexivité.`,
      t`Banach–Alaoglu appliqué à l'espace normé $E'$ : la boule unité de $E''$ est compacte pour $\sigma(E'',E')$.`,
      t`$J$ est un homéomorphisme de $(E,\sigma(E,E'))$ sur $(E'',\sigma(E'',E'))$, car $J(u)(f)=f(u)$ : la boule unité de $E$ est faiblement compacte.`,
      t`Eberlein–Šmulian : dans un Banach, une partie faiblement compacte est faiblement séquentiellement compacte.`,
      'Une suite bornée, contenue dans une boule fermée, admet donc une sous-suite faiblement convergente.',
    ],
    warnings: [
      'La sous-suite converge faiblement, pas en norme : une suite orthonormée tend faiblement vers 0 avec une norme constante.',
      'Seule une sous-suite converge en général : $(-1)^nw$ a deux limites faibles d’adhérence.',
      t`$L^1$, $L^\infty$ et $C([0,1])$ ne sont pas réflexifs : pour $L^\infty$, on utilise Banach–Alaoglu et la topologie faible-*.`,
      'La convergence faible ne passe pas à la limite dans les non-linéarités.',
    ],
    usefulFor: t`D'une estimation uniforme $\|u_n\|_V\le C$, extraire $u_n\rightharpoonup u$ dans l'espace réflexif $V$, par exemple $L^2(0,T;H^1_0(\Omega))$ pour des approximations de Galerkin.`,
    verification: FROM_POLY,
  },
  definitions: [
    {
      id: 'er-reflexif',
      term: 'Espace réflexif',
      statement: t`Un espace de Banach $E$ est réflexif lorsque l'injection canonique $J:E\to E''$, $J(u)(f)=f(u)$, est surjective. Tout espace de Hilbert est réflexif.`,
      source: complement('Définition standard'),
    },
    {
      id: 'er-convergence-faible',
      term: 'Convergence faible',
      statement: t`$u_n\rightharpoonup u$ dans $E$ signifie $f(u_n)\to f(u)$ pour tout $f\in E'$.`,
      source: poly(20, 'Section 5.1'),
    },
  ],
  concepts: [
    {
      id: 'extraction-reflexive-non-reflexif',
      label: 'Espaces non réflexifs',
      reminder: t`$L^1$, $L^\infty$, $C([0,1])$ ne sont pas réflexifs ; un Banach séparable ne l'est pas forcément. La réflexivité de $L^2(0,T;V)$ vient de sa structure hilbertienne.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-er-l1',
      theoremId: 'extraction-reflexive',
      title: t`Suite bornée de $L^1$`,
      claim: t`Toute suite bornée de $L^1(]0,1[)$ admet une sous-suite faiblement convergente.`,
      correctStatement: t`L'extraction faible vaut dans les espaces réflexifs ; $L^1(]0,1[)$ ne l'est pas.`,
      task: t`Pour $u_n=n\,\mathbb 1_{]0,1/n[}$ et $\delta\in]0,1[$, calcule $\int_0^1u_n$ et $\lim_n\int_\delta^1u_n$.`,
      check: { kind: 'rational-vector', prompt: t`Valeurs de $\int_0^1u_n$ et de $\lim_n\int_\delta^1u_n$`, expected: ['1', '0'], labels: ['∫₀¹ uₙ', 'lim ∫_δ¹ uₙ'] },
      explanation: t`Une limite faible $u$ d'une sous-suite vérifierait $\int_\delta^1u=0$ pour tout $\delta>0$ (test contre $\mathbb 1_{]\delta,1[}\in L^\infty$), donc $u=0$ ; mais le test contre $\mathbb 1$ donne $\int_0^1u=1$. Contradiction.`,
      concept: 'extraction-reflexive-non-reflexif',
      source: complement('Contre-exemple classique, hors polycopié'),
    },
    {
      id: 'ce-er-toute-suite',
      theoremId: 'extraction-reflexive',
      title: 'Sous-suite et suite entière',
      claim: t`Dans un Hilbert, toute suite bornée converge faiblement.`,
      correctStatement: 'Seule une sous-suite converge faiblement en général.',
      task: t`Pour $u_n=(-1)^nw$ avec $\|w\|=1$, calcule $(u_{2k},w)$ et $(u_{2k+1},w)$.`,
      check: { kind: 'rational-vector', prompt: t`Valeurs de $(u_{2k},w)$ et $(u_{2k+1},w)$`, expected: ['1', '-1'], labels: ['pair', 'impair'] },
      explanation: t`Les sous-suites paire et impaire convergent faiblement vers $w$ et $-w$ : la suite entière ne converge pas.`,
      concept: 'existence-unicite',
      source: complement('Contre-exemple classique, hors polycopié'),
    },
    {
      id: 'ce-er-forte',
      theoremId: 'extraction-reflexive',
      title: 'Faible n’est pas fort',
      claim: t`Toute suite bornée d'un Hilbert admet une sous-suite fortement convergente.`,
      correctStatement: 'La sous-suite extraite converge faiblement ; la convergence forte demande de la compacité.',
      task: t`Pour une suite orthonormée $(e_n)$ et $n\neq m$, calcule $\|e_n-e_m\|^2$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\|e_n-e_m\|^2$`, expected: '2' },
      explanation: t`Les termes sont deux à deux à distance $\sqrt2$ : aucune sous-suite n'est de Cauchy. Pourtant $e_n\rightharpoonup 0$ par l'inégalité de Bessel.`,
      concept: 'bornee-non-convergente',
      source: complement('Contre-exemple classique, hors polycopié'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT20;
