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
            expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 3);
        });
    }
});

test.describe('Responsive — grilles en colonne sur mobile', () => {
    test('page 9 grille — colonne unique sous 600px', async ({ page }) => {
        const info = test.info();
        const width = info.project.use?.viewport?.width || 1920;
        test.skip(width > 600, 'Mobile only (<= 600px)');
        await page.goto('/experiences-series.html');
        const grid = page.locator('.page9__grid');
        const columns = await grid.evaluate(el => getComputedStyle(el).gridTemplateColumns);
        // Colonne unique = une seule valeur
        expect(columns.split(' ').length).toBe(1);
    });

    test('page 6 grille — colonne unique sous 768px', async ({ page }) => {
        const info = test.info();
        const width = info.project.use?.viewport?.width || 1920;
        test.skip(width > 768, 'Mobile/tablette only (<= 768px)');
        await page.goto('/espaces-augmentes.html');
        const grid = page.locator('.page6__main');
        const columns = await grid.evaluate(el => getComputedStyle(el).gridTemplateColumns);
        expect(columns.split(' ').length).toBe(1);
    });

    test('footer — colonne sur mobile', async ({ page }) => {
        const info = test.info();
        const width = info.project.use?.viewport?.width || 1920;
        test.skip(width > 480, 'Mobile only (<= 480px)');
        await page.goto('/');
        const nav = page.locator('.footer__nav-list');
        const direction = await nav.evaluate(el => getComputedStyle(el).flexDirection);
        expect(direction).toBe('column');
    });
});

test.describe('Lisibilité — blocs texte', () => {
    test('page 1 Accueil — la baseline sur vidéo garde un fort appui de contraste', async ({ page }) => {
        await page.goto('/index.html#page-1');

        const readability = await page.locator('#page-1').evaluate((section) => {
            const background = section.querySelector('.hero-page1__background');
            const hashtags = section.querySelector('.hero-page1__hashtags');
            const summary = section.querySelector('.hero-page1__summary');
            const summaryStyle = getComputedStyle(summary);

            return {
                overlayBackground: getComputedStyle(background).backgroundImage,
                hashtagsWeight: parseInt(getComputedStyle(hashtags).fontWeight, 10),
                summaryWeight: parseInt(summaryStyle.fontWeight, 10),
                summaryLineHeight: parseFloat(summaryStyle.lineHeight),
                summaryFontSize: parseFloat(summaryStyle.fontSize),
            };
        });

        expect(readability.overlayBackground).toContain('rgba(0, 0, 0');
        expect(readability.hashtagsWeight).toBeGreaterThanOrEqual(700);
        expect(readability.summaryWeight).toBeGreaterThanOrEqual(600);
        expect(readability.summaryLineHeight / readability.summaryFontSize).toBeGreaterThanOrEqual(1.6);
    });

    test('page 56 Charlotte Henschel — la bio garde une respiration interne', async ({ page }) => {
        await page.goto('/charlotte-henschel.html#page-56');

        const spacing = await page.locator('.page56__bio').evaluate((element) => {
            const style = getComputedStyle(element);

            return {
                paddingTop: parseFloat(style.paddingTop),
                paddingRight: parseFloat(style.paddingRight),
                paddingBottom: parseFloat(style.paddingBottom),
                paddingLeft: parseFloat(style.paddingLeft),
                viewportWidth: window.innerWidth,
            };
        });

        const minHorizontalPadding = spacing.viewportWidth <= 480 ? 24 : 32;
        const minVerticalPadding = spacing.viewportWidth <= 480 ? 20 : 24;

        expect(spacing.paddingLeft).toBeGreaterThanOrEqual(minHorizontalPadding);
        expect(spacing.paddingRight).toBeGreaterThanOrEqual(minHorizontalPadding);
        expect(spacing.paddingTop).toBeGreaterThanOrEqual(minVerticalPadding);
        expect(spacing.paddingBottom).toBeGreaterThanOrEqual(minVerticalPadding);
    });

    test('page 48 Ni vues ni connues — la tagline est blanche', async ({ page }) => {
        await page.goto('/ni-vues-ni-connues.html#page-48');

        const taglineColor = await page.locator('.page48__tagline').evaluate((element) => {
            return getComputedStyle(element).color;
        });

        expect(taglineColor).toBe('rgb(255, 255, 255)');
    });

    test('page 50 Marilyn — les pictos et textes secondaires restent lisibles', async ({ page }) => {
        await page.goto('/marilyn.html#page-50');

        const readability = await page.locator('#page-50').evaluate((section) => {
            const logoHeights = [...section.querySelectorAll('.page50__logo')]
                .map((logo) => parseFloat(getComputedStyle(logo).height));
            const textShadows = [
                section.querySelector('.page50__credit'),
                section.querySelector('.page50__tags'),
            ].map((element) => getComputedStyle(element).textShadow);

            return { logoHeights, textShadows };
        });

        expect(Math.min(...readability.logoHeights)).toBeGreaterThanOrEqual(40);
        expect(readability.textShadows).not.toContain('none');
    });

    test('FAQ Réservations — aucun texte visible ni lien ne reste noir', async ({ page }) => {
        await page.goto('/reservations.html#faq-reservations');

        const blackItems = await page.locator('#page-61').evaluate((section) => {
            const selectors = [
                '#faq-reservations',
                '.page61__faq',
                '.page61__faq *',
                '.page61__help',
                '.page61__help *',
            ];

            return [...section.querySelectorAll(selectors.join(','))]
                .filter((element) => {
                    const style = getComputedStyle(element);
                    return style.display !== 'none'
                        && style.visibility !== 'hidden'
                        && element.textContent.trim().length > 0
                        && style.color === 'rgb(0, 0, 0)';
                })
                .map((element) => element.textContent.trim().replace(/\s+/g, ' ').slice(0, 80));
        });

        expect(blackItems).toEqual([]);
    });

    test('Page 61 Réservations — le lien contactez-nous principal est blanc', async ({ page }) => {
        await page.goto('/reservations.html#page-61');

        const contactLink = page.locator('.page61__paragraph a', { hasText: 'Contactez-nous' });
        await expect(contactLink).toHaveCount(1);

        const linkColor = await contactLink.evaluate((element) => getComputedStyle(element).color);
        expect(linkColor).toBe('rgb(255, 255, 255)');
    });

    test('Plan du site — les liens de navigation principale sont blancs', async ({ page }) => {
        await page.goto('/plan-du-site.html');

        const linkColors = await page.locator('.sitemap-page__list a').evaluateAll((links) => {
            return [...new Set(links.map((link) => getComputedStyle(link).color))];
        });

        expect(linkColors).toEqual(['rgb(255, 255, 255)']);
    });
});
