# Stack technique - Swing Digital

## Frontend

| Technologie | Usage |
|-------------|-------|
| HTML5 | Structure sémantique (sections, aria-labels, headings) |
| CSS3 | Variables, BEM, responsive, animations |
| JavaScript (vanilla) | Navigation, disclosures, vidéos Vimeo, animations |
| Node.js | Scripts de build, preflight, SEO/GEO et audits locaux |

## Approche

- **Pas de framework** : site vitrine statique, HTML/CSS/JS pur
- **Mobile-first** : breakpoints 768px et 480px
- **Performance** : images optimisées, polices auto-hébergées, vidéos externes chargées conditionnellement
- **Accessibilité** : WCAG 2.2 AA (alt text, contraste, navigation clavier)
- **Runtime public** : pas de framework ni bundler côté site publié

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
- Vidéos Vimeo (iframe API chargée conditionnellement)
- Contrôles vidéo accessibles (play/pause, son)
- Navigation par ancres (#page-N)
- Dépendances npm réservées aux scripts, audits et tooling local

## Hébergement

- Recette cliente : `https://alexmacapple.github.io/swing-digital/` — branche `gh-pages`, `noindex` et robots bloquant.
- Production : `https://www.swingdigitalproduction.com` — branche Git de déploiement contenant uniquement `dist/`.
- Hébergement : OVH ; la publication est déclenchée par `scripts/publier-production.sh` et peut être synchronisée manuellement avec `scripts/synchroniser-production-ovh.sh`.

Le dossier `src/` n'est jamais servi directement. Le preflight production termine avec le code 0 ; les avertissements Réservations restent à interpréter selon le scénario de lancement. Le certificat HTTPS et le routage 404 doivent être vérifiés sur le domaine public.

## Fichiers

| Fichier | Taille approx |
|---------|---------------|
| index.html | ~38 KB (614 lignes) |
| style.css | ~177 KB (7 557 lignes) |
| main.js | ~28 KB (837 lignes) |
| Images | ~90 MB (220+ fichiers) |

---

**Dernière mise à jour** : 2026-09-20
