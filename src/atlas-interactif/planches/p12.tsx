/**
 * Planche 12 — Distributions et théorème de Frobenius.
 * Trois champs de plans de ℝ³ : ker dz (feuilles z = c), ker(dz − y dx − x dy) (feuilles
 * z = xy + c), ker(dz − x dy) (non intégrable). Le relevé horizontal d'une boucle carrée de
 * côté a se referme dans les deux premiers cas ; dans le troisième, il monte de a².
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Choice, f2, Slider } from '../kit2d';
import { ParamSurface, Patch3, Point3, Polyline3, Scene3D, Segment3 } from '../kit3d';

type Dist = 'dz' | 'xy' | 'contact';
/** dz = h(x, y, dx, dy) le long d'un chemin horizontal. */
const slope = (d: Dist, x: number, y: number, dx: number, dy: number) => (d === 'dz' ? 0 : d === 'xy' ? y * dx + x * dy : x * dy);
/** Vecteurs engendrant le plan au point (x, y, z). */
const basis = (d: Dist, x: number, y: number): [number[], number[]] => [
  [1, 0, d === 'xy' ? y : 0],
  [0, 1, d === 'dz' ? 0 : x],
];

function liftSquare(d: Dist, a: number, x0: number, y0: number) {
  const corners: [number, number][] = [[x0, y0], [x0 + a, y0], [x0 + a, y0 + a], [x0, y0 + a], [x0, y0]];
  const pts: number[][] = [[x0, y0, 0]];
  let z = 0;
  for (let e = 0; e < 4; e++) {
    const [xa, ya] = corners[e]!;
    const [xb, yb] = corners[e + 1]!;
    const n = 40;
    for (let k = 1; k <= n; k++) {
      // Point milieu du petit pas : intégration exacte pour ces formes (degré ≤ 1 le long d'une arête).
      const xm = xa + ((xb - xa) * (k - 0.5)) / n;
      const ym = ya + ((yb - ya) * (k - 0.5)) / n;
      z += slope(d, xm, ym, (xb - xa) / n, (yb - ya) / n);
      pts.push([xa + ((xb - xa) * k) / n, ya + ((yb - ya) * k) / n, z]);
    }
  }
  return { pts, gap: z };
}

export default function P12() {
  const [d, setD] = useState<Dist>('contact');
  const [a, setA] = useState(1);
  const [lv, setLv] = useState(0.3);
  const { pts, gap } = liftSquare(d, a, -0.2, -0.4);
  const grid = [-1, 0, 1];

  const planes = (
    <Scene3D label="Champ de plans et feuilles" camera={[3.6, -3.2, 2.6]} height={360} showAxes axes={1.6} axisLabels={['x', 'y', 'z']}>
      {grid.flatMap((x) => grid.flatMap((y) => [-0.6, 0.4].map((z) => {
        const [e1, e2] = basis(d, x, y);
        const n1 = Math.hypot(...e1);
        const n2 = Math.hypot(...e2);
        return <Patch3 key={`${x}${y}${z}`} c={[x, y, z]} a={e1.map((u) => u / n1)} b={e2.map((u) => u / n2)} s={0.22} color="#1a9e96" opacity={0.3} />;
      })))}
      {d !== 'contact' && (
        <ParamSurface
          f={(x, y) => [x, y, d === 'dz' ? lv : x * y + lv]}
          u={[-1.3, 1.3, 26]}
          v={[-1.3, 1.3, 26]}
          color="#d8743a"
          opacity={0.35}
          deps={[d, lv]}
        />
      )}
    </Scene3D>
  );

  const lift = (
    <Scene3D label="Relevé horizontal d'une boucle carrée" camera={[3.4, -3.6, 2.4]} height={360} showAxes axes={1.6} axisLabels={['x', 'y', 'z']}>
      <Polyline3 points={[[-0.2, -0.4, 0], [-0.2 + a, -0.4, 0], [-0.2 + a, -0.4 + a, 0], [-0.2, -0.4 + a, 0], [-0.2, -0.4, 0]]} color="#9aa5b4" width={1.2} />
      <Polyline3 points={pts} color="#1a9e96" width={2.4} />
      <Segment3 a={[-0.2, -0.4, 0]} b={[-0.2, -0.4, gap]} color="#8a6fd6" width={2.4} />
      <Point3 p={[-0.2, -0.4, 0]} color="#e8eaef" size={0.05} />
      <Point3 p={[-0.2, -0.4, gap]} color="#8a6fd6" size={0.06} />
    </Scene3D>
  );

  const integrable = d !== 'contact';
  return (
    <PlateScene
      n={12}
      panels={[
        { title: 'Plans qui forment des feuilles', render: () => planes },
        { title: 'Boucle dont le relevé monte', render: () => lift },
      ]}
      identity={String.raw`$D=\ker(dz-x\,dy)$ : $[\partial_x,\ \partial_y+x\,\partial_z]=\partial_z\notin D$ ; relevé d'une boucle : $\Delta z=\oint x\,dy=\text{aire}$.`}
      controls={
        <>
          <Choice
            name="Champ de plans"
            value={d}
            onChange={setD}
            options={[
              { id: 'dz', label: String.raw`$\ker dz$` },
              { id: 'xy', label: String.raw`$\ker(dz-y\,dx-x\,dy)$` },
              { id: 'contact', label: String.raw`$\ker(dz-x\,dy)$` },
            ]}
          />
          <Slider label="Côté a de la boucle" value={a} min={0.2} max={1.6} step={0.01} onChange={setA} format={(x) => f2(x)} />
          {integrable && <Slider label="Feuille affichée (niveau)" value={lv} min={-1} max={1} step={0.01} onChange={setLv} format={(x) => f2(x)} />}
        </>
      }
      observations={[
        { id: 'monte', text: String.raw`Avec $\ker(dz-x\,dy)$, le relevé ne se referme pas : l'écart vaut $a^2$, l'aire de la boucle.`, done: d === 'contact' && a > 0.5 },
        { id: 'ferme', text: 'Avec un champ intégrable, le relevé revient à son point de départ, sur une feuille.', done: integrable },
        { id: 'feuille', text: String.raw`Pour $\ker(dz-y\,dx-x\,dy)$, les feuilles sont les surfaces $z=xy+c$, tangentes aux plans.`, done: d === 'xy' },
      ]}
      readings={[
        { label: 'Écart vertical du relevé', value: f2(gap, 4), status: 'numerique' },
        { label: String.raw`Aire $a^2$`, value: f2(a * a, 4), status: 'exact' },
        { label: 'Champ intégrable ?', value: integrable ? 'oui (involutif)' : 'non', status: 'exact' },
      ]}
      note="Relevé calculé par sommes au point milieu sur 160 pas : exact à l’arrondi près pour ces formes, affines le long de chaque arête."
    />
  );
}

