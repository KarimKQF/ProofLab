/**
 * Résultat 2 — Représentation de Riesz.
 * Source : polycopié, section 1.2 (p. PDF 6) ; exercices p. PDF 38.
 */
import { t, rubric, poly, complement, FROM_POLY, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'riesz.facile',
  theoremId: 'riesz',
  level: 'facile',
  title: t`Représentant d'une forme linéaire sur $\mathbb R^2$`,
  statement: t`Dans $H=\mathbb R^2$, muni du produit scalaire euclidien $\langle(x,y),(x',y')\rangle=xx'+yy'$, on considère la forme $\ell(x,y)=3x-2y$. Déterminer le représentant de Riesz $w$ de $\ell$, puis calculer $\|\ell\|_{H'}$.`,
  source: poly(38, 'Exercice 2, facile (p. PDF 38)'),
  prerequisites: [],
  concepts: ['riesz-produit-scalaire', 'riesz-norme-duale', 'hypotheses-theoreme', 'calcul-exact', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'base', label: 'Tester la représentation sur la base canonique' },
      { id: 'noyau', label: 'Construire le représentant par le noyau, comme dans la démonstration' },
    ],
    nodes: [
      { id: 'h-H', kind: 'hypothese', text: t`$H=\mathbb R^2$, muni de $\langle(x,y),(x',y')\rangle=xx'+yy'$, est un espace de Hilbert réel.` },
      { id: 'd-ell', kind: 'definition', text: t`$\ell(x,y)=3x-2y$ pour tout $(x,y)\in\mathbb R^2$.` },

      { id: 'lin', kind: 'consequence', text: t`$\ell$ est linéaire sur $\mathbb R^2$.` },
      { id: 'borne', kind: 'inegalite', text: t`Il existe $C>0$ tel que $|\ell(x,y)|\le C\,\|(x,y)\|$ pour tout $(x,y)\in\mathbb R^2$.` },
      { id: 'cont', kind: 'consequence', text: t`$\ell\in H'$.` },

      { id: 'thm', kind: 'application-theoreme', text: t`Il existe un unique $w\in\mathbb R^2$ tel que $\ell(v)=\langle v,w\rangle$ pour tout $v\in\mathbb R^2$, et $\|\ell\|_{H'}=\|w\|$.` },

      { id: 'b-e1', kind: 'egalite', text: t`$w_1=\langle e_1,w\rangle=\ell(e_1)$, où $e_1=(1,0)$.` },
      { id: 'b-e2', kind: 'egalite', text: t`$w_2=\langle e_2,w\rangle=\ell(e_2)$, où $e_2=(0,1)$.` },

      { id: 'k-F', kind: 'egalite', text: t`$F=\ker\ell$ est la droite engendrée par $(2,3)$.` },
      { id: 'k-z', kind: 'consequence', text: t`Le vecteur $z=(6,-4)$ est non nul et orthogonal à $F$.` },

      {
        id: 'val',
        kind: 'egalite',
        text: t`$w=(3,-2)$.`,
        masked: t`Valeur de $w$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Coordonnées de $w$`, expected: ['3', '-2'], labels: ['w₁', 'w₂'] },
      },
      {
        id: 'norme',
        kind: 'egalite',
        text: t`$\|\ell\|_{H'}^2=13$.`,
        masked: t`Valeur de $\|\ell\|_{H'}^2$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\|\ell\|_{H'}^2$`, expected: '13' },
      },

      { id: 'fin', kind: 'conclusion', text: t`Le représentant de $\ell$ est déterminé et sa norme dans $H'$ est calculée.` },

      // Propositions plausibles mais fausses.
      { id: 'x-signe', kind: 'egalite', distractor: true, after: ['thm'], text: t`$w=(3,2)$.` },
      { id: 'x-somme', kind: 'egalite', distractor: true, after: ['thm'], text: t`$\|\ell\|_{H'}=5$.` },
    ],
    justifications: [
      { id: 'j-lin', label: t`Vérification directe : $\ell\big(\lambda(x,y)+\mu(x',y')\big)=\lambda\ell(x,y)+\mu\ell(x',y')$.` },
      { id: 'j-cs', label: t`Inégalité de Cauchy–Schwarz dans $\mathbb R^2$, appliquée aux coefficients de $\ell$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-cont-def', label: t`Une forme linéaire vérifiant une majoration $|\ell(v)|\le C\|v\|$ est continue.` },
      { id: 'j-riesz', label: 'Théorème de représentation de Riesz.', theorem: 'riesz' },
      { id: 'j-test-e1', label: t`Spécialiser la représentation en $v=e_1$.` },
      { id: 'j-test-e2', label: t`Spécialiser la représentation en $v=e_2$.` },
      { id: 'j-lecture', label: t`Évaluer $\ell$ en $e_1$ et $e_2$ : un vecteur de $\mathbb R^2$ est déterminé par ses deux coordonnées.` },
      { id: 'j-noyau', label: t`Résolution de l'équation $3x-2y=0$.` },
      { id: 'j-orth', label: t`Le produit scalaire avec le générateur de $F$ est nul, et le vecteur n'est pas le vecteur nul.` },
      { id: 'j-formule', label: t`Formule de la démonstration du théorème : $w=\ell(z)\,z/\|z\|^2$ pour $z\in F^\perp\setminus\{0\}$.` },
      { id: 'j-iso', label: t`Isométrie de Riesz : $\|\ell\|_{H'}=\|w\|$, puis calcul de $\|w\|^2$.` },
      { id: 'j-syn', label: 'Réunion des résultats obtenus.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-un-test', label: t`Un seul test suffit : $\ell(1,1)=1$ détermine $w$.` },
      { id: 'j-somme-coef', label: 'La norme d’une forme linéaire est la somme des valeurs absolues de ses coefficients.' },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['d-ell'], to: 'lin', by: 'j-lin' },
      { from: ['d-ell'], to: 'borne', by: 'j-cs' },
      { from: ['lin', 'borne'], to: 'cont', by: 'j-cont-def' },
      { from: ['h-H', 'cont'], to: 'thm', by: 'j-riesz' },

      { from: ['thm'], to: 'b-e1', by: 'j-test-e1', path: 'base' },
      { from: ['thm'], to: 'b-e2', by: 'j-test-e2', path: 'base' },
      { from: ['b-e1', 'b-e2', 'd-ell'], to: 'val', by: 'j-lecture', path: 'base' },

      { from: ['d-ell'], to: 'k-F', by: 'j-noyau', path: 'noyau' },
      { from: ['k-F'], to: 'k-z', by: 'j-orth', path: 'noyau' },
      { from: ['h-H', 'k-z', 'd-ell'], to: 'val', by: 'j-formule', path: 'noyau' },

      { from: ['thm', 'val'], to: 'norme', by: 'j-iso' },
      { from: ['val', 'norme'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-signe',
        verdict: 'incorrect',
        concept: 'riesz-produit-scalaire',
        message: t`La coordonnée $w_2$ s'obtient en testant la représentation en $e_2$ : elle vaut $\ell(e_2)=-2$. Le vecteur $(3,2)$ ne représente pas $\ell$.`,
        counterexample: t`$\langle(0,1),(3,2)\rangle=2$, alors que $\ell(0,1)=-2$.`,
      },
      {
        conclusion: 'x-somme',
        verdict: 'incorrect',
        concept: 'riesz-norme-duale',
        message: t`$5$ est la somme des valeurs absolues des coefficients : c'est la norme de $\ell$ pour la norme $\|\cdot\|_\infty$ de $\mathbb R^2$. Pour la norme euclidienne, $\|\ell\|_{H'}=\|w\|$.`,
        counterexample: t`Par Cauchy–Schwarz, $|\ell(x,y)|\le\sqrt{13}\,\|(x,y)\|$ : aucun vecteur de norme $1$ ne donne $|\ell(v)|=5$.`,
      },
      {
        conclusion: 'val',
        by: 'j-un-test',
        verdict: 'incorrect',
        concept: 'riesz-produit-scalaire',
        message: t`Une égalité scalaire unique ne détermine pas un vecteur de $\mathbb R^2$. Il faut tester sur une base, ou passer par le noyau.`,
        counterexample: t`$\langle(1,1),(1,0)\rangle=1=\ell(1,1)$, mais $(1,0)$ ne représente pas $\ell$ : $\langle(0,1),(1,0)\rangle=0\neq\ell(0,1)=-2$.`,
      },
      {
        conclusion: 'norme',
        by: 'j-somme-coef',
        verdict: 'incorrect',
        concept: 'riesz-norme-duale',
        message: t`La norme d'une forme dépend de la norme choisie sur l'espace : pour la norme euclidienne, ce n'est pas la somme des valeurs absolues des coefficients.`,
      },
      {
        conclusion: 'cont',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`Écrire la majoration : la continuité d'une forme linéaire se vérifie sur une constante $C$ telle que $|\ell(v)|\le C\|v\|$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-H',
        label: 'Ne plus disposer du produit scalaire euclidien',
        necessary: true,
        explanation: t`Le représentant est défini par $\ell(v)=\langle v,w\rangle_H$ : il dépend du produit scalaire fixé sur l'espace.`,
        counterexample: t`Avec $\langle u,v\rangle_A=2u_1v_1+u_2v_2$, le représentant de $\ell$ est $(3/2,-2)$, et non $(3,-2)$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Valeur de $\|\ell\|_{H'}^2$`, expected: '13' }],
  solution: t`**Continuité.** La forme $\ell$ est linéaire et, par Cauchy–Schwarz, $|\ell(x,y)|=|\langle(x,y),(3,-2)\rangle|\le\sqrt{13}\,\|(x,y)\|$. Donc $\ell\in H'$.

**Représentant.** Par le théorème de Riesz, il existe un unique $w\in\mathbb R^2$ tel que $\ell(v)=\langle v,w\rangle$ pour tout $v$. En testant en $e_1=(1,0)$ et $e_2=(0,1)$ : $w_1=\ell(e_1)=3$ et $w_2=\ell(e_2)=-2$. Donc $w=(3,-2)$.

**Autre voie, celle de la démonstration du théorème.** $F=\ker\ell$ est la droite engendrée par $(2,3)$. Le vecteur $z=(6,-4)$ est non nul et orthogonal à $F$, avec $\ell(z)=26$ et $\|z\|^2=52$, d'où $w=\ell(z)z/\|z\|^2=(3,-2)$.

**Norme.** $\|\ell\|_{H'}=\|w\|$, donc $\|\ell\|_{H'}^2=3^2+(-2)^2=13$, soit $\|\ell\|_{H'}=\sqrt{13}$.`,
  steps: [
    t`Vérifier que $\ell$ est linéaire et continue.`,
    t`Invoquer le théorème de Riesz dans $\mathbb R^2$ euclidien.`,
    t`Identifier $w$ en testant sur la base canonique, ou par la construction du noyau.`,
    t`Calculer $\|\ell\|_{H'}$ par l'isométrie de Riesz.`,
  ],
  commonErrors: [
    { id: 'e-signe', description: t`Oublier le signe de la seconde coordonnée en lisant $w$ sur les coefficients de $\ell$.`, concept: 'calcul-exact' },
    { id: 'e-norme', description: t`Confondre la norme euclidienne de $w$ avec la somme des valeurs absolues de ses coordonnées.`, concept: 'riesz-norme-duale' },
    { id: 'e-un-test', description: t`Croire qu'un seul test $\ell(v_0)=\langle v_0,w\rangle$ suffit à déterminer $w$.`, concept: 'riesz-produit-scalaire' },
  ],
  hints: [
    t`Que demande le théorème de Riesz pour produire un représentant ? Vérifie d'abord ces hypothèses.`,
    t`Une fois $w$ donné par le théorème, teste la relation $\ell(v)=\langle v,w\rangle$ sur deux vecteurs bien choisis ; on peut aussi suivre la construction par le noyau de la démonstration.`,
    t`Avec $v=e_1$ puis $v=e_2$, on lit les coordonnées de $w$ sur les valeurs de $\ell$. Pour la norme, l'isométrie de Riesz ramène à la norme euclidienne de $w$.`,
  ],
  rubric: rubric({
    hypotheses: t`$\ell$ est reconnue linéaire et continue, et $\mathbb R^2$ euclidien est un espace de Hilbert.`,
    methode: 'Le représentant est obtenu par test sur une base ou par la construction du noyau.',
    validite: 'Chaque coordonnée est obtenue par un calcul identifié.',
    justifications: 'La norme de la forme est tirée de l’isométrie de Riesz, non d’une formule de coefficients.',
    conclusion: t`$w=(3,-2)$ et $\|\ell\|_{H'}=\sqrt{13}$ sont obtenus.`,
  }),
  variant: {
    statement: t`Dans $\mathbb R^2$ muni du produit scalaire $\langle u,v\rangle_A=2u_1v_1+u_2v_2$, on considère encore $\ell(x,y)=3x-2y$. Déterminer le représentant de Riesz de $\ell$ pour ce produit scalaire, ainsi que la norme de $\ell$ dans le dual.`,
    solution: t`Le produit scalaire $\langle\cdot,\cdot\rangle_A$ munit $\mathbb R^2$ d'une structure hilbertienne, et $\ell$ y est continue (dimension finie). Si $w=(w_1,w_2)$ est le représentant, $\langle e_1,w\rangle_A=2w_1=\ell(e_1)=3$ et $\langle e_2,w\rangle_A=w_2=\ell(e_2)=-2$, donc $w=(3/2,-2)$. Vérification : $\langle(x,y),w\rangle_A=3x-2y$. L'isométrie de Riesz donne $\|\ell\|^2=\|w\|_A^2=2\cdot\tfrac94+4=\tfrac{17}{2}$. Le représentant diffère du représentant euclidien $(3,-2)$ : il dépend du produit scalaire.`,
    closedChecks: [
      { kind: 'rational-vector', prompt: t`Coordonnées du représentant pour $\langle\cdot,\cdot\rangle_A$`, expected: ['3/2', '-2'], labels: ['w₁', 'w₂'] },
      { kind: 'rational', prompt: t`Valeur de $\|\ell\|^2$ pour la norme duale de $\|\cdot\|_A$`, expected: '17/2' },
    ],
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h-H', kind: 'hypothese', text: t`$H=\mathbb R^2$, muni de $\langle u,v\rangle_A=2u_1v_1+u_2v_2$, est un espace de Hilbert réel.` },
        { id: 'd-ell', kind: 'definition', text: t`$\ell(x,y)=3x-2y$ pour tout $(x,y)\in\mathbb R^2$.` },
        { id: 'cont', kind: 'consequence', text: t`$\ell$ est une forme linéaire continue sur $H$.` },
        { id: 'thm', kind: 'application-theoreme', text: t`Il existe un unique $w\in H$ tel que $\ell(v)=\langle v,w\rangle_A$ pour tout $v\in H$, et $\|\ell\|_{H'}=\|w\|_A$.` },
        { id: 'c1', kind: 'egalite', text: t`$\ell(e_1)=\langle e_1,w\rangle_A=2w_1$.` },
        { id: 'c2', kind: 'egalite', text: t`$\ell(e_2)=\langle e_2,w\rangle_A=w_2$.` },
        {
          id: 'val',
          kind: 'egalite',
          text: t`$w=(3/2,-2)$.`,
          masked: t`Valeur de $w$ pour $\langle\cdot,\cdot\rangle_A$ : à calculer.`,
          check: { kind: 'rational-vector', prompt: t`Coordonnées de $w$`, expected: ['3/2', '-2'], labels: ['w₁', 'w₂'] },
        },
        {
          id: 'norme',
          kind: 'egalite',
          text: t`$\|\ell\|_{H'}^2=\|w\|_A^2=17/2$.`,
          masked: t`Valeur de $\|\ell\|_{H'}^2$ : à calculer.`,
          check: { kind: 'rational', prompt: t`Valeur de $\|\ell\|_{H'}^2$`, expected: '17/2' },
        },
        { id: 'fin', kind: 'conclusion', text: t`Le représentant de $\ell$ pour $\langle\cdot,\cdot\rangle_A$ et sa norme sont déterminés.` },
        { id: 'x-eucl', kind: 'egalite', distractor: true, after: ['thm'], text: t`$w=(3,-2)$ : le représentant est le même que pour le produit scalaire euclidien.` },
        { id: 'x-norme', kind: 'egalite', distractor: true, after: ['thm'], text: t`$\|\ell\|_{H'}^2=13$.` },
      ],
      justifications: [
        { id: 'j-dimfinie', label: t`Toute forme linéaire sur $\mathbb R^2$ est continue pour toute norme : on peut aussi majorer directement $|3x-2y|$.` },
        { id: 'j-riesz', label: 'Théorème de représentation de Riesz.', theorem: 'riesz' },
        { id: 'j-test1', label: t`Spécialiser la représentation en $v=e_1$ et développer $\langle\cdot,\cdot\rangle_A$.` },
        { id: 'j-test2', label: t`Spécialiser la représentation en $v=e_2$ et développer $\langle\cdot,\cdot\rangle_A$.` },
        { id: 'j-resolution', label: t`Résoudre les deux égalités après calcul de $\ell(e_1)$ et $\ell(e_2)$.` },
        { id: 'j-iso', label: t`Isométrie de Riesz : $\|\ell\|_{H'}=\|w\|_A$, puis calcul de $\|w\|_A^2$.` },
        { id: 'j-syn', label: 'Réunion des résultats obtenus.' },
        { id: 'j-oubli', label: t`Le produit scalaire ne change rien : on lit $w$ sur les coefficients de $\ell$.` },
      ],
      rules: [
        { from: ['d-ell'], to: 'cont', by: 'j-dimfinie' },
        { from: ['h-H', 'cont'], to: 'thm', by: 'j-riesz' },
        { from: ['thm'], to: 'c1', by: 'j-test1' },
        { from: ['thm'], to: 'c2', by: 'j-test2' },
        { from: ['c1', 'c2', 'd-ell'], to: 'val', by: 'j-resolution' },
        { from: ['thm', 'val'], to: 'norme', by: 'j-iso' },
        { from: ['val', 'norme'], to: 'fin', by: 'j-syn' },
      ],
      traps: [
        {
          conclusion: 'x-eucl',
          verdict: 'incorrect',
          concept: 'riesz-produit-scalaire',
          message: t`Le représentant dépend du produit scalaire : ici $\langle e_1,w\rangle_A=2w_1$, ce qui donne une autre première coordonnée.`,
          counterexample: t`$\langle(1,0),(3,-2)\rangle_A=6$, alors que $\ell(1,0)=3$.`,
        },
        {
          conclusion: 'x-norme',
          verdict: 'incorrect',
          concept: 'riesz-norme-duale',
          message: t`$13$ est le carré de la norme euclidienne de $(3,-2)$. Il faut calculer $\|w\|_A^2$ pour le représentant associé à $\langle\cdot,\cdot\rangle_A$.`,
        },
        {
          conclusion: 'val',
          by: 'j-oubli',
          verdict: 'incorrect',
          concept: 'riesz-produit-scalaire',
          message: t`Lire $w$ sur les coefficients n'est légitime que pour le produit scalaire euclidien. Il faut tester contre la base en utilisant $\langle\cdot,\cdot\rangle_A$.`,
        },
      ],
      removable: [
        {
          hypothesis: 'h-H',
          label: t`Retirer le produit scalaire $\langle\cdot,\cdot\rangle_A$`,
          necessary: true,
          explanation: t`Le représentant n'a de sens que pour un produit scalaire fixé.`,
          counterexample: t`Pour le produit scalaire euclidien, le représentant de $\ell$ est $(3,-2)$, différent de celui trouvé ici.`,
        },
      ],
    },
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'riesz.intermediaire',
  theoremId: 'riesz',
  level: 'intermediaire',
  title: t`Représentant d'une forme intégrale sur $L^2(]0,1[)$`,
  statement: t`Dans $H=L^2(]0,1[)$, muni de $\langle u,v\rangle=\int_0^1uv$, on considère la forme $\ell(u)=\int_0^1x\,u(x)\,dx$. Montrer que $\ell\in H'$, déterminer son représentant de Riesz, puis calculer $\|\ell\|_{H'}$.`,
  source: poly(38, 'Exercice 2, intermédiaire (p. PDF 38)'),
  prerequisites: [],
  concepts: ['riesz-produit-scalaire', 'riesz-norme-duale', 'complet-necessaire', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'riesz', label: 'Utiliser le théorème de Riesz' },
      { id: 'direct', label: 'Calcul direct : la majoration et un vecteur qui l’atteint' },
    ],
    nodes: [
      { id: 'h-ps', kind: 'hypothese', text: t`$H=L^2(]0,1[)$ est muni du produit scalaire $\langle u,v\rangle=\int_0^1uv$.` },
      { id: 'h-comp', kind: 'hypothese', text: t`$H$ est complet pour la norme associée : c'est un espace de Hilbert réel.` },
      { id: 'd-ell', kind: 'definition', text: t`$\ell(u)=\int_0^1x\,u(x)\,dx$ pour $u\in H$.` },

      {
        id: 'rep',
        kind: 'egalite',
        text: t`Pour tout $u\in H$ : $\ell(u)=\langle u,w_0\rangle$, où $w_0(x)=x$ sur $]0,1[$.`,
        masked: t`Identification de la fonction $w_0$ telle que $\ell=\langle\cdot,w_0\rangle$ : à établir.`,
        check: { kind: 'expr-equiv', prompt: t`Expression de $w_0(x)$ en fonction de $x$`, expected: 'x', vars: ['x'] },
      },
      { id: 'w0-L2', kind: 'consequence', text: t`$w_0$ est de carré intégrable sur $]0,1[$ : $w_0\in H$.` },
      { id: 'cont', kind: 'consequence', text: t`$\ell$ est une forme linéaire continue sur $H$ : $\ell\in H'$.` },

      { id: 'thm', kind: 'application-theoreme', text: t`Il existe un unique $w\in H$ tel que $\ell(v)=\langle v,w\rangle$ pour tout $v\in H$, et $\|\ell\|_{H'}=\|w\|_{L^2}$.` },
      { id: 'uni', kind: 'consequence', text: t`Si $w_1,w_2\in H$ vérifient $\langle u,w_1\rangle=\langle u,w_2\rangle$ pour tout $u\in H$, alors $w_1=w_2$.` },
      { id: 'w-id', kind: 'consequence', text: t`Le représentant de $\ell$ est $w=w_0$.` },

      { id: 'n-maj', kind: 'inegalite', text: t`$|\ell(u)|\le\|w_0\|_{L^2}\|u\|_{L^2}$ pour tout $u\in H$.` },
      { id: 'n-test', kind: 'egalite', text: t`Pour $u=w_0/\|w_0\|_{L^2}$ : $\|u\|_{L^2}=1$ et $\ell(u)=\|w_0\|_{L^2}$.` },
      {
        id: 'norme',
        kind: 'egalite',
        text: t`$\|\ell\|_{H'}^2=1/3$.`,
        masked: t`Valeur de $\|\ell\|_{H'}^2$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\|\ell\|_{H'}^2$`, expected: '1/3' },
      },

      { id: 'fin', kind: 'conclusion', text: t`$\ell\in H'$, son représentant est identifié et sa norme est calculée.` },

      // Propositions plausibles mais fausses.
      { id: 'x-demi', kind: 'egalite', distractor: true, after: ['cont'], text: t`$\|\ell\|_{H'}=1/2$.` },
      { id: 'x-un', kind: 'egalite', distractor: true, after: ['cont'], text: t`$\|\ell\|_{H'}=1$.` },
      { id: 'x-const', kind: 'egalite', distractor: true, after: ['cont'], text: t`Le représentant de $\ell$ est la fonction constante égale à $1$.` },
    ],
    justifications: [
      { id: 'j-lecture', label: t`Lecture directe de l'intégrale : c'est le produit scalaire de $L^2$ de $u$ avec une fonction explicite.` },
      { id: 'j-integ', label: t`Une fonction bornée sur un intervalle borné est de carré intégrable.` },
      { id: 'j-cs-cont', label: t`Inégalité de Cauchy–Schwarz dans $L^2$, et linéarité de l'intégrale.`, theorem: 'cauchy-schwarz' },
      { id: 'j-riesz', label: 'Théorème de représentation de Riesz.', theorem: 'riesz' },
      { id: 'j-unicite', label: t`Unicité du représentant : deux représentants vérifient la relation pour tout vecteur.` },
      { id: 'j-diff', label: t`Tester la relation en $u=w_1-w_2$ : $\|w_1-w_2\|^2=0$.` },
      { id: 'j-direct', label: t`$w_0\in H$ représente $\ell$, et le représentant est unique dans $H$.` },
      { id: 'j-iso', label: t`Isométrie de Riesz, puis calcul de $\|w_0\|_{L^2}^2=\int_0^1 x^2\,dx$.` },
      { id: 'j-cs-maj', label: t`Inégalité de Cauchy–Schwarz dans $L^2$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-test-w0', label: t`Choisir le vecteur unitaire colinéaire à $w_0$ : $\ell(w_0/\|w_0\|)=\|w_0\|^2/\|w_0\|$.` },
      { id: 'j-encadre', label: t`Encadrement : la majoration et le vecteur de test donnent $\|\ell\|_{H'}=\|w_0\|_{L^2}$, puis calcul de $\int_0^1x^2\,dx$.` },
      { id: 'j-syn', label: 'Réunion de la continuité, de l’identification et du calcul de la norme.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-cs-seule', label: t`L'inégalité de Cauchy–Schwarz donne directement $\|\ell\|_{H'}=\|w_0\|_{L^2}$.` },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['d-ell'], to: 'rep', by: 'j-lecture' },
      { from: ['rep'], to: 'w0-L2', by: 'j-integ' },
      { from: ['rep', 'w0-L2', 'h-ps'], to: 'cont', by: 'j-cs-cont' },
      { from: ['h-ps', 'h-comp', 'cont'], to: 'thm', by: 'j-riesz', path: 'riesz' },

      { from: ['thm', 'rep', 'w0-L2'], to: 'w-id', by: 'j-unicite', path: 'riesz' },
      { from: ['h-ps'], to: 'uni', by: 'j-diff', path: 'direct' },
      { from: ['uni', 'rep', 'w0-L2'], to: 'w-id', by: 'j-direct', path: 'direct' },

      { from: ['thm', 'w-id'], to: 'norme', by: 'j-iso', path: 'riesz' },
      { from: ['rep', 'w0-L2', 'h-ps'], to: 'n-maj', by: 'j-cs-maj', path: 'direct' },
      { from: ['rep', 'w0-L2', 'h-ps'], to: 'n-test', by: 'j-test-w0', path: 'direct' },
      { from: ['n-maj', 'n-test'], to: 'norme', by: 'j-encadre', path: 'direct' },

      { from: ['cont', 'w-id', 'norme'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-demi',
        verdict: 'incorrect',
        concept: 'riesz-norme-duale',
        message: t`$\ell(1)=1/2$ et $\|1\|_{L^2}=1$ ne donnent que la minoration $\|\ell\|_{H'}\ge 1/2$ : la constante $1$ n'est pas dans la direction du représentant.`,
        counterexample: t`Pour $u(x)=\sqrt3\,x$, on a $\|u\|_{L^2}=1$ et $\ell(u)=1/\sqrt3>1/2$.`,
      },
      {
        conclusion: 'x-un',
        verdict: 'incorrect',
        concept: 'riesz-norme-duale',
        message: t`Majorer $x$ par $1$ dans l'intégrale donne seulement une majoration, qui n'est pas atteinte : la norme n'est pas $1$.`,
        counterexample: t`Cauchy–Schwarz donne $|\ell(u)|\le\|w_0\|_{L^2}\|u\|_{L^2}$, et $\|w_0\|_{L^2}^2=1/3<1$.`,
      },
      {
        conclusion: 'x-const',
        verdict: 'incorrect',
        concept: 'riesz-produit-scalaire',
        message: t`La forme porte le poids $x$ : $\langle u,1\rangle=\int_0^1u$ n'est pas $\ell(u)$.`,
        counterexample: t`Pour $u=1$ : $\ell(1)=1/2$, alors que $\langle 1,1\rangle=1$.`,
      },
      {
        conclusion: 'norme',
        by: 'j-cs-seule',
        verdict: 'incorrect',
        concept: 'riesz-norme-duale',
        message: t`L'inégalité de Cauchy–Schwarz ne fournit que $\|\ell\|_{H'}\le\|w_0\|_{L^2}$. L'égalité demande un vecteur qui atteint la borne, ou l'isométrie du théorème de Riesz.`,
      },
      {
        conclusion: 'cont',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`En dimension infinie, une forme linéaire n'est pas automatiquement continue : il faut une majoration par $\|u\|_{L^2}$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'w0-L2',
        label: t`Ne plus disposer de $w_0\in L^2(]0,1[)$`,
        necessary: true,
        explanation: t`Un représentant doit appartenir à l'espace de Hilbert considéré.`,
        counterexample: t`Le poids $x\mapsto x^{-1/2}$ n'est pas de carré intégrable sur $]0,1[$, et la forme $u\mapsto\int_0^1x^{-1/2}u(x)\,dx$ n'est pas continue pour la norme de $L^2$ : pour $u_n=x^{-1/2}\mathbb 1_{]1/n,1[}$, on a $\ell(u_n)=\ln n$ et $\|u_n\|_{L^2}=\sqrt{\ln n}$.`,
      },
      {
        hypothesis: 'h-comp',
        label: 'Ne plus disposer de la complétude',
        necessary: false,
        explanation: t`Sans complétude, la garantie générale de Riesz est perdue, mais pour cette forme la représentation $\ell=\langle\cdot,w_0\rangle$ a été calculée directement et $w_0$ est continue : elle reste valable sur $C([0,1])$ muni du produit scalaire de $L^2$.`,
        counterexample: t`Le théorème peut réellement échouer sans complétude : sur $E=C([0,1])$ avec le produit scalaire de $L^2$, la forme $u\mapsto\int_0^{1/2}u$ est continue, mais son seul représentant possible est $\mathbb 1_{]0,1/2[}$, qui n'appartient pas à $E$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Valeur de $\|\ell\|_{H'}^2$`, expected: '1/3' }],
  solution: t`**Représentation et continuité.** Pour $u\in H$, $\ell(u)=\int_0^1u\,w_0=\langle u,w_0\rangle$ avec $w_0(x)=x$. La fonction $w_0$ est bornée sur $]0,1[$, donc de carré intégrable : $w_0\in H$. L'inégalité de Cauchy–Schwarz donne $|\ell(u)|\le\|w_0\|\,\|u\|$, et $\ell$ est linéaire : $\ell\in H'$.

**Représentant.** Par le théorème de Riesz, il existe un unique $w\in H$ tel que $\ell(v)=\langle v,w\rangle$ pour tout $v\in H$. Comme $w_0$ convient, $w=w_0$ : le représentant de $\ell$ est la fonction $x\mapsto x$. (L'unicité se vérifie aussi directement en testant en $u=w_1-w_2$.)

**Norme.** L'isométrie de Riesz donne $\|\ell\|_{H'}=\|w_0\|_{L^2}$, donc $\|\ell\|_{H'}^2=\int_0^1x^2\,dx=\tfrac13$. Sans Riesz : Cauchy–Schwarz donne $\|\ell\|_{H'}\le\|w_0\|$, et le vecteur $u=w_0/\|w_0\|$ donne $\ell(u)=\|w_0\|$. La constante $1$ ne convient pas : $\ell(1)=1/2$ ne fournit qu'une minoration de $\|\ell\|_{H'}$.`,
  steps: [
    t`Reconnaître $\ell$ comme un produit scalaire $L^2$ avec un vecteur explicite, de carré intégrable.`,
    'Établir la continuité par Cauchy–Schwarz.',
    'Identifier le représentant par unicité.',
    t`Calculer $\|\ell\|_{H'}$ par l'isométrie de Riesz, ou par une majoration atteinte.`,
  ],
  commonErrors: [
    { id: 'e-demi', description: t`Confondre $\|\ell\|_{H'}$ avec la valeur $\ell(1)$.`, concept: 'riesz-norme-duale' },
    { id: 'e-cs', description: 'Conclure à l’égalité des normes à partir de la seule inégalité de Cauchy–Schwarz.', concept: 'riesz-norme-duale' },
    { id: 'e-poids', description: t`Oublier que le poids $x$ fait partie du représentant : prendre $w=1$.`, concept: 'riesz-produit-scalaire' },
  ],
  hints: [
    t`La forme s'écrit-elle déjà comme un produit scalaire de $L^2$ avec un vecteur explicite ?`,
    t`Montre que ce vecteur est bien dans $L^2(]0,1[)$. La continuité vient de Cauchy–Schwarz, et l'unicité du représentant fait le reste.`,
    t`Pour la norme : Cauchy–Schwarz ne donne que $\le$. L'égalité vient de l'isométrie de Riesz, ou du test $u=w_0/\|w_0\|$. Il reste à calculer $\int_0^1x^2\,dx$.`,
  ],
  rubric: rubric({
    hypotheses: t`$L^2(]0,1[)$ est un Hilbert, $w_0$ y appartient et $\ell$ y est continue.`,
    methode: t`$\ell$ est reconnue comme un produit scalaire, et le représentant est identifié par unicité.`,
    validite: 'La continuité et la norme ne sont pas confondues avec une simple majoration.',
    justifications: 'L’égalité des normes est justifiée par Riesz ou par un vecteur qui l’atteint.',
    conclusion: t`Le représentant est $x\mapsto x$ et $\|\ell\|_{H'}=1/\sqrt3$.`,
  }),
  variant: {
    statement: t`Dans $H=L^2(]0,1[)$, on considère $\ell(u)=\int_0^{1/2}u(x)\,dx$. Montrer que $\ell\in H'$, déterminer son représentant et calculer $\|\ell\|_{H'}$.`,
    solution: t`Pour $u\in H$, $\ell(u)=\int_0^1u\,\mathbb 1_{]0,1/2[}=\langle u,w\rangle$ avec $w=\mathbb 1_{]0,1/2[}\in L^2(]0,1[)$. Par Cauchy–Schwarz, $|\ell(u)|\le\|w\|\,\|u\|$ : $\ell\in H'$. Le représentant est $w$, unique par Riesz, et $\|\ell\|_{H'}^2=\|w\|^2=\int_0^{1/2}1\,dx=\tfrac12$. Le représentant n'a pas de version continue : on retrouve qu'il n'appartient pas à $C([0,1])$.`,
    closedChecks: [{ kind: 'rational', prompt: t`Valeur de $\|\ell\|_{H'}^2$`, expected: '1/2' }],
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'riesz.difficile',
  theoremId: 'riesz',
  level: 'difficile',
  title: t`Représentant de $v\mapsto\int_0^1v$ dans $H^1_0(]0,1[)$`,
  statement: t`Soit $V=H^1_0(]0,1[)$, muni du produit scalaire $(u,v)_V=\int_0^1u'v'$, et soit $\ell(v)=\int_0^1v(x)\,dx$. Montrer que $\ell\in V'$, identifier le représentant de Riesz $w$ de $\ell$ en résolvant un problème aux limites, puis calculer $\|\ell\|_{V'}$.`,
  source: poly(38, 'Exercice 2, difficile (p. PDF 38)'),
  prerequisites: ['poincare', 'distributions'],
  concepts: ['riesz-produit-scalaire', 'dual-identification', 'domaine-operateur', 'riesz-signe', 'hypotheses-theoreme', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'bvp', label: 'Déduire le problème aux limites, puis le résoudre' },
      { id: 'verif', label: 'Vérifier un candidat, puis conclure par unicité' },
    ],
    nodes: [
      { id: 'h-V', kind: 'hypothese', text: t`$V=H^1_0(]0,1[)$, muni de $(u,v)_V=\int_0^1u'v'$, est un espace de Hilbert réel (norme équivalente à celle de $H^1$, par Poincaré).` },
      { id: 'd-ell', kind: 'definition', text: t`$\ell(v)=\int_0^1v(x)\,dx$ pour $v\in V$.` },
      { id: 'h-poinc', kind: 'hypothese', text: t`Il existe $C>0$ tel que $\|v\|_{L^2}\le C\|v'\|_{L^2}$ pour tout $v\in V$ (inégalité de Poincaré).` },

      { id: 'lin', kind: 'consequence', text: t`$\ell$ est linéaire sur $V$.` },
      { id: 'cs', kind: 'inegalite', text: t`$|\ell(v)|\le\|v\|_{L^2}$ pour tout $v\in V$.` },
      { id: 'cont', kind: 'consequence', text: t`$\ell\in V'$ : $|\ell(v)|\le C\|v\|_V$ pour tout $v\in V$.` },

      { id: 'thm', kind: 'application-theoreme', text: t`Il existe un unique $w\in V$ tel que $(w,v)_V=\ell(v)$ pour tout $v\in V$, et $\|\ell\|_{V'}=\|w\|_V$.` },

      { id: 'test', kind: 'egalite', text: t`Pour tout $\varphi\in C^\infty_c(]0,1[)$ : $\int_0^1w'\varphi'=\int_0^1\varphi$.` },
      { id: 'eqD', kind: 'egalite', text: t`$-w''=1$ dans $\mathcal D'(]0,1[)$.` },
      { id: 'poly', kind: 'egalite', text: t`Il existe $a,b\in\mathbb R$ tels que $w(x)=-\tfrac12x^2+ax+b$ pour presque tout $x\in\,]0,1[$.` },
      { id: 'cl', kind: 'egalite', text: t`Le représentant continu de $w$ vérifie $w(0)=w(1)=0$.` },

      { id: 'cand', kind: 'egalite', text: t`Le polynôme $p$ de degré $2$ tel que $p''=-1$ et $p(0)=p(1)=0$ appartient à $V$, et $\int_0^1p'v'=\int_0^1v$ pour tout $v\in V$.` },

      {
        id: 'val',
        kind: 'egalite',
        text: t`$w(x)=\tfrac12\,x(1-x)$ sur $]0,1[$.`,
        masked: t`Expression de $w$ : à calculer.`,
        check: { kind: 'expr-equiv', prompt: t`Expression de $w(x)$ sur $]0,1[$`, expected: 'x*(1-x)/2', vars: ['x'] },
      },
      {
        id: 'norme',
        kind: 'egalite',
        text: t`$\|\ell\|_{V'}^2=1/12$.`,
        masked: t`Valeur de $\|\ell\|_{V'}^2$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\|\ell\|_{V'}^2$`, expected: '1/12' },
      },

      { id: 'fin', kind: 'conclusion', text: t`Le représentant de $\ell$ est identifié, il résout un problème aux limites, et sa norme dans $V'$ est calculée.` },

      // Propositions plausibles mais fausses.
      { id: 'x-un', kind: 'egalite', distractor: true, after: ['thm'], text: t`Le représentant de $\ell$ dans $V$ est la fonction constante égale à $1$.` },
      { id: 'x-signe', kind: 'egalite', distractor: true, after: ['test'], text: t`$w''=1$ dans $\mathcal D'(]0,1[)$.` },
      { id: 'x-cl', kind: 'consequence', distractor: true, after: ['eqD'], text: t`L'équation $-w''=1$ suffit à déterminer $w$ de manière unique.` },
    ],
    justifications: [
      { id: 'j-lin', label: 'Linéarité de l’intégrale.' },
      { id: 'j-cs', label: t`Inégalité de Cauchy–Schwarz sur $]0,1[$, avec la fonction constante $1$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-poinc', label: t`Inégalité de Poincaré, appliquée à $\|v\|_{L^2}$.`, theorem: 'poincare' },
      { id: 'j-riesz', label: 'Théorème de représentation de Riesz.', theorem: 'riesz' },
      { id: 'j-restrict', label: t`Spécialiser l'identité à $v=\varphi\in C^\infty_c(]0,1[)\subset V$.` },
      { id: 'j-distrib', label: t`Définition de la dérivée distributionnelle : $\langle w'',\varphi\rangle=-\int_0^1w'\varphi'$.` },
      { id: 'j-affine', label: t`Une distribution de dérivée seconde nulle sur un intervalle est une fonction affine ; on applique cela à $w+\tfrac12x^2$.` },
      { id: 'j-bord', label: t`$w\in H^1_0(]0,1[)$ : les fonctions de $V$ sont continues et nulles au bord.` },
      { id: 'j-constantes', label: t`Déterminer $a$ et $b$ à partir des deux conditions au bord.` },
      { id: 'j-ipp', label: t`Intégration par parties sur $]0,1[$ : le terme de bord s'annule car $v$ est nulle en $0$ et en $1$.` },
      { id: 'j-unicite', label: t`Unicité du représentant de Riesz : le candidat vérifie l'identité caractéristique.`, theorem: 'riesz' },
      { id: 'j-iso-int', label: t`Isométrie de Riesz, puis calcul de $\|w\|_V^2=\int_0^1(w')^2$.` },
      { id: 'j-iso-ell', label: t`Isométrie de Riesz, puis $\|w\|_V^2=(w,w)_V=\ell(w)=\int_0^1w$.` },
      { id: 'j-syn', label: 'Réunion de la continuité, de l’identification et du calcul de la norme.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-bord-eq', label: t`Les valeurs au bord se lisent sur l'équation $-w''=1$.` },
      { id: 'j-riesz-L2', label: t`Riesz dans $L^2(]0,1[)$, où $\ell(v)=\int_0^1 1\cdot v$.` },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['d-ell'], to: 'lin', by: 'j-lin' },
      { from: ['d-ell'], to: 'cs', by: 'j-cs' },
      { from: ['lin', 'cs', 'h-poinc'], to: 'cont', by: 'j-poinc' },
      { from: ['h-V', 'cont'], to: 'thm', by: 'j-riesz' },

      { from: ['thm'], to: 'test', by: 'j-restrict', path: 'bvp' },
      { from: ['test'], to: 'eqD', by: 'j-distrib', path: 'bvp' },
      { from: ['eqD'], to: 'poly', by: 'j-affine', path: 'bvp' },
      { from: ['thm', 'h-V'], to: 'cl', by: 'j-bord', path: 'bvp' },
      { from: ['poly', 'cl'], to: 'val', by: 'j-constantes', path: 'bvp' },

      { from: ['d-ell'], to: 'cand', by: 'j-ipp', path: 'verif' },
      { from: ['thm', 'cand'], to: 'val', by: 'j-unicite', path: 'verif' },

      { from: ['thm', 'val'], to: 'norme', by: 'j-iso-int' },
      { from: ['thm', 'val'], to: 'norme', by: 'j-iso-ell' },

      { from: ['cont', 'val', 'norme'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-un',
        verdict: 'incorrect',
        concept: 'dual-identification',
        message: t`Dans $L^2(]0,1[)$, la forme $\ell$ est représentée par la constante $1$. Mais le représentant cherché ici appartient à $V$ pour le produit scalaire $(\cdot,\cdot)_V$ : il dépend de l'espace et du produit scalaire.`,
        counterexample: t`La constante $1$ n'appartient pas à $V$ : sa valeur en $0$ n'est pas nulle. Pour une fonction constante, $(1,v)_V$ serait nul, alors que $\ell(v)$ ne l'est pas en général.`,
      },
      {
        conclusion: 'x-signe',
        verdict: 'incorrect',
        concept: 'riesz-signe',
        message: t`Attention au signe : pour $\varphi$ test, $\int_0^1w'\varphi'=-\langle w'',\varphi\rangle$. On obtient $-w''=1$, c'est-à-dire $w''=-1$.`,
        counterexample: t`Avec $w(x)=-\tfrac12x(1-x)$, on aurait $(w,v)_V=-\ell(v)$ pour tout $v$.`,
      },
      {
        conclusion: 'x-cl',
        verdict: 'incorrect',
        concept: 'domaine-operateur',
        message: t`Une équation différentielle sans conditions aux limites admet une infinité de solutions : ce sont les conditions $w(0)=w(1)=0$, issues de $w\in H^1_0$, qui déterminent $w$.`,
        counterexample: t`$w(x)=-\tfrac12x^2+ax+b$ vérifie $-w''=1$ pour tous $a,b\in\mathbb R$.`,
      },
      {
        conclusion: 'cl',
        by: 'j-bord-eq',
        verdict: 'incorrect',
        concept: 'domaine-operateur',
        message: t`L'équation ne fixe pas les valeurs au bord. Elles proviennent de l'appartenance $w\in H^1_0(]0,1[)$.`,
      },
      {
        conclusion: 'thm',
        by: 'j-riesz-L2',
        verdict: 'incorrect',
        concept: 'riesz-produit-scalaire',
        message: t`La représentation est demandée dans $V$, pour le produit scalaire $(\cdot,\cdot)_V$. Riesz dans $L^2$ donne le représentant $1$, qui n'appartient pas à $V$.`,
      },
      {
        conclusion: 'cont',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`La continuité sur $V$ se démontre : elle requiert de majorer $|\ell(v)|$ par la norme de $V$, donc l'inégalité de Poincaré.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-V',
        label: t`Retirer la condition de Dirichlet : travailler sur $H^1(]0,1[)$`,
        necessary: true,
        explanation: t`Sans condition au bord, l'application $(u,v)\mapsto\int_0^1u'v'$ n'est plus un produit scalaire : elle s'annule sur les constantes. La forme $\ell$ n'admet plus de représentant.`,
        counterexample: t`Sur $H^1(]0,1[)$ : $\int_0^1w'\cdot 1'=0$ pour tout $w$, alors que $\ell(1)=1$. Aucun $w$ ne peut représenter $\ell$.`,
      },
      {
        hypothesis: 'h-poinc',
        label: 'Retirer l’inégalité de Poincaré',
        necessary: true,
        explanation: t`Sans l'inégalité de Poincaré, $\ell$ n'est plus contrôlée par la norme de $V$.`,
        counterexample: t`Sur $]0,+\infty[$, soit $\varphi\in C^\infty_c(]0,+\infty[)$ positive non nulle et $v_n(x)=\varphi(x/n)$ : $\|v_n'\|_{L^2}^2=\|\varphi'\|_{L^2}^2/n\to 0$, alors que $\int v_n=n\int\varphi\to+\infty$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Valeur de $\|\ell\|_{V'}^2$`, expected: '1/12' }],
  solution: t`**Continuité.** $\ell$ est linéaire, et par Cauchy–Schwarz puis Poincaré : $|\ell(v)|\le\|v\|_{L^2}\le C\|v'\|_{L^2}=C\|v\|_V$. Donc $\ell\in V'$.

**Représentation.** Le théorème de Riesz donne un unique $w\in V$ tel que $\int_0^1w'v'=\int_0^1v$ pour tout $v\in V$, et $\|\ell\|_{V'}=\|w\|_V$.

**Problème aux limites.** En restreignant à $v=\varphi\in C^\infty_c(]0,1[)$ : $\int_0^1w'\varphi'=\int_0^1\varphi$, c'est-à-dire $-w''=1$ dans $\mathcal D'(]0,1[)$. Ainsi $(w+\tfrac12x^2)''=0$ : il existe $a,b\in\mathbb R$ tels que $w(x)=-\tfrac12x^2+ax+b$. L'appartenance $w\in H^1_0(]0,1[)$ donne $w(0)=w(1)=0$, d'où $b=0$ et $a=\tfrac12$ : $w(x)=\tfrac12x(1-x)$.

**Vérification.** Ce polynôme $p$ appartient à $V$, et une intégration par parties donne $\int_0^1p'v'=[p'v]_0^1-\int_0^1p''v=\int_0^1v$ pour tout $v\in V$ : par unicité, $w=p$.

**Norme.** $\|\ell\|_{V'}^2=\|w\|_V^2=\int_0^1(\tfrac12-x)^2\,dx=\tfrac1{12}$ ; on retrouve la même valeur par $\|w\|_V^2=(w,w)_V=\ell(w)=\int_0^1\tfrac12x(1-x)\,dx=\tfrac1{12}$.

**Point de vigilance.** Le représentant dépend de l'espace : dans $L^2(]0,1[)$, la même forme est représentée par la constante $1$.`,
  steps: [
    t`Montrer la continuité de $\ell$ sur $V$ par Cauchy–Schwarz et Poincaré.`,
    t`Représenter $\ell$ par $w\in V$ grâce à Riesz.`,
    t`Traduire l'identité de représentation en $-w''=1$ dans $\mathcal D'(]0,1[)$.`,
    t`Utiliser $w\in H^1_0$ pour les conditions au bord et résoudre.`,
    t`Calculer $\|\ell\|_{V'}$ par l'isométrie de Riesz.`,
  ],
  commonErrors: [
    { id: 'e-L2', description: t`Répondre $w=1$ en raisonnant dans $L^2$ au lieu de $V$.`, concept: 'dual-identification' },
    { id: 'e-signe', description: t`Écrire $w''=1$ au lieu de $-w''=1$.`, concept: 'riesz-signe' },
    { id: 'e-cl', description: 'Oublier d’utiliser les conditions au bord, qui viennent de l’espace et non de l’équation.', concept: 'domaine-operateur' },
  ],
  hints: [
    t`Quel est le produit scalaire de $V$ ? C'est dans cette structure, et non dans $L^2$, que le représentant est cherché.`,
    t`Teste l'identité $(w,v)_V=\ell(v)$ contre $\varphi\in C^\infty_c(]0,1[)$ pour obtenir une équation sur $w$. Les conditions au bord viennent de l'espace.`,
    t`On obtient $-w''=1$, donc $w(x)=-\tfrac12x^2+ax+b$ ; $w(0)=w(1)=0$ fixe $a$ et $b$. Pour la norme, utilise l'isométrie : $\|\ell\|_{V'}=\|w\|_V$.`,
  ],
  rubric: rubric({
    hypotheses: t`La continuité de $\ell$ sur $V$ est établie (Poincaré), et le produit scalaire de $V$ est identifié.`,
    methode: 'Riesz, puis traduction en problème aux limites, puis résolution explicite.',
    validite: 'Le signe de l’équation et l’origine des conditions au bord sont corrects.',
    justifications: t`Le représentant n'est pas confondu avec celui de $L^2$.`,
    conclusion: t`$w(x)=\tfrac12x(1-x)$ et $\|\ell\|_{V'}^2=\tfrac1{12}$ sont obtenus.`,
  }),
  variant: {
    statement: t`Soit $V=H^1_0(]0,1[)$, muni de $(u,v)_V=\int_0^1u'v'$, et $\ell(v)=\int_0^1x\,v(x)\,dx$. Déterminer le représentant de Riesz $w$ de $\ell$ dans $V$ et calculer $\|\ell\|_{V'}$.`,
    solution: t`$\ell$ est continue sur $V$ (Cauchy–Schwarz et Poincaré). Le représentant vérifie $\int_0^1w'v'=\int_0^1x\,v$ pour tout $v\in V$, donc $-w''=x$ dans $\mathcal D'(]0,1[)$ et $w(0)=w(1)=0$. Alors $w(x)=-\tfrac16x^3+ax+b$, et les conditions au bord donnent $b=0$, $a=\tfrac16$ : $w(x)=\tfrac16(x-x^3)$. Enfin $\|\ell\|_{V'}^2=\|w\|_V^2=(w,w)_V=\ell(w)=\int_0^1x\cdot\tfrac16(x-x^3)\,dx=\tfrac16\big(\tfrac13-\tfrac15\big)=\tfrac1{45}$.`,
    closedChecks: [
      { kind: 'expr-equiv', prompt: t`Expression de $w(x)$ sur $]0,1[$`, expected: '(x-x^3)/6', vars: ['x'] },
      { kind: 'rational', prompt: t`Valeur de $\|\ell\|_{V'}^2$`, expected: '1/45' },
    ],
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT02: TheoremModule = {
  theorem: {
    id: 'riesz',
    spaces: [
      t`$H$ : espace de Hilbert réel, de produit scalaire $\langle\cdot,\cdot\rangle_H$ et de norme associée $\|\cdot\|_H$.`,
      t`$H'$ : dual de $H$, espace des formes linéaires continues sur $H$, muni de la norme $\|\ell\|_{H'}=\sup_{\|v\|_H\le 1}|\ell(v)|$.`,
    ],
    hypotheses: [
      {
        id: 'h-hilbert',
        text: t`$H$ est un espace de Hilbert réel : la norme issue du produit scalaire le rend complet.`,
        whenRemoved: t`Sur $E=C([-1,1])$ muni du produit scalaire de $L^2$, la forme $\ell(u)=\int_0^1u$ est continue. Si $w\in E$ la représentait, tester contre les $u$ à support dans $]-1,0[$, puis dans $]0,1[$, imposerait $w=0$ sur $[-1,0]$ et $w=1$ sur $[0,1]$ : impossible pour $w$ continue.`,
      },
      {
        id: 'h-continuite',
        text: t`$\ell\in H'$ : $\ell$ est linéaire et continue sur $H$.`,
        whenRemoved: t`Une forme représentée vérifie automatiquement $|\ell(v)|=|\langle v,w\rangle|\le\|w\|\,\|v\|$ : une forme linéaire discontinue ne peut donc pas être représentée.`,
      },
    ],
    statement: t`Pour tout $\ell\in H'$, il existe un unique $w\in H$ tel que
$$\ell(v)=\langle v,w\rangle_H\quad\forall v\in H,\qquad \|\ell\|_{H'}=\|w\|_H.$$`,
    conclusions: {
      existence: t`Si $\ell\neq 0$, on choisit $z\in(\ker\ell)^\perp\setminus\{0\}$ et $w=\ell(z)\,z/\|z\|_H^2$ convient.`,
      unicite: t`Deux représentants vérifient $\langle v,w_1-w_2\rangle=0$ pour tout $v\in H$.`,
      stabilite: t`L'application $\ell\mapsto w$ est isométrique : $\|\ell\|_{H'}=\|w\|_H$.`,
    },
    sourceProof: 'complete',
    proofOutline: [
      t`Si $\ell=0$, prendre $w=0$.`,
      t`Sinon, $F=\ker\ell$ est un sous-espace fermé strict de $H$.`,
      t`Par projection orthogonale, choisir $z\in F^\perp\setminus\{0\}$ ; alors $z\notin F$, donc $\ell(z)\neq 0$.`,
      t`Pour tout $v\in H$, le vecteur $v-\tfrac{\ell(v)}{\ell(z)}z$ appartient à $F$ : son produit scalaire avec $z$ est nul.`,
      t`On en déduit $\ell(v)=\tfrac{\ell(z)}{\|z\|^2}\langle v,z\rangle$, donc $w=\ell(z)z/\|z\|^2$ (cas réel).`,
      t`Unicité : $\langle v,w_1-w_2\rangle=0$ pour tout $v\in H$, puis tester en $v=w_1-w_2$.`,
      t`Norme : Cauchy–Schwarz donne $\|\ell\|_{H'}\le\|w\|_H$, et le choix $v=w/\|w\|_H$ (si $w\neq 0$) donne l'inégalité inverse.`,
    ],
    warnings: [
      t`Le représentant dépend du produit scalaire : deux produits scalaires équivalents sur le même espace donnent en général deux représentants différents.`,
      t`Le théorème ne dit rien des formes non continues, et la complétude de $H$ est indispensable.`,
      t`$\|\ell\|_{H'}=\|w\|_H$ est une identité pour la norme hilbertienne : pour une autre norme, la norme duale change.`,
    ],
    usefulFor: 'Transformer une forme du dual en vecteur du Hilbert, ou une forme bilinéaire continue en opérateur borné : c’est le premier passage indispensable dans Lax–Milgram et Stampacchia.',
    verification: FROM_POLY,
  },
  definitions: [
    {
      id: 'riesz-dual',
      term: 'Dual topologique',
      statement: t`Si $E$ est un espace normé réel, $E'$ désigne l'espace des formes linéaires continues $\ell:E\to\mathbb R$, muni de la norme $\|\ell\|_{E'}=\sup\{|\ell(v)| : \|v\|_E\le 1\}$.`,
      source: complement('Définition standard, utilisée au chapitre 1 sans être rappelée'),
    },
    {
      id: 'riesz-representant',
      term: 'Représentant de Riesz',
      statement: t`Le représentant de $\ell\in H'$ est l'unique vecteur $w\in H$ tel que $\ell(v)=\langle v,w\rangle_H$ pour tout $v\in H$.`,
      source: poly(6, 'Section 1.2'),
    },
    {
      id: 'riesz-orthogonal',
      term: 'Orthogonal d’une partie',
      statement: t`Pour une partie $F$ de l'espace de Hilbert $H$, $F^\perp=\{x\in H : \langle x,y\rangle_H=0\ \text{pour tout}\ y\in F\}$.`,
      source: complement('Définition standard, utilisée en section 1.2 sans être rappelée'),
    },
  ],
  concepts: [
    {
      id: 'riesz-produit-scalaire',
      label: 'Représentant et produit scalaire',
      reminder: t`La relation $\ell(v)=\langle v,w\rangle_H$ détermine $w$ pour un produit scalaire fixé : changer le produit scalaire, ou l'espace, change le représentant.`,
    },
    {
      id: 'riesz-norme-duale',
      label: 'Norme d’une forme linéaire',
      reminder: t`$\|\ell\|_{H'}$ est une borne supérieure sur la boule unité de $H$ : elle dépend de la norme de $H$. La majoration de Cauchy–Schwarz ne devient une égalité que grâce au vecteur représentant.`,
    },
    {
      id: 'riesz-signe',
      label: 'Signe de la dérivée seconde',
      reminder: t`$\int_0^1w'\varphi'=-\langle w'',\varphi\rangle$ pour une fonction test $\varphi$ : la formulation variationnelle fait apparaître $-w''$, avec son signe.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-riesz-complet',
      theoremId: 'riesz',
      title: 'Espace préhilbertien non complet',
      claim: t`Toute forme linéaire continue sur un espace préhilbertien est représentée par un vecteur de cet espace.`,
      correctStatement: t`Le théorème est énoncé sur un espace de Hilbert : la complétude sert à la projection orthogonale sur le noyau.`,
      task: t`Soit $E=C([-1,1])$, muni du produit scalaire de $L^2(]-1,1[)$, et $\ell(u)=\int_0^1u$. Calcule la norme de $\ell$ dans le dual de $E$ : cette valeur n'est atteinte par aucune fonction de $E$, et $\ell$ n'a pas de représentant dans $E$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\|\ell\|_{E'}$`, expected: '1' },
      explanation: t`Pour $u\in E$ : $\ell(u)=\int_{-1}^1u\,\mathbb 1_{]0,1[}\le\|u\|_{L^2}$. Si $u_n=1$ sur $[0,1]$, $u_n=0$ sur $[-1,-1/n]$ et affine entre les deux, alors $\ell(u_n)=1$ et $\|u_n\|_{L^2}\to 1$ : donc $\|\ell\|_{E'}=1$. Si $w\in E$ représentait $\ell$, tester contre les $u$ à support dans $]-1,0[$ imposerait $w=0$ sur $[-1,0]$, et contre ceux à support dans $]0,1[$ imposerait $w=1$ sur $[0,1]$ : impossible pour une fonction continue en $0$.`,
      concept: 'complet-necessaire',
      source: poly(6, 'Section 1.2 (H espace de Hilbert)'),
    },
    {
      id: 'ce-riesz-ps',
      theoremId: 'riesz',
      title: 'Le représentant dépend du produit scalaire',
      claim: t`Le représentant de Riesz d'une forme linéaire sur $\mathbb R^2$ ne dépend que de cette forme.`,
      correctStatement: t`Le représentant est relatif à un produit scalaire : $\ell(v)=\langle v,w\rangle_H$ détermine $w$ pour un produit scalaire fixé.`,
      task: t`Sur $\mathbb R^2$ muni de $\langle u,v\rangle_A=2u_1v_1+u_2v_2$, calcule le représentant de $\ell(x,y)=3x-2y$. Il diffère du représentant euclidien $(3,-2)$.`,
      check: { kind: 'rational-vector', prompt: t`Coordonnées du représentant pour $\langle\cdot,\cdot\rangle_A$`, expected: ['3/2', '-2'], labels: ['w₁', 'w₂'] },
      explanation: t`Pour $w=(w_1,w_2)$ : $\langle e_1,w\rangle_A=2w_1$ et $\langle e_2,w\rangle_A=w_2$. L'identité $\ell=\langle\cdot,w\rangle_A$ donne $w_1=\ell(e_1)/2=3/2$ et $w_2=\ell(e_2)=-2$.`,
      concept: 'riesz-produit-scalaire',
      source: poly(6, 'Section 1.2 (dépendance au produit scalaire)'),
    },
    {
      id: 'ce-riesz-sup',
      theoremId: 'riesz',
      title: 'Norme non hilbertienne',
      claim: t`Sur $\mathbb R^2$ muni de $\|(x,y)\|_\infty=\max(|x|,|y|)$, la forme $\ell(x,y)=3x-2y$ vérifie $\|\ell\|=\|(3,-2)\|_\infty$.`,
      correctStatement: t`L'identité $\|\ell\|_{H'}=\|w\|_H$ vaut pour la norme hilbertienne ; pour une autre norme, la norme duale change.`,
      task: t`Calcule la norme de $\ell(x,y)=3x-2y$ pour la norme $\|\cdot\|_\infty$ sur $\mathbb R^2$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\|\ell\|$ pour $\|\cdot\|_\infty$`, expected: '5' },
      explanation: t`Pour $\max(|x|,|y|)\le 1$ : $|3x-2y|\le 3|x|+2|y|\le 5$, avec égalité en $(x,y)=(1,-1)$. Donc $\|\ell\|=5$, alors que $\|(3,-2)\|_\infty=3$.`,
      concept: 'riesz-norme-duale',
      source: poly(6, 'Section 1.2 (norme duale)'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT02;
