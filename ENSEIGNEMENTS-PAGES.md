# Enseignements - Pages 1-3 Swing Digital

**Objectif** : Optimiser l'integration des pages 4-62 en appliquant les lecons des pages 1-3.

---

## Typographie et Spacing

- Calibrer les font-sizes **des le depart** (+10-15% a chaque niveau hierarchique)
- **Line-height minimum 1.5-1.6** pour lisibilite (jamais 1.4)
- Padding/margin **harmonises** : multiples de 0.5rem ou 1rem
- Underlines/separateurs : **50px minimum** pour visibilite
- Eviter les tailles < 0.75rem (trop petit)

---

## Images et Proportions

- **JAMAIS `object-fit: cover`** sauf archetypes D, F, I, page 16 et portraits
- Preserver les aspect-ratios naturels des images
- Pour galeries masonry : **CSS Columns** (flow naturel) > CSS Grid (spans rigides)
- Si image unique + texte : utiliser flexbox + `justify-content: flex-end` pour alignment
- Recadrage d'images physique : enlever les bordures/elements incrustes du haut

---

## Couleurs et Fonds

- Gradients/backgrounds sur **conteneur parent** ONLY
- Enfants : `background: transparent` pour voir le parent
- Utiliser variables CSS pour couleurs (`:root`)
- Texte blanc sur fond rouge : utiliser `--color-brand-btn` (#CE3B3D, 4.86:1)
- `--color-brand` (#E8494B) reserve aux fonds decoratifs sans texte dessus

---

## Layout et Structure

- Colonnes **50/50 rarement optimal**
- Essayer **55/45 ou 60/40** pour meilleure balance texte+images
- Flexbox > Grid pour alignements simples (centrage, alignment, distribution)
- Pages dont le contenu < 100vh : supprimer `height` fixe (evite vide blanc entre slides)
- Proportions inegales : toujours specifier sur conteneur parent

---

## Accessibilite WCAG 2.2 AA

- **ALT text maximum 80 caracteres** (outils signalent au-dela)
- Structure HTML semantique **des le depart** (section, h1-h6, aria-labels)
- Contraste minimum **4.5:1** pour texte normal, **3:1** pour texte large
- `background-color` ET `color` couples sur chaque conteneur a fond colore
- `background-color` explicite sur les elements texte (pas d'heritage implicite)
- Jaune sur blanc : utiliser #7D5A00 (5.3:1), jamais de jaune vif

---

## Pas de scroll vertical

- Jamais `height: 100%` fixe sur les enfants
- Utiliser `height: auto` ou `max-height`
- Utiliser `overflow: hidden` sur le conteneur page
- Reduire espacements/font-sizes si contenu trop gros
- Utiliser flexbox plutot que heights fixes
- Pas de `overflow-y: auto` interne (jamais de scroll)

---

## Process et Git

1. Valider une page **100% terminee** avant passer a la suivante
2. Iterer sur **CSS uniquement** (pas HTML) pendant refinement
3. Screenshots reguliers pour comparer a maquette
4. Commits par page ou groupe de pages
5. Tester scroll tracking et anchors (#page-N)
6. Consulter GUIDELINES-TEMPLATES.md avant toute integration

---

## Checklist Page Terminee

- [ ] Maquette 100% respectee
- [ ] Texte identique (copie exacte)
- [ ] Images integrees correctement
- [ ] Responsive teste (1200, 1024, 768, 480)
- [ ] Accessibilite WCAG 2.2 AA validee
- [ ] ALT text descriptif <= 80 caracteres
- [ ] Pas de barre de scroll inutile
- [ ] Typographie lisible
- [ ] Contraste suffisant
- [ ] Commit cree

---

**Derniere mise a jour** : 2026-02-22 (apres pages 1-24)
**Auteur** : Claude + Alex
