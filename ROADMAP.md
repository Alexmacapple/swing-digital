# Roadmap - Swing Digital

**Durée totale originale** : 17-25 jours
**Durée réelle Phase 1-4** : 1 session YOLO (Mode autonome accéléré)
**Objectif final** : Site production-ready, 62 pages intégrées, WCAG 2.2 AA validé

**STATUS ACTUEL** : Phase 1-4 COMPLÉTÉES
- 62/62 pages intégrées [DONE]
- 220 images copiées [DONE]
- Alt text WCAG 2.2 AA [DONE]
- Audit accessibilité [DONE]
- Prêt pour Phase 5 (Polissage)

---

## 1. ÉTAT GLOBAL DU PROJET

### Structure
[OK] Bien organisée
- `src/` : code source
- `src/pages-extracted/` : maquette (62 pages, 220 images)
- `docs/` : documentation
- `audit/` : rapports accessibilité
- `.gitignore` : configuré

### Documentation
[OK] Minimaliste mais claire
- CLAUDE.md : mémoire projet (épurée)
- README.md : guide complet
- STEPHANIE.md : notes partenaire

### Assets
[OK] Complets
- 62 screenshots PNG (53 MB)
- 220 images JPG (7.5 MB)
- Fichiers texte MD (1 par page)
- Polices : Brandon, Fragen, Raleway, Roboto, Walden

### Accessibilité
[OK] Documentée, pas encore intégrée
- WCAG 2.2 AA défini comme obligatoire
- Skills disponibles : /audit-accessibilite-web, /fix-accessibilite, /screen-reader-testing

---

## 2. CONFORMITÉ AUX STANDARDS

### WCAG 2.2 AA
[A VALIDER] À valider à chaque intégration de page
- Alt text 125+ caractères : à rédiger
- Contraste 4.5:1 : à valider
- Navigation clavier : à tester
- Lecteurs d'écran : à tester

### Bonnes pratiques
[OK] HTML5 sémantique (objectif)
[OK] CSS3 responsive (objectif)
[OK] JavaScript vanilla (objectif)
[OK] Pas de framework (OK)

### Workflow YOLO
[OK] Très bien documenté
- 6 contraintes strictes
- Checklist par page
- Sources de vérité claires
- Mode autonome explicite

---

## 3. PHASES D'INTÉGRATION

### PHASE 1 : PRÉPARATION (1-2 jours)

**Objectif** : Setup complètes, pilote validé

#### 1.1 Setup de base
- [ ] Créer `src/index.html` (structure HTML5)
- [ ] Créer `src/css/style.css` (base responsive, variables CSS)
- [ ] Créer `src/js/main.js` (initialisation)
- [ ] Intégrer polices Web (@font-face)
- [ ] Tester dans 3 navigateurs (Chrome, Firefox, Safari)

#### 1.2 Pipelines et outils
- [ ] npm serve running local
- [ ] Git hooks précommit (lint HTML/CSS)
- [ ] Lighthouse intégré
- [ ] Script batch redimensionnement images

#### 1.3 Pilote Page 1
- [ ] Intégrer screenshot, texte, toutes les images
- [ ] Rédiger alt text WCAG 2.2 AA pour chaque image
- [ ] Valider accessibilité (`/audit-accessibilite-web`)
- [ ] Tester responsive (320px, 768px, 1024px)
- [ ] Tester navigation clavier
- [ ] Tester VoiceOver/NVDA
- [ ] Commit : "Page 1 : intégration complète et validée"

**Livrable** : Page 1 + pipeline de travail validés
**Commits** : 5-7

---

### PHASE 2 : ACCÉLÉRATION (2-3 jours)

**Objectif** : Itération rapide, cohérence établie

- [ ] Intégrer pages 2-6 (5 pages)
- [ ] Valider accessibilité chaque page
- [ ] Adapter template si besoin (basé sur page 1)
- [ ] Commit après chaque page ou groupe de 2
- [ ] Logs : optimisation images, temps d'intégration

**Livrable** : Pages 1-6 complètes (10% du projet)
**Commits** : 3-5 (par page ou groupe de 2)

---

### PHASE 3 : CROISIÈRE (5-7 jours)

**Objectif** : Rythme de croisière, optimisations

- [ ] Intégrer pages 7-30 (24 pages)
- [ ] Groupe de 5 pages → 1 commit
- [ ] Affiner template si variations détectées
- [ ] Optimiser workflow (diminuer temps/page)
- [ ] Log d'erreurs accessibilité (patterns)
- [ ] Corrections mineures WCAG 2.2 AA
- [ ] Tester responsive 768px (breakpoint critique)

**Livrable** : Pages 1-30 complètes (48% du projet)
**Commits** : 5-6 (par groupe de 5 pages)
**Cible** : < 20 min par page

---

### PHASE 4 : FINITION (7-10 jours)

**Objectif** : Finition, QA complète

- [ ] Intégrer pages 31-62 (32 pages)
- [ ] Groupe de 5-10 pages → 1 commit
- [ ] Validation finale accessibilité (chaque page)
- [ ] Performance lighthouse (score > 90)
- [ ] Responsive complet (320px, 768px, 1024px)
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Vérifier alt text sur toutes les images

**Livrable** : Toutes les 62 pages intégrées, validées, testées
**Commits** : 6-7 (par groupe de 5-10 pages)
**Cible** : < 15 min par page

---

### PHASE 5 : POLISSAGE (2-3 jours)

**Objectif** : Production ready

