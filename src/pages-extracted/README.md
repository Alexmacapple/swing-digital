# Extraction PDF - Swing Digital Maquette

## 📚 Vue d'ensemble

Ce répertoire contient l'extraction complète du PDF `maquette-site.pdf` (62 pages) divisée en trois éléments :

1. **📸 Screenshots** : Image PNG haute résolution de chaque page
2. **📄 Texte** : Contenu textuel extracté en Markdown
3. **🖼️ Images** : 220 images détectées et extraites du PDF

---

## 🗂️ Structure du Répertoire

```
pages-extracted/
├── page-1/                          # Répertoire pour la page 1
│   ├── page-1-screenshot.png        # Screenshot de la page
│   ├── page-1-image-1.jpg           # Image 1 extraite
│   ├── page-1-image-2.jpg           # Image 2 extraite
│   └── texte-page-1.md              # Texte de la page
│
├── page-2/ ... page-62/             # Pages 2 à 62 (même structure)
│
├── 📋 Fichiers de Navigation
│   ├── INDEX.md                     # Table des matières (liens)
│   ├── README.md                    # Ce fichier
│
├── 📊 Rapports et Inventaires
│   ├── RAPPORT-EXTRACTION.txt       # Rapport d'extraction (screenshots + texte)
│   ├── RAPPORT-IMAGES-EXTRAITES.md  # Rapport sur les images
│   ├── INVENTAIRE-IMAGES.md         # Inventaire complet avec tailles
│   ├── images-inventory.json        # Données JSON pour traitement
│
└── 📝 Fichier Texte Brut
    └── full_text.txt                # Contenu texte complet non structuré
```

---

## 📊 Statistiques

| Élément | Quantité |
|---------|----------|
| **Pages PDF** | 62 |
| **Répertoires page-X** | 62 |
| **Screenshots PNG** | 62 (53 MB) |
| **Fichiers texte MD** | 62 (< 1 MB) |
| **Images extraites JPG** | 220 (7.5 MB) |
| **Taille totale** | ~68 MB |

### Distribution des images

- **Pages avec images** : 59 sur 62
- **Pages sans images** : 3
- **Moyenne par page** : 3.7 images

### Tailles des images

- **> 100 KB** : ~35 images (grandes photos)
- **10-100 KB** : ~140 images (taille moyenne)
- **< 10 KB** : ~45 images (petites icônes/logos)

---

## 🚀 Comment Utiliser

### Accéder à une page spécifique

```bash
# Voir le contenu de la page 10
open pages-extracted/page-10/

# Afficher le screenshot
open pages-extracted/page-10/page-10-screenshot.png

# Lire le texte
cat pages-extracted/page-10/texte-page-10.md

# Voir les images extraites
ls pages-extracted/page-10/page-10-image-*.jpg
```

### Consulter l'inventaire complet

```bash
# Voir la table des matières
cat INDEX.md

# Voir toutes les images avec tailles
cat INVENTAIRE-IMAGES.md

# Données structurées (JSON)
cat images-inventory.json | jq '.pages["page_10"]'
```

---

## 🎯 Cas d'Utilisation

### 1. Documentation du Site
- Utilisez les **screenshots** pour documenter le design
- Conservez les **textes extraits** pour la base de connaissances

### 2. Intégration des Images
- Copiez les **images extraites** vers `src/img/` du site
- Optimisez-les avec ImageOptim ou TinyPNG
- Référencez-les dans le HTML/CSS

### 3. Analyse de Contenu
- Utilisez **INVENTAIRE-IMAGES.md** pour identifier les images par page
- Utilisez **images-inventory.json** pour un traitement automatisé

### 4. Archivage
- Le **full_text.txt** contient une sauvegarde textuelle complète
- Les **screenshots** peuvent servir de preuve pour les demandes de droits d'auteur

---

## 📝 Convention de Nommage

### Screenshots
```
page-{N}-screenshot.png
Exemple : page-1-screenshot.png, page-62-screenshot.png
```

