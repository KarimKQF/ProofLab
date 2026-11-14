/**
 * Moteur symbolique exact : polynômes multivariés à coefficients rationnels et
 * fractions rationnelles.
 *
 * Choix de conception : l'identité de deux expressions est décidée par forme
 * normale (polynômes) ou par produit en croix (fractions rationnelles). Aucune
 * évaluation numérique en des points d'essai n'est utilisée : un test en des
 * points ne prouverait pas une identité.
 */
import * as Q from './rational';
import type { Rational } from './rational';

/** Un monôme est encodé « x^2*y^1 » trié par nom de variable ; '' pour la constante. */
export type Poly = ReadonlyMap<string, Rational>;

function monoKey(powers: Map<string, number>): string {
  return [...powers.entries()]
    .filter(([, e]) => e !== 0)
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([v, e]) => `${v}^${e}`)
    .join('*');
}

function parseMono(key: string): Map<string, number> {
  const out = new Map<string, number>();
  if (key === '') return out;
  for (const part of key.split('*')) {
    const [v, e] = part.split('^');
    out.set(v!, Number(e));
  }
  return out;
}

function clean(m: Map<string, Rational>): Poly {
  for (const [k, c] of m) if (Q.isZero(c)) m.delete(k);
  return m;
}

export const polyConst = (c: Rational): Poly => clean(new Map([['', c]]));
export const polyVar = (v: string): Poly => new Map([[`${v}^1`, Q.ONE]]);

export function polyAdd(a: Poly, b: Poly): Poly {
  const out = new Map(a);
  for (const [k, c] of b) out.set(k, Q.add(out.get(k) ?? Q.ZERO, c));
  return clean(out);
}

export function polyNeg(a: Poly): Poly {
  return new Map([...a].map(([k, c]) => [k, Q.neg(c)]));
}

export const polySub = (a: Poly, b: Poly): Poly => polyAdd(a, polyNeg(b));

export function polyMul(a: Poly, b: Poly): Poly {
  const out = new Map<string, Rational>();
  for (const [ka, ca] of a) {
    const ma = parseMono(ka);
    for (const [kb, cb] of b) {
      const m = new Map(ma);
      for (const [v, e] of parseMono(kb)) m.set(v, (m.get(v) ?? 0) + e);
      const k = monoKey(m);
      out.set(k, Q.add(out.get(k) ?? Q.ZERO, Q.mul(ca, cb)));
    }
  }
  return clean(out);
}

export function polyPow(a: Poly, e: number): Poly {
  let out: Poly = polyConst(Q.ONE);
  for (let i = 0; i < e; i++) out = polyMul(out, a);
  return out;
}

export function polyEqual(a: Poly, b: Poly): boolean {
  return polySub(a, b).size === 0;
}

export const polyIsZero = (a: Poly): boolean => a.size === 0;

/** Dérivée formelle par rapport à une variable. */
export function polyDiff(a: Poly, v: string): Poly {
  const out = new Map<string, Rational>();
  for (const [k, c] of a) {
    const m = parseMono(k);
    const e = m.get(v) ?? 0;
    if (e === 0) continue;
    m.set(v, e - 1);
    const key = monoKey(m);
    out.set(key, Q.add(out.get(key) ?? Q.ZERO, Q.mul(c, Q.rat(e))));
  }
  return clean(out);
}

/** Évaluation exacte en un point rationnel complet. */
export function polyEval(a: Poly, at: Record<string, Rational>): Rational {
  let total = Q.ZERO;
  for (const [k, c] of a) {
    let term = c;
    for (const [v, e] of parseMono(k)) {
      const value = at[v];
      if (!value) throw new Error(`Variable non affectée : ${v}`);
      term = Q.mul(term, Q.pow(value, e));
    }
    total = Q.add(total, term);
  }
  return total;
}

// ───────────────────────── Fractions rationnelles ─────────────────────────

export interface RatFn {
  readonly num: Poly;
  readonly den: Poly;
}

export const fromPoly = (p: Poly): RatFn => ({ num: p, den: polyConst(Q.ONE) });

export const fnAdd = (a: RatFn, b: RatFn): RatFn => ({
  num: polyAdd(polyMul(a.num, b.den), polyMul(b.num, a.den)),
  den: polyMul(a.den, b.den),
});
export const fnNeg = (a: RatFn): RatFn => ({ num: polyNeg(a.num), den: a.den });
export const fnSub = (a: RatFn, b: RatFn): RatFn => fnAdd(a, fnNeg(b));
export const fnMul = (a: RatFn, b: RatFn): RatFn => ({
  num: polyMul(a.num, b.num),
  den: polyMul(a.den, b.den),
});
export function fnDiv(a: RatFn, b: RatFn): RatFn {
  if (polyIsZero(b.num)) throw new SymbolicError('Division par une expression identiquement nulle');
  return { num: polyMul(a.num, b.den), den: polyMul(a.den, b.num) };
}
export function fnPow(a: RatFn, e: number): RatFn {
  if (e >= 0) return { num: polyPow(a.num, e), den: polyPow(a.den, e) };
  if (polyIsZero(a.num)) throw new SymbolicError('Puissance négative d’une expression nulle');
  return { num: polyPow(a.den, -e), den: polyPow(a.num, -e) };
}

