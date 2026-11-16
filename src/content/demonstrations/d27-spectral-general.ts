/**
 * Démonstration d'une étape du résultat 27 (théorème spectral général, admis dans le
 * polycopié) : le spectre d'un opérateur auto-adjoint est réel, avec l'estimation de la
 * résolvante. La construction de la mesure spectrale reste admise.
 */
import { t, COMPLEMENT } from '@/content/authoring';
import type { Demonstration } from '@/content/schema';

const demonstration: Demonstration = {
  id: 'spectral-general.demonstration',
  theoremId: 'spectral-general',
  title: 'Le spectre d’un opérateur auto-adjoint est réel',
  statement: t`Soit $H$ un espace de Hilbert complexe (produit scalaire linéaire en la première variable), $A:D(A)\subset H\to H$ auto-adjoint, et $\lambda=a+ib$ avec $a,b\in\mathbb R$, $b\neq 0$. Démontrer que $A-\lambda$ est une bijection de $D(A)$ sur $H$, d'inverse borné de norme au plus $1/|b|$ : le spectre de $A$ est contenu dans $\mathbb R$.`,
  scope: 'partie',
  scopeNote: t`Une étape du théorème spectral, dont la démonstration complète (construction de la mesure spectrale) est admise dans le polycopié : on démontre ici que $\sigma(A)\subset\mathbb R$, avec $\|(A-\lambda)^{-1}\|\le 1/|\operatorname{Im}\lambda|$.`,
  source: { doc: 'polycopie', pdfPage: 25, label: 'Section 6.5 : théorème spectral général (énoncé admis) ; étape démontrée pour ProofLab' },
  prerequisites: ['adjoint', 'cauchy-schwarz'],
  proof: {
    purpose: 'demonstration',
    goal: 'fin',
    nodes: [
      { id: 'h-hilbert', kind: 'hypothese', text: t`$H$ est un espace de Hilbert complexe.` },
      { id: 'h-auto', kind: 'hypothese', text: t`$A$ est auto-adjoint : $A=A^*$, domaines compris. En particulier $\langle Au,u\rangle\in\mathbb R$ pour $u\in D(A)$.` },
      { id: 'h-lambda', kind: 'hypothese', text: t`$\lambda=a+ib$ avec $a,b\in\mathbb R$ et $b\neq 0$.` },

      { id: 'est', kind: 'inegalite', text: t`Pour $u\in D(A)$ : $\|(A-\lambda)u\|\,\|u\|\ge\big|\operatorname{Im}\langle(A-\lambda)u,u\rangle\big|=|b|\,\|u\|^2$.` },
      { id: 'minor', kind: 'inegalite', text: t`$\|(A-\lambda)u\|\ge|b|\,\|u\|$ pour tout $u\in D(A)$.` },
      { id: 'minor-bar', kind: 'inegalite', text: t`$\|(A-\bar\lambda)u\|\ge|b|\,\|u\|$ pour tout $u\in D(A)$.` },
      { id: 'inj', kind: 'consequence', text: t`$A-\lambda$ est injectif.` },
      { id: 'image-fermee', kind: 'consequence', text: t`L'image de $A-\lambda$ est fermée.` },
      { id: 'image-dense', kind: 'consequence', text: t`L'image de $A-\lambda$ est dense dans $H$.` },
      { id: 'surj', kind: 'consequence', text: t`$A-\lambda$ est surjectif sur $H$.` },
      { id: 'inv', kind: 'inegalite', text: t`$(A-\lambda)^{-1}$ est défini sur $H$ et $\|(A-\lambda)^{-1}f\|\le\frac1{|b|}\|f\|$ pour tout $f\in H$.` },

      { id: 'fin', kind: 'conclusion', text: t`Pour $\operatorname{Im}\lambda\neq 0$, $\lambda$ appartient à l'ensemble résolvant de $A$ : $\sigma(A)\subset\mathbb R$, et $\|(A-\lambda)^{-1}\|\le 1/|\operatorname{Im}\lambda|$.` },

      { id: 'x-vp', kind: 'consequence', distractor: true, after: ['inj'], text: t`Puisque $A-\lambda$ est injectif, $\lambda$ n'est pas dans le spectre : il suffit d'exclure les valeurs propres non réelles.` },
      { id: 'x-sym', kind: 'consequence', distractor: true, after: ['minor'], text: t`Le même argument donne $\sigma(A)\subset\mathbb R$ pour tout opérateur fermé et symétrique.` },
    ],
    justifications: [
      { id: 'j-im', label: t`$\langle(A-\lambda)u,u\rangle=\langle Au,u\rangle-a\|u\|^2-ib\|u\|^2$, de partie imaginaire $-b\|u\|^2$ ; puis Cauchy–Schwarz.`, theorem: 'cauchy-schwarz' },
      { id: 'j-im-bar', label: t`Même calcul avec $\bar\lambda=a-ib$, de partie imaginaire $-b\neq 0$ changée de signe.`, theorem: 'cauchy-schwarz' },
      { id: 'j-div', label: t`Diviser par $\|u\|$ lorsque $u\neq 0$ ; le cas $u=0$ est immédiat.` },
      { id: 'j-noyau', label: t`$(A-\lambda)u=0$ impose $|b|\,\|u\|\le 0$, donc $u=0$.` },
      { id: 'j-image', label: t`Si $(A-\lambda)u_n\to f$, la minoration rend $(u_n)$ de Cauchy, donc convergente vers $u$ ; $A$ est fermé, comme tout adjoint, d'où $u\in D(A)$ et $(A-\lambda)u=f$.`, theorem: 'adjoint' },
      { id: 'j-orthogonal', label: t`$\big(\operatorname{Im}(A-\lambda)\big)^\perp=\ker\big((A-\lambda)^*\big)=\ker(A-\bar\lambda)$, réduit à $\{0\}$ par la minoration.` },
      { id: 'j-ferme-dense', label: 'Une partie fermée et dense est l’espace entier.' },
      { id: 'j-inverse', label: t`Bijection ; la minoration appliquée à $u=(A-\lambda)^{-1}f$.` },
      { id: 'j-resolvant', label: 'Définition de l’ensemble résolvant : A − λ est bijectif, d’inverse borné.' },
      // Justifications séduisantes mais fausses.
      { id: 'j-inj-surj', label: 'Un opérateur injectif est surjectif.' },
      { id: 'j-thm', label: 'Théorème spectral général.', theorem: 'spectral-general' },
    ],
    rules: [
      { from: ['h-auto', 'h-lambda'], to: 'est', by: 'j-im' },
      { from: ['est'], to: 'minor', by: 'j-div' },
      { from: ['h-auto', 'h-lambda'], to: 'minor-bar', by: 'j-im-bar' },
      { from: ['minor'], to: 'inj', by: 'j-noyau' },
      { from: ['minor', 'h-auto', 'h-hilbert'], to: 'image-fermee', by: 'j-image' },
      { from: ['minor-bar', 'h-auto'], to: 'image-dense', by: 'j-orthogonal' },
      { from: ['image-fermee', 'image-dense'], to: 'surj', by: 'j-ferme-dense' },
      { from: ['inj', 'surj', 'minor'], to: 'inv', by: 'j-inverse' },
      { from: ['inv'], to: 'fin', by: 'j-resolvant' },
    ],
    traps: [
      {
        conclusion: 'x-vp',
        verdict: 'incorrect',
        concept: 'spectral-general-spectre-ponctuel',
        message: 'Le spectre ne se réduit pas aux valeurs propres : il faut aussi la surjectivité et un inverse borné.',
        counterexample: t`La multiplication $(Mu)(x)=xu(x)$ sur $L^2(]0,1[)$ n'a aucune valeur propre, et pourtant $\sigma(M)=[0,1]$.`,
      },
      {
        conclusion: 'x-sym',
        verdict: 'incorrect',
        concept: 'symetrie-autoadjonction',
        message: t`Pour un opérateur seulement symétrique, $\ker(A^*-\bar\lambda)$ peut être non nul : l'image de $A-\lambda$ n'est plus dense.`,
        counterexample: t`$A=-i\frac{d}{dx}$ sur $D(A)=H^1_0(]0,1[)$ est fermé et symétrique, et $e^{x}$ est orthogonal à l'image de $A-i$ : celle-ci n'est pas dense.`,
      },
      {
        conclusion: 'surj',
        by: 'j-inj-surj',
        verdict: 'incorrect',
        concept: 'image-dense-surjective',
        message: 'En dimension infinie, injectif n’entraîne pas surjectif : il faut ici une image fermée et dense.',
        counterexample: t`Le décalage $S(x_1,x_2,\dots)=(0,x_1,x_2,\dots)$ sur $\ell^2$ est injectif et non surjectif.`,
      },
      {
        conclusion: 'fin',
        by: 'j-thm',
        verdict: 'incorrect',
        concept: 'circularite',
        message: 'C’est le théorème dont on démontre ici une étape : l’invoquer rend la preuve circulaire.',
      },
    ],
    removable: [
      {
        hypothesis: 'h-auto',
        label: t`Ne plus supposer $A$ auto-adjoint`,
        necessary: true,
        explanation: 'Le spectre peut alors contenir des nombres non réels.',
        counterexample: t`Sur $\mathbb C^2$, la matrice $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ a pour valeurs propres $\pm i$.`,
      },
    ],
  },
  plan: [
    t`Minoration : $\|(A-\lambda)u\|\ge|\operatorname{Im}\lambda|\,\|u\|$, par la partie imaginaire de $\langle(A-\lambda)u,u\rangle$.`,
    'Injectivité et image fermée (A est fermé).',
    t`Image dense : son orthogonal est $\ker(A-\bar\lambda)=\{0\}$.`,
    'Bijectivité et borne de l’inverse.',
  ],
  solution: t`Pour $u\in D(A)$, $\langle Au,u\rangle$ est réel, donc $\operatorname{Im}\langle(A-\lambda)u,u\rangle=-b\|u\|^2$, et Cauchy–Schwarz donne $\|(A-\lambda)u\|\,\|u\|\ge|b|\,\|u\|^2$, soit $\|(A-\lambda)u\|\ge|b|\,\|u\|$.

**Injectivité, image fermée.** La minoration donne l'injectivité. Si $(A-\lambda)u_n\to f$, elle rend $(u_n)$ de Cauchy : $u_n\to u$, et comme $A$ est fermé (c'est un adjoint), $u\in D(A)$ et $(A-\lambda)u=f$.

**Image dense.** $\big(\operatorname{Im}(A-\lambda)\big)^\perp=\ker(A^*-\bar\lambda)=\ker(A-\bar\lambda)$, réduit à $\{0\}$ par la même minoration appliquée à $\bar\lambda$.

**Conclusion.** Fermée et dense, l'image est $H$ : $A-\lambda$ est bijectif, et $\|(A-\lambda)^{-1}f\|\le\frac1{|b|}\|f\|$.`,
  verification: { ...COMPLEMENT, notes: 'Étape préliminaire du théorème spectral, démontrée pour ProofLab ; le théorème complet reste admis.' },
};

export default demonstration;
