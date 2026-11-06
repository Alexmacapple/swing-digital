# CompositionGallery

Composition électroacoustique : catégorie, compositeur et galerie.

## Où il sert

Pages : `monroe-composition.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page31`.

Éléments : `.page25__category-arrow`, `.page31__category`, `.page31__category-letter`, `.page31__category-textes`, `.page31__category-title`, `.page31__composer`, `.page31__gallery`, `.page31__image`, `.page31__layout`.

## Ce que fournit l’intégrateur

- 2 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__category` : aussi dans PhotoGallery, InstallationComposer, PodcastPlayer, InterviewSplit, QuizOpener, QuoteSplit, ProjectPosterHeader
- `__category-letter` : aussi dans PhotoGallery, InstallationComposer, PodcastPlayer, InterviewPortraits, InterviewSplit, ExperiencesMosaic, QuizOpener
- `__category-title` : aussi dans PhotoGallery, PodcastPlayer, InterviewPortraits, InterviewSplit, ExperiencesMosaic
- `__gallery` : aussi dans StudioIntro, PhotoGallery, ExperiencesMosaic, ProjectDetailGallery
- `__image` : aussi dans SpaceStoryIntro, MixedRealityFeatures, PlayStillsPair, GraphicNovelPlates, InstallationOpener, PhotoFeature, PhotoCredited, PhotoPairGrid …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
