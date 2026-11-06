# PortraitGrid

Grille de portraits avec description et accroche.

## Où il sert

Pages : `ni-vues-ni-connues.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page49`.

Éléments : `.page49__description`, `.page49__portrait`, `.page49__portrait-image`, `.page49__portraits`, `.page49__tagline`, `.page49__text`.

## Ce que fournit l’intégrateur

- 5 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__description` : aussi dans SeriesSelection, AwardsDetail, QuoteSplit, ProjectPosterHeader
- `__text` : aussi dans CorporateOffer, AwardsDetail, ProjectDetailGallery, PhotoMosaic

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
