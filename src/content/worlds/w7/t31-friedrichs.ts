/**
 * Résultat 31 — Extension de Friedrichs (polycopié, section 6.7, p. PDF 26 ; idée de preuve seulement).
 * Exercices : annexe B, n° 31 (p. PDF 43–44).
 */
import { t, rubric, poly, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'friedrichs.facile',
  theoremId: 'friedrichs',
  level: 'facile',
  title: 'Extension d’un opérateur : définition exacte',
  statement: t`Dans $H=L^2(]0,1[)$, on considère trois opérateurs agissant par $u\mapsto -u''$ : $S$ de domaine $C^\infty_c(]0,1[)$, $A_D$ de domaine $H^2(]0,1[)\cap H^1_0(]0,1[)$, et $T$ de domaine $H^2(]0,1[)$. (a) Écrire la définition exacte de « $B$ est une extension de $S$ ». (b) Montrer que $S\subset A_D\subset T$. (c) Montrer que $S$ est symétrique et que $T$ ne l'est pas : une extension d'un opérateur symétrique n'est pas symétrique en général.`,
  source: poly(43, 'Exercice 31, facile (p. PDF 43)'),
  prerequisites: ['adjoint'],
  concepts: ['domaine-operateur', 'symetrie-autoadjonction', 'friedrichs-extension', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-H', kind: 'hypothese', text: t`$H=L^2(]0,1[)$ est un Hilbert réel, et $C^\infty_c(]0,1[)$ y est dense.` },
      { id: 'd-ext', kind: 'definition', text: t`$S\subset B$ (« $B$ est une extension de $S$ ») signifie : $D(S)\subset D(B)$ et $Bu=Su$ pour tout $u\in D(S)$.` },
      { id: 'd-S', kind: 'definition', text: t`$Su=-u''$, $D(S)=C^\infty_c(]0,1[)$.` },
      { id: 'd-AD', kind: 'definition', text: t`$A_Du=-u''$, $D(A_D)=H^2(]0,1[)\cap H^1_0(]0,1[)$.` },
      { id: 'd-T', kind: 'definition', text: t`$Tu=-u''$, $D(T)=H^2(]0,1[)$.` },

      { id: 'inc1', kind: 'inclusion', text: t`$C^\infty_c(]0,1[)\subset H^2(]0,1[)\cap H^1_0(]0,1[)$.` },
      { id: 'inc2', kind: 'inclusion', text: t`$H^2(]0,1[)\cap H^1_0(]0,1[)\subset H^2(]0,1[)$.` },
      { id: 'same', kind: 'egalite', text: t`Sur l'intersection de leurs domaines, $S$, $A_D$ et $T$ prennent la même valeur $-u''$ (dérivée faible).` },
      { id: 'ext1', kind: 'consequence', text: t`$S\subset A_D$.` },
      { id: 'ext2', kind: 'consequence', text: t`$A_D\subset T$.` },
      { id: 'ext3', kind: 'consequence', text: t`$S\subset T$.` },
      { id: 'ipp-S', kind: 'egalite', text: t`Pour $u,v\in C^\infty_c(]0,1[)$ : $\langle Su,v\rangle_H=\int_0^1u'v'=\langle u,Sv\rangle_H$.` },
      { id: 'sym-S', kind: 'consequence', text: t`$S$ est symétrique : densément défini et $\langle Su,v\rangle_H=\langle u,Sv\rangle_H$ sur $D(S)$.` },
      {
        id: 'calc',
        kind: 'egalite',
        text: t`Pour $u(x)=x^2$ et $v=1$, éléments de $D(T)$ : $\langle Tu,v\rangle_H-\langle u,Tv\rangle_H=-2$.`,
        masked: t`Valeur de $\langle Tu,v\rangle_H-\langle u,Tv\rangle_H$ pour $u(x)=x^2$, $v=1$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\langle Tu,v\rangle_H-\langle u,Tv\rangle_H$`, expected: '-2' },
      },
      { id: 'nonsym-T', kind: 'consequence', text: t`$T$ n'est pas symétrique.` },
      { id: 'fin', kind: 'conclusion', text: t`$S\subset A_D\subset T$ au sens des extensions ; $S$ est symétrique, son extension $T$ ne l'est pas.` },

      { id: 'x-sym-ext', kind: 'consequence', distractor: true, after: ['ext3'], text: t`Toute extension d'un opérateur symétrique est symétrique ; en particulier $T$ l'est.` },
      { id: 'x-meme-expr', kind: 'egalite', distractor: true, text: t`$S=A_D$, puisque les deux opérateurs sont donnés par $-\frac{d^2}{dx^2}$.` },
      { id: 'x-adj', kind: 'inclusion', distractor: true, after: ['ext3'], text: t`$S\subset T$ entraîne $D(S^*)\subset D(T^*)$.` },
    ],
    justifications: [
      { id: 'j-cinf', label: t`Une fonction de $C^\infty_c(]0,1[)$ est de classe $C^\infty$, à support compact : elle est dans $H^2$ et s'annule près du bord.` },
      { id: 'j-inter', label: 'Une intersection est incluse dans chacun des ensembles.' },
      { id: 'j-expr', label: t`Les trois opérateurs sont définis par la même formule, la dérivée seconde faible coïncidant avec la dérivée classique sur $C^\infty_c$.` },
      { id: 'j-def-ext', label: t`Définition d'une extension : inclusion des domaines et coïncidence sur le plus petit.` },
      { id: 'j-trans', label: 'Transitivité de la relation d’extension.' },
      { id: 'j-ipp', label: t`Deux intégrations par parties ; les termes de bord sont nuls, car $u$ et $v$ s'annulent près de $0$ et de $1$.` },
      { id: 'j-def-sym', label: t`Définition d'un opérateur symétrique, la densité de $C^\infty_c(]0,1[)$ dans $H$ étant acquise.` },
      { id: 'j-calc', label: t`$Tu=-2$, $Tv=0$ : $\langle Tu,v\rangle_H=\int_0^1(-2)=-2$ et $\langle u,Tv\rangle_H=0$.` },
      { id: 'j-contre', label: 'Un couple qui met en défaut l’égalité suffit à réfuter la symétrie.' },
      { id: 'j-syn', label: 'Réunion des résultats établis.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-meme', label: 'Même expression différentielle, donc même opérateur.' },
      { id: 'j-herite', label: 'La symétrie se transmet aux extensions.' },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['d-S', 'd-AD'], to: 'inc1', by: 'j-cinf' },
      { from: ['d-AD', 'd-T'], to: 'inc2', by: 'j-inter' },
      { from: ['d-S', 'd-AD', 'd-T'], to: 'same', by: 'j-expr' },
      { from: ['inc1', 'same', 'd-ext'], to: 'ext1', by: 'j-def-ext' },
      { from: ['inc2', 'same', 'd-ext'], to: 'ext2', by: 'j-def-ext' },
      { from: ['ext1', 'ext2'], to: 'ext3', by: 'j-trans' },
      { from: ['d-S'], to: 'ipp-S', by: 'j-ipp' },
      { from: ['ipp-S', 'h-H'], to: 'sym-S', by: 'j-def-sym' },
      { from: ['d-T'], to: 'calc', by: 'j-calc' },
      { from: ['calc'], to: 'nonsym-T', by: 'j-contre' },
      { from: ['ext1', 'ext2', 'ext3', 'sym-S', 'nonsym-T'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-sym-ext',
        verdict: 'incorrect',
        concept: 'symetrie-autoadjonction',
        message: t`Agrandir le domaine peut faire apparaître des termes de bord : la symétrie ne se transmet pas aux extensions.`,
        counterexample: t`$S\subset T$, $S$ est symétrique, et $\langle T(x^2),1\rangle_H-\langle x^2,T1\rangle_H=-2$.`,
      },
      {
        conclusion: 'x-meme-expr',
        verdict: 'incorrect',
        concept: 'domaine-operateur',
        message: 'Un opérateur est la donnée d’une expression et d’un domaine : deux domaines différents donnent deux opérateurs différents.',
        counterexample: t`$x(1-x)\in D(A_D)$ n'appartient pas à $D(S)=C^\infty_c(]0,1[)$.`,
      },
      {
        conclusion: 'x-adj',
        verdict: 'incorrect',
        concept: 'friedrichs-extension',
        message: t`Le passage à l'adjoint renverse les inclusions : $S\subset T$ entraîne $T^*\subset S^*$.`,
        counterexample: t`$1\in D(S^*)$, car $\langle Su,1\rangle_H=0$ pour $u\in C^\infty_c$. Si $1\in D(T^*)$, on aurait $T^*1=0$ (tester par $C^\infty_c$), puis $\langle T(x^2),1\rangle_H=0$, alors que cette quantité vaut $-2$.`,
      },
      {
        conclusion: 'ext1',
        by: 'j-meme',
        verdict: 'incorrect',
        concept: 'domaine-operateur',
        message: t`La formule ne suffit pas : l'extension exige l'inclusion des domaines, à vérifier séparément.`,
        counterexample: t`$B=-\frac{d^2}{dx^2}$ sur $\{u\in H^2(]0,1[) : u(1/2)=0\}$ a la même formule, mais $D(S)\not\subset D(B)$.`,
      },
      {
        conclusion: 'nonsym-T',
        by: 'j-herite',
        verdict: 'incorrect',
        concept: 'symetrie-autoadjonction',
        message: 'Cette justification est fausse, et elle conduirait d’ailleurs à la conclusion opposée.',
      },
      {
        conclusion: 'ext1',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: 'Deux conditions sont à vérifier : l’inclusion des domaines et la coïncidence des valeurs.',
      },
    ],
    removable: [
      {
        hypothesis: 'inc1',
        label: 'Ne plus disposer de l’inclusion des domaines',
        necessary: true,
        explanation: 'Sans inclusion des domaines, il n’y a pas d’extension, quelle que soit la formule.',
        counterexample: t`$B=-\frac{d^2}{dx^2}$ sur $\{u\in H^2(]0,1[) : u(1/2)=0\}$ : la formule est la même, mais $B$ n'est pas une extension de $S$.`,
      },
      {
        hypothesis: 'same',
        label: 'Ne plus disposer de la coïncidence des valeurs',
        necessary: true,
        explanation: 'L’inclusion des domaines ne suffit pas : les valeurs doivent coïncider sur le plus petit domaine.',
        counterexample: t`$B=-\frac{d^2}{dx^2}+I$ sur $H^2(]0,1[)$ : $D(S)\subset D(B)$, mais $Bu=Su+u\neq Su$ pour $u\neq 0$.`,
      },
    ],
  },
  solution: t`**Définition.** $B$ est une extension de $S$, noté $S\subset B$, lorsque $D(S)\subset D(B)$ et $Bu=Su$ pour tout $u\in D(S)$ : le graphe de $S$ est contenu dans celui de $B$.

**Inclusions.** $C^\infty_c(]0,1[)\subset H^2\cap H^1_0$, car une telle fonction est régulière et nulle près du bord ; $H^2\cap H^1_0\subset H^2$. Les trois opérateurs agissent par $-u''$. Donc $S\subset A_D\subset T$.

**Symétrie de $S$.** $D(S)$ est dense dans $L^2$ et, pour $u,v\in C^\infty_c(]0,1[)$, deux intégrations par parties sans terme de bord donnent $\langle Su,v\rangle=\int_0^1u'v'=\langle u,Sv\rangle$.

**$T$ n'est pas symétrique.** Pour $u=x^2$, $v=1$ : $\langle Tu,v\rangle=-2$ et $\langle u,Tv\rangle=0$. La différence vaut $-2$ : le terme de bord $[u'v-uv']_0^1$ ne s'annule plus.

**Vigilance.** Les inclusions s'inversent par passage à l'adjoint : $S\subset T$ entraîne $T^*\subset S^*$.`,
  steps: [
    'Écrire la définition : inclusion des domaines et coïncidence des valeurs.',
    'Vérifier les deux inclusions de domaines et la coïncidence des formules.',
    t`Établir la symétrie de $S$ par intégration par parties.`,
    t`Réfuter la symétrie de $T$ par un couple explicite.`,
  ],
  commonErrors: [
    { id: 'e-expr', description: 'Identifier deux opérateurs parce qu’ils ont la même expression différentielle.', concept: 'domaine-operateur' },
    { id: 'e-herite', description: 'Croire que la symétrie passe aux extensions.', concept: 'symetrie-autoadjonction' },
    { id: 'e-adj', description: t`Écrire $D(S^*)\subset D(T^*)$ lorsque $S\subset T$.`, concept: 'friedrichs-extension' },
  ],
  hints: [
    t`Un opérateur est un couple (domaine, formule). Que faut-il comparer pour dire que $B$ prolonge $S$ ?`,
    t`Compare les domaines deux à deux, puis la formule. Pour la symétrie, intègre par parties et regarde les termes de bord.`,
    t`Pour $T$, essaie $u(x)=x^2$ et $v=1$ : le terme de bord $[u'v-uv']_0^1$ ne s'annule pas.`,
  ],
  rubric: rubric({
    hypotheses: 'Les trois domaines sont explicités et comparés.',
    methode: 'La définition d’extension est appliquée à la lettre, condition par condition.',
    validite: 'Les intégrations par parties tiennent compte des termes de bord.',
    justifications: 'Aucune identification d’opérateurs par la seule formule.',
    conclusion: t`$S\subset A_D\subset T$, $S$ symétrique et $T$ non symétrique sont établis.`,
  }),
  variant: {
    statement: t`Dans $H=L^2(]0,1[)$, soit $N=-\frac{d^2}{dx^2}$ de domaine $\{u\in H^2(]0,1[) : u'(0)=u'(1)=0\}$. Montrer que $N$ est une extension symétrique de $S$, et calculer $\langle Nu,u\rangle_H$ pour $u(x)=3x^2-2x^3$.`,
    solution: t`$C^\infty_c(]0,1[)\subset D(N)$ (fonctions et dérivées nulles près du bord), et $N$ agit par $-u''$ : $S\subset N$. Pour $u,v\in D(N)$, $\langle Nu,v\rangle=-[u'v]_0^1+\int_0^1u'v'=\int_0^1u'v'$, expression symétrique en $u$ et $v$ : $N$ est symétrique. Pour $u(x)=3x^2-2x^3$, $u'(x)=6x(1-x)$ s'annule en $0$ et $1$, donc $u\in D(N)$, et $\langle Nu,u\rangle=\int_0^136x^2(1-x)^2\,dx=\frac65$.`,
    closedChecks: [{ kind: 'rational', prompt: t`Valeur de $\langle Nu,u\rangle_H$`, expected: '6/5' }],
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'd-ext', kind: 'definition', text: t`$S\subset B$ signifie : $D(S)\subset D(B)$ et $Bu=Su$ pour $u\in D(S)$.` },
        { id: 'd-S', kind: 'definition', text: t`$Su=-u''$, $D(S)=C^\infty_c(]0,1[)$, dense dans $H=L^2(]0,1[)$.` },
        { id: 'd-N', kind: 'definition', text: t`$Nu=-u''$, $D(N)=\{u\in H^2(]0,1[) : u'(0)=u'(1)=0\}$.` },
        { id: 'd-u', kind: 'definition', text: t`$u(x)=3x^2-2x^3$.` },
        { id: 'inc', kind: 'inclusion', text: t`$C^\infty_c(]0,1[)\subset D(N)$.` },
        { id: 'ext', kind: 'consequence', text: t`$S\subset N$.` },
        { id: 'ipp', kind: 'egalite', text: t`Pour $u,v\in D(N)$ : $\langle Nu,v\rangle_H=\int_0^1u'v'$.` },
        { id: 'sym', kind: 'consequence', text: t`$N$ est symétrique.` },
        { id: 'u-in', kind: 'consequence', text: t`$u\in D(N)$.` },
        {
          id: 'val',
          kind: 'egalite',
          text: t`$\langle Nu,u\rangle_H=\frac65$.`,
          masked: t`Valeur de $\langle Nu,u\rangle_H$ : à calculer.`,
          check: { kind: 'rational', prompt: t`Valeur exacte de $\langle Nu,u\rangle_H$`, expected: '6/5' },
        },
        { id: 'fin', kind: 'conclusion', text: t`$N$ est une extension symétrique de $S$, et $\langle Nu,u\rangle_H=\frac65$.` },
        { id: 'x-herite', kind: 'consequence', distractor: true, after: ['ext'], text: t`$N$ est symétrique parce que c'est une extension de l'opérateur symétrique $S$.` },
      ],
      justifications: [
        { id: 'j-cinf', label: t`Une fonction de $C^\infty_c(]0,1[)$ et sa dérivée s'annulent près du bord.` },
        { id: 'j-def-ext', label: 'Définition d’une extension.' },
        { id: 'j-ipp', label: t`Intégration par parties : le terme de bord $[u'v]_0^1$ est nul car $u'(0)=u'(1)=0$.` },
        { id: 'j-sym', label: t`L'expression $\int_0^1u'v'$ est symétrique en $u$ et $v$, et $D(N)\supset D(S)$ est dense.` },
        { id: 'j-u', label: t`$u'(x)=6x(1-x)$ s'annule en $0$ et en $1$.` },
        { id: 'j-calc', label: t`$\int_0^136x^2(1-x)^2\,dx=36\cdot\frac1{30}$.` },
        { id: 'j-syn', label: 'Réunion des résultats établis.' },
        { id: 'j-herite', label: 'La symétrie se transmet aux extensions.' },
      ],
      rules: [
        { from: ['d-S', 'd-N'], to: 'inc', by: 'j-cinf' },
        { from: ['inc', 'd-ext', 'd-S', 'd-N'], to: 'ext', by: 'j-def-ext' },
        { from: ['d-N'], to: 'ipp', by: 'j-ipp' },
        { from: ['ipp', 'inc'], to: 'sym', by: 'j-sym' },
        { from: ['d-u', 'd-N'], to: 'u-in', by: 'j-u' },
        { from: ['ipp', 'u-in'], to: 'val', by: 'j-calc' },
        { from: ['ext', 'sym', 'val'], to: 'fin', by: 'j-syn' },
      ],
      traps: [
        {
          conclusion: 'x-herite',
          verdict: 'incorrect',
          concept: 'symetrie-autoadjonction',
          message: t`La symétrie de $N$ vient des conditions $u'(0)=u'(1)=0$, pas de celle de $S$ : l'extension $T$ de domaine $H^2$ n'est pas symétrique.`,
          counterexample: t`Pour $T$ de domaine $H^2(]0,1[)$ : $\langle T(x^2),1\rangle_H-\langle x^2,T1\rangle_H=-2$.`,
        },
        {
          conclusion: 'sym',
          by: 'j-herite',
          verdict: 'incorrect',
          concept: 'symetrie-autoadjonction',
          message: 'Cette justification est fausse : il faut calculer les termes de bord sur le domaine de l’extension.',
        },
      ],
      removable: [
        {
          hypothesis: 'ipp',
          label: 'Ne plus disposer des conditions de Neumann dans l’intégration par parties',
          necessary: true,
          explanation: t`Sans $u'(0)=u'(1)=0$, le terme de bord subsiste et la symétrie tombe.`,
          counterexample: t`Sur $H^2(]0,1[)$, $u=x^2$ et $v=1$ donnent $\langle Tu,v\rangle-\langle u,Tv\rangle=-2$.`,
        },
      ],
    },
  },
  verification: { ...COMPLEMENT, notes: 'L’exercice figure au polycopié sans corrigé ; définition et vérifications rédigées pour ProofLab.' },
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'friedrichs.intermediaire',
  theoremId: 'friedrichs',
  level: 'intermediaire',
  title: t`Fermeture de la forme de $-\frac{d^2}{dx^2}$ sur $C^\infty_c(]0,1[)$`,
  statement: t`Dans $H=L^2(]0,1[)$, soit $S=-\frac{d^2}{dx^2}$ de domaine $C^\infty_c(]0,1[)$ et $q(u,v)=\langle Su,v\rangle_H$ sur $D(S)$. Montrer que $q$ est fermable, que sa fermeture $\bar q$ a pour domaine $H^1_0(]0,1[)$ avec $\bar q(u,v)=\int_0^1u'v'$, et que l'opérateur associé $S_F$ est $-\frac{d^2}{dx^2}$ de domaine $H^2(]0,1[)\cap H^1_0(]0,1[)$.`,
  source: poly(43, 'Exercice 31, intermédiaire (p. PDF 43) ; idée de preuve de la section 6.7 (p. PDF 26)'),
  prerequisites: [],
  concepts: ['friedrichs-fermable', 'fermeture-espace', 'densite-fermeture', 'domaine-operateur'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-H', kind: 'hypothese', text: t`$H=L^2(]0,1[)$ ; $H^1(]0,1[)$ est complet et $H^1_0(]0,1[)$ est l'adhérence de $C^\infty_c(]0,1[)$ dans $H^1(]0,1[)$.` },
      { id: 'd-S', kind: 'definition', text: t`$Su=-u''$ sur $D(S)=C^\infty_c(]0,1[)$.` },
      { id: 'd-q', kind: 'definition', text: t`$q(u,v)=\langle Su,v\rangle_H$ et $\|u\|_q^2=q(u,u)+\|u\|_H^2$ pour $u,v\in D(S)$.` },
      { id: 'ipp', kind: 'egalite', text: t`$q(u,v)=\int_0^1u'v'$ : $q$ est symétrique et positive, et $S\ge 0$.` },
      { id: 'norme', kind: 'egalite', text: t`$\|u\|_q=\|u\|_{H^1}$ pour $u\in D(S)$.` },
      { id: 'fermable', kind: 'consequence', text: t`Si $(u_n)\subset D(S)$ est de Cauchy pour $\|\cdot\|_q$ et $u_n\to 0$ dans $H$, alors $\|u_n\|_q\to 0$ : $q$ est fermable.` },
      { id: 'dom', kind: 'egalite', text: t`$D(\bar q)=H^1_0(]0,1[)$ et $\bar q(u,v)=\int_0^1u'v'$.` },
      { id: 'fermee', kind: 'consequence', text: t`$\bar q$ est symétrique, positive, fermée et densément définie.` },
      { id: 'rep', kind: 'application-theoreme', text: t`L'opérateur associé $S_F$ est auto-adjoint, positif, prolonge $S$, et $D(S_F)=\{u\in H^1_0 : \exists g\in L^2,\ \int_0^1u'v'=\int_0^1gv\ \ \forall v\in H^1_0\}$, $S_Fu=g$.` },
      { id: 'id', kind: 'egalite', text: t`$D(S_F)=H^2(]0,1[)\cap H^1_0(]0,1[)$ et $S_Fu=-u''$.` },
      { id: 'fin', kind: 'conclusion', text: t`La fermeture de $q$ est $\int_0^1u'v'$ sur $H^1_0(]0,1[)$, et l'extension de Friedrichs de $S$ est le Laplacien de Dirichlet $-\frac{d^2}{dx^2}$ sur $H^2\cap H^1_0$.` },
      { id: 'x-H1', kind: 'egalite', distractor: true, after: ['norme'], text: t`$D(\bar q)=H^1(]0,1[)$.` },
      { id: 'x-fermable', kind: 'consequence', distractor: true, text: t`Toute forme symétrique positive densément définie est fermable.` },
    ],
    justifications: [
      { id: 'j-ipp', label: t`Intégration par parties sans terme de bord, $u$ et $v$ s'annulant près de $0$ et de $1$.` },
      { id: 'j-norme', label: t`$\|u\|_q^2=\|u'\|_H^2+\|u\|_H^2$.` },
      { id: 'j-fermable', label: t`Une suite de Cauchy pour $\|\cdot\|_q$ est de Cauchy dans $H^1$ complet ; sa limite dans $H^1$ est aussi sa limite dans $L^2$, donc nulle.` },
      { id: 'j-complete', label: t`Grâce à la fermabilité, le complété de $(C^\infty_c,\|\cdot\|_q)$ se réalise dans $H$ : c'est l'adhérence de $C^\infty_c$ dans $H^1$, et $\int_0^1u'v'$ passe à la limite.` },
      { id: 'j-fermee', label: t`$H^1_0$ est complet pour $\|\cdot\|_{H^1}=\|\cdot\|_{\bar q}$ et contient $C^\infty_c$, dense dans $L^2$.` },
      { id: 'j-rep', label: t`Théorème de représentation appliqué à $\bar q$ ; pour $u\in C^\infty_c$, $\bar q(u,v)=\langle -u'',v\rangle_H$ pour tout $v\in H^1_0$.`, theorem: 'formes-fermees' },
      { id: 'j-id', label: t`Tester par $v\in C^\infty_c$ : $-u''=g$ au sens des distributions, donc $u\in H^2$. Réciproquement, pour $u\in H^2\cap H^1_0$, le terme de bord $[u'v]_0^1$ est nul car $v\in H^1_0$.` },
      { id: 'j-syn', label: 'Réunion des résultats établis.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-dense-L2', label: t`$C^\infty_c(]0,1[)$ est dense dans $L^2$ : la fermeture de la forme est définie sur $L^2$ tout entier.` },
      { id: 'j-graphe', label: t`La fermeture de la forme s'obtient en fermant le graphe de $S$.` },
      { id: 'j-friedrichs', label: 'Théorème de Friedrichs.', theorem: 'friedrichs' },
    ],
    rules: [
      { from: ['d-S', 'd-q'], to: 'ipp', by: 'j-ipp' },
      { from: ['ipp', 'd-q'], to: 'norme', by: 'j-norme' },
      { from: ['norme', 'h-H'], to: 'fermable', by: 'j-fermable' },
      { from: ['norme', 'fermable', 'h-H'], to: 'dom', by: 'j-complete' },
      { from: ['dom', 'ipp', 'h-H'], to: 'fermee', by: 'j-fermee' },
      { from: ['dom', 'fermee', 'ipp'], to: 'rep', by: 'j-rep' },
      { from: ['rep'], to: 'id', by: 'j-id' },
      { from: ['dom', 'fermee', 'id'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-H1',
        verdict: 'incorrect',
        concept: 'densite-fermeture',
        message: t`La fermeture se prend pour $\|\cdot\|_q=\|\cdot\|_{H^1}$ : on obtient l'adhérence de $C^\infty_c$ dans $H^1$, qui est $H^1_0$, strictement contenu dans $H^1$.`,
        counterexample: t`$|v(0)|\le\sqrt2\,\|v\|_{H^1}$ sur $H^1(]0,1[)$ : l'évaluation en $0$, nulle sur $C^\infty_c$, l'est sur son adhérence. La fonction $1$ n'appartient donc pas à $D(\bar q)$.`,
      },
      {
        conclusion: 'x-fermable',
        verdict: 'incorrect',
        concept: 'friedrichs-fermable',
        message: t`La fermabilité se démontre : pour la forme de $S$, elle vient de la symétrie de l'opérateur, ou ici de l'injection $H^1\hookrightarrow L^2$.`,
        counterexample: t`$q(u,v)=u(0)v(0)$ sur $C([0,1])\subset L^2(]0,1[)$ : $u_n(x)=\max(1-nx,0)\to 0$ dans $L^2$, $(u_n)$ est de Cauchy pour $\|\cdot\|_q$, et $\|u_n\|_q^2\to 1$.`,
      },
      {
        conclusion: 'dom',
        by: 'j-dense-L2',
        verdict: 'incorrect',
        concept: 'fermeture-espace',
        message: t`La densité dans $L^2$ ne dit rien de la fermeture pour la norme de forme, qui contrôle aussi la dérivée.`,
        counterexample: t`$\mathbb 1_{]0,1/2[}\in L^2(]0,1[)$ n'appartient pas à $H^1(]0,1[)$.`,
      },
      {
        conclusion: 'dom',
        by: 'j-graphe',
        verdict: 'incorrect',
        concept: 'friedrichs-fermable',
        message: t`Fermer le graphe de $S$ donne un opérateur de domaine $H^2_0(]0,1[)$ ($u$ et $u'$ nuls au bord) : ce n'est pas le domaine de forme.`,
        counterexample: t`$x(1-x)\in H^1_0(]0,1[)$, mais sa dérivée vaut $1$ en $0$ : elle n'est pas dans $H^2_0(]0,1[)$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'fermable',
        label: 'Ne plus disposer de la fermabilité',
        necessary: true,
        explanation: 'Sans fermabilité, le complété ne se réalise pas dans H : la forme fermée, et donc l’extension, n’existent plus.',
        counterexample: t`$q(u,v)=u(0)v(0)$ sur $C([0,1])$ n'admet aucune extension fermée dans $L^2(]0,1[)$.`,
      },
      {
        hypothesis: 'ipp',
        label: 'Ne plus disposer de l’intégration par parties sans terme de bord',
        necessary: true,
        explanation: t`Sur un domaine plus grand que $C^\infty_c$, $\langle -u'',v\rangle$ n'est plus symétrique en général.`,
        counterexample: t`Sur $H^2(]0,1[)$, $u=x^2$ et $v=1$ : $\langle -u'',v\rangle=-2$ et $\langle u,-v''\rangle=0$.`,
      },
    ],
  },
  solution: t`**Forme.** Pour $u,v\in C^\infty_c(]0,1[)$, $q(u,v)=\int_0^1(-u'')v=\int_0^1u'v'$ : $q$ est symétrique, positive, et $\|u\|_q^2=\|u'\|^2+\|u\|^2=\|u\|_{H^1}^2$.

**Fermabilité.** Si $(u_n)\subset C^\infty_c$ est de Cauchy pour $\|\cdot\|_q$, elle l'est dans $H^1$, complet, et converge dans $H^1$ vers un $w$. Si de plus $u_n\to 0$ dans $L^2$, alors $w=0$, puisque la convergence dans $H^1$ entraîne celle dans $L^2$. Donc $\|u_n\|_q\to 0$.

**Fermeture.** Le domaine de $\bar q$ est l'ensemble des limites dans $H^1$ de suites de $C^\infty_c$ : c'est $H^1_0(]0,1[)$ par définition, et $\bar q(u,v)=\int_0^1u'v'$ par continuité. Cette forme est fermée et densément définie.

**Opérateur associé.** Par le théorème de représentation, $u\in D(S_F)$ si et seulement si $u\in H^1_0$ et $\int_0^1u'v'=\int_0^1gv$ pour un $g\in L^2$ et tout $v\in H^1_0$. Avec $v\in C^\infty_c$, $-u''=g$ au sens des distributions, donc $u\in H^2$. Réciproquement, pour $u\in H^2\cap H^1_0$, l'intégration par parties a un terme de bord nul. Ainsi $S_F=-\frac{d^2}{dx^2}$ sur $H^2\cap H^1_0$ : la condition de Dirichlet vient du domaine de forme.`,
  steps: [
    t`Identifier $q$ et la norme de forme sur $C^\infty_c$.`,
    t`Démontrer la fermabilité par la complétude de $H^1$ et l'injection dans $L^2$.`,
    t`Identifier le domaine de la fermeture : l'adhérence de $C^\infty_c$ dans $H^1$.`,
    t`Appliquer le théorème de représentation et identifier $D(S_F)$.`,
  ],
  commonErrors: [
    { id: 'e-H1', description: t`Croire que la fermeture de la forme a pour domaine $H^1(]0,1[)$.`, concept: 'densite-fermeture' },
    { id: 'e-graphe', description: 'Confondre la fermeture de la forme avec la fermeture du graphe de l’opérateur.', concept: 'friedrichs-fermable' },
    { id: 'e-fermable', description: 'Supposer la fermabilité sans la démontrer.', concept: 'friedrichs-fermable' },
  ],
  hints: [
    t`Que vaut $\|u\|_q$ sur $C^\infty_c$ ? Dans quel espace complet connu une suite de Cauchy pour cette norme converge-t-elle ?`,
    t`Pour la fermabilité, compare la limite dans $H^1$ et la limite dans $L^2$ d'une même suite. Le domaine de $\bar q$ est alors une adhérence que tu connais.`,
    t`Pour $D(S_F)$ : teste par $v\in C^\infty_c$ pour obtenir $-u''=g$, puis vérifie la réciproque sur $H^2\cap H^1_0$ par intégration par parties.`,
  ],
  rubric: rubric({
    hypotheses: t`La complétude de $H^1$ et la définition de $H^1_0$ sont mobilisées.`,
    methode: 'Fermabilité, fermeture, représentation, identification du domaine.',
    validite: 'La fermeture est prise pour la norme de forme, non pour celle de L² ni pour celle du graphe.',
    justifications: 'La fermabilité est démontrée.',
    conclusion: t`$D(\bar q)=H^1_0$ et $S_F=-\frac{d^2}{dx^2}$ sur $H^2\cap H^1_0$.`,
  }),
  variant: {
    statement: t`Dans $H=L^2(]0,1[)$, soit $S=-\frac{d^2}{dx^2}+2$ de domaine $C^\infty_c(]0,1[)$, minoré par $2I$. Décrire la fermeture de sa forme et son extension de Friedrichs, puis calculer $\bar q(u,u)$ pour $u(x)=x(1-x)$.`,
    solution: t`$q(u,v)=\int_0^1(u'v'+2uv)$ sur $C^\infty_c$, et $\|u\|_q^2=\|u'\|^2+3\|u\|^2$ est équivalente à $\|u\|_{H^1}^2$. La fermeture a pour domaine $H^1_0(]0,1[)$, et $S_F=-\frac{d^2}{dx^2}+2$ sur $H^2\cap H^1_0$, minoré par $2I$. Pour $u(x)=x(1-x)$ : $\bar q(u,u)=\frac13+\frac2{30}=\frac25$.`,
    closedChecks: [{ kind: 'rational', prompt: t`Valeur de $\bar q(u,u)$ pour $u(x)=x(1-x)$`, expected: '2/5' }],
  },
  verification: { ...COMPLEMENT, notes: 'Le polycopié donne l’idée de preuve (p. PDF 26) ; la fermeture explicite est rédigée pour ProofLab.' },
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'friedrichs.difficile',
  theoremId: 'friedrichs',
  level: 'difficile',
  title: 'Réalisations de Dirichlet et de Neumann',
  statement: t`Dans $H=L^2(]0,1[)$, soit $S=-\frac{d^2}{dx^2}$ sur $C^\infty_c(]0,1[)$, et soient $a_D$ et $a_N$ la forme $\int_0^1u'v'$ sur $H^1_0(]0,1[)$ et sur $H^1(]0,1[)$ respectivement. Identifier les opérateurs associés $A_D$ et $A_N$, montrer que ce sont deux extensions auto-adjointes positives distinctes de $S$, dont seule $A_D$ est l'extension de Friedrichs, et expliquer pourquoi l'expression différentielle seule ne fixe pas le domaine.`,
  source: poly(43, 'Exercice 31, difficile (p. PDF 43–44)'),
  prerequisites: [],
  concepts: ['domaine-operateur', 'friedrichs-extension', 'symetrie-autoadjonction', 'hypotheses-theoreme'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-formes', kind: 'hypothese', text: t`$a_D$ (sur $H^1_0$) et $a_N$ (sur $H^1$) sont symétriques, positives, fermées et densément définies sur $H=L^2(]0,1[)$.` },
      { id: 'h-bord', kind: 'hypothese', text: t`$H^1(]0,1[)\subset C([0,1])$, et pour tous $\alpha,\beta\in\mathbb R$, $v(x)=\alpha(1-x)+\beta x$ est un élément de $H^1$ tel que $v(0)=\alpha$, $v(1)=\beta$.` },
      { id: 'd-S', kind: 'definition', text: t`$Su=-u''$ sur $D(S)=C^\infty_c(]0,1[)$.` },
      { id: 'rep-D', kind: 'application-theoreme', text: t`$A_D$ est auto-adjoint positif, $u\in D(A_D)$ si et seulement si $u\in H^1_0$ et $\int_0^1u'v'=\int_0^1gv$ pour un $g\in L^2$ et tout $v\in H^1_0$.` },
      { id: 'rep-N', kind: 'application-theoreme', text: t`$A_N$ est auto-adjoint positif, $u\in D(A_N)$ si et seulement si $u\in H^1$ et $\int_0^1u'v'=\int_0^1gv$ pour un $g\in L^2$ et tout $v\in H^1$.` },
      { id: 'id-D', kind: 'egalite', text: t`$D(A_D)=H^2\cap H^1_0$ et $A_Du=-u''$.` },
      { id: 'reg-N', kind: 'consequence', text: t`Si $u\in D(A_N)$ : $u\in H^2$, $A_Nu=-u''$, et $u'(1)v(1)-u'(0)v(0)=0$ pour tout $v\in H^1$.` },
      { id: 'neu', kind: 'egalite', text: t`Si $u\in D(A_N)$ : $u'(0)=u'(1)=0$.` },
      { id: 'id-N', kind: 'egalite', text: t`$D(A_N)=\{u\in H^2 : u'(0)=u'(1)=0\}$ et $A_Nu=-u''$.` },
      { id: 'ext', kind: 'consequence', text: t`$S\subset A_D$ et $S\subset A_N$.` },
      {
        id: 'one',
        kind: 'egalite',
        text: t`$1\in D(A_N)$ et $A_N1=0$ : $0$ est valeur propre de $A_N$.`,
        masked: t`Valeur propre de $A_N$ associée à la fonction $1$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur propre de $A_N$ pour la fonction constante $1$`, expected: '0' },
      },
      { id: 'ker-D', kind: 'consequence', text: t`$\mathrm{Ker}\,A_D=\{0\}$.` },
      { id: 'diff', kind: 'consequence', text: t`$A_D\neq A_N$.` },
      { id: 'fried', kind: 'application-theoreme', text: t`$A_D$ est l'extension de Friedrichs de $S$ ; $A_N$ ne l'est pas.` },
      { id: 'fin', kind: 'conclusion', text: t`$A_D$ et $A_N$ sont deux extensions auto-adjointes positives distinctes de $S$, de même expression $-\frac{d^2}{dx^2}$ : le domaine, fixé ici par le domaine de forme, fait partie de l'opérateur.` },
      { id: 'x-same', kind: 'consequence', distractor: true, after: ['ext'], text: t`Deux extensions auto-adjointes de $S$ données par la même expression différentielle coïncident.` },
      { id: 'x-N-fried', kind: 'consequence', distractor: true, after: ['ext'], text: t`$A_N$ est l'extension de Friedrichs de $S$.` },
      { id: 'x-neu-forme', kind: 'consequence', distractor: true, after: ['id-N'], text: t`La condition $u'(0)=u'(1)=0$ est imposée à tous les éléments du domaine de forme $H^1(]0,1[)$.` },
    ],
    justifications: [
      { id: 'j-rep', label: 'Théorème de représentation des formes fermées.', theorem: 'formes-fermees' },
      { id: 'j-id-D', label: t`Tester par $v\in C^\infty_c$ : $-u''=g$, donc $u\in H^2$ ; réciproquement, pour $u\in H^2\cap H^1_0$, le terme de bord $[u'v]_0^1$ est nul car $v\in H^1_0$.` },
      { id: 'j-reg-N', label: t`Tester par $v\in C^\infty_c$ : $-u''=g$ et $u\in H^2$ ; puis intégrer par parties avec $v\in H^1$ : il reste $[u'v]_0^1=0$.` },
      { id: 'j-bord', label: t`Prendre $v(x)=1-x$, puis $v(x)=x$.` },
      { id: 'j-id-N', label: t`Réciproquement, pour $u\in H^2$ avec $u'(0)=u'(1)=0$, $\int_0^1u'v'=\int_0^1(-u'')v$ pour tout $v\in H^1$.` },
      { id: 'j-ext', label: t`$C^\infty_c$ est contenu dans les deux domaines, et les trois opérateurs agissent par $-u''$.` },
      { id: 'j-one', label: t`$1\in H^2$, $1'=0$ en $0$ et en $1$, et $-1''=0$.` },
      { id: 'j-ker', label: t`$A_Du=0$ donne $a_D(u,u)=\langle A_Du,u\rangle=0$, donc $u'=0$ : $u$ est constante et nulle en $0$.` },
      { id: 'j-diff', label: t`$0$ est valeur propre de $A_N$ et non de $A_D$.` },
      { id: 'j-fried', label: t`L'extension de Friedrichs est associée à la fermeture de la forme de $S$, de domaine l'adhérence de $C^\infty_c$ dans $H^1$, soit $H^1_0$ : c'est $a_D$. Or $D(a_N)=H^1\neq H^1_0$.`, theorem: 'friedrichs' },
      { id: 'j-syn', label: 'Réunion des résultats établis.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-test-H10', label: t`Tester seulement par $v\in H^1_0$ suffit à déterminer les conditions au bord.` },
      { id: 'j-expr', label: 'L’expression différentielle détermine l’opérateur.' },
    ],
    rules: [
      { from: ['h-formes'], to: 'rep-D', by: 'j-rep' },
      { from: ['h-formes'], to: 'rep-N', by: 'j-rep' },
      { from: ['rep-D'], to: 'id-D', by: 'j-id-D' },
      { from: ['rep-N'], to: 'reg-N', by: 'j-reg-N' },
      { from: ['reg-N', 'h-bord'], to: 'neu', by: 'j-bord' },
      { from: ['neu', 'reg-N', 'rep-N'], to: 'id-N', by: 'j-id-N' },
      { from: ['id-D', 'id-N', 'd-S'], to: 'ext', by: 'j-ext' },
      { from: ['id-N'], to: 'one', by: 'j-one' },
      { from: ['id-D', 'h-formes'], to: 'ker-D', by: 'j-ker' },
      { from: ['one', 'ker-D'], to: 'diff', by: 'j-diff' },
      { from: ['d-S', 'rep-D', 'h-formes'], to: 'fried', by: 'j-fried' },
      { from: ['rep-D', 'rep-N', 'ext', 'diff', 'fried'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-same',
        verdict: 'incorrect',
        concept: 'domaine-operateur',
        message: 'La formule ne détermine pas l’opérateur : deux domaines différents donnent ici deux extensions auto-adjointes différentes.',
        counterexample: t`$1\in D(A_N)$ avec $A_N1=0$, tandis que $1\notin D(A_D)$ et que $0$ n'est pas valeur propre de $A_D$.`,
      },
      {
        conclusion: 'x-N-fried',
        verdict: 'incorrect',
        concept: 'friedrichs-extension',
        message: t`Le domaine de forme de l'extension de Friedrichs est l'adhérence de $D(S)$ pour la norme de forme, ici $H^1_0$, et non $H^1$.`,
        counterexample: t`$1\in D(a_N)=H^1$, mais $1\notin H^1_0=D(\bar q)$ : sa valeur en $0$ ne s'annule pas.`,
      },
      {
        conclusion: 'x-neu-forme',
        verdict: 'incorrect',
        concept: 'domaine-operateur',
        message: t`La condition de Neumann est naturelle : elle n'apparaît que dans $D(A_N)$, pas dans le domaine de forme.`,
        counterexample: t`$u(x)=x$ appartient à $H^1(]0,1[)$ et $u'(0)=1$.`,
      },
      {
        conclusion: 'neu',
        by: 'j-test-H10',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Avec $v\in H^1_0$, le terme de bord $[u'v]_0^1$ est toujours nul : aucune condition sur $u'(0)$ ni $u'(1)$ n'en résulte.`,
        counterexample: t`$u(x)=x$ vérifie $\int_0^1u'v'=0=\int_0^1(-u'')v$ pour tout $v\in H^1_0$, et $u'(0)=1$.`,
      },
      {
        conclusion: 'diff',
        by: 'j-expr',
        verdict: 'incorrect',
        concept: 'domaine-operateur',
        message: 'Cette justification conduirait à identifier les deux opérateurs : c’est précisément le domaine qui les distingue.',
      },
    ],
    removable: [
      {
        hypothesis: 'h-bord',
        label: 'Ne plus disposer de fonctions test non nulles au bord',
        necessary: true,
        explanation: 'Les conditions de Neumann s’obtiennent en testant par des fonctions qui ne s’annulent pas au bord.',
        counterexample: t`Avec les seules fonctions test de $H^1_0$, $u(x)=x$ vérifierait l'identité de forme sans satisfaire $u'(0)=0$.`,
      },
      {
        hypothesis: 'h-formes',
        label: 'Retirer la fermeture des formes',
        necessary: true,
        explanation: 'Le théorème de représentation exige des formes fermées.',
        counterexample: t`Sur $C^\infty_c(]0,1[)$, la forme $\int_0^1u'v'$ n'est pas fermée : il faut d'abord la fermer.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Plus petite valeur propre de $A_D$, divisée par $\pi^2$`, expected: '1' }],
  solution: t`**Dirichlet.** Par représentation, $u\in D(A_D)$ si et seulement si $u\in H^1_0$ et $\int_0^1u'v'=\int_0^1gv$ pour tout $v\in H^1_0$. Avec $v\in C^\infty_c$, $-u''=g$, donc $u\in H^2$ ; réciproquement, $H^2\cap H^1_0\subset D(A_D)$. Ainsi $D(A_D)=H^2\cap H^1_0$.

**Neumann.** Si $u\in D(A_N)$, le même test donne $u\in H^2$ et $A_Nu=-u''$. L'intégration par parties avec $v\in H^1$ laisse $u'(1)v(1)-u'(0)v(0)=0$ ; $v=1-x$ puis $v=x$ donnent $u'(0)=u'(1)=0$. Réciproquement, ces conditions suffisent. Ainsi $D(A_N)=\{u\in H^2 : u'(0)=u'(1)=0\}$.

**Deux extensions distinctes.** $C^\infty_c$ est contenu dans les deux domaines, et les deux opérateurs agissent par $-u''$ : $S\subset A_D$, $S\subset A_N$. Les deux sont auto-adjoints positifs. Mais $A_N1=0$, tandis que $A_Du=0$ entraîne $\int|u'|^2=0$, donc $u$ constante nulle en $0$ : $0$ est valeur propre de $A_N$, non de $A_D$ (dont la plus petite valeur propre est $\pi^2$, pour $\sin(\pi x)$).

**Friedrichs.** La fermeture de la forme de $S$ a pour domaine l'adhérence de $C^\infty_c$ dans $H^1$, soit $H^1_0$ : l'extension de Friedrichs est $A_D$. La condition de Dirichlet est essentielle (elle figure dans le domaine de forme), celle de Neumann est naturelle (elle n'apparaît que dans le domaine de l'opérateur).

**Conclusion.** La même expression $-\frac{d^2}{dx^2}$ porte deux opérateurs auto-adjoints différents : le domaine fait partie de la donnée.`,
  steps: [
    t`Écrire les domaines fournis par le théorème de représentation.`,
    t`Identifier $D(A_D)$ et $D(A_N)$ par test contre $C^\infty_c$, puis par intégration par parties.`,
    t`Extraire les conditions de Neumann avec des fonctions test non nulles au bord.`,
    t`Comparer les noyaux et identifier l'extension de Friedrichs.`,
  ],
  commonErrors: [
    { id: 'e-expr', description: 'Penser que l’expression différentielle détermine l’opérateur.', concept: 'domaine-operateur' },
    { id: 'e-neu', description: 'Placer la condition de Neumann dans le domaine de forme.', concept: 'domaine-operateur' },
    { id: 'e-fried', description: t`Prendre $A_N$ pour l'extension de Friedrichs.`, concept: 'friedrichs-extension' },
  ],
  hints: [
    t`Le théorème de représentation décrit chaque domaine d'opérateur à partir du domaine de forme. Quelles fonctions test chaque forme autorise-t-elle ?`,
    t`Teste d'abord par $C^\infty_c$ pour obtenir $-u''=g$, puis intègre par parties avec les fonctions test du domaine de forme et regarde ce qui reste au bord.`,
    t`Avec $v=1-x$ et $v=x$, le terme de bord donne $u'(0)=0$ et $u'(1)=0$. Pour distinguer les deux opérateurs, regarde la fonction constante $1$.`,
  ],
  rubric: rubric({
    hypotheses: 'Les deux formes sont reconnues fermées, avec leur domaine propre.',
    methode: 'Représentation, test par C∞c, intégration par parties, conditions au bord.',
    validite: 'Les conditions de Neumann sont obtenues avec des fonctions test non nulles au bord.',
    justifications: 'L’extension de Friedrichs est identifiée par le domaine de forme.',
    conclusion: 'Les deux réalisations sont distinctes, et le rôle du domaine est explicité.',
  }),
  variant: {
    statement: t`Dans $H=L^2(]0,1[)$, soit $a_M$ la forme $\int_0^1u'v'$ sur $\{u\in H^1(]0,1[) : u(0)=0\}$. Identifier l'opérateur associé $A_M$ et comparer avec $A_D$ et $A_N$.`,
    solution: t`$\{u\in H^1 : u(0)=0\}$ est fermé dans $H^1$ (l'évaluation en $0$ est continue), donc $a_M$ est fermée, densément définie. Le test par $C^\infty_c$ donne $u\in H^2$ et $A_Mu=-u''$ ; il reste $u'(1)v(1)=0$ pour tout $v$ du domaine, et $v=x$ donne $u'(1)=0$. Ainsi $D(A_M)=\{u\in H^2 : u(0)=0,\ u'(1)=0\}$ : condition essentielle en $0$, naturelle en $1$. C'est une troisième extension auto-adjointe positive de $S$, distincte de $A_D$ et de $A_N$ ($x\in D(a_M)$ n'est pas dans $H^1_0$).`,
  },
  verification: { ...COMPLEMENT, notes: 'L’exercice figure au polycopié sans corrigé ; identification des domaines rédigée pour ProofLab.' },
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT31: TheoremModule = {
  theorem: {
    id: 'friedrichs',
    spaces: [
      t`$H$ : espace de Hilbert, de produit scalaire $\langle\cdot,\cdot\rangle_H$.`,
      t`$S:D(S)\subset H\to H$ : opérateur linéaire densément défini.`,
      t`$m\in\mathbb R$ : borne inférieure ; « $S\ge mI$ » signifie $\langle Su,u\rangle_H\ge m\|u\|_H^2$ pour $u\in D(S)$.`,
    ],
    hypotheses: [
      { id: 'h-sym', text: t`$S$ est symétrique et densément défini : $\langle Su,v\rangle_H=\langle u,Sv\rangle_H$ pour $u,v\in D(S)$.` },
      {
        id: 'h-minore',
        text: t`$S$ est minoré : $\langle Su,u\rangle_H\ge m\|u\|_H^2$ pour tout $u\in D(S)$.`,
        whenRemoved: t`Dans $L^2(]0,+\infty[)$ complexe, $S=i\frac{d}{dx}$ sur $C^\infty_c(]0,+\infty[)$ est symétrique, non minoré ; $S^*u=\pm iu$ a pour solutions $e^{x}$ et $e^{-x}$, dont une seule est de carré intégrable : les indices de défaut diffèrent et $S$ n'a aucune extension auto-adjointe.`,
      },
    ],
    statement: t`Tout opérateur symétrique densément défini $S$ minoré par $mI$ admet une extension auto-adjointe $S_F$ également minorée par $mI$, dite extension de Friedrichs.`,
    conclusions: {
      existence: t`$S_F=A+mI$, où $A$ est l'opérateur associé à la fermeture de la forme $q(u,v)=\langle(S-m)u,v\rangle_H$ sur $D(S)$.`,
      autre: t`Le domaine de forme de $S_F$ est le complété de $D(S)$ pour $\|u\|_q^2=q(u,u)+\|u\|_H^2$ ; pour $-\frac{d^2}{dx^2}$ sur $C^\infty_c(]0,1[)$, c'est $H^1_0$, et $S_F$ est la réalisation de Dirichlet.`,
    },
    sourceProof: 'idee',
    proofOutline: [
      t`Poser $B=S-mI\ge 0$, $q(u,v)=\langle Bu,v\rangle_H$ sur $D(S)$ : forme symétrique positive, $\|u\|_q^2=q(u,u)+\|u\|_H^2\ge\|u\|_H^2$.`,
      t`Fermabilité : soit $(u_n)$ de Cauchy pour $\|\cdot\|_q$ avec $u_n\to 0$ dans $H$. Pour $p$ fixé, $(u_n,u_p)_q=\langle u_n,(B+I)u_p\rangle_H\to 0$ quand $n\to\infty$, par symétrie de $B$. Alors $\|u_n\|_q^2=(u_n,u_n-u_p)_q+(u_n,u_p)_q\le\varepsilon\sup_k\|u_k\|_q+(u_n,u_p)_q$ dès que $n,p\ge N_\varepsilon$, d'où $\limsup_n\|u_n\|_q^2\le\varepsilon\sup_k\|u_k\|_q$ pour tout $\varepsilon>0$.`,
      t`Fermeture : l'injection $D(S)\to H$ se prolonge au complété en une application injective (par fermabilité) ; on identifie ce complété à $D(\bar q)\subset H$. La forme $\bar q$ est symétrique, positive, fermée, densément définie.`,
      t`Représentation : soit $A$ l'opérateur associé à $\bar q$. Pour $u\in D(S)$ et $v\in D(\bar q)$, limite de $v_n\in D(S)$ pour $\|\cdot\|_q$, $\bar q(u,v)=\lim\langle Bu,v_n\rangle_H=\langle Bu,v\rangle_H$ : donc $u\in D(A)$ et $Au=Bu$.`,
      t`Conclusion : $S_F=A+mI$ est auto-adjoint, prolonge $S$, et $\langle S_Fu,u\rangle_H=\bar q(u,u)+m\|u\|_H^2\ge m\|u\|_H^2$.`,
    ],
    warnings: [
      'Une forme symétrique positive densément définie n’est pas toujours fermable : la fermabilité vient ici de l’opérateur symétrique.',
      'Fermer la forme n’est pas fermer le graphe : les domaines obtenus diffèrent.',
      t`Un même opérateur symétrique peut avoir plusieurs extensions auto-adjointes ($-\frac{d^2}{dx^2}$ : Dirichlet, Neumann, conditions mixtes) ; Friedrichs en choisit une.`,
      t`$S\subset B$ entraîne $B^*\subset S^*$ : le passage à l'adjoint renverse les inclusions.`,
    ],
    usefulFor: 'Distinguer les réalisations possibles d’un même opérateur différentiel et choisir une extension auto-adjointe canonique, dont le domaine encode une condition au bord déterminée par la fermeture de forme.',
    verification: {
      origin: 'complement',
      review: 'machine',
      notes: 'Le polycopié ne donne que l’idée de preuve (p. PDF 26) ; démonstration complète rédigée pour ProofLab.',
    },
  },
  definitions: [
    {
      id: 'extension-operateur',
      term: 'Extension d’un opérateur',
      statement: t`$B$ est une extension de $S$, noté $S\subset B$, si $D(S)\subset D(B)$ et $Bu=Su$ pour tout $u\in D(S)$.`,
      source: poly(26, 'Section 6.7'),
    },
    {
      id: 'forme-fermable',
      term: 'Forme fermable',
      statement: t`Une forme symétrique positive $q$ sur $D(q)\subset H$ est fermable si toute suite $(u_n)\subset D(q)$, de Cauchy pour $\|\cdot\|_q$ et tendant vers $0$ dans $H$, vérifie $\|u_n\|_q\to 0$ ; sa fermeture est alors définie sur le complété de $D(q)$, réalisé dans $H$.`,
      source: poly(26, 'Idée de preuve de la section 6.7'),
    },
  ],
  concepts: [
    {
      id: 'friedrichs-extension',
      label: 'Extension et adjoint',
      reminder: t`$S\subset B$ signifie $D(S)\subset D(B)$ et $B=S$ sur $D(S)$ ; alors $B^*\subset S^*$. Une extension d'un opérateur symétrique n'est pas symétrique en général.`,
    },
    {
      id: 'friedrichs-fermable',
      label: 'Fermabilité d’une forme',
      reminder: 'La fermabilité d’une forme se démontre ; la fermeture de la forme diffère de la fermeture du graphe de l’opérateur.',
    },
  ],
  counterexamples: [
    {
      id: 'ce-friedrichs-non-fermable',
      theoremId: 'friedrichs',
      title: 'Forme non fermable',
      claim: 'Toute forme symétrique positive densément définie est fermable.',
      correctStatement: 'La forme d’un opérateur symétrique minoré est fermable ; une forme quelconque peut ne pas l’être.',
      task: t`Sur $C([0,1])\subset L^2(]0,1[)$, soit $q(u,v)=u(0)v(0)$ et $u_n(x)=\max(1-nx,0)$. Calcule $\lim_n\|u_n\|_q^2$, où $\|u\|_q^2=q(u,u)+\|u\|_{L^2}^2$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\lim_n\|u_n\|_q^2$`, expected: '1' },
      explanation: t`$\|u_n\|_{L^2}^2=\frac1{3n}\to 0$ et $(u_n-u_p)(0)=0$, donc $(u_n)$ est de Cauchy pour $\|\cdot\|_q$ et tend vers $0$ dans $L^2$. Pourtant $\|u_n\|_q^2=1+\frac1{3n}\to 1\neq 0$ : $q$ n'est pas fermable.`,
      concept: 'friedrichs-fermable',
      source: poly(26, 'Idée de preuve de la section 6.7 (étape de fermabilité)'),
    },
    {
      id: 'ce-friedrichs-domaine',
      theoremId: 'friedrichs',
      title: 'Même expression, opérateurs différents',
      claim: t`Deux extensions auto-adjointes de $-\frac{d^2}{dx^2}$ sur $C^\infty_c(]0,1[)$ coïncident.`,
      correctStatement: 'Plusieurs extensions auto-adjointes existent ; l’extension de Friedrichs est l’une d’elles, la réalisation de Dirichlet.',
      task: t`Pour la réalisation de Neumann $A_N$, de domaine $\{u\in H^2 : u'(0)=u'(1)=0\}$, donne la plus petite valeur propre.`,
      check: { kind: 'rational', prompt: t`Plus petite valeur propre de $A_N$`, expected: '0' },
      explanation: t`$A_N1=0$ et $A_N\ge 0$ : la plus petite valeur propre est $0$. Pour la réalisation de Dirichlet, $A_Du=0$ entraîne $u=0$, et la plus petite valeur propre est $\pi^2$. Les deux opérateurs diffèrent.`,
      concept: 'domaine-operateur',
      source: poly(26, 'Section 6.7 ; exercice 31, difficile (p. PDF 43–44)'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT31;
