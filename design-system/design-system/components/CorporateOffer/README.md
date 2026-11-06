# CorporateOffer

Offre XR pour les entreprises : titre, accroche, argumentaire, étiquettes et appel à l'action.

## Où il sert

Pages : `xr-corporate.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page57`.

Éléments : `.page57__container`, `.page57__cta`, `.page57__header`, `.page57__layout`, `.page57__main-title`, `.page57__nowrap`, `.page57__paragraph`, `.page57__photo`, `.page57__separator`, `.page57__subtitle`, `.page57__tags`, `.page57__text`, `.page57__visual`.

## Ce que fournit l’intégrateur

- 1 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__container` : aussi dans StudioIntro, ContactVideo, SpaceStoryIntro, SeriesIntroGrid, DevelopmentGrid, PressReview, ChapterCards, PlayOpener …
- `__header` : aussi dans StudioIntro, SpaceStoryIntro, MixedRealityFeatures, SeriesIntroGrid, ChapterCards, InterviewPortraits, ExperiencesMosaic, AppProjectHero …
- `__photo` : aussi dans PodcastPlayer, InterviewPortraits, InterviewSplit, ExperiencesMosaic, EstradeFeature, SeriesSelection, AwardsDetail, QuoteSplit …
- `__subtitle` : aussi dans SpaceStoryIntro, QuizOpener, SeriesSelection, AwardsHero, PortraitSeriesHero
- `__text` : aussi dans AwardsDetail, ProjectDetailGallery, PortraitGrid, PhotoMosaic

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
