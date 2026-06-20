# Plan de mesure SEO/GEO préproduction

Date : 2026-06-21
Statut : prêt localement sans tag de production

## Objectif

Préparer la mesure SEO/GEO sans polluer les données du futur domaine final.

Ce plan transforme le score `Measurement` du rapport en état traçable : les événements sont nommés, les sélecteurs existent dans le HTML, les outils à activer sont listés, mais aucune métrique de trafic, de rang, de CTR, de citation IA ou de conversion n'est déclarée comme observée.

## Source de vérité

```text
docs/SEO-GEO-MEASUREMENT-MATRIX.csv
```

La matrice définit les événements prévus, leurs pages, leurs sélecteurs, leur statut préproduction et la condition d'activation production.

## Événements préparés

| Événement | Rôle | Statut |
|---|---|---|
| `page_view_home` | Vue de page accueil | Documenté |
| `click_hero_experiences` | Clic du CTA principal accueil | Traçable |
| `click_contact_home` | Intention de contact depuis l'accueil | Traçable |
| `click_social_instagram` | Sortie vers un réseau social | Traçable |
| `open_mobile_menu` | Ouverture du menu mobile | Traçable |
| `click_reservation_disabled` | Clic sur réservation désactivée | Documenté comme non-conversion |
| `click_newsletter_disabled` | Clic sur newsletter désactivée | Documenté comme non-conversion |
| `click_reservation_faq` | Consultation des questions de réservation | Traçable |
| `click_private_visit_contact` | Contact pour groupe ou visite privée | Traçable |

## Règles préproduction

- Ne pas installer de tag GA4 ou GTM de production sur `https://swing.appmiweb.com` sans décision explicite.
- Ne pas envoyer les événements préproduction dans une propriété destinée au domaine final.
- Ne pas déclarer de clics, impressions, CTR, positions, citations IA ou conversions sans export observé.
- Garder les boutons désactivés de réservation et newsletter hors des conversions tant que les parcours ne sont pas actifs.
- Utiliser la préproduction pour valider les sélecteurs, le nommage et la checklist, pas la performance.

## Activation au domaine final

Quand le domaine final HTTPS est confirmé :

1. Choisir l'outil : GA4 direct, GTM ou alternative validée.
2. Créer ou vérifier la propriété du domaine final.
3. Installer le tag sur toutes les pages publiques.
4. Vérifier `page_view` en temps réel.
5. Créer les événements de la matrice avec les mêmes noms.
6. Tester les événements dans le mode debug.
7. Marquer comme conversion uniquement les parcours actifs : contact, réservation ouverte, newsletter active.
8. Créer un regroupement de sources IA pour les référents assistants et moteurs de réponse.
9. Documenter les métriques indisponibles comme `unknown` jusqu'à observation.

## Mesure IA

La visibilité IA ne doit pas être déduite de la présence de `/llms.txt` ou `/for-ai`.

À mesurer séparément :

- citations observées dans ChatGPT, Perplexity, Claude ou autres moteurs de réponse ;
- sessions référentes depuis assistants ou moteurs IA dans l'analytics ;
- hits de crawlers IA dans les logs serveur quand disponibles ;
- pages citées et requêtes de grounding testées manuellement.

## Critères de validation PRD-004

- La matrice contient au moins 5 événements mesurables.
- Chaque événement a un nom, une page, un sélecteur, un déclencheur et un statut.
- Chaque sélecteur pointe vers au moins un élément HTML réel.
- Les métriques restent `unknown` tant qu'aucun outil propriétaire n'est branché.
- `npm run seo:check` passe.

## Limites

Ce plan ne remplace pas `PRD-001`. La mesure complète reste à activer au go-live avec le domaine final, les accès GSC, GA4 ou GTM, Bing Webmaster Tools et les éventuels logs serveur.
