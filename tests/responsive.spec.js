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
            const titleGroup = section.querySelector('.hero-page1__title-group');
            const hashtags = section.querySelector('.hero-page1__hashtags');
            const summary = section.querySelector('.hero-page1__summary');
            const titleGroupStyle = getComputedStyle(titleGroup, '::before');
            const hashtagsStyle = getComputedStyle(hashtags);
            const summaryStyle = getComputedStyle(summary);

            return {
                overlayBackground: getComputedStyle(background).backgroundImage,
                titleGroupScrim: titleGroupStyle.backgroundImage,
                titleGroupScrimContent: titleGroupStyle.content,
                hashtagsWeight: parseInt(hashtagsStyle.fontWeight, 10),
                hashtagsTextShadow: hashtagsStyle.textShadow,
                summaryWeight: parseInt(summaryStyle.fontWeight, 10),
                summaryTextShadow: summaryStyle.textShadow,
                summaryLineHeight: parseFloat(summaryStyle.lineHeight),
                summaryFontSize: parseFloat(summaryStyle.fontSize),
            };
        });

        expect(readability.overlayBackground).toContain('rgba(0, 0, 0');
        expect(readability.titleGroupScrimContent).not.toBe('none');
        expect(readability.titleGroupScrim).toContain('rgba(0, 0, 0');
        expect(readability.hashtagsWeight).toBeGreaterThanOrEqual(700);
        expect(readability.hashtagsTextShadow).not.toBe('none');
        expect(readability.summaryWeight).toBeGreaterThanOrEqual(700);
        expect(readability.summaryTextShadow).not.toBe('none');
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

        const taglineStyle = await page.locator('.page48__tagline').evaluate((element) => {
            const style = getComputedStyle(element);

            return {
                color: style.color,
                fontWeight: parseInt(style.fontWeight, 10),
                textShadow: style.textShadow,
            };
        });

        expect(taglineStyle.color).toBe('rgb(255, 255, 255)');
        expect(taglineStyle.fontWeight).toBeGreaterThanOrEqual(700);
        expect(taglineStyle.textShadow).not.toBe('none');
    });

    test('page 50 Marilyn — le titre et les textes secondaires restent lisibles', async ({ page }) => {
        await page.goto('/marilyn.html#page-50');

        const readability = await page.locator('#page-50').evaluate((section) => {
            const background = section.querySelector('.page50__background');
            const titleGroup = section.querySelector('.page50__title-group');
            const logoHeights = [...section.querySelectorAll('.page50__logo')]
                .map((logo) => parseFloat(getComputedStyle(logo).height));
            const backgroundOverlay = getComputedStyle(background, '::after');
            const titleGroupScrim = getComputedStyle(titleGroup, '::before');
            const titleStyle = getComputedStyle(section.querySelector('.page50__title'));
            const subtitleStyle = getComputedStyle(section.querySelector('.page50__subtitle'));
            const textShadows = [
                section.querySelector('.page50__title'),
                section.querySelector('.page50__subtitle'),
                section.querySelector('.page50__credit'),
                section.querySelector('.page50__tags'),
            ].map((element) => getComputedStyle(element).textShadow);

            return {
                backgroundOverlayContent: backgroundOverlay.content,
                backgroundOverlayImage: backgroundOverlay.backgroundImage,
                titleGroupScrimContent: titleGroupScrim.content,
                titleGroupScrimImage: titleGroupScrim.backgroundImage,
                titleOpacity: parseFloat(titleStyle.opacity),
                titleWeight: parseInt(titleStyle.fontWeight, 10),
                subtitleWeight: parseInt(subtitleStyle.fontWeight, 10),
                logoHeights,
                textShadows,
            };
        });

        expect(readability.backgroundOverlayContent).not.toBe('none');
        expect(readability.backgroundOverlayImage).toContain('rgba(0, 0, 0');
        expect(readability.titleGroupScrimContent).not.toBe('none');
        expect(readability.titleGroupScrimImage).toContain('rgba(0, 0, 0');
        expect(readability.titleOpacity).toBe(1);
        expect(readability.titleWeight).toBeGreaterThanOrEqual(700);
        expect(readability.subtitleWeight).toBeGreaterThanOrEqual(700);
        expect(Math.min(...readability.logoHeights)).toBeGreaterThanOrEqual(40);
        expect(readability.textShadows).not.toContain('none');
    });

    test('page 50 Marilyn — les logos partenaires sont intégrés dans un écrin lisible', async ({ page }) => {
        await page.goto('/marilyn.html#page-50');

        const logoPresentation = await page.locator('.page50__logos').evaluate((logos) => {
            const logosStyle = getComputedStyle(logos);
            const logoStyles = [...logos.querySelectorAll('.page50__logo')].map((logo) => {
                const style = getComputedStyle(logo);

                return {
                    height: parseFloat(style.height),
                    paddingLeft: parseFloat(style.paddingLeft),
                    paddingRight: parseFloat(style.paddingRight),
                    backgroundColor: style.backgroundColor,
                    boxShadow: style.boxShadow,
                };
            });

            return {
                display: logosStyle.display,
                flexWrap: logosStyle.flexWrap,
                paddingTop: parseFloat(logosStyle.paddingTop),
                paddingLeft: parseFloat(logosStyle.paddingLeft),
                backgroundColor: logosStyle.backgroundColor,
                borderTopWidth: parseFloat(logosStyle.borderTopWidth),
                boxShadow: logosStyle.boxShadow,
                logoStyles,
            };
        });

        expect(logoPresentation.display).toBe('flex');
        expect(logoPresentation.flexWrap).toBe('wrap');
        expect(logoPresentation.paddingTop).toBeGreaterThanOrEqual(10);
        expect(logoPresentation.paddingLeft).toBeGreaterThanOrEqual(12);
        expect(logoPresentation.backgroundColor).toContain('rgba(0, 0, 0');
        expect(logoPresentation.borderTopWidth).toBeGreaterThanOrEqual(1);
        expect(logoPresentation.boxShadow).not.toBe('none');
        expect(logoPresentation.logoStyles).toHaveLength(3);

        for (const logoStyle of logoPresentation.logoStyles) {
            expect(logoStyle.height).toBeGreaterThanOrEqual(42);
            expect(logoStyle.paddingLeft).toBeGreaterThanOrEqual(10);
            expect(logoStyle.paddingRight).toBeGreaterThanOrEqual(10);
            expect(logoStyle.backgroundColor).toContain('rgba(255, 255, 255');
            expect(logoStyle.boxShadow).toBe('none');
        }
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

    test('FAQ Réservations — la liste de définition a une hiérarchie visuelle claire', async ({ page }) => {
        await page.goto('/reservations.html#page-61');

        const faqLayout = await page.locator('.page61__faq').evaluate((faq) => {
            const firstQuestion = faq.querySelector('dt');
            const firstAnswer = faq.querySelector('dd');
            const questionStyle = getComputedStyle(firstQuestion);
            const answerStyle = getComputedStyle(firstAnswer);
            const questionAccentStyle = getComputedStyle(firstQuestion, '::before');

            return {
                questionCount: faq.querySelectorAll('dt').length,
                answerCount: faq.querySelectorAll('dd').length,
                questionBorderTop: parseFloat(questionStyle.borderTopWidth),
                questionPaddingLeft: parseFloat(questionStyle.paddingLeft),
                questionLineHeight: parseFloat(questionStyle.lineHeight),
                questionFontSize: parseFloat(questionStyle.fontSize),
                questionAccentContent: questionAccentStyle.content,
                questionAccentWidth: parseFloat(questionAccentStyle.width),
                answerMarginLeft: parseFloat(answerStyle.marginLeft),
                answerPaddingLeft: parseFloat(answerStyle.paddingLeft),
                answerLineHeight: parseFloat(answerStyle.lineHeight),
                answerFontSize: parseFloat(answerStyle.fontSize),
            };
        });

        expect(faqLayout.questionCount).toBeGreaterThanOrEqual(6);
        expect(faqLayout.answerCount).toBe(faqLayout.questionCount);
        expect(faqLayout.questionBorderTop).toBeGreaterThanOrEqual(1);
        expect(faqLayout.questionPaddingLeft).toBeGreaterThanOrEqual(16);
        expect(faqLayout.questionAccentContent).not.toBe('none');
        expect(faqLayout.questionAccentWidth).toBeGreaterThanOrEqual(3);
        expect(faqLayout.questionLineHeight / faqLayout.questionFontSize).toBeGreaterThanOrEqual(1.35);
        expect(faqLayout.answerMarginLeft).toBe(0);
        expect(faqLayout.answerPaddingLeft).toBeGreaterThanOrEqual(16);
        expect(faqLayout.answerLineHeight / faqLayout.answerFontSize).toBeGreaterThanOrEqual(1.55);
    });

    test('Page 61 Réservations — le lien contactez-nous principal est blanc', async ({ page }) => {
        await page.goto('/reservations.html#page-61');

        const contactLink = page.locator('.page61__paragraph a', { hasText: 'Contactez-nous' });
        await expect(contactLink).toHaveCount(1);

        const linkColor = await contactLink.evaluate((element) => getComputedStyle(element).color);
        expect(linkColor).toBe('rgb(255, 255, 255)');
    });

    test('Page 61 Réservations — les deux liens contactez-nous sont blancs', async ({ page }) => {
        await page.goto('/reservations.html#page-61');

        const contactLinks = page.locator('.page61__contact-link');
        await expect(contactLinks).toHaveCount(2);

        const linkColors = await contactLinks.evaluateAll((links) => {
            return links.map((link) => getComputedStyle(link).color);
        });

        expect(linkColors).toEqual(['rgb(255, 255, 255)', 'rgb(255, 255, 255)']);
    });

    test('Mentions légales — les trois liens mailto de production sont blancs', async ({ page }) => {
        await page.goto('/mentions-legales.html');

        const mailLinks = page.locator('.mentions-legales__container a[href="mailto:production@swingdigitalproduction.com"]');
        await expect(mailLinks).toHaveCount(3);

        const linkStyles = await mailLinks.evaluateAll((links) => {
            return links.map((link) => {
                const style = getComputedStyle(link);

                return {
                    color: style.color,
                    textDecorationColor: style.textDecorationColor,
                };
            });
        });

        expect(linkStyles).toEqual([
            { color: 'rgb(255, 255, 255)', textDecorationColor: 'rgb(255, 255, 255)' },
            { color: 'rgb(255, 255, 255)', textDecorationColor: 'rgb(255, 255, 255)' },
            { color: 'rgb(255, 255, 255)', textDecorationColor: 'rgb(255, 255, 255)' },
        ]);
    });

    test('Plan du site — les liens de navigation principale sont blancs', async ({ page }) => {
        await page.goto('/plan-du-site.html');

        const linkColors = await page.locator('.sitemap-page__list a').evaluateAll((links) => {
            return [...new Set(links.map((link) => getComputedStyle(link).color))];
        });

        expect(linkColors).toEqual(['rgb(255, 255, 255)']);
    });
});
