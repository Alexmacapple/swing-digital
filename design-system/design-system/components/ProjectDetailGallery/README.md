# ProjectDetailGallery

Détail de projet : texte, crédit, galerie et bandeau de logos.

## Où il sert

Pages : `dessine-moi-le-vent.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page47`.

Éléments : `.page47__credit`, `.page47__gallery`, `.page47__gallery-image`, `.page47__gallery-image--tall`, `.page47__layout`, `.page47__logo`, `.page47__logos`, `.page47__logos-bar`, `.page47__paragraph`, `.page47__text`.

Variantes : `.page47__gallery-image--tall`.

## Ce que fournit l’intégrateur

- 8 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__credit` : aussi dans PlayStillsPair, PhotoFeature, PhotoCredited, PhotoPairGrid, EstradeFeature
- `__gallery` : aussi dans StudioIntro, PhotoGallery, CompositionGallery, ExperiencesMosaic
- `__logo` : aussi dans PressReview, AwardsHero, PortraitSeriesHero, ProjectPosterHeader
- `__logos` : aussi dans PressReview, AwardsHero, PortraitSeriesHero, ProjectPosterHeader
- `__logos-bar` : aussi dans PressReview, AwardsHero
- `__text` : aussi dans CorporateOffer, AwardsDetail, PortraitGrid, PhotoMosaic

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
