# PRD-001 : Mise en production SEO/GEO et mesure

**Statut** : Brouillon
**Date** : 2026-06-20
**Auteur** : Alex
**Source** : audit SEO/GEO local et préproduction Appmiweb

---

## Vision

Le quoi : ce PRD propose de traiter la mesure SEO/GEO, l'optimisation LCP de l'accueil et la politique crawlers IA comme un lot de mise en production, activé seulement quand le domaine final et le scénario de lancement sont décidés.

Le pourquoi : ces trois chantiers dépendent de signaux de production. GSC, GA4, Bing Webmaster Tools, les sources IA et les logs crawlers ne produisent des données utiles que sur un domaine public stable. Le LCP doit être optimisé sur le vrai rendu publié. La politique crawlers IA engage la visibilité et l'usage futur du contenu, donc elle doit être une décision propriétaire, pas un réglage implicite de préproduction.

Le comment : renvoyé au Plan d'implémentation.

## Exemple bout-en-bout (projeté)

Swing Digital décide de lancer le domaine final `https://example.fr`.

L'équipe renseigne l'hébergeur légal, tranche le scénario Réservations et confirme que la préproduction Appmiweb ne doit plus être l'URL canonique. Le script `seo:set-base` bascule les canonicals, Open Graph, sitemap, robots et `llms.txt` vers le domaine final. Le build `dist/` est publié.

Le même jour, la propriété Google Search Console est vérifiée, le sitemap final est soumis, la propriété Bing Webmaster Tools est créée ou importée depuis GSC, puis le sitemap est soumis à Bing. La propriété GA4 reçoit son tag sur toutes les pages publiques. Les clics contact, réservation et newsletter deviennent des événements suivis.

La page d'accueil est retestée avec Lighthouse en production. Si le LCP reste supérieur à 2,5 s, la vidéo hero est différée, le poster priorisé et les formats image optimisés. Les résultats Lighthouse sont consignés dans le rapport de lancement.

La politique crawlers IA est publiée dans `robots.txt` : les crawlers de recherche/citation sont autorisés, les crawlers d'entraînement sont bloqués si la décision propriétaire le confirme, et le sitemap final reste déclaré. Après 14 jours, les premiers signaux de crawl, indexation, sessions IA et erreurs éventuelles sont examinés.

---

## Contexte

Le site Swing Digital est techniquement prêt pour une préproduction sur `https://swing.appmiweb.com`. L'audit du 2026-06-20 a vérifié 23 URL publiques : réponses HTTP 200, canonicals cohérents, JSON-LD présent, `robots.txt`, `sitemap.xml` et `llms.txt` servis correctement.

Les tests locaux passent : `npm run seo:check` valide 9 contrôles SEO/GEO et `npm test` valide 1 301 tests avec 154 tests ignorés. Lighthouse sur la préproduction donne SEO 100, accessibilité 100 et bonnes pratiques 100 sur l'accueil et Réservations. Le score performance de l'accueil est 89 avec un LCP mesuré à 3,8 s.

Trois chantiers restent volontairement non activés en préproduction :
- mesure GSC, GA4, Bing Webmaster Tools et sources IA ;
- optimisation LCP de l'accueil sur le rendu publié ;
- politique explicite pour les crawlers IA.

## Problème

Sans cadrage production, ces chantiers risquent d'être traités trop tôt ou de façon incohérente :

- la mesure peut être installée sur une URL de préproduction et polluer les données ;
- les conversions peuvent être suivies avant que le scénario Réservations soit décidé ;
- le LCP peut être optimisé contre un environnement temporaire plutôt que le domaine final ;
- `robots.txt` peut autoriser ou bloquer des crawlers IA sans décision métier explicite ;
- les rapports SEO/GEO peuvent mélanger impressions, citations IA, sessions GA4 et tests manuels comme s'il s'agissait d'un seul indicateur.

## Solution

Créer un lot de production SEO/GEO composé de trois modules activables au go-live.

Module 1 : mesure et reporting.

