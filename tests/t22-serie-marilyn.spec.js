const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..', 'src');
const readSrc = (p) => fs.readFileSync(path.join(srcDir, p), 'utf8');
const pages = () => fs.readdirSync(srcDir).filter((f) => f.endsWith('.html')).sort();

const ACCROCHE = "Marilyn revient dans le monde d'aujourd'hui sous la forme d'une IA, plus humaine que jamais...";
const SELECTIONS = ['Festival international des Scénaristes de Valence', 'Festival de La Rochelle', 'Sélection au Prix Gloria de Série Series.'];

test.describe('T22 - Série Marilyn', () => {
  test('la page existe avec le texte de la cliente, mot pour mot', () => {
    const h = readSrc('serie-marilyn.html');
    expect(h).toContain('<title>Série Marilyn - Swing Digital</title>');
    expect(h.match(/<h1[ >]/g)).toHaveLength(1);
    expect(h).toContain('<h2 id="serie-marilyn-title" class="page39__title">La série</h2>');
    expect(h).toContain('<p class="page39__subtitle">Marilyn</p>');
    expect(h).toContain('(6X52 mn)');
    expect(h).toContain(`<p class="page39__description">${ACCROCHE}</p>`);
    for (const s of SELECTIONS) expect(h, s).toContain(`<li>${s}</li>`);
    expect(h).toContain('img/pages/page-39/page-39-image-1.jpg');
    expect(h).toContain('<link rel="canonical" href="https://swing.appmiweb.com/serie-marilyn.html">');
    expect(h).not.toMatch(/memory.?box vr prolonge|memory-box-page/i);
  });

  test('le fil d’Ariane rattache la série à L’Expérience Monroe, en HTML et en JSON-LD', () => {
    const h = readSrc('serie-marilyn.html');
    const fil = h.match(/<ol class="breadcrumb__list">[\s\S]*?<\/ol>/)[0];
    expect(fil.match(/breadcrumb__item/g)).toHaveLength(4);
    expect(fil).toContain('<a href="experience-monroe.html" class="breadcrumb__link">L\'Expérience Monroe</a>');
    expect(fil).toContain('<a href="serie-marilyn.html" class="breadcrumb__link" aria-current="page">Série Marilyn</a>');
    const ld = JSON.parse(h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    const crumbs = ld['@graph'].find((n) => n['@type'] === 'BreadcrumbList').itemListElement;
    expect(crumbs.map((c) => c.name)).toEqual(['Accueil', 'XR', "L'Expérience Monroe", 'Série Marilyn']);
    expect(crumbs[3].item).toBe('https://swing.appmiweb.com/serie-marilyn.html');
  });

  test('tous les liens « Série Marilyn » mènent à la série, et « Marilyn » reste la page réalité mixte', () => {
    for (const p of pages()) {
      const h = readSrc(p);
      expect(h, p).toContain('<a href="serie-marilyn.html" class="site-nav__submenu-link">5. Série Marilyn</a>');
      expect(h, p).toContain('<a href="marilyn.html" class="site-nav__submenu-link">Marilyn</a>');
      expect(h, p).not.toMatch(/href="marilyn\.html"[^>]*>\s*(5\. )?Série/);
    }
    const monroe = readSrc('experience-monroe.html');
    expect(monroe).toContain('<th scope="row"><a href="serie-marilyn.html">Série Marilyn</a></th>');
    expect(monroe).toContain('<a href="serie-marilyn.html" class="page13__card page13__card--link">');
    expect(monroe).not.toContain('<a href="marilyn.html" class="page13__card page13__card--link">');
  });

  test('le menu est identique sur toutes les pages, nouvelle page comprise', () => {
    const menus = new Set(pages().map((p) => readSrc(p).match(/<ul id="main-menu"[\s\S]*?<\/nav>/)[0]
      .replace(/ site-nav__link--active| site-nav__btn--active| aria-current="page"/g, '').replace(/\s+/g, ' ')));
    expect(pages()).toHaveLength(28);
    expect(menus.size).toBe(1);
  });

  test('la section « La série » a quitté Expériences interactives', () => {
    const h = readSrc('monroe-experiences.html');
    expect(h).not.toContain('id="page-39"');
    expect(h).not.toContain('page39__');
    expect(h).toContain('id="page-37"');
  });

  test('la page est recensée partout', () => {
    expect(readSrc('sitemap.xml')).toContain('<loc>https://swing.appmiweb.com/serie-marilyn.html</loc>');
    expect(readSrc('plan-du-site.html')).toContain('<li><a href="serie-marilyn.html">Série Marilyn</a></li>');
    for (const f of ['llms.txt', 'for-ai.txt', 'for-ai.json', 'for-ai/index.html']) expect(readSrc(f), f).toContain('serie-marilyn.html');
  });

  test('la page rendue affiche la série sans débordement', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/serie-marilyn.html');
    await expect(page.locator('#serie-marilyn-title')).toHaveText('La série');
    await expect(page.getByText(ACCROCHE, { exact: true })).toBeVisible();
    for (const s of SELECTIONS) await expect(page.getByText(s, { exact: true })).toBeVisible();
    const m = await page.evaluate(async () => {
      const img = document.querySelector('.page39__photo');
      img.scrollIntoView();
      if (!img.complete) await new Promise((r) => { img.onload = img.onerror = r; setTimeout(r, 4000); });
      const s = document.querySelector('#serie-marilyn');
      return { charge: img.naturalWidth > 0, coupe: s.scrollHeight - s.clientHeight, deborde: document.documentElement.scrollWidth > window.innerWidth + 1 };
    });
    expect(m.charge).toBe(true);
    expect(m.coupe, 'contenu coupé par la section').toBeLessThanOrEqual(2);
    expect(m.deborde).toBe(false);
  });
});
