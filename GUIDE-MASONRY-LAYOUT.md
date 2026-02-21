# Guide Complet: Masonry Layout - Page 3 (5 images)

**Problème actuel** : Espace blanc visible en bas de la galerie
**Cause racine** : `auto-rows: 120px` fixe + spans irréguliers = déséquilibre vertical
**Solution** : CSS Columns ou Grid avec `auto-rows: auto`

---

## 1. Analyse du problème

### Maquette attendue (d'après description)
- **Colonne unique** : 62% de largeur
- **5 images** : proportions variées (carrées, rectangulaires)
- **Aucun gap** : images se touchent
- **Remplissage total** : aucun blanc vertical

### Situation actuelle (MAUVAISE)
```css
.page3__gallery {
    grid-template-columns: repeat(3, 1fr);
    auto-rows: 120px;              /* ← PROBLÈME! */
    grid-auto-flow: dense;
}

.page3__gallery-image:nth-child(1) { grid-row: span 2; }   /* 240px */
.page3__gallery-image:nth-child(2) { grid-row: span 1; }   /* 120px */
.page3__gallery-image:nth-child(3) { grid-row: span 2; }   /* 240px */
.page3__gallery-image:nth-child(4) { grid-row: span 1; }   /* 120px */
.page3__gallery-image:nth-child(5) { grid-row: span 2; }   /* 240px */
/* Total: 920px théorique, mais espace blanc car images != 120px exactement */
```

**Pourquoi ça crée du blanc?**
- `auto-rows: 120px` force chaque ligne à 120px
- Si une image a ratio 4:3, elle ne remplira pas exactement 120px
- Le vide s'accumule → blanc au bas

---

## 2. Solutions Recommandées

### SOLUTION 1: CSS Columns (MEILLEURE pour 1 colonne)

**Meilleur choix** si tu veux vraiment une seule colonne visuelle comme dans la maquette.

```css
.page3__gallery {
    display: grid;
    grid-template-columns: 1fr;  /* Une colonne unique */
    gap: 0px;
    width: 100%;
    column-count: 1;             /* CSS Columns: 1 colonne */
    column-gap: 0;               /* Aucun gap */
}

.page3__gallery-image {
    width: 100%;
    height: auto;                /* ← KEY: dynamique! */
    object-fit: cover;
    display: block;
    break-inside: avoid;         /* Évite rupture d'image dans colonne */
}
```

**Avantages:**
- ✓ Zéro espace blanc (images se suivent naturellement)
- ✓ Images au ratio naturel (pas déformation)
- ✓ Remplissage vertical OPTIMAL
- ✓ Très responsive (marche sur mobile/desktop)
- ✓ Si tu veux 2-3 colonnes plus tard: change juste `column-count: 2` ou `3`

**Inconvénients:**
- ✗ Ordre top-bottom (pas left-right)
- ✗ Moins contrôle sur placement exact

**Quand l'utiliser:** MAINTENANT, pour ta page 3

---

### SOLUTION 2: CSS Grid avec `auto-rows: auto` (Alternative Grid)

Si tu veux garder Grid et le contrôle des spans:

```css
.page3__gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);  /* Ou reste sur 1fr pour 1 colonne */
    gap: 0px;
    width: 100%;
    auto-rows: auto;             /* ← CHANGE DE 120px À auto! */
    grid-auto-flow: dense;
}

.page3__gallery-image {
    width: 100%;
    height: auto;                /* Dynamique */
    object-fit: cover;
    display: block;
}

/* Spans comme avant */
.page3__gallery-image:nth-child(1) { grid-row: span 2; grid-column: span 1; }
.page3__gallery-image:nth-child(2) { grid-row: span 1; grid-column: span 1; }
.page3__gallery-image:nth-child(3) { grid-row: span 2; grid-column: span 2; }
.page3__gallery-image:nth-child(4) { grid-row: span 1; grid-column: span 1; }
.page3__gallery-image:nth-child(5) { grid-row: span 2; grid-column: span 2; }
```

**Avantages:**
- ✓ Meilleur remplissage que 120px fixe
- ✓ Garde le contrôle spans
- ✓ Peut faire multi-colonnes

**Inconvénients:**
- ✗ Peut encore avoir du blanc selon images
- ✗ Plus complexe que Columns

---

## 3. Calcul des hauteurs (CRUCIAL)

### Le secret: Ne Force PAS les hauteurs

Pour un masonry sans blanc, la clé est: **laisser les images dicter leur hauteur**.

```css
/* ✗ MAUVAIS - Crée du blanc */
.page3__gallery-image {
    height: 120px;     /* Fixe! */
    object-fit: cover;
}

/* ✓ BON - Hauteur dynamique */
.page3__gallery-image {
    height: auto;      /* Suit l'image */
    object-fit: cover;
}
```

### Exemple: 5 images différentes

Supposons tes 5 images ont ces proportions:

| Image | Largeur | Ratio | Hauteur auto |
|-------|---------|-------|--------------|
| 1 | 100% | 1:1 (carré) | = largeur |
| 2 | 100% | 16:9 | = 56% largeur |
| 3 | 100% | 4:3 | = 75% largeur |
| 4 | 100% | 1:1 (carré) | = largeur |
| 5 | 100% | 3:2 | = 67% largeur |

