// @ts-check
const { test, expect } = require('@playwright/test');

const ALL_PAGES = [
    '/index.html',
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

test.describe('Structure HTML commune', () => {
    for (const url of ALL_PAGES) {
        const name = url.replace('/', '').replace('.html', '') || 'index';

        test(`${name} — a un skip link`, async ({ page }) => {
            await page.goto(url);
            const skip = page.locator('.skip-link');
            await expect(skip).toHaveAttribute('href', '#main-content');
        });

        test(`${name} — a un header`, async ({ page }) => {
            await page.goto(url);
            await expect(page.locator('.site-header')).toHaveCount(1);
        });

        test(`${name} — a un breadcrumb`, async ({ page }) => {
            await page.goto(url);
            await expect(page.locator('.breadcrumb')).toHaveCount(1);
            await expect(page.locator('.breadcrumb__link[aria-current="page"]')).toHaveCount(1);
        });

        test(`${name} — a un main#main-content`, async ({ page }) => {
            await page.goto(url);
            await expect(page.locator('main#main-content')).toHaveCount(1);
        });

        test(`${name} — a un h1`, async ({ page }) => {
            await page.goto(url);
            await expect(page.locator('h1')).toHaveCount(1);
        });

        test(`${name} — a un footer`, async ({ page }) => {
            await page.goto(url);
            await expect(page.locator('.site-footer')).toHaveCount(1);
        });

        test(`${name} — a lang=fr`, async ({ page }) => {
            await page.goto(url);
            await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
        });

        test(`${name} — a un title`, async ({ page }) => {
            await page.goto(url);
            const title = await page.title();
            expect(title.length).toBeGreaterThan(5);
            expect(title).toContain('Swing Digital');
        });

        test(`${name} — a un favicon`, async ({ page }) => {
            await page.goto(url);
            const favicon = page.locator('link[rel="icon"]');
            await expect(favicon).toHaveCount(1);
        });
    }
});
