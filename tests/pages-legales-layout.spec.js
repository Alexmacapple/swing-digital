const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const srcDir = path.join(repoRoot, 'src');

function readSrc(relativePath) {
  return fs.readFileSync(path.join(srcDir, relativePath), 'utf8');
}

test.describe('Pages légales - design éditorial unifié', () => {
  test('les mentions légales reprennent la composition du plan du site', ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle source exécuté une seule fois.');

    const legal = readSrc('mentions-legales.html');

    expect(legal).toContain('<section class="sitemap-page mentions-legales"');
    expect(legal).toContain('<div class="sitemap-page__container mentions-legales__container">');
    expect(legal).toContain('<h1 id="mentions-title">Mentions légales</h1>');
    expect(legal).not.toContain('<h1 class="sr-only">Mentions légales</h1>');
    expect(legal).toContain('css/style.css?v=20260622-mentions-sitemap');
  });

  for (const url of ['/plan-du-site.html', '/mentions-legales.html']) {
    test(`${url} conserve le même cadre visuel sans débordement`, async ({ page }) => {
      await page.goto(url);

      const section = page.locator('main .sitemap-page');
      const container = page.locator('main .sitemap-page__container');
      const title = container.locator('h1').first();

      await expect(section).toBeVisible();
      await expect(container).toBeVisible();
      await expect(title).toBeVisible();

      const layout = await page.evaluate(() => {
        const containerElement = document.querySelector('main .sitemap-page__container');
        const titleElement = containerElement.querySelector('h1');
        const afterStyle = getComputedStyle(titleElement, '::after');

        return {
          containerWidth: Math.round(containerElement.getBoundingClientRect().width),
          titleFontSize: Number.parseFloat(getComputedStyle(titleElement).fontSize),
          underlineWidth: Number.parseFloat(afterStyle.width),
          overflow: Math.ceil(document.documentElement.scrollWidth - window.innerWidth),
        };
      });

      expect(layout.containerWidth).toBeLessThanOrEqual(800);
      expect(layout.titleFontSize).toBeGreaterThan(30);
      expect(layout.underlineWidth).toBeGreaterThan(50);
      expect(layout.overflow).toBeLessThanOrEqual(1);
    });
  }
});
