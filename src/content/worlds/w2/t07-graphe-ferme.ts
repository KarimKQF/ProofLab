/**
 * Résultat 7 — Théorème du graphe fermé.
 * La démonstration figure dans le polycopié (p. PDF 10), à partir de l'inverse borné.
 */
import { t, rubric, poly, complement, FROM_POLY, COMPLEMENT } from '@/content/authoring';
import type { Exercise } from '@/content/schema';
import type { TheoremModule } from '../types';

/** Espace de départ non complet : la dérivation sur C^1 muni de la norme uniforme. */
const C1_EXEMPLE = t`$X=C^1([0,1])$ muni de $\|\cdot\|_\infty$, qui n'est pas complet, $Y=C([0,1])$ muni de $\|\cdot\|_\infty$ et $Tu=u'$ : le graphe est fermé, car si $u_n\to u$ et $u_n'\to v$ uniformément, alors $u'=v$ ; mais $u_n(x)=x^n$ vérifie $\|u_n\|_\infty=1$ et $\|Tu_n\|_\infty=n$.`;

/** Espace d'arrivée non complet (contre-exemple non constructif). */
const HAMEL_ARRIVEE = t`Soient $E$ un espace de Banach de dimension infinie, $\varphi$ une forme linéaire non continue sur $E$ (construite à l'aide d'une base algébrique), $Y=(E,\|x\|+|\varphi(x)|)$ et $T=\mathrm{Id}:E\to Y$. Le graphe de $T$ est fermé, car la norme de $Y$ domine celle de $E$, et $T$ n'est pas continu : $Y$ n'est pas complet.`;

/** Opérateur fermé non borné : le domaine n'est pas l'espace entier. */
const DERIVEE_H10 = t`$Au=u'$ sur $D(A)=H^1_0(]0,1[)\subset L^2(]0,1[)$ est fermé mais non borné : $w_n(x)=\sin(n\pi x)$ vérifie $\|Aw_n\|_{L^2}/\|w_n\|_{L^2}=n\pi$. Son domaine n'est pas l'espace entier.`;

/* ───────────────────────────── FACILE ───────────────────────────── */

