# AwardsHero

Héros de projet sur image : titre, sous-titre, prix et bandeau de logos.

## Où il sert

Pages : `voyage-autour-de-moi.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page43`.

Éléments : `.page43__award-text`, `.page43__award-title`, `.page43__awards`, `.page43__background`, `.page43__background-image`, `.page43__container`, `.page43__logo`, `.page43__logo--invert`, `.page43__logos`, `.page43__logos-bar`, `.page43__subtitle`, `.page43__title`, `.page43__title-group`.

Variantes : `.page43__logo--invert`.

## Ce que fournit l’intégrateur

- 8 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__container` : aussi dans StudioIntro, ContactVideo, SpaceStoryIntro, SeriesIntroGrid, DevelopmentGrid, CorporateOffer, PressReview, ChapterCards …
- `__logo` : aussi dans PressReview, ProjectDetailGallery, PortraitSeriesHero, ProjectPosterHeader
- `__logos` : aussi dans PressReview, ProjectDetailGallery, PortraitSeriesHero, ProjectPosterHeader
- `__logos-bar` : aussi dans PressReview, ProjectDetailGallery
- `__subtitle` : aussi dans SpaceStoryIntro, CorporateOffer, QuizOpener, SeriesSelection, PortraitSeriesHero
- `__title` : aussi dans ContactVideo, SpaceStoryIntro, MixedRealityFeatures, PlayOpener, GraphicNovelOpener, InstallationOpener, PhotoCredited, PhotoPairGrid …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
