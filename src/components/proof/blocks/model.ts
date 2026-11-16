/**
 * Modèle des blocs de preuve. Une démonstration s'écrit comme une suite de blocs logiques :
 * introduire (« Soit… », « Supposons… »), implication (« si … alors … car … »), théorème,
 * calcul exact, contradiction, conclusion. Chaque bloc d'étape correspond exactement à une
 * étape (S, P, J) du moteur : le bloc ne change rien à ce qui est validé, il le rend lisible.
 */
import type { ProofNodeSpec, ProofSpec, RuleSpec } from '@/content/schema';
import { isGiven, type GraphAnalysis, type NodeId, type PlayerGraph } from '@/core/proof-engine/engine';
import { checksOf, localsOf, referenceDerivation } from '@/core/proof-engine/reference';

export type BlockKind = 'intro' | 'deduction' | 'theoreme' | 'calcul' | 'absurde' | 'conclusion';

export interface Block {
  key: string;
  kind: BlockKind;
  /** Bloc d'introduction : l'hypothèse locale ; bloc d'étape : l'affirmation visée. */
  node: NodeId | null;
  premises: NodeId[];
  justification: string | null;
  /**
   * Effacement progressif : bloc fourni par la preuve modèle. « tout » : bloc figé ;
   * « justification » : seule la justification est à retrouver.
   */
  lock?: 'tout' | 'justification';
  /** Effacement progressif : étape effacée de la preuve modèle, à reconstruire. */
  hole?: NodeId;
  /** Étape effacée : prémisses de la preuve modèle (jamais affichées, servent aux renvois). */
  holeUses?: NodeId[];
}

export interface BlockMeta {
  label: string;
  /** Connecteur affiché dans le bloc. */
  symbol: string;
  color: string;
  /** Ce que le bloc permet d'écrire. */
  help: string;
  /** Fiche du dictionnaire qui explique la démarche. */
  method?: string;
}

export const BLOCK_META: Record<BlockKind, BlockMeta> = {
  intro: {
    label: 'Soit… / Supposons…',
    symbol: '∀ / ⊢',
    color: 'var(--st-hyp)',
    help: 'Introduire un objet ou une hypothèse locale, valable jusqu’à la conclusion qu’elle sert à établir.',
    method: 'soit',
  },
  deduction: {
    label: 'Implication',
    symbol: '⟹',
    color: 'var(--st-proved)',
    help: 'Si les prémisses sont établies, alors l’affirmation l’est, car la justification choisie le garantit.',
    method: 'implication',
  },
  theoreme: {
    label: 'Appliquer un théorème',
    symbol: '⊢',
    color: 'var(--st-access)',
    help: 'Les prémisses vérifient les hypothèses d’un théorème ; sa conclusion donne l’affirmation.',
    method: 'appliquer-theoreme',
  },
  calcul: {
    label: 'Calcul exact',
    symbol: '=',
    color: 'var(--accent)',
    help: 'Une valeur à calculer exactement, puis à justifier comme une implication.',
  },
  absurde: {
    label: 'Contradiction',
    symbol: '⊥',
    color: 'var(--st-invalid)',
    help: 'Des faits établis sont incompatibles : l’hypothèse faite par l’absurde est intenable.',
    method: 'absurde',
  },
  conclusion: {
    label: 'Conclusion',
    symbol: '∎',
    color: 'var(--st-miss)',
    help: 'Le but de la démonstration, obtenu à partir des étapes établies.',
    method: 'implication',
  },
};

export const STEP_KINDS: BlockKind[] = ['deduction', 'theoreme', 'calcul', 'absurde', 'conclusion'];

export function nodeOf(spec: ProofSpec, id: NodeId): ProofNodeSpec | undefined {
  return spec.nodes.find((n) => n.id === id);
}

export function isLocal(spec: ProofSpec, id: NodeId): boolean {
  const n = nodeOf(spec, id);
  return Boolean(n && isGiven(n) && n.local);
}

