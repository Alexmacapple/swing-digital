// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Accessibilité', () => {
    test('skip link — focusable et pointe vers main', async ({ page }) => {
        await page.goto('/');
        await page.keyboard.press('Tab');
        const focused = page.locator(':focus');
        await expect(focused).toHaveClass(/skip-link/);
        await expect(focused).toHaveAttribute('href', '#main-content');
    });

    test('dropdown — Escape ferme et remet le focus', async ({ page }) => {
        const info = test.info();
        const width = info.project.use?.viewport?.width || 1920;
        test.skip(width <= 1024, 'Desktop only (dropdown horizontal, breakpoint > 1024px)');
        await page.goto('/');
        const btn = page.locator('.site-nav__btn[aria-controls="submenu-experiences"]');
        await btn.click();
        await expect(btn).toHaveAttribute('aria-expanded', 'true');

        await page.keyboard.press('Escape');
        await expect(btn).toHaveAttribute('aria-expanded', 'false');
        await expect(btn).toBeFocused();
    });

    test('dropdown — navigation clavier flèches', async ({ page }) => {
        const info = test.info();
        const width = info.project.use?.viewport?.width || 1920;
        test.skip(width <= 1024, 'Desktop only (dropdown horizontal, breakpoint > 1024px)');
        await page.goto('/');
        const btn = page.locator('.site-nav__btn[aria-controls="submenu-experiences"]');
        await btn.focus();
        await page.keyboard.press('ArrowDown');
        await expect(btn).toHaveAttribute('aria-expanded', 'true');

        const firstLink = page.locator('#submenu-experiences .site-nav__submenu-link').first();
        await expect(firstLink).toBeFocused();
    });

    test('hamburger — Escape ferme le menu mobile', async ({ page }) => {
        const info = test.info();
        const width = info.project.use?.viewport?.width || 1920;
        test.skip(width > 1024, 'Mobile only (hamburger, breakpoint <= 1024px)');
        await page.goto('/');
        const burger = page.locator('.site-nav__burger');
        await burger.click();
        await expect(burger).toHaveAttribute('aria-expanded', 'true');

        await page.keyboard.press('Escape');
        await expect(burger).toHaveAttribute('aria-expanded', 'false');
    });

    test('bouton retour en haut — apparaît au scroll', async ({ page }) => {
        await page.goto('/');
        const btn = page.locator('.back-to-top');
        await expect(btn).toBeHidden();

        await page.evaluate(() => window.scrollTo(0, 500));
        await page.waitForTimeout(300);
        await expect(btn).toBeVisible();
        await expect(btn).toHaveAttribute('aria-label', 'Retour en haut de page');
    });

    test('CTA Réserver — aria-disabled bloque le clic', async ({ page }) => {
        await page.goto('/reservations.html');
        const btn = page.locator('.cta-reservation--disabled').first();
        await expect(btn).toHaveAttribute('aria-disabled', 'true');
    });

    test('FAQ Réservations — le lien d’accès cible la FAQ visible', async ({ page }) => {
        await page.goto('/reservations.html');
        await page.locator('.page58__faq-link').click();
        await expect(page.locator('#faq-reservations')).toBeInViewport();
        await expect.poll(() => page.evaluate(() => window.location.hash)).toBe('#faq-reservations');
    });

    test('images — toutes ont un alt', async ({ page }) => {
        await page.goto('/');
        const images = page.locator('img:not([alt])');
        await expect(images).toHaveCount(0);
    });

    test('breadcrumb — dernier lien a aria-current=page', async ({ page }) => {
        await page.goto('/espaces-augmentes.html');
        const current = page.locator('.breadcrumb__link[aria-current="page"]');
        await expect(current).toHaveCount(1);
        await expect(current).toHaveText('Espaces augmentés');
    });
});
