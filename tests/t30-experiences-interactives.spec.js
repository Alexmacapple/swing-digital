const { test, expect } = require('@playwright/test');

// Référence : exports de la cliente (experience-interactive-1, quiz-marilyn). Issues #29, #30 et #31 :
// la section « Expériences interactives » (#page-36) était rangée dans Interviews, « Le quiz Marilyn » (#page-38)
// dans Expériences interactives. Chacune rejoint son onglet ; sur #page-36 les trois photos sont entières,
// les deux portraits dans un cadre blanc qui chevauche la grande photo.
const ATTENDU = {
  '/monroe-interviews.html': ['page-34', 'page-35'],
  '/monroe-experiences.html': ['page-36', 'page-37'],
  '/monroe-quiz.html': ['page-38'],
};

test('T30 - Sections Monroe rangées dans leur onglet, sans saut de niveau de titre', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle de structure : exécuté une seule fois.');
  for (const [url, sections] of Object.entries(ATTENDU)) {
    await page.goto(url);
    const c = await page.evaluate(() => ({
      sections: Array.from(document.querySelectorAll('main section[id^="page-"]')).map((s) => s.id),
      niveaux: Array.from(document.querySelectorAll('main h1, main h2, main h3, main h4')).map((h) => Number(h.tagName[1])),
    }));
    expect(c.sections, url).toEqual(sections);
    c.niveaux.forEach((n, k) => { if (k > 0) expect(n - c.niveaux[k - 1], `${url} : saut de niveau de titre`).toBeLessThanOrEqual(1); });
  }
});

for (const [ancre, cible] of [['page-36', 'monroe-experiences'], ['page-38', 'monroe-quiz']]) {
  test(`T30 - L'ancienne ancre #${ancre} de l'accueil mène à ${cible}`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle de redirection : exécuté une seule fois.');
    await page.goto(`/index.html#${ancre}`, { waitUntil: 'commit' });
    await expect(page).toHaveURL(new RegExp(`/${cible}\\.html(#.*)?$`), { timeout: 20000 });
  });
}

for (const largeur of [1920, 1440, 1024, 768, 390]) {
  test(`T30 - Expériences interactives : trois photos entières à ${largeur}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Largeurs fixées par le test : exécuté une seule fois.');
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/monroe-experiences.html');
    await page.locator('#page-36 img').last().scrollIntoViewIfNeeded();
    await page.waitForFunction(() => Array.from(document.querySelectorAll('#page-36 img')).every((i) => i.complete && i.naturalWidth > 0));
    const m = await page.evaluate(() => {
      const s = document.querySelector('#page-36'); const rs = s.getBoundingClientRect();
      const photos = Array.from(s.querySelectorAll('img')).map((i) => {
        const r = i.getBoundingClientRect(); const nat = i.naturalWidth / i.naturalHeight;
        return { rognage: Math.abs(r.width / r.height - nat) / nat, gauche: r.left, droite: r.right, haut: r.top, bas: r.bottom, hauteur: r.height };
      });
      const t = s.querySelector('#page36-title').getBoundingClientRect();
      return {
        photos, titreBas: t.bottom, hauteur: rs.height, basSection: rs.bottom,
        ecran: innerHeight - document.querySelector('.site-header').getBoundingClientRect().height,
        coupe: s.scrollHeight - s.clientHeight, deborde: document.documentElement.scrollWidth > innerWidth + 1,
      };
    });
    expect(m.photos).toHaveLength(3);
    m.photos.forEach((p, k) => {
      expect(p.rognage, `photo ${k + 1} entière`).toBeLessThan(0.02);
      expect(p.haut, `photo ${k + 1} sous le titre`).toBeGreaterThanOrEqual(m.titreBas - 1);
      expect(p.bas, `photo ${k + 1} contenue dans la section`).toBeLessThanOrEqual(m.basSection + 1);
    });
    const [grande, portrait1, portrait2] = m.photos;
    expect(Math.abs(portrait1.haut - portrait2.haut), 'portraits alignés en haut (px)').toBeLessThanOrEqual(3);
    expect(Math.abs(portrait1.hauteur - portrait2.hauteur) / portrait1.hauteur, 'portraits de même hauteur').toBeLessThan(0.03);
    expect(portrait2.gauche, 'portraits côte à côte').toBeGreaterThanOrEqual(portrait1.droite);
    if (largeur >= 1024) {
      expect(portrait1.gauche, 'le cadre des portraits chevauche la grande photo').toBeLessThan(grande.droite);
      expect(m.hauteur, 'page visible d\'un seul tenant').toBeLessThanOrEqual(m.ecran + 8);
    }
    expect(m.coupe).toBeLessThanOrEqual(2);
    expect(m.deborde).toBe(false);
  });
}

// « Corriger le E qui se déplace » : le E, en ligne dans le titre et deux fois plus gros, décalait « Marilyn » vers la droite.
// Sur l'export (experience-interactive-2), le E tient dans une gouttière à gauche, sous la flèche ; les quatre lignes sont alignées.
for (const largeur of [1920, 1440, 1024, 768, 390]) {
  test(`T30 - L'estrade Marilyn : lignes du titre alignées, E dans la gouttière à ${largeur}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Largeurs fixées par le test : exécuté une seule fois.');
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/monroe-experiences.html');
    await page.evaluate(() => document.fonts.ready);
    const m = await page.evaluate(() => {
      const t = document.querySelector('#page-37 .page37__title');
      const lignes = Array.from(t.childNodes).filter((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim()).map((n) => {
        const r = document.createRange(); r.selectNodeContents(n);
        // premier rectangle non vide : les blancs de début de nœud n'ont pas de boîte
        const q = Array.from(r.getClientRects()).find((x) => x.width > 1); return { gauche: q.left, haut: q.top };
      });
      const e = t.querySelector('.page37__letter').getBoundingClientRect(); const f = document.querySelector('#page-37 .page37__category-arrow').getBoundingClientRect();
      return { lignes, e: { gauche: e.left, droite: e.right, haut: e.top }, fleche: { gauche: f.left, haut: f.top } };
    });
    expect(m.lignes).toHaveLength(4);
    const gauches = m.lignes.map((l) => l.gauche);
    expect(Math.max(...gauches) - Math.min(...gauches), 'les quatre lignes partagent le même bord gauche (px)').toBeLessThanOrEqual(2);
    expect(m.e.droite, 'le E tient dans la gouttière, à gauche du texte').toBeLessThanOrEqual(Math.min(...gauches) + 1);
    expect(m.e.haut, 'le E est sous la flèche').toBeGreaterThanOrEqual(m.fleche.haut);
    expect(Math.abs(m.e.gauche - m.fleche.gauche), 'E et flèche alignés à gauche (px)').toBeLessThanOrEqual(4);
  });
}
