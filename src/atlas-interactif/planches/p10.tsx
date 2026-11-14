/**
 * Planche 10 — Fonction inverse, implicite et niveau régulier.
 * F(x, y) = x² + y² : en un point p du niveau c > 0, dF_p = 2p ≠ 0 ; dans la carte
 * adaptée (θ, F − c), le niveau devient une droite. Pour c = 0, dF s'annule : pas de redressement.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, Circle, Dot, DragOnCurve, f2, Label, Plot, Segment, Slider } from '../kit2d';
import { TAU } from '../math';

export default function P10() {
  const [c, setC] = useState(1);
  const [a, setA] = useState(0.7);
  const r = Math.sqrt(c);
  const p: [number, number] = [r * Math.cos(a), r * Math.sin(a)];
  const grad: [number, number] = [2 * p[0], 2 * p[1]];
  const singular = c < 0.005;
  const k = 0.25;

  const before = (
    <div>
      <Plot xDomain={[-2, 2]} yDomain={[-2, 2]} width={340} height={340} grid={false} ariaLabel="Niveau de F avant redressement">
        {[0.4, 0.8, 1.6, 2.4, 3.2].map((l) => (
          <Circle key={l} c={[0, 0]} r={Math.sqrt(l)} color={C.faint} width={1} />
        ))}
        {!singular && <Circle c={[0, 0]} r={r} color={C.teal} width={2.6} />}
        {!singular && <Arrow a={p} b={[p[0] + k * grad[0], p[1] + k * grad[1]]} color={C.orange} width={2.4} />}
        {!singular && <DragOnCurve curve={(s) => [r * Math.cos(s), r * Math.sin(s)]} s={a} range={[0, TAU]} onChange={setA} name="Point p du niveau" label="p" color={C.ink} r={5} />}
        {singular && <Dot x={0} y={0} color={C.red} label="dF = 0" r={5} />}
        <Label x={0} y={0.12} text={singular ? '' : 'F = x² + y²'} color={C.teal} anchor="middle" size={12} italic />
      </Plot>
      <Caption>{singular ? 'Le niveau 0 se réduit à un point où dF s’annule.' : String.raw`Orange : $dF_p=2p\neq0$, orthogonal au niveau.`}</Caption>
    </div>
  );

  const after = (
    <div>
      <Plot xDomain={[-0.3, 6.6]} yDomain={[-1.6, 1.6]} width={340} height={160} grid={false} ariaLabel="Le niveau dans une carte adaptée">
        <Segment a={[0, 0.8]} b={[6.28, 0.8]} color={C.faint} width={1} />
        <Segment a={[0, -0.8]} b={[6.28, -0.8]} color={C.faint} width={1} />
        {!singular && <Segment a={[0, 0]} b={[6.28, 0]} color={C.teal} width={2.6} />}
        {!singular && <Arrow a={[a % TAU, 0]} b={[a % TAU, 1.2]} color={C.orange} width={2.2} />}
        {!singular && <Dot x={a % TAU} y={0} color={C.ink} r={4.5} label="p" dy={18} />}
        <Label x={6.5} y={0.05} text="F − c = 0" color={C.teal} anchor="end" size={11} italic />
        <Label x={6.5} y={0.88} text="F − c = δ" color={C.muted} anchor="end" size={10} />
      </Plot>
      <Caption>{singular ? 'Aucune carte adaptée : l’angle θ n’est pas défini à l’origine.' : String.raw`Coordonnées $(\theta,\,F-c)$ : une coordonnée libre le long du niveau.`}</Caption>
    </div>
  );

  return (
    <PlateScene
      n={10}
      panels={[
        { title: 'Un niveau avant redressement', render: () => before },
        { title: 'Le niveau dans une carte adaptée', render: () => after },
      ]}
      identity={String.raw`$dF_p$ surjective $\Rightarrow$ $F^{-1}(c)$ est une sous-variété près de $p$ et $T_pF^{-1}(c)=\ker dF_p$.`}
      controls={
        <>
          <Slider label="Niveau c" value={c} min={0} max={3} step={0.01} onChange={setC} format={(v) => f2(v)} />
          <p className="text-[12.5px] text-text-3">Fais glisser p le long du niveau.</p>
        </>
      }
      observations={[
        { id: 'orthogonal', text: String.raw`$dF_p$ est orthogonal au niveau : le vecteur tangent $(-p_2,p_1)$ est dans $\ker dF_p$.`, done: Math.abs(a - 0.7) > 0.6 && !singular },
        { id: 'droite', text: 'Dans la carte adaptée, le niveau est une droite et p y circule librement.', done: Math.abs(a - 0.7) > 1.5 && !singular },
        { id: 'singulier', text: String.raw`Descends à $c=0$ : $dF$ s'annule, le niveau n'est plus régulier.`, done: singular },
      ]}
      readings={[
        { label: String.raw`$dF_p=(2x,2y)$`, value: singular ? '(0 ; 0)' : `(${f2(grad[0], 3)} ; ${f2(grad[1], 3)})`, status: 'exact' },
        { label: String.raw`$dF_p(-p_2,p_1)$`, value: f2(grad[0] * -p[1] + grad[1] * p[0], 4), status: 'exact' },
        { label: String.raw`Rayon du niveau $\sqrt c$`, value: f2(r, 3), status: 'exact' },
      ]}
    />
  );
}
