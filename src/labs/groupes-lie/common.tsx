/**
 * Laboratoire G — éléments communs aux six scènes : vues de lecture (équations, mesures,
 * hypothèses), panneau « Démontrer et relire » (résultats du jeu, planches de l'atlas),
 * flèches de champ et palette lisible sur les deux thèmes.
 */
import { Link } from 'react-router-dom';
import { LinkButton } from '@/components/ui';
import { EquationsPanel, HypothesesPanel, MeasuresPanel } from '@/components/math-visualizations/panels';
import type { StudioView } from '@/components/math-visualizations/MathViewStudio';
import { plateById, plateImage } from '@/content/atlas';
import { THEOREM_CATALOG } from '@/content/catalog';
import type { SceneReadout } from '@/core/visual-reasoning/types';
import type { Field } from '@/core/visual-reasoning/lie-core';
import { Panel, Segment } from '../kit';

export const LIE_COLORS = {
  X: '#199e70',
  Y: '#c98500',
  bracket: '#d55181',
  predicted: '#9085e9',
  blue: '#3987e5',
  orange: '#d95926',
} as const;

/** Vues « Équations et mesures » et « Hypothèses », alimentées par la lecture de la scène. */
export function readoutViews(readout: SceneReadout): StudioView[] {
  return [
    {
      id: 'equations',
      title: 'Équations et mesures',
      render: () => (
        <div className="space-y-4">
          <EquationsPanel equations={readout.equations} />
          <div className="border-t border-line pt-3">
            <MeasuresPanel measures={readout.measures} />
          </div>
        </div>
      ),
    },
    { id: 'hypotheses', title: 'Hypothèses', render: () => <HypothesesPanel hypotheses={readout.hypotheses} conclusions={readout.conclusions} /> },
  ];
}

/** Panneau de renvois : fiches des résultats à démontrer, planches de l'atlas à relire. */
export function RelatedPanel({ theorems, plates }: { theorems: string[]; plates: number[] }) {
  return (
    <Panel title="Démontrer et relire">
      <p className="text-[13px] text-text-2 mb-2">La scène illustre ; les démonstrations se jouent dans le moteur de preuve.</p>
      <div className="flex flex-col gap-1.5">
        {theorems.map((id) => {
          const e = THEOREM_CATALOG.find((x) => x.id === id);
          return e ? (
            <LinkButton key={id} to={`/theoreme/${id}`} className="w-full justify-start text-left text-[13px]">
              Résultat {e.n} · {e.name}
            </LinkButton>
          ) : null;
        })}
      </div>
      {plates.length > 0 && (
        <ul className="mt-3 grid grid-cols-2 gap-2" aria-label="Planches de l’atlas">
          {plates.map((n) => {
            const p = plateById(n);
            return p ? (
              <li key={n}>
                <Link to={`/atlas/${n}`} className="block rounded border border-line hover:border-line-strong overflow-hidden" data-plate-link={n}>
                  <img src={plateImage(n, 'mini')} alt="" loading="lazy" className="w-full aspect-[1.414] object-cover bg-white" />
                  <span className="block px-1.5 py-1 text-[11.5px] leading-tight">
                    <span className="font-mono text-text-3">Planche {n}</span> · {p.title}
                  </span>
                </Link>
              </li>
            ) : null;
          })}
        </ul>
      )}
    </Panel>
  );
}

/** Champ de vecteurs dessiné par des flèches de longueur écran bornée. */
export function Quiver({ F, domain, color, n = 9, shift = 0.5 }: { F: Field; domain: [number, number, number, number]; color: string; n?: number; shift?: number }) {
  const [x0, x1, y0, y1] = domain;
  const dx = (x1 - x0) / n;
  const dy = (y1 - y0) / n;
  const items: { a: [number, number]; b: [number, number] }[] = [];
  let maxLen = 0;
  const raw: { p: [number, number]; v: [number, number] }[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const p: [number, number] = [x0 + (i + shift) * dx, y0 + (j + shift) * dy];
      const v = F(p);
      raw.push({ p, v: [v[0]!, v[1]!] });
      maxLen = Math.max(maxLen, Math.hypot(v[0]!, v[1]!));
    }
  }
  const unitLen = 0.42 * Math.min(dx, dy);
  for (const { p, v } of raw) {
    const len = Math.hypot(v[0], v[1]);
    if (len < 1e-9 || maxLen === 0) continue;
    // Longueur affichée croissante avec |F|, bornée pour rester lisible.
    const k = (unitLen * (0.35 + 0.65 * Math.min(1, len / maxLen))) / len;
    items.push({ a: p, b: [p[0] + k * v[0], p[1] + k * v[1]] });
  }
  return (
    <g opacity={0.42} aria-hidden>
      {items.map((it, i) => (
        <Segment key={i} a={it.a} b={it.b} color={color} width={1.1} arrow />
      ))}
    </g>
  );
}

/**
 * Découpe une suite de points en morceaux contenus dans le domaine tracé : une courbe qui
 * sort du cadre est interrompue au lieu d'être dessinée hors du graphique.
 */
export function clipRuns(points: readonly (readonly number[])[], [x0, x1, y0, y1]: [number, number, number, number]): [number, number][][] {
  const runs: [number, number][][] = [];
  let cur: [number, number][] = [];
  for (const p of points) {
    const x = p[0]!;
    const y = p[1]!;
    if (Number.isFinite(x) && Number.isFinite(y) && x >= x0 && x <= x1 && y >= y0 && y <= y1) cur.push([x, y]);
    else {
      if (cur.length > 1) runs.push(cur);
      cur = [];
    }
  }
  if (cur.length > 1) runs.push(cur);
  return runs;
}
