/**
 * Résultat 18 — Injections de Sobolev fractionnaires (polycopié, section 4.5, p. PDF 19).
 * Cas s > d/2 démontré par Fourier et Cauchy–Schwarz ; cas limite s = d/2 réfuté ;
 * injection à l'exposant critique 2d/(d−2s) admise (résultat supplémentaire, p. PDF 19).
 */
import { t, rubric, poly, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'injections-fractionnaires.facile',
  theoremId: 'injections-fractionnaires',
  level: 'facile',
  title: t`Quand $H^s(\mathbb R)$ s'injecte-t-il dans $C_0(\mathbb R)$ ?`,
  statement: t`Déterminer les $s\in\mathbb R$ pour lesquels $H^s(\mathbb R)\hookrightarrow C_0(\mathbb R)$ : tout élément de $H^s(\mathbb R)$ admet un représentant dans $C_0(\mathbb R)$, et $\sup|v|\le C\|v\|_{H^s}$. Le cas limite $s=\frac12$ doit être tranché par une démonstration.`,
  source: poly(41, 'Exercice 18, facile ; énoncé de la section 4.5 (p. PDF 19)'),
  prerequisites: ['dualite-interpolation'],
  concepts: ['injections-fractionnaires-cas-limite', 'injections-fractionnaires-representant', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'explicite', label: 'Par une fonction explicite non bornée' },
      { id: 'dualite', label: 'Par dualité et distribution de Dirac' },
    ],
    nodes: [
      { id: 'd-def', kind: 'definition', text: t`Pour $s\in\mathbb R$ : $\|v\|_{H^s(\mathbb R)}=\|(1+\xi^2)^{s/2}\hat v\|_{L^2}$. « $H^s(\mathbb R)\hookrightarrow C_0(\mathbb R)$ » signifie : tout élément de $H^s(\mathbb R)$ admet un représentant dans $C_0(\mathbb R)$, et il existe $C$ tel que $\sup|v|\le C\|v\|_{H^s}$.` },
      {
        id: 'c-seuil',
        kind: 'consequence',
        text: t`$I(s)=\int_{\mathbb R}(1+\xi^2)^{-s}\,d\xi<+\infty$ si et seulement si $s>\frac12$.`,
        masked: t`Condition de finitude de $I(s)=\int_{\mathbb R}(1+\xi^2)^{-s}\,d\xi$ : à déterminer.`,
        check: { kind: 'rational', prompt: t`Seuil $s_0$ tel que $I(s)<+\infty$ si et seulement si $s>s_0$.`, expected: '1/2' },
      },
      { id: 'h-pos', kind: 'definition', local: true, text: t`Soit $s>\frac12$.` },
      { id: 'a-pos', kind: 'application-theoreme', text: t`Pour $s>\frac12$ : $H^s(\mathbb R)\hookrightarrow C_0(\mathbb R)$.` },
      { id: 'd-g', kind: 'definition', text: t`$g(\xi)=\dfrac{1}{(1+|\xi|)\log(e+|\xi|)}$ et $u=\mathcal F^{-1}g$.` },
      { id: 'c-g', kind: 'consequence', text: t`$\int_{\mathbb R}(1+\xi^2)^{1/2}g(\xi)^2\,d\xi\le 2e<+\infty$, donc $u\in H^{1/2}(\mathbb R)$ ; mais $\int_{\mathbb R}g(\xi)\,d\xi=+\infty$.` },
      { id: 'c-nonb', kind: 'consequence', text: t`Pour $\rho_\varepsilon(x)=\frac{1}{\varepsilon\sqrt{2\pi}}e^{-x^2/(2\varepsilon^2)}$ : $\int_{\mathbb R}u\,\rho_\varepsilon\,dx=(2\pi)^{-1/2}\int_{\mathbb R}g(\xi)e^{-\varepsilon^2\xi^2/2}\,d\xi\to+\infty$ quand $\varepsilon\to0^+$ ; donc $u\notin L^\infty(\mathbb R)$, et $u$ n'a aucun représentant dans $C_0(\mathbb R)$.` },
      { id: 'c-monot', kind: 'inclusion', text: t`Pour $s\le\frac12$ : $H^{1/2}(\mathbb R)\subset H^s(\mathbb R)$, avec $\|v\|_{H^s}\le\|v\|_{H^{1/2}}$.` },
      { id: 'd-abs', kind: 'definition', local: true, text: t`Soit $s\le\frac12$ ; supposons, par l'absurde, $H^s(\mathbb R)\hookrightarrow C_0(\mathbb R)$ avec une constante $C$.` },
      { id: 'c-dual', kind: 'application-theoreme', text: t`$v\mapsto v(0)$ (valeur du représentant continu) est une forme linéaire continue sur $H^s(\mathbb R)$ ; par dualité, elle s'écrit $\langle T,\cdot\rangle$ avec $T\in H^{-s}(\mathbb R)$, et $T=\delta_0$ dans $\mathcal S'$ : $\delta_0\in H^{-s}(\mathbb R)$.` },
      { id: 'c-contra', kind: 'contradiction', text: t`$\|\delta_0\|^2_{H^{-s}}=\frac{1}{2\pi}I(s)<+\infty$ impose $s>\frac12$ : contradiction avec $s\le\frac12$.` },
      { id: 'a-neg', kind: 'consequence', text: t`Pour $s\le\frac12$, $H^s(\mathbb R)$ ne s'injecte pas dans $C_0(\mathbb R)$.` },
      { id: 'fin', kind: 'conclusion', text: t`$H^s(\mathbb R)\hookrightarrow C_0(\mathbb R)$ si et seulement si $s>\frac12$ ; le cas limite $s=\frac12$ est exclu.` },

      // Propositions plausibles mais fausses.
      { id: 'x-demi', kind: 'inclusion', distractor: true, text: t`$H^{1/2}(\mathbb R)\hookrightarrow C_0(\mathbb R)$.` },
      { id: 'x-I', kind: 'inegalite', distractor: true, text: t`$I(1/2)=\int_{\mathbb R}(1+\xi^2)^{-1/2}\,d\xi<+\infty$.` },
    ],
    justifications: [
      { id: 'j-radial', label: t`$(1+\xi^2)^{-s}$ est continue, équivalente à $|\xi|^{-2s}$ à l'infini, et $\int_1^{+\infty}\xi^{-2s}\,d\xi<+\infty\iff 2s>1$.` },
      { id: 'j-thm', label: 'Injection de Sobolev fractionnaire, cas $s>d/2$ avec $d=1$.', theorem: 'injections-fractionnaires' },
      { id: 'j-log', label: t`$(1+\xi^2)^{1/2}\le 1+|\xi|$ et $\frac{1}{1+r}\le\frac{e}{e+r}$ ; primitives $-\frac{1}{\log(e+r)}$ et $\log\log(e+r)$.` },
      { id: 'j-gauss', label: t`Parseval, avec $\hat\rho_\varepsilon(\xi)=(2\pi)^{-1/2}e^{-\varepsilon^2\xi^2/2}$ ; convergence monotone, car $g\ge 0$ ; si $|u|\le K$ presque partout, alors $\big|\int u\rho_\varepsilon\big|\le K$ puisque $\int\rho_\varepsilon=1$.`, theorem: 'plancherel' },
      { id: 'j-poids', label: t`$(1+\xi^2)^s\le(1+\xi^2)^{1/2}$ pour $s\le\frac12$.` },
      { id: 'j-contre', label: t`$u$ appartient à tout $H^s$, $s\le\frac12$, et n'est pas essentiellement bornée, alors que les éléments de $C_0(\mathbb R)$ sont bornés.` },
      { id: 'j-dual', label: t`Dualité $(H^s)'\simeq H^{-s}$ par le crochet qui prolonge l'action des distributions sur $\mathcal S$.`, theorem: 'dualite-interpolation' },
      { id: 'j-dirac', label: t`$\hat\delta_0=(2\pi)^{-1/2}$, donc $\|\delta_0\|^2_{H^{-s}}=\frac{1}{2\pi}\int(1+\xi^2)^{-s}\,d\xi$.` },
      { id: 'j-absurde', label: 'Raisonnement par l’absurde.' },
      { id: 'j-syn', label: 'Réunion des deux sens.' },
      // Justifications séduisantes et fausses.
      { id: 'j-cs-echoue', label: t`Pour $s\le\frac12$, la majoration de Cauchy–Schwarz ne s'applique plus, donc l'injection est fausse.` },
      { id: 'j-dom', label: t`Convergence dominée, appliquée à $g(\xi)e^{-\varepsilon^2\xi^2/2}$.` },
    ],
    rules: [
      { from: ['d-def'], to: 'c-seuil', by: 'j-radial' },
      { from: ['h-pos', 'c-seuil', 'd-def'], to: 'a-pos', by: 'j-thm' },
      { from: ['d-g', 'd-def'], to: 'c-g', by: 'j-log', path: 'explicite' },
      { from: ['c-g'], to: 'c-nonb', by: 'j-gauss', path: 'explicite' },
      { from: ['d-def'], to: 'c-monot', by: 'j-poids', path: 'explicite' },
      { from: ['c-nonb', 'c-monot', 'c-g'], to: 'a-neg', by: 'j-contre', path: 'explicite' },
      { from: ['d-abs', 'd-def'], to: 'c-dual', by: 'j-dual', path: 'dualite' },
      { from: ['c-dual', 'c-seuil', 'd-abs'], to: 'c-contra', by: 'j-dirac', path: 'dualite' },
      { from: ['c-contra'], to: 'a-neg', by: 'j-absurde', path: 'dualite' },
      { from: ['a-pos', 'a-neg'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'a-neg',
        by: 'j-cs-echoue',
        verdict: 'incorrect',
        concept: 'injections-fractionnaires-cas-limite',
        message: 'L’échec d’une méthode ne prouve pas la fausseté d’un énoncé : il faut un contre-exemple explicite, ou un argument de dualité.',
      },
      {
        conclusion: 'c-nonb',
        by: 'j-dom',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`La convergence dominée exige un majorant intégrable, et $g\notin L^1(\mathbb R)$ : c'est la convergence monotone qui s'applique, l'intégrande croissant vers $g$.`,
      },
      {
        conclusion: 'x-demi',
        verdict: 'incorrect',
        concept: 'injections-fractionnaires-cas-limite',
        message: t`Le théorème exige $s>\frac d2$ strictement : au cas limite, l'injection échoue.`,
        counterexample: t`$u=\mathcal F^{-1}g$, avec $g(\xi)=\frac{1}{(1+|\xi|)\log(e+|\xi|)}$, est dans $H^{1/2}(\mathbb R)$ et n'est pas essentiellement bornée.`,
      },
      {
        conclusion: 'x-I',
        verdict: 'incorrect',
        concept: 'injections-fractionnaires-cas-limite',
        message: t`Au cas limite, l'intégrale diverge logarithmiquement.`,
        counterexample: t`Pour $\xi\ge 1$ : $(1+\xi^2)^{-1/2}\ge\frac{1}{\sqrt2\,\xi}$, et $\int_1^{+\infty}\frac{d\xi}{\xi}=+\infty$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-pos',
        label: t`Retirer l'hypothèse $s>\frac12$`,
        necessary: true,
        explanation: t`Le sens direct repose sur l'inégalité stricte $s>\frac d2$ : au cas limite, elle cesse d'être vraie.`,
        counterexample: t`Pour $s=\frac12$, $u=\mathcal F^{-1}g$ est dans $H^{1/2}(\mathbb R)$ sans être essentiellement bornée.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Valeur de $\int_0^{+\infty}\frac{dr}{(e+r)\log^2(e+r)}$.`, expected: '1' }],
  solution: t`**Seuil.** $I(s)=\int(1+\xi^2)^{-s}\,d\xi$ est finie si et seulement si $2s>1$.

**Sens direct.** Pour $s>\frac12$, le théorème (cas $s>\frac d2$, $d=1$) donne $H^s(\mathbb R)\hookrightarrow C_0(\mathbb R)$, avec $\sup|v|\le(2\pi)^{-1/2}I(s)^{1/2}\|v\|_{H^s}$.

**Cas $s\le\frac12$, première voie.** Soit $g(\xi)=\frac{1}{(1+|\xi|)\log(e+|\xi|)}$ et $u=\mathcal F^{-1}g$. Comme $(1+\xi^2)^{1/2}\le1+|\xi|$ et $\frac1{1+r}\le\frac{e}{e+r}$ :
$$\int(1+\xi^2)^{1/2}g^2\,d\xi\le 2e\int_0^{+\infty}\frac{dr}{(e+r)\log^2(e+r)}=2e,$$
donc $u\in H^{1/2}\subset H^s$. Mais $\int g=+\infty$ ($\log\log$). Pour la gaussienne $\rho_\varepsilon$ de masse $1$, Parseval donne $\int u\rho_\varepsilon=(2\pi)^{-1/2}\int g\,e^{-\varepsilon^2\xi^2/2}\,d\xi$, qui tend vers $+\infty$ par convergence monotone ; si $u$ était bornée par $K$, ces intégrales le seraient aussi. Donc $u$ n'a aucun représentant dans $C_0$.

**Cas $s\le\frac12$, seconde voie.** Si $H^s\hookrightarrow C_0$, l'évaluation en $0$ est continue sur $H^s$ ; par dualité, $\delta_0\in H^{-s}$, donc $\frac{1}{2\pi}I(s)=\|\delta_0\|^2_{H^{-s}}<+\infty$, soit $s>\frac12$ : contradiction.

**Conclusion.** $H^s(\mathbb R)\hookrightarrow C_0(\mathbb R)$ si et seulement si $s>\frac12$. L'échec de Cauchy–Schwarz pour $s\le\frac12$ ne prouverait rien à lui seul : il faut l'une des deux voies ci-dessus.`,
  steps: [
    t`Calculer le seuil de finitude de $\int(1+\xi^2)^{-s}\,d\xi$.`,
    t`Pour $s>\frac12$, invoquer le théorème.`,
    t`Pour $s\le\frac12$, exhiber un élément de $H^{1/2}$ non borné, ou raisonner par dualité avec $\delta_0$.`,
    t`Conclure en traitant explicitement $s=\frac12$.`,
  ],
  commonErrors: [
    { id: 'e-limite', description: t`Inclure le cas $s=\frac12$ dans l'injection.`, concept: 'injections-fractionnaires-cas-limite' },
    { id: 'e-methode', description: 'Conclure à la fausseté d’une injection parce qu’une méthode de preuve échoue.', concept: 'injections-fractionnaires-cas-limite' },
    { id: 'e-representant', description: t`Oublier que « continue » signifie « admet un représentant continu ».`, concept: 'injections-fractionnaires-representant' },
  ],
  hints: [
    t`Le critère du théorème porte sur $s$ et $d$. Que vaut-il ici, et que se passe-t-il exactement au seuil ?`,
    t`Pour réfuter l'injection au cas limite, il faut un objet : soit une fonction de $H^{1/2}$ non bornée, soit une forme linéaire dont la continuité contredirait le critère pour la distribution de Dirac.`,
    t`Essaie $\hat u(\xi)=\frac{1}{(1+|\xi|)\log(e+|\xi|)}$ : il est de carré intégrable avec le poids $(1+\xi^2)^{1/2}$, mais pas intégrable. Teste $u$ contre des gaussiennes de masse $1$.`,
  ],
  rubric: rubric({
    hypotheses: t`L'inégalité stricte $s>\frac d2$ est identifiée comme décisive.`,
    methode: 'Théorème pour le sens direct, contre-exemple explicite ou dualité pour le sens réciproque.',
    validite: t`Le cas $s=\frac12$ est réfuté par un argument complet, non par l'échec d'une majoration.`,
    justifications: t`La convergence monotone, et non dominée, fait diverger les moyennes gaussiennes.`,
    conclusion: t`L'injection a lieu exactement pour $s>\frac12$.`,
  }),
  variant: {
    statement: t`Déterminer les $s\in\mathbb R$ pour lesquels $H^s(\mathbb R^2)\hookrightarrow C_0(\mathbb R^2)$.`,
    solution: t`Pour $s>1$, le théorème s'applique. Pour $s\le 1$, on prend $\hat u(\xi)=\frac{1}{(1+|\xi|)^2\log(e+|\xi|)}$ : en coordonnées polaires, $\int(1+|\xi|^2)|\hat u|^2\le 2\pi\int_0^{+\infty}\frac{r\,dr}{(1+r)^2\log^2(e+r)}<+\infty$, car $\frac{r}{(1+r)^2}\le\frac{1}{1+r}$ ; et $\int\hat u=2\pi\int_0^{+\infty}\frac{r\,dr}{(1+r)^2\log(e+r)}=+\infty$, car $\frac{r}{(1+r)^2}\ge\frac{1}{4(1+r)}$ pour $r\ge1$. Les moyennes gaussiennes montrent que $u\in H^1(\mathbb R^2)$ n'est pas bornée : l'injection a lieu si et seulement si $s>1$.`,
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'injections-fractionnaires.intermediaire',
  theoremId: 'injections-fractionnaires',
  level: 'intermediaire',
  title: t`$H^s\hookrightarrow C_0$ pour $s>d/2$, par Fourier et Cauchy–Schwarz`,
  statement: t`Soient $s>\frac d2$ et $u\in H^s(\mathbb R^d)$. Montrer, par la transformée de Fourier et l'inégalité de Cauchy–Schwarz, que $u$ admet un représentant $v\in C_0(\mathbb R^d)$ et que $\sup|v|\le(2\pi)^{-d/2}\big(\int(1+|\xi|^2)^{-s}d\xi\big)^{1/2}\|u\|_{H^s}$.`,
  source: poly(41, 'Exercice 18, intermédiaire ; idée de preuve de la section 4.5 (p. PDF 19)'),
  prerequisites: [],
  concepts: ['injections-fractionnaires-representant', 'injections-fractionnaires-cas-limite', 'hypotheses-theoreme'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-s', kind: 'hypothese', text: t`$s>\frac d2$.` },
      { id: 'h-u', kind: 'hypothese', text: t`$u\in H^s(\mathbb R^d)$.` },
      { id: 'd-norm', kind: 'definition', text: t`$w(\xi)=1+|\xi|^2$ et $\|u\|^2_{H^s}=\int_{\mathbb R^d}w^s|\hat u|^2\,d\xi$.` },
      {
        id: 'c-rad',
        kind: 'inegalite',
        text: t`$I_s=\int_{\mathbb R^d}w(\xi)^{-s}\,d\xi<+\infty$.`,
        masked: t`Finitude de $I_s=\int_{\mathbb R^d}w^{-s}\,d\xi$ : condition à déterminer.`,
        check: { kind: 'rational', prompt: t`Pour $d=1$ et $s=1$, valeur de $I_1/(2\pi)$, carré de la constante de l'injection.`, expected: '1/2' },
      },
      { id: 'c-cs', kind: 'inegalite', text: t`$\int_{\mathbb R^d}|\hat u|\,d\xi\le I_s^{1/2}\|u\|_{H^s}$.` },
      { id: 'c-L1', kind: 'consequence', text: t`$\hat u\in L^1(\mathbb R^d)\cap L^2(\mathbb R^d)$.` },
      { id: 'd-v', kind: 'definition', text: t`Pour $x\in\mathbb R^d$ : $v(x)=(2\pi)^{-d/2}\int_{\mathbb R^d}e^{ix\cdot\xi}\hat u(\xi)\,d\xi$.` },
      { id: 'c-C0', kind: 'consequence', text: t`$v$ est continue et $v(x)\to 0$ quand $|x|\to+\infty$ : $v\in C_0(\mathbb R^d)$.` },
      { id: 'c-rep', kind: 'egalite', text: t`$v=u$ presque partout.` },
      { id: 'c-sup', kind: 'inegalite', text: t`$\sup|v|\le(2\pi)^{-d/2}I_s^{1/2}\|u\|_{H^s}$.` },
      { id: 'fin', kind: 'conclusion', text: t`Tout $u\in H^s(\mathbb R^d)$ admet un représentant $v\in C_0(\mathbb R^d)$, avec $\sup|v|\le(2\pi)^{-d/2}I_s^{1/2}\|u\|_{H^s}$ : $H^s(\mathbb R^d)\hookrightarrow C_0(\mathbb R^d)$ pour $s>\frac d2$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-limite', kind: 'inegalite', distractor: true, text: t`$I_{d/2}=\int_{\mathbb R^d}(1+|\xi|^2)^{-d/2}\,d\xi<+\infty$.` },
      { id: 'x-RL2', kind: 'consequence', distractor: true, text: t`La transformée de Fourier de toute fonction de $L^2(\mathbb R^d)$ tend vers $0$ à l'infini.` },
      { id: 'x-cst', kind: 'inegalite', distractor: true, after: ['c-sup'], text: t`Pour tout $s>\frac d2$ : $\sup|v|\le\|u\|_{H^s}$.` },
    ],
    justifications: [
      { id: 'j-polaire', label: t`Coordonnées polaires : $\int_1^{+\infty}r^{-2s}r^{d-1}\,dr<+\infty\iff 2s>d$ ; l'intégrande est borné près de $0$.` },
      { id: 'j-cs', label: t`Écrire $|\hat u|=w^{-s/2}\cdot w^{s/2}|\hat u|$, puis Cauchy–Schwarz dans $L^2$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-l1', label: t`La borne précédente, et $\|\hat u\|_{L^2}\le\|u\|_{H^s}$ car $w^s\ge 1$ pour $s>0$.` },
      { id: 'j-rl', label: t`Continuité par convergence dominée (majorant $|\hat u|\in L^1$), et limite nulle à l'infini par le lemme de Riemann–Lebesgue.`, theorem: 'riemann-lebesgue' },
      { id: 'j-inv', label: t`Pour $\hat u\in L^1\cap L^2$, l'inverse de $\mathcal F$ sur $L^2$ coïncide presque partout avec la formule intégrale.`, theorem: 'plancherel' },
      { id: 'j-module', label: t`$|e^{ix\cdot\xi}|=1$, puis la borne de Cauchy–Schwarz.` },
      { id: 'j-syn', label: 'Réunion : représentant, appartenance à $C_0$, continuité de l’injection.' },
      // Justifications séduisantes et fausses.
      { id: 'j-cs-nu', label: t`Cauchy–Schwarz sans poids : $\int|\hat u|\le\|\hat u\|_{L^2}\,\|1\|_{L^2}$.` },
      { id: 'j-partout', label: t`$u$ est elle-même continue, puisque $\hat u$ est intégrable.` },
      { id: 'j-thm', label: 'Injection de Sobolev fractionnaire.', theorem: 'injections-fractionnaires' },
    ],
    rules: [
      { from: ['h-s', 'd-norm'], to: 'c-rad', by: 'j-polaire' },
      { from: ['h-u', 'c-rad', 'd-norm'], to: 'c-cs', by: 'j-cs' },
      { from: ['c-cs', 'h-u', 'h-s', 'd-norm'], to: 'c-L1', by: 'j-l1' },
      { from: ['c-L1', 'd-v'], to: 'c-C0', by: 'j-rl' },
      { from: ['c-L1', 'd-v'], to: 'c-rep', by: 'j-inv' },
      { from: ['c-cs', 'd-v'], to: 'c-sup', by: 'j-module' },
      { from: ['c-C0', 'c-rep', 'c-sup'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'c-cs',
        by: 'j-cs-nu',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`La fonction constante $1$ n'est pas dans $L^2(\mathbb R^d)$ : sans le poids $w^{-s/2}$, la majoration est infinie. C'est le poids qui fait apparaître la condition $s>\frac d2$.`,
      },
      {
        conclusion: 'c-rep',
        by: 'j-partout',
        verdict: 'incorrect',
        concept: 'injections-fractionnaires-representant',
        message: t`$u$ est une classe de fonctions : on obtient un représentant continu $v$, égal à $u$ presque partout, non une égalité en tout point.`,
        counterexample: t`La classe de $e^{-|x|^2}$ contient aussi $e^{-|x|^2}+\mathbb 1_{\{0\}}$, discontinue en $0$.`,
      },
      {
        conclusion: 'x-limite',
        verdict: 'incorrect',
        concept: 'injections-fractionnaires-cas-limite',
        message: t`Au cas limite, $\int_1^{+\infty}r^{-d}r^{d-1}\,dr=\int_1^{+\infty}\frac{dr}{r}$ diverge.`,
        counterexample: t`Pour $d=1$ : $(1+\xi^2)^{-1/2}\ge\frac{1}{\sqrt2\,\xi}$ pour $\xi\ge1$.`,
      },
      {
        conclusion: 'x-RL2',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Le lemme de Riemann–Lebesgue suppose l'intégrabilité ; $\mathcal F$ étant surjective sur $L^2$, toute fonction de $L^2$ est une transformée.`,
        counterexample: t`$h=\sum_{n\ge1}\mathbb 1_{[n,n+2^{-n}]}\in L^2(\mathbb R)$ vaut $1$ en des points arbitrairement grands ; c'est la transformée de $\mathcal F^{-1}h\in L^2(\mathbb R)$.`,
      },
      {
        conclusion: 'x-cst',
        verdict: 'incorrect',
        concept: 'injections-fractionnaires-cas-limite',
        message: t`La constante optimale vaut $(2\pi)^{-d/2}I_s^{1/2}$, qui tend vers $+\infty$ quand $s\downarrow\frac d2$.`,
        counterexample: t`Pour $\hat u=w^{-s}$ : $\|u\|^2_{H^s}=I_s$ et $v(0)=(2\pi)^{-d/2}I_s$, donc $v(0)/\|u\|_{H^s}=(2\pi)^{-d/2}I_s^{1/2}$, non borné quand $s\downarrow\frac d2$, car $I_s\uparrow I_{d/2}=+\infty$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-s',
        label: t`Retirer l'hypothèse $s>\frac d2$`,
        necessary: true,
        explanation: t`La finitude de $I_s$, donc l'intégrabilité de $\hat u$, repose sur $2s>d$.`,
        counterexample: t`Pour $d=1$ et $s=\frac12$ : $\hat u(\xi)=\frac{1}{(1+|\xi|)\log(e+|\xi|)}$ définit $u\in H^{1/2}(\mathbb R)$ non essentiellement bornée.`,
      },
    ],
  },
  solution: t`**Intégrabilité du poids.** En coordonnées polaires, $I_s=\int(1+|\xi|^2)^{-s}\,d\xi<+\infty$ si et seulement si $2s>d$.

**Cauchy–Schwarz.** $\int|\hat u|=\int w^{-s/2}\cdot w^{s/2}|\hat u|\le I_s^{1/2}\|u\|_{H^s}$. Comme $w^s\ge1$, $\hat u\in L^2$ aussi.

**Représentant continu.** $v(x)=(2\pi)^{-d/2}\int e^{ix\cdot\xi}\hat u(\xi)\,d\xi$ est continue (convergence dominée), tend vers $0$ à l'infini (Riemann–Lebesgue, car $\hat u\in L^1$), et coïncide presque partout avec $u$ (inversion de Fourier sur $L^1\cap L^2$). Enfin $\sup|v|\le(2\pi)^{-d/2}\int|\hat u|\le(2\pi)^{-d/2}I_s^{1/2}\|u\|_{H^s}$.

**Exemple.** Pour $d=1$, $s=1$ : $I_1=\pi$, donc $\sup|v|^2\le\frac12\|u\|^2_{H^1}$, avec égalité pour $u=e^{-|x|}$.

**Vigilance.** Au cas limite $s=\frac d2$, $I_s=+\infty$ et l'injection échoue (exercice facile) ; la constante explose quand $s\downarrow\frac d2$. L'injection à l'exposant critique $\frac{2d}{d-2s}$, pour $s<\frac d2$, ne s'obtient pas ainsi.`,
  steps: [
    t`Vérifier que $\int(1+|\xi|^2)^{-s}\,d\xi<+\infty$.`,
    t`Majorer $\|\hat u\|_{L^1}$ par Cauchy–Schwarz pondéré.`,
    t`Définir le représentant par la formule d'inversion et montrer qu'il est dans $C_0$.`,
    t`Identifier ce représentant à $u$ presque partout et majorer sa norme uniforme.`,
  ],
  commonErrors: [
    { id: 'e-poids', description: 'Appliquer Cauchy–Schwarz sans poids, avec un facteur non intégrable.', concept: 'hypotheses-theoreme' },
    { id: 'e-partout', description: t`Affirmer que $u$ est continue, au lieu d'exhiber un représentant continu.`, concept: 'injections-fractionnaires-representant' },
    { id: 'e-RL', description: t`Appliquer Riemann–Lebesgue à une fonction seulement de carré intégrable.`, concept: 'hypotheses-theoreme' },
  ],
  hints: [
    t`Pour obtenir une fonction continue et bornée, il suffit que $\hat u$ soit intégrable : comment le déduire de $u\in H^s$ ?`,
    t`Insère le poids $(1+|\xi|^2)^{s/2}$ et son inverse dans $\int|\hat u|$, puis utilise Cauchy–Schwarz ; vérifie quand l'intégrale du poids inverse est finie.`,
    t`$\int|\hat u|\le\big(\int(1+|\xi|^2)^{-s}\big)^{1/2}\|u\|_{H^s}$, finie pour $2s>d$. Ensuite : convergence dominée, Riemann–Lebesgue et inversion sur $L^1\cap L^2$.`,
  ],
  rubric: rubric({
    hypotheses: t`$s>\frac d2$ est utilisée exactement pour la finitude de $\int(1+|\xi|^2)^{-s}$.`,
    methode: 'Cauchy–Schwarz pondéré, puis formule d’inversion.',
    validite: t`Le représentant est continu, nul à l'infini, égal à $u$ presque partout.`,
    justifications: 'Convergence dominée, Riemann–Lebesgue et inversion sont invoqués avec leurs hypothèses.',
    conclusion: t`$H^s\hookrightarrow C_0$ avec la constante $(2\pi)^{-d/2}I_s^{1/2}$.`,
  }),
  variant: {
    statement: t`Soient $0<\alpha<1$, $s>\frac d2+\alpha$ et $u\in H^s(\mathbb R^d)$, de représentant continu $v$. Montrer que $|v(x)-v(y)|\le C\,\|u\|_{H^s}\,|x-y|^\alpha$ pour tous $x,y\in\mathbb R^d$.`,
    solution: t`Pour $a,b$ réels, $|e^{ia}-e^{ib}|\le\min(2,|a-b|)\le 2^{1-\alpha}|a-b|^\alpha$, donc $|e^{ix\cdot\xi}-e^{iy\cdot\xi}|\le 2^{1-\alpha}|\xi|^\alpha|x-y|^\alpha$. Ainsi $|v(x)-v(y)|\le(2\pi)^{-d/2}2^{1-\alpha}|x-y|^\alpha\int|\xi|^\alpha|\hat u|$, et Cauchy–Schwarz donne $\int|\xi|^\alpha|\hat u|\le J^{1/2}\|u\|_{H^s}$, avec $J=\int|\xi|^{2\alpha}(1+|\xi|^2)^{-s}\,d\xi$, finie si et seulement si $2s-2\alpha>d$.`,
    proof: {
      purpose: 'demonstration',
      goal: 'fin',
      nodes: [
        { id: 'h-s', kind: 'hypothese', text: t`$0<\alpha<1$, $s>\frac d2+\alpha$, $u\in H^s(\mathbb R^d)$, et $v(x)=(2\pi)^{-d/2}\int e^{ix\cdot\xi}\hat u(\xi)\,d\xi$ son représentant continu.` },
        { id: 'c-phase', kind: 'inegalite', text: t`Pour $a,b\in\mathbb R$ : $|e^{ia}-e^{ib}|\le\min(2,|a-b|)\le 2^{1-\alpha}|a-b|^\alpha$.` },
        { id: 'c-diff', kind: 'inegalite', text: t`$|v(x)-v(y)|\le(2\pi)^{-d/2}2^{1-\alpha}|x-y|^\alpha\displaystyle\int|\xi|^\alpha|\hat u(\xi)|\,d\xi$.` },
        { id: 'c-J', kind: 'inegalite', text: t`$J=\displaystyle\int_{\mathbb R^d}|\xi|^{2\alpha}(1+|\xi|^2)^{-s}\,d\xi<+\infty$.` },
        { id: 'c-cs', kind: 'inegalite', text: t`$\displaystyle\int|\xi|^\alpha|\hat u|\,d\xi\le J^{1/2}\|u\|_{H^s}$.` },
        { id: 'fin', kind: 'conclusion', text: t`$|v(x)-v(y)|\le(2\pi)^{-d/2}2^{1-\alpha}J^{1/2}\,\|u\|_{H^s}\,|x-y|^\alpha$ pour tous $x,y\in\mathbb R^d$.` },
        { id: 'x-phase', kind: 'inegalite', distractor: true, text: t`Pour $a,b\in\mathbb R$ : $|e^{ia}-e^{ib}|\le|a-b|^\alpha$.` },
        { id: 'x-limite', kind: 'inegalite', distractor: true, text: t`$J<+\infty$ dès que $s\ge\frac d2+\alpha$.` },
      ],
      justifications: [
        { id: 'j-min', label: t`$|e^{ia}-e^{ib}|\le 2$ et $\le|a-b|$ ; puis $\min(2,t)\le 2^{1-\alpha}t^\alpha$ pour $t\ge0$, en distinguant $t\le2$ et $t>2$.` },
        { id: 'j-integre', label: t`Différence des formules intégrales, avec $|(x-y)\cdot\xi|\le|x-y|\,|\xi|$.` },
        { id: 'j-polaire', label: t`Coordonnées polaires : à l'infini, $r^{2\alpha-2s+d-1}$ est intégrable si et seulement si $s>\frac d2+\alpha$ ; près de $0$, l'intégrande est borné.` },
        { id: 'j-cs', label: t`$|\xi|^\alpha|\hat u|=\big(|\xi|^\alpha w^{-s/2}\big)\big(w^{s/2}|\hat u|\big)$ avec $w=1+|\xi|^2$, puis Cauchy–Schwarz.`, theorem: 'cauchy-schwarz' },
        { id: 'j-report', label: 'Report de la majoration dans l’inégalité de différence.' },
      ],
      rules: [
        { from: [], to: 'c-phase', by: 'j-min' },
        { from: ['c-phase', 'h-s'], to: 'c-diff', by: 'j-integre' },
        { from: ['h-s'], to: 'c-J', by: 'j-polaire' },
        { from: ['c-J', 'h-s'], to: 'c-cs', by: 'j-cs' },
        { from: ['c-diff', 'c-cs'], to: 'fin', by: 'j-report' },
      ],
      traps: [
        {
          conclusion: 'x-phase',
          verdict: 'incorrect',
          concept: 'hypotheses-theoreme',
          message: t`Sans le facteur $2^{1-\alpha}$, la majoration est fausse pour $|a-b|$ grand.`,
          counterexample: t`$\alpha=\frac14$, $a-b=\pi$ : $|e^{ia}-e^{ib}|=2$, alors que $\pi^{1/4}<2$.`,
        },
        {
          conclusion: 'x-limite',
          verdict: 'incorrect',
          concept: 'injections-fractionnaires-cas-limite',
          message: t`Pour $s=\frac d2+\alpha$, l'intégrande se comporte à l'infini comme $r^{-1}$ : l'intégrale diverge.`,
          counterexample: t`$d=1$, $\alpha=\frac14$, $s=\frac34$ : $|\xi|^{1/2}(1+\xi^2)^{-3/4}\ge\frac{1}{2^{3/4}|\xi|}$ pour $|\xi|\ge1$.`,
        },
      ],
      removable: [],
    },
  },
  verification: { origin: 'complement', review: 'machine', notes: 'Le polycopié (p. PDF 19) ne donne qu’une idée de preuve (Cauchy–Schwarz pondéré, inversion de Fourier) ; la démonstration complète, dont la limite nulle à l’infini par Riemann–Lebesgue et la höldérianité de la variante, est un complément.' },
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'injections-fractionnaires.difficile',
  theoremId: 'injections-fractionnaires',
  level: 'difficile',
  title: t`Une non-linéarité polynomiale dans $H^{-s}$`,
  statement: t`Soient $d\ge1$, $0<s<\frac d2$, $2^*=\frac{2d}{d-2s}$, et $g(t)=\sum_{k=1}^pa_kt^k$ un polynôme réel de degré $p\ge1$, sans terme constant. Dans la formulation faible d'une équation posée dans $V=H^s(\mathbb R^d)$ (fonctions réelles), le terme $\int g(u)v$ doit définir, pour $u\in V$, un élément de $V'=H^{-s}(\mathbb R^d)$. Montrer que c'est le cas si $p+1\le 2^*$, en admettant l'injection critique $H^s\hookrightarrow L^{2^*}$ ; calculer la condition pour $(d,s)=(3,1)$ ; montrer que pour $g(t)=t^p$ et $p+1>2^*$ aucune majoration $\|g(u)\|_{H^{-s}}\le C\|u\|^p_{H^s}$ n'est possible.`,
  source: poly(41, 'Exercice 18, difficile ; section 4.5 (p. PDF 19)'),
  prerequisites: ['dualite-interpolation'],
  concepts: ['injections-fractionnaires-exposant-critique', 'hypotheses-theoreme', 'dual-identification'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-s', kind: 'hypothese', text: t`$d\ge 1$, $0<s<\frac d2$ et $2^*=\frac{2d}{d-2s}$ ; les fonctions sont réelles.` },
      { id: 'h-g', kind: 'hypothese', text: t`$g(t)=\sum_{k=1}^pa_kt^k$ est un polynôme réel de degré $p\ge 1$, sans terme constant.` },
      { id: 'h-p', kind: 'hypothese', text: t`$p+1\le 2^*$.` },
      { id: 't-crit', kind: 'application-theoreme', text: t`Il existe $S$ tel que $\|w\|_{L^{2^*}}\le S\|w\|_{H^s}$ pour tout $w\in H^s(\mathbb R^d)$ (injection critique, admise).` },
      { id: 't-lq', kind: 'inegalite', text: t`Pour tout $q\in[2,2^*]$, il existe $C_q$ tel que $\|w\|_{L^q}\le C_q\|w\|_{H^s}$ pour tout $w\in H^s(\mathbb R^d)$.` },
      { id: 'c-hold', kind: 'inegalite', text: t`Pour $1\le k\le p$ et $u,v\in H^s$ : $\int|u|^k|v|\le\|u\|^k_{L^{k+1}}\|v\|_{L^{k+1}}\le C^{k+1}_{k+1}\|u\|^k_{H^s}\|v\|_{H^s}$.` },
      { id: 'c-form', kind: 'consequence', text: t`Pour $u\in H^s$, $v\mapsto\int g(u)v$ est une forme linéaire continue sur $H^s(\mathbb R^d)$, de norme au plus $\sum_k|a_k|\,C^{k+1}_{k+1}\|u\|^k_{H^s}$.` },
      { id: 't-dual', kind: 'application-theoreme', text: t`$g(u)\in H^{-s}(\mathbb R^d)$, avec $\langle g(u),v\rangle=\int g(u)v$ : le terme non linéaire a un sens dans la formulation faible.` },
      {
        id: 'c-seuil',
        kind: 'egalite',
        text: t`Pour $(d,s)=(3,1)$ : $2^*=6$, et la condition s'écrit $p\le 5$.`,
        masked: t`Pour $(d,s)=(3,1)$ : valeur de $2^*$ et degré maximal autorisé, à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Valeurs de $2^*$ et du degré maximal $p$ pour $(d,s)=(3,1)$.`, expected: ['6', '5'], labels: ['2*', 'p max'] },
      },
      { id: 'e-dil', kind: 'consequence', text: t`Pour $g(t)=t^p$ et $p+1>2^*$, aucune majoration $\|g(w)\|_{H^{-s}}\le C\|w\|^p_{H^s}$ n'est possible sur $H^s(\mathbb R^d)$.` },
      { id: 'fin', kind: 'conclusion', text: t`Si $p+1\le 2^*$, alors $g(u)\in H^{-s}(\mathbb R^d)$ pour tout $u\in H^s$, avec $\|g(u)\|_{H^{-s}}\le\sum_k|a_k|\,C^{k+1}_{k+1}\|u\|^k_{H^s}$ ; pour $(d,s)=(3,1)$, cela signifie $p\le 5$ ; et la condition ne peut pas être relâchée pour $g(t)=t^p$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-Lqprime', kind: 'consequence', distractor: true, text: t`Pour tout $1\le k\le p$ et tout $u\in H^s(\mathbb R^d)$ : $u^k\in L^{(2^*)'}(\mathbb R^d)$, où $(2^*)'=\frac{2d}{d+2s}$.` },
      { id: 'x-constant', kind: 'consequence', distractor: true, text: t`Un terme constant $a_0\neq 0$ ne change rien : $v\mapsto\int a_0v$ est défini et continu sur $H^s(\mathbb R^d)$.` },
    ],
    justifications: [
      { id: 'j-crit', label: t`Injection de Sobolev fractionnaire à l'exposant critique, pour $0<s<\frac d2$.`, theorem: 'injections-fractionnaires' },
      { id: 'j-interp-lq', label: t`Hölder dans les espaces de Lebesgue : $\|w\|_{L^q}\le\|w\|^{1-\lambda}_{L^2}\|w\|^{\lambda}_{L^{2^*}}$ avec $\frac1q=\frac{1-\lambda}{2}+\frac{\lambda}{2^*}$, et $\|w\|_{L^2}\le\|w\|_{H^s}$.`, theorem: 'holder' },
      { id: 'j-holder-k', label: t`Hölder d'exposants $\frac{k+1}{k}$ et $k+1$, avec $2\le k+1\le p+1\le 2^*$.`, theorem: 'holder' },
      { id: 'j-somme', label: t`Linéarité en $v$ et somme des majorations des monômes.` },
      { id: 'j-dual', label: t`Identification de $(H^s)'$ à $H^{-s}$ par le crochet qui prolonge $\int fv$.`, theorem: 'dualite-interpolation' },
      { id: 'j-calc', label: t`$2^*=\frac{2d}{d-2s}$, puis $p+1\le 2^*$.` },
      { id: 'j-dilatation', label: t`$u=e^{-|x|^2}$, $u_\lambda=u(\lambda\,\cdot)$, $\lambda\ge1$ : $\int u_\lambda^{p+1}=\lambda^{-d}\int u^{p+1}$ et $\|u_\lambda\|^2_{H^s}\le\lambda^{2s-d}\|u\|^2_{H^s}$ ; la majoration imposerait $\lambda^{\frac{(d-2s)(p+1)}{2}-d}\le C'$, exposant positif si $p+1>2^*$.` },
      { id: 'j-syn', label: 'Réunion : condition suffisante, valeur critique, optimalité.' },
      // Justification séduisante et fausse.
      { id: 'j-cs-crit', label: t`Cauchy–Schwarz sur $\int|\hat w|$, comme dans le cas $s>\frac d2$.` },
    ],
    rules: [
      { from: ['h-s'], to: 't-crit', by: 'j-crit' },
      { from: ['t-crit', 'h-s'], to: 't-lq', by: 'j-interp-lq' },
      { from: ['t-lq', 'h-p', 'h-g'], to: 'c-hold', by: 'j-holder-k' },
      { from: ['c-hold', 'h-g'], to: 'c-form', by: 'j-somme' },
      { from: ['c-form'], to: 't-dual', by: 'j-dual' },
      { from: ['h-s'], to: 'c-seuil', by: 'j-calc' },
      { from: ['h-s'], to: 'e-dil', by: 'j-dilatation' },
      { from: ['t-dual', 'c-seuil', 'e-dil'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 't-crit',
        by: 'j-cs-crit',
        verdict: 'incorrect',
        concept: 'injections-fractionnaires-exposant-critique',
        message: t`Pour $s<\frac d2$, $\int(1+|\xi|^2)^{-s}\,d\xi=+\infty$ : Cauchy–Schwarz ne donne rien. L'injection à l'exposant critique demande un résultat supplémentaire de théorie des intégrales singulières (polycopié, p. PDF 19).`,
      },
      {
        conclusion: 'x-Lqprime',
        verdict: 'incorrect',
        concept: 'injections-fractionnaires-exposant-critique',
        message: t`Sur $\mathbb R^d$, $H^s$ ne s'injecte dans aucun $L^q$ avec $q<2$ ; or $(2^*)'<2$. Il faut traiter chaque monôme avec l'exposant $k+1\in[2,2^*]$.`,
        counterexample: t`$k=1$ et $u(x)=(1+|x|^2)^{-b/2}$ avec $\frac d2<b\le\frac{d+2s}{2}$ : $u\in H^s(\mathbb R^d)$, mais $\int|u|^{(2^*)'}=+\infty$, car $b\,(2^*)'\le d$.`,
      },
      {
        conclusion: 'x-constant',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Sur $\mathbb R^d$, les éléments de $H^s$ ne sont pas intégrables en général : un terme constant ne définit pas de forme sur $H^s(\mathbb R^d)$.`,
        counterexample: t`$v(x)=(1+|x|^2)^{-d/2}$ a toutes ses dérivées dans $L^2$, donc $v\in H^s(\mathbb R^d)$, mais $\int_{\mathbb R^d}v=+\infty$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-p',
        label: t`Retirer la condition $p+1\le 2^*$`,
        necessary: true,
        explanation: t`Au-delà de l'exposant critique, $\int|u|^p|v|$ peut diverger pour des $u,v\in H^s$.`,
        counterexample: t`$(d,s)=(3,1)$, $p=6$ : $u=v=|x|^{-3/7}\chi$, avec $\chi\in C^\infty_c(\mathbb R^3)$ égale à $1$ près de $0$, sont dans $H^1(\mathbb R^3)$ car $\frac37<\frac12$, et $\int|u|^6|v|=\int|x|^{-3}\chi^7\,dx=+\infty$.`,
      },
      {
        hypothesis: 'h-g',
        label: 'Retirer l’absence de terme constant',
        necessary: true,
        explanation: t`Un terme constant exige $v\in L^1$, ce que $H^s(\mathbb R^d)$ ne garantit pas.`,
        counterexample: t`$g\equiv 1$ et $v=(1+|x|^2)^{-d/2}\in H^s(\mathbb R^d)$ : $\int g(u)v=+\infty$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Pour $(d,s)=(3,\frac12)$, valeur de $2^*$.`, expected: '3' }],
  solution: t`**Injections disponibles.** L'injection critique $\|w\|_{L^{2^*}}\le S\|w\|_{H^s}$ est admise : elle relève d'un résultat supplémentaire de théorie des intégrales singulières (polycopié, p. PDF 19), et ne se déduit pas de Cauchy–Schwarz. Avec $\|w\|_{L^2}\le\|w\|_{H^s}$ et Hölder dans les espaces de Lebesgue, $\|w\|_{L^q}\le S^\lambda\|w\|_{H^s}$ pour tout $q\in[2,2^*]$.

**Monômes.** Pour $1\le k\le p$, on a $2\le k+1\le 2^*$. Hölder d'exposants $\frac{k+1}{k}$ et $k+1$ :
$$\int|u|^k|v|\le\|u\|^k_{L^{k+1}}\|v\|_{L^{k+1}}\le C^{k+1}_{k+1}\|u\|^k_{H^s}\|v\|_{H^s}.$$
En sommant, $v\mapsto\int g(u)v$ est linéaire et continue sur $H^s$ ; par dualité, $g(u)\in H^{-s}$, avec $\|g(u)\|_{H^{-s}}\le\sum_k|a_k|C^{k+1}_{k+1}\|u\|^k_{H^s}$.

**Cas $(d,s)=(3,1)$.** $2^*=6$, donc $p\le5$ : par exemple $u^3$ et $u^5$ sont admissibles dans $H^{-1}(\mathbb R^3)$.

**Optimalité.** Pour $g(t)=t^p$, $u=e^{-|x|^2}$ et $u_\lambda=u(\lambda\cdot)$ avec $\lambda\ge1$ : $\int u_\lambda^{p+1}=\lambda^{-d}\int u^{p+1}$ et $\|u_\lambda\|^2_{H^s}\le\lambda^{2s-d}\|u\|^2_{H^s}$. Une majoration $\|g(w)\|_{H^{-s}}\le C\|w\|^p_{H^s}$ donnerait $\int u_\lambda^{p+1}\le C\|u_\lambda\|^{p+1}_{H^s}$, soit $\lambda^{\frac{(d-2s)(p+1)}{2}-d}\le C'$ pour tout $\lambda\ge1$, ce qui exige $p+1\le 2^*$. Pour $(d,s)=(3,1)$ et $p=6$, on a même $\int|u|^6|v|=+\infty$ pour $u=v=|x|^{-3/7}\chi$.

**Pièges.** Le terme constant doit être absent sur $\mathbb R^d$ ; et l'on ne peut pas placer tous les monômes dans $L^{(2^*)'}$, puisque $H^s\not\subset L^q$ pour $q<2$.`,
  steps: [
    t`Rassembler l'injection critique admise et l'interpolation dans les espaces de Lebesgue.`,
    'Majorer chaque monôme par Hölder avec l’exposant $k+1$.',
    t`Sommer et conclure par dualité dans $H^{-s}$.`,
    t`Calculer $2^*$ pour $(d,s)=(3,1)$.`,
    t`Montrer l'optimalité par dilatation.`,
  ],
  commonErrors: [
    { id: 'e-cs', description: t`Prétendre obtenir l'injection critique par Cauchy–Schwarz sur la transformée de Fourier.`, concept: 'injections-fractionnaires-exposant-critique' },
    { id: 'e-dual', description: t`Placer tous les monômes dans $L^{(2^*)'}$, alors que $H^s\not\subset L^q$ pour $q<2$.`, concept: 'injections-fractionnaires-exposant-critique' },
    { id: 'e-constante', description: t`Oublier qu'un terme constant n'agit pas sur $H^s(\mathbb R^d)$.`, concept: 'hypotheses-theoreme' },
  ],
  hints: [
    t`Dans quel espace le terme $g(u)$ doit-il vivre pour que la formulation faible ait un sens, et quelles intégrabilités de $u$ fournit $H^s(\mathbb R^d)$ ?`,
    t`Traite les monômes un par un : pour $u^kv$, choisis des exposants de Hölder qui ne font intervenir que des $L^q$ avec $q\in[2,2^*]$.`,
    t`Avec les exposants $\frac{k+1}{k}$ et $k+1$, tout se ramène à $\|u\|_{L^{k+1}}$ et $\|v\|_{L^{k+1}}$, contrôlés si $k+1\le 2^*$. Pour l'optimalité, dilate une gaussienne.`,
  ],
  rubric: rubric({
    hypotheses: t`$0<s<\frac d2$, absence de terme constant et $p+1\le 2^*$ sont utilisées, et l'injection critique est déclarée admise.`,
    methode: 'Hölder par monôme, interpolation dans les Lebesgue, dualité.',
    validite: t`Les exposants restent dans $[2,2^*]$ ; la valeur critique pour $(3,1)$ est exacte.`,
    justifications: t`L'injection critique n'est pas attribuée à Cauchy–Schwarz ; l'optimalité est démontrée.`,
    conclusion: t`$g(u)\in H^{-s}$ avec estimation, et la condition $p+1\le 2^*$ est optimale.`,
  }),
  variant: {
    statement: t`Pour quelles dimensions $d\ge 3$ l'application $u\mapsto u^3$ envoie-t-elle $H^1(\mathbb R^d)$ dans $H^{-1}(\mathbb R^d)$, avec $\|u^3\|_{H^{-1}}\le C\|u\|^3_{H^1}$ ?`,
    solution: t`Ici $s=1$, $2^*=\frac{2d}{d-2}$ et $p=3$. La condition $4\le\frac{2d}{d-2}$ équivaut à $d\le 4$. Pour $d\in\{3,4\}$, Hölder d'exposants $\frac43$ et $4$ donne $\int|u|^3|v|\le\|u\|^3_{L^4}\|v\|_{L^4}\le C\|u\|^3_{H^1}\|v\|_{H^1}$. Pour $d\ge5$, l'argument de dilatation montre qu'aucune telle majoration n'est possible.`,
    closedChecks: [{ kind: 'rational', prompt: t`Plus grande dimension $d$ admissible.`, expected: '4' }],
  },
  verification: { origin: 'complement', review: 'machine', notes: 'L’injection critique est admise, comme au polycopié (p. PDF 19) ; le reste est un complément.' },
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT18: TheoremModule = {
  theorem: {
    id: 'injections-fractionnaires',
    spaces: [
      t`$H^s(\mathbb R^d)$, défini par $(1+|\xi|^2)^{s/2}\hat u\in L^2$.`,
      t`$C_0(\mathbb R^d)$ : fonctions continues tendant vers $0$ à l'infini, munies de la norme uniforme ; $C^{0,\alpha}(\mathbb R^d)$ : fonctions bornées et $\alpha$-höldériennes.`,
      t`Une injection $H^s\hookrightarrow X$ signifie : tout élément de $H^s$ admet un représentant dans $X$, et $\|u\|_X\le C\|u\|_{H^s}$.`,
    ],
    hypotheses: [
      {
        id: 'h-crit',
        text: t`Pour l'injection dans $L^{2d/(d-2s)}$ : $0<s<\frac d2$.`,
        whenRemoved: t`Pour $s=\frac d2$, l'exposant $\frac{2d}{d-2s}$ n'est plus défini, et $H^{d/2}(\mathbb R^d)\not\subset L^\infty(\mathbb R^d)$.`,
      },
      {
        id: 'h-c0',
        text: t`Pour l'injection dans $C_0$ : $s>\frac d2$, strictement.`,
        whenRemoved: t`Au cas limite, l'injection échoue : en dimension $1$, $\hat u(\xi)=\frac{1}{(1+|\xi|)\log(e+|\xi|)}$ définit $u\in H^{1/2}(\mathbb R)$ non essentiellement bornée.`,
      },
      {
        id: 'h-holder',
        text: t`Pour l'injection dans $C^{0,\alpha}$ : $0<\alpha<1$ et $s>\frac d2+\alpha$.`,
        whenRemoved: t`Pour $s=\frac d2+\alpha$, l'intégrale $\int|\xi|^{2\alpha}(1+|\xi|^2)^{-s}\,d\xi$ diverge : l'argument par Cauchy–Schwarz global ne s'applique plus. Ce n'est pas un contre-exemple : dans ce cas limite, l'injection subsiste (découpage des fréquences en $|\xi|\le|x-y|^{-1}$ et $|\xi|>|x-y|^{-1}$), hors de l'énoncé du polycopié.`,
      },
    ],
    statement: t`Sur $\mathbb R^d$, pour $0<s<\frac d2$, $H^s\hookrightarrow L^{2d/(d-2s)}$. Pour $s>\frac d2$, $H^s\hookrightarrow C_0(\mathbb R^d)$. Si $0<\alpha<1$ et $s>\frac d2+\alpha$, alors $H^s\hookrightarrow C^{0,\alpha}(\mathbb R^d)$.`,
    conclusions: {
      regularite: t`Pour $s>\frac d2$, tout élément de $H^s$ admet un représentant continu nul à l'infini, avec $\sup|u|\le(2\pi)^{-d/2}\big(\int(1+|\xi|^2)^{-s}\,d\xi\big)^{1/2}\|u\|_{H^s}$ ; pour $s>\frac d2+\alpha$, ce représentant est $\alpha$-höldérien.`,
      autre: t`Pour $0<s<\frac d2$ : $H^s\hookrightarrow L^q$ pour tout $q\in[2,\frac{2d}{d-2s}]$, par interpolation entre $L^2$ et l'exposant critique.`,
    },
    sourceProof: 'idee',
    proofOutline: [
      t`Pour $s>\frac d2$ : Cauchy–Schwarz donne $\|\hat u\|_{L^1}\le\|u\|_{H^s}\big(\int(1+|\xi|^2)^{-s}\,d\xi\big)^{1/2}<\infty$.`,
      t`Inversion de Fourier : $u$ coïncide presque partout avec $(2\pi)^{-d/2}\int e^{ix\cdot\xi}\hat u(\xi)\,d\xi$, continue et nulle à l'infini (Riemann–Lebesgue).`,
      t`Höldérianité : $|e^{i\xi\cdot x}-e^{i\xi\cdot y}|\le 2^{1-\alpha}|\xi|^\alpha|x-y|^\alpha$, puis Cauchy–Schwarz, convergent si $s>\frac d2+\alpha$.`,
      t`Exposant critique $\frac{2d}{d-2s}$ : résultat supplémentaire de théorie des intégrales singulières, admis ; il ne se déduit pas de Cauchy–Schwarz.`,
    ],
    warnings: [
      t`Le cas limite $s=\frac d2$ est exclu : $H^{d/2}(\mathbb R^d)\not\subset L^\infty(\mathbb R^d)$.`,
      t`L'injection critique dans $L^{2d/(d-2s)}$ n'est pas démontrée par Cauchy–Schwarz : elle est admise.`,
      t`« $u$ est continue » signifie : la classe $u$ admet un représentant continu.`,
      t`Sur $\mathbb R^d$, $H^s\not\subset L^q$ pour $q<2$ : les exposants accessibles pour $0<s<\frac d2$ sont $q\in[2,\frac{2d}{d-2s}]$.`,
    ],
    usefulFor: t`Vérifier qu'une non-linéarité est définie dans le bon espace de Lebesgue, ou dans le dual requis par une formulation faible, et qu'une solution Sobolev possède un représentant continu.`,
    verification: { origin: 'polycopie', review: 'machine', notes: 'Idée de preuve du polycopié (p. PDF 19) pour s > d/2 ; l’injection à l’exposant critique est admise.' },
  },
  definitions: [
    {
      id: 'injections-fractionnaires-injection',
      term: t`Injection continue $H^s\hookrightarrow X$`,
      statement: t`Tout élément de $H^s(\mathbb R^d)$ admet un représentant dans $X$, et il existe $C$ tel que $\|u\|_X\le C\|u\|_{H^s}$ pour tout $u\in H^s(\mathbb R^d)$.`,
      source: poly(19, 'Section 4.5'),
    },
    {
      id: 'injections-fractionnaires-exposant',
      term: t`Exposant critique $2^*$`,
      statement: t`Pour $0<s<\frac d2$ : $2^*=\frac{2d}{d-2s}$, et $H^s(\mathbb R^d)\hookrightarrow L^{2^*}(\mathbb R^d)$, résultat admis au polycopié.`,
      source: poly(19, 'Section 4.5'),
    },
  ],
  concepts: [
    {
      id: 'injections-fractionnaires-cas-limite',
      label: 'Cas limite $s=d/2$',
      reminder: t`L'injection dans $C_0$ exige $s>\frac d2$ strictement : pour $s=\frac d2$, $\int(1+|\xi|^2)^{-s}\,d\xi=+\infty$ et $H^{d/2}$ contient des fonctions non bornées.`,
    },
    {
      id: 'injections-fractionnaires-exposant-critique',
      label: 'Exposant critique',
      reminder: t`Pour $0<s<\frac d2$, $H^s\hookrightarrow L^q$ exactement pour $q\in[2,\frac{2d}{d-2s}]$ ; l'exposant critique demande un résultat d'intégrales singulières, non Cauchy–Schwarz.`,
    },
    {
      id: 'injections-fractionnaires-representant',
      label: 'Représentant continu',
      reminder: t`Un élément de $H^s$ est une classe : « continu » signifie qu'il admet un représentant continu, égal à lui presque partout.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-injections-fractionnaires-limite',
      theoremId: 'injections-fractionnaires',
      title: 'Le cas limite en dimension 1',
      claim: t`$H^{1/2}(\mathbb R)\hookrightarrow C_0(\mathbb R)$.`,
      correctStatement: t`$H^s(\mathbb R)\hookrightarrow C_0(\mathbb R)$ si et seulement si $s>\frac12$.`,
      task: t`Pour $\hat u(\xi)=\frac{1}{(1+|\xi|)\log(e+|\xi|)}$, la finitude de $\|u\|_{H^{1/2}}$ se ramène à $\int_0^{+\infty}\frac{dr}{(e+r)\log^2(e+r)}$. Calcule cette intégrale.`,
      check: { kind: 'rational', prompt: t`Valeur de $\int_0^{+\infty}\frac{dr}{(e+r)\log^2(e+r)}$`, expected: '1' },
      explanation: t`Une primitive est $-\frac{1}{\log(e+r)}$, d'où la valeur $\frac{1}{\log e}=1$ : $u\in H^{1/2}(\mathbb R)$. Mais $\int\hat u=+\infty$ (primitive $\log\log(e+r)$), et les moyennes gaussiennes $\int u\rho_\varepsilon=(2\pi)^{-1/2}\int\hat u\,e^{-\varepsilon^2\xi^2/2}$ tendent vers $+\infty$ : $u$ n'est pas bornée.`,
      concept: 'injections-fractionnaires-cas-limite',
      source: poly(41, 'Exercice 18, facile'),
    },
    {
      id: 'ce-injections-fractionnaires-surcritique',
      theoremId: 'injections-fractionnaires',
      title: 'Au-delà de l’exposant critique',
      claim: t`Pour $u,v\in H^1(\mathbb R^3)$, on a toujours $\int|u|^6|v|<+\infty$.`,
      correctStatement: t`$\int|u|^p|v|$ est fini pour tous $u,v\in H^1(\mathbb R^3)$ dès que $1\le p$ et $p+1\le 6$.`,
      task: t`Avec $u=v=|x|^{-a}\chi$, où $\chi\in C^\infty_c(\mathbb R^3)$ vaut $1$ près de $0$, on a $u\in H^1(\mathbb R^3)$ pour $a<\frac12$, et $\int|u|^6|v|=\int|x|^{-7a}\chi^7\,dx$. Donne le plus petit $a$ rendant cette intégrale infinie.`,
      check: { kind: 'rational', prompt: t`Plus petite valeur de $a$`, expected: '3/7' },
      explanation: t`En dimension $3$, $|x|^{-7a}$ est intégrable près de $0$ si et seulement si $7a<3$ : l'intégrale diverge dès $a=\frac37$, valeur inférieure à $\frac12$. Ainsi $u,v\in H^1(\mathbb R^3)$ et $\int|u|^6|v|=+\infty$ : pour $(d,s)=(3,1)$, la condition $p+1\le 2^*=6$ ne peut pas être relâchée.`,
      concept: 'injections-fractionnaires-exposant-critique',
      source: poly(41, 'Exercice 18, difficile'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT18;
