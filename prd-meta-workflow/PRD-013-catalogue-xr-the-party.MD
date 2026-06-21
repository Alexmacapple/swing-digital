# PRD-013 : Catalogue XR et ajout de The Party

**Statut** : Brouillon
**Date** : 2026-06-21
**Auteur** : Alex
**Source** : `retour/changements_site (1).docx`, `retour/site_images/the_party*.jpg`, inspection de `src/index.html` et `src/experiences-series.html`

---

## Vision

Le quoi : intégrer The Party dans le catalogue XR et mettre à jour la liste des projets en développement sur l’accueil.

Le pourquoi : Stéphanie signale un nouveau projet en développement, avec des assets dédiés et des mentions de production précises. Le mécanisme attendu est de rendre le catalogue vivant et exact sans casser le découpage déjà validé entre XR et Films.

Le comment : renvoyé au Plan d’implémentation.

## Exemple bout-en-bout projeté

Un visiteur consulte l’accueil puis arrive à `index.html#page-4`.

La phrase `Nos projets en cours et réalisés` n’est plus affichée. La section `En développement` liste The Party en premier, avec son type `Réalité mixte/Théâtre`, la mention `En développement avec le studio Pixihead`, puis les mentions `Lauréat de Villa Formose Immersive` et `Taiwan XR Residency - Larger Scale`.

Les lignes Marilyn et Toulouse-Lautrec mentionnent aussi le développement avec Pixihead. Charlotte Henschel reste décrite comme récit XR / théâtre autour de l’artiste peintre. Ni vues ni connues reste mentionné comme série documentaire dans cette liste d’accueil, mais ne réintègre pas la rubrique XR, car PRD-011 a déjà déplacé ce projet sous Films.

Depuis l’onglet XR, le visiteur voit The Party apparaître parmi les projets XR. Si une page dédiée est créée, la carte mène vers `the-party.html`, qui utilise les exports fournis par Stéphanie et reste cohérente avec les pages projet existantes.

---

## Contexte

État observé le 2026-06-21 :

- `src/index.html#page-4` contient encore la phrase `Nos projets en cours et réalisés`.
- La liste `En développement` ne contient pas The Party.
- Les lignes Marilyn et Toulouse-Lautrec ne mentionnent pas Pixihead.
- `src/experiences-series.html` ne contient pas The Party dans la grille XR.
- Les assets suivants sont disponibles : `the_party.jpg`, `the_party2.jpg`, `the_party3.jpg`, `the_party4.jpg`, `the_party4_photo_sans_légende.jpg`.
- PRD-011 a déjà déplacé `Ni vues ni connues` vers Films. Ce point ne doit pas être annulé.

---

## Problème

Ajouter The Party seulement dans le texte de l’accueil créerait une impasse de navigation : le projet serait visible mais sans page ou destination claire. À l’inverse, créer une page complète sans confirmer le niveau de publication peut exposer un projet en développement plus largement que souhaité.

Il faut aussi éviter une régression de taxonomie : `Ni vues ni connues` peut rester dans une liste globale d’accueil, mais ne doit pas revenir dans les menus ou grilles XR.

---

## Solution

Préparer The Party comme projet XR en développement, avec une intégration progressive :

- mise à jour de la liste d’accueil `En développement` ;
- ajout de The Party dans la rubrique XR ;
- création recommandée d’une page dédiée `the-party.html` si Stéphanie confirme la publication ;
- intégration des assets fournis avec textes alternatifs ;
- mise à jour du plan du site, sitemap et fichiers IA si une page dédiée est créée ;
- vérification que `Ni vues ni connues` reste sous Films dans la navigation et les fichiers IA.

---

## Options évaluées

### Option A (retenue sous réserve de validation Stéphanie) : page dédiée The Party et présence dans XR

**Avantages** :
- donne une destination claire à la carte XR ;
- exploite correctement les quatre exports fournis ;
- facilite le SEO/GEO du nouveau projet ;
- évite un lien mort ou une carte non cliquable ;
- suit le modèle des autres pages projet.

**Inconvénients** :
- augmente la surface publiée pour un projet en développement ;
- demande de choisir un slug, des métadonnées et une hiérarchie de page ;
- nécessite plus de vérifications responsive et SEO.

