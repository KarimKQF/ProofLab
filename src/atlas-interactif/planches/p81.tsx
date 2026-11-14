/**
 * Planche 81 — Gauss-Bonnet et classe d'Euler.
 * Sphère de rayon R : K = 1/R², aire 4πR², donc ∫K dA = 4π. Au rayon 2R, la courbure est
 * divisée par quatre et l'aire multipliée par quatre. Un ellipsoïde de demi-axes a, b, c a une
 * courbure variable, mais ∫K dA = 4π = 2π χ(S²) encore (intégrale calculée numériquement).
 */
import { useMemo, useState } from 'react';
import { PlateScene } from '../PlateScene';
import { f2, Slider } from '../kit2d';
import { Globe, ParamSurface, rgb, Scene3D } from '../kit3d';

/** Courbure de Gauss de l'ellipsoïde au point de paramètres (u, v). */
function curvature(a: number, b: number, c: number, u: number, v: number): number {
  const x = a * Math.sin(u) * Math.cos(v);
  const y = b * Math.sin(u) * Math.sin(v);
  const z = c * Math.cos(u);
  const s = (x * x) / a ** 4 + (y * y) / b ** 4 + (z * z) / c ** 4;
  return 1 / (a * a * b * b * c * c * s * s);
}

/** ∫K dA par la règle du point milieu en (u, v) ∈ ]0, π[ × ]0, 2π[. */
function totalCurvature(a: number, b: number, c: number, n = 120): number {
  const h = Math.PI / n;
  let s = 0;
  for (let i = 0; i < n; i++) {
    const u = (i + 0.5) * h;
    const su = Math.sin(u);
    const cu = Math.cos(u);
    for (let j = 0; j < 2 * n; j++) {
      const v = (j + 0.5) * h;
      const dA = su * Math.sqrt(b * b * c * c * su * su * Math.cos(v) ** 2 + a * a * c * c * su * su * Math.sin(v) ** 2 + a * a * b * b * cu * cu);
      s += curvature(a, b, c, u, v) * dA;
    }
  }
  return s * h * h;
}

const TEAL = rgb('#1a9e96');
const ORANGE = rgb('#d8743a');

export default function P81() {
  const [R, setR] = useState(0.9);
  const [a, setA] = useState(1.6);
  const [b, setB] = useState(1);
  const [c, setC] = useState(0.7);
  const total = useMemo(() => totalCurvature(a, b, c), [a, b, c]);
  // Échelle de couleurs logarithmique entre la courbure minimale et maximale (vert → orange).
  const [kMin, kMax] = useMemo(() => {
    let lo = Infinity;
    let hi = 0;
    for (let i = 0; i <= 40; i++) {
      for (let j = 0; j <= 80; j++) {
        const k = curvature(a, b, c, (Math.PI * i) / 40, (Math.PI * j) / 40);
        lo = Math.min(lo, k);
        hi = Math.max(hi, k);
      }
    }
    return [lo, hi];
  }, [a, b, c]);
  const colorAt = (u: number, v: number): [number, number, number] => {
    const t = kMax / kMin < 1.0001 ? 0.5 : (Math.log(curvature(a, b, c, u, v)) - Math.log(kMin)) / (Math.log(kMax) - Math.log(kMin));
    return [0, 1, 2].map((i) => TEAL[i]! + (ORANGE[i]! - TEAL[i]!) * t) as [number, number, number];
  };
  const cam: [number, number, number] = [5.2, -5.6, 3.4];
  const sphere = (r: number, color: string, label: string) => (
    <Scene3D label={label} camera={cam} height={280} labels={[{ id: 'aire', p: [0, 0, -r - 0.55], text: `K = ${f2(1 / (r * r), 3)}`, color }]}>
      <Globe r={r} color={color} opacity={0.7} />
    </Scene3D>
  );
  const ellipsoid = (
    <Scene3D label="Déformer la sphère" camera={[4.2, -4.6, 2.8]} height={280}>
      <ParamSurface
        f={(u, v) => [a * Math.sin(u) * Math.cos(v), b * Math.sin(u) * Math.sin(v), c * Math.cos(u)]}
        u={[0, Math.PI, 48]}
        v={[0, 2 * Math.PI, 96]}
        color="#1a9e96"
        opacity={0.95}
        colorAt={colorAt}
        deps={[a, b, c]}
      />
    </Scene3D>
  );
  const fourPi = 4 * Math.PI;
  const ratio = Math.max(a, b, c) / Math.min(a, b, c);
  return (
    <PlateScene
      n={81}
      panels={[
        { title: 'Sphère de rayon R', render: () => sphere(R, '#1a9e96', 'Sphère de rayon R') },
        { title: 'Sphère de rayon 2R', render: () => sphere(2 * R, '#4a86d0', 'Sphère de rayon 2R') },
        { title: 'Déformer la sphère', render: () => ellipsoid },
      ]}
      identity={String.raw`$\dfrac1{2\pi}\displaystyle\int_\Sigma K\,d\mathrm{vol}_g=\chi(\Sigma)=\langle e(T\Sigma),[\Sigma]\rangle$`}
      controls={
        <>
          <Slider label="Rayon R" value={R} min={0.4} max={1.2} step={0.01} onChange={setR} format={(v) => f2(v)} />
          <Slider label="Ellipsoïde : demi-axe a" value={a} min={0.4} max={2.2} step={0.01} onChange={setA} format={(v) => f2(v)} />
          <Slider label="Ellipsoïde : demi-axe b" value={b} min={0.4} max={2.2} step={0.01} onChange={setB} format={(v) => f2(v)} />
          <Slider label="Ellipsoïde : demi-axe c" value={c} min={0.4} max={2.2} step={0.01} onChange={setC} format={(v) => f2(v)} />
        </>
      }
      observations={[
        { id: 'rayon', text: 'Fais varier R : quand le rayon double, l’aire est multipliée par 4 et la courbure divisée par 4 ; le produit reste 4π.', done: Math.abs(R - 0.9) > 0.3 },
        { id: 'pointes', text: 'Étire l’ellipsoïde : la courbure se concentre aux pointes (orange) et faiblit sur les flancs (vert), mais l’intégrale reste 4π.', done: ratio > 3 },
        { id: 'euler', text: String.raw`Seule la topologie compte : $\frac1{2\pi}\int K\,dA=\chi(S^2)=2$ pour toutes ces surfaces.`, done: ratio > 1.5 && Math.abs(R - 0.9) > 0.3 },
      ]}
      readings={[
        { label: 'Rayon R : K × aire', value: `${f2(1 / (R * R), 3)} × ${f2(fourPi * R * R, 3)} = ${f2(fourPi, 4)}`, status: 'exact' },
        { label: 'Rayon 2R : K × aire', value: `${f2(1 / (4 * R * R), 3)} × ${f2(4 * fourPi * R * R, 3)} = ${f2(fourPi, 4)}`, status: 'exact' },
        { label: String.raw`Ellipsoïde : $\int K\,dA$ (intégrale)`, value: `${f2(total, 4)} (4π = ${f2(fourPi, 4)})`, status: 'numerique' },
        { label: String.raw`$\chi=\frac1{2\pi}\int K\,dA$`, value: f2(total / (2 * Math.PI), 4), status: 'numerique' },
      ]}
      note="Les deux sphères sont vues à la même échelle. Sur l’ellipsoïde, la couleur suit le logarithme de la courbure, du minimum (vert) au maximum (orange)."
    />
  );
}
