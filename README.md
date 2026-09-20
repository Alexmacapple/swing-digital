# Swing Digital - Site vitrine

Site vitrine multi-pages pour Swing Digital, spécialiste des expériences immersives et espaces augmentés.

Site statique issu d'une maquette PDF de 62 pages, avec navigation 3 niveaux, page 404 personnalisée, couche IA publique et socle SEO/GEO configuré pour la production.

La version anglaise locale est servie sous `/en/` : 29 routes, sélecteur FR/EN,
ressources SEO/GEO dédiées et transcriptions anglaises. Elle est disponible sur
`main` au commit `f6de318`, mais n'est pas encore publiée sur `production`.

- Production cible : `https://www.swingdigitalproduction.com` — publication de `dist/` par la branche Git `production` dans le document root OVH.
- Recette GitHub Pages : flux arrêté après validation locale ; la désactivation effective du site reste à confirmer dans `Settings → Pages`.
- Travail et tests : en local uniquement, sur `localhost`.

## Démarrage rapide

```bash
npm test                        # suite Playwright complète, en local
npm run seo:check               # socle SEO/GEO, en local
npm run build:prod              # construit dist/
npm run prod:preflight -- https://www.swingdigitalproduction.com
```

Pour une lecture locale simple, avec le serveur qu'utilisent aussi les tests :

```bash
python3 scripts/serve-test.py 8080 src
# puis http://localhost:8080/
```

Attention : Playwright réutilise un serveur déjà présent sur le port 8080. S'il sert un autre arbre (un worktree, par exemple), les tests mesurent ce code-là : arrêter ce serveur avant `npm test`.

## Tests

```bash
npm test
# 45 fichiers de test sur 5 tailles d'écran (1920, 1024, 768, 600 et 375 px) : navigation, SEO/GEO,
# accessibilité, vidéos, transcriptions, et un test de géométrie par page recomposée d'après les exports de la cliente
```

Sur une machine chargée, cinq navigateurs en parallèle peuvent être tués en cours de route (« browser has been closed ») ; rejouer alors avec moins de parallélisme :

```bash
npm test -- --workers=2
```

Deux garde-fous transverses : `tests/t02-medias-entiers.spec.js` refuse toute photo rognée de plus de 8 % sur chacune des pages (hors cadrages voulus, listés dans le test), et `tests/images-espace-colorimetrique.spec.js` refuse tout JPEG encodé en CMJN.

Contrôle SEO/GEO ciblé :

```bash
npm run seo:check
# Exécute tests/seo-geo.spec.js sur desktop-1920
```

## Stack technique

- HTML5 sémantique (28 pages top-level + `/for-ai/`)
- CSS3 responsive (variables, BEM, mobile-first)
- JavaScript vanilla (navigation, vidéos, animations)
- Playwright configuré, harnais restauré pour PRD-011 et SEO/GEO local
- Lighthouse et contrôles SEO/GEO locaux avant production
- Police : Satoshi Variable auto-hébergée
- Pas de framework ni bundler

## Fonctionnalités

- Navigation 3 niveaux (menu, dropdown, sous-menu Monroe 11 liens)
- Fil d'Ariane sticky sous le header
- Bouton retour en haut de page
- Vidéo hero avec contrôle son
- Vidéo contact avec play/pause
- Footer de navigation secondaire (responsive)
- Page 404 hero, plan du site, mentions légales
- Favicon, Open Graph, Twitter Card et JSON-LD sur les pages indexables
- `robots.txt`, `sitemap.xml` et `llms.txt`
- Build de production `dist/` excluant les artefacts de travail
- Publication de production par branche Git dédiée contenant uniquement `dist/`
- Scripts de publication contrôlée : `scripts/publier-production.sh` et `scripts/synchroniser-production-ovh.sh`

## Accessibilité (WCAG 2.2 AA / RGAA 4.1)

- Dernier audit axe-core complet historique sans violation bloquante ; la suite Playwright actuelle couvre la taxonomie XR / Films et le socle SEO/GEO, pas encore un scan axe-core complet.
- Navigation clavier complète (Tab, Escape, flèches)
- Zoom 200% conforme (RGAA 10.4)
- Textes en casse normale, majuscules via CSS (RGAA 10.2)
- Intitulés de liens explicites (RGAA 6.1)
- prefers-reduced-motion respecté
- Contraste WCAG AA conforme

## Documentation

