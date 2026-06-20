# Audit SEO/GEO — Swing Digital

Date : 2026-06-20
Périmètre : site statique `src/`, 23 pages indexables, `robots.txt`, `sitemap.xml`, métadonnées, données structurées et lisibilité agent.

Checklist de go-live : `docs/SEO-GEO-PROD-CHECKLIST.md`.

## Observé

- Le site est un site vitrine statique HTML/CSS/JS, en français, pour Swing Digital.
- Le site est actuellement aligné sur la préproduction `https://swing.appmiweb.com/`. Le domaine final de production n'est pas encore fourni dans le dépôt.
- Les pages contenaient encore un placeholder de domaine dans les canonicals, Open Graph, `robots.txt` et `sitemap.xml`.
- Aucune donnée GSC, GA4, Bing Webmaster Tools, outil de rang, logs serveur ou outil de visibilité IA n'a été fournie.
- Les pages de réservation utilisent de vrais boutons et libellés accessibles, mais les actions de billetterie et newsletter sont explicitement indiquées comme bientôt disponibles.
- La page Réservations contient une FAQ visible en HTML.
- Le dépôt contient aussi des contenus de travail dans `source-artifacts/` (`generated-pages.html`, `pages-extracted/`) qui ne doivent pas être publiés ; la production doit utiliser `dist/`, pas `src/`.

## Inféré

- Marché principal : `FR-fr`.
- Modèle : site vitrine culturel et expérientiel.
- Objectif principal probable : réservation, contact, visite privée ou demande sur mesure.
- Politique propriétaire sur les crawlers IA : inconnue. Le fichier `robots.txt` reste donc ouvert pour le crawl public standard, sans règle spécifique d'entraînement ou de recherche IA.

## Corrections appliquées

| Priorité | Élément | Action |
|---|---|---|
| P0 | Canonicals | Remplacement du placeholder par la base de préproduction `https://swing.appmiweb.com`, avec canonique racine pour l'accueil. |
| P0 | Sitemap | Réécriture des 23 URL canoniques et `lastmod` au 2026-06-20. |
| P0 | Robots | Sitemap réel ajouté, `404.html`, `generated-pages.html` et `pages-extracted/` exclus du crawl. |
| P1 | Open Graph / Twitter | Images et URL rendues absolues, ajout de `og:site_name`, `og:locale` et Twitter Card. |
| P1 | Données structurées | Ajout JSON-LD `Organization`, `WebSite`, `WebPage` et `BreadcrumbList` sur les pages indexables. |
| P1 | FAQ extractible | Ajout `FAQPage` sur `reservations.html`, uniquement pour la FAQ visible. |
| P1 | Réponse directe | Ajout d'un court paragraphe visible dans le hero d'accueil pour expliciter l'entité Swing Digital. |
| P2 | Agents IA | Ajout d'un `llms.txt` compact avec ressources canoniques et consignes d'entité. |
| P2 | Page 404 | Ajout `noindex, follow`. |

## Corrections de deuxième passe

| Priorité | Élément | Action |
|---|---|---|
| P1 | Claims non sourcés | Retrait des étoiles « 5 sur 5 » sur la page Réservations, remplacées par des statuts descriptifs. |
| P1 | FAQ Réservations | Ajout de l'ancre `#faq-reservations` et d'un lien depuis le bloc de réservation. |
| P1 | Cohérence billetterie | Clarification : billetterie en ligne bientôt disponible, contact temporaire pour groupes et visites privées. |
| P1 | Claim ledger | Ajout de `docs/SEO-GEO-CLAIM-LEDGER.csv` pour suivre les claims tarifaires, durée, langues et politiques. |
| P1 | Keyword map | Ajout de `docs/SEO-GEO-KEYWORD-MAP.csv` pour assigner les principaux clusters aux pages existantes. |
| P1 | Pré-prod vers prod | Ajout de scripts de bascule et contrôle SEO : `seo:set-base`, `seo:check`, `seo:check-prod`. |

## Corrections de troisième passe

| Priorité | Élément | Action |
|---|---|---|
| P1 | `espaces-augmentes.html` | Ajout d'une réponse directe visible sur la définition d'un espace augmenté et d'un tableau de faits extractible. |
| P1 | `experiences-series.html` | Ajout d'une réponse directe visible et d'un tableau de cartographie des expériences avec liens internes contextuels. |
| P1 | `experience-monroe.html` | Ajout d'une réponse directe visible et d'un tableau des volets de L'Expérience Monroe. |
| P1 | Styles extractibles | Ajout du composant CSS `.seo-geo-panel` pour rendre les blocs lisibles sur desktop et mobile. |
| P1 | Tests SEO/GEO | Ajout d'un contrôle statique qui vérifie les blocs de réponse directe, les tableaux et les longueurs de réponse. |
| P1 | Claim ledger | Ajout des nouveaux claims descriptifs au registre pour revue avant production. |

