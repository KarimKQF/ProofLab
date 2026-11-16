/**
 * Éditeur de démonstration par blocs logiques. La preuve se lit de haut en bas : on
 * introduit les objets et les hypothèses locales (« Soit… », « Supposons… »), puis chaque
 * bloc affirme quelque chose « si » des prémisses sont établies, « car » une justification
 * le garantit. Le moteur vérifie chaque bloc ; rien n'est validé sans règle explicite.
 */
import { useEffect, useMemo, useState, type DragEvent, type ReactNode } from 'react';
import type { ProofNodeSpec, ProofSpec } from '@/content/schema';
import { NODE_KIND_LABEL } from '@/content/schema';
import { isGiven, visibleNodes, type NodeId } from '@/core/proof-engine/engine';
import type { DicoTrack } from '@/content/dictionnaire';
import { Button, Card, cx, SectionTitle, STATUS_META, StatusBadge } from '@/components/ui';
import { MathText, Prose } from '@/components/Math';
import { TermChip } from '@/components/glossary/EntryView';
import { CheckInput } from '../CheckInput';
import { RemovalPanel } from '../RemovalPanel';
import { nodeText } from '../text';
import type { ProofSession } from '../useProofSession';
import {
  availableFacts,
  BLOCK_META,
  blocksFromGraph,
  blockSentence,
  inferKind,
  isAbsurdIntro,
  isLocal,
  justificationCandidates,
  newKey,
  nodeOf,
  STEP_KINDS,
  targetCandidates,
  type Block,
  type BlockKind,
  type FadingLevel,
  type FadingSeed,
} from './model';
import { ProofGuide } from './ProofGuide';

export type BlocksMode = 'guide' | 'examen' | 'labo' | 'demo';

export interface ProofBlocksProps {
  spec: ProofSpec;
  session: ProofSession;
  mode: BlocksMode;
  guided: boolean;
  hints?: readonly [string, string, string];
  hintLevel: number;
  onHint?: (level: number) => void;
  solvedSlot?: ReactNode;
  /** Étapes de la démonstration de référence (plan), pour le laboratoire. */
  plan?: readonly string[];
  track?: DicoTrack;
  /** Effacement progressif : blocs de la preuve modèle, figés ou effacés. */
  fading?: { level: Exclude<FadingLevel, 'blanche'>; seed: FadingSeed };
}

type Slot = 'cible' | 'premisses' | 'justification';

