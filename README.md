# Swing Digital - Site vitrine

Site vitrine pour Swing Digital, entreprise specialisee dans les experiences immersives et espaces augmentes.

**62 pages integrees** depuis la maquette PDF, avec fidelite visuelle verifiee page par page.

## Demarrage rapide

Ouvrir `src/index.html` dans un navigateur, ou lancer un serveur local :

```bash
npx serve src/
```

## Stack technique

- HTML5 semantique
- CSS3 responsive (variables, BEM, mobile-first)
- JavaScript vanilla (scroll tracking, videos Vimeo, animations)
- Polices : Brandon, Fragen, Raleway, Roboto, Walden
- Pas de framework ni bundler

## Structure du projet

```
swing-digital/
├── src/
│   ├── index.html                  Site complet (62 pages/slides)
│   ├── css/style.css               Styles (variables, BEM, responsive)
│   ├── js/main.js                  Interactions (scroll, videos, nav)
│   ├── img/
│   │   ├── pages/page-1..62/       Images par page
│   │   ├── partners/               Logos partenaires partages
│   │   └── logos/                   Logos marque
│   ├── fonts/                      Polices web
│   ├── maquette-site.pdf           Maquette PDF originale (62 pages)
│   └── pages-extracted/            Extraction PDF (screenshots, textes, images)
│
├── EXPORT_HD/                      Exports haute definition (JPG + PDF)
│
├── CLAUDE.md                       Memoire projet Claude
├── GUIDELINES-TEMPLATES.md         Conventions CSS/HTML (archetypes, BEM, variables)
├── ENSEIGNEMENTS-PAGES.md          Lecons apprises (erreurs, patterns, audit)
├── ROADMAP.md                      Etat d'avancement et prochaines etapes
└── README.md                       Ce fichier
```

## Pages et sections

Le site est compose de 62 slides/pages couvrant :

| Section | Pages | Contenu |
|---------|-------|---------|
| Accueil | 1-2 | Hero + equipe |
| Creations | 3-4 | Portfolio projets |
| Espaces augmentes | 5-8 | Services + partenaires |
| L'Experience Monroe | 9-19 | Spectacle VR, The Play, video |
| Le Roman Graphique | 20-22 | BD Marilyn |
| Installation Interactive | 23-38 | Expo, photos, podcasts, quiz |
| La Serie Marilyn | 39 | Presentation IA |
| XR 360 | 40-41 | Experience VR immersive |
| Voyage autour de moi | 42-44 | Documentaire ados |
| Dessine-moi le vent | 45-47 | Livre RA enfants |
| Ni vues Ni connues | 48-49 | Serie documentaire femmes |
| Marilyn | 50-52 | Spectacle realite mixte |
| Toulouse-Lautrec | 53-54 | Experience Montmartre |
| Charlotte Henschel | 55-56 | Artiste peintre |
| XR Entreprises | 57 | Offre corporate |
| Reservations | 58-59 | Billetterie experiences |
| Informations | 60-61 | Pratique, FAQ, visites privees |
| Contact | 62 | Coordonnees |

## Sources de verite

| Source | Chemin |
|--------|--------|
| Maquettes | `src/pages-extracted/page-N/page-N-screenshot.png` |
| Texte | `src/pages-extracted/page-N/texte-page-N.md` |
| Images | `src/pages-extracted/page-N/page-N-image-*.jpg` |
| Export HD | `EXPORT_HD/EXPORT_JPG/Site_export_JPGN.jpg` |

## Accessibilite (WCAG 2.2 AA)

- Structure HTML5 semantique (sections, headings, aria-labels)
- Alt text sur toutes les images
- Contraste 4.5:1 texte normal, 3:1 texte large
- Navigation clavier
- Controles video accessibles (play/pause, son)

## Documentation

- `CLAUDE.md` : memoire projet et workflow d'integration
- `GUIDELINES-TEMPLATES.md` : conventions CSS/HTML, archetypes de layout, table des classes
- `ENSEIGNEMENTS-PAGES.md` : lecons apprises, erreurs recurrentes, methodologie d'audit
- `ROADMAP.md` : etat d'avancement, phase 5 en cours

---

**Derniere mise a jour** : 2026-03-22
