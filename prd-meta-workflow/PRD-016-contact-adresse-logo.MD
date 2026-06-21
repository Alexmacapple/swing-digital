# PRD-016 : Contact, adresse et animation logo

**Statut** : Implémenté et vérifié localement
**Date** : 2026-06-21
**Auteur** : Alex
**Source** : `retour/changements_site (1).docx`, `retour/accueil-1.mp4`, inspection de `src/index.html` et `src/mentions-legales.html`, réponse de Stéphanie du 2026-06-21

---

## Vision

Le quoi : mettre à jour le bloc contact visible avec le nom raccourci, la nouvelle adresse et préparer le remplacement de l’animation logo quand l’asset rose sera disponible.

Le pourquoi : le bloc contact de fin de page est une information pratique critique. L’adresse affichée est ancienne, et la mention `Production` ne correspond plus à la préférence de marque exprimée par Stéphanie. Le mécanisme attendu est de fiabiliser les informations visibles sans confondre branding public et éventuelle dénomination légale.

Le comment : renvoyé au Plan d’implémentation.

## Exemple bout-en-bout réel

Un visiteur descend en bas de `index.html`, section contact.

Le bloc affiche `Swing Digital`, pas `Swing Digital Production`.

L’adresse visible devient :

```text
59, rue du Département
75018 Paris
```

La vidéo de fond du bloc contact est remplacée par `accueil-1.mp4`, en chemin relatif, sans filtre couleur afin de rester au plus proche du fichier fourni.

Les mentions légales affichent `Swing Digital Production`, car Stéphanie confirme que c’est le titre légal. L’adresse légale est mise à jour avec le nouveau siège social.

---

## Contexte

État observé le 2026-06-21 :

- `src/index.html#page-62` affiche `S w i n g Digital Production`.
- `src/index.html#page-62` affiche `C/O Liberty`, `35-37 rue d'Artois`, `75008 Paris`.
- `src/mentions-legales.html` affiche `Swing Digital Production` et la même ancienne adresse.
- Le DOCX demande : `Swing digital (tu peux enlever production)` et fournit `59, rue du Département`, `75018 PARIS`.
- Le DOCX indique aussi que Stéphanie doit régénérer une animation logo sur du rose qui s’anime.
- Aucun nouvel asset vidéo ou animation logo n’est présent dans `retour/site_images/`.
- Réponse de Stéphanie : la nouvelle adresse est le nouveau siège social.
- Réponse de Stéphanie : le vrai titre légal reste `Swing Digital Production`; `Production` est seulement retiré de la marque visible pour alléger l’affichage.
- Réponse de Stéphanie : l’animation logo rose est en cours de fabrication et arrivera plus tard.
- Asset fourni ensuite : `retour/accueil-1.mp4`, intégré comme vidéo de fond relative `accueil-1.mp4` sur `src/index.html#page-62`.

---

## Problème

Deux corrections sont mélangées :

- une correction immédiate de texte et d’adresse ;
- une correction visuelle dépendante d’un asset non encore fourni.

Il faut éviter de bloquer l’adresse sur l’animation. Il faut aussi éviter de modifier la dénomination légale dans les mentions légales si `Swing Digital Production` reste l’entité juridique.

---

## Solution

Découper l’implémentation en deux phases :

- Phase 1 : mettre à jour le bloc contact visible avec `Swing Digital` et la nouvelle adresse.
- Phase 2 : remplacer l’animation/logo de fond lorsque Stéphanie fournit le nouvel asset.

Pour les mentions légales :

- mettre à jour l’adresse si elle est confirmée comme adresse officielle de l’éditeur ;
- conserver `Swing Digital Production` comme dénomination légale tant qu’aucune confirmation contraire n’est donnée ;
- ne pas inventer les informations d’hébergeur, qui restent un chantier de production finale distinct.

État livré le 2026-06-21 :

- `src/index.html#page-62` affiche `Swing Digital` ;
- l’adresse visible de l’accueil est `59, rue du Département` / `75018 Paris` ;
- l’email reste `production@swingdigitalproduction.com` ;
- `src/mentions-legales.html` conserve `Swing Digital Production` et affiche le nouveau siège social `59, rue du Département`, `75018 Paris, France` ;
- la vidéo de fond du bloc contact référence `accueil-1.mp4` en chemin relatif ;
- l’asset `src/accueil-1.mp4` est présent dans l’arborescence publique ;
- la vidéo de `page-62` est affichée sans filtre rose ni rotation de teinte ;
- la vidéo de `page-62` est configurée en autoplay, muette, en boucle et synchronisée avec le bouton lecture/pause ;
- les pages HTML chargent `js/main.js?v=20260621-autoplay` pour éviter que Cloudflare serve l’ancien script qui mettait la vidéo contact en pause ;
- le test Playwright `tests/prd016-contact-adresse-logo.spec.js` couvre le bloc source et le rendu responsive.

---

## Options évaluées

### Option A (retenue) : livraison en deux phases

**Avantages** :
- corrige rapidement l’information pratique visible ;
- ne bloque pas sur un asset manquant ;
- limite le risque juridique sur la dénomination légale ;
- permet de remplacer proprement l’animation plus tard.

