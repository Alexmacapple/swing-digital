const { test, expect } = require('@playwright/test');

const routesAvecTranscriptions = [
  '/index.html#page-3',
  '/experience-monroe.html',
  '/voyage-autour-de-moi.html',
  '/dessine-moi-le-vent.html',
  '/monroe-piece.html',
  '/monroe-podcasts.html',
];

function px(value) {
  return Number.parseFloat(String(value).replace('px', ''));
}

test.describe('Transcriptions accessibles', () => {
  test('toutes les transcriptions restent des disclosures RGAA au style de lien discret', async ({ page }) => {
    let total = 0;

    for (const route of routesAvecTranscriptions) {
      await page.goto(route);

      const buttons = page.locator('.media-transcript__button');
      const count = await buttons.count();
      expect(count, `${route} doit exposer au moins une transcription`).toBeGreaterThan(0);
      total += count;

      for (let index = 0; index < count; index += 1) {
        const button = buttons.nth(index);
        const controls = await button.getAttribute('aria-controls');
        expect(controls, `${route} : aria-controls requis`).toBeTruthy();
        await expect(button).toHaveAttribute('type', 'button');
        await expect(button).toHaveAttribute('aria-expanded', 'false');
        await expect(button.locator('.js-disclosure-label')).toHaveCount(1);
        await expect(page.locator(`#${controls}`)).toHaveAttribute('hidden', '');

        const style = await button.evaluate((element) => {
          const computed = window.getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return {
            backgroundColor: computed.backgroundColor,
            borderTopWidth: computed.borderTopWidth,
            borderRadius: computed.borderRadius,
            fontSize: computed.fontSize,
            fontWeight: computed.fontWeight,
            height: `${rect.height}px`,
            paddingLeft: computed.paddingLeft,
            textDecorationLine: computed.textDecorationLine,
          };
        });

        expect(px(style.height), `${route} : cible clavier/tactile suffisante`).toBeGreaterThanOrEqual(44);
        expect(px(style.height), `${route} : le lien de transcription ne doit pas devenir un encart`).toBeLessThanOrEqual(52);
        expect(px(style.fontSize), `${route} : le lien de transcription doit rester secondaire`).toBeLessThanOrEqual(16);
        expect(px(style.borderTopWidth), `${route} : pas de bordure forte type carte`).toBeLessThanOrEqual(1);
        expect(px(style.borderRadius), `${route} : pas de bouton massif arrondi`).toBeLessThanOrEqual(4);
        expect(px(style.paddingLeft), `${route} : pas de remplissage d'encart`).toBeLessThanOrEqual(8);
        expect(style.backgroundColor, `${route} : pas de fond plein pour le bouton fermé`).toBe('rgba(0, 0, 0, 0)');
        expect(style.textDecorationLine, `${route} : le contrôle doit ressembler à un lien`).toContain('underline');

        await button.click();
        await expect(button).toHaveAttribute('aria-expanded', 'true');
        await expect(page.locator(`#${controls}`)).not.toHaveAttribute('hidden', '');
      }
    }

    expect(total).toBe(10);
  });
});
