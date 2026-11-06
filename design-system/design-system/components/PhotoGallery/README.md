# PhotoGallery

Galerie photographique : lettre de catégorie, panoramique créditée, figures légendées.

## Où il sert

Pages : `monroe-photographie.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page25`.

Éléments : `.page25__bottom`, `.page25__category`, `.page25__category-arrow`, `.page25__category-letter`, `.page25__category-title`, `.page25__gallery`, `.page25__gallery-caption`, `.page25__gallery-figure`, `.page25__gallery-image`, `.page25__panoramic`, `.page25__panoramic-credit`, `.page25__panoramic-image`.

## Ce que fournit l’intégrateur

- 3 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__category` : aussi dans CompositionGallery, InstallationComposer, PodcastPlayer, InterviewSplit, QuizOpener, QuoteSplit, ProjectPosterHeader
- `__category-letter` : aussi dans CompositionGallery, InstallationComposer, PodcastPlayer, InterviewPortraits, InterviewSplit, ExperiencesMosaic, QuizOpener
- `__category-title` : aussi dans CompositionGallery, PodcastPlayer, InterviewPortraits, InterviewSplit, ExperiencesMosaic
- `__gallery` : aussi dans StudioIntro, CompositionGallery, ExperiencesMosaic, ProjectDetailGallery

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
