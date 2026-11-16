/**
 * Graphe des dépendances d'une preuve, de haut en bas : les hypothèses (bande du haut), puis
 * les étapes par niveaux, jusqu'au but, toujours en bas. Une flèche A → B signifie que B est
 * obtenue à partir de A. La mise en page est calculée (`graph-layout.ts`) : les flèches ne
 * passent jamais derrière une carte, et l'ordre des cartes limite les croisements.
 *
 * Survoler ou sélectionner une étape met en évidence ce dont elle dépend et ce qu'elle sert
 * à établir ; une fiche donne son énoncé complet et sa justification.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ProofNodeSpec, ProofSpec } from '@/content/schema';
import { isGiven, type GraphAnalysis, type NodeId, type NodeStatus, type PlayerGraph } from '@/core/proof-engine/engine';
import { cx, STATUS_META } from '@/components/ui';
import { MathText } from '@/components/Math';
import { nodeText } from './text';
import { DEFAULT_DIMS, layoutGraph, type GraphLayout } from './graph-layout';

export interface GraphModel {
  layout: GraphLayout;
  /** Repères : H1… (hypothèses), S1… (objets introduits), (1)… (étapes, dans l'ordre de lecture). */
  refs: Map<NodeId, string>;
  /** Le but n'est pas encore posé : il est dessiné en pointillé. */
  ghostGoal: boolean;
}

/** Modèle du graphe : étapes posées (et but), arêtes entre étapes, repères. */
export function useGraphModel(spec: ProofSpec, graph: PlayerGraph): GraphModel {
  return useMemo(() => buildGraphModel(spec, graph), [spec, graph]);
}

export function buildGraphModel(spec: ProofSpec, graph: PlayerGraph): GraphModel {
  const byId = new Map(spec.nodes.map((n) => [n.id, n]));
  const steps = spec.nodes.filter((n) => !isGiven(n) && graph.placed.includes(n.id)).map((n) => n.id);
  const ghostGoal = !steps.includes(spec.goal);
  const drawn = ghostGoal ? [...steps, spec.goal] : steps;
  const edges = steps.flatMap((to) =>
    (graph.steps[to]?.premises ?? []).filter((p) => byId.has(p) && !isGiven(byId.get(p)!) && drawn.includes(p)).map((from) => ({ from, to })),
  );
  const layout = layoutGraph({ nodes: drawn, edges, goal: spec.goal });
  const refs = new Map<NodeId, string>();
  spec.nodes.filter((n) => isGiven(n) && !n.local).forEach((n, i) => refs.set(n.id, `H${i + 1}`));
  spec.nodes.filter((n) => isGiven(n) && n.local).forEach((n, i) => refs.set(n.id, `S${i + 1}`));
  let k = 0;
  for (const id of layout.order) {
    if (ghostGoal && id === spec.goal) continue;
    k += 1;
    refs.set(id, `(${k})`);
  }
  return { layout, refs, ghostGoal };
}

const EDGE_STYLE: Record<NodeStatus, { color: string; dash?: string }> = {
  demontre: { color: 'var(--st-proved)' },
  accessible: { color: 'var(--st-access)', dash: '5 4' },
  'a-justifier': { color: 'var(--st-miss)', dash: '5 4' },
  incorrect: { color: 'var(--st-invalid)', dash: '5 4' },
  circulaire: { color: 'var(--st-invalid)', dash: '2 4' },
  hypothese: { color: 'var(--st-hyp)' },
  manquant: { color: 'var(--st-miss)', dash: '2 4' },
  absent: { color: 'var(--line-strong)', dash: '2 4' },
};

