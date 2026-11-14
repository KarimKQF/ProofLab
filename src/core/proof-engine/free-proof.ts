/**
 * Preuve libre (catégorie C). Une rédaction en français n'est pas vérifiable par ce
 * logiciel : le verdict par défaut est donc « À justifier », et l'évaluation est
 * explicitement provisoire et pédagogique.
 *
 *   Validé    : seulement pour ce qu'un vérifieur déterministe a établi (calculs fermés).
 *   Incorrect : seulement pour une erreur réellement identifiée (calcul fermé refusé).
 *   Points d'attention : indices de relecture, jamais une note. Une rédaction peut
 *   être correcte tout en déclenchant un point d'attention, par exemple si elle suit
 *   une autre méthode que la solution de référence.
 */
import katex from 'katex';
import { theoremLabel, AUX_TOOLS } from '@/content/catalog';
import type { Exercise, ProofSpec } from '@/content/schema';

export interface AttentionPoint {
  id: string;
  text: string;
}

export interface TexIssue {
  tex: string;
  message: string;
}

/** Repère les formules que KaTeX ne sait pas compiler. */
export function findTexIssues(source: string): TexIssue[] {
  const issues: TexIssue[] = [];
  const cleaned = source.replace(/\\\$/g, '');
  for (const m of cleaned.matchAll(/\$\$([\s\S]*?)\$\$|\$([^$]+)\$/g)) {
    const tex = m[1] ?? m[2] ?? '';
    try {
      katex.renderToString(tex, { throwOnError: true, displayMode: m[1] !== undefined, strict: 'ignore' });
    } catch (e) {
      issues.push({ tex, message: (e as Error).message });
    }
  }
  const remaining = cleaned.replace(/\$\$[\s\S]*?\$\$/g, '').replace(/\$[^$]*\$/g, '');
  if (remaining.includes('$')) issues.push({ tex: '$', message: 'Un symbole dollar n’est pas apparié.' });
  return issues;
}

function usedTheorems(spec: ProofSpec): string[] {
  const justifications = new Map(spec.justifications.map((j) => [j.id, j]));
  const out = new Set<string>();
  for (const r of spec.rules) {
    const theorem = justifications.get(r.by)?.theorem;
    if (theorem && !(theorem in AUX_TOOLS)) out.add(theorem);
  }
  return [...out];
}

const includesAny = (text: string, patterns: RegExp[]): boolean => patterns.some((p) => p.test(text));

/** Mot entier, lettres accentuées comprises ( ne les reconnaît pas en JavaScript). */
const word = (src: string): RegExp => new RegExp(String.raw`(?<![\p{L}\p{N}_])(?:` + src + String.raw`)(?![\p{L}\p{N}_])`, 'iu');

/** Points de relecture. Aucun ne constitue un verdict sur la démonstration. */
export function attentionPoints(text: string, exercise: Exercise, statement: string): AttentionPoint[] {
  const points: AttentionPoint[] = [];
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  if (words > 0 && words < 40) {
    points.push({ id: 'courte', text: 'La rédaction est très courte : chaque étape est-elle justifiée ?' });
  }
  if (word('évident|évidemment|trivial|trivialement|clairement').test(text)) {
    points.push({ id: 'evident', text: '« Évident » ou « clairement » remplace-t-il une justification que tu pourrais écrire ?' });
  }
  if (word('unique|unicité').test(statement) && !word('unique|unicité').test(text)) {
    points.push({ id: 'unicite', text: 'L’énoncé demande l’unicité : elle se démontre séparément de l’existence.' });
  }
  if (!includesAny(text, [/hypoth[eè]se/i, word('par définition'), word('soit'), word('soient'), word('supposons'), word('comme')])) {
    points.push({ id: 'hypotheses', text: 'Les hypothèses utilisées ne sont pas explicitement citées.' });
  }
  if ((word('faiblement|faible').test(text) || /⇀|\\rightharpoonup/.test(text)) && word('forte|fortement').test(text)) {
    points.push({ id: 'faible-fort', text: 'Faible et forte apparaissent ensemble : la convergence utilisée à chaque étape est-elle la bonne ?' });
  }
  for (const th of usedTheorems(exercise.proof)) {
    const name = theoremLabel(th);
    const key = name.split(/[\s–$]/)[0] ?? name;
    if (key.length > 3 && !text.toLowerCase().includes(key.toLowerCase())) {
      points.push({
        id: `theoreme-${th}`,
        text: `La solution de référence utilise ${name}. Une autre preuve est possible : si tu l’utilises, cite-le et vérifie ses hypothèses.`,
      });
    }
  }
  return points;
}

export type FreeProofVerdict =
  | { status: 'a-justifier'; label: 'À justifier'; note: string }
  | { status: 'incorrect'; label: 'Incorrect'; note: string };

/** Verdict provisoire, à partir des seuls éléments décidables. */
export function freeProofVerdict(closedFailures: number): FreeProofVerdict {
  if (closedFailures > 0) {
    return {
      status: 'incorrect',
      label: 'Incorrect',
      note: 'Au moins un calcul exact est refusé : l’erreur porte sur ce calcul, le reste de la rédaction n’est pas évalué.',
    };
  }
  return {
    status: 'a-justifier',
    label: 'À justifier',
    note: 'Une rédaction libre n’est pas vérifiable automatiquement. Cette évaluation est pédagogique et provisoire : relis-la, compare à la solution, et note-toi sur la grille.',
  };
}
