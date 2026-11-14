/**
 * Résultat 16 — Séminorme de Gagliardo (polycopié, section 4.4, p. PDF 18–19).
 * Identité dans [0,+∞] : [u]²_{H^s} = C_{d,s} ∫ |ξ|^{2s} |û|², pour 0 < s < 1 et u ∈ L²(ℝ^d).
 */
import { t, rubric, poly, FROM_POLY, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'gagliardo.facile',
  theoremId: 'gagliardo',
  level: 'facile',
  title: t`La séminorme de $H^{1/2}(\mathbb R)$`,
  statement: t`On se place en dimension $d=1$, avec $s=\frac12$. Écrire exactement la séminorme $[u]^2_{H^{1/2}(\mathbb R)}$ de $u\in L^2(\mathbb R)$ et sa forme de Fourier. Montrer ensuite qu'aucune constante $C$ ne vérifie $\|w\|_{L^2}\le C\,[w]_{H^{1/2}(\mathbb R)}$ pour tout $w\in H^{1/2}(\mathbb R)$ : la séminorme seule ne remplace pas la norme de $H^{1/2}(\mathbb R)$.`,
  source: poly(41, 'Exercice 16, facile ; énoncé de Gagliardo, section 4.4 (p. PDF 18)'),
  prerequisites: [],
  concepts: ['gagliardo-exposant', 'gagliardo-seminorme', 'calcul-exact'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-u', kind: 'hypothese', text: t`$u\in L^2(\mathbb R)$.` },
      { id: 'd-gen', kind: 'definition', text: t`Pour $0<s<1$ et $v\in L^2(\mathbb R^d)$ : $[v]^2_{H^s}=\displaystyle\iint_{\mathbb R^d\times\mathbb R^d}\frac{|v(x)-v(y)|^2}{|x-y|^{d+2s}}\,dx\,dy\in[0,+\infty]$.` },
      { id: 'd-par', kind: 'definition', text: t`On prend $d=1$ et $s=\frac12$.` },
      {
        id: 'c-exp',
        kind: 'egalite',
        text: t`L'exposant du dénominateur vaut $d+2s=2$.`,
        masked: t`Exposant du dénominateur pour $d=1$ et $s=\frac12$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $d+2s$`, expected: '2' },
      },
      { id: 'c-form', kind: 'egalite', text: t`$[u]^2_{H^{1/2}(\mathbb R)}=\displaystyle\iint_{\mathbb R^2}\frac{|u(x)-u(y)|^2}{|x-y|^2}\,dx\,dy$.` },
      { id: 't-four', kind: 'application-theoreme', text: t`$[u]^2_{H^{1/2}(\mathbb R)}=C_{1,1/2}\displaystyle\int_{\mathbb R}|\xi|\,|\hat u(\xi)|^2\,d\xi$ dans $[0,+\infty]$, avec $C_{1,1/2}\in]0,+\infty[$ ; et $u\in H^{1/2}(\mathbb R)$ si et seulement si $[u]_{H^{1/2}(\mathbb R)}<+\infty$.` },
      { id: 'd-dil', kind: 'definition', local: true, text: t`Soient $v\in H^{1/2}(\mathbb R)$ non nulle, $\lambda>0$ et $v_\lambda(x)=v(x/\lambda)$.` },
      { id: 'c-l2', kind: 'egalite', text: t`$\|v_\lambda\|^2_{L^2}=\lambda\,\|v\|^2_{L^2}$.` },
      { id: 'c-inv', kind: 'egalite', text: t`$[v_\lambda]^2_{H^{1/2}(\mathbb R)}=[v]^2_{H^{1/2}(\mathbb R)}$.` },
      { id: 'c-contra', kind: 'contradiction', text: t`Si l'on avait $\|w\|_{L^2}\le C\,[w]_{H^{1/2}}$ pour tout $w\in H^{1/2}(\mathbb R)$, on aurait $\lambda\|v\|^2_{L^2}\le C^2[v]^2_{H^{1/2}}<+\infty$ pour tout $\lambda>0$ : c'est impossible, car $v\neq 0$.` },
      { id: 'fin', kind: 'conclusion', text: t`$[u]^2_{H^{1/2}(\mathbb R)}=\iint_{\mathbb R^2}\frac{|u(x)-u(y)|^2}{|x-y|^2}\,dx\,dy=C_{1,1/2}\int_{\mathbb R}|\xi||\hat u|^2\,d\xi$. Cette séminorme, invariante par dilatation, ne contrôle pas $\|u\|_{L^2}$ : elle ne remplace pas la norme de $H^{1/2}(\mathbb R)$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-exp32', kind: 'egalite', distractor: true, text: t`$[u]^2_{H^{1/2}(\mathbb R)}=\displaystyle\iint_{\mathbb R^2}\frac{|u(x)-u(y)|^2}{|x-y|^{3/2}}\,dx\,dy$.` },
      { id: 'x-exp1', kind: 'egalite', distractor: true, text: t`$[u]^2_{H^{1/2}(\mathbb R)}=\displaystyle\iint_{\mathbb R^2}\frac{|u(x)-u(y)|^2}{|x-y|}\,dx\,dy$.` },
      { id: 'x-borne', kind: 'inegalite', distractor: true, after: ['c-inv'], text: t`Il existe $C>0$ tel que $\|w\|_{L^2}\le C\,[w]_{H^{1/2}(\mathbb R)}$ pour tout $w\in H^{1/2}(\mathbb R)$.` },
    ],
    justifications: [
      { id: 'j-calc', label: t`Calcul direct de $d+2s$.` },
      { id: 'j-subst', label: t`Substitution de $d$ et de l'exposant dans la définition générale.` },
      { id: 'j-gagliardo', label: 'Théorème de Gagliardo.', theorem: 'gagliardo' },
      { id: 'j-cdv-1', label: t`Changement de variable $x=\lambda x'$ dans $\int_{\mathbb R}|v(x/\lambda)|^2\,dx$.` },
      { id: 'j-cdv-2', label: t`Changement de variables $(x,y)=(\lambda x',\lambda y')$ : jacobien $\lambda^2$, dénominateur $\lambda^2|x'-y'|^2$.` },
      { id: 'j-lambda', label: t`$v_\lambda\in L^2$ et $[v_\lambda]<+\infty$, donc $v_\lambda\in H^{1/2}$ ; puis $\lambda\to+\infty$ avec $\|v\|_{L^2}>0$.` },
      { id: 'j-syn', label: 'Réunion : formule exacte, forme de Fourier, défaut de contrôle de la norme.' },
      // Justification séduisante et fausse.
      { id: 'j-jac-faux', label: t`Le changement de variables $(x,y)=(\lambda x',\lambda y')$ a pour jacobien $\lambda$.` },
    ],
    rules: [
      { from: ['d-par'], to: 'c-exp', by: 'j-calc' },
      { from: ['d-gen', 'c-exp', 'h-u'], to: 'c-form', by: 'j-subst' },
      { from: ['h-u', 'd-par'], to: 't-four', by: 'j-gagliardo' },
      { from: ['d-dil'], to: 'c-l2', by: 'j-cdv-1' },
      { from: ['d-dil', 'c-form'], to: 'c-inv', by: 'j-cdv-2' },
      { from: ['c-l2', 'c-inv', 't-four'], to: 'c-contra', by: 'j-lambda' },
      { from: ['c-form', 't-four', 'c-contra'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'c-inv',
        by: 'j-jac-faux',
        verdict: 'incorrect',
        concept: 'calcul-exact',
        message: t`Deux variables changent : le jacobien vaut $\lambda^2$. Avec $\lambda$, on obtiendrait à tort $[v_\lambda]^2=\lambda^{-1}[v]^2$.`,
      },
      {
        conclusion: 'x-exp32',
        verdict: 'incorrect',
        concept: 'gagliardo-exposant',
        message: t`L'exposant est $d+2s$, et non $d+s$ : avec $|x-y|^{3/2}$, on écrit la séminorme de $H^{1/4}(\mathbb R)$.`,
        counterexample: t`Pour $u=\mathbb 1_{]0,1[}$, l'intégrale avec $|x-y|^{3/2}$ vaut $16$, alors que $[u]^2_{H^{1/2}(\mathbb R)}=+\infty$ : $\int_0^1\big(x^{-1}+(1-x)^{-1}\big)dx$ diverge.`,
      },
      {
        conclusion: 'x-exp1',
        verdict: 'incorrect',
        concept: 'gagliardo-exposant',
        message: t`Cet exposant oublie la dimension : $2s$ au lieu de $d+2s$. L'intégrale obtenue est infinie pour toute $u\in L^2(\mathbb R)$ non nulle.`,
        counterexample: t`En posant $y=x+h$, l'intégrale vaut $\int_{\mathbb R}\|u(\cdot+h)-u\|^2_{L^2}\frac{dh}{|h|}$ ; or $\|u(\cdot+h)-u\|^2_{L^2}\to 2\|u\|^2_{L^2}>0$ quand $|h|\to+\infty$, et $\int^{+\infty}\frac{dh}{h}=+\infty$.`,
      },
      {
        conclusion: 'x-borne',
        verdict: 'incorrect',
        concept: 'gagliardo-seminorme',
        message: t`La séminorme est invariante par dilatation en dimension $1$ pour $s=\frac12$, alors que la norme $L^2$ ne l'est pas : aucune constante ne convient.`,
        counterexample: t`Pour $v\in H^{1/2}(\mathbb R)$ non nulle et $v_\lambda=v(\cdot/\lambda)$ : $\|v_\lambda\|^2_{L^2}=\lambda\|v\|^2_{L^2}\to+\infty$, tandis que $[v_\lambda]_{H^{1/2}}=[v]_{H^{1/2}}$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-u',
        label: t`Retirer $u\in L^2(\mathbb R)$`,
        necessary: true,
        explanation: t`La caractérisation de $H^{1/2}$ par la séminorme exige $u\in L^2$ : la séminorme seule ne voit pas les constantes.`,
        counterexample: t`$u\equiv 1$ vérifie $[u]_{H^{1/2}(\mathbb R)}=0$, mais $u\notin L^2(\mathbb R)$, donc $u\notin H^{1/2}(\mathbb R)$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Valeur exacte de $C_{1,1/2}/\pi$, où $C_{1,1/2}=\int_{\mathbb R}\frac{|e^{iz}-1|^2}{z^2}\,dz$.`, expected: '2' }],
  solution: t`**Formule.** Pour $d=1$ et $s=\frac12$, l'exposant vaut $d+2s=2$ :
$$[u]^2_{H^{1/2}(\mathbb R)}=\iint_{\mathbb R^2}\frac{|u(x)-u(y)|^2}{|x-y|^2}\,dx\,dy\in[0,+\infty].$$
Le théorème de Gagliardo donne $[u]^2_{H^{1/2}}=C_{1,1/2}\int_{\mathbb R}|\xi||\hat u(\xi)|^2\,d\xi$, avec $C_{1,1/2}=\int_{\mathbb R}\frac{2-2\cos z}{z^2}\,dz=2\pi$ (intégration par parties, puis $\int_0^{+\infty}\frac{\sin z}{z}\,dz=\frac\pi2$), et $u\in H^{1/2}(\mathbb R)$ si et seulement si $u\in L^2$ et $[u]_{H^{1/2}}<+\infty$.

**Dilatations.** Pour $v\in H^{1/2}(\mathbb R)$ non nulle et $v_\lambda=v(\cdot/\lambda)$ : $\|v_\lambda\|^2_{L^2}=\lambda\|v\|^2_{L^2}$, et le changement de variables $(x,y)=(\lambda x',\lambda y')$, de jacobien $\lambda^2$, donne $[v_\lambda]^2=[v]^2$. Une inégalité $\|w\|_{L^2}\le C[w]_{H^{1/2}}$ donnerait $\lambda\|v\|^2_{L^2}\le C^2[v]^2$ pour tout $\lambda>0$, ce qui est absurde. La norme de $H^{1/2}$ contient donc nécessairement le terme $\|u\|_{L^2}$.

**Pièges d'exposant.** Avec $|x-y|^{3/2}$, on écrit la séminorme de $H^{1/4}$ ; avec $|x-y|$, l'intégrale est infinie pour toute $u\neq 0$.`,
  steps: [
    t`Calculer l'exposant $d+2s$ et l'insérer dans la définition.`,
    t`Écrire la forme de Fourier donnée par le théorème.`,
    t`Comparer le comportement de $\|\cdot\|_{L^2}$ et de $[\cdot]_{H^{1/2}}$ sous les dilatations.`,
    t`Conclure par l'absurde à l'absence de constante.`,
  ],
  commonErrors: [
    { id: 'e-exposant', description: t`Écrire $|x-y|^{d+s}$ ou $|x-y|^{2s}$ au lieu de $|x-y|^{d+2s}$.`, concept: 'gagliardo-exposant' },
    { id: 'e-norme', description: t`Prendre la séminorme pour une norme équivalente à celle de $H^{1/2}$.`, concept: 'gagliardo-seminorme' },
    { id: 'e-jacobien', description: t`Oublier qu'un changement de variables sur $\mathbb R^2$ a pour jacobien $\lambda^2$.`, concept: 'calcul-exact' },
  ],
  hints: [
    t`La définition générale fait intervenir $|x-y|^{d+2s}$ : que vaut cet exposant ici ? Que dit le théorème côté Fourier ?`,
    t`Pour la seconde partie, cherche une famille de fonctions dont la séminorme reste fixe alors que la norme $L^2$ explose.`,
    t`Prends $v_\lambda(x)=v(x/\lambda)$ : calcule $\|v_\lambda\|^2_{L^2}$ et $[v_\lambda]^2_{H^{1/2}}$ par changement de variables, puis fais tendre $\lambda$ vers $+\infty$.`,
  ],
  rubric: rubric({
    hypotheses: t`$u\in L^2(\mathbb R)$ est explicitement supposée, et le rôle de cette hypothèse dans la caractérisation est identifié.`,
    methode: 'Substitution dans la définition, puis argument de dilatation.',
    validite: t`Exposant $2$, jacobien $\lambda^2$, et puissances de $\lambda$ correctes.`,
    justifications: 'Le théorème est invoqué pour la forme de Fourier et la caractérisation, non pour l’absence de constante.',
    conclusion: t`La formule exacte est écrite et l'inégalité $\|w\|_{L^2}\le C[w]_{H^{1/2}}$ est réfutée.`,
  }),
  variant: {
    statement: t`Soit $u=\mathbb 1_{]0,1[}\in L^2(\mathbb R)$. Déterminer les $s\in]0,1[$ tels que $u\in H^s(\mathbb R)$, et calculer $[u]^2_{H^{1/4}(\mathbb R)}$.`,
    solution: t`Hors d'un ensemble négligeable, $|u(x)-u(y)|^2$ vaut $1$ si exactement l'un des points $x,y$ est dans $]0,1[$, et $0$ sinon. Par Tonelli et symétrie,
$$[u]^2_{H^s}=2\int_0^1\int_{\mathbb R\setminus]0,1[}\frac{dy}{|x-y|^{1+2s}}\,dx=2\int_0^1\frac{x^{-2s}+(1-x)^{-2s}}{2s}\,dx.$$
Cette intégrale est finie si et seulement si $2s<1$, et vaut alors $\frac{2}{s(1-2s)}$. Comme $u\in L^2$, le théorème donne $u\in H^s(\mathbb R)\iff s<\frac12$. Pour $s=\frac14$ : $[u]^2_{H^{1/4}}=\frac{2}{\frac14\cdot\frac12}=16$. Le cas limite $s=\frac12$ est exclu : $\int_0^1x^{-1}\,dx=+\infty$.`,
    closedChecks: [{ kind: 'rational', prompt: t`Valeur de $[u]^2_{H^{1/4}(\mathbb R)}$`, expected: '16' }],
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'd-u', kind: 'definition', text: t`$u=\mathbb 1_{]0,1[}\in L^2(\mathbb R)$ et $s\in]0,1[$.` },
        { id: 'e-sym', kind: 'egalite', text: t`$[u]^2_{H^s}=2\displaystyle\int_0^1\int_{\mathbb R\setminus]0,1[}\frac{dy}{|x-y|^{1+2s}}\,dx$.` },
        { id: 'e-y', kind: 'egalite', text: t`Pour $x\in]0,1[$ : $\displaystyle\int_{\mathbb R\setminus]0,1[}\frac{dy}{|x-y|^{1+2s}}=\frac{x^{-2s}+(1-x)^{-2s}}{2s}$.` },
        { id: 'e-val', kind: 'egalite', text: t`$[u]^2_{H^s}=\frac1s\displaystyle\int_0^1\big(x^{-2s}+(1-x)^{-2s}\big)\,dx$, fini si et seulement si $s<\frac12$, et alors égal à $\frac{2}{s(1-2s)}$.` },
        { id: 't-car', kind: 'application-theoreme', text: t`Comme $u\in L^2(\mathbb R)$ : $u\in H^s(\mathbb R)\iff[u]_{H^s}<+\infty$.` },
        { id: 'c-rep', kind: 'consequence', text: t`$u\in H^s(\mathbb R)$ si et seulement si $s<\frac12$.` },
        {
          id: 'c-val',
          kind: 'egalite',
          text: t`$[u]^2_{H^{1/4}(\mathbb R)}=16$.`,
          masked: t`Valeur de $[u]^2_{H^{1/4}(\mathbb R)}$ : à calculer.`,
          check: { kind: 'rational', prompt: t`Valeur de $[u]^2_{H^{1/4}(\mathbb R)}$`, expected: '16' },
        },
        { id: 'fin', kind: 'conclusion', text: t`$\mathbb 1_{]0,1[}\in H^s(\mathbb R)$ exactement pour $0<s<\frac12$, et $[\mathbb 1_{]0,1[}]^2_{H^{1/4}}=16$.` },
        { id: 'x-demi', kind: 'consequence', distractor: true, text: t`$\mathbb 1_{]0,1[}\in H^{1/2}(\mathbb R)$, puisque la fonction est bornée et à support compact.` },
        { id: 'x-val', kind: 'egalite', distractor: true, after: ['e-y'], text: t`$[u]^2_{H^{1/4}(\mathbb R)}=8$.` },
      ],
      justifications: [
        { id: 'j-supp', label: t`$|u(x)-u(y)|^2=1$ si exactement un des points est dans $]0,1[$, $0$ sinon ; Tonelli et symétrie en $(x,y)$.`, theorem: 'tonelli' },
        { id: 'j-primitive', label: t`Primitive de $t^{-1-2s}$ sur $[x,+\infty[$ et sur $[1-x,+\infty[$.` },
        { id: 'j-integre', label: t`Report, puis intégrabilité de $x^{-2s}$ en $0$ si et seulement si $2s<1$.` },
        { id: 'j-gagliardo', label: 'Théorème de Gagliardo (caractérisation de $H^s$).', theorem: 'gagliardo' },
        { id: 'j-combine', label: 'Combinaison de la caractérisation et du calcul.' },
        { id: 'j-eval', label: t`Évaluation de $\frac{2}{s(1-2s)}$ en $s=\frac14$.` },
        { id: 'j-syn', label: 'Réunion des deux résultats.' },
        { id: 'j-borne', label: t`$u$ est bornée à support compact, donc sa séminorme est finie pour tout $s\in]0,1[$.` },
      ],
      rules: [
        { from: ['d-u'], to: 'e-sym', by: 'j-supp' },
        { from: ['d-u'], to: 'e-y', by: 'j-primitive' },
        { from: ['e-sym', 'e-y'], to: 'e-val', by: 'j-integre' },
        { from: ['d-u'], to: 't-car', by: 'j-gagliardo' },
        { from: ['e-val', 't-car'], to: 'c-rep', by: 'j-combine' },
        { from: ['e-val'], to: 'c-val', by: 'j-eval' },
        { from: ['c-rep', 'c-val'], to: 'fin', by: 'j-syn' },
      ],
      traps: [
        {
          conclusion: 'e-val',
          by: 'j-borne',
          verdict: 'incorrect',
          concept: 'gagliardo-integrabilite',
          message: t`La bornitude ne contrôle pas la singularité de $|x-y|^{-1-2s}$ près du saut : la finitude dépend de $s$.`,
          counterexample: t`Pour $s=\frac12$ : $\int_0^1x^{-1}\,dx=+\infty$, donc $[\mathbb 1_{]0,1[}]_{H^{1/2}}=+\infty$.`,
        },
        {
          conclusion: 'x-demi',
          verdict: 'incorrect',
          concept: 'gagliardo-integrabilite',
          message: t`Le cas limite $s=\frac12$ est exclu : le saut de l'indicatrice rend l'intégrale divergente.`,
          counterexample: t`$\frac1s\int_0^1\big(x^{-2s}+(1-x)^{-2s}\big)dx$ diverge pour $s=\frac12$.`,
        },
        {
          conclusion: 'x-val',
          verdict: 'incorrect',
          concept: 'calcul-exact',
          message: t`Le facteur $2$ vient de la symétrie : les couples avec $x\in]0,1[$, $y\notin]0,1[$ et ceux avec $x\notin]0,1[$, $y\in]0,1[$ contribuent autant.`,
        },
      ],
      removable: [],
    },
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'gagliardo.intermediaire',
  theoremId: 'gagliardo',
  level: 'intermediaire',
  title: t`Des différences $u(x+h)-u(x)$ au multiplicateur $|\xi|^{2s}$`,
  statement: t`Soient $0<s<1$ et $u\in L^2(\mathbb R^d)$. En partant des différences $u(x+h)-u(x)$, démontrer que $[u]^2_{H^s}=C_{d,s}\int_{\mathbb R^d}|\xi|^{2s}|\hat u(\xi)|^2\,d\xi$ dans $[0,+\infty]$, avec $C_{d,s}\in]0,+\infty[$ indépendante de $u$.`,
  source: poly(41, 'Exercice 16, intermédiaire ; démonstration de la section 4.4 (p. PDF 19)'),
  prerequisites: [],
  concepts: ['gagliardo-identite', 'gagliardo-exposant', 'gagliardo-integrabilite', 'utilisation-prematuree'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-u', kind: 'hypothese', text: t`$u\in L^2(\mathbb R^d)$.` },
      { id: 'h-s', kind: 'hypothese', text: t`$0<s<1$.` },
      { id: 'd-gag', kind: 'definition', text: t`$[u]^2_{H^s}=\displaystyle\iint_{\mathbb R^d\times\mathbb R^d}\frac{|u(x)-u(y)|^2}{|x-y|^{d+2s}}\,dx\,dy\in[0,+\infty]$ ; pour $h\in\mathbb R^d$, $\tau_hu=u(\cdot+h)$.` },
      { id: 'e-cdv', kind: 'egalite', text: t`$[u]^2_{H^s}=\displaystyle\int_{\mathbb R^d}|h|^{-d-2s}\,\|\tau_hu-u\|^2_{L^2}\,dh$.` },
      { id: 'e-planch', kind: 'egalite', text: t`Pour tout $h\in\mathbb R^d$ : $\|\tau_hu-u\|^2_{L^2}=\displaystyle\int_{\mathbb R^d}|e^{i\xi\cdot h}-1|^2\,|\hat u(\xi)|^2\,d\xi$.` },
      { id: 'e-tonelli', kind: 'egalite', text: t`$[u]^2_{H^s}=\displaystyle\int_{\mathbb R^d}|\hat u(\xi)|^2\,\Phi(\xi)\,d\xi$, où $\Phi(\xi)=\displaystyle\int_{\mathbb R^d}\frac{|e^{i\xi\cdot h}-1|^2}{|h|^{d+2s}}\,dh\in[0,+\infty]$.` },
      {
        id: 'e-echelle',
        kind: 'egalite',
        text: t`Pour $\xi\neq 0$ et $\omega=\xi/|\xi|$ : $\Phi(\xi)=|\xi|^{2s}\displaystyle\int_{\mathbb R^d}\frac{|e^{i\omega\cdot z}-1|^2}{|z|^{d+2s}}\,dz$.`,
        masked: t`Pour $\xi\neq 0$ : $\Phi(\xi)$ s'écrit comme une puissance de $|\xi|$ fois une intégrale en $z$ ; exposant à déterminer.`,
        check: { kind: 'expr-equiv', prompt: t`Exposant de $|\xi|$ après le changement de variable $z=|\xi|h$, en fonction de d et s.`, expected: '2*s', vars: ['d', 's'] },
      },
      { id: 'e-rot', kind: 'egalite', text: t`L'intégrale en $z$ ne dépend pas de $\omega\in S^{d-1}$ ; on la note $C_{d,s}$, de sorte que $\Phi(\xi)=C_{d,s}|\xi|^{2s}$ pour $\xi\neq 0$.` },
      { id: 'e-cst', kind: 'inegalite', text: t`$0<C_{d,s}<+\infty$.` },
      { id: 'fin', kind: 'conclusion', text: t`$[u]^2_{H^s}=C_{d,s}\displaystyle\int_{\mathbb R^d}|\xi|^{2s}|\hat u(\xi)|^2\,d\xi$ dans $[0,+\infty]$, avec $C_{d,s}\in]0,+\infty[$ indépendante de $u$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-jac', kind: 'egalite', distractor: true, after: ['e-tonelli'], text: t`Pour $\xi\neq 0$ : $\Phi(\xi)=|\xi|^{d+2s}\displaystyle\int_{\mathbb R^d}\frac{|e^{i\omega\cdot z}-1|^2}{|z|^{d+2s}}\,dz$.` },
      { id: 'x-sans-carre', kind: 'egalite', distractor: true, text: t`$\|\tau_hu-u\|_{L^2}=\displaystyle\int_{\mathbb R^d}|e^{i\xi\cdot h}-1|\,|\hat u(\xi)|\,d\xi$.` },
    ],
    justifications: [
      { id: 'j-cdv', label: t`Changement de variable $y=x+h$ à $x$ fixé, puis Tonelli : l'intégrande est positif.`, theorem: 'tonelli' },
      { id: 'j-planch', label: t`Plancherel appliqué à $\tau_hu-u$, avec $\widehat{\tau_hu}=e^{i\xi\cdot h}\hat u$ (calcul sur $\mathcal S$, puis densité dans $L^2$).`, theorem: 'plancherel' },
      { id: 'j-tonelli', label: t`Interversion des intégrales en $h$ et en $\xi$ d'une fonction mesurable positive.`, theorem: 'tonelli' },
      { id: 'j-echelle', label: t`Changement de variable $z=|\xi|h$ : $dh=|\xi|^{-d}dz$ et $|h|^{-d-2s}=|\xi|^{d+2s}|z|^{-d-2s}$.` },
      { id: 'j-rot', label: t`Substitution $z=\rho z'$, où $\rho$ est une rotation envoyant $\omega$ sur $\omega'$ : $\omega'\cdot\rho z'=\omega\cdot z'$, $|\rho z'|=|z'|$, jacobien $1$.` },
      { id: 'j-cst', label: t`$|e^{it}-1|^2\le\min(t^2,4)$ : $|z|^{2-d-2s}$ est intégrable près de $0$ car $s<1$, $|z|^{-d-2s}$ à l'infini car $s>0$ ; l'intégrande est positif et non presque partout nul.` },
      { id: 'j-conclut', label: t`Report de $\Phi(\xi)=C_{d,s}|\xi|^{2s}$, le point $\xi=0$ étant négligeable.` },
      // Justifications séduisantes et fausses.
      { id: 'j-fubini', label: 'Théorème de Fubini : on intervertit les deux intégrales.' },
      { id: 'j-gagliardo', label: 'Théorème de Gagliardo.', theorem: 'gagliardo' },
    ],
    rules: [
      { from: ['h-u', 'd-gag'], to: 'e-cdv', by: 'j-cdv' },
      { from: ['h-u', 'd-gag'], to: 'e-planch', by: 'j-planch' },
      { from: ['e-cdv', 'e-planch'], to: 'e-tonelli', by: 'j-tonelli' },
      { from: ['e-tonelli'], to: 'e-echelle', by: 'j-echelle' },
      { from: ['e-echelle'], to: 'e-rot', by: 'j-rot' },
      { from: ['e-rot', 'h-s'], to: 'e-cst', by: 'j-cst' },
      { from: ['e-tonelli', 'e-rot', 'e-cst'], to: 'fin', by: 'j-conclut' },
    ],
    traps: [
      {
        conclusion: 'e-tonelli',
        by: 'j-fubini',
        verdict: 'incorrect',
        concept: 'gagliardo-identite',
        message: t`Fubini exige l'intégrabilité de la fonction, inconnue a priori : c'est précisément ce que l'identité caractérise. Pour une fonction positive, Tonelli s'applique sans condition, dans $[0,+\infty]$.`,
        counterexample: t`Pour $d=1$, $s=\frac12$ et $u=\mathbb 1_{]0,1[}$, l'intégrale double vaut $+\infty$ : la fonction n'est pas intégrable, Fubini ne s'applique pas, Tonelli si.`,
      },
      {
        conclusion: 'x-jac',
        verdict: 'incorrect',
        concept: 'gagliardo-exposant',
        message: t`Le jacobien du changement de variable $z=|\xi|h$ vaut $|\xi|^{-d}$ : il compense le $|\xi|^{d}$ de $|h|^{-d-2s}$, et il ne reste que $|\xi|^{2s}$.`,
        counterexample: t`Pour $u\in\mathcal S(\mathbb R)$ et $s=\frac12$, on obtiendrait $\int|\xi|^2|\hat u|^2=\|u'\|^2_{L^2}$, qui n'est pas invariant par la dilatation $u\mapsto u(\cdot/\lambda)$, alors que $[u]^2_{H^{1/2}(\mathbb R)}$ l'est.`,
      },
      {
        conclusion: 'x-sans-carre',
        verdict: 'incorrect',
        concept: 'gagliardo-identite',
        message: t`Plancherel identifie des normes $L^2$, donc des intégrales de carrés : $\|\tau_hu-u\|^2_{L^2}=\int|e^{i\xi\cdot h}-1|^2|\hat u|^2$.`,
        counterexample: t`$d=1$, $\hat u=\mathbb 1_{[0,1]}$, $h=\pi$ : le membre de gauche vaut $\sqrt 2$, celui de droite $\int_0^12\sin(\pi\xi/2)\,d\xi=\frac4\pi$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-s',
        label: t`Retirer $0<s<1$`,
        necessary: true,
        explanation: t`La constante $C_{d,s}$ n'est finie et non nulle que pour $0<s<1$ : la divergence a lieu en $0$ si $s\ge1$, à l'infini si $s\le 0$.`,
        counterexample: t`Pour $s=1$ : $|e^{iz_1}-1|^2\ge\frac{4}{\pi^2}z_1^2$ si $|z_1|\le\pi$, et $\int_{|z|\le\pi}z_1^2|z|^{-d-2}\,dz=+\infty$, donc $C_{d,1}=+\infty$.`,
      },
    ],
  },
  solution: t`**Différences.** Avec $y=x+h$ à $x$ fixé puis Tonelli (intégrande positif) :
$$[u]^2_{H^s}=\int_{\mathbb R^d}|h|^{-d-2s}\,\|\tau_hu-u\|^2_{L^2}\,dh.$$

**Plancherel.** $\widehat{\tau_hu}=e^{i\xi\cdot h}\hat u$ (calcul sur $\mathcal S$, puis densité), donc $\|\tau_hu-u\|^2_{L^2}=\int|e^{i\xi\cdot h}-1|^2|\hat u(\xi)|^2\,d\xi$.

**Tonelli.** La fonction $(h,\xi)\mapsto|h|^{-d-2s}|e^{i\xi\cdot h}-1|^2|\hat u(\xi)|^2$ est mesurable positive : $[u]^2_{H^s}=\int|\hat u(\xi)|^2\Phi(\xi)\,d\xi$, avec $\Phi(\xi)=\int|e^{i\xi\cdot h}-1|^2|h|^{-d-2s}\,dh$. Fubini ne conviendrait pas : l'intégrabilité est inconnue a priori.

**Changement d'échelle et rotation.** Pour $\xi\neq0$, $z=|\xi|h$ donne $dh=|\xi|^{-d}dz$ et $|h|^{-d-2s}=|\xi|^{d+2s}|z|^{-d-2s}$, d'où $\Phi(\xi)=|\xi|^{2s}\int|e^{i\omega\cdot z}-1|^2|z|^{-d-2s}\,dz$ avec $\omega=\xi/|\xi|$. Une rotation envoyant $\omega$ sur $e_1$ montre que cette intégrale vaut $C_{d,s}=\int|e^{iz_1}-1|^2|z|^{-d-2s}\,dz$.

**Constante.** $|e^{it}-1|^2\le\min(t^2,4)$ : l'intégrande est majoré par $|z|^{2-d-2s}$ près de $0$ (intégrable car $s<1$) et par $4|z|^{-d-2s}$ à l'infini (intégrable car $s>0$). Il est positif et non nul presque partout, donc $0<C_{d,s}<+\infty$. Le point $\xi=0$ est négligeable, d'où l'identité.`,
  steps: [
    t`Réécrire l'intégrale double avec $h=y-x$ et la norme de $\tau_hu-u$.`,
    t`Appliquer Plancherel à $\tau_hu-u$.`,
    t`Intervertir les intégrales par Tonelli.`,
    t`Changement d'échelle $z=|\xi|h$, puis invariance par rotation.`,
    t`Vérifier $0<C_{d,s}<+\infty$.`,
  ],
  commonErrors: [
    { id: 'e-fubini', description: 'Invoquer Fubini sans intégrabilité : seul Tonelli s’applique ici, dans $[0,+\\infty]$.', concept: 'gagliardo-identite' },
    { id: 'e-jacobien', description: t`Oublier le jacobien $|\xi|^{-d}$ et obtenir $|\xi|^{d+2s}$.`, concept: 'gagliardo-exposant' },
    { id: 'e-carre', description: t`Appliquer Plancherel à une intégrale de modules au lieu d'une intégrale de carrés.`, concept: 'gagliardo-identite' },
  ],
  hints: [
    t`Transforme d'abord l'intégrale double en une intégrale en $h$ de normes $L^2$ : que devient une translation après transformée de Fourier ?`,
    t`Après Plancherel, intervertis les intégrales en justifiant l'interversion, puis isole la fonction $\Phi(\xi)$ de la seule variable $\xi$.`,
    t`Dans $\Phi(\xi)$, pose $z=|\xi|h$ : le jacobien $|\xi|^{-d}$ compense une partie de $|h|^{-d-2s}$. Une rotation rend l'intégrale restante indépendante de la direction de $\xi$.`,
  ],
  rubric: rubric({
    hypotheses: t`$u\in L^2$ et $0<s<1$ sont utilisées aux bons endroits : Plancherel et finitude de la constante.`,
    methode: 'Différences, Plancherel, Tonelli, changement d’échelle, rotation.',
    validite: t`L'exposant final est $2s$ ; le jacobien est correct.`,
    justifications: 'L’interversion est justifiée par Tonelli ; la constante est montrée finie et non nulle.',
    conclusion: t`L'identité est établie dans $[0,+\infty]$, avec une constante indépendante de $u$.`,
  }),
  variant: {
    statement: t`Soient $0<s<2$ et $u\in L^2(\mathbb R^d)$. Montrer que $\iint\frac{|u(x+h)+u(x-h)-2u(x)|^2}{|h|^{d+2s}}\,dx\,dh=\tilde C_{d,s}\int|\xi|^{2s}|\hat u(\xi)|^2\,d\xi$ dans $[0,+\infty]$, avec $\tilde C_{d,s}\in]0,+\infty[$.`,
    solution: t`La transformée de $\tau_hu+\tau_{-h}u-2u$ est $(2\cos(\xi\cdot h)-2)\hat u$. Par Plancherel puis Tonelli, l'intégrale vaut $\int|\hat u(\xi)|^2\Psi(\xi)\,d\xi$, avec $\Psi(\xi)=\int(2-2\cos(\xi\cdot h))^2|h|^{-d-2s}\,dh$. Le changement d'échelle $z=|\xi|h$ et une rotation donnent $\Psi(\xi)=\tilde C_{d,s}|\xi|^{2s}$. Comme $(2-2\cos t)^2\le\min(t^4,16)$, la constante est finie dès que $4-2s>0$ et $s>0$ : la seconde différence autorise $s<2$.`,
  },
  verification: FROM_POLY,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'gagliardo.difficile',
  theoremId: 'gagliardo',
  level: 'difficile',
  title: 'Intégrabilité de l’intégrale radiale de la constante',
  statement: t`Soient $d\ge 1$, $s\in\mathbb R$, et $C_{d,s}=\int_{\mathbb R^d}\frac{|e^{iz_1}-1|^2}{|z|^{d+2s}}\,dz\in[0,+\infty]$. Écrire cette constante comme une intégrale radiale et montrer que $C_{d,s}<+\infty$ si et seulement si $0<s<1$, en localisant la divergence dans chacun des cas exclus.`,
  source: poly(41, 'Exercice 16, difficile ; constante de la section 4.4 (p. PDF 19)'),
  prerequisites: [],
  concepts: ['gagliardo-integrabilite', 'gagliardo-exposant', 'inegalite-stricte-limite'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'd-C', kind: 'definition', text: t`$C_{d,s}=\displaystyle\int_{\mathbb R^d}\frac{E(z_1)}{|z|^{d+2s}}\,dz\in[0,+\infty]$, où $E(t)=|e^{it}-1|^2=2-2\cos t$.` },
      { id: 'e-polaire', kind: 'egalite', text: t`$C_{d,s}=\displaystyle\int_0^{+\infty}r^{-1-2s}F(r)\,dr$, où $F(r)=\displaystyle\int_{S^{d-1}}E(r\omega_1)\,d\sigma(\omega)$, $\sigma$ étant la mesure de surface (le comptage sur $\{\pm1\}$ si $d=1$).` },
      { id: 'e-encadre', kind: 'inegalite', text: t`Avec $A=\int_{S^{d-1}}\omega_1^2\,d\sigma>0$ : $F(r)\le\min\big(Ar^2,4|S^{d-1}|\big)$ pour tout $r>0$, et $F(r)\ge\frac{4A}{\pi^2}r^2$ pour $0<r\le\pi$.` },
      { id: 'h-cas1', kind: 'definition', local: true, text: t`Cas $0<s<1$.` },
      {
        id: 'c-zero',
        kind: 'inegalite',
        text: t`$\displaystyle\int_0^1r^{-1-2s}F(r)\,dr\le A\int_0^1r^{1-2s}\,dr=\frac{A}{2-2s}<+\infty$.`,
        masked: t`Majoration près de $0$ : condition de convergence à déterminer.`,
        check: { kind: 'rational', prompt: t`Valeur critique $s_0$ : $\int_0^1r^{1-2s}\,dr$ converge si et seulement si $s<s_0$.`, expected: '1' },
      },
      {
        id: 'c-inf',
        kind: 'inegalite',
        text: t`$\displaystyle\int_1^{+\infty}r^{-1-2s}F(r)\,dr\le 4|S^{d-1}|\int_1^{+\infty}r^{-1-2s}\,dr=\frac{2|S^{d-1}|}{s}<+\infty$.`,
        masked: t`Majoration à l'infini : condition de convergence à déterminer.`,
        check: { kind: 'rational', prompt: t`Valeur critique $s_1$ : $\int_1^{+\infty}r^{-1-2s}\,dr$ converge si et seulement si $s>s_1$.`, expected: '0' },
      },
      { id: 'c-cv', kind: 'inegalite', text: t`Pour $0<s<1$ : $0<C_{d,s}\le\frac{A}{2-2s}+\frac{2|S^{d-1}|}{s}$.` },
      { id: 'h-cas2', kind: 'definition', local: true, text: t`Cas $s\ge 1$.` },
      { id: 'c-div0', kind: 'inegalite', text: t`$\displaystyle\int_0^\pi r^{-1-2s}F(r)\,dr\ge\frac{4A}{\pi^2}\int_0^\pi r^{1-2s}\,dr=+\infty$ : divergence en $0$, et $C_{d,s}=+\infty$.` },
      { id: 'h-cas3', kind: 'definition', local: true, text: t`Cas $s\le 0$.` },
      { id: 'c-divinf', kind: 'inegalite', text: t`$\displaystyle\int_1^{+\infty}r^{-1-2s}F(r)\,dr\ge\int_{S^{d-1}}\Big(\int_{|\omega_1|}^{+\infty}E(\rho)\,\frac{d\rho}{\rho}\Big)d\sigma(\omega)=+\infty$ : divergence à l'infini, et $C_{d,s}=+\infty$.` },
      { id: 'fin', kind: 'conclusion', text: t`$C_{d,s}<+\infty$ si et seulement si $0<s<1$, et alors $C_{d,s}\in]0,+\infty[$. La divergence a lieu en $0$ pour $s\ge 1$, à l'infini pour $s\le 0$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-s1', kind: 'inegalite', distractor: true, text: t`$C_{d,1}<+\infty$.` },
      { id: 'x-jac', kind: 'consequence', distractor: true, after: ['e-polaire'], text: t`Près de $0$, la condition de convergence est $2-d-2s>-1$.` },
      { id: 'x-osc', kind: 'inegalite', distractor: true, text: t`$C_{d,0}<+\infty$ : le cosinus oscille et ses contributions se compensent à l'infini.` },
    ],
    justifications: [
      { id: 'j-polaire', label: t`Coordonnées polaires $z=r\omega$ : $dz=r^{d-1}dr\,d\sigma(\omega)$ et $|z|^{-d-2s}=r^{-d-2s}$ ; Tonelli.`, theorem: 'tonelli' },
      { id: 'j-sinus', label: t`$E(t)=4\sin^2(t/2)$, avec $|\sin x|\le\min(|x|,1)$ et $|\sin x|\ge\frac{2}{\pi}|x|$ pour $|x|\le\frac\pi2$ ; intégration sur la sphère, où $|\omega_1|\le 1$.` },
      { id: 'j-maj0', label: t`Majoration $F(r)\le Ar^2$ sur $]0,1]$, puis intégrabilité de $r^{1-2s}$ en $0$.` },
      { id: 'j-majinf', label: t`Majoration $F(r)\le 4|S^{d-1}|$ sur $[1,+\infty[$, puis intégrabilité de $r^{-1-2s}$ à l'infini.` },
      { id: 'j-somme', label: t`Somme des deux morceaux ; $F\ge 0$ et $F>0$ sur un ensemble de mesure positive.` },
      { id: 'j-min0', label: t`Minoration $F(r)\ge\frac{4A}{\pi^2}r^2$ sur $]0,\pi]$, et $1-2s\le -1$.` },
      { id: 'j-divinf', label: t`Pour $r\ge1$ et $s\le 0$, $r^{-1-2s}\ge r^{-1}$ ; Tonelli, puis $\rho=r|\omega_1|$ si $\omega_1\neq 0$. Sur $[(2k+\frac12)\pi,(2k+\frac32)\pi]$, $E\ge 2$ : minoration par $\sum_k\frac{2}{2k+3/2}=+\infty$ ; enfin $\sigma(\{\omega_1\neq 0\})>0$.` },
      { id: 'j-syn', label: 'Réunion des trois cas.' },
      // Justification séduisante et fausse.
      { id: 'j-borne4', label: t`$F(r)\le 4|S^{d-1}|$ pour tout $r$, et $r^{-1-2s}$ est intégrable près de $0$.` },
    ],
    rules: [
      { from: ['d-C'], to: 'e-polaire', by: 'j-polaire' },
      { from: ['e-polaire'], to: 'e-encadre', by: 'j-sinus' },
      { from: ['e-encadre', 'h-cas1'], to: 'c-zero', by: 'j-maj0' },
      { from: ['e-encadre', 'h-cas1'], to: 'c-inf', by: 'j-majinf' },
      { from: ['c-zero', 'c-inf', 'e-polaire', 'e-encadre'], to: 'c-cv', by: 'j-somme' },
      { from: ['e-encadre', 'e-polaire', 'h-cas2'], to: 'c-div0', by: 'j-min0' },
      { from: ['e-polaire', 'h-cas3'], to: 'c-divinf', by: 'j-divinf' },
      { from: ['c-cv', 'c-div0', 'c-divinf'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'c-zero',
        by: 'j-borne4',
        verdict: 'incorrect',
        concept: 'gagliardo-integrabilite',
        message: t`La majoration par une constante est trop grossière près de $0$ : $\int_0^1r^{-1-2s}\,dr=+\infty$ dès que $s\ge 0$. Il faut utiliser $E(t)\le t^2$, qui fait gagner $r^2$.`,
      },
      {
        conclusion: 'x-s1',
        verdict: 'incorrect',
        concept: 'gagliardo-integrabilite',
        message: t`En $s=1$, la minoration $F(r)\ge\frac{4A}{\pi^2}r^2$ laisse $\int_0 r^{-1}\,dr$, qui diverge : l'inégalité $s<1$ est stricte.`,
        counterexample: t`$\int_0^\pi r^{-3}F(r)\,dr\ge\frac{4A}{\pi^2}\int_0^\pi\frac{dr}{r}=+\infty$.`,
      },
      {
        conclusion: 'x-jac',
        verdict: 'incorrect',
        concept: 'gagliardo-exposant',
        message: t`En coordonnées polaires, le jacobien $r^{d-1}$ s'ajoute : près de $0$, l'intégrande se comporte comme $r^{2-d-2s}\,r^{d-1}=r^{1-2s}$, d'où la condition $s<1$, indépendante de $d$.`,
        counterexample: t`Pour $d=3$, la condition proposée donnerait $s<0$ et exclurait tout $s\in]0,1[$, alors que $C_{3,1/2}<+\infty$.`,
      },
      {
        conclusion: 'x-osc',
        verdict: 'incorrect',
        concept: 'gagliardo-integrabilite',
        message: t`$E\ge 0$ ne change pas de signe : il n'y a aucune compensation. $E\ge 2$ sur la moitié de chaque période, et $\int^{+\infty}\frac{d\rho}{\rho}$ diverge.`,
        counterexample: t`Pour $d=1$ : $\int_1^{+\infty}\frac{2-2\cos r}{r}\,dr\ge\sum_{k\ge1}\frac{2}{2k+3/2}=+\infty$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-cas1',
        label: t`Retirer l'hypothèse $0<s<1$`,
        necessary: true,
        explanation: t`La finitude de $C_{d,s}$ repose sur les deux inégalités strictes $s<1$ (en $0$) et $s>0$ (à l'infini).`,
        counterexample: t`Pour $s=1$, $C_{d,1}=+\infty$ (divergence en $0$) ; pour $s=0$, $C_{d,0}=+\infty$ (divergence à l'infini).`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Valeur exacte de $C_{1,1/2}/\pi$.`, expected: '2' }],
  solution: t`**Forme radiale.** En coordonnées polaires $z=r\omega$ (Tonelli), $C_{d,s}=\int_0^{+\infty}r^{-1-2s}F(r)\,dr$ avec $F(r)=\int_{S^{d-1}}E(r\omega_1)\,d\sigma(\omega)$ et $E(t)=4\sin^2(t/2)$ ; pour $d=1$, $F(r)=2E(r)$.

**Encadrement.** De $|\sin x|\le\min(|x|,1)$ et $|\sin x|\ge\frac2\pi|x|$ sur $[-\frac\pi2,\frac\pi2]$ : $E(t)\le\min(t^2,4)$, et $E(t)\ge\frac4{\pi^2}t^2$ pour $|t|\le\pi$. Avec $A=\int\omega_1^2\,d\sigma>0$ et $|\omega_1|\le1$ : $F(r)\le\min(Ar^2,4|S^{d-1}|)$, et $F(r)\ge\frac{4A}{\pi^2}r^2$ pour $r\le\pi$.

**Cas $0<s<1$.** $\int_0^1r^{-1-2s}F\le\frac{A}{2-2s}$ et $\int_1^{+\infty}r^{-1-2s}F\le\frac{2|S^{d-1}|}{s}$ : $C_{d,s}$ est finie, et strictement positive car $F>0$ sur un ensemble de mesure positive.

**Cas $s\ge1$.** $\int_0^\pi r^{-1-2s}F\ge\frac{4A}{\pi^2}\int_0^\pi r^{1-2s}\,dr=+\infty$, car $1-2s\le-1$ : divergence en $0$.

**Cas $s\le0$.** Pour $r\ge1$, $r^{-1-2s}\ge r^{-1}$. Par Tonelli puis $\rho=r|\omega_1|$ (pour $\omega_1\neq0$, ensemble de mesure positive), on minore par $\int_{|\omega_1|}^{+\infty}E(\rho)\frac{d\rho}\rho$, qui vaut $+\infty$ : sur chaque $[(2k+\frac12)\pi,(2k+\frac32)\pi]$, $\cos\rho\le0$ donc $E\ge2$, et $\sum_k\frac{2}{2k+3/2}=+\infty$. Divergence à l'infini, sans compensation possible puisque $E\ge0$.

**Valeur pour $d=1$, $s=\frac12$.** $C_{1,1/2}=\int_{\mathbb R}\frac{2-2\cos z}{z^2}\,dz=2\pi$, par intégration par parties et $\int_0^{+\infty}\frac{\sin z}{z}\,dz=\frac\pi2$.`,
  steps: [
    'Passer en coordonnées polaires et isoler la fonction radiale.',
    t`Encadrer $E(t)=|e^{it}-1|^2$ près de $0$ et à l'infini.`,
    t`Cas $0<s<1$ : majorer séparément en $0$ et à l'infini.`,
    t`Cas $s\ge 1$ : minorer près de $0$.`,
    t`Cas $s\le 0$ : minorer à l'infini, rayon par rayon.`,
  ],
  commonErrors: [
    { id: 'e-jacobien', description: t`Oublier le jacobien $r^{d-1}$ des coordonnées polaires.`, concept: 'gagliardo-exposant' },
    { id: 'e-limite', description: t`Inclure les cas limites $s=0$ ou $s=1$ : les deux inégalités sont strictes.`, concept: 'inegalite-stricte-limite' },
    { id: 'e-oscillation', description: 'Croire que l’oscillation du cosinus fait converger l’intégrale à l’infini, alors que l’intégrande est positif.', concept: 'gagliardo-integrabilite' },
  ],
  hints: [
    t`La difficulté est double : en $0$ et à l'infini. Quelle est la taille de $|e^{it}-1|^2$ dans chacun de ces régimes ?`,
    t`Passe en coordonnées polaires sans oublier $r^{d-1}$, majore la fonction radiale par $Ar^2$ près de $0$ et par une constante à l'infini, puis traite les deux cas exclus par des minorations.`,
    t`Pour $s\le0$, minore $r^{-1-2s}$ par $r^{-1}$ et travaille rayon par rayon : sur la moitié de chaque période, $2-2\cos\rho\ge 2$.`,
  ],
  rubric: rubric({
    hypotheses: t`Les trois cas $0<s<1$, $s\ge1$, $s\le0$ sont distingués.`,
    methode: 'Coordonnées polaires, encadrement de la fonction radiale, majorations et minorations.',
    validite: t`Exposants corrects, jacobien $r^{d-1}$ compris ; inégalités strictes en $s=0$ et $s=1$.`,
    justifications: 'Les divergences sont prouvées par des minorations explicites, non par la seule défaillance des majorations.',
    conclusion: t`$C_{d,s}<+\infty\iff 0<s<1$, avec la localisation de chaque divergence.`,
  }),
  variant: {
    statement: t`Pour $d=1$, montrer que $C_{1,s}=2\int_0^{+\infty}\frac{2-2\cos r}{r^{1+2s}}\,dr$ pour $0<s<1$, puis calculer $C_{1,1/2}$.`,
    solution: t`Pour $d=1$, $S^0=\{\pm1\}$ et $E$ est paire : $C_{1,s}=\int_{\mathbb R}\frac{2-2\cos z}{|z|^{1+2s}}\,dz=2\int_0^{+\infty}\frac{2-2\cos r}{r^{1+2s}}\,dr$. Pour $s=\frac12$, une intégration par parties donne $\int_0^{+\infty}\frac{2-2\cos r}{r^2}\,dr=\Big[-\frac{2-2\cos r}{r}\Big]_0^{+\infty}+\int_0^{+\infty}\frac{2\sin r}{r}\,dr=\pi$, les termes de bord étant nuls ($2-2\cos r\le r^2$ en $0$, $\le 4$ à l'infini). Donc $C_{1,1/2}=2\pi$.`,
    closedChecks: [{ kind: 'rational', prompt: t`Valeur de $C_{1,1/2}/\pi$`, expected: '2' }],
  },
  verification: { origin: 'complement', review: 'machine', notes: 'Les majorations (cas 0 < s < 1) suivent le polycopié, p. PDF 19 ; les minorations des cas exclus sont un complément.' },
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT16: TheoremModule = {
  theorem: {
    id: 'gagliardo',
    spaces: [
      t`$u\in L^2(\mathbb R^d)$ et $0<s<1$.`,
      t`$[u]^2_{H^s}$ : intégrale double d'une fonction positive, à valeurs dans $[0,+\infty]$.`,
      t`$\hat u$ : transformée de Fourier unitaire de $u$ dans $L^2(\mathbb R^d)$ ; $H^s(\mathbb R^d)$ défini par le poids $(1+|\xi|^2)^{s/2}$.`,
    ],
    hypotheses: [
      {
        id: 'h-s',
        text: t`$0<s<1$.`,
        whenRemoved: t`Pour $s=1$, la constante est infinie (divergence en $0$ de $\int_0 r^{-1}\,dr$) ; pour $s=0$, elle est infinie par divergence à l'infini.`,
      },
      {
        id: 'h-u',
        text: t`$u\in L^2(\mathbb R^d)$.`,
        whenRemoved: t`$u\equiv 1$ a une séminorme nulle mais n'appartient pas à $L^2(\mathbb R^d)$ : la caractérisation de $H^s$ exige $u\in L^2$.`,
      },
    ],
    statement: t`Pour $0<s<1$ et $u\in L^2(\mathbb R^d)$,
$$[u]^2_{H^s}=\int_{\mathbb R^d}\int_{\mathbb R^d}\frac{|u(x)-u(y)|^2}{|x-y|^{d+2s}}\,dx\,dy=C_{d,s}\int_{\mathbb R^d}|\xi|^{2s}|\hat u(\xi)|^2\,d\xi,$$
où $C_{d,s}\in]0,+\infty[$ dépend de la normalisation. En conséquence, $u\in H^s$ si et seulement si $u\in L^2$ et $[u]_{H^s}<\infty$.`,
    conclusions: {
      autre: t`Identité dans $[0,+\infty]$ entre l'intégrale des différences et l'intégrale de Fourier ; caractérisation de $H^s(\mathbb R^d)$, $0<s<1$, par $u\in L^2$ et $[u]_{H^s}<\infty$, grâce à $(1+|\xi|^2)^s\le 1+|\xi|^{2s}\le 2(1+|\xi|^2)^s$.`,
    },
    sourceProof: 'complete',
    proofOutline: [
      t`Poser $h=y-x$ : $[u]^2_{H^s}=\int|h|^{-d-2s}\|u(\cdot+h)-u\|^2_{L^2}\,dh$.`,
      t`Plancherel : $\|u(\cdot+h)-u\|^2_{L^2}=\int|e^{i\xi\cdot h}-1|^2|\hat u(\xi)|^2\,d\xi$.`,
      t`Tonelli : intervertir les intégrales en $h$ et en $\xi$.`,
      t`Rotation et changement d'échelle $z=|\xi|h$ : l'intégrale intérieure vaut $C_{d,s}|\xi|^{2s}$.`,
      t`Constante finie : le numérateur est au plus $|z|^2$ près de l'origine, et borné à l'infini.`,
    ],
    warnings: [
      t`L'exposant du dénominateur est $d+2s$ ; le multiplicateur obtenu est $|\xi|^{2s}$, le jacobien $|\xi|^{-d}$ absorbant le reste.`,
      t`L'interversion relève de Tonelli : l'identité a lieu dans $[0,+\infty]$, sans intégrabilité supposée.`,
      t`$[u]_{H^s}$ est une séminorme : elle ne contrôle pas $\|u\|_{L^2}$, et la caractérisation exige $u\in L^2$.`,
      t`Les inégalités $0<s<1$ sont strictes : la constante est infinie en $s=0$ et en $s=1$.`,
      t`Sur un domaine borné, le laplacien fractionnaire spectral et les réalisations intégrales avec conditions extérieures ne coïncident pas en général.`,
    ],
    usefulFor: t`Mesurer la régularité $H^s$, $0<s<1$, sans transformée de Fourier, par les différences $u(x)-u(y)$ ; identifier le domaine de forme $H^s$ du laplacien fractionnaire $(-\Delta)^s$, distinct de son domaine $H^{2s}$.`,
    verification: FROM_POLY,
  },
  definitions: [
    {
      id: 'gagliardo-seminorme-def',
      term: 'Séminorme de Gagliardo',
      statement: t`Pour $0<s<1$ et $u\in L^2(\mathbb R^d)$ : $[u]^2_{H^s}=\iint\frac{|u(x)-u(y)|^2}{|x-y|^{d+2s}}\,dx\,dy\in[0,+\infty]$.`,
      source: poly(18, 'Section 4.4'),
    },
    {
      id: 'gagliardo-laplacien-fractionnaire',
      term: 'Laplacien fractionnaire sur $\\mathbb R^d$',
      statement: t`Pour $s\in]0,1[$ : $\widehat{(-\Delta)^su}(\xi)=|\xi|^{2s}\hat u(\xi)$. Sur $L^2(\mathbb R^d)$, son domaine maximal est $H^{2s}(\mathbb R^d)$ ; le domaine de la forme quadratique associée est $H^s(\mathbb R^d)$.`,
      source: poly(19, 'Section 4.4, laplacien fractionnaire'),
    },
  ],
  concepts: [
    {
      id: 'gagliardo-exposant',
      label: 'Exposant de Gagliardo',
      reminder: t`Le dénominateur est $|x-y|^{d+2s}$ ; après le changement d'échelle $z=|\xi|h$, de jacobien $|\xi|^{-d}$, il reste le multiplicateur $|\xi|^{2s}$.`,
    },
    {
      id: 'gagliardo-integrabilite',
      label: 'Intégrabilité radiale',
      reminder: t`$\int|e^{iz_1}-1|^2|z|^{-d-2s}\,dz$ converge en $0$ si et seulement si $s<1$, et à l'infini si et seulement si $s>0$ : le jacobien $r^{d-1}$ fait disparaître la dimension.`,
    },
    {
      id: 'gagliardo-seminorme',
      label: 'Séminorme et norme',
      reminder: t`$[u]_{H^s}$ ne contrôle pas $\|u\|_{L^2}$ : la norme de $H^s$ est équivalente à $\|u\|_{L^2}+[u]_{H^s}$, pas à $[u]_{H^s}$ seule.`,
    },
    {
      id: 'gagliardo-identite',
      label: 'Identité dans $[0,+\\infty]$',
      reminder: t`Plancherel s'applique aux carrés des normes $L^2$ ; l'interversion des intégrales d'une fonction positive relève de Tonelli, sans hypothèse d'intégrabilité.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-gagliardo-indicatrice',
      theoremId: 'gagliardo',
      title: 'Une indicatrice au cas limite',
      claim: t`$\mathbb 1_{]0,1[}$ est bornée à support compact, donc appartient à $H^{1/2}(\mathbb R)$.`,
      correctStatement: t`$\mathbb 1_{]0,1[}\in H^s(\mathbb R)$ si et seulement si $s<\frac12$, et $[\mathbb 1_{]0,1[}]^2_{H^s}=\frac{2}{s(1-2s)}$ dans ce cas.`,
      task: t`Calcule $[\mathbb 1_{]0,1[}]^2_{H^{1/4}(\mathbb R)}$ ; la même formule diverge en $s=\frac12$.`,
      check: { kind: 'rational', prompt: t`Valeur de $[\mathbb 1_{]0,1[}]^2_{H^{1/4}(\mathbb R)}$`, expected: '16' },
      explanation: t`$[\mathbb 1_{]0,1[}]^2_{H^s}=2\int_0^1\frac{x^{-2s}+(1-x)^{-2s}}{2s}\,dx=\frac{2}{s(1-2s)}$ pour $s<\frac12$, soit $16$ pour $s=\frac14$ ; pour $s=\frac12$, $\int_0^1x^{-1}\,dx=+\infty$. Côté Fourier, $|\xi|\,|\hat u(\xi)|^2=\frac{2-2\cos\xi}{2\pi|\xi|}$ n'est pas intégrable à l'infini.`,
      concept: 'gagliardo-integrabilite',
      source: poly(41, 'Exercice 16, facile'),
    },
    {
      id: 'ce-gagliardo-dilatation',
      theoremId: 'gagliardo',
      title: 'La séminorme ne contrôle pas la norme',
      claim: t`Il existe $C>0$ tel que $\|u\|_{L^2}\le C[u]_{H^{1/2}(\mathbb R)}$ pour tout $u\in H^{1/2}(\mathbb R)$.`,
      correctStatement: t`$u\in H^{1/2}(\mathbb R)\iff u\in L^2$ et $[u]_{H^{1/2}}<\infty$ : les deux termes sont nécessaires.`,
      task: t`Pour $u_\lambda=u(\cdot/\lambda)$, on a $[u_\lambda]^2_{H^s(\mathbb R^d)}=\lambda^{\beta}[u]^2_{H^s(\mathbb R^d)}$ avec $\beta=d-2s$. Donne $\beta$ pour $d=1$ et $s=\frac12$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\beta$`, expected: '0' },
      explanation: t`Le changement de variables $(x,y)=(\lambda x',\lambda y')$ donne $[u_\lambda]^2_{H^s}=\lambda^{2d}\lambda^{-d-2s}[u]^2_{H^s}=\lambda^{d-2s}[u]^2_{H^s}$, soit $\lambda^0$ pour $d=1$, $s=\frac12$. Or $\|u_\lambda\|^2_{L^2}=\lambda\|u\|^2_{L^2}\to+\infty$ : aucune constante ne convient.`,
      concept: 'gagliardo-seminorme',
      source: poly(41, 'Exercice 16, facile'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT16;
