# AwardsDetail

Détail du projet : panoramique, description, étiquettes et prix.

## Où il sert

Pages : `voyage-autour-de-moi.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page44`.

Éléments : `.page44__awards`, `.page44__bottom`, `.page44__description`, `.page44__panoramic`, `.page44__panoramic-image`, `.page44__photo`, `.page44__photo-image`, `.page44__tags`, `.page44__text`, `.page44__title`.

## Ce que fournit l’intégrateur

- 2 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__description` : aussi dans SeriesSelection, PortraitGrid, QuoteSplit, ProjectPosterHeader
- `__photo` : aussi dans CorporateOffer, PodcastPlayer, InterviewPortraits, InterviewSplit, ExperiencesMosaic, EstradeFeature, SeriesSelection, QuoteSplit …
- `__text` : aussi dans CorporateOffer, ProjectDetailGallery, PortraitGrid, PhotoMosaic
- `__title` : aussi dans ContactVideo, SpaceStoryIntro, MixedRealityFeatures, PlayOpener, GraphicNovelOpener, InstallationOpener, PhotoCredited, PhotoPairGrid …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
