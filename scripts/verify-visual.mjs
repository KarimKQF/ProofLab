/**
 * Vérification en navigateur réel du Visual Reasoning Engine (Chrome installé, WebGL compris).
 * Usage : node scripts/verify-visual.mjs <url-de-base> <dossier-de-sortie> [scénario ...]
 * Chaque scénario manipule réellement un laboratoire (points, curseurs, vues, caméra,
 * animation), vérifie des invariants dans la page, contrôle que la vue 3D est rendue par
 * WebGL (pixels non uniformes) et enregistre des captures. Les erreurs de console sont listées.
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const [base = 'http://127.0.0.1:5173', out = 'captures-visuel', ...only] = process.argv.slice(2);
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', args: ['--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const failures = [];
const check = (cond, message) => {
  if (cond) console.log(`  ✓ ${message}`);
  else {
    console.log(`  ✗ ${message}`);
    failures.push(message);
  }
};

/** Nombre de couleurs distinctes (échantillonnées) d'une toile WebGL : > 1 si quelque chose est dessiné. */
async function webglColors(page) {
  return page.evaluate(() => {
    const c = document.querySelector('[data-testid="canvas-3d"] canvas');
    if (!c) return -1;
    const copy = document.createElement('canvas');
    copy.width = c.width;
    copy.height = c.height;
    const ctx = copy.getContext('2d');
    ctx.drawImage(c, 0, 0);
    const data = ctx.getImageData(0, 0, copy.width, copy.height).data;
    const seen = new Set();
    for (let i = 0; i < data.length; i += 4 * 97) seen.add(`${data[i]},${data[i + 1]},${data[i + 2]}`);
    return seen.size;
  });
}

async function newPage(theme = 'dark', viewport = { width: 1440, height: 900 }) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const problems = [];
  page.on('console', (m) => {
    if (m.type() === 'error') problems.push(`[console] ${m.text()}`);
  });
  page.on('pageerror', (e) => problems.push(`[exception] ${e.message}`));
  page.on('response', (r) => {
    if (r.status() >= 400) problems.push(`[${r.status()}] ${r.url()}`);
  });
  await page.goto(`${base}/#/reglages`);
  await page.waitForSelector('main');
  await page.getByRole('button', { name: theme === 'light' ? 'Clair' : 'Sombre' }).click();
  return { page, context, problems };
}

const shot = async (page, name, locator) => {
  const file = join(out, `${name}.png`);
  if (locator) await locator.screenshot({ path: file });
  else await page.screenshot({ path: file, fullPage: false });
  console.log(`  capture ${file}`);
};

const studio = (page, id) => page.locator(`[data-studio="${id}"]`);
const toggleView = (page, id, title) => studio(page, id).getByRole('button', { name: title, exact: true }).click();

