/**
 * Arithmétique rationnelle exacte sur BigInt.
 *
 * Ce module est la fondation du vérifieur déterministe (catégorie A) : aucune
 * valeur flottante n'intervient ; deux rationnels sont égaux si et seulement si
 * leurs formes réduites coïncident.
 */

export interface Rational {
  readonly n: bigint;
  readonly d: bigint; // toujours > 0
}

function gcd(a: bigint, b: bigint): bigint {
  let x = a < 0n ? -a : a;
  let y = b < 0n ? -b : b;
  while (y !== 0n) {
    [x, y] = [y, x % y];
  }
  return x;
}

export function rat(n: bigint | number, d: bigint | number = 1n): Rational {
  let num = BigInt(n);
  let den = BigInt(d);
  if (den === 0n) throw new RangeError('Dénominateur nul');
  if (den < 0n) {
    num = -num;
    den = -den;
  }
  const g = gcd(num, den) || 1n;
  return { n: num / g, d: den / g };
}

export const ZERO = rat(0);
export const ONE = rat(1);

export const add = (a: Rational, b: Rational): Rational => rat(a.n * b.d + b.n * a.d, a.d * b.d);
export const sub = (a: Rational, b: Rational): Rational => rat(a.n * b.d - b.n * a.d, a.d * b.d);
export const mul = (a: Rational, b: Rational): Rational => rat(a.n * b.n, a.d * b.d);
export const neg = (a: Rational): Rational => ({ n: -a.n, d: a.d });
export const inv = (a: Rational): Rational => rat(a.d, a.n);
export const div = (a: Rational, b: Rational): Rational => mul(a, inv(b));
export const eq = (a: Rational, b: Rational): boolean => a.n === b.n && a.d === b.d;
export const cmp = (a: Rational, b: Rational): -1 | 0 | 1 => {
  const l = a.n * b.d;
  const r = b.n * a.d;
  return l < r ? -1 : l > r ? 1 : 0;
};
export const isZero = (a: Rational): boolean => a.n === 0n;
export const isPos = (a: Rational): boolean => a.n > 0n;
export const isNeg = (a: Rational): boolean => a.n < 0n;
export const isNonNeg = (a: Rational): boolean => a.n >= 0n;

export function pow(a: Rational, e: number): Rational {
  if (!Number.isInteger(e)) throw new RangeError('Exposant non entier');
  if (e < 0) return inv(pow(a, -e));
  return rat(a.n ** BigInt(e), a.d ** BigInt(e));
}

export const toNumber = (a: Rational): number => Number(a.n) / Number(a.d);

export function toString(a: Rational): string {
  return a.d === 1n ? a.n.toString() : `${a.n}/${a.d}`;
}

/**
 * Lit un rationnel saisi par l'utilisateur : « 3 », « -2/5 », « 0.25 », « 0,25 ».
 * Une écriture décimale est interprétée exactement (0.333 vaut 333/1000, jamais 1/3).
 * Renvoie null si la saisie n'est pas un rationnel explicite.
 */
export function parseRational(raw: string): Rational | null {
  const s = raw.trim().replace(/\s+/g, '').replace(',', '.').replace('−', '-');
  if (s === '') return null;
  const frac = /^([+-]?\d+)\/([+-]?\d+)$/.exec(s);
  if (frac) {
    const den = BigInt(frac[2]!);
    if (den === 0n) return null;
    return rat(BigInt(frac[1]!), den);
  }
  const dec = /^([+-]?)(\d*)(?:\.(\d*))?$/.exec(s);
  if (!dec) return null;
  const [, sign, intPart = '', fracPart = ''] = dec;
  if (intPart === '' && fracPart === '') return null;
  const digits = BigInt((intPart + fracPart) || '0');
  const value = rat(digits, 10n ** BigInt(fracPart.length));
  return sign === '-' ? neg(value) : value;
}

/** Vrai si a et b sont distincts mais numériquement très proches (message pédagogique). */
export function isCloseButDifferent(a: Rational, b: Rational, tolerance = 1e-3): boolean {
  if (eq(a, b)) return false;
  return Math.abs(toNumber(a) - toNumber(b)) < tolerance;
}
