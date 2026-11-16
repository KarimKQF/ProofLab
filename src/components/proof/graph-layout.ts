/**
 * Mise en page du graphe des dépendances d'une preuve : dessin par niveaux, de haut en bas
 * (méthode de Sugiyama, simplifiée). Calcul pur, sans mesure du DOM :
 *
 * 1. Niveaux : une étape est placée sous toutes ses prémisses, puis le plus près possible
 *    de l'étape qui l'utilise (les branches indépendantes restent groupées) ; le but est
 *    toujours en bas, et une étape qui ne sert encore à rien attend juste au-dessus de lui.
 * 2. Une flèche qui saute des niveaux passe par des points relais, qui réservent sa place
 *    entre les cartes : aucune flèche ne passe derrière une carte.
 * 3. Ordre dans chaque niveau : moyenne des positions des voisins (balayages successifs),
 *    on garde l'ordre qui croise le moins de flèches.
 * 4. Abscisses : chaque carte se rapproche de ses voisins, sans chevauchement.
 * 5. Ports : les flèches qui arrivent sur une carte (ou en partent) sont réparties le long
 *    de son bord, pour qu'on les distingue.
 *
 * Une dépendance circulaire (posée par le joueur) est dessinée à part, sur le côté.
 */

export interface LayoutDims {
  cardW: number;
  cardH: number;
  /** Largeur réservée à une flèche qui traverse un niveau. */
  dummyW: number;
  gapX: number;
  gapY: number;
  pad: number;
  /**
   * Largeur visée : toutes les lignes restent dans un cadre de cette largeur (ou de celle de
   * la ligne la plus large, si elle dépasse), pour que le graphe tienne dans son panneau.
   */
  maxWidth: number;
}

export const DEFAULT_DIMS: LayoutDims = { cardW: 152, cardH: 88, dummyW: 10, gapX: 12, gapY: 44, pad: 12, maxWidth: 800 };

/** Cartes par niveau au-delà desquelles les étapes en attente se répartissent plus haut. */
const ROW_CAP = 5;

export interface LayoutInput {
  /** Nœuds à dessiner, dans l'ordre de préférence (ordre du contenu). */
  nodes: readonly string[];
  /** Arêtes prémisse → étape. */
  edges: readonly { from: string; to: string }[];
  /** Le but, placé en bas. */
  goal?: string;
}

