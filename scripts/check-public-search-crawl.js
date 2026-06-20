#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const forbiddenPublicPaths = [
    '/generated-pages.html',
    '/pages-extracted/',
    '/maquette-site.pdf',
    '/README.md',
    '/CLAUDE.md',
    '/ROADMAP.md',
    '/todo.md',
    '/.DS_Store',
];

function usage() {
    console.error('Usage : node scripts/check-public-search-crawl.js https://example.com [--out chemin/preuve.json]');
}

function parseArgs(argv) {
    const args = [...argv];
    const outIndex = args.indexOf('--out');
    let outFile = '';

    if (outIndex !== -1) {
        outFile = args[outIndex + 1] || '';
        args.splice(outIndex, 2);
    }

    const base = (args[0] || '').replace(/\/+$/, '');
    if (!/^https:\/\/[^/]+/.test(base)) {
        usage();
        process.exit(1);
    }

    return { base, outFile };
}

async function request(url, options = {}) {
    const started = Date.now();

    try {
        const response = await fetch(url, { redirect: 'follow', ...options });
        const body = options.method === 'HEAD' ? '' : await response.text();

        return {
            ok: true,
            url,
            status: response.status,
            statusText: response.statusText,
            finalUrl: response.url,
            contentType: response.headers.get('content-type') || '',
            cacheControl: response.headers.get('cache-control') || '',
            server: response.headers.get('server') || '',
            elapsedMs: Date.now() - started,
            body,
        };
    } catch (error) {
        return {
            ok: false,
            url,
            status: 0,
            statusText: error.name || 'FetchError',
            finalUrl: url,
            contentType: '',
            cacheControl: '',
            server: '',
            elapsedMs: Date.now() - started,
            error: error.message,
            body: '',
        };
    }
}

