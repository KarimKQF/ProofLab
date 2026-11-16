import { expect, test, type Page } from '@playwright/test';

/**
 * « Trouver l'erreur », bilan des pièges, révision des notions, effacement progressif du
 * laboratoire de démonstration et démonstrations de résultats, dans un vrai Chrome.
 * Aucune erreur de console.
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

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'ProofLab' })).toBeVisible();
});

test('trouver l’erreur : une étape correcte est refusée, l’erreur s’affiche, le bilan la retient', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/#/trouver-erreur');
  await expect(page.getByRole('heading', { level: 1, name: 'Trouver l’erreur' })).toBeVisible();
  await page.locator('[data-hunt-theorem="projection"]').click();
  const lines = page.getByTestId('lignes-demonstration').locator('[data-ligne]');
  await expect(lines.first()).toBeVisible();

  // Désigner les étapes une à une jusqu'à ce qu'une étape correcte soit refusée.
  await page.locator('[data-nature="justification-invalide"]').click();
  const count = await lines.count();
  let refused = false;
  for (let i = 0; i < count && !refused; i++) {
    await lines.nth(i).click();
    await page.getByTestId('valider-erreur').click();
    const explained = await page.getByTestId('explication-erreur').count();
    if (explained) break;
    const msg = (await page.getByTestId('retour-erreur').textContent()) ?? '';
    refused = /est correcte/.test(msg);
  }
  expect(refused).toBe(true);
  await page.getByTestId('montrer-erreur').click();
  await expect(page.getByTestId('explication-erreur')).toContainText('Voici l’erreur');
  await expect(page.locator('[data-fautive="oui"]').first()).toBeVisible();

  // Le bilan des pièges retient l'erreur manquée, avec de quoi la travailler.
  await page.goto('/#/pieges');
  await expect(page.getByRole('heading', { level: 1, name: 'Bilan des pièges' })).toBeVisible();
  await expect(page.getByTestId('bilan-concepts').locator('[data-concept]').first()).toBeVisible();
  await expect(page.getByTestId('bilan-concepts')).toContainText('Trouver l’erreur');
  expect(errors).toEqual([]);
});

test('notions : une notion consultée entre dans les révisions, une notion ajoutée se révise', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/#/theoreme/lax-milgram');
  await page.locator('[data-term="coercivite"]').first().click();
  const bubble = page.getByTestId('bulle-definition');
  await expect(bubble.getByTestId('dans-revisions')).toContainText('consultée');
  await page.keyboard.press('Escape');

  await page.goto('/#/dictionnaire/compact');
  await page.getByTestId('ajouter-revision').click();
  await expect(page.getByTestId('dans-revisions')).toContainText('à revoir maintenant');

  await page.goto('/#/revision');
  await expect(page.getByTestId('notions-a-revoir')).toContainText('Notions à revoir (1)');
  await page.getByTestId('reviser-notions-maintenant').click();
  const card = page.getByTestId('carte-notion');
  await expect(card).toHaveAttribute('data-notion', 'compact');
  await expect(page.getByTestId('question-notion')).toBeVisible();
  await page.getByTestId('voir-reponse').click();
  await expect(page.getByTestId('reponse-notion')).toBeVisible();
  await page.getByTestId('note-4').click();
  await expect(page.getByTestId('revision-notions-fin')).toContainText('1 notion revue');
  expect(errors).toEqual([]);
});

/** Démonstration de Poincaré–Wirtinger par l'absurde : prémisses et justification de chaque étape. */
const PW: Record<string, { premises: string[]; by: string }> = {
  neg: { premises: ['abs'], by: 'j-negation' },
  vn: { premises: ['neg', 'h-borne'], by: 'j-normalise' },
  rellich: { premises: ['vn', 'h-borne', 'h-lip'], by: 'j-rellich' },
  norme: { premises: ['rellich', 'vn'], by: 'j-norme' },
  moy: { premises: ['rellich', 'vn', 'h-borne'], by: 'j-moy' },
  grad: { premises: ['rellich', 'vn'], by: 'j-grad' },
  nul: { premises: ['grad', 'moy', 'h-connexe'], by: 'j-connexe' },
  contra: { premises: ['norme', 'nul'], by: 'j-contra' },
  fin: { premises: ['contra'], by: 'j-absurde' },
};

test('laboratoire H : lire, retrouver les justifications, reconstruire les étapes effacées', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/#/labo/demonstration?exercice=poincare-wirtinger.intermediaire');
  await expect(page.locator('[data-effacement="lire"]')).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByTestId('preuve-redigee')).toBeVisible();
  await page.getByTestId('etape-suivante').click();

  // Étape 2 : chaque bloc garde son affirmation et ses prémisses ; on retrouve la justification.
  await expect(page.locator('[data-effacement="justifier"]')).toHaveAttribute('aria-selected', 'true');
  const toJustify = page.locator('[data-verrou="justification"]');
  const n = await toJustify.count();
  expect(n).toBeGreaterThan(5);
  for (let i = 0; i < n; i++) {
    const bloc = toJustify.nth(i);
    const node = (await bloc.getAttribute('data-node'))!;
    await bloc.getByTestId('choisir-justification').click();
    await bloc.getByTestId(`justif-${PW[node]!.by}`).click();
    await bloc.getByTestId('verifier-bloc').click();
    await expect(bloc).toHaveAttribute('data-status', 'demontre');
  }
  await expect(page.getByTestId('demo-reussie')).toBeVisible();
  await page.getByTestId('etape-suivante').click();

  // Étape 3 : une étape sur deux est effacée ; on la reconstruit.
  await expect(page.locator('[data-effacement="completer"]')).toHaveAttribute('aria-selected', 'true');
  const holes = page.locator('[data-trou]');
  const h = await holes.count();
  expect(h).toBeGreaterThan(1);
  for (let i = 0; i < h; i++) {
    const bloc = holes.nth(i);
    const node = (await bloc.getAttribute('data-trou'))!;
    await bloc.getByTestId('choisir-cible').click();
    if (!(await bloc.getByTestId(`cible-${node}`).count())) await bloc.getByRole('button', { name: /Autres affirmations/ }).click();
    await bloc.getByTestId(`cible-${node}`).click();
    for (const p of PW[node]!.premises) await bloc.getByTestId(`premisse-${p}`).check();
    await bloc.getByTestId('choisir-justification').click();
    await bloc.getByTestId(`justif-${PW[node]!.by}`).click();
    await bloc.getByTestId('verifier-bloc').click();
    await expect(bloc).toHaveAttribute('data-status', 'demontre');
  }
  await expect(page.getByTestId('demo-reussie')).toBeVisible();
  expect(errors).toEqual([]);
});

test('démonstration d’un résultat : de la fiche au laboratoire, preuve modèle comprise', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/#/theoreme/riesz');
  const item = page.getByTestId('demonstration-resultat');
  await expect(item).toContainText('Démonstration du résultat');
  await item.getByRole('link', { name: 'Laboratoire de démonstration' }).click();
  await expect(page.getByRole('heading', { level: 2, name: 'Démontrer le théorème de représentation de Riesz' })).toBeVisible();
  await expect(page.getByTestId('demo-reussie')).toBeVisible();
  await expect(page.getByTestId('preuve-redigee')).toContainText('Disjonction des cas');
  await page.locator('[data-effacement="blanche"]').click();
  await expect(page.getByTestId('bloc-0')).toHaveCount(0);
  await page.getByTestId('changer-demo').click();
  await expect(page.getByText('Les 45 résultats ont au moins une démonstration jouable.')).toBeVisible();
  expect(errors).toEqual([]);
});
