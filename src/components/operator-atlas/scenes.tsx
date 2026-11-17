import { useId, useState, type ReactNode } from 'react';
import { MathText } from '@/components/Math';
import { t } from '@/content/authoring';

const BLUE = '#1976c9';
const ORANGE = '#bf6514';
const GRAY = '#758294';
const GREEN = '#168273';
const f = (value: number) => value.toLocaleString('fr-FR', { maximumFractionDigits: 4 });
const rad = (degrees: number) => degrees * Math.PI / 180;

export const resolventNorm = (x: number, y: number) => {
  const distance = Math.min(...[-1, 1, 3].map((eigenvalue) => Math.hypot(x - eigenvalue, y)));
  return distance < 1e-12 ? Infinity : 1 / distance;
};
export const compactTailNorm = (n: number, identity = false) => identity ? 1 : 1 / (n + 1);
export const localizedResidual = (center: number, epsilon: number) => {
  const left = Math.max(0, center - epsilon);
  const right = Math.min(1, center + epsilon);
  return Math.sqrt(((right - center) ** 3 - (left - center) ** 3) / (3 * (right - left)));
};
export const domainMembership = (p: number) => ({ hilbert: p > 0.5, form: p > 1, operator: p > 1.5 });

function Slider({ label, value, onChange, min, max, step = 1, unit = '' }: {
  label: string; value: number; onChange: (value: number) => void; min: number; max: number; step?: number; unit?: string;
}) {
  const id = useId();
  return <label htmlFor={id} className="block text-sm min-w-0">
    <span className="flex justify-between gap-3 mb-1"><span>{label}</span><output htmlFor={id} className="font-mono text-accent">{f(value)}{unit}</output></span>
    <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="w-full accent-accent" />
  </label>;
}

function Drawing({ title, children }: { title: string; children: ReactNode }) {
  const id = useId();
  return <svg viewBox="0 0 640 320" role="img" aria-labelledby={id} className="w-full rounded-lg bg-surface-2 border border-line" style={{ maxHeight: 420 }}>
    <title id={id}>{title}</title>
    <g fill="currentColor" fontFamily="inherit" fontSize="13">{children}</g>
  </svg>;
}

function Axes({ x = 320, y = 165, radius = 120 }: { x?: number; y?: number; radius?: number }) {
  return <g stroke={GRAY} strokeWidth="1" opacity="0.6"><line x1={x - radius} x2={x + radius} y1={y} y2={y} /><line x1={x} x2={x} y1={y - radius} y2={y + radius} /></g>;
}

function Arrow({ x = 320, y = 165, dx, dy, color, label }: { x?: number; y?: number; dx: number; dy: number; color: string; label?: string }) {
  const length = Math.hypot(dx, dy);
  if (length < 0.1) return <circle cx={x} cy={y} r="3" fill={color} />;
  const nx = dx / length; const ny = dy / length;
  return <g stroke={color} fill={color} strokeWidth="2.5">
    <line x1={x} y1={y} x2={x + dx} y2={y - dy} />
    <polygon strokeWidth="0" points={`${x + dx},${y - dy} ${x + dx - 8 * nx - 4 * ny},${y - dy + 8 * ny - 4 * nx} ${x + dx - 8 * nx + 4 * ny},${y - dy + 8 * ny + 4 * nx}`} />
    {label && <text x={x + dx + 7} y={y - dy - 8} strokeWidth="0" fontSize="14">{label}</text>}
  </g>;
}

function Layout({ controls, children, result }: { controls: ReactNode; children: ReactNode; result: ReactNode }) {
  return <div className="space-y-4">
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">{controls}</div>
    {children}
    <div role="status" aria-live="polite" data-testid="operator-scene-result" className="rounded-md border border-line bg-surface-2 p-3 text-sm leading-relaxed">{result}</div>
  </div>;
}

