# DevelopmentGrid

Grille des projets en développement, même carte que SeriesIntroGrid.

## Où il sert

Pages : `experiences-series.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page10`.

Éléments : `.page10__background`, `.page10__card`, `.page10__card-image`, `.page10__card-title`, `.page10__container`, `.page10__grid`.

## Ce que fournit l’intégrateur

- 5 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__container` : aussi dans StudioIntro, ContactVideo, SpaceStoryIntro, SeriesIntroGrid, CorporateOffer, PressReview, ChapterCards, PlayOpener …
- `__grid` : aussi dans SeriesIntroGrid, GraphicNovelPlates, PhotoPairGrid

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
