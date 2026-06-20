# Rapport HTML SEO/GEO

Date : 2026-06-20

## URL publique Cloudflare

https://soft-genuine-weed-utility.trycloudflare.com/

Cette URL pointe vers le rapport HTML généré pour tester `seo-geo-growth-agent` `v1.2.1` sur Swing Digital.

## URL locale

http://127.0.0.1:8766/

## Fichiers du rapport

```text
reports/swing-digital/2026-06-20-v1.2.1-test/
├── audit.json
├── index.html
├── site-screenshots/
│   ├── desktop.png
│   └── mobile.png
└── site-visual-evidence.json
```

## Rapport PRD-005 Search/Crawl public

Fichier HTML :

```text
reports/swing-digital/2026-06-20-prd-005-search-crawl-public/index.html
```

Preuve machine :

```text
reports/swing-digital/2026-06-20-prd-005-search-crawl-public/search-crawl-public-evidence.json
```

Verdict du 2026-06-20 : `Search/Crawl` reste à 8/10 tant que la préproduction sert encore des artefacts non publics en HTTP 200. Le passage à 9/10 demande une purge côté hébergement, puis une republication stricte de `dist/` et un nouveau passage de `npm run appmiweb:search-crawl`.

## Note

L'URL Cloudflare est un quick tunnel temporaire. Elle reste disponible seulement tant que le processus `cloudflared` correspondant tourne.
