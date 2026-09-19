const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Issue #37, Lighthouse « Touch targets do not have sufficient size or spacing », critère WCAG 2.5.8 (AA).
// Les liens du pied de page et le lien « Ils nous ont fait confiance » étaient des liens en ligne sans marge
// interne : 20 à 22 px de haut, sous le minimum de 24 px, et loin du seuil tactile de 44 px appliqué ailleurs
// sur le site. Ils reçoivent une hauteur de cible, sans changer l'aspect du texte.
const MIN = 44;
const pages = fs.readdirSync(path.join(__dirname, '..', 'src')).filter((f) => f.endsWith('.html')).sort();

for (const [largeur, hauteur] of [[1350, 940], [768, 1024], [412, 823]]) {
  test(`T37 - Pied de page : cibles d'au moins ${MIN} px et sans chevauchement, à ${largeur}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Tailles fixées par le test : exécuté une seule fois.');
    await page.setViewportSize({ width: largeur, height: hauteur });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const petites = [];
    const chevauchements = [];
    for (const fichier of pages) {
      await page.goto('/' + fichier, { waitUntil: 'domcontentloaded' });
      const r = await page.evaluate(() => {
        const liens = Array.from(document.querySelectorAll('.footer__nav-list a')).filter((a) => a.getClientRects().length);
        return liens.map((a) => { const q = a.getBoundingClientRect(); return { nom: a.textContent.trim().slice(0, 22), l: q.width, h: q.height, gauche: q.left, droite: q.right, haut: q.top, bas: q.bottom }; });
      });
      expect(r.length, `${fichier} : liens du pied de page trouvés`).toBeGreaterThanOrEqual(8);
      r.forEach((a) => { if (a.h < MIN || a.l < MIN) petites.push(`${fichier} « ${a.nom} » ${Math.round(a.l)}x${Math.round(a.h)}`); });
      for (let i = 0; i < r.length; i += 1) {
        for (let j = i + 1; j < r.length; j += 1) {
          const a = r[i]; const b = r[j];
          if (a.gauche < b.droite && a.droite > b.gauche && a.haut < b.bas && a.bas > b.haut) chevauchements.push(`${fichier} « ${a.nom} » × « ${b.nom} »`);
        }
      }
    }
    expect(petites, `cibles sous ${MIN} px`).toEqual([]);
    expect(chevauchements, 'cibles qui se chevauchent').toEqual([]);
  });
}

test('T37 - Accueil : le lien « Ils nous ont fait confiance » est une cible suffisante', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle de géométrie : exécuté une seule fois.');
  await page.setViewportSize({ width: 1350, height: 940 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/index.html');
  await page.evaluate(() => document.fonts.ready);
  const m = await page.evaluate(() => {
    const a = document.querySelector('.hero-page1__partners a');
    const q = a.getBoundingClientRect();
    const voisins = Array.from(document.querySelectorAll('#page-1 a, #page-1 button, .site-header a, .site-header button')).filter((e) => e !== a && e.getClientRects().length).map((e) => { const r = e.getBoundingClientRect(); return { nom: (e.getAttribute('aria-label') || e.textContent.trim()).slice(0, 22), gauche: r.left, droite: r.right, haut: r.top, bas: r.bottom }; });
    return { l: q.width, h: q.height, gauche: q.left, droite: q.right, haut: q.top, bas: q.bottom, voisins, deborde: document.documentElement.scrollWidth > innerWidth + 1 };
  });
  expect(m.h, 'hauteur de la cible').toBeGreaterThanOrEqual(MIN);
  expect(m.l, 'largeur de la cible').toBeGreaterThanOrEqual(MIN);
  for (const v of m.voisins) {
    const croise = m.gauche < v.droite && m.droite > v.gauche && m.haut < v.bas && m.bas > v.haut;
    expect(croise, `chevauche « ${v.nom} »`).toBe(false);
  }
  expect(m.deborde).toBe(false);
});
