/** Retirer une hypothèse : observer ce qui cesse d'être valable, et pourquoi. */
import type { ProofSpec } from '@/content/schema';
import { hypothesisRemovalReport, type NodeId } from '@/core/proof-engine/engine';
import { Card, SectionTitle } from '@/components/ui';
import { MathText, Prose } from '@/components/Math';
import type { ProofSession } from './useProofSession';

export function RemovalPanel({
  spec,
  session,
  removed,
  toggle,
}: {
  spec: ProofSpec;
  session: ProofSession;
  removed: ReadonlySet<NodeId>;
  toggle: (id: NodeId) => void;
}) {
  const { analysis } = session;
  return (
    <Card className="p-3.5">
      <SectionTitle className="mb-2">Retirer une hypothèse</SectionTitle>
      <p className="text-xs text-text-3 mb-2.5">Observe ce qui cesse d’être valable, et pourquoi.</p>
      <ul className="space-y-2.5">
        {spec.removable.map((r) => {
          const on = removed.has(r.hypothesis);
          const report = hypothesisRemovalReport(spec, r.hypothesis);
          return (
            <li key={r.hypothesis}>
              <label className="flex items-start gap-2 text-[13.5px] cursor-pointer">
                <input type="checkbox" className="mt-1" checked={on} onChange={() => toggle(r.hypothesis)} data-testid={`remove-${r.hypothesis}`} />
                <MathText text={r.label} />
              </label>
              {on && (
                <div className="mt-1.5 ml-5 space-y-1 text-[13px] anim-rise">
                  <p className="text-miss">
                    {report.goalStillDerivable
                      ? 'Le but reste atteignable par un autre chemin, sans cette propriété.'
                      : 'Le théorème ne peut plus être invoqué : le but n’est plus atteignable à partir de ce qui reste.'}
                  </p>
                  <p>
                    <MathText text={r.explanation} terms />
                  </p>
                  <div className="rounded border border-line p-2">
                    <span className="font-mono text-[11px] text-text-3">Contre-exemple</span>
                    <Prose text={r.counterexample} className="text-[13px]" terms />
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {removed.size > 0 && (
        <p className="mt-2.5 text-xs text-text-3">
          {analysis.goalReached ? 'Le but reste établi.' : 'La preuve est suspendue tant qu’une propriété est retirée : rien n’est perdu.'}
        </p>
      )}
    </Card>
  );
}
