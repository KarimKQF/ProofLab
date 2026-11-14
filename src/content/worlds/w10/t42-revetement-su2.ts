/**
 * Résultat 42 — Double revêtement de SO(3) par SU(2) (cours de géométrie de Lie, § 32,
 * p. PDF 118–119). SU(2) ≃ quaternions unitaires ≃ S³ ; p(q)v = qvq⁻¹ ; p est un morphisme
 * surjectif de noyau {±1}. La boucle de rotations d'angle 0 → 2π se relève en un chemin
 * de 1 vers −1 ; parcourue deux fois, elle se relève en un lacet : π₁(SO(3)) ≃ ℤ/2.
 */
import { t, rubric, lie, FROM_LIE, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'revetement-su2.facile',
  theoremId: 'revetement-su2',
  level: 'facile',
  title: t`Lire la rotation codée par $q=\cos\frac\pi4+k\sin\frac\pi4$`,
  statement: t`Le quaternion unitaire $q=\cos\frac\theta2+u\sin\frac\theta2$ ($u\in S^2\subset\operatorname{Im}\mathbb H$) code la rotation $v\mapsto qvq^{-1}$ d'axe $u$ et d'angle $\theta$. Interpréter $q=\cos\frac\pi4+k\sin\frac\pi4$, puis montrer que $-q$ code la même rotation.`,
  source: lie(119, 'Exercice 32.1'),
  prerequisites: [],
  concepts: ['lie-revetement-signe', 'calcul-exact', 'hypotheses-theoreme'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-q', kind: 'hypothese', text: t`$q=\cos\frac\pi4+k\sin\frac\pi4$, quaternion unitaire ; $k$ correspond à $e_3$.` },
      { id: 'lecture', kind: 'egalite', text: t`$q=\cos\frac\theta2+u\sin\frac\theta2$ avec $u=k$ et $\frac\theta2=\frac\pi4$.` },
      {
        id: 'angle',
        kind: 'egalite',
        text: t`L'angle de rotation vaut $\theta=\frac\pi2$, soit $90$ degrés, autour de $e_3$.`,
        masked: t`Angle de la rotation, en degrés : à déterminer.`,
        check: { kind: 'rational', prompt: 'Angle de la rotation codée par q, en degrés', expected: '90' },
      },
      { id: 'moins-q', kind: 'egalite', text: t`$(-q)v(-q)^{-1}=qvq^{-1}$ pour tout $v$.` },
      { id: 'fin', kind: 'conclusion', text: t`$q$ et $-q$ codent la même rotation d'angle $\frac\pi2$ autour de $e_3$ : l'application $q\mapsto p(q)$ est deux à un.` },
      { id: 'x-angle', kind: 'egalite', distractor: true, text: t`$q$ code la rotation d'angle $\frac\pi4$ autour de $e_3$.` },
      { id: 'x-oppose', kind: 'consequence', distractor: true, text: t`$-q$ code la rotation d'angle $-\frac\pi2$ autour de $e_3$.` },
    ],
    justifications: [
      { id: 'j-lecture', label: t`Identification avec la forme $\cos\frac\theta2+u\sin\frac\theta2$.` },
      { id: 'j-angle', label: t`$\theta=2\cdot\frac\pi4$ ; c'est l'angle double qui apparaît dans $qvq^{-1}$.` },
      { id: 'j-moins', label: t`$(-q)^{-1}=-q^{-1}$ et les deux signes se compensent.` },
      { id: 'j-syn', label: 'Revêtement double : q et −q ont la même image.', theorem: 'revetement-su2' },
    ],
    rules: [
      { from: ['h-q'], to: 'lecture', by: 'j-lecture' },
      { from: ['lecture'], to: 'angle', by: 'j-angle' },
      { from: ['h-q'], to: 'moins-q', by: 'j-moins' },
      { from: ['angle', 'moins-q'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-angle',
        verdict: 'incorrect',
        concept: 'lie-revetement-signe',
        message: t`Le quaternion porte le demi-angle : $q=\cos\frac\theta2+u\sin\frac\theta2$.`,
        counterexample: t`$qiq^{-1}=j$ pour ce $q$ : $e_1$ est envoyé sur $e_2$, une rotation de $90$ degrés.`,
      },
      {
        conclusion: 'x-oppose',
        verdict: 'incorrect',
        concept: 'lie-revetement-signe',
        message: '−q code exactement la même rotation que q.',
        counterexample: t`$(-q)v(-q)^{-1}=qvq^{-1}$ pour tout $v$.`,
      },
    ],
    removable: [],
  },
  solution: t`$q=\cos\frac\pi4+k\sin\frac\pi4$ a la forme $\cos\frac\theta2+u\sin\frac\theta2$ avec $u=k\leftrightarrow e_3$ et $\frac\theta2=\frac\pi4$ : c'est la rotation d'angle $\frac\pi2$ ($90$ degrés) autour de $e_3$. Comme $(-q)^{-1}=-q^{-1}$, $(-q)v(-q)^{-1}=qvq^{-1}$ : $-q$ code la même rotation. L'application $q\mapsto p(q)$ identifie les quaternions opposés.`,
  steps: ['Identifier axe et demi-angle.', 'Doubler l’angle.', 'Comparer q et −q.'],
  commonErrors: [
    { id: 'e-demi', description: 'Oublier le demi-angle.', concept: 'lie-revetement-signe' },
    { id: 'e-oppose', description: 'Croire que −q code la rotation inverse.', concept: 'lie-revetement-signe' },
  ],
  hints: [t`Compare $q$ avec $\cos\frac\theta2+u\sin\frac\theta2$.`, 'Le quaternion contient la moitié de l’angle de rotation.', t`Développe $(-q)v(-q)^{-1}$.`],
  rubric: rubric({
    hypotheses: 'q est unitaire et u = k est un axe unitaire.',
    methode: 'Identification avec la forme demi-angle.',
    validite: 'L’angle est correctement doublé.',
    justifications: 'L’égalité des rotations de q et −q est démontrée.',
    conclusion: 'Rotation de 90 degrés autour de e₃, codée deux fois.',
  }),
  variant: {
    statement: t`Quelle rotation code $q=\cos\frac\pi3+i\sin\frac\pi3$ ? Et $q=-1$ ?`,
    solution: t`$q=\cos\frac\pi3+i\sin\frac\pi3$ code la rotation d'angle $\frac{2\pi}3$ autour de $e_1$. $q=-1$ code l'identité, comme $q=1$.`,
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h', kind: 'hypothese', text: t`$q=\cos\frac\pi3+i\sin\frac\pi3$.` },
        { id: 'angle', kind: 'egalite', text: t`Axe $e_1$, angle $\frac{2\pi}3$.` },
        { id: 'moins1', kind: 'egalite', text: t`$(-1)v(-1)^{-1}=v$.` },
        { id: 'fin', kind: 'conclusion', text: t`$q$ code la rotation d'angle $\frac{2\pi}3$ autour de $e_1$, et $-1$ code l'identité.` },
        { id: 'x-moins1', kind: 'egalite', distractor: true, text: t`$-1$ code la rotation d'angle $\pi$.` },
      ],
      justifications: [
        { id: 'j-angle', label: 'Forme demi-angle.' },
        { id: 'j-moins1', label: 'Les réels commutent avec tout quaternion.' },
        { id: 'j-syn', label: 'Conclusion.', theorem: 'revetement-su2' },
      ],
      rules: [
        { from: ['h'], to: 'angle', by: 'j-angle' },
        { from: ['h'], to: 'moins1', by: 'j-moins1' },
        { from: ['angle', 'moins1'], to: 'fin', by: 'j-syn' },
      ],
      traps: [
        {
          conclusion: 'x-moins1',
          verdict: 'incorrect',
          concept: 'lie-revetement-signe',
          message: '−1 appartient au noyau : il code l’identité.',
          counterexample: t`$(-1)v(-1)^{-1}=v$ pour tout $v$.`,
        },
      ],
      removable: [],
    },
  },
  verification: FROM_LIE,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'revetement-su2.intermediaire',
  theoremId: 'revetement-su2',
  level: 'intermediaire',
  title: 'Le noyau de SU(2) → SO(3) est {±1}',
  statement: t`Soit $p:S^3\subset\mathbb H\to SO(3)$, $p(q)v=qvq^{-1}$ pour $v\in\operatorname{Im}\mathbb H\simeq\mathbb R^3$. Montrer que $p(q)=I$ si et seulement si $q=\pm1$, puis que $p$ est surjective et exactement deux à un.`,
  source: lie(119, 'Quaternions unitaires et rotations, § 32.3'),
  prerequisites: [],
  concepts: ['lie-revetement-signe', 'calcul-exact', 'quantificateurs'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-p', kind: 'hypothese', text: t`$p(q)v=qvq^{-1}$, $q\in S^3$ (quaternions unitaires), $v\in\operatorname{Im}\mathbb H$ ; $p$ est un morphisme de groupes à valeurs dans $SO(3)$.` },
      { id: 'h-noyau', kind: 'hypothese', local: true, text: t`Soit $q=a+bi+cj+dk\in S^3$ avec $p(q)=I$.` },
      { id: 'commute', kind: 'egalite', text: t`$qi=iq$, $qj=jq$ et $qk=kq$.` },
      { id: 'coef', kind: 'egalite', text: t`$qi=iq$ impose $c=d=0$ ; $qj=jq$ impose $b=d=0$.` },
      { id: 'reel', kind: 'consequence', text: t`$q=a$ réel et $|q|=1$, donc $q=\pm1$.` },
      { id: 'noyau', kind: 'egalite', text: t`$\operatorname{Ker}p=\{1,-1\}$.` },
      { id: 'surj', kind: 'consequence', text: t`Toute rotation d'axe $u$ et d'angle $\theta$ est $p\big(\cos\frac\theta2+u\sin\frac\theta2\big)$ : $p$ est surjective.` },
      { id: 'deux', kind: 'consequence', text: t`$p(q)=p(q')\iff q'q^{-1}\in\{\pm1\}\iff q'=\pm q$.` },
      { id: 'fin', kind: 'conclusion', text: t`$p:SU(2)\simeq S^3\to SO(3)$ est un morphisme surjectif de noyau $\{\pm1\}$, exactement deux à un.` },
      { id: 'x-injectif', kind: 'consequence', distractor: true, text: t`$p$ est injective, donc $SU(2)\simeq SO(3)$.` },
      { id: 'x-commute-i', kind: 'egalite', distractor: true, text: t`$qi=iq$ suffit à imposer $q$ réel.` },
    ],
    justifications: [
      { id: 'j-commute', label: t`$p(q)=I$ signifie $qvq^{-1}=v$ pour $v=i,j,k$.` },
      { id: 'j-coef', label: t`$qi=ai-b+dj-ck$ et $iq=ai-b-dj+ck$ ; de même avec $j$.` },
      { id: 'j-reel', label: t`$b=c=d=0$ et $a^2=1$.` },
      { id: 'j-noyau', label: t`Réciproquement, $\pm1$ commutent avec tout quaternion.` },
      { id: 'j-surj', label: 'Toute rotation a un axe et un angle (Rodrigues), et la forme demi-angle les réalise.', theorem: 'rodrigues' },
      { id: 'j-deux', label: t`$p$ est un morphisme : $p(q')=p(q)\iff p(q'q^{-1})=I$.` },
      { id: 'j-syn', label: 'Réunion.' },
    ],
    rules: [
      { from: ['h-p', 'h-noyau'], to: 'commute', by: 'j-commute' },
      { from: ['commute'], to: 'coef', by: 'j-coef' },
      { from: ['coef', 'h-noyau'], to: 'reel', by: 'j-reel' },
      { from: ['reel', 'h-p'], to: 'noyau', by: 'j-noyau' },
      { from: ['h-p'], to: 'surj', by: 'j-surj' },
      { from: ['noyau', 'h-p'], to: 'deux', by: 'j-deux' },
      { from: ['noyau', 'surj', 'deux'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-injectif',
        verdict: 'incorrect',
        concept: 'lie-revetement-signe',
        message: t`$p(-1)=p(1)=I$ : le noyau n'est pas trivial.`,
        counterexample: t`$-1\neq 1$ et $(-1)v(-1)^{-1}=v$ pour tout $v$.`,
      },
      {
        conclusion: 'x-commute-i',
        verdict: 'incorrect',
        concept: 'quantificateurs',
        message: t`Commuter avec $i$ laisse le coefficient de $i$ libre : il faut aussi tester $j$ (ou $k$).`,
        counterexample: t`$q=\frac{1+i}{\sqrt2}$ commute avec $i$ et n'est pas réel.`,
      },
    ],
    removable: [],
  },
  solution: t`**Noyau.** Si $p(q)=I$, alors $qv=vq$ pour $v=i,j,k$. Avec $q=a+bi+cj+dk$ : $qi=ai-b+dj-ck$ et $iq=ai-b-dj+ck$, d'où $c=d=0$ ; de même $qj=jq$ donne $b=d=0$. Donc $q=a$, et $|q|=1$ impose $q=\pm1$. Réciproquement $\pm1$ commutent avec tout.

**Surjectivité.** Toute rotation a un axe $u$ et un angle $\theta$, et $p(\cos\frac\theta2+u\sin\frac\theta2)$ est cette rotation.

**Deux à un.** $p$ étant un morphisme, $p(q)=p(q')\iff q'q^{-1}\in\operatorname{Ker}p=\{\pm1\}\iff q'=\pm q$.`,
  steps: ['Traduire p(q) = I en commutations.', 'Calcul des coefficients.', 'Noyau {±1}.', 'Surjectivité et deux à un.'],
  commonErrors: [
    { id: 'e-inj', description: 'Croire p injective.', concept: 'lie-revetement-signe' },
    { id: 'e-un-seul', description: 'Ne tester la commutation qu’avec un seul générateur.', concept: 'quantificateurs' },
  ],
  hints: [t`$p(q)=I$ signifie que $q$ commute avec $i$, $j$ et $k$.`, t`Développe $qi$ et $iq$ pour $q=a+bi+cj+dk$.`, 'Pour le deux à un, utilise que p est un morphisme de groupes.'],
  rubric: rubric({
    hypotheses: 'q est unitaire ; p est un morphisme.',
    methode: 'Commutations, puis structure du noyau.',
    validite: 'Les produits de quaternions sont exacts.',
    justifications: 'La surjectivité est justifiée par axe et angle.',
    conclusion: 'Noyau {±1}, surjectivité et deux à un conclus.',
  }),
  variant: {
    statement: t`Montrer que $SU(2)$ est difféomorphe à $S^3$.`,
    solution: t`$U=\begin{pmatrix}\alpha&\beta\\-\bar\beta&\bar\alpha\end{pmatrix}$ avec $|\alpha|^2+|\beta|^2=1$ ; en écrivant $\alpha=a+ib$, $\beta=c+id$, la contrainte devient $a^2+b^2+c^2+d^2=1$.`,
  },
  verification: FROM_LIE,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'revetement-su2.difficile',
  theoremId: 'revetement-su2',
  level: 'difficile',
  title: 'La boucle de 2π n’est pas contractile, celle de 4π l’est',
  statement: t`Soit $\gamma(t)$ la rotation d'angle $t$ autour de $e_3$, $t\in[0,2\pi]$. Relever $\gamma$ dans $SU(2)$ par $\tilde\gamma(t)=\cos\frac t2+k\sin\frac t2$, en déduire que le lacet $\gamma$ n'est pas contractile dans $SO(3)$, puis que $\gamma$ parcouru deux fois l'est.`,
  source: lie(119, 'La boucle de 2π, § 32.4'),
  prerequisites: ['rodrigues'],
  concepts: ['lie-revetement-signe', 'hypotheses-theoreme', 'calcul-exact'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-boucle', kind: 'hypothese', text: t`$\gamma(t)=p(\tilde\gamma(t))$ avec $\tilde\gamma(t)=\cos\frac t2+k\sin\frac t2$, $t\in[0,2\pi]$ : un lacet basé en $I$.` },
      { id: 'h-revet', kind: 'hypothese', text: t`$p:S^3\to SO(3)$ est un revêtement à deux feuillets, de fibres $\{\pm q\}$.` },
      {
        id: 'extremite',
        kind: 'egalite',
        text: t`$\tilde\gamma(0)=1$ et $\tilde\gamma(2\pi)=-1$.`,
        masked: t`Partie réelle de $\tilde\gamma(2\pi)$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Partie réelle de $\tilde\gamma(2\pi)$`, expected: '-1' },
      },
      { id: 'relev-ouvert', kind: 'consequence', text: t`Le relevé de $\gamma$ issu de $1$ n'est pas un lacet.` },
      { id: 'non-contractile', kind: 'application-theoreme', text: t`$\gamma$ n'est pas contractile dans $SO(3)$.` },
      {
        id: 'double',
        kind: 'egalite',
        text: t`Pour $\gamma$ parcouru deux fois ($t\in[0,4\pi]$), le relevé finit en $\tilde\gamma(4\pi)=1$ : c'est un lacet de $S^3$.`,
        masked: t`Partie réelle de $\tilde\gamma(4\pi)$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Partie réelle de $\tilde\gamma(4\pi)$`, expected: '1' },
      },
      { id: 'contractile', kind: 'consequence', text: t`Ce lacet se contracte dans $S^3$, simplement connexe ; sa projection par $p$ contracte $\gamma^2$ dans $SO(3)$.` },
      { id: 'fin', kind: 'conclusion', text: t`Le tour de $2\pi$ n'est pas contractile dans $SO(3)$, celui de $4\pi$ l'est : $\pi_1(SO(3))$ contient un élément d'ordre $2$ (et vaut $\mathbb Z/2$).` },
      { id: 'x-ferme', kind: 'consequence', distractor: true, text: t`$\gamma$ étant un lacet de $SO(3)$, son relevé dans $SU(2)$ est un lacet.` },
      { id: 'x-contractile', kind: 'consequence', distractor: true, text: t`Tout lacet de $SO(3)$ est contractile, comme dans toute variété connexe.` },
    ],
    justifications: [
      { id: 'j-eval', label: t`$\cos\pi=-1$, $\sin\pi=0$.` },
      { id: 'j-ouvert', label: t`Unicité du relèvement issu d'un point ; $-1\neq 1$.` },
      { id: 'j-relev', label: 'Un lacet contractile se relève en un lacet (relèvement des homotopies).', theorem: 'relevement-homotopies' },
      { id: 'j-eval2', label: t`$\cos2\pi=1$, $\sin2\pi=0$.` },
      { id: 'j-s3', label: 'S³ est simplement connexe ; composer la contraction avec p.', theorem: 'sphere-simplement-connexe' },
      { id: 'j-syn', label: 'Réunion des deux volets.' },
      { id: 'j-connexe', label: 'Une variété connexe est simplement connexe.' },
    ],
    rules: [
      { from: ['h-boucle'], to: 'extremite', by: 'j-eval' },
      { from: ['extremite', 'h-revet'], to: 'relev-ouvert', by: 'j-ouvert' },
      { from: ['relev-ouvert', 'h-revet'], to: 'non-contractile', by: 'j-relev' },
      { from: ['h-boucle'], to: 'double', by: 'j-eval2' },
      { from: ['double', 'h-revet'], to: 'contractile', by: 'j-s3' },
      { from: ['non-contractile', 'contractile'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-ferme',
        verdict: 'incorrect',
        concept: 'lie-revetement-signe',
        message: 'Le relevé d’un lacet peut finir sur l’autre point de la fibre.',
        counterexample: t`$\tilde\gamma(0)=1$ et $\tilde\gamma(2\pi)=-1$.`,
      },
      {
        conclusion: 'x-contractile',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: 'Connexe ne veut pas dire simplement connexe.',
        counterexample: t`$SO(3)$ est connexe, et le tour de $2\pi$ n'y est pas contractile.`,
      },
      {
        conclusion: 'x-contractile',
        by: 'j-connexe',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: 'Cette règle est fausse : le cercle est connexe et non simplement connexe.',
      },
    ],
    removable: [
      {
        hypothesis: 'h-revet',
        label: 'Ne plus disposer de la structure de revêtement',
        necessary: true,
        explanation: 'Sans revêtement, ni l’unicité du relèvement ni le relèvement des homotopies ne sont disponibles.',
        counterexample: t`Pour l'application constante $S^3\to SO(3)$ de valeur $I$, aucun chemin non constant ne se relève.`,
      },
    ],
  },
  solution: t`**Tour de $2\pi$.** $\tilde\gamma(t)=\cos\frac t2+k\sin\frac t2$ relève $\gamma$ ($p(\tilde\gamma(t))$ est la rotation d'angle $t$ autour de $e_3$), avec $\tilde\gamma(0)=1$ et $\tilde\gamma(2\pi)=-1$. Le relevé issu de $1$ est unique : il n'est pas fermé. Si $\gamma$ était contractile, le relèvement des homotopies relèverait la contraction et le relevé de $\gamma$ serait un lacet. Donc $\gamma$ n'est pas contractile.

**Tour de $4\pi$.** Pour $t\in[0,4\pi]$, $\tilde\gamma(4\pi)=1$ : le relevé est un lacet de $S^3$, contractile car $S^3$ est simplement connexe ; composer la contraction avec $p$ contracte $\gamma^2$. Ainsi $[\gamma]$ est un élément d'ordre $2$ de $\pi_1(SO(3))$, qui vaut $\mathbb Z/2$.`,
  steps: ['Relevé explicite.', 'Extrémité −1 : relevé non fermé.', 'Relèvement des homotopies : non contractile.', 'Tour de 4π : relevé fermé, contraction dans S³.'],
  commonErrors: [
    { id: 'e-ferme', description: 'Croire que le relevé d’un lacet est un lacet.', concept: 'lie-revetement-signe' },
    { id: 'e-connexe', description: 'Confondre connexe et simplement connexe.', concept: 'hypotheses-theoreme' },
  ],
  hints: [t`Évalue $\tilde\gamma$ en $t=2\pi$.`, 'Que dit le relèvement des homotopies d’un lacet contractile ?', t`Pour $4\pi$, le relevé est fermé : $S^3$ étant simplement connexe, contracte-le puis projette.`],
  rubric: rubric({
    hypotheses: 'La structure de revêtement est utilisée explicitement.',
    methode: 'Relevé explicite, puis argument d’homotopie.',
    validite: 'Les valeurs de cos et sin sont exactes.',
    justifications: 'Relèvement des homotopies et simple connexité de S³ sont invoqués.',
    conclusion: 'Les deux volets (2π et 4π) sont conclus.',
  }),
  variant: {
    statement: t`Montrer que $\gamma(t)=$ rotation d'angle $2t$ autour de $e_3$, $t\in[0,2\pi]$, est contractile dans $SO(3)$.`,
    solution: t`Son relevé $t\mapsto\cos t+k\sin t$ part de $1$ et revient en $1$ : c'est un lacet de $S^3$, contractile ; sa projection contracte $\gamma$.`,
  },
  verification: COMPLEMENT,
};