const facile: Exercise = {
  id: 'graphe-ferme.facile',
  theoremId: 'graphe-ferme',
  level: 'facile',
  title: 'Graphe d’un opérateur de multiplication borné',
  statement: t`Soient $\Omega\subset\mathbb R^d$ un ouvert, $m\in L^\infty(\Omega)$ et $M$ l'opérateur de multiplication par $m$ dans $L^2(\Omega)$, $Mu=mu$. Montrer que $M$ est défini sur tout $L^2(\Omega)$, linéaire et borné, et que son graphe $G(M)=\{(u,mu) : u\in L^2(\Omega)\}$ est fermé dans $L^2(\Omega)\times L^2(\Omega)$.`,
  source: poly(39, 'Annexe B, exercice 7, facile'),
  prerequisites: [],
  concepts: ['convergence-pp', 'circularite', 'graphe-ferme-ferme-borne', 'justification-absente'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    paths: [
      { id: 'continuite', label: 'Par la continuité de M' },
      { id: 'presque-partout', label: 'Par extraction presque partout' },
      { id: 'image-reciproque', label: 'Comme image réciproque d’un fermé' },
    ],
    nodes: [
      { id: 'h-m', kind: 'hypothese', text: t`$m\in L^\infty(\Omega)$.` },
      { id: 'd-M', kind: 'definition', text: t`$M$ est la multiplication par $m$, de domaine $D(M)=\{u\in L^2(\Omega) : mu\in L^2(\Omega)\}$ et de graphe $G(M)=\{(u,mu) : u\in D(M)\}$.` },
      { id: 'd-suite', kind: 'definition', local: true, text: t`Soit $(u_n,v_n)_n\subset G(M)$ convergeant vers $(u,v)$ dans $L^2(\Omega)\times L^2(\Omega)$.` },

      { id: 'm-borne', kind: 'inegalite', text: t`$D(M)=L^2(\Omega)$ et $\|mu\|_{L^2}\le\|m\|_{L^\infty}\|u\|_{L^2}$ pour tout $u\in L^2(\Omega)$.` },
      { id: 'm-lin', kind: 'consequence', text: t`$M$ est linéaire.` },
      { id: 's-vn', kind: 'egalite', text: t`$v_n=mu_n$ pour tout $n$.` },
      { id: 's-cv', kind: 'inegalite', text: t`$\|mu_n-mu\|_{L^2}\le\|m\|_{L^\infty}\|u_n-u\|_{L^2}\to 0$.` },
      { id: 'pp-ext', kind: 'consequence', text: t`Une sous-suite vérifie $u_{n_k}\to u$ et $v_{n_k}\to v$ presque partout.` },
      { id: 's-lim', kind: 'egalite', text: t`$v=mu$ presque partout ; en particulier $mu\in L^2(\Omega)$.` },
      { id: 's-in', kind: 'consequence', text: t`$u\in D(M)$ et $(u,v)\in G(M)$.` },
      { id: 'i-phi', kind: 'consequence', text: t`$\Phi:L^2(\Omega)\times L^2(\Omega)\to L^2(\Omega)$, $\Phi(u,v)=v-mu$, est continue.` },
      { id: 'i-eq', kind: 'egalite', text: t`$G(M)=\Phi^{-1}(\{0\})$.` },
      { id: 'fin', kind: 'conclusion', text: t`$G(M)$ est fermé dans $L^2(\Omega)\times L^2(\Omega)$.` },

      // Propositions plausibles mais fausses.
      { id: 'x-pp', kind: 'consequence', distractor: true, after: ['s-vn'], text: t`La suite entière $(u_n)_n$ converge vers $u$ presque partout.` },
      { id: 'x-ferme-borne', kind: 'consequence', distractor: true, text: t`Si le graphe de la multiplication par une fonction mesurable $m$ est fermé, alors $m\in L^\infty(\Omega)$.` },
    ],
    justifications: [
      { id: 'j-borne', label: t`$|m(x)u(x)|\le\|m\|_{L^\infty}|u(x)|$ pour presque tout $x$, puis intégration du carré.` },
      { id: 'j-lin', label: t`$m(u+\lambda w)=mu+\lambda\,mw$.` },
      { id: 'j-def-graphe', label: t`Définition du graphe : $(u_n,v_n)\in G(M)$.` },
      { id: 'j-borne-diff', label: t`Linéarité de $M$ et majoration appliquée à $u_n-u$.` },
      { id: 'j-unicite-lim', label: t`$v_n=mu_n$ tend vers $v$ et vers $mu$ dans $L^2$ : unicité de la limite.` },
      { id: 'j-extraction', label: t`Une suite convergente dans $L^2$ admet une sous-suite convergeant presque partout ; on extrait deux fois.` },
      { id: 'j-pp-lim', label: t`Passage à la limite presque partout dans $v_{n_k}=mu_{n_k}$, la fonction $m$ étant finie presque partout.` },
      { id: 'j-graphe-in', label: t`Définition de $D(M)$ et de $G(M)$.` },
      { id: 'j-seq', label: t`Caractérisation séquentielle d'un fermé de l'espace métrique $L^2(\Omega)\times L^2(\Omega)$.` },
      { id: 'j-phi', label: t`$\|\Phi(u,v)-\Phi(u',v')\|_{L^2}\le\|v-v'\|_{L^2}+\|m\|_{L^\infty}\|u-u'\|_{L^2}$.` },
      { id: 'j-eq', label: t`Définition du graphe, avec $D(M)=L^2(\Omega)$.` },
      { id: 'j-preimage', label: t`L'image réciproque du fermé $\{0\}$ par une application continue est fermée.` },
      // Justifications séduisantes et fausses.
      { id: 'j-gf', label: 'Théorème du graphe fermé.', theorem: 'graphe-ferme' },
      { id: 'j-borne-cv', label: t`Une suite convergente est bornée, donc $(mu_n)_n$ converge vers $mu$.` },
    ],
    rules: [
      { from: ['h-m', 'd-M'], to: 'm-borne', by: 'j-borne' },
      { from: ['d-M'], to: 'm-lin', by: 'j-lin' },
      { from: ['d-suite', 'd-M'], to: 's-vn', by: 'j-def-graphe' },
      { from: ['m-borne', 'm-lin', 'd-suite'], to: 's-cv', by: 'j-borne-diff', path: 'continuite' },
      { from: ['s-vn', 's-cv', 'd-suite'], to: 's-lim', by: 'j-unicite-lim', path: 'continuite' },
      { from: ['d-suite'], to: 'pp-ext', by: 'j-extraction', path: 'presque-partout' },
      { from: ['pp-ext', 's-vn'], to: 's-lim', by: 'j-pp-lim', path: 'presque-partout' },
      { from: ['s-lim', 'd-M'], to: 's-in', by: 'j-graphe-in' },
      { from: ['s-in'], to: 'fin', by: 'j-seq' },
      { from: ['m-borne', 'm-lin'], to: 'i-phi', by: 'j-phi', path: 'image-reciproque' },
      { from: ['m-borne', 'd-M'], to: 'i-eq', by: 'j-eq', path: 'image-reciproque' },
      { from: ['i-phi', 'i-eq'], to: 'fin', by: 'j-preimage', path: 'image-reciproque' },
    ],
    traps: [
      {
        conclusion: 'x-pp',
        verdict: 'incorrect',
        concept: 'convergence-pp',
        message: t`La convergence dans $L^2$ ne donne la convergence presque partout que pour une sous-suite.`,
        counterexample: t`Les indicatrices des intervalles dyadiques $[j2^{-k},(j+1)2^{-k}]$, parcourus successivement, tendent vers $0$ dans $L^2(]0,1[)$ sans converger en aucun point.`,
      },
      {
        conclusion: 'x-ferme-borne',
        verdict: 'incorrect',
        concept: 'graphe-ferme-ferme-borne',
        message: t`La fermeture du graphe ne demande aucune borne sur $m$ : la voie presque partout s'applique à toute fonction $m$ finie presque partout, sur le domaine maximal.`,
        counterexample: t`$m(x)=1/x$ sur $]0,1[$, avec $D(M)=\{u\in L^2 : u/x\in L^2\}$ : le graphe est fermé et $m\notin L^\infty(]0,1[)$.`,
      },
      {
        conclusion: 'fin',
        by: 'j-gf',
        verdict: 'incorrect',
        concept: 'circularite',
        message: 'Ce théorème part de la fermeture du graphe pour conclure à la continuité : il ne peut pas établir la fermeture. Ici, c’est le sens élémentaire, continuité entraîne graphe fermé, qui est en jeu.',
      },
      {
        conclusion: 's-cv',
        by: 'j-borne-cv',
        verdict: 'incorrect',
        concept: 'justification-absente',
        message: t`Une suite bornée ne converge pas en général : la convergence de $(mu_n)_n$ vient de la majoration $\|m(u_n-u)\|_{L^2}\le\|m\|_{L^\infty}\|u_n-u\|_{L^2}$.`,
        counterexample: t`$\sin(nx)$ est bornée dans $L^2(]0,\pi[)$ sans y converger : $\|\sin(nx)-\sin(px)\|^2_{L^2}=\pi$ pour $n\neq p$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'h-m',
        label: t`Retirer l'hypothèse $m\in L^\infty(\Omega)$`,
        necessary: false,
        explanation: t`La voie presque partout n'utilise pas la bornitude de $m$ : le graphe reste fermé sur le domaine maximal, mais $M$ n'est plus défini sur tout $L^2(\Omega)$, ni borné.`,
        counterexample: t`$m(x)=1/x$ sur $]0,1[$ : $1\notin D(M)$, et $u_n=\mathbb 1_{]1/(2n),1/n[}$ vérifie $\|Mu_n\|_{L^2}/\|u_n\|_{L^2}=\sqrt2\,n$.`,
      },
    ],
  },
  closedChecks: [
    { kind: 'rational', prompt: t`Pour $\Omega=]0,1[$ et $m(x)=x$, valeur de $\|M\|_{\mathcal L(L^2)}$`, expected: '1' },
  ],
  solution: t`**Bornitude.** Pour presque tout $x$, $|m(x)u(x)|\le\|m\|_{L^\infty}|u(x)|$ ; en intégrant le carré, $\|mu\|_{L^2}\le\|m\|_{L^\infty}\|u\|_{L^2}$. Donc $M$ est défini sur tout $L^2(\Omega)$, linéaire et borné.

**Fermeture.** Soit $(u_n,mu_n)\to(u,v)$ dans $L^2\times L^2$. Comme $\|mu_n-mu\|_{L^2}\le\|m\|_{L^\infty}\|u_n-u\|_{L^2}\to 0$, on a aussi $mu_n\to mu$, et l'unicité de la limite donne $v=mu$ : $(u,v)\in G(M)$. Autres voies : $G(M)=\Phi^{-1}(\{0\})$ avec $\Phi(u,v)=v-mu$ continue ; ou extraction d'une sous-suite convergeant presque partout, qui donne $v=mu$ presque partout.

**Remarque.** La voie presque partout n'utilise pas $m\in L^\infty$ : pour $m(x)=1/x$ sur $]0,1[$, la multiplication, sur son domaine maximal, est fermée sans être bornée, et son domaine n'est pas $L^2$ tout entier. Le théorème du graphe fermé ne peut pas servir ici : il conclut à la continuité à partir de la fermeture, non l'inverse.`,
  steps: [
    'Majorer ponctuellement, puis intégrer.',
    'Prendre une suite du graphe convergente dans le produit.',
    'Identifier la limite de la seconde composante.',
    'Conclure par la caractérisation séquentielle des fermés.',
  ],
  commonErrors: [
    { id: 'e-pp', description: t`Affirmer la convergence presque partout de toute la suite à partir de la convergence dans $L^2$.`, concept: 'convergence-pp' },
    { id: 'e-circulaire', description: 'Invoquer le théorème du graphe fermé pour établir la fermeture du graphe.', concept: 'circularite' },
    { id: 'e-borne', description: 'Croire qu’un graphe fermé impose un multiplicateur borné.', concept: 'graphe-ferme-ferme-borne' },
  ],
  hints: [
    t`Que faut-il vérifier, exactement, pour une suite $(u_n,mu_n)$ du graphe qui converge dans $L^2\times L^2$ ?`,
    t`Compare la limite $v$ de $(mu_n)_n$ à $mu$, en majorant $\|mu_n-mu\|_{L^2}$ grâce à $m\in L^\infty$.`,
    t`$\|m(u_n-u)\|_{L^2}\le\|m\|_{L^\infty}\|u_n-u\|_{L^2}\to 0$, donc $mu_n\to mu$ ; l'unicité de la limite donne $v=mu$.`,
  ],
  rubric: rubric({
    hypotheses: t`La bornitude de $M$ est établie à partir de $m\in L^\infty$.`,
    methode: 'La fermeture est démontrée par une voie complète, sans invoquer le théorème du graphe fermé.',
    validite: 'La limite de la seconde composante est correctement identifiée.',
    justifications: 'Les arguments presque partout passent par une sous-suite.',
    conclusion: 'La fermeture du graphe est obtenue.',
  }),
  variant: {
    statement: t`Sur $\Omega=]0,1[$, soit $M$ la multiplication par $m(x)=1/x$, de domaine $D(M)=\{u\in L^2(]0,1[) : u/x\in L^2(]0,1[)\}$. Montrer que $M$ est fermé, que $D(M)\neq L^2(]0,1[)$ et que $M$ n'est pas borné.`,
    solution: t`Si $u_n\in D(M)$, $u_n\to u$ et $u_n/x\to v$ dans $L^2$, une sous-suite converge presque partout pour les deux suites, d'où $v=u/x$ presque partout : $u\in D(M)$ et $Mu=v$. La fonction $1$ n'est pas dans $D(M)$, car $\int_0^1x^{-2}\,dx=+\infty$. Pour $u_n=\mathbb 1_{]1/(2n),1/n[}$, on a $\|u_n\|^2_{L^2}=\frac1{2n}$ et $\|Mu_n\|^2_{L^2}=\int_{1/(2n)}^{1/n}x^{-2}\,dx=n$ : le rapport $\sqrt2\,n$ n'est pas borné. Il n'y a pas de contradiction avec le théorème du graphe fermé, car $D(M)\neq L^2$.`,
  },
  verification: COMPLEMENT,
};

