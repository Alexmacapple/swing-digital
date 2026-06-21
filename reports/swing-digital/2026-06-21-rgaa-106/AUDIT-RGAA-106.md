# Audit RGAA 4.1.2 — 106 critères — Swing Digital

Date : 21 juin 2026  
Périmètre : site local `src/` servi en HTTP sur `http://127.0.0.1:8080`  
Échantillon : 24 pages HTML du site  
Référentiel : RGAA 4.1.2, niveau A/AA, tableau des 106 critères  
Statut : audit outillé de reprise, non certifiant

## Synthèse

- Critères conformes : 39
- Critères non conformes : 11
- Critères non applicables : 36
- Critères non testés : 20
- Taux RGAA calculé sur C + NC : 78 %

Ce taux exclut les critères NA et NT, conformément à la formule RGAA. Il ne doit pas être présenté comme une déclaration officielle tant que les 20 critères non testés ne sont pas levés par revue humaine, validation éditoriale et, si nécessaire, tests lecteur d’écran.

## Outils et preuves

- `npx playwright test tests/axe-core.spec.js --project=desktop-1920` : 24 passed, 0 violation axe-core WCAG 2.2 AA.
- `npx playwright test tests/accessibilite.spec.js tests/navigation.spec.js --project=desktop-1920 --project=desktop-1024 --project=mobile-375` : 62 passed, 10 skipped par breakpoint.
- AccessLint `audit_live` sur les 24 pages : 11 groupes de violations listés dans `accesslint-summary.json`.
- Inventaire DOM HTTP : `rgaa-evidence.json`.
- Scan 13.11 : aucun `touchstart` ; un seul `mousedown` dans `main.js`, limité au retrait de l’état visuel `keyboard-nav`.

## Non-conformités prioritaires

| Critère RGAA | Problème | Source | Preuve |
|---|---|---|---|
| 3.2 | Contrastes insuffisants | AccessLint | Voyage autour de moi : ratios 1,28:1 à 1,99:1 ; Dessine-moi le vent : ratios 1,22:1 à 1,87:1. |
| 4.1 / 4.3 | Transcriptions et sous-titres non trouvés | Recherche HTML | Aucun <track>, texte de transcription ou sous-titre local détecté pour les vidéos et podcasts intégrés. |
| 4.11 / 7.1 / 7.3 | Contrôles média non fonctionnels sur plusieurs pages | Test Playwright | Le clic sur Lecture ne change pas aria-pressed sur Voyage autour de moi, Dessine-moi le vent et The Play. |
| 4.13 | Rôle ARIA invalide sur vidéo | AccessLint | #hero-video possède un rôle ARIA d’image, non autorisé sur <video>. |
| 9.1 | Hiérarchie de titres sautée | AccessLint | #page14-title et #page20-title sont en h3 directement après le h1. |
| 9.2 | Régions landmark aux noms dupliqués | AccessLint | Reservations, Voyage, Marilyn, Composition, Interviews et Charlotte Henschel comportent des régions homonymes. |
| 13.6 / 13.8 | Contenus en mouvement sans contrôle complet | Inspection HTML + test média | Hero vidéo et vidéos intégrées en boucle/autoplay ; contrôles pause non systématiquement effectifs. |

## Taux par thématique

| Thématique | C | NC | NA | NT |
|---|---:|---:|---:|---:|
| Images | 2 | 0 | 3 | 4 |
| Cadres | 2 | 0 | 0 | 0 |
| Couleurs | 0 | 1 | 0 | 2 |
| Multimédia | 2 | 4 | 6 | 1 |
| Tableaux | 5 | 0 | 3 | 0 |
| Liens | 2 | 0 | 0 | 0 |
| Scripts | 1 | 2 | 2 | 0 |
| Éléments obligatoires | 6 | 0 | 1 | 3 |
| Structuration | 2 | 2 | 0 | 0 |
| Présentation | 5 | 0 | 0 | 9 |
| Formulaires | 0 | 0 | 13 | 0 |
| Navigation | 9 | 0 | 2 | 0 |
| Consultation | 3 | 2 | 6 | 1 |

## Tableau des 106 critères

