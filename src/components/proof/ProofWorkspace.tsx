/**
 * Éditeur de preuve : banque de propositions, graphe, inspecteur d'étape.
 * Le joueur pose des propositions dans l'ordre qu'il veut ; chaque étape se vérifie
 * explicitement ; rien n'est validé sans une règle établie par le moteur.
 */
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { ProofSpec } from '@/content/schema';
import { NODE_KIND_LABEL } from '@/content/schema';
import { hypothesisRemovalReport, isGiven, visibleNodes, type NodeId } from '@/core/proof-engine/engine';
import { Button, Card, cx, SectionTitle, STATUS_META, StatusBadge, StatusLegend } from '@/components/ui';
import { MathText, Prose } from '@/components/Math';
import { ProofGraph } from './ProofGraph';
import { CheckInput } from './CheckInput';
import { nodeText } from './text';
import { type AttemptStats, type Feedback, useProofSession, type ProofSession } from './useProofSession';

export type WorkspaceMode = 'guide' | 'examen' | 'labo';

export interface WorkspaceProps {
  spec: ProofSpec;
  allowed: ReadonlySet<string> | null;
  draftKey: string | null;
  errorKey: string | null;
  mode: WorkspaceMode;
  guided: boolean;
  hints?: readonly [string, string, string];
  onHintUsed?: (level: number) => void;
  /** Réussite d'une tentative : déclenchée une seule fois, par une vérification explicite. */
  onSolved?: (stats: AttemptStats) => void;
  onUnlocks?: (keys: string[]) => void;
  onSession?: (s: ProofSession) => void;
  solvedSlot?: ReactNode;
}

const HINT_NAMES = ['Orientation', 'Structure', 'Déblocage'];

