# PhotoCredited

Photographie titrée et créditée, répétée trois fois sur la page Photographies.

## Où il sert

Pages : `monroe-photographie.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page27`.

Éléments : `.page27__container`, `.page27__credit`, `.page27__image`, `.page27__image-wrapper`, `.page27__title`.

## Ce que fournit l’intégrateur

- 1 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__container` : aussi dans StudioIntro, ContactVideo, SpaceStoryIntro, SeriesIntroGrid, DevelopmentGrid, CorporateOffer, PressReview, ChapterCards …
- `__credit` : aussi dans PlayStillsPair, PhotoFeature, PhotoPairGrid, EstradeFeature, ProjectDetailGallery
- `__image` : aussi dans SpaceStoryIntro, MixedRealityFeatures, PlayStillsPair, GraphicNovelPlates, InstallationOpener, PhotoFeature, PhotoPairGrid, CompositionGallery …
- `__title` : aussi dans ContactVideo, SpaceStoryIntro, MixedRealityFeatures, PlayOpener, GraphicNovelOpener, InstallationOpener, PhotoPairGrid, EstradeFeature …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
