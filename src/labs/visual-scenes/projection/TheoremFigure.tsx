/**
 * Figure de la démonstration animée du théorème de projection : un état visuel par
 * étape. Les objets (suite minimisante, milieux, second minimiseur hypothétique) sont
 * calculés par `theoremAnimation` ; ce composant ne fait que les placer.
 */
import type { TheoremAnimation } from '@/core/visual-reasoning/projection-scene';
import type { Vec } from '@/core/visual-reasoning/linalg';
import { fmt } from '@/core/visual-reasoning/types';
import { Claim, Dot, MathText, Segment, usePlot } from '@/labs/kit';
import { CircleAround, zColor } from './Scene2D';

type P2 = [number, number];

function Seq({ pts, color, labels = 3, prefix }: { pts: P2[]; color: string; labels?: number; prefix: string }) {
  const { sx, sy } = usePlot();
  const sub = ['₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈'];
  return (
    <g>
      {pts.map((p, i) => (
        <g key={i} className="anim-rise" style={{ animationDelay: `${i * 0.12}s` }}>
          <circle cx={sx(p[0])} cy={sy(p[1])} r={Math.max(2.5, 5 - i * 0.35)} fill={color} />
          {i < labels && (
            <text x={sx(p[0]) + 7} y={sy(p[1]) + 14} fontSize={12} fill={color} fontFamily="var(--font-mono)">
              {prefix}
              {sub[i]}
            </text>
          )}
        </g>
      ))}
    </g>
  );
}

function Ring({ at, color, label }: { at: P2; color: string; label?: string }) {
  const { sx, sy } = usePlot();
  return (
    <g>
      <circle cx={sx(at[0])} cy={sy(at[1])} r={6} fill="none" stroke={color} strokeWidth={2} />
      {label && (
        <text x={sx(at[0]) + 9} y={sy(at[1]) - 8} fontSize={12.5} fill={color} fontFamily="var(--font-mono)">
          {label}
        </text>
      )}
    </g>
  );
}

/** Objets de l'étape `stage` (indice dans PROJECTION_THEOREM_STAGES), à placer dans un <Plot>. */
export function TheoremOverlay({ stage, anim, x, to2 }: { stage: number; anim: TheoremAnimation; x: Vec; to2: (v: Vec) => P2 }) {
  const X = to2(x);
  const P = to2(anim.p);
  const seq = anim.sequence.map(to2);
  return (
    <g data-figure-stage={stage} key={stage}>
      {stage === 0 && <CircleAround c={X} rho={anim.d} color="var(--text-3)" dash="4 4" />}
      {stage === 1 && (
        <g className="anim-rise">
          <Segment a={to2(anim.convex.u)} b={to2(anim.convex.v)} color="var(--st-hyp)" width={2.2} />
          <Dot x={to2(anim.convex.u)[0]} y={to2(anim.convex.u)[1]} color="var(--st-hyp)" label="u" />
          <Dot x={to2(anim.convex.v)[0]} y={to2(anim.convex.v)[1]} color="var(--st-hyp)" label="v" />
          <Dot x={to2(anim.convex.mid)[0]} y={to2(anim.convex.mid)[1]} r={3.5} color="var(--st-proved)" label="(u+v)/2" dy={16} />
        </g>
      )}
      {stage === 2 && (
        <>
          <Seq pts={anim.closure.seq.map(to2)} color="var(--st-access)" prefix="q" />
          <Ring at={to2(anim.closure.limit)} color="var(--st-proved)" label="ℓ ∈ K" />
        </>
      )}
      {stage === 3 && (
        <>
          <CircleAround c={X} rho={anim.d} color="var(--text-3)" dash="4 4" />
          <Seq pts={seq} color="var(--st-access)" prefix="p" />
        </>
      )}
      {stage === 4 && (
        <>
          <Seq pts={seq} color="var(--st-access)" prefix="p" labels={0} />
          {anim.pairs.map((pr) => {
            const a = seq[pr.n - 1]!;
            const b = seq[pr.m - 1]!;
            const m = to2(pr.mid);
            return (
              <g key={`${pr.n}-${pr.m}`} className="anim-rise">
                <Segment a={a} b={b} color="var(--st-access)" width={1} dash="3 3" />
                <Dot x={m[0]} y={m[1]} r={3} color="var(--st-hyp)" />
              </g>
            );
          })}
        </>
      )}
      {stage >= 5 && <CircleAround c={X} rho={anim.d} color="var(--st-access)" />}
      {stage === 5 && <Segment a={X} b={P} color="var(--st-access)" dash="4 4" />}
      {stage === 6 && anim.ghost && (
        <g className="anim-rise">
          <Segment a={P} b={to2(anim.ghost.q)} color="var(--st-invalid)" width={1.2} dash="4 3" />
          <Ring at={to2(anim.ghost.q)} color="var(--st-invalid)" label="q ?" />
          <Dot x={to2(anim.ghost.m)[0]} y={to2(anim.ghost.m)[1]} r={3.5} color="var(--st-invalid)" label="m" dy={16} />
          <Segment a={X} b={to2(anim.ghost.m)} color="var(--st-invalid)" width={1} />
        </g>
      )}
      {stage === 7 && (
        <g className="anim-rise">
          <Segment a={P} b={X} color="var(--st-access)" arrow />
          {anim.zs.map((z, i) => (
            <Segment key={i} a={P} b={to2(z)} color={zColor(i)} arrow />
          ))}
        </g>
      )}
      {stage >= 5 && <Dot x={P[0]} y={P[1]} r={5.5} color="var(--st-miss)" label="p" />}
      <Dot x={X[0]} y={X[1]} r={6} color="var(--text)" label="x" />
    </g>
  );
}

