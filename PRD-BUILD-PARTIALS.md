# PRD : Système de build par partials HTML

**Statut** : Proposé
**Date** : 2026-03-23
**Auteur** : Alex
**Projet** : Swing Digital

> Mise à jour 2026-06-21 : ce PRD reste une proposition historique de factorisation HTML. Le projet dispose désormais d'un packaging de production via `scripts/build-prod.js`, d'un dossier public `dist/`, d'une typographie Satoshi auto-hébergée et de PRD séparés pour la production SEO/GEO et les transcripts accessibles.

> Note 2026-06-21 : le PRD-011 confirme que la navigation dupliquée augmente le risque des évolutions de menu. La factorisation par partials reste toutefois hors périmètre du PRD-011, afin de ne pas mélanger redécoupage éditorial et refonte de build.

---

## État courant au 2026-06-21

- Le build de production actuel ne repose pas sur des partials HTML.
- `npm run build:prod` génère `dist/` en excluant les artefacts de travail.
- `npm run appmiweb:preflight` valide la préproduction Appmiweb.
- Le site courant contient 25 pages HTML top-level après ajout de `films.html` par PRD-011.
- Le harnais Playwright versionné est restauré : `npm test` couvre PRD-011 et le socle SEO/GEO local, `npm run seo:check` cible `tests/seo-geo.spec.js`.
- Les polices actives sont `Satoshi-Variable.woff2` et `Satoshi-VariableItalic.woff2`; les anciens OTF/TTF Brandon, Fragen et Raleway ont été supprimés.
- Les placeholders SEO `DOMAINE` sont remplacés en préproduction par `https://swing.appmiweb.com`.
- La production finale devra utiliser `npm run seo:set-base -- https://domaine-final`.

Ce PRD ne doit donc pas être utilisé comme checklist de production. Il reste utile pour une future réduction de duplication HTML.

---

## Contexte

Le site Swing Digital est composé de 25 pages HTML top-level statiques partageant un header, un footer et un bloc head proches. Ces composants sont aujourd'hui copiés-collés dans chaque fichier. Toute modification (ajout d'un lien de navigation, correction d'un texte, nouveau projet dans le dropdown) doit être répliquée manuellement sur les pages concernées.

Au moment de rédaction de ce PRD, le site disposait de 984 tests Playwright sur 4 viewports et d'une conformité WCAG 2.2 AA validée. Toute solution doit préserver ces acquis ainsi que les contrôles SEO/GEO ajoutés depuis.

## Problème

1. **Duplication** : 3 blocs communs (head, header, footer) dupliqués dans 25 fichiers top-level
2. **Risque d'inconsistance** : une modification oubliée dans 1 fichier crée une divergence silencieuse
3. **Coût de maintenance** : chaque changement dans la navigation nécessite des édits synchronisés sur les 25 pages top-level
4. **Fragilité** : les tests détectent les divergences, mais seulement après coup

## Solution retenue : script de build maison (Option 2)

Un script Node.js qui assemble les pages finales à partir de fichiers sources contenant des marqueurs de substitution et de fichiers partials partagés.

### Options évaluées

#### Option A : Include JS côté client (fetch + innerHTML)

**Avantage** : zéro build, immédiat
**Rejet** : dégrade le SEO (HTML absent de la source), provoque du FOUC, retarde le skip link (accessibilité)

#### Option B : Script de build maison (retenue)

**Avantage** : HTML final identique, zéro impact SEO/a11y, un seul endroit à modifier, zéro dépendance runtime
**Inconvénient** : nécessite un `npm run build` avant déploiement

#### Option C : SSG (11ty / Astro)

**Avantage** : écosystème mature, layouts, données JSON
**Rejet** : surdimensionné pour le besoin (le site est terminé), courbe d'apprentissage, ajoute une dépendance lourde

## Architecture cible

### Structure des fichiers

```
swing-digital/
├── src/                          # Sources (existant, réorganisé)
│   ├── _partials/                # NOUVEAU : composants partagés
│   │   ├── head.html             # <head> commun (méta, fonts, css)
│   │   ├── header.html           # <header> + nav 3 niveaux (version neutre)
│   │   └── footer.html           # <footer> + <script>
│   ├── pages/                    # NOUVEAU : pages sources (contenu seul)
│   │   ├── index.html
│   │   ├── espaces-augmentes.html
│   │   └── ... (24 fichiers)
│   ├── css/style.css
│   ├── js/main.js
│   ├── img/
│   ├── fonts/
│   └── video/
├── dist/                         # NOUVEAU : sortie du build (HTML assemblés)
│   ├── index.html                # Pages HTML complètes
│   ├── espaces-augmentes.html
│   ├── css/ -> symlink vers src/css/
│   ├── js/  -> symlink vers src/js/
│   ├── img/ -> symlink vers src/img/
│   ├── fonts/ -> symlink vers src/fonts/
│   ├── video/ -> symlink vers src/video/
│   └── ...
├── build.js                      # NOUVEAU : script de build
├── tests/                        # Existant (pointe vers dist/)
└── playwright.config.js          # Existant (baseURL -> dist/)
```

