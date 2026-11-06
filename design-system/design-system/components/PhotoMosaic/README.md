# PhotoMosaic

Mosaïque photo avec un grand visuel et un paragraphe.

## Où il sert

Pages : `toulouse-lautrec.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page54`.

Éléments : `.page54__mosaic`, `.page54__paragraph`, `.page54__photo`, `.page54__photo--large`, `.page54__photo-image`, `.page54__text`.

Variantes : `.page54__photo--large`.

## Ce que fournit l’intégrateur

- 6 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__photo` : aussi dans CorporateOffer, PodcastPlayer, InterviewPortraits, InterviewSplit, ExperiencesMosaic, EstradeFeature, SeriesSelection, AwardsDetail …
- `__text` : aussi dans CorporateOffer, AwardsDetail, ProjectDetailGallery, PortraitGrid

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
