# QuizOpener

Ouverture du quiz Marilyn : catégorie, titre et téléphone.

## Où il sert

Pages : `monroe-quiz.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page38`.

Éléments : `.page25__category-arrow`, `.page38__category`, `.page38__category-letter`, `.page38__left`, `.page38__phone`, `.page38__right`, `.page38__subtitle`, `.page38__title`.

## Ce que fournit l’intégrateur

- 1 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__category` : aussi dans PhotoGallery, CompositionGallery, InstallationComposer, PodcastPlayer, InterviewSplit, QuoteSplit, ProjectPosterHeader
- `__category-letter` : aussi dans PhotoGallery, CompositionGallery, InstallationComposer, PodcastPlayer, InterviewPortraits, InterviewSplit, ExperiencesMosaic
- `__left` : aussi dans StudioIntro, PlayOpener, GraphicNovelOpener, PodcastPlayer, InterviewSplit, EstradeFeature, SeriesSelection, QuoteSplit …
- `__right` : aussi dans StudioIntro, PlayOpener, GraphicNovelOpener, PodcastPlayer, InterviewSplit, EstradeFeature, SeriesSelection, QuoteSplit …
- `__subtitle` : aussi dans SpaceStoryIntro, CorporateOffer, SeriesSelection, AwardsHero, PortraitSeriesHero
- `__title` : aussi dans ContactVideo, SpaceStoryIntro, MixedRealityFeatures, PlayOpener, GraphicNovelOpener, InstallationOpener, PhotoCredited, PhotoPairGrid …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
