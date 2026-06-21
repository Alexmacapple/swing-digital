# PRD-009 : Routage de la page 404 personnalisée

**Statut** : Documenté, action infra requise
**Date** : 2026-06-21
**Auteur** : Alex
**Source** : Conversation et diagnostic public `curl` sur `https://swing.appmiweb.com`

---

## Vision

Le quoi : toute URL inexistante de la préproduction Swing Digital doit servir la page `404.html` personnalisée, tout en conservant un statut HTTP `404`.

Le pourquoi : une page 404 personnalisée n'est réellement utile que si elle est branchée au routage serveur. Un lien direct vers `/404.html` améliore le design, mais ne résout pas l'expérience réelle des visiteurs, des crawlers et des outils d'audit qui tombent sur une URL manquante. Le bon mécanisme est donc serveur-first : le serveur constate l'absence du fichier, renvoie le statut `404`, puis utilise le HTML de `/404.html` comme corps de réponse, sans redirection en `200`.

Le comment : renvoyé au Plan d'implémentation.

## Exemple bout-en-bout (réel)

Un visiteur ouvre `https://swing.appmiweb.com/page-inexistante-test-404.html`.

Aujourd'hui, l'origine renvoie une page technique en anglais avec `Error response`, `File not found` et `Nothing matches the given URI`.

La page `https://swing.appmiweb.com/404.html` existe déjà et affiche le hero Swing Digital avec vidéo, CTA vers l'accueil et les expériences, et le style `style.css?v=20260621-1544`.

Après implémentation, la même URL inexistante répond avec le statut HTTP `404`.

Le corps HTML contient `Page introuvable`, la classe `page-404-hero` et la vidéo hero.

Le navigateur reste sur l'URL demandée, sans redirection visible vers `/404.html`.

Les moteurs de recherche comprennent que l'URL n'existe pas, car le statut reste `404`.

L'utilisateur dispose néanmoins d'une sortie claire : retour accueil, découverte des expériences, plan du site, contact.

Le contrôle `curl -sI` montre `HTTP/2 404`.

Le contrôle `curl -sL` ne contient plus la page technique du serveur.

Le contrôle de `/404.html` continue de répondre `200`, avec `meta robots noindex, follow`.

---

## Contexte

La page 404 custom a été intégrée dans le site avec une reprise adaptée du hero de la home.

Constat public du 2026-06-21 :

- `https://swing.appmiweb.com/404.html` répond `200` et affiche la page custom.
- `https://swing.appmiweb.com/page-inexistante-test-404.html` répond `404`, mais avec une page technique en anglais.
- Le corps de réponse technique contient `Error response` et `Nothing matches the given URI`.
- La signature ressemble à un serveur statique Python ou équivalent, pas à une page d'erreur Apache habillée.

Le dépôt ne suffit donc pas à résoudre le problème tant que l'origine serveur ne sait pas mapper ses erreurs 404 vers `/404.html`.

---

## Problème

Les URL inexistantes ne servent pas la page 404 Swing Digital.

Cela crée trois problèmes :

- UX : l'utilisateur voit une page technique incohérente avec l'identité du site.
- SEO : une redirection naïve vers `/404.html` en `200` serait mauvaise, mais l'état actuel reste peu maîtrisé.
- Exploitation : les tests publics peuvent confirmer le statut `404`, mais pas l'expérience 404 custom.

---

## Solution

Configurer l'origine d'hébergement pour utiliser `/404.html` comme document d'erreur des ressources manquantes, avec conservation du statut HTTP `404`.

La documentation opérationnelle est centralisée dans `docs/404-CUSTOM-ERROR-PAGE.md`.

---

## Options évaluées

### Option A (retenue) : configuration 404 côté origine

**Avantages** :
- conserve le statut HTTP `404` ;
- sert le design custom sans changer l'URL demandée ;
- respecte les attentes SEO et crawler ;
- fonctionne avec Apache, Nginx ou un serveur statique custom ;
- ne modifie pas les contenus du site.

