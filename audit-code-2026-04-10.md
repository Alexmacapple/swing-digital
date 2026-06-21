# Audit de code swing-digital — 10 avril 2026

Rapport d'audit ciblé sur le code source JavaScript (applicatif + tests Playwright) réalisé via le skill `/sg-code-audit` en mode `quick`, `report-only` puis correctif ponctuel.

Ce rapport complète `AUDIT-COMPLET.md` (audit pré-prod global du 6 avril 2026) en apportant une analyse de qualité du code JS et des tests E2E.

> Mise à jour 2026-06-21 : ce rapport reste un audit historique du code JS et des tests d'avril. Depuis, le projet dispose d'un packaging `dist/`, d'une préproduction Appmiweb, de PRD SEO/GEO, Satoshi, 404 et transcripts ; le harnais Playwright versionné doit toutefois être restauré.

---

## État courant au 2026-06-21

- `npm test` observé : échec `No tests found`, aucun fichier de test versionné dans `tests/`.
- `npm run seo:check` observé : échec `No tests found`, `tests/seo-geo.spec.js` absent.
- `npm run appmiweb:preflight` observé : OK avec avertissements préproduction attendus.
- La préproduction `https://swing.appmiweb.com` sert `robots.txt`, `sitemap.xml`, `llms.txt` et les pages publiques du sitemap.
- Les chantiers restants de production sont cadrés dans `prd-meta-workflow/PRD-001-seo-geo-production.MD`.

Les nombres de tests et constats ci-dessous décrivent l'état du 2026-04-10 et ne doivent pas être utilisés comme preuve actuelle.

---

## Contexte

- **Date** : 2026-04-10
- **Outil** : `/sg-code-audit quick --report-only` (5 agents prévus, réduits à 2 pour cohérence avec la taille du code)
- **Modèle** : Claude Sonnet (2 agents en parallèle)
- **Durée totale** : environ 4 minutes 26 secondes (en parallèle)
- **Périmètre volontairement restreint** au code source JS, les 24 pages HTML et les CSS étant couverts par d'autres outils dédiés (`/audit-accessibilite-web`, `/audit-rgaa`, tests visuels)

---

## Périmètre audité

| Zone | Fichiers | Lignes | Rôle |
|------|----------|--------|------|
| z01 | `src/js/main.js` | 728 | Applicatif (navigation, vidéos, animations, scroll, clavier) |
| z02 | `tests/accessibilite.spec.js` | 86 | Tests Playwright accessibilité |
| z02 | `tests/navigation.spec.js` | 79 | Tests Playwright navigation |
| z02 | `tests/responsive.spec.js` | 61 | Tests Playwright responsive |
| z02 | `tests/structure.spec.js` | 85 | Tests Playwright structure HTML |
| z02 | `playwright.config.js` | 36 | Configuration Playwright |
| **Total** | **6 fichiers** | **1 075 lignes** | |

Le découpage en 2 zones (au lieu des 5 prévues par le mode `quick`) a été adapté à la taille du projet : splitter `main.js` en plusieurs morceaux aurait créé des recouvrements artificiels entre agents.

---

## Résultats agrégés

### Par sévérité

| Sévérité | Nombre | Zone z01 (main.js) | Zone z02 (tests) |
|----------|--------|--------------------|------------------|
| critical | 3 | 0 | 3 |
| high | 5 | 1 | 4 |
| medium | 15 | 6 | 9 |
| low | 9 | 5 | 4 |
| **Total** | **32** | **12** | **20** |

### Par catégorie

| Catégorie | Nombre |
|-----------|--------|
| logic-error | 8 |
| other (sélecteurs fragiles) | 5 |
| infra (config Playwright) | 4 |
| silent-exception | 3 |
| resource-leak | 3 |
| accessibility | 3 |
| performance | 2 |
| api-guard | 1 |
| race-condition | 1 |
| error-handling | 1 |
| dead-code | 1 |

---

## Bugs critiques (3)

Les trois bugs critiques partagent le même anti-pattern dans les tests Playwright : des `if (width > 1024)` ou `if (width <= N)` **sans branche `else` ni `test.skip()`**. Résultat : sur un viewport qui ne satisfait pas la condition, le test se termine en VERT sans exécuter aucune assertion. Faux positif silencieux garanti.

