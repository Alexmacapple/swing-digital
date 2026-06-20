// @ts-check
const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
const { buildProd, distDir } = require('../scripts/build-prod');

const BASE_URL = (process.env.SEO_BASE_URL || 'https://swing.appmiweb.com').replace(/\/+$/, '');
const PLACEHOLDER_DOMAIN = 'DO' + 'MAINE';
const SRC_DIR = path.join(__dirname, '..', 'src');
const PUBLIC_TEXT_EXTENSIONS = new Set(['.html', '.xml', '.txt', '.json', '.jsonld']);

function listFiles(dir, baseDir = dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((dirent) => {
        const absolute = path.join(dir, dirent.name);

        if (dirent.isDirectory()) {
            return listFiles(absolute, baseDir);
        }

        return dirent.isFile() ? [path.relative(baseDir, absolute).replaceAll(path.sep, '/')] : [];
    });
}

const PUBLIC_TEXT_FILES = listFiles(SRC_DIR)
    .filter((file) => PUBLIC_TEXT_EXTENSIONS.has(path.extname(file)))
    .sort();
const PUBLIC_HTML_FILES = PUBLIC_TEXT_FILES
    .filter((file) => file.endsWith('.html'))
    .sort();
const INDEXABLE_HTML = PUBLIC_TEXT_FILES
    .filter((file) => file.endsWith('.html'))
    .filter((file) => !['404.html', 'generated-pages.html'].includes(file))
    .sort();
const STRATEGIC_DIRECT_ANSWER_PAGES = [
    'espaces-augmentes.html',
    'experiences-series.html',
    'experience-monroe.html',
    'reservations.html',
];
const MEASUREMENT_MATRIX = path.join(__dirname, '..', 'docs', 'SEO-GEO-MEASUREMENT-MATRIX.csv');

const canonicalFor = (file) => {
    if (file === 'index.html') {
        return `${BASE_URL}/`;
    }

    if (file.endsWith('/index.html')) {
        return `${BASE_URL}/${file.replace(/\/index\.html$/, '')}`;
    }

    return `${BASE_URL}/${file}`;
};

const extract = (pattern, text) => {
    const match = text.match(pattern);
    return match ? match[1] : '';
};

const parseMeasurementMatrix = () => {
    const lines = fs.readFileSync(MEASUREMENT_MATRIX, 'utf8').trim().split(/\r?\n/);
    const headers = lines.shift().split(',');

    return lines.map((line) => {
        const values = line.split(',');
        return Object.fromEntries(headers.map((header, index) => [header, values[index] || '']));
    });
};