### Images extraites
```
page-{N}-image-{M}.jpg
Exemple : page-1-image-1.jpg, page-5-image-3.jpg
M = ordre d'apparition dans la page (1, 2, 3...)
```

### Fichiers texte
```
texte-page-{N}.md
Exemple : texte-page-1.md, texte-page-62.md
```

---

## ⚙️ Outils Utilisés

| Outil | Fonction | Version |
|-------|----------|---------|
| **pdftoppm** | Conversion pages → PNG | Poppler |
| **pdftotext** | Extraction texte → TXT | Poppler |
| **PyMuPDF (fitz)** | Extraction images → JPG | 1.x |
| **sips** | Conversion images (macOS) | Natif |

---

## 💡 Notes Importantes

### Qualité
- ✅ Les **screenshots** sont en haute résolution (non optimisés pour le web)
- ✅ Les **images extraites** sont au format JPG standard
- ✅ Le **texte** respecte la mise en page originale

### Limitations
- Les images vectorielles du PDF ne sont pas séparables en tant que fichiers vectoriels
- Seules les images bitmap/raster peuvent être extraites

### Compatibilité
- Format PNG : Large support (navigateurs, outils)
- Format JPG : Compression avec perte (taille réduite)
- Format MD : Texte pur, modifiable avec n'importe quel éditeur

---

## 🔗 Fichiers de Référence

| Fichier | Contenu | Utilité |
|---------|---------|---------|
| **INDEX.md** | Table des matières | Navigation rapide entre pages |
| **INVENTAIRE-IMAGES.md** | Liste détaillée des images | Planifier l'intégration |
| **images-inventory.json** | Données JSON | Import dans Python/JS |
| **RAPPORT-IMAGES-EXTRAITES.md** | Résumé + conseils | Comprendre l'extraction |
| **RAPPORT-EXTRACTION.txt** | Rapport technique | Historique de l'extraction |

---

## 🎨 Intégration dans le Site Swing Digital

Structure recommandée pour `src/img/` :

```
src/
└── img/
    ├── experiences/
    │   ├── monroe/          (page-5, page-6, etc.)
    │   ├── voyage/          (page-XX-image-Y.jpg)
    │   ├── vent/
    │   └── ...
    ├── portfolio/           (logos, partenaires)
    └── backgrounds/         (textures, gradients)
```

---

## Workflow Mode YOLO - Intégration des 62 Pages

**CONSIGNES STRICTES - Exécution autonome sans arrêt**

### 1. Couverture Totale Obligatoire

- Boucler sur TOUTES les pages (page-1 à page-62)
- Traiter dans l'ordre séquentiel
- Aucune page omise
- Aucune exception

### 2. Fidélité Absolue à la Maquette

Pour chaque page-N :

1. **Screenshot** (source de vérité visuelle)
   - Consulter `page-N/page-N-screenshot.png`
   - Reproduire layout exactement (positions, espacements, alignements)
   - Respecter les proportions et dimensions visuelles

2. **Texte** (copie exacte)
   - Lire `page-N/texte-page-N.md`
   - Copier intégralement (orthographe, ponctuation, casse)
   - Aucune paraphrase ni modification

3. **Images** (même ordre et positions)
   - Identifier toutes les images : `page-N-image-1.jpg`, `page-N-image-2.jpg`, etc.
   - Intégrer dans le même ordre d'apparition
   - Placer aux mêmes positions relatives
   - Redimensionner proportionnellement (ne pas déformer)

4. **Descriptions alt** (WCAG 2.2 AA)
   - Alt text minimum 125 caractères
   - Décrire contenu et fonction
   - Spécifier si c'est une image cliquable

### 3. Pas d'Arrêt Mi-Page

- NE PAS quitter une page tant qu'elle n'est pas 100% terminée
- Valider accessibilité WCAG 2.2 AA complètement
- Tester responsive mobile à 320px et 768px
- Vérifier avec lecteurs d'écran si changements majeurs

