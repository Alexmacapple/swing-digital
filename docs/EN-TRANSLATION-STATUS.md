# Version EN — état de traduction

## État au 2026-09-21

L’implémentation des issues #47 à #53 est présente dans `src/en/` et dans le
commit `f6de318` poussé sur `origin/main`. Le lot couvre l’architecture `/en/`,
le sélecteur FR/EN, les 29 routes, les textes visibles, les attributs
accessibles, les données structurées, les ressources IA et les transcriptions
anglaises embarquées.

Le choix éditorial validé pour cette passe est l’anglais britannique :
`Theatre` est retenu pour « théâtre ». Les titres harmonisés comprennent
`The Monroe Experience`, `My Story play` et `Draw Me the Wind`.

## Preuves locales

- `npm run build:prod` : 500 fichiers copiés, 5 artefacts exclus ;
- `npm run seo:check` : 4/4 ;
- `tests/en-site.spec.js --project=desktop-1920` : 6/6 ;
- `tests/prd011-menu-xr-films.spec.js --project=desktop-1920` : 7/7 ;
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

La traduction fonctionne en local et est disponible sur `main`, mais elle n’est
pas encore publiée sur la branche `production` ni annoncée comme validée.
