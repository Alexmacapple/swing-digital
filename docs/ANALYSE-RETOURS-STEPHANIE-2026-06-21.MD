# Analyse des retours Stéphanie du 2026-06-21

**Source principale** : `retour/changements_site (1).docx`
**Assets associés** : `retour/site_images/`
**Périmètre analysé** : `src/`, PRD existants, documents de suivi projet

---

## Synthèse

Le DOCX de Stéphanie contient des retours de typographie, navigation, direction artistique, textes, visuels, pages projet et contact.

Trois sujets sont déjà traités et ne doivent pas être redécoupés en nouveaux PRD :

| Retour | Statut | Référence |
|---|---|---|
| Migration vers Satoshi | Fait | `prd-meta-workflow/PRD-007-migration-typographique-satoshi.MD` |
| Fonds roses à la place des fonds rouges | Fait | `prd-meta-workflow/PRD-008-fonds-roses-adoucis.MD` |
| Menu `Accueil - XR - Espace augmenté - Films - Réservation`, avec `Ni vues ni connues` sous Films | Fait | `prd-meta-workflow/PRD-011-menu-decoupage-xr-films.MD` |

Les autres retours sont découpés en cinq PRD unitaires pour éviter les corrections mélangées :

| PRD | Sujet | Statut cible |
|---|---|---|
| PRD-012 | Accueil éditorial et visuels de présentation | À implémenter |
| PRD-013 | Catalogue XR et ajout de The Party | À implémenter après confirmation publication The Party |
| PRD-014 | Pages Marilyn, Toulouse-Lautrec et Charlotte Henschel | À implémenter |
| PRD-015 | Page autonome Memory Box VR | À implémenter, arbitrage reçu par texto |
| PRD-016 | Contact, adresse et animation logo | À implémenter partiellement, animation en attente d’asset |

---

## Diagnostic par retour

| Bloc du DOCX | État actuel observé | Décision de cadrage |
|---|---|---|
| Police Satoshi | `src/css/style.css` charge déjà Satoshi et les fichiers `.woff2` existent | Déjà couvert par PRD-007 |
| Onglets XR / Films | La navigation actuelle affiche déjà `XR`, `Espace augmenté`, `Films`, `Réservation` | Déjà couvert par PRD-011 |
| Fond rose | Les tokens roses et cache-busters CSS sont déjà en place | Déjà couvert par PRD-008 |
| Hero accueil | L’ancien titre, les anciens hashtags, l’ancien résumé et la ligne de soutiens sont encore présents | PRD-012 |
| Page accueil `#page-3` | Les deux anciens paragraphes sont encore présents et l’image n’utilise pas `retour/site_images/1_swing.jpg` | PRD-012 |
| Lien Memory Box | Le lien pointe vers `xr-corporate.html`, qui existe, mais l’intitulé Memory Box reste ambigu. Stéphanie indique par texto qu’une page autonome est acceptable si c’est le plus simple. | PRD-015 |
| Page accueil `#page-4` | La phrase `Nos projets en cours et réalisés` est encore présente, la liste développement n’a pas The Party ni les mentions Pixihead | PRD-013 |
| Ajout The Party dans XR | `experiences-series.html` ne liste pas The Party | PRD-013 |
| Marilyn | La page utilise encore les anciens assets et Stéphanie signale un problème de logos | PRD-014 |
| Toulouse-Lautrec | Les anciens textes sont encore présents sur les pages 53 et 54 | PRD-014 |
| Charlotte Henschel | Les anciens textes, capitalisations et mises à la ligne sont encore présents | PRD-014 |
| Contact | Le contact affiche encore `Swing Digital Production` et l’ancienne adresse `35-37 rue d’Artois` | PRD-016 |
| Animation logo contact | Aucun nouvel asset d’animation rose n’est présent dans `retour/site_images/` | PRD-016, question Stéphanie |

---

## Assets disponibles

