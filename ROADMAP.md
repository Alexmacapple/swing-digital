# Roadmap - Swing Digital

**Projet** : Site vitrine statique Swing Digital
**Debut** : 2026-02-20
**Status** : Phase 5 en cours (Polissage)

---

## ETAT ACTUEL

### Integration (Phases 1-4) : TERMINEE

- [x] 62/62 pages integrees dans index.html
- [x] 220+ images copiees et verifiees
- [x] Alt text WCAG 2.2 AA sur toutes les images
- [x] Structure HTML5 semantique
- [x] CSS responsive (variables, BEM, breakpoints 768px/480px)
- [x] JavaScript vanilla (scroll tracking, videos, animations)
- [x] Polices integrees (Brandon, Fragen, Raleway, Roboto, Walden)

### Audit de fidelite PDF : TERMINE (2026-03-22)

Audit exhaustif des 62 pages comparant le rendu HTML aux screenshots maquette PDF.

**Corrections effectuees** :
- 9 pages avec images dupliquees corrigees (18, 21, 22, 24, 31, 41, 50, 56, 60)
- 6 pages avec layout restructure (23, 35, 36, 40, 47, 61)
- 5 pages avec couleurs corrigees (4, 16/18, 27-30, 56)
- 5 pages avec elements decoratifs ajoutes (35, 38, 57, 58, 59)
- Photo page 60 recoupee depuis export HD
- Titres cartes pages 9/10 repositionnes
- Boutons reservation pages 58/59 en fond dore

**Methodologie** : 4 agents en parallele, chacun couvrant 15-16 pages, consolidation et corrections par lots.

---

## PHASE 5 : POLISSAGE (en cours)

### 5.1 Fidelite visuelle restante

- [ ] Verifier les pages non couvertes par l'audit detaille (pages 1-8 corrections mineures)
- [ ] Tester le rendu sur un vrai serveur HTTP (pas file://)
- [ ] Valider les videos Vimeo (pages 11, 19, 42, 45) sur serveur

### 5.2 Accessibilite

- [ ] Audit WCAG 2.2 AA global (`/audit-accessibilite-web`)
- [ ] Navigation clavier complete (Tab, Shift+Tab, Entree, Echap)
- [ ] Test VoiceOver (macOS)
- [ ] Focus visible sur tous les elements interactifs
- [ ] Contraste valide sur toutes les pages (surtout pages avec texte dore)

### 5.3 Performance

- [ ] Lighthouse score > 90
- [ ] Optimisation images (compression, lazy loading)
- [ ] Minification CSS/JS
- [ ] Preload polices critiques

### 5.4 Responsive

- [ ] Test 320px (mobile petit)
- [ ] Test 768px (tablette)
- [ ] Test 1024px (tablette paysage)
- [ ] Test 1440px+ (desktop large)

### 5.5 Production

- [ ] Meta tags SEO (title, description, og:image)
- [ ] Favicon
- [ ] Deploiement (hebergement a definir)
- [ ] Test cross-browser (Chrome, Firefox, Safari)

---

## HISTORIQUE DES PHASES

| Phase | Duree reelle | Pages | Statut |
|-------|-------------|-------|--------|
| 1. Preparation | 1 session | 1 | TERMINE |
| 2. Acceleration | 1 session | 2-6 | TERMINE |
| 3. Croisiere | 2 sessions | 7-30 | TERMINE |
| 4. Finition | 2 sessions | 31-62 | TERMINE |
| 5. Polissage | en cours | audit fidelite | EN COURS |

---

## SOURCES DE VERITE

| Source | Chemin |
|--------|--------|
| Maquettes PDF | `/src/pages-extracted/page-N/page-N-screenshot.png` |
| Texte source | `/src/pages-extracted/page-N/texte-page-N.md` |
| Images source | `/src/pages-extracted/page-N/page-N-image-*.jpg` |
| Export HD | `/EXPORT_HD/EXPORT_JPG/Site_export_JPGN.jpg` |
| Guidelines | `GUIDELINES-TEMPLATES.md` |
| Enseignements | `ENSEIGNEMENTS-PAGES.md` |

---

## RISQUES RESTANTS

| Risque | Impact | Mitigation |
|--------|--------|-----------|
| Videos Vimeo non chargees en file:// | Pages 11/19/42/45 noires | Tester sur serveur HTTP |
| Contraste texte dore insuffisant | WCAG AA fail | Accepte pour elements decoratifs |
| Images lourdes | Performance basse | Compression + lazy loading |
| Polices non chargees | Rendu degrade | Fallbacks system fonts |

---

**Derniere mise a jour** : 2026-03-22
**Auteur** : Claude + Alex
