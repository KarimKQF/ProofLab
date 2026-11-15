import { expect, test, type Page } from '@playwright/test';

/** Échoue si la page lève une exception ou journalise une erreur. */
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

/** Chemin complet de l'exercice « Projection sur un demi-plan fermé ». */
const PROJECTION_FACILE: Step[] = [
  { node: 'nonvide', premises: ['d-K'], by: 'j-temoin' },
  { node: 'i-pi-cont', premises: [], by: 'j-lipschitz' },
  { node: 'i-ferme-R', premises: [], by: 'j-intervalle' },
  { node: 'i-eq', premises: ['d-K'], by: 'j-def-K' },
  { node: 'ferme', premises: ['i-pi-cont', 'i-ferme-R', 'i-eq'], by: 'j-preimage' },
  { node: 'v-coord', premises: ['v-pts'], by: 'j-calc' },
  { node: 'v-pos', premises: ['v-pts', 'd-K'], by: 'j-somme-pos' },
  { node: 'convexe', premises: ['v-coord', 'v-pos', 'd-K'], by: 'j-def-convexe' },
  { node: 'thm', premises: ['h-hilbert', 'nonvide', 'ferme', 'convexe'], by: 'j-thm-proj' },
  { node: 'm-dist', premises: ['d-x'], by: 'j-calc' },
  { node: 'm-ineg', premises: ['m-dist', 'd-K'], by: 'j-carre' },
  { node: 'p-val', premises: ['m-ineg', 'thm'], by: 'j-minimiseur', check: ['0', '3'] },
  { node: 'q-vect', premises: ['d-x', 'p-val'], by: 'j-calc' },
  { node: 'carac', premises: ['q-vect', 'd-K'], by: 'j-ps' },
  { node: 'fin', premises: ['nonvide', 'ferme', 'convexe', 'p-val', 'carac'], by: 'j-synthese' },
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
  // Partie neuve : IndexedDB est propre à chaque contexte de test.
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'ProofLab' })).toBeVisible();
});

