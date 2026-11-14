/**
 * Planche 90 — De la géométrie à l'analyse et au calcul.
 * Maillage du carré [0, 1]² en N × N carrés, chacun coupé en deux triangles (diagonales
 * alternées). La fonction chapeau du nœud (a, b) vaut 1 en ce nœud, 0 aux autres nœuds, et
 * elle est affine sur chaque triangle. L'interpolée affine par morceaux de
 * f(x, y) = sin(πx) sin(πy) a une erreur maximale en O(h²), h = 1/N.
 */
import { useMemo, useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, ClippedCurve, Dot, f2, Label, Plot, Poly, Segment, Slider } from '../kit2d';
import { Point3, Scene3D, TriMesh3 } from '../kit3d';

type Tri = [number, number, number];

function mesh(N: number) {
  const idx = (i: number, j: number) => j * (N + 1) + i;
  const pts: [number, number][] = [];
  for (let j = 0; j <= N; j++) for (let i = 0; i <= N; i++) pts.push([i / N, j / N]);
  const tris: Tri[] = [];
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      const a = idx(i, j);
      const b = idx(i + 1, j);
      const c = idx(i + 1, j + 1);
      const d = idx(i, j + 1);
      if ((i + j) % 2 === 0) tris.push([a, b, c], [a, c, d]);
      else tris.push([a, b, d], [b, c, d]);
    }
  }
  return { pts, tris, idx };
}

const f = (x: number, y: number) => Math.sin(Math.PI * x) * Math.sin(Math.PI * y);
const BARY: Tri[] = [
  [1, 0, 0], [0, 1, 0], [0, 0, 1], [0.5, 0.5, 0], [0.5, 0, 0.5], [0, 0.5, 0.5],
  [1 / 3, 1 / 3, 1 / 3], [2 / 3, 1 / 6, 1 / 6], [1 / 6, 2 / 3, 1 / 6], [1 / 6, 1 / 6, 2 / 3],
];

/** max |f − I_h f| estimé en 10 points barycentriques par triangle. */
function interpError(N: number): number {
  const { pts, tris } = mesh(N);
  let err = 0;
  for (const t of tris) {
    const P = t.map((k) => pts[k]!);
    const F = P.map(([x, y]) => f(x, y));
    for (const l of BARY) {
      const x = l[0] * P[0]![0] + l[1] * P[1]![0] + l[2] * P[2]![0];
      const y = l[0] * P[0]![1] + l[1] * P[1]![1] + l[2] * P[2]![1];
      err = Math.max(err, Math.abs(f(x, y) - (l[0] * F[0]! + l[1] * F[1]! + l[2] * F[2]!)));
    }
  }
  return err;
}

const LIST = [2, 3, 4, 5, 6, 8, 10, 12, 16, 20];

