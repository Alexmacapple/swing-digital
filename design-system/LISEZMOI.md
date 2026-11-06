# Design system Swing Digital

Export du 6 novembre 2026, construit depuis `src/` au commit `e27cb5f`.

- `DESIGN.md` : la référence texte (tokens par rôle, typographie, 57 composants, ordre de migration). Point d'entrée pour un agent qui crée ou modifie une page.
- `design-system/` : le design system complet : `tokens.json`, `tokens.css`, `components/bundle.css`, un dossier par composant (`preview.html` et `README.md`), polices, logos, icônes et images réduites des aperçus. Ouvrir un `preview.html` demande un serveur local servant ce dossier.
- `outils/` : les deux scripts qui ont généré l'ensemble depuis `src/`. Ils lisent le dépôt sans le modifier ; leurs chemins de sortie pointent vers un dossier temporaire à adapter avant de les relancer.

Ce dossier documente l'existant : `src/css/style.css` reste la feuille servie par le site. La migration vers les tokens n'est pas commencée.
