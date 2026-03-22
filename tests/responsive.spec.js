// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Responsive — pas de débordement horizontal', () => {
    const PAGES_TO_TEST = [
        '/index.html',
        '/espaces-augmentes.html',
        '/experiences-series.html',
        '/experience-monroe.html',
        '/reservations.html',
        '/plan-du-site.html',
        '/mentions-legales.html',
    ];

    for (const url of PAGES_TO_TEST) {
        const name = url.replace('/', '').replace('.html', '') || 'index';

        test(`${name} — pas de scroll horizontal`, async ({ page }) => {
            await page.goto(url);
            const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
            const viewportWidth = await page.evaluate(() => window.innerWidth);
            expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
        });
    }
});

test.describe('Responsive — grilles en colonne sur mobile', () => {
    test('page 9 grille — colonne unique sous 600px', async ({ page }) => {
        await page.goto('/experiences-series.html');
        const info = test.info();
        const width = info.project.use?.viewport?.width || 1920;
        if (width <= 600) {
            const grid = page.locator('.page9__grid');
            const columns = await grid.evaluate(el => getComputedStyle(el).gridTemplateColumns);
            // Colonne unique = une seule valeur
            expect(columns.split(' ').length).toBe(1);
        }
    });

    test('page 6 grille — colonne unique sous 768px', async ({ page }) => {
        await page.goto('/espaces-augmentes.html');
        const info = test.info();
        const width = info.project.use?.viewport?.width || 1920;
        if (width <= 768) {
            const grid = page.locator('.page6__main');
            const columns = await grid.evaluate(el => getComputedStyle(el).gridTemplateColumns);
            expect(columns.split(' ').length).toBe(1);
        }
    });

    test('footer — colonne sur mobile', async ({ page }) => {
        await page.goto('/');
        const info = test.info();
        const width = info.project.use?.viewport?.width || 1920;
        if (width <= 480) {
            const nav = page.locator('.footer__nav-list');
            const direction = await nav.evaluate(el => getComputedStyle(el).flexDirection);
            expect(direction).toBe('column');
        }
    });
});
