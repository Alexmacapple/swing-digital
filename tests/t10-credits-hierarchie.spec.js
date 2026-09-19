const { test, expect } = require('@playwright/test');

// Issue #10, mots de la cliente : « Le texte fait un peu pavé […] peut-être que pour les infos soutien, coproduction,
// diffusion, il faut réduire l'interligne et la typo ». Le passage typographique du 22 juin a hiérarchisé la liste
// « En développement » (tests/typographie-editoriale.spec.js) ; restaient les lignes de crédits, identiques à la ligne
// de genre. Elles forment désormais un bloc plus serré, détaché de la ligne de genre, libellés en gras.
const CREDITS_ATTENDUS = [
  'Soutien : CNC, DRAC Île-de-France, Ville de Paris, ONDA',
  'Diffusion : Forum des images, Galerie Joseph',
  '30 000 visiteurs',
  'Coproduction : La méthonymie, Principe Actif, Swing Digital',
  'Soutien : Forum des images, Galerie Joseph, Le sas-l\'université Paris Saclay, Cervval',
  'Prix de la diversité culturelle 2021',
  'Lauréat Labo 2020 du Pôle média Grand Paris',
  'Soutien : le département de Seine-Saint-Denis, Jeunesse Feu vert, La Fondation Vinci pour la Cité.',
  'Diffusion : La Maison du Théâtre et de la danse d\'Épinay-sur-Seine',
  'Soutien : CNC, Région Grand Est',
  'Coproduction : EJT Labo, Principe Actif, Swing Digital',
  'Diffusion : Tournée Région Parisienne',
];

for (const [largeur, hauteur] of [[1440, 900], [768, 1024], [390, 812]]) {
  test(`T10 - Accueil : les crédits forment un bloc serré, distinct du genre, à ${largeur}px`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Largeurs fixées par le test : exécuté une seule fois.');
    await page.setViewportSize({ width: largeur, height: hauteur });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/index.html');
    await page.evaluate(() => document.fonts.ready);
    const m = await page.evaluate(() => {
      const projets = Array.from(document.querySelectorAll('#page-3 .page3__project, #page-4 .page3__project')).filter((p) => p.querySelector('.page3__project-title') && p.querySelector('.page3__project-meta--credit'));
      return {
        credits: Array.from(document.querySelectorAll('#page-3 .page3__project-meta--credit, #page-4 .page3__project-meta--credit')).map((e) => e.textContent.replace(/\s+/g, ' ').trim()),
        projets: projets.map((p) => {
          const genre = p.querySelector('.page3__project-meta:not(.page3__project-meta--credit)'); const cr = Array.from(p.querySelectorAll('.page3__project-meta--credit'));
          const cs = (e) => getComputedStyle(e); const r = (e) => e.getBoundingClientRect();
          return {
            titre: p.querySelector('.page3__project-title').textContent.trim(), genre: parseFloat(cs(genre).fontSize),
            credits: cr.map((e) => ({ taille: parseFloat(cs(e).fontSize), ratio: parseFloat(cs(e).lineHeight) / parseFloat(cs(e).fontSize), haut: r(e).top, bas: r(e).bottom, voisin: !!(e.previousElementSibling && e.previousElementSibling.classList.contains('page3__project-meta--credit')), libelle: e.querySelector('.page3__credit-label') ? Number(cs(e.querySelector('.page3__credit-label')).fontWeight) : null })),
            ecartGenre: cr.length ? r(cr[0]).top - r(genre).bottom : null,
          };
        }),
        deborde: document.documentElement.scrollWidth > innerWidth + 1,
      };
    });
    // Aucun mot de la cliente n'est perdu ni modifié.
    expect(m.credits).toEqual(CREDITS_ATTENDUS);
    expect(m.projets).toHaveLength(3);
    for (const p of m.projets) {
      expect(p.ecartGenre, `${p.titre} : le bloc de crédits se détache de la ligne de genre (px)`).toBeGreaterThanOrEqual(6);
      p.credits.forEach((c, k) => {
        expect(c.taille, `${p.titre} : crédit ${k + 1} plus petit que la ligne de genre`).toBeLessThan(p.genre);
        expect(c.taille, `${p.titre} : crédit ${k + 1} encore lisible`).toBeGreaterThanOrEqual(12);
        expect(c.ratio, `${p.titre} : interligne resserré`).toBeLessThanOrEqual(1.4);
        if (c.libelle !== null) expect(c.libelle, `${p.titre} : libellé en gras`).toBeGreaterThanOrEqual(600);
        // Seulement entre lignes voisines : sur Monroe, le bloc de transcription sépare deux groupes de crédits.
        if (k > 0 && c.voisin) expect(c.haut - p.credits[k - 1].bas, `${p.titre} : crédits serrés entre eux (px)`).toBeLessThanOrEqual(3);
      });
    }
    expect(m.deborde).toBe(false);
  });
}