export function NormScene() {
  const [a, setA] = useState(2); const [b, setB] = useState(1); const [angle, setAngle] = useState(35);
  const c = Math.cos(rad(angle)); const s = Math.sin(rad(angle));
  return <Layout controls={<><Slider label="Premier coefficient a" value={a} onChange={setA} min={0.25} max={3} step={0.25} /><Slider label="Second coefficient b" value={b} onChange={setB} min={0.25} max={3} step={0.25} /><Slider label="Direction θ" value={angle} onChange={setAngle} min={0} max={360} unit="°" /></>} result={<><strong>Norme de A : {f(Math.max(a, b))}.</strong> Longueur de Au : {f(Math.hypot(a * c, b * s))}. Le maximum est atteint sur l’axe de plus grand coefficient.</>}>
    <Drawing title="Cercle unité et ellipse image par un opérateur diagonal">
      <Axes /><circle cx="320" cy="165" r="40" fill="none" stroke={GRAY} strokeDasharray="5 4" /><ellipse cx="320" cy="165" rx={40 * a} ry={40 * b} fill={BLUE} fillOpacity="0.07" stroke={BLUE} strokeWidth="2" />
      <Arrow dx={40 * c} dy={40 * s} color={GRAY} label="u" /><Arrow dx={40 * a * c} dy={40 * b * s} color={BLUE} label="Au" />
      <text x="25" y="30" fill={GRAY}>Cercle : ‖u‖ = 1</text><text x="25" y="52" fill={BLUE}>Ellipse : images Au</text>
    </Drawing>
  </Layout>;
}

export function AdjointScene() {
  const [shear, setShear] = useState(1); const [angle, setAngle] = useState(55);
  const c = Math.cos(rad(angle)); const s = Math.sin(rad(angle));
  return <Layout controls={<><Slider label="Coefficient s" value={shear} onChange={setShear} min={-1.5} max={1.5} step={0.1} /><Slider label="Direction de v" value={angle} onChange={setAngle} min={0} max={360} unit="°" /></>} result={<><strong>⟨Au, v⟩ = ⟨u, A*v⟩ = {f(c)}.</strong> A est {shear === 0 ? 'symétrique' : 'non symétrique'} pour s = {f(shear)}.</>}>
    <Drawing title="Égalité des produits scalaires obtenue avec la matrice et son adjointe">
      <Axes x={165} radius={110} /><Axes x={480} radius={110} />
      <Arrow x={165} dx={60} dy={0} color={BLUE} label="Au = u" /><Arrow x={165} dx={60 * c} dy={60 * s} color={ORANGE} label="v" />
      <Arrow x={480} dx={60} dy={0} color={GRAY} label="u" /><Arrow x={480} dx={60 * c} dy={60 * (shear * c + s)} color={BLUE} label="A*v" />
      <text x="90" y="30">Transformer u par A</text><text x="400" y="30">Transformer v par A*</text>
      <text x="210" y="295">Même produit scalaire, deux transformations</text>
    </Drawing>
  </Layout>;
}

export function ResolventScene() {
  const [x, setX] = useState(1); const [y, setY] = useState(1);
  const closest = [-1, 1, 3].reduce((a, b) => Math.abs(x - a) < Math.abs(x - b) ? a : b);
  const norm = resolventNorm(x, y); const px = (value: number) => 140 + 80 * value;
  return <Layout controls={<><Slider label="Partie réelle de z" value={x} onChange={setX} min={-1.5} max={3.5} step={0.1} /><Slider label="Partie imaginaire de z" value={y} onChange={setY} min={-1.5} max={1.5} step={0.1} /></>} result={Number.isFinite(norm) ? <><strong>Norme de la résolvante : {f(norm)}.</strong> Distance au spectre : {f(1 / norm)}.</> : <strong>z appartient au spectre : l’inverse (zI − A)⁻¹ n’existe pas.</strong>}>
    <Drawing title="Point z dans le plan complexe et distance au spectre moins un, un, trois">
      <line x1="35" x2="590" y1="165" y2="165" stroke={GRAY} /><line x1={px(0)} x2={px(0)} y1="30" y2="290" stroke={GRAY} />
      <text x="595" y="183">Re</text><text x={px(0) + 8} y="25">Im</text>
      {[-1, 1, 3].map((value) => <g key={value}><circle cx={px(value)} cy="165" r="6" fill={ORANGE} /><text x={px(value) - 5} y="189">{value}</text></g>)}
      <line x1={px(x)} y1={165 - 80 * y} x2={px(closest)} y2="165" stroke={BLUE} strokeDasharray="5 4" strokeWidth="2" /><circle cx={px(x)} cy={165 - 80 * y} r="6" fill={BLUE} /><text x={px(x) + 10} y={160 - 80 * y} fill={BLUE}>z</text>
    </Drawing>
  </Layout>;
}

