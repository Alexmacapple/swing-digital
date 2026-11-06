# DESIGN.md - Swing Digital

Référence visuelle du site, tirée de `src/css/style.css` et des 28 pages de `src/` au commit `e27cb5f`. Le design system complet, avec aperçus et guides par composant, est dans `design-system/design-system/` ; ce fichier en est la version texte pour les agents qui travaillent dans le dépôt.

## Principes

- Diapositives plein écran sur fond `ground-pink`, chrome noir (`ink`) pour l'en-tête, le fil d'Ariane et le pied de page.
- Une famille, Satoshi variable ; titres en 900, souvent en capitales ; libellés en 700 ; texte en 400.
- Photographies créditées, vidéos de fond à contrôles ronds, accents or (`decor-gold`) en bandes et numéros.
- Français au vouvoiement, version anglaise de même structure dans `en/`.

## Couleurs, par rôle

Chaque token remplace un ou plusieurs anciens noms ; `components/bundle.css` du design system garde ces anciens noms en alias pendant la migration.

- `ink` = `#000000` : Texte principal sur `paper` (21,00:1) ; fond de l'en-tête, du fil d'Ariane et du pied de page. Remplace `--color-primary`, `--color-text`, `--color-black`.
- `paper` = `#ffffff` : Texte sur `ink`, `ground-pink` (5,04:1), `ground-red` (5,77:1) et `ground-navy` (14,81:1) ; fond des panneaux clairs. 210 usages. Remplace `--color-secondary`, `--color-white`.
- `ground-pink` = `#c9365d` : Fond de page par défaut (body) et des diapositives ; porte du texte `paper` (5,04:1). Remplace `--color-background-pink-readable`.
- `ground-red` = `#be2f31` : Fond rouge qui porte du texte `paper` (5,77:1), départ et fin de --gradient-hero. Remplace `--color-bg-red`.
- `ground-navy` = `#1a2744` : Fond nuit des sections sombres ; texte `paper` (14,81:1) et titres `title-blue-on-navy` / `title-red-on-navy`. Remplace `--color-bg-navy`.
- `surface-gray` = `#f0f0f0` : Fond gris clair ; texte `ink` (18,43:1). Remplace `--color-gray-lightest`.
- `surface-gray-alt` = `#ebebeb` : Fond gris clair alternatif (nommé « gold-light » dans le source alors qu'il est gris). Remplace `--color-bg-gold-light`.
- `text-red` = `#ce3b3d` : Texte rouge sur `paper` (4,86:1) ; fond de bouton à texte `paper`. Fin de --gradient-brand. Remplace `--color-brand-alt`, `--color-brand-btn`, `--color-text-red`.
- `button-red` = `#c23537` : Fond de bouton rouge à texte `paper` (5,44:1). Remplace `--color-brand-red-btn`.
- `text-rose` = `#b5364e` : Texte rose foncé sur `paper` (5,83:1). Nommé « text-gold » dans le source alors qu'il est rose. Remplace `--color-text-gold`, `--color-brand-rose`.
- `text-gold-900` = `#5c4200` : Texte or foncé sur `paper` (9,40:1) et sur `decor-gold` (5,73:1). 19 usages. Remplace `--color-text-gold-darker`.
- `text-gold-800` = `#5c4800` : Texte or foncé sur `paper` (8,82:1). Écart minime avec `text-gold-900` : candidat à fusion. Remplace `--color-text-gold-dark`.
- `text-gray-900` = `#333333` : Texte secondaire sur `paper` (12,63:1). Remplace `--color-gray-dark`.
- `text-gray-700` = `#555555` : Texte tertiaire sur `paper` (7,46:1). Remplace `--color-gray-medium`.
- `text-gray-500` = `#767676` : Mentions et crédits sur `paper` (4,54:1), plancher du contraste AA. Remplace `--color-gray-light`.
- `accent-teal` = `#1a7387` : Accent bleu-vert ; texte sur `paper` (5,46:1). Remplace `--color-teal`.
- `accent-indigo` = `#3b3f72` : Accent indigo ; texte `paper` dessus (9,81:1). Remplace `--color-indigo`.
- `accent-indigo-dark` = `#4a4e82` : Indigo plus clair que son nom ne l'indique ; texte `paper` dessus (7,77:1). Remplace `--color-indigo-dark`.
- `accent-indigo-light` = `#6b6fa0` : Indigo clair, décoratif ; texte `paper` dessus 4,77:1 (grand texte seulement). Remplace `--color-indigo-light`.
- `accent-violet` = `#7b4fbf` : Accent violet ; texte `paper` dessus (5,66:1). Remplace `--color-violet`.
- `accent-brown` = `#8b5e3c` : Accent brun ; texte `paper` dessus (5,58:1). Remplace `--color-brown`.
- `title-blue-on-navy` = `#6f86ff` : Grand titre bleu sur `ground-navy` (4,61:1), réservé aux titres. Remplace `--color-title-blue-on-navy`.
- `title-red-on-navy` = `#ff5a5f` : Grand titre rouge sur `ground-navy` (4,85:1), réservé aux titres. Remplace `--color-title-red-on-navy`.
- `decor-red` = `#e8494b` : Rouge de marque, décoratif ou grand texte : 3,83:1 sur `paper`, échoue en texte courant. Remplace `--color-brand`.
- `decor-red-mid` = `#d04848` : Milieu de --gradient-hero ; 4,47:1 avec `paper`, sous le seuil en texte courant. Remplace `--color-red-mid`.
- `decor-gold` = `#e8c84a` : Or de marque, décoratif uniquement : 1,64:1 sur `paper`, 3,07:1 sur `ground-pink` (grand texte seulement). Porte du texte `ink` (12,79:1). Remplace `--color-brand-gold`.
- `decor-gold-start` = `#d4a843` : Départ du dégradé or. Remplace `--color-gold-gradient-start`.
- `decor-gold-end` = `#c49a3a` : Fin du dégradé or. Remplace `--color-gold-gradient-end`.
- `decor-pink` = `#ff427d` : Rose vif décoratif, jamais sous du texte `paper` courant (3,32:1). Remplace `--color-background-pink`.
- `decor-pink-soft` = `#e84878` : Rose de marque décoratif. Remplace `--color-brand-pink`.
- `decor-pink-gradient` = `#e84a7e` : Arrêt rose des dégradés. Remplace `--color-brand-pink-gradient`.
- `decor-coral` = `#ff6b6b` : Corail décoratif. Remplace `--color-accent`, `--color-brand-coral`.
- `decor-peach` = `#ff9966` : Pêche décoratif. Remplace `--color-brand-peach`.
- `decor-pale` = `#ffb3a7` : Rose pâle : texte `ink` dessus (12,26:1) ; sur `ground-pink` 2,94:1, décoratif seulement. Remplace `--color-brand-pale`.
- `decor-rose-light` = `#f0a0a0` : Rose clair décoratif. Remplace `--color-brand-rose-light`.
- `decor-rose-medium` = `#e87070` : Rose moyen décoratif. Remplace `--color-brand-rose-medium`.
- `overlay-45` = `rgba(0, 0, 0, 0.45)` : Voile noir léger sur les images portant du texte `paper`. Remplace `--shadow-overlay-light`.
- `overlay-50` = `rgba(0, 0, 0, 0.5)` : Voile noir moyen sur les images. Remplace `--shadow-overlay-medium`.
- `overlay-70` = `rgba(0, 0, 0, 0.7)` : Voile noir fort sur les images très claires. Remplace `--shadow-overlay-heavy`.
- `border-white-30` = `rgba(255, 255, 255, 0.3)` : Filet blanc discret sur fond sombre (décoratif, sous 3:1). Remplace `--border-white-subtle`.

Écartées car jamais utilisées : `--color-brand-light`, `--color-brand-red-dark`.

## Typographie

- `type-giant` : 128px max, interlignage 1.04, graisse 900. Numéros géants de chapitre (--size-4xl, clamp 64 → 128 px).
- `type-hero` : 80px max, interlignage 1.04, graisse 900. Titre de héros (--fs-hero = --size-3xl, clamp 38 → 80 px), souvent en capitales.
- `type-title-xl` : 60px max, interlignage 1.04, graisse 900. Titre de page proéminent (--fs-title-xl = --size-2xl, clamp 32 → 60 px).
- `type-title` : 43px max, interlignage 1.16, graisse 900. Titre de section standard (--fs-title = --size-xl, clamp 25 → 43 px).
- `type-title-compact` : 34px max, interlignage 1.16, graisse 900. Titre compact (--size-lg, clamp 22 → 34 px).
- `type-subtitle` : 24px max, interlignage 1.34, graisse 400. Sous-titre (--fs-subtitle = --size-md, clamp 18 → 24 px).
- `type-body` : 19px max, interlignage 1.62, graisse 400. Corps de texte (--fs-body = --size-sm, clamp 16 → 19 px), mesure 64ch.
- `type-label` : 19px max, interlignage 1.48, graisse 700. Lien de navigation, libellé, bouton : corps en 700.
- `type-caption` : 16px max, interlignage 1.48, graisse 400. Légende (--fs-caption = --size-xs, clamp 14 → 16 px).
- `type-credit` : 13px max, interlignage 1.48, graisse 400. Crédit photo (--fs-credit = --size-2xs, 13 px).

Graisses cibles : 900, 700, 400. À ramener : 800 (8 usages), 600 (8), 650 (2), 500, 450 et 300 (1 chacune).

## Espacements, rayons, ombres

- `space-2xs` = `0.3rem` : Écart minimal, entre une icône et son texte.
- `space-xs` = `0.5rem` : Écart entre éléments serrés, marge sous une notice.
- `space-sm-tight` = `0.8rem` : Écart intermédiaire, listes compactes.
- `space-sm` = `1rem` : Écart de base entre paragraphes et éléments.
- `space-md` = `1.5rem` : Marge intérieure des panneaux et cartes.
- `space-lg` = `2rem` : Marge entre blocs, marge intérieure des textes de diapositive.
- `space-xl` = `3rem` : Écart entre sections internes.
- `space-2xl` = `4rem` : Marges du pied de page, grands écarts.
- `radius-xs` = `2px` : Petits éléments : badges, étiquettes (4 usages).
- `radius-sm` = `4px` : Rayon le plus fréquent : boutons, champs, vignettes (8 usages).
- `radius-md` = `8px` : Cartes et panneaux (7 usages).
- `radius-pill` = `999px` : Pilules et étiquettes arrondies (2 usages).
- `radius-round` = `50%` : Boutons ronds lecture et son, pastilles (5 usages).
- `shadow-card` = `0 4px 12px rgba(0, 0, 0, 0.15)` : Carte au repos.
- `shadow-card-hover` = `0 8px 20px rgba(0, 0, 0, 0.25)` : Carte survolée.
- `shadow-drop` = `0 4px 20px rgba(0, 0, 0, 0.2)` : Objet posé sur une image (téléphone, affiche).
- `shadow-drop-heavy` = `0 4px 20px rgba(0, 0, 0, 0.3)` : Objet posé sur une image claire.
- `shadow-text` = `0 1px 4px rgba(0, 0, 0, 0.7)` : Ombre de texte (text-shadow) pour un titre `paper` posé sur une photo.

Rayons écrits en dur à ramener sur l'échelle : 1px, 3px, 6px, 0.15rem.

## Composants

57 composants couvrent toutes les sections des 28 pages. Groupés par famille :


### Structure

- `SkipLinks` (`.skip-links`) : Liens d'évitement placés en tête de chaque page, visibles au focus clavier. Pages : 404.html, charlotte-henschel.html, dessine-moi-le-vent.html, espaces-augmentes.html, experience-monroe.html, experiences-series.html, films.html, index.html, marilyn.html, memory-box-vr.html, mentions-legales.html, monroe-composition.html, monroe-experiences.html, monroe-installation.html, monroe-interviews.html, monroe-photographie.html, monroe-piece.html, monroe-podcasts.html, monroe-quiz.html, monroe-roman-graphique.html, ni-vues-ni-connues.html, plan-du-site.html, reservations.html, serie-marilyn.html, the-party.html, toulouse-lautrec.html, voyage-autour-de-moi.html, xr-corporate.html.
- `SiteHeader` (`.site-header`) : En-tête noir fixe : logotype typographique entre deux barres, sélecteur de langue et menu principal à trois niveaux. Pages : 404.html, charlotte-henschel.html, dessine-moi-le-vent.html, espaces-augmentes.html, experience-monroe.html, experiences-series.html, films.html, index.html, marilyn.html, memory-box-vr.html, mentions-legales.html, monroe-composition.html, monroe-experiences.html, monroe-installation.html, monroe-interviews.html, monroe-photographie.html, monroe-piece.html, monroe-podcasts.html, monroe-quiz.html, monroe-roman-graphique.html, ni-vues-ni-connues.html, plan-du-site.html, reservations.html, serie-marilyn.html, the-party.html, toulouse-lautrec.html, voyage-autour-de-moi.html, xr-corporate.html.
- `Breadcrumb` (`.breadcrumb`) : Fil d'Ariane noir collant sous l'en-tête, présent sur toutes les pages. Pages : 404.html, charlotte-henschel.html, dessine-moi-le-vent.html, espaces-augmentes.html, experience-monroe.html, experiences-series.html, films.html, index.html, marilyn.html, memory-box-vr.html, mentions-legales.html, monroe-composition.html, monroe-experiences.html, monroe-installation.html, monroe-interviews.html, monroe-photographie.html, monroe-piece.html, monroe-podcasts.html, monroe-quiz.html, monroe-roman-graphique.html, ni-vues-ni-connues.html, plan-du-site.html, reservations.html, serie-marilyn.html, the-party.html, toulouse-lautrec.html, voyage-autour-de-moi.html, xr-corporate.html.
- `LanguageSwitcher` (`.language-switcher`) : Bascule Français / English, la langue courante portant aria-current. Pages : index.html.
- `SiteFooter` (`.site-footer .footer`) : Pied de page noir : navigation secondaire, mentions et sélecteur de langue. Pages : 404.html, charlotte-henschel.html, dessine-moi-le-vent.html, espaces-augmentes.html, experience-monroe.html, experiences-series.html, films.html, index.html, marilyn.html, memory-box-vr.html, mentions-legales.html, monroe-composition.html, monroe-experiences.html, monroe-installation.html, monroe-interviews.html, monroe-photographie.html, monroe-piece.html, monroe-podcasts.html, monroe-quiz.html, monroe-roman-graphique.html, ni-vues-ni-connues.html, plan-du-site.html, reservations.html, serie-marilyn.html, the-party.html, toulouse-lautrec.html, voyage-autour-de-moi.html, xr-corporate.html.
- `BackToTop` (`.back-to-top .back-to-top--visible`) : Bouton flottant de retour en haut, créé par js/main.js après 300 px de défilement. Pages : 404.html, charlotte-henschel.html, dessine-moi-le-vent.html, espaces-augmentes.html, experience-monroe.html, experiences-series.html, films.html, index.html, marilyn.html, memory-box-vr.html, mentions-legales.html, monroe-composition.html, monroe-experiences.html, monroe-installation.html, monroe-interviews.html, monroe-photographie.html, monroe-piece.html, monroe-podcasts.html, monroe-quiz.html, monroe-roman-graphique.html, ni-vues-ni-connues.html, plan-du-site.html, reservations.html, serie-marilyn.html, the-party.html, toulouse-lautrec.html, voyage-autour-de-moi.html, xr-corporate.html.

### Accueil

- `HeroVideo` (`.hero-page1`) : Héros plein écran sur vidéo de fond, avec contrôles lecture et son, accroche, mots-dièse et partenaires. Pages : 404.html, index.html.
- `Hero404` (`.hero-page1 .page-404-hero`) : Variante du héros vidéo pour la page introuvable. Pages : 404.html.
- `StudioIntro` (`.page3`) : Présentation du studio et de ses créations, avec galerie, crédits et transcription dépliable. Pages : index.html.
- `TeamGrid` (`.section .team`) : Grille « Qui sommes-nous ? » : portrait, prénom, nom et rôle de chaque membre. Pages : index.html.
- `PartnersLogos` (`.partners-page`) : Mur de logos « Ils nous ont fait confiance ». Pages : index.html.
- `ContactVideo` (`.page62`) : Bloc contact sur vidéo de fond : marque, adresse et courriel. Pages : index.html.

### Espaces et séries

- `SpaceStoryIntro` (`.page5`) : Ouverture « Réinventer l'espace des récits » : titre, sous-titre et grande image. Pages : espaces-augmentes.html.
- `MixedRealityFeatures` (`.page6`) : Trois arguments titrés (réalité mixte, ancrage, espace) à côté d'une image. Pages : espaces-augmentes.html.
- `FullImage` (`.full-image-page .full-image-page--entiere`) : Image seule en pleine page, variante --entiere pour l'image non recadrée. Pages : espaces-augmentes.html, monroe-piece.html.
- `SeriesIntroGrid` (`.page9`) : Introduction aux expériences et séries : mots-dièse puis grille de cartes projet. Pages : experiences-series.html.
- `DevelopmentGrid` (`.page10`) : Grille des projets en développement, même carte que SeriesIntroGrid. Pages : experiences-series.html.
- `CorporateOffer` (`.page57`) : Offre XR pour les entreprises : titre, accroche, argumentaire, étiquettes et appel à l'action. Pages : xr-corporate.html.

### Monroe

- `PressReview` (`.page12`) : Revue de presse : affiche, citations dépliables et bandeau de logos médias. Pages : experience-monroe.html.
- `ChapterCards` (`.page13`) : Cartes numérotées vers les chapitres Monroe (fond sombre ou rose), réutilisées par la section page24. Pages : experience-monroe.html.
- `PlayOpener` (`.page14`) : Ouverture de chapitre « La Pièce » : grand numéro, titre, couverture et portrait. Pages : monroe-piece.html.
- `PlayStillsPair` (`.page16 .page16--champ`) : Deux images superposées de la pièce avec crédit, variantes --champ et --couloir. Pages : monroe-piece.html.
- `GraphicNovelOpener` (`.page20`) : Ouverture « Le Roman graphique » : numéro, titre, couverture. Pages : monroe-roman-graphique.html.
- `GraphicNovelPlates` (`.page21`) : Grille des planches du roman graphique. Pages : monroe-roman-graphique.html.
- `InstallationOpener` (`.page23`) : Ouverture « Installation interactive » : image, voile, numéro et bande or. Pages : monroe-installation.html.
- `PhotoGallery` (`.page25`) : Galerie photographique : lettre de catégorie, panoramique créditée, figures légendées. Pages : monroe-photographie.html.
- `PhotoFeature` (`.page26`) : Photographie seule avec son crédit. Pages : monroe-photographie.html.
- `PhotoCredited` (`.page27`) : Photographie titrée et créditée, répétée trois fois sur la page Photographies. Pages : monroe-photographie.html.
- `PhotoPairGrid` (`.page30`) : Grille de deux photographies titrées et créditées. Pages : monroe-photographie.html.
- `CompositionGallery` (`.page31`) : Composition électroacoustique : catégorie, compositeur et galerie. Pages : monroe-composition.html.
- `InstallationComposer` (`.page32`) : Installation interactive : catégorie, texte du compositeur et image. Pages : monroe-composition.html.
- `PodcastPlayer` (`.page33`) : Lecteur de podcasts : liste d'épisodes, épisode actif, transcriptions dépliables. Pages : monroe-podcasts.html.
- `InterviewPortraits` (`.page34`) : Portraits d'interviewés avec légende nom et qualité. Pages : monroe-interviews.html.
- `InterviewSplit` (`.page35`) : Interview en deux colonnes : catégorie et légende à gauche, portrait à droite. Pages : monroe-interviews.html.
- `InterviewVideos` (`.interviews-videos`) : Grille des interviews en vidéo : lecteur intégré, nom et crédit. Pages : monroe-interviews.html.
- `ExperiencesMosaic` (`.page36`) : Mosaïque de photos de trois tailles pour les expériences interactives. Pages : monroe-experiences.html.
- `EstradeFeature` (`.page37`) : Mise en avant « L'estrade » : titre empilé, lettre, photo et crédit. Pages : monroe-experiences.html.
- `QuizOpener` (`.page38`) : Ouverture du quiz Marilyn : catégorie, titre et téléphone. Pages : monroe-quiz.html.
- `QuizPlay` (`.quiz-jouer`) : Accès au quiz : lien d'action, note et images à observer. Pages : monroe-quiz.html.
- `SeriesSelection` (`.page39`) : Présentation de la série : numéro, format, sélection en liste et photo. Pages : serie-marilyn.html.

### Médias

- `VideoSection` (`.page11`) : Section vidéo plein cadre avec boutons lecture et son, réutilisée sur huit pages. Pages : dessine-moi-le-vent.html, experience-monroe.html, monroe-experiences.html, monroe-installation.html, monroe-piece.html, monroe-roman-graphique.html, the-party.html, voyage-autour-de-moi.html.
- `MediaTranscript` (`.media-transcript`) : Transcription dépliable d'un média : bouton, panneau et sections titrées. Pages : dessine-moi-le-vent.html, experience-monroe.html, index.html, monroe-experiences.html, monroe-installation.html, monroe-interviews.html, monroe-piece.html, monroe-podcasts.html, monroe-roman-graphique.html, voyage-autour-de-moi.html.

### Projets

- `AwardsHero` (`.page43`) : Héros de projet sur image : titre, sous-titre, prix et bandeau de logos. Pages : voyage-autour-de-moi.html.
- `AwardsDetail` (`.page44`) : Détail du projet : panoramique, description, étiquettes et prix. Pages : voyage-autour-de-moi.html.
- `AppProjectHero` (`.page46`) : Héros d'application : titre, visuel, badges App Store et Google Play, lien Vimeo. Pages : dessine-moi-le-vent.html.
- `ProjectDetailGallery` (`.page47`) : Détail de projet : texte, crédit, galerie et bandeau de logos. Pages : dessine-moi-le-vent.html.
- `PortraitSeriesHero` (`.page48`) : Héros « Ni vues ni connues » : bandeaux image, titre, accroche et logos. Pages : ni-vues-ni-connues.html.
- `PortraitGrid` (`.page49`) : Grille de portraits avec description et accroche. Pages : ni-vues-ni-connues.html.
- `PosterFullBleed` (`.page50 .page50--export`) : Affiche en fond plein cadre, variante --export. Pages : marilyn.html.
- `QuoteSplit` (`.page51`) : Deux colonnes : catégorie, titre, description et citations, photo. Pages : marilyn.html.
- `ExportImage` (`.page52 .page52--export`) : Image d'export seule, variante --export. Pages : marilyn.html.
- `ProjectPosterHeader` (`.page53`) : En-tête de projet : catégorie, titre, description, logos et affiche (Charlotte Henschel, Toulouse-Lautrec). Pages : charlotte-henschel.html, toulouse-lautrec.html.
- `PhotoMosaic` (`.page54`) : Mosaïque photo avec un grand visuel et un paragraphe. Pages : toulouse-lautrec.html.
- `BioPanel` (`.page56`) : Panneau biographique, variante --solo sans tableaux. Pages : charlotte-henschel.html.

### Pages utilitaires

- `AnswerPanel` (`.seo-geo-panel`) : Panneau question-réponse pour les moteurs et les agents : titre, réponse et tableau. Pages : espaces-augmentes.html, experience-monroe.html, experiences-series.html.
- `LinkListPage` (`.sitemap-page`) : Page liste : titre, chapeau et liste de liens (Films, Plan du site, Mentions légales, Memory Box, The Party). Pages : films.html, memory-box-vr.html, mentions-legales.html, plan-du-site.html, the-party.html.
- `NewsletterSignup` (`.page58 .page58--newsletter-seule`) : Bloc « Restez informé » : texte, liste, bouton d'inscription et réservation désactivée. Pages : reservations.html.

## Composants communs à extraire

Ces motifs sont redéfinis sous un préfixe par page ; les fusionner est la prochaine étape de migration :

- Titre de section (`__title`, 21 pages) : un composant, graisse 900, tailles `type-title` et `type-title-xl`, capitales en variante.
- Conteneur (`__container`, 17 pages) : largeur `--page-max-width`, marges `--slide-pad-x` et `--slide-pad-y`.
- Image et photo (`__image`, `__photo`, 15 et 13 pages) avec crédit (`__credit`, 7 pages) en `type-credit`.
- En-tête de section (`__header`, 12 pages).
- Catégorie et lettre de catégorie (`__category`, `__category-letter`, 8 pages), déjà partiellement commune via `.page25__category-arrow`.
- Bandeau de logos (`__logos`, `__logos-bar`, 6 pages), badge et galerie (5 pages chacun).

## Ordre de migration

1. Remplacer dans `src/css/style.css` les valeurs de `:root` par les tokens ci-dessus, en gardant les anciens noms en alias.
2. Extraire les composants communs listés ci-dessus, un par un.
3. Migrer page par page, avec une capture avant et après chaque page (tests visuels Playwright du dépôt).
