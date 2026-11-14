import { expect, test, type Page } from '@playwright/test';

/**
 * Atlas visuel interactif dans un vrai Chrome : chacune des 90 planches affiche sa figure
 * (2D ou 3D), sans repli ni erreur ; les toiles 3D sont réellement dessinées ; les onglets
 * « Figure interactive » / « Planche originale » et la préférence conservée ; un geste coche
 * une observation ; les flèches du clavier dans un curseur ne changent pas de planche.
 */
function watchErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`exception : ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`console : ${m.text()}`);
    if (m.type() === 'warning' && /NaN|THREE|WebGL|Maximum update depth/.test(m.text())) errors.push(`avertissement : ${m.text()}`);
  });
  page.on('response', (r) => {
    if (r.status() >= 400) errors.push(`ressource ${r.status()} : ${r.url()}`);
  });
  return errors;
}

/** Nombre de couleurs distinctes de chaque toile 3D de la page. */
async function canvasColors(page: Page): Promise<number[]> {
  return page.evaluate(() =>
    Array.from(document.querySelectorAll<HTMLCanvasElement>('[data-testid="canvas-3d"] canvas')).map((c) => {
      const copy = document.createElement('canvas');
      copy.width = c.width;
      copy.height = c.height;
      const ctx = copy.getContext('2d')!;
      ctx.drawImage(c, 0, 0);
      const data = ctx.getImageData(0, 0, copy.width, copy.height).data;
      const seen = new Set<string>();
      for (let i = 0; i < data.length; i += 4 * 61) seen.add(`${data[i]},${data[i + 1]},${data[i + 2]}`);
      return seen.size;
    }),
  );
}

const BLOCKS = Array.from({ length: 9 }, (_, b) => Array.from({ length: 10 }, (_, k) => 10 * b + k + 1));

for (const block of BLOCKS) {
  test(`planches ${block[0]} à ${block[block.length - 1]} : figure interactive, observations, rendu 3D`, async ({ page }) => {
    test.setTimeout(180_000);
    const errors = watchErrors(page);
    for (const n of block) {
      await page.goto(`/#/atlas/${n}`);
      const scene = page.locator(`[data-plate-scene="${n}"]`);
      await expect(scene, `planche ${n}`).toBeVisible({ timeout: 20_000 });
      await expect(page.getByTestId('figure-en-echec')).toHaveCount(0);
      await expect(page.locator('[data-vue="interactive"]')).toHaveAttribute('aria-selected', 'true');
      expect(await scene.locator('[data-observation]').count(), `observations de la planche ${n}`).toBeGreaterThanOrEqual(2);
      expect(await scene.locator('[data-panel]').count(), `vignettes de la planche ${n}`).toBeGreaterThanOrEqual(1);
      const canvases = page.locator('[data-testid="canvas-3d"] canvas');
      const count = await canvases.count();
      if (count > 0) {
        await expect(page.locator('[data-testid="webgl-fallback"]')).toHaveCount(0);
        await page.waitForTimeout(700);
        const colors = await canvasColors(page);
        for (const c of colors) expect(c, `toile 3D de la planche ${n}`).toBeGreaterThan(2);
      }
      expect(await scene.innerHTML(), `planche ${n}`).not.toMatch(/NaN|Infinity/);
    }
    expect(errors).toEqual([]);
  });
}

test('onglets : planche originale avec réponse masquée, préférence conservée', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/#/atlas/12');
  await expect(page.locator('[data-plate-scene="12"]')).toBeVisible({ timeout: 20_000 });
  await page.locator('[data-vue="original"]').click();
  await expect(page.getByTestId('planche-image')).toBeVisible();
  await expect(page.getByTestId('cache-reponse')).toBeVisible();
  await expect(page.locator('[data-plate-scene]')).toHaveCount(0);
  await page.reload();
  await expect(page.locator('[data-vue="original"]')).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByTestId('planche-image')).toBeVisible();
  await page.locator('[data-vue="interactive"]').click();
  await expect(page.locator('[data-plate-scene="12"]')).toBeVisible({ timeout: 20_000 });
  expect(errors).toEqual([]);
});

test('geste guidé : un curseur coche l’observation, les flèches restent dans la figure', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/#/atlas/81');
  const scene = page.locator('[data-plate-scene="81"]');
  await expect(scene).toBeVisible({ timeout: 20_000 });
  const obs = scene.locator('[data-observation="rayon"]');
  await expect(obs).toHaveAttribute('data-done', 'false');
  const slider = page.getByRole('slider', { name: /Rayon R/ });
  await slider.fill('0.45');
  await expect(obs).toHaveAttribute('data-done', 'true');
  await expect(scene.locator('[data-reading]').first()).toContainText('12,5664');
  // Les flèches déplacent le curseur, pas la planche.
  await slider.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page).toHaveURL(/#\/atlas\/81$/);
  // Une observation cochée le reste quand on revient en arrière (geste acquis).
  await slider.fill('0.9');
  await expect(obs).toHaveAttribute('data-done', 'true');

  // Planche 73 : faire le tour du cercle au clavier fait gagner 2π à la primitive.
  await page.goto('/#/atlas/73');
  const s73 = page.locator('[data-plate-scene="73"]');
  await expect(s73).toBeVisible({ timeout: 20_000 });
  const point = page.getByRole('slider', { name: 'Point du cercle' });
  await point.focus();
  for (let i = 0; i < 74; i++) await page.keyboard.press('ArrowRight');
  await expect(s73.locator('[data-observation="tour"]')).toHaveAttribute('data-done', 'true');
  await expect(page).toHaveURL(/#\/atlas\/73$/);
  expect(errors).toEqual([]);
});
