# VideoSection

Section vidéo plein cadre avec boutons lecture et son, réutilisée sur huit pages.

## Où il sert

Pages : `dessine-moi-le-vent.html`, `experience-monroe.html`, `monroe-experiences.html`, `monroe-installation.html`, `monroe-piece.html`, `monroe-roman-graphique.html`, `the-party.html`, `voyage-autour-de-moi.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.page11`.

Éléments : `.page11__controls`, `.page11__play-btn`, `.page11__play-icon`, `.page11__play-icon--paused`, `.page11__play-icon--playing`, `.page11__sound-btn`, `.page11__sound-icon`, `.page11__sound-icon--off`, `.page11__sound-icon--on`, `.page11__video-wrapper`.

Variantes : `.page11__play-icon--paused`, `.page11__play-icon--playing`, `.page11__sound-icon--off`, `.page11__sound-icon--on`.

## Ce que fournit l’intégrateur

- un lecteur intégré Vimeo ou YouTube (remplacé par un bloc noir dans l’aperçu)
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Comportement

- boutons lecture/pause pilotés par `js/main.js`
- bouton son pilotés par `js/main.js`

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
