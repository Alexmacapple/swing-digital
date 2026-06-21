# PRD : navigation XR et Films

**Statut** : cadrage fondé sur les sources, prêt à arbitrer
**Date** : 2026-06-21
**Périmètre** : `src/` public Swing Digital, puis génération vers `dist/`
**Objectif court** : séparer la rubrique XR / immersive de la rubrique audiovisuelle sans renommer les URL existantes.

> Note 2026-06-21 : ce document reste le cadrage source détaillé. Le PRD canonique de suivi est désormais `prd-meta-workflow/PRD-011-menu-decoupage-xr-films.MD`.

**PDG-LARGE-FILE-JUSTIFICATION:** ce PRD dépasse 200 lignes parce qu’il regroupe le diagnostic fondé sur les sources, le cadrage produit, la liste de contrôle d’implémentation et le passage PDG dans un seul fichier de transmission. Le sujet touche les 24 pages HTML existantes, une 25e page à créer, la navigation, le JS d’état actif, les données structurées, le sitemap et les fichiers IA publics ; séparer ces éléments augmenterait le risque d’exécution partielle.

---

## 1. Verdict sur le PRD initial

Le besoin est juste, mais le PRD initial sous-estime la surface réelle du code.

La demande ne doit pas être traitée comme un simple changement de libellés de menu. Le site est statique, sans partial HTML, avec header, fil d’Ariane, footer et JSON-LD dupliqués dans les 24 pages existantes. La séparation XR / Films touche aussi `llms.txt`, `for-ai.json`, `for-ai.txt`, `for-ai/index.html`, `schema-webpage.jsonld`, `sitemap.xml` et `src/js/main.js`.

Score du PRD initial, après inspection du code : **13/20**.

Points solides :

- le déplacement de `Ni vues ni connues` hors de l’univers XR est fondé ;
- la conservation des URL existantes est le bon choix ;
- le PRD identifie bien les fils d’Ariane, le footer et le plan du site.

Points à corriger :

- il oublie l’état actif géré par `src/js/main.js` ;
- il oublie les données structurées `BreadcrumbList` ;
- il oublie les fichiers GEO / IA publics ;
- il ne dit pas quoi faire du contenu de `experiences-series.html`, qui affiche encore une carte `Ni vues ni connues` ;
- il laisse ouverte l’option d’un onglet `Films` pointant directement vers `ni-vues-ni-connues.html`, ce qui crée une arborescence fragile.

---

## 2. Sources inspectées

| Élément | Source inspectée | Constat |
|---|---|---|
| Architecture | `AGENTS.md`, `CLAUDE.md`, `README.md` | Site statique HTML/CSS/JS, source publique dans `src/`, copie vers `dist/`. |
| Navigation | `src/*.html` | 24 pages HTML existantes contiennent la navigation dupliquée. |
| État actif | `src/js/main.js` | `sectionMap` ne connaît que `accueil`, `espaces`, `reservations`; `experiences` active le bouton de menu déroulant. |
| Rubrique actuelle | `src/experiences-series.html` | La page contient encore `Ni vues ni connues` dans le tableau et la grille de cartes. |
| Page documentaire | `src/ni-vues-ni-connues.html` | Le contenu dit `Série documentaire - 8 minutes`, mais les métadonnées parlent encore d’expérience immersive. |
| Surfaces IA / GEO | `src/llms.txt`, `src/for-ai.*`, `src/schema-webpage.jsonld` | Ces fichiers citent encore l’ancienne taxonomie, ou l’ancienne URL de rubrique, comme source canonique. |
| Sitemap | `src/sitemap.xml` | Pas de page `films.html`; `experiences-series.html` reste page canonique publiée. |

Inventaire quantifié dans `src/*.html` :

- `Expériences Séries` : 87 occurrences dans 24 fichiers ;
- `experiences-series.html` : 68 occurrences dans 24 fichiers ;
- `Ni vues ni connues` : 40 occurrences dans 24 fichiers ;
- `Espaces augmentés` : 60 occurrences dans 24 fichiers ;
- `Réservations` : 62 occurrences dans 24 fichiers.

---

## 3. Décision produit recommandée

Créer une vraie rubrique `Films` avec une page source `src/films.html`.

