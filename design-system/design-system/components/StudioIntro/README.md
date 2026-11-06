# StudioIntro

Présentation du studio et de ses créations, avec galerie, crédits et transcription dépliable.

## Où il sert

Pages : `index.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page3`.

Éléments : `.page3__container`, `.page3__creations`, `.page3__credit-label`, `.page3__gallery`, `.page3__gallery-image`, `.page3__header`, `.page3__header-underline`, `.page3__intro`, `.page3__left`, `.page3__project`, `.page3__project--secondary`, `.page3__project-link`, `.page3__project-meta`, `.page3__project-meta--credit`, `.page3__project-subtitle`, `.page3__project-title`, `.page3__project-title-small`, `.page3__right`, `.page3__section-title`.

Variantes : `.page3__project--secondary`, `.page3__project-meta--credit`.

## Ce que fournit l’intégrateur

- 1 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Comportement

- transcription dépliable (`.js-disclosure-label`, `js/main.js`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__container` : aussi dans ContactVideo, SpaceStoryIntro, SeriesIntroGrid, DevelopmentGrid, CorporateOffer, PressReview, ChapterCards, PlayOpener …
- `__gallery` : aussi dans PhotoGallery, CompositionGallery, ExperiencesMosaic, ProjectDetailGallery
- `__header` : aussi dans SpaceStoryIntro, MixedRealityFeatures, SeriesIntroGrid, CorporateOffer, ChapterCards, InterviewPortraits, ExperiencesMosaic, AppProjectHero …
- `__left` : aussi dans PlayOpener, GraphicNovelOpener, PodcastPlayer, InterviewSplit, EstradeFeature, QuizOpener, SeriesSelection, QuoteSplit …
- `__right` : aussi dans PlayOpener, GraphicNovelOpener, PodcastPlayer, InterviewSplit, EstradeFeature, QuizOpener, SeriesSelection, QuoteSplit …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