export function CompactScene() {
  const [n, setN] = useState(5); const [identity, setIdentity] = useState(false);
  return <Layout controls={<><Slider label="Rang de troncature N" value={n} onChange={setN} min={1} max={20} /><label className="flex gap-2 items-center text-sm"><input type="checkbox" checked={identity} onChange={(event) => setIdentity(event.target.checked)} />Comparer avec l’identité</label></>} result={<><strong>Erreur exacte sur toute la queue infinie : {f(compactTailNorm(n, identity))}.</strong> {identity ? 'L’identité n’est pas compacte sur ℓ².' : `Pour K, cette erreur vaut 1/(N+1) = 1/${n + 1} et tend vers zéro.`}</>}>
    <Drawing title="Coefficients conservés et omis d’une troncature diagonale">
      <line x1="35" x2="610" y1="260" y2="260" stroke={GRAY} />
      {Array.from({ length: 24 }, (_, i) => { const k = i + 1; const h = 205 * (identity ? 1 : 1 / k); return <g key={k}><rect x={40 + i * 23} y={260 - h} width="15" height={h} rx="2" fill={k <= n ? BLUE : ORANGE} /><text x={41 + i * 23} y="281" fontSize="11">{k}</text></g>; })}
      <text x="40" y="25" fill={BLUE}>Bleu : coordonnées conservées</text><text x="335" y="25" fill={ORANGE}>Orange : coordonnées omises</text>
      <text x="345" y="308" fontSize="12">L’opérateur possède une infinité de coordonnées.</text>
    </Drawing>
  </Layout>;
}

export function SpectralCompactScene() {
  const [phi, setPhi] = useState(25); const [theta, setTheta] = useState(60);
  const p = rad(phi); const q = rad(theta); const d = q - p;
  const ax = Math.cos(p) * Math.cos(d) - 3 * Math.sin(p) * Math.sin(d);
  const ay = Math.sin(p) * Math.cos(d) + 3 * Math.cos(p) * Math.sin(d);
  const rayleigh = 1 + 2 * Math.sin(d) ** 2;
  return <Layout controls={<><Slider label="Rotation de la base propre φ" value={phi} onChange={setPhi} min={0} max={180} unit="°" /><Slider label="Direction du vecteur θ" value={theta} onChange={setTheta} min={0} max={360} unit="°" /></>} result={<><strong>Quotient de Rayleigh : {f(rayleigh)}.</strong> Les bornes exactes restent 1 et 3, quelle que soit la rotation de la base propre.</>}>
    <Drawing title="Deux axes propres orthogonaux et image d’un vecteur par une matrice symétrique">
      <Axes /><g transform={`translate(320 165) rotate(${-phi})`}><ellipse rx="38" ry="114" fill={BLUE} fillOpacity="0.05" stroke={BLUE} strokeWidth="1.5" /><line x1="-125" x2="125" y1="0" y2="0" stroke={ORANGE} strokeDasharray="5 4" /><line x1="0" x2="0" y1="-125" y2="125" stroke={ORANGE} strokeDasharray="5 4" /></g>
      <Arrow dx={38 * Math.cos(q)} dy={38 * Math.sin(q)} color={GRAY} label="u" /><Arrow dx={38 * ax} dy={38 * ay} color={BLUE} label="Au" />
      <text x="20" y="30" fill={ORANGE}>Axes propres : λ = 1 et λ = 3</text><text x="20" y="295">L’ellipse est l’image du cercle unité.</text>
    </Drawing>
  </Layout>;
}

