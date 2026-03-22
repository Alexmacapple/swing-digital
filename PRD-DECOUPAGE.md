# PRD : Découpage multi-pages - Swing Digital

## Contexte

Le site est actuellement un single-page (`index.html`, 62 sections/pages). Le menu de navigation existe sur la page 1 mais n'est pas persistant.

**Objectif** : Découper le site en plusieurs pages HTML avec navigation 3 niveaux, header/footer communs, fil d'Ariane, menu hamburger mobile, RGAA accessible.

**Branche** : `decoupage`

**Regle absolue** : Ne rien casser de l'existant. Découper et améliorer, jamais rétrograder. Chaque page après découpage doit être visuellement identique à la section correspondante dans le single-page actuel.

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

### Fil d'Ariane (RGAA)
Conforme WAI-ARIA APG Breadcrumb Pattern (https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

- Visible sur TOUTES les pages (y compris accueil = juste "Accueil")
- Ex niveau 3 : `Accueil > Expériences Séries > L'Expérience Monroe > C Podcasts`
- Pas de navigation inter-projets (Précédent/Suivant)

**Structure HTML conforme W3C APG** :
```html
<nav aria-label="Fil d'Ariane">
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

### Sous-menu dropdown Expériences Séries
Conforme AcceDe Web (https://www.accede-web.com/notices/interface-riche/menu-deroulant/)

**Structure HTML** :
- `<nav aria-label="Menu principal">` comme conteneur (`role="navigation"` implicite sur `<nav>`)
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
├── sitemap.xml
├── css/style.css
├── js/main.js
├── img/...
└── video/...
```

Total : **21 fichiers HTML** + sitemap.xml

---

## Phases d'implémentation

### Phase 1 : Header + Footer + Hamburger (3-4h)
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

### Phase 2 : Découpage niveau 1 — 4 pages principales (3-4h)
- Découper `index.html` en : `index.html`, `espaces-augmentes.html`, `experiences-series.html`, `reservations.html`
- Dupliquer header/footer dans chaque page
- Mettre à jour les liens internes — toujours en chemin relatif complet
- Refaire les ancres internes par page
- Ajouter les commentaires `<!-- Page PDF N -->`
- SEO : title + meta description + canonical + Open Graph par page
- Fil d'Ariane niveau 1
- Commit après chaque page créée

### Phase 3 : Découpage niveau 2 — 8 pages projet (4-5h)
- Extraire les 8 projets depuis les sections concernées
- Câbler les vignettes pages 9/10 vers les fichiers projet
- Fil d'Ariane niveau 2 (Accueil > Expériences Séries > Projet)
- SEO + Open Graph par page projet
- Commit par lot de 2-3 projets

### Phase 4 : Découpage niveau 3 — 9 sous-pages Monroe (3-4h)
- Extraire les sous-pages de `experience-monroe.html`
- Câbler les cartes pages 13/24 vers les sous-pages
- Liens croisés volets 4/5 vers marilyn.html et xr-corporate.html
- Fil d'Ariane niveau 3
- SEO + Open Graph par sous-page
- Commit par sous-page

### Phase 5 : Liens, sitemap, vérification finale (2-3h)
- Mettre à jour TOUS les liens internes entre pages (chemin relatif)
- Vérifier chaque fil d'Ariane
- Vérifier chaque état actif du menu
- Générer sitemap.xml
- Test responsive 4 viewports (1920, 1024, 768, 375px)
- Test accessibilité RGAA (navigation clavier, lecteur écran)
- Lighthouse sur chaque page

**Effort total estimé : 15-20h**

---

## Décisions techniques

### HTML

| Decision | Choix | Raison |
|----------|-------|--------|
| Ancien menu hero | Supprimé | Un seul menu persistant sur tout le site |
| État actif | `data-section` sur `<body>` | Simple, pas de JS complexe, chaque HTML sait sa section |
| Sous-menu projets | Dropdown disclosure pattern (pas menubar) | Conforme AcceDe Web + Orange a11y. Navigation clavier + lecteur écran + pas seulement la couleur |
| Skip link | En dur dans le HTML | Bonnes pratiques RGAA (pas de dépendance JS) |
| Logo header | Texte (comme actuellement) | Changement possible plus tard |
| Liens footer | Chemin relatif complet | `index.html#page-2` partout (pas de condition) |
| Balises sémantiques | `<header>`, `<nav>`, `<main>`, `<footer>` | HTML5 + zones ARIA landmarks |

### CSS

| Decision | Choix | Raison |
|----------|-------|--------|
| Section height | `calc(100vh - var(--header-height))` | Compense le header fixe, pas de contenu caché |
| Hamburger breakpoint | 1024px | 4 boutons + logo ne tiennent pas en dessous |
| CSS unique | Un seul `style.css` | Simple, mis en cache. Commentaires pour les styles orphelins |
| BEM naming | Classes BEM `.site-header`, `.site-nav`, `.breadcrumb` | Ciblage CSS par classes, ARIA pour l'accessibilité uniquement |
| Variable header | `--header-height` | Utilisée pour padding-top et calc section-height |

### JS

| Decision | Choix | Raison |
|----------|-------|--------|
| Vimeo API | Chargé partout | Anticipe l'ajout de vidéos sur d'autres pages |
| Scroll tracking | Conservé | Utile même sur les petites pages (3-4 sections) |
| Scroll reveal | Conservé tel quel | Guards existants suffisent |
| Guards | `if (!element) return` | Fonctions spécifiques ne s'exécutent que si l'élément existe |

---

## Nouveaux CSS à créer

Convention CSS : ciblage par **classes BEM** (`.site-header`, `.site-nav`, etc.), pas par sélecteurs d'attributs ARIA. Les attributs ARIA sont pour l'accessibilité, pas pour le CSS.

```css
/* Variable hauteur header */
--header-height: 60px;

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
.breadcrumb__separator { ... }

/* Compensation header fixe */
#main-content { padding-top: var(--header-height); }
--section-height: calc(100vh - var(--header-height));
```

Les attributs ARIA (`aria-current`, `aria-expanded`, `aria-haspopup`) restent sur le HTML pour l'accessibilité mais ne sont PAS utilisés comme sélecteurs CSS.

---

## Éléments communs

### Header (toutes les pages)
- Skip link en dur dans le HTML (premier élément du `<body>`)
- Logo Swing Digital texte, cliquable (retour index.html)
- Menu 4 sections avec pattern disclosure + `aria-current="page"` (pas de menubar)
- Sous-menu dropdown 8 projets (dans Expériences Séries) avec `aria-expanded`
- Fil d'Ariane visible partout (y compris accueil = juste "Accueil")
- Menu hamburger mobile ≤ 1024px (focus trap, Escape, clic extérieur)
- Header fixe, contenu passe SOUS le header via `padding-top`
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
    <nav role="navigation" aria-label="Navigation footer">
        <ul>
            <li><a href="index.html#page-2">Équipe</a></li>
            <li><a href="mailto:PRODUCTION@SWINGDIGITALPRODUCTION.COM">Contact</a></li>
            <li><a href="#">Mentions légales</a></li>
        </ul>
    </nav>
</footer>
```

---

## SEO et Open Graph

Chaque page HTML a :
- `<title>` unique (ex: "L'Expérience Monroe - Swing Digital")
- `<meta name="description">` unique
- `<link rel="canonical">`
- `<meta property="og:title">` (= title)
- `<meta property="og:description">` (= description)
- `<meta property="og:image">` (image de couverture du projet/section)
- `<meta property="og:type" content="website">`
- `<meta property="og:url">` (= canonical)

---

## Performance

Gain attendu du découpage :
- Actuellement : 62 sections, ~174 images (108 Mo) chargées en un seul fichier HTML
- Après : chaque page ne charge que ses images (3-15 images selon la page)
- LCP mobile devrait passer de ~3s à < 1.5s sur les petites pages
- Le CSS reste unique (mis en cache après la 1ere page visitée)

---

## Technique

### CSS
Un seul fichier `style.css`. Ajout des styles header/hamburger/breadcrumb. Commentaires sur les styles orphelins. Ménage CSS prévu plus tard.

### JS
`main.js` conservé avec guards. Ajout de `initHamburger()`. Le skip link passe en HTML (suppression de `addSkipLink()` en JS). Vimeo API chargé sur toutes les pages. Scroll tracking et scroll reveal conservés.

### Chemins relatifs
Tous les fichiers HTML dans `src/` — chemins `./css/`, `./js/`, `./img/` identiques.

### Anciennes URLs
Pas de redirection. Les anciennes ancres `#page-N` ne seront plus valides.

---

## Accessibilité RGAA

**Landmarks et structure** (conforme AcceDe Web) :
- `<nav role="navigation" aria-label="Menu principal">` pour la navigation principale
- `<nav role="navigation" aria-label="Fil d'Ariane">` pour le breadcrumb
- `<nav role="navigation">` réservé aux menus de liens internes (pas les liens réseaux sociaux)
- `role="navigation"` explicite même sur `<nav>` (recommandé AcceDe Web pour compatibilité AT)
- Chaque `<nav>` a un `aria-label` unique pour les distinguer dans les lecteurs d'écran
- Structure globale : `<header role="banner">` > `<nav role="navigation">` > `<main role="main">` > `<footer role="contentinfo">`

**Zone d'en-tête** (conforme AcceDe Web) :
- `<header role="banner">` encapsule le logo + la navigation principale
- `role="banner"` utilisé **une seule fois par page** (`<header>` peut apparaître plusieurs fois, `role="banner"` non)
- Le logo a un texte alternatif approprié (ex: `alt="Swing Digital - Accueil"`)
- `<nav role="navigation">` peut être imbriqué dans `<header role="banner">`

**Zone de contenu principal** (conforme AcceDe Web + RGAA 4.1) :
- `<main role="main">` obligatoire (critère RGAA 9.2.1 pour `<main>` + critère 12.6.1 pour `role="main"`)
- **Une seule** `<main role="main">` visible par page
- La double spécification `<main>` + `role="main"` est intentionnelle (pas redondante malgré le warning W3C — exception RGAA pour compatibilité maximale des AT)
- Le skip link pointe vers `#main-content` (id sur `<main>`)

**Structure complète de chaque page** :
```html
<body data-section="experiences" data-page="monroe-podcasts">
    <a href="#main-content" class="skip-link">Aller au contenu principal</a>
    <header role="banner">
        <a href="index.html"><span>SWING DIGITAL</span></a>
        <nav role="navigation" aria-label="Menu principal">[...]</nav>
    </header>
    <nav role="navigation" aria-label="Fil d'Ariane">[...]</nav>
    <main role="main" id="main-content">[...]</main>
    <footer role="contentinfo">[...]</footer>
</body>
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

---

## Outils de test

- **Lighthouse** : performance, accessibilité, SEO par page
- **WAVE** : accessibilité automatisée
- **Navigation clavier** : Tab/Shift+Tab/Enter/Escape sur le menu et sous-menu
- **VoiceOver** (macOS) : lecteur d'écran — vérifier annonces menu, fil d'Ariane, skip link
- **Validateur W3C** : HTML valide par page
- **Responsive** : Chrome DevTools, 4 viewports (1920, 1024, 768, 375px)

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
- [ ] sitemap.xml généré et valide
- [ ] Responsive testé sur 4 viewports
- [ ] Aucune régression visuelle (chaque page identique à l'ancien single-page)
- [ ] Chemins relatifs images/CSS/JS corrects
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

## Connus/Inconnus

Tous résolus.
