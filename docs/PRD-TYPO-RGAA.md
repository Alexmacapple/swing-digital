# PRD : Refonte typographie et contrastes RGAA

**Branche** : `cosmetique`
**Priorite** : Haute
**Statut** : VALIDE - pret a executer
**Version** : 5.1

---

## 1. Probleme

### Typographie

252 declarations `font-size` dans style.css :
- **113 hardcodees hors @media** (regles desktop)
- **73 hardcodees dans @media** (responsive)
- 66 utilisent deja des variables
- **1 en `em`** (relative au parent, ligne 306)

Distribution des tailles problematiques (hors @media) :

| Taille | Occurrences | Pixels | Verdict |
|--------|-------------|--------|---------|
| 0.5-0.65rem | 12 | 8-10.4px | ILLISIBLE |
| 0.7rem | 9 | 11.2px | TROP PETIT |
| 0.75rem | 17 | 12px | TROP PETIT |
| 0.8-0.85rem | 23 | 12.8-13.6px | LIMITE |
| 0.9-0.95rem | 14 | 14.4-15.2px | ACCEPTABLE |
| **Total < 0.9rem** | **75** | | **75 declarations a corriger** |

**43 pages** utilisent `height: var(--section-height)` en desktop (=100vh fixe).
**89 conteneurs** avec `overflow: hidden` — texte agrandi peut etre coupe sans indication.
Toutes les `min-height` existantes sont dans des @media mobile — aucune page n'a `min-height` en desktop.

### Heterogeneite des clamp()

Les clamp() actuels ne sont pas uniformes — ils varient par page selon le design :

| Range titre | Variantes existantes | Occurrences |
|-------------|---------------------|-------------|
| Titres | clamp(1.5rem, **3-4vw**, 2-2.5rem) | 18 |
| Titres prominents | clamp(1.8rem, **4-5vw**, 2.8-3rem) | 8 |
| Hero/numeros | clamp(2.5-4rem, **6-10vw**, 5-8rem) | 12 |

Unifier en 1 seule variable par niveau perdrait cette granularite intentionnelle.

### Contrastes RGAA

Ratios calcules avec la formule WCAG 2.1 (luminance relative sRGB linearisee, script Python) :

| Combinaison | Ratio reel | Seuil RGAA | Verdict |
|-------------|-----------|-----------|---------|
| Blanc sur #E8494B (brand) | **3.83:1** | 4.5:1 | ECHEC (~15 pages) |
| #D4A843 (dore) sur blanc | **2.21:1** | 4.5:1 | ECHEC CRITIQUE (~10 pages) |
| #E8C84A (dore vif) sur blanc | **1.64:1** | 4.5:1 | ECHEC CRITIQUE |
| rgba(255,255,255,0.8) sur #E8494B | **~3.1:1** | 4.5:1 | ECHEC (~5 pages) |

---

## 2. Objectifs

1. **Zero font-size hardcode** : 100% en variables CSS (186 → 0)
2. **Plancher 14px** (0.875rem) pour texte lisible, 13px pour credits
3. **Augmentation +15-25%** des tailles corps/captions
4. **Conformite RGAA AA** : ratio 4.5:1 texte normal, 3:1 texte large
5. **Granularite preservee** : les variations de taille par page restent possibles
6. **Zero texte coupe** par overflow:hidden apres augmentation

---

## 3. Systeme de variables a 2 couches

### Invariant : base font-size

```css
html { font-size: 16px; }  /* NE PAS MODIFIER NI VARIABILISER */
```

C'est la reference absolue du systeme rem. Tous les `rem` du site en dependent. Si cette valeur change, TOUTES les tailles changent. Elle reste hardcodee intentionnellement.

### Couche 1 : Echelle de tailles (9 paliers)

Valeurs reutilisables, nommees par taille relative. Chaque palier est un clamp() qui garantit un minimum accessible.

