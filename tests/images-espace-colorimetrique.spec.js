const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Issue #23 : « colorimétrie devenue vert fluo sur ordinateur ». Cause : des JPEG exportés en CMJN,
// que les navigateurs rendent mal. Un JPEG pour le web a 1 composante (gris) ou 3 (RVB/YCbCr) ; 4 = CMJN.
function lireComposantes(fichier) {
  const b = fs.readFileSync(fichier);
  let i = 2;
  while (i + 9 < b.length) {
    if (b[i] !== 0xff) { i += 1; continue; }
    const m = b[i + 1];
    // SOF0 à SOF15, hors DHT (C4), JPG (C8) et DAC (CC)
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return b[i + 9];
    if (m === 0xd8 || m === 0x01 || (m >= 0xd0 && m <= 0xd7)) { i += 2; continue; }
    i += 2 + b.readUInt16BE(i + 2);
  }
  return null;
}

function listerJpeg(dossier) {
  return fs.readdirSync(dossier, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dossier, e.name);
    if (e.isDirectory()) return listerJpeg(p);
    return /\.jpe?g$/i.test(e.name) ? [p] : [];
  });
}

test('Images : aucun JPEG du site n\'est en CMJN', async ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle de fichiers : exécuté une seule fois.');
  const racine = path.join(__dirname, '..', 'src', 'img');
  const fichiers = listerJpeg(racine);
  expect(fichiers.length, 'des JPEG ont été trouvés').toBeGreaterThan(50);
  // Quelques fichiers « .jpg » du site sont en réalité des PNG (toujours RVB) : seuls les vrais JPEG sont contrôlés.
  const vraisJpeg = fichiers.filter((f) => { const b = fs.readFileSync(f); return b[0] === 0xff && b[1] === 0xd8; });
  const illisibles = vraisJpeg.filter((f) => lireComposantes(f) === null).map((f) => path.relative(racine, f));
  expect(illisibles, 'en-tête JPEG lisible').toEqual([]);
  const cmjn = vraisJpeg.filter((f) => lireComposantes(f) === 4).map((f) => path.relative(racine, f));
  expect(cmjn, 'JPEG en CMJN à convertir en sRVB').toEqual([]);
});
