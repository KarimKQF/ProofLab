/**
 * Planche 45 — Contact, dérivée totale et prolongement.
 * Dans J¹ = {(x, u, p)}, les plans de contact ker(du − p dx) sont engendrés par ∂p et
 * ∂x + p∂u ; le relevé (x, φ(x), φ′(x)) d'un graphe leur est tangent. L'étirement
 * (x̄, ū) = (ax, bu) prolonge en p̄ = (b/a) p.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, ClippedCurve, f2, Plot, Slider } from '../kit2d';
import { Arrow3, Patch3, Point3, Polyline3, Scene3D } from '../kit3d';
import { linspace } from '../math';

const phi = (x: number) => Math.sin(x);
const dphi = (x: number) => Math.cos(x);

export default function P45() {
  const [x0, setX0] = useState(0.6);
  const [a, setA] = useState(1);
  const [b, setB] = useState(1.6);
  // Coordonnées d'affichage : (x, p, u) avec u vertical.
  const P = (x: number, u: number, p: number): [number, number, number] => [x, p, u];
  const lift = linspace(-2.5, 2.5, 160).map((x) => P(x, phi(x), dphi(x)));
  const q = P(x0, phi(x0), dphi(x0));
  const tang = [1, -Math.sin(x0), dphi(x0)]; // (dx, dp, du) le long du relevé
  const contact = dphi(x0) * 1 - dphi(x0) * 1; // du − p dx sur (dx, du) = (1, φ′)
  const planes = [-2, -1, 0, 1, 2].flatMap((x) =>
    [-1, 0, 1].map((p) => {
      const e1 = [1, 0, p].map((v) => v / Math.hypot(1, p)); // ∂x + p∂u, affiché (x, p, u)
      return <Patch3 key={`${x}${p}`} c={P(x, 0, p)} a={e1} b={[0, 1, 0]} s={0.22} color="#1a9e96" opacity={0.25} />;
    }),
  );
  const j1 = (
    <Scene3D label="Plans de contact et relevé d'un graphe" camera={[3.6, -4.4, 2.6]} height={330} showAxes axes={2.6} axisLabels={['x', 'p', 'u']}>
      {planes}
      <Polyline3 points={lift} color="#d8743a" width={2.4} />
      <Point3 p={q} color="#d8743a" size={0.07} />
      <Arrow3 a={q} b={q.map((v, i) => v + 0.6 * tang[i]!)} color="#8a6fd6" />
    </Scene3D>
  );
  const xs = linspace(-3, 3, 240);
  const dom: [number, number, number, number] = [-3, 3, -2.4, 2.4];
  const p = dphi(x0);
  const pb = (b / a) * p;
  const X0 = a * x0;
  const U0 = b * phi(x0);
  const stretch = (
    <div>
      <Plot xDomain={[-3, 3]} yDomain={[-2.4, 2.4]} width={330} height={264} ariaLabel="Graphe avant et après étirement">
        <ClippedCurve points={xs.map((x) => [x, phi(x)])} domain={dom} color={C.teal} width={2} />
        <ClippedCurve points={xs.map((x) => [x, b * phi(x / a)])} domain={dom} color={C.blue} width={2} dash="6 4" />
        <Arrow a={[x0, phi(x0)]} b={[x0 + 0.7, phi(x0) + 0.7 * p]} color={C.teal} width={2.2} />
        <Arrow a={[X0, U0]} b={[X0 + 0.7, U0 + 0.7 * pb]} color={C.blue} width={2.2} />
      </Plot>
      <Caption>{String.raw`Vert : $u=\sin x$ et sa tangente. Bleu : le graphe étiré, de pente $\bar p=(b/a)\,p$.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={45}
      panels={[
        { title: 'Directions de contact dans J¹', render: () => j1 },
        { title: 'Après étirement du graphe', render: () => stretch },
      ]}
      identity={String.raw`$du-p\,dx=0$ ; $\ D_x=\partial_x+p\,\partial_u+q\,\partial_p+\cdots$, $\ \eta^{(1)}=D_x\eta-p\,D_x\xi$ ; étirement : $\bar p=(b/a)\,p$.`}
      controls={
        <>
          <Slider label="Point x₀ du graphe" value={x0} min={-2.4} max={2.4} step={0.01} onChange={setX0} format={(x) => f2(x)} />
          <Slider label="Étirement a en x" value={a} min={0.4} max={2} step={0.01} onChange={setA} format={(x) => f2(x)} />
          <Slider label="Étirement b en u" value={b} min={-2} max={2} step={0.01} onChange={setB} format={(x) => f2(x)} />
        </>
      }
      observations={[
        { id: 'tangent', text: String.raw`Le relevé du graphe reste tangent aux plans de contact : $du-p\,dx=0$ le long de lui.`, done: Math.abs(x0 - 0.6) > 0.8 },
        { id: 'pente', text: String.raw`Étire en $x$ seulement : la pente est divisée par $a$.`, done: Math.abs(b - 1) < 0.02 && Math.abs(a - 1) > 0.4 },
        { id: 'retourne', text: String.raw`Avec $b<0$, le graphe se retourne et la pente change de signe.`, done: b < -0.2 },
      ]}
      readings={[
        { label: String.raw`$du-p\,dx$ sur le vecteur tangent du relevé`, value: f2(contact, 12), status: 'exact' },
        { label: String.raw`$p$ et $\bar p=(b/a)p$`, value: `${f2(p, 4)} ; ${f2(pb, 4)}`, status: 'exact' },
      ]}
    />
  );
}
