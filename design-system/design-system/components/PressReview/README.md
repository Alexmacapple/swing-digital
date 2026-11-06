# PressReview

Revue de presse : affiche, citations dépliables et bandeau de logos médias.

## Où il sert

Pages : `experience-monroe.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page12`.

Éléments : `.page12__background`, `.page12__container`, `.page12__disclosure-btn`, `.page12__fig-legend`, `.page12__logo`, `.page12__logo--invert`, `.page12__logos`, `.page12__logos-bar`, `.page12__poster`, `.page12__poster-caption`, `.page12__poster-image`, `.page12__quotes`, `.page12__quotes-list`.

Variantes : `.page12__logo--invert`.

## Ce que fournit l’intégrateur

- 13 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Comportement

- bouton dépliant des citations

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__container` : aussi dans StudioIntro, ContactVideo, SpaceStoryIntro, SeriesIntroGrid, DevelopmentGrid, CorporateOffer, ChapterCards, PlayOpener …
- `__logo` : aussi dans AwardsHero, ProjectDetailGallery, PortraitSeriesHero, ProjectPosterHeader
- `__logos` : aussi dans AwardsHero, ProjectDetailGallery, PortraitSeriesHero, ProjectPosterHeader
- `__logos-bar` : aussi dans AwardsHero, ProjectDetailGallery

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
