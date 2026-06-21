const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const srcDir = path.join(repoRoot, 'src');

function readSrc(relativePath) {
  return fs.readFileSync(path.join(srcDir, relativePath), 'utf8');
}

function px(value) {
  return Number.parseFloat(String(value).replace('px', ''));
}

function lineRatio(styles) {
  return px(styles.lineHeight) / px(styles.fontSize);
}

async function styleFor(page, rootSelector, selector) {
  return page.locator(rootSelector).locator(selector).first().evaluate((element) => {
    const style = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return {
      fontFamily: style.fontFamily,
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      lineHeight: style.lineHeight,
      letterSpacing: style.letterSpacing,
      marginTop: style.marginTop,
      marginBottom: style.marginBottom,
      maxWidth: style.maxWidth,
      width: `${rect.width}px`,
    };
  });
}

test.describe('Typographie éditoriale globale', () => {
  test('la refonte conserve Satoshi sans importer de nouvelle police', ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle source exécuté une seule fois.');

    const css = readSrc('css/style.css');

    expect(css).not.toMatch(/@import\s+url/i);
    expect(css).not.toMatch(/fonts\.googleapis|use\.typekit|fontshare/i);
    expect(css.match(/@font-face\s*{/g)).toHaveLength(2);
    expect(css).toContain("font-family: 'Satoshi';");
    expect(css).toContain("--font-primary: 'Satoshi', Inter, system-ui");
  });

  test('les pages 3 et 4 hiérarchisent les titres, descriptions et informations secondaires', async ({ page }) => {
    for (const sectionId of ['#page-3', '#page-4']) {
      await page.goto(`/index.html${sectionId}`);

      const title = await styleFor(page, sectionId, '.page3__project-title');
      const subtitle = await styleFor(page, sectionId, '.page3__project-subtitle');
      const meta = await styleFor(page, sectionId, '.page3__project-meta');
      const link = await styleFor(page, sectionId, '.page3__project-link');

      expect(px(subtitle.fontSize), `${sectionId} : le sous-titre doit rester sous le titre`).toBeLessThanOrEqual(px(title.fontSize) - 2);
      expect(px(meta.fontSize), `${sectionId} : les infos secondaires doivent être discrètes`).toBeLessThanOrEqual(16);
      expect(lineRatio(meta), `${sectionId} : les infos secondaires ne doivent pas former un pavé lâche`).toBeLessThanOrEqual(1.6);
      expect(px(link.fontSize), `${sectionId} : le lien projet ne doit pas dominer le titre`).toBeLessThanOrEqual(px(title.fontSize) - 1);
      expect(px(title.marginBottom), `${sectionId} : le titre doit respirer avant la description`).toBeGreaterThanOrEqual(6);
      expect(px(subtitle.marginBottom), `${sectionId} : la description doit se séparer des métadonnées`).toBeGreaterThanOrEqual(10);
    }
  });

  test('la partie En développement devient scannable sans masquer les informations secondaires', async ({ page }) => {
    await page.goto('/index.html#page-4');

    const devProject = await styleFor(page, '#page-4', '.page3__creations-dev .page3__project-meta:has(a)');
    const devDetail = await styleFor(page, '#page-4', '.page3__creations-dev .page3__project-meta:not(:has(a))');

    expect(px(devProject.fontSize)).toBeGreaterThan(px(devDetail.fontSize));
    expect(Number(devProject.fontWeight)).toBeGreaterThanOrEqual(650);
    expect(px(devDetail.fontSize)).toBeLessThanOrEqual(15);
    expect(lineRatio(devDetail)).toBeLessThanOrEqual(1.55);

    await expect(page.locator('#page-4 .page3__creations-dev .page3__project-meta')).toHaveCount(10);
  });

  test('sur mobile, les informations secondaires restent lisibles sans effet paquet', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/index.html#page-3');

    const title = await styleFor(page, '#page-3', '.page3__project-title');
    const meta = await styleFor(page, '#page-3', '.page3__project-meta');

    expect(px(meta.fontSize)).toBeLessThanOrEqual(px(title.fontSize) - 1);
    expect(lineRatio(meta)).toBeLessThanOrEqual(1.6);

    const overflow = await page.evaluate(() => Math.ceil(document.documentElement.scrollWidth - window.innerWidth));
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
