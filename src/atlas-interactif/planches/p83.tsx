/**
 * Planche 83 — Peter-Weyl, caractères et passage de SU(2) à SO(3).
 * À gauche : les caractères χ_k(e^{iθ}) = e^{ikθ} du cercle sont orthonormés,
 * (1/2π)∫ e^{ikθ} e^{−ilθ} dθ = δ_kl. À droite : sur le tore maximal diag(e^{iθ}, e^{−iθ}) de
 * SU(2), le caractère de Sym^m(ℂ²) vaut χ_m(θ) = Σ_j e^{i(m−2j)θ} ; en θ = π (l'élément −I),
 * χ_m = (−1)^m (m+1) : −I agit trivialement exactement quand m est pair.
 */
import { useState } from 'react';
import { PlateScene } from '../PlateScene';
import { C, Caption, Choice, ClippedCurve, Dot, f2, Label, Plot, Segment, Slider } from '../kit2d';
import { linspace, simpson, TAU } from '../math';

const chi = (m: number, t: number) => {
  let s = 0;
  for (let j = 0; j <= m; j++) s += Math.cos((m - 2 * j) * t);
  return s;
};

export default function P83() {
  const [k1, setK1] = useState(1);
  const [k2, setK2] = useState(3);
  const [m, setM] = useState(0);
  const ts = linspace(0, TAU, 360);
  const D1: [number, number, number, number] = [0, TAU, -1.3, 1.3];
  const re = simpson((t) => Math.cos((k1 - k2) * t), 0, TAU, 600) / TAU;
  const im = simpson((t) => Math.sin((k1 - k2) * t), 0, TAU, 600) / TAU;
  const modes = (
    <div>
      <Plot xDomain={[0, TAU]} yDomain={[-1.3, 1.3]} width={320} height={250} ariaLabel="Modes du cercle">
        <ClippedCurve points={ts.map((t) => [t, Math.cos(k1 * t)])} domain={D1} color={C.teal} width={2.2} />
        <ClippedCurve points={ts.map((t) => [t, Math.cos(k2 * t)])} domain={D1} color={C.orange} width={2.2} />
      </Plot>
      <Caption>{String.raw`Parties réelles de $\chi_k$ (vert) et $\chi_l$ (orange) sur $[0,2\pi]$.`}</Caption>
    </div>
  );
  const top = m + 1.6;
  const D2: [number, number, number, number] = [0, TAU, -top, top];
  const descends = m % 2 === 0;
  const su2 = (
    <div>
      <Plot xDomain={[-0.3, TAU + 0.3]} yDomain={[-top, top + 1.4]} width={320} height={270} grid={false} ariaLabel="Quels irréductibles passent à SO(3) ?">
        <Segment a={[0, 0]} b={[TAU, 0]} color={C.faint} width={1} />
        <Segment a={[Math.PI, -top]} b={[Math.PI, top]} color={C.faint} width={1} dash="4 4" />
        {Array.from({ length: 7 }, (_, j) => (
          <g key={j}>
            <Dot x={0.3 + (j * (TAU - 0.6)) / 6} y={top + 0.75} color={j % 2 === 0 ? C.teal : C.orange} r={j === m ? 7 : 4} />
            <Label x={0.3 + (j * (TAU - 0.6)) / 6} y={top + 0.15} text={j % 2 === 0 ? '+I' : '−I'} color={j % 2 === 0 ? C.teal : C.orange} size={11} anchor="middle" />
          </g>
        ))}
        <ClippedCurve points={ts.map((t) => [t, chi(m, t)])} domain={D2} color={descends ? C.teal : C.orange} width={2.4} />
        <Dot x={0} y={m + 1} color={C.ink} r={5} />
        <Dot x={Math.PI} y={chi(m, Math.PI)} color={descends ? C.teal : C.orange} r={6} />
        <Label x={0} y={m + 1} text="I" color={C.ink} size={12} dx={8} dy={-6} />
        <Label x={Math.PI} y={chi(m, Math.PI)} text="−I" color={descends ? C.teal : C.orange} size={12} dx={8} dy={-6} />
      </Plot>
      <Caption>{String.raw`En haut : $m=0,\dots,6$ et l'action de $-I$ sur $\mathrm{Sym}^m(\mathbb C^2)$. En bas : $\chi_m(\theta)$ sur le tore maximal.`}</Caption>
    </div>
  );
  return (
    <PlateScene
      n={83}
      panels={[
        { title: 'Modes du cercle', render: () => modes },
        { title: 'Quels irréductibles passent à SO(3) ?', render: () => su2 },
      ]}
      identity={String.raw`$\chi_k(R_\theta)=e^{ik\theta}$, $\qquad(-I)\big|_{\mathrm{Sym}^m\mathbb C^2}=(-1)^mI$`}
      controls={
        <>
          <Slider label="Fréquence k (vert)" value={k1} min={0} max={6} step={1} onChange={setK1} format={(v) => String(v)} />
          <Slider label="Fréquence l (orange)" value={k2} min={0} max={6} step={1} onChange={setK2} format={(v) => String(v)} />
          <div>
            <p className="mb-1.5 text-[13px] text-text-2">Degré m de la représentation de SU(2)</p>
            <Choice options={[0, 1, 2, 3, 4, 5, 6].map((j) => ({ id: j, label: `m = ${j}` }))} value={m} onChange={setM} name="Degré m" />
          </div>
        </>
      }
      observations={[
        { id: 'ortho', text: String.raw`Prends $k=l$ : la moyenne de $\chi_k\overline{\chi_l}$ vaut $1$ ; deux fréquences différentes donnent $0$.`, done: k1 === k2 },
        { id: 'pair', text: String.raw`Choisis $m$ pair non nul : $\chi_m(-I)=\chi_m(I)=m+1$, donc $-I$ agit comme l'identité ; la représentation passe à $SO(3)$.`, done: descends && m >= 2 },
        { id: 'impair', text: String.raw`Choisis $m$ impair : $\chi_m(-I)=-(m+1)$, $-I$ agit par $-I$ ; pas de passage à $SO(3)$.`, done: !descends },
      ]}
      readings={[
        { label: String.raw`$\frac1{2\pi}\int_0^{2\pi}e^{i(k-l)\theta}\,d\theta$`, value: `${f2(re, 4)} ${im < 0 ? '−' : '+'} ${f2(Math.abs(im), 4)} i`, status: 'numerique' },
        { label: String.raw`$\dim\mathrm{Sym}^m(\mathbb C^2)=\chi_m(I)$`, value: String(m + 1), status: 'exact' },
        { label: String.raw`$\chi_m(-I)$`, value: `${descends ? '' : '−'}${m + 1} → ${descends ? 'passe à SO(3)' : 'ne passe pas'}`, status: 'exact' },
      ]}
    />
  );
}
