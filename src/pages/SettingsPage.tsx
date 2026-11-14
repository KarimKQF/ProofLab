import { useRef, useState } from 'react';
import { Button, Card, PageHeader, SectionTitle } from '@/components/ui';
import { useGame } from '@/storage/store';
import { exportSave } from '@/storage/save';

function Toggle({ label, help, checked, onChange }: { label: string; help?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input type="checkbox" className="mt-1" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>
        <span className="block text-sm">{label}</span>
        {help && <span className="block text-[12.5px] text-text-3">{help}</span>}
      </span>
    </label>
  );
}

export function SettingsPage() {
  const settings = useGame((s) => s.save.settings);
  const setSettings = useGame((s) => s.setSettings);
  const setPaused = useGame((s) => s.setPaused);
  const save = useGame((s) => s.save);
  const importFrom = useGame((s) => s.importFrom);
  const reset = useGame((s) => s.reset);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const file = useRef<HTMLInputElement>(null);

  const doExport = () => {
    const blob = new Blob([exportSave(save)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prooflab-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage({ ok: true, text: 'Sauvegarde exportée.' });
  };

  const doImport = async (f: File) => {
    const result = importFrom(await f.text());
    setMessage(result.ok ? { ok: true, text: 'Sauvegarde importée.' } : { ok: false, text: result.error ?? 'Import impossible.' });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-9 space-y-5">
      <PageHeader title="Réglages" />

      <Card className="p-5 space-y-4">
        <SectionTitle>Affichage</SectionTitle>
        <div className="flex gap-2" role="group" aria-label="Thème">
          <Button variant={settings.theme === 'dark' ? 'primary' : 'outline'} onClick={() => setSettings({ theme: 'dark' })} aria-pressed={settings.theme === 'dark'}>Sombre</Button>
          <Button variant={settings.theme === 'light' ? 'primary' : 'outline'} onClick={() => setSettings({ theme: 'light' })} aria-pressed={settings.theme === 'light'}>Clair</Button>
        </div>
        <Toggle label="Réduire les animations" checked={settings.reduceMotion} onChange={(v) => setSettings({ reduceMotion: v })} />
      </Card>

      <Card className="p-5 space-y-4">
        <SectionTitle>Jeu</SectionTitle>
        <Toggle
          label="Banque complète dès le départ"
          help="Par défaut, la banque se dévoile à mesure que tu établis des étapes. Ce réglage affiche toutes les propositions."
          checked={settings.expertBank}
          onChange={(v) => setSettings({ expertBank: v })}
        />
        <Toggle
          label="Ouvrir tout le parcours"
          help="Supprime les verrous de la carte. Le contrôle mathématique d’utilisation prématurée reste actif dans les preuves."
          checked={settings.unlockAll}
          onChange={(v) => setSettings({ unlockAll: v })}
        />
        <Toggle
          label="Mettre les révisions en pause"
          help="À la reprise, toutes les échéances sont décalées de la durée de la pause. Aucune pénalité."
          checked={settings.pausedSince !== null}
          onChange={(v) => setPaused(v)}
        />
      </Card>

      <Card className="p-5 space-y-3">
        <SectionTitle>Sauvegarde</SectionTitle>
        <p className="text-sm text-text-2">La progression est stockée localement dans ce navigateur. L’export produit un fichier JSON ; l’import le valide avant de remplacer quoi que ce soit.</p>
        <div className="flex flex-wrap gap-2">
          <Button onClick={doExport}>Exporter</Button>
          <Button onClick={() => file.current?.click()}>Importer</Button>
          <input
            ref={file}
            type="file"
            accept="application/json,.json"
            className="hidden"
            aria-label="Fichier de sauvegarde"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void doImport(f);
              e.target.value = '';
            }}
          />
        </div>
        {message && <p className={`text-sm ${message.ok ? 'text-hyp' : 'text-invalid'}`} role="status">{message.text}</p>}
        <div className="pt-2 border-t border-line">
          {confirmReset ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm">Effacer toute la progression de cet appareil ?</span>
              <Button variant="danger" onClick={() => { reset(); setConfirmReset(false); setMessage({ ok: true, text: 'Progression réinitialisée.' }); }}>Confirmer</Button>
              <Button variant="ghost" onClick={() => setConfirmReset(false)}>Annuler</Button>
            </div>
          ) : (
            <Button variant="danger" onClick={() => setConfirmReset(true)}>Réinitialiser la progression</Button>
          )}
        </div>
      </Card>

      <Card className="p-5 space-y-2">
        <SectionTitle>Portée de la vérification</SectionTitle>
        <ul className="text-[13.5px] space-y-1.5 text-text-2">
          <li><span className="text-text font-medium">Validé :</span> établi par une règle explicite du contenu, ou par un calcul exact.</li>
          <li><span className="text-text font-medium">À justifier :</span> ni établi, ni réfuté : ce lien n’est pas couvert, ou il lui manque une prémisse.</li>
          <li><span className="text-text font-medium">Incorrect :</span> une erreur réellement caractérisée, souvent avec un contre-exemple.</li>
          <li>Le vérifieur n’est pas un assistant de preuve formel : il contrôle des règles écrites à la main dans le contenu. La vérité de ces règles est garantie par une relecture, non par la machine.</li>
        </ul>
      </Card>
    </div>
  );
}
