const { test, expect } = require('@playwright/test');

// Référence : exports de la cliente (interviews-1 et interviews-2). « Réinstaller les deux pages non tronquées. »
// Les trois légendes portent « Interview - réalisation Stéphanie Sphyras » ; la photo d'Amy Greene est entière,
// en pleine largeur sous le titre, légende dessous à gauche. Son bandeau « Amy Greene » est incrusté dans la photo.
test('T29 - Interviews : les trois légendes créditent la réalisation', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle de texte : exécuté une seule fois.');
  await page.goto('/monroe-interviews.html');
  const labels = await page.locator('.page34__caption-label, .page35__caption-label').allTextContents();
  expect(labels.map((t) => t.trim())).toEqual(Array(3).fill('Interview - réalisation Stéphanie Sphyras'));
  // Le bandeau est dans la photo : pas de doublon HTML par-dessus, l'information reste portée par l'alternative.
  await expect(page.locator('#page-35 .page35__overlay')).toHaveCount(0);
  await expect(page.locator('#page-35 .page35__photo')).toHaveAttribute('alt', /Amy Greene.*Milton Greene/);
});

for (const largeur of [1920, 1440, 1024, 768, 390]) {
  test(`T29 - Interviews : photo d'Amy Greene entière, légende dessous à ${largeur}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Largeurs fixées par le test : exécuté une seule fois.');
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/monroe-interviews.html');
    await page.locator('#page-35 .page35__photo').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => { const i = document.querySelector('#page-35 .page35__photo'); return i.complete && i.naturalWidth > 0; });
    const m = await page.evaluate(() => {
      const s = document.querySelector('#page-35'); const i = s.querySelector('.page35__photo');
      const r = i.getBoundingClientRect(); const nat = i.naturalWidth / i.naturalHeight;
      const c = s.querySelector('.page35__caption-label').getBoundingClientRect(); const t = s.querySelector('#page35-title').getBoundingClientRect();
      const rs = s.getBoundingClientRect();
      return {
        rognage: Math.abs(r.width / r.height - nat) / nat, largeur: r.width / rs.width,
        titreAuDessus: r.top - t.bottom, legendeSous: c.top - r.bottom, ecartGauche: Math.abs(c.left - r.left),
        hauteur: rs.height, ecran: innerHeight - document.querySelector('.site-header').getBoundingClientRect().height,
        coupe: s.scrollHeight - s.clientHeight, deborde: document.documentElement.scrollWidth > innerWidth + 1,
      };
    });
    expect(m.rognage, 'photo entière').toBeLessThan(0.02);
    // La page doit tenir à l'écran : sur un écran bas, la hauteur disponible limite la photo avant la largeur.
    expect(m.largeur, 'photo large dans la section').toBeGreaterThan(0.7);
    expect(m.titreAuDessus, 'titre au-dessus de la photo (px)').toBeGreaterThanOrEqual(0);
    expect(m.legendeSous, 'légende sous la photo (px)').toBeGreaterThanOrEqual(0);
    expect(m.legendeSous).toBeLessThanOrEqual(24);
    expect(m.ecartGauche, 'légende alignée sur le bord gauche de la photo (px)').toBeLessThanOrEqual(2);
    if (largeur >= 1024) expect(m.hauteur, 'page visible d\'un seul tenant').toBeLessThanOrEqual(m.ecran + 8);
    expect(m.coupe).toBeLessThanOrEqual(2);
    expect(m.deborde).toBe(false);
  });
}
