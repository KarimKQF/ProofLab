/**
 * Planche 1 — Le tore, une variété non linéaire.
 * Carré [0, 2π]² à bords identifiés (orange : θ ; vert : φ) et tache déplaçable ; à droite,
 * le même carré roulé en cylindre puis courbé en tore (curseur « recoller »).
 */
import { useMemo, useState } from 'react';
import { PlateScene } from '../PlateScene';
import { Arrow, C, Caption, DraggablePoint, f2, Label, Plot, Poly, Slider } from '../kit2d';
import { ParamSurface, Polyline3, Scene3D } from '../kit3d';
import { PlayButton, usePlayer } from '../hooks';
import { mod2pi, TAU } from '../math';

const H = 0.38;
const R_TUBE = 0.45;

/** Intervalles de [0, 2π] couverts par [c − h, c + h] modulo 2π. */
function pieces(c: number, h: number): [number, number][] {
  const a = c - h;
  const b = c + h;
  if (a < 0) return [[a + TAU, TAU], [0, b]];
  if (b > TAU) return [[a, TAU], [0, b - TAU]];
  return [[a, b]];
}

const bend = (t: number, a: number): [number, number] => (a < 1e-4 ? [t, 0] : [Math.sin(a * t) / a, (1 - Math.cos(a * t)) / a]);

/**
 * Plongement du carré à l'étape s : feuille carrée (0), cylindre (1/2), tore (1).
 * La feuille s'affine en roulant (rayon du tube de 1 à 0,45) pour que le tore final ait
 * un trou ; l'échelle globale garde une taille d'affichage comparable à chaque étape.
 */
function embed(s: number) {
  const aPhi = Math.min(1, 2 * s);
  const aTheta = Math.max(0, 2 * s - 1);
  const r = 1 - (1 - R_TUBE) * Math.min(1, 2 * s);
  const zc = aTheta < 1e-4 ? 0 : (1 - Math.sin(aTheta * Math.PI) / (aTheta * Math.PI)) / aTheta;
  const k = s <= 0.5 ? 0.55 : 0.55 + 1.4 * (s - 0.5);
  return (theta: number, phi: number): [number, number, number] => {
    const [cy, cn] = bend(phi - Math.PI, aPhi);
    const y = r * cy;
    const n = r * cn - r;
    const t = theta - Math.PI;
    const [ax, az] = bend(t, aTheta);
    const nx = -Math.sin(aTheta * t);
    const nz = Math.cos(aTheta * t);
    return [k * (ax + n * nx), k * (az + n * nz - zc), k * y];
  };
}

