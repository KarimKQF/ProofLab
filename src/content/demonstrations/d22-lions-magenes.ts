/**
 * Démonstration du cœur du résultat 22 (Lions–Magenes) : pour une fonction régulière en
 * temps, l'identité d/dt |u|² = 2<u',u> et l'estimation de sup_t |u(t)|_H. Le passage au
 * cas général se fait par régularisation, l'estimation rendant la suite régularisée de
 * Cauchy dans C([0,T];H).
 */
import { t, COMPLEMENT } from '@/content/authoring';
import type { Demonstration } from '@/content/schema';

const demonstration: Demonstration = {
  id: 'lions-magenes.demonstration',
  theoremId: 'lions-magenes',
  title: 'L’identité de Lions–Magenes et son estimation',
  statement: t`Soit $V\hookrightarrow H\simeq H'\hookrightarrow V'$ un triplet de Hilbert, avec $\|v\|_H\le c\|v\|_V$ pour $v\in V$, et $u\in C^1([0,T];V)$. Démontrer que $\frac{d}{dt}\|u(t)\|_H^2=2\langle u'(t),u(t)\rangle_{V',V}$, puis que
$$\sup_{t\in[0,T]}\|u(t)\|_H^2\le\Big(\frac{c^2}{T}+1\Big)\|u\|_{L^2(0,T;V)}^2+\|u'\|_{L^2(0,T;V')}^2.$$`,
  scope: 'partie',
  scopeNote: t`Le cœur de la preuve : l'identité et l'estimation pour une fonction régulière. Pour $u\in L^2(0,T;V)$ avec $u'\in L^2(0,T;V')$, on régularise en temps ; l'estimation appliquée à $u_\varepsilon-u_\eta$ rend $(u_\varepsilon)$ de Cauchy dans $C([0,T];H)$.`,
  source: { doc: 'polycopie', pdfPage: 21, label: 'Section 5.4 : idée de la démonstration, étapes 2 et 3' },
  prerequisites: ['theoreme-fondamental', 'cauchy-schwarz', 'young'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-triplet', kind: 'hypothese', text: t`$V\hookrightarrow H\simeq H'\hookrightarrow V'$ : $\|v\|_H\le c\|v\|_V$ pour $v\in V$, et $\langle h,v\rangle_{V',V}=(h,v)_H$ pour $h\in H$ et $v\in V$.` },
      { id: 'h-u', kind: 'hypothese', text: t`$u\in C^1([0,T];V)$.` },

      { id: 'd-deriv', kind: 'egalite', text: t`$\frac{d}{dt}\|u(t)\|_H^2=2\big(u'(t),u(t)\big)_H$.` },
      { id: 'd-dual', kind: 'egalite', text: t`$\big(u'(t),u(t)\big)_H=\langle u'(t),u(t)\rangle_{V',V}$.` },
      { id: 'ident', kind: 'egalite', text: t`$\frac{d}{dt}\|u(t)\|_H^2=2\langle u'(t),u(t)\rangle_{V',V}$.` },
      { id: 'integ', kind: 'egalite', text: t`Pour $s,t\in[0,T]$ : $\|u(t)\|_H^2=\|u(s)\|_H^2+2\int_s^t\langle u',u\rangle_{V',V}$.` },
      { id: 'majo', kind: 'inegalite', text: t`Pour $s,t\in[0,T]$ : $\|u(t)\|_H^2\le\|u(s)\|_H^2+2\|u'\|_{L^2(0,T;V')}\|u\|_{L^2(0,T;V)}$.` },
      { id: 'moy', kind: 'inegalite', text: t`$\|u(t)\|_H^2\le\frac1T\int_0^T\|u(s)\|_H^2\,ds+2\|u'\|_{L^2(0,T;V')}\|u\|_{L^2(0,T;V)}$.` },
      { id: 'injec', kind: 'inegalite', text: t`$\frac1T\int_0^T\|u(s)\|_H^2\,ds\le\frac{c^2}{T}\|u\|_{L^2(0,T;V)}^2$.` },

      { id: 'fin', kind: 'conclusion', text: t`$\frac{d}{dt}\|u\|_H^2=2\langle u',u\rangle_{V',V}$, et $\sup_t\|u(t)\|_H^2\le\big(\frac{c^2}{T}+1\big)\|u\|_{L^2(0,T;V)}^2+\|u'\|_{L^2(0,T;V')}^2$.` },

      { id: 'x-sans-moy', kind: 'inegalite', distractor: true, after: ['majo'], text: t`$\|u(t)\|_H^2\le 2\|u'\|_{L^2(0,T;V')}\|u\|_{L^2(0,T;V)}$ pour tout $t$.` },
      { id: 'x-produit', kind: 'egalite', distractor: true, after: ['ident'], text: t`$\langle u'(t),u(t)\rangle_{V',V}=\|u'(t)\|_{V'}\,\|u(t)\|_V$.` },
    ],
    justifications: [
      { id: 'j-deriv-ps', label: t`Dérivée d'un produit scalaire : $t\mapsto u(t)$ est $C^1$ à valeurs dans $H$, car $V\hookrightarrow H$ est continue.` },
      { id: 'j-identif', label: t`$u'(t)\in V\subset H$, et la dualité $\langle\cdot,\cdot\rangle_{V',V}$ prolonge le produit scalaire de $H$.` },
      { id: 'j-subst', label: 'Substitution.' },
      { id: 'j-tfci', label: 'Théorème fondamental du calcul intégral, entre s et t.', theorem: 'theoreme-fondamental' },
      { id: 'j-cs-dual', label: t`$|\langle u',u\rangle_{V',V}|\le\|u'\|_{V'}\|u\|_V$, puis inégalité de Cauchy–Schwarz en temps sur $[0,T]$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-moyenne', label: t`Moyenne en $s$ sur $[0,T]$ de l'inégalité, valable pour tout $s$.` },
      { id: 'j-injection', label: t`$\|u(s)\|_H\le c\|u(s)\|_V$ pour tout $s$.` },
      { id: 'j-young', label: t`Inégalité de Young $2ab\le a^2+b^2$, puis borne supérieure en $t$.`, theorem: 'young' },
      // Justifications séduisantes mais fausses.
      { id: 'j-normes', label: t`Les normes de $V'$ et de $H$ coïncident sur $H$.` },
      { id: 'j-thm', label: 'Théorème de Lions–Magenes.', theorem: 'lions-magenes' },
    ],
    rules: [
      { from: ['h-u', 'h-triplet'], to: 'd-deriv', by: 'j-deriv-ps' },
      { from: ['h-u', 'h-triplet'], to: 'd-dual', by: 'j-identif' },
      { from: ['d-deriv', 'd-dual'], to: 'ident', by: 'j-subst' },
      { from: ['ident'], to: 'integ', by: 'j-tfci' },
      { from: ['integ'], to: 'majo', by: 'j-cs-dual' },
      { from: ['majo'], to: 'moy', by: 'j-moyenne' },
      { from: ['h-triplet'], to: 'injec', by: 'j-injection' },
      { from: ['ident', 'moy', 'injec'], to: 'fin', by: 'j-young' },
    ],
    traps: [
      {
        conclusion: 'x-sans-moy',
        verdict: 'incorrect',
        concept: 'valeur-initiale',
        message: t`Il manque la valeur en un instant : la dérivée seule ne contrôle pas une constante. On contrôle $\|u(s)\|_H^2$ en moyenne, grâce à $\|u\|_{L^2(0,T;H)}$.`,
        counterexample: t`$u(t)=v_0\neq 0$ constante : le membre de droite est nul, alors que $\|u(t)\|_H^2=\|v_0\|_H^2>0$.`,
      },
      {
        conclusion: 'x-produit',
        verdict: 'incorrect',
        concept: 'lions-magenes-crochet',
        message: 'Le crochet de dualité n’est que majoré par le produit des normes : il peut être nul, ou négatif.',
        counterexample: t`$u(t)=e^{-t}v_0$ avec $v_0\in V$ non nul : $\langle u'(t),u(t)\rangle_{V',V}=-e^{-2t}\|v_0\|_H^2<0$.`,
      },
      {
        conclusion: 'd-dual',
        by: 'j-normes',
        verdict: 'incorrect',
        concept: 'dual-identification',
        message: t`Sur $H$, la norme de $V'$ est plus faible que celle de $H$ : ce qui coïncide, c'est la dualité et le produit scalaire, pas les normes.`,
        counterexample: t`Pour $V=H^1_0(]0,1[)$ et $H=L^2(]0,1[)$ : $\|\sin(n\pi x)\|_{H^{-1}}\to 0$, alors que $\|\sin(n\pi x)\|_{L^2}=1/\sqrt2$.`,
      },
      {
        conclusion: 'fin',
        by: 'j-thm',
        verdict: 'incorrect',
        concept: 'circularite',
        message: 'C’est le résultat dont on démontre ici le cœur : l’invoquer rend la preuve circulaire.',
      },
    ],
    removable: [
      {
        hypothesis: 'h-u',
        label: t`Ne plus supposer $u$ régulière en temps`,
        necessary: true,
        explanation: t`La dérivée de $\|u\|_H^2$ n'a plus de sens ponctuel : c'est tout l'objet du passage par régularisation, et de l'hypothèse $u'\in L^2(0,T;V')$.`,
        counterexample: t`$u=\mathbf 1_{[T/2,T]}\,v_0$ est dans $L^2(0,T;V)$, mais sa dérivée $\delta_{T/2}\,v_0$ n'est pas dans $L^2(0,T;V')$, et $\|u(t)\|_H^2$ saute en $T/2$.`,
      },
    ],
  },
  plan: [
    t`Dériver $\|u(t)\|_H^2$, puis identifier le produit scalaire de $H$ et la dualité $V',V$.`,
    t`Intégrer entre $s$ et $t$, majorer par Cauchy–Schwarz.`,
    t`Moyenner en $s$ pour contrôler $\|u(s)\|_H^2$, puis l'injection $V\hookrightarrow H$ et l'inégalité de Young.`,
  ],
  solution: t`Comme $u\in C^1([0,T];V)$ et $V\hookrightarrow H$ est continue, $t\mapsto\|u(t)\|_H^2$ est dérivable, de dérivée $2(u'(t),u(t))_H=2\langle u'(t),u(t)\rangle_{V',V}$, la dualité prolongeant le produit scalaire de $H$.

En intégrant entre $s$ et $t$ : $\|u(t)\|_H^2=\|u(s)\|_H^2+2\int_s^t\langle u',u\rangle$, donc, par Cauchy–Schwarz pour la dualité puis en temps, $\|u(t)\|_H^2\le\|u(s)\|_H^2+2\|u'\|_{L^2(V')}\|u\|_{L^2(V)}$ pour tous $s,t$. En moyennant en $s$ sur $[0,T]$ :
$$\|u(t)\|_H^2\le\frac1T\int_0^T\|u(s)\|_H^2\,ds+2\|u'\|_{L^2(V')}\|u\|_{L^2(V)}\le\frac{c^2}{T}\|u\|_{L^2(V)}^2+\|u'\|_{L^2(V')}^2+\|u\|_{L^2(V)}^2,$$
par $\|u(s)\|_H\le c\|u(s)\|_V$ et $2ab\le a^2+b^2$.`,
  verification: { ...COMPLEMENT, notes: 'Étapes 2 et 3 du plan de la fiche, démontrées pour une fonction régulière.' },
};

export default demonstration;
