import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import { useParams } from 'react-router-dom';
import { LinkButton, PageHeader } from '@/components/ui';
import { NotFoundPage } from './NotFoundPage';

/** Les laboratoires sont découverts à la compilation : un laboratoire absent n'empêche pas les autres de se charger. */
const loaders = import.meta.glob<Record<string, ComponentType>>('../labs/*/*Lab.tsx');

const REGISTRY: Record<string, { file: string; exportName: string }> = {
  projection: { file: '../labs/projection/ProjectionLab.tsx', exportName: 'ProjectionLab' },
  'riesz-lax-milgram': { file: '../labs/riesz/RieszLab.tsx', exportName: 'RieszLab' },
  convergences: { file: '../labs/convergences/ConvergencesLab.tsx', exportName: 'ConvergencesLab' },
  compacite: { file: '../labs/compacite/CompaciteLab.tsx', exportName: 'CompaciteLab' },
  galerkin: { file: '../labs/galerkin/GalerkinLab.tsx', exportName: 'GalerkinLab' },
  'sobolev-trace': { file: '../labs/sobolev/SobolevLab.tsx', exportName: 'SobolevLab' },
  'groupes-lie': { file: '../labs/groupes-lie/GroupesLieLab.tsx', exportName: 'GroupesLieLab' },
};

const LABS: Record<string, LazyExoticComponent<ComponentType> | null> = Object.fromEntries(
  Object.entries(REGISTRY).map(([id, { file, exportName }]) => {
    const load = loaders[file];
    return [id, load ? lazy(() => load().then((m) => ({ default: m[exportName]! }))) : null];
  }),
);

export function LabPage() {
  const { id = '' } = useParams();
  if (!(id in LABS)) return <NotFoundPage />;
  const Lab = LABS[id];
  if (!Lab) {
    return (
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
        <PageHeader title="Laboratoire indisponible">Ce laboratoire n’est pas présent dans cette version de l’application.</PageHeader>
        <LinkButton to="/labos" variant="primary">Retour aux laboratoires</LinkButton>
      </div>
    );
  }
  return <Lab />;
}
