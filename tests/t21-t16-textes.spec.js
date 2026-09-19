const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..', 'src');
const readSrc = (p) => fs.readFileSync(path.join(srcDir, p), 'utf8');

test.describe('T21 - Expérience Monroe : « Interactive Exhibition » devient « Installation »', () => {
  test('plus aucune occurrence visible ou vocalisée de « Interactive Exhibition »', () => {
    const html = readSrc('experience-monroe.html');
    expect(html).not.toMatch(/interactive exhibition/i);
    expect(html).toContain('<h2 id="page24-title">Installation</h2>');
    expect(html).toContain('aria-label="Volets de l\'installation"');
  });

  test('le titre rendu de la section est « Installation »', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/experience-monroe.html');
    await expect(page.locator('#page24-title')).toHaveText('Installation');
    await expect(page.getByRole('region', { name: "Volets de l'installation" })).toHaveCount(1);
  });
});

test.describe('T16 - Voyage autour de moi : première phrase du pitch', () => {
  test('la phrase demandée remplace l’ancienne, mot pour mot', () => {
    const html = readSrc('voyage-autour-de-moi.html');
    expect(html).toContain('<p class="page44__description">Des adolescents d\'Épinay-sur-Seine prennent la parole sur l\'amour.</p>');
    expect(html).not.toContain("Des ados d'Épinay-sur-Seine parlent d'amour");
  });

  test('la phrase est visible et tient dans sa section, sans débordement', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/voyage-autour-de-moi.html');
    const pitch = page.locator('.page44__description');
    await pitch.scrollIntoViewIfNeeded();
    await expect(pitch).toBeVisible();
    await expect(pitch).toHaveText("Des adolescents d'Épinay-sur-Seine prennent la parole sur l'amour.");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(overflow).toBe(false);
  });
});
