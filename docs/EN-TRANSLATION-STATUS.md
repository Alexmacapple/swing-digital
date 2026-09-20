# Version EN — état de traduction

## État au 2026-09-21

L’implémentation des issues #47 à #53 est présente dans `src/en/` et sur
`origin/main`. Le lot couvre l’architecture `/en/`,
le sélecteur FR/EN, les 29 routes, les textes visibles, les attributs
accessibles, les données structurées, les ressources IA et les transcriptions
anglaises embarquées.

Le choix éditorial validé pour cette passe est l’anglais britannique :
`Theatre` est retenu pour « théâtre » et les métadonnées utilisent désormais
`en-GB`. Les titres harmonisés comprennent `The Monroe Experience`, `My Story
play` et `Draw Me the Wind`.

## Correction issue de la revue EN

La passe issue du rapport de revue a corrigé les fragments non ambigus : titres
résiduels, dates, sigles `AI` et `MR`, alternatives textuelles, contresens,
espaces typographiques, caractères invisibles, libellés « Skip links » et
format de durée. Les 29 pages françaises portent maintenant les alternates
`en`, `fr` et `x-default` réciproques ; la 404 EN expose aussi son URL Open
Graph et sa locale.

Les noms d’institutions et de lieux, les variantes de titres de transcriptions,
le vocabulaire `booking` dans les pages restantes et la relecture à l’écoute
restent séparés de cette correction : ils demandent la décision éditoriale et
la validation audio prévues par le rapport.

## Preuves locales

- `npm run build:prod` : 500 fichiers copiés, 5 artefacts exclus ;
- `npm run seo:check` : 4/4 ;
- `tests/en-site.spec.js --project=desktop-1920` : 7/7 ;
- `tests/prd011-menu-xr-films.spec.js --project=desktop-1920` : 7/7 ;
- vérification de la revue sur `dist` : 29/29 routes HTTP 200, `lang="en"`,
  `translate="no"` et sélecteur FR présents ;
- `git status` propre et `main` alignée sur `origin/main`.

La suite complète Playwright a été exécutée mais termine avec le code 1 : 527
tests passent et 972 sont ignorés, tandis que des contrôles visuels et
responsive historiques échouent. Ce résultat ne permet pas de déclarer #54
terminée.

## Restes avant clôture et publication

- revue éditoriale de Stéphanie, notamment pour le vocabulaire artistique et
  juridique ;
- relecture à l’écoute des transcriptions anglaises et désignation de la
  personne responsable de cette validation (`#52`) ;
- vérification sur OVH du routage des erreurs sous `/en/` vers `en/404.html` ;
- publication de la branche `production` puis contrôle public du site EN.

La traduction fonctionne en local et est disponible sur `main`. Elle ne doit
pas encore être annoncée comme validée ni publiée sur `production` tant que la
relecture éditoriale/audio, les arbitrages de vocabulaire et la vérification
OVH ne sont pas terminés.
