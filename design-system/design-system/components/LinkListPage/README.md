# LinkListPage

Page liste : titre, chapeau et liste de liens (Films, Plan du site, Mentions légales, Memory Box, The Party).

## Où il sert

Pages : `films.html`, `memory-box-vr.html`, `mentions-legales.html`, `plan-du-site.html`, `the-party.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.sitemap-page`.

Éléments : `.sitemap-page__container`, `.sitemap-page__list`.

## Ce que fournit l’intégrateur

- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
