const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const html = () => fs.readFileSync(path.resolve(__dirname, '..', 'src', 'espaces-augmentes.html'), 'utf8');

const DEFINITION = "Un espace augmenté est un lieu physique transformé en espace narratif par la réalité mixte, le son, l'image, le jeu d'acteur et l'interaction. Chez Swing Digital, en partenariat avec les studios Pixihead, ce format sert des récits où le public marche, observe et traverse l'histoire plutôt que de la regarder à distance.";

test.describe('T19 - Espaces augmentés : texte actualisé', () => {
  test('la définition est celle de la cliente, mot pour mot', () => {
    const h = html();
    expect(h).toContain(`<p class="seo-geo-panel__answer">${DEFINITION}</p>`);
    expect(h).not.toContain('des récits culturels où');
  });

  test('le tableau des faits clés porte le nouveau titre', () => {
    const h = html();
    expect(h).toContain("<caption>Les espaces augmentés Swing Digital/Pixihead, l'essentiel</caption>");
    expect(h).not.toContain('Faits clés sur les espaces augmentés Swing Digital');
  });

  test('« Marcher, observer, se laisser surprendre » est réduit d’un cran et reste lisible', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Mesure typographique exécutée une seule fois.');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/espaces-augmentes.html');
    const m = await page.evaluate(() => {
      const px = (v) => parseFloat(getComputedStyle(document.documentElement).getPropertyValue(v));
      const probe = (token) => { const e = document.createElement('span'); e.style.fontSize = `var(${token})`; document.body.appendChild(e); const s = parseFloat(getComputedStyle(e).fontSize); e.remove(); return s; };
      return { sousTitre: parseFloat(getComputedStyle(document.querySelector('.page5__subtitle')).fontSize), xl: probe('--size-xl'), lg: probe('--size-lg'), md: probe('--size-md') };
    });
    expect(m.sousTitre).toBeCloseTo(m.lg, 1);
    expect(m.sousTitre).toBeLessThan(m.xl);
    expect(m.sousTitre).toBeGreaterThan(m.md);
  });

  test('la page rendue affiche la définition sans débordement', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/espaces-augmentes.html');
    await expect(page.locator('.seo-geo-panel__answer')).toHaveText(DEFINITION);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(overflow).toBe(false);
  });
});
