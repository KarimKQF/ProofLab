/**
 * Vues 3D de la scène « Orbites » (chargées à la demande) : SO(3) sur la sphère (orbite,
 * axe et cercle du stabilisateur, deux sous-groupes à un paramètre) et orbites de
 * conjugaison dans GL(2) (hyperboloïde, ou cône limite et ses deux orbites).
 */
import { useEffect, useMemo } from 'react';
import { BufferAttribute, BufferGeometry, DoubleSide } from 'three';
import Canvas3D, { type Label3 } from '@/components/math-visualizations/three/Canvas3D';
import { Ball3, Point3, Polyline3, Segment3 } from '@/components/math-visualizations/three/primitives';
import type { Vec } from '@/core/visual-reasoning/lie-core';

/** Surface donnée par une grille de points (lignes × colonnes), maillée en triangles. */
function GridSurface({ grid, color, opacity = 0.35 }: { grid: Vec[][]; color: string; opacity?: number }) {
  const geometry = useMemo(() => {
    const rows = grid.length;
    const cols = grid[0]?.length ?? 0;
    const g = new BufferGeometry();
    const pos = new Float32Array(rows * cols * 3);
    let k = 0;
    for (const row of grid) {
      for (const p of row) {
        pos[k++] = p[0]!;
        pos[k++] = p[1]!;
        pos[k++] = p[2]!;
      }
    }
    const index: number[] = [];
    for (let i = 0; i + 1 < rows; i++) {
      for (let j = 0; j + 1 < cols; j++) {
        const a = i * cols + j;
        index.push(a, a + 1, a + cols, a + 1, a + cols + 1, a + cols);
      }
    }
    g.setAttribute('position', new BufferAttribute(pos, 3));
    g.setIndex(index);
    g.computeVertexNormals();
    return g;
  }, [grid]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <group>
      <mesh geometry={geometry}>
        <meshStandardMaterial color={color} transparent opacity={opacity} side={DoubleSide} depthWrite={false} />
      </mesh>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={color} wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

export function SphereOrbit3D({ p, stabilizerCircle, latitude, meridianLike, q0 }: { p: Vec; stabilizerCircle: Vec[]; latitude: Vec[]; meridianLike: Vec[]; q0: Vec }) {
  const labels = useMemo<Label3[]>(
    () => [
      { id: 'x', p, text: 'x', color: '#d55181' },
      { id: 'q', p: q0, text: 'Gₓ·y', color: '#c98500' },
    ],
    [p, q0],
  );
  return (
    <Canvas3D label="Orbite S² et stabilisateur d’un point" labels={labels} axes={1.7} camera={[3.4, 2.6, 2.2]} height={440}>
      <Ball3 center={[0, 0, 0]} r={1} color="#3987e5" opacity={0.12} wire />
      <Segment3 a={p.map((x) => -1.6 * x)} b={p.map((x) => 1.6 * x)} color="#d55181" width={1.2} dashed />
      <Polyline3 points={stabilizerCircle} color="#c98500" width={2.4} />
      <Polyline3 points={latitude} color="#199e70" width={1.8} />
      <Polyline3 points={meridianLike} color="#9085e9" width={1.8} />
      <Point3 p={p} color="#d55181" size={0.06} />
      <Point3 p={q0} color="#c98500" size={0.05} />
    </Canvas3D>
  );
}

export function ConjugationOrbit3D({ surface, pointA, jordan, samples, degenerate }: { surface: Vec[][]; pointA: Vec; jordan: Vec | null; samples: Vec[]; degenerate: boolean }) {
  const labels = useMemo<Label3[]>(
    () => [
      { id: 'A', p: pointA, text: degenerate ? 'mI' : 'A', color: '#d55181' },
      ...(jordan ? [{ id: 'J', p: jordan, text: 'bloc de Jordan', color: '#c98500' }] : []),
    ],
    [pointA, jordan, degenerate],
  );
  return (
    <Canvas3D label="Orbite de conjugaison dans les coordonnées (a − m, (b + c)/2, (b − c)/2)" labels={labels} axes={1.8} camera={[5.6, 4.4, 3.2]} height={440} axisLabels={['a − m', 'y', 'z']}>
      <GridSurface grid={surface} color={degenerate ? '#9aa5b4' : '#3987e5'} opacity={degenerate ? 0.22 : 0.33} />
      {samples.map((p, i) => (
        <Point3 key={i} p={p} color="#2fd39a" size={0.055} />
      ))}
      <Point3 p={pointA} color="#d55181" size={0.08} />
      {jordan && <Point3 p={jordan} color="#c98500" size={0.07} />}
    </Canvas3D>
  );
}
