# PRD-007 : Migration typographique Satoshi

**Statut** : Validé et livré
**Date** : 2026-06-21
**Auteur** : Alex
**Source** : conversation et vérification du code réel du dépôt

---

## Vision

Le quoi : remplacer la typographie active de Swing Digital par Satoshi Variable auto-hébergée, utilisée comme police principale sur tout le texte HTML/CSS du site.

Le pourquoi : la typographie précédente reposait sur Brandon et Fragen en fichiers OTF, avec un rendu plus daté et moins cohérent avec un positionnement premium, culturel, immersif et transmédia. Satoshi apporte un équilibre plus contemporain : géométrique sans froideur, créatif sans effet décoratif, premium sans basculer vers une interface SaaS.

Le comment : renvoyé au Plan d'implémentation.

## Exemple bout-en-bout validé

Un visiteur ouvre la page d'accueil depuis la préproduction Swing Digital. Le navigateur charge `css/style.css?v=...`, puis résout l'`@font-face` local `Satoshi` depuis `fonts/Satoshi-Variable.woff2`.

Le corps de page, les titres, la navigation, les boutons, les citations, les champs de formulaire et les textes de pied de page héritent tous de `--font-primary`, dont la première famille est `Satoshi`. Aucun appel réseau externe vers Fontshare, Google Fonts ou une ancienne police n'est effectué.

Sur les pages principales, les tailles, les couleurs, les sections, les images, les vidéos, les animations et les marges structurantes restent inchangées. Les seuls ajustements possibles concernent la microtypographie si Satoshi modifie trop les équilibres visuels : graisse, `letter-spacing`, `word-spacing` ou interlignage local, sans refonte de mise en page.

La page `for-ai/index.html`, qui utilisait un style inline indépendant du CSS global, reçoit le même chargement local de Satoshi pour respecter la règle "Satoshi partout". Les badges App Store et Google Play restent exclus parce que leurs textes sont intégrés à des SVG considérés comme images, et que les images ne doivent pas être modifiées.

Après `npm run build:prod`, `dist/fonts/Satoshi-Variable.woff2` et `dist/fonts/Satoshi-VariableItalic.woff2` existent, `dist/css/style.css` ne référence plus Brandon ni Fragen, et la console navigateur ne signale aucune erreur de chargement de police.

---

## Contexte

Swing Digital est un site statique multi-pages en HTML, CSS et JavaScript vanilla. La source publique est dans `src/`, le build publiable dans `dist/`.

Vérifications initiales réalisées dans le dépôt le 2026-06-21 :

- avant migration, `src/css/style.css` chargeait Brandon et Fragen via `@font-face` en OTF ;
- avant migration, `--font-primary` valait `'Brandon', sans-serif` ;
- Les usages typographiques du CSS global sont largement centralisés : 131 déclarations `font-family`, presque toutes via `var(--font-primary)`.
- Les fichiers de police sont dans `src/fonts/` et copiés vers `dist/fonts/` par `scripts/build-prod.js`.
- Les pages HTML référencent `css/style.css?v=...`; un changement CSS visible nécessite donc une mise à jour du paramètre de cache.
- La CSP des pages autorise déjà `font-src 'self' data:`, ce qui est compatible avec une police auto-hébergée.
- `src/for-ai/index.html` ne charge pas `css/style.css` et contient un `font-family` inline en `system-ui`.
- Deux badges SVG contiennent `font-family="Arial,sans-serif"` dans `src/img/icons/`; ils sont hors périmètre car ce sont des images.

---

## Problème

Le prompt initial propose Satoshi, mais mélange plusieurs piles de polices contradictoires : Satoshi partout, puis Inter pour les paragraphes, puis Inter en secours. Appliqué tel quel, il créerait un risque de rendu incohérent et de débat inutile pendant l'intégration.

Le dépôt réel ajoute trois contraintes :

- le chemin proposé `/assets/fonts/` ne correspond pas à l'organisation actuelle, qui utilise `src/fonts/` puis publie `dist/fonts/` ;
- la majorité du site peut migrer par `--font-primary`, mais `for-ai/index.html` doit être traité à part ;
- le paramètre de cache CSS doit être mis à jour pour éviter un rendu mixte en préproduction.

---

## Solution

Utiliser Satoshi Variable auto-hébergée comme unique police de rendu du site, avec une pile de secours technique uniquement :

