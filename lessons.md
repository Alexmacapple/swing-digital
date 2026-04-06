# Swing Digital - Lecons apprises

## Session 2026-04-06 : audit responsive et nettoyage (10 commits)

### Bug WebKit grid + aspect-ratio + flex

- **Symptome** : scroll horizontal sur iPhone Safari, uniquement sur index.html (logos partenaires)
- **Cause racine** : CSS Grid avec `1fr` dans un flex child avec `aspect-ratio: 1`. Safari/WebKit surestime la largeur intrinseque des tracks grid
- **Solution** : `minmax(0, 1fr)` au lieu de `1fr`, `min-width: 0` sur container/grid/items. En mobile (< 480px), passage complet en flexbox wrap
- **Lecon** : `1fr` et `minmax(0, 1fr)` ne sont PAS equivalents sur Safari quand grid + flex + aspect-ratio interagissent. Toujours utiliser `minmax(0, 1fr)` dans ces cas

### Cache navigateur et debugging CSS

- **Symptome** : les corrections CSS n'apparaissaient pas sur iPhone
- **Cause** : Safari cache agressivement le CSS. Le `?v=param` sur la page HTML ne force PAS le rechargement du CSS lie par `<link>`
- **Solution** : ajouter un cache-buster directement sur le lien CSS (`css/style.css?v=20260406`)
- **Lecon** : toujours cache-buster le CSS, pas le HTML

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
