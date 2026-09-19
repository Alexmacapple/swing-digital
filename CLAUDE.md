# Swing Digital - Mémoire Projet

**Projet** : swing-digital
**Type** : Site vitrine statique multi-pages (HTML/CSS/JS)
**Description** : Site Swing Digital - espaces augmentés, expériences immersives
**Date début** : 2026-02-20
**Auteur** : Alex
**Dépôt** : git@github.com:Alexmacapple/swing-digital.git (SSH)
**Recette** : https://alexmacapple.github.io/swing-digital/ (GitHub Pages, publiée par `scripts/publier-gh-pages.sh`, non référençable)
**Travail et tests** : en local uniquement, sur `localhost`. Ne lancer aucun contrôle contre `swing.appmiweb.com`, ancienne préproduction retirée du tunnel le 2026-09-19.

---

## Contexte

Site vitrine pour Swing Digital, entreprise spécialisée dans les expériences immersives et espaces augmentés. Site découpé en 28 pages HTML top-level, avec une page `/for-ai/` dédiée aux agents, une navigation 3 niveaux et une page 404 personnalisée prête côté HTML. La recette par la cliente se fait sur GitHub Pages ; les métadonnées SEO désignent encore `https://swing.appmiweb.com`, qui ne répond plus. La production finale attend le domaine HTTPS définitif, les mentions légales hébergeur, le scénario Réservations, le routage 404 côté origine et la mesure réelle.

**Architecture** : 4 niveaux de pages
1. Accueil, XR, Espace augmenté, Films, Réservation
2. XR (rubrique 7 projets immersifs) et Films (rubrique audiovisuelle)
3. Pages projet (Monroe, Voyage, Dessine, Marilyn, Toulouse-Lautrec, Charlotte Henschel, XR Corporate, Ni vues ni connues)
4. Sous-pages Monroe (Pièce, Roman Graphique, Installation, Photographie, Composition, Podcasts, Interviews, Expériences, Quiz)

**Pages utilitaires** : 404 hero, Plan du site, Mentions légales

---

## Stack Technique

- HTML5 sémantique (28 pages top-level + `/for-ai/`)
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
├── monroe-photographie.html      Photographie (pages 25-30)
├── monroe-composition.html       Composition (pages 31-32)
├── monroe-podcasts.html          Podcasts (page 33)
├── monroe-interviews.html        Interviews (pages 34-35, vidéos)
├── monroe-experiences.html       Expériences interactives (pages 36-37, vidéo)
├── monroe-quiz.html              Quiz Marilyn (page 38, lien vers le quiz, images des questions)
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
├── sitemap.xml                   Sitemap (28 URL)
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
scripts/publier-gh-pages.sh          # met à jour le site de recette, depuis main propre et poussé
```

Sur une machine chargée, rejouer la suite par `npm test -- --workers=2`. Playwright réutilise un serveur déjà présent sur le port 8080 : arrêter tout serveur qui sert un autre arbre avant de tester. Les commandes `npm run appmiweb:*` interrogent l'ancienne préproduction et ne sont plus à utiliser.

Résultats observés le 2026-09-19 : `npm test` à 619 passés (45 fichiers de test, 5 tailles d'écran), dont deux garde-fous transverses : `tests/t02-medias-entiers.spec.js` (aucune photo rognée de plus de 8 % hors cadrages voulus listés) et `tests/images-espace-colorimetrique.spec.js` (aucun JPEG en CMJN).

Résultats historiques du 2026-06-21 :

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
12. Recomposition des pages d'après les exports de la cliente : l'export est un plan de mise en page, jamais une image à poser ; texte en HTML, photos du site conservées, chaque photo à son ratio natif
13. `object-fit: cover` réservé aux cadrages voulus, listés avec leur raison dans `tests/t02-medias-entiers.spec.js`
14. Recette sur GitHub Pages par une branche `gh-pages` poussée normalement, copie en `noindex` ; jamais de chemin absolu à la racine dans le site
15. Vidéos : Vimeo avec le lecteur piloté par le site quand un lien Vimeo existe, YouTube sans cookie et sans lecture automatique sinon ; aucune transcription automatique publiée sans relecture à l'écoute

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

**Dernière mise à jour** : 2026-09-19
**Version** : 15.0.0 demandes de la cliente (24 issues fermées sur 33 au 2026-09-19, suivi dans l'issue #34), recette GitHub Pages ; historique 14.0.0 : préproduction Satoshi, UI, 404 documentés ; PRD-010 outillé, PRD-011 implémenté ; maillage interne audité ; section usage systématique Loriq/ShipGuard ajoutée

## Loriq et ShipGuard — à utiliser systématiquement

**Loriq** (harnais généré, installé 2026-09-19, source de vérité `.loriq/profile.yml`) :

- Avant d’éditer du code, lire le plan routé : `.loriq/control/task-router.yml`, `.loriq/control/behavior-contract.yml`, `.loriq/control/oracles.yml`, `.loriq/memory/MEMORY.md` et `.loriq/memory/mistakes.md`.
- Toute modification passe par les routes : périmètre scellé, travail borné, oracles rejoués.
- Les comportements `proposed` du behavior-contract attendent la confirmation humaine (cérémonie `runtime/ceremony.py confirm`) avant qu’une tâche bornée ne s’appuie dessus.
- Les artefacts de session hors diff vont sous `.loriq-operator-artifacts/` ; la capture mémoire (`.loriq/memory/**`) est hors bande, jamais dans un arbre routé.

**ShipGuard** (plugin installé pour Claude Code ; variant Codex présent localement) — acte : ShipGuard est fait passer à chaque fois que possible :

- Avant toute modification visible à l’écran : snapshot de référence ; après : snapshot de comparaison (`/sg-visual-run` ; `/sg-visual-discover` pour (re)générer les manifestes par route ; `/sg-change-report` pour la preuve avant/après durable ; `/sg-ship` pour la vérification de bout en bout).
- Ne jamais rapporter un vert de navigateur/test qui n’a pas réellement tourné.
- Lanes navigateur via le CLI local `agent-browser` (sortie sémantique/DOM ; pas de captures PNG sans demande explicite de l’humain).
- Artefacts ShipGuard dans `visual-tests/_results/`.
