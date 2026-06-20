# PRD-002 : Design Watch préproduction

**Statut** : Validé localement
**Date** : 2026-06-20
**Auteur** : Alex
**Source** : rapport HTML SEO/GEO v1.2.1 et captures desktop/mobile

---

## Vision

Le quoi : améliorer la première impression visuelle de la préproduction sans refondre le site.

Le pourquoi : le rapport Design Watch donne 7/10 car l'identité immersive fonctionne, mais la capture mobile révèle des éléments sociaux trop proches du bord et un manque de preuve de confiance visible avant le scroll. Une correction ciblée peut augmenter la note sans déstabiliser l'architecture HTML/CSS.

Le comment : renvoyé au Plan d'implémentation.

## Exemple bout-en-bout (projeté)

Un visiteur ouvre l'accueil sur mobile.

Le logo, le menu, le titre et le bloc de présentation restent lisibles. Les liens sociaux ne collent plus au bord droit. Un signal de confiance apparaît avant le premier scroll : références validées, productions, lieux, partenaires ou preuve éditoriale courte. Le CTA principal indique clairement l'action attendue : découvrir les expériences, contacter ou réserver selon la décision produit.

Le rapport est régénéré avec les captures desktop et mobile. La section Design Watch ne signale plus de tension de bord mobile et peut viser 8/10.

---

## Contexte

Le rapport HTML SEO/GEO du 2026-06-20 donne `Design Watch` à 7/10. Les captures montrent une identité immersive cohérente, pas de débordement horizontal mesuré, mais des liens sociaux proches du bord en mobile et peu de preuve de confiance visible immédiatement.

---

## Problème

La première impression est expressive, mais elle ne prouve pas assez vite la crédibilité de Swing Digital et laisse une fragilité mobile visible sur les éléments latéraux.

---

## Solution

Traiter trois points de préproduction :

- stabiliser les liens sociaux sur mobile ;
- ajouter un signal de confiance visible avant le scroll ;
- clarifier le CTA principal de l'accueil sans inventer de promesse commerciale.

---

## Options évaluées

### Option A (retenue) : Ajustement ciblé de l'accueil

**Avantages** :
- Faible risque sur la structure existante.
- Traite directement les constats du rapport.
- Vérifiable par captures desktop/mobile.

**Inconvénients** :
- Ne règle pas les décisions produit de réservation.
- Dépend de références éditoriales validées.

### Option B : Refonte complète du hero

**Avantages** :
- Peut produire une rupture visuelle forte.
- Permettrait de repenser toute la hiérarchie commerciale.

**Inconvénients** :
- Trop large pour une amélioration de note préproduction.
- Risque de casser les tests responsive et l'identité existante.

### Option C : Reporter au domaine final

**Avantages** :
- Aucun changement avant validation client.
- Évite de retoucher une préproduction temporaire.

**Inconvénients** :
- Le rapport reste à 7/10.
- Les défauts visibles seront encore présents en revue client.

---

## Décision

Retenir l'Option A. Le chantier doit améliorer la preuve visuelle et la stabilité mobile sans refonte.

---

## Plan d'implémentation

1. Identifier les règles CSS qui positionnent les liens sociaux sur mobile.
2. Tester les viewports 375 px, 390 px et 600 px.
3. Déplacer ou contraindre les liens sociaux pour supprimer l'effet de bord.
4. Ajouter un signal de confiance court, visible avant le scroll, uniquement avec des références validées.
5. Clarifier le CTA principal de l'accueil selon la décision produit disponible.
6. Relancer les tests responsive et SEO/GEO.
7. Régénérer le rapport HTML avec nouvelles captures.

---

## Métriques de succès

- Aucun débordement horizontal mesuré sur 375 px, 390 px et 600 px.
- Les liens sociaux ont au moins 16 px de marge visuelle avec le bord droit sur mobile.
- Un signal de confiance visible apparaît dans la première capture mobile.
- Le CTA principal est visible dans la première capture desktop ou documenté comme volontairement absent.
- `npm run seo:check` termine avec un code 0.
- Le rapport HTML régénéré ne classe plus l'ajustement mobile en P2 ouvert.

---

## Résultat du 2026-06-21

Changements livrés côté source :

- ajout d'un signal de confiance court dans le hero d'accueil, limité aux soutiens et lieux de diffusion déjà visibles dans le site ;
- ajout d'un CTA principal `Découvrir les expériences` vers `experiences-series.html` ;
- ajout d'une marge mobile sur les liens sociaux pour éviter l'effet de bord droit ;
- ajout d'un `scroll-margin-top` sur le hero pour éviter que l'ancre `#page-1` masque le titre sous le header et le fil d'Ariane ;
- mise à jour du cache-buster CSS des 24 pages HTML vers `style.css?v=20260621-0033` pour éviter un rendu public avec ancien CSS ;
- extension des tests responsive pour vérifier la preuve de confiance, le CTA, la marge sociale et la visibilité du H1 sous l'en-tête.

Preuves locales :

- `npx playwright test tests/responsive.spec.js --project=mobile-375 --project=mobile-600 --project=desktop-1920` : 61 tests passés, 5 ignorés ;
- `npm test` : 1 304 tests passés, 161 ignorés ;
- `npm run seo:check` : 10 tests passés ;
- `npm run build:prod` : build production OK, 443 fichiers copiés dans `dist/` ;
- `npm run appmiweb:preflight` : OK, avec les 3 avertissements préproduction déjà connus sur mentions légales et réservations ;
- captures finales : `reports/swing-digital/2026-06-21-prd-002-design-watch/hero-desktop-1920.png` et `reports/swing-digital/2026-06-21-prd-002-design-watch/hero-mobile-375.png`.

Verdict : le chantier est validé localement. La montée officielle de `Design Watch` vers 8/10 reste à confirmer par un nouveau rapport HTML SEO/GEO généré sur la version publiée.

---

## Changelog

| Date | Auteur | Changement |
|------|--------|------------|
| 2026-06-20 | Alex + Codex | Création du PRD |
| 2026-06-21 | Alex + Codex | Implémentation et validation locale du signal de confiance, du CTA et de la marge sociale mobile |
