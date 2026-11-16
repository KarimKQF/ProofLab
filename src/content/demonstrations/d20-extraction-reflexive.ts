/**
 * Démonstration du résultat 20 — extraction faible dans un Banach réflexif, selon le plan
 * de la fiche : Banach–Alaoglu dans le bidual, transport par l'injection canonique,
 * puis Eberlein–Šmulian pour passer de la compacité à l'extraction de suites.
 */
import { t, COMPLEMENT } from '@/content/authoring';
import type { Demonstration } from '@/content/schema';

const demonstration: Demonstration = {
  id: 'extraction-reflexive.demonstration',
  theoremId: 'extraction-reflexive',
  title: 'Démontrer l’extraction faible en espace réflexif',
  statement: t`Soit $E$ un espace de Banach réel réflexif et $(u_n)$ une suite de $E$ telle que $\|u_n\|\le R$ pour tout $n$. Démontrer que $(u_n)$ admet une sous-suite faiblement convergente.`,
  scope: 'complete',
  source: { doc: 'polycopie', pdfPage: 20, label: 'Section 5.2 : idée de la démonstration (plan détaillé pour ProofLab)' },
  prerequisites: ['banach-alaoglu', 'eberlein-smulian', 'plongement-canonique'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-banach', kind: 'hypothese', text: t`$E$ est un espace de Banach réel.` },
      { id: 'h-reflexif', kind: 'hypothese', text: t`$E$ est réflexif : l'injection canonique $J:E\to E''$, $J(u)(f)=f(u)$, est surjective.` },
      { id: 'h-bornee', kind: 'hypothese', text: t`$\|u_n\|\le R$ pour tout $n$.` },

      { id: 'isom', kind: 'consequence', text: t`$J$ est une isométrie linéaire de $E$ sur $E''$.` },
      { id: 'ba', kind: 'application-theoreme', text: t`La boule fermée $B_{E''}(0,R)$ est compacte pour la topologie $\sigma(E'',E')$.` },
      { id: 'homeo', kind: 'consequence', text: t`$J$ est un homéomorphisme de $(E,\sigma(E,E'))$ sur $(E'',\sigma(E'',E'))$.` },
      { id: 'bE-compact', kind: 'consequence', text: t`La boule fermée $B_E(0,R)$ est faiblement compacte.` },
      { id: 'es', kind: 'application-theoreme', text: t`Toute suite de $B_E(0,R)$ admet une sous-suite faiblement convergente.` },

      { id: 'fin', kind: 'conclusion', text: t`$(u_n)$ admet une sous-suite faiblement convergente.` },

      { id: 'x-forte', kind: 'consequence', distractor: true, after: ['bE-compact'], text: t`$(u_n)$ admet une sous-suite convergente en norme.` },
      { id: 'x-direct', kind: 'consequence', distractor: true, after: ['ba'], text: t`La compacité faible de la boule suffit, sans autre argument, à extraire une sous-suite convergente de toute suite bornée, dans tout espace de Banach.` },
    ],
    justifications: [
      { id: 'j-plongement', label: t`$\|J(u)\|_{E''}=\sup_{\|f\|\le 1}|f(u)|=\|u\|$ (plongement canonique), et $J$ est surjective par réflexivité.`, theorem: 'plongement-canonique' },
      { id: 'j-ba', label: t`Théorème de Banach–Alaoglu, appliqué à l'espace normé $E'$, dont $E''$ est le dual.`, theorem: 'banach-alaoglu' },
      { id: 'j-homeo', label: t`$f(u_i)\to f(u)$ pour tout $f\in E'$ équivaut à $J(u_i)(f)\to J(u)(f)$ pour tout $f$ : les deux topologies se correspondent par $J$.` },
      { id: 'j-image', label: t`$B_E(0,R)=J^{-1}\big(B_{E''}(0,R)\big)$, image d'un compact par l'homéomorphisme $J^{-1}$.` },
      { id: 'j-es', label: 'Théorème d’Eberlein–Šmulian : dans un Banach, une partie faiblement compacte est faiblement séquentiellement compacte.', theorem: 'eberlein-smulian' },
      { id: 'j-contenue', label: t`La suite $(u_n)$ est contenue dans $B_E(0,R)$.` },
      // Justifications séduisantes mais fausses.
      { id: 'j-seq', label: 'Dans un espace topologique, une partie compacte est séquentiellement compacte.' },
      { id: 'j-thm', label: 'Extraction faible en espace réflexif.', theorem: 'extraction-reflexive' },
    ],
    rules: [
      { from: ['h-reflexif'], to: 'isom', by: 'j-plongement' },
      { from: ['h-banach'], to: 'ba', by: 'j-ba' },
      { from: ['isom'], to: 'homeo', by: 'j-homeo' },
      { from: ['homeo', 'ba', 'isom'], to: 'bE-compact', by: 'j-image' },
      { from: ['bE-compact', 'h-banach'], to: 'es', by: 'j-es' },
      { from: ['es', 'h-bornee'], to: 'fin', by: 'j-contenue' },
    ],
    traps: [
      {
        conclusion: 'x-forte',
        verdict: 'incorrect',
        concept: 'faible-fort',
        message: 'En dimension infinie, la boule unité n’est pas compacte en norme : on n’obtient qu’une convergence faible.',
        counterexample: t`Dans $\ell^2$, réflexif, la suite $(e_n)$ est bornée et $\|e_n-e_m\|=\sqrt2$ pour $n\neq m$ : aucune sous-suite ne converge en norme.`,
      },
      {
        conclusion: 'x-direct',
        verdict: 'incorrect',
        concept: 'banach-alaoglu-sequentiel',
        message: 'Compacité et compacité séquentielle diffèrent pour une topologie non métrisable : il faut Eberlein–Šmulian, ou la séparabilité, pour extraire une sous-suite.',
        counterexample: t`Dans $(\ell^\infty)'$, la boule unité est faiblement-* compacte, mais les formes coordonnées $x\mapsto x_n$ n'ont aucune sous-suite faiblement-* convergente : pour une sous-suite $(n_k)$, prendre $x_{n_k}=(-1)^k$.`,
      },
      {
        conclusion: 'es',
        by: 'j-seq',
        verdict: 'incorrect',
        concept: 'banach-alaoglu-sequentiel',
        message: 'C’est faux en général. Pour la topologie faible d’un Banach, c’est précisément le théorème d’Eberlein–Šmulian.',
        counterexample: t`Dans $(\ell^\infty)'$ muni de $\sigma\big((\ell^\infty)',\ell^\infty\big)$, la boule unité est compacte, et la suite des formes coordonnées n'a aucune sous-suite convergente.`,
      },
      {
        conclusion: 'fin',
        by: 'j-thm',
        verdict: 'incorrect',
        concept: 'circularite',
        message: 'C’est le résultat à démontrer : l’invoquer rend la preuve circulaire.',
      },
    ],
    removable: [
      {
        hypothesis: 'h-reflexif',
        label: t`Ne plus supposer $E$ réflexif`,
        necessary: true,
        explanation: t`$J(B_E)$ peut être strictement plus petit que $B_{E''}$ et cesse d'être compact.`,
        counterexample: t`Dans $\ell^1$, non réflexif, la suite $(e_n)$ est bornée et n'a aucune sous-suite faiblement convergente : pour une sous-suite $(n_k)$, tester contre $x\in\ell^\infty$ avec $x_{n_k}=(-1)^k$.`,
      },
    ],
  },
  plan: [
    t`$J:E\to E''$ est une isométrie, surjective par réflexivité.`,
    t`Banach–Alaoglu : la boule de $E''$ est compacte pour $\sigma(E'',E')$.`,
    t`Transport par $J$ : la boule de $E$ est faiblement compacte.`,
    'Eberlein–Šmulian : compacité faible implique extraction de suites.',
  ],
  solution: t`L'injection canonique $J$ est une isométrie linéaire, surjective puisque $E$ est réflexif. Par Banach–Alaoglu appliqué à $E'$, la boule $B_{E''}(0,R)$ est compacte pour $\sigma(E'',E')$. Comme $J(u)(f)=f(u)$, une convergence $f(u_i)\to f(u)$ pour tout $f\in E'$ équivaut à $J(u_i)\to J(u)$ pour $\sigma(E'',E')$ : $J$ est un homéomorphisme entre $(E,\sigma(E,E'))$ et $(E'',\sigma(E'',E'))$, et $B_E(0,R)=J^{-1}(B_{E''}(0,R))$ est faiblement compacte. Par Eberlein–Šmulian, elle est faiblement séquentiellement compacte : $(u_n)$, contenue dans cette boule, admet une sous-suite faiblement convergente.`,
  verification: { ...COMPLEMENT, notes: 'Plan de la fiche (idée de la démonstration du polycopié), détaillé pour ProofLab.' },
};

export default demonstration;
