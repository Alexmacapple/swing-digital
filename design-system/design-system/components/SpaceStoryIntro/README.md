# SpaceStoryIntro

Ouverture « Réinventer l'espace des récits » : titre, sous-titre et grande image.

## Où il sert

Pages : `espaces-augmentes.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page5`.

Éléments : `.page5__container`, `.page5__footer`, `.page5__header`, `.page5__image`, `.page5__image-wrapper`, `.page5__subtitle`, `.page5__title`.

## Ce que fournit l’intégrateur

- 1 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__container` : aussi dans StudioIntro, ContactVideo, SeriesIntroGrid, DevelopmentGrid, CorporateOffer, PressReview, ChapterCards, PlayOpener …
- `__header` : aussi dans StudioIntro, MixedRealityFeatures, SeriesIntroGrid, CorporateOffer, ChapterCards, InterviewPortraits, ExperiencesMosaic, AppProjectHero …
- `__image` : aussi dans MixedRealityFeatures, PlayStillsPair, GraphicNovelPlates, InstallationOpener, PhotoFeature, PhotoCredited, PhotoPairGrid, CompositionGallery …
- `__subtitle` : aussi dans CorporateOffer, QuizOpener, SeriesSelection, AwardsHero, PortraitSeriesHero
- `__title` : aussi dans ContactVideo, MixedRealityFeatures, PlayOpener, GraphicNovelOpener, InstallationOpener, PhotoCredited, PhotoPairGrid, EstradeFeature …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
