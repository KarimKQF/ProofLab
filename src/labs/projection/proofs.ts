/**
 * Preuves guidées du laboratoire A, une par famille de convexes (ℝ² et ℝ³). Chaque
 * propriété établie déverrouille un élément de la scène : on n'affiche jamais une
 * conclusion dont les hypothèses n'ont pas été démontrées.
 *
 * Les clés de déverrouillage sont propres à chaque famille (« disque:K-ferme ») :
 * démontrer la fermeture d'un demi-plan ne dit rien de celle d'un disque.
 */
import { t } from '@/content/authoring';
import type { ProofSpec, ProofNodeSpec, JustificationSpec, RuleSpec } from '@/content/schema';
import { analyzeGraph } from '@/core/proof-engine/engine';
import { familyKey, KIND_DIM, type ConvexKind } from '@/core/visual-reasoning/projection-scene';

export type FamilyId = ConvexKind;

export const FAMILY_IDS: FamilyId[] = ['demi-plan', 'rectangle', 'disque', 'sous-espace', 'boule', 'plan', 'droite-affine'];

/** Clés produites par la preuve d'une famille, dans l'ordre de la démonstration. */
export const FAMILY_STEP_KEYS = ['K-nonvide', 'K-ferme', 'K-convexe', 'projection-point', 'inegalite-caracteristique'] as const;

interface FamilyText {
  set: string;
  nonvide: string;
  ferme: string;
  convexe: string;
  /** Sous-espace affine : l'inégalité caractéristique devient une égalité. */
  ortho?: { node: string; just: string };
}

const TEXT: Record<FamilyId, FamilyText> = {
  'demi-plan': {
    set: t`$K=\{z\in\mathbb R^2 : \langle n,z\rangle\le c\}$, avec $n\ne 0$.`,
    nonvide: t`Le point $\dfrac{c}{\|n\|^2}\,n$ appartient à $K$.`,
    ferme: t`$K$ est l'image réciproque du fermé $]-\infty,c]$ par la forme linéaire continue $z\mapsto\langle n,z\rangle$.`,
    convexe: t`$\langle n,tu+(1-t)v\rangle=t\langle n,u\rangle+(1-t)\langle n,v\rangle\le c$ pour $t\in[0,1]$.`,
  },
  rectangle: {
    set: t`$K=[x_0,x_1]\times[y_0,y_1]$, avec $x_0\le x_1$ et $y_0\le y_1$.`,
    nonvide: t`Le point $(x_0,y_0)$ appartient à $K$.`,
    ferme: t`$K$ est un produit de deux intervalles fermés de $\mathbb R$.`,
    convexe: t`Chaque coordonnée reste dans son intervalle par combinaison convexe.`,
  },
  disque: {
    set: t`$K=\{z\in\mathbb R^2 : \|z-a\|\le r\}$, avec $r>0$.`,
    nonvide: t`Le centre $a$ appartient à $K$.`,
    ferme: t`$K$ est l'image réciproque du fermé $[0,r]$ par l'application continue $z\mapsto\|z-a\|$.`,
    convexe: t`Inégalité triangulaire : $\|tu+(1-t)v-a\|\le t\|u-a\|+(1-t)\|v-a\|\le r$.`,
  },
  'sous-espace': {
    set: t`$K=F=\mathbb R\,d$, droite vectorielle engendrée par $d\ne 0$.`,
    nonvide: t`Le vecteur nul appartient à $F$.`,
    ferme: t`$F$ est le noyau de la forme linéaire continue $z\mapsto\langle z,d^\perp\rangle$.`,
    convexe: t`Un sous-espace vectoriel est stable par combinaison linéaire.`,
    ortho: {
      node: t`$\langle x-P_Fx,z\rangle=0$ pour tout $z\in F$.`,
      just: t`Pour $z\in F$, les points $P_Fx\pm z$ appartiennent à $F$ : l'inégalité caractéristique s'applique dans les deux sens.`,
    },
  },
  boule: {
    set: t`$K=\{z\in\mathbb R^3 : \|z-a\|\le r\}$, avec $r>0$.`,
    nonvide: t`Le centre $a$ appartient à $K$.`,
    ferme: t`$K$ est l'image réciproque du fermé $[0,r]$ par l'application continue $z\mapsto\|z-a\|$.`,
    convexe: t`Inégalité triangulaire : $\|tu+(1-t)v-a\|\le t\|u-a\|+(1-t)\|v-a\|\le r$.`,
  },
  plan: {
    set: t`$K=\{z\in\mathbb R^3 : \langle n,z\rangle=c\}$, avec $n\ne 0$.`,
    nonvide: t`Le point $\dfrac{c}{\|n\|^2}\,n$ appartient à $K$.`,
    ferme: t`$K$ est l'image réciproque du fermé $\{c\}$ par la forme linéaire continue $z\mapsto\langle n,z\rangle$.`,
    convexe: t`$\langle n,tu+(1-t)v\rangle=tc+(1-t)c=c$ pour $u,v\in K$ et $t\in[0,1]$.`,
    ortho: {
      node: t`$\langle x-P_Kx,z-P_Kx\rangle=0$ pour tout $z\in K$.`,
      just: t`Pour $z\in K$, le point $2P_Kx-z$ appartient aussi à $K$ (car $\langle n,2P_Kx-z\rangle=2c-c=c$) : l'inégalité caractéristique s'applique à $z-P_Kx$ et à son opposé.`,
    },
  },
  'droite-affine': {
    set: t`$K=a+\mathbb R\,d=\{a+\tau d : \tau\in\mathbb R\}$, avec $d\ne 0$.`,
    nonvide: t`Le point $a$ appartient à $K$.`,
    ferme: t`$K$ est l'image réciproque du sous-espace $\mathbb R\,d$, fermé car de dimension finie, par l'application continue $z\mapsto z-a$.`,
    convexe: t`$t(a+\sigma d)+(1-t)(a+\tau d)=a+\big(t\sigma+(1-t)\tau\big)d$ appartient à $K$.`,
    ortho: {
      node: t`$\langle x-P_Kx,z-P_Kx\rangle=0$ pour tout $z\in K$.`,
      just: t`Pour $z\in K$, le point $2P_Kx-z$ appartient aussi à $K$ : l'inégalité caractéristique s'applique à $z-P_Kx$ et à son opposé.`,
    },
  },
};

