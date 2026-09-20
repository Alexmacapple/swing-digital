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

Le vocabulaire `booking`, les formes britanniques signalées par le glossaire,
les titres `legal notice` et `sitemap`, ainsi que les libellés de transcription
ont été alignés dans ce lot. Les noms d’institutions et de lieux, la relecture
à l’écoute et le choix de `x-default` restent séparés : ils demandent une
décision éditoriale ou une validation humaine.

## Preuves locales

- `npm run build:prod` : 500 fichiers copiés, 5 artefacts exclus ;
- `npm run seo:check` : 4/4 ;
- `tests/en-site.spec.js --project=desktop-1920` : 7/7 ;
- `tests/prd011-menu-xr-films.spec.js --project=desktop-1920` : 7/7 ;
- vérification de la revue sur `dist` : 29/29 routes HTTP 200, `lang="en"`,
  `translate="no"` et sélecteur FR présents ;
- contrôles complémentaires de la revue : `booking` 0 résidu, `hreflang` 0
  anomalie, 0 lien interne en échec sur 230 URL distinctes ;
- `git status` propre et `main` alignée sur `origin/main`.

La suite complète Playwright a été exécutée mais termine avec le code 1 : 527
tests passent et 972 sont ignorés, tandis que des contrôles visuels et
responsive historiques échouent. Ce résultat ne permet pas de déclarer #54
terminée.

## Restes avant clôture et publication

- revue éditoriale de Stéphanie, notamment pour le vocabulaire artistique et
  juridique ;
- arbitrage des noms d’institutions et de lieux, ainsi que de la cible
  `x-default` ;
- relecture à l’écoute des transcriptions anglaises et désignation de la
  personne responsable de cette validation (`#52`) ;
- vérification sur OVH du routage des erreurs sous `/en/` vers `en/404.html` ;
- publication de la branche `production` puis contrôle public du site EN.

La traduction fonctionne en local et est disponible sur `main`. Elle ne doit
pas encore être annoncée comme validée ni publiée sur `production` tant que la
relecture éditoriale/audio, les arbitrages de vocabulaire et la vérification
OVH ne sont pas terminés.
