/**
 * Moteur de preuve : une preuve est un graphe de propositions et de dépendances.
 *
 * Chaque étape (S, P, J) affirme la conclusion S à partir des prémisses P par la
 * justification J. Le moteur ne connaît que des règles explicites, écrites dans le
 * contenu : « Validé » signifie toujours « établi par une règle explicitement
 * justifiée », jamais « semble correct ». Un lien que les règles ne couvrent pas
 * reste « À justifier » : il n'est ni validé, ni réfuté.
 */
import type { ProofSpec, ProofNodeSpec, RuleSpec, TrapSpec } from '@/content/schema';

export type NodeId = string;

export interface PlayerStep {
  premises: NodeId[];
  justification: string | null;
}

export interface PlayerGraph {
  /** Nœuds posés par le joueur, dans l'ordre où il les a posés. */
  placed: NodeId[];
  steps: Record<NodeId, PlayerStep>;
}

export const emptyGraph = (): PlayerGraph => ({ placed: [], steps: {} });

export interface EngineContext {
  /** Théorèmes disponibles ; null désactive le contrôle (bacs à sable). */
  allowedTheorems: ReadonlySet<string> | null;
  /** Hypothèses retirées par le joueur pour observer ce qui cesse d'être valable. */
  removedHypotheses?: ReadonlySet<NodeId>;
  /** Nœuds dont le calcul exact a été validé. */
  passedChecks?: ReadonlySet<NodeId>;
}

export type IncorrectReason = 'piege' | 'utilisation-prematuree';
export type PendingReason =
  | 'justification-manquante'
  | 'premisses-manquantes'
  | 'justification-insuffisante'
  | 'non-couvert'
  | 'calcul-manquant'
  | 'piege';

export type StepVerdict =
  | { status: 'donne' }
  | { status: 'retire' }
  | { status: 'valide'; rule: RuleSpec }
  | { status: 'a-justifier'; reason: PendingReason; message: string; missing?: NodeId[]; trap?: TrapSpec }
  | { status: 'incorrect'; reason: IncorrectReason; message: string; concept?: string; counterexample?: string };

export type NodeStatus =
  | 'hypothese' // donnée disponible
  | 'manquant' // hypothèse retirée
  | 'demontre' // étape valide, toutes ses prémisses sont établies
  | 'accessible' // posé, pas encore établi, mais une règle s'applique aux nœuds établis
  | 'a-justifier'
  | 'incorrect'
  | 'circulaire'
  | 'absent';

export interface GraphAnalysis {
  verdicts: Record<NodeId, StepVerdict>;
  status: Record<NodeId, NodeStatus>;
  grounded: ReadonlySet<NodeId>;
  cycles: NodeId[][];
  goalReached: boolean;
  unlocks: ReadonlySet<string>;
}

export function isGiven(node: ProofNodeSpec): boolean {
  return node.kind === 'hypothese' || node.kind === 'definition';
}

export function nodeMap(spec: ProofSpec): Map<NodeId, ProofNodeSpec> {
  return new Map(spec.nodes.map((n) => [n.id, n]));
}

/** Données disponibles dès le départ, hors hypothèses retirées. */
export function givens(spec: ProofSpec, removed?: ReadonlySet<NodeId>): Set<NodeId> {
  return new Set(spec.nodes.filter((n) => isGiven(n) && !removed?.has(n.id)).map((n) => n.id));
}

/** Plus petit point fixe des règles : tout ce qu'une preuve complète peut établir. */
export function derivableSet(
  spec: ProofSpec,
  removed?: ReadonlySet<NodeId>,
  passedChecks?: ReadonlySet<NodeId>,
): Set<NodeId> {
  const known = givens(spec, removed);
  const nodes = nodeMap(spec);
  let changed = true;
  while (changed) {
    changed = false;
    for (const rule of spec.rules) {
      if (known.has(rule.to)) continue;
      if (removed?.has(rule.to)) continue;
      const target = nodes.get(rule.to);
      if (target?.check && passedChecks && !passedChecks.has(rule.to)) continue;
      if (rule.from.every((p) => known.has(p))) {
        known.add(rule.to);
        changed = true;
      }
    }
  }
  return known;
}