export function familyProof(id: FamilyId): ProofSpec {
  const f = TEXT[id];
  const n = KIND_DIM[id];
  const R = n === 2 ? String.raw`\mathbb R^2` : String.raw`\mathbb R^3`;
  const key = (k: string) => familyKey(id, k);
  const ortho = f.ortho;

  const nodes: ProofNodeSpec[] = [
    { id: 'h-hilbert', kind: 'hypothese', text: `$${R}$, muni du produit scalaire euclidien, est un espace de Hilbert réel.` },
    { id: 'd-K', kind: 'definition', text: f.set },
    { id: 'nonvide', kind: 'consequence', text: t`$K\neq\emptyset$.`, unlocks: [key('K-nonvide')] },
    { id: 'ferme', kind: 'consequence', text: `$K$ est fermé dans $${R}$.`, unlocks: [key('K-ferme')] },
    { id: 'convexe', kind: 'consequence', text: t`$K$ est convexe.`, unlocks: [key('K-convexe')] },
    {
      id: 'thm',
      kind: 'application-theoreme',
      text: `Pour tout $x\\in ${R}$, il existe un unique point $P_Kx$ de $K$ qui minimise la distance à $x$.`,
      unlocks: [key('projection-point')],
    },
    { id: 'carac', kind: 'inegalite', text: t`$\langle x-P_Kx,z-P_Kx\rangle\le 0$ pour tout $z\in K$.`, unlocks: [key('inegalite-caracteristique')] },
    ...(ortho ? [{ id: 'ortho', kind: 'egalite' as const, text: ortho.node, unlocks: [key('orthogonalite')] }] : []),
    { id: 'fin', kind: 'conclusion', text: t`Le point $P_Kx$ existe, est unique, et est caractérisé par l'inégalité ci-dessus.`, unlocks: [key('preuve-complete')] },
    { id: 'x-strict', kind: 'inegalite', distractor: true, text: t`$\langle x-P_Kx,z-P_Kx\rangle<0$ pour tout $z\in K$.` },
    { id: 'x-unique-sans', kind: 'application-theoreme', distractor: true, text: `L'unicité du point à distance minimale vaut pour toute partie fermée non vide de $${R}$.` },
  ];

  const justifications: JustificationSpec[] = [
    { id: 'j-nonvide', label: f.nonvide },
    { id: 'j-ferme', label: f.ferme },
    { id: 'j-convexe', label: f.convexe },
    { id: 'j-thm', label: 'Théorème de projection sur un convexe fermé non vide.' },
    { id: 'j-carac', label: 'Caractérisation variationnelle de la projection.' },
    ...(ortho ? [{ id: 'j-ortho', label: ortho.just }] : []),
    { id: 'j-syn', label: 'Réunion des propriétés établies.' },
    { id: 'j-convexe-ferme', label: `Tout convexe de $${R}$ est fermé.` },
    { id: 'j-compact', label: 'Une fonction continue sur un compact atteint son minimum.' },
  ];

  const rules: RuleSpec[] = [
    { from: ['d-K'], to: 'nonvide', by: 'j-nonvide' },
    { from: ['d-K'], to: 'ferme', by: 'j-ferme' },
    { from: ['d-K'], to: 'convexe', by: 'j-convexe' },
    { from: ['h-hilbert', 'nonvide', 'ferme', 'convexe'], to: 'thm', by: 'j-thm' },
    { from: ['thm'], to: 'carac', by: 'j-carac' },
    ...(ortho ? [{ from: ['carac', 'd-K'], to: 'ortho', by: 'j-ortho' }] : []),
    { from: ['thm', 'carac', ...(ortho ? ['ortho'] : [])], to: 'fin', by: 'j-syn' },
  ];

  const open = n === 2 ? t`Disque unité ouvert et $x=(2,0)$` : t`Boule unité ouverte de $\mathbb R^3$ et $x=(2,0,0)$`;
  const sphere = n === 2 ? t`Cercle unité et $x=(0,0)$ : tous les points du cercle` : t`Sphère unité de $\mathbb R^3$ et $x=0$ : tous les points de la sphère`;

  return {
    purpose: 'application',
    goal: 'fin',
    nodes,
    justifications,
    rules,
    traps: [
      {
        conclusion: 'ferme',
        by: 'j-convexe-ferme',
        verdict: 'incorrect',
        concept: 'fermeture-espace',
        message: 'Un convexe n’est pas fermé en général : la convexité et la fermeture sont deux propriétés indépendantes.',
        counterexample: n === 2 ? t`Le disque unité ouvert de $\mathbb R^2$ est convexe et n'est pas fermé.` : t`La boule unité ouverte de $\mathbb R^3$ est convexe et n'est pas fermée.`,
      },
      {
        conclusion: 'thm',
        by: 'j-compact',
        verdict: 'a-justifier',
        concept: 'hypotheses-theoreme',
        message: t`Cet argument suppose $K$ compact, ce qui n'est pas requis et n'est pas vrai pour toutes les parties considérées. De plus, il ne donnerait pas l'unicité.`,
      },
      {
        conclusion: 'x-strict',
        verdict: 'incorrect',
        concept: 'inegalite-stricte-limite',
        message: t`L'inégalité n'est pas stricte en général : elle est une égalité pour $z=P_Kx$.`,
        counterexample: t`Prendre $z=P_Kx$ : le produit scalaire vaut $0$.`,
      },
      {
        conclusion: 'x-unique-sans',
        verdict: 'incorrect',
        concept: 'hypotheses-theoreme',
        message: 'L’unicité repose sur la convexité.',
        counterexample: `${sphere} sont à distance $1$ de $x$.`,
      },
    ],
    removable: [
      {
        hypothesis: 'ferme',
        label: 'Ne plus disposer de la fermeture',
        necessary: true,
        explanation: 'Le théorème ne peut plus être invoqué : l’infimum peut ne pas être atteint.',
        counterexample: `${open} : l'infimum de la distance vaut $1$ et n'est atteint en aucun point.`,
      },
      {
        hypothesis: 'convexe',
        label: 'Ne plus disposer de la convexité',
        necessary: true,
        explanation: 'L’unicité peut être perdue.',
        counterexample: `${sphere} réalisent la distance minimale $1$.`,
      },
    ],
  };
}

/** Clé du brouillon de preuve d'une famille (inchangée depuis la version 1). */
export const familyDraftKey = (lab: string, id: FamilyId) => `labo:${lab}:${id}`;

/**
 * Migration des sauvegardes de la version 1, où les clés n'étaient pas propres à une
 * famille : on recalcule, à partir du brouillon de chaque famille, les nœuds réellement
 * ancrés par le moteur de preuve. Rien n'est inventé : une famille sans brouillon ne
 * reçoit aucune clé. Renvoie les clés manquantes.
 */
export function migrateFamilyKeys(
  lab: string,
  drafts: Record<string, { graph: { placed: string[]; steps: Record<string, { premises: string[]; justification: string | null }> }; passedChecks: string[] } | undefined>,
  known: ReadonlySet<string>,
): string[] {
  const missing: string[] = [];
  for (const id of FAMILY_IDS) {
    const draft = drafts[familyDraftKey(lab, id)];
    if (!draft) continue;
    const analysis = analyzeGraph(familyProof(id), draft.graph, { allowedTheorems: null, passedChecks: new Set(draft.passedChecks) });
    for (const k of analysis.unlocks) if (!known.has(k)) missing.push(k);
  }
  return missing;
}
