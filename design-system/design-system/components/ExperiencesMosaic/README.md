# ExperiencesMosaic

Mosaïque de photos de trois tailles pour les expériences interactives.

## Où il sert

Pages : `monroe-experiences.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page36`.

Éléments : `.page25__category-arrow`, `.page36__category-letter`, `.page36__category-title`, `.page36__gallery`, `.page36__header`, `.page36__photo`, `.page36__photo--large`, `.page36__photo--medium`, `.page36__photo--small`, `.page36__photo-image`.

Variantes : `.page36__photo--large`, `.page36__photo--medium`, `.page36__photo--small`.

## Ce que fournit l’intégrateur

- 3 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__category-letter` : aussi dans PhotoGallery, CompositionGallery, InstallationComposer, PodcastPlayer, InterviewPortraits, InterviewSplit, QuizOpener
- `__category-title` : aussi dans PhotoGallery, CompositionGallery, PodcastPlayer, InterviewPortraits, InterviewSplit
- `__gallery` : aussi dans StudioIntro, PhotoGallery, CompositionGallery, ProjectDetailGallery
- `__header` : aussi dans StudioIntro, SpaceStoryIntro, MixedRealityFeatures, SeriesIntroGrid, CorporateOffer, ChapterCards, InterviewPortraits, AppProjectHero …
- `__photo` : aussi dans CorporateOffer, PodcastPlayer, InterviewPortraits, InterviewSplit, EstradeFeature, SeriesSelection, AwardsDetail, QuoteSplit …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
