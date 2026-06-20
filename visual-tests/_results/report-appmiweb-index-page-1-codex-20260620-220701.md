# Rapport visuel — 2026-06-20 22:07

> Run ShipGuard 2.1.0 exécuté dans Codex via `agent-browser`, en suivant le protocole `sg-visual-run`.
> Les commandes `/shipguard:*` restent propres à Claude Code ; dans Codex, le runner opérationnel est `agent-browser`.

## Résumé

- Tests : 1 exécuté, 1 passé, 0 échec, 0 obsolète, 0 erreur, 0 ignoré
- Cible : `https://swing.appmiweb.com/index.html#page-1`
- Projet : `swing-digital`
- Capture : `visual-tests/_results/screenshots/appmiweb-index-page-1-codex-20260620-220701.png`
- Régressions nouvelles : 0
- Tests générés : 0

## Résultat

| Test | Statut | Étapes | Preuve |
|------|--------|--------|--------|
| appmiweb-index-page-1 | PASS | ouverture, URL, titre, H1, snapshot, chargement images, capture pleine page | capture lue et validée |

## Contrôles effectués

- URL effective conforme : `https://swing.appmiweb.com/index.html#page-1`
- Titre conforme : `Swing Digital - Espaces augmentés, expériences immersives`
- H1 conforme : `Créateurs d'Expériences Transmédia Immersives`
- Snapshot accessible contenant la navigation, le contenu principal, les sections de création, les partenaires et le pied de page.
- Défilement complet effectué pour déclencher le chargement paresseux.
- Images : 34 détectées, 0 image cassée après défilement.
- Capture pleine page lue visuellement : contenu présent, logos partenaires visibles, aucune page blanche, aucune erreur visible.

## Échecs

Aucun.

## Tests obsolètes

Aucun.

## Régressions

Le fichier `visual-tests/_regressions.yaml` ne nécessitait pas de modification : aucune régression détectée.