export default function P90() {
  const [N, setN] = useState(4);
  const [ai, setAi] = useState(2);
  const [bj, setBj] = useState(2);
  const [seen, setSeen] = useState<number[]>([8]);
  const a = Math.min(ai, N - 1);
  const b = Math.min(bj, N - 1);
  const { pts, tris, idx } = useMemo(() => mesh(N), [N]);
  const node = idx(a, b);
  const support = tris.filter((t) => t.includes(node));
  const count = support.length;
  const note = (k: number) => setSeen((s) => (s.includes(k) ? s : [...s, k]));
  const pick = (na: number, nb: number) => note(tris.filter((t) => t.includes(idx(Math.min(na, N - 1), Math.min(nb, N - 1)))).length);
  const errors = useMemo(() => LIST.map((n) => [n, interpError(n)] as const), []);
  const errN = useMemo(() => interpError(N), [N]);
  const err2N = useMemo(() => interpError(2 * N), [N]);
  const grid = (
    <div>
      <Plot xDomain={[-0.06, 1.06]} yDomain={[-0.06, 1.06]} width={260} height={260} grid={false} ariaLabel="Découper le domaine">
        {support.map((t, i) => (
          <Poly key={i} points={t.map((k) => pts[k]!)} fill={C.teal} opacity={0.35} />
        ))}
        {tris.map((t, i) => (
          <Poly key={`t${i}`} points={t.map((k) => pts[k]!)} stroke={C.blue} width={0.9} opacity={0} />
        ))}
        <Dot x={a / N} y={b / N} color={C.orange} r={5.5} />
      </Plot>
      <Caption>Nœud (orange) et triangles de son support (vert).</Caption>
    </div>
  );
  const X = (x: number) => 2.4 * (x - 0.5);
  const positions = pts.flatMap(([x, y], k) => [X(x), X(y), k === node ? 1.1 : 0]);
  const hat = (
    <Scene3D label="Une fonction test sur le maillage" camera={[2.4, -3.0, 2.3]} height={260}>
      <TriMesh3 positions={positions} triangles={tris.flat()} color="#8fb3d9" opacity={0.12} wire />
      <TriMesh3 positions={positions} triangles={support.flat()} color="#1a9e96" opacity={0.6} wire />
      <Point3 p={[X(a / N), X(b / N), 1.1]} color="#d8743a" size={0.06} />
    </Scene3D>
  );
  const all = [...errors.filter(([n]) => n !== N), [N, errN] as const].sort((u, v) => u[0] - v[0]);
  const lx = (n: number) => Math.log10(1 / n);
  const ly = (e: number) => Math.log10(e);
  const yMin = ly(errors[errors.length - 1]![1]) - 0.3;
  const yMax = ly(errors[0]![1]) + 0.3;
  const D: [number, number, number, number] = [lx(24), lx(1.6), yMin, yMax];
  // Droite de référence de pente 2, ancrée sur le maillage le plus fin.
  const xr = lx(20);
  const yr = ly(errors[errors.length - 1]![1]);
  const order = (
    <div>
      <Plot xDomain={[lx(24), lx(1.6)]} yDomain={[yMin - 0.25, yMax]} width={280} height={260} grid={false} ariaLabel="Erreur d’interpolation">
        <Segment a={[lx(24), yMin - 0.1]} b={[lx(1.6), yMin - 0.1]} color={C.faint} width={1} />
        {[2, 4, 8, 16].map((n) => (
          <g key={n}>
            <Segment a={[lx(n), yMin - 0.13]} b={[lx(n), yMin - 0.07]} color={C.muted} width={1} />
            <Label x={lx(n)} y={yMin - 0.3} text={`h = 1/${n}`} color={C.muted} size={10.5} anchor="middle" />
          </g>
        ))}
        <ClippedCurve points={[[lx(24), yr + 2 * (lx(24) - xr)], [lx(1.6), yr + 2 * (lx(1.6) - xr)]]} domain={D} color={C.muted} width={1.2} dash="5 4" />
        <ClippedCurve points={all.map(([n, e]) => [lx(n), ly(e)])} domain={D} color={C.teal} width={1.6} />
        {all.map(([n, e]) => (
          <Dot key={n} x={lx(n)} y={ly(e)} color={n === N ? C.gold : C.teal} r={n === N ? 6 : 3.5} />
        ))}
        <Label x={lx(5)} y={yMin + 0.15} text="pente 2" color={C.muted} size={11} anchor="middle" />
      </Plot>
      <Caption>{String.raw`Erreur en fonction de $h$, en échelles logarithmiques. Pointillés : pente 2. Pour $h$ grand, la pente n'est pas encore installée.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={90}
      panels={[
        { title: 'Découper le domaine', render: () => grid },
        { title: 'Une fonction test sur le maillage', render: () => hat },
        { title: 'Erreur d’interpolation', render: () => order },
      ]}
      identity={String.raw`$-\Delta u=f\ \Rightarrow\ \displaystyle\int_\Omega\nabla u\cdot\nabla v=\int_\Omega fv\quad(v\in H^1_0(\Omega))$`}
      controls={
        <>
          <Slider
            label="Finesse : N carrés par côté (h = 1/N)"
            value={N}
            min={2}
            max={12}
            step={1}
            onChange={(n) => {
              setN(n);
              pick(Math.min(ai, n - 1), Math.min(bj, n - 1));
            }}
            format={(n) => String(n)}
          />
          <Slider
            label="Nœud : colonne"
            value={a}
            min={1}
            max={11}
            step={1}
            onChange={(v) => {
              setAi(v);
              pick(v, b);
            }}
            format={(v) => String(Math.min(v, N - 1))}
          />
          <Slider
            label="Nœud : ligne"
            value={b}
            min={1}
            max={11}
            step={1}
            onChange={(v) => {
              setBj(v);
              pick(a, v);
            }}
            format={(v) => String(Math.min(v, N - 1))}
          />
        </>
      }
      observations={[
        { id: 'chapeau', text: 'Choisis un autre nœud : la fonction test vaut 1 en ce nœud, 0 aux autres, et elle est affine sur chaque triangle.', done: a !== 2 || b !== 2 },
        { id: 'support', text: 'Compare deux nœuds voisins : le support compte 8 ou 4 triangles, car la diagonale alterne d’un carré à l’autre.', done: seen.includes(8) && seen.includes(4) },
        { id: 'ordre', text: 'Raffine le maillage : diviser h par 2 divise l’erreur d’interpolation par environ 4 (ordre h²).', done: N >= 8 },
      ]}
      readings={[
        { label: 'Triangles dans le support du nœud', value: String(count), status: 'exact' },
        { label: 'Dimension de l’espace (nœuds intérieurs)', value: String((N - 1) ** 2), status: 'exact' },
        { label: String.raw`$\|f-I_hf\|_\infty$ pour $f=\sin\pi x\,\sin\pi y$`, value: f2(errN, 5), status: 'numerique' },
        { label: String.raw`Rapport erreur$(h)\,/\,$erreur$(h/2)$`, value: f2(errN / err2N, 3), status: 'numerique' },
      ]}
      note="Erreur maximale estimée en dix points de chaque triangle (sommets, milieux, centre de gravité et trois points intérieurs)."
    />
  );
}
