/**
 * Objets 3D réutilisables : points, segments (pleins ou pointillés), flèches, boules,
 * plans, ellipsoïdes, surfaces z = u(x, y), polylignes. Chaque objet est construit à partir
 * de données mathématiques calculées ailleurs. Les segments sont des cylindres fins (les
 * lignes WebGL ont une épaisseur fixe d'un pixel) ; les géométries créées à la main sont
 * libérées au démontage.
 */
import { useEffect, useMemo } from 'react';
import { BufferAttribute, BufferGeometry, Color, CurvePath, DoubleSide, LineCurve3, Matrix4, Quaternion, TubeGeometry, Vector3 } from 'three';
import type { Grid } from '@/core/visual-reasoning/sections';
import { gridX, gridY } from '@/core/visual-reasoning/sections';
import { segmentsFor, useQuality } from './quality';

export type V3 = [number, number, number];
const v3 = (p: readonly number[]): V3 => [p[0] ?? 0, p[1] ?? 0, p[2] ?? 0];

/** Couleurs lisibles sur les deux thèmes (palette de référence). */
export const C3 = {
  x: '#e8eaef',
  xLight: '#1a2029',
  p: '#c98500',
  z: '#3987e5',
  K: '#199e70',
  vec: '#9085e9',
  bad: '#d55181',
  w: '#3987e5',
  u: '#9085e9',
};

const Y = new Vector3(0, 1, 0);

/** Position, orientation et longueur d'un cylindre allant de a à b. */
function along(a: readonly number[], b: readonly number[]) {
  const A = new Vector3(...v3(a));
  const B = new Vector3(...v3(b));
  const d = new Vector3().subVectors(B, A);
  const len = d.length();
  const quat = new Quaternion().setFromUnitVectors(Y, len > 1e-12 ? d.clone().normalize() : Y);
  return { mid: new Vector3().addVectors(A, B).multiplyScalar(0.5), quat, len, dir: len > 1e-12 ? d.clone().normalize() : Y.clone(), A, B };
}