test.describe('SEO/GEO technique', () => {
    test.beforeEach(({}, testInfo) => {
        test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle statique exécuté une seule fois.');
    });

    test('aucun placeholder de domaine ne reste dans les fichiers publics', async () => {
        for (const file of PUBLIC_TEXT_FILES) {
            const content = fs.readFileSync(path.join(SRC_DIR, file), 'utf8');
            expect(content, file).not.toContain(PLACEHOLDER_DOMAIN);
        }
    });

    test('les pages indexables ont canonical, Open Graph, Twitter Card et JSON-LD valides', async () => {
        for (const file of INDEXABLE_HTML) {
            const html = fs.readFileSync(path.join(SRC_DIR, file), 'utf8');
            const canonical = canonicalFor(file);

            expect(extract(/<link rel="canonical" href="([^"]+)">/, html), file).toBe(canonical);
            expect(extract(/<meta property="og:url" content="([^"]+)">/, html), file).toBe(canonical);
            expect(extract(/<meta property="og:image" content="([^"]+)">/, html), file).toMatch(new RegExp(`^${BASE_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/`));
            expect(extract(/<meta property="og:site_name" content="([^"]+)">/, html), file).toBe('Swing Digital');
            expect(extract(/<meta name="twitter:card" content="([^"]+)">/, html), file).toBe('summary_large_image');

            const jsonLd = extract(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/, html);
            expect(jsonLd, file).not.toBe('');
            const parsed = JSON.parse(jsonLd);
            expect(parsed['@context'], file).toBe('https://schema.org');
            expect(Array.isArray(parsed['@graph']), file).toBe(true);
        }
    });

    test('les titres et descriptions des pages indexables sont assez explicites', async () => {
        for (const file of INDEXABLE_HTML) {
            const html = fs.readFileSync(path.join(SRC_DIR, file), 'utf8');
            const title = extract(/<title>([\s\S]*?)<\/title>/, html).replace(/\s+/g, ' ').trim();
            const description = extract(/<meta name="description" content="([^"]+)">/, html).replace(/\s+/g, ' ').trim();
            const ogDescription = extract(/<meta property="og:description" content="([^"]+)">/, html).replace(/\s+/g, ' ').trim();
            const twitterDescription = extract(/<meta name="twitter:description" content="([^"]+)">/, html).replace(/\s+/g, ' ').trim();
            const jsonLd = extract(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/, html);
            const webPage = JSON.parse(jsonLd)['@graph'].find((entity) => entity['@type'] === 'WebPage');

            expect(title.length, `${file} title: ${title}`).toBeGreaterThanOrEqual(30);
            expect(title.length, `${file} title: ${title}`).toBeLessThanOrEqual(70);
            expect(description.length, `${file} description: ${description}`).toBeGreaterThanOrEqual(90);
            expect(description.length, `${file} description: ${description}`).toBeLessThanOrEqual(180);
            expect(ogDescription, file).toBe(description);
            expect(twitterDescription, file).toBe(description);
            expect(webPage.description, file).toBe(description);
        }
    });

    test('les pages indexables exposent une hiérarchie h1 puis h2', async () => {
        for (const file of INDEXABLE_HTML) {
            const html = fs.readFileSync(path.join(SRC_DIR, file), 'utf8');

            expect(html, `${file} doit contenir un h1`).toMatch(/<h1\b[\s\S]*?<\/h1>/);
            expect(html, `${file} doit contenir au moins un h2`).toMatch(/<h2\b[\s\S]*?<\/h2>/);
        }
    });

    test('le sitemap reprend toutes les URL canoniques indexables', async () => {
        const sitemap = fs.readFileSync(path.join(SRC_DIR, 'sitemap.xml'), 'utf8');
        const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
        const expected = INDEXABLE_HTML.map(canonicalFor).sort();

        expect(locs).toEqual(expected);
        expect(sitemap).not.toContain('generated-pages.html');
        expect(sitemap).not.toContain('404.html');
    });

    test('robots.txt pointe vers le sitemap et exclut les contenus de travail', async () => {
        const robots = fs.readFileSync(path.join(SRC_DIR, 'robots.txt'), 'utf8');

        expect(robots).toContain(`Sitemap: ${BASE_URL}/sitemap.xml`);
        expect(robots).toContain('Allow: /for-ai');
        expect(robots).toContain('Allow: /for-ai.json');
        expect(robots).toContain('Allow: /for-ai.txt');
        expect(robots).toContain('Disallow: /404.html');
        expect(robots).toContain('Disallow: /generated-pages.html');
        expect(robots).toContain('Disallow: /pages-extracted/');
    });

    test('la couche IA publique expose des formats cohérents', async () => {
        const llms = fs.readFileSync(path.join(SRC_DIR, 'llms.txt'), 'utf8');
        const forAiHtml = fs.readFileSync(path.join(SRC_DIR, 'for-ai/index.html'), 'utf8');
        const forAiJson = JSON.parse(fs.readFileSync(path.join(SRC_DIR, 'for-ai.json'), 'utf8'));
        const schema = JSON.parse(fs.readFileSync(path.join(SRC_DIR, 'schema-webpage.jsonld'), 'utf8'));

        expect(llms).toContain(`${BASE_URL}/for-ai`);
        expect(llms).toContain(`${BASE_URL}/for-ai.json`);
        expect(llms).toContain(`${BASE_URL}/for-ai.txt`);
        expect(forAiHtml).toContain('Contexte IA pour agents');
        expect(forAiJson.canonical_url).toBe(`${BASE_URL}/`);
        expect(forAiJson.do_not_extrapolate.length).toBeGreaterThanOrEqual(3);
        expect(schema['@context']).toBe('https://schema.org');
        expect(schema['@graph'].some((item) => item['@id'] === `${BASE_URL}/for-ai#webpage`)).toBe(true);
    });

    test('les liens internes et assets HTML restent relatifs quand le SEO autorise une URL relative', async () => {
        const internalAbsolutePattern = new RegExp(`^${BASE_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:/|#|$)`);

        for (const file of INDEXABLE_HTML) {
            const html = fs.readFileSync(path.join(SRC_DIR, file), 'utf8');
            const refs = [...html.matchAll(/<(a|img|script|iframe|source|video|audio)\b[^>]*(?:href|src|poster)=["']([^"']+)["']/g)];

            for (const [, tag, ref] of refs) {
                expect(ref, `${file} <${tag}> doit rester relatif si c'est un lien interne`).not.toMatch(internalAbsolutePattern);
            }
        }
    });

    test('les pages publiques gardent une CSP statique et une console sans avertissements HTML évitables', async () => {
        const requiredDirectives = [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://player.vimeo.com",
            "style-src 'self' 'unsafe-inline'",
            "font-src 'self' data:",
            'frame-src https://player.vimeo.com https://www.youtube.com https://www.youtube-nocookie.com',
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
        ];
        const supportedPreloadAs = new Set([
            'audio',
            'document',
            'embed',
            'fetch',
            'font',
            'image',
            'object',
            'script',
            'style',
            'track',
            'worker',
        ]);

        for (const file of PUBLIC_HTML_FILES) {
            const html = fs.readFileSync(path.join(SRC_DIR, file), 'utf8');
            const csp = extract(/<meta http-equiv="Content-Security-Policy" content="([^"]+)">/, html);
            const preloadAsValues = [...html.matchAll(/<link\b[^>]*\brel="preload"[^>]*\bas="([^"]+)"/g)]
                .map((match) => match[1]);

            expect(csp, `${file} doit déclarer une CSP statique`).not.toBe('');
            for (const directive of requiredDirectives) {
                expect(csp, `${file} CSP doit contenir ${directive}`).toContain(directive);
            }

            expect(html, `${file} ne doit pas précharger toutes les polices par défaut`).not.toContain('rel="preload" href="fonts/');
            expect(html, `${file} ne doit pas doubler fullscreen entre allow et allowfullscreen`).not.toContain('allowfullscreen');
            for (const asValue of preloadAsValues) {
                expect(supportedPreloadAs.has(asValue), `${file} preload as="${asValue}" doit être supporté par Chrome`).toBe(true);
            }
        }
    });

    test('les pages stratégiques ont une réponse directe et un tableau de faits visibles', async () => {
        for (const file of STRATEGIC_DIRECT_ANSWER_PAGES) {
            const html = fs.readFileSync(path.join(SRC_DIR, file), 'utf8');
            const panel = extract(/(<section class="seo-geo-panel"[\s\S]*?<\/section>)/, html);

            expect(panel, file).toContain('seo-geo-panel__title');
            expect(panel, file).toContain('seo-geo-panel__answer');
            expect(panel, file).toContain('seo-geo-panel__table');
            expect(panel, file).toContain('<caption>');
            expect(panel, file).toContain('<th scope="row">');

            const answer = extract(/<p class="seo-geo-panel__answer">([\s\S]*?)<\/p>/, panel)
                .replace(/<[^>]+>/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
            const wordCount = answer.split(/\s+/).filter(Boolean).length;

            expect(wordCount, file).toBeGreaterThanOrEqual(35);
            expect(wordCount, file).toBeLessThanOrEqual(95);
        }
    });

    test('la matrice de mesure préproduction garde des événements traçables sans inventer de métriques', async ({ page }) => {
        const events = parseMeasurementMatrix();
        const requiredFields = [
            'event_name',
            'page_path',
            'selector',
            'trigger',
            'preprod_status',
            'prod_activation',
            'tool_target',
            'metric_status',
        ];

        expect(events.length).toBeGreaterThanOrEqual(5);

        for (const event of events) {
            for (const field of requiredFields) {
                expect(event[field], `${event.event_name} doit renseigner ${field}`).not.toBe('');
            }

            expect(event.metric_status, `${event.event_name} ne doit pas inventer de métrique`).toBe('unknown');
            expect(event.prod_activation, `${event.event_name} doit différer la collecte au domaine final`).toMatch(/^(activate_on_final_domain|activate_when_booking_active|activate_when_newsletter_active)$/);

            await page.goto(`/${event.page_path}`);
            await expect(page.locator(event.selector).first(), `${event.event_name} selector ${event.selector}`).toHaveCount(1);
        }

        for (const file of PUBLIC_TEXT_FILES) {
            const content = fs.readFileSync(path.join(SRC_DIR, file), 'utf8');

            expect(content, `${file} ne doit pas charger Google Tag Manager en préproduction`).not.toContain('googletagmanager.com');
            expect(content, `${file} ne doit pas contenir un ID GTM en préproduction`).not.toMatch(/\bGTM-[A-Z0-9]+\b/);
            expect(content, `${file} ne doit pas contenir un ID GA4 en préproduction`).not.toMatch(/\bG-[A-Z0-9]{6,}\b/);
        }
    });

    test('le build de production exclut les artefacts de travail', async () => {
        buildProd();

        expect(fs.existsSync(path.join(distDir, 'index.html'))).toBe(true);
        expect(fs.existsSync(path.join(distDir, 'sitemap.xml'))).toBe(true);
        expect(fs.existsSync(path.join(distDir, 'robots.txt'))).toBe(true);
        expect(fs.existsSync(path.join(distDir, 'llms.txt'))).toBe(true);
        expect(fs.existsSync(path.join(distDir, 'for-ai/index.html'))).toBe(true);
        expect(fs.existsSync(path.join(distDir, 'for-ai.json'))).toBe(true);
        expect(fs.existsSync(path.join(distDir, 'for-ai.txt'))).toBe(true);
        expect(fs.existsSync(path.join(distDir, 'schema-webpage.jsonld'))).toBe(true);

        expect(fs.existsSync(path.join(distDir, 'generated-pages.html'))).toBe(false);
        expect(fs.existsSync(path.join(distDir, 'pages-extracted'))).toBe(false);
        expect(fs.existsSync(path.join(distDir, 'maquette-site.pdf'))).toBe(false);
        expect(fs.existsSync(path.join(distDir, 'README.md'))).toBe(false);
        expect(fs.existsSync(path.join(distDir, 'ROADMAP.md'))).toBe(false);
        expect(fs.existsSync(path.join(distDir, 'CLAUDE.md'))).toBe(false);
    });
});
