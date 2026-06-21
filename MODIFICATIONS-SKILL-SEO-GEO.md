# Modifications locales du skill SEO/GEO par rapport à GitHub

Date : 2026-06-21
Complément : `POST-MORTEM-SKILL-SEO-GEO.md`
Skill concerné : `seo-geo-growth-agent`

## Sources comparées

| Élément | Valeur |
|---|---|
| Dépôt public | `https://github.com/bacoco/seo-geo-growth-agent` |
| Version publique comparée | `v1.2.3` |
| Commit public comparé | `53fc44f17b65c27ddce965161be882e5014eef74` |
| Message du commit public | `Add downloadable AI layer packages` |
| Copie locale analysée | `/Users/alex/Claude/.claude/skills/seo-geo-growth-agent` |
| Commit local avant correction fonctionnelle | `ac639703` — `Ajout du skill SEO GEO et des livrables` |
| Commit local après correction fonctionnelle | `921dcf70` — `Correction audit responsive lazy-load` |

Méthode : clone propre du dépôt public dans `/tmp`, comparaison avec la copie locale en excluant `.git`, `__pycache__` et `.pytest_cache`.

Résultat du delta strict local contre GitHub : `15 files changed, 287 insertions(+), 51 deletions(-)`.

Résultat du delta fonctionnel récent dans la copie locale : `4 files changed, 250 insertions(+), 14 deletions(-)`.

## Résumé court

La modification utile ajoutée au skill concerne l’audit responsive dynamique et le traitement des images en chargement différé.

Avant correction, le script pouvait signaler comme manquantes des images `loading="lazy"` observées trop tôt, avant que le navigateur ait réellement parcouru la page.

Après correction, le script :

- mesure l’état initial des images ;
- scrolle toute la page dans le navigateur ;
- attend les images encore en attente ;
- mesure l’état final ;
- distingue les images chargées initialement, chargées après scroll, cassées ou encore différées ;
- ne remonte une correction site que si l’image reste cassée ou non chargée après exposition réelle.

Cette correction évite un faux positif observé sur Swing Digital : 26 images semblaient manquantes au premier relevé desktop, alors qu’elles étaient simplement chargées après scroll.

## Modifications fonctionnelles ajoutées

| Fichier | Modification | Effet |
|---|---|---|
| `scripts/capture_site_screenshots.mjs` | Ajout de `readLayout(send)` avec inventaire détaillé des images : `src`, `loading`, `complete`, dimensions naturelles, dimensions rendues, position et visibilité. | Le rapport dispose d’une preuve image par image au lieu d’un simple compteur d’images manquantes. |
| `scripts/capture_site_screenshots.mjs` | Ajout de `scrollThroughPage(send)` : scroll progressif jusqu’au bas de page, attente courte à chaque palier, attente des images en attente, retour en haut. | Les images paresseuses sont réellement exposées au navigateur avant le verdict. |
| `scripts/capture_site_screenshots.mjs` | Ajout de `summarizeImageLoading(initialImages, finalImages)`. | Création des compteurs `loaded_initially`, `loaded_after_scroll`, `broken`, `still_deferred`, `initial_missing`, `missing_after_scroll` et `unresolved_sample`. |
| `scripts/capture_site_screenshots.mjs` | Modification de `captureViewport(...)` pour mesurer avant scroll, scroller, remesurer, puis attacher `initialMissingImages`, `imageLoadStates` et `scrollProbe`. | Le champ historique `missingImages` représente maintenant le reste à traiter après scroll, pas l’état initial trompeur. |
| `scripts/capture_site_screenshots.mjs` | Modification de `analyzeViewport(layout)`. | Le script ne signale plus toutes les images absentes au premier rendu. Il signale seulement les images cassées après scroll ou les images paresseuses encore différées après parcours complet. |
| `scripts/generate_html_audit_report.py` | Ajout des libellés anglais et français pour les nouveaux compteurs image. | Le rapport HTML affiche les compteurs d’images de façon lisible. |
| `scripts/generate_html_audit_report.py` | Ajout du rendu de `imageLoadStates` dans l’étude responsive. | L’onglet responsive montre la différence entre image chargée initialement, chargée après scroll, cassée ou encore différée. |
| `tests/test_site_capture.py` | Ajout d’un mini-serveur HTTP de test et d’une image PNG 1x1 embarquée. | Le test peut simuler un vrai chargement d’image sans dépendre d’une ressource externe. |
| `tests/test_site_capture.py` | Ajout d’un test avec une image paresseuse valide et une image manquante. | Le test vérifie que le script distingue une image chargée après scroll d’une image réellement cassée. |
| `tests/test_visual_html_audit.py` | Ajout de `imageLoadStates` dans la fixture et assertion sur `Images loaded after scroll`. | Le générateur HTML est couvert pour le nouveau bloc de preuves. |

## Repères précis dans la copie locale

