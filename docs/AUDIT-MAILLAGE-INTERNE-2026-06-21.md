# Audit du maillage interne

Date : 2026-06-21
Projet : Swing Digital
Préproduction : https://swing.appmiweb.com

## Synthèse

Le contrôle a porté sur les liens internes `<a href>` des 25 pages HTML top-level présentes dans `src/`.

Résultat :

- 973 liens internes extraits.
- 945 liens internes validés.
- 0 lien cassé détecté.
- 0 ancre interne absente détectée.
- 28 occurrences à confirmer éditorialement : les libellés `XR Memory Box` / `Memory Box VR` pointent vers `xr-corporate.html`. La page existe, donc ce n'est pas une erreur technique, mais le nom de la cible peut prêter à confusion.

Les liens `mailto:`, les liens sociaux, les sites partenaires et les URL externes ne sont pas inclus dans ce contrôle de maillage interne.

## Point à confirmer avec Stéphanie

| Page source | Intitulé du lien | Lien cible | Statut | Commentaire |
|---|---|---|---|---|
| Navigation globale sur les 25 pages HTML | 4. XR Memory Box | `xr-corporate.html` | À confirmer | Cible techniquement valide, mais le nom de page `xr-corporate.html` ne reflète pas directement `Memory Box`. |
| `index.html` | Voir le projet Memory Box VR | `xr-corporate.html` | À confirmer | Cible valide. À valider éditorialement : s'agit-il bien de la même offre/projet que XR Corporate ? |
| `experience-monroe.html` | XR Memory Box | `xr-corporate.html` | À confirmer | Cible valide. Le libellé parle d'une brique Monroe, la page cible est nommée corporate. |
| `experience-monroe.html` | 4 XR Memory Box (15 MN) | `xr-corporate.html` | À confirmer | Cible valide. Même ambiguïté éditoriale. |

Recommandation pragmatique :

1. Court terme : ne pas corriger automatiquement, car le lien fonctionne et la destination semble volontaire.
2. Moyen terme : créer une page dédiée `memory-box-vr.html` ou `xr-memory-box.html` si Memory Box doit être présenté comme un projet autonome.
3. Alternative légère : conserver `xr-corporate.html`, mais harmoniser les libellés pour clarifier que Memory Box est une déclinaison ou une preuve d'usage XR Corporate.

## Liens principaux validés

| Page ou zone source | Intitulé du lien | Lien cible | Statut |
|---|---|---|---|
| Navigation globale | Accueil | `index.html` | Bon |
| Navigation globale | XR | `experiences-series.html` | Bon |
| Navigation globale | Tous les projets XR | `experiences-series.html` | Bon |
| Navigation globale | Espace augmenté | `espaces-augmentes.html` | Bon |
| Navigation globale | Films | `films.html` | Bon |
| Navigation globale | Réservation | `reservations.html` | Bon |
| Navigation globale | Plan du site | `plan-du-site.html` | Bon |
| Navigation globale | Mentions légales | `mentions-legales.html` | Bon |
| Footer global | Équipe | `index.html#page-2` | Bon, ancre présente |
| Toutes les pages | Aller au contenu principal | `#main-content` | Bon, ancre présente |
| `index.html` | Qui sommes nous ? | `#page-2` | Bon, ancre présente |
| `index.html` | Ils nous ont fait confiance | `#page-8` | Bon, ancre présente |
| `reservations.html` | Questions fréquentes | `#faq-reservations` | Bon, ancre présente |

## Pages projets validées

| Page ou zone source | Intitulé du lien | Lien cible | Statut |
|---|---|---|---|
| Navigation XR et contenus | L'Expérience Monroe | `experience-monroe.html` | Bon |
| Navigation XR et contenus | Voyage autour de moi | `voyage-autour-de-moi.html` | Bon |
| Navigation XR et contenus | Dessine-moi le vent | `dessine-moi-le-vent.html` | Bon |
| Navigation XR et contenus | Marilyn | `marilyn.html` | Bon |
| Navigation XR et contenus | Toulouse-Lautrec | `toulouse-lautrec.html` | Bon |
| Navigation XR et contenus | Charlotte Henschel | `charlotte-henschel.html` | Bon |
| Navigation XR et contenus | XR Corporate | `xr-corporate.html` | Bon |
| Page Films et maillage home | Ni vues ni connues | `ni-vues-ni-connues.html` | Bon |
| `index.html` | Voir le projet L'Expérience Monroe | `experience-monroe.html` | Bon |
| `index.html` | Voir le projet Voyage autour de moi | `voyage-autour-de-moi.html` | Bon |
| `index.html` | Voir le projet Dessine-moi le vent | `dessine-moi-le-vent.html` | Bon |

