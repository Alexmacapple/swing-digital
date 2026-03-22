# Audit complet - Swing Digital

Date : 22 mars 2026
Scope : 24 pages HTML, 1 CSS, 1 JS, sitemap, robots.txt
Outils : axe-core (accesslint MCP), inspection manuelle, check-site.sh

---

## 1. Accessibilité (WCAG 2.2 AA / RGAA 4.1)

### Résultats axe-core (accesslint)

| Page | Violations | Détail |
|------|-----------|--------|
| index.html | 0 | - |
| espaces-augmentés.html | 0 | - |
| expériences-series.html | 0 | - |
| experience-monroe.html | 0 | - |
| monroe-piece.html | 0 | - |
| monroe-roman-graphique.html | 0 | - |
| monroe-installation.html | 0 | - |
| monroe-photographie.html | 0 | - |
| monroe-composition.html | 0 | - |
| monroe-podcasts.html | 0 | - |
| monroe-interviews.html | 0 | - |
| monroe-expériences.html | 0 | - |
| monroe-quiz.html | 0 | - |
| voyage-autour-de-moi.html | 0 | - |
| dessine-moi-le-vent.html | 0 | - |
| ni-vues-ni-connues.html | 0 | - |
| marilyn.html | 0 | - |
| toulouse-lautrec.html | 0 | - |
| charlotte-henschel.html | 0 | - |
| xr-corporate.html | 0 | - |
| reservations.html | 0 | - |
| 404.html | 0 | - |
| plan-du-site.html | 0 | - |
| mentions-légales.html | 1 | Contraste .mentions-legales__update (corrige) |

**Score accessibilité : 23/24 pages sans violation (96 %)**

### Points conformes

- Skip link en dur sur toutes les pages
- Landmarks : header, nav (aria-label unique), main, footer
- h1 présent sur chaque page (sr-only si pas de titre visible)
- Fil d'Ariane avec ol, aria-current="page" sur le dernier lien
- Séparateurs breadcrumb en CSS (pas dans le HTML)
- Menu dropdown : disclosure pattern, aria-expanded, clavier complet
- Hamburger mobile : aria-expanded, aria-controls, focus trap, Escape
- Sous-menu niveau 3 : toggle accessible, Escape cascade
- Textes en casse normale, majuscules via text-transform CSS (RGAA 10.2)
- prefers-reduced-motion respecte (CSS + JS guard)
- Contraste texte/fond conforme AA sur toutes les pages
- Boutons video : intitule explicite identifiant le contenu controle
- CTA reservation : button aria-disabled (pas a href)

### Points a vérifier manuellement

- Navigation clavier complète (Tab, Shift+Tab, Enter, Escape)
- Lecteur d'écran (VoiceOver/NVDA) sur le menu 3 niveaux
- Focus visible sur tous les éléments interactifs
- Zoom 200 % (amélioré, à re-tester après corrections)

---

## 2. SEO

### Conforme

- html lang="fr" sur toutes les pages
- title unique et descriptif (24/24)
- meta description unique (24/24)
- Open Graph : og:title, og:description, og:type, og:url (24/24)
- Sitemap.xml : 23 pages (404 exclue), priorités correctes
- Robots.txt : Allow /, Disallow /404.html, sitemap référence
- Hiérarchie titres h1 > h2 > h3 respectée
- Alt text descriptif sur les images

### A corriger

| Sévérité | Problème | Impact |
|----------|----------|--------|
| MAJEUR | Canonical URLs avec placeholder `https://DOMAINE/` | SEO, déduplication Google |
| MAJEUR | og:image manquante sur 23/24 pages | Aperçu réseaux sociaux |
| MAJEUR | Sitemap et robots.txt avec placeholder DOMAINE | Crawl SEO |
| MINEUR | Favicon absent (commente) | Affichage onglet navigateur |

### Préconisation SEO

1. Remplacer `https://DOMAINE/` par le domaine réel avant mise en prod
2. Ajouter une og:image sur chaque page (image représentative du projet)
3. Créer un favicon.ico et décommenter la balise link

---

## 3. Technique

### Conforme

- DOCTYPE html5 valide (24/24)
- Charset UTF-8 (24/24)
- Viewport responsive (24/24)
- Chemins relatifs corrects (0 lien casse vers fichier HTML)
- CSS en variables, pas de couleur en dur hors :root
- JS defer, pas de script bloquant
- Chargement conditionnel Vimeo API (guard iframe)
- Lazy loading sur les images (sauf hero)
- Fonts préloadées

### A corriger

| Sévérité | Problème | Fichiers | Détail |
|----------|----------|----------|--------|
| CRITIQUE | 124 images sans width/height | 21 fichiers | Cause du CLS (Cumulative Layout Shift) |
| MINEUR | Variable CSS circulaire | style.css L99 | `--color-red-mid: var(--color-red-mid)` |
| MINEUR | Preload hero sans fetchpriority | index.html | Ajouter `fetchpriority="high"` |
| MINEUR | Pas de srcset / picture | Images | Pas de responsive images (une seule resolution) |

### Préconisation technique

1. Ajouter width et height sur toutes les images (prévient le CLS)
2. Corriger la variable CSS circulaire
3. Envisager srcset pour les images lourdes (pages projet)
4. Ajouter fetchpriority="high" sur le preload hero

---

## 4. Sécurité

### Conforme