```css
:root {
    --size-2xs: 0.8125rem;                          /* 13px — plancher credits */
    --size-xs:  clamp(0.875rem, 1.3vw, 1rem);       /* 14-16px — captions */
    --size-sm:  clamp(1rem, 1.8vw, 1.125rem);        /* 16-18px — corps */
    --size-md:  clamp(1.125rem, 2.5vw, 1.375rem);    /* 18-22px — sous-titres */
    --size-lg:  clamp(1.5rem, 3vw, 2.2rem);           /* 24-35px — titres compacts */
    --size-xl:  clamp(1.5rem, 3.5vw, 2.5rem);         /* 24-40px — titres standards */
    --size-2xl: clamp(1.75rem, 4.5vw, 3.5rem);        /* 28-56px — titres prominents */
    --size-3xl: clamp(2.5rem, 6vw, 5rem);              /* 40-80px — hero */
    --size-4xl: clamp(4rem, 10vw, 8rem);               /* 64-128px — numeros geants */
}
```

### Couche 2 : Variables semantiques (7 roles)

Aliases vers les tailles, definissent le role typographique. Valeurs par defaut overridables par page.

```css
:root {
    --fs-hero:     var(--size-3xl);   /* numeros, hero — large text garanti */
    --fs-title-xl: var(--size-2xl);   /* titres principaux — large text garanti */
    --fs-title:    var(--size-xl);    /* titres section — large text garanti (min 24px) */
    --fs-subtitle: var(--size-md);    /* sous-titres */
    --fs-body:     var(--size-sm);    /* texte courant */
    --fs-caption:  var(--size-xs);    /* legendes, meta */
    --fs-credit:   var(--size-2xs);   /* credits, copyright */
}
```

### Avantage du systeme 2 couches

Une page qui a besoin d'un titre plus compact ou plus grand peut utiliser directement une taille de la couche 1 :

```css
/* Titre compact (page 32) */
.page32__title { font-size: var(--size-lg); }   /* 24-35px au lieu de 24-40px */

/* Numero geant (pages 20, 23) */
.page20__number { font-size: var(--size-4xl); }  /* 64-128px */
```

Aucun hardcode, granularite preservee, tout reste en variables.

### Retrocompatibilite (alias anciennes variables)

```css
--fs-slide-title:    var(--fs-title);
--fs-slide-subtitle: var(--fs-subtitle);
--fs-slide-body:     var(--fs-body);
--fs-slide-meta:     var(--fs-caption);
--fs-slide-small:    var(--fs-caption);
```

### Mapping des 113 hardcodes desktop

| Valeur actuelle | Variable cible | Occurrences |
|-----------------|---------------|-------------|
| 0.5-0.7rem | `var(--fs-credit)` | ~15 |
| 0.75-0.85rem | `var(--fs-caption)` | ~28 |
| 0.9-0.95rem | `var(--fs-body)` | ~14 |
| 1-1.3rem fixe | `var(--fs-subtitle)` | ~12 |
| 1.2em | `var(--fs-subtitle)` | 1 |
| h1 2rem, h2 1.75rem, h3 1.5rem | `var(--fs-title-xl)`, `var(--fs-title)`, `var(--fs-subtitle)` | 3 |
| clamp(0.8-0.95rem, ...) | `var(--fs-body)` | ~6 |
| clamp(1-1.4rem, ...) | `var(--fs-subtitle)` | ~12 |
| clamp(1.5rem, 3vw, 2-2.2rem) | `var(--size-lg)` | ~6 |
| clamp(1.5rem, 3.5vw, 2.5rem) | `var(--fs-title)` = `var(--size-xl)` | ~6 |
| clamp(1.8rem, 4-5vw, 2.8-3rem) | `var(--fs-title-xl)` ou `var(--size-2xl)` | ~8 |
| clamp(2.5rem, 6vw, 5rem) | `var(--fs-hero)` | ~4 |
| clamp(3rem, 8vw, 5rem) | `var(--size-3xl)` | ~5 |
| clamp(4rem, 8-10vw, 7-8rem) | `var(--size-4xl)` | ~5 |