const SCENARIOS = {
  async projection() {
    console.log('Laboratoire A — projection');
    const { page, context, problems } = await newPage();
    await page.goto(`${base}/#/labo/projection`);
    await page.getByText('Le projeté n’est pas encore garanti').waitFor();
    check(!(await page.locator('[data-view="geometrie"]').innerText()).includes('PₖX'), 'sans preuve, le projeté n’est pas affiché');
    // Déplacer x au clavier et au pointeur.
    const x = page.getByRole('slider', { name: 'Point x à projeter' });
    const before = await x.getAttribute('aria-valuetext');
    await x.focus();
    for (let i = 0; i < 6; i++) await page.keyboard.press('ArrowLeft');
    check((await x.getAttribute('aria-valuetext')) !== before, 'x se déplace au clavier');
    const box = await x.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 + 60, box.y + box.height / 2 - 40, { steps: 5 });
    await page.mouse.up();
    check((await x.getAttribute('aria-valuetext')) !== before, 'x se déplace au pointeur');
    await shot(page, 'projection-1-depart');

    // Exploration libre : tout s'affiche, signalé comme non établi.
    await page.getByLabel(/Exploration libre/).check();
    await page.getByRole('button', { name: 'Ajouter un point z' }).click();
    check((await page.locator('[data-view="geometrie"]').innerText()).includes('PₖX'), 'exploration libre : le projeté s’affiche');
    const ip = await page.locator('[data-measure="ip0"]').innerText();
    check(ip.length > 0, `produit scalaire affiché (${ip.replace(/\s+/g, ' ')})`);
    await toggleView(page, 'projection', 'Hypothèses');
    check((await page.locator('[data-conclusion="existence"]').getAttribute('data-state')) === 'illustrative', 'en exploration libre, l’existence reste « illustrative »');
    await shot(page, 'projection-2-exploration');

    // Passage en dimension 3 : WebGL réel.
    await page.locator('[data-family="boule"]').click();
    const fallback = await page.locator('[data-testid="webgl-fallback"]').count();
    check(fallback === 0, 'WebGL disponible : vue 3D (pas d’alternative 2D)');
    await page.locator('[data-testid="canvas-3d"] canvas').waitFor({ timeout: 20000 });
    await page.waitForTimeout(800);
    const colors = await webglColors(page);
    check(colors > 8, `la toile WebGL est dessinée (${colors} couleurs distinctes échantillonnées)`);
    await shot(page, 'projection-3-boule-3d');
    // Caméra au clavier.
    await page.locator('[data-testid="canvas-3d"]').focus();
    for (const k of ['ArrowLeft', 'ArrowLeft', 'ArrowUp', '+', '+']) await page.keyboard.press(k);
    await page.waitForTimeout(300);
    await shot(page, 'projection-4-boule-camera', page.locator('[data-view="geometrie"]'));
    await page.getByRole('button', { name: 'Réinitialiser la caméra' }).click();
    // Coordonnées de x en 3D.
    const x1 = page.getByRole('group', { name: /Point x à projeter/ }).locator('input[type=range]').first();
    await x1.fill('3.5');
    await page.waitForTimeout(200);
    // Coupe plane, plan de ℝ³, droite affine.
    await toggleView(page, 'projection', 'Coupe plane');
    check((await page.locator('[data-testid="section-view"]').count()) > 0, 'vue « Coupe plane » affichée');
    await shot(page, 'projection-5-boule-coupe');
    await page.locator('[data-family="plan"]').click();
    // Au plus trois vues : la coupe a remplacé la plus ancienne ; on réaffiche la vue 3D.
    if ((await page.locator('[data-view="geometrie"]').count()) === 0) await toggleView(page, 'projection', 'Géométrie (espace)');
    await page.locator('[data-testid="canvas-3d"] canvas').waitFor({ timeout: 20000 });
    await page.waitForTimeout(600);
    check((await webglColors(page)) > 8, 'plan de ℝ³ rendu en WebGL');
    if ((await page.locator('[data-view="equations"]').count()) === 0) await toggleView(page, 'projection', 'Équations et mesures');
    check((await page.locator('[data-equation="carac"]').getAttribute('data-status')) === 'exact', 'plan (sous-espace affine) : égalité ⟨x − PₖX, z − PₖX⟩ = 0, statut exact');
    await shot(page, 'projection-6-plan');
    await page.locator('[data-family="droite-affine"]').click();
    await page.waitForTimeout(600);
    await shot(page, 'projection-7-droite-affine');

    // Démonstration animée.
    await page.locator('[data-family="disque"]').click();
    await toggleView(page, 'projection', 'Démonstration');
    const demo = page.locator('[data-view="demonstration"]');
    check(await demo.locator('[data-stage]').nth(3).isDisabled(), 'mode Preuve : l’étape 4 est verrouillée tant qu’elle n’est pas démontrée');
    await demo.getByRole('button', { name: 'Exploration', exact: true }).click();
    await demo.locator('[data-stage]').nth(3).click();
    check((await demo.getByTestId('stage-notice').innerText()).includes('Illustration disponible — preuve non encore établie.'), 'exploration : avertissement « Illustration disponible — preuve non encore établie »');
    await page.waitForTimeout(900);
    await shot(page, 'projection-8-demo-suite', demo);
    await demo.getByRole('button', { name: 'Étape suivante' }).click();
    await demo.getByRole('button', { name: 'Étape suivante' }).click();
    await demo.getByRole('button', { name: 'Étape suivante' }).click();
    await page.waitForTimeout(700);
    await shot(page, 'projection-9-demo-unicite', demo);
    await demo.getByRole('button', { name: 'Étape précédente' }).click();
    check((await demo.locator('[aria-current="step"]').innerText()).startsWith('6.'), 'retour à l’étape précédente');

    // Avec / sans hypothèse et échelle des dimensions.
    await toggleView(page, 'projection', 'Avec / sans hypothèse');
    await shot(page, 'projection-10-avec-sans', page.locator('[data-view="avec-sans"]'));
    await toggleView(page, 'projection', 'De ℝ à H');
    const ladder = page.locator('[data-testid="ladder"]');
    await ladder.getByRole('button', { name: 'Dimension suivante' }).click();
    await ladder.getByRole('button', { name: 'Dimension suivante' }).click();
    await page.waitForTimeout(1200);
    await shot(page, 'projection-11-echelle-r3', page.locator('[data-view="dimensions"]'));
    await ladder.getByRole('button', { name: 'Dimension suivante' }).click();
    check((await page.locator('[data-testid="ladder-hilbert"]').count()) === 1, 'échelle : étape « espace de Hilbert H » (énoncé, pas de figure fidèle)');
    // Plein écran d'une vue puis sortie au clavier.
    await page.getByRole('button', { name: 'Agrandir la vue De ℝ à H' }).click();
    await page.keyboard.press('Escape');
    // Explications.
    await page.getByRole('button', { name: 'Voir le lien avec la démonstration' }).click();
    await shot(page, 'projection-12-lien-preuve');

    // Aucune réussite enregistrée par ces manipulations.
    const progress = await page.evaluate(() => {
      const raw = Object.keys(localStorage).filter((k) => k.startsWith('prooflab:'));
      return raw;
    });
    console.log(`  préférences locales d’affichage : ${progress.join(', ') || 'aucune'}`);
    if (problems.length) console.log(`  Problèmes :\n    ${problems.join('\n    ')}`);
    check(problems.length === 0, 'aucune erreur de console ni ressource en échec');
    await context.close();
  },
};

