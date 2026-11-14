/**
 * Diagramme abstrait (mode D) : une suite d'espaces reliés par des flèches nommées
 * (injections, isométries, projections, dualités). Notation précise, sans « patates » :
 * aucune figure ne prétend représenter fidèlement un espace de dimension infinie.
 */
import { MathText } from '@/components/Math';

export interface ChainNode {
  tex: string;
  note?: string;
}

export interface ChainArrow {
  /** Étiquette LaTeX au-dessus de la flèche (ex. \hookrightarrow, J, P_n). */
  tex: string;
  /** Statut : établi (démontré ou exact), supposé, absent. */
  state?: 'etabli' | 'suppose' | 'absent';
  note?: string;
}

const COLOR = { etabli: 'var(--st-proved)', suppose: 'var(--st-access)', absent: 'var(--st-invalid)' } as const;

export function ChainDiagram({ nodes, arrows, caption, testId }: { nodes: ChainNode[]; arrows: ChainArrow[]; caption?: string; testId?: string }) {
  return (
    <figure className="space-y-2" data-testid={testId} role="group" aria-label={caption ?? 'Diagramme abstrait'}>
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
        {nodes.map((n, i) => (
          <div key={i} className="contents">
            <div className="rounded border border-line px-2.5 py-1.5 text-center font-serif text-[15px]">
              <MathText text={`$${n.tex}$`} />
              {n.note && <div className="mt-0.5 font-sans text-[11px] text-text-3">{n.note}</div>}
            </div>
            {i < arrows.length && (
              <div className="flex flex-col items-center px-1 text-center" style={{ color: COLOR[arrows[i]!.state ?? 'etabli'] }} data-arrow-state={arrows[i]!.state ?? 'etabli'}>
                <MathText text={`$\\xrightarrow{\\;${arrows[i]!.tex}\\;}$`} />
                {arrows[i]!.note && <span className="max-w-[9rem] text-[11px] leading-tight text-text-3">{arrows[i]!.note}</span>}
              </div>
            )}
          </div>
        ))}
      </div>
      {caption && <figcaption className="text-center text-[12px] text-text-3">{caption}</figcaption>}
    </figure>
  );
}
