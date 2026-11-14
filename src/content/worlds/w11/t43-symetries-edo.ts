/**
 * Résultat 43 — Symétries de Lie et réduction d'une EDO (cours de géométrie de Lie,
 * § 39–42, p. PDF 136–150). Générateur infinitésimal, invariants, coordonnées canoniques
 * (X(r) = 0, X(s) = 1) dans lesquelles X = ∂_s : une équation invariante ne dépend plus
 * de s, et son ordre baisse d'une unité.
 */
import { t, rubric, lie, FROM_LIE, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'symetries-edo.facile',
  theoremId: 'symetries-edo',
  level: 'facile',
  title: 'Générateur infinitésimal et invariant d’une dilatation',
  statement: t`Déterminer le générateur infinitésimal $X$ des transformations $\tilde x=e^{2\varepsilon}x$, $\tilde u=e^{-\varepsilon}u$. Montrer que $I(x,u)=xu^2$ est un invariant ($X(I)=0$), et décrire les orbites.`,
  source: lie(138, 'Exercice 39.1 et invariants, § 42.1'),
  prerequisites: [],
  concepts: ['lie-symetrie-prolongee', 'calcul-exact', 'lie-algebre-tangente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-transfo', kind: 'hypothese', text: t`$\Phi_\varepsilon(x,u)=(e^{2\varepsilon}x,\,e^{-\varepsilon}u)$, $\varepsilon\in\mathbb R$.` },
      { id: 'groupe', kind: 'egalite', text: t`$\Phi_\varepsilon\circ\Phi_\eta=\Phi_{\varepsilon+\eta}$ et $\Phi_0=\mathrm{id}$ : groupe local à un paramètre.` },
      { id: 'generateur', kind: 'egalite', text: t`$X=\frac{d}{d\varepsilon}\big|_{\varepsilon=0}\Phi_\varepsilon=2x\,\partial_x-u\,\partial_u$.` },
      {
        id: 'valeur',
        kind: 'egalite',
        text: t`En $(x,u)=(1,3)$ : $X=(2,-3)$.`,
        masked: t`Composantes de $X$ en $(1,3)$ : à calculer.`,
        check: { kind: 'rational-vector', prompt: t`Composantes de $X$ en $(x,u)=(1,3)$`, expected: ['2', '-3'], labels: ['ξ', 'η'] },
      },
      {
        id: 'invariant',
        kind: 'egalite',
        text: t`$X(xu^2)=2x\cdot u^2+(-u)\cdot 2xu=0$.`,
        masked: t`Valeur de $X(xu^2)$ : à calculer.`,
        check: { kind: 'expr-equiv', prompt: t`Expression de $X(xu^2)$ en fonction de $x$ et $u$`, expected: '0', vars: ['x', 'u'] },
      },
      { id: 'orbites', kind: 'consequence', text: t`Les orbites sont contenues dans les courbes de niveau $xu^2=c$.` },
      { id: 'fin', kind: 'conclusion', text: t`$X=2x\partial_x-u\partial_u$ ; $xu^2$ est invariant et les orbites sont portées par ses courbes de niveau.` },
      { id: 'x-generateur', kind: 'egalite', distractor: true, text: t`$X=e^{2\varepsilon}x\,\partial_x+e^{-\varepsilon}u\,\partial_u$.` },
      { id: 'x-invariant', kind: 'egalite', distractor: true, text: t`$I=x^2u$ est invariant.` },
    ],
    justifications: [
      { id: 'j-groupe', label: t`$e^{2\varepsilon}e^{2\eta}=e^{2(\varepsilon+\eta)}$, de même pour $u$.` },
      { id: 'j-deriv', label: t`Dériver $e^{2\varepsilon}x$ et $e^{-\varepsilon}u$ en $\varepsilon=0$.` },
      { id: 'j-eval', label: 'Substitution.' },
      { id: 'j-inv', label: t`$X(I)=2x\,\partial_xI-u\,\partial_uI$ avec $\partial_xI=u^2$, $\partial_uI=2xu$.` },
      { id: 'j-orbites', label: t`$I$ est constant le long des courbes intégrales de $X$, qui sont les orbites.` },
      { id: 'j-syn', label: 'Réunion des résultats.' },
    ],
    rules: [
      { from: ['h-transfo'], to: 'groupe', by: 'j-groupe' },
      { from: ['groupe'], to: 'generateur', by: 'j-deriv' },
      { from: ['generateur'], to: 'valeur', by: 'j-eval' },
      { from: ['generateur'], to: 'invariant', by: 'j-inv' },
      { from: ['invariant', 'groupe'], to: 'orbites', by: 'j-orbites' },
      { from: ['generateur', 'valeur', 'invariant', 'orbites'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-generateur',
        verdict: 'incorrect',
        concept: 'lie-algebre-tangente',
        message: 'Le générateur est le vecteur tangent en ε = 0 : il ne dépend pas de ε.',
        counterexample: t`En $\varepsilon=1$, la formule proposée donne $e^2x\partial_x$, qui n'est pas $\frac{d}{d\varepsilon}\big|_0$.`,
      },
      {
        conclusion: 'x-invariant',
        verdict: 'incorrect',
        concept: 'calcul-exact',
        message: t`$X(x^2u)=4x^2u-x^2u=3x^2u\neq 0$.`,
        counterexample: t`En $(1,1)$ : $X(x^2u)=3$.`,
      },
    ],
    removable: [],
  },
  solution: t`$\Phi_\varepsilon(x,u)=(e^{2\varepsilon}x,e^{-\varepsilon}u)$ est un groupe à un paramètre. En dérivant en $\varepsilon=0$ : $X=2x\,\partial_x-u\,\partial_u$ ; en $(1,3)$, $X=(2,-3)$. Pour $I=xu^2$, $X(I)=2x\cdot u^2-u\cdot 2xu=0$ : $I$ est constant le long des orbites, qui sont donc portées par les courbes $xu^2=c$.`,
  steps: ['Propriété de groupe.', 'Dérivée en ε = 0.', 'Test de l’invariant.', 'Orbites et courbes de niveau.'],
  commonErrors: [
    { id: 'e-epsilon', description: 'Laisser ε dans le générateur.', concept: 'lie-algebre-tangente' },
    { id: 'e-invariant', description: 'Proposer un invariant sans calculer X(I).', concept: 'calcul-exact' },
  ],
  hints: [t`Le générateur est $\frac{d}{d\varepsilon}\Phi_\varepsilon$ en $\varepsilon=0$.`, t`$X(I)=\xi\,\partial_xI+\eta\,\partial_uI$.`, t`Les orbites satisfont $\frac{dx}{2x}=\frac{du}{-u}$ ; intègre.`],
  rubric: rubric({
    hypotheses: 'Le caractère de groupe à un paramètre est vérifié.',
    methode: 'Dérivation en ε = 0, puis test de l’invariant.',
    validite: 'Les calculs de X et de X(I) sont exacts.',
    justifications: 'Le lien invariant–orbites est expliqué.',
    conclusion: 'Générateur, invariant et orbites sont conclus.',
  }),
  variant: {
    statement: t`Déterminer le générateur de $\tilde x=x\cos\varepsilon-u\sin\varepsilon$, $\tilde u=x\sin\varepsilon+u\cos\varepsilon$, et un invariant.`,
    solution: t`En dérivant en $\varepsilon=0$ : $X=-u\,\partial_x+x\,\partial_u$. Pour $I=x^2+u^2$, $X(I)=-u\cdot 2x+x\cdot 2u=0$ : les orbites sont les cercles centrés en $0$.`,
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h', kind: 'hypothese', text: t`$\Phi_\varepsilon$ est la rotation d'angle $\varepsilon$ du plan $(x,u)$.` },
        { id: 'gen', kind: 'egalite', text: t`$X=-u\,\partial_x+x\,\partial_u$.` },
        { id: 'inv', kind: 'egalite', text: t`$X(x^2+u^2)=0$.` },
        { id: 'fin', kind: 'conclusion', text: t`Les orbites sont les cercles $x^2+u^2=c$.` },
        { id: 'x-inv', kind: 'egalite', distractor: true, text: t`$X(x+u)=0$.` },
      ],
      justifications: [
        { id: 'j-gen', label: t`Dériver en $\varepsilon=0$.` },
        { id: 'j-inv', label: t`$-u\cdot 2x+x\cdot 2u=0$.` },
        { id: 'j-syn', label: 'Courbes de niveau de l’invariant.' },
      ],
      rules: [
        { from: ['h'], to: 'gen', by: 'j-gen' },
        { from: ['gen'], to: 'inv', by: 'j-inv' },
        { from: ['inv'], to: 'fin', by: 'j-syn' },
      ],
      traps: [
        {
          conclusion: 'x-inv',
          verdict: 'incorrect',
          concept: 'calcul-exact',
          message: t`$X(x+u)=x-u$, non nul en général.`,
          counterexample: t`En $(1,0)$ : $X(x+u)=1$.`,
        },
      ],
      removable: [],
    },
  },
  verification: FROM_LIE,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'symetries-edo.intermediaire',
  theoremId: 'symetries-edo',
  level: 'intermediaire',
  title: t`Réduire $u''=(u')^2/u$ grâce à la translation en $x$`,
  statement: t`Sur un domaine où $u\neq 0$, l'équation $u''=\frac{(u')^2}{u}$ est invariante par $X=\partial_x$. Avec $p(u)=u'(x)$, réduire l'ordre, résoudre (en traitant le cas $p=0$), puis déterminer la solution telle que $u(0)=2$, $u'(0)=6$.`,
  source: lie(149, 'Exemple non trivial entièrement réduit, § 42.3'),
  prerequisites: [],
  concepts: ['lie-symetrie-prolongee', 'calcul-exact', 'existence-unicite'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-edo', kind: 'hypothese', text: t`$u''=\frac{(u')^2}{u}$ sur un intervalle où $u\neq 0$.` },
      { id: 'sym', kind: 'consequence', text: t`L'équation ne dépend pas de $x$ : $X=\partial_x$ est une symétrie, d'invariant $r=u$.` },
      { id: 'chaine', kind: 'egalite', text: t`Avec $p(u)=u'(x)$ : $u''=\frac{dp}{dx}=p\frac{dp}{du}$.` },
      { id: 'reduite', kind: 'egalite', text: t`L'équation réduite, d'ordre $1$, est $p\frac{dp}{du}=\frac{p^2}u$.` },
      { id: 'cas-p0', kind: 'consequence', text: t`Si $p\equiv 0$ : $u$ est constante (non nulle), et c'est bien une solution.` },
      { id: 'cas-p', kind: 'egalite', text: t`Si $p\neq 0$ : $\frac{dp}{p}=\frac{du}u$, donc $p=Cu$, puis $u'=Cu$ et $u=Ae^{Cx}$.` },
      {
        id: 'cauchy',
        kind: 'egalite',
        text: t`$u(0)=2$ et $u'(0)=6$ donnent $A=2$ et $C=3$ : $u(x)=2e^{3x}$.`,
        masked: t`Valeur de $C$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $C$ pour $u(0)=2$, $u'(0)=6$`, expected: '3' },
      },
      { id: 'fin', kind: 'conclusion', text: t`Les solutions sont $u=Ae^{Cx}$ ($A\neq 0$), dont les constantes ($C=0$) ; la solution cherchée est $u(x)=2e^{3x}$.` },
      { id: 'x-perdu', kind: 'consequence', distractor: true, text: t`En divisant par $p$, on obtient toutes les solutions sans cas particulier.` },
      { id: 'x-ordre', kind: 'consequence', distractor: true, text: t`La symétrie résout l'équation sans aucune intégration.` },
    ],
    justifications: [
      { id: 'j-sym', label: 'Équation autonome : invariante par translation de la variable indépendante.' },
      { id: 'j-chaine', label: 'Règle de dérivation des fonctions composées.' },
      { id: 'j-subst', label: 'Substitution dans l’équation.' },
      { id: 'j-p0', label: t`$u'=0$ entraîne $u''=0=\frac{0}{u}$.` },
      { id: 'j-separation', label: 'Séparation des variables, puis intégration de u′ = Cu.' },
      { id: 'j-cauchy', label: t`$A=u(0)=2$ et $u'(0)=CA=6$.` },
      { id: 'j-reduction', label: 'Réduction d’ordre par une symétrie.', theorem: 'symetries-edo' },
      { id: 'j-diviser', label: 'Diviser par p est toujours licite.' },
    ],
    rules: [
      { from: ['h-edo'], to: 'sym', by: 'j-sym' },
      { from: ['sym'], to: 'chaine', by: 'j-chaine' },
      { from: ['chaine', 'h-edo'], to: 'reduite', by: 'j-subst' },
      { from: ['reduite'], to: 'cas-p0', by: 'j-p0' },
      { from: ['reduite'], to: 'cas-p', by: 'j-separation' },
      { from: ['cas-p'], to: 'cauchy', by: 'j-cauchy' },
      { from: ['sym', 'cas-p0', 'cas-p', 'cauchy'], to: 'fin', by: 'j-reduction' },
    ],
    traps: [
      {
        conclusion: 'x-perdu',
        verdict: 'incorrect',
        concept: 'existence-unicite',
        message: 'La division par p doit être isolée : le cas p = 0 donne les solutions constantes.',
        counterexample: t`$u\equiv 5$ est solution, avec $p=0$.`,
      },
      {
        conclusion: 'x-perdu',
        by: 'j-diviser',
        verdict: 'incorrect',
        concept: 'existence-unicite',
        message: 'Diviser par une quantité qui peut s’annuler perd des solutions.',
      },
      {
        conclusion: 'x-ordre',
        verdict: 'incorrect',
        concept: 'lie-symetrie-prolongee',
        message: 'Une symétrie abaisse l’ordre d’une unité ; il reste une équation à intégrer.',
        counterexample: t`Ici, il reste $p\frac{dp}{du}=\frac{p^2}u$, puis $u'=Cu$, à intégrer.`,
      },
    ],
    removable: [],
  },
  solution: t`L'équation est autonome : $X=\partial_x$ est une symétrie, d'invariant $r=u$. Avec $p(u)=u'$, la règle de chaîne donne $u''=p\frac{dp}{du}$ ; l'équation devient $p\frac{dp}{du}=\frac{p^2}u$, d'ordre $1$.

**Cas $p=0$.** Les fonctions constantes non nulles sont solutions.

**Cas $p\neq 0$.** $\frac{dp}p=\frac{du}u$, donc $p=Cu$ ; puis $u'=Cu$, soit $u=Ae^{Cx}$.

**Données.** $u(0)=A=2$ et $u'(0)=CA=6$ donnent $C=3$ : $u(x)=2e^{3x}$. Vérification : $u''=18e^{3x}$ et $\frac{(u')^2}u=\frac{36e^{6x}}{2e^{3x}}=18e^{3x}$.`,
  steps: ['Symétrie et invariant.', 'Changement de fonction p(u) = u′.', 'Équation réduite et ses deux cas.', 'Données initiales.'],
  commonErrors: [
    { id: 'e-p0', description: 'Diviser par p sans traiter p = 0.', concept: 'existence-unicite' },
    { id: 'e-resolu', description: 'Croire que la symétrie résout l’équation à elle seule.', concept: 'lie-symetrie-prolongee' },
  ],
  hints: [t`Quelle variable n'apparaît pas dans l'équation ? Prends $u$ comme nouvelle variable indépendante.`, t`Écris $u''=\frac{dp}{dx}=\frac{dp}{du}\frac{du}{dx}$.`, t`Sépare les variables dans $p\frac{dp}{du}=\frac{p^2}u$, sans oublier $p=0$.`],
  rubric: rubric({
    hypotheses: t`$u\neq 0$ est maintenu ; le cas $p=0$ est isolé.`,
    methode: 'Réduction par la symétrie de translation.',
    validite: 'Intégration et données initiales exactes.',
    justifications: 'La règle de chaîne est explicitée.',
    conclusion: 'Toutes les solutions, et celle demandée, sont données.',
  }),
  variant: {
    statement: t`Réduire l'équation autonome $u''=g(u)\,u'$ à une équation du premier ordre pour $p(u)=u'$.`,
    solution: t`$u''=p\frac{dp}{du}$, donc $p\frac{dp}{du}=g(u)p$. Pour $p\neq 0$ : $\frac{dp}{du}=g(u)$, $p=\int g+C$ ; le cas $p=0$ (solutions constantes) se traite à part.`,
  },
  verification: FROM_LIE,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'symetries-edo.difficile',
  theoremId: 'symetries-edo',
  level: 'difficile',
  title: 'Équations homogènes : coordonnées canoniques d’une dilatation',
  statement: t`Soit $u'=F(u/x)$ sur $x>0$. Montrer que $X=x\,\partial_x+u\,\partial_u$ est une symétrie, que $r=u/x$ et $s=\ln x$ sont des coordonnées canoniques ($X(r)=0$, $X(s)=1$), et que l'équation devient $\frac{ds}{dr}=\frac1{F(r)-r}$, sans $s$. Résoudre pour $F(r)=1+r$ avec $u(1)=0$.`,
  source: lie(148, 'Invariants et coordonnées canoniques, § 42.1–42.2'),
  prerequisites: [],
  concepts: ['lie-symetrie-prolongee', 'calcul-exact', 'hypotheses-theoreme'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'h-edo', kind: 'hypothese', text: t`$u'=F(u/x)$ sur $x>0$, avec $F$ continue et $F(r)\neq r$ sur l'intervalle étudié.` },
      { id: 'sym', kind: 'consequence', text: t`$(x,u)\mapsto(\lambda x,\lambda u)$, $\lambda>0$, envoie graphes solutions sur graphes solutions : la pente $u'$ et le rapport $u/x$ sont inchangés.` },
      { id: 'gen', kind: 'egalite', text: t`Le générateur est $X=x\,\partial_x+u\,\partial_u$.` },
      { id: 'canon', kind: 'egalite', text: t`$X(u/x)=x\cdot(-u/x^2)+u\cdot(1/x)=0$ et $X(\ln x)=1$.` },
      { id: 'reduite', kind: 'egalite', text: t`$u=xr$ donne $u'=r+x\frac{dr}{dx}=F(r)$, soit $\frac{ds}{dr}=\frac1{F(r)-r}$ avec $ds=\frac{dx}x$.` },
      { id: 'quadrature', kind: 'consequence', text: t`Le membre de droite ne dépend pas de $s$ : la solution s'obtient par une quadrature, $s=\int\frac{dr}{F(r)-r}$.` },
      {
        id: 'exemple',
        kind: 'egalite',
        text: t`Pour $F(r)=1+r$ : $\frac{ds}{dr}=1$, $s=r+c$, soit $u=x(\ln x-c)$.`,
        masked: t`Valeur de $\frac{ds}{dr}$ pour $F(r)=1+r$ : à calculer.`,
        check: { kind: 'rational', prompt: t`Valeur de $\frac{ds}{dr}$ lorsque $F(r)=1+r$`, expected: '1' },
      },
      { id: 'cauchy', kind: 'egalite', text: t`$u(1)=0$ impose $c=0$ : $u(x)=x\ln x$.` },
      { id: 'fin', kind: 'conclusion', text: t`La dilatation réduit $u'=F(u/x)$ à la quadrature $\frac{ds}{dr}=\frac1{F(r)-r}$ ; pour $F(r)=1+r$ et $u(1)=0$, $u=x\ln x$.` },
      { id: 'x-s-reste', kind: 'consequence', distractor: true, text: t`Dans les coordonnées $(r,s)$, l'équation dépend encore explicitement de $s$.` },
      { id: 'x-translation', kind: 'consequence', distractor: true, text: t`La translation $x\mapsto x+\varepsilon$ est aussi une symétrie de $u'=F(u/x)$ pour toute $F$.` },
    ],
    justifications: [
      { id: 'j-sym', label: t`Si $u$ est solution, $v(x)=\lambda u(x/\lambda)$ vérifie $v'(x)=u'(x/\lambda)=F\big(\frac{u(x/\lambda)}{x/\lambda}\big)=F\big(\frac{v(x)}x\big)$.` },
      { id: 'j-gen', label: t`Dériver $(\lambda x,\lambda u)$ en $\lambda=1$, soit $\lambda=e^\varepsilon$ en $\varepsilon=0$.` },
      { id: 'j-canon', label: 'Calcul direct de X(r) et X(s).' },
      { id: 'j-subst', label: t`$\frac{dr}{dx}=\frac{F(r)-r}x$ et $\frac{ds}{dx}=\frac1x$.` },
      { id: 'j-reduction', label: 'Dans des coordonnées canoniques, une équation invariante ne dépend pas de s.', theorem: 'symetries-edo' },
      { id: 'j-exemple', label: t`$F(r)-r=1$.` },
      { id: 'j-cauchy', label: t`$\ln 1=0$ et $u(1)=1\cdot(0-c)$.` },
      { id: 'j-syn', label: 'Conclusion.' },
    ],
    rules: [
      { from: ['h-edo'], to: 'sym', by: 'j-sym' },
      { from: ['sym'], to: 'gen', by: 'j-gen' },
      { from: ['gen'], to: 'canon', by: 'j-canon' },
      { from: ['canon', 'h-edo'], to: 'reduite', by: 'j-subst' },
      { from: ['reduite', 'canon'], to: 'quadrature', by: 'j-reduction' },
      { from: ['reduite'], to: 'exemple', by: 'j-exemple' },
      { from: ['exemple'], to: 'cauchy', by: 'j-cauchy' },
      { from: ['quadrature', 'cauchy'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-s-reste',
        verdict: 'incorrect',
        concept: 'lie-symetrie-prolongee',
        message: 'C’est tout l’intérêt des coordonnées canoniques : la symétrie devient ∂_s et s disparaît de l’équation.',
        counterexample: t`$\frac{ds}{dr}=\frac1{F(r)-r}$ ne contient pas $s$.`,
      },
      {
        conclusion: 'x-translation',
        verdict: 'incorrect',
        concept: 'lie-symetrie-prolongee',
        message: 'La variable x apparaît dans u/x : la translation ne préserve pas l’équation en général.',
        counterexample: t`Pour $F(r)=r$, $u=x$ est solution mais $v(x)=x-1$ (graphe translaté de $1$) ne l'est pas : $v'=1\neq\frac{x-1}x$.`,
      },
    ],
    removable: [],
  },
  solution: t`**Symétrie.** Si $u$ est solution, $v(x)=\lambda u(x/\lambda)$ vérifie $v'(x)=u'(x/\lambda)=F\big(v(x)/x\big)$. Le générateur de $(\lambda x,\lambda u)$ est $X=x\partial_x+u\partial_u$.

**Coordonnées canoniques.** $X(u/x)=0$ et $X(\ln x)=1$ : $r=u/x$ est invariant, $s=\ln x$ mesure le déplacement le long des orbites.

**Réduction.** $u=xr$ donne $r+x\frac{dr}{dx}=F(r)$, donc $\frac{ds}{dr}=\frac1{F(r)-r}$ : $s$ n'apparaît pas, la solution est une quadrature.

**Exemple.** $F(r)=1+r$ : $\frac{ds}{dr}=1$, $\ln x=\frac ux+c$, $u=x(\ln x-c)$ ; $u(1)=0$ donne $c=0$ et $u=x\ln x$, qui vérifie $u'=\ln x+1=1+\frac ux$.`,
  steps: ['Invariance par dilatation.', 'Générateur et coordonnées canoniques.', 'Équation réduite sans s.', 'Exemple et donnée initiale.'],
  commonErrors: [
    { id: 'e-s', description: 'Ne pas voir que s disparaît.', concept: 'lie-symetrie-prolongee' },
    { id: 'e-translation', description: 'Croire l’équation invariante par translation en x.', concept: 'lie-symetrie-prolongee' },
  ],
  hints: [t`Si $u$ est solution, que dire de $\lambda u(x/\lambda)$ ?`, t`Calcule $X(u/x)$ et $X(\ln x)$.`, t`Écris $u=xr$ et dérive : $u'=r+xr'$.`],
  rubric: rubric({
    hypotheses: t`$x>0$ et $F(r)\neq r$ sont respectés.`,
    methode: 'Symétrie, coordonnées canoniques, quadrature.',
    validite: 'La réduction et l’exemple sont exacts.',
    justifications: 'L’invariance par dilatation est démontrée sur les solutions.',
    conclusion: t`La quadrature générale et la solution $x\ln x$ sont conclues.`,
  }),
  variant: {
    statement: t`Pour $u''=0$, vérifier que $X_1=\partial_x$ et $X_2=x\,\partial_x$ sont des symétries et calculer $[X_2,X_1]$.`,
    solution: t`Les translations et les dilatations de $x$ envoient droites sur droites. $[X_2,X_1]=X_2X_1-X_1X_2$ ; sur $f$ : $x f''-(f'+xf'')=-f'$, donc $[X_2,X_1]=-\partial_x=-X_1$ : les symétries forment une algèbre de Lie.`,
  },
  verification: COMPLEMENT,
};

