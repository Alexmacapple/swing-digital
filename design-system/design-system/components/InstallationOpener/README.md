# InstallationOpener

Ouverture « Installation interactive » : image, voile, numéro et bande or.

## Où il sert

Pages : `monroe-installation.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page23`.

Éléments : `.page23__gold-band`, `.page23__image`, `.page23__number`, `.page23__overlay`, `.page23__title`.

## Ce que fournit l’intégrateur

- 1 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__image` : aussi dans SpaceStoryIntro, MixedRealityFeatures, PlayStillsPair, GraphicNovelPlates, PhotoFeature, PhotoCredited, PhotoPairGrid, CompositionGallery …
- `__number` : aussi dans PlayOpener, GraphicNovelOpener, SeriesSelection
- `__title` : aussi dans ContactVideo, SpaceStoryIntro, MixedRealityFeatures, PlayOpener, GraphicNovelOpener, PhotoCredited, PhotoPairGrid, EstradeFeature …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
