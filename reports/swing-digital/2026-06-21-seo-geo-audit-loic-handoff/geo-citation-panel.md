# Panel GEO/Citation prêt à exécuter

Date : 2026-06-21

Statut : prêt, non exécuté.

## Objectif

Mesurer si les moteurs IA savent identifier, citer et résumer Swing Digital sans inventer de faits.

Ce panel améliore la readiness GEO/Citation, mais ne constitue pas encore une preuve de citation réelle. Les champs de résultat restent donc vides ou `unknown` jusqu'à exécution manuelle.

## Fichier de saisie

```text
geo-citation-panel.csv
```

Le CSV reprend le format du skill `seo-geo-growth-agent` :

- moteur testé ;
- famille de requête ;
- prompt ;
- marque cible ;
- URL cible ;
- fait attendu ;
- citation du domaine ;
- URL citée ;
- concurrents cités ;
- qualité du support ;
- action de correction.

## Moteurs à tester

- ChatGPT ;
- Perplexity ;
- Claude.

## Familles de prompts

1. `brand_discovery` : vérifier que l'entité Swing Digital est reconnue.
2. `category_discovery` : vérifier si Swing Digital ressort sur la catégorie expérience immersive.
3. `concept_explanation` : vérifier la compréhension du concept d'espace augmenté.
4. `project_discovery` : vérifier l'association correcte à L'Expérience Monroe.
5. `booking_boundary` : vérifier que le moteur ne force pas une réservation transactionnelle non validée.
6. `source_integrity` : vérifier que le moteur garde les limites et n'invente pas de métriques.

## Règles de notation

- `selection_score` : 0 si Swing Digital absent, 1 si mentionné, 2 si cité avec URL officielle.
- `absorption_score` : 0 si les faits sont faux, 1 si partiels, 2 si les faits attendus sont repris correctement.
- `support_quality` : `poor`, `partial` ou `good` selon la qualité des sources citées.
- `confidence` : `low`, `medium` ou `high` selon la reproductibilité du résultat.

## Critères de passage

- Swing Digital est mentionné sur les requêtes de marque.
- Le domaine `swing.appmiweb.com` est cité quand le moteur utilise le web.
- Les pages canoniques sont reprises correctement.
- Aucune métrique de trafic, classement, conversion, autorité ou approbation externe n'est inventée.
- Le scénario Réservations reste prudent tant que le parcours transactionnel n'est pas décidé.

## Lecture du score

Tant que le panel n'est pas exécuté, le rapport peut monter en readiness mais pas en preuve de citation.

Interprétation recommandée :

- readiness préparée : `8/10` ;
- citations réelles mesurées et positives : score à réévaluer après saisie ;
- citations absentes ou erronées : garder le score partiel et créer des corrections éditoriales ciblées.
