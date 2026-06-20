# Rapport PRD-005 Search/Crawl public

Date : 2026-06-20

Cible : `https://swing.appmiweb.com`

## Verdict

Le socle Search/Crawl public est sain, mais le passage à 9/10 est bloqué par la publication d'artefacts non publics.

## Ce qui passe

- `npm run appmiweb:preflight` : OK, 439 fichiers publics validés dans `dist/`.
- Sitemap public : 23 URL, 23 réponses HTTP 200.
- Canonicals : 23/23 cohérentes avec la préproduction Appmiweb.
- Open Graph : 23/23 `og:url` cohérents.
- Images Open Graph : 21/21 répondent en 200 avec un type image.
- `robots.txt` : HTTP 200, sitemap Appmiweb déclaré.
- `llms.txt` : HTTP 200, base canonique Appmiweb présente.

## Ce qui bloque

Les chemins suivants répondent publiquement en HTTP 200 :

- `/generated-pages.html`
- `/pages-extracted/`
- `/maquette-site.pdf`
- `/README.md`
- `/CLAUDE.md`
- `/ROADMAP.md`
- `/todo.md`
- `/.htaccess`
- `/.DS_Store`

Ces fichiers ne sont pas présents dans `dist/` après build. Le problème est donc côté publication préproduction : ancien contenu non purgé, racine serveur incorrecte ou envoi d'un répertoire non filtré. Les artefacts internes ont été déplacés hors de `src/`, dans `source-artifacts/`, pour éviter leur redéploiement si Appmiweb publie `src/`.

## Action attendue

1. Purger côté hébergement les artefacts listés.
2. Republier uniquement le contenu de `dist/`.
3. Relancer `npm run appmiweb:search-crawl`.
4. Si le contrôle passe sans écart, régénérer le rapport HTML SEO/GEO et monter Search/Crawl à 9/10.

Preuve machine : `search-crawl-public-evidence.json`.
