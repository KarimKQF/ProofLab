import { expect, test, type Page } from '@playwright/test';

/**
 * Parcours « Géométrie de Lie » dans un vrai Chrome : carte, fiche, preuve complète d'un
 * exercice, Atlas visuel (images servies, réponse masquée, renvois), laboratoire G (scènes,
 * rendu WebGL effectif, verdicts). Aucune erreur de console ni ressource manquante.
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

/** Ces scénarios pilotent la vue « Graphe des dépendances » de l'atelier de preuve. */
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    try {
      localStorage.setItem('prooflab:preuve:vue', 'graphe');
    } catch {
      /* stockage indisponible */
    }
  });
});

type Step = { node: string; premises: string[]; by: string; check?: string[] };

/** Chemin complet de l'exercice « crochet-lie.facile ». */
const CROCHET_FACILE: Step[] = [
  { node: 'crochet', premises: ['h-champs', 'd-crochet'], by: 'j-coord', check: ['0', '1'] },
  { node: 'flots', premises: ['h-champs'], by: 'j-flots' },
  { node: 'compo', premises: ['flots'], by: 'j-compo' },
  { node: 'num', premises: ['compo'], by: 'j-num', check: ['1', '9/4'] },
  { node: 'compar', premises: ['compo', 'crochet'], by: 'j-compar' },
  { node: 'fin', premises: ['crochet', 'compo', 'num', 'compar'], by: 'j-syn' },
];

async function playStep(page: Page, s: Step) {
  await page.getByTestId(`bank-${s.node}`).click();
  if (s.check) {
    const inspector = page.getByTestId('inspector');
    const inputs = inspector.getByRole('textbox', { name: /Composante/ });
    for (let i = 0; i < s.check.length; i++) await inputs.nth(i).fill(s.check[i]!);
    await inspector.getByRole('button', { name: 'Vérifier le calcul' }).click();
    await expect(page.getByTestId('check-passed')).toBeVisible();
  }
  for (const p of s.premises) await page.getByTestId(`premise-${p}`).check();
  await page.getByTestId(`just-${s.by}`).check();
  await page.getByTestId('verify-step').click();
  await expect(page.locator(`[data-node="${s.node}"]`)).toHaveAttribute('data-status', 'demontre');
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'ProofLab' })).toBeVisible();
});

test('parcours Lie : carte, fiche reliée à l’atlas, preuve complète du crochet de Lie', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/#/carte');
  await expect(page.getByRole('heading', { name: 'Parcours : Géométrie de Lie' })).toBeVisible();
  await expect(page.locator('[data-theorem="flot-hamiltonien"]')).toHaveCount(1);
  await page.locator('[data-theorem="crochet-lie"]').click();
  await expect(page.getByRole('heading', { name: 'Crochet de Lie et commutateur de flots' })).toBeVisible();
  await expect(page.getByText(/Cours de géométrie de Lie, section 7\.1–7\.2/)).toBeVisible();
  await expect(page.getByTestId('atlas-planches').locator('a')).toHaveCount(2);
  await expect(page.getByRole('link', { name: 'Ouvrir le laboratoire' })).toHaveAttribute('href', '#/labo/groupes-lie?scene=commutateur');

  await page.getByRole('link', { name: 'Construire la preuve' }).first().click();
  for (const s of CROCHET_FACILE) await playStep(page, s);
  await expect(page.getByText('Preuve validée.')).toBeVisible();
  expect(errors).toEqual([]);
});

test('Atlas visuel : 90 planches servies, filtre, réponse masquée, renvoi vers le laboratoire', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/#/atlas');
  await expect(page.locator('[data-plate]')).toHaveCount(90);
  const firstThumb = page.locator('[data-plate="1"] img');
  await expect(firstThumb).toBeVisible();
  await expect.poll(() => firstThumb.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBe(480);
  await page.locator('[data-part="VII"]').click();
  await expect(page.locator('[data-plate]')).toHaveCount(5);

  await page.goto('/#/atlas/36');
  // La figure interactive est la vue par défaut ; la planche originale est le second onglet.
  await expect(page.locator('[data-plate-scene="36"]')).toBeVisible({ timeout: 20_000 });
  await page.locator('[data-vue="original"]').click();
  const image = page.getByTestId('planche-image');
  await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(1600);
  await expect(page.getByTestId('cache-reponse')).toBeVisible();
  await page.getByTestId('reveler').click();
  await expect(page.getByTestId('reponse')).toBeVisible();
  await expect(page.getByTestId('cache-reponse')).toHaveCount(0);

  await page.getByRole('link', { name: /Laboratoire G · Revêtement/ }).click();
  await expect(page.getByRole('tab', { name: 'Revêtement SU(2) → SO(3)' })).toHaveAttribute('aria-selected', 'true');
  expect(errors).toEqual([]);
});

test('laboratoire G : commutateur exact, scènes 3D rendues par WebGL, verdict du revêtement', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/#/labo/groupes-lie');
  await expect(page.locator('[data-measure="end"]')).toContainText('2,25');

  await page.getByRole('tab', { name: 'Rodrigues' }).click();
  await expect(page.locator('[data-testid="canvas-3d"] canvas')).toBeVisible({ timeout: 20_000 });
  await expect(page.locator('[data-testid="webgl-fallback"]')).toHaveCount(0);
  await page.waitForTimeout(500);
  expect(await webglColors(page)).toBeGreaterThan(8);

  await page.getByRole('tab', { name: 'Revêtement SU(2) → SO(3)' }).click();
  // Une action manuelle interrompt l'animation au lieu d'être écrasée par elle.
  await page.getByTestId('lire-lacet').click();
  await page.waitForTimeout(600);
  await page.getByRole('button', { name: 'Aller au bout' }).click();
  await page.waitForTimeout(300);
  await expect(page.getByTestId('verdict-revetement')).toContainText('aboutit en −1');
  await page.locator('[data-turns="2"]').click();
  await page.getByRole('button', { name: 'Aller au bout' }).click();
  await expect(page.getByTestId('verdict-revetement')).toContainText('revient en 1');

  await page.getByRole('tab', { name: 'Orbites' }).click();
  await page.locator('[data-action="conjugaison"]').click();
  await expect(page.locator('[data-testid="canvas-3d"] canvas')).toBeVisible({ timeout: 20_000 });
  await page.waitForTimeout(500);
  expect(await webglColors(page)).toBeGreaterThan(8);

  await page.getByRole('tab', { name: 'Intégration symplectique' }).click();
  await expect(page.getByTestId('tableau-aires').locator('[data-row="verlet"] td').nth(2)).toHaveText('1');
  expect(errors).toEqual([]);
});
