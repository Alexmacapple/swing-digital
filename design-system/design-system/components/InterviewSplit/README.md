# InterviewSplit

Interview en deux colonnes : catégorie et légende à gauche, portrait à droite.

## Où il sert

Pages : `monroe-interviews.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page35`.

Éléments : `.page25__category-arrow`, `.page35__caption`, `.page35__caption-label`, `.page35__caption-name`, `.page35__category`, `.page35__category-letter`, `.page35__category-title`, `.page35__left`, `.page35__photo`, `.page35__right`.

## Ce que fournit l’intégrateur

- 1 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Motifs partagés à extraire

Ces éléments existent sous un autre préfixe de page ; ils sont candidats à un composant commun :

- `__category` : aussi dans PhotoGallery, CompositionGallery, InstallationComposer, PodcastPlayer, QuizOpener, QuoteSplit, ProjectPosterHeader
- `__category-letter` : aussi dans PhotoGallery, CompositionGallery, InstallationComposer, PodcastPlayer, InterviewPortraits, ExperiencesMosaic, QuizOpener
- `__category-title` : aussi dans PhotoGallery, CompositionGallery, PodcastPlayer, InterviewPortraits, ExperiencesMosaic
- `__left` : aussi dans StudioIntro, PlayOpener, GraphicNovelOpener, PodcastPlayer, EstradeFeature, QuizOpener, SeriesSelection, QuoteSplit …
- `__photo` : aussi dans CorporateOffer, PodcastPlayer, InterviewPortraits, ExperiencesMosaic, EstradeFeature, SeriesSelection, AwardsDetail, QuoteSplit …
- `__right` : aussi dans StudioIntro, PlayOpener, GraphicNovelOpener, PodcastPlayer, EstradeFeature, QuizOpener, SeriesSelection, QuoteSplit …

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
