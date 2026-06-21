# PRD-011 : Menu et découpage XR / Films

**Statut** : Prêt à arbitrer
**Date** : 2026-06-21
**Auteur** : Alex
**Source** : Conversation, `docs/PRD-NAVIGATION-XR-FILMS.md`, `PRD-DECOUPAGE.md` et inspection du code réel

---

## Vision

Le quoi : clarifier la navigation principale et le découpage éditorial du site en séparant la rubrique XR / immersive de la rubrique Films, sans renommer les URL existantes.

Le pourquoi : le menu actuel regroupe des formats hétérogènes sous `Expériences Séries`. Cette taxonomie entretient une ambiguïté entre expériences XR, réalité mixte, spectacle vivant, installations et contenus audiovisuels. Le bon mécanisme est de créer une rubrique `Films` dédiée, tout en gardant `experiences-series.html` comme page rubrique XR afin de préserver les URL, le SEO déjà publié et les liens existants.

Le comment : renvoyé au Plan d'implémentation.

## Exemple bout-en-bout (projeté)

Un visiteur arrive sur `https://swing.appmiweb.com/`.

Le menu principal affiche `Accueil`, `XR`, `Espace augmenté`, `Films`, `Réservation`.

Le visiteur ouvre `XR`. Le menu déroulant liste les projets immersifs et réalité mixte, avec un lien explicite `Tous les projets XR` vers `experiences-series.html`. `Ni vues ni connues` n'apparaît plus dans ce menu.

Le visiteur clique sur `Films`. Il arrive sur `films.html`, nouvelle page liste audiovisuelle.

La page `films.html` présente `Ni vues ni connues` comme série documentaire, avec un lien vers `ni-vues-ni-connues.html`.

Sur `ni-vues-ni-connues.html`, le fil d'Ariane visible devient `Accueil > Films > Ni vues ni connues`. Le `BreadcrumbList` JSON-LD contient la même hiérarchie.

Sur `experiences-series.html`, la page reste accessible et canonique, mais son titre visible, ses métadonnées et son fil d'Ariane parlent de `XR`, pas d'une rubrique générique `Expériences Séries`.

Le sitemap contient `films.html`, les fichiers IA publics (`llms.txt`, `for-ai.*`, `schema-webpage.jsonld`) décrivent la nouvelle taxonomie, et `npm run build:prod` publie 25 pages HTML dans `dist/`.

---

## Contexte

Le site Swing Digital est un site statique multi-pages en HTML, CSS et JavaScript vanilla. La source publique est dans `src/`, la sortie publiable dans `dist/`.

Le PRD historique `PRD-DECOUPAGE.md` a déjà validé la découpe multi-pages : 24 pages HTML, navigation trois niveaux, header persistant, fil d'Ariane et footer communs dupliqués dans chaque page.

Le document `docs/PRD-NAVIGATION-XR-FILMS.md` a identifié un chantier restant : la séparation de la rubrique XR et de la rubrique Films. Il est fondé sur l'inspection de `src/*.html`, `src/js/main.js`, `src/sitemap.xml`, `src/for-ai.*`, `src/llms.txt` et `src/schema-webpage.jsonld`.

Demande produit transmise :

> Dans les onglets, dissocier ce qui est audiovisuel, films et séries, de ce qui est expérience immersive XR. Avoir un onglet XR à la place d'Expérience et série, en y enlevant Ni vues ni connues, et un onglet Films avec Ni vues ni connues. Ordre attendu : Accueil - XR - Espace augmenté - Films - Réservation.

Constats au 2026-06-21 :

- la navigation est dupliquée dans les pages HTML existantes ;
- `Expériences Séries` reste le libellé visible du menu déroulant ;
- `Ni vues ni connues` est présenté dans le contenu comme une série documentaire, mais reste classé dans le menu XR actuel ;
- `src/js/main.js` ne connaît pas encore la section `films` ;
- `films.html` n'existe pas ;
- les fichiers IA / GEO publics doivent rester cohérents avec la taxonomie visible.

