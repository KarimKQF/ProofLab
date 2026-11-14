/**
 * Validation automatique d'un exercice : invariants de structure et de mathématique
 * vérifiables par machine. Utilisée par les tests de contenu de chaque monde.
 */
import katex from 'katex';
import { expect } from 'vitest';
import {
  ExerciseSchema,
  ProofSpecSchema,
  type Exercise,
  type ProofSpec,
  type ClosedCheckData,
} from '@/content/schema';
import { allowedTheorems, AUX_TOOLS, CATALOG_BY_ID } from '@/content/catalog';
import {
  analyzeGraph,
  derivableSet,
  emptyGraph,
  givens,
  hypothesisRemovalReport,
  isGiven,
  nodeMap,
  type PlayerGraph,
} from '@/core/proof-engine/engine';
import { evaluateCheck, referenceAnswer, type ClosedCheck } from '@/core/math/closed-checks';

/** Vocabulaire physique proscrit : le contenu reste strictement mathématique. */
/** Frontières de mot Unicode :  ignore les lettres accentuées en JavaScript. */
const word = (src: string): RegExp => new RegExp(String.raw`(?<![\p{L}\p{N}_])(?:` + src + String.raw`)(?![\p{L}\p{N}_])`, 'iu');

const FORBIDDEN = [
  word('énergies?'),
  word('énergétiques?'),
  word('chaleur'),
  word('températures?'),
  word('diffusions?'),
  word('flux'),
  word('vitesses?'),
  word('particules?'),
  word('fluides?'),
  word('masses? de dirac'),
  word('dissipation'),
  word('terme source'),
];

export function assertNoPhysics(text: string, where: string): void {
  for (const re of FORBIDDEN) {
    expect(re.test(text), `${where} : vocabulaire physique proscrit (${re}) dans « ${text.slice(0, 120)} »`).toBe(false);
  }
}

/** Vérifie que chaque segment LaTeX d'un texte mixte se compile avec KaTeX. */
export function assertMixedText(text: string, where: string): void {
  assertNoPhysics(text, where);
  const cleaned = text.replace(/\\\$/g, '');
  const parts = cleaned.split(/(\$\$[\s\S]*?\$\$|\$[^$]*\$)/g);
  for (const part of parts) {
    if (part.startsWith('$$') && part.endsWith('$$') && part.length >= 4) {
      renderTex(part.slice(2, -2), true, where);
    } else if (part.startsWith('$') && part.endsWith('$') && part.length >= 2) {
      renderTex(part.slice(1, -1), false, where);
    } else {
      expect(part.includes('$'), `${where} : dollar non apparié dans « ${text.slice(0, 120)} »`).toBe(false);
    }
  }
}

function renderTex(tex: string, display: boolean, where: string): void {
  try {
    katex.renderToString(tex, { throwOnError: true, displayMode: display, strict: 'ignore' });
  } catch (e) {
    throw new Error(`${where} : LaTeX invalide « ${tex} » → ${(e as Error).message}`);
  }
}

function checkTexts(check: ClosedCheckData, where: string): void {
  assertMixedText(check.prompt, where);
  if (check.kind === 'choice') {
    check.options.forEach((o, i) => assertMixedText(o, `${where}.option${i}`));
    assertMixedText(check.explanation, `${where}.explanation`);
    for (const c of check.correct) expect(c).toBeLessThan(check.options.length);
  }
  const ref = referenceAnswer(check as ClosedCheck);
  if (ref) {
    expect(evaluateCheck(check as ClosedCheck, ref).status, `${where} : la réponse de référence doit s'auto-valider`).toBe('valide');
  }
}

export interface ProofValidationOptions {
  allowed: ReadonlySet<string>;
  where: string;
  knownConcepts: ReadonlySet<string>;
}

