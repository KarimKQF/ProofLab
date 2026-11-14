/**
 * Planche 44 — Jets d'ordre 1 et 2.
 * Deux fonctions de même valeur et même pente en 0 (même 1-jet) mais de dérivées secondes
 * différentes : de près, elles se confondent avec leur tangente ; de loin, la courbure les distingue.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, ClippedCurve, f2, Plot, Slider } from '../kit2d';
import { linspace } from '../math';

export default function P44() {
  const [slope, setSlope] = useState(0.44);
  const [a, setA] = useState(1.46);
  const [b, setB] = useState(-1.04);
  const [zoom, setZoom] = useState(1);
  const u1 = (x: number) => slope * x + (a / 2) * x * x + 0.15 * x ** 3;
  const u2 = (x: number) => slope * x + (b / 2) * x * x - 0.1 * x ** 3;
  const view = (d: number) => {
    const dom: [number, number, number, number] = [-d, d, -d, d];
    const xs = linspace(-d, d, 200);
    return (
      <Plot xDomain={[-d, d]} yDomain={[-d, d]} width={320} height={320} ariaLabel="Deux fonctions de même 1-jet">
        <ClippedCurve points={xs.map((x) => [x, slope * x])} domain={dom} color={C.muted} width={1.2} dash="5 4" />
        <ClippedCurve points={xs.map((x) => [x, u1(x)])} domain={dom} color={C.teal} width={2.4} />
        <ClippedCurve points={xs.map((x) => [x, u2(x)])} domain={dom} color={C.orange} width={2.4} />
      </Plot>
    );
  };
  return (
    <PlateScene
      n={44}
      panels={[
        { title: 'Même valeur et même pente', render: () => <div>{view(zoom)}<Caption>{`Fenêtre [−${f2(zoom)} ; ${f2(zoom)}] : les deux courbes et leur tangente commune.`}</Caption></div> },
        { title: 'La courbure les distingue', render: () => <div>{view(1)}<Caption>{String.raw`Même $j^1_0u$, deux valeurs de $u''(0)$.`}</Caption></div> },
      ]}
      identity={String.raw`$j^1_xu=(x,u(x),u'(x))$, $\quad j^2_xu=(x,u(x),u'(x),u''(x))$.`}
      controls={
        <>
          <Slider label="Pente commune u′(0)" value={slope} min={-1} max={1} step={0.01} onChange={setSlope} format={(x) => f2(x)} />
          <Slider label="u₁″(0) (vert)" value={a} min={-3} max={3} step={0.01} onChange={setA} format={(x) => f2(x)} />
          <Slider label="u₂″(0) (orange)" value={b} min={-3} max={3} step={0.01} onChange={setB} format={(x) => f2(x)} />
          <Slider label="Demi-largeur de la fenêtre de gauche" value={zoom} min={0.02} max={1} step={0.01} onChange={setZoom} format={(x) => f2(x)} />
        </>
      }
      observations={[
        { id: 'zoom', text: 'Resserre la fenêtre : les deux courbes se confondent avec leur tangente, même 1-jet.', done: zoom < 0.1 },
        { id: 'courbure', text: String.raw`Avec $u_1''(0)\neq u_2''(0)$, les 2-jets diffèrent : les courbes se séparent comme $\frac{x^2}2(u_1''-u_2'')$.`, done: Math.abs(a - b) > 1 && zoom > 0.6 },
        { id: 'egal', text: 'Rends les dérivées secondes égales : il faut aller à l’ordre 3 pour les séparer.', done: Math.abs(a - b) < 0.02 },
      ]}
      readings={[
        { label: String.raw`$j^1_0u_1=j^1_0u_2$`, value: `(0 ; 0 ; ${f2(slope, 2)})`, status: 'exact' },
        { label: String.raw`$u_1''(0)$ et $u_2''(0)$`, value: `${f2(a, 2)} ; ${f2(b, 2)}`, status: 'exact' },
      ]}
    />
  );
}
