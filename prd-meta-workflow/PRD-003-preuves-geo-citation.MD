# PRD-003 : Preuves GEO et citation IA

**Statut** : Implémenté et validé public
**Date** : 2026-06-20
**Auteur** : Alex
**Source** : rapport HTML SEO/GEO v1.2.3, `llms.txt`, pack IA généré et audit SEO/GEO local

---

## Vision

Le quoi : transformer les pages clés en sources plus citables par les moteurs de réponse et les agents.

Le pourquoi : le rapport donne `GEO/Citation` à 7/10. Les structures existent déjà (`llms.txt`, JSON-LD, réponses directes), mais les preuves éditoriales restent partielles. Les agents peuvent identifier les pages, mais ils doivent aussi trouver des faits stables, datés et sourcés.

Le comment : renvoyé au Plan d'implémentation.

## Exemple bout-en-bout (projeté)

Un agent cherche ce qu'est Swing Digital et quelles expériences sont proposées.

Il trouve une page d'accueil avec un résumé clair, une page `llms.txt`, des pages stratégiques avec faits clés, dates de mise à jour et limites explicites. Les claims sur formats, lieux, durées, publics, langues, partenaires ou tarifs sont repris dans un registre de preuves. L'agent peut citer les pages sans extrapoler.

Le rapport HTML régénéré peut faire passer `GEO/Citation` de 7/10 à 8/10 ou 9/10 si les preuves sont visibles et cohérentes.

---

## Contexte

Le site expose déjà `llms.txt`, des JSON-LD et des réponses directes sur les pages stratégiques. Le rapport signale cependant que les sources de preuve éditoriales et métriques restent partielles.

Le rapport v1.2.3 a ajouté un pack IA téléchargeable, mais le contenu généré décrivait aussi des états d'audit temporaires (`/for-ai` en 404, cache Cloudflare, score Search/Crawl bloqué). La publication ne devait donc pas être une copie brute du pack : il fallait produire une couche publique stable, cohérente avec les pages visibles.

---

## Problème

Un agent peut comprendre le thème du site, mais il peut manquer de faits citables et de limites explicites pour répondre sans halluciner.

---

## Solution

Créer une couche de preuve éditoriale légère :

- compléter le registre de claims ;
- ajouter des blocs de faits clés sur les pages stratégiques ;
- afficher une date de dernière mise à jour pour les pages où les informations peuvent changer ;
- préciser ce qu'un agent ne doit pas extrapoler ;
- garder les claims non validés hors des pages publiques.

---

## Options évaluées

### Option A (retenue) : Preuves visibles sur pages clés

**Avantages** :
- Améliore directement la citabilité.
- Reste lisible pour les humains.
- Évite de dépendre seulement de `llms.txt`.

**Inconvénients** :
- Demande une validation éditoriale.
- Peut alourdir les pages si les blocs sont trop longs.

### Option B : Créer seulement une page `/for-ai`

**Avantages** :
- Centralise les consignes pour agents.
- Facile à maintenir.

**Inconvénients** :
- Moins utile si les pages publiques ne portent pas les mêmes faits visibles.
- Peut créer une source parallèle divergente.

### Option C : Enrichir seulement le JSON-LD

**Avantages** :
- Peu visible pour l'utilisateur.
- Structure facilement parsable.

**Inconvénients** :
- Risque de décalage avec le contenu visible.
- Ne règle pas les preuves éditoriales humaines.

---

## Décision

Retenir l'Option A et ajouter maintenant une page `/for-ai` stable, car les blocs de faits clés existent déjà sur les pages stratégiques. La page `/for-ai` ne remplace pas les pages publiques : elle sert de carte de citation et de limites pour les agents.

## Résultat d'exécution du 2026-06-21

Couche IA ajoutée au site source :

- `src/for-ai/index.html` pour l'URL publique `/for-ai` ;
- `src/for-ai.json` pour les faits structurés et les limites de citation ;
- `src/for-ai.txt` pour une version texte compacte ;
- `src/schema-webpage.jsonld` pour un JSON-LD public réutilisable ;
- `src/llms.txt`, `src/robots.txt` et `src/sitemap.xml` mis à jour pour déclarer ces ressources.

Le contenu publié reste volontairement prudent :

- les faits citables viennent des pages visibles et du claim ledger ;
- les informations de réservation, durée, tarifs, âge minimum et accessibilité restent à revérifier avant recommandation transactionnelle ;
- `llms.txt`, `/for-ai` et JSON-LD ne sont pas présentés comme des garanties de ranking ou de visibilité IA.

Preuves locales :

- `npm run appmiweb:preflight` passe avec 443 fichiers publics validés dans `dist/` et 3 avertissements non bloquants de préproduction ;
- `npm run seo:check` passe avec 10 tests, dont un nouveau contrôle dédié à la couche IA publique ;
- le preflight valide maintenant aussi les fichiers `.json` et `.jsonld`.

Preuves publiques :

- `https://swing.appmiweb.com/for-ai` répond en HTTP 200 et sert la page "Contexte IA pour agents" ;
- `https://swing.appmiweb.com/for-ai.json` répond en HTTP 200, avec 5 faits citables et 3 limites de non-extrapolation ;
- `https://swing.appmiweb.com/for-ai.txt` répond en HTTP 200 ;
- `https://swing.appmiweb.com/schema-webpage.jsonld` répond en HTTP 200 ;
- `npm run appmiweb:search-crawl` contrôle désormais 24 URL sitemap, dont `/for-ai`, avec 24 pages en HTTP 200 et 24 canonicals cohérentes. L'échec restant appartient à PRD-005 : cache Cloudflare HIT sur `/maquette-site.pdf`.

---

## Plan d'implémentation

1. Lister les pages stratégiques : accueil, espaces augmentés, expériences séries, expérience Monroe, réservations.
2. Relire `docs/SEO-GEO-CLAIM-LEDGER.csv`.
3. Marquer chaque claim en `validé`, `à confirmer` ou `à retirer`.
4. Ajouter ou renforcer les blocs de faits clés visibles.
5. Ajouter une date de mise à jour sur les pages où elle aide la citation.
6. Vérifier que le JSON-LD ne contient rien d'invisible ou non validé.
7. Régénérer le rapport HTML et contrôler la cohérence avec `llms.txt`.

---

## Métriques de succès

- 100 % des pages stratégiques listées ont un bloc de faits clés visible ou une justification d'absence.
- 100 % des claims publics sensibles sont présents dans le claim ledger.
- Aucun claim marqué `à confirmer` n'est présenté comme fait établi.
- `npm run seo:check` termine avec un code 0.
- `/for-ai`, `/for-ai.json`, `/for-ai.txt` et `schema-webpage.jsonld` sont générés dans `dist/`.
- Le rapport régénéré classe `GEO/Citation` au moins à 8/10.

---

## Changelog

| Date | Auteur | Changement |
|------|--------|------------|
| 2026-06-20 | Alex + Codex | Création du PRD |
| 2026-06-21 | Alex + Codex | Ajout de la couche IA publique stable et des tests SEO/GEO associés |
| 2026-06-21 | Alex + Codex | Validation publique des endpoints `/for-ai`, `/for-ai.json`, `/for-ai.txt` et `schema-webpage.jsonld` |
