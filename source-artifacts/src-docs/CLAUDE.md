# Swing Digital - Mémoire Projet

**Projet** : swing-digital
**Type** : Site vitrine statique multi-pages (HTML/CSS/JS)
**Description** : Site Swing Digital - espaces augmentés, expériences immersives
**Date début** : 2026-02-20
**Auteur** : Alex
**Dépôt** : git@github.com:Alexmacapple/swing-digital.git (SSH)

---

## Contexte

Site vitrine pour Swing Digital, entreprise spécialisée dans les expériences immersives et espaces augmentés. Site découpé en 24 pages HTML avec navigation 3 niveaux.

**Architecture** : 4 niveaux de pages
1. Accueil, Espaces augmentés, Réservations
2. Expériences Séries (rubrique 8 projets)
3. Pages projet (Monroe, Voyage, Dessine, Ni vues, Marilyn, Toulouse-Lautrec, Charlotte Henschel, XR Corporate)
4. Sous-pages Monroe (Pièce, Roman Graphique, Installation, Photographie, Composition, Podcasts, Interviews, Expériences, Quiz)

**Pages utilitaires** : 404, Plan du site, Mentions légales

---

## Stack technique

- HTML5 sémantique (24 pages)
- CSS3 responsive (variables, BEM, mobile-first, 6 breakpoints)
- JavaScript vanilla (navigation, vidéos, animations)
- Pas de framework ni bundler

## Polices

Brandon (blk, reg, light-it), Fragen (Bold), Raleway Bold

---

## Composants communs (dupliqués dans chaque page)

- **Header** : fixe, fond noir, logo texte, menu 4 sections, dropdown 8 projets, sous-menu Monroe (5 volets + 6 catégories), hamburger mobile
- **Fil d'Ariane** : sticky sous le header, fond noir, texte blanc
- **Footer** : fond noir, copyright, liens (Équipe, Contact, Plan du site, Mentions légales)
- **Skip link** : en dur dans le HTML, premier élément du body

---

## Accessibilité - WCAG 2.2 AA / RGAA 4.1

- 0 violation axe-core sur 24 pages
- Navigation clavier complète (Tab, Escape, Arrow)
- Disclosure pattern sur dropdown et hamburger
- aria-current="page" sur lien actif et breadcrumb
- h1 sur chaque page (sr-only si pas de titre visible)
- Textes en casse normale, majuscules via CSS (RGAA 10.2)
- prefers-reduced-motion respecté (CSS + JS)
- Contraste conforme AA (blanc sur noir 21:1)
- Intitulés de liens explicites (RGAA 6.1)
- Badges de section supprimés (redondants avec le menu)

---

## Règles CSS strictes

- Zéro couleur codée en dur hors :root
- 38+ variables couleur dans :root
- BEM naming sur tous les composants
- text-transform: uppercase pour les majuscules visuelles
- Breakpoints : 480px, 600px, 768px, 1024px, 1200px, 1441px

## Branche de travail

**Branche active** : main
**Tags** : v1, v2, v3, v4
**Branches supprimées** : cosmétique, image, découpage, test

---

## Décisions

1. Découpe multi-pages (24 HTML) au lieu de single-page
2. Header/footer fond noir (cohérence, contraste 21:1)
3. Navigation 3 niveaux (menu > dropdown > sous-menu Monroe)
4. Breadcrumb sticky sous le header
5. Pas de framework JS (vanilla uniquement)
6. Chargement conditionnel Vimeo API (guard iframe)
7. CTA Réservation en button aria-disabled (billetterie non définie)
8. Vidéo contact en pause par défaut (play au clic)
9. Badges de section supprimés (redondants avec navigation persistante)
10. Textes traduits en français (page Voyage)

11. Flip automatique sous-menu niveau 3 si debordement viewport
12. Promesse video.play() geree pour compatibilite iOS

---

## Qualite responsive et code (audit Codex 2026-04-06)

**Note SEO/GEO 2026-06-20** — Les URL SEO publiques utilisent désormais la préproduction `https://swing.appmiweb.com`. Le prochain blocage SEO avant production finale est le choix du domaine définitif, puis la bascule des canonicals, Open Graph, sitemap et `llms.txt` vers ce domaine HTTPS.

---

**Dernière mise à jour** : 2026-06-20
**Version** : 4.1.0
