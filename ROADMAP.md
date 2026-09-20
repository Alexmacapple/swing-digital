# Roadmap - Swing Digital

**Projet** : Site vitrine multi-pages Swing Digital
**Début** : 2026-02-20
**Statut** : recette par la cliente sur GitHub Pages (`https://alexmacapple.github.io/swing-digital/`), domaine de production configuré sur `https://www.swingdigitalproduction.com`, déploiement Git en préparation

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
| 9. UX | Footer de navigation secondaire, bouton retour en haut | Terminé |
| 10. SEO | Favicon, og:image, width/height images | Terminé |
| 11. Zoom 200% | 7 corrections RGAA 10.4 / WCAG 1.4.4 | Terminé |
| 12. Tests | Harnais Playwright restauré : PRD-011 sur 5 viewports et socle SEO/GEO local | Terminé |
| 13. SEO/GEO production | Canonicals, sitemap, robots, `llms.txt`, JSON-LD, FAQ, réponses directes sur le domaine final | Terminé |
| 14. Packaging production | `npm run build:prod`, `dist/` public, preflight domaine final | Terminé techniquement |
| 15. PRD production SEO/GEO | PRD-001 : mesure, LCP, politique crawlers IA | Terminé |
| 16. Typographie premium | PRD-007 : Satoshi Variable auto-hébergée | Terminé |
| 17. Couleurs roses | PRD-008 : fonds roses adoucis, lisibilité et page équipe | Terminé |
| 18. Page 404 hero | Page 404 custom visible sur `/404.html` | Terminé |
| 19. Transcripts vidéos | PRD-010 : transcripts accessibles des vidéos publiques | Cadré, outillage local ajouté, publication à planifier |
| 20. Menu XR / Films | PRD-011 : séparation XR, Films et Ni vues ni connues | Implémenté et vérifié localement |
| 21. Demandes de la cliente | 33 issues tirées de ses retours de juin et juillet : recomposition des pages d'après ses exports, photos entières, copyrights fixés, vidéos, textes | 24 issues fermées sur 33 au 2026-09-19 ; le reste attend ses fichiers (issue #34) |
| 22. Règle médias | Balayage des 28 pages, garde-fous de test sur le rognage et sur l'espace colorimétrique des JPEG | Terminé |
| 23. Site de recette | GitHub Pages, `scripts/publier-gh-pages.sh`, copie non référençable ; ancienne préproduction retirée du tunnel | Terminé |
| 24. Transcriptions | Outillage remis en état, cinq brouillons produits hors dépôt | Relecture à l'écoute et publication à faire (#33) |

---

## Avant mise en production (bloquant)

- [x] Choisir le domaine final HTTPS : `https://www.swingdigitalproduction.com`.
- [x] Basculer les canonicals, Open Graph, sitemap, robots, JSON-LD, `llms.txt` et `for-ai` vers le domaine final.
- [ ] Configurer HTTPS + redirections HTTP vers HTTPS.
- [ ] Configurer le routage 404 custom : toute URL inexistante doit servir `/404.html` avec un statut HTTP 404.
- [ ] Renseigner l'hébergeur dans `mentions-legales.html`.
- [ ] Décider le scénario Réservations : billetterie active ou lancement informatif avec contact.
- [x] Exécuter `npm test`, `npm run seo:check` et `npm run build:prod`.
- [ ] Obtenir un code 0 avec `npm run prod:preflight -- https://www.swingdigitalproduction.com`.
- [ ] Publier la branche Git de production dans `/homez.1917/laborneoba/www.swingdigitalproduction.com`.

## Améliorations recommandées

- [ ] Optimiser le LCP de l'accueil sur le domaine final.
- [ ] Installer GSC, GA4 ou GTM, Bing Webmaster Tools et suivi des sources IA.
- [ ] Décider la politique crawlers IA : recherche/citation, fetch utilisateur, entraînement.
- [ ] Images : compression sans perte faite ; restent WebP/AVIF avec repli.
- [ ] Recevoir de la cliente les réexports en haute définition et les logos à fond transparent (issue #34).
- [ ] Test cross-browser final (Chrome, Firefox, Safari).
- [ ] Test lecteur d'écran final (VoiceOver, NVDA).
- [ ] Si l'origine ne permet pas le routage 404, envisager le repli Cloudflare Worker documenté dans `docs/404-CUSTOM-ERROR-PAGE.md`.
- [ ] Finaliser le PRD-010 : relire les brouillons à l'écoute, publier les disclosures accessibles et valider le rendu (#33).

## Optionnel (post-lancement)

- [ ] Navigation inter-projets (Précédent/Suivant)
- [ ] Responsive images (srcset/picture)
- [ ] Content-Security-Policy headers
- [ ] Reporting SEO/GEO post-lancement à J+14.
- [ ] Formulaire newsletter fonctionnel
- [ ] Billetterie (liens Réserver)

---

**Dernière mise à jour** : 2026-09-20