/* ─────────────────────────── INTERMÉDIAIRE ─────────────────────────── */

const intermediaire: Exercise = {
  id: 'graphe-ferme.intermediaire',
  theoremId: 'graphe-ferme',
  level: 'intermediaire',
  title: 'Le graphe fermé à partir de l’application ouverte',
  statement: t`Soient $X,Y$ deux espaces de Banach et $T:X\to Y$ linéaire, défini sur tout $X$, dont le graphe $G(T)=\{(x,Tx) : x\in X\}$ est fermé dans $X\times Y$. Démontrer, à partir du théorème de l'application ouverte (inverse borné), que $T$ est continu.`,
  source: poly(10, 'Démonstration de la section 2.3 ; Annexe B, exercice 7, intermédiaire (p. PDF 39)'),
  prerequisites: [],
  concepts: ['fermeture-espace', 'domaine-operateur', 'circularite', 'graphe-ferme-definition'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    paths: [
      { id: 'composition', label: 'Par composition des projections (polycopié)' },
      { id: 'estimation', label: 'Par l’estimation de la norme du graphe' },
    ],
    nodes: [
      { id: 'h-X', kind: 'hypothese', text: t`$X$ est un espace de Banach.` },
      { id: 'h-Y', kind: 'hypothese', text: t`$Y$ est un espace de Banach.` },
      { id: 'h-lin', kind: 'hypothese', text: t`$T:X\to Y$ est linéaire et défini sur tout $X$.` },
      { id: 'h-ferme', kind: 'hypothese', text: t`$G(T)=\{(x,Tx) : x\in X\}$ est fermé dans $X\times Y$, muni de la norme $\|(x,y)\|=\|x\|_X+\|y\|_Y$.` },
      { id: 'd-pi', kind: 'definition', text: t`$\pi_X:G(T)\to X$ et $\pi_Y:G(T)\to Y$ sont les projections $\pi_X(x,Tx)=x$ et $\pi_Y(x,Tx)=Tx$.` },

      { id: 'p-complet', kind: 'consequence', text: t`$X\times Y$, muni de la norme produit, est complet.` },
      { id: 'g-sev', kind: 'consequence', text: t`$G(T)$ est un sous-espace vectoriel de $X\times Y$.` },
      { id: 'g-banach', kind: 'consequence', text: t`$G(T)$, muni de la norme produit, est un espace de Banach.` },
      { id: 'pi-cont', kind: 'inegalite', text: t`$\pi_X$ et $\pi_Y$ sont linéaires, avec $\|\pi_X(x,Tx)\|_X\le\|(x,Tx)\|$ et $\|\pi_Y(x,Tx)\|_Y\le\|(x,Tx)\|$ : elles sont continues.` },
      { id: 'pi-bij', kind: 'consequence', text: t`$\pi_X$ est bijective, d'inverse $\pi_X^{-1}:x\mapsto(x,Tx)$.` },
      { id: 'ao', kind: 'application-theoreme', text: t`$\pi_X^{-1}\in\mathcal L\big(X,G(T)\big)$ : il existe $C\ge 0$ tel que $\|x\|_X+\|Tx\|_Y\le C\|x\|_X$ pour tout $x\in X$.` },
      { id: 'comp', kind: 'egalite', text: t`$T=\pi_Y\circ\pi_X^{-1}$.` },
      { id: 'fin', kind: 'conclusion', text: t`$T$ est continu.` },

      // Proposition séduisante mais fausse.
      { id: 'x-def', kind: 'consequence', distractor: true, text: t`La fermeture du graphe donne directement : si $x_n\to x$ dans $X$, alors $Tx_n\to Tx$ dans $Y$.` },
    ],
    justifications: [
      { id: 'j-prod', label: t`Une suite de Cauchy de $X\times Y$ a ses deux composantes de Cauchy, qui convergent dans $X$ et dans $Y$.` },
      { id: 'j-sev', label: t`Linéarité de $T$ : $(x,Tx)+\lambda(x',Tx')=(x+\lambda x',T(x+\lambda x'))$.` },
      { id: 'j-ferme-complet', label: 'Un sous-espace fermé d’un espace complet est complet.' },
      { id: 'j-pi', label: 'Définition de la norme produit.' },
      { id: 'j-pi-bij', label: t`Injective : $\pi_X(x,Tx)=0$ impose $x=0$, donc $(x,Tx)=(0,0)$ ; surjective : tout $x\in X$ est dans le domaine de $T$.` },
      { id: 'j-ao', label: t`Théorème de l’application ouverte (inverse borné), appliqué à $\pi_X$.`, theorem: 'application-ouverte' },
      { id: 'j-compo', label: t`Pour $x\in X$ : $\pi_Y\big(\pi_X^{-1}(x)\big)=\pi_Y(x,Tx)=Tx$.` },
      { id: 'j-compo-cont', label: 'Une composée d’applications linéaires continues est continue.' },
      { id: 'j-norme-inv', label: t`$\|Tx\|_Y\le\|x\|_X+\|Tx\|_Y\le C\|x\|_X$, et $T$ est linéaire.` },
      // Justifications séduisantes et fausses.
      { id: 'j-sev-banach', label: 'Tout sous-espace vectoriel d’un espace de Banach est complet.' },
      { id: 'j-surj-ferme', label: t`$\pi_X$ est surjective parce que le graphe est fermé.` },
      { id: 'j-gf', label: 'Théorème du graphe fermé.', theorem: 'graphe-ferme' },
    ],
    rules: [
      { from: ['h-X', 'h-Y'], to: 'p-complet', by: 'j-prod' },
      { from: ['h-lin'], to: 'g-sev', by: 'j-sev' },
      { from: ['p-complet', 'g-sev', 'h-ferme'], to: 'g-banach', by: 'j-ferme-complet' },
      { from: ['d-pi', 'g-sev'], to: 'pi-cont', by: 'j-pi' },
      { from: ['d-pi', 'h-lin'], to: 'pi-bij', by: 'j-pi-bij' },
      { from: ['g-banach', 'h-X', 'pi-cont', 'pi-bij'], to: 'ao', by: 'j-ao' },
      { from: ['d-pi', 'pi-bij'], to: 'comp', by: 'j-compo', path: 'composition' },
      { from: ['ao', 'pi-cont', 'comp'], to: 'fin', by: 'j-compo-cont', path: 'composition' },
      { from: ['ao', 'h-lin'], to: 'fin', by: 'j-norme-inv', path: 'estimation' },
    ],
    traps: [
      {
        conclusion: 'x-def',
        verdict: 'incorrect',
        concept: 'graphe-ferme-definition',
        message: t`La fermeture du graphe suppose que $(Tx_n)_n$ converge, et identifie alors sa limite ; elle ne fournit pas cette convergence. C'est tout l'apport du théorème.`,
        counterexample: t`Pour la dérivation $A$ sur $D(A)=H^1_0(]0,1[)\subset L^2(]0,1[)$, de graphe fermé, $u_n=\sin(n\pi x)/n\to 0$ dans $L^2$, alors que $\|Au_n\|_{L^2}=\pi/\sqrt2$.`,
      },
      {
        conclusion: 'g-banach',
        by: 'j-sev-banach',
        verdict: 'incorrect',
        concept: 'fermeture-espace',
        message: 'Un sous-espace vectoriel n’est complet que s’il est fermé : c’est ici que sert l’hypothèse sur le graphe.',
        counterexample: t`$c_{00}$ est un sous-espace vectoriel non fermé de $\ell^\infty$ et n'est pas complet.`,
      },
      {
        conclusion: 'pi-bij',
        by: 'j-surj-ferme',
        verdict: 'incorrect',
        concept: 'domaine-operateur',
        message: t`La surjectivité de $\pi_X$ traduit $D(T)=X$ ; la fermeture du graphe n'y est pour rien.`,
        counterexample: t`Pour $Au=u'$ sur $D(A)=H^1_0(]0,1[)\subset L^2(]0,1[)$, le graphe est fermé, mais $\pi_X\big(G(A)\big)=H^1_0(]0,1[)\neq L^2(]0,1[)$.`,
      },
      {
        conclusion: 'fin',
        by: 'j-gf',
        verdict: 'incorrect',
        concept: 'circularite',
        message: 'C’est le résultat à démontrer : l’invoquer rend la preuve circulaire.',
      },
    ],
    removable: [
      {
        hypothesis: 'h-X',
        label: t`Retirer la complétude de $X$`,
        necessary: true,
        explanation: t`$G(T)$ et $X$ ne sont plus des Banach : l'inverse borné ne s'applique plus à $\pi_X$.`,
        counterexample: C1_EXEMPLE,
      },
      {
        hypothesis: 'h-Y',
        label: t`Retirer la complétude de $Y$`,
        necessary: true,
        explanation: t`$X\times Y$, donc $G(T)$, peut ne plus être complet.`,
        counterexample: HAMEL_ARRIVEE,
      },
      {
        hypothesis: 'h-ferme',
        label: 'Retirer la fermeture du graphe',
        necessary: true,
        explanation: t`$G(T)$ n'est plus un Banach, et la conclusion peut échouer.`,
        counterexample: t`Une forme linéaire non continue sur un Banach de dimension infinie (construite à l'aide d'une base algébrique) est linéaire et définie partout ; par le théorème, son graphe n'est pas fermé.`,
      },
      {
        hypothesis: 'h-lin',
        label: t`Retirer « défini sur tout $X$ »`,
        necessary: true,
        explanation: t`$\pi_X$ n'est plus surjective sur $X$.`,
        counterexample: DERIVEE_H10,
      },
    ],
  },
  closedChecks: [
    {
      kind: 'choice',
      prompt: t`Pour appliquer l'inverse borné à $\pi_X:G(T)\to X$, quels espaces doivent être complets ?`,
      options: [t`$G(T)$ et $X$`, t`$Y$ seulement`, t`$X$ seulement`, t`$G(T)$ seulement`],
      correct: [0],
      explanation: t`$\pi_X$ va de $G(T)$ dans $X$ : les deux doivent être des Banach. $G(T)$ l'est comme sous-espace fermé de $X\times Y$, complet parce que $X$ et $Y$ le sont.`,
    },
  ],
  solution: t`$X\times Y$, muni de $\|(x,y)\|=\|x\|_X+\|y\|_Y$, est complet ; $G(T)$ en est un sous-espace vectoriel, par linéarité de $T$, et fermé par hypothèse : c'est un Banach. La projection $\pi_X:(x,Tx)\mapsto x$ est linéaire, continue car $\|x\|_X\le\|(x,Tx)\|$, et bijective : injective car $x=0$ impose $(x,Tx)=(0,0)$, surjective car $T$ est défini sur tout $X$. Par le théorème de l'inverse borné, $\pi_X^{-1}:x\mapsto(x,Tx)$ est continue. Alors $T=\pi_Y\circ\pi_X^{-1}$ est continu, comme composée d'applications continues ; de façon équivalente, $\|Tx\|_Y\le\|x\|_X+\|Tx\|_Y\le C\|x\|_X$.

**Point de vigilance.** L'hypothèse $D(T)=X$ sert à la surjectivité de $\pi_X$ : la dérivation sur $H^1_0(]0,1[)\subset L^2(]0,1[)$ est fermée sans être bornée.`,
  steps: [
    t`Montrer que $G(T)$ est un Banach pour la norme produit.`,
    t`Étudier la projection $\pi_X$ : linéaire, continue, bijective.`,
    'Appliquer le théorème de l’inverse borné.',
    t`Conclure par $T=\pi_Y\circ\pi_X^{-1}$.`,
  ],
  commonErrors: [
    { id: 'e-sev', description: 'Affirmer qu’un sous-espace d’un Banach est complet sans qu’il soit fermé.', concept: 'fermeture-espace' },
    { id: 'e-domaine', description: t`Oublier que la surjectivité de $\pi_X$ repose sur $D(T)=X$.`, concept: 'domaine-operateur' },
    { id: 'e-definition', description: 'Croire que la fermeture du graphe donne la convergence de la suite des images.', concept: 'graphe-ferme-definition' },
  ],
  hints: [
    t`Quel opérateur, naturellement associé au graphe, est une bijection linéaire continue entre deux espaces de Banach ?`,
    t`Considère $\pi_X:G(T)\to X$. Vérifie que $G(T)$ est complet, puis que $\pi_X$ est continue et bijective.`,
    t`L'inverse borné donne $\pi_X^{-1}:x\mapsto(x,Tx)$ continue ; compose avec la projection sur $Y$.`,
  ],
  rubric: rubric({
    hypotheses: t`La complétude de $G(T)$ et la bijectivité de $\pi_X$ sont démontrées.`,
    methode: 'Le théorème de l’inverse borné est appliqué à la projection sur le graphe.',
    validite: t`Chaque propriété de $\pi_X$ est établie, la surjectivité par $D(T)=X$.`,
    justifications: 'Aucune utilisation circulaire du résultat.',
    conclusion: t`La continuité de $T$ est obtenue.`,
  }),
  variant: {
    statement: t`Soit $H$ un espace de Hilbert réel et $S:H\to H$ linéaire, défini sur tout $H$, et symétrique : $\langle Sx,z\rangle=\langle x,Sz\rangle$ pour tous $x,z\in H$. Montrer que $S$ est continu (théorème de Hellinger–Toeplitz).`,
    solution: t`Soit $x_n\to x$ avec $Sx_n\to y$. Pour tout $z\in H$, $\langle Sx_n,z\rangle=\langle x_n,Sz\rangle$ ; par continuité du produit scalaire, $\langle y,z\rangle=\langle x,Sz\rangle=\langle Sx,z\rangle$. Donc $\langle y-Sx,z\rangle=0$ pour tout $z$, et $z=y-Sx$ donne $y=Sx$ : le graphe de $S$ est fermé. $H$ étant complet et $S$ défini sur tout $H$, le théorème du graphe fermé donne la continuité. Les deux hypothèses sont indispensables : $Au=-u''$ sur $H^2(]0,1[)\cap H^1_0(]0,1[)$ est symétrique et non borné, et sur $c_{00}$ muni du produit scalaire de $\ell^2$, $S(x)=(kx_k)_k$ est symétrique, partout défini et non borné.`,
    proof: {
      purpose: 'application',
      goal: 'fin',
      nodes: [
        { id: 'h-H', kind: 'hypothese', text: t`$H$ est un espace de Hilbert réel, donc un espace de Banach.` },
        { id: 'h-S', kind: 'hypothese', text: t`$S:H\to H$ est linéaire et défini sur tout $H$.` },
        { id: 'h-sym', kind: 'hypothese', text: t`$\langle Sx,z\rangle=\langle x,Sz\rangle$ pour tous $x,z\in H$.` },
        { id: 'd-suite', kind: 'definition', local: true, text: t`Soit $(x_n)_n\subset H$ avec $x_n\to x$ et $Sx_n\to y$ dans $H$.` },
        { id: 'd-z', kind: 'definition', local: true, text: t`Soit $z\in H$.` },
        { id: 'e-sym', kind: 'egalite', text: t`$\langle Sx_n,z\rangle=\langle x_n,Sz\rangle$ pour tout $n$.` },
        { id: 'e-lim', kind: 'egalite', text: t`$\langle y,z\rangle=\langle x,Sz\rangle=\langle Sx,z\rangle$.` },
        { id: 'e-y', kind: 'egalite', text: t`$y=Sx$.` },
        { id: 'ferme', kind: 'consequence', text: t`Le graphe de $S$ est fermé dans $H\times H$.` },
        { id: 'thm', kind: 'application-theoreme', text: t`$S$ est continu.` },
        { id: 'fin', kind: 'conclusion', text: t`$S\in\mathcal L(H)$.` },
        { id: 'x-sym-seule', kind: 'consequence', distractor: true, text: t`Un opérateur symétrique est borné, quel que soit son domaine.` },
      ],
      justifications: [
        { id: 'j-sym', label: t`Symétrie de $S$, appliquée à $x_n$ et $z$.` },
        { id: 'j-lim-ps', label: t`Continuité du produit scalaire, puis symétrie de $S$ appliquée à $x$ et $z$.` },
        { id: 'j-test', label: t`$\langle y-Sx,z\rangle=0$ pour tout $z\in H$ ; on choisit $z=y-Sx$.` },
        { id: 'j-seq', label: 'Caractérisation séquentielle de la fermeture du graphe.' },
        { id: 'j-gf', label: 'Théorème du graphe fermé.', theorem: 'graphe-ferme' },
        { id: 'j-syn', label: t`Définition de $\mathcal L(H)$.` },
        { id: 'j-cs-direct', label: t`Cauchy–Schwarz : $\|Sx\|^2=\langle x,S^2x\rangle\le\|x\|\,\|S^2x\|$, ce qui borne $S$.` },
      ],
      rules: [
        { from: ['h-sym', 'd-suite', 'd-z'], to: 'e-sym', by: 'j-sym' },
        { from: ['e-sym', 'd-suite', 'h-sym'], to: 'e-lim', by: 'j-lim-ps' },
        { from: ['e-lim'], to: 'e-y', by: 'j-test' },
        { from: ['e-y'], to: 'ferme', by: 'j-seq' },
        { from: ['h-H', 'h-S', 'ferme'], to: 'thm', by: 'j-gf' },
        { from: ['thm'], to: 'fin', by: 'j-syn' },
      ],
      traps: [
        {
          conclusion: 'x-sym-seule',
          verdict: 'incorrect',
          concept: 'domaine-operateur',
          message: 'La symétrie ne suffit pas : le théorème exige que l’opérateur soit défini sur tout l’espace.',
          counterexample: t`$Au=-u''$ sur $D(A)=H^2(]0,1[)\cap H^1_0(]0,1[)\subset L^2(]0,1[)$ est symétrique, et $w_n(x)=\sin(n\pi x)$ vérifie $\|Aw_n\|/\|w_n\|=n^2\pi^2$.`,
        },
        {
          conclusion: 'thm',
          by: 'j-cs-direct',
          verdict: 'incorrect',
          concept: 'circularite',
          message: t`La majoration fait intervenir $\|S^2x\|$, qui n'est pas contrôlé : on suppose ce qu'on veut démontrer.`,
        },
      ],
      removable: [
        {
          hypothesis: 'h-H',
          label: 'Retirer la complétude',
          necessary: true,
          explanation: 'Le théorème du graphe fermé ne s’applique plus.',
          counterexample: t`Sur $c_{00}$ muni du produit scalaire de $\ell^2$, $S(x)=(kx_k)_k$ est linéaire, partout défini, symétrique, et $Se_n=ne_n$ : il n'est pas borné.`,
        },
        {
          hypothesis: 'h-S',
          label: t`Retirer « défini sur tout $H$ »`,
          necessary: true,
          explanation: 'Un opérateur symétrique de domaine strict peut être non borné.',
          counterexample: t`$Au=-u''$ sur $H^2(]0,1[)\cap H^1_0(]0,1[)\subset L^2(]0,1[)$.`,
        },
      ],
    },
  },
  verification: FROM_POLY,
};

