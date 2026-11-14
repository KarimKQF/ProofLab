/**
 * Lien entre les étapes d'une démonstration et les états visuels.
 *
 * Source unique de vérité : une étape est « établie » si et seulement si le moteur de
 * preuve a ancré le nœud correspondant (sa clé de déverrouillage, produite par
 * `analyzeGraph`, figure dans la sauvegarde). Le lecteur d'animation ne fait que
 * parcourir ces étapes ; il ne valide rien et n'écrit jamais dans la progression.
 */
import type { ProofSpec } from '@/content/schema';
import { derivableSet, isGiven } from '@/core/proof-engine/engine';

export interface VisualStage {
  /** Identifiant du nœud de preuve qui justifie l'étape (ou de la donnée pour une hypothèse). */
  nodeId: string;
  /** Clé de déverrouillage du nœud ; null pour une hypothèse, disponible d'emblée. */
  key: string | null;
  title: string;
  /** Ce que l'étape fait apparaître sur la figure. */
  visual: string;
}

export type StageStatus = 'hypothese' | 'etablie' | 'illustration';

export interface StageView extends VisualStage {
  status: StageStatus;
}

export function stageStatuses(stages: readonly VisualStage[], keys: { has(k: string): boolean }): StageView[] {
  return stages.map((s) => ({ ...s, status: s.key === null ? 'hypothese' : keys.has(s.key) ? 'etablie' : 'illustration' }));
}

/** Mode preuve : on ne peut avancer que sur des étapes établies (les hypothèses sont données). */
export function lastReachable(views: readonly StageView[]): number {
  let i = -1;
  for (const v of views) {
    if (v.status === 'illustration') break;
    i += 1;
  }
  return i;
}

export const STAGE_NOTICE: Record<StageStatus, string> = {
  hypothese: 'Hypothèse du théorème : supposée, et satisfaite dans l’exemple affiché.',
  etablie: 'Étape établie dans ta démonstration.',
  illustration: 'Illustration disponible — preuve non encore établie.',
};

/**
 * Contrôle de cohérence d'un scénario : chaque étape doit pointer un nœud existant,
 * chaque clé doit être produite par ce nœud, et chaque nœud non donné doit être
 * dérivable dans la preuve. Renvoie la liste des anomalies (vide si tout est cohérent).
 */
export function checkScenario(spec: ProofSpec, stages: readonly VisualStage[]): string[] {
  const issues: string[] = [];
  const nodes = new Map(spec.nodes.map((n) => [n.id, n]));
  const derivable = derivableSet(spec);
  for (const s of stages) {
    const node = nodes.get(s.nodeId);
    if (!node) {
      issues.push(`Étape « ${s.title} » : nœud inconnu ${s.nodeId}.`);
      continue;
    }
    if (isGiven(node)) {
      if (s.key !== null) issues.push(`Étape « ${s.title} » : une hypothèse ne porte pas de clé.`);
      continue;
    }
    if (!s.key || !(node.unlocks ?? []).includes(s.key)) issues.push(`Étape « ${s.title} » : la clé ${s.key} n'est pas produite par ${s.nodeId}.`);
    if (!derivable.has(s.nodeId)) issues.push(`Étape « ${s.title} » : ${s.nodeId} n'est pas dérivable.`);
  }
  return issues;
}