export interface PlacedNode {
  id: string;
  layer: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface RoutedEdge {
  from: string;
  to: string;
  /** Arête qui remonte (dépendance circulaire). */
  back: boolean;
  /** Chemin SVG. */
  d: string;
}

export interface GraphLayout {
  nodes: Map<string, PlacedNode>;
  edges: RoutedEdge[];
  width: number;
  height: number;
  layerCount: number;
  /** Ordre de lecture des nœuds : par niveau, puis de gauche à droite. */
  order: string[];
  /** Nombre de croisements entre niveaux consécutifs. */
  crossings: number;
}

interface Edge {
  from: string;
  to: string;
}

const round = (v: number) => Math.round(v * 10) / 10;

export function layoutGraph(input: LayoutInput, dims: LayoutDims = DEFAULT_DIMS): GraphLayout {
  const ids = [...new Set(input.nodes)];
  const pref = new Map(ids.map((id, i) => [id, i]));
  const seen = new Set<string>();
  const edges: Edge[] = [];
  for (const e of input.edges) {
    const key = `${e.from}→${e.to}`;
    if (e.from === e.to || !pref.has(e.from) || !pref.has(e.to) || seen.has(key)) continue;
    seen.add(key);
    edges.push({ from: e.from, to: e.to });
  }

  // 1. Arêtes qui remontent : parcours en profondeur, dans l'ordre de préférence.
  const out = new Map<string, number[]>(ids.map((id) => [id, []]));
  edges.forEach((e, i) => out.get(e.from)!.push(i));
  const state = new Map<string, number>();
  const back = new Set<number>();
  const visit = (v: string) => {
    state.set(v, 1);
    for (const i of out.get(v)!) {
      const w = edges[i]!.to;
      const s = state.get(w) ?? 0;
      if (s === 1) back.add(i);
      else if (s === 0) visit(w);
    }
    state.set(v, 2);
  };
  for (const id of ids) if (!state.get(id)) visit(id);
  const forward = edges.filter((_, i) => !back.has(i));

  // 2. Niveaux : au plus tôt, puis au plus tard (les branches restent près de leur usage).
  const preds = new Map<string, string[]>(ids.map((id) => [id, []]));
  const succs = new Map<string, string[]>(ids.map((id) => [id, []]));
  for (const e of forward) {
    preds.get(e.to)!.push(e.from);
    succs.get(e.from)!.push(e.to);
  }
  const indeg = new Map(ids.map((id) => [id, preds.get(id)!.length]));
  const topo: string[] = [];
  const ready = ids.filter((id) => indeg.get(id) === 0);
  while (ready.length) {
    ready.sort((a, b) => pref.get(a)! - pref.get(b)!);
    const v = ready.shift()!;
    topo.push(v);
    for (const s of succs.get(v)!) {
      indeg.set(s, indeg.get(s)! - 1);
      if (indeg.get(s) === 0) ready.push(s);
    }
  }
  const layer = new Map<string, number>();
  for (const v of topo) layer.set(v, Math.max(0, ...preds.get(v)!.map((p) => layer.get(p)! + 1)));
  const asap = new Map(layer);
  const goal = input.goal && pref.has(input.goal) ? input.goal : undefined;
  const alap = (fixed: ReadonlyMap<string, number>) => {
    for (const v of ids) layer.set(v, fixed.get(v) ?? asap.get(v)!);
    for (const v of [...topo].reverse()) {
      if (fixed.has(v)) continue;
      const s = succs.get(v)!;
      if (s.length) layer.set(v, Math.min(...s.map((x) => layer.get(x)!)) - 1);
    }
  };
  if (goal && succs.get(goal)!.length === 0) {
    const others = ids.filter((id) => id !== goal).map((id) => asap.get(id)!);
    const goalLayer = Math.max(asap.get(goal)!, others.length ? Math.max(...others) + 1 : 0);
    // Une étape qui ne sert encore à rien (preuve en cours) attend au-dessus du but ; au-delà
    // de ROW_CAP cartes sur ce niveau, les suivantes remontent d'un niveau (jamais au-dessus
    // de leurs prémisses), pour que le graphe reste lisible en largeur.
    const waiting = ids.filter((v) => v !== goal && succs.get(v)!.length === 0);
    const fixed = new Map<string, number>([[goal, goalLayer], ...waiting.map((v) => [v, Math.max(asap.get(v)!, goalLayer - 1)] as [string, number])]);
    alap(fixed);
    for (let guard = 0; guard < waiting.length * (goalLayer + 1); guard++) {
      const count = new Map<number, number>();
      for (const v of ids) if (v !== goal) count.set(layer.get(v)!, (count.get(layer.get(v)!) ?? 0) + 1);
      const mover = [...waiting].reverse().find((v) => (count.get(fixed.get(v)!) ?? 0) > ROW_CAP && fixed.get(v)! > asap.get(v)!);
      if (!mover) break;
      fixed.set(mover, fixed.get(mover)! - 1);
      alap(fixed);
    }
  } else {
    alap(new Map());
  }
  const layerCount = ids.length ? Math.max(...ids.map((id) => layer.get(id)!)) + 1 : 0;

  // 3. Points relais pour les arêtes qui sautent des niveaux.
  const isDummy = new Set<string>();
  const width = new Map<string, number>();
  const up = new Map<string, string[]>();
  const down = new Map<string, string[]>();
  const link = (a: string, b: string) => {
    if (!down.has(a)) down.set(a, []);
    if (!up.has(b)) up.set(b, []);
    down.get(a)!.push(b);
    up.get(b)!.push(a);
  };
  const layers: string[][] = Array.from({ length: layerCount }, () => []);
  const hint = new Map<string, number>();
  for (const id of ids) {
    layers[layer.get(id)!]!.push(id);
    width.set(id, dims.cardW);
    hint.set(id, pref.get(id)!);
  }
  const chains: { edge: Edge; items: string[] }[] = [];
  forward.forEach((e, i) => {
    const items = [e.from];
    for (let l = layer.get(e.from)! + 1; l < layer.get(e.to)!; l++) {
      const d = `~${i}~${l}`;
      isDummy.add(d);
      width.set(d, dims.dummyW);
      hint.set(d, pref.get(e.from)! + 0.5);
      layer.set(d, l);
      layers[l]!.push(d);
      items.push(d);
    }
    items.push(e.to);
    for (let k = 0; k + 1 < items.length; k++) link(items[k]!, items[k + 1]!);
    chains.push({ edge: e, items });
  });
  for (const row of layers) row.sort((a, b) => hint.get(a)! - hint.get(b)!);

  // 4. Ordre dans chaque niveau : barycentres, en gardant l'ordre qui croise le moins.
  const crossingsOf = (rows: string[][]) => {
    let total = 0;
    for (let l = 0; l + 1 < rows.length; l++) {
      const pos = new Map(rows[l + 1]!.map((id, i) => [id, i]));
      const segs: [number, number][] = [];
      rows[l]!.forEach((a, i) => (down.get(a) ?? []).forEach((b) => segs.push([i, pos.get(b)!])));
      for (let p = 0; p < segs.length; p++)
        for (let q = p + 1; q < segs.length; q++) {
          const [a1, b1] = segs[p]!;
          const [a2, b2] = segs[q]!;
          if ((a1 - a2) * (b1 - b2) < 0) total += 1;
        }
    }
    return total;
  };
  let best = layers.map((r) => [...r]);
  let bestCrossings = crossingsOf(best);
  let rows = layers.map((r) => [...r]);
  const reorder = (row: string[], ref: string[], neighbours: Map<string, string[]>) => {
    const pos = new Map(ref.map((id, i) => [id, i]));
    const bary = new Map(
      row.map((id, i) => {
        const ns = (neighbours.get(id) ?? []).filter((n) => pos.has(n));
        return [id, ns.length ? ns.reduce((s, n) => s + pos.get(n)!, 0) / ns.length : i * (ref.length / Math.max(row.length, 1))] as const;
      }),
    );
    return row
      .map((id, i) => ({ id, i }))
      .sort((a, b) => bary.get(a.id)! - bary.get(b.id)! || a.i - b.i)
      .map((x) => x.id);
  };
  for (let it = 0; it < 8; it++) {
    if (it % 2 === 0) for (let l = 1; l < rows.length; l++) rows[l] = reorder(rows[l]!, rows[l - 1]!, up);
    else for (let l = rows.length - 2; l >= 0; l--) rows[l] = reorder(rows[l]!, rows[l + 1]!, down);
    const c = crossingsOf(rows);
    if (c < bestCrossings) {
      bestCrossings = c;
      best = rows.map((r) => [...r]);
    }
  }
  rows = best;

  // 5. Abscisses : rapprocher chaque élément de ses voisins, sans chevauchement.
  const left = new Map<string, number>();
  const packedWidth = (row: string[]) => row.reduce((s, id) => s + width.get(id)!, 0) + dims.gapX * Math.max(row.length - 1, 0);
  for (const row of rows) {
    let x = -packedWidth(row) / 2;
    for (const id of row) {
      left.set(id, x);
      x += width.get(id)! + dims.gapX;
    }
  }
  // Cadre commun à toutes les lignes : la largeur visée, ou celle de la ligne la plus large.
  const frame = Math.max(dims.maxWidth - 2 * dims.pad, ...rows.map(packedWidth), 0);
  const centre = (id: string) => left.get(id)! + width.get(id)! / 2;
  const settle = (row: string[], desired: number[]) => {
    const n = row.length;
    if (!n) return;
    const w = row.map((id) => width.get(id)!);
    const fwd = [...desired];
    for (let i = 1; i < n; i++) fwd[i] = Math.max(fwd[i]!, fwd[i - 1]! + w[i - 1]! + dims.gapX);
    const bwd = [...desired];
    for (let i = n - 2; i >= 0; i--) bwd[i] = Math.min(bwd[i]!, bwd[i + 1]! - w[i]! - dims.gapX);
    const pos = row.map((_, i) => (fwd[i]! + bwd[i]!) / 2);
    // Pas de grands trous dans une ligne : le graphe reste compact.
    const maxHole = dims.cardW / 3;
    for (let i = 1; i < n; i++) {
      const excess = pos[i]! - (pos[i - 1]! + w[i - 1]! + dims.gapX) - maxHole;
      if (excess > 0) for (let j = i; j < n; j++) pos[j] = pos[j]! - excess;
    }
    // La ligne tient dans le cadre : trous réduits si besoin, puis ramenée à l'intérieur.
    const packed = packedWidth(row);
    const span = pos[n - 1]! + w[n - 1]! - pos[0]!;
    if (span > frame) {
      const factor = span > packed ? (frame - packed) / (span - packed) : 0;
      for (let i = 1; i < n; i++) {
        const hole = pos[i]! - (pos[i - 1]! + w[i - 1]! + dims.gapX);
        pos[i] = pos[i - 1]! + w[i - 1]! + dims.gapX + Math.max(0, hole) * factor;
      }
    }
    const lo = -frame / 2;
    const hi = frame / 2;
    const right = pos[n - 1]! + w[n - 1]!;
    const shift = pos[0]! < lo ? lo - pos[0]! : right > hi ? hi - right : 0;
    row.forEach((id, i) => left.set(id, pos[i]! + shift));
  };
  for (let it = 0; it < 10; it++) {
    const goingDown = it % 2 === 0;
    const range = goingDown ? rows.map((_, l) => l) : rows.map((_, l) => rows.length - 1 - l);
    for (const l of range) {
      const row = rows[l]!;
      const neighbours = goingDown ? up : down;
      const desired = row.map((id) => {
        const ns = neighbours.get(id) ?? [];
        const target = ns.length ? ns.reduce((s, n) => s + centre(n), 0) / ns.length : centre(id);
        return target - width.get(id)! / 2;
      });
      settle(row, desired);
    }
  }
  const all = rows.flat();
  const minX = all.length ? Math.min(...all.map((id) => left.get(id)!)) : 0;
  const maxX = all.length ? Math.max(...all.map((id) => left.get(id)! + width.get(id)!)) : 0;
  const shift = dims.pad - minX;
  const top = (l: number) => dims.pad + l * (dims.cardH + dims.gapY);

  const nodes = new Map<string, PlacedNode>();
  for (const id of ids) {
    nodes.set(id, { id, layer: layer.get(id)!, x: round(left.get(id)! + shift), y: top(layer.get(id)!), w: dims.cardW, h: dims.cardH });
  }
  const cx = (id: string) => left.get(id)! + shift + width.get(id)! / 2;

  // 6. Ports : arrivées réparties sur le bord haut, départs sur le bord bas.
  const inPort = new Map<string, number>();
  const outPort = new Map<string, number>();
  const spread = (owner: string, list: { key: string; x: number }[], into: Map<string, number>) => {
    list.sort((a, b) => a.x - b.x);
    const n = nodes.get(owner)!;
    const inset = Math.min(22, n.w / 4);
    list.forEach((item, i) => into.set(item.key, n.x + inset + ((i + 0.5) * (n.w - 2 * inset)) / list.length));
  };
  const incoming = new Map<string, { key: string; x: number }[]>();
  const outgoing = new Map<string, { key: string; x: number }[]>();
  chains.forEach(({ items }, i) => {
    const key = String(i);
    const src = items[0]!;
    const dst = items[items.length - 1]!;
    if (!incoming.has(dst)) incoming.set(dst, []);
    if (!outgoing.has(src)) outgoing.set(src, []);
    incoming.get(dst)!.push({ key, x: cx(items[items.length - 2]!) });
    outgoing.get(src)!.push({ key, x: cx(items[1]!) });
  });
  for (const [owner, list] of incoming) spread(owner, list, inPort);
  for (const [owner, list] of outgoing) spread(owner, list, outPort);

  const curve = (x1: number, y1: number, x2: number, y2: number) => {
    const my = (y1 + y2) / 2;
    return ` C ${round(x1)} ${round(my)}, ${round(x2)} ${round(my)}, ${round(x2)} ${round(y2)}`;
  };
  const routed: RoutedEdge[] = chains.map(({ edge, items }, i) => {
    const key = String(i);
    let x = outPort.get(key)!;
    let y = nodes.get(edge.from)!.y + dims.cardH;
    let d = `M ${round(x)} ${round(y)}`;
    for (const it of items.slice(1, -1)) {
      const dx = cx(it);
      const dy = top(layer.get(it)!);
      d += curve(x, y, dx, dy) + ` L ${round(dx)} ${round(dy + dims.cardH)}`;
      x = dx;
      y = dy + dims.cardH;
    }
    d += curve(x, y, inPort.get(key)!, nodes.get(edge.to)!.y);
    return { from: edge.from, to: edge.to, back: false, d };
  });
  // Dépendances circulaires : arc sur le côté droit.
  edges.forEach((e, i) => {
    if (!back.has(i)) return;
    const a = nodes.get(e.from)!;
    const b = nodes.get(e.to)!;
    const xa = a.x + a.w;
    const xb = b.x + b.w;
    const bulge = Math.max(xa, xb) + 36;
    const ya = a.y + a.h / 2;
    const yb = b.y + b.h / 2;
    routed.push({ from: e.from, to: e.to, back: true, d: `M ${round(xa)} ${round(ya)} C ${round(bulge)} ${round(ya)}, ${round(bulge)} ${round(yb)}, ${round(xb)} ${round(yb)}` });
  });

  const order = [...ids].sort((a, b) => nodes.get(a)!.layer - nodes.get(b)!.layer || nodes.get(a)!.x - nodes.get(b)!.x);
  const hasBack = back.size > 0;
  return {
    nodes,
    edges: routed,
    width: round(maxX - minX + 2 * dims.pad + (hasBack ? 40 : 0)),
    height: layerCount ? top(layerCount - 1) + dims.cardH + dims.pad : 0,
    layerCount,
    order,
    crossings: bestCrossings,
  };
}