| Critère | Thématique | Statut | Justification courte |
|---|---|---|---|
| 1.1 | Images | C | 175 images inventoriées, aucune image sans attribut alt. |
| 1.2 | Images | NT | Le caractère décoratif des images à alt vide exige une validation éditoriale image par image. |
| 1.3 | Images | NT | La pertinence de toutes les alternatives textuelles exige une revue éditoriale des 175 images. |
| 1.4 | Images | NA | Aucune description détaillée déclarée dans l’échantillon testé. |
| 1.5 | Images | NA | Pas de description détaillée déclarée à restituer. |
| 1.6 | Images | NT | Le besoin de description détaillée ne peut pas être tranché sans revue éditoriale complète. |
| 1.7 | Images | NA | Pas de description détaillée adjacente attendue dans le code audité. |
| 1.8 | Images | NT | La présence éventuelle d’images de texte, notamment logos, demande une décision éditoriale. |
| 1.9 | Images | C | Les figures repérées disposent de légendes ou de noms accessibles associés. |
| 2.1 | Cadres | C | 5 cadres iframe, tous avec title. |
| 2.2 | Cadres | C | Les titres de cadres identifient les contenus Vimeo ou YouTube intégrés. |
| 3.1 | Couleurs | NT | L’absence d’information donnée uniquement par la couleur n’a pas été vérifiée éditorialement. |
| 3.2 | Couleurs | NC | AccessLint remonte des contrastes insuffisants sur Voyage autour de moi et Dessine-moi le vent. |
| 3.3 | Couleurs | NT | Les contrastes des composants graphiques porteurs d’information exigent une vérification visuelle dédiée. |
| 4.1 | Multimédia | NC | Plusieurs médias temporels intégrés ne présentent pas de transcription textuelle visible dans le HTML local. |
| 4.2 | Multimédia | NA | Aucun sous-titre synchronisé local n’est présent à évaluer. |
| 4.3 | Multimédia | NC | Les vidéos et épisodes intégrés ne déclarent pas de piste de sous-titres dans le code audité. |
| 4.4 | Multimédia | NA | Pas de sous-titres synchronisés locaux à qualifier. |
| 4.5 | Multimédia | NT | Le besoin d’audiodescription dépend du contenu audiovisuel réel des vidéos tierces. |
| 4.6 | Multimédia | NA | Pas d’audiodescription déclarée à qualifier. |
| 4.7 | Multimédia | C | Les médias intégrés disposent de titres ou de libellés accessibles. |
| 4.8 | Multimédia | NA | Aucun média non temporel distinct repéré hors images déjà traitées. |
| 4.9 | Multimédia | NA | Aucune alternative de média non temporel à qualifier. |
| 4.10 | Multimédia | C | Les sons automatiques sont muets par défaut ou contrôlés par bouton. |
| 4.11 | Multimédia | NC | Les boutons lecture des pages Voyage, Dessine-moi le vent et The Play ne modifient pas aria-pressed : contrôle non fonctionnel. |
| 4.12 | Multimédia | NA | Aucun média non temporel interactif repéré. |
| 4.13 | Multimédia | NC | AccessLint signale un rôle ARIA d’image non autorisé sur la balise vidéo #hero-video. |
| 5.1 | Tableaux | NA | Aucun tableau de données complexe repéré. |
| 5.2 | Tableaux | NA | Aucun résumé de tableau complexe à qualifier. |
| 5.3 | Tableaux | NA | Aucun tableau de mise en forme repéré. |
| 5.4 | Tableaux | C | 4 tableaux avec titre ou caption. |
| 5.5 | Tableaux | C | Les tableaux audités comportent des en-têtes. |
| 5.6 | Tableaux | C | Aucun en-tête de tableau sans scope ou id détecté. |
| 5.7 | Tableaux | C | Les tableaux sont simples et les associations en-têtes/cellules sont suffisantes. |
| 5.8 | Tableaux | C | Aucun tableau de mise en forme utilisant des balises de données détecté. |
| 6.1 | Liens | C | Aucun lien vide détecté ; les libellés sont exploitables sur l’échantillon. |
| 6.2 | Liens | C | Aucun lien sans intitulé accessible détecté. |
| 7.1 | Scripts | NC | Les contrôles JS de certains médias affichent un état ARIA mais ne pilotent pas le lecteur correspondant. |
| 7.2 | Scripts | NA | Aucun script nécessitant une alternative distincte repéré. |
| 7.3 | Scripts | NC | Contrôle clavier/souris incomplet pour les médias Vimeo hors page Monroe. |
| 7.4 | Scripts | C | Aucun changement de contexte non sollicité détecté dans les tests automatisés et clavier. |
| 7.5 | Scripts | NA | Aucune alerte non sollicitée détectée. |
| 8.1 | Éléments obligatoires | C | Les 24 pages déclarent un doctype HTML. |
| 8.2 | Éléments obligatoires | NT | Validation HTML complète non exécutée avec validateur normatif. |
| 8.3 | Éléments obligatoires | C | Toutes les pages déclarent html lang="fr". |
| 8.4 | Éléments obligatoires | C | Le code de langue fr est pertinent pour les contenus audités. |
| 8.5 | Éléments obligatoires | C | Toutes les pages ont un title. |
| 8.6 | Éléments obligatoires | C | Les titres de pages sont descriptifs sur l’échantillon. |
| 8.7 | Éléments obligatoires | NT | Les changements de langue internes exigent une revue éditoriale fine. |
| 8.8 | Éléments obligatoires | NT | La langue de restitution de chaque passage multilingue n’a pas été vérifiée exhaustivement. |
| 8.9 | Éléments obligatoires | C | Pas de balises HTML de présentation obsolètes détectées. |
| 8.10 | Éléments obligatoires | NA | Aucun changement de direction de lecture repéré. |
| 9.1 | Structuration | NC | AccessLint signale des niveaux de titres sautés sur monroe-piece et monroe-roman-graphique. |
| 9.2 | Structuration | NC | AccessLint signale plusieurs régions landmark avec noms accessibles dupliqués. |
| 9.3 | Structuration | C | Les listes visibles auditées utilisent des structures ul, ol, li. |
| 9.4 | Structuration | C | Les citations presse utilisent blockquote et cite sur la page Monroe. |
| 10.1 | Présentation | NT | L’information par forme, taille ou position nécessite une revue visuelle exhaustive. |
| 10.2 | Présentation | NT | Test sans feuille de style non exécuté. |
| 10.3 | Présentation | NT | Compréhension sans feuille de style non testée. |
| 10.4 | Présentation | NT | Zoom texte à 200 % non testé sur tout l’échantillon. |
| 10.5 | Présentation | NT | Critère AAA non qualifié dans cette passe. |
| 10.6 | Présentation | NT | Visibilité des liens dans le texte à qualifier visuellement. |
| 10.7 | Présentation | C | Focus visible vérifié, y compris burger mobile avec outline 2 px. |
| 10.8 | Présentation | C | Aucun contenu caché problématique détecté par axe-core ou l’inventaire ARIA. |
| 10.9 | Présentation | NT | Pertinence de l’information hors forme/taille/position non qualifiée. |
| 10.10 | Présentation | NT | Contenus restitués via position CSS non testés exhaustivement. |
| 10.11 | Présentation | C | Pas de débordement horizontal à 320 px ni à 256 px de hauteur sur la page d’accueil. |
| 10.12 | Présentation | NT | Espacements de texte utilisateur non testés. |
| 10.13 | Présentation | C | Le menu niveau 3 est atteignable au hover, au focus et au clic selon les tests. |
| 10.14 | Présentation | C | Les contenus additionnels de navigation sont rendus visibles au clavier. |
| 11.1 | Formulaires | NA | Aucun formulaire ni champ de saisie actif dans le périmètre audité. |
| 11.2 | Formulaires | NA | Aucun formulaire ni champ de saisie actif dans le périmètre audité. |
| 11.3 | Formulaires | NA | Aucun formulaire ni champ de saisie actif dans le périmètre audité. |
| 11.4 | Formulaires | NA | Aucun formulaire ni champ de saisie actif dans le périmètre audité. |
| 11.5 | Formulaires | NA | Aucun formulaire ni champ de saisie actif dans le périmètre audité. |
| 11.6 | Formulaires | NA | Aucun formulaire ni champ de saisie actif dans le périmètre audité. |
| 11.7 | Formulaires | NA | Aucun formulaire ni champ de saisie actif dans le périmètre audité. |
| 11.8 | Formulaires | NA | Aucun formulaire ni champ de saisie actif dans le périmètre audité. |
| 11.9 | Formulaires | NA | Aucun formulaire ni champ de saisie actif dans le périmètre audité. |
| 11.10 | Formulaires | NA | Aucun formulaire ni champ de saisie actif dans le périmètre audité. |
| 11.11 | Formulaires | NA | Aucun formulaire ni champ de saisie actif dans le périmètre audité. |
| 11.12 | Formulaires | NA | Aucun formulaire ni champ de saisie actif dans le périmètre audité. |
| 11.13 | Formulaires | NA | Aucun formulaire ni champ de saisie actif dans le périmètre audité. |
| 12.1 | Navigation | C | Menu principal, navigation secondaire, plan du site et fil d’Ariane sont présents selon les pages. |
| 12.2 | Navigation | C | Le menu et les zones de navigation restent à la même place dans l’échantillon. |
| 12.3 | Navigation | C | La page plan du site existe et expose les liens principaux. |
| 12.4 | Navigation | C | Le plan du site est accessible depuis la navigation secondaire. |
| 12.5 | Navigation | NA | Aucun moteur de recherche interne n’est présent. |
| 12.6 | Navigation | C | Présence de header, nav, main, footer et lien d’évitement vers main-content. |
| 12.7 | Navigation | C | Lien d’évitement présent et testé. |
| 12.8 | Navigation | C | Ordre de tabulation vérifié sur les parcours principaux et mobile. |
| 12.9 | Navigation | C | Aucun piège clavier détecté dans les tests Playwright. |
| 12.10 | Navigation | NA | Aucun raccourci clavier à une seule touche détecté. |
| 12.11 | Navigation | C | Sous-menus de navigation atteignables au clavier et au clic, y compris niveau 3 Monroe. |
| 13.1 | Consultation | NA | Aucune limite de temps détectée. |
| 13.2 | Consultation | C | Aucune ouverture de fenêtre sans action utilisateur détectée. |
| 13.3 | Consultation | NA | Aucun document bureautique en téléchargement repéré. |
| 13.4 | Consultation | NA | Aucune version accessible de document bureautique à comparer. |
| 13.5 | Consultation | NT | Les contenus cryptiques éventuels, dont les symboles de drapeaux, demandent une revue éditoriale. |
| 13.6 | Consultation | NC | Des contenus vidéo en mouvement automatique ne disposent pas toujours d’un contrôle pause/arrêt effectif. |
| 13.7 | Consultation | NA | Aucun effet de flash ou changement brusque de luminosité détecté. |
| 13.8 | Consultation | NC | Même constat que 13.6 pour les médias en mouvement ou en boucle. |
| 13.9 | Consultation | C | Aucune contrainte d’orientation écran détectée. |
| 13.10 | Consultation | NA | Aucune fonctionnalité reposant sur un geste complexe détectée. |
| 13.11 | Consultation | C | Pas d’action menu sur mousedown/touchstart ; le seul mousedown retire un état visuel de navigation clavier. |
| 13.12 | Consultation | NA | Aucune fonctionnalité impliquant un mouvement de l’appareil détectée. |

## Limites de l’audit

- La pertinence des alternatives d’images, des changements de langue et des descriptions détaillées n’a pas été validée image par image.
- Les sous-titres, transcriptions et audiodescriptions éventuellement disponibles dans les plateformes tierces Vimeo ou YouTube n’ont pas été inspectés côté fournisseur.
- Aucun test lecteur d’écran réel n’a été exécuté.
- La validation HTML normative du critère 8.2 n’a pas été exécutée.
- Les tests de zoom 200 %, d’espacement de texte utilisateur et de rendu sans CSS restent à réaliser.

## Références réglementaires

- Loi n° 2005-102 du 11 février 2005, article 47.
- Décret n° 2019-768 du 24 juillet 2019.
- Arrêté du 20 septembre 2019, référentiel RGAA.
- Directive européenne 2019/882, European Accessibility Act, applicable depuis juin 2025.