function matchTrap(spec: ProofSpec, to: NodeId, premises: NodeId[], by: string | null): TrapSpec | undefined {
  const p = new Set(premises);
  return spec.traps.find(
    (t) => t.conclusion === to && (t.by === undefined || t.by === by) && (t.premises ?? []).every((x) => p.has(x)),
  );
}

const MSG = {
  noJustification:
    'Aucune justification n’est sélectionnée. Une assertion ne devient pas vraie parce qu’elle est énoncée : indique ce qui la fonde.',
  missingPremises: (n: number) =>
    `Cette justification peut fonder l’assertion, mais pas à partir des seules prémisses sélectionnées : ${n === 1 ? 'une prémisse manque' : `${n} prémisses manquent`}.`,
  insufficient:
    'Cette justification ne permet pas d’obtenir cette assertion à partir de ces prémisses. Vérifie ce qu’elle affirme exactement et sous quelles hypothèses.',
  notCovered:
    'Ce lien n’est pas couvert par les règles de cet exercice : il n’est ni validé, ni réfuté. Cherche une justification qui s’appuie explicitement sur les hypothèses disponibles.',
  checkMissing: 'Cette étape repose sur un calcul explicite : renseigne la valeur et fais-la vérifier.',
  premature: (name: string) =>
    `${name} n’est pas disponible à cet endroit : sa démonstration repose sur ce que tu cherches à établir, ou le résultat n’a pas encore été obtenu dans ce parcours.`,
  circular:
    'Raisonnement circulaire : cette assertion finit par dépendre d’elle-même. Elle ne peut pas être établie ainsi, même si chaque lien paraît acceptable pris isolément.',
};

/** Verdict d'une étape prise isolément (la validité globale dépend du graphe). */
export function evaluateStep(
  spec: ProofSpec,
  to: NodeId,
  step: PlayerStep | undefined,
  ctx: EngineContext,
  theoremName: (id: string) => string = (id) => id,
): StepVerdict {
  const node = nodeMap(spec).get(to);
  if (!node) throw new Error(`Nœud inconnu : ${to}`);
  if (isGiven(node)) {
    return ctx.removedHypotheses?.has(to) ? { status: 'retire' } : { status: 'donne' };
  }
  const premises = step?.premises ?? [];
  const by = step?.justification ?? null;

  // Un piège identifié prime : c'est une erreur réellement caractérisée.
  const trap = matchTrap(spec, to, premises, by);
  if (trap) {
    if (trap.verdict === 'incorrect') {
      return {
        status: 'incorrect',
        reason: 'piege',
        message: trap.message,
        concept: trap.concept,
        counterexample: trap.counterexample,
      };
    }
    return { status: 'a-justifier', reason: 'piege', message: trap.message, trap };
  }

  if (by === null) {
    return { status: 'a-justifier', reason: 'justification-manquante', message: MSG.noJustification };
  }

  const justification = spec.justifications.find((j) => j.id === by);
  if (!justification) throw new Error(`Justification inconnue : ${by}`);
  if (justification.theorem && ctx.allowedTheorems && !ctx.allowedTheorems.has(justification.theorem)) {
    return {
      status: 'incorrect',
      reason: 'utilisation-prematuree',
      message: MSG.premature(theoremName(justification.theorem)),
      concept: 'utilisation-prematuree',
    };
  }

  const candidates = spec.rules.filter((r) => r.to === to && r.by === by);
  if (candidates.length > 0) {
    const p = new Set(premises);
    const satisfied = candidates.find((r) => r.from.every((x) => p.has(x)));
    if (satisfied) {
      if (node.check && !ctx.passedChecks?.has(to)) {
        return { status: 'a-justifier', reason: 'calcul-manquant', message: MSG.checkMissing };
      }
      return { status: 'valide', rule: satisfied };
    }
    const fewestMissing = candidates
      .map((r) => r.from.filter((x) => !p.has(x)))
      .sort((a, b) => a.length - b.length)[0]!;
    return {
      status: 'a-justifier',
      reason: 'premisses-manquantes',
      message: MSG.missingPremises(fewestMissing.length),
      missing: fewestMissing,
    };
  }

  if (spec.rules.some((r) => r.to === to)) {
    return { status: 'a-justifier', reason: 'justification-insuffisante', message: MSG.insufficient };
  }
  return { status: 'a-justifier', reason: 'non-couvert', message: MSG.notCovered };
}