**Choix assets** : symlinks relatifs dans `dist/` pointant vers `src/`. Les assets (158 Mo d'images, vidéos, polices) ne sont ni copiés ni dupliqués. Le script crée les symlinks au premier build. Si le déploiement cible ne supporte pas les symlinks, une option `--copy` copiera les fichiers.

**Versionnement** : `dist/` est ajouté au `.gitignore`. C'est un artefact de build, régénérable par `node build.js`.

### Format des pages sources

Chaque page source contient uniquement le contenu spécifique, avec des marqueurs pour les partials :

```html
<!DOCTYPE html>
<html lang="fr">
{{head title="Espaces augmentés - Swing Digital" description="..." canonical="espaces-augmentes.html"}}
<body data-section="espaces" data-page="espaces-augmentes">
    <a href="#main-content" class="skip-link">Aller au contenu principal</a>

    {{header}}

    <!-- Fil d'Ariane -->
    <nav aria-label="Fil d'Ariane" class="breadcrumb">
        <ol class="breadcrumb__list">
            <li class="breadcrumb__item"><a href="index.html" class="breadcrumb__link">Accueil</a></li>
            <li class="breadcrumb__item"><span aria-current="page">Espaces augmentés</span></li>
        </ol>
    </nav>

    <main id="main-content">
        <!-- Contenu spécifique de la page -->
    </main>

    {{footer}}
</body>
</html>
```

### Format des partials

#### `_partials/head.html`

Template avec variables interpolées :

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <meta name="description" content="{{description}}">
    <link rel="canonical" href="https://DOMAINE/{{canonical}}">
    <meta property="og:title" content="{{title}}">
    <meta property="og:description" content="{{description}}">
    <meta property="og:image" content="img/hero/hero-featured-image.jpg">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://DOMAINE/{{canonical}}">
    <link rel="icon" href="img/favicon.ico">
    <link rel="stylesheet" href="css/style.css?v={{cssVersion}}">
</head>
```

#### `_partials/header.html`

Le header complet avec la navigation 3 niveaux, stocké en **version neutre** (sans `aria-current="page"`, sans classes `site-nav__link--active` ni `site-nav__btn--active`).

**Injection de l'état actif par le build** (RGAA 12.2 -- indication de la page active) :

Le script `build.js` connaît le nom du fichier qu'il génère. Après insertion du header neutre, il ajoute automatiquement `aria-current="page"` et la classe `--active` sur le lien correspondant à la page courante. Cela garantit :

1. **Accessibilité sans JS** : l'`aria-current="page"` est présent dans le HTML source, un lecteur d'écran identifie la page active même si JavaScript est désactivé ou échoue
2. **Compatibilité avec le JS existant** : `initNavActiveState()` dans `main.js` supprime puis réapplique les états actifs au chargement -- le résultat final est identique
3. **Fiabilité** : le build ne peut pas "oublier" une page (contrairement au copier-coller manuel actuel)
4. **HTML final identique** à l'existant, aucune régression

Mapping utilisé par le build :

| `data-section` sur `<body>` | Lien activé | Attributs ajoutés |
|-----------------------------|-------------|-------------------|
| `accueil` | `href="index.html"` | `aria-current="page"` + `site-nav__link--active` |
| `espaces` | `href="espaces-augmentes.html"` | `aria-current="page"` + `site-nav__link--active` |
| `reservations` | `href="reservations.html"` | `aria-current="page"` + `site-nav__link--active` |
| `experiences` | bouton `aria-controls="submenu-experiences"` | `site-nav__btn--active` |
| `experiences` + lien sous-menu correspondant au fichier | lien `.site-nav__submenu-link` | `aria-current="page"` |

#### `_partials/footer.html`

Le footer + la balise `<script>`.

### Le script `build.js`

Responsabilités :

1. Lire chaque fichier dans `src/pages/`
2. Remplacer les marqueurs `{{header}}`, `{{footer}}`, `{{head ...}}` par le contenu des partials
3. Pour `{{head}}`, interpoler les variables (`title`, `description`, `canonical`)
4. Écrire le résultat dans `dist/`
5. Créer les symlinks pour les assets statiques (`css/`, `js/`, `img/`, `fonts/`, `video/`) s'ils n'existent pas déjà
6. Copier les fichiers racine statiques (`robots.txt`, `sitemap.xml`, `favicon.ico`) dans `dist/`

Contraintes :

- Zéro dépendance npm (utilise uniquement `fs` et `path` natifs)
- Exécution : `node build.js`
- Option `--watch` : surveille les fichiers sources et relance le build automatiquement (utilise `fs.watch`)
- Alias npm : `npm run build` et `npm run dev` (build + watch)
- Le script doit être idempotent (relancer produit le même résultat)
- Afficher un résumé en fin de build : nombre de pages générées, temps écoulé

### Gestion des cas particuliers

| Cas | Traitement |
|-----|------------|
| Page 404 (pas de canonical/og) | Utilise un partial `head-minimal.html` sans les balises og ni canonical, ou le partial `head` avec variables optionnelles (les lignes og/canonical sont omises si la variable `canonical` est absente) |
| Preload vidéo hero (index seul) | Reste dans le contenu spécifique de `index.html`, pas dans le partial head |
| Breadcrumb (variable par page) | Reste dans le contenu spécifique de chaque page |
| États actifs du header (`aria-current`, classes `--active`) | Le partial header est stocké en version neutre. Le script `build.js` injecte `aria-current="page"` et les classes `--active` sur le bon lien selon le fichier généré. Le JS existant (`initNavActiveState`) continue de fonctionner par-dessus |
| Skip link | Reste dans le contenu spécifique (avant `{{header}}`) |

### Environnement vérifié

Points validés par inspection du code (2026-03-23) :

- **Head identique** sur les 23 pages standard (seuls title, description, canonical varient). La page 404 n'a ni canonical ni og
- **Footer identique** (17 lignes) sur les 24 pages, un seul `<script src="js/main.js" defer>`
- **Aucun script ni CSS additionnel** par page
- **Liens tous relatifs au même niveau** (`href="monroe-piece.html"`, jamais de sous-dossier)
- **Playwright** : `python3 -m http.server 8080 --directory src`, baseURL `http://localhost:8080`
- **Scripts npm existants** : aucun (`"test"` uniquement)
- **`pages-extracted/`** : archive de travail (extraction maquette PDF), à exclure du build
- **`robots.txt` et `sitemap.xml`** : fichiers statiques à copier vers `dist/`
- **`EXPORT_HD/`** : à la racine du projet, hors `src/`, non concerné par le build

## Plan de migration

### Phase 1 : Extraction des partials (sans casser l'existant)

1. Créer `src/_partials/` avec les 3 fichiers (head, header neutre, footer)
2. Créer `build.js`
3. Convertir une page test (ex : `mentions-legales.html`) en format source dans `src/pages/`
4. Lancer le build, comparer le HTML généré avec l'original (`diff`)
5. Valider que les tests Playwright passent sur cette page

### Phase 2 : Migration progressive

6. Convertir les pages par lot de 4-5
7. Après chaque lot : build + diff + tests
8. Quand les 24 pages sont migrées : supprimer les anciens fichiers HTML de `src/`

### Phase 3 : Ajustements

9. Mettre à jour `playwright.config.js` : changer `--directory src` en `--directory dist`
10. Ajouter `dist/` au `.gitignore`
11. Ajouter `npm run build` et `npm run dev` dans le README
12. Mettre à jour le CLAUDE.md du projet

## Critères de validation

| Critère | Méthode de vérification |
|---------|------------------------|
| HTML final identique | `diff` entre `dist/` et ancien `src/` (aucune différence) |
| Suite Playwright complète passe | `npm test` sans échec bloquant |
| 0 violation axe-core | Tests accessibilité existants |
| Pas de régression visuelle | Inspection manuelle des pages clés (accueil, Monroe, réservations) |
| Build rapide | < 1 seconde pour 24 pages |
| Script sans dépendance | `node build.js` fonctionne sans `npm install` |

## Risques

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Divergence HTML après migration | Moyenne | Fort | Diff systématique avant validation |
| Oubli d'un cas particulier (preload, méta spécifique) | Faible | Moyen | Revue page par page lors de la migration |
| Régression accessibilité | Faible | Fort | Tests Playwright existants couvrent ce cas |
| Complexité du script de build | Faible | Faible | Le script fait < 100 lignes, logique simple |

## Rollback

Les fichiers sources originaux dans `src/` sont conservés intacts jusqu'à la fin de la phase 2 (étape 8). Pendant toute la migration, les deux versions coexistent.

**En cas d'échec en phase 1 ou 2** : supprimer `src/pages/`, `src/_partials/`, `build.js` et `dist/`. Les fichiers HTML originaux dans `src/` n'ont pas été modifiés.

**En cas d'échec en phase 3** : `git revert` du commit de la phase 3. Les fichiers de phase 2 restent fonctionnels.

## Hors périmètre

- Minification CSS/JS (sujet séparé)
- Remplacement du placeholder `DOMAINE` (sujet séparé, dépend du choix d'hébergement)
- Optimisation des images (sujet séparé)
- Migration vers un SSG

---

**Décision attendue** : validation du PRD avant implémentation.
