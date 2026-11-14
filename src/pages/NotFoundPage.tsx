import { LinkButton, PageHeader } from '@/components/ui';

export function NotFoundPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
      <PageHeader title="Cette page n’existe pas">L’adresse demandée ne correspond à aucun contenu du laboratoire.</PageHeader>
      <LinkButton to="/carte" variant="primary">Revenir à la carte</LinkButton>
    </div>
  );
}