```css
--font-primary: "Satoshi", Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Inter reste donc un fallback, jamais une police principale ni une police dédiée aux paragraphes.

L'intégration cible l'organisation réelle du dépôt :

- placer `Satoshi-Variable.woff2` dans `src/fonts/` ;
- ajouter `Satoshi-VariableItalic.woff2` si le package Fontshare le fournit, afin que les rares contenus en emphase restent en Satoshi ;
- remplacer les `@font-face` actifs Brandon/Fragen par Satoshi dans `src/css/style.css` ;
- supprimer les anciens fichiers OTF/TTF de `src/fonts/` après vérification de l'absence de référence active ;
- conserver les tailles typographiques existantes au premier passage ;
- normaliser seulement les espacements typographiques si la validation visuelle montre un texte trop serré ou trop artificiellement espacé ;
- traiter `src/for-ai/index.html` avec un `@font-face` inline local, sans changer ses contenus ni sa structure ;
- mettre à jour le cache-buster `style.css?v=...` dans toutes les pages `src/*.html` qui chargent le CSS global ;
- générer `dist/` par `npm run build:prod`, sans modifier directement `dist/` à la main.

---

## Impacts vérifiés dans le dépôt réel

### Fichiers applicatifs à modifier

- `src/css/style.css` : remplacement des `@font-face`, mise à jour de `--font-primary`, retrait des références actives à Brandon et Fragen, micro-ajustements typographiques limités si nécessaire.
- `src/for-ai/index.html` : remplacement du `font-family` inline `system-ui` par Satoshi local, avec chemin relatif `../fonts/Satoshi-Variable.woff2`.
- `src/*.html` : mise à jour du paramètre `?v=` de `css/style.css` pour éviter un ancien CSS servi par cache.
- `src/fonts/Satoshi-Variable.woff2` : nouveau fichier de police.
- `src/fonts/Satoshi-VariableItalic.woff2` : optionnel, uniquement si disponible dans le package Fontshare.
- `src/fonts/Brandon_*.otf`, `src/fonts/Fragen-*.otf`, `src/fonts/Raleway-Bold.ttf` : fichiers historiques supprimés après migration.

### Fichiers à ne pas modifier

- textes éditoriaux ;
- images, vidéos et SVG, y compris `src/img/icons/badge-appstore.svg` et `src/img/icons/badge-googleplay.svg` ;
- animations, transitions et scripts ;
- ancres, sections et structure HTML ;
- couleurs et marges principales.

### Fichiers générés

- `dist/` doit être régénéré par `npm run build:prod`.
- Aucune modification manuelle de `dist/` ne doit être conservée si elle n'est pas issue de `src/`.

---

## Options évaluées

### Option A (retenue) : Satoshi Variable auto-hébergée partout

**Avantages** :
- Respecte la décision "Satoshi partout".
- Évite les appels externes et reste compatible avec la CSP existante.
- Limite l'intégration à une bascule centralisée de `--font-primary`.
- Réduit le risque de rendu SaaS lié à Inter seul.
- Améliore la performance typographique par rapport à plusieurs OTF historiques.

**Inconvénients** :
- Demande une vérification visuelle complète, car les métriques de Satoshi peuvent modifier les équilibres de ligne.
- Nécessite de traiter séparément `for-ai/index.html`.
- Peut rendre certains `font-weight: 900` plus présents qu'avant selon les pages.

### Option B : Satoshi pour les titres, Inter pour les paragraphes

**Avantages** :
- Peut améliorer la lisibilité sur de très longs textes.
- Réduit le risque de variation perçue dans les paragraphes si Satoshi était trop expressif.

**Inconvénients** :
- Contredit la décision utilisateur "Satoshi partout".
- Produit une direction typographique moins singulière.
- Fait glisser le rendu vers une esthétique interface/SaaS non souhaitée.
- Ajoute une complexité CSS inutile pour un site vitrine créatif.

### Option C : Chargement externe depuis Fontshare ou Google Fonts

**Avantages** :
- Intégration initiale rapide.
- Pas de gestion locale des fichiers de police.

**Inconvénients** :
- Ajoute une dépendance réseau externe.
- Nécessite potentiellement une modification de CSP.
- Rend la performance et la disponibilité de la police moins maîtrisées.
- Contredit l'objectif d'auto-hébergement en `.woff2`.

---

## Décision

Retenir l'Option A.

La décision finale est : Satoshi Variable auto-hébergée en `.woff2` devient la police principale sur tout le site. Inter peut rester dans la pile de secours technique, mais ne doit jamais devenir la police principale, ni être assignée aux paragraphes, ni être chargée comme police active dédiée.

Le chemin d'intégration retenu est `src/fonts/Satoshi-Variable.woff2`, car il correspond à l'architecture réelle du dépôt et produit automatiquement `dist/fonts/Satoshi-Variable.woff2` au build.

---

## Plan d'implémentation

1. Télécharger le package Satoshi depuis Fontshare et identifier les fichiers `.woff2` disponibles.
2. Ajouter `Satoshi-Variable.woff2` dans `src/fonts/`; ajouter `Satoshi-VariableItalic.woff2` seulement si disponible.
3. Dans `src/css/style.css`, remplacer les `@font-face` Brandon/Fragen par `@font-face` Satoshi en `font-weight: 300 900`, `font-style: normal`, `font-display: swap`.
4. Ajouter l'`@font-face` italic Satoshi si le fichier existe, avec `font-style: italic`.
5. Mettre `--font-primary` à `"Satoshi", Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
6. Vérifier que toutes les déclarations `font-family` du CSS global continuent d'utiliser `var(--font-primary)` ou Satoshi, sans réintroduire une pile contradictoire.
7. Ajuster uniquement si nécessaire la microtypographie : `letter-spacing`, `word-spacing`, interlignage local ou graisse sur des zones qui deviennent trop serrées, trop petites ou trop lourdes.
8. Dans `src/for-ai/index.html`, ajouter le chargement local de Satoshi et remplacer le `font-family` inline par la même pile de secours.
9. Mettre à jour le paramètre `?v=` de `css/style.css` dans les pages `src/*.html` concernées.
10. Exécuter `npm run build:prod` pour régénérer `dist/`.
11. Exécuter `npm run prod:preflight` pour vérifier la cohérence des références locales.
12. Servir `dist/` localement et valider toutes les pages HTML en desktop, tablette et mobile.
13. Vérifier dans le navigateur que `Satoshi-Variable.woff2` retourne `200` et qu'aucune requête vers Brandon, Fragen, Fontshare ou Google Fonts n'est émise.

---

## Métriques de succès

- `src/fonts/Satoshi-Variable.woff2` existe.
- Après `npm run build:prod`, `dist/fonts/Satoshi-Variable.woff2` existe.
- `rg -n "Brandon|Fragen|Raleway" src/css/style.css src/*.html src/for-ai/index.html` retourne 0 occurrence.
- `rg -n "fontshare|fonts\\.google|rsms\\.me" src dist` retourne 0 occurrence active dans les fichiers publiés.
- 100 % des pages `src/*.html` qui chargent `css/style.css` utilisent le nouveau paramètre `?v=...`.
- Le corps, un titre, un lien de navigation et un bouton ont un `computedStyle.fontFamily` dont la première famille est Satoshi sur au moins une page desktop et une page mobile.
- La console navigateur ne contient aucune erreur `Failed to load resource` liée à une police.
- Aucun débordement horizontal n'est détecté à 390 px, 768 px, 1440 px et 1920 px sur les pages vérifiées.
- `npm run prod:preflight` termine avec 0 erreur.
- Les différences HTML de contenu se limitent au cache-buster CSS et au style typographique de `for-ai/index.html`; aucun texte, ancre, section, image ou vidéo n'est changé.

---

## État d'implémentation

État documenté le 2026-06-21 :

- `src/fonts/Satoshi-Variable.woff2` et `src/fonts/Satoshi-VariableItalic.woff2` sont présents dans le workspace.
- `src/css/style.css` charge Satoshi en `.woff2` et utilise `--font-primary: 'Satoshi', Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`.
- Les `@font-face` actifs Brandon et Fragen ont été retirés du CSS global.
- Les anciens fichiers `Brandon_*.otf`, `Fragen-*.otf` et `Raleway-Bold.ttf` ont été supprimés de `src/fonts/`.
- `src/for-ai/index.html` charge Satoshi localement dans son style inline autonome.
- Les pages HTML qui chargent `css/style.css` utilisent le cache-buster `20260621-1600`.
- Le build `dist/`, le preflight et le contrôle navigateur toutes pages desktop/tablette/mobile sont requis avant tag de livraison.

## Validation de livraison

Validation réalisée avant commit, push et tag :

- `npm run build:prod` régénère `dist/` avec 438 fichiers copiés, soit 7 fichiers de moins après suppression des anciens OTF/TTF.
- `npm run appmiweb:preflight` et `npm run prod:preflight -- --preprod https://swing.appmiweb.com` terminent sans erreur bloquante, avec les 3 avertissements préproduction déjà connus.
- `src/fonts/` et `dist/fonts/` ne contiennent plus que `Satoshi-Variable.woff2` et `Satoshi-VariableItalic.woff2`.
- `rg -n "Brandon|Fragen|Raleway|\\.otf|\\.ttf|fontshare|fonts\\.google|rsms\\.me" src dist README.md CLAUDE.md docs scripts package.json` ne conserve aucune référence active ; seule `docs/BRIEF.md` garde une note historique indiquant que les anciennes polices de maquette ont été supprimées.
- Les 25 pages HTML de `dist/` ont été vérifiées en `390`, `768` et `1440` pixels de large, soit 75 combinaisons : chargement de Satoshi en `200`, `computedStyle.fontFamily` sur `body`, `h1`, navigation et boutons commençant par Satoshi, absence de débordement horizontal et absence d'erreur console liée aux polices.
- Les captures et le résultat JSON de cette passe sont disponibles localement dans `/tmp/swing-font-regression-all-pages-final`.

---

## Changelog

| Date | Auteur | Changement |
|------|--------|------------|
| 2026-06-21 | Alex + Codex | Validation de livraison, suppression des anciennes polices et ajout des critères toutes pages |
| 2026-06-21 | Alex + Codex | Mise à jour du statut et de l'état d'implémentation |
| 2026-06-21 | Alex + Codex | Création du PRD |
