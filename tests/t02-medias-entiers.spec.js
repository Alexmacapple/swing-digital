const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Issue #2, règle médias globale : « aucune photo tronquée ». Presque toutes les troncatures relevées sur le site
// venaient d'un object-fit: cover dans une case aux mauvaises proportions. Ce garde-fou balaie chaque page à quatre
// largeurs et refuse tout rognage de plus de 8 %, hors cadrages voulus listés ci-dessous avec leur raison.
const SEUIL = 0.08;
const CADRAGES_VOULUS = [
  { page: 'experience-monroe.html', image: /page-13-image-5\.jpg$/, raison: 'visuel « Installation » cadré en portrait comme sur l\'export de la cliente (issue #21)' },
  { page: 'experience-monroe.html', image: /page-24-image-\d\.jpg$/, raison: 'six vignettes de volets, cadrées à l\'identique' },
  { page: 'monroe-composition.html', image: /page-31-image-1\.jpg$/, raison: 'photo à bord perdu sur l\'export de la cliente (issue #28)' },
  { page: 'index.html', image: /img\/pages\/page-2\//, raison: 'portraits de l\'équipe, cadrés à l\'identique' },
  { page: 'monroe-podcasts.html', image: /page-33-image-1\.jpg$/, largeurMin: 769, raison: 'photo d\'ambiance qui remplit la colonne sur ordinateur ; entière sur mobile' },
];

const pages = fs.readdirSync(path.join(__dirname, '..', 'src')).filter((f) => f.endsWith('.html')).sort();

for (const fichier of pages) {
  test(`T02 - Médias entiers : ${fichier}`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Largeurs fixées par le test : exécuté une seule fois.');
    await page.route(/player\.vimeo\.com|youtube(-nocookie)?\.com|ytimg\.com/, (r) => r.abort());
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const rognees = [];
    for (const largeur of [1440, 1024, 768, 390]) {
      await page.setViewportSize({ width: largeur, height: 900 });
      await page.goto('/' + fichier);
      await page.evaluate(() => { document.querySelectorAll('main img').forEach((i) => { i.loading = 'eager'; }); });
      await page.waitForFunction(() => Array.from(document.querySelectorAll('main img')).every((i) => i.complete), null, { timeout: 20000 });
      const mesures = await page.evaluate(() => Array.from(document.querySelectorAll('main img')).map((i) => {
        const r = i.getBoundingClientRect();
        if (!i.naturalWidth || !r.width || !r.height || getComputedStyle(i).objectFit !== 'cover') return null;
        const nat = i.naturalWidth / i.naturalHeight; const boite = r.width / r.height;
        return { src: i.getAttribute('src'), rognage: Math.abs(boite - nat) / Math.max(nat, boite) };
      }).filter(Boolean));
      for (const m of mesures) {
        const voulu = CADRAGES_VOULUS.some((c) => c.page === fichier && c.image.test(m.src) && (!c.largeurMin || largeur >= c.largeurMin));
        if (!voulu && m.rognage > SEUIL) rognees.push(`${m.src} à ${largeur}px : ${Math.round(m.rognage * 100)} %`);
      }
    }
    expect(rognees, 'images tronquées par object-fit: cover').toEqual([]);
  });
}

// Règle copyright stable : sur mobile le panoramique de Photographies est un bandeau bas ; son copyright ne le recouvre pas.
for (const largeur of [768, 390]) {
  test(`T02 - Photographies : le copyright du panoramique ne recouvre pas la photo à ${largeur}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Largeurs fixées par le test : exécuté une seule fois.');
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/monroe-photographie.html');
    await page.waitForFunction(() => { const i = document.querySelector('.page25__panoramic-image'); return i.complete && i.naturalWidth > 0; });
    const m = await page.evaluate(() => {
      const i = document.querySelector('.page25__panoramic-image').getBoundingClientRect(); const c = document.querySelector('.page25__panoramic-credit').getBoundingClientRect();
      const bloc = document.querySelector('.page25__panoramic').getBoundingClientRect();
      return { photoBas: i.bottom, creditHaut: c.top, creditBas: c.bottom, blocBas: bloc.bottom, rognage: Math.abs(i.width / i.height - 3000 / 619) / (3000 / 619) };
    });
    expect(m.rognage, 'panoramique entier').toBeLessThan(0.02);
    expect(m.creditHaut, 'copyright sous la photo').toBeGreaterThanOrEqual(m.photoBas - 1);
    expect(m.creditBas, 'copyright contenu dans le bloc noir').toBeLessThanOrEqual(m.blocBas + 1);
  });
}