| ID | Fichier | Ligne | Titre |
|----|---------|-------|-------|
| r1-z02-001 | `tests/accessibilite.spec.js` | 13, 28, 43 | Dropdown Escape, navigation flèches et hamburger Escape — condition sans else |
| r1-z02-002 | `tests/navigation.spec.js` | 23 | Menu principal 4 liens desktop — condition sans else |
| r1-z02-003 | `tests/responsive.spec.js` | 28, 40, 51 | Grilles colonne unique (page 9, page 6, footer) — conditions sans else |

**Remarque importante sur le décompte de l'agent** : l'agent a initialement listé 7 tests concernés dans `navigation.spec.js`, mais 3 étaient des faux positifs de sa part :

- `navigation.spec.js:33` (hamburger visible/caché) possède bien une branche `else` avec `toBeHidden` — non affecté
- `navigation.spec.js:45` (dropdown ouvre au clic) place ses assertions **hors** du `if` — le `if` ne conditionne que le clic préalable sur le burger en mobile
- `navigation.spec.js:62` (sous-menu Monroe) même structure que le précédent

Ces 3 tests fonctionnent correctement et n'ont pas été touchés.

---

## Bugs high (5)

| ID | Fichier | Ligne | Titre |
|----|---------|-------|-------|
| r1-z01-004 | `src/js/main.js` | 463 | Déréférencement null dans la boucle reset de `initPodcastPlayer` |
| r1-z02-004 | `tests/accessibilite.spec.js` | 63 | `waitForTimeout(300)` fixe après scroll — test flaky |
| r1-z02-005 | `tests/navigation.spec.js` | 19 | `response.status()` sans garde null — crash si la navigation échoue |
| r1-z02-006 | `playwright.config.js` | 20 | Projet `desktop-1024` jamais couvert par les tests `> 1024` strict |
| r1-z02-007 | `playwright.config.js` | 13 | Breakpoints 480 et 600 px absents des projets Playwright |

### Détail du bug `r1-z01-004`

```javascript
// Avant (main.js:461-464)
episodes.forEach(function(e) {
    e.classList.remove('page33__episode--active');
    e.querySelector('.page33__episode-btn').removeAttribute('aria-current');
});
```

La boucle externe (ligne 453-455) vérifie bien que `btn` existe pour l'épisode courant. Mais la boucle interne (ligne 461-464) qui réinitialise l'état des autres épisodes appelle `querySelector(...).removeAttribute(...)` sans null check. Si un épisode HTML ne contient pas `.page33__episode-btn` (refactor CSS, HTML incomplet), un clic sur n'importe quel épisode lève un `TypeError`.

---

## Bugs medium (15) — synthèse par thème

### Dans main.js (6)

| ID | Ligne | Thème |
|----|-------|-------|
| r1-z01-001 | 111 | Focus trap hamburger incomplet (WCAG 2.1.2) — Tab peut sortir du menu ouvert |
| r1-z01-003 | 198 | `setTimeout` dans `focusout` du dropdown sans `clearTimeout` — accumulation possible |
| r1-z01-005 | 389 | Promesses Vimeo `player.play()` / `player.pause()` non gérées — désynchronisation `aria-pressed` possible |
| r1-z01-006 | 366 | Script Vimeo chargé dynamiquement sans `onerror` — échec silencieux si CDN inaccessible |
| r1-z01-010 | 67 | `endsWith()` sur `pathname` peut poser `aria-current` sur le mauvais lien (faux positif de suffixe) |
| r1-z01-011 | 434 | `textContent` sur bouton disclosure détruit les enfants (icônes futures) |

### Dans les tests Playwright (9)

