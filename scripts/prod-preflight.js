#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { buildProd, distDir } = require('./build-prod');

const args = process.argv.slice(2);
const isPreprod = args.includes('--preprod');
const expectedBase = (args.find((arg) => !arg.startsWith('--')) || '').replace(/\/+$/, '');
const placeholderDomain = 'DO' + 'MAINE';
const textExtensions = new Set(['.html', '.xml', '.txt', '.css', '.js']);
const errors = [];
const warnings = [];

function usage() {
    console.error('Usage : node scripts/prod-preflight.js [--preprod] https://www.example.com');
}

function walk(dir) {
    const files = [];

    for (const dirent of fs.readdirSync(dir, { withFileTypes: true })) {
        const absolute = path.join(dir, dirent.name);

        if (dirent.isDirectory()) {
            files.push(...walk(absolute));
        } else if (dirent.isFile()) {
            files.push(absolute);
        }
    }

    return files;
}

function read(relativePath) {
    return fs.readFileSync(path.join(distDir, relativePath), 'utf8');
}

function textContent(file) {
    return fs.readFileSync(file, 'utf8');
}

function fileExistsForUrl(url) {
    const parsed = new URL(url);
    const pathname = decodeURIComponent(parsed.pathname);
    const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    return fs.existsSync(path.join(distDir, relative));
}

function checkLocalReference(sourceFile, ref, kind) {
    if (/^(https?:|mailto:|tel:|javascript:|data:)/.test(ref)) {
        return;
    }

    const [pathPart, hashPart] = ref.split('#');
    const cleanPath = pathPart.split('?')[0];
    const sourceDir = path.dirname(sourceFile);
    const target = cleanPath
        ? path.normalize(cleanPath.startsWith('/')
            ? path.join(distDir, cleanPath)
            : path.join(sourceDir, cleanPath))
        : sourceFile;

    if (!target.startsWith(distDir)) {
        errors.push(`${path.relative(distDir, sourceFile)} référence un chemin hors dist : ${ref}`);
        return;
    }

    if (cleanPath && !fs.existsSync(target)) {
        errors.push(`${path.relative(distDir, sourceFile)} référence ${kind} introuvable : ${ref}`);
        return;
    }

    if (hashPart && target.endsWith('.html')) {
        const targetHtml = fs.readFileSync(target, 'utf8');
        const id = decodeURIComponent(hashPart);
        const idPattern = new RegExp(`id=["']${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`);

        if (!idPattern.test(targetHtml)) {
            errors.push(`${path.relative(distDir, sourceFile)} référence une ancre absente : ${ref}`);
        }
    }
}