| Fichier | Contenu |
|---------|---------|
| CLAUDE.md | Mémoire projet, stack, composants, décisions |
| GUIDELINES-TEMPLATES.md | Conventions CSS/HTML, archétypes, classes BEM |
| ENSEIGNEMENTS-PAGES.md | Leçons apprises, erreurs récurrentes |
| PRD-DECOUPAGE.md | PRD découpe multi-pages (terminé) |
| PRD-BUILD-PARTIALS.md | PRD historique de factorisation HTML par partials |
| ROADMAP.md | Phases, todo pré-prod |
| AUDIT-COMPLET.md | Audit technique, SEO, a11y, sécurité, UX |
| docs/SEO-GEO-AUDIT.md | État SEO/GEO et passage en production |
| docs/EN-TRANSLATION-STATUS.md | État de la version anglaise et limites de validation |
| docs/EN-GLOSSARY-ROUTES.md | Glossaire EN et correspondance des 29 routes |
| docs/EN-SEO-GEO.md | Référencement bilingue et ressources EN |
| docs/SEO-GEO-PROD-CHECKLIST.md | Checklist go-live SEO/GEO |
| docs/404-CUSTOM-ERROR-PAGE.md | Configuration serveur de la page 404 personnalisée |
| docs/PRD-NAVIGATION-XR-FILMS.md | Cadrage source du menu XR / Films |
| docs/AUDIT-MAILLAGE-INTERNE-2026-06-21.md | Audit des liens internes et points éditoriaux à confirmer |
| prd-meta-workflow/PRD-001-seo-geo-production.MD | PRD mise en production SEO/GEO et mesure |
| prd-meta-workflow/PRD-007-migration-typographique-satoshi.MD | PRD migration typographique Satoshi |
| prd-meta-workflow/PRD-008-fonds-roses-adoucis.MD | PRD fonds roses adoucis |
| prd-meta-workflow/PRD-009-routage-404-personnalisee.MD | PRD routage de la page 404 personnalisée |
| prd-meta-workflow/PRD-010-transcripts-videos-accessibles.MD | PRD transcripts accessibles des vidéos et podcasts publics |
| prd-meta-workflow/PRD-011-menu-decoupage-xr-films.MD | PRD menu et découpage XR / Films |

## Ancienne recette GitHub Pages (flux arrêté)

GitHub Pages a servi de recette temporaire. Le flux de publication est désormais arrêté afin d'éviter de confondre l'URL de recette avec la production OVH. La désactivation effective du site doit être confirmée dans `Settings → Pages` du dépôt ; la branche `gh-pages` et le script de publication sont conservés comme historique technique, mais ne doivent plus être utilisés pour le lancement.

Pour réactiver volontairement une recette, il faudra d'abord décider une nouvelle URL et réautoriser Pages dans les réglages du dépôt. Ne pas exécuter le script ci-dessous dans le flux de production :

```bash
scripts/publier-gh-pages.sh --a-blanc
```

Le script historique faisait :

1. il refuse de publier hors de `main`, avec un arbre de travail non propre, ou si `main` n'est pas aligné sur `origin/main` ;
2. il reconstruit `dist/` par `npm run build:prod` ;
3. il copie `dist/` en miroir dans un worktree dédié à la branche `gh-pages` (`~/Claude-worktrees/swing-gh-pages`, créé au premier lancement ; autre emplacement par la variable `SWING_GH_PAGES_WORKTREE`) ;
4. il prépare la copie de recette : `noindex, nofollow` sur chaque page HTML, `robots.txt` qui interdit tout, fichier `.nojekyll` pour que Pages serve le site tel quel ;
5. il vérifie que toutes les pages portent le `noindex`, puis commite et pousse normalement sur `gh-pages`. Jamais de push forcé : l'historique de la branche s'allonge, mais les images, identiques à celles de `main`, ne sont stockées qu'une fois par git.

`src/` n'était jamais modifié. Cette recette n'est plus publiée.

Points à connaître :

- le site fonctionne sous le sous-dossier `/swing-digital/` parce qu'il n'utilise aucun chemin absolu à la racine : ne pas en introduire (`/css/…`, `/img/…`) ;
- la copie est publique, comme le dépôt, mais non référençable ; les balises canoniques continuent de désigner le domaine configuré par `npm run seo:set-base` ;
- les lecteurs YouTube et Vimeo acceptent ce domaine (vérifié le 2026-09-19). Pour le revérifier, utiliser un navigateur visible : un navigateur sans interface reçoit un refus de Vimeo (défi anti-robot), quel que soit le domaine ;
- pour réactiver une recette : décider explicitement de l'URL, réactiver Pages dans Settings → Pages, puis republier après contrôle du `noindex`.

## Production

La production cible `https://www.swingdigitalproduction.com`. La branche `production` contient uniquement le contenu généré de `dist/`. Le script Mac construit, contrôle et pousse cette branche ; le script OVH permet une synchronisation manuelle du document root si le webhook n'est pas utilisé.

Après avoir commité les changements sur `main`, lancer depuis le dépôt local :

```bash
./scripts/publier-production.sh
```

Le script vérifie `main`, lance `npm test`, `npm run seo:check`, `npm run build:prod` et le preflight, puis synchronise la branche `production` dans un worktree dédié et la pousse en SSH. Si le webhook OVH est actif, aucune commande supplémentaire n'est nécessaire sur le serveur.

Pour une synchronisation manuelle depuis le serveur, copier une fois `scripts/synchroniser-production-ovh.sh` dans le répertoire personnel OVH, puis l'exécuter depuis le document root. Le script refuse un dépôt absent ou modifié localement et n'utilise jamais de réinitialisation forcée.

Si le domaine public change, exécuter une seule fois `npm run seo:set-base -- https://nouveau-domaine.example` avant le build ; cette commande ne fait pas partie de la routine de publication courante.

---

**Dernière mise à jour** : 2026-09-21 — version EN poussée sur `main`, scripts de publication Mac/OVH et flux GitHub Pages documentés
**Version** : v18 — commit `f6de318` ; production EN, HTTPS et routage 404 à vérifier
