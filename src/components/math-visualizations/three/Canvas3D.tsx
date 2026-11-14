/**
 * Toile 3D commune (React Three Fiber + contrôles orbitaux officiels de Three.js) :
 * caméra réinitialisable, rotation et zoom au clavier, axes, étiquettes HTML projetées,
 * rendu à la demande (aucune image calculée au repos), qualité réglable pour les
 * machines sans GPU performant. Aucune dépendance à @react-three/drei.
 */
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Spherical, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Button } from '@/components/ui';
import { Segment3 } from './primitives';
import { QualityContext, readQuality, type Quality } from './quality';

export interface Label3 {
  id: string;
  p: readonly number[];
  text: string;
  color: string;
}

type Command = { kind: string; n: number } | null;

/** Contrôles orbitaux : souris ou toucher sur la toile, et commandes des boutons et du clavier. */
function Controls({ command }: { command: Command }) {
  const { camera, gl, invalidate } = useThree();
  const controls = useMemo(() => new OrbitControls(camera, gl.domElement), [camera, gl]);
  useEffect(() => {
    controls.enableDamping = false;
    const onChange = () => invalidate();
    controls.addEventListener('change', onChange);
    return () => {
      controls.removeEventListener('change', onChange);
      controls.dispose();
    };
  }, [controls, invalidate]);
  useEffect(() => {
    if (!command) return;
    if (command.kind === 'reset') controls.reset();
    else {
      const offset = new Vector3().subVectors(camera.position, controls.target);
      // Coordonnées sphériques autour de l'axe vertical x₃ (camera.up).
      const s = new Spherical().setFromCartesianCoords(offset.x, offset.z, offset.y);
      if (command.kind === 'left') s.theta -= 0.15;
      if (command.kind === 'right') s.theta += 0.15;
      if (command.kind === 'up') s.phi = Math.max(0.05, s.phi - 0.12);
      if (command.kind === 'down') s.phi = Math.min(Math.PI - 0.05, s.phi + 0.12);
      if (command.kind === 'in') s.radius = Math.max(2, s.radius * 0.88);
      if (command.kind === 'out') s.radius = Math.min(60, s.radius / 0.88);
      const v = new Vector3().setFromSpherical(s);
      camera.position.set(controls.target.x + v.x, controls.target.y + v.z, controls.target.z + v.y);
      controls.update();
    }
    invalidate();
  }, [command, camera, controls, invalidate]);
  return null;
}

/** Place les étiquettes HTML à la projection écran de leur point 3D, à chaque image rendue. */
function LabelProjector({ labels, refs }: { labels: Label3[]; refs: React.RefObject<Map<string, HTMLSpanElement>> }) {
  const { camera, size, invalidate } = useThree();
  const v = useMemo(() => new Vector3(), []);
  useEffect(() => invalidate(), [labels, invalidate]);
  useFrame(() => {
    for (const l of labels) {
      const el = refs.current.get(l.id);
      if (!el) continue;
      v.set(l.p[0] ?? 0, l.p[1] ?? 0, l.p[2] ?? 0).project(camera);
      const inside = v.z > -1 && v.z < 1;
      el.style.display = inside ? '' : 'none';
      el.style.transform = `translate(${((v.x + 1) / 2) * size.width + 8}px, ${((1 - v.y) / 2) * size.height - 20}px)`;
    }
  });
  return null;
}

function Axes({ size }: { size: number }) {
  return (
    <group>
      <Segment3 a={[-size, 0, 0]} b={[size, 0, 0]} color="#d95926" width={0.8} />
      <Segment3 a={[0, -size, 0]} b={[0, size, 0]} color="#199e70" width={0.8} />
      <Segment3 a={[0, 0, -size]} b={[0, 0, size]} color="#3987e5" width={0.8} />
    </group>
  );
}

/**
 * Convention : les coordonnées mathématiques (x₁, x₂, x₃) sont dessinées telles quelles,
 * x₃ vertical ; la caméra regarde l'origine depuis un point de vue oblique.
 */
const DEFAULT_AXES: [string, string, string] = ['x₁', 'x₂', 'x₃'];

