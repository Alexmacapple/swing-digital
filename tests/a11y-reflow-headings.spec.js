const { test, expect } = require('@playwright/test');

const textSpacingCss = `
  * {
    line-height: 1.5 !important;
    letter-spacing: .12em !important;
    word-spacing: .16em !important;
  }

  p {
    margin-bottom: 2em !important;
  }
`;

const reflowPages = [
  '/mentions-legales.html',
  '/reservations.html',
];

const headingPages = [
  '/voyage-autour-de-moi.html',
  '/dessine-moi-le-vent.html',
  '/monroe-piece.html',
  '/monroe-roman-graphique.html',
];

test.describe('Accessibilité - reflow et hiérarchie des titres', () => {
  for (const url of reflowPages) {
    test(`${url} ne déborde pas à 320 px avec l'espacement texte renforcé`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle ciblé exécuté une seule fois.');

      await page.setViewportSize({ width: 320, height: 256 });
      await page.goto(url);

      const normalOverflow = await page.evaluate(() => Math.ceil(document.documentElement.scrollWidth - window.innerWidth));
      expect(normalOverflow).toBeLessThanOrEqual(1);

      await page.addStyleTag({ content: textSpacingCss });

      const spacedOverflow = await page.evaluate(() => Math.ceil(document.documentElement.scrollWidth - window.innerWidth));
      expect(spacedOverflow).toBeLessThanOrEqual(1);
    });
  }

  for (const url of headingPages) {
    test(`${url} conserve une hiérarchie de titres sans saut de niveau`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle ciblé exécuté une seule fois.');

      await page.goto(url);

      const jumps = await page.evaluate(() => {
        const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map((heading) => ({
          level: Number(heading.tagName.slice(1)),
          text: heading.textContent.trim().replace(/\s+/g, ' '),
        }));

        return headings.slice(1).flatMap((heading, index) => {
          const previous = headings[index];

          return heading.level - previous.level > 1
            ? [`${previous.text} H${previous.level} -> ${heading.text} H${heading.level}`]
            : [];
        });
      });

      expect(jumps).toEqual([]);
    });
  }
});
