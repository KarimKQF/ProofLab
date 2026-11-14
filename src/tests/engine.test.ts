import { describe, expect, it } from 'vitest';
import {
  analyzeGraph,
  derivableSet,
  emptyGraph,
  findCycles,
  hypothesisRemovalReport,
  scoreGraph,
  visibleNodes,
  type EngineContext,
  type PlayerGraph,
} from '@/core/proof-engine/engine';
import type { ProofSpec } from '@/content/schema';
import { ancestors, allowedTheorems, THEOREM_CATALOG, CATALOG_BY_ID } from '@/content/catalog';
import { attentionPoints, findTexIssues, freeProofVerdict } from '@/core/proof-engine/free-proof';
import { EXERCISE_BY_ID } from '@/content';

/** Preuve fictive : h ⟹ a ⟹ b ⟹ g, avec deux chemins vers b et des règles réciproques. */
const SPEC: ProofSpec = {
  purpose: 'demonstration',
  goal: 'g',
  nodes: [
    { id: 'h', kind: 'hypothese', text: 'h' },
    { id: 'k', kind: 'hypothese', text: 'k' },
    { id: 'a', kind: 'consequence', text: 'a', unlocks: ['cle-a'] },
    { id: 'b', kind: 'consequence', text: 'b' },
    { id: 'g', kind: 'conclusion', text: 'g' },
    { id: 'x', kind: 'consequence', distractor: true, text: 'x' },
    { id: 'p', kind: 'egalite', text: 'p = 1', masked: 'p à calculer', check: { kind: 'rational', prompt: 'p', expected: '1' } },
  ],
  justifications: [
    { id: 'j1', label: 'j1' },
    { id: 'j2', label: 'j2' },
    { id: 'j3', label: 'j3' },
    { id: 'jv', label: 'jv', theorem: 'stampacchia' },
    { id: 'jfaux', label: 'faux' },
  ],
  rules: [
    { from: ['h'], to: 'a', by: 'j1' },
    { from: ['a'], to: 'b', by: 'j2', path: 'p1' },
    { from: ['k'], to: 'b', by: 'j3', path: 'p2' },
    { from: ['b'], to: 'a', by: 'j2' },
    { from: ['b'], to: 'g', by: 'j1' },
    { from: ['h'], to: 'p', by: 'j1' },
    { from: ['a'], to: 'x', by: 'jv' },
  ],
  traps: [
    { conclusion: 'x', verdict: 'incorrect', concept: 'circularite', message: 'faux', counterexample: 'ce' },
    { conclusion: 'b', by: 'jfaux', verdict: 'a-justifier', concept: 'justification-absente', message: 'à justifier' },
  ],
  removable: [],
};

const ctx: EngineContext = { allowedTheorems: null };

function steps(obj: Record<string, [string[], string | null]>): PlayerGraph {
  const g = emptyGraph();
  for (const [id, [premises, justification]] of Object.entries(obj)) {
    g.placed.push(id);
    g.steps[id] = { premises, justification };
  }
  return g;
}

