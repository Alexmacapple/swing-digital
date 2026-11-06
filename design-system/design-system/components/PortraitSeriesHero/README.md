# PortraitSeriesHero

Héros « Ni vues ni connues » : bandeaux image, titre, accroche et logos.

## Où il sert

Pages : `ni-vues-ni-connues.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page48`.

Éléments : `.page48__banner-bottom`, `.page48__banner-image`, `.page48__banner-top`, `.page48__content`, `.page48__logo`, `.page48__logos`, `.page48__subtitle`, `.page48__subtitle--bold`, `.page48__tagline`, `.page48__title`.

Variantes : `.page48__subtitle--bold`.

## Ce que fournit l’intégrateur

- 4 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__logo` : aussi dans PressReview, AwardsHero, ProjectDetailGallery, ProjectPosterHeader
- `__logos` : aussi dans PressReview, AwardsHero, ProjectDetailGallery, ProjectPosterHeader
- `__subtitle` : aussi dans SpaceStoryIntro, CorporateOffer, QuizOpener, SeriesSelection, AwardsHero
- `__title` : aussi dans ContactVideo, SpaceStoryIntro, MixedRealityFeatures, PlayOpener, GraphicNovelOpener, InstallationOpener, PhotoCredited, PhotoPairGrid …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