export default function Canvas3D({
  children,
  label,
  labels = [],
  axes = 4,
  height = 440,
  camera = [7, 5, 6],
  axisLabels = DEFAULT_AXES,
  showAxes = true,
}: {
  children: ReactNode;
  label: string;
  labels?: Label3[];
  axes?: number;
  height?: number;
  camera?: [number, number, number];
  /** Noms des axes (par défaut x₁, x₂, x₃). */
  axisLabels?: [string, string, string];
  /** Afficher les axes de coordonnées (inutiles pour un tore ou un ruban, par exemple). */
  showAxes?: boolean;
}) {
  const [command, setCommand] = useState<Command>(null);
  const [quality, setQuality] = useState<Quality>(readQuality);
  const counter = useRef(0);
  const labelRefs = useRef(new Map<string, HTMLSpanElement>());
  const send = (kind: string) => setCommand({ kind, n: ++counter.current });
  const cam = useMemo(() => ({ position: camera, fov: 45, up: [0, 0, 1] as [number, number, number] }), [camera]);
  const allLabels = useMemo<Label3[]>(
    () => [
      ...(showAxes
        ? [
            { id: 'axe-1', p: [axes, 0, 0], text: axisLabels[0], color: '#d95926' },
            { id: 'axe-2', p: [0, axes, 0], text: axisLabels[1], color: '#199e70' },
            { id: 'axe-3', p: [0, 0, axes], text: axisLabels[2], color: '#3987e5' },
          ]
        : []),
      ...labels,
    ],
    [labels, axes, axisLabels, showAxes],
  );

  const onKey = (e: React.KeyboardEvent) => {
    const map: Record<string, string> = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down', '+': 'in', '=': 'in', '-': 'out', r: 'reset', R: 'reset' };
    const k = map[e.key];
    if (k) {
      e.preventDefault();
      send(k);
    }
  };

  return (
    <QualityContext.Provider value={quality}>
      <div className="space-y-2">
        <div
          className="relative rounded-md border border-line overflow-hidden bg-[var(--bg)] focus-visible:ring-2 focus-visible:ring-accent"
          style={{ height }}
          tabIndex={0}
          role="application"
          aria-label={`${label}. Flèches : faire tourner la vue ; + et − : zoomer ; R : réinitialiser la caméra.`}
          onKeyDown={onKey}
          data-testid="canvas-3d"
        >
          <Canvas frameloop="demand" camera={cam} dpr={quality === 'faible' ? 1 : [1, 2]} gl={{ antialias: quality !== 'faible', preserveDrawingBuffer: true }}>
            <ambientLight intensity={0.75} />
            <directionalLight position={[6, 4, 10]} intensity={0.9} />
            {showAxes && <Axes size={axes} />}
            {children}
            <Controls command={command} />
            <LabelProjector labels={allLabels} refs={labelRefs} />
          </Canvas>
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {allLabels.map((l) => (
              <span
                key={l.id}
                ref={(el) => {
                  if (el) labelRefs.current.set(l.id, el);
                  else labelRefs.current.delete(l.id);
                }}
                className="absolute left-0 top-0 whitespace-nowrap font-mono text-[13px]"
                style={{ color: l.color, transform: 'translate(-9999px, 0)' }}
              >
                {l.text}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 text-[12.5px]">
          <Button className="px-2 py-1 text-[12.5px]" onClick={() => send('reset')}>Réinitialiser la caméra</Button>
          <Button className="px-2 py-1 text-[12.5px]" onClick={() => send('left')} aria-label="Tourner à gauche">↺</Button>
          <Button className="px-2 py-1 text-[12.5px]" onClick={() => send('right')} aria-label="Tourner à droite">↻</Button>
          <Button className="px-2 py-1 text-[12.5px]" onClick={() => send('in')} aria-label="Zoomer">＋</Button>
          <Button className="px-2 py-1 text-[12.5px]" onClick={() => send('out')} aria-label="Dézoomer">－</Button>
          <label className="ml-auto flex items-center gap-1.5 text-text-2">
            Qualité 3D
            <select
              value={quality}
              onChange={(e) => {
                const q = e.target.value as Quality;
                setQuality(q);
                try {
                  localStorage.setItem('prooflab:qualite3d', q);
                } catch {
                  /* préférence non conservée */
                }
              }}
              className="rounded border border-line-strong bg-surface-2 px-1.5 py-0.5"
            >
              <option value="normale">Normale</option>
              <option value="faible">Faible (machine modeste)</option>
            </select>
          </label>
        </div>
      </div>
    </QualityContext.Provider>
  );
}
