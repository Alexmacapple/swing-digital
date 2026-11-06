# SeriesIntroGrid

Introduction aux expériences et séries : mots-dièse puis grille de cartes projet.

## Où il sert

Pages : `experiences-series.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page9`.

Éléments : `.page9__background`, `.page9__card`, `.page9__card-image`, `.page9__card-title`, `.page9__container`, `.page9__grid`, `.page9__hashtags`, `.page9__header`, `.page9__intro`, `.page9__intro-text`.

## Ce que fournit l’intégrateur

- 4 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__container` : aussi dans StudioIntro, ContactVideo, SpaceStoryIntro, DevelopmentGrid, CorporateOffer, PressReview, ChapterCards, PlayOpener …
- `__grid` : aussi dans DevelopmentGrid, GraphicNovelPlates, PhotoPairGrid
- `__header` : aussi dans StudioIntro, SpaceStoryIntro, MixedRealityFeatures, CorporateOffer, ChapterCards, InterviewPortraits, ExperiencesMosaic, AppProjectHero …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
