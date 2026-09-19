const { test, expect } = require('@playwright/test');

// Issues #29 et #30 : vidéos fournies par la cliente, identifiants vérifiés auprès des plateformes le 2026-09-19.
// #30 : « L'estrade Marilyn », Vimeo non répertoriée 840107932 (clé a9808afd6b), lecteur piloté par le site.
// #29 : deux interviews réalisées par Stéphanie Sphyras, liens YouTube seuls fournis ; domaine sans cookie,
// commandes natives du lecteur, jamais de lecture automatique (RGAA 4.10).
const INTERVIEWS = [
  { id: 'Q8IsqXjCXwc', titre: /Adrien Gombeaud.*Christelle Montagner|Christelle Montagner.*Adrien Gombeaud/ },
  { id: 'c6ji1dscDqs', titre: /Amy Greene/ },
];

test.beforeEach(async ({ page }) => {
  await page.route(/player\.vimeo\.com|youtube(-nocookie)?\.com|ytimg\.com/, (r) => r.abort());
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('T30 - Expériences interactives : vidéo de l\'estrade, pilotable', async ({ page }) => {
  await page.goto('/monroe-experiences.html');
  const iframe = page.locator('#vimeo-estrade');
  await expect(iframe).toHaveAttribute('src', /player\.vimeo\.com\/video\/840107932\?h=a9808afd6b/);
  await expect(iframe).toHaveAttribute('title', /estrade Marilyn/i);
  const bloc = page.locator('#estrade-video');
  await expect(bloc.locator('.page11__play-btn')).toHaveCount(1);
  await expect(bloc.locator('.page11__sound-btn')).toHaveCount(1);
  expect(await page.evaluate(() => Array.from(document.querySelectorAll('main > section')).pop().id)).toBe('estrade-video');
  await iframe.scrollIntoViewIfNeeded();
  expect((await iframe.boundingBox()).width).toBeGreaterThan(200);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(false);
});

test('T29 - Interviews : deux vidéos YouTube sans cookie, sans lecture automatique', async ({ page }) => {
  await page.goto('/monroe-interviews.html');
  const section = page.locator('#interviews-videos');
  await expect(section.locator('h2')).toHaveText('Les interviews en vidéo');
  const iframes = section.locator('iframe');
  await expect(iframes).toHaveCount(INTERVIEWS.length);
  for (const [k, v] of INTERVIEWS.entries()) {
    const f = iframes.nth(k);
    const src = await f.getAttribute('src');
    expect(src).toContain(`https://www.youtube-nocookie.com/embed/${v.id}`);
    expect(src, 'pas de lecture automatique').not.toMatch(/autoplay=1/);
    await expect(f).toHaveAttribute('title', v.titre);
    await expect(f).toHaveAttribute('loading', 'lazy');
    await f.scrollIntoViewIfNeeded();
    const b = await f.boundingBox();
    expect(Math.abs(b.width / b.height - 16 / 9), 'lecteur au format 16:9').toBeLessThan(0.05);
    expect(b.width).toBeGreaterThan(200);
  }
  // Chaque vidéo a son intitulé visible, qui nomme la personne et crédite la réalisation.
  await expect(section.locator('h3')).toHaveCount(INTERVIEWS.length);
  await expect(section).toContainText('réalisation Stéphanie Sphyras');
  const niveaux = await page.evaluate(() => Array.from(document.querySelectorAll('main h1, main h2, main h3, main h4')).map((h) => Number(h.tagName[1])));
  niveaux.forEach((n, k) => { if (k > 0) expect(n - niveaux[k - 1], 'saut de niveau de titre').toBeLessThanOrEqual(1); });
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(false);
});
