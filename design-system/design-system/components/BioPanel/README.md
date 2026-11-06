# BioPanel

Panneau biographique, variante --solo sans tableaux.

## Où il sert

Pages : `charlotte-henschel.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page56`.

Éléments : `.page56__bio`, `.page56__bio--solo`, `.page56__content`, `.page56__content--without-paintings`, `.page56__header`, `.page56__title`.

Variantes : `.page56__bio--solo`, `.page56__content--without-paintings`.

## Ce que fournit l’intégrateur

- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__header` : aussi dans StudioIntro, SpaceStoryIntro, MixedRealityFeatures, SeriesIntroGrid, CorporateOffer, ChapterCards, InterviewPortraits, ExperiencesMosaic …
- `__title` : aussi dans ContactVideo, SpaceStoryIntro, MixedRealityFeatures, PlayOpener, GraphicNovelOpener, InstallationOpener, PhotoCredited, PhotoPairGrid …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
