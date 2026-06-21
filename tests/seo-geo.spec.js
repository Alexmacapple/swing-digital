const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const srcDir = path.join(repoRoot, 'src');
const expectedBase = 'https://swing.appmiweb.com';

function readSrc(relativePath) {
  return fs.readFileSync(path.join(srcDir, relativePath), 'utf8');
}

function sitemapLocs() {
  const sitemap = readSrc('sitemap.xml');
  return Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => match[1]);
}

function sourcePathForLoc(loc) {
  const pathname = new URL(loc).pathname;
  if (pathname === '/') {
    return 'index.html';
  }
  if (pathname === '/for-ai') {
    return 'for-ai/index.html';
  }
  return pathname.replace(/^\/+/, '');
}

function routeForLoc(loc) {
  return new URL(loc).pathname || '/';
}

function jsonLdBlocks(html) {
  return Array.from(
    html.matchAll(/<script type=["']application\/ld\+json["']>\s*([\s\S]*?)\s*<\/script>/g),
    (match) => match[1],
  );
}

function metaDescription(html) {
  return html.match(/<meta name=["']description["'] content="([^"]{50,})">/)?.[1]
    ?? html.match(/<meta name=["']description["'] content='([^']{50,})'>/)?.[1]
    ?? null;
}

test.describe('SEO/GEO - socle public local', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle SEO/GEO exécuté une seule fois sur desktop-1920.');
  });

  test('le sitemap expose les URL publiques locales et chaque route répond', async ({ request }) => {
    const locs = sitemapLocs();

    expect(locs).toHaveLength(27);
    expect(new Set(locs).size).toBe(locs.length);
    expect(locs).toContain(`${expectedBase}/`);
    expect(locs).toContain(`${expectedBase}/for-ai`);
    expect(locs).toContain(`${expectedBase}/the-party.html`);
    expect(locs).toContain(`${expectedBase}/memory-box-vr.html`);
    expect(locs).toContain(`${expectedBase}/films.html`);

    for (const loc of locs) {
      expect(loc, 'URL hors base préproduction').toMatch(new RegExp(`^${expectedBase.replace(/\./g, '\\.')}/`));
      expect(fs.existsSync(path.join(srcDir, sourcePathForLoc(loc))), `source absente pour ${loc}`).toBe(true);

      const response = await request.get(routeForLoc(loc));
      expect(response.ok(), `${loc} ne répond pas en local`).toBe(true);
    }
  });

  test('les pages indexables ont les métadonnées SEO et JSON-LD attendues', () => {
    for (const loc of sitemapLocs()) {
      const relativePath = sourcePathForLoc(loc);
      const html = readSrc(relativePath);
      const label = relativePath;

      expect(html, label).toMatch(/<html[^>]+lang=["']fr["']/i);
      expect(html, label).toMatch(/<title>[^<]{10,}<\/title>/);
      expect(metaDescription(html), `${label} doit avoir une meta description exploitable`).not.toBeNull();
      expect(html, label).toContain(`<link rel="canonical" href="${loc}">`);
      expect(html, label).not.toMatch(/<meta name=["']robots["'][^>]+noindex/i);
      expect((html.match(/<h1(?:\s|>)/g) || []).length, `${label} doit avoir un seul h1`).toBe(1);

      const blocks = jsonLdBlocks(html);
      expect(blocks.length, `${label} doit contenir du JSON-LD`).toBeGreaterThan(0);
      for (const block of blocks) {
        expect(() => JSON.parse(block), `${label} contient un JSON-LD invalide`).not.toThrow();
      }
    }
  });

  test('les fichiers IA publics restent présents, valides et alignés avec Films', async ({ request }) => {
    for (const route of ['/llms.txt', '/for-ai', '/for-ai.json', '/for-ai.txt', '/schema-webpage.jsonld', '/robots.txt']) {
      const response = await request.get(route);
      expect(response.ok(), `${route} ne répond pas en local`).toBe(true);
    }

    const forAiJson = JSON.parse(readSrc('for-ai.json'));
    const schema = JSON.parse(readSrc('schema-webpage.jsonld'));
    const llms = readSrc('llms.txt');
    const forAiTxt = readSrc('for-ai.txt');
    const forAiIndex = readSrc('for-ai/index.html');

    expect(forAiJson.canonical_pages.some((page) => page.url === `${expectedBase}/films.html`)).toBe(true);
    expect(JSON.stringify(schema)).toContain(`${expectedBase}/films.html`);
    expect(llms).toContain('Films');
    expect(forAiTxt).toContain('Films');
    expect(forAiIndex).toContain('Films');
  });

  test('robots.txt autorise les ressources IA et référence le sitemap canonique', () => {
    const robots = readSrc('robots.txt');

    expect(robots).toContain('Allow: /llms.txt');
    expect(robots).toContain('Allow: /for-ai');
    expect(robots).toContain('Allow: /for-ai.json');
    expect(robots).toContain('Allow: /for-ai.txt');
    expect(robots).toContain(`Sitemap: ${expectedBase}/sitemap.xml`);
    expect(robots).toContain('Disallow: /404.html');
  });
});
