# Swing Digital - Site vitrine

Site vitrine multi-pages pour Swing Digital, spécialiste des expériences immersives et espaces augmentés.

24 pages HTML découpées depuis une maquette PDF de 62 pages, avec navigation 3 niveaux et accessibilité RGAA.

## Démarrage rapide

```bash
cd src/
python3 -m http.server 8080
# Ouvrir http://localhost:8080/
```

## Build de production

Ne pas déployer directement le dossier `src/` : il contient aussi des artefacts de travail exclus du crawl. Le dossier public à publier est `dist/`, généré par :

```bash
npm run build:prod
```

### Cache CSS

Les pages chargent la feuille de style avec un cache-buster explicite :

```html
<link rel="stylesheet" href="css/style.css?v=AAAAMMJJ">
```

À chaque modification de `src/css/style.css` destinée à être visible sur `swing.appmiweb.com`, incrémenter cette version dans toutes les pages HTML sources, puis lancer `npm run build:prod`. Sans ce changement, Safari, certains navigateurs mobiles ou un cache intermédiaire peuvent continuer à servir l'ancienne CSS.

Vérification rapide :

```bash
rg -n "style\.css\?v=" src dist
```

La version doit être identique dans `src/` et `dist/`, et différente de la version précédemment publiée.

Avant la mise en production, renseigner le vrai domaine HTTPS et lancer les contrôles :

Préproduction Appmiweb :

```bash
npm run appmiweb:set-base
npm test
npm run seo:check
npm run build:prod
npm run appmiweb:preflight
```

Production finale :

```bash
npm test
npm run seo:set-base -- https://votre-domaine.fr
SEO_BASE_URL=https://votre-domaine.fr npm run seo:check
npm run prod:preflight -- https://votre-domaine.fr
```

Le preflight bloque la publication si des URL `localhost`, des placeholders légaux, des artefacts de travail ou des liens locaux cassés restent dans `dist/`.

## Stack technique

- HTML5 sémantique (24 pages)
- CSS3 responsive (variables, BEM, mobile-first)
- JavaScript vanilla (navigation, vidéos, animations)
- Polices : Brandon, Fragen
- Pas de framework ni bundler

## Architecture navigation

```
Accueil
├── Espaces augmentés
├── Expériences Séries
│   ├── L'Expérience Monroe
│   │   ├── 1. Pièce My Story
│   │   ├── 2. Roman Graphique
│   │   ├── 3. Installation
│   │   ├── 4. XR Memory Box (lien croisé)
│   │   ├── 5. Série Marilyn (lien croisé)
│   │   ├── A. Photographie
│   │   ├── B. Composition électroacoustique
│   │   ├── C. Podcasts
│   │   ├── D. Interviews
│   │   ├── E. Expériences interactives
│   │   └── F. Le Quiz Marilyn
│   ├── Voyage autour de moi
│   ├── Dessine-moi le vent
│   ├── Ni vues ni connues
│   ├── Marilyn
│   ├── Toulouse-Lautrec
│   ├── Charlotte Henschel
│   └── XR Corporate
└── Réservations
```

## Accessibilité (WCAG 2.2 AA / RGAA 4.1)

- 0 violation axe-core sur 24 pages
- Navigation clavier complète (Tab, Escape, flèches)
- Menu dropdown disclosure pattern accessible
- Fil d'Ariane WAI-ARIA APG breadcrumb
- Skip link en dur dans le HTML
- h1 sur chaque page
- Textes en casse normale, majuscules via CSS (RGAA 10.2)
- prefers-reduced-motion respecté
- Contraste WCAG AA conforme
- Intitulés de liens explicites

## Documentation

| Fichier | Contenu |
|---------|---------|
| CLAUDE.md | Mémoire projet, stack, composants, décisions |
| GUIDELINES-TEMPLATES.md | Conventions CSS/HTML, archétypes, classes BEM |
| ENSEIGNEMENTS-PAGES.md | Leçons apprises, erreurs récurrentes |
| PRD-DECOUPAGE.md | PRD découpe multi-pages (terminé) |
| ROADMAP.md | Phases, todo pré-prod, scores |
| AUDIT-COMPLET.md | Audit technique, SEO, a11y, sécurité, UX |

---

**Dernière mise à jour** : 2026-06-20
**Version** : v5
