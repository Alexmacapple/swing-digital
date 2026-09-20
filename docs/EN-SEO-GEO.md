# Version EN — SEO et GEO bilingues

La version anglaise est un miroir éditorial statique de la version française.
Elle ne crée aucun parcours transactionnel et ne modifie pas les métriques,
les tags de production ni les sources françaises.

Pour chaque page EN :

- `lang="en"`, `og:locale="en_US"` et `inLanguage: "en-US"` sont déclarés ;
- l’URL canonique est sous `https://www.swingdigitalproduction.com/en/` ;
- les liens `hreflang="en"`, `hreflang="fr"` et `hreflang="x-default"` sont
  réciproques ;
- le JSON-LD conserve les médias, l’organisation, les fils d’Ariane et les
  descriptions traduites ;
- les assets continuent de pointer vers les ressources partagées de `src/img`,
  `src/video`, `src/fonts` et `src/css`.

La publication de la version EN reste distincte d’une mise en production OVH.
Avant publication, exécuter `npm run build:prod`, vérifier le contenu de `dist`
et contrôler les URLs publiques avec le preflight de production. Aucun chiffre
de trafic, de positionnement ou de citation IA n’est déduit de la traduction.
