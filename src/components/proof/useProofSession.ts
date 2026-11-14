/**
 * État d'une preuve en cours : graphe posé par le joueur, étapes validées,
 * expériences de retrait d'hypothèse. La logique de vérification reste dans le moteur.
 *
 * Règle de progression : une réussite n'est signalée (`onGoalReached`) qu'au moment
 * où une vérification explicite du joueur fait atteindre le but, une seule fois par
 * tentative. Rouvrir une preuve déjà validée, retirer puis rétablir une hypothèse,
 * ou piloter une visualisation ne produit jamais de réussite supplémentaire.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ProofSpec } from '@/content/schema';
import {
  analyzeGraph,
  CIRCULAR_MESSAGE,
  emptyGraph,
  isGiven,
  nodeMap,
  type GraphAnalysis,
  type NodeId,
  type PlayerGraph,
  type StepVerdict,
} from '@/core/proof-engine/engine';
import { theoremLabel } from '@/content/catalog';
import { useGame } from '@/storage/store';

export interface Feedback {
  node: NodeId;
  verdict: StepVerdict | { status: 'circulaire'; message: string };
}

export interface AttemptStats {
  refused: number;
  validSteps: number;
}

export interface ProofSessionOptions {
  spec: ProofSpec;
  allowed: ReadonlySet<string> | null;
  /** Identifiant pour reprendre la preuve plus tard ; null pour ne rien conserver. */
  draftKey: string | null;
  /** Identifiant d'exercice auquel rattacher les erreurs conceptuelles. */
  errorKey: string | null;
  onUnlocks?: (keys: string[]) => void;
  /** Appelé une seule fois par tentative, lorsqu'une vérification du joueur atteint le but. */
  onGoalReached?: (stats: AttemptStats) => void;
}

function countValid(spec: ProofSpec, graph: PlayerGraph, analysis: GraphAnalysis): number {
  return graph.placed.filter((id) => analysis.verdicts[id]?.status === 'valide' && !isGiven(nodeMap(spec).get(id)!)).length;
}

