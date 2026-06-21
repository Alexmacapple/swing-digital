# Swing Digital - Mémoire Projet

**Projet** : swing-digital
**Type** : Site vitrine statique multi-pages (HTML/CSS/JS)
**Description** : Site Swing Digital - espaces augmentés, expériences immersives
**Date début** : 2026-02-20
**Auteur** : Alex
**Dépôt** : git@github.com:Alexmacapple/swing-digital.git (SSH)
**Préproduction** : https://swing.appmiweb.com

---

## Contexte

Site vitrine pour Swing Digital, entreprise spécialisée dans les expériences immersives et espaces augmentés. Site découpé en 25 pages HTML top-level, avec une page `/for-ai/` dédiée aux agents, une navigation 3 niveaux et une page 404 personnalisée prête côté HTML. La préproduction Appmiweb est techniquement validée ; la production finale attend le domaine HTTPS définitif, les mentions légales hébergeur, le scénario Réservations, le routage 404 côté origine et la mesure réelle.

**Architecture** : 4 niveaux de pages
1. Accueil, XR, Espace augmenté, Films, Réservation
2. XR (rubrique 7 projets immersifs) et Films (rubrique audiovisuelle)
3. Pages projet (Monroe, Voyage, Dessine, Marilyn, Toulouse-Lautrec, Charlotte Henschel, XR Corporate, Ni vues ni connues)
4. Sous-pages Monroe (Pièce, Roman Graphique, Installation, Photographie, Composition, Podcasts, Interviews, Expériences, Quiz)

**Pages utilitaires** : 404 hero, Plan du site, Mentions légales

---

## Stack Technique

- HTML5 sémantique (25 pages top-level + `/for-ai/`)
- CSS3 responsive (variables, BEM, mobile-first, 6 breakpoints)
- JavaScript vanilla (navigation, vidéos, animations)
- Pas de framework ni bundler

## Polices

Satoshi Variable auto-hébergée, avec fallback système.

---

## Structure du site

```
src/
├── index.html                    Accueil (pages 1,2,3,4,8,62)
├── espaces-augmentes.html        Espaces augmentés (pages 5-7)
├── experiences-series.html       Rubrique XR (pages 9-10)
├── films.html                    Rubrique Films
├── experience-monroe.html        Monroe entrée (pages 11-13,24)
├── monroe-piece.html             Pièce My Story (pages 14-19)
├── monroe-roman-graphique.html   Roman Graphique (pages 20-22)
├── monroe-installation.html      Installation (page 23)
├── monroe-photographie.html      Photographie (pages 25-26)
├── monroe-composition.html       Composition (pages 27-32)
├── monroe-podcasts.html          Podcasts (page 33)
├── monroe-interviews.html        Interviews (pages 34-36)
├── monroe-experiences.html       Expériences interactives (pages 37-39)
├── monroe-quiz.html              Quiz Marilyn (pages 40-41)
├── voyage-autour-de-moi.html     Voyage (pages 42-44)
├── dessine-moi-le-vent.html      Dessine-moi le vent (pages 45-47)
├── ni-vues-ni-connues.html       Ni vues ni connues (pages 48-49)
├── marilyn.html                  Marilyn (pages 50-52)
├── toulouse-lautrec.html         Toulouse-Lautrec (pages 53-54)
├── charlotte-henschel.html       Charlotte Henschel (pages 55-56)
├── xr-corporate.html             XR Corporate (page 57)
├── reservations.html             Réservations (pages 58-61)
├── 404.html                      Page introuvable hero
├── plan-du-site.html             Plan du site
├── mentions-legales.html         Mentions légales
├── sitemap.xml                   Sitemap (25 URL)
├── robots.txt                    Robots
├── llms.txt                      Carte optionnelle pour agents IA
├── css/style.css                 Styles (~177 KB)
├── js/main.js                    Scripts (~28 KB)
├── img/                          Images par page
├── fonts/                        Polices web
└── video/                        hero.mp4, contact.mp4
```

---

## Composants communs (dupliqués dans chaque page)

- **Header** : fixe, fond noir, logo texte, menu 5 entrées, dropdown XR, sous-menu Monroe (11 liens), hamburger mobile
- **Fil d'Ariane** : sticky sous le header, fond noir, texte blanc
- **Footer** : fond noir, copyright, liens (Équipe, Contact, Plan du site, Mentions légales)
- **Skip link** : en dur dans le HTML, premier élément du body

---

## Accessibilité - WCAG 2.2 AA / RGAA 4.1

- Dernier audit axe-core complet historique sans violation bloquante ; la suite Playwright actuelle couvre la taxonomie XR / Films et le socle SEO/GEO, pas encore un scan axe-core complet.
- Navigation clavier complète (Tab, Escape, Arrow)
- Disclosure pattern sur dropdown et hamburger
- aria-current="page" sur lien actif et breadcrumb
- h1 sur chaque page (sr-only si pas de titre visible)
- Textes en casse normale, majuscules via CSS (RGAA 10.2)
- prefers-reduced-motion respecté (CSS + JS)
- Contraste conforme AA (blanc sur noir 21:1)
- Intitulés de liens explicites (RGAA 6.1)
- Boutons vidéo avec intitulé identifiant le contenu

