# PlayStillsPair

Deux images superposées de la pièce avec crédit, variantes --champ et --couloir.

## Où il sert

Pages : `monroe-piece.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page16` `.page16--champ`.

Éléments : `.page16__credit`, `.page16__image`, `.page16__image--main`, `.page16__image--overlay`, `.page16__images`.

Variantes : `.page16--champ`, `.page16__image--main`, `.page16__image--overlay`.

## Ce que fournit l’intégrateur

- 2 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__credit` : aussi dans PhotoFeature, PhotoCredited, PhotoPairGrid, EstradeFeature, ProjectDetailGallery
- `__image` : aussi dans SpaceStoryIntro, MixedRealityFeatures, GraphicNovelPlates, InstallationOpener, PhotoFeature, PhotoCredited, PhotoPairGrid, CompositionGallery …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
