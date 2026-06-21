# PRD-008 : Fonds roses adoucis

**Statut** : Implémenté et publié en préproduction
**Date** : 2026-06-21
**Auteur** : Alex
**Source** : conversation, captures locales, préproduction publique et vérification du code réel du dépôt

---

## Vision

Le quoi : remplacer les grands fonds rouges décoratifs du site Swing Digital par des fonds roses plus doux, cohérents avec le dégradé de la page équipe.

Le pourquoi : le rouge plat actuel durcit la perception du site et attire l'attention comme une alerte, alors que l'univers visé est culturel, immersif, premium et narratif. Un rose dégradé, déjà présent dans la direction artistique de la page équipe, conserve l'énergie de marque tout en rendant les grandes surfaces moins agressives.

Le comment : renvoyé au Plan d'implémentation.

## Exemple bout-en-bout (projeté)

Un visiteur ouvre la page d'accueil puis navigue vers `index.html#page-8`, la section partenaires.

Avant le changement, cette grande zone repose sur `background-color: var(--color-bg-red)`, visuellement proche de la capture locale `/Users/alex/Desktop/2.jpg`. Le fond est lisible, mais la sensation est plus dure et plus signalétique que le reste de l'univers Swing Digital.

Après le changement, la section utilise un token de fond rose commun, dérivé de la référence `/Users/alex/Desktop/1.png` et de la page équipe `index.html#page-2`. Le rendu conserve le texte blanc, les logos, la grille et les espacements existants. La couleur fonctionnelle des boutons, des liens, des états de focus et des aides de contraste n'est pas remplacée par erreur.

Sur mobile, tablette et desktop, les grandes zones rouges deviennent visuellement plus proches du dégradé rose/orangé de l'équipe. Les images, vidéos, animations, transitions, textes, ancres et sections restent inchangés.

---

## Contexte

La référence publique indiquée est `https://swing.appmiweb.com/index.html#page-2`, qui correspond à la section équipe “Qui sommes nous ?”.

Vérifications réalisées dans le dépôt le 2026-06-21 :

- Le projet n'utilise pas SCSS ni framework front-end ; le style est principalement dans `src/css/style.css`.
- La page équipe est définie par `.section.team`.
- `.section.team` utilise une image de fond avec un gradient `linear-gradient(90deg, var(--color-brand-pink-gradient) 0%, var(--color-brand-coral) 50%, var(--color-brand-peach) 100%)`, puis `background-blend-mode: multiply`.
- Les valeurs réelles associées sont `#E84A7E`, `#FF6B6B` et `#FF9966`.
- La capture fournie en référence rose ressemble davantage à `linear-gradient(90deg, #D54267 0%, #E85958 50%, #E97C54 100%)`.
- La capture rouge actuelle ressemble à `#EC6166`, mais cette valeur n'est pas codée directement dans `src/css/style.css`.
- Les fonds rouges réels sont pilotés par des tokens : `--color-bg-red`, `--color-red-mid`, `--gradient-brand`, `--gradient-hero`, `--color-brand-btn` et `--color-brand-red-btn`.
- `--color-bg-red: #BE2F31` a été choisi précédemment pour le contraste WCAG avec du texte blanc.
- `#FF427D`, `#E85958`, `#E97C54`, `#FF6B6B` et `#FF9966` ne passent pas le contraste AA avec du texte blanc en taille normale.
- Les pages HTML utilisent `css/style.css?v=20260621-0210`; une modification visible du CSS nécessite donc une mise à jour du cache-buster dans `src/*.html`.

Contrastes mesurés avec du texte blanc :

- `#BE2F31` : 5,77:1.
- `#FF427D` : 3,32:1.
- `#D54267` : 4,37:1.
- `#E85958` : 3,50:1.
- `#E97C54` : 2,81:1.

Conclusion : le rose demandé est pertinent visuellement, mais il ne peut pas remplacer globalement `--color-bg-red` sans stratégie de contraste.

---

## Problème

Le site mélange actuellement plusieurs usages du rouge :

- grands fonds décoratifs ;
- overlays d'images ;
- boutons et appels à l'action ;
- aides de contraste pour outils d'audit ;
- textes rouges sur fond blanc ;
- focus et états interactifs.

Un remplacement global de `--color-bg-red` ou de tous les rouges casserait probablement le contraste, modifierait des éléments fonctionnels et rendrait le diff difficile à relire. À l'inverse, un remplacement ponctuel sans token commun créerait une dette CSS et rendrait les futures corrections plus coûteuses.

---

## Solution

Créer des tokens dédiés aux fonds roses décoratifs, puis remplacer uniquement les grands fonds rouges concernés.

Tokens recommandés :