export function GeneralSpectralScene() {
  const [center, setCenter] = useState(0.5); const [epsilon, setEpsilon] = useState(0.15);
  const left = Math.max(0, center - epsilon); const right = Math.min(1, center + epsilon); const height = 1 / Math.sqrt(right - left);
  const px = (x: number) => 65 + 510 * x;
  return <Layout controls={<><Slider label="Valeur spectrale c" value={center} onChange={setCenter} min={0} max={1} step={0.05} /><Slider label="Demi-largeur ε" value={epsilon} onChange={setEpsilon} min={0.025} max={0.4} step={0.025} /></>} result={<><strong>Norme de u : 1. Résidu ‖(Mₓ − cI)u‖ : {f(localizedResidual(center, epsilon))} ≤ {f(epsilon)}.</strong> Hauteur de la fonction : {f(height)} ; support de longueur {f(right - left)}.</>}>
    <Drawing title="Fonction indicatrice normalisée sur un petit intervalle autour de la valeur spectrale c">
      <rect x={px(left)} y="35" width={px(right) - px(left)} height="225" fill={BLUE} fillOpacity="0.09" />
      <line x1={px(0)} x2={px(1)} y1="260" y2="260" stroke={GRAY} /><line x1={px(0)} x2={px(0)} y1="35" y2="260" stroke={GRAY} />
      <path d={`M ${px(0)} 260 H ${px(left)} V ${260 - 30 * height} H ${px(right)} V 260 H ${px(1)}`} fill="none" stroke={BLUE} strokeWidth="3" />
      <line x1={px(center)} x2={px(center)} y1="40" y2="269" stroke={ORANGE} strokeDasharray="4 4" /><text x={px(center) + 5} y="40" fill={ORANGE}>c</text>
      <text x={px(0)} y="285">0</text><text x={px(1)} y="285">1</text><text x="20" y="25">u(x)</text><text x="590" y="266">x</text>
      <text x="275" y="307">Aire sous |u|² : exactement 1</text>
    </Drawing>
  </Layout>;
}

export function FunctionalScene() {
  const [choice, setChoice] = useState('square');
  const funcs: Record<string, (x: number) => number> = { square: (x) => x * x, root: Math.sqrt, resolvent: (x) => 1 / (1 + x), projector: (x) => x <= 2 ? 1 : 0 };
  const names: Record<string, string> = { square: 'λ²', root: '√λ', resolvent: '1/(1+λ)', projector: '1[1,2](λ)' };
  const values = [1, 2, 4].map((lambda) => funcs[choice]!(lambda) / lambda);
  return <Layout controls={<label className="text-sm">Fonction f<select aria-label="Fonction f" value={choice} onChange={(event) => setChoice(event.target.value)} className="block w-full mt-1 rounded border border-line bg-surface-2 px-2 py-1.5"><option value="square">Carré : λ²</option><option value="root">Racine carrée : √λ</option><option value="resolvent">Résolvante : 1/(1+λ)</option><option value="projector">Projecteur : indicatrice de [1,2]</option></select></label>} result={<><strong>Pour f(λ) = {names[choice]}, f(A)u = ({values.map(f).join(' ; ')}).</strong> Chaque coordonnée de u est multipliée par f(λ), sans appliquer f au vecteur Au.</>}>
    <Drawing title="Coordonnées du vecteur initial et de son image par le calcul fonctionnel">
      <line x1="60" x2="590" y1="260" y2="260" stroke={GRAY} />
      {[1, 2, 4].map((lambda, i) => <g key={lambda}><rect x={115 + i * 165} y={260 - 48 / lambda} width="35" height={48 / lambda} fill={GRAY} /><rect x={155 + i * 165} y={260 - 48 * values[i]!} width="35" height={48 * values[i]!} fill={BLUE} /><text x={119 + i * 165} y="285">λ = {lambda}</text></g>)}
      <text x="60" y="30" fill={GRAY}>Gris : u</text><text x="200" y="30" fill={BLUE}>Bleu : f(A)u</text><text x="60" y="306">Même base propre ; les coefficients changent.</text>
    </Drawing>
  </Layout>;
}

