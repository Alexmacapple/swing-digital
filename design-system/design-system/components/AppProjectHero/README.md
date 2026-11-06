# AppProjectHero

Héros d'application : titre, visuel, badges App Store et Google Play, lien Vimeo.

## Où il sert

Pages : `dessine-moi-le-vent.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page46`.

Éléments : `.page46__brand`, `.page46__header`, `.page46__stores`, `.page46__stores-image`, `.page46__title`, `.page46__title-group`, `.page46__vimeo-link`, `.page46__visual`, `.page46__visual-image`.

## Ce que fournit l’intégrateur

- 2 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__header` : aussi dans StudioIntro, SpaceStoryIntro, MixedRealityFeatures, SeriesIntroGrid, CorporateOffer, ChapterCards, InterviewPortraits, ExperiencesMosaic …
- `__title` : aussi dans ContactVideo, SpaceStoryIntro, MixedRealityFeatures, PlayOpener, GraphicNovelOpener, InstallationOpener, PhotoCredited, PhotoPairGrid …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
