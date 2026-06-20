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
