/**
 * Résultat 41 — SO(3), so(3) et formule de Rodrigues (cours de géométrie de Lie, § 31,
 * p. PDF 115–117). Chapeau : ω̂v = ω × v ; [ω̂, η̂] = (ω × η)^ ; pour |u| = 1,
 * û² = uuᵀ − I, û³ = −û, exp(θû) = I + sin θ û + (1 − cos θ) û².
 */
import { t, rubric, lie, FROM_LIE } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'rodrigues.facile',
  theoremId: 'rodrigues',
  level: 'facile',
  title: t`Rodrigues pour l'axe $e_3$`,
  statement: t`Calculer $\widehat{e_3}$ et $\widehat{e_3}^{\,2}$, en déduire par la formule de Rodrigues la matrice de $\exp(\theta\widehat{e_3})$, puis donner $\exp(\tfrac\pi2\widehat{e_3})$ et l'image de $e_1$.`,
  source: lie(116, 'Exercice 31.2'),
  prerequisites: [],
  concepts: ['calcul-exact', 'lie-exp-globale', 'hypotheses-theoreme'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-chapeau', kind: 'hypothese', text: t`$\widehat\omega v=\omega\times v$ ; pour $\omega=e_3$, $\widehat{e_3}=\begin{pmatrix}0&-1&0\\1&0&0\\0&0&0\end{pmatrix}$.` },
      { id: 'carre', kind: 'egalite', text: t`$\widehat{e_3}^{\,2}=\begin{pmatrix}-1&0&0\\0&-1&0\\0&0&0\end{pmatrix}=e_3e_3^{\mathsf T}-I$.` },
      { id: 'rodrigues', kind: 'application-theoreme', text: t`$\exp(\theta\widehat{e_3})=I+\sin\theta\,\widehat{e_3}+(1-\cos\theta)\widehat{e_3}^{\,2}=\begin{pmatrix}\cos\theta&-\sin\theta&0\\ \sin\theta&\cos\theta&0\\0&0&1\end{pmatrix}$.` },
      {
        id: 'valeur',
        kind: 'egalite',
        text: t`$\exp(\tfrac\pi2\widehat{e_3})=\begin{pmatrix}0&-1&0\\1&0&0\\0&0&1\end{pmatrix}$.`,
        masked: t`Coefficients de $\exp(\tfrac\pi2\widehat{e_3})$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Coefficients de $\exp(\tfrac\pi2\widehat{e_3})$, ligne par ligne`, expected: ['0', '-1', '0', '1', '0', '0', '0', '0', '1'] },
      },
      { id: 'image', kind: 'egalite', text: t`$\exp(\tfrac\pi2\widehat{e_3})\,e_1=e_2$.` },
      { id: 'fin', kind: 'conclusion', text: t`$\exp(\theta\widehat{e_3})$ est la rotation d'angle $\theta$ autour de $e_3$ ; pour $\theta=\frac\pi2$, elle envoie $e_1$ sur $e_2$.` },
      { id: 'x-exp-coef', kind: 'egalite', distractor: true, text: t`$\exp(\theta\widehat{e_3})=I+\theta\,\widehat{e_3}$.` },
      { id: 'x-axe', kind: 'consequence', distractor: true, after: ['rodrigues'], text: t`$\exp(\theta\widehat{e_3})$ fixe $e_1$.` },
    ],
    justifications: [
      { id: 'j-carre', label: 'Produit matriciel.' },
      { id: 'j-rodrigues', label: t`Formule de Rodrigues, avec $u=e_3$ unitaire.`, theorem: 'rodrigues' },
      { id: 'j-eval', label: t`$\cos\frac\pi2=0$, $\sin\frac\pi2=1$.` },
      { id: 'j-colonne', label: 'Première colonne de la matrice.' },
      { id: 'j-syn', label: 'Lecture géométrique.' },
    ],
    rules: [
      { from: ['h-chapeau'], to: 'carre', by: 'j-carre' },
      { from: ['h-chapeau', 'carre'], to: 'rodrigues', by: 'j-rodrigues' },
      { from: ['rodrigues'], to: 'valeur', by: 'j-eval' },
      { from: ['valeur'], to: 'image', by: 'j-colonne' },
      { from: ['rodrigues', 'image'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-exp-coef',
        verdict: 'incorrect',
        concept: 'calcul-exact',
        message: 'C’est seulement le développement à l’ordre 1 : la série ne s’arrête pas, elle se replie grâce à û³ = −û.',
        counterexample: t`$I+\theta\widehat{e_3}$ n'est pas orthogonale pour $\theta\neq 0$ : sa première colonne $(1,\theta,0)$ n'est pas unitaire.`,
      },
      {
        conclusion: 'x-axe',
        verdict: 'incorrect',
        concept: 'calcul-exact',
        message: t`L'axe fixé est $e_3$, pas $e_1$.`,
        counterexample: t`Pour $\theta=\frac\pi2$, $e_1\mapsto e_2$.`,
      },
    ],
    removable: [],
  },
  solution: t`$\widehat{e_3}=\begin{pmatrix}0&-1&0\\1&0&0\\0&0&0\end{pmatrix}$ et $\widehat{e_3}^{\,2}=\operatorname{diag}(-1,-1,0)=e_3e_3^{\mathsf T}-I$. La formule de Rodrigues donne
$$\exp(\theta\widehat{e_3})=I+\sin\theta\,\widehat{e_3}+(1-\cos\theta)\widehat{e_3}^{\,2}=\begin{pmatrix}\cos\theta&-\sin\theta&0\\ \sin\theta&\cos\theta&0\\0&0&1\end{pmatrix},$$
la rotation d'angle $\theta$ autour de $e_3$. Pour $\theta=\frac\pi2$, la première colonne est $e_2$ : $e_1\mapsto e_2$.`,
  steps: [t`Matrice de $\widehat{e_3}$ et son carré.`, 'Formule de Rodrigues.', t`Évaluation en $\frac\pi2$.`],
  commonErrors: [
    { id: 'e-ordre1', description: 'Tronquer l’exponentielle à l’ordre 1.', concept: 'calcul-exact' },
    { id: 'e-axe', description: 'Se tromper d’axe de rotation.', concept: 'calcul-exact' },
  ],
  hints: [t`Écris $\widehat{e_3}$ à partir de $\widehat{e_3}v=e_3\times v$.`, t`Calcule $\widehat{e_3}^{\,2}$ et applique Rodrigues.`, 'La première colonne de la matrice est l’image de e₁.'],
  rubric: rubric({
    hypotheses: 'L’axe est unitaire, condition de la formule.',
    methode: 'Calcul du chapeau et de son carré, puis Rodrigues.',
    validite: 'La matrice obtenue est exacte.',
    justifications: 'L’évaluation en π/2 est justifiée.',
    conclusion: 'La rotation et l’image de e₁ sont conclues.',
  }),
  variant: {
    statement: t`Vérifier que $\exp(\pi\widehat{e_1})=\operatorname{diag}(1,-1,-1)$.`,
    solution: t`$\widehat{e_1}^{\,2}=\operatorname{diag}(0,-1,-1)$ ; Rodrigues en $\theta=\pi$ donne $I+0\cdot\widehat{e_1}+2\widehat{e_1}^{\,2}=\operatorname{diag}(1,-1,-1)$, la rotation d'angle $\pi$ autour de $e_1$.`,
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h', kind: 'hypothese', text: t`$\widehat{e_1}=\begin{pmatrix}0&0&0\\0&0&-1\\0&1&0\end{pmatrix}$.` },
        { id: 'carre', kind: 'egalite', text: t`$\widehat{e_1}^{\,2}=\operatorname{diag}(0,-1,-1)$.` },
        { id: 'fin', kind: 'conclusion', text: t`$\exp(\pi\widehat{e_1})=I+2\widehat{e_1}^{\,2}=\operatorname{diag}(1,-1,-1)$.` },
        { id: 'x-moinsI', kind: 'egalite', distractor: true, text: t`$\exp(\pi\widehat{e_1})=-I$.` },
      ],
      justifications: [
        { id: 'j-carre', label: 'Produit matriciel.' },
        { id: 'j-rod', label: t`Rodrigues avec $\sin\pi=0$, $1-\cos\pi=2$.`, theorem: 'rodrigues' },
      ],
      rules: [
        { from: ['h'], to: 'carre', by: 'j-carre' },
        { from: ['carre'], to: 'fin', by: 'j-rod' },
      ],
      traps: [
        {
          conclusion: 'x-moinsI',
          verdict: 'incorrect',
          concept: 'calcul-exact',
          message: t`$-I$ n'est pas une rotation de $\mathbb R^3$ : son déterminant vaut $-1$.`,
          counterexample: t`$\det(-I_3)=-1$, et l'axe $e_1$ doit être fixé.`,
        },
      ],
      removable: [],
    },
  },
  verification: FROM_LIE,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'rodrigues.intermediaire',
  theoremId: 'rodrigues',
  level: 'intermediaire',
  title: 'Le crochet de so(3) est le produit vectoriel',
  statement: t`Montrer que $[\widehat\omega,\widehat\eta]=\widehat{\omega\times\eta}$ pour tous $\omega,\eta\in\mathbb R^3$, en appliquant les deux membres à un vecteur $v$. En déduire $[\widehat{e_1},\widehat{e_2}]=\widehat{e_3}$, et l'isomorphisme d'algèbres de Lie $(\mathbb R^3,\times)\simeq\mathfrak{so}(3)$.`,
  source: lie(115, 'Proposition 31.1'),
  prerequisites: [],
  concepts: ['lie-crochet-convention', 'calcul-exact', 'justification-absente'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-chapeau', kind: 'hypothese', text: t`$\widehat\omega v=\omega\times v$ ; $\omega\mapsto\widehat\omega$ est linéaire et injective de $\mathbb R^3$ dans $\mathfrak{so}(3)$.` },
      { id: 'h-v', kind: 'hypothese', local: true, text: t`Soit $v\in\mathbb R^3$.` },
      { id: 'deplie', kind: 'egalite', text: t`$[\widehat\omega,\widehat\eta]v=\omega\times(\eta\times v)-\eta\times(\omega\times v)$.` },
      { id: 'double', kind: 'egalite', text: t`$=\eta(\omega\cdot v)-v(\omega\cdot\eta)-\omega(\eta\cdot v)+v(\eta\cdot\omega)=\eta(\omega\cdot v)-\omega(\eta\cdot v)$.` },
      { id: 'refolde', kind: 'egalite', text: t`$=(\omega\times\eta)\times v$.` },
      { id: 'identite', kind: 'egalite', text: t`$[\widehat\omega,\widehat\eta]=\widehat{\omega\times\eta}$.` },
      {
        id: 'base',
        kind: 'egalite',
        text: t`$[\widehat{e_1},\widehat{e_2}]=\widehat{e_1\times e_2}=\widehat{e_3}$.`,
        masked: t`Vecteur $e_1\times e_2$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Coordonnées de $e_1\times e_2$`, expected: ['0', '0', '1'] },
      },
      { id: 'fin', kind: 'conclusion', text: t`Le chapeau est un isomorphisme d'algèbres de Lie $(\mathbb R^3,\times)\to(\mathfrak{so}(3),[\cdot,\cdot])$.` },
      { id: 'x-commute', kind: 'egalite', distractor: true, text: t`$[\widehat\omega,\widehat\eta]=0$ car deux matrices antisymétriques commutent.` },
      { id: 'x-signe', kind: 'egalite', distractor: true, text: t`$[\widehat\omega,\widehat\eta]=\widehat{\eta\times\omega}$.` },
    ],
    justifications: [
      { id: 'j-def', label: t`Définition du chapeau et du commutateur $AB-BA$.` },
      { id: 'j-double', label: t`Double produit vectoriel : $a\times(b\times c)=b(a\cdot c)-c(a\cdot b)$.` },
      { id: 'j-refolde', label: t`Même formule lue à l'envers : $(\omega\times\eta)\times v=\eta(\omega\cdot v)-\omega(\eta\cdot v)$.` },
      { id: 'j-v-arbitraire', label: 'Deux matrices qui coïncident sur tout vecteur sont égales.' },
      { id: 'j-base', label: t`$e_1\times e_2=e_3$.` },
      { id: 'j-iso', label: 'Linéarité, bijectivité (dimensions 3) et compatibilité des crochets.' },
      { id: 'j-anti-commute', label: 'Deux matrices antisymétriques commutent.' },
    ],
    rules: [
      { from: ['h-chapeau', 'h-v'], to: 'deplie', by: 'j-def' },
      { from: ['deplie'], to: 'double', by: 'j-double' },
      { from: ['double'], to: 'refolde', by: 'j-refolde' },
      { from: ['refolde', 'h-v'], to: 'identite', by: 'j-v-arbitraire' },
      { from: ['identite'], to: 'base', by: 'j-base' },
      { from: ['identite', 'h-chapeau', 'base'], to: 'fin', by: 'j-iso' },
    ],
    traps: [
      {
        conclusion: 'x-commute',
        verdict: 'incorrect',
        concept: 'lie-crochet-commutation',
        message: 'so(3) n’est pas abélienne.',
        counterexample: t`$[\widehat{e_1},\widehat{e_2}]=\widehat{e_3}\neq 0$.`,
      },
      {
        conclusion: 'x-commute',
        by: 'j-anti-commute',
        verdict: 'incorrect',
        concept: 'lie-crochet-commutation',
        message: 'Cette règle est fausse en dimension 3.',
      },
      {
        conclusion: 'x-signe',
        verdict: 'incorrect',
        concept: 'lie-crochet-convention',
        message: 'L’ordre compte : η × ω = −ω × η.',
        counterexample: t`Pour $\omega=e_1$, $\eta=e_2$ : on obtiendrait $[\widehat{e_1},\widehat{e_2}]=-\widehat{e_3}$, contredit par le calcul direct.`,
      },
    ],
    removable: [],
  },
  solution: t`Pour tout $v$ : $[\widehat\omega,\widehat\eta]v=\omega\times(\eta\times v)-\eta\times(\omega\times v)$. Par le double produit vectoriel, cela vaut $\eta(\omega\cdot v)-v(\omega\cdot\eta)-\omega(\eta\cdot v)+v(\eta\cdot\omega)=\eta(\omega\cdot v)-\omega(\eta\cdot v)$, qui est $(\omega\times\eta)\times v$. Les deux matrices coïncident sur tout vecteur : $[\widehat\omega,\widehat\eta]=\widehat{\omega\times\eta}$. Avec $e_1\times e_2=e_3$ : $[\widehat{e_1},\widehat{e_2}]=\widehat{e_3}$. Le chapeau, linéaire et bijectif, transporte donc le produit vectoriel sur le commutateur.`,
  steps: ['Appliquer le commutateur à v.', 'Double produit vectoriel.', 'Reconnaître (ω × η) × v.', 'Conclure et spécialiser à la base.'],
  commonErrors: [
    { id: 'e-commute', description: 'Croire so(3) abélienne.', concept: 'lie-crochet-commutation' },
    { id: 'e-ordre', description: 'Inverser l’ordre du produit vectoriel.', concept: 'lie-crochet-convention' },
  ],
  hints: [t`Calcule $[\widehat\omega,\widehat\eta]v$ en remplaçant chaque chapeau par un produit vectoriel.`, t`Utilise $a\times(b\times c)=b(a\cdot c)-c(a\cdot b)$ deux fois.`, t`Il reste $\eta(\omega\cdot v)-\omega(\eta\cdot v)$ : reconnais un double produit.`],
  rubric: rubric({
    hypotheses: 'Le vecteur v est arbitraire, ce qui justifie l’égalité des matrices.',
    methode: 'Évaluation sur un vecteur, double produit vectoriel.',
    validite: 'Les termes en v(ω·η) se compensent correctement.',
    justifications: 'La formule du double produit est citée.',
    conclusion: 'L’identité et l’isomorphisme d’algèbres de Lie sont conclus.',
  }),
  variant: {
    statement: t`Vérifier directement $[\widehat{e_1},\widehat{e_2}]=\widehat{e_3}$ par produit matriciel.`,
    solution: t`$\widehat{e_1}\widehat{e_2}=\begin{pmatrix}0&0&0\\1&0&0\\0&0&0\end{pmatrix}$ et $\widehat{e_2}\widehat{e_1}=\begin{pmatrix}0&1&0\\0&0&0\\0&0&0\end{pmatrix}$ ; leur différence est $\widehat{e_3}$.`,
  },
  verification: FROM_LIE,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'rodrigues.difficile',
  theoremId: 'rodrigues',
  level: 'difficile',
  title: 'Démontrer la formule de Rodrigues, puis l’appliquer',
  statement: t`Pour $u\in S^2$, montrer $\widehat u^{\,2}=uu^{\mathsf T}-I$ et $\widehat u^{\,3}=-\widehat u$, en déduire $\exp(\theta\widehat u)=I+\sin\theta\,\widehat u+(1-\cos\theta)\widehat u^{\,2}$, puis calculer l'image de $e_1$ par la rotation d'axe $u=\frac1{\sqrt3}(1,1,1)$ et d'angle $\frac{2\pi}3$.`,
  source: lie(116, 'Rodrigues, § 31.3'),
  prerequisites: [],
  concepts: ['calcul-exact', 'lie-exp-globale', 'justification-absente'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-u', kind: 'hypothese', text: t`$u\in\mathbb R^3$, $\|u\|=1$, et $\widehat uv=u\times v$.` },
      { id: 'carre', kind: 'egalite', text: t`$\widehat u^{\,2}v=u\times(u\times v)=u(u\cdot v)-v$, donc $\widehat u^{\,2}=uu^{\mathsf T}-I$.` },
      { id: 'cube', kind: 'egalite', text: t`$\widehat u^{\,3}=\widehat u(uu^{\mathsf T}-I)=-\widehat u$, puisque $\widehat uu=u\times u=0$.` },
      { id: 'puissances', kind: 'egalite', text: t`$\widehat u^{\,2k+1}=(-1)^k\widehat u$ et $\widehat u^{\,2k+2}=(-1)^k\widehat u^{\,2}$ pour $k\ge0$.` },
      { id: 'formule', kind: 'egalite', text: t`$\exp(\theta\widehat u)=I+\Big(\sum_k\frac{(-1)^k\theta^{2k+1}}{(2k+1)!}\Big)\widehat u+\Big(\sum_k\frac{(-1)^k\theta^{2k+2}}{(2k+2)!}\Big)\widehat u^{\,2}=I+\sin\theta\,\widehat u+(1-\cos\theta)\widehat u^{\,2}$.` },
      { id: 'vecteur', kind: 'egalite', text: t`$R_{u,\theta}v=\cos\theta\,v+(1-\cos\theta)(u\cdot v)u+\sin\theta\,(u\times v)$.` },
      {
        id: 'application',
        kind: 'egalite',
        text: t`Pour $u=\frac1{\sqrt3}(1,1,1)$, $\theta=\frac{2\pi}3$ : $R\,e_1=e_2$.`,
        masked: t`Coordonnées de $R\,e_1$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Coordonnées de $R\,e_1$`, expected: ['0', '1', '0'] },
      },
      { id: 'fin', kind: 'conclusion', text: t`La formule de Rodrigues est établie ; la rotation d'axe $(1,1,1)$ et d'angle $\frac{2\pi}3$ permute circulairement $e_1\mapsto e_2$.` },
      { id: 'x-cube', kind: 'egalite', distractor: true, text: t`$\widehat u^{\,3}=\widehat u$.` },
      { id: 'x-unit', kind: 'egalite', distractor: true, text: t`La formule vaut pour tout $u\neq 0$, sans normalisation.` },
    ],
    justifications: [
      { id: 'j-double', label: t`Double produit vectoriel et $u\cdot u=1$.` },
      { id: 'j-cube', label: t`$\widehat u\,uu^{\mathsf T}=(u\times u)u^{\mathsf T}=0$.` },
      { id: 'j-rec', label: 'Récurrence à partir de û³ = −û.' },
      { id: 'j-serie', label: 'Regrouper la série exponentielle (absolument convergente) selon la parité des puissances.' },
      { id: 'j-vecteur', label: t`Appliquer à $v$ : $\widehat u^{\,2}v=(u\cdot v)u-v$.` },
      { id: 'j-application', label: t`$\cos\frac{2\pi}3=-\frac12$, $\sin\frac{2\pi}3=\frac{\sqrt3}2$, $u\cdot e_1=\frac1{\sqrt3}$, $u\times e_1=\frac1{\sqrt3}(0,1,-1)$.` },
      { id: 'j-syn', label: 'Conclusion.' },
    ],
    rules: [
      { from: ['h-u'], to: 'carre', by: 'j-double' },
      { from: ['carre', 'h-u'], to: 'cube', by: 'j-cube' },
      { from: ['cube'], to: 'puissances', by: 'j-rec' },
      { from: ['puissances'], to: 'formule', by: 'j-serie' },
      { from: ['formule', 'carre'], to: 'vecteur', by: 'j-vecteur' },
      { from: ['vecteur'], to: 'application', by: 'j-application' },
      { from: ['formule', 'application'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-cube',
        verdict: 'incorrect',
        concept: 'calcul-exact',
        message: t`Le signe est essentiel : $\widehat u^{\,3}=-\widehat u$, ce qui fait apparaître sinus et cosinus.`,
        counterexample: t`Pour $u=e_3$ : $\widehat{e_3}^{\,3}e_1=\widehat{e_3}^{\,2}e_2=-e_2=-\widehat{e_3}e_1$.`,
      },
      {
        conclusion: 'x-unit',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`La relation $\widehat u^{\,2}=uu^{\mathsf T}-I$ exige $\|u\|=1$ ; pour $\omega=\theta u$, on applique la formule à l'axe unitaire.`,
        counterexample: t`Pour $u=2e_3$ : $\widehat u^{\,2}=4\,\widehat{e_3}^{\,2}\neq uu^{\mathsf T}-I=\operatorname{diag}(-1,-1,3)$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-u',
        label: t`Ne plus supposer $\|u\|=1$`,
        necessary: true,
        explanation: 'Le calcul de û² utilise u · u = 1.',
        counterexample: t`Pour $u=2e_3$, $\widehat u^{\,3}=-4\widehat u$, et la série ne se replie plus en $\sin\theta$, $1-\cos\theta$.`,
      },
    ],
  },
  solution: t`**Puissances.** $\widehat u^{\,2}v=u\times(u\times v)=u(u\cdot v)-v$ (car $u\cdot u=1$), donc $\widehat u^{\,2}=uu^{\mathsf T}-I$. Comme $\widehat uu=0$, $\widehat u^{\,3}=\widehat u(uu^{\mathsf T}-I)=-\widehat u$, puis par récurrence $\widehat u^{\,2k+1}=(-1)^k\widehat u$, $\widehat u^{\,2k+2}=(-1)^k\widehat u^{\,2}$.

**Série.** En regroupant selon la parité :
$$\exp(\theta\widehat u)=I+\sin\theta\,\widehat u+(1-\cos\theta)\widehat u^{\,2},$$
soit $R_{u,\theta}v=\cos\theta\,v+(1-\cos\theta)(u\cdot v)u+\sin\theta\,(u\times v)$.

**Application.** $u=\frac1{\sqrt3}(1,1,1)$, $\theta=\frac{2\pi}3$, $v=e_1$ : $u\cdot e_1=\frac1{\sqrt3}$ et $u\times e_1=\frac1{\sqrt3}(0,1,-1)$. Donc $Re_1=-\frac12e_1+\frac32\cdot\frac13(1,1,1)+\frac{\sqrt3}2\cdot\frac1{\sqrt3}(0,1,-1)=(0,1,0)=e_2$.`,
  steps: ['û² = uuᵀ − I.', 'û³ = −û et récurrence.', 'Séparation de la série.', 'Application à e₁.'],
  commonErrors: [
    { id: 'e-cube', description: 'Oublier le signe dans û³ = −û.', concept: 'calcul-exact' },
    { id: 'e-unit', description: 'Appliquer la formule à un axe non normalisé.', concept: 'hypotheses-theoreme' },
  ],
  hints: [t`Calcule $\widehat u^{\,2}v$ par le double produit vectoriel, en utilisant $\|u\|=1$.`, t`Que vaut $\widehat u\,u$ ? Déduis-en $\widehat u^{\,3}$.`, t`Regroupe la série selon la parité ; pour l'application, calcule $u\cdot e_1$ et $u\times e_1$.`],
  rubric: rubric({
    hypotheses: 'La normalisation de u est utilisée.',
    methode: 'Récurrence sur les puissances, puis séparation de la série.',
    validite: 'Les signes et l’application numérique sont exacts.',
    justifications: 'Le double produit vectoriel est cité.',
    conclusion: 'La formule et l’image de e₁ sont conclues.',
  }),
  variant: {
    statement: t`Montrer que $\exp:\mathfrak{so}(3)\to SO(3)$ est surjective.`,
    solution: t`Toute rotation $R\in SO(3)$ admet un axe unitaire $u$ (vecteur propre de valeur propre $1$) et un angle $\theta$ ; par Rodrigues, $R=\exp(\theta\widehat u)$.`,
  },
  verification: FROM_LIE,
};

const mod: TheoremModule = {
  theorem: {
    id: 'rodrigues',
    spaces: [t`$\mathbb R^3$ euclidien orienté, $SO(3)$, $\mathfrak{so}(3)$.`],
    hypotheses: [{ id: 'unitaire', text: t`$u\in S^2$ (axe unitaire), $\theta\in\mathbb R$.`, whenRemoved: t`Pour un axe non normalisé, $\widehat u^{\,2}\neq uu^{\mathsf T}-I$ et la formule est fausse.` }],
    statement: t`Le chapeau $\omega\mapsto\widehat\omega$, $\widehat\omega v=\omega\times v$, est un isomorphisme d'algèbres de Lie $(\mathbb R^3,\times)\to\mathfrak{so}(3)$ : $[\widehat\omega,\widehat\eta]=\widehat{\omega\times\eta}$. Pour $u\in S^2$ : $\exp(\theta\widehat u)=I+\sin\theta\,\widehat u+(1-\cos\theta)\widehat u^{\,2}$, rotation d'axe $u$ et d'angle $\theta$.`,
    conclusions: {
      autre: 'Toute rotation s’écrit exp(θû) : l’exponentielle de so(3) est surjective.',
    },
    sourceProof: 'complete',
    proofOutline: [
      'Le crochet se calcule sur un vecteur avec le double produit vectoriel.',
      'û² = uuᵀ − I et û³ = −û replient la série exponentielle en sinus et cosinus.',
    ],
    warnings: [
      'L’axe doit être unitaire ; pour ω = θu, on sépare angle et axe.',
      'Rodrigues n’est pas I + θû : la série se replie, elle ne s’arrête pas.',
      'L’angle θ et θ + 2π donnent la même rotation : exp n’est pas injective.',
    ],
    usefulFor: 'Paramétrer les rotations par axe–angle, calculer des orientations, préparer le revêtement par SU(2).',
    verification: FROM_LIE,
  },
  definitions: [
    { id: 'def-chapeau', term: 'Application chapeau', statement: t`$\widehat\omega=\begin{pmatrix}0&-\omega_3&\omega_2\\ \omega_3&0&-\omega_1\\-\omega_2&\omega_1&0\end{pmatrix}$, de sorte que $\widehat\omega v=\omega\times v$.`, source: lie(115, '§ 31.1') },
  ],
  concepts: [],
  counterexamples: [
    {
      id: 'ce-rodrigues-ordre1',
      theoremId: 'rodrigues',
      title: 'L’exponentielle n’est pas tronquée à l’ordre 1',
      claim: t`$\exp(\theta\widehat u)=I+\theta\widehat u$ pour tout $\theta$.`,
      correctStatement: t`$\exp(\theta\widehat u)=I+\sin\theta\,\widehat u+(1-\cos\theta)\widehat u^{\,2}$ pour $\|u\|=1$.`,
      task: t`Pour $u=e_3$ et $\theta=\pi$, donner le coefficient $(1,1)$ de $\exp(\theta\widehat u)$.`,
      check: { kind: 'rational', prompt: t`Coefficient $(1,1)$ de $\exp(\pi\widehat{e_3})$`, expected: '-1' },
      explanation: t`Rodrigues donne $\cos\pi=-1$, alors que $I+\pi\widehat{e_3}$ a pour coefficient $(1,1)$ la valeur $1$.`,
      concept: 'calcul-exact',
      source: lie(116, '§ 31.3'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default mod;
