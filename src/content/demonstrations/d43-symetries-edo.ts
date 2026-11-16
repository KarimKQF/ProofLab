/**
 * Démonstration du résultat 43 pour une EDO du premier ordre : en coordonnées canoniques,
 * le groupe de symétries agit par translations en s, l'équation ne dépend plus de s, et se
 * résout par une quadrature. Le cas de l'ordre n (baisse d'une unité) suit le même principe.
 */
import { t, COMPLEMENT } from '@/content/authoring';
import type { Demonstration } from '@/content/schema';

const demonstration: Demonstration = {
  id: 'symetries-edo.demonstration',
  theoremId: 'symetries-edo',
  title: 'Réduire une EDO grâce à un groupe de symétries',
  statement: t`Soit $X=\xi\partial_x+\eta\partial_u$ le générateur d'un groupe local à un paramètre de symétries de l'EDO $u'=f(x,u)$, et $(r,s)$ des coordonnées canoniques : $X(r)=0$, $X(s)=1$. Démontrer que, dans ces coordonnées, le groupe agit par $(r,s)\mapsto(r,s+\varepsilon)$, que l'équation s'écrit $\frac{ds}{dr}=G(r)$, et qu'elle se résout par une quadrature.`,
  scope: 'partie',
  scopeNote: t`Le cas d'une équation du premier ordre, qui se résout par quadrature. Pour une équation d'ordre $n$, le même argument fait disparaître $s$, et l'ordre baisse d'une unité.`,
  source: { doc: 'cours-lie', pdfPage: 148, label: '§ 39–42 : symétries de Lie et coordonnées canoniques (plan détaillé pour ProofLab)' },
  prerequisites: ['theoreme-fondamental'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-sym', kind: 'hypothese', text: t`Le flot de $X$ envoie graphes solutions sur graphes solutions.` },
      { id: 'h-can', kind: 'hypothese', text: t`$(r,s)$ sont des coordonnées canoniques près d'un point où $X\neq 0$ : $X(r)=0$ et $X(s)=1$.` },

      { id: 'flot', kind: 'egalite', text: t`Dans les coordonnées $(r,s)$, $X=\partial_s$ : le flot est $(r,s)\mapsto(r,s+\varepsilon)$.` },
      { id: 'eq', kind: 'egalite', text: t`Localement, là où les solutions ne sont pas tangentes aux orbites, l'équation s'écrit $\frac{ds}{dr}=G(r,s)$.` },
      { id: 'invariance', kind: 'egalite', text: t`$G(r,s+\varepsilon)=G(r,s)$ pour tout $\varepsilon$ : $G$ ne dépend pas de $s$.` },
      { id: 'reduite', kind: 'egalite', text: t`L'équation s'écrit $\frac{ds}{dr}=G(r)$.` },
      { id: 'quadrature', kind: 'egalite', text: t`Ses solutions sont $s(r)=\int^{r}G(\rho)\,d\rho+C$.` },

      { id: 'fin', kind: 'conclusion', text: t`En coordonnées canoniques, le groupe agit par translations en $s$, l'équation invariante devient $\frac{ds}{dr}=G(r)$, et se résout par une quadrature.` },

      { id: 'x-fixe', kind: 'consequence', distractor: true, after: ['flot'], text: t`Le flot de $X$ envoie chaque solution sur elle-même.` },
      { id: 'x-r', kind: 'egalite', distractor: true, after: ['eq'], text: t`$G$ ne dépend pas de $r$.` },
    ],
    justifications: [
      { id: 'j-coord', label: t`En coordonnées $(r,s)$ : $X=X(r)\,\partial_r+X(s)\,\partial_s=\partial_s$.` },
      { id: 'j-chgt', label: t`Changement de variables : un graphe $u=u(x)$ devient localement un graphe $s=s(r)$.` },
      { id: 'j-translat', label: t`Si $s(r)$ est solution, $s(r)+\varepsilon$ l'est aussi : $G(r,s(r)+\varepsilon)=G(r,s(r))$, et par tout point passe une solution.` },
      { id: 'j-subst', label: 'Substitution.' },
      { id: 'j-tfci', label: 'Théorème fondamental du calcul intégral.', theorem: 'theoreme-fondamental' },
      { id: 'j-syn', label: 'Réunion des résultats établis.' },
      // Justifications séduisantes mais fausses.
      { id: 'j-toute', label: t`Toute équation $\frac{ds}{dr}=G(r,s)$ est invariante par les translations en $s$.` },
      { id: 'j-thm', label: 'Symétries de Lie et réduction d’une EDO.', theorem: 'symetries-edo' },
    ],
    rules: [
      { from: ['h-can'], to: 'flot', by: 'j-coord' },
      { from: ['h-can'], to: 'eq', by: 'j-chgt' },
      { from: ['flot', 'eq', 'h-sym'], to: 'invariance', by: 'j-translat' },
      { from: ['invariance', 'eq'], to: 'reduite', by: 'j-subst' },
      { from: ['reduite'], to: 'quadrature', by: 'j-tfci' },
      { from: ['flot', 'reduite', 'quadrature'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-fixe',
        verdict: 'incorrect',
        concept: 'lie-symetrie-prolongee',
        message: t`Une symétrie envoie les solutions sur des solutions, en général sur d'autres : les translations en $s$ décalent la solution $s(r)$ en $s(r)+\varepsilon$.`,
        counterexample: t`Pour $u'=u$ et $X=u\,\partial_u$ (dilatations), la solution $e^x$ est envoyée sur $e^{\varepsilon}e^x$, une autre solution.`,
      },
      {
        conclusion: 'x-r',
        verdict: 'incorrect',
        concept: 'lie-symetrie-prolongee',
        message: t`C'est la variable $s$, le long des orbites, qui disparaît : $r$ est l'invariant du groupe, et $G$ en dépend en général.`,
        counterexample: t`Pour $X=\partial_u$ (translations en $u$), $r=x$ et $s=u$ : l'équation invariante $u'=x$ s'écrit $\frac{ds}{dr}=r$.`,
      },
      {
        conclusion: 'invariance',
        by: 'j-toute',
        verdict: 'incorrect',
        concept: 'lie-symetrie-prolongee',
        message: t`Les translations en $s$ ne sont des symétries que parce que $X$ en est une : c'est l'hypothèse de symétrie qui fait disparaître $s$.`,
        counterexample: t`$\frac{ds}{dr}=s$ n'est pas invariante par $s\mapsto s+\varepsilon$ : $e^{r}$ est solution, $e^{r}+1$ non.`,
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
        hypothesis: 'h-sym',
        label: t`Ne plus supposer que $X$ engendre des symétries`,
        necessary: true,
        explanation: t`Sans symétrie, $s$ ne disparaît pas de l'équation et la quadrature n'est plus possible.`,
        counterexample: t`$\frac{ds}{dr}=s$, dans les coordonnées $(r,s)$ de $X=\partial_s$, dépend de $s$.`,
      },
    ],
  },
  plan: [
    t`En coordonnées canoniques, $X=\partial_s$ : le flot translate $s$.`,
    t`Écrire l'équation sous la forme $\frac{ds}{dr}=G(r,s)$.`,
    t`Les translations en $s$ envoient solutions sur solutions : $G$ ne dépend pas de $s$.`,
    'Intégrer : une quadrature.',
  ],
  solution: t`En coordonnées $(r,s)$, $X=X(r)\partial_r+X(s)\partial_s=\partial_s$ : le flot est $(r,s)\mapsto(r,s+\varepsilon)$. Là où les solutions sont transverses aux orbites, l'équation s'écrit $\frac{ds}{dr}=G(r,s)$.

Si $s(r)$ est solution, son image $s(r)+\varepsilon$ l'est aussi, puisque le flot est un groupe de symétries : $G(r,s(r))=\frac{ds}{dr}=G(r,s(r)+\varepsilon)$. Par tout point passe une solution, donc $G(r,s+\varepsilon)=G(r,s)$ : $G$ ne dépend que de $r$. L'équation $\frac{ds}{dr}=G(r)$ s'intègre : $s(r)=\int^rG(\rho)\,d\rho+C$.`,
  verification: { ...COMPLEMENT, notes: 'Plan du cours (coordonnées canoniques), détaillé pour ProofLab dans le cas du premier ordre.' },
};

export default demonstration;
