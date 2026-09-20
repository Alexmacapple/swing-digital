# RETEX à Loïc — passage au domaine de production

Date : 2026-09-20
Contexte : préparation du déploiement Git de Swing Digital sur `https://www.swingdigitalproduction.com`.

## Message court

Le domaine final est choisi et les sources SEO/GEO pointent désormais vers `https://www.swingdigitalproduction.com`. Le site reste indexable dans le build public : les pages publiques n'ont pas de `noindex`, le sitemap et `robots.txt` déclarent le domaine final, et `404.html` reste exclue de l'index.

La mise en production n'est pas encore annoncée : `npm run prod:preflight -- https://www.swingdigitalproduction.com` échoue encore sur le placeholder d'hébergeur des mentions légales. Le déploiement Git OVH est documenté mais doit attendre un preflight vert.

## État vérifié

1. `npm run seo:set-base -- https://www.swingdigitalproduction.com` a basculé les URL publiques dans `src/`.
2. Les ressources `robots.txt`, `sitemap.xml`, `llms.txt`, `for-ai` et JSON-LD utilisent le domaine final.
3. `npm run build:prod` génère `dist/` ; seuls les fichiers de `dist/` doivent être publiés.
4. La recette GitHub Pages reste distincte et non indexable ; elle ne doit pas servir de branche de production.
5. Les métriques GSC, GA4/GTM, Bing Webmaster Tools, logs serveur et citations IA restent `unknown` tant qu'aucune preuve propriétaire n'est fournie.

## Décisions encore nécessaires

- Renseigner dans `src/mentions-legales.html` le nom, l'adresse et le téléphone réels de l'hébergeur.
- Confirmer que Réservations reste informatif au lancement, ou fournir le parcours de billetterie actif.
- Vérifier DNS, certificat HTTPS, document root OVH et règle d'erreur 404 après le premier `git pull` de production.
- Décider les outils de mesure et la politique propriétaire pour les crawlers IA avant d'ajouter des tags ou des règles spécifiques.

## Procédure de publication

Après correction des mentions légales :

```bash
npm test
npm run seo:check
npm run build:prod
npm run prod:preflight -- https://www.swingdigitalproduction.com
```

Si toutes les commandes terminent avec le code 0, publier le contenu de `dist/` à la racine de la branche Git de production, puis tirer cette branche dans `/homez.1917/laborneoba/www.swingdigitalproduction.com`. Vérifier ensuite l'accueil, `robots.txt`, `sitemap.xml` et une URL inexistante avec `curl`.

## À ne pas sur-vendre

- Ne pas annoncer que la production est en ligne avant la vérification HTTPS réelle.
- Ne pas annoncer de trafic, CTR, positions, citations IA ou conversions sans export observé.
- Ne pas présenter `llms.txt` comme un facteur de classement Google.
- Ne pas publier `src/` ou les Markdown du projet sur le document root.

## Références

- `docs/SEO-GEO-AUDIT.md` — état SEO/GEO et preuves attendues.
- `docs/SEO-GEO-PROD-CHECKLIST.md` — critères go/no-go.
- `docs/DEPLOIEMENT-PRODUCTION-GIT.md` — procédure Git et contrôles après publication.