| Fichier | Dimensions | Usage probable |
|---|---:|---|
| `10_fond.jpg` | 842 x 595 | Fond rose uni ou référence couleur |
| `11_fond_rose.jpg` | 842 x 595 | Fond rose texturé |
| `12_fond_rose2.jpg` | 842 x 595 | Fond rose texturé alternatif |
| `1_swing.jpg` | 395 x 594 | Image de remplacement page accueil `#page-3` |
| `2_memory_box.jpg` | 842 x 595 | Asset Memory Box VR |
| `3_memory_box.jpg` | 842 x 595 | Asset Memory Box VR |
| `Marilyn_1.jpg`, `Marilyn2.jpg`, `Marilyn3.jpg` | 842 x 595 | Exports Marilyn à mapper aux pages existantes |
| `Lautrec_1.jpg`, `Lautrec2.jpg` | 842 x 595 | Exports Toulouse-Lautrec pages 53 et 54 |
| `Charlotte.jpg`, `Charlotte2.jpg` | 842 x 595 | Exports Charlotte pages 55 et 56 |
| `the_party.jpg`, `the_party2.jpg`, `the_party3.jpg`, `the_party4.jpg` | 842 x 595 | Exports The Party |
| `the_party4_photo_sans_légende.jpg` | 486 x 595 | Photo The Party sans légende/copyright |

Les assets sont suffisants pour préparer les corrections visuelles, sauf l’animation logo contact mentionnée dans le DOCX.

---

## Ordre d’implémentation recommandé

1. PRD-012 : corriger l’accueil, car il concentre le premier écran et les textes principaux.
2. PRD-016 : corriger le contact et l’adresse, au moins pour la partie texte.
3. PRD-013 : ajouter The Party et mettre à jour le catalogue XR une fois la publication confirmée.
4. PRD-014 : traiter les pages projet en lot homogène, avec vérification visuelle.
5. PRD-015 : créer une page autonome Memory Box VR, car Stéphanie autorise l’option la plus simple et la cible actuelle `xr-corporate.html` reste éditorialement ambiguë.

---

## Questions pour Stéphanie

1. Pour The Party, faut-il créer une page projet dédiée dès maintenant et l’ajouter au menu XR, ou seulement l’ajouter aux listes de projets ?
2. Pour Marilyn, les fichiers `Marilyn_1.jpg`, `Marilyn2.jpg` et `Marilyn3.jpg` correspondent-ils respectivement aux pages 50, 51 et 52 ?
3. Pour l’accueil, doit-on afficher exactement `CREATEURS D'EXPERIENCES IMMERSIVES`, ou corriger typographiquement en `CRÉATEURS D’EXPÉRIENCES IMMERSIVES` ?
4. Pour le contact, la suppression de `Production` concerne-t-elle seulement le bloc contact visible, ou aussi les mentions légales et les crédits ?
5. Pour l’adresse, faut-il mettre à jour uniquement le bloc contact, ou également les mentions légales et les éventuelles données structurées ?
6. Pour l’animation logo contact, peux-tu fournir le nouveau fichier vidéo ou image animée sur fond rose, avec le format attendu si tu l’as déjà ?

---

## Format recommandé pour les prochains retours

Le format Word + dossier images convient bien pour des retours groupés, surtout quand il y a des remplacements visuels. Pour limiter les ambiguïtés :

- indiquer l’URL ou l’ancre concernée avant chaque bloc ;
- écrire le texte à supprimer et le texte à remplacer dans deux blocs séparés ;
- citer les noms exacts des images à utiliser ;
- préciser si une image est un export complet à reproduire ou seulement une source visuelle ;
- isoler les questions ouvertes dans une section finale.

Le corps de mail suffit pour une correction courte : une faute, une adresse, un lien, un libellé de bouton ou une seule phrase.

---

## Vérifications recommandées après implémentation

- `npm run build:prod`
- `npm test`
- `npm run seo:check`
- Vérification navigateur locale sur `index.html`, `experiences-series.html`, `the-party.html` si créée, `marilyn.html`, `toulouse-lautrec.html`, `charlotte-henschel.html`, `xr-corporate.html` ou page Memory Box dédiée, et `mentions-legales.html`.
- Vérification responsive aux largeurs 375, 600, 768, 1024 et 1440 px.
- Contrôle des liens internes après tout changement de slug ou de menu.