---

## Problème

Changer seulement le libellé du menu créerait une incohérence forte : menu, fil d'Ariane, JSON-LD, plan du site, sitemap et fichiers IA pourraient raconter des arborescences différentes.

Le problème n'est donc pas cosmétique. C'est un redécoupage éditorial qui touche la navigation, la hiérarchie d'information, les métadonnées, l'état actif JavaScript et les fichiers publics utilisés par les crawlers et agents IA.

---

## Solution

Créer une vraie rubrique `Films` avec une page `src/films.html`, déplacer `Ni vues ni connues` sous cette rubrique, et renommer la rubrique existante `experiences-series.html` en rubrique visible `XR` sans changer son URL.

La solution conserve :

- les URL existantes ;
- le menu déroulant et le sous-menu Monroe ;
- les chemins relatifs ;
- l'architecture statique sans framework ;
- le build `dist/` par `npm run build:prod`.

La solution ajoute :

- un cinquième item de menu principal `Films` ;
- une section `films` dans `src/js/main.js` ;
- une page `films.html` ;
- une mise à jour des breadcrumbs visibles et JSON-LD ;
- une mise à jour de `sitemap.xml`, `llms.txt`, `for-ai.*`, `schema-webpage.jsonld` et `plan-du-site.html`.

---

## Options évaluées

### Option A (retenue) : vraie rubrique `Films` avec `films.html`

**Avantages** :
- crée une arborescence claire et extensible ;
- permet un fil d'Ariane cohérent : `Accueil > Films > Ni vues ni connues` ;
- stabilise l'état actif du menu via `data-section="films"` ;
- prépare l'ajout futur d'autres films sans restructuration ;
- conserve toutes les URL existantes ;
- évite de rendre `experiences-series.html` orpheline.

**Inconvénients** :
- ajoute une 25e page HTML à maintenir ;
- oblige à modifier la navigation dupliquée dans toutes les pages ;
- impose une validation responsive du cinquième item de menu ;
- demande une mise à jour synchronisée des fichiers IA / GEO.

### Option B : item `Films` pointant directement vers `ni-vues-ni-connues.html`

**Avantages** :
- plus rapide à intégrer ;
- pas de nouvelle page liste ;
- surface de contenu réduite.

**Inconvénients** :
- ne crée pas de vraie rubrique audiovisuelle ;
- complique le fil d'Ariane d'un projet devenu rubrique implicite ;
- ne permet pas d'ajouter proprement un second film ;
- rend l'état actif et la taxonomie IA plus fragiles.

### Option C : simple renommage `Expériences Séries` en `XR`

**Avantages** :
- diff plus petit ;
- pas de nouvelle route ;
- pas de refonte de grille.

**Inconvénients** :
- laisse `Ni vues ni connues` dans une rubrique XR inexacte ;
- ne résout pas le problème éditorial ;
- laisse des métadonnées et fichiers IA contradictoires ;
- risque de dégrader la compréhension humaine et machine du site.

---

## Décision

Retenir l'option A.

`experiences-series.html` reste l'URL canonique de la rubrique XR, mais son libellé visible devient `XR`.

`films.html` devient la page rubrique Films.

`ni-vues-ni-connues.html` reste l'URL du projet, mais sa hiérarchie visible, JSON-LD et IA devient `Films > Ni vues ni connues`.

La création d'un système de partials HTML n'est pas incluse dans ce PRD. La duplication de navigation est reconnue comme un risque, mais la refactorisation en partials reste couverte par `PRD-BUILD-PARTIALS.md` et ne doit pas être mélangée à ce changement produit.

---

## Plan d'implémentation

