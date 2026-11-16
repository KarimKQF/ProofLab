/**
 * Graphe des dépendances : mise en page par niveaux (flèches vers le bas, but en bas, aucun
 * chevauchement, aucune flèche sous une carte, croisements évités) et affichage (hypothèses
 * H1…, étapes numérotées dans l'ordre de lecture, but en attente, fiche au survol).
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DEMONSTRATIONS, EXERCISES, EXERCISE_BY_ID } from '@/content';
import type { ProofSpec } from '@/content/schema';
import { analyzeGraph, isGiven, type PlayerGraph } from '@/core/proof-engine/engine';
import { referenceDerivation } from '@/core/proof-engine/reference';
import { DEFAULT_DIMS, layoutGraph, type GraphLayout } from '@/components/proof/graph-layout';
import { buildGraphModel, ProofGraph } from '@/components/proof/ProofGraph';

/** Coordonnées « x y » d'un chemin SVG, dans l'ordre. */
function points(d: string): [number, number][] {
  const nums = d.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
  const out: [number, number][] = [];
  for (let i = 0; i + 1 < nums.length; i += 2) out.push([nums[i]!, nums[i + 1]!]);
  return out;
}

function checkLayout(layout: GraphLayout, edges: { from: string; to: string }[], where: string) {
  const nodes = [...layout.nodes.values()];
  // Aucun chevauchement dans un niveau.
  const byLayer = new Map<number, typeof nodes>();
  for (const n of nodes) byLayer.set(n.layer, [...(byLayer.get(n.layer) ?? []), n]);
  for (const row of byLayer.values()) {
    const sorted = [...row].sort((a, b) => a.x - b.x);
    for (let i = 1; i < sorted.length; i++) expect(sorted[i]!.x, where).toBeGreaterThanOrEqual(sorted[i - 1]!.x + sorted[i - 1]!.w + DEFAULT_DIMS.gapX - 0.2);
  }
  for (const n of nodes) {
    expect(n.x, where).toBeGreaterThanOrEqual(0);
    expect(n.x + n.w, where).toBeLessThanOrEqual(layout.width + 0.2);
  }
  for (const e of layout.edges.filter((x) => !x.back)) {
    const a = layout.nodes.get(e.from)!;
    const b = layout.nodes.get(e.to)!;
    // Les flèches descendent : une prémisse est toujours au-dessus de ce qu'elle établit.
    expect(a.layer, `${where} : ${e.from} → ${e.to}`).toBeLessThan(b.layer);
    const pts = points(e.d);
    expect(pts[0]![1]).toBeCloseTo(a.y + a.h, 0);
    expect(pts[pts.length - 1]![1]).toBeCloseTo(b.y, 0);
    expect(pts[0]![0]).toBeGreaterThanOrEqual(a.x);
    expect(pts[0]![0]).toBeLessThanOrEqual(a.x + a.w);
    // Traversée d'un niveau intermédiaire : jamais sous une carte.
    const lines = [...e.d.matchAll(/L (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g)].map((m) => [Number(m[1]), Number(m[2])] as const);
    for (const [x, y] of lines) {
      for (const n of nodes) {
        if (y > n.y && y <= n.y + n.h + 0.2) expect(x <= n.x || x >= n.x + n.w, `${where} : ${e.from} → ${e.to} passe sous ${n.id}`).toBe(true);
      }
    }
  }
  expect(edges.length).toBeGreaterThanOrEqual(0);
}

describe('Graphe des dépendances — mise en page', () => {
  it('niveaux : prémisses au-dessus, branches près de leur usage, but seul en bas', () => {
    const edges = [
      { from: 'a', to: 'c' },
      { from: 'b', to: 'c' },
      { from: 'c', to: 'fin' },
      { from: 'x', to: 'fin' },
    ];
    const l = layoutGraph({ nodes: ['a', 'b', 'c', 'x', 'fin'], edges, goal: 'fin' });
    expect(l.nodes.get('a')!.layer).toBe(0);
    expect(l.nodes.get('c')!.layer).toBe(1);
    // x ne dépend de rien, mais il est placé juste au-dessus de son usage.
    expect(l.nodes.get('x')!.layer).toBe(1);
    expect(l.nodes.get('fin')!.layer).toBe(2);
    expect(l.layerCount).toBe(3);
    checkLayout(l, edges, 'petit graphe');
  });

  it('le but reste en bas même quand une étape isolée est plus profonde', () => {
    const edges = [
      { from: 'a', to: 'b' },
      { from: 'b', to: 'c' },
    ];
    const l = layoutGraph({ nodes: ['a', 'b', 'c', 'fin'], edges, goal: 'fin' });
    expect(l.nodes.get('fin')!.layer).toBe(3);
  });

  it('preuve en cours : une étape qui ne sert encore à rien attend au-dessus du but', () => {
    const edges = [
      { from: 'a', to: 'b' },
      { from: 'c', to: 'd' },
      { from: 'd', to: 'e' },
    ];
    const l = layoutGraph({ nodes: ['a', 'b', 'c', 'd', 'e', 'iso', 'fin'], edges, goal: 'fin' });
    const goal = l.nodes.get('fin')!.layer;
    for (const id of ['b', 'e', 'iso']) expect(l.nodes.get(id)!.layer, id).toBe(goal - 1);
    expect(l.nodes.get('a')!.layer).toBe(goal - 2);
    checkLayout(l, edges, 'preuve en cours');
  });

  it('une flèche qui saute des niveaux passe entre les cartes', () => {
    const edges = [
      { from: 'a', to: 'b' },
      { from: 'b', to: 'c' },
      { from: 'c', to: 'fin' },
      { from: 'a', to: 'fin' },
      { from: 'z', to: 'b' },
    ];
    const l = layoutGraph({ nodes: ['a', 'z', 'b', 'c', 'fin'], edges, goal: 'fin' });
    const long = l.edges.find((e) => e.from === 'a' && e.to === 'fin')!;
    expect(long.d).toContain(' L ');
    checkLayout(l, edges, 'flèche longue');
  });

  it('l’ordre dans les niveaux évite les croisements inutiles', () => {
    const edges = [
      { from: 'a', to: 'd' },
      { from: 'b', to: 'c' },
    ];
    const l = layoutGraph({ nodes: ['a', 'b', 'c', 'd'], edges });
    expect(l.crossings).toBe(0);
    expect(l.nodes.get('d')!.x < l.nodes.get('c')!.x).toBe(l.nodes.get('a')!.x < l.nodes.get('b')!.x);
  });

  it('une dépendance circulaire est dessinée sur le côté, sans boucler', () => {
    const l = layoutGraph({
      nodes: ['a', 'b', 'c'],
      edges: [
        { from: 'a', to: 'b' },
        { from: 'b', to: 'c' },
        { from: 'c', to: 'a' },
      ],
    });
    expect(l.edges.filter((e) => e.back)).toHaveLength(1);
    expect(l.nodes.size).toBe(3);
  });

  it('toutes les preuves du jeu, complètes : mise en page valide', () => {
    const specs: { spec: ProofSpec; where: string }[] = [
      ...EXERCISES.flatMap((e) => [{ spec: e.proof, where: e.id }, ...(e.variant.proof ? [{ spec: e.variant.proof, where: `${e.id}~v` }] : [])]),
      ...DEMONSTRATIONS.map((d) => ({ spec: d.proof, where: d.id })),
    ];
    let maxWidth = 0;
    for (const { spec, where } of specs) {
      const rules = referenceDerivation(spec)!;
      const graph: PlayerGraph = { placed: rules.map((r) => r.to), steps: Object.fromEntries(rules.map((r) => [r.to, { premises: r.from, justification: r.by }])) };
      const model = buildGraphModel(spec, graph);
      const edges = model.layout.edges.map((e) => ({ from: e.from, to: e.to }));
      checkLayout(model.layout, edges, where);
      expect(model.ghostGoal, where).toBe(false);
      // Le but est seul sur le dernier niveau.
      const last = [...model.layout.nodes.values()].filter((n) => n.layer === model.layout.layerCount - 1);
      expect(last.map((n) => n.id), where).toEqual([spec.goal]);
      // Chaque étape a son repère, dans l'ordre de lecture.
      expect(model.layout.order.map((id) => model.refs.get(id))).toEqual(model.layout.order.map((_, i) => `(${i + 1})`));
      maxWidth = Math.max(maxWidth, model.layout.width);
    }
    expect(maxWidth).toBeGreaterThan(0);
  });
});

describe('Graphe des dépendances — affichage', () => {
  const ex = EXERCISE_BY_ID.get('projection.facile')!;
  const spec = ex.proof;

  it('hypothèses H1…, étapes numérotées, but en attente, fiche au survol', () => {
    const graph: PlayerGraph = {
      placed: ['nonvide', 'i-pi-cont'],
      steps: { nonvide: { premises: ['d-K'], justification: 'j-temoin' }, 'i-pi-cont': { premises: [], justification: 'j-lipschitz' } },
    };
    const analysis = analyzeGraph(spec, graph, { allowedTheorems: null });
    const model = buildGraphModel(spec, graph);
    const onSelect = vi.fn();
    render(<ProofGraph spec={spec} graph={graph} analysis={analysis} model={model} selected={null} passedChecks={new Set()} onSelect={onSelect} />);
    const band = screen.getByTestId('bande-hypotheses');
    const givens = spec.nodes.filter((n) => isGiven(n));
    expect(band.querySelectorAll('[data-donnee]')).toHaveLength(givens.length);
    expect(band.textContent).toContain('H1');
    // Le but n'est pas posé : il est dessiné en attente, en bas.
    const goal = document.querySelector(`[data-node="${spec.goal}"]`)!;
    expect(goal.getAttribute('data-ref')).toBe('but');
    expect(goal.hasAttribute('disabled')).toBe(true);
    // Les étapes posées portent un repère et l'hypothèse utilisée.
    const card = document.querySelector('[data-node="nonvide"]')!;
    expect(card.getAttribute('data-ref')).toMatch(/^\(\d\)$/);
    expect(card.textContent).toContain('H2');
    fireEvent.mouseEnter(card);
    expect(screen.getByTestId('fiche-etape').textContent).toMatch(/Dépend de\s*H2/);
    fireEvent.click(card);
    expect(onSelect).toHaveBeenCalledWith('nonvide');
  });
});