export function ProofWorkspace(props: WorkspaceProps) {
  const { spec, allowed, draftKey, errorKey, mode, guided, hints, onHintUsed, onSolved, onUnlocks, onSession, solvedSlot } = props;
  const session = useProofSession({ spec, allowed, draftKey, errorKey, onUnlocks, onGoalReached: onSolved });
  const { graph, analysis, passedChecks, feedback, place, verify, removeNode, passCheck, removed, toggleRemoved, reset, refused } = session;

  const [selected, setSelected] = useState<NodeId | null>(null);
  const hintLevel = session.hints;

  const solved = analysis.goalReached && removed.size === 0;

  useEffect(() => {
    onSession?.(session);
  });

  const showHint = (level: number) => {
    session.setHintLevel(level);
    onHintUsed?.(level);
  };

  const visible = useMemo(
    () => new Set(visibleNodes(spec, analysis, graph.placed, guided && mode !== 'examen')),
    [spec, analysis, graph.placed, guided, mode],
  );

  const givenNodes = spec.nodes.filter(isGiven);
  const propositions = spec.nodes.filter((n) => !isGiven(n));
  const hiddenCount = propositions.filter((n) => !visible.has(n.id)).length;
  const selectedNode = selected ? spec.nodes.find((n) => n.id === selected) : undefined;

  const pick = (id: NodeId) => {
    place(id);
    setSelected(id);
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(260px,320px)_minmax(0,1fr)_minmax(300px,360px)]">
      {/* Banque */}
      <Card className="p-3.5 xl:max-h-[calc(100vh-11rem)] xl:overflow-auto">
        <SectionTitle className="mb-2">Hypothèses et données</SectionTitle>
        <ul className="space-y-1.5 mb-5">
          {givenNodes.map((n) => {
            const st = analysis.status[n.id] ?? 'hypothese';
            return (
              <li key={n.id} className="rounded-md border border-line px-2.5 py-1.5 text-[13.5px]" style={{ borderLeft: `3px solid ${STATUS_META[st].color}` }}>
                {n.local && <span className="font-mono text-[10px] uppercase tracking-wider text-text-3 mr-1.5">Locale</span>}
                <MathText text={n.text} />
              </li>
            );
          })}
        </ul>

        <SectionTitle className="mb-2">Propositions</SectionTitle>
        <ul className="space-y-1.5">
          {propositions
            .filter((n) => visible.has(n.id))
            .map((n) => {
              const placed = graph.placed.includes(n.id);
              return (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => pick(n.id)}
                    className={cx(
                      'w-full text-left rounded-md border px-2.5 py-1.5 text-[13.5px] transition-colors cursor-pointer',
                      placed ? 'border-line-strong bg-surface-2' : 'border-line hover:bg-surface-2',
                      n.id === spec.goal && 'border-dashed',
                    )}
                    data-testid={`bank-${n.id}`}
                  >
                    <span className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-wider text-text-3">
                      <span>{n.id === spec.goal ? 'But' : NODE_KIND_LABEL[n.kind]}</span>
                      {placed && <span>Posée</span>}
                    </span>
                    <MathText text={nodeText(n, passedChecks)} />
                  </button>
                </li>
              );
            })}
        </ul>
        {hiddenCount > 0 && (
          <p className="mt-3 text-xs text-text-3">
            {hiddenCount} proposition{hiddenCount > 1 ? 's' : ''} apparaîtr{hiddenCount > 1 ? 'ont' : 'a'} à mesure que tu établis ce dont elle{hiddenCount > 1 ? 's' : ''} dépend{hiddenCount > 1 ? 'ent' : ''}.
          </p>
        )}
      </Card>

      {/* Graphe */}
      <div className="flex flex-col gap-3 min-w-0">
        <div className="flex-1 min-h-[420px]">
          <ProofGraph spec={spec} graph={graph} analysis={analysis} selected={selected} passedChecks={passedChecks} onSelect={setSelected} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <StatusLegend />
          <div className="flex items-center gap-3 font-mono text-[11px] text-text-3">
            <span data-testid="valid-steps">{session.validSteps} valide{session.validSteps > 1 ? 's' : ''}</span>
            <span>{refused} refus</span>
            {graph.placed.length > 0 && !solved && (
              <button type="button" className="underline hover:text-text-2 cursor-pointer" onClick={reset}>
                Tout effacer
              </button>
            )}
          </div>
        </div>
        {solved && solvedSlot}
      </div>

      {/* Inspecteur */}
      <div className="space-y-4 xl:max-h-[calc(100vh-11rem)] xl:overflow-auto">
        <Inspector
          key={selected ?? 'none'}
          spec={spec}
          session={session}
          nodeId={selected}
          onVerify={verify}
          onRemove={(id) => {
            removeNode(id);
            setSelected(null);
          }}
          onPassCheck={passCheck}
          feedback={feedback}
        />

        {selectedNode === undefined && (
          <Card className="p-3.5">
            <p className="text-sm text-text-2">
              Sélectionne une proposition posée pour indiquer ses prémisses et sa justification.
            </p>
          </Card>
        )}

        {mode === 'guide' && hints && (
          <Card className="p-3.5">
            <SectionTitle className="mb-2">Indices</SectionTitle>
            <div className="space-y-2.5">
              {[1, 2, 3].map((level) => (
                <div key={level}>
                  {hintLevel >= level ? (
                    <div className="anim-rise">
                      <div className="font-mono text-[11px] text-text-3 mb-0.5">
                        {level}. {HINT_NAMES[level - 1]}
                      </div>
                      <p className="text-sm">
                        <MathText text={hints[level - 1]!} />
                      </p>
                    </div>
                  ) : (
                    level === hintLevel + 1 && (
                      <Button onClick={() => showHint(level)} variant="ghost" className="w-full justify-start">
                        Indice {level} : {HINT_NAMES[level - 1]}
                      </Button>
                    )
                  )}
                </div>
              ))}
            </div>
            {hintLevel > 0 && (
              <p className="mt-2 text-xs text-text-3">
                Les indices restent disponibles : ils déterminent seulement si la réussite compte comme autonome.
              </p>
            )}
          </Card>
        )}

        {mode !== 'examen' && spec.removable.length > 0 && <RemovalPanel spec={spec} session={session} removed={removed} toggle={toggleRemoved} />}
      </div>
    </div>
  );
}

