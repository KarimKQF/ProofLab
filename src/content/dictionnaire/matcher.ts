/**
 * Repérage des notions dans un texte. Règles :
 * - seules les parties en français sont examinées, jamais les formules ;
 * - à une position donnée, la forme la plus longue l'emporte (« opérateur fermé » plutôt
 *   que « fermé ») ;
 * - les mots sont entiers : « continu » n'est pas repéré dans « hémicontinu », ni
 *   « groupe » dans « semi-groupe » ;
 * - un homonyme est résolu par le parcours (« distribution » au sens de Schwartz en
 *   analyse, champ de sous-espaces en géométrie) ;
 * - dans un même texte, une notion n'est liée qu'à sa première occurrence.
 */
import type { DicoTrack } from './types';

export interface MatchableEntry {
  id: string;
  forms: string[];
  track?: DicoTrack;
  /** Formules (LaTeX) qui, isolées entre dollars, désignent l'entrée : $H^1_0(\Omega)$. */
  symbols?: string[];
}

/** Clé d'une formule : sans espaces ni petites espaces LaTeX. */
export function texKey(tex: string): string {
  return tex.replace(/\\[,;:! ]/g, '').replace(/\s+/g, '');
}

/** Table des notations d'un parcours (même règle de priorité que pour les mots). */
export function buildSymbolLookup(entries: readonly MatchableEntry[], track?: DicoTrack): Map<string, string> {
  const out = new Map<string, { id: string; score: number }>();
  entries.forEach((e, order) => {
    if (e.track && track && e.track !== track) return;
    const rank = e.track === undefined ? 1 : e.track === track ? 0 : 2;
    for (const s of e.symbols ?? []) {
      const key = texKey(s);
      const score = rank * 100000 + order;
      const cur = out.get(key);
      if (!cur || score < cur.score) out.set(key, { id: e.id, score });
    }
  });
  return new Map([...out].map(([k, v]) => [k, v.id]));
}

export interface Matcher {
  regex: RegExp;
  /** Identifiant de l'entrée désignée par un texte repéré. */
  lookup: (matched: string) => string | undefined;
}

const DASHES = /[-‐‑–—]/g;
const APOSTROPHES = /['’ʼ]/g;

/** Clé de comparaison : minuscules, tirets et apostrophes unifiés, espaces réduits. */
export function formKey(s: string): string {
  return s.toLowerCase().replace(DASHES, '-').replace(APOSTROPHES, "'").replace(/\s+/g, ' ').trim();
}

function charPattern(ch: string): string {
  if (ch === '-') return '[-‐‑–—]';
  if (ch === "'") return "['’ʼ]";
  if (ch === ' ') return '\\s+';
  return ch.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
}

/** Motif d'une forme : tolère les variantes de tiret, d'apostrophe et d'espace. */
export function formPattern(form: string): string {
  return [...formKey(form)].map(charPattern).join('');
}

// Frontières : ni lettre, ni chiffre, ni tiret (quel qu'il soit) de part et d'autre.
const BEFORE = String.raw`(?<![\p{L}\p{N}_\-‐‑–—])`;
const AFTER = String.raw`(?![\p{L}\p{N}_\-‐‑–—])`;

/**
 * Tournures courantes à ne jamais lier : repérées pour être consommées sans lien, elles
 * empêchent par exemple « suite » de l'être dans « par la suite ».
 */
export const STOP_PHRASES = [
  'par la suite',
  'dans la suite',
  'tout de suite',
  'de suite',
  'à la suite',
  'la suite de la preuve',
  'la suite de la démonstration',
  'dans la mesure où',
  'en mesure de',
  'à mesure que',
  'au fur et à mesure',
  'à la limite',
];

/**
 * Construit le repéreur d'un parcours. Pour une forme partagée par plusieurs entrées,
 * l'entrée du parcours courant l'emporte, puis l'entrée commune aux deux parcours,
 * puis la première déclarée.
 */
export function buildMatcher(entries: readonly MatchableEntry[], track?: DicoTrack): Matcher {
  const byKey = new Map<string, { id: string; rank: number }>();
  // Les tournures neutres sont repérées (identifiant vide) mais jamais liées.
  for (const s of STOP_PHRASES) byKey.set(formKey(s), { id: '', rank: -1 });
  entries.forEach((e, order) => {
    const rank = e.track === undefined ? 1 : e.track === track ? 0 : 2;
    for (const f of e.forms) {
      const key = formKey(f);
      if (!key) continue;
      const current = byKey.get(key);
      if (current?.id === '') continue;
      const score = rank * 100000 + order;
      if (!current || score < current.rank) byKey.set(key, { id: e.id, rank: score });
    }
  });
  // Une entrée réservée à l'autre parcours ne doit jamais être proposée.
  const trackOf = new Map(entries.map((e) => [e.id, e.track]));
  for (const [key, v] of byKey) {
    const t = trackOf.get(v.id);
    if (t && track && t !== track) byKey.delete(key);
  }
  const keys = [...byKey.keys()].sort((a, b) => b.length - a.length || a.localeCompare(b));
  const source = keys.length ? `${BEFORE}(?:${keys.map(formPattern).join('|')})${AFTER}` : '(?!)';
  return {
    regex: new RegExp(source, 'giu'),
    lookup: (matched) => byKey.get(formKey(matched))?.id || undefined,
  };
}

export interface TermHit {
  start: number;
  end: number;
  id: string;
  text: string;
}

/** Occurrences repérées dans un texte brut (sans balises). */
export function findTerms(text: string, matcher: Matcher): TermHit[] {
  const hits: TermHit[] = [];
  matcher.regex.lastIndex = 0;
  for (const m of text.matchAll(matcher.regex)) {
    const id = matcher.lookup(m[0]);
    if (id) hits.push({ start: m.index ?? 0, end: (m.index ?? 0) + m[0].length, id, text: m[0] });
  }
  return hits;
}

export interface LinkOptions {
  /** Entrées à ne pas lier (par exemple l'entrée affichée elle-même). */
  exclude?: ReadonlySet<string>;
  /** Entrées déjà liées dans ce texte : seule la première occurrence est liée. */
  seen?: Set<string>;
  /** Parcours, noté sur le lien pour que la fiche ouverte départage les homonymes. */
  track?: DicoTrack;
}

/**
 * Lie les notions dans un fragment HTML produit par le rendu du texte mixte : seules les
 * parties textuelles hors balises sont examinées, jamais le code ni un lien existant.
 */
export function linkHtml(html: string, matcher: Matcher, opts: LinkOptions = {}): string {
  const seen = opts.seen ?? new Set<string>();
  const trackAttr = opts.track ? ` data-track="${opts.track}"` : '';
  let skip = 0;
  return html
    .split(/(<[^>]+>)/g)
    .map((part) => {
      if (part.startsWith('<')) {
        if (/^<(code|button|a)\b/i.test(part)) skip += 1;
        else if (/^<\/(code|button|a)>/i.test(part)) skip = Math.max(0, skip - 1);
        return part;
      }
      if (!part || skip > 0) return part;
      return part.replace(matcher.regex, (m) => {
        const id = matcher.lookup(m);
        if (!id || opts.exclude?.has(id) || seen.has(id)) return m;
        seen.add(id);
        return `<span role="button" tabindex="0" class="term-link" data-term="${id}"${trackAttr}>${m}</span>`;
      });
    })
    .join('');
}
