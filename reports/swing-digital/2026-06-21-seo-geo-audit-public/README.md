# Rapport SEO/GEO public du 2026-06-21

Rapport courant :

```text
http://127.0.0.1:8768/
```

Fichier principal :

```text
index.html
```

## Preuves incluses

- `search-crawl-public-evidence.json` : contrôle public Search/Crawl sur `https://swing.appmiweb.com`.
- `site-screenshots/desktop.png` et `site-screenshots/mobile.png` : captures du site audité pour Design Watch.
- `report-ui-desktop.png` et `report-ui-mobile.png` : captures du rapport généré pour vérifier le rendu.
- `responsive-study.json` : étude responsive dynamique.
- `homepage-image-status.json` : contrôle complémentaire des images lazy.
- `measurement-readiness-evidence.json` : preuve de préparation PRD-004, avec 9 événements nommés et métriques maintenues en `unknown`.

PDG-BINARY-ASSET-JUSTIFICATION: les captures PNG sont conservées car elles servent de preuve visuelle non reconstruisible depuis le seul `audit.json`. Elles permettent de vérifier le score Design Watch, la présence du CTA, le signal de confiance mobile/desktop et l'absence d'overflow du rapport.

## Limite

Le rapport régénéré valide `Search/Crawl` à 9/10 : la preuve publique indique 0 écart, 24 URL sitemap contrôlées et 9 artefacts interdits non publics.

Le rapport ne déclare pas de trafic, CTR, positions, citations IA ou conversions observées. Le score `Measurement` mesure seulement la préparation préproduction.