**Avec `height: auto`**, chaque image prend sa hauteur naturelle. **Aucun blanc créé**.

---

## 4. Spans vs proportions

### Important: Les spans ne forcent PAS les proportions

```css
.image:nth-child(3) {
    grid-row: span 2;      /* Occupe 2 lignes */
    grid-column: span 2;   /* Occupe 2 colonnes */
    /* Mais la HAUTEUR vient de object-fit: cover + height: auto */
}
```

**Confusion courante:**
- Un span 2×2 n'a PAS une hauteur 2× plus grande
- La hauteur vient de l'image elle-même

### Calcul correct avec object-fit: cover

Si tu veux que l'image 3 soit vraiment 2×2 visuellement:

```css
.page3__gallery-image:nth-child(3) {
    grid-row: span 2;
    grid-column: span 2;
    width: 100%;
    height: 100%;          /* Remplir le span 2×2 */
    object-fit: cover;     /* Redimensionner sans déformation */
}
```

**Mais avec `height: auto`:**
```css
.page3__gallery-image:nth-child(3) {
    grid-row: span 2;
    grid-column: span 2;
    width: 100%;
    height: auto;          /* Hauteur naturelle de l'image */
    object-fit: cover;     /* Coupe si nécessaire */
}
```

La 2e option respecte les proportions et crée moins de blanc.

---

## 5. Code CSS Final Recommandé

### Pour page 3 (1 colonne 62%):

```css
/* ============================================================
   PAGE 3 GALLERY - MASONRY LAYOUT
   ============================================================ */

.page3__gallery {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0px;
    width: 100%;

    /* CSS Columns pour masonry optimal */
    column-count: 1;
    column-gap: 0;
}

.page3__gallery-image {
    width: 100%;
    height: auto;              /* ← KEY: dynamique */
    object-fit: cover;
    display: block;
    margin-bottom: 0;
    break-inside: avoid;       /* Évite rupture image dans colonne */
}

/* Responsive: passer à 2 colonnes sur tablet */
@media (max-width: 768px) {
    .page3__gallery {
        column-count: 2;
        column-gap: 0;
    }
}

/* Sur mobile: 1 colonne */
@media (max-width: 480px) {
    .page3__gallery {
        column-count: 1;
    }
}
```

---

## 6. Alternative: Grid avec auto-rows

Si tu veux rester sur Grid (meilleur contrôle):

```css
.page3__gallery {
    display: grid;
    grid-template-columns: 1fr;  /* 1 colonne pour matcher maquette */
    gap: 0px;
    width: 100%;
    auto-rows: auto;             /* ← CHANGE! */
    grid-auto-flow: dense;
}

.page3__gallery-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
}

/* Pas de spans si 1 colonne */
/* Spans utilisés seulement si grid-template-columns: repeat(3, 1fr) */
```

---

## 7. Testing et validation

### Checklist pour vérifier:

- [ ] **Aucun blanc vertical**: Scroll jusqu'au bout, pas d'espace vide
- [ ] **Images adjacentes**: Se touchent parfaitement (gap: 0)
- [ ] **Ratio naturel**: Images pas déformées
- [ ] **Responsive**: Marche sur mobile (redimensionne correctement)
- [ ] **Performance**: Pas de reflow excessif (test DevTools)

### Test rapide en DevTools:

```javascript
// Chrome DevTools Console
const gallery = document.querySelector('.page3__gallery');
const lastImg = gallery.lastElementChild;

// Scroll pour voir la fin
lastImg.scrollIntoView();

// Vérifie: pas de blanc blanc entre lastImg et fin du conteneur
console.log('Hauteur gallery:', gallery.scrollHeight);
console.log('Hauteur dernier img:', lastImg.offsetHeight);
```

---

## 8. Cas d'usage avancés

### Si tu veux 3 colonnes de masonry:

```css
.page3__gallery {
    column-count: 3;
    column-gap: 0;
}
```

**Important:** Avec CSS Columns, les images se distribuent TOP-BOTTOM dans chaque colonne (pas left-right).

### Si tu veux multi-colonne LEFT-RIGHT:

Utilise Grid avec `auto-fit`:

```css
.page3__gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0;
    auto-rows: auto;
}
```

---

## 9. Résumé: Meilleure approche

| Situation | Solution | Code |
|-----------|----------|------|
| **1 colonne (maquette)** | CSS Columns | `column-count: 1; column-gap: 0;` |
| **Multi-colonnes flexible** | CSS Columns | `column-count: 2 ou 3;` |
| **Contrôle spans précis** | Grid auto | `auto-rows: auto; grid-auto-flow: dense;` |
| **Responsive adapté** | Hybride | Columns mobile, Grid desktop |

**Ma recommandation** pour page 3: **CSS Columns**, car:
1. Maquette = 1 colonne
2. Zéro blanc vertical
3. Super responsive
4. Code simple

---

## 10. Ressources CSS

### Documentation MDN:
- [CSS Columns](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Columns)
- [CSS Grid `auto-rows`](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows)
- [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)

### Playground pour tester:
Voir `test-masonry-solutions.html` (dans le dépôt)

---

**Dernière mise à jour**: 2026-02-21
**Auteur**: Claude Code
**Status**: Prêt à implémenter
