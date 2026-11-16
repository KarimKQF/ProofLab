/**
 * Démonstration d'une étape clé du résultat 21 (Aubin–Lions) : le lemme d'Ehrling, par
 * l'absurde. La suite de la preuve (translations en temps, critère de compacité dans
 * L^p(0,T;X)) est décrite dans la fiche du résultat.
 */
import { t, COMPLEMENT } from '@/content/authoring';
import type { Demonstration } from '@/content/schema';

const demonstration: Demonstration = {
  id: 'aubin-lions.demonstration',
  theoremId: 'aubin-lions',
  title: 'Le lemme d’Ehrling, étape clé d’Aubin–Lions',
  statement: t`Soient $X_0,X,X_1$ des espaces de Banach, l'injection $X_0\hookrightarrow X$ étant compacte et l'injection $X\hookrightarrow X_1$ continue. Démontrer que pour tout $\varepsilon>0$, il existe $C_\varepsilon\ge 0$ tel que $\|v\|_X\le\varepsilon\|v\|_{X_0}+C_\varepsilon\|v\|_{X_1}$ pour tout $v\in X_0$.`,
  scope: 'partie',
  scopeNote: t`Le lemme d'Ehrling, première étape du plan d'Aubin–Lions. La suite (contrôle des translations en temps par $u_n'$, puis critère de compacité dans $L^p(0,T;X)$) est décrite dans la fiche du résultat.`,
  source: { doc: 'polycopie', pdfPage: 21, label: 'Section 5.3 : idée de la démonstration, étape 1 (lemme d’Ehrling)' },
  prerequisites: [],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-compacte', kind: 'hypothese', text: t`L'injection $X_0\hookrightarrow X$ est compacte : elle envoie les bornés de $X_0$ sur des parties relativement compactes de $X$.` },
      { id: 'h-continue', kind: 'hypothese', text: t`L'injection $X\hookrightarrow X_1$ est continue (et injective, comme toute injection).` },

      { id: 'abs', kind: 'definition', local: true, text: t`Supposons par l'absurde qu'il existe $\varepsilon>0$ tel que, pour tout $n\ge 1$, un $v_n\in X_0$ vérifie $\|v_n\|_X>\varepsilon\|v_n\|_{X_0}+n\|v_n\|_{X_1}$.` },
      { id: 'norm', kind: 'consequence', text: t`Quitte à diviser $v_n$ par $\|v_n\|_{X_0}$, on peut supposer $\|v_n\|_{X_0}=1$.` },
      { id: 'borne-X', kind: 'inegalite', text: t`$\|v_n\|_X\le C_0$ pour tout $n$, où $C_0$ est la norme de l'injection $X_0\hookrightarrow X$.` },
      { id: 'extr', kind: 'consequence', text: t`Une sous-suite $(v_{n_k})$ converge dans $X$ vers un $v\in X$.` },
      { id: 'x1-zero', kind: 'egalite', text: t`$\|v_{n}\|_{X_1}<\|v_{n}\|_X/n\le C_0/n\to 0$.` },
      { id: 'v-zero', kind: 'egalite', text: t`$v=0$.` },
      { id: 'minor', kind: 'inegalite', text: t`$\|v\|_X=\lim_k\|v_{n_k}\|_X\ge\varepsilon$.` },
      { id: 'contra', kind: 'contradiction', text: t`$\|v\|_X\ge\varepsilon>0$ et $v=0$ : contradiction.` },

      { id: 'fin', kind: 'conclusion', text: t`Pour tout $\varepsilon>0$, il existe $C_\varepsilon$ tel que $\|v\|_X\le\varepsilon\|v\|_{X_0}+C_\varepsilon\|v\|_{X_1}$ pour tout $v\in X_0$.` },

      { id: 'x-strict', kind: 'inegalite', distractor: true, after: ['extr'], text: t`$\|v\|_X>\varepsilon$.` },
      { id: 'x-X0', kind: 'consequence', distractor: true, after: ['norm'], text: t`Une sous-suite de $(v_n)$ converge dans $X_0$.` },
    ],
    justifications: [
      { id: 'j-homogene', label: t`L'inégalité est homogène en $v_n$, et $v_n\neq 0$ puisqu'elle est stricte.` },
      { id: 'j-compacte-continue', label: 'Une injection compacte est continue : elle envoie les bornés sur des bornés.' },
      { id: 'j-compacite', label: 'Une suite bornée de X₀ a une image relativement compacte dans X : on en extrait une sous-suite convergente.' },
      { id: 'j-isole', label: t`L'hypothèse par l'absurde donne $n\|v_n\|_{X_1}<\|v_n\|_X$.` },
      { id: 'j-limites', label: t`Par continuité de $X\hookrightarrow X_1$, $v_{n_k}\to v$ dans $X_1$ ; or $v_{n_k}\to 0$ dans $X_1$ : $v=0$ dans $X_1$, donc dans $X$ par injectivité.` },
      { id: 'j-passage', label: t`$\|v_{n_k}\|_X>\varepsilon\|v_{n_k}\|_{X_0}=\varepsilon$, puis passage à la limite dans une inégalité large.` },
      { id: 'j-contra', label: 'Deux conclusions incompatibles.' },
      { id: 'j-absurde', label: 'Raisonnement par l’absurde : la négation de l’énoncé est intenable.' },
      // Justifications séduisantes mais fausses.
      { id: 'j-X1-X', label: t`$v_{n_k}\to 0$ dans $X_1$, donc $v_{n_k}\to 0$ dans $X$.` },
      { id: 'j-thm', label: 'Théorème d’Aubin–Lions.', theorem: 'aubin-lions' },
    ],
    rules: [
      { from: ['abs'], to: 'norm', by: 'j-homogene' },
      { from: ['norm', 'h-compacte'], to: 'borne-X', by: 'j-compacte-continue' },
      { from: ['norm', 'h-compacte'], to: 'extr', by: 'j-compacite' },
      { from: ['abs', 'borne-X'], to: 'x1-zero', by: 'j-isole' },
      { from: ['extr', 'x1-zero', 'h-continue'], to: 'v-zero', by: 'j-limites' },
      { from: ['extr', 'abs', 'norm'], to: 'minor', by: 'j-passage' },
      { from: ['v-zero', 'minor'], to: 'contra', by: 'j-contra' },
      { from: ['contra'], to: 'fin', by: 'j-absurde' },
    ],
    traps: [
      {
        conclusion: 'x-strict',
        verdict: 'incorrect',
        concept: 'inegalite-stricte-limite',
        message: t`Le passage à la limite ne conserve que l'inégalité large : on obtient $\|v\|_X\ge\varepsilon$, ce qui suffit.`,
        counterexample: t`$a_k=\varepsilon+\frac1k>\varepsilon$ et $a_k\to\varepsilon$.`,
      },
      {
        conclusion: 'x-X0',
        verdict: 'incorrect',
        concept: 'compact-continue',
        message: t`La compacité de l'injection donne une convergence dans $X$, pas dans $X_0$ : la boule unité de $X_0$ n'est pas compacte en dimension infinie.`,
        counterexample: t`Dans $X_0=H^1_0(]0,1[)$ normé par $\|v'\|_{L^2}$, les fonctions $v_n=\sqrt2\sin(n\pi x)/(n\pi)$ sont orthonormées : aucune sous-suite ne converge dans $X_0$, alors que $v_n\to 0$ dans $X=L^2(]0,1[)$.`,
      },
      {
        conclusion: 'v-zero',
        by: 'j-X1-X',
        verdict: 'incorrect',
        concept: 'aubin-lions-roles',
        message: t`La convergence dans $X_1$, plus faible, ne donne pas celle dans $X$. On identifie la limite $v$, déjà obtenue dans $X$, grâce à la continuité et à l'injectivité de $X\hookrightarrow X_1$.`,
      },
      {
        conclusion: 'fin',
        by: 'j-thm',
        verdict: 'incorrect',
        concept: 'circularite',
        message: 'Le lemme d’Ehrling est une étape de la démonstration d’Aubin–Lions : invoquer ce théorème ici est circulaire.',
      },
    ],
    removable: [
      {
        hypothesis: 'h-compacte',
        label: t`Ne plus supposer l'injection $X_0\hookrightarrow X$ compacte`,
        necessary: true,
        explanation: 'On ne peut plus extraire de sous-suite convergente dans X, et le lemme peut tomber.',
        counterexample: t`$X_0=X=L^2(]0,1[)$ (injection identique, non compacte) et $X_1=H^{-1}(]0,1[)$ : pour $v_n=\sqrt2\sin(n\pi x)$, $\|v_n\|_X=\|v_n\|_{X_0}=1$ et $\|v_n\|_{X_1}\to 0$, donc $\|v\|_X\le\frac12\|v\|_{X_0}+C\|v\|_{X_1}$ échoue pour $n$ grand.`,
      },
      {
        hypothesis: 'h-continue',
        label: t`Ne plus supposer $X\hookrightarrow X_1$ continue et injective`,
        necessary: true,
        explanation: 'La limite ne peut plus être identifiée à 0.',
        counterexample: t`Avec $X_0=H^1(]0,1[)$, $X=L^2(]0,1[)$ et l'application nulle de $X$ dans $X_1=\mathbb R$ (continue, non injective), le lemme exigerait $\|v\|_{L^2}\le\varepsilon\|v\|_{H^1}$, faux pour $v=1$ dès que $\varepsilon<1$.`,
      },
    ],
  },
  plan: [
    'Raisonner par l’absurde : nier l’énoncé avec C = n.',
    t`Normaliser $\|v_n\|_{X_0}=1$, puis extraire une sous-suite convergente dans $X$ par compacité.`,
    t`Montrer que $\|v_n\|_{X_1}\to 0$, d'où $v=0$ par continuité et injectivité.`,
    t`Passer à la limite dans $\|v_n\|_X>\varepsilon$ : $\|v\|_X\ge\varepsilon$, contradiction.`,
  ],
  solution: t`Supposons le contraire : il existe $\varepsilon>0$ et, pour tout $n$, un $v_n\in X_0$ avec $\|v_n\|_X>\varepsilon\|v_n\|_{X_0}+n\|v_n\|_{X_1}$. Alors $v_n\neq 0$ et, par homogénéité, on peut supposer $\|v_n\|_{X_0}=1$.

L'injection $X_0\hookrightarrow X$ est compacte, donc continue : $\|v_n\|_X\le C_0$, et une sous-suite $(v_{n_k})$ converge dans $X$ vers $v$. De plus $\|v_n\|_{X_1}<\|v_n\|_X/n\le C_0/n\to 0$. Par continuité de $X\hookrightarrow X_1$, $v_{n_k}\to v$ dans $X_1$ ; donc $v=0$ dans $X_1$, puis dans $X$ par injectivité.

Mais $\|v_{n_k}\|_X>\varepsilon$ pour tout $k$, et le passage à la limite donne $\|v\|_X\ge\varepsilon>0$ : contradiction.`,
  verification: { ...COMPLEMENT, notes: 'Lemme d’Ehrling, étape 1 du plan de la fiche, démontré pour ProofLab.' },
};

export default demonstration;
