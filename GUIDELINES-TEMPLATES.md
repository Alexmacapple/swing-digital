# Guidelines Templates - Swing Digital

Conventions extraites du code source (reverse engineering v4, 24 pages multi-pages).

---

## 1. Structure HTML type

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Titre] - Swing Digital</title>
    <meta name="description" content="[Description]">
    <link rel="canonical" href="https://DOMAINE/[page].html">
    <meta property="og:title" content="[Titre] - Swing Digital">
    <meta property="og:description" content="[Description]">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://DOMAINE/[page].html">
    <link rel="preload" href="fonts/Brandon_blk.otf" as="font" type="font/otf" crossorigin>
    <link rel="preload" href="fonts/Brandon_reg.otf" as="font" type="font/otf" crossorigin>
    <link rel="preload" href="fonts/Fragen-Bold.otf" as="font" type="font/otf" crossorigin>
    <link rel="stylesheet" href="css/style.css">
</head>
<body data-section="[section]" data-page="[page]">
    <a href="#main-content" class="skip-link">Aller au contenu principal</a>
    <header class="site-header">...</header>
    <nav aria-label="Fil d'Ariane" class="breadcrumb">...</nav>
    <main id="main-content">
        <h1 class="sr-only">[Titre page]</h1>
        <section id="page-N" aria-labelledby="pageN-title">...</section>
    </main>
    <footer class="site-footer footer">...</footer>
    <script src="js/main.js" defer></script>
</body>
</html>
```

---

## 2. Archétypes de layout (7 types)

### A. Hero fullscreen (pages 1, 11)

- Conteneur : `min-height: var(--section-height)`
- Composants en position absolute + z-index
- Video en object-fit cover, z-index 2
- Responsive : grid 2x2 tablette, empile mobile

### B. Deux colonnes texte/image (pages 3, 4, 60, 61)

- Container flex + gap
- Colonne gauche texte, droite image (ou inverse)
- Responsive : flex-direction column sous 768px

### C. Grille cartes (pages 9, 10, 13, 24)

- Grid repeat(N, 1fr) avec gap responsif
- Cartes cliquables (a.page13__card--link)
- Hover translateY(-4px) + shadow
- Responsive : 1 colonne mobile, 2 tablette, 3-5 desktop

### D. Full image (page 7)

- height: var(--section-height), overflow hidden
- Image object-fit cover
- Pas de texte (sauf overlay décoratif)

### E. Grille logos partenaires (page 8)

- Grid 6 colonnes desktop, 4 tablette, 3 mobile
- Logos centres, aspect-ratio variable

### F. Grille équipe (page 2)

- Grid 3 colonnes desktop, 2 tablette, 1 mobile
- Carte image + infos texte

### G. Page utilitaire texte (404, plan du site, mentions légales)

- max-width 800px centre
- Fond noir, texte blanc
- Listes imbriquees avec padding progressif

---

## 3. Variables CSS :root

### Couleurs

```css
/* Brand */
--color-brand: #E8494B;         /* Decoratif uniquement */
--color-brand-btn: #CE3B3D;     /* Boutons, 4.86:1 sur blanc */
--color-bg-red: #BE2F31;        /* Fonds, 5.77:1 sur blanc */

/* Neutres */
--color-black: #000;
--color-white: #ffffff;
--color-gray-dark: #333;
--color-gray-light: #767676;

/* WCAG AA conformes */
--color-text-red: #CE3B3D;      /* 4.86:1 */
--color-text-gold: #7A6100;     /* 5.94:1 */
```

### Typographie (échelle fluide clamp)

```css
--size-2xs: 0.875rem;                           /* 14px credits */
--size-xs:  clamp(0.9375rem, 1.4vw, 1.125rem);  /* 15-18px captions */
--size-sm:  clamp(1.25rem, 2.2vw, 1.5rem);      /* 20-24px corps */
--size-md:  clamp(1.3125rem, 2.5vw, 1.5625rem); /* 21-25px sous-titres */
--size-lg:  clamp(1.5rem, 3vw, 2.2rem);          /* 24-35px titres */
--size-xl:  clamp(1.5rem, 3.5vw, 2.5rem);        /* 24-40px titres xl */
--size-2xl: clamp(1.75rem, 4.5vw, 3.5rem);       /* 28-56px hero */

