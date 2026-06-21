const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const srcDir = path.join(repoRoot, 'src');

function readSrc(relativePath) {
  return fs.readFileSync(path.join(srcDir, relativePath), 'utf8');
}

test.describe('PRD-016 - contact, adresse et logo', () => {
  test('le bloc contact source affiche la marque courte et la nouvelle adresse', ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle source exécuté une seule fois.');

    const html = readSrc('index.html');
    const legal = readSrc('mentions-legales.html');

    expect(html).toContain('<p class="page62__brand">Swing Digital</p>');
    expect(html).toContain('59, rue du Département');
    expect(html).toContain('75018 Paris');
    expect(html).not.toContain('S w i n g &nbsp; D i g i t a l &nbsp; Production');
    expect(html).not.toContain('C/O Liberty');
    expect(html).not.toContain('35-37 rue d\'Artois');
    expect(html).not.toContain('75008 Paris');

    expect(legal).toContain('Swing Digital Production');
    expect(legal).toContain('[Nom de l\'hébergeur]');
  });

  test('la section contact se rend sans débordement horizontal', async ({ page }) => {
    await page.goto('/index.html#page-62');

    const contact = page.locator('#page-62');
    await expect(contact).toBeVisible();
    await expect(page.locator('.page62__brand')).toHaveText('Swing Digital');
    await expect(page.locator('.page62__address')).toContainText('59, rue du Département');
    await expect(page.locator('.page62__address')).toContainText('75018 Paris');

    const overflow = await page.evaluate(() => Math.ceil(document.documentElement.scrollWidth - window.innerWidth));
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
