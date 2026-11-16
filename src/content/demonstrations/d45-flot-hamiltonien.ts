/**
 * Démonstration du résultat 45 (flot continu) : équations de Hamilton, crochet de Poisson,
 * conservation de H et préservation de ω par la formule de Cartan. L'intégration
 * symplectique (schémas discrets) est travaillée dans les exercices et le laboratoire G.
 */
import { t, FROM_LIE } from '@/content/authoring';
import type { Demonstration } from '@/content/schema';

const demonstration: Demonstration = {
  id: 'flot-hamiltonien.demonstration',
  theoremId: 'flot-hamiltonien',
  title: 'Le flot hamiltonien conserve H et préserve ω',
  statement: t`Sur $\mathbb R^{2n}$ muni de $\omega=\sum_idq_i\wedge dp_i$, soit $H$ lisse et $X_H$ défini par $\iota_{X_H}\omega=dH$. Démontrer que les courbes intégrales de $X_H$ vérifient $q_i'=\partial_{p_i}H$ et $p_i'=-\partial_{q_i}H$, que $\frac{d}{dt}f(\gamma(t))=\{f,H\}$ pour toute $f$ lisse, que $H$ est conservée, et que $\mathcal L_{X_H}\omega=0$.`,
  scope: 'partie',
  scopeNote: t`Le flot continu. La préservation de $\omega$ par des schémas discrets (intégration symplectique) est travaillée dans les exercices et le laboratoire G.`,
  source: { doc: 'cours-lie', pdfPage: 199, label: '§ 56 : flots hamiltoniens (démonstration du cours)' },
  prerequisites: ['formule-cartan'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-conv', kind: 'hypothese', text: t`$\omega=\sum_idq_i\wedge dp_i$, et $X_H$ est défini par $\iota_{X_H}\omega=dH$.` },
      { id: 'h-H', kind: 'hypothese', text: t`$H$ est lisse sur $\mathbb R^{2n}$.` },

      { id: 'calc', kind: 'egalite', text: t`Pour $X=\sum_i(A_i\partial_{q_i}+B_i\partial_{p_i})$ : $\iota_X\omega=\sum_i(A_i\,dp_i-B_i\,dq_i)$.` },
      { id: 'ham', kind: 'egalite', text: t`$X_H=\sum_i\big(\partial_{p_i}H\,\partial_{q_i}-\partial_{q_i}H\,\partial_{p_i}\big)$ : les courbes intégrales vérifient $q_i'=\partial_{p_i}H$, $p_i'=-\partial_{q_i}H$.` },
      { id: 'pb', kind: 'egalite', text: t`Pour $f$ lisse et $\gamma$ courbe intégrale : $\frac{d}{dt}f(\gamma(t))=df(X_H)=\{f,H\}$, où $\{f,H\}=\sum_i\big(\partial_{q_i}f\,\partial_{p_i}H-\partial_{p_i}f\,\partial_{q_i}H\big)$.` },
      { id: 'conserv', kind: 'egalite', text: t`$\{H,H\}=0$ : $H$ est constante le long des courbes intégrales.` },
      { id: 'dw', kind: 'egalite', text: t`$d\omega=0$.` },
      { id: 'cartan', kind: 'egalite', text: t`$\mathcal L_{X_H}\omega=d\iota_{X_H}\omega+\iota_{X_H}d\omega=d(dH)+0=0$.` },

      { id: 'fin', kind: 'conclusion', text: t`Les équations de Hamilton, $\frac{d}{dt}f(\gamma)=\{f,H\}$, la conservation de $H$ et $\mathcal L_{X_H}\omega=0$ sont établies : le flot de $X_H$ préserve $\omega$.` },

      { id: 'x-signe', kind: 'egalite', distractor: true, after: ['calc'], text: t`Les courbes intégrales vérifient $q_i'=-\partial_{p_i}H$ et $p_i'=\partial_{q_i}H$.` },
      { id: 'x-euler', kind: 'consequence', distractor: true, after: ['cartan'], text: t`Le schéma d'Euler explicite préserve aussi $\omega$.` },
    ],
    justifications: [
      { id: 'j-contraction', label: t`$\iota_X(dq\wedge dp)=dq(X)\,dp-dp(X)\,dq$.` },
      { id: 'j-identifier', label: t`Identifier les coefficients de $dq_i$ et $dp_i$ avec ceux de $dH=\sum_i(\partial_{q_i}H\,dq_i+\partial_{p_i}H\,dp_i)$.` },
      { id: 'j-chaine', label: t`Règle de chaîne le long de $\gamma'=X_H(\gamma)$.` },
      { id: 'j-antisym', label: 'Antisymétrie du crochet de Poisson.' },
      { id: 'j-exacte', label: t`$\omega=d\big(\sum_iq_i\,dp_i\big)$ est exacte, donc fermée.` },
      { id: 'j-cartan', label: 'Formule de Cartan pour la dérivée de Lie, et d ∘ d = 0.', theorem: 'formule-cartan' },
      { id: 'j-syn', label: 'Réunion des résultats établis.' },
      // Justifications séduisantes mais fausses.
      { id: 'j-tout', label: 'Toute fonction lisse est constante le long des courbes intégrales de X_H.' },
      { id: 'j-thm', label: 'Flots hamiltoniens et intégration symplectique.', theorem: 'flot-hamiltonien' },
    ],
    rules: [
      { from: ['h-conv'], to: 'calc', by: 'j-contraction' },
      { from: ['calc', 'h-conv', 'h-H'], to: 'ham', by: 'j-identifier' },
      { from: ['ham'], to: 'pb', by: 'j-chaine' },
      { from: ['pb'], to: 'conserv', by: 'j-antisym' },
      { from: ['h-conv'], to: 'dw', by: 'j-exacte' },
      { from: ['dw', 'h-conv'], to: 'cartan', by: 'j-cartan' },
      { from: ['ham', 'pb', 'conserv', 'cartan'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-signe',
        verdict: 'incorrect',
        concept: 'lie-symplectique',
        message: t`Avec $\iota_{X_H}\omega=dH$ et $\omega=\sum dq_i\wedge dp_i$, le coefficient de $dp_i$ dans $\iota_X\omega$ est $A_i=q_i'$ : il vaut $\partial_{p_i}H$.`,
        counterexample: t`Pour $H=\frac12(q^2+p^2)$ : $X_H=p\,\partial_q-q\,\partial_p$ et $\iota_{X_H}(dq\wedge dp)=p\,dp+q\,dq=dH$ ; le champ opposé donne $-dH$.`,
      },
      {
        conclusion: 'x-euler',
        verdict: 'incorrect',
        concept: 'lie-symplectique',
        message: t`Préserver $\omega$ est une propriété du flot exact ; un schéma précis peut ne pas la préserver.`,
        counterexample: t`Pour $H=\frac12(q^2+p^2)$, Euler explicite $(q,p)\mapsto(q+hp,\ p-hq)$ a un jacobien de déterminant $1+h^2\neq 1$.`,
      },
      {
        conclusion: 'conserv',
        by: 'j-tout',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Seules les fonctions en involution avec $H$, $\{f,H\}=0$, sont conservées. Pour $H$ lui-même, c'est l'antisymétrie du crochet.`,
        counterexample: t`Pour $H=\frac12(q^2+p^2)$, $f=q$ vérifie $\frac{d}{dt}q=p$, non nul en général.`,
      },
      {
        conclusion: 'fin',
        by: 'j-thm',
        verdict: 'incorrect',
        concept: 'circularite',
        message: 'C’est le résultat à démontrer : l’invoquer rend la preuve circulaire.',
      },
    ],
    removable: [],
  },
  plan: [
    t`Contracter $\omega$ avec un champ quelconque, puis identifier avec $dH$ : les équations de Hamilton.`,
    t`Dériver $f$ le long d'une courbe intégrale : le crochet de Poisson ; $\{H,H\}=0$.`,
    t`Formule de Cartan : $\mathcal L_{X_H}\omega=d(dH)+\iota_{X_H}d\omega=0$.`,
  ],
  solution: t`Pour $X=\sum_i(A_i\partial_{q_i}+B_i\partial_{p_i})$, $\iota_X\omega=\sum_i(A_i\,dp_i-B_i\,dq_i)$. L'égalité avec $dH=\sum_i(\partial_{q_i}H\,dq_i+\partial_{p_i}H\,dp_i)$ impose $A_i=\partial_{p_i}H$ et $B_i=-\partial_{q_i}H$ : ce sont les équations de Hamilton.

Le long d'une courbe intégrale, la règle de chaîne donne $\frac{d}{dt}f(\gamma)=df(X_H)=\sum_i(\partial_{q_i}f\,\partial_{p_i}H-\partial_{p_i}f\,\partial_{q_i}H)=\{f,H\}$, et $\{H,H\}=0$ par antisymétrie : $H$ est conservée.

Enfin $\omega=d(\sum_iq_i\,dp_i)$ est fermée, et la formule de Cartan donne $\mathcal L_{X_H}\omega=d\iota_{X_H}\omega+\iota_{X_H}d\omega=d(dH)=0$ : le flot préserve $\omega$.`,
  verification: FROM_LIE,
};

export default demonstration;
