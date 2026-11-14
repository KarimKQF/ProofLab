/**
 * Laboratoire G, scène « Commutateur de flots » (résultat 36, planches 7 et 8).
 *
 * Deux champs du plan, un point p, un temps t : le chemin X, Y, −X, −Y aboutit en
 * C_t(p) = Φ^Y_{−t}∘Φ^X_{−t}∘Φ^Y_t∘Φ^X_t(p), comparé à la prédiction p + t²[X,Y]_p.
 * Le crochet est donné en forme close (convention du cours [X,Y] = Y′X − X′Y) et recoupé
 * par jacobiennes numériques. Les flots sont exacts quand une forme close existe, sinon
 * intégrés par Runge–Kutta d'ordre 4 (statut « numérique »).
 */
import { bracketNumeric, rk4, vadd, vdist, vnorm, type Field, type Vec } from './lie-core';
import { fmt, vecTex, type SceneReadout } from './types';

export interface FieldPair {
  id: string;
  /** Libellé court (texte mixte). */
  label: string;
  xTex: string;
  yTex: string;
  bracketTex: string;
  flowXTex: string;
  flowYTex: string;
  X: Field;
  Y: Field;
  /** Flots en forme close, s'ils existent. */
  flowX?: (p: Vec, t: number) => Vec;
  flowY?: (p: Vec, t: number) => Vec;
  /** [X,Y] en forme close. */
  bracket: Field;
  domain: [number, number, number, number];
  p0: Vec;
  t0: number;
  note: string;
}

export const FIELD_PAIRS: FieldPair[] = [
  {
    id: 'cisaillement',
    label: String.raw`$\partial_x$ et $x\,\partial_y$`,
    xTex: String.raw`\partial_x`,
    yTex: String.raw`x\,\partial_y`,
    bracketTex: String.raw`\partial_y`,
    flowXTex: String.raw`\Phi^X_t(x,y)=(x+t,\,y)`,
    flowYTex: String.raw`\Phi^Y_t(x,y)=(x,\,y+tx)`,
    X: () => [1, 0],
    Y: ([x]) => [0, x!],
    flowX: ([x, y], t) => [x! + t, y!],
    flowY: ([x, y], t) => [x!, y! + t * x!],
    bracket: () => [0, 1],
    domain: [0, 2.4, 1, 3.4],
    p0: [1, 2],
    t0: 0.5,
    note: String.raw`Exercice 36 (facile) : $C_t(x,y)=(x,\,y+t^2)$ exactement, le reste $O(t^3)$ est nul.`,
  },
  {
    id: 'lineaires',
    label: String.raw`$y\,\partial_x$ et $x\,\partial_y$`,
    xTex: String.raw`y\,\partial_x`,
    yTex: String.raw`x\,\partial_y`,
    bracketTex: String.raw`-x\,\partial_x+y\,\partial_y`,
    flowXTex: String.raw`\Phi^X_t(x,y)=(x+ty,\,y)`,
    flowYTex: String.raw`\Phi^Y_t(x,y)=(x,\,y+tx)`,
    X: ([, y]) => [y!, 0],
    Y: ([x]) => [0, x!],
    flowX: ([x, y], t) => [x! + t * y!, y!],
    flowY: ([x, y], t) => [x!, y! + t * x!],
    bracket: ([x, y]) => [-x!, y!],
    domain: [-0.4, 1.6, -0.7, 1.1],
    p0: [1, 0],
    t0: 0.5,
    note: String.raw`Exercice 36 (intermédiaire) : champs linéaires $X(v)=Av$, $Y(v)=Bv$, $[X,Y](v)=(BA-AB)v$ ; $C_t(1,0)=(1-t^2,\,t^3)$.`,
  },
  {
    id: 'commutants',
    label: 'Rotations et homothéties',
    xTex: String.raw`-y\,\partial_x+x\,\partial_y`,
    yTex: String.raw`x\,\partial_x+y\,\partial_y`,
    bracketTex: '0',
    flowXTex: String.raw`\Phi^X_t(x,y)=(x\cos t-y\sin t,\,x\sin t+y\cos t)`,
    flowYTex: String.raw`\Phi^Y_t(x,y)=(e^tx,\,e^ty)`,
    X: ([x, y]) => [-y!, x!],
    Y: ([x, y]) => [x!, y!],
    flowX: ([x, y], t) => [x! * Math.cos(t) - y! * Math.sin(t), x! * Math.sin(t) + y! * Math.cos(t)],
    flowY: ([x, y], t) => [Math.exp(t) * x!, Math.exp(t) * y!],
    bracket: () => [0, 0],
    domain: [-2.4, 2.4, -2.4, 2.4],
    p0: [1, 0.5],
    t0: 0.6,
    note: String.raw`Variante de l'exercice 36 : $[X,Y]=0$, les flots commutent et $C_t=\mathrm{Id}$.`,
  },
  {
    id: 'exponentiel',
    label: String.raw`$\partial_x$ et $e^x\partial_y$`,
    xTex: String.raw`\partial_x`,
    yTex: String.raw`e^x\,\partial_y`,
    bracketTex: String.raw`e^x\,\partial_y`,
    flowXTex: String.raw`\Phi^X_t(x,y)=(x+t,\,y)`,
    flowYTex: String.raw`\Phi^Y_t(x,y)=(x,\,y+te^x)`,
    X: () => [1, 0],
    Y: ([x]) => [0, Math.exp(x!)],
    flowX: ([x, y], t) => [x! + t, y!],
    flowY: ([x, y], t) => [x!, y! + t * Math.exp(x!)],
    bracket: ([x]) => [0, Math.exp(x!)],
    domain: [-1.2, 1.8, -0.4, 2.6],
    p0: [0, 0.5],
    t0: 0.5,
    note: String.raw`Variante de l'exercice 36 : $C_t(x,y)=\big(x,\,y+te^x(e^t-1)\big)=(x,\,y+t^2e^x)+O(t^3)$.`,
  },
  {
    id: 'non-lineaire',
    label: String.raw`$y\,\partial_x-\sin x\,\partial_y$ et $\partial_x$`,
    xTex: String.raw`y\,\partial_x-\sin x\,\partial_y`,
    yTex: String.raw`\partial_x`,
    bracketTex: String.raw`\cos x\,\partial_y`,
    flowXTex: String.raw`\Phi^X_t\ \text{numérique}`,
    flowYTex: String.raw`\Phi^Y_t(x,y)=(x+t,\,y)`,
    X: ([x, y]) => [y!, -Math.sin(x!)],
    Y: () => [1, 0],
    flowY: ([x, y], t) => [x! + t, y!],
    bracket: ([x]) => [0, Math.cos(x!)],
    domain: [-0.7, 2.1, -1.1, 1.3],
    p0: [0.5, 0.3],
    t0: 0.5,
    note: String.raw`Champ non linéaire : le flot de $X$ est intégré numériquement ; le crochet reste exact, $[X,Y]=Y'X-X'Y=\cos x\,\partial_y$.`,
  },
];