### Regle @media (73 declarations)

**Supprimer** : si le clamp() de la variable gere deja la reduction et le layout est identique.
**Remplacer par variable** : si le layout change en mobile et une taille specifique est necessaire. Utiliser `var(--size-*)` ou `var(--fs-*)`, jamais de valeur hardcodee.

---

## 4. Systeme de couleurs RGAA

### Palette conforme (ratios verifies par script Python)

```css
:root {
    /* Texte sur fond blanc */
    --color-text:         #2B2B2B;  /* 14.16:1 */
    --color-text-light:   #4A4A4A;  /*  8.86:1 */
    --color-text-red:     #CE3B3D;  /*  4.86:1 — AA normal */
    --color-text-gold:    #7A6100;  /*  5.94:1 — AA normal */

    /* Fond portant du texte blanc */
    --color-bg-red:       #BE2F31;  /*  5.77:1 */
    --color-bg-navy:      #3B3F72;  /*  8.30:1 */
    --color-bg-dark:      #1a2744;  /* 14.00:1 */

    /* Decoratif (PAS de texte normal dessus) */
    --color-brand:        #E8494B;  /*  3.83:1 — large text only ou sans texte */
    --color-brand-gold:   #E8C84A;  /*  1.64:1 — decoratif uniquement */
}
```

### Matrice taille x couleur (RGAA critere 3.2)

| Variable | Min | Large text ? | Couleurs autorisees sur blanc |
|----------|-----|-------------|------------------------------|
| `--fs-hero` | 40px | Toujours | Toutes (3:1 suffit) |
| `--fs-title-xl` | 28px | Toujours | Toutes |
| `--fs-title` | 24px | Toujours | Toutes dont #E8494B |
| `--fs-subtitle` | 18px | **Si bold only** | Bold : toutes. Regular : >= 4.5:1 |
| `--fs-body` | 16px | Non | >= 4.5:1 : --color-text-red, --color-text-gold |
| `--fs-caption` | 14px | Non | >= 4.5:1 |
| `--fs-credit` | 13px | Non | >= 4.5:1 |

**Regle subtitle + bold** : tout element en `--fs-subtitle` avec une couleur < 4.5:1 DOIT avoir `font-weight >= 700`. Verification systematique en phase B4.

### Migration des couleurs

| Ancien | Nouveau | Ratio | Pages |
|--------|---------|-------|-------|
| `#E8494B` fond + texte blanc | `--color-bg-red` | 5.77:1 | 3-6, 8, 44, 47, 54, 57-59, 61 |
| `#E8494B` texte sur blanc | `--color-text-red` | 4.86:1 | Titres rouges |
| `#D4A843` texte sur blanc | `--color-text-gold` | 5.94:1 | 23-32, 37-38 |
| `rgba(255,255,255,0.8-0.9)` sur rouge | `#ffffff` | +contraste | Specs, descriptions |

---

## 5. Pages a risque et strategie de test

### Pages a risque de debordement

43 pages ont `height: var(--section-height)` en desktop. Parmi elles, les pages a contenu dense :

| Page | Contenu | Risque | Action |
|------|---------|--------|--------|
| 60 | 4 sections + 10 puces | CRITIQUE | `height` → `min-height` desktop |
| 61 | 6 Q/R FAQ + intro + aide | CRITIQUE | Idem |
| 58 | Image + desc + tarifs + newsletter | HAUT | Idem |
| 59 | 2 images + desc + newsletter | HAUT | Idem |
| 47 | 5 paragraphes + logos | MOYEN | Surveiller |
| 44 | 6 lignes + prix | MOYEN | Surveiller |
| 12 | Affiche + citations + logos | MOYEN | Surveiller |

Les pages image-only (7, 15, 17, 26) et video (11, 19, 42, 45) ne sont pas a risque.

