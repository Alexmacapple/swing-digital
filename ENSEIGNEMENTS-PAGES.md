# Enseignements - Swing Digital

Lecons apprises sur les 62 pages et le decoupe multi-pages. Capitalisation pour eviter les erreurs recurrentes.

---

## Phase 1-4 : Integration single-page

### Images et proportions

- Jamais `object-fit: cover` sauf archetypes hero, full-image et portraits
- Preserver les aspect-ratios naturels des images
- Toujours verifier les checksums MD5 apres copie d'images entre dossiers
- Pages 18, 21, 22, 24, 31, 41, 50, 56, 60 avaient des images dupliquees
- Les exports HD (EXPORT_HD/) sont des pages entieres, pas des images individuelles

### Couleurs et contrastes

- Texte blanc sur fond rouge : utiliser --color-brand-btn (#CE3B3D, 4.86:1)
- --color-brand (#E8494B) reserve aux decoratifs sans texte dessus
- Fond noir vs blanc : verifier systematiquement sur les pages a photos
- Toujours coupler background-color et color (ne jamais laisser du texte gris sur fond colore)
- Le jaune dore maquette (#D4A843) n'est pas conforme WCAG AA sur blanc

### Typographie

- Body a 20px (augmente de 18px pour lisibilite)
- Line-height minimum 1.5 pour le corps, 1.3 pour les titres
- Echelle fluide clamp() pour toutes les tailles
- text-transform uppercase pour les majuscules, jamais en dur dans le HTML (RGAA 10.2)

---

## Phase 5 : Decoupe multi-pages

### Architecture

- 24 pages HTML au lieu d'un single-page de 2240 lignes
- Header/footer/breadcrumb dupliques dans chaque page (pas de include serveur)
- Toute modification du header doit etre repliquee dans 24 fichiers (script Python ou sed)
- Le script de generation Python est le moyen le plus fiable pour les modifications de masse

### Navigation 3 niveaux

- Menu niveau 1 : 4 items (Accueil, Espaces, Experiences, Reservations)
- Menu niveau 2 : dropdown 8 projets sous Experiences
- Menu niveau 3 : sous-menu Monroe (5 volets + 6 categories, separateur visuel)
- Pattern disclosure (button aria-expanded, pas de menubar)
- Pas de aria-haspopup (reserve aux menus applicatifs)
- Le dropdown s'ouvre au clic uniquement, pas au hover

### Fil d'Ariane

- Place entre header et main (pas dans le header)
- Sticky sous le header (visible au scroll)
- Liste ordonnee ol (pas ul)
- Separateurs en CSS ::before (pas dans le HTML)
- aria-current="page" sur le dernier lien
- Sur les pages liees via liens croises (xr-corporate, marilyn), le breadcrumb montre la hierarchie cible, pas le parcours

### Videos

- Hero video (page 1) : autoplay loop muted playsinline, role="img" pour autoriser aria-label
- Video contact (page 62) : en pause par defaut, play au clic uniquement
- Vimeo API : chargement conditionnel (guard iframe), pas de script en dur dans le HTML
- Boutons play/pause : intitule explicite identifiant le contenu controle

### SEO

- Placeholder https://DOMAINE/ dans canonical, OG, sitemap, robots (a remplacer avant prod)
- og:image manquante sur 23 pages (a ajouter)
- Script de redirection des ancres orphelines (#page-N) dans main.js

### Responsive et zoom

- overflow: hidden casse le zoom 200% -> utiliser overflow-x: hidden ou overflow: visible
- white-space: nowrap casse le zoom 200% -> ne jamais utiliser sur du texte
- height fixe sur les sections -> utiliser min-height (sauf hero et full-image)
- Le header en position fixed doit utiliser min-height (pas height) pour grandir au zoom
- Les grilles doivent passer en colonne unique sous 600-768px

---

## Erreurs recurrentes a eviter

### Git et fichiers

- Toujours verifier pwd + git rev-parse avant un commit
- Les fichiers HTML sont dans src/ mais les commandes git s'executent depuis la racine
- Le PDF maquette (104 MB) peut accidentellement etre stage (git add -A)
- Utiliser sed -i '' (macOS) pas sed -i (Linux)
- grep -P n'existe pas sur macOS, utiliser grep -E

### CSS

- Variable circulaire detectee : --color-red-mid: var(--color-red-mid) (a corriger)
- Les proprietes sur le body affectent tout le site (attention aux changements globaux)
- Les z-index des overlays (::after) peuvent bloquer les clics sur les boutons
- pointer-events: none sur un container necessite pointer-events: auto sur ses enfants interactifs

### HTML

- Les balises article converties en a (cartes cliquables) necessite de retirer tous les </article>
- Les commentaires HTML avec apostrophes cassent les heredocs bash
- Les roles ARIA redondants (role="banner" sur header) generent des warnings W3C

### Accessibilite

- aria-label sur video necesssite role="img" (sinon warning ARIA)
- Les lecteurs d'ecran epellent les mots en majuscules HTML -> text-transform CSS
- Le contraste des liens au hover doit aussi etre conforme (pas seulement au repos)
- Un h1 est obligatoire sur chaque page (sr-only si pas de titre visible)
- Les boutons desactives utilisent aria-disabled="true" (pas disabled natif, pour rester dans le tab order)

---

## Scores audit (2026-03-22)

| Categorie | Score |
|-----------|-------|
| Accessibilite | 92/100 |
| Bonnes pratiques | 90/100 |
| UX | 88/100 |
| Securite | 85/100 |
| Technique | 78/100 |
| SEO | 65/100 |
| **Global** | **83/100** |

---

**Derniere mise a jour** : 2026-03-22
**Version** : 3.0.0
