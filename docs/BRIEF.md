# Brief - Swing Digital

## Projet

Refonte du site web de Swing Digital, entreprise spécialisée dans les expériences immersives et les espaces augmentés.

## Structure du site

Le site public courant est un site statique multi-pages : 24 pages HTML top-level dans `src/`, plus `/for-ai/` pour le contexte agents IA. Il reste issu d'une maquette de 62 pages, réparties dans les routes suivantes :

### 1. Accueil (pages 1-2)
- Hero avec gradient rose et titre
- Présentation équipe (photos, rôles)

### 2. Créations (pages 3-4)
- Portfolio des projets en cours et réalisés
- Collage photos + descriptions

### 3. Espaces augmentés (pages 5-8)
- Description des services et de l'approche
- Partenaires/clients (24 logos)

### 4. Expériences (pages 9-56)

| Projet | Pages | Statut |
|--------|-------|--------|
| L'Expérience Monroe | 9-19 | En ligne |
| Le Roman Graphique | 20-22 | En ligne |
| Installation Interactive | 23-38 | En ligne |
| La Série Marilyn | 39 | En ligne |
| XR 360 | 40-41 | En ligne |
| Voyage autour de moi | 42-44 | En ligne |
| Dessine-moi le vent | 45-47 | En ligne |
| Ni vues ni connues | 48-49 | En ligne |
| Marilyn | 50-52 | En ligne |
| Toulouse-Lautrec | 53-54 | En ligne |
| Charlotte Henschel | 55-56 | En ligne |

### 5. XR Entreprises (page 57)
- Offre corporate, team-building immersif

### 6. Réservations (pages 58-59)
- Billetterie Expérience Toulouse-Lautrec
- Billetterie Expérience Charlotte Henschel (bientôt)

### 7. Informations (pages 60-61)
- Informations pratiques, tarifs, FAQ
- Visites privées et sur-mesure

### 8. Contact (page 62)
- Coordonnées, email, adresse

## Navigation courante

- Navigation principale multi-pages avec menu, dropdown Expériences Séries et sous-menu Monroe.
- Fil d'Ariane sur les pages internes.
- Les sections issues de la maquette conservent des identifiants `#page-N`, mais les URL publiques canoniques sont les pages HTML.
- Page `/for-ai/`, `llms.txt`, `for-ai.json`, `for-ai.txt` et `schema-webpage.jsonld` disponibles pour les agents IA.

## Référence visuelle

Site du même domaine pour inspiration : https://www.atelierdaruma.com/

## Assets

- Maquette PDF : `source-artifacts/maquette-site.pdf` (62 pages)
- Export HD : `EXPORT_HD/EXPORT_JPG/` (62 JPG haute définition)
- Images extraites : `source-artifacts/pages-extracted/` (220 images)
- Police active : Satoshi Variable auto-hébergée en `.woff2`
- Anciennes polices de maquette Brandon, Fragen et Raleway supprimées du build
- Build public : `dist/`, généré par `npm run build:prod`

---

**Dernière mise à jour** : 2026-06-21
