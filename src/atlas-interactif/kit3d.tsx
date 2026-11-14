/**
 * Primitives 3D des planches interactives (Three.js, chargé seulement par les planches 3D) :
 * toile commune avec porte WebGL, surfaces paramétrées, morceaux de plans tangents,
 * plus les points, segments, flèches, boules et polylignes du moteur visuel.
 */
import { useEffect, useMemo, type ReactNode } from 'react';
import { BufferAttribute, BufferGeometry, DoubleSide } from 'three';
import Canvas3D, { type Label3 } from '@/components/math-visualizations/three/Canvas3D';
import { Arrow3, Ball3, Plane3, Point3, Polyline3, Segment3 } from '@/components/math-visualizations/three/primitives';
import { Scene3DGate } from '@/components/math-visualizations/Scene3DGate';

export { Arrow3, Ball3, Plane3, Point3, Polyline3, Segment3 };
export type { Label3 };
export type V3 = [number, number, number];

/** Toile 3D d'une planche, avec repli explicite quand WebGL manque. */
export function Scene3D({
  label,
  children,
  labels,
  height = 380,
  camera = [4, 3, 2.6],
  axes = 2,
  showAxes = false,
  axisLabels,
  fallback,
}: {
  label: string;
  children: ReactNode;
  labels?: Label3[];
  height?: number;
  camera?: [number, number, number];
  axes?: number;
  showAxes?: boolean;
  axisLabels?: [string, string, string];
  fallback?: ReactNode;
}) {
  return (
    <Scene3DGate fallback={fallback ?? <p className="text-[13px] text-text-2">Cette vue est en 3D ; l’onglet « Planche originale » montre le dessin de l’atlas.</p>}>
      <Canvas3D label={label} labels={labels} height={height} camera={camera} axes={axes} showAxes={showAxes} axisLabels={axisLabels}>
        {children}
      </Canvas3D>
    </Scene3DGate>
  );
}

/**
 * Surface paramétrée (u, v) ↦ f(u, v), maillée en triangles. `deps` déclenche la
 * reconstruction (par défaut : la fonction et les bornes).
 */
export function ParamSurface({
  f,
  u,
  v,
  color,
  opacity = 0.85,
  wire = false,
  colorAt,
  deps,
  onTop = false,
}: {
  f: (u: number, v: number) => readonly number[];
  u: [number, number, number];
  v: [number, number, number];
  color: string;
  opacity?: number;
  wire?: boolean;
  /** Couleur par sommet (r, g, b dans [0, 1]) ; sinon couleur uniforme. */
  colorAt?: (u: number, v: number) => [number, number, number];
  deps?: unknown[];
  /** Dessiner au-dessus d'une surface confondue (décalage de profondeur). */
  onTop?: boolean;
}) {
  const geometry = useMemo(() => {
    const [u0, u1, nu] = u;
    const [v0, v1, nv] = v;
    const g = new BufferGeometry();
    const pos = new Float32Array((nu + 1) * (nv + 1) * 3);
    const col = colorAt ? new Float32Array((nu + 1) * (nv + 1) * 3) : null;
    let k = 0;
    for (let i = 0; i <= nu; i++) {
      const uu = u0 + ((u1 - u0) * i) / nu;
      for (let j = 0; j <= nv; j++) {
        const vv = v0 + ((v1 - v0) * j) / nv;
        const p = f(uu, vv);
        pos[k] = Number.isFinite(p[0]) ? p[0]! : 0;
        pos[k + 1] = Number.isFinite(p[1]) ? p[1]! : 0;
        pos[k + 2] = Number.isFinite(p[2]) ? p[2]! : 0;
        if (col && colorAt) {
          const c = colorAt(uu, vv);
          col[k] = c[0];
          col[k + 1] = c[1];
          col[k + 2] = c[2];
        }
        k += 3;
      }
    }
    const index: number[] = [];
    for (let i = 0; i < nu; i++) {
      for (let j = 0; j < nv; j++) {
        const a = i * (nv + 1) + j;
        index.push(a, a + nv + 1, a + 1, a + 1, a + nv + 1, a + nv + 2);
      }
    }
    g.setAttribute('position', new BufferAttribute(pos, 3));
    if (col) g.setAttribute('color', new BufferAttribute(col, 3));
    g.setIndex(index);
    g.computeVertexNormals();
    return g;
  }, deps ?? [f, ...u, ...v]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <group>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={colorAt ? undefined : color}
          vertexColors={Boolean(colorAt)}
          transparent={opacity < 1}
          opacity={opacity}
          side={DoubleSide}
          depthWrite={opacity >= 1}
          roughness={0.75}
          polygonOffset={onTop}
          polygonOffsetFactor={onTop ? -2 : 0}
          polygonOffsetUnits={onTop ? -2 : 0}
        />
      </mesh>
      {wire && (
        <mesh geometry={geometry}>
          <meshBasicMaterial color={color} wireframe transparent opacity={0.18} />
        </mesh>
      )}
    </group>
  );
}

