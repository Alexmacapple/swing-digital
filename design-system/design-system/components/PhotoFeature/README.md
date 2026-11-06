# PhotoFeature

Photographie seule avec son crédit.

## Où il sert

Pages : `monroe-photographie.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page26`.

Éléments : `.page26__container`, `.page26__credit`, `.page26__image`, `.page26__image-wrapper`.

## Ce que fournit l’intégrateur

- 1 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__container` : aussi dans StudioIntro, ContactVideo, SpaceStoryIntro, SeriesIntroGrid, DevelopmentGrid, CorporateOffer, PressReview, ChapterCards …
- `__credit` : aussi dans PlayStillsPair, PhotoCredited, PhotoPairGrid, EstradeFeature, ProjectDetailGallery
- `__image` : aussi dans SpaceStoryIntro, MixedRealityFeatures, PlayStillsPair, GraphicNovelPlates, InstallationOpener, PhotoCredited, PhotoPairGrid, CompositionGallery …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
