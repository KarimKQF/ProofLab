/**
 * Lecteur d'animation des planches : fait varier un paramètre de 0 à 1 en `duration`
 * millisecondes. Respecte « Réduire les animations » (saut direct à la fin) et s'arrête
 * dès qu'un réglage est touché (`stop`), pour qu'une action manuelle ne soit jamais écrasée.
 */
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui';
import { useGame } from '@/storage/store';

export function usePlayer(duration: number, onFrame: (k: number) => void) {
  const [playing, setPlaying] = useState(false);
  const reduce = useGame((s) => s.save.settings.reduceMotion);
  const frame = useRef(onFrame);
  frame.current = onFrame;
  useEffect(() => {
    if (!playing) return;
    if (reduce) {
      frame.current(1);
      setPlaying(false);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / duration);
      frame.current(k);
      if (k < 1) raf = requestAnimationFrame(tick);
      else setPlaying(false);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, reduce, duration]);
  return {
    playing,
    play: () => setPlaying(true),
    stop: () => setPlaying(false),
    toggle: () => setPlaying((p) => !p),
  };
}

export function PlayButton({ player, label = 'Animer', className }: { player: ReturnType<typeof usePlayer>; label?: string; className?: string }) {
  return (
    <Button variant="primary" className={className ?? 'text-[13px]'} onClick={player.toggle} data-testid="animer">
      {player.playing ? 'Pause' : label}
    </Button>
  );
}
