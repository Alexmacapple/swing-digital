# PRD-012 : Accueil éditorial et visuels de présentation

**Statut** : Implémenté et vérifié localement
**Date** : 2026-06-21
**Auteur** : Alex
**Source** : `retour/changements_site (1).docx`, `retour/site_images/1_swing.jpg`, inspection de `src/index.html`

---

## Vision

Le quoi : mettre à jour les textes principaux de l’accueil et remplacer le visuel dégradé de la présentation Swing Digital par le nouvel export fourni.

Le pourquoi : l’accueil porte encore un positionnement ancien, plus long et plus institutionnel. Le retour de Stéphanie recentre le message sur les formats audiovisuels, les expériences immersives, la XR, la réalité mixte et le storytelling. Le mécanisme attendu est une première impression plus directe, plus lisible et plus alignée avec la nouvelle arborescence XR / Films.

Le comment : renvoyé au Plan d’implémentation.

## Exemple bout-en-bout projeté

Un visiteur arrive sur `index.html#page-1`.

Le H1 ne dit plus `Créateurs d'Expériences Transmédia Immersives`, mais le nouveau positionnement centré sur les expériences immersives.

Les hashtags visibles deviennent `# formats courts # spectacle vivant # XR # réalité mixte # storytelling`, avec une typographie cohérente avec le reste du site.

Le texte d’introduction ne présente plus une phrase longue autour des espaces augmentés, de la création sonore et de la narration transmédia. Il présente deux phrases courtes : Swing Digital conçoit des formats audiovisuels et des expériences immersives ; puis précise le croisement spectacle vivant, XR et création sonore.

La ligne de soutiens CNC / DRAC / Ville de Paris / ONDA disparaît du hero. Les partenaires restent accessibles dans la section dédiée `Ils nous ont fait confiance`, car le retour vise la ligne de soutiens du premier écran, pas nécessairement la page partenaires.

Le visiteur descend à `index.html#page-3`. L’introduction devient une seule phrase : `Nous imaginons des récits immersifs au croisement du spectacle vivant et des technologies XR.` Le visuel de droite utilise `1_swing.jpg` ou une version intégrée dérivée de cet export, avec un texte alternatif adapté.

---

## Contexte

État observé avant implémentation le 2026-06-21 :

- `src/index.html` contient encore l’ancien H1, les anciens hashtags, l’ancien résumé et la ligne de soutiens.
- `src/index.html#page-3` contient encore deux paragraphes d’introduction.
- Le visuel actuel de `#page-3` est `src/img/pages/page-3/page-3-collage.png`.
- Stéphanie a fourni `retour/site_images/1_swing.jpg`, un nouvel export de 395 x 594 px.
- Les pages HTML référencent `css/style.css?v=20260621-1700`; un changement CSS visible doit mettre à jour le cache-buster sur les pages concernées.

Retours déjà couverts ailleurs :

- La police Satoshi est déjà traitée par PRD-007.
- Le fond rose est déjà traité par PRD-008.
- Le menu XR / Films est déjà traité par PRD-011.

---

## Problème

Le site affiche encore des textes d’accueil qui ne correspondent pas aux demandes éditoriales les plus récentes. Corriger seulement le texte visible sans vérifier les métadonnées, les textes alternatifs, le maillage et les tests peut créer une incohérence entre l’expérience humaine, le SEO/GEO et les fichiers publics.

Le remplacement du visuel `#page-3` peut aussi dégrader la mise en page, car l’asset fourni n’a pas exactement les mêmes dimensions que le visuel actuel.

---

## Solution

Appliquer les corrections éditoriales dans la structure HTML existante, sans refonte de la page d’accueil.

Inclure :

- remplacement du H1 ;
- remplacement des hashtags ;
- remplacement du résumé hero par deux phrases ;
- suppression de la ligne de soutiens dans le hero ;
- remplacement du texte d’introduction de `#page-3` ;
- intégration de `1_swing.jpg` dans `src/img/` avec un nom stable ;
- texte alternatif explicite pour le nouveau visuel ;
- ajustement CSS uniquement si l’asset nécessite un recadrage ou des contraintes de ratio ;
- alignement minimal des métadonnées d’accueil si le nouveau positionnement visible rend les anciennes descriptions trop éloignées.