- Vérifier le domaine final dans Google Search Console.
- Soumettre le sitemap final dans GSC et Bing Webmaster Tools.
- Installer GA4 ou GTM sur les pages publiques.
- Suivre les clics `mailto:`, contact, réservation et newsletter.
- Créer un canal ou une exploration GA4 pour les sources IA.
- Préparer un tableau de suivi des prompts et citations IA.

Module 2 : performance LCP accueil.

- Mesurer l'accueil sur le domaine final.
- Retirer la priorité réseau de la vidéo hero si elle concurrence le LCP.
- Prioriser l'image poster hero.
- Différer le chargement vidéo après le rendu initial.
- Générer des variantes image modernes si nécessaire.
- Fixer un seuil Lighthouse et un seuil Core Web Vitals.

Module 3 : politique crawlers IA.

- Séparer crawlers de recherche/citation, crawlers d'entraînement, fetchers utilisateur et crawlers de recherche traditionnels.
- Autoriser les surfaces de découverte souhaitées.
- Bloquer les usages d'entraînement seulement si cette décision est validée par le propriétaire.
- Garder `robots.txt` comme consigne de crawl, pas comme mécanisme de sécurité.
- Revoir les noms de crawlers et la politique chaque trimestre.

## Options évaluées

### Option A (retenue) : Lot production différé et documenté

**Avantages** :
- Évite de polluer les données avec la préproduction.
- Permet d'aligner mesure, conversion, performance et politique crawlers sur le domaine final.
- Rend les décisions réversibles et auditables.
- Donne des critères go/no-go mesurables.
- Sépare clairement SEO traditionnel, GEO, analytics et décisions propriétaires IA.

**Inconvénients** :
- Nécessite une action coordonnée au moment du lancement.
- Dépend d'accès externes à GSC, GA4, Bing Webmaster Tools et à l'hébergement.
- Repousse certains gains potentiels tant que la production n'est pas ouverte.

### Option B : Tout installer immédiatement sur la préproduction

**Avantages** :
- Permet de tester plus tôt les tags, événements et sitemaps.
- Réduit la charge technique le jour du lancement.
- Rend visibles certains problèmes d'intégration avant production.

**Inconvénients** :
- Risque de créer des données analytics inutilisables ou ambiguës.
- Peut indexer ou mesurer une URL qui n'est pas destinée à porter la visibilité long terme.
- Oblige à purger ou annoter les données après bascule.
- Peut figer trop tôt une politique crawlers IA sans validation propriétaire.

### Option C : Reporter ces chantiers après la mise en production

**Avantages** :
- Réduit le périmètre du go-live initial.
- Permet de concentrer le lancement sur le contenu, le domaine et les mentions légales.
- Évite d'attendre les accès analytics pour publier.

**Inconvénients** :
- Perte de données dès les premiers jours de crawl et de trafic.
- Indexation et performance non surveillées au moment critique.
- Détection tardive des erreurs de sitemap, canonicals, conversions ou crawlers.
- Moins bonne base pour arbitrer les contenus et corrections post-lancement.

## Décision

Retenir l'Option A : lot production différé et documenté.

La préproduction reste un espace de validation technique. Les actions de mesure, crawlers IA et optimisation LCP finale deviennent des tâches de go-live, déclenchées quand le domaine final HTTPS, l'hébergeur légal et le scénario Réservations sont validés.

Cette option limite le bruit de mesure, garde la politique IA sous contrôle propriétaire et conserve les bénéfices d'une checklist de lancement.

## Plan d'implémentation

