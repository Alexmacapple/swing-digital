const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const html = () => fs.readFileSync(path.resolve(__dirname, '..', 'src', 'monroe-piece.html'), 'utf8');

test.describe('T23 - La Pièce : la bonne vidéo', () => {
  test('la page porte le teaser de la pièce, avec un intitulé exact', () => {
    const iframe = html().match(/<iframe id="vimeo-la-piece"[\s\S]*?<\/iframe>/);
    expect(iframe, 'iframe vimeo-la-piece absente').not.toBeNull();
    expect(iframe[0]).toContain('player.vimeo.com/video/106406158');
    expect(iframe[0]).toContain('title="Teaser de la pièce de théâtre My Story"');
    expect(html()).not.toContain('782642139');
    expect(html().match(/<iframe/g)).toHaveLength(1);
  });

  test('le bloc vidéo est le dernier de la page et garde un seul h1', () => {
    const h = html();
    expect(h.indexOf('id="la-piece-video"')).toBeGreaterThan(h.indexOf('id="page-18"'));
    expect(h.match(/<h1[ >]/g)).toHaveLength(1);
    expect(h.match(/class="page11__play-btn"/g)).toHaveLength(1);
  });
});