export default function P01() {
  const [c, setC] = useState<[number, number]>([3.8, 4.3]);
  const [s, setS] = useState(0);
  const player = usePlayer(4500, (k) => setS(k));
  const X = useMemo(() => embed(s), [s]);
  const patches = pieces(c[0], H).flatMap((pt) => pieces(c[1], H).map((pp) => [pt, pp] as const));
  const crossing = patches.length > 1;
  const stage = s < 0.02 ? 'feuille plane' : s < 0.49 ? 'en cours de roulement' : s <= 0.51 ? 'cylindre' : s < 0.98 ? 'en cours de courbure' : 'tore';

  const square = (
    <div>
      <Plot xDomain={[-0.9, TAU + 0.9]} yDomain={[-0.9, TAU + 0.9]} width={420} height={420} grid={false} ariaLabel="Carré des coordonnées périodiques">
        <Poly points={[[0, 0], [TAU, 0], [TAU, TAU], [0, TAU]]} fill={C.blue} opacity={0.08} stroke={C.faint} width={1} />
        <Arrow a={[1.2, TAU + 0.25]} b={[TAU - 1.2, TAU + 0.25]} color={C.orange} width={2.6} />
        <Arrow a={[1.2, -0.25]} b={[TAU - 1.2, -0.25]} color={C.orange} width={2.6} />
        <Arrow a={[-0.25, 1.2]} b={[-0.25, TAU - 1.2]} color={C.teal} width={2.6} />
        <Arrow a={[TAU + 0.25, 1.2]} b={[TAU + 0.25, TAU - 1.2]} color={C.teal} width={2.6} />
        {patches.map(([[t0, t1], [p0, p1]], i) => (
          <Poly key={i} points={[[t0, p0], [t1, p0], [t1, p1], [t0, p1]]} fill={C.violet} opacity={0.45} stroke={C.violet} width={1.5} />
        ))}
        <DraggablePoint
          x={c[0]}
          y={c[1]}
          onChange={(x, y) => setC([mod2pi(x), mod2pi(y)])}
          name="Centre de la tache"
          color={C.violet}
          step={0.1}
          r={6}
        />
        <Label x={Math.PI} y={-0.75} text="θ (0 ≡ 2π)" color={C.orange} anchor="middle" italic />
        <Label x={-0.65} y={Math.PI} text="φ" color={C.teal} anchor="middle" italic />
      </Plot>
      <Caption>Bords orange recollés entre eux, bords verts entre eux, en suivant les flèches.</Caption>
    </div>
  );

  const torus = (
    <div>
      <Scene3D label="Le carré recollé : cylindre puis tore" camera={[0.9, -6.4, 4.4]} height={400}>
        <ParamSurface f={X} u={[0, TAU, 72]} v={[0, TAU, 36]} color="#46b8b0" opacity={0.95} deps={[s]} />
        {patches.map(([[t0, t1], [p0, p1]], i) => (
          <ParamSurface key={i} f={X} u={[t0, t1, 10]} v={[p0, p1, 10]} color="#9b7fe6" opacity={1} onTop deps={[s, t0, t1, p0, p1]} />
        ))}
        {[0, TAU].map((phi) => (
          <Polyline3 key={`o${phi}`} points={Array.from({ length: 73 }, (_, k) => X((TAU * k) / 72, phi))} color="#d8743a" width={2.4} />
        ))}
        {[0, TAU].map((theta) => (
          <Polyline3 key={`t${theta}`} points={Array.from({ length: 49 }, (_, k) => X(theta, (TAU * k) / 48))} color="#1a9e96" width={2.4} />
        ))}
      </Scene3D>
      <Caption>Petit domaine d’une carte (violet) ; bords orange et verts tracés sur la surface.</Caption>
    </div>
  );

  return (
    <PlateScene
      n={1}
      panels={[
        { title: 'Coordonnées périodiques', render: () => square },
        { title: 'Après identification', render: () => torus },
      ]}
      identity={String.raw`$\mathbb T^2=\mathbb R^2/(2\pi\mathbb Z)^2$ : $(\theta,\varphi)\sim(\theta+2\pi k,\ \varphi+2\pi l)$.`}
      controls={
        <>
          <Slider
            label="Recoller : feuille → cylindre → tore"
            value={s}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => {
              player.stop();
              setS(v);
            }}
            format={(v) => `${Math.round(v * 100)} %`}
          />
          <PlayButton player={player} label="Animer le recollement" />
          <p className="text-[12.5px] text-text-3">Fais glisser la tache violette dans le carré, ou utilise les flèches du clavier après l’avoir sélectionnée.</p>
        </>
      }
      observations={[
        { id: 'bord', text: 'Fais sortir la tache par un bord : elle rentre par le bord opposé, de la même couleur.', done: crossing },
        { id: 'cylindre', text: 'À mi-chemin, un seul recollement : la feuille est devenue un cylindre (les bords verts se touchent).', done: s >= 0.48 && s <= 0.52 },
        { id: 'tore', text: 'Recolle jusqu’au bout : les deux paires de bords se confondent, on obtient un tore.', done: s >= 0.98 },
        { id: 'tache-tore', text: 'Sur le tore, une tache qui traverse un bord reste d’un seul tenant.', done: s >= 0.98 && crossing },
      ]}
      readings={[
        { label: String.raw`Centre de la tache $(\theta,\varphi)$`, value: `(${f2(c[0])} ; ${f2(c[1])})`, status: 'exact' },
        { label: 'Étape du recollement', value: stage, status: 'exact' },
        { label: 'Morceaux de la tache dans le carré', value: String(patches.length), status: 'exact' },
      ]}
      note="Le plongement dans l’espace sert à voir la topologie : ses longueurs ne sont pas celles du carré (la métrique dépend du plongement choisi)."
    />
  );
}