/** Valide un graphe de preuve. Renvoie sa dérivation complète. */
export function validateProof(spec: ProofSpec, options: ProofValidationOptions): void {
  const { allowed, where, knownConcepts } = options;
  ProofSpecSchema.parse(spec);
  const ids = new Set(spec.nodes.map((n) => n.id));
  const justIds = new Set(spec.justifications.map((j) => j.id));
  expect(ids.size, `${where} : identifiants de nœuds dupliqués`).toBe(spec.nodes.length);
  expect(justIds.size, `${where} : identifiants de justifications dupliqués`).toBe(spec.justifications.length);
  expect(ids.has(spec.goal), `${where} : but inconnu`).toBe(true);

  for (const r of spec.rules) {
    expect(ids.has(r.to), `${where} : règle vers un nœud inconnu ${r.to}`).toBe(true);
    expect(justIds.has(r.by), `${where} : justification inconnue ${r.by}`).toBe(true);
    for (const f of r.from) expect(ids.has(f), `${where} : prémisse inconnue ${f}`).toBe(true);
    expect(r.from.includes(r.to), `${where} : règle réflexive sur ${r.to}`).toBe(false);
    expect(isGiven(nodeMap(spec).get(r.to)!), `${where} : une règle conclut une donnée (${r.to})`).toBe(false);
  }

  // Le but est dérivable, et aucun distracteur ne l'est.
  const derivable = derivableSet(spec);
  expect(derivable.has(spec.goal), `${where} : le but n'est pas dérivable`).toBe(true);
  for (const n of spec.nodes) {
    assertMixedText(n.text, `${where}.${n.id}`);
    if (n.masked) assertMixedText(n.masked, `${where}.${n.id}.masked`);
    if (n.check) checkTexts(n.check, `${where}.${n.id}.check`);
    if (n.distractor) {
      expect(derivable.has(n.id), `${where} : le distracteur ${n.id} est dérivable`).toBe(false);
      expect(
        spec.traps.some((tr) => tr.conclusion === n.id),
        `${where} : le distracteur ${n.id} n'a pas de piège expliquant l'erreur`,
      ).toBe(true);
    } else if (!isGiven(n)) {
      expect(derivable.has(n.id), `${where} : le nœud ${n.id} n'est ni dérivable ni distracteur`).toBe(true);
    }
    for (const a of n.after ?? []) expect(ids.has(a), `${where} : after inconnu ${a}`).toBe(true);
  }

  // Chaque donnée et chaque étape servent à quelque chose.
  const used = new Set(spec.rules.flatMap((r) => r.from));
  for (const n of spec.nodes) {
    if (n.id === spec.goal || n.distractor) continue;
    expect(used.has(n.id), `${where} : le nœud ${n.id} n'est utilisé par aucune règle`).toBe(true);
  }

  for (const j of spec.justifications) {
    assertMixedText(j.label, `${where}.${j.id}`);
    if (j.theorem) {
      expect(
        CATALOG_BY_ID.has(j.theorem) || j.theorem in AUX_TOOLS,
        `${where} : théorème inconnu ${j.theorem} dans ${j.id}`,
      ).toBe(true);
    }
  }

  // Aucune règle n'utilise un résultat indisponible.
  for (const r of spec.rules) {
    const j = spec.justifications.find((x) => x.id === r.by)!;
    if (j.theorem) {
      expect(allowed.has(j.theorem), `${where} : la règle vers ${r.to} utilise ${j.theorem}, indisponible ici`).toBe(true);
    }
  }

  // Les pièges référencent des objets existants et ne contredisent aucune règle.
  for (const tr of spec.traps) {
    expect(ids.has(tr.conclusion), `${where} : piège sur un nœud inconnu ${tr.conclusion}`).toBe(true);
    if (tr.by) expect(justIds.has(tr.by), `${where} : piège sur une justification inconnue ${tr.by}`).toBe(true);
    for (const p of tr.premises ?? []) expect(ids.has(p), `${where} : piège sur une prémisse inconnue ${p}`).toBe(true);
    expect(knownConcepts.has(tr.concept), `${where} : concept inconnu ${tr.concept}`).toBe(true);
    assertMixedText(tr.message, `${where}.piege`);
    if (tr.counterexample) assertMixedText(tr.counterexample, `${where}.contre-exemple`);
    if (tr.verdict === 'incorrect') {
      // Un piège « incorrect » ne doit jamais frapper une règle valide.
      for (const r of spec.rules.filter((x) => x.to === tr.conclusion)) {
        const matches =
          (tr.by === undefined || tr.by === r.by) && (tr.premises ?? []).every((p) => r.from.includes(p));
        expect(matches, `${where} : le piège sur ${tr.conclusion} rejette une règle valide (${r.by})`).toBe(false);
      }
    }
  }

  for (const rem of spec.removable) {
    expect(ids.has(rem.hypothesis), `${where} : hypothèse retirable inconnue ${rem.hypothesis}`).toBe(true);
    assertMixedText(rem.label, `${where}.retrait`);
    assertMixedText(rem.explanation, `${where}.retrait`);
    assertMixedText(rem.counterexample, `${where}.retrait`);
    if (rem.necessary) {
      expect(
        hypothesisRemovalReport(spec, rem.hypothesis).goalStillDerivable,
        `${where} : retirer ${rem.hypothesis} devrait casser la preuve`,
      ).toBe(false);
    }
  }

  // Une preuve complète par les règles est acceptée par le moteur, sans piège ni cycle.
  const graph = canonicalGraph(spec);
  const passedChecks = new Set(spec.nodes.filter((n) => n.check).map((n) => n.id));
  const analysis = analyzeGraph(spec, graph, { allowedTheorems: allowed, passedChecks });
  expect(analysis.cycles.length, `${where} : la dérivation canonique contient un cycle`).toBe(0);
  expect(analysis.goalReached, `${where} : le moteur refuse la dérivation canonique`).toBe(true);
}

