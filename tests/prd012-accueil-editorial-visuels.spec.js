const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const srcDir = path.join(repoRoot, 'src');
const page3ImagePath = 'img/pages/page-3/swing-presentation.jpg';

function readSrc(relativePath) {
  return fs.readFileSync(path.join(srcDir, relativePath), 'utf8');
}

test.describe('PRD-012 - accueil éditorial et visuels', () => {
  test('le HTML source de l’accueil contient le nouveau message éditorial', ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle source exécuté une seule fois.');

    const html = readSrc('index.html');
    const css = readSrc('css/style.css');

    expect(html).toContain('CRÉATEURS D’EXPÉRIENCES IMMERSIVES');
    expect(html).toContain('# formats courts # spectacle vivant # XR # réalité mixte # storytelling');
    expect(html).toContain('Swing Digital conçoit des formats audiovisuels et des expériences immersives.');
    expect(html).toContain('À la croisée du spectacle vivant, de la XR et de la création sonore, nous inventons de nouvelles formes de récit.');
    expect(html).toContain('Nous imaginons des récits immersifs au croisement du spectacle vivant et des technologies XR.');
    expect(html).toContain(`src="${page3ImagePath}"`);
    expect(fs.existsSync(path.join(srcDir, page3ImagePath))).toBe(true);
    expect(css).toContain('background: var(--color-background-pink-readable);');
    expect(css).toContain('.hero-page1__background {\n    display: none;\n}');
    expect(css).not.toContain('--gradient-hero-video-tint');
    expect(css).not.toContain('background: var(--gradient-hero-video-tint)');

    expect(html).not.toContain('Créateurs d\'Expériences Transmédia Immersives');
    expect(html).not.toContain('# spectacle vivant # réalité mixte # storytelling');
    expect(html).not.toContain('Soutiens CNC');
    expect(html).not.toContain('Notre approche : renouveler le rapport du spectateur');
  });

  test('le hero et le visuel page 3 se rendent sans débordement horizontal', async ({ page }) => {
    await page.goto('/index.html#page-1');

    await expect(page.locator('#hero-title')).toHaveText('CRÉATEURS D’EXPÉRIENCES IMMERSIVES');
    await expect(page.locator('.hero-page1__trust')).toHaveCount(0);
    await expect(page.locator('#hero-summary')).toContainText('Swing Digital conçoit des formats audiovisuels et des expériences immersives.');

    const heroLayout = await page.evaluate(() => {
      const rect = (selector) => {
        const element = document.querySelector(selector);
        if (!element) return null;

        const { top, right, bottom, left } = element.getBoundingClientRect();
        return { top, right, bottom, left };
      };

      const overlaps = (a, b) => Boolean(a && b && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top);
      const hero = rect('#page-1');
      const content = rect('.hero-page1__title-group');
      const bottomLeft = rect('.hero-page1__bottom-left');
      const bottomRight = rect('.hero-page1__bottom-right');
      const heroBackground = document.querySelector('.hero-page1__background');
      const heroVideo = document.querySelector('.hero-page1__video');
      const backgroundStyle = heroBackground ? window.getComputedStyle(heroBackground) : null;
      const videoStyle = heroVideo ? window.getComputedStyle(heroVideo) : null;

      return {
        contentInsideHero: Boolean(
          hero &&
          content &&
          content.top >= hero.top - 1 &&
          content.left >= hero.left - 1 &&
          content.right <= hero.right + 1 &&
          content.bottom <= hero.bottom + 1
        ),
        contentOverlapsBottomLinks: overlaps(content, bottomLeft) || overlaps(content, bottomRight),
        pageOverflow: Math.ceil(document.documentElement.scrollWidth - window.innerWidth),
        heroBackgroundDisplay: backgroundStyle ? backgroundStyle.display : null,
        heroVideoFilter: videoStyle ? videoStyle.filter : null,
        heroVideoOpacity: videoStyle ? videoStyle.opacity : null,
      };
    });

    expect(heroLayout.contentInsideHero).toBe(true);
    expect(heroLayout.contentOverlapsBottomLinks).toBe(false);
    expect(heroLayout.pageOverflow).toBeLessThanOrEqual(1);
    expect(heroLayout.heroBackgroundDisplay).toBe('none');
    expect(heroLayout.heroVideoFilter).toBe('none');
    expect(heroLayout.heroVideoOpacity).toBe('1');

    await page.goto('/index.html#page-3');
    const page3Image = page.locator(`#page-3 img[src="${page3ImagePath}"]`);
    await expect(page3Image).toHaveAttribute('alt', /expériences immersives/i);

    const imageLoaded = await page3Image.evaluate((img) => img.complete && img.naturalWidth > 0 && img.naturalHeight > 0);
    expect(imageLoaded).toBe(true);

    const overflow = await page.evaluate(() => Math.ceil(document.documentElement.scrollWidth - window.innerWidth));
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
