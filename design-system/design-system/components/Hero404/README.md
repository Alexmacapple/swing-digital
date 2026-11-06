# Hero404

Variante du héros vidéo pour la page introuvable.

## Où il sert

Pages : `404.html`. La version anglaise (`en/`) reprend la même structure.

## Structure

Racine : `.hero-page1` `.page-404-hero`.

Éléments : `.hero-page1__background`, `.hero-page1__bottom-left`, `.hero-page1__bottom-right`, `.hero-page1__cta`, `.hero-page1__follow-label`, `.hero-page1__hashtags`, `.hero-page1__partners`, `.hero-page1__play-btn`, `.hero-page1__play-icon`, `.hero-page1__play-icon--paused`, `.hero-page1__play-icon--playing`, `.hero-page1__sound-btn`, `.hero-page1__sound-icon`, `.hero-page1__sound-icon--off`, `.hero-page1__sound-icon--on`, `.hero-page1__summary`, `.hero-page1__title-group`, `.hero-page1__trust`, `.hero-page1__video`, `.page-404-hero__actions`.

Variantes : `.hero-page1__play-icon--paused`, `.hero-page1__play-icon--playing`, `.hero-page1__sound-icon--off`, `.hero-page1__sound-icon--on`.

## Ce que fournit l’intégrateur

- 1 image(s) avec texte alternatif ou `alt=""` si décoratives
- une vidéo MP4 et son image poster (non chargée dans l’aperçu)
- les textes : titres, paragraphes, crédits, dans la langue de la page (`lang`)

## Comportement

- boutons lecture/pause pilotés par `js/main.js`
- bouton son pilotés par `js/main.js`

## Règles

- Titres en `type-title` ou `type-title-xl`, graisse 900 ; corps en `type-body`.
- Texte `paper` seulement sur `ground-pink`, `ground-red`, `ground-navy`, `ink` ou une image voilée par `overlay-45` au minimum.
- Crédits photo en `type-credit`, jamais en `decor-gold` sur fond clair.
