/**
 * Mode « Trouver l'erreur » : démonstrations fautives construites à partir du contenu.
 *
 * On part de la démonstration de référence d'un exercice (ou de sa variante), puis on y
 * introduit UNE erreur, tirée des données relues du contenu :
 * - justification invalide : une étape vraie, justifiée par un argument que le contenu
 *   déclare faux (piège « incorrect » sur cette étape) ;
 * - affirmation fausse : une proposition plausible mais fausse (distracteur du contenu),
 *   affirmée en cours de route ;
 * - hypothèse non vérifiée : une propriété nécessaire (retrait déclaré nécessaire) n'est
 *   jamais établie, et l'étape qui en a besoin s'en passe ;
 * - résultat indisponible : un résultat dont la démonstration repose sur ce que l'on
 *   cherche est invoqué (utilisation prématurée, circularité).
 *
 * Garantie, vérifiée par les tests : le moteur de preuve valide toutes les lignes, sauf
 * exactement les lignes désignées comme fautives.
 */
import type { Exercise, ProofSpec, RuleSpec } from '@/content/schema';
import { allowedTheorems, theoremLabel } from '@/content/catalog';
import { analyzeGraph, isGiven, nodeMap, type NodeId, type PlayerGraph } from '@/core/proof-engine/engine';
import { localsOf, referenceDerivation } from '@/core/proof-engine/reference';

export type FlawKind = 'affirmation-fausse' | 'justification-invalide' | 'hypothese-non-verifiee' | 'resultat-indisponible';

export const FLAW_LABEL: Record<FlawKind, string> = {
  'affirmation-fausse': 'Affirmation fausse',
  'justification-invalide': 'Justification invalide',
  'hypothese-non-verifiee': 'Hypothèse non vérifiée',
  'resultat-indisponible': 'Résultat indisponible (circularité)',
};

export const FLAW_HELP: Record<FlawKind, string> = {
  'affirmation-fausse': 'Ce que l’étape affirme est faux.',
  'justification-invalide': 'L’affirmation peut être vraie, mais ce qui est invoqué ne permet pas de la conclure.',
  'hypothese-non-verifiee': 'L’étape utilise une propriété qui n’a jamais été établie.',
  'resultat-indisponible': 'L’étape invoque un résultat qui dépend de ce que l’on cherche à démontrer.',
};

export const FLAW_KINDS: FlawKind[] = ['affirmation-fausse', 'justification-invalide', 'hypothese-non-verifiee', 'resultat-indisponible'];

export interface HuntLine {
  /** Hypothèse locale introduite (« Soit… ») ou étape. */
  intro: boolean;
  node: NodeId;
  premises: NodeId[];
  justification: string | null;
}

export interface HuntItem {
  id: string;
  exerciseId: string;
  theoremId: string;
  variant: boolean;
  statement: string;
  spec: ProofSpec;
  lines: HuntLine[];
  /** Indices des lignes fautives : la première est l'erreur à trouver, les suivantes en découlent directement. */
  faulty: number[];
  kind: FlawKind;
  concept: string;
  explanation: string;
  counterexample?: string;
  /** Ce qu'il fallait écrire : justification correcte, propriété à établir d'abord. */
  correction?: { justification?: string; missing?: NodeId };
}

const DEMO_THEOREM_SUFFIX = ' n’est pas disponible ici : sa démonstration repose sur ce que l’on cherche à établir, ou le résultat n’a pas encore été obtenu dans ce parcours.';

/** Lignes d'une démonstration : introductions des hypothèses locales, puis étapes. */
function linesOf(spec: ProofSpec, rules: readonly RuleSpec[]): HuntLine[] {
  const intros = localsOf(spec, rules).map((id) => ({ intro: true, node: id, premises: [], justification: null }));
  const steps = rules.map((r) => ({ intro: false, node: r.to, premises: [...r.from], justification: r.by }));
  return [...intros, ...steps];
}

interface SpecSource {
  exercise: Exercise;
  variant: boolean;
  spec: ProofSpec;
  statement: string;
}

