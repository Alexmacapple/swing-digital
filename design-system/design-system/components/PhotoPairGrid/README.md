# PhotoPairGrid

Grille de deux photographies titrées et créditées.

## Où il sert

Pages : `monroe-photographie.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page30`.

Éléments : `.page27__credit`, `.page27__title`, `.page30__container`, `.page30__grid`, `.page30__image`, `.page30__image-block`.

## Ce que fournit l’intégrateur

- 2 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__container` : aussi dans StudioIntro, ContactVideo, SpaceStoryIntro, SeriesIntroGrid, DevelopmentGrid, CorporateOffer, PressReview, ChapterCards …
- `__credit` : aussi dans PlayStillsPair, PhotoFeature, PhotoCredited, EstradeFeature, ProjectDetailGallery
- `__grid` : aussi dans SeriesIntroGrid, DevelopmentGrid, GraphicNovelPlates
- `__image` : aussi dans SpaceStoryIntro, MixedRealityFeatures, PlayStillsPair, GraphicNovelPlates, InstallationOpener, PhotoFeature, PhotoCredited, CompositionGallery …
- `__title` : aussi dans ContactVideo, SpaceStoryIntro, MixedRealityFeatures, PlayOpener, GraphicNovelOpener, InstallationOpener, PhotoCredited, EstradeFeature …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