---

## Options évaluées

### Option A (retenue) : correction éditoriale dans la structure existante

**Avantages** :
- diff limité et lisible ;
- conserve les ancres `#page-1` et `#page-3` ;
- réduit le risque de régression responsive ;
- garde la sémantique HTML et les tests existants ;
- permet d’intégrer l’asset fourni sans transformer la page en image plate.

**Inconvénients** :
- nécessite une vérification visuelle précise du nouveau visuel ;
- peut demander un petit ajustement CSS ;
- ne refond pas entièrement la direction artistique de l’accueil.

### Option B : remplacer les zones par des exports image complets

**Avantages** :
- rendu très proche des exports de Stéphanie ;
- moins d’arbitrage sur la composition visuelle.

**Inconvénients** :
- dégrade l’accessibilité et le SEO si le texte devient une image ;
- complique la responsivité ;
- augmente le risque de texte flou sur mobile ;
- rend les corrections futures plus coûteuses.

### Option C : corriger seulement les textes, sans remplacer le visuel

**Avantages** :
- correction rapide ;
- aucun risque lié à l’image.

**Inconvénients** :
- ignore un retour explicite sur les images dégradées ;
- laisse un écart visible avec les nouveaux exports ;
- oblige à rouvrir un second ticket pour la même section.

---

## Décision

Retenir l’Option A.

Les textes doivent rester du vrai HTML. L’asset `1_swing.jpg` doit être intégré comme image, pas comme page complète aplatie. Les partenaires ne sont pas supprimés du site ; seule la ligne de soutiens du hero est retirée.

Question de microtypographie à valider avec Stéphanie : afficher le H1 en capitales sans accents comme dans le DOCX, ou corriger en capitales accentuées pour respecter la typographie française.

---

## Plan d’implémentation

1. Copier `retour/site_images/1_swing.jpg` dans un chemin public stable sous `src/img/`.
2. Remplacer le H1 du hero par le nouveau titre validé.
3. Remplacer les hashtags du hero par la nouvelle liste.
4. Remplacer le résumé hero par les deux phrases demandées.
5. Supprimer la ligne de soutiens du hero.
6. Vérifier si le CTA `Découvrir les expériences` reste cohérent avec la nouvelle taxonomie ; sinon proposer un libellé court aligné avec XR / Films.
7. Remplacer les deux paragraphes de `#page-3` par la phrase demandée.
8. Remplacer l’image de `#page-3` par l’asset intégré.
9. Ajouter un texte alternatif descriptif et non redondant.
10. Ajuster le CSS uniquement si le ratio du nouvel asset crée un débordement, un recadrage dur ou une zone vide.
11. Mettre à jour le cache-buster CSS si le CSS change.
12. Régénérer `dist/` avec `npm run build:prod`.
13. Vérifier `index.html#page-1` et `index.html#page-3` sur mobile, tablette et desktop.
14. Exécuter `npm test` et `npm run seo:check`.

---

## Implémentation réalisée

État au 2026-06-21 :