SCENARIOS.riesz = async function riesz() {
  console.log('Laboratoire B — Riesz et Lax–Milgram');
  const { page, context, problems } = await newPage();
  await page.goto(`${base}/#/labo/riesz-lax-milgram`);
  await page.locator('[data-studio="riesz"]').waitFor();
  await page.getByRole('button', { name: 'Produit scalaire oblique' }).click();
  await shot(page, 'riesz-1-depart');
  await page.getByLabel('Déterminant de G').fill('7/4');
  await page.getByRole('button', { name: 'Vérifier' }).first().click();
  await page.getByRole('button', { name: 'Dimension finie : continue' }).click();
  await toggleView(page, 'riesz', 'Hypothèses');
  check((await page.locator('[data-conclusion="riesz"]').getAttribute('data-state')) === 'etablie', 'Riesz établi après Sylvester et continuité de ℓ');
  const geo = await page.locator('[data-view="geometrie"]').innerText();
  check(geo.includes('w/‖w‖'), 'point de tangence w/‖w‖_G affiché');
  // Déplacer v au clavier : ℓ(v) et ⟨v, w⟩_G restent égaux.
  if ((await page.locator('[data-view="equations"]').count()) === 0) await toggleView(page, 'riesz', 'Équations et mesures');
  await page.getByRole('slider', { name: 'Vecteur de test v' }).focus();
  for (let i = 0; i < 4; i++) await page.keyboard.press('ArrowUp');
  const lv = await page.locator('[data-measure="lv"] dd').innerText();
  const vw = await page.locator('[data-measure="vw"] dd').innerText();
  check(lv === vw, `ℓ(v) = ⟨v, w⟩_G après déplacement de v (${lv} = ${vw})`);
  await shot(page, 'riesz-2-etabli');
  await toggleView(page, 'riesz', 'Changement de base');
  await page.getByRole('button', { name: 'Lecture du changement de base' }).click();
  await page.waitForTimeout(2200);
  await shot(page, 'riesz-3-cholesky', page.locator('[data-view="transformation"]'));
  await page.getByRole('button', { name: 'Inversible, non coercive' }).click();
  await toggleView(page, 'riesz', 'Linéaire / quadratique');
  check((await page.locator('[data-nature]').getAttribute('data-nature')) === 'indefinie', 'forme quadratique indéfinie : hyperboles');
  await shot(page, 'riesz-4-formes', page.locator('[data-view="formes"]'));
  await page.getByRole('button', { name: 'ℝ³' }).click();
  if ((await page.locator('[data-view="geometrie"]').count()) === 0) await toggleView(page, 'riesz', 'Géométrie (espace)');
  await page.locator('[data-testid="canvas-3d"] canvas').waitFor({ timeout: 20000 });
  await page.waitForTimeout(700);
  const colors = await webglColors(page);
  check(colors > 8, `ellipsoïde et plans de niveau rendus en WebGL (${colors} couleurs)`);
  await shot(page, 'riesz-5-ellipsoide');
  await toggleView(page, 'riesz', 'Coupe par w');
  await shot(page, 'riesz-6-coupe', page.locator('[data-view="coupe"]'));
  if (problems.length) console.log(`  Problèmes :\n    ${problems.join('\n    ')}`);
  check(problems.length === 0, 'aucune erreur de console ni ressource en échec');
  await context.close();
};

