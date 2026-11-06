# EstradeFeature

Mise en avant « L'estrade » : titre empilé, lettre, photo et crédit.

## Où il sert

Pages : `monroe-experiences.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page37`.

Éléments : `.page37__category-arrow`, `.page37__credit`, `.page37__left`, `.page37__letter`, `.page37__photo`, `.page37__right`, `.page37__title`, `.page37__title-group`.

## Ce que fournit l’intégrateur

- 1 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__credit` : aussi dans PlayStillsPair, PhotoFeature, PhotoCredited, PhotoPairGrid, ProjectDetailGallery
- `__left` : aussi dans StudioIntro, PlayOpener, GraphicNovelOpener, PodcastPlayer, InterviewSplit, QuizOpener, SeriesSelection, QuoteSplit …
- `__photo` : aussi dans CorporateOffer, PodcastPlayer, InterviewPortraits, InterviewSplit, ExperiencesMosaic, SeriesSelection, AwardsDetail, QuoteSplit …
- `__right` : aussi dans StudioIntro, PlayOpener, GraphicNovelOpener, PodcastPlayer, InterviewSplit, QuizOpener, SeriesSelection, QuoteSplit …
- `__title` : aussi dans ContactVideo, SpaceStoryIntro, MixedRealityFeatures, PlayOpener, GraphicNovelOpener, InstallationOpener, PhotoCredited, PhotoPairGrid …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
