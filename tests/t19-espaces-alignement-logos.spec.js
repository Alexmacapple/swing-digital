const { test, expect } = require('@playwright/test');

// Issue #19, mots de la cliente : « Aligner l'image sur le texte ? » et « Le logo de swing digital et principe actif
// se baladent ». Le texte actualisé (Pixihead, « des récits ») est déjà couvert par tests/t19-espaces-augmentes.spec.js.
// La page Espaces augmentés ne porte aucun logo : la remarque précède, dans son retour, le lien vers Ni vues ni connues,
// dont la première page porte ces deux logos — c'est là qu'ils « se baladent ».
for (const largeur of [1920, 1440, 1024, 768, 390]) {
  test(`T19 - Espaces augmentés : image alignée sur le texte à ${largeur}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Largeurs fixées par le test : exécuté une seule fois.');
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/espaces-augmentes.html');
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => { const i = document.querySelector('#page-5 .page5__image'); return i.complete && i.naturalWidth > 0; });
    const m = await page.evaluate(() => {
      const s = document.querySelector('#page-5');
      const gaucheTexte = (e) => { const r = document.createRange(); r.selectNodeContents(e); return Math.min(...Array.from(r.getClientRects()).filter((x) => x.width > 1).map((x) => x.left)); };
      const i = s.querySelector('.page5__image'); const r = i.getBoundingClientRect(); const nat = i.naturalWidth / i.naturalHeight;
      return { titre: gaucheTexte(s.querySelector('.page5__title')), sousTitre: gaucheTexte(s.querySelector('.page5__subtitle')), image: r.left, rognage: Math.abs(r.width / r.height - nat) / nat, coupe: s.scrollHeight - s.clientHeight, deborde: document.documentElement.scrollWidth > innerWidth + 1 };
    });
    expect(Math.abs(m.image - m.titre), 'bord gauche de l\'image aligné sur celui du titre (px)').toBeLessThanOrEqual(2);
    expect(Math.abs(m.sousTitre - m.titre), 'sous-titre aligné sur le titre (px)').toBeLessThanOrEqual(2);
    expect(m.rognage, 'image entière').toBeLessThan(0.02);
    expect(m.coupe).toBeLessThanOrEqual(2);
    expect(m.deborde).toBe(false);
  });

  test(`T19 - Ni vues ni connues : les deux logos restent groupés dans le bandeau à ${largeur}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Largeurs fixées par le test : exécuté une seule fois.');
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/ni-vues-ni-connues.html');
    await page.evaluate(() => { document.querySelectorAll('#page-48 img').forEach((i) => { i.loading = 'eager'; }); });
    await page.waitForFunction(() => Array.from(document.querySelectorAll('#page-48 img')).every((i) => i.complete && i.naturalWidth > 0));
    const m = await page.evaluate(() => {
      const s = document.querySelector('#page-48'); const imgs = Array.from(s.querySelectorAll('img'));
      const bandeau = imgs.find((i) => /page-48-image-2/.test(i.getAttribute('src'))).getBoundingClientRect();
      const logos = imgs.filter((i) => /page48__logo/.test(i.className)).map((l) => { const q = l.getBoundingClientRect(); const n = l.naturalWidth / l.naturalHeight; return { gauche: q.left, droite: q.right, haut: q.top, bas: q.bottom, milieu: (q.top + q.bottom) / 2, ecart: Math.abs(q.width / q.height - n) / n }; });
      return { bandeau: { haut: bandeau.top, bas: bandeau.bottom }, logos, deborde: document.documentElement.scrollWidth > innerWidth + 1 };
    });
    expect(m.logos).toHaveLength(2);
    m.logos.forEach((l, k) => {
      expect(l.ecart, `logo ${k + 1} : boîte aux proportions du dessin`).toBeLessThan(0.05);
      expect(l.haut, `logo ${k + 1} dans le bandeau du bas`).toBeGreaterThanOrEqual(m.bandeau.haut - 1);
      expect(l.bas).toBeLessThanOrEqual(m.bandeau.bas + 1);
    });
    const [sd, pa] = m.logos;
    expect(pa.gauche - sd.droite, 'logos côte à côte, groupés (px)').toBeGreaterThanOrEqual(0);
    expect(pa.gauche - sd.droite).toBeLessThanOrEqual(40);
    expect(Math.abs(pa.milieu - sd.milieu), 'logos centrés sur la même ligne (px)').toBeLessThanOrEqual(3);
    expect(m.deborde).toBe(false);
  });
}