### Set de test representatif (12 pages)

Plutot que tester 62 pages a chaque etape, verifier ce sous-ensemble couvrant tous les archetypes :

| Page | Archetype | Pourquoi |
|------|-----------|---------|
| 1 | Hero | Gradient + elements absolus |
| 3 | 2 colonnes texte+galerie | Beaucoup de texte small |
| 9 | Grille de cartes | Titres sur images |
| 12 | Affiche + logos | Contenu dense |
| 20 | Volet (numero + titre) | Bande decorative |
| 27 | Galerie IA | Titre dore |
| 35 | Interview overlay | Texte sur photo |
| 40 | 2 colonnes specs | Badge + specs |
| 47 | Texte + galerie + logos | Contenu le plus dense |
| 56 | Tableaux + bio | Texte sur fond rose |
| 58 | Reservation | Formulaire le plus complexe |
| 61 | FAQ | Texte le plus long |

### Checklist de verification visuelle (5 points)

A chaque etape, pour les pages du set de test :

1. **Visible** : tout le texte est affiche, rien coupe par overflow
2. **Pas de chevauchement** : texte ne recouvre pas d'autre texte ou image
3. **Hierarchie** : titre > sous-titre > corps > caption visuellement distinct
4. **Desktop** : la page tient dans le viewport a 1280px
5. **Mobile** : le texte ne deborde pas lateralement a 375px

---

## 6. Plan d'execution

### Phase A : Typographie

**Estimation** : 5-6h (2-3 sessions)

| Etape | Action | Perimetre | Effort | Test |
|-------|--------|-----------|--------|------|
| A0 | `height` → `min-height` pages 58-61 en desktop | 4 selecteurs | 15 min | Pages 58, 61 |
| A1 | Ajouter couche 1 (9 --size-*) + couche 2 (7 --fs-*) + 5 alias dans `:root` | ~25 lignes | 15 min | Grep |
| A2 | Hors @media : tailles < 0.7rem → `var(--fs-credit)` | ~15 regles | 30 min | Pages 27, 35 |
| A3 | Hors @media : 0.75-0.85rem → `var(--fs-caption)` | ~28 regles | 45 min | Pages 40, 58 |
| A4 | Hors @media : 0.9-0.95rem → `var(--fs-body)` | ~14 regles | 25 min | Pages 3, 56 |
| A5 | Hors @media : 1-1.3rem fixe + 1.2em → `var(--fs-subtitle)` | ~13 regles | 20 min | Pages 12, 43 |
| A6 | Hors @media : clamp() sous-titres → `var(--fs-subtitle)` | ~12 regles | 20 min | Page 9 |
| A7 | Hors @media : clamp() titres → `var(--size-lg\|xl\|2xl)` selon granularite | ~20 regles | 30 min | Pages 20, 27, 50 |
| A8 | Hors @media : clamp() hero → `var(--size-3xl\|4xl)` selon granularite | ~9 regles | 15 min | Pages 23, 39 |
| A9 | @media : supprimer si redondant avec clamp(), var() sinon | 73 regles | 75 min | Mobile 375px set de test |
| A10 | Ajustements padding/gap si texte deborde | Variable | 30 min | Set de test complet |
| A11 | Verification : `grep font-size style.css \| grep -v var(--` = 0 | | 10 min | Script |
| A12 | Validation CSS (syntaxe) : 0 erreur de parsing | | 10 min | W3C validator ou `npx stylelint` |

**Commit apres chaque etape. Rollback : `git checkout main -- src/css/style.css`**

### Phase B : Couleurs RGAA

**Estimation** : 2-3h (1 session)

