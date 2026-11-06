# InstallationComposer

Installation interactive : catégorie, texte du compositeur et image.

## Où il sert

Pages : `monroe-composition.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page32`.

Éléments : `.page25__category-arrow`, `.page32__bottom`, `.page32__category`, `.page32__category-letter`, `.page32__category-text`, `.page32__category-textes`, `.page32__composer`, `.page32__image`, `.page32__top`.

## Ce que fournit l’intégrateur

- 2 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__category` : aussi dans PhotoGallery, CompositionGallery, PodcastPlayer, InterviewSplit, QuizOpener, QuoteSplit, ProjectPosterHeader
- `__category-letter` : aussi dans PhotoGallery, CompositionGallery, PodcastPlayer, InterviewPortraits, InterviewSplit, ExperiencesMosaic, QuizOpener
- `__image` : aussi dans SpaceStoryIntro, MixedRealityFeatures, PlayStillsPair, GraphicNovelPlates, InstallationOpener, PhotoFeature, PhotoCredited, PhotoPairGrid …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
