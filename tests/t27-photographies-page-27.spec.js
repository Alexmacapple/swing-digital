const { test, expect } = require('@playwright/test');

// Référence : export de la cliente (photographies-3). Titre « IA - milton greene »,
// triptyque entier sur fond blanc, légende en italique sous la photo, alignée sur son bord gauche.
// La section vivait dans l'onglet Composition : elle rejoint l'onglet Photographies.
test('T27 - Photographies page 27 : la section a quitté Composition pour Photographies', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle de structure : exécuté une seule fois.');
  await page.goto('/monroe-photographie.html');
  const ordre = await page.evaluate(() => Array.from(document.querySelectorAll('main section[id]')).map((s) => s.id));
  expect(ordre.indexOf('page-27'), 'page-27 placée juste après page-26').toBe(ordre.indexOf('page-26') + 1);
  await expect(page.locator('#page-27 h2')).toHaveText('IA - milton greene');
  await expect(page.locator('#page-27 img')).toHaveAttribute('alt', /.+/);
  await page.goto('/monroe-composition.html');
  await expect(page.locator('#page-27')).toHaveCount(0);
});

test('T27 - Photographies page 27 : l\'ancienne ancre de l\'accueil mène à Photographies', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle de redirection : exécuté une seule fois.');
  // Sonde de l'URL sans attendre « load » : l'accueil et sa vidéo sont lents sous la charge de la suite complète.
  await page.goto('/index.html#page-27', { waitUntil: 'commit' });
  // Le suivi du défilement peut ensuite ajouter un « #page-NN » à l'URL.
  await expect(page).toHaveURL(/\/monroe-photographie\.html(#.*)?$/, { timeout: 20000 });
});

for (const largeur of [1920, 1440, 1024, 768, 390]) {
  test(`T27 - Photographies page 27 : photo entière et légende alignée à ${largeur}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Largeurs fixées par le test : exécuté une seule fois.');
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/monroe-photographie.html');
    const img = page.locator('#page-27 .page27__image');
    await img.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => { const i = document.querySelector('#page-27 .page27__image'); return i.complete && i.naturalWidth > 0; });
    const m = await page.evaluate(() => {
      const s = document.querySelector('#page-27'); const i = s.querySelector('.page27__image');
      const c = s.querySelector('.page27__credit'); const t = s.querySelector('.page27__title');
      const r = i.getBoundingClientRect(); const rc = c.getBoundingClientRect(); const rt = t.getBoundingClientRect();
      const nat = i.naturalWidth / i.naturalHeight;
      // rectangle réellement peint (object-fit: contain peut laisser des marges dans la boîte)
      const box = r.width / r.height; const peintL = box > nat ? r.height * nat : r.width; const peintGauche = r.left + (r.width - peintL) / 2;
      return {
        ecartGauche: Math.abs(rc.left - peintGauche), sous: rc.top - r.bottom, rognage: Math.abs(box - nat) / nat,
        legendeDansPhoto: rc.right <= peintGauche + peintL + 2,
        titreAuDessus: r.top - rt.bottom, ecartTitre: Math.abs(rt.left - peintGauche),
        italique: getComputedStyle(c).fontStyle, couleurTitre: getComputedStyle(t).color,
        coupe: s.scrollHeight - s.clientHeight, deborde: document.documentElement.scrollWidth > innerWidth + 1,
        largeurPhoto: peintL / innerWidth, hauteurPhoto: (peintL / nat) / innerHeight,
      };
    });
    expect(m.ecartGauche, 'écart entre le bord gauche de la photo et celui de la légende (px)').toBeLessThanOrEqual(2);
    expect(m.sous, 'légende sous la photo (px)').toBeGreaterThanOrEqual(0);
    expect(m.sous).toBeLessThanOrEqual(24);
    expect(m.legendeDansPhoto, 'légende contenue dans la largeur de la photo').toBe(true);
    expect(m.titreAuDessus, 'titre au-dessus de la photo (px)').toBeGreaterThanOrEqual(0);
    expect(m.ecartTitre, 'titre aligné sur le bord gauche de la photo (px)').toBeLessThanOrEqual(2);
    expect(m.italique, 'légende en italique comme sur l\'export').toBe('italic');
    // Écart volontaire avec l'export (titre jaune) : rose de marque conservé pour le contraste sur fond blanc.
    expect(m.couleurTitre).toBe('rgb(181, 54, 78)');
    expect(m.rognage, 'photo entière et non déformée').toBeLessThan(0.02);
    expect(m.largeurPhoto > 0.6 || m.hauteurPhoto > 0.5, 'la photo remplit la largeur ou la hauteur disponible').toBe(true);
    expect(m.coupe).toBeLessThanOrEqual(2);
    expect(m.deborde).toBe(false);
  });
}
