/**
 * Vérification en navigateur réel des planches interactives de l'atlas.
 * Usage : node scripts/verify-atlas-interactif.mjs <url-de-base> <dossier-de-sortie> [n ou a-b ...]
 * Pour chaque planche : figure interactive affichée, aucune erreur de console ni
 * avertissement de géométrie (NaN), rendu WebGL effectif pour chaque toile 3D, manipulation
 * d'un réglage (curseur ou bouton « Animer »), captures avant et après, et absence de
 * défilement horizontal. Option `--telephone` : même contrôle sur un écran de 390 × 844.
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const argv = process.argv.slice(2);
const phone = argv.includes('--telephone');
const [base = 'http://127.0.0.1:5173', out = 'captures-atlas', ...specs] = argv.filter((a) => a !== '--telephone');
mkdirSync(out, { recursive: true });
const plates = specs.length
  ? specs.flatMap((s) => {
      const [a, b] = s.split('-').map(Number);
      return Array.from({ length: (b ?? a) - a + 1 }, (_, i) => a + i);
    })
  : Array.from({ length: 90 }, (_, i) => i + 1);

const browser = await chromium.launch({ channel: 'chrome', args: ['--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const context = await browser.newContext({ viewport: phone ? { width: 390, height: 844 } : { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
const page = await context.newPage();
let problems = [];
page.on('console', (m) => {
  const t = m.text();
  if (m.type() === 'error' || (m.type() === 'warning' && /NaN|THREE|WebGL|Maximum update depth/i.test(t))) problems.push(`[${m.type()}] ${t.slice(0, 300)}`);
});
page.on('pageerror', (e) => problems.push(`[exception] ${e.message}`));
page.on('response', (r) => {
  if (r.status() >= 400) problems.push(`[${r.status()}] ${r.url()}`);
});

async function canvasColors() {
  return page.evaluate(() =>
    [...document.querySelectorAll('[data-testid="canvas-3d"] canvas')].map((c) => {
      const copy = document.createElement('canvas');
      copy.width = c.width;
      copy.height = c.height;
      const ctx = copy.getContext('2d');
      ctx.drawImage(c, 0, 0);
      const data = ctx.getImageData(0, 0, copy.width, copy.height).data;
      const seen = new Set();
      for (let i = 0; i < data.length; i += 4 * 97) seen.add(`${data[i]},${data[i + 1]},${data[i + 2]}`);
      return seen.size;
    }),
  );
}

const failures = [];
await page.goto(`${base}/#/reglages`);
await page.waitForSelector('main');
for (const n of plates) {
  problems = [];
  const tag = `planche ${String(n).padStart(2, '0')}`;
  try {
    await page.goto(`${base}/#/atlas/${n}`);
    const scene = page.locator(`[data-plate-scene="${n}"]`);
    await scene.waitFor({ timeout: 20000 });
    await page.waitForTimeout(700);
    const colors = await canvasColors();
    const flat = colors.filter((c) => c <= 2).length;
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 1) problems.push(`[mise en page] défilement horizontal de ${overflow} px`);
    const suffix = phone ? '-tel' : '';
    await scene.screenshot({ path: join(out, `p${String(n).padStart(2, '0')}${suffix}-a.png`) });
    // Manipulation : premier curseur au trois quarts, ou bouton « Animer ».
    const range = scene.locator('input[type=range]').first();
    if (await range.count()) {
      const min = Number(await range.getAttribute('min'));
      const max = Number(await range.getAttribute('max'));
      await range.fill(String(min + 0.75 * (max - min)));
    }
    const play = scene.getByTestId('animer').first();
    if (await play.count()) {
      await play.click();
      await page.waitForTimeout(1500);
    }
    await page.waitForTimeout(400);
    await scene.screenshot({ path: join(out, `p${String(n).padStart(2, '0')}${suffix}-b.png`) });
    const observations = await scene.locator('[data-observation]').count();
    const ok = problems.length === 0 && flat === 0 && observations > 0;
    console.log(`${ok ? '✓' : '✗'} ${tag} : ${colors.length} toile(s) 3D${colors.length ? ` (${colors.join(', ')} couleurs)` : ''}, ${observations} observation(s)${problems.length ? `\n    ${problems.join('\n    ')}` : ''}`);
    if (!ok) failures.push(tag);
  } catch (e) {
    console.log(`✗ ${tag} interrompue : ${e.message.split('\n')[0]}`);
    failures.push(tag);
  }
}
await browser.close();
console.log(failures.length ? `\n${failures.length} échec(s) : ${failures.join(', ')}` : `\n${plates.length} planche(s) vérifiée(s), aucune erreur.`);
process.exit(failures.length ? 1 : 0);
