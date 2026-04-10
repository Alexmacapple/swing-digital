// @ts-check
const { test, expect } = require('@playwright/test');

const PAGES = [
    { url: '/', title: 'Swing Digital' },
    { url: '/espaces-augmentes.html', title: 'Espaces augmentés' },
    { url: '/experiences-series.html', title: 'Expériences Séries' },
    { url: '/experience-monroe.html', title: "L'Expérience Monroe" },
    { url: '/reservations.html', title: 'Réservations' },
    { url: '/plan-du-site.html', title: 'Plan du site' },
    { url: '/mentions-legales.html', title: 'Mentions légales' },
    { url: '/404.html', title: 'Page introuvable' },
];

test.describe('Navigation', () => {
    for (const page of PAGES) {
        test(`${page.title} — charge sans erreur`, async ({ page: p }) => {
            const response = await p.goto(page.url);
            expect(response.status()).toBe(200);
        });
    }

    test('menu principal — 4 liens visibles en desktop', async ({ page }) => {
        const info = test.info();
        const width = info.project.use?.viewport?.width || 1920;
        test.skip(width < 1024, 'Desktop only');
        await page.goto('/');
        const links = page.locator('.site-nav__list > .site-nav__item');
        await expect(links).toHaveCount(4);
    });

    test('hamburger — visible en mobile, caché en desktop', async ({ page }) => {
        await page.goto('/');
        const burger = page.locator('.site-nav__burger');
        const info = test.info();
        const width = info.project.use?.viewport?.width || 1920;
        if (width <= 1024) {
            await expect(burger).toBeVisible();
        } else {
            await expect(burger).toBeHidden();
        }
    });

    test('dropdown Expériences — ouvre au clic', async ({ page }) => {
        await page.goto('/');
        const info = test.info();
        const width = info.project.use?.viewport?.width || 1920;

        if (width <= 1024) {
            await page.locator('.site-nav__burger').click();
        }

        const btn = page.locator('.site-nav__btn[aria-controls="submenu-experiences"]');
        await btn.click();
        await expect(btn).toHaveAttribute('aria-expanded', 'true');

        const submenu = page.locator('#submenu-experiences');
        await expect(submenu).toBeVisible();
    });

    test('sous-menu Monroe — ouvre au clic', async ({ page }) => {
        await page.goto('/');
        const info = test.info();
        const width = info.project.use?.viewport?.width || 1920;

        if (width <= 1024) {
            await page.locator('.site-nav__burger').click();
        }

        await page.locator('.site-nav__btn[aria-controls="submenu-experiences"]').click();
        const toggle = page.locator('.site-nav__submenu-toggle[aria-controls="submenu-monroe"]');
        await toggle.click();
        await expect(toggle).toHaveAttribute('aria-expanded', 'true');

        const submenu = page.locator('#submenu-monroe');
        await expect(submenu).toBeVisible();
    });
});