1. Confirmer le domaine final HTTPS et le scénario de lancement.
2. Renseigner l'hébergeur légal dans les mentions légales.
3. Décider le statut Réservations : billetterie active ou lancement informatif avec contact.
4. Basculer les URL SEO publiques vers le domaine final avec `npm run seo:set-base -- https://domaine-final`.
5. Exécuter `npm test`, `npm run seo:check`, `npm run build:prod` et `npm run prod:preflight -- https://domaine-final`.
6. Publier uniquement le contenu de `dist/`.
7. Vérifier le domaine final dans Google Search Console.
8. Soumettre `https://domaine-final/sitemap.xml` dans GSC.
9. Vérifier ou importer le site dans Bing Webmaster Tools.
10. Soumettre le sitemap final dans Bing Webmaster Tools.
11. Installer GA4 ou GTM sur toutes les pages publiques.
12. Créer les événements de conversion : clic contact, clic réservation, clic newsletter, clic email.
13. Créer un canal ou une exploration GA4 pour les sources IA.
14. Mesurer l'accueil et Réservations avec Lighthouse sur le domaine final.
15. Si LCP accueil > 2,5 s, différer la vidéo hero, prioriser le poster et optimiser les images.
16. Définir la politique crawlers IA propriétaire.
17. Mettre à jour `robots.txt` selon la politique retenue et vérifier le sitemap déclaré.
18. Surveiller pendant 14 jours : indexation GSC, crawl Bing, sessions GA4, sources IA et erreurs serveur.
19. Produire un rapport SEO/GEO de lancement avec métriques disponibles et métriques indisponibles explicitement marquées.

## Métriques de succès

- 100 % des URL du sitemap final répondent en HTTP 200.
- 100 % des URL du sitemap final ont une canonical sur le domaine final.
- `npm test`, `npm run seo:check` et `npm run prod:preflight -- https://domaine-final` terminent avec un code 0.
- GSC affiche le sitemap final comme soumis sans erreur bloquante.
- Bing Webmaster Tools affiche le sitemap final comme soumis sans erreur bloquante.
- GA4 collecte au moins un événement `page_view` sur le domaine final dans les 24 heures suivant l'installation.
- Les événements contact, réservation et newsletter sont visibles en debug ou temps réel GA4 avant lancement public de campagne.
- LCP Lighthouse de l'accueil sur production est inférieur ou égal à 2,5 s, ou une exception documentée est validée si le choix artistique de la vidéo hero est maintenu.
- Le score Lighthouse SEO de l'accueil et de Réservations reste supérieur ou égal à 95.
- `robots.txt` contient le sitemap final et aucune règle ne bloque Googlebot ou bingbot.
- La politique crawlers IA distingue au minimum recherche/citation, entraînement et fetch utilisateur.
- Le premier rapport SEO/GEO post-lancement sépare GSC, Bing, GA4, logs et tests manuels IA sans fusionner ces métriques.

## Dépendances

- Domaine final HTTPS.
- Accès Google Search Console.
- Accès Google Analytics ou Google Tag Manager.
- Accès Bing Webmaster Tools.
- Accès hébergement ou DNS pour la vérification de propriété.
- Décision propriétaire sur la politique d'entraînement IA.
- Décision produit sur la billetterie et la newsletter.

## Hors périmètre

- Refonte éditoriale des pages projet secondaires.
- Campagne publicitaire.
- Choix d'un outil payant de suivi de rankings ou de visibilité IA.
- Automatisation complète des rapports via API.
- Modification du modèle économique des réservations.

## Risques et garde-fous

- Ne pas déclarer d'impressions, clics, CTR, positions, citations IA ou conversions sans données observées.
- Ne pas présenter `llms.txt` comme un facteur de classement Google.
- Ne pas ajouter de JSON-LD qui ne correspond pas à un contenu visible.
- Ne pas bloquer les crawlers de recherche traditionnels par une règle générique anti-IA.
- Ne pas traiter `robots.txt` comme une protection de contenu privé.
- Ne pas confondre sessions GA4 issues d'assistants IA et impressions dans les réponses génératives Google ou Bing.

## Références

- Google Search Central : sitemaps et soumission via Search Console.
- Google Analytics : installation du Google tag ou de GTM.
- Bing Webmaster Tools : soumission sitemap et IndexNow.
- OpenAI crawlers : `OAI-SearchBot`, `GPTBot`, `ChatGPT-User`.
- Anthropic crawlers : `ClaudeBot`, `Claude-SearchBot`, `Claude-User`.
- Perplexity crawlers : `PerplexityBot`, `Perplexity-User`.
- Google Search Central : `robots.txt`, AI features et `Google-Extended`.

## Changelog

| Date | Auteur | Changement |
|------|--------|------------|
| 2026-06-20 | Alex + Codex | Création du PRD |
