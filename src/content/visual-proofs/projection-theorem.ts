/**
 * Démonstration du théorème de projection (polycopié, section 1.1, p. PDF 5), découpée en
 * étapes associées à des états visuels. Le graphe se joue dans le moteur de preuve ;
 * chaque nœud établi produit une clé qui débloque l'étape correspondante de l'animation.
 */
import { t } from '@/content/authoring';
import type { ProofSpec } from '@/content/schema';
import type { VisualStage } from '@/core/visual-reasoning/proof-stages';

export const PROJECTION_THEOREM_LAB = 'projection-theoreme';

export const projectionTheoremProof: ProofSpec = {
  purpose: 'demonstration',
  goal: 'fin',
  paths: [
    { id: 'parallelogramme', label: 'Unicité par l’identité du parallélogramme' },
    { id: 'caracterisation', label: 'Unicité par l’inégalité caractéristique' },
  ],
  nodes: [
    { id: 'h-hilbert', kind: 'hypothese', text: t`$H$ est un espace de Hilbert réel : il est complet.` },
    { id: 'h-K', kind: 'hypothese', text: t`$K\subset H$ est non vide ; $x\in H$ et $d=\inf_{z\in K}\|x-z\|$.` },
    { id: 'h-convexe', kind: 'hypothese', text: t`$K$ est convexe.` },
    { id: 'h-ferme', kind: 'hypothese', text: t`$K$ est fermé dans $H$.` },

    { id: 'suite', kind: 'consequence', text: t`Il existe une suite $(p_n)\subset K$ telle que $\|x-p_n\|\to d$.`, unlocks: ['vp-suite'] },
    {
      id: 'cauchy',
      kind: 'inegalite',
      text: t`$\|p_n-p_m\|^2\le 2\|x-p_n\|^2+2\|x-p_m\|^2-4d^2$, donc $(p_n)$ est de Cauchy.`,
      unlocks: ['vp-cauchy'],
    },
    { id: 'limite', kind: 'consequence', text: t`$p_n\to p$ dans $H$, avec $p\in K$.`, unlocks: ['vp-limite'] },
    { id: 'minimiseur', kind: 'egalite', text: t`$\|x-p\|=d$ : le point $p$ réalise la distance minimale.`, unlocks: ['vp-minimiseur'] },
    { id: 'unicite', kind: 'consequence', text: t`Si $q\in K$ vérifie aussi $\|x-q\|=d$, alors $q=p$.`, unlocks: ['vp-unicite'] },
    { id: 'carac', kind: 'inegalite', text: t`$\langle x-p,z-p\rangle\le 0$ pour tout $z\in K$.`, unlocks: ['vp-carac'] },
    { id: 'fin', kind: 'conclusion', text: t`Il existe un unique $P_Kx\in K$ réalisant $d$, caractérisé par l'inégalité ci-dessus.`, unlocks: ['vp-fin'] },

    { id: 'x-compact', kind: 'consequence', distractor: true, text: t`$K$ étant fermé, la suite $(p_n)$ admet une sous-suite convergente.` },
    { id: 'x-strict', kind: 'inegalite', distractor: true, after: ['minimiseur'], text: t`$\langle x-p,z-p\rangle<0$ pour tout $z\in K$.` },
  ],
  justifications: [
    { id: 'j-inf', label: 'Définition de la borne inférieure d’une partie non vide de $\\mathbb R$.' },
    {
      id: 'j-para',
      label: t`Identité du parallélogramme, et $(p_n+p_m)/2\in K$ par convexité, donc $\|x-(p_n+p_m)/2\|\ge d$.`,
      theorem: 'parallelogramme',
    },
    { id: 'j-complet', label: t`Une suite de Cauchy converge dans $H$ complet, et sa limite reste dans $K$ fermé.` },
    { id: 'j-cont', label: 'Continuité de la norme.' },
    {
      id: 'j-unicite-para',
      label: t`Le milieu $m=(p+q)/2\in K$ vérifie $\|x-m\|^2=d^2-\tfrac14\|p-q\|^2$ (parallélogramme), et $\|x-m\|\ge d$.`,
      theorem: 'parallelogramme',
    },
    { id: 'j-derivee', label: t`$t\mapsto\|x-p-t(z-p)\|^2$ est minimale en $t=0$ sur $[0,1]$ ($p+t(z-p)\in K$ par convexité) : sa dérivée à droite y est $\ge 0$.` },
    { id: 'j-unicite-carac', label: t`Appliquer l'inégalité à $(p,q)$ puis à $(q,p)$, et additionner : $\|p-q\|^2\le 0$.` },
    { id: 'j-syn', label: 'Réunion de l’existence, de l’unicité et de la caractérisation.' },
    { id: 'j-ferme-compact', label: 'Une partie fermée est compacte.' },
    { id: 'j-minimisante', label: 'Une suite minimisante converge toujours.' },
  ],
  rules: [
    { from: ['h-K'], to: 'suite', by: 'j-inf' },
    { from: ['suite', 'h-convexe'], to: 'cauchy', by: 'j-para' },
    { from: ['cauchy', 'h-hilbert', 'h-ferme'], to: 'limite', by: 'j-complet' },
    { from: ['limite', 'suite'], to: 'minimiseur', by: 'j-cont' },
    { from: ['minimiseur', 'h-convexe'], to: 'unicite', by: 'j-unicite-para', path: 'parallelogramme' },
    { from: ['minimiseur', 'h-convexe'], to: 'carac', by: 'j-derivee' },
    { from: ['carac'], to: 'unicite', by: 'j-unicite-carac', path: 'caracterisation' },
    { from: ['minimiseur', 'unicite', 'carac'], to: 'fin', by: 'j-syn' },
  ],
  traps: [
    {
      conclusion: 'x-compact',
      verdict: 'incorrect',
      concept: 'bornee-non-convergente',
      message: 'En dimension infinie, fermé et borné ne veut pas dire compact : c’est la complétude, avec l’estimation de Cauchy, qui donne la convergence.',
      counterexample: t`Dans $\ell^2$, la boule unité fermée contient $(e_n)$, avec $\|e_n-e_m\|=\sqrt2$ pour $n\neq m$ : aucune sous-suite ne converge.`,
    },
    {
      conclusion: 'limite',
      by: 'j-minimisante',
      verdict: 'incorrect',
      concept: 'hypotheses-theoreme',
      message: 'Une suite minimisante ne converge pas en général : c’est la convexité qui la rend de Cauchy.',
      counterexample: t`Sur le cercle unité de $\mathbb R^2$ et pour $x=0$, la suite $p_n=((-1)^n,0)$ est minimisante et ne converge pas.`,
    },
    {
      conclusion: 'limite',
      by: 'j-ferme-compact',
      verdict: 'incorrect',
      concept: 'bornee-non-convergente',
      message: 'Cette justification est fausse : une partie fermée n’est pas compacte en général.',
      counterexample: t`$K=\mathbb R^2$ est fermé et non compact.`,
    },
    {
      conclusion: 'x-strict',
      verdict: 'incorrect',
      concept: 'inegalite-stricte-limite',
      message: 'L’inégalité est une égalité pour z = p.',
      counterexample: t`$z=p$ donne $\langle x-p,z-p\rangle=0$.`,
    },
  ],
  removable: [
    {
      hypothesis: 'h-convexe',
      label: 'Retirer la convexité',
      necessary: true,
      explanation: 'Sans convexité, le milieu de deux points de K peut sortir de K : l’estimation de Cauchy et l’unicité tombent.',
      counterexample: t`Cercle unité, $x=0$ : tous les points du cercle réalisent la distance $1$.`,
    },
    {
      hypothesis: 'h-ferme',
      label: 'Retirer la fermeture',
      necessary: true,
      explanation: 'La limite de la suite minimisante peut sortir de K.',
      counterexample: t`Disque unité ouvert, $x=(2,0)$ : l'infimum $1$ n'est atteint en aucun point.`,
    },
    {
      hypothesis: 'h-hilbert',
      label: 'Retirer la complétude',
      necessary: true,
      explanation: 'Une suite de Cauchy peut ne pas converger.',
      counterexample: t`Dans $C([-1,1])$ muni du produit scalaire de $L^2$, l'hyperplan fermé $\{u:\int_0^1u=0\}$ n'a pas de point à distance minimale de la fonction $1$.`,
    },
  ],
};