## Corrections de quatrième passe pré-prod

| Priorité | Élément | Action |
|---|---|---|
| P0 | Packaging public | Ajout de `npm run build:prod` pour générer `dist/` sans artefacts de travail, PDF source, Markdown projet ni `.DS_Store`. |
| P0 | Garde-fou production | Ajout de `npm run prod:preflight -- https://votre-domaine.fr` pour bloquer une prod avec `localhost`, sitemap/robots hors domaine, liens cassés, JSON-LD invalide ou mentions légales incomplètes. |
| P1 | Références locales | Contrôle des assets locaux HTML/CSS dans le preflight de production. |
| P1 | Accessibilité agent-friendly | Stabilisation du scan axe en `prefers-reduced-motion: reduce` et ajout de fonds explicites sur les textes signalés par axe. |
| P1 | Documentation de déploiement | Mise à jour des documents de projet pour indiquer que seul `dist/` doit être publié. |

## Corrections de cinquième passe préproduction Appmiweb

| Priorité | Élément | Action |
|---|---|---|
| P0 | Domaine de préproduction | Bascule des canonicals, Open Graph, Twitter, sitemap, robots, JSON-LD et `llms.txt` vers `https://swing.appmiweb.com`. |
| P1 | Liens relatifs | Ajout d'un test SEO/GEO qui vérifie que les liens internes et assets HTML restent relatifs quand une URL absolue n'est pas requise. |
| P1 | Préflight préprod | Ajout de `npm run appmiweb:preflight`, qui bloque les erreurs techniques mais tolère en avertissement les placeholders légaux réservés à la production finale. |
| P1 | Bascule future prod | Mise à jour du script `seo:set-base` pour savoir remplacer la préproduction Appmiweb par le futur domaine final. |

## P0 à traiter hors code

| Priorité | Problème | Preuve | Impact | Correction | Propriétaire | Effort | Métrique |
|---|---|---|---|---|---|---|---|
| P0 | Domaine de production non renseigné | Le site pointe actuellement vers la préproduction `https://swing.appmiweb.com` | Les canonicals, OG, sitemap et `llms.txt` devront changer avant la mise en ligne finale | Choisir le domaine final, configurer HTTPS, puis basculer les URL techniques vers ce domaine | Infra/hébergement | Moyen | 100 % des URL en 200 HTTPS + 301 HTTP vers HTTPS |
| P0 | Hébergeur à renseigner | `mentions-legales.html` contient encore les placeholders d'hébergement | Risque légal et confiance utilisateur | Renseigner le nom, l'adresse et le téléphone de l'hébergeur réel | Responsable légal | Faible | Mentions complètes |
| P0 | Conversion réservation à trancher | Boutons `aria-disabled="true"` et textes « bientôt disponible » | Si le lancement vise la réservation, les visiteurs et agents ne peuvent pas réserver | Brancher billetterie/newsletter ou assumer un lancement informatif avec contact clair | Produit | Moyen | Clics CTA, réservations, demandes |
| P0 | Données analytiques absentes | Aucun export fourni | Impossible de prioriser par impressions, CTR, rangs ou citations IA | Configurer GSC, GA4, Bing Webmaster Tools et journaliser les crawlers | Marketing/tech | Moyen | Indexation, clics, CTR, AI referrals |

## Commandes de préproduction Appmiweb

```bash
npm run appmiweb:set-base
npm test
npm run seo:check
npm run build:prod
npm run appmiweb:preflight
```

Ces commandes permettent de publier `dist/` sur `https://swing.appmiweb.com` pour validation privée, sans traiter ce domaine comme la production finale.

## Commandes de bascule préprod vers prod finale

Quand le domaine final HTTPS est décidé :

```bash
npm test
npm run seo:set-base -- https://votre-domaine.fr
SEO_BASE_URL=https://votre-domaine.fr npm run seo:check
npm run build:prod
npm run prod:preflight -- https://votre-domaine.fr
```

Ces commandes remplacent les URL SEO publiques, relancent le contrôle SEO/GEO avec la base attendue, génèrent `dist/` et empêchent une mise en production avec des URL `localhost`, des artefacts de travail ou des mentions légales incomplètes.

## Dual-engine readiness

