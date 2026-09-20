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

function frenchRoute(route) {
  if (route === '/en/') return '/';
  return route.replace(/^\/en\//, '/');
}

function readFrenchRoute(route) {
  const relative = frenchRoute(route).replace(/^\//, '');
  return fs.readFileSync(path.join(srcDir, relative || 'index.html'), 'utf8');
}

function canonicalUrl(html, fallback) {
  return html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/)?.[1] || fallback;
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
      expect(html, route).toMatch(/<html[^>]+translate=["']no["']/i);
      expect(html, route).toContain('hreflang="en"');
      expect(html, route).toContain('hreflang="fr"');
      expect(html, route).toContain('class="language-switcher"');
      expect(html, route).toContain('aria-label="Language selection"');
      expect(html, route).not.toMatch(/aria-label=["'](?:Lecture|Son)["']/i);
      expect(html, route).not.toContain('My Story piece');
      expect(html, route).not.toContain('The Monroe Experiment');
      expect(html, route).not.toMatch(/\bTheater\b/);
      expect(html, route).not.toMatch(/>\s*Accueillir\s*</i);
      expect(html, route).not.toMatch(/>\s*Accueil\s*</i);
      expect(html, route).not.toContain('style.css?v=20260920-issues45-46');
      expect(html, route).not.toMatch(/<html[^>]+lang=["']fr["']/i);
      if (route !== '/en/404.html') {
        expect(html, route).toMatch(/<link rel="canonical" href="[^"]*\/en(?:\/|\/[^\"]+)"/);
      }
    }
  });

  test('les annotations hreflang sont réciproques entre les deux langues', () => {
    for (const route of englishRoutes) {
      const english = readRoute(route);
      const french = readFrenchRoute(route);
      const isForAi = route === '/en/for-ai/index.html';
      const englishUrl = isForAi
        ? 'https://www.swingdigitalproduction.com/en/for-ai/'
        : canonicalUrl(english, `https://www.swingdigitalproduction.com${route}`);
      const frenchUrl = isForAi
        ? 'https://www.swingdigitalproduction.com/for-ai/'
        : canonicalUrl(french, `https://www.swingdigitalproduction.com${frenchRoute(route)}`);

      expect(english, route).toContain(`hreflang="fr" href="${frenchUrl}"`);
      expect(french, frenchRoute(route)).toContain(`hreflang="en" href="${englishUrl}"`);
      expect(french, frenchRoute(route)).toContain(`hreflang="x-default" href="${englishUrl}"`);
    }
  });

  test('le sélecteur est visible et réciproque côté français comme côté anglais', async ({ page }) => {
    for (const route of ['/', '/en/', '/the-party.html', '/en/the-party.html']) {
      await page.goto(route);
      const switcher = page.locator('.site-header .language-switcher');
      await expect(switcher, `sélecteur absent sur ${route}`).toBeVisible();
      await expect(switcher.locator('a')).toHaveCount(2);
      await expect(switcher).toContainText('Français');
      await expect(switcher).toContainText('English');
      await expect(page.locator('.site-footer .language-switcher--footer')).toBeVisible();
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

    expect(context.language).toBe('en-GB');
    expect(context.canonical_url).toBe('https://www.swingdigitalproduction.com/en/');
    expect(JSON.stringify(context)).toContain('/en/experiences-series.html');
    expect(JSON.stringify(schema)).toContain('"inLanguage":"en-GB"');
    const locs = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => match[1]);
    expect(locs).toHaveLength(28);
    expect(locs.every((loc) => loc.includes('/en/'))).toBe(true);
    expect(robots).toContain('Sitemap: https://www.swingdigitalproduction.com/en/sitemap.xml');
  });
});

module.exports = { englishRoutes };