/** Détection des cycles dans les dépendances posées par le joueur. */
export function findCycles(graph: PlayerGraph): NodeId[][] {
  const cycles: NodeId[][] = [];
  const state = new Map<NodeId, 'visiting' | 'done'>();
  const stack: NodeId[] = [];

  const visit = (n: NodeId) => {
    const s = state.get(n);
    if (s === 'done') return;
    if (s === 'visiting') {
      cycles.push(stack.slice(stack.indexOf(n)));
      return;
    }
    state.set(n, 'visiting');
    stack.push(n);
    for (const p of graph.steps[n]?.premises ?? []) visit(p);
    stack.pop();
    state.set(n, 'done');
  };

  for (const n of graph.placed) visit(n);
  return cycles;
}

/** Analyse globale : verdicts locaux, cycles, ancrage dans les hypothèses. */
export function analyzeGraph(
  spec: ProofSpec,
  graph: PlayerGraph,
  ctx: EngineContext,
  theoremName?: (id: string) => string,
): GraphAnalysis {
  const nodes = nodeMap(spec);
  const verdicts: Record<NodeId, StepVerdict> = {};
  for (const n of spec.nodes) {
    if (isGiven(n) || graph.placed.includes(n.id)) {
      verdicts[n.id] = evaluateStep(spec, n.id, graph.steps[n.id], ctx, theoremName);
    }
  }

  const cycles = findCycles(graph);
  const inCycle = new Set(cycles.flat());

  // Ancrage : plus petit point fixe. Un nœud d'un cycle ne peut jamais être ancré.
  const grounded = givens(spec, ctx.removedHypotheses);
  let changed = true;
  while (changed) {
    changed = false;
    for (const id of graph.placed) {
      if (grounded.has(id) || inCycle.has(id) || ctx.removedHypotheses?.has(id)) continue;
      const v = verdicts[id];
      if (v?.status === 'valide' && v.rule.from.every((p) => grounded.has(p))) {
        grounded.add(id);
        changed = true;
      }
    }
  }

  const status: Record<NodeId, NodeStatus> = {};
  for (const n of spec.nodes) {
    const v = verdicts[n.id];
    if (ctx.removedHypotheses?.has(n.id)) status[n.id] = 'manquant';
    else if (isGiven(n)) status[n.id] = 'hypothese';
    else if (!graph.placed.includes(n.id)) status[n.id] = 'absent';
    else if (inCycle.has(n.id)) status[n.id] = 'circulaire';
    else if (grounded.has(n.id)) status[n.id] = 'demontre';
    else if (v?.status === 'incorrect') status[n.id] = 'incorrect';
    else if (spec.rules.some((r) => r.to === n.id && r.from.every((p) => grounded.has(p)))) {
      status[n.id] = 'accessible';
    } else status[n.id] = 'a-justifier';
  }

  const unlocks = new Set<string>();
  for (const id of grounded) for (const key of nodes.get(id)?.unlocks ?? []) unlocks.add(key);

  return { verdicts, status, grounded, cycles, goalReached: grounded.has(spec.goal), unlocks };
}

export const CIRCULAR_MESSAGE = MSG.circular;

/**
 * Propositions visibles dans la banque.
 * Mode guidé : une justification valide fait apparaître les étapes qu'elle rend accessibles.
 * Mode expert (et examen) : toutes les propositions sont visibles dès le départ.
 */
export function visibleNodes(spec: ProofSpec, analysis: GraphAnalysis, placed: NodeId[], guided: boolean): NodeId[] {
  return spec.nodes
    .filter((n) => {
      if (isGiven(n) || n.id === spec.goal || placed.includes(n.id) || !guided) return true;
      if (n.distractor) return (n.after ?? []).every((a) => analysis.grounded.has(a));
      return spec.rules.some((r) => r.to === n.id && r.from.every((p) => analysis.grounded.has(p)));
    })
    .map((n) => n.id);
}

export interface HypothesisRemovalReport {
  /** Le but reste-t-il atteignable, éventuellement par un autre chemin ? */
  goalStillDerivable: boolean;
  /** Propositions que plus aucune règle ne permet d'établir. */
  lost: NodeId[];
}

