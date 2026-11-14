/**
 * Résultat 24 — Adjoint d'un opérateur densément défini (polycopié, section 6.1, p. PDF 23).
 * Le polycopié donne l'énoncé et une lecture géométrique : les démonstrations des
 * exercices et de la fiche sont des compléments rédigés pour ProofLab.
 */
import { t, rubric, poly, complement, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'adjoint.facile',
  theoremId: 'adjoint',
  level: 'facile',
  title: 'Adjoint d’une matrice réelle',
  statement: t`Dans $H=\mathbb R^3$ muni du produit scalaire euclidien, soit $A=\begin{pmatrix}1&2&0\\-1&3&4\\0&5&2\end{pmatrix}$, de domaine $D(A)=\mathbb R^3$. À partir de la définition de l'adjoint, déterminer $D(A^*)$ et la matrice de $A^*$, puis calculer $A^*v_0$ pour $v_0=(1,2,-1)$.`,
  source: poly(42, 'Exercice 24, facile ; définition de l’adjoint en section 6.1 (p. PDF 23)'),
  prerequisites: [],
  concepts: ['adjoint-transposee-inverse', 'adjoint-densite-unicite', 'symetrie-autoadjonction', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'coordonnees', label: 'Développement en coordonnées' },
      { id: 'base', label: 'Test sur la base canonique, puis linéarité' },
    ],
    nodes: [
      { id: 'h-H', kind: 'hypothese', text: t`$H=\mathbb R^3$, muni de $\langle x,y\rangle=\sum_{i=1}^3x_iy_i$, est un espace de Hilbert réel.` },
      { id: 'd-A', kind: 'definition', text: t`$A=(a_{ij})$ est la matrice de l'énoncé, de domaine $D(A)=\mathbb R^3$.` },
      { id: 'd-v0', kind: 'definition', text: t`$v_0=(1,2,-1)$ et $u_0=(1,0,1)$.` },
      { id: 'v-local', kind: 'definition', local: true, text: t`Soit $v\in\mathbb R^3$.` },

      { id: 'dense', kind: 'consequence', text: t`$D(A)$ est dense dans $H$.` },

      { id: 'dev', kind: 'egalite', text: t`Pour tout $u\in\mathbb R^3$ : $\langle Au,v\rangle=\sum_{i=1}^3\big(\sum_{j=1}^3a_{ij}u_j\big)v_i$.` },
      { id: 'echange', kind: 'egalite', text: t`Pour tout $u\in\mathbb R^3$ : $\langle Au,v\rangle=\sum_{j=1}^3u_j\big(\sum_{i=1}^3a_{ij}v_i\big)$.` },

      { id: 'base-ej', kind: 'egalite', text: t`Pour $j=1,2,3$ : $\langle Ae_j,v\rangle=\sum_{i=1}^3a_{ij}v_i$.` },
      { id: 'lin-u', kind: 'consequence', text: t`Si $\langle Ae_j,v\rangle=\langle e_j,w\rangle$ pour $j=1,2,3$, alors $\langle Au,v\rangle=\langle u,w\rangle$ pour tout $u\in\mathbb R^3$.` },

      { id: 'w-def', kind: 'egalite', text: t`Le vecteur $w=A^{\mathsf T}v$, de coordonnées $w_j=\sum_{i=1}^3a_{ij}v_i$, vérifie $\langle Au,v\rangle=\langle u,w\rangle$ pour tout $u\in\mathbb R^3$.` },
      { id: 'dom', kind: 'inclusion', text: t`$D(A^*)=\mathbb R^3$.` },
      { id: 'unique', kind: 'consequence', text: t`Pour chaque $v$, le vecteur $w$ est unique.` },
      { id: 'formule', kind: 'egalite', text: t`$A^*=A^{\mathsf T}$, c'est-à-dire $(A^*)_{ij}=a_{ji}$.` },
      {
        id: 'mat',
        kind: 'egalite',
        text: t`$A^*=\begin{pmatrix}1&-1&0\\2&3&5\\0&4&2\end{pmatrix}$.`,
        masked: t`Coefficients de la matrice de $A^*$ : à calculer.`,
        check: {
          kind: 'rational-vector',
          prompt: t`Coefficients de $A^*$, ligne par ligne`,
          expected: ['1', '-1', '0', '2', '3', '5', '0', '4', '2'],
          labels: ['b₁₁', 'b₁₂', 'b₁₃', 'b₂₁', 'b₂₂', 'b₂₃', 'b₃₁', 'b₃₂', 'b₃₃'],
        },
      },
      {
        id: 'val',
        kind: 'egalite',
        text: t`$A^*v_0=(-1,3,6)$.`,
        masked: t`Valeur de $A^*v_0$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Coordonnées de $A^*v_0$`, expected: ['-1', '3', '6'], labels: ['w₁', 'w₂', 'w₃'] },
      },
      {
        id: 'ctrl',
        kind: 'egalite',
        text: t`$\langle Au_0,v_0\rangle=\langle u_0,A^*v_0\rangle=5$.`,
        masked: t`Valeur commune de $\langle Au_0,v_0\rangle$ et $\langle u_0,A^*v_0\rangle$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\langle Au_0,v_0\rangle$`, expected: '5' },
      },

      { id: 'fin', kind: 'conclusion', text: t`$D(A^*)=\mathbb R^3$, $A^*=A^{\mathsf T}$, et les valeurs demandées sont établies.` },

      { id: 'x-inverse', kind: 'consequence', distractor: true, after: ['w-def'], text: t`$A^*=A^{-1}$.` },
      { id: 'x-self', kind: 'egalite', distractor: true, after: ['dev'], text: t`$A^*=A$, car $\langle Au,v\rangle=\langle u,Av\rangle$ pour tous $u,v\in\mathbb R^3$.` },
    ],
    justifications: [
      { id: 'j-plein', label: t`Le domaine est $H$ tout entier.` },
      { id: 'j-def-ps', label: 'Définition du produit matriciel et du produit scalaire euclidien.' },
      { id: 'j-interv', label: 'Interversion de deux sommes finies.' },
      { id: 'j-colonne', label: t`$Ae_j$ est la $j$-ième colonne de $A$ : on lit $\langle Ae_j,v\rangle$ sur les coordonnées.` },
      { id: 'j-lineaire', label: t`Linéarité de $u\mapsto\langle Au,v\rangle-\langle u,w\rangle$ : nulle sur la base canonique, elle est nulle.` },
      { id: 'j-reconnaitre', label: t`Le coefficient de $u_j$ est la $j$-ième coordonnée de $A^{\mathsf T}v$.` },
      { id: 'j-base-lin', label: t`$\langle e_j,A^{\mathsf T}v\rangle$ est la $j$-ième coordonnée de $A^{\mathsf T}v$, puis linéarité en $u$.` },
      { id: 'j-def-dom', label: t`Définition de $D(A^*)$ : un vecteur $w$ convenable existe pour chaque $v$.` },
      { id: 'j-unique', label: t`Si $w,w'$ conviennent, $\langle u,w-w'\rangle=0$ pour tout $u$ dans un ensemble dense : d'où $w=w'$.` },
      { id: 'j-identif', label: t`Identification : pour chaque $v$, le vecteur $w$ construit est l'unique vecteur convenable.` },
      { id: 'j-lecture', label: 'Lecture des coefficients par transposition.' },
      { id: 'j-prod', label: 'Produit matrice-vecteur.' },
      { id: 'j-verif', label: 'Calcul direct des deux produits scalaires.' },
      { id: 'j-synthese', label: 'Réunion des résultats établis.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-sym-ps', label: t`Le produit scalaire est symétrique : $A$ passe de l'autre côté sans changement.` },
      { id: 'j-inversible', label: t`$A$ est inversible, donc $w$ est déterminé par $v$.` },
      { id: 'j-orthogonale', label: t`Une matrice réelle inversible vérifie $A^{-1}=A^{\mathsf T}$.` },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['d-A'], to: 'dense', by: 'j-plein' },

      { from: ['v-local', 'd-A', 'h-H'], to: 'dev', by: 'j-def-ps', path: 'coordonnees' },
      { from: ['dev'], to: 'echange', by: 'j-interv', path: 'coordonnees' },
      { from: ['echange'], to: 'w-def', by: 'j-reconnaitre', path: 'coordonnees' },

      { from: ['v-local', 'd-A', 'h-H'], to: 'base-ej', by: 'j-colonne', path: 'base' },
      { from: ['d-A', 'h-H'], to: 'lin-u', by: 'j-lineaire', path: 'base' },
      { from: ['base-ej', 'lin-u'], to: 'w-def', by: 'j-base-lin', path: 'base' },

      { from: ['w-def'], to: 'dom', by: 'j-def-dom' },
      { from: ['dense'], to: 'unique', by: 'j-unique' },
      { from: ['w-def', 'unique', 'dom'], to: 'formule', by: 'j-identif' },
      { from: ['formule', 'd-A'], to: 'mat', by: 'j-lecture' },
      { from: ['mat', 'd-v0'], to: 'val', by: 'j-prod' },
      { from: ['val', 'd-A', 'd-v0'], to: 'ctrl', by: 'j-verif' },
      { from: ['dom', 'formule', 'mat', 'val', 'ctrl'], to: 'fin', by: 'j-synthese' },
    ],
    traps: [
      {
        conclusion: 'x-inverse',
        verdict: 'incorrect',
        concept: 'adjoint-transposee-inverse',
        message: t`L'adjoint est défini par l'identité $\langle Au,v\rangle=\langle u,A^*v\rangle$, sans référence à l'inverse. La relation $A^*=A^{-1}$ caractérise les matrices orthogonales.`,
        counterexample: t`Elle donnerait $A^{\mathsf T}A=I$ ; or le coefficient $(1,1)$ de $A^{\mathsf T}A$ vaut $1^2+(-1)^2+0^2=2\neq 1$.`,
      },
      {
        conclusion: 'x-self',
        verdict: 'incorrect',
        concept: 'symetrie-autoadjonction',
        message: t`$A$ n'est pas symétrique : l'identité $\langle Au,v\rangle=\langle u,Av\rangle$ est fausse ici.`,
        counterexample: t`$u=e_1$, $v=e_2$ : $\langle Ae_1,e_2\rangle=a_{21}=-1$ et $\langle e_1,Ae_2\rangle=a_{12}=2$.`,
      },
      {
        conclusion: 'w-def',
        by: 'j-sym-ps',
        verdict: 'incorrect',
        concept: 'symetrie-autoadjonction',
        message: t`La symétrie du produit scalaire échange les deux arguments : $\langle Au,v\rangle=\langle v,Au\rangle$. Elle ne fait pas passer $A$ sur l'autre argument.`,
        counterexample: t`Avec $u=e_1$, $v=e_2$ : $\langle Ae_1,e_2\rangle=-1$, tandis que $\langle e_1,Ae_2\rangle=2$.`,
      },
      {
        conclusion: 'unique',
        by: 'j-inversible',
        verdict: 'incorrect',
        concept: 'adjoint-densite-unicite',
        message: t`L'unicité de $w$ ne dépend pas de $A$, mais du domaine : si $\langle u,w-w'\rangle=0$ pour tout $u$ d'un ensemble dense, alors $w=w'$.`,
        counterexample: t`Pour la matrice nulle, non inversible, le vecteur $w=0$ reste l'unique vecteur convenable.`,
      },
      {
        conclusion: 'formule',
        by: 'j-orthogonale',
        verdict: 'incorrect',
        concept: 'adjoint-transposee-inverse',
        message: t`L'égalité $A^{-1}=A^{\mathsf T}$ caractérise les matrices orthogonales : elle n'est pas vraie pour une matrice inversible quelconque.`,
        counterexample: t`$(2I)^{-1}=\tfrac12I$ et $(2I)^{\mathsf T}=2I$.`,
      },
      {
        conclusion: 'formule',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`Cette identification se démontre : il faut l'existence de $w$ pour chaque $v$ et son unicité.`,
      },
    ],
    removable: [
      {
        hypothesis: 'dense',
        label: 'Ne plus disposer de la densité du domaine',
        necessary: true,
        explanation: t`Sans densité, le vecteur $w$ n'est pas déterminé par $v$ : l'adjoint n'est plus une application.`,
        counterexample: t`Dans $\mathbb R^2$, soit $D(B)=\mathbb R\times\{0\}$ et $B=0$. Pour tout $v$ et tout $b\in\mathbb R$, le vecteur $w=(0,b)$ vérifie $\langle Bu,v\rangle=\langle u,w\rangle$ sur $D(B)$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Valeur de $\langle Ae_1,e_2\rangle-\langle e_1,Ae_2\rangle$`, expected: '-3' }],
  solution: t`**Cadre.** $D(A)=\mathbb R^3$ est l'espace entier, donc dense : pour chaque $v$, le vecteur $w$ convenable, s'il existe, est unique.

**Calcul.** Pour $u,v\in\mathbb R^3$,
$$\langle Au,v\rangle=\sum_{i=1}^3\Big(\sum_{j=1}^3a_{ij}u_j\Big)v_i=\sum_{j=1}^3u_j\Big(\sum_{i=1}^3a_{ij}v_i\Big)=\langle u,A^{\mathsf T}v\rangle.$$
Ainsi tout $v$ appartient à $D(A^*)$, donc $D(A^*)=\mathbb R^3$, et par unicité $A^*v=A^{\mathsf T}v$.

**Valeurs.** $A^*=A^{\mathsf T}=\begin{pmatrix}1&-1&0\\2&3&5\\0&4&2\end{pmatrix}$, et $A^*v_0=(1-2,\ 2+6-5,\ 8-2)=(-1,3,6)$.

**Contrôle.** Pour $u_0=(1,0,1)$ : $Au_0=(1,3,2)$, donc $\langle Au_0,v_0\rangle=1+6-2=5$, et $\langle u_0,A^*v_0\rangle=-1+6=5$.

**Point de vigilance.** La matrice $A$ est inversible ($\det A=-10$), mais son inverse n'a aucun rapport avec son adjoint.`,
  steps: [
    'Constater que le domaine est dense, ce qui rend l’adjoint bien défini.',
    t`Établir, pour tout $v$, l'identité $\langle Au,v\rangle=\langle u,A^{\mathsf T}v\rangle$.`,
    t`En déduire $D(A^*)=\mathbb R^3$ et $A^*=A^{\mathsf T}$, par unicité.`,
    t`Calculer la matrice de $A^*$, puis $A^*v_0$.`,
    'Contrôler l’identité sur un couple de vecteurs.',
  ],
  commonErrors: [
    { id: 'e-inverse', description: 'Confondre l’adjoint et l’inverse.', concept: 'adjoint-transposee-inverse' },
    { id: 'e-self', description: t`Écrire $\langle Au,v\rangle=\langle u,Av\rangle$ pour une matrice non symétrique.`, concept: 'symetrie-autoadjonction' },
    { id: 'e-unicite', description: t`Ne pas justifier que le vecteur $w$ est unique.`, concept: 'adjoint-densite-unicite' },
  ],
  hints: [
    t`Quelle relation définit $A^*v$ ? Que faut-il exhiber, pour un $v$ fixé ?`,
    t`Développe $\langle Au,v\rangle$ en coordonnées et regroupe les termes selon les $u_j$, ou bien teste la relation sur la base canonique.`,
    t`Le coefficient de $u_j$ est $\sum_ia_{ij}v_i$ : reconnais la $j$-ième coordonnée d'un produit matrice-vecteur, puis conclus par unicité.`,
  ],
  rubric: rubric({
    hypotheses: t`La densité de $D(A)=\mathbb R^3$ est constatée avant de parler de l'adjoint.`,
    methode: 'L’identité définissant l’adjoint est établie directement à partir de la définition.',
    validite: 'Les manipulations de sommes et les identifications sont exactes.',
    justifications: t`L'unicité de $w$ est rattachée à la densité, non à une propriété de la matrice.`,
    conclusion: t`La matrice de $A^*$ et la valeur de $A^*v_0$ sont obtenues.`,
  }),
  variant: {
    statement: t`Dans $\mathbb R^2$, muni du produit scalaire $\langle x,y\rangle_M=x^{\mathsf T}My$ avec $M=\begin{pmatrix}1&0\\0&2\end{pmatrix}$, soit $A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$, de domaine $\mathbb R^2$. Déterminer l'adjoint de $A$ pour ce produit scalaire et le comparer à $A^{\mathsf T}$.`,
    solution: t`On cherche $B$ tel que $(Ax)^{\mathsf T}My=x^{\mathsf T}MBy$ pour tous $x,y$, c'est-à-dire $A^{\mathsf T}M=MB$. Comme $M$ est inversible, $B=M^{-1}A^{\mathsf T}M=\begin{pmatrix}1&6\\1&4\end{pmatrix}$. Cette matrice diffère de $A^{\mathsf T}=\begin{pmatrix}1&3\\2&4\end{pmatrix}$ : l'adjoint dépend du produit scalaire, et la transposée n'est l'adjoint que pour le produit euclidien.`,
    closedChecks: [
      {
        kind: 'rational-vector',
        prompt: t`Coefficients de l'adjoint pour $\langle\cdot,\cdot\rangle_M$, ligne par ligne`,
        expected: ['1', '6', '1', '4'],
        labels: ['b₁₁', 'b₁₂', 'b₂₁', 'b₂₂'],
      },
    ],
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'adjoint.intermediaire',
  theoremId: 'adjoint',
  level: 'intermediaire',
  title: 'Adjoint de la dérivation avec condition au bord',
  statement: t`Dans $H=L^2(]0,1[)$ réel, soit $A=d/dx$, de domaine $D(A)=\{u\in H^1(]0,1[):u(0)=0\}$. Montrer que $A$ est densément défini, déterminer $D(A^*)$ et l'action de $A^*$, puis comparer $D(A)$ et $D(A^*)$.`,
  source: poly(42, 'Exercice 24, intermédiaire ; définition de l’adjoint en section 6.1 (p. PDF 23)'),
  prerequisites: ['distributions'],
  concepts: ['domaine-operateur', 'adjoint-tester-domaine', 'adjoint-ipp-regularite', 'adjoint-signe', 'adjoint-densite-unicite', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'distributions', label: 'Régularité par les distributions, puis condition au bord' },
      { id: 'primitive', label: 'Identification directe par une primitive' },
    ],
    nodes: [
      { id: 'h-H', kind: 'hypothese', text: t`$H=L^2(]0,1[)$, réel, est un espace de Hilbert, et $C^\infty_c(]0,1[)$ y est dense.` },
      { id: 'd-A', kind: 'definition', text: t`$Au=u'$, de domaine $D(A)=\{u\in H^1(]0,1[):u(0)=0\}$.` },
      { id: 'h-ipp', kind: 'hypothese', text: t`Les éléments de $H^1(]0,1[)$ ont un représentant continu sur $[0,1]$, et pour $u,v\in H^1(]0,1[)$ : $\int_0^1u'v=u(1)v(1)-u(0)v(0)-\int_0^1uv'$.` },

      { id: 'dense', kind: 'consequence', text: t`$D(A)$ est dense dans $H$.` },

      { id: 's-v', kind: 'definition', local: true, text: t`Soit $v\in H^1(]0,1[)$ avec $v(1)=0$.` },
      { id: 's-bord', kind: 'egalite', text: t`Pour tout $u\in D(A)$ : $\int_0^1u'v=-\int_0^1uv'$.` },
      { id: 's-in', kind: 'inclusion', text: t`$v\in D(A^*)$ et $A^*v=-v'$.` },

      { id: 'n-v', kind: 'definition', local: true, text: t`Soit $v\in D(A^*)$, et $w=A^*v\in L^2(]0,1[)$ : on a $\int_0^1u'v=\int_0^1uw$ pour tout $u\in D(A)$.` },
      { id: 'n-test', kind: 'egalite', text: t`Pour tout $\varphi\in C^\infty_c(]0,1[)$ : $\int_0^1v\varphi'=\int_0^1w\varphi$.` },
      { id: 'n-h1', kind: 'consequence', text: t`$v'=-w$ dans $\mathcal D'(]0,1[)$, donc $v\in H^1(]0,1[)$ et $A^*v=-v'$.` },
      { id: 'n-bord', kind: 'egalite', text: t`Pour tout $u\in D(A)$ : $u(1)v(1)=0$.` },
      { id: 'n-temoin', kind: 'consequence', text: t`La fonction $u_1(x)=x$ appartient à $D(A)$, et $u_1(1)=1$.` },
      { id: 'n-cond', kind: 'consequence', text: t`$v(1)=0$.` },

      { id: 'p-W', kind: 'consequence', text: t`La fonction $W(x)=\int_x^1w(t)\,dt$ appartient à $H^1(]0,1[)$, avec $W'=-w$ et $W(1)=0$.` },
      { id: 'p-dual', kind: 'egalite', text: t`Pour tout $u\in D(A)$ : $\int_0^1uw=\int_0^1u'W$.` },
      { id: 'p-surj', kind: 'consequence', text: t`Pour toute $g\in L^2(]0,1[)$, la fonction $u_g(x)=\int_0^xg$ appartient à $D(A)$, et $u_g'=g$.` },
      { id: 'p-ortho', kind: 'egalite', text: t`Pour toute $g\in L^2(]0,1[)$ : $\int_0^1g(v-W)=0$.` },
      { id: 'p-egal', kind: 'consequence', text: t`$v=W$ presque partout : donc $v\in H^1(]0,1[)$, $v'=-w$ et $v(1)=0$.` },

      { id: 'n-in', kind: 'inclusion', text: t`$v\in H^1(]0,1[)$, $v(1)=0$ et $A^*v=-v'$.` },
      { id: 'eq-dom', kind: 'egalite', text: t`$D(A^*)=\{v\in H^1(]0,1[):v(1)=0\}$, et $A^*v=-v'$.` },
      { id: 'c-x', kind: 'consequence', text: t`$x\mapsto x$ appartient à $D(A)$ et non à $D(A^*)$ ; $x\mapsto 1-x$ appartient à $D(A^*)$ et non à $D(A)$.` },

      { id: 'fin', kind: 'conclusion', text: t`$D(A)$ et $D(A^*)$ sont distincts et non emboîtés : $A$ n'est ni égal à $A^*$, ni symétrique.` },

      { id: 'x-meme', kind: 'egalite', distractor: true, after: ['dense'], text: t`$D(A^*)=D(A)$, puisque $A^*$ ne diffère de $A$ que par le signe.` },
      { id: 'x-sans-bord', kind: 'egalite', distractor: true, after: ['n-test'], text: t`$D(A^*)=H^1(]0,1[)$ : aucune condition au bord n'est imposée à $v$.` },
      { id: 'x-signe', kind: 'egalite', distractor: true, text: t`$A^*v=v'$ pour tout $v\in D(A^*)$.` },
    ],
    justifications: [
      { id: 'j-dense', label: t`Une fonction test s'annule en $0$ : $C^\infty_c(]0,1[)\subset D(A)$.` },
      { id: 'j-ipp-bord', label: t`Intégration par parties : les conditions au bord sur $u$ et sur $v$ annulent le terme de bord.` },
      { id: 'j-def-adj', label: t`Définition de l'adjoint, avec $w=-v'\in L^2(]0,1[)$.` },
      { id: 'j-restr', label: t`Les fonctions test appartiennent à $D(A)$ : on spécialise l'identité.` },
      { id: 'j-distrib', label: t`Définition de la dérivée au sens des distributions, et $w\in L^2(]0,1[)$.` },
      { id: 'j-compare', label: t`Intégration par parties, désormais licite, comparée à l'identité définissant $w$.` },
      { id: 'j-temoin', label: t`Vérification directe : $u_1\in C^1([0,1])$ et $u_1(0)=0$.` },
      { id: 'j-tester', label: t`On teste l'identité avec une fonction de $D(A)$ non nulle en $1$.` },
      { id: 'j-synth1', label: t`Réunion de la régularité et de la condition au bord.` },
      { id: 'j-primitive', label: t`Théorème fondamental pour la primitive d'une fonction de $L^2(]0,1[)$.`, theorem: 'theoreme-fondamental' },
      { id: 'j-ipp-W', label: t`Intégration par parties : $\int_0^1uw=-\int_0^1uW'$, le terme de bord s'annulant car $u(0)=0$ et $W(1)=0$.` },
      { id: 'j-primitive-g', label: t`Théorème fondamental ; $u_g(0)=0$.`, theorem: 'theoreme-fondamental' },
      { id: 'j-substituer', label: t`On écrit $\int_0^1u_g'v=\int_0^1u_gw=\int_0^1u_g'W$, avec $u_g'=g$.` },
      { id: 'j-g-egal', label: t`On prend $g=v-W$ : la norme $L^2$ de $v-W$ est nulle.` },
      { id: 'j-synth2', label: 'Lecture de l’égalité obtenue.' },
      { id: 'j-double', label: 'Double inclusion.' },
      { id: 'j-evaluation', label: t`Évaluation de chaque fonction en $0$ et en $1$.` },
      { id: 'j-incomparables', label: t`Si $A\subset A^*$, on aurait $D(A)\subset D(A^*)$ : les deux témoins l'interdisent.` },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-ipp-direct', label: t`Intégration par parties appliquée d'emblée à $v\in D(A^*)$.` },
      { id: 'j-cc-suffit', label: t`Tester contre $C^\infty_c(]0,1[)$, qui est dense dans $L^2(]0,1[)$, détermine $D(A^*)$.` },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['h-H', 'd-A'], to: 'dense', by: 'j-dense' },

      { from: ['s-v', 'd-A', 'h-ipp'], to: 's-bord', by: 'j-ipp-bord' },
      { from: ['s-bord', 'dense'], to: 's-in', by: 'j-def-adj' },

      { from: ['n-v', 'd-A'], to: 'n-test', by: 'j-restr', path: 'distributions' },
      { from: ['n-test'], to: 'n-h1', by: 'j-distrib', path: 'distributions' },
      { from: ['n-h1', 'n-v', 'd-A', 'h-ipp'], to: 'n-bord', by: 'j-compare', path: 'distributions' },
      { from: ['d-A'], to: 'n-temoin', by: 'j-temoin', path: 'distributions' },
      { from: ['n-bord', 'n-temoin'], to: 'n-cond', by: 'j-tester', path: 'distributions' },
      { from: ['n-h1', 'n-cond'], to: 'n-in', by: 'j-synth1', path: 'distributions' },

      { from: ['n-v'], to: 'p-W', by: 'j-primitive', path: 'primitive' },
      { from: ['p-W', 'd-A', 'h-ipp'], to: 'p-dual', by: 'j-ipp-W', path: 'primitive' },
      { from: ['d-A'], to: 'p-surj', by: 'j-primitive-g', path: 'primitive' },
      { from: ['p-dual', 'p-surj', 'n-v'], to: 'p-ortho', by: 'j-substituer', path: 'primitive' },
      { from: ['p-ortho', 'p-W'], to: 'p-egal', by: 'j-g-egal', path: 'primitive' },
      { from: ['p-egal'], to: 'n-in', by: 'j-synth2', path: 'primitive' },

      { from: ['s-in', 'n-in'], to: 'eq-dom', by: 'j-double' },
      { from: ['eq-dom', 'd-A'], to: 'c-x', by: 'j-evaluation' },
      { from: ['eq-dom', 'c-x'], to: 'fin', by: 'j-incomparables' },
    ],
    traps: [
      {
        conclusion: 'x-meme',
        verdict: 'incorrect',
        concept: 'domaine-operateur',
        message: t`L'expression différentielle ne fixe pas le domaine : l'adjoint a ici une condition au bord différente de celle de $A$.`,
        counterexample: t`$v(x)=1-x$ appartient à $D(A^*)$, car $v(1)=0$, mais pas à $D(A)$, car $v(0)=1$.`,
      },
      {
        conclusion: 'x-sans-bord',
        verdict: 'incorrect',
        concept: 'adjoint-tester-domaine',
        message: t`Tester seulement contre $C^\infty_c(]0,1[)$ ne voit pas le bord. La condition sur $v$ provient des éléments de $D(A)$ non nuls en $1$.`,
        counterexample: t`Pour $v\equiv 1$ et $u(x)=x\in D(A)$ : $\int_0^1u'v=1$, alors que $-\int_0^1uv'=0$.`,
      },
      {
        conclusion: 'x-signe',
        verdict: 'incorrect',
        concept: 'adjoint-signe',
        message: t`L'intégration par parties fait apparaître un signe : on ne peut pas transporter $d/dx$ sur $v$ sans le changer en $-d/dx$.`,
        counterexample: t`$u(x)=x$ et $v(x)=1-x$ : $\int_0^1u'v=\frac12$, et $\int_0^1uv'=-\frac12$.`,
      },
      {
        conclusion: 'n-bord',
        by: 'j-ipp-direct',
        verdict: 'incorrect',
        concept: 'adjoint-ipp-regularite',
        message: t`À ce stade, on sait seulement $v\in L^2(]0,1[)$ : ni $v'$ ni $v(1)$ n'ont de sens. La régularité doit d'abord être établie, en testant contre $C^\infty_c(]0,1[)$.`,
      },
      {
        conclusion: 'eq-dom',
        by: 'j-cc-suffit',
        verdict: 'incorrect',
        concept: 'adjoint-tester-domaine',
        message: t`Les fonctions test s'annulent au bord : elles ne déterminent ni $v(1)$, ni la condition cherchée.`,
        counterexample: t`$v\equiv 1$ vérifie $\int_0^1v\varphi'=\int_0^1 0\cdot\varphi$ pour toute fonction test, et pourtant $v\notin D(A^*)$.`,
      },
      {
        conclusion: 's-in',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`L'appartenance à $D(A^*)$ se vérifie : il faut exhiber $w$ tel que l'identité ait lieu pour tout $u\in D(A)$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'dense',
        label: 'Ne plus disposer de la densité du domaine',
        necessary: true,
        explanation: t`Sans densité du domaine, la relation définissant l'adjoint ne détermine plus $w$.`,
        counterexample: t`Si $D(B)=\{u\in H^1(]0,1[):u(0)=0,\ u=0\text{ sur }]\tfrac12,1[\}$, toute fonction de $L^2(]0,1[)$ portée par $]\tfrac12,1[$ est orthogonale à $D(B)$ : le vecteur $w$ n'est pas unique.`,
      },
      {
        hypothesis: 'n-temoin',
        label: t`Ne plus disposer d'une fonction de $D(A)$ non nulle en $1$`,
        necessary: false,
        explanation: t`La voie distributionnelle ne peut plus conclure $v(1)=0$ ; la voie par primitive reste disponible, car elle utilise $u\mapsto u'$ surjective.`,
        counterexample: t`Pour $D(A_0)=\{u\in H^1(]0,1[):u(0)=u(1)=0\}$, toutes les fonctions du domaine s'annulent en $1$, et $D(A_0^*)=H^1(]0,1[)$ : aucune condition au bord sur $v$.`,
      },
    ],
  },
  closedChecks: [
    { kind: 'rational', prompt: t`Pour $u(x)=x$ et $v(x)=1-x$ : valeur de $\int_0^1u'v$`, expected: '1/2' },
    { kind: 'rational', prompt: t`Pour $u(x)=x$ et $v(x)=x$ : valeur de $\int_0^1u'v+\int_0^1uv'$`, expected: '1' },
  ],
  solution: t`**Densité.** $C^\infty_c(]0,1[)\subset D(A)$ et $C^\infty_c(]0,1[)$ est dense dans $L^2(]0,1[)$.

**Première inclusion.** Si $v\in H^1(]0,1[)$ et $v(1)=0$, alors pour $u\in D(A)$ :
$$\int_0^1u'v=u(1)v(1)-u(0)v(0)-\int_0^1uv'=-\int_0^1uv'.$$
Donc $v\in D(A^*)$ et $A^*v=-v'$.

**Inclusion réciproque.** Soit $v\in D(A^*)$ et $w=A^*v$ : $\int_0^1u'v=\int_0^1uw$ pour tout $u\in D(A)$.

*Voie distributionnelle.* En prenant $u=\varphi\in C^\infty_c(]0,1[)$, on obtient $v'=-w$ dans $\mathcal D'(]0,1[)$, donc $v\in H^1(]0,1[)$. Une intégration par parties, désormais licite, donne pour $u\in D(A)$ : $\int_0^1u'v=u(1)v(1)+\int_0^1uw$, d'où $u(1)v(1)=0$. Avec $u(x)=x$, on obtient $v(1)=0$.

*Voie par primitive.* Soit $W(x)=\int_x^1w$ : $W\in H^1(]0,1[)$, $W'=-w$, $W(1)=0$. Pour $u\in D(A)$, $\int_0^1uw=-\int_0^1uW'=\int_0^1u'W$, le terme de bord étant nul. Donc $\int_0^1u'(v-W)=0$ pour tout $u\in D(A)$. Pour $g\in L^2(]0,1[)$, la fonction $u_g(x)=\int_0^xg$ appartient à $D(A)$ et $u_g'=g$ : en prenant $g=v-W$, on trouve $v=W$. Ainsi $v\in H^1(]0,1[)$, $v(1)=0$, $A^*v=-v'$.

**Comparaison.** $D(A^*)=\{v\in H^1(]0,1[):v(1)=0\}$ et $D(A)=\{u\in H^1(]0,1[):u(0)=0\}$ : la fonction $x$ est dans $D(A)\setminus D(A^*)$, et $1-x$ dans $D(A^*)\setminus D(A)$. En particulier, $A\not\subset A^*$ : $A$ n'est pas symétrique.`,
  steps: [
    'Vérifier la densité du domaine.',
    t`Établir $\{v\in H^1(]0,1[):v(1)=0\}\subset D(A^*)$ par intégration par parties.`,
    t`Pour $v\in D(A^*)$, établir la régularité $H^1$ et l'action de $A^*$.`,
    t`Obtenir la condition $v(1)=0$ à partir d'une fonction du domaine non nulle en $1$.`,
    'Comparer les deux domaines à l’aide de témoins explicites.',
  ],
  commonErrors: [
    { id: 'e-meme', description: t`Affirmer que $D(A^*)=D(A)$ parce que l'expression formelle est la même au signe près.`, concept: 'domaine-operateur' },
    { id: 'e-ipp', description: t`Intégrer par parties pour un $v\in D(A^*)$ sans avoir établi $v\in H^1(]0,1[)$.`, concept: 'adjoint-ipp-regularite' },
    { id: 'e-cc', description: t`Conclure sur le domaine à partir des seules fonctions test $C^\infty_c(]0,1[)$.`, concept: 'adjoint-tester-domaine' },
    { id: 'e-signe', description: 'Oublier le signe de l’intégration par parties.', concept: 'adjoint-signe' },
  ],
  hints: [
    t`Commence par une inclusion facile : pour quels $v\in H^1(]0,1[)$ le terme de bord s'annule-t-il pour tout $u\in D(A)$ ?`,
    t`Pour l'inclusion réciproque, $v$ n'est a priori que dans $L^2$ : teste d'abord contre $C^\infty_c(]0,1[)$. Ensuite seulement, compare avec une fonction du domaine non nulle en $1$.`,
    t`Avec $u(x)=x$, l'identité $u(1)v(1)=0$ donne $v(1)=0$. On peut aussi poser $W(x)=\int_x^1w$ et utiliser la surjectivité de $u\mapsto u'$ de $D(A)$ sur $L^2(]0,1[)$.`,
  ],
  rubric: rubric({
    hypotheses: t`La densité de $D(A)$ est établie, et les domaines sont explicités.`,
    methode: 'La double inclusion est menée dans le bon ordre : régularité, puis condition au bord.',
    validite: t`Aucune intégration par parties n'est effectuée avant que $v\in H^1(]0,1[)$ soit acquis.`,
    justifications: t`La condition $v(1)=0$ est tirée d'une fonction de $D(A)$ non nulle en $1$.`,
    conclusion: t`$D(A^*)$ et $A^*$ sont identifiés, et les deux domaines sont comparés explicitement.`,
  }),
  variant: {
    statement: t`Dans $H=L^2(]0,1[)$ réel, soit $B=d/dx$ de domaine $D(B)=\{u\in H^1(]0,1[):u(0)=u(1)\}$. Déterminer $D(B^*)$ et $B^*$.`,
    solution: t`$D(B)$ contient $C^\infty_c(]0,1[)$ : il est dense. Si $v\in D(B)$, alors pour $u\in D(B)$, le terme de bord vaut $u(1)v(1)-u(0)v(0)=u(0)\big(v(1)-v(0)\big)=0$ : donc $\int_0^1u'v=-\int_0^1uv'$, soit $v\in D(B^*)$ et $B^*v=-v'$. Réciproquement, si $v\in D(B^*)$ et $w=B^*v$, un test contre $C^\infty_c(]0,1[)$ donne $v\in H^1(]0,1[)$, $v'=-w$. L'intégration par parties donne alors $u(0)\big(v(1)-v(0)\big)=0$ pour tout $u\in D(B)$, et $u\equiv 1$ fournit $v(1)=v(0)$. Ainsi $D(B^*)=D(B)$ et $B^*=-B$ : les domaines coïncident, mais $B$ n'est pas auto-adjoint.`,
    closedChecks: [
      { kind: 'rational', prompt: t`Pour $u\in D(B)$ et $v\equiv 1$ : valeur de $\int_0^1u'$`, expected: '0' },
    ],
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h-H', kind: 'hypothese', text: t`$H=L^2(]0,1[)$, réel, est un espace de Hilbert, et $C^\infty_c(]0,1[)$ y est dense.` },
        { id: 'd-B', kind: 'definition', text: t`$Bu=u'$, de domaine $D(B)=\{u\in H^1(]0,1[):u(0)=u(1)\}$.` },
        { id: 'h-ipp', kind: 'hypothese', text: t`Pour $u,v\in H^1(]0,1[)$ : $\int_0^1u'v=u(1)v(1)-u(0)v(0)-\int_0^1uv'$.` },

        { id: 'dense', kind: 'consequence', text: t`$D(B)$ est dense dans $H$.` },

        { id: 's-v', kind: 'definition', local: true, text: t`Soit $v\in H^1(]0,1[)$ avec $v(0)=v(1)$.` },
        { id: 's-bord', kind: 'egalite', text: t`Pour tout $u\in D(B)$ : $\int_0^1u'v=-\int_0^1uv'$.` },
        { id: 's-in', kind: 'inclusion', text: t`$v\in D(B^*)$ et $B^*v=-v'$.` },

        { id: 'n-v', kind: 'definition', local: true, text: t`Soit $v\in D(B^*)$ et $w=B^*v$ : $\int_0^1u'v=\int_0^1uw$ pour tout $u\in D(B)$.` },
        { id: 'n-test', kind: 'egalite', text: t`Pour tout $\varphi\in C^\infty_c(]0,1[)$ : $\int_0^1v\varphi'=\int_0^1w\varphi$.` },
        { id: 'n-h1', kind: 'consequence', text: t`$v'=-w$ dans $\mathcal D'(]0,1[)$, donc $v\in H^1(]0,1[)$ et $B^*v=-v'$.` },
        { id: 'n-bord', kind: 'egalite', text: t`Pour tout $u\in D(B)$ : $u(0)\big(v(1)-v(0)\big)=0$.` },
        { id: 'n-temoin', kind: 'consequence', text: t`La fonction constante $u_1\equiv 1$ appartient à $D(B)$.` },
        { id: 'n-cond', kind: 'consequence', text: t`$v(1)=v(0)$.` },
        { id: 'n-in', kind: 'inclusion', text: t`$v\in D(B)$ et $B^*v=-v'$.` },

        { id: 'fin', kind: 'conclusion', text: t`$D(B^*)=D(B)$ et $B^*=-B$.` },

        { id: 'x-dir', kind: 'egalite', distractor: true, text: t`$D(B^*)=\{v\in H^1(]0,1[):v(1)=0\}$.` },
        { id: 'x-auto', kind: 'egalite', distractor: true, after: ['n-in'], text: t`$B$ est auto-adjoint.` },
      ],
      justifications: [
        { id: 'j-dense', label: t`Une fonction test vérifie $\varphi(0)=\varphi(1)=0$ : $C^\infty_c(]0,1[)\subset D(B)$.` },
        { id: 'j-ipp-bord', label: t`Intégration par parties : le terme de bord vaut $u(0)\big(v(1)-v(0)\big)$.` },
        { id: 'j-def', label: t`Définition de l'adjoint, avec $w=-v'\in L^2(]0,1[)$.` },
        { id: 'j-restr', label: t`Les fonctions test appartiennent à $D(B)$.` },
        { id: 'j-distrib', label: 'Définition de la dérivée au sens des distributions.' },
        { id: 'j-compare', label: t`Intégration par parties, désormais licite, comparée à l'identité définissant $w$.` },
        { id: 'j-temoin', label: t`$u_1\equiv 1$ est dans $H^1(]0,1[)$ et $u_1(0)=u_1(1)$.` },
        { id: 'j-tester', label: t`On teste avec une fonction de $D(B)$ non nulle en $0$.` },
        { id: 'j-synth', label: 'Réunion de la régularité et de la condition de bord.' },
        { id: 'j-double', label: 'Double inclusion.' },
        { id: 'j-ipp-direct', label: t`Intégration par parties appliquée d'emblée à $v\in D(B^*)$.` },
      ],
      rules: [
        { from: ['h-H', 'd-B'], to: 'dense', by: 'j-dense' },
        { from: ['s-v', 'd-B', 'h-ipp'], to: 's-bord', by: 'j-ipp-bord' },
        { from: ['s-bord', 'dense'], to: 's-in', by: 'j-def' },
        { from: ['n-v', 'd-B'], to: 'n-test', by: 'j-restr' },
        { from: ['n-test'], to: 'n-h1', by: 'j-distrib' },
        { from: ['n-h1', 'n-v', 'd-B', 'h-ipp'], to: 'n-bord', by: 'j-compare' },
        { from: ['d-B'], to: 'n-temoin', by: 'j-temoin' },
        { from: ['n-bord', 'n-temoin'], to: 'n-cond', by: 'j-tester' },
        { from: ['n-h1', 'n-cond', 'd-B'], to: 'n-in', by: 'j-synth' },
        { from: ['s-in', 'n-in'], to: 'fin', by: 'j-double' },
      ],
      traps: [
        {
          conclusion: 'x-dir',
          verdict: 'incorrect',
          concept: 'domaine-operateur',
          message: t`La condition au bord de l'adjoint dépend du domaine de départ. Ici, le domaine autorise toutes les valeurs communes en $0$ et en $1$.`,
          counterexample: t`$v\equiv 1$ vérifie $\int_0^1u'=u(1)-u(0)=0$ pour tout $u\in D(B)$ : donc $v\in D(B^*)$, alors que $v(1)=1$.`,
        },
        {
          conclusion: 'x-auto',
          verdict: 'incorrect',
          concept: 'symetrie-autoadjonction',
          message: t`Des domaines égaux ne suffisent pas : ici $B^*=-B\neq B$.`,
          counterexample: t`Pour $u(x)=\sin(2\pi x)\in D(B)$ : $Bu=2\pi\cos(2\pi x)$, et $B^*u=-Bu$.`,
        },
        {
          conclusion: 'n-bord',
          by: 'j-ipp-direct',
          verdict: 'incorrect',
          concept: 'adjoint-ipp-regularite',
          message: t`Le terme de bord n'a de sens qu'une fois $v\in H^1(]0,1[)$ acquis : la régularité passe d'abord par un test contre $C^\infty_c(]0,1[)$.`,
        },
      ],
      removable: [
        {
          hypothesis: 'n-temoin',
          label: t`Ne plus disposer d'une fonction de $D(B)$ non nulle au bord`,
          necessary: true,
          explanation: 'La condition sur les valeurs au bord n’apparaît plus.',
          counterexample: t`Pour $D(B_0)=H^1_0(]0,1[)$, toute fonction du domaine s'annule au bord, et $D(B_0^*)=H^1(]0,1[)$.`,
        },
      ],
    },
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'adjoint.difficile',
  theoremId: 'adjoint',
  level: 'difficile',
  title: 'Symétrique sans être auto-adjoint',
  statement: t`Dans $H=L^2(]0,1[)$ réel, soit $S=-d^2/dx^2$ de domaine $D(S)=\{u\in H^2(]0,1[):u(0)=u'(0)=u(1)=u'(1)=0\}$. Montrer que $S$ est densément défini et symétrique, mais non auto-adjoint, en déterminant $D(S^*)$, et expliquer ce qui fait défaut à la symétrie seule pour donner l'auto-adjonction.`,
  source: poly(42, 'Exercice 24, difficile ; symétrie et auto-adjonction en section 6.1 (p. PDF 23)'),
  prerequisites: ['distributions'],
  concepts: ['symetrie-autoadjonction', 'domaine-operateur', 'densite-fermeture', 'adjoint-tester-domaine', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'temoin', label: t`Un témoin explicite de $D(S^*)\setminus D(S)$` },
      { id: 'domaine', label: t`Identification complète de $D(S^*)$` },
    ],
    nodes: [
      { id: 'h-H', kind: 'hypothese', text: t`$H=L^2(]0,1[)$, réel, est un espace de Hilbert, et $C^\infty_c(]0,1[)$ y est dense.` },
      { id: 'd-S', kind: 'definition', text: t`$Su=-u''$, de domaine $D(S)=\{u\in H^2(]0,1[):u(0)=u(1)=0\text{ et }u'(0)=u'(1)=0\}$.` },
      { id: 'h-cond', kind: 'hypothese', text: t`Tout $u\in D(S)$ vérifie en particulier $u'(0)=u'(1)=0$, en plus de $u(0)=u(1)=0$.` },
      { id: 'h-green', kind: 'hypothese', text: t`Pour $u,v\in H^2(]0,1[)$ : $\int_0^1(-u'')v-\int_0^1u(-v'')=\big[uv'-u'v\big]_0^1$.` },
      { id: 'h-lemme', kind: 'hypothese', text: t`Si $v\in L^2(]0,1[)$ et si la dérivée seconde de $v$ au sens des distributions appartient à $L^2(]0,1[)$, alors $v\in H^2(]0,1[)$.` },

      { id: 'dense', kind: 'consequence', text: t`$D(S)$ est dense dans $H$.` },

      { id: 'sym-uv', kind: 'definition', local: true, text: t`Soient $u,v\in D(S)$.` },
      { id: 'sym-green', kind: 'egalite', text: t`$\langle Su,v\rangle-\langle u,Sv\rangle=\big[uv'-u'v\big]_0^1=0$.` },
      { id: 'sym', kind: 'consequence', text: t`$S$ est symétrique.` },
      { id: 'ext', kind: 'application-theoreme', text: t`$S\subset S^*$, et $S^*$ est fermé.` },

      { id: 't-v1', kind: 'egalite', text: t`Pour tout $u\in D(S)$ : $\langle Su,1\rangle=-\int_0^1u''=u'(0)-u'(1)=0$.` },
      { id: 't-dom', kind: 'inclusion', text: t`La fonction constante $v_1\equiv 1$ appartient à $D(S^*)$, et $S^*v_1=0$.` },
      { id: 't-non', kind: 'consequence', text: t`$v_1\notin D(S)$, car $v_1(0)=1\neq 0$.` },

      { id: 'd-v', kind: 'definition', local: true, text: t`Soit $v\in D(S^*)$ et $w=S^*v$.` },
      { id: 'd-test', kind: 'egalite', text: t`Pour tout $\varphi\in C^\infty_c(]0,1[)$ : $-\int_0^1v\varphi''=\int_0^1w\varphi$.` },
      { id: 'd-reg', kind: 'consequence', text: t`$v''=-w$ dans $\mathcal D'(]0,1[)$, donc $v\in H^2(]0,1[)$.` },
      { id: 'd-sub', kind: 'inclusion', text: t`$D(S^*)\subset H^2(]0,1[)$, et $S^*v=-v''$.` },
      { id: 'd-sup', kind: 'inclusion', text: t`$H^2(]0,1[)\subset D(S^*)$.` },
      { id: 'd-eq', kind: 'egalite', text: t`$D(S^*)=H^2(]0,1[)$, et $S^*v=-v''$.` },
      {
        id: 'd-quot',
        kind: 'egalite',
        text: t`$\dim\big(D(S^*)/D(S)\big)=4$.`,
        masked: t`Dimension de $D(S^*)/D(S)$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Dimension de $D(S^*)/D(S)$`, expected: '4' },
      },

      { id: 'strict', kind: 'inclusion', text: t`$D(S)\subsetneq D(S^*)$, donc $S\neq S^*$.` },

      { id: 'm-T', kind: 'definition', local: true, text: t`Soit $T$ un opérateur symétrique de domaine $D(T)=H$.` },
      { id: 'm-eq', kind: 'consequence', text: t`Alors $T=T^*$ : un opérateur symétrique défini sur $H$ tout entier est auto-adjoint.` },

      { id: 'fin', kind: 'conclusion', text: t`$S$ est densément défini et symétrique, mais $S\neq S^*$ : la symétrie donne seulement $D(S)\subset D(S^*)$, et l'obstruction porte sur les domaines.` },

      { id: 'x-auto', kind: 'consequence', distractor: true, after: ['sym'], text: t`$S=S^*$, car $\langle Su,v\rangle=\langle u,Sv\rangle$ pour tous $u,v\in D(S)$.` },
      { id: 'x-dense', kind: 'egalite', distractor: true, after: ['ext'], text: t`Comme $D(S)$ est dense dans $H$ et contenu dans $D(S^*)$, on a $D(S^*)=D(S)$.` },
      { id: 'x-ferme', kind: 'consequence', distractor: true, after: ['ext'], text: t`$S$ étant fermé et symétrique, on a $S=S^*$.` },
    ],
    justifications: [
      { id: 'j-dense', label: t`Une fonction test et sa dérivée s'annulent au bord : $C^\infty_c(]0,1[)\subset D(S)$.` },
      { id: 'j-green-bord', label: t`Formule de Green : le crochet est nul, car $u$, $u'$, $v$ et $v'$ s'annulent au bord.` },
      { id: 'j-def-sym', label: t`Définition d'un opérateur symétrique.` },
      { id: 'j-thm', label: 'Théorème sur l’adjoint : un opérateur symétrique est contenu dans son adjoint, et l’adjoint est fermé.', theorem: 'adjoint' },
      { id: 'j-calcul-1', label: t`Théorème fondamental pour $u'\in H^1(]0,1[)$, puis conditions sur $u'$ au bord.` },
      { id: 'j-def-adj', label: t`Définition de l'adjoint, avec $w=0$.` },
      { id: 'j-eval', label: t`Évaluation de $v_1$ en $0$ et définition de $D(S)$.` },
      { id: 'j-strict', label: t`L'inclusion $D(S)\subset D(S^*)$ est stricte : un élément de $D(S^*)$ n'est pas dans $D(S)$.` },
      { id: 'j-restr', label: t`Les fonctions test appartiennent à $D(S)$.` },
      { id: 'j-distrib', label: t`Définition de la dérivée seconde au sens des distributions, puis lemme de régularité.` },
      { id: 'j-lecture', label: 'Lecture du résultat précédent.' },
      { id: 'j-green-sup', label: t`Pour $v\in H^2(]0,1[)$ et $u\in D(S)$ : le crochet de Green est nul grâce aux quatre conditions sur $u$, et $w=-v''\in L^2(]0,1[)$.` },
      { id: 'j-double', label: 'Double inclusion.' },
      { id: 'j-quotient', label: t`L'application $v\mapsto(v(0),v'(0),v(1),v'(1))$ est linéaire, surjective de $H^2(]0,1[)$ sur $\mathbb R^4$, de noyau $D(S)$.` },
      { id: 'j-strict2', label: t`Un quotient de dimension non nulle signifie une inclusion stricte.` },
      { id: 'j-plein', label: t`On a $D(T^*)\subset H=D(T)$, et la symétrie donne l'inclusion réciproque.` },
      { id: 'j-synthese', label: 'Réunion des résultats établis.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-expression', label: t`Comme $v_1''=0$, on a $S^*v_1=-v_1''=0$.` },
      { id: 'j-formelle', label: t`L'expression $-d^2/dx^2$ est formellement symétrique.` },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['h-H', 'd-S'], to: 'dense', by: 'j-dense' },
      { from: ['sym-uv', 'd-S', 'h-green'], to: 'sym-green', by: 'j-green-bord' },
      { from: ['sym-green'], to: 'sym', by: 'j-def-sym' },
      { from: ['sym', 'dense'], to: 'ext', by: 'j-thm' },

      { from: ['d-S', 'h-cond'], to: 't-v1', by: 'j-calcul-1', path: 'temoin' },
      { from: ['t-v1', 'dense'], to: 't-dom', by: 'j-def-adj', path: 'temoin' },
      { from: ['d-S'], to: 't-non', by: 'j-eval', path: 'temoin' },
      { from: ['ext', 't-dom', 't-non'], to: 'strict', by: 'j-strict', path: 'temoin' },

      { from: ['d-v', 'd-S'], to: 'd-test', by: 'j-restr', path: 'domaine' },
      { from: ['d-test', 'h-lemme'], to: 'd-reg', by: 'j-distrib', path: 'domaine' },
      { from: ['d-reg'], to: 'd-sub', by: 'j-lecture', path: 'domaine' },
      { from: ['h-green', 'd-S', 'h-cond', 'dense'], to: 'd-sup', by: 'j-green-sup', path: 'domaine' },
      { from: ['d-sub', 'd-sup'], to: 'd-eq', by: 'j-double', path: 'domaine' },
      { from: ['d-eq', 'd-S'], to: 'd-quot', by: 'j-quotient', path: 'domaine' },
      { from: ['ext', 'd-eq', 'd-quot'], to: 'strict', by: 'j-strict2', path: 'domaine' },

      { from: ['m-T'], to: 'm-eq', by: 'j-plein' },
      { from: ['sym', 'dense', 'strict', 'm-eq'], to: 'fin', by: 'j-synthese' },
    ],
    traps: [
      {
        conclusion: 'x-auto',
        verdict: 'incorrect',
        concept: 'symetrie-autoadjonction',
        message: t`La symétrie est une identité sur $D(S)$ : elle ne dit rien de l'appartenance d'un $v\notin D(S)$ à $D(S^*)$.`,
        counterexample: t`$v_1\equiv 1$ appartient à $D(S^*)$ et n'appartient pas à $D(S)$.`,
      },
      {
        conclusion: 'x-dense',
        verdict: 'incorrect',
        concept: 'densite-fermeture',
        message: t`Densité et égalité sont deux choses différentes : un sous-espace dense n'épuise pas les sous-espaces qui le contiennent.`,
        counterexample: t`$D(S)$ est dense dans $L^2(]0,1[)$, et $D(S)\subset D(S^*)$, mais $v_1\equiv 1\in D(S^*)\setminus D(S)$.`,
      },
      {
        conclusion: 'x-ferme',
        verdict: 'incorrect',
        concept: 'symetrie-autoadjonction',
        message: t`Être fermé et symétrique ne suffit pas : l'auto-adjonction est une égalité de domaines.`,
        counterexample: t`$S$ est fermé (la norme du graphe équivaut sur $D(S)$ à celle de $H^2$, et $D(S)$ est fermé dans $H^2$), symétrique, et $v_1\equiv 1\in D(S^*)\setminus D(S)$.`,
      },
      {
        conclusion: 't-dom',
        by: 'j-expression',
        verdict: 'incorrect',
        concept: 'domaine-operateur',
        message: t`Le calcul formel de $-v_1''$ ne dit pas que $v_1\in D(S^*)$ : il faut vérifier la relation d'adjonction pour tout $u\in D(S)$, ce qui utilise les conditions sur $u'$.`,
      },
      {
        conclusion: 'sym',
        by: 'j-formelle',
        verdict: 'incorrect',
        concept: 'domaine-operateur',
        message: t`La symétrie dépend du domaine : sans conditions au bord, le crochet de Green ne s'annule pas.`,
        counterexample: t`Sur $H^2(]0,1[)$, pour $u(x)=x$ et $v(x)=x^2$ : $\langle -u'',v\rangle=0$ et $\langle u,-v''\rangle=-1$.`,
      },
      {
        conclusion: 'strict',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`L'inclusion stricte se démontre : il faut exhiber un élément de $D(S^*)$ hors de $D(S)$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-cond',
        label: t`Retirer les conditions $u'(0)=u'(1)=0$ du domaine`,
        necessary: true,
        explanation: t`Le crochet de Green ne s'annule plus, le témoin $v_1$ ne convient plus. Avec les seules conditions $u(0)=u(1)=0$, on obtient la réalisation de Dirichlet, qui est auto-adjointe.`,
        counterexample: t`Pour $u(x)=x(1-x)$, qui vérifie $u(0)=u(1)=0$ et $u'(0)\neq 0$ : $\langle -u'',1\rangle=\int_0^12=2\neq 0$.`,
      },
      {
        hypothesis: 'dense',
        label: 'Ne plus disposer de la densité du domaine',
        necessary: true,
        explanation: 'Sans densité, l’adjoint n’est pas défini et toute la comparaison est vide.',
        counterexample: t`Si le domaine n'est pas dense, tout $w$ orthogonal au domaine fournit un autre candidat : $S^*v$ n'est pas défini.`,
      },
    ],
  },
  closedChecks: [
    { kind: 'rational', prompt: t`Pour $u(x)=x^2(1-x)^2\in D(S)$ : valeur de $\int_0^1(-u'')$`, expected: '0' },
    { kind: 'rational', prompt: t`Valeur constante de $S^*v$ pour $v(x)=x^2$`, expected: '-2' },
  ],
  solution: t`**Densité.** Une fonction test et sa dérivée s'annulent au bord, donc $C^\infty_c(]0,1[)\subset D(S)$, dense dans $L^2(]0,1[)$.

**Symétrie.** Pour $u,v\in D(S)$, la formule de Green donne $\langle Su,v\rangle-\langle u,Sv\rangle=[uv'-u'v]_0^1=0$. Ainsi $S$ est symétrique, et $S\subset S^*$.

**Domaine de l'adjoint.** Soit $v\in D(S^*)$ et $w=S^*v$. Pour $\varphi\in C^\infty_c(]0,1[)$ : $-\int_0^1v\varphi''=\int_0^1w\varphi$, d'où $v''=-w$ dans $\mathcal D'(]0,1[)$, et $v\in H^2(]0,1[)$, avec $S^*v=-v''$. Réciproquement, si $v\in H^2(]0,1[)$ et $u\in D(S)$, le crochet $[uv'-u'v]_0^1$ est nul à cause des quatre conditions sur $u$ : $\langle Su,v\rangle=\langle u,-v''\rangle$. Donc $D(S^*)=H^2(]0,1[)$.

**Non-auto-adjonction.** Il suffit d'un témoin : $v_1\equiv 1$ vérifie $\langle Su,v_1\rangle=-\int_0^1u''=u'(0)-u'(1)=0$, donc $v_1\in D(S^*)$, $S^*v_1=0$, et $v_1\notin D(S)$ car $v_1(0)=1$. Plus précisément, $D(S)$ est le noyau de $v\mapsto(v(0),v'(0),v(1),v'(1))$, surjective de $H^2(]0,1[)$ sur $\mathbb R^4$ : $\dim D(S^*)/D(S)=4$.

**Mécanisme.** La symétrie est une identité sur $D(S)$ et n'entraîne que $D(S)\subset D(S^*)$. Plus $D(S)$ est petit, moins la relation d'adjonction contraint $v$, donc plus $D(S^*)$ est grand. Si le domaine était $H$ tout entier, on aurait $D(S^*)\subset H=D(S)$ : un opérateur symétrique partout défini est auto-adjoint ; l'obstruction n'apparaît que pour un domaine strict, le cas typique des opérateurs différentiels non bornés. On peut vérifier que les réalisations de Dirichlet et de Neumann sont deux extensions auto-adjointes distinctes de $S$, contenues dans $S^*$.`,
  steps: [
    'Vérifier la densité du domaine.',
    'Établir la symétrie par la formule de Green.',
    t`Obtenir $S\subset S^*$.`,
    t`Exhiber un élément de $D(S^*)$ hors de $D(S)$, ou identifier $D(S^*)$ en entier.`,
    'Expliquer que l’auto-adjonction est une égalité de domaines, fausse ici.',
  ],
  commonErrors: [
    { id: 'e-sym-auto', description: 'Conclure à l’auto-adjonction à partir de la seule symétrie.', concept: 'symetrie-autoadjonction' },
    { id: 'e-dense', description: t`Conclure $D(S)=D(S^*)$ de la densité de $D(S)$.`, concept: 'densite-fermeture' },
    { id: 'e-formel', description: 'Raisonner sur l’expression différentielle sans préciser les domaines.', concept: 'domaine-operateur' },
  ],
  hints: [
    t`La symétrie porte sur $D(S)$. Que demande l'auto-adjonction en plus ? Cherche où pourrait se trouver un élément de $D(S^*)$ hors de $D(S)$.`,
    t`Deux intégrations par parties montrent que le crochet de Green est nul pour $u\in D(S)$, quels que soient $v(0),v'(0),v(1),v'(1)$. Tu peux chercher un témoin très simple.`,
    t`La fonction constante $v_1\equiv 1$ convient : $\langle Su,v_1\rangle=u'(0)-u'(1)=0$. Pour le domaine complet, teste contre $C^\infty_c(]0,1[)$, puis utilise la formule de Green.`,
  ],
  rubric: rubric({
    hypotheses: t`La densité de $D(S)$ et les conditions au bord sont explicitées.`,
    methode: 'La symétrie est établie sur le domaine, puis comparée à l’adjoint.',
    validite: t`L'inclusion $D(S)\subset D(S^*)$ est stricte, et le témoin est vérifié.`,
    justifications: 'Le rôle des conditions au bord et de la densité est identifié, sans confusion avec l’égalité des domaines.',
    conclusion: 'La symétrie sans auto-adjonction est établie et expliquée.',
  }),
  variant: {
    statement: t`Dans $H=L^2(]0,1[)$ réel, soit $A_D=-d^2/dx^2$ de domaine $D(A_D)=\{u\in H^2(]0,1[):u(0)=u(1)=0\}$. Démontrer que $A_D$ est symétrique et auto-adjoint.`,
    solution: t`La symétrie résulte de la formule de Green : le crochet $[uv'-u'v]_0^1$ est nul pour $u,v\in D(A_D)$. Soit $v\in D(A_D^*)$ et $w=A_D^*v$. Un test contre $C^\infty_c(]0,1[)$ donne $v''=-w$ dans $\mathcal D'(]0,1[)$, donc $v\in H^2(]0,1[)$ et $A_D^*v=-v''$. Pour $u\in D(A_D)$, la formule de Green donne $0=[uv'-u'v]_0^1=u'(0)v(0)-u'(1)v(1)$. Avec $u(x)=x^2(1-x)$, on a $u'(0)=0$ et $u'(1)=-1$, d'où $v(1)=0$. Avec $u(x)=x(1-x)^2$, on a $u'(0)=1$ et $u'(1)=0$, d'où $v(0)=0$. Donc $v\in D(A_D)$, et $A_D^*=A_D$ : deux conditions au bord, ni plus ni moins, équilibrent les domaines.`,
    closedChecks: [
      { kind: 'rational-vector', prompt: t`Pour $u(x)=x^2(1-x)$ : valeurs de $(u'(0),u'(1))$`, expected: ['0', '-1'], labels: ['u′(0)', 'u′(1)'] },
    ],
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT24: TheoremModule = {
  theorem: {
    id: 'adjoint',
    spaces: [
      t`$H$ : espace de Hilbert réel, de produit scalaire $\langle\cdot,\cdot\rangle$ (dans le cas complexe, le produit scalaire est linéaire en la première variable).`,
      t`$A:D(A)\subset H\to H$ : opérateur linéaire, éventuellement non borné, défini sur un sous-espace vectoriel $D(A)$ de $H$.`,
      t`Graphe de $A$ : $\{(u,Au):u\in D(A)\}\subset H\times H$, pour la topologie produit de la norme.`,
    ],
    hypotheses: [
      { id: 'h-hilbert', text: t`$H$ est un espace de Hilbert.` },
      { id: 'h-lineaire', text: t`$A$ est linéaire, de domaine un sous-espace vectoriel $D(A)$ de $H$.` },
      {
        id: 'h-dense',
        text: t`$D(A)$ est dense dans $H$.`,
        whenRemoved: t`Dans $\mathbb R^2$, si $D(A)=\mathbb R\times\{0\}$ et $A=0$, alors pour tout $v$ et tout $b\in\mathbb R$, le vecteur $w=(0,b)$ convient : $A^*v$ n'est pas défini de façon unique.`,
      },
      {
        id: 'h-symetrique',
        text: t`Pour la dernière assertion : $A$ est symétrique, c'est-à-dire $\langle Au,v\rangle=\langle u,Av\rangle$ pour tous $u,v\in D(A)$.`,
        whenRemoved: t`Pour $A=d/dx$ sur $\{u\in H^1(]0,1[):u(0)=0\}$, avec $u(x)=x$ et $v(x)=x^2$ : $\langle Au,v\rangle=\frac13$ et $\langle u,Av\rangle=\frac23$ ; et $A\not\subset A^*$.`,
      },
    ],
    statement: t`Si $A$ est densément défini, son adjoint $A^*$ est défini par
$$D(A^*)=\{v\in H:\exists w\in H,\ \langle Au,v\rangle=\langle u,w\rangle\ \forall u\in D(A)\},\qquad A^*v=w.$$
L'opérateur $A^*$ est fermé. Si $A$ est symétrique, alors $A\subset A^*$ ; il est auto-adjoint si $A=A^*$, domaines inclus.`,
    conclusions: {
      unicite: t`Pour $v\in D(A^*)$, le vecteur $w$ est unique : c'est la densité de $D(A)$ qui rend $A^*$ bien défini.`,
      autre: t`$A^*$ est linéaire et fermé, sans hypothèse de fermeture sur $A$. Si $A$ est symétrique, $A\subset A^*$. L'auto-adjonction est l'égalité $A=A^*$, domaines inclus.`,
    },
    sourceProof: 'idee',
    proofOutline: [
      t`Unicité de $w$ : si $w,w'$ conviennent, $\langle u,w-w'\rangle=0$ pour tout $u\in D(A)$, et la densité donne $w=w'$.`,
      t`Linéarité : $D(A^*)$ est un sous-espace, et $v\mapsto w$ est linéaire, par linéarité de la relation définissant $w$.`,
      t`Caractérisation par Riesz : $v\in D(A^*)$ si et seulement si $u\mapsto\langle Au,v\rangle$ est continue sur $D(A)$ pour la norme de $H$ ; on la prolonge à $H$ par densité.`,
      t`Fermeture de $A^*$ : si $v_n\in D(A^*)$, $v_n\to v$ et $A^*v_n\to w$, on passe à la limite dans $\langle Au,v_n\rangle=\langle u,A^*v_n\rangle$ à $u\in D(A)$ fixé, d'où $v\in D(A^*)$ et $A^*v=w$.`,
      t`Si $A$ est symétrique, tout $v\in D(A)$ convient avec $w=Av$ : c'est l'inclusion $A\subset A^*$.`,
    ],
    warnings: [
      'L’adjoint dépend du domaine : une expression différentielle seule ne définit pas un opérateur.',
      t`$A\subset A^*$ n'entraîne pas $A=A^*$ : les domaines peuvent différer.`,
      t`Sans densité de $D(A)$, le vecteur $w$ n'est pas unique et $A^*$ n'est pas défini.`,
      t`C'est $A^*$ qui est fermé, sans hypothèse sur $A$ : l'énoncé ne dit pas que $A$ est fermé.`,
    ],
    usefulFor: 'Justifier les problèmes spectraux et les calculs fonctionnels, distinguer symétrie et auto-adjonction, contrôler les conditions aux limites.',
    verification: {
      origin: 'complement',
      review: 'machine',
      notes: 'Énoncé repris du polycopié (p. PDF 23), qui n’en donne qu’une lecture géométrique ; la démonstration de la fiche est rédigée pour ProofLab.',
    },
  },
  definitions: [
    {
      id: 'adjoint-operateur-ferme',
      term: 'Opérateur fermé',
      statement: t`$A:D(A)\subset H\to H$ est fermé si son graphe est fermé dans $H\times H$ ; concrètement, si $u_n\in D(A)$, $u_n\to u$ dans $H$ et $Au_n\to v$ dans $H$, alors $u\in D(A)$ et $Au=v$.`,
      source: poly(23, 'Section 6.1'),
    },
    {
      id: 'adjoint-densement-defini',
      term: 'Opérateur densément défini',
      statement: t`$A:D(A)\subset H\to H$ est densément défini si $D(A)$ est dense dans $H$.`,
      source: poly(23, 'Section 6.1'),
    },
    {
      id: 'adjoint-adjoint',
      term: 'Adjoint',
      statement: t`Si $A$ est densément défini, $D(A^*)=\{v\in H:\exists w\in H,\ \langle Au,v\rangle=\langle u,w\rangle\ \forall u\in D(A)\}$, et $A^*v=w$.`,
      source: poly(23, 'Section 6.1'),
    },
    {
      id: 'adjoint-extension',
      term: 'Extension',
      statement: t`$A\subset B$ signifie $D(A)\subset D(B)$ et $Bu=Au$ pour tout $u\in D(A)$.`,
      source: complement('Précision de la notation employée en section 6.1 du polycopié'),
    },
    {
      id: 'adjoint-symetrique',
      term: 'Opérateur symétrique',
      statement: t`$A$, densément défini, est symétrique si $\langle Au,v\rangle=\langle u,Av\rangle$ pour tous $u,v\in D(A)$ ; on a alors $A\subset A^*$.`,
      source: complement('Terme employé sans définition en section 6.1 du polycopié ; énoncé classique'),
    },
    {
      id: 'adjoint-auto-adjoint',
      term: 'Opérateur auto-adjoint',
      statement: t`$A$ est auto-adjoint si $A=A^*$, domaines inclus : $D(A)=D(A^*)$ et $A^*u=Au$ pour tout $u\in D(A)$.`,
      source: poly(23, 'Section 6.1'),
    },
  ],
  concepts: [
    {
      id: 'adjoint-transposee-inverse',
      label: 'Adjoint et inverse',
      reminder: t`L'adjoint d'une matrice réelle pour le produit euclidien est sa transposée, non son inverse.`,
    },
    {
      id: 'adjoint-densite-unicite',
      label: 'Densité du domaine et unicité',
      reminder: t`La densité de $D(A)$ rend unique le vecteur $w$ : c'est ce qui permet de définir $A^*$.`,
    },
    {
      id: 'adjoint-ipp-regularite',
      label: 'Intégration par parties et régularité',
      reminder: t`Pour $v\in D(A^*)$, on n'intègre par parties qu'après avoir établi la régularité de $v$, en testant d'abord contre $C^\infty_c$.`,
    },
    {
      id: 'adjoint-tester-domaine',
      label: 'Domaine et valeurs au bord',
      reminder: t`Plus $D(A)$ est petit, moins la condition définissant $D(A^*)$ est contraignante : les conditions au bord de $D(A^*)$ sont dictées par les valeurs au bord autorisées dans $D(A)$.`,
    },
    {
      id: 'adjoint-signe',
      label: 'Signe de l’adjoint d’une dérivation',
      reminder: t`L'intégration par parties fait apparaître un signe : l'adjoint de $d/dx$ est donné par $-d/dx$, à domaines précisés.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-adjoint-sans-densite',
      theoremId: 'adjoint',
      title: 'Domaine non dense',
      claim: t`Tout opérateur linéaire $A:D(A)\subset H\to H$ admet un adjoint bien défini par la relation $\langle Au,v\rangle=\langle u,w\rangle$.`,
      correctStatement: t`L'adjoint n'est défini que si $D(A)$ est dense dans $H$ : c'est ce qui rend $w$ unique.`,
      task: t`Dans $H=\mathbb R^2$, soit $D(A)=\mathbb R\times\{0\}$ et $A=0$. Pour $v=(1,0)$, détermine la dimension de l'ensemble des $w\in\mathbb R^2$ vérifiant $\langle Au,v\rangle=\langle u,w\rangle$ pour tout $u\in D(A)$.`,
      check: { kind: 'rational', prompt: 'Dimension de cet ensemble', expected: '1' },
      explanation: t`La relation s'écrit $0=s\,w_1$ pour tout $s\in\mathbb R$ : donc $w_1=0$ et $w_2$ est libre. L'ensemble est la droite $\{0\}\times\mathbb R$, de dimension $1$ : le vecteur $w$ n'est pas unique.`,
      concept: 'adjoint-densite-unicite',
      source: complement('Contre-exemple à la définition de la section 6.1 du polycopié'),
    },
    {
      id: 'ce-adjoint-symetrique-non-auto',
      theoremId: 'adjoint',
      title: 'Symétrique, non auto-adjoint',
      claim: t`Tout opérateur symétrique densément défini est auto-adjoint.`,
      correctStatement: t`Un opérateur symétrique vérifie $A\subset A^*$ ; il est auto-adjoint si $A=A^*$, domaines inclus.`,
      task: t`Soit $S=-d^2/dx^2$ sur $D(S)=\{u\in H^2(]0,1[):u(0)=u'(0)=u(1)=u'(1)=0\}$, dans $L^2(]0,1[)$ réel. Donne la valeur constante de $S^*v$ pour $v(x)=x^2$, qui n'appartient pas à $D(S)$.`,
      check: { kind: 'rational', prompt: t`Valeur constante de $S^*v$`, expected: '-2' },
      explanation: t`Pour $u\in D(S)$, deux intégrations par parties donnent $\int_0^1(-u'')x^2=-2\int_0^1u$, les termes de bord étant nuls : $x^2\in D(S^*)$ et $S^*x^2=-2$. Comme $v(1)=1\neq 0$, on a $x^2\notin D(S)$ : $S$ est symétrique et non auto-adjoint.`,
      concept: 'symetrie-autoadjonction',
      source: complement('Illustration de la section 6.1 du polycopié'),
    },
    {
      id: 'ce-adjoint-meme-domaine',
      theoremId: 'adjoint',
      title: 'Expression différentielle seule',
      claim: t`Si $A=d/dx$ sur un domaine $D(A)\subset H^1(]0,1[)$, alors $A^*=-d/dx$ sur le même domaine.`,
      correctStatement: t`Pour $D(A)=\{u\in H^1(]0,1[):u(0)=0\}$, on a $D(A^*)=\{v\in H^1(]0,1[):v(1)=0\}$ et $A^*v=-v'$ : le domaine de l'adjoint dépend du domaine de départ.`,
      task: t`Prenons $D(A)=\{u\in H^1(]0,1[):u(0)=0\}$, dense dans $L^2(]0,1[)$. Pour $u(x)=x\in D(A)$ et $v(x)=x$, calcule $\int_0^1u'v+\int_0^1uv'$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\int_0^1u'v+\int_0^1uv'$`, expected: '1' },
      explanation: t`La somme vaut $u(1)v(1)=1\neq 0$. Si $v(x)=x$ appartenait à $D(A^*)$ avec $A^*v=-v'$, cette somme serait nulle pour $u(x)=x$ : donc $x\notin D(A^*)$, alors que $x\in D(A)$.`,
      concept: 'domaine-operateur',
      source: complement('Illustration de l’exercice 24, intermédiaire, du polycopié'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT24;
