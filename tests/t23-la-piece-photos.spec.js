const { test, expect } = require('@playwright/test');

// Référence : exports de la cliente (la-piece-2 à la-piece-5). Demande : « corriger les photos tronquées
// […] et les copyrights qui se déplacent ». Sur les exports, chaque photo est entière ; sur les pages à deux
// photos, la seconde chevauche la première et porte le copyright dans son angle inférieur droit.
for (const largeur of [1920, 1440, 1024, 768, 390]) {
  test(`T23 - La Pièce : photos entières et copyright accroché à sa photo à ${largeur}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Largeurs fixées par le test : exécuté une seule fois.');
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/monroe-piece.html');
    await page.evaluate(() => { document.querySelectorAll('main img').forEach((i) => { i.loading = 'eager'; }); });
    await page.locator('#page-18 img').last().scrollIntoViewIfNeeded();
    await page.waitForFunction(() => ['#page-15', '#page-16', '#page-17', '#page-18'].every((s) => Array.from(document.querySelectorAll(s + ' img')).every((i) => i.complete && i.naturalWidth > 0)));

    const m = await page.evaluate(() => ['page-15', 'page-16', 'page-17', 'page-18'].map((id) => {
      const s = document.getElementById(id); const rs = s.getBoundingClientRect();
      const photos = Array.from(s.querySelectorAll('img')).map((i) => {
        const r = i.getBoundingClientRect(); const nat = i.naturalWidth / i.naturalHeight;
        return { rognage: Math.abs(r.width / r.height - nat) / nat, gauche: r.left, droite: r.right, haut: r.top, bas: r.bottom };
      });
      const c = s.querySelector('small'); const rc = c ? c.getBoundingClientRect() : null;
      return {
        id, photos, credit: rc && { gauche: rc.left, droite: rc.right, haut: rc.top, bas: rc.bottom, texte: c.textContent.trim() },
        hauteur: rs.height, coupe: s.scrollHeight - s.clientHeight,
        hauteurEcran: innerHeight - document.querySelector('.site-header').getBoundingClientRect().height,
      };
    }));

    for (const s of m) {
      s.photos.forEach((p, k) => expect(p.rognage, `${s.id} : photo ${k + 1} entière`).toBeLessThan(0.02));
      expect(s.coupe, `${s.id} : section non coupée`).toBeLessThanOrEqual(2);
      // Le copyright appartient à la dernière photo de la section : dans sa largeur, posé dessus ou juste dessous.
      expect(s.credit, `${s.id} : copyright présent`).not.toBeNull();
      expect(s.credit.texte).toContain('Joshua Greene');
      const photo = s.photos[s.photos.length - 1];
      expect(s.credit.gauche, `${s.id} : copyright dans la largeur de sa photo`).toBeGreaterThanOrEqual(photo.gauche - 1);
      expect(s.credit.droite).toBeLessThanOrEqual(photo.droite + 1);
      expect(s.credit.haut, `${s.id} : copyright sur sa photo ou juste dessous`).toBeGreaterThanOrEqual(photo.haut);
      // Haut du copyright : posé sur la photo, ou commençant au plus 16 px sous elle (sa boîte porte une marge interne).
      expect(s.credit.haut).toBeLessThanOrEqual(photo.bas + 16);
      if (largeur >= 1024) {
        expect(s.hauteur, `${s.id} : composition visible d'un seul tenant à l'écran`).toBeLessThanOrEqual(s.hauteurEcran + 8); // l'en-tête réel dépasse de 3 px la variable --header-height du site
        if (s.photos.length === 2) expect(s.photos[1].haut, `${s.id} : la seconde photo chevauche la première`).toBeLessThan(s.photos[0].bas);
      }
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(false);
  });
}
