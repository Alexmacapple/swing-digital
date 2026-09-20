# Roadmap - Swing Digital

**Projet** : Site vitrine multi-pages Swing Digital
**Début** : 2026-02-20
**Statut** : source validée sur `main`, build publié sur `production`, contenu présent dans le document root OVH ; HTTPS et routage 404 restent à vérifier sur `https://www.swingdigitalproduction.com`

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
| 19. Transcripts vidéos | PRD-010 : cadrage, outillage et disclosures accessibles des vidéos publiques | Cadrage terminé ; publication française suivie en phase 24 (#33) |
| 20. Menu XR / Films | PRD-011 : séparation XR, Films et Ni vues ni connues | Implémenté et vérifié localement |
| 21. Demandes de la cliente | 33 issues tirées de ses retours de juin et juillet : recomposition des pages d'après ses exports, photos entières, copyrights fixés, vidéos, textes | 24 issues fermées sur 33 au 2026-09-19 ; le reste attend ses fichiers (issue #34) |
| 22. Règle médias | Balayage des 28 pages, garde-fous de test sur le rognage et sur l'espace colorimétrique des JPEG | Terminé |
| 23. Site de recette | Flux GitHub Pages arrêté ; désactivation effective à confirmer dans `Settings → Pages` | Flux arrêté |
| 24. Transcriptions | Cinq transcriptions françaises publiées, disclosures accessibles et générateur corrigé | Ticket #33 clôturé ; relecture humaine intégrale et sous-titres des plateformes restent hors dépôt |
| 25. Version anglaise | Architecture `/en/`, switcher bilingue, traduction éditoriale, SEO/GEO et validation de production découpés dans les issues #47 à #54 | Cadré ; implémentation non commencée |

---

## Avant mise en production (bloquant)

- [x] Choisir le domaine final HTTPS : `https://www.swingdigitalproduction.com`.
- [x] Basculer les canonicals, Open Graph, sitemap, robots, JSON-LD, `llms.txt` et `for-ai` vers le domaine final.
- [ ] Configurer HTTPS + redirections HTTP vers HTTPS.
- [ ] Configurer le routage 404 custom : toute URL inexistante doit servir `/404.html` avec un statut HTTP 404.
- [x] Renseigner l'hébergeur OVH dans `mentions-legales.html`.
- [ ] Décider le scénario Réservations : billetterie active ou lancement informatif avec contact.
- [x] Exécuter `npm test`, `npm run seo:check` et `npm run build:prod`.
- [x] Obtenir un code 0 avec `npm run prod:preflight -- https://www.swingdigitalproduction.com` (avertissements Réservations informatifs).
- [x] Créer et pousser la branche Git `production`, avec uniquement le contenu de `dist/` à sa racine.
- [x] Déployer le contenu de `production` dans le document root OVH.
- [ ] Vérifier DNS, certificat HTTPS, redirections et routage HTTP 404 sur le domaine final.

## Améliorations recommandées

- [ ] Optimiser le LCP de l'accueil sur le domaine final.
- [ ] Installer GSC, GA4 ou GTM, Bing Webmaster Tools et suivi des sources IA.
- [ ] Décider la politique crawlers IA : recherche/citation, fetch utilisateur, entraînement.
- [ ] Images : compression sans perte faite ; restent WebP/AVIF avec repli.
- [ ] Recevoir de la cliente les réexports en haute définition et les logos à fond transparent (issue #34).
- [ ] Test cross-browser final (Chrome, Firefox, Safari).
- [ ] Test lecteur d'écran final (VoiceOver, NVDA).
- [ ] Si l'origine ne permet pas le routage 404, envisager le repli Cloudflare Worker documenté dans `docs/404-CUSTOM-ERROR-PAGE.md`.
- [ ] Finaliser le suivi du PRD-010 : relire intégralement les transcriptions à l'écoute et documenter les sous-titres à activer sur les plateformes (hors dépôt, #33).
- [x] Ajouter les scripts de publication contrôlée depuis le Mac et de synchronisation manuelle depuis SSH OVH.

## Chantier version anglaise

La version anglaise conservera les URLs françaises à la racine et ajoutera les
pages équivalentes sous `/en/`. Le design, les médias et les scripts non
linguistiques restent communs ; les textes visibles, métadonnées, alternatives
textuelles, données structurées et ressources IA doivent être traités en
anglais. Le switcher `FR | EN` doit fonctionner sans JavaScript et rester
accessible au clavier.

Issues GitHub ouvertes :

- [ ] #47 — glossaire bilingue et carte des 29 routes anglaises ; décision sur les slugs et validation éditoriale.
- [ ] #48 — architecture `/en/` et switcher bilingue accessible.
- [ ] #49 — socle partagé, accueil et pages utilitaires.
- [ ] #50 — pages XR, Films et projets indépendants ; contenu à geler avant traduction pour les demandes clientes ouvertes.
- [ ] #51 — collection Monroe et Marilyn, hors transcriptions.
- [ ] #52 — transcriptions vidéo et podcasts ; la décision peut autoriser des blocs conservés en français avec `lang="fr"`, s'ils sont inventoriés.
- [ ] #53 — ressources SEO/GEO bilingues, `hreflang`, sitemap, Open Graph, JSON-LD et ressources IA.
- [ ] #54 — qualité, contrôles récursifs, build et préparation de la mise en production anglaise.

Ordre de dépendance : `#47 → #48 → #49`, puis les lots #50 et #51 en parallèle ;
`#51 → #52` ; `#49 + #50 + #51 → #53 → #54`. La décision éditoriale de #52
doit être tranchée avant la clôture de #54, sans faire de la traduction intégrale
des transcriptions un bloqueur technique obligatoire.

Points à résoudre avant publication anglaise :

- [ ] Valider le glossaire, les titres d'œuvres et la politique de slugs (#47).
- [ ] Geler les contenus français concernés par les issues clientes #12, #14, #15, #25, #28 et #29.
- [ ] Décider le traitement des mentions légales, des transcriptions et des ressources `for-ai`.
- [ ] Faire valider la traduction artistique et juridique par les personnes désignées.

## Optionnel (post-lancement)

- [ ] Navigation inter-projets (Précédent/Suivant)
- [ ] Responsive images (srcset/picture)
- [ ] Content-Security-Policy headers
- [ ] Reporting SEO/GEO post-lancement à J+14.
- [ ] Formulaire newsletter fonctionnel
- [ ] Billetterie (liens Réserver)

---

**Dernière mise à jour** : 2026-09-20 — branche `production` déployée ; scripts Mac/OVH ajoutés ; HTTPS et routage 404 à vérifier