| ID | Fichier | Thème |
|----|---------|-------|
| r1-z02-008 | accessibilite | Sélecteur `:focus` fragile pour vérifier le skip link |
| r1-z02-009 | accessibilite | Couplage fort aux classes BEM internes |
| r1-z02-010 | navigation | Couplage fort aux classes BEM internes |
| r1-z02-011 | structure | Sélecteurs CSS internes fragiles |
| r1-z02-012 | responsive | Détection colonne unique via `split(' ').length` fragile |
| r1-z02-013 | structure | Assertion `toBeGreaterThan(5)` sur titre — trop laxiste |
| r1-z02-014 | playwright.config | `retries: 0` et `trace` absente — diagnostic CI dégradé |
| r1-z02-015 | accessibilite | Aucun scan axe-core malgré l'objectif déclaré « 0 violation » |
| r1-z02-016 | structure | Boucle 24 × 9 = 216 tests séquentiels au lieu d'un test groupé par page |

---

## Bugs low (9) — liste brève

| ID | Fichier | Ligne | Thème |
|----|---------|-------|-------|
| r1-z01-002 | main.js | 90 | `keydown` et `click` globaux `initHamburger` sans référence de cleanup |
| r1-z01-007 | main.js | 325 | `IntersectionObserver` scroll tracking jamais déconnecté |
| r1-z01-008 | main.js | 476 | `prefers-reduced-motion` non réactif au changement dynamique |
| r1-z01-009 | main.js | 677 | Catch silencieux dans `initContactVideo` sans log de diagnostic |
| r1-z01-012 | main.js | 466 | `aria-current="true"` non valide sémantiquement (épisodes podcast) |
| r1-z02-017 | structure | 36 | `page.goto()` sans `waitUntil` explicite |
| r1-z02-018 | config | 4 | `workers` non configuré — comportement non déterministe local / CI |
| r1-z02-019 | navigation | 64 | Variable `width` partiellement inutilisée |
| r1-z02-020 | config | 4 | `outputDir` non défini — `test-results/` implicite |

---

## Correctifs appliqués

Commit : **`a342734`** sur `main`, poussé sur `origin/main`.

### Les 8 éditions

| # | Fichier | Bug traité | Nature du fix |
|---|---------|------------|---------------|
| 1 | `src/js/main.js:463` | r1-z01-004 (high) | Ajout d'une variable `otherBtn` + `if` avant `removeAttribute` |
| 2 | `tests/accessibilite.spec.js:13` | r1-z02-001 (critical) | `test.skip(width < 1024, 'Desktop only')` + dé-indentation |
| 3 | `tests/accessibilite.spec.js:28` | r1-z02-001 (critical) | idem |
| 4 | `tests/accessibilite.spec.js:43` | r1-z02-001 (critical) | `test.skip(width >= 1024, 'Mobile only')` + dé-indentation |
| 5 | `tests/navigation.spec.js:23` | r1-z02-002 (critical) | `test.skip(width < 1024, 'Desktop only')` |
| 6 | `tests/responsive.spec.js:28` | r1-z02-003 (critical) | `test.skip(width > 600, 'Mobile only (<= 600px)')` |
| 7 | `tests/responsive.spec.js:40` | r1-z02-003 (critical) | `test.skip(width > 768, 'Mobile/tablette only (<= 768px)')` |
| 8 | `tests/responsive.spec.js:51` | r1-z02-003 (critical) | `test.skip(width > 480, 'Mobile only (<= 480px)')` |

### Effet secondaire positif

Le passage de `if (width > 1024)` (strict) à `test.skip(width < 1024)` **corrige aussi le bug `r1-z02-006`** (high) : le projet Playwright `desktop-1024` (viewport width = 1024) devient maintenant couvert par les tests desktop, ce qui était impossible avec la condition strictement supérieure.

### Bilan des correctifs

**Bugs neutralisés** : 1 high + 3 critical + 1 high corrélatif = **5 bugs** avec 8 éditions localisées.

### Vérifications exécutées

| Vérification | Résultat |
|--------------|----------|
| `node --check src/js/main.js` | exit 0 |
| `node --check tests/accessibilite.spec.js` | exit 0 |
| `node --check tests/navigation.spec.js` | exit 0 |
| `node --check tests/responsive.spec.js` | exit 0 |
| `npx playwright test --list` | 984 tests énumérés (4 projets × 246 tests), parsing OK |
| Hook pre-commit | OK |
| `git pull --ff-only` | Already up to date |
| `git push origin main` | `26d3827..a342734  main -> main` |

