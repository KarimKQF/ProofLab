/**
 * Vérifications fermées : réponses calculatoires décidées exactement (catégorie A).
 * Une réponse numériquement proche n'est jamais acceptée comme identité.
 */
import * as Q from './rational';
import { expressionsEquivalent, parseExpression, SymbolicError } from './symbolic';
import { isPositiveDefinite, isSymmetric, isCoercive } from './matrix';
import type { Matrix } from './matrix';

export type ClosedCheck =
  | { kind: 'rational'; prompt: string; expected: string; placeholder?: string }
  | { kind: 'rational-vector'; prompt: string; expected: string[]; labels?: string[] }
  | { kind: 'expr-equiv'; prompt: string; expected: string; vars: string[]; placeholder?: string }
  | { kind: 'matrix-spd'; prompt: string; size: number; property: 'spd' | 'coercive-nonsymmetric' | 'symmetric-not-spd' }
  | { kind: 'choice'; prompt: string; options: string[]; correct: number[]; explanation: string };

export type CheckAnswer =
  | { kind: 'rational'; value: string }
  | { kind: 'rational-vector'; values: string[] }
  | { kind: 'expr-equiv'; value: string }
  | { kind: 'matrix-spd'; values: string[][] }
  | { kind: 'choice'; selected: number[] };

export interface CheckResult {
  status: 'valide' | 'incorrect' | 'illisible';
  message: string;
}

const OK: CheckResult = { status: 'valide', message: 'Valeur établie par calcul exact.' };

function bad(message: string): CheckResult {
  return { status: 'incorrect', message };
}

function unreadable(message: string): CheckResult {
  return { status: 'illisible', message };
}

const CLOSE_MESSAGE =
  'La valeur saisie est numériquement proche de la valeur exacte, mais elle en diffère : une proximité numérique n’établit pas une égalité.';

function checkRational(value: string, expected: string): CheckResult {
  const v = Q.parseRational(value);
  const e = Q.parseRational(expected);
  if (!e) throw new Error(`Valeur attendue invalide dans le contenu : ${expected}`);
  if (!v) return unreadable('Saisie non reconnue. Utilise un entier, une fraction (3/4) ou un décimal exact.');
  if (Q.eq(v, e)) return OK;
  if (Q.isCloseButDifferent(v, e)) return bad(CLOSE_MESSAGE);
  return bad('Cette valeur ne coïncide pas avec le résultat attendu.');
}

function parseMatrix(values: string[][]): Matrix | null {
  const out: Matrix = [];
  for (const row of values) {
    const parsed = row.map((c) => Q.parseRational(c));
    if (parsed.some((p) => p === null)) return null;
    out.push(parsed as Q.Rational[]);
  }
  return out;
}

/** Décide exactement une réponse fermée. Ne jette jamais pour une saisie utilisateur. */
export function evaluateCheck(check: ClosedCheck, answer: CheckAnswer): CheckResult {
  switch (check.kind) {
    case 'rational':
      if (answer.kind !== 'rational') return unreadable('Réponse de type inattendu.');
      return checkRational(answer.value, check.expected);
    case 'rational-vector': {
      if (answer.kind !== 'rational-vector') return unreadable('Réponse de type inattendu.');
      if (answer.values.length !== check.expected.length) return unreadable('Nombre de composantes incorrect.');
      for (let i = 0; i < check.expected.length; i++) {
        const r = checkRational(answer.values[i] ?? '', check.expected[i]!);
        if (r.status !== 'valide') {
          return { status: r.status, message: `Composante ${i + 1} : ${r.message}` };
        }
      }
      return OK;
    }
    case 'expr-equiv': {
      if (answer.kind !== 'expr-equiv') return unreadable('Réponse de type inattendu.');
      try {
        parseExpression(answer.value, check.vars);
      } catch (e) {
        if (e instanceof SymbolicError) return unreadable(e.message);
        throw e;
      }
      return expressionsEquivalent(answer.value, check.expected, check.vars)
        ? { status: 'valide', message: 'Identité établie par réduction à une forme normale.' }
        : bad('Les deux expressions ne sont pas identiques : leur différence n’est pas identiquement nulle.');
    }
    case 'matrix-spd': {
      if (answer.kind !== 'matrix-spd') return unreadable('Réponse de type inattendu.');
      const m = parseMatrix(answer.values);
      if (!m) return unreadable('Coefficient non reconnu.');
      switch (check.property) {
        case 'spd':
          return isPositiveDefinite(m)
            ? { status: 'valide', message: 'Symétrique et mineurs principaux dominants > 0 (critère de Sylvester).' }
            : bad('Le critère de Sylvester n’est pas satisfait, ou la matrice n’est pas symétrique.');
        case 'coercive-nonsymmetric':
          if (isSymmetric(m)) return bad('Cette matrice est symétrique : le but est précisément de s’en passer.');
          return isCoercive(m)
            ? { status: 'valide', message: 'Partie symétrique définie positive et matrice non symétrique.' }
            : bad('La partie symétrique (A + Aᵀ)/2 n’est pas définie positive : la forme n’est pas coercive.');
        case 'symmetric-not-spd':
          if (!isSymmetric(m)) return bad('La matrice saisie n’est pas symétrique.');
          return isPositiveDefinite(m)
            ? bad('Cette matrice est définie positive : elle définit bien un produit scalaire.')
            : { status: 'valide', message: 'Symétrique mais non définie positive (Sylvester).' };
      }
    }
    // eslint-disable-next-line no-fallthrough
    case 'choice': {
      if (answer.kind !== 'choice') return unreadable('Réponse de type inattendu.');
      if (answer.selected.length === 0) return unreadable('Aucune option sélectionnée.');
      const a = [...answer.selected].sort((x, y) => x - y);
      const c = [...check.correct].sort((x, y) => x - y);
      return a.length === c.length && a.every((v, i) => v === c[i])
        ? { status: 'valide', message: check.explanation }
        : bad('Cette sélection n’est pas la bonne. Reprends les définitions en jeu.');
    }
  }
}

/** Réponse de référence (tests de contenu : toute vérification doit s'auto-valider). */
export function referenceAnswer(check: ClosedCheck): CheckAnswer | null {
  switch (check.kind) {
    case 'rational':
      return { kind: 'rational', value: check.expected };
    case 'rational-vector':
      return { kind: 'rational-vector', values: check.expected };
    case 'expr-equiv':
      return { kind: 'expr-equiv', value: check.expected };
    case 'choice':
      return { kind: 'choice', selected: check.correct };
    case 'matrix-spd':
      return null; // Plusieurs réponses sont acceptables : la propriété est décidée.
  }
}
