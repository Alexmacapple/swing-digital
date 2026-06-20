# Rapport HTML SEO/GEO

Date : 2026-06-21

## URL locale du rapport courant

http://127.0.0.1:8768/

Cette URL pointe vers le rapport SEO/GEO public régénéré après le chantier PRD-002.

## URL publique Cloudflare précédente

https://counsel-literature-dictionaries-indicators.trycloudflare.com/

Cette URL pointe vers l'ancien rapport HTML `v1.2.3` du 2026-06-20, pas vers le rapport courant.

## Fichiers du rapport

```text
reports/swing-digital/2026-06-21-seo-geo-audit-public/
├── audit.json
├── index.html
├── search-crawl-public-evidence.json
├── responsive-study.json
├── homepage-image-status.json
├── site-visual-evidence.json
├── report-ui-visual-evidence.json
├── site-screenshots/
│   ├── desktop.png
│   └── mobile.png
├── report-ui-desktop.png
└── report-ui-mobile.png
```

## Rapport régénéré SEO/GEO public du 2026-06-21

URL locale :

```text
http://127.0.0.1:8768/
```

Fichier HTML :

```text
reports/swing-digital/2026-06-21-seo-geo-audit-public/index.html
```

Verdict : le chantier PRD-002 est visible dans le rapport public. `Design Watch` passe à 8/10 grâce au signal de confiance, au CTA visible et à la marge mobile des liens sociaux. La couche IA est publique (`/llms.txt`, `/for-ai`, `/for-ai.json`, `/for-ai.txt`, `schema-webpage.jsonld`). `Search/Crawl` reste à 8,5/10 à cause de `/maquette-site.pdf` encore servi par le cache Cloudflare sur le chemin exact, alors que la variante cache-bustée répond en 404.

Validation du rapport : `npm run seo:check` passe avec 10 réussites ; `npm run build:prod` passe avec 443 fichiers copiés ; `npm run appmiweb:preflight` passe avec 3 avertissements préproduction non bloquants ; le rapport local `8768` a été contrôlé en desktop et mobile sans overflow.

## Rapport PRD-005 Search/Crawl public

Fichier HTML :

```text
reports/swing-digital/2026-06-20-prd-005-search-crawl-public/index.html
```

Preuve machine :

```text
reports/swing-digital/2026-06-20-prd-005-search-crawl-public/search-crawl-public-evidence.json
```

Verdict du 2026-06-20 : la purge a corrigé la majorité du problème public. Les anciens artefacts de travail répondent désormais en 404. Le dernier blocage est un cache Cloudflare : `/maquette-site.pdf` répond encore en HTTP 200 sur le chemin exact avec `cf-cache-status: HIT`, mais `/maquette-site.pdf?bust=...` répond en HTTP 404. Le score officiel `Search/Crawl` ne doit donc pas être monté à 9/10 tant que l'URL exacte reste servie par le cache CDN.

## Rapport v1.2.3 avec pack IA téléchargeable

URL publique Cloudflare :

```text
https://counsel-literature-dictionaries-indicators.trycloudflare.com/
```

Fichier HTML :

```text
reports/swing-digital/2026-06-20-v1.2.3-ai-layer-audit/index.html
```

Pack IA :

```text
reports/swing-digital/2026-06-20-v1.2.3-ai-layer-audit/ai-layer-package.zip
```

Ce rapport teste le workflow `seo-geo-growth-agent` `v1.2.3` : rapport HTML navigable, captures du site audité, étude responsive, Design Watch, cohortes d'analyse, onglet `Téléchargements` et génération du pack IA (`llms.txt`, `/for-ai`, `/for-ai.json`, `/for-ai.txt`, JSON-LD et guide d'installation). Il inclut aussi `cloudflare-cache-diagnostic.json` pour tracer le dernier blocage cache-only.

## Chantier PRD-003 Couche IA publique

Le 2026-06-21, le pack IA généré par le rapport v1.2.3 a été transformé en couche publique stable, sans reprendre les faits temporaires d'audit.

Ressources ajoutées au site source :

```text
src/for-ai/index.html
src/for-ai.json
src/for-ai.txt
src/schema-webpage.jsonld
```

Ressources déclarées dans `llms.txt`, `robots.txt` et `sitemap.xml` :

```text
https://swing.appmiweb.com/for-ai
https://swing.appmiweb.com/for-ai.json
https://swing.appmiweb.com/for-ai.txt
https://swing.appmiweb.com/schema-webpage.jsonld
```

Preuves locales : `npm run appmiweb:preflight` passe avec 443 fichiers publics validés ; `npm run seo:check` passe avec 10 tests, dont un contrôle dédié aux formats HTML, JSON et texte de la couche IA.

Preuves publiques : `https://swing.appmiweb.com/for-ai`, `https://swing.appmiweb.com/for-ai.json`, `https://swing.appmiweb.com/for-ai.txt` et `https://swing.appmiweb.com/schema-webpage.jsonld` répondent en HTTP 200. Le contrôle `npm run appmiweb:search-crawl` voit 24 URL sitemap, dont `/for-ai`, et conserve un seul écart : `/maquette-site.pdf` servi par cache Cloudflare HIT.

En cas de cache Cloudflare trompeur sur `https://swing.appmiweb.com`, l'URL locale de repli pour auditer Swing Digital généré depuis `dist/` est :

```text
http://127.0.0.1:8771/
```

Commande associée :

```bash
python3 scripts/serve-test.py 8771 dist
```

Cette URL locale sert à vérifier le contenu et les endpoints générés. Elle ne remplace pas la preuve publique Search/Crawl.

## Chantier PRD-002 Design Watch préproduction

Le 2026-06-21, l'accueil a reçu un ajustement ciblé pour traiter les constats Design Watch du rapport : preuve de confiance plus visible, CTA principal explicite et liens sociaux moins proches du bord droit sur mobile.

Changements source :

```text
src/index.html
src/css/style.css
src/*.html
tests/responsive.spec.js
```

Preuves locales :

```text
reports/swing-digital/2026-06-21-prd-002-design-watch/hero-desktop-1920.png
reports/swing-digital/2026-06-21-prd-002-design-watch/hero-mobile-375.png
```

Validation : les tests responsive ciblés passent avec 61 réussites et 5 ignorés ; `npm test` passe avec 1 304 réussites et 161 ignorés ; `npm run seo:check`, `npm run build:prod` et `npm run appmiweb:preflight` passent. Le score `Design Watch` doit être confirmé par un nouveau rapport HTML généré après publication.

## Rapport v1.2.2 audit visuel complet

URL locale :

```text
http://127.0.0.1:8767/
```

Fichier HTML :

```text
reports/swing-digital/2026-06-20-v1.2.2-visual-audit/index.html
```

Ce rapport teste le workflow `seo-geo-growth-agent` `v1.2.2` : rapport HTML navigable, `report_language=fr`, captures du site audité, étude responsive dynamique, Design Watch, cohortes d'analyse et captures desktop/mobile du rapport lui-même.

## Note

L'URL Cloudflare est un quick tunnel temporaire. Elle reste disponible seulement tant que le processus `cloudflared` correspondant tourne.