/** Ce qu'il advient de la preuve si une hypothèse est retirée. */
export function hypothesisRemovalReport(spec: ProofSpec, hypothesis: NodeId): HypothesisRemovalReport {
  const before = derivableSet(spec);
  const after = derivableSet(spec, new Set([hypothesis]));
  return {
    goalStillDerivable: after.has(spec.goal),
    lost: [...before].filter((n) => !after.has(n) && n !== hypothesis),
  };
}

export interface ProofScore {
  total: number;
  byCriterion: Record<string, number>;
  validated: boolean;
}

/**
 * Notation structurelle pour le mode examen, sur la grille imposée.
 * Chaque critère est calculé à partir du graphe, jamais à partir d'une rédaction.
 */
export function scoreGraph(
  spec: ProofSpec,
  graph: PlayerGraph,
  analysis: GraphAnalysis,
  rubric: { criterion: string; points: number }[],
): ProofScore {
  const steps = graph.placed.filter((id) => !isGiven(nodeMap(spec).get(id)!));
  const valid = steps.filter((id) => analysis.verdicts[id]?.status === 'valide');
  const justified = steps.filter((id) => graph.steps[id]?.justification);
  const groundedSteps = steps.filter((id) => analysis.grounded.has(id));

  // Hypothèses effectivement mobilisées par les étapes valides, rapportées à
  // celles qu'exige le chemin le plus économe pour atteindre le but.
  const given = givens(spec);
  const used = new Set(valid.flatMap((id) => graph.steps[id]?.premises ?? []).filter((p) => given.has(p)));
  const needed = minimalHypotheses(spec);
  const hypRatio = needed.size === 0 ? 1 : [...needed].filter((h) => used.has(h)).length / needed.size;

  const methodRatio = analysis.goalReached ? 1 : ratio(groundedSteps.length, longestPathLength(spec));

  const ratios: Record<string, number> = {
    Hypothèses: analysis.goalReached ? 1 : Math.min(hypRatio, 1),
    Méthode: Math.min(methodRatio, 1),
    'Validité des étapes': ratio(valid.length, steps.length),
    Justifications: ratio(justified.length, steps.length),
    Conclusion: analysis.goalReached ? 1 : 0,
  };

  const byCriterion: Record<string, number> = {};
  let total = 0;
  for (const { criterion, points } of rubric) {
    const value = Math.round((ratios[criterion] ?? 0) * points);
    byCriterion[criterion] = value;
    total += value;
  }
  return { total, byCriterion, validated: analysis.goalReached && analysis.cycles.length === 0 };
}

function ratio(a: number, b: number): number {
  return b === 0 ? 0 : a / b;
}

/** Hypothèses de la plus petite dérivation trouvée (nombre minimal de données mobilisées). */
function minimalHypotheses(spec: ProofSpec): Set<NodeId> {
  const given = givens(spec);
  const best = new Map<NodeId, Set<NodeId>>();
  for (const g of given) best.set(g, new Set([g]));
  let changed = true;
  while (changed) {
    changed = false;
    for (const r of spec.rules) {
      if (given.has(r.to) || !r.from.every((p) => best.has(p))) continue;
      const merged = new Set<NodeId>(r.from.flatMap((p) => [...best.get(p)!]));
      const current = best.get(r.to);
      if (!current || merged.size < current.size) {
        best.set(r.to, merged);
        changed = true;
      }
    }
  }
  return best.get(spec.goal) ?? new Set();
}

/** Nombre d'étapes du plus court chemin complet vers le but (référence de méthode). */
function longestPathLength(spec: ProofSpec): number {
  const given = givens(spec);
  const cost = new Map<NodeId, Set<NodeId>>();
  for (const g of given) cost.set(g, new Set());
  let changed = true;
  while (changed) {
    changed = false;
    for (const r of spec.rules) {
      if (given.has(r.to) || !r.from.every((p) => cost.has(p))) continue;
      const merged = new Set<NodeId>(r.from.flatMap((p) => [...cost.get(p)!]));
      merged.add(r.to);
      const current = cost.get(r.to);
      if (!current || merged.size < current.size) {
        cost.set(r.to, merged);
        changed = true;
      }
    }
  }
  return cost.get(spec.goal)?.size ?? 1;
}