describe('Moteur de preuve — structure', () => {
  it('valide une preuve complète et n’en distingue pas le chemin', () => {
    const viaA = steps({ a: [['h'], 'j1'], b: [['a'], 'j2'], g: [['b'], 'j1'] });
    const viaK = steps({ b: [['k'], 'j3'], g: [['b'], 'j1'] });
    expect(analyzeGraph(SPEC, viaA, ctx).goalReached).toBe(true);
    expect(analyzeGraph(SPEC, viaK, ctx).goalReached).toBe(true);
  });

  it('refuse un raisonnement circulaire, même si chaque lien est localement valide', () => {
    const g = steps({ a: [['b'], 'j2'], b: [['a'], 'j2'], gg: [[], null] });
    delete g.steps.gg;
    g.placed = g.placed.filter((p) => p !== 'gg');
    const a = analyzeGraph(SPEC, g, ctx);
    expect(a.cycles.length).toBeGreaterThan(0);
    expect(a.status.a).toBe('circulaire');
    expect(a.status.b).toBe('circulaire');
    expect(a.grounded.has('a')).toBe(false);
    // Chaque étape, prise isolément, suit bien une règle.
    expect(a.verdicts.a?.status).toBe('valide');
  });

  it('un cycle ne peut pas fonder le but', () => {
    const g = steps({ a: [['b'], 'j2'], b: [['a'], 'j2'], g: [['b'], 'j1'] });
    expect(analyzeGraph(SPEC, g, ctx).goalReached).toBe(false);
  });

  it('une étape dont les prémisses ne sont pas établies n’est pas démontrée', () => {
    const a = analyzeGraph(SPEC, steps({ g: [['b'], 'j1'] }), ctx);
    expect(a.verdicts.g?.status).toBe('valide');
    expect(a.status.g).not.toBe('demontre');
    expect(a.goalReached).toBe(false);
  });

  it('exige les prémisses et signale ce qui manque', () => {
    const a = analyzeGraph(SPEC, steps({ a: [[], 'j1'] }), ctx);
    const v = a.verdicts.a!;
    expect(v.status).toBe('a-justifier');
    if (v.status === 'a-justifier') {
      expect(v.reason).toBe('premisses-manquantes');
      expect(v.missing).toEqual(['h']);
    }
  });

  it('une assertion sans justification n’est pas établie', () => {
    const v = analyzeGraph(SPEC, steps({ a: [['h'], null] }), ctx).verdicts.a!;
    expect(v.status === 'a-justifier' && v.reason === 'justification-manquante').toBe(true);
  });

  it('distingue insuffisant, non couvert et incorrect', () => {
    const insuff = analyzeGraph(SPEC, steps({ a: [['h'], 'j3'] }), ctx).verdicts.a!;
    expect(insuff.status === 'a-justifier' && insuff.reason === 'justification-insuffisante').toBe(true);
    const faux = analyzeGraph(SPEC, steps({ x: [['a'], 'j1'] }), ctx).verdicts.x!;
    expect(faux.status).toBe('incorrect');
    const piege = analyzeGraph(SPEC, steps({ b: [['a'], 'jfaux'] }), ctx).verdicts.b!;
    expect(piege.status === 'a-justifier' && piege.reason === 'piege').toBe(true);
  });

  it('un lien non couvert n’est jamais validé, ni réfuté', () => {
    const custom: ProofSpec = { ...SPEC, rules: SPEC.rules.filter((r) => r.to !== 'b'), traps: [] };
    const v = analyzeGraph(custom, steps({ b: [['h'], 'j1'] }), ctx).verdicts.b!;
    expect(v.status).toBe('a-justifier');
    if (v.status === 'a-justifier') expect(v.reason).toBe('non-couvert');
  });

  it('refuse l’utilisation prématurée d’un résultat', () => {
    const c: EngineContext = { allowedTheorems: new Set(['riesz']) };
    const custom: ProofSpec = { ...SPEC, traps: [] };
    const v = analyzeGraph(custom, steps({ a: [['h'], 'j1'], x: [['a'], 'jv'] }), c, () => 'Stampacchia').verdicts.x!;
    expect(v.status === 'incorrect' && v.reason === 'utilisation-prematuree').toBe(true);
    if (v.status === 'incorrect') expect(v.message).toContain('Stampacchia');
  });

  it('un calcul exact doit être validé avant que le nœud soit affirmé', () => {
    const g = steps({ p: [['h'], 'j1'] });
    const before = analyzeGraph(SPEC, g, ctx).verdicts.p!;
    expect(before.status === 'a-justifier' && before.reason === 'calcul-manquant').toBe(true);
    const after = analyzeGraph(SPEC, g, { ...ctx, passedChecks: new Set(['p']) }).verdicts.p!;
    expect(after.status).toBe('valide');
  });

  it('retirer une hypothèse fait tomber ce qui en dépend', () => {
    const g = steps({ a: [['h'], 'j1'], b: [['a'], 'j2'], gg: [[], null] });
    g.placed = g.placed.filter((p) => p !== 'gg');
    delete g.steps.gg;
    const a = analyzeGraph(SPEC, g, { ...ctx, removedHypotheses: new Set(['h']) });
    expect(a.status.h).toBe('manquant');
    expect(a.grounded.has('a')).toBe(false);
    expect(a.grounded.has('b')).toBe(false);
  });

  it('distingue un but encore atteignable d’un but perdu après retrait', () => {
    expect(hypothesisRemovalReport(SPEC, 'h').goalStillDerivable).toBe(true);
    const only: ProofSpec = { ...SPEC, rules: SPEC.rules.filter((r) => r.by !== 'j3') };
    expect(hypothesisRemovalReport(only, 'h').goalStillDerivable).toBe(false);
  });

  it('les déverrouillages suivent les nœuds établis uniquement', () => {
    const g = steps({ a: [['h'], 'j1'] });
    expect(analyzeGraph(SPEC, g, ctx).unlocks.has('cle-a')).toBe(true);
    expect(analyzeGraph(SPEC, steps({ a: [['b'], 'j2'] }), ctx).unlocks.has('cle-a')).toBe(false);
  });

  it('détecte les cycles de façon générale', () => {
    const g = steps({ a: [['b'], 'j'], b: [['c'], 'j'], c: [['a'], 'j'] });
    expect(findCycles(g).flat().sort()).toEqual(['a', 'b', 'c']);
  });

  it('dévoile la banque progressivement en mode guidé', () => {
    const base = analyzeGraph(SPEC, emptyGraph(), ctx);
    const initial = visibleNodes(SPEC, base, [], true);
    expect(initial).toContain('a');
    expect(initial).toContain('g'); // le but est toujours visible
    const full = visibleNodes(SPEC, base, [], false);
    expect(full.length).toBe(SPEC.nodes.length);
  });

  it('dérivabilité : plus petit point fixe', () => {
    const set = derivableSet(SPEC);
    expect(set.has('g')).toBe(true);
    expect(set.has('h')).toBe(true);
  });
});

