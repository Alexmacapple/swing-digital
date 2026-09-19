const { test, expect } = require('@playwright/test');

// Référence : exports de la cliente (composition-electroacoustique-1 et -2).
// Les deux pages portent la mention « Compositeur Michel Berthier » sous le titre ;
// sur la seconde, la grande photo et le bandeau photo (3138 x 582) sont entiers.
// Écart volontaire : l'export écrit « electoacoustique », le site garde l'orthographe correcte.
const MENTION = 'Compositeur Michel Berthier';

for (const largeur of [1920, 1440, 1024, 768, 390]) {
  test(`T28 - Composition : mention du compositeur et photos entières à ${largeur}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Largeurs fixées par le test : exécuté une seule fois.');
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/monroe-composition.html');
    await page.locator('#page-32 img').last().scrollIntoViewIfNeeded();
    await page.waitForFunction(() => Array.from(document.querySelectorAll('#page-31 img, #page-32 img')).every((i) => i.complete && i.naturalWidth > 0));

    const m = await page.evaluate((mention) => {
      const lire = (sel) => {
        const s = document.querySelector(sel);
        const titre = s.querySelector('[id$="-title"]').getBoundingClientRect();
        const el = Array.from(s.querySelectorAll('p, span')).find((e) => e.textContent.trim() === mention);
        const rm = el ? el.getBoundingClientRect() : null;
        return {
          mention: !!el && rm.width > 0 && rm.height > 0,
          mentionSousTitre: el ? rm.top - titre.bottom : null,
          ecartGaucheMention: el ? Math.abs(rm.left - titre.left) : null,
          photos: Array.from(s.querySelectorAll('img')).map((i) => {
            const r = i.getBoundingClientRect(); const nat = i.naturalWidth / i.naturalHeight;
            return { rognage: Math.abs(r.width / r.height - nat) / nat, haut: r.top, bas: r.bottom, largeur: r.width / s.getBoundingClientRect().width };
          }),
          titre: { haut: titre.top, bas: titre.bottom },
          coupe: s.scrollHeight - s.clientHeight,
        };
      };
      return { p31: lire('#page-31'), p32: lire('#page-32'), deborde: document.documentElement.scrollWidth > innerWidth + 1 };
    }, MENTION);

    for (const [nom, p] of [['page 31', m.p31], ['page 32', m.p32]]) {
      expect(p.mention, `${nom} : mention du compositeur visible`).toBe(true);
      expect(p.mentionSousTitre, `${nom} : mention sous le titre (px)`).toBeGreaterThanOrEqual(-2);
      expect(p.mentionSousTitre).toBeLessThanOrEqual(16);
      expect(p.ecartGaucheMention, `${nom} : mention alignée sur le titre (px)`).toBeLessThanOrEqual(2);
      expect(p.coupe, `${nom} : section non coupée`).toBeLessThanOrEqual(2);
    }
    // Page 31 : la photo de gauche (l'homme assis) est entière ; celle de droite est à bord perdu sur l'export aussi.
    expect(m.p31.photos[0].rognage, 'page 31 : première photo entière').toBeLessThan(0.02);
    // Page 32 : grande photo, bandeau de titre, puis bandeau photo, tous entiers.
    const [haut, bas] = m.p32.photos;
    expect(haut.rognage, 'page 32 : grande photo entière').toBeLessThan(0.02);
    expect(bas.rognage, 'page 32 : bandeau photo entier').toBeLessThan(0.02);
    expect(m.p32.titre.haut, 'page 32 : titre sous la grande photo').toBeGreaterThanOrEqual(haut.bas - 1);
    expect(bas.haut, 'page 32 : bandeau photo sous le titre et la mention').toBeGreaterThanOrEqual(m.p32.titre.bas);
    expect(haut.largeur, 'page 32 : grande photo large dans sa section (plafonnée à 1440 px)').toBeGreaterThan(0.7);
    expect(bas.largeur, 'page 32 : bandeau photo large').toBeGreaterThan(0.7);
    expect(m.deborde).toBe(false);
  });
}
