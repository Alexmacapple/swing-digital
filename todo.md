# Swing Digital - Todo

## Backlog mise en production finale

### Bloquant / À décider

- [ ] Renseigner les mentions légales avec l'hébergeur réel.
- [ ] Valider le scénario Réservations : page informative ou parcours transactionnel.
- [ ] Ne pas utiliser `https://swing.appmiweb.com/#page-1` comme URL de partage ou SEO ; garder l'URL canonique `https://swing.appmiweb.com/`.
- [ ] Choisir et préparer le domaine final HTTPS.
- [ ] Basculer les URL SEO publiques vers le domaine final avec `npm run seo:set-base -- https://domaine-final`.
- [ ] Configurer les redirections HTTP vers HTTPS.
- [ ] Configurer le document d'erreur 404 côté origine : les URL inexistantes doivent afficher `/404.html` en conservant le statut HTTP `404`.
- [ ] Vérifier les canonical, `sitemap.xml` et `robots.txt` sur le domaine final.
- [ ] Brancher ou préparer la mesure réelle : Google Search Console, GA4 ou GTM, Bing Webmaster Tools et événements de conversion.

### À faire juste avant publication

- [ ] Exécuter `npm run build:prod`.
- [ ] Exécuter `npm run appmiweb:preflight`.
- [ ] Exécuter `npm run appmiweb:search-crawl`.
- [ ] Vérifier que `/llms.txt`, `/for-ai`, `/for-ai.json` et `/for-ai.txt` restent alignés avec les contenus visibles.
- [ ] Relancer un audit SEO/GEO sur l'URL canonique finale, pas seulement sur la préproduction.
- [ ] Vérifier `curl -sL https://swing.appmiweb.com/page-inexistante-test-404.html | rg "page-404-hero"` après configuration serveur.

## Améliorations recommandées

- [ ] Installer GSC, GA4 ou GTM, Bing Webmaster Tools et suivi des sources IA au moment du go-live.
- [ ] Optimiser le LCP de l'accueil sur le domaine final si Lighthouse reste > 2,5 s.
- [ ] Décider et publier une politique crawlers IA propriétaire.
- [ ] Optimiser les images (compression, WebP/AVIF avec fallback).
- [ ] Test lecteur d'écran final (VoiceOver, NVDA).

## Terminé

- [x] Phase 1-4 : Intégration 62 pages
- [x] Audit fidélité PDF
- [x] Découpe multi-pages (24 HTML)
- [x] Navigation 3 niveaux (menu, dropdown, sous-menu Monroe)
- [x] Accessibilité RGAA (0 violation axe-core)
- [x] Pages utilitaires (404, plan du site, mentions légales)
- [x] Audit complet historique (83/100 au 2026-03-22)
- [x] Suppression badges de section (redondants)
- [x] Traduction textes anglais en français
- [x] Accentuation complète des fichiers Markdown
- [x] Footer complet (8 liens, centré, responsive)
- [x] Bouton retour en haut de page (accessible)
- [x] Ajout width/height sur toutes les images (CLS)
- [x] Favicon créé + og:image sur toutes les pages
- [x] Correction zoom 200% (RGAA 10.4) — 7 points critiques
- [x] Boutons Je m'inscris convertis en aria-disabled
- [x] Tests Playwright historiques (984 tests, 4 viewports)
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
- [x] Bascule SEO de préproduction vers `https://swing.appmiweb.com`
- [x] Audit SEO/GEO de préproduction : 23 URL sitemap en 200, canonicals OK, JSON-LD présent
- [x] `npm run seo:check` : 9/9 tests passés
- [x] Suite complète Playwright : 1 301 tests passés, 154 ignorés
- [x] `npm run build:prod` et `npm run appmiweb:preflight`
- [x] PRD-001 créé : mise en production SEO/GEO et mesure
- [x] PRD-007 créé : migration typographique Satoshi
- [x] PRD-007 livré : Satoshi Variable auto-hébergée, anciennes polices supprimées, validation navigateur toutes pages OK
- [x] PRD-008 créé : fonds roses adoucis
- [x] PRD-009 créé : routage de la page 404 personnalisée
- [x] Page 404 hero visible sur `/404.html`
- [x] Documentation d'exploitation 404 créée dans `docs/404-CUSTOM-ERROR-PAGE.md`