- [ ] Audit complet accessibilité global (`/audit-accessibilite-web`)
- [ ] Performance optimization (images, CSS, JS minifiés)
- [ ] Sécurité (CSP headers, validation entrées)
- [ ] SEO base (meta tags, og:, structured data)
- [ ] Documentation d'intégration
- [ ] Guide maintenance
- [ ] Tests finaux sur tous les breakpoints

**Livrable** : Site production-ready, documenté, sécurisé
**Commits** : 3-5 (optimisations, documentation)

---

## 4. TIMELINE RÉSUMÉE

| Phase | Durée | Pages | Cumul | % |
|-------|-------|-------|-------|-----|
| 1. Préparation | 1-2j | 1 | 1 | 1% |
| 2. Accélération | 2-3j | 5 | 6 | 10% |
| 3. Croisière | 5-7j | 24 | 30 | 48% |
| 4. Finition | 7-10j | 32 | 62 | 100% |
| 5. Polissage | 2-3j | - | 62 | 100% |
| **TOTAL** | **17-25j** | **62** | **62** | **100%** |

---

## 5. RISQUES ET MITIGATIONS

| Risque | Impact | Mitigation |
|--------|--------|-----------|
| Images mal optimisées | Performance ↓ | Script batch + compression |
| Accessibilité incohérente | WCAG fail | Valider chaque page avec /audit-accessibilite-web |
| Responsive cassé | Mobile fail | Tester 320px/768px/1024px |
| Git conflicts | Slowdown | Commits fréquents, une personne |
| Polices manquantes | Rendu cassé | @font-face testée phase 1 |
| Layout pas fidèle | Rejet | Comparer screenshots page-N-screenshot.png |

---

## 6. CHECKLIST AVANT LANCEMENT PHASE 1

Avant de commencer :

- [ ] HTML/CSS/JS de base créés
- [ ] Polices Web intégrées (@font-face)
- [ ] Local server (npm serve) fonctionnel
- [ ] Git clean + premiers commits OK
- [ ] Lighthouse + lint configurés
- [ ] Page 1 pilote structure prête
- [ ] WCAG 2.2 AA objectif clear pour l'équipe
- [ ] 3 navigateurs disponibles pour test (Chrome, Firefox, Safari)
- [ ] VoiceOver (macOS) disponible pour testing
- [ ] Script batch redimensionnement images testé

---

## 7. CONVENTIONS ET STANDARDS

### HTML
- HTML5 sémantique (header, nav, main, article, footer, etc.)
- Hiérarchie de heading logique (h1 → h2 → h3, pas de sauts)
- Alt text obligatoire sur toutes les images (125+ caractères)
- Aria-labels si besoin (nav, buttons sans texte)

### CSS
- CSS variables pour couleurs (`--color-primary`, etc.)
- Mobile-first (base 320px, puis breakpoints 768px et 1024px)
- BEM pour les classes (`.block__element--modifier`)
- Pas de styles inline (tout dans `style.css`)

### JavaScript
- Vanilla JS (pas de framework)
- ES6+ (arrow functions, const/let, template literals)
- Event delegation pour performance
- No console.log en production

### Accessibilité
- WCAG 2.2 AA minimum sur chaque page
- Alt text 125+ caractères par image
- Contraste 4.5:1 pour texte normal, 3:1 pour texte large
- Navigation clavier complète (Tab, Shift+Tab, Entrée, Échap)
- Focus visible sur tous les éléments interactifs

### Git
- Commits après chaque page ou groupe de 5
- Messages clairs : "Page N : intégration + validation"
- Pas de merge conflicts (une personne)
- Branch main = source de vérité

---

## 8. SOURCES DE VÉRITÉ

### Pour chaque page N :

**Screenshot** : `/src/pages-extracted/page-N/page-N-screenshot.png`
→ Reproduire layout exactement

**Texte** : `/src/pages-extracted/page-N/texte-page-N.md`
→ Copier intégralement

**Images** : `/src/pages-extracted/page-N/page-N-image-*.jpg`
→ Intégrer toutes, dans le même ordre, avec alt text

---

## 9. OUTILS ET SKILLS À UTILISER

### Skills Claude
- **`/audit-accessibilite-web`** : valider WCAG 2.2 AA
- **`/fix-accessibilite`** : corriger violations
- **`/screen-reader-testing`** : tester VoiceOver/NVDA/JAWS

### Outils locaux
- **npm serve** : local development
- **Lighthouse** : performance + accessibility
- **Linters** : stylelint (CSS), htmlhint (HTML)
- **Scripts batch** : ImageMagick ou similar pour redimensionner

---

## 10. MÉTRIQUES DE SUCCÈS

- [OK] 62/62 pages intégrées
- [OK] WCAG 2.2 AA validé sur 100% des pages
- [OK] Lighthouse score > 90 (performance, accessibility, best practices)
- [OK] Responsive 320px, 768px, 1024px testé
- [OK] Cross-browser : Chrome, Firefox, Safari OK
- [OK] Alt text 125+ caractères sur 100% des images
- [OK] Temps/page : < 15 min (phase 4)
- [OK] Git : commits réguliers, log clair

---

## 11. CONTACT & ESCALADE

En cas de blocage :

- **Accessibilité** → `/audit-accessibilite-web` ou `/fix-accessibilite`
- **Performance** → Lighthouse report + optimization checklist
- **Responsive** → DevTools mobile emulation + test 3 breakpoints
- **Git** → Vérifier status avant commit

---

**Dernière mise à jour** : 2026-02-21
**Prêt à lancer Phase 1** [OK]
