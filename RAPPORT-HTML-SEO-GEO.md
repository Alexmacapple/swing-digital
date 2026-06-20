# Rapport HTML SEO/GEO

Date : 2026-06-21

## URL locale du rapport courant

http://127.0.0.1:8769/

Cette URL pointe vers le rapport SEO/GEO public régénéré après correction du cache CSS Design Watch mobile.

## Rapport courant du 2026-06-21 — Design Watch mobile public

Fichier HTML :

```text
reports/swing-digital/2026-06-21-seo-geo-audit-design-watch-mobile/index.html
```

Verdict : le rapport confirme l’amélioration publique du chantier Design Watch mobile après bump CSS `20260621-0145`. À 390×844, le hero mobile mesure 688 px, `min-height` vaut 0 px et “Qui sommes-nous ?” apparaît sur environ 54 px dans le premier écran. Design Watch progresse donc de 8/10 à 8,5/10.

Comparaison avec le rapport précédent `8768` :

- `Search/Crawl` reste à 9/10 avec 0 écart public et 24 URL sitemap contrôlées ;
- `Design Watch` passe de 8/10 à 8,5/10 grâce à l’aperçu mobile de “Qui sommes-nous ?” ;
- `Responsive dynamique` reste à 8/10 avec warning lazy-load non bloquant ;
- `Measurement` reste à 5,5/10, car la mesure réelle attend toujours la production finale ;
- la prochaine priorité utile devient `GEO/Citation`, avec un panel ChatGPT, Perplexity et Claude.

Le rapport précédent reste utile comme baseline :

```text
reports/swing-digital/2026-06-21-seo-geo-audit-public/index.html
```

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

Verdict : les chantiers PRD-002, PRD-004 et PRD-005 sont visibles dans le rapport public. `Design Watch` passe à 8/10 grâce au signal de confiance, au CTA visible et à la marge mobile des liens sociaux. `Measurement` passe à 5,5/10 en préparation préproduction, avec 9 événements nommés et des sélecteurs vérifiés, sans tag GA4/GTM installé. La couche IA est publique (`/llms.txt`, `/for-ai`, `/for-ai.json`, `/for-ai.txt`, `schema-webpage.jsonld`). `Search/Crawl` passe à 9/10 : la relance publique indique 0 écart, 24 URL sitemap contrôlées et 9 artefacts interdits non publics.

Lecture PRD confirmée par le rapport `8768` :

- PRD-002 : validé public, car le rapport classe `Design Watch` à 8/10 avec preuves desktop/mobile ;
- PRD-004 : validé localement en readiness, car le rapport classe `Measurement` à 5,5/10 sans inventer de métriques ;
- PRD-005 : validé public, car `npm run appmiweb:search-crawl` termine avec 0 écart et le rapport classe `Search/Crawl` à 9/10 ;
- PRD-001 : toujours dépendant du domaine final, de l'hébergeur légal, du scénario Réservations, de GSC, GA4/GTM et Bing Webmaster.

Validation du rapport : `npm run seo:check` passe avec 12 réussites ; `npm run build:prod` passe avec 443 fichiers copiés ; `npm run appmiweb:preflight` passe avec 3 avertissements préproduction non bloquants ; `npm run appmiweb:search-crawl` passe avec 0 écart ; le rapport local `8768` a été contrôlé en desktop et mobile sans overflow.

## Correction console Chrome

Le 2026-06-21, les avertissements HTML évitables ont été corrigés avant commit :

- ajout d'une CSP statique en `meta http-equiv` sur les pages HTML publiques ;
- retrait des preloads globaux de polices qui déclenchaient des avertissements de ressource non utilisée ;
- retrait de `allowfullscreen` quand `allow` contient déjà `fullscreen` sur les iframes Vimeo et YouTube ;
- retrait du preload `video/hero.mp4` en `as="video"`, non supporté par Chrome pour `<link rel="preload">`.

Preuves :

- `https://swing.appmiweb.com/` ne signale plus l'avertissement `<link rel=preload> uses an unsupported as value` ;
- `https://swing.appmiweb.com/experience-monroe.html` ne signale plus d'avertissement `allowfullscreen` ni de preload local restant ;
- l'avertissement encore observable sur `experience-monroe.html` vient de `https://challenges.cloudflare.com/...`, chargé par l'iframe Vimeo, et n'est pas un preload déclaré par le HTML Swing Digital.

## Rapport PRD-005 Search/Crawl public

Fichier HTML :

```text
reports/swing-digital/2026-06-20-prd-005-search-crawl-public/index.html
```

Preuve machine :

```text
reports/swing-digital/2026-06-20-prd-005-search-crawl-public/search-crawl-public-evidence.json
```

Verdict initial du 2026-06-20 : la purge a corrigé la majorité du problème public, mais `/maquette-site.pdf` restait encore servi par cache Cloudflare sur le chemin exact. Relance validante du 2026-06-21 : `npm run appmiweb:search-crawl` passe avec 0 écart, 24 URL sitemap contrôlées, 24 canonicals cohérentes, 24 `og:url` cohérentes, 21 images Open Graph contrôlées et 9 artefacts interdits non publics. Le score officiel `Search/Crawl` peut donc être remonté à 9/10 dans le rapport courant.

## Chantier PRD-004 Mesure préproduction SEO/GEO

Le 2026-06-21, la mesure préproduction a été préparée sans installer de tag de production ni inventer de métriques.

Sources ajoutées :

```text
docs/SEO-GEO-MEASUREMENT-MATRIX.csv
docs/SEO-GEO-MEASUREMENT-PLAN.md
```

La matrice liste les événements mesurables, leurs sélecteurs, leur statut préproduction et leur condition d'activation au domaine final. Les boutons de réservation et newsletter désactivés restent documentés comme non-conversions.

Validation : `npx playwright test tests/seo-geo.spec.js --project=desktop-1920` passe avec 11 réussites. Le nouveau contrôle vérifie que chaque sélecteur de mesure pointe vers un élément réel et qu'aucun tag GA4 ou GTM n'est installé en préproduction. Le rapport `8768` a été régénéré avec `Measurement` à 5,5/10 en readiness préproduction. Les métriques de trafic, CTR, positions, citations IA et conversions restent explicitement `unknown`.

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

Preuves publiques : `https://swing.appmiweb.com/for-ai`, `https://swing.appmiweb.com/for-ai.json`, `https://swing.appmiweb.com/for-ai.txt` et `https://swing.appmiweb.com/schema-webpage.jsonld` répondent en HTTP 200. Le contrôle `npm run appmiweb:search-crawl` voit 24 URL sitemap, dont `/for-ai`, et passe avec 0 écart public.

En cas de cache Cloudflare trompeur sur `https://swing.appmiweb.com`, l'URL locale de repli pour auditer Swing Digital généré depuis `dist/` est :

```text
http://127.0.0.1:8771/
```

Commande associée :

```bash
python3 scripts/serve-test.py 8771 dist
```

Cette URL locale sert à vérifier le contenu et les endpoints générés quand le CDN fausse un contrôle. Elle ne remplace pas la preuve publique Search/Crawl, obtenue le 2026-06-21.

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

Validation : les tests responsive ciblés passent avec 61 réussites et 5 ignorés ; `npm test` passe avec 1 304 réussites et 161 ignorés ; `npm run seo:check`, `npm run build:prod` et `npm run appmiweb:preflight` passent. Le score `Design Watch` est confirmé à 8/10 par le rapport courant `http://127.0.0.1:8768/`.

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
