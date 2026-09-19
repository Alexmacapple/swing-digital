const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

test.describe('T09 - Réservation : page archivée, bloc « Restez informé » conservé', () => {
  test('la page complète est archivée hors de src/', () => {
    const archive = read('docs/archives/reservations-complete-2026-09-19.html');
    expect(archive).toContain('Expérience toulouse-lautrec');
    expect(archive).toContain('Plein tarif : 29 &euro;');
    expect(archive).toContain('"@type": "FAQPage"');
  });

  test('la page ne garde que le bloc demandé, mot pour mot', () => {
    const h = read('src/reservations.html');
    const main = h.match(/<main[\s\S]*?<\/main>/)[0];
    for (const t of ['Restez informé', 'Abonnez-vous pour bénéficier de :', '<li>Invitations aux vernissages</li>',
      '<li>Accès aux catalogues en avant-première</li>', '<li>Calendrier des événements à venir</li>', "Je m'inscris",
      'Newsletter bientôt disponible. Pour être informé, <a href="mailto:production@swingdigitalproduction.com">contactez-nous</a>.']) {
      expect(main, t).toContain(t);
    }
    expect(main.match(/Restez informé/g)).toHaveLength(1);
    for (const t of ['29 €', 'Tarif', 'toulouse-lautrec', 'charlotte henschel', 'Ce qui est inclus', 'Questions fréquentes', 'Visites privées', 'Réservez votre expérience XR', '<img']) {
      expect(main.toLowerCase(), t).not.toContain(t.toLowerCase());
    }
    expect(h.match(/<h1[ >]/g)).toHaveLength(1);
    expect(main).toContain('<h2 id="restez-informe-title" class="page58__newsletter-title">Restez informé</h2>');
  });

  test('aucun parcours transactionnel : le bouton reste désactivé', () => {
    const main = read('src/reservations.html').match(/<main[\s\S]*?<\/main>/)[0];
    expect(main).toContain('<button type="button" aria-disabled="true"');
    expect(main).not.toMatch(/<form|type="submit"|<input/);
  });

  test('métadonnées et données structurées reflètent la page', () => {
    const h = read('src/reservations.html');
    expect(h).not.toContain('"@type": "FAQPage"');
    expect(h).not.toMatch(/tarifs|visites privées|groupes/i);
    const ld = JSON.parse(h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    const types = ld['@graph'].map((n) => n['@type']);
    expect(types).toEqual(expect.arrayContaining(['WebPage', 'BreadcrumbList']));
    expect(h.match(/<iframe/g)).toBeNull();
  });

  test('les fichiers destinés aux IA ne renvoient plus vers des tarifs absents', () => {
    for (const f of ['src/llms.txt', 'src/for-ai.txt', 'src/for-ai.json', 'src/for-ai/index.html']) {
      const t = read(f);
      expect(t, f).not.toMatch(/tarifs[^.]*doivent être revérifiées sur la page R[ée]servation/i);
      expect(t, f).not.toContain('Réservation et visites privées');
      expect(t, f).toContain('reservations.html');
    }
  });

  test('la page rendue affiche le bloc, lisible et sans débordement', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/reservations.html');
    await expect(page.locator('#restez-informe-title')).toHaveText('Restez informé');
    await expect(page.getByRole('button', { name: "Je m'inscris" })).toBeVisible();
    await expect(page.getByRole('link', { name: 'contactez-nous' })).toHaveAttribute('href', 'mailto:production@swingdigitalproduction.com');
    const m = await page.evaluate(() => {
      const bloc = document.querySelector('.page58__newsletter').getBoundingClientRect();
      return { largeur: bloc.width, vw: innerWidth, deborde: document.documentElement.scrollWidth > innerWidth + 1 };
    });
    expect(m.largeur).toBeGreaterThan(240);
    expect(m.largeur).toBeLessThanOrEqual(m.vw);
    expect(m.deborde).toBe(false);
  });
});
