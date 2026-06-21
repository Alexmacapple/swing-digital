const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const srcDir = path.join(repoRoot, 'src');
const expectedBase = 'https://swing.appmiweb.com';
const memoryBoxAssets = [
  'img/pages/memory-box-vr/memory-box-vr-1.jpg',
  'img/pages/memory-box-vr/memory-box-vr-2.jpg',
];

function readSrc(relativePath) {
  return fs.readFileSync(path.join(srcDir, relativePath), 'utf8');
}

function listHtmlPages() {
  return fs
    .readdirSync(srcDir)
    .filter((file) => file.endsWith('.html'))
    .sort();
}

test.describe('PRD-015 - page autonome Memory Box VR', () => {
  test('Memory Box VR dispose d’une page dédiée avec assets et SEO propres', ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle source exécuté une seule fois.');

    const pagePath = path.join(srcDir, 'memory-box-vr.html');
    expect(fs.existsSync(pagePath)).toBe(true);

    const html = readSrc('memory-box-vr.html');

    expect(html).toContain('<title>Memory Box VR - Swing Digital</title>');
    expect(html).toContain('Memory Box VR');
    expect(html).toContain('L’Expérience Monroe');
    expect(html).toContain(`<link rel="canonical" href="${expectedBase}/memory-box-vr.html">`);
    expect(html).toContain('<h1 class="sr-only">Memory Box VR</h1>');
    expect(html).toContain('data-page="memory-box-vr"');
    expect(html).toContain('href="experience-monroe.html"');
    expect(html).toContain('href="experiences-series.html"');

    for (const asset of memoryBoxAssets) {
      expect(fs.existsSync(path.join(srcDir, asset)), asset).toBe(true);
      expect(html, asset).toContain(asset);
    }
  });

  test('les liens Memory Box pointent vers la page dédiée sans remplacer XR Corporate', ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle source exécuté une seule fois.');

    for (const file of listHtmlPages()) {
      const html = readSrc(file);
      const memoryBoxLinks = Array.from(
        html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>[^<]*Memory Box[^<]*<\/a>/g),
        (match) => match[1],
      );

      for (const href of memoryBoxLinks) {
        expect(href, `${file} contient un lien Memory Box mal routé`).toBe('memory-box-vr.html');
      }
    }

    const home = readSrc('index.html');
    const xrCorporate = readSrc('xr-corporate.html');

    expect(home).toContain('href="memory-box-vr.html" class="page3__project-link">Voir le projet Memory Box VR</a>');
    expect(xrCorporate).toContain('<h1 class="sr-only">XR Corporate</h1>');
    expect(xrCorporate).toContain('href="xr-corporate.html" class="breadcrumb__link" aria-current="page">XR Corporate</a>');
  });

  test('les fichiers publics référencent Memory Box VR', ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle source exécuté une seule fois.');

    const sitemap = readSrc('sitemap.xml');
    const plan = readSrc('plan-du-site.html');
    const llms = readSrc('llms.txt');
    const forAiJson = JSON.parse(readSrc('for-ai.json'));
    const forAiTxt = readSrc('for-ai.txt');
    const forAiIndex = readSrc('for-ai/index.html');
    const schema = JSON.parse(readSrc('schema-webpage.jsonld'));

    expect(sitemap).toContain(`${expectedBase}/memory-box-vr.html`);
    expect(plan).toContain('href="memory-box-vr.html">Memory Box VR</a>');
    expect(llms).toContain('Memory Box VR');
    expect(forAiTxt).toContain('Memory Box VR');
    expect(forAiIndex).toContain('Memory Box VR');
    expect(JSON.stringify(schema)).toContain(`${expectedBase}/memory-box-vr.html`);
    expect(forAiJson.canonical_pages.some((item) => item.url === `${expectedBase}/memory-box-vr.html`)).toBe(true);
  });

  test('la page Memory Box VR se rend sans image cassée ni débordement horizontal', async ({ page }) => {
    await page.goto('/memory-box-vr.html');

    await expect(page.locator('body')).toHaveAttribute('data-page', 'memory-box-vr');
    await expect(page.locator('h1')).toHaveText('Memory Box VR');

    await page.waitForFunction(() => {
      const images = Array.from(document.querySelectorAll('main img'));

      return images.length === 2 && images.every((img) => img.complete && img.naturalWidth > 0 && img.naturalHeight > 0);
    });

    const overflow = await page.evaluate(() => Math.ceil(document.documentElement.scrollWidth - window.innerWidth));
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
