const { test, expect } = require('@playwright/test');

// Géométrie de référence : export de la cliente, 842 x 595 px.
// Panoramique entier en haut ; bande jaune à gauche (0 -> 32 %) ; deux photos carrées entières,
// décalées à droite (14 -> 89 %) ; légende sous la première photo ; « A -> PHOTOGRAPHIES » sur une ligne, en bas à gauche.
const LARGEURS = [1440, 1280, 1024];

for (const largeur of LARGEURS) {
  test(`T27 - Photographies page 25 conforme à l'export à ${largeur}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Largeurs fixées par le test : exécuté une seule fois.');
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/monroe-photographie.html');
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
      window.scrollTo(0, 0);
      await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 3000); }))));
    });
    const m = await page.evaluate(() => {
      const s = document.querySelector('#page-25'); const rs = s.getBoundingClientRect();
      const R = (e) => e.getBoundingClientRect();
      const rognage = (i) => { const r = R(i); return Math.abs(r.width / r.height - i.naturalWidth / i.naturalHeight) / (i.naturalWidth / i.naturalHeight); };
      const pano = s.querySelector('.page25__panoramic-image');
      const [p1, p2] = [...s.querySelectorAll('.page25__gallery-image')];
      const legende = R(s.querySelector('.page25__gallery-caption'));
      const lettre = R(s.querySelector('.page25__category-letter'));
      const titre = R(s.querySelector('#page25-title'));
      const bloc = getComputedStyle(s.querySelector('.page25__category'));
      const x = (v) => (v - rs.left) / rs.width * 100;
      return {
        rognagePano: rognage(pano), rognageP1: rognage(p1), rognageP2: rognage(p2),
        p1Gauche: x(R(p1).left), p2Droite: x(R(p2).right), carre: R(p1).width / R(p1).height,
        memeTaille: Math.abs(R(p1).width - R(p2).width) + Math.abs(R(p1).height - R(p2).height),
        legendeSousP1: legende.top >= R(p1).bottom - 1 && legende.right <= R(p1).right + 2 && legende.left >= R(p1).left - 2,
        titreSousPhotos: lettre.top >= R(p1).bottom - 1,
        memeLigne: lettre.top < titre.bottom && titre.top < lettre.bottom,
        titreAGauche: x(titre.left) < 40,
        blocTransparent: bloc.backgroundColor === 'rgba(0, 0, 0, 0)',
        bande: getComputedStyle(s.querySelector('.page25__bottom')).backgroundImage.includes('gradient'),
        coupe: s.scrollHeight - s.clientHeight,
        deborde: document.documentElement.scrollWidth > window.innerWidth + 1,
      };
    });
    expect(m.rognagePano, 'panoramique entier').toBeLessThan(0.02);
    expect(m.rognageP1, 'photo 1 entière').toBeLessThan(0.02);
    expect(m.rognageP2, 'photo 2 entière').toBeLessThan(0.02);
    expect(m.carre, 'photos carrées').toBeCloseTo(1, 1);
    expect(m.memeTaille, 'deux photos de même taille (px)').toBeLessThan(3);
    expect(m.p1Gauche, 'première photo décalée à droite (% de la largeur)').toBeGreaterThan(10);
    expect(m.p1Gauche).toBeLessThan(18);
    expect(m.p2Droite, 'seconde photo (% de la largeur)').toBeGreaterThan(84);
    expect(m.p2Droite).toBeLessThan(92);
    expect(m.legendeSousP1, 'légende sous la première photo, dans sa largeur').toBe(true);
    expect(m.titreSousPhotos, 'lettre et titre sous les photos').toBe(true);
    expect(m.memeLigne, '« A » et « PHOTOGRAPHIES » sur la même ligne').toBe(true);
    expect(m.titreAGauche, 'titre dans la partie gauche').toBe(true);
    expect(m.blocTransparent, 'plus de bloc jaune plein à droite').toBe(true);
    expect(m.bande, 'bande jaune à gauche').toBe(true);
    expect(m.coupe, 'rien de coupé par la section').toBeLessThanOrEqual(2);
    expect(m.deborde).toBe(false);
  });
}