Cette option est plus robuste que de faire pointer l’onglet `Films` directement vers `ni-vues-ni-connues.html`, car elle permet :

- un fil d’Ariane cohérent : `Accueil > Films > Ni vues ni connues` ;
- un état actif `Films` stable sur la page liste et sur la page projet ;
- une entrée sitemap et GEO propre ;
- l’ajout futur d’autres films sans changer à nouveau l’architecture.

Conserver les URL existantes :

- `experiences-series.html` reste l’URL de la rubrique XR, mais son libellé visible devient `XR` ;
- `ni-vues-ni-connues.html` reste l’URL du projet ;
- `espaces-augmentes.html` et `reservations.html` restent inchangées.

Ne pas créer `xr.html` dans cette itération.

---

## 4. Navigation cible

Ordre du menu principal, sur desktop et mobile :

```text
Accueil - XR - Espace augmenté - Films - Réservation
```

Interprétation recommandée :

| Entrée | Type | Cible | Notes |
|---|---|---|---|
| Accueil | lien | `index.html` | Inchangé. |
| XR | bouton de menu déroulant | `submenu-experiences` | Remplace le libellé visible `Expériences Séries`; le mécanisme de menu déroulant peut garder ses identifiants internes. |
| Espace augmenté | lien | `espaces-augmentes.html` | Libellé menu au singulier si demandé ; titre, H1 et SEO peuvent rester `Espaces augmentés`. |
| Films | lien | `films.html` | Nouvelle page liste audiovisuelle. |
| Réservation | lien | `reservations.html` | Libellé menu au singulier ; route inchangée. |

Contenu du menu déroulant `XR` :

- `Tous les projets XR`, vers `experiences-series.html`, pour que la page rubrique reste atteignable depuis la navigation principale ;
- `L'Expérience Monroe`, avec son sous-menu actuel conservé ;
- `Voyage autour de moi` ;
- `Dessine-moi le vent` ;
- `Marilyn` ;
- `Toulouse-Lautrec` ;
- `Charlotte Henschel` ;
- `XR Corporate`.

`Ni vues ni connues` ne doit plus apparaître dans le menu déroulant `XR`.

---

## 5. Contenus à modifier

### 5.1 Page `experiences-series.html`, devenue rubrique XR

La page garde son fichier et son canonical, mais son contenu visible et ses métadonnées doivent refléter la rubrique XR.

À modifier :

- titre visible / H1 masqué : `XR` ;
- title SEO : `XR, expériences immersives et réalité mixte - Swing Digital` ;
- meta description, Open Graph et Twitter description ;
- `BreadcrumbList` JSON-LD : nom de l’item 2 = `XR` ;
- fil d’Ariane visible : `Accueil > XR` ;
- texte du panneau SEO/GEO : retirer `Ni vues ni connues` des expériences éditoriales ;
- grille de cartes : retirer la carte `Ni vues ni connues` ou la remplacer par un projet XR existant ;
- footer : remplacer l’ancien libellé.

Point d’attention visuel : la grille `.page9__grid` est actuellement en `repeat(2, 1fr)` et contient 4 cartes. Si une carte est supprimée sans remplacement, vérifier le rendu de la grille à 1920, 1024, 768 et 375 px.

### 5.2 Nouvelle page `films.html`

Créer `src/films.html` à partir du squelette existant d’une page simple.

Contenu minimal :

- H1 : `Films` ;
- sous-titre : `Films, séries documentaires et récits audiovisuels` ;
- une carte projet vers `ni-vues-ni-connues.html` ;
- description courte : `Série documentaire - Portraits de femmes` ;
- JSON-LD `BreadcrumbList` : `Accueil > Films` ;
- canonical : `https://swing.appmiweb.com/films.html` ;
- `body data-section="films" data-page="films"`.

Ne pas créer une nouvelle charte graphique pour cette page. Réutiliser les composants existants et limiter le CSS à un bloc scoped si nécessaire.

### 5.3 Page `ni-vues-ni-connues.html`

À modifier :

- `body data-section="films"` pour activer le bon onglet ;
- breadcrumb visible : `Accueil > Films > Ni vues ni connues` ;
- `BreadcrumbList` JSON-LD : item 2 = `Films`, item 3 = `Ni vues ni connues` ;
- meta description : remplacer `expérience immersive` par une formulation audiovisuelle ;
- Open Graph et Twitter description alignées ;
- ne pas changer l’URL ni les assets.

