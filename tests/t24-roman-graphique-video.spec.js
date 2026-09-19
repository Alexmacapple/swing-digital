const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

const VIDEO_ID = '782642139';

test.describe('T24 - vidéo du roman graphique', () => {
  test('la page Roman graphique porte la vidéo, avec un intitulé exact', () => {
    const html = read('src/monroe-roman-graphique.html');
    const iframe = html.match(/<iframe id="vimeo-roman-graphique"[\s\S]*?<\/iframe>/);
    expect(iframe, 'iframe vimeo-roman-graphique absente').not.toBeNull();
    expect(iframe[0]).toContain(`player.vimeo.com/video/${VIDEO_ID}`);
    expect(iframe[0]).toMatch(/title="[^"]*roman graphique[^"]*"/i);
    expect(iframe[0]).not.toMatch(/The Play|pièce de théâtre/i);
  });

  test('la transcription suit la vidéo sur la page Roman graphique', () => {
    const html = read('src/monroe-roman-graphique.html');
    expect(html).toContain('<!-- transcript:roman-graphique:start -->');
    expect(html).toContain('<!-- transcript:roman-graphique:end -->');
    expect(html).toContain('aria-controls="transcript-roman-graphique"');
    expect(html).toContain('<div id="transcript-roman-graphique" class="media-transcript__panel" hidden>');
    expect(html.indexOf('transcript:roman-graphique:start')).toBeGreaterThan(html.indexOf('id="vimeo-roman-graphique"'));
    expect(html.indexOf('transcript:roman-graphique:end')).toBeLessThan(html.indexOf('</main>'));
  });

  test('la page La Pièce ne porte plus la vidéo du roman graphique ni sa transcription', () => {
    const html = read('src/monroe-piece.html');
    expect(html).not.toContain(VIDEO_ID);
    expect(html).not.toContain('vimeo-theplay');
    expect(html).not.toContain('transcript:the-play');
    expect(html).not.toContain('id="page-19"');
    // « Confession inachevée » reste légitime ici : c'est le livre dont la pièce est tirée (page 14).
    expect(html).toContain('Couverture du livre Marilyn Monroe Confession inachevée');
  });

  test('le générateur de transcriptions cible la page Roman graphique', () => {
    const script = read('scripts/build-public-transcripts.py');
    expect(script).toContain('"src/monroe-roman-graphique.html": ("roman-graphique",)');
    expect(script).toContain('("monroe-roman-graphique.html", "roman-graphique-video", "roman-graphique")');
    expect(script).not.toContain('"the-play"');
    // La Pièce a depuis sa propre transcription (#33) : ce qui reste interdit, c'est que le slug du roman
    // graphique y soit renvoyé, l'erreur d'origine de cette issue.
    expect(script).not.toMatch(/"src\/monroe-piece\.html": \([^)]*roman-graphique/);
    expect(script).not.toMatch(/\("monroe-piece\.html", "[^"]*", "roman-graphique"\)/);
  });

  test('les deux pages gardent un seul h1 et leurs liens d’évitement', () => {
    for (const page of ['src/monroe-roman-graphique.html', 'src/monroe-piece.html']) {
      const html = read(page);
      expect(html.match(/<h1[ >]/g), page).toHaveLength(1);
      expect(html, page).toContain('<nav class="skip-links" aria-label="Liens d’évitement">');
    }
  });

  test('la vidéo est visible et la transcription s’ouvre sur action de l’utilisateur', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/monroe-roman-graphique.html');
    const iframe = page.locator('#vimeo-roman-graphique');
    await iframe.scrollIntoViewIfNeeded();
    await expect(iframe).toBeVisible();
    const box = await iframe.boundingBox();
    expect(box.width).toBeGreaterThan(200);
    expect(box.height).toBeGreaterThan(100);

    const button = page.locator('[aria-controls="transcript-roman-graphique"]');
    const panel = page.locator('#transcript-roman-graphique');
    await expect(panel).toBeHidden();
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await button.click();
    await expect(panel).toBeVisible();
    await expect(button).toHaveAttribute('aria-expanded', 'true');

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(overflow).toBe(false);
  });
});
