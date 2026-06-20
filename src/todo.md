# Swing Digital - Todo

## Avant mise en production (bloquant)

- [x] Remplacer l'ancien placeholder de domaine par le vrai domaine disponible actuellement (canonical, OG, sitemap, robots)
- [x] Générer un dossier public `dist/` sans artefacts de travail
- [x] Ajouter un preflight production bloquant sur domaine HTTPS, mentions légales, sitemap, robots, JSON-LD et liens locaux
- [ ] Ajouter width/height sur les 124 images sans dimensions
- [ ] Corriger les 2 boutons "Je m'inscris" (reservations.html)
- [ ] Créer img/favicon.ico et décommenter la balise link
- [ ] Configurer HTTPS + headers sécurité, puis basculer les URL canoniques en HTTPS
- [ ] Lancer la bascule SEO prod avec `npm run seo:set-base -- https://votre-domaine.fr`, avec le vrai domaine
- [ ] Valider `SEO_BASE_URL=https://votre-domaine.fr npm run seo:check` puis `npm run prod:preflight -- https://votre-domaine.fr`
- [ ] Renseigner l'hébergeur dans mentions-legales.html

## Améliorations recommandées

- [x] Ajouter og:image absolue sur chaque page indexable
- [ ] Optimiser les images (compression, WebP)
- [ ] Test cross-browser (Chrome, Firefox, Safari)
- [ ] Test lecteur d'écran (VoiceOver, NVDA)

## Terminé

- [x] Phase 1-4 : Intégration 62 pages
- [x] Audit fidélité PDF
- [x] Découpe multi-pages (24 HTML)
- [x] Navigation 3 niveaux
- [x] Accessibilité RGAA (0 violation axe-core)
- [x] Pages utilitaires (404, plan du site, mentions légales)
- [x] Audit complet (83/100)
- [x] Documentation à jour
- [x] Suppression badges de section (redondants)
- [x] Traduction textes anglais en français
- [x] Accentuation complète des fichiers Markdown
