# ProjectPosterHeader

En-tête de projet : catégorie, titre, description, logos et affiche (Charlotte Henschel, Toulouse-Lautrec).

## Où il sert

Pages : `charlotte-henschel.html`, `toulouse-lautrec.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page53`.

Éléments : `.page53__category`, `.page53__description`, `.page53__header`, `.page53__left`, `.page53__logo`, `.page53__logos`, `.page53__poster`, `.page53__right`, `.page53__title`.

## Ce que fournit l’intégrateur

- 3 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__category` : aussi dans PhotoGallery, CompositionGallery, InstallationComposer, PodcastPlayer, InterviewSplit, QuizOpener, QuoteSplit
- `__description` : aussi dans SeriesSelection, AwardsDetail, PortraitGrid, QuoteSplit
- `__header` : aussi dans StudioIntro, SpaceStoryIntro, MixedRealityFeatures, SeriesIntroGrid, CorporateOffer, ChapterCards, InterviewPortraits, ExperiencesMosaic …
- `__left` : aussi dans StudioIntro, PlayOpener, GraphicNovelOpener, PodcastPlayer, InterviewSplit, EstradeFeature, QuizOpener, SeriesSelection …
- `__logo` : aussi dans PressReview, AwardsHero, ProjectDetailGallery, PortraitSeriesHero
- `__logos` : aussi dans PressReview, AwardsHero, ProjectDetailGallery, PortraitSeriesHero
- `__right` : aussi dans StudioIntro, PlayOpener, GraphicNovelOpener, PodcastPlayer, InterviewSplit, EstradeFeature, QuizOpener, SeriesSelection …
- `__title` : aussi dans ContactVideo, SpaceStoryIntro, MixedRealityFeatures, PlayOpener, GraphicNovelOpener, InstallationOpener, PhotoCredited, PhotoPairGrid …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
