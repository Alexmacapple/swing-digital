const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Un identifiant en double casse silencieusement les liens `aria-controls`, `aria-labelledby` et les ancres :
// le navigateur ne retient que le premier élément. C'est arrivé le 2026-09-19 en relançant
// scripts/build-public-transcripts.py sur une page dont les transcriptions avaient été intégrées à la main,
// hors de son marqueur : le script a ajouté un second jeu, et les cinq panneaux de podcast se sont retrouvés
// en double. Ce contrôle empêche que cela repasse inaperçu.
const srcDir = path.join(__dirname, '..', 'src');
const pages = fs.readdirSync(srcDir).filter((f) => f.endsWith('.html')).sort();

test('Aucun identifiant en double dans les pages du site', ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle source : exécuté une seule fois.');
  const fautes = [];
  for (const page of pages) {
    const html = fs.readFileSync(path.join(srcDir, page), 'utf8');
    const vus = {};
    for (const m of html.matchAll(/\sid="([^"]+)"/g)) vus[m[1]] = (vus[m[1]] || 0) + 1;
    Object.entries(vus).filter(([, n]) => n > 1).forEach(([id, n]) => fautes.push(`${page} : id="${id}" ×${n}`));
  }
  expect(fautes, 'identifiants en double').toEqual([]);
});

test('Chaque aria-controls et aria-labelledby désigne un identifiant existant', ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle source : exécuté une seule fois.');
  const fautes = [];
  for (const page of pages) {
    const html = fs.readFileSync(path.join(srcDir, page), 'utf8');
    const ids = new Set(Array.from(html.matchAll(/\sid="([^"]+)"/g)).map((m) => m[1]));
    for (const attribut of ['aria-controls', 'aria-labelledby', 'aria-describedby']) {
      for (const m of html.matchAll(new RegExp(`\\s${attribut}="([^"]+)"`, 'g'))) {
        m[1].split(/\s+/).filter(Boolean).forEach((cible) => { if (!ids.has(cible)) fautes.push(`${page} : ${attribut}="${cible}" sans cible`); });
      }
    }
  }
  expect(fautes, 'références ARIA sans cible').toEqual([]);
});