| Zone | Statut SEO | Statut GEO/IA | Statut agentique | Recommandation |
|---|---|---|---|---|
| Crawlabilité | Bon après correction robots | Ouvert par défaut | Pages publiques lisibles | Décider une politique IA propriétaire avant règles spécifiques. |
| Indexabilité | Améliorée par canonicals/sitemap | Améliorée par URL stables | Pages indexables identifiables | Finaliser HTTPS puis soumettre sitemap. |
| Données structurées | Ajoutées | Ajoutées | Lisibilité entité + fil d'Ariane | Valider en production après déploiement. |
| Réponses directes | Accueil et pages stratégiques améliorés | Meilleure extraction | Messages visibles en HTML | Ajouter des blocs similaires uniquement sur les pages à intention claire. |
| Tables/FAQ | FAQ Réservations + tableaux de faits | Bonne pour questions pratiques et pages MOFU | Réponses visibles | Ajouter des FAQ ciblées seulement si les réponses sont validées et utiles. |
| Revendications/sources | À consolider | Données de preuve faibles | Risque de citations imprécises | Créer un registre de preuves pour dates, partenaires, prix et lieux. |
| Maillage interne | Bon via navigation | Bon | Bon | Ajouter liens contextuels dans le corps des pages, pas seulement le menu. |
| UX agentique | Bonne base sémantique | Bonne base | Conversion bloquée | Connecter ou clarifier les actions réservations/newsletter. |
| Mesure | Inconnue | Inconnue | Inconnue | Installer GSC/GA4/Bing/logs avant reporting. |

## Opportunités de contenus

| Cluster | Intention | Tunnel | Page primaire | Requête de grounding | Preuve | Action |
|---|---|---|---|---|---|---|
| espaces augmentés | Comprendre une offre culturelle immersive | MOFU | `espaces-augmentes.html` | « Qu'est-ce qu'un espace augmenté culturel ? » | Contenu existant | Définition et tableau ajoutés ; revue éditoriale avant production. |
| expérience immersive XR Paris | Réserver ou comparer une expérience | BOFU | `reservations.html` | « expérience immersive Toulouse-Lautrec réservation » | Page réservation existante | Activer CTA ou proposer demande de contact claire. |
| création transmédia immersive | Identifier un studio/prestataire | BOFU | `index.html` | « studio création expérience transmédia immersive » | Positionnement visible | Ajouter preuve, références, types de prestations et contact. |
| L'Expérience Monroe | Découvrir une œuvre précise | MOFU/BOFU | `experience-monroe.html` | « de quoi se compose L'Expérience Monroe ? » | Page projet existante | Tableau des volets ajouté ; sources et dates à confirmer avant production. |

## Données manquantes

| Donnée | Statut | Usage |
|---|---|---|
| GSC | Inconnue | Impressions, clics, CTR, indexation. |
| GA4 | Inconnue | Sessions organiques, sources IA, conversions. |
| Bing Webmaster Tools | Inconnue | Index Bing et performances IA Microsoft si disponibles. |
| Logs serveur | Inconnue | Audit crawlers, statuts, robots fetch. |
| Politique crawlers IA | Inconnue | Décider recherche IA, agents utilisateur, entraînement. |
| Sources de preuve | Partielles | Valider partenaires, prix, lieux, dates et claims. |

## Plan 7 jours

| Jour | Action | Résultat attendu |
|---|---|---|
| 1 | Renseigner domaine final HTTPS et hébergeur légal. | Preflight production débloquable. |
| 2 | Lancer la bascule `seo:set-base`, puis publier uniquement `dist/`. | Canonicals, robots, sitemap et `llms.txt` en HTTPS. |
| 3 | Soumettre le sitemap dans GSC et Bing Webmaster Tools. | Base de mesure indexation. |
| 4 | Brancher GA4 avec événements CTA contact/réservation/newsletter. | Conversion mesurable. |
| 5 | Décider la politique crawlers IA et entraînement. | Robots/WAF ajustables sans ambiguïté. |
| 6 | Valider le scénario commercial Réservations : billetterie active ou lancement informatif assumé. | CTA cohérents avec l'objectif de conversion. |
| 7 | Vérifier les claims tarifaires, durées, langues et formats avant campagne SEO. | Citations plus sûres et auditables. |

## Garde-fous

- Aucune métrique de trafic, rang, citation IA ou conversion n'est déclarée comme observée.
- Le `llms.txt` est fourni comme aide optionnelle aux agents et systèmes de récupération ; il ne doit pas être présenté comme un facteur de classement Google.
- Les données structurées ajoutées reprennent des informations visibles ou structurelles du site.
- Les règles spécifiques pour `GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `Claude-SearchBot`, `PerplexityBot` ou équivalents ne doivent être ajoutées qu'après décision propriétaire et vérification des documentations officielles au moment du déploiement.
