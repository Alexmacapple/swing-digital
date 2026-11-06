# GraphicNovelOpener

Ouverture « Le Roman graphique » : numéro, titre, couverture.

## Où il sert

Pages : `monroe-roman-graphique.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page20`.

Éléments : `.page20__container`, `.page20__cover`, `.page20__figure`, `.page20__left`, `.page20__number`, `.page20__right`, `.page20__title`.

## Ce que fournit l’intégrateur

- 1 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__container` : aussi dans StudioIntro, ContactVideo, SpaceStoryIntro, SeriesIntroGrid, DevelopmentGrid, CorporateOffer, PressReview, ChapterCards …
- `__cover` : aussi dans PlayOpener
- `__left` : aussi dans StudioIntro, PlayOpener, PodcastPlayer, InterviewSplit, EstradeFeature, QuizOpener, SeriesSelection, QuoteSplit …
- `__number` : aussi dans PlayOpener, InstallationOpener, SeriesSelection
- `__right` : aussi dans StudioIntro, PlayOpener, PodcastPlayer, InterviewSplit, EstradeFeature, QuizOpener, SeriesSelection, QuoteSplit …
- `__title` : aussi dans ContactVideo, SpaceStoryIntro, MixedRealityFeatures, PlayOpener, InstallationOpener, PhotoCredited, PhotoPairGrid, EstradeFeature …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
