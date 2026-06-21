# Stack technique - Swing Digital

## Frontend

| Technologie | Usage |
|-------------|-------|
| HTML5 | Structure sémantique (sections, aria-labels, headings) |
| CSS3 | Variables, BEM, responsive, animations |
| JavaScript (vanilla) | Scroll tracking, videos Vimeo, navigation |

## Approche

- **Pas de framework** : site vitrine statique, HTML/CSS/JS pur
- **Mobile-first** : breakpoints 768px et 480px
- **Performance** : images optimisées, pas de dépendances externes
- **Accessibilité** : WCAG 2.2 AA (alt text, contraste, navigation clavier)

## CSS

### Variables (`:root`)

```css
--section-height     /* 100vh / 100dvh */
--color-brand        /* #E8494B (fonds décoratifs) */
--color-brand-btn    /* #CE3B3D (texte sur blanc, WCAG AA) */
--color-brand-gold   /* #E8C84A (éléments dorés) */
--gradient-brand     /* #B93539 -> #CE3B3D */
--font-primary       /* Satoshi */
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

### Archétypes de layout

10 templates couvrent les 62 pages (détails dans GUIDELINES-TEMPLATES.md).

## Polices

```
Satoshi Variable       -> Police principale du site
Satoshi VariableItalic -> Emphase et italiques
Fallbacks             -> Inter, system-ui, Segoe UI, sans-serif
```

## JavaScript

- Scroll tracking (IntersectionObserver)
- Vidéos Vimeo (iframe API, autoplay, loop, muted)
- Contrôles vidéo accessibles (play/pause, son)
- Navigation par ancres (#page-N)
- Pas de dépendances npm

## Hébergement

À définir (Netlify, Vercel, OVH, ou autre).

## Fichiers

| Fichier | Taille approx |
|---------|---------------|
| index.html | ~80 KB (1900+ lignes) |
| style.css | ~120 KB (5800+ lignes) |
| main.js | ~15 KB |
| Images | ~90 MB (220+ fichiers) |

---

**Dernière mise à jour** : 2026-06-21