export const pairById = (id: string): FieldPair => FIELD_PAIRS.find((p) => p.id === id) ?? FIELD_PAIRS[0]!;

export interface CommutatorState {
  pairId: string;
  p: Vec;
  t: number;
}

const flowOf = (pair: FieldPair, which: 'X' | 'Y') => {
  const closed = which === 'X' ? pair.flowX : pair.flowY;
  const F = which === 'X' ? pair.X : pair.Y;
  return closed ?? ((p: Vec, t: number) => rk4(F, p, t));
};

/** C_t(p), en composant les flots (Φ^X_t s'applique en premier). */
export function commutatorPoint(pair: FieldPair, p: Vec, t: number): Vec {
  const fx = flowOf(pair, 'X');
  const fy = flowOf(pair, 'Y');
  return fy(fx(fy(fx(p, t), t), -t), -t);
}

/** Les quatre branches du chemin X, Y, −X, −Y, échantillonnées pour le dessin. */
export function commutatorLegs(pair: FieldPair, p: Vec, t: number, samples = 40): Vec[][] {
  const steps: { F: Field; closed?: (p: Vec, t: number) => Vec; sign: number }[] = [
    { F: pair.X, closed: pair.flowX, sign: 1 },
    { F: pair.Y, closed: pair.flowY, sign: 1 },
    { F: pair.X, closed: pair.flowX, sign: -1 },
    { F: pair.Y, closed: pair.flowY, sign: -1 },
  ];
  const legs: Vec[][] = [];
  let start = p;
  for (const s of steps) {
    const pts: Vec[] = [start];
    let cur = start;
    for (let k = 1; k <= samples; k++) {
      // Forme close : évaluation directe ; sinon intégration incrémentale (pas ≤ 0,005).
      cur = s.closed ? s.closed(start, (s.sign * t * k) / samples) : rk4(s.F, cur, (s.sign * t) / samples);
      pts.push(cur);
    }
    legs.push(pts);
    start = cur;
  }
  return legs;
}

export interface CommutatorData {
  readout: SceneReadout;
  legs: Vec[][];
  end: Vec;
  predicted: Vec;
  bracket: Vec;
  exactFlows: boolean;
  orders: { t: number; err: number; ratio: number | null }[];
  /** Le reste est nul à l'arrondi près pour toutes les valeurs de t testées. */
  remainderZero: boolean;
}