### Option B : ajout dans les listes uniquement, sans page dédiée

**Avantages** :
- plus rapide ;
- limite l’exposition publique du projet ;
- évite de créer une page avec du contenu incomplet.

**Inconvénients** :
- frustrant pour l’utilisateur qui clique ou cherche plus d’information ;
- incohérent avec les autres projets listés ;
- reportera le problème au prochain ajout de contenu.

### Option C : attendre une validation complète avant tout ajout

**Avantages** :
- aucun risque de publication prématurée ;
- permet d’obtenir le texte définitif avant intégration.

**Inconvénients** :
- laisse l’accueil et le catalogue en décalage avec le retour de Stéphanie ;
- retarde une correction demandée explicitement ;
- ne permet pas de tester l’impact de mise en page.

---

## Décision

Retenir l’Option A comme trajectoire recommandée, mais rendre la création de page dédiée dépendante d’une réponse de Stéphanie.

Les corrections non risquées de l’accueil peuvent être préparées indépendamment : retrait de la phrase, ajout de la liste corrigée, mentions Pixihead. La présence de The Party dans la rubrique XR et la création de `the-party.html` doivent être confirmées avant publication si le projet n’est pas encore validé publiquement.

---

## Plan d’implémentation

1. Confirmer avec Stéphanie si The Party peut être publié en page dédiée.
2. Copier les assets The Party retenus sous `src/img/` avec des noms stables.
3. Supprimer la phrase `Nos projets en cours et réalisés` de `index.html#page-4`.
4. Ajouter The Party en premier dans la liste `En développement`.
5. Ajouter les mentions Pixihead demandées pour The Party, Marilyn et Toulouse-Lautrec.
6. Conserver `Ni vues ni connues` comme série documentaire dans la liste d’accueil, sans le replacer dans XR.
7. Si page dédiée validée, créer `src/the-party.html` avec H1, fil d’Ariane, JSON-LD, métadonnées, assets et footer.
8. Ajouter une carte The Party dans `experiences-series.html`.
9. Décider si The Party doit apparaître dans le menu déroulant XR global ou seulement dans la page rubrique XR.
10. Mettre à jour `plan-du-site.html`, `sitemap.xml`, `llms.txt`, `for-ai.*` et `schema-webpage.jsonld` si une page dédiée est créée.
11. Mettre à jour le cache-buster CSS si des styles nouveaux sont nécessaires.
12. Régénérer `dist/` avec `npm run build:prod`.
13. Vérifier la navigation, les cartes et les liens sur mobile, tablette et desktop.
14. Exécuter `npm test` et `npm run seo:check`.

---

## Métriques de succès

- `src/index.html` ne contient plus `Nos projets en cours et réalisés`.
- `src/index.html` contient `The Party - Réalité mixte/Théâtre`.
- `src/index.html` contient au moins trois mentions `En développement avec le studio Pixihead` pour The Party, Marilyn et Toulouse-Lautrec.
- `Ni vues ni connues` reste absent du menu XR global.
- Si page dédiée validée, `src/the-party.html` et `dist/the-party.html` existent.
- Si page dédiée validée, `sitemap.xml`, `plan-du-site.html`, `llms.txt`, `for-ai.*` et `schema-webpage.jsonld` référencent The Party de manière cohérente.
- Aucun lien interne ajouté ne pointe vers un fichier absent.
- Aucun débordement horizontal n’est observé à 375, 600, 768, 1024 et 1440 px.
- `npm run build:prod`, `npm test` et `npm run seo:check` terminent avec un code `0`.

---

## Questions pour Stéphanie

1. The Party peut-il être publié dès maintenant en page dédiée ?
2. Le slug préféré est-il `the-party.html` ?
3. The Party doit-il apparaître dans le menu déroulant XR global, ou seulement dans la page `XR` ?
4. Les libellés à afficher sont-ils bien `Réalité mixte/Théâtre`, `Lauréat de Villa Formose Immersive` et `Taiwan XR Residency - Larger Scale` ?
5. Pour les crédits, faut-il afficher `Pixihead`, `PIXIHEAD`, ou le logo uniquement selon les exports ?

---

## Changelog

| Date | Auteur | Changement |
|------|--------|------------|
| 2026-06-21 | Alex + Codex | Création du PRD |