/** Hypothèse locale ouvrant un raisonnement par l'absurde. */
export function isAbsurdIntro(node: ProofNodeSpec | undefined): boolean {
  return Boolean(node?.local && /par l['’]absurde/i.test(node.text));
}

/** Type de bloc naturel pour une affirmation (et sa justification, si elle est connue). */
export function inferKind(spec: ProofSpec, id: NodeId, justification?: string | null): BlockKind {
  const n = nodeOf(spec, id);
  if (!n) return 'deduction';
  if (id === spec.goal) return 'conclusion';
  if (n.kind === 'contradiction') return 'absurde';
  if (n.check) return 'calcul';
  const j = spec.justifications.find((x) => x.id === justification);
  if (n.kind === 'application-theoreme' || j?.theorem) return 'theoreme';
  return 'deduction';
}

let counter = 0;
export const newKey = (): string => `b${Date.now().toString(36)}${(counter++).toString(36)}`;

/** Reconstitue les blocs d'une preuve reprise (brouillon) : introductions puis étapes posées. */
export function blocksFromGraph(spec: ProofSpec, graph: PlayerGraph): Block[] {
  const steps: Block[] = graph.placed
    .filter((id) => {
      const n = nodeOf(spec, id);
      return n && !isGiven(n);
    })
    .map((id) => ({
      key: newKey(),
      kind: inferKind(spec, id, graph.steps[id]?.justification),
      node: id,
      premises: [...(graph.steps[id]?.premises ?? [])],
      justification: graph.steps[id]?.justification ?? null,
    }));
  const usedLocals = new Set(steps.flatMap((b) => b.premises).filter((p) => isLocal(spec, p)));
  const intros: Block[] = spec.nodes
    .filter((n) => usedLocals.has(n.id))
    .map((n) => ({ key: newKey(), kind: 'intro' as const, node: n.id, premises: [], justification: null }));
  return [...intros, ...steps];
}

export interface Candidates<T> {
  recommended: T[];
  others: T[];
}

/** Affirmations proposées pour un bloc : celles qui conviennent à son type d'abord. */
export function targetCandidates(
  spec: ProofSpec,
  kind: BlockKind,
  visible: ReadonlySet<NodeId>,
  taken: ReadonlySet<NodeId>,
): Candidates<ProofNodeSpec> {
  const pool = spec.nodes.filter((n) => !isGiven(n) && visible.has(n.id) && !taken.has(n.id));
  const fits = (n: ProofNodeSpec): boolean => {
    switch (kind) {
      case 'conclusion':
        return n.id === spec.goal;
      case 'absurde':
        return n.kind === 'contradiction';
      case 'calcul':
        return Boolean(n.check);
      case 'theoreme':
        return n.kind === 'application-theoreme';
      default:
        return n.id !== spec.goal && n.kind !== 'contradiction' && !n.check && n.kind !== 'application-theoreme';
    }
  };
  return { recommended: pool.filter(fits), others: pool.filter((n) => !fits(n)) };
}

/** Justifications proposées : théorèmes d'abord pour un bloc « théorème », le reste ensuite. */
export function justificationCandidates(spec: ProofSpec, kind: BlockKind): Candidates<ProofSpec['justifications'][number]> {
  const all = spec.justifications;
  if (kind === 'theoreme') return { recommended: all.filter((j) => j.theorem), others: all.filter((j) => !j.theorem) };
  if (kind === 'conclusion' || kind === 'absurde') {
    const rec = all.filter((j) => /absurde|contradiction|conclu/i.test(j.label));
    return { recommended: rec, others: all.filter((j) => !rec.includes(j)) };
  }
  return { recommended: all.filter((j) => !j.theorem), others: all.filter((j) => j.theorem) };
}

/** Faits utilisables comme prémisses : données, hypothèses locales introduites, étapes établies. */
export function availableFacts(spec: ProofSpec, analysis: GraphAnalysis, introduced: ReadonlySet<NodeId>, removed: ReadonlySet<NodeId>) {
  const givens = spec.nodes.filter((n) => isGiven(n) && !n.local && !removed.has(n.id));
  const locals = spec.nodes.filter((n) => isGiven(n) && n.local && introduced.has(n.id));
  const established = spec.nodes.filter((n) => !isGiven(n) && analysis.grounded.has(n.id));
  return { givens, locals, established };
}

export interface NextStep {
  node: NodeId;
  rule: RuleSpec;
  /** Hypothèses locales à introduire d'abord. */
  needsIntro: NodeId[];
}

/**
 * Coups de pouce « vers l'avant » : affirmations non encore établies qu'une règle permet
 * d'obtenir dès maintenant (ou après introduction d'une hypothèse locale).
 */
export function nextSteps(spec: ProofSpec, analysis: GraphAnalysis, introduced: ReadonlySet<NodeId>): NextStep[] {
  const out: NextStep[] = [];
  const seen = new Set<NodeId>();
  for (const rule of spec.rules) {
    if (analysis.grounded.has(rule.to) || seen.has(rule.to)) continue;
    const target = nodeOf(spec, rule.to);
    if (!target || target.distractor) continue;
    const ok = rule.from.every((p) => analysis.grounded.has(p));
    if (!ok) continue;
    const needsIntro = rule.from.filter((p) => isLocal(spec, p) && !introduced.has(p));
    seen.add(rule.to);
    out.push({ node: rule.to, rule, needsIntro });
  }
  // Les étapes qui ne demandent aucune introduction d'abord, puis le but en dernier.
  return out.sort((a, b) => a.needsIntro.length - b.needsIntro.length || Number(a.node === spec.goal) - Number(b.node === spec.goal));
}

export interface BackStep {
  node: NodeId;
  rule: RuleSpec;
  missing: NodeId[];
}

/**
 * Analyse « à rebours » : pour obtenir `target`, la règle qui demande le moins de prémisses
 * encore non établies (raisonnement « il suffit de montrer »).
 */
export function backwardStep(spec: ProofSpec, analysis: GraphAnalysis, target: NodeId): BackStep | null {
  const rules = spec.rules.filter((r) => r.to === target);
  if (!rules.length) return null;
  const scored = rules.map((rule) => ({ rule, missing: rule.from.filter((p) => !analysis.grounded.has(p)) }));
  scored.sort((a, b) => a.missing.length - b.missing.length || a.rule.from.length - b.rule.from.length);
  const best = scored[0]!;
  return { node: target, rule: best.rule, missing: best.missing };
}

/**
 * Phrase rédigée d'un bloc validé, pour la lecture de la démonstration. Les prémisses sont
 * citées par leur repère, comme dans une preuve écrite : « D'après (3) et H2, … ».
 */
export function blockSentence(spec: ProofSpec, block: Block, text: (id: NodeId) => string, ref: (id: NodeId) => string): string {
  if (!block.node) return '';
  const target = text(block.node);
  const just = spec.justifications.find((j) => j.id === block.justification)?.label;
  const refs = block.premises.map(ref);
  const list = refs.length <= 1 ? refs.join('') : `${refs.slice(0, -1).join(', ')} et ${refs[refs.length - 1]}`;
  const car = just ? ` (${lowerFirst(just.replace(/\.$/, ''))})` : '';
  switch (block.kind) {
    case 'intro':
      return target;
    case 'theoreme':
      return `${list ? `Les hypothèses étant vérifiées par ${list}` : 'Les hypothèses étant vérifiées'}${car} : ${target}`;
    case 'calcul':
      return `${list ? `À partir de ${list}` : 'Par le calcul'}${car} : ${target}`;
    case 'absurde':
      return `${list ? `${list} sont incompatibles` : 'Contradiction'}${car} : ${target}`;
    case 'conclusion':
      return `Donc${list ? `, d'après ${list}` : ''}${car} : ${target} ∎`;
    default:
      return `${list ? `D'après ${list}` : 'Directement'}${car} : ${target}`;
  }
}

const LOWERABLE = /^(Théorème|Lemme|Inégalité|Formule|Identité|Critère|Principe|Propriété|Raisonnement|Définition|Linéarité|Continuité|Hypothèse|Négation|Passage|Calcul|Sur|Une|Un|La|Le|Les)(?!\p{L})/u;

/** Minuscule initiale pour une justification insérée en milieu de phrase. */
function lowerFirst(s: string): string {
  return LOWERABLE.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s;
}

/* ───────────────────────── Effacement progressif ───────────────────────── */

/**
 * Étapes de l'effacement progressif (laboratoire de démonstration) : on lit la preuve
 * modèle, puis on retrouve ses justifications, puis on reconstruit les étapes effacées,
 * enfin on écrit la démonstration sur une page blanche.
 */
export const FADING_LEVELS = ['lire', 'justifier', 'completer', 'blanche'] as const;
export type FadingLevel = (typeof FADING_LEVELS)[number];

export const FADING_META: Record<FadingLevel, { label: string; help: string }> = {
  lire: {
    label: 'Lire la preuve modèle',
    help: 'La démonstration complète, bloc par bloc et rédigée. Repère pour chaque bloc ce qu’il utilise et ce qui le justifie.',
  },
  justifier: {
    label: 'Retrouver les justifications',
    help: 'Les affirmations et leurs prémisses sont en place ; la justification de chaque bloc a été effacée. Choisis-la, puis vérifie le bloc.',
  },
  completer: {
    label: 'Reconstruire les étapes effacées',
    help: 'Environ une étape sur deux a été effacée, en partant de la fin. Pour chaque trou, choisis l’affirmation, ses prémisses et sa justification.',
  },
  blanche: {
    label: 'Page blanche',
    help: 'Plus rien n’est donné : écris toute la démonstration, avec le guide si besoin.',
  },
};

export interface FadingSeed {
  blocks: Block[];
  graph: PlayerGraph;
  passedChecks: NodeId[];
  /** Affirmations effacées : leur texte reste masqué tant qu'elles ne sont pas établies. */
  masked: NodeId[];
}

/** Étapes effacées : une sur deux en partant de la fin, la conclusion restant en place. */
export function fadedSteps(stepNodes: readonly NodeId[], goal: NodeId): NodeId[] {
  const candidates = stepNodes.filter((id) => id !== goal);
  const out: NodeId[] = [];
  for (let i = candidates.length - 1; i >= 0; i -= 2) out.push(candidates[i]!);
  return out;
}

/** Point de départ d'une étape de l'effacement progressif, à partir de la preuve modèle. */
export function fadingSeed(spec: ProofSpec, level: Exclude<FadingLevel, 'blanche'>): FadingSeed | null {
  const rules = referenceDerivation(spec);
  if (!rules) return null;
  const intros: Block[] = localsOf(spec, rules).map((id) => ({ key: newKey(), kind: 'intro', node: id, premises: [], justification: null, lock: 'tout' }));
  const faded = new Set(level === 'completer' ? fadedSteps(rules.map((r) => r.to), spec.goal) : []);
  const steps: Block[] = rules.map((r) =>
    faded.has(r.to)
      ? { key: newKey(), kind: inferKind(spec, r.to, r.by), node: null, premises: [], justification: null, hole: r.to, holeUses: [...r.from] }
      : {
          key: newKey(),
          kind: inferKind(spec, r.to, r.by),
          node: r.to,
          premises: [...r.from],
          justification: level === 'justifier' ? null : r.by,
          lock: level === 'justifier' ? 'justification' : 'tout',
        },
  );
  const graph: PlayerGraph = { placed: [], steps: {} };
  for (const b of steps) {
    if (!b.node) continue;
    graph.placed.push(b.node);
    graph.steps[b.node] = { premises: [...b.premises], justification: b.justification };
  }
  const kept = rules.filter((r) => !faded.has(r.to));
  return { blocks: [...intros, ...steps], graph, passedChecks: checksOf(spec, kept), masked: [...faded] };
}
