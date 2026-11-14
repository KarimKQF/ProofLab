/**
 * Résultat 38 — Orbite–stabilisateur (cours de géométrie de Lie, § 21, p. PDF 91–93).
 * Proposition 21.2 (stabilisateur fermé) et théorème 21.3 (G/G_x → G·x bijective) sont
 * démontrés dans le cours ; la structure différentielle de l'orbite est admise.
 */
import { t, rubric, lie, FROM_LIE, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'orbite-stabilisateur.facile',
  theoremId: 'orbite-stabilisateur',
  level: 'facile',
  title: t`Orbite et stabilisateur d'un vecteur sous $SO(3)$`,
  statement: t`$SO(3)$ agit sur $\mathbb R^3$ par $g\cdot x=gx$. Pour $x\neq 0$, déterminer l'orbite $SO(3)\cdot x$ et le stabilisateur $G_x$, puis vérifier la cohérence des dimensions dans $S^2_{\|x\|}\simeq SO(3)/SO(2)$.`,
  source: lie(92, 'Exercice 21.4'),
  prerequisites: [],
  concepts: ['lie-orbite-quotient', 'hypotheses-theoreme', 'calcul-exact'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-action', kind: 'hypothese', text: t`$SO(3)$ agit sur $\mathbb R^3$ par $g\cdot x=gx$, et $x\neq 0$.` },
      { id: 'norme', kind: 'inclusion', text: t`$SO(3)\cdot x\subset S^2_{\|x\|}=\{y:\|y\|=\|x\|\}$.` },
      { id: 'trans', kind: 'inclusion', text: t`$S^2_{\|x\|}\subset SO(3)\cdot x$.` },
      { id: 'orbite', kind: 'egalite', text: t`$SO(3)\cdot x=S^2_{\|x\|}$.` },
      { id: 'stab', kind: 'egalite', text: t`$G_x$ est le groupe des rotations d'axe $\mathbb Rx$, isomorphe à $SO(2)$.` },
      { id: 'thm', kind: 'application-theoreme', text: t`$S^2_{\|x\|}\simeq SO(3)/SO(2)$ par $gG_x\mapsto gx$.` },
      {
        id: 'dims',
        kind: 'egalite',
        text: t`$\dim SO(3)-\dim SO(2)=3-1=2=\dim S^2$.`,
        masked: t`$\dim SO(3)-\dim SO(2)$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\dim SO(3)-\dim SO(2)$`, expected: '2' },
      },
      { id: 'fin', kind: 'conclusion', text: t`L'orbite est la sphère de rayon $\|x\|$, le stabilisateur est $SO(2)$, et la sphère est l'espace homogène $SO(3)/SO(2)$.` },
      { id: 'x-libre', kind: 'consequence', distractor: true, text: t`L'action est libre : $G_x=\{I\}$.` },
      { id: 'x-groupe', kind: 'consequence', distractor: true, after: ['orbite'], text: t`L'orbite est en bijection avec $SO(3)$, par $g\mapsto gx$.` },
    ],
    justifications: [
      { id: 'j-iso', label: t`Une rotation est une isométrie : $\|gx\|=\|x\|$.` },
      { id: 'j-trans', label: t`Pour $\|y\|=\|x\|$, compléter $x/\|x\|$ et $y/\|y\|$ en bases orthonormées directes ; la matrice de passage est une rotation qui envoie $x$ sur $y$.` },
      { id: 'j-double', label: 'Double inclusion.' },
      { id: 'j-stab', label: t`Une rotation qui fixe $x$ préserve $x^\perp$ et son orientation : c'est une rotation de ce plan, et réciproquement.` },
      { id: 'j-thm', label: 'Orbite–stabilisateur.', theorem: 'orbite-stabilisateur' },
      { id: 'j-dims', label: t`$\dim SO(3)=3$, $\dim SO(2)=1$, $\dim S^2=2$.` },
      { id: 'j-syn', label: 'Réunion des résultats.' },
    ],
    rules: [
      { from: ['h-action'], to: 'norme', by: 'j-iso' },
      { from: ['h-action'], to: 'trans', by: 'j-trans' },
      { from: ['norme', 'trans'], to: 'orbite', by: 'j-double' },
      { from: ['h-action'], to: 'stab', by: 'j-stab' },
      { from: ['orbite', 'stab'], to: 'thm', by: 'j-thm' },
      { from: ['thm'], to: 'dims', by: 'j-dims' },
      { from: ['orbite', 'stab', 'thm', 'dims'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-libre',
        verdict: 'incorrect',
        concept: 'lie-orbite-quotient',
        message: 'L’action est transitive sur chaque sphère mais pas libre : les rotations autour de l’axe de x fixent x.',
        counterexample: t`La rotation d'angle $\pi$ autour de $\mathbb Rx$ fixe $x$ et n'est pas l'identité.`,
      },
      {
        conclusion: 'x-groupe',
        verdict: 'incorrect',
        concept: 'lie-orbite-quotient',
        message: t`$g\mapsto gx$ n'est pas injective : l'orbite est en bijection avec $G/G_x$, pas avec $G$.`,
        counterexample: t`Les dimensions diffèrent : $\dim SO(3)=3$ et $\dim S^2=2$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-action',
        label: t`Prendre $x=0$`,
        necessary: true,
        explanation: 'Pour x = 0, l’orbite est réduite à un point et le stabilisateur est tout le groupe.',
        counterexample: t`$SO(3)\cdot 0=\{0\}$ et $G_0=SO(3)$ : $SO(3)/SO(3)$ est un point, pas une sphère.`,
      },
    ],
  },
  solution: t`**Orbite.** Une rotation conserve la norme, donc $SO(3)\cdot x\subset S^2_{\|x\|}$. Réciproquement, si $\|y\|=\|x\|$, on complète $x/\|x\|$ et $y/\|y\|$ en deux bases orthonormées directes ; la matrice de passage est une rotation $g$ avec $gx=y$. Donc $SO(3)\cdot x=S^2_{\|x\|}$.

**Stabilisateur.** Une rotation $g$ avec $gx=x$ préserve $x^\perp$ et l'orientation : c'est une rotation du plan $x^\perp$, d'axe $\mathbb Rx$. Donc $G_x\simeq SO(2)$.

**Quotient.** Par orbite–stabilisateur, $gG_x\mapsto gx$ est une bijection $SO(3)/SO(2)\to S^2_{\|x\|}$ ; les dimensions sont cohérentes : $3-1=2$.`,
  steps: ['Inclusion de l’orbite dans la sphère.', 'Transitivité sur la sphère.', 'Stabilisateur : rotations d’axe ℝx.', 'Identification au quotient et dimensions.'],
  commonErrors: [
    { id: 'e-libre', description: 'Croire l’action libre.', concept: 'lie-orbite-quotient' },
    { id: 'e-groupe', description: 'Identifier l’orbite au groupe lui-même.', concept: 'lie-orbite-quotient' },
  ],
  hints: [
    'Que conserve une rotation ? Où l’orbite est-elle donc contenue ?',
    'Pour atteindre tout point de la sphère, construis une rotation à partir de deux bases orthonormées directes.',
    t`Une rotation qui fixe $x$ agit sur le plan $x^\perp$ : quel groupe obtiens-tu ?`,
  ],
  rubric: rubric({
    hypotheses: t`$x\neq 0$ est utilisé.`,
    methode: 'Double inclusion pour l’orbite, description du stabilisateur, puis quotient.',
    validite: 'La rotation envoyant x sur y est construite correctement.',
    justifications: 'Le théorème orbite–stabilisateur est invoqué pour l’identification.',
    conclusion: 'Orbite, stabilisateur et dimensions sont conclus.',
  }),
  variant: {
    statement: t`Déterminer l'orbite et le stabilisateur d'un point $z\neq 0$ de $\mathbb C$ sous l'action de $S^1=\{e^{i\theta}\}$ par multiplication.`,
    solution: t`$|e^{i\theta}z|=|z|$ et tout point du cercle $|w|=|z|$ s'écrit $w=e^{i\theta}z$ : l'orbite est le cercle de rayon $|z|$. Le stabilisateur est $\{1\}$ ($e^{i\theta}z=z\Rightarrow e^{i\theta}=1$) : l'action est libre sur $\mathbb C\setminus\{0\}$ et le cercle s'identifie à $S^1/\{1\}=S^1$.`,
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h-action', kind: 'hypothese', text: t`$S^1$ agit sur $\mathbb C$ par multiplication, et $z\neq 0$.` },
        { id: 'orbite', kind: 'egalite', text: t`$S^1\cdot z=\{w:|w|=|z|\}$.` },
        { id: 'stab', kind: 'egalite', text: t`$G_z=\{1\}$.` },
        { id: 'fin', kind: 'conclusion', text: t`L'orbite est le cercle de rayon $|z|$, en bijection avec $S^1/\{1\}=S^1$.` },
        { id: 'x-stab', kind: 'egalite', distractor: true, text: t`$G_z=\{1,-1\}$.` },
      ],
      justifications: [
        { id: 'j-orbite', label: t`$|e^{i\theta}z|=|z|$, et $w=\frac{w}{z}\,z$ avec $|w/z|=1$.` },
        { id: 'j-stab', label: t`$e^{i\theta}z=z$ et $z\neq 0$ donnent $e^{i\theta}=1$.` },
        { id: 'j-thm', label: 'Orbite–stabilisateur.', theorem: 'orbite-stabilisateur' },
      ],
      rules: [
        { from: ['h-action'], to: 'orbite', by: 'j-orbite' },
        { from: ['h-action'], to: 'stab', by: 'j-stab' },
        { from: ['orbite', 'stab'], to: 'fin', by: 'j-thm' },
      ],
      traps: [
        {
          conclusion: 'x-stab',
          verdict: 'incorrect',
          concept: 'lie-orbite-quotient',
          message: t`$-1$ envoie $z$ sur $-z\neq z$.`,
          counterexample: t`$(-1)\cdot 1=-1\neq 1$.`,
        },
      ],
      removable: [],
    },
  },
  verification: FROM_LIE,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'orbite-stabilisateur.intermediaire',
  theoremId: 'orbite-stabilisateur',
  level: 'intermediaire',
  title: 'Démontrer le théorème orbite–stabilisateur',
  statement: t`Soit $G$ un groupe topologique agissant continûment sur $M$ et $x\in M$. Montrer que $G_x$ est un sous-groupe fermé de $G$, puis que $\pi_x:G/G_x\to G\cdot x$, $gG_x\mapsto g\cdot x$, est bien définie et bijective.`,
  source: lie(92, 'Proposition 21.2 et théorème 21.3'),
  prerequisites: [],
  concepts: ['lie-orbite-quotient', 'fermeture-espace', 'justification-absente'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-action', kind: 'hypothese', text: t`$G\times M\to M$, $(g,y)\mapsto g\cdot y$, est une action continue : $e\cdot y=y$ et $g\cdot(h\cdot y)=(gh)\cdot y$.` },
      { id: 'h-sep', kind: 'hypothese', text: t`Les points de $M$ sont fermés (par exemple $M$ séparé).` },
      { id: 'sous-groupe', kind: 'consequence', text: t`$G_x$ est un sous-groupe de $G$.` },
      { id: 'ferme', kind: 'consequence', text: t`$G_x=\pi_x^{-1}(\{x\})$, avec $\pi_x(g)=g\cdot x$, est fermé dans $G$.` },
      { id: 'equiv', kind: 'egalite', text: t`$g\cdot x=h\cdot x\iff h^{-1}g\in G_x\iff gG_x=hG_x$.` },
      { id: 'defini', kind: 'consequence', text: t`$\pi_x(gG_x)=g\cdot x$ ne dépend pas du représentant : $\pi_x$ est bien définie.` },
      { id: 'inj', kind: 'consequence', text: t`$\pi_x$ est injective.` },
      { id: 'surj', kind: 'consequence', text: t`$\pi_x$ est surjective sur $G\cdot x$.` },
      { id: 'fin', kind: 'conclusion', text: t`$G_x$ est un sous-groupe fermé et $G/G_x\to G\cdot x$ est une bijection.` },
      { id: 'x-distingue', kind: 'consequence', distractor: true, text: t`$G_x$ est un sous-groupe distingué de $G$, et $G\cdot x$ hérite d'une structure de groupe.` },
    ],
    justifications: [
      { id: 'j-sg', label: t`$e\cdot x=x$ ; si $g\cdot x=h\cdot x=x$, alors $(gh)\cdot x=g\cdot(h\cdot x)=x$ et $g^{-1}\cdot x=g^{-1}\cdot(g\cdot x)=x$.` },
      { id: 'j-ferme', label: t`Image réciproque du fermé $\{x\}$ par l'application continue $g\mapsto g\cdot x$.` },
      { id: 'j-equiv', label: t`Appliquer $h^{-1}$ : $g\cdot x=h\cdot x\iff (h^{-1}g)\cdot x=x$.` },
      { id: 'j-defini', label: t`Sens « $\Leftarrow$ » de l'équivalence.` },
      { id: 'j-inj', label: t`Sens « $\Rightarrow$ » de l'équivalence.` },
      { id: 'j-surj', label: t`Tout point de $G\cdot x$ s'écrit $g\cdot x=\pi_x(gG_x)$.` },
      { id: 'j-syn', label: 'Réunion des propriétés.' },
      { id: 'j-conj', label: t`$G_{g\cdot x}=gG_xg^{-1}=G_x$ pour tout $g$.` },
    ],
    rules: [
      { from: ['h-action'], to: 'sous-groupe', by: 'j-sg' },
      { from: ['h-action', 'h-sep'], to: 'ferme', by: 'j-ferme' },
      { from: ['h-action'], to: 'equiv', by: 'j-equiv' },
      { from: ['equiv'], to: 'defini', by: 'j-defini' },
      { from: ['equiv'], to: 'inj', by: 'j-inj' },
      { from: ['defini'], to: 'surj', by: 'j-surj' },
      { from: ['sous-groupe', 'ferme', 'defini', 'inj', 'surj'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-distingue',
        verdict: 'incorrect',
        concept: 'lie-orbite-quotient',
        message: t`Les stabilisateurs le long d'une orbite sont conjugués, $G_{g\cdot x}=gG_xg^{-1}$, mais pas égaux en général : $G_x$ n'est pas distingué, et $G/G_x$ n'est qu'un ensemble de classes.`,
        counterexample: t`Pour $SO(3)$ agissant sur $S^2$, le stabilisateur du pôle nord est $SO(2)$ d'axe $e_3$, non distingué : le conjuguer donne les rotations d'un autre axe.`,
      },
      {
        conclusion: 'x-distingue',
        by: 'j-conj',
        verdict: 'incorrect',
        concept: 'lie-orbite-quotient',
        message: t`On a seulement $G_{g\cdot x}=gG_xg^{-1}$ ; ce n'est égal à $G_x$ que dans des cas particuliers.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-sep',
        label: 'Ne plus supposer les points de M fermés',
        necessary: true,
        explanation: 'La fermeture du stabilisateur repose sur celle du point x.',
        counterexample: t`$G=\mathbb R$ agit continûment par translation sur $M=\mathbb R/\mathbb Q$, dont la topologie quotient est grossière (les points n'y sont pas fermés) ; le stabilisateur de la classe de $0$ est $\mathbb Q$, qui n'est pas fermé dans $\mathbb R$.`,
      },
    ],
  },
  solution: t`**Sous-groupe.** $e\cdot x=x$. Si $g,h\in G_x$, alors $(gh)\cdot x=g\cdot(h\cdot x)=x$ et $g^{-1}\cdot x=g^{-1}\cdot(g\cdot x)=x$.

**Fermé.** $G_x=\pi_x^{-1}(\{x\})$ où $\pi_x(g)=g\cdot x$ est continue et $\{x\}$ fermé.

**Équivalence clé.** $g\cdot x=h\cdot x\iff(h^{-1}g)\cdot x=x\iff h^{-1}g\in G_x\iff gG_x=hG_x$.

**Bijection.** Le sens « $\Leftarrow$ » montre que $gG_x\mapsto g\cdot x$ est bien définie, le sens « $\Rightarrow$ » qu'elle est injective ; elle est surjective par définition de l'orbite.`,
  steps: ['Sous-groupe.', 'Fermeture par continuité.', 'Équivalence g·x = h·x ⟺ h⁻¹g ∈ G_x.', 'Bonne définition, injectivité, surjectivité.'],
  commonErrors: [
    { id: 'e-distingue', description: 'Croire G_x distingué et munir l’orbite d’une loi de groupe.', concept: 'lie-orbite-quotient' },
    { id: 'e-ferme', description: 'Oublier que la fermeture du stabilisateur utilise celle du point.', concept: 'fermeture-espace' },
  ],
  hints: [
    t`Pour la fermeture, écris $G_x$ comme image réciproque d'un point par une application continue.`,
    t`Pour la bijection, compare $g\cdot x$ et $h\cdot x$ en appliquant $h^{-1}$.`,
    'Une même équivalence donne à la fois la bonne définition et l’injectivité.',
  ],
  rubric: rubric({
    hypotheses: 'La continuité de l’action et la fermeture des points sont utilisées.',
    methode: 'Sous-groupe, fermeture, puis bijection par l’équivalence clé.',
    validite: 'Chaque implication est démontrée dans le bon sens.',
    justifications: 'Bonne définition et injectivité sont distinguées.',
    conclusion: 'La bijection G/G_x → G·x est conclue.',
  }),
  variant: {
    statement: t`Montrer que si $y=g\cdot x$, alors $G_y=gG_xg^{-1}$.`,
    solution: t`$h\in G_y\iff h\cdot(g\cdot x)=g\cdot x\iff(g^{-1}hg)\cdot x=x\iff g^{-1}hg\in G_x\iff h\in gG_xg^{-1}$.`,
  },
  verification: FROM_LIE,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'orbite-stabilisateur.difficile',
  theoremId: 'orbite-stabilisateur',
  level: 'difficile',
  title: 'Orbite par conjugaison d’une matrice diagonale',
  statement: t`$GL(2,\mathbb R)$ agit sur $M_2(\mathbb R)$ par $P\cdot M=PMP^{-1}$. Pour $A=\operatorname{diag}(1,2)$, déterminer le stabilisateur $G_A$, montrer que l'orbite est $\{M:\operatorname{tr}M=3,\ \det M=2\}$, et vérifier que $M=\begin{pmatrix}1&1\\0&2\end{pmatrix}$ en fait partie.`,
  source: lie(92, 'Exemples, § 21.3 (action par conjugaison)'),
  prerequisites: [],
  concepts: ['lie-orbite-quotient', 'calcul-exact', 'quantificateurs'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-action', kind: 'hypothese', text: t`$P\cdot M=PMP^{-1}$, $P\in GL(2,\mathbb R)$, et $A=\operatorname{diag}(1,2)$.` },
      { id: 'centralisateur', kind: 'egalite', text: t`$G_A=\{P:PA=AP\}=\{\text{matrices diagonales inversibles}\}$.` },
      {
        id: 'dim-stab',
        kind: 'egalite',
        text: t`$\dim G_A=2$.`,
        masked: t`Dimension de $G_A$ : à déterminer.`,
        check: { kind: 'rational', prompt: t`Dimension du stabilisateur $G_A$`, expected: '2' },
      },
      { id: 'invariants', kind: 'inclusion', text: t`$G\cdot A\subset\{M:\operatorname{tr}M=3,\ \det M=2\}$.` },
      { id: 'reciproque', kind: 'inclusion', text: t`Si $\operatorname{tr}M=3$ et $\det M=2$, alors $M$ a pour valeurs propres $1$ et $2$, distinctes : $M$ est diagonalisable, donc $M=PAP^{-1}$.` },
      { id: 'orbite', kind: 'egalite', text: t`$G\cdot A=\{M:\operatorname{tr}M=3,\ \det M=2\}$.` },
      {
        id: 'test',
        kind: 'egalite',
        text: t`$M=\begin{pmatrix}1&1\\0&2\end{pmatrix}$ vérifie $(\operatorname{tr}M,\det M)=(3,2)$ ; avec $P=\begin{pmatrix}1&1\\0&1\end{pmatrix}$, $PAP^{-1}=M$.`,
        masked: t`Valeurs de $(\operatorname{tr}M,\det M)$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Valeurs de $(\operatorname{tr}M,\det M)$`, expected: ['3', '2'], labels: ['tr', 'det'] },
      },
      { id: 'quotient', kind: 'application-theoreme', text: t`L'orbite est en bijection avec $GL(2,\mathbb R)/G_A$, de dimension $4-2=2$.` },
      { id: 'fin', kind: 'conclusion', text: t`$G_A$ est le groupe des matrices diagonales inversibles, l'orbite de $A$ est $\{\operatorname{tr}=3,\det=2\}\simeq GL(2,\mathbb R)/G_A$, et $M$ y appartient.` },
      { id: 'x-invariants-suffisent', kind: 'consequence', distractor: true, text: t`Deux matrices de $M_2(\mathbb R)$ de même trace et de même déterminant sont toujours conjuguées.` },
      { id: 'x-stab-scalaire', kind: 'egalite', distractor: true, text: t`$G_A=\{\lambda I:\lambda\neq 0\}$.` },
    ],
    justifications: [
      { id: 'j-centr', label: t`$PA=AP$ avec $A=\operatorname{diag}(1,2)$ : les coefficients non diagonaux vérifient $2p_{12}=p_{12}$ et $p_{21}=2p_{21}$, donc sont nuls.` },
      { id: 'j-dim', label: t`Les matrices diagonales inversibles forment un ouvert de l'espace des diagonales, de dimension $2$.` },
      { id: 'j-inv', label: t`$\operatorname{tr}(PMP^{-1})=\operatorname{tr}M$ et $\det(PMP^{-1})=\det M$.` },
      { id: 'j-recip', label: t`Polynôme caractéristique $X^2-3X+2=(X-1)(X-2)$ : deux valeurs propres distinctes.` },
      { id: 'j-double', label: 'Double inclusion.' },
      { id: 'j-test', label: t`$\operatorname{tr}M=1+2$, $\det M=1\cdot 2-0$ ; vecteurs propres $(1,0)$ et $(1,1)$.` },
      { id: 'j-thm', label: 'Orbite–stabilisateur.', theorem: 'orbite-stabilisateur' },
      { id: 'j-syn', label: 'Réunion des résultats.' },
    ],
    rules: [
      { from: ['h-action'], to: 'centralisateur', by: 'j-centr' },
      { from: ['centralisateur'], to: 'dim-stab', by: 'j-dim' },
      { from: ['h-action'], to: 'invariants', by: 'j-inv' },
      { from: ['h-action'], to: 'reciproque', by: 'j-recip' },
      { from: ['invariants', 'reciproque'], to: 'orbite', by: 'j-double' },
      { from: ['orbite'], to: 'test', by: 'j-test' },
      { from: ['orbite', 'centralisateur', 'dim-stab'], to: 'quotient', by: 'j-thm' },
      { from: ['quotient', 'test'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-invariants-suffisent',
        verdict: 'incorrect',
        concept: 'quantificateurs',
        message: 'Trace et déterminant ne suffisent que si les valeurs propres sont distinctes (ou la matrice diagonalisable).',
        counterexample: t`$I$ et $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ ont trace $2$ et déterminant $1$, mais seule $I$ est conjuguée à $I$.`,
      },
      {
        conclusion: 'x-stab-scalaire',
        verdict: 'incorrect',
        concept: 'calcul-exact',
        message: t`Toute matrice diagonale inversible commute avec $A$, pas seulement les homothéties.`,
        counterexample: t`$\operatorname{diag}(1,5)$ commute avec $\operatorname{diag}(1,2)$ et n'est pas scalaire.`,
      },
    ],
    removable: [],
  },
  solution: t`**Stabilisateur.** $PA=AP$ avec $A=\operatorname{diag}(1,2)$ impose $2p_{12}=p_{12}$ et $p_{21}=2p_{21}$, donc $p_{12}=p_{21}=0$ : $G_A$ est le groupe des matrices diagonales inversibles, de dimension $2$.

**Orbite.** Trace et déterminant sont invariants par conjugaison, donc $G\cdot A\subset\{\operatorname{tr}=3,\det=2\}$. Réciproquement, une telle matrice a pour polynôme caractéristique $(X-1)(X-2)$ : ses valeurs propres sont distinctes, elle est diagonalisable, conjuguée à $A$.

**Test.** $M=\begin{pmatrix}1&1\\0&2\end{pmatrix}$ a trace $3$ et déterminant $2$ ; ses vecteurs propres $(1,0)$, $(1,1)$ donnent $P=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ et $PAP^{-1}=M$.

**Quotient.** Par orbite–stabilisateur, l'orbite est en bijection avec $GL(2,\mathbb R)/G_A$, de dimension $4-2=2$ — cohérent avec deux équations dans $\mathbb R^4$.`,
  steps: ['Centralisateur de A.', 'Invariance de la trace et du déterminant.', 'Réciproque par diagonalisation.', 'Test sur M et identification au quotient.'],
  commonErrors: [
    { id: 'e-invariants', description: 'Croire que trace et déterminant caractérisent toujours la classe de conjugaison.', concept: 'quantificateurs' },
    { id: 'e-scalaire', description: 'Réduire le centralisateur aux homothéties.', concept: 'calcul-exact' },
  ],
  hints: [
    t`Écris $PA=AP$ coefficient par coefficient.`,
    'Quelles quantités la conjugaison préserve-t-elle ? Pour la réciproque, regarde le polynôme caractéristique.',
    t`Pour $M$, cherche les vecteurs propres associés à $1$ et à $2$ : ils forment les colonnes de $P$.`,
  ],
  rubric: rubric({
    hypotheses: 'Les valeurs propres distinctes sont utilisées pour la réciproque.',
    methode: 'Centralisateur, invariants, diagonalisation, quotient.',
    validite: 'Les calculs de centralisateur et de conjugaison sont exacts.',
    justifications: 'La réciproque est justifiée, pas seulement l’inclusion.',
    conclusion: 'Stabilisateur, orbite et appartenance de M sont conclus.',
  }),
  variant: {
    statement: t`Pour l'action de $GL(2,\mathbb R)$ par conjugaison, déterminer le stabilisateur de $N=\begin{pmatrix}0&1\\0&0\end{pmatrix}$.`,
    solution: t`$PN=NP$ avec $P=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ donne $\begin{pmatrix}0&a\\0&c\end{pmatrix}=\begin{pmatrix}c&d\\0&0\end{pmatrix}$, soit $c=0$ et $a=d$ : $G_N=\Big\{\begin{pmatrix}a&b\\0&a\end{pmatrix}:a\neq 0\Big\}$, de dimension $2$.`,
  },
  verification: COMPLEMENT,
};

const mod: TheoremModule = {
  theorem: {
    id: 'orbite-stabilisateur',
    spaces: [t`$G$ groupe topologique (ou de Lie) agissant continûment sur $M$, $x\in M$.`],
    hypotheses: [
      { id: 'action', text: t`$(g,y)\mapsto g\cdot y$ est une action continue.` },
      { id: 'points-fermes', text: t`Les points de $M$ sont fermés.`, whenRemoved: 'Le stabilisateur peut ne pas être fermé.' },
    ],
    statement: t`Le stabilisateur $G_x=\{g:g\cdot x=x\}$ est un sous-groupe fermé de $G$, et $\pi_x:G/G_x\to G\cdot x$, $gG_x\mapsto g\cdot x$, est une bijection. Pour une action lisse d'un groupe de Lie, elle identifie $G/G_x$ à l'orbite munie de sa structure de sous-variété immergée.`,
    conclusions: {
      existence: t`Une bijection naturelle $G/G_x\to G\cdot x$.`,
      autre: t`Stabilisateurs conjugués le long d'une orbite : $G_{g\cdot x}=gG_xg^{-1}$.`,
    },
    sourceProof: 'complete',
    proofOutline: [
      t`$G_x$ est un sous-groupe, image réciproque du point fermé $x$ par $g\mapsto g\cdot x$.`,
      t`$g\cdot x=h\cdot x\iff h^{-1}g\in G_x\iff gG_x=hG_x$ : bonne définition et injectivité.`,
      'La surjectivité est la définition de l’orbite ; la partie différentielle est admise.',
    ],
    warnings: [
      'L’orbite est en bijection avec G/G_x, pas avec G.',
      'G_x n’est pas distingué en général : G/G_x est un ensemble de classes, pas un groupe.',
      'Transitive ne veut pas dire libre : SO(3) agit transitivement sur S² avec des stabilisateurs SO(2).',
    ],
    usefulFor: 'Espaces homogènes (sphères, projectifs, Grassmanniennes), classes de conjugaison, réduction par symétrie.',
    verification: FROM_LIE,
  },
  definitions: [
    { id: 'def-orbite', term: 'Orbite', statement: t`$G\cdot x=\{g\cdot x:g\in G\}$.`, source: lie(91, 'Définition 21.1') },
    { id: 'def-stabilisateur', term: 'Stabilisateur', statement: t`$G_x=\{g\in G:g\cdot x=x\}$.`, source: lie(91, 'Définition 21.1') },
    { id: 'def-action-libre', term: 'Action transitive, libre, fidèle', statement: 'Transitive : une seule orbite. Libre : tous les stabilisateurs sont triviaux. Fidèle : seul e agit comme l’identité sur tout M.', source: lie(92, '§ 21.4') },
  ],
  concepts: [],
  counterexamples: [
    {
      id: 'ce-orbite-groupe',
      theoremId: 'orbite-stabilisateur',
      title: 'L’orbite n’est pas le groupe',
      claim: t`Pour toute action transitive de $G$ sur $M$, l'application $g\mapsto g\cdot x$ est une bijection de $G$ sur $M$.`,
      correctStatement: t`$g\mapsto g\cdot x$ induit une bijection $G/G_x\to M$ ; elle est une bijection de $G$ seulement si l'action est libre.`,
      task: t`Pour $SO(3)$ agissant sur $S^2$, donner la dimension du stabilisateur du pôle nord.`,
      check: { kind: 'rational', prompt: t`Dimension du stabilisateur de $(0,0,1)$`, expected: '1' },
      explanation: t`Le stabilisateur est le groupe des rotations d'axe $e_3$, isomorphe à $SO(2)$, de dimension $1$ : $g\mapsto g\cdot e_3$ n'est pas injective.`,
      concept: 'lie-orbite-quotient',
      source: lie(92, '§ 21.3'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default mod;