/** Données chiffrées de l'étape (formules fermées évaluées) ; jamais présentées comme une preuve. */
export function TheoremCaption({ stage, anim }: { stage: number; anim: TheoremAnimation }) {
  if (anim.inside) {
    return <p className="text-[13px] text-miss" data-testid="theorem-caption">x appartient à K : P_Kx = x et d = 0. Place x hors de K pour voir la suite minimisante.</p>;
  }
  const rows: string[] = [];
  if (stage === 0) rows.push(String.raw`$d=\inf_{z\in K}\|x-z\|=${fmt(anim.d, 4)}$`);
  if (stage === 3) {
    rows.push(anim.distances.map((v, i) => String.raw`$\|x-p_{${i + 1}}\|=${fmt(v, 4)}$`).join(' · '));
    rows.push(String.raw`Limite : $d=${fmt(anim.d, 4)}$`);
  }
  if (stage === 4) {
    for (const pr of anim.pairs) rows.push(String.raw`$\|p_{${pr.n}}-p_{${pr.m}}\|^2=${fmt(pr.gap, 4)}\le 2\|x-p_{${pr.n}}\|^2+2\|x-p_{${pr.m}}\|^2-4d^2=${fmt(pr.bound, 4)}$`);
  }
  if (stage === 6 && anim.ghost) rows.push(String.raw`$\|x-m\|=${fmt(anim.ghost.distM, 4)}<d=${fmt(anim.d, 4)}$ : si $q$ était dans $K$, le milieu $m\in K$ serait strictement plus proche que $d$ — impossible.`);
  if (stage === 7) anim.inner.forEach((v, i) => rows.push(String.raw`$\langle x-p,\,z_${i + 1}-p\rangle=${fmt(v, 4)}$`));
  return (
    <div className="space-y-1 text-[13px]" data-testid="theorem-caption">
      {rows.map((r, i) => (
        <p key={i}>
          <MathText text={r} />
        </p>
      ))}
      <Claim status="illustratif">Figure d’un exemple ; la démonstration est le graphe ci-dessous.</Claim>
    </div>
  );
}
