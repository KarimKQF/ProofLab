/**
 * Captures d'écran de contrôle visuel, avec le Chrome installé sur la machine.
 * Usage : node scripts/capture.mjs <url-de-base> <dossier-de-sortie> [route ...]
 * Exemple : node scripts/capture.mjs http://127.0.0.1:5173 captures / /carte
 * Chaque route est capturée en thème sombre et clair, en 1440×900 et en tablette 834×1112.
 * Les erreurs de console et les requêtes en échec sont listées.
 */
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const [base = 'http://127.0.0.1:5173', out = 'captures', ...routes] = process.argv.slice(2);
const list = routes.length ? routes : ['/'];
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome' });
const viewports = [
  { name: 'bureau', width: 1440, height: 900 },
  { name: 'tablette', width: 834, height: 1112 },
];
const themes = (process.env.THEMES ?? 'dark').split(',');

for (const theme of themes) {
  for (const vp of viewports.filter((v) => (process.env.VIEWPORTS ?? 'bureau').split(',').includes(v.name))) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const problems = [];
    page.on('console', (m) => {
      if (m.type() === 'error' || m.type() === 'warning') problems.push(`[${m.type()}] ${m.text()}`);
    });
    page.on('pageerror', (e) => problems.push(`[exception] ${e.message}`));
    page.on('requestfailed', (r) => problems.push(`[requête] ${r.url()} ${r.failure()?.errorText ?? ''}`));
    page.on('response', (r) => {
      if (r.status() >= 400) problems.push(`[${r.status()}] ${r.url()}`);
    });

    await page.goto(`${base}/#/reglages`);
    await page.waitForSelector('main');
    if (theme === 'light') await page.getByRole('button', { name: 'Clair' }).click();
    else await page.getByRole('button', { name: 'Sombre' }).click();

    for (const route of list) {
      await page.goto(`${base}/#${route}`);
      await page.waitForLoadState('networkidle');
      await page.waitForFunction(() => !document.body.innerText.includes('Chargement'), null, { timeout: 15000 }).catch(() => undefined);
      await page.waitForTimeout(600);
      const safe = route.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '') || 'accueil';
      const file = join(out, `${safe}-${theme}-${vp.name}.png`);
      await page.screenshot({ path: file, fullPage: process.env.FULL === '1' });
      console.log('capture', file);
    }
    if (problems.length) console.log(`Problèmes (${theme}, ${vp.name}) :\n  ${problems.join('\n  ')}`);
    else console.log(`Aucune erreur de console (${theme}, ${vp.name}).`);
    await context.close();
  }
}
await browser.close();
