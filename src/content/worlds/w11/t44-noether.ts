/**
 * Résultat 44 — Théorème de Noether (cours de géométrie de Lie, § 53, p. PDF 187–190).
 * Cas vertical en dimension un : si d/dε L(t, q_ε, q′_ε)|₀ = dB/dt pour q_ε = q + εη,
 * alors I = p_i η^i − B est constante sur toute solution d'Euler–Lagrange (p_i = ∂L/∂q′^i).
 * Vocabulaire strictement mathématique : « intégrale première », jamais d'interprétation
 * mécanique.
 */
import { t, rubric, lie, FROM_LIE, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'noether.facile',
  theoremId: 'noether',
  level: 'facile',
  title: 'Quand une translation de q est-elle une symétrie variationnelle ?',
  statement: t`Pour $L(q,q')=\frac12(q')^2-V(q)$, calculer la variation infinitésimale de $L$ sous $q\mapsto q+\varepsilon$, déterminer quand c'est une symétrie variationnelle stricte, et donner alors l'intégrale première de Noether. Évaluer la variation pour $V(q)=q^2$ en $q=3$.`,
  source: lie(189, 'Exercice 53.3'),
  prerequisites: [],
  concepts: ['lie-noether-variationnelle', 'calcul-exact', 'hypotheses-theoreme'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-L', kind: 'hypothese', text: t`$L(q,q')=\frac12(q')^2-V(q)$, $V$ de classe $C^1$, et $q_\varepsilon=q+\varepsilon$ ($\eta=1$).` },
      { id: 'variation', kind: 'egalite', text: t`$\frac{d}{d\varepsilon}\big|_{\varepsilon=0}L(q+\varepsilon,q')=-V'(q)$.` },
      {
        id: 'exemple',
        kind: 'egalite',
        text: t`Pour $V(q)=q^2$ et $q=3$, la variation vaut $-6$.`,
        masked: t`Valeur de la variation pour $V(q)=q^2$ en $q=3$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $-V'(3)$ pour $V(q)=q^2$`, expected: '-6' },
      },
      { id: 'stricte', kind: 'consequence', text: t`La translation est une symétrie variationnelle stricte ($B=0$) si et seulement si $V'\equiv 0$, c'est-à-dire $V$ constante.` },
      { id: 'moment', kind: 'egalite', text: t`$p=\frac{\partial L}{\partial q'}=q'$.` },
      { id: 'noether', kind: 'application-theoreme', text: t`Si $V$ est constante, $I=p\,\eta-B=q'$ est constante le long des solutions.` },
      { id: 'fin', kind: 'conclusion', text: t`La translation de $q$ est une symétrie stricte exactement quand $V$ est constante, et alors $q'$ est une intégrale première.` },
      { id: 'x-toujours', kind: 'consequence', distractor: true, text: t`$q'$ est constante le long des solutions pour tout potentiel $V$.` },
      { id: 'x-equation', kind: 'consequence', distractor: true, text: t`Toute symétrie des équations d'Euler–Lagrange fournit une intégrale première par Noether.` },
    ],
    justifications: [
      { id: 'j-var', label: t`Dériver $\frac12(q')^2-V(q+\varepsilon)$ en $\varepsilon=0$ ; $q'$ ne change pas.` },
      { id: 'j-ex', label: t`$V'(q)=2q$.` },
      { id: 'j-stricte', label: 'Une variation identiquement nulle pour toute trajectoire exige V′ ≡ 0.' },
      { id: 'j-p', label: 'Dérivée partielle par rapport à q′.' },
      { id: 'j-noether', label: 'Théorème de Noether (cas vertical).', theorem: 'noether' },
      { id: 'j-syn', label: 'Réunion.' },
    ],
    rules: [
      { from: ['h-L'], to: 'variation', by: 'j-var' },
      { from: ['variation'], to: 'exemple', by: 'j-ex' },
      { from: ['variation'], to: 'stricte', by: 'j-stricte' },
      { from: ['h-L'], to: 'moment', by: 'j-p' },
      { from: ['stricte', 'moment'], to: 'noether', by: 'j-noether' },
      { from: ['stricte', 'noether', 'exemple'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-toujours',
        verdict: 'incorrect',
        concept: 'lie-noether-variationnelle',
        message: 'Sans symétrie, pas d’intégrale première associée : l’équation est q″ = −V′(q).',
        counterexample: t`Pour $V(q)=q^2$, $q(t)=\cos(\sqrt2t)$ est solution et $q'$ n'est pas constante.`,
      },
      {
        conclusion: 'x-equation',
        verdict: 'incorrect',
        concept: 'lie-noether-variationnelle',
        message: 'Noether demande une symétrie variationnelle (du lagrangien à une dérivée totale près), pas une simple symétrie des équations.',
        counterexample: t`Pour $L=\frac12(q')^2$, la dilatation $q\mapsto\lambda q$ préserve l'équation $q''=0$ mais multiplie $L$ par $\lambda^2$ : ce n'est pas une symétrie variationnelle.`,
      },
    ],
    removable: [],
  },
  solution: t`La variation est $\frac{d}{d\varepsilon}\big|_0\big(\frac12(q')^2-V(q+\varepsilon)\big)=-V'(q)$ ; pour $V=q^2$ en $q=3$, elle vaut $-6$. Elle est identiquement nulle, donc la translation est une symétrie variationnelle stricte ($B=0$), si et seulement si $V'\equiv 0$. Dans ce cas, $p=\frac{\partial L}{\partial q'}=q'$ et Noether donne l'intégrale première $I=p\cdot 1-0=q'$.`,
  steps: ['Variation infinitésimale de L.', 'Condition de symétrie stricte.', 'Moment conjugué et intégrale première.'],
  commonErrors: [
    { id: 'e-toujours', description: 'Affirmer une conservation sans vérifier la symétrie.', concept: 'lie-noether-variationnelle' },
    { id: 'e-equation', description: 'Confondre symétrie des équations et symétrie variationnelle.', concept: 'lie-noether-variationnelle' },
  ],
  hints: [t`Dérive $L(q+\varepsilon,q')$ par rapport à $\varepsilon$ en $0$.`, 'Pour une symétrie stricte, la variation doit être nulle pour toute trajectoire.', t`L'intégrale première de Noether vaut $p\,\eta-B$, avec $p=\partial L/\partial q'$.`],
  rubric: rubric({
    hypotheses: 'La notion de symétrie variationnelle stricte est précisée.',
    methode: 'Variation infinitésimale, puis théorème de Noether.',
    validite: 'Les calculs de variation et de p sont exacts.',
    justifications: 'La condition V′ ≡ 0 est justifiée.',
    conclusion: 'L’intégrale première q′ est conclue sous la bonne hypothèse.',
  }),
  variant: {
    statement: t`Pour $L(q_1,q_2,q_1',q_2')=\frac12(q_1'^2+q_2'^2)-W(q_2)$, montrer que $q_1'$ est une intégrale première.`,
    solution: t`La translation $q_1\mapsto q_1+\varepsilon$ ($\eta=(1,0)$) laisse $L$ invariant ($B=0$), car $W$ ne dépend pas de $q_1$. Noether donne $I=p_1=q_1'$.`,
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h', kind: 'hypothese', text: t`$L=\frac12(q_1'^2+q_2'^2)-W(q_2)$, $\eta=(1,0)$.` },
        { id: 'inv', kind: 'egalite', text: t`$L(q_1+\varepsilon,q_2,q')=L(q,q')$.` },
        { id: 'p1', kind: 'egalite', text: t`$p_1=\partial L/\partial q_1'=q_1'$.` },
        { id: 'fin', kind: 'conclusion', text: t`$q_1'$ est constante le long des solutions.` },
        { id: 'x-q2', kind: 'consequence', distractor: true, text: t`$q_2'$ est aussi une intégrale première.` },
      ],
      justifications: [
        { id: 'j-inv', label: t`$W$ ne dépend pas de $q_1$.` },
        { id: 'j-p', label: 'Dérivée partielle.' },
        { id: 'j-noether', label: 'Noether avec B = 0.', theorem: 'noether' },
      ],
      rules: [
        { from: ['h'], to: 'inv', by: 'j-inv' },
        { from: ['h'], to: 'p1', by: 'j-p' },
        { from: ['inv', 'p1'], to: 'fin', by: 'j-noether' },
      ],
      traps: [
        {
          conclusion: 'x-q2',
          verdict: 'incorrect',
          concept: 'lie-noether-variationnelle',
          message: t`La translation en $q_2$ n'est pas une symétrie si $W$ n'est pas constante.`,
          counterexample: t`Pour $W(q_2)=q_2^2$, $q_2''=-2q_2$ et $q_2'$ varie.`,
        },
      ],
      removable: [],
    },
  },
  verification: FROM_LIE,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'noether.intermediaire',
  theoremId: 'noether',
  level: 'intermediaire',
  title: t`L'intégrale première $pq'-L$ d'un lagrangien autonome`,
  statement: t`Soit $L(q,q')$ de classe $C^2$, sans dépendance explicite en $t$, et $q$ une solution d'Euler–Lagrange. Montrer que $I=pq'-L$, avec $p=\partial L/\partial q'$, est constante. Calculer $I$ pour $L=\frac12(q')^2-\frac12q^2$ et $q(0)=1$, $q'(0)=2$.`,
  source: lie(189, 'Translation de la variable indépendante, § 53.4.1, et exercice 53.4'),
  prerequisites: [],
  concepts: ['lie-noether-variationnelle', 'calcul-exact', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-L', kind: 'hypothese', text: t`$L=L(q,q')$ de classe $C^2$, sans $t$ explicite, et $q$ de classe $C^2$.` },
      { id: 'h-EL', kind: 'hypothese', text: t`$q$ vérifie Euler–Lagrange : $\frac{d}{dt}\frac{\partial L}{\partial q'}=\frac{\partial L}{\partial q}$.` },
      { id: 'derivee', kind: 'egalite', text: t`$\frac{d}{dt}(pq'-L)=p'q'+pq''-\frac{\partial L}{\partial q}q'-\frac{\partial L}{\partial q'}q''$.` },
      { id: 'simplif', kind: 'egalite', text: t`$=q'\Big(p'-\frac{\partial L}{\partial q}\Big)$, puisque $p=\frac{\partial L}{\partial q'}$.` },
      { id: 'nul', kind: 'egalite', text: t`$\frac{d}{dt}(pq'-L)=0$ le long de la solution.` },
      { id: 'formule', kind: 'egalite', text: t`Pour $L=\frac12(q')^2-\frac12q^2$ : $p=q'$ et $I=\frac12(q')^2+\frac12q^2$.` },
      {
        id: 'valeur',
        kind: 'egalite',
        text: t`$I=\frac12\cdot 4+\frac12\cdot 1=\frac52$ pour $q(0)=1$, $q'(0)=2$.`,
        masked: t`Valeur de $I$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $I=pq'-L$ en $t=0$`, expected: '5/2' },
      },
      { id: 'fin', kind: 'conclusion', text: t`$I=pq'-L$ est une intégrale première ; ici $\frac12(q')^2+\frac12q^2=\frac52$ pour tout $t$.` },
      { id: 'x-L', kind: 'consequence', distractor: true, text: t`$L$ elle-même est constante le long des solutions.` },
      { id: 'x-sans-EL', kind: 'consequence', distractor: true, after: ['simplif'], text: t`$pq'-L$ est constante pour toute courbe $q$, solution ou non.` },
    ],
    justifications: [
      { id: 'j-chaine', label: t`Dérivation de $L(q(t),q'(t))$ par la règle de chaîne, sans terme $\partial_tL$.` },
      { id: 'j-simplif', label: t`Les termes en $q''$ se compensent car $p=\partial L/\partial q'$.` },
      { id: 'j-EL', label: 'Équation d’Euler–Lagrange.' },
      { id: 'j-formule', label: t`$pq'-L=(q')^2-\frac12(q')^2+\frac12q^2$.` },
      { id: 'j-valeur', label: 'Évaluation en t = 0, puis constance.' },
      { id: 'j-noether', label: 'Noether pour la translation du temps (ξ = 1, η = 0).', theorem: 'noether' },
    ],
    rules: [
      { from: ['h-L'], to: 'derivee', by: 'j-chaine' },
      { from: ['derivee'], to: 'simplif', by: 'j-simplif' },
      { from: ['simplif', 'h-EL'], to: 'nul', by: 'j-EL' },
      { from: ['h-L'], to: 'formule', by: 'j-formule' },
      { from: ['formule', 'nul'], to: 'valeur', by: 'j-valeur' },
      { from: ['nul', 'valeur'], to: 'fin', by: 'j-noether' },
    ],
    traps: [
      {
        conclusion: 'x-L',
        verdict: 'incorrect',
        concept: 'lie-noether-variationnelle',
        message: 'L’intégrale première est pq′ − L, pas L.',
        counterexample: t`Pour $q=\cos t+2\sin t$ (solution de $q''=-q$, avec $q(0)=1$, $q'(0)=2$), $L=\frac12(q')^2-\frac12q^2$ vaut $\frac32$ en $t=0$ et $-\frac32$ en $t=\frac\pi2$.`,
      },
      {
        conclusion: 'x-sans-EL',
        verdict: 'incorrect',
        concept: 'justification-absente',
        message: 'La dérivée vaut q′(p′ − ∂L/∂q) : elle n’est nulle que sur les solutions d’Euler–Lagrange.',
        counterexample: t`Pour $q(t)=t^2$ et $L=\frac12(q')^2-\frac12q^2$ : $pq'-L=2t^2+\frac12t^4$ n'est pas constante.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-EL',
        label: 'Ne plus supposer que q est solution',
        necessary: true,
        explanation: 'Le terme p′ − ∂L/∂q ne s’annule plus.',
        counterexample: t`$q(t)=t^2$ : $pq'-L=2t^2+\frac12t^4$ varie.`,
      },
    ],
  },
  solution: t`Par la règle de chaîne (sans $\partial_tL$), $\frac{d}{dt}(pq'-L)=p'q'+pq''-\frac{\partial L}{\partial q}q'-\frac{\partial L}{\partial q'}q''$. Comme $p=\frac{\partial L}{\partial q'}$, les termes en $q''$ se compensent : il reste $q'\big(p'-\frac{\partial L}{\partial q}\big)$, nul par Euler–Lagrange. Donc $I=pq'-L$ est constante (c'est l'intégrale première associée par Noether à la translation du temps).

Pour $L=\frac12(q')^2-\frac12q^2$ : $p=q'$ et $I=(q')^2-L=\frac12(q')^2+\frac12q^2$ ; avec $q(0)=1$, $q'(0)=2$ : $I=2+\frac12=\frac52$.`,
  steps: ['Dériver pq′ − L.', 'Compenser les termes en q″.', 'Utiliser Euler–Lagrange.', 'Calculer I sur l’exemple.'],
  commonErrors: [
    { id: 'e-L', description: 'Croire que L elle-même est conservée.', concept: 'lie-noether-variationnelle' },
    { id: 'e-sans-EL', description: 'Oublier que la conservation n’a lieu que sur les solutions.', concept: 'justification-absente' },
  ],
  hints: [t`Dérive $pq'-L$ en n'oubliant pas que $L$ dépend de $t$ à travers $q$ et $q'$.`, t`Les termes en $q''$ se compensent : que reste-t-il ?`, t`Pour l'exemple, $p=q'$ ; évalue $I$ en $t=0$.`],
  rubric: rubric({
    hypotheses: 'L’absence de dépendance explicite en t et l’équation d’Euler–Lagrange sont utilisées.',
    methode: 'Dérivation directe de pq′ − L.',
    validite: 'Les compensations sont correctes.',
    justifications: 'Le rôle d’Euler–Lagrange est explicité.',
    conclusion: 'Intégrale première et valeur 5/2 conclues.',
  }),
  variant: {
    statement: t`Pour $L=\frac12(q')^2-q^4$, donner l'intégrale première associée à la translation du temps.`,
    solution: t`$p=q'$, donc $I=pq'-L=\frac12(q')^2+q^4$, constante le long des solutions de $q''=-4q^3$.`,
  },
  verification: FROM_LIE,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'noether.difficile',
  theoremId: 'noether',
  level: 'difficile',
  title: 'Rotations du plan et intégrale première associée',
  statement: t`Sur $\mathbb R^2$, soit $L(q,v)=\frac12|v|^2-V(|q|)$ (potentiel radial). Montrer que les rotations $q_\varepsilon=R_\varepsilon q$ sont des symétries variationnelles strictes, que $I=q_1q_2'-q_2q_1'$ est une intégrale première, et calculer $I$ pour $q(0)=(1,0)$, $q'(0)=(0,3)$. Montrer qu'un potentiel non radial peut détruire cette conservation.`,
  source: lie(189, 'Rotations, § 53.4.3'),
  prerequisites: [],
  concepts: ['lie-noether-variationnelle', 'calcul-exact', 'hypotheses-theoreme'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-L', kind: 'hypothese', text: t`$L(q,v)=\frac12|v|^2-V(|q|)$, $V$ de classe $C^1$ ; $R_\varepsilon$ rotation d'angle $\varepsilon$.` },
      { id: 'invariance', kind: 'egalite', text: t`$L(R_\varepsilon q,R_\varepsilon v)=L(q,v)$ : $|R_\varepsilon v|=|v|$ et $|R_\varepsilon q|=|q|$ ; donc $B=0$.` },
      { id: 'eta', kind: 'egalite', text: t`$\eta=\frac{d}{d\varepsilon}\big|_0R_\varepsilon q=Jq=(-q_2,q_1)$, avec $J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$.` },
      { id: 'p', kind: 'egalite', text: t`$p=\frac{\partial L}{\partial v}=v=q'$.` },
      { id: 'noether', kind: 'application-theoreme', text: t`$I=p\cdot\eta=q'\cdot Jq=q_1q_2'-q_2q_1'$ est constante le long des solutions.` },
      {
        id: 'valeur',
        kind: 'egalite',
        text: t`Pour $q(0)=(1,0)$ et $q'(0)=(0,3)$ : $I=1\cdot 3-0\cdot 0=3$.`,
        masked: t`Valeur de $I$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $I=q_1q_2'-q_2q_1'$ en $t=0$`, expected: '3' },
      },
      { id: 'h-nonrad', kind: 'hypothese', text: t`Contre-exemple : $W(q)=q_1^2$, non radial, et $L_W=\frac12|v|^2-W(q)$.` },
      { id: 'brise', kind: 'egalite', text: t`Pour $L_W$ : $\frac{d}{dt}I=q_1q_2''-q_2q_1''=2q_1q_2$, non nul en général.` },
      { id: 'fin', kind: 'conclusion', text: t`Pour un potentiel radial, $q_1q_2'-q_2q_1'$ est une intégrale première (ici égale à $3$) ; un potentiel non radial peut la détruire.` },
      { id: 'x-tout-V', kind: 'consequence', distractor: true, text: t`$q_1q_2'-q_2q_1'$ est conservée pour tout potentiel $V(q)$.` },
      { id: 'x-eta', kind: 'egalite', distractor: true, text: t`$\eta=(q_2,-q_1)$, d'où $I=q_2q_1'-q_1q_2'$ conservée, mais de signe opposé.` },
    ],
    justifications: [
      { id: 'j-iso', label: 'Une rotation préserve la norme euclidienne.' },
      { id: 'j-eta', label: t`$R_\varepsilon=e^{\varepsilon J}$, dérivée en $0$ : $J$.` },
      { id: 'j-p', label: 'Gradient de ½|v|² par rapport à v.' },
      { id: 'j-noether', label: 'Noether, symétrie stricte (B = 0).', theorem: 'noether' },
      { id: 'j-valeur', label: 'Évaluation en t = 0.' },
      { id: 'j-brise', label: t`$q_1''=-2q_1$ et $q_2''=0$ pour $L_W$ : $\frac{d}{dt}I=q_1\cdot 0-q_2(-2q_1)$.` },
      { id: 'j-syn', label: 'Réunion.' },
    ],
    rules: [
      { from: ['h-L'], to: 'invariance', by: 'j-iso' },
      { from: ['h-L'], to: 'eta', by: 'j-eta' },
      { from: ['h-L'], to: 'p', by: 'j-p' },
      { from: ['invariance', 'eta', 'p'], to: 'noether', by: 'j-noether' },
      { from: ['noether'], to: 'valeur', by: 'j-valeur' },
      { from: ['h-nonrad'], to: 'brise', by: 'j-brise' },
      { from: ['noether', 'valeur', 'brise'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-tout-V',
        verdict: 'incorrect',
        concept: 'lie-noether-variationnelle',
        message: 'La conservation repose sur l’invariance de L par rotation, donc sur le caractère radial du potentiel.',
        counterexample: t`Pour $W=q_1^2$, en $q=(1,1)$ : $\frac{d}{dt}I=2\neq 0$.`,
      },
      {
        conclusion: 'x-eta',
        verdict: 'incorrect',
        concept: 'calcul-exact',
        message: t`$\frac{d}{d\varepsilon}R_\varepsilon q=Jq=(-q_2,q_1)$ ; le signe opposé correspond à $R_{-\varepsilon}$. La quantité obtenue serait $-I$, conservée elle aussi, mais l'expression de $\eta$ est fausse.`,
        counterexample: t`Pour $q=(1,0)$ : $R_\varepsilon q=(\cos\varepsilon,\sin\varepsilon)$, de dérivée $(0,1)$ en $0$, et non $(0,-1)$.`,
      },
    ],
    removable: [],
  },
  solution: t`**Symétrie.** $|R_\varepsilon v|=|v|$ et $|R_\varepsilon q|=|q|$ : $L(R_\varepsilon q,R_\varepsilon v)=L(q,v)$, symétrie stricte ($B=0$). Le générateur est $\eta=Jq=(-q_2,q_1)$.

**Noether.** $p=\partial L/\partial v=q'$, donc $I=p\cdot\eta=-q_1'q_2+q_2'q_1=q_1q_2'-q_2q_1'$ est constante. Pour $q(0)=(1,0)$, $q'(0)=(0,3)$ : $I=3$.

**Sans symétrie.** Pour $W=q_1^2$ : $q_1''=-2q_1$, $q_2''=0$, et $\frac{d}{dt}I=q_1q_2''-q_2q_1''=2q_1q_2$, non nul en $q=(1,1)$ : la conservation tombe avec l'invariance.`,
  steps: ['Invariance de L par rotation.', 'Générateur η = Jq.', 'Noether : I = p · η.', 'Valeur, puis contre-exemple non radial.'],
  commonErrors: [
    { id: 'e-tout-V', description: 'Affirmer la conservation sans symétrie.', concept: 'lie-noether-variationnelle' },
    { id: 'e-signe', description: 'Se tromper de signe dans le générateur.', concept: 'calcul-exact' },
  ],
  hints: ['Que conserve une rotation ? Applique-le à |v| et à |q|.', t`Le générateur de $R_\varepsilon=e^{\varepsilon J}$ est $Jq$.`, t`$I=p\cdot\eta$ avec $p=q'$ ; pour le contre-exemple, calcule $\frac{d}{dt}(q_1q_2'-q_2q_1')$ avec les équations de $L_W$.`],
  rubric: rubric({
    hypotheses: 'Le caractère radial du potentiel est utilisé.',
    methode: 'Symétrie variationnelle, générateur, Noether.',
    validite: 'Le générateur et la valeur de I sont exacts.',
    justifications: 'Le contre-exemple non radial est calculé.',
    conclusion: 'L’intégrale première et ses limites sont conclues.',
  }),
  variant: {
    statement: t`Sur $\mathbb R^n$, pour $L(q,v)=\frac12|v|^2-V(|q|)$ et $A\in\mathfrak{so}(n)$, montrer que $I_A=v\cdot Aq$ est une intégrale première.`,
    solution: t`$R_\varepsilon=e^{\varepsilon A}\in SO(n)$ préserve les normes, donc $L$ ; le générateur est $\eta=Aq$ et $p=v$ : Noether donne $I_A=v\cdot Aq$, constante.`,
  },
  verification: COMPLEMENT,
};

