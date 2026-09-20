# Checklist SEO/GEO de mise en production — Swing Digital

Date : 2026-09-20
Statut : domaine final configuré ; publication production bloquée uniquement par les mentions légales d'hébergement et la validation d'infrastructure.

## Go / no-go

| Critère | Statut attendu | Blocant |
|---|---|---|
| Domaine final | `https://www.swingdigitalproduction.com` | Oui — satisfait |
| Canonicals, Open Graph, sitemap, `llms.txt` | Tous alignés sur le domaine HTTPS | Oui |
| Mentions légales | Hébergeur réel renseigné : nom, adresse, téléphone | Oui — bloquant actuel |
| Dossier publié | `dist/` uniquement, jamais `src/` complet | Oui |
| Artefacts de travail | Absents de `dist/` | Oui |
| Réservations | Billetterie active ou lancement informatif assumé | Selon objectif |
| Analytics | GSC, Bing Webmaster Tools et GA4 configurés | Recommandé avant campagne |
| Claims | Tarifs, durées, langues et formats relus | Oui avant campagne payante ou RP |

## Commandes de publication

Recette GitHub Pages (toujours non indexable) :

```bash
scripts/publier-gh-pages.sh --a-blanc
scripts/publier-gh-pages.sh
```

Production finale :

```bash
npm test
npm run seo:set-base -- https://www.swingdigitalproduction.com
npm run seo:check
npm run build:prod
npm run prod:preflight -- https://www.swingdigitalproduction.com
```

Après un preflight vert, publier le contenu de `dist/` dans la branche Git de production, puis tirer cette branche dans le document root OVH. Voir `docs/DEPLOIEMENT-PRODUCTION-GIT.md`.

## Critère de réussite

Les commandes suivantes doivent terminer avec un code 0 :

```bash
npm test
npm run prod:preflight -- https://www.swingdigitalproduction.com
```

Tant qu'une commande échoue, ne pas publier en production finale. Le preflight actuel échoue sur le placeholder d'hébergeur de `src/mentions-legales.html`.

## Données à fournir avant go-live

| Donnée | Où l'appliquer |
|---|---|
| Domaine final HTTPS | `seo:set-base`, DNS, hébergement, redirections | `https://www.swingdigitalproduction.com` configuré |
| Hébergeur légal | `src/mentions-legales.html` |
| Statut billetterie | `src/reservations.html` |
| ID GA4 ou alternative analytics RGPD | Balise ou gestionnaire choisi |
| Accès GSC / Bing Webmaster Tools | Soumission du sitemap |

## Garde-fous SEO/GEO

- Ne pas ajouter de règles spécifiques aux crawlers IA sans décision propriétaire.
- Ne pas publier de ratings, avis, prix, récompenses ou métriques non sourcés.
- Ne pas ajouter de JSON-LD qui ne correspond pas à un contenu visible.
- Ne pas publier `generated-pages.html`, `pages-extracted/`, les Markdown projet ou le PDF source ; `build:prod` les exclut.
- Traiter `llms.txt` comme une aide optionnelle aux agents, pas comme un facteur de classement Google.
