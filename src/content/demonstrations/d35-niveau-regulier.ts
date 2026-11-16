/**
 * Démonstration du résultat 35 — théorème du niveau régulier, selon le plan du cours :
 * fonctions implicites, cartes adaptées, puis espace tangent par dérivation et dimension.
 */
import { t, COMPLEMENT } from '@/content/authoring';
import type { Demonstration } from '@/content/schema';

const demonstration: Demonstration = {
  id: 'niveau-regulier.demonstration',
  theoremId: 'niveau-regulier',
  title: 'Démontrer le théorème du niveau régulier',
  statement: t`Soit $F:M\to N$ une application lisse entre variétés de dimensions $m$ et $n$, et $q\in N$ tel que $dF_p$ soit surjective pour tout $p\in S=F^{-1}(q)$. Démontrer que $S$ est une sous-variété plongée de $M$, de dimension $m-n$, et que $T_pS=\operatorname{Ker}dF_p$ pour tout $p\in S$.`,
  scope: 'complete',
  source: { doc: 'cours-lie', pdfPage: 50, label: '§ 8.6 : théorème du niveau régulier (plan du cours, détaillé pour ProofLab)' },
  prerequisites: ['fonction-implicite'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-lisse', kind: 'hypothese', text: t`$F:M\to N$ est lisse.` },
      { id: 'h-surj', kind: 'hypothese', text: t`$dF_p:T_pM\to T_qN$ est surjective en tout point $p$ de $S=F^{-1}(q)$.` },

      { id: 'p-soit', kind: 'definition', local: true, text: t`Soit $p\in S$. En cartes autour de $p$ et de $q$, on lit $F$ comme une application lisse d'un ouvert de $\mathbb R^m$ dans $\mathbb R^n$.` },
      { id: 'p-rang', kind: 'consequence', text: t`La matrice jacobienne de $F$ en $p$, de taille $n\times m$, est de rang $n$ : quitte à permuter les coordonnées, $x=(y,z)\in\mathbb R^{m-n}\times\mathbb R^n$ avec $\partial_zF(p)$ inversible.` },
      { id: 'p-ift', kind: 'application-theoreme', text: t`Près de $p=(y_0,z_0)$ : $F(y,z)=q\iff z=g(y)$, avec $g$ lisse.` },
      { id: 'p-carte', kind: 'consequence', text: t`$\phi(y,z)=(y,z-g(y))$ est une carte adaptée : elle envoie $S$, près de $p$, sur $\mathbb R^{m-n}\times\{0\}$.` },
      { id: 'sous-var', kind: 'consequence', text: t`$S$ est une sous-variété plongée de dimension $m-n$.` },

      { id: 't-soit', kind: 'definition', local: true, text: t`Soit $\gamma:\,]-\delta,\delta[\to S$ une courbe lisse avec $\gamma(0)=p$.` },
      { id: 't-incl', kind: 'inclusion', text: t`$dF_p(\gamma'(0))=0$ : $T_pS\subset\operatorname{Ker}dF_p$.` },
      { id: 't-dim', kind: 'egalite', text: t`$\dim\operatorname{Ker}dF_p=m-n=\dim T_pS$.` },
      { id: 'tangent', kind: 'egalite', text: t`$T_pS=\operatorname{Ker}dF_p$.` },

      { id: 'fin', kind: 'conclusion', text: t`$S$ est une sous-variété plongée de dimension $m-n$, et $T_pS=\operatorname{Ker}dF_p$ pour tout $p\in S$.` },

      { id: 'x-un-point', kind: 'consequence', distractor: true, after: ['p-rang'], text: t`Il suffit que $dF_p$ soit surjective en un point de $S$ pour que $S$ soit une sous-variété.` },
      { id: 'x-affine', kind: 'egalite', distractor: true, after: ['t-incl'], text: t`$T_pS=p+\operatorname{Ker}dF_p$.` },
    ],
    justifications: [
      { id: 'j-rang', label: t`Une application linéaire surjective vers $\mathbb R^n$ a $n$ colonnes indépendantes.` },
      { id: 'j-ift', label: t`Théorème des fonctions implicites, $\partial_zF(p)$ étant inversible.`, theorem: 'fonction-implicite' },
      { id: 'j-graphe', label: t`Le graphe d'une application lisse est redressé par $(y,z)\mapsto(y,z-g(y))$, difféomorphisme d'inverse $(y,w)\mapsto(y,w+g(y))$.` },
      { id: 'j-def-sv', label: 'Définition d’une sous-variété plongée : chaque point admet une carte adaptée.' },
      { id: 'j-chaine', label: t`$F(\gamma(s))=q$ pour tout $s$ ; dériver en $s=0$ (règle de chaîne).` },
      { id: 'j-rang-noyau', label: t`Théorème du rang : $\dim\operatorname{Ker}dF_p=m-\operatorname{rg}dF_p=m-n$ ; $T_pS$ est de dimension $m-n$.` },
      { id: 'j-incl-dim', label: 'Une inclusion entre sous-espaces de même dimension finie est une égalité.' },
      { id: 'j-syn', label: 'Réunion des résultats établis, en tout point de S.' },
      // Justifications séduisantes mais fausses.
      { id: 'j-incl-seule', label: t`L'inclusion $T_pS\subset\operatorname{Ker}dF_p$ suffit.` },
      { id: 'j-thm', label: 'Théorème du niveau régulier.', theorem: 'niveau-regulier' },
    ],
    rules: [
      { from: ['p-soit', 'h-surj'], to: 'p-rang', by: 'j-rang' },
      { from: ['p-rang', 'h-lisse'], to: 'p-ift', by: 'j-ift' },
      { from: ['p-ift'], to: 'p-carte', by: 'j-graphe' },
      { from: ['p-carte'], to: 'sous-var', by: 'j-def-sv' },
      { from: ['t-soit', 'h-lisse', 'sous-var'], to: 't-incl', by: 'j-chaine' },
      { from: ['h-surj', 'sous-var'], to: 't-dim', by: 'j-rang-noyau' },
      { from: ['t-incl', 't-dim'], to: 'tangent', by: 'j-incl-dim' },
      { from: ['sous-var', 'tangent'], to: 'fin', by: 'j-syn' },
    ],
    traps: [
      {
        conclusion: 'x-un-point',
        verdict: 'incorrect',
        concept: 'lie-niveau-regulier',
        message: 'La surjectivité est requise en tout point du niveau : un seul point critique peut faire perdre la structure de sous-variété.',
        counterexample: t`$F(x,y)=x^2-y^2$ et $q=0$ : $dF$ est surjective en tout point de $S$ sauf $(0,0)$, et $S$, réunion de deux droites sécantes, n'est pas une sous-variété près de l'origine.`,
      },
      {
        conclusion: 'x-affine',
        verdict: 'incorrect',
        concept: 'lie-espace-tangent',
        message: t`$T_pS$ est un sous-espace vectoriel de directions ; l'espace affine tangent est $p+T_pS$.`,
        counterexample: t`Pour le cercle $x^2+y^2=1$ en $p=(1,0)$ : $T_pS=\{0\}\times\mathbb R$, alors que la droite tangente est $\{1\}\times\mathbb R$.`,
      },
      {
        conclusion: 'tangent',
        by: 'j-incl-seule',
        verdict: 'incorrect',
        concept: 'lie-espace-tangent',
        message: 'Une inclusion ne donne pas l’égalité : il faut comparer les dimensions.',
        counterexample: t`$\{0\}\subset\operatorname{Ker}dF_p$ sans égalité dès que $m>n$.`,
      },
      {
        conclusion: 'fin',
        by: 'j-thm',
        verdict: 'incorrect',
        concept: 'circularite',
        message: 'C’est le résultat à démontrer : l’invoquer rend la preuve circulaire.',
      },
    ],
    removable: [
      {
        hypothesis: 'h-surj',
        label: t`Ne plus supposer $dF_p$ surjective sur tout $S$`,
        necessary: true,
        explanation: 'Les fonctions implicites ne s’appliquent plus en un point critique.',
        counterexample: t`$F(x,y)=x^2-y^2$, $q=0$ : en $(0,0)$, $dF=0$, et $S$ n'est pas une sous-variété près de ce point.`,
      },
    ],
  },
  plan: [
    t`En un point $p$ de $S$, lire $F$ en cartes : la jacobienne est de rang $n$.`,
    'Fonctions implicites : S est localement un graphe au-dessus de m − n coordonnées.',
    'Redresser ce graphe : carte adaptée, donc sous-variété de dimension m − n.',
    t`Une courbe de $S$ vérifie $F(\gamma(s))=q$ : $T_pS\subset\operatorname{Ker}dF_p$, puis égalité par les dimensions.`,
  ],
  solution: t`Soit $p\in S$. En cartes, la matrice jacobienne de $F$ en $p$ est de rang $n$ puisque $dF_p$ est surjective ; quitte à permuter les coordonnées, $x=(y,z)$ avec $\partial_zF(p)$ inversible. Par le théorème des fonctions implicites, près de $p$, $F(y,z)=q$ équivaut à $z=g(y)$ avec $g$ lisse. L'application $\phi(y,z)=(y,z-g(y))$ est un difféomorphisme local qui envoie $S$ sur $\mathbb R^{m-n}\times\{0\}$ : $S$ est une sous-variété plongée de dimension $m-n$.

Si $\gamma$ est une courbe lisse de $S$ avec $\gamma(0)=p$, alors $F(\gamma(s))=q$, et la règle de chaîne donne $dF_p(\gamma'(0))=0$ : $T_pS\subset\operatorname{Ker}dF_p$. Par le théorème du rang, $\dim\operatorname{Ker}dF_p=m-n=\dim T_pS$, d'où l'égalité.`,
  verification: { ...COMPLEMENT, notes: 'Plan du cours (idée de la démonstration), détaillé pour ProofLab.' },
};

export default demonstration;
