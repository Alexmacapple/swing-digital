# Roadmap - Swing Digital

**Projet** : Site vitrine multi-pages Swing Digital
**Début** : 2026-02-20
**Statut** : Découpe terminée, pré-production

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
| 8. Suppression badges | Badges de section redondants retirés | Terminé |
| 9. Traduction | Textes anglais traduits en français | Terminé |

---

## Avant mise en production (bloquant)

- [x] Remplacer l'ancien placeholder de domaine par le domaine réel disponible actuellement (canonical, OG, sitemap, robots)
- [x] Ajouter un build `dist/` qui exclut les artefacts de travail (`generated-pages.html`, `pages-extracted/`, Markdown projet, PDF source)
- [x] Ajouter un preflight production bloquant (`npm run prod:preflight -- https://votre-domaine.fr`)
- [ ] Ajouter width/height sur les 124 images sans dimensions
- [ ] Corriger les 2 boutons "Je m'inscris" (reservations.html)
- [ ] Créer le favicon (img/favicon.ico)
- [ ] Configurer HTTPS + headers sécurité (CSP, X-Frame-Options, HSTS), puis basculer les URL canoniques en HTTPS
- [ ] Lancer `npm run seo:set-base -- https://votre-domaine.fr`, `SEO_BASE_URL=https://votre-domaine.fr npm run seo:check`, puis `npm run prod:preflight -- https://votre-domaine.fr`
- [ ] Renseigner l'hébergeur dans mentions-legales.html

## Améliorations recommandées

- [x] Ajouter og:image absolue sur chaque page indexable (image représentative)
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
- [ ] Billetterie (liens Réserver)

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

**Dernière mise à jour** : 2026-06-20