export function FormsScene() {
  const [p, setP] = useState(1.25); const [n, setN] = useState(80);
  const sums = [0, 0, 0]; const curves: number[][] = [[], [], []];
  for (let k = 1; k <= n; k += 1) for (let j = 0; j < 3; j += 1) { sums[j] += k ** (j - 2 * p); curves[j]!.push(sums[j]!); }
  const maximum = Math.max(3, sums[2]!); const member = domainMembership(p);
  const colors = [GRAY, BLUE, ORANGE];
  return <Layout controls={<><Slider label="Exposant p" value={p} onChange={setP} min={0.5} max={2} step={0.05} /><Slider label="Nombre de termes N" value={n} onChange={setN} min={10} max={200} step={10} /></>} result={<><strong>Critères pour la série infinie :</strong> H : {member.hilbert ? 'oui' : 'non'} ; domaine de forme : {member.form ? 'oui' : 'non'} ; domaine de A : {member.operator ? 'oui' : 'non'}. Sommes partielles : {sums.map(f).join(' ; ')}.</>}>
    <Drawing title="Sommes partielles de la norme, de la forme et de la norme de l’image par l’opérateur">
      <line x1="65" x2="590" y1="260" y2="260" stroke={GRAY} /><line x1="65" x2="65" y1="45" y2="260" stroke={GRAY} />
      {curves.map((curve, j) => <polyline key={j} points={curve.map((value, i) => `${65 + (i + 1) / n * 510},${260 - value / maximum * 205}`).join(' ')} fill="none" stroke={colors[j]} strokeWidth="2.5" />)}
      <text x="65" y="25" fill={GRAY}>Σ |uₙ|²</text><text x="230" y="25" fill={BLUE}>Σ n |uₙ|²</text><text x="410" y="25" fill={ORANGE}>Σ n² |uₙ|²</text>
      <text x="15" y="57" fontSize="11">{f(maximum)}</text><text x="565" y="283">{n}</text><text x="65" y="283">0</text><text x="75" y="307">Axe vertical ajusté aux sommes partielles affichées.</text>
    </Drawing>
  </Layout>;
}

export function SemigroupScene() {
  const [time, setTime] = useState(0.3); const [extra, setExtra] = useState(0.2);
  return <Layout controls={<><Slider label="Paramètre t" value={time} onChange={setTime} min={0} max={2} step={0.025} /><Slider label="Paramètre s" value={extra} onChange={setExtra} min={0} max={2} step={0.025} /></>} result={<><strong>‖T(t)‖ = {f(Math.exp(-time))}. ‖T(t) − I‖ sur ℓ² = {time === 0 ? '0' : '1'}.</strong> Pour le premier mode : e⁻ᵗ × e⁻ˢ = {f(Math.exp(-(time + extra)))} = e⁻⁽ᵗ⁺ˢ⁾.</>}>
    <Drawing title="Multiplicateurs spectraux du semi-groupe aux paramètres t et t plus s">
      <line x1="40" x2="610" y1="260" y2="260" stroke={GRAY} />
      {Array.from({ length: 12 }, (_, i) => { const k = i + 1; return <g key={k}><rect x={45 + i * 47} y={260 - 210 * Math.exp(-k * time)} width="17" height={210 * Math.exp(-k * time)} fill={BLUE} /><rect x={64 + i * 47} y={260 - 210 * Math.exp(-k * (time + extra))} width="17" height={210 * Math.exp(-k * (time + extra))} fill={GREEN} /><text x={55 + i * 47} y="281">{k}</text></g>; })}
      <text x="40" y="25" fill={BLUE}>Bleu : e⁻ⁿᵗ</text><text x="265" y="25" fill={GREEN}>Vert : e⁻ⁿ⁽ᵗ⁺ˢ⁾ = e⁻ⁿᵗ e⁻ⁿˢ</text><text x="40" y="307">Douze premières coordonnées d’un opérateur sur ℓ².</text>
    </Drawing>
  </Layout>;
}

