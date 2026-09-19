# Swing Digital - Todo

## Demandes de la cliente (chantier de septembre 2026)

Suivi détaillé dans les issues GitHub du dépôt. Au 2026-09-19 : 24 issues fermées sur 33. Recette par la cliente sur `https://alexmacapple.github.io/swing-digital/` ; après chaque lot de corrections, relancer `scripts/publier-gh-pages.sh`.

### En attente de fichiers ou de réponses de la cliente (issue de suivi #34)

- [ ] #14 et #15 : logos Swing Digital, Principe Actif et Pixihead à fond transparent, en version claire.
- [ ] #5 : logo rose du bas de page, et préciser ce que désigne « bas de page ».
- [ ] #12 : visuel The Party à animer.
- [ ] #8 : page 4 de l'accueil réexportée en grand (reçue en 360 x 594 px).
- [ ] #29 : photos d'origine de la première page des Interviews, au cadrage de son export.
- [ ] Réexports en 2400 px de large des pages livrées mais floues : accueil page 3, Marilyn pages 50 et 52, The Party, seconde photo de la sixième page de Photographies, cinquième page de La Pièce.

### En attente d'une action du porteur du projet

- [ ] #28 : télécharger les trois fichiers audio de la Composition électroacoustique, les convertir pour le web, puis mettre en scène le paysage sonore (boucles courtes ou boucle longue, choix laissé libre par la cliente).
- [ ] #25 : télécharger les vidéos de Memory Box VR.
- [ ] #33 : relire à l'écoute les brouillons de transcription (`transcripts/brouillons-2026-09-19/`, avec `A-RELIRE.md`), décider de la forme publiée des deux longs entretiens, puis publier page par page en étendant `tests/transcriptions-disclosure.spec.js`.
- [ ] Vérifier à l'écoute la transcription « Galerie Joseph » déjà en ligne sur l'accueil : « une blouse du mois d'août » est très probablement « un blues du mois d'août ».
- [ ] Envoyer le message à la cliente (brouillon local, hors dépôt).

## Backlog mise en production finale

### Bloquant / À décider

- [ ] Renseigner les mentions légales avec l'hébergeur réel.
- [ ] Valider le scénario Réservations : page informative ou parcours transactionnel.
- [ ] Les métadonnées SEO (canoniques, balises de partage, données structurées, sitemap, `llms.txt`, `for-ai`) désignent encore `https://swing.appmiweb.com`, ancienne préproduction retirée du tunnel le 2026-09-19 : à basculer dès que le domaine final est choisi.
- [ ] Choisir et préparer le domaine final HTTPS.
- [ ] Basculer les URL SEO publiques vers le domaine final avec `npm run seo:set-base -- https://domaine-final`.
- [ ] Configurer les redirections HTTP vers HTTPS.
- [ ] Configurer le document d'erreur 404 côté origine : les URL inexistantes doivent afficher `/404.html` en conservant le statut HTTP `404`.
- [ ] Vérifier les canonical, `sitemap.xml` et `robots.txt` sur le domaine final.
- [ ] Brancher ou préparer la mesure réelle : Google Search Console, GA4 ou GTM, Bing Webmaster Tools et événements de conversion.

### À faire juste avant publication

- [ ] Exécuter `npm run build:prod`.
- [ ] Exécuter `npm run prod:preflight -- https://domaine-final` (les commandes `npm run appmiweb:*` interrogent l'ancienne préproduction, qui ne répond plus : ne plus les utiliser).
- [ ] Vérifier que `/llms.txt`, `/for-ai`, `/for-ai.json` et `/for-ai.txt` restent alignés avec les contenus visibles.
- [ ] Relancer un audit SEO/GEO sur l'URL canonique finale, pas seulement sur la préproduction.
- [ ] Vérifier sur le domaine final qu'une URL inexistante affiche la page 404 personnalisée avec un statut HTTP `404`.

## Améliorations recommandées

- [ ] Installer GSC, GA4 ou GTM, Bing Webmaster Tools et suivi des sources IA au moment du go-live.
- [ ] Optimiser le LCP de l'accueil sur le domaine final si Lighthouse reste > 2,5 s.
- [ ] Décider et publier une politique crawlers IA propriétaire.
- [ ] Images : compression sans perte faite (ImageOptim, 2026-09-19) ; restent les formats WebP/AVIF avec repli.
- [ ] Renommer en `.png` les treize fichiers de `src/img/monroe/` qui portent l'extension `.jpg` mais sont des PNG, et mettre à jour leurs références.
- [ ] La page Quiz ne porte plus de contenu XR ; vérifier avec la cliente que rien d'autre n'y manque.
- [ ] Aligner la variable CSS `--header-height` sur la hauteur réelle de l'en-tête (3 px d'écart mesurés).
- [ ] Test lecteur d'écran final (VoiceOver, NVDA).
- [ ] Finaliser PRD-010 : voir #33.

## Terminé

- [x] Chantier des demandes de la cliente, session du 2026-09-19 : Photographies (six pages), Composition (pages), La Pièce, Interviews, Expérience interactive, Quiz, volets de L'Expérience Monroe, Voyage autour de moi, Dessine-moi le vent, Toulouse-Lautrec (galerie), Ni vues ni connues, Espaces augmentés, bloc Contact de l'accueil, effet de pavé des pages 3 et 4. Détail dans `CHANGELOG.MD`.
- [x] Règle « aucune photo tronquée » tenue par `tests/t02-medias-entiers.spec.js` sur les 28 pages.
- [x] Sept JPEG encodés en CMJN convertis en sRVB, garde-fou `tests/images-espace-colorimetrique.spec.js`.
- [x] Site de recette sur GitHub Pages, publié par `scripts/publier-gh-pages.sh` ; `swing.appmiweb.com` retiré du tunnel.
- [x] Outillage de transcription remis en état par `uv`, sans installation globale (procédure dans `transcripts/brouillons-2026-09-19/A-RELIRE.md`, hors dépôt).
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
- [x] Footer complet (navigation secondaire, centré, responsive)
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
- [x] Tests visuels PRD-091 : 65 sections testées (24 pages x sections), 65/65 PASS
- [x] Bascule SEO de préproduction vers `https://swing.appmiweb.com`
- [x] Audit SEO/GEO de préproduction historique ; sitemap actuel : 25 URL, canonicals et JSON-LD en place
- [x] Restaurer `npm run seo:check` avec `tests/seo-geo.spec.js`
- [x] Restaurer la suite Playwright : `npm test` couvre PRD-011 et SEO/GEO local
- [x] `npm run build:prod` et `npm run appmiweb:preflight`
- [x] PRD-001 créé : mise en production SEO/GEO et mesure
- [x] PRD-007 créé : migration typographique Satoshi
- [x] PRD-007 livré : Satoshi Variable auto-hébergée, anciennes polices supprimées, validation navigateur toutes pages OK
- [x] PRD-008 créé : fonds roses adoucis
- [x] PRD-009 créé : routage de la page 404 personnalisée
- [x] PRD-010 créé : transcripts accessibles des vidéos publiques
- [x] PRD-010 outillé : script `faster-whisper` local ajouté pour produire les transcripts bruts
- [x] PRD-011 créé : menu et découpage XR / Films
- [x] PRD-011 implémenté : menu `Accueil - XR - Espace augmenté - Films - Réservation`, page `films.html` et `Ni vues ni connues` déplacé sous Films
- [x] Page 404 hero visible sur `/404.html`
- [x] Documentation d'exploitation 404 créée dans `docs/404-CUSTOM-ERROR-PAGE.md`
