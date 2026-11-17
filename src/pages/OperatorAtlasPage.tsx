import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { OPERATOR_PLATES, OPERATOR_PLATE_BY_ID, type OperatorPlate } from '@/components/operator-atlas/data';
import { OperatorScene } from '@/components/operator-atlas/scenes';
import { MathText, Prose } from '@/components/Math';
import { TermScope } from '@/components/glossary/context';
import { Button, Card, LinkButton, PageHeader, SectionTitle } from '@/components/ui';
import { CATALOG_BY_ID } from '@/content/catalog';
import { NotFoundPage } from './NotFoundPage';

function Plate({ plate }: { plate: OperatorPlate }) {
  const [revealed, setRevealed] = useState(false);
  const index = OPERATOR_PLATES.findIndex((p) => p.id === plate.id);
  const previous = OPERATOR_PLATES[index - 1];
  const next = OPERATOR_PLATES[index + 1];
  return <TermScope track="analyse">
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-9">
      <PageHeader eyebrow={<Link to="/atlas" className="hover:underline">Atlas visuel · Opérateurs · {index + 1} / {OPERATOR_PLATES.length}</Link>} title={<MathText text={plate.title} />}><MathText text={plate.description} /></PageHeader>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_270px] gap-5 items-start">
        <div className="space-y-5 min-w-0">
          <Card className="p-4 md:p-5"><OperatorScene key={plate.id} id={plate.id} /></Card>
          <Card className="p-5 overflow-x-auto"><SectionTitle className="mb-3">Le modèle mathématique</SectionTitle><Prose text={plate.formula} className="text-sm leading-relaxed" terms /></Card>
          <Card className="p-5"><SectionTitle className="mb-3">Lire la figure</SectionTitle><Prose text={plate.reading} className="text-sm leading-relaxed" terms /></Card>
          <Card className="p-5"><SectionTitle className="mb-3">À prévoir puis à vérifier</SectionTitle><Prose text={plate.question} className="text-sm mb-4" /><Button onClick={() => setRevealed(!revealed)} aria-expanded={revealed}>{revealed ? 'Masquer l’explication' : 'Voir l’explication'}</Button>{revealed && <div className="mt-4 border-l-2 border-accent pl-4" role="status"><Prose text={plate.answer} className="text-sm leading-relaxed" /></div>}</Card>
        </div>
        <aside className="space-y-4">
          <Card className="p-4"><SectionTitle className="mb-3">Ce que la figure ne prouve pas</SectionTitle><Prose text={plate.limit} className="text-sm leading-relaxed" terms /></Card>
          <Card className="p-4"><SectionTitle className="mb-3">Du dessin à la preuve</SectionTitle><LinkButton to={`/operateurs/${plate.lessonId}`}>Cours et démonstration</LinkButton><ul className="mt-4 space-y-2 text-sm">{plate.theoremIds.map((id) => <li key={id}><Link to={`/theoreme/${id}`} className="underline"><MathText text={CATALOG_BY_ID.get(id)?.name ?? id} /></Link></li>)}</ul></Card>
          <Card className="p-4"><SectionTitle className="mb-2">Référence</SectionTitle><p className="text-xs text-text-2">{plate.source}</p><p className="text-xs text-text-3 mt-2">Figure pédagogique originale ; les valeurs numériques affichées sont arrondies.</p></Card>
        </aside>
      </div>
      <nav className="flex flex-wrap justify-between gap-3 mt-7" aria-label="Planches sur les opérateurs">{previous ? <LinkButton to={`/atlas/operateurs/${previous.id}`}>← Planche précédente</LinkButton> : <LinkButton to="/atlas">Retour à l’atlas</LinkButton>}{next ? <LinkButton to={`/atlas/operateurs/${next.id}`}>Planche suivante →</LinkButton> : <LinkButton to="/atlas">Retour à l’atlas</LinkButton>}</nav>
    </div>
  </TermScope>;
}

export function OperatorAtlasPage() {
  const { plateId = '' } = useParams();
  const plate = OPERATOR_PLATE_BY_ID.get(plateId);
  return plate ? <Plate key={plate.id} plate={plate} /> : <NotFoundPage />;
}
