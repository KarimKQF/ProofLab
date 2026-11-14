/**
 * Formes bilinéaires sur R² pour le laboratoire B. Calculs flottants pour l'affichage ;
 * les hypothèses présentées au joueur sont décidées exactement dans `matrix.ts`.
 *
 * Produit scalaire ⟨x, y⟩_G = xᵀGy, G symétrique définie positive.
 * Forme a(x, y) = xᵀAy, forme linéaire ℓ(x) = cᵀx.
 */
export type M2 = [[number, number], [number, number]];
export type V2 = [number, number];

export const det2 = (m: M2): number => m[0][0] * m[1][1] - m[0][1] * m[1][0];
export const trace2 = (m: M2): number => m[0][0] + m[1][1];
export const transpose2 = (m: M2): M2 => [
  [m[0][0], m[1][0]],
  [m[0][1], m[1][1]],
];
export const mul2 = (a: M2, b: M2): M2 => [
  [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
  [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]],
];
export const matVec2 = (a: M2, v: V2): V2 => [a[0][0] * v[0] + a[0][1] * v[1], a[1][0] * v[0] + a[1][1] * v[1]];
export const dot2 = (u: V2, v: V2): number => u[0] * v[0] + u[1] * v[1];

export function inverse2(m: M2): M2 | null {
  const d = det2(m);
  if (d === 0) return null;
  return [
    [m[1][1] / d, -m[0][1] / d],
    [-m[1][0] / d, m[0][0] / d],
  ];
}

export function isSpd2(g: M2): boolean {
  return g[0][1] === g[1][0] && g[0][0] > 0 && det2(g) > 0;
}

/** Représentant de Riesz de ℓ pour ⟨·,·⟩_G : ℓ(v) = ⟨v, w⟩_G pour tout v, soit Gw = c. */
export function rieszVector(g: M2, c: V2): V2 | null {
  const inv = inverse2(g);
  return inv ? matVec2(inv, c) : null;
}

export const innerG = (g: M2, u: V2, v: V2): number => dot2(u, matVec2(g, v));
export const normG = (g: M2, u: V2): number => Math.sqrt(innerG(g, u, u));

/** Partie symétrique de A : c'est elle qui détermine a(x, x). */
export function symPart(a: M2): M2 {
  const s = (a[0][1] + a[1][0]) / 2;
  return [
    [a[0][0], s],
    [s, a[1][1]],
  ];
}

/**
 * Plus petite constante de coercivité pour ‖·‖_G : min de xᵀSx / xᵀGx, S = sym(A).
 * Plus petite valeur propre généralisée de (S, G), racine d'un polynôme de degré 2.
 */
export function coercivityConstant(a: M2, g: M2): number {
  const s = symPart(a);
  const A2 = det2(g);
  const B = s[0][0] * g[1][1] + s[1][1] * g[0][0] - 2 * s[0][1] * g[0][1];
  const C = det2(s);
  const disc = Math.max(0, B * B - 4 * A2 * C);
  return (B - Math.sqrt(disc)) / (2 * A2);
}

/** Plus petite constante de continuité M = sup |xᵀAy| / (‖x‖_G ‖y‖_G). */
export function continuityConstant(a: M2, g: M2): number {
  const inv = inverse2(g);
  if (!inv) return Number.NaN;
  // M² est la plus grande valeur propre de G⁻¹AᵀG⁻¹A.
  const b = mul2(mul2(inv, transpose2(a)), mul2(inv, a));
  const t = trace2(b);
  const d = det2(b);
  return Math.sqrt((t + Math.sqrt(Math.max(0, t * t - 4 * d))) / 2);
}

/** Solution de Lax–Milgram : a(u, v) = ℓ(v) pour tout v, soit Aᵀu = c. */
export function laxMilgramSolution(a: M2, c: V2): V2 | null {
  const inv = inverse2(transpose2(a));
  return inv ? matVec2(inv, c) : null;
}

/** Norme duale de ℓ : ‖ℓ‖ = ‖w‖_G où w est le représentant de Riesz. */
export function dualNorm(g: M2, c: V2): number {
  const w = rieszVector(g, c);
  return w ? normG(g, w) : Number.NaN;
}
