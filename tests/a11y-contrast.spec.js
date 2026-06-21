const { test, expect } = require('@playwright/test');
const axe = require('axe-core');

const contrastPages = [
  '/reservations.html',
  '/experience-monroe.html',
  '/voyage-autour-de-moi.html',
  '/dessine-moi-le-vent.html',
  '/ni-vues-ni-connues.html',
  '/marilyn.html',
  '/monroe-piece.html',
  '/monroe-experiences.html',
];

test.describe('Accessibilité - contrastes', () => {
  for (const url of contrastPages) {
    test(`${url} ne remonte pas de violation color-contrast`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle axe ciblé exécuté une seule fois.');

      await page.goto(url);
      await page.waitForTimeout(2500);
      await page.addScriptTag({ content: axe.source });

      const violations = await page.evaluate(async () => {
        const result = await axe.run(document, {
          runOnly: {
            type: 'rule',
            values: ['color-contrast'],
          },
        });

        return result.violations.map((violation) => ({
          id: violation.id,
          nodes: violation.nodes.map((node) => ({
            target: node.target,
            summary: node.failureSummary,
          })),
        }));
      });

      expect(violations).toEqual([]);
    });
  }
});