### 5.4 Navigation dupliquée dans les 24 pages existantes, puis dans `films.html`

Mettre à jour dans chaque page HTML existante, puis reporter la même navigation dans `src/films.html` :

- ordre du menu principal ;
- libellé `XR` ;
- ajout d’un premier lien `Tous les projets XR` vers `experiences-series.html` dans le sous-menu XR ;
- retrait de `Ni vues ni connues` du sous-menu XR ;
- ajout du lien `Films` ;
- libellés `Espace augmenté` et `Réservation`, si arbitrage confirmé ;
- footer secondaire ;
- état `aria-current` initial cohérent avec la page.

Le menu mobile n’est pas un fichier séparé : il utilise le même DOM et les mêmes classes CSS. La validation doit donc se faire sur la même navigation avec le breakpoint mobile.

### 5.5 JavaScript

Mettre à jour `src/js/main.js` :

```js
var sectionMap = {
    'accueil': 'index.html',
    'espaces': 'espaces-augmentes.html',
    'films': 'films.html',
    'reservations': 'reservations.html'
};
```

Conserver le comportement spécial `section === 'experiences'` pour le bouton de menu déroulant XR.

### 5.6 Plan du site, sitemap et fichiers IA

Mettre à jour :

- `src/plan-du-site.html` : ajouter `Films`, placer `Ni vues ni connues` sous cette rubrique, renommer `Expériences Séries` en `XR` ;
- `src/sitemap.xml` : ajouter `https://swing.appmiweb.com/films.html` et mettre à jour les `lastmod` des pages touchées ;
- `src/llms.txt` ;
- `src/for-ai.json` ;
- `src/for-ai.txt` ;
- `src/for-ai/index.html` ;
- `src/schema-webpage.jsonld`.

### 5.7 CSS et cache-buster

Si l’ajout du cinquième item de menu exige une modification de `src/css/style.css`, mettre à jour le paramètre `?v=...` de `css/style.css` dans toutes les pages HTML concernées, conformément à `AGENTS.md`.

---

## 6. Non-objectifs

Cette itération ne doit pas :

- renommer `experiences-series.html` ;
- renommer `ni-vues-ni-connues.html` ;
- créer des redirections ;
- déplacer automatiquement `Voyage autour de moi` ou `Série Marilyn` vers `Films` ;
- refactorer toute la navigation en partials ;
- installer un framework, un bundler ou un nouveau système de routage ;
- modifier le scénario `Réservations` au-delà du libellé visible.

---

## 7. Points à arbitrer avant implémentation

1. Confirmer que le menu doit afficher `Espace augmenté` et `Réservation` au singulier, même si les pages restent `espaces-augmentes.html` et `reservations.html`.
2. Choisir le remplacement visuel de la carte `Ni vues ni connues` dans la grille XR : suppression avec grille à 3 cartes, remplacement par `XR Corporate`, ou réorganisation plus légère de la grille.
3. Confirmer que `Ni vues ni connues` est le seul contenu à migrer vers `Films` dans cette itération.

Recommandation : valider les trois points avant de modifier les 24 pages existantes et de créer `films.html`.

---

## 8. Critères d’acceptation

La modification est acceptable si :

- le menu principal affiche exactement `Accueil - XR - Espace augmenté - Films - Réservation` sur toutes les pages HTML publiées, soit 25 pages après ajout de `films.html` ;
- le menu déroulant `XR` ne contient plus `Ni vues ni connues` ;
- le menu déroulant `XR` contient un accès explicite à la page rubrique `experiences-series.html` ;
- `films.html` existe, est indexable et présente `Ni vues ni connues` ;
- `ni-vues-ni-connues.html` a pour fil d’Ariane `Accueil > Films > Ni vues ni connues` ;
- les `BreadcrumbList` JSON-LD visibles dans les pages modifiées correspondent aux fils d’Ariane visibles ;
- aucun texte public de `src/` ne contient encore le libellé visible `Expériences Séries` ;
- `experiences-series.html` reste accessible et canonique, mais se présente comme `XR` ;
- `llms.txt`, `for-ai.*` et `schema-webpage.jsonld` ne continuent pas à orienter les agents vers l’ancienne taxonomie ;
- `sitemap.xml` référence `films.html` et aucune page absente ;
- la navigation clavier reste fonctionnelle : Tab, Escape, flèches dans le menu déroulant, ouverture/fermeture du sous-menu Monroe ;
- le menu ne déborde pas aux largeurs 1920, 1024, 768, 600 et 375 px ;
- si `src/css/style.css` change, le cache-buster CSS est mis à jour sur les pages HTML concernées.

