# PRD-003 : Preuves GEO et citation IA

**Statut** : Brouillon
**Date** : 2026-06-20
**Auteur** : Alex
**Source** : rapport HTML SEO/GEO v1.2.1, `llms.txt` et audit SEO/GEO local

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

Retenir l'Option A, avec éventuellement une page `/for-ai` plus tard si les faits visibles sont stabilisés.

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
- Le rapport régénéré classe `GEO/Citation` au moins à 8/10.

---

## Changelog

| Date | Auteur | Changement |
|------|--------|------------|
| 2026-06-20 | Alex + Codex | Création du PRD |
