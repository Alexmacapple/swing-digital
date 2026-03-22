# Enseignements - Swing Digital

**Objectif** : Capitaliser les lecons des 62 pages pour eviter de repeter les memes erreurs.

---

## Typographie et Spacing

- Calibrer les font-sizes **des le depart** (+10-15% a chaque niveau hierarchique)
- **Line-height minimum 1.5-1.6** pour lisibilite (jamais 1.4)
- Padding/margin **harmonises** : multiples de 0.5rem ou 1rem
- Underlines/separateurs : **50px minimum** pour visibilite
- Eviter les tailles < 0.75rem (trop petit)
- `text-transform: uppercase` dans le CSS plutot que majuscules en dur dans le HTML (plus flexible)

---

## Images et Proportions

- **JAMAIS `object-fit: cover`** sauf archetypes D, F, I, page 16 et portraits
- Preserver les aspect-ratios naturels des images
- Pour galeries masonry : **CSS Columns** (flow naturel) > CSS Grid (spans rigides)
- Si image unique + texte : utiliser flexbox + `justify-content: flex-end` pour alignment
- Recadrage d'images physique : enlever les bordures/elements incrustes du haut

### Verification des images copiees (CRITIQUE)

- **Toujours verifier les checksums MD5** apres copie d'images entre dossiers
- Les pages 18, 21, 22, 24, 31, 41, 50, 56, 60 avaient des **images dupliquees** (meme fichier copie sous 2 noms differents)
- Commande de verification : `md5 -q fichier1.jpg fichier2.jpg` -- si les hash sont identiques, c'est un doublon
- Apres toute copie en masse, lancer un script de verification : comparer les hash `src/pages-extracted/` vs `src/img/pages/` et signaler les DUPLICATE et MISSING
- Les exports HD (`EXPORT_HD/EXPORT_JPG/`) sont des pages entieres, pas des images individuelles -- utiliser PIL/Pillow pour recouper si l'extraction PDF a echoue

---

## Couleurs et Fonds

