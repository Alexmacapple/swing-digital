const { test, expect } = require('@playwright/test');

// Référence : export de la cliente (voyage-autour-de-moi-1). Demande : « corriger la mise en page de la page de groupe ».
// Sur l'export : bandeau noir des prix, puis la photo de la troupe entière, titre posé dessus, logos en bas.
// Sur le site la photo était un fond en object-fit: cover : la troupe était coupée de 53 à 69 % sur mobile.
for (const largeur of [1920, 1440, 1024, 768, 390]) {
  test(`T16 - Voyage autour de moi : troupe entière sur la page de groupe à ${largeur}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Largeurs fixées par le test : exécuté une seule fois.');
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.route('**/player.vimeo.com/**', (r) => r.abort());
    await page.goto('/voyage-autour-de-moi.html');
    await page.evaluate(() => { document.querySelectorAll('#page-43 img').forEach((i) => { i.loading = 'eager'; }); });
    await page.locator('#page-43 .page43__logo').last().scrollIntoViewIfNeeded();
    await page.waitForFunction(() => Array.from(document.querySelectorAll('#page-43 img')).every((i) => i.complete && i.naturalWidth > 0));
    const m = await page.evaluate(() => {
      const s = document.querySelector('#page-43'); const rs = s.getBoundingClientRect();
      const rect = (sel) => s.querySelector(sel).getBoundingClientRect();
      const i = s.querySelector('.page43__background-image'); const r = i.getBoundingClientRect(); const nat = i.naturalWidth / i.naturalHeight;
      return {
        rognage: Math.abs(r.width / r.height - nat) / nat, photo: { haut: r.top, bas: r.bottom, gauche: r.left, droite: r.right, largeur: r.width / rs.width },
        prix: rect('.page43__awards'), titre: rect('.page43__title'), sousTitre: rect('.page43__subtitle'), logos: rect('.page43__logos'),
        boitesLogos: Array.from(s.querySelectorAll('.page43__logo')).map((l) => { const q = l.getBoundingClientRect(); const n = l.naturalWidth / l.naturalHeight; return Math.abs(q.width / q.height - n) / n; }),
        hauteur: rs.height, ecran: innerHeight - document.querySelector('.site-header').getBoundingClientRect().height,
        coupe: s.scrollHeight - s.clientHeight, deborde: document.documentElement.scrollWidth > innerWidth + 1,
      };
    });
    expect(m.rognage, 'photo de la troupe entière').toBeLessThan(0.02);
    // Garde-fou : sur un écran de 900 px de haut, le bandeau des prix et les logos (230 px) limitent la photo par la hauteur.
    expect(m.photo.largeur, 'photo large dans la section').toBeGreaterThan(0.65);
    expect(m.prix.bottom, 'bandeau des prix au-dessus de la photo').toBeLessThanOrEqual(m.photo.haut + 1);
    expect(m.titre.top, 'titre posé sur la photo').toBeGreaterThanOrEqual(m.photo.haut);
    expect(m.sousTitre.bottom).toBeLessThanOrEqual(m.photo.bas);
    expect(m.logos.top, 'logos sous la photo').toBeGreaterThanOrEqual(m.photo.bas - 1);
    m.boitesLogos.forEach((e, k) => expect(e, `logo ${k + 1} : boîte aux proportions du dessin`).toBeLessThan(0.05));
    if (largeur >= 1024) expect(m.hauteur, 'page visible d\'un seul tenant').toBeLessThanOrEqual(m.ecran + 8);
    expect(m.coupe).toBeLessThanOrEqual(2);
    expect(m.deborde).toBe(false);
  });
}