function getAttr(tag, name) {
    const match = tag.match(new RegExp(`${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'));
    return match ? match[2].trim() : '';
}

function findLink(html, rel) {
    const tags = html.match(/<link\b[^>]*>/gi) || [];
    const target = rel.toLowerCase();

    for (const tag of tags) {
        const relValue = getAttr(tag, 'rel').toLowerCase().split(/\s+/);
        if (relValue.includes(target)) {
            return getAttr(tag, 'href');
        }
    }

    return '';
}

function findMeta(html, key, value) {
    const tags = html.match(/<meta\b[^>]*>/gi) || [];

    for (const tag of tags) {
        const attr = getAttr(tag, key).toLowerCase();
        if (attr === value.toLowerCase()) {
            return getAttr(tag, 'content');
        }
    }

    return '';
}

function normalizeExpectedUrl(base, rawUrl) {
    const url = new URL(rawUrl);
    if (url.pathname === '' || url.pathname === '/') {
        return `${base}/`;
    }

    return `${base}${url.pathname}`;
}

function sameUrl(first, second) {
    if (!first || !second) {
        return false;
    }

    try {
        const firstUrl = new URL(first);
        const secondUrl = new URL(second);
        const firstPath = firstUrl.pathname === '' ? '/' : firstUrl.pathname;
        const secondPath = secondUrl.pathname === '' ? '/' : secondUrl.pathname;

        return firstUrl.protocol === secondUrl.protocol
            && firstUrl.hostname === secondUrl.hostname
            && firstPath === secondPath
            && firstUrl.search === secondUrl.search;
    } catch {
        return first === second;
    }
}

async function fetchWithHeadFallback(url) {
    const head = await request(url, { method: 'HEAD' });
    if (head.status === 405 || head.status === 403) {
        return request(url);
    }

    return head;
}

function collectFailures(summary, checks) {
    const failures = [];

    if (!summary.sitemapStatusOk) {
        failures.push({
            type: 'sitemap',
            message: 'Sitemap non conforme.',
            status: checks.sitemap.status,
            contentType: checks.sitemap.contentType,
        });
    }

    if (!summary.robotsStatusOk) {
        failures.push({
            type: 'robots',
            message: 'robots.txt ne répond pas 200.',
            status: checks.robots.status,
        });
    }

    if (!summary.robotsDeclaresSitemap) {
        failures.push({
            type: 'robots',
            message: 'robots.txt ne déclare pas le sitemap attendu.',
        });
    }

    if (!summary.llmsStatusOk) {
        failures.push({
            type: 'llms',
            message: 'llms.txt ne répond pas 200.',
            status: checks.llms.status,
        });
    }

    for (const page of checks.pages) {
        if (page.status !== 200) {
            failures.push({ type: 'page_status', url: page.url, status: page.status });
        }

        if (!page.canonicalOk) {
            failures.push({
                type: 'canonical',
                url: page.url,
                expected: page.expectedUrl,
                actual: page.canonical,
            });
        }

        if (!page.ogUrlOk) {
            failures.push({
                type: 'og_url',
                url: page.url,
                expected: page.expectedUrl,
                actual: page.ogUrl,
            });
        }

        if (!page.ogImage) {
            failures.push({ type: 'og_image_missing', url: page.url });
        }
    }

    for (const image of checks.ogImages) {
        if (!image.ok) {
            failures.push({
                type: 'og_image_status',
                url: image.url,
                status: image.status,
                contentType: image.contentType,
            });
        }
    }

    for (const artifact of checks.forbiddenArtifacts) {
        if (!artifact.notPublicOk) {
            failures.push({
                type: 'forbidden_artifact_public',
                url: artifact.url,
                status: artifact.status,
                contentType: artifact.contentType,
            });
        }
    }

    return failures;
}

async function buildEvidence(base) {
    const robots = await request(`${base}/robots.txt`);
    const sitemap = await request(`${base}/sitemap.xml`);
    const llms = await request(`${base}/llms.txt`);
    const sitemapUrls = [...new Set(
        [...sitemap.body.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) => match[1].trim())
    )];

    const pages = [];
    const ogImageUrls = new Set();

    for (const url of sitemapUrls) {
        const page = await request(url);
        const html = page.body;
        const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
        const canonical = findLink(html, 'canonical');
        const ogUrl = findMeta(html, 'property', 'og:url');
        const ogImage = findMeta(html, 'property', 'og:image');
        const robotsMeta = findMeta(html, 'name', 'robots');
        const jsonLdCount = (html.match(/<script\b[^>]*type\s*=\s*(["'])application\/ld\+json\1[^>]*>/gi) || []).length;
        const expectedUrl = normalizeExpectedUrl(base, url);

        if (ogImage) {
            ogImageUrls.add(new URL(ogImage, url).href);
        }

        pages.push({
            url,
            expectedUrl,
            status: page.status,
            finalUrl: page.finalUrl,
            contentType: page.contentType,
            elapsedMs: page.elapsedMs,
            title: titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : '',
            canonical,
            canonicalOk: sameUrl(canonical, expectedUrl),
            ogUrl,
            ogUrlOk: sameUrl(ogUrl, expectedUrl),
            ogImage: ogImage ? new URL(ogImage, url).href : '',
            robotsMeta,
            indexable: !/noindex/i.test(robotsMeta),
            jsonLdCount,
            hasBody: html.length > 0,
            htmlBytes: Buffer.byteLength(html, 'utf8'),
        });
    }

    const ogImages = [];
    for (const imageUrl of [...ogImageUrls].sort()) {
        const image = await fetchWithHeadFallback(imageUrl);
        ogImages.push({
            url: imageUrl,
            status: image.status,
            finalUrl: image.finalUrl,
            contentType: image.contentType,
            elapsedMs: image.elapsedMs,
            ok: image.status >= 200 && image.status < 300 && /^image\//i.test(image.contentType),
        });
    }

    const forbiddenArtifacts = [];
    for (const artifactPath of forbiddenPublicPaths) {
        const url = `${base}${artifactPath}`;
        const artifact = await fetchWithHeadFallback(url);
        forbiddenArtifacts.push({
            path: artifactPath,
            url,
            status: artifact.status,
            finalUrl: artifact.finalUrl,
            contentType: artifact.contentType,
            elapsedMs: artifact.elapsedMs,
            notPublicOk: artifact.status === 404 || artifact.status === 410 || artifact.status === 403,
        });
    }

    const robotsText = robots.body;
    const llmsText = llms.body;
    const checks = {
        robots: {
            url: `${base}/robots.txt`,
            status: robots.status,
            contentType: robots.contentType,
            declaresSitemap: robotsText.includes(`Sitemap: ${base}/sitemap.xml`),
            disallowRules: [...robotsText.matchAll(/^Disallow:\s*(.+)$/gim)].map((match) => match[1].trim()),
        },
        sitemap: {
            url: `${base}/sitemap.xml`,
            status: sitemap.status,
            contentType: sitemap.contentType,
            urlCount: sitemapUrls.length,
        },
        llms: {
            url: `${base}/llms.txt`,
            status: llms.status,
            contentType: llms.contentType,
            mentionsCanonicalBase: llmsText.includes(base),
            bytes: Buffer.byteLength(llmsText, 'utf8'),
        },
        pages,
        ogImages,
        forbiddenArtifacts,
    };

    const summary = {
        generatedAt: new Date().toISOString(),
        base,
        sitemapUrlCount: sitemapUrls.length,
        sitemapStatusOk: sitemap.status === 200 && /xml/i.test(sitemap.contentType),
        robotsStatusOk: robots.status === 200,
        robotsDeclaresSitemap: checks.robots.declaresSitemap,
        llmsStatusOk: llms.status === 200,
        llmsMentionsCanonicalBase: checks.llms.mentionsCanonicalBase,
        pages200: pages.filter((page) => page.status === 200).length,
        pagesCanonicalOk: pages.filter((page) => page.canonicalOk).length,
        pagesOgUrlOk: pages.filter((page) => page.ogUrlOk).length,
        pagesWithOgImage: pages.filter((page) => page.ogImage).length,
        ogImagesChecked: ogImages.length,
        ogImagesOk: ogImages.filter((image) => image.ok).length,
        forbiddenArtifactsChecked: forbiddenArtifacts.length,
        forbiddenArtifactsNotPublicOk: forbiddenArtifacts.filter((artifact) => artifact.notPublicOk).length,
    };
    const failures = collectFailures(summary, checks);

    return {
        summary,
        checks,
        failures,
        conclusion: failures.length === 0
            ? 'Validation publique Search/Crawl conforme.'
            : 'Validation publique Search/Crawl avec écarts à traiter.',
    };
}

async function main() {
    const { base, outFile } = parseArgs(process.argv.slice(2));
    const evidence = await buildEvidence(base);
    const serialized = `${JSON.stringify(evidence, null, 2)}\n`;

    if (outFile) {
        fs.mkdirSync(path.dirname(path.resolve(outFile)), { recursive: true });
        fs.writeFileSync(outFile, serialized);
    } else {
        process.stdout.write(serialized);
    }

    console.log(`Search/Crawl public : ${evidence.failures.length} écart(s), ${evidence.summary.sitemapUrlCount} URL sitemap contrôlée(s).`);

    if (outFile) {
        console.log(`Preuve écrite : ${outFile}`);
    }

    if (evidence.failures.length > 0) {
        console.error('Validation publique Search/Crawl échouée.');
        process.exitCode = 1;
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
