const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..', 'src');

const pagesAvecVideoPilotable = [
  '/experience-monroe.html',
  '/voyage-autour-de-moi.html',
  '/dessine-moi-le-vent.html',
  '/monroe-roman-graphique.html',
  '/monroe-piece.html',
  '/monroe-installation.html',
];

// Fausse API Vimeo : enregistre les appels, sans réseau ni dépendance à Vimeo.
const fakeVimeoApi = `
  window.__vimeoPlayers = [];
  window.Vimeo = {
    Player: function (iframe) {
      var record = { iframeId: iframe.id, calls: [] };
      window.__vimeoPlayers.push(record);
      this.play = function () { record.calls.push('play'); };
      this.pause = function () { record.calls.push('pause'); };
      this.setVolume = function (v) { record.calls.push('setVolume:' + v); };
    }
  };
`;

async function openWithFakeVimeo(page, route) {
  await page.route('**/player.vimeo.com/api/player.js', (r) =>
    r.fulfill({ contentType: 'application/javascript', body: fakeVimeoApi }));
  await page.route('**/player.vimeo.com/video/**', (r) =>
    r.fulfill({ contentType: 'text/html', body: '<!doctype html><title>stub</title>' }));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(route);
}

test.describe('Boutons lecture et son des vidéos Vimeo', () => {
  test('chaque page à vidéo pilotable porte exactement un bloc vidéo avec ses deux boutons', () => {
    for (const route of pagesAvecVideoPilotable) {
      const html = fs.readFileSync(path.join(srcDir, route), 'utf8');
      expect(html.match(/class="page11__play-btn"/g), route).toHaveLength(1);
      expect(html.match(/class="page11__sound-btn"/g), route).toHaveLength(1);
    }
  });

  for (const route of pagesAvecVideoPilotable) {
    test(`${route} : les boutons pilotent réellement le lecteur`, async ({ page }) => {
      await openWithFakeVimeo(page, route);
      await page.waitForFunction(() => window.__vimeoPlayers && window.__vimeoPlayers.length === 1, null, { timeout: 5000 });

      const play = page.locator('.page11__play-btn');
      const sound = page.locator('.page11__sound-btn');
      await play.scrollIntoViewIfNeeded();

      await expect(play).toHaveAttribute('aria-pressed', 'true');
      await play.click();
      await expect(play).toHaveAttribute('aria-pressed', 'false');
      await play.click();
      await expect(play).toHaveAttribute('aria-pressed', 'true');

      await expect(sound).toHaveAttribute('aria-pressed', 'false');
      await sound.click();
      await expect(sound).toHaveAttribute('aria-pressed', 'true');
      await sound.click();
      await expect(sound).toHaveAttribute('aria-pressed', 'false');

      const calls = await page.evaluate(() => window.__vimeoPlayers[0].calls);
      expect(calls).toEqual(['pause', 'play', 'setVolume:1', 'setVolume:0']);
    });

    test(`${route} : les boutons sont utilisables au clavier`, async ({ page }) => {
      await openWithFakeVimeo(page, route);
      await page.waitForFunction(() => window.__vimeoPlayers && window.__vimeoPlayers.length === 1, null, { timeout: 5000 });
      const play = page.locator('.page11__play-btn');
      await play.focus();
      await page.keyboard.press('Enter');
      await expect(play).toHaveAttribute('aria-pressed', 'false');
      const calls = await page.evaluate(() => window.__vimeoPlayers[0].calls);
      expect(calls).toEqual(['pause']);
    });
  }
});
