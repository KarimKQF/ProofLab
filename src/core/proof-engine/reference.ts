/**
 * Démonstration de référence d'une preuve : la plus économe des dérivations du but par les
 * règles du contenu (le moins d'étapes possible), présentée dans l'ordre de lecture.
 *
 * Elle sert de « preuve modèle » à l'effacement progressif du laboratoire de démonstration
 * et de point de départ aux démonstrations fautives du mode « Trouver l'erreur ». Elle ne
 * contient que des règles du contenu : le moteur la valide telle quelle.
 */
import type { ProofSpec, RuleSpec } from '@/content/schema';
import { givens, isGiven, nodeMap, type NodeId } from './engine';

interface Best {
  rule: RuleSpec | null;
  set: Set<NodeId>;
  penalty: number;
  index: number;
}

/**
 * Règles de la démonstration de référence, dans un ordre où chaque prémisse précède son
 * usage (à égalité, l'ordre des propositions du contenu). `null` si le but n'est pas dérivable.
 * Entre deux dérivations de même longueur, le premier chemin déclaré (`paths`) l'emporte.
 */
export function referenceDerivation(
  spec: ProofSpec,
  removed?: ReadonlySet<NodeId>,
  /** Propositions à établir en plus du but (leur dérivation est ajoutée). */
  include: readonly NodeId[] = [],
): RuleSpec[] | null {
  const given = givens(spec, removed);
  const firstPath = spec.paths?.[0]?.id;
  const penaltyOf = (r: RuleSpec) => (r.path && r.path !== firstPath ? 1 : 0);
  const best = new Map<NodeId, Best>();
  for (const g of given) best.set(g, { rule: null, set: new Set(), penalty: 0, index: -1 });

  const better = (a: Best, b: Best | undefined) =>
    !b ||
    a.set.size < b.set.size ||
    (a.set.size === b.set.size && (a.penalty < b.penalty || (a.penalty === b.penalty && a.index < b.index)));

  let changed = true;
  while (changed) {
    changed = false;
    spec.rules.forEach((r, index) => {
      if (given.has(r.to) || removed?.has(r.to) || !r.from.every((p) => best.has(p))) return;
      const set = new Set<NodeId>([r.to]);
      let penalty = penaltyOf(r);
      for (const p of r.from) {
        const b = best.get(p)!;
        for (const x of b.set) set.add(x);
        penalty += b.penalty;
      }
      if (r.from.some((p) => best.get(p)!.set.has(r.to))) return; // jamais circulaire
      const candidate: Best = { rule: r, set, penalty, index };
      if (better(candidate, best.get(r.to))) {
        best.set(r.to, candidate);
        changed = true;
      }
    });
  }
  if (!best.has(spec.goal) || include.some((id) => !best.has(id))) return null;

  // Règles retenues : celles du but et, récursivement, de ses prémisses.
  const chosen = new Map<NodeId, RuleSpec>();
  const visit = (id: NodeId) => {
    const b = best.get(id);
    if (!b?.rule || chosen.has(id)) return;
    chosen.set(id, b.rule);
    for (const p of b.rule.from) visit(p);
  };
  visit(spec.goal);
  for (const id of include) visit(id);

  // Ordre de lecture : tri topologique, à égalité l'ordre des propositions dans le contenu.
  const position = new Map(spec.nodes.map((n, i) => [n.id, i]));
  const done = new Set<NodeId>(given);
  const out: RuleSpec[] = [];
  const pending = new Set(chosen.keys());
  while (pending.size) {
    const ready = [...pending].filter((id) => chosen.get(id)!.from.every((p) => done.has(p)));
    if (!ready.length) return null;
    ready.sort((a, b) => (a === spec.goal ? 1 : b === spec.goal ? -1 : (position.get(a) ?? 0) - (position.get(b) ?? 0)));
    const next = ready[0]!;
    out.push(chosen.get(next)!);
    done.add(next);
    pending.delete(next);
  }
  return out;
}

/** Hypothèses locales (« Soit… », « Supposons… ») qu'utilise une suite de règles, dans l'ordre du contenu. */
export function localsOf(spec: ProofSpec, rules: readonly RuleSpec[]): NodeId[] {
  const used = new Set(rules.flatMap((r) => r.from));
  return spec.nodes.filter((n) => isGiven(n) && n.local && used.has(n.id)).map((n) => n.id);
}

/** Calculs exacts présents dans une suite de règles (valeurs à considérer comme vérifiées). */
export function checksOf(spec: ProofSpec, rules: readonly RuleSpec[]): NodeId[] {
  const nodes = nodeMap(spec);
  return rules.filter((r) => nodes.get(r.to)?.check).map((r) => r.to);
}
