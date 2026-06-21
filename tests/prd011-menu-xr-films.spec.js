const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const srcDir = path.join(repoRoot, 'src');

function readSrc(relativePath) {
  return fs.readFileSync(path.join(srcDir, relativePath), 'utf8');
}

function listHtmlPages() {
  return fs
    .readdirSync(srcDir)
    .filter((file) => file.endsWith('.html'))
    .sort();
}

function extractHeader(html) {
  const match = html.match(/<header class="site-header"[\s\S]*?<\/header>/);
  expect(match, 'header principal absent').not.toBeNull();
  return match[0];
}

function navLabelOrder(headerHtml) {
  return Array.from(
    headerHtml.matchAll(
      /<(?:a|button)[^>]*class="[^"]*\bsite-nav__(?:link|btn)\b[^"]*"[^>]*>([\s\S]*?)<\/(?:a|button)>/g,
    ),
  ).map((match) =>
    match[1]
      .replace(/<[^>]*>/g, '')
      .replace(/&#9660;/g, '')
      .replace(/\s+/g, ' ')
      .trim(),
  );
}

test.describe('PRD-011 - menu XR et Films', () => {
  test('toutes les pages HTML exposent la taxonomie Accueil, XR, Espace augmenté, Films, Réservation', () => {
    const pages = listHtmlPages();

    expect(pages).toContain('films.html');

    for (const page of pages) {
      const html = readSrc(page);
      const nav = extractHeader(html);

      expect(navLabelOrder(nav), page).toEqual([
        'Accueil',
        'XR',
        'Espace augmenté',
        'Films',
        'Réservation',
      ]);
      expect(nav, page).toContain('href="films.html"');
      expect(nav, page).toContain('href="experiences-series.html" class="site-nav__submenu-link">Tous les projets XR</a>');
      expect(nav, page).not.toContain('Ni vues ni connues');
      expect(html, page).not.toContain('Expériences Séries');
    }
  });

  test('la page Films existe et classe Ni vues ni connues comme contenu audiovisuel', () => {
    const html = readSrc('films.html');

    expect(html).toContain('data-section="films"');
    expect(html).toContain('<h1');
    expect(html).toContain('Films');
    expect(html).toContain('Films, séries documentaires et récits audiovisuels');
    expect(html).toContain('href="ni-vues-ni-connues.html"');
    expect(html).toContain('Série documentaire');
    expect(html).toContain('https://swing.appmiweb.com/films.html');
  });

  test('Ni vues ni connues dépend de Films dans le HTML et les données structurées', () => {
    const html = readSrc('ni-vues-ni-connues.html');
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? '';

    expect(html).toContain('data-section="films"');
    expect(html).toContain('<li class="breadcrumb__item"><a href="films.html" class="breadcrumb__link">Films</a></li>');
    expect(html).toContain('"name": "Films"');
    expect(html).toContain('"item": "https://swing.appmiweb.com/films.html"');
    expect(description).not.toMatch(/exp[ée]rience immersive/i);
  });

  test('les fichiers publics IA, sitemap et JavaScript connaissent la rubrique Films', () => {
    const js = readSrc('js/main.js');
    const sitemap = readSrc('sitemap.xml');
    const plan = readSrc('plan-du-site.html');
    const llms = readSrc('llms.txt');
    const forAiJson = readSrc('for-ai.json');
    const forAiTxt = readSrc('for-ai.txt');
    const forAiIndex = readSrc('for-ai/index.html');
    const schema = readSrc('schema-webpage.jsonld');

    expect(js).toMatch(/['"]films['"]:\s*'films\.html'/);
    expect(sitemap).toContain('https://swing.appmiweb.com/films.html');
    expect(plan).toContain('Films');
    expect(plan).toContain('ni-vues-ni-connues.html');

    for (const [name, content] of [
      ['llms.txt', llms],
      ['for-ai.json', forAiJson],
      ['for-ai.txt', forAiTxt],
      ['for-ai/index.html', forAiIndex],
      ['schema-webpage.jsonld', schema],
    ]) {
      expect(content, name).toContain('films.html');
      expect(content, name).toContain('Films');
      expect(content, name).not.toMatch(/Ni vues ni connues[\s\S]{0,160}XR/i);
    }
  });

  test('le lien actif Films a un signal de menu lisible', async ({ page }) => {
    await page.goto('/films.html');

    const activeLink = page.locator('.site-nav__link[href="films.html"]');
    await expect(activeLink).toHaveClass(/site-nav__link--active/);
    await expect(activeLink).toHaveAttribute('aria-current', 'page');

    const marker = await activeLink.evaluate((el) => {
      const after = window.getComputedStyle(el, '::after');
      const link = window.getComputedStyle(el);
      return {
        content: after.content,
        height: Number.parseFloat(after.height),
        backgroundColor: after.backgroundColor,
        borderLeftWidth: Number.parseFloat(link.borderLeftWidth),
        borderLeftColor: link.borderLeftColor,
      };
    });

    if ((page.viewportSize()?.width ?? 0) >= 1024) {
      expect(marker.content).not.toBe('none');
      expect(marker.height).toBeGreaterThanOrEqual(2);
      expect(marker.backgroundColor).toBe('rgb(255, 255, 255)');
    } else {
      expect(marker.borderLeftWidth).toBeGreaterThanOrEqual(2);
      expect(marker.borderLeftColor).toBe('rgb(255, 255, 255)');
    }
  });
});
