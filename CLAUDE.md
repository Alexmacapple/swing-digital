# Swing Digital - Mémoire Projet

**Projet** : swing-digital
**Type** : Site vitrine statique (HTML/CSS/JS)
**Description** : Refonte du site Swing Digital - espaces augmentés, expériences immersives
**Date** : 2026-02-20
**Auteur** : Alex

---

## Contexte

Site vitrine pour Swing Digital, entreprise spécialisée dans les expériences immersives et espaces augmentés.

**Sections du site** :
1. Accueil (présentation + logos partenaires)
2. Espaces augmentés (description services)
3. Expériences (portfolio 6 projets + scroll)
4. Réservations (billetterie)

**Navigation** : Clic photo → page projet single-page

**Référence visuelle** : https://www.atelierdaruma.com/

---

## Stack Technique

- HTML5 sémantique
- CSS3 (responsive, mobile-first)
- JavaScript vanilla (animations)
- Pas de framework ni bundler

---

## Polices

Brandon, Fragen, Raleway Bold, Roboto Bold, Walden Black

---

## Extraction PDF Maquette

**Source** : `/src/maquette-site.pdf` (5.5 MB, 62 pages)
**Extraction** : `/src/pages-extracted/` (68 MB)

**Structure par page** :
- `page-N-screenshot.png` : capture haute résolution
- `page-N-image-*.jpg` : images extraites
- `texte-page-N.md` : texte exact

**Statistiques** :
- 62 pages extraites
- 220 images JPG
- 59 pages avec images

**Fichiers de référence** : README.md, INDEX.md, INVENTAIRE-IMAGES.md, images-inventory.json

---

## Accessibilité - WCAG 2.2 AA OBLIGATOIRE

**Standards** :
- Structure sémantique HTML5
- Contraste 4.5:1 (texte), 3:1 (large)
- Alt text 125+ caractères par image
- Navigation clavier complète
- Lecteurs d'écran : VoiceOver, NVDA, JAWS
- Pas d'auto-play vidéo/son

**Skills à utiliser** :
- `/audit-accessibilite-web` : audit complet
- `/fix-accessibilite` : corriger violations
- `/screen-reader-testing` : valider lecteurs

---

## Workflow d'Intégration - Mode YOLO STRICT

**Intégrer les 62 pages du PDF dans le site HTML**

### Contraintes Impératives

1. **Couverture totale** : TOUTES les 62 pages (page-1 à page-62)
2. **Fidélité absolue** : reproduire exactement les screenshots
3. **Texte identique** : copier intégralement `texte-page-N.md`
4. **Images identiques** : intégrer toutes les images dans le même ordre
5. **Pas d'arrêt mi-page** : terminer complètement avant de passer à la suivante
6. **Mode YOLO autonome** : aucune confirmation, continuer jusqu'au bout

### Checklist par Page

- [x] Screenshot consultée
- [x] Texte copié exactement
- [x] Toutes les images intégrées
- [x] Alt text WCAG 2.2 AA rédigé
- [x] Accessibilité validée
- [x] Responsive testé
- [x] Page HTML complète

### Sources de Vérité

- Maquettes : `/src/pages-extracted/page-N/page-N-screenshot.png`
- Texte : `/src/pages-extracted/page-N/texte-page-N.md`
- Images : `/src/pages-extracted/page-N/page-N-image-*.jpg`

---

## Guidelines Templates - OBLIGATOIRE

**Lors de la creation ou modification de toute page/template du site, TOUJOURS suivre** :
`/Users/alex/Claude/active/swing-digital/GUIDELINES-TEMPLATES.md`

Ce fichier contient les conventions etablies (archetypes, BEM, variables CSS, contraste WCAG AA, responsive, images, checklist) et doit etre consulte AVANT toute integration.

---

## Decisions

1. YOLO STRICT : intégrer les 62 pages séquentiellement, fidèles à la maquette
2. Pas d'arrêt sur une page tant qu'elle n'est pas 100% terminée et validée
3. Valider accessibilité WCAG 2.2 AA avant chaque intégration (utiliser `/audit-accessibilite-web`)
4. Trier les images par catégorie (experiences, portfolio, etc.)
5. Toulouse-Lautrec masqué pour l'instant - remettre avant prod
6. Commits réguliers (par page ou groupe de 5 pages)