---

## 9. Vérification attendue

Commandes minimales après implémentation :

```bash
rg -n "Expériences Séries" src
rg -n "films.html|Films" src/llms.txt src/for-ai.json src/for-ai.txt src/for-ai/index.html src/schema-webpage.jsonld src/sitemap.xml src/*.html
npm run build:prod
npm run appmiweb:preflight
```

Contrôles manuels ou navigateur :

- ouvrir `src/index.html`, `src/experiences-series.html`, `src/films.html`, `src/ni-vues-ni-connues.html` via serveur local ;
- tester le menu déroulant XR au clavier ;
- vérifier le rendu desktop et mobile ;
- vérifier que `dist/` reflète le contenu après génération.

Note : dans l’état inspecté, `playwright.config.js` pointe vers `./tests`, mais aucun fichier de test versionné n’a été trouvé. `npm test` et `npm run seo:check` ne doivent donc pas être présentés comme preuves suffisantes tant que la suite de tests n’est pas restaurée ou confirmée disponible.

---

## 10. Passage PDG

Contrôle : **Auto-vérification PDG, pas une revue indépendante**.

Connus connus :

- le site est statique et la navigation est dupliquée dans les 24 pages HTML existantes ;
- `films.html` portera la surface finale à 25 pages HTML publiées ;
- `dist/` est généré par copie de `src/` via `scripts/build-prod.js` ;
- `Ni vues ni connues` est documentaire dans son contenu visible ;
- `src/js/main.js` doit connaître la section `films` pour l’état actif.

Connus inconnus :

- arbitrage final sur les libellés singuliers `Espace augmenté` et `Réservation` ;
- choix visuel pour la grille XR après retrait de la carte documentaire ;
- disponibilité réelle d’une suite Playwright hors dépôt.

Inconnus connus :

- changer seulement le menu visible laisserait des breadcrumbs, JSON-LD et fichiers IA contradictoires ;
- créer un onglet `Films` sans page `films.html` rendrait l’arborescence plus fragile pour les fils d’Ariane et les ajouts futurs ;
- modifier 24 headers existants puis créer un 25e header dans `films.html` expose à une divergence entre pages.

Inconnus inconnus :

- effet réel du cinquième item de menu sur les breakpoints intermédiaires ;
- effets SEO/GEO d’une taxonomie changée sans redéploiement synchronisé de `llms.txt` et `/for-ai`.

Mauvais chemin d’implémentation :

- remplacer `Expériences Séries` par `XR` globalement, ajouter un lien `Films`, puis s’arrêter là.

Garde-fou ajouté :

- la page `films.html`, `main.js`, les breadcrumbs JSON-LD, le plan du site, le sitemap et les fichiers IA sont dans le périmètre obligatoire ;
- le sous-menu XR doit garder un chemin de navigation explicite vers `experiences-series.html`.

Comportement existant à préserver :

- URL existantes ;
- menu déroulant XR et sous-menu Monroe ;
- accessibilité clavier ;
- skip link, fil d’Ariane sticky, footer ;
- absence de framework et de bundler.

Raccourcis interdits :

- `MUST NOT` renommer les fichiers existants ;
- `MUST NOT` laisser `Ni vues ni connues` dans le menu déroulant XR ;
- `MUST NOT` rendre la page rubrique XR orpheline dans la navigation principale ;
- `MUST NOT` laisser l’ancien libellé public dans `src/` ;
- `MUST NOT` déclarer la navigation validée sans test mobile et clavier.

Preuve de régression requise :

- génération `dist/` ;
- preflight Appmiweb ;
- contrôle `rg` des libellés ;
- inspection navigateur des quatre routes clés : accueil, XR, Films, Ni vues ni connues.