## Sous-pages Monroe validées

| Page ou zone source | Intitulé du lien | Lien cible | Statut |
|---|---|---|---|
| Navigation Monroe et plan du site | 1. Pièce My Story | `monroe-piece.html` | Bon |
| Navigation Monroe et plan du site | 2. Roman Graphique | `monroe-roman-graphique.html` | Bon |
| Navigation Monroe et plan du site | 3. Installation | `monroe-installation.html` | Bon |
| Navigation Monroe et plan du site | 5. Série Marilyn | `marilyn.html` | Bon |
| Navigation Monroe et plan du site | A. Photographie | `monroe-photographie.html` | Bon |
| Navigation Monroe et plan du site | B. Composition électroacoustique | `monroe-composition.html` | Bon |
| Navigation Monroe et plan du site | C. Podcasts | `monroe-podcasts.html` | Bon |
| Navigation Monroe et plan du site | D. Interviews | `monroe-interviews.html` | Bon |
| Navigation Monroe et plan du site | E. Expériences interactives | `monroe-experiences.html` | Bon |
| Navigation Monroe et plan du site | F. Le Quiz Marilyn | `monroe-quiz.html` | Bon |

## Pages contrôlées

| Page | Statut |
|---|---|
| `404.html` | Bon, aucun lien interne cassé |
| `charlotte-henschel.html` | Bon, aucun lien interne cassé |
| `dessine-moi-le-vent.html` | Bon, aucun lien interne cassé |
| `espaces-augmentes.html` | Bon, aucun lien interne cassé |
| `experience-monroe.html` | Bon techniquement, avec liens Memory Box à confirmer éditorialement |
| `experiences-series.html` | Bon, aucun lien interne cassé |
| `films.html` | Bon, aucun lien interne cassé |
| `index.html` | Bon techniquement, avec lien Memory Box à confirmer éditorialement |
| `marilyn.html` | Bon, aucun lien interne cassé |
| `mentions-legales.html` | Bon, aucun lien interne cassé |
| `monroe-composition.html` | Bon, aucun lien interne cassé |
| `monroe-experiences.html` | Bon, aucun lien interne cassé |
| `monroe-installation.html` | Bon, aucun lien interne cassé |
| `monroe-interviews.html` | Bon, aucun lien interne cassé |
| `monroe-photographie.html` | Bon, aucun lien interne cassé |
| `monroe-piece.html` | Bon, aucun lien interne cassé |
| `monroe-podcasts.html` | Bon, aucun lien interne cassé |
| `monroe-quiz.html` | Bon, aucun lien interne cassé |
| `monroe-roman-graphique.html` | Bon, aucun lien interne cassé |
| `ni-vues-ni-connues.html` | Bon, aucun lien interne cassé |
| `plan-du-site.html` | Bon, aucun lien interne cassé |
| `reservations.html` | Bon, aucun lien interne cassé |
| `toulouse-lautrec.html` | Bon, aucun lien interne cassé |
| `voyage-autour-de-moi.html` | Bon, aucun lien interne cassé |
| `xr-corporate.html` | Bon, aucun lien interne cassé |

## Conclusion

Le maillage interne est techniquement sain à l'instant T : les fichiers cibles existent et les ancres internes auditées sont présentes. Aucun correctif de lien n'a été appliqué.

Le seul arbitrage restant est éditorial : confirmer si `XR Memory Box` / `Memory Box VR` doit rester rattaché à `xr-corporate.html` ou être isolé dans une page dédiée plus explicite.
