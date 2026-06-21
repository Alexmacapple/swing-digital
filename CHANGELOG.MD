# Changelog

## 2026-06-21

- Implémentation du PRD-012 : accueil recentré sur les expériences immersives, hashtags mis à jour, ligne de soutiens retirée du hero, introduction `#page-3` simplifiée et nouveau visuel `1_swing.jpg` intégré avec test Playwright dédié.
- Analyse des retours Stéphanie issus de `retour/changements_site (1).docx` et `retour/site_images/`, avec tri des points déjà faits, corrections restantes et questions ouvertes.
- Création des PRD-012 à PRD-016 : accueil éditorial, catalogue XR / The Party, pages projet Marilyn-Lautrec-Charlotte, page autonome Memory Box VR, contact/adresse/logo.
- Implémentation du PRD-011 : menu principal `Accueil - XR - Espace augmenté - Films - Réservation`, création de `films.html`, déplacement de `Ni vues ni connues` sous Films et alignement sitemap / fichiers IA.
- Restauration du harnais Playwright versionné : `npm test` couvre PRD-011 et le socle SEO/GEO local ; `npm run seo:check` cible `tests/seo-geo.spec.js`.
- Mise à jour du PRD-010 : adoption de `faster-whisper` via `scripts/transcribe-faster-whisper.py` pour produire les transcripts bruts.
- Création du PRD-011 : séparation menu et découpage éditorial XR / Films, avec création prévue de `films.html` et déplacement de `Ni vues ni connues`.
- Mise à jour du PRD-010 : extension du périmètre à toutes les vidéos publiques trouvées dans `src/*.html` et exclusion Git des artefacts locaux audio, vidéo et Whisper.
- Création du PRD-010 : récupération, transcription Whisper, correction et publication accessible des transcripts des vidéos publiques.
- Validation et livraison du PRD-007 : Satoshi Variable auto-hébergée sur tout le site, suppression des anciennes polices OTF/TTF, build et contrôles navigateur toutes pages validés.
- Mise à jour des PRD-007, PRD-008 et PRD-009 avec leur statut, leur état d'implémentation et les suites de validation.
- Mise à jour des Markdown racine pour refléter Satoshi, les fonds roses, la page 404 hero et le routage 404 restant côté hébergement.
- Création du PRD-009 : routage serveur de la page 404 personnalisée avec conservation du statut HTTP 404.
- Création du PRD-008 : remplacement ciblé des grands fonds rouges par des fonds roses adoucis et lisibles.
- Création du PRD-007 : migration typographique vers Satoshi Variable auto-hébergée sur tout le site.
- Création du PRD-006 : fiabilisation de l'audit responsive lazy-load sans modifier le site public.
- Implémentation du PRD-006 dans le skill `seo-geo-growth-agent` : mesure responsive avant et après scroll, distinction des images lazy-load et validation sur la préproduction publique.

## 2026-06-20

- Création des PRD préproduction issus du rapport HTML SEO/GEO : Design Watch, preuves GEO/citation IA, mesure préproduction et validation Search/Crawl.
- Mise à jour des Markdown racine avec l'état préproduction SEO/GEO, le PRD-001 et les chantiers de production différés.
- Création du PRD-001 : mise en production SEO/GEO et mesure.
- Ajout du contrôle public `appmiweb:search-crawl` et diagnostic du blocage PRD-005 : la préproduction sert encore des artefacts non publics hors `dist/`.