const mod: TheoremModule = {
  theorem: {
    id: 'revetement-su2',
    spaces: [t`$\mathbb H$ quaternions, $SU(2)\simeq S^3$ (quaternions unitaires), $\operatorname{Im}\mathbb H\simeq\mathbb R^3$, $SO(3)$.`],
    hypotheses: [{ id: 'quaternions', text: t`$p(q)v=qvq^{-1}$ pour $q\in S^3$, $v\in\operatorname{Im}\mathbb H$.` }],
    statement: t`$p:SU(2)\to SO(3)$ est un morphisme de groupes de Lie surjectif, de noyau $\{\pm1\}$ : un revêtement à deux feuillets. $q=\cos\frac\theta2+u\sin\frac\theta2$ code la rotation d'axe $u$ et d'angle $\theta$, comme $-q$. La boucle de rotations d'angle $0\to2\pi$ se relève en un chemin de $1$ à $-1$ ; parcourue deux fois, elle se relève en un lacet : $\pi_1(SO(3))\simeq\mathbb Z/2$.`,
    conclusions: {
      autre: 'SO(3) ≃ ℝP³ comme variété ; une orientation est codée par une paire {q, −q}.',
    },
    sourceProof: 'idee',
    proofOutline: [
      'Noyau : un quaternion qui commute avec i, j, k est réel.',
      'Surjectivité : axe et angle d’une rotation, forme demi-angle.',
      'Topologie : relèvement des chemins et des homotopies pour le revêtement p.',
    ],
    warnings: [
      'q et −q codent la même rotation : une interpolation ou une fonction de perte doit respecter q ∼ −q.',
      'Le quaternion porte le demi-angle.',
      'SO(3) est connexe sans être simplement connexe.',
    ],
    usefulFor: 'Représenter les orientations sans singularité, comprendre les représentations de spin, interpoler des rotations.',
    verification: FROM_LIE,
  },
  definitions: [
    { id: 'def-revetement', term: 'Revêtement double', statement: t`$p:\tilde X\to X$ continue surjective telle que tout point de $X$ ait un voisinage $U$ avec $p^{-1}(U)$ réunion disjointe de deux ouverts envoyés homéomorphiquement sur $U$.`, source: lie(119, '§ 32.3') },
  ],
  concepts: [],
  counterexamples: [
    {
      id: 'ce-su2-injectif',
      theoremId: 'revetement-su2',
      title: 'Deux quaternions, une rotation',
      claim: t`Deux quaternions unitaires distincts codent toujours deux rotations distinctes.`,
      correctStatement: t`$p(q)=p(q')$ si et seulement si $q'=\pm q$.`,
      task: t`Donner la partie réelle du quaternion unitaire $q'\neq q$ qui code la même rotation que $q=\cos\frac\pi4+k\sin\frac\pi4$, multipliée par $\sqrt2$.`,
      check: { kind: 'rational', prompt: t`$\sqrt2\times$ partie réelle de $q'$`, expected: '-1' },
      explanation: t`$q'=-q=-\cos\frac\pi4-k\sin\frac\pi4$, de partie réelle $-\frac{\sqrt2}2$ ; $(-q)v(-q)^{-1}=qvq^{-1}$.`,
      concept: 'lie-revetement-signe',
      source: lie(119, '§ 32.3'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default mod;
