import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/ui';
import { MathText } from '@/components/Math';
import { useGame } from '@/storage/store';

export const LAB_LIST = [
  { id: 'projection', tag: 'A', title: 'Projection sur un convexe', body: 'Déplace un point, change de convexe, observe l’inégalité caractéristique. Retire une hypothèse pour voir ce qui tombe.' },
  { id: 'riesz-lax-milgram', tag: 'B', title: 'Riesz et Lax–Milgram', body: 'Choisis un produit scalaire et une forme bilinéaire. Coercivité et continuité sont décidées exactement.' },
  { id: 'convergences', tag: 'C', title: 'Convergences faible et forte', body: 'Des suites de fonctions dont les limites sont établies par le calcul, jamais par le graphique.' },
  { id: 'compacite', tag: 'D', title: 'Rellich et Aubin–Lions', body: 'Bornes en espace, bornes en temps : ce qu’il faut pour extraire une sous-suite fortement convergente.' },
  { id: 'galerkin', tag: 'E', title: 'Méthode de Galerkin', body: String.raw`Le problème parabolique sur $]0,1[$, en dix étapes de preuve qui déverrouillent chacune une visualisation.` },
  { id: 'sobolev-trace', tag: 'F', title: 'Sobolev et traces', body: String.raw`Surface, niveaux, coupes et trace sur les quatre côtés du carré : ce que dit $\gamma:H^1(\Omega)\to H^{1/2}(\partial\Omega)$, et pourquoi $H^1$ n'est pas dans $L^\infty$ en dimension 2.` },
  { id: 'groupes-lie', tag: 'G', title: 'Groupes de Lie', body: String.raw`Commutateur de flots, exponentielle, Rodrigues, revêtement $SU(2)\to SO(3)$, orbites et stabilisateurs, intégration symplectique : six scènes reliées aux résultats 35 à 45 et aux planches de l’atlas.` },
  { id: 'demonstration', tag: 'H', title: 'Démonstration', body: 'On ne manipule que les démonstrations des énoncés : la preuve s’écrit en blocs logiques (Soit / Supposons, implication, théorème, calcul, contradiction, conclusion), avec un guide de preuve, des coups de pouce calculés et le plan.' },
];

export function LabsPage() {
  const labs = useGame((s) => s.save.labs);
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-9">
      <PageHeader eyebrow="Mode 1 · Exploration" title="Laboratoires">
        Déplace, modifie, observe. Chaque quantité affichée indique si elle est une formule exacte, une valeur numérique ou une simple illustration : une image ne démontre rien.
      </PageHeader>
      <ul className="grid gap-3 md:grid-cols-2">
        {LAB_LIST.map((l) => (
          <li key={l.id}>
            <Link to={`/labo/${l.id}`} className="block h-full rounded-lg border border-line bg-surface p-5 hover:border-line-strong transition-colors" data-lab={l.id}>
              <div className="flex items-baseline justify-between font-mono text-[11px] text-text-3 mb-1">
                <span>Laboratoire {l.tag}</span>
                {(labs[l.id]?.length ?? 0) > 0 && <span style={{ color: 'var(--st-proved)' }}>{labs[l.id]!.length} clé{labs[l.id]!.length > 1 ? 's' : ''} obtenue{labs[l.id]!.length > 1 ? 's' : ''}</span>}
              </div>
              <div className="font-serif text-xl mb-1">{l.title}</div>
              <p className="text-[13.5px] text-text-2"><MathText text={l.body} /></p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