| Fichier local | Lignes utiles | Ce qui est vérifiable |
|---|---:|---|
| `/Users/alex/Claude/.claude/skills/seo-geo-growth-agent/scripts/capture_site_screenshots.mjs` | 113-163 | Lecture du layout et collecte détaillée des images. |
| `/Users/alex/Claude/.claude/skills/seo-geo-growth-agent/scripts/capture_site_screenshots.mjs` | 165-205 | Scroll complet de la page et attente des images en attente. |
| `/Users/alex/Claude/.claude/skills/seo-geo-growth-agent/scripts/capture_site_screenshots.mjs` | 207-249 | Comparaison initial/final et calcul des états d’images. |
| `/Users/alex/Claude/.claude/skills/seo-geo-growth-agent/scripts/capture_site_screenshots.mjs` | 251-276 | Intégration des nouveaux états dans la capture viewport. |
| `/Users/alex/Claude/.claude/skills/seo-geo-growth-agent/scripts/capture_site_screenshots.mjs` | 279-288 | Nouvelle logique de remontée des problèmes image. |
| `/Users/alex/Claude/.claude/skills/seo-geo-growth-agent/scripts/generate_html_audit_report.py` | 594-597 | Libellés HTML des nouveaux compteurs. |
| `/Users/alex/Claude/.claude/skills/seo-geo-growth-agent/scripts/generate_html_audit_report.py` | 1167-1180 | Affichage des compteurs dans le tableau responsive. |
| `/Users/alex/Claude/.claude/skills/seo-geo-growth-agent/tests/test_site_capture.py` | 37-52 | Serveur HTTP temporaire pour fixture locale. |
| `/Users/alex/Claude/.claude/skills/seo-geo-growth-agent/tests/test_site_capture.py` | 109-112 | Assertion `missing_after_scroll = 0` sur la fixture simple. |
| `/Users/alex/Claude/.claude/skills/seo-geo-growth-agent/tests/test_site_capture.py` | 114-181 | Test image paresseuse chargée après scroll et image cassée. |
| `/Users/alex/Claude/.claude/skills/seo-geo-growth-agent/tests/test_visual_html_audit.py` | 95-100 | Fixture HTML avec `imageLoadStates`. |
| `/Users/alex/Claude/.claude/skills/seo-geo-growth-agent/tests/test_visual_html_audit.py` | 165 | Assertion de présence du libellé `Images loaded after scroll`. |

## Structure des nouvelles preuves JSON

Le script ajoute maintenant, pour chaque viewport, un bloc de ce type dans `responsive-study.json` :

```json
{
  "imageLoadStates": {
    "total": 34,
    "lazy": 34,
    "loaded_initially": 8,
    "loaded_after_scroll": 26,
    "broken": 0,
    "still_deferred": 0,
    "initial_missing": 26,
    "missing_after_scroll": 0,
    "unresolved_sample": []
  },
  "scrollProbe": {
    "scrollSteps": 4,
    "maxScroll": 3200,
    "documentHeight": 5000
  }
}
```

La valeur décisive n’est plus `initial_missing`, mais `missing_after_scroll`.

## Règles de décision ajoutées

| Situation après scroll | Décision |
|---|---|
| `broken > 0` | Problème site : ressource image cassée ou invalide. |
| `still_deferred > 0` | Avertissement : image paresseuse encore non chargée après exposition. |
| `loaded_after_scroll > 0`, `broken = 0`, `still_deferred = 0` | Preuve positive : le chargement différé fonctionne. |
| `initial_missing > 0`, `missing_after_scroll = 0` | Pas de correction site requise sur les images. |

## Écarts non fonctionnels aussi présents dans la copie locale

Le delta strict contre GitHub contient aussi `11` fichiers de documentation ou templates modifiés sans effet runtime.

Ces écarts portent surtout sur :

- la casse des titres Markdown, par exemple `Use It` vers `Use it` ;
- des titres de runbooks et templates passés en casse phrase ;
- quelques remplacements accidentels de `reference` par `référence` dans des fichiers rédigés en anglais.

Fichiers concernés :

- `CHANGELOG.md`
- `README.md`
- `runbooks/bootstrap.md`
- `runbooks/public-measurement-access.md`
- `runbooks/skill-optimization.md`
- `runbooks/visual-html-audit.md`
- `templates/browser-audit-codification.md`
- `templates/crawler-policy-freshness-check.md`
- `templates/design-watch-audit.md`
- `templates/domain-notes.md`
- `templates/responsive-dynamic-study.md`

Ces changements ne sont pas nécessaires au correctif lazy-load. Pour une contribution upstream propre, il vaut mieux les exclure ou les nettoyer avant pull request.

## Fichiers du skill non modifiés fonctionnellement

Je n’ai pas modifié fonctionnellement :

- `SKILL.md` ;
- `manifest.json` ;
- les références numérotées `references/*.md` ;
- `scripts/install.sh` ;
- `scripts/skill_doctor.py` ;
- `scripts/validate_skill.py` ;
- `scripts/generate_ai_layer_package.py` ;
- les templates IA principaux comme `llms.txt`, `for-ai-page.md`, `for-ai-json.json`.

## Preuves de vérification exécutées

Depuis `/Users/alex/Claude/.claude/skills/seo-geo-growth-agent` :

```bash
python3 scripts/validate_skill.py
```

Résultat :

```text
OK: skill repository validation passed
```

Commande de tests ciblés :

```bash
python3 -m pytest tests/test_site_capture.py tests/test_visual_html_audit.py
```

Résultat :

```text
5 passed in 14.03s
```

## Impact observé sur Swing Digital

Dans le rapport Swing Digital `2026-06-21-seo-geo-audit-lazy-load-proof`, la correction permet de documenter que le desktop avait des images chargées après scroll, pas des images cassées.

Lecture opérationnelle :

- le problème initial était un faux positif du protocole d’audit ;
- le site ne nécessitait pas de suppression de `loading="lazy"` ;
- la correction devait rester côté skill ;
- la preuve doit être conservée dans `responsive-study.json` et rendue visible dans le rapport HTML.

## Recommandation pour publication upstream

Préparer une pull request limitée aux `4` fichiers fonctionnels :

- `scripts/capture_site_screenshots.mjs`
- `scripts/generate_html_audit_report.py`
- `tests/test_site_capture.py`
- `tests/test_visual_html_audit.py`

Ne pas inclure dans cette pull request les changements de casse ou les remplacements `reference` vers `référence`, sauf décision explicite de les corriger proprement dans une PR séparée.