---

## Règles CSS strictes

- Zéro couleur codée en dur hors `:root`
- 38+ variables couleur dans :root
- BEM naming sur tous les composants
- text-transform: uppercase pour les majuscules visuelles (pas dans le HTML)
- Breakpoints : 480px, 600px, 768px, 1024px, 1200px, 1441px

## Branche de travail

**Branche active** : main
**Tags** : v1 à v14, dont v12 pour la migration typographique Satoshi, v13 pour le menu XR / Films et v14 pour la synchronisation documentaire
**Branches mergées** : cosmétique, image, decoupage

## Commandes de validation actuelles

```bash
npm test
npm run seo:check
npm run build:prod
npm run appmiweb:preflight
```

Derniers résultats observés le 2026-06-21 :

- `npm test` : OK, suite Playwright versionnée sur la taxonomie XR / Films et le socle SEO/GEO local.
- `npm run seo:check` : OK, `tests/seo-geo.spec.js` sur `desktop-1920`.
- `npm run appmiweb:preflight` : OK avec avertissements attendus sur mentions légales, CTA Réservations et billetterie.
- Contrôle navigateur Satoshi : 25 pages HTML x 3 largeurs, police locale chargée, aucune famille calculée hors Satoshi, aucun débordement horizontal.

---

## Decisions

1. Découpé multi-pages (24 HTML) au lieu de single-page
2. Header/footer fond noir (cohérence, contraste 21:1)
3. Navigation 3 niveaux (menu > dropdown > sous-menu Monroe)
4. Breadcrumb sticky sous le header
5. Pas de framework JS (vanilla uniquement)
6. Chargement conditionnel Vimeo API (guard iframe)
7. CTA Reservation en button aria-disabled (billetterie non définie)
8. Video contact en pause par défaut (play au clic)
9. Satoshi Variable auto-hébergée comme police principale du site
10. Fonds roses adoucis via tokens dédiés, avec contraste texte blanc préservé
11. Page 404 custom prête ; routage des URL inexistantes à configurer côté origine

---

## Qualité responsive et code (audit Codex 2026-04-06)

**Score historique : 9/10**. Le placeholder `DOMAINE` a depuis été remplacé en préproduction par `https://swing.appmiweb.com`. Le 10/10 production finale dépend maintenant du domaine final, des mentions légales hébergeur, du scénario Réservations, de la mesure SEO/GEO et du LCP accueil.

Corrections appliquees (9 commits) :
- Fix scroll horizontal iPhone logos partenaires (bug WebKit grid + aspect-ratio + flex)
- Safe-area complet sur tous les elements absolus (hero, back-to-top, bouton play, credits)
- Scrollbar masquee, menus scrollables, seuil tactile 44px
- Flip automatique sous-menu niveau 3 si debordement viewport
- Promesse video.play() geree pour iOS
- Nettoyage CSS mort (-189 lignes), variables inutilisees, doublons
- Cache-buster CSS sur les 24 pages
- Iframes Vimeo avec & echappes en &amp;

---

## SEO/GEO production

Le PRD de référence est `prd-meta-workflow/PRD-001-seo-geo-production.MD`.

Décision actuelle :

1. Ne pas installer la mesure définitive sur une URL de préproduction si le domaine final change.
2. Activer GSC, GA4/GTM, Bing Webmaster Tools et le suivi sources IA au go-live.
3. Optimiser le LCP de l'accueil sur le domaine final.
4. Publier une politique crawlers IA propriétaire après décision explicite.

## PRD récents

- `prd-meta-workflow/PRD-007-migration-typographique-satoshi.MD` : migration typographique Satoshi.
- `prd-meta-workflow/PRD-008-fonds-roses-adoucis.MD` : remplacement ciblé des grands fonds rouges.
- `prd-meta-workflow/PRD-009-routage-404-personnalisee.MD` : routage serveur de la page 404 personnalisée.
- `prd-meta-workflow/PRD-010-transcripts-videos-accessibles.MD` : transcripts accessibles des vidéos publiques, outillage local ajouté, publication à finaliser.
- `prd-meta-workflow/PRD-011-menu-decoupage-xr-films.MD` : séparation éditoriale XR / Films implémentée.
- `docs/404-CUSTOM-ERROR-PAGE.md` : recettes Apache, Nginx, serveur statique Python et Cloudflare Worker.

---

**Dernière mise à jour** : 2026-06-21
**Version** : 14.0.0 préproduction Satoshi, UI, 404 documentés ; PRD-010 outillé, PRD-011 implémenté ; maillage interne audité
