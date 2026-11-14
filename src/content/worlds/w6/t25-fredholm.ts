/**
 * Résultat 25 — Alternative de Fredholm (polycopié, section 6.3, p. PDF 24).
 * Le polycopié n'en donne qu'une idée de preuve : la fiche et les exercices démontrent
 * ce qui l'est réellement (fermeture de l'image, structure des solutions, estimation).
 */
import { t, rubric, poly, complement, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'fredholm.facile',
  theoremId: 'fredholm',
  level: 'facile',
  title: 'La condition d’orthogonalité exacte',
  statement: t`Soit $H$ un espace de Hilbert réel, $K\in\mathcal L(H)$ compact et $f\in H$. Formuler la condition exacte portant sur $f$ pour que $(I-K)u=f$ admette une solution, en justifiant chaque sens. Vérifier ensuite, dans $\mathbb R^2$ euclidien avec $K_0=\begin{pmatrix}1&1\\0&0\end{pmatrix}$, qu'on ne peut pas remplacer $\ker(I-K^*)$ par $\ker(I-K)$.`,
  source: poly(42, 'Exercice 25, facile ; énoncé de la section 6.3 (p. PDF 24)'),
  prerequisites: [],
  concepts: ['fredholm-noyau-adjoint', 'hypotheses-theoreme', 'symetrie-autoadjonction', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'theoreme', label: 'Condition générale appliquée à l’exemple' },
      { id: 'direct', label: 'Calcul direct de l’image dans l’exemple' },
    ],
    nodes: [
      { id: 'h-H', kind: 'hypothese', text: t`$H$ est un espace de Hilbert réel.` },
      { id: 'h-K', kind: 'hypothese', text: t`$K\in\mathcal L(H)$ est compact.` },
      { id: 'h-f', kind: 'hypothese', text: t`$f\in H$ est donné.` },
      { id: 'd-K0', kind: 'definition', text: t`Dans $\mathbb R^2$ euclidien : $K_0=\begin{pmatrix}1&1\\0&0\end{pmatrix}$, donc $I-K_0=\begin{pmatrix}0&-1\\0&1\end{pmatrix}$.` },
      { id: 'h-fini', kind: 'hypothese', text: 'Un opérateur linéaire sur un espace de dimension finie est compact.' },

      { id: 'adj', kind: 'egalite', text: t`$(I-K)^*=I-K^*$.` },
      { id: 'nec', kind: 'consequence', text: t`Si $f=(I-K)u$ et $z\in\ker(I-K^*)$, alors $\langle f,z\rangle=\langle u,(I-K^*)z\rangle=0$.` },
      { id: 'thm', kind: 'application-theoreme', text: t`$\operatorname{Im}(I-K)=\ker(I-K^*)^\perp$.` },
      { id: 'cond', kind: 'consequence', text: t`$(I-K)u=f$ admet une solution si et seulement si $\langle f,z\rangle=0$ pour tout $z\in\ker(I-K^*)$.` },

      { id: 'k-compact', kind: 'consequence', text: t`$K_0$ est compact.` },
      {
        id: 'k-adj',
        kind: 'egalite',
        text: t`$K_0^*=K_0^{\mathsf T}=\begin{pmatrix}1&0\\1&0\end{pmatrix}$.`,
        masked: t`Matrice de $K_0^*$ : à calculer.`,
        check: {
          kind: 'rational-vector',
          prompt: t`Coefficients de $K_0^*$, ligne par ligne`,
          expected: ['1', '0', '1', '0'],
          labels: ['c₁₁', 'c₁₂', 'c₂₁', 'c₂₂'],
        },
      },
      {
        id: 'k-Nstar',
        kind: 'egalite',
        text: t`$\ker(I-K_0^*)=\operatorname{Vect}\{(1,1)\}$.`,
        masked: t`Générateur de $\ker(I-K_0^*)$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Générateur de $\ker(I-K_0^*)$ de première coordonnée $1$`, expected: ['1', '1'], labels: ['z₁', 'z₂'] },
      },
      {
        id: 'k-N',
        kind: 'egalite',
        text: t`$\ker(I-K_0)=\operatorname{Vect}\{(1,0)\}$.`,
        masked: t`Générateur de $\ker(I-K_0)$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Générateur de $\ker(I-K_0)$ de première coordonnée $1$`, expected: ['1', '0'], labels: ['n₁', 'n₂'] },
      },
      {
        id: 'k-im',
        kind: 'egalite',
        text: t`$\operatorname{Im}(I-K_0)=\operatorname{Vect}\{(1,-1)\}$.`,
        masked: t`Générateur de $\operatorname{Im}(I-K_0)$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Générateur de $\operatorname{Im}(I-K_0)$ de première coordonnée $1$`, expected: ['1', '-1'], labels: ['g₁', 'g₂'] },
      },
      { id: 'k-cond', kind: 'consequence', text: t`$(I-K_0)u=f$ admet une solution si et seulement si $f_1+f_2=0$.` },
      {
        id: 'k-t1',
        kind: 'egalite',
        text: t`$f=(1,-1)$ appartient à $\operatorname{Im}(I-K_0)$, et $\langle f,(1,0)\rangle=1\neq 0$.`,
        masked: t`Pour $f=(1,-1)$ : valeur de $\langle f,(1,0)\rangle$, à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\langle f,(1,0)\rangle$ pour $f=(1,-1)$`, expected: '1' },
      },
      { id: 'k-t2', kind: 'consequence', text: t`$f=(0,1)$ vérifie $\langle f,(1,0)\rangle=0$, mais $f_1+f_2=1\neq 0$ : l'équation n'a pas de solution.` },
      { id: 'faux', kind: 'consequence', text: t`La condition « $f\perp\ker(I-K)$ » n'est ni nécessaire, ni suffisante.` },

      { id: 'fin', kind: 'conclusion', text: t`La condition exacte est $f\perp\ker(I-K^*)$ ; elle ne peut pas être remplacée par $f\perp\ker(I-K)$.` },

      { id: 'x-ker', kind: 'consequence', distractor: true, text: t`$(I-K)u=f$ admet une solution si et seulement si $f\perp\ker(I-K)$.` },
      { id: 'x-toujours', kind: 'consequence', distractor: true, text: t`Comme $K$ est compact, $(I-K)u=f$ admet une solution pour tout $f\in H$.` },
      { id: 'x-egal', kind: 'egalite', distractor: true, after: ['k-N'], text: t`$\ker(I-K^*)=\ker(I-K)$.` },
    ],
    justifications: [
      { id: 'j-adj', label: t`Pour tous $u,v$ : $\langle(I-K)u,v\rangle=\langle u,v\rangle-\langle u,K^*v\rangle$.` },
      { id: 'j-nec', label: t`On fait passer $I-K$ sur le second argument.` },
      { id: 'j-fredholm', label: 'Alternative de Fredholm : identité des images.', theorem: 'fredholm' },
      { id: 'j-cond', label: t`Sens direct par le calcul précédent ; réciproque par l'identité des images.` },
      { id: 'j-fini', label: 'Dimension finie.' },
      { id: 'j-transp', label: 'Adjoint d’une matrice pour le produit euclidien.' },
      { id: 'j-noyau-adj', label: t`Résolution du système $(I-K_0^*)z=0$.` },
      { id: 'j-noyau', label: t`Résolution du système $(I-K_0)n=0$.` },
      { id: 'j-colonnes', label: 'L’image d’une matrice est engendrée par ses colonnes.' },
      { id: 'j-applique', label: t`Condition générale appliquée à l'opérateur compact $K_0$.` },
      { id: 'j-droite', label: t`Équation d'une droite vectorielle de $\mathbb R^2$.` },
      { id: 'j-temoin1', label: t`$f=(I-K_0)(0,-1)$, puis produit scalaire avec le générateur de $\ker(I-K_0)$.` },
      { id: 'j-temoin2', label: t`Produit scalaire avec $(1,0)$, puis critère de l'exemple.` },
      { id: 'j-ni-ni', label: 'Le premier témoin réfute la nécessité, le second la suffisance.' },
      { id: 'j-synthese', label: 'Réunion des résultats établis.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-non-unicite', label: t`Une solution n'est définie qu'à un élément de $\ker(I-K)$ près : c'est donc dans ce noyau que se lit la compatibilité.` },
      { id: 'j-compact-sym', label: 'Un opérateur compact est auto-adjoint.' },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['h-H', 'h-K'], to: 'adj', by: 'j-adj' },
      { from: ['adj'], to: 'nec', by: 'j-nec' },
      { from: ['h-H', 'h-K'], to: 'thm', by: 'j-fredholm' },
      { from: ['thm', 'nec', 'h-f'], to: 'cond', by: 'j-cond' },

      { from: ['d-K0', 'h-fini'], to: 'k-compact', by: 'j-fini' },
      { from: ['d-K0'], to: 'k-adj', by: 'j-transp' },
      { from: ['k-adj'], to: 'k-Nstar', by: 'j-noyau-adj' },
      { from: ['d-K0'], to: 'k-N', by: 'j-noyau' },
      { from: ['d-K0'], to: 'k-im', by: 'j-colonnes' },
      { from: ['cond', 'k-compact', 'k-Nstar'], to: 'k-cond', by: 'j-applique', path: 'theoreme' },
      { from: ['k-im'], to: 'k-cond', by: 'j-droite', path: 'direct' },
      { from: ['k-im', 'k-N'], to: 'k-t1', by: 'j-temoin1' },
      { from: ['k-cond', 'k-N'], to: 'k-t2', by: 'j-temoin2' },
      { from: ['k-t1', 'k-t2'], to: 'faux', by: 'j-ni-ni' },
      { from: ['cond', 'faux'], to: 'fin', by: 'j-synthese' },
    ],
    traps: [
      {
        conclusion: 'x-ker',
        verdict: 'incorrect',
        concept: 'fredholm-noyau-adjoint',
        message: t`L'obstruction se lit dans le noyau de l'adjoint : $\operatorname{Im}(I-K)=\ker(I-K^*)^\perp$, et non $\ker(I-K)^\perp$.`,
        counterexample: t`Avec $K_0$ : $f=(1,-1)=(I-K_0)(0,-1)$ est dans l'image, et n'est pas orthogonal à $(1,0)\in\ker(I-K_0)$.`,
      },
      {
        conclusion: 'x-toujours',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`La compacité donne une image fermée, pas l'image entière : la surjectivité de $I-K$ équivaut à son injectivité, qui peut manquer.`,
        counterexample: t`Avec $K_0$ et $f=(0,1)$ : $f_1+f_2=1\neq 0$, l'équation n'a pas de solution.`,
      },
      {
        conclusion: 'x-egal',
        verdict: 'incorrect',
        concept: 'fredholm-noyau-adjoint',
        message: t`Les noyaux de $I-K$ et de $I-K^*$ n'ont aucune raison de coïncider lorsque $K$ n'est pas auto-adjoint.`,
        counterexample: t`$\ker(I-K_0)=\operatorname{Vect}\{(1,0)\}$ et $\ker(I-K_0^*)=\operatorname{Vect}\{(1,1)\}$.`,
      },
      {
        conclusion: 'cond',
        by: 'j-non-unicite',
        verdict: 'incorrect',
        concept: 'fredholm-noyau-adjoint',
        message: t`$\ker(I-K)$ décrit la non-unicité des solutions ; la compatibilité de $f$ se lit dans $\ker(I-K^*)$.`,
        counterexample: t`Avec $K_0$ : $f=(1,-1)$ est atteint, et $\langle f,(1,0)\rangle=1$.`,
      },
      {
        conclusion: 'k-adj',
        by: 'j-compact-sym',
        verdict: 'incorrect',
        concept: 'symetrie-autoadjonction',
        message: 'La compacité n’entraîne aucune symétrie.',
        counterexample: t`$K_0$ est compact, et $K_0\neq K_0^{\mathsf T}$.`,
      },
      {
        conclusion: 'cond',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: 'Chacun des deux sens se justifie : un calcul pour la nécessité, le théorème pour la suffisance.',
      },
    ],
    removable: [
      {
        hypothesis: 'h-K',
        label: t`Ne plus supposer $K$ compact`,
        necessary: true,
        explanation: t`Sans compacité, l'image peut ne pas être fermée, et la condition d'orthogonalité cesse d'être suffisante.`,
        counterexample: t`Sur $\ell^2$, soit $Tx=(x_n/n)_{n\ge1}$ et $K=I-T$, non compact. Alors $\ker(I-K^*)=\ker T=\{0\}$ : tout $f$ vérifie la condition, mais $(1/n)_n\notin\operatorname{Im}T$.`,
      },
    ],
  },
  closedChecks: [
    {
      kind: 'choice',
      prompt: t`Pour $K$ compact, $(I-K)u=f$ admet une solution si et seulement si :`,
      options: [t`$f\perp\ker(I-K)$`, t`$f\perp\ker(I-K^*)$`, t`$f\in\ker(I-K^*)$`, t`$f\in\operatorname{Im}(I-K^*)$`],
      correct: [1],
      explanation: t`La condition exacte est $f\in\ker(I-K^*)^\perp=\operatorname{Im}(I-K)$.`,
    },
  ],
  solution: t`**Énoncé exact.** Pour $K$ compact sur $H$ et $f\in H$ :
$$(I-K)u=f\ \text{admet une solution}\iff\langle f,z\rangle=0\quad\text{pour tout } z\in\ker(I-K^*).$$

*Nécessité.* Si $f=(I-K)u$ et $(I-K^*)z=0$, alors $\langle f,z\rangle=\langle u,(I-K^*)z\rangle=0$, car $(I-K)^*=I-K^*$.

*Suffisance.* Le théorème donne $\operatorname{Im}(I-K)=\ker(I-K^*)^\perp$ : la compacité sert à la fermeture de l'image.

**Exemple.** $K_0$ est compact, car la dimension est finie, et $K_0^*=K_0^{\mathsf T}=\begin{pmatrix}1&0\\1&0\end{pmatrix}$. On trouve $\ker(I-K_0^*)=\operatorname{Vect}\{(1,1)\}$, d'où la condition $f_1+f_2=0$ ; elle est confirmée par $\operatorname{Im}(I-K_0)=\operatorname{Vect}\{(1,-1)\}$. En revanche $\ker(I-K_0)=\operatorname{Vect}\{(1,0)\}$.

**La condition voisine est fausse.** $f=(1,-1)=(I-K_0)(0,-1)$ est dans l'image, et $\langle f,(1,0)\rangle=1$ : la condition $f\perp\ker(I-K)$ n'est pas nécessaire. $f=(0,1)$ est orthogonal à $(1,0)$, sans être dans l'image : elle n'est pas suffisante.`,
  steps: [
    t`Identifier l'adjoint de $I-K$.`,
    'Démontrer la nécessité par un calcul de produit scalaire.',
    'Obtenir la suffisance par l’identité des images.',
    t`Calculer, pour $K_0$, les deux noyaux et l'image.`,
    'Réfuter la condition voisine par deux témoins.',
  ],
  commonErrors: [
    { id: 'e-noyau', description: t`Écrire la condition avec $\ker(I-K)$ au lieu de $\ker(I-K^*)$.`, concept: 'fredholm-noyau-adjoint' },
    { id: 'e-toujours', description: 'Croire que la compacité rend l’équation toujours résoluble.', concept: 'hypotheses-theoreme' },
    { id: 'e-sym', description: 'Supposer qu’un opérateur compact est auto-adjoint.', concept: 'symetrie-autoadjonction' },
  ],
  hints: [
    t`Quel opérateur apparaît quand on fait passer $I-K$ de l'autre côté d'un produit scalaire ?`,
    t`La nécessité est un calcul d'une ligne ; la suffisance demande l'identité des images. Pour l'exemple, calcule séparément les deux noyaux et l'image.`,
    t`$\ker(I-K_0^*)$ est engendré par $(1,1)$, $\ker(I-K_0)$ par $(1,0)$. Teste $f=(1,-1)$, puis $f=(0,1)$.`,
  ],
  rubric: rubric({
    hypotheses: t`La compacité de $K$ est invoquée pour la suffisance, et vérifiée pour $K_0$.`,
    methode: 'Les deux sens sont distingués : calcul pour la nécessité, théorème pour la suffisance.',
    validite: 'Les noyaux et l’image de l’exemple sont calculés exactement.',
    justifications: 'La confusion entre les deux noyaux est réfutée par des témoins explicites.',
    conclusion: t`La formulation exacte $f\perp\ker(I-K^*)$ est obtenue.`,
  }),
  variant: {
    statement: t`Dans $\mathbb R^2$ euclidien, soit $K_1=\begin{pmatrix}0&2\\0&1\end{pmatrix}$. Déterminer la condition exacte sur $f$ pour que $(I-K_1)u=f$ admette une solution, et montrer que $f\perp\ker(I-K_1)$ n'est pas nécessaire.`,
    solution: t`On a $I-K_1=\begin{pmatrix}1&-2\\0&0\end{pmatrix}$ et $K_1^*=K_1^{\mathsf T}$, donc $I-K_1^*=\begin{pmatrix}1&0\\-2&0\end{pmatrix}$ : $\ker(I-K_1^*)=\operatorname{Vect}\{(0,1)\}$. La condition exacte est $f_2=0$, confirmée par $\operatorname{Im}(I-K_1)=\operatorname{Vect}\{(1,0)\}$. D'autre part, $\ker(I-K_1)=\operatorname{Vect}\{(2,1)\}$ : le vecteur $f=(1,0)$ est dans l'image, mais $\langle f,(2,1)\rangle=2\neq 0$.`,
    closedChecks: [
      { kind: 'rational-vector', prompt: t`Générateur de $\ker(I-K_1^*)$ de seconde coordonnée $1$`, expected: ['0', '1'], labels: ['z₁', 'z₂'] },
      { kind: 'rational', prompt: t`Valeur de $\langle(1,0),(2,1)\rangle$`, expected: '2' },
    ],
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'fredholm.intermediaire',
  theoremId: 'fredholm',
  level: 'intermediaire',
  title: 'Image fermée et identité des images',
  statement: t`Soit $H$ un espace de Hilbert réel, $K\in\mathcal L(H)$ compact et $T=I-K$. Montrer que $T^*=I-K^*$ et $(\operatorname{Im}T)^\perp=\ker T^*$, puis que $\operatorname{Im}T$ est fermée, et en déduire $\operatorname{Im}(I-K)=\ker(I-K^*)^\perp$.`,
  source: poly(42, 'Exercice 25, intermédiaire ; idée de preuve de la section 6.3 (p. PDF 24)'),
  prerequisites: [],
  concepts: ['fredholm-image-fermee', 'fredholm-reduction', 'bornee-non-convergente', 'image-dense-surjective', 'circularite', 'symetrie-autoadjonction'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-H', kind: 'hypothese', text: t`$H$ est un espace de Hilbert réel.` },
      { id: 'h-K', kind: 'hypothese', text: t`$K\in\mathcal L(H)$ est compact ; on pose $T=I-K$.` },

      { id: 'adj', kind: 'egalite', text: t`$T^*=I-K^*$.` },
      { id: 'perp', kind: 'egalite', text: t`$(\operatorname{Im}T)^\perp=\ker T^*$.` },
      { id: 'biortho', kind: 'application-theoreme', text: t`Pour tout sous-espace vectoriel $E$ de $H$ : $(E^\perp)^\perp=\overline E$.` },
      { id: 'adh', kind: 'egalite', text: t`$\overline{\operatorname{Im}T}=(\ker T^*)^\perp$.` },

      { id: 'kerT-ferme', kind: 'consequence', text: t`$\ker T$ est fermé dans $H$.` },
      { id: 'decomp', kind: 'application-theoreme', text: t`$H=\ker T\oplus(\ker T)^\perp$.` },

      { id: 's-suite', kind: 'definition', local: true, text: t`Soit $f\in\overline{\operatorname{Im}T}$, et $(u_n)\subset H$ telle que $Tu_n\to f$.` },
      { id: 'reduc', kind: 'consequence', text: t`Quitte à remplacer $u_n$ par sa composante sur $(\ker T)^\perp$, on peut supposer $u_n\in(\ker T)^\perp$ pour tout $n$.` },

      { id: 'abs', kind: 'definition', local: true, text: t`Supposons $(u_n)$ non bornée : après extraction, $\|u_n\|\to+\infty$ ; on pose $v_n=u_n/\|u_n\|$.` },
      { id: 'abs-Tv', kind: 'consequence', text: t`$\|v_n\|=1$ pour tout $n$, et $Tv_n\to 0$.` },
      { id: 'abs-extract', kind: 'consequence', text: t`Une sous-suite vérifie $Kv_n\to w$ dans $H$.` },
      { id: 'abs-lim', kind: 'consequence', text: t`Le long de cette sous-suite, $v_n=Tv_n+Kv_n\to w$, et $\|w\|=1$.` },
      { id: 'abs-orth', kind: 'consequence', text: t`$w\in(\ker T)^\perp$ et $Tw=0$.` },
      { id: 'abs-contra', kind: 'contradiction', text: t`$w\in\ker T\cap(\ker T)^\perp=\{0\}$, ce qui contredit $\|w\|=1$.` },
      { id: 'bornee', kind: 'consequence', text: t`La suite $(u_n)$ est bornée.` },

      { id: 'extract', kind: 'consequence', text: t`Une sous-suite vérifie $Ku_n\to g$ dans $H$.` },
      { id: 'conv', kind: 'consequence', text: t`Le long de cette sous-suite, $u_n=Tu_n+Ku_n\to f+g=:u$.` },
      { id: 'im', kind: 'egalite', text: t`$Tu=f$, donc $f\in\operatorname{Im}T$.` },
      { id: 'ferme', kind: 'consequence', text: t`$\operatorname{Im}T$ est fermée dans $H$.` },

      { id: 'fin', kind: 'conclusion', text: t`$\operatorname{Im}(I-K)=\overline{\operatorname{Im}(I-K)}=\ker(I-K^*)^\perp$.` },

      { id: 'x-image', kind: 'consequence', distractor: true, text: t`Tout opérateur borné de $H$ dans $H$ a une image fermée.` },
      { id: 'x-borne', kind: 'consequence', distractor: true, after: ['s-suite'], text: t`Toute suite $(u_n)$ telle que $(Tu_n)$ converge est bornée.` },
      { id: 'x-suite', kind: 'consequence', distractor: true, after: ['bornee'], text: t`Toute suite bornée de $H$ admet une sous-suite convergente dans $H$.` },
    ],
    justifications: [
      { id: 'j-adj', label: t`Pour tous $u,v$ : $\langle(I-K)u,v\rangle=\langle u,v\rangle-\langle u,K^*v\rangle$.` },
      { id: 'j-perp', label: t`$v\perp\operatorname{Im}T$ équivaut à $\langle u,T^*v\rangle=0$ pour tout $u\in H$.` },
      { id: 'j-biortho', label: t`Théorème de projection : $H=\overline E\oplus E^\perp$.`, theorem: 'projection' },
      { id: 'j-adh', label: 'Orthogonal des deux membres.' },
      { id: 'j-noyau-ferme', label: t`Image réciproque du fermé $\{0\}$ par l'application continue $T$.` },
      { id: 'j-decomp', label: t`Théorème de projection sur le sous-espace fermé $\ker T$.`, theorem: 'projection' },
      { id: 'j-reduc', label: t`Si $u_n=z_n+y_n$ avec $z_n\in\ker T$ et $y_n\in(\ker T)^\perp$, alors $Ty_n=Tu_n$.` },
      { id: 'j-div', label: t`$Tv_n=Tu_n/\|u_n\|$, où $(Tu_n)$ est bornée car convergente.` },
      { id: 'j-compact', label: t`Compacité de $K$, appliquée à la suite bornée $(v_n)$.` },
      { id: 'j-somme', label: 'Somme de deux suites convergentes, et continuité de la norme.' },
      { id: 'j-ferme-lim', label: t`$(\ker T)^\perp$ est fermé, et $T$ est continu.` },
      { id: 'j-contra', label: t`Un vecteur orthogonal à lui-même est nul.` },
      { id: 'j-absurde', label: 'Raisonnement par l’absurde.' },
      { id: 'j-compact2', label: t`Compacité de $K$, appliquée à la suite bornée $(u_n)$.` },
      { id: 'j-somme2', label: 'Somme de deux suites convergentes.' },
      { id: 'j-cont', label: t`Continuité de $T$ : $Tu=\lim Tu_n$.` },
      { id: 'j-def-ferme', label: t`On a établi $\overline{\operatorname{Im}T}\subset\operatorname{Im}T$.` },
      { id: 'j-fin', label: t`Une image fermée coïncide avec son adhérence ; puis $T^*=I-K^*$.` },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-op-ouverte', label: t`Théorème de l'application ouverte : $T$ induit un isomorphisme de $(\ker T)^\perp$ sur son image.`, theorem: 'application-ouverte' },
      { id: 'j-cont-ferme', label: 'L’image d’un opérateur continu est fermée.' },
      { id: 'j-sym-T', label: t`$\langle Tu,v\rangle=\langle u,Tv\rangle$ pour tous $u,v\in H$.` },
    ],
    rules: [
      { from: ['h-K'], to: 'adj', by: 'j-adj' },
      { from: ['adj'], to: 'perp', by: 'j-perp' },
      { from: ['h-H'], to: 'biortho', by: 'j-biortho' },
      { from: ['perp', 'biortho'], to: 'adh', by: 'j-adh' },

      { from: ['h-K'], to: 'kerT-ferme', by: 'j-noyau-ferme' },
      { from: ['kerT-ferme', 'h-H'], to: 'decomp', by: 'j-decomp' },
      { from: ['s-suite', 'decomp'], to: 'reduc', by: 'j-reduc' },

      { from: ['abs', 's-suite'], to: 'abs-Tv', by: 'j-div' },
      { from: ['abs-Tv', 'h-K'], to: 'abs-extract', by: 'j-compact' },
      { from: ['abs-extract', 'abs-Tv'], to: 'abs-lim', by: 'j-somme' },
      { from: ['abs-lim', 'reduc', 'h-K'], to: 'abs-orth', by: 'j-ferme-lim' },
      { from: ['abs-orth', 'abs-lim'], to: 'abs-contra', by: 'j-contra' },
      { from: ['abs-contra'], to: 'bornee', by: 'j-absurde' },

      { from: ['bornee', 'h-K'], to: 'extract', by: 'j-compact2' },
      { from: ['extract', 's-suite'], to: 'conv', by: 'j-somme2' },
      { from: ['conv', 's-suite'], to: 'im', by: 'j-cont' },
      { from: ['im'], to: 'ferme', by: 'j-def-ferme' },

      { from: ['ferme', 'adh', 'adj'], to: 'fin', by: 'j-fin' },
    ],
    traps: [
      {
        conclusion: 'x-image',
        verdict: 'incorrect',
        concept: 'image-dense-surjective',
        message: 'La continuité ne donne pas la fermeture de l’image : c’est ici la compacité qui la fournit.',
        counterexample: t`Sur $\ell^2$, $Tx=(x_n/n)_{n\ge1}$ est continu ; $y=(1/n)_n$ est limite des images des suites $(1,\dots,1,0,\dots)$, mais $Tx=y$ impose $x_n=1$ pour tout $n$, et $x\notin\ell^2$.`,
      },
      {
        conclusion: 'x-borne',
        verdict: 'incorrect',
        concept: 'fredholm-reduction',
        message: t`Une composante dans $\ker T$ n'est pas vue par $T$ : la bornitude ne vaut qu'après réduction à $(\ker T)^\perp$.`,
        counterexample: t`Si $z\in\ker T$ est non nul (par exemple $K=I$ sur $\mathbb R$ et $z=1$), la suite $u_n=nz$ vérifie $Tu_n=0$ et n'est pas bornée.`,
      },
      {
        conclusion: 'x-suite',
        verdict: 'incorrect',
        concept: 'bornee-non-convergente',
        message: t`En dimension infinie, une suite bornée n'a pas de sous-suite fortement convergente en général : c'est la compacité de $K$ qui fournit l'extraction.`,
        counterexample: t`Une suite orthonormée $(e_n)$ d'un Hilbert de dimension infinie vérifie $\|e_n-e_m\|=\sqrt2$ pour $n\neq m$.`,
      },
      {
        conclusion: 'bornee',
        by: 'j-op-ouverte',
        verdict: 'incorrect',
        concept: 'circularite',
        message: t`Le théorème de l'application ouverte suppose que l'image est un espace de Banach, donc fermée dans $H$ : c'est précisément ce qu'on veut démontrer.`,
      },
      {
        conclusion: 'ferme',
        by: 'j-cont-ferme',
        verdict: 'incorrect',
        concept: 'image-dense-surjective',
        message: 'Cette justification est fausse : un opérateur continu peut avoir une image dense et non fermée.',
        counterexample: t`$Tx=(x_n/n)_{n\ge1}$ sur $\ell^2$ : $(1/n)_n$ est dans l'adhérence de l'image, pas dans l'image.`,
      },
      {
        conclusion: 'perp',
        by: 'j-sym-T',
        verdict: 'incorrect',
        concept: 'symetrie-autoadjonction',
        message: t`$T=I-K$ n'est pas auto-adjoint en général : faire passer $T$ de l'autre côté fait apparaître $T^*$.`,
        counterexample: t`Pour $K=\begin{pmatrix}1&1\\0&0\end{pmatrix}$ sur $\mathbb R^2$ : $T=\begin{pmatrix}0&-1\\0&1\end{pmatrix}\neq T^{\mathsf T}$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-K',
        label: t`Ne plus supposer $K$ compact`,
        necessary: true,
        explanation: t`Sans compacité, ni la bornitude ni l'extraction ne sont disponibles, et l'image peut ne pas être fermée.`,
        counterexample: t`Sur $\ell^2$, pour $K=I-T$ avec $Tx=(x_n/n)_{n\ge1}$ : $K$ n'est pas compact, et $\operatorname{Im}(I-K)=\operatorname{Im}T$ n'est pas fermée.`,
      },
      {
        hypothesis: 'reduc',
        label: t`Ne plus réduire à $(\ker T)^\perp$`,
        necessary: true,
        explanation: 'Le raisonnement par l’absurde ne conduit plus à une contradiction : la limite obtenue peut être un vecteur unitaire du noyau.',
        counterexample: t`Pour $K=I$ sur $\mathbb R$ : $T=0$, et $u_n=n$ vérifie $Tu_n\to 0$ ; normalisée, la suite vaut $1$, qui est dans $\ker T$.`,
      },
    ],
  },
  solution: t`**Adjoint et orthogonal.** Pour $u,v\in H$, $\langle(I-K)u,v\rangle=\langle u,(I-K^*)v\rangle$ : donc $T^*=I-K^*$. Puis $v\perp\operatorname{Im}T$ si et seulement si $\langle u,T^*v\rangle=0$ pour tout $u$, c'est-à-dire $T^*v=0$ : $(\operatorname{Im}T)^\perp=\ker T^*$. En passant à l'orthogonal, $\overline{\operatorname{Im}T}=(\ker T^*)^\perp$.

**Image fermée.** Soit $f\in\overline{\operatorname{Im}T}$ et $Tu_n\to f$. Comme $\ker T$ est fermé, on peut remplacer $u_n$ par sa composante sur $(\ker T)^\perp$, sans changer $Tu_n$.

*La suite est bornée.* Sinon, après extraction, $\|u_n\|\to+\infty$ ; $v_n=u_n/\|u_n\|$ vérifie $\|v_n\|=1$ et $Tv_n\to 0$. Par compacité, une sous-suite vérifie $Kv_n\to w$, donc $v_n=Tv_n+Kv_n\to w$, avec $\|w\|=1$. Comme $(\ker T)^\perp$ est fermé, $w\in(\ker T)^\perp$, et $Tw=\lim Tv_n=0$ : $w\in\ker T\cap(\ker T)^\perp=\{0\}$, contradiction.

*Passage à la limite.* Par compacité, une sous-suite vérifie $Ku_n\to g$, donc $u_n=Tu_n+Ku_n\to f+g=:u$, et $Tu=f$ par continuité. Ainsi $\operatorname{Im}T$ est fermée.

**Conclusion.** $\operatorname{Im}(I-K)=\overline{\operatorname{Im}(I-K)}=\ker(I-K^*)^\perp$.

**Point de vigilance.** Le théorème de l'application ouverte ne peut pas servir à borner $(u_n)$ : il supposerait l'image fermée.`,
  steps: [
    t`Calculer $T^*$ et établir $(\operatorname{Im}T)^\perp=\ker T^*$.`,
    t`En déduire $\overline{\operatorname{Im}T}=(\ker T^*)^\perp$.`,
    t`Réduire une suite approximante à $(\ker T)^\perp$.`,
    'Démontrer sa bornitude par l’absurde, grâce à la compacité.',
    'Extraire, passer à la limite, et conclure à la fermeture de l’image.',
  ],
  commonErrors: [
    { id: 'e-adh', description: t`Confondre $\operatorname{Im}T$ et son adhérence $(\ker T^*)^\perp$.`, concept: 'fredholm-image-fermee' },
    { id: 'e-reduc', description: t`Affirmer la bornitude de $(u_n)$ sans l'avoir réduite à $(\ker T)^\perp$.`, concept: 'fredholm-reduction' },
    { id: 'e-extraction', description: 'Extraire une sous-suite convergente d’une suite seulement bornée.', concept: 'bornee-non-convergente' },
    { id: 'e-circulaire', description: 'Invoquer l’application ouverte, qui suppose l’image fermée.', concept: 'circularite' },
  ],
  hints: [
    t`L'identité $(\operatorname{Im}T)^\perp=\ker T^*$ vaut pour tout opérateur borné. Que manque-t-il pour passer de l'adhérence de l'image à l'image ?`,
    t`Pour la fermeture, pars de $Tu_n\to f$. Une suite non bornée ruinerait l'argument : retire d'abord la composante de $u_n$ dans $\ker T$, puis raisonne par l'absurde.`,
    t`Normalise : $v_n=u_n/\|u_n\|$ vérifie $Tv_n\to 0$. La compacité donne $Kv_n\to w$, donc $v_n\to w$ : où se trouve $w$ ?`,
  ],
  rubric: rubric({
    hypotheses: t`La compacité de $K$ est utilisée là où une extraction est nécessaire, et seulement là.`,
    methode: t`La démonstration distingue l'adhérence de l'image et sa fermeture.`,
    validite: t`La réduction à $(\ker T)^\perp$ précède l'argument de bornitude.`,
    justifications: 'Aucun argument circulaire : la fermeture de l’image n’est pas supposée.',
    conclusion: t`L'égalité $\operatorname{Im}(I-K)=\ker(I-K^*)^\perp$ est obtenue.`,
  }),
  variant: {
    statement: t`Soit $T\in\mathcal L(H)$ quelconque. Montrer que $\overline{\operatorname{Im}T}=\ker(T^*)^\perp$, et que l'égalité $\operatorname{Im}T=\ker(T^*)^\perp$ peut échouer, à l'aide de $Tx=(x_n/n)_{n\ge1}$ sur $\ell^2$.`,
    solution: t`Pour tout $T\in\mathcal L(H)$, $v\perp\operatorname{Im}T$ équivaut à $T^*v=0$, donc $(\operatorname{Im}T)^\perp=\ker T^*$ et $\overline{\operatorname{Im}T}=(\ker T^*)^\perp$. Pour $Tx=(x_n/n)_n$ sur $\ell^2$, on a $T^*=T$, injectif, donc $\ker(T^*)^\perp=\ell^2$. Mais $y=(1/n)_n\in\ell^2$ n'est pas dans l'image : $Tx=y$ impose $x_n=1$ pour tout $n$, et la suite constante $1$ n'est pas de carré sommable. L'image est dense et non fermée.`,
    closedChecks: [{ kind: 'rational', prompt: t`Coordonnée $x_n$ commune à tout antécédent éventuel de $y=(1/n)_n$`, expected: '1' }],
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'fredholm.difficile',
  theoremId: 'fredholm',
  level: 'difficile',
  title: t`L'équation $u-Ku=f$ quand $1$ est valeur propre`,
  statement: t`Soit $H$ un espace de Hilbert réel et $K\in\mathcal L(H)$ compact, tel que $1$ soit valeur propre de $K$ ; on note $N=\ker(I-K)\neq\{0\}$ et $N^*=\ker(I-K^*)$. Montrer que $I-K$ n'est pas surjectif et que $N^*\neq\{0\}$ ; caractériser les $f$ pour lesquels $u-Ku=f$ a une solution ; décrire l'ensemble des solutions ; montrer qu'une seule appartient à $N^\perp$ et qu'elle vérifie une estimation a priori $\|u\|\le C\|f\|$.`,
  source: poly(42, 'Exercice 25, difficile ; énoncé de la section 6.3 (p. PDF 24)'),
  prerequisites: ['application-ouverte'],
  concepts: ['fredholm-noyau-adjoint', 'fredholm-reduction', 'hypotheses-theoreme', 'existence-unicite', 'bornee-non-convergente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'compacite', label: 'Estimation par compacité et absurde' },
      { id: 'banach', label: 'Estimation par le théorème de l’application ouverte' },
    ],
    nodes: [
      { id: 'h-H', kind: 'hypothese', text: t`$H$ est un espace de Hilbert réel.` },
      { id: 'h-K', kind: 'hypothese', text: t`$K\in\mathcal L(H)$ est compact.` },
      { id: 'h-vp', kind: 'hypothese', text: t`$1$ est valeur propre de $K$ : $N=\ker(I-K)\neq\{0\}$.` },
      { id: 'd-Nstar', kind: 'definition', text: t`$N^*=\ker(I-K^*)$.` },
      { id: 'h-f', kind: 'hypothese', text: t`$f\in H$ est un second membre donné.` },

      { id: 'thm', kind: 'application-theoreme', text: t`$N$ est de dimension finie, $\operatorname{Im}(I-K)=(N^*)^\perp$ est fermée, et $I-K$ est injectif si et seulement s'il est surjectif.` },
      { id: 'nonsurj', kind: 'consequence', text: t`$I-K$ n'est pas surjectif.` },
      { id: 'Nstar', kind: 'consequence', text: t`$N^*\neq\{0\}$.` },
      { id: 'cond', kind: 'consequence', text: t`$u-Ku=f$ admet une solution si et seulement si $f\perp N^*$.` },

      { id: 's-sol', kind: 'definition', local: true, text: t`Soit $f\perp N^*$, et $u_0$ une solution de $u-Ku=f$.` },
      { id: 's-aff', kind: 'consequence', text: t`$u$ est solution si et seulement si $u-u_0\in N$.` },
      { id: 's-ens', kind: 'consequence', text: t`L'ensemble des solutions est $u_0+N$, sous-espace affine de dimension finie $\dim N\ge 1$.` },
      { id: 'decomp', kind: 'application-theoreme', text: t`$N$ est fermé, et $H=N\oplus N^\perp$.` },
      { id: 's-unique', kind: 'consequence', text: t`La composante de $u_0$ sur $N^\perp$ est l'unique solution appartenant à $N^\perp$.` },

      { id: 'e-abs', kind: 'definition', local: true, text: t`Supposons qu'aucun $C>0$ ne vérifie $\|y\|\le C\|(I-K)y\|$ pour tout $y\in N^\perp$ : il existe alors $(y_n)\subset N^\perp$ avec $\|y_n\|=1$ et $(I-K)y_n\to 0$.` },
      { id: 'e-ext', kind: 'consequence', text: t`Une sous-suite vérifie $Ky_n\to g$ dans $H$.` },
      { id: 'e-lim', kind: 'consequence', text: t`Le long de cette sous-suite, $y_n\to g$, avec $\|g\|=1$, $g\in N^\perp$ et $(I-K)g=0$.` },
      { id: 'e-contra', kind: 'contradiction', text: t`$g\in N\cap N^\perp=\{0\}$, ce qui contredit $\|g\|=1$.` },
      { id: 'b-bij', kind: 'consequence', text: t`$I-K$ induit une bijection linéaire continue de $N^\perp$ sur $\operatorname{Im}(I-K)$, deux espaces de Banach.` },
      { id: 'C', kind: 'inegalite', text: t`Il existe $C>0$ tel que $\|y\|\le C\|(I-K)y\|$ pour tout $y\in N^\perp$.` },
      { id: 'stab', kind: 'inegalite', text: t`La solution $y\in N^\perp$ vérifie $\|y\|\le C\|f\|$.` },

      { id: 'fin', kind: 'conclusion', text: t`$I-K$ n'est pas surjectif et $N^*\neq\{0\}$ ; l'équation est résoluble si et seulement si $f\perp N^*$ ; ses solutions forment $u_0+N$ ; une seule est dans $N^\perp$, et elle vérifie $\|y\|\le C\|f\|$.` },

      { id: 'x-partout', kind: 'consequence', distractor: true, text: t`$u-Ku=f$ admet une solution pour tout $f\in H$, puisque $K$ est compact.` },
      { id: 'x-minore', kind: 'inegalite', distractor: true, after: ['thm'], text: t`Il existe $C>0$ tel que $\|u\|\le C\|(I-K)u\|$ pour tout $u\in H$.` },
      { id: 'x-Nstar-N', kind: 'egalite', distractor: true, after: ['nonsurj'], text: t`$N^*=N$.` },
    ],
    justifications: [
      { id: 'j-fred', label: 'Alternative de Fredholm pour le compact $K$.', theorem: 'fredholm' },
      { id: 'j-alternative', label: t`$N\neq\{0\}$ : $I-K$ n'est pas injectif ; on applique l'équivalence entre injectivité et surjectivité.` },
      { id: 'j-Nstar', label: t`Si $N^*=\{0\}$, alors $(N^*)^\perp=H$, et $I-K$ serait surjectif.` },
      { id: 'j-cond', label: t`Identité $\operatorname{Im}(I-K)=(N^*)^\perp$.` },
      { id: 'j-aff', label: t`Linéarité : $(I-K)(u-u_0)=f-f=0$, et réciproquement.` },
      { id: 'j-translate', label: t`Translaté de $N$, de dimension finie par le théorème.` },
      { id: 'j-decomp', label: 'Un sous-espace de dimension finie est fermé ; théorème de projection.', theorem: 'projection' },
      { id: 'j-perp', label: t`$(I-K)$ s'annule sur la composante dans $N$ ; deux solutions de $N^\perp$ diffèrent d'un élément de $N\cap N^\perp=\{0\}$.` },
      { id: 'j-compact', label: t`Compacité de $K$, appliquée à la suite bornée $(y_n)$.` },
      { id: 'j-lim', label: t`$y_n=(I-K)y_n+Ky_n$ ; $N^\perp$ est fermé et $I-K$ est continu.` },
      { id: 'j-contra', label: t`Un vecteur orthogonal à lui-même est nul.` },
      { id: 'j-absurde', label: 'Raisonnement par l’absurde.' },
      { id: 'j-bij', label: t`Le noyau de la restriction est $N\cap N^\perp=\{0\}$ ; tout $(I-K)u$ est atteint par la composante de $u$ sur $N^\perp$ ; les deux espaces sont fermés dans $H$.` },
      { id: 'j-inverse', label: 'Théorème de l’application ouverte : l’inverse d’une bijection linéaire continue entre Banach est continu.', theorem: 'application-ouverte' },
      { id: 'j-stab', label: t`On applique la minoration à la solution $y\in N^\perp$, pour laquelle $(I-K)y=f$.` },
      { id: 'j-synthese', label: 'Réunion des résultats établis.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-Nstar-N', label: t`Les noyaux de $I-K$ et de $I-K^*$ coïncident, donc $N^*=N\neq\{0\}$.` },
      { id: 'j-borne-image', label: t`L'image de $I-K$ étant fermée, $I-K$ est minoré sur $H$ tout entier.` },
    ],
    rules: [
      { from: ['h-H', 'h-K', 'd-Nstar'], to: 'thm', by: 'j-fred' },
      { from: ['thm', 'h-vp'], to: 'nonsurj', by: 'j-alternative' },
      { from: ['thm', 'nonsurj'], to: 'Nstar', by: 'j-Nstar' },
      { from: ['thm', 'h-f'], to: 'cond', by: 'j-cond' },

      { from: ['s-sol', 'h-vp'], to: 's-aff', by: 'j-aff' },
      { from: ['s-aff', 'thm', 'h-vp'], to: 's-ens', by: 'j-translate' },
      { from: ['thm', 'h-H'], to: 'decomp', by: 'j-decomp' },
      { from: ['s-sol', 'decomp', 's-aff'], to: 's-unique', by: 'j-perp' },

      { from: ['e-abs', 'h-K'], to: 'e-ext', by: 'j-compact', path: 'compacite' },
      { from: ['e-ext', 'e-abs'], to: 'e-lim', by: 'j-lim', path: 'compacite' },
      { from: ['e-lim', 'h-vp'], to: 'e-contra', by: 'j-contra', path: 'compacite' },
      { from: ['e-contra'], to: 'C', by: 'j-absurde', path: 'compacite' },

      { from: ['thm', 'decomp'], to: 'b-bij', by: 'j-bij', path: 'banach' },
      { from: ['b-bij'], to: 'C', by: 'j-inverse', path: 'banach' },

      { from: ['C', 's-unique', 'cond'], to: 'stab', by: 'j-stab' },
      { from: ['nonsurj', 'Nstar', 'cond', 's-ens', 's-unique', 'stab'], to: 'fin', by: 'j-synthese' },
    ],
    traps: [
      {
        conclusion: 'x-partout',
        verdict: 'incorrect',
        concept: 'fredholm-noyau-adjoint',
        message: t`$I-K$ n'est pas injectif, donc pas surjectif : l'obstruction $N^*\neq\{0\}$ est réelle.`,
        counterexample: t`$K=I$ sur $\mathbb R$ est compact, $1$ en est valeur propre, et $u-Ku=0$ pour tout $u$ : $f=1$ n'est pas atteint.`,
      },
      {
        conclusion: 'x-minore',
        verdict: 'incorrect',
        concept: 'fredholm-reduction',
        message: t`Une minoration sur $H$ entier rendrait $I-K$ injectif. Elle ne peut valoir que sur un supplémentaire de $N$, ici $N^\perp$.`,
        counterexample: t`Pour $u\in N\setminus\{0\}$ : $(I-K)u=0$, alors que $\|u\|>0$.`,
      },
      {
        conclusion: 'x-Nstar-N',
        verdict: 'incorrect',
        concept: 'fredholm-noyau-adjoint',
        message: t`Les noyaux de $I-K$ et de $I-K^*$ n'ont aucune raison de coïncider lorsque $K$ n'est pas auto-adjoint.`,
        counterexample: t`Sur $\mathbb R^2$, $K_0=\begin{pmatrix}1&1\\0&0\end{pmatrix}$ : $N=\operatorname{Vect}\{(1,0)\}$ et $N^*=\operatorname{Vect}\{(1,1)\}$.`,
      },
      {
        conclusion: 'Nstar',
        by: 'j-Nstar-N',
        verdict: 'incorrect',
        concept: 'fredholm-noyau-adjoint',
        message: t`La conclusion est juste, la raison est fausse : $N^*$ et $N$ diffèrent en général. Ici, $N^*\neq\{0\}$ découle de la non-surjectivité et de l'identité des images.`,
        counterexample: t`Pour $K_0=\begin{pmatrix}1&1\\0&0\end{pmatrix}$ : $N=\operatorname{Vect}\{(1,0)\}\neq\operatorname{Vect}\{(1,1)\}=N^*$.`,
      },
      {
        conclusion: 'C',
        by: 'j-borne-image',
        verdict: 'incorrect',
        concept: 'fredholm-reduction',
        message: t`$I-K$ s'annule sur $N\neq\{0\}$ : aucune minoration n'est possible sur $H$ entier, seulement sur $N^\perp$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-K',
        label: t`Ne plus supposer $K$ compact`,
        necessary: true,
        explanation: 'Le théorème ne s’applique plus : la dimension finie du noyau et la fermeture de l’image peuvent disparaître.',
        counterexample: t`Pour $K=I$ sur un Hilbert de dimension infinie, $1$ est valeur propre et $N=H$ est de dimension infinie.`,
      },
      {
        hypothesis: 'h-vp',
        label: t`Ne plus supposer que $1$ est valeur propre`,
        necessary: true,
        explanation: t`Si $1$ n'est pas valeur propre, $I-K$ est injectif, donc surjectif : l'équation a une unique solution pour tout $f$, et il n'y a plus d'obstruction.`,
        counterexample: t`$K=0$ : l'unique solution de $u-Ku=f$ est $u=f$.`,
      },
    ],
  },
  solution: t`On note $T=I-K$, $N=\ker T$ et $N^*=\ker T^*=\ker(I-K^*)$.

**Obstruction.** Le théorème donne $\dim N<+\infty$, $\operatorname{Im}T=(N^*)^\perp$ fermée, et l'équivalence entre injectivité et surjectivité. Comme $N\neq\{0\}$, $T$ n'est pas injectif, donc pas surjectif. Si l'on avait $N^*=\{0\}$, on aurait $\operatorname{Im}T=H$ : donc $N^*\neq\{0\}$.

**Compatibilité.** $u-Ku=f$ admet une solution si et seulement si $f\in\operatorname{Im}T=(N^*)^\perp$.

**Ensemble des solutions.** Si $u_0$ est une solution, $u$ en est une si et seulement si $T(u-u_0)=0$ : l'ensemble des solutions est $u_0+N$, de dimension finie $\dim N\ge 1$. Il n'y a jamais unicité.

**Solution canonique.** $N$ est de dimension finie, donc fermé, et $H=N\oplus N^\perp$. Si $u_0=z+y$ avec $z\in N$ et $y\in N^\perp$, alors $Ty=Tu_0=f$ : $y$ est solution. Deux solutions de $N^\perp$ diffèrent d'un élément de $N\cap N^\perp=\{0\}$.

**Estimation a priori.** Il existe $C>0$ tel que $\|y\|\le C\|Ty\|$ pour $y\in N^\perp$. Sinon, il existerait $y_n\in N^\perp$, $\|y_n\|=1$, $Ty_n\to 0$ ; par compacité, une sous-suite vérifie $Ky_n\to g$, donc $y_n=Ty_n+Ky_n\to g$, avec $\|g\|=1$, $g\in N^\perp$ et $Tg=0$ : contradiction, car $g\in N\cap N^\perp$. On peut aussi appliquer le théorème de l'application ouverte à la bijection continue $T:N^\perp\to\operatorname{Im}T$, entre deux espaces de Banach. Pour la solution $y\in N^\perp$, on obtient $\|y\|\le C\|f\|$.

**Remarque.** L'estimation est fausse sur $H$ entier, puisque $T$ s'annule sur $N$ : la stabilité ne porte que sur la solution normalisée par $y\perp N$.`,
  steps: [
    t`Appliquer le théorème : noyau de dimension finie, image fermée, alternative.`,
    t`En déduire la non-surjectivité et $N^*\neq\{0\}$.`,
    t`Caractériser les seconds membres admissibles par $f\perp N^*$.`,
    t`Décrire les solutions comme le translaté $u_0+N$, et isoler la solution de $N^\perp$.`,
    t`Établir la minoration sur $N^\perp$, par compacité ou par l'application ouverte.`,
  ],
  commonErrors: [
    { id: 'e-partout', description: 'Croire l’équation résoluble pour tout second membre.', concept: 'fredholm-noyau-adjoint' },
    { id: 'e-unicite', description: t`Annoncer une solution unique alors que $N\neq\{0\}$.`, concept: 'existence-unicite' },
    { id: 'e-minore', description: t`Écrire une estimation a priori sur $H$ entier, sans se restreindre à $N^\perp$.`, concept: 'fredholm-reduction' },
    { id: 'e-noyaux', description: t`Identifier $\ker(I-K^*)$ à $\ker(I-K)$.`, concept: 'fredholm-noyau-adjoint' },
  ],
  hints: [
    t`Que dit l'alternative lorsque $I-K$ n'est pas injectif ? Où se lit alors l'obstruction à la résolution ?`,
    t`Sépare les questions : existence (condition sur $f$), description des solutions (translaté de $N$), normalisation (composante sur $N^\perp$), stabilité (minoration sur $N^\perp$).`,
    t`Pour la minoration, raisonne par l'absurde avec $y_n\in N^\perp$ unitaires et $(I-K)y_n\to 0$ : la compacité fait converger $y_n$ vers un vecteur unitaire de $N\cap N^\perp$.`,
  ],
  rubric: rubric({
    hypotheses: t`La compacité et l'hypothèse $N\neq\{0\}$ sont utilisées explicitement.`,
    methode: 'Existence, description des solutions, normalisation et stabilité sont traitées séparément.',
    validite: t`La minoration est établie sur $N^\perp$ seulement, et la non-surjectivité découle de l'alternative.`,
    justifications: t`$N^*\neq\{0\}$ est déduit de la non-surjectivité, sans identifier $N^*$ à $N$.`,
    conclusion: t`La structure complète des solutions et l'estimation $\|y\|\le C\|f\|$ sont obtenues.`,
  }),
  variant: {
    statement: t`Dans $H=L^2(]0,1[)$ réel, soit $Ku(x)=2x\int_0^1u(y)\,dy$. Vérifier que $K$ est compact et que $1$ en est valeur propre ; déterminer $\ker(I-K)$, $K^*$ et $\ker(I-K^*)$ ; pour $f(x)=1-2x$, décrire toutes les solutions de $u-Ku=f$ et calculer celle qui est orthogonale à $\ker(I-K)$.`,
    solution: t`On a $Ku=\langle u,b\rangle a$ avec $a(x)=2x$ et $b\equiv 1$ : $K$ est de rang $1$, donc compact. Si $u=Ku$, alors $u$ est proportionnelle à $x$ ; réciproquement $K(x)=2x\int_0^1y\,dy=x$ : $\ker(I-K)=\operatorname{Vect}\{x\}$. L'adjoint est $K^*v=\langle v,a\rangle b$, fonction constante égale à $\int_0^12xv(x)\,dx$ ; ses points fixes sont les constantes : $\ker(I-K^*)=\operatorname{Vect}\{1\}$. La condition est donc $\int_0^1f=0$, vérifiée par $f(x)=1-2x$. Comme $Kf=0$, $f$ est une solution, et les solutions sont les $u_c(x)=1-2x+cx$. L'orthogonalité à $x$ s'écrit $\frac12-\frac23+\frac c3=0$, soit $c=\frac12$ : la solution cherchée est $u(x)=1-\frac32x$.`,
    closedChecks: [{ kind: 'expr-equiv', prompt: t`Solution orthogonale à $\ker(I-K)$, en fonction de $x$`, expected: '1-3*x/2', vars: ['x'] }],
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h-H', kind: 'hypothese', text: t`$H=L^2(]0,1[)$, réel, est un espace de Hilbert.` },
        { id: 'd-K', kind: 'definition', text: t`$Ku(x)=2x\int_0^1u(y)\,dy$, c'est-à-dire $Ku=\langle u,b\rangle a$ avec $a(x)=2x$ et $b\equiv 1$.` },
        { id: 'd-f', kind: 'definition', text: t`$f(x)=1-2x$.` },

        { id: 'k-rang', kind: 'consequence', text: t`$K$ est de rang $1$, donc compact.` },
        { id: 'k-adj', kind: 'egalite', text: t`$K^*v=\langle v,a\rangle b$ : $K^*v$ est la fonction constante égale à $\int_0^12xv(x)\,dx$.` },
        { id: 'k-N', kind: 'egalite', text: t`$\ker(I-K)=\operatorname{Vect}\{x\}$ ; en particulier, $1$ est valeur propre de $K$.` },
        { id: 'k-Nstar', kind: 'egalite', text: t`$\ker(I-K^*)=\operatorname{Vect}\{1\}$.` },
        { id: 'k-cond', kind: 'consequence', text: t`$u-Ku=g$ admet une solution si et seulement si $\int_0^1g=0$.` },
        {
          id: 'k-int',
          kind: 'egalite',
          text: t`$\int_0^1f=0$.`,
          masked: t`Valeur de $\int_0^1f$ : à calculer.`,
          check: { kind: 'rational', prompt: t`Valeur de $\int_0^1(1-2x)\,dx$`, expected: '0' },
        },
        { id: 'k-part', kind: 'consequence', text: t`$Kf=0$, donc $u=f$ est une solution.` },
        { id: 'k-sol', kind: 'consequence', text: t`Les solutions sont les fonctions $u_c(x)=1-2x+cx$, $c\in\mathbb R$.` },
        {
          id: 'k-perp',
          kind: 'egalite',
          text: t`L'unique solution orthogonale à $x$ est $u(x)=1-\frac32x$.`,
          masked: t`Solution orthogonale à $\ker(I-K)$ : à calculer.`,
          check: { kind: 'expr-equiv', prompt: t`Solution orthogonale à $\ker(I-K)$, en fonction de $x$`, expected: '1-3*x/2', vars: ['x'] },
        },
        { id: 'fin', kind: 'conclusion', text: t`L'équation $u-Ku=f$ est résoluble, ses solutions sont les $u_c$, et la solution orthogonale à $\ker(I-K)$ est calculée.` },

        { id: 'x-N-adj', kind: 'egalite', distractor: true, after: ['k-N'], text: t`$\ker(I-K^*)=\operatorname{Vect}\{x\}$.` },
        { id: 'x-Kstar', kind: 'egalite', distractor: true, text: t`$K^*=K$.` },
      ],
      justifications: [
        { id: 'j-rang', label: 'Un opérateur borné de rang fini est compact.' },
        { id: 'j-adj', label: t`$\langle Ku,v\rangle=\langle u,b\rangle\langle a,v\rangle=\langle u,\langle v,a\rangle b\rangle$.` },
        { id: 'j-N', label: t`Si $u=Ku$, $u$ est proportionnelle à $a$ ; et $Ka=\langle a,b\rangle a=a$.` },
        { id: 'j-Nstar', label: t`Si $v=K^*v$, $v$ est constante ; et $K^*1=\int_0^12x\,dx=1$.` },
        { id: 'j-fred', label: t`Alternative de Fredholm : $\operatorname{Im}(I-K)=\ker(I-K^*)^\perp$.`, theorem: 'fredholm' },
        { id: 'j-integrale', label: 'Calcul d’une intégrale de polynôme.' },
        { id: 'j-part', label: t`$Kf=2x\int_0^1f=0$, donc $f-Kf=f$.` },
        { id: 'j-affine', label: t`Les solutions forment le translaté $f+\ker(I-K)$.` },
        { id: 'j-orth', label: t`$\int_0^1(1-2x+cx)\,x\,dx=\frac c3-\frac16$ s'annule pour une seule valeur de $c$.` },
        { id: 'j-synthese', label: 'Réunion des résultats établis.' },
        { id: 'j-noyau-cond', label: t`La compatibilité se lit dans $\ker(I-K)$ : il faut $f\perp x$.` },
      ],
      rules: [
        { from: ['d-K', 'h-H'], to: 'k-rang', by: 'j-rang' },
        { from: ['d-K'], to: 'k-adj', by: 'j-adj' },
        { from: ['d-K'], to: 'k-N', by: 'j-N' },
        { from: ['k-adj'], to: 'k-Nstar', by: 'j-Nstar' },
        { from: ['k-rang', 'k-Nstar', 'h-H'], to: 'k-cond', by: 'j-fred' },
        { from: ['d-f'], to: 'k-int', by: 'j-integrale' },
        { from: ['k-int', 'd-K', 'd-f'], to: 'k-part', by: 'j-part' },
        { from: ['k-part', 'k-N'], to: 'k-sol', by: 'j-affine' },
        { from: ['k-sol'], to: 'k-perp', by: 'j-orth' },
        { from: ['k-cond', 'k-int', 'k-sol', 'k-perp'], to: 'fin', by: 'j-synthese' },
      ],
      traps: [
        {
          conclusion: 'x-N-adj',
          verdict: 'incorrect',
          concept: 'fredholm-noyau-adjoint',
          message: t`Le noyau de $I-K^*$ se calcule avec $K^*$, pas avec $K$.`,
          counterexample: t`$K^*x$ est la constante $\int_0^12y^2\,dy=\frac23$, donc $(I-K^*)x=x-\frac23\neq 0$.`,
        },
        {
          conclusion: 'x-Kstar',
          verdict: 'incorrect',
          concept: 'symetrie-autoadjonction',
          message: t`Le noyau $k(x,y)=2x$ n'est pas symétrique : $K$ n'est pas auto-adjoint.`,
          counterexample: t`$K1=2x$, alors que $K^*1$ est la constante $\int_0^12x\,dx=1$.`,
        },
        {
          conclusion: 'k-cond',
          by: 'j-noyau-cond',
          verdict: 'incorrect',
          concept: 'fredholm-noyau-adjoint',
          message: t`La condition de compatibilité porte sur $\ker(I-K^*)=\operatorname{Vect}\{1\}$, non sur $\ker(I-K)$.`,
          counterexample: t`$f(x)=1-2x$ est un second membre admissible, et $\int_0^1(1-2x)\,x\,dx=-\frac16\neq 0$.`,
        },
      ],
      removable: [
        {
          hypothesis: 'k-rang',
          label: t`Ne plus disposer de la compacité de $K$`,
          necessary: true,
          explanation: 'Sans compacité, l’identité des images ne peut plus être invoquée.',
          counterexample: t`Sur $\ell^2$, $K=I-T$ avec $Tx=(x_n/n)_{n\ge1}$ : $\ker(I-K^*)=\{0\}$, et pourtant $\operatorname{Im}(I-K)\neq\ell^2$.`,
        },
      ],
    },
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT25: TheoremModule = {
  theorem: {
    id: 'fredholm',
    spaces: [
      t`$H$ : espace de Hilbert réel (dans le cas complexe, le produit scalaire est linéaire en la première variable).`,
      t`$\mathcal L(H)$ : opérateurs linéaires continus de $H$ dans $H$ ; $K^*$ désigne l'adjoint de $K$.`,
      t`$\ker$ et $\operatorname{Im}$ : noyau et image ; $E^\perp$ : orthogonal de $E$ dans $H$.`,
    ],
    hypotheses: [
      { id: 'h-hilbert', text: t`$H$ est un espace de Hilbert.` },
      {
        id: 'h-compact',
        text: t`$K\in\mathcal L(H)$ est compact : l'image par $K$ de toute partie bornée de $H$ est relativement compacte.`,
        whenRemoved: t`Sur $\ell^2$, soit $S(x_1,x_2,\dots)=(0,x_1,x_2,\dots)$ et $K=I-S$, non compact. Alors $I-K=S$ est injectif, isométrique, mais pas surjectif : l'alternative tombe.`,
      },
    ],
    statement: t`Si $K\in\mathcal L(H)$ est compact, alors $I-K$ a un noyau de dimension finie et une image fermée, et
$$\operatorname{Im}(I-K)=\ker(I-K^*)^\perp.$$
Il est injectif si et seulement s'il est surjectif (alternative de Fredholm).`,
    conclusions: {
      existence: t`$(I-K)u=f$ admet une solution si et seulement si $f\perp\ker(I-K^*)$.`,
      unicite: t`Deux solutions diffèrent d'un élément de $\ker(I-K)$, de dimension finie ; l'unicité pour tout second membre équivaut à l'existence pour tout second membre.`,
      autre: t`$\dim\ker(I-K)<+\infty$, et $\operatorname{Im}(I-K)$ est fermée.`,
    },
    sourceProof: 'idee',
    proofOutline: [
      t`Noyau : sur $N=\ker(I-K)$, $K$ coïncide avec l'identité ; la boule unité fermée de $N$ est donc compacte, et $N$ est de dimension finie (lemme de Riesz).`,
      t`Image fermée : si $(I-K)u_n\to f$ avec $u_n\in N^\perp$, la suite $(u_n)$ est bornée, sinon la normalisation et la compacité fourniraient un vecteur unitaire de $N\cap N^\perp$ ; une extraction donne alors $u_n\to u$ et $(I-K)u=f$.`,
      t`Identité des images : $(\operatorname{Im}(I-K))^\perp=\ker(I-K^*)$, et une image fermée est égale à son biorthogonal.`,
      t`Injectif implique surjectif : sinon, les images itérées $H_k=(I-K)^kH$ sont fermées et strictement décroissantes ; des vecteurs unitaires $e_k\in H_k\cap H_{k+1}^\perp$ vérifient $\|Ke_k-Ke_m\|\ge 1$ pour $k<m$, ce qui contredit la compacité.`,
      t`Surjectif implique injectif : sinon, en remontant une chaîne d'antécédents d'un vecteur non nul du noyau, les noyaux itérés $\ker(I-K)^k$ sont strictement croissants, et le même argument conduit à une contradiction.`,
    ],
    warnings: [
      t`La condition d'orthogonalité porte sur le noyau de $I-K^*$, non sur celui de $I-K$.`,
      t`L'alternative concerne $I-K$, non $K$ : en dimension infinie, un opérateur compact injectif n'est jamais surjectif.`,
      'Sans compacité, l’image peut ne pas être fermée, et l’alternative peut tomber.',
      t`L'énoncé du polycopié ne compare pas les dimensions de $\ker(I-K)$ et de $\ker(I-K^*)$ : les exercices n'utilisent pas une telle égalité.`,
    ],
    usefulFor: 'Étudier les équations intégrales ou les EDP ramenées à une perturbation compacte de l’identité.',
    verification: {
      origin: 'complement',
      review: 'machine',
      notes: 'Énoncé repris du polycopié (p. PDF 24), qui n’en donne qu’une idée de preuve ; la démonstration de la fiche est rédigée pour ProofLab.',
    },
  },
  definitions: [
    {
      id: 'fredholm-operateur-compact',
      term: 'Opérateur compact',
      statement: t`$K\in\mathcal L(H)$ est compact si l'image par $K$ de la boule unité de $H$ est relativement compacte ; de façon équivalente, de toute suite bornée $(u_n)$ de $H$ on peut extraire une sous-suite $(u_{n_k})$ telle que $(Ku_{n_k})$ converge dans $H$.`,
      source: complement('Définition classique, employée sans rappel en section 6.3 du polycopié'),
    },
    {
      id: 'fredholm-alternative',
      term: 'Alternative de Fredholm',
      statement: t`Pour $K\in\mathcal L(H)$ compact, l'opérateur $I-K$ est injectif si et seulement s'il est surjectif.`,
      source: poly(24, 'Section 6.3'),
    },
    {
      id: 'fredholm-orthogonal',
      term: 'Orthogonal d’une partie',
      statement: t`Pour $E\subset H$, $E^\perp=\{v\in H:\langle u,v\rangle=0\ \forall u\in E\}$ ; c'est un sous-espace fermé, et si $E$ est un sous-espace vectoriel, $(E^\perp)^\perp=\overline E$.`,
      source: complement('Rappel de géométrie hilbertienne utilisé en section 6.3'),
    },
  ],
  concepts: [
    {
      id: 'fredholm-noyau-adjoint',
      label: 'Noyau de l’adjoint',
      reminder: t`L'obstruction à résoudre $(I-K)u=f$ se lit dans $\ker(I-K^*)$ ; le noyau $\ker(I-K)$ décrit seulement la non-unicité.`,
    },
    {
      id: 'fredholm-image-fermee',
      label: 'Adhérence de l’image',
      reminder: t`L'identité $(\operatorname{Im}T)^\perp=\ker T^*$ ne donne que $\overline{\operatorname{Im}T}=(\ker T^*)^\perp$ : la fermeture de l'image demande un argument propre.`,
    },
    {
      id: 'fredholm-reduction',
      label: 'Réduction à l’orthogonal du noyau',
      reminder: t`Une suite dont l'image converge n'est bornée qu'après projection sur $(\ker T)^\perp$, et une minoration $\|y\|\le C\|Ty\|$ ne vaut que sur un supplémentaire du noyau.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-fredholm-condition',
      theoremId: 'fredholm',
      title: 'Le mauvais noyau',
      claim: t`Pour $K$ compact, $(I-K)u=f$ admet une solution si et seulement si $f\perp\ker(I-K)$.`,
      correctStatement: t`La condition exacte porte sur le noyau de l'adjoint : $f\perp\ker(I-K^*)$.`,
      task: t`Dans $\mathbb R^2$, soit $K_0=\begin{pmatrix}1&1\\0&0\end{pmatrix}$, $f=(1,-1)$ et $z=(1,0)\in\ker(I-K_0)$. Sachant que $f=(I-K_0)(0,-1)$, calcule $\langle f,z\rangle$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\langle f,z\rangle$`, expected: '1' },
      explanation: t`$(I-K_0)(0,-1)=(1,-1)$ : $f$ est dans l'image, et pourtant $\langle f,z\rangle=1\neq 0$. La condition $f\perp\ker(I-K)$ n'est donc pas nécessaire ; la bonne condition, $f\perp(1,1)$, est satisfaite.`,
      concept: 'fredholm-noyau-adjoint',
      source: complement('Illustration de l’énoncé de la section 6.3 du polycopié'),
    },
    {
      id: 'ce-fredholm-non-compact',
      theoremId: 'fredholm',
      title: 'Sans compacité',
      claim: t`Pour tout $K\in\mathcal L(H)$, l'opérateur $I-K$ est injectif si et seulement s'il est surjectif.`,
      correctStatement: t`L'alternative exige que $K$ soit compact.`,
      task: t`Sur $\ell^2$, soit $S(x_1,x_2,\dots)=(0,x_1,x_2,\dots)$ et $K=I-S$, de sorte que $I-K=S$. Calcule $\langle Sx,e_1\rangle$ pour $x\in\ell^2$ quelconque.`,
      check: { kind: 'rational', prompt: t`Valeur de $\langle Sx,e_1\rangle$`, expected: '0' },
      explanation: t`$\langle Sx,e_1\rangle$ est la première coordonnée de $Sx$, toujours nulle : $e_1\notin\operatorname{Im}S$. Or $S$ est injectif, car isométrique. L'alternative tombe parce que $K=I-S$ n'est pas compact : $Ke_n=e_n-e_{n+1}$ et $\|Ke_n-Ke_m\|=2$ pour $|n-m|\ge 2$.`,
      concept: 'hypotheses-theoreme',
      source: complement('Contre-exemple à l’hypothèse de compacité de la section 6.3 du polycopié'),
    },
    {
      id: 'ce-fredholm-image-non-fermee',
      theoremId: 'fredholm',
      title: 'Image dense non fermée',
      claim: t`Pour tout $T\in\mathcal L(H)$, on a $\operatorname{Im}T=\ker(T^*)^\perp$.`,
      correctStatement: t`En général $\ker(T^*)^\perp=\overline{\operatorname{Im}T}$ ; l'égalité avec $\operatorname{Im}T$ demande une image fermée, ce que fournit la compacité pour $T=I-K$.`,
      task: t`Sur $\ell^2$, soit $Tx=(x_n/n)_{n\ge1}$, auto-adjoint et injectif, de sorte que $\ker(T^*)^\perp=\ell^2$. Pour $y=(1/n)_n$, donne la coordonnée $x_n$ commune à tout antécédent éventuel de $y$.`,
      check: { kind: 'rational', prompt: t`Valeur de $x_n$`, expected: '1' },
      explanation: t`$Tx=y$ impose $x_n/n=1/n$, soit $x_n=1$ pour tout $n$ : la suite constante $1$ n'est pas de carré sommable. Donc $y\notin\operatorname{Im}T$, bien que $y\in\ker(T^*)^\perp$.`,
      concept: 'fredholm-image-fermee',
      source: complement('Illustration de la fermeture de l’image, section 6.3 du polycopié'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT25;
