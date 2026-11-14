/**
 * Planche 84 — Cartan, racines et poids dans sl₂.
 * À gauche : ad_H a pour valeurs propres +2 (E), 0 (H) et −2 (F). À droite : dans
 * Sym^m(ℂ²), de base e_j = x^{m−j} y^j, on a H e_j = (m − 2j) e_j, E e_j = j e_{j−1} et
 * F e_j = (m − j) e_{j+1} : E monte le poids de 2, F le descend de 2, et les deux s'annulent
 * aux poids extrêmes ±m. Les relations [H,E] = 2E, [H,F] = −2F, [E,F] = H sont vérifiées sur
 * les matrices entières.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, Choice, Dot, Label, Plot, Segment, Slider } from '../kit2d';
import { Button } from '@/components/ui';

type Mat = number[][];
const zeros = (n: number): Mat => Array.from({ length: n }, () => Array(n).fill(0) as number[]);
const mul = (A: Mat, B: Mat): Mat => A.map((row) => B[0]!.map((_, j) => row.reduce((s, x, k) => s + x * B[k]![j]!, 0)));
const sub = (A: Mat, B: Mat): Mat => A.map((row, i) => row.map((x, j) => x - B[i]![j]!));
const scale = (A: Mat, c: number): Mat => A.map((row) => row.map((x) => c * x));
const norm = (A: Mat) => Math.sqrt(A.reduce((s, row) => s + row.reduce((t, x) => t + x * x, 0), 0));
const br = (A: Mat, B: Mat) => sub(mul(A, B), mul(B, A));

function rep(m: number) {
  const H = zeros(m + 1);
  const E = zeros(m + 1);
  const F = zeros(m + 1);
  for (let j = 0; j <= m; j++) {
    H[j]![j] = m - 2 * j;
    if (j >= 1) E[j - 1]![j] = j;
    if (j < m) F[j + 1]![j] = m - j;
  }
  return { H, E, F };
}

const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const sup = (k: number) => String(k).split('').map((d) => SUP[Number(d)]).join('');
const mono = (a: number, b: number) => `${a === 0 ? '' : a === 1 ? 'x' : `x${sup(a)}`}${b === 0 ? '' : b === 1 ? 'y' : `y${sup(b)}`}` || '1';

const ROOT: Record<'E' | 'H' | 'F', { lambda: number; color: string; mat: string }> = {
  E: { lambda: 2, color: C.teal, mat: '[[0, 1], [0, 0]]' },
  H: { lambda: 0, color: C.blue, mat: '[[1, 0], [0, −1]]' },
  F: { lambda: -2, color: C.orange, mat: '[[0, 0], [1, 0]]' },
};

export default function P84() {
  const [X, setX] = useState<'E' | 'H' | 'F'>('E');
  const [m, setM] = useState(3);
  const [j, setJ] = useState(1);
  const [coef, setCoef] = useState(1);
  const [killed, setKilled] = useState<'' | 'E' | 'F'>('');
  const [seenTop, setSeenTop] = useState(false);
  const [seenBottom, setSeenBottom] = useState(false);
  const reset = (mm = m) => {
    setJ(Math.min(1, mm));
    setCoef(1);
    setKilled('');
  };
  const applyE = () => {
    if (killed) return;
    if (j === 0) {
      setKilled('E');
      setSeenTop(true);
      return;
    }
    setCoef(coef * j);
    setJ(j - 1);
  };
  const applyF = () => {
    if (killed) return;
    if (j === m) {
      setKilled('F');
      setSeenBottom(true);
      return;
    }
    setCoef(coef * (m - j));
    setJ(j + 1);
  };
  const { H, E, F } = rep(m);
  const e1 = norm(sub(br(H, E), scale(E, 2)));
  const e2 = norm(sub(br(H, F), scale(F, -2)));
  const e3 = norm(sub(br(E, F), H));
  const roots = (
    <div>
      <Plot xDomain={[-3, 3]} yDomain={[-1.5, 1.5]} width={300} height={220} grid={false} ariaLabel="Racines de sl₂">
        <Segment a={[-2.8, 0]} b={[2.8, 0]} color={C.faint} width={1.2} />
        {(['F', 'H', 'E'] as const).map((name) => (
          <g key={name}>
            <Dot x={ROOT[name].lambda} y={0} color={ROOT[name].color} r={name === X ? 8 : 5} />
            <Label x={ROOT[name].lambda} y={0.55} text={name} color={ROOT[name].color} size={16} anchor="middle" italic />
            <Label x={ROOT[name].lambda} y={-0.6} text={ROOT[name].lambda > 0 ? `+${ROOT[name].lambda}` : ROOT[name].lambda === 0 ? '0' : `−${-ROOT[name].lambda}`} color={ROOT[name].color} size={13} anchor="middle" />
          </g>
        ))}
        <Label x={0} y={-1.2} text="Valeurs propres de ad(H)" color={C.muted} size={12} anchor="middle" />
      </Plot>
      <Caption>{String.raw`$[H,${X}]=${ROOT[X].lambda}\,${X}$ : ${X === 'H' ? 'poids nul (la sous-algèbre de Cartan).' : 'une racine.'}`}</Caption>
    </div>
  );
  const weights = Array.from({ length: m + 1 }, (_, i) => m - 2 * i);
  const wx = (w: number) => w;
  const sym = (
    <div>
      <Plot xDomain={[-m - 1, m + 1]} yDomain={[-1.6, 1.6]} width={320} height={220} grid={false} ariaLabel={`Poids de Sym${sup(m)}(ℂ²)`}>
        <Segment a={[-m - 0.8, 0]} b={[m + 0.8, 0]} color={C.faint} width={1} />
        {weights.slice(1).map((w) => (
          <Arrow key={`e${w}`} a={[wx(w) + 0.25, 0.45]} b={[wx(w) + 1.75, 0.45]} color={C.teal} width={1.6} />
        ))}
        {weights.slice(1).map((w) => (
          <Arrow key={`f${w}`} a={[wx(w) + 1.75, -0.45]} b={[wx(w) + 0.25, -0.45]} color={C.orange} width={1.6} />
        ))}
        {weights.map((w, i) => (
          <g key={w}>
            <Dot x={wx(w)} y={0} color={i === j && !killed ? C.gold : C.blue} r={i === j && !killed ? 8 : 4.5} />
            <Label x={wx(w)} y={-1.05} text={w > 0 ? `+${w}` : w === 0 ? '0' : `−${-w}`} color={C.muted} size={12} anchor="middle" />
          </g>
        ))}
        <Label x={0} y={1.2} text="E monte de deux" color={C.teal} size={12} anchor="middle" />
        <Label x={0} y={-1.45} text="F descend de deux" color={C.orange} size={12} anchor="middle" />
      </Plot>
      <Caption>{String.raw`Poids $m,m-2,\dots,-m$ de $\mathrm{Sym}^m(\mathbb C^2)$ ; le point doré est le vecteur courant.`}</Caption>
    </div>
  );
  const a = m - j;
  const current = killed ? `0 (${killed} annule le vecteur de poids ${killed === 'E' ? `+${m}` : `−${m}`})` : `${coef === 1 ? '' : coef}${mono(a, j)}, poids ${a - j}`;
  return (
    <PlateScene
      n={84}
      panels={[
        { title: 'Racines de sl₂', render: () => roots },
        { title: `Poids de Sym${sup(m)}(ℂ²)`, render: () => sym },
      ]}
      identity={String.raw`$[H,E]=2E,\quad[H,F]=-2F,\quad[E,F]=H,\qquad\rho(\mathfrak g_\alpha)V_\lambda\subset V_{\lambda+\alpha}$`}
      controls={
        <>
          <div>
            <p className="mb-1.5 text-[13px] text-text-2">Élément X de sl₂ (à gauche)</p>
            <Choice options={[{ id: 'E', label: 'E' }, { id: 'H', label: 'H' }, { id: 'F', label: 'F' }]} value={X} onChange={(v) => setX(v as 'E' | 'H' | 'F')} name="Élément de sl₂" />
          </div>
          <Slider
            label="Degré m de la représentation"
            value={m}
            min={1}
            max={6}
            step={1}
            onChange={(v) => {
              setM(v);
              reset(v);
            }}
            format={(v) => String(v)}
          />
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" className="text-[13px]" onClick={applyE} disabled={Boolean(killed)}>
              Appliquer E
            </Button>
            <Button variant="primary" className="text-[13px]" onClick={applyF} disabled={Boolean(killed)}>
              Appliquer F
            </Button>
            <Button variant="outline" className="text-[13px]" onClick={() => reset()}>
              Repartir de {mono(m - 1, 1)}
            </Button>
          </div>
        </>
      }
      observations={[
        { id: 'monte', text: 'Applique E plusieurs fois : le poids monte de 2 à chaque pas ; au poids maximal m, E donne 0.', done: seenTop },
        { id: 'descend', text: 'Applique F jusqu’en bas : le poids descend de 2 ; au poids −m, F donne 0.', done: seenBottom },
        { id: 'racines', text: String.raw`Choisis $F$ ou $H$ à gauche : $[H,X]=\lambda X$ avec $\lambda=-2$ ou $0$ ; les racines sont $\pm2$.`, done: X !== 'E' },
        { id: 'dim', text: 'Change m : m + 1 poids, espacés de 2, symétriques autour de 0.', done: m !== 3 },
      ]}
      readings={[
        { label: 'Vecteur courant', value: current, status: 'exact' },
        { label: String.raw`$\|[H,E]-2E\|,\ \|[H,F]+2F\|,\ \|[E,F]-H\|$ (matrices de taille $m+1$)`, value: `${e1} ; ${e2} ; ${e3}`, status: 'exact' },
        { label: String.raw`Matrice de $${X}$ dans $\mathfrak{sl}_2$`, value: ROOT[X].mat, status: 'exact' },
      ]}
    />
  );
}
