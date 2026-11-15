/**
 * Atelier de preuve. Deux vues d'une même preuve, qui partagent la même session :
 * - « Blocs » (par défaut) : la démonstration s'écrit de haut en bas, bloc par bloc
 *   (Soit / Supposons, implication, théorème, calcul, contradiction, conclusion) ;
 * - « Graphe » : banque de propositions, graphe des dépendances, inspecteur d'étape.
 * Rien n'est validé sans une règle établie par le moteur, quelle que soit la vue.
 */
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { ProofSpec } from '@/content/schema';
import { NODE_KIND_LABEL } from '@/content/schema';
import { isGiven, visibleNodes, type NodeId } from '@/core/proof-engine/engine';
import type { DicoTrack } from '@/content/dictionnaire/types';
import { Button, Card, cx, SectionTitle, STATUS_META, StatusBadge, StatusLegend } from '@/components/ui';
import { MathText } from '@/components/Math';
import { ProofGraph } from './ProofGraph';
import { CheckInput } from './CheckInput';
import { RemovalPanel } from './RemovalPanel';
import { nodeText } from './text';
import { type AttemptStats, type Feedback, useProofSession, type ProofSession } from './useProofSession';
import { ProofBlocks } from './blocks/ProofBlocks';

export type WorkspaceMode = 'guide' | 'examen' | 'labo' | 'demo';

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
  /** Plan de la démonstration de référence (laboratoire de démonstration). */
  plan?: readonly string[];
  /** Parcours du résultat, pour les notions du dictionnaire. */
  track?: DicoTrack;
}

const HINT_NAMES = ['Orientation', 'Structure', 'Déblocage'];
const VIEW_KEY = 'prooflab:preuve:vue';
type View = 'blocs' | 'graphe';

function readView(): View {
  try {
    return localStorage.getItem(VIEW_KEY) === 'graphe' ? 'graphe' : 'blocs';
  } catch {
    return 'blocs';
  }
}

export function ProofWorkspace(props: WorkspaceProps) {
  const { spec, allowed, draftKey, errorKey, onSolved, onUnlocks, onSession, onHintUsed } = props;
  const session = useProofSession({ spec, allowed, draftKey, errorKey, onUnlocks, onGoalReached: onSolved });
  const [view, setView] = useState<View>(readView);

  useEffect(() => {
    onSession?.(session);
  });

  const showHint = (level: number) => {
    session.setHintLevel(level);
    onHintUsed?.(level);
  };

  const choose = (v: View) => {
    setView(v);
    try {
      localStorage.setItem(VIEW_KEY, v);
    } catch {
      /* préférence non conservée */
    }
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2" role="tablist" aria-label="Vue de la preuve">
        {(
          [
            ['blocs', 'Blocs logiques'],
            ['graphe', 'Graphe des dépendances'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={view === id}
            data-vue-preuve={id}
            onClick={() => choose(id)}
            className={cx('rounded-md border px-3 py-1.5 text-[13px] transition-colors cursor-pointer', view === id ? 'border-accent bg-accent text-[var(--bg)]' : 'border-line hover:border-line-strong')}
          >
            {label}
          </button>
        ))}
        <span className="text-[12px] text-text-3">Les deux vues montrent la même preuve.</span>
      </div>
      {view === 'blocs' ? (
        <ProofBlocks
          spec={spec}
          session={session}
          mode={props.mode}
          guided={props.guided}
          hints={props.hints}
          hintLevel={session.hints}
          onHint={showHint}
          solvedSlot={props.solvedSlot}
          plan={props.plan}
          track={props.track}
        />
      ) : (
        <GraphView {...props} session={session} showHint={showHint} />
      )}
    </div>
  );
}

function GraphView(props: WorkspaceProps & { session: ProofSession; showHint: (level: number) => void }) {
  const { spec, mode, guided, hints, solvedSlot, session, showHint } = props;
  const { graph, analysis, passedChecks, feedback, place, verify, removeNode, passCheck, removed, toggleRemoved, reset, refused } = session;

  const [selected, setSelected] = useState<NodeId | null>(null);
  const hintLevel = session.hints;

  const solved = analysis.goalReached && removed.size === 0;

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
                <MathText text={n.text} terms />
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
                        <MathText text={hints[level - 1]!} terms />
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
          <MathText text={node.text} terms />
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
          <MathText text={nodeText(node, passedChecks)} terms />
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
          <MathText text={v.message} terms />
        </p>
      );
    }
    return (
      <div className="text-sm text-invalid space-y-1.5">
        <p>
          <span className="font-semibold">Incorrect. </span>
          <MathText text={v.message} terms />
        </p>
        {v.counterexample && (
          <p className="text-text">
            <span className="font-mono text-[11px] text-text-3">Contre-exemple : </span>
            <MathText text={v.counterexample} terms />
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