export function commutatorScene(s: CommutatorState): CommutatorData {
  const pair = pairById(s.pairId);
  const exactFlows = Boolean(pair.flowX && pair.flowY);
  const B = pair.bracket(s.p);
  const Bnum = bracketNumeric(pair.X, pair.Y, s.p);
  const end = commutatorPoint(pair, s.p, s.t);
  const predicted = vadd(s.p, B, s.t * s.t);
  const legs = commutatorLegs(pair, s.p, s.t);

  const ts = [s.t, s.t / 2, s.t / 4, s.t / 8];
  const errs = ts.map((t) => vdist(commutatorPoint(pair, s.p, t), vadd(s.p, B, t * t)));
  const tiny = 1e-11 * Math.max(1, vnorm(s.p));
  const remainderZero = errs.every((e) => e < tiny);
  const orders = ts.map((t, i) => ({ t, err: errs[i]!, ratio: i + 1 < ts.length && errs[i + 1]! > tiny ? errs[i]! / errs[i + 1]! : null }));

  const status = exactFlows ? ('exact' as const) : ('numerique' as const);
  const method = 'Runge–Kutta d’ordre 4, pas ≤ 0,005 pour le flot de X.';
  const gap = vdist(end, s.p);
  const err = errs[0]!;
  const ratio = orders[0]!.ratio;

  const readout: SceneReadout = {
    measures: [
      { id: 'bracket', label: String.raw`$[X,Y]_p$ (forme close)`, value: `$${vecTex(B, 4)}$`, status: 'exact' },
      {
        id: 'bracket-num',
        label: String.raw`$[X,Y]_p$ par jacobiennes`,
        value: `$${vecTex(Bnum, 4)}$`,
        status: 'numerique',
        method: 'Différences centrées, pas 10⁻⁶ ; écart à la forme close ' + fmt(vdist(B, Bnum), 9) + '.',
      },
      { id: 'end', label: '$C_t(p)$', value: `$${vecTex(end, 4)}$`, status, method },
      { id: 'pred', label: String.raw`$p+t^2[X,Y]_p$`, value: `$${vecTex(predicted, 4)}$`, status: 'exact' },
      { id: 'gap', label: String.raw`$|C_t(p)-p|$`, value: fmt(gap, 5), numeric: gap, status, method },
      { id: 'err', label: String.raw`Reste $|C_t(p)-p-t^2[X,Y]_p|$`, value: remainderZero ? '0 (à l’arrondi près)' : fmt(err, 6), numeric: err, status, method },
      {
        id: 'ratio',
        label: String.raw`Rapport des restes en $t$ et $t/2$`,
        value: ratio === null ? '—' : fmt(ratio, 3),
        numeric: ratio ?? undefined,
        status: ratio === null ? 'exact' : status,
        method,
      },
    ],
    equations: [
      { id: 'champs', tex: String.raw`$X=${pair.xTex}$, $\ Y=${pair.yTex}$ ; $\ [X,Y]=Y'X-X'Y=${pair.bracketTex}$.`, status: 'exact' },
      { id: 'flots', tex: String.raw`$${pair.flowXTex}$ ; $\ ${pair.flowYTex}$.`, status: exactFlows ? 'exact' : 'numerique' },
      { id: 'commutateur', tex: String.raw`$C_t=\Phi^Y_{-t}\circ\Phi^X_{-t}\circ\Phi^Y_t\circ\Phi^X_t$ et $C_t(p)=p+t^2[X,Y]_p+O(t^3)$.`, status: 'exact', note: 'Énoncé du résultat 36, démontré par développements à l’ordre 2.' },
      { id: 'note', tex: pair.note, status: 'exact' },
    ],
    hypotheses: [
      { id: 'c2', label: String.raw`$X$ et $Y$ de classe $C^2$`, state: 'satisfaite', detail: 'Champs de classe C∞.' },
      { id: 'flots', label: String.raw`Flots définis sur $[-t,t]$ le long du chemin`, state: 'satisfaite', detail: 'Champs complets : leurs flots sont définis pour tout temps.' },
    ],
    conclusions: [
      {
        id: 'developpement',
        label: String.raw`$C_t(p)=p+t^2[X,Y]_p+O(t^3)$`,
        state: 'illustrative',
        detail: remainderZero
          ? 'Ici le reste est nul : C_t(p) = p + t²[X,Y]_p à l’arrondi près, pour chaque t testé.'
          : `Le reste est divisé par environ 8 quand t est divisé par 2 (ordre 3). La preuve est l’exercice difficile du résultat 36.`,
      },
      {
        id: 'commutation',
        label: vnorm(B) < 1e-12 ? String.raw`$[X,Y]=0$ : les flots commutent` : String.raw`$[X,Y]_p\neq0$ : les flots ne commutent pas près de $p$`,
        state: 'illustrative',
        detail: vnorm(B) < 1e-12 ? 'Le chemin se referme : C_t(p) = p.' : `Le chemin ne se referme pas : l’écart vaut ${fmt(gap, 4)}.`,
      },
    ],
  };
  return { readout, legs, end, predicted, bracket: B, exactFlows, orders, remainderZero };
}
