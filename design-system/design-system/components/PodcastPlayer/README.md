# PodcastPlayer

Lecteur de podcasts : liste d'épisodes, épisode actif, transcriptions dépliables.

## Où il sert

Pages : `monroe-podcasts.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page33`.

Éléments : `.page25__category-arrow`, `.page33__category`, `.page33__category-letter`, `.page33__category-title`, `.page33__episode`, `.page33__episode--active`, `.page33__episode-btn`, `.page33__episode-info`, `.page33__episode-meta`, `.page33__episode-thumb`, `.page33__episode-title`, `.page33__episodes`, `.page33__layout`, `.page33__left`, `.page33__photo`, `.page33__player`, `.page33__playlist-iframe`, `.page33__podcast`, `.page33__right`.

Variantes : `.page33__episode--active`.

## Ce que fournit l’intégrateur

- 6 image(s) avec texte alternatif ou `alt=""` si décoratives
- un lecteur intégré Vimeo ou YouTube (remplacé par un bloc noir dans l’aperçu)
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Comportement

- transcription dépliable (`.js-disclosure-label`, `js/main.js`)
- changement d'épisode

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__category` : aussi dans PhotoGallery, CompositionGallery, InstallationComposer, InterviewSplit, QuizOpener, QuoteSplit, ProjectPosterHeader
- `__category-letter` : aussi dans PhotoGallery, CompositionGallery, InstallationComposer, InterviewPortraits, InterviewSplit, ExperiencesMosaic, QuizOpener
- `__category-title` : aussi dans PhotoGallery, CompositionGallery, InterviewPortraits, InterviewSplit, ExperiencesMosaic
- `__left` : aussi dans StudioIntro, PlayOpener, GraphicNovelOpener, InterviewSplit, EstradeFeature, QuizOpener, SeriesSelection, QuoteSplit …
- `__photo` : aussi dans CorporateOffer, InterviewPortraits, InterviewSplit, ExperiencesMosaic, EstradeFeature, SeriesSelection, AwardsDetail, QuoteSplit …
- `__right` : aussi dans StudioIntro, PlayOpener, GraphicNovelOpener, InterviewSplit, EstradeFeature, QuizOpener, SeriesSelection, QuoteSplit …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
