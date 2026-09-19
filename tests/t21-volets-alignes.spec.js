const { test, expect } = require('@playwright/test');

// Référence : export de la cliente (experience-monroe). Demande : « aligner l'icône de l'installation avec les autres »,
// images « alignées en bas ». Quatre images de cartes sont en portrait (600 x 840), celle de l'installation en paysage
// (1272 x 815) : elle s'arrêtait à mi-hauteur de sa carte. Sur l'export elle est cadrée en portrait comme les autres.
const ORDRE = ['monroe-piece.html', 'monroe-roman-graphique.html', 'monroe-installation.html', 'memory-box-vr.html', 'serie-marilyn.html'];

for (const largeur of [1920, 1440, 1024, 768, 390]) {
  test(`T21 - L'Expérience Monroe : les cinq visuels de cartes sont alignés à ${largeur}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Largeurs fixées par le test : exécuté une seule fois.');
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.route('**/player.vimeo.com/**', (r) => r.abort());
    await page.goto('/experience-monroe.html');
    await page.evaluate(() => { document.querySelectorAll('#page-13 img').forEach((i) => { i.loading = 'eager'; }); });
    await page.locator('#page-13 .page13__card').last().scrollIntoViewIfNeeded();
    await page.waitForFunction(() => Array.from(document.querySelectorAll('#page-13 img')).every((i) => i.complete && i.naturalWidth > 0));
    const cartes = await page.evaluate(() => Array.from(document.querySelectorAll('#page-13 .page13__card')).map((c) => {
      const i = c.querySelector('.page13__card-image').getBoundingClientRect(); const w = c.querySelector('.page13__card-image-wrapper').getBoundingClientRect();
      const b = c.querySelector('.page13__card-body').getBoundingClientRect(); const q = c.getBoundingClientRect();
      return { href: c.getAttribute('href'), haut: Math.round(q.top), image: { haut: i.top, bas: i.bottom, largeur: i.width, hauteur: i.height }, cadre: { haut: w.top, bas: w.bottom }, libelleHaut: b.top };
    }));
    expect(cartes.map((c) => c.href), 'ordre des volets comme sur l\'export').toEqual(ORDRE);
    for (const c of cartes) {
      expect(Math.abs(c.image.haut - c.cadre.haut), `${c.href} : le visuel remplit son cadre en haut`).toBeLessThanOrEqual(1);
      expect(Math.abs(c.image.bas - c.cadre.bas), `${c.href} : le visuel remplit son cadre en bas`).toBeLessThanOrEqual(1);
      expect(Math.abs(c.image.bas - c.libelleHaut), `${c.href} : le libellé suit le visuel`).toBeLessThanOrEqual(1);
    }
    // Dans une même rangée : mêmes proportions de visuel, mêmes bas d'image, libellés alignés.
    const rangees = {};
    cartes.forEach((c) => { (rangees[c.haut] = rangees[c.haut] || []).push(c); });
    for (const r of Object.values(rangees)) {
      const bas = r.map((c) => c.image.bas); const ratios = r.map((c) => c.image.largeur / c.image.hauteur);
      expect(Math.max(...bas) - Math.min(...bas), 'visuels alignés en bas (px)').toBeLessThanOrEqual(1);
      expect(Math.max(...ratios) - Math.min(...ratios), 'visuels de mêmes proportions').toBeLessThan(0.02);
    }
    expect(await page.evaluate(() => { const s = document.querySelector('#page-13'); return s.scrollHeight - s.clientHeight; })).toBeLessThanOrEqual(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(false);
  });
}
