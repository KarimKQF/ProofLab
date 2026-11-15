import { expect, test, type Page } from '@playwright/test';

/**
 * Dictionnaire et démonstration par blocs, dans un vrai Chrome : une notion d'un énoncé
 * ouvre sa fiche (de proche en proche), la page Dictionnaire, l'éditeur par blocs par
 * défaut dans un exercice (même preuve que la vue graphe), et une démonstration par
 * l'absurde complète dans le laboratoire H, guide compris. Aucune erreur de console.
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

test('dictionnaire : une notion d’un énoncé ouvre sa fiche, de proche en proche', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/#/theoreme/lax-milgram');
  const term = page.locator('[data-term="coercivite"]').first();
  await expect(term).toBeVisible();
  await term.click();
  const bubble = page.getByTestId('bulle-definition');
  await expect(bubble.getByRole('heading', { name: 'Coercivité' })).toBeVisible();
  await bubble.locator('[data-term="forme-bilineaire"]').first().click();
  await expect(bubble.getByRole('heading', { name: 'Forme bilinéaire' })).toBeVisible();
  await page.getByTestId('bulle-retour').click();
  await expect(bubble.getByRole('heading', { name: 'Coercivité' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(bubble).toHaveCount(0);
  // « Ouvrir dans le dictionnaire » mène à la fiche complète.
  await term.click();
  await page.getByTestId('ouvrir-dictionnaire').click();
  await expect(page).toHaveURL(/#\/dictionnaire\/coercivite$/);
  await expect(page.getByRole('heading', { level: 2, name: 'Coercivité' })).toBeVisible();
  await expect(page.getByTestId('usages')).toContainText('Lax–Milgram');
  expect(errors).toEqual([]);
});

test('dictionnaire : recherche sans accents et parcours géométrie de Lie', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/#/dictionnaire');
  await page.getByRole('searchbox', { name: 'Chercher dans le dictionnaire' }).fill('stabilisateur');
  await page.locator('[data-entree="stabilisateur"]').click();
  await expect(page.getByRole('heading', { level: 2, name: 'Stabilisateur' })).toBeVisible();
  // Homonyme : dans le parcours de Lie, « distribution » désigne un champ de sous-espaces.
  await page.goto('/#/theoreme/frobenius');
  await page.locator('[data-term="distribution-geometrique"]').first().click();
  await expect(page.getByTestId('bulle-definition').getByRole('heading', { name: /sous-espaces tangents/ })).toBeVisible();
  expect(errors).toEqual([]);
});

test('exercice : l’éditeur par blocs est la vue par défaut, le graphe montre la même preuve', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/#/preuve/projection.facile');
  await expect(page.getByTestId('editeur-blocs')).toBeVisible();
  await page.getByTestId('ajouter-deduction').click();
  const bloc = page.getByTestId('bloc-0');
  await bloc.getByTestId('cible-nonvide').click();
  await bloc.getByTestId('premisse-d-K').check();
  await bloc.getByTestId('choisir-justification').click();
  await bloc.getByTestId('justif-j-temoin').click();
  await bloc.getByTestId('verifier-bloc').click();
  await expect(bloc).toHaveAttribute('data-status', 'demontre');
  await expect(bloc.getByTestId('bloc-replie')).toContainText('H');
  await page.locator('[data-vue-preuve="graphe"]').click();
  await expect(page.locator('[data-node="nonvide"]').first()).toHaveAttribute('data-status', 'demontre');
  await page.locator('[data-vue-preuve="blocs"]').click();
  await expect(page.getByTestId('bloc-0')).toHaveAttribute('data-status', 'demontre');
  expect(errors).toEqual([]);
});

type Block = { kind: string; node: string; premises?: string[]; by?: string };

const PW_ABSURDE: Block[] = [
  { kind: 'intro', node: 'abs' },
  { kind: 'deduction', node: 'neg', premises: ['abs'], by: 'j-negation' },
  { kind: 'deduction', node: 'vn', premises: ['neg', 'h-borne'], by: 'j-normalise' },
  { kind: 'theoreme', node: 'rellich', premises: ['vn', 'h-borne', 'h-lip'], by: 'j-rellich' },
  { kind: 'deduction', node: 'norme', premises: ['rellich', 'vn'], by: 'j-norme' },
  { kind: 'deduction', node: 'moy', premises: ['rellich', 'vn', 'h-borne'], by: 'j-moy' },
  { kind: 'deduction', node: 'grad', premises: ['rellich', 'vn'], by: 'j-grad' },
  { kind: 'deduction', node: 'nul', premises: ['grad', 'moy', 'h-connexe'], by: 'j-connexe' },
  { kind: 'absurde', node: 'contra', premises: ['norme', 'nul'], by: 'j-contra' },
  { kind: 'conclusion', node: 'fin', premises: ['contra'], by: 'j-absurde' },
];

test('laboratoire H : démonstration par l’absurde en blocs, guide et rédaction', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/#/labos');
  await page.locator('[data-lab="demonstration"]').click();
  await expect(page.getByRole('heading', { level: 1, name: 'Démonstration' })).toBeVisible();
  await page.locator('[data-demo="poincare-wirtinger.intermediaire"]').click();
  await expect(page.getByTestId('editeur-blocs')).toBeVisible();

  // Guide : la méthode, puis un coup de pouce calculé.
  await expect(page.locator('[data-methode="absurde"]')).toBeVisible();
  await page.getByTestId('que-etablir').click();
  await expect(page.getByTestId('etapes-possibles')).toContainText('Introduis d’abord');

  for (const [i, b] of PW_ABSURDE.entries()) {
    if (b.kind === 'intro') {
      await page.getByTestId('ajouter-intro').click();
      await page.getByTestId(`introduire-${b.node}`).click();
      continue;
    }
    await page.getByTestId(`ajouter-${b.kind}`).click();
    const bloc = page.getByTestId(`bloc-${i}`);
    if (b.kind !== 'conclusion') {
      if (!(await bloc.getByTestId(`cible-${b.node}`).count())) await bloc.getByRole('button', { name: /Autres affirmations/ }).click();
      await bloc.getByTestId(`cible-${b.node}`).click();
    }
    for (const p of b.premises ?? []) await bloc.getByTestId(`premisse-${p}`).check();
    await bloc.getByTestId('choisir-justification').click();
    await bloc.getByTestId(`justif-${b.by}`).click();
    await bloc.getByTestId('verifier-bloc').click();
    await expect(bloc).toHaveAttribute('data-status', 'demontre');
  }
  await expect(page.getByTestId('demo-reussie')).toBeVisible();
  await page.getByTestId('lire-preuve').click();
  await expect(page.getByTestId('preuve-redigee')).toContainText('(10)');
  await expect(page.getByTestId('preuve-redigee')).toContainText('Supposons par l');
  // Recommencer repart d'une démonstration vide.
  await page.getByTestId('recommencer-demo').click();
  await expect(page.getByTestId('bloc-0')).toHaveCount(0);
  expect(errors).toEqual([]);
});
