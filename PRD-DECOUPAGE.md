# PRD : Découpage multi-pages - Swing Digital

## Contexte

Le site est actuellement un single-page (`index.html`, 62 sections/pages). Le menu de navigation existe sur la page 1 mais n'est pas persistant.

**Objectif** : Découper le site en plusieurs pages HTML avec navigation 3 niveaux, header/footer communs, fil d'Ariane, menu hamburger mobile, RGAA accessible.

**Branche** : `decoupage`

---

## Architecture navigation (3 niveaux)

### Niveau 1 : Menu principal (header persistant)
Accueil | Espaces augmentés | Expériences Séries | Réservations

### Niveau 2 : Pages projet (dans Expériences Séries)
8 projets cliquables depuis la page rubrique (pages 9-10)

### Niveau 3a : Volets Monroe (dans L'Expérience Monroe)
Page 13 = rubrique avec 5 cartes cliquables :
1. Pièce My Story
2. Roman Graphique
3. Installation
4. XR Memory Box
5. Série Marilyn

### Niveau 3b : Catégories Monroe (dans L'Expérience Monroe)
Page 24 = rubrique avec 6 catégories cliquables :
A Photographie | B Composition électroacoustique | C Podcasts | D Interviews | E Expériences interactives | F Le Quiz Marilyn

### Fil d'Ariane (RGAA)
Ex: `Accueil > Expériences Séries > L'Expérience Monroe > C Podcasts`

### Menu hamburger mobile
Menu burger responsive, RGAA accessible (aria-expanded, focus trap, Escape, clavier)

---

## Découpage des pages

### 1. Accueil (`index.html`)

| Page PDF | Contenu |
|----------|---------|
| 1 | Hero (vidéo + nav) |
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
| 9 | Grille 8 vignettes projets (cliquables) |
| 10 | Projets en développement |

#### Projet 1 : L'Expérience Monroe

**Page d'entrée** (`experience-monroe.html`) : pages PDF 11-13, 24

- Page 11 : Vidéo présentation
- Page 12 : Affiche presse + logos
- Page 13 : Rubrique 5 volets (cartes cliquables vers sous-pages)
- Page 24 : Rubrique 6 catégories A-F (cartes cliquables vers sous-pages)

**5 volets (niveau 3a)** — pages HTML séparées :

| Volet | Nom | Pages PDF | Fichier HTML |
|-------|-----|-----------|--------------|
| 1 | Pièce My Story | 14-19 | `monroe-piece.html` |
| 2 | Roman Graphique | 20-22 | `monroe-roman-graphique.html` |
| 3 | Installation | 23 | `monroe-installation.html` |
| 4 | XR Memory Box | (à confirmer) | `monroe-xr-memory-box.html` |
| 5 | Série Marilyn | (à confirmer) | `monroe-serie-marilyn.html` |

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
├── monroe-xr-memory-box.html     (pages à confirmer)
├── monroe-serie-marilyn.html     (pages à confirmer)
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
├── css/style.css
├── js/main.js
├── img/...
└── video/...
```

Total : **23 fichiers HTML**

---

## Éléments communs

### Header (toutes les pages)
- Logo Swing Digital cliquable (retour index.html)
- Menu 4 sections avec état actif (classe CSS `--active`)
- Sous-menu projet si dans Expériences Séries
- Fil d'Ariane RGAA (`<nav aria-label="Fil d'Ariane">` avec `<ol>` et `aria-current="page"`)
- Menu hamburger mobile (aria-expanded, focus trap, Escape ferme)
- Dupliqué dans chaque fichier HTML

### Footer (toutes les pages)
- Copyright 2026
- Liens : Équipe (index.html#page-2), Contact (mailto), Mentions légales (#)
- Dupliqué dans chaque fichier HTML

---

## SEO

Chaque page HTML a :
- `<title>` unique (ex: "L'Expérience Monroe - Swing Digital")
- `<meta name="description">` unique
- `<link rel="canonical">`

---

## Technique

### CSS
Un seul fichier `style.css` pour toutes les pages.

### JS
`main.js` conservé avec guards (`if (!element) return`). Les fonctions spécifiques (hero vidéo, podcast player) ne s'exécutent que si l'élément existe sur la page.

### Chemins relatifs
Tous les fichiers HTML dans `src/` — chemins `./css/`, `./js/`, `./img/` identiques.

---

## Accessibilité RGAA

- Navigation : `<nav aria-label="Navigation principale">`
- Fil d'Ariane : `<nav aria-label="Fil d'Ariane">` avec `<ol>` et `aria-current="page"`
- Hamburger : `<button aria-expanded="false/true" aria-controls="menu-id">`
- Focus trap dans le menu mobile ouvert
- Fermeture Escape
- Skip link "Aller au contenu principal" sur chaque page

---

## Vérification

- Chaque fichier HTML fonctionne indépendamment
- Navigation entre sections fluide
- Menu actif correctement en surbrillance à chaque niveau
- Fil d'Ariane correct sur chaque page
- Footer identique partout
- Vignettes pages 9/10 et 13/24 cliquables vers les bonnes pages
- Hamburger mobile fonctionnel + accessible
- SEO : title/meta uniques
- Responsive testé sur 4 viewports
- Pas de régression visuelle
- Chemins relatifs images/CSS/JS corrects

---

## Connus/Inconnus restants

- **Volets 4 et 5 Monroe** : quelles pages PDF pour XR Memory Box et Série Marilyn ? (pas clairement identifiées dans la maquette)
- **Mapping vignettes page 9** : confirmation de quelle vignette correspond à quel projet
- **Mapping vignettes page 10** : idem
