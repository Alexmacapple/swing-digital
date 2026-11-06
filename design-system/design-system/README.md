Swing Digital crée des expériences immersives et des espaces augmentés : théâtre en réalité mixte, installations, séries et films. Le site est une suite de diapositives plein écran, sur fond rose, encadrées d'un chrome noir. Ce système décrit les fondations et les 57 composants de ses 28 pages.

## Contenu et ton

- Écrire en français, au vouvoiement : « Et si vos équipes se découvraient autrement ? », « Restez informé ».
- Titres courts, souvent sur deux lignes, le second segment prolongeant le premier : « Réinventer / L'espace des récits », « Ancrer le virtuel / Dans l'espace physique ».
- Mots-dièse en minuscules, séparés par des espaces : « #théâtre #XR #installations #récits immersifs #séries ».
- Dans l'en-tête, le logotype est typographique : `| Swing Digital |`, deux barres verticales encadrant le nom. Le logo image (`swing-digital.png`, groupe Logos) sert dans les bandeaux de logos des pages projet (Voyage autour de moi, Ni vues ni connues).
- Navigation principale, dans cet ordre : Accueil, XR, Espace augmenté, Films, Réservation.
- Pas d'emoji. Chaque page existe en français et en anglais (`en/`), avec la même structure.

## Couleurs

- Fond de page : `ground-pink`. Texte courant dessus : `paper` (5,04:1). `ink` dessus ne fait que 4,17:1 : à réserver aux titres de 24 px et plus.
- Chrome noir : l'en-tête, le fil d'Ariane et le pied de page sont sur `ink`, texte `paper`.
- Sections sombres : `ground-navy`, titres `title-blue-on-navy` ou `title-red-on-navy` (grands titres seulement), texte `paper`.
- Texte coloré sur fond clair : `text-red`, `text-rose`, `text-gold-900`. Jamais `decor-red` (3,83:1) ni `decor-gold` (1,64:1) en texte courant.
- `decor-gold` est l'accent or de la marque : bandes, filets, numéros, titres de 24 px et plus sur `ground-pink` (3,07:1). Texte posé sur l'or : `ink` ou `text-gold-900`.
- Boutons rouges : fond `text-red` ou `button-red`, texte `paper`.
- Texte `paper` sur photo : toujours un voile `overlay-45` au minimum et l'ombre `shadow-text`.
- Les tokens `decor-*` et `accent-*` habillent une page de projet ; une page n'en utilise qu'un ou deux.

## Typographie

- Une seule famille, Satoshi variable (300 à 900), romain et italique, auto-hébergée.
- Graisses retenues : 900 pour les titres, 700 pour les libellés et liens, 400 pour le texte. Le source emploie encore 800, 650, 600, 500, 450 et 300 : ne pas en ajouter.
- Les tailles sont fluides (`clamp()`) ; les styles `type-*` donnent leur valeur maximale, la règle `clamp` complète est dans `bundle.css` (`--size-*`, `--fs-*`).
- Titres de héros et de chapitre en `type-hero`, souvent en capitales ; numéros de chapitre en `type-giant`.
- Corps en `type-body`, mesure de lecture 64ch (`--measure-reading`), interlignage 1,62.
- Crédits photo en `type-credit`, légendes en `type-caption`.

## Espacement, rayons, ombres

- Espacements : `space-2xs` à `space-2xl`, en rem. Marges des diapositives : `--slide-pad-x` et `--slide-pad-y` (2rem).
- Rayons discrets : `radius-sm` (4px) par défaut, `radius-md` (8px) pour les cartes, `radius-round` pour les boutons lecture et son.
- Ombres : `shadow-card` au repos, `shadow-card-hover` au survol, `shadow-drop` pour un objet posé sur une image.

## Mise en page

- Chaque section est une diapositive de la hauteur de l'écran moins l'en-tête : `--section-height` = 100vh − 60px.
- Largeur maximale 1440px (`--page-max-width`). Points de rupture principaux : 1024px, 768px, 480px.
- L'en-tête est fixe, le fil d'Ariane colle dessous (`--breadcrumb-height`). Les marges respectent les encoches (`--safe-*`).

## Images et vidéo

- Photographies plein cadre ou en mosaïque, toujours créditées (`__credit`).
- Vidéos de fond (héros, contact) avec boutons lecture et son ronds ; les lecteurs intégrés viennent de Vimeo ou YouTube.
- Images décoratives en `alt=""` ; une image qui porte du sens reçoit un texte alternatif.

## Mouvement

- Apparition au défilement : `.reveal` puis `.reveal--visible`, 0,8 s, `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.
- Transitions de couleur et d'opacité : 0,3 s (`--transition`).
- Tout mouvement est coupé sous `prefers-reduced-motion: reduce`.

## Iconographie

- Icônes en SVG en ligne, à `fill="currentColor"` : lecture, pause, son, flèche de retour en haut. Pas de police d'icônes.
- Drapeaux de langue et badges App Store et Google Play : fichiers SVG du groupe d'assets Icônes.
- Logos de partenaires et de médias : PNG du groupe d'assets Logos.

## Accessibilité

- Liens d'évitement en tête de page (`SkipLinks`), menu burger à `aria-expanded`, langue courante à `aria-current`.
- Contraste mesuré : `paper` sur `ground-pink` 5,04:1, sur `ground-red` 5,77:1, sur `ground-navy` 14,81:1 ; `text-red` sur `paper` 4,86:1 ; `text-gray-500` sur `paper` 4,54:1.

## Composants

Les composants gardent les classes du site (`.pageN__*`) : leurs aperçus chargent la feuille réelle, dérivée de `src/css/style.css`. Les anciens noms de variables (`--color-*`) y sont des alias des tokens. Chaque guide liste les motifs que le composant partage avec d'autres (titre, crédit, catégorie, logos, galerie) : ce sont les composants communs à extraire.

## Non synchronisé

- Tokens écartés car jamais utilisés : `--color-brand-light` (#F49C9E), `--color-brand-red-dark` (#c0392b).
- Restent dans `components/bundle.css`, faute de forme lisible par les tokens : tailles `clamp()`, dégradés, rythmes (`--line-*`, `--measure-*`), marges calculées, `--transition`. Les rayons sont écrits en dur dans le source : modifier `radius-*` ici ne change pas les aperçus.
- Aperçus statiques : vidéos sans flux (poster seul), lecteurs Vimeo et YouTube remplacés par un bloc noir, liens neutralisés, images réduites à 1600 px.
- Aucun bundle JavaScript : le comportement vit dans `src/js/main.js`.
