# SiteHeader

En-tête noir fixe : logotype typographique entre deux barres, sélecteur de langue et menu principal à trois niveaux.

## Où il sert

Pages : `404.html`, `charlotte-henschel.html`, `dessine-moi-le-vent.html`, `espaces-augmentes.html`, `experience-monroe.html`, `experiences-series.html`, `films.html`, `index.html`, `marilyn.html`, `memory-box-vr.html`, `mentions-legales.html`, `monroe-composition.html`, `monroe-experiences.html`, `monroe-installation.html`, `monroe-interviews.html`, `monroe-photographie.html`, `monroe-piece.html`, `monroe-podcasts.html`, `monroe-quiz.html`, `monroe-roman-graphique.html`, `ni-vues-ni-connues.html`, `plan-du-site.html`, `reservations.html`, `serie-marilyn.html`, `the-party.html`, `toulouse-lautrec.html`, `voyage-autour-de-moi.html`, `xr-corporate.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.site-header`.

Éléments : `.site-header__inner`, `.site-header__logo`, `.site-header__logo-pipe`, `.site-header__logo-text`, `.site-nav__arrow`, `.site-nav__arrow-right`, `.site-nav__btn`, `.site-nav__burger`, `.site-nav__burger-icon`, `.site-nav__item`, `.site-nav__link`, `.site-nav__link--active`, `.site-nav__list`, `.site-nav__submenu`, `.site-nav__submenu--level3`, `.site-nav__submenu-item--has-children`, `.site-nav__submenu-link`, `.site-nav__submenu-row`, `.site-nav__submenu-separator`, `.site-nav__submenu-toggle`.

Variantes : `.site-nav__link--active`, `.site-nav__submenu--level3`, `.site-nav__submenu-item--has-children`.

## Ce que fournit l’intégrateur

- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Comportement

- menu burger mobile (`aria-expanded`)

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
