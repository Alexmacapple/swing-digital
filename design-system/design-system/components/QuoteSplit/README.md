# QuoteSplit

Deux colonnes : catégorie, titre, description et citations, photo.

## Où il sert

Pages : `marilyn.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page51`.

Éléments : `.page51__category`, `.page51__description`, `.page51__left`, `.page51__photo`, `.page51__quote`, `.page51__quotes`, `.page51__right`, `.page51__title`.

## Ce que fournit l’intégrateur

- 1 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__category` : aussi dans PhotoGallery, CompositionGallery, InstallationComposer, PodcastPlayer, InterviewSplit, QuizOpener, ProjectPosterHeader
- `__description` : aussi dans SeriesSelection, AwardsDetail, PortraitGrid, ProjectPosterHeader
- `__left` : aussi dans StudioIntro, PlayOpener, GraphicNovelOpener, PodcastPlayer, InterviewSplit, EstradeFeature, QuizOpener, SeriesSelection …
- `__photo` : aussi dans CorporateOffer, PodcastPlayer, InterviewPortraits, InterviewSplit, ExperiencesMosaic, EstradeFeature, SeriesSelection, AwardsDetail …
- `__right` : aussi dans StudioIntro, PlayOpener, GraphicNovelOpener, PodcastPlayer, InterviewSplit, EstradeFeature, QuizOpener, SeriesSelection …
- `__title` : aussi dans ContactVideo, SpaceStoryIntro, MixedRealityFeatures, PlayOpener, GraphicNovelOpener, InstallationOpener, PhotoCredited, PhotoPairGrid …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