SCENARIOS.sobolev = async function sobolev() {
  console.log('Laboratoire F — Sobolev et traces');
  const { page, context, problems } = await newPage();
  await page.goto(`${base}/#/labo/sobolev-trace`);
  await page.locator('[data-studio="sobolev"]').waitFor();
  await page.locator('[data-testid="canvas-3d"] canvas').waitFor({ timeout: 20000 });
  await page.waitForTimeout(800);
  const colors = await webglColors(page);
  check(colors > 8, `surface z = u(x, y) rendue en WebGL (${colors} couleurs)`);
  await shot(page, 'sobolev-1-surface-traces');
  await page.getByRole('slider', { name: /Ajouter t·u₀/ }).fill('0.8');
  await page.waitForTimeout(300);
  check(/écart maximal 0\./.test(await page.getByTestId('trace-view').innerText()), 'ajouter t·u₀ ∈ H¹₀ : trace inchangée');
  await shot(page, 'sobolev-2-perturbation');
  await page.locator('[data-example="singuliere"]').click();
  await page.getByRole('slider', { name: /Ajouter t·u₀/ }).fill('0');
  await page.waitForTimeout(600);
  await shot(page, 'sobolev-3-singuliere');
  await toggleView(page, 'sobolev', 'Niveaux');
  await toggleView(page, 'sobolev', 'Coupes et dérivées');
  await page.waitForTimeout(300);
  await shot(page, 'sobolev-4-niveaux-coupes');
  if (problems.length) console.log(`  Problèmes :\n    ${problems.join('\n    ')}`);
  check(problems.length === 0, 'aucune erreur de console ni ressource en échec');
  await context.close();
};

