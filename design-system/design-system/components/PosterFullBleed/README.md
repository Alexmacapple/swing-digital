# PosterFullBleed

Affiche en fond plein cadre, variante --export.

## Où il sert

Pages : `marilyn.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page50` `.page50--export`.

Éléments : `.page50__background`, `.page50__background-image`.

Variantes : `.page50--export`.

## Ce que fournit l’intégrateur

- 1 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
