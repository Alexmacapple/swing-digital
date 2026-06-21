# PRD-015 : Page autonome Memory Box VR

**Statut** : Brouillon
**Date** : 2026-06-21
**Auteur** : Alex
**Source** : `retour/changements_site (1).docx`, texto de Stéphanie transmis par Alex, `retour/site_images/2_memory_box.jpg`, `retour/site_images/3_memory_box.jpg`, audit de maillage interne

---

## Vision

Le quoi : créer une page autonome pour Memory Box VR et rediriger les liens éditoriaux Memory Box vers cette page, au lieu de les faire aboutir à `xr-corporate.html`.

Le pourquoi : Memory Box est présenté dans le site comme une brique de L’Expérience Monroe, tandis que `xr-corporate.html` présente une offre corporate générique. La cible fonctionne techniquement, mais le sens éditorial est confus. Le mécanisme attendu est de séparer le projet Memory Box de l’offre XR Corporate pour rendre les liens, les breadcrumbs et les contenus plus compréhensibles.

Le comment : renvoyé au Plan d’implémentation.

## Exemple bout-en-bout projeté

Un visiteur arrive sur `index.html#page-3` et clique sur `Voir le projet Memory Box VR`.

Il n’arrive plus sur une page intitulée `XR Corporate`. Il arrive sur `memory-box-vr.html`, avec un fil d’Ariane `Accueil > XR > Memory Box VR`.

La page présente Memory Box VR avec les nouveaux exports `2_memory_box.jpg` et `3_memory_box.jpg`, un texte HTML accessible, des métadonnées propres et des liens de retour vers L’Expérience Monroe et la rubrique XR.

Dans le menu Monroe, l’entrée `4. XR Memory Box` pointe aussi vers `memory-box-vr.html`. La page `xr-corporate.html` reste disponible pour l’offre corporate, sans être supprimée.

---

## Contexte

État observé le 2026-06-21 :

- Les liens `Memory Box VR` / `XR Memory Box` pointent vers `xr-corporate.html`.
- L’audit de maillage interne confirme que ces liens ne sont pas cassés, mais qu’ils sont éditorialement ambigus.
- `src/xr-corporate.html` présente `XR pour les entreprises`, pas une page projet Memory Box.
- Stéphanie a signalé dans le DOCX que le lien Memory Box n’est pas bon.
- Stéphanie indique ensuite par texto que, si c’est plus simple de faire un élément autonome pour Memory Box, il faut faire ce qui est le plus simple.
- Les assets `2_memory_box.jpg` et `3_memory_box.jpg` sont disponibles dans `retour/site_images/`.

---

## Problème

Le problème n’est pas un lien cassé, mais un mauvais contrat de navigation : l’utilisateur clique sur Memory Box et reçoit une page corporate. Corriger seulement le libellé du lien ne suffit pas, car Memory Box resterait rattaché à une page qui ne lui est pas dédiée.

Conserver cette ambiguïté complique aussi les fichiers SEO/GEO : une IA ou un crawler peut comprendre que Memory Box et XR Corporate sont le même projet.

---

## Solution

Créer une page `memory-box-vr.html` dédiée à Memory Box VR, puis mettre à jour les liens et fichiers publics qui mentionnent Memory Box.

Inclure :

- nouvelle page source `src/memory-box-vr.html` ;
- fil d’Ariane `Accueil > XR > Memory Box VR` ;
- canonical, title, description et JSON-LD propres ;
- intégration des assets `2_memory_box.jpg` et `3_memory_box.jpg` ;
- mise à jour des liens depuis `index.html`, `experience-monroe.html`, le menu Monroe global, le plan du site, le sitemap et les fichiers IA ;
- conservation de `xr-corporate.html` pour l’offre entreprise.

---

## Options évaluées

### Option A (retenue) : créer `memory-box-vr.html`

**Avantages** :
- supprime l’ambiguïté entre Memory Box et XR Corporate ;
- respecte le texto de Stéphanie en choisissant l’option la plus propre ;
- donne une destination claire aux liens existants ;
- permet d’utiliser les deux exports fournis ;
- améliore la cohérence SEO/GEO et les breadcrumbs.

