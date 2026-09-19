const { test, expect } = require('@playwright/test');

// Référence : export de la cliente. Une grande photo entière sur fond blanc,
// légende sous la photo, alignée sur son bord gauche (« le copyright ne se balade pas »).
for (const largeur of [1920, 1440, 1024, 768, 390]) {
  test(`T27 - Photographies page 26 : légende alignée sur la photo à ${largeur}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Largeurs fixées par le test : exécuté une seule fois.');
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/monroe-photographie.html');
    const img = page.locator('.page26__image');
    await img.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => { const i = document.querySelector('.page26__image'); return i.complete && i.naturalWidth > 0; });
    const m = await page.evaluate(() => {
      const s = document.querySelector('#page-26'); const i = s.querySelector('.page26__image'); const c = s.querySelector('.page26__credit');
      const r = i.getBoundingClientRect(); const rc = c.getBoundingClientRect(); const nat = i.naturalWidth / i.naturalHeight;
      // rectangle réellement peint (object-fit: contain peut laisser des marges dans la boîte)
      const box = r.width / r.height; const peintL = box > nat ? r.height * nat : r.width; const peintGauche = r.left + (r.width - peintL) / 2;
      return {
        ecartGauche: Math.abs(rc.left - peintGauche), sous: rc.top - r.bottom, rognage: Math.abs(box - nat) / nat,
        legendeDansPhoto: rc.right <= peintGauche + peintL + 2,
        coupe: s.scrollHeight - s.clientHeight, deborde: document.documentElement.scrollWidth > innerWidth + 1,
        largeurPhoto: peintL / innerWidth, hauteurPhoto: (peintL / nat) / innerHeight,
      };
    });
    expect(m.ecartGauche, 'écart entre le bord gauche de la photo et celui de la légende (px)').toBeLessThanOrEqual(2);
    expect(m.sous, 'légende sous la photo (px)').toBeGreaterThanOrEqual(0);
    expect(m.sous).toBeLessThanOrEqual(24);
    expect(m.legendeDansPhoto, 'légende contenue dans la largeur de la photo').toBe(true);
    expect(m.rognage, 'photo entière et non déformée').toBeLessThan(0.02);
    expect(m.largeurPhoto > 0.6 || m.hauteurPhoto > 0.7, 'la photo remplit la largeur ou la hauteur disponible').toBe(true);
    expect(m.coupe).toBeLessThanOrEqual(2);
    expect(m.deborde).toBe(false);
  });
}