export function ProofBlocks({ spec, session, mode, guided, hints, hintLevel, onHint, solvedSlot, plan, track, fading }: ProofBlocksProps) {
  const { graph, analysis, passedChecks, feedback, removed, toggleRemoved } = session;
  const [blocks, setBlocks] = useState<Block[]>(() =>
    fading ? fading.seed.blocks.map((b) => ({ ...b, premises: [...b.premises] })) : blocksFromGraph(spec, graph),
  );
  const masked = useMemo(() => new Set(fading?.seed.masked ?? []), [fading]);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState<{ key: string; slot: Slot } | null>(null);
  const [introMenu, setIntroMenu] = useState(false);
  const [notice, setNotice] = useState<{ key: string; text: string } | null>(null);
  const [showProse, setShowProse] = useState(fading?.level === 'lire');
  const [showAll, setShowAll] = useState<Record<string, boolean>>({});

  const exam = mode === 'examen';
  const solved = analysis.goalReached && removed.size === 0;
  const introduced = useMemo(() => new Set(blocks.filter((b) => b.kind === 'intro' && b.node).map((b) => b.node!)), [blocks]);
  const taken = useMemo(() => new Set(blocks.filter((b) => b.kind !== 'intro' && b.node).map((b) => b.node!)), [blocks]);
  const visible = useMemo(() => new Set(visibleNodes(spec, analysis, graph.placed, guided && !exam)), [spec, analysis, graph.placed, guided, exam]);
  const facts = availableFacts(spec, analysis, introduced, removed);
  const locals = spec.nodes.filter((n) => isGiven(n) && n.local);
  const pendingLocals = locals.filter((n) => !introduced.has(n.id));
  const realTxt = (id: NodeId) => {
    const n = nodeOf(spec, id);
    return n ? nodeText(n, passedChecks) : id;
  };
  const activeBlock = blocks.find((b) => b.key === active);
  const refs = useMemo(() => {
    const m = new Map<NodeId, string>();
    spec.nodes.filter((n) => isGiven(n) && !n.local).forEach((n, i) => m.set(n.id, `H${i + 1}`));
    blocks.forEach((b, i) => {
      if (b.hole) m.set(b.hole, `(${i + 1})`);
      if (b.node) m.set(b.node, `(${i + 1})`);
    });
    return m;
  }, [spec, blocks]);
  const ref = (id: NodeId) => refs.get(id) ?? '?';
  // Une étape effacée garde son texte masqué ailleurs tant qu'elle n'est pas reconstruite.
  const rebuilt = new Set(blocks.filter((b) => b.hole && b.node === b.hole).map((b) => b.node!));
  const txt = (id: NodeId) =>
    masked.has(id) && !analysis.grounded.has(id) && !rebuilt.has(id) ? `Étape ${ref(id)} effacée, à reconstruire` : realTxt(id);
  const usersOf = (id: NodeId) =>
    blocks
      .filter((x) => (x.node && x.premises.includes(id)) || (x.hole && !x.node && x.holeUses?.includes(id)))
      .map((x) => ref(x.node ?? x.hole!))
      .join(', ');

  // Un bloc validé se replie aussitôt : la démonstration reste lisible, et « Modifier » le rouvre.
  useEffect(() => {
    if (!feedback || !activeBlock?.node) return;
    if (feedback.node === activeBlock.node && feedback.verdict.status === 'valide' && analysis.grounded.has(activeBlock.node)) setActive(null);
  }, [feedback]); // ne réagit qu'à une nouvelle vérification

  const update = (key: string, patch: Partial<Block>) => setBlocks((bs) => bs.map((b) => (b.key === key ? { ...b, ...patch } : b)));

  const addStep = (kind: BlockKind) => {
    const key = newKey();
    let node: NodeId | null = null;
    if (kind === 'conclusion' && !taken.has(spec.goal)) {
      node = spec.goal;
      session.place(spec.goal);
    }
    setBlocks((bs) => [...bs, { key, kind, node, premises: [], justification: null }]);
    setActive(key);
    setOpen(node ? { key, slot: 'premisses' } : { key, slot: 'cible' });
    setNotice(null);
  };

  const addIntro = (id: NodeId) => {
    setBlocks((bs) => {
      // Une introduction se place avant la première étape qui pourrait l'utiliser : en tête des étapes.
      const firstStep = bs.findIndex((b) => b.kind !== 'intro');
      const block: Block = { key: newKey(), kind: 'intro', node: id, premises: [], justification: null };
      if (firstStep < 0) return [...bs, block];
      return [...bs.slice(0, firstStep), block, ...bs.slice(firstStep)];
    });
    setIntroMenu(false);
  };

  const setTarget = (b: Block, id: NodeId) => {
    if (b.node && b.node !== id) session.removeNode(b.node);
    session.place(id);
    update(b.key, { node: id, kind: b.kind === 'deduction' || b.kind === 'theoreme' ? b.kind : b.kind });
    setOpen({ key: b.key, slot: 'premisses' });
  };

  const togglePremise = (b: Block, id: NodeId) => {
    const has = b.premises.includes(id);
    update(b.key, { premises: has ? b.premises.filter((p) => p !== id) : [...b.premises, id] });
  };

  const verify = (b: Block) => {
    if (!b.node) {
      setNotice({ key: b.key, text: 'Choisis d’abord l’affirmation que ce bloc établit (« alors »).' });
      return;
    }
    const notIntroduced = b.premises.filter((p) => isLocal(spec, p) && !introduced.has(p));
    if (notIntroduced.length) {
      setNotice({ key: b.key, text: 'Une prémisse est une hypothèse locale qui n’a pas encore été introduite : ajoute d’abord un bloc « Soit… / Supposons… ».' });
      return;
    }
    setNotice(null);
    session.verify(b.node, b.premises, b.justification);
    setOpen(null);
    if (b.hole && b.node !== b.hole) {
      const users = usersOf(b.hole);
      setNotice({
        key: b.key,
        text: `Ce n’est pas l’étape effacée${users ? ` : ${users} s’appuie sur une autre affirmation` : ''}. Choisis une autre affirmation pour ce bloc.`,
      });
    }
  };

  const remove = (b: Block) => {
    if (b.kind === 'intro' && b.node) {
      const users = blocks.filter((x) => x.kind !== 'intro' && x.premises.includes(b.node!));
      if (users.length) {
        setNotice({ key: b.key, text: 'Cette hypothèse sert de prémisse à un autre bloc : retire-la d’abord de ce bloc.' });
        return;
      }
    }
    if (b.kind !== 'intro' && b.node) session.removeNode(b.node);
    setBlocks((bs) =>
      bs
        .filter((x) => x.key !== b.key)
        .map((x) => (b.kind !== 'intro' && b.node ? { ...x, premises: x.premises.filter((p) => p !== b.node) } : x)),
    );
    if (active === b.key) setActive(null);
  };

  const move = (b: Block, dir: -1 | 1) =>
    setBlocks((bs) => {
      const i = bs.findIndex((x) => x.key === b.key);
      const j = i + dir;
      if (j < 0 || j >= bs.length) return bs;
      const next = [...bs];
      [next[i], next[j]] = [next[j]!, next[i]!];
      return next;
    });

  const resetAll = () => {
    session.reset();
    setBlocks([]);
    setActive(null);
    setNotice(null);
  };

  const addFactToActive = (id: NodeId) => {
    if (!activeBlock || activeBlock.kind === 'intro') return;
    if (!activeBlock.premises.includes(id)) update(activeBlock.key, { premises: [...activeBlock.premises, id] });
  };

  // Raisonnement par l'absurde : les blocs entre « Supposons par l'absurde » et la contradiction sont encadrés.
  const inAbsurd = useMemo(() => {
    const out = new Set<string>();
    let openFrame = false;
    for (const b of blocks) {
      if (b.kind === 'intro' && isAbsurdIntro(nodeOf(spec, b.node ?? ''))) openFrame = true;
      if (openFrame) out.add(b.key);
      if (b.node && nodeOf(spec, b.node)?.kind === 'contradiction') openFrame = false;
    }
    return out;
  }, [blocks, spec]);

  const hasCheck = spec.nodes.some((n) => n.check);
  const hasContradiction = spec.nodes.some((n) => n.kind === 'contradiction');

  const goal = nodeOf(spec, spec.goal)!;
  const goalStatus = analysis.status[spec.goal] ?? 'absent';

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(230px,270px)_minmax(0,1fr)] xl:grid-cols-[minmax(230px,270px)_minmax(0,1fr)_minmax(270px,320px)]" data-testid="editeur-blocs">
      {/* Palette et faits disponibles */}
      <div className="space-y-4 xl:max-h-[calc(100vh-9rem)] xl:overflow-auto xl:pr-1">
        {fading ? (
          <Card className="p-3.5" data-testid="effacement-consigne">
            <SectionTitle className="mb-1.5">Preuve modèle</SectionTitle>
            <p className="text-[12.5px] text-text-2">
              {fading.level === 'lire'
                ? 'Chaque bloc se lit « de … car … ⟹ affirmation ». Les repères H1, H2… sont les hypothèses, (3) le bloc 3.'
                : fading.level === 'justifier'
                  ? 'Pour chaque bloc ouvert, choisis la justification (« car »), puis « Vérifier le bloc ».'
                  : 'Les blocs marqués « étape effacée » sont à reconstruire : choisis l’affirmation (« alors »), ses prémisses (« si ») et sa justification (« car »).'}
            </p>
          </Card>
        ) : (
        <Card className="p-3.5">
          <SectionTitle className="mb-1.5">Blocs logiques</SectionTitle>
          <p className="mb-2.5 text-[12.5px] text-text-3">Ajoute un bloc, puis complète ses cases : « si », « alors », « car ».</p>
          <div className="space-y-1.5">
            <PaletteButton
              kind="intro"
              disabled={pendingLocals.length === 0}
              onClick={() => setIntroMenu((v) => !v)}
              note={locals.length === 0 ? 'Aucune hypothèse locale dans cette preuve.' : pendingLocals.length === 0 ? 'Toutes les hypothèses locales sont introduites.' : undefined}
              track={track}
            />
            {introMenu && pendingLocals.length > 0 && (
              <ul className="ml-2 space-y-1 border-l-2 border-line pl-2 anim-rise">
                {pendingLocals.map((n) => (
                  <li key={n.id}>
                    <button type="button" onClick={() => addIntro(n.id)} className="w-full rounded-md border border-line px-2 py-1 text-left text-[13px] hover:border-hyp cursor-pointer" data-testid={`introduire-${n.id}`}>
                      <MathText text={n.text} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {STEP_KINDS.map((k) => (
              <PaletteButton
                key={k}
                kind={k}
                onClick={() => addStep(k)}
                disabled={(k === 'calcul' && !hasCheck) || (k === 'absurde' && !hasContradiction) || (k === 'conclusion' && taken.has(spec.goal))}
                note={k === 'calcul' && !hasCheck ? 'Pas de calcul exact dans cette preuve.' : k === 'absurde' && !hasContradiction ? 'Cette preuve ne passe pas par une contradiction.' : undefined}
                track={track}
              />
            ))}
          </div>
        </Card>
        )}

        <Card className="p-3.5">
          <SectionTitle className="mb-1.5">Faits disponibles</SectionTitle>
          <p className="mb-2 text-[12.5px] text-text-3">
            {activeBlock && activeBlock.kind !== 'intro' ? '« + » ajoute le fait aux prémisses du bloc en cours ; on peut aussi le faire glisser.' : 'Hypothèses, objets introduits et étapes déjà établies.'}
          </p>
          <FactGroup title="Hypothèses du résultat" items={facts.givens} txt={txt} refOf={ref} canAdd={Boolean(activeBlock && activeBlock.kind !== 'intro')} onAdd={addFactToActive} color="var(--st-hyp)" />
          <FactGroup title="Introduits" items={facts.locals} txt={txt} refOf={ref} canAdd={Boolean(activeBlock && activeBlock.kind !== 'intro')} onAdd={addFactToActive} color="var(--st-hyp)" empty={locals.length ? 'Rien d’introduit pour l’instant.' : undefined} />
          <FactGroup title="Établis" items={facts.established} txt={txt} refOf={ref} canAdd={Boolean(activeBlock && activeBlock.kind !== 'intro')} onAdd={addFactToActive} color="var(--st-proved)" empty="Aucune étape établie pour l’instant." />
        </Card>
      </div>

      {/* La démonstration */}
      <div className="min-w-0 space-y-3">
        <Card className="p-3.5" style={{ borderLeft: `3px solid ${STATUS_META[goalStatus].color}` }} data-testid="but-preuve">
          <div className="mb-1 flex items-center justify-between gap-2">
            <SectionTitle>À démontrer</SectionTitle>
            {goalStatus !== 'absent' && <StatusBadge status={goalStatus} />}
          </div>
          <p className="font-serif text-[15.5px]">
            <MathText text={goal.text} terms />
          </p>
        </Card>

        <ol className="space-y-2" aria-label="Démonstration en blocs">
          {blocks.length === 0 && (
            <li className="rounded-lg border border-dashed border-line px-4 py-6 text-center text-[13.5px] text-text-3">
              La démonstration est vide. Commence par un bloc de la palette : souvent « Soit… / Supposons… », sinon une implication à partir des hypothèses.
            </li>
          )}
          {blocks.map((b, i) => (
            <BlockCard
              key={b.key}
              index={i}
              block={b}
              spec={spec}
              session={session}
              track={track}
              active={active === b.key}
              framed={inAbsurd.has(b.key)}
              frameStart={b.kind === 'intro' && isAbsurdIntro(nodeOf(spec, b.node ?? ''))}
              openSlot={open?.key === b.key ? open.slot : null}
              notice={notice?.key === b.key ? notice.text : null}
              feedbackHere={Boolean(b.node && feedback?.node === b.node)}
              visible={visible}
              taken={taken}
              introduced={introduced}
              facts={[...facts.givens, ...facts.locals, ...facts.established]}
              showAll={Boolean(showAll[b.key])}
              onShowAll={() => setShowAll((s) => ({ ...s, [b.key]: !s[b.key] }))}
              onActivate={() => setActive(b.key)}
              onOpen={(slot) => {
                setActive(b.key);
                setOpen((o) => (o?.key === b.key && o.slot === slot ? null : { key: b.key, slot }));
              }}
              onTarget={(id) => setTarget(b, id)}
              onTogglePremise={(id) => togglePremise(b, id)}
              onDropPremise={(id) => {
                setActive(b.key);
                if (!b.premises.includes(id)) update(b.key, { premises: [...b.premises, id] });
              }}
              onJustify={(id) => {
                update(b.key, { justification: id, kind: b.node ? inferKindKeep(spec, b, id) : b.kind });
                setOpen(null);
              }}
              onVerify={() => verify(b)}
              onRemove={() => remove(b)}
              onMove={(d) => move(b, d)}
              txt={txt}
              realTxt={realTxt}
              refOf={ref}
              holeUsers={b.hole ? usersOf(b.hole) : undefined}
            />
          ))}
        </ol>

        <div className="flex flex-wrap items-center justify-between gap-2 text-[12px] text-text-3">
          <span className="font-mono">
            <span data-testid="valid-steps">{session.validSteps} valide{session.validSteps > 1 ? 's' : ''}</span> · {session.refused} refus
          </span>
          <span className="flex items-center gap-3">
            <button type="button" className="underline hover:text-text-2 cursor-pointer" onClick={() => setShowProse((v) => !v)} aria-expanded={showProse} data-testid="lire-preuve">
              {showProse ? 'Masquer la rédaction' : 'Lire la démonstration rédigée'}
            </button>
            {blocks.length > 0 && !solved && !fading && (
              <button type="button" className="underline hover:text-text-2 cursor-pointer" onClick={resetAll}>
                Tout effacer
              </button>
            )}
          </span>
        </div>

        {showProse && <WrittenProof spec={spec} blocks={blocks} grounded={analysis.grounded} txt={txt} refOf={ref} framed={inAbsurd} />}
        {solved && solvedSlot}
      </div>

      {/* Guide */}
      <div className="space-y-4 lg:col-span-2 xl:col-span-1 xl:max-h-[calc(100vh-9rem)] xl:overflow-auto xl:pl-1">
        {fading?.level === 'lire' && (
          <Card className="p-3.5" data-testid="lecture-guidee">
            <SectionTitle className="mb-1.5">Lecture guidée</SectionTitle>
            <ol className="list-decimal space-y-1 pl-4 text-[13px]">
              <li>Repère les hypothèses du résultat (H1, H2…) et où chacune sert.</li>
              <li>Pour chaque bloc : ce qu’il utilise (« de »), ce qui le justifie (« car »), ce qu’il établit.</li>
              <li>Relis la démonstration rédigée, puis passe à l’étape suivante : retrouver les justifications.</li>
            </ol>
          </Card>
        )}
        {!exam && fading?.level !== 'lire' && (
          <ProofGuide
            spec={spec}
            session={session}
            introduced={introduced}
            coaching={mode === 'demo'}
            hints={mode === 'guide' ? hints : undefined}
            hintLevel={hintLevel}
            onHint={onHint}
            plan={mode === 'demo' ? plan : undefined}
            track={track}
            displayText={fading?.level === 'completer' ? txt : undefined}
          />
        )}
        {!exam && spec.removable.length > 0 && <RemovalPanel spec={spec} session={session} removed={removed} toggle={toggleRemoved} />}
      </div>
    </div>
  );
}

/** Le type de bloc suit la justification quand elle invoque un théorème. */
function inferKindKeep(spec: ProofSpec, b: Block, justification: string): BlockKind {
  if (b.kind === 'deduction' || b.kind === 'theoreme') return inferKind(spec, b.node!, justification);
  return b.kind;
}

function PaletteButton({ kind, onClick, disabled, note, track }: { kind: BlockKind; onClick: () => void; disabled?: boolean; note?: string; track?: DicoTrack }) {
  const meta = BLOCK_META[kind];
  return (
    <div className="flex items-start gap-1.5">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cx(
          'flex-1 rounded-md border border-line bg-surface-2 px-2.5 py-1.5 text-left transition-colors',
          disabled ? 'opacity-45 cursor-not-allowed' : 'hover:border-line-strong cursor-pointer',
        )}
        style={{ borderLeft: `4px solid ${meta.color}` }}
        title={note ?? meta.help}
        data-testid={`ajouter-${kind}`}
      >
        <span className="flex items-center justify-between gap-2 text-[13.5px] font-medium">
          <span>{meta.label}</span>
          <span className="font-mono text-[13px]" style={{ color: meta.color }} aria-hidden>
            {meta.symbol}
          </span>
        </span>
        <span className="block text-[11.5px] leading-snug text-text-3 line-clamp-2">{note ?? meta.help}</span>
      </button>
      {meta.method && (
        <span className="pt-1.5 text-[11px]">
          <TermChip id={meta.method} track={track} label="?" />
        </span>
      )}
    </div>
  );
}

function FactGroup({
  title,
  items,
  txt,
  refOf,
  canAdd,
  onAdd,
  color,
  empty,
}: {
  title: string;
  items: ProofNodeSpec[];
  txt: (id: NodeId) => string;
  refOf: (id: NodeId) => string;
  canAdd: boolean;
  onAdd: (id: NodeId) => void;
  color: string;
  empty?: string;
}) {
  if (!items.length && !empty) return null;
  return (
    <div className="mb-2.5">
      <div className="mb-1 font-mono text-[10.5px] uppercase tracking-wider text-text-3">{title}</div>
      {items.length === 0 ? (
        <p className="text-[12.5px] text-text-3">{empty}</p>
      ) : (
        <ul className="space-y-1">
          {items.map((n) => (
            <li
              key={n.id}
              draggable
              onDragStart={(e: DragEvent) => {
                e.dataTransfer.setData('text/plain', n.id);
                e.dataTransfer.effectAllowed = 'copy';
              }}
              className="flex items-start gap-1.5 rounded-md border border-line px-2 py-1 text-[13px]"
              style={{ borderLeft: `3px solid ${color}` }}
              data-fait={n.id}
            >
              <RefBadge label={refOf(n.id)} />
              <span className="min-w-0 flex-1">
                <MathText text={txt(n.id)} terms />
              </span>
              {canAdd && (
                <button type="button" onClick={() => onAdd(n.id)} className="shrink-0 rounded border border-line px-1.5 text-[12px] leading-5 hover:border-accent hover:text-accent cursor-pointer" aria-label="Ajouter aux prémisses du bloc en cours" data-testid={`fait-${n.id}`}>
                  +
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface BlockCardProps {
  index: number;
  block: Block;
  spec: ProofSpec;
  session: ProofSession;
  track?: DicoTrack;
  active: boolean;
  framed: boolean;
  frameStart: boolean;
  openSlot: Slot | null;
  notice: string | null;
  feedbackHere: boolean;
  visible: ReadonlySet<NodeId>;
  taken: ReadonlySet<NodeId>;
  introduced: ReadonlySet<NodeId>;
  facts: ProofNodeSpec[];
  showAll: boolean;
  onShowAll: () => void;
  onActivate: () => void;
  onOpen: (slot: Slot) => void;
  onTarget: (id: NodeId) => void;
  onTogglePremise: (id: NodeId) => void;
  onDropPremise: (id: NodeId) => void;
  onJustify: (id: string) => void;
  onVerify: () => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
  txt: (id: NodeId) => string;
  /** Texte réel des affirmations (choix de la cible), même pour une étape effacée. */
  realTxt: (id: NodeId) => string;
  refOf: (id: NodeId) => string;
  /** Étape effacée : blocs qui l'utilisent. */
  holeUsers?: string;
}

/** Repère d'un fait : H2 pour une hypothèse, (3) pour le bloc 3. */
function RefBadge({ label, title }: { label: string; title?: string }) {
  return (
    <span className="mt-px shrink-0 rounded bg-surface-3 px-1 font-mono text-[11px] leading-[18px] text-text-2" title={title}>
      {label}
    </span>
  );
}

const plain = (s: string) => s.replace(/\$/g, '');

function BlockCard(p: BlockCardProps) {
  const { block: b, spec, session } = p;
  const meta = BLOCK_META[b.kind];
  const node = b.node ? nodeOf(spec, b.node) : undefined;
  const status = b.kind === 'intro' ? 'hypothese' : b.node ? session.analysis.status[b.node] ?? 'absent' : 'absent';
  const established = b.kind !== 'intro' && b.node ? session.analysis.grounded.has(b.node) : false;
  const verdict = p.feedbackHere ? session.feedback?.verdict : undefined;
  // Un bloc figé de la preuve modèle reste replié ; un bloc établi se replie dès qu'on le quitte.
  const collapsed = Boolean(b.node) && (b.lock === 'tout' || (established && !p.active));
  const fixed = Boolean(b.lock);
  const [dragOver, setDragOver] = useState(false);

  return (
    <li
      className={cx('relative', p.framed && 'ml-4')}
      data-bloc={p.index}
      data-kind={b.kind}
      data-node={b.node ?? ''}
      data-status={status}
      data-testid={`bloc-${p.index}`}
      data-trou={b.hole}
      data-verrou={b.lock}
    >
      {p.framed && <span aria-hidden className="absolute -left-3 top-0 bottom-0 w-0.5 rounded" style={{ background: 'var(--st-invalid)', opacity: 0.55 }} />}
      {p.frameStart && <div className="mb-1 font-mono text-[10.5px] uppercase tracking-wider" style={{ color: 'var(--st-invalid)' }}>Raisonnement par l’absurde</div>}
      <div
        className={cx('rounded-lg border bg-surface p-3 transition-colors', p.active ? 'border-line-strong' : 'border-line', dragOver && 'border-accent')}
        style={{ borderLeft: `4px solid ${meta.color}` }}
        onClick={p.onActivate}
        onDragOver={(e) => {
          if (b.kind === 'intro') return;
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          if (b.kind === 'intro') return;
          e.preventDefault();
          setDragOver(false);
          const id = e.dataTransfer.getData('text/plain');
          if (id) p.onDropPremise(id);
        }}
      >
        <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-[12px] font-medium" style={{ color: meta.color }}>
            <span className="font-mono text-[11px] text-text-3">{p.index + 1}</span>
            <span aria-hidden className="font-mono">{meta.symbol}</span>
            {meta.label}
          </span>
          <span className="flex items-center gap-1.5">
            {b.kind !== 'intro' && b.node && status !== 'absent' && <StatusBadge status={status} />}
            {!fixed && !b.hole && (
              <>
                <IconBtn label="Monter" onClick={() => p.onMove(-1)}>↑</IconBtn>
                <IconBtn label="Descendre" onClick={() => p.onMove(1)}>↓</IconBtn>
                <IconBtn label="Retirer le bloc" onClick={p.onRemove} testId={`retirer-bloc-${p.index}`}>×</IconBtn>
              </>
            )}
          </span>
        </div>

        {b.kind === 'intro' ? (
          <p className="text-[14px]">
            <MathText text={p.txt(b.node!)} terms />
          </p>
        ) : collapsed ? (
          <div className="space-y-1" data-testid="bloc-replie">
            <div className="flex flex-wrap items-start gap-1 text-[12.5px] text-text-2">
              <span className="pt-px font-mono text-[11px] uppercase tracking-wide text-text-3">De</span>
              {b.premises.length ? b.premises.map((id) => <RefBadge key={id} label={p.refOf(id)} title={plain(p.txt(id))} />) : <span className="text-text-3">rien d’autre</span>}
              {b.justification && (
                <>
                  <span className="ml-1 pt-px font-mono text-[11px] uppercase tracking-wide text-text-3">car</span>
                  <span className="min-w-0 flex-1 line-clamp-2" title={plain(spec.justifications.find((j) => j.id === b.justification)?.label ?? '')}>
                    <MathText text={spec.justifications.find((j) => j.id === b.justification)?.label ?? ''} />
                  </span>
                </>
              )}
            </div>
            <p className="text-[14.5px]">
              <span aria-hidden className="mr-1.5 font-mono" style={{ color: meta.color }}>
                ⟹
              </span>
              <MathText text={p.txt(b.node!)} terms />
            </p>
            {!fixed && (
              <button type="button" className="text-[12px] text-text-3 underline hover:text-text-2 cursor-pointer" onClick={p.onActivate}>
                Modifier
              </button>
            )}
            {b.lock === 'tout' && !established && (
              <p className="text-[12px] text-text-3">Bloc de la preuve modèle : il sera établi quand les étapes qu’il utilise le seront.</p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {b.hole && !established && (
              <p className="rounded-md border border-dashed border-line bg-surface-2 px-2.5 py-1.5 text-[12.5px] text-text-2" data-testid="trou-consigne">
                Étape effacée de la preuve modèle, à reconstruire{p.holeUsers ? ` : elle sert à ${p.holeUsers}` : ''}.
              </p>
            )}
            <SlotRow label="Si" hint="prémisses">
              {b.premises.length === 0 ? (
                <span className="text-[13px] text-text-3">aucune prémisse</span>
              ) : (
                <span className="flex flex-wrap items-center gap-1">
                  {b.premises.map((id, i) => (
                    <span key={id} className="flex items-center gap-1">
                      {i > 0 && <span className="font-mono text-[11px] text-text-3">et</span>}
                      <span className="inline-flex max-w-full items-start gap-1 rounded-md border border-line bg-surface-2 px-1.5 py-0.5 text-[12.5px]" data-premisse={id}>
                        <RefBadge label={p.refOf(id)} />
                        <span className="min-w-0 line-clamp-2">
                          <MathText text={p.txt(id)} />
                        </span>
                        {!fixed && (
                          <button type="button" aria-label="Retirer cette prémisse" className="text-text-3 hover:text-invalid cursor-pointer" onClick={() => p.onTogglePremise(id)}>
                            ×
                          </button>
                        )}
                      </span>
                    </span>
                  ))}
                </span>
              )}
              {!fixed && (
                <button type="button" className="ml-1 text-[12px] text-accent hover:underline cursor-pointer" onClick={() => p.onOpen('premisses')} aria-expanded={p.openSlot === 'premisses'} data-testid="ajouter-premisse">
                  + prémisse
                </button>
              )}
            </SlotRow>
            {p.openSlot === 'premisses' && (
              <PremisePicker spec={spec} block={b} facts={p.facts} session={session} introduced={p.introduced} txt={p.txt} onToggle={p.onTogglePremise} />
            )}

            <SlotRow label="alors" hint="affirmation">
              {node ? (
                <span className="text-[14px]">
                  {node.id === spec.goal && <span className="mr-1 font-mono text-[10.5px] uppercase tracking-wider text-miss">But</span>}
                  <MathText text={p.txt(node.id)} terms />
                </span>
              ) : (
                <span className="text-[13px] text-text-3">à choisir</span>
              )}
              {b.kind !== 'conclusion' && !fixed && (
                <button type="button" className="ml-1 text-[12px] text-accent hover:underline cursor-pointer" onClick={() => p.onOpen('cible')} aria-expanded={p.openSlot === 'cible'} data-testid="choisir-cible">
                  {node ? 'changer' : 'choisir'}
                </button>
              )}
            </SlotRow>
            {p.openSlot === 'cible' && <TargetPicker spec={spec} kind={b.kind} visible={p.visible} taken={p.taken} current={b.node} txt={p.realTxt} showAll={p.showAll} onShowAll={p.onShowAll} onPick={p.onTarget} />}

            <SlotRow label="car" hint="justification">
              {b.justification ? (
                <span className="text-[13.5px]">
                  <MathText text={spec.justifications.find((j) => j.id === b.justification)?.label ?? b.justification} terms />
                </span>
              ) : (
                <span className="text-[13px] text-text-3">à choisir</span>
              )}
              <button type="button" className="ml-1 text-[12px] text-accent hover:underline cursor-pointer" onClick={() => p.onOpen('justification')} aria-expanded={p.openSlot === 'justification'} data-testid="choisir-justification">
                {b.justification ? 'changer' : 'choisir'}
              </button>
            </SlotRow>
            {p.openSlot === 'justification' && <JustificationPicker spec={spec} kind={b.kind} current={b.justification} onPick={p.onJustify} />}

            {node?.check && !session.passedChecks.has(node.id) && (
              <div className="rounded-md border border-line p-2.5">
                <CheckInput check={node.check} onResult={(r) => r.status === 'valide' && session.passCheck(node.id)} />
              </div>
            )}
            {node?.check && session.passedChecks.has(node.id) && (
              <p className="text-[13px] text-hyp" role="status" data-testid="check-passed">
                <span aria-hidden>✓ </span>Calcul exact validé. Il reste à justifier l’étape.
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <Button variant="primary" onClick={p.onVerify} data-testid="verifier-bloc">
                Vérifier le bloc
              </Button>
              {node && (
                <span className="font-mono text-[11px] text-text-3">{node.id === spec.goal ? 'But' : NODE_KIND_LABEL[node.kind]}</span>
              )}
            </div>
          </div>
        )}

        {p.notice && (
          <p className="mt-2 text-[13px] text-miss" role="status">
            {p.notice}
          </p>
        )}
        {verdict && !collapsed && <Verdict verdict={verdict} />}
      </div>
    </li>
  );
}

function IconBtn({ label, onClick, children, testId }: { label: string; onClick: () => void; children: ReactNode; testId?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="rounded px-1.5 text-[13px] leading-5 text-text-3 hover:bg-surface-2 hover:text-text cursor-pointer"
      data-testid={testId}
    >
      {children}
    </button>
  );
}

function SlotRow({ label, hint, children }: { label: string; hint: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[52px_minmax(0,1fr)] items-start gap-2">
      <span className="pt-0.5 text-right font-mono text-[12px] font-semibold uppercase tracking-wide text-text-2" title={hint}>
        {label}
      </span>
      <div className="flex min-w-0 flex-wrap items-center gap-1">{children}</div>
    </div>
  );
}

function PremisePicker({
  spec,
  block,
  facts,
  session,
  introduced,
  txt,
  onToggle,
}: {
  spec: ProofSpec;
  block: Block;
  facts: ProofNodeSpec[];
  session: ProofSession;
  introduced: ReadonlySet<NodeId>;
  txt: (id: NodeId) => string;
  onToggle: (id: NodeId) => void;
}) {
  // Faits établis, puis affirmations posées non encore établies (raisonnement à rebours).
  const pending = spec.nodes.filter(
    (n) => !isGiven(n) && n.id !== block.node && session.graph.placed.includes(n.id) && !session.analysis.grounded.has(n.id),
  );
  const notIntroduced = spec.nodes.filter((n) => isGiven(n) && n.local && !introduced.has(n.id));
  const row = (n: ProofNodeSpec, tag?: string) => (
    <li key={n.id}>
      <label className="flex items-start gap-2 text-[13px] cursor-pointer">
        <input type="checkbox" className="mt-1 shrink-0" checked={block.premises.includes(n.id)} onChange={() => onToggle(n.id)} data-testid={`premisse-${n.id}`} />
        <span>
          {tag && <span className="mr-1 font-mono text-[10px] uppercase tracking-wider text-text-3">{tag}</span>}
          <MathText text={txt(n.id)} />
        </span>
      </label>
    </li>
  );
  return (
    <div className="ml-[60px] rounded-md border border-line bg-surface-2 p-2 anim-rise" data-testid="choix-premisses">
      <ul className="max-h-60 space-y-1 overflow-auto pr-1">
        {facts.filter((n) => n.id !== block.node).map((n) => row(n))}
        {pending.map((n) => row(n, 'à établir'))}
      </ul>
      {notIntroduced.length > 0 && (
        <p className="mt-1.5 text-[12px] text-text-3">
          Les hypothèses locales (« Soit… », « Supposons… ») apparaissent ici une fois introduites par un bloc.
        </p>
      )}
    </div>
  );
}

function TargetPicker({
  spec,
  kind,
  visible,
  taken,
  current,
  txt,
  showAll,
  onShowAll,
  onPick,
}: {
  spec: ProofSpec;
  kind: BlockKind;
  visible: ReadonlySet<NodeId>;
  taken: ReadonlySet<NodeId>;
  current: NodeId | null;
  txt: (id: NodeId) => string;
  showAll: boolean;
  onShowAll: () => void;
  onPick: (id: NodeId) => void;
}) {
  const others = new Set(taken);
  if (current) others.delete(current);
  const { recommended, others: rest } = targetCandidates(spec, kind, visible, others);
  const list = (items: ProofNodeSpec[]) => (
    <ul className="space-y-1">
      {items.map((n) => (
        <li key={n.id}>
          <button
            type="button"
            onClick={() => onPick(n.id)}
            className={cx('w-full rounded-md border px-2 py-1 text-left text-[13px] cursor-pointer', n.id === current ? 'border-accent' : 'border-line hover:border-line-strong')}
            data-testid={`cible-${n.id}`}
          >
            <span className="mr-1 font-mono text-[10px] uppercase tracking-wider text-text-3">{n.id === spec.goal ? 'But' : NODE_KIND_LABEL[n.kind]}</span>
            <MathText text={txt(n.id)} />
          </button>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="ml-[60px] rounded-md border border-line bg-surface-2 p-2 anim-rise" data-testid="choix-cible">
      {recommended.length > 0 ? list(recommended) : <p className="text-[12.5px] text-text-3">Aucune affirmation de ce type n’est disponible pour l’instant.</p>}
      {rest.length > 0 && (
        <>
          <button type="button" className="mt-1.5 text-[12px] text-text-3 underline hover:text-text-2 cursor-pointer" onClick={onShowAll} aria-expanded={showAll}>
            {showAll ? 'Masquer les autres affirmations' : `Autres affirmations (${rest.length})`}
          </button>
          {showAll && <div className="mt-1.5">{list(rest)}</div>}
        </>
      )}
      {visible.size < spec.nodes.length && (
        <p className="mt-1.5 text-[11.5px] text-text-3">Banque progressive : d’autres affirmations apparaîtront à mesure que tu établis ce dont elles dépendent.</p>
      )}
    </div>
  );
}

function JustificationPicker({ spec, kind, current, onPick }: { spec: ProofSpec; kind: BlockKind; current: string | null; onPick: (id: string) => void }) {
  const { recommended, others } = justificationCandidates(spec, kind);
  const list = (items: ProofSpec['justifications']) => (
    <ul className="space-y-1">
      {items.map((j) => (
        <li key={j.id}>
          <button
            type="button"
            onClick={() => onPick(j.id)}
            className={cx('w-full rounded-md border px-2 py-1 text-left text-[13px] cursor-pointer', j.id === current ? 'border-accent' : 'border-line hover:border-line-strong')}
            data-testid={`justif-${j.id}`}
          >
            {j.theorem && <span className="mr-1 font-mono text-[10px] uppercase tracking-wider text-access">Théorème</span>}
            <MathText text={j.label} />
          </button>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="ml-[60px] rounded-md border border-line bg-surface-2 p-2 anim-rise max-h-72 overflow-auto" data-testid="choix-justification">
      {list(recommended)}
      {others.length > 0 && (
        <>
          <div className="mb-1 mt-2 font-mono text-[10px] uppercase tracking-wider text-text-3">Autres justifications</div>
          {list(others)}
        </>
      )}
    </div>
  );
}

function Verdict({ verdict }: { verdict: NonNullable<ProofSession['feedback']>['verdict'] }) {
  if (verdict.status === 'donne' || verdict.status === 'retire') return null;
  if (verdict.status === 'valide') {
    return (
      <p className="mt-2 text-[13px] text-proved" role="status" data-testid="verdict-bloc">
        <span className="font-semibold">Validé. </span>Ce bloc suit une règle explicite à partir des prémisses choisies.
      </p>
    );
  }
  if (verdict.status === 'circulaire' || verdict.status === 'incorrect') {
    return (
      <div className="mt-2 space-y-1 text-[13px] text-invalid" role="status" data-testid="verdict-bloc">
        <p>
          <span className="font-semibold">Incorrect. </span>
          <MathText text={verdict.message} terms />
        </p>
        {verdict.status === 'incorrect' && verdict.counterexample && (
          <p className="text-text">
            <span className="font-mono text-[11px] text-text-3">Contre-exemple : </span>
            <MathText text={verdict.counterexample} terms />
          </p>
        )}
      </div>
    );
  }
  return (
    <p className="mt-2 text-[13px] text-miss" role="status" data-testid="verdict-bloc">
      <span className="font-semibold">À justifier. </span>
      <MathText text={verdict.message} terms />
    </p>
  );
}

function WrittenProof({
  spec,
  blocks,
  grounded,
  txt,
  refOf,
  framed,
}: {
  spec: ProofSpec;
  blocks: Block[];
  grounded: ReadonlySet<NodeId>;
  txt: (id: NodeId) => string;
  refOf: (id: NodeId) => string;
  framed: ReadonlySet<string>;
}) {
  const lines = blocks.filter((b) => b.node && (b.kind === 'intro' || grounded.has(b.node)));
  return (
    <Card className="p-4" data-testid="preuve-redigee">
      <SectionTitle className="mb-2">Démonstration rédigée</SectionTitle>
      {lines.length === 0 ? (
        <p className="text-[13.5px] text-text-3">Seuls les blocs établis apparaissent ici, dans l’ordre de la démonstration.</p>
      ) : (
        <ol className="space-y-1.5 text-[14px]">
          {lines.map((b) => (
            <li key={b.key} className={cx('flex gap-2', framed.has(b.key) && 'ml-4 border-l-2 pl-2')} style={framed.has(b.key) ? { borderColor: 'var(--st-invalid)' } : undefined}>
              <span className="shrink-0 pt-0.5 font-mono text-[12px] text-text-3">{refOf(b.node!)}</span>
              <Prose text={blockSentence(spec, b, txt, refOf)} terms className="min-w-0" />
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}
