/**
 * Graphe de preuve : couches de haut en bas (données, puis étapes par profondeur).
 * Le rendu HTML + SVG reste entièrement utilisable au clavier et par un lecteur d'écran.
 */
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ProofSpec } from '@/content/schema';
import { NODE_KIND_LABEL } from '@/content/schema';
import { isGiven, type GraphAnalysis, type NodeId, type PlayerGraph } from '@/core/proof-engine/engine';
import { cx, STATUS_META, StatusBadge } from '@/components/ui';
import { MathText } from '@/components/Math';
import { nodeText } from './text';

interface Edge {
  from: NodeId;
  to: NodeId;
}

/** Profondeur d'un nœud : 0 pour une donnée, 1 + max sur ses prémisses sinon. */
function computeLayers(spec: ProofSpec, graph: PlayerGraph): Map<NodeId, number> {
  const given = new Set(spec.nodes.filter(isGiven).map((n) => n.id));
  const memo = new Map<NodeId, number>();
  const visiting = new Set<NodeId>();
  const depth = (id: NodeId): number => {
    const known = memo.get(id);
    if (known !== undefined) return known;
    if (given.has(id)) return 0;
    if (visiting.has(id)) return 1; // cycle : le moteur le signale séparément
    visiting.add(id);
    const premises = graph.steps[id]?.premises ?? [];
    const d = premises.length === 0 ? 1 : 1 + Math.max(...premises.map(depth));
    visiting.delete(id);
    memo.set(id, d);
    return d;
  };
  for (const id of graph.placed) depth(id);
  for (const s of Object.values(graph.steps)) s.premises.forEach(depth);
  return memo;
}

export function ProofGraph({
  spec,
  graph,
  analysis,
  selected,
  passedChecks,
  onSelect,
}: {
  spec: ProofSpec;
  graph: PlayerGraph;
  analysis: GraphAnalysis;
  selected: NodeId | null;
  passedChecks: ReadonlySet<NodeId>;
  onSelect: (id: NodeId) => void;
}) {
  const layers = useMemo(() => computeLayers(spec, graph), [spec, graph]);
  const rows = useMemo(() => {
    const byDepth = new Map<number, NodeId[]>();
    for (const [id, d] of layers) {
      if (!byDepth.has(d)) byDepth.set(d, []);
      byDepth.get(d)!.push(id);
    }
    return [...byDepth.entries()].sort(([a], [b]) => a - b).map(([, ids]) => ids);
  }, [layers]);

  const edges: Edge[] = useMemo(
    () => graph.placed.flatMap((to) => (graph.steps[to]?.premises ?? []).map((from) => ({ from, to }))),
    [graph],
  );

  const container = useRef<HTMLDivElement>(null);
  const cardRefs = useRef(new Map<NodeId, HTMLButtonElement>());
  const [paths, setPaths] = useState<{ d: string; color: string; key: string }[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const measure = () => {
    const root = container.current;
    if (!root) return;
    const box = root.getBoundingClientRect();
    const next: typeof paths = [];
    for (const { from, to } of edges) {
      const a = cardRefs.current.get(from);
      const b = cardRefs.current.get(to);
      if (!a || !b) continue;
      const ra = a.getBoundingClientRect();
      const rb = b.getBoundingClientRect();
      const x1 = ra.left + ra.width / 2 - box.left + root.scrollLeft;
      const y1 = ra.bottom - box.top + root.scrollTop;
      const x2 = rb.left + rb.width / 2 - box.left + root.scrollLeft;
      const y2 = rb.top - box.top + root.scrollTop;
      const my = (y1 + y2) / 2;
      const st = analysis.status[to] ?? 'a-justifier';
      next.push({ key: `${from}->${to}`, d: `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`, color: STATUS_META[st].color });
    }
    setPaths(next);
    setSize({ w: root.scrollWidth, h: root.scrollHeight });
  };

  useLayoutEffect(measure, [edges, rows, analysis]);
  useEffect(() => {
    const root = container.current;
    if (!root) return;
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    return () => ro.disconnect();
  });

  if (graph.placed.length === 0) {
    return (
      <div className="lab-grid h-full min-h-72 rounded-lg border border-dashed border-line flex items-center justify-center p-8 text-center">
        <p className="text-text-2 max-w-sm">
          Pose une proposition depuis la banque pour commencer. Chaque assertion devra être justifiée à partir de ce qui
          est déjà établi.
        </p>
      </div>
    );
  }

  return (
    <div ref={container} className="lab-grid relative h-full min-h-72 overflow-auto rounded-lg border border-line p-5" data-testid="proof-graph">
      <svg className="absolute left-0 top-0 pointer-events-none" width={size.w} height={size.h} aria-hidden>
        <defs>
          <marker id="pl-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 z" fill="context-stroke" />
          </marker>
        </defs>
        {paths.map((p) => (
          <path key={p.key} d={p.d} fill="none" stroke={p.color} strokeWidth={1.4} markerEnd="url(#pl-arrow)" opacity={0.8} />
        ))}
      </svg>
      <ol className="relative flex flex-col gap-9" aria-label="Graphe de la preuve">
        {rows.map((ids, i) => (
          <li key={i}>
            <ul className="flex flex-wrap justify-center gap-3">
              {ids.map((id) => {
                const node = spec.nodes.find((n) => n.id === id)!;
                const status = analysis.status[id] ?? 'absent';
                const m = STATUS_META[status];
                const premises = graph.steps[id]?.premises ?? [];
                return (
                  <li key={id} className="anim-rise">
                    <button
                      type="button"
                      ref={(el) => {
                        if (el) cardRefs.current.set(id, el);
                        else cardRefs.current.delete(id);
                      }}
                      onClick={() => onSelect(id)}
                      aria-pressed={selected === id}
                      aria-label={`${NODE_KIND_LABEL[node.kind]}. État : ${m.label}.${premises.length ? ` Dépend de ${premises.length} prémisse${premises.length > 1 ? 's' : ''}.` : ''}`}
                      className={cx(
                        'group block w-64 max-w-full text-left rounded-md border bg-surface px-3 py-2 transition-colors cursor-pointer',
                        selected === id ? 'border-accent ring-1 ring-accent' : 'border-line hover:border-line-strong',
                        id === spec.goal && 'border-dashed',
                      )}
                      style={{ borderLeft: `3px solid ${m.color}`, background: m.bg === 'transparent' ? undefined : m.bg }}
                      data-node={id}
                      data-status={status}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-text-3">{id === spec.goal ? 'But' : NODE_KIND_LABEL[node.kind]}</span>
                        <StatusBadge status={status} />
                      </div>
                      <div className="text-[13.5px] leading-snug">
                        <MathText text={nodeText(node, passedChecks)} />
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
