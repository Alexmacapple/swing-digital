#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const expectedBase = (process.argv[2] || '').replace(/\/+$/, '');
const placeholderDomain = 'DO' + 'MAINE';

if (!/^https:\/\/[^/]+/.test(expectedBase)) {
    console.error('Usage : node scripts/check-prod-seo-base.js https://www.example.com');
    process.exit(1);
}

const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'src');
const publicFiles = fs.readdirSync(srcDir)
    .filter((file) => /\.(html|xml|txt)$/.test(file))
    .map((file) => path.join(srcDir, file));

const errors = [];

for (const file of publicFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const relative = path.relative(root, file);

    if (content.includes('http://localhost:8080') || content.includes('https://localhost:8080')) {
        errors.push(`${relative} contient encore localhost.`);
    }

    if (content.includes(placeholderDomain)) {
        errors.push(`${relative} contient encore un placeholder de domaine.`);
    }

    const urlMatches = content.match(/https?:\/\/[^"'<\s)]+/g) || [];
    for (const url of urlMatches) {
        const isOwnedPublicUrl = url.includes('/img/')
            || url.endsWith('/sitemap.xml')
            || url.includes('/#')
            || url.includes('/reservations.html')
            || url.includes('/espaces-augmentes.html')
            || url.includes('/experiences-series.html')
            || url.includes('/experience-monroe.html')
            || url.includes('/monroe-')
            || url.includes('/voyage-autour-de-moi.html')
            || url.includes('/dessine-moi-le-vent.html')
            || url.includes('/ni-vues-ni-connues.html')
            || url.includes('/marilyn.html')
            || url.includes('/toulouse-lautrec.html')
            || url.includes('/charlotte-henschel.html')
            || url.includes('/xr-corporate.html')
            || url.includes('/mentions-legales.html')
            || url.includes('/plan-du-site.html')
            || url === `${expectedBase}/`;

        if (isOwnedPublicUrl && !url.startsWith(expectedBase)) {
            errors.push(`${relative} contient une URL publique hors domaine attendu : ${url}`);
        }
    }
}

if (errors.length > 0) {
    console.error(errors.join('\n'));
    process.exit(1);
}

console.log(`Base SEO de production validée : ${expectedBase}`);
