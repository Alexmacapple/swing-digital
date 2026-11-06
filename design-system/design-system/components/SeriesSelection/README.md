# SeriesSelection

Présentation de la série : numéro, format, sélection en liste et photo.

## Où il sert

Pages : `serie-marilyn.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page39`.

Éléments : `.page39__description`, `.page39__format`, `.page39__left`, `.page39__number`, `.page39__photo`, `.page39__right`, `.page39__selection-list`, `.page39__selection-title`, `.page39__separator`, `.page39__stripe`, `.page39__subtitle`, `.page39__title`.

## Ce que fournit l’intégrateur

- 1 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__description` : aussi dans AwardsDetail, PortraitGrid, QuoteSplit, ProjectPosterHeader
- `__left` : aussi dans StudioIntro, PlayOpener, GraphicNovelOpener, PodcastPlayer, InterviewSplit, EstradeFeature, QuizOpener, QuoteSplit …
- `__number` : aussi dans PlayOpener, GraphicNovelOpener, InstallationOpener
- `__photo` : aussi dans CorporateOffer, PodcastPlayer, InterviewPortraits, InterviewSplit, ExperiencesMosaic, EstradeFeature, AwardsDetail, QuoteSplit …
- `__right` : aussi dans StudioIntro, PlayOpener, GraphicNovelOpener, PodcastPlayer, InterviewSplit, EstradeFeature, QuizOpener, QuoteSplit …
- `__subtitle` : aussi dans SpaceStoryIntro, CorporateOffer, QuizOpener, AwardsHero, PortraitSeriesHero
- `__title` : aussi dans ContactVideo, SpaceStoryIntro, MixedRealityFeatures, PlayOpener, GraphicNovelOpener, InstallationOpener, PhotoCredited, PhotoPairGrid …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