test('navigation : accueil, carte, monde, fiche, exercice', async ({ page }) => {
  const errors = watchErrors(page);
  await page.getByRole('link', { name: 'Ouvrir la carte' }).click();
  await expect(page.getByRole('heading', { name: 'Carte de la théorie' })).toBeVisible();
  // 34 résultats d'analyse et 11 de géométrie de Lie.
  await expect(page.locator('[data-theorem]')).toHaveCount(45);
  await page.locator('[data-theorem="projection"]').click();
  await expect(page.getByRole('heading', { name: 'Projection sur un convexe fermé' })).toBeVisible();
  // Formules rendues par KaTeX.
  expect(await page.locator('.katex').count()).toBeGreaterThan(10);
  await page.getByRole('link', { name: 'Construire la preuve' }).first().click();
  await expect(page.getByRole('heading', { name: 'Projection sur un demi-plan fermé' })).toBeVisible();
  for (const path of ['/#/labos', '/#/revision', '/#/contre-exemples', '/#/examen', '/#/carnet', '/#/tableau', '/#/libre', '/#/reglages']) {
    await page.goto(path);
    await expect(page.locator('main h1')).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test('une preuve complète est validée, puis reprise après rechargement', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/#/preuve/projection.facile');
  for (const s of PROJECTION_FACILE.slice(0, 5)) await playStep(page, s);

  // Reprise d'une partie : les étapes posées survivent au rechargement.
  await page.waitForTimeout(500);
  await page.reload();
  await expect(page.locator('[data-node="ferme"]')).toHaveAttribute('data-status', 'demontre');

  for (const s of PROJECTION_FACILE.slice(5)) await playStep(page, s);
  await expect(page.getByText('Preuve validée.')).toBeVisible();
  await expect(page.getByText('Sans indice : réussite autonome.')).toBeVisible();

  // La progression est enregistrée et visible sur la carte.
  await page.goto('/#/carte');
  await expect(page.locator('[data-theorem="projection"]')).toHaveAttribute('data-status', 'en-cours');
  // Riesz dépend de la projection : il s'ouvre.
  await expect(page.locator('[data-theorem="riesz"]')).not.toHaveAttribute('data-status', 'verrouille');
  expect(errors).toEqual([]);
});

test('une assertion fausse est refusée avec un contre-exemple, sans pénalité', async ({ page }) => {
  await page.goto('/#/preuve/projection.facile');
  await page.getByTestId('bank-x-strict').click();
  await page.getByTestId('premise-d-K').check();
  await page.getByTestId('just-j-lim-large').check();
  await page.getByTestId('verify-step').click();
  const feedback = page.getByTestId('step-feedback').first();
  await expect(feedback).toContainText('Incorrect');
  await expect(feedback).toContainText('Contre-exemple');
  await expect(page.locator('[data-node="x-strict"]')).toHaveAttribute('data-status', 'incorrect');
});

test('déclarer sans justifier reste « à justifier »', async ({ page }) => {
  await page.goto('/#/preuve/projection.facile');
  await page.getByTestId('bank-nonvide').click();
  await page.getByTestId('verify-step').click();
  await expect(page.getByTestId('step-feedback').first()).toContainText('À justifier');
});

test('indices gradués et retrait d’hypothèse', async ({ page }) => {
  await page.goto('/#/preuve/projection.facile');
  await page.getByRole('button', { name: /Indice 1/ }).click();
  await expect(page.getByText('1. Orientation')).toBeVisible();
  await expect(page.getByRole('button', { name: /Indice 2/ })).toBeVisible();
  await page.getByTestId('remove-ferme').check();
  await expect(page.getByText('Le théorème ne peut plus être invoqué', { exact: false })).toBeVisible();
  await expect(page.getByText('Contre-exemple').first()).toBeVisible();
});

test('sauvegarde : export puis import validé', async ({ page }) => {
  await page.goto('/#/reglages');
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Exporter' }).click();
  const file = await download;
  const path = await file.path();
  expect(path).toBeTruthy();
  await page.locator('input[type=file]').setInputFiles(path!);
  await expect(page.getByText('Sauvegarde importée.')).toBeVisible();
  // Un fichier malformé est refusé sans rien modifier.
  await page.locator('input[type=file]').setInputFiles({ name: 'faux.json', mimeType: 'application/json', buffer: Buffer.from('{"schemaVersion": 99}') });
  await expect(page.getByText(/Format de sauvegarde non reconnu/)).toBeVisible();
});

test('navigation au clavier', async ({ page }) => {
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Aller au contenu' })).toBeFocused();
  let reached = false;
  for (let i = 0; i < 6 && !reached; i++) {
    await page.keyboard.press('Tab');
    reached = await page.getByRole('link', { name: 'Carte', exact: true }).evaluate((el) => el === document.activeElement);
  }
  expect(reached).toBe(true);
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Carte de la théorie' })).toBeVisible();
});

test('laboratoire de projection : le projeté n’apparaît qu’après la preuve', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/#/labo/projection');
  await expect(page.getByText('Le projeté n’est pas encore garanti')).toBeVisible();
  // Déplacer x au clavier.
  await page.getByRole('slider', { name: 'Point x à projeter' }).focus();
  await page.keyboard.press('ArrowLeft');
  await page.getByRole('button', { name: 'Fermeture', exact: true }).click();
  await expect(page.getByText('L’infimum n’est atteint en aucun point', { exact: false })).toBeVisible();
  expect(errors).toEqual([]);
});

test('thème clair et réduction des animations', async ({ page }) => {
  await page.goto('/#/reglages');
  await page.getByRole('button', { name: 'Clair' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByLabel('Réduire les animations').check();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
});

test('les huit laboratoires se chargent sans erreur', async ({ page }) => {
  const errors = watchErrors(page);
  for (const id of ['projection', 'riesz-lax-milgram', 'convergences', 'compacite', 'galerkin', 'sobolev-trace', 'groupes-lie', 'demonstration']) {
    await page.goto(`/#/labo/${id}`);
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('main h1')).not.toHaveText('Laboratoire indisponible');
  }
  expect(errors).toEqual([]);
});

test('examen : tirage, copie rendue, grille à cinq critères', async ({ page }) => {
  await page.goto('/#/reglages');
  await page.getByLabel('Ouvrir tout le parcours').check();
  await page.goto('/#/examen');
  await page.getByLabel('Nombre de preuves à construire').selectOption('1');
  await page.getByRole('button', { name: 'Commencer l’examen' }).click();
  await expect(page.getByText('Examen · Énoncé 1 / 1')).toBeVisible();
  await page.getByRole('button', { name: 'Rendre la copie' }).click();
  await expect(page.getByText('Examen terminé')).toBeVisible();
  for (const c of ['Hypothèses', 'Méthode', 'Validité des étapes', 'Justifications', 'Conclusion']) {
    await expect(page.getByText(c, { exact: true }).first()).toBeVisible();
  }
});

test('contre-exemple : une réponse fausse est refusée, la bonne est validée', async ({ page }) => {
  await page.goto('/#/contre-exemples/ce-projection-non-ferme');
  await page.getByRole('textbox', { name: 'Valeur exacte' }).fill('0.999');
  await page.getByRole('button', { name: 'Vérifier' }).click();
  await expect(page.getByText('Incorrect.')).toBeVisible();
  await page.getByRole('textbox', { name: 'Valeur exacte' }).fill('1');
  await page.getByRole('button', { name: 'Vérifier' }).click();
  await expect(page.getByText('Justification')).toBeVisible();
});

test('preuve libre : verdict provisoire « à justifier », jamais « validé »', async ({ page }) => {
  await page.goto('/#/preuve-libre/projection.facile');
  await page.getByLabel(/Ta démonstration/).fill('Par hypothèse, $K$ est non vide et fermé ; il est évident que $P_Kx=(0,3)$.');
  await page.getByRole('button', { name: 'Évaluer la rédaction' }).click();
  await expect(page.getByTestId('free-verdict')).toHaveText('À justifier');
  await expect(page.getByText('Points d’attention')).toBeVisible();
});