```css
:root {
    --color-background-pink: #FF427D; /* decoratif uniquement, pas pour texte blanc normal */
    --color-background-pink-readable: #C9365D; /* texte blanc AA : 5.04:1 */
    --gradient-background-pink: linear-gradient(
        90deg,
        #D54267 0%,
        #E85958 50%,
        #E97C54 100%
    );
    --gradient-background-pink-readable:
        linear-gradient(rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)),
        var(--gradient-background-pink);
}
```

Règle d'usage :

- `--gradient-background-pink` pour les fonds décoratifs avec image, blend mode ou absence de texte direct.
- `--gradient-background-pink-readable` pour les grandes zones portant du texte blanc.
- `--color-background-pink-readable` pour les zones unies portant du texte blanc ou les fallbacks `background-color`.
- `#FF427D` uniquement comme référence décorative ou accentuelle, pas comme fond principal d'un bloc textuel.

Le changement doit rester CSS-first : aucune modification des textes, images, vidéos, animations, transitions, sections, ancres ou scripts.

---

## Impacts vérifiés dans le dépôt réel

### Fichiers applicatifs à modifier

- `src/css/style.css` : ajout des tokens roses, remplacement ciblé des grands fonds décoratifs rouges et ajustement des commentaires d'accessibilité associés.
- `src/*.html` : mise à jour du paramètre `?v=` de `css/style.css` après modification visible.

### Fichiers à ne pas modifier

- textes éditoriaux ;
- images et vidéos ;
- SVG et logos ;
- JavaScript ;
- structure HTML, sections et ancres ;
- couleurs d'erreur, alertes, états de validation et états fonctionnels ;
- `dist/` manuellement.

### Fichiers générés

- `dist/` doit être régénéré par `npm run build:prod`.

### Sélecteurs candidats à traiter en priorité

- `body` : fond global visible pendant les transitions ou les zones non couvertes.
- `.hero-page1` et `.hero-page1__background` : fond et voile coloré de la page d'accueil.
- `.page3__container`, `#page-4 .page3__right--text .page3__left`, `.page5`, `.page6` : grandes zones “Nos créations” et “Espaces augmentés”.
- `.partners-page` : page partenaires, zone rouge plat très visible.
- `.page9`, `.page9__background::after`, `.page10`, `.page10__background::after` : pages expériences séries avec overlay rouge.
- `.page44__text`, `.page46`, `.page47`, `.page47__text` : pages Voyage autour de moi et Dessine-moi le vent.
- `.page53`, `.page54`, `.page56`, `.page57`, `.page60`, `.page61` : pages projets et réservations utilisant de grandes surfaces rouges.

### Sélecteurs à conserver ou à requalifier avec prudence

- `--color-text-red` : texte rouge sur fond blanc, déjà documenté pour le contraste.
- `--color-bg-red` : peut rester comme token historique ou fonctionnel si son usage n'est pas décoratif.
- `.hero-page1__nav-btn`, boutons, focus, hover, disclosure buttons et badges : ne pas modifier sans validation visuelle et contraste spécifique.
- Commentaires `a11y` sur fonds explicites : les mettre à jour uniquement si le fond réel change.

---

## Options évaluées

### Option A (retenue) : Tokens roses dédiés et remplacement ciblé

**Avantages** :
- Réutilise la direction artistique de la page équipe sans dupliquer des valeurs partout.
- Évite de casser les usages fonctionnels du rouge.
- Permet de garder le contraste du texte blanc sur les grands fonds.
- Produit un diff lisible dans `src/css/style.css`.
- Facilite la vérification responsive et visuelle par sélecteurs.

**Inconvénients** :
- Demande une cartographie préalable des fonds rouges.
- Nécessite plusieurs contrôles visuels, car les sections n'ont pas toutes les mêmes images ni la même densité de texte.
- Laisse volontairement certains rouges en place s'ils sont fonctionnels, ce qui demande une justification dans le livrable.

### Option B : Remplacer globalement `--color-bg-red` par `#FF427D`

**Avantages** :
- Très rapide à implémenter.
- Donne immédiatement une teinte rose sur beaucoup de zones.

**Inconvénients** :
- `#FF427D` ne passe pas le contraste AA avec du texte blanc normal.
- Change des aides de contraste, des états interactifs et des zones qui ne sont pas seulement décoratives.
- Risque d'introduire des régressions d'accessibilité.
- Produit un résultat moins maîtrisé que la référence équipe, qui utilise un gradient et du blend.

### Option C : Appliquer le gradient de la page équipe à toutes les occurrences rouges

**Avantages** :
- Très cohérent avec `index.html#page-2`.
- Évite la multiplication de teintes.

**Inconvénients** :
- Le gradient exact de la page équipe est pensé avec image, blend mode et voile ; appliqué seul, il peut être trop clair.
- Les arrêts `#FF6B6B` et `#FF9966` ne sont pas assez contrastés avec du texte blanc normal.
- Le rendu peut devenir trop orange sur certaines pages sans image.

