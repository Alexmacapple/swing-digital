const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const srcDir = path.join(repoRoot, 'src');

const englishRoutes = [
  '/en/',
  '/en/404.html',
  '/en/charlotte-henschel.html',
  '/en/dessine-moi-le-vent.html',
  '/en/espaces-augmentes.html',
  '/en/experience-monroe.html',
  '/en/experiences-series.html',
  '/en/films.html',
  '/en/for-ai/index.html',
  '/en/marilyn.html',
  '/en/memory-box-vr.html',
  '/en/mentions-legales.html',
  '/en/monroe-composition.html',
  '/en/monroe-experiences.html',
  '/en/monroe-installation.html',
  '/en/monroe-interviews.html',
  '/en/monroe-photographie.html',
  '/en/monroe-piece.html',
  '/en/monroe-podcasts.html',
  '/en/monroe-quiz.html',
  '/en/monroe-roman-graphique.html',
  '/en/ni-vues-ni-connues.html',
  '/en/plan-du-site.html',
  '/en/reservations.html',
  '/en/serie-marilyn.html',
  '/en/the-party.html',
  '/en/toulouse-lautrec.html',
  '/en/voyage-autour-de-moi.html',
  '/en/xr-corporate.html',
];

function sourcePath(route) {
  if (route === '/en/') return path.join(srcDir, 'en', 'index.html');
  return path.join(srcDir, route.replace(/^\//, ''));
}

function readRoute(route) {
  return fs.readFileSync(sourcePath(route), 'utf8');
}

function transcriptMap(html) {
  return new Map(Array.from(
    html.matchAll(/<!-- transcript:([^:]+):start -->([\s\S]*?)<!-- transcript:\1:end -->/g),
    (match) => [match[1], match[2]],
  ));
}

function visibleText(fragment) {
  return fragment
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:#x?[0-9a-f]+|[a-z]+);/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

test.describe('version anglaise locale', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle EN exécuté une seule fois sur desktop-1920.');
  });

  test('les 29 routes anglaises existent et répondent', async ({ request }) => {
    expect(englishRoutes).toHaveLength(29);
    for (const route of englishRoutes) {
      expect(fs.existsSync(sourcePath(route)), `fichier EN absent pour ${route}`).toBe(true);
      const response = await request.get(route);
      expect(response.ok(), `${route} ne répond pas en local`).toBe(true);
    }
  });

  test('chaque page expose sa langue, ses alternates et le sélecteur accessible', () => {
    for (const route of englishRoutes) {
      const html = readRoute(route);
      expect(html, route).toMatch(/<html[^>]+lang=["']en["']/i);
      expect(html, route).toContain('hreflang="en"');
      expect(html, route).toContain('hreflang="fr"');
      expect(html, route).toContain('class="language-switcher"');
      expect(html, route).toContain('aria-label="Language selection"');
      expect(html, route).not.toContain('style.css?v=20260920-issues45-46');
      expect(html, route).not.toMatch(/<html[^>]+lang=["']fr["']/i);
      if (route !== '/en/404.html') {
        expect(html, route).toMatch(/<link rel="canonical" href="[^"]*\/en(?:\/|\/[^\"]+)"/);
      }
    }
  });

  test('les transcriptions présentes côté français sont présentes côté anglais', () => {
    const french = fs.readdirSync(srcDir)
      .filter((file) => file.endsWith('.html'))
      .map((file) => fs.readFileSync(path.join(srcDir, file), 'utf8'))
      .join('\n');
    const english = englishRoutes.map(readRoute).join('\n');
    const frenchCount = (french.match(/data-transcript=/g) || []).length;
    const englishCount = (english.match(/data-transcript=/g) || []).length;
    expect(englishCount).toBe(frenchCount);
    expect(englishCount).toBeGreaterThan(0);
  });

  test('chaque bloc de transcription EN contient bien une traduction distincte', () => {
    const french = fs.readdirSync(srcDir)
      .filter((file) => file.endsWith('.html'))
      .map((file) => fs.readFileSync(path.join(srcDir, file), 'utf8'))
      .join('\n');
    const english = englishRoutes.map(readRoute).join('\n');
    const frenchTranscripts = transcriptMap(french);
    const englishTranscripts = transcriptMap(english);

    expect(englishTranscripts.size).toBe(frenchTranscripts.size);
    for (const [id, frenchBlock] of frenchTranscripts) {
      expect(englishTranscripts.has(id), `transcription EN absente : ${id}`).toBe(true);
      const frenchText = visibleText(frenchBlock);
      const englishText = visibleText(englishTranscripts.get(id));
      expect(englishText, `transcription EN inchangée : ${id}`).not.toBe(frenchText);
      expect(englishText.length, `transcription EN trop courte : ${id}`).toBeGreaterThan(frenchText.length * 0.55);
      expect(englishText, `libellé français résiduel dans ${id}`).not.toMatch(/\b(?:Soutien|Soutiens|Photographie|Transcription|Questions d'adolescence)\b/);
    }
  });

  test('les ressources SEO/GEO EN sont valides et cohérentes', () => {
    const resourceDir = path.join(srcDir, 'en');
    const context = JSON.parse(fs.readFileSync(path.join(resourceDir, 'for-ai.json'), 'utf8'));
    const schema = JSON.parse(fs.readFileSync(path.join(resourceDir, 'schema-webpage.jsonld'), 'utf8'));
    const sitemap = fs.readFileSync(path.join(resourceDir, 'sitemap.xml'), 'utf8');
    const robots = fs.readFileSync(path.join(resourceDir, 'robots.txt'), 'utf8');

    expect(context.language).toBe('en-US');
    expect(context.canonical_url).toBe('https://www.swingdigitalproduction.com/en/');
    expect(JSON.stringify(context)).toContain('/en/experiences-series.html');
    expect(JSON.stringify(schema)).toContain('"inLanguage":"en-US"');
    const locs = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => match[1]);
    expect(locs).toHaveLength(28);
    expect(locs.every((loc) => loc.includes('/en/'))).toBe(true);
    expect(robots).toContain('Sitemap: https://www.swingdigitalproduction.com/en/sitemap.xml');
  });
});

module.exports = { englishRoutes };