function sourcesOf(e: Exercise): SpecSource[] {
  const out: SpecSource[] = [{ exercise: e, variant: false, spec: e.proof, statement: e.statement }];
  if (e.variant.proof) out.push({ exercise: e, variant: true, spec: e.variant.proof, statement: e.variant.statement });
  return out;
}

/** Toutes les démonstrations fautives qu'un exercice permet de construire. */
export function huntCandidates(e: Exercise): HuntItem[] {
  return sourcesOf(e).flatMap((src) => candidatesOf(src));
}

function candidatesOf({ exercise, variant, spec, statement }: SpecSource): HuntItem[] {
  const ref = referenceDerivation(spec);
  if (!ref) return [];
  const nodes = nodeMap(spec);
  const allowed = allowedTheorems(exercise.theoremId, spec.purpose, exercise.prerequisites);
  const base = {
    exerciseId: exercise.id,
    theoremId: exercise.theoremId,
    variant,
    statement,
    spec,
  };
  const idOf = (kind: string, anchor: string) => `${exercise.id}${variant ? '~variante' : ''}:${kind}:${anchor}`;
  const lines = linesOf(spec, ref);
  const lineOf = (id: NodeId) => lines.findIndex((l) => !l.intro && l.node === id);
  const out: HuntItem[] = [];

  // 1. Justification invalide : piège « incorrect » sur une étape de la démonstration.
  spec.traps.forEach((trap, i) => {
    if (trap.verdict !== 'incorrect' || !trap.by) return;
    const k = lineOf(trap.conclusion);
    if (k < 0) return;
    const theorem = spec.justifications.find((j) => j.id === trap.by)?.theorem;
    if (theorem && !allowed.has(theorem)) return; // traité comme résultat indisponible
    const flawed = lines.map((l) => ({ ...l, premises: [...l.premises] }));
    const line = flawed[k]!;
    const original = line.justification;
    line.justification = trap.by;
    for (const p of trap.premises ?? []) if (!line.premises.includes(p)) line.premises.push(p);
    if (line.premises.some((p) => !available(flawed, k, p, spec))) return;
    if (!faultyExactly(spec, flawed, allowed, [k])) return;
    out.push({
      ...base,
      id: idOf('justification', String(i)),
      lines: flawed,
      faulty: [k],
      kind: 'justification-invalide',
      concept: trap.concept,
      explanation: trap.message,
      counterexample: trap.counterexample,
      correction: original ? { justification: original } : undefined,
    });
  });

  // 2. Affirmation fausse : un distracteur affirmé après ce dont il paraît découler,
  //    et cité par la conclusion avec les autres étapes (rien ne la signale comme inutile).
  for (const d of spec.nodes.filter((n) => n.distractor)) {
    const traps = spec.traps.filter((t) => t.conclusion === d.id && t.verdict === 'incorrect');
    const trap = traps.find((t) => !t.by) ?? traps[0];
    if (!trap) continue;
    // Ancrage : ce dont l'affirmation paraît découler selon le contenu, sinon l'étape la plus ressemblante.
    let anchors = [...new Set([...(trap.premises ?? []), ...(d.after ?? [])])].filter((a) => nodes.has(a));
    if (!anchors.length) {
      const near = closestStep(spec, ref, d.text);
      if (!near) continue;
      anchors = [near];
    }
    // La démonstration contient les étapes d'ancrage, même hors du chemin le plus court.
    const derived = anchors.filter((a) => !isGiven(nodes.get(a)!));
    const rules = derived.every((a) => ref.some((r) => r.to === a)) ? ref : referenceDerivation(spec, undefined, derived);
    if (!rules) continue;
    const base2 = linesOf(spec, rules);
    const lineIn = (id: NodeId) => base2.findIndex((l) => l.node === id);
    if (anchors.some((a) => (nodes.get(a)!.local || !isGiven(nodes.get(a)!)) && lineIn(a) < 0)) continue;
    const after = Math.max(-1, ...anchors.map((a) => lineIn(a)));
    const goalLine = base2.findIndex((l) => !l.intro && l.node === spec.goal);
    const at = Math.min(Math.max(after + 1, firstStepIndex(base2)), goalLine);
    const flawed = base2.map((l) => ({ ...l, premises: [...l.premises] }));
    flawed.splice(at, 0, { intro: false, node: d.id, premises: [...new Set([...(trap.premises ?? []), ...anchors])], justification: trap.by ?? null });
    const conclusion = flawed[flawed.length - 1]!;
    conclusion.premises.push(d.id);
    if (!faultyExactly(spec, flawed, allowed, [at])) continue;
    out.push({
      ...base,
      id: idOf('affirmation', d.id),
      lines: flawed,
      faulty: [at],
      kind: 'affirmation-fausse',
      concept: trap.concept,
      explanation: trap.message,
      counterexample: trap.counterexample,
    });
  }

  // 3. Hypothèse non vérifiée : une propriété nécessaire n'est jamais établie.
  for (const rm of spec.removable) {
    const h = nodes.get(rm.hypothesis);
    if (!rm.necessary || !h || isGiven(h) || lineOf(rm.hypothesis) < 0) continue;
    const pruned = pruneWithout(spec, ref, rm.hypothesis);
    if (!pruned) continue;
    const flawed = linesOf(spec, pruned.rules);
    const faulty = flawed.map((l, i) => (pruned.users.has(l.node) && !l.intro ? i : -1)).filter((i) => i >= 0);
    if (!faulty.length || !faultyExactly(spec, flawed, allowed, faulty)) continue;
    out.push({
      ...base,
      id: idOf('hypothese', rm.hypothesis),
      lines: flawed,
      faulty,
      kind: 'hypothese-non-verifiee',
      concept: 'hypotheses-theoreme',
      explanation: `${rm.explanation}`,
      counterexample: rm.counterexample,
      correction: { missing: rm.hypothesis },
    });
  }

  // 4. Résultat indisponible : un théorème invoqué trop tôt (circularité).
  for (const j of spec.justifications) {
    if (!j.theorem || allowed.has(j.theorem)) continue;
    const trap = spec.traps.find((t) => t.by === j.id && t.verdict === 'incorrect' && lineOf(t.conclusion) >= 0);
    let target: NodeId | undefined = trap?.conclusion;
    if (!target) {
      if (j.theorem === exercise.theoremId) target = spec.goal;
      else {
        const theoremSteps = ref.filter((r) => spec.justifications.find((x) => x.id === r.by)?.theorem);
        target = (theoremSteps.find((r) => spec.justifications.find((x) => x.id === r.by)?.theorem === exercise.theoremId) ?? theoremSteps[theoremSteps.length - 1])?.to ?? spec.goal;
      }
    }
    const k = lineOf(target);
    if (k < 0) continue;
    const flawed = lines.map((l) => ({ ...l, premises: [...l.premises] }));
    const line = flawed[k]!;
    const original = line.justification;
    line.justification = j.id;
    for (const p of trap?.premises ?? []) if (!line.premises.includes(p)) line.premises.push(p);
    if (line.premises.some((p) => !available(flawed, k, p, spec))) continue;
    if (!faultyExactly(spec, flawed, allowed, [k])) continue;
    out.push({
      ...base,
      id: idOf('circularite', j.id),
      lines: flawed,
      faulty: [k],
      kind: 'resultat-indisponible',
      concept: trap?.concept ?? 'utilisation-prematuree',
      explanation: trap?.message ?? `${theoremLabel(j.theorem)}${DEMO_THEOREM_SUFFIX}`,
      counterexample: trap?.counterexample,
      correction: original ? { justification: original } : undefined,
    });
  }

  return out;
}

