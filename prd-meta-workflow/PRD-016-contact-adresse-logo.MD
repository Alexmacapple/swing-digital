# PRD-016 : Contact, adresse et animation logo

**Statut** : Brouillon
**Date** : 2026-06-21
**Auteur** : Alex
**Source** : `retour/changements_site (1).docx`, inspection de `src/index.html` et `src/mentions-legales.html`

---

## Vision

Le quoi : mettre à jour le bloc contact visible avec le nom raccourci, la nouvelle adresse et préparer le remplacement de l’animation logo quand l’asset rose sera disponible.

Le pourquoi : le bloc contact de fin de page est une information pratique critique. L’adresse affichée est ancienne, et la mention `Production` ne correspond plus à la préférence de marque exprimée par Stéphanie. Le mécanisme attendu est de fiabiliser les informations visibles sans confondre branding public et éventuelle dénomination légale.

Le comment : renvoyé au Plan d’implémentation.

## Exemple bout-en-bout projeté

Un visiteur descend en bas de `index.html`, section contact.

Le bloc affiche `Swing Digital`, pas `Swing Digital Production`.

L’adresse visible devient :

```text
59, rue du Département
75018 Paris
```

La vidéo ou animation de fond actuelle n’est remplacée que lorsqu’un nouvel asset logo animé sur fond rose est disponible. En attendant, la correction texte/adresse peut être livrée sans bloquer sur l’animation.

Les mentions légales sont traitées avec prudence : l’adresse peut être mise à jour si c’est bien l’adresse officielle de l’éditeur, mais la dénomination légale `Swing Digital Production` ne doit pas être supprimée sans confirmation.

---

## Contexte

État observé le 2026-06-21 :

- `src/index.html#page-62` affiche `S w i n g Digital Production`.
- `src/index.html#page-62` affiche `C/O Liberty`, `35-37 rue d'Artois`, `75008 Paris`.
- `src/mentions-legales.html` affiche `Swing Digital Production` et la même ancienne adresse.
- Le DOCX demande : `Swing digital (tu peux enlever production)` et fournit `59, rue du Département`, `75018 PARIS`.
- Le DOCX indique aussi que Stéphanie doit régénérer une animation logo sur du rose qui s’anime.
- Aucun nouvel asset vidéo ou animation logo n’est présent dans `retour/site_images/`.

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

Dans les mentions légales, ne pas supprimer `Production` sans confirmation de l’entité légale. La marque visible peut être `Swing Digital`, tandis que l’éditeur légal peut rester `Swing Digital Production`.

---

## Plan d’implémentation

1. Mettre à jour le bloc contact visible de `src/index.html#page-62`.
2. Remplacer `S w i n g Digital Production` par une marque visible cohérente `Swing Digital`.
3. Remplacer l’ancienne adresse par `59, rue du Département` et `75018 Paris`.
4. Vérifier si la capitalisation `Paris` doit rester en style français standard ou en capitales comme dans le DOCX.
5. Si Stéphanie confirme que la nouvelle adresse est officielle, mettre à jour l’adresse dans `src/mentions-legales.html`.
6. Conserver `Swing Digital Production` dans les mentions légales tant que la dénomination légale n’est pas confirmée comme changée.
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
- Si validé, `src/mentions-legales.html` contient la nouvelle adresse.
- `src/mentions-legales.html` conserve une dénomination légale explicite et non ambiguë.
- Aucune information d’hébergeur n’est inventée.
- Si un nouvel asset d’animation est fourni, il est présent dans `src/` et référencé par le bloc contact.
- Aucun débordement horizontal n’est observé à 375, 600, 768, 1024 et 1440 px sur la section contact.
- `npm run build:prod`, `npm test` et `npm run seo:check` terminent avec un code `0`.

---

## Questions pour Stéphanie

1. La suppression de `Production` concerne-t-elle seulement la marque visible, ou aussi l’entité légale ?
2. La nouvelle adresse `59, rue du Département, 75018 Paris` est-elle l’adresse officielle à mettre aussi dans les mentions légales ?
3. Peux-tu fournir le nouvel asset d’animation logo rose quand il est prêt, idéalement en `.mp4` court et optimisé web ?

---

## Changelog

| Date | Auteur | Changement |
|------|--------|------------|
| 2026-06-21 | Alex + Codex | Création du PRD |
