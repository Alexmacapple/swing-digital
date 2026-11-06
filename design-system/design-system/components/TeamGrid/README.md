# TeamGrid

Grille « Qui sommes-nous ? » : portrait, prénom, nom et rôle de chaque membre.

## Où il sert

Pages : `index.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.section` `.team`.

Éléments : `.team__container`, `.team__grid`, `.team__member`, `.team__member-firstname`, `.team__member-image`, `.team__member-info`, `.team__member-role`, `.team__subtitle`.

## Ce que fournit l’intégrateur

- 8 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
