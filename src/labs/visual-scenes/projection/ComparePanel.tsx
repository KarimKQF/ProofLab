/**
 * Mode « avec / sans hypothèse » : deux panneaux synchronisés sur le même point x.
 * À gauche l'ensemble qui vérifie l'hypothèse, à droite le même ensemble privé de
 * l'hypothèse ; la conclusion de droite est justifiée analytiquement (verdict exact).
 * En dimension 3, les ensembles comparés sont invariants par rotation autour du centre :
 * la coupe par le plan passant par le centre et x est donc fidèle.
 */
import { useState } from 'react';
import { Button } from '@/components/ui';
import { comparisons, project, radialFrame, toPlane } from '@/core/visual-reasoning/projection-scene';
import type { Vec } from '@/core/visual-reasoning/linalg';
import { fmt } from '@/core/visual-reasoning/types';
import { Claim, Dot, MathText, Plot, Segment } from '@/labs/kit';
import { CircleAround, H2, Region2D, WithoutRegion2D, X2, Y2 } from './Scene2D';
import { sectionWindow } from './SectionView';

type Which = 'fermeture' | 'convexite' | 'completude';

export function ComparePanel({ dim, x, onX }: { dim: 2 | 3; x: Vec; onX: (v: Vec) => void }) {
  const [which, setWhich] = useState<Which>('fermeture');
  const list = comparisons(dim);
  const cmp = list.find((c) => c.id === which);
  const center = dim === 2 ? [0, 0] : [0, 0, 0];
  const frame = radialFrame(center, x);
  const to2 = (v: Vec): [number, number] => (dim === 2 ? [v[0]!, v[1]!] : toPlane(frame, v));
  const X = to2(x);
  const win = dim === 2 ? { x: X2, y: Y2 } : sectionWindow([X, [-2.6, -2.6], [2.6, 2.6]]);

  return (
    <div className="space-y-3" data-testid="compare">
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Hypothèse comparée">
        {(
          [
            ['fermeture', 'Comparer : K fermé'],
            ['convexite', 'Comparer : K convexe'],
            ['completude', 'Comparer : H complet'],
          ] as const
        ).map(([id, label]) => (
          <Button key={id} className="px-2 py-1 text-[12.5px]" variant={which === id ? 'primary' : 'outline'} aria-pressed={which === id} onClick={() => setWhich(id)}>
            {label}
          </Button>
        ))}
      </div>

      {cmp ? (
        (() => {
          const verdict = cmp.verdict(x);
          const pWith = project(cmp.withSet, x);
          const S2 = { center: [0, 0], r: cmp.without.r };
          const withoutKind = cmp.without.kind === 'disque-ouvert' || cmp.without.kind === 'boule-ouverte' ? ('disque-ouvert' as const) : ('cercle' as const);
          return (
            <>
              <div className="grid gap-3 @md:grid-cols-2">
                <figure data-compare="avec">
                  <figcaption className="mb-1 text-[13px] text-hyp">
                    Avec l’hypothèse : <MathText text={dim === 2 ? String.raw`$K=\overline B(0,2)$` : String.raw`$K=\overline B(0,2)\subset\mathbb R^3$`} />
                  </figcaption>
                  <Plot xDomain={win.x} yDomain={win.y} height={H2} ariaLabel="Ensemble vérifiant l’hypothèse, avec le projeté de x">
                    <Region2D K={{ kind: 'disque', center: [0, 0], r: 2 }} closed />
                    <Segment a={X} b={to2(pWith)} color="var(--st-access)" dash="4 4" />
                    <Dot x={to2(pWith)[0]} y={to2(pWith)[1]} r={5.5} color="var(--st-miss)" label="PₖX" />
                    <Dot x={X[0]} y={X[1]} r={6} color="var(--text)" label="x" />
                  </Plot>
                  <p className="mt-1 text-[12.5px] text-text-2">Le théorème s’applique : le projeté existe et il est unique.</p>
                </figure>
                <figure data-compare="sans">
                  <figcaption className="mb-1 text-[13px] text-miss">
                    Sans l’hypothèse : <MathText text={withoutLabel(cmp.without.kind)} />
                  </figcaption>
                  <Plot xDomain={win.x} yDomain={win.y} height={H2} ariaLabel="Ensemble privé de l’hypothèse, avec les points les plus proches s’il en existe">
                    <WithoutRegion2D S={{ kind: withoutKind, ...S2 }} />
                    {!verdict.attained && <CircleAround c={X} rho={verdict.infimum} color="var(--text-3)" dash="3 4" />}
                    {verdict.minimizers.map((m, i) => (
                      <Dot key={i} x={to2(m)[0]} y={to2(m)[1]} r={5.5} color="var(--st-miss)" label="p" />
                    ))}
                    <Dot x={X[0]} y={X[1]} r={6} color="var(--text)" label="x" />
                  </Plot>
                  <p className="mt-1 text-[12.5px]" data-verdict={verdict.attained ? (verdict.unique ? 'unique' : 'non-unique') : 'non-atteint'}>
                    <span className={verdict.attained && verdict.unique ? 'text-text-2' : 'text-miss'}>{verdict.text}</span>
                  </p>
                  <p className="text-[12.5px] text-text-3">Infimum de la distance : {fmt(verdict.infimum, 4)}</p>
                </figure>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Claim status="exact">Verdict par formule fermée de la distance à l’ensemble.</Claim>
                <Button variant="ghost" className="px-1.5 py-0.5 text-[12.5px]" onClick={() => onX(dim === 2 ? [4, 1.5] : [3, 1.5, 1])}>
                  Placer x hors de l’ensemble
                </Button>
                <Button variant="ghost" className="px-1.5 py-0.5 text-[12.5px]" onClick={() => onX(center)}>
                  Placer x au centre
                </Button>
              </div>
              {dim === 3 && <p className="text-[12px] text-text-3">Coupe par le plan contenant le centre et x : fidèle ici, car les deux ensembles sont invariants par rotation autour du centre.</p>}
            </>
          );
        })()
      ) : (
        <div className="rounded-md border border-line p-3 text-[13.5px] space-y-1.5" data-compare="completude">
          <p>
            <MathText text={String.raw`Sans complétude, une suite minimisante de Cauchy peut ne pas converger : la limite « manque » à l’espace.`} />
          </p>
          <p>
            <MathText text={String.raw`Contre-exemple : $C([-1,1])$ muni du produit scalaire de $L^2$ ; l'hyperplan fermé $\{u:\int_0^1u=0\}$ n'a aucun point à distance minimale de la fonction $1$.`} />
          </p>
          <p className="text-text-3 text-[12.5px]">Aucune figure fidèle n’est possible : l’espace est de dimension infinie. Le contre-exemple est analytique.</p>
          <Claim status="exact">Énoncé démontré analytiquement (pas de calcul numérique).</Claim>
        </div>
      )}
    </div>
  );
}

function withoutLabel(kind: 'disque-ouvert' | 'cercle' | 'boule-ouverte' | 'sphere'): string {
  switch (kind) {
    case 'disque-ouvert':
      return String.raw`disque ouvert $B(0,2)$, convexe mais non fermé`;
    case 'boule-ouverte':
      return String.raw`boule ouverte $B(0,2)\subset\mathbb R^3$, convexe mais non fermée`;
    case 'cercle':
      return String.raw`cercle $\{\|z\|=2\}$, fermé mais non convexe`;
    case 'sphere':
      return String.raw`sphère $\{\|z\|=2\}\subset\mathbb R^3$, fermée mais non convexe`;
  }
}
