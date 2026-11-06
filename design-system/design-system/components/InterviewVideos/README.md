# InterviewVideos

Grille des interviews en vidéo : lecteur intégré, nom et crédit.

## Où il sert

Pages : `monroe-interviews.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.interviews-videos`.

Éléments : `.interviews-videos__credit`, `.interviews-videos__grid`, `.interviews-videos__item`, `.interviews-videos__name`, `.interviews-videos__player`, `.interviews-videos__title`.

## Ce que fournit l’intégrateur

- un lecteur intégré Vimeo ou YouTube (remplacé par un bloc noir dans l’aperçu)
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
