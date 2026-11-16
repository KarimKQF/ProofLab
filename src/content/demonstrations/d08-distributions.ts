/**
 * Démonstration du résultat 8 — la dérivée distributionnelle est une distribution, et elle
 * prolonge la dérivée classique. Plan du polycopié.
 */
import { t, FROM_POLY } from '@/content/authoring';
import type { Demonstration } from '@/content/schema';

const demonstration: Demonstration = {
  id: 'distributions.demonstration',
  theoremId: 'distributions',
  title: 'La dérivée d’une distribution est une distribution',
  statement: t`Soit $\Omega\subset\mathbb R^d$ un ouvert, $T\in\mathcal D'(\Omega)$ et $\alpha\in\mathbb N^d$. Démontrer que $S:\varphi\mapsto(-1)^{|\alpha|}\langle T,\partial^\alpha\varphi\rangle$ est une distribution sur $\Omega$, et que, pour $T=T_u$ avec $u\in C^{|\alpha|}(\Omega)$, elle coïncide avec $T_{\partial^\alpha u}$.`,
  scope: 'complete',
  source: { doc: 'polycopie', pdfPage: 11, label: 'Section 3.1 : dérivation au sens des distributions' },
  prerequisites: [],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-T', kind: 'hypothese', text: t`$T\in\mathcal D'(\Omega)$ : $T$ est linéaire sur $\mathcal D(\Omega)$, et $\langle T,\varphi_n\rangle\to\langle T,\varphi\rangle$ dès que $\varphi_n\to\varphi$ dans $\mathcal D(\Omega)$.` },
      { id: 'h-alpha', kind: 'hypothese', text: t`$\alpha\in\mathbb N^d$ est un multi-indice.` },
      { id: 'd-S', kind: 'definition', text: t`$S(\varphi)=(-1)^{|\alpha|}\langle T,\partial^\alpha\varphi\rangle$ pour $\varphi\in\mathcal D(\Omega)$.` },

      { id: 's-def', kind: 'consequence', text: t`$S$ est bien définie : $\partial^\alpha\varphi\in\mathcal D(\Omega)$ pour tout $\varphi\in\mathcal D(\Omega)$.` },
      { id: 's-lin', kind: 'consequence', text: t`$S$ est linéaire.` },
      { id: 'c-soit', kind: 'definition', local: true, text: t`Soit $\varphi_n\to\varphi$ dans $\mathcal D(\Omega)$ : supports dans un même compact $K\subset\Omega$, et $\partial^\beta\varphi_n\to\partial^\beta\varphi$ uniformément pour tout $\beta$.` },
      { id: 'c-der', kind: 'consequence', text: t`$\partial^\alpha\varphi_n\to\partial^\alpha\varphi$ dans $\mathcal D(\Omega)$.` },
      { id: 'c-lim', kind: 'egalite', text: t`$S(\varphi_n)\to S(\varphi)$.` },
      { id: 's-dist', kind: 'consequence', text: t`$S$ est linéaire et continue sur $\mathcal D(\Omega)$ : $S\in\mathcal D'(\Omega)$.` },

      { id: 'r-u', kind: 'definition', local: true, text: t`Soit $T=T_u$ avec $u\in C^{|\alpha|}(\Omega)$.` },
      { id: 'r-ipp', kind: 'egalite', text: t`Pour $\varphi\in\mathcal D(\Omega)$ : $\int_\Omega u\,\partial^\alpha\varphi=(-1)^{|\alpha|}\int_\Omega\partial^\alpha u\,\varphi$.` },
      { id: 'r-coherent', kind: 'egalite', text: t`Pour $T=T_u$ : $S=T_{\partial^\alpha u}$.` },

      { id: 'fin', kind: 'conclusion', text: t`$\partial^\alpha T$, définie par $\langle\partial^\alpha T,\varphi\rangle=(-1)^{|\alpha|}\langle T,\partial^\alpha\varphi\rangle$, est une distribution, qui coïncide avec la dérivée classique pour une fonction assez régulière.` },

      { id: 'x-pp', kind: 'egalite', distractor: true, after: ['r-ipp'], text: t`Si $u$ est seulement dérivable presque partout, on a encore $\partial^\alpha T_u=T_{\partial^\alpha u}$, la dérivée étant prise presque partout.` },
      { id: 'x-borne', kind: 'inegalite', distractor: true, after: ['s-lin'], text: t`$|S(\varphi)|\le\|\varphi\|_\infty$ pour tout $\varphi\in\mathcal D(\Omega)$.` },
    ],
    justifications: [
      { id: 'j-stable', label: t`Une dérivée d'une fonction $C^\infty$ à support compact est $C^\infty$, de support inclus dans celui de la fonction.` },
      { id: 'j-lin', label: t`$\partial^\alpha$ et $T$ sont linéaires ; une composée d'applications linéaires est linéaire.` },
      { id: 'j-der-cont', label: t`Mêmes supports dans $K$, et $\partial^\beta(\partial^\alpha\varphi_n)=\partial^{\alpha+\beta}\varphi_n\to\partial^{\alpha+\beta}\varphi$ uniformément, pour tout $\beta$.` },
      { id: 'j-cont-T', label: t`Continuité de $T$ sur $\mathcal D(\Omega)$, appliquée à la suite $(\partial^\alpha\varphi_n)$.` },
      { id: 'j-def-dist', label: 'Définition d’une distribution : forme linéaire continue sur les fonctions test.' },
      { id: 'j-ipp', label: t`$|\alpha|$ intégrations par parties, une variable à la fois ; les termes de bord sont nuls car $\varphi$ est à support compact dans $\Omega$.` },
      { id: 'j-calc', label: t`$S(\varphi)=(-1)^{|\alpha|}\int_\Omega u\,\partial^\alpha\varphi=(-1)^{2|\alpha|}\int_\Omega\partial^\alpha u\,\varphi$.` },
      { id: 'j-syn', label: 'Réunion des résultats établis.' },
      // Justifications séduisantes mais fausses.
      { id: 'j-unif', label: t`La convergence uniforme de $\varphi_n$ vers $\varphi$ entraîne celle de leurs dérivées.` },
      { id: 'j-thm', label: 'Dérivation distributionnelle (le résultat à établir).', theorem: 'distributions' },
    ],
    rules: [
      { from: ['d-S', 'h-alpha'], to: 's-def', by: 'j-stable' },
      { from: ['s-def', 'h-T'], to: 's-lin', by: 'j-lin' },
      { from: ['c-soit', 'h-alpha'], to: 'c-der', by: 'j-der-cont' },
      { from: ['c-der', 'h-T', 'd-S'], to: 'c-lim', by: 'j-cont-T' },
      { from: ['s-lin', 'c-lim'], to: 's-dist', by: 'j-def-dist' },
      { from: ['r-u', 'd-S'], to: 'r-ipp', by: 'j-ipp' },
      { from: ['r-ipp', 'd-S'], to: 'r-coherent', by: 'j-calc' },
      { from: ['s-dist', 'r-coherent'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-pp',
        verdict: 'incorrect',
        concept: 'distributions-derivee-pp',
        message: 'La dérivée prise presque partout ne voit pas les sauts : l’intégration par parties exige plus de régularité.',
        counterexample: t`Pour $H=\mathbf 1_{]0,+\infty[}$ sur $\mathbb R$ : $H'=0$ presque partout, mais $(T_H)'=\delta_0$.`,
      },
      {
        conclusion: 'x-borne',
        verdict: 'incorrect',
        concept: 'distributions-existence',
        message: t`Rien ne garantit une telle majoration : une distribution peut faire intervenir des dérivées de $\varphi$. La continuité se démontre avec les suites de $\mathcal D(\Omega)$.`,
        counterexample: t`$T=\delta_0$ et $\alpha=1$ en dimension $1$ : $S(\varphi)=-\varphi'(0)$ n'est pas majoré par $\|\varphi\|_\infty$.`,
      },
      {
        conclusion: 'c-der',
        by: 'j-unif',
        verdict: 'incorrect',
        concept: 'distributions-existence',
        message: t`La convergence uniforme ne contrôle pas les dérivées. C'est la définition de la convergence dans $\mathcal D(\Omega)$, qui porte sur toutes les dérivées, qui donne celle de $\partial^\alpha\varphi_n$.`,
        counterexample: t`Avec $\chi\in\mathcal D(\mathbb R)$ égale à $1$ près de $0$ : $\varphi_n(x)=\frac1n\sin(n^2x)\chi(x)\to 0$ uniformément, mais $\varphi_n'(0)=n$.`,
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
        hypothesis: 'r-u',
        label: t`Ne plus supposer $u\in C^{|\alpha|}(\Omega)$`,
        necessary: true,
        explanation: 'L’intégration par parties ne s’applique plus : la dérivée distributionnelle peut différer de la dérivée prise presque partout.',
        counterexample: t`Pour $H=\mathbf 1_{]0,+\infty[}$ : $H'=0$ presque partout, mais $(T_H)'=\delta_0\neq 0$.`,
      },
      {
        hypothesis: 'h-T',
        label: t`Ne plus supposer $T$ continue`,
        necessary: true,
        explanation: 'Sans continuité de T, la forme S n’a aucune raison d’être continue : ce n’est plus une distribution.',
        counterexample: t`Une forme linéaire non continue sur $\mathcal D(\Omega)$ n'est pas une distribution ; la formule ne fournit alors qu'une forme linéaire.`,
      },
    ],
  },
  plan: [
    t`$S$ est bien définie et linéaire.`,
    t`Continuité : si $\varphi_n\to\varphi$ dans $\mathcal D(\Omega)$, alors $\partial^\alpha\varphi_n\to\partial^\alpha\varphi$ dans $\mathcal D(\Omega)$, puis continuité de $T$.`,
    t`Cohérence : pour $u\in C^{|\alpha|}(\Omega)$, intégrations par parties.`,
  ],
  solution: t`**Définition et linéarité.** Si $\varphi\in\mathcal D(\Omega)$, alors $\partial^\alpha\varphi\in\mathcal D(\Omega)$ (même support, toujours $C^\infty$) ; $S$ est linéaire comme composée de $\partial^\alpha$ et de $T$.

**Continuité.** Si $\varphi_n\to\varphi$ dans $\mathcal D(\Omega)$, les supports restent dans un même compact et $\partial^\beta(\partial^\alpha\varphi_n)=\partial^{\alpha+\beta}\varphi_n\to\partial^{\alpha+\beta}\varphi$ uniformément, pour tout $\beta$ : $\partial^\alpha\varphi_n\to\partial^\alpha\varphi$ dans $\mathcal D(\Omega)$. Par continuité de $T$, $S(\varphi_n)\to S(\varphi)$. Donc $S\in\mathcal D'(\Omega)$.

**Cohérence.** Si $u\in C^{|\alpha|}(\Omega)$, $|\alpha|$ intégrations par parties donnent $\int_\Omega u\,\partial^\alpha\varphi=(-1)^{|\alpha|}\int_\Omega\partial^\alpha u\,\varphi$, les termes de bord étant nuls car $\varphi$ est à support compact dans $\Omega$. Donc $S=T_{\partial^\alpha u}$.`,
  verification: FROM_POLY,
};

export default demonstration;
