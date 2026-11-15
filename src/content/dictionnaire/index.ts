/**
 * Point d'entrée du dictionnaire : entrées rédigées, fiches des résultats du jeu et des
 * outils admis, repéreurs par parcours, usages dans le jeu, recherche.
 */
import { DEFINITIONS, THEOREM_MODULES, THEOREMS } from '../index';
import { AUX_TOOLS, CATALOG_BY_ID, WORLDS } from '../catalog';
import { METHODES } from './methodes';
import { FONDEMENTS } from './fondements';
import { ALGEBRE } from './algebre';
import { ESPACES } from './espaces';
import { DISTRIBUTIONS } from './distributions';
import { OPERATEURS } from './operateurs';
import { EDP } from './edp';
import { VARIETES } from './varietes';
import { GROUPES } from './groupes';
import { SYMETRIES } from './symetries';
import { OUTILS } from './outils';
import { TRANSVERSALES } from './transversales';
import { THEOREM_FORMS } from './resultats';
import { buildMatcher, buildSymbolLookup, formKey, formPattern, texKey, type Matcher } from './matcher';
import type { DicoEntry, DicoTrack, ResolvedEntry } from './types';

export * from './types';
export { linkHtml, findTerms, formKey, texKey } from './matcher';

const DEFINITION_BY_ID = new Map(DEFINITIONS.map((d) => [d.id, d]));

/** Entrées rédigées à la main, dans l'ordre de priorité (homonymes : la première l'emporte). */
export const WRITTEN_ENTRIES: DicoEntry[] = [
  ...METHODES,
  ...FONDEMENTS,
  ...ALGEBRE,
  ...ESPACES,
  ...DISTRIBUTIONS,
  ...OPERATEURS,
  ...TRANSVERSALES,
  ...EDP,
  ...VARIETES,
  ...GROUPES,
  ...SYMETRIES,
  ...OUTILS,
];

export function trackOfTheorem(theoremId: string): DicoTrack {
  const world = CATALOG_BY_ID.get(theoremId)?.world;
  return WORLDS.find((w) => w.n === world)?.track === 'lie' ? 'lie' : 'analyse';
}

function resolve(e: DicoEntry): ResolvedEntry {
  const fromDef = e.from ? DEFINITION_BY_ID.get(e.from) : undefined;
  const toolKey = e.id.startsWith('outil-') ? e.id.slice('outil-'.length) : undefined;
  return {
    ...e,
    definition: e.definition ?? fromDef?.statement ?? '',
    toolId: toolKey && toolKey in AUX_TOOLS ? toolKey : undefined,
  };
}

/** Fiches des résultats du jeu, construites à partir du contenu. */
const THEOREM_ENTRIES: ResolvedEntry[] = THEOREMS.map((th) => {
  const cat = CATALOG_BY_ID.get(th.id)!;
  return {
    id: `resultat-${th.id}`,
    term: cat.name,
    domain: 'resultats',
    forms: THEOREM_FORMS[th.id] ?? [],
    definition: th.statement,
    complements: [],
    theoremId: th.id,
  };
});

export const DICO: ResolvedEntry[] = [...WRITTEN_ENTRIES.map(resolve), ...THEOREM_ENTRIES];
export const DICO_BY_ID = new Map(DICO.map((e) => [e.id, e]));

/** Entrées qui citent `id` parmi leurs notions préalables. */
export function dependentsOf(id: string): ResolvedEntry[] {
  return DICO.filter((e) => e.prerequisites?.includes(id));
}

const matchers = new Map<string, Matcher>();
const symbols = new Map<string, Map<string, string>>();

/** Repéreur des notions pour un parcours (homonymes résolus par le parcours). */
export function matcherFor(track?: DicoTrack): Matcher {
  const key = track ?? 'commun';
  let m = matchers.get(key);
  if (!m) {
    m = buildMatcher(DICO, track);
    matchers.set(key, m);
  }
  return m;
}

/** Table des notations (formules isolées) pour un parcours. */
export function symbolsFor(track?: DicoTrack): Map<string, string> {
  const key = track ?? 'commun';
  let s = symbols.get(key);
  if (!s) {
    s = buildSymbolLookup(DICO, track);
    symbols.set(key, s);
  }
  return s;
}

/* ───────────────────────── Usages dans le jeu ───────────────────────── */

interface TheoremCorpus {
  id: string;
  track: DicoTrack;
  /** Texte en français, formules retirées. */
  plain: string;
  /** Clés des formules isolées. */
  math: Map<string, number>;
}

