const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const srcDir = path.join(repoRoot, 'src');
const expectedBase = 'https://swing.appmiweb.com';
const thePartyAssets = [
  'img/pages/the-party/the-party-1.jpg',
  'img/pages/the-party/the-party-2.jpg',
  'img/pages/the-party/the-party-3.jpg',
  'img/pages/the-party/the-party-4.jpg',
  'img/pages/the-party/the-party-photo.jpg',
];

function readSrc(relativePath) {
  return fs.readFileSync(path.join(srcDir, relativePath), 'utf8');
}

function extractHeader(html) {
  const match = html.match(/<header class="site-header"[\s\S]*?<\/header>/);
  expect(match, 'header principal absent').not.toBeNull();
  return match[0];
}

test.describe('PRD-013 - catalogue XR et The Party', () => {
  test('l’accueil liste The Party et les mentions Pixihead sans réintégrer Ni vues ni connues dans XR', ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle source exécuté une seule fois.');

    const home = readSrc('index.html');
    const header = extractHeader(home);

    expect(home).not.toContain('Nos projets en cours et réalisés');
    expect(home).toContain('The Party - Réalité mixte/Théâtre');
    expect(home).toContain('Lauréat de Villa Formose Immersive');
    expect(home).toContain('Taiwan XR Residency - Larger Scale');
    expect((home.match(/En développement avec le studio Pixihead/g) || []).length).toBeGreaterThanOrEqual(3);
    expect(home).toContain('Ni vues ni connues</a> - Série documentaire');
    expect(header).not.toContain('ni-vues-ni-connues.html');
    expect(header).toContain('href="the-party.html"');
    expect(header).toContain('The Party');
  });

  test('The Party dispose d’une page dédiée et d’un maillage public cohérent', ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle source exécuté une seule fois.');

    const thePartyPath = path.join(srcDir, 'the-party.html');
    expect(fs.existsSync(thePartyPath)).toBe(true);

    const page = readSrc('the-party.html');
    const xr = readSrc('experiences-series.html');
    const sitemap = readSrc('sitemap.xml');
    const plan = readSrc('plan-du-site.html');
    const llms = readSrc('llms.txt');
    const forAiJson = JSON.parse(readSrc('for-ai.json'));
    const forAiTxt = readSrc('for-ai.txt');
    const forAiIndex = readSrc('for-ai/index.html');
    const schema = JSON.parse(readSrc('schema-webpage.jsonld'));

    expect(page).toContain('<h1 class="sr-only">The Party</h1>');
    expect(page).toContain('Réalité mixte/Théâtre');
    expect(page).toContain('En développement avec le studio Pixihead');
    expect(page).toContain('Lauréat de Villa Formose Immersive');
    expect(page).toContain('Taiwan XR Residency - Larger Scale');
    expect(page).toContain(`<link rel="canonical" href="${expectedBase}/the-party.html">`);

    for (const asset of thePartyAssets) {
      expect(fs.existsSync(path.join(srcDir, asset)), asset).toBe(true);
      expect(page, asset).toContain(asset);
    }

    expect(xr).toContain('href="the-party.html"');
    expect(xr).toContain('The Party');
    expect(xr).not.toMatch(/Ni vues ni connues[\s\S]{0,240}page(?:9|10)__card/i);

    expect(sitemap).toContain('the-party.html');

    for (const content of [plan, llms, forAiTxt, forAiIndex, JSON.stringify(schema)]) {
      expect(content).toContain('the-party.html');
      expect(content).toContain('The Party');
    }

    expect(forAiJson.canonical_pages.some((item) => item.url === `${expectedBase}/the-party.html`)).toBe(true);
  });

  test('la page The Party rend ses images sans débordement horizontal', async ({ page }) => {
    await page.goto('/the-party.html');

    await expect(page.locator('body')).toHaveAttribute('data-page', 'the-party');
    await expect(page.locator('h1')).toHaveText('The Party');
    await expect(page.locator('main img')).toHaveCount(thePartyAssets.length);

    await page.waitForFunction((expectedCount) => {
      const images = Array.from(document.querySelectorAll('main img'));

      return images.length === expectedCount && images.every((img) => img.complete && img.naturalWidth > 0 && img.naturalHeight > 0);
    }, thePartyAssets.length);

    const imagesLoaded = await page.locator('main img').evaluateAll((images) =>
      images.every((img) => img.complete && img.naturalWidth > 0 && img.naturalHeight > 0),
    );
    expect(imagesLoaded).toBe(true);

    const overflow = await page.evaluate(() => Math.ceil(document.documentElement.scrollWidth - window.innerWidth));
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
