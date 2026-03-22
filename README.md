# Swing Digital - Site vitrine

Site vitrine multi-pages pour Swing Digital, spécialiste des expériences immersives et espaces augmentés.

24 pages HTML découpées depuis une maquette PDF de 62 pages, avec navigation 3 niveaux et accessibilité RGAA.

## Démarrage rapide

```bash
cd src/
python3 -m http.server 8080
# Ouvrir http://localhost:8080/
```

## Tests

```bash
npx playwright test
# 984 tests sur 4 viewports (1920, 1024, 768, 375px)
```

## Stack technique

- HTML5 sémantique (24 pages)
- CSS3 responsive (variables, BEM, mobile-first)
- JavaScript vanilla (navigation, vidéos, animations)
- Playwright (tests automatisés)
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
- Favicon + Open Graph sur toutes les pages

## Accessibilité (WCAG 2.2 AA / RGAA 4.1)

- 0 violation axe-core sur 24 pages
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
| ROADMAP.md | Phases, todo pré-prod |
| AUDIT-COMPLET.md | Audit technique, SEO, a11y, sécurité, UX |

---

**Dernière mise à jour** : 2026-03-23
**Version** : v5
