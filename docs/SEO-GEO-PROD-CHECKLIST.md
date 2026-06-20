# Checklist SEO/GEO de mise en production — Swing Digital

Date : 2026-06-20
Statut : prêt techniquement pour la préproduction `https://swing.appmiweb.com`, bloqué pour la production finale tant que le domaine final HTTPS et l'hébergeur légal ne sont pas renseignés.

## Go / no-go

| Critère | Statut attendu | Blocant |
|---|---|---|
| Domaine final | URL HTTPS réelle connue | Oui |
| Canonicals, Open Graph, sitemap, `llms.txt` | Tous alignés sur le domaine HTTPS | Oui |
| Mentions légales | Hébergeur réel renseigné : nom, adresse, téléphone | Oui |
| Dossier publié | `dist/` uniquement, jamais `src/` complet | Oui |
| Artefacts de travail | Absents de `dist/` | Oui |
| Réservations | Billetterie active ou lancement informatif assumé | Selon objectif |
| Analytics | GSC, Bing Webmaster Tools et GA4 configurés | Recommandé avant campagne |
| Claims | Tarifs, durées, langues et formats relus | Oui avant campagne payante ou RP |

## Commandes de publication

Préproduction Appmiweb :

```bash
npm run appmiweb:set-base
npm test
npm run seo:check
npm run build:prod
npm run appmiweb:preflight
```

Production finale, quand le domaine définitif est connu :

```bash
npm test
npm run seo:set-base -- https://votre-domaine.fr
SEO_BASE_URL=https://votre-domaine.fr npm run seo:check
npm run build:prod
npm run prod:preflight -- https://votre-domaine.fr
```

Publier ensuite le contenu du dossier `dist/`.

## Critère de réussite

Les commandes suivantes doivent terminer avec un code 0 :

```bash
npm test
npm run prod:preflight -- https://votre-domaine.fr
```

Tant qu'une commande échoue, ne pas publier en production finale.

## Données à fournir avant go-live

| Donnée | Où l'appliquer |
|---|---|
| Domaine final HTTPS | `seo:set-base`, DNS, hébergement, redirections |
| Hébergeur légal | `src/mentions-legales.html` |
| Statut billetterie | `src/reservations.html` |
| ID GA4 ou alternative analytics RGPD | Balise ou gestionnaire choisi |
| Accès GSC / Bing Webmaster Tools | Soumission du sitemap |

## Garde-fous SEO/GEO

- Ne pas ajouter de règles spécifiques aux crawlers IA sans décision propriétaire.
- Ne pas publier de ratings, avis, prix, récompenses ou métriques non sourcés.
- Ne pas ajouter de JSON-LD qui ne correspond pas à un contenu visible.
- Ne pas publier `generated-pages.html`, `pages-extracted/`, les Markdown projet ou le PDF source.
- Traiter `llms.txt` comme une aide optionnelle aux agents, pas comme un facteur de classement Google.
