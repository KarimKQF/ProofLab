/**
 * Planche 8 — Crochet de Lie et dérivée de Lie.
 * X = ∂x, Y = x∂y. Quatre petits déplacements (+X, +Y, −X, −Y) : le chemin ne se referme
 * pas, l'écart vaut exactement t² ∂y. Au même point : Y tiré en arrière par le flot de X
 * diffère de Y_p de t ∂y = t [X, Y]_p.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, Dot, DraggablePoint, f2, Label, Plot, Slider } from '../kit2d';

export default function P08() {
  const [p, setP] = useState<[number, number]>([0.6, 0.3]);
  const [t, setT] = useState(0.8);
  const [x, y] = p;
  const p1: [number, number] = [x + t, y];
  const p2: [number, number] = [x + t, y + t * (x + t)];
  const p3: [number, number] = [x, y + t * (x + t)];
  const p4: [number, number] = [x, y + t * (x + t) - t * x];
  const gap = p4[1] - y;

  const path = (
    <div>
      <Plot xDomain={[-0.4, 2.4]} yDomain={[-0.3, 2.5]} width={360} height={360} grid={false} ariaLabel="Quatre petits déplacements le long de X et de Y">
        <Arrow a={p} b={p1} color={C.teal} width={2.6} />
        <Arrow a={p1} b={p2} color={C.orange} width={2.6} />
        <Arrow a={p2} b={p3} color={C.teal} width={2.6} dash="6 4" />
        <Arrow a={p3} b={p4} color={C.orange} width={2.6} dash="6 4" />
        <Arrow a={p} b={p4} color={C.violet} width={2.2} />
        <Label x={(x + p1[0]) / 2} y={y - 0.12} text="+X" color={C.teal} anchor="middle" />
        <Label x={p1[0] + 0.06} y={(p1[1] + p2[1]) / 2} text="+Y" color={C.orange} />
        <Label x={(x + p2[0]) / 2} y={p2[1] + 0.07} text="−X" color={C.teal} anchor="middle" />
        <Label x={x - 0.06} y={(p3[1] + p4[1]) / 2} text="−Y" color={C.orange} anchor="end" />
        <Label x={x + 0.05} y={(y + p4[1]) / 2} text="t²" color={C.violet} />
        <Dot x={p4[0]} y={p4[1]} color={C.red} label="Cₜ(p)" r={4} dx={-48} />
        <DraggablePoint x={x} y={y} onChange={(a, b) => setP([a, b])} name="Point p" color={C.ink} label="p" bounds={[-0.3, 1.2, -0.2, 1]} step={0.05} r={6} />
      </Plot>
      <Caption>{String.raw`Le pas « $+Y$ » est plus long que « $-Y$ » : $Y=x\,\partial_y$ grandit avec $x$.`}</Caption>
    </div>
  );

  const compare = (
    <div>
      <Plot xDomain={[-0.4, 2.4]} yDomain={[-0.3, 2.5]} width={360} height={360} grid={false} ariaLabel="Comparer Y au point p et au point Φ_t^X(p)">
        <Arrow a={p} b={p1} color={C.muted} width={1.2} />
        <Arrow a={p1} b={[p1[0], p1[1] + p1[0]]} color={C.orange} width={2.4} />
        <Arrow a={[x + 0.04, y]} b={[x + 0.04, y + p1[0]]} color={C.orange} width={1.6} dash="5 3" />
        <Arrow a={[x - 0.04, y]} b={[x - 0.04, y + x]} color={C.teal} width={2.4} />
        <Arrow a={[x - 0.04, y + x]} b={[x - 0.04, y + p1[0]]} color={C.violet} width={2.2} />
        <Label x={p1[0] + 0.05} y={p1[1] + p1[0] / 2} text="Y au point Φₜ(p)" color={C.orange} size={12} />
        <Label x={x - 0.1} y={y + x / 2} text="Yₚ" color={C.teal} anchor="end" size={12} />
        <Label x={x + 0.1} y={y + (x + p1[0]) / 2 + 0.1} text="tiré en p" color={C.orange} size={11} />
        <Dot x={x} y={y} color={C.ink} label="p" r={4} dx={-14} dy={16} />
      </Plot>
      <Caption>{String.raw`Violet : la différence, égale à $t\,[X,Y]_p=t\,\partial_y$.`}</Caption>
    </div>
  );

  return (
    <PlateScene
      n={8}
      panels={[
        { title: 'Effectuer quatre petits déplacements', render: () => path },
        { title: 'Comparer les flèches au même point', render: () => compare },
      ]}
      identity={String.raw`$X=\partial_x,\ Y=x\,\partial_y\ \Rightarrow\ [X,Y]=\partial_y$, $\ C_t(x,y)=(x,\,y+t^2)$, $\ \mathcal L_XY=\dfrac{d}{dt}\Big|_{0}(\Phi^X_{-t})_*Y_{\Phi^X_t(p)}=[X,Y]_p$.`}
      controls={
        <>
          <Slider label="Durée t de chaque déplacement" value={t} min={0.05} max={1.2} step={0.01} onChange={setT} format={(v) => f2(v)} />
          <p className="text-[12.5px] text-text-3">Déplace p : l’écart ne dépend pas du point de départ.</p>
        </>
      }
      observations={[
        { id: 'ecart', text: String.raw`Le chemin ne se referme pas : l'écart vaut $t^2$, quel que soit $p$.`, done: t > 0.4 },
        { id: 'petit', text: String.raw`Réduis $t$ : l'écart décroît comme $t^2$, deux fois plus vite que les déplacements.`, done: t <= 0.15 },
        { id: 'derivee', text: String.raw`Dans le panneau de droite, la différence divisée par $t$ vaut $1$ : $\mathcal L_XY=\partial_y$.`, done: t > 0.2 && Math.abs(x) > 0.1 },
      ]}
      readings={[
        { label: String.raw`Écart $C_t(p)-p$`, value: `(0 ; ${f2(gap, 4)})`, status: 'exact' },
        { label: String.raw`Écart $/\,t^2$`, value: f2(gap / (t * t), 6), status: 'exact' },
        { label: String.raw`Différence des flèches $/\,t$`, value: f2((p1[0] - x) / t, 6), status: 'exact' },
      ]}
    />
  );
}
