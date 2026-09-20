# RETEX à Loïc — passage au domaine de production

Date : 2026-09-20
Contexte : préparation du déploiement Git de Swing Digital sur `https://www.swingdigitalproduction.com`.

## Message court

Le domaine final est choisi et les sources SEO/GEO pointent désormais vers `https://www.swingdigitalproduction.com`. Le site reste indexable dans le build public : les pages publiques n'ont pas de `noindex`, le sitemap et `robots.txt` déclarent le domaine final, et `404.html` reste exclue de l'index.

La mise en production n'est pas encore annoncée : le preflight local est vert, mais le document root OVH reste à synchroniser et le HTTPS public doit encore être vérifié. Le tag `mepv1-20-septembre-2026` et la branche `production` sont désormais poussés en SSH.

## État vérifié

1. `npm run seo:set-base -- https://www.swingdigitalproduction.com` a basculé les URL publiques dans `src/`.
2. Les ressources `robots.txt`, `sitemap.xml`, `llms.txt`, `for-ai` et JSON-LD utilisent le domaine final.
3. `npm run build:prod` génère `dist/` ; seuls les fichiers de `dist/` doivent être publiés.
4. Le flux GitHub Pages est arrêté ; sa désactivation effective reste à confirmer dans `Settings → Pages`. Il ne doit pas servir de branche de production.
5. Les métriques GSC, GA4/GTM, Bing Webmaster Tools, logs serveur et citations IA restent `unknown` tant qu'aucune preuve propriétaire n'est fournie.

## Décisions encore nécessaires

- Confirmer que Réservations reste informatif au lancement, ou fournir le parcours de billetterie actif.
- Tirer la branche `production` dans le document root OVH puis vérifier DNS, certificat HTTPS et règle d'erreur 404.
- Décider les outils de mesure et la politique propriétaire pour les crawlers IA avant d'ajouter des tags ou des règles spécifiques.

## Procédure de publication

Contrôles locaux réalisés avant publication :

```bash
npm test
npm run seo:check
npm run build:prod
npm run prod:preflight -- https://www.swingdigitalproduction.com
```

Ces commandes terminent avec le code 0 (les deux avertissements Réservations sont informatifs). Le contenu de `dist/` a été publié à la racine de la branche `production`. La prochaine action est de tirer cette branche dans `/homez.1917/laborneoba/www.swingdigitalproduction.com`, puis de vérifier l'accueil, `robots.txt`, `sitemap.xml` et une URL inexistante avec `curl`.

## À ne pas sur-vendre

- Ne pas annoncer que la production est en ligne avant la vérification HTTPS réelle.
- Ne pas annoncer de trafic, CTR, positions, citations IA ou conversions sans export observé.
- Ne pas présenter `llms.txt` comme un facteur de classement Google.
- Ne pas publier `src/` ou les Markdown du projet sur le document root.

## Références

- `docs/SEO-GEO-AUDIT.md` — état SEO/GEO et preuves attendues.
- `docs/SEO-GEO-PROD-CHECKLIST.md` — critères go/no-go.
- `docs/DEPLOIEMENT-PRODUCTION-GIT.md` — procédure Git et contrôles après publication.
