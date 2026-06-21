# Swing Digital - Site vitrine

Site vitrine multi-pages pour Swing Digital, spécialiste des expériences immersives et espaces augmentés.

Site statique de préproduction sur `https://swing.appmiweb.com`, issu d'une maquette PDF de 62 pages, avec navigation 3 niveaux, page 404 personnalisée, couche IA publique et socle SEO/GEO prêt pour validation avant domaine final.

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
# Suite versionnée : PRD-011 sur 5 viewports + socle SEO/GEO local
```

Contrôle SEO/GEO ciblé :

```bash
npm run seo:check
# Exécute tests/seo-geo.spec.js sur desktop-1920
```

## Stack technique

- HTML5 sémantique (25 pages top-level + `/for-ai/`)
- CSS3 responsive (variables, BEM, mobile-first)
- JavaScript vanilla (navigation, vidéos, animations)
- Playwright configuré, harnais restauré pour PRD-011 et SEO/GEO local
- Lighthouse et contrôles SEO/GEO de préproduction
- Police : Satoshi Variable auto-hébergée
- Pas de framework ni bundler

## Fonctionnalités

- Navigation 3 niveaux (menu, dropdown, sous-menu Monroe 11 liens)
- Fil d'Ariane sticky sous le header
- Bouton retour en haut de page
- Vidéo hero avec contrôle son
- Vidéo contact avec play/pause
- Footer de navigation secondaire (responsive)
- Page 404 hero, plan du site, mentions légales
- Favicon, Open Graph, Twitter Card et JSON-LD sur les pages indexables
- `robots.txt`, `sitemap.xml` et `llms.txt`
- Build de production `dist/` excluant les artefacts de travail

## Accessibilité (WCAG 2.2 AA / RGAA 4.1)

- Dernier audit axe-core complet historique sans violation bloquante ; la suite Playwright actuelle couvre la taxonomie XR / Films et le socle SEO/GEO, pas encore un scan axe-core complet.
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
| docs/404-CUSTOM-ERROR-PAGE.md | Configuration serveur de la page 404 personnalisée |
| docs/PRD-NAVIGATION-XR-FILMS.md | Cadrage source du menu XR / Films |
| docs/AUDIT-MAILLAGE-INTERNE-2026-06-21.md | Audit des liens internes et points éditoriaux à confirmer |
| prd-meta-workflow/PRD-001-seo-geo-production.MD | PRD mise en production SEO/GEO et mesure |
| prd-meta-workflow/PRD-007-migration-typographique-satoshi.MD | PRD migration typographique Satoshi |
| prd-meta-workflow/PRD-008-fonds-roses-adoucis.MD | PRD fonds roses adoucis |
| prd-meta-workflow/PRD-009-routage-404-personnalisee.MD | PRD routage de la page 404 personnalisée |
| prd-meta-workflow/PRD-010-transcripts-videos-accessibles.MD | PRD transcripts accessibles des vidéos et podcasts publics |
| prd-meta-workflow/PRD-011-menu-decoupage-xr-films.MD | PRD menu et découpage XR / Films |

## Production

La préproduction Appmiweb est validée techniquement. La production finale reste bloquée tant que le domaine final HTTPS, l'hébergeur légal et le scénario Réservations ne sont pas décidés.

Point d'hébergement restant : les URL inexistantes doivent être configurées côté origine pour servir `/404.html` avec un statut HTTP `404`. Voir `docs/404-CUSTOM-ERROR-PAGE.md`.

Commande de bascule vers production finale :

```bash
npm test
npm run seo:set-base -- https://votre-domaine.fr
SEO_BASE_URL=https://votre-domaine.fr npm run seo:check
npm run build:prod
npm run prod:preflight -- https://votre-domaine.fr
```

---

**Dernière mise à jour** : 2026-06-21
**Version** : v14 préproduction Satoshi, UI et 404 documentés ; PRD-010 outillé, PRD-011 implémenté ; maillage interne audité