const mod: TheoremModule = {
  theorem: {
    id: 'symetries-edo',
    spaces: [t`Plan des variables $(x,u)$, EDO $F(x,u,u',\dots,u^{(n)})=0$, groupe local à un paramètre de générateur $X=\xi\partial_x+\eta\partial_u$.`],
    hypotheses: [
      { id: 'symetrie', text: 'Le groupe envoie graphes solutions sur graphes solutions (symétrie de l’équation).' },
      { id: 'canoniques', text: t`Il existe des coordonnées canoniques $(r,s)$ : $X(r)=0$, $X(s)=1$ (localement, hors des points où $X=0$).` },
    ],
    statement: t`Dans des coordonnées canoniques, $X=\partial_s$ ; une équation invariante ne dépend pas explicitement de $s$, seulement de ses dérivées par rapport à $r$, et son ordre baisse d'une unité. Les générateurs de symétries forment une algèbre de Lie.`,
    conclusions: {
      autre: 'Une symétrie d’une EDO du premier ordre la ramène à une quadrature.',
    },
    sourceProof: 'idee',
    proofOutline: [
      'Le générateur est le vecteur tangent en ε = 0 de la famille de transformations.',
      'Coordonnées canoniques : r invariant, s le long des orbites, par les caractéristiques dx/ξ = du/η.',
      'L’équation transformée commute avec les translations en s, donc ne dépend que de ds/dr et des dérivées suivantes.',
    ],
    warnings: [
      'Une transformation visuellement naturelle n’est pas automatiquement une symétrie : elle doit agir de façon compatible sur les dérivées (prolongement).',
      'La division par une quantité qui peut s’annuler perd des solutions : isoler ces cas.',
      'Symétrie de l’équation et symétrie d’une solution particulière sont deux notions différentes.',
    ],
    usefulFor: 'Résoudre ou réduire des EDO non linéaires, préparer Noether et les solutions invariantes des EDP.',
    verification: FROM_LIE,
  },
  definitions: [
    { id: 'def-generateur', term: 'Générateur infinitésimal', statement: t`Pour $\tilde x=x+\varepsilon\xi+O(\varepsilon^2)$, $\tilde u=u+\varepsilon\eta+O(\varepsilon^2)$, le champ $X=\xi\,\partial_x+\eta\,\partial_u$.`, source: lie(136, '§ 39.1') },
    { id: 'def-coordonnees-canoniques', term: 'Coordonnées canoniques', statement: t`Un couple $(r,s)$ avec $X(r)=0$ et $X(s)=1$ ; dans ces coordonnées, $X=\partial_s$.`, source: lie(148, '§ 42.1') },
  ],
  concepts: [],
  counterexamples: [
    {
      id: 'ce-symetrie-translation',
      theoremId: 'symetries-edo',
      title: 'Une translation qui n’est pas une symétrie',
      claim: t`Toute translation $x\mapsto x+\varepsilon$ est une symétrie de toute EDO du premier ordre.`,
      correctStatement: 'La translation en x est une symétrie des équations autonomes, qui ne dépendent pas explicitement de x.',
      task: t`Pour $u'=u/x$ et sa solution $u=x$, calculer $v'(2)-\frac{v(2)}2$, où $v(x)=x-1$ est le graphe translaté de $1$.`,
      check: { kind: 'rational', prompt: t`Valeur de $v'(2)-\frac{v(2)}2$`, expected: '1/2' },
      explanation: t`$v'(2)=1$ et $\frac{v(2)}2=\frac12$ : le graphe translaté n'est pas solution, la translation n'est pas une symétrie de cette équation non autonome.`,
      concept: 'lie-symetrie-prolongee',
      source: lie(137, 'Premiers exemples, § 39.3'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default mod;
