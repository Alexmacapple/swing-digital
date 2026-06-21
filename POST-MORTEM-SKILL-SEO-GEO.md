# Post-mortem skill SEO/GEO

Date : 2026-06-21

Source publique consultée : https://github.com/bacoco/seo-geo-growth-agent

Contexte : utilisation du skill `seo-geo-growth-agent` sur la préproduction Swing Digital, avec génération de rapports HTML, captures desktop/mobile, Design Watch, couche IA publique, Search/Crawl, mesure préproduction et amélioration du script responsive lazy-load.

## Synthèse depuis les dernières versions testées

La trajectoire du skill est bonne : les rapports HTML visuels, Design Watch, les cohortes, la couche IA téléchargeable et l'étude responsive rendent l'audit beaucoup plus actionnable qu'une réponse chat.

La principale friction n'est pas la profondeur d'analyse, mais l'orchestration autour du livrable : savoir quel rapport est courant, quelle URL est valide, quelles limites viennent de la préproduction, quels problèmes sont réellement dans le site et quels problèmes viennent du protocole d'audit.

Les améliorations les plus utiles pour une prochaine version seraient donc des garde-fous de workflow :

- un pointeur automatique vers le dernier rapport valide ;
- un mode préproduction explicite ;
- une comparaison native entre deux rapports ;
- une distinction robuste entre défaut site, défaut cache, limite d'accès propriétaire et limite du script ;
- une commande de synchronisation et doctor des copies installées ;
- des preuves navigateur plus classées, notamment console, cache, captures et lazy-load.

## Retours par étape de session

1. Rapport HTML obligatoire

Au début, l'absence ou la mauvaise version du rapport HTML a créé de la confusion. L'amélioration qui force `audit.json`, `index.html`, URL locale ou chemin de rapport et captures est pertinente.

À renforcer : à la fin de chaque audit, le skill devrait écrire automatiquement un mini-fichier de réception avec `rapport courant`, `URL locale`, `URL distante si tunnel`, `dossier`, `date`, `cible auditée` et `version du skill`.

2. Rapport vert avec score et onglets

L'utilisateur a identifié la bonne version du rapport par son apparence : page verte, score, onglets. C'est un signal que l'interface est devenue reconnaissable, mais aussi que la version du rapport n'était pas assez explicite.

À renforcer : afficher visiblement la version du générateur, le chemin `audit.json` et une empreinte courte du rapport dans l'en-tête HTML.

3. Design Watch

Le passage de 8/10 à 8,5/10 a été compréhensible parce qu'il s'appuyait sur une preuve visuelle précise : le mobile montrait plus tôt la section suivante. Le score seul n'aurait pas suffi.

À renforcer : pour chaque point Design Watch, ajouter une preuve mesurable de premier écran : hauteur hero, premier contenu visible, CTA visible, signal de confiance visible, largeur testée.

4. Search/Crawl

Le passage à 9/10 a été crédible grâce au contrôle public avec 0 écart. Le cache Cloudflare a cependant masqué temporairement l'état réel.

À renforcer : le skill devrait distinguer `local ok`, `public ok`, `public cache stale`, `asset version mismatch` et `forbidden artifact still public`.

5. Measurement

Le score bas a été bien expliqué seulement quand on a distingué préproduction et production. Avant cela, il pouvait être lu comme une dette immédiate alors que les outils propriétaires ne doivent pas être branchés trop tôt.

À renforcer : quand `measurement` est bas mais volontairement différé, le rapport doit le nommer comme `gate production`, pas comme correction préproduction.

6. Couche IA et pack téléchargeable

Le pack IA v1.2.3 est utile pour combler rapidement `/llms.txt`, `/for-ai`, JSON et TXT. En revanche, il faut éviter que le pack remplace sans contrôle une couche déjà adaptée au projet.

À renforcer : dans l'onglet Téléchargements, ajouter un statut `à publier tel quel`, `à adapter`, `déjà présent`, `conflit avec source existante`.

7. Console Chrome

Les avertissements console ont été nombreux et mélangeaient vrais signaux, preloads, iframes tierces et Cloudflare. Sans tri, l'utilisateur peut corriger le mauvais sujet.

À renforcer : un onglet ou bloc `Console Watch` qui classe les messages par responsabilité et gravité.

8. URL locale, tunnel et rapport courant

Les ports locaux et les tunnels Cloudflare temporaires ont été difficiles à suivre. L'utilisateur a explicitement demandé une note racine pour ne pas chercher l'URL.

À renforcer : produire systématiquement un `LATEST-SEO-GEO-REPORT.md` ou équivalent, mis à jour à chaque génération.

9. Synchronisation des installations

Le skill était présent dans plusieurs copies actives : source, Claude et Codex. Une amélioration locale n'est pas utile si l'agent actif continue à utiliser une ancienne copie.

À renforcer : intégrer un `sync-and-doctor` qui déploie vers toutes les destinations connues, vérifie la version, puis affiche un reçu court.

10. Comparaison sans tableau

La comparaison des scores a été plus utile en prose qu'en tableau pour décider la prochaine action.

