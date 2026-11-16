/**
 * Démonstration du résultat 2 — représentation de Riesz, selon le plan du polycopié :
 * noyau fermé, vecteur orthogonal au noyau par projection, identification, unicité, norme.
 */
import { t, FROM_POLY } from '@/content/authoring';
import type { Demonstration } from '@/content/schema';

const demonstration: Demonstration = {
  id: 'riesz.demonstration',
  theoremId: 'riesz',
  title: 'Démontrer le théorème de représentation de Riesz',
  statement: t`Soit $H$ un espace de Hilbert réel et $\ell\in H'$. Démontrer qu'il existe un unique $w\in H$ tel que $\ell(v)=\langle v,w\rangle$ pour tout $v\in H$, et que $\|\ell\|_{H'}=\|w\|_H$.`,
  scope: 'complete',
  source: { doc: 'polycopie', pdfPage: 6, label: 'Section 1.2 : théorème de représentation de Riesz et sa démonstration' },
  prerequisites: ['cauchy-schwarz'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-hilbert', kind: 'hypothese', text: t`$H$ est un espace de Hilbert réel.` },
      { id: 'h-ell', kind: 'hypothese', text: t`$\ell\in H'$ : $\ell$ est linéaire et continue sur $H$.` },

      { id: 'c0', kind: 'definition', local: true, text: t`Cas 1 : $\ell=0$.` },
      { id: 'c0-w', kind: 'consequence', text: t`Dans le cas 1, $w=0$ convient : $\ell(v)=0=\langle v,0\rangle$ pour tout $v$.` },
      { id: 'c1', kind: 'definition', local: true, text: t`Cas 2 : $\ell\neq 0$.` },
      { id: 'F-ferme', kind: 'consequence', text: t`$F=\ker\ell$ est un sous-espace vectoriel fermé de $H$.` },
      { id: 'F-strict', kind: 'consequence', text: t`Dans le cas 2, $F\neq H$.` },
      { id: 'z', kind: 'application-theoreme', text: t`Il existe $z\in F^\perp$ avec $z\neq 0$ ; alors $z\notin F$, donc $\ell(z)\neq 0$.` },
      { id: 'decomp', kind: 'inclusion', text: t`Pour tout $v\in H$ : $v-\frac{\ell(v)}{\ell(z)}z\in F$.` },
      { id: 'orth', kind: 'egalite', text: t`Pour tout $v\in H$ : $\langle v,z\rangle=\frac{\ell(v)}{\ell(z)}\|z\|^2$.` },
      { id: 'c1-w', kind: 'consequence', text: t`Dans le cas 2, $w=\frac{\ell(z)}{\|z\|^2}z$ convient : $\ell(v)=\langle v,w\rangle$ pour tout $v$.` },
      { id: 'existence', kind: 'consequence', text: t`Il existe $w\in H$ tel que $\ell(v)=\langle v,w\rangle$ pour tout $v\in H$.` },

      { id: 'u-soit', kind: 'definition', local: true, text: t`Soient $w_1,w_2\in H$ tels que $\ell(v)=\langle v,w_1\rangle=\langle v,w_2\rangle$ pour tout $v\in H$.` },
      { id: 'u-test', kind: 'egalite', text: t`$\|w_1-w_2\|^2=\langle w_1-w_2,w_1\rangle-\langle w_1-w_2,w_2\rangle=0$.` },
      { id: 'unicite', kind: 'consequence', text: t`$w_1=w_2$ : le représentant est unique.` },

      { id: 'n-maj', kind: 'inegalite', text: t`$\|\ell\|_{H'}\le\|w\|_H$.` },
      { id: 'n-min', kind: 'inegalite', text: t`$\|\ell\|_{H'}\ge\|w\|_H$.` },
      { id: 'norme', kind: 'egalite', text: t`$\|\ell\|_{H'}=\|w\|_H$.` },

      { id: 'fin', kind: 'conclusion', text: t`Il existe un unique $w\in H$ tel que $\ell(v)=\langle v,w\rangle$ pour tout $v\in H$, et $\|\ell\|_{H'}=\|w\|_H$.` },

      { id: 'x-F-dense', kind: 'consequence', distractor: true, after: ['F-ferme'], text: t`Dans le cas 2, $F=\ker\ell$ est dense dans $H$.` },
      { id: 'x-w', kind: 'consequence', distractor: true, after: ['orth'], text: t`Dans le cas 2, $w=\ell(z)\,z$ convient.` },
    ],
    justifications: [
      { id: 'j-direct', label: 'Vérification directe.' },
      { id: 'j-noyau', label: t`Image réciproque du fermé $\{0\}$ par l'application linéaire continue $\ell$.` },
      { id: 'j-strict', label: t`Un $v$ tel que $\ell(v)\neq 0$ n'appartient pas à $F$.` },
      { id: 'j-projection', label: t`Projection sur le convexe fermé non vide $F$ : pour $y\notin F$, $z=y-P_Fy$ est non nul et orthogonal à $F$.`, theorem: 'projection' },
      { id: 'j-lineaire', label: t`Linéarité de $\ell$ : $\ell\big(v-\frac{\ell(v)}{\ell(z)}z\big)=\ell(v)-\ell(v)=0$.` },
      { id: 'j-orth', label: t`$z\in F^\perp$ : son produit scalaire avec tout élément de $F$ est nul.` },
      { id: 'j-isoler', label: t`Isoler $\ell(v)$ (cas réel).` },
      { id: 'j-cas', label: t`Disjonction des cas : $\ell=0$ ou $\ell\neq 0$.` },
      { id: 'j-tester', label: t`Tester l'égalité en $v=w_1-w_2$.` },
      { id: 'j-norme-nulle', label: 'Un vecteur de norme nulle est nul.' },
      { id: 'j-cs', label: t`$|\ell(v)|=|\langle v,w\rangle|\le\|v\|\,\|w\|$ (Cauchy–Schwarz).`, theorem: 'cauchy-schwarz' },
      { id: 'j-test-w', label: t`Si $w\neq 0$, $v=w/\|w\|$ est de norme $1$ et $\ell(v)=\|w\|$ ; si $w=0$, il n'y a rien à montrer.` },
      { id: 'j-double', label: 'Deux inégalités contraires.' },
      { id: 'j-syn', label: 'Réunion des résultats établis.' },
      // Justifications séduisantes mais fausses.
      { id: 'j-lin-seule', label: 'Le noyau de toute forme linéaire est fermé.' },
      { id: 'j-thm', label: 'Théorème de représentation de Riesz.', theorem: 'riesz' },
    ],
    rules: [
      { from: ['c0'], to: 'c0-w', by: 'j-direct' },
      { from: ['h-ell'], to: 'F-ferme', by: 'j-noyau' },
      { from: ['c1'], to: 'F-strict', by: 'j-strict' },
      { from: ['h-hilbert', 'F-ferme', 'F-strict'], to: 'z', by: 'j-projection' },
      { from: ['z', 'h-ell'], to: 'decomp', by: 'j-lineaire' },
      { from: ['decomp', 'z'], to: 'orth', by: 'j-orth' },
      { from: ['orth'], to: 'c1-w', by: 'j-isoler' },
      { from: ['c0-w', 'c1-w'], to: 'existence', by: 'j-cas' },
      { from: ['u-soit'], to: 'u-test', by: 'j-tester' },
      { from: ['u-test'], to: 'unicite', by: 'j-norme-nulle' },
      { from: ['existence'], to: 'n-maj', by: 'j-cs' },
      { from: ['existence'], to: 'n-min', by: 'j-test-w' },
      { from: ['n-maj', 'n-min'], to: 'norme', by: 'j-double' },
      { from: ['existence', 'unicite', 'norme'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-F-dense',
        verdict: 'incorrect',
        concept: 'densite-fermeture',
        message: t`Le noyau d'une forme linéaire continue est fermé : s'il était dense, il serait égal à $H$, et $\ell$ serait nulle. Seul le noyau d'une forme non continue est dense.`,
        counterexample: t`Pour $\ell(v)=v_1$ sur $\mathbb R^2$, $\ker\ell=\{v_1=0\}$ est une droite fermée, non dense.`,
      },
      {
        conclusion: 'x-w',
        verdict: 'incorrect',
        concept: 'riesz-produit-scalaire',
        message: t`Avec $w=\ell(z)z$, on obtient $\langle v,w\rangle=\ell(v)\,\|z\|^2$ : il faut diviser par $\|z\|^2$, sauf si $\|z\|=1$.`,
        counterexample: t`$H=\mathbb R$, $\ell(v)=v$ et $z=2$ : $w=\ell(z)z=4$ donne $\langle v,w\rangle=4v\neq\ell(v)$.`,
      },
      {
        conclusion: 'F-ferme',
        by: 'j-lin-seule',
        verdict: 'incorrect',
        concept: 'densite-fermeture',
        message: t`C'est faux pour une forme linéaire non continue, dont le noyau est dense. La fermeture du noyau vient de la continuité de $\ell$.`,
        counterexample: t`Sur $c_{00}$ muni de la norme de $\ell^2$, $\ell(v)=\sum_k k\,v_k$ est linéaire, non continue, et son noyau est dense.`,
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
        hypothesis: 'h-ell',
        label: t`Ne plus supposer $\ell$ continue`,
        necessary: true,
        explanation: 'Le noyau n’est plus fermé et la projection ne s’applique plus ; le résultat est faux.',
        counterexample: t`Sur un Hilbert de dimension infinie, une forme linéaire non continue (construite à l'aide d'une base algébrique) n'est représentée par aucun $w$, puisque $v\mapsto\langle v,w\rangle$ est continue.`,
      },
      {
        hypothesis: 'h-hilbert',
        label: t`Ne plus supposer $H$ complet`,
        necessary: true,
        explanation: 'Le théorème de projection ne s’applique plus ; un élément du dual peut n’avoir aucun représentant.',
        counterexample: t`Sur $c_{00}$ muni de la norme de $\ell^2$, $\ell(v)=\sum_k v_k/k$ est continue (Cauchy–Schwarz), mais le seul candidat $w=(1/k)_k$ n'appartient pas à $c_{00}$.`,
      },
    ],
  },
  plan: [
    t`Traiter à part le cas $\ell=0$.`,
    t`Si $\ell\neq 0$ : $F=\ker\ell$ est un sous-espace fermé strict ; la projection fournit $z\in F^\perp$ non nul.`,
    t`Pour tout $v$, $v-\frac{\ell(v)}{\ell(z)}z\in F$ est orthogonal à $z$ : on en déduit $w=\frac{\ell(z)}{\|z\|^2}z$.`,
    t`Unicité : tester en $v=w_1-w_2$.`,
    'Norme : Cauchy–Schwarz dans un sens, le vecteur w normalisé dans l’autre.',
  ],
  solution: t`**Cas $\ell=0$.** $w=0$ convient.

**Cas $\ell\neq 0$.** $F=\ker\ell=\ell^{-1}(\{0\})$ est un sous-espace fermé, car $\ell$ est continue, et $F\neq H$. Pour $y\notin F$, le projeté $P_Fy$ existe, et $z=y-P_Fy$ est non nul et orthogonal à $F$ ; comme $z\notin F$, $\ell(z)\neq 0$. Pour tout $v\in H$, $v-\frac{\ell(v)}{\ell(z)}z\in F$, donc $\big\langle v-\frac{\ell(v)}{\ell(z)}z,z\big\rangle=0$, c'est-à-dire $\ell(v)=\big\langle v,\frac{\ell(z)}{\|z\|^2}z\big\rangle$.

**Unicité.** Si $w_1,w_2$ conviennent, $\langle v,w_1-w_2\rangle=0$ pour tout $v$ ; avec $v=w_1-w_2$, $\|w_1-w_2\|^2=0$.

**Norme.** $|\ell(v)|\le\|v\|\,\|w\|$ par Cauchy–Schwarz, donc $\|\ell\|_{H'}\le\|w\|$ ; si $w\neq 0$, $v=w/\|w\|$ donne $\ell(v)=\|w\|$.`,
  verification: FROM_POLY,
};

export default demonstration;
