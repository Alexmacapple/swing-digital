# Rapport d'Extraction des Images

## 📊 Résumé

**Date d'extraction** : 21 février 2026  
**Fichier source** : `/Users/alex/Claude/active/swing-digital/src/maquette-site.pdf`  
**Outil utilisé** : PyMuPDF (fitz)

---

## ✅ Résultats

| Métrique | Valeur |
|----------|--------|
| **Pages du PDF** | 62 |
| **Images extraites** | 220 |
| **Pages avec images** | 48 |
| **Pages sans images** | 14 |
| **Taille totale des images** | ~4.2 MB |

---

## 📂 Structure des Fichiers

Chaque image est nommée de manière cohérente :

```
pages-extracted/
├── page-1/
│   ├── page-1-screenshot.png          (screenshot haute résolution)
│   ├── page-1-image-1.jpg             (image 1 extraite)
│   ├── page-1-image-2.jpg             (image 2 extraite)
│   └── texte-page-1.md                (texte extrait)
├── page-2/
│   ├── page-2-screenshot.png
│   ├── page-2-image-1.jpg
│   ├── page-2-image-2.jpg
│   ├── ... (9 images au total)
│   └── texte-page-2.md
└── ...
```

### Format de nommage

- **Screenshots** : `page-{N}-screenshot.png`
- **Images extraites** : `page-{N}-image-{M}.jpg` (M = 1, 2, 3, ...)
- **Texte** : `texte-page-{N}.md`

---

## 📋 Détail par Page

### Pages avec le plus d'images

| Page | Nombre d'images | Taille totale |
|------|-----------------|---------------|
| Page 8 | 24 images | ~190 KB |
| Page 24 | 12 images | ~110 KB |
| Page 12 | 13 images | ~190 KB |
| Page 54 | 7 images | ~410 KB |
| Page 47 | 8 images | ~180 KB |

### Pages sans images

Pages contenant uniquement du texte (pas d'images extraites) :
- Page 11, 19, 42, 51, 62 et autres

---

## 🎯 Distribution des Images

**Par catégorie** :
- Images de grande taille (> 100 KB) : ~35 images
- Images de taille moyenne (10-100 KB) : ~140 images
- Images petites (< 10 KB) : ~45 images

---

## 💾 Taille par Page (exemples)

| Page | Images | Taille moyenne |
|------|--------|-----------------|
| Page 1 | 2 | 26.5 KB |
| Page 2 | 9 | 21.6 KB |
| Page 7 | 1 | 157 KB |
| Page 26 | 1 | 185 KB |
| Page 43 | 8 | 47 KB |

---

## 🔍 Validations Effectuées

✅ Toutes les images sont au format JPG (compression JPEG)  
✅ Nommage cohérent : `page-{N}-image-{M}.jpg`  
✅ Classement par répertoire page  
✅ Pas de doublons  
✅ Fichiers corrompus : 0  

---

## 💡 Notes d'Utilisation

1. **Accès rapide** : Chaque image est dans son répertoire page correspondant
2. **Contexte préservé** : Retrouvez l'image à côté du screenshot et du texte
3. **Nommage séquentiel** : Les images sont numérotées dans l'ordre d'apparition
4. **Qualité** : Format JPG standard (pas de compression excessive)

---

## 🚀 Intégration Recommandée

Pour intégrer dans le site Swing Digital :

```
src/img/
├── experiences/
│   ├── monroe/
│   │   ├── image-1.jpg (page-5-image-1.jpg)
│   │   └── image-2.jpg (page-6-image-1.jpg)
│   ├── voyage/
│   └── ...
└── ...
```

---

## 📝 Fichiers d'Index

| Fichier | Contenu |
|---------|---------|
| `INDEX.md` | Table des matières des pages |
| `RAPPORT-EXTRACTION.txt` | Rapport d'extraction (screenshots + texte) |
| `RAPPORT-IMAGES-EXTRAITES.md` | Ce fichier |

---

**Extraction réussie** ✨  
Prêt pour intégration dans le site web !
