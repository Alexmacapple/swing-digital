const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Le cache-buster (`?v=…`) force les navigateurs à recharger la feuille de style et le script après une
// modification visuelle. Deux tests figeaient sa valeur littérale et cassaient donc à chaque lot, sans rien
// garantir d'utile. Ce contrôle remplace l'intention par une propriété vraie dans la durée : chaque page porte
// un cache-buster, et toutes les pages portent le MÊME — ce qui interdit d'en oublier une lors d'une mise à jour.
const srcDir = path.join(__dirname, '..', 'src');
const pages = fs.readdirSync(srcDir).filter((f) => f.endsWith('.html')).sort();

for (const [nom, motif] of [['la feuille de style', /css\/style\.css\?v=([0-9a-z-]+)"/], ['le script', /js\/main\.js\?v=([0-9a-z-]+)"/]]) {
  test(`Cache-buster : toutes les pages partagent la même version pour ${nom}`, ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle source : exécuté une seule fois.');
    const versions = {};
    const sans = [];
    for (const page of pages) {
      const html = fs.readFileSync(path.join(srcDir, page), 'utf8');
      const m = html.match(motif);
      if (!m) { sans.push(page); continue; }
      (versions[m[1]] = versions[m[1]] || []).push(page);
    }
    expect(sans, `pages sans cache-buster sur ${nom}`).toEqual([]);
    const valeurs = Object.keys(versions);
    expect(valeurs.length, `versions trouvées : ${valeurs.map((v) => `${v} (${versions[v].length} pages)`).join(', ')}`).toBe(1);
    expect(versions[valeurs[0]].length, 'toutes les pages du site sont couvertes').toBe(pages.length);
  });
}
