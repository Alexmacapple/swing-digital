# PRD-014 : Pages projets Marilyn, Toulouse-Lautrec et Charlotte Henschel

**Statut** : Implémenté et vérifié localement
**Date** : 2026-06-21
**Auteur** : Alex
**Source** : `retour/changements_site (1).docx`, `retour/site_images/Marilyn*.jpg`, `retour/site_images/Lautrec*.jpg`, `retour/site_images/Charlotte*.jpg`, inspection de `src/marilyn.html`, `src/toulouse-lautrec.html` et `src/charlotte-henschel.html`

---

## Vision

Le quoi : mettre à jour les pages projet Marilyn, Toulouse-Lautrec et Charlotte Henschel avec les nouveaux textes, exports visuels et corrections de logos.

Le pourquoi : ces pages présentent des projets en développement et doivent refléter la version éditoriale la plus récente. Le mécanisme attendu est de réduire les écarts entre les exports validés par Stéphanie et les pages HTML, tout en conservant des pages accessibles, responsive et indexables.

Le comment : renvoyé au Plan d’implémentation.

## Exemple bout-en-bout réel

Un visiteur ouvre `toulouse-lautrec.html#page-53`.

Il ne lit plus l’ancien paragraphe en capitalisation irrégulière. La page affiche le nouveau texte : visite immersive en réalité mixte dans Montmartre, accompagnée par des acteur·rices, avec le Paris de 1890 qui se superpose au présent et l’effervescence de la Belle Époque qui reprend vie.

Sur `#page-54`, le texte n’écrit plus seulement que les muses prennent la parole. Il ajoute que La Goulue, Jane Avril et Suzanne Valadon sortent de l’ombre, et que la déambulation réécrit l’histoire à travers leur regard.

Un visiteur ouvre `charlotte-henschel.html#page-55`. Le texte respecte les majuscules françaises, la capitalisation du nom Charlotte Henschel et la nouvelle formulation : une vie passée à peindre malgré la guerre, l’exil, les camps et l’anonymat ; un parcours habité par le besoin irrépressible de créer.

Sur `#page-56`, la biographie de Charlotte est mise en lignes plus lisibles, sans perdre les informations sur les 220 tableaux, le MAHJ et le musée Henri-Martin.

Un visiteur ouvre `marilyn.html#page-50`. Les logos et exports sont remplacés ou recadrés de façon nette, sans compression visible et sans chevauchement.

---

## Contexte

État observé le 2026-06-21 :

- `src/toulouse-lautrec.html#page-53` contient encore l’ancien texte `Déambulation EN réalité mixte...`.
- `src/toulouse-lautrec.html#page-54` contient encore trois paragraphes anciens.
- `src/charlotte-henschel.html#page-55` contient encore `charlotte henschel` en minuscules dans le corps et `EN réalité mixte`.
- `src/charlotte-henschel.html#page-56` contient une seule phrase longue.
- `src/marilyn.html#page-50` utilise des logos séparés et Stéphanie signale un problème de logos.
- Les nouveaux assets fournis sont en 842 x 595 px pour les exports complets des pages projet.

Assets fournis :

- Marilyn : `Marilyn_1.jpg`, `Marilyn2.jpg`, `Marilyn3.jpg`.
- Toulouse-Lautrec : `Lautrec_1.jpg`, `Lautrec2.jpg`.
- Charlotte Henschel : `Charlotte.jpg`, `Charlotte2.jpg`.

---

## Problème

Les pages projet actuelles mélangent du texte ancien, des capitalisations incorrectes et des assets que Stéphanie juge compressés ou problématiques. Mais remplacer chaque section par un export image complet ferait perdre une partie du texte HTML, de l’accessibilité et du référencement.

Il faut donc séparer deux choses :

- les exports complets, qui servent de référence visuelle ou d’asset si une section est réellement image-first ;
- les textes éditoriaux, qui doivent rester en HTML lorsque la page actuelle les affiche déjà en HTML.

---

## Solution

Mettre à jour les textes HTML, remplacer ou recadrer les images/logos selon les exports fournis, puis vérifier la mise en page responsive.

Principes :

- conserver le texte éditorial en HTML quand il est actuellement en HTML ;
- utiliser les nouveaux exports comme sources d’images ou références de mise en page ;
- intégrer les logos via fichiers propres quand possible, plutôt qu’en texte pixellisé ;
- corriger la capitalisation française visible ;
- conserver les ancres existantes `#page-50`, `#page-53`, `#page-54`, `#page-55` et `#page-56`.

État livré le 2026-06-21 :

- les exports Marilyn, Toulouse-Lautrec et Charlotte Henschel sont copiés dans des chemins stables sous `src/img/pages/` ;
- `marilyn.html#page-50` utilise l’export complet `marilyn-page-50.jpg` avec contenu sémantique conservé pour l’accessibilité ;
- `marilyn.html#page-52` corrige `Marilyn` et `parcours en direct` ;
- `toulouse-lautrec.html#page-53` et `#page-54` reprennent les nouvelles formulations HTML ;
- `charlotte-henschel.html#page-55` corrige la capitalisation et la formulation ;
- `charlotte-henschel.html#page-56` découpe la biographie en lignes lisibles ;
- le cache-buster CSS des trois pages modifiées est mis à jour ;
- le test Playwright `tests/prd014-pages-projets-marilyn-lautrec-charlotte.spec.js` couvre les textes, assets et rendus responsive.

