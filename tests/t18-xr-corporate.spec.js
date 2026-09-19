const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const srcDir = path.join(repoRoot, 'src');

function readSrc(relativePath) {
  return fs.readFileSync(path.join(srcDir, relativePath), 'utf8');
}

async function checkLayout(page) {
  // Les apparitions au défilement translatent les blocs : mesurer sans animation.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/xr-corporate.html');
  const lines = await page.locator('.page57__nowrap').evaluate((el) => el.getClientRects().length);
  expect(lines, 'team-building doit tenir sur une seule ligne').toBe(1);

  // L'image est en loading="lazy" : attendre son chargement, puis tout mesurer en un seul passage.
  await page.locator('.page57__photo').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => {
    const img = document.querySelector('.page57__photo');
    return img && img.complete && img.naturalWidth > 0;
  });
  const m = await page.evaluate(() => {
    const img = document.querySelector('.page57__photo');
    const photo = img.getBoundingClientRect();
    const cta = document.querySelector('.page57__cta').getBoundingClientRect();
    const section = document.querySelector('.page57').getBoundingClientRect();
    return {
      gap: cta.top - photo.bottom,
      ratio: Math.abs(photo.width / photo.height - img.naturalWidth / img.naturalHeight),
      ctaInsideSection: cta.bottom <= section.bottom + 1,
      photoHeight: photo.height,
    };
  });
  expect(m.gap, 'le CTA doit être sous l’image, avec un espace régulier').toBeGreaterThanOrEqual(8);
  expect(m.gap, 'le CTA doit être sous l’image, avec un espace régulier').toBeLessThanOrEqual(64);
  expect(m.ratio, 'l’image ne doit pas être déformée').toBeLessThan(0.02);
  expect(m.ctaInsideSection, 'le CTA ne doit pas sortir de la section').toBe(true);
  expect(m.photoHeight, 'l’image doit rester visible').toBeGreaterThan(120);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(overflow, 'aucun débordement horizontal').toBe(false);
}

test.describe('T18 - XR Corporate page 57', () => {
  test('team-building est protégé contre la coupure', () => {
    expect(readSrc('xr-corporate.html')).toContain('<span class="page57__nowrap">team-building</span>');
  });

  test('le CTA est dans la colonne visuelle, après l’image, et une seule fois', () => {
    const html = readSrc('xr-corporate.html');
    const visual = html.match(/<div class="page57__visual">[\s\S]*?<\/div>/)[0];
    expect(visual).toMatch(/<img[\s\S]*class="page57__cta"/);
    expect(html.match(/class="page57__cta"/g)).toHaveLength(1);
  });

  test('la feuille de style de la page est versionnée pour T18', () => {
    expect(readSrc('xr-corporate.html')).toContain('css/style.css?v=20260919-t18-mailto');
  });

  test('« Contactez-nous » est un lien actif vers l’adresse de contact', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/xr-corporate.html');
    const lien = page.locator('.page57__cta a');
    await expect(lien).toHaveCount(1);
    await expect(lien).toHaveAttribute('href', 'mailto:production@swingdigitalproduction.com');
    await expect(lien).toHaveText('Contactez-nous pour en discuter.');
    const style = await lien.evaluate((a) => {
      const cs = getComputedStyle(a); const parent = getComputedStyle(a.parentElement);
      return { memeCouleur: cs.color === parent.color, souligne: cs.textDecorationLine.includes('underline') };
    });
    expect(style.memeCouleur, 'le lien garde la couleur lisible du texte sur fond rose').toBe(true);
    expect(style.souligne, 'le lien reste reconnaissable sans la couleur').toBe(true);
    await lien.focus();
    await expect(lien).toBeFocused();
  });

  test('mise en page conforme à la largeur du projet', async ({ page }) => {
    await checkLayout(page);
  });

  test('mise en page conforme à 320 px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await checkLayout(page);
  });
});
