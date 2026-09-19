const { test, expect } = require('@playwright/test');

// Issue #36, WCAG 2.2.2 « Pause, Stop, Hide » (RGAA 13.8) : la vidéo d'ambiance de l'accueil et de la page 404 se lance
// seule, tourne en boucle (8 s) et n'offrait que le réglage du son. Elle reçoit un bouton lecture et pause, sur le modèle
// de celui de la section Contact (intitulé qui change, état posé après la promesse play()), et ne démarre plus seule
// quand l'utilisateur a demandé de réduire les animations.
const PAUSE = 'Mettre en pause la vidéo d\'ambiance';
const LECTURE = 'Lancer la vidéo d\'ambiance';
const enLecture = (page) => page.evaluate(() => { const v = document.getElementById('hero-video'); return !v.paused; });

for (const fichier of ['index.html', '404.html']) {
  test(`T36 - ${fichier} : la vidéo d'ambiance se met en pause et se relance, à la souris et au clavier`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle de comportement : exécuté une seule fois.');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/' + fichier);
    const btn = page.locator('#hero-play-btn');
    await expect(btn).toHaveCount(1);
    expect(await btn.evaluate((b) => b.tagName), 'bouton natif').toBe('BUTTON');
    await expect.poll(() => enLecture(page), { message: 'lecture automatique au chargement' }).toBe(true);
    await expect(btn).toHaveAttribute('aria-label', PAUSE);
    expect(await btn.getAttribute('aria-pressed'), 'pas d\'aria-pressed sur un bouton dont l\'intitulé change').toBeNull();

    await btn.click();
    await expect.poll(() => enLecture(page), { message: 'pause à la souris' }).toBe(false);
    await expect(btn).toHaveAttribute('aria-label', LECTURE);

    await btn.focus();
    await page.keyboard.press('Enter');
    await expect.poll(() => enLecture(page), { message: 'relance au clavier, touche Entrée' }).toBe(true);
    await expect(btn).toHaveAttribute('aria-label', PAUSE);
    await page.keyboard.press('Space');
    await expect.poll(() => enLecture(page), { message: 'pause au clavier, touche Espace' }).toBe(false);

    // Le réglage du son reste indépendant.
    await expect(page.locator('#hero-sound-btn')).toHaveAttribute('aria-label', 'Activer le son');
  });

  test(`T36 - ${fichier} : la vidéo ne démarre pas seule quand les animations sont réduites`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle de comportement : exécuté une seule fois.');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/' + fichier);
    await page.waitForTimeout(800);
    expect(await enLecture(page), 'vidéo à l\'arrêt au chargement').toBe(false);
    const btn = page.locator('#hero-play-btn');
    await expect(btn).toHaveAttribute('aria-label', LECTURE);
    await btn.click();
    await expect.poll(() => enLecture(page), { message: 'le bouton lance la lecture' }).toBe(true);
  });
}

for (const [largeur, hauteur] of [[1440, 900], [768, 1024], [390, 812]]) {
  test(`T36 - Accueil : boutons lecture et son atteignables, sans chevauchement, à ${largeur}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Tailles fixées par le test : exécuté une seule fois.');
    await page.setViewportSize({ width: largeur, height: hauteur });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/index.html');
    const m = await page.evaluate(() => {
      const sec = document.querySelector('#page-1').getBoundingClientRect();
      const r = (id) => { const q = document.getElementById(id).getBoundingClientRect(); return { gauche: q.left, droite: q.right, haut: q.top, bas: q.bottom, l: q.width, h: q.height }; };
      const autres = Array.from(document.querySelectorAll('#page-1 a, #page-1 button')).filter((e) => e.id !== 'hero-play-btn' && e.getClientRects().length).map((e) => { const q = e.getBoundingClientRect(); return { nom: (e.getAttribute('aria-label') || e.textContent.trim()).slice(0, 24), gauche: q.left, droite: q.right, haut: q.top, bas: q.bottom }; });
      return { lecture: r('hero-play-btn'), son: r('hero-sound-btn'), autres, sec: { gauche: sec.left, droite: sec.right, haut: sec.top, bas: sec.bottom }, deborde: document.documentElement.scrollWidth > innerWidth + 1 };
    });
    expect(m.lecture.l, 'cible d\'au moins 44 px de large').toBeGreaterThanOrEqual(44);
    expect(m.lecture.h, 'cible d\'au moins 44 px de haut').toBeGreaterThanOrEqual(44);
    const croise = (a, b) => a.gauche < b.droite && a.droite > b.gauche && a.haut < b.bas && a.bas > b.haut;
    for (const o of m.autres) expect(croise(m.lecture, o), `le bouton lecture chevauche « ${o.nom} »`).toBe(false);
    expect(m.lecture.gauche).toBeGreaterThanOrEqual(m.sec.gauche);
    expect(m.lecture.droite).toBeLessThanOrEqual(m.sec.droite);
    expect(m.lecture.haut).toBeGreaterThanOrEqual(m.sec.haut);
    expect(m.lecture.bas).toBeLessThanOrEqual(m.sec.bas);
    expect(Math.abs((m.lecture.haut + m.lecture.bas) / 2 - (m.son.haut + m.son.bas) / 2), 'boutons lecture et son sur la même ligne (px)').toBeLessThanOrEqual(3);
    expect(m.deborde).toBe(false);
  });
}