**Non exécuté** : `npx playwright test` (run complet). Nécessite un serveur web sur le `baseURL` du projet, non vérifié lors de cette session. Seule la syntaxe et l'énumération des tests sont validées pour l'instant.

---

## Reste à traiter

27 bugs non corrigés lors de cette session, classés par priorité de correction suggérée.

### Priorité 1 — Valeur ajoutée claire, effort faible

- **r1-z01-004** — corrigé
- **r1-z02-015** (medium) — ajouter `@axe-core/playwright` et un test de scan axe-core sur les 24 pages, pour verrouiller automatiquement l'objectif « 0 violation » déclaré dans `CLAUDE.md`
- **r1-z02-014** (medium) — ajouter `retries: process.env.CI ? 2 : 0` et `trace: 'retain-on-failure'` dans `playwright.config.js`
- **r1-z02-007** (high) — ajouter un projet Playwright à 600 px pour couvrir ce breakpoint
- **r1-z01-010** (medium) — corriger le `endsWith()` en comparaison stricte sur le dernier segment

### Priorité 2 — Valeur ajoutée claire, effort moyen

- **r1-z02-009, 010, 011** (medium × 3) — migration progressive des sélecteurs BEM vers `getByRole`, `getByLabel`, `getByText`. Refactor large à traiter en une passe dédiée
- **r1-z01-001** (medium) — implémenter un focus trap complet pour le hamburger mobile (conformité WCAG 2.1.2)
- **r1-z01-005, 006** (medium × 2) — gérer les erreurs Vimeo (promesses `.catch()` + `script.onerror`)

### Priorité 3 — Amélioration de robustesse

- Les 9 bugs low dans main.js et les tests
- **r1-z02-012** (medium) — améliorer la détection de colonne unique CSS
- **r1-z02-016** (medium) — regrouper les 9 assertions par page dans un seul test pour passer de 216 à 24 tests structure

---

## Notes méthodologiques

### Leçons de cette session

1. **Le skill `/sg-code-audit` en mode `quick` (5 agents) n'est pas adapté aux petites bases de code**. Pour swing-digital (6 fichiers JS), l'adaptation à 2 agents a été nécessaire — penser à ce cas pour les futurs audits de projets statiques.

2. **Les agents d'audit peuvent sur-compter des bugs**. L'agent z02 a listé 7 tests critical alors que seuls 4 l'étaient vraiment. La relecture manuelle des fichiers avant application des fixes est indispensable — ne pas faire confiance aveugle au rapport JSON.

3. **Le skill par défaut écrit dans `.code-audit-results/`** — pensé pour être gitignored. À ajouter au `.gitignore` lors du premier usage dans un projet.

4. **Le périmètre du skill est le code source**. Pour couvrir les HTML statiques, l'accessibilité ou les CSS, utiliser les skills dédiés (`/audit-accessibilite-web`, `/audit-rgaa`, tests visuels). Ne pas essayer d'étendre artificiellement `sg-code-audit`.

### Commandes utiles pour la suite

```bash
# Relancer un audit complet (tous les bugs, y compris ceux non fixés)
/sg-code-audit quick --report-only

# Audit plus profond (2 rounds : surface + depth)
/sg-code-audit deep --report-only

# Audit ciblé sur un fichier précis
/sg-code-audit quick --focus=src/js/ --report-only

# Audit accessibilité web sur les 24 pages HTML (complément)
/audit-accessibilite-web
```

---

## Références

- **Audit pré-prod global** : `AUDIT-COMPLET.md` (6 avril 2026, score 9/10)
- **Résultats JSON bruts** : `.code-audit-results/` (gitignored)
  - `zone-z01-r1.json` — 12 bugs main.js
  - `zone-z02-r1.json` — 20 bugs tests
  - `audit-results.json` — agrégé + `impacted_routes`
- **Commit des fixes** : `a342734`
- **PRD du skill** : `/Users/alex/Claude/.claude/skills/sg-code-audit/`

---

Dernière mise à jour : 2026-04-10
