# PRD : Découpage multi-pages - Swing Digital

**Statut : TERMINE** (merge sur main, tag v4, branche decoupage supprimee)

> Mise à jour 2026-06-20 : ce PRD décrit la décision historique de découpage multi-pages. L'état courant ajoute une préproduction SEO/GEO sur `https://swing.appmiweb.com`, un build public `dist/` et le PRD-001 pour les chantiers de production.

## État courant au 2026-06-20

- Les 24 pages HTML existent toujours dans `src/`.
- Les 23 pages indexables sont présentes dans `sitemap.xml`.
- La préproduction Appmiweb sert les 23 URL du sitemap en HTTP 200.
- Les canonicals, Open Graph, sitemap, robots et `llms.txt` pointent vers `https://swing.appmiweb.com`.
- La production finale nécessite une bascule via `npm run seo:set-base -- https://domaine-final`.
- Les chantiers GSC, GA4/GTM, Bing Webmaster Tools, LCP final et politique crawlers IA sont cadrés dans `prd-meta-workflow/PRD-001-seo-geo-production.MD`.

## Contexte

Le site etait un single-page (`index.html`, 62 sections/pages). Le menu de navigation existait sur la page 1 mais n'etait pas persistant.

**Objectif** : Decouper le site en plusieurs pages HTML avec navigation 3 niveaux, header/footer communs, fil d'Ariane, menu hamburger mobile, RGAA accessible.

**Resultat** : 24 pages HTML, navigation 3 niveaux, 0 violation axe-core, audit 83/100

**Règle absolue** : Ne rien casser de l'existant. Découper et améliorer, jamais rétrograder. Chaque page après découpage doit être visuellement identique à la section correspondante dans le single-page actuel.

---

## Architecture navigation (3 niveaux)

### Niveau 1 : Menu principal (header persistant)
Accueil | Espaces augmentés | Expériences Séries | Réservations

