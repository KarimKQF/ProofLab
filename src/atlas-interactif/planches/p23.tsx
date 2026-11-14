/**
 * Planche 23 — Carte des objets géométriques.
 * Schéma cliquable : variété → (dériver) directions → (évaluer) mesures ; directions →
 * déplacement ; mesures → intégration. Un exemple vivant sur le cercle relie les trois
 * premiers objets : p, v = c·Jp, α = dθ, α(v) = c.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, Circle, DragOnCurve, f2, Label, Plot, Slider } from '../kit2d';
import { TAU } from '../math';
import { MathText } from '@/components/Math';

type Node = { id: string; x: number; y: number; title: string; tex: string; color: string; text: string; plates: number[] };
const NODES: Node[] = [
  { id: 'variete', x: 0, y: 1, title: 'Variété', tex: String.raw`p\in M`, color: C.blue, text: 'Un espace qui ressemble localement à ℝⁿ, décrit par des cartes compatibles.', plates: [1, 2, 10, 21] },
  { id: 'directions', x: 1, y: 1, title: 'Directions', tex: String.raw`v\in T_pM`, color: C.teal, text: 'Vecteurs dérivés de courbes : on dérive pour passer du point aux directions.', plates: [4, 5, 9] },
  { id: 'mesures', x: 2, y: 1, title: 'Mesures', tex: String.raw`\alpha\in T_p^*M`, color: C.violet, text: 'Formes linéaires sur les directions : on évalue α(v).', plates: [6, 11, 13] },
  { id: 'deplacement', x: 1, y: 0, title: 'Déplacement', tex: String.raw`\text{flot et transport}`, color: C.orange, text: 'Intégrer un champ de directions : flots, crochets, transport parallèle.', plates: [7, 8, 18] },
  { id: 'integration', x: 2, y: 0, title: 'Intégration', tex: String.raw`\text{formes et Stokes}`, color: C.teal, text: 'Intégrer des mesures de degré maximal : formes, orientation, Stokes.', plates: [13, 14, 16] },
];
const EDGES: [string, string, string][] = [
  ['variete', 'directions', 'dériver'],
  ['directions', 'mesures', 'évaluer'],
  ['directions', 'deplacement', ''],
  ['mesures', 'integration', ''],
];

export default function P23() {
  const [sel, setSel] = useState<string>('variete');
  const [visited, setVisited] = useState<ReadonlySet<string>>(() => new Set(['variete']));
  const [a, setA] = useState(0.8);
  const [c, setC] = useState(0.6);
  const choose = (id: string) => {
    setSel(id);
    setVisited((v) => new Set([...v, id]));
  };
  const node = NODES.find((n) => n.id === sel)!;
  const W = 150;
  const H = 46;
  const pos = (n: Node): [number, number] => [12 + n.x * 196, 22 + (1 - n.y) * 118];

  const map = (
    <div>
      <svg viewBox="0 0 560 196" className="w-full" role="group" aria-label="Carte des objets géométriques">
        <defs>
          <marker id="fleche23" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="var(--text-3)" />
          </marker>
        </defs>
        {EDGES.map(([f, t, lab]) => {
          const A = pos(NODES.find((n) => n.id === f)!);
          const B = pos(NODES.find((n) => n.id === t)!);
          const horiz = A[1] === B[1];
          const [x1, y1, x2, y2] = horiz ? [A[0] + W, A[1] + H / 2, B[0] - 2, B[1] + H / 2] : [A[0] + W / 2, A[1] + H, B[0] + W / 2, B[1] - 2];
          return (
            <g key={f + t}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--text-3)" strokeWidth={1.4} markerEnd="url(#fleche23)" />
              {lab && (
                <text x={(x1 + x2) / 2} y={y1 - 6} textAnchor="middle" fontSize={11} fill="var(--text-3)">
                  {lab}
                </text>
              )}
            </g>
          );
        })}
        {NODES.map((n) => {
          const [x, y] = pos(n);
          const on = n.id === sel;
          return (
            <g key={n.id} role="button" tabIndex={0} aria-pressed={on} aria-label={n.title} data-node={n.id} style={{ cursor: 'pointer' }} onClick={() => choose(n.id)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), choose(n.id))}>
              <rect x={x} y={y} width={W} height={H} rx={7} fill={n.color} fillOpacity={on ? 0.32 : 0.1} stroke={n.color} strokeWidth={on ? 2.4 : 1.4} />
              <text x={x + W / 2} y={y + 19} textAnchor="middle" fontSize={13} fill="var(--text)">
                {n.title}
              </text>
              <text x={x + W / 2} y={y + 36} textAnchor="middle" fontSize={11} fill="var(--text-2)" fontStyle="italic">
                {n.id === 'variete' ? 'p ∈ M' : n.id === 'directions' ? 'v ∈ TₚM' : n.id === 'mesures' ? 'α ∈ T*ₚM' : n.id === 'deplacement' ? 'flot et transport' : 'formes et Stokes'}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-2 rounded-md border border-line p-3 text-[13px]" data-testid="noeud-detail">
        <p className="font-semibold" style={{ color: node.color }}>
          {node.title} : <MathText text={`$${node.tex}$`} />
        </p>
        <p className="mt-1 text-text-2">{node.text}</p>
        <p className="mt-1.5 flex flex-wrap gap-1.5">
          {node.plates.map((n) => (
            <Link key={n} to={`/atlas/${n}`} className="rounded border border-line px-1.5 py-0.5 font-mono text-[11.5px] hover:border-line-strong">
              Planche {n}
            </Link>
          ))}
        </p>
      </div>
    </div>
  );

  const p: [number, number] = [Math.cos(a), Math.sin(a)];
  const v: [number, number] = [-c * p[1], c * p[0]];
  const example = (
    <div>
      <Plot xDomain={[-1.6, 1.6]} yDomain={[-1.6, 1.6]} width={300} height={300} grid={false} ariaLabel="Un point, une direction, une mesure sur le cercle">
        <Circle c={[0, 0]} r={1} color={C.blue} width={2} />
        <Arrow a={p} b={[p[0] + v[0], p[1] + v[1]]} color={C.teal} width={2.6} />
        <Label x={p[0] + v[0] * 1.15} y={p[1] + v[1] * 1.15} text="v" color={C.teal} italic />
        <DragOnCurve curve={(s) => [Math.cos(s), Math.sin(s)]} s={a} range={[0, TAU]} onChange={setA} name="Point p" label="p" color={C.blue} r={5} />
      </Plot>
      <Caption>{String.raw`$v=c\,Jp\in T_pS^1$ et $\alpha=d\theta$ : on lit $\alpha(v)=c$.`}</Caption>
    </div>
  );

  return (
    <PlateScene
      n={23}
      panels={[
        { title: 'Carte des objets géométriques', render: () => map },
        { title: 'Un exemple sur le cercle', render: () => example },
      ]}
      identity={String.raw`$p\in M$, $\quad v\in T_pM$, $\quad\alpha\in T_p^*M$, $\quad\alpha(v)\in\mathbb R$.`}
      controls={<Slider label="Coefficient c de v = c·Jp" value={c} min={-1} max={1} step={0.05} onChange={setC} format={(x) => f2(x)} />}
      observations={[
        { id: 'chaine', text: 'Parcours la chaîne variété → directions → mesures en cliquant les cases.', done: visited.has('directions') && visited.has('mesures') },
        { id: 'tout', text: 'Ouvre aussi « Déplacement » et « Intégration » : ce que l’on fait des directions et des mesures.', done: visited.has('deplacement') && visited.has('integration') },
        { id: 'evaluer', text: String.raw`Dans l'exemple, change $c$ : la mesure $\alpha(v)$ suit, quel que soit le point $p$.`, done: Math.abs(c - 0.6) > 0.3 },
      ]}
      readings={[{ label: String.raw`$\alpha(v)=d\theta(c\,Jp)$`, value: f2(c, 3), status: 'exact' }]}
    />
  );
}
