/**
 * Planche 6 — Covecteur, différentielle et gradient.
 * f = x + y : sa différentielle ne dépend d'aucune métrique ; son gradient pour
 * g = diag(a, 1) vaut g⁻¹df = (1/a, 1) et tourne quand on étire la métrique.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, Curve, DraggablePoint, f2, Label, Plot, Slider } from '../kit2d';
import { linspace } from '../math';

const DOM: [number, number, number, number] = [-1.6, 1.6, -1.6, 1.6];

function Panel({ a, v, onV }: { a: number; v: [number, number]; onV?: (x: number, y: number) => void }) {
  const grad: [number, number] = [1 / a, 1];
  const k = 0.75 / Math.hypot(grad[0], grad[1]);
  const ellipse = linspace(0, 2 * Math.PI, 96).map((t) => [0.6 * Math.cos(t) / Math.sqrt(a), 0.6 * Math.sin(t)] as [number, number]);
  return (
    <Plot xDomain={DOM.slice(0, 2) as [number, number]} yDomain={DOM.slice(2) as [number, number]} width={340} height={340} grid={false} ariaLabel="Niveaux de f et gradient pour la métrique choisie">
      {linspace(-2, 2, 8).map((c) => (
        <Curve key={c} points={[[c - 2, 2], [c + 2, -2]]} color={C.teal} width={1} />
      ))}
      <Curve points={ellipse} color={C.violet} width={1.4} dash="5 4" />
      <Arrow a={[0, 0]} b={[k * grad[0], k * grad[1]]} color={C.orange} width={2.6} />
      {onV && (
        <>
          <Arrow a={[0, 0]} b={v} color={C.blue} width={2} />
          <DraggablePoint x={v[0]} y={v[1]} onChange={onV} name="Vecteur v" color={C.blue} label="v" bounds={DOM} step={0.05} r={6} />
        </>
      )}
      <Label x={k * grad[0] + 0.05} y={k * grad[1] + 0.05} text="grad f" color={C.orange} size={12} italic />
      <Label x={1.05} y={-1.45} text="f = x + y" color={C.teal} size={12} italic />
    </Plot>
  );
}

export default function P06() {
  const [a, setA] = useState(3);
  const [v, setV] = useState<[number, number]>([0.9, -0.3]);
  const df = v[0] + v[1];
  const g = a * (1 / a) * v[0] + 1 * v[1];
  const along: [number, number] = [1, -1];
  const gOrth = a * (1 / a) * along[0] + along[1];
  const euclidAngle = (Math.acos((1 / a + 1) / (Math.hypot(1 / a, 1) * Math.SQRT2)) * 180) / Math.PI;

  return (
    <PlateScene
      n={6}
      panels={[
        { title: 'Métrique euclidienne', render: () => <div><Panel a={1} v={v} /><Caption>Violet : vecteurs de longueur 0,6 pour g. Orange : le gradient.</Caption></div> },
        { title: 'Métrique étirée en x', render: () => <div><Panel a={a} v={v} onV={(x, y) => setV([x, y])} /><Caption>Le cercle unité devient une ellipse ; le gradient tourne.</Caption></div> },
      ]}
      identity={String.raw`$df_p(v)=g_p(\operatorname{grad}_gf,\,v)$, $\quad\operatorname{grad}_gf=g^{-1}df$, $\quad(F^*\alpha)_p(v)=\alpha_{F(p)}(dF_p\,v)$.`}
      controls={
        <>
          <Slider label="Étirement a de la métrique g = diag(a, 1)" value={a} min={0.25} max={4} step={0.05} onChange={setA} format={(x) => f2(x)} />
          <p className="text-[12.5px] text-text-3">Déplace v dans le panneau de droite : les deux membres de l’identité restent égaux.</p>
        </>
      }
      observations={[
        { id: 'tourne', text: String.raw`Étire la métrique : $df=dx+dy$ ne change pas, mais $\operatorname{grad}_gf=(1/a,\,1)$ tourne.`, done: Math.abs(a - 1) > 1.5 },
        { id: 'euclide', text: String.raw`Pour $a=1$, on retrouve le gradient euclidien $(1,1)$, orthogonal aux niveaux.`, done: Math.abs(a - 1) < 0.03 },
        { id: 'g-orth', text: String.raw`Pour tout $a$, le gradient est $g$-orthogonal aux niveaux : $g(\operatorname{grad}_gf,(1,-1))=0$.`, done: Math.abs(a - 1) > 0.5 },
      ]}
      readings={[
        { label: String.raw`$df(v)=v_x+v_y$`, value: f2(df, 4), status: 'exact' },
        { label: String.raw`$g(\operatorname{grad}_gf,v)$`, value: f2(g, 4), status: 'exact' },
        { label: String.raw`$g(\operatorname{grad}_gf,(1,-1))$`, value: f2(gOrth, 4), status: 'exact' },
        { label: 'Angle euclidien entre grad_g f et (1, 1)', value: `${f2(euclidAngle, 1)}°`, status: 'exact' },
      ]}
    />
  );
}