- Header fixe en haut sur toutes les pages
- Le hero (page 1) commence SOUS le header
- Fond coloré sur le header (pas transparent)
- UN SEUL MENU sur tout le site (l'ancien `.hero-page1__nav` est supprimé)
- Toutes les traces de l'ancien menu (boutons rouges hero) disparaissent

### Niveau 2 : Pages projet (dans Expériences Séries)
8 projets cliquables depuis la page rubrique (pages 9-10)
- Sous-menu dropdown accessible avec les 8 projets
- Visible quand on est dans la section Expériences Séries

### Niveau 3a : Volets Monroe (dans L'Expérience Monroe)
Page 13 = rubrique avec 5 cartes cliquables :
1. Pièce My Story → `monroe-piece.html`
2. Roman Graphique → `monroe-roman-graphique.html`
3. Installation → `monroe-installation.html`
4. XR Memory Box → lien croisé vers `xr-corporate.html` (projet 8)
5. Série Marilyn → lien croisé vers `marilyn.html` (projet 5)

### Niveau 3b : Catégories Monroe (dans L'Expérience Monroe)
Page 24 = rubrique avec 6 catégories cliquables :
A Photographie | B Composition électroacoustique | C Podcasts | D Interviews | E Expériences interactives | F Le Quiz Marilyn

### État actif du menu
- Mécanisme : attribut `data-section` et `data-page` sur `<body>`
- Le JS lit ces attributs et applique l'état actif
- **Pas seulement la couleur** : état `aria-current="page"` sur le lien actif + surbrillance visuelle (bordure)
- Pattern ARIA menu accessible conforme WAI-ARIA APG

#### Valeurs `data-section` par fichier

| Fichier HTML | `data-section` | `data-page` |
|-------------|----------------|-------------|
| `index.html` | `accueil` | `accueil` |
| `espaces-augmentes.html` | `espaces` | `espaces` |
| `experiences-series.html` | `experiences` | `rubrique` |
| `experience-monroe.html` | `experiences` | `monroe` |
| `monroe-piece.html` | `experiences` | `monroe-piece` |
| `monroe-roman-graphique.html` | `experiences` | `monroe-roman-graphique` |
| `monroe-installation.html` | `experiences` | `monroe-installation` |
| `monroe-photographie.html` | `experiences` | `monroe-photographie` |
| `monroe-composition.html` | `experiences` | `monroe-composition` |
| `monroe-podcasts.html` | `experiences` | `monroe-podcasts` |
| `monroe-interviews.html` | `experiences` | `monroe-interviews` |
| `monroe-experiences.html` | `experiences` | `monroe-experiences` |
| `monroe-quiz.html` | `experiences` | `monroe-quiz` |
| `voyage-autour-de-moi.html` | `experiences` | `voyage` |
| `dessine-moi-le-vent.html` | `experiences` | `dessine` |
| `ni-vues-ni-connues.html` | `experiences` | `ni-vues` |
| `marilyn.html` | `experiences` | `marilyn` |
| `toulouse-lautrec.html` | `experiences` | `toulouse-lautrec` |
| `charlotte-henschel.html` | `experiences` | `charlotte-henschel` |
| `xr-corporate.html` | `experiences` | `xr-corporate` |
| `reservations.html` | `reservations` | `reservations` |
| `404.html` | `erreur` | `404` |

### Fil d'Ariane (RGAA)
Conforme WAI-ARIA APG Breadcrumb Pattern (https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

- Visible sur TOUTES les pages (y compris accueil = juste "Accueil")
- Ex niveau 3 : `Accueil > Expériences Séries > L'Expérience Monroe > Podcasts`
- Pas de navigation inter-projets (Précédent/Suivant)

**Structure HTML conforme W3C APG** :
```html
<!-- role="navigation" explicite sur <nav> : redondant W3C mais requis RGAA 4.1 pour compatibilité AT (cf. justification section Accessibilité RGAA) -->
<nav role="navigation" aria-label="Fil d'Ariane">
  <ol class="breadcrumb__list">
    <li class="breadcrumb__item"><a href="index.html">Accueil</a></li>
    <li class="breadcrumb__item"><a href="experiences-series.html">Expériences Séries</a></li>
    <li class="breadcrumb__item"><a href="experience-monroe.html">L'Expérience Monroe</a></li>
    <li class="breadcrumb__item"><a href="monroe-podcasts.html" aria-current="page">Podcasts</a></li>
  </ol>
</nav>
```

**Règles** :
- `<nav>` avec `aria-label="Fil d'Ariane"` (crée un landmark de navigation)
- Liste ordonnée `<ol>` (pas `<ul>` — l'ordre hiérarchique compte)
- `aria-current="page"` sur le **dernier lien** (page courante)
- Séparateurs visuels (`>`) ajoutés **en CSS** (`::before` ou `::after`) — pas dans le HTML (sinon annoncés par les lecteurs d'écran)
- Pas d'interaction clavier spécifique requise (les liens sont nativement tabulables)
- Chaque lien du fil d'Ariane est un vrai `<a>` fonctionnel (pas un `<span>`)

### Contenu du fil d'Ariane par page

| Fichier HTML | Fil d'Ariane |
|-------------|-------------|
| `index.html` | Accueil |
| `espaces-augmentes.html` | Accueil > Espaces augmentés |
| `experiences-series.html` | Accueil > Expériences Séries |
| `experience-monroe.html` | Accueil > Expériences Séries > L'Expérience Monroe |
| `monroe-piece.html` | Accueil > Expériences Séries > L'Expérience Monroe > Pièce My Story |
| `monroe-roman-graphique.html` | Accueil > Expériences Séries > L'Expérience Monroe > Roman Graphique |
| `monroe-installation.html` | Accueil > Expériences Séries > L'Expérience Monroe > Installation |
| `monroe-photographie.html` | Accueil > Expériences Séries > L'Expérience Monroe > Photographie |
| `monroe-composition.html` | Accueil > Expériences Séries > L'Expérience Monroe > Composition électroacoustique |
| `monroe-podcasts.html` | Accueil > Expériences Séries > L'Expérience Monroe > Podcasts |
| `monroe-interviews.html` | Accueil > Expériences Séries > L'Expérience Monroe > Interviews |
| `monroe-experiences.html` | Accueil > Expériences Séries > L'Expérience Monroe > Expériences interactives |
| `monroe-quiz.html` | Accueil > Expériences Séries > L'Expérience Monroe > Le Quiz Marilyn |
| `voyage-autour-de-moi.html` | Accueil > Expériences Séries > Voyage autour de moi |
| `dessine-moi-le-vent.html` | Accueil > Expériences Séries > Dessine-moi le vent |
| `ni-vues-ni-connues.html` | Accueil > Expériences Séries > Ni vues ni connues |
| `marilyn.html` | Accueil > Expériences Séries > Marilyn |
| `toulouse-lautrec.html` | Accueil > Expériences Séries > Toulouse-Lautrec |
| `charlotte-henschel.html` | Accueil > Expériences Séries > Charlotte Henschel |
| `xr-corporate.html` | Accueil > Expériences Séries > XR Corporate |
| `reservations.html` | Accueil > Réservations |
| `404.html` | Accueil > Page introuvable |

Chaque segment est un lien `<a>` sauf le dernier qui porte `aria-current="page"`.

### Sous-menu dropdown Expériences Séries
Conforme AcceDe Web (https://www.accede-web.com/notices/interface-riche/menu-deroulant/)

**Structure HTML** :
- `<nav role="navigation" aria-label="Menu principal">` comme conteneur (cf. politique RGAA rôles explicites)
- Listes imbriquées `<ul>` / `<li>` pour les boutons niveau 1 et liens sous-menu
- Chaque élément niveau 1 avec sous-menu = `<button>` (pas `<a>`)
- `aria-expanded="false"` sur chaque bouton ayant un sous-menu
- `aria-expanded="true"` quand le sous-menu est ouvert
- PAS de `aria-haspopup` (réservé au pattern `role="menu"` des menus applicatifs, pas pour la navigation web — cf. Orange a11y guidelines)
- `aria-current="page"` sur le lien de la page active

**Comportement** :
- S'ouvre au **clic uniquement** (pas de hover) — plus accessible
- Fermé par défaut même quand on est sur une page projet
- Sur mobile : le dropdown devient une liste imbriquée dans le hamburger

**Interactions clavier** :
- Tab : navigue vers le bouton du menu
- Enter/Space : ouvre/ferme le sous-menu quand le focus est sur le bouton
- Flèche bas : ouvre le sous-menu et déplace le focus sur le premier item
- Flèche haut/bas : déplace le focus entre les items du sous-menu
- Home/End (optionnel) : premier/dernier item du sous-menu
- Escape : ferme le sous-menu ouvert ET remet le focus sur le bouton déclencheur
- Le sous-menu se ferme quand le focus le quitte (pas besoin de chercher un bouton fermer)

**Masquage** :
- Sous-menu fermé = `display: none` ou `visibility: hidden` (invisible pour les lecteurs d'écran)
- Ne PAS utiliser `opacity: 0` ou `transform` seuls (resterait accessible aux AT)

**Visuel** :
- Focus clavier clairement visible (outline 2px minimum, contraste 3:1 vs fond)
- Contraste texte du dropdown conforme WCAG AA (4.5:1 normal, 3:1 large)

**Focus management** :
- Fermeture Escape → focus retourne sur le bouton qui a ouvert le sous-menu
- Fermeture par perte de focus → sous-menu se ferme automatiquement

### Menu hamburger mobile
- Breakpoint : **1024px** (les 4 boutons + logo ne tiennent pas en dessous)
- RGAA accessible : `aria-expanded`, focus trap, Escape, clic extérieur ferme
- Navigation clavier complète (Tab, Shift+Tab, Enter, Escape)
- Pattern ARIA disclosure : `<button aria-expanded="false" aria-controls="main-menu">`
- Le sous-menu projets devient une liste imbriquée dans le hamburger

### Wireframe header

```
DESKTOP (> 1024px)
┌─────────────────────────────────────────────────────────────────┐
│ |SWING|  [Accueil] [Espaces augmentés] [Expériences ▼] [Réserv.]│
│ |DIGIT|                                 └─ dropdown 8 projets   │
├─────────────────────────────────────────────────────────────────┤
│ Accueil > Expériences Séries > L'Expérience Monroe              │
└─────────────────────────────────────────────────────────────────┘

MOBILE (≤ 1024px)
┌─────────────────────────────────────────────────────────────────┐
│ |SWING DIGITAL|                                            [☰]  │
├─────────────────────────────────────────────────────────────────┤
│ Accueil > Expériences                                           │
└─────────────────────────────────────────────────────────────────┘
```

### Skip link
- Directement dans le HTML de chaque page (pas généré en JS)
- Premier élément du `<body>` : `<a href="#main-content" class="skip-link">Aller au contenu principal</a>`
- Pattern RGAA accessible

---

## Mapping vignettes

### Page 9 (4 vignettes)

| Vignette | Projet | Lien |
|----------|--------|------|
| 1 | L'Expérience Monroe | `experience-monroe.html` |
| 2 | Voyage autour de moi | `voyage-autour-de-moi.html` |
| 3 | Dessine-moi le vent | `dessine-moi-le-vent.html` |
| 4 | Ni vues ni connues | `ni-vues-ni-connues.html` |

### Page 10 (4 vignettes)

| Vignette | Projet | Lien |
|----------|--------|------|
| 5 | Marilyn | `marilyn.html` |
| 6 | Toulouse-Lautrec | `toulouse-lautrec.html` |
| 7 | Charlotte Henschel | `charlotte-henschel.html` |
| 8 | XR Corporate | `xr-corporate.html` |

---

## Découpage des pages

### 1. Accueil (`index.html`)

| Page PDF | Contenu |
|----------|---------|
| 1 | Hero (vidéo) — sans l'ancien menu (supprimé) |
| 2 | Qui sommes nous (équipe) |
| 3 | Swing Digital (créations) |
| 4 | Créations (inversée) |
| 8 | Partenaires (logos) |
| 62 | Contact |

### 2. Espaces augmentés (`espaces-augmentes.html`)

| Page PDF | Contenu |
|----------|---------|
| 5 | Espaces augmentés |
| 6 | Réalité mixte / Théâtre |
| 7 | Image pleine page |

### 3. Expériences Séries

#### Page rubrique (`experiences-series.html`)

| Page PDF | Contenu |
|----------|---------|
| 9 | Grille 4 vignettes projets 1-4 (cliquables) |
| 10 | Grille 4 vignettes projets 5-8 (cliquables) |

#### Projet 1 : L'Expérience Monroe

**Page d'entrée** (`experience-monroe.html`) : pages PDF 11-13, 24

- Page 11 : Vidéo présentation
- Page 12 : Affiche presse + logos
- Page 13 : Rubrique 5 volets (cartes cliquables — volets 4 et 5 = liens croisés)
- Page 24 : Rubrique 6 catégories A-F (cartes cliquables vers sous-pages)

**3 volets (niveau 3a)** — pages HTML séparées :

| Volet | Nom | Pages PDF | Fichier HTML |
|-------|-----|-----------|--------------|
| 1 | Pièce My Story | 14-19 | `monroe-piece.html` |
| 2 | Roman Graphique | 20-22 | `monroe-roman-graphique.html` |
| 3 | Installation | 23 | `monroe-installation.html` |

Volets 4 (XR Memory Box) et 5 (Série Marilyn) = liens croisés vers `xr-corporate.html` et `marilyn.html` (pas de pages dédiées).

**6 catégories (niveau 3b)** — pages HTML séparées :

| Cat. | Nom | Pages PDF | Fichier HTML |
|------|-----|-----------|--------------|
| A | Photographie | 25-26 | `monroe-photographie.html` |
| B | Composition électroacoustique | 27-32 | `monroe-composition.html` |
| C | Podcasts | 33 | `monroe-podcasts.html` |
| D | Interviews | 34-36 | `monroe-interviews.html` |
| E | Expériences interactives | 37-39 | `monroe-experiences.html` |
| F | Le Quiz Marilyn | 40-41 | `monroe-quiz.html` |

#### Projet 2 : Voyage autour de moi (`voyage-autour-de-moi.html`)
Pages PDF 42-44

#### Projet 3 : Dessine-moi le vent (`dessine-moi-le-vent.html`)
Pages PDF 45-47

#### Projet 4 : Ni vues ni connues (`ni-vues-ni-connues.html`)
Pages PDF 48-49

#### Projet 5 : Marilyn (`marilyn.html`)
Pages PDF 50-52

#### Projet 6 : Toulouse-Lautrec (`toulouse-lautrec.html`)
Pages PDF 53-54

#### Projet 7 : Charlotte Henschel (`charlotte-henschel.html`)
Pages PDF 55-56

#### Projet 8 : XR Corporate (`xr-corporate.html`)
Page PDF 57

### 4. Réservations (`reservations.html`)

| Page PDF | Contenu |
|----------|---------|
| 58 | Réservation XR - Toulouse-Lautrec |
| 59 | Réservation XR - Marilyn |
| 60 | Ce qui est inclus |
| 61 | Questions fréquentes / Visites privées |

---

## Commentaires HTML

Chaque section conserve un commentaire indiquant la page PDF d'origine :
```html
<!-- Page PDF 11 -->
<section id="page-11" ...>
```

---

## Structure des fichiers cible

```
src/
├── index.html                    (Accueil : pages 1,2,3,4,8,62)
├── espaces-augmentes.html        (pages 5,6,7)
├── experiences-series.html       (pages 9,10 - rubrique)
├── experience-monroe.html        (pages 11-13,24 - entrée projet)
├── monroe-piece.html             (pages 14-19)
├── monroe-roman-graphique.html   (pages 20-22)
├── monroe-installation.html      (page 23)
├── monroe-photographie.html      (pages 25-26)
├── monroe-composition.html       (pages 27-32)
├── monroe-podcasts.html          (page 33)
├── monroe-interviews.html        (pages 34-36)
├── monroe-experiences.html       (pages 37-39)
├── monroe-quiz.html              (pages 40-41)
├── voyage-autour-de-moi.html     (pages 42-44)
├── dessine-moi-le-vent.html      (pages 45-47)
├── ni-vues-ni-connues.html       (pages 48-49)
├── marilyn.html                  (pages 50-52)
├── toulouse-lautrec.html         (pages 53-54)
├── charlotte-henschel.html       (pages 55-56)
├── xr-corporate.html             (page 57)
├── reservations.html             (pages 58-61)
├── 404.html                      (page erreur)
├── sitemap.xml
├── robots.txt
├── css/style.css
├── js/main.js
├── img/...
└── video/...
```

Total : **21 fichiers HTML** + `404.html` + `sitemap.xml` + `robots.txt`

---

## Phases d'implémentation

### Phase 1 : Header + Footer + Hamburger
- Supprimer l'ancien menu `.hero-page1__nav` du hero
- Créer le header persistant avec balises HTML5 sémantiques (`<header>`, `<nav>`)
- Logo texte (comme actuellement) cliquable vers index.html
- Menu 4 sections avec pattern ARIA disclosure (pas menubar)
- Sous-menu dropdown Expériences Séries (8 projets) avec `aria-expanded` (pas de `aria-haspopup`)
- Fil d'Ariane `<nav aria-label="Fil d'Ariane">`
- Skip link en dur dans le HTML
- `data-section` sur `<body>` pour l'état actif
- Variable CSS `--header-height` + `padding-top` sur `#main-content`
- `--section-height: calc(100vh - var(--header-height))` pour éviter les sections cachées
- CSS header (position fixed, z-index 1000, fond coloré, responsive)
- JS hamburger (toggle, focus trap, Escape, clic extérieur)
- Breakpoint hamburger : 1024px
- Créer le footer commun
- Tester sur index.html avant de dupliquer

### Phase 2 : Découpage niveau 1 — 4 pages principales
- Découper `index.html` en : `index.html`, `espaces-augmentes.html`, `experiences-series.html`, `reservations.html`
- Dupliquer header/footer dans chaque page
- Mettre à jour les liens internes — toujours en chemin relatif complet
- Refaire les ancres internes par page
- Ajouter les commentaires `<!-- Page PDF N -->`
- SEO : title + meta description + canonical + Open Graph par page
- Fil d'Ariane niveau 1
- Commit après chaque page créée

### Phase 3 : Découpage niveau 2 — 8 pages projet
- Extraire les 8 projets depuis les sections concernées
- Câbler les vignettes pages 9/10 vers les fichiers projet
- Fil d'Ariane niveau 2 (Accueil > Expériences Séries > Projet)
- SEO + Open Graph par page projet
- Commit par lot de 2-3 projets

### Phase 4 : Découpage niveau 3 — 9 sous-pages Monroe
- Extraire les sous-pages de `experience-monroe.html`
- Câbler les cartes pages 13/24 vers les sous-pages
- Liens croisés volets 4/5 vers marilyn.html et xr-corporate.html
- Fil d'Ariane niveau 3
- SEO + Open Graph par sous-page
- Commit par sous-page

### Phase 5 : Liens, sitemap, 404, vérification finale
- Mettre à jour TOUS les liens internes entre pages (chemin relatif)
- Vérifier chaque fil d'Ariane
- Vérifier chaque état actif du menu
- Créer `404.html` (header/footer communs, plan du site, RGAA)
- Ajouter le script de redirection des ancres orphelines dans `index.html`
- Générer `sitemap.xml` (conforme spécification)
- Créer et exécuter `check-site.sh` (tests automatisés)
- Test responsive 4 viewports (1920, 1024, 768, 375px)
- Test accessibilité RGAA (navigation clavier, lecteur écran)
- Lighthouse sur chaque page

---

## Décisions techniques

### HTML

| Décision | Choix | Raison |
|----------|-------|--------|
| Ancien menu hero | Supprimé | Un seul menu persistant sur tout le site |
| État actif | `data-section` sur `<body>` | Simple, pas de JS complexe, chaque HTML sait sa section |
| Sous-menu projets | Dropdown disclosure pattern (pas menubar) | Conforme AcceDe Web + Orange a11y. Navigation clavier + lecteur écran + pas seulement la couleur |
| Skip link | En dur dans le HTML | Bonnes pratiques RGAA (pas de dépendance JS) |
| Logo header | Texte (comme actuellement) | Changement possible plus tard |
| Liens footer | Chemin relatif complet | `index.html#page-2` partout (pas de condition) |
| Balises sémantiques | `<header>`, `<nav>`, `<main>`, `<footer>` | HTML5 + zones ARIA landmarks |

### CSS

| Décision | Choix | Raison |
|----------|-------|--------|
| Section height | `calc(100vh - var(--header-height))` | Compense le header fixe, pas de contenu caché |
| Hamburger breakpoint | 1024px | 4 boutons + logo ne tiennent pas en dessous |
| CSS unique | Un seul `style.css` | Simple, mis en cache. Commentaires pour les styles orphelins |
| BEM naming | Classes BEM `.site-header`, `.site-nav`, `.breadcrumb` | Ciblage CSS par classes, ARIA pour l'accessibilité uniquement |
| Variable header | `--header-height` | Utilisée pour padding-top et calc section-height |

### JS

| Décision | Choix | Raison |
|----------|-------|--------|
| Vimeo API | Chargé conditionnellement | Guard JS : chargé uniquement si `document.querySelector('iframe[src*="vimeo"]')` existe sur la page. Évite un chargement réseau inutile sur les ~17 pages sans vidéo |
| Scroll tracking | Conservé | Utile même sur les petites pages (3-4 sections) |
| Scroll reveal | Conservé tel quel | Guards existants suffisent |
| Guards | `if (!element) return` | Fonctions spécifiques ne s'exécutent que si l'élément existe |
| Skip link | Suppression `addSkipLink()` JS | Passe en HTML statique (pas de dépendance JS) |
| Hamburger | Ajout `initHamburger()` | Toggle, focus trap, Escape, clic extérieur |

### Chemins relatifs
Tous les fichiers HTML dans `src/` — chemins `css/`, `js/`, `img/` identiques pour toutes les pages.

---

## Nouveaux CSS à créer

Convention CSS : ciblage par **classes BEM** (`.site-header`, `.site-nav`, etc.), pas par sélecteurs d'attributs ARIA. Les attributs ARIA sont pour l'accessibilité, pas pour le CSS.

```css
:root {
    --header-height: 60px;
    --section-height: calc(100vh - var(--header-height));
}

/* Header fixe */
.site-header {
    position: fixed;
    top: 0;
    width: 100%;
    max-width: var(--page-max-width);
    z-index: 1000;
    background-color: var(--color-brand-btn);
}

/* Navigation principale */
.site-nav { ... }
.site-nav__list { ... }
.site-nav__item { ... }
.site-nav__link { ... }
.site-nav__link--active { font-weight: 900; border-bottom: 3px solid var(--color-white); }

/* Sous-menu dropdown (clic uniquement) */
.site-nav__submenu { display: none; }
.site-nav__submenu--open { display: block; }
.site-nav__submenu-item { ... }

/* Hamburger mobile (≤ 1024px) */
.site-nav__burger { display: none; }
@media (max-width: 1024px) {
    .site-nav__burger { display: flex; }
    .site-nav__list { display: none; }
    .site-nav__list--open { display: flex; flex-direction: column; }
    .site-nav__submenu--open { display: block; } /* liste imbriquée */
}

/* Fil d'Ariane */
.breadcrumb { ... }
.breadcrumb__list { ... }
.breadcrumb__item { ... }
.breadcrumb__item + .breadcrumb__item::before { content: ">"; /* séparateur visuel en CSS, pas dans le HTML */ }

/* Skip link (masqué sauf au focus) */
.skip-link {
    position: absolute;
    top: -100%;
    left: 0;
    z-index: 1001; /* au-dessus du header */
}
.skip-link:focus {
    top: 0;
    background: var(--color-brand-btn);
    color: var(--color-white);
    padding: 0.5rem 1rem;
}

/* Compensation header fixe */
#main-content { padding-top: var(--header-height); }
```

Les attributs ARIA (`aria-current`, `aria-expanded`) restent sur le HTML pour l'accessibilité mais ne sont PAS utilisés comme sélecteurs CSS.

---

## Éléments communs

### Header (toutes les pages)
- Skip link en dur dans le HTML (premier élément du `<body>`)
- Logo Swing Digital texte, cliquable (retour index.html), avec `aria-label="Swing Digital - Accueil"`
- Menu 4 sections avec pattern disclosure + `aria-current="page"` (pas de menubar)
- Sous-menu dropdown 8 projets (dans Expériences Séries) avec `aria-expanded`
- Menu hamburger mobile ≤ 1024px (focus trap, Escape, clic extérieur)
- Header fixe, contenu passe SOUS le header via `padding-top`
- Dupliqué dans chaque fichier HTML

### Fil d'Ariane (toutes les pages)
- Placé **entre** `</header>` et `<main>` (pas à l'intérieur du `<header>` — cf. template section Accessibilité RGAA)
- Visible partout (y compris accueil = juste "Accueil")
- Dupliqué dans chaque fichier HTML

### Footer (toutes les pages)
Conforme AcceDe Web (https://www.accede-web.com/notices/html-et-css/structure-generale/structurer-les-informations-relatives-au-site-avec-footer-rolecontentinfo/)

- `<footer role="contentinfo">` — **un seul** `role="contentinfo"` par page
- Liens en liste `<ul>` / `<li>` : Équipe (`index.html#page-2`), Contact (`mailto:`), Mentions légales (`#`)
- Copyright dans `<p>`
- Chemin relatif complet pour tous les liens
- Dupliqué dans chaque fichier HTML

```html
<footer role="contentinfo">
    <p>&copy; 2026 Swing Digital. Tous droits réservés.</p>
    <nav role="navigation" aria-label="Navigation secondaire">
        <ul>
            <li><a href="index.html#page-2">Équipe</a></li>
            <li><a href="mailto:PRODUCTION@SWINGDIGITALPRODUCTION.COM">Contact</a></li>
            <li><a href="#">Mentions légales</a></li>
        </ul>
    </nav>
</footer>
```

**Règles footer** :
- `aria-label="Navigation secondaire"` (plus spécifique que « Navigation footer »)
- `role="navigation"` explicite sur `<nav>` (recommandé AcceDe Web pour compatibilité AT — cf. section Accessibilité RGAA)

---

## SEO et Open Graph

Chaque page HTML a :
- `<html lang="fr">` (obligatoire RGAA critère 8.3)
- `<meta charset="UTF-8">`
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- `<title>` unique (ex: "L'Expérience Monroe - Swing Digital")
- `<meta name="description">` unique
- `<link rel="canonical">`
- `<meta property="og:title">` (= title)
- `<meta property="og:description">` (= description)
- `<meta property="og:image">` (image de couverture du projet/section)
- `<meta property="og:type" content="website">`
- `<meta property="og:url">` (= canonical)
- `<link rel="icon" href="img/favicon.ico">` (favicon du site)

### Title et description par page

| Fichier HTML | `<title>` | `<meta name="description">` |
|-------------|-----------|------------------------------|
| `index.html` | Swing Digital - Espaces augmentés, expériences immersives | Swing Digital conçoit des espaces augmentés et des expériences immersives mêlant art, technologie et narration. |
| `espaces-augmentes.html` | Espaces augmentés - Swing Digital | Découvrez nos espaces augmentés : réalité mixte, théâtre immersif et installations interactives. |
| `experiences-series.html` | Expériences Séries - Swing Digital | Explorez nos 8 projets d'expériences immersives : Monroe, Voyage autour de moi, Dessine-moi le vent et plus. |
| `experience-monroe.html` | L'Expérience Monroe - Swing Digital | L'Expérience Monroe : une création immersive en 5 volets mêlant théâtre, roman graphique, installation et XR. |
| `monroe-piece.html` | Pièce My Story - L'Expérience Monroe - Swing Digital | Pièce de théâtre immersive My Story, volet 1 de L'Expérience Monroe par Swing Digital. |
| `monroe-roman-graphique.html` | Roman Graphique - L'Expérience Monroe - Swing Digital | Roman graphique interactif, volet 2 de L'Expérience Monroe par Swing Digital. |
| `monroe-installation.html` | Installation - L'Expérience Monroe - Swing Digital | Installation artistique immersive, volet 3 de L'Expérience Monroe par Swing Digital. |
| `monroe-photographie.html` | Photographie - L'Expérience Monroe - Swing Digital | Photographies de L'Expérience Monroe : portraits, scènes et ambiances immersives. |
| `monroe-composition.html` | Composition électroacoustique - L'Expérience Monroe - Swing Digital | Composition électroacoustique originale créée pour L'Expérience Monroe. |
| `monroe-podcasts.html` | Podcasts - L'Expérience Monroe - Swing Digital | Podcasts autour de L'Expérience Monroe : entretiens, coulisses et réflexions. |
| `monroe-interviews.html` | Interviews - L'Expérience Monroe - Swing Digital | Interviews des artistes et créateurs de L'Expérience Monroe. |
| `monroe-experiences.html` | Expériences interactives - L'Expérience Monroe - Swing Digital | Expériences interactives numériques autour de L'Expérience Monroe. |
| `monroe-quiz.html` | Le Quiz Marilyn - L'Expérience Monroe - Swing Digital | Quiz interactif Marilyn Monroe : testez vos connaissances sur l'icône. |
| `voyage-autour-de-moi.html` | Voyage autour de moi - Swing Digital | Voyage autour de moi : expérience immersive introspective par Swing Digital. |
| `dessine-moi-le-vent.html` | Dessine-moi le vent - Swing Digital | Dessine-moi le vent : installation immersive poétique par Swing Digital. |
| `ni-vues-ni-connues.html` | Ni vues ni connues - Swing Digital | Ni vues ni connues : expérience immersive par Swing Digital. |
| `marilyn.html` | Marilyn - Swing Digital | Marilyn : série immersive dédiée à l'icône, par Swing Digital. |
| `toulouse-lautrec.html` | Toulouse-Lautrec - Swing Digital | Toulouse-Lautrec : expérience immersive autour de l'artiste, par Swing Digital. |
| `charlotte-henschel.html` | Charlotte Henschel - Swing Digital | Charlotte Henschel : portrait immersif par Swing Digital. |
| `xr-corporate.html` | XR Corporate - Swing Digital | XR Corporate : expériences en réalité étendue pour entreprises par Swing Digital. |
| `reservations.html` | Réservations - Swing Digital | Réservez votre expérience immersive XR : Toulouse-Lautrec, Marilyn et plus. |
| `404.html` | Page introuvable - Swing Digital | La page demandée n'existe pas. Retrouvez votre chemin sur le site Swing Digital. |

---

## Performance

Gain attendu du découpage :
- Actuellement : 62 sections, ~174 images (108 Mo) chargées en un seul fichier HTML
- Après : chaque page ne charge que ses images (3-15 images selon la page)
- LCP mobile devrait passer de ~3s à < 1.5s sur les petites pages
- Le CSS reste unique (mis en cache après la 1ere page visitée)

---

## Migration et compatibilité

### Anciennes URLs et migration des ancres

Les anciennes ancres `#page-N` du single-page ne seront plus valides après découpage. Stratégie de migration :

1. **Mapping de redirection** : `index.html` conserve un script léger qui intercepte les ancres orphelines (`#page-11`, `#page-42`, etc.) et redirige vers la bonne page HTML
2. **Script de mapping** (dans `main.js`) :
   ```js
   // Redirection des ancres orphelines (ex-single-page)
   // Exécuté uniquement sur index.html (guard data-page === 'accueil')
   // Couvre les 56 pages PDF redirigées (pages 1-4, 8, 62 restent sur index.html)
   const anchorRedirects = {
       // Espaces augmentés (pages 5-7)
       'page-5': 'espaces-augmentes.html',
       'page-6': 'espaces-augmentes.html',
       'page-7': 'espaces-augmentes.html',
       // Expériences Séries rubrique (pages 9-10)
       'page-9': 'experiences-series.html',
       'page-10': 'experiences-series.html',
       // Expérience Monroe entrée (pages 11-13, 24)
       'page-11': 'experience-monroe.html',
       'page-12': 'experience-monroe.html',
       'page-13': 'experience-monroe.html',
       'page-24': 'experience-monroe.html',
       // Monroe - Pièce My Story (pages 14-19)
       'page-14': 'monroe-piece.html',
       'page-15': 'monroe-piece.html',
       'page-16': 'monroe-piece.html',
       'page-17': 'monroe-piece.html',
       'page-18': 'monroe-piece.html',
       'page-19': 'monroe-piece.html',
       // Monroe - Roman Graphique (pages 20-22)
       'page-20': 'monroe-roman-graphique.html',
       'page-21': 'monroe-roman-graphique.html',
       'page-22': 'monroe-roman-graphique.html',
       // Monroe - Installation (page 23)
       'page-23': 'monroe-installation.html',
       // Monroe - Photographie (pages 25-26)
       'page-25': 'monroe-photographie.html',
       'page-26': 'monroe-photographie.html',
       // Monroe - Composition (pages 27-32)
       'page-27': 'monroe-composition.html',
       'page-28': 'monroe-composition.html',
       'page-29': 'monroe-composition.html',
       'page-30': 'monroe-composition.html',
       'page-31': 'monroe-composition.html',
       'page-32': 'monroe-composition.html',
       // Monroe - Podcasts (page 33)
       'page-33': 'monroe-podcasts.html',
       // Monroe - Interviews (pages 34-36)
       'page-34': 'monroe-interviews.html',
       'page-35': 'monroe-interviews.html',
       'page-36': 'monroe-interviews.html',
       // Monroe - Expériences interactives (pages 37-39)
       'page-37': 'monroe-experiences.html',
       'page-38': 'monroe-experiences.html',
       'page-39': 'monroe-experiences.html',
       // Monroe - Quiz (pages 40-41)
       'page-40': 'monroe-quiz.html',
       'page-41': 'monroe-quiz.html',
       // Voyage autour de moi (pages 42-44)
       'page-42': 'voyage-autour-de-moi.html',
       'page-43': 'voyage-autour-de-moi.html',
       'page-44': 'voyage-autour-de-moi.html',
       // Dessine-moi le vent (pages 45-47)
       'page-45': 'dessine-moi-le-vent.html',
       'page-46': 'dessine-moi-le-vent.html',
       'page-47': 'dessine-moi-le-vent.html',
       // Ni vues ni connues (pages 48-49)
       'page-48': 'ni-vues-ni-connues.html',
       'page-49': 'ni-vues-ni-connues.html',
       // Marilyn (pages 50-52)
       'page-50': 'marilyn.html',
       'page-51': 'marilyn.html',
       'page-52': 'marilyn.html',
       // Toulouse-Lautrec (pages 53-54)
       'page-53': 'toulouse-lautrec.html',
       'page-54': 'toulouse-lautrec.html',
       // Charlotte Henschel (pages 55-56)
       'page-55': 'charlotte-henschel.html',
       'page-56': 'charlotte-henschel.html',
       // XR Corporate (page 57)
       'page-57': 'xr-corporate.html',
       // Réservations (pages 58-61)
       'page-58': 'reservations.html',
       'page-59': 'reservations.html',
       'page-60': 'reservations.html',
       'page-61': 'reservations.html'
   };
   const hash = window.location.hash.replace('#', '');
   if (hash && anchorRedirects[hash]) {
       window.location.replace(anchorRedirects[hash]);
   }
   ```
3. **Portée** : exécuté uniquement sur `index.html` via guard `if (document.body.dataset.page === 'accueil')`
4. **Dégradation gracieuse** : si JS désactivé, l'utilisateur voit la page d'accueil (pas de page blanche)

### Page 404

Fichier `404.html` créé avec :
- Header/footer communs (cohérence visuelle)
- Message clair en français : « Page introuvable »
- Lien retour accueil + plan du site (liste des 21 pages)
- Accessible (même standards RGAA que les autres pages)
- Configuration serveur nécessaire (`.htaccess` pour Apache, `_redirects` pour Netlify)

---

## Accessibilité RGAA

**Landmarks et structure** (conforme AcceDe Web) :
- `<nav role="navigation" aria-label="Menu principal">` pour la navigation principale
- `<nav role="navigation" aria-label="Fil d'Ariane">` pour le breadcrumb
- `<nav role="navigation">` réservé aux menus de liens internes (pas les liens réseaux sociaux)
- Chaque `<nav>` a un `aria-label` unique pour les distinguer dans les lecteurs d'écran
- Structure globale : `<header role="banner">` > `<nav role="navigation">` > `<main role="main">` > `<footer role="contentinfo">`

**Justification des rôles ARIA explicites sur éléments sémantiques** :
Les rôles `role="navigation"`, `role="banner"`, `role="contentinfo"` et `role="main"` sont techniquement redondants sur `<nav>`, `<header>`, `<footer>` et `<main>` (warning W3C validator). Ils sont néanmoins **tous maintenus intentionnellement** pour la compatibilité maximale des technologies d'assistance (recommandation AcceDe Web + RGAA 4.1 critères 9.2.1 et 12.6.1). Cette politique s'applique uniformément à tous les landmarks du site.

**Zone d'en-tête** (conforme AcceDe Web) :
- `<header role="banner">` encapsule le logo + la navigation principale
- `role="banner"` utilisé **une seule fois par page** (`<header>` peut apparaître plusieurs fois, `role="banner"` non)
- Le lien logo a un `aria-label="Swing Digital - Accueil"` (le logo est du texte, pas une image — pas de `alt`)
- `<nav role="navigation">` peut être imbriqué dans `<header role="banner">`

**Zone de contenu principal** (conforme AcceDe Web + RGAA 4.1) :
- `<main role="main">` obligatoire (critère RGAA 9.2.1 pour `<main>` + critère 12.6.1 pour `role="main"`)
- **Une seule** `<main role="main">` visible par page
- Le skip link pointe vers `#main-content` (id sur `<main>`)

**Structure complète de chaque page** :
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Titre unique] - Swing Digital</title>
    <meta name="description" content="[Description unique]">
    <link rel="canonical" href="https://DOMAINE/[fichier].html">
    <meta property="og:title" content="[Titre unique] - Swing Digital">
    <meta property="og:description" content="[Description unique]">
    <meta property="og:image" content="[image]">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://DOMAINE/[fichier].html">
    <link rel="icon" href="img/favicon.ico">
    <link rel="stylesheet" href="css/style.css">
</head>
<body data-section="experiences" data-page="monroe-podcasts">
    <a href="#main-content" class="skip-link">Aller au contenu principal</a>
    <header role="banner">
        <a href="index.html" aria-label="Swing Digital - Accueil"><span>SWING DIGITAL</span></a>
        <nav role="navigation" aria-label="Menu principal">[...]</nav>
    </header>
    <nav role="navigation" aria-label="Fil d'Ariane">[...]</nav>
    <main role="main" id="main-content">[...]</main>
    <footer role="contentinfo">
        <p>&copy; 2026 Swing Digital. Tous droits réservés.</p>
        <nav role="navigation" aria-label="Navigation secondaire">[...]</nav>
    </footer>
    <script src="js/main.js" defer></script>
</body>
</html>
```

**Items menu** :
- `<button>` pour les items avec sous-menu, `<a>` pour les liens directs
- `aria-current="page"` sur le lien actif
- Sous-menu : `aria-expanded="false/true"` sur le bouton
- Pas de `aria-haspopup` ni `role="menu"` (réservés aux menus applicatifs, cf. Orange a11y + WAI-ARIA APG)
- Fil d'Ariane : `<nav aria-label="Fil d'Ariane">` avec `<ol>` et `aria-current="page"`
- Hamburger : `<button aria-expanded="false/true" aria-controls="main-menu">`
- Focus trap dans le menu mobile ouvert
- Fermeture Escape + clic extérieur
- Skip link en dur dans le HTML sur chaque page
- Tous les liens de navigation accessibles au clavier (tabindex naturel)
- **Pas seulement la couleur** pour indiquer l'état actif (bordure + aria-current)

**Animations et mouvement** (WCAG 2.1 AA critère 2.3.3) :
- Respecter `prefers-reduced-motion: reduce` — désactiver scroll reveal et transitions CSS
- Implémentation CSS : `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; } }`
- Guard JS : `if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches)` avant `initScrollReveal()`

---

## Outils de test

### Tests manuels
- **Navigation clavier** : Tab/Shift+Tab/Enter/Escape sur le menu et sous-menu
- **VoiceOver** (macOS) : lecteur d'écran — vérifier annonces menu, fil d'Ariane, skip link
- **Responsive** : Chrome DevTools, 4 viewports (1920, 1024, 768, 375px)

### Tests automatisés (script `check-site.sh`)

Script bash à créer à la racine du projet (`check-site.sh`) pour validation post-découpage :

1. **Liens cassés** : parcourir les 21+1 fichiers HTML, extraire tous les `href` et `src`, vérifier que chaque cible locale existe sur disque
2. **Validation W3C** : `vnu` (Nu Html Checker) sur chaque fichier — 0 erreur exigé
3. **Lighthouse CI** : `lighthouse --output json` sur chaque page, seuils : accessibilité > 95, performance > 80, SEO > 90
4. **Accessibilité** : `accesslint` (MCP) ou `pa11y` sur chaque page — 0 violation critique
5. **Cohérence header/footer** : vérifier que les 21 pages contiennent le même header et footer (hash du bloc)
6. **Breadcrumb** : vérifier que chaque page a un fil d'Ariane et que le dernier élément porte `aria-current="page"`
7. **Ancres internes** : vérifier que chaque `href="#xxx"` a un `id="xxx"` correspondant dans la même page

**Exécution** : en fin de Phase 5, avant merge sur `main`

---

## Vérification

- [ ] Chaque fichier HTML fonctionne indépendamment
- [ ] Navigation entre sections fluide
- [ ] Menu actif correctement en surbrillance à chaque niveau (visuel + aria)
- [ ] Sous-menu dropdown Expériences fonctionne (souris + clavier)
- [ ] Fil d'Ariane correct sur chaque page (y compris accueil)
- [ ] Footer identique partout avec liens relatifs corrects
- [ ] Vignettes pages 9/10 et 13/24 cliquables vers les bonnes pages
- [ ] Liens croisés volets 4/5 fonctionnels
- [ ] Hamburger mobile fonctionnel + accessible (clavier + lecteur écran)
- [ ] Skip link fonctionnel sur chaque page
- [ ] SEO : title/meta/OG uniques par page
- [ ] sitemap.xml généré et valide (conforme spécification ci-dessous)
- [ ] 404.html fonctionnelle et accessible
- [ ] Responsive testé sur 4 viewports
- [ ] Aucune régression visuelle (chaque page identique à l'ancien single-page)
- [ ] Chemins relatifs images/CSS/JS corrects
- [ ] Placeholder `https://DOMAINE/` remplacé par le domaine réel dans canonical, OG, sitemap et robots.txt avant mise en prod
- [ ] robots.txt présent et valide
- [ ] Lighthouse > 90 sur chaque page
- [ ] `--section-height` compense le header (pas de contenu caché)

---

## Critères d'acceptation

- Code HTML valide W3C (0 erreur par page)
- RGAA conforme (critères 12.1 à 12.11 navigation, 9.1 à 9.4 structure, 10.7 focus visible)
- WCAG 2.2 AA respecté (contraste, clavier, lecteur écran)
- Patterns ARIA conformes WAI-ARIA APG (disclosure pour dropdown, breadcrumb pour fil d'Ariane)
- Pas de pattern menubar/menu (réservé aux menus applicatifs, pas aux nav web)
- Aucune régression visuelle
- Lighthouse accessibilité > 95 par page

---

## Maillage interne

### Matrice de liens internes

| Depuis | Vers | Lien | Type |
|--------|------|------|------|
| `index.html` (page 3) | `experience-monroe.html` | "[Voir le projet]" + titre "L'EXPÉRIENCE MONROE" | Lien projet |
| `index.html` (page 4) | `voyage-autour-de-moi.html` | "[Voir le projet]" Voyage | Lien projet |
| `index.html` (page 4) | `dessine-moi-le-vent.html` | "[Voir le projet]" Dessine | Lien projet |
| `index.html` (page 3) | YouTube | "Galerie Joseph" × 2 | Lien externe |
| `index.html` (page 1) | `#page-2` | "QUI SOMMES NOUS ?" | Ancre interne |
| `index.html` (page 1) | `#page-8` | "ILS NOUS ONT FAIT CONFIANCE" | Ancre interne |
| `index.html` (page 1) | mailto: | "CONTACT" | Externe |
| `index.html` (page 1) | Instagram/LinkedIn/X | Réseaux sociaux | Externe |
| `experiences-series.html` (page 9) | 4 pages projet | Vignettes 1-4 | Lien projet |
| `experiences-series.html` (page 10) | 4 pages projet | Vignettes 5-8 | Lien projet |
| `experience-monroe.html` (page 13) | 3 sous-pages monroe | Cartes volets 1-3 | Lien sous-page |
| `experience-monroe.html` (page 13) | `xr-corporate.html` | Carte volet 4 (XR Memory Box) | Lien croisé |
| `experience-monroe.html` (page 13) | `marilyn.html` | Carte volet 5 (Série Marilyn) | Lien croisé |
| `experience-monroe.html` (page 24) | 6 sous-pages monroe | Cartes catégories A-F | Lien sous-page |
| `reservations.html` (pages 58-59) | — | Boutons RÉSERVER (billetterie future) | CTA désactivé |
| Toutes pages (footer) | `index.html#page-2` | "Équipe" | Lien footer |
| Toutes pages (footer) | mailto: | "Contact" | Lien footer |
| Toutes pages (breadcrumb) | Parents hiérarchiques | Fil d'Ariane | Navigation |
| Toutes pages (menu) | 4 sections + dropdown | Menu principal | Navigation |

### Liens CTA Réservation depuis les pages projet

**Décision** : aucun CTA Réserver sur les pages projet pour l'instant. La navigation vers les réservations se fait via le menu principal uniquement.

**À prévoir (post-découpage)** : ajouter des CTA Réserver sur les pages projet concernées (Toulouse-Lautrec, Marilyn, XR Corporate, Monroe) quand les liens de billetterie seront définis.

### CTA Réservation (boutons placeholder)

Les boutons RÉSERVER sur `reservations.html` n'ont pas encore de destination (billetterie non définie).

**Implémentation accessible** :
- Utiliser `<button aria-disabled="true" class="cta-reservation cta-reservation--disabled">Réserver</button>` (pas `<a href="#">`, pas d'attribut `disabled` natif)
- `aria-disabled="true"` sans `disabled` : le bouton reste dans l'ordre de tabulation (découvrable au clavier) mais annoncé comme désactivé par les AT
- Bloquer le clic en JS : `if (btn.getAttribute('aria-disabled') === 'true') { e.preventDefault(); return; }`
- Texte explicatif visible adjacent : « Billetterie bientôt disponible »
- Style visuel : `opacity: 0.6`, `cursor: not-allowed`
- Quand les liens seront définis : remplacer par `<a href="URL" class="cta-reservation">Réserver</a>` et retirer `aria-disabled`

### Navigation entre sous-pages Monroe
Pas de navigation directe entre sous-pages Monroe (pas de Précédent/Suivant). On navigue via :
- Le breadcrumb (retour à `experience-monroe.html`)
- Le menu principal (retour aux sections)

### Liens vidéo conservés

| Page PDF | Fichier HTML cible | Type | Contenu |
|----------|-------------------|------|---------|
| 11 | `experience-monroe.html` | iframe Vimeo | Vidéo présentation Monroe |
| 19 | `monroe-piece.html` | iframe Vimeo | Vidéo Pièce My Story |
| 42 | `voyage-autour-de-moi.html` | iframe Vimeo | Vidéo Voyage |
| 45 | `dessine-moi-le-vent.html` | iframe Vimeo | Vidéo Dessine-moi le vent |
| 46 | `dessine-moi-le-vent.html` | lien Vimeo externe | Lien vidéo supplémentaire |

---

## Sitemap.xml — spécification

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://DOMAINE/index.html</loc>
        <lastmod>2026-03-22</lastmod>
        <priority>1.0</priority>
    </url>
    <!-- 1 entrée par fichier HTML (21 pages — 404 exclus) -->
</urlset>
```

**Règles** :
- `<loc>` : URL absolue (domaine à définir avant mise en prod)
- `<lastmod>` : date du dernier commit touchant le fichier (format ISO 8601)
- `<priority>` : 1.0 accueil, 0.8 pages niveau 1, 0.6 pages projet, 0.4 sous-pages Monroe
- Pas de `<changefreq>` (déprécié par Google)
- `404.html` exclus du sitemap

---

## Robots.txt — spécification

```
User-agent: *
Allow: /
Disallow: /404.html

Sitemap: https://DOMAINE/sitemap.xml
```

**Règles** :
- Autoriser l'indexation de toutes les pages sauf `404.html`
- Référencer le sitemap en URL absolue (même placeholder `https://DOMAINE/` que le sitemap)
- Fichier à la racine de `src/`

---

## Liens croisés et breadcrumb

Quand un utilisateur arrive sur `xr-corporate.html` ou `marilyn.html` via un lien croisé depuis Monroe (volets 4/5), le breadcrumb affiche le chemin hiérarchique normal de la page cible :

- `xr-corporate.html` : Accueil > Expériences Séries > XR Corporate
- `marilyn.html` : Accueil > Expériences Séries > Marilyn

Le breadcrumb ne reflète **pas** le parcours de navigation (pas « Monroe > XR Corporate »). C'est cohérent avec la sémantique du fil d'Ariane (hiérarchie du site, pas historique de navigation).

---

## Historique des décisions

| Date | Question | Décision |
|------|----------|----------|
| 2026-03-22 | Navigation inter-projets (Précédent/Suivant) ? | Non — retour via breadcrumb ou menu |
| 2026-03-22 | CTA Réserver sur pages projet ? | Différé post-découpage (billetterie non définie) |
| 2026-03-22 | `aria-haspopup` sur dropdown ? | Non — réservé aux menus applicatifs (Orange a11y) |
| 2026-03-22 | Breadcrumb sur liens croisés Monroe ? | Affiche la hiérarchie cible, pas le parcours |
| 2026-03-22 | Rôles ARIA explicites sur éléments sémantiques ? | Maintenus (RGAA 4.1 + compatibilité AT) |
| 2026-03-22 | Placement du breadcrumb ? | Entre `</header>` et `<main>`, pas dans le header |
| 2026-03-22 | Favicon ? | `<link rel="icon" href="img/favicon.ico">` sur toutes les pages |
| 2026-03-22 | `prefers-reduced-motion` ? | Respecté — désactive scroll reveal et transitions (WCAG 2.3.3) |
| 2026-03-22 | `robots.txt` ? | Oui — Allow all sauf 404.html, référence sitemap |