/** Indices des lignes que le moteur ne valide pas (verdict local de chaque étape). */
export function refusedLines(spec: ProofSpec, lines: readonly HuntLine[], allowed: ReadonlySet<string> | null): number[] {
  const graph: PlayerGraph = { placed: [], steps: {} };
  for (const l of lines) {
    if (l.intro) continue;
    graph.placed.push(l.node);
    graph.steps[l.node] = { premises: l.premises, justification: l.justification };
  }
  const passedChecks = new Set(spec.nodes.filter((n) => n.check).map((n) => n.id));
  const analysis = analyzeGraph(spec, graph, { allowedTheorems: allowed, passedChecks });
  return lines.map((l, i) => (!l.intro && analysis.verdicts[l.node]?.status !== 'valide' ? i : -1)).filter((i) => i >= 0);
}

function faultyExactly(spec: ProofSpec, lines: readonly HuntLine[], allowed: ReadonlySet<string>, expected: readonly number[]): boolean {
  const got = refusedLines(spec, lines, allowed);
  return got.length === expected.length && expected.every((i) => got.includes(i));
}

const tokens = (s: string) =>
  new Set((s.match(/\\[a-zA-Z]+|[A-Za-zÀ-ÿ]{3,}|[A-Za-z]|\d+|[<>=+\-*/^_()[\]|,]/g) ?? []).map((x) => x.toLowerCase()));

