# ExportImage

Image d'export seule, variante --export.

## Où il sert

Pages : `marilyn.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page52` `.page52--export`.

Éléments : `.page52__export-image`.

Variantes : `.page52--export`.

## Ce que fournit l’intégrateur

- 1 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
