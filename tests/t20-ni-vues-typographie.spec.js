const { test, expect } = require('@playwright/test');

// Demande de la cliente (issue #20) : « Bien aligner la typo du texte au début des phrases » pour
// « Discrètes. Résistantes. Essentielles », « Un geste. Un regard. Une présence. » et « La beauté discrète de l'ordinaire. »
// Les trois lignes étaient centrées une à une : chacune commençait à un endroit différent.
const PHRASES = ['Discrètes. Résistantes. Essentielles', 'Un geste. Un regard. Une présence.', 'La beauté discrète de l\'ordinaire.'];

for (const largeur of [1920, 1440, 1024, 768, 390]) {
  test(`T20 - Ni vues ni connues : les trois phrases partent du même bord gauche à ${largeur}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Largeurs fixées par le test : exécuté une seule fois.');
    await page.setViewportSize({ width: largeur, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/ni-vues-ni-connues.html');
    await page.evaluate(() => document.fonts.ready);
    const m = await page.evaluate(() => {
      const bloc = document.querySelector('#page-49 .page49__text'); const rb = bloc.getBoundingClientRect();
      const noeuds = []; const w = document.createTreeWalker(bloc, NodeFilter.SHOW_TEXT);
      while (w.nextNode()) if (w.currentNode.textContent.trim()) noeuds.push(w.currentNode);
      return {
        lignes: noeuds.map((n) => { const r = document.createRange(); r.selectNodeContents(n); const q = Array.from(r.getClientRects()).filter((x) => x.width > 1); return { texte: n.textContent.trim(), gauche: q[0].left, droite: Math.max(...q.map((x) => x.right)), rectangles: q.length }; }),
        bloc: { gauche: rb.left, droite: rb.right }, deborde: document.documentElement.scrollWidth > innerWidth + 1,
      };
    });
    expect(m.lignes.map((l) => l.texte)).toEqual(PHRASES);
    m.lignes.forEach((l) => expect(l.rectangles, `« ${l.texte} » tient sur une ligne`).toBe(1));
    const gauches = m.lignes.map((l) => l.gauche);
    expect(Math.max(...gauches) - Math.min(...gauches), 'débuts de phrases alignés (px)').toBeLessThanOrEqual(1);
    // Le bloc reste centré sous les portraits : marges gauche et droite de la ligne la plus longue égales.
    const gauche = Math.min(...gauches) - m.bloc.gauche; const droite = m.bloc.droite - Math.max(...m.lignes.map((l) => l.droite));
    expect(Math.abs(gauche - droite), 'bloc de texte centré (px)').toBeLessThanOrEqual(4);
    expect(m.deborde).toBe(false);
  });
}

// Titre de la première page : sur l'export de la cliente, « NI VUES » est bleu et « NI CONNUES » rouge, en capitales grasses.
// Aucune police n'a été fournie : Satoshi en graisse 900, bicolore par mot. Écart volontaire : les deux teintes sont
// éclaircies pour atteindre 3:1 sur le bandeau marine (grand titre), ce que le bleu et le rouge de l'export n'atteignent pas.
test('T20 - Ni vues ni connues : titre bicolore, gras, lisible sur le bandeau marine', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle de style : exécuté une seule fois.');
  await page.goto('/ni-vues-ni-connues.html');
  await page.evaluate(() => document.fonts.ready);
  const m = await page.evaluate(() => {
    const t = document.querySelector('.page48__title'); const s = t.querySelector('strong');
    const lum = (rgb) => { const [r, g, b] = rgb.match(/\d+/g).slice(0, 3).map((v) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
    const fond = lum(getComputedStyle(document.querySelector('.page48')).backgroundColor);
    const ratio = (e) => { const l = lum(getComputedStyle(e).color); return (Math.max(l, fond) + 0.05) / (Math.min(l, fond) + 0.05); };
    const c = (e) => getComputedStyle(e);
    return { texte: t.textContent.replace(/\s+/g, ' ').trim(), couleurs: [c(t).color, c(s).color], graisses: [Number(c(t).fontWeight), Number(c(s).fontWeight)], casse: c(t).textTransform, police: c(t).fontFamily, ratios: [ratio(t), ratio(s)], taille: parseFloat(c(t).fontSize) };
  });
  expect(m.texte, 'casse normale dans le HTML, capitales par CSS').toBe('Ni vues Ni connues');
  expect(m.casse).toBe('uppercase');
  expect(m.police).toContain('Satoshi');
  expect(m.graisses).toEqual([900, 900]);
  expect(m.couleurs[0], 'deux couleurs distinctes').not.toBe(m.couleurs[1]);
  expect(m.taille, 'grand titre').toBeGreaterThanOrEqual(24);
  m.ratios.forEach((r, k) => expect(r, `contraste du mot ${k + 1} sur le bandeau marine`).toBeGreaterThanOrEqual(3));
});
