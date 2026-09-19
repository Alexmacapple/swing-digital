const { test, expect } = require('@playwright/test');

// Référence : export de la cliente (toulouse-lautrec-2). Galerie « justifiée » : chaque photo est entière,
// les photos d'une même rangée ont la même hauteur et la rangée remplit la largeur.
// Sur le site les sept photos étaient en object-fit: cover dans des cases égales : 22 à 52 % de rognage.
for (const largeur of [1920, 1440, 1024, 768, 390]) {
  test(`T14 - Toulouse-Lautrec : galerie de photos entières à ${largeur}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Largeurs fixées par le test : exécuté une seule fois.');
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/toulouse-lautrec.html');
    await page.evaluate(() => { document.querySelectorAll('#page-54 img').forEach((i) => { i.loading = 'eager'; }); });
    await page.locator('#page-54 img').last().scrollIntoViewIfNeeded();
    await page.waitForFunction(() => Array.from(document.querySelectorAll('#page-54 img')).every((i) => i.complete && i.naturalWidth > 0));
    const m = await page.evaluate(() => {
      const s = document.querySelector('#page-54'); const g = s.querySelector('.page54__mosaic').getBoundingClientRect();
      return {
        galerie: { gauche: g.left, largeur: g.width, bas: g.bottom },
        photos: Array.from(s.querySelectorAll('.page54__photo-image')).map((i) => {
          const r = i.getBoundingClientRect(); const nat = i.naturalWidth / i.naturalHeight;
          return { rognage: Math.abs(r.width / r.height - nat) / nat, haut: Math.round(r.top), hauteur: r.height, largeur: r.width, bas: r.bottom };
        }),
        texteHaut: s.querySelector('.page54__text').getBoundingClientRect().top,
        coupe: s.scrollHeight - s.clientHeight, deborde: document.documentElement.scrollWidth > innerWidth + 1,
      };
    });
    expect(m.photos).toHaveLength(7);
    m.photos.forEach((p, k) => expect(p.rognage, `photo ${k + 1} entière`).toBeLessThan(0.03));
    const rangees = {};
    m.photos.forEach((p) => { const cle = Object.keys(rangees).find((h) => Math.abs(h - p.haut) <= 3) ?? p.haut; (rangees[cle] = rangees[cle] || []).push(p); });
    for (const r of Object.values(rangees)) {
      const hauteurs = r.map((p) => p.hauteur);
      expect(Math.max(...hauteurs) - Math.min(...hauteurs), 'photos d\'une rangée de même hauteur (px)').toBeLessThanOrEqual(4);
      const somme = r.reduce((a, p) => a + p.largeur, 0);
      expect(somme / m.galerie.largeur, 'la rangée remplit la largeur de la galerie').toBeGreaterThan(0.95);
      expect(somme / m.galerie.largeur).toBeLessThanOrEqual(1.001);
    }
    expect(Math.max(...m.photos.map((p) => p.bas)), 'le texte suit la galerie sans la recouvrir').toBeLessThanOrEqual(m.texteHaut + 1);
    expect(m.coupe).toBeLessThanOrEqual(2);
    expect(m.deborde).toBe(false);
  });
}
