/**
 * Une notion du dictionnaire dans les révisions : état et commande (ajouter, retirer).
 * Une notion consultée dans un énoncé y entre d'elle-même (première révision le lendemain).
 */
import { useGame } from '@/storage/store';
import { formatDate } from '@/components/ui';

const ORIGIN_LABEL = {
  consultee: 'consultée dans un énoncé',
  piege: 'liée à une erreur',
  manuelle: 'ajoutée par toi',
} as const;

export function NotionStatus({ id }: { id: string }) {
  const card = useGame((s) => s.save.notions[id]);
  const add = useGame((s) => s.addNotion);
  const remove = useGame((s) => s.removeNotion);
  const now = useGame((s) => s.now);
  if (!card) {
    return (
      <button type="button" onClick={() => add(id, 'manuelle')} className="text-[12.5px] text-accent hover:underline cursor-pointer" data-testid="ajouter-revision">
        Ajouter à mes révisions
      </button>
    );
  }
  const due = card.srs.due <= now() ? 'à revoir maintenant' : `prochaine révision le ${formatDate(card.srs.due)}`;
  return (
    <span className="text-[12px] text-text-3" data-testid="dans-revisions">
      Dans tes révisions ({ORIGIN_LABEL[card.origin]}), {due} ·{' '}
      <button type="button" onClick={() => remove(id)} className="underline hover:text-text-2 cursor-pointer" data-testid="retirer-revision">
        retirer
      </button>
    </span>
  );
}