/** Égalité exacte de deux fractions rationnelles par produit en croix. */
export function fnEqual(a: RatFn, b: RatFn): boolean {
  return polyEqual(polyMul(a.num, b.den), polyMul(b.num, a.den));
}

// ───────────────────────── Analyseur d'expressions ─────────────────────────

export class SymbolicError extends Error {}

type Token =
  | { t: 'num'; v: Rational }
  | { t: 'id'; v: string }
  | { t: 'op'; v: '+' | '-' | '*' | '/' | '^' | '(' | ')' };

function tokenize(src: string): Token[] {
  const tokens: Token[] = [];
  const s = src.replace(/−/g, '-').replace(/×|·/g, '*').replace(/\s+/g, '');
  let i = 0;
  while (i < s.length) {
    const c = s[i]!;
    if (/[0-9.,]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9.,]/.test(s[j]!)) j++;
      const value = Q.parseRational(s.slice(i, j));
      if (!value) throw new SymbolicError(`Nombre illisible : « ${s.slice(i, j)} »`);
      tokens.push({ t: 'num', v: value });
      i = j;
    } else if (/[a-zA-Z_]/.test(c)) {
      let j = i;
      while (j < s.length && /[a-zA-Z_0-9]/.test(s[j]!)) j++;
      tokens.push({ t: 'id', v: s.slice(i, j) });
      i = j;
    } else if ('+-*/^()'.includes(c)) {
      tokens.push({ t: 'op', v: c as '+' });
      i++;
    } else {
      throw new SymbolicError(`Caractère non reconnu : « ${c} »`);
    }
  }
  return tokens;
}

/**
 * Grammaire : somme de produits ; la multiplication implicite est acceptée
 * (« 2x », « x(1-x) », « (x+1)(x-1) »). Toute variable hors de `vars` est refusée.
 */
export function parseExpression(src: string, vars: readonly string[]): RatFn {
  const tokens = tokenize(src);
  let pos = 0;
  const allowed = new Set(vars);
  const peek = () => tokens[pos];
  const isOp = (v: string) => {
    const t = peek();
    return t?.t === 'op' && t.v === v;
  };

  function primary(): RatFn {
    const t = peek();
    if (!t) throw new SymbolicError('Expression incomplète');
    if (t.t === 'num') {
      pos++;
      return fromPoly(polyConst(t.v));
    }
    if (t.t === 'id') {
      if (!allowed.has(t.v)) {
        throw new SymbolicError(`Variable inattendue : « ${t.v} » (autorisées : ${vars.join(', ')})`);
      }
      pos++;
      return fromPoly(polyVar(t.v));
    }
    if (t.v === '(') {
      pos++;
      const inner = expr();
      if (!isOp(')')) throw new SymbolicError('Parenthèse fermante manquante');
      pos++;
      return inner;
    }
    throw new SymbolicError(`Symbole inattendu : « ${t.v} »`);
  }

  function power(): RatFn {
    const base = primary();
    if (isOp('^')) {
      pos++;
      let sign = 1;
      if (isOp('-')) {
        sign = -1;
        pos++;
      }
      const t = peek();
      if (t?.t !== 'num' || t.v.d !== 1n) throw new SymbolicError('Exposant entier explicite attendu');
      pos++;
      return fnPow(base, sign * Number(t.v.n));
    }
    return base;
  }

  function unary(): RatFn {
    if (isOp('-')) {
      pos++;
      return fnNeg(unary());
    }
    if (isOp('+')) {
      pos++;
      return unary();
    }
    return power();
  }

  function term(): RatFn {
    let left = unary();
    for (;;) {
      if (isOp('*')) {
        pos++;
        left = fnMul(left, unary());
      } else if (isOp('/')) {
        pos++;
        left = fnDiv(left, unary());
      } else {
        const t = peek();
        // Multiplication implicite : un facteur suit directement.
        if (t && (t.t === 'num' || t.t === 'id' || (t.t === 'op' && t.v === '('))) {
          left = fnMul(left, power());
        } else {
          return left;
        }
      }
    }
  }

  function expr(): RatFn {
    let left = term();
    for (;;) {
      if (isOp('+')) {
        pos++;
        left = fnAdd(left, term());
      } else if (isOp('-')) {
        pos++;
        left = fnSub(left, term());
      } else {
        return left;
      }
    }
  }

  const result = expr();
  if (pos !== tokens.length) throw new SymbolicError('Fin d’expression inattendue');
  return result;
}

/** Décide exactement si deux expressions représentent la même fraction rationnelle. */
export function expressionsEquivalent(a: string, b: string, vars: readonly string[]): boolean {
  return fnEqual(parseExpression(a, vars), parseExpression(b, vars));
}