/** Les huit étapes de l'animation, dans l'ordre de la démonstration. */
export const PROJECTION_THEOREM_STAGES: VisualStage[] = [
  { nodeId: 'h-K', key: null, title: 'L’ensemble est défini', visual: 'K, le point x et la distance d.' },
  { nodeId: 'h-convexe', key: null, title: 'Convexité', visual: 'Un segment entre deux points de K reste dans K.' },
  { nodeId: 'h-ferme', key: null, title: 'Fermeture', visual: 'Une suite de K converge vers un point du bord, qui appartient à K.' },
  { nodeId: 'suite', key: 'vp-suite', title: 'Suite minimisante', visual: 'Les points p₁, p₂, … de K, dont la distance à x tend vers d.' },
  { nodeId: 'cauchy', key: 'vp-cauchy', title: 'Convergence', visual: 'Les milieux des pₙ restent dans K ; l’identité du parallélogramme rend la suite de Cauchy.' },
  { nodeId: 'minimiseur', key: 'vp-minimiseur', title: 'Le minimiseur apparaît', visual: 'La limite p, et la boule de rayon d centrée en x, tangente à K.' },
  { nodeId: 'unicite', key: 'vp-unicite', title: 'Unicité', visual: 'Un second minimiseur q obligerait le milieu de [p, q] à être strictement plus proche.' },
  { nodeId: 'carac', key: 'vp-carac', title: 'Inégalité caractéristique', visual: 'Les vecteurs x − p et z − p font un angle obtus pour tout z de K.' },
];