/* ───────────────────────────── DIFFICILE ───────────────────────────── */

const difficile: Exercise = {
  id: 'graphe-ferme.difficile',
  theoremId: 'graphe-ferme',
  level: 'difficile',
  title: t`La dérivation sur $H^1_0\subset L^2$ : fermée et non bornée`,
  statement: t`Soient $H=L^2(]0,1[)$ et $A:D(A)\subset H\to H$, $Au=u'$, de domaine $D(A)=H^1_0(]0,1[)$. Montrer que $A$ est fermé, que $A$ n'est pas borné pour la norme de $H$, et expliquer pourquoi cela ne contredit pas le théorème du graphe fermé.`,
  source: poly(39, 'Annexe B, exercice 7, difficile ; point de vigilance de la section 2.3 (p. PDF 10)'),
  prerequisites: ['distributions'],
  concepts: ['graphe-ferme-ferme-borne', 'densite-fermeture', 'complet-necessaire', 'domaine-operateur'],
  proof: {
    purpose: 'application',
    goal: 'fin',
    nodes: [
      { id: 'd-A', kind: 'definition', text: t`$H=L^2(]0,1[)$, $D(A)=H^1_0(]0,1[)$ et $Au=u'$, dérivée faible.` },
      { id: 'h-H10', kind: 'hypothese', text: t`$H^1_0(]0,1[)$, adhérence de $C^\infty_c(]0,1[)$ dans $H^1(]0,1[)$, est fermé dans $H^1(]0,1[)$, normé par $\|u\|^2_{H^1}=\|u\|^2_{L^2}+\|u'\|^2_{L^2}$.` },
      { id: 'd-suite', kind: 'definition', local: true, text: t`Soit $(u_n)_n\subset D(A)$ tel que $u_n\to u$ et $u_n'\to v$ dans $H$.` },
      { id: 'd-w', kind: 'definition', text: t`Pour $n\ge 1$ : $w_n(x)=\sin(n\pi x)$.` },

      { id: 'c-H1', kind: 'consequence', text: t`Pour tout $\varphi\in C^\infty_c(]0,1[)$, $\int_0^1u\varphi'=-\int_0^1v\varphi$ : $u\in H^1(]0,1[)$ et $u'=v$.` },
      { id: 'c-H10', kind: 'consequence', text: t`$u_n\to u$ dans $H^1(]0,1[)$, donc $u\in H^1_0(]0,1[)$.` },
      { id: 'ferme', kind: 'consequence', text: t`$u\in D(A)$ et $Au=v$ : le graphe de $A$ est fermé dans $H\times H$.` },
      {
        id: 'w-ratio',
        kind: 'egalite',
        text: t`$w_n\in D(A)$ et $\|w_n'\|^2_{L^2}/\|w_n\|^2_{L^2}=n^2\pi^2$.`,
        masked: t`Rapport $\|Aw_n\|^2_{L^2}/\|w_n\|^2_{L^2}$ : à calculer.`,
        check: { kind: 'expr-equiv', prompt: t`Valeur de $\|w_n'\|^2_{L^2}/\|w_n\|^2_{L^2}$ en fonction de $n$ (écrire pi pour $\pi$)`, expected: 'n^2*pi^2', vars: ['n', 'pi'] },
      },
      { id: 'nonborne', kind: 'consequence', text: t`Aucune constante $C$ ne vérifie $\|Au\|_H\le C\|u\|_H$ pour tout $u\in D(A)$ : $A$ n'est pas borné en norme $L^2$.` },
      { id: 'dom', kind: 'consequence', text: t`$D(A)$ est dense dans $H$ et distinct de $H$ : la fonction constante $1$ n'appartient pas à $H^1_0(]0,1[)$.` },
      { id: 'n-complet', kind: 'consequence', text: t`$(D(A),\|\cdot\|_H)$ n'est pas complet.` },
      { id: 'nc', kind: 'consequence', text: t`Le théorème du graphe fermé ne s'applique pas : avec $X=H$, $A$ n'est pas défini sur tout $X$ ; avec $X=(D(A),\|\cdot\|_H)$, l'espace n'est pas complet.` },
      { id: 'fin', kind: 'conclusion', text: t`$A$ est fermé et non borné en norme $L^2$, sans contradiction avec le théorème du graphe fermé, dont les hypothèses de domaine et de complétude échouent.` },

      // Propositions plausibles mais fausses.
      { id: 'x-borne', kind: 'consequence', distractor: true, after: ['ferme'], text: t`$A$ étant fermé, le théorème du graphe fermé montre que $A$ est borné en norme $L^2$.` },
      { id: 'x-D-ferme', kind: 'consequence', distractor: true, text: t`$H^1_0(]0,1[)$ est fermé dans $L^2(]0,1[)$.` },
    ],
    justifications: [
      { id: 'j-faible', label: t`Définition de la dérivée faible, $\int_0^1u_n\varphi'=-\int_0^1u_n'\varphi$, puis passage à la limite par Cauchy–Schwarz ; $\varphi$ est quelconque.` },
      { id: 'j-ferme-H1', label: t`$\|u_n-u\|^2_{H^1}=\|u_n-u\|^2_{L^2}+\|u_n'-v\|^2_{L^2}\to 0$, et $H^1_0$ est fermé dans $H^1$.` },
      { id: 'j-seq', label: 'Caractérisation séquentielle de la fermeture du graphe.' },
      { id: 'j-calc-w', label: t`$w_n$ est régulière et nulle en $0$ et $1$ ; $\|w_n\|^2_{L^2}=\tfrac12$ et $\|w_n'\|^2_{L^2}=\tfrac{n^2\pi^2}2$.` },
      { id: 'j-ratio', label: t`Le rapport $\|Aw_n\|_H/\|w_n\|_H=n\pi$ n'est pas borné.` },
      { id: 'j-dom', label: t`$C^\infty_c(]0,1[)\subset H^1_0(]0,1[)$ est dense dans $L^2$ ; une fonction de $H^1_0(]0,1[)$ a un représentant continu nul en $0$ et en $1$.` },
      { id: 'j-dense-strict', label: 'Un sous-espace complet est fermé ; or un sous-espace dense et distinct de l’espace n’est pas fermé.' },
      { id: 'j-hyp-gf', label: 'Comparaison avec les hypothèses du théorème : opérateur linéaire défini sur tout un espace de Banach.' },
      { id: 'j-syn', label: 'Réunion des propriétés établies.' },
      // Justifications séduisantes et fausses.
      { id: 'j-derivee-cont', label: t`La dérivation est continue dans $L^2$ : $u_n\to u$ dans $L^2$ entraîne $u_n'\to u'$ dans $L^2$.` },
      { id: 'j-H10-L2', label: t`$H^1_0(]0,1[)$ est fermé dans $L^2(]0,1[)$.` },
      { id: 'j-gf', label: 'Théorème du graphe fermé.', theorem: 'graphe-ferme' },
    ],
    rules: [
      { from: ['d-suite'], to: 'c-H1', by: 'j-faible' },
      { from: ['d-suite', 'c-H1', 'h-H10'], to: 'c-H10', by: 'j-ferme-H1' },
      { from: ['c-H1', 'c-H10', 'd-A'], to: 'ferme', by: 'j-seq' },
      { from: ['d-w', 'd-A'], to: 'w-ratio', by: 'j-calc-w' },
      { from: ['w-ratio'], to: 'nonborne', by: 'j-ratio' },
      { from: ['d-A'], to: 'dom', by: 'j-dom' },
      { from: ['dom'], to: 'n-complet', by: 'j-dense-strict' },
      { from: ['dom', 'n-complet'], to: 'nc', by: 'j-hyp-gf' },
      { from: ['ferme', 'nonborne', 'nc'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-borne',
        verdict: 'incorrect',
        concept: 'graphe-ferme-ferme-borne',
        message: t`Le théorème exige un opérateur défini sur tout un espace de Banach ; ici $D(A)\neq H$, et $D(A)$ n'est pas complet pour la norme de $H$.`,
        counterexample: t`$w_n(x)=\sin(n\pi x)\in D(A)$ et $\|Aw_n\|_{L^2}/\|w_n\|_{L^2}=n\pi$.`,
      },
      {
        conclusion: 'x-D-ferme',
        verdict: 'incorrect',
        concept: 'densite-fermeture',
        message: t`$H^1_0$ est fermé dans $H^1$, pour la norme de $H^1$ ; dans $L^2$, il est dense et strict.`,
        counterexample: t`Des fonctions de $C^\infty_c(]0,1[)$ convergent dans $L^2$ vers la fonction $1$, qui n'est pas dans $H^1_0(]0,1[)$.`,
      },
      {
        conclusion: 'c-H1',
        by: 'j-derivee-cont',
        verdict: 'incorrect',
        concept: 'graphe-ferme-ferme-borne',
        message: t`La dérivation n'est pas continue de $L^2$ dans $L^2$ : c'est précisément ce que montre la non-bornitude de $A$. L'identification $u'=v$ passe par les distributions.`,
        counterexample: t`$u_n=\sin(n\pi x)/n\to 0$ dans $L^2(]0,1[)$, alors que $\|u_n'\|_{L^2}=\pi/\sqrt2$.`,
      },
      {
        conclusion: 'c-H10',
        by: 'j-H10-L2',
        verdict: 'incorrect',
        concept: 'densite-fermeture',
        message: t`$H^1_0(]0,1[)$ n'est pas fermé dans $L^2$ ; la limite reste dans $H^1_0$ parce que la convergence a lieu dans $H^1$.`,
      },
      {
        conclusion: 'nonborne',
        by: 'j-gf',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: 'Le théorème du graphe fermé ne dit rien ici : son hypothèse de domaine n’est pas satisfaite. La non-bornitude se démontre par une suite explicite.',
      },
    ],
    removable: [
      {
        hypothesis: 'h-H10',
        label: t`Ne plus disposer de la fermeture de $H^1_0$ dans $H^1$`,
        necessary: true,
        explanation: 'Le domaine fait partie de la donnée : un domaine trop petit rend l’opérateur non fermé.',
        counterexample: t`Sur $D(B)=C^\infty_c(]0,1[)$, $Bu=u'$ n'est pas fermé : pour $u(x)=x(1-x)\in H^1_0(]0,1[)\setminus C^\infty_c(]0,1[)$, il existe $u_n\in C^\infty_c(]0,1[)$ avec $u_n\to u$ dans $H^1$, donc $(u_n,u_n')\to(u,u')$ dans $H\times H$, alors que $u\notin D(B)$.`,
      },
    ],
  },
  solution: t`**Fermeture.** Soit $u_n\in H^1_0(]0,1[)$ avec $u_n\to u$ et $u_n'\to v$ dans $L^2$. Pour $\varphi\in C^\infty_c(]0,1[)$, $\int_0^1u_n\varphi'=-\int_0^1u_n'\varphi$, et les deux membres passent à la limite par Cauchy–Schwarz : $\int_0^1u\varphi'=-\int_0^1v\varphi$. Donc $u\in H^1(]0,1[)$ et $u'=v$. Alors $\|u_n-u\|^2_{H^1}=\|u_n-u\|^2_{L^2}+\|u_n'-v\|^2_{L^2}\to 0$ ; $H^1_0$ étant fermé dans $H^1$, $u\in H^1_0(]0,1[)$ et $Au=v$.

**Non-bornitude.** $w_n(x)=\sin(n\pi x)\in H^1_0(]0,1[)$, $\|w_n\|^2_{L^2}=\frac12$ et $\|w_n'\|^2_{L^2}=\frac{n^2\pi^2}2$ : le rapport $\|Aw_n\|/\|w_n\|=n\pi$ n'est pas borné.

**Pas de contradiction.** Le théorème exige un opérateur linéaire défini sur tout un espace de Banach. Avec $X=L^2$, $A$ n'est pas défini partout, car $1\notin H^1_0(]0,1[)$. Avec $X=(H^1_0,\|\cdot\|_{L^2})$, l'espace n'est pas complet : il est dense et distinct de $L^2$, donc non fermé. En revanche, pour la norme du graphe, équivalente ici à la norme de $H^1$, $D(A)$ est complet et $\|Au\|_{L^2}\le\|u\|_{H^1}$ : $A$ y est borné, conformément au théorème.`,
  steps: [
    'Passer à la limite dans la définition de la dérivée faible.',
    t`Utiliser la fermeture de $H^1_0$ dans $H^1$, et non dans $L^2$.`,
    t`Exhiber une suite de $D(A)$ dont le rapport $\|Au\|/\|u\|$ tend vers l'infini.`,
    'Identifier l’hypothèse du théorème qui fait défaut.',
  ],
  commonErrors: [
    { id: 'e-borne', description: 'Déduire la bornitude de la seule fermeture.', concept: 'graphe-ferme-ferme-borne' },
    { id: 'e-L2', description: t`Affirmer que $H^1_0$ est fermé dans $L^2$.`, concept: 'densite-fermeture' },
    { id: 'e-domaine', description: 'Oublier que le domaine fait partie de la donnée de l’opérateur.', concept: 'domaine-operateur' },
  ],
  hints: [
    t`Le théorème du graphe fermé porte sur un opérateur défini sur tout un espace de Banach : est-ce le cas de $A$, pour la norme de $L^2$ ?`,
    t`Pour la fermeture, passe à la limite dans $\int u_n\varphi'=-\int u_n'\varphi$, puis utilise la convergence dans $H^1$. Pour la non-bornitude, teste sur $\sin(n\pi x)$.`,
    t`$\|\sin(n\pi\cdot)\|^2_{L^2}=\frac12$ et $\|(\sin(n\pi\cdot))'\|^2_{L^2}=\frac{n^2\pi^2}2$ ; la fonction $1$ montre que $D(A)\neq L^2$.`,
  ],
  rubric: rubric({
    hypotheses: t`Le domaine $H^1_0$ et les deux normes en jeu sont précisés.`,
    methode: 'La fermeture passe par la dérivée faible et la fermeture de $H^1_0$ dans $H^1$.',
    validite: 'Le calcul du rapport est exact.',
    justifications: 'L’hypothèse du théorème qui échoue est identifiée sans ambiguïté.',
    conclusion: 'Fermeture, non-bornitude et absence de contradiction sont établies.',
  }),
  variant: {
    statement: t`Même question pour $B:D(B)\subset L^2(]0,1[)\to L^2(]0,1[)$, $Bu=u'$, de domaine $D(B)=H^1(]0,1[)$.`,
    solution: t`La fermeture s'obtient comme ci-dessus, sans étape de bord : si $u_n\to u$ et $u_n'\to v$ dans $L^2$, alors $u\in H^1(]0,1[)$ et $u'=v$. Les fonctions $\sin(n\pi x)$ sont dans $H^1$ et donnent le rapport $n\pi$ : $B$ n'est pas borné. $D(B)$ est dense dans $L^2$ et distinct de $L^2$, car $\mathbb 1_{]0,1/2[}$ n'a pas de représentant continu ; le théorème du graphe fermé ne s'applique donc pas.`,
  },
  verification: COMPLEMENT,
};

/* ───────────────────────────── MODULE ───────────────────────────── */

const moduleT07: TheoremModule = {
  theorem: {
    id: 'graphe-ferme',
    spaces: [
      t`$X,Y$ : espaces de Banach ; $X\times Y$ est muni de la norme produit $\|(x,y)\|=\|x\|_X+\|y\|_Y$.`,
      t`$T:X\to Y$ linéaire, de domaine $D(T)=X$ ; son graphe est $G(T)=\{(x,Tx) : x\in X\}$.`,
    ],
    hypotheses: [
      { id: 'h-X', text: t`$X$ est complet.`, whenRemoved: C1_EXEMPLE },
      { id: 'h-Y', text: t`$Y$ est complet.`, whenRemoved: HAMEL_ARRIVEE },
      { id: 'h-domaine', text: t`$T$ est linéaire et défini sur tout $X$.`, whenRemoved: DERIVEE_H10 },
      {
        id: 'h-ferme',
        text: t`$G(T)$ est fermé dans $X\times Y$.`,
        whenRemoved: t`Une forme linéaire non continue sur un Banach de dimension infinie (construite à l'aide d'une base algébrique) est partout définie et non continue : son graphe n'est pas fermé.`,
      },
    ],
    statement: t`Si $X,Y$ sont des espaces de Banach, si $T:X\to Y$ est linéaire, défini sur tout $X$, et si son graphe $\{(x,Tx) : x\in X\}$ est fermé dans $X\times Y$, alors $T$ est continu.`,
    conclusions: {
      autre: t`Continuité : il existe $C\ge 0$ tel que $\|Tx\|_Y\le C\|x\|_X$ pour tout $x\in X$.`,
    },
    sourceProof: 'complete',
    proofOutline: [
      t`$G(T)$ est un sous-espace fermé du Banach $X\times Y$ : c'est un Banach pour la norme produit.`,
      t`La projection $\pi_X:(x,Tx)\mapsto x$ est une bijection linéaire continue de $G(T)$ sur $X$ ; la surjectivité utilise $D(T)=X$.`,
      t`Par le théorème de l'inverse borné, $\pi_X^{-1}:x\mapsto(x,Tx)$ est continue.`,
      t`La projection sur $Y$ donne la continuité de $T=\pi_Y\circ\pi_X^{-1}$.`,
    ],
    warnings: [
      t`Les opérateurs différentiels non bornés $A:D(A)\subsetneq H\to H$ peuvent être fermés sans être bornés sur $H$ : le théorème exige le domaine entier $D(T)=X$.`,
      t`La fermeture du graphe suppose la convergence de $(Tx_n)_n$ et identifie sa limite ; elle ne la fournit pas.`,
      'Le sens réciproque, un opérateur continu a un graphe fermé, est élémentaire et n’utilise pas la complétude.',
    ],
    usefulFor: 'Démontrer la continuité d’un opérateur partout défini.',
    verification: FROM_POLY,
  },
  definitions: [
    {
      id: 'gf-graphe',
      term: 'Graphe d’un opérateur',
      statement: t`Pour $T:D(T)\subset X\to Y$ linéaire, $G(T)=\{(x,Tx) : x\in D(T)\}\subset X\times Y$, muni de la norme produit $\|(x,y)\|=\|x\|_X+\|y\|_Y$.`,
      source: poly(9, 'Section 2.3'),
    },
    {
      id: 'gf-operateur-ferme',
      term: 'Opérateur fermé',
      statement: t`$T$ est fermé si $G(T)$ est fermé dans $X\times Y$ : si $x_n\in D(T)$, $x_n\to x$ et $Tx_n\to y$, alors $x\in D(T)$ et $Tx=y$.`,
      source: poly(23, 'Section 6.1'),
    },
    {
      id: 'gf-norme-graphe',
      term: 'Norme du graphe',
      statement: t`Sur $D(T)$, $\|x\|_T=\|x\|_X+\|Tx\|_Y$. Lorsque $X$ et $Y$ sont des Banach, $T$ est fermé si et seulement si $(D(T),\|\cdot\|_T)$ est complet, et $T$ est alors borné de $(D(T),\|\cdot\|_T)$ dans $Y$.`,
      source: complement('Notion classique, utilisée dans l’exercice difficile'),
    },
  ],
  concepts: [
    {
      id: 'graphe-ferme-ferme-borne',
      label: 'Opérateur fermé et opérateur borné',
      reminder: t`Un opérateur fermé défini sur tout un espace de Banach, à valeurs dans un espace de Banach, est borné ; de domaine strict, il peut ne pas l'être : la dérivation sur $H^1_0(]0,1[)\subset L^2(]0,1[)$ est fermée et non bornée.`,
    },
    {
      id: 'graphe-ferme-definition',
      label: 'Définition du graphe fermé',
      reminder: t`Le graphe est fermé si $x_n\to x$ et $Tx_n\to y$ entraînent $y=Tx$ : la convergence de $(Tx_n)_n$ est une hypothèse, non une conclusion.`,
    },
  ],
  counterexamples: [
    {
      id: 'ce-gf-domaine',
      theoremId: 'graphe-ferme',
      title: 'Domaine strict',
      claim: t`Tout opérateur linéaire fermé $A:D(A)\subset H\to H$ est borné.`,
      correctStatement: t`Le théorème exige que l'opérateur soit défini sur tout l'espace de Banach : $D(A)=H$.`,
      task: t`Pour $Au=u'$ sur $D(A)=H^1_0(]0,1[)\subset L^2(]0,1[)$, soit $u_n(x)=\max(0,1-n|x-\tfrac12|)$, $n\ge 2$. Exprime $\|u_n'\|^2_{L^2}/\|u_n\|^2_{L^2}$ en fonction de $n$.`,
      check: { kind: 'expr-equiv', prompt: t`Rapport $\|u_n'\|^2_{L^2}/\|u_n\|^2_{L^2}$ en fonction de $n$`, expected: '3n^2', vars: ['n'] },
      explanation: t`$u_n$ est affine par morceaux, à support $[\tfrac12-\tfrac1n,\tfrac12+\tfrac1n]\subset[0,1]$, nulle en $0$ et en $1$ : $u_n\in H^1_0(]0,1[)$. On a $\|u_n\|^2_{L^2}=2\int_0^{1/n}(1-nt)^2\,dt=\frac2{3n}$ et $\|u_n'\|^2_{L^2}=n^2\cdot\frac2n=2n$, d'où le rapport $3n^2$, non borné. $A$ est pourtant fermé : c'est l'hypothèse $D(A)=L^2$ qui manque.`,
      concept: 'graphe-ferme-ferme-borne',
      source: poly(10, 'Point de vigilance de la section 2.3'),
    },
    {
      id: 'ce-gf-complet',
      theoremId: 'graphe-ferme',
      title: 'Espace de départ non complet',
      claim: t`Si $X$ est normé, $Y$ un Banach et $T:X\to Y$ linéaire, partout défini, de graphe fermé, alors $T$ est continu.`,
      correctStatement: t`Le théorème exige que $X$ soit complet.`,
      task: t`$X=C^1([0,1])$ muni de $\|\cdot\|_\infty$, $Y=C([0,1])$ muni de $\|\cdot\|_\infty$ et $Tu=u'$. Pour $u_n(x)=x^n$, exprime $\|Tu_n\|_\infty/\|u_n\|_\infty$ en fonction de $n$.`,
      check: { kind: 'expr-equiv', prompt: t`Rapport $\|Tu_n\|_\infty/\|u_n\|_\infty$ en fonction de $n$`, expected: 'n', vars: ['n'] },
      explanation: t`$\|u_n\|_\infty=1$ et $\|nx^{n-1}\|_\infty=n$ : $T$ n'est pas continu. Son graphe est pourtant fermé : si $u_n\to u$ et $u_n'\to v$ uniformément, avec $u\in C^1$, alors $u(x)=u(0)+\int_0^xv$, donc $u'=v$. Le théorème ne s'applique pas, car $(C^1([0,1]),\|\cdot\|_\infty)$ n'est pas complet.`,
      concept: 'complet-necessaire',
      source: poly(9, 'Section 2.3 (hypothèse de complétude)'),
    },
  ],
  exercises: [facile, intermediaire, difficile],
};

export default moduleT07;