- Gradients/backgrounds sur **conteneur parent** ONLY
- Enfants : `background: transparent` pour voir le parent
- Utiliser variables CSS pour couleurs (`:root`)
- Texte blanc sur fond rouge : utiliser `--color-brand-btn` (#CE3B3D, 4.86:1)
- `--color-brand` (#E8494B) reserve aux fonds decoratifs sans texte dessus
- **Fond noir vs blanc** : verifier systematiquement la couleur de fond des pages a photos superposees (pages 16/18 etaient en noir au lieu de blanc)
- **Couleur texte sur fond colore** : toujours coupler `background-color` et `color` -- ne jamais laisser du texte gris fonce (#333) sur un fond rose/rouge (page 56, page 4)

### Fidelite des couleurs vs WCAG

- La maquette utilise du jaune dore vif (#D4A843) pour les titres. Le WCAG AA demande un ratio 4.5:1, ce qui impose #7D5A00 (brun fonce) sur fond blanc
- **Decision prise** : privilegier la fidelite visuelle (#D4A843) sur le contraste WCAG pour les titres decoratifs. Le brun fonce denature trop le design
- Pour les elements fonctionnels (boutons, liens, formulaires), garder le contraste WCAG AA

---

## Layout et Structure

- Colonnes **50/50 rarement optimal**
- Essayer **55/45 ou 60/40** pour meilleure balance texte+images
- Flexbox > Grid pour alignements simples (centrage, alignment, distribution)
- Pages dont le contenu < 100vh : supprimer `height` fixe (evite vide blanc entre slides)
- Proportions inegales : toujours specifier sur conteneur parent

### Patterns de layout recurrents

- **Bande decorative verticale** (pages 23, 25, 31, 37, 38) : utiliser `position: absolute` ou `::before/::after` avec une largeur fixe (10-15%) et un z-index
- **Photo plein cadre + texte overlay** (pages 23, 35, 50) : la photo en `position: relative` + `object-fit: cover`, le texte en `position: absolute` avec `text-shadow` pour lisibilite
- **Layout 2 colonnes texte + photo** (pages 40, 52, 61) : grid avec proportions 38/62 ou 50/50 selon le contenu. Toujours verifier la maquette pour les proportions exactes
- **Grille mosaique** (pages 36, 47, 54) : pour 3 images dont une grande, utiliser `grid-template-columns: 50% 50%` + `grid-row: 1 / -1` sur la grande image. Ne pas creer de colonnes inexistantes (grid-column: 3 dans une grille a 2 colonnes = bug silencieux)

---

## Accessibilite WCAG 2.2 AA

- **ALT text maximum 80 caracteres** (outils signalent au-dela)
- Structure HTML semantique **des le depart** (section, h1-h6, aria-labels)
- Contraste minimum **4.5:1** pour texte normal, **3:1** pour texte large
- `background-color` ET `color` couples sur chaque conteneur a fond colore
- `background-color` explicite sur les elements texte (pas d'heritage implicite)

---

## Pas de scroll vertical

- Jamais `height: 100%` fixe sur les enfants
- Utiliser `height: auto` ou `max-height`
- Utiliser `overflow: hidden` sur le conteneur page
- Reduire espacements/font-sizes si contenu trop gros
- Utiliser flexbox plutot que heights fixes
- Pas de `overflow-y: auto` interne (jamais de scroll)

---

## Elements decoratifs et UI

- **Etoiles de notation** : utiliser des entites HTML `&#9733;` avec couleur #E8C84A
- **Badges** (Nouveaute, nom de projet) : `position: absolute` dans un conteneur `position: relative`, fond dore ou rouge selon la maquette
- **Boutons CTA** : verifier fond dore (#E8C84A) vs contour blanc -- la maquette fait autorite
- **Coches/checkmarks** : utiliser des pseudo-elements `::before` avec emoji ou SVG, pas des puces standard
- **Drapeaux** : les emojis Unicode ne sont pas toujours fideles aux images du PDF. Utiliser les images extraites si disponibles
- **Bordures photos style polaroid** (page 36) : `border: 4px solid white` sur les photos secondaires

---

## Audit de fidelite (methodologie)

### Process d'audit

1. **Lancer 4 agents en parallele** couvrant chacun 15-16 pages
2. Chaque agent compare screenshot maquette + texte source + HTML + CSS
3. Consolider les rapports, prioriser par impact visuel
4. Corriger par lots thematiques (couleurs, layouts, images, textes)
5. Commiter et pusher apres chaque lot
6. Verifier visuellement les corrections cles dans le navigateur

### Erreurs recurrentes detectees

| Type d'erreur | Frequence | Exemple |
|---------------|-----------|---------|
| Images dupliquees (meme hash) | 9 pages | Pages 18, 21, 22, 24, 31, 41, 50, 56, 60 |
| Fond de couleur incorrect | 4 pages | Pages 4, 16, 18, 56 |
| Couleur de texte incorrecte | 5 pages | Pages 4, 27-30, 56 |
| Layout incorrect (colonnes, proportions) | 6 pages | Pages 23, 35, 36, 40, 47, 61 |
| Elements decoratifs manquants | 5 pages | Pages 35, 38, 57, 58, 59 |
| Positionnement incorrect | 3 pages | Pages 9/10, 35, 51 |

### Ce qui marche bien

- Les archetypes de layout (GUIDELINES-TEMPLATES.md) sont fiables pour les pages standards
- La reutilisation de classes CSS entre pages similaires (page16 pour 16+18, page58 pour 58+59) est efficace
- Les variables CSS evitent les hardcodes et facilitent les corrections en masse

---

## Performance Lighthouse

### Images : lazy loading et dimensions

- **TOUJOURS** `loading="lazy"` sur toutes les images SAUF le hero (LCP)
- Le hero doit avoir `fetchpriority="high"` et un `<link rel="preload">` dans le `<head>`
- **TOUJOURS** `width` et `height` explicites sur chaque `<img>` pour eviter le CLS
- Recuperer les dimensions natives avec `sips -g pixelWidth -g pixelHeight fichier.jpg`
- Sans lazy loading, les 174 images (108 Mo) se chargent en parallele et tuent le LCP mobile (10.5s -> ~2-3s avec lazy)

### Images : qualite d'extraction PDF

- Les images extraites du PDF peuvent etre sous-echantillonnees (ex: page-21-image-1.jpg 558x739 au lieu de 1672x2216)
- **Verifier la qualite** : si une image parait pixelisee, la re-extraire avec PyMuPDF (`fitz`) depuis le PDF source
- Commande : `doc[page_index].get_images()` puis `doc.extract_image(xref)` pour obtenir l'image en resolution native

### Variables CSS : zero couleur en dur

- **REGLE** : aucune couleur codee en dur hors `:root`
- Toute nouvelle couleur doit etre declaree comme variable dans `:root` puis referencee avec `var(--...)`
- 38 variables couleur + 7 variables ombre definies dans `:root`
- Verifier avec : `grep -n '#[0-9a-fA-F]' style.css | grep -v ':root' | grep -v '/\*'`
- Les fallbacks `var(--color, #hex)` sont acceptables mais la valeur en dur seule ne l'est pas

### RGAA : figures et legendes (critere 1.9)

- Les `<figure>` contenant des images avec `<figcaption>` doivent avoir `role="figure"` et `aria-label` correspondant au texte de la legende
- Ne pas utiliser `aria-labelledby` avec un id sur le `<figcaption>` : preferer `aria-label` directement sur le `<figure>`

---

## Process et Git

1. Valider une page **100% terminee** avant passer a la suivante
2. Iterer sur **CSS uniquement** (pas HTML) pendant refinement
3. Screenshots reguliers pour comparer a maquette
4. Commits par page ou groupe de pages
5. Tester scroll tracking et anchors (#page-N)
6. Consulter GUIDELINES-TEMPLATES.md avant toute integration
7. **Verifier les images apres copie** (checksums MD5, pas de doublons)
8. **Comparer le rendu navigateur vs la maquette PDF** pour chaque page modifiee

---

## Checklist Page Terminee

- [ ] Maquette 100% respectee (comparaison visuelle screenshot vs PDF)
- [ ] Texte identique (copie exacte, accents corrects)
- [ ] Toutes les images integrees (verifier nombre et ordre)
- [ ] Images non dupliquees (checksums differents)
- [ ] Couleurs de fond et de texte conformes a la maquette
- [ ] Elements decoratifs presents (badges, etoiles, bandes, overlays)
- [ ] Responsive teste (1200, 1024, 768, 480)
- [ ] Accessibilite WCAG 2.2 AA validee
- [ ] ALT text descriptif <= 80 caracteres
- [ ] Pas de barre de scroll inutile
- [ ] Commit cree et pushe

---

**Derniere mise a jour** : 2026-03-22 (audit complet pages 1-62)
**Auteur** : Claude + Alex
