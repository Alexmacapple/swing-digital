# Stack technique - Swing Digital

## Frontend

| Technologie | Usage |
|-------------|-------|
| HTML5 | Structure semantique (sections, aria-labels, headings) |
| CSS3 | Variables, BEM, responsive, animations |
| JavaScript (vanilla) | Scroll tracking, videos Vimeo, navigation |

## Approche

- **Pas de framework** : site vitrine statique, HTML/CSS/JS pur
- **Mobile-first** : breakpoints 768px et 480px
- **Performance** : images optimisees, pas de dependances externes
- **Accessibilite** : WCAG 2.2 AA (alt text, contraste, navigation clavier)

## CSS

### Variables (`:root`)

```css
--section-height     /* 100vh / 100dvh */
--color-brand        /* #E8494B (fonds decoratifs) */
--color-brand-btn    /* #CE3B3D (texte sur blanc, WCAG AA) */
--color-brand-gold   /* #E8C84A (elements dores) */
--gradient-brand     /* #B93539 -> #CE3B3D */
--font-primary       /* Brandon */
--font-secondary     /* Fragen */
--fs-slide-title     /* clamp(1.5rem, 4vw, 2.5rem) */
--fs-slide-body      /* clamp(0.8rem, 1.5vw, 0.9rem) */
--slide-pad-x        /* 2rem -> 1rem */
```

### Nommage BEM

```
.pageN                  /* Block (section) */
.pageN__element         /* Element */
.pageN__element--mod    /* Modifier */
```

### Archetypes de layout

10 templates couvrent les 62 pages (details dans GUIDELINES-TEMPLATES.md).

## Polices

```
Brandon Black      -> Titres principaux, headings
Fragen             -> Corps de texte, sous-titres, descriptions
Raleway Bold       -> Navigation, labels
Roboto Bold        -> Elements UI
Walden Black       -> Elements decoratifs (page 1)
```

## JavaScript

- Scroll tracking (IntersectionObserver)
- Videos Vimeo (iframe API, autoplay, loop, muted)
- Controles video accessibles (play/pause, son)
- Navigation par ancres (#page-N)
- Pas de dependances npm

## Hebergement

A definir (Netlify, Vercel, OVH, ou autre).

## Fichiers

| Fichier | Taille approx |
|---------|---------------|
| index.html | ~80 KB (1900+ lignes) |
| style.css | ~120 KB (5800+ lignes) |
| main.js | ~15 KB |
| Images | ~90 MB (220+ fichiers) |

---

**Derniere mise a jour** : 2026-03-22
