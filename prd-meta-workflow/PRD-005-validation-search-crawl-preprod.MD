# PRD-005 : Validation Search/Crawl préproduction

**Statut** : Bloqué côté publication préproduction
**Date** : 2026-06-20
**Auteur** : Alex
**Source** : rapport HTML SEO/GEO v1.2.1 et tests SEO/GEO existants

---

## Vision

Le quoi : renforcer la validation Search/Crawl sur la préproduction publique Appmiweb.

Le pourquoi : le rapport donne `Search/Crawl` à 8/10. La base locale est saine, mais la note peut monter si les mêmes preuves sont vérifiées sur l'URL publique, avec toutes les pages du sitemap, les images Open Graph et le dossier `dist/` publié.

Le comment : renvoyé au Plan d'implémentation.

## Exemple bout-en-bout (projeté)

Un contrôleur lance la validation sur `https://swing.appmiweb.com`.

Chaque URL du sitemap répond en 200. Les canonicals pointent vers Appmiweb tant que le domaine final n'existe pas. Les assets Open Graph répondent en 200. `robots.txt` pointe vers le bon sitemap. Le build `dist/` ne contient pas les artefacts de travail.

Le rapport HTML régénéré peut classer `Search/Crawl` à 9/10.

---

## Contexte

Les tests locaux passent et le rapport confirme les bases SEO/GEO. La prochaine preuve utile est une validation publique de la préproduction, pas seulement du serveur local.

---

## Problème

Un site peut être correct localement et échouer publiquement : chemin d'asset, redirection, MIME type, fichier absent, sitemap non servi ou publication depuis le mauvais dossier.

---

## Solution

Créer un contrôle Search/Crawl de préproduction publique :

- tester toutes les URL du sitemap ;
- vérifier les canonicals ;
- vérifier les images Open Graph ;
- vérifier `robots.txt` et `llms.txt` ;
- confirmer que seuls les artefacts publics sont dans `dist/`.

---

## Options évaluées

### Option A (retenue) : Validation publique Appmiweb

**Avantages** :
- Prouve le comportement réellement visible.
- Complète les tests locaux existants.
- Améliore directement la confiance Search/Crawl.

**Inconvénients** :
- Dépend de la disponibilité de la préproduction.
- Ne remplace pas la validation du domaine final.

### Option B : Validation locale uniquement

**Avantages** :
- Rapide et reproductible.
- Ne dépend pas du réseau.

**Inconvénients** :
- Ne prouve pas la publication publique.
- Ne détecte pas les erreurs d'hébergement.

### Option C : Attendre le domaine final

**Avantages** :
- Évite de tester une URL temporaire.
- Aligne la preuve sur la production.

**Inconvénients** :
- Laisse la préproduction moins robuste.
- Retarde la détection d'erreurs de publication.

---

## Décision

Retenir l'Option A. La préproduction Appmiweb doit être validée publiquement, avec une note claire indiquant que le domaine final demandera une seconde validation.

---

## Résultat d'exécution du 2026-06-20

Le contrôle public est créé via `npm run appmiweb:search-crawl`.

Résultat observé :

- `npm run appmiweb:preflight` passe : `dist/` contient 439 fichiers publics validés, avec 3 avertissements non bloquants de préproduction.
- `sitemap.xml` public : 23 URL contrôlées, 23 réponses HTTP 200.
- Canonicals : 23/23 cohérentes avec `https://swing.appmiweb.com`.
- Open Graph : 23/23 `og:url` cohérents, 21/21 images Open Graph servies en 200.
- `robots.txt` et `llms.txt` publics répondent en 200.
- Blocage : 8 artefacts non publics répondent encore en HTTP 200 sur la préproduction.

Artefacts publics à purger côté hébergement :

- `/generated-pages.html`
- `/pages-extracted/`
- `/maquette-site.pdf`
- `/README.md`
- `/CLAUDE.md`
- `/ROADMAP.md`
- `/todo.md`
- `/.htaccess`
- `/.DS_Store`

Diagnostic : le problème n'est pas dans le build local, car `dist/` exclut déjà ces artefacts. La préproduction publique sert probablement un ancien contenu, un répertoire source non filtré ou une racine d'hébergement qui n'est pas strictement `dist/`.

Conclusion : la note `Search/Crawl` ne doit pas être montée à 9/10 tant que ces artefacts restent publics. Les artefacts internes ont été déplacés hors de `src/`, dans `source-artifacts/`, pour que la racine publique Appmiweb ne les reçoive plus si elle déploie `src/`. Après purge ou redéploiement, relancer `npm run appmiweb:search-crawl`.

---

## Plan d'implémentation

1. Exécuter `npm run appmiweb:preflight`.
2. Lire le sitemap public Appmiweb.
3. Tester chaque URL du sitemap en HTTP 200.
4. Vérifier que chaque canonical reste cohérent avec Appmiweb.
5. Tester les images Open Graph déclarées.
6. Vérifier `robots.txt` et `llms.txt` publics.
7. Purger les artefacts non publics côté hébergement si le contrôle public les expose.
8. Régénérer le rapport HTML avec les preuves publiques.

---

## Métriques de succès

- 100 % des URL du sitemap Appmiweb répondent en 200.
- 100 % des pages indexables ont une canonical Appmiweb cohérente.
- 100 % des images Open Graph testées répondent en 200.
- `robots.txt` public déclare le sitemap Appmiweb.
- `llms.txt` public répond en 200.
- `npm run appmiweb:preflight` termine avec un code 0 ou documente seulement des avertissements non bloquants.
- Le rapport régénéré classe `Search/Crawl` au moins à 9/10.

---

## Changelog

| Date | Auteur | Changement |
|------|--------|------------|
| 2026-06-20 | Alex + Codex | Création du PRD |