export function GeneralizedScene() {
  const [b, setB] = useState(1); const [angle, setAngle] = useState(40);
  const c = Math.cos(rad(angle)); const s = Math.sin(rad(angle));
  return <Layout controls={<><Slider label="Coefficient positif b" value={b} onChange={setB} min={0.25} max={4} step={0.25} /><Slider label="Direction sur le cercle transformé" value={angle} onChange={setAngle} min={0} max={360} unit="°" /></>} result={<><strong>Valeurs propres généralisées : {f(1 / b)} et 4.</strong> uᵀBu = ‖v‖² = 1. Quotient uᵀAu / uᵀBu : {f(c * c / b + 4 * s * s)}.</>}>
    <Drawing title="Ellipse unité pour le produit scalaire B et cercle après transformation par la racine de B">
      <Axes x={170} radius={120} /><Axes x={480} radius={110} /><ellipse cx="170" cy="165" rx={55 / Math.sqrt(b)} ry="55" fill={ORANGE} fillOpacity="0.07" stroke={ORANGE} strokeWidth="2" /><circle cx="480" cy="165" r="55" fill={BLUE} fillOpacity="0.07" stroke={BLUE} strokeWidth="2" />
      <Arrow x={170} dx={55 * c / Math.sqrt(b)} dy={55 * s} color={ORANGE} label="u" /><Arrow x={480} dx={55 * c} dy={55 * s} color={BLUE} label="v" />
      <text x="95" y="30" fill={ORANGE}>uᵀBu = 1</text><text x="430" y="30" fill={BLUE}>‖v‖² = 1</text><text x="288" y="150">B¹ᐟ² →</text><text x="100" y="295">q₁ = (1/√b, 0), q₂ = (0, 1) : base B-orthonormée.</text>
    </Drawing>
  </Layout>;
}

export function IntegralScene() {
  const [a, setA] = useState(1);
  const [choice, setChoice] = useState('constant');
  const inputs: Record<string, { at: (x: number) => number; integral: number }> = {
    constant: { at: () => 1, integral: 1 / 2 },
    linear: { at: (x) => x, integral: 1 / 3 },
    orthogonal: { at: (x) => 1 - 1.5 * x, integral: 0 },
  };
  const input = inputs[choice]!;
  const points = (fn: (x: number) => number) => Array.from({ length: 81 }, (_, i) => `${70 + 500 * i / 80},${170 - 85 * fn(i / 80)}`).join(' ');
  return <Layout controls={<><Slider label="Coefficient du noyau a" value={a} onChange={setA} min={-2} max={2} step={0.25} /><label className="text-sm">Fonction u<select aria-label="Fonction u" value={choice} onChange={(event) => setChoice(event.target.value)} className="block w-full mt-1 rounded border border-line bg-surface-2 p-2"><option value="constant">u(x) = 1</option><option value="linear">u(x) = x</option><option value="orthogonal">u(x) = 1 − 3x/2</option></select></label></>} result={<><strong>Kₐu(x) = {f(a * input.integral)} x.</strong> Intégrale de y u(y) : {f(input.integral)}. Norme de Kₐ : {f(Math.abs(a) / 3)}. Rang : {a === 0 ? 0 : 1}.</>}>
    <Drawing title="Fonction initiale et image par l’opérateur intégral de noyau axy"><line x1="70" x2="580" y1="170" y2="170" stroke={GRAY} /><line x1="70" x2="70" y1="45" y2="280" stroke={GRAY} /><polyline points={points(input.at)} fill="none" stroke={GRAY} strokeWidth="3" /><polyline points={points((x) => a * input.integral * x)} fill="none" stroke={BLUE} strokeWidth="3" /><text x="70" y="25" fill={GRAY}>Gris : u</text><text x="250" y="25" fill={BLUE}>Bleu : Kₐu</text><text x="55" y="190">0</text><text x="568" y="190">1</text><text x="585" y="173">x</text><text x="40" y="90">1</text><text x="40" y="260">−1</text><text x="90" y="308">Toutes les images sont sur la droite vectorielle engendrée par x.</text></Drawing>
  </Layout>;
}