### Option D : Remplacements ad hoc par page

**Avantages** :
- Permet une optimisation fine de chaque section.
- Peut obtenir un rendu visuel précis page par page.

**Inconvénients** :
- Augmente la dette CSS.
- Rend les contrôles futurs plus difficiles.
- Crée un risque d'incohérence entre pages proches.

---

## Décision

Retenir l'Option A.

Le dégradé visuel de référence est :

```css
linear-gradient(90deg, #D54267 0%, #E85958 50%, #E97C54 100%)
```

Pour les grandes zones textuelles, la version à utiliser en priorité est la version lisible avec voile sombre :

```css
linear-gradient(rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)),
linear-gradient(90deg, #D54267 0%, #E85958 50%, #E97C54 100%)
```

`#FF427D` est conservé comme référence rose décorative, mais ne doit pas remplacer `--color-bg-red` sur des zones avec texte blanc normal.

---

## Plan d'implémentation

1. Ajouter dans `:root` les tokens `--color-background-pink`, `--color-background-pink-readable`, `--gradient-background-pink` et `--gradient-background-pink-readable`.
2. Ne pas supprimer immédiatement `--color-bg-red`, `--gradient-brand` ou `--gradient-hero`, car ils peuvent encore porter des usages fonctionnels ou historiques.
3. Remplacer les grands fonds décoratifs identifiés par `var(--gradient-background-pink-readable)` ou `var(--color-background-pink-readable)` selon le besoin.
4. Remplacer les overlays rouges d'images par `var(--gradient-background-pink)` si le blend mode et l'image garantissent le rendu, sinon par la version lisible.
5. Conserver les boutons, liens, états de focus, badges, alertes et textes rouges tant qu'ils n'ont pas été explicitement qualifiés comme fonds décoratifs.
6. Mettre à jour les commentaires `a11y` qui mentionnent un “fond rouge” quand le fond devient rose.
7. Mettre à jour le cache-buster `style.css?v=...` dans les pages `src/*.html`.
8. Exécuter `npm run build:prod`.
9. Exécuter `npm run prod:preflight`.
10. Servir `dist/` localement et vérifier au minimum `index.html#page-2`, `index.html#page-8`, `experiences-series.html`, `voyage-autour-de-moi.html`, `dessine-moi-le-vent.html`, `xr-corporate.html`, `toulouse-lautrec.html`, `charlotte-henschel.html` et `reservations.html`.
11. Vérifier les viewports mobile, tablette et desktop.
12. Documenter dans le livrable les zones rouges conservées volontairement parce qu'elles sont fonctionnelles, textuelles ou liées au contraste.

---

## Métriques de succès

- Les tokens `--gradient-background-pink` et `--gradient-background-pink-readable` existent dans `src/css/style.css`.
- Aucun grand sélecteur décoratif listé dans ce PRD n'utilise encore `background-color: var(--color-bg-red)` comme fond principal sans justification.
- `#FF427D` n'est pas utilisé comme fond portant du texte blanc normal.
- Les contrastes de `--color-background-pink-readable` et des arrêts assombris de `--gradient-background-pink-readable` avec du texte blanc sont au minimum à 4,5:1.
- `rg -n "#EC6166|rgb\\(236,\\s*97,\\s*102\\)" src` retourne 0 occurrence.
- Les pages `src/*.html` qui chargent `css/style.css` utilisent un nouveau paramètre `?v=...`.
- `npm run prod:preflight` termine avec 0 erreur.
- Aucun changement de texte, image, vidéo, animation, transition, section ou ancre n'apparaît dans le diff.
- Les captures desktop et mobile des pages vérifiées ne montrent pas de débordement horizontal ni de texte blanc illisible sur fond rose.

---

## État d'implémentation

État documenté le 2026-06-21 :

- Les tokens roses dédiés ont été intégrés dans `src/css/style.css`.
- Les grands fonds rouges décoratifs ont été remplacés par des fonds roses lisibles sur les pages concernées.
- Les panneaux roses des pages créations, Dessine-moi le vent et XR Corporate ont été aérés ou rendus transparents au niveau des lignes de texte pour éviter l'effet de texte collé au fond.
- La page équipe utilise `--color-background-pink-readable` pour les cartes afin de réduire le rouge trop dur sous les portraits.
- Les titres Monroe concernés par `--color-text-gold` ont été requalifiés vers un rose profond, et la page Installation affiche `3 Installation Interactive` en blanc pour rester lisible.
- La préproduction a été vérifiée avec `style.css?v=20260621-1544`; les changements ont été poussés dans le tag `v11`.

---

## Changelog

| Date | Auteur | Changement |
|------|--------|------------|
| 2026-06-21 | Alex + Codex | Mise à jour du statut et de l'état d'implémentation |
| 2026-06-21 | Alex + Codex | Création du PRD |
