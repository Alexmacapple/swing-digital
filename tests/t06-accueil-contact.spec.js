const { test, expect } = require('@playwright/test');

// Issue #6. Demande de la cliente : « resserrer les interlignes du bas de page, notamment autour de Swing Digital
// et du courriel de contact, pour éviter que le texte empiète sur la vidéo ».
// La vidéo de fond (1280 x 720) porte au centre un casque dessiné, le logo et, en fin de boucle, deux cordes qui
// descendent du haut de l'image : relevé sur quatre images réparties sur sa durée, le sujet occupe la bande
// horizontale de 34 % à 66 % de l'image, du haut jusqu'à 88 % de sa hauteur. Aucun texte ne doit la toucher.
const SUJET = { gauche: 0.34, droite: 0.66, haut: 0, bas: 0.88 };

for (const [largeur, hauteur] of [[1920, 1080], [1440, 900], [1200, 800], [1024, 768], [768, 1024], [390, 812]]) {
  test(`T06 - Accueil, contact : le texte n'empiète pas sur la vidéo à ${largeur}x${hauteur}`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Tailles fixées par le test : exécuté une seule fois.');
    await page.setViewportSize({ width: largeur, height: hauteur });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/index.html');
    await page.evaluate(() => document.fonts.ready);
    await page.locator('#page-62').scrollIntoViewIfNeeded();
    const m = await page.evaluate((sujet) => {
      const s = document.querySelector('#page-62'); const v = s.querySelector('video'); const rv = v.getBoundingClientRect();
      // rectangle réellement peint de la vidéo selon object-fit
      const nat = 1280 / 720; const boite = rv.width / rv.height; const fit = getComputedStyle(v).objectFit;
      const couvre = fit === 'cover';
      const l = (couvre ? boite > nat : boite < nat) ? rv.width : rv.height * nat; const h = l / nat;
      const gauche = rv.left + (rv.width - l) / 2; const haut = rv.top + (rv.height - h) / 2;
      const zone = { gauche: Math.max(rv.left, gauche + sujet.gauche * l), droite: Math.min(rv.right, gauche + sujet.droite * l), haut: Math.max(rv.top, haut + sujet.haut * h), bas: Math.min(rv.bottom, haut + sujet.bas * h) };
      const textes = ['.page62__brand', '.page62__title', '.page62__email', '.page62__address'].map((q) => {
        const e = s.querySelector(q); const r = document.createRange(); r.selectNodeContents(e);
        const q4 = Array.from(r.getClientRects()).filter((x) => x.width > 1);
        return { q, gauche: Math.min(...q4.map((x) => x.left)), droite: Math.max(...q4.map((x) => x.right)), haut: Math.min(...q4.map((x) => x.top)), bas: Math.max(...q4.map((x) => x.bottom)), lignes: q4.length };
      });
      const rs = s.getBoundingClientRect(); const btn = s.querySelector('.page62__play-btn').getBoundingClientRect();
      return { zone, textes, section: { gauche: rs.left, droite: rs.right, bas: rs.bottom }, bouton: { gauche: btn.left, droite: btn.right, haut: btn.top, bas: btn.bottom }, coupe: s.scrollHeight - s.clientHeight, deborde: document.documentElement.scrollWidth > innerWidth + 1 };
    }, SUJET);
    const croise = (a, b) => a.gauche < b.droite && a.droite > b.gauche && a.haut < b.bas && a.bas > b.haut;
    for (const t of m.textes) {
      expect(croise(t, m.zone), `${t.q} empiète sur le sujet de la vidéo`).toBe(false);
      expect(croise(t, m.bouton), `${t.q} passe sous le bouton lecture`).toBe(false);
      expect(t.gauche, `${t.q} dans la section`).toBeGreaterThanOrEqual(m.section.gauche);
      expect(t.droite).toBeLessThanOrEqual(m.section.droite);
    }
    expect(m.textes[2].lignes, 'le courriel tient sur une ligne').toBe(1);
    // Interlignes resserrés : au plus 12 px entre deux éléments successifs du bloc.
    for (let k = 1; k < m.textes.length; k += 1) expect(m.textes[k].haut - m.textes[k - 1].bas, `écart avant ${m.textes[k].q} (px)`).toBeLessThanOrEqual(12);
    expect(m.coupe).toBeLessThanOrEqual(2);
    expect(m.deborde).toBe(false);
  });
}