/* Aliases semantiques */
--fs-hero: var(--size-3xl);
--fs-title-xl: var(--size-2xl);
--fs-title: var(--size-xl);
--fs-subtitle: var(--size-md);
--fs-body: var(--size-sm);
--fs-caption: var(--size-xs);
--fs-credit: var(--size-2xs);
```

### Espacement

```css
--space-2xs: 0.3rem;  --space-xs: 0.5rem;   --space-sm: 1rem;
--space-md: 1.5rem;   --space-lg: 2rem;     --space-xl: 3rem;
--space-2xl: 4rem;
```

### Layout

```css
--header-height: 60px;
--section-height: calc(100dvh - var(--header-height));
--page-max-width: 1440px;
--slide-pad-x: 2rem;    /* Ajuste par breakpoint */
--slide-pad-y: 2rem;
```

### Breakpoints

```css
--breakpoint-sm: 480px;   --breakpoint-md: 768px;
--breakpoint-lg: 1024px;  --breakpoint-xl: 1200px;
--breakpoint-xxl: 1441px;
```

---

## 4. Nomenclature BEM

### Header et navigation

```
.site-header > .site-header__inner > .site-header__logo
.site-nav__list > .site-nav__item > .site-nav__link / .site-nav__btn
.site-nav__link--active (font-weight 900 + border)
.site-nav__submenu > .site-nav__submenu-link
.site-nav__submenu--level3 (sous-menu Monroe)
.site-nav__burger > .site-nav__burger-icon
```

### Breadcrumb

```
.breadcrumb > .breadcrumb__list > .breadcrumb__item > .breadcrumb__link
.breadcrumb__link[aria-current="page"]
```

### Sections de contenu

```
.page{N} > .page{N}__container > .page{N}__{element}
Exemples : .page5__title, .page13__card, .page58__reserve-btn
```

### Composants partages

```
.sr-only          (masque visuel, visible lecteur d'ecran)
.skip-link        (premier enfant body, visible au focus)
.reveal           (animation scroll, opacity 0 -> 1)
.cta-reservation  (bouton CTA)
.cta-reservation--disabled (opacity 0.6, aria-disabled)
```

---

## 5. Conventions responsive

### Breakpoints et changements

| Breakpoint | Changement principal |
|------------|---------------------|
| 1441px+ | Espacement augmente |
| 1024px | Hamburger active, menu en colonne |
| 768px | Grilles 2 colonnes -> 1 colonne, flex vertical |
| 600px | Grilles cartes 2x2 -> 1 colonne |
| 480px | Padding reduit, tailles police reduites |

### Regles

- Variables recalculees par breakpoint (--slide-pad-x, --grid-gap)
- Grilles passent en colonne unique sous 768px
- Menu hamburger sous 1024px
- Breadcrumb reduit sous 480px
- Footer en colonne sous 480px

---

## 6. Accessibilité

### Obligatoire sur chaque page

- `<html lang="fr">`
- Skip link en dur (premier enfant body)
- h1 (sr-only si pas de titre visible)
- aria-labelledby sur chaque section
- aria-current="page" sur le lien actif du breadcrumb
- data-section et data-page sur body

### Textes en majuscules

- HTML : casse normale avec accents
- CSS : text-transform uppercase sur les classes de titre
- RGAA 10.2 : ne jamais coder en majuscules dans le HTML

### Contraste minimum

- Texte normal : 4.5:1 (WCAG AA)
- Texte large (>=24px ou >=18.66px bold) : 3:1
- Focus visible : outline 2px solid, contraste 3:1

### Videos

- role="img" + aria-label explicite
- Bouton play/pause avec aria-label dynamique
- prefers-reduced-motion respecte

---

## 7. JavaScript

### Fonctions et guards

Chaque fonction commence par un guard :
```javascript
function initXxx() {
    var element = document.getElementById('xxx');
    if (!element) return; // Guard
    // ... logique
}
```

### Chargement conditionnel

Vimeo API charge uniquement si iframe présente :
```javascript
if (!document.querySelector('iframe[src*="vimeo"]')) return;
```

### Patterns utilises

- IntersectionObserver (scroll tracking, scroll reveal)
- Disclosure pattern W3C (dropdown, hamburger)
- Event delegation (clic exterieur ferme les menus)
- Focus management (Escape retourne le focus)

---

## Checklist nouvelle page

- [ ] Structure HTML type respectée (head, body, header, breadcrumb, main, footer)
- [ ] data-section et data-page sur body
- [ ] h1 présent (sr-only si titre en visuel)
- [ ] Sections avec id et aria-labelledby
- [ ] Breadcrumb correct avec aria-current="page"
- [ ] État actif dans le menu (via JS initNavActiveState)
- [ ] Title et meta description uniques
- [ ] Canonical et OG tags
- [ ] Images avec alt, width, height, loading="lazy"
- [ ] Textes en casse normale, uppercase via CSS
- [ ] Contraste WCAG AA vérifié
- [ ] Responsive testé (480, 768, 1024px)
- [ ] Commentaire Page PDF N sur chaque section

---

**Dernière mise à jour** : 2026-03-22
**Version** : 3.0.0 (reverse engineering v4)
