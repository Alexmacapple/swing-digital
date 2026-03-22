# Roadmap - Swing Digital

**Projet** : Site vitrine multi-pages Swing Digital
**Debut** : 2026-02-20
**Status** : Decoupe terminee, pre-production

---

## Phases terminees

| Phase | Contenu | Statut |
|-------|---------|--------|
| 1. Preparation | Structure HTML, extraction PDF | TERMINE |
| 2. Integration | 62 pages integrees dans index.html | TERMINE |
| 3. Audit fidelite | Comparaison rendu vs maquette PDF | TERMINE |
| 4. Polissage | Corrections visuelles, couleurs, images | TERMINE |
| 5. Decoupe multi-pages | 24 pages HTML, navigation 3 niveaux | TERMINE (v4) |
| 6. Accessibilite | WCAG 2.2 AA, RGAA 4.1, audit axe-core | TERMINE (0 violation) |
| 7. Pages utilitaires | 404, plan du site, mentions legales | TERMINE |

---

## Avant mise en production (bloquant)

- [ ] Remplacer `https://DOMAINE/` par le domaine reel (canonical, OG, sitemap, robots)
- [ ] Ajouter width/height sur les 124 images sans dimensions
- [ ] Corriger les 2 boutons "Je m'inscris" (reservations.html)
- [ ] Creer le favicon (img/favicon.ico)
- [ ] Configurer HTTPS + headers securite (CSP, X-Frame-Options, HSTS)
- [ ] Renseigner l'hebergeur dans mentions-legales.html

## Ameliorations recommandees

- [ ] Ajouter og:image sur chaque page (image representative)
- [ ] Optimiser les images (compression, WebP avec fallback)
- [ ] Ajouter fetchpriority="high" sur le preload hero
- [ ] Corriger la variable CSS circulaire (--color-red-mid)
- [ ] Test cross-browser (Chrome, Firefox, Safari)
- [ ] Test lecteur d'ecran (VoiceOver, NVDA)

## Optionnel (post-lancement)

- [ ] Bouton retour en haut de page
- [ ] Navigation inter-projets (Precedent/Suivant)
- [ ] Responsive images (srcset/picture)
- [ ] Content-Security-Policy headers
- [ ] Analytics (respectueux RGPD)
- [ ] Formulaire newsletter fonctionnel
- [ ] Billetterie (liens RESERVER)

---

## Scores actuels (audit 2026-03-22)

| Categorie | Score |
|-----------|-------|
| Accessibilite | 92/100 |
| Bonnes pratiques | 90/100 |
| UX | 88/100 |
| Securite | 85/100 |
| Technique | 78/100 |
| SEO | 65/100 |
| **Global** | **83/100** |

---

**Derniere mise a jour** : 2026-03-22
