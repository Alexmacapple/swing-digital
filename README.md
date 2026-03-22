# Swing Digital - Site vitrine

Site vitrine multi-pages pour Swing Digital, spécialiste des expériences immersives et espaces augmentés.

24 pages HTML découpées depuis une maquette PDF de 62 pages, avec navigation 3 niveaux et accessibilité RGAA.

## Démarrage rapide

```bash
cd src/
python3 -m http.server 8080
# Ouvrir http://localhost:8080/
```

## Stack technique

- HTML5 sémantique (24 pages)
- CSS3 responsive (variables, BEM, mobile-first)
- JavaScript vanilla (navigation, videos, animations)
- Polices : Brandon, Fragen
- Pas de framework ni bundler

## Structure du projet

```
swing-digital/
├── src/
│   ├── index.html                  Accueil
│   ├── espaces-augmentes.html      Espaces augmentes
│   ├── experiences-series.html     Rubrique 8 projets
│   ├── experience-monroe.html      L'Experience Monroe
│   ├── monroe-*.html               9 sous-pages Monroe
│   ├── voyage-autour-de-moi.html   Voyage autour de moi
│   ├── dessine-moi-le-vent.html    Dessine-moi le vent
│   ├── ni-vues-ni-connues.html     Ni vues ni connues
│   ├── marilyn.html                Marilyn
│   ├── toulouse-lautrec.html       Toulouse-Lautrec
│   ├── charlotte-henschel.html     Charlotte Henschel
│   ├── xr-corporate.html           XR Corporate
│   ├── reservations.html           Reservations
│   ├── 404.html                    Page introuvable
│   ├── plan-du-site.html           Plan du site
│   ├── mentions-legales.html       Mentions legales
│   ├── sitemap.xml / robots.txt    SEO
│   ├── css/style.css               Styles
│   ├── js/main.js                  Scripts
│   ├── img/                        Images par page
│   ├── fonts/                      Polices web
│   └── video/                      hero.mp4, contact.mp4
│
├── CLAUDE.md                       Memoire projet
├── GUIDELINES-TEMPLATES.md         Conventions CSS/HTML
├── ENSEIGNEMENTS-PAGES.md          Lecons apprises
├── PRD-DECOUPAGE.md                PRD decoupe (termine)
├── ROADMAP.md                      Etat d'avancement
├── AUDIT-COMPLET.md                Audit qualite (83/100)
├── check-site.sh                   Script de validation
└── README.md                       Ce fichier
```

## Architecture navigation

```
Accueil
├── Espaces augmentes
├── Experiences Series
│   ├── L'Experience Monroe
│   │   ├── 1. Piece My Story
│   │   ├── 2. Roman Graphique
│   │   ├── 3. Installation
│   │   ├── 4. XR Memory Box (lien croise)
│   │   ├── 5. Serie Marilyn (lien croise)
│   │   ├── A. Photographie
│   │   ├── B. Composition electroacoustique
│   │   ├── C. Podcasts
│   │   ├── D. Interviews
│   │   ├── E. Experiences interactives
│   │   └── F. Le Quiz Marilyn
│   ├── Voyage autour de moi
│   ├── Dessine-moi le vent
│   ├── Ni vues ni connues
│   ├── Marilyn
│   ├── Toulouse-Lautrec
│   ├── Charlotte Henschel
│   └── XR Corporate
└── Reservations
```

## Accessibilité (WCAG 2.2 AA / RGAA 4.1)

- 0 violation axe-core sur 24 pages
- Navigation clavier complète (Tab, Escape, fleches)
- Menu dropdown disclosure pattern accessible
- Fil d'Ariane WAI-ARIA APG breadcrumb
- Skip link en dur dans le HTML
- h1 sur chaque page
- Textes en casse normale, majuscules via CSS (RGAA 10.2)
- prefers-reduced-motion respecte
- Contraste WCAG AA conforme
- Intitules de liens explicites

## Documentation

| Fichier | Contenu |
|---------|---------|
| CLAUDE.md | Mémoire projet, stack, composants, decisions |
| GUIDELINES-TEMPLATES.md | Conventions CSS/HTML, archétypes, classes BEM |
| ENSEIGNEMENTS-PAGES.md | Leçons apprises, erreurs récurrentes |
| PRD-DECOUPAGE.md | PRD découpé multi-pages (terminé) |
| ROADMAP.md | Phases, todo pre-prod, scores |
| AUDIT-COMPLET.md | Audit technique, SEO, a11y, sécurité, UX |

---

**Dernière mise à jour** : 2026-03-22
**Version** : v4
