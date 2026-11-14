import { expect, test, type Page } from '@playwright/test';

/**
 * Visual Reasoning Engine 2.0 : un scénario par laboratoire, dans un vrai Chrome
 * (WebGL logiciel). On vérifie des invariants mathématiques affichés, la synchronisation
 * des vues, le rendu WebGL effectif et l'absence d'erreur de console.
 */
function watchErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`exception : ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`console : ${m.text()}`);
  });
  page.on('response', (r) => {
    if (r.status() >= 400) errors.push(`ressource ${r.status()} : ${r.url()}`);
  });
  return errors;
}

/** Couleurs distinctes échantillonnées sur la toile WebGL : > 8 si une scène est dessinée. */
async function webglColors(page: Page): Promise<number> {
  return page.evaluate(() => {
    const c = document.querySelector('[data-testid="canvas-3d"] canvas') as HTMLCanvasElement | null;
    if (!c) return -1;
    const copy = document.createElement('canvas');
    copy.width = c.width;
    copy.height = c.height;
    const ctx = copy.getContext('2d')!;
    ctx.drawImage(c, 0, 0);
    const data = ctx.getImageData(0, 0, copy.width, copy.height).data;
    const seen = new Set<string>();
    for (let i = 0; i < data.length; i += 4 * 97) seen.add(`${data[i]},${data[i + 1]},${data[i + 2]}`);
    return seen.size;
  });
}

const studio = (page: Page, id: string) => page.locator(`[data-studio="${id}"]`);
const toggleView = (page: Page, id: string, title: string) => studio(page, id).getByRole('button', { name: title, exact: true }).click();

test('projection : du demi-plan à la boule de ℝ³, vues synchronisées, démonstration animée', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/#/labo/projection');
  await expect(page.getByText('Le projeté n’est pas encore garanti')).toBeVisible();
  await expect(page.locator('[data-view="geometrie"]')).not.toContainText('PₖX');

  // Exploration libre : le projeté et les produits scalaires apparaissent, signalés illustratifs.
  await page.getByLabel(/Exploration libre/).check();
  await expect(page.locator('[data-measure="ip0"]')).toBeVisible();
  await expect(page.locator('[data-equation="carac"]')).toHaveAttribute('data-status', 'illustratif');

  // Boule fermée de ℝ³ : rendu WebGL effectif, caméra au clavier.
  await page.locator('[data-family="boule"]').click();
  await expect(page.locator('[data-testid="canvas-3d"] canvas')).toBeVisible({ timeout: 20_000 });
  await expect(page.locator('[data-testid="webgl-fallback"]')).toHaveCount(0);
  await page.waitForTimeout(500);
  expect(await webglColors(page)).toBeGreaterThan(8);
  await page.locator('[data-testid="canvas-3d"]').focus();
  for (const k of ['ArrowLeft', 'ArrowUp', '+', 'r']) await page.keyboard.press(k);

  // Plan de ℝ³ : l'inégalité caractéristique devient une égalité exacte.
  await page.locator('[data-family="plan"]').click();
  await expect(page.locator('[data-equation="carac"]')).toHaveAttribute('data-status', 'exact');
  await expect(page.locator('[data-measure="ip0"] dd')).toHaveText('0');

  // Démonstration : en mode Preuve, l'étape 4 est verrouillée ; en Exploration, avertissement.
  await toggleView(page, 'projection', 'Démonstration');
  const demo = page.locator('[data-view="demonstration"]');
  await expect(demo.locator('[data-stage]')).toHaveCount(8);
  await expect(demo.locator('[data-stage]').nth(3)).toBeDisabled();
  await demo.getByRole('button', { name: 'Exploration', exact: true }).click();
  await demo.locator('[data-stage]').nth(3).click();
  await expect(demo.getByTestId('stage-notice')).toContainText('Illustration disponible — preuve non encore établie.');
  await demo.getByRole('button', { name: 'Étape suivante' }).click();
  await demo.getByRole('button', { name: 'Étape précédente' }).click();
  await expect(demo.locator('[aria-current="step"]')).toContainText('4. Suite minimisante');

  // Avec / sans hypothèse : verdict exact sur le même point x.
  await toggleView(page, 'projection', 'Avec / sans hypothèse');
  await expect(page.locator('[data-compare="sans"] [data-verdict]')).toHaveAttribute('data-verdict', /non-atteint|unique|non-unique/);
  expect(errors).toEqual([]);
});

test('Riesz et Lax–Milgram : établir les hypothèses, tangence en w/‖w‖, ellipsoïde en ℝ³', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/#/labo/riesz-lax-milgram');
  await page.getByRole('button', { name: 'Produit scalaire oblique' }).click();
  await page.getByLabel('Déterminant de G').fill('7/4');
  await page.getByRole('button', { name: 'Vérifier' }).first().click();
  await page.getByRole('button', { name: 'Dimension finie : continue' }).click();
  await toggleView(page, 'riesz', 'Hypothèses');
  await expect(page.locator('[data-conclusion="riesz"]')).toHaveAttribute('data-state', 'etablie');
  await expect(page.locator('[data-view="geometrie"]')).toContainText('w/‖w‖');
  await page.getByRole('button', { name: 'Forme dégénérée' }).click();
  await expect(page.locator('[data-conclusion="lm"]')).toHaveAttribute('data-state', 'fausse');
  await page.getByRole('button', { name: 'ℝ³' }).click();
  if ((await page.locator('[data-view="geometrie"]').count()) === 0) await toggleView(page, 'riesz', 'Géométrie (espace)');
  await expect(page.locator('[data-testid="canvas-3d"] canvas')).toBeVisible({ timeout: 20_000 });
  await page.waitForTimeout(500);
  expect(await webglColors(page)).toBeGreaterThan(8);
  expect(errors).toEqual([]);
});

test('Convergences : quatre modes, cascade 3D, justification de chaque verdict', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/#/labo/convergences');
  await page.getByTestId('modes-studio').scrollIntoViewIfNeeded();
  await toggleView(page, 'convergences-modes', 'Quatre modes');
  await page.locator('[data-mode-row="machine"] [data-mode="pp"] button').click();
  await expect(page.getByTestId('mode-why')).toContainText('infinité');
  await expect(page.locator('[data-mode-row="pic-n"] [data-mode="faible"]')).toHaveAttribute('data-holds', 'false');
  await toggleView(page, 'convergences-modes', 'Cascade (n en profondeur)');
  await expect(page.locator('[data-studio="convergences-modes"] [data-testid="canvas-3d"] canvas')).toBeVisible({ timeout: 20_000 });
  expect(errors).toEqual([]);
});

test('Aubin–Lions : retirer une hypothèse sépare conclusion fausse et conclusion non garantie', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/#/labo/compacite');
  await page.getByTestId('al-studio').scrollIntoViewIfNeeded();
  await expect(page.getByTestId('al-diagram')).toHaveAttribute('data-case', 'garantie');
  await page.locator('[data-remove="spatial"]').click();
  await toggleView(page, 'aubin-lions', 'Avec / sans hypothèse');
  await expect(page.locator('[data-al-card="fausse"]')).toHaveAttribute('data-case', 'fausse');
  await expect(page.locator('[data-al-card="non-garantie"]')).toHaveAttribute('data-case', 'non-garantie');
  expect(errors).toEqual([]);
});

test('Galerkin 2D : surface uₙ, statut d’exploration non démontré', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/#/labo/galerkin');
  await page.getByTestId('g2-studio').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-studio="galerkin-2d"] [data-testid="canvas-3d"] canvas')).toBeVisible({ timeout: 20_000 });
  await page.getByRole('slider', { name: /Nombre de modes n/ }).fill('9');
  await toggleView(page, 'galerkin-2d', 'Statut');
  await expect(page.getByTestId('g2-status')).toHaveAttribute('data-proof', 'non-demontree');
  await expect(page.getByTestId('g2-chain')).toBeVisible();
  expect(errors).toEqual([]);
});

test('Sobolev et traces : surface, trace invariante par ajout d’un élément de H¹₀', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/#/labo/sobolev-trace');
  await expect(page.locator('[data-testid="canvas-3d"] canvas')).toBeVisible({ timeout: 20_000 });
  await page.waitForTimeout(500);
  expect(await webglColors(page)).toBeGreaterThan(8);
  await page.getByRole('slider', { name: /Ajouter t·u₀/ }).fill('0.6');
  await expect(page.getByTestId('trace-view')).toContainText('écart maximal 0.');
  await page.locator('[data-example="singuliere"]').click();
  await toggleView(page, 'sobolev', 'Comparer');
  await expect(page.locator('[data-testid="sobolev-compare"] [data-example="singuliere"]')).toContainText('non');
  expect(errors).toEqual([]);
});
