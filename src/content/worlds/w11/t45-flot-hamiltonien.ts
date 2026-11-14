/**
 * Résultat 45 — Flots hamiltoniens et intégration symplectique (cours de géométrie de Lie,
 * § 56 et § 59, p. PDF 197–207). Convention du cours : ω = dq ∧ dp, ι_{X_H}ω = dH, d'où
 * q′ = ∂H/∂p, p′ = −∂H/∂q ; d/dt f(γ) = {f, H} ; le flot préserve H et ω (Cartan), donc
 * le volume (Liouville). Discret : Euler explicite n'est pas symplectique, Euler
 * symplectique l'est (déterminant 1 en dimension 2).
 */
import { t, rubric, lie, FROM_LIE, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'flot-hamiltonien.facile',
  theoremId: 'flot-hamiltonien',
  level: 'facile',
  title: t`Champ hamiltonien de $H=\frac12(q^2+p^2)$`,
  statement: t`Avec $\omega=dq\wedge dp$ et $\iota_{X_H}\omega=dH$, calculer $X_H$ pour $H(q,p)=\frac12(q^2+p^2)$, vérifier que $H$ est constante le long du flot, expliciter ce flot, et donner $X_H(1,2)$.`,
  source: lie(198, 'Exemple : niveaux quadratiques, § 56.2'),
  prerequisites: [],
  concepts: ['lie-symplectique', 'calcul-exact', 'lie-crochet-convention'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-H', kind: 'hypothese', text: t`$H(q,p)=\frac12(q^2+p^2)$ sur $\mathbb R^2$, $\omega=dq\wedge dp$.` },
      { id: 'd-XH', kind: 'definition', text: t`$X_H$ est défini par $\iota_{X_H}\omega=dH$ ; pour $X_H=A\partial_q+B\partial_p$, $\iota_{X_H}\omega=A\,dp-B\,dq$.` },
      { id: 'equations', kind: 'egalite', text: t`$A=\frac{\partial H}{\partial p}=p$ et $B=-\frac{\partial H}{\partial q}=-q$ : $X_H=p\,\partial_q-q\,\partial_p$.` },
      {
        id: 'valeur',
        kind: 'egalite',
        text: t`$X_H(1,2)=(2,-1)$.`,
        masked: t`Composantes de $X_H(1,2)$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Composantes de $X_H$ en $(q,p)=(1,2)$`, expected: ['2', '-1'], labels: ['∂q', '∂p'] },
      },
      { id: 'conserve', kind: 'egalite', text: t`$dH(X_H)=\omega(X_H,X_H)=0$ : $H$ est constante le long des courbes intégrales.` },
      { id: 'flot', kind: 'egalite', text: t`$\Phi_t(q,p)=(q\cos t+p\sin t,\;-q\sin t+p\cos t)$.` },
      { id: 'fin', kind: 'conclusion', text: t`$X_H=p\partial_q-q\partial_p$ est tangent aux cercles de niveau de $H$ ; le flot est une rotation, qui préserve $H$.` },
      { id: 'x-gradient', kind: 'egalite', distractor: true, text: t`$X_H=\nabla H=q\,\partial_q+p\,\partial_p$.` },
      { id: 'x-signe', kind: 'egalite', distractor: true, text: t`$X_H=-p\,\partial_q+q\,\partial_p$ avec la convention du cours.` },
    ],
    justifications: [
      { id: 'j-identif', label: t`Identifier $A\,dp-B\,dq$ et $dH=q\,dq+p\,dp$.` },
      { id: 'j-eval', label: 'Substitution.' },
      { id: 'j-antisym', label: t`$dH(X_H)=(\iota_{X_H}\omega)(X_H)=\omega(X_H,X_H)=0$ par antisymétrie.` },
      { id: 'j-flot', label: t`Résolution de $q'=p$, $p'=-q$.`, theorem: 'theoreme-cauchy-lipschitz' },
      { id: 'j-syn', label: 'Lecture géométrique du flot hamiltonien.', theorem: 'flot-hamiltonien' },
    ],
    rules: [
      { from: ['h-H', 'd-XH'], to: 'equations', by: 'j-identif' },
      { from: ['equations'], to: 'valeur', by: 'j-eval' },
      { from: ['d-XH'], to: 'conserve', by: 'j-antisym' },
      { from: ['equations'], to: 'flot', by: 'j-flot' },
      { from: ['equations', 'valeur', 'conserve', 'flot'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-gradient',
        verdict: 'incorrect',
        concept: 'lie-symplectique',
        message: 'Le champ hamiltonien est obtenu par la forme symplectique, pas par une métrique : il est tangent aux niveaux de H, alors que le gradient leur est orthogonal.',
        counterexample: t`$dH(\nabla H)=q^2+p^2\neq 0$ hors de l'origine : le gradient fait varier $H$.`,
      },
      {
        conclusion: 'x-signe',
        verdict: 'incorrect',
        concept: 'lie-crochet-convention',
        message: t`Avec $\omega=dq\wedge dp$ et $\iota_{X_H}\omega=dH$, on obtient $q'=\partial_pH$, $p'=-\partial_qH$.`,
        counterexample: t`Pour $X=-p\partial_q+q\partial_p$ : $\iota_X\omega=-p\,dp-q\,dq=-dH\neq dH$.`,
      },
    ],
    removable: [],
  },
  solution: t`Pour $X_H=A\partial_q+B\partial_p$, $\iota_{X_H}(dq\wedge dp)=A\,dp-B\,dq$. En identifiant avec $dH=q\,dq+p\,dp$ : $A=p$, $B=-q$, donc $X_H=p\partial_q-q\partial_p$ et $X_H(1,2)=(2,-1)$. Par antisymétrie, $dH(X_H)=\omega(X_H,X_H)=0$ : $H$ est constante sur les courbes intégrales. Le système $q'=p$, $p'=-q$ a pour flot $\Phi_t(q,p)=(q\cos t+p\sin t,-q\sin t+p\cos t)$, une rotation qui préserve les cercles $H=c$.`,
  steps: ['Contraction de ω par X_H.', 'Identification avec dH.', 'Conservation de H.', 'Flot explicite.'],
  commonErrors: [
    { id: 'e-gradient', description: 'Confondre champ hamiltonien et gradient.', concept: 'lie-symplectique' },
    { id: 'e-signe', description: 'Se tromper de signe dans les équations canoniques.', concept: 'lie-crochet-convention' },
  ],
  hints: [t`Calcule $\iota_X(dq\wedge dp)$ pour $X=A\partial_q+B\partial_p$.`, t`Identifie les coefficients de $dq$ et $dp$ avec ceux de $dH$.`, t`Pourquoi $\omega(X,X)=0$ ? Déduis-en $dH(X_H)$.`],
  rubric: rubric({
    hypotheses: 'La convention ω = dq ∧ dp et ι_{X_H}ω = dH est explicitée.',
    methode: 'Contraction, identification, conservation.',
    validite: 'Signes et flot exacts.',
    justifications: 'L’antisymétrie de ω justifie la conservation.',
    conclusion: 'Champ, flot et conservation de H conclus.',
  }),
  variant: {
    statement: t`Pour $H(q,p)=\frac{p^2}{2}+V(q)$, calculer $X_H$ et vérifier que $H$ est conservée.`,
    solution: t`$\partial_pH=p$ et $\partial_qH=V'(q)$ : $X_H=p\,\partial_q-V'(q)\,\partial_p$, soit $q'=p$, $p'=-V'(q)$. Le long d'une solution, $\frac{d}{dt}H=V'(q)q'+pp'=V'(q)p-pV'(q)=0$.`,
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h', kind: 'hypothese', text: t`$H=\frac{p^2}2+V(q)$, $V$ de classe $C^1$.` },
        { id: 'XH', kind: 'egalite', text: t`$X_H=p\,\partial_q-V'(q)\,\partial_p$.` },
        { id: 'cons', kind: 'egalite', text: t`$\frac{d}{dt}H(q,p)=V'(q)p+p(-V'(q))=0$.` },
        { id: 'fin', kind: 'conclusion', text: t`$H$ est constante le long des courbes intégrales de $X_H$.` },
        { id: 'x-q', kind: 'consequence', distractor: true, text: t`$q$ est constante le long des courbes intégrales.` },
      ],
      justifications: [
        { id: 'j-XH', label: 'Équations canoniques.' },
        { id: 'j-cons', label: 'Règle de chaîne le long d’une courbe intégrale.' },
        { id: 'j-syn', label: 'Conservation de H par son flot.', theorem: 'flot-hamiltonien' },
      ],
      rules: [
        { from: ['h'], to: 'XH', by: 'j-XH' },
        { from: ['XH'], to: 'cons', by: 'j-cons' },
        { from: ['cons'], to: 'fin', by: 'j-syn' },
      ],
      traps: [
        {
          conclusion: 'x-q',
          verdict: 'incorrect',
          concept: 'calcul-exact',
          message: 'q varie selon q′ = p.',
          counterexample: t`Pour $V=\frac{q^2}2$, $q(t)=\cos t$ est la première composante d'une solution.`,
        },
      ],
      removable: [],
    },
  },
  verification: FROM_LIE,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'flot-hamiltonien.intermediaire',
  theoremId: 'flot-hamiltonien',
  level: 'intermediaire',
  title: 'Crochet de Poisson et intégrale première',
  statement: t`Sur $\mathbb R^4$, $\{f,g\}=\sum_i\big(\partial_{q_i}f\,\partial_{p_i}g-\partial_{p_i}f\,\partial_{q_i}g\big)$. Calculer $\{q_1,p_1\}$, puis montrer que $J=q_1p_2-q_2p_1$ vérifie $\{J,H\}=0$ pour $H=\frac12(p_1^2+p_2^2+q_1^2+q_2^2)$, et conclure que $J$ est constante le long du flot de $H$.`,
  source: lie(199, 'Exercices 56.3 et 56.4'),
  prerequisites: [],
  concepts: ['lie-symplectique', 'calcul-exact', 'lie-crochet-commutation'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-poisson', kind: 'hypothese', text: t`$\{f,g\}=\sum_i\big(\partial_{q_i}f\,\partial_{p_i}g-\partial_{p_i}f\,\partial_{q_i}g\big)$, et $\frac{d}{dt}f(\gamma(t))=\{f,H\}$ le long d'une courbe intégrale de $X_H$.` },
      {
        id: 'canonique',
        kind: 'egalite',
        text: t`$\{q_1,p_1\}=1$.`,
        masked: t`Valeur de $\{q_1,p_1\}$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\{q_1,p_1\}$`, expected: '1' },
      },
      { id: 'derivees', kind: 'egalite', text: t`$\partial_{q_1}J=p_2$, $\partial_{q_2}J=-p_1$, $\partial_{p_1}J=-q_2$, $\partial_{p_2}J=q_1$ ; $\partial_{q_i}H=q_i$, $\partial_{p_i}H=p_i$.` },
      {
        id: 'crochet',
        kind: 'egalite',
        text: t`$\{J,H\}=p_2p_1-p_1p_2-(-q_2)q_1-q_1q_2=0$.`,
        masked: t`Valeur de $\{J,H\}$ : à calculer.`,
        check: { kind: 'expr-equiv', prompt: t`Expression de $\{J,H\}$`, expected: '0', vars: ['q1', 'q2', 'p1', 'p2'] },
      },
      { id: 'constante', kind: 'consequence', text: t`$\frac{d}{dt}J(\gamma(t))=\{J,H\}=0$ : $J$ est constante le long du flot.` },
      { id: 'fin', kind: 'conclusion', text: t`$\{q_1,p_1\}=1$, et $J=q_1p_2-q_2p_1$ commute avec $H$ : c'est une intégrale première, en involution avec $H$.` },
      { id: 'x-zero', kind: 'egalite', distractor: true, text: t`$\{q_1,p_1\}=0$, puisque $q_1$ et $p_1$ sont des coordonnées indépendantes.` },
      { id: 'x-tout', kind: 'consequence', distractor: true, text: t`Toute fonction de $(q,p)$ est constante le long du flot de $H$.` },
    ],
    justifications: [
      { id: 'j-can', label: t`$\partial_{q_1}q_1\,\partial_{p_1}p_1-\partial_{p_1}q_1\,\partial_{q_1}p_1=1-0$.` },
      { id: 'j-der', label: 'Dérivées partielles.' },
      { id: 'j-crochet', label: 'Formule du crochet de Poisson, terme à terme.' },
      { id: 'j-flot', label: t`Dérivée le long du flot : $df(X_H)=\{f,H\}$.`, theorem: 'flot-hamiltonien' },
      { id: 'j-syn', label: 'Réunion.' },
    ],
    rules: [
      { from: ['h-poisson'], to: 'canonique', by: 'j-can' },
      { from: ['h-poisson'], to: 'derivees', by: 'j-der' },
      { from: ['derivees', 'h-poisson'], to: 'crochet', by: 'j-crochet' },
      { from: ['crochet', 'h-poisson'], to: 'constante', by: 'j-flot' },
      { from: ['canonique', 'constante'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-zero',
        verdict: 'incorrect',
        concept: 'calcul-exact',
        message: 'Le crochet de Poisson des coordonnées conjuguées vaut 1 : c’est la relation canonique.',
        counterexample: t`$\{q_1,p_1\}=1\cdot 1-0\cdot 0=1$.`,
      },
      {
        conclusion: 'x-tout',
        verdict: 'incorrect',
        concept: 'lie-symplectique',
        message: 'Seules les fonctions qui commutent avec H sont constantes le long de son flot.',
        counterexample: t`$\{q_1,H\}=p_1$, non nul : $q_1$ varie.`,
      },
    ],
    removable: [],
  },
  solution: t`$\{q_1,p_1\}=1$. Les dérivées de $J$ sont $J_{q_1}=p_2$, $J_{q_2}=-p_1$, $J_{p_1}=-q_2$, $J_{p_2}=q_1$, et celles de $H$ sont $H_{q_i}=q_i$, $H_{p_i}=p_i$. Donc $\{J,H\}=p_2p_1+(-p_1)p_2-(-q_2)q_1-q_1q_2=0$. Le long d'une courbe intégrale de $X_H$, $\frac{d}{dt}J=\{J,H\}=0$ : $J$ est une intégrale première.`,
  steps: ['Relation canonique.', 'Dérivées partielles de J et H.', 'Calcul de {J, H}.', 'Constance le long du flot.'],
  commonErrors: [
    { id: 'e-zero', description: 'Croire {q₁, p₁} = 0.', concept: 'calcul-exact' },
    { id: 'e-tout', description: 'Croire toute fonction conservée.', concept: 'lie-symplectique' },
  ],
  hints: ['Applique la formule du crochet aux fonctions coordonnées.', 'Calcule les quatre dérivées partielles de J.', t`Le long du flot, $\frac{d}{dt}f=\{f,H\}$.`],
  rubric: rubric({
    hypotheses: 'La formule du crochet et la dérivée le long du flot sont posées.',
    methode: 'Calcul terme à terme du crochet.',
    validite: 'Les dérivées et le crochet sont exacts.',
    justifications: 'Le lien {J, H} = 0 ⇒ J constante est justifié.',
    conclusion: 'Relation canonique et intégrale première conclues.',
  }),
  variant: {
    statement: t`Montrer que $\{f,g\}=-\{g,f\}$ et que $\{H,H\}=0$ ; en déduire la conservation de $H$.`,
    solution: t`L'antisymétrie se lit sur la formule ; avec $f=g=H$, $\{H,H\}=-\{H,H\}=0$, et $\frac{d}{dt}H=\{H,H\}=0$.`,
  },
  verification: FROM_LIE,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'flot-hamiltonien.difficile',
  theoremId: 'flot-hamiltonien',
  level: 'difficile',
  title: 'Euler explicite contre Euler symplectique',
  statement: t`Pour $q'=p$, $p'=-q$ et un pas $h>0$, on compare Euler explicite $A_E=\begin{pmatrix}1&h\\-h&1\end{pmatrix}$ et Euler symplectique $p_{n+1}=p_n-hq_n$, $q_{n+1}=q_n+hp_{n+1}$. Calculer les matrices et leurs déterminants, montrer que $q^2+p^2$ est multiplié par $1+h^2$ à chaque pas d'Euler explicite, et que le schéma symplectique a des valeurs propres de module $1$ pour $0<h<2$. Application : $h=\tfrac12$.`,
  source: lie(206, 'Euler explicite et Euler symplectique, § 59.2'),
  prerequisites: [],
  concepts: ['lie-symplectique', 'calcul-exact', 'hypotheses-theoreme'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-schemas', kind: 'hypothese', text: t`$A_E=\begin{pmatrix}1&h\\-h&1\end{pmatrix}$ ; Euler symplectique : $p_{n+1}=p_n-hq_n$, $q_{n+1}=q_n+hp_{n+1}$.` },
      { id: 'd-sympl', kind: 'definition', text: t`En dimension $2$, une application linéaire est symplectique si et seulement si son déterminant vaut $1$ (elle préserve l'aire orientée $dq\wedge dp$).` },
      {
        id: 'detE',
        kind: 'egalite',
        text: t`$\det A_E=1+h^2$ ; pour $h=\frac12$, $\det A_E=\frac54$.`,
        masked: t`Valeur de $\det A_E$ pour $h=\frac12$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\det A_E$ pour $h=\frac12$`, expected: '5/4' },
      },
      { id: 'norme', kind: 'egalite', text: t`$(q+hp)^2+(p-hq)^2=(1+h^2)(q^2+p^2)$ : la quantité $q^2+p^2$ croît géométriquement.` },
      { id: 'AS', kind: 'egalite', text: t`$A_S=\begin{pmatrix}1-h^2&h\\-h&1\end{pmatrix}$ et $\det A_S=(1-h^2)+h^2=1$.` },
      { id: 'vp', kind: 'egalite', text: t`Polynôme caractéristique $\lambda^2-(2-h^2)\lambda+1$, de discriminant $h^2(h^2-4)<0$ pour $0<h<2$ : valeurs propres conjuguées de produit $1$, donc de module $1$.` },
      {
        id: 'deux-pas',
        kind: 'egalite',
        text: t`Pour $h=\frac12$, deux pas d'Euler explicite multiplient $q^2+p^2$ par $\frac{25}{16}$.`,
        masked: t`Facteur après deux pas pour $h=\frac12$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Facteur multiplicatif de $q^2+p^2$ après deux pas, $h=\frac12$`, expected: '25/16' },
      },
      { id: 'fin', kind: 'conclusion', text: t`Euler explicite n'est pas symplectique et dilate l'aire ($\det=1+h^2$) ; Euler symplectique préserve l'aire ($\det=1$) et, pour $0<h<2$, garde les itérés bornés.` },
      { id: 'x-ordre', kind: 'consequence', distractor: true, text: t`Les deux schémas étant d'ordre $1$, ils ont le même comportement à long terme.` },
      { id: 'x-energie-exacte', kind: 'consequence', distractor: true, after: ['AS'], text: t`Euler symplectique conserve exactement $q^2+p^2$.` },
    ],
    justifications: [
      { id: 'j-det', label: t`$1\cdot1-h\cdot(-h)$.` },
      { id: 'j-norme', label: 'Développer les deux carrés : les doubles produits se compensent.' },
      { id: 'j-AS', label: t`Substituer $p_{n+1}$ dans $q_{n+1}$ : $q_{n+1}=(1-h^2)q_n+hp_n$.` },
      { id: 'j-vp', label: t`Trace $2-h^2$, déterminant $1$ ; deux racines complexes conjuguées de produit $1$.` },
      { id: 'j-deux', label: t`$\big(\frac54\big)^2$.` },
      { id: 'j-syn', label: 'Comparaison au critère symplectique en dimension 2.', theorem: 'flot-hamiltonien' },
      { id: 'j-ordre', label: 'Deux schémas de même ordre ont le même comportement qualitatif.' },
    ],
    rules: [
      { from: ['h-schemas'], to: 'detE', by: 'j-det' },
      { from: ['h-schemas'], to: 'norme', by: 'j-norme' },
      { from: ['h-schemas'], to: 'AS', by: 'j-AS' },
      { from: ['AS'], to: 'vp', by: 'j-vp' },
      { from: ['norme'], to: 'deux-pas', by: 'j-deux' },
      { from: ['detE', 'AS', 'vp', 'deux-pas', 'd-sympl'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-ordre',
        verdict: 'incorrect',
        concept: 'lie-symplectique',
        message: 'L’ordre de consistance ne dit rien de la structure préservée : l’un dilate l’aire, l’autre la conserve.',
        counterexample: t`Pour $h=\frac12$, Euler explicite multiplie $q^2+p^2$ par $\frac54$ à chaque pas, sans borne ; Euler symplectique garde les itérés bornés.`,
      },
      {
        conclusion: 'x-ordre',
        by: 'j-ordre',
        verdict: 'incorrect',
        concept: 'lie-symplectique',
        message: 'Cette règle est fausse : la préservation de structure n’est pas une question d’ordre.',
      },
      {
        conclusion: 'x-energie-exacte',
        verdict: 'incorrect',
        concept: 'lie-symplectique',
        message: 'Le schéma symplectique conserve l’aire, et une quantité voisine de q² + p², mais pas q² + p² exactement.',
        counterexample: t`Pour $h=\frac12$ et $(q_0,p_0)=(1,0)$ : $p_1=-\frac12$, $q_1=1-\frac14=\frac34$, et $q_1^2+p_1^2=\frac{13}{16}\neq 1$.`,
      },
    ],
    removable: [],
  },
  solution: t`**Euler explicite.** $\det A_E=1+h^2>1$ : l'aire est dilatée, le schéma n'est pas symplectique. De plus $(q+hp)^2+(p-hq)^2=(1+h^2)(q^2+p^2)$ : la quantité $q^2+p^2$ est multipliée par $1+h^2$ à chaque pas ($\frac54$ pour $h=\frac12$, donc $\frac{25}{16}$ en deux pas) et les itérés spiralent vers l'extérieur.

**Euler symplectique.** $p_{n+1}=p_n-hq_n$, $q_{n+1}=q_n+h(p_n-hq_n)=(1-h^2)q_n+hp_n$ : $A_S=\begin{pmatrix}1-h^2&h\\-h&1\end{pmatrix}$, $\det A_S=1$, donc symplectique en dimension $2$. Son polynôme caractéristique $\lambda^2-(2-h^2)\lambda+1$ a un discriminant $h^2(h^2-4)<0$ pour $0<h<2$ : deux valeurs propres conjuguées de produit $1$, donc de module $1$ ; les itérés restent bornés. Il ne conserve pas exactement $q^2+p^2$, mais l'aire.`,
  steps: ['Déterminant d’Euler explicite.', 'Croissance de q² + p².', 'Matrice et déterminant d’Euler symplectique.', 'Valeurs propres de module 1.'],
  commonErrors: [
    { id: 'e-ordre', description: 'Juger un schéma par son seul ordre.', concept: 'lie-symplectique' },
    { id: 'e-exact', description: 'Croire qu’un schéma symplectique conserve exactement H.', concept: 'lie-symplectique' },
  ],
  hints: [t`Calcule $\det A_E$ et développe $(q+hp)^2+(p-hq)^2$.`, t`Pour Euler symplectique, remplace $p_{n+1}$ dans l'expression de $q_{n+1}$.`, 'Trace et déterminant de A_S donnent le polynôme caractéristique : regarde son discriminant.'],
  rubric: rubric({
    hypotheses: t`La condition $0<h<2$ est utilisée pour les valeurs propres.`,
    methode: 'Comparaison des déterminants, puis analyse spectrale.',
    validite: 'Matrices, déterminants et facteurs exacts.',
    justifications: 'Le critère symplectique en dimension 2 est cité.',
    conclusion: 'Les deux comportements qualitatifs sont conclus.',
  }),
  variant: {
    statement: t`Montrer que le schéma de Störmer–Verlet pour $q'=p$, $p'=-q$ est symplectique.`,
    solution: t`Il compose trois flots hamiltoniens exacts (demi-pas en $p$, pas en $q$, demi-pas en $p$), chacun de déterminant $1$ ; la composée est de déterminant $1$, donc symplectique en dimension $2$.`,
  },
  verification: COMPLEMENT,
};

