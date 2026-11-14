/**
 * Planche 72 — Carte de choix pour le SciML géométrique.
 * Trois questions, trois réponses : une variété admissible (paramétrer ou projeter), une action
 * de groupe (équivariance ou réduction), une fonctionnelle (champ dérivé ou bilan). Choisir une
 * situation éclaire le chemin conseillé et renvoie aux planches qui le montrent.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlateScene } from '../PlateScene';
import { Choice } from '../kit2d';
import { cx } from '@/components/ui';

const COLS = [
  { id: 'variete', top: 'Variété admissible', bottom: 'Paramétrisation ou projection', color: '#4a86d0', plates: [67, 21] },
  { id: 'groupe', top: 'Action de groupe', bottom: 'Équivariance ou réduction', color: '#1a9e96', plates: [68, 47] },
  { id: 'fonctionnelle', top: 'Fonctionnelle', bottom: 'Champ dérivé ou bilan', color: '#d8743a', plates: [69, 70] },
];
const CASES = [
  { id: 'sphere', label: 'La sortie doit rester sur une sphère', col: 'variete' },
  { id: 'rotation', label: 'Les données sont invariantes par rotation', col: 'groupe' },
  { id: 'conservatif', label: 'Le système conserve une quantité', col: 'fonctionnelle' },
];

export default function P72() {
  const [c, setC] = useState('sphere');
  const [tried, setTried] = useState<ReadonlySet<string>>(() => new Set(['sphere']));
  const pick = (v: string) => {
    setC(v);
    setTried((s) => new Set([...s, v]));
  };
  const active = CASES.find((x) => x.id === c)!.col;
  const map = (
    <div className="grid grid-cols-3 gap-2" data-testid="carte-choix">
      {COLS.map((col) => {
        const on = col.id === active;
        return (
          <div key={col.id} className="flex flex-col items-stretch gap-2">
            <div className={cx('rounded-md border px-2 py-3 text-center text-[13px] transition-opacity', on ? 'opacity-100' : 'opacity-45')} style={{ borderColor: col.color, background: on ? `${col.color}22` : undefined }}>
              {col.top}
            </div>
            <div className="text-center text-text-3" aria-hidden>↓</div>
            <div className={cx('rounded-md border px-2 py-3 text-center text-[13px] transition-opacity', on ? 'opacity-100' : 'opacity-45')} style={{ borderColor: col.color, background: on ? `${col.color}22` : undefined }}>
              {col.bottom}
            </div>
            <div className="flex flex-wrap justify-center gap-1">
              {col.plates.map((n) => (
                <Link key={n} to={`/atlas/${n}`} className="rounded border border-line px-1.5 py-0.5 font-mono text-[11px] hover:border-line-strong">
                  Planche {n}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
  return (
    <PlateScene
      n={72}
      panels={[{ title: 'Carte de choix pour le SciML géométrique', render: () => map }]}
      identity={String.raw`Espace d'états, action, fonctionnelle : la structure à préserver dicte l'architecture.`}
      controls={<Choice name="Situation" value={c} onChange={pick} options={CASES.map((x) => ({ id: x.id, label: x.label }))} />}
      observations={[
        { id: 'contrainte', text: 'Une contrainte d’état se traite par paramétrisation ou projection.', done: tried.has('sphere') },
        { id: 'symetrie', text: 'Une symétrie des données se traite par équivariance ou réduction.', done: tried.has('rotation') },
        { id: 'loi', text: 'Une quantité conservée se traite en apprenant H ou L, puis en dérivant.', done: tried.has('conservatif') },
      ]}
    />
  );
}
