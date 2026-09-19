# Instructions Codex — Swing Digital

## Contexte projet

Swing Digital est un site vitrine statique multi-pages en HTML, CSS et JavaScript vanilla. La source publique est dans `src/`, le build publiable est dans `dist/`.

Préproduction actuelle :

```text
https://swing.appmiweb.com
```

Le projet n’est pas prêt pour la production finale tant que ces points restent ouverts : domaine final HTTPS, mentions légales avec hébergeur réel, scénario Réservations, GSC, GA4/GTM, Bing Webmaster et mesure réelle.

## Sources de référence

- `CLAUDE.md` : mémoire historique du projet.
- `RAPPORT-HTML-SEO-GEO.md` : état des rapports SEO/GEO et URL locale utile.
- `docs/SEO-GEO-MEASUREMENT-PLAN.md` et `docs/SEO-GEO-MEASUREMENT-MATRIX.csv` : mesure préproduction.
- `prd-meta-workflow/PRD-001-seo-geo-production.MD` : préparation production finale.

## Commandes utiles

```bash
npm test
npm run seo:check
npm run build:prod
npm run appmiweb:preflight
npm run appmiweb:search-crawl
```

État courant au 2026-06-21 : le harnais Playwright est restauré avec
`tests/prd011-menu-xr-films.spec.js` et `tests/seo-geo.spec.js`. `npm test`
vérifie la taxonomie XR / Films sur 5 viewports et `npm run seo:check` vérifie
le socle SEO/GEO local sur `desktop-1920`.

Pour servir un dossier local :

```bash
python3 scripts/serve-test.py 8771 dist
python3 scripts/serve-test.py 8080 src
```

## Règles de modification

- Ne publier que `dist/`, jamais le dossier `src/` complet.
- Garder le site sans framework ni bundler.
- Préserver HTML sémantique, navigation clavier, skip link, fil d’Ariane et structure H1/H2.
- Ne pas installer GA4/GTM ou tags de production sur la préproduction sans décision explicite.
- Ne pas transformer Réservations en parcours transactionnel tant que le scénario n’est pas validé.
- Ne pas inventer de métriques SEO/GEO : trafic, CTR, positions, citations IA et conversions restent `unknown` sans source.

## CSS et cache

Les pages HTML référencent `css/style.css` avec un paramètre `?v=...`. Après une modification CSS visible en préproduction, mettre à jour ce paramètre sur les pages `src/*.html` concernées, sinon Cloudflare peut servir une ancienne version cache HIT.

Vérification rapide :

```bash
curl -sL https://swing.appmiweb.com/ | rg 'style\.css\?v='
curl -sI 'https://swing.appmiweb.com/css/style.css?v=VERSION'
```

## SEO/GEO

La préproduction est actuellement saine côté Search/Crawl quand `npm run appmiweb:search-crawl` termine avec 0 écart. Les rapports HTML SEO/GEO sont générés avec le skill local `seo-geo-growth-agent` et doivent inclure `audit.json`, `index.html`, captures du site audité, étude responsive, Design Watch, cohortes et statut des données manquantes.

Pour les prochains chantiers, prioriser GEO/Citation avant la mesure réelle, car la mise en production finale n’est pas encore prête.

## Loriq et ShipGuard — à utiliser systématiquement

**Loriq** (harnais généré, installé 2026-09-19, source de vérité `.loriq/profile.yml`) :

- Avant d’éditer du code, lire le plan routé : `.loriq/control/task-router.yml`, `.loriq/control/behavior-contract.yml`, `.loriq/control/oracles.yml`, `.loriq/memory/MEMORY.md` et `.loriq/memory/mistakes.md`.
- Toute modification passe par les routes : périmètre scellé, travail borné, oracles rejoués.
- Les comportements `proposed` du behavior-contract attendent la confirmation humaine (cérémonie `runtime/ceremony.py confirm`) avant qu’une tâche bornée ne s’appuie dessus.
- Les artefacts de session hors diff vont sous `.loriq-operator-artifacts/` ; la capture mémoire (`.loriq/memory/**`) est hors bande, jamais dans un arbre routé.

**ShipGuard** (plugin installé pour Claude Code ; variant Codex présent localement) — acte : ShipGuard est fait passer à chaque fois que possible :

- Avant toute modification visible à l’écran : snapshot de référence ; après : snapshot de comparaison (`/sg-visual-run` ; `/sg-visual-discover` pour (re)générer les manifestes par route ; `/sg-change-report` pour la preuve avant/après durable ; `/sg-ship` pour la vérification de bout en bout).
- Ne jamais rapporter un vert de navigateur/test qui n’a pas réellement tourné.
- Lanes navigateur via le CLI local `agent-browser` (sortie sémantique/DOM ; pas de captures PNG sans demande explicite de l’humain).
- Artefacts ShipGuard dans `visual-tests/_results/`.
