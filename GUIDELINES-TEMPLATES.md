# Guidelines Templates - Swing Digital

Conventions etablies sur les pages 1-8, a suivre pour l'integration des pages 9-62.

---

## 1. Regle fondamentale : Full Viewport

Chaque page/slide occupe 100% du viewport en desktop. En mobile, les pages a contenu dense s'adaptent.

### Desktop (> 768px)

```css
.pageN {
    height: var(--section-height);   /* 100vh, 100dvh si supporte */
    overflow: hidden;
    padding: 0;
}
```

### Mobile (<= 768px) - Pages a contenu dense

Les pages avec grilles, texte long ou images multiples utilisent `min-height` pour eviter la troncature.

```css
@media (max-width: 768px) {
    .pageN {
        height: auto;
        min-height: var(--section-height);
        overflow: visible;
    }
}
```

**Quand utiliser `min-height` en mobile** :
- Archetype B (deux colonnes texte+image) → passe en 1 colonne, contenu s'empile
- Archetype E (grille de logos) → grille se reorganise, peut depasser 100vh
- Toute page ou le contenu empile depasse le viewport

**Quand garder `height` fixe** :
- Archetype A (hero) → layout controle par grid areas
- Archetype D (image plein ecran) → image cover, pas de contenu textuel
- Pages avec peu de contenu qui tient dans le viewport

**Pages existantes utilisant `min-height` en mobile** : 2 (team), 3, 4 (creations), 8 (partenaires)

---

## 2. Nommage CSS (BEM + prefixe page)

Chaque page a un prefixe unique. Les elements suivent la convention BEM.

### Format

```
.pageN                        /* Block (la section) */
.pageN__element               /* Element */
.pageN__element--modifier     /* Modifier */
```

### Exemples existants

| Page | Prefixe | Classe racine |
|------|---------|---------------|
| 1 | `hero-page1` | `.hero-page1` |
| 2 | `team` | `.section.team` |
| 3-4 | `page3` | `.page3` |
| 5 | `page5` | `.page5` |
| 6 | `page6` | `.page6` |
| 7 | `full-image-page` | `.full-image-page` |
| 8 | `partners-page` | `.partners-page` |
| 9 | `page9` | `.page9` |
| 10 | `page10` | `.page10` |
| 11 | `page11` | `.page11` |
| 12 | `page12` | `.page12` |
| 13 | `page13` | `.page13` |

### Convention pour les nouvelles pages

```
.page9          → .page9__container, .page9__title, .page9__image
.page10         → .page10__container, .page10__title, .page10__grid
```

Si la page a un role semantique clair, preferer un nom descriptif :
```
.booking-page   → .booking-page__form, .booking-page__cta
.contact-page   → .contact-page__map, .contact-page__info
```

---

## 3. Variables CSS obligatoires

Ne jamais hardcoder ces valeurs. Toujours utiliser les variables.

### Hauteur viewport

```css
var(--section-height)           /* 100vh, override 100dvh via @supports */
```

La variable `--section-height` est definie dans `:root` puis surchargee :

```css
:root {
    --section-height: 100vh;
}
@supports (height: 100dvh) {
    :root {
        --section-height: 100dvh;
    }
}
```

**Toujours utiliser `var(--section-height)`** au lieu de `100vh` directement. Cela garantit le support de `dvh` (dynamic viewport height) sur mobile, qui prend en compte la barre d'adresse du navigateur.

### Couleurs

```css
/* Marque */
var(--color-brand)          /* #E8494B - rouge principal (fonds decoratifs, NON pour texte) */
var(--color-brand-btn)      /* #CE3B3D - rouge conforme WCAG AA 4.86:1 sur blanc */
var(--color-brand-light)    /* #F49C9E */
var(--color-brand-pale)     /* #FFB3A7 */
var(--color-brand-alt)      /* #CE3B3D - endpoint clair du gradient (etait #FF8080, non conforme) */
var(--color-white)          /* #ffffff */

/* Gradients */
var(--gradient-brand)       /* #B93539 (5.78:1) → #CE3B3D (4.86:1) - WCAG AA a tous les points */
var(--gradient-hero)        /* rouge → rose pale 135deg (page 1 uniquement, texte large) */
```