À renforcer : proposer deux rendus : `comparaison structurée` et `comparaison narrative`.

## Points d'amélioration génériques pour Loïc

1. Séparer clairement les modes préproduction et production

Le rapport doit distinguer les blocages réels des décisions volontairement différées. Sur un site pas encore en production, GSC, GA4/GTM, Bing Webmaster, domaine final, hébergeur légal et citations IA réelles ne doivent pas être traités comme des corrections immédiates.

Amélioration proposée : ajouter un mode `preprod` explicite dans l'audit, avec des scores ou libellés séparés pour `readiness préproduction` et `gates production`.

2. Réduire les faux positifs lazy-load

Le script responsive scorait les images avant parcours complet de page. Sur Swing Digital, le desktop avait 26 images lazy-load non chargées au premier relevé, mais 0 image manquante après scroll.

Amélioration proposée : conserver systématiquement deux états dans `responsive-study.json` : initial et après scroll. Les compteurs utiles sont `loaded_initially`, `loaded_after_scroll`, `broken` et `still_deferred`.

3. Ajouter un mode comparaison de rapports

Pendant la session, il a fallu comparer plusieurs rapports locaux et Cloudflare : `8767`, `8768`, `8769` et des tunnels temporaires. La confusion venait surtout de l'absence d'un résumé comparatif natif.

Amélioration proposée : générer automatiquement un bloc `comparison` quand un rapport précédent est fourni, avec variations de scores, causes et conclusion en prose. Prévoir une sortie sans tableau, car c'est plus lisible en discussion.

4. Stabiliser l'identité du rapport courant

Les tunnels Cloudflare expirent et les ports locaux changent. L'utilisateur ne doit pas chercher quel rapport est le bon.

Amélioration proposée : produire une petite note racine ou un fichier `LATEST-SEO-GEO-REPORT.md` avec chemin HTML, URL locale active, URL distante éventuelle, date, cible auditée et statut du tunnel.

5. Mieux diagnostiquer le cache CDN

Une partie de la session a été perturbée par du cache Cloudflare et par des versions CSS anciennes. Le rapport gagnait en fiabilité dès qu'on ajoutait des preuves de version d'asset et des contrôles publics.

Amélioration proposée : intégrer un diagnostic cache léger : URL testée, en-têtes cache, version CSS détectée, présence ou absence des fichiers attendus, et distinction entre cache public et état local.

6. Classer les erreurs console par responsabilité

Les avertissements Chrome mélangeaient ressources du site, iframes tierces, Cloudflare et preloads. Il faut éviter de faire corriger au site des messages provenant d'un tiers.

Amélioration proposée : capturer la console navigateur puis classer les messages en `first_party`, `third_party`, `browser_policy` et `unknown`, avec seulement les erreurs first-party en recommandations prioritaires.

7. Rendre le workflow d'installation plus visible

Le skill existe en plusieurs copies actives : source workspace, copie Claude et copie Codex. Après modification, il faut resynchroniser et vérifier chaque installation.

Amélioration proposée : ajouter une commande ou un runbook `sync-and-doctor` qui déploie vers Codex et Claude, puis lance `skill_doctor.py` sur chaque destination.

8. Protéger le rapport contre les scores artificiels

Le rapport est utile quand il garde les métriques inconnues en `unknown`. Il devient moins fiable s'il pousse à brancher trop tôt des outils de production ou à créer du contenu sans preuve.

Amélioration proposée : rendre les garde-fous plus visibles dans le HTML : `unknown assumé`, `donnée propriétaire absente`, `décision préproduction`, `preuve publique disponible`.

9. Formaliser le panel GEO/Citation

Quand le domaine final n'est pas en ligne, les citations réelles ne sont pas mesurables proprement. En revanche, le skill peut préparer un protocole de panel.

Amélioration proposée : générer un fichier de test avec requêtes ChatGPT, Perplexity et Claude, colonnes de citations, concurrents cités, faits repris, erreurs, sources utilisées et date du test.

10. Renforcer les recommandations orientées décision

Les meilleurs passages du rapport sont ceux qui disent quoi faire maintenant, quoi différer et pourquoi. C'est particulièrement utile quand un score faible est normal en préproduction.

Amélioration proposée : pour chaque scorecard, ajouter `next_now`, `defer_until_prod`, `proof_needed` et `risk_if_ignored`.

## Incident utile observé

Le chantier PRD-006 a montré un faux positif typique : le protocole d'audit peut déclarer des images manquantes alors que l'utilisateur les verrait après scroll. La correction doit rester côté outil, pas côté site. Retirer `loading="lazy"` aurait été une mauvaise correction.

## Preuves de session utiles

- Le rapport Swing Digital est passé à une lecture plus juste du Design Watch mobile après preuve publique.
- Search/Crawl est resté stable à 9/10 avec contrôle public.
- Measurement est resté bas pour une bonne raison : absence volontaire de prod finale.
- Le responsive dynamique peut être amélioré par le harnais d'audit sans modifier le site.
- Les copies Codex et Claude du skill doivent être vérifiées après chaque modification.