let corpus: TheoremCorpus[] | null = null;

function moduleTexts(m: (typeof THEOREM_MODULES)[number]): string[] {
  const out: string[] = [];
  const th = m.theorem;
  out.push(...th.spaces, th.statement, ...th.proofOutline, ...th.warnings, th.usefulFor);
  for (const h of th.hypotheses) out.push(h.text, h.whenRemoved ?? '');
  out.push(...Object.values(th.conclusions).filter((c): c is string => Boolean(c)));
  for (const d of m.definitions) out.push(d.term, d.statement);
  for (const c of m.counterexamples) out.push(c.claim, c.correctStatement, c.task, c.explanation);
  for (const e of m.exercises) {
    out.push(e.statement, e.solution, ...e.steps, ...e.hints, ...e.commonErrors.map((c) => c.description));
    out.push(e.variant.statement, e.variant.solution);
    for (const p of [e.proof, e.variant.proof]) {
      if (!p) continue;
      for (const n of p.nodes) out.push(n.text);
      for (const j of p.justifications) out.push(j.label);
      for (const tr of p.traps) out.push(tr.message, tr.counterexample ?? '');
    }
  }
  return out;
}

function buildCorpus(): TheoremCorpus[] {
  return THEOREM_MODULES.map((m) => {
    const texts = moduleTexts(m);
    const math = new Map<string, number>();
    const plainParts: string[] = [];
    for (const text of texts) {
      for (const part of text.split(/(\$\$[\s\S]*?\$\$|\$[^$]+\$)/g)) {
        if (part.startsWith('$') && part.endsWith('$') && part.length >= 2) {
          const k = texKey(part.replace(/^\$+|\$+$/g, ''));
          math.set(k, (math.get(k) ?? 0) + 1);
        } else plainParts.push(part);
      }
    }
    return { id: m.theorem.id, track: trackOfTheorem(m.theorem.id), plain: plainParts.join(' \n '), math };
  });
}

export interface Usage {
  theoremId: string;
  count: number;
}

const usageCache = new Map<string, Usage[]>();

/** Résultats du jeu dont les textes emploient la notion, du plus au moins fréquent. */
export function usagesOf(id: string): Usage[] {
  const cached = usageCache.get(id);
  if (cached) return cached;
  const entry = DICO_BY_ID.get(id);
  if (!entry) return [];
  corpus ??= buildCorpus();
  const keys = [...new Set(entry.forms.map(formKey).filter(Boolean))].sort((a, b) => b.length - a.length);
  const re = keys.length
    ? new RegExp(String.raw`(?<![\p{L}\p{N}_\-‐‑–—])(?:${keys.map(formPattern).join('|')})(?![\p{L}\p{N}_\-‐‑–—])`, 'giu')
    : null;
  const symbolKeys = (entry.symbols ?? []).map(texKey);
  const out: Usage[] = [];
  for (const c of corpus) {
    if (entry.track && entry.track !== c.track) continue;
    let count = re ? (c.plain.match(re)?.length ?? 0) : 0;
    for (const s of symbolKeys) count += c.math.get(s) ?? 0;
    if (entry.theoremId === c.id) continue;
    if (count > 0) out.push({ theoremId: c.id, count });
  }
  out.sort((a, b) => b.count - a.count || (CATALOG_BY_ID.get(a.theoremId)?.n ?? 0) - (CATALOG_BY_ID.get(b.theoremId)?.n ?? 0));
  usageCache.set(id, out);
  return out;
}

/* ───────────────────────── Recherche ───────────────────────── */

/** Minuscules sans accents, formules retirées. */
export function plainSearchKey(s: string): string {
  return s
    .replace(/\$[^$]*\$/g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/** Recherche insensible aux accents : intitulé d'abord, puis formes, puis définition. */
export function searchDico(query: string): ResolvedEntry[] {
  const q = plainSearchKey(query).trim();
  if (!q) return DICO;
  const scored: { e: ResolvedEntry; s: number }[] = [];
  for (const e of DICO) {
    const term = plainSearchKey(e.term);
    let s = 0;
    if (term.startsWith(q)) s = 4;
    else if (term.includes(q)) s = 3;
    else if (e.forms.some((f) => plainSearchKey(f).includes(q))) s = 2;
    else if (plainSearchKey(e.definition).includes(q)) s = 1;
    if (s) scored.push({ e, s });
  }
  return scored.sort((a, b) => b.s - a.s || a.e.term.localeCompare(b.e.term, 'fr')).map((x) => x.e);
}
