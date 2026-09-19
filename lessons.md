# Swing Digital - Lecons apprises

## Session 2026-06-20 : préproduction SEO/GEO et PRD production

### Préproduction vs production finale

- `https://swing.appmiweb.com` est une préproduction techniquement validée, pas nécessairement le domaine canonique final.
- Ne pas installer la mesure définitive sur une URL temporaire si le domaine final change ensuite.
- Le domaine final doit être basculé avec `npm run seo:set-base -- https://domaine-final`, puis contrôlé par `SEO_BASE_URL=https://domaine-final npm run seo:check`.

### Mesure SEO/GEO

- GSC, GA4/GTM, Bing Webmaster Tools et sources IA sont des chantiers de go-live, pas des corrections préproduction urgentes.
- Les métriques doivent rester séparées : GSC, Bing, GA4, logs serveur et tests manuels IA ne mesurent pas la même chose.
- Toujours marquer `unknown` ou `requires data` quand aucune donnée n'est observée.

### LCP accueil

- La vidéo hero peut concurrencer le LCP si elle est préchargée trop tôt.
- Le LCP doit être jugé sur le domaine final, avec Lighthouse et Core Web Vitals réels.
- Objectif de production : LCP accueil inférieur ou égal à 2,5 s, sauf exception artistique documentée.

### Crawlers IA

- Ne pas écrire une règle générique « AI bots ».
- Séparer recherche/citation, fetch utilisateur, entraînement modèle et recherche traditionnelle.
- `robots.txt` n'est pas une protection de contenu privé.

### PRD

- Le PRD de référence est `prd-meta-workflow/PRD-001-seo-geo-production.MD`.
- Les tâches GSC/GA4/Bing/IA, LCP et crawlers IA sont volontairement différées jusqu'au contexte production.

## Session 2026-04-06 : audit responsive et nettoyage (10 commits)

### Bug WebKit grid + aspect-ratio + flex

- **Symptome** : scroll horizontal sur iPhone Safari, uniquement sur index.html (logos partenaires)
- **Cause racine** : CSS Grid avec `1fr` dans un flex child avec `aspect-ratio: 1`. Safari/WebKit surestime la largeur intrinseque des tracks grid
- **Solution** : `minmax(0, 1fr)` au lieu de `1fr`, `min-width: 0` sur container/grid/items. En mobile (< 480px), passage complet en flexbox wrap
- **Lecon** : `1fr` et `minmax(0, 1fr)` ne sont PAS equivalents sur Safari quand grid + flex + aspect-ratio interagissent. Toujours utiliser `minmax(0, 1fr)` dans ces cas

### Cache navigateur et debugging CSS

- **Symptôme** : les corrections CSS n'apparaissaient pas sur iPhone
- **Cause** : Safari cache agressivement le CSS. Le `?v=param` sur la page HTML ne force PAS le rechargement du CSS lié par `<link>`
- **Solution** : ajouter un cache-buster directement sur le lien CSS (`css/style.css?v=AAAAMMJJ`)
- **Leçon** : toujours cache-buster le CSS, pas le HTML

### Procédure cache CSS après modification visuelle

- **Quand l'utiliser** : dès qu'une correction CSS doit être visible sur `swing.appmiweb.com`, surtout sur Safari/iPhone ou après plusieurs retours « je ne vois pas la modification ».
- **À modifier** : incrémenter la version du lien CSS dans toutes les pages HTML sources, par exemple `css/style.css?v=20260620-2140`. Cette version doit changer quand `src/css/style.css` change.
- **À ne pas faire** : ne pas compter sur un rechargement simple, ni sur un paramètre ajouté à l'URL de la page HTML. Le cache concerne la ressource liée par `<link rel="stylesheet">`.
- **À valider** : après `npm run build:prod`, vérifier dans les logs serveur ou l'inspecteur réseau que la page demande bien `/css/style.css?v=<nouvelle-version>`.
- **Commande utile** : `rg -n "style\.css\?v=" src dist` pour vérifier que `src/` et `dist/` pointent vers la même version.

### overflow-x: hidden cree overflow-y: auto

- **Symptome** : scrollbar verticale visible sur toutes les pages
- **Cause** : quand `overflow-x: hidden` est defini sans `overflow-y`, ce dernier passe a `auto` au lieu de `visible` (spec CSS)
- **Solution** : `overflow-y: scroll` + `scrollbar-width: none` + `::-webkit-scrollbar { display: none }`
- **Lecon** : toujours definir les deux axes d'overflow ensemble

### Commentaires HTML imbriques

- **Symptome** : tentative de commenter une section contenant `<!-- Row 1 -->` a casse le HTML
- **Cause** : les commentaires HTML ne s'imbriquent pas. Le premier `-->` interne ferme le commentaire externe
- **Solution** : utiliser `style="display:none"` inline pour masquer temporairement
- **Lecon** : ne jamais commenter du HTML qui contient deja des commentaires

### Sous-menu niveau 3 debordement

