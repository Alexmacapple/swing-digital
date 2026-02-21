# Enseignements - Pages 1-3 Swing Digital

**Objectif** : Optimiser l'intégration des pages 4-62 en appliquant les leçons des pages 1-3.

---

## 🎯 Typographie & Spacing

- ✅ Calibrer les font-sizes **dès le départ** (+10-15% à chaque niveau hiérarchique)
- ✅ **Line-height minimum 1.5-1.6** pour lisibilité (jamais 1.4)
- ✅ Padding/margin **harmonisés** : multiples de 0.5rem ou 1rem
- ✅ Underlines/séparateurs : **50px minimum** pour visibilité
- ⚠️ Éviter les tailles < 0.75rem (trop petit)

---

## 🖼️ Images & Proportions

- ✅ **JAMAIS `object-fit: cover`** → toujours `object-fit: contain`
- ✅ Préserver les aspect-ratios naturels des images
- ✅ Pour galeries masonry : **CSS Columns** (flow naturel) > CSS Grid (spans rigides)
- ✅ Si image unique + texte : utiliser flexbox + `justify-content: flex-end` pour alignment
- ✅ Recadrage d'images physique : enlever les bordures/éléments incrustés du haut

---

## 🎨 Couleurs & Fonds

- ✅ Gradients/backgrounds sur **conteneur parent** ONLY
- ✅ Enfants : `background: transparent` pour voir le parent
- ✅ Utiliser variables CSS pour couleurs (`:root`)
- ✅ Texte blanc sur rose/corail : fort contraste ✅
- ✅ Bordures : utiliser couleur principale ou gradient léger

---

## 📐 Layout & Structure

- ✅ Colonnes **50/50 rarement optimal**
- ✅ Essayer **55/45 ou 60/40** pour meilleure balance texte+images
- ✅ Flexbox > Grid pour alignements simples (centrage, alignment, distribution)
- ✅ `padding-right` pour espacement à droite (poussage à droite)
- ✅ Proportions inégales : toujours spécifier sur conteneur parent

---

## ♿ Accessibilité WCAG 2.2 AA

- ✅ **ALT text 125+ caractères** descriptifs et contextuels
- ✅ Structure HTML sémantique **dès le départ** (section, h1-h6, aria-labels)
- ✅ Contraste minimum **4.5:1** pour texte normal
- ✅ Testée avec lecteur d'écran avant validation

---

## 🚫 RÈGLE STRICTE : PAS DE SCROLL VERTICAL

- ✅ Jamais `height: 100%` fixe sur les enfants
- ✅ Utiliser `height: auto` ou `max-height`
- ✅ Utiliser `overflow: hidden` sur le conteneur page
- ✅ Réduire espacements/font-sizes si contenu trop gros
- ✅ Utiliser flexbox plutôt que heights fixes
- ⚠️ Pas de `overflow-y: auto` interne (jamais de scroll!)

---

## ⚡ Process & Git

1. ✅ Valider une page **100% terminée** avant passer à la suivante
2. ✅ Itérer sur **CSS uniquement** (pas HTML) pendant refinement
3. ✅ Screenshots réguliers pour comparer à maquette
4. ✅ Commits par page ou groupe de 5 pages
5. ✅ Tester scroll tracking et anchors (#page-N)

---

## 🚀 Estimation Temps

- **Page 1-2** : ~2-3 itérations, 1-2 commits
- **Page 3+** : ~5-10 itérations (contenu complexe), 2-3 commits
- **Pages simples** (liste, grille) : ~1 itération
- **Pages avec galerie** : ~5-8 itérations (masonry, proportions)

---

## ✅ Checklist Page Terminée

- [ ] Maquette 100% respectée
- [ ] Texte identique (copie exacte)
- [ ] Images intégrées correctement
- [ ] Responsive testé (desktop, tablet, mobile)
- [ ] Accessibilité WCAG 2.2 AA validée
- [ ] ALT text complet (125+ chars)
- [ ] Scroll tracking fonctionne
- [ ] Pas de barre de scroll inutile
- [ ] Typographie lisible
- [ ] Contraste suffisant
- [ ] Commit créé

---

## 🎯 Priorisation

**Pages prioritaires** : Pages avec galeries, grilles, ou layouts complexes
**Pages rapides** : Pages texte simple, listes, descriptions
**À valider d'abord** : Toutes les pages de type "portfolio" ou "showcase"

---

**Dernière mise à jour** : 2026-02-21 (après pages 1-3)
**Auteur** : Claude + Alex