- Liens externes avec target="_blank" rel="noopener noreferrer" (24/24)
- Pas d'inline JavaScript
- Pas de données sensibles en clair
- Pas de formulaires (pas de risque XSS/injection)
- mailto: correctement formatés
- Iframes Vimeo/YouTube avec attributs allow restrictifs

### Préconisation sécurité

1. Ajouter un Content-Security-Policy via .htaccess ou headers serveur
2. Ajouter X-Frame-Options et X-Content-Type-Options cote serveur
3. Configurer HTTPS avec HSTS avant mise en prod

---

## 5. UX / Parcours utilisateurs

### Parcours principaux

| Parcours | Fonctionnel | Détail |
|----------|------------|--------|
| Accueil > Espaces augmentés | Oui | Menu + breadcrumb |
| Accueil > Experiences > Projet | Oui | Menu dropdown + vignettes pages 9/10 |
| Accueil > Monroe > Sous-page | Oui | Menu 3 niveaux + cartes pages 13/24 |
| Accueil > Reservations | Oui | Menu direct |
| Retour depuis sous-page | Oui | Breadcrumb + menu |
| Page introuvable | Oui | 404 avec plan du site |
| Plan du site | Oui | Arborescence complète |
| Mentions légales | Oui | Contenu LCEN complet |

### Points forts UX

- Navigation 3 niveaux cohérente et accessible
- Fil d'Ariane sticky (visible au scroll)
- Header fixe avec menu persistant
- Video hero avec controle son
- Video contact avec play/pause
- Plan du site avec video d'ambiance
- Footer avec liens utiles (équipe, contact, plan, mentions)

### A corriger

| Sévérité | Problème | Détail |
|----------|----------|--------|
| CRITIQUE | 2x boutons "Je m'inscris" cassés | reservations.html : href="#" sans destination |
| MINEUR | Pas de retour haut de page | Pas de bouton "retour en haut" sur les pages longues |
| MINEUR | Pas de fil d'Ariane inter-projet | Navigation entre projets uniquement via menu |

### Préconisation UX

1. Convertir les boutons "Je m'inscris" en button aria-disabled (comme RESERVER)
2. Ajouter un bouton "retour en haut" sur les pages avec 3+ sections
3. Envisager une navigation Précédent/Suivant entre projets (optionnel)

---

## 6. Bonnes pratiques

### Conforme

- Pas de console.log en production
- Commentaires HTML cohérents (Page PDF N)
- Code CSS organisé en sections commentées
- BEM naming sur les composants
- Pas de CSS inline (sauf background-image sur cartes Monroe)
- Script JS unique, fonctions avec guards

### A corriger

| Sévérité | Problème | Détail |
|----------|----------|--------|
| MINEUR | TODO favicon dans le HTML source | Visible dans le code source |
| MINEUR | background-image inline sur cartes page 13/24 | Idéalement en CSS ou data-attribute |

---

## 7. Performance (estimation)

| Métrique | Estimation | Objectif |
|----------|-----------|---------|
| LCP (Largest Contentful Paint) | ~1.5s (pages projet) | < 2.5s |
| CLS (Cumulative Layout Shift) | ~0.3 (images sans dimensions) | < 0.1 |
| FID (First Input Delay) | < 100ms (JS leger) | < 100ms |
| TBT (Total Blocking Time) | < 50ms (pas de framework) | < 200ms |

### Préconisation performance

1. **Prioritaire** : ajouter width/height sur les 124 images (CLS)
2. Optimiser les images (compression, WebP avec fallback)
3. Preload LCP image sur chaque page projet
4. Envisager lazy loading des iframes Vimeo

---

## Resume des actions par priorité

### Avant mise en production (bloquant)

1. Remplacer `https://DOMAINE/` par le domaine réel (46 occurrences)
2. Ajouter width/height sur les 124 images
3. Corriger les 2 boutons "Je m'inscris" (href="#")
4. Créer le favicon
5. Configurer HTTPS + headers sécurité

### Améliorations recommandées

6. Ajouter og:image sur chaque page
7. Optimiser les images (compression, formats modernes)
8. Ajouter fetchpriority sur le preload hero
9. Corriger la variable CSS circulaire
10. Convertir background-image inline en CSS

### Optionnel (post-lancement)

11. Bouton retour en haut de page
12. Navigation inter-projets
13. Responsive images (srcset/picture)
14. Content-Security-Policy headers

---

## Note finale

| Catégorie | Score | Détail |
|-----------|-------|--------|
| Accessibilité | 92/100 | 0 violation axe-core, menu 3 niveaux accessible, RGAA 10.2 conforme. -8 pour zoom 200 % à re-tester et verification lecteur d'écran manuelle |
| SEO | 65/100 | Titres et descriptions parfaits, mais canonical/sitemap avec placeholder et og:image manquante |
| Technique | 78/100 | HTML/CSS/JS propres, mais 124 images sans dimensions (CLS) |
| Sécurité | 85/100 | Pas de vulnérabilité cote client, mais headers serveur non configurés |
| UX | 88/100 | Parcours cohérents, navigation 3 niveaux, 2 boutons cassés |
| Bonnes pratiques | 90/100 | Code propre, BEM, variables CSS, JS leger |

### Note globale : 83/100

**Le site est fonctionnel et largement accessible.** Les points bloquants avant mise en production sont le domaine réel (SEO), les dimensions d'images (performance) et les 2 boutons cassés (UX). L'architecture multi-pages avec navigation 3 niveaux et accessibilité RGAA est solide.
