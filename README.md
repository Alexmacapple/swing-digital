# Swing Digital - Site web

Site vitrine pour Swing Digital, entreprise specialisee dans les experiences immersives et espaces augmentes.

## Structure

```
src/           Code source du site (HTML/CSS/JS)
design/        Maquettes et assets originaux
docs/          Documentation projet
```

## Demarrage rapide

Ouvrir `src/index.html` dans un navigateur, ou lancer un serveur local :

```bash
npx serve src/
```

## Accessibilité (WCAG 2.2 AA)

**Important** : Tous les assets et images intégrées doivent respecter les standards d'accessibilité WCAG 2.2 AA.

Utiliser les skills disponibles pour valider l'accessibilité :

- `/audit-accessibilite-web` : Audit complet WCAG 2.2 avec tests automatises et manuels
- `/fix-accessibilite` : Corrige les violations WCAG detectees
- `/screen-reader-testing` : Valide l'accessibilité avec lecteurs d'écran (VoiceOver, NVDA, JAWS)

Consulter `CLAUDE.md` pour les détails du dernier audit d'accessibilité.

## Contenu du Répertoire src/

### Extraction PDF Maquette (21 février 2026)

Maquette complète extraite et organisée :

```
src/
├── maquette-site.pdf           (5.5 MB, 62 pages - original)
│
└── pages-extracted/            (68 MB - extraction complète)
    ├── page-1/ ... page-62/    (62 répertoires)
    │   ├── page-N-screenshot.png       (image page entière)
    │   ├── page-N-image-1.jpg          (image 1 extraite)
    │   ├── page-N-image-2.jpg          (image 2 extraite)
    │   └── texte-page-N.md             (texte extrait)
    │
    ├── README.md                       (guide complet)
    ├── INDEX.md                        (table des matières)
    ├── INVENTAIRE-IMAGES.md            (liste 220 images)
    ├── images-inventory.json           (données JSON)
    ├── RAPPORT-EXTRACTION.txt          (rapport technique)
    ├── RAPPORT-IMAGES-EXTRAITES.md     (rapport images)
    ├── RESUME.txt                      (résumé rapide)
    └── full_text.txt                   (texte complet)
```

### Statistiques Extraction

| Element | Quantité |
|---------|----------|
| Pages PDF | 62 |
| Screenshots PNG | 62 (53 MB) |
| Fichiers texte | 62 (< 1 MB) |
| Images extraites | 220 JPG (7.5 MB) |
| Taille totale | ~68 MB |

### Structure par Page

Chaque répertoire `page-N/` contient :
- `page-N-screenshot.png` : Image haute résolution de la page complète
- `page-N-image-1.jpg`, `page-N-image-2.jpg`, etc. : Images extraites dans l'ordre d'apparition
- `texte-page-N.md` : Contenu textuel au format Markdown

### Fichiers de Référence

Pour naviguer et utiliser l'extraction :

- **README.md** : Guide complet avec instructions d'utilisation
- **INDEX.md** : Table des matières (liens directs vers chaque page)
- **INVENTAIRE-IMAGES.md** : Liste détaillée des 220 images avec tailles et localisations
- **images-inventory.json** : Données structurées (format JSON pour traitement automatisé)
- **RESUME.txt** : Résumé rapide de l'extraction

### Workflow d'Intégration - Mode YOLO STRICT

**CONSIGNES IMPÉRATIVES - Ne pas dévier** :

1. **Boucler sur TOUTES les pages** (page-1 à page-62)
   - Ne pas sauter de pages
   - Traiter dans l'ordre séquentiel

2. **Fidélité absolue à la maquette**
   - Respecter exactement la capture d'écran (page-N-screenshot.png)
   - Reproduire la mise en page pixel-perfect
   - Conserver l'ordre des éléments

3. **Texte identique**
   - Copier exactement le texte du fichier `texte-page-N.md`
   - Même orthographe, même casse, même punctuation
   - Aucune modification du contenu

4. **Images identiques**
   - Intégrer toutes les images extraites (page-N-image-1.jpg, image-2.jpg, etc.)
   - Respecter l'ordre d'apparition dans la maquette
   - Mêmes dimensions relatives
   - Mêmes descriptions alt (basées sur le contenu)

5. **Itération par page COMPLÈTE**
   - NE PAS s'arrêter sur une page tant qu'elle n'est pas 100% terminée
   - Valider accessibilité WCAG 2.2 AA avant de passer à la suivante
   - Vérifier le responsive mobile

6. **Mode YOLO - Autonome**
   - Aucune confirmation demandée
   - Aucun arrêt intermédiaire
   - Continuer jusqu'à terminer TOUTES les 62 pages
   - Commits réguliers à chaque page (ou groupe de 5 pages)

### Utilisation des Images

Pour intégrer les images dans le site :

1. Consulter `src/pages-extracted/INVENTAIRE-IMAGES.md` pour identifier les images utiles
2. Copier les images JPG vers `src/img/`
3. Organiser par catégorie (experiences, portfolio, etc.)
4. Optimiser pour le web (compression, redimensionnement)
5. Référencer dans le HTML/CSS avec alt text WCAG 2.2 compliant

## Documentation

- [Brief projet](docs/BRIEF.md)
- [Stack technique](docs/STACK.md)
- [Extraction PDF](src/pages-extracted/README.md)
