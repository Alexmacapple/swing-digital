# ContactVideo

Bloc contact sur vidéo de fond : marque, adresse et courriel.

## Où il sert

Pages : `index.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page62`.

Éléments : `.page62__address`, `.page62__background`, `.page62__background-video`, `.page62__brand`, `.page62__container`, `.page62__email`, `.page62__play-btn`, `.page62__play-icon`, `.page62__play-icon--paused`, `.page62__play-icon--playing`, `.page62__title`.

Variantes : `.page62__play-icon--paused`, `.page62__play-icon--playing`.

## Ce que fournit l’intégrateur

- une vidéo MP4 et son image poster (non chargée dans l’aperçu)
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Comportement

- boutons lecture/pause pilotés par `js/main.js`

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__container` : aussi dans StudioIntro, SpaceStoryIntro, SeriesIntroGrid, DevelopmentGrid, CorporateOffer, PressReview, ChapterCards, PlayOpener …
- `__title` : aussi dans SpaceStoryIntro, MixedRealityFeatures, PlayOpener, GraphicNovelOpener, InstallationOpener, PhotoCredited, PhotoPairGrid, EstradeFeature …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