**Inconvénients** :
- nécessite un accès à la configuration de l'hébergement ;
- la syntaxe dépend du serveur réel ;
- ne peut pas être validée uniquement par `npm run build:prod`.

### Option B : redirection vers `/404.html`

**Avantages** :
- simple à configurer dans beaucoup d'outils ;
- facile à comprendre pour un opérateur non technique ;
- la page custom devient visible.

**Inconvénients** :
- risque de transformer une URL inexistante en réponse `200` ;
- masque l'URL manquante d'origine ;
- moins propre pour le SEO ;
- peut fausser les audits Search/Crawl.

### Option C : interception Cloudflare Worker

**Avantages** :
- applicable même sans accès à la configuration serveur d'origine ;
- conserve un statut `404` si le Worker est correctement écrit ;
- peut être limité au domaine de préproduction.

**Inconvénients** :
- ajoute une dépendance Cloudflare ;
- complique le diagnostic entre CDN et origine ;
- nécessite une gestion de code/configuration hors dépôt principal si le Worker n'est pas versionné ici ;
- peut être excessif si l'origine est simplement Apache ou Nginx.

---

## Décision

Retenir l'option A : configurer l'origine pour servir `/404.html` comme document d'erreur, avec statut `404`.

Si l'origine Appmiweb ne permet pas cette configuration, utiliser l'option C comme repli explicite via Cloudflare Worker. L'option B est refusée sauf contrainte d'hébergement absolue, car elle risque de dégrader le signal SEO.

---

## Plan d'implémentation

1. Identifier l'origine réelle qui sert `https://swing.appmiweb.com` : Apache, Nginx, serveur Python statique, panel mutualisé ou autre.
2. Appliquer la recette correspondante dans `docs/404-CUSTOM-ERROR-PAGE.md`.
3. Déployer uniquement le contenu public `dist/` plus, si nécessaire, le fichier de configuration serveur reconnu par l'hébergeur.
4. Vérifier que `/404.html` répond toujours `200`.
5. Vérifier qu'une URL inexistante répond `404`.
6. Vérifier que le corps de l'URL inexistante contient `page-404-hero`.
7. Vérifier qu'il n'y a pas de redirection vers `/404.html`.
8. Relancer `npm run appmiweb:preflight`.
9. Relancer un contrôle public Search/Crawl si le changement touche aussi Cloudflare ou l'origine.

---

## Métriques de succès

- `curl -sI https://swing.appmiweb.com/page-inexistante-test-404.html` contient `HTTP/2 404` ou `HTTP/1.1 404`.
- `curl -sL https://swing.appmiweb.com/page-inexistante-test-404.html | rg "page-404-hero"` trouve au moins une occurrence.
- `curl -sL https://swing.appmiweb.com/page-inexistante-test-404.html | rg "Nothing matches the given URI|Error response"` ne trouve aucune occurrence.
- `curl -sI https://swing.appmiweb.com/404.html` répond `200`.
- La réponse de l'URL inexistante ne contient pas de redirection `3xx` vers `/404.html`.
- Les pages du sitemap continuent de répondre `200`.
- `npm run appmiweb:preflight` termine avec un code `0`, hors avertissements préproduction déjà connus.

---

## État d'implémentation

État documenté le 2026-06-21 :

- La page `404.html` personnalisée existe et reprend le hero Swing Digital adapté à une erreur 404.
- `https://swing.appmiweb.com/404.html` répond `200` et affiche la page custom.
- Une URL inexistante répond bien `404`, mais sert encore la page technique de l'origine.
- La correction restante est une action d'hébergement : configurer le document d'erreur 404 côté origine ou via Cloudflare Worker.
- La procédure opérationnelle est documentée dans `docs/404-CUSTOM-ERROR-PAGE.md`.

---

## Changelog

| Date | Auteur | Changement |
|------|--------|------------|
| 2026-06-21 | Alex + Codex | Ajout de l'état d'implémentation et du statut infra |
| 2026-06-21 | Alex + Codex | Création du PRD |