/** Construit une preuve complète à partir des règles (chemin sans cycle, par point fixe). */
export function canonicalGraph(spec: ProofSpec): PlayerGraph {
  const graph = emptyGraph();
  const known = givens(spec);
  let changed = true;
  while (changed && !known.has(spec.goal)) {
    changed = false;
    for (const r of spec.rules) {
      if (!known.has(r.to) && r.from.every((p) => known.has(p))) {
        known.add(r.to);
        graph.placed.push(r.to);
        graph.steps[r.to] = { premises: [...r.from], justification: r.by };
        changed = true;
      }
    }
  }
  return graph;
}

export interface ExerciseValidationOptions {
  knownConcepts: ReadonlySet<string>;
}

export function validateExercise(ex: Exercise, options: ExerciseValidationOptions): void {
  const parsed = ExerciseSchema.safeParse(ex);
  expect(parsed.success, `${ex.id} : schéma invalide → ${parsed.success ? '' : parsed.error.message}`).toBe(true);
  expect(ex.id, `${ex.id} : identifiant attendu theoremId.niveau`).toBe(`${ex.theoremId}.${ex.level}`);
  expect(CATALOG_BY_ID.has(ex.theoremId), `${ex.id} : théorème inconnu`).toBe(true);

  for (const text of [ex.title, ex.statement, ex.solution, ...ex.steps, ...ex.hints]) assertMixedText(text, ex.id);
  for (const c of ex.concepts) expect(options.knownConcepts.has(c), `${ex.id} : concept inconnu ${c}`).toBe(true);
  for (const p of ex.prerequisites) {
    expect(CATALOG_BY_ID.has(p) || p in AUX_TOOLS, `${ex.id} : prérequis inconnu ${p}`).toBe(true);
  }
  for (const e of ex.commonErrors) {
    assertMixedText(e.description, `${ex.id}.${e.id}`);
    expect(options.knownConcepts.has(e.concept), `${ex.id} : concept inconnu ${e.concept}`).toBe(true);
  }

  // Trois indices distincts et progressifs.
  expect(new Set(ex.hints).size, `${ex.id} : indices dupliqués`).toBe(3);

  // Grille à 100 points, sur les cinq critères, sans doublon.
  const total = ex.rubric.reduce((s, r) => s + r.points, 0);
  expect(total, `${ex.id} : la grille doit totaliser 100 points`).toBe(100);
  expect(new Set(ex.rubric.map((r) => r.criterion)).size, `${ex.id} : critères dupliqués`).toBe(5);
  for (const r of ex.rubric) assertMixedText(r.description, `${ex.id}.grille`);

  // Pages de référence dans le document source (polycopié : 46 pages ; cours de Lie : 275 pages).
  if (ex.source.doc === 'polycopie') {
    expect(ex.source.pdfPage, `${ex.id} : page PDF requise`).toBeGreaterThanOrEqual(5);
    expect(ex.source.pdfPage!, `${ex.id} : page PDF hors du document`).toBeLessThanOrEqual(46);
  }
  if (ex.source.doc === 'cours-lie') {
    expect(ex.source.pdfPage, `${ex.id} : page PDF requise`).toBeGreaterThanOrEqual(21);
    expect(ex.source.pdfPage!, `${ex.id} : page PDF hors du document`).toBeLessThanOrEqual(275);
  }
  assertMixedText(ex.source.label, `${ex.id}.source`);

  for (const c of ex.closedChecks ?? []) checkTexts(c, `${ex.id}.closed`);

  const allowed = allowedTheorems(ex.theoremId, ex.proof.purpose, ex.prerequisites);
  validateProof(ex.proof, { allowed, where: ex.id, knownConcepts: options.knownConcepts });

  assertMixedText(ex.variant.statement, `${ex.id}.variante`);
  assertMixedText(ex.variant.solution, `${ex.id}.variante`);
  for (const c of ex.variant.closedChecks ?? []) checkTexts(c, `${ex.id}.variante.closed`);
  if (ex.variant.proof) {
    const a = allowedTheorems(ex.theoremId, ex.variant.proof.purpose, ex.prerequisites);
    validateProof(ex.variant.proof, { allowed: a, where: `${ex.id}.variante`, knownConcepts: options.knownConcepts });
  }
}
