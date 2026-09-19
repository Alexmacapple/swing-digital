const { test, expect } = require('@playwright/test');

// Référence : export de la cliente (photographies-6). Titre « IA - milton greene »,
// deux photos carrées entières et de même taille, côte à côte, légende en italique sous la première,
// alignée sur son bord gauche. Dernière section de photographie à quitter l'onglet Composition.
test('T27 - Photographies page 30 : la section a quitté Composition pour Photographies', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle de structure : exécuté une seule fois.');
  await page.goto('/monroe-photographie.html');
  const ordre = await page.evaluate(() => Array.from(document.querySelectorAll('main section[id]')).map((s) => s.id));
  expect(ordre).toEqual(['page-25', 'page-26', 'page-27', 'page-28', 'page-29', 'page-30']);
  await expect(page.locator('#page-30 h2')).toHaveText('IA - milton greene');
  for (const img of await page.locator('#page-30 img').all()) await expect(img).toHaveAttribute('alt', /.+/);
});

test('T27 - Photographies page 30 : Composition ne garde aucune photographie et reste cohérente', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle de structure : exécuté une seule fois.');
  await page.goto('/monroe-composition.html');
  const c = await page.evaluate(() => ({
    sections: Array.from(document.querySelectorAll('main section[id]')).map((s) => s.id),
    niveaux: Array.from(document.querySelectorAll('main h1, main h2, main h3, main h4')).map((h) => Number(h.tagName[1])),
    partage: ['meta[property="og:image"]', 'meta[name="twitter:image"]'].map((s) => document.querySelector(s).content),
    images: Array.from(document.querySelectorAll('main img')).map((i) => i.getAttribute('src')),
  }));
  expect(c.sections).toEqual(['page-31', 'page-32']);
  // RGAA 9.1 : pas de saut de niveau après le départ des titres h2 de photographie.
  c.niveaux.forEach((n, k) => { if (k > 0) expect(n - c.niveaux[k - 1], 'saut de niveau de titre').toBeLessThanOrEqual(1); });
  // L'image de partage doit être une image encore présente dans la page.
  for (const url of c.partage) expect(c.images.some((src) => url.endsWith('/' + src)), `image de partage ${url}`).toBe(true);
});

test('T27 - Photographies page 30 : l\'ancienne ancre de l\'accueil mène à Photographies', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle de redirection : exécuté une seule fois.');
  // Sonde de l'URL sans attendre « load » : l'accueil et sa vidéo sont lents sous la charge de la suite complète.
  await page.goto('/index.html#page-30', { waitUntil: 'commit' });
  // Le suivi du défilement peut ensuite ajouter un « #page-NN » à l'URL.
  await expect(page).toHaveURL(/\/monroe-photographie\.html(#.*)?$/, { timeout: 20000 });
});

for (const largeur of [1920, 1440, 1024, 768, 390]) {
  test(`T27 - Photographies page 30 : deux photos entières de même taille à ${largeur}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Largeurs fixées par le test : exécuté une seule fois.');
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/monroe-photographie.html');
    await page.locator('#page-30 .page30__image').last().scrollIntoViewIfNeeded();
    await page.waitForFunction(() => Array.from(document.querySelectorAll('#page-30 .page30__image')).every((i) => i.complete && i.naturalWidth > 0));
    const m = await page.evaluate(() => {
      const s = document.querySelector('#page-30'); const [a, b] = Array.from(s.querySelectorAll('.page30__image')).map((i) => i.getBoundingClientRect());
      const c = s.querySelector('.page27__credit'); const rc = c.getBoundingClientRect(); const rt = s.querySelector('.page27__title').getBoundingClientRect();
      return {
        a: { l: a.left, t: a.top, w: a.width, h: a.height, b: a.bottom, r: a.right }, b: { l: b.left, t: b.top, w: b.width, h: b.height },
        fit: Array.from(s.querySelectorAll('.page30__image')).map((i) => getComputedStyle(i).objectFit),
        ecartGauche: Math.abs(rc.left - a.left), sous: rc.top - a.bottom, legendeDansPhoto: rc.right <= a.right + 2, legendeBas: rc.bottom,
        titreAuDessus: Math.min(a.top, b.top) - rt.bottom, italique: getComputedStyle(c).fontStyle,
        coupe: s.scrollHeight - s.clientHeight, deborde: document.documentElement.scrollWidth > innerWidth + 1,
        basSection: s.getBoundingClientRect().bottom, basPhotos: Math.max(a.bottom, b.bottom),
      };
    });
    // Photos carrées (1265 x 1265 et 422 x 422) : entières si la boîte est carrée.
    expect(Math.abs(m.a.w - m.a.h), 'première photo entière, non déformée').toBeLessThanOrEqual(1);
    expect(Math.abs(m.b.w - m.b.h), 'seconde photo entière, non déformée').toBeLessThanOrEqual(1);
    expect(Math.abs(m.a.w - m.b.w), 'les deux photos ont la même taille, comme sur l\'export (px)').toBeLessThanOrEqual(1);
    if (largeur >= 768) {
      expect(Math.abs(m.a.t - m.b.t), 'photos côte à côte, alignées en haut (px)').toBeLessThanOrEqual(1);
      expect(m.b.l, 'seconde photo à droite de la première').toBeGreaterThan(m.a.r);
    } else {
      expect(m.b.t, 'sur mobile, seconde photo sous la légende de la première').toBeGreaterThanOrEqual(m.legendeBas);
    }
    expect(m.ecartGauche, 'légende alignée sur le bord gauche de la première photo (px)').toBeLessThanOrEqual(2);
    expect(m.sous, 'légende sous la première photo (px)').toBeGreaterThanOrEqual(0);
    expect(m.sous).toBeLessThanOrEqual(24);
    expect(m.legendeDansPhoto, 'légende contenue dans la largeur de la première photo').toBe(true);
    expect(m.titreAuDessus, 'titre au-dessus des photos (px)').toBeGreaterThanOrEqual(0);
    expect(m.italique).toBe('italic');
    expect(m.basPhotos, 'photos contenues dans la section').toBeLessThanOrEqual(m.basSection + 1);
    expect(m.coupe).toBeLessThanOrEqual(2);
    expect(m.deborde).toBe(false);
  });
}