export const dirichletTail = (a: number, b: number, n: number) => Math.hypot(n < 2 ? a / 4 : 0, n < 3 ? b / 9 : 0);
export function DirichletScene() {
  const [a, setA] = useState(2); const [b, setB] = useState(1); const [n, setN] = useState(1);
  const coefficients = [1, a, b];
  const evaluate = (x: number, inverse: boolean, count: number) => coefficients.slice(0, count).reduce((sum, c, i) => sum + Math.sqrt(2 / Math.PI) * c * Math.sin((i + 1) * x) / (inverse ? (i + 1) ** 2 : 1), 0);
  const points = (inverse: boolean, count: number) => Array.from({ length: 161 }, (_, i) => `${65 + i / 160 * 510},${170 - 28 * evaluate(Math.PI * i / 160, inverse, count)}`).join(' ');
  return <Layout controls={<><Slider label="Coefficient du deuxième mode a" value={a} onChange={setA} min={-2} max={2} step={0.25} /><Slider label="Coefficient du troisième mode b" value={b} onChange={setB} min={-2} max={2} step={0.25} /><Slider label="Nombre de modes conservés N" value={n} onChange={setN} min={1} max={3} /></>} result={<><strong>Erreur exacte ‖u − u_N‖₂ : {f(dirichletTail(a, b, n))}.</strong> Coefficients de la solution : 1 ; {f(a / 4)} ; {f(b / 9)}. {n === 3 ? 'Tous les modes du second membre choisi sont conservés.' : 'L’erreur se calcule par orthogonalité des modes omis.'}</>}>
    <Drawing title="Second membre et reconstruction spectrale de la solution de Dirichlet"><line x1="65" x2="575" y1="170" y2="170" stroke={GRAY} /><line x1="65" x2="65" y1="45" y2="285" stroke={GRAY} /><polyline points={points(false, 3)} fill="none" stroke={GRAY} strokeWidth="2" /><polyline points={points(true, 3)} fill="none" stroke={BLUE} strokeWidth="3" /><polyline points={points(true, n)} fill="none" stroke={ORANGE} strokeWidth="3" strokeDasharray="6 4" /><text x="65" y="25" fill={GRAY}>f</text><text x="170" y="25" fill={BLUE}>Solution u</text><text x="340" y="25" fill={ORANGE}>Troncature u_N</text><text x="55" y="195">0</text><text x="570" y="195">π</text><text x="590" y="173">x</text><text x="30" y="61">4</text><text x="25" y="283">−4</text><text x="100" y="308">Base orthonormée : eₙ(x) = √(2/π) sin(nx).</text></Drawing>
  </Layout>;
}

export const OPERATOR_SCENE_IDS = ['norme-operateur', 'domaine-adjoint', 'spectre-resolvante', 'compacite-fredholm', 'spectral-compact', 'operateurs-integraux', 'modes-dirichlet', 'spectral-general', 'calcul-fonctionnel', 'formes-friedrichs', 'semi-groupes', 'spectral-generalise'];

const SCENES: Record<string, () => ReactNode> = {
  'norme-operateur': NormScene,
  'domaine-adjoint': AdjointScene,
  'spectre-resolvante': ResolventScene,
  'compacite-fredholm': CompactScene,
  'spectral-compact': SpectralCompactScene,
  'operateurs-integraux': IntegralScene,
  'modes-dirichlet': DirichletScene,
  'spectral-general': GeneralSpectralScene,
  'calcul-fonctionnel': FunctionalScene,
  'formes-friedrichs': FormsScene,
  'semi-groupes': SemigroupScene,
  'spectral-generalise': GeneralizedScene,
};

export function OperatorScene({ id }: { id: string }) {
  const Scene = SCENES[id];
  return Scene ? <Scene /> : <MathText text={t`Aucune figure n’est disponible pour cet identifiant.`} />;
}
