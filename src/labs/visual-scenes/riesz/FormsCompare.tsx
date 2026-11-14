/**
 * Forme linéaire ou forme quadratique ? Deux panneaux sur le même vecteur v :
 * lignes de niveau de ℓ (droites parallèles équidistantes) et courbes de niveau de
 * q(x) = a(x, x) (coniques). Le long de la droite ℝv : ℓ(tv) = tℓ(v), q(tv) = t²q(v).
 */
import { useMemo } from 'react';
import { levelLine, quadraticLevel, quadraticNature } from '@/core/visual-reasoning/riesz-scene';
import { dot, matVec, symPart, type Mat, type Vec } from '@/core/visual-reasoning/linalg';
import { fmt } from '@/core/visual-reasoning/types';
import { Claim, Dot, MathText, Plot, Segment, usePlot } from '@/labs/kit';
import { RH, RX, RY } from './RieszPlane';

const NATURE: Record<ReturnType<typeof quadraticNature>, string> = {
  'definie-positive': 'définie positive : courbes de niveau elliptiques, a est coercive',
  'definie-negative': 'définie négative : a(x, x) < 0 pour x ≠ 0',
  indefinie: 'indéfinie : hyperboles, a(x, x) change de signe — a n’est pas coercive',
  degeneree: 'dégénérée : un noyau non trivial — a n’est pas coercive',
};

function Arcs({ arcs, color }: { arcs: Vec[][]; color: string }) {
  const { sx, sy } = usePlot();
  return (
    <g>
      {arcs.map((arc, i) => (
        <polyline key={i} points={arc.map((p) => `${sx(p[0]!)},${sy(p[1]!)}`).join(' ')} fill="none" stroke={color} strokeWidth={1.4} />
      ))}
    </g>
  );
}

export function FormsCompare({ a, c, v }: { a: Mat; c: Vec; v: Vec }) {
  const levels = [-2, -1, 1, 2];
  const quad = useMemo(() => levels.map((k) => ({ k, arcs: quadraticLevel(a, k) })), [a]);
  const nature = quadraticNature(a);
  const q = (x: Vec) => dot(x, matVec(a, x));
  const l = (x: Vec) => dot(c, x);
  const skew = a.some((r, i) => r.some((x, j) => Math.abs(x - a[j]![i]!) > 1e-12));
  const S = symPart(a);
  return (
    <div className="space-y-3" data-testid="forms-compare">
      <div className="grid gap-3 @lg:grid-cols-2">
        <figure>
          <figcaption className="mb-1 text-[13px]">
            <MathText text={String.raw`Forme linéaire $\ell(x)=c^{\mathsf T}x$ : niveaux $\ell=-2,\dots,2$`} />
          </figcaption>
          <Plot xDomain={RX} yDomain={RY} height={RH} ariaLabel="Lignes de niveau de la forme linéaire">
            {[-2, -1, 0, 1, 2].map((k) => {
              const line = levelLine(c, k);
              if (!line) return null;
              const A: [number, number] = [line.point[0]! - 30 * line.dir[0]!, line.point[1]! - 30 * line.dir[1]!];
              const B: [number, number] = [line.point[0]! + 30 * line.dir[0]!, line.point[1]! + 30 * line.dir[1]!];
              return <Segment key={k} a={A} b={B} color={k === 0 ? 'var(--text-2)' : 'var(--st-access)'} width={1.2} dash={k === 0 ? '6 5' : undefined} />;
            })}
            <Dot x={v[0]!} y={v[1]!} r={4.5} color="var(--text)" label="v" />
          </Plot>
          <p className="mt-1 text-[12.5px] text-text-2">Droites parallèles, équidistantes : ℓ est linéaire.</p>
        </figure>
        <figure>
          <figcaption className="mb-1 text-[13px]">
            <MathText text={String.raw`Forme quadratique $q(x)=a(x,x)$ : niveaux $q=\pm1,\pm2$`} />
          </figcaption>
          <Plot xDomain={RX} yDomain={RY} height={RH} ariaLabel="Courbes de niveau de la forme quadratique">
            {quad.map(({ k, arcs }) => (
              <Arcs key={k} arcs={arcs} color={k > 0 ? 'var(--div-pos)' : 'var(--div-neg)'} />
            ))}
            <Dot x={v[0]!} y={v[1]!} r={4.5} color="var(--text)" label="v" />
          </Plot>
          <p className="mt-1 text-[12.5px] text-text-2" data-nature={nature}>
            <MathText text={`Partie symétrique ${NATURE[nature]}.`} />
          </p>
        </figure>
      </div>
      <table className="w-full text-[13px] tabular" data-testid="homogeneite">
        <thead>
          <tr className="text-text-3 text-left">
            <th className="font-normal">t</th>
            <th className="font-normal"><MathText text={String.raw`$\ell(tv)$`} /></th>
            <th className="font-normal"><MathText text={String.raw`$t\,\ell(v)$`} /></th>
            <th className="font-normal"><MathText text={String.raw`$q(tv)$`} /></th>
            <th className="font-normal"><MathText text={String.raw`$t^2q(v)$`} /></th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((t) => (
            <tr key={t}>
              <td>{t}</td>
              <td>{fmt(l(v.map((x) => t * x)))}</td>
              <td>{fmt(t * l(v))}</td>
              <td>{fmt(q(v.map((x) => t * x)))}</td>
              <td>{fmt(t * t * q(v))}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {skew && (
        <p className="text-[12.5px] text-text-2">
          <MathText
            text={String.raw`$A$ n'est pas symétrique : $q(x)=x^{\mathsf T}Sx$ avec $S=\tfrac{A+A^{\mathsf T}}2=\begin{pmatrix}${fmt(S[0]![0]!)}&${fmt(S[0]![1]!)}\\${fmt(S[1]![0]!)}&${fmt(S[1]![1]!)}\end{pmatrix}$. La partie antisymétrique n'apparaît pas dans $q$ ; elle compte pourtant dans $a(u,v)$, donc dans la solution $u$.`.replace(/(\d),(\d)/g, '$1{,}$2')}
          />
        </p>
      )}
      <Claim status="exact">Valeurs en formule fermée ; les courbes sont tracées à partir de leur équation polaire exacte.</Claim>
    </div>
  );
}