**Regle contraste WCAG AA** :
- `--color-brand` (#E8494B) : ratio 3.83:1 sur blanc → **insuffisant pour du texte**
- `--color-brand-btn` (#CE3B3D) : ratio 4.86:1 sur blanc → **conforme WCAG AA**
- `--gradient-brand` : les DEUX endpoints passent 4.5:1 (5.78:1 et 4.86:1)
- Utiliser `--color-brand-btn` pour tout element texte blanc sur fond rouge (boutons, badges, tags)
- Utiliser `--color-brand` uniquement pour les fonds decoratifs sans texte dessus (ex: partners-page)

### Espacement responsive

```css
var(--slide-pad-x)          /* Padding horizontal (2rem → 1rem) */
var(--slide-pad-y)          /* Padding vertical (2rem → 1rem) */
var(--grid-gap)             /* Gap grilles (1rem → 0.5rem) */
var(--grid-gap-sm)          /* Gap petit (0.5rem → 0.3rem) */
var(--edge-offset)          /* Marge elements absolus (20px) */
```

### Typographie responsive

```css
var(--fs-slide-title)       /* Titres : clamp(1.5rem, 4vw, 2.5rem) */
var(--fs-slide-subtitle)    /* Sous-titres : clamp(0.95rem, 2.5vw, 1.2rem) */
var(--fs-slide-body)        /* Corps : clamp(0.8rem, 1.5vw, 0.9rem) */
var(--fs-slide-meta)        /* Meta : clamp(0.7rem, 1.3vw, 0.85rem) */
var(--fs-slide-small)       /* Petit : 0.75rem */
```

### Polices

```css
var(--font-primary)         /* Brandon - titres, headings */
var(--font-secondary)       /* Fragen - corps, sous-titres */
```

---

## 4. Archetypes de layout

8 templates de base couvrent tous les cas de la maquette.

### A. Hero (plein ecran, elements absolus)

Utilise pour : pages d'accueil, pages d'introduction.

```html
<section id="page-N" class="pageN" aria-labelledby="pageN-title">
    <div class="pageN__background"></div>
    <div class="pageN__logo">...</div>
    <div class="pageN__title-group">
        <h2 id="pageN-title">TITRE</h2>
    </div>
    <img src="..." alt="..." class="pageN__image">
</section>
```

```css
.pageN {
    position: relative;
    height: var(--section-height);
    overflow: hidden;
}
.pageN__background {
    position: absolute;
    inset: 0;
    background: var(--gradient-brand);
    z-index: 0;
}
/* Elements positionnes en absolute avec var(--edge-offset) */
```

**Responsive mobile (768px)** : Remplacer le positionnement absolu par CSS Grid avec `grid-template-areas` :

```css
@media (max-width: 768px) {
    .pageN {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
            "logo    nav"
            "content content"
            "links   social";
        padding: var(--slide-pad-x);
    }
}
```

**Reference** : Page 1

### B. Deux colonnes (texte + image)

Utilise pour : pages de contenu avec image laterale.

```html
<section id="page-N" class="pageN" aria-labelledby="pageN-title">
    <div class="pageN__container">
        <div class="pageN__left">
            <!-- Texte -->
        </div>
        <div class="pageN__right">
            <!-- Image ou galerie -->
        </div>
    </div>
</section>
```

```css
/* Desktop */
.pageN {
    height: var(--section-height);
    overflow: hidden;
    padding: 0;
}
.pageN__container {
    display: grid;
    grid-template-columns: 70% 30%;  /* ou 50% 50%, 60% 40% */
    gap: 0;
    height: 100%;
}
```

**Variante inversee** : ajouter `--inverted` pour inverser l'ordre.

```css
.pageN__container--inverted {
    grid-template-columns: 30% 70%;
}
```

**Responsive mobile (768px)** : Passage en 1 colonne, image en haut.

```css
@media (max-width: 768px) {
    .pageN {
        height: auto;
        min-height: var(--section-height);
        overflow: visible;
    }
    .pageN__container,
    .pageN__container--inverted {
        grid-template-columns: 1fr;
        height: auto;
        min-height: var(--section-height);
    }
    /* Layout normal : reordonner pour image en premier */
    .pageN__container:not(.pageN__container--inverted) > .pageN__right {
        order: -1;
    }
    /* Layout inverse : HTML deja dans le bon ordre (image puis texte) */
}
```

**Reference** : Pages 3, 4, 6

### C. Image centree (header + image + footer)

Utilise pour : mise en valeur d'une image avec contexte.

```html
<section id="page-N" class="pageN" aria-labelledby="pageN-title">
    <div class="pageN__container">
        <div class="pageN__header">
            <h2 id="pageN-title">TITRE</h2>
            <div class="pageN__badge">Badge</div>
        </div>
        <div class="pageN__image-wrapper">
            <img src="..." alt="..." class="pageN__image">
        </div>
        <div class="pageN__footer">
            <p class="pageN__subtitle">Sous-titre</p>
        </div>
    </div>
</section>
```

```css
.pageN__container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: var(--section-height);
    padding: var(--slide-pad-y) var(--slide-pad-x);
}
.pageN__image-wrapper {
    flex: 1;
    min-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.pageN__image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}
```

**Responsive mobile (768px)** : L'image utilise `contain` a tous les breakpoints. Le `min-height: 0` sur le wrapper est critique pour le containment flex.

**Reference** : Page 5

### D. Image plein ecran

Utilise pour : pages immersives, transitions visuelles.

```html
<section id="page-N" class="full-image-page" aria-label="Description de la scene">
    <img src="..." alt="..." class="full-image-page__image">
</section>
```

```css
.full-image-page {
    position: relative;
    width: 100%;
    height: var(--section-height);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}
.full-image-page__image {
    width: 100%;
    height: 100%;
    object-fit: cover;  /* EXCEPTION UNIQUE : cover autorise ici */
    display: block;
}
```

**Note** : C'est le SEUL archetype utilisant `object-fit: cover`. Tous les autres utilisent `object-fit: contain`.

**Reference** : Page 7

### E. Grille de logos / elements

Utilise pour : partenaires, portfolios, galeries d'elements.

```html
<section id="page-N" class="pageN" aria-labelledby="pageN-title">
    <div class="pageN__container">
        <h2 id="pageN-title">TITRE</h2>
        <div class="pageN__grid" role="region" aria-label="Description grille">
            <div class="pageN__item">
                <img src="..." alt="..." class="pageN__logo">
            </div>
            <!-- ... -->
        </div>
    </div>
</section>
```

```css
.pageN__container {
    min-height: var(--section-height);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: var(--slide-pad-y) var(--slide-pad-x);
}
.pageN__grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: var(--grid-gap);
    width: 100%;
    max-width: 1100px;
}
```

**Responsive mobile** : La grille se reorganise automatiquement. Utiliser `min-height` (pas `height`) pour que le contenu s'adapte.

**Reference** : Pages 2, 8

### F. Grille de cartes projets

Utilise pour : pages catalogue avec image de fond plein ecran + overlay gradient + grille 2x2 de cartes cliquables avec image cover.

```html
<section id="page-N" class="pageN" aria-labelledby="pageN-title">
    <div class="pageN__background"></div>
    <div class="pageN__container">
        <div class="pageN__header">
            <div class="pageN__hashtags"><p>#TAG1 #TAG2</p></div>
            <div class="pageN__badge">Badge</div>
        </div>
        <div class="pageN__intro">
            <h2 id="pageN-title">Titre</h2>
        </div>
        <div class="pageN__grid" role="region" aria-label="Description">
            <a href="#" class="pageN__card">
                <img src="..." alt="..." class="pageN__card-image">
                <h3 class="pageN__card-title">TITRE CARTE</h3>
            </a>
            <!-- ... -->
        </div>
    </div>
</section>
```

```css
.pageN {
    position: relative;
    height: var(--section-height);
    overflow: hidden;
}
.pageN__background {
    position: absolute;
    inset: 0;
    background: url('...') center/cover;
    z-index: 0;
}
.pageN__background::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--gradient-hero);
    opacity: 0.75;
    mix-blend-mode: multiply;
}
.pageN__container {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    color: var(--color-white);
    /* PAS de background-color : le container est transparent
       pour laisser voir l'image de fond + overlay */
}
.pageN__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4px;
    flex: 1;
    min-height: 0;
    padding: 0 var(--slide-pad-x);  /* Marges laterales : fond visible sur les cotes */
}
.pageN__card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;  /* Exception : cartes-projets dans conteneur fixe */
}
.pageN__card-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: var(--color-white);
    text-decoration: underline;
    text-underline-offset: 4px;
}
```

**Notes** :
- Les cartes-projets utilisent `object-fit: cover` (comme les portraits team et archetype D) car les images doivent remplir uniformement la carte.
- Le container est transparent (pas de `background-color`) pour laisser voir l'image de fond avec overlay gradient.
- Les titres de cartes sont centres (top/left 50% + transform), texte blanc seul sans fond.
- **Variante sans header** : la grille peut occuper tout le viewport (header/intro optionnels). Utiliser `<h2 class="sr-only">` pour l'accessibilite.

**Reference** : Pages 9, 10

### G. Video plein ecran (iframe cover)

Utilise pour : pages video immersives en boucle, transitions visuelles.

```html
<section id="page-N" class="pageN" aria-label="Description de la video">
    <div class="pageN__video-wrapper">
        <iframe id="vimeo-ID" src="https://player.vimeo.com/video/ID?h=HASH&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0"
                title="Description accessible"
                allow="autoplay; fullscreen; picture-in-picture"
                allowfullscreen></iframe>
    </div>
    <div class="pageN__controls">
        <button class="pageN__play-btn" aria-label="Lecture" aria-pressed="true" type="button">
            <!-- SVG pause (pressed=true) / play (pressed=false) -->
        </button>
        <button class="pageN__sound-btn" aria-label="Son" aria-pressed="false" type="button">
            <!-- SVG mute (pressed=false) / ondes (pressed=true) -->
        </button>
    </div>
</section>
<!-- Vimeo Player SDK (avant main.js) -->
<script src="https://player.vimeo.com/api/player.js"></script>
```

```css
.pageN {
    position: relative;
    height: var(--section-height);
    overflow: hidden;
    background-color: #000;
}
.pageN__video-wrapper {
    position: absolute;
    inset: 0;
    z-index: 1;
}
/* Technique cover pour iframe : dimensionner plus grand que le viewport
   et centrer avec translate. overflow:hidden du parent coupe l'excedent.
   PAS de pointer-events:none (bloque l'API Vimeo postMessage). */
.pageN__video-wrapper iframe {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 177.78vh;    /* 100vh * 16/9 */
    height: 100vh;
    min-width: 100%;
    min-height: 100%;
    border: 0;
}
.pageN__controls {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    z-index: 10;       /* Au-dessus de l'iframe (z-index: 1) */
    display: flex;
    gap: 0.75rem;
}
```

**Notes** :
- Parametres Vimeo : `autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0`. Ne PAS utiliser `background=1` (bloque l'API Player pour le volume).
- Boutons custom play/pause + son via Vimeo Player SDK. Le JS toggle `aria-pressed` sur chaque bouton.
- Ne PAS mettre `pointer-events: none` sur l'iframe (bloque `postMessage` necessaire au SDK Vimeo). Les boutons sont cliquables grace au `z-index: 10` au-dessus du wrapper `z-index: 1`.
- La technique scaling + translate est inheritement responsive (couvre paysage ET portrait sans media queries).
- `background-color: #000` sur la section = fallback pendant le chargement.
- `aria-label` sur la section (pas `aria-labelledby`) car pas de `<h2>` visible.

**Accessibilite boutons toggle (WCAG)** :
- `aria-label` fixe = identifie la fonction ("Lecture", "Son")
- `aria-pressed` = communique l'etat (true/false)
- Le CSS utilise `[aria-pressed="true/false"]` pour afficher la bonne icone
- Lecteur d'ecran annonce : "Lecture, bouton bascule, active/inactive"
- Taille minimum 48x48px (cible tactile WCAG 2.5.8)

**Reference** : Page 11

### H. Affiche / poster avec disclosure

Utilise pour : pages de presentation d'un projet avec affiche centree, citations presse cachees, et barre de logos partenaires.

```html
<section id="page-N" class="pageN" aria-labelledby="pageN-title">
    <div class="pageN__background"></div>
    <div class="pageN__container">
        <div class="pageN__badge">Badge</div>
        <figure class="pageN__poster" aria-labelledby="pageN-fig-desc">
            <img src="..." alt="..." class="pageN__poster-image">
            <figcaption class="pageN__poster-caption">
                <span id="pageN-fig-desc" class="sr-only">Description textuelle de l'image</span>
                <h2 id="pageN-title" class="sr-only">Titre</h2>
                <button class="pageN__disclosure-btn" type="button"
                        aria-expanded="false" aria-controls="pageN-quotes"
                        data-label-show="Voir les citations"
                        data-label-hide="Masquer les citations">
                    Voir les citations
                </button>
                <div id="pageN-quotes" class="pageN__quotes" hidden>
                    <ul class="pageN__quotes-list">
                        <li><blockquote><p>Citation</p><footer>-- <cite>Source</cite></footer></blockquote></li>
                    </ul>
                </div>
                <noscript><!-- Meme contenu sans hidden --></noscript>
            </figcaption>
        </figure>
        <div class="pageN__logos" role="region" aria-label="Partenaires">
            <div class="pageN__logos-bar">
                <img src="..." alt="..." class="pageN__logo">
            </div>
        </div>
    </div>
</section>
```

```css
.pageN {
    position: relative;
    height: var(--section-height);
    overflow: hidden;
    background-color: #000;
}
.pageN__background {
    position: absolute;
    inset: 0;
    background: url('...') center/cover;
    z-index: 0;
    opacity: 0.4;  /* Image assombrie pour contraste */
}
.pageN__container {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    color: var(--color-white);
}
.pageN__poster {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;  /* Contenir le contenu disclosure */
}
.pageN__poster-image {
    flex: 1;
    min-height: 0;  /* Permet a l'image de se reduire quand disclosure s'ouvre */
    max-width: 50%;
    object-fit: contain;
}
.pageN__poster-caption {
    flex-shrink: 0;
    max-height: 40vh;   /* Limite la zone citations */
    overflow-y: auto;   /* Scroll si necessaire */
}
.pageN__logos {
    background-color: var(--color-white);
    padding: 1rem var(--slide-pad-x);
}
.pageN__logos-bar {
    display: grid;
    grid-template-columns: repeat(6, 1fr);  /* 6 par ligne = 2 lignes pour 12 logos */
    gap: 0.8rem 1.5rem;
    align-items: center;
    justify-items: center;
}
.pageN__logo {
    height: 2.5rem;
    object-fit: contain;
    mix-blend-mode: multiply;  /* Fond logo fusionne dans le blanc */
}
/* Modifier pour logos sur fond sombre necessitant inversion */
.pageN__logo--invert {
    filter: invert(1);
    mix-blend-mode: normal;
}
```

**Notes** :
- **Figure/figcaption complexe** : quand un `<figcaption>` contient du contenu interactif (boutons, listes), isoler le texte descriptif dans un `<span id="...">` et utiliser `aria-labelledby` sur `<figure>` pointant vers ce span. Cela evite la "pollution du nom accessible" (concatenation des labels de boutons avec la legende). Ne pas utiliser `role="group"` sur `<figure>` (ecrase le role natif `figure`).
- **Disclosure** : pattern W3C ARIA APG (`aria-expanded` + `aria-controls` + `hidden`). Le JS generique dans `main.js` (`initDisclosure`) gere tous les boutons. Le texte du bouton change entre les deux etats via `data-label-show` / `data-label-hide`.
- **Poster** : `overflow: hidden` sur le poster, `flex: 1; min-height: 0` sur l'image pour qu'elle se reduise quand les citations s'ouvrent. Caption avec `max-height: 40vh; overflow-y: auto`.
- **Logos** : grille CSS `repeat(6, 1fr)` pour repartition equilibree sur 2 lignes. `mix-blend-mode: multiply` fusionne les fonds colores des JPG dans le blanc. Modifier `--invert` pour les logos sur fond sombre.
- **Responsive mobile (768px)** : section passe en `height: auto; min-height: var(--section-height); overflow: visible`, caption sans max-height, grille logos en 4 colonnes puis 3 a 480px.
- `<noscript>` fallback affiche les citations sans JS.
- Preferer les versions `./img/partners/` des logos (PNG/SVG) aux JPG extraits du PDF quand disponibles.

**Reference** : Page 12

---

### I. Bandeau de cartes numerotees

**Description** : Titre section + rangee horizontale de N cartes. Chaque carte = image cover + numero decoratif en surimpression + zone texte avec fond colore (image gradient ou couleur solide).

```css
.pageN {
    height: var(--section-height);
    overflow: hidden;
    background-color: var(--color-white);
}
.pageN__container {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: var(--slide-pad-y) var(--slide-pad-x);
}
.pageN__cards {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
    flex: 1;
    min-height: 0;
}
.pageN__card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.pageN__card-image-wrapper {
    position: relative;
    flex: 1;
    min-height: 0;
}
.pageN__card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;  /* Exception : cartes bandeau dans conteneur fixe */
    display: block;
}
.pageN__card-number {
    position: absolute;
    bottom: 0.5rem;
    left: 0.8rem;
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: 300;
    color: var(--color-white);
    line-height: 1;
    font-style: italic;
    opacity: 0.9;
}
.pageN__card-body {
    padding: 0.8rem;
    text-align: center;
    background-size: cover;
    background-position: center;
    color: var(--color-white);
}
.pageN__card-title {
    font-size: clamp(0.75rem, 1.2vw, 1rem);
    font-weight: 700;
    margin: 0;
    color: var(--color-white);
}
```

**Notes** :
- Les cartes bandeau utilisent `object-fit: cover` (comme les portraits team, archetype D et archetype F) car les images doivent remplir uniformement la carte.
- Les fonds de `card-body` sont soit une image gradient (`background-image` inline), soit une couleur solide (modifier `--dark`, `--pink`, etc.).
- Les numeros sont decoratifs (`aria-hidden="true"`), en surimpression sur l'image.
- **Responsive** : 768px passe en `repeat(3, 1fr)`, 480px en `repeat(2, 1fr)`.

**Reference** : Page 13

---

## 5. Images

### Regle object-fit - UNIVERSELLE

**Regle par defaut : `object-fit: contain`** sur toutes les images, y compris en responsive mobile.

| Contexte | Propriete | Raison |
|----------|-----------|--------|
| Image dans un conteneur | `object-fit: contain` | Pas de recadrage, image complete |
| Image en responsive mobile | `object-fit: contain` | Meme regle, pas de cover en mobile |
| Image plein ecran (archetype D) | `object-fit: cover` | **Seule exception** : remplir le viewport |
| Portrait carre (team) | `object-fit: cover` + `aspect-ratio` | Cadrage portrait dans format fixe |
| Carte-projet (archetype F) | `object-fit: cover` | Remplir uniformement la carte |
| Carte bandeau (archetype I) | `object-fit: cover` | Remplir uniformement la carte |
| Logo / icone | `object-fit: contain` | Garder les proportions |

### Reference par page existante

| Page | Composant | object-fit | Justification |
|------|-----------|-----------|---------------|
| 1 | Hero decoration | `contain` | Image non recadree |
| 2 | Portraits team | `cover` + `aspect-ratio: 1/1` | Cadrage portrait carre |
| 3/4 | Collages galerie | `contain` | Collage complet visible |
| 5 | Scene immersive | `contain` | Image complete visible |
| 6 | Photo groupe | `contain` | Image complete visible |
| 7 | Plein ecran | `cover` | **Seule exception** (archetype D) |
| 8 | Logos partenaires | `contain` | Proportions logos preservees |
| 9 | Cartes-projets | `cover` | Remplir uniformement la carte (archetype F) |
| 10 | Cartes-projets | `cover` | Idem page 9 (archetype F sans header) |
| 12 | Affiche poster | `contain` | Affiche centree sans recadrage (archetype H) |
| 12 | Logos partenaires | `contain` | Proportions logos preservees |
| 13 | Cartes images | `cover` | Remplir uniformement la carte (archetype I) |

### INTERDIT en responsive

```css
/* INTERDIT : jamais de cover en media query mobile */
@media (max-width: 768px) {
    .pageN__image {
        object-fit: cover;  /* NON - recadrage non desire */
    }
}

/* CORRECT : contain a tous les breakpoints */
.pageN__image {
    object-fit: contain;  /* Desktop ET mobile */
}
```

### Alt text

- **Maximum 80 caracteres** (outils a11y signalent au-dela)
- Decrire le contenu visuel de facon concise
- Format : `[Sujet] [Action/Contexte]`

```html
<!-- BON (concis, < 80 chars) -->
alt="Femme enveloppee de tissu blanc fluide sur fond rose corail degrade"

<!-- MAUVAIS (trop long) -->
alt="Portrait artistique d'une femme enveloppee de tissu blanc fluide
sur un fond rose corail degrade, symbolisant les experiences sensorielles
immersives et creatives proposees par Swing Digital"

<!-- MAUVAIS (non descriptif) -->
alt="Image hero"
alt="photo.jpg"
```

### Chemins images

```
./img/hero/           → Images hero page 1
./img/pages/page-N/   → Images specifiques a la page N
./img/partners/        → Logos partenaires
```

---

## 6. Responsive : 4 breakpoints

Les breakpoints sont definis en cascade descendante (desktop-first dans les media queries).

| Breakpoint | Variable | Cible |
|------------|----------|-------|
| > 1200px | `--breakpoint-xl` | Desktop large |
| <= 1024px | `--breakpoint-lg` | Desktop petit / tablet paysage |
| <= 768px | `--breakpoint-md` | Tablet portrait |
| <= 480px | `--breakpoint-sm` | Mobile |

### Strategie : variables en cascade

Les variables responsive (`--slide-pad-x`, `--grid-gap`, etc.) sont redefinies au niveau `:root` dans la section `2b. RESPONSIVE VARIABLE OVERRIDES`. Les pages n'ont **pas besoin** de repeter ces valeurs dans leurs propres media queries.

```css
/* CORRECT : utiliser la variable, elle se cascade automatiquement */
.pageN__container {
    padding: var(--slide-pad-y) var(--slide-pad-x);
    gap: var(--grid-gap);
}

/* INCORRECT : hardcoder des valeurs par breakpoint */
@media (max-width: 768px) {
    .pageN__container {
        padding: 1.2rem;  /* NON - utiliser la variable */
    }
}
```

### Strategie mobile pour les layouts multi-colonnes

A **768px**, les layouts 2 colonnes passent en **1 colonne** :

```css
@media (max-width: 768px) {
    /* 1. Section : min-height au lieu de height */
    .pageN {
        height: auto;
        min-height: var(--section-height);
        overflow: visible;
    }

    /* 2. Grid : 1 colonne */
    .pageN__container {
        grid-template-columns: 1fr;
        height: auto;
    }

    /* 3. Image en premier (reorder si necessaire) */
    .pageN__container > .pageN__right {
        order: -1;
    }

    /* 4. Image : contain, hauteur auto */
    .pageN__image {
        width: 100%;
        height: auto;
        object-fit: contain;
    }

    /* 5. Texte : overflow visible, tailles lisibles */
    .pageN__left {
        overflow: visible;
        height: auto;
    }
}
```

### Quand ecrire un media query specifique a la page

Uniquement pour les changements de **structure** (pas d'espacement) :

```css
/* BON : changement de layout structurel */
@media (max-width: 768px) {
    .pageN__container {
        grid-template-columns: 1fr;  /* Passer en une colonne */
    }
}

/* MAUVAIS : changer du padding (deja gere par les variables) */
@media (max-width: 768px) {
    .pageN__container {
        padding: 1rem;
    }
}
```

---

## 7. Contraste WCAG AA

### Regle : ratio minimum 4.5:1 pour le texte normal

Tout texte sur fond colore doit atteindre un ratio de contraste de 4.5:1 (texte normal) ou 3:1 (texte large >= 18.5px bold / 24px normal).

### Variables couleurs et contraste

| Variable | Hex | Ratio sur blanc | Usage |
|----------|-----|----------------|-------|
| `--color-brand` | #E8494B | 3.83:1 | Fonds decoratifs uniquement (pas de texte blanc dessus) |
| `--color-brand-btn` | #CE3B3D | 4.86:1 | Boutons, badges, conteneurs texte, background-color fallback |

### Regle 1 : Toujours coupler `background-color` et `color`

Les outils d'accessibilite comparent `color` et `background-color` de chaque element. Si `color` n'est pas defini, ils utilisent le noir par defaut du body (#000 sur #CE3B3D = 4.32:1, FAIL).

```css
/* CORRECT : toujours les deux */
.pageN__container {
    background-color: var(--color-brand-btn);
    color: var(--color-white);
}

/* INCORRECT : manque color → outil voit noir sur rouge */
.pageN__container {
    background-color: var(--color-brand-btn);
    /* color manquant → #000000 par defaut → 4.32:1 FAIL */
}
```

### Regle 2 : background-color explicite sur les elements texte

Les outils a11y ne traversent PAS toujours le DOM pour trouver le `background-color` d'un ancetre. Chaque element texte dans un conteneur a fond colore doit avoir son propre `background-color`.

```css
/* CORRECT : background-color explicite sur l'element texte */
.pageN__meta {
    background-color: var(--color-brand-btn);
}

/* INCORRECT : compter sur l'heritage CSS (background-color n'herite PAS) */
.pageN__container {
    background-color: var(--color-brand-btn);
}
.pageN__meta {
    /* pas de background-color → outil voit #ffffff → ratio 1:1 FAIL */
}
```

**Note** : `background-color: inherit` ne fonctionne PAS non plus car il herite du parent direct (qui peut etre `transparent`), pas du premier ancetre colore.

### Regle 3 : Pas de `background: transparent` sur les conteneurs texte

Le shorthand `background: transparent` bloque la traversee DOM des outils a11y. Soit le supprimer, soit le remplacer par `background-color: var(--color-brand-btn)`.

### Regle 4 : Gradients et background-color fallback

Les outils calculent le contraste sur le point le PLUS CLAIR du gradient. Le gradient `--gradient-brand` (#B93539 → #CE3B3D) passe 4.5:1 a tous les points. Ajouter toujours un `background-color` solide apres le gradient.

```css
/* CORRECT : gradient + fallback */
.pageN__container {
    background: var(--gradient-brand);
    background-color: var(--color-brand-btn);
    color: var(--color-white);
}
```

### Regle 5 : Tailles de texte minimales

| Contexte | Minimum | Raison |
|----------|---------|--------|
| Corps de texte, meta | 0.9rem (14.4px) | Lisibilite sur ecran |
| Badges, tags | 0.9rem (14.4px) | Coherence visuelle |
| Titres section | 1rem (16px) | Hierarchie visuelle |
| Mobile (480px) | 0.7rem (11.2px) | Seuil absolu minimum |

### Verification

Avant chaque commit, verifier le contraste des elements texte sur fond colore :
- Outil en ligne : webaim.org/resources/contrastchecker
- Tanaguru (extension navigateur, detecte les gradients)
- Verifier aux viewports desktop ET mobile (les tailles changent)

---

## 8. Organisation du fichier CSS

### Structure des sections

```css
/* ============================================================
   PAGE N : NOM DE LA PAGE
   ============================================================ */
```

### Ordre dans le fichier

1. Fonts (@font-face)
2. Variables CSS (:root)
2b. @supports (dvh override)
2c. Responsive variable overrides
3. Reset & base styles
4. Layout containers
9. Footer
10. Accessibility
-- Pages individuelles (ordre croissant) --
-- Responsive par page/groupe --

### Regles pour les nouvelles pages

1. Ajouter la section **apres** la derniere page existante et **avant** les sections responsive
2. Commenter avec le format `PAGE N : NOM`
3. Grouper les media queries responsive a la fin, par page ou par groupe logique
4. Ne pas creer de section responsive si les variables suffisent

---

## 9. Structure HTML

### Template minimal

```html
<section id="page-N" class="pageN" aria-labelledby="pageN-title">
    <div class="pageN__container">
        <h2 id="pageN-title">TITRE DE LA PAGE</h2>
        <!-- Contenu -->
    </div>
</section>
```

### Regles obligatoires

- `id="page-N"` sur chaque section (navigation par ancre)
- `aria-labelledby="pageN-title"` pour l'accessibilite
- Un `<h2>` avec `id` correspondant par section
- `role="region"` + `aria-label` sur les grilles d'images (elements `<div>` uniquement)
- Liens externes : `target="_blank" rel="noopener noreferrer"`
- Void elements sans trailing slash : `<br>` et non `<br/>`
- Pas de `role` redondant sur elements semantiques HTML5 (`<main>`, `<footer>`, `<nav>`, `<header>` ont deja leur role implicite)
- Pas de styles inline injectes par JS (`document.createElement('style')`) — deplacer dans `style.css`

### Hierarchie des titres

```
<h1>  → Un seul dans tout le site (page 1 hero)
<h2>  → Titre principal de chaque section/page
<h3>  → Sous-sections dans une page
<h4>  → Titres de projets, elements de liste
<h5>  → Sous-elements secondaires
```

---

## 10. Interdit / A eviter

| Interdit | Raison | Alternative |
|----------|--------|-------------|
| `!important` | Specificite fragile | Augmenter la specificite du selecteur |
| Couleurs hardcodees | Incoherent, pas maintenable | `var(--color-brand)` etc. |
| `100vh` en dur | Pas de support dvh | `var(--section-height)` |
| `overflow-y: hidden` avec `overflow: hidden` | Redondant | `overflow: hidden` seul |
| Padding/gap hardcode en responsive | Variables existent | `var(--slide-pad-x)` |
| `loading="lazy"` sur images visibles | Empeche le rendu initial | Supprimer l'attribut |
| Code CSS commente | Pollution | Supprimer, git garde l'historique |
| Sections CSS generiques inutilisees | CSS mort | Supprimer avant commit |
| `object-fit: cover` en responsive | Recadrage non desire | `object-fit: contain` |
| `object-fit: cover` (sauf archetype D et portraits) | Recadrage non desire | `object-fit: contain` |
| `--color-brand` pour fond sous texte blanc | Contraste 3.83:1 insuffisant | `--color-brand-btn` (4.86:1) |
| `height` fixe + `overflow: hidden` sur pages denses en mobile | Troncature du contenu | `min-height` + `overflow: visible` |
| Font-size < 0.7rem en mobile | Illisible sur petit ecran | Minimum 0.7rem, preferer les variables `--fs-slide-*` |
| `background-color` sans `color` sur conteneur rouge | Outil voit #000 par defaut → 4.32:1 FAIL | Toujours coupler `background-color` et `color` |
| `background: transparent` sur conteneur texte | Bloque traversee DOM outils a11y | Supprimer ou remplacer par `background-color` explicite |
| `background-color: inherit` sur elements texte | Herite du parent direct (souvent `transparent`) | `background-color: var(--color-brand-btn)` explicite |
| Gradient sans `background-color` fallback | Outils ne detectent pas le gradient | Ajouter `background-color` solide apres `background` |
| `role` redondant sur elements semantiques | `<main>`, `<footer>`, `<nav>` ont deja leur role implicite | Supprimer le `role` |
| `<br/>` (trailing slash sur void elements) | Invalide en HTML5, interfere avec attributs non quotes | `<br>` sans slash |
| Styles inline injectes par JS | Viole CSP `style-src 'self'` | Deplacer dans `style.css` |

---

## 11. Checklist par page

Avant de valider une nouvelle page :

### Structure
- [ ] Section CSS avec commentaire `PAGE N : NOM`
- [ ] Prefixe BEM unique (`.pageN__`)
- [ ] `id="page-N"` pour la navigation
- [ ] `aria-labelledby` sur la section

### Layout
- [ ] `height: var(--section-height)` en desktop (pas `100vh` en dur)
- [ ] `min-height: var(--section-height)` en mobile si contenu dense
- [ ] Variables couleurs utilisees (aucun hardcode)
- [ ] Variables espacement utilisees (`--slide-pad-x/y`, `--grid-gap`)

### Images
- [ ] `object-fit: contain` sur toutes les images (sauf archetype D et portraits)
- [ ] `contain` maintenu en responsive mobile (pas de switch vers `cover`)
- [ ] Alt text descriptif <= 80 caracteres sur chaque image

### Contraste WCAG AA
- [ ] Texte blanc sur fond rouge : utilise `--color-brand-btn` (pas `--color-brand`)
- [ ] Ratio contraste >= 4.5:1 verifie sur tous les elements texte
- [ ] `background-color` ET `color` couples sur chaque conteneur a fond colore
- [ ] `background-color` explicite sur les elements texte (pas d'heritage implicite)
- [ ] Pas de `background: transparent` sur les conteneurs texte
- [ ] Gradient accompagne d'un `background-color` solide fallback

### Responsive
- [ ] Responsive verifie aux 4 breakpoints (1200, 1024, 768, 480)
- [ ] Layout 2 colonnes passe en 1 colonne a 768px
- [ ] Images visibles en entier (pas de crop) a tous les breakpoints
- [ ] Font-size minimum 0.7rem en mobile
- [ ] Pas de scroll vertical non desire

### HTML valide
- [ ] Pas de `role` redondant sur elements semantiques (`<main>`, `<footer>`, `<nav>`)
- [ ] Void elements sans trailing slash (`<br>`, `<img>`, `<input>`)
- [ ] Pas de styles inline injectes par JS

### Technique
- [ ] Pas de `!important`
- [ ] Accolades CSS equilibrees apres ajout

---

## 12. Workflow d'integration

Pour chaque nouvelle page a integrer :

1. **Consulter** la maquette : `src/pages-extracted/page-N/page-N-screenshot.png`
2. **Lire** le texte exact : `src/pages-extracted/page-N/texte-page-N.md`
3. **Identifier** l'archetype de layout (A-E ci-dessus)
4. **Ecrire** le HTML dans `index.html` (section apres la derniere)
5. **Ecrire** le CSS dans `style.css` (section apres la derniere page)
6. **Copier** les images dans `src/img/pages/page-N/`
7. **Verifier** la checklist (section 11)
8. **Tester** avec Puppeteer aux 3 viewports (desktop 1400, tablet 768, mobile 375)
9. **Valider** les accolades CSS (`python3 -c "..."`)
10. **Committer** par page ou groupe de 5 pages
