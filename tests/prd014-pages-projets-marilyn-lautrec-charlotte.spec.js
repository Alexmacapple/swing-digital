const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const srcDir = path.join(repoRoot, 'src');

const exportedAssets = [
  'img/pages/marilyn/marilyn-page-50.jpg',
  'img/pages/marilyn/marilyn-page-51.jpg',
  'img/pages/marilyn/marilyn-page-52.jpg',
  'img/pages/toulouse-lautrec/lautrec-page-53.jpg',
  'img/pages/toulouse-lautrec/lautrec-page-54.jpg',
  'img/pages/charlotte-henschel/charlotte-page-55.jpg',
  'img/pages/charlotte-henschel/charlotte-page-56.jpg',
];

function readSrc(relativePath) {
  return fs.readFileSync(path.join(srcDir, relativePath), 'utf8');
}

test.describe('PRD-014 - pages projets Marilyn, Toulouse-Lautrec et Charlotte Henschel', () => {
  test('les pages source intègrent les corrections éditoriales et les exports stabilisés', ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1920', 'Contrôle source exécuté une seule fois.');

    const marilyn = readSrc('marilyn.html');
    const lautrec = readSrc('toulouse-lautrec.html');
    const charlotte = readSrc('charlotte-henschel.html');

    for (const asset of exportedAssets) {
      expect(fs.existsSync(path.join(srcDir, asset)), asset).toBe(true);
    }

    expect(marilyn).toContain('img/pages/marilyn/marilyn-page-50.jpg');
    expect(marilyn).not.toContain('img/pages/page-50/page-50-image-4.jpg');
    expect(marilyn).not.toContain('img/pages/page-50/page-50-image-3.jpg');
    expect(marilyn).not.toContain('img/pages/page-50/page-50-image-2.jpg');
    expect(marilyn).toContain('img/pages/marilyn/marilyn-page-52.jpg');
    expect(marilyn).not.toContain('img/pages/page-52/page-52-image-1.jpg');
    expect(marilyn).not.toContain('img/pages/page-52/page-52-image-2.jpg');
    expect(marilyn).not.toContain('parcours EN direct');
    expect(marilyn).toContain('parcours en direct');

    expect(lautrec).not.toContain('Déambulation EN réalité mixte');
    expect(lautrec).not.toContain('accompagnée d\'une comédienne');
    expect(lautrec).not.toContain('les muses prennent enfin la parole');
    expect(lautrec).not.toContain('page53--export');
    expect(lautrec).not.toContain('page53__export-image');
    expect(lautrec).not.toContain('img/pages/toulouse-lautrec/lautrec-page-53.jpg');
    expect(lautrec).toContain('class="page53__description"');
    expect(lautrec).toContain('img/pages/page-53/page-53-image-2.jpg');
    expect(lautrec).toContain('img/pages/page-53/page-53-principe-actif.jpg');
    expect(lautrec).toContain('img/pages/page-53/page-53-swing-digital.jpg');
    expect(lautrec).toContain('img/pages/page-53/page-53-image-4.jpg');
    expect(lautrec).toContain('Visite immersive en réalité mixte dans Montmartre, accompagnée par des acteur·rices.');
    expect(lautrec).toContain('La Goulue, Jane Avril, Suzanne Valadon : les muses sortent de l\'ombre et prennent la parole.');
    expect(lautrec).toContain('Une déambulation où le spectacle vivant et la réalité mixte réécrivent l\'histoire à travers le regard de celles qui l\'ont vécue.');

    expect(charlotte).not.toContain('l\'histoire de charlotte henschel');
    expect(charlotte).not.toContain('EN réalité mixte');
    expect(charlotte).toContain('l\'histoire de Charlotte Henschel se déploie');
    expect(charlotte).toContain('Une vie passée à peindre malgré la guerre, l\'exil, les camps et l\'anonymat.');
    expect(charlotte).toContain('Un parcours habité par ce besoin irrépressible de créer, envers et contre tout.');
    expect(charlotte).toMatch(/Charlotte a peint\s*<br>\s*plus de 220 tableaux\s*<br>\s*jusqu'à l'âge de 90 ans\./);
  });

  for (const { url, selector } of [
    { url: '/marilyn.html#page-50', selector: '#page-50' },
    { url: '/marilyn.html#page-52', selector: '#page-52' },
    { url: '/toulouse-lautrec.html#page-53', selector: '#page-53' },
    { url: '/toulouse-lautrec.html#page-54', selector: '#page-54' },
    { url: '/charlotte-henschel.html#page-55', selector: '#page-55' },
    { url: '/charlotte-henschel.html#page-56', selector: '#page-56' },
  ]) {
    test(`${url} se rend sans image cassée ni débordement horizontal`, async ({ page }) => {
      await page.goto(url);

      const section = page.locator(selector);
      await expect(section).toBeVisible();

      await page.waitForFunction((targetSelector) => {
        const images = Array.from(document.querySelectorAll(`${targetSelector} img`));

        return images.length > 0 && images.every((img) => img.complete && img.naturalWidth > 0 && img.naturalHeight > 0);
      }, selector);

      const imagesLoaded = await section.locator('img').evaluateAll((images) =>
        images.every((img) => img.complete && img.naturalWidth > 0 && img.naturalHeight > 0),
      );
      expect(imagesLoaded).toBe(true);

      const overflow = await page.evaluate(() => Math.ceil(document.documentElement.scrollWidth - window.innerWidth));
      expect(overflow).toBeLessThanOrEqual(1);

      if (selector === '#page-53') {
        const description = await section.locator('.page53__description').evaluate((element) => ({
          text: element.textContent.replace(/\s+/g, ' ').trim(),
          paragraphCount: element.querySelectorAll('p').length,
          paragraphs: Array.from(element.querySelectorAll('p')).map((paragraph) => ({
            text: paragraph.textContent.trim(),
            marginBottom: Number.parseFloat(getComputedStyle(paragraph).marginBottom),
          })),
        }));

        expect(description.text).toBe("Visite immersive en réalité mixte dans Montmartre, accompagnée par des acteur·rices. Le Paris de 1890 se superpose au présent. L'effervescence de la Belle Époque reprend vie.");
        expect(description.paragraphCount).toBe(3);
        expect(description.paragraphs.map((paragraph) => paragraph.text)).toEqual([
          'Visite immersive en réalité mixte dans Montmartre, accompagnée par des acteur·rices.',
          'Le Paris de 1890 se superpose au présent.',
          "L'effervescence de la Belle Époque reprend vie.",
        ]);
        expect(description.paragraphs[0].marginBottom).toBeGreaterThan(8);
        expect(description.paragraphs[1].marginBottom).toBeGreaterThan(8);
        expect(description.paragraphs[2].marginBottom).toBe(0);

        const logoRow = await section.locator('.page53__logos img').evaluateAll((logos) => {
          const rects = logos.map((logo) => logo.getBoundingClientRect());
          const tops = rects.map((rect) => rect.top);
          const bottoms = rects.map((rect) => rect.bottom);
          const heights = rects.map((rect) => rect.height);

          return {
            count: rects.length,
            topDelta: Math.max(...tops) - Math.min(...tops),
            rowHeight: Math.max(...bottoms) - Math.min(...tops),
            maxLogoHeight: Math.max(...heights),
          };
        });

        expect(logoRow.count).toBe(3);
        expect(logoRow.topDelta).toBeLessThanOrEqual(2);
        expect(logoRow.rowHeight).toBeLessThanOrEqual(logoRow.maxLogoHeight + 2);
      }

      if (selector === '#page-55') {
        const paragraphs = await section.locator('.page53__description p').evaluateAll((items) =>
          items.map((paragraph) => ({
            text: paragraph.textContent.trim(),
            marginBottom: Number.parseFloat(getComputedStyle(paragraph).marginBottom),
          })),
        );

        expect(paragraphs.map((paragraph) => paragraph.text)).toEqual([
          "Une valise restée quarante ans dans l'oubli, sous un lit.",
          "Quand elle s'ouvre, l'histoire de Charlotte Henschel se déploie. Une vie passée à peindre malgré la guerre, l'exil, les camps et l'anonymat.",
          'En réalité mixte, le public traverse son siècle.',
          'Un parcours habité par ce besoin irrépressible de créer, envers et contre tout.',
        ]);
        expect(paragraphs[0].marginBottom).toBeGreaterThan(14);
        expect(paragraphs[1].marginBottom).toBeGreaterThan(14);
        expect(paragraphs[2].marginBottom).toBeGreaterThan(14);
        expect(paragraphs[3].marginBottom).toBe(0);
      }

      if (selector === '#page-56') {
        const bio = await section.locator('.page56__bio p').evaluateAll((paragraphs) =>
          paragraphs.map((paragraph) => ({
            text: paragraph.textContent.replace(/\s+/g, ' ').trim(),
            textTransform: getComputedStyle(paragraph).textTransform,
            textAlign: getComputedStyle(paragraph).textAlign,
            lineHeight: Number.parseFloat(getComputedStyle(paragraph).lineHeight),
            fontSize: Number.parseFloat(getComputedStyle(paragraph).fontSize),
          })),
        );

        expect(bio.map((paragraph) => paragraph.text)).toEqual([
          "Charlotte a peint plus de 220 tableaux jusqu'à l'âge de 90 ans.",
          "Son œuvre figure dans des collections privées, ainsi qu'au MAHJ (Paris) et au musée Henri-Martin (Cahors).",
        ]);
        expect(bio.every((paragraph) => paragraph.textTransform === 'none')).toBe(true);
        expect(bio.every((paragraph) => paragraph.textAlign === 'left')).toBe(true);
        expect(bio.every((paragraph) => paragraph.lineHeight > paragraph.fontSize * 1.45)).toBe(true);
      }
    });
  }
});
