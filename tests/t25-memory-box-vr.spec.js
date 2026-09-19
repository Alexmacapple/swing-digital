const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const html = () => fs.readFileSync(path.resolve(__dirname, '..', 'src', 'memory-box-vr.html'), 'utf8');

const PRESENTATION = [
  "Équipé·e d'un casque VR, l'utilisateur·rice active par sa présence les mémoires sensibles de Marilyn - sonores, visuelles, textuelles, graphiques - dans un espace multidimensionnel.",
  'Une voix, des sons, des images, des archives se déclenchent et composent une rencontre singulière. Ici, Marilyn déconstruit les narrations fabriquées sur elle et fait émerger sa propre voix.',
  "L'utilisateur·rice traverse la métamorphose d'une jeune femme et l'accompagne dans la construction de son rêve : devenir actrice.",
];

test.describe('T25 - Memory Box VR : texte de présentation', () => {
  test('les trois formulations à retirer ont disparu, métadonnées comprises', () => {
    const h = html();
    expect(h).not.toMatch(/Faire surgir l['’]émotion/);
    expect(h).not.toMatch(/dispose désormais de sa propre page projet/);
    expect(h).not.toMatch(/Exports de présentation/);
  });

  test('le texte de présentation est en place, mot pour mot, dans l’ordre', () => {
    const h = html();
    let position = -1;
    for (const paragraphe of PRESENTATION) {
      const i = h.indexOf(`<p>${paragraphe}</p>`);
      expect(i, paragraphe.slice(0, 40)).toBeGreaterThan(position);
      position = i;
    }
  });

  test('le rattachement à L’Expérience Monroe et les deux visuels sont conservés', () => {
    const h = html();
    expect(h).toContain('<a href="experience-monroe.html">L’Expérience Monroe</a>');
    expect(h).toContain('img/pages/memory-box-vr/memory-box-vr-1.jpg');
    expect(h).toContain('img/pages/memory-box-vr/memory-box-vr-2.jpg');
    expect(h.match(/<h1[ >]/g)).toHaveLength(1);
  });

  test('la page rendue affiche la présentation sans débordement', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/memory-box-vr.html');
    for (const paragraphe of PRESENTATION) await expect(page.getByText(paragraphe, { exact: true })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(overflow).toBe(false);
  });
});