const mod: TheoremModule = {
  theorem: {
    id: 'noether',
    spaces: [t`Lagrangien $L(t,q,q')$ de classe $C^2$ sur un ouvert de $\mathbb R\times\mathbb R^n\times\mathbb R^n$, famille $q_\varepsilon=q+\varepsilon\eta(t,q)$.`],
    hypotheses: [
      { id: 'symetrie', text: t`$\frac{d}{d\varepsilon}\big|_{\varepsilon=0}L(t,q_\varepsilon,q_\varepsilon')=\frac{dB}{dt}$ pour une fonction $B$ (symétrie variationnelle).`, whenRemoved: 'Une simple symétrie des équations ne suffit pas.' },
      { id: 'EL', text: 'q est solution des équations d’Euler–Lagrange.' },
    ],
    statement: t`Sous ces hypothèses, avec $p_i=\frac{\partial L}{\partial q'^i}$, la quantité $I=p_i\eta^i-B$ est constante le long de toute solution d'Euler–Lagrange.`,
    conclusions: {
      autre: 'Une intégrale première par symétrie variationnelle continue.',
    },
    sourceProof: 'complete',
    proofOutline: [
      t`Par la règle de chaîne, $\frac{dB}{dt}=\frac{\partial L}{\partial q^i}\eta^i+p_i\frac{d\eta^i}{dt}=\Big(\frac{\partial L}{\partial q^i}-\frac{dp_i}{dt}\Big)\eta^i+\frac{d}{dt}(p_i\eta^i)$.`,
      'Sur une solution d’Euler–Lagrange, le premier terme s’annule : d/dt (p_i η^i − B) = 0.',
    ],
    warnings: [
      'Symétrie des équations et symétrie variationnelle sont deux notions distinctes.',
      'La conservation n’a lieu que le long des solutions d’Euler–Lagrange.',
      'Deux lagrangiens qui diffèrent d’une dérivée totale donnent les mêmes équations, mais modifient B.',
    ],
    usefulFor: 'Obtenir des intégrales premières (translations, rotations, translation du temps), réduire un système, contrôler un schéma numérique.',
    verification: FROM_LIE,
  },
  definitions: [
    { id: 'def-symetrie-variationnelle', term: 'Symétrie variationnelle', statement: t`Une famille $q_\varepsilon$ telle que la variation infinitésimale de $L$ soit une dérivée totale $\frac{dB}{dt}$ ; stricte si $B=0$.`, source: lie(187, '§ 53.1') },
    { id: 'def-integrale-premiere', term: 'Intégrale première', statement: 'Une fonction constante le long de toute solution du système considéré.', source: lie(188, 'Théorème 53.1') },
  ],
  concepts: [],
  counterexamples: [
    {
      id: 'ce-noether-equation',
      theoremId: 'noether',
      title: 'Une symétrie des équations qui n’est pas variationnelle',
      claim: t`Toute transformation qui envoie solutions sur solutions des équations d'Euler–Lagrange fournit une intégrale première par Noether.`,
      correctStatement: t`Noether s'applique aux symétries variationnelles : la variation de $L$ doit être une dérivée totale.`,
      task: t`Pour $L=\frac12(q')^2$ et la dilatation $q\mapsto\lambda q$, qui préserve l'équation $q''=0$, donner le facteur par lequel $L$ est multipliée lorsque $\lambda=3$.`,
      check: { kind: 'rational', prompt: t`Facteur multiplicatif de $L$ pour $\lambda=3$`, expected: '9' },
      explanation: t`$L(\lambda q,\lambda q')=\lambda^2L$ : pour $\lambda=3$, $L$ est multipliée par $9$. La variation infinitésimale $2L$ n'est pas une dérivée totale en général : ce n'est pas une symétrie variationnelle.`,
      concept: 'lie-noether-variationnelle',
      source: lie(187, '§ 53.1'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default mod;
