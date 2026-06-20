# PRD-006 : Audit responsive lazy-load

**Statut** : Brouillon
**Date** : 2026-06-21
**Auteur** : Alex
**Source** : rapport HTML SEO/GEO du 2026-06-21 et arbitrage préproduction

---

## Vision

Le quoi : fiabiliser l'étude responsive du rapport SEO/GEO pour que les images chargées en lazy-load soient évaluées après un parcours réel de la page, et non uniquement au chargement initial.

Le pourquoi : une image déclarée en `loading="lazy"` peut être saine côté utilisateur mais encore non chargée au moment où le script d'audit l'observe. Le rapport peut alors signaler un risque qui mesure davantage le protocole de test que l'état du site.

Le comment : renvoyé au Plan d'implémentation.

## Exemple bout-en-bout (projeté)

Le site est servi depuis `dist/` ou depuis la préproduction publique.

Le script d'audit ouvre la page d'accueil en mobile et en desktop. Il relève d'abord l'état initial : viewport, H1, débordement horizontal, images déjà chargées et images différées. Il scrolle ensuite progressivement jusqu'en bas de page, attend les événements de chargement pertinents, puis revient au haut de page si une capture hero est nécessaire.

Le JSON de sortie conserve les deux états : avant parcours et après parcours. Une image lazy-load située hors premier écran n'est plus pénalisée parce qu'elle n'était pas chargée au premier instant. Elle ne devient un problème que si elle reste cassée, invisible ou sans dimensions après exposition réelle dans le viewport.

Le rapport HTML affiche alors une lecture plus juste : le responsive reste audité, mais les faux positifs lazy-load diminuent.

---

## Contexte

Le dernier rapport SEO/GEO classe `Responsive dynamique` à `8/10`. Le constat restant n'est pas un défaut public bloquant du site, mais une limite de l'audit : certaines images lazy-load peuvent être scorées avant d'avoir eu l'occasion normale de se charger.

Le projet n'est pas encore en production finale. Les chantiers dépendant du domaine final, des outils propriétaires ou des citations IA réelles doivent donc rester différés. Ce PRD cible un gain local de qualité de mesure.

---

## Problème

Le protocole actuel peut confondre trois cas :

- image réellement cassée ;
- image volontairement différée par `loading="lazy"` ;
- image non encore exposée au viewport au moment du relevé.

Sans distinction explicite, le rapport risque de produire des alertes peu actionnables et de sous-évaluer la qualité responsive réelle.

---

## Solution

Ajouter une étape de parcours dynamique à l'audit responsive :

- mesurer l'état initial des images ;
- scroller par paliers sur chaque viewport audité ;
- attendre brièvement la stabilisation réseau et visuelle après chaque palier ;
- remesurer les images après exposition ;
- distinguer dans le JSON les images cassées, différées, chargées après scroll et toujours non chargées ;
- faire remonter ces états dans le rapport HTML sans modifier le site audité.

---

## Options évaluées

### Option A (retenue) : Parcours dynamique dans le script d'audit

**Avantages** :
- Corrige la source du faux positif.
- Ne change pas le comportement public du site.
- Produit une preuve exploitable dans `responsive-study.json`.
- Reste compatible avec les audits locaux et publics.

**Inconvénients** :
- Allonge légèrement le temps d'audit.
- Nécessite de stabiliser les seuils d'attente pour éviter des tests lents ou flakys.

### Option B : Ignorer les images lazy-load dans le score

**Avantages** :
- Simple à implémenter.
- Réduit immédiatement le bruit du rapport.

**Inconvénients** :
- Peut masquer de vraies images cassées.
- Affaiblit la valeur de preuve du rapport.
- Ne permet pas de distinguer image différée et image défaillante.

### Option C : Retirer `loading="lazy"` sur les images du site

**Avantages** :
- Simplifie l'audit initial.
- Rend plus d'images disponibles dès le chargement.

**Inconvénients** :
- Dégrade potentiellement la performance.
- Change le site pour satisfaire le test au lieu d'améliorer le test.
- Contredit l'objectif de garder une préproduction sobre et fidèle.

---

## Décision

Retenir l'Option A. Le problème confirmé concerne la méthode de mesure, pas le site public. L'intervention doit donc porter sur le script d'audit responsive et sur la structure de preuve du rapport.

---

## Plan d'implémentation

1. Identifier le script responsable de l'étude responsive du rapport SEO/GEO.
2. Ajouter une fonction de scroll progressif par viewport avec limite de durée.
3. Capturer l'état des images avant et après parcours : `complete`, `naturalWidth`, visibilité, position dans la page et attribut `loading`.
4. Ajouter dans le JSON des compteurs distincts : images chargées initialement, chargées après scroll, cassées et encore différées.
5. Mettre à jour le rendu HTML du rapport pour afficher cette distinction sans gonfler artificiellement le score.
6. Ajouter ou adapter les tests du script avec une page fixture contenant des images lazy-load.
7. Régénérer un rapport Swing Digital et comparer `Responsive dynamique` avec le rapport courant.

---

## Métriques de succès

- Le JSON responsive distingue au minimum 4 états : `loaded_initially`, `loaded_after_scroll`, `broken` et `still_deferred`.
- Sur une page fixture lazy-load, au moins une image passe de non chargée à chargée après scroll.
- Une image réellement cassée reste détectée après scroll.
- Le rapport Swing Digital ne signale plus les images lazy-load saines comme défauts bloquants.
- Le score `Responsive dynamique` reste au minimum à `8/10` et gagne uniquement si les preuves post-scroll le justifient.
- Aucun fichier `src/*.html`, `src/css/*` ou asset du site n'est modifié par ce chantier.

---

## Changelog

| Date | Auteur | Changement |
|------|--------|------------|
| 2026-06-21 | Alex + Codex | Création du PRD |
