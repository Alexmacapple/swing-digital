# PRD-004 : Mesure préproduction SEO/GEO

**Statut** : Validé localement
**Date** : 2026-06-20
**Auteur** : Alex
**Source** : rapport HTML SEO/GEO v1.2.1 et PRD-001

---

## Vision

Le quoi : préparer la mesure SEO/GEO sans polluer les données de production finale.

Le pourquoi : le rapport donne `Measurement` à 2/10 parce qu'aucun accès GSC, GA4, Bing, logs, trafic ou citation IA n'est disponible. En préproduction, l'objectif n'est pas de produire des métriques de performance, mais de rendre la collecte prête et testable.

Le comment : renvoyé au Plan d'implémentation.

## Exemple bout-en-bout (projeté)

L'équipe consulte la préproduction.

Les événements attendus sont définis : page vue, clic contact, clic réservation, clic email, clic réseaux sociaux et ouverture du menu mobile. Les outils propriétaires restent à activer sur le domaine final, mais leur plan est documenté. Le rapport HTML suivant peut distinguer ce qui est prêt, ce qui est propriétaire et ce qui reste inconnu.

La note Measurement peut monter de 2/10 à 5/10 ou 6/10 sans inventer de trafic.

---

## Contexte

`PRD-001` réserve la mesure complète au go-live final. Le rapport actuel marque la mesure comme inconnue parce qu'aucun export analytique ou log serveur n'est disponible.

---

## Problème

Sans plan de mesure préproduction, le rapport ne peut pas distinguer absence de données, absence d'installation et décision volontaire de différer au domaine final.

---

## Solution

Créer un plan de mesure préproduction :

- inventaire des outils à activer au go-live ;
- nommage des événements ;
- règles de séparation préproduction / production ;
- checklist de validation en temps réel ;
- section explicite dans la documentation SEO/GEO.

---

## Options évaluées

### Option A (retenue) : Plan de mesure sans tag de production

**Avantages** :
- Améliore la maturité de mesure sans polluer les données.
- Compatible avec `PRD-001`.
- Vérifiable par documentation et tests de présence.

**Inconvénients** :
- Ne produit pas encore de trafic réel.
- Nécessite une action ultérieure au go-live.

### Option B : Installer GA4 immédiatement sur préproduction

**Avantages** :
- Permet de tester les événements plus tôt.
- Réduit le risque technique le jour du lancement.

**Inconvénients** :
- Peut polluer les données.
- Peut créer une confusion entre préproduction et production.

### Option C : Ne rien faire avant le domaine final

**Avantages** :
- Aucun risque de données ambiguës.
- Moins de travail immédiat.

**Inconvénients** :
- Le rapport restera à 2/10.
- Les événements risquent d'être improvisés au lancement.

---

## Décision

Retenir l'Option A. La préproduction doit documenter et tester la préparation, pas simuler des métriques inexistantes.

---

## Résultat du 2026-06-21

Changements livrés :

- création de `docs/SEO-GEO-MEASUREMENT-MATRIX.csv` comme source de vérité des événements ;
- création de `docs/SEO-GEO-MEASUREMENT-PLAN.md` pour séparer préproduction, production finale et mesure IA ;
- ajout d'un contrôle `seo:check` qui vérifie au moins 5 événements, les champs obligatoires, les sélecteurs HTML réels et l'absence de tag GA4/GTM en préproduction ;
- maintien explicite de toutes les métriques en `unknown` tant qu'aucun accès propriétaire n'est fourni.

Événements préparés :

- vue accueil ;
- clic CTA `Découvrir les expériences` ;
- clic contact accueil ;
- clic Instagram ;
- ouverture du menu mobile ;
- clic réservation désactivée, documenté comme non-conversion ;
- clic newsletter désactivée, documenté comme non-conversion ;
- clic FAQ réservations ;
- clic contact visite privée ou groupe.

Preuves locales :

- `npx playwright test tests/seo-geo.spec.js --project=desktop-1920` : 12 tests passés ;
- le contrôle vérifie les sélecteurs depuis les pages réelles servies par Playwright ;
- aucun tag GA4 ou GTM n'est installé dans les fichiers publics ;
- rapport `reports/swing-digital/2026-06-21-seo-geo-audit-public/index.html` régénéré avec `Measurement` à 5,5/10 en readiness préproduction.

Verdict : le chantier est validé localement. Le score `Measurement` peut être remonté en readiness préproduction, sans déclarer de trafic, CTR, positions, citations IA ou conversions observées.

---

## Plan d'implémentation

1. Créer une matrice des événements de conversion attendus.
2. Définir les noms d'événements et les sélecteurs associés.
3. Documenter les outils à activer : GSC, Bing Webmaster Tools, GA4 ou alternative.
4. Indiquer explicitement que les métriques restent inconnues tant que les accès propriétaires ne sont pas fournis.
5. Ajouter un contrôle léger qui vérifie la présence des CTA mesurables.
6. Mettre à jour le rapport HTML après documentation.

---

## Métriques de succès

- Une matrice liste au moins 5 événements mesurables.
- Chaque événement a un nom, un déclencheur, une page et un statut.
- La checklist distingue clairement préproduction et production finale.
- Aucun trafic, rang, CTR ou taux de conversion n'est inventé.
- Le rapport régénéré classe `Measurement` au moins à 5/10.

---

## Changelog

| Date | Auteur | Changement |
|------|--------|------------|
| 2026-06-20 | Alex + Codex | Création du PRD |
| 2026-06-21 | Alex + Codex | Ajout de la matrice de mesure, du plan préproduction et du test SEO/GEO associé |
