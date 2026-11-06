# QuizPlay

Accès au quiz : lien d'action, note et images à observer.

## Où il sert

Pages : `monroe-quiz.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.quiz-jouer`.

Éléments : `.quiz-jouer__action`, `.quiz-jouer__caption`, `.quiz-jouer__figure`, `.quiz-jouer__figure--paysage`, `.quiz-jouer__gallery`, `.quiz-jouer__image`, `.quiz-jouer__lien`, `.quiz-jouer__lien-note`, `.quiz-jouer__subtitle`, `.quiz-jouer__text`, `.quiz-jouer__title`.

Variantes : `.quiz-jouer__figure--paysage`.

## Ce que fournit l’intégrateur

- 3 image(s) avec texte alternatif ou `alt=""` si décoratives
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
