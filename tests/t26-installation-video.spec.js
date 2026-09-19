const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const html = () => fs.readFileSync(path.resolve(__dirname, '..', 'src', 'monroe-installation.html'), 'utf8');

test.describe('T26 - Installation : vidéo de la Galerie Joseph', () => {
  test('la page porte la vidéo fournie, avec un intitulé exact', () => {
    const iframe = html().match(/<iframe id="vimeo-installation"[\s\S]*?<\/iframe>/);
    expect(iframe, 'iframe vimeo-installation absente').not.toBeNull();
    expect(iframe[0]).toContain('player.vimeo.com/video/872268258?h=3388b7d89c');
    expect(iframe[0]).toContain('title="L’Expérience Monroe à la Galerie Joseph, vidéo de l’installation"');
    expect(html().match(/<iframe/g)).toHaveLength(1);
  });

  test('le bloc vidéo suit la section de la page 23 et la page garde un seul h1', () => {
    const h = html();
    expect(h.indexOf('id="installation-video"')).toBeGreaterThan(h.indexOf('id="page-23"'));
    expect(h.indexOf('id="installation-video"')).toBeLessThan(h.indexOf('</main>'));
    expect(h.match(/<h1[ >]/g)).toHaveLength(1);
    expect(h.match(/class="page11__play-btn"/g)).toHaveLength(1);
  });

  test('la vidéo est visible, sans débordement', async ({ page }) => {
    await page.route('**/player.vimeo.com/**', (r) => r.abort());
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/monroe-installation.html');
    const iframe = page.locator('#vimeo-installation');
    await iframe.scrollIntoViewIfNeeded();
    await expect(iframe).toBeVisible();
    const box = await iframe.boundingBox();
    expect(box.width).toBeGreaterThan(200);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(overflow).toBe(false);
  });
});