const mod: TheoremModule = {
  theorem: {
    id: 'flot-hamiltonien',
    spaces: [t`Variété symplectique $(P,\omega)$, modèle $\mathbb R^{2n}$ avec $\omega=\sum_idq_i\wedge dp_i$ ; $H\in C^\infty(P)$.`],
    hypotheses: [{ id: 'convention', text: t`$X_H$ est défini par $\iota_{X_H}\omega=dH$.` }],
    statement: t`Les courbes intégrales de $X_H$ vérifient $q_i'=\partial_{p_i}H$, $p_i'=-\partial_{q_i}H$ ; pour toute $f$, $\frac{d}{dt}f(\gamma(t))=\{f,H\}$, donc $H$ est conservée et toute $f$ en involution avec $H$ est une intégrale première. Par la formule de Cartan, $\mathcal L_{X_H}\omega=0$ : le flot préserve $\omega$ et la forme volume $\omega^n/n!$ (Liouville). En dimension $2$, une application linéaire est symplectique si et seulement si son déterminant vaut $1$.`,
    conclusions: {
      stabilite: 'Le flot préserve la forme symplectique et le volume ; un schéma symplectique en hérite à l’échelle discrète.',
      autre: 'Conservation de H et des fonctions en involution avec H.',
    },
    sourceProof: 'complete',
    proofOutline: [
      t`Identifier $\iota_{X_H}\omega=A_i\,dp_i-B_i\,dq_i$ avec $dH$.`,
      t`$\frac{d}{dt}f(\gamma)=df(X_H)=\{f,H\}$ ; $\{H,H\}=0$.`,
      t`Cartan : $\mathcal L_{X_H}\omega=d\iota_{X_H}\omega+\iota_{X_H}d\omega=d^2H=0$.`,
    ],
    warnings: [
      'Le champ hamiltonien n’est pas le gradient : il est tangent aux niveaux de H.',
      'Les signes dépendent de la convention ω = dq ∧ dp et ι_{X_H}ω = dH.',
      'Un schéma précis n’est pas forcément symplectique ; un schéma symplectique ne conserve pas H exactement.',
    ],
    usefulFor: 'Intégration géométrique, intégrales premières, systèmes intégrables, modèles hamiltoniens appris.',
    verification: FROM_LIE,
  },
  definitions: [
    { id: 'def-champ-hamiltonien', term: 'Champ hamiltonien', statement: t`$X_H$ défini par $\iota_{X_H}\omega=dH$ ; avec $\omega=dq\wedge dp$, $X_H=\partial_pH\,\partial_q-\partial_qH\,\partial_p$.`, source: lie(197, '§ 56.1') },
    { id: 'def-crochet-poisson', term: 'Crochet de Poisson', statement: t`$\{f,g\}=\omega(X_f,X_g)=\sum_i\big(\partial_{q_i}f\,\partial_{p_i}g-\partial_{p_i}f\,\partial_{q_i}g\big)$.`, source: lie(198, 'Définition 56.1') },
    { id: 'def-integrateur-symplectique', term: 'Intégrateur symplectique', statement: t`Un schéma $\Psi_h$ tel que $\Psi_h^*\omega=\omega$ ; en dimension $2$, pour un schéma linéaire, $\det\Psi_h=1$.`, source: lie(206, '§ 59.1') },
  ],
  concepts: [],
  counterexamples: [
    {
      id: 'ce-euler-symplectique',
      theoremId: 'flot-hamiltonien',
      title: 'Un schéma précis mais non symplectique',
      claim: 'Tout schéma consistant pour un système hamiltonien préserve la forme symplectique.',
      correctStatement: 'Seuls les schémas symplectiques, comme Euler symplectique ou Störmer–Verlet, préservent la forme symplectique.',
      task: t`Pour l'oscillateur $q'=p$, $p'=-q$ et Euler explicite de pas $h=\frac12$, donner le déterminant de la matrice d'un pas.`,
      check: { kind: 'rational', prompt: t`Déterminant de $A_E$ pour $h=\frac12$`, expected: '5/4' },
      explanation: t`$\det A_E=1+h^2=\frac54\neq 1$ : l'aire est dilatée à chaque pas, le schéma n'est pas symplectique.`,
      concept: 'lie-symplectique',
      source: lie(206, '§ 59.2'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default mod;
