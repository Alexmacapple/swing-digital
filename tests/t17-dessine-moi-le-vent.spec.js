const { test, expect } = require('@playwright/test');

// Référence : exports de la cliente (dessine-moi-le-vent-1 et -2). Demande : « corriger […] les images tronquées,
// les logos instables et ajouter le coproducteur à côté de Swing Digital sur la première page ».
test('T17 - Dessine-moi le vent : le coproducteur figure à côté de Swing Digital', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle de texte : exécuté une seule fois.');
  await page.goto('/dessine-moi-le-vent.html');
  await expect(page.locator('#page-46 .page46__brand')).toHaveText('Swing Digital - EJT Labo');
});

for (const largeur of [1920, 1440, 1024, 768, 390]) {
  test(`T17 - Dessine-moi le vent : photos entières et logos stables à ${largeur}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Largeurs fixées par le test : exécuté une seule fois.');
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.route('**/player.vimeo.com/**', (r) => r.abort());
    await page.goto('/dessine-moi-le-vent.html');
    await page.evaluate(() => { document.querySelectorAll('#page-47 img').forEach((i) => { i.loading = 'eager'; }); });
    await page.locator('#page-47 .page47__logo').last().scrollIntoViewIfNeeded();
    await page.waitForFunction(() => Array.from(document.querySelectorAll('#page-47 img')).every((i) => i.complete && i.naturalWidth > 0));
    const m = await page.evaluate(() => {
      const s = document.querySelector('#page-47');
      const lire = (i) => { const r = i.getBoundingClientRect(); const nat = i.naturalWidth / i.naturalHeight; return { ecart: Math.abs(r.width / r.height - nat) / nat, gauche: r.left, droite: r.right, haut: r.top, bas: r.bottom, hauteur: r.height }; };
      return {
        photos: Array.from(s.querySelectorAll('.page47__gallery-image')).map(lire), logos: Array.from(s.querySelectorAll('.page47__logo')).map(lire),
        coupe: s.scrollHeight - s.clientHeight, deborde: document.documentElement.scrollWidth > innerWidth + 1,
      };
    });
    expect(m.photos).toHaveLength(3);
    m.photos.forEach((p, k) => expect(p.ecart, `photo ${k + 1} entière`).toBeLessThan(0.03));
    const [paysage1, portrait, paysage2] = m.photos;
    expect(paysage2.haut, 'les deux photos paysage sont empilées').toBeGreaterThanOrEqual(paysage1.bas - 1);
    expect(portrait.gauche, 'la photo portrait est à leur droite').toBeGreaterThanOrEqual(paysage1.droite - 1);
    expect(Math.abs((paysage2.bas - paysage1.haut) - portrait.hauteur) / portrait.hauteur, 'pile de gauche et portrait de même hauteur').toBeLessThan(0.03);
    // Logos stables : la boîte de chaque logo épouse son dessin (plus de boîte large autour d'un dessin minuscule).
    m.logos.forEach((l, k) => expect(l.ecart, `logo ${k + 1} : boîte aux proportions du dessin`).toBeLessThan(0.05));
    expect(m.coupe).toBeLessThanOrEqual(2);
    expect(m.deborde).toBe(false);
  });
}