export function useProofSession({ spec, allowed, draftKey, errorKey, onUnlocks, onGoalReached }: ProofSessionOptions) {
  const draft = useGame((s) => (draftKey ? s.save.drafts[draftKey] : undefined));
  const setDraft = useGame((s) => s.setDraft);
  const recordConceptError = useGame((s) => s.recordConceptError);
  const now = useGame((s) => s.now);

  const [graph, setGraph] = useState<PlayerGraph>(() =>
    draft ? { placed: [...draft.graph.placed], steps: { ...draft.graph.steps } } : emptyGraph(),
  );
  const [passedChecks, setPassedChecks] = useState<Set<NodeId>>(() => new Set(draft?.passedChecks ?? []));
  const [refused, setRefused] = useState(draft?.refused ?? 0);
  const [hints, setHints] = useState(draft?.hints ?? 0);
  const [removed, setRemoved] = useState<Set<NodeId>>(new Set());
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const analysis: GraphAnalysis = useMemo(
    () => analyzeGraph(spec, graph, { allowedTheorems: allowed, removedHypotheses: removed, passedChecks }, theoremLabel),
    [spec, graph, allowed, removed, passedChecks],
  );

  // Une preuve rouverte déjà complète appartient à une tentative déjà comptée.
  const attemptCounted = useRef<boolean>(
    analyzeGraph(spec, graph, { allowedTheorems: allowed, passedChecks }, theoremLabel).goalReached,
  );
  const alreadySolvedAtOpen = useRef(attemptCounted.current).current;

  // Sauvegarde automatique pour reprendre la partie, indices compris.
  useEffect(() => {
    if (!draftKey) return;
    if (graph.placed.length === 0 && passedChecks.size === 0 && hints === 0 && refused === 0) return;
    const previous = useGame.getState().save.drafts[draftKey];
    setDraft(draftKey, {
      ...previous,
      graph,
      passedChecks: [...passedChecks],
      hints,
      refused,
      updatedAt: now(),
    });
  }, [draftKey, graph, passedChecks, refused, hints, now, setDraft]);

  useEffect(() => {
    if (onUnlocks && analysis.unlocks.size > 0) onUnlocks([...analysis.unlocks]);
  }, [analysis.unlocks, onUnlocks]);

  const place = useCallback((id: NodeId) => {
    setGraph((g) => (g.placed.includes(id) ? g : { ...g, placed: [...g.placed, id] }));
  }, []);

  const removeNode = useCallback((id: NodeId) => {
    setGraph((g) => {
      const steps: PlayerGraph['steps'] = {};
      for (const [k, v] of Object.entries(g.steps)) {
        if (k === id) continue;
        steps[k] = { ...v, premises: v.premises.filter((p) => p !== id) };
      }
      return { placed: g.placed.filter((x) => x !== id), steps };
    });
    setFeedback(null);
  }, []);

  /** Soumet une étape à la vérification : seul point d'entrée d'une réussite. */
  const verify = useCallback(
    (id: NodeId, premises: NodeId[], justification: string | null) => {
      const nextGraph: PlayerGraph = {
        placed: graph.placed.includes(id) ? graph.placed : [...graph.placed, id],
        steps: { ...graph.steps, [id]: { premises, justification } },
      };
      const next = analyzeGraph(
        spec,
        nextGraph,
        { allowedTheorems: allowed, removedHypotheses: removed, passedChecks },
        theoremLabel,
      );
      setGraph(nextGraph);
      const verdict = next.verdicts[id]!;
      let refusedNow = refused;
      if (next.cycles.some((c) => c.includes(id))) {
        setFeedback({ node: id, verdict: { status: 'circulaire', message: CIRCULAR_MESSAGE } });
        setRefused((r) => r + 1);
        if (errorKey) recordConceptError('circularite', errorKey);
        return;
      }
      setFeedback({ node: id, verdict });
      if (verdict.status === 'incorrect' || verdict.status === 'a-justifier') {
        refusedNow += 1;
        setRefused((r) => r + 1);
        const concept =
          verdict.status === 'incorrect' ? verdict.concept : verdict.reason === 'piege' ? verdict.trap?.concept : undefined;
        if (concept && errorKey) recordConceptError(concept, errorKey);
      }
      if (next.goalReached && removed.size === 0 && !attemptCounted.current) {
        attemptCounted.current = true;
        onGoalReached?.({ refused: refusedNow, validSteps: countValid(spec, nextGraph, next) });
      }
    },
    [graph, spec, allowed, removed, passedChecks, errorKey, recordConceptError, refused, onGoalReached],
  );

  const passCheck = useCallback((id: NodeId) => {
    setPassedChecks((s) => new Set(s).add(id));
  }, []);

  const toggleRemoved = useCallback((id: NodeId) => {
    setRemoved((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  /** Efface le graphe ; les indices déjà consultés restent acquis tant que la tentative n'est pas comptée. */
  const reset = useCallback(() => {
    setGraph(emptyGraph());
    setPassedChecks(new Set());
    setRefused(0);
    setRemoved(new Set());
    setFeedback(null);
    if (draftKey) setDraft(draftKey, hints > 0 ? { graph: emptyGraph(), passedChecks: [], hints, refused: 0, updatedAt: now() } : null);
  }, [draftKey, setDraft, hints, now]);

  /** Nouvelle tentative, après une réussite comptée : graphe et indices repartent de zéro. */
  const restart = useCallback(() => {
    setGraph(emptyGraph());
    setPassedChecks(new Set());
    setRefused(0);
    setHints(0);
    setRemoved(new Set());
    setFeedback(null);
    attemptCounted.current = false;
    if (draftKey) setDraft(draftKey, null);
  }, [draftKey, setDraft]);

  const nodes = useMemo(() => nodeMap(spec), [spec]);
  const stepCount = useMemo(
    () => graph.placed.filter((id) => !isGiven(nodes.get(id)!) && graph.steps[id]).length,
    [graph, nodes],
  );
  const validSteps = useMemo(() => countValid(spec, graph, analysis), [spec, graph, analysis]);

  const setHintLevel = useCallback((n: number) => setHints((h) => Math.max(h, n)), []);

  return {
    graph,
    analysis,
    passedChecks,
    refused,
    removed,
    feedback,
    place,
    removeNode,
    verify,
    passCheck,
    toggleRemoved,
    reset,
    restart,
    nodes,
    stepCount,
    validSteps,
    hints,
    setHintLevel,
    initialHints: draft?.hints ?? 0,
    alreadySolvedAtOpen,
  };
}

export type ProofSession = ReturnType<typeof useProofSession>;