**Inconvénients** :
- ajoute une page HTML à maintenir ;
- demande de mettre à jour la navigation dupliquée ;
- impose une vérification complète des liens et fichiers IA.

### Option B : conserver `xr-corporate.html` et renommer la page

**Avantages** :
- évite de créer une nouvelle page ;
- corrige partiellement l’écart visible.

**Inconvénients** :
- mélange Memory Box et offre entreprise ;
- risque de casser les contenus corporate déjà publiés ;
- ne clarifie pas les liens Monroe.

### Option C : changer seulement le lien Memory Box vers une autre page existante

**Avantages** :
- correction rapide ;
- pas de nouvelle route.

**Inconvénients** :
- aucune page existante ne semble dédiée à Memory Box ;
- l’ambiguïté se déplace au lieu d’être résolue ;
- mauvais socle pour le maillage et les données structurées.

---

## Décision

Retenir l’Option A.

Le slug recommandé est `memory-box-vr.html`, car il correspond au libellé déjà visible `Voir le projet Memory Box VR` et reste plus compréhensible que `xr-memory-box.html` pour un public non technique.

`xr-corporate.html` reste en ligne, mais ne doit plus recevoir les liens explicitement nommés Memory Box.

---

## Plan d’implémentation

1. Copier `2_memory_box.jpg` et `3_memory_box.jpg` dans `src/img/` avec des noms stables.
2. Créer `src/memory-box-vr.html` sur le modèle des pages projet existantes.
3. Rédiger ou reprendre un texte court de présentation Memory Box en HTML, sans inventer de claims non fournis.
4. Ajouter canonical, métadonnées Open Graph / Twitter et JSON-LD.
5. Ajouter le fil d’Ariane `Accueil > XR > Memory Box VR`.
6. Remplacer les liens Memory Box de `index.html`, `experience-monroe.html` et de la navigation globale du sous-menu Monroe.
7. Conserver les liens `XR Corporate` vers `xr-corporate.html`.
8. Mettre à jour `plan-du-site.html`.
9. Ajouter `memory-box-vr.html` à `sitemap.xml`.
10. Mettre à jour `llms.txt`, `for-ai.json`, `for-ai.txt`, `for-ai/index.html` et `schema-webpage.jsonld`.
11. Mettre à jour les tests PRD-011 si leur taxonomie liste explicitement les items du sous-menu Monroe.
12. Régénérer `dist/` avec `npm run build:prod`.
13. Lancer un audit de liens internes.
14. Exécuter `npm test` et `npm run seo:check`.

---

## Métriques de succès

- `src/memory-box-vr.html` existe.
- Après build, `dist/memory-box-vr.html` existe.
- Tous les liens dont le libellé contient `Memory Box` pointent vers `memory-box-vr.html`, sauf exception documentée.
- Tous les liens dont le libellé contient `XR Corporate` pointent vers `xr-corporate.html`.
- `src/sitemap.xml` contient `https://swing.appmiweb.com/memory-box-vr.html`.
- `src/plan-du-site.html` liste Memory Box VR sous XR.
- Les fichiers `llms.txt`, `for-ai.*` et `schema-webpage.jsonld` distinguent Memory Box VR de XR Corporate.
- Aucun lien interne ajouté ne pointe vers un fichier absent.
- Aucun débordement horizontal n’est observé à 375, 600, 768, 1024 et 1440 px sur la nouvelle page.
- `npm run build:prod`, `npm test` et `npm run seo:check` terminent avec un code `0`.

---

## Questions pour Stéphanie

1. Le nom public doit-il être `Memory Box VR`, `XR Memory Box`, ou un autre libellé exact ?
2. Faut-il rattacher Memory Box uniquement à L’Expérience Monroe, ou aussi le présenter comme projet XR autonome dans la grille générale ?
3. As-tu un texte de présentation plus complet à utiliser, ou conserve-t-on une page courte à partir des éléments déjà présents ?

---

## Changelog

| Date | Auteur | Changement |
|------|--------|------------|
| 2026-06-21 | Alex + Codex | Création du PRD |