/**
 * Étape de la démonstration dont l'énoncé ressemble nettement à un texte (place d'une
 * affirmation fausse sans ancrage dans le contenu) ; rien si la ressemblance est faible.
 */
function closestStep(spec: ProofSpec, ref: readonly RuleSpec[], text: string): NodeId | undefined {
  const a = tokens(text);
  let best: { id: NodeId; s: number } | undefined;
  for (const r of ref) {
    if (r.to === spec.goal) continue;
    const b = tokens(spec.nodes.find((n) => n.id === r.to)?.text ?? '');
    let inter = 0;
    for (const x of a) if (b.has(x)) inter += 1;
    const s = inter / (a.size + b.size - inter || 1);
    if (!best || s > best.s) best = { id: r.to, s };
  }
  return best && best.s >= SIMILARITY_MIN ? best.id : undefined;
}

const SIMILARITY_MIN = 0.35;

function firstStepIndex(lines: HuntLine[]): number {
  const i = lines.findIndex((l) => !l.intro);
  return i < 0 ? lines.length : i;
}

/** Une prémisse citée à la ligne k doit être une donnée, une hypothèse locale introduite, ou une ligne antérieure. */
function available(lines: HuntLine[], k: number, p: NodeId, spec: ProofSpec): boolean {
  const n = spec.nodes.find((x) => x.id === p);
  if (!n) return false;
  if (isGiven(n) && !n.local) return true;
  return lines.slice(0, k).some((l) => l.node === p);
}

/**
 * Démonstration privée d'une propriété : les étapes qui ne servaient qu'à l'établir
 * disparaissent, et celles qui l'utilisaient la perdent de leurs prémisses.
 */
function pruneWithout(spec: ProofSpec, ref: RuleSpec[], hypothesis: NodeId): { rules: RuleSpec[]; users: Set<NodeId> } | null {
  const byTo = new Map(ref.map((r) => [r.to, r]));
  const users = new Set(ref.filter((r) => r.from.includes(hypothesis)).map((r) => r.to));
  const keep = new Set<NodeId>();
  const visit = (id: NodeId) => {
    if (keep.has(id) || id === hypothesis) return;
    const r = byTo.get(id);
    if (!r) return;
    keep.add(id);
    for (const p of r.from) visit(p);
  };
  visit(spec.goal);
  const rules = ref.filter((r) => keep.has(r.to)).map((r) => ({ ...r, from: r.from.filter((p) => p !== hypothesis) }));
  return rules.length ? { rules, users } : null;
}

/**
 * Sélection jouée : au plus une démonstration fautive de chaque nature par exercice
 * (et par variante), pour varier les erreurs sans répéter la même preuve.
 */
export function selectHuntItems(exercises: readonly Exercise[]): HuntItem[] {
  const out: HuntItem[] = [];
  for (const e of exercises) {
    for (const variant of [false, true]) {
      const all = huntCandidates(e).filter((c) => c.variant === variant);
      const seen = new Set<FlawKind>();
      for (const kind of FLAW_KINDS) {
        const c = all.find((x) => x.kind === kind);
        if (c && !seen.has(kind)) {
          seen.add(kind);
          out.push(c);
        }
      }
    }
  }
  return out;
}