export function ProofGraph({
  spec,
  graph,
  analysis,
  model,
  selected,
  passedChecks,
  onSelect,
}: {
  spec: ProofSpec;
  graph: PlayerGraph;
  analysis: GraphAnalysis;
  model: GraphModel;
  selected: NodeId | null;
  passedChecks: ReadonlySet<NodeId>;
  onSelect: (id: NodeId) => void;
}) {
  const [hovered, setHovered] = useState<NodeId | null>(null);
  const { layout, refs, ghostGoal } = model;
  const byId = useMemo(() => new Map(spec.nodes.map((n) => [n.id, n])), [spec]);
  const givens = spec.nodes.filter((n) => isGiven(n));
  const active = hovered ?? selected;
  const premisesOf = (id: NodeId) => graph.steps[id]?.premises ?? [];
  const usersOf = (id: NodeId) => graph.placed.filter((x) => premisesOf(x).includes(id));
  const related = useMemo(() => {
    if (!active) return null;
    return new Set<NodeId>([active, ...premisesOf(active), ...usersOf(active)]);
  }, [active, graph]); // eslint-disable-line react-hooks/exhaustive-deps
  const txt = (n: ProofNodeSpec) => nodeText(n, passedChecks);
  const refList = (ids: NodeId[]) => ids.map((id) => refs.get(id) ?? '?').join(', ');

  // L'étape choisie (ou tout juste posée) reste dans le cadre : défilement horizontal du graphe seul.
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current;
    const p = selected ? layout.nodes.get(selected) : undefined;
    if (!el || !p) return;
    if (p.x < el.scrollLeft) el.scrollLeft = Math.max(0, p.x - 16);
    else if (p.x + p.w > el.scrollLeft + el.clientWidth) el.scrollLeft = p.x + p.w - el.clientWidth + 16;
  }, [selected, layout]);

  return (
    <div className="space-y-3">
      {/* Hypothèses et objets introduits : la base du graphe. */}
      <div className="rounded-md border border-line bg-surface-2/40 p-2.5" data-testid="bande-hypotheses">
        <div className="mb-1.5 font-mono text-[10.5px] uppercase tracking-wider text-text-3">Hypothèses et données</div>
        <ul className="flex flex-wrap gap-1.5">
          {givens.map((n) => {
            const used = related?.has(n.id) && active !== n.id;
            return (
              <li
                key={n.id}
                className={cx(
                  'flex max-w-full items-start gap-1.5 rounded-md border px-2 py-1 text-[12.5px] transition-opacity',
                  used ? 'border-accent' : 'border-line',
                  related && !used && 'opacity-50',
                )}
                style={{ borderLeft: `3px solid ${STATUS_META[analysis.status[n.id] ?? 'hypothese'].color}` }}
                data-donnee={n.id}
              >
                <span className="shrink-0 rounded bg-surface-3 px-1 font-mono text-[11px] text-text-2">{refs.get(n.id)}</span>
                <span className="min-w-0">
                  <MathText text={n.text} terms />
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div ref={box} className="relative overflow-auto rounded-lg border border-line lab-grid" data-testid="proof-graph">
        <div className="relative mx-auto" style={{ width: layout.width, height: layout.height }}>
          <svg className="pointer-events-none absolute left-0 top-0" width={layout.width} height={layout.height} aria-hidden>
            <defs>
              <marker id="pl-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
                <path d="M0,0 L8,4 L0,8 z" fill="context-stroke" />
              </marker>
            </defs>
            {layout.edges.map((e) => {
              const st = e.back ? 'circulaire' : (analysis.status[e.to] ?? 'a-justifier');
              const style = EDGE_STYLE[st] ?? EDGE_STYLE['a-justifier'];
              const lit = active !== null && (e.to === active || e.from === active);
              const dim = active !== null && !lit;
              return (
                <path
                  key={`${e.from}->${e.to}`}
                  d={e.d}
                  fill="none"
                  stroke={lit ? 'var(--accent)' : style.color}
                  strokeWidth={lit ? 2.4 : 1.6}
                  strokeDasharray={lit ? undefined : style.dash}
                  markerEnd="url(#pl-arrow)"
                  opacity={dim ? 0.16 : 0.9}
                  data-arete={`${e.from}->${e.to}`}
                />
              );
            })}
          </svg>

          {[...layout.nodes.values()].map((p) => {
            const node = byId.get(p.id)!;
            const ghost = ghostGoal && p.id === spec.goal;
            const status: NodeStatus = ghost ? 'absent' : (analysis.status[p.id] ?? 'absent');
            const m = STATUS_META[status];
            const premises = premisesOf(p.id);
            const givenRefs = premises.filter((x) => byId.get(x) && isGiven(byId.get(x)!)).map((x) => refs.get(x)!);
            const users = usersOf(p.id);
            const isActive = active === p.id;
            const dim = related !== null && !related.has(p.id);
            const label = ghost
              ? 'But à démontrer, pas encore posé.'
              : `${refs.get(p.id)}. ${p.id === spec.goal ? 'But. ' : ''}État : ${m.label}.${premises.length ? ` Dépend de ${refList(premises)}.` : ' Aucune prémisse.'}${users.length ? ` Sert à ${refList(users)}.` : ''}`;
            return (
              <button
                key={p.id}
                type="button"
                disabled={ghost}
                onClick={() => onSelect(p.id)}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered((h) => (h === p.id ? null : h))}
                onFocus={(e) => {
                  // La fiche suit le survol et le focus au clavier, pas le clic (l'inspecteur montre déjà l'étape choisie).
                  if (e.currentTarget.matches(':focus-visible')) setHovered(p.id);
                }}
                onBlur={() => setHovered((h) => (h === p.id ? null : h))}
                aria-pressed={selected === p.id}
                aria-label={label}
                className={cx(
                  'absolute flex flex-col overflow-hidden rounded-md border px-2 py-1.5 text-left transition-[opacity,box-shadow]',
                  ghost ? 'cursor-default border-dashed border-line-strong bg-surface/70' : 'cursor-pointer bg-surface hover:border-line-strong',
                  selected === p.id ? 'border-accent ring-1 ring-accent' : !ghost && 'border-line',
                  p.id === spec.goal && !ghost && 'border-dashed',
                  dim && 'opacity-50',
                  isActive && 'z-10 shadow-lg',
                )}
                style={{ left: p.x, top: p.y, width: p.w, height: p.h, borderLeft: `3px solid ${m.color}`, background: !ghost && m.bg !== 'transparent' ? m.bg : undefined }}
                data-node={p.id}
                data-status={ghost ? 'absent' : status}
                data-ref={ghost ? 'but' : refs.get(p.id)}
              >
                <span className="mb-0.5 flex items-center gap-1 text-[10.5px] leading-4">
                  <span className="shrink-0 rounded bg-surface-3 px-1 font-mono text-text-2">{p.id === spec.goal ? 'But' : refs.get(p.id)}</span>
                  {givenRefs.length > 0 && (
                    <span className="min-w-0 truncate font-mono text-text-3" title={`Hypothèses utilisées : ${givenRefs.join(', ')}`}>
                      {givenRefs.join(' ')}
                    </span>
                  )}
                  <span className="ml-auto shrink-0 font-mono" style={{ color: m.color }} aria-hidden>
                    {ghost ? '…' : m.glyph}
                  </span>
                </span>
                <span className="line-clamp-3 text-[12.5px] leading-[1.35]">
                  <MathText text={txt(node)} />
                </span>
              </button>
            );
          })}

          {hovered && layout.nodes.has(hovered) && !(ghostGoal && hovered === spec.goal) && (
            <StepCard
              spec={spec}
              node={byId.get(hovered)!}
              status={analysis.status[hovered] ?? 'absent'}
              place={layout.nodes.get(hovered)!}
              width={layout.width}
              height={layout.height}
              premises={premisesOf(hovered)}
              users={usersOf(hovered)}
              justification={graph.steps[hovered]?.justification ?? null}
              refList={refList}
              txt={txt}
            />
          )}
        </div>
      </div>

      <div className="space-y-1.5 text-[12px] text-text-3" data-testid="legende-graphe">
        <p>
          <span className="text-text-2">Lecture :</span> une flèche A → B signifie que B est obtenue à partir de A. Les hypothèses utilisées par une étape sont rappelées sur sa carte (H1, H2…). Survole ou sélectionne une étape pour voir ce dont elle dépend et ce qu’elle sert à établir.
        </p>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <LineSample color="var(--st-proved)" /> étape établie
          <LineSample color="var(--st-miss)" dash="5 4" /> pas encore établie
          <LineSample color="var(--st-invalid)" dash="2 4" /> dépendance circulaire
        </p>
      </div>
      {graph.placed.length === 0 && (
        <p className="text-[13px] text-text-2">Pose une proposition depuis la banque : elle apparaîtra ici, reliée à ce dont elle dépend, jusqu’au but en bas.</p>
      )}
    </div>
  );
}

function LineSample({ color, dash }: { color: string; dash?: string }) {
  return (
    <svg width="28" height="8" aria-hidden className="inline-block">
      <line x1="1" y1="4" x2="27" y2="4" stroke={color} strokeWidth="2" strokeDasharray={dash} />
    </svg>
  );
}

/** Fiche d'une étape survolée : énoncé complet, justification, dépendances. */
function StepCard({
  spec,
  node,
  status,
  place,
  width,
  height,
  premises,
  users,
  justification,
  refList,
  txt,
}: {
  spec: ProofSpec;
  node: ProofNodeSpec;
  status: NodeStatus;
  place: { x: number; y: number; w: number; h: number };
  width: number;
  height: number;
  premises: NodeId[];
  users: NodeId[];
  justification: string | null;
  refList: (ids: NodeId[]) => string;
  txt: (n: ProofNodeSpec) => string;
}) {
  const W = Math.min(300, Math.max(width - 16, 200));
  const left = Math.max(8, Math.min(place.x + place.w / 2 - W / 2, width - W - 8));
  const below = place.y + place.h + 8;
  const placeAbove = below + 150 > height && place.y > 160;
  const just = spec.justifications.find((j) => j.id === justification)?.label;
  return (
    <div
      className="pointer-events-none absolute z-20 rounded-md border border-line-strong bg-surface p-2.5 text-[12.5px] shadow-xl"
      style={{ left, width: W, ...(placeAbove ? { bottom: height - place.y + 8 } : { top: below }) }}
      data-testid="fiche-etape"
      role="presentation"
    >
      <p className="mb-1 font-mono text-[10.5px] uppercase tracking-wider" style={{ color: STATUS_META[status].color }}>
        {node.id === spec.goal ? 'But · ' : ''}
        {STATUS_META[status].label}
      </p>
      <p className="mb-1.5 text-[13px]">
        <MathText text={txt(node)} />
      </p>
      <p className="text-text-2">
        <span className="font-mono text-[10.5px] uppercase tracking-wider text-text-3">Dépend de </span>
        {premises.length ? refList(premises) : 'rien pour l’instant'}
      </p>
      {just && (
        <p className="text-text-2">
          <span className="font-mono text-[10.5px] uppercase tracking-wider text-text-3">Car </span>
          <MathText text={just} />
        </p>
      )}
      {users.length > 0 && (
        <p className="text-text-2">
          <span className="font-mono text-[10.5px] uppercase tracking-wider text-text-3">Sert à </span>
          {refList(users)}
        </p>
      )}
    </div>
  );
}

export const GRAPH_DIMS = DEFAULT_DIMS;
