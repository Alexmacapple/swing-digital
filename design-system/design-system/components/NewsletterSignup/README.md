# NewsletterSignup

Bloc « Restez informé » : texte, liste, bouton d'inscription et réservation désactivée.

## Où il sert

Pages : `reservations.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page58` `.page58--newsletter-seule`.

Éléments : `.page58__container`, `.page58__newsletter`, `.page58__newsletter-list`, `.page58__newsletter-text`, `.page58__newsletter-title`, `.page58__reserve-notice`, `.page58__subscribe-btn`.

Variantes : `.cta-reservation--disabled`, `.page58--newsletter-seule`.

## Ce que fournit l’intégrateur

- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__container` : aussi dans StudioIntro, ContactVideo, SpaceStoryIntro, SeriesIntroGrid, DevelopmentGrid, CorporateOffer, PressReview, ChapterCards …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