- `retour/site_images/1_swing.jpg` est intégré sous `src/img/pages/page-3/swing-presentation.jpg`.
- Le H1 de l’accueil devient `CRÉATEURS D’EXPÉRIENCES IMMERSIVES`, en capitales accentuées.
- Les hashtags deviennent `# formats courts # spectacle vivant # XR # réalité mixte # storytelling`.
- Le résumé du hero est remplacé par les deux phrases demandées.
- La ligne de soutiens est supprimée du hero, sans supprimer la section partenaires.
- L’introduction de `#page-3` devient `Nous imaginons des récits immersifs au croisement du spectacle vivant et des technologies XR.`
- Le visuel de `#page-3` utilise le nouvel asset avec un texte alternatif descriptif.
- Les métadonnées SEO/GEO principales de l’accueil sont alignées avec le nouveau positionnement éditorial.
- Le calque de teinte du hero `#page-1` est retiré : la vidéo `video/hero.mp4` est affichée sans overlay rose/corail ni opacité artificielle.
- Les liens d’évitement utilisent le fond rose lisible `--color-background-pink-readable`, et non le rouge historique.
- La variable globale `--gradient-background-pink-readable` ne superpose plus de voile noir sur le fond rose.
- Le dégradé rose partagé ne contient plus le stop orange `#E97C54` qui brunissait `index.html#page-3` et `espaces-augmentes.html#page-5`.
- Les ajustements CSS restent ciblés : retrait du calque hero, liens d’évitement roses, fonds roses partagés et contraintes responsive existantes conservées.
- Le cache-buster CSS est aligné sur `20260621-2356` pour toutes les pages HTML afin d’éviter une ancienne version en cache.
- Un test Playwright dédié couvre le contenu éditorial, l’absence de l’ancienne ligne de soutiens, le chargement du nouvel asset, les fonds roses partagés et le comportement responsive.

Validations exécutées :

- `npx playwright test tests/prd012-accueil-editorial-visuels.spec.js --project=desktop-1920` : 3 passés.
- `npx playwright test tests/prd012-accueil-editorial-visuels.spec.js` : 11 passés, 4 ignorés volontairement hors contrôle source.
- Inspection visuelle locale : `index.html#page-3` et `espaces-augmentes.html#page-5` affichent un rose soutenu sans dérive marron/orange.
- `npm run build:prod` : OK, 457 fichiers copiés dans `dist/`, 3 artefacts exclus.
- `npm test` : 97 passés, 48 ignorés volontairement selon la configuration viewport.
- `npm run seo:check` : 4 passés.

---

## Métriques de succès

- `rg -n "Créateurs d'Expériences Transmédia Immersives|# spectacle vivant # réalité mixte # storytelling|Soutiens CNC" src/index.html` ne retourne plus d’occurrence active.
- Le H1 visible de `index.html#page-1` correspond au titre validé.
- Les hashtags visibles contiennent `formats courts`, `spectacle vivant`, `XR`, `réalité mixte` et `storytelling`.
- Le résumé hero contient les deux phrases demandées.
- `index.html#page-3` contient la phrase `Nous imaginons des récits immersifs au croisement du spectacle vivant et des technologies XR.`
- Le nouvel asset issu de `1_swing.jpg` est référencé depuis `src/index.html`.
- L’image possède un attribut `alt` utile.
- La vidéo hero `#page-1` n’est pas recouverte par le calque `--gradient-hero-video-tint`.
- Les liens d’évitement `.skip-link` utilisent le fond rose lisible du site.
- `--gradient-background-pink-readable` pointe directement sur `--gradient-background-pink`, sans voile noir.
- `--gradient-background-pink` ne contient plus `#E97C54`.
- `index.html#page-3` et `espaces-augmentes.html#page-5` utilisent le fond rose partagé sans filtre CSS.
- Aucun débordement horizontal n’est observé à 375, 600, 768, 1024 et 1440 px.
- `npm run build:prod`, `npm test` et `npm run seo:check` terminent avec un code `0`.

---

## Questions pour Stéphanie

1. Le titre doit-il être affiché exactement comme dans le DOCX, ou en capitales accentuées : `CRÉATEURS D’EXPÉRIENCES IMMERSIVES` ?
2. Le CTA du hero doit-il rester `Découvrir les expériences`, ou faut-il le renommer pour refléter `XR` et `Films` ?
3. Confirme-t-on que seule la ligne de soutiens du hero doit disparaître, et non la section partenaires `Ils nous ont fait confiance` ?

---

## Changelog

| Date | Auteur | Changement |
|------|--------|------------|
| 2026-06-21 | Alex + Codex | Correction globale du fond rose partagé pour supprimer le voile noir et l’orange brunissant |
| 2026-06-21 | Alex + Codex | Retrait du calque de teinte sur la vidéo hero et passage du lien d’évitement sur le fond rose lisible |
| 2026-06-21 | Alex + Codex | Implémentation et validation du PRD |
| 2026-06-21 | Alex + Codex | Création du PRD |
