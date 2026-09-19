const { test, expect } = require('@playwright/test');

// Issue #31. Demandes de la cliente : « virer la XR qui n'a rien à faire là », « mettre les images du quiz » et,
// si possible, montrer les images nécessaires aux questions 1, 4 et 6 du quiz externe.
// Les contenus XR figurent déjà sur la page Memory Box VR : ils quittent la page Quiz sans rien faire disparaître.
// Le quiz externe répond en HTTPS avec « www » (la forme sans « www » redirige vers du HTTP simple).
const QUIZ = 'https://www.updatemarilyn.com/jeu.php';

test('T31 - Quiz : plus de contenu XR, lien vers le quiz et images des questions', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle de structure : exécuté une seule fois.');
  await page.goto('/monroe-quiz.html');
  const c = await page.evaluate(() => ({
    sections: Array.from(document.querySelectorAll('main > section')).map((s) => s.id),
    niveaux: Array.from(document.querySelectorAll('main h1, main h2, main h3, main h4')).map((h) => Number(h.tagName[1])),
    partage: document.querySelector('meta[property="og:image"]').content,
    images: Array.from(document.querySelectorAll('main img')).map((i) => i.getAttribute('src')),
    texte: document.querySelector('main').textContent,
  }));
  expect(c.sections).toEqual(['page-38', 'quiz-jouer']);
  expect(c.texte).not.toMatch(/HTC Vive|Meta Quest|Oculus/);
  c.niveaux.forEach((n, k) => { if (k > 0) expect(n - c.niveaux[k - 1], 'saut de niveau de titre').toBeLessThanOrEqual(1); });
  expect(c.images.some((src) => c.partage.endsWith('/' + src)), 'image de partage présente dans la page').toBe(true);

  const lien = page.locator('#quiz-jouer a.quiz-jouer__lien');
  await expect(lien).toHaveAttribute('href', QUIZ);
  await expect(lien).toHaveAttribute('target', '_blank');
  await expect(lien).toHaveAttribute('rel', /noopener/);
  await expect(lien).toContainText(/nouvelle fenêtre/i);

  const figures = page.locator('#quiz-jouer figure');
  await expect(figures).toHaveCount(3);
  await expect(figures.locator('figcaption')).toHaveText(['Question 1', 'Question 4', 'Question 6']);
  for (const img of await figures.locator('img').all()) await expect(img).toHaveAttribute('alt', /.{30,}/);
});

for (const ancre of ['page-40', 'page-41']) {
  test(`T31 - L'ancienne ancre #${ancre} de l'accueil mène à Memory Box VR`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle de redirection : exécuté une seule fois.');
    await page.goto(`/index.html#${ancre}`, { waitUntil: 'commit' });
    await expect(page).toHaveURL(/\/memory-box-vr\.html(#.*)?$/, { timeout: 20000 });
  });
}

for (const largeur of [1920, 1440, 1024, 768, 390]) {
  test(`T31 - Quiz : images des questions entières à ${largeur}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Largeurs fixées par le test : exécuté une seule fois.');
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/monroe-quiz.html');
    await page.evaluate(() => { document.querySelectorAll('#quiz-jouer img').forEach((i) => { i.loading = 'eager'; }); });
    await page.locator('#quiz-jouer img').last().scrollIntoViewIfNeeded();
    await page.waitForFunction(() => Array.from(document.querySelectorAll('#quiz-jouer img')).every((i) => i.complete && i.naturalWidth > 0));
    const m = await page.evaluate(() => {
      const s = document.querySelector('#quiz-jouer'); const lien = s.querySelector('.quiz-jouer__lien').getBoundingClientRect();
      return {
        photos: Array.from(s.querySelectorAll('img')).map((i) => { const r = i.getBoundingClientRect(); const nat = i.naturalWidth / i.naturalHeight; return { ecart: Math.abs(r.width / r.height - nat) / nat, largeur: r.width, agrandie: r.width / i.naturalWidth }; }),
        lienHauteur: lien.height, coupe: s.scrollHeight - s.clientHeight, deborde: document.documentElement.scrollWidth > innerWidth + 1,
      };
    });
    m.photos.forEach((p, k) => {
      expect(p.ecart, `image ${k + 1} entière`).toBeLessThan(0.02);
      expect(p.largeur, `image ${k + 1} lisible`).toBeGreaterThan(120);
      expect(p.agrandie, `image ${k + 1} non agrandie au-delà de sa définition`).toBeLessThanOrEqual(1.01);
    });
    expect(m.lienHauteur, 'cible du lien d\'au moins 44 px').toBeGreaterThanOrEqual(44);
    expect(m.coupe).toBeLessThanOrEqual(2);
    expect(m.deborde).toBe(false);
  });
}