| Etape | Action | Effort | Test |
|-------|--------|--------|------|
| B1 | Ajouter variables couleur dans `:root` | 10 min | Grep |
| B2 | Fonds rouges #E8494B → `var(--color-bg-red)` pour texte blanc | 30 min | Pages 3, 58, 61 |
| B3 | Textes dores #D4A843 → `var(--color-text-gold)` | 20 min | Pages 27, 31 |
| B4 | Verifier subtitles : couleur < 4.5:1 → doit etre bold | 30 min | Grep + verification |
| B5 | rgba < 1 sur fond colore → blanc plein | 15 min | Pages 40, 47 |
| B6 | Audit RGAA final | 30 min | Script Python + accesslint |

---

## 7. Criteres de succes

### Typographie
- [ ] 0 font-size hardcode (tout en `var(--fs-*)` ou `var(--size-*)`)
- [ ] 0 font-size en dessous de 13px a tout viewport >= 375px
- [ ] 0 texte coupe par overflow:hidden
- [ ] 0 texte debordant lateralement
- [ ] Hierarchie visuelle preservee sur les 12 pages du set de test
- [ ] Base `html { font-size: 16px }` intacte
- [ ] 0 erreur de syntaxe CSS (validation W3C/stylelint)

### Couleurs
- [ ] 0 ratio < 4.5:1 sur texte normal
- [ ] 0 ratio < 3:1 sur texte large
- [ ] 0 rgba < 0.9 sur fond colore
- [ ] Tout subtitle couleur < 4.5:1 a font-weight >= 700

### Global
- [ ] Ancien systeme (`--fs-slide-*`) fonctionne via alias
- [ ] Audit RGAA : 0 violation serious+

---

## 8. Risques et mitigations

| Risque | Prob. | Impact | Mitigation |
|--------|-------|--------|-----------|
| Texte coupe par overflow:hidden | Haute | Invisible | A10 : verifier set de test, remplacer overflow si necessaire |
| Texte depasse 100vh | Haute | Layout | A0 : min-height sur 4 pages denses. A10 : ajuster padding |
| Perte de nuance clamp() | Moyenne | Visuel | Systeme 2 couches : var(--size-lg) vs var(--size-xl) preservent la granularite |
| @media supprimes cassent mobile | Moyenne | Mobile | A9 : regle claire + test 375px sur set de test |
| Dore #7A6100 trop fonce | Moyenne | Visuel | Fallback #8B6914 (5.09:1) si trop sombre |
| Subtitle non-bold + couleur faible | Moyenne | RGAA | B4 : verification systematique |
| +25% body text change l'esthetique | Faible | Design | Decision consciente : accessibilite > esthetique editoriale |
| Fond #BE2F31 vs #E8494B | Faible | Subtil | Delta -10% luminosite |

---

## 9. Reference technique

### Ratios verifies (script Python)

| Couleur | Hex | Sur blanc | AA normal | AA large |
|---------|-----|-----------|-----------|----------|
| Brand | #E8494B | 3.83:1 | FAIL | OK |
| Brand-btn | #CE3B3D | 4.86:1 | OK | OK |
| Bg-red | #BE2F31 | 5.77:1 | OK | OK |
| Dore actuel | #D4A843 | 2.21:1 | FAIL | FAIL |
| Text-gold | #7A6100 | 5.94:1 | OK | OK |
| Gold fallback | #8B6914 | 5.09:1 | OK | OK |
| Text | #2B2B2B | 14.16:1 | OK | OK |
| Text-light | #4A4A4A | 8.86:1 | OK | OK |

### Tailles rendues par viewport

| Variable | 375px | 768px | 1024px | 1440px |
|----------|-------|-------|--------|--------|
| --size-sm (body) | 16px | 16px | 18px | 18px |
| --size-xs (caption) | 14px | 14px | 14px | 16px |
| --size-md (subtitle) | 18px | 19px | 22px | 22px |
| --size-xl (title) | 24px | 27px | 36px | 40px |
| --size-3xl (hero) | 40px | 46px | 61px | 80px |

---

**Auteur** : Claude + Alex
**Date** : 2026-03-22
**Version** : 5.1