/** Parallélogramme c ± s·a ± s·b (morceau de plan tangent), avec son contour. */
export function Patch3({ c, a, b, s = 0.5, color, opacity = 0.28 }: { c: readonly number[]; a: readonly number[]; b: readonly number[]; s?: number; color: string; opacity?: number }) {
  const corner = (i: number, j: number): V3 => [c[0]! + s * (i * a[0]! + j * b[0]!), c[1]! + s * (i * a[1]! + j * b[1]!), c[2]! + s * (i * a[2]! + j * b[2]!)];
  const quad = [corner(-1, -1), corner(1, -1), corner(1, 1), corner(-1, 1)];
  const geometry = useMemo(() => {
    const g = new BufferGeometry();
    g.setAttribute('position', new BufferAttribute(new Float32Array(quad.flat()), 3));
    g.setIndex([0, 1, 2, 0, 2, 3]);
    g.computeVertexNormals();
    return g;
  }, [quad.flat().join(',')]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <group>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={color} transparent opacity={opacity} side={DoubleSide} depthWrite={false} />
      </mesh>
      <Polyline3 points={[...quad, quad[0]!]} color={color} width={1} />
    </group>
  );
}

/**
 * Maillage triangulé explicite : `positions` à plat (x, y, z, x, y, z, …) et triangles par
 * indices. Sert aux fonctions affines par morceaux, dont les arêtes doivent rester nettes.
 */
export function TriMesh3({ positions, triangles, color, opacity = 0.6, wire = false, fill = true }: { positions: readonly number[]; triangles: readonly number[]; color: string; opacity?: number; wire?: boolean; fill?: boolean }) {
  const key = `${positions.join(',')}|${triangles.join(',')}`;
  const geometry = useMemo(() => {
    const g = new BufferGeometry();
    g.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
    g.setIndex([...triangles]);
    g.computeVertexNormals();
    return g;
    // La clé résume le contenu : on ne reconstruit que si le maillage change.
  }, [key]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <group>
      {fill && (
        <mesh geometry={geometry}>
          <meshStandardMaterial color={color} transparent={opacity < 1} opacity={opacity} side={DoubleSide} depthWrite={opacity >= 1} roughness={0.8} />
        </mesh>
      )}
      {wire && (
        <mesh geometry={geometry}>
          <meshBasicMaterial color={color} wireframe transparent opacity={0.55} />
        </mesh>
      )}
    </group>
  );
}

/** Couleur hexadécimale en triplet [0, 1]. */
export function rgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255];
}

/**
 * Sphère lisse et translucide (sans maillage en fil de fer), avec quelques parallèles et
 * méridiens discrets pour lire le relief.
 */
export function Globe({ r = 1, color = '#4a86d0', opacity = 0.32, center = [0, 0, 0], lines = true }: { r?: number; color?: string; opacity?: number; center?: readonly number[]; lines?: boolean }) {
  const c = center;
  const at = (th: number, ph: number): [number, number, number] => [c[0]! + r * Math.sin(th) * Math.cos(ph), c[1]! + r * Math.sin(th) * Math.sin(ph), c[2]! + r * Math.cos(th)];
  return (
    <group>
      <ParamSurface f={at} u={[0, Math.PI, 36]} v={[0, 2 * Math.PI, 64]} color={color} opacity={opacity} deps={[r, color, opacity, c[0], c[1], c[2]]} />
      {lines &&
        [Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4].map((th) => (
          <Polyline3 key={`p${th}`} points={Array.from({ length: 73 }, (_, k) => at(th, (2 * Math.PI * k) / 72))} color={color} width={0.5} />
        ))}
      {lines &&
        [0, Math.PI / 3, (2 * Math.PI) / 3].map((ph) => (
          <Polyline3 key={`m${ph}`} points={Array.from({ length: 73 }, (_, k) => at((2 * Math.PI * k) / 72, ph))} color={color} width={0.5} />
        ))}
    </group>
  );
}
