# MediaTranscript

Transcription dépliable d'un média : bouton, panneau et sections titrées.

## Où il sert

Pages : `dessine-moi-le-vent.html`, `experience-monroe.html`, `index.html`, `monroe-experiences.html`, `monroe-installation.html`, `monroe-interviews.html`, `monroe-piece.html`, `monroe-podcasts.html`, `monroe-roman-graphique.html`, `voyage-autour-de-moi.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.media-transcript`.

## Ce que fournit l’intégrateur

- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Comportement

- transcription dépliable (`.js-disclosure-label`, `js/main.js`)

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
