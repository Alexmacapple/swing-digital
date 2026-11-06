# ChapterCards

Cartes numérotées vers les chapitres Monroe (fond sombre ou rose), réutilisées par la section page24.

## Où il sert

Pages : `experience-monroe.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page13`.

Éléments : `.page13__arrow`, `.page13__card`, `.page13__card--link`, `.page13__card-body`, `.page13__card-body--dark`, `.page13__card-body--pink`, `.page13__card-image`, `.page13__card-image-wrapper`, `.page13__card-number`, `.page13__card-subtitle`, `.page13__card-title`, `.page13__cards`, `.page13__container`, `.page13__header`.

Variantes : `.page13__card--link`, `.page13__card-body--dark`, `.page13__card-body--pink`.

## Ce que fournit l’intégrateur

- 5 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__container` : aussi dans StudioIntro, ContactVideo, SpaceStoryIntro, SeriesIntroGrid, DevelopmentGrid, CorporateOffer, PressReview, PlayOpener …
- `__header` : aussi dans StudioIntro, SpaceStoryIntro, MixedRealityFeatures, SeriesIntroGrid, CorporateOffer, InterviewPortraits, ExperiencesMosaic, AppProjectHero …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
