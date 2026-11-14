/**
 * Laboratoire G : groupes de Lie. Six scènes, chacune reliée aux résultats 35 à 45 et aux
 * planches de l'Atlas visuel : commutateur de flots, exponentielle, Rodrigues, revêtement
 * SU(2) → SO(3), orbites et stabilisateurs, intégration symplectique.
 * La scène affichée suit le paramètre d'adresse « scene », pour les liens depuis l'atlas.
 */
import { useSearchParams } from 'react-router-dom';
import { cx } from '@/components/ui';
import { LIE_SCENES, type LieSceneId } from '@/content/atlas';
import { LabShell, MathText } from '../kit';
import { CommutatorScene } from './scenes/CommutatorScene';
import { CoverScene } from './scenes/CoverScene';
import { ExponentialScene } from './scenes/ExponentialScene';
import { OrbitsScene } from './scenes/OrbitsScene';
import { RodriguesScene } from './scenes/RodriguesScene';
import { SymplecticScene } from './scenes/SymplecticScene';

const SCENES: Record<LieSceneId, () => React.JSX.Element> = {
  commutateur: CommutatorScene,
  exponentielle: ExponentialScene,
  rodrigues: RodriguesScene,
  revetement: CoverScene,
  orbites: OrbitsScene,
  symplectique: SymplecticScene,
};

const isScene = (s: string | null): s is LieSceneId => s !== null && s in SCENES;

export function GroupesLieLab() {
  const [params, setParams] = useSearchParams();
  const raw = params.get('scene');
  const scene: LieSceneId = isScene(raw) ? raw : 'commutateur';
  const Scene = SCENES[scene];
  return (
    <LabShell
      eyebrow="G"
      title="Groupes de Lie"
      intro={
        <MathText
          text={String.raw`Flots et crochets, exponentielle, rotations, revêtement $SU(2)\to SO(3)$, orbites, intégration symplectique. Chaque valeur indique si elle est exacte, numérique ou illustrative ; les démonstrations sont celles des résultats 35 à 45.`}
        />
      }
    >
      <div className="mb-4 flex flex-wrap gap-1.5 border-b border-line pb-3" role="tablist" aria-label="Scènes du laboratoire">
        {LIE_SCENES.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={scene === s.id}
            data-scene={s.id}
            onClick={() => setParams({ scene: s.id }, { replace: true })}
            className={cx(
              'rounded-md border px-3 py-1.5 text-[13px] transition-colors',
              scene === s.id ? 'border-accent bg-accent text-[var(--bg)]' : 'border-line hover:border-line-strong',
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" aria-label={LIE_SCENES.find((s) => s.id === scene)!.label} key={scene}>
        <Scene />
      </div>
    </LabShell>
  );
}
