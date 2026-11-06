# MixedRealityFeatures

Trois arguments titrés (réalité mixte, ancrage, espace) à côté d'une image.

## Où il sert

Pages : `espaces-augmentes.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page6`.

Éléments : `.page6__header`, `.page6__image`, `.page6__image-wrapper`, `.page6__main`, `.page6__section`, `.page6__section-text`, `.page6__section-title`, `.page6__text-wrapper`, `.page6__title`.

## Ce que fournit l’intégrateur

- 1 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__header` : aussi dans StudioIntro, SpaceStoryIntro, SeriesIntroGrid, CorporateOffer, ChapterCards, InterviewPortraits, ExperiencesMosaic, AppProjectHero …
- `__image` : aussi dans SpaceStoryIntro, PlayStillsPair, GraphicNovelPlates, InstallationOpener, PhotoFeature, PhotoCredited, PhotoPairGrid, CompositionGallery …
- `__title` : aussi dans ContactVideo, SpaceStoryIntro, PlayOpener, GraphicNovelOpener, InstallationOpener, PhotoCredited, PhotoPairGrid, EstradeFeature …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
