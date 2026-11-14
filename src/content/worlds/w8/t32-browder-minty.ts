/**
 * Résultat 32 — Browder–Minty (polycopié, sections 7.1 à 7.3, p. PDF 28–30).
 * Exercices : annexe B, n° 32 (p. PDF 44).
 */
import { t, rubric, poly, FROM_POLY, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'browder-minty.facile',
  theoremId: 'browder-minty',
  level: 'facile',
  title: t`Monotonie de $A(u)=u$ sur un Hilbert`,
  statement: t`Soit $H$ un Hilbert réel séparable et $A:H\to H'$ défini par $\langle Au,w\rangle=(u,w)_H$. Vérifier que $A$ est strictement monotone, hémicontinu, coercif et borné sur les bornés, puis en déduire par Browder–Minty que $Au=f$ a une unique solution pour tout $f\in H'$.`,
  source: poly(44, 'Exercice 32, facile (p. PDF 44) ; définitions de la section 7.1 (p. PDF 28)'),
  prerequisites: [],
  concepts: ['browder-minty-monotone-coercif', 'coercivite-non-lineaire', 'hypotheses-theoreme', 'existence-unicite'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-H', kind: 'hypothese', text: t`$H$ est un Hilbert réel séparable, donc un Banach réel réflexif séparable.` },
      { id: 'd-A', kind: 'definition', text: t`$\langle Au,w\rangle=(u,w)_H$ pour $u,w\in H$.` },
      { id: 's-uv', kind: 'definition', local: true, text: t`Soient $u,v\in H$.` },
      { id: 'calc', kind: 'egalite', text: t`$\langle Au-Av,u-v\rangle=\|u-v\|_H^2$.` },
      { id: 'mono', kind: 'consequence', text: t`$A$ est monotone.` },
      { id: 'strict', kind: 'consequence', text: t`$A$ est strictement monotone.` },
      { id: 'hemi', kind: 'consequence', text: t`$t\mapsto\langle A(u+tv),w\rangle=(u,w)_H+t(v,w)_H$ est continue : $A$ est hémicontinu.` },
      { id: 'coer', kind: 'egalite', text: t`$\langle Au,u\rangle/\|u\|_H=\|u\|_H\to+\infty$ quand $\|u\|_H\to\infty$ : $A$ est coercif.` },
      { id: 'borne', kind: 'egalite', text: t`$\|Au\|_{H'}=\|u\|_H$ : $A$ est borné sur les bornés.` },
      { id: 'thm', kind: 'application-theoreme', text: t`Pour tout $f\in H'$, il existe un unique $u\in H$ tel que $Au=f$.` },
      { id: 'fin', kind: 'conclusion', text: t`$A$ vérifie toutes les hypothèses de Browder–Minty, avec stricte monotonie : $Au=f$ a une unique solution pour tout $f\in H'$.` },
      { id: 'x-opp', kind: 'consequence', distractor: true, text: t`L'opérateur $B(u)=-u$ est monotone.` },
      { id: 'x-mono-coer', kind: 'consequence', distractor: true, after: ['mono'], text: t`Tout opérateur monotone de $H$ dans $H'$ est coercif.` },
      { id: 'x-quad', kind: 'consequence', distractor: true, after: ['coer'], text: t`Un opérateur est coercif au sens de Browder–Minty si et seulement s'il existe $\alpha>0$ tel que $\langle Au,u\rangle\ge\alpha\|u\|^2$ pour tout $u$.` },
    ],
    justifications: [
      { id: 'j-calc', label: t`Linéarité de $A$ et définition : $\langle A(u-v),u-v\rangle=(u-v,u-v)_H$.` },
      { id: 'j-def-mono', label: 'Définition de la monotonie : le crochet est positif ou nul.' },
      { id: 'j-strict', label: t`Si $u\neq v$, alors $\|u-v\|_H^2>0$.` },
      { id: 'j-affine', label: 'Une fonction affine de t est continue.' },
      { id: 'j-coer', label: t`$\langle Au,u\rangle=\|u\|_H^2$.` },
      { id: 'j-cs', label: t`Cauchy–Schwarz donne $|(u,w)_H|\le\|u\|_H\|w\|_H$, avec égalité pour $w=u$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-bm', label: 'Théorème de Browder–Minty, avec unicité par stricte monotonie.', theorem: 'browder-minty' },
      { id: 'j-syn', label: 'Réunion des hypothèses vérifiées et de la conclusion du théorème.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-lin', label: 'Tout opérateur linéaire est monotone.' },
      { id: 'j-mono-coer', label: 'La monotonie entraîne la coercivité.' },
    ],
    rules: [
      { from: ['s-uv', 'd-A'], to: 'calc', by: 'j-calc' },
      { from: ['calc'], to: 'mono', by: 'j-def-mono' },
      { from: ['calc'], to: 'strict', by: 'j-strict' },
      { from: ['d-A'], to: 'hemi', by: 'j-affine' },
      { from: ['d-A'], to: 'coer', by: 'j-coer' },
      { from: ['d-A'], to: 'borne', by: 'j-cs' },
      { from: ['h-H', 'mono', 'strict', 'hemi', 'coer', 'borne'], to: 'thm', by: 'j-bm' },
      { from: ['mono', 'strict', 'hemi', 'coer', 'borne', 'thm'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-opp',
        verdict: 'incorrect',
        concept: 'browder-minty-monotone-coercif',
        message: 'La monotonie dépend du signe : un opérateur linéaire n’est monotone que si sa forme quadratique est positive.',
        counterexample: t`$\langle B u-Bv,u-v\rangle=-\|u-v\|_H^2<0$ pour $u\neq v$.`,
      },
      {
        conclusion: 'mono',
        by: 'j-lin',
        verdict: 'incorrect',
        concept: 'browder-minty-monotone-coercif',
        message: 'Cette justification est fausse : la linéarité ne donne aucun signe.',
        counterexample: t`$B(u)=-u$ est linéaire et non monotone.`,
      },
      {
        conclusion: 'x-mono-coer',
        verdict: 'incorrect',
        concept: 'browder-minty-monotone-coercif',
        message: 'Monotonie et coercivité sont deux hypothèses indépendantes.',
        counterexample: t`$A=0$ est monotone et $\langle Au,u\rangle/\|u\|=0$ ; sur $\mathbb R$, $u\mapsto e^u$ est monotone et non coercive, d'image $]0,+\infty[$.`,
      },
      {
        conclusion: 'coer',
        by: 'j-mono-coer',
        verdict: 'incorrect',
        concept: 'browder-minty-monotone-coercif',
        message: 'La coercivité se vérifie à part : elle n’est pas une conséquence de la monotonie.',
      },
      {
        conclusion: 'x-quad',
        verdict: 'incorrect',
        concept: 'coercivite-non-lineaire',
        message: t`La coercivité d'un opérateur non linéaire demande seulement $\langle Au,u\rangle/\|u\|\to+\infty$ ; la coercivité quadratique en est un cas particulier.`,
        counterexample: t`Sur $\mathbb R$, $A(u)=|u|^{-1/2}u$ (prolongé par $0$) donne $\langle Au,u\rangle/|u|=|u|^{1/2}\to+\infty$, alors que $|u|^{3/2}\ge\alpha u^2$ échoue pour $|u|$ grand.`,
      },
    ],
    removable: [
      {
        hypothesis: 'coer',
        label: 'Ne plus disposer de la coercivité',
        necessary: true,
        explanation: 'Sans coercivité, les solutions approchées ne sont plus bornées et l’existence peut échouer.',
        counterexample: t`Sur $\mathbb R$, $u\mapsto e^u$ est monotone, continue, bornée sur les bornés, et $e^u=-1$ n'a pas de solution.`,
      },
      {
        hypothesis: 'strict',
        label: 'Ne plus disposer de la stricte monotonie',
        necessary: true,
        explanation: 'L’existence subsiste, l’unicité peut tomber.',
        counterexample: t`Sur $\mathbb R$, $A(u)=u-1$ si $u>1$, $0$ si $|u|\le 1$, $u+1$ si $u<-1$ : continue, monotone, coercive, et $Au=0$ pour tout $u\in[-1,1]$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Dans $H=\mathbb R^2$, valeur de $\langle Au-Av,u-v\rangle$ pour $u=(1,2)$ et $v=(3,-1)$`, expected: '13' }],
  solution: t`**Monotonie.** $\langle Au-Av,u-v\rangle=(u-v,u-v)_H=\|u-v\|_H^2\ge 0$, avec inégalité stricte si $u\neq v$.

**Hémicontinuité.** $t\mapsto\langle A(u+tv),w\rangle=(u,w)_H+t(v,w)_H$ est affine, donc continue.

**Coercivité.** $\langle Au,u\rangle/\|u\|_H=\|u\|_H\to+\infty$.

**Bornitude.** $\|Au\|_{H'}=\sup_{\|w\|\le 1}(u,w)_H=\|u\|_H$ par Cauchy–Schwarz.

**Conclusion.** $H$ est réflexif et séparable ; Browder–Minty donne une solution de $Au=f$, unique par stricte monotonie. On retrouve le théorème de Riesz : $u$ est le représentant de $f$.

**Vigilance.** $-I$ est linéaire et non monotone ; $e^u$ est monotone et non coercive. Monotonie et coercivité ne sont pas interchangeables.`,
  steps: [
    t`Calculer $\langle Au-Av,u-v\rangle$.`,
    'Vérifier hémicontinuité, coercivité et bornitude, chacune séparément.',
    'Appliquer Browder–Minty, l’unicité venant de la stricte monotonie.',
  ],
  commonErrors: [
    { id: 'e-lin', description: 'Croire qu’un opérateur linéaire est toujours monotone.', concept: 'browder-minty-monotone-coercif' },
    { id: 'e-coer', description: 'Déduire la coercivité de la monotonie.', concept: 'browder-minty-monotone-coercif' },
    { id: 'e-quad', description: 'Exiger une coercivité quadratique dans Browder–Minty.', concept: 'coercivite-non-lineaire' },
  ],
  hints: [
    t`Que vaut $\langle Au-Av,u-v\rangle$ quand $A$ est l'identification de Riesz ?`,
    'Chaque hypothèse du théorème se vérifie par un calcul d’une ligne ; fais-les toutes, sans en déduire une des autres.',
    t`$\langle Au,u\rangle=\|u\|^2$ et $\|Au\|_{H'}=\|u\|$ ; la stricte monotonie donne l'unicité.`,
  ],
  rubric: rubric({
    hypotheses: 'Les cinq hypothèses de Browder–Minty sont vérifiées une à une.',
    methode: 'Calcul direct de chaque propriété à partir de la définition de A.',
    validite: 'Monotonie et coercivité sont établies séparément.',
    justifications: 'L’unicité est rattachée à la stricte monotonie.',
    conclusion: t`Existence et unicité de la solution de $Au=f$ pour tout $f\in H'$.`,
  }),
  variant: {
    statement: t`Sur $V=\mathbb R$, soit $A(u)=u^3$. Vérifier les hypothèses de Browder–Minty avec stricte monotonie, et résoudre $A(u)=8$.`,
    solution: t`$(u^3-v^3)(u-v)=(u-v)^2(u^2+uv+v^2)$ et $u^2+uv+v^2=(u+v/2)^2+3v^2/4>0$ si $(u,v)\neq(0,0)$ : $A$ est strictement monotone. $A$ est continue, bornée sur les bornés, et $u^4/|u|=|u|^3\to+\infty$. Browder–Minty donne une unique solution de $A(u)=8$, à savoir $u=2$. La coercivité quadratique $u^4\ge\alpha u^2$ échoue près de $0$ : elle n'est pas requise.`,
    closedChecks: [{ kind: 'rational', prompt: t`Solution de $u^3=8$`, expected: '2' }],
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h-R', kind: 'hypothese', text: t`$V=\mathbb R$ est un Banach réel réflexif séparable.` },
        { id: 'd-A', kind: 'definition', text: t`$A(u)=u^3$.` },
        { id: 'fact', kind: 'egalite', text: t`$(u^3-v^3)(u-v)=(u-v)^2(u^2+uv+v^2)$.` },
        { id: 'strict', kind: 'consequence', text: t`$A$ est strictement monotone.` },
        { id: 'autres', kind: 'consequence', text: t`$A$ est continue (donc hémicontinue), bornée sur les bornés, et $u^4/|u|=|u|^3\to+\infty$.` },
        { id: 'thm', kind: 'application-theoreme', text: t`$A(u)=f$ admet une unique solution pour tout $f\in\mathbb R$.` },
        {
          id: 'val',
          kind: 'egalite',
          text: t`La solution de $A(u)=8$ est $u=2$.`,
          masked: t`Solution de $A(u)=8$ : à calculer.`,
          check: { kind: 'rational', prompt: t`Solution de $A(u)=8$`, expected: '2' },
        },
        { id: 'fin', kind: 'conclusion', text: t`$A(u)=u^3$ relève de Browder–Minty, et $A(u)=8$ a pour unique solution $u=2$.` },
        { id: 'x-quad', kind: 'inegalite', distractor: true, after: ['autres'], text: t`Il existe $\alpha>0$ tel que $u^4\ge\alpha u^2$ pour tout $u\in\mathbb R$.` },
      ],
      justifications: [
        { id: 'j-fact', label: t`Factorisation $u^3-v^3=(u-v)(u^2+uv+v^2)$.` },
        { id: 'j-carre', label: t`$u^2+uv+v^2=(u+v/2)^2+3v^2/4>0$ si $(u,v)\neq(0,0)$, et $(u-v)^2>0$ si $u\neq v$.` },
        { id: 'j-poly', label: 'Un polynôme est continu, borné sur les compacts, et le calcul du quotient est direct.' },
        { id: 'j-bm', label: 'Théorème de Browder–Minty.', theorem: 'browder-minty' },
        { id: 'j-calc', label: t`$2^3=8$, et l'unicité exclut toute autre solution.` },
        { id: 'j-syn', label: 'Réunion des résultats établis.' },
      ],
      rules: [
        { from: ['d-A'], to: 'fact', by: 'j-fact' },
        { from: ['fact'], to: 'strict', by: 'j-carre' },
        { from: ['d-A'], to: 'autres', by: 'j-poly' },
        { from: ['h-R', 'strict', 'autres'], to: 'thm', by: 'j-bm' },
        { from: ['thm', 'd-A'], to: 'val', by: 'j-calc' },
        { from: ['thm', 'val'], to: 'fin', by: 'j-syn' },
      ],
      traps: [
        {
          conclusion: 'x-quad',
          verdict: 'incorrect',
          concept: 'coercivite-non-lineaire',
          message: t`La coercivité quadratique échoue près de $0$ ; Browder–Minty ne la demande pas.`,
          counterexample: t`Pour $u=\sqrt{\alpha}/2$ : $u^4=\alpha u^2/4<\alpha u^2$.`,
        },
      ],
      removable: [
        {
          hypothesis: 'strict',
          label: 'Ne plus disposer de la stricte monotonie',
          necessary: true,
          explanation: 'Sans stricte monotonie, l’unicité n’est plus garantie par le théorème.',
          counterexample: t`$A(u)=u^3-u$ est coercive et continue, non monotone, et $A(u)=0$ a trois solutions.`,
        },
      ],
    },
  },
  verification: { ...COMPLEMENT, notes: 'L’exercice figure au polycopié sans corrigé ; vérifications rédigées pour ProofLab.' },
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'browder-minty.intermediaire',
  theoremId: 'browder-minty',
  level: 'intermediaire',
  title: t`Croissance, coercivité, hémicontinuité du $p$-Laplacien`,
  statement: t`Soit $1<p<\infty$, $p'=p/(p-1)$, $\Omega$ borné lipschitzien, $V=W^{1,p}_0(\Omega)$ muni de $\|u\|_V=\|\nabla u\|_{L^p}$, et $\langle Au,v\rangle=\int_\Omega|\nabla u|^{p-2}\nabla u\cdot\nabla v\,dx$. Montrer que $\|Au\|_{V'}\le\|u\|_V^{p-1}$, que $A$ est coercif au sens de la section 7.1, et que $A$ est hémicontinu.`,
  source: poly(44, 'Exercice 32, intermédiaire (p. PDF 44) ; section 7.3 (p. PDF 29–30)'),
  prerequisites: [],
  concepts: ['coercivite-non-lineaire', 'hypotheses-theoreme', 'browder-minty-monotone-coercif', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-p', kind: 'hypothese', text: t`$\Omega$ est borné lipschitzien, $V=W^{1,p}_0(\Omega)$ est muni de $\|u\|_V=\|\nabla u\|_{L^p}$, et $|z|^{p-2}z$ vaut $0$ en $z=0$.` },
      { id: 'h-p1', kind: 'hypothese', text: t`$1<p<\infty$ et $p'=p/(p-1)$.` },
      { id: 'd-A', kind: 'definition', text: t`$\langle Au,v\rangle=\int_\Omega|\nabla u|^{p-2}\nabla u\cdot\nabla v\,dx$.` },
      { id: 'e-exp', kind: 'egalite', text: t`$(p-1)p'=p$, donc $\big\||\nabla u|^{p-1}\big\|_{L^{p'}}=\|\nabla u\|_{L^p}^{p-1}$.` },
      { id: 'holder', kind: 'inegalite', text: t`$|\langle Au,v\rangle|\le\|\nabla u\|_{L^p}^{p-1}\|\nabla v\|_{L^p}$.` },
      { id: 'crois', kind: 'inegalite', text: t`$Au\in V'$ et $\|Au\|_{V'}\le\|u\|_V^{p-1}$ : $A$ est borné sur les bornés.` },
      { id: 'egal', kind: 'egalite', text: t`$\langle Au,u\rangle=\int_\Omega|\nabla u|^p=\|u\|_V^p$.` },
      { id: 'coer', kind: 'consequence', text: t`$\langle Au,u\rangle/\|u\|_V=\|u\|_V^{p-1}\to+\infty$ quand $\|u\|_V\to\infty$.` },
      { id: 'ptw', kind: 'consequence', text: t`Pour $u,v,w\in V$ et $t\to t_0$, $|\nabla(u+tv)|^{p-2}\nabla(u+tv)\cdot\nabla w$ converge presque partout vers sa valeur en $t_0$.` },
      { id: 'dom', kind: 'inegalite', text: t`Pour $|t|\le R$ : $\big||\nabla(u+tv)|^{p-2}\nabla(u+tv)\cdot\nabla w\big|\le C_{p,R}\big(|\nabla u|^{p-1}+|\nabla v|^{p-1}\big)|\nabla w|\in L^1(\Omega)$.` },
      { id: 'hemi', kind: 'consequence', text: t`$t\mapsto\langle A(u+tv),w\rangle$ est continue : $A$ est hémicontinu.` },
      { id: 'fin', kind: 'conclusion', text: t`$A:V\to V'$ vérifie $\|Au\|_{V'}\le\|u\|_V^{p-1}$, est coercif et hémicontinu.` },
      { id: 'x-quad', kind: 'inegalite', distractor: true, after: ['egal'], text: t`Il existe $\alpha>0$ tel que $\langle Au,u\rangle\ge\alpha\|u\|_V^2$ pour tout $u\in V$.` },
    ],
    justifications: [
      { id: 'j-exp', label: t`$(p-1)\cdot\frac{p}{p-1}=p$, puis calcul de la norme $L^{p'}$.` },
      { id: 'j-holder', label: t`Inégalité de Hölder avec les exposants conjugués $p'$ et $p$.`, theorem: 'holder' },
      { id: 'j-dual', label: t`Définition de la norme duale, et linéarité de $v\mapsto\langle Au,v\rangle$.` },
      { id: 'j-egal', label: t`Prendre $v=u$ : $|\nabla u|^{p-2}\nabla u\cdot\nabla u=|\nabla u|^p$.` },
      { id: 'j-coer', label: t`Division par $\|u\|_V$, et $p-1>0$.` },
      { id: 'j-cont', label: t`$z\mapsto|z|^{p-2}z$ est continue sur $\mathbb R^d$, y compris en $0$ lorsque $p<2$, car $\big||z|^{p-2}z\big|=|z|^{p-1}\to 0$.` },
      { id: 'j-dom', label: t`$|\nabla u+t\nabla v|^{p-1}\le(|\nabla u|+R|\nabla v|)^{p-1}$, convexité ou sous-additivité de $s\mapsto s^{p-1}$, puis Hölder.` },
      { id: 'j-cvd', label: 'Théorème de convergence dominée.', theorem: 'convergence-dominee' },
      { id: 'j-syn', label: 'Réunion des trois propriétés.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-cs-L2', label: t`Cauchy–Schwarz dans $L^2$ : $|\langle Au,v\rangle|\le\big\||\nabla u|^{p-1}\big\|_{L^2}\|\nabla v\|_{L^2}$.` },
      { id: 'j-mono', label: t`La monotonie stricte de $A$ entraîne sa coercivité.` },
      { id: 'j-evident', label: 'C’est évident.' },
    ],
    rules: [
      { from: ['h-p1'], to: 'e-exp', by: 'j-exp' },
      { from: ['d-A', 'e-exp'], to: 'holder', by: 'j-holder' },
      { from: ['holder', 'h-p'], to: 'crois', by: 'j-dual' },
      { from: ['d-A', 'h-p'], to: 'egal', by: 'j-egal' },
      { from: ['egal', 'h-p1'], to: 'coer', by: 'j-coer' },
      { from: ['d-A', 'h-p'], to: 'ptw', by: 'j-cont' },
      { from: ['d-A', 'e-exp'], to: 'dom', by: 'j-dom' },
      { from: ['ptw', 'dom'], to: 'hemi', by: 'j-cvd' },
      { from: ['crois', 'coer', 'hemi'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-quad',
        verdict: 'incorrect',
        concept: 'coercivite-non-lineaire',
        message: t`Pour $p\neq 2$, $\langle Au,u\rangle=\|u\|_V^p$ n'est pas minoré par $\alpha\|u\|_V^2$ : c'est la coercivité au sens de la section 7.1, non la coercivité quadratique, qui est vérifiée.`,
        counterexample: t`Pour $u=s u_0$ : $\langle Au,u\rangle=s^p\|u_0\|_V^p$, et $s^p<\alpha s^2\|u_0\|_V^{2-p}$ pour $s$ grand si $p<2$, pour $s$ petit si $p>2$.`,
      },
      {
        conclusion: 'holder',
        by: 'j-cs-L2',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Pour $p<2$, $\nabla v$ n'est pas de carré intégrable en général : seule la paire d'exposants $(p',p)$ convient.`,
        counterexample: t`Pour $p=\frac32$ sur $]0,1[$, $v(x)=x^{1/2}(1-x)$ appartient à $W^{1,3/2}_0$, et $v'\notin L^2$ car $|v'|^2$ se comporte comme $\frac1{4x}$ près de $0$.`,
      },
      {
        conclusion: 'coer',
        by: 'j-mono',
        verdict: 'incorrect',
        concept: 'browder-minty-monotone-coercif',
        message: 'Monotonie et coercivité sont des hypothèses distinctes : la coercivité se calcule ici directement.',
        counterexample: t`Sur $\mathbb R$, $u\mapsto\arctan u$ est strictement monotone et non coercive.`,
      },
      {
        conclusion: 'hemi',
        by: 'j-evident',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: 'L’hémicontinuité demande un passage à la limite sous l’intégrale : il faut une domination.',
      },
    ],
    removable: [
      {
        hypothesis: 'h-p1',
        label: t`Retirer $p>1$`,
        necessary: true,
        explanation: t`Pour $p=1$, $p'=p/(p-1)$ n'est plus un réel (l'exposant conjugué de $1$ est $+\infty$) et la coercivité est perdue.`,
        counterexample: t`Pour $p=1$ : $\langle Au,u\rangle/\|u\|_V=\int|\nabla u|/\|\nabla u\|_{L^1}=1$ ne tend pas vers $+\infty$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Exposant conjugué $p'$ pour $p=3$`, expected: '3/2' }],
  solution: t`**Croissance.** Comme $(p-1)p'=p$, $\||\nabla u|^{p-1}\|_{L^{p'}}=\|\nabla u\|_{L^p}^{p-1}$. Hölder donne $|\langle Au,v\rangle|\le\|\nabla u\|_{L^p}^{p-1}\|\nabla v\|_{L^p}$, donc $\|Au\|_{V'}\le\|u\|_V^{p-1}$ : $A$ envoie $V$ dans $V'$ et est borné sur les bornés.

**Coercivité.** $\langle Au,u\rangle=\int|\nabla u|^p=\|u\|_V^p$, donc $\langle Au,u\rangle/\|u\|_V=\|u\|_V^{p-1}\to+\infty$ puisque $p>1$. Ce n'est pas une coercivité quadratique si $p\neq 2$.

**Hémicontinuité.** $z\mapsto|z|^{p-2}z$ est continue sur $\mathbb R^d$ (en $0$, sa norme vaut $|z|^{p-1}\to 0$), d'où la convergence presque partout de l'intégrande quand $t\to t_0$. Pour $|t|\le R$, l'intégrande est dominé par $C_{p,R}(|\nabla u|^{p-1}+|\nabla v|^{p-1})|\nabla w|$, intégrable par Hölder. La convergence dominée conclut.`,
  steps: [
    t`Calculer la norme $L^{p'}$ de $|\nabla u|^{p-1}$, puis appliquer Hölder.`,
    t`Tester par $v=u$ pour la coercivité.`,
    'Continuité ponctuelle de l’intégrande, puis domination uniforme en t.',
  ],
  commonErrors: [
    { id: 'e-quad', description: 'Confondre la coercivité de la section 7.1 avec la coercivité quadratique.', concept: 'coercivite-non-lineaire' },
    { id: 'e-L2', description: t`Employer Cauchy–Schwarz dans $L^2$ au lieu de Hölder $(p',p)$.`, concept: 'hypotheses-theoreme' },
    { id: 'e-dom', description: 'Passer à la limite sous l’intégrale sans domination.', concept: 'justification-absente' },
  ],
  hints: [
    t`Quel couple d'exposants conjugués fait apparaître exactement $\|\nabla v\|_{L^p}$ ?`,
    t`Calcule $\||\nabla u|^{p-1}\|_{L^{p'}}$ grâce à $(p-1)p'=p$ ; pour la coercivité, prends $v=u$.`,
    t`Pour l'hémicontinuité : continuité de $z\mapsto|z|^{p-2}z$, puis domination par $C(|\nabla u|^{p-1}+|\nabla v|^{p-1})|\nabla w|$ pour $|t|\le R$.`,
  ],
  rubric: rubric({
    hypotheses: t`Le rôle de $p>1$ et de l'exposant conjugué est explicité.`,
    methode: 'Hölder pour la croissance, test par u pour la coercivité, convergence dominée pour l’hémicontinuité.',
    validite: t`La continuité de $|z|^{p-2}z$ en $0$ est traitée pour $p<2$.`,
    justifications: 'La domination est explicite et uniforme sur un intervalle borné de t.',
    conclusion: 'Les trois propriétés sont établies.',
  }),
  variant: {
    statement: t`Sur $V=\mathbb R^2$ euclidien, soit $A(z)=|z|^2z$. Vérifier croissance, coercivité et hémicontinuité, et calculer $\langle A(z),z\rangle$ pour $z=(1,1)$.`,
    solution: t`$|A(z)|=|z|^3$ : croissance de degré $3$, et $A$ est borné sur les bornés. $\langle A(z),z\rangle=|z|^4$, donc $\langle A(z),z\rangle/|z|=|z|^3\to+\infty$. $A$ est polynomiale, donc continue, a fortiori hémicontinue. Pour $z=(1,1)$ : $|z|^2=2$ et $\langle A(z),z\rangle=|z|^4=4$.`,
    closedChecks: [{ kind: 'rational', prompt: t`Valeur de $\langle A(z),z\rangle$ pour $z=(1,1)$`, expected: '4' }],
  },
  verification: { ...FROM_POLY, notes: 'Démonstration de la section 7.3 (p. PDF 29–30), détaillée.' },
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'browder-minty.difficile',
  theoremId: 'browder-minty',
  level: 'difficile',
  title: 'Galerkin stationnaire et argument de Minty',
  statement: t`Soit $V$ un Banach réel réflexif séparable, $A:V\to V'$ monotone, hémicontinu, coercif et borné sur les bornés, et $f\in V'$. Reconstruire la preuve de l'existence d'un $u\in V$ tel que $Au=f$ : approximation de Galerkin, bornes, extraction, identification de la limite duale, puis argument de Minty.`,
  source: poly(44, 'Exercice 32, difficile (p. PDF 44) ; démonstration de la section 7.2 (p. PDF 28–29)'),
  prerequisites: [],
  concepts: ['nonlinearite-limite-faible', 'faible-fort', 'bornee-non-convergente', 'browder-minty-monotone-coercif'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    paths: [
      { id: 'direct', label: 'Argument de Minty rédigé directement' },
      { id: 'lemme', label: 'Lemme d’identification de Minty' },
    ],
    nodes: [
      { id: 'h-V', kind: 'hypothese', text: t`$V$ est un Banach réel réflexif séparable ; $(e_k)$ est une suite libre dont les combinaisons linéaires sont denses, et $V_n=\mathrm{Vect}(e_1,\dots,e_n)$.` },
      { id: 'h-mono', kind: 'hypothese', text: t`$A$ est monotone.` },
      { id: 'h-hemi', kind: 'hypothese', text: t`$A$ est hémicontinu.` },
      { id: 'h-coer', kind: 'hypothese', text: t`$A$ est coercif : $\langle Au,u\rangle/\|u\|_V\to+\infty$ quand $\|u\|_V\to\infty$.` },
      { id: 'h-borne', kind: 'hypothese', text: t`$A$ est borné sur les bornés.` },
      { id: 'h-f', kind: 'definition', local: true, text: t`Soit $f\in V'$.` },
      { id: 'gal', kind: 'application-theoreme', text: t`Pour tout $n$, il existe $u_n\in V_n$ tel que $\langle Au_n,v\rangle=\langle f,v\rangle$ pour tout $v\in V_n$.` },
      { id: 'bound', kind: 'consequence', text: t`$(u_n)$ est bornée dans $V$ et $(Au_n)$ est bornée dans $V'$.` },
      { id: 'ext', kind: 'application-theoreme', text: t`Après extraction : $u_n\rightharpoonup u$ dans $V$ et $Au_n\rightharpoonup\chi$ dans $V'$.` },
      { id: 'chi', kind: 'egalite', text: t`$\chi=f$.` },
      { id: 'ident', kind: 'egalite', text: t`$\langle Au_n,u_n\rangle=\langle f,u_n\rangle\to\langle f,u\rangle$.` },
      { id: 'mlim', kind: 'inegalite', text: t`$\langle f-Av,u-v\rangle\ge 0$ pour tout $v\in V$.` },
      { id: 'hem', kind: 'inegalite', text: t`$\langle f-Au,w\rangle\ge 0$ pour tout $w\in V$.` },
      { id: 'ls', kind: 'egalite', text: t`$\limsup_n\langle Au_n,u_n-u\rangle=\lim_n\big(\langle f,u_n\rangle-\langle Au_n,u\rangle\big)=0$.` },
      { id: 'eq', kind: 'egalite', text: t`$Au=f$.` },
      { id: 'fin', kind: 'conclusion', text: t`Pour tout $f\in V'$, il existe $u\in V$ tel que $Au=f$.` },
      { id: 'x-weak', kind: 'consequence', distractor: true, after: ['ext'], text: t`$u_n\rightharpoonup u$ entraîne $Au_n\rightharpoonup Au$, donc $\chi=Au$ sans autre argument.` },
      { id: 'x-fort', kind: 'consequence', distractor: true, after: ['bound'], text: t`Une sous-suite de $(u_n)$ converge fortement dans $V$.` },
    ],
    justifications: [
      { id: 'j-brouwer', label: t`Sur $V_n\simeq\mathbb R^n$, $c\mapsto\big(\langle A(\sum c_ke_k)-f,e_j\rangle\big)_j$ est continue (monotonie et hémicontinuité en dimension finie) et, par coercivité, de produit scalaire positif avec $c$ sur une grande sphère : Brouwer fournit un zéro.`, theorem: 'brouwer' },
      { id: 'j-borne', label: t`$v=u_n$ donne $\langle Au_n,u_n\rangle=\langle f,u_n\rangle\le\|f\|_{V'}\|u_n\|_V$ ; la coercivité borne $(u_n)$, puis la bornitude sur les bornés borne $(Au_n)$.` },
      { id: 'j-extr', label: t`Extraction faible dans les espaces réflexifs $V$ et $V'$.`, theorem: 'extraction-reflexive' },
      { id: 'j-dens', label: t`$\langle Au_n,e_k\rangle=\langle f,e_k\rangle$ pour $n\ge k$ ; à la limite $\langle\chi,e_k\rangle=\langle f,e_k\rangle$, puis densité des combinaisons des $e_k$.` },
      { id: 'j-test', label: t`Équation de Galerkin avec $v=u_n\in V_n$, puis convergence faible de $u_n$ testée contre $f$ fixé.` },
      { id: 'j-minty', label: t`$0\le\langle Au_n-Av,u_n-v\rangle=\langle Au_n,u_n\rangle-\langle Au_n,v\rangle-\langle Av,u_n-v\rangle$ : chaque terme converge, vers $\langle f,u\rangle$, $\langle f,v\rangle$ et $\langle Av,u-v\rangle$.` },
      { id: 'j-hemi', label: t`$v=u-tw$, $t>0$ : $\langle f-A(u-tw),w\rangle\ge 0$ ; hémicontinuité quand $t\downarrow 0$.` },
      { id: 'j-signe', label: t`Remplacer $w$ par $-w$ donne l'inégalité inverse.` },
      { id: 'j-ls', label: t`$\langle Au_n,u_n-u\rangle=\langle f,u_n\rangle-\langle Au_n,u\rangle$, et chaque terme tend vers $\langle f,u\rangle$.` },
      { id: 'j-lemme', label: 'Lemme d’identification de Minty.', theorem: 'minty' },
      { id: 'j-arb', label: t`$f\in V'$ est arbitraire.` },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-prod', label: t`Le crochet de deux suites faiblement convergentes converge vers le crochet des limites : $\langle Au_n,u_n\rangle\to\langle\chi,u\rangle$.` },
      { id: 'j-weak', label: t`$A$ est continu pour les convergences faibles.` },
    ],
    rules: [
      { from: ['h-V', 'h-mono', 'h-hemi', 'h-coer', 'h-f'], to: 'gal', by: 'j-brouwer' },
      { from: ['gal', 'h-coer', 'h-borne'], to: 'bound', by: 'j-borne' },
      { from: ['bound', 'h-V'], to: 'ext', by: 'j-extr' },
      { from: ['ext', 'gal', 'h-V'], to: 'chi', by: 'j-dens' },
      { from: ['gal', 'ext'], to: 'ident', by: 'j-test' },
      { from: ['ident', 'ext', 'chi', 'h-mono'], to: 'mlim', by: 'j-minty', path: 'direct' },
      { from: ['mlim', 'h-hemi'], to: 'hem', by: 'j-hemi', path: 'direct' },
      { from: ['hem'], to: 'eq', by: 'j-signe', path: 'direct' },
      { from: ['ident', 'ext', 'chi'], to: 'ls', by: 'j-ls', path: 'lemme' },
      { from: ['ls', 'ext', 'chi', 'h-mono', 'h-hemi'], to: 'eq', by: 'j-lemme', path: 'lemme' },
      { from: ['eq', 'h-f'], to: 'fin', by: 'j-arb' },
    ],
    traps: [
      {
        conclusion: 'x-weak',
        verdict: 'incorrect',
        concept: 'nonlinearite-limite-faible',
        message: t`Un opérateur non linéaire n'est pas continu pour la convergence faible : identifier $\chi$ est tout l'enjeu de l'argument de Minty.`,
        counterexample: t`$V=L^4(]0,1[)$, $A(u)=u^3$, $u_n=1+\sin(2\pi nx)\rightharpoonup 1$, mais $u_n^3\rightharpoonup\frac52\neq 1=A(1)$.`,
      },
      {
        conclusion: 'x-fort',
        verdict: 'incorrect',
        concept: 'bornee-non-convergente',
        message: 'En dimension infinie, une suite bornée n’a en général qu’une sous-suite faiblement convergente.',
        counterexample: t`$V=\ell^2$, $f=0$, $(e_k)$ la base canonique, et $A=\nabla\Phi$ avec $\Phi(u)=\max(\|u\|-1,0)^2$ convexe, soit $A(u)=2\max(\|u\|-1,0)\,\frac{u}{\|u\|}$ et $A=0$ sur la boule unité : $A$ est monotone, continu, coercif et borné sur les bornés. Comme $Ae_n=0$, $u_n=e_n\in V_n$ est une solution de Galerkin ; or $\|e_n-e_m\|=\sqrt2$ pour $n\neq m$.`,
      },
      {
        conclusion: 'ident',
        by: 'j-prod',
        verdict: 'incorrect',
        concept: 'nonlinearite-limite-faible',
        message: t`Le crochet de deux suites faiblement convergentes ne passe pas à la limite en général. Ici la limite vient de l'équation : $\langle Au_n,u_n\rangle=\langle f,u_n\rangle$.`,
        counterexample: t`Dans $\ell^2$, $e_n\rightharpoonup 0$ et $\langle e_n,e_n\rangle=1\not\to 0$.`,
      },
      {
        conclusion: 'eq',
        by: 'j-weak',
        verdict: 'incorrect',
        concept: 'nonlinearite-limite-faible',
        message: 'Cette justification est fausse : la monotonie et l’hémicontinuité remplacent une continuité faible qui n’existe pas.',
        counterexample: t`$A(u)=u^3$ sur $L^4(]0,1[)$ et $u_n=1+\sin(2\pi nx)$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-coer',
        label: 'Retirer la coercivité',
        necessary: true,
        explanation: 'Sans coercivité, ni le zéro de Brouwer ni la borne uniforme ne sont garantis.',
        counterexample: t`Sur $V=\mathbb R$, $u\mapsto e^u$ est monotone, continue, bornée sur les bornés, et $e^u=-1$ n'a pas de solution.`,
      },
      {
        hypothesis: 'h-hemi',
        label: 'Retirer l’hémicontinuité',
        necessary: true,
        explanation: 'Sans hémicontinuité, le passage $t\\downarrow 0$ est impossible.',
        counterexample: t`Sur $\mathbb R$, $A(u)=u-1$ si $u<0$ et $A(u)=u+1$ si $u\ge 0$ : monotone, coercif, borné sur les bornés, et $A(u)=0$ n'a pas de solution.`,
      },
      {
        hypothesis: 'h-mono',
        label: 'Retirer la monotonie',
        necessary: true,
        explanation: 'Sans monotonie, l’identification de la limite échoue en dimension infinie.',
        counterexample: t`Dans $\ell^2$, $F(x)=\big(\sqrt{1-\|x\|^2},x_1,x_2,\dots\big)$ envoie la boule unité dans elle-même sans point fixe ; avec $r$ la rétraction radiale sur la boule, $A(u)=u-F(r(u))$ est continu, coercif, borné sur les bornés, et ne s'annule jamais.`,
      },
    ],
  },
  solution: t`**1. Galerkin.** Sur $V_n\simeq\mathbb R^n$, le champ $c\mapsto(\langle A(\sum c_ke_k)-f,e_j\rangle)_j$ est continu (un opérateur monotone hémicontinu est continu en dimension finie) et son produit scalaire avec $c$ vaut $\langle Au,u\rangle-\langle f,u\rangle>0$ pour $|c|$ grand, par coercivité et équivalence des normes. Brouwer fournit un zéro : $u_n\in V_n$ avec $\langle Au_n,v\rangle=\langle f,v\rangle$ pour $v\in V_n$.

**2. Bornes.** Avec $v=u_n$ : $\langle Au_n,u_n\rangle=\langle f,u_n\rangle\le\|f\|\,\|u_n\|$ ; la coercivité borne $(u_n)$, puis $(Au_n)$ est bornée.

**3. Extraction et $\chi=f$.** $u_n\rightharpoonup u$ et $Au_n\rightharpoonup\chi$ par réflexivité. Pour $n\ge k$, $\langle Au_n,e_k\rangle=\langle f,e_k\rangle$, d'où $\langle\chi,e_k\rangle=\langle f,e_k\rangle$ et $\chi=f$ par densité.

**4. Minty.** $0\le\langle Au_n-Av,u_n-v\rangle=\langle f,u_n\rangle-\langle Au_n,v\rangle-\langle Av,u_n-v\rangle\to\langle f-Av,u-v\rangle$. Avec $v=u-tw$ et $t\downarrow 0$ : $\langle f-Au,w\rangle\ge 0$ pour tout $w$, puis pour $-w$ : $Au=f$. Variante : $\limsup\langle Au_n,u_n-u\rangle=0$ et le lemme de Minty donne $\chi=Au$.

**Point clé.** $\langle Au_n,u_n\rangle$ ne converge pas par « produit de limites faibles » : sa limite vient de l'équation de Galerkin.`,
  steps: [
    'Résoudre le problème de Galerkin par Brouwer.',
    'Borner les approximations par la coercivité, puis leurs images.',
    t`Extraire, et identifier la limite duale $\chi=f$ par densité.`,
    t`Passer à la limite dans la monotonie grâce à $\langle Au_n,u_n\rangle=\langle f,u_n\rangle$, puis conclure par hémicontinuité.`,
  ],
  commonErrors: [
    { id: 'e-weak', description: t`Affirmer $Au_n\rightharpoonup Au$ à partir de $u_n\rightharpoonup u$.`, concept: 'nonlinearite-limite-faible' },
    { id: 'e-prod', description: t`Passer à la limite dans $\langle Au_n,u_n\rangle$ comme dans un produit de limites faibles.`, concept: 'nonlinearite-limite-faible' },
    { id: 'e-fort', description: 'Extraire une sous-suite fortement convergente d’une suite seulement bornée.', concept: 'bornee-non-convergente' },
  ],
  hints: [
    t`Quel théorème de point fixe résout un problème non linéaire en dimension finie ? Quelle hypothèse donne une borne uniforme ?`,
    t`Après extraction, il y a deux limites, $u$ et $\chi$. L'équation de Galerkin identifie $\chi$ ; il reste à montrer $\chi=Au$.`,
    t`Écris $0\le\langle Au_n-Av,u_n-v\rangle$, remplace $\langle Au_n,u_n\rangle$ par $\langle f,u_n\rangle$, passe à la limite, puis prends $v=u-tw$.`,
  ],
  rubric: rubric({
    hypotheses: 'Chacune des hypothèses intervient à l’étape où elle est nécessaire.',
    methode: 'Galerkin, bornes, extraction, identification, Minty.',
    validite: t`Aucune continuité faible de $A$ n'est supposée ; $\langle Au_n,u_n\rangle$ est traité par l'équation.`,
    justifications: 'Le passage t↓0 utilise explicitement l’hémicontinuité.',
    conclusion: t`$Au=f$ est obtenu pour $f$ arbitraire.`,
  }),
  variant: {
    statement: t`Même cadre, avec de plus $A$ strictement monotone. Montrer l'unicité de la solution de $Au=f$, puis que toute la suite de Galerkin converge faiblement vers elle.`,
    solution: t`Si $Au=Av=f$ avec $u\neq v$, la stricte monotonie donne $0=\langle Au-Av,u-v\rangle>0$, contradiction. Toute sous-suite de $(u_n)$, bornée, a une sous-suite faiblement convergente, dont la limite résout $Au=f$ par l'argument précédent : c'est l'unique solution $u$. Une suite bornée d'un réflexif dont toutes les valeurs d'adhérence faibles valent $u$ converge faiblement vers $u$.`,
  },
  verification: FROM_POLY,
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT32: TheoremModule = {
  theorem: {
    id: 'browder-minty',
    spaces: [
      t`$V$ : Banach réel, réflexif et séparable ; $V'$ son dual, $\langle\cdot,\cdot\rangle$ le crochet de dualité.`,
      t`$A:V\to V'$ : opérateur non linéaire, défini sur tout $V$.`,
    ],
    hypotheses: [
      {
        id: 'h-mono',
        text: t`$A$ est monotone : $\langle Au-Av,u-v\rangle\ge 0$.`,
        whenRemoved: t`Dans $\ell^2$, avec $F(x)=(\sqrt{1-\|x\|^2},x_1,x_2,\dots)$ sans point fixe sur la boule unité et $r$ la rétraction radiale, $A(u)=u-F(r(u))$ est continu, coercif, borné sur les bornés, et ne s'annule pas.`,
      },
      {
        id: 'h-hemi',
        text: t`$A$ est hémicontinu : $t\mapsto\langle A(u+tv),w\rangle$ est continue.`,
        whenRemoved: t`Sur $\mathbb R$, $A(u)=u-1$ pour $u<0$, $u+1$ pour $u\ge 0$ : monotone, coercif, borné sur les bornés, et $0$ n'est pas atteint.`,
      },
      {
        id: 'h-coer',
        text: t`$A$ est coercif : $\langle Au,u\rangle/\|u\|_V\to+\infty$ quand $\|u\|_V\to\infty$.`,
        whenRemoved: t`Sur $\mathbb R$, $u\mapsto e^u$ est monotone, continue, bornée sur les bornés, d'image $]0,+\infty[$.`,
      },
      { id: 'h-borne', text: t`$A$ est borné sur les bornés : $\sup_{\|u\|_V\le R}\|Au\|_{V'}<\infty$ pour tout $R>0$.` },
    ],
    statement: t`Si $V$ est un Banach réel, réflexif et séparable, et si $A:V\to V'$ est monotone, hémicontinu, coercif et borné sur les parties bornées, alors
$$\forall f\in V',\ \exists u\in V : Au=f.$$
Si $A$ est strictement monotone, cette solution est unique.`,
    conclusions: {
      existence: t`Approximations de Galerkin $u_n\in V_n$ par Brouwer, extraction faible, identification de la limite par l'argument de Minty.`,
      unicite: t`Si $A$ est strictement monotone, $Au=Av=f$ entraîne $0=\langle Au-Av,u-v\rangle>0$ pour $u\neq v$, contradiction.`,
    },
    sourceProof: 'complete',
    proofOutline: [
      t`Galerkin : $V_n=\mathrm{Vect}(e_1,\dots,e_n)$ ; le champ des coefficients est continu et dirigé vers l'extérieur d'une grande boule (coercivité) ; Brouwer donne $u_n$ avec $\langle Au_n,v\rangle=\langle f,v\rangle$ pour $v\in V_n$.`,
      t`Bornes : $\langle Au_n,u_n\rangle=\langle f,u_n\rangle\le\|f\|\|u_n\|$ ; $(u_n)$ bornée par coercivité, $(Au_n)$ bornée par hypothèse.`,
      t`Extraction : $u_n\rightharpoonup u$, $Au_n\rightharpoonup\chi$ ; $\langle\chi,e_k\rangle=\langle f,e_k\rangle$ pour tout $k$, donc $\chi=f$.`,
      t`Minty : $0\le\langle Au_n-Av,u_n-v\rangle$ et $\langle Au_n,u_n\rangle=\langle f,u_n\rangle$ donnent $\langle f-Av,u-v\rangle\ge 0$ ; $v=u-tw$, $t\downarrow 0$ et $w\mapsto -w$ donnent $Au=f$.`,
      'Unicité par stricte monotonie.',
    ],
    warnings: [
      'La coercivité d’un opérateur non linéaire n’est pas la coercivité quadratique d’une forme bilinéaire.',
      'Monotonie et coercivité ne sont pas interchangeables : chacune se vérifie.',
      t`La difficulté n'est pas d'obtenir une limite $u$, mais de prouver que la limite du terme non linéaire est $A(u)$.`,
    ],
    usefulFor: t`Équations elliptiques non linéaires dont l'opérateur n'est pas continu pour la convergence faible, comme le $p$-Laplacien.`,
    verification: { ...FROM_POLY, notes: 'Démonstration du polycopié (p. PDF 28–29), le lemme de dimension finie étant détaillé.' },
  },
  definitions: [
    {
      id: 'operateur-monotone',
      term: 'Opérateur monotone, strictement monotone',
      statement: t`$A:V\to V'$ est monotone si $\langle Au-Av,u-v\rangle\ge 0$ pour tous $u,v\in V$, strictement monotone si l'inégalité est stricte pour $u\neq v$.`,
      source: poly(28, 'Définitions, section 7.1'),
    },
    {
      id: 'operateur-hemicontinu-coercif',
      term: 'Opérateur hémicontinu, coercif',
      statement: t`$A$ est hémicontinu si $t\mapsto\langle A(u+tv),w\rangle$ est continue pour tous $u,v,w\in V$ ; coercif si $\langle Au,u\rangle/\|u\|_V\to+\infty$ quand $\|u\|_V\to\infty$.`,
      source: poly(28, 'Définitions, section 7.1'),
    },
  ],
  concepts: [
    {
      id: 'browder-minty-monotone-coercif',
      label: 'Monotonie et coercivité',
      reminder: t`Monotonie et coercivité sont indépendantes : $e^u$ est monotone non coercive, $u^3-u$ est coercive non monotone.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-bm-coercivite',
      theoremId: 'browder-minty',
      title: 'Monotone sans coercivité',
      claim: 'Tout opérateur monotone et continu de ℝ dans ℝ est surjectif.',
      correctStatement: 'Browder–Minty exige en plus la coercivité.',
      task: t`Pour $A(u)=e^u$ sur $\mathbb R$, donne la borne inférieure de l'image de $A$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\inf_{u\in\mathbb R}e^u$`, expected: '0' },
      explanation: t`$e^u$ est strictement croissante, donc monotone, et continue ; son image est $]0,+\infty[$ : aucun $f\le 0$ n'est atteint. La coercivité échoue : $e^u u/|u|\to 0$ quand $u\to-\infty$.`,
      concept: 'browder-minty-monotone-coercif',
      source: poly(28, 'Section 7.2 (hypothèse de coercivité)'),
    },
    {
      id: 'ce-bm-monotonie',
      theoremId: 'browder-minty',
      title: 'Coercif sans monotonie',
      claim: 'Un opérateur continu et coercif de ℝ dans ℝ définit une équation à solution unique.',
      correctStatement: 'L’unicité dans Browder–Minty repose sur la stricte monotonie.',
      task: t`Pour $A(u)=u^3-u$, compte les solutions de $A(u)=0$.`,
      check: { kind: 'rational', prompt: t`Nombre de solutions de $u^3-u=0$`, expected: '3' },
      explanation: t`$A$ est continue et coercive ($(u^4-u^2)/|u|\to+\infty$), non monotone ($A'(0)=-1$), et $u^3-u=u(u-1)(u+1)$ s'annule en $-1$, $0$, $1$.`,
      concept: 'browder-minty-monotone-coercif',
      source: poly(28, 'Section 7.2 (unicité par stricte monotonie)'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT32;