### 4. Itération Sequentielle

```
page-1 → complète et validée
  ↓
page-2 → complète et validée
  ↓
page-3 → complète et validée
  ↓
... (page-4 à page-61)
  ↓
page-62 → complète et validée [FIN]
```

### 5. Mode YOLO - Autonome, Aucune Confirmation

- Aucune pause pour demander confirmation
- Aucune question intermédiaire
- Continuer jusqu'au bout (62 pages)
- Commits réguliers :
  - Après chaque page si modifications importantes
  - Ou groupés par 5 pages (page-1-5, page-6-10, etc.)

### 6. Checklist par Page

Pour chaque page-N avant de passer à page-N+1 :

- [x] Screenshot consultée et fidèle
- [x] Texte exactement copié
- [x] Toutes les images intégrées (comptage : image-1, image-2, ...)
- [x] Alt text WCAG 2.2 AA rédigé pour chaque image
- [x] Layout responsive (mobile + desktop)
- [x] Accessibilité validée (/audit-accessibilite-web si doute)
- [x] Navigation clavier testée
- [x] Lecteur d'écran (VoiceOver) validé
- [x] Commit avec message : "Intégration page-N (X images, Y paragraphes)"

---

## Accessibilité - IMPÉRATIF WCAG 2.2 AA

**TOUS les images intégrées doivent respecter les normes WCAG 2.2 AA.**

### Pour chaque image intégrée

1. **Alt text descriptif** (125 caractères minimum)
   - Décrire le contenu et la fonction de l'image
   - Ne pas répéter le texte adjacent
   - Exemple : "Monroe Experience - interactif spatial avec projection 3D"

2. **Contraste des couleurs**
   - 4.5:1 pour texte normal sur image
   - 3:1 pour texte large
   - Tester avec https://webaim.org/resources/contrastchecker/

3. **Dimensions et responsive**
   - Optimiser pour mobile (ne pas dépendre de la taille)
   - Fournir versions redimensionnées (srcset)

### Valider l'Accessibilité

Utiliser les skills disponibles AVANT intégration :

- **`/audit-accessibilite-web`** : Audit WCAG 2.2 AA complet
- **`/fix-accessibilite`** : Corriger les violations
- **`/screen-reader-testing`** : Tester avec VoiceOver/NVDA/JAWS

### Ressources

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [Authoring Accessible Images](https://www.w3.org/WAI/WCAG21/Techniques/general/G111)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## ✅ Checklist d'Utilisation

- [ ] Consulter **INDEX.md** pour comprendre la structure
- [ ] Parcourir **page-1/ à page-62/** pour voir les contenus
- [ ] Lire **INVENTAIRE-IMAGES.md** pour identifier les images utiles
- [ ] Sélectionner les images pertinentes pour le site
- [ ] Optimiser les images (compression, redimensionnement)
- [ ] Rédiger descriptions alt WCAG 2.2 compliant (125+ caractères)
- [ ] Utiliser `/audit-accessibilite-web` avant intégration
- [ ] Valider les contrastes (4.5:1 normal, 3:1 large)
- [ ] Mettre en place les références dans le code HTML
- [ ] Valider les chemins relatifs/absolus
- [ ] Tester avec `/screen-reader-testing` (VoiceOver/NVDA/JAWS)
- [ ] Tester le chargement et la responsivité mobile
- [ ] Corriger violations avec `/fix-accessibilite` si nécessaire

---

## 📞 Support

Pour toute question sur l'extraction :
- Voir **RAPPORT-EXTRACTION.txt** (détails techniques)
- Voir **RAPPORT-IMAGES-EXTRAITES.md** (statistiques images)
- Consulter **images-inventory.json** (données brutes)

---

**Date d'extraction** : 21 février 2026  
**Nombre de pages** : 62  
**Nombre d'images** : 220  
**État** : ✅ Extraction complète réussie

🚀 Prêt pour intégration dans le site !