- **Symptome** : sous-menu Monroe depasse le viewport a droite sur ecrans < 1440px
- **Solution** : detection JS du debordement via `getBoundingClientRect()` + classe CSS `--align-left` pour flip a gauche
- **Lecon** : les menus positionnes en `left: 100%` doivent toujours avoir un mecanisme de flip

### Promesse video.play() sur iOS

- **Symptome** : UI montre "playing" alors que la video est en pause sur iOS
- **Cause** : `setPlaying()` appele avant la resolution de la promesse `play()`
- **Solution** : deplacer `setPlaying()` dans le `.then()` de la promesse
- **Lecon** : sur iOS, `video.play()` retourne une promesse qui peut etre rejetee (autoplay policy). Toujours gerer le `.then()` et le `.catch()`

## Session 2026-09-19 : demandes de la cliente (une trentaine de commits)

### « Photo tronquée » veut presque toujours dire object-fit: cover

- **Symptôme** : la cliente signale des photos tronquées sur une dizaine de pages.
- **Cause** : une image en `object-fit: cover` dans une case dont les proportions ne sont pas les siennes. Le rognage dépend alors de la largeur ET de la hauteur d'écran : invisible à 1440 x 768, il atteint 20 % à 1440 x 900.
- **Solution** : donner à la case le ratio natif de la photo (`aspect-ratio`, colonnes de grille proportionnelles aux ratios), et borner la largeur par la hauteur d'écran pour que la page reste visible d'un seul tenant.
- **Leçon** : mesurer le rognage à plusieurs hauteurs d'écran, pas seulement plusieurs largeurs. Garde-fou : `tests/t02-medias-entiers.spec.js`.

### Logos qui « se baladent » : hauteur fixe et largeur d'attribut

- **Symptôme** : logos de partenaires mal espacés, qui s'empilent ou sortent de leur bandeau sur mobile.
- **Cause** : `height` fixé en CSS, mais l'attribut HTML `width` continue de s'appliquer : une boîte de 350 px autour d'un dessin de 47 px.
- **Solution** : `width: auto` sur le logo.
- **Leçon** : dès qu'on fixe une dimension d'une image en CSS, libérer l'autre. Défaut retrouvé sur trois pages.

### Couleurs « fluo » : JPEG en CMJN

- **Symptôme** : couleurs saturées sur ordinateur pour quelques images seulement.
- **Cause** : JPEG exportés en CMJN, que les navigateurs rendent mal.
- **Solution** : conversion en sRVB avec le profil du système (`sips --matchTo`).
- **Leçon** : vérifier l'espace colorimétrique des fichiers reçus d'un outil de mise en page. Garde-fou : `tests/images-espace-colorimetrique.spec.js`.

### Un élément en ligne plus gros que son texte décale la ligne

- **Symptôme** : « le E se déplace » dans un titre de quatre lignes.
- **Cause** : une lettre décorative deux fois plus grosse, en ligne dans le titre, pousse le reste de sa ligne.
- **Solution** : la sortir du flux dans une gouttière (grille à deux colonnes, lettre en position absolue).

### Playwright réutilise le serveur déjà présent sur le port 8080

- **Symptôme** : des tests verts qui ne mesurent pas le code qu'on croit.
- **Cause** : `reuseExistingServer: true`. Si un serveur sert un autre arbre (un worktree), les tests lancés ailleurs le réutilisent.
- **Leçon** : vérifier `lsof -iTCP:8080` avant `npm test`, et arrêter tout serveur d'un autre arbre.

### Suite instable sous forte charge

- **Symptôme** : sept tests sans rapport échouent avec « browser has been closed ».
- **Cause** : machine chargée, cinq navigateurs en parallèle.
- **Solution** : `npm test -- --workers=2`. Un échec d'infrastructure n'est ni un vert ni un rouge : rejouer avant de conclure.

### Vimeo refuse les navigateurs sans interface

- **Symptôme** : tous les lecteurs Vimeo renvoient 401 avec un défi Cloudflare dans un contrôle automatisé.
- **Cause** : protection anti-robot, indépendante du domaine qui intègre la vidéo.
- **Solution** : vérifier avec un navigateur visible (`headless: false, channel: 'chrome'`). Toujours rejouer le test sur un témoin avant d'accuser le domaine.

### Savoir ce qui sert réellement une URL avant d'en parler

- **Symptôme** : les notes affirmaient que la préproduction était alimentée à la main ; elle servait en réalité `src/` en direct par un tunnel vers le poste.
- **Leçon** : une affirmation d'infrastructure reprise d'une note se vérifie (`dig`, processus, configuration du tunnel) avant d'être répétée, surtout dans un message destiné à la cliente.

### Un test dérivé d'un export mesure l'intention, pas le pixel

- **Méthode validée** : l'export de la cliente sert de plan de mise en page, pas d'image à intégrer ; les photos du site, mieux définies, sont conservées. Pour chaque page : mesurer le rendu, écrire un test de géométrie qui échoue pour la bonne raison, corriger, rejouer la suite.
- **Écarts assumés** : ils se déclarent au moment où on les fait (couleur gardée pour le contraste, faute d'orthographe de l'export non reprise, teintes éclaircies pour atteindre le seuil).
