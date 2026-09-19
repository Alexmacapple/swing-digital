const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Issue #35, Lighthouse « ARIA role should be appropriate for the element » : la vidéo de l'accueil et de la page 404
// portait role="img", rôle non autorisé sur un élément video (seul « application » l'est). Le rôle écrasait la
// sémantique native : l'arbre d'accessibilité annonçait une image à côté d'un bouton « Activer le son ».
// Garde-fou : aucune vidéo native du site ne porte d'attribut role ; la vidéo d'ambiance garde son nom accessible.
const pages = fs.readdirSync(path.join(__dirname, '..', 'src')).filter((f) => f.endsWith('.html')).sort();

test('T35 - Aucune vidéo native ne porte un rôle ARIA', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle de structure : exécuté une seule fois.');
  await page.route(/player\.vimeo\.com|youtube(-nocookie)?\.com|ytimg\.com/, (r) => r.abort());
  const fautives = [];
  let videos = 0;
  for (const fichier of pages) {
    await page.goto('/' + fichier, { waitUntil: 'domcontentloaded' });
    const r = await page.evaluate(() => Array.from(document.querySelectorAll('video')).map((v) => ({ id: v.id, role: v.getAttribute('role') })));
    videos += r.length;
    r.filter((v) => v.role !== null).forEach((v) => fautives.push(`${fichier} #${v.id} role="${v.role}"`));
  }
  expect(videos, 'des vidéos natives ont bien été trouvées').toBeGreaterThanOrEqual(3);
  expect(fautives, 'vidéos natives portant un attribut role').toEqual([]);
});

for (const fichier of ['index.html', '404.html']) {
  test(`T35 - ${fichier} : la vidéo d'ambiance garde un nom accessible et son rôle natif`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle de structure : exécuté une seule fois.');
    await page.goto('/' + fichier, { waitUntil: 'domcontentloaded' });
    const video = page.locator('#hero-video');
    await expect(video).toHaveCount(1);
    await expect(video).toHaveAttribute('aria-label', /Vidéo d'ambiance Swing Digital/);
    expect(await video.getAttribute('role')).toBeNull();
    expect(await video.getAttribute('aria-hidden')).toBeNull();
  });
}
