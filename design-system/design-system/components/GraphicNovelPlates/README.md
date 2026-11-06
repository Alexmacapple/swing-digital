# GraphicNovelPlates

Grille des planches du roman graphique.

## Où il sert

Pages : `monroe-roman-graphique.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page21`.

Éléments : `.page21__grid`, `.page21__image`.

## Ce que fournit l’intégrateur

- 2 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__grid` : aussi dans SeriesIntroGrid, DevelopmentGrid, PhotoPairGrid
- `__image` : aussi dans SpaceStoryIntro, MixedRealityFeatures, PlayStillsPair, InstallationOpener, PhotoFeature, PhotoCredited, PhotoPairGrid, CompositionGallery …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