function Inspector({
  spec,
  session,
  nodeId,
  onVerify,
  onRemove,
  onPassCheck,
  feedback,
}: {
  spec: ProofSpec;
  session: ProofSession;
  nodeId: NodeId | null;
  onVerify: (id: NodeId, premises: NodeId[], justification: string | null) => void;
  onRemove: (id: NodeId) => void;
  onPassCheck: (id: NodeId) => void;
  feedback: Feedback | null;
}) {
  const { graph, analysis, passedChecks } = session;
  const node = nodeId ? spec.nodes.find((n) => n.id === nodeId) : undefined;
  const step = nodeId ? graph.steps[nodeId] : undefined;
  const [premises, setPremises] = useState<NodeId[]>(step?.premises ?? []);
  const [justification, setJustification] = useState<string | null>(step?.justification ?? null);

  if (!node || !nodeId) return <FeedbackPanel feedback={feedback} spec={spec} />;

  if (isGiven(node)) {
    return (
      <Card className="p-3.5 anim-rise">
        <SectionTitle className="mb-2">Donnée disponible</SectionTitle>
        <p className="text-sm">
          <MathText text={node.text} />
        </p>
      </Card>
    );
  }

  const candidates = [
    ...spec.nodes.filter((n) => isGiven(n)),
    ...spec.nodes.filter((n) => !isGiven(n) && graph.placed.includes(n.id) && n.id !== nodeId),
  ];
  const status = analysis.status[nodeId] ?? 'absent';

  const toggle = (id: NodeId) => setPremises((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <Card className="p-3.5 anim-rise">
      <div data-testid="inspector">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <SectionTitle>Étape</SectionTitle>
        <StatusBadge status={status} />
      </div>
      <p className="text-[14.5px] mb-3">
        <MathText text={nodeText(node, passedChecks)} />
      </p>

      {node.check && !passedChecks.has(nodeId) && (
        <div className="mb-4 rounded-md border border-line p-2.5">
          <CheckInput check={node.check} onResult={(r) => r.status === 'valide' && onPassCheck(nodeId)} />
        </div>
      )}
      {node.check && passedChecks.has(nodeId) && (
        <p className="mb-3 text-[13px] text-hyp" role="status" data-testid="check-passed">
          <span aria-hidden>✓ </span>Calcul exact validé. Il reste à justifier l’étape.
        </p>
      )}

      <SectionTitle className="mb-1.5">Prémisses utilisées</SectionTitle>
      <ul className="space-y-1 mb-4 max-h-52 overflow-auto pr-1">
        {candidates.map((c) => (
          <li key={c.id}>
            <label className="flex items-start gap-2 text-[13px] cursor-pointer">
              <input type="checkbox" className="mt-1 shrink-0" checked={premises.includes(c.id)} onChange={() => toggle(c.id)} data-testid={`premise-${c.id}`} />
              <span>
                <MathText text={nodeText(c, passedChecks)} />
              </span>
            </label>
          </li>
        ))}
      </ul>

      <SectionTitle className="mb-1.5">Justification</SectionTitle>
      <ul className="space-y-1 mb-4 max-h-60 overflow-auto pr-1" role="radiogroup" aria-label="Justification de l'étape">
        {spec.justifications.map((j) => (
          <li key={j.id}>
            <label className="flex items-start gap-2 text-[13px] cursor-pointer">
              <input type="radio" name="justification" className="mt-1 shrink-0" checked={justification === j.id} onChange={() => setJustification(j.id)} data-testid={`just-${j.id}`} />
              <span>
                <MathText text={j.label} />
              </span>
            </label>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2">
        <Button variant="primary" onClick={() => onVerify(nodeId, premises, justification)} data-testid="verify-step">
          Vérifier l’étape
        </Button>
        <Button variant="ghost" onClick={() => onRemove(nodeId)}>
          Retirer
        </Button>
      </div>

      <FeedbackPanel feedback={feedback?.node === nodeId ? feedback : null} spec={spec} inline />
      </div>
    </Card>
  );
}

function FeedbackPanel({ feedback, spec, inline = false }: { feedback: Feedback | null; spec: ProofSpec; inline?: boolean }) {
  const content = (() => {
    if (!feedback) return null;
    const v = feedback.verdict;
    if (v.status === 'donne' || v.status === 'retire') return null;
    if (v.status === 'valide') {
      return (
        <p className="text-sm text-proved">
          <span className="font-semibold">Validé. </span>
          Cette étape suit une règle explicite à partir des prémisses choisies.
        </p>
      );
    }
    if (v.status === 'circulaire') {
      return (
        <p className="text-sm text-invalid">
          <span className="font-semibold">Incorrect. </span>
          <MathText text={v.message} />
        </p>
      );
    }
    if (v.status === 'a-justifier') {
      return (
        <p className="text-sm text-miss">
          <span className="font-semibold">À justifier. </span>
          <MathText text={v.message} />
        </p>
      );
    }
    return (
      <div className="text-sm text-invalid space-y-1.5">
        <p>
          <span className="font-semibold">Incorrect. </span>
          <MathText text={v.message} />
        </p>
        {v.counterexample && (
          <p className="text-text">
            <span className="font-mono text-[11px] text-text-3">Contre-exemple : </span>
            <MathText text={v.counterexample} />
          </p>
        )}
      </div>
    );
  })();

  // Région annoncée par les lecteurs d'écran.
  return (
    <div role="status" aria-live="polite" className={inline ? 'mt-3' : ''} data-testid="step-feedback">
      {content && !inline ? <Card className="p-3.5 anim-rise">{content}</Card> : content}
      {!content && !inline && spec.nodes.length === 0 ? null : null}
    </div>
  );
}

function RemovalPanel({
  spec,
  session,
  removed,
  toggle,
}: {
  spec: ProofSpec;
  session: ProofSession;
  removed: ReadonlySet<NodeId>;
  toggle: (id: NodeId) => void;
}) {
  const { analysis } = session;
  return (
    <Card className="p-3.5">
      <SectionTitle className="mb-2">Retirer une hypothèse</SectionTitle>
      <p className="text-xs text-text-3 mb-2.5">Observe ce qui cesse d’être valable, et pourquoi.</p>
      <ul className="space-y-2.5">
        {spec.removable.map((r) => {
          const on = removed.has(r.hypothesis);
          const report = hypothesisRemovalReport(spec, r.hypothesis);
          return (
            <li key={r.hypothesis}>
              <label className="flex items-start gap-2 text-[13.5px] cursor-pointer">
                <input type="checkbox" className="mt-1" checked={on} onChange={() => toggle(r.hypothesis)} data-testid={`remove-${r.hypothesis}`} />
                <MathText text={r.label} />
              </label>
              {on && (
                <div className="mt-1.5 ml-5 space-y-1 text-[13px] anim-rise">
                  <p className="text-miss">
                    {report.goalStillDerivable
                      ? 'Le but reste atteignable par un autre chemin, sans cette propriété.'
                      : 'Le théorème ne peut plus être invoqué : le but n’est plus atteignable à partir de ce qui reste.'}
                  </p>
                  <p>
                    <MathText text={r.explanation} />
                  </p>
                  <div className="rounded border border-line p-2">
                    <span className="font-mono text-[11px] text-text-3">Contre-exemple</span>
                    <Prose text={r.counterexample} className="text-[13px]" />
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {removed.size > 0 && (
        <p className="mt-2.5 text-xs text-text-3">
          {analysis.goalReached ? 'Le but reste établi.' : 'La preuve est suspendue tant qu’une propriété est retirée : rien n’est perdu.'}
        </p>
      )}
    </Card>
  );
}
