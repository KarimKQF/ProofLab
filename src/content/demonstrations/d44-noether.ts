/**
 * Démonstration du résultat 44 — théorème de Noether, selon le calcul du cours : règle de
 * chaîne, Leibniz, puis équations d'Euler–Lagrange.
 */
import { t, FROM_LIE } from '@/content/authoring';
import type { Demonstration } from '@/content/schema';

const demonstration: Demonstration = {
  id: 'noether.demonstration',
  theoremId: 'noether',
  title: 'Démontrer le théorème de Noether',
  statement: t`Soit $L(t,q,q')$ un lagrangien de classe $C^2$, $\eta(t,q)$ un champ et $B(t,q)$ une fonction tels que, avec $q_\varepsilon=q+\varepsilon\eta(t,q)$, $\frac{d}{d\varepsilon}\big|_{\varepsilon=0}L(t,q_\varepsilon,q_\varepsilon')=\frac{dB}{dt}$ le long de toute courbe. Démontrer que $I=p_i\eta^i-B$, où $p_i=\frac{\partial L}{\partial q'^i}$, est constante le long de toute solution des équations d'Euler–Lagrange.`,
  scope: 'complete',
  source: { doc: 'cours-lie', pdfPage: 188, label: '§ 53 : théorème de Noether et sa démonstration' },
  prerequisites: [],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-reg', kind: 'hypothese', text: t`$L$ est de classe $C^2$, et les courbes $q$ considérées sont de classe $C^2$.` },
      { id: 'h-sym', kind: 'hypothese', text: t`Symétrie variationnelle : $\frac{d}{d\varepsilon}\big|_{\varepsilon=0}L(t,q_\varepsilon,q_\varepsilon')=\frac{dB}{dt}$, avec $q_\varepsilon=q+\varepsilon\eta(t,q)$.` },
      { id: 'h-EL', kind: 'hypothese', text: t`$q$ est solution d'Euler–Lagrange : $\frac{dp_i}{dt}=\frac{\partial L}{\partial q^i}$.` },

      { id: 'chaine', kind: 'egalite', text: t`$\frac{d}{d\varepsilon}\big|_{\varepsilon=0}L(t,q_\varepsilon,q_\varepsilon')=\frac{\partial L}{\partial q^i}\eta^i+p_i\frac{d\eta^i}{dt}$.` },
      { id: 'leibniz', kind: 'egalite', text: t`$p_i\frac{d\eta^i}{dt}=\frac{d}{dt}\big(p_i\eta^i\big)-\frac{dp_i}{dt}\eta^i$.` },
      { id: 'regroup', kind: 'egalite', text: t`$\frac{dB}{dt}=\Big(\frac{\partial L}{\partial q^i}-\frac{dp_i}{dt}\Big)\eta^i+\frac{d}{dt}\big(p_i\eta^i\big)$.` },
      { id: 'annul', kind: 'egalite', text: t`Le long d'une solution d'Euler–Lagrange : $\frac{dB}{dt}=\frac{d}{dt}\big(p_i\eta^i\big)$.` },

      { id: 'fin', kind: 'conclusion', text: t`$\frac{d}{dt}\big(p_i\eta^i-B\big)=0$ : $I$ est constante le long de toute solution.` },

      { id: 'x-toute', kind: 'consequence', distractor: true, after: ['regroup'], text: t`$I$ est constante le long de toute courbe $q$, solution ou non.` },
      { id: 'x-equations', kind: 'consequence', distractor: true, after: ['chaine'], text: t`Toute transformation qui envoie solutions sur solutions fournit, par cette formule, une quantité conservée.` },
    ],
    justifications: [
      { id: 'j-chaine', label: t`Règle de chaîne : $\partial_\varepsilon q_\varepsilon=\eta$ et $\partial_\varepsilon q_\varepsilon'=\frac{d\eta}{dt}$, dérivée totale de $t\mapsto\eta(t,q(t))$.` },
      { id: 'j-leibniz', label: 'Règle de Leibniz pour la dérivée d’un produit.' },
      { id: 'j-subst', label: 'Substitution dans l’hypothèse de symétrie.' },
      { id: 'j-EL', label: 'Le premier terme est nul par les équations d’Euler–Lagrange.' },
      { id: 'j-derivee-nulle', label: 'Une fonction de dérivée nulle sur un intervalle est constante.' },
      // Justifications séduisantes mais fausses.
      { id: 'j-partielle', label: t`$\partial_\varepsilon q_\varepsilon'=\partial_t\eta$.` },
      { id: 'j-thm', label: 'Théorème de Noether.', theorem: 'noether' },
    ],
    rules: [
      { from: ['h-reg'], to: 'chaine', by: 'j-chaine' },
      { from: ['h-reg'], to: 'leibniz', by: 'j-leibniz' },
      { from: ['h-sym', 'chaine', 'leibniz'], to: 'regroup', by: 'j-subst' },
      { from: ['regroup', 'h-EL'], to: 'annul', by: 'j-EL' },
      { from: ['annul'], to: 'fin', by: 'j-derivee-nulle' },
    ],
    traps: [
      {
        conclusion: 'x-toute',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: 'La conservation utilise les équations d’Euler–Lagrange : hors des solutions, le premier terme ne s’annule pas.',
        counterexample: t`Pour $L=\frac12q'^2$, $\eta=1$ et $B=0$ : $I=q'$, constante seulement le long des solutions $q''=0$ ; pour $q(t)=t^2$, $I=2t$.`,
      },
      {
        conclusion: 'x-equations',
        verdict: 'incorrect',
        concept: 'lie-noether-variationnelle',
        message: 'La formule demande une symétrie du lagrangien, à une dérivée totale près ; une symétrie des seules équations ne suffit pas.',
        counterexample: t`Pour $L=\frac12q'^2$, les dilatations $q_\varepsilon=e^{\varepsilon}q$ ($\eta=q$) envoient solutions sur solutions, mais $\frac{d}{d\varepsilon}\big|_0L=q'^2$ n'est pas une dérivée totale, et $qq'$ n'est pas conservée : $\frac{d}{dt}(qq')=q'^2$ le long d'une solution.`,
      },
      {
        conclusion: 'chaine',
        by: 'j-partielle',
        verdict: 'incorrect',
        concept: 'lie-symetrie-prolongee',
        message: t`La dérivée de $q_\varepsilon'$ en $\varepsilon$ est la dérivée totale $\frac{d\eta}{dt}=\partial_t\eta+\partial_q\eta\,q'$, pas la seule dérivée partielle en $t$.`,
        counterexample: t`Pour $\eta(t,q)=q$ : $q_\varepsilon'=(1+\varepsilon)q'$, de dérivée $q'$ en $\varepsilon$, alors que $\partial_t\eta=0$.`,
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
        hypothesis: 'h-EL',
        label: 'Ne plus supposer q solution d’Euler–Lagrange',
        necessary: true,
        explanation: 'Le premier terme ne s’annule plus : la quantité n’est conservée que le long des solutions.',
        counterexample: t`Pour $L=\frac12q'^2$, $\eta=1$ : $I=q'$ varie le long de $q(t)=t^2$.`,
      },
      {
        hypothesis: 'h-sym',
        label: 'Ne plus supposer la symétrie variationnelle',
        necessary: true,
        explanation: 'Sans elle, rien ne relie la variation du lagrangien à une dérivée totale.',
        counterexample: t`Pour $L=\frac12q'^2$ et $\eta=q$ (dilatations), $qq'$ n'est pas conservée.`,
      },
    ],
  },
  plan: [
    'Dériver le lagrangien le long de la famille q_ε, par la règle de chaîne.',
    t`Faire apparaître $\frac{d}{dt}(p_i\eta^i)$ par Leibniz.`,
    'Le terme restant est nul le long d’une solution d’Euler–Lagrange.',
  ],
  solution: t`Par la règle de chaîne, $\frac{d}{d\varepsilon}\big|_0L(t,q_\varepsilon,q_\varepsilon')=\frac{\partial L}{\partial q^i}\eta^i+p_i\frac{d\eta^i}{dt}$, où $\frac{d\eta^i}{dt}$ est la dérivée totale de $t\mapsto\eta^i(t,q(t))$. Par Leibniz, $p_i\frac{d\eta^i}{dt}=\frac{d}{dt}(p_i\eta^i)-\frac{dp_i}{dt}\eta^i$. L'hypothèse de symétrie donne donc
$$\frac{dB}{dt}=\Big(\frac{\partial L}{\partial q^i}-\frac{dp_i}{dt}\Big)\eta^i+\frac{d}{dt}(p_i\eta^i).$$
Le long d'une solution d'Euler–Lagrange, le premier terme est nul : $\frac{d}{dt}(p_i\eta^i-B)=0$.`,
  verification: FROM_LIE,
};

export default demonstration;
