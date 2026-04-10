# Swing Digital - Todo

## Avant mise en production (bloquant)

- [ ] Remplacer `https://DOMAINE/` par le vrai domaine (canonical, OG, sitemap, robots)
- [ ] Configurer HTTPS + headers sécurité
- [ ] Renseigner l'hébergeur dans mentions-legales.html

## Améliorations recommandées

- [ ] Optimiser les images (compression, WebP)
- [ ] Test lecteur d'écran (VoiceOver, NVDA)
- [ ] **Audit a11y exhaustif (session dédiée)** : `CLAUDE.md` prétend « 0 violation axe-core sur 24 pages », mais le scan révèle au moins 2 vraies violations cachées par le timing JS des animations `.reveal` (IntersectionObserver + opacity:0)
  - Confirmée : `index` `.page3__intro p` `#fcf2f2` sur `#ce3b3d` = 4.42:1 (manque 0.08, fix trivial → `#ffffff` = 4.85:1)
  - Suspectée : `monroe-piece` `.page14__title` `var(--color-teal) #59b5ca` sur blanc = 2.36:1 (la couleur teal est probablement utilisée sur d'autres titres → potentiellement multiple violations)
  - Méthode recommandée : `/audit-accessibilite-web` (skill dédié), pas le test Playwright qui reste fondamentalement flaky avec les animations scroll
  - Mettre à jour `CLAUDE.md` après audit pour refléter l'état réel

## Terminé

- [x] Phase 1-4 : Intégration 62 pages
- [x] Audit fidélité PDF
- [x] Découpe multi-pages (24 HTML)
- [x] Navigation 3 niveaux (menu, dropdown, sous-menu Monroe)
- [x] Accessibilité RGAA (0 violation axe-core)
- [x] Pages utilitaires (404, plan du site, mentions légales)
- [x] Audit complet (83/100)
- [x] Suppression badges de section (redondants)
- [x] Traduction textes anglais en français
- [x] Accentuation complète des fichiers Markdown
- [x] Footer complet (8 liens, centré, responsive)
- [x] Bouton retour en haut de page (accessible)
- [x] Ajout width/height sur toutes les images (CLS)
- [x] Favicon créé + og:image sur toutes les pages
- [x] Correction zoom 200% (RGAA 10.4) — 7 points critiques
- [x] Boutons Je m'inscris convertis en aria-disabled
- [x] Tests Playwright (984 tests, 4 viewports)
- [x] Documentation à jour
- [x] Audit responsive Codex 9/10 (10 commits, 2026-04-06)
- [x] Fix scroll horizontal iPhone logos partenaires (bug WebKit)
- [x] Safe-area complet sur tous les éléments absolus
- [x] Flip sous-menu niveau 3 + promesse video.play()
- [x] Nettoyage CSS mort (-189 lignes) + variables inutilisées
- [x] Cache-buster CSS sur les 24 pages
- [x] Scrollbar masquée, menus scrollables, seuil tactile 44px
- [x] Test cross-browser Chrome DevTools (iPhone, desktop 1100/1440/1920)
- [x] Tests visuels PRD-091 : 65 sections testees (24 pages x sections), 65/65 PASS