---

## Options évaluées

### Option A (retenue) : corrections HTML + remplacement ciblé des assets

**Avantages** :
- conserve l’accessibilité et le SEO ;
- permet des textes nets sur mobile ;
- limite les changements structurels ;
- garde les ancres existantes ;
- permet d’améliorer les logos sans rendre toute la page dépendante d’un export aplati.

**Inconvénients** :
- demande une interprétation des exports fournis ;
- nécessite une vérification visuelle plus fine ;
- peut demander de découper certains logos ou visuels.

### Option B : remplacer chaque page par l’export complet fourni

**Avantages** :
- très proche du rendu fourni ;
- implémentation rapide pour les sections full-screen.

**Inconvénients** :
- texte moins accessible et moins indexable ;
- rendu potentiellement flou selon les écrans ;
- correction future plus lourde ;
- risque de contraste ou de lisibilité non maîtrisé.

### Option C : corriger seulement les textes sans toucher aux images

**Avantages** :
- diff réduit ;
- aucun risque de casser la mise en page visuelle.

**Inconvénients** :
- ignore les retours explicites sur les logos et exports compressés ;
- laisse Marilyn partiellement non corrigé ;
- crée un écart entre les assets fournis et le site publié.

---

## Décision

Retenir l’Option A.

Les textes demandés par Stéphanie doivent être intégrés en HTML. Les exports complets servent à remplacer les images quand la page actuelle est principalement visuelle, ou à guider les corrections de logos et de composition.

Pour Marilyn, le mapping exact des trois exports doit être confirmé avant de supprimer les images existantes, sauf si l’inspection visuelle permet d’établir une correspondance évidente.

---

## Plan d’implémentation

1. Copier les assets validés sous `src/img/` avec des noms stables.
2. Cartographier les exports fournis vers les sections existantes : Marilyn pages 50-52, Lautrec pages 53-54, Charlotte pages 55-56.
3. Mettre à jour le texte de `toulouse-lautrec.html#page-53`.
4. Mettre à jour le texte de `toulouse-lautrec.html#page-54`.
5. Mettre à jour le texte de `charlotte-henschel.html#page-55`.
6. Recomposer le bloc biographique de `charlotte-henschel.html#page-56` avec une meilleure mise à la ligne.
7. Corriger les capitalisations visibles : noms propres, `en réalité mixte`, Belle Époque, Montmartre.
8. Corriger les logos de Marilyn avec les assets fournis ou les logos séparés existants selon le rendu le plus net.
9. Remplacer les images compressées si les exports fournis sont plus nets et compatibles avec la mise en page.
10. Mettre à jour les attributs `alt`, dimensions et `loading` des images remplacées.
11. Ajuster le CSS uniquement si les nouveaux ratios d’image l’exigent.
12. Mettre à jour le cache-buster CSS si le CSS change.
13. Régénérer `dist/` avec `npm run build:prod`.
14. Vérifier les pages aux largeurs 375, 600, 768, 1024 et 1440 px.
15. Exécuter `npm test` et `npm run seo:check`.

---

## Métriques de succès

- `rg -n "Déambulation EN réalité mixte|toulouse-lautrec|la goulue|jane avril|suzanne valadon|EN réalité mixte|charlotte henschel" src/toulouse-lautrec.html src/charlotte-henschel.html` ne retourne plus d’occurrence active avec capitalisation incorrecte.
- `src/toulouse-lautrec.html` contient `accompagnée par des acteur·rices`.
- `src/toulouse-lautrec.html` contient `les muses sortent de l’ombre et prennent la parole`.
- `src/charlotte-henschel.html` contient la nouvelle formulation `Une valise restée quarante ans dans l'oubli, sous un lit.`
- `src/charlotte-henschel.html` contient `Charlotte a peint` et `plus de 220 tableaux` dans un bloc lisible.
- Les images remplacées référencent des fichiers présents dans `src/img/`.
- Chaque nouvelle image possède un `alt` adapté.
- Aucun débordement horizontal n’est observé à 375, 600, 768, 1024 et 1440 px sur les trois pages.
- `npm run build:prod`, `npm test` et `npm run seo:check` terminent avec un code `0`.

---

## Questions pour Stéphanie

1. Les fichiers `Marilyn_1.jpg`, `Marilyn2.jpg` et `Marilyn3.jpg` correspondent-ils aux pages 50, 51 et 52 dans cet ordre ?
2. Pour Marilyn, faut-il remplacer toute la page 50 par l’export complet, ou seulement corriger les logos sur la composition HTML actuelle ?
3. Pour Charlotte, souhaites-tu conserver `acteur·rices` seulement sur Lautrec, ou appliquer une écriture inclusive similaire ailleurs ?

---

## Changelog

| Date | Auteur | Changement |
|------|--------|------------|
| 2026-06-21 | Alex + Codex | Implémentation des corrections Marilyn, Toulouse-Lautrec et Charlotte Henschel, intégration des exports et test Playwright dédié |
| 2026-06-21 | Alex + Codex | Création du PRD |
