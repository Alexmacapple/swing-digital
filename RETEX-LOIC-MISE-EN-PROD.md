# RETEX à Loïc — passage au domaine de production

Date : 2026-09-20
Contexte : préparation du déploiement Git de Swing Digital sur `https://www.swingdigitalproduction.com`.

## Message court

Le domaine final est choisi et les sources SEO/GEO pointent désormais vers `https://www.swingdigitalproduction.com`. Le site reste indexable dans le build public : les pages publiques n'ont pas de `noindex`, le sitemap et `robots.txt` déclarent le domaine final, et `404.html` reste exclue de l'index.

Le contenu de la branche `production` est présent dans le document root OVH ; le HTTPS public et le routage 404 doivent encore être vérifiés avant d'annoncer la mise en ligne complète. Les scripts de publication sont versionnés sur `main` et le tag `mepv1-20-septembre-2026` reste la référence de cette livraison.

## État vérifié

1. `npm run seo:set-base -- https://www.swingdigitalproduction.com` a basculé les URL publiques dans `src/`.
2. Les ressources `robots.txt`, `sitemap.xml`, `llms.txt`, `for-ai` et JSON-LD utilisent le domaine final.
3. `npm run build:prod` génère `dist/` ; seuls les fichiers de `dist/` doivent être publiés.
4. Le flux GitHub Pages est arrêté ; sa désactivation effective reste à confirmer dans `Settings → Pages`. Il ne doit pas servir de branche de production.
5. Les métriques GSC, GA4/GTM, Bing Webmaster Tools, logs serveur et citations IA restent `unknown` tant qu'aucune preuve propriétaire n'est fournie.

## Décisions encore nécessaires

- Confirmer que Réservations reste informatif au lancement, ou fournir le parcours de billetterie actif.
- Vérifier DNS, certificat HTTPS, redirections et règle d'erreur 404 sur le domaine final.
- Décider les outils de mesure et la politique propriétaire pour les crawlers IA avant d'ajouter des tags ou des règles spécifiques.

## Procédure de publication

Contrôles locaux réalisés avant publication :

```bash
npm test
npm run seo:check
npm run build:prod
npm run prod:preflight -- https://www.swingdigitalproduction.com
```

Ces commandes terminent avec le code 0 (les deux avertissements Réservations sont informatifs). La routine est désormais encapsulée dans `scripts/publier-production.sh` : elle pousse `main`, reconstruit `dist/`, met à jour `production` et la pousse en SSH. Si nécessaire, `scripts/synchroniser-production-ovh.sh` tire ensuite la branche dans le document root. Vérifier enfin l'accueil, `robots.txt`, `sitemap.xml` et une URL inexistante avec `curl`.

## À ne pas sur-vendre

- Ne pas annoncer que la production est en ligne avant la vérification HTTPS réelle.
- Ne pas annoncer de trafic, CTR, positions, citations IA ou conversions sans export observé.
- Ne pas présenter `llms.txt` comme un facteur de classement Google.
- Ne pas publier `src/` ou les Markdown du projet sur le document root.

## Références

- `docs/SEO-GEO-AUDIT.md` — état SEO/GEO et preuves attendues.
- `docs/SEO-GEO-PROD-CHECKLIST.md` — critères go/no-go.
- `scripts/publier-production.sh` — publication contrôlée depuis le Mac.
- `scripts/synchroniser-production-ovh.sh` — synchronisation manuelle depuis SSH OVH.
