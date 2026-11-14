/**
 * Résultat 29 — Lumer–Phillips, formulation hilbertienne (polycopié, section 6.8).
 */
import { t, rubric, poly, complement, FROM_POLY, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'lumer-phillips.facile',
  theoremId: 'lumer-phillips',
  level: 'facile',
  title: 'Le laplacien de Dirichlet est dissipatif',
  statement: t`Soit $\Omega\subset\mathbb R^d$ un ouvert borné, $H=L^2(\Omega)$ réel, et $A=\Delta$ de domaine $D(A)=\{u\in H^1_0(\Omega):\Delta u\in L^2(\Omega)\}$, le laplacien étant pris au sens des distributions : c'est le laplacien de Dirichlet, opérateur négatif. Montrer que $\langle Au,u\rangle_{L^2}=-\int_\Omega|\nabla u|^2\le0$ pour tout $u\in D(A)$, sans supposer $u\in H^2(\Omega)$ ni aucune régularité de $\partial\Omega$.`,
  source: poly(43, 'Exercice 29, facile (p. PDF 43)'),
  prerequisites: ['distributions'],
  concepts: ['domaine-operateur', 'regularite-bord', 'circularite', 'lumer-phillips-dissipativite', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-omega', kind: 'hypothese', text: t`$\Omega\subset\mathbb R^d$ est un ouvert borné, et $H=L^2(\Omega)$ est réel.` },
      { id: 'd-H10', kind: 'definition', text: t`$H^1_0(\Omega)$ est l'adhérence de $C^\infty_c(\Omega)$ dans $H^1(\Omega)$.` },
      { id: 'd-A', kind: 'definition', text: t`$D(A)=\{u\in H^1_0(\Omega):\Delta u\in L^2(\Omega)\}$ et $Au=\Delta u$, où $\Delta u=\sum_i\partial_i\partial_iu$ au sens des distributions.` },
      { id: 's-u', kind: 'definition', local: true, text: t`Soit $u\in D(A)$.` },

      { id: 'f-dist', kind: 'egalite', text: t`Pour tout $\varphi\in C^\infty_c(\Omega)$ : $\int_\Omega(\Delta u)\,\varphi=-\int_\Omega\nabla u\cdot\nabla\varphi$.` },
      { id: 'appr', kind: 'consequence', text: t`Il existe $(\varphi_k)\subset C^\infty_c(\Omega)$ telle que $\varphi_k\to u$ dans $H^1(\Omega)$.` },
      { id: 'pass-g', kind: 'consequence', text: t`$\int_\Omega(\Delta u)\,\varphi_k\to\int_\Omega(\Delta u)\,u$ quand $k\to\infty$.` },
      { id: 'pass-d', kind: 'consequence', text: t`$\int_\Omega\nabla u\cdot\nabla\varphi_k\to\int_\Omega|\nabla u|^2$ quand $k\to\infty$.` },
      { id: 'ipp', kind: 'egalite', text: t`$\int_\Omega(\Delta u)\,u=-\int_\Omega|\nabla u|^2$.` },
      { id: 'fin', kind: 'conclusion', text: t`Pour tout $u\in D(A)$ : $\langle Au,u\rangle_{L^2}=-\int_\Omega|\nabla u|^2\le0$.` },

      { id: 'x-H2', kind: 'consequence', distractor: true, after: ['s-u'], text: t`Tout $u\in D(A)$ appartient à $H^2(\Omega)$.` },
      { id: 'x-nul', kind: 'egalite', distractor: true, after: ['ipp'], text: t`$\langle Au,u\rangle_{L^2}=0$ pour tout $u\in D(A)$.` },
    ],
    justifications: [
      { id: 'j-def-dist', label: t`Définition des dérivées au sens des distributions, $\langle\partial_i\partial_iu,\varphi\rangle=-\langle\partial_iu,\partial_i\varphi\rangle$, avec $\partial_iu\in L^2(\Omega)$ et $\Delta u\in L^2(\Omega)$.`, theorem: 'distributions' },
      { id: 'j-def-H10', label: t`Définition de $H^1_0(\Omega)$ par adhérence.` },
      { id: 'j-cs-g', label: t`Cauchy–Schwarz dans $L^2(\Omega)$ : $\big|\int(\Delta u)(\varphi_k-u)\big|\le\|\Delta u\|_{L^2}\|\varphi_k-u\|_{L^2}$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-cs-d', label: t`Cauchy–Schwarz dans $L^2(\Omega)^d$ : $\big|\int\nabla u\cdot\nabla(\varphi_k-u)\big|\le\|\nabla u\|_{L^2}\|\nabla(\varphi_k-u)\|_{L^2}$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-limite', label: t`Passage à la limite dans les deux membres de l'égalité écrite pour $\varphi=\varphi_k$.` },
      { id: 'j-signe', label: t`$\int_\Omega|\nabla u|^2\ge0$.` },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-test-u', label: t`On prend directement $\varphi=u$ dans la définition des dérivées au sens des distributions.` },
      { id: 'j-green', label: t`Formule de Green sur $\Omega$, le terme de bord étant nul car $u=0$ sur $\partial\Omega$.` },
      { id: 'j-positivite', label: t`Le laplacien de Dirichlet $-\Delta$ est un opérateur positif.` },
    ],
    rules: [
      { from: ['d-A', 's-u'], to: 'f-dist', by: 'j-def-dist' },
      { from: ['s-u', 'd-A', 'd-H10'], to: 'appr', by: 'j-def-H10' },
      { from: ['appr', 'd-A', 'h-omega'], to: 'pass-g', by: 'j-cs-g' },
      { from: ['appr', 'h-omega'], to: 'pass-d', by: 'j-cs-d' },
      { from: ['f-dist', 'pass-g', 'pass-d'], to: 'ipp', by: 'j-limite' },
      { from: ['ipp'], to: 'fin', by: 'j-signe' },
    ],
    traps: [
      {
        conclusion: 'x-H2',
        verdict: 'incorrect',
        concept: 'regularite-bord',
        message: t`La régularité $H^2$ dépend du bord : elle n'est pas disponible sur un ouvert borné quelconque, et l'exercice n'en a pas besoin.`,
        counterexample: t`Sur un domaine plan à coin rentrant d'angle $3\pi/2$, la fonction $\eta(r)\,r^{2/3}\sin(2\theta/3)$, où $\eta$ est une troncature égale à $1$ près du coin, appartient à $D(A)$ sans appartenir à $H^2(\Omega)$.`,
      },
      {
        conclusion: 'x-nul',
        verdict: 'incorrect',
        concept: 'calcul-exact',
        message: t`L'égalité $\int(\Delta u)u=-\int|\nabla u|^2$ donne une valeur strictement négative dès que $\nabla u\neq0$.`,
        counterexample: t`$\Omega=]0,1[$, $u(x)=\sin(\pi x)$ : $u\in D(A)$ et $\langle Au,u\rangle=-\pi^2\int_0^1\sin^2(\pi x)\,dx=-\frac{\pi^2}2$.`,
      },
      {
        conclusion: 'ipp',
        by: 'j-test-u',
        verdict: 'incorrect',
        concept: 'domaine-operateur',
        message: t`$u$ n'est pas une fonction test : son support n'est pas compact dans $\Omega$ en général, et la formule n'est établie que pour $\varphi\in C^\infty_c(\Omega)$. Il faut un argument de densité dans $H^1_0(\Omega)$.`,
        counterexample: t`$\Omega=]0,1[$ et $u(x)=x(1-x)$ : $u\in D(A)$, mais son support $[0,1]$ n'est pas un compact de $]0,1[$.`,
      },
      {
        conclusion: 'ipp',
        by: 'j-green',
        verdict: 'a-justifier',
        concept: 'regularite-bord',
        message: t`La formule de Green avec terme de bord demande $u\in H^2(\Omega)$ et un bord assez régulier pour donner un sens à $\partial_\nu u$ : aucune de ces hypothèses n'est disponible. La densité de $C^\infty_c(\Omega)$ dans $H^1_0(\Omega)$ évite toute considération de bord.`,
      },
      {
        conclusion: 'fin',
        by: 'j-positivite',
        verdict: 'incorrect',
        concept: 'circularite',
        message: t`C'est exactement ce qu'il faut démontrer : invoquer la positivité de $-\Delta$ revient à supposer le résultat.`,
      },
    ],
    removable: [
      {
        hypothesis: 'd-H10',
        label: t`Remplacer $H^1_0(\Omega)$ par $H^1(\Omega)$ dans le domaine`,
        necessary: true,
        explanation: t`Sans condition de Dirichlet, l'approximation par des fonctions test disparaît, et $\langle\Delta u,u\rangle$ peut être positif.`,
        counterexample: t`$\Omega=]0,1[$ et $u(x)=e^x$ : $u\in H^1(\Omega)$, $\Delta u=e^x\in L^2(\Omega)$, et $\langle\Delta u,u\rangle=\int_0^1e^{2x}\,dx=\frac{e^2-1}2>0$.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Pour $\Omega=]0,1[$ et $u(x)=x(1-x)$ : valeur de $\langle Au,u\rangle_{L^2}$`, expected: '-1/3' }],
  solution: t`**Formule pour les fonctions test.** Soit $u\in D(A)$. Comme $u\in H^1(\Omega)$, les dérivées $\partial_iu$ sont dans $L^2(\Omega)$, et la définition des dérivées au sens des distributions donne, pour $\varphi\in C^\infty_c(\Omega)$, $\langle\Delta u,\varphi\rangle=\sum_i\langle\partial_i(\partial_iu),\varphi\rangle=-\sum_i\int_\Omega\partial_iu\,\partial_i\varphi$. Puisque $\Delta u\in L^2(\Omega)$, le membre de gauche vaut $\int_\Omega(\Delta u)\varphi$.

**Densité.** Par définition de $H^1_0(\Omega)$, il existe $\varphi_k\in C^\infty_c(\Omega)$ avec $\varphi_k\to u$ dans $H^1(\Omega)$. Par Cauchy–Schwarz, $\int(\Delta u)\varphi_k\to\int(\Delta u)u$, car $\varphi_k\to u$ dans $L^2(\Omega)$, et $\int\nabla u\cdot\nabla\varphi_k\to\int|\nabla u|^2$, car $\nabla\varphi_k\to\nabla u$ dans $L^2(\Omega)^d$. À la limite : $\int_\Omega(\Delta u)u=-\int_\Omega|\nabla u|^2$.

**Conclusion.** $\langle Au,u\rangle_{L^2}=-\|\nabla u\|^2_{L^2}\le0$ : $A$ est dissipatif. Aucune régularité $H^2$ ni aucune hypothèse sur $\partial\Omega$ n'a servi. Exemple : pour $\Omega=]0,1[$ et $u(x)=x(1-x)$, $\Delta u=-2$ et $\langle Au,u\rangle=-2\int_0^1x(1-x)\,dx=-\frac13=-\int_0^1(1-2x)^2\,dx$.`,
  steps: [
    t`Écrire la définition de $\Delta u$ au sens des distributions contre $\varphi\in C^\infty_c(\Omega)$.`,
    t`Approcher $u$ dans $H^1(\Omega)$ par des fonctions test.`,
    'Passer à la limite dans les deux membres.',
    'Conclure sur le signe.',
  ],
  commonErrors: [
    { id: 'e-test', description: t`Prendre $\varphi=u$ dans la définition des dérivées au sens des distributions, alors que $u$ n'est pas une fonction test.`, concept: 'domaine-operateur' },
    { id: 'e-green', description: t`Utiliser la formule de Green avec terme de bord sans disposer de $u\in H^2(\Omega)$.`, concept: 'regularite-bord' },
    { id: 'e-circ', description: t`Invoquer la positivité de $-\Delta$, qui est précisément ce qu'il faut démontrer.`, concept: 'circularite' },
  ],
  hints: [
    t`Que signifie $\Delta u$ au sens des distributions, et contre quelles fonctions sait-on tester ? $u$ en fait-il partie ?`,
    t`Écris l'égalité pour $\varphi\in C^\infty_c(\Omega)$, puis approche $u$ par de telles fonctions, dans la norme adaptée aux deux membres.`,
    t`Prends $\varphi_k\to u$ dans $H^1(\Omega)$ : chaque membre de $\int(\Delta u)\varphi_k=-\int\nabla u\cdot\nabla\varphi_k$ passe à la limite par Cauchy–Schwarz.`,
  ],
  rubric: rubric({
    hypotheses: t`$u\in H^1_0(\Omega)$ et $\Delta u\in L^2(\Omega)$ sont tous deux utilisés.`,
    methode: t`La formule est établie sur $C^\infty_c(\Omega)$, puis étendue par densité dans $H^1_0(\Omega)$.`,
    validite: 'Les deux passages à la limite sont justifiés.',
    justifications: 'Aucune formule de Green avec terme de bord n’est utilisée sans hypothèse de régularité.',
    conclusion: t`$\langle Au,u\rangle=-\int_\Omega|\nabla u|^2\le0$ est obtenu.`,
  }),
  variant: {
    statement: t`Soit $q\in L^\infty(\Omega)$ avec $q\ge0$ p.p., et $A_q=\Delta-q$ sur le même domaine $D(A)$. Montrer que $\langle A_qu,u\rangle=-\int_\Omega|\nabla u|^2-\int_\Omega qu^2\le0$, puis calculer $\langle A_qu,u\rangle$ pour $\Omega=]0,1[$, $q=1$ et $u(x)=x(1-x)$.`,
    solution: t`Comme $qu\in L^2(\Omega)$, la condition $\Delta u-qu\in L^2(\Omega)$ équivaut à $\Delta u\in L^2(\Omega)$ : le domaine est inchangé. Par l'exercice, $\langle\Delta u,u\rangle=-\int|\nabla u|^2$, et $\langle qu,u\rangle=\int qu^2\ge0$, d'où $\langle A_qu,u\rangle\le0$. Pour $\Omega=]0,1[$, $q=1$ et $u=x(1-x)$ : $-\int_0^1(1-2x)^2\,dx-\int_0^1x^2(1-x)^2\,dx=-\frac13-\frac1{30}=-\frac{11}{30}$.`,
    closedChecks: [{ kind: 'rational', prompt: t`Valeur de $\langle A_qu,u\rangle$ pour $\Omega=]0,1[$, $q=1$, $u(x)=x(1-x)$`, expected: '-11/30' }],
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'lumer-phillips.intermediaire',
  theoremId: 'lumer-phillips',
  level: 'intermediaire',
  title: t`De la dissipativité à la minoration $\|(\lambda I-A)u\|\ge\lambda\|u\|$`,
  statement: t`Soit $H$ un espace de Hilbert, réel ou complexe, et $A:D(A)\subset H\to H$ linéaire et dissipatif : $\mathrm{Re}\langle Au,u\rangle\le0$ pour tout $u\in D(A)$. Pour $\lambda>0$ et $u\in D(A)$, démontrer $\|(\lambda I-A)u\|\ge\lambda\|u\|$. En déduire que $\lambda I-A$ est injectif ; que, s'il est de plus surjectif, $\lambda\in\rho(A)$ et $\|R(\lambda,A)\|\le1/\lambda$ ; et que $\mathrm{Im}(\lambda I-A)$ est fermée lorsque $A$ est fermé.`,
  source: poly(43, 'Exercice 29, intermédiaire (p. PDF 43) ; démonstration de Lumer–Phillips (p. PDF 27)'),
  prerequisites: [],
  concepts: ['lumer-phillips-dissipativite', 'justification-absente', 'circularite', 'fermeture-espace'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-H', kind: 'hypothese', text: t`$H$ est un espace de Hilbert, réel ou complexe, et $A:D(A)\subset H\to H$ est linéaire.` },
      { id: 'h-diss', kind: 'hypothese', text: t`$A$ est dissipatif : $\mathrm{Re}\langle Au,u\rangle\le0$ pour tout $u\in D(A)$.` },
      { id: 's-u', kind: 'definition', local: true, text: t`Soient $\lambda>0$ et $u\in D(A)$.` },
      { id: 'h-ferme', kind: 'hypothese', text: t`Pour la dernière assertion : $A$ est fermé.` },

      { id: 'dev', kind: 'egalite', text: t`$\mathrm{Re}\langle(\lambda I-A)u,u\rangle=\lambda\|u\|^2-\mathrm{Re}\langle Au,u\rangle$.` },
      { id: 'min', kind: 'inegalite', text: t`$\lambda\|u\|^2\le\mathrm{Re}\langle(\lambda I-A)u,u\rangle$.` },
      { id: 'cs', kind: 'inegalite', text: t`$\mathrm{Re}\langle(\lambda I-A)u,u\rangle\le\|(\lambda I-A)u\|\,\|u\|$.` },
      { id: 'chain', kind: 'inegalite', text: t`$\lambda\|u\|^2\le\|(\lambda I-A)u\|\,\|u\|$.` },
      { id: 'borne-inf', kind: 'inegalite', text: t`$\|(\lambda I-A)u\|\ge\lambda\|u\|$.` },
      { id: 'inj', kind: 'consequence', text: t`$\lambda I-A$ est injectif.` },
      { id: 'inv-borne', kind: 'inegalite', text: t`Si $\lambda I-A$ est surjectif, alors $\lambda\in\rho(A)$ et $\|R(\lambda,A)\|\le1/\lambda$.` },
      { id: 'im-fermee', kind: 'consequence', text: t`Si $A$ est fermé, $\mathrm{Im}(\lambda I-A)$ est fermée dans $H$.` },
      { id: 'fin', kind: 'conclusion', text: t`Pour tous $\lambda>0$ et $u\in D(A)$ : $\|(\lambda I-A)u\|\ge\lambda\|u\|$ ; $\lambda I-A$ est injectif, d'inverse borné par $1/\lambda$ sur son image, et cette image est fermée si $A$ est fermé.` },

      { id: 'x-sens', kind: 'inegalite', distractor: true, after: ['chain'], text: t`$\|(\lambda I-A)u\|\le\lambda\|u\|$.` },
      { id: 'x-reel', kind: 'consequence', distractor: true, after: ['dev'], text: t`$\langle Au,u\rangle$ est un réel négatif ou nul.` },
    ],
    justifications: [
      { id: 'j-lin', label: t`Linéarité du produit scalaire en la première variable, et $\langle u,u\rangle=\|u\|^2$.` },
      { id: 'j-diss', label: t`Hypothèse de dissipativité : $-\mathrm{Re}\langle Au,u\rangle\ge0$.` },
      { id: 'j-cs', label: t`Inégalité de Cauchy–Schwarz, et $\mathrm{Re}\,z\le|z|$ pour tout $z$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-trans', label: 'Transitivité des deux inégalités.' },
      { id: 'j-div', label: t`Si $u=0$, l'inégalité est triviale ; sinon, on divise par $\|u\|>0$.` },
      { id: 'j-noyau', label: t`Si $(\lambda I-A)u=0$, alors $\lambda\|u\|\le0$, donc $u=0$.` },
      { id: 'j-inverse', label: t`L'inverse est défini sur $\mathrm{Im}(\lambda I-A)$, et la minoration appliquée à $u=(\lambda I-A)^{-1}f$ donne $\|(\lambda I-A)^{-1}f\|\le\|f\|/\lambda$.` },
      { id: 'j-cauchy-im', label: t`Si $(\lambda I-A)u_k\to f$, la minoration rend $(u_k)$ de Cauchy, donc $u_k\to u$ ; alors $Au_k\to\lambda u-f$, et la fermeture de $A$ donne $u\in D(A)$ et $(\lambda I-A)u=f$.` },
      { id: 'j-syn', label: 'Réunion des propriétés établies.' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-triang', label: t`Inégalité triangulaire : $\|(\lambda I-A)u\|\ge\lambda\|u\|-\|Au\|\ge\lambda\|u\|$.` },
      { id: 'j-div-brute', label: t`Diviser par $\|u\|$.` },
      { id: 'j-lp', label: 'Théorème de Lumer–Phillips.', theorem: 'lumer-phillips' },
    ],
    rules: [
      { from: ['h-H', 's-u'], to: 'dev', by: 'j-lin' },
      { from: ['dev', 'h-diss'], to: 'min', by: 'j-diss' },
      { from: ['h-H', 's-u'], to: 'cs', by: 'j-cs' },
      { from: ['min', 'cs'], to: 'chain', by: 'j-trans' },
      { from: ['chain'], to: 'borne-inf', by: 'j-div' },
      { from: ['borne-inf'], to: 'inj', by: 'j-noyau' },
      { from: ['borne-inf', 'inj'], to: 'inv-borne', by: 'j-inverse' },
      { from: ['borne-inf', 'h-ferme'], to: 'im-fermee', by: 'j-cauchy-im' },
      { from: ['borne-inf', 'inj', 'inv-borne', 'im-fermee'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-sens',
        verdict: 'incorrect',
        concept: 'lumer-phillips-dissipativite',
        message: t`La dissipativité donne une minoration, pas une majoration : $\lambda\|u\|^2\le\|(\lambda I-A)u\|\,\|u\|$.`,
        counterexample: t`$A=-I$, dissipatif, et $\lambda=1$ : $\|(\lambda I-A)u\|=2\|u\|>\|u\|$ pour $u\neq0$.`,
      },
      {
        conclusion: 'x-reel',
        verdict: 'incorrect',
        concept: 'lumer-phillips-dissipativite',
        message: t`Dans un Hilbert complexe, la dissipativité ne porte que sur la partie réelle : $\langle Au,u\rangle$ peut ne pas être réel.`,
        counterexample: t`$H=\mathbb C$ et $A=\mathrm iI$ : $\mathrm{Re}\langle Au,u\rangle=0$, mais $\langle Au,u\rangle=\mathrm i|u|^2$.`,
      },
      {
        conclusion: 'borne-inf',
        by: 'j-triang',
        verdict: 'incorrect',
        concept: 'lumer-phillips-dissipativite',
        message: t`L'inégalité triangulaire donne seulement $\lambda\|u\|-\|Au\|$, qui est au plus $\lambda\|u\|$ : la seconde inégalité est fausse dès que $Au\neq0$. C'est la partie réelle du produit scalaire qui fournit la minoration.`,
        counterexample: t`$A=-I$, $\lambda=1$, $\|u\|=1$ : $\lambda\|u\|-\|Au\|=0<1$.`,
      },
      {
        conclusion: 'borne-inf',
        by: 'j-div-brute',
        verdict: 'a-justifier',
        concept: 'justification-absente',
        message: t`Et si $u=0$ ? La division par $\|u\|$ exige de traiter ce cas à part.`,
      },
      {
        conclusion: 'fin',
        by: 'j-lp',
        verdict: 'incorrect',
        concept: 'circularite',
        message: t`Cette minoration est une étape de la démonstration de Lumer–Phillips : l'invoquer ici serait circulaire.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-diss',
        label: 'Retirer la dissipativité',
        necessary: true,
        explanation: t`Sans dissipativité, la minoration et l'injectivité peuvent tomber.`,
        counterexample: t`$A=I$ et $\lambda=1$ : $(\lambda I-A)u=0$ pour tout $u$, donc $\|(\lambda I-A)u\|\ge\lambda\|u\|$ est faux pour $u\neq0$.`,
      },
      {
        hypothesis: 'h-ferme',
        label: t`Retirer la fermeture de $A$`,
        necessary: true,
        explanation: t`La minoration subsiste, mais l'image de $\lambda I-A$ peut ne plus être fermée.`,
        counterexample: t`$H=\ell^2(\mathbb N^*)$ et $A$ diagonal de coefficients $-n$ sur les suites à support fini : $A$ est dissipatif, et $\mathrm{Im}(I-A)$ est l'espace des suites à support fini, dense et non fermé.`,
      },
    ],
  },
  closedChecks: [
    {
      kind: 'rational',
      prompt: t`Pour $H=\mathbb R^2$, $A=\begin{pmatrix}-1&2\\-2&-1\end{pmatrix}$, $\lambda=1$ et $u=e_1$ : valeur de $\|(\lambda I-A)u\|^2$`,
      expected: '8',
    },
  ],
  solution: t`**Minoration.** Pour $\lambda>0$ et $u\in D(A)$, la linéarité donne $\mathrm{Re}\langle(\lambda I-A)u,u\rangle=\lambda\|u\|^2-\mathrm{Re}\langle Au,u\rangle\ge\lambda\|u\|^2$, par dissipativité. Par Cauchy–Schwarz, $\mathrm{Re}\langle(\lambda I-A)u,u\rangle\le\|(\lambda I-A)u\|\,\|u\|$. Donc $\lambda\|u\|^2\le\|(\lambda I-A)u\|\,\|u\|$. Si $u=0$, l'inégalité cherchée est triviale ; sinon, on divise par $\|u\|>0$ : $\|(\lambda I-A)u\|\ge\lambda\|u\|$.

**Conséquences.** Si $(\lambda I-A)u=0$, alors $\lambda\|u\|\le0$, donc $u=0$ : $\lambda I-A$ est injectif. Sur son image, l'inverse vérifie $\|(\lambda I-A)^{-1}f\|\le\|f\|/\lambda$. Si $\lambda I-A$ est surjectif, c'est une bijection de $D(A)$ sur $H$ d'inverse borné : $\lambda\in\rho(A)$ et $\|R(\lambda,A)\|\le1/\lambda$ (l'opérateur $A$ est alors automatiquement fermé).

**Image fermée.** Supposons $A$ fermé, et $(\lambda I-A)u_k\to f$. La minoration donne $\|u_k-u_l\|\le\|(\lambda I-A)(u_k-u_l)\|/\lambda$ : $(u_k)$ est de Cauchy, donc $u_k\to u$. Alors $Au_k=\lambda u_k-(\lambda I-A)u_k\to\lambda u-f$, et la fermeture de $A$ donne $u\in D(A)$, $Au=\lambda u-f$, c'est-à-dire $f=(\lambda I-A)u$.

**Exemple.** Pour $A=\begin{pmatrix}-1&2\\-2&-1\end{pmatrix}$ sur $\mathbb R^2$, $\langle Au,u\rangle=-\|u\|^2$ ; avec $\lambda=1$ et $u=e_1$, $(\lambda I-A)u=(2,2)$, de norme au carré $8\ge1$.`,
  steps: [
    t`Développer la partie réelle de $\langle(\lambda I-A)u,u\rangle$.`,
    'Minorer par la dissipativité, majorer par Cauchy–Schwarz.',
    t`Diviser par $\|u\|$ après avoir traité le cas $u=0$.`,
    'En déduire l’injectivité et la borne de l’inverse.',
    t`Établir la fermeture de l'image lorsque $A$ est fermé.`,
  ],
  commonErrors: [
    { id: 'e-triang', description: t`Remplacer l'argument de partie réelle par l'inégalité triangulaire, qui donne seulement $\lambda\|u\|-\|Au\|$.`, concept: 'lumer-phillips-dissipativite' },
    { id: 'e-zero', description: t`Diviser par $\|u\|$ sans traiter le cas $u=0$.`, concept: 'justification-absente' },
    { id: 'e-reel', description: t`Écrire $\langle Au,u\rangle\le0$ dans un Hilbert complexe.`, concept: 'lumer-phillips-dissipativite' },
  ],
  hints: [
    t`Quelle quantité la dissipativité contrôle-t-elle ? Fais-la apparaître dans $\langle(\lambda I-A)u,u\rangle$.`,
    t`Minore $\mathrm{Re}\langle(\lambda I-A)u,u\rangle$ grâce à l'hypothèse, majore-la par Cauchy–Schwarz, puis compare les deux.`,
    t`$\lambda\|u\|^2\le\mathrm{Re}\langle(\lambda I-A)u,u\rangle\le\|(\lambda I-A)u\|\,\|u\|$. Pour l'image fermée : une suite $(\lambda I-A)u_k$ convergente rend $(u_k)$ de Cauchy.`,
  ],
  rubric: rubric({
    hypotheses: 'La dissipativité est utilisée sous sa forme exacte, en partie réelle.',
    methode: 'Minoration par la dissipativité, majoration par Cauchy–Schwarz.',
    validite: t`Le cas $u=0$ est traité et l'on utilise $\lambda>0$.`,
    justifications: t`La fermeture de l'image utilise explicitement la fermeture de $A$.`,
    conclusion: 'La minoration, l’injectivité, la borne de l’inverse et la fermeture de l’image sont obtenues.',
  }),
  variant: {
    statement: t`Soit $A$ linéaire et dissipatif sur un Hilbert $H$, et supposons $\lambda_0I-A$ surjectif pour un $\lambda_0>0$. Montrer que $A$ est fermé, et que $\lambda I-A$ est surjectif pour tout $\lambda>0$, avec $\|R(\lambda,A)\|\le1/\lambda$.`,
    solution: t`L'exercice donne $\|(\lambda I-A)u\|\ge\lambda\|u\|$ pour $\lambda>0$. Soit $\Lambda=\{\lambda>0:\lambda I-A\text{ surjectif}\}$ ; il contient $\lambda_0$. Pour $\lambda\in\Lambda$, $\lambda I-A$ est une bijection de $D(A)$ sur $H$, d'inverse de norme au plus $1/\lambda$ ; en particulier $(\lambda_0I-A)^{-1}$ est borné et partout défini, donc $A$ est fermé. Si $\lambda\in\Lambda$ et $|\mu-\lambda|<\lambda$, l'écriture $\mu I-A=\big[I+(\mu-\lambda)(\lambda I-A)^{-1}\big](\lambda I-A)$ et la série de Neumann montrent $\mu\in\Lambda$ : $\Lambda$ est ouvert. Si $\lambda_k\in\Lambda$ tend vers $\lambda>0$, alors $|\lambda-\lambda_k|<\lambda_k$ pour $k$ assez grand, donc $\lambda\in\Lambda$ : $\Lambda$ est fermé dans $]0,+\infty[$. Partie non vide, ouverte et fermée du connexe $]0,+\infty[$, $\Lambda$ lui est égal : tout $\lambda>0$ appartient à $\rho(A)$, avec $\|R(\lambda,A)\|\le1/\lambda$.`,
    proof: {
      purpose: 'demonstration',
      goal: 'fin',
      nodes: [
        { id: 'h-A', kind: 'hypothese', text: t`$H$ est un espace de Hilbert et $A:D(A)\subset H\to H$ est linéaire et dissipatif.` },
        { id: 'h-min', kind: 'hypothese', text: t`(Exercice) Pour tous $\lambda>0$ et $u\in D(A)$ : $\|(\lambda I-A)u\|\ge\lambda\|u\|$.` },
        { id: 'h-surj', kind: 'hypothese', text: t`Il existe $\lambda_0>0$ tel que $\lambda_0I-A$ soit surjectif.` },
        { id: 'd-L', kind: 'definition', text: t`$\Lambda=\{\lambda>0:\lambda I-A\text{ est surjectif}\}$.` },

        { id: 'nonvide', kind: 'consequence', text: t`$\lambda_0\in\Lambda$.` },
        { id: 'inv', kind: 'consequence', text: t`Pour $\lambda\in\Lambda$ : $\lambda I-A$ est une bijection de $D(A)$ sur $H$, et $\|(\lambda I-A)^{-1}\|\le1/\lambda$.` },
        { id: 'ferme', kind: 'consequence', text: t`$A$ est fermé.` },
        { id: 'ouvert', kind: 'consequence', text: t`Si $\lambda\in\Lambda$ et si $\mu>0$ vérifie $|\mu-\lambda|<\lambda$, alors $\mu\in\Lambda$.` },
        { id: 'ferme-L', kind: 'consequence', text: t`$\Lambda$ est fermé dans $]0,+\infty[$.` },
        { id: 'tout', kind: 'egalite', text: t`$\Lambda=\,]0,+\infty[$.` },
        { id: 'fin', kind: 'conclusion', text: t`Pour tout $\lambda>0$ : $\lambda\in\rho(A)$ et $\|R(\lambda,A)\|\le1/\lambda$.` },

        { id: 'x-ouvert-seul', kind: 'egalite', distractor: true, after: ['ouvert'], text: t`$\Lambda$ étant ouvert et non vide, $\Lambda=\,]0,+\infty[$.` },
      ],
      justifications: [
        { id: 'j-hyp', label: t`$\lambda_0$ vérifie la condition qui définit $\Lambda$.` },
        { id: 'j-inj-borne', label: t`La minoration donne l'injectivité, puis la borne de l'inverse sur $\mathrm{Im}(\lambda I-A)=H$.` },
        { id: 'j-ferme', label: t`$(\lambda_0I-A)^{-1}$ est borné et partout défini, donc fermé ; le graphe de $\lambda_0I-A$ est le symétrique du sien, et $A=\lambda_0I-(\lambda_0I-A)$ est fermé.` },
        { id: 'j-neumann', label: t`$\mu I-A=\big[I+(\mu-\lambda)(\lambda I-A)^{-1}\big](\lambda I-A)$, avec $\|(\mu-\lambda)(\lambda I-A)^{-1}\|\le|\mu-\lambda|/\lambda<1$ : série de Neumann.`, theorem: 'serie-neumann' },
        { id: 'j-suite', label: t`Si $\lambda_k\in\Lambda$ et $\lambda_k\to\lambda>0$, alors $|\lambda-\lambda_k|<\lambda_k$ pour $k$ assez grand, et le critère précédent s'applique.` },
        { id: 'j-connexe', label: t`Partie non vide, ouverte et fermée du connexe $]0,+\infty[$.` },
        { id: 'j-rho', label: t`Définition de $\rho(A)$ pour l'opérateur fermé $A$, avec la borne de l'inverse.` },
        { id: 'j-ouvert-suffit', label: 'Une partie ouverte non vide d’un intervalle est l’intervalle entier.' },
      ],
      rules: [
        { from: ['h-surj', 'd-L'], to: 'nonvide', by: 'j-hyp' },
        { from: ['h-A', 'h-min', 'd-L'], to: 'inv', by: 'j-inj-borne' },
        { from: ['inv', 'nonvide'], to: 'ferme', by: 'j-ferme' },
        { from: ['inv', 'd-L'], to: 'ouvert', by: 'j-neumann' },
        { from: ['ouvert'], to: 'ferme-L', by: 'j-suite' },
        { from: ['nonvide', 'ouvert', 'ferme-L'], to: 'tout', by: 'j-connexe' },
        { from: ['tout', 'inv', 'ferme'], to: 'fin', by: 'j-rho' },
      ],
      traps: [
        {
          conclusion: 'x-ouvert-seul',
          verdict: 'incorrect',
          concept: 'hypotheses-theoreme',
          message: t`L'ouverture ne suffit pas : un ouvert non vide de $]0,+\infty[$ peut en être distinct. La fermeture de $\Lambda$, qui vient de l'uniformité de la borne $1/\lambda$, est indispensable.`,
          counterexample: t`$]0,1[$ est un ouvert non vide de $]0,+\infty[$, distinct de $]0,+\infty[$.`,
        },
        {
          conclusion: 'tout',
          by: 'j-ouvert-suffit',
          verdict: 'incorrect',
          concept: 'hypotheses-theoreme',
          message: t`Une partie ouverte non vide d'un intervalle n'est pas l'intervalle entier : il faut aussi qu'elle soit fermée dans cet intervalle.`,
          counterexample: t`$]0,1[\,\subset\,]0,+\infty[$.`,
        },
      ],
      removable: [
        {
          hypothesis: 'h-surj',
          label: t`Retirer la surjectivité de $\lambda_0I-A$`,
          necessary: true,
          explanation: t`Sans un premier $\lambda_0$, l'ensemble $\Lambda$ peut être vide.`,
          counterexample: t`$Bu=u'$ sur $D(B)=H^1_0(]0,1[)$ est dissipatif, et $\mathrm{Im}(\lambda I-B)=\{f:\int_0^1e^{-\lambda s}f(s)\,ds=0\}$ pour tout $\lambda>0$ : $\Lambda=\emptyset$.`,
        },
      ],
    },
  },
  verification: FROM_POLY,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'lumer-phillips.difficile',
  theoremId: 'lumer-phillips',
  level: 'difficile',
  title: 'Génération par Lumer–Phillips et Lax–Milgram',
  statement: t`Soit $\Omega\subset\mathbb R^d$ un ouvert borné, $H=L^2(\Omega)$ réel, $V=H^1_0(\Omega)$ muni de $(u,v)_V=\int_\Omega\nabla u\cdot\nabla v+\int_\Omega uv$, et $A=\Delta$ de domaine $D(A)=\{u\in H^1_0(\Omega):\Delta u\in L^2(\Omega)\}$. On admet le résultat de l'exercice facile : $\langle Au,u\rangle=-\int_\Omega|\nabla u|^2$ pour $u\in D(A)$.

Montrer, par le théorème de Lax–Milgram appliqué sur $V$ à $a(u,v)=\int_\Omega\nabla u\cdot\nabla v+\int_\Omega uv$, que $I-A$ est surjectif, puis en déduire par Lumer–Phillips que $A$ engendre un $C_0$-semi-groupe de contractions sur $L^2(\Omega)$.`,
  source: poly(43, 'Exercice 29, difficile (p. PDF 43) ; énoncé de Lumer–Phillips (p. PDF 26–27)'),
  prerequisites: ['lax-milgram', 'distributions'],
  concepts: ['image-dense-surjective', 'hypotheses-theoreme', 'domaine-operateur', 'lumer-phillips-dissipativite', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-omega', kind: 'hypothese', text: t`$\Omega\subset\mathbb R^d$ est un ouvert borné, $H=L^2(\Omega)$ est réel, et $V=H^1_0(\Omega)$, muni de $(u,v)_V=\int_\Omega\nabla u\cdot\nabla v+\int_\Omega uv$, est un espace de Hilbert.` },
      { id: 'd-A', kind: 'definition', text: t`$D(A)=\{u\in H^1_0(\Omega):\Delta u\in L^2(\Omega)\}$ et $Au=\Delta u$, au sens des distributions.` },
      { id: 'h-diss', kind: 'hypothese', text: t`(Exercice facile) Pour $u\in D(A)$ : $\langle Au,u\rangle=-\int_\Omega|\nabla u|^2\le0$.` },
      { id: 's-f', kind: 'definition', local: true, text: t`Soit $f\in L^2(\Omega)$.` },
      { id: 'd-a', kind: 'definition', text: t`$a(u,v)=\int_\Omega\nabla u\cdot\nabla v+\int_\Omega uv$ pour $u,v\in V$, et $\ell(v)=\int_\Omega fv$.` },

      { id: 'dense', kind: 'consequence', text: t`$D(A)$ est dense dans $L^2(\Omega)$.` },
      { id: 'a-cont', kind: 'inegalite', text: t`$|a(u,v)|\le\|u\|_V\|v\|_V$ pour tous $u,v\in V$.` },
      { id: 'a-coer', kind: 'egalite', text: t`$a(v,v)=\|v\|_V^2$ pour tout $v\in V$ : $a$ est coercive.` },
      { id: 'l-cont', kind: 'inegalite', text: t`$|\ell(v)|\le\|f\|_{L^2}\|v\|_V$ pour tout $v\in V$ : $\ell\in V'$.` },
      { id: 'lm', kind: 'application-theoreme', text: t`Il existe un unique $u\in V$ tel que $a(u,v)=\ell(v)$ pour tout $v\in V$.` },
      { id: 'eq-dist', kind: 'egalite', text: t`$-\Delta u+u=f$ dans $\mathcal D'(\Omega)$.` },
      { id: 'surj', kind: 'egalite', text: t`$u\in D(A)$ et $(I-A)u=f$ ; $f$ étant arbitraire, $\mathrm{Im}(I-A)=L^2(\Omega)$.` },
      { id: 'fin', kind: 'conclusion', text: t`$A$ engendre un $C_0$-semi-groupe de contractions sur $L^2(\Omega)$.` },

      { id: 'x-dense', kind: 'consequence', distractor: true, after: ['dense'], text: t`Pour appliquer Lumer–Phillips, il suffit que $\mathrm{Im}(I-A)$ soit dense dans $L^2(\Omega)$.` },
      { id: 'x-A-surj', kind: 'consequence', distractor: true, after: ['surj'], text: t`Lumer–Phillips exige en outre que $A$ lui-même soit surjectif.` },
    ],
    justifications: [
      { id: 'j-dense', label: t`$C^\infty_c(\Omega)\subset D(A)$, et $C^\infty_c(\Omega)$ est dense dans $L^2(\Omega)$.`, theorem: 'densite-cinf' },
      { id: 'j-cs', label: t`Cauchy–Schwarz dans $L^2(\Omega)^d$ et dans $L^2(\Omega)$, puis dans $\mathbb R^2$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-coer', label: t`$a$ coïncide avec le produit scalaire de $V$.` },
      { id: 'j-l', label: t`Cauchy–Schwarz dans $L^2(\Omega)$ et $\|v\|_{L^2}\le\|v\|_V$.`, theorem: 'cauchy-schwarz' },
      { id: 'j-lm', label: 'Théorème de Lax–Milgram sur l’espace de Hilbert $V$.', theorem: 'lax-milgram' },
      { id: 'j-test', label: t`Tester avec $v=\varphi\in C^\infty_c(\Omega)\subset V$, puis définition des dérivées au sens des distributions.`, theorem: 'distributions' },
      { id: 'j-surj', label: t`$u\in H^1_0(\Omega)$ et $\Delta u=u-f\in L^2(\Omega)$ : donc $u\in D(A)$ et $u-\Delta u=f$.` },
      { id: 'j-lp', label: t`Théorème de Lumer–Phillips, avec $\lambda_0=1$.`, theorem: 'lumer-phillips' },
      // Justifications séduisantes, insuffisantes ou fausses.
      { id: 'j-riesz-L2', label: t`Théorème de Riesz dans $L^2(\Omega)$, appliqué à la forme $\ell$.`, theorem: 'riesz' },
      { id: 'j-lax-L2', label: t`Théorème de Lax–Milgram sur $H=L^2(\Omega)$, appliqué à la forme $a$.`, theorem: 'lax-milgram' },
      { id: 'j-poincare', label: t`Inégalité de Poincaré, nécessaire à la coercivité de $a$.`, theorem: 'poincare' },
    ],
    rules: [
      { from: ['d-A', 'h-omega'], to: 'dense', by: 'j-dense' },
      { from: ['d-a', 'h-omega'], to: 'a-cont', by: 'j-cs' },
      { from: ['d-a', 'h-omega'], to: 'a-coer', by: 'j-coer' },
      { from: ['d-a', 's-f', 'h-omega'], to: 'l-cont', by: 'j-l' },
      { from: ['h-omega', 'a-cont', 'a-coer', 'l-cont'], to: 'lm', by: 'j-lm' },
      { from: ['lm', 'd-a'], to: 'eq-dist', by: 'j-test' },
      { from: ['eq-dist', 'lm', 's-f', 'd-A'], to: 'surj', by: 'j-surj' },
      { from: ['dense', 'h-diss', 'surj'], to: 'fin', by: 'j-lp' },
    ],
    traps: [
      {
        conclusion: 'x-dense',
        verdict: 'incorrect',
        concept: 'image-dense-surjective',
        message: t`L'énoncé du polycopié exige $\mathrm{Im}(\lambda_0I-A)=H$ : une image seulement dense ne suffit pas pour l'opérateur $A$ lui-même.`,
        counterexample: t`$H=\ell^2(\mathbb N^*)$ et $A$ diagonal de coefficients $-n$ sur les suites à support fini : $A$ est dissipatif et densément défini, $\mathrm{Im}(I-A)$ est dense mais distincte de $H$, et $A$, non fermé, n'est pas un générateur.`,
      },
      {
        conclusion: 'x-A-surj',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Le critère porte sur $\lambda_0I-A$ pour un $\lambda_0>0$, non sur $A$.`,
        counterexample: t`$H=\mathbb R$ et $A=0$ : $A$ engendre $S(t)=I$, semi-groupe de contractions, alors que $A$ n'est pas surjectif.`,
      },
      {
        conclusion: 'lm',
        by: 'j-riesz-L2',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`Riesz dans $L^2(\Omega)$ représente $\ell$ par $f$ lui-même : il ne produit aucune solution dans $H^1_0(\Omega)$ et ignore le terme $\int\nabla u\cdot\nabla v$.`,
      },
      {
        conclusion: 'lm',
        by: 'j-lax-L2',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: t`$a$ n'est ni définie ni continue sur $L^2(\Omega)\times L^2(\Omega)$ : Lax–Milgram s'applique sur $V=H^1_0(\Omega)$.`,
        counterexample: t`$\Omega=]0,1[$ et $v_k(x)=\sqrt2\sin(k\pi x)$ : $\|v_k\|_{L^2}=1$ et $a(v_k,v_k)=k^2\pi^2+1\to+\infty$.`,
      },
      {
        conclusion: 'a-coer',
        by: 'j-poincare',
        verdict: 'a-justifier',
        concept: 'hypotheses-theoreme',
        message: t`L'inégalité de Poincaré est inutile ici : grâce au terme $\int uv$, $a(v,v)$ est exactement $\|v\|_V^2$. Elle servirait pour la forme $\int\nabla u\cdot\nabla v$ seule.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-diss',
        label: 'Retirer la dissipativité',
        necessary: true,
        explanation: t`La surjectivité seule ne donne pas un semi-groupe de contractions.`,
        counterexample: t`$\Omega=]0,1[$ et $A_c=\Delta+2\pi^2I$ sur $D(A)$ : $\lambda_0I-A_c$ est surjectif pour $\lambda_0>2\pi^2$, mais $\varphi=\sin(\pi x)$ vérifie $A_c\varphi=\pi^2\varphi$ ; un semi-groupe engendré par $A_c$ vérifierait $S(t)\varphi=e^{\pi^2t}\varphi$, de norme croissante : il n'est pas contractif.`,
      },
      {
        hypothesis: 'a-coer',
        label: t`Ne plus disposer de la coercivité de $a$`,
        necessary: true,
        explanation: t`Sans coercivité, Lax–Milgram ne s'applique plus, et la résolution peut échouer.`,
        counterexample: t`Sur $H^1_0(]0,1[)$, $b(u,v)=\int_0^1u'v'-\pi^2\int_0^1uv$ n'est pas coercive : $\varphi=\sin(\pi x)$ vérifie $b(u,\varphi)=0$ pour tout $u$, donc $b(u,v)=\int_0^1\varphi v$ n'a pas de solution (tester avec $v=\varphi$).`,
      },
      {
        hypothesis: 'surj',
        label: t`Ne plus disposer de la surjectivité de $I-A$`,
        necessary: true,
        explanation: t`Densité et dissipativité ne suffisent pas : la condition d'image est indispensable.`,
        counterexample: t`$Bu=u'$ sur $D(B)=H^1_0(]0,1[)$ : $B$ est densément défini et $\langle Bu,u\rangle=0$, mais $\mathrm{Im}(I-B)=\{f:\int_0^1e^{-s}f(s)\,ds=0\}\neq L^2(]0,1[)$ : $B$ n'est pas générateur.`,
      },
    ],
  },
  closedChecks: [{ kind: 'rational', prompt: t`Meilleure constante $\alpha$ telle que $a(v,v)\ge\alpha\|v\|_V^2$ pour tout $v\in V$`, expected: '1' }],
  solution: t`**Densité.** Pour $\varphi\in C^\infty_c(\Omega)$, $\varphi\in H^1_0(\Omega)$ et $\Delta\varphi\in C^\infty_c(\Omega)\subset L^2(\Omega)$ : $C^\infty_c(\Omega)\subset D(A)$, et $C^\infty_c(\Omega)$ est dense dans $L^2(\Omega)$.

**Dissipativité.** Par l'exercice facile, $\langle Au,u\rangle=-\int_\Omega|\nabla u|^2\le0$ pour $u\in D(A)$.

**Surjectivité de $I-A$.** Soit $f\in L^2(\Omega)$. La forme $a$ est le produit scalaire de $V$ : $|a(u,v)|\le\|u\|_V\|v\|_V$ et $a(v,v)=\|v\|_V^2$. La forme $\ell(v)=\int fv$ vérifie $|\ell(v)|\le\|f\|_{L^2}\|v\|_{L^2}\le\|f\|_{L^2}\|v\|_V$. Lax–Milgram donne un unique $u\in V$ tel que $a(u,v)=\ell(v)$ pour tout $v\in V$. Avec $v=\varphi\in C^\infty_c(\Omega)$ : $\int\nabla u\cdot\nabla\varphi+\int u\varphi=\int f\varphi$, c'est-à-dire $-\Delta u+u=f$ dans $\mathcal D'(\Omega)$. Ainsi $\Delta u=u-f\in L^2(\Omega)$, donc $u\in D(A)$ et $(I-A)u=f$.

**Conclusion.** $A$ est densément défini, dissipatif, et $\mathrm{Im}(I-A)=L^2(\Omega)$ : par Lumer–Phillips avec $\lambda_0=1$, $A$ engendre un $C_0$-semi-groupe de contractions sur $L^2(\Omega)$. L'inégalité de Poincaré n'a pas servi : le terme $\int uv$ rend $a$ coercive sur $V$, avec la constante $1$.`,
  steps: [
    t`Établir la densité de $D(A)$ dans $L^2(\Omega)$.`,
    t`Vérifier les hypothèses de Lax–Milgram pour $a$ et $\ell$ sur $V$.`,
    t`Revenir à l'équation au sens des distributions et vérifier $u\in D(A)$.`,
    t`Conclure par Lumer–Phillips avec $\lambda_0=1$.`,
  ],
  commonErrors: [
    { id: 'e-espace', description: t`Appliquer Lax–Milgram ou Riesz dans $L^2(\Omega)$ au lieu de $V=H^1_0(\Omega)$.`, concept: 'hypotheses-theoreme' },
    { id: 'e-dense', description: t`Se contenter d'une image dense de $I-A$.`, concept: 'image-dense-surjective' },
    { id: 'e-domaine', description: t`Oublier de vérifier $\Delta u\in L^2(\Omega)$, c'est-à-dire $u\in D(A)$.`, concept: 'domaine-operateur' },
  ],
  hints: [
    'Lumer–Phillips demande trois vérifications : lesquelles sont déjà acquises, et laquelle reste à faire ?',
    t`Pour résoudre $u-\Delta u=f$ avec $u\in H^1_0(\Omega)$, écris une formulation variationnelle sur $V$, vérifie les hypothèses de Lax–Milgram, puis reviens à l'équation au sens des distributions.`,
    t`$a$ est exactement le produit scalaire de $V$. Teste ensuite avec $v\in C^\infty_c(\Omega)$ pour obtenir $-\Delta u+u=f$, d'où $\Delta u=u-f\in L^2(\Omega)$.`,
  ],
  rubric: rubric({
    hypotheses: 'Densité, dissipativité et surjectivité sont établies séparément.',
    methode: 'La surjectivité provient de Lax–Milgram sur $V$, avec retour à l’équation.',
    validite: t`L'appartenance de la solution à $D(A)$ est vérifiée.`,
    justifications: t`Lumer–Phillips est invoqué avec $\lambda_0=1$, hypothèses vérifiées.`,
    conclusion: 'La génération d’un semi-groupe de contractions est obtenue.',
  }),
  variant: {
    statement: t`Soit $q\in L^\infty(\Omega)$ avec $q\ge0$ p.p., et $A_q=\Delta-q$ sur $D(A)$. Montrer que $A_q$ engendre un $C_0$-semi-groupe de contractions sur $L^2(\Omega)$, en appliquant Lax–Milgram à $a_q(u,v)=\int_\Omega\nabla u\cdot\nabla v+\int_\Omega(1+q)uv$.`,
    solution: t`Le domaine est inchangé, car $qu\in L^2(\Omega)$. La dissipativité vient de $\langle A_qu,u\rangle=-\int|\nabla u|^2-\int qu^2\le0$. La forme $a_q$ est continue sur $V$, avec $|a_q(u,v)|\le(1+\|q\|_{L^\infty})\|u\|_V\|v\|_V$, et coercive, car $a_q(v,v)\ge\|v\|_V^2$ puisque $q\ge0$. Lax–Milgram donne $u\in V$ avec $a_q(u,v)=\int fv$ pour tout $v\in V$, d'où $-\Delta u+(1+q)u=f$ dans $\mathcal D'(\Omega)$, puis $\Delta u=(1+q)u-f\in L^2(\Omega)$ : $u\in D(A)$ et $(I-A_q)u=f$. Lumer–Phillips conclut.`,
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT29: TheoremModule = {
  theorem: {
    id: 'lumer-phillips',
    spaces: [
      t`$H$ : espace de Hilbert réel ou complexe, de produit scalaire $\langle\cdot,\cdot\rangle$ ; dans le cas réel, $\mathrm{Re}$ est l'identité.`,
      t`$A:D(A)\subset H\to H$ : opérateur linéaire densément défini.`,
      t`$\mathrm{Im}(\lambda_0I-A)$ : image de $D(A)$ par $\lambda_0I-A$.`,
    ],
    hypotheses: [
      {
        id: 'h-dense',
        text: t`$A$ est densément défini.`,
        whenRemoved: t`Sur un Hilbert, cette hypothèse découle en fait des deux autres : si $v\perp D(A)$, on écrit $v=(\lambda_0I-A)u$ avec $u\in D(A)$, et $\lambda_0\|u\|^2\le\mathrm{Re}\langle v,u\rangle=0$ donne $u=0$, puis $v=0$.`,
      },
      {
        id: 'h-diss',
        text: t`$\mathrm{Re}\langle Au,u\rangle\le0$ pour tout $u\in D(A)$ : $A$ est dissipatif.`,
        whenRemoved: t`$A=I$ : $\mathrm{Im}(2I-A)=H$, mais $A$ engendre $S(t)=e^tI$, qui n'est pas contractif.`,
      },
      {
        id: 'h-surj',
        text: t`$\mathrm{Im}(\lambda_0I-A)=H$ pour un $\lambda_0>0$.`,
        whenRemoved: t`$Bu=u'$ sur $D(B)=H^1_0(]0,1[)\subset L^2(]0,1[)$ est dissipatif et densément défini, mais $\mathrm{Im}(\lambda I-B)$ est un hyperplan fermé strict pour tout $\lambda>0$ : $B$ n'est pas générateur.`,
      },
    ],
    statement: t`Un opérateur $A$ densément défini sur un Hilbert engendre un $C_0$-semi-groupe de contractions si et seulement si
$$\mathrm{Re}\langle Au,u\rangle\le0\quad(u\in D(A)),\qquad\mathrm{Im}(\lambda_0I-A)=H\ \text{ pour un }\lambda_0>0.$$`,
    conclusions: {
      existence: t`Sous les deux conditions, $A$ engendre un $C_0$-semi-groupe de contractions (par Hille–Yosida).`,
      autre: t`Réciproquement, le générateur d'un semi-groupe de contractions est dissipatif, et $\lambda I-A$ est surjectif pour tout $\lambda>0$.`,
    },
    sourceProof: 'complete',
    proofOutline: [
      t`Pour $\lambda>0$ : $\lambda\|u\|^2\le\mathrm{Re}\langle(\lambda I-A)u,u\rangle\le\|(\lambda I-A)u\|\,\|u\|$, donc $\|(\lambda I-A)u\|\ge\lambda\|u\|$.`,
      t`Si $\lambda_0I-A$ est surjectif, son inverse est borné ; $A$ est alors fermé.`,
      t`L'ensemble des $\lambda>0$ pour lesquels $\lambda I-A$ est surjectif est ouvert (série de Neumann) et fermé (borne inférieure uniforme) dans $]0,+\infty[$ ; il contient $\lambda_0$, donc vaut $]0,+\infty[$.`,
      t`On a alors $]0,+\infty[\subset\rho(A)$ et $\|R(\lambda,A)\|\le1/\lambda$ : Hille–Yosida conclut.`,
      t`Réciproque : pour $u\in D(A)$, $\mathrm{Re}\langle S(t)u-u,u\rangle\le\|S(t)u\|\,\|u\|-\|u\|^2\le0$ ; diviser par $t$ et faire $t\downarrow0$ donne $\mathrm{Re}\langle Au,u\rangle\le0$ (le polycopié dérive $\|S(t)u\|^2$ en $t=0$). La surjectivité provient du sens direct de Hille–Yosida.`,
    ],
    warnings: [
      t`Une image seulement dense de $\lambda_0I-A$ ne suffit pas pour $A$ lui-même.`,
      t`Dans un Hilbert complexe, seule la partie réelle de $\langle Au,u\rangle$ est contrôlée.`,
      t`La minoration $\|(\lambda I-A)u\|\ge\lambda\|u\|$ n'apporte d'information que pour $\lambda>0$ : pour $\lambda<0$, la minoration par $|\lambda|\,\|u\|$ peut tomber ($A=-I$, $\lambda=-1$).`,
      t`L'hypothèse de densité, présente dans l'énoncé, découle sur un Hilbert des deux autres conditions.`,
    ],
    usefulFor: t`Reconnaître un générateur contractif par un critère sur $A$ : signe de $\mathrm{Re}\langle Au,u\rangle$ et résolubilité de $\lambda_0u-Au=f$, souvent obtenue par Lax–Milgram.`,
    verification: FROM_POLY,
  },
  definitions: [
    {
      id: 'lumer-phillips-dissipatif',
      term: 'Opérateur dissipatif',
      statement: t`$A:D(A)\subset H\to H$ linéaire est dissipatif si $\mathrm{Re}\langle Au,u\rangle\le0$ pour tout $u\in D(A)$.`,
      source: poly(27, 'Section 6.8, Lumer–Phillips ; exercice 29 (p. PDF 43)'),
    },
    {
      id: 'lumer-phillips-laplacien-dirichlet',
      term: 'Laplacien de Dirichlet',
      statement: t`Sur un ouvert $\Omega$, $A=\Delta$ de domaine $D(A)=\{u\in H^1_0(\Omega):\Delta u\in L^2(\Omega)\}$ ; c'est un opérateur négatif, et $-A$ est la réalisation positive $-\Delta_D$.`,
      source: complement('Domaine de la réalisation $-\\Delta_D$ évoquée en section 6.3 (p. PDF 24), explicité ici'),
    },
  ],
  concepts: [
    {
      id: 'lumer-phillips-dissipativite',
      label: 'Dissipativité',
      reminder: t`$A$ est dissipatif si $\mathrm{Re}\langle Au,u\rangle\le0$ ; on en tire $\|(\lambda I-A)u\|\ge\lambda\|u\|$ pour $\lambda>0$, seul cas où cette minoration est informative, par la partie réelle du produit scalaire et Cauchy–Schwarz.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-lumer-phillips-surjectivite',
      theoremId: 'lumer-phillips',
      title: 'Dissipatif sans condition d’image',
      claim: t`Un opérateur densément défini et dissipatif sur un Hilbert engendre un $C_0$-semi-groupe de contractions.`,
      correctStatement: t`Il faut en outre $\mathrm{Im}(\lambda_0I-A)=H$ pour un $\lambda_0>0$.`,
      task: t`Sur $H=L^2(]0,1[)$, soit $Bu=u'$ de domaine $H^1_0(]0,1[)$ ; l'image de $I-B$ est $\{f:\int_0^1e^{-s}f(s)\,ds=0\}$. Calcule $\int_0^1e^{-s}f(s)\,ds$ pour $f(s)=e^s$.`,
      check: { kind: 'rational', prompt: t`Valeur de $\int_0^1e^{-s}e^{s}\,ds$`, expected: '1' },
      explanation: t`Pour $u\in H^1_0(]0,1[)$, $\langle Bu,u\rangle=\int_0^1u'u=\frac12\big[u^2\big]_0^1=0$ : $B$ est dissipatif, et densément défini. L'équation $u-u'=f$ avec $u(0)=0$ impose $u(x)=-e^x\int_0^xe^{-s}f(s)\,ds$, et $u(1)=0$ exige $\int_0^1e^{-s}f(s)\,ds=0$. Pour $f(s)=e^s$, cette intégrale vaut $1$ : $f\notin\mathrm{Im}(I-B)$, et $B$ n'est pas générateur d'un semi-groupe de contractions.`,
      concept: 'hypotheses-theoreme',
      source: complement('Nécessité de la condition d’image dans Lumer–Phillips (énoncé p. PDF 26–27)'),
    },
    {
      id: 'ce-lumer-phillips-image-dense',
      theoremId: 'lumer-phillips',
      title: 'Image dense, non surjective',
      claim: t`Pour un opérateur dissipatif densément défini, il suffit que $\mathrm{Im}(\lambda_0I-A)$ soit dense dans $H$.`,
      correctStatement: t`La formulation du polycopié exige $\mathrm{Im}(\lambda_0I-A)=H$ ; une image seulement dense ne suffit pas pour $A$ lui-même.`,
      task: t`Sur $H=\ell^2(\mathbb N^*)$, soit $A$ diagonal de coefficients $-n$, défini sur les suites à support fini, et $f_n=1/n$. Toute solution de $(I-A)u=f$ vérifierait $u_n=f_n/(1+n)$. Calcule $u_3$.`,
      check: { kind: 'rational', prompt: t`Valeur de $u_3$`, expected: '1/12' },
      explanation: t`$\langle Au,u\rangle=-\sum_nn|u_n|^2\le0$ : $A$ est dissipatif, et densément défini. $\mathrm{Im}(I-A)$ est l'espace des suites à support fini, dense dans $\ell^2$. La seule candidate, $u_n=\frac1{n(n+1)}$ (avec $u_3=\frac1{12}$), n'est pas à support fini : $f\notin\mathrm{Im}(I-A)$. L'opérateur $A$ n'est pas fermé, donc n'est pas un générateur ; sa fermeture en est un.`,
      concept: 'image-dense-surjective',
      source: complement('Condition d’image de Lumer–Phillips (énoncé p. PDF 26–27)'),
    },
    {
      id: 'ce-lumer-phillips-dissipativite',
      theoremId: 'lumer-phillips',
      title: 'Condition d’image sans dissipativité',
      claim: t`Si $\mathrm{Im}(\lambda_0I-A)=H$ pour un $\lambda_0>0$, alors $A$ engendre un $C_0$-semi-groupe de contractions.`,
      correctStatement: t`Il faut en outre $\mathrm{Re}\langle Au,u\rangle\le0$ pour tout $u\in D(A)$.`,
      task: t`Soit $A=I$ sur un Hilbert $H\neq\{0\}$. Calcule $\|R(2,A)\|$, et compare à la borne $\frac12$ qu'imposerait un semi-groupe de contractions.`,
      check: { kind: 'rational', prompt: t`Valeur de $\|R(2,A)\|$`, expected: '1' },
      explanation: t`$2I-A=I$ est surjectif, et $R(2,A)=I$ a pour norme $1>\frac12$. Par Hille–Yosida, $A$ n'engendre donc pas de semi-groupe de contractions ; de fait, il engendre $S(t)=e^tI$, avec $\|S(t)\|=e^t>1$ pour $t>0$. Ici $\mathrm{Re}\langle Au,u\rangle=\|u\|^2>0$ pour $u\neq0$.`,
      concept: 'lumer-phillips-dissipativite',
      source: complement('Nécessité de la dissipativité dans Lumer–Phillips (énoncé p. PDF 26–27)'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT29;
