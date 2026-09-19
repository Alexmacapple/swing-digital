const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Issue #38 : une fois entré dans une sous-page de L'Expérience Monroe, rien ne menait aux dix autres ; seul le
// sous-menu de l'en-tête, au troisième niveau, le permettait. Chaque sous-page porte désormais en fin de contenu
// la liste des onze volets, dans l'ordre du menu et du plan du site, page courante marquée, plus un retour.
const VOLETS = [
  ['1', 'Pièce My Story', 'monroe-piece.html'],
  ['2', 'Roman Graphique', 'monroe-roman-graphique.html'],
  ['3', 'Installation', 'monroe-installation.html'],
  ['4', 'XR Memory Box', 'memory-box-vr.html'],
  ['5', 'Série Marilyn', 'serie-marilyn.html'],
  ['A', 'Photographie', 'monroe-photographie.html'],
  ['B', 'Composition électroacoustique', 'monroe-composition.html'],
  ['C', 'Podcasts', 'monroe-podcasts.html'],
  ['D', 'Interviews', 'monroe-interviews.html'],
  ['E', 'Expériences interactives', 'monroe-experiences.html'],
  ['F', 'Le Quiz Marilyn', 'monroe-quiz.html'],
];
const PAGES = VOLETS.map((v) => v[2]);

test('T38 - Le bloc reprend exactement la liste du sous-menu et du plan du site', ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle source : exécuté une seule fois.');
  const src = (f) => fs.readFileSync(path.join(__dirname, '..', 'src', f), 'utf8');
  const liens = (html, motif) => {
    const bloc = html.match(motif);
    expect(bloc, 'bloc introuvable').not.toBeNull();
    return Array.from(bloc[0].matchAll(/href="([^"#]+)"/g)).map((m) => m[1]).filter((h) => PAGES.includes(h));
  };
  const menu = liens(src('index.html'), /<ul id="submenu-monroe"[\s\S]*?<\/ul>/);
  const plan = liens(src('plan-du-site.html'), /Sous-pages Monroe[\s\S]*?<\/ul>/);
  expect(menu, 'sous-menu de l\'en-tête').toEqual(PAGES);
  expect(plan, 'plan du site').toEqual(PAGES);
  // Le bloc de chaque sous-page cite les onze pages ; la page courante n'est pas un lien, elle est donc comptée à part.
  for (const page of PAGES) {
    const bloc = src(page).match(/<nav class="volets"[\s\S]*?<\/nav>/);
    expect(bloc, `${page} : bloc des volets absent`).not.toBeNull();
    const cites = Array.from(bloc[0].matchAll(/(?:href|data-page)="([^"#]+)"/g)).map((m) => m[1]).filter((h) => PAGES.includes(h));
    expect(cites, `${page} : les onze volets dans l'ordre`).toEqual(PAGES);
  }
});

for (const page of PAGES) {
  test(`T38 - ${page} : volets complets, page courante marquée, retour présent`, async ({ page: nav }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle de structure : exécuté une seule fois.');
    await nav.route(/player\.vimeo\.com|youtube(-nocookie)?\.com|ytimg\.com/, (r) => r.abort());
    await nav.goto('/' + page, { waitUntil: 'domcontentloaded' });
    const bloc = nav.locator('nav.volets');
    await expect(bloc).toHaveCount(1);
    await expect(bloc).toHaveAttribute('aria-label', /volets/i);

    const items = bloc.locator('.volets__item');
    await expect(items).toHaveCount(VOLETS.length);
    expect(await items.allTextContents().then((t) => t.map((x) => x.replace(/\s+/g, ' ').trim()))).toEqual(VOLETS.map(([n, t]) => `${n}. ${t}`));

    // La page courante est marquée et n'est pas un lien ; les dix autres sont des liens vers la bonne page.
    const courante = bloc.locator('[aria-current="page"]');
    await expect(courante).toHaveCount(1);
    expect(await courante.evaluate((e) => e.tagName), 'la page courante n\'est pas cliquable').not.toBe('A');
    const attendu = VOLETS.find((v) => v[2] === page);
    expect((await courante.textContent()).replace(/\s+/g, ' ').trim()).toBe(`${attendu[0]}. ${attendu[1]}`);
    const hrefs = await bloc.locator('.volets__item a').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
    expect(hrefs, 'liens vers les dix autres volets').toEqual(PAGES.filter((p) => p !== page));

    await expect(bloc.locator('a.volets__retour')).toHaveAttribute('href', 'experience-monroe.html');
    // Le bloc ferme le contenu, avant le pied de page.
    expect(await nav.evaluate(() => { const n = document.querySelector('nav.volets'); const m = document.querySelector('main'); return m.contains(n) && n === m.lastElementChild; }), 'bloc en fin de contenu').toBe(true);
  });
}

for (const [largeur, hauteur] of [[1350, 940], [768, 1024], [412, 823]]) {
  test(`T38 - Photographie : bloc des volets lisible et cliquable à ${largeur}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Tailles fixées par le test : exécuté une seule fois.');
    await page.setViewportSize({ width: largeur, height: hauteur });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/monroe-photographie.html');
    await page.evaluate(() => document.fonts.ready);
    const m = await page.evaluate(() => {
      const bloc = document.querySelector('nav.volets');
      const cibles = Array.from(bloc.querySelectorAll('a')).map((a) => { const q = a.getBoundingClientRect(); return { nom: a.textContent.replace(/\s+/g, ' ').trim().slice(0, 24), l: q.width, h: q.height, gauche: q.left, droite: q.right, haut: q.top, bas: q.bottom }; });
      return { cibles, deborde: document.documentElement.scrollWidth > innerWidth + 1 };
    });
    expect(m.cibles.length, 'dix volets et le retour').toBe(11);
    m.cibles.forEach((c) => {
      expect(c.h, `« ${c.nom} » : hauteur de cible`).toBeGreaterThanOrEqual(44);
      expect(c.l, `« ${c.nom} » : largeur de cible`).toBeGreaterThanOrEqual(44);
    });
    for (let i = 0; i < m.cibles.length; i += 1) {
      for (let j = i + 1; j < m.cibles.length; j += 1) {
        const a = m.cibles[i]; const b = m.cibles[j];
        expect(a.gauche < b.droite && a.droite > b.gauche && a.haut < b.bas && a.bas > b.haut, `« ${a.nom} » chevauche « ${b.nom} »`).toBe(false);
      }
    }
    expect(m.deborde).toBe(false);
  });
}