export function Point3({ p, color, size = 0.11 }: { p: readonly number[]; color: string; size?: number }) {
  const q = useQuality();
  const seg = segmentsFor(q, 16);
  return (
    <mesh position={v3(p)}>
      <sphereGeometry args={[size, seg, seg]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

/** Segment [a, b] ; `width` en centièmes d'unité environ (1 ≈ rayon 0,012). */
export function Segment3({ a, b, color, dashed = false, width = 2 }: { a: readonly number[]; b: readonly number[]; color: string; dashed?: boolean; width?: number }) {
  const r = 0.012 * width;
  const g = useMemo(() => along(a, b), [a, b]);
  if (g.len < 1e-9) return null;
  if (!dashed) {
    return (
      <mesh position={g.mid} quaternion={g.quat}>
        <cylinderGeometry args={[r, r, g.len, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    );
  }
  const dash = 0.18;
  const gap = 0.12;
  const count = Math.max(1, Math.floor(g.len / (dash + gap)));
  return (
    <group>
      {Array.from({ length: count }, (_, i) => {
        const t = (i * (dash + gap) + dash / 2) / g.len;
        const c = g.A.clone().lerp(g.B, Math.min(1, t));
        return (
          <mesh key={i} position={c} quaternion={g.quat}>
            <cylinderGeometry args={[r, r, Math.min(dash, g.len), 6]} />
            <meshBasicMaterial color={color} />
          </mesh>
        );
      })}
    </group>
  );
}

/** Flèche de a vers b (vecteur b − a). */
export function Arrow3({ a, b, color }: { a: readonly number[]; b: readonly number[]; color: string }) {
  const g = useMemo(() => along(a, b), [a, b]);
  if (g.len < 1e-6) return null;
  const head = Math.min(0.28, g.len * 0.35);
  const shaftEnd = g.B.clone().sub(g.dir.clone().multiplyScalar(head));
  const headCenter = g.B.clone().sub(g.dir.clone().multiplyScalar(head / 2));
  return (
    <group>
      <Segment3 a={g.A.toArray()} b={shaftEnd.toArray()} color={color} width={2.5} />
      <mesh position={headCenter} quaternion={g.quat}>
        <coneGeometry args={[0.085, head, 14]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

export function Ball3({ center, r, color, opacity = 0.28, wire = false }: { center: readonly number[]; r: number; color: string; opacity?: number; wire?: boolean }) {
  const q = useQuality();
  const seg = segmentsFor(q, 40);
  return (
    <group position={v3(center)}>
      <mesh>
        <sphereGeometry args={[r, seg, Math.round(seg * 0.75)]} />
        <meshStandardMaterial color={color} transparent opacity={opacity} depthWrite={false} side={DoubleSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[r, Math.round(seg / 2), Math.round(seg / 3)]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={wire ? 0.55 : 0.22} />
      </mesh>
    </group>
  );
}

/** Plan affine {z : ⟨n, z⟩ = c}, dessiné comme un carré de côté `size` centré au point le plus proche de l'origine. */
export function Plane3({ n, c, size = 7, color, opacity = 0.22 }: { n: readonly number[]; c: number; size?: number; color: string; opacity?: number }) {
  const { pos, quat } = useMemo(() => {
    const nv = new Vector3(...v3(n));
    const center = nv.clone().multiplyScalar(c / nv.lengthSq());
    return { pos: center, quat: new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), nv.clone().normalize()) };
  }, [n, c]);
  const h = size / 2;
  const corners: V3[] = [
    [-h, -h, 0],
    [h, -h, 0],
    [h, h, 0],
    [-h, h, 0],
  ];
  return (
    <group position={pos} quaternion={quat}>
      <mesh>
        <planeGeometry args={[size, size, 1, 1]} />
        <meshStandardMaterial color={color} transparent opacity={opacity} side={DoubleSide} depthWrite={false} />
      </mesh>
      {corners.map((a, i) => (
        <Segment3 key={i} a={a} b={corners[(i + 1) % 4]!} color={color} width={0.9} />
      ))}
    </group>
  );
}

/** Image de la sphère unité par l'application linéaire M (3×3) : ellipsoïde {Mu : |u| = 1}. */
export function Ellipsoid3({ m, color, opacity = 0.25, center = [0, 0, 0] }: { m: number[][]; color: string; opacity?: number; center?: readonly number[] }) {
  const q = useQuality();
  const seg = segmentsFor(q, 40);
  const matrix = useMemo(() => {
    const mat = new Matrix4();
    const c = v3(center);
    mat.set(m[0]![0]!, m[0]![1]!, m[0]![2]!, c[0], m[1]![0]!, m[1]![1]!, m[1]![2]!, c[1], m[2]![0]!, m[2]![1]!, m[2]![2]!, c[2], 0, 0, 0, 1);
    return mat;
  }, [m, center]);
  return (
    <group matrix={matrix} matrixAutoUpdate={false}>
      <mesh>
        <sphereGeometry args={[1, seg, Math.round(seg * 0.75)]} />
        <meshStandardMaterial color={color} transparent opacity={opacity} depthWrite={false} side={DoubleSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1, Math.round(seg / 2), Math.round(seg / 3)]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

/**
 * Surface z = s·u(x, y) construite à partir d'une grille, colorée selon la valeur
 * (échelle divergente bleu–orange, zéro au centre). `scaleZ` agrandit la hauteur affichée.
 */
export function SurfaceMesh({ grid, scaleZ = 1, offset = [0, 0, 0], opacity = 1 }: { grid: Grid; scaleZ?: number; offset?: V3; opacity?: number }) {
  const geometry = useMemo(() => {
    const g = new BufferGeometry();
    const positions = new Float32Array(grid.nx * grid.ny * 3);
    const colors = new Float32Array(grid.nx * grid.ny * 3);
    const span = Math.max(Math.abs(grid.min), Math.abs(grid.max)) || 1;
    const neg = new Color('#3987e5');
    const pos = new Color('#d95926');
    const mid = new Color('#9aa5b4');
    let k = 0;
    for (let j = 0; j < grid.ny; j++) {
      for (let i = 0; i < grid.nx; i++) {
        const v = grid.values[j]![i]!;
        positions[k] = gridX(grid, i) + offset[0];
        positions[k + 1] = gridY(grid, j) + offset[1];
        positions[k + 2] = (Number.isFinite(v) ? v : 0) * scaleZ + offset[2];
        const t = Math.max(-1, Math.min(1, (Number.isFinite(v) ? v : 0) / span));
        const c = t >= 0 ? mid.clone().lerp(pos, t) : mid.clone().lerp(neg, -t);
        colors[k] = c.r;
        colors[k + 1] = c.g;
        colors[k + 2] = c.b;
        k += 3;
      }
    }
    const index: number[] = [];
    for (let j = 0; j < grid.ny - 1; j++) {
      for (let i = 0; i < grid.nx - 1; i++) {
        const a = j * grid.nx + i;
        index.push(a, a + 1, a + grid.nx, a + 1, a + grid.nx + 1, a + grid.nx);
      }
    }
    g.setAttribute('position', new BufferAttribute(positions, 3));
    g.setAttribute('color', new BufferAttribute(colors, 3));
    g.setIndex(index);
    g.computeVertexNormals();
    return g;
  }, [grid, scaleZ, offset]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial vertexColors side={DoubleSide} roughness={0.85} transparent={opacity < 1} opacity={opacity} />
    </mesh>
  );
}

/** Polyligne 3D épaisse (coupe d'une surface, trace sur un bord), en tube le long des segments. */
export function Polyline3({ points, color, width = 2 }: { points: readonly (readonly number[])[]; color: string; width?: number }) {
  const geometry = useMemo(() => {
    if (points.length < 2) return null;
    const path = new CurvePath<Vector3>();
    for (let i = 0; i + 1 < points.length; i++) path.add(new LineCurve3(new Vector3(...v3(points[i]!)), new Vector3(...v3(points[i + 1]!))));
    return new TubeGeometry(path, Math.max(8, (points.length - 1) * 2), 0.012 * width, 6, false);
  }, [points, width]);
  useEffect(() => () => geometry?.dispose(), [geometry]);
  if (!geometry) return null;
  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

/** Plan de coupe vertical x = x₀ ou y = y₀ au-dessus du carré [0,1]². */
export function CutPlane({ axis, at, height }: { axis: 'x' | 'y'; at: number; height: [number, number] }) {
  const h = height[1] - height[0];
  const pos: V3 = axis === 'x' ? [at, 0.5, (height[0] + height[1]) / 2] : [0.5, at, (height[0] + height[1]) / 2];
  const rot: V3 = axis === 'x' ? [Math.PI / 2, Math.PI / 2, 0] : [Math.PI / 2, 0, 0];
  return (
    <mesh position={pos} rotation={rot}>
      <planeGeometry args={[1, Math.max(h, 0.05)]} />
      <meshBasicMaterial color="#c98500" transparent opacity={0.18} side={DoubleSide} depthWrite={false} />
    </mesh>
  );
}
