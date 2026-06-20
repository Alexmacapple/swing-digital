# Swing Digital - Site vitrine

Site vitrine multi-pages pour Swing Digital, spécialiste des expériences immersives et espaces augmentés.

Site statique de préproduction sur `https://swing.appmiweb.com`, issu d'une maquette PDF de 62 pages, avec navigation 3 niveaux, accessibilité RGAA et socle SEO/GEO prêt pour validation avant domaine final.

## Démarrage rapide

```bash
npm test
npm run seo:check
npm run build:prod
npm run appmiweb:preflight
```

Pour une lecture locale simple :

```bash
cd src/
python3 -m http.server 8080
```

## Tests

```bash
npm test
# Dernier run observé : 1 301 tests passés, 154 ignorés
```

Contrôle SEO/GEO ciblé :

```bash
npm run seo:check
# Dernier run observé : 9/9 tests passés
```

## Stack technique

- HTML5 sémantique (24 pages)
- CSS3 responsive (variables, BEM, mobile-first)
- JavaScript vanilla (navigation, vidéos, animations)
- Playwright (tests automatisés)
- Lighthouse et contrôles SEO/GEO de préproduction
- Polices : Brandon, Fragen
- Pas de framework ni bundler

## Fonctionnalités

- Navigation 3 niveaux (menu, dropdown, sous-menu Monroe 11 liens)
- Fil d'Ariane sticky sous le header
- Bouton retour en haut de page
- Vidéo hero avec contrôle son
- Vidéo contact avec play/pause
- Footer 8 liens (responsive)
- Page 404, plan du site, mentions légales
- Favicon, Open Graph, Twitter Card et JSON-LD sur les pages indexables
- `robots.txt`, `sitemap.xml` et `llms.txt`
- Build de production `dist/` excluant les artefacts de travail

## Accessibilité (WCAG 2.2 AA / RGAA 4.1)

- 0 violation axe-core observée dans la suite Playwright actuelle
- Navigation clavier complète (Tab, Escape, flèches)
- Zoom 200% conforme (RGAA 10.4)
- Textes en casse normale, majuscules via CSS (RGAA 10.2)
- Intitulés de liens explicites (RGAA 6.1)
- prefers-reduced-motion respecté
- Contraste WCAG AA conforme

## Documentation

| Fichier | Contenu |
|---------|---------|
| CLAUDE.md | Mémoire projet, stack, composants, décisions |
| GUIDELINES-TEMPLATES.md | Conventions CSS/HTML, archétypes, classes BEM |
| ENSEIGNEMENTS-PAGES.md | Leçons apprises, erreurs récurrentes |
| PRD-DECOUPAGE.md | PRD découpe multi-pages (terminé) |
| PRD-BUILD-PARTIALS.md | PRD historique de factorisation HTML par partials |
| ROADMAP.md | Phases, todo pré-prod |
| AUDIT-COMPLET.md | Audit technique, SEO, a11y, sécurité, UX |
| docs/SEO-GEO-AUDIT.md | Audit SEO/GEO de préproduction |
| docs/SEO-GEO-PROD-CHECKLIST.md | Checklist go-live SEO/GEO |
| prd-meta-workflow/PRD-001-seo-geo-production.MD | PRD mise en production SEO/GEO et mesure |

## Production

La préproduction Appmiweb est validée techniquement. La production finale reste bloquée tant que le domaine final HTTPS, l'hébergeur légal et le scénario Réservations ne sont pas décidés.

Commande de bascule vers production finale :

```bash
npm test
npm run seo:set-base -- https://votre-domaine.fr
SEO_BASE_URL=https://votre-domaine.fr npm run seo:check
npm run build:prod
npm run prod:preflight -- https://votre-domaine.fr
```

---

**Dernière mise à jour** : 2026-06-20
**Version** : v6 préproduction SEO/GEO
