// @ts-check
const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
const { buildProd, distDir } = require('../scripts/build-prod');

const BASE_URL = (process.env.SEO_BASE_URL || 'https://swing.appmiweb.com').replace(/\/+$/, '');
const PLACEHOLDER_DOMAIN = 'DO' + 'MAINE';
const SRC_DIR = path.join(__dirname, '..', 'src');
const INDEXABLE_HTML = fs.readdirSync(SRC_DIR)
    .filter((file) => file.endsWith('.html'))
    .filter((file) => !['404.html', 'generated-pages.html'].includes(file))
    .sort();
const STRATEGIC_DIRECT_ANSWER_PAGES = [
    'espaces-augmentes.html',
    'experiences-series.html',
    'experience-monroe.html',
];

const canonicalFor = (file) => (file === 'index.html' ? `${BASE_URL}/` : `${BASE_URL}/${file}`);

const extract = (pattern, text) => {
    const match = text.match(pattern);
    return match ? match[1] : '';
};

test.describe('SEO/GEO technique', () => {
    test.beforeEach(({}, testInfo) => {
        test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle statique exécuté une seule fois.');
    });

    test('aucun placeholder de domaine ne reste dans les fichiers publics', async () => {
        const files = fs.readdirSync(SRC_DIR)
            .filter((file) => /\.(html|xml|txt)$/.test(file))
            .map((file) => path.join(SRC_DIR, file));

        for (const file of files) {
            const content = fs.readFileSync(file, 'utf8');
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
        expect(robots).toContain('Disallow: /404.html');
        expect(robots).toContain('Disallow: /generated-pages.html');
        expect(robots).toContain('Disallow: /pages-extracted/');
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

    test('le build de production exclut les artefacts de travail', async () => {
        buildProd();

        expect(fs.existsSync(path.join(distDir, 'index.html'))).toBe(true);
        expect(fs.existsSync(path.join(distDir, 'sitemap.xml'))).toBe(true);
        expect(fs.existsSync(path.join(distDir, 'robots.txt'))).toBe(true);
        expect(fs.existsSync(path.join(distDir, 'llms.txt'))).toBe(true);

        expect(fs.existsSync(path.join(distDir, 'generated-pages.html'))).toBe(false);
        expect(fs.existsSync(path.join(distDir, 'pages-extracted'))).toBe(false);
        expect(fs.existsSync(path.join(distDir, 'maquette-site.pdf'))).toBe(false);
        expect(fs.existsSync(path.join(distDir, 'README.md'))).toBe(false);
        expect(fs.existsSync(path.join(distDir, 'ROADMAP.md'))).toBe(false);
        expect(fs.existsSync(path.join(distDir, 'CLAUDE.md'))).toBe(false);
    });
});