1. Arbitrer les libellés finaux du menu : `Espace augmenté` ou `Espaces augmentés`, `Réservation` ou `Réservations`.
2. Arbitrer la grille de `experiences-series.html` après retrait de `Ni vues ni connues` : suppression simple, remplacement par un projet XR ou réorganisation.
3. Confirmer que `Ni vues ni connues` est le seul contenu déplacé vers `Films` dans cette itération.
4. Créer `src/films.html` avec canonical, métadonnées, H1, fil d'Ariane, JSON-LD et carte vers `ni-vues-ni-connues.html`.
5. Mettre à jour la navigation dupliquée dans toutes les pages HTML existantes, puis dans `films.html`.
6. Remplacer le libellé visible `Expériences Séries` par `XR` dans le menu, les breadcrumbs et les contenus publics concernés.
7. Ajouter `Films` au menu principal et au footer si le footer reprend la taxonomie de navigation.
8. Retirer `Ni vues ni connues` du menu déroulant XR.
9. Ajouter un lien `Tous les projets XR` vers `experiences-series.html` dans le menu déroulant XR.
10. Mettre `ni-vues-ni-connues.html` en `data-section="films"` et aligner son fil d'Ariane visible.
11. Mettre à jour les `BreadcrumbList` JSON-LD des pages touchées.
12. Mettre à jour `src/js/main.js` pour ajouter la section `films`.
13. Mettre à jour `src/plan-du-site.html`.
14. Mettre à jour `src/sitemap.xml` avec `films.html`.
15. Mettre à jour `src/llms.txt`, `src/for-ai.json`, `src/for-ai.txt`, `src/for-ai/index.html` et `src/schema-webpage.jsonld`.
16. Si `src/css/style.css` change, mettre à jour le cache-buster `style.css?v=...` dans les pages HTML concernées.
17. Exécuter `npm run build:prod`.
18. Exécuter `npm run appmiweb:preflight`.
19. Vérifier au navigateur le menu et le rendu sur `index.html`, `experiences-series.html`, `films.html`, `ni-vues-ni-connues.html`.
20. Vérifier la navigation clavier : Tab, Entrée, Espace, Escape et flèches dans le menu XR.

---

## Métriques de succès

- `src/films.html` existe.
- Après build, `dist/films.html` existe.
- Le menu principal affiche 5 entrées cohérentes sur 100 % des pages HTML publiées.
- Le menu déroulant XR contient un lien `Tous les projets XR`.
- Le menu déroulant XR ne contient plus `Ni vues ni connues`.
- `src/js/main.js` contient une entrée `films: 'films.html'` ou équivalent.
- `ni-vues-ni-connues.html` a `body data-section="films"`.
- Le fil d'Ariane visible de `ni-vues-ni-connues.html` contient `Accueil > Films > Ni vues ni connues`.
- Le `BreadcrumbList` JSON-LD de `ni-vues-ni-connues.html` correspond au fil d'Ariane visible.
- `src/sitemap.xml` référence `https://swing.appmiweb.com/films.html`.
- `src/plan-du-site.html` place `Ni vues ni connues` sous `Films`.
- `src/llms.txt`, `src/for-ai.json`, `src/for-ai.txt`, `src/for-ai/index.html` et `src/schema-webpage.jsonld` ne décrivent plus `Ni vues ni connues` comme projet XR.
- `rg -n "Expériences Séries" src` ne retourne aucune occurrence publique active, sauf mention historique explicitement documentée si nécessaire.
- `npm run build:prod` termine avec un code `0`.
- `npm run appmiweb:preflight` termine sans erreur bloquante.
- Aucune page vérifiée à 375, 600, 768, 1024 et 1440 px ne présente de débordement horizontal lié au menu.
- La navigation clavier du menu XR fonctionne : ouverture, fermeture, déplacement entre items, retour focus après Escape.

---

## Points à arbitrer avant implémentation

1. Confirmer les libellés exacts : `Espace augmenté` / `Espaces augmentés`, `Réservation` / `Réservations`.
2. Choisir le traitement de la carte `Ni vues ni connues` retirée de la grille XR.
3. Confirmer que `Ni vues ni connues` est le seul projet déplacé vers `Films` dans cette itération.

---

## Changelog

| Date | Auteur | Changement |
|------|--------|------------|
| 2026-06-21 | Alex + Codex | Création du PRD |
