# Roadmap - Swing Digital

**Projet** : Site vitrine multi-pages Swing Digital
**Début** : 2026-02-20
**Statut** : Préproduction Appmiweb validée techniquement, production finale en attente

---

## Phases terminées

| Phase | Contenu | Statut |
|-------|---------|--------|
| 1. Préparation | Structure HTML, extraction PDF | Terminé |
| 2. Intégration | 62 pages intégrées dans index.html | Terminé |
| 3. Audit fidélité | Comparaison rendu vs maquette PDF | Terminé |
| 4. Polissage | Corrections visuelles, couleurs, images | Terminé |
| 5. Découpe multi-pages | 24 pages HTML, navigation 3 niveaux | Terminé (v4) |
| 6. Accessibilité | WCAG 2.2 AA, RGAA 4.1, audit axe-core | Terminé (0 violation) |
| 7. Pages utilitaires | 404, plan du site, mentions légales | Terminé |
| 8. Nettoyage | Badges supprimés, traduction FR, accentuation | Terminé |
| 9. UX | Footer 8 liens, bouton retour en haut | Terminé |
| 10. SEO | Favicon, og:image, width/height images | Terminé |
| 11. Zoom 200% | 7 corrections RGAA 10.4 / WCAG 1.4.4 | Terminé |
| 12. Tests | Playwright : dernier run observé 1 301 passés, 154 ignorés | Terminé |
| 13. SEO/GEO préproduction | Canonicals Appmiweb, sitemap, robots, `llms.txt`, JSON-LD, FAQ, réponses directes | Terminé |
| 14. Packaging production | `npm run build:prod`, `dist/` public, preflight Appmiweb | Terminé |
| 15. PRD production SEO/GEO | PRD-001 : mesure, LCP, politique crawlers IA | Terminé |

---

## Avant mise en production (bloquant)

- [ ] Choisir le domaine final HTTPS.
- [ ] Basculer les canonicals, Open Graph, sitemap, robots et `llms.txt` vers le domaine final.
- [ ] Configurer HTTPS + redirections HTTP vers HTTPS.
- [ ] Renseigner l'hébergeur dans `mentions-legales.html`.
- [ ] Décider le scénario Réservations : billetterie active ou lancement informatif avec contact.
- [ ] Exécuter `npm test`, `npm run seo:check`, `npm run build:prod` et `npm run prod:preflight -- https://domaine-final`.

## Améliorations recommandées

- [ ] Optimiser le LCP de l'accueil sur le domaine final.
- [ ] Installer GSC, GA4 ou GTM, Bing Webmaster Tools et suivi des sources IA.
- [ ] Décider la politique crawlers IA : recherche/citation, fetch utilisateur, entraînement.
- [ ] Optimiser les images (compression, WebP/AVIF avec fallback).
- [ ] Test cross-browser final (Chrome, Firefox, Safari).
- [ ] Test lecteur d'écran final (VoiceOver, NVDA).

## Optionnel (post-lancement)

- [ ] Navigation inter-projets (Précédent/Suivant)
- [ ] Responsive images (srcset/picture)
- [ ] Content-Security-Policy headers
- [ ] Reporting SEO/GEO post-lancement à J+14.
- [ ] Formulaire newsletter fonctionnel
- [ ] Billetterie (liens Réserver)

---

**Dernière mise à jour** : 2026-06-20
