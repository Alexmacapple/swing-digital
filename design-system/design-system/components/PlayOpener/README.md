# PlayOpener

Ouverture de chapitre « La Pièce » : grand numéro, titre, couverture et portrait.

## Où il sert

Pages : `monroe-piece.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page14`.

Éléments : `.page14__actress`, `.page14__actress-wrapper`, `.page14__container`, `.page14__cover`, `.page14__figure`, `.page14__left`, `.page14__number`, `.page14__right`, `.page14__title`.

## Ce que fournit l’intégrateur

- 2 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__container` : aussi dans StudioIntro, ContactVideo, SpaceStoryIntro, SeriesIntroGrid, DevelopmentGrid, CorporateOffer, PressReview, ChapterCards …
- `__cover` : aussi dans GraphicNovelOpener
- `__left` : aussi dans StudioIntro, GraphicNovelOpener, PodcastPlayer, InterviewSplit, EstradeFeature, QuizOpener, SeriesSelection, QuoteSplit …
- `__number` : aussi dans GraphicNovelOpener, InstallationOpener, SeriesSelection
- `__right` : aussi dans StudioIntro, GraphicNovelOpener, PodcastPlayer, InterviewSplit, EstradeFeature, QuizOpener, SeriesSelection, QuoteSplit …
- `__title` : aussi dans ContactVideo, SpaceStoryIntro, MixedRealityFeatures, GraphicNovelOpener, InstallationOpener, PhotoCredited, PhotoPairGrid, EstradeFeature …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
