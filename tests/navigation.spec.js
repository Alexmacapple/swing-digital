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
            expect(response, `Navigation vers ${page.url} a echoue (response null)`).not.toBeNull();
            // @ts-ignore — garde verifiee ligne precedente
            expect(response.status()).toBe(200);
        });
    }

    test('menu principal — 4 liens visibles en desktop', async ({ page }) => {
        const info = test.info();
        const width = info.project.use?.viewport?.width || 1920;
        test.skip(width < 1024, 'Desktop only (breakpoint >= 1024px)');
        await page.goto('/');
        const links = page.locator('.site-nav__list > .site-nav__item');
        await expect(links).toHaveCount(4);
    });

    test('hamburger — visible en mobile, caché en desktop', async ({ page }) => {
        await page.goto('/');
        const burger = page.locator('.site-nav__burger');
        const info = test.info();
        const width = info.project.use?.viewport?.width || 1920;
        if (width <= 1023) {
            await expect(burger).toBeVisible();
        } else {
            await expect(burger).toBeHidden();
        }
    });

    test('dropdown Expériences — ouvre au clic', async ({ page }) => {
        await page.goto('/');
        const info = test.info();
        const width = info.project.use?.viewport?.width || 1920;

        if (width <= 1023) {
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

        if (width <= 1023) {
            await page.locator('.site-nav__burger').click();
        }

        await page.locator('.site-nav__btn[aria-controls="submenu-experiences"]').click();
        const toggle = page.locator('.site-nav__submenu-toggle[aria-controls="submenu-monroe"]');
        await toggle.click();
        await expect(toggle).toHaveAttribute('aria-expanded', 'true');

        const submenu = page.locator('#submenu-monroe');
        await expect(submenu).toBeVisible();
    });

    test('sous-menu Monroe — niveau 3 non clippé au survol desktop', async ({ page }) => {
        const info = test.info();
        const width = info.project.use?.viewport?.width || 1920;
        test.skip(width < 1024, 'Desktop only (breakpoint >= 1024px)');

        await page.goto('/');
        await page.locator('.site-nav__btn[aria-controls="submenu-experiences"]').hover();
        await page.locator('.site-nav__submenu-item--has-children').hover();

        const toggle = page.locator('.site-nav__submenu-toggle[aria-controls="submenu-monroe"]');
        await expect(toggle).toHaveAttribute('aria-expanded', 'true');
        await expect(page.locator('#submenu-monroe')).toBeVisible();

        const desktopState = await page.evaluate(() => {
            const firstLink = document.querySelector('#submenu-monroe .site-nav__submenu-link');
            const submenu = document.querySelector('#submenu-monroe');
            if (!firstLink || !submenu) return null;
            const rect = firstLink.getBoundingClientRect();
            const hit = document.elementFromPoint(rect.left + 8, rect.top + 8);
            const link = hit ? hit.closest('a') : null;
            return {
                firstLinkHit: link ? link.textContent.trim() : null,
                htmlScrollbarWidth: getComputedStyle(document.documentElement).scrollbarWidth,
                bodyScrollbarWidth: getComputedStyle(document.body).scrollbarWidth,
                submenuScrollbarWidth: getComputedStyle(submenu).scrollbarWidth,
            };
        });

        expect(desktopState).toEqual({
            firstLinkHit: '1. Pièce My Story',
            htmlScrollbarWidth: 'none',
            bodyScrollbarWidth: 'none',
            submenuScrollbarWidth: 'none',
        });
    });

    test('sous-menu Monroe — pas de troncature par scroll imbriqué mobile', async ({ page }) => {
        const info = test.info();
        const width = info.project.use?.viewport?.width || 1920;
        test.skip(width >= 1024, 'Mobile only (breakpoint <= 1023px)');

        await page.goto('/');
        await page.locator('.site-nav__burger').click();
        await page.locator('.site-nav__btn[aria-controls="submenu-experiences"]').click();
        await page.locator('.site-nav__submenu-toggle[aria-controls="submenu-monroe"]').click();

        const metrics = await page.evaluate(() => {
            const menu = document.querySelector('#main-menu');
            const submenu2 = document.querySelector('#submenu-experiences');
            const submenu3 = document.querySelector('#submenu-monroe');
            if (!menu || !submenu2 || !submenu3) return null;

            return {
                menuCanScroll: menu.scrollHeight > menu.clientHeight,
                htmlScrollbarWidth: getComputedStyle(document.documentElement).scrollbarWidth,
                bodyScrollbarWidth: getComputedStyle(document.body).scrollbarWidth,
                menuScrollbarWidth: getComputedStyle(menu).scrollbarWidth,
                submenu2MaxHeight: getComputedStyle(submenu2).maxHeight,
                submenu2OverflowY: getComputedStyle(submenu2).overflowY,
                submenu2ScrollbarWidth: getComputedStyle(submenu2).scrollbarWidth,
                submenu3MaxHeight: getComputedStyle(submenu3).maxHeight,
                submenu3OverflowY: getComputedStyle(submenu3).overflowY,
                submenu3ScrollbarWidth: getComputedStyle(submenu3).scrollbarWidth,
            };
        });

        expect(metrics).toEqual({
            menuCanScroll: true,
            htmlScrollbarWidth: 'none',
            bodyScrollbarWidth: 'none',
            menuScrollbarWidth: 'none',
            submenu2MaxHeight: 'none',
            submenu2OverflowY: 'visible',
            submenu2ScrollbarWidth: 'none',
            submenu3MaxHeight: 'none',
            submenu3OverflowY: 'visible',
            submenu3ScrollbarWidth: 'none',
        });

        await page.locator('#main-menu').evaluate((menu) => {
            menu.scrollTop = menu.scrollHeight;
        });
        await expect(page.locator('#submenu-monroe li:last-child a')).toBeInViewport();
    });
});