function checkTextFile(file) {
    const relative = path.relative(distDir, file);
    const content = textContent(file);

    if (content.includes('http://localhost:8080') || content.includes('https://localhost:8080')) {
        errors.push(`${relative} contient encore localhost.`);
    }

    if (content.includes(placeholderDomain) || /example\.com/i.test(content)) {
        errors.push(`${relative} contient encore un domaine de démonstration.`);
    }

    if (/\[(Nom|Adresse|Téléphone) de l'hébergeur\]/.test(content)) {
        const message = `${relative} contient encore un placeholder d'hébergement légal.`;
        if (isPreprod) {
            warnings.push(`${message} Accepté uniquement en préproduction.`);
        } else {
            errors.push(message);
        }
    }

    if (/\b(à compléter|à renseigner|a completer|a renseigner)\b/i.test(content)) {
        const message = `${relative} contient encore une information à compléter.`;
        if (isPreprod) {
            warnings.push(`${message} Accepté uniquement en préproduction.`);
        } else {
            errors.push(message);
        }
    }

    if (relative === 'reservations.html' && /aria-disabled=["']true["']/.test(content)) {
        warnings.push('reservations.html contient des CTA désactivés : acceptable seulement si le lancement prod est informatif, pas transactionnel.');
    }

    if (relative === 'reservations.html' && /bientôt disponible/i.test(content)) {
        warnings.push('reservations.html annonce une billetterie bientôt disponible : à valider avant une campagne SEO orientée réservation.');
    }
}

function checkHtmlFile(file) {
    const relative = path.relative(distDir, file);
    const html = textContent(file);

    const title = html.match(/<title>([^<]+)<\/title>/);
    if (!title || title[1].trim().length < 10) {
        errors.push(`${relative} n'a pas de title exploitable.`);
    }

    const metaDescription = html.match(/<meta name=["']description["'] content=(["'])([\s\S]*?)\1>/);
    if (relative !== '404.html' && (!metaDescription || metaDescription[2].trim().length < 50)) {
        errors.push(`${relative} n'a pas de meta description exploitable.`);
    }

    const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length;
    if (h1Count !== 1) {
        errors.push(`${relative} doit avoir exactement un h1, trouvé : ${h1Count}.`);
    }

    const canonical = html.match(/<link rel=["']canonical["'] href=["']([^"']+)["']>/);
    if (relative !== '404.html' && (!canonical || !canonical[1].startsWith(`${expectedBase}/`))) {
        errors.push(`${relative} a un canonical absent ou hors domaine attendu.`);
    }

    if (relative === '404.html' && !/<meta name=["']robots["'] content=["']noindex, follow["']>/.test(html)) {
        errors.push('404.html doit rester en noindex, follow.');
    }

    if (relative !== '404.html' && /<meta name=["']robots["'] content=["'][^"']*noindex/i.test(html)) {
        errors.push(`${relative} ne doit pas être noindex en production.`);
    }

    const jsonLdBlocks = [...html.matchAll(/<script type=["']application\/ld\+json["']>\s*([\s\S]*?)\s*<\/script>/g)];
    if (relative !== '404.html' && jsonLdBlocks.length === 0) {
        errors.push(`${relative} n'a pas de JSON-LD.`);
    }

    for (const [index, block] of jsonLdBlocks.entries()) {
        try {
            JSON.parse(block[1]);
        } catch (error) {
            errors.push(`${relative} contient un JSON-LD invalide au bloc ${index + 1}: ${error.message}`);
        }
    }

    const refs = [...html.matchAll(/(?:src|href|poster)=["']([^"']+)["']/g)].map((match) => match[1]);
    for (const ref of refs) {
        checkLocalReference(file, ref, 'une ressource');
    }
}

function checkCssFile(file) {
    const css = textContent(file);
    const refs = [...css.matchAll(/url\((['"]?)([^)'"]+)\1\)/g)].map((match) => match[2]);

    for (const ref of refs) {
        checkLocalReference(file, ref, 'une ressource CSS');
    }
}

function checkSitemap() {
    const sitemapPath = path.join(distDir, 'sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
        errors.push('sitemap.xml est absent de dist/.');
        return;
    }

    const sitemap = read('sitemap.xml');
    const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

    if (locs.length === 0) {
        errors.push('sitemap.xml ne contient aucune URL.');
    }

    for (const loc of locs) {
        if (!loc.startsWith(`${expectedBase}/`)) {
            errors.push(`sitemap.xml contient une URL hors domaine attendu : ${loc}`);
        }

        if (!fileExistsForUrl(loc)) {
            errors.push(`sitemap.xml référence une page absente de dist/ : ${loc}`);
        }
    }
}

function checkRobots() {
    const robotsPath = path.join(distDir, 'robots.txt');
    if (!fs.existsSync(robotsPath)) {
        errors.push('robots.txt est absent de dist/.');
        return;
    }

    const robots = read('robots.txt');
    if (!robots.includes(`Sitemap: ${expectedBase}/sitemap.xml`)) {
        errors.push('robots.txt ne pointe pas vers le sitemap de production attendu.');
    }
}

if (!/^https:\/\/[^/]+/.test(expectedBase) || /localhost/i.test(expectedBase)) {
    usage();
    process.exit(1);
}

const manifest = buildProd();
const files = walk(distDir);

for (const file of files) {
    const relative = path.relative(distDir, file);
    const extension = path.extname(file);

    if (
        relative.startsWith(`pages-extracted${path.sep}`)
        || relative === 'generated-pages.html'
        || relative.endsWith('.md')
        || relative.endsWith('.pdf')
        || relative.includes('.DS_Store')
        || relative.includes('.gitkeep')
    ) {
        errors.push(`Artefact non public présent dans dist/ : ${relative}`);
    }

    if (textExtensions.has(extension)) {
        checkTextFile(file);
    }

    if (extension === '.html') {
        checkHtmlFile(file);
    }

    if (extension === '.css') {
        checkCssFile(file);
    }
}

checkSitemap();
checkRobots();

for (const warning of warnings) {
    console.warn(`Avertissement : ${warning}`);
}

if (errors.length > 0) {
    console.error(errors.join('\n'));
    console.error(`Preflight production échoué : ${errors.length} erreur(s), ${warnings.length} avertissement(s).`);
    process.exit(1);
}

console.log(`Preflight ${isPreprod ? 'préproduction' : 'production'} OK : ${manifest.files.length} fichier(s) publics validés dans dist/`);
if (warnings.length > 0) {
    console.log(`${warnings.length} avertissement(s) non bloquant(s) à traiter selon le scénario de lancement.`);
}
