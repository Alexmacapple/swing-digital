# FullImage

Image seule en pleine page, variante --entiere pour l'image non recadrée.

## Où il sert

Pages : `espaces-augmentes.html`, `monroe-piece.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.full-image-page` `.full-image-page--entiere`.

Éléments : `.full-image-page__cadre`, `.full-image-page__image`.

Variantes : `.full-image-page--entiere`.

## Ce que fournit l’intégrateur

- 1 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