SCENARIOS.convergences = async function convergences() {
  console.log('Laboratoire C — modes de convergence');
  const { page, context, problems } = await newPage();
  await page.goto(`${base}/#/labo/convergences`);
  const sec = page.locator('[data-testid="modes-studio"]');
  await sec.scrollIntoViewIfNeeded();
  await page.getByRole('slider', { name: /Rang n/ }).fill('12');
  await shot(page, 'convergences-1-graphe-coupes', sec);
  await toggleView(page, 'convergences-modes', 'Cascade (n en profondeur)');
  await page.locator('[data-studio="convergences-modes"] [data-testid="canvas-3d"] canvas').waitFor({ timeout: 20000 });
  await page.waitForTimeout(700);
  const colors = await webglColors(page);
  check(colors > 8, `cascade 3D rendue en WebGL (${colors} couleurs)`);
  await shot(page, 'convergences-2-cascade', sec);
  await toggleView(page, 'convergences-modes', 'Quatre modes');
  await page.locator('[data-mode-row="machine"] [data-mode="pp"] button').click();
  check((await page.getByTestId('mode-why').innerText()).includes('infinité'), 'justification : machine à écrire, pas de convergence presque partout');
  await shot(page, 'convergences-3-tableau', sec);
  await page.getByRole('button', { name: 'Animer en n' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Pause' }).click();
  if (problems.length) console.log(`  Problèmes :\n    ${problems.join('\n    ')}`);
  check(problems.length === 0, 'aucune erreur de console ni ressource en échec');
  await context.close();
};

SCENARIOS.aubin = async function aubin() {
  console.log('Laboratoire D — Aubin–Lions');
  const { page, context, problems } = await newPage();
  await page.goto(`${base}/#/labo/compacite`);
  const sec = page.locator('[data-testid="al-studio"]');
  await sec.scrollIntoViewIfNeeded();
  check((await page.getByTestId('al-diagram').getAttribute('data-case')) === 'garantie', 'famille amortie : conclusion garantie par le théorème');
  await page.locator('[data-studio="aubin-lions"] [data-testid="canvas-3d"] canvas').waitFor({ timeout: 20000 });
  await page.waitForTimeout(700);
  check((await webglColors(page)) > 8, 'surface uₙ(t, x) rendue en WebGL');
  await shot(page, 'aubin-1-diagramme-surface', sec);
  await page.locator('[data-remove="temporal"]').click();
  await toggleView(page, 'aubin-lions', 'Avec / sans hypothèse');
  check((await page.locator('[data-al-card="fausse"]').getAttribute('data-case')) === 'fausse', 'borne temporelle retirée : contre-exemple, conclusion fausse');
  check((await page.locator('[data-al-card="non-garantie"]').getAttribute('data-case')) === 'non-garantie', 'borne temporelle retirée : exemple, conclusion vraie mais non garantie');
  await shot(page, 'aubin-2-avec-sans', sec);
  await toggleView(page, 'aubin-lions', 'Translations en temps');
  await page.waitForTimeout(300);
  await shot(page, 'aubin-3-translations', page.locator('[data-view="translations"]'));
  if (problems.length) console.log(`  Problèmes :\n    ${problems.join('\n    ')}`);
  check(problems.length === 0, 'aucune erreur de console ni ressource en échec');
  await context.close();
};

SCENARIOS.galerkin = async function galerkin() {
  console.log('Laboratoire E — Galerkin en dimension 2');
  const { page, context, problems } = await newPage();
  await page.goto(`${base}/#/labo/galerkin`);
  const sec = page.locator('[data-testid="g2-studio"]');
  await sec.scrollIntoViewIfNeeded();
  await page.locator('[data-studio="galerkin-2d"] [data-testid="canvas-3d"] canvas').waitFor({ timeout: 20000 });
  await page.waitForTimeout(700);
  check((await webglColors(page)) > 8, 'surface uₙ(t, x, y) rendue en WebGL');
  await shot(page, 'galerkin-1-surface', sec);
  await page.getByRole('slider', { name: /Nombre de modes n/ }).fill('1');
  await page.waitForTimeout(400);
  await shot(page, 'galerkin-2-un-mode', sec);
  await page.getByRole('button', { name: 'Animer en t' }).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Pause' }).click();
  await toggleView(page, 'galerkin-2d', 'Comparer n et n′');
  await toggleView(page, 'galerkin-2d', 'Statut');
  check((await page.getByTestId('g2-status').getAttribute('data-proof')) === 'non-demontree', 'statut : exploration, non démontrée');
  await shot(page, 'galerkin-3-comparaison', sec);
  if (problems.length) console.log(`  Problèmes :\n    ${problems.join('\n    ')}`);
  check(problems.length === 0, 'aucune erreur de console ni ressource en échec');
  await context.close();
};

SCENARIOS.lie = async function lie() {
  console.log('Laboratoire G — groupes de Lie');
  const { page, context, problems } = await newPage();
  const tab = (name) => page.getByRole('tab', { name, exact: true }).click();
  await page.goto(`${base}/#/labo/groupes-lie`);
  await page.locator('[data-measure="end"]').waitFor();
  check((await page.locator('[data-measure="end"]').innerText()).includes('2,25'), 'commutateur : C_{1/2}(1,2) = (1 ; 2,25)');
  const p = page.getByRole('slider', { name: 'Point p' });
  const before = await page.locator('[data-measure="end"]').innerText();
  await p.focus();
  for (let i = 0; i < 4; i++) await page.keyboard.press('ArrowRight');
  check((await page.locator('[data-measure="end"]').innerText()) !== before, 'p se déplace au clavier et la lecture suit');
  await shot(page, 'lie-1-commutateur');
  await page.locator('[data-pair="non-lineaire"]').click();
  await page.getByRole('slider', { name: /Temps t/ }).fill('0.8');
  await toggleView(page, 'lie-commutateur', 'Ordre du reste');
  await shot(page, 'lie-2-commutateur-non-lineaire');

  await tab('Exponentielle');
  await page.locator('[data-preset="spirale"]').click();
  await page.getByRole('slider', { name: 's' }).fill('-3');
  await toggleView(page, 'lie-exponentielle', 'Trace de l’exponentielle');
  await shot(page, 'lie-3-exponentielle-spirale');

  await tab('Rodrigues');
  await page.locator('[data-testid="canvas-3d"] canvas').waitFor({ timeout: 20000 });
  await page.waitForTimeout(800);
  const c1 = await webglColors(page);
  check(c1 > 8, `Rodrigues : toile WebGL dessinée (${c1} couleurs)`);
  await page.locator('[data-axis="oblique"]').click();
  await page.waitForTimeout(400);
  await shot(page, 'lie-4-rodrigues-3d');

  await tab('Revêtement SU(2) → SO(3)');
  await page.getByTestId('lire-lacet').click();
  await page.waitForTimeout(2500);
  await shot(page, 'lie-5-revetement-animation');
  await page.getByRole('button', { name: 'Aller au bout' }).click();
  check((await page.getByTestId('verdict-revetement').innerText()).includes('−1'), 'un tour : relevé en −1');
  await page.locator('[data-turns="2"]').click();
  await page.getByRole('button', { name: 'Aller au bout' }).click();
  check((await page.getByTestId('verdict-revetement').innerText()).includes('revient en 1'), 'deux tours : relevé en 1');
  await shot(page, 'lie-6-revetement-deux-tours');

  await tab('Orbites');
  await page.locator('[data-testid="canvas-3d"] canvas').waitFor({ timeout: 20000 });
  await page.waitForTimeout(800);
  check((await webglColors(page)) > 8, 'orbites : sphère rendue en WebGL');
  await shot(page, 'lie-7-orbites-sphere');
  await page.locator('[data-action="conjugaison"]').click();
  await page.waitForTimeout(800);
  await shot(page, 'lie-8-orbites-hyperboloide');
  await page.getByRole('button', { name: 'Égaliser λ₂ = λ₁' }).click();
  await page.waitForTimeout(800);
  check((await page.locator('[data-measure="dimOrbit"]').innerText()).includes('0'), 'λ₁ = λ₂ : orbite de dimension 0');
  await shot(page, 'lie-9-orbites-cone');
  await page.locator('[data-action="tore"]').click();
  await page.getByRole('slider', { name: /Durée T/ }).fill('400');
  await shot(page, 'lie-10-orbites-tore');

  await tab('Intégration symplectique');
  await page.locator('[data-system="pendule"]').click();
  await page.getByRole('slider', { name: /Nombre de pas N/ }).fill('120');
  await page.getByRole('slider', { name: /Pas h/ }).fill('0.3');
  await page.locator('[data-toggle="verlet"]').check();
  await shot(page, 'lie-11-symplectique-pendule');
  if (problems.length) console.log(`  Problèmes :\n    ${problems.join('\n    ')}`);
  check(problems.length === 0, 'aucune erreur de console ni ressource en échec');
  await context.close();

  // Thème clair : lisibilité des couleurs de la palette.
  const light = await newPage('light');
  await light.page.goto(`${base}/#/labo/groupes-lie?scene=symplectique`);
  await light.page.getByTestId('tableau-aires').waitFor();
  await shot(light.page, 'lie-12-symplectique-clair');
  await light.page.goto(`${base}/#/labo/groupes-lie?scene=revetement`);
  await light.page.getByTestId('verdict-revetement').waitFor();
  await shot(light.page, 'lie-13-revetement-clair');
  check(light.problems.length === 0, 'thème clair : aucune erreur');
  await light.context.close();
};

SCENARIOS.atlas = async function atlas() {
  console.log('Atlas visuel');
  const { page, context, problems } = await newPage();
  await page.goto(`${base}/#/atlas`);
  await page.locator('[data-plate]').first().waitFor();
  check((await page.locator('[data-plate]').count()) === 90, '90 planches dans la grille');
  await page.waitForTimeout(800);
  await shot(page, 'atlas-1-grille');
  await page.getByRole('searchbox', { name: 'Chercher dans les planches' }).fill('exponentielle');
  await page.waitForTimeout(500);
  await shot(page, 'atlas-2-recherche');
  await page.goto(`${base}/#/atlas/31`);
  // Vue par défaut : la figure interactive ; la planche originale est le second onglet.
  await page.locator('[data-plate-scene="31"]').waitFor({ timeout: 20000 });
  check((await page.locator('[data-vue="interactive"]').getAttribute('aria-selected')) === 'true', 'figure interactive affichée par défaut');
  await page.waitForTimeout(600);
  await shot(page, 'atlas-3a-figure-interactive');
  await page.locator('[data-vue="original"]').click();
  await page.getByTestId('planche-image').waitFor();
  await page.waitForTimeout(800);
  const w = await page.getByTestId('planche-image').evaluate((img) => img.naturalWidth);
  check(w > 1600, `image pleine servie (${w} px de large)`);
  await shot(page, 'atlas-3-planche-masquee');
  await page.getByTestId('reveler').click();
  await shot(page, 'atlas-4-planche-revelee');
  await page.goto(`${base}/#/theoreme/flot-hamiltonien`);
  await page.getByTestId('atlas-planches').waitFor();
  await page.waitForTimeout(600);
  await shot(page, 'atlas-5-fiche-theoreme', page.getByTestId('atlas-planches'));
  await page.goto(`${base}/#/carte`);
  await page.getByRole('heading', { name: 'Parcours : Géométrie de Lie' }).scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await shot(page, 'atlas-6-carte-lie');
  if (problems.length) console.log(`  Problèmes :\n    ${problems.join('\n    ')}`);
  check(problems.length === 0, 'aucune erreur de console ni ressource en échec');
  await context.close();

  const phone = await newPage('light', { width: 390, height: 844 });
  await phone.page.goto(`${base}/#/atlas/36`);
  await phone.page.locator('[data-plate-scene="36"]').waitFor({ timeout: 20000 });
  await phone.page.waitForTimeout(800);
  const overflowFig = await phone.page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  check(overflowFig <= 1, `téléphone, figure interactive : pas de défilement horizontal (${overflowFig} px)`);
  await shot(phone.page, 'atlas-7-telephone-figure');
  await phone.page.locator('[data-vue="original"]').click();
  await phone.page.getByTestId('planche-image').waitFor();
  await phone.page.waitForTimeout(800);
  const overflow = await phone.page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  check(overflow <= 1, `téléphone, planche originale : pas de défilement horizontal (${overflow} px)`);
  await shot(phone.page, 'atlas-8-telephone-originale');
  await phone.context.close();
};

for (const [name, run] of Object.entries(SCENARIOS)) {
  if (only.length && !only.includes(name)) continue;
  try {
    await run();
  } catch (e) {
    failures.push(`${name} : ${e.message}`);
    console.log(`  ✗ ${name} interrompu : ${e.message}`);
  }
}
await browser.close();
console.log(failures.length ? `\n${failures.length} échec(s) :\n- ${failures.join('\n- ')}` : '\nToutes les vérifications ont réussi.');
process.exit(failures.length ? 1 : 0);