describe('Notation', () => {
  const RUBRIC = [
    { criterion: 'Hypothèses', points: 20 },
    { criterion: 'Méthode', points: 20 },
    { criterion: 'Validité des étapes', points: 25 },
    { criterion: 'Justifications', points: 20 },
    { criterion: 'Conclusion', points: 15 },
  ];

  it('une preuve complète obtient tous les points', () => {
    const g = steps({ b: [['k'], 'j3'], g: [['b'], 'j1'] });
    const s = scoreGraph(SPEC, g, analyzeGraph(SPEC, g, ctx), RUBRIC);
    expect(s.total).toBe(100);
    expect(s.validated).toBe(true);
  });

  it('une preuve circulaire n’est pas validée', () => {
    const g = steps({ a: [['b'], 'j2'], b: [['a'], 'j2'] });
    const s = scoreGraph(SPEC, g, analyzeGraph(SPEC, g, ctx), RUBRIC);
    expect(s.validated).toBe(false);
    expect(s.byCriterion.Conclusion).toBe(0);
  });
});

describe('Graphe de dépendances des théorèmes', () => {
  it('est acyclique et référence des résultats existants', () => {
    for (const t of THEOREM_CATALOG) {
      for (const r of [...t.requires, ...(t.alsoAllowed ?? [])]) expect(CATALOG_BY_ID.has(r), `${t.id} → ${r}`).toBe(true);
      expect(ancestors(t.id).has(t.id), `${t.id} dépend de lui-même`).toBe(false);
    }
  });

  it('Lax–Milgram ne peut pas être utilisé pour démontrer Riesz', () => {
    expect(allowedTheorems('riesz', 'demonstration', []).has('lax-milgram')).toBe(false);
    expect(allowedTheorems('riesz', 'demonstration', []).has('riesz')).toBe(false);
    expect(allowedTheorems('lax-milgram', 'demonstration', []).has('riesz')).toBe(true);
  });

  it('une application peut invoquer le résultat et ses prérequis déclarés', () => {
    const a = allowedTheorems('projection', 'application', ['riesz']);
    expect(a.has('projection')).toBe(true);
    expect(a.has('riesz')).toBe(true);
    expect(a.has('stampacchia')).toBe(false);
  });
});

describe('Preuve libre', () => {
  const ex = EXERCISE_BY_ID.get('projection.difficile')!;

  it('ne valide jamais une rédaction', () => {
    expect(freeProofVerdict(0).status).toBe('a-justifier');
    expect(freeProofVerdict(1).status).toBe('incorrect');
  });

  it('signale une unicité absente, sans noter', () => {
    const points = attentionPoints('Soit $u$, alors tout est clair. '.repeat(10), ex, ex.statement);
    expect(points.some((p) => p.id === 'unicite')).toBe(true);
  });

  it('une formulation différente ne déclenche pas d’erreur', () => {
    const text = 'Par hypothèse et par Riesz on obtient w ; la projection donne une solution. '.repeat(4) + 'Son unicité résulte du test croisé.';
    const points = attentionPoints(text, ex, ex.statement);
    expect(points.every((p) => p.id !== 'unicite')).toBe(true);
    expect(points.every((p) => p.id !== 'hypotheses')).toBe(true);
  });

  it('reconnaît les mots entiers, lettres accentuées comprises', () => {
    const text = 'Le résultat est évident. '.repeat(12);
    expect(attentionPoints(text, ex, ex.statement).some((p) => p.id === 'evident')).toBe(true);
    const sans = 'Le caractère non évidentiel ici est établi par hypothèse. '.repeat(12);
    expect(attentionPoints(sans, ex, ex.statement).some((p) => p.id === 'evident')).toBe(false);
  });

  it('repère les formules LaTeX invalides', () => {
    expect(findTexIssues('$\\frac{1}$').length).toBe(1);
    expect(findTexIssues('$x^2$ et $$\\int_0^1 f$$').length).toBe(0);
    expect(findTexIssues('prix : 5 $').length).toBe(1);
  });
});
