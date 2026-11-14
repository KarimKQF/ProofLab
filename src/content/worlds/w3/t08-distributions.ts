/**
 * Résultat 8 — Dérivation distributionnelle.
 * Polycopié : section 3.1 (p. PDF 11), espaces de Sobolev en section 3.2 (p. PDF 11) ;
 * exercices 8 (p. PDF 39).
 */
import { t, rubric, poly, FROM_POLY, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'distributions.facile',
  theoremId: 'distributions',
  level: 'facile',
  title: 'Dérivée distributionnelle de la fonction de Heaviside',
  statement: t`Soit $H=\mathbb 1_{]0,+\infty[}$ la fonction de Heaviside sur $\mathbb R$. Montrer que $H\in L^1_{\mathrm{loc}}(\mathbb R)$, puis calculer sa dérivée distributionnelle $H'$ dans $\mathcal D'(\mathbb R)$.`,
  source: poly(11, 'Exemple fondamental, section 3.1 ; exercice 8, facile (p. PDF 39)'),
  prerequisites: [],
  concepts: ['distributions-signe', 'distributions-derivee-pp', 'distributions-dirac', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'd-H', kind: 'definition', text: t`$H=\mathbb 1_{]0,+\infty[}$ sur $\mathbb R$.` },
      { id: 'd-phi', kind: 'definition', local: true, text: t`Soit $\varphi\in\mathcal D(\mathbb R)$ et $R>0$ tel que $\operatorname{supp}\varphi\subset\,]-R,R[$.` },
      { id: 'd-delta', kind: 'definition', text: t`$\delta_0$ est la distribution de Dirac en $0$ : $\langle\delta_0,\psi\rangle=\psi(0)$ pour $\psi\in\mathcal D(\mathbb R)$.` },

      { id: 'loc', kind: 'consequence', text: t`$H\in L^1_{\mathrm{loc}}(\mathbb R)$ : $H$ définit une distribution régulière.` },
      { id: 'def', kind: 'egalite', text: t`$\langle H',\varphi\rangle=-\langle H,\varphi'\rangle=-\int_{\mathbb R}H(x)\,\varphi'(x)\,dx$.` },
      { id: 'restr', kind: 'egalite', text: t`$\int_{\mathbb R}H(x)\,\varphi'(x)\,dx=\int_0^R\varphi'(x)\,dx$.` },
      { id: 'ftc', kind: 'egalite', text: t`$\int_0^R\varphi'(x)\,dx=\varphi(R)-\varphi(0)$.` },
      { id: 'bord', kind: 'egalite', text: t`$\varphi(R)=0$.` },
      {
        id: 'val',
        kind: 'egalite',
        text: t`$\langle H',\varphi\rangle=\varphi(0)$.`,
        masked: t`Valeur de $\langle H',\varphi\rangle$ en fonction de $\varphi(0)$ : à calculer.`,
        check: { kind: 'expr-equiv', prompt: t`Exprime $\langle H',\varphi\rangle$ en fonction de $p=\varphi(0)$.`, expected: 'p', vars: ['p'] },
      },
      { id: 'fin', kind: 'conclusion', text: t`$H'=\delta_0$ dans $\mathcal D'(\mathbb R)$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-signe', kind: 'egalite', distractor: true, after: ['def'], text: t`$\langle H',\varphi\rangle=-\varphi(0)$.` },
      { id: 'x-nul', kind: 'consequence', distractor: true, text: t`$H'=0$ dans $\mathcal D'(\mathbb R)$, puisque $H$ est constante sur $]-\infty,0[$ et sur $]0,+\infty[$.` },
      { id: 'x-fonction', kind: 'consequence', distractor: true, after: ['val'], text: t`Il existe $g\in L^1_{\mathrm{loc}}(\mathbb R)$ telle que $H'=T_g$.` },
    ],
    justifications: [
      { id: 'j-borne', label: t`$H$ est mesurable et bornée par $1$ : elle est intégrable sur tout compact.` },
      { id: 'j-def', label: t`Définition de la dérivée distributionnelle (facteur $(-1)^{|\alpha|}$, ici $|\alpha|=1$), puis formule de la distribution régulière.` },
      { id: 'j-restr', label: t`$H=0$ sur $]-\infty,0]$, $H=1$ sur $]0,+\infty[$, et $\varphi'$ est nulle hors de $]-R,R[$.` },
      { id: 'j-ftc', label: 'Théorème fondamental du calcul intégral.', theorem: 'theoreme-fondamental' },
      { id: 'j-support', label: t`$\varphi$ est nulle hors de son support, contenu dans $]-R,R[$.` },
      { id: 'j-report', label: 'Report des égalités précédentes.' },
      { id: 'j-egalite', label: 'Deux distributions sont égales lorsqu’elles coïncident sur toute fonction test.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-pp', label: t`$H$ est dérivable sur $\mathbb R^*$, de dérivée nulle : sa dérivée distributionnelle est donc nulle.` },
      { id: 'j-sans-signe', label: t`Définition de la dérivée distributionnelle : $\langle T',\varphi\rangle=\langle T,\varphi'\rangle$.` },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['d-H'], to: 'loc', by: 'j-borne' },
      { from: ['loc', 'd-phi'], to: 'def', by: 'j-def' },
      { from: ['d-H', 'd-phi'], to: 'restr', by: 'j-restr' },
      { from: ['d-phi'], to: 'ftc', by: 'j-ftc' },
      { from: ['d-phi'], to: 'bord', by: 'j-support' },
      { from: ['def', 'restr', 'ftc', 'bord'], to: 'val', by: 'j-report' },
      { from: ['val', 'd-delta'], to: 'fin', by: 'j-egalite' },
    ],
    traps: [
      {
        conclusion: 'x-signe',
        verdict: 'incorrect',
        concept: 'distributions-signe',
        message: t`Le facteur $(-1)^{|\alpha|}$ fait partie de la définition : il vaut ici $-1$, et l'intégration par parties le compense.`,
        counterexample: t`Pour $u(x)=x$ : $\langle u',\varphi\rangle=\int\varphi$, alors que $\langle u,\varphi'\rangle=\int x\varphi'=-\int\varphi$. Sans le signe, on trouverait $u'=-1$.`,
      },
      {
        conclusion: 'x-nul',
        verdict: 'incorrect',
        concept: 'distributions-derivee-pp',
        message: t`$H'$ ne se réduit pas à la dérivée presque partout : celle-ci est nulle sur $\mathbb R^*$ et ne dit rien près de $0$, où la fonction test « voit » le saut.`,
        counterexample: t`Si $\varphi(0)=1$, alors $\langle H',\varphi\rangle=\varphi(0)=1\neq 0$.`,
      },
      {
        conclusion: 'x-fonction',
        verdict: 'incorrect',
        concept: 'distributions-dirac',
        message: t`La distribution de Dirac n'est pas une distribution régulière : aucune fonction de $L^1_{\mathrm{loc}}$ ne la représente.`,
        counterexample: t`Si $\delta_0=T_g$, soit $\chi\in\mathcal D(\mathbb R)$ avec $\chi(0)=1$, $0\le\chi\le 1$, $\operatorname{supp}\chi\subset[-1,1]$, et $\varphi_n(x)=\chi(nx)$ : alors $1=\varphi_n(0)=\int g\varphi_n$, tandis que $\left|\int g\varphi_n\right|\le\int_{-1/n}^{1/n}|g|\to 0$.`,
      },
      {
        conclusion: 'def',
        by: 'j-sans-signe',
        verdict: 'incorrect',
        concept: 'distributions-signe',
        message: t`La définition comporte le facteur $(-1)^{|\alpha|}$, ici égal à $-1$ : c'est ce signe qui rend la formule cohérente avec l'intégration par parties.`,
        counterexample: t`Pour $u(x)=x$, la formule sans signe donne $\langle u',\varphi\rangle=\int x\varphi'=-\int\varphi$, soit $u'=-1$, au lieu de la dérivée classique $u'=1$.`,
      },
      {
        conclusion: 'loc',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`Pourquoi $H$ est-elle intégrable sur tout compact ? Une fonction n'est pas toujours localement intégrable.`,
      },
      {
        conclusion: 'fin',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: 'L’identification se démontre : compare les valeurs des deux distributions sur toute fonction test.',
      },
    ],
    removable: [
      {
        hypothesis: 'bord',
        label: t`Ne plus disposer de $\varphi(R)=0$`,
        necessary: true,
        explanation: t`La fonction test est à support compact : c'est ce qui annule le terme en $R$. Sans cela, la formule $\langle H',\varphi\rangle=\varphi(0)$ n'est plus établie.`,
        counterexample: t`Pour $\varphi(x)=1$, de dérivée nulle mais non à support compact, $-\int_0^R\varphi'(x)\,dx=0$ pour tout $R$, alors que $\varphi(0)=1$.`,
      },
      {
        hypothesis: 'loc',
        label: t`Ne plus disposer de $H\in L^1_{\mathrm{loc}}(\mathbb R)$`,
        necessary: true,
        explanation: t`Sans intégrabilité locale, la formule $\int_{\mathbb R}u\varphi$ ne définit pas une distribution régulière.`,
        counterexample: t`$x\mapsto 1/|x|$ n'est pas intégrable au voisinage de $0$ : pour une fonction test $\varphi$ telle que $\varphi(0)\ne 0$, l'intégrale $\int\frac{\varphi(x)}{|x|}\,dx$ diverge.`,
      },
    ],
  },
  closedChecks: [
    { kind: 'rational', prompt: t`Pour $\varphi\in\mathcal D(\mathbb R)$ telle que $\varphi(0)=3$, valeur de $\langle H',\varphi\rangle$`, expected: '3' },
  ],
  solution: t`**Intégrabilité locale.** $H$ est mesurable et $|H|\le 1$, donc $H$ est intégrable sur tout compact : $H\in L^1_{\mathrm{loc}}(\mathbb R)$, et $H$ définit une distribution régulière.

**Calcul.** Soit $\varphi\in\mathcal D(\mathbb R)$ et $R>0$ tel que $\operatorname{supp}\varphi\subset\,]-R,R[$. Par définition de la dérivée distributionnelle (facteur $-1$ pour $|\alpha|=1$),
$$\langle H',\varphi\rangle=-\int_{\mathbb R}H(x)\varphi'(x)\,dx=-\int_0^R\varphi'(x)\,dx=-\big(\varphi(R)-\varphi(0)\big)=\varphi(0),$$
la dernière égalité venant de $\varphi(R)=0$.

**Conclusion.** $\langle H',\varphi\rangle=\varphi(0)=\langle\delta_0,\varphi\rangle$ pour toute fonction test, donc $H'=\delta_0$ dans $\mathcal D'(\mathbb R)$, où $\delta_0$ est la distribution de Dirac en $0$.

**Point de vigilance.** $H$ est dérivable sur $\mathbb R^*$ de dérivée nulle : la dérivée presque partout est nulle, alors que la dérivée distributionnelle ne l'est pas. La distribution de Dirac n'est pas une fonction : aucun $g\in L^1_{\mathrm{loc}}(\mathbb R)$ ne vérifie $\delta_0=T_g$, comme le montre le test sur $\varphi_n(x)=\chi(nx)$ pour $\chi\in\mathcal D(\mathbb R)$ avec $\chi(0)=1$.`,
  steps: [
    t`Justifier que $H$ définit une distribution régulière.`,
    t`Écrire $\langle H',\varphi\rangle$ par définition, avec le facteur $-1$.`,
    t`Réduire l'intégrale à $[0,R]$ grâce à la valeur de $H$ et au support de $\varphi$.`,
    'Appliquer le théorème fondamental du calcul intégral.',
    'Conclure par l’égalité des distributions sur toutes les fonctions tests.',
  ],
  commonErrors: [
    { id: 'e-signe', description: t`Oublier le facteur $(-1)^{|\alpha|}$ : on trouverait $-\delta_0$.`, concept: 'distributions-signe' },
    { id: 'e-pp', description: t`Conclure $H'=0$ parce que $H$ a une dérivée nulle sur $\mathbb R^*$.`, concept: 'distributions-derivee-pp' },
    { id: 'e-fonction', description: t`Traiter $\delta_0$ comme une fonction de $L^1_{\mathrm{loc}}$ : ce n'est pas une distribution régulière.`, concept: 'distributions-dirac' },
  ],
  hints: [
    t`Une dérivée distributionnelle ne se calcule pas point par point : quel objet écrit-on en premier, pour une fonction test $\varphi$ ?`,
    t`Écris $\langle H',\varphi\rangle=-\int_{\mathbb R}H\varphi'$, puis réduis l'intégrale au domaine où $H$ ne s'annule pas.`,
    t`Il reste $-\int_0^R\varphi'(x)\,dx$. Le théorème fondamental donne $\varphi(R)-\varphi(0)$, et $\varphi(R)=0$ par le support de $\varphi$.`,
  ],
  rubric: rubric({
    hypotheses: t`L'appartenance de $H$ à $L^1_{\mathrm{loc}}(\mathbb R)$ est établie ; la fonction test est prise à support compact.`,
    methode: 'La dérivée est calculée par la formule de définition, testée sur une fonction test quelconque.',
    validite: t`Le signe $(-1)^{|\alpha|}$ est respecté, et le terme de bord en $R$ est annulé par le support.`,
    justifications: 'Le théorème fondamental et l’annulation au bord sont identifiés.',
    conclusion: t`L'égalité $H'=\delta_0$ est obtenue dans $\mathcal D'(\mathbb R)$.`,
  }),
  variant: {
    statement: t`Soient $a<b$ deux réels et $u=\mathbb 1_{]a,b[}$. Calculer $u'$ dans $\mathcal D'(\mathbb R)$.`,
    solution: t`$u$ est mesurable et bornée, donc localement intégrable. Pour $\varphi\in\mathcal D(\mathbb R)$ :
$$\langle u',\varphi\rangle=-\int_{\mathbb R}u\varphi'=-\int_a^b\varphi'(x)\,dx=-\big(\varphi(b)-\varphi(a)\big)=\varphi(a)-\varphi(b).$$
Donc $u'=\delta_a-\delta_b$, où $\delta_c$ désigne la distribution de Dirac en $c$, définie par $\langle\delta_c,\varphi\rangle=\varphi(c)$. Comme pour la fonction de Heaviside, la dérivée presque partout de $u$ est nulle, sans que $u'$ le soit.`,
    closedChecks: [
      { kind: 'rational', prompt: t`Pour $\varphi\in\mathcal D(\mathbb R)$ avec $\varphi(a)=5$ et $\varphi(b)=2$, valeur de $\langle u',\varphi\rangle$`, expected: '3' },
    ],
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'd-u', kind: 'definition', text: t`$u=\mathbb 1_{]a,b[}$ sur $\mathbb R$, avec $a<b$.` },
        { id: 'd-phi', kind: 'definition', local: true, text: t`Soit $\varphi\in\mathcal D(\mathbb R)$.` },
        { id: 'd-delta', kind: 'definition', text: t`Pour $c\in\mathbb R$ : $\langle\delta_c,\psi\rangle=\psi(c)$ pour $\psi\in\mathcal D(\mathbb R)$ (distribution de Dirac en $c$).` },

        { id: 'loc', kind: 'consequence', text: t`$u\in L^1_{\mathrm{loc}}(\mathbb R)$.` },
        { id: 'def', kind: 'egalite', text: t`$\langle u',\varphi\rangle=-\int_{\mathbb R}u\,\varphi'=-\int_a^b\varphi'(x)\,dx$.` },
        { id: 'ftc', kind: 'egalite', text: t`$\int_a^b\varphi'(x)\,dx=\varphi(b)-\varphi(a)$.` },
        { id: 'val', kind: 'egalite', text: t`$\langle u',\varphi\rangle=\varphi(a)-\varphi(b)$.` },
        { id: 'fin', kind: 'conclusion', text: t`$u'=\delta_a-\delta_b$ dans $\mathcal D'(\mathbb R)$.` },

        { id: 'x-signe', kind: 'consequence', distractor: true, text: t`$u'=\delta_b-\delta_a$ dans $\mathcal D'(\mathbb R)$.` },
        { id: 'x-nul', kind: 'consequence', distractor: true, text: t`$u'=0$ dans $\mathcal D'(\mathbb R)$, car $u$ est constante par morceaux.` },
      ],
      justifications: [
        { id: 'j-loc', label: t`$u$ est mesurable et bornée.` },
        { id: 'j-def', label: t`Définition de la dérivée distributionnelle, puis expression de $u$.` },
        { id: 'j-ftc', label: 'Théorème fondamental du calcul intégral.', theorem: 'theoreme-fondamental' },
        { id: 'j-report', label: 'Report des égalités précédentes.' },
        { id: 'j-eg', label: 'Égalité des distributions sur toutes les fonctions tests.' },
        { id: 'j-pp', label: 'La dérivée presque partout est nulle, donc la dérivée distributionnelle aussi.' },
      ],
      rules: [
        { from: ['d-u'], to: 'loc', by: 'j-loc' },
        { from: ['loc', 'd-phi'], to: 'def', by: 'j-def' },
        { from: ['d-phi'], to: 'ftc', by: 'j-ftc' },
        { from: ['def', 'ftc'], to: 'val', by: 'j-report' },
        { from: ['val', 'd-delta'], to: 'fin', by: 'j-eg' },
      ],
      traps: [
        {
          conclusion: 'x-signe',
          verdict: 'incorrect',
          concept: 'distributions-signe',
          message: t`Le signe se retrouve en écrivant $\langle u',\varphi\rangle=-\int_a^b\varphi'$ : le point $a$ reçoit le signe $+$ et le point $b$ le signe $-$.`,
          counterexample: t`Pour $\varphi$ telle que $\varphi(a)=1$ et $\varphi(b)=0$, on a $\langle u',\varphi\rangle=1$, alors que $\langle\delta_b-\delta_a,\varphi\rangle=-1$.`,
        },
        {
          conclusion: 'x-nul',
          verdict: 'incorrect',
          concept: 'distributions-derivee-pp',
          message: 'La dérivée presque partout de cette fonction est nulle, mais sa dérivée distributionnelle garde la trace des sauts aux extrémités.',
          counterexample: t`Si $\varphi(a)=1$ et $\varphi(b)=0$, alors $\langle u',\varphi\rangle=1\neq 0$.`,
        },
      ],
      removable: [
        {
          hypothesis: 'loc',
          label: 'Ne plus disposer de l’intégrabilité locale',
          necessary: true,
          explanation: t`Sans $u\in L^1_{\mathrm{loc}}(\mathbb R)$, la formule $\int u\varphi$ ne définit pas de distribution régulière.`,
          counterexample: t`$x\mapsto 1/|x-a|$ n'est pas intégrable près de $a$ : la formule $\int\frac{\varphi(x)}{|x-a|}\,dx$ diverge dès que $\varphi(a)\ne 0$.`,
        },
      ],
    },
  },
  verification: FROM_POLY,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'distributions.intermediaire',
  theoremId: 'distributions',
  level: 'intermediaire',
  title: t`Dérivée distributionnelle de $|x|$`,
  statement: t`Soit $u(x)=|x|$ sur $\mathbb R$. Montrer que $u\in L^1_{\mathrm{loc}}(\mathbb R)$ et que $u'=\operatorname{sgn}$ dans $\mathcal D'(\mathbb R)$, où $\operatorname{sgn}(x)=1$ si $x>0$ et $\operatorname{sgn}(x)=-1$ si $x<0$.`,
  source: poly(39, 'Exercice 8, intermédiaire'),
  prerequisites: [],
  concepts: ['distributions-bord-saut', 'distributions-derivee-pp', 'distributions-existence', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'd-u', kind: 'definition', text: t`$u(x)=|x|$ sur $\mathbb R$ ; $\operatorname{sgn}(x)=1$ si $x>0$, $\operatorname{sgn}(x)=-1$ si $x<0$.` },
      { id: 'd-phi', kind: 'definition', local: true, text: t`Soit $\varphi\in\mathcal D(\mathbb R)$ et $R>0$ tel que $\operatorname{supp}\varphi\subset\,]-R,R[$.` },

      { id: 'loc', kind: 'consequence', text: t`$u$ et $\operatorname{sgn}$ appartiennent à $L^1_{\mathrm{loc}}(\mathbb R)$.` },
      { id: 'def', kind: 'egalite', text: t`$\langle u',\varphi\rangle=-\int_{\mathbb R}|x|\,\varphi'(x)\,dx$.` },
      { id: 'chasles', kind: 'egalite', text: t`$-\int_{\mathbb R}|x|\,\varphi'(x)\,dx=\int_{-R}^0x\varphi'(x)\,dx-\int_0^Rx\varphi'(x)\,dx$.` },
      { id: 'cont0', kind: 'consequence', text: t`$|x|$ est continue en $0$ et s'y annule.` },
      {
        id: 'bord',
        kind: 'egalite',
        text: t`$\big[x\varphi(x)\big]_{0}^{R}=0$ et $\big[x\varphi(x)\big]_{-R}^{0}=0$.`,
        masked: t`Valeur des crochets $\big[x\varphi(x)\big]_{0}^{R}$ et $\big[x\varphi(x)\big]_{-R}^{0}$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\big[x\varphi(x)\big]_{0}^{R}$ (les deux crochets valent la même valeur).`, expected: '0' },
      },
      { id: 'ipp-p', kind: 'egalite', text: t`$\int_0^Rx\varphi'(x)\,dx=-\int_0^R\varphi(x)\,dx$.` },
      { id: 'ipp-m', kind: 'egalite', text: t`$\int_{-R}^0x\varphi'(x)\,dx=-\int_{-R}^0\varphi(x)\,dx$.` },
      { id: 'somme', kind: 'egalite', text: t`$\langle u',\varphi\rangle=\int_0^R\varphi(x)\,dx-\int_{-R}^0\varphi(x)\,dx$.` },
      { id: 'sgn', kind: 'egalite', text: t`$\int_{\mathbb R}\operatorname{sgn}(x)\,\varphi(x)\,dx=\int_0^R\varphi(x)\,dx-\int_{-R}^0\varphi(x)\,dx$.` },
      { id: 'fin', kind: 'conclusion', text: t`$u\in L^1_{\mathrm{loc}}(\mathbb R)$ et $u'=\operatorname{sgn}$ dans $\mathcal D'(\mathbb R)$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-dirac', kind: 'consequence', distractor: true, after: ['def'], text: t`$u'=\operatorname{sgn}+2\delta_0$ dans $\mathcal D'(\mathbb R)$.` },
      { id: 'x-non-existe', kind: 'consequence', distractor: true, text: t`Comme $|x|$ n'est pas dérivable en $0$, $u$ n'admet pas de dérivée dans $\mathcal D'(\mathbb R)$.` },
      { id: 'x-ipp', kind: 'egalite', distractor: true, after: ['chasles'], text: t`$\int_0^Rx\varphi'(x)\,dx=-\varphi(0)-\int_0^R\varphi(x)\,dx$.` },
    ],
    justifications: [
      { id: 'j-loc', label: t`$|x|$ est continue et $\operatorname{sgn}$ est mesurable bornée : ces fonctions sont intégrables sur tout compact.` },
      { id: 'j-def', label: t`Définition de la dérivée distributionnelle et de la distribution régulière $T_u$.` },
      { id: 'j-chasles', label: t`Relation de Chasles, $|x|=x$ sur $[0,R]$, $|x|=-x$ sur $[-R,0]$, et $\varphi'$ nulle hors de $]-R,R[$.` },
      { id: 'j-cont', label: t`$|x|$ s'annule en $0$ et ne présente pas de saut en ce point.` },
      { id: 'j-crochet', label: t`Le facteur $x$ s'annule en $0$, et $\varphi(\pm R)=0$ par le support.` },
      { id: 'j-ipp', label: 'Intégration par parties sur un segment, pour des fonctions de classe $C^1$.' },
      { id: 'j-somme', label: 'Report des deux intégrations par parties dans le découpage.' },
      { id: 'j-sgn', label: t`Valeur de $\operatorname{sgn}$ sur chaque intervalle et support de $\varphi$.` },
      { id: 'j-eg', label: 'Deux distributions régulières qui coïncident sur toute fonction test sont égales.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-pp', label: t`$|x|$ est dérivable sur $\mathbb R^*$, de dérivée $\operatorname{sgn}$ : la dérivée presque partout est donc la dérivée distributionnelle.` },
      { id: 'j-dirac', label: t`La dérivée de $|x|$ saute en $0$ : il faut donc lui ajouter un terme de Dirac en ce point.` },
      { id: 'j-non-derivable', label: 'Une fonction non dérivable en un point n’admet pas de dérivée distributionnelle.' },
    ],
    rules: [
      { from: ['d-u'], to: 'loc', by: 'j-loc' },
      { from: ['loc', 'd-phi'], to: 'def', by: 'j-def' },
      { from: ['d-u', 'd-phi'], to: 'chasles', by: 'j-chasles' },
      { from: ['d-u'], to: 'cont0', by: 'j-cont' },
      { from: ['d-phi', 'cont0'], to: 'bord', by: 'j-crochet' },
      { from: ['d-phi', 'bord'], to: 'ipp-p', by: 'j-ipp' },
      { from: ['d-phi', 'bord'], to: 'ipp-m', by: 'j-ipp' },
      { from: ['def', 'chasles', 'ipp-p', 'ipp-m'], to: 'somme', by: 'j-somme' },
      { from: ['d-u', 'd-phi'], to: 'sgn', by: 'j-sgn' },
      { from: ['somme', 'sgn', 'loc'], to: 'fin', by: 'j-eg' },
    ],
    traps: [
      {
        conclusion: 'x-dirac',
        verdict: 'incorrect',
        concept: 'distributions-bord-saut',
        message: t`Un terme de Dirac en $0$ traduirait un saut de $u$ en $0$. Or $|x|$ est continue en $0$ : c'est $u'$ qui saute, et ce saut n'apparaîtra qu'en dérivant une seconde fois.`,
        counterexample: t`Pour $\varphi$ paire avec $\varphi(0)=1$ : $\langle u',\varphi\rangle=-\int|x|\varphi'=0$ (intégrande impaire), tandis que $\langle\operatorname{sgn}+2\delta_0,\varphi\rangle=2$.`,
      },
      {
        conclusion: 'x-non-existe',
        verdict: 'incorrect',
        concept: 'distributions-existence',
        message: t`La dérivée distributionnelle existe toujours : $\partial^\alpha T$ est définie pour toute distribution $T$, sans condition de régularité.`,
        counterexample: t`$u\in L^1_{\mathrm{loc}}(\mathbb R)$ définit une distribution, et sa dérivée se calcule par $\langle u',\varphi\rangle=-\int|x|\varphi'$.`,
      },
      {
        conclusion: 'x-ipp',
        verdict: 'incorrect',
        concept: 'distributions-bord-saut',
        message: t`Le crochet en $0$ vaut $0\cdot\varphi(0)=0$ : l'intégration par parties ne produit aucun terme $\varphi(0)$.`,
        counterexample: t`Pour $\varphi$ avec $\varphi(0)\neq 0$, le terme $-\varphi(0)$ est faux : le crochet $[x\varphi(x)]_0^R$ est nul.`,
      },
      {
        conclusion: 'fin',
        by: 'j-pp',
        verdict: 'incorrect',
        concept: 'distributions-derivee-pp',
        message: t`La dérivée presque partout ne détermine pas la dérivée distributionnelle : la conclusion est juste, mais il faut un argument, celui du calcul de $\langle u',\varphi\rangle$.`,
        counterexample: t`$H$ a une dérivée presque partout nulle, et pourtant $H'=\delta_0\neq 0$.`,
      },
      {
        conclusion: 'fin',
        by: 'j-non-derivable',
        verdict: 'incorrect',
        concept: 'distributions-existence',
        message: 'La dérivée distributionnelle existe sans condition de dérivabilité ponctuelle.',
      },
    ],
    removable: [
      {
        hypothesis: 'cont0',
        label: t`Ne plus disposer de la continuité de $|x|$ en $0$`,
        necessary: true,
        explanation: t`Si la fonction présentait un saut en $0$, les crochets en $0$ ne seraient plus nuls et un terme de Dirac apparaîtrait dans la dérivée.`,
        counterexample: t`$v=|x|+H$ présente un saut en $0$, et $v'=\operatorname{sgn}+\delta_0$, d'après le calcul de $H'$.`,
      },
    ],
  },
  closedChecks: [
    { kind: 'rational', prompt: t`Pour $\varphi\in\mathcal D(\mathbb R)$ paire, valeur de $\langle u',\varphi\rangle$`, expected: '0' },
  ],
  solution: t`**Intégrabilité locale.** $u$ est continue et $\operatorname{sgn}$ est mesurable et bornée : ces deux fonctions sont intégrables sur tout compact, donc appartiennent à $L^1_{\mathrm{loc}}(\mathbb R)$.

**Calcul.** Soit $\varphi\in\mathcal D(\mathbb R)$ et $R>0$ tel que $\operatorname{supp}\varphi\subset\,]-R,R[$. Par définition,
$$\langle u',\varphi\rangle=-\int_{\mathbb R}|x|\varphi'(x)\,dx=\int_{-R}^0x\varphi'(x)\,dx-\int_0^Rx\varphi'(x)\,dx.$$
Intégrons par parties sur chaque segment. Les crochets $[x\varphi(x)]_0^R$ et $[x\varphi(x)]_{-R}^0$ sont nuls : en $\pm R$ car $\varphi(\pm R)=0$, en $0$ car le facteur $x$ s'y annule. Il vient
$$\int_0^Rx\varphi'(x)\,dx=-\int_0^R\varphi(x)\,dx,\qquad\int_{-R}^0x\varphi'(x)\,dx=-\int_{-R}^0\varphi(x)\,dx,$$
d'où
$$\langle u',\varphi\rangle=\int_0^R\varphi(x)\,dx-\int_{-R}^0\varphi(x)\,dx=\int_{\mathbb R}\operatorname{sgn}(x)\varphi(x)\,dx.$$
Donc $u'=\operatorname{sgn}$ dans $\mathcal D'(\mathbb R)$.

**Point de vigilance.** $|x|$ n'est pas dérivable en $0$ au sens classique, mais cela n'empêche pas $u'$ d'exister. Il n'y a pas de terme de Dirac dans $u'$ : la fonction $|x|$ est continue en $0$, et les crochets en $0$ s'annulent. Le saut de $u'$ en $0$ n'apparaîtra qu'en dérivant une seconde fois.`,
  steps: [
    t`Établir $u,\operatorname{sgn}\in L^1_{\mathrm{loc}}(\mathbb R)$.`,
    t`Écrire $\langle u',\varphi\rangle$ par définition et découper l'intégrale en $0$.`,
    'Intégrer par parties sur chaque segment, en vérifiant que les crochets sont nuls.',
    t`Reconnaître $\int\operatorname{sgn}\,\varphi$.`,
    'Conclure à l’égalité des distributions.',
  ],
  commonErrors: [
    { id: 'e-dirac', description: t`Ajouter un terme de Dirac à $u'$ parce que la dérivée classique saute en $0$.`, concept: 'distributions-bord-saut' },
    { id: 'e-pp', description: t`Conclure directement que la dérivée distributionnelle est la dérivée presque partout, sans calcul.`, concept: 'distributions-derivee-pp' },
    { id: 'e-existe', description: t`Affirmer que la dérivée distributionnelle de $|x|$ n'existe pas parce que $|x|$ n'est pas dérivable en $0$.`, concept: 'distributions-existence' },
  ],
  hints: [
    t`$|x|$ n'est pas dérivable en $0$ au sens classique : ne cherche pas une formule ponctuelle, teste contre une fonction $\varphi$.`,
    t`Découpe $-\int|x|\varphi'$ en $\int_{-R}^0x\varphi'-\int_0^Rx\varphi'$ et intègre par parties sur chacun des deux segments.`,
    t`Les crochets sont nuls : en $0$ le facteur $x$ s'annule, en $\pm R$ c'est $\varphi$. Il reste $\int_0^R\varphi-\int_{-R}^0\varphi$.`,
  ],
  rubric: rubric({
    hypotheses: t`$u$ et $\operatorname{sgn}$ sont reconnues comme localement intégrables ; $\varphi$ est une fonction test quelconque.`,
    methode: 'La dérivée se calcule par la définition, avec un découpage en $0$.',
    validite: 'Les intégrations par parties sont justifiées et les crochets sont calculés.',
    justifications: 'Aucun passage de la dérivée presque partout à la dérivée distributionnelle n’est admis sans preuve.',
    conclusion: t`L'égalité $u'=\operatorname{sgn}$ est obtenue dans $\mathcal D'(\mathbb R)$, sans terme de Dirac.`,
  }),
  variant: {
    statement: t`Soit $u(x)=x_+=\max(x,0)$ sur $\mathbb R$. Montrer que $u\in L^1_{\mathrm{loc}}(\mathbb R)$ et calculer $u'$ dans $\mathcal D'(\mathbb R)$.`,
    solution: t`$u$ est continue, donc $u\in L^1_{\mathrm{loc}}(\mathbb R)$. Pour $\varphi\in\mathcal D(\mathbb R)$ à support dans $]-R,R[$ : $\langle u',\varphi\rangle=-\int_0^Rx\varphi'(x)\,dx$. L'intégration par parties, de crochet nul en $0$ (facteur $x$) et en $R$ (support), donne $\int_0^Rx\varphi'(x)\,dx=-\int_0^R\varphi(x)\,dx$. Donc $\langle u',\varphi\rangle=\int_0^R\varphi(x)\,dx=\int_{\mathbb R}H\varphi$, c'est-à-dire $u'=H$ dans $\mathcal D'(\mathbb R)$, où $H$ est la fonction de Heaviside.`,
    closedChecks: [
      { kind: 'rational', prompt: t`Saut de $u'=H$ en $0$, c'est-à-dire $H(0^+)-H(0^-)$`, expected: '1' },
    ],
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'distributions.difficile',
  theoremId: 'distributions',
  level: 'difficile',
  title: t`Dérivée seconde distributionnelle de $|x|$ et terme de Dirac`,
  statement: t`Soit $u(x)=|x|$ sur $\mathbb R$. Calculer $u''$ dans $\mathcal D'(\mathbb R)$. Interpréter le terme de Dirac obtenu, en montrant que $u''$ n'est pas représentable par une fonction de $L^1_{\mathrm{loc}}(\mathbb R)$ et que $u$ appartient à $H^1(]-1,1[)$ sans appartenir à $H^2(]-1,1[)$.`,
  source: poly(39, 'Exercice 8, difficile'),
  prerequisites: [],
  concepts: ['distributions-dirac', 'distributions-derivee-pp', 'distributions-bord-saut', 'quantificateurs'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'par-sgn', label: t`En repartant de $u'=\operatorname{sgn}$` },
      { id: 'directe', label: t`Directement à partir de $u$, par deux dérivations` },
    ],
    nodes: [
      { id: 'd-u', kind: 'definition', text: t`$u(x)=|x|$ sur $\mathbb R$.` },
      { id: 'h-prem', kind: 'hypothese', text: t`$u'=\operatorname{sgn}$ dans $\mathcal D'(\mathbb R)$ (exercice précédent).` },
      { id: 'd-phi', kind: 'definition', local: true, text: t`Soit $\varphi\in\mathcal D(\mathbb R)$ et $R>0$ tel que $\operatorname{supp}\varphi\subset\,]-R,R[$.` },
      { id: 'd-delta', kind: 'definition', text: t`$\delta_0$ est la distribution de Dirac en $0$ : $\langle\delta_0,\psi\rangle=\psi(0)$.` },
      { id: 'h-chi', kind: 'definition', text: t`$\chi\in\mathcal D(\mathbb R)$ vérifie $\chi(0)=1$, $0\le\chi\le 1$ et $\operatorname{supp}\chi\subset[-1,1]$.` },

      { id: 'bord', kind: 'egalite', text: t`$\varphi(\pm R)=0$ et $\varphi'(\pm R)=0$.` },
      { id: 'v-def', kind: 'egalite', text: t`$\langle u'',\varphi\rangle=-\langle\operatorname{sgn},\varphi'\rangle=\int_{-R}^0\varphi'(x)\,dx-\int_0^R\varphi'(x)\,dx$.` },
      { id: 'v-ftc', kind: 'egalite', text: t`$\int_{-R}^0\varphi'(x)\,dx=\varphi(0)$ et $\int_0^R\varphi'(x)\,dx=-\varphi(0)$.` },
      { id: 'w-def', kind: 'egalite', text: t`$\langle u'',\varphi\rangle=(-1)^2\langle u,\varphi''\rangle=\int_{\mathbb R}|x|\varphi''(x)\,dx$.` },
      { id: 'w-ipp', kind: 'egalite', text: t`$\int_0^Rx\varphi''(x)\,dx=\varphi(0)$ et $\int_{-R}^0(-x)\varphi''(x)\,dx=\varphi(0)$.` },
      {
        id: 'val',
        kind: 'egalite',
        text: t`$\langle u'',\varphi\rangle=2\varphi(0)$.`,
        masked: t`Valeur de $\langle u'',\varphi\rangle$ en fonction de $\varphi(0)$ : à calculer.`,
        check: { kind: 'expr-equiv', prompt: t`Exprime $\langle u'',\varphi\rangle$ en fonction de $p=\varphi(0)$.`, expected: '2p', vars: ['p'] },
      },
      { id: 'eg', kind: 'egalite', text: t`$u''=2\delta_0$ dans $\mathcal D'(\mathbb R)$.` },
      { id: 'saut', kind: 'egalite', text: t`Le coefficient $2$ est le saut de $u'$ en $0$ : $u'(0^+)-u'(0^-)=1-(-1)=2$.` },

      { id: 'abs', kind: 'hypothese', local: true, text: t`Supposons qu'il existe $g\in L^1(]-1,1[)$ telle que $\int_{-1}^1g\psi=2\psi(0)$ pour tout $\psi\in\mathcal D(]-1,1[)$.` },
      { id: 'phi-n', kind: 'consequence', text: t`Pour $n\ge 2$, $\varphi_n(x)=\chi(nx)$ appartient à $\mathcal D(]-1,1[)$, avec $\varphi_n(0)=1$ et $\operatorname{supp}\varphi_n\subset[-1/n,1/n]$.` },
      { id: 'eg-deux', kind: 'egalite', text: t`Pour $n\ge 2$ : $\int_{-1}^1g\varphi_n=2$.` },
      { id: 'lim-zero', kind: 'inegalite', text: t`$\left|\int_{-1}^1g\varphi_n\right|\le\int_{-1/n}^{1/n}|g|$, et ce majorant tend vers $0$ quand $n\to+\infty$.` },
      { id: 'contra', kind: 'contradiction', text: t`Par passage à la limite, $2\le 0$ : contradiction.` },
      { id: 'non-reg', kind: 'consequence', text: t`Aucune $g\in L^1(]-1,1[)$ ne représente $2\delta_0$ sur $]-1,1[$.` },
      { id: 'h1', kind: 'consequence', text: t`$u\in H^1(]-1,1[)$.` },
      { id: 'non-h2', kind: 'consequence', text: t`$u\notin H^2(]-1,1[)$.` },
      { id: 'fin', kind: 'conclusion', text: t`$u''=2\delta_0$ dans $\mathcal D'(\mathbb R)$ ; ce terme de Dirac, de coefficient le saut de $u'$ en $0$, n'est pas représentable par une fonction ; $u\in H^1(]-1,1[)$ et $u\notin H^2(]-1,1[)$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-nul', kind: 'consequence', distractor: true, after: ['eg'], text: t`$u''=0$ dans $\mathcal D'(\mathbb R)$, car $u$ est affine sur chaque demi-droite.` },
      { id: 'x-un', kind: 'consequence', distractor: true, after: ['val'], text: t`$u''=\delta_0$ dans $\mathcal D'(\mathbb R)$.` },
      { id: 'x-l2', kind: 'consequence', distractor: true, text: t`Comme $u'=\operatorname{sgn}$ est bornée, on a $u''\in L^2(]-1,1[)$.` },
    ],
    justifications: [
      { id: 'j-support', label: t`Le support de $\varphi$ est contenu dans $]-R,R[$ : $\varphi$ et $\varphi'$ s'annulent en $\pm R$.` },
      { id: 'j-def', label: t`Définition de la dérivée distributionnelle appliquée à $\operatorname{sgn}$, puis découpage de l'intégrale en $0$.` },
      { id: 'j-ftc', label: 'Théorème fondamental du calcul intégral et annulation en $\\pm R$.', theorem: 'theoreme-fondamental' },
      { id: 'j-def2', label: t`Définition de la dérivée distributionnelle à l'ordre $2$ : le facteur est $(-1)^2=1$.` },
      { id: 'j-ipp2', label: t`Intégration par parties sur $[0,R]$ et sur $[-R,0]$, les crochets en $0$ et $\pm R$ étant nuls.` },
      { id: 'j-report', label: 'Report des égalités précédentes.' },
      { id: 'j-eg', label: 'Égalité des distributions sur toutes les fonctions tests.' },
      { id: 'j-saut', label: t`Valeurs de $\operatorname{sgn}$ à droite et à gauche de $0$.` },
      { id: 'j-phi-n', label: t`Changement d'échelle : le support de $\varphi_n$ est celui de $\chi$ divisé par $n$.` },
      { id: 'j-eg-deux', label: t`Égalité $\int g\psi=2\psi(0)$ appliquée à $\psi=\varphi_n$, avec $\varphi_n(0)=1$.` },
      { id: 'j-dom', label: t`Majoration par le support de $\varphi_n$, puis convergence dominée ($g\in L^1(]-1,1[)$).`, theorem: 'convergence-dominee' },
      { id: 'j-contra', label: 'Passage à la limite dans une égalité et une majoration incompatibles.' },
      { id: 'j-absurde', label: 'Raisonnement par l’absurde.' },
      { id: 'j-h1', label: t`$u$ est bornée sur $]-1,1[$ et $u'=\operatorname{sgn}$, de carré intégrable sur cet intervalle.` },
      { id: 'j-non-h2', label: t`Si $u\in H^2(]-1,1[)$, alors $u''$ serait une fonction de $L^2(]-1,1[)\subset L^1(]-1,1[)$ représentant $2\delta_0$ sur $]-1,1[$.` },
      { id: 'j-synthese', label: 'Réunion des résultats établis.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-mesure-nulle', label: t`Le point $0$ est de mesure nulle : il ne peut contribuer à $u''$.` },
      { id: 'j-borne', label: t`$u'$ est bornée, donc sa dérivée est de carré intégrable.` },
    ],
    rules: [
      { from: ['d-phi'], to: 'bord', by: 'j-support' },

      { from: ['h-prem', 'd-phi'], to: 'v-def', by: 'j-def', path: 'par-sgn' },
      { from: ['d-phi', 'bord'], to: 'v-ftc', by: 'j-ftc', path: 'par-sgn' },
      { from: ['v-def', 'v-ftc'], to: 'val', by: 'j-report', path: 'par-sgn' },

      { from: ['d-u', 'd-phi'], to: 'w-def', by: 'j-def2', path: 'directe' },
      { from: ['d-phi', 'bord'], to: 'w-ipp', by: 'j-ipp2', path: 'directe' },
      { from: ['w-def', 'w-ipp'], to: 'val', by: 'j-report', path: 'directe' },

      { from: ['val', 'd-delta'], to: 'eg', by: 'j-eg' },
      { from: ['h-prem'], to: 'saut', by: 'j-saut' },

      { from: ['h-chi'], to: 'phi-n', by: 'j-phi-n' },
      { from: ['abs', 'phi-n'], to: 'eg-deux', by: 'j-eg-deux' },
      { from: ['abs', 'phi-n'], to: 'lim-zero', by: 'j-dom' },
      { from: ['eg-deux', 'lim-zero'], to: 'contra', by: 'j-contra' },
      { from: ['contra'], to: 'non-reg', by: 'j-absurde' },

      { from: ['d-u', 'h-prem'], to: 'h1', by: 'j-h1' },
      { from: ['eg', 'non-reg'], to: 'non-h2', by: 'j-non-h2' },

      { from: ['eg', 'saut', 'non-reg', 'h1', 'non-h2'], to: 'fin', by: 'j-synthese' },
    ],
    traps: [
      {
        conclusion: 'x-nul',
        verdict: 'incorrect',
        concept: 'distributions-derivee-pp',
        message: t`$u$ est affine sur chaque demi-droite : la dérivée seconde presque partout est nulle, mais la fonction test voit le raccord en $0$.`,
        counterexample: t`Si $\varphi(0)=1$, alors $\langle u'',\varphi\rangle=\int|x|\varphi''=2\ne 0$.`,
      },
      {
        conclusion: 'x-un',
        verdict: 'incorrect',
        concept: 'distributions-bord-saut',
        message: t`Le coefficient de $\delta_0$ est le saut de $u'$ en $0$, soit $1-(-1)=2$.`,
        counterexample: t`Si $\varphi(0)=1$, alors $\langle u'',\varphi\rangle=2$, et non $1$.`,
      },
      {
        conclusion: 'x-l2',
        verdict: 'incorrect',
        concept: 'distributions-dirac',
        message: t`Une dérivée bornée n'a aucune raison d'avoir elle-même une dérivée dans $L^2$ : ici, $u''$ est un terme de Dirac.`,
        counterexample: t`$H$ est bornée, et pourtant $H'=\delta_0$ n'est pas une fonction.`,
      },
      {
        conclusion: 'eg',
        by: 'j-mesure-nulle',
        verdict: 'incorrect',
        concept: 'distributions-derivee-pp',
        message: 'Un point de mesure nulle ne compte pas pour l’intégrale d’une fonction, mais une distribution peut y être concentrée.',
        counterexample: t`$\delta_0$ est concentrée en $\{0\}$, et $\langle\delta_0,\varphi\rangle=\varphi(0)$ n'est pas nul.`,
      },
      {
        conclusion: 'non-h2',
        by: 'j-borne',
        verdict: 'incorrect',
        concept: 'distributions-dirac',
        message: t`Cette justification est fausse : une borne sur $u'$ ne donne rien sur $u''$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'bord',
        label: t`Ne plus disposer de l'annulation de $\varphi$ et $\varphi'$ en $\pm R$`,
        necessary: true,
        explanation: t`Sans le support compact, les termes de bord en $\pm R$ ne disparaissent pas et le calcul ne se referme pas.`,
        counterexample: t`Pour $\varphi(x)=1$, de dérivée nulle : $\int_{\mathbb R}|x|\varphi''=0$, alors que $2\varphi(0)=2$.`,
      },
      {
        hypothesis: 'h-chi',
        label: 'Ne plus disposer d’une fonction test non nulle en $0$',
        necessary: true,
        explanation: t`La non-représentabilité de $2\delta_0$ s'obtient en testant près de $0$ : il faut des fonctions tests de valeur non nulle en $0$.`,
        counterexample: t`Sur les fonctions tests nulles en $0$, on a $\langle 2\delta_0,\psi\rangle=0$ : $2\delta_0$ y est indiscernable de $T_0$, et l'argument ne se forme plus.`,
      },
    ],
  },
  closedChecks: [
    { kind: 'rational', prompt: t`Pour $\varphi\in\mathcal D(\mathbb R)$ telle que $\varphi(0)=5$, valeur de $\langle u'',\varphi\rangle$`, expected: '10' },
    { kind: 'rational', prompt: t`Saut de $u'$ en $0$, c'est-à-dire $u'(0^+)-u'(0^-)$`, expected: '2' },
  ],
  solution: t`**Calcul.** Soit $\varphi\in\mathcal D(\mathbb R)$, $\operatorname{supp}\varphi\subset\,]-R,R[$. D'après l'exercice précédent, $u'=\operatorname{sgn}$. Par définition,
$$\langle u'',\varphi\rangle=-\langle\operatorname{sgn},\varphi'\rangle=-\int_{\mathbb R}\operatorname{sgn}(x)\varphi'(x)\,dx=\int_{-R}^0\varphi'(x)\,dx-\int_0^R\varphi'(x)\,dx.$$
Le théorème fondamental et $\varphi(\pm R)=0$ donnent $\int_{-R}^0\varphi'=\varphi(0)$ et $\int_0^R\varphi'=-\varphi(0)$. Donc $\langle u'',\varphi\rangle=2\varphi(0)$, soit $u''=2\delta_0$ dans $\mathcal D'(\mathbb R)$.

*Autre voie.* On obtient le même résultat sans passer par $\operatorname{sgn}$ : $\langle u'',\varphi\rangle=\int_{\mathbb R}|x|\varphi''$, et l'intégration par parties sur chaque demi-droite donne $\int_0^Rx\varphi''=\varphi(0)$ et $\int_{-R}^0(-x)\varphi''=\varphi(0)$.

**Interprétation du terme de Dirac.** Le coefficient $2$ est le saut de $u'$ en $0$ : $u'(0^+)-u'(0^-)=1-(-1)=2$. La distribution $2\delta_0$ n'est représentée par aucune fonction localement intégrable. En effet, soit $g\in L^1(]-1,1[)$ telle que $\int_{-1}^1g\psi=2\psi(0)$ pour tout $\psi\in\mathcal D(]-1,1[)$. Pour $\chi\in\mathcal D(\mathbb R)$ avec $\chi(0)=1$, $0\le\chi\le 1$, $\operatorname{supp}\chi\subset[-1,1]$, et pour $n\ge 2$, posons $\varphi_n(x)=\chi(nx)$ : alors $\int_{-1}^1g\varphi_n=2$, tandis que $\left|\int_{-1}^1g\varphi_n\right|\le\int_{-1/n}^{1/n}|g|\to 0$ par convergence dominée, ce qui est impossible. A fortiori, $u''$ n'est représentée par aucune fonction de $L^1_{\mathrm{loc}}(\mathbb R)$.

**Conséquence.** $u\in H^1(]-1,1[)$, car $u$ est bornée sur $]-1,1[$ et $u'=\operatorname{sgn}$ y est de carré intégrable. En revanche, si $u\in H^2(]-1,1[)$, alors $u''$ serait une fonction de $L^2(]-1,1[)\subset L^1(]-1,1[)$ représentant $2\delta_0$ sur $]-1,1[$, ce qui est exclu : $u\notin H^2(]-1,1[)$.`,
  steps: [
    t`Calculer $\langle u'',\varphi\rangle$, à partir de $u'=\operatorname{sgn}$ ou directement.`,
    t`En déduire $u''=2\delta_0$.`,
    t`Identifier le coefficient au saut de $u'$ en $0$.`,
    t`Montrer que $2\delta_0$ n'est pas représentable par une fonction : test sur $\varphi_n(x)=\chi(nx)$.`,
    t`Conclure $u\in H^1(]-1,1[)$ et $u\notin H^2(]-1,1[)$.`,
  ],
  commonErrors: [
    { id: 'e-nul', description: t`Conclure $u''=0$ parce que $u$ est affine sur chaque demi-droite.`, concept: 'distributions-derivee-pp' },
    { id: 'e-coef', description: t`Prendre un coefficient $1$ au lieu du saut, qui vaut $2$.`, concept: 'distributions-bord-saut' },
    { id: 'e-fonction', description: t`Considérer $2\delta_0$ comme une fonction, nulle hors de $0$.`, concept: 'distributions-dirac' },
  ],
  hints: [
    t`Deux voies : repartir de $u'=\operatorname{sgn}$, ou écrire $\langle u'',\varphi\rangle=\int|x|\varphi''$. Dans les deux cas, découpe l'intégrale en $0$.`,
    t`Pour montrer que $2\delta_0$ n'est pas une fonction, suppose qu'une fonction $g\in L^1(]-1,1[)$ la représente, et teste-la sur des fonctions concentrées près de $0$.`,
    t`$\varphi_n(x)=\chi(nx)$ vaut $1$ en $0$ et son support rétrécit autour de $0$ : $\int g\varphi_n\to 0$, alors que $\langle 2\delta_0,\varphi_n\rangle=2$.`,
  ],
  rubric: rubric({
    hypotheses: t`Le résultat $u'=\operatorname{sgn}$, ou la définition de $u''$ en tant que distribution, est utilisé correctement.`,
    methode: 'Le calcul de la dérivée seconde est mené sur une fonction test quelconque.',
    validite: t`Le coefficient $2$ et le signe sont exacts ; l'argument de non-représentabilité est complet.`,
    justifications: 'Les annulations au bord et la convergence dominée sont identifiées.',
    conclusion: t`$u''=2\delta_0$, et l'appartenance à $H^1$ sans appartenance à $H^2$ est établie.`,
  }),
  variant: {
    statement: t`Soit $u(x)=x|x|$ sur $\mathbb R$. Calculer $u'$, $u''$ et $u'''$ dans $\mathcal D'(\mathbb R)$. En déduire l'appartenance de $u$ à $H^2(]-1,1[)$ et sa non-appartenance à $H^3(]-1,1[)$.`,
    solution: t`$u$ est de classe $C^1$ sur $\mathbb R$, avec $u'(x)=2|x|$ : la dérivée distributionnelle coïncide alors avec la dérivée classique. Puis $u''=2\operatorname{sgn}$ (exercice intermédiaire), et $u'''=2\operatorname{sgn}'=4\delta_0$, car $\operatorname{sgn}'=2\delta_0$ (même calcul que pour $u''$ dans l'exercice). Sur $]-1,1[$, $u''$ est bornée, donc $u\in H^2(]-1,1[)$ ; le terme $4\delta_0$ n'est représentable par aucune fonction de $L^1(]-1,1[)$, donc $u\notin H^3(]-1,1[)$. Le terme de Dirac n'apparaît qu'à l'ordre où la dérivée précédente présente un saut.`,
    closedChecks: [
      { kind: 'rational', prompt: t`Coefficient de $\delta_0$ dans $u'''$`, expected: '4' },
    ],
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT08: TheoremModule = {
  theorem: {
    id: 'distributions',
    spaces: [
      t`$\Omega\subset\mathbb R^d$ : ouvert.`,
      t`$\mathcal D(\Omega)=C^\infty_c(\Omega)$ : fonctions tests, munies de leur topologie usuelle : $\varphi_n\to\varphi$ dans $\mathcal D(\Omega)$ signifie que les supports des $\varphi_n$ sont contenus dans un même compact de $\Omega$ et que toutes les dérivées convergent uniformément.`,
      t`$\mathcal D'(\Omega)$ : espace des distributions, dual continu de $\mathcal D(\Omega)$. Toute $u\in L^1_{\mathrm{loc}}(\Omega)$ définit la distribution régulière $\langle T_u,\varphi\rangle=\int_\Omega u\varphi$.`,
    ],
    hypotheses: [
      { id: 'h-T', text: t`$T\in\mathcal D'(\Omega)$ est une distribution.` },
      { id: 'h-alpha', text: t`$\alpha\in\mathbb N^d$ est un multi-indice.` },
    ],
    statement: t`Pour $T\in\mathcal D'(\Omega)$ et $\alpha\in\mathbb N^d$, la dérivée distributionnelle est donnée par
$$\langle\partial^\alpha T,\varphi\rangle=(-1)^{|\alpha|}\langle T,\partial^\alpha\varphi\rangle\qquad\forall\varphi\in\mathcal D(\Omega).$$
Elle existe toujours comme distribution.`,
    conclusions: {
      existence: t`Pour tout $T\in\mathcal D'(\Omega)$ et tout $\alpha$, $\partial^\alpha T$ existe dans $\mathcal D'(\Omega)$, sans condition de régularité.`,
      unicite: t`La formule détermine $\partial^\alpha T$ sur toutes les fonctions tests, donc $\partial^\alpha T$ est unique.`,
      autre: t`Pour $u\in C^{|\alpha|}(\Omega)$, on a $\partial^\alpha T_u=T_{\partial^\alpha u}$ (intégration par parties, les termes de bord étant nuls car $\varphi$ est à support compact).`,
    },
    sourceProof: 'complete',
    proofOutline: [
      t`La formule reproduit l'intégration par parties pour les fonctions régulières : elle est cohérente avec la dérivée classique.`,
      t`Linéarité : $\varphi\mapsto(-1)^{|\alpha|}\langle T,\partial^\alpha\varphi\rangle$ est linéaire, par composition.`,
      t`Continuité de $\partial^\alpha$ sur $\mathcal D(\Omega)$ : si $\varphi_n\to\varphi$ dans $\mathcal D(\Omega)$, alors $\partial^\alpha\varphi_n\to\partial^\alpha\varphi$ dans $\mathcal D(\Omega)$ (mêmes supports, convergence uniforme de toutes les dérivées).`,
      t`Par continuité de $T$ sur $\mathcal D(\Omega)$, la forme $\varphi\mapsto(-1)^{|\alpha|}\langle T,\partial^\alpha\varphi\rangle$ est linéaire continue : c'est un élément de $\mathcal D'(\Omega)$.`,
    ],
    warnings: [
      t`$H=\mathbb 1_{]0,+\infty[}$ a une dérivée nulle presque partout, et pourtant $H'=\delta_0$ : la dérivée presque partout n'est pas la dérivée distributionnelle.`,
      t`$\partial^\alpha T$ existe toujours comme distribution, mais pas nécessairement comme fonction.`,
      t`Le facteur $(-1)^{|\alpha|}$ fait partie de la définition.`,
    ],
    usefulFor: t`Donner un sens faible à $-\Delta u=f$ lorsque $u$ n'est pas deux fois dérivable classiquement, et poser l'espace fonctionnel des solutions.`,
    verification: FROM_POLY,
  },
  definitions: [
    {
      id: 'distributions-fonctions-test',
      term: t`Fonctions tests $\mathcal D(\Omega)$`,
      statement: t`$\mathcal D(\Omega)=C^\infty_c(\Omega)$ est l'espace des fonctions indéfiniment dérivables à support compact dans $\Omega$, muni de sa topologie usuelle.`,
      source: poly(11, 'Section 3.1'),
    },
    {
      id: 'distributions-distribution',
      term: 'Distribution',
      statement: t`$\mathcal D'(\Omega)$ est le dual continu de $\mathcal D(\Omega)$ : une distribution est une forme linéaire continue sur $\mathcal D(\Omega)$.`,
      source: poly(11, 'Section 3.1'),
    },
    {
      id: 'distributions-reguliere',
      term: 'Distribution régulière',
      statement: t`Toute fonction $u\in L^1_{\mathrm{loc}}(\Omega)$ définit une distribution régulière par $\langle T_u,\varphi\rangle=\int_\Omega u\varphi$.`,
      source: poly(11, 'Section 3.1'),
    },
    {
      id: 'distributions-derivee',
      term: 'Dérivée distributionnelle',
      statement: t`Pour $T\in\mathcal D'(\Omega)$ et $\alpha\in\mathbb N^d$ : $\langle\partial^\alpha T,\varphi\rangle=(-1)^{|\alpha|}\langle T,\partial^\alpha\varphi\rangle$ pour tout $\varphi\in\mathcal D(\Omega)$.`,
      source: poly(11, 'Section 3.1'),
    },
    {
      id: 'distributions-def-dirac',
      term: 'Distribution de Dirac',
      statement: t`$\delta_0$ est la distribution définie sur $\mathcal D(\mathbb R)$ par $\langle\delta_0,\varphi\rangle=\varphi(0)$. Elle n'est pas représentée par une fonction de $L^1_{\mathrm{loc}}(\mathbb R)$.`,
      source: poly(11, 'Section 3.1, exemple fondamental'),
    },
    {
      id: 'distributions-sobolev',
      term: t`Espaces de Sobolev $W^{m,p}(\Omega)$`,
      statement: t`Pour un entier $m\ge 0$ et $1\le p\le\infty$, $W^{m,p}(\Omega)$ contient les fonctions de $L^p(\Omega)$ dont toutes les dérivées distributionnelles jusqu'à l'ordre $m$ appartiennent à $L^p(\Omega)$. On écrit $H^m=W^{m,2}$.`,
      source: poly(11, 'Section 3.2'),
    },
  ],
  concepts: [
    {
      id: 'distributions-derivee-pp',
      label: 'Dérivée presque partout et dérivée distributionnelle',
      reminder: t`La dérivée presque partout ne détermine pas la dérivée distributionnelle : $H$ a une dérivée nulle presque partout, et pourtant $H'=\delta_0$.`,
    },
    {
      id: 'distributions-signe',
      label: 'Signe de la dérivée distributionnelle',
      reminder: t`$\langle\partial^\alpha T,\varphi\rangle=(-1)^{|\alpha|}\langle T,\partial^\alpha\varphi\rangle$ : le signe provient de l'intégration par parties et dépend de la parité de $|\alpha|$.`,
    },
    {
      id: 'distributions-dirac',
      label: 'Distribution de Dirac',
      reminder: t`La distribution de Dirac n'est pas une distribution régulière : aucune fonction de $L^1_{\mathrm{loc}}$ ne la représente.`,
    },
    {
      id: 'distributions-existence',
      label: 'Existence de la dérivée distributionnelle',
      reminder: t`$\partial^\alpha T$ existe toujours dans $\mathcal D'(\Omega)$ : l'absence de dérivée classique en un point n'empêche pas la dérivation au sens des distributions.`,
    },
    {
      id: 'distributions-bord-saut',
      label: 'Terme de bord et saut',
      reminder: t`Pour une fonction $u$ de classe $C^1$ par morceaux, un saut de $u$ en $a$ produit le terme $[u]_a\,\delta_a$ dans $u'$ ; si $u$ est continue en $a$, aucun terme de Dirac n'apparaît en $a$.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-distributions-derivee-pp',
      theoremId: 'distributions',
      title: 'Dérivée presque partout nulle',
      claim: t`Si $u\in L^1_{\mathrm{loc}}(\mathbb R)$ est dérivable presque partout, de dérivée presque partout nulle, alors $u'=0$ dans $\mathcal D'(\mathbb R)$.`,
      correctStatement: t`La dérivée distributionnelle se calcule par la formule de définition, testée sur $\mathcal D(\mathbb R)$ ; elle ne se réduit pas à la dérivée presque partout en général.`,
      task: t`Soit $H=\mathbb 1_{]0,+\infty[}$ et $\varphi\in\mathcal D(\mathbb R)$ telle que $\varphi(0)=3$. Calcule $\langle H',\varphi\rangle$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\langle H',\varphi\rangle$`, expected: '3' },
      explanation: t`$H'=\delta_0$ d'après l'exemple fondamental, donc $\langle H',\varphi\rangle=\varphi(0)=3\neq 0$, alors que $H$ a une dérivée nulle sur $\mathbb R^*$, donc presque partout.`,
      concept: 'distributions-derivee-pp',
      source: poly(11, 'Section 3.1, exemple fondamental'),
    },
    {
      id: 'ce-distributions-dirac-non-reguliere',
      theoremId: 'distributions',
      title: 'Distributions non régulières',
      claim: t`Toute distribution sur $\mathbb R$ est représentée par une fonction de $L^1_{\mathrm{loc}}(\mathbb R)$.`,
      correctStatement: t`Les distributions régulières sont les $T_g$ pour $g\in L^1_{\mathrm{loc}}(\mathbb R)$ ; la distribution de Dirac n'en fait pas partie.`,
      task: t`Soit $\chi\in\mathcal D(\mathbb R)$ telle que $\chi(0)=1$, et $\varphi_n(x)=\chi(nx)$. Calcule $\langle\delta_0,\varphi_n\rangle$ pour $n\ge 1$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\langle\delta_0,\varphi_n\rangle$, indépendante de $n$`, expected: '1' },
      explanation: t`Si $\delta_0=T_g$ avec $g\in L^1_{\mathrm{loc}}(\mathbb R)$, alors $\int g\varphi_n=\varphi_n(0)=1$ pour tout $n$, alors que, si $\operatorname{supp}\chi\subset[-r,r]$, $\left|\int g\varphi_n\right|\le\|\chi\|_\infty\int_{-r/n}^{r/n}|g|\to 0$ par convergence dominée : contradiction.`,
      concept: 'distributions-dirac',
      source: poly(11, 'Section 3.1, exemple fondamental'),
    },
    {
      id: 'ce-distributions-signe',
      theoremId: 'distributions',
      title: 'Oubli du signe dans la définition',
      claim: t`La dérivée distributionnelle d'une distribution $T$ sur $\mathbb R$ est donnée par $\langle T',\varphi\rangle=\langle T,\varphi'\rangle$.`,
      correctStatement: t`$\langle\partial^\alpha T,\varphi\rangle=(-1)^{|\alpha|}\langle T,\partial^\alpha\varphi\rangle$ : pour une dérivée d'ordre $1$, le facteur vaut $-1$.`,
      task: t`Pour $u(x)=x$ sur $\mathbb R$ et $\varphi\in\mathcal D(\mathbb R)$ avec $\int_{\mathbb R}\varphi=1$, calcule $\langle T_u,\varphi'\rangle=\int_{\mathbb R}x\varphi'(x)\,dx$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\int_{\mathbb R}x\varphi'(x)\,dx$`, expected: '-1' },
      explanation: t`Par intégration par parties, $\int x\varphi'=-\int\varphi=-1$, alors que la dérivée classique de $u$ vaut $1$ et $\int 1\cdot\varphi=1$. La formule sans signe donnerait donc l'opposé de la dérivée classique ; le facteur $-1$ rétablit l'accord.`,
      concept: 'distributions-signe',
      source: poly(11, 'Section 3.1'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT08;
