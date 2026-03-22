# Roadmap - Swing Digital

**Projet** : Site vitrine multi-pages Swing Digital
**Début** : 2026-02-20
**Status** : Découpé terminée, pre-production

---

## Phases terminees

| Phase | Contenu | Statut |
|-------|---------|--------|
| 1. Préparation | Structure HTML, extraction PDF | TERMINE |
| 2. Intégration | 62 pages intégrées dans index.html | TERMINE |
| 3. Audit fidélité | Comparaison rendu vs maquette PDF | TERMINE |
| 4. Polissage | Corrections visuelles, couleurs, images | TERMINE |
| 5. Découpé multi-pages | 24 pages HTML, navigation 3 niveaux | TERMINE (v4) |
| 6. Accessibilité | WCAG 2.2 AA, RGAA 4.1, audit axe-core | TERMINE (0 violation) |
| 7. Pages utilitaires | 404, plan du site, mentions légales | TERMINE |

---

## Avant mise en production (bloquant)

- [ ] Remplacer `https://DOMAINE/` par le domaine réel (canonical, OG, sitemap, robots)
- [ ] Ajouter width/height sur les 124 images sans dimensions
- [ ] Corriger les 2 boutons "Je m'inscris" (reservations.html)
- [ ] Créer le favicon (img/favicon.ico)
- [ ] Configurer HTTPS + headers sécurité (CSP, X-Frame-Options, HSTS)
- [ ] Renseigner l'hébergeur dans mentions-légales.html

## Améliorations recommandées

- [ ] Ajouter og:image sur chaque page (image représentative)
- [ ] Optimiser les images (compression, WebP avec fallback)
- [ ] Ajouter fetchpriority="high" sur le preload hero
- [ ] Corriger la variable CSS circulaire (--color-red-mid)
- [ ] Test cross-browser (Chrome, Firefox, Safari)
- [ ] Test lecteur d'écran (VoiceOver, NVDA)

## Optionnel (post-lancement)

- [ ] Bouton retour en haut de page
- [ ] Navigation inter-projets (Précédent/Suivant)
- [ ] Responsive images (srcset/picture)
- [ ] Content-Security-Policy headers
- [ ] Analytics (respectueux RGPD)
- [ ] Formulaire newsletter fonctionnel
- [ ] Billetterie (liens RESERVER)

---

## Scores actuels (audit 2026-03-22)

| Catégorie | Score |
|-----------|-------|
| Accessibilité | 92/100 |
| Bonnes pratiques | 90/100 |
| UX | 88/100 |
| Sécurité | 85/100 |
| Technique | 78/100 |
| SEO | 65/100 |
| **Global** | **83/100** |

---

**Dernière mise à jour** : 2026-03-22
