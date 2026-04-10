// @ts-check
const { test, expect } = require('@playwright/test');
const axe = require('axe-core');

// 24 pages du site — cohérent avec l'objectif CLAUDE.md
// « 0 violation axe-core sur 24 pages »
const PAGES = [
    '/',
    '/espaces-augmentes.html',
    '/experiences-series.html',
    '/experience-monroe.html',
    '/monroe-piece.html',
    '/monroe-roman-graphique.html',
    '/monroe-installation.html',
    '/monroe-photographie.html',
    '/monroe-composition.html',
    '/monroe-podcasts.html',
    '/monroe-interviews.html',
    '/monroe-experiences.html',
    '/monroe-quiz.html',
    '/voyage-autour-de-moi.html',
    '/dessine-moi-le-vent.html',
    '/ni-vues-ni-connues.html',
    '/marilyn.html',
    '/toulouse-lautrec.html',
    '/charlotte-henschel.html',
    '/xr-corporate.html',
    '/reservations.html',
    '/404.html',
    '/plan-du-site.html',
    '/mentions-legales.html',
];

test.describe('Accessibilité axe-core — 24 pages WCAG 2.2 AA', () => {
    for (const url of PAGES) {
        const name = url === '/' ? 'index' : url.replace('/', '').replace('.html', '');

        test(`${name} — 0 violation axe-core`, async ({ page }, testInfo) => {
            // Un seul projet suffit pour le scan statique (DOM identique sur tous les viewports)
            test.skip(testInfo.project.name !== 'desktop-1920', 'Scan axe-core sur desktop-1920 uniquement');
            // 'load' (et non 'domcontentloaded') pour eviter les flaky liees aux videos
            // hero qui se chargent apres le DOMContentLoaded en concurrence multi-workers
            await page.goto(url, { waitUntil: 'load' });
            await page.addScriptTag({ content: axe.source });
            const results = await page.evaluate(async () => {
                // @ts-ignore — axe est attaché à window après addScriptTag
                return await window.axe.run({
                    runOnly: {
                        type: 'tag',
                        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
                    },
                });
            });
            const violations = results.violations.map(v => ({
                id: v.id,
                impact: v.impact,
                description: v.description,
                nodes: v.nodes.length,
            }));
            expect(violations, `${violations.length} violation(s) axe-core sur ${url}`).toEqual([]);
        });
    }
});