**Inconvénients** :
- laisse temporairement l’animation actuelle en place ;
- nécessite de documenter l’attente d’asset ;
- demande une décision séparée pour les mentions légales.

### Option B : attendre l’animation logo avant toute correction

**Avantages** :
- livraison visuelle complète en une seule fois ;
- moins de passes sur la section contact.

**Inconvénients** :
- laisse l’ancienne adresse publiée ;
- bloque une correction simple et importante ;
- dépend d’un fichier non disponible.

### Option C : remplacer l’animation par un fond rose statique immédiatement

**Avantages** :
- répond partiellement au problème visuel ;
- pas besoin d’attendre la vidéo.

**Inconvénients** :
- peut ne pas respecter l’intention de Stéphanie ;
- supprime une animation existante sans asset de remplacement validé ;
- risque de créer une section contact trop plate.

---

## Décision

Retenir l’Option A.

La correction du texte et de l’adresse est indépendante et prioritaire. L’animation logo sur fond rose reste une dépendance externe à intégrer lorsqu’elle est fournie.

Dans les mentions légales, conserver `Swing Digital Production` comme dénomination légale confirmée. La marque visible peut rester `Swing Digital`, tandis que l’éditeur légal reste `Swing Digital Production`.

---

## Plan d’implémentation

1. Mettre à jour le bloc contact visible de `src/index.html#page-62`.
2. Remplacer `S w i n g Digital Production` par une marque visible cohérente `Swing Digital`.
3. Remplacer l’ancienne adresse par `59, rue du Département` et `75018 Paris`.
4. Vérifier si la capitalisation `Paris` doit rester en style français standard ou en capitales comme dans le DOCX.
5. Mettre à jour l’adresse dans `src/mentions-legales.html`, Stéphanie ayant confirmé qu’il s’agit du nouveau siège social.
6. Conserver `Swing Digital Production` dans les mentions légales, Stéphanie ayant confirmé que c’est le vrai titre légal.
7. Documenter l’asset manquant pour l’animation logo rose.
8. Lorsque l’asset est fourni, l’intégrer dans `src/video/` ou `src/img/` selon son format.
9. Mettre à jour les attributs accessibles de contrôle vidéo si la section conserve une vidéo.
10. Ajuster le CSS uniquement si le nouvel asset modifie le contraste ou la lisibilité.
11. Mettre à jour le cache-buster CSS si le CSS change.
12. Régénérer `dist/` avec `npm run build:prod`.
13. Vérifier `index.html#page-62` sur mobile, tablette et desktop.
14. Exécuter `npm test` et `npm run seo:check`.

---

## Métriques de succès

- `src/index.html` ne contient plus `35-37 rue d'Artois`.
- `src/index.html` contient `59, rue du Département`.
- Le bloc contact visible affiche `Swing Digital` sans `Production`.
- `src/mentions-legales.html` contient la nouvelle adresse.
- `src/mentions-legales.html` conserve une dénomination légale explicite et non ambiguë.
- Aucune information d’hébergeur n’est inventée.
- Le nouvel asset d’animation fourni est présent dans `src/` et référencé par le bloc contact en chemin relatif.
- Le rendu de la vidéo de contact reste au plus proche du fichier fourni, sans filtre rose.
- La vidéo de contact démarre automatiquement quand la page est rendue, avec fallback manuel via le bouton.
- Toutes les pages HTML référencent `js/main.js?v=20260621-autoplay` et ne référencent plus `js/main.js` sans version.
- Aucun débordement horizontal n’est observé à 375, 600, 768, 1024 et 1440 px sur la section contact.
- `npm run build:prod`, `npm test` et `npm run seo:check` terminent avec un code `0`.

---

## Réponses de Stéphanie

1. La nouvelle adresse `59, rue du Département, 75018 Paris` est le nouveau siège social.
2. Le vrai titre légal reste `Swing Digital Production`; la suppression de `Production` concerne seulement la marque affichée.
3. L’animation logo rose est en cours de fabrication et sera fournie plus tard.

---

## Changelog

| Date | Auteur | Changement |
|------|--------|------------|
| 2026-06-21 | Alex + Codex | Ajout d’un cache-buster sur `js/main.js` pour forcer le script qui démarre la vidéo contact en autoplay |
| 2026-06-21 | Alex + Codex | Suppression du filtre couleur sur la vidéo contact pour conserver le rendu du fichier fourni, avec cache-buster CSS |
| 2026-06-21 | Alex + Codex | Activation de l’autoplay sur la vidéo contact et synchronisation du bouton lecture/pause |
| 2026-06-21 | Alex + Codex | Remplacement de la vidéo de fond du contact par `accueil-1.mp4` en chemin relatif, sans modifier le reste de la section |
| 2026-06-21 | Alex + Codex | Intégration de la réponse de Stéphanie : adresse du siège social mise à jour dans les mentions légales, dénomination légale `Swing Digital Production` conservée, animation logo rose maintenue en attente d’asset |
| 2026-06-21 | Alex + Codex | Implémentation phase 1 : marque visible et adresse de contact sur l’accueil, maintien prudent des mentions légales et test Playwright dédié |
| 2026-06-21 | Alex + Codex | Création du PRD |
