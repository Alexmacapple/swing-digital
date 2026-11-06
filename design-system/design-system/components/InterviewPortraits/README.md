# InterviewPortraits

Portraits d'interviewés avec légende nom et qualité.

## Où il sert

Pages : `monroe-interviews.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page34`.

Éléments : `.page25__category-arrow`, `.page34__caption`, `.page34__caption-label`, `.page34__caption-name`, `.page34__category-letter`, `.page34__category-title`, `.page34__header`, `.page34__interview`, `.page34__photo`, `.page34__photo-wrapper`.

## Ce que fournit l’intégrateur

- 2 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__category-letter` : aussi dans PhotoGallery, CompositionGallery, InstallationComposer, PodcastPlayer, InterviewSplit, ExperiencesMosaic, QuizOpener
- `__category-title` : aussi dans PhotoGallery, CompositionGallery, PodcastPlayer, InterviewSplit, ExperiencesMosaic
- `__header` : aussi dans StudioIntro, SpaceStoryIntro, MixedRealityFeatures, SeriesIntroGrid, CorporateOffer, ChapterCards, ExperiencesMosaic, AppProjectHero …
- `__photo` : aussi dans CorporateOffer, PodcastPlayer, InterviewSplit, ExperiencesMosaic, EstradeFeature, SeriesSelection, AwardsDetail, QuoteSplit …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
