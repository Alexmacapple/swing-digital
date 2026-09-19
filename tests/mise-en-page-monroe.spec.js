const { test, expect } = require('@playwright/test');

const LARGEURS = [1440, 1024, 900, 820, 768, 600, 390, 320];

async function ouvrir(page, url, largeur) {
  await page.setViewportSize({ width: largeur, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.route('**/player.vimeo.com/**', (r) => r.abort());
  await page.goto(url);
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
    await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 3000); }))));
  });
}

test.describe('Expérience Monroe - section des six volets (#page-24)', () => {
  for (const largeur of LARGEURS) {
    test(`aucune carte coupée à ${largeur}px`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop-1920', 'Largeurs fixées par le test : exécuté une seule fois.');
      await ouvrir(page, '/experience-monroe.html', largeur);
      const m = await page.evaluate(() => {
        const s = document.querySelector('#page-24');
        const rs = s.getBoundingClientRect();
        const cartes = [...s.querySelectorAll('.page13__card')].map((c) => c.getBoundingClientRect().bottom - rs.bottom);
        return { coupe: s.scrollHeight - s.clientHeight, cartes: cartes.length, depassementMax: Math.max(...cartes) };
      });
      expect(m.cartes).toBe(6);
      expect(m.coupe, 'contenu plus haut que la section en overflow hidden').toBeLessThanOrEqual(2);
      expect(m.depassementMax, 'une carte dépasse le bas de la section').toBeLessThanOrEqual(2);
    });
  }
});

test.describe('Photographie - bloc catégorie et galerie (#page-25)', () => {
  for (const largeur of LARGEURS) {
    test(`ni photo ni légende recouverte à ${largeur}px`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop-1920', 'Largeurs fixées par le test : exécuté une seule fois.');
      await ouvrir(page, '/monroe-photographie.html', largeur);
      const m = await page.evaluate(() => {
        const R = (e) => e.getBoundingClientRect();
        const inter = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
        const s = document.querySelector('#page-25');
        const bloc = R(s.querySelector('.page25__category'));
        const cibles = [...s.querySelectorAll('.page25__gallery-image, .page25__gallery-caption')];
        return {
          recouvrement: Math.round(Math.max(...cibles.map((c) => inter(bloc, R(c))))),
          coupe: s.scrollHeight - s.clientHeight,
        };
      });
      expect(m.recouvrement, 'le bloc catégorie recouvre une photo ou la légende (px²)').toBeLessThanOrEqual(4);
      expect(m.coupe, 'contenu coupé par la section').toBeLessThanOrEqual(2);
    });
  }
});

test.describe('Charlotte Henschel - titre et tableaux (#page-56)', () => {
  for (const largeur of LARGEURS) {
    test(`les tableaux suivent le titre à ${largeur}px`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop-1920', 'Largeurs fixées par le test : exécuté une seule fois.');
      await ouvrir(page, '/charlotte-henschel.html', largeur);
      const m = await page.evaluate(() => {
        const s = document.querySelector('#page-56');
        const titre = s.querySelector('.page56__title').getBoundingClientRect();
        const tableaux = [...s.querySelectorAll('.page56__painting')].map((i) => i.getBoundingClientRect());
        return {
          ecart: Math.round(Math.min(...tableaux.map((t) => t.top)) - titre.bottom),
          deformation: Math.max(...[...s.querySelectorAll('.page56__painting')].map((i) => { const r = i.getBoundingClientRect(); return i.naturalWidth ? Math.abs(r.width / r.height - i.naturalWidth / i.naturalHeight) : 0; })),
          coupe: s.scrollHeight - s.clientHeight,
        };
      });
      expect(m.ecart, 'espace entre le titre et les tableaux (px)').toBeGreaterThanOrEqual(8);
      expect(m.ecart, 'espace entre le titre et les tableaux (px)').toBeLessThanOrEqual(64);
      expect(m.coupe, 'contenu coupé par la section').toBeLessThanOrEqual(2);
    });
  }
});
